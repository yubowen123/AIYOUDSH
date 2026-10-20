import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runtime = join(root, 'dist', 'addon', 'runtime');
const manifest = JSON.parse(await readFile(join(runtime, 'manifest.json'), 'utf8'));
const checks = [];
const seen = new Set();
for (const module of manifest.modules) {
  if (seen.has(module.id)) throw new Error('Duplicate module: ' + module.id);
  seen.add(module.id);
  const folder = resolve(runtime, module.directory);
  if (!folder.startsWith(runtime + '/')) throw new Error('Module path escapes runtime');
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
const report = { ok: true, modules: checks.length, nativeOverrides: 2, installerSyntax: true, checks };
await writeFile(join(root, 'dist', 'addon-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ok: true, modules: checks.length, nativeOverrides: 2, installerSyntax: true }));
