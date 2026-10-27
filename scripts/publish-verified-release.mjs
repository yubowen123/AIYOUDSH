import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const REPOSITORY = 'yubowen123/AIYOUDSH';
export const REQUIRED_JOBS = ['Verify darwin-arm64', 'Verify darwin-x64', 'Verify win32-x64'];
const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const shaPattern = /^[a-f0-9]{40}$/;
const fail = message => { throw new Error(message); };

export function validateInputs(env) {
  if (env.GITHUB_REPOSITORY !== REPOSITORY) fail('Publication is restricted to ' + REPOSITORY);
  if (env.GITHUB_EVENT_NAME !== 'workflow_dispatch' || env.GITHUB_REF !== 'refs/heads/main') fail('Publication requires a manual dispatch on main.');
  if (!/^\d+$/.test(env.VERIFY_RUN_ID || '')) fail('verify_run_id must contain only digits.');
  if (!/^v(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/.test(env.RELEASE_TAG || '')) fail('tag must be a stable semver tag such as v0.8.4.');
  if (!shaPattern.test(env.GITHUB_SHA || '')) fail('The dispatch commit must be an exact SHA.');
  if (!env.GH_TOKEN) fail('GH_TOKEN is required.');
  if (!env.RUNNER_TEMP || !isAbsolute(env.RUNNER_TEMP)) fail('RUNNER_TEMP must be an absolute runner directory.');
  return { runId: env.VERIFY_RUN_ID, tag: env.RELEASE_TAG, version: env.RELEASE_TAG.slice(1), dispatchSha: env.GITHUB_SHA };
}

export function validateVerifiedRun(run, { runId, headSha }) {
  if (String(run.id) !== runId || run.repository?.full_name !== REPOSITORY || run.head_repository?.full_name !== REPOSITORY
      || run.repository?.fork === true || run.head_repository?.fork === true) fail('Verify run must originate in the release repository, not a fork.');
  if (run.event !== 'push' || run.head_branch !== 'main' || run.path !== '.github/workflows/verify.yml') fail('Verify run must be a main push of .github/workflows/verify.yml.');
  if (run.status !== 'completed' || run.conclusion !== 'success') fail('Verify run must be completed successfully.');
  if (!shaPattern.test(headSha) || run.head_sha !== headSha) fail('Verify run SHA must match checkout and current remote main.');
  if (!Number.isSafeInteger(run.run_attempt) || run.run_attempt < 1) fail('Verify run attempt is missing.');
}

export function validateJobs(jobs, { runId, headSha, attempt }) {
  for (const name of REQUIRED_JOBS) {
    const matches = jobs.filter(job => job.name === name);
    if (matches.length !== 1) fail('Expected exactly one successful job: ' + name);
    const job = matches[0];
    if (String(job.run_id) !== runId || job.head_sha !== headSha || job.run_attempt !== attempt
        || job.status !== 'completed' || job.conclusion !== 'success') fail('Required Verify job did not succeed for this run attempt: ' + name);
  }
}

export function validateDraftRelease(release, { tag, headSha }) {
  if (release.tag_name !== tag || release.draft !== true || release.prerelease === true || release.target_commitish !== headSha) {
    fail('Only an unpublished draft with the same exact target commit may be resumed.');
  }
}

export function validateRemoteAssets(remote, local, { complete = false } = {}) {
  const expected = new Map(local.map(asset => [asset.name, asset]));
  const seen = new Set();
  for (const asset of remote) {
    const candidate = expected.get(asset.name);
    if (!candidate || seen.has(asset.name)) fail('Unexpected or duplicate draft asset: ' + asset.name);
    seen.add(asset.name);
    if (asset.state !== 'uploaded' || asset.size !== candidate.size || asset.digest !== 'sha256:' + candidate.sha256) fail('Remote asset SHA256 or size differs: ' + asset.name);
  }
  if (complete && seen.size !== expected.size) fail('The release is missing verified attachments.');
  return seen;
}

function command(executable, args, { cwd = rootDirectory, env = process.env, input, timeout = 900_000 } = {}) {
  return new Promise((resolveCommand, reject) => {
    const child = execFile(executable, args, { cwd, env, encoding: 'utf8', timeout, maxBuffer: 8 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) reject(new Error(`${basename(executable)} failed: ${stderr.trim() || error.message}`));
      else resolveCommand(stdout);
    });
    child.stdin.end(input);
  });
}

