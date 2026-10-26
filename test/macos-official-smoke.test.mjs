import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parseSmokeOptions, validatePinnedInputs, validateRuntimeEvidence, assertIsolatedPath, verifyArchive, validateArchiveEntries, parseOfficialResult } from '../scripts/ci/macos-official-smoke.mjs';

const digest = 'a'.repeat(64);
function fixture() {
  const upstream = { platform: 'darwin-x64', appVersion: '0.2.1-rc.1', buildCommit: 'b'.repeat(40), appAsarSha256: digest, compatibility: [{ package: '@deepseek-ai/dsh-client-ui-sidebar', file: 'lib/client.js', sha256: digest }] };
  return { baseline: { schemaVersion: 1, ...upstream, arch: 'x64', os: 'darwin', archiveSize: 3, archiveSha256: digest, sourceUrl: 'https://download.deepseek.com/dsh-desk/bin/mac-x64/official.zip', executable: 'Contents/MacOS/DeepSeek Harness' }, manifest: { schemaVersion: 1, version: 'test', upstream, modules: [], patches: [] } };
}

test('macOS smoke accepts explicit isolated paths and rejects incomplete or duplicate CLI flags', () => {
  const options = parseSmokeOptions(['--app', './isolated.app', '--runtime', './runtime', '--report', './report.json']);
  assert.equal(options.app, resolve('isolated.app'));
  assert.equal(options.runtime, resolve('runtime'));
  assert.equal(options.report, resolve('report.json'));
  for (const args of [['--app'], ['--app', '--runtime'], ['--app', 'one', '--app', 'two'], ['--_testHost', 'darwin-x64'], ['--unknown', 'x']]) assert.throws(() => parseSmokeOptions(args));
});

test('pinned target validation rejects renamed ARM runtimes and changed compatibility or archive evidence', () => {
  const { baseline, manifest } = fixture();
  assert.doesNotThrow(() => validatePinnedInputs(baseline, manifest));
  for (const changed of [
    { ...manifest, upstream: { ...manifest.upstream, platform: 'darwin-arm64' } },
    { ...manifest, upstream: { ...manifest.upstream, buildCommit: 'c'.repeat(40) } },
    { ...manifest, upstream: { ...manifest.upstream, compatibility: [] } },
  ]) assert.throws(() => validatePinnedInputs(baseline, changed));
  for (const changed of [
    { ...baseline, sourceUrl: 'https://download.deepseek.com.attacker.example/official.zip' },
    { ...baseline, sourceUrl: 'https://user:secret@download.deepseek.com/official.zip' },
    { ...baseline, archiveSha256: 'invalid' },
    { ...baseline, archiveSize: 0 },
    { ...baseline, executable: '../foreign' },
  ]) assert.throws(() => validatePinnedInputs(changed, manifest));
});

test('actual x64 process evidence distinguishes Rosetta from Intel hardware and rejects ARM or ambiguous evidence', () => {
  const actual = { platform: 'darwin', arch: 'x64', node: '24.14.0', executable: '/isolated/app', pid: 123, translated: '1', hardwareArm64: '1' };
  const rosetta = validateRuntimeEvidence(actual);
  assert.equal(rosetta.executionMode, 'rosetta-x64');
  assert.equal(rosetta.nativeIntelHardware, false);
  const intel = validateRuntimeEvidence({ ...actual, translated: null, hardwareArm64: '0', cpuVendor: 'GenuineIntel', cpuBrand: 'Intel(R) Core(TM) i7', hardwareMachine: 'x86_64' });
  assert.equal(intel.executionMode, 'native-intel-x64');
  assert.equal(intel.nativeIntelHardware, true);
  for (const changed of [{ ...actual, arch: 'arm64' }, { ...actual, platform: 'linux' }, { ...actual, translated: null }, { ...actual, translated: '0', hardwareArm64: '1' }, { ...actual, pid: 0 }]) assert.throws(() => validateRuntimeEvidence(changed));
});

test('native Intel sysctl evidence remains valid when the optional ARM and translation keys do not exist', () => {
  const actual = { platform: 'darwin', arch: 'x64', node: '24.21.0', executable: '/isolated/official-app', pid: 456, translated: null, hardwareArm64: null, cpuVendor: 'GenuineIntel', cpuBrand: 'Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz', hardwareMachine: 'x86_64' };
  for (const value of [actual, { ...actual, cpuVendor: null }, { ...actual, cpuBrand: null }, { ...actual, translated: '0' }]) {
    const evidence = validateRuntimeEvidence(value);
    assert.equal(evidence.executionMode, 'native-intel-x64');
    assert.equal(evidence.nativeIntelHardware, true);
  }
  const translated = validateRuntimeEvidence({ ...actual, translated: '1' });
  assert.equal(translated.executionMode, 'rosetta-x64');
  assert.equal(translated.nativeIntelHardware, false);
});

