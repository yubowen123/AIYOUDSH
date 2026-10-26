import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { buildInstaller } from '../installer-ui/build.mjs';
import { parsePackageOptions, validateRuntimeManifest } from '../scripts/package-addon.mjs';

const execute = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));

test('macOS packaging defaults to the process architecture and accepts an explicit cross target', () => {
  for (const arch of ['arm64', 'x64']) {
    const options = parsePackageOptions([], { platform: 'darwin', arch });
    assert.equal(options.platform, `darwin-${arch}`);
    assert.equal(options.arch, arch);
    assert.equal(options.runtime, join(root, 'dist/addon/runtime'));
  }
  const options = parsePackageOptions(['--out', './delivery', '--platform', 'darwin-x64', '--runtime', './intel-runtime'], { platform: 'darwin', arch: 'arm64' });
  assert.equal(options.platform, 'darwin-x64');
  assert.equal(options.runtime, resolve('./intel-runtime'));
  assert.equal(options.delivery, resolve('./delivery'));
  for (const args of [['--platform', 'win32-x64'], ['--platform', 'darwin-ia32'], ['--out'], ['--runtime', '--out', 'delivery'], ['--out', 'one', '--out', 'two'], ['--arch', 'x64']]) {
    assert.throws(() => parsePackageOptions(args, { platform: 'darwin', arch: 'arm64' }));
  }
  assert.throws(() => parsePackageOptions(['--platform', 'darwin-x64'], { platform: 'linux', arch: 'x64' }), /built on macOS/);
});

test('macOS runtime validation preserves each target upstream version and rejects relabeled ARM data', () => {
  const manifest = { schemaVersion: 1, version: '0.8.3', upstream: { platform: 'darwin-x64', appVersion: '0.2.1-rc.1', buildCommit: 'intel-build' } };
  assert.doesNotThrow(() => validateRuntimeManifest(manifest, { platform: 'darwin-x64', version: '0.8.3' }));
  assert.throws(() => validateRuntimeManifest(manifest, { platform: 'darwin-arm64', version: '0.8.3' }), /darwin-arm64 runtime/);
  assert.throws(() => validateRuntimeManifest(manifest, { platform: 'darwin-x64', version: '0.8.4' }), /Runtime version/);
  assert.throws(() => validateRuntimeManifest({ ...manifest, upstream: {} }, { platform: 'darwin-x64', version: '0.8.3' }), /runtime target is missing/);
});

test('a renamed ARM runtime is rejected before the CLI creates its output directory', { skip: process.platform !== 'darwin' }, async t => {
  const temporary = await mkdtemp(join(tmpdir(), 'aiyoudsh-package-preflight-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const output = join(temporary, 'delivery');
  const { version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  await writeFile(join(temporary, 'manifest.json'), JSON.stringify({ schemaVersion: 1, version, upstream: { platform: 'darwin-arm64' } }));
  await assert.rejects(execute(process.execPath, [join(root, 'scripts/package-addon.mjs'), '--platform', 'darwin-x64', '--runtime', temporary, '--out', output]), /runtime target is darwin-arm64/);
  await assert.rejects(access(output), { code: 'ENOENT' });
});

test('invalid installer architecture cannot create an application bundle', async t => {
  const temporary = await mkdtemp(join(tmpdir(), 'aiyoudsh-installer-preflight-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const app = join(temporary, 'Invalid.app');
  for (const arch of ['ia32', 'x86_64', '__proto__']) await assert.rejects(buildInstaller(app, undefined, { arch }), /arm64 or x64/);
  await assert.rejects(access(app), { code: 'ENOENT' });
});

test('AppKit builds match their native and cross architecture without launching the installer', { skip: process.platform !== 'darwin', timeout: 120_000 }, async t => {
  const temporary = await mkdtemp(join(tmpdir(), 'aiyoudsh-installer-architectures-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  for (const arch of [process.arch, process.arch === 'arm64' ? 'x64' : 'arm64']) {
    const result = arch === process.arch
      ? await buildInstaller(join(temporary, `${arch}.app`))
      : await buildInstaller(join(temporary, `${arch}.app`), undefined, { arch });
    const { stdout: architecture } = await execute('/usr/bin/lipo', ['-archs', result.executablePath]);
    const { stdout: format } = await execute('/usr/bin/file', [result.executablePath]);
    const { stdout: minimumSystemVersion } = await execute('/usr/bin/plutil', ['-extract', 'LSMinimumSystemVersion', 'raw', '-o', '-', result.infoPath]);
    assert.equal(result.architecture, arch);
    assert.equal(architecture.trim(), arch === 'x64' ? 'x86_64' : 'arm64');
    assert.match(format, /Mach-O 64-bit executable/);
    assert.equal(minimumSystemVersion.trim(), arch === 'x64' ? '13.0' : '12.0');
  }
});