export function createGitHubClient(token, fetchImpl = fetch) {
  async function api(path, { method = 'GET', body } = {}) {
    const response = await fetchImpl('https://api.github.com/repos/' + REPOSITORY + '/' + path, {
      method,
      headers: { Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'AIYOUDSH-verified-release', Authorization: 'Bearer ' + token, 'X-GitHub-Api-Version': '2022-11-28' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      signal: AbortSignal.timeout(120_000),
    });
    if (!response.ok) throw Object.assign(new Error(`GitHub ${method} ${path} failed (HTTP ${response.status}).`), { status: response.status });
    return response.json();
  }
  async function list(path, field) {
    const result = [];
    for (let page = 1; page <= 100; page++) {
      const data = await api(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
      const entries = field ? data[field] : data;
      if (!Array.isArray(entries)) fail('Unexpected GitHub list response: ' + path);
      result.push(...entries);
      if (entries.length < 100) return result;
    }
    fail('GitHub pagination exceeded the bounded release query.');
  }
  return { api, list };
}

async function tagCommit(client, tag) {
  let reference;
  try { reference = await client.api('git/ref/tags/' + tag); }
  catch (error) { if (error.status === 404) return null; throw error; }
  let object = reference.object;
  for (let depth = 0; depth < 5 && object?.type === 'tag'; depth++) object = (await client.api('git/tags/' + object.sha)).object;
  if (object?.type !== 'commit' || !shaPattern.test(object.sha)) fail('The existing tag does not resolve to a commit.');
  return object.sha;
}

async function assertTagTarget(client, tag, headSha) {
  const existing = await tagCommit(client, tag);
  if (existing !== null && existing !== headSha) fail('Existing tag targets another commit; it will not be moved.');
}

async function remoteMain(client) {
  const reference = await client.api('git/ref/heads/main');
  if (reference.object?.type !== 'commit' || !shaPattern.test(reference.object.sha)) fail('Remote main does not resolve to a commit.');
  return reference.object.sha;
}

export async function archiveFiles(directory, expectedNames) {
  const found = new Map();
  async function visit(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const file = join(path, entry.name);
      if (entry.isSymbolicLink()) fail('Artifact contains a symbolic link.');
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile() && entry.name.endsWith('.zip')) {
        if (!expectedNames.includes(entry.name) || found.has(entry.name)) fail('Unexpected or duplicate archive in artifact: ' + entry.name);
        found.set(entry.name, file);
      }
    }
  }
  await visit(directory);
  if (found.size !== expectedNames.length) fail('Artifact is missing a versioned release archive.');
  return found;
}

const archiveVerifier = `
import json, sys
from zipfile import ZipFile
archive, version, platform = sys.argv[1:]
# Native ditto stores UTF-8 filename bytes without consistently setting bit 11.
# Python 3.11+ supports decoding those unflagged names without changing the ZIP.
with ZipFile(archive, metadata_encoding='utf-8') as bundle:
    if bundle.testzip() is not None:
        raise ValueError('Archive CRC verification failed')
    names = bundle.namelist()
    if len(names) != len(set(names)):
        raise ValueError('Duplicate archive entry')
    paths = ['AIYOUDSH-source/package.json']
    if platform:
        expected = 'AIYOUDSH/AIYOUDSH 增强安装器.app/Contents/Resources/runtime/manifest.json'
        embedded = [name for name in names if name.startswith('AIYOUDSH/') and name.endswith('.app/Contents/Resources/runtime/manifest.json')]
        if embedded != [expected]:
            raise ValueError('Archive must contain the named embedded application runtime')
        paths = ['AIYOUDSH/runtime/manifest.json', expected]
    for path in paths:
        if bundle.getinfo(path).file_size > 1024 * 1024:
            raise ValueError('Oversized package metadata')
        document = json.loads(bundle.read(path))
        if document.get('version') != version:
            raise ValueError('Archive package version mismatch')
        if platform and document.get('upstream', {}).get('platform') != platform:
            raise ValueError('Archive runtime platform mismatch')
print(json.dumps({'version': version, 'platform': platform or 'source'}))
`;

export async function verifyArchive(file, { version, platform = '' }, runCommand = command) {
  return JSON.parse(await runCommand('python3', ['-c', archiveVerifier, file, version, platform]));
}

async function localAsset(path) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return { name: basename(path), path, size: (await lstat(path)).size, sha256: hash.digest('hex') };
}

