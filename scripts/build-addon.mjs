import { cp, mkdir, readFile, writeFile, rm, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist', 'addon', 'runtime');
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
  await cp(source, target, { recursive: true, filter: path => !path.includes('/src-recovered') && !path.includes('/src/') && !path.includes('/test/') && !path.endsWith('/reconstruction.json') && !path.endsWith('.test.mjs') });
  const manifest = JSON.parse(await readFile(join(source, 'reconstruction.json'), 'utf8'));
  for (const entry of manifest.entries) {
    let data = Buffer.concat(await Promise.all(entry.parts.map(part => readFile(join(source, part.file)))));
    if (entry.output === 'lib/client.js') {
      const text = data.toString('utf8');
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
  upstream: { appVersion: '0.2.1-rc.2', buildCommit: '332895e0f7c9d4dbfb29729f5eb367fa263ff986',
    appAsarSha256: 'b9ec4c2bbc20c9dbc3e39fa4c961434a943434ab0a803052b26753dd15f3b066', compatibility },
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
console.log(JSON.stringify({ runtime: out, modules: modules.length, replacements: replacements.map(row => row[2]) }));
