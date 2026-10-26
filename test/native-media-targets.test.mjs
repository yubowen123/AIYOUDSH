import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../aiyou/vendor/media-tools/darwin-x64/', import.meta.url);
// Published GitHub release asset digests, independent of the local manifest.
// https://github.com/eugeneware/ffmpeg-static/releases/tag/b6.1.1
const published = {
  ffmpeg: { bytes: 78862176, sha256: 'ebdddc936f61e14049a2d4b549a412b8a40deeff6540e58a9f2a2da9e6b18894' },
  ffprobe: { bytes: 78780408, sha256: 'fa3add0ce901f7241abe0dfc0155d958fc834aca3f8ce61f87cc712ae669c1e0' },
};

for (const [name, expected] of Object.entries(published)) {
  test(`darwin-x64 ${name} is a genuine Intel Mach-O matching the publisher digest`, async () => {
    const file = new URL(`bin/${name}`, root);
    const bytes = await readFile(file);
    assert.equal(bytes.readUInt32LE(0), 0xfeedfacf, 'Expected a thin 64-bit Mach-O executable');
    assert.equal(bytes.readUInt32LE(4), 0x01000007, 'CPU_TYPE_X86_64: an ARM file renamed to x64 must fail');
    assert.equal(bytes.length, expected.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256);
    if (process.platform !== 'win32') assert.ok((await stat(file)).mode & 0o111, 'Executable bit must survive packaging');
  });
}

test('Intel media provenance preserves exact source, release mismatch and GPL license', async () => {
  const provenance = JSON.parse(await readFile(new URL('provenance.json', root), 'utf8'));
  assert.equal(provenance.platform, 'darwin');
  assert.equal(provenance.hostArchitecture, 'x64');
  assert.equal(provenance.verifiedArchitecture, 'x86_64');
  assert.equal(provenance.sourceFilesUnchanged, true);
  assert.equal(provenance.upstreamVersion, '6.1.1-tessus');
  assert.equal(provenance.upstreamReadmeVersion, '8.0');
  assert.equal(provenance.license.spdx, 'GPL-3.0-or-later');
  assert.match(provenance.sourceUrl, /^https:\/\/github\.com\/FFmpeg\/FFmpeg\/tree\/n6\.1\.1$/);
  for (const [name, expected] of Object.entries(published)) {
    const asset = provenance.artifacts.find(item => item.path === `bin/${name}`);
    assert.ok(asset, `${name} must have its own provenance`);
    assert.equal(asset.sha256, expected.sha256);
    assert.equal(asset.publishedSha256, expected.sha256);
    assert.equal(asset.bytes, expected.bytes);
    assert.equal(asset.releaseAssetUrl, `https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/${name}-darwin-x64`);
  }
  const license = await readFile(new URL('licenses/COPYING.GPLv3', root), 'utf8');
  assert.match(license, /GNU GENERAL PUBLIC LICENSE/);
  assert.match(license, /Version 3, 29 June 2007/);
});

test('Intel media binaries load only portable macOS system libraries', { skip: process.platform !== 'darwin' }, () => {
  for (const name of Object.keys(published)) {
    const file = fileURLToPath(new URL(`bin/${name}`, root));
    assert.equal(execFileSync('/usr/bin/lipo', ['-archs', file], { encoding: 'utf8' }).trim(), 'x86_64');
    const output = execFileSync('/usr/bin/otool', ['-L', file], { encoding: 'utf8' });
    const dependencies = output.split('\n').slice(1).map(line => line.trim().split(' (')[0]).filter(Boolean);
    assert.ok(dependencies.length > 0);
    for (const dependency of dependencies) assert.match(dependency, /^\/(?:usr\/lib\/|System\/Library\/)/, `Unbundled non-system dependency: ${dependency}`);
  }
});