export async function publishVerifiedRelease({ env = process.env, root = rootDirectory, runCommand = command, client } = {}) {
  const { runId, tag, version, dispatchSha } = validateInputs(env);
  client ??= createGitHubClient(env.GH_TOKEN);
  const headSha = (await runCommand('git', ['rev-parse', 'HEAD'], { cwd: root, env })).trim();
  if (headSha !== dispatchSha || headSha !== await remoteMain(client)) fail('Checkout, dispatch SHA and current remote main must match.');
  const packageInfo = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  if (packageInfo.version !== version) fail('package.json.version must exactly match the requested tag.');
  const notesSource = await readFile(join(root, 'docs', 'releases', tag + '.md'), 'utf8');
  const run = await client.api('actions/runs/' + runId);
  validateVerifiedRun(run, { runId, headSha });
  validateJobs(await client.list('actions/runs/' + runId + '/jobs?filter=latest', 'jobs'), { runId, headSha, attempt: run.run_attempt });
  const matches = (await client.list('releases')).filter(release => release.tag_name === tag);
  if (matches.length > 1) fail('Multiple releases have the requested tag.');
  let release = matches[0];
  if (release) validateDraftRelease(release, { tag, headSha });
  await assertTagTarget(client, tag, headSha);

  const temporary = await mkdtemp(join(env.RUNNER_TEMP, 'aiyoudsh-verified-release-'));
  try {
    const archives = [];
    for (const arch of ['arm64', 'x64']) {
      const directory = join(temporary, arch);
      await runCommand('gh', ['run', 'download', runId, '--repo', REPOSITORY, '--name', 'AIYOUDSH-darwin-' + arch, '--dir', directory], { cwd: root, env });
      const archiveName = `AIYOUDSH-${tag}-macos-${arch}.zip`, sourceName = `AIYOUDSH-${tag}-source.zip`;
      const files = await archiveFiles(directory, [archiveName, sourceName]);
      await verifyArchive(files.get(archiveName), { version, platform: 'darwin-' + arch }, runCommand);
      await verifyArchive(files.get(sourceName), { version }, runCommand);
      archives.push(await localAsset(files.get(archiveName)));
      if (arch === 'arm64') archives.push(await localAsset(files.get(sourceName)));
    }
    archives.sort((left, right) => left.name.localeCompare(right.name));
    const sums = join(temporary, `AIYOUDSH-${tag}-SHA256SUMS.txt`);
    await writeFile(sums, archives.map(asset => `${asset.sha256}  ${asset.name}\n`).join(''));
    const attachments = [...archives, await localAsset(sums)];
    const runUrl = `https://github.com/${REPOSITORY}/actions/runs/${runId}`;
    const notes = notesSource.trimEnd() + `\n\n---\n\n验证来源：[Verify run ${runId}](${runUrl})，提交 [\`${headSha}\`](https://github.com/${REPOSITORY}/commit/${headSha})。三个平台验证任务均已成功；附件仅包含本次 macOS ARM、Intel 与源码包及 \`${basename(sums)}\`。\n\nWindows 正式下载仍使用[历史 v0.5.0](https://github.com/${REPOSITORY}/releases/tag/v0.5.0)，本次不发布新的 Windows 安装包。\n`;

    if (await remoteMain(client) !== headSha) fail('Remote main advanced before draft creation.');
    await assertTagTarget(client, tag, headSha);
    if (!release) release = await client.api('releases', { method: 'POST', body: { tag_name: tag, target_commitish: headSha, name: `AIYOUDSH ${tag}`, body: notes, draft: true, prerelease: false } });
    validateDraftRelease(release, { tag, headSha });
    const assetsPath = `releases/${release.id}/assets`;
    validateDraftRelease(await client.api('releases/' + release.id), { tag, headSha });
    const existing = validateRemoteAssets(await client.list(assetsPath), attachments);
    for (const asset of attachments) {
      if (!existing.has(asset.name)) {
        validateDraftRelease(await client.api('releases/' + release.id), { tag, headSha });
        await runCommand('gh', ['release', 'upload', tag, asset.path, '--repo', REPOSITORY], { cwd: root, env });
      }
    }
    validateRemoteAssets(await client.list(assetsPath), attachments, { complete: true });

    const finalRun = await client.api('actions/runs/' + runId);
    validateVerifiedRun(finalRun, { runId, headSha });
    if (finalRun.run_attempt !== run.run_attempt) fail('Verify run attempt changed during publication.');
    validateJobs(await client.list('actions/runs/' + runId + '/jobs?filter=latest', 'jobs'), { runId, headSha, attempt: run.run_attempt });
    if (await remoteMain(client) !== headSha) fail('Remote main advanced before publication; the draft was retained.');
    await assertTagTarget(client, tag, headSha);
    validateDraftRelease(await client.api('releases/' + release.id), { tag, headSha });
    validateRemoteAssets(await client.list(assetsPath), attachments, { complete: true });
    const published = await client.api('releases/' + release.id, { method: 'PATCH', body: { draft: false, prerelease: false, make_latest: 'true', body: notes } });
    if (published.draft !== false || published.tag_name !== tag || published.target_commitish !== headSha) fail('Published release metadata did not match the verified target.');
    if (await tagCommit(client, tag) !== headSha) fail('Published tag does not match the verified commit.');
    validateRemoteAssets(await client.list(assetsPath), attachments, { complete: true });
    if ((await client.api('releases/latest')).id !== release.id) fail('The published release was not marked latest.');
    return { ok: true, repository: REPOSITORY, tag, commit: headSha, verifyRunId: runId, verifyRunUrl: runUrl, releaseId: release.id, releaseUrl: `https://github.com/${REPOSITORY}/releases/tag/${tag}`, latest: true, assets: attachments.map(({ name, size, sha256 }) => ({ name, size, sha256 })) };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 2) fail('Use VERIFY_RUN_ID and RELEASE_TAG environment variables; no command-line overrides are accepted.');
  console.log(JSON.stringify(await publishVerifiedRelease()));
}
