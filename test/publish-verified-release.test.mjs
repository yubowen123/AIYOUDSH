import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { REPOSITORY, REQUIRED_JOBS, archiveFiles, createGitHubClient, publishVerifiedRelease, validateDraftRelease, validateInputs, validateJobs, validateRemoteAssets, validateVerifiedRun, verifyArchive } from '../scripts/publish-verified-release.mjs';

const headSha = 'a'.repeat(40), otherSha = 'b'.repeat(40), runId = '12345', tag = 'v0.8.4', version = '0.8.4';
const validRun = () => ({ id: Number(runId), repository: { full_name: REPOSITORY, fork: false }, head_repository: { full_name: REPOSITORY, fork: false }, event: 'push', head_branch: 'main', path: '.github/workflows/verify.yml', status: 'completed', conclusion: 'success', head_sha: headSha, run_attempt: 1 });
const validJobs = () => REQUIRED_JOBS.map(name => ({ name, run_id: Number(runId), head_sha: headSha, run_attempt: 1, status: 'completed', conclusion: 'success' }));
const validEnv = temporary => ({ GITHUB_REPOSITORY: REPOSITORY, GITHUB_EVENT_NAME: 'workflow_dispatch', GITHUB_REF: 'refs/heads/main', GITHUB_SHA: headSha, GH_TOKEN: 'offline-fixture-token', VERIFY_RUN_ID: runId, RELEASE_TAG: tag, RUNNER_TEMP: temporary });
const draft = () => ({ id: 42, tag_name: tag, target_commitish: headSha, draft: true, prerelease: false });
const digest = data => createHash('sha256').update(data).digest('hex');

test('manual publication inputs accept only the fixed repository, stable tag and numeric run', () => {
  const env = validEnv(tmpdir());
  assert.deepEqual(validateInputs(env), { runId, tag, version, dispatchSha: headSha });
  for (const patch of [
    { GITHUB_REPOSITORY: 'fork/AIYOUDSH' }, { GITHUB_EVENT_NAME: 'push' }, { GITHUB_REF: 'refs/heads/feature' },
    { VERIFY_RUN_ID: '12; echo unsafe' }, { VERIFY_RUN_ID: '' }, { RELEASE_TAG: 'v0.8.4-rc.1' },
    { RELEASE_TAG: 'v00.8.4' }, { RELEASE_TAG: '0.8.4' }, { RELEASE_TAG: 'v0.8.4+build' }, { GH_TOKEN: '' },
  ]) assert.throws(() => validateInputs({ ...env, ...patch }));
});

test('Verify provenance rejects fork, PR, workflow, incomplete and head mismatches', () => {
  assert.doesNotThrow(() => validateVerifiedRun(validRun(), { runId, headSha }));
  for (const patch of [
    { repository: { full_name: 'fork/AIYOUDSH' } }, { head_repository: { full_name: 'fork/AIYOUDSH' } },
    { head_repository: { full_name: REPOSITORY, fork: true } }, { event: 'pull_request' }, { head_branch: 'feature' },
    { path: '.github/workflows/another.yml' }, { conclusion: 'failure' }, { status: 'in_progress' }, { head_sha: otherSha },
  ]) assert.throws(() => validateVerifiedRun({ ...validRun(), ...patch }, { runId, headSha }));
  assert.throws(() => validateVerifiedRun(validRun(), { runId: '999', headSha }));
});

test('all three native Verify jobs must succeed in the same run attempt and commit', () => {
  const options = { runId, headSha, attempt: 1 };
  assert.doesNotThrow(() => validateJobs(validJobs(), options));
  assert.throws(() => validateJobs(validJobs().slice(0, 2), options), /Verify win32-x64/);
  for (const patch of [{ conclusion: 'failure' }, { conclusion: 'skipped' }, { head_sha: otherSha }, { run_id: 99 }, { run_attempt: 2 }]) {
    const jobs = validJobs(); jobs[1] = { ...jobs[1], ...patch };
    assert.throws(() => validateJobs(jobs, options), /Verify darwin-x64/);
  }
  assert.throws(() => validateJobs([...validJobs(), validJobs()[0]], options), /exactly one/);
});

