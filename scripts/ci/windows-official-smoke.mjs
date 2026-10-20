import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, mkdir, mkdtemp, readFile, realpath, rm, stat, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { probeApplication } from '../../addon/installer.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const flags = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  const flag = process.argv[index], value = process.argv[index + 1];
  if (!['--app', '--runtime', '--baseline', '--installer', '--work-root', '--report'].includes(flag) || !value) throw new Error('Unknown or incomplete smoke-check argument.');
  flags.set(flag, resolve(value));
}
for (const flag of ['--app', '--runtime', '--baseline', '--installer', '--work-root', '--report']) assert.ok(flags.has(flag), `Required argument: ${flag}`);
assert.equal(process.platform, 'win32');
assert.equal(process.arch, 'x64');
const application = flags.get('--app');
const runtime = flags.get('--runtime');
const officialInstaller = flags.get('--installer');
const baseline = JSON.parse(await readFile(flags.get('--baseline'), 'utf8'));
const manifest = JSON.parse(await readFile(join(runtime, 'manifest.json'), 'utf8'));
assert.equal(manifest.upstream.platform, 'win32-x64');
const checks = [];
const report = { schemaVersion: 1, ok: false, platform: 'win32-x64', version: manifest.version, checks, profileScope: 'temporary fixture only', userDesktopAcceptance: false, officialApplicationInstalled: false };
const fixture = await mkdtemp(join(flags.get('--work-root'), 'isolated profile '));
const dshHome = join(fixture, 'dsh home');
const profile = join(dshHome, 'profiles', 'desktop');
const enhancerHome = join(fixture, 'enhancer home');
const executable = join(application, baseline.executable);
const asar = join(application, 'resources', 'app.asar');
const installerScript = join(dirname(runtime), 'installer', 'installer.mjs');
const env = { ...process.env, ELECTRON_RUN_AS_NODE: '1', DSH_HOME: dshHome };
delete env.NODE_OPTIONS;
async function digest(file) {
  const hash = createHash('sha256');
  for await (const bytes of createReadStream(file)) hash.update(bytes);
  return hash.digest('hex');
}
async function missing(file) {
  try { await lstat(file); return false; } catch (error) { if (error.code === 'ENOENT') return true; throw error; }
}
const normalize = value => resolve(value).toLowerCase();
function sanitizeDiagnostic(value, limit = 700) {
  let output = String(value || '').replace(/\u001b\[[0-9;]*m/gu, '').replaceAll('\\', '/');
  for (const [path, label] of [[fixture, '[fixture]'], [runtime, '[runtime]'], [application, '[official-app]'], [root, '[repository]'], [flags.get('--work-root'), '[temporary]']]) {
    const escaped = path.replaceAll('\\', '/').replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
    output = output.replace(new RegExp(escaped, 'giu'), label);
  }
  return output
    .replace(/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?(?:-----END [A-Z ]*PRIVATE KEY-----|$)/gu, '[private key omitted]')
    .replace(/\b(?:gh[pousr]_[A-Za-z0-9]{20,}|sk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,})\b/gu, '[credential omitted]')
    .replace(/\bBearer\s+[^\s,;]+/giu, 'Bearer [credential omitted]')
    .replace(/\b(?:api[_-]?key|access[_-]?token|secret[_-]?key)\s*[:=]\s*["']?[^\s"',;}]+/giu, '[credential assignment omitted]')
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/gu, '')
    .slice(0, limit);
}
function failureDiagnostic(result) {
  // Never emit arbitrary stdout: it can be a successful status response with
  // profile paths. Only the installer's explicit error JSON is admitted.
  for (const [source, output] of [['stderr', result.stderr], ['stdout', result.stdout]]) {
    const text = String(output || '').trim();
    for (const candidate of [text, ...text.split(/\r?\n/u).reverse()]) {
      try {
        const value = JSON.parse(candidate);
        if (value?.ok === false && typeof value.code === 'string' && typeof value.message === 'string') {
          return { source: source + '-installer-error-json', code: sanitizeDiagnostic(value.code, 80), message: sanitizeDiagnostic(value.message) };
        }
      } catch { /* Non-JSON stderr is handled by the bounded error-line path. */ }
    }
  }
  const lines = String(result.stderr || '').split(/\r?\n/u);
  const errorLines = lines.filter(line => /(?:^|\s)(?:[A-Za-z]+Error|Error|[A-Z][A-Z_]{3,}):\s/u.test(line)).slice(0, 3);
  const frames = lines.filter(line => /^\s+at\s/u.test(line)).slice(0, 2);
  return {
    source: 'stderr-error-lines',
    message: errorLines.length ? sanitizeDiagnostic([...errorLines, ...frames].join('\n')) : 'Unstructured process output omitted.',
    stderrBytes: Buffer.byteLength(String(result.stderr || '')),
    stdoutBytes: Buffer.byteLength(String(result.stdout || '')),
  };
}
function runOfficial(args) {
  const result = spawnSync(executable, args, { env, cwd: fixture, encoding: 'utf8', windowsHide: true, timeout: 120_000, maxBuffer: 2 * 1024 * 1024 });
  if (result.error || result.status !== 0) {
    report.failedOperation = {
      action: args[0] === '-p' ? 'embedded-node-version' : args[1],
      dryRun: args.includes('--dry-run'), exitCode: result.status, signal: result.signal,
      processErrorCode: result.error?.code, diagnostic: failureDiagnostic(result),
    };
    throw Object.assign(new Error('The official Electron runtime operation failed; see the bounded diagnostic.'), { code: 'OFFICIAL_RUNTIME_EXIT' });
  }
  return result.stdout.trim();
}
function operation(action, extra = []) {
  return JSON.parse(runOfficial([installerScript, action, '--runtime', runtime, '--app', executable, '--profile', profile, '--dsh-home', dshHome, '--enhancer-home', enhancerHome, ...extra]));
}
let before;
try {
  assert.equal((await stat(installerScript)).isFile(), true, 'Smoke the actual packaged installer and runtime together.');
  assert.equal((await stat(officialInstaller)).size, baseline.archiveSize);
  assert.equal(await digest(officialInstaller), baseline.archiveSha256);
  assert.equal(await digest(asar), baseline.appAsarSha256);
  before = { officialInstaller: await digest(officialInstaller), appAsar: await digest(asar), executable: await digest(executable) };
  checks.push({ check: 'pinned-official-installer-size-sha256-and-asar', ok: true });
  const probe = await probeApplication(executable, manifest);
  assert.equal(probe.compatible, true);
  assert.equal(probe.platform, 'win32-x64');
  assert.equal(probe.buildCommit, baseline.buildCommit);
  checks.push({ check: 'real-official-asar-compatibility-probe', ok: true });
  const embeddedNode = runOfficial(['-p', 'process.versions.node']);
  assert.equal(embeddedNode, baseline.embeddedRuntime.node);
  report.embeddedNode = embeddedNode;
  checks.push({ check: 'official-exe-electron-run-as-node-version', ok: true });

  await mkdir(profile, { recursive: true });
  const originalProfile = Buffer.from(JSON.stringify({ dsh: { profile: { bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'] } } }) + '\n');
  const originalPatch = Buffer.from('# Isolated CI fixture, never a user profile.\n- id: ci-fixture\n  disabled: false\n');
  const fixtureMarker = Buffer.from('{"fixture":true}\n');
  await writeFile(join(profile, 'package.json'), originalProfile);
  await writeFile(join(profile, 'cordis.patch.yml'), originalPatch);
  await writeFile(join(profile, 'fixture-preservation.json'), fixtureMarker);
  const dryRun = operation('install', ['--dry-run']);
  assert.equal(dryRun.dryRun, true);
  assert.equal(dryRun.changed, false);
  assert.equal(await missing(enhancerHome), true);
  assert.deepEqual(await readFile(join(profile, 'cordis.patch.yml')), originalPatch);
  checks.push({ check: 'official-runtime-isolated-installer-dry-run-no-writes', ok: true });
  const installed = operation('install');
  assert.equal(installed.changed, true);
  assert.equal(installed.compatible, true);
  assert.equal(installed.modules, manifest.modules.length);
  assert.equal(installed.platform, 'win32-x64');
  const receipt = await readFile(join(enhancerHome, 'install-state.json'));
  const installedPatch = await readFile(join(profile, 'cordis.patch.yml'));
  const receiptData = JSON.parse(receipt);
  for (const module of manifest.modules) {
    const link = join(profile, 'node_modules', module.name);
    assert.equal((await lstat(link)).isSymbolicLink(), true);
    assert.equal(normalize(await realpath(link)), normalize(await realpath(join(receiptData.runtimePath, module.directory))));
  }
  checks.push({ check: 'official-runtime-install-and-native-junctions', ok: true, modules: manifest.modules.length });
  const current = operation('status');
  assert.equal(current.installed, true);
  assert.equal(current.runtimeUnchanged, true);
  assert.equal(current.managedPatchUnchanged, true);
  assert.equal(current.moduleLinks.every(link => link.matches), true);
  checks.push({ check: 'official-runtime-status-and-owned-payload-readback', ok: true });
  const repeated = operation('install');
  assert.equal(repeated.alreadyInstalled, true);
  assert.equal(repeated.changed, false);
  assert.deepEqual(await readFile(join(enhancerHome, 'install-state.json')), receipt);
  assert.deepEqual(await readFile(join(profile, 'cordis.patch.yml')), installedPatch);
  checks.push({ check: 'official-runtime-repeat-install-is-idempotent', ok: true });
  const removed = operation('uninstall');
  assert.equal(removed.installed, false);
  assert.equal(operation('status').installed, false);
  assert.deepEqual(await readFile(join(profile, 'package.json')), originalProfile);
  assert.deepEqual(await readFile(join(profile, 'cordis.patch.yml')), originalPatch);
  assert.deepEqual(await readFile(join(profile, 'fixture-preservation.json')), fixtureMarker);
  for (const module of manifest.modules) assert.equal(await missing(join(profile, 'node_modules', module.name)), true);
  checks.push({ check: 'official-runtime-uninstall-restores-fixture-and-removes-owned-junctions', ok: true });
  report.ok = true;
} catch (error) {
  report.failure = { afterChecks: checks.length, type: error.code || error.name, message: error.message.slice(0, 300) };
  process.exitCode = 1;
} finally {
  if (before) {
    const after = { officialInstaller: await digest(officialInstaller), appAsar: await digest(asar), executable: await digest(executable) };
    const unchanged = JSON.stringify(before) === JSON.stringify(after);
    report.officialFilesUnchanged = unchanged;
    report.officialFileHashes = after;
    checks.push({ check: 'original-installer-asar-and-executable-remain-unchanged', ok: unchanged });
    if (!unchanged) { report.ok = false; process.exitCode = 1; }
  }
  await rm(fixture, { recursive: true, force: true });
  report.temporaryProfileRemoved = true;
  await mkdir(dirname(flags.get('--report')), { recursive: true });
  await writeFile(flags.get('--report'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report));
