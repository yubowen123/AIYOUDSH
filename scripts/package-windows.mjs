import assert from 'node:assert/strict';
import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareDistributionDocuments } from './release-documents.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const delivery = resolve(root, '..');
if (process.platform !== 'win32' || process.arch !== 'x64') throw new Error('The Windows GUI package must be built and tested on Windows x64.');
const { version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const runtime = join(root, 'dist', 'addon', 'runtime');
const manifest = JSON.parse(await readFile(join(runtime, 'manifest.json'), 'utf8'));
assert.equal(manifest.upstream?.platform, 'win32-x64', 'Build the win32-x64 runtime before packaging Windows.');
assert.equal(manifest.version, version, 'Runtime version must match the release version.');

function run(executable, args, options = {}) {
  const result = spawnSync(executable, args, { encoding: 'utf8', windowsHide: true, timeout: 180_000, ...options });
  if (result.error || result.status !== 0) throw new Error(`Packaging command failed: ${basename(executable)}\n${result.error?.message || result.stderr || result.stdout}`);
  return result;
}
const stage = join(root, 'dist', 'windows', 'AIYOUDSH');
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
await cp(runtime, join(stage, 'runtime'), { recursive: true });
await cp(join(root, 'addon'), join(stage, 'installer'), {
  recursive: true,
  filter: path => !relative(join(root, 'addon'), path).split(sep).includes('test') && !path.endsWith('.test.mjs'),
});
await prepareDistributionDocuments(root, stage, version);
const screenshot = join(root, 'dist', 'windows-installer-ci.png');
run('powershell.exe', [
  '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', join(root, 'installer-win', 'build.ps1'),
  '-OutputDirectory', stage, '-ResourcesSource', stage, '-SelfTest', '-ScreenshotPath', screenshot,
]);

const gui = await readFile(join(stage, 'AIYOUDSHInstaller.exe'));
assert.equal(gui.subarray(0, 2).toString('ascii'), 'MZ', 'The package must contain a compiled Windows PE executable.');
assert.ok(gui.length > 16_000, 'The Windows GUI executable is incomplete.');
const selfTest = JSON.parse(await readFile(join(stage, 'windows-installer-self-test.json'), 'utf8'));
assert.equal(selfTest.ok, true);
assert.equal(selfTest.profileTouched, false);
assert.ok(selfTest.checks >= 12, 'All Windows GUI self-tests must run.');
const pixels = await readFile(screenshot);
assert.equal(pixels.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'The CI screenshot must be a real PNG produced by the Windows GUI.');
assert.ok(pixels.length > 500);
await cp(join(stage, 'windows-installer-self-test.json'), join(root, 'dist', 'windows-installer-self-test.json'));
await rm(join(stage, 'windows-installer-self-test.json'));
for (const entry of ['安装.cmd', '卸载.cmd', 'install.ps1', 'uninstall.ps1', 'installer/installer.mjs', 'runtime/manifest.json', 'README.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md']) {
  assert.ok((await stat(join(stage, entry))).isFile(), `Missing Windows release resource: ${entry}`);
}

const zip = join(delivery, `AIYOUDSH-v${version}-windows-x64.zip`);
await rm(zip, { force: true });
const sevenZip = process.env.AIYOUDSH_7ZIP || join(process.env.ProgramFiles || 'C:\\Program Files', '7-Zip', '7z.exe');
run(sevenZip, ['a', '-tzip', '-mx=7', zip, basename(stage)], { cwd: dirname(stage) });
const sha256 = createHash('sha256').update(await readFile(zip)).digest('hex');
await writeFile(zip + '.sha256', `${sha256}  ${basename(zip)}\n`);
const report = {
  ok: true, version, platform: 'win32-x64', archive: basename(zip), sha256,
  gui: { compiledPE: true, selfTestChecks: selfTest.checks, profileTouched: false, screenshot: basename(screenshot) },
  officialApplicationIncluded: false, userDesktopAcceptance: false,
};
await writeFile(join(root, 'dist', 'windows-package-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report));