test('published releases, drifting drafts and conflicting asset digests are never overwritten', () => {
  assert.doesNotThrow(() => validateDraftRelease(draft(), { tag, headSha }));
  for (const patch of [{ draft: false }, { target_commitish: 'main' }, { target_commitish: otherSha }, { prerelease: true }]) {
    assert.throws(() => validateDraftRelease({ ...draft(), ...patch }, { tag, headSha }));
  }
  const local = [{ name: 'asset.zip', size: 3, sha256: digest('abc') }];
  const remote = [{ name: 'asset.zip', size: 3, digest: 'sha256:' + digest('abc'), state: 'uploaded' }];
  assert.deepEqual([...validateRemoteAssets(remote, local, { complete: true })], ['asset.zip']);
  for (const patch of [{ digest: 'sha256:' + digest('bad') }, { digest: null }, { size: 4 }, { state: 'starter' }, { name: 'unexpected.zip' }]) {
    assert.throws(() => validateRemoteAssets([{ ...remote[0], ...patch }], local));
  }
  assert.throws(() => validateRemoteAssets([], local, { complete: true }), /missing/);
});

test('GitHub API failures preserve their HTTP status instead of appearing to be missing releases', async () => {
  let request;
  const client = createGitHubClient('offline-token', async (url, options) => {
    request = { url, options };
    return { ok: false, status: 503 };
  });
  await assert.rejects(client.api('releases'), { status: 503 });
  assert.equal(request.url, 'https://api.github.com/repos/' + REPOSITORY + '/releases');
  assert.equal(request.options.headers.Authorization, 'Bearer offline-token');
});

