import { cp, mkdir, readFile, writeFile, rm, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, resolve, relative, isAbsolute, sep } from 'node:path';
import { platformBaseline, rewriteThemeSelectors } from './platform-targets.mjs';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const options = {};
for (let i=0;i<args.length;i++) {
  if (!['--platform','--out'].includes(args[i]) || !args[i+1]) throw new Error('Use --platform TARGET and/or --out DIRECTORY');
  options[args[i].slice(2)] = args[++i];
}
const platform = options.platform || process.platform + '-' + process.arch;
const baseline = await platformBaseline(root, platform);
const out = options.out ? resolve(options.out) : join(root, 'dist', 'addon', 'runtime');
const outputRelative = relative(root, out);
if (!outputRelative || (!outputRelative.startsWith('..') && !isAbsolute(outputRelative) && outputRelative.split(sep)[0] !== 'dist')) throw new Error('Build output inside the source repository must be under dist');
const normalized = path => path.split(sep).join('/');
const { version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
await rm(join(out, 'modules'), { recursive: true, force: true });
await mkdir(join(out, 'modules'), { recursive: true });
const replacements = [
  ['dsh-client-ui-sidebar', 'aiyou-native-sidebar', 'ui-sidebar'],
  ['dsh-client-ui-workspace', 'aiyou-native-workspace', 'ui-workspace']
];
const modules = [];
const compatibility = [];
for (const [original, local, id] of replacements) {
  const source = join(root, 'packages', original);
  const target = join(out, 'modules', local);
  await rm(target, { recursive: true, force: true });
  await cp(source, target, { recursive: true, filter: path => !normalized(path).includes('/src-recovered') && !normalized(path).includes('/src/') && !normalized(path).includes('/test/') && !normalized(path).endsWith('/reconstruction.json') && !path.endsWith('.test.mjs') });
  const manifest = JSON.parse(await readFile(join(source, 'reconstruction.json'), 'utf8'));
  for (const entry of manifest.entries) {
    let data = Buffer.concat(await Promise.all(entry.parts.map(part => readFile(join(source, part.file)))));
    if (entry.output === 'lib/client.js') {
      let text = data.toString('utf8');
      if (original === 'dsh-client-ui-sidebar' && platform === 'darwin-x64') {
        // The rc.1 Intel/rc.2 ARM semantic comparison proves this sole badge
        // difference. Keep frozen recovery partitions unchanged and show the
        // actual target build rather than the source recovery build.
        const badge = '0.2.1-rc.2-332895e';
        if (text.split(badge).length !== 2) throw new Error('Recovered sidebar build badge has drifted');
        text = text.replace(badge, `${baseline.appVersion}-${baseline.buildCommit.slice(0,7)}`);
      }
      const from = `id: "@deepseek-ai/${original}"`;
      if (!text.includes(from)) throw new Error(`Client module identity missing in ${original}`);
      data = Buffer.from(text.replace(from, `id: "@local/${local}"`));
    }
    await mkdir(dirname(join(target, entry.output)), { recursive: true });
    await writeFile(join(target, entry.output), data);
    compatibility.push({ package: `@deepseek-ai/${original}`, file: entry.output, sha256: entry.sha256 });
  }
  const metadata = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'));
  metadata.name = `@local/${local}`;
  metadata.version = version;
  metadata.private = true;
  metadata.aiyouOriginalPackage = `@deepseek-ai/${original}`;
  metadata.aiyouOriginalBuild = '332895e0f7c9d4dbfb29729f5eb367fa263ff986';
  metadata.aiyouTargetBuild = baseline.buildCommit;
  await writeFile(join(target, 'package.json'), JSON.stringify(metadata, null, 2) + '\n');
  if (original === 'dsh-client-ui-workspace') {
    // Profile modules resolve from a versioned external directory, so ship the
    // projection schema dependency instead of relying on app-private lookup.
    await cp(join(root, 'test', 'runtime', 'node_modules', 'zod'), join(target, 'node_modules', 'zod'), { recursive: true });
  }
  modules.push({ id: local, name: metadata.name, directory: `modules/${local}`, replaces: id });
}
const { buildAddonFeatures } = await import('../aiyou/build.mjs');
const features = await buildAddonFeatures(out);
// Each installer carries only the native media payload selected by its runtime.
// The source archive retains all supported payloads for offline rebuilds.
const mediaDirectory = join(out, 'vendor', 'media-tools');
for (const entry of await readdir(mediaDirectory, { withFileTypes: true })) {
  if (entry.isDirectory() && /^(darwin|win32|linux)-(arm64|x64)$/.test(entry.name) && entry.name !== platform)
    await rm(join(mediaDirectory, entry.name), { recursive: true, force: true });
}
if (platform.startsWith('darwin-')) {
  for (const executable of ['ffmpeg', 'ffprobe']) await stat(join(mediaDirectory, platform, 'bin', executable));
}
let selectorMapping;
if (baseline.selectorMapping) {
  const mapBytes = await readFile(join(root, baseline.selectorMapping));
  const descriptor = JSON.parse(mapBytes);
  if (descriptor.buildCommit !== baseline.buildCommit || descriptor.appVersion !== baseline.appVersion) throw new Error('Native selector map targets a different official build');
  const themeClient = join(out,'modules','aiyou-enhancer-theme','client.js');
  const compiled = rewriteThemeSelectors(await readFile(themeClient,'utf8'), descriptor);
  await writeFile(themeClient, compiled.source);
  selectorMapping = { file: baseline.selectorMapping, sha256: createHash('sha256').update(mapBytes).digest('hex'), references: compiled.references.length };
}
// The native workspace owns labels and urgency. Do not install a second,
// independent row-state provider with a conflicting source of truth.
const featureModules = (features.packages ?? []).filter(module => module.id !== 'aiyou-enhancer-session-state').map(module => ({
  ...module, directory: module.source
}));
modules.push(...featureModules);
await rm(join(out, 'modules', 'aiyou-enhancer-session-state'), { recursive: true, force: true });
const legacy = ['cards', 'core', 'theme', 'session-state', 'session-context', 'efficiency', 'claude-code', 'reset-monitor', 'model-arena', 'conversation-folders', 'agent-workspace', 'session-transcript', 'shortcuts', 'asset-console', 'taskboard', 'skills', 'usage'];
const patches = [
  ...replacements.map(([, , id]) => ({ id, disabled: true })),
  { insert: modules.map(module => ({ id: module.id, name: module.name })) }
];
const manifest = {
  schemaVersion: 1, name: 'AIYOUDSH', version,
  upstream: { platform, appVersion: baseline.appVersion, buildCommit: baseline.buildCommit, appAsarSha256: baseline.appAsarSha256, compatibility: baseline.compatibility },
  ...(selectorMapping ? { selectorMapping } : {}),
  modules, patches, legacyPluginIds: legacy.map(name => `aiyoucodex-${name}`),
  features: features ?? null,
  source: 'Modified modules recovered from the current installed official application; native services retained.'
};
await writeFile(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
try {
  await stat(join(root, 'addon', 'vendor', 'yaml', 'package.json'));
} catch {
  throw new Error('Missing vendored YAML dependency: addon/vendor/yaml. Restore it from the repository; no app-private fallback is used.');
}
console.log(JSON.stringify({ runtime: out, platform, modules: modules.length, replacements: replacements.map(row => row[2]) }));