test('missing optional sysctl keys never turn Apple, unknown or contradictory hardware into Intel', () => {
  const actual = { platform: 'darwin', arch: 'x64', node: '24.21.0', executable: '/isolated/official-app', pid: 456, translated: null, hardwareArm64: null, cpuVendor: null, cpuBrand: null, hardwareMachine: null };
  for (const value of [
    actual,
    { ...actual, hardwareMachine: 'x86_64' },
    { ...actual, hardwareArm64: '0', hardwareMachine: 'x86_64', cpuBrand: 'Unknown Virtual CPU' },
    { ...actual, cpuVendor: 'Apple', cpuBrand: 'Apple M5 Max', hardwareMachine: 'arm64' },
    { ...actual, cpuBrand: 'Apple M5 Max', hardwareMachine: 'x86_64' },
    { ...actual, hardwareArm64: '1', cpuVendor: 'GenuineIntel', cpuBrand: 'Intel(R) Xeon' },
    { ...actual, hardwareMachine: 'arm64', cpuVendor: 'GenuineIntel' },
    { ...actual, translated: 'invalid', cpuVendor: 'GenuineIntel' },
  ]) assert.throws(() => validateRuntimeEvidence(value), /Unable to distinguish/);
});

test('isolation fence rejects official application and user profile locations without rejecting similarly named fixtures', () => {
  const protectedRoots = ['/Applications', '/Users/test/Applications', '/Users/test/.dsh'];
  for (const path of ['/Applications/DeepSeek Harness.app', '/Applications', '/Users/test/.dsh/profiles/desktop', '/Users/test/Applications/app']) assert.throws(() => assertIsolatedPath(path, protectedRoots));
  assert.doesNotThrow(() => assertIsolatedPath('/private/tmp/isolated/DeepSeek Harness.app', protectedRoots));
  assert.doesNotThrow(() => assertIsolatedPath('/Applications-copy/DeepSeek Harness.app', protectedRoots));
});

test('archive size and SHA256 are checked against bytes before extraction', async t => {
  const temporary = await mkdtemp(join(tmpdir(), 'aiyoudsh-macos-archive-test-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const path = join(temporary, 'download.zip');
  await writeFile(path, 'zip');
  const baseline = { archiveSize: 3, archiveSha256: createHash('sha256').update('zip').digest('hex') };
  assert.equal(await verifyArchive(path, baseline), baseline.archiveSha256);
  await assert.rejects(verifyArchive(path, { ...baseline, archiveSize: 4 }), /size/);
  await assert.rejects(verifyArchive(path, { ...baseline, archiveSha256: digest }), /SHA-256/);
});

test('ZIP entry inspection rejects absolute and traversing paths before ditto receives the archive', () => {
  assert.doesNotThrow(() => validateArchiveEntries(['DeepSeek Harness.app/Contents/Info.plist', '__MACOSX/DeepSeek Harness.app/._Contents']));
  for (const entry of ['/Applications/app', '../app', 'DeepSeek Harness.app/../../foreign', 'DeepSeek Harness.app\\..\\foreign', 'other.app/Contents/Info.plist']) assert.throws(() => validateArchiveEntries([entry]));
});

test('official process evidence admits only the private structured marker and never treats a failed exit as success', () => {
  const marker = 'AIYOUDSH_OFFICIAL_SMOKE_JSON:';
  assert.deepEqual(parseOfficialResult({ status: 0, stdout: 'unrelated log\n' + marker + '{"arch":"x64"}\n' }), { arch: 'x64' });
  assert.throws(() => parseOfficialResult({ status: 1, stdout: marker + '{"ok":true}\n', stderr: 'unstructured output' }), /process failed/);
  assert.throws(() => parseOfficialResult({ status: 0, stdout: '{"arch":"x64"}\n' }), /structured smoke evidence/);
  assert.throws(() => parseOfficialResult({ status: 1, stdout: marker + '{"ok":false,"code":"NATIVE_MODULE","message":"native load failed","checks":[{"check":"native-sqlite","ok":true}]}\n' }), error => error.code === 'NATIVE_MODULE' && error.message === 'native load failed' && error.completedChecks?.[0]?.check === 'native-sqlite');
});
