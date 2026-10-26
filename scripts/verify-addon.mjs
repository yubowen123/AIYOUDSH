import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, join, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { platformBaseline, rewriteThemeSelectors } from './platform-targets.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--runtime')) throw new Error('Use --runtime DIRECTORY');
const runtime = args.length ? resolve(args[1]) : join(root, 'dist', 'addon', 'runtime');
const manifest = JSON.parse(await readFile(join(runtime, 'manifest.json'), 'utf8'));
const baseline = await platformBaseline(root, manifest.upstream.platform);
for (const field of ['appVersion','buildCommit','appAsarSha256']) if (manifest.upstream[field] !== baseline[field]) throw new Error('Runtime platform baseline mismatch: ' + field);
if (JSON.stringify(manifest.upstream.compatibility) !== JSON.stringify(baseline.compatibility)) throw new Error('Runtime compatibility evidence was changed');
if (baseline.selectorMapping) {
  const descriptor = JSON.parse(await readFile(join(root,baseline.selectorMapping),'utf8'));
  const expected = rewriteThemeSelectors(await readFile(join(root,'aiyou/modules/theme/client.js'),'utf8'), descriptor);
  if (await readFile(join(runtime,'modules/aiyou-enhancer-theme/client.js'),'utf8') !== expected.source) throw new Error('Theme native selectors differ from the checked official export map');
}
const mediaDirectory = join(runtime, 'vendor', 'media-tools');
for (const entry of await readdir(mediaDirectory, { withFileTypes: true })) {
  if (entry.isDirectory() && /^(darwin|win32|linux)-(arm64|x64)$/.test(entry.name) && entry.name !== manifest.upstream.platform)
    throw new Error('A foreign native media payload was packaged: ' + entry.name);
}
if (manifest.upstream.platform.startsWith('darwin-')) {
  for (const executable of ['ffmpeg','ffprobe']) await stat(join(mediaDirectory,manifest.upstream.platform,'bin',executable));
}
const checks = [];
const seen = new Set();
for (const module of manifest.modules) {
  if (seen.has(module.id)) throw new Error('Duplicate module: ' + module.id);
  seen.add(module.id);
  const folder = resolve(runtime, module.directory);
  const moduleRelative = relative(runtime, folder);
  if (moduleRelative.startsWith('..') || isAbsolute(moduleRelative)) throw new Error('Module path escapes runtime');
  const pkg = JSON.parse(await readFile(join(folder, 'package.json'), 'utf8'));
  if (pkg.name !== module.name) throw new Error('Package identity mismatch: ' + module.id);
  if (pkg.dsh?.client) {
    const client = join(folder, module.replaces ? 'lib/client.js' : 'client.js');
    const source = await readFile(client, 'utf8');
    const identity = /\bid\s*:\s*(['"])([^'"]+)\1/u.exec(source)?.[2];
    if (identity !== module.name) throw new Error('Client identity mismatch: ' + module.id);
    if (source.includes('127.0.0.1:19387')) throw new Error('Fixed host port remains: ' + module.id);
    const syntax = spawnSync(process.execPath, ['--check', client], { encoding: 'utf8' });
    if (syntax.status !== 0) throw new Error(syntax.stderr);
  }
  checks.push({ module: module.id, identity: true, syntax: true });
}
for (const id of ['ui-sidebar', 'ui-workspace']) if (!manifest.patches.some(p => p.id === id && p.disabled)) throw new Error('Missing native override: ' + id);
const installer = join(root, 'addon', 'installer.mjs');
await stat(installer);
const syntax = spawnSync(process.execPath, ['--check', installer], { encoding: 'utf8' });
if (syntax.status !== 0) throw new Error(syntax.stderr);
const report = { ok: true, platform: manifest.upstream.platform, modules: checks.length, nativeOverrides: 2, installerSyntax: true, checks };
await writeFile(join(root, 'dist', 'addon-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ok: true, platform: manifest.upstream.platform, modules: checks.length, nativeOverrides: 2, installerSyntax: true }));