test('artifact archive selection rejects an incorrect version or duplicate archive', async t => {
  const temporary = await mkdtemp(join(tmpdir(), 'aiyoudsh-release-archives-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  await writeFile(join(temporary, 'AIYOUDSH-v0.8.3-macos-x64.zip'), 'old archive');
  await assert.rejects(archiveFiles(temporary, [`AIYOUDSH-${tag}-macos-x64.zip`]), /Unexpected/);
  await rm(join(temporary, 'AIYOUDSH-v0.8.3-macos-x64.zip'));
  const name = `AIYOUDSH-${tag}-macos-x64.zip`;
  await writeFile(join(temporary, name), 'first');
  await mkdir(join(temporary, 'nested'));
  await writeFile(join(temporary, 'nested', name), 'duplicate');
  await assert.rejects(archiveFiles(temporary, [name]), /duplicate/);
});

test('real ZIP metadata verifies source and runtime versions without extracting files', { skip: process.platform === 'win32' }, async t => {
  const temporary = await mkdtemp(join(tmpdir(), 'aiyoudsh-release-zip-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const source = join(temporary, 'source.zip'), mac = join(temporary, 'mac.zip');
  const createZip = (file, entries) => execFileSync('python3', ['-c', 'import json,sys\nfrom zipfile import ZipFile\nwith ZipFile(sys.argv[1], "w") as archive:\n for name, value in json.load(sys.stdin).items(): archive.writestr(name,json.dumps(value))', file], { input: JSON.stringify(entries) });
  createZip(source, { 'AIYOUDSH-source/package.json': { version }, 'AIYOUDSH-source/installer-win/安装.cmd': '@echo off' });
  assert.equal(execFileSync('python3', ['-c', 'import sys\nfrom zipfile import ZipFile\nwith ZipFile(sys.argv[1]) as bundle: print(bool(bundle.getinfo("AIYOUDSH-source/installer-win/安装.cmd").flag_bits & 0x800))', source], { encoding: 'utf8' }).trim(), 'True');
  assert.equal((await verifyArchive(source, { version })).platform, 'source');
  await assert.rejects(verifyArchive(source, { version: '0.8.5' }), /version mismatch/);
  const manifest = { version, upstream: { platform: 'darwin-x64' } };
  createZip(mac, { 'AIYOUDSH/runtime/manifest.json': manifest, 'AIYOUDSH/AIYOUDSH 增强安装器.app/Contents/Resources/runtime/manifest.json': manifest });
  assert.equal((await verifyArchive(mac, { version, platform: 'darwin-x64' })).platform, 'darwin-x64');
  // Reproduce ditto's unflagged UTF-8 filenames without extracting them.
  execFileSync('python3', ['-c', 'import sys,struct\nfrom pathlib import Path\np=Path(sys.argv[1]); data=bytearray(p.read_bytes())\nfor signature,offset in [(b"PK\\x03\\x04",6),(b"PK\\x01\\x02",8)]:\n start=0\n while True:\n  start=data.find(signature,start)\n  if start<0: break\n  flags=struct.unpack_from("<H",data,start+offset)[0];struct.pack_into("<H",data,start+offset,flags & ~0x800);start+=4\np.write_bytes(data)', mac]);
  const metadata = JSON.parse(execFileSync('python3', ['-c', 'import json,sys\nfrom zipfile import ZipFile\nexpected="AIYOUDSH/AIYOUDSH 增强安装器.app/Contents/Resources/runtime/manifest.json"\nwith ZipFile(sys.argv[1]) as bundle: default_found=expected in bundle.namelist()\nwith ZipFile(sys.argv[1],metadata_encoding="utf-8") as bundle: print(json.dumps({"defaultFound":default_found,"utf8Found":expected in bundle.namelist(),"flag":bool(bundle.getinfo(expected).flag_bits & 0x800)}))', mac], { encoding: 'utf8' }));
  assert.deepEqual(metadata, { defaultFound: false, utf8Found: true, flag: false });
  assert.equal((await verifyArchive(mac, { version, platform: 'darwin-x64' })).platform, 'darwin-x64');
  await assert.rejects(verifyArchive(mac, { version, platform: 'darwin-arm64' }), /platform mismatch/);
  createZip(mac, { 'AIYOUDSH/runtime/manifest.json': manifest, 'AIYOUDSH/AIYOUDSH 增强安装器.app/Contents/Resources/runtime/manifest.json': { ...manifest, version: '0.8.3' } });
  await assert.rejects(verifyArchive(mac, { version, platform: 'darwin-x64' }), /version mismatch/);
});

test('native ditto archives retain both outer and Chinese app runtime manifest checks', { skip: process.platform !== 'darwin' }, async t => {
  const temporary = await mkdtemp(join(tmpdir(), 'aiyoudsh-release-ditto-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const source = join(temporary, 'AIYOUDSH'), archive = join(temporary, 'native-ditto.zip');
  const outer = join(source, 'runtime'), inner = join(source, 'AIYOUDSH 增强安装器.app/Contents/Resources/runtime');
  for (const directory of [outer, inner]) {
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'manifest.json'), JSON.stringify({ version, upstream: { platform: 'darwin-x64' } }));
  }
  execFileSync('/usr/bin/ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', source, archive]);
  const before = digest(await readFile(archive));
  assert.equal((await verifyArchive(archive, { version, platform: 'darwin-x64' })).platform, 'darwin-x64');
  assert.equal(digest(await readFile(archive)), before);
  await writeFile(join(outer, 'manifest.json'), JSON.stringify({ version, upstream: { platform: 'darwin-arm64' } }));
  await rm(archive);
  execFileSync('/usr/bin/ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', source, archive]);
  await assert.rejects(verifyArchive(archive, { version, platform: 'darwin-x64' }), /platform mismatch/);
});

async function fixture(t, overrides = {}) {
  const temporary = await mkdtemp(join(tmpdir(), 'aiyoudsh-release-fixture-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const root = join(temporary, 'checkout');
  await mkdir(join(root, 'docs/releases'), { recursive: true });
  await writeFile(join(root, 'package.json'), JSON.stringify({ version: overrides.version || version }));
  await writeFile(join(root, 'docs/releases', tag + '.md'), '# Verified release fixture\n');
  const state = { run: validRun(), jobs: validJobs(), release: null, assets: [], tagCommit: null, mutations: [], commands: [], uploads: [], ...overrides };
  const client = {
    async api(path, options = {}) {
      if (options.method) state.mutations.push({ path, ...options });
      if (path === 'git/ref/heads/main') return { object: { type: 'commit', sha: state.mainSha || headSha } };
      if (path === 'git/ref/tags/' + tag) {
        if (!state.tagCommit) throw Object.assign(new Error('Tag missing'), { status: 404 });
        return { object: { type: 'commit', sha: state.tagCommit } };
      }
      if (path === 'actions/runs/' + runId) return structuredClone(state.run);
      if (path === 'releases' && options.method === 'POST') return state.release = { ...draft(), ...options.body };
      if (path === 'releases/42' && options.method === 'PATCH') {
        state.tagCommit = headSha;
        return state.release = { ...state.release, ...options.body };
      }
      if (path === 'releases/42' || path === 'releases/latest') return structuredClone(state.release);
      throw new Error('Unexpected API request: ' + path);
    },
    async list(path) {
      if (path === 'releases') return state.release ? [structuredClone(state.release)] : [];
      if (path === 'actions/runs/' + runId + '/jobs?filter=latest') return structuredClone(state.jobs);
      if (path === 'releases/42/assets') return structuredClone(state.assets);
      throw new Error('Unexpected API list: ' + path);
    },
  };
  async function runCommand(executable, args) {
    state.commands.push({ executable, args });
    if (executable === 'git') return state.checkoutSha || headSha;
    if (executable === 'python3') return JSON.stringify({ version: args[3], platform: args[4] || 'source' });
    assert.equal(executable, 'gh');
    assert.ok(!args.includes('--clobber'));
    if (args[0] === 'run') {
      assert.deepEqual(args.slice(0, 5), ['run', 'download', runId, '--repo', REPOSITORY]);
      const directory = join(args[args.indexOf('--dir') + 1], 'ci-release');
      const arch = args[args.indexOf('--name') + 1].slice('AIYOUDSH-darwin-'.length);
      await mkdir(directory, { recursive: true });
      await writeFile(join(directory, `AIYOUDSH-${tag}-macos-${arch}.zip`), 'verified-' + arch);
      await writeFile(join(directory, `AIYOUDSH-${tag}-source.zip`), 'verified-source-' + arch);
      return '';
    }
    assert.deepEqual(args.slice(0, 3), ['release', 'upload', tag]);
    const path = args[3], name = basename(path);
    state.uploads.push(name);
    if (state.failUpload === name) { state.failUpload = null; throw new Error('Simulated interrupted upload'); }
    const bytes = await readFile(path);
    state.assets.push({ id: state.assets.length + 1, name, size: bytes.length, digest: 'sha256:' + digest(bytes), state: 'uploaded' });
    return '';
  }
  return { state, run: () => publishVerifiedRelease({ root, env: validEnv(temporary), client, runCommand }) };
}

test('invalid provenance, missing job, version mismatch and advanced main cause no release mutation', async t => {
  for (const override of [
    { run: { ...validRun(), head_repository: { full_name: 'fork/AIYOUDSH' } } },
    { run: { ...validRun(), head_sha: otherSha } }, { jobs: validJobs().slice(0, 2) },
    { version: '0.8.3' }, { mainSha: otherSha }, { checkoutSha: otherSha },
    { release: { ...draft(), draft: false } }, { tagCommit: otherSha },
  ]) {
    const f = await fixture(t, override);
    await assert.rejects(f.run());
    assert.deepEqual(f.state.mutations, []);
    assert.ok(!f.state.commands.some(call => call.executable === 'gh'));
  }
});

test('successful publication uses ARM source, verifies remote hashes, then marks the release latest', async t => {
  const f = await fixture(t);
  const report = await f.run();
  assert.equal(report.latest, true);
  assert.equal(report.commit, headSha);
  assert.deepEqual(report.assets.map(asset => asset.name), [`AIYOUDSH-${tag}-macos-arm64.zip`, `AIYOUDSH-${tag}-macos-x64.zip`, `AIYOUDSH-${tag}-source.zip`, `AIYOUDSH-${tag}-SHA256SUMS.txt`]);
  assert.equal(report.assets.find(asset => asset.name.endsWith('-source.zip')).sha256, digest('verified-source-arm64'));
  assert.equal(f.state.mutations[0].body.draft, true);
  assert.equal(f.state.mutations[0].body.target_commitish, headSha);
  assert.equal(f.state.mutations[0].body.name, `AIYOUDSH ${tag}`);
  assert.ok(f.state.mutations[0].body.body.includes(`AIYOUDSH-${tag}-SHA256SUMS.txt`));
  assert.match(f.state.mutations[0].body.body, /Windows.*历史 v0\.5\.0/);
  assert.equal(f.state.mutations.at(-1).body.make_latest, 'true');
  assert.equal(f.state.release.draft, false);
});

test('an interrupted upload retains its draft and a retry skips identical existing assets', async t => {
  const f = await fixture(t, { failUpload: `AIYOUDSH-${tag}-macos-x64.zip` });
  await assert.rejects(f.run(), /interrupted upload/);
  assert.equal(f.state.release.draft, true);
  assert.equal(f.state.assets.length, 1);
  assert.equal(f.state.mutations.filter(call => call.method === 'PATCH').length, 0);
  assert.equal((await f.run()).ok, true);
  assert.equal(f.state.uploads.filter(name => name.endsWith('-macos-arm64.zip')).length, 1);
  assert.equal(f.state.mutations.filter(call => call.method === 'POST').length, 1);
});

test('a conflicting existing draft attachment prevents all uploads and publication', async t => {
  const f = await fixture(t, { release: draft(), assets: [{ id: 1, name: `AIYOUDSH-${tag}-macos-arm64.zip`, size: 14, digest: 'sha256:' + digest('different'), state: 'uploaded' }] });
  await assert.rejects(f.run(), /SHA256 or size differs/);
  assert.deepEqual(f.state.uploads, []);
  assert.deepEqual(f.state.mutations, []);
  assert.equal(f.state.release.draft, true);
});
