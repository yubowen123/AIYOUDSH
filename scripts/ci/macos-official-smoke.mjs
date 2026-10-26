import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, mkdir, mkdtemp, open, readFile, readdir, realpath, rm, stat, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { homedir, tmpdir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const marker = 'AIYOUDSH_OFFICIAL_SMOKE_JSON:';
const hashPattern = /^[a-f0-9]{64}$/u;

export function parseSmokeOptions(args) {
  const result = { runtime: join(root, 'dist/addon/runtime'), baseline: join(root, 'platforms/darwin-x64.json'), report: join(root, 'dist/macos-official-smoke.json'), workRoot: tmpdir() };
  const names = { '--app': 'app', '--runtime': 'runtime', '--baseline': 'baseline', '--installer': 'archive', '--work-root': 'workRoot', '--report': 'report' };
  const seen = new Set();
  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i], value = args[i + 1];
    if (!Object.hasOwn(names, flag) || seen.has(flag) || !value || value.startsWith('--')) throw new Error('Use [--app DIRECTORY] [--runtime DIRECTORY] [--baseline FILE] [--installer ZIP] [--work-root DIRECTORY] [--report FILE].');
    seen.add(flag);
    result[names[flag]] = resolve(value);
  }
  return result;
}

export function validatePinnedInputs(baseline, manifest) {
  assert.equal(baseline?.schemaVersion, 1, 'Unsupported baseline schema.');
  assert.equal(baseline.platform, 'darwin-x64', 'Expected the real darwin-x64 baseline.');
  assert.equal(baseline.arch, 'x64');
  assert.equal(baseline.os, 'darwin');
  const url = new URL(baseline.sourceUrl);
  assert.ok(url.protocol === 'https:' && url.hostname === 'download.deepseek.com' && !url.username && !url.password && !url.search && !url.hash && url.pathname.endsWith('.zip'), 'The archive must have a public, pinned official DeepSeek ZIP URL.');
  assert.ok(Number.isSafeInteger(baseline.archiveSize) && baseline.archiveSize > 0, 'Missing pinned archive size.');
  assert.match(baseline.archiveSha256 ?? '', hashPattern, 'Missing pinned archive SHA-256.');
  assert.match(baseline.appAsarSha256 ?? '', hashPattern);
  assert.match(baseline.buildCommit ?? '', /^[a-f0-9]{40}$/u);
  assert.ok(typeof baseline.executable === 'string' && !isAbsolute(baseline.executable) && !baseline.executable.split(/[\\/]/u).includes('..') && baseline.executable.startsWith('Contents/MacOS/'), 'Invalid official executable path.');
  assert.equal(manifest?.schemaVersion, 1);
  assert.equal(manifest.upstream?.platform, 'darwin-x64', 'An ARM runtime cannot be relabeled as Intel.');
  for (const field of ['appVersion', 'buildCommit', 'appAsarSha256']) assert.equal(manifest.upstream[field], baseline[field], 'Runtime baseline mismatch: ' + field);
  assert.ok(Array.isArray(baseline.compatibility) && baseline.compatibility.length > 0);
  assert.deepEqual(manifest.upstream.compatibility, baseline.compatibility, 'Runtime compatibility evidence differs from the pinned official baseline.');
  assert.ok(Array.isArray(manifest.modules) && Array.isArray(manifest.patches));
}

export function assertIsolatedPath(path, protectedRoots) {
  const absolute = resolve(path);
  for (const protectedRoot of protectedRoots) {
    const rel = relative(resolve(protectedRoot), absolute);
    if (rel === '' || (!rel.startsWith('..') && !isAbsolute(rel))) throw new Error('The smoke check refuses a formal application or user profile location.');
  }
  return absolute;
}

export function validateRuntimeEvidence(actual) {
  assert.equal(actual?.platform, 'darwin', 'The official payload did not run on macOS.');
  assert.equal(actual.arch, 'x64', 'The official payload is not an actual x64 process.');
  assert.ok(Number.isSafeInteger(actual.pid) && actual.pid > 0 && typeof actual.executable === 'string' && typeof actual.node === 'string');
  const translated = actual.translated === '1';
  const intel = !translated && actual.hardwareArm64 === '0' && (actual.translated === '0' || actual.translated === null);
  assert.ok(translated || intel, 'Unable to distinguish Intel hardware from Rosetta using actual sysctl evidence.');
  return { ...actual, executionMode: translated ? 'rosetta-x64' : 'native-intel-x64', nativeIntelHardware: intel, userDesktopAcceptance: false };
}

async function digest(file) {
  const hash = createHash('sha256');
  for await (const bytes of createReadStream(file)) hash.update(bytes);
  return hash.digest('hex');
}

export async function verifyArchive(file, baseline) {
  assert.equal((await stat(file)).size, baseline.archiveSize, 'Official archive size mismatch.');
  const hash = await digest(file);
  assert.equal(hash, baseline.archiveSha256, 'Official archive SHA-256 mismatch.');
  return hash;
}

export function validateArchiveEntries(entries) {
  assert.ok(entries.length > 0, 'The official ZIP is empty.');
  for (const entry of entries) assert.ok(!entry.includes('\\') && !entry.startsWith('/') && !entry.split('/').includes('..') && (entry === 'DeepSeek Harness.app/' || entry.startsWith('DeepSeek Harness.app/') || entry.startsWith('__MACOSX/')), 'ZIP entry escapes the isolated official application directory.');
}

export function parseOfficialResult(result) {
  const line = String(result.stdout ?? '').split(/\r?\n/u).findLast(value => value.startsWith(marker));
  if (line) {
    const value = JSON.parse(line.slice(marker.length));
    if (value.ok === false) {
      const completedChecks = Array.isArray(value.checks) ? value.checks.filter(check => check?.ok === true && /^[a-z0-9-]{1,120}$/u.test(check.check)) : [];
      throw Object.assign(new Error(String(value.message ?? 'Official x64 payload failed.').slice(0, 400)), { code: value.code ?? 'OFFICIAL_PAYLOAD', completedChecks });
    }
    if (!result.error && result.status === 0) return value;
  }
  if (result.error || result.status !== 0) throw Object.assign(new Error('The official x64 process failed.'), { code: 'OFFICIAL_RUNTIME_EXIT', status: result.status, signal: result.signal, processError: result.error?.code, stderr: result.stderr });
  throw new Error('The official x64 process did not return structured smoke evidence.');
}

function command(file, args, options = {}) {
  const result = spawnSync(file, args, { encoding: 'utf8', timeout: 120_000, maxBuffer: 8 * 1024 * 1024, ...options });
  if (result.error || result.status !== 0) throw Object.assign(new Error('A bounded smoke-check process failed.'), { code: 'PROCESS_EXIT', status: result.status, signal: result.signal, processError: result.error?.code, stderr: result.stderr });
  return result.stdout.trim();
}

function diagnostic(error) {
  // Do not serialize stdout, the inherited environment, cookies, or credentials.
  const message = String(error.message ?? 'Smoke check failed.').replace(/\b(?:gh[pousr]_[A-Za-z0-9]{20,}|sk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,})\b/gu, '[credential omitted]').replace(/\bBearer\s+[^\s,;]+/giu, 'Bearer [credential omitted]').replace(/\b(?:api[_-]?key|access[_-]?token|secret[_-]?key)\s*[:=]\s*["']?[^\s"',;}]+/giu, '[credential assignment omitted]');
  const lines = String(error.stderr ?? '').split(/\r?\n/u).filter(line => /(?:Error|ERR_[A-Z_]+):/u.test(line)).slice(0, 2);
  return { type: String(error.code ?? error.name ?? 'Error').slice(0, 80), message: message.slice(0, 400), exitCode: error.status, signal: error.signal, processErrorCode: error.processError, errorLines: lines.map(line => line.replace(/(?:\/Users|\/private\/var|\/var\/folders)\/[^\s)]+/gu, '[local path]').slice(0, 300)) };
}

async function downloadArchive(url, destination, size) {
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(180_000) });
  assert.equal(response.ok, true, 'The pinned official ZIP download failed.');
  const handle = await open(destination, 'wx', 0o600);
  let received = 0;
  try {
    for await (const bytes of response.body) {
      received += bytes.length;
      assert.ok(received <= size, 'Official ZIP exceeded the pinned archive size.');
      await handle.writeFile(bytes);
    }
  } finally { await handle.close(); }
}

// This function is serialized and executed by the *official x64 Electron*
// process. No test host, substituted architecture or model API is involved.
async function runtimeEvidencePayload() {
  const { spawnSync } = await import('node:child_process');
  const read = key => {
    const result = spawnSync('/usr/sbin/sysctl', ['-in', key], { encoding: 'utf8' });
    return result.status === 0 ? result.stdout.trim() : null;
  };
  return { platform: process.platform, arch: process.arch, node: process.versions.node, electron: process.versions.electron, executable: process.execPath, pid: process.pid, translated: read('sysctl.proc_translated'), hardwareArm64: read('hw.optional.arm64'), cpuBrand: read('machdep.cpu.brand_string') };
}

async function hostPayload(config) {
  const assert = (await import('node:assert/strict')).default;
  const { createRequire } = await import('node:module');
  const { pathToFileURL } = await import('node:url');
  const { join } = await import('node:path');
  const { readFile } = await import('node:fs/promises');
  assert.equal(process.platform, 'darwin');
  assert.equal(process.arch, 'x64');
  assert.equal(process.env.DSH_HOME, config.dshHome);
  const appRequire = createRequire(join(config.asar, 'dsh/package.json'));
  const official = name => import(pathToFileURL(appRequire.resolve('@deepseek-ai/' + name)).href);
  const { probeApplication } = await import(pathToFileURL(config.installerScript).href);
  const manifest = JSON.parse(await readFile(join(config.runtime, 'manifest.json'), 'utf8'));
  // The raw compatibility reader must see app.asar as a file. Restore the
  // Electron ASAR filesystem before importing the shipped native services.
  const previousNoAsar = process.noAsar;
  let probe;
  try { process.noAsar = true; probe = await probeApplication(config.application, manifest); }
  finally { process.noAsar = previousNoAsar; }
  assert.equal(probe.compatible, true);
  assert.equal(probe.platform, 'darwin-x64');
  const { Context } = await official('cordis');
  const ctx = new Context();
  const checks = [];
  const loaded = [];
  const profileRequire = createRequire(join(config.profile, 'package.json'));
  try {
    const { default: WebServer } = await official('dsh-host-webserver');
    await ctx.plugin(WebServer, { host: '127.0.0.1', port: 0, compression: 'none' }).await();
    const { default: Credentials } = await official('dsh-credentials-local');
    await ctx.plugin(Credentials, { dshHome: config.dshHome, path: join(config.dshHome, 'smoke.credentials.yaml'), watch: false }).await();
    await ctx.plugin(await official('dsh-client-connection'), {}).await();
    const { default: LlmRuntime } = await official('dsh-llm');
    await ctx.plugin(LlmRuntime).await();
    assert.deepEqual(ctx.llm.listProviders(), []);
    assert.equal(typeof ctx.llm.prepareCall, 'function');
    assert.equal(typeof ctx.llm.registerAdapter, 'function');
    checks.push({ check: 'real-official-cordis-webserver-credentials-connection-and-llm-services', ok: true, modelRequests: 0 });
    const { SessionProjectionRegistry } = await official('dsh-session-projection');
    const projections = new SessionProjectionRegistry(ctx);
    for (const module of manifest.modules) {
      const imported = await import(pathToFileURL(profileRequire.resolve(module.name)).href);
      assert.ok(typeof imported.apply === 'function' || typeof imported.default === 'function', 'Installed host entry is not a plugin: ' + module.id);
      loaded.push({ id: module.id, imported });
    }
    const workspace = manifest.modules.find(module => module.replaces === 'ui-workspace');
    const core = manifest.modules.find(module => module.id === 'aiyou-enhancer-core');
    assert.ok(workspace && core, 'Required native workspace and core modules are absent.');
    await ctx.plugin(loaded.find(module => module.id === workspace.id).imported).await();
    const session = { seq: 0, header: { id: 'isolated-smoke', version: 4, createdAt: 0, isSeeded: false }, inheritedEventCount: 0, snapshotEvents: () => [], eventAt: () => undefined };
    assert.equal(projections.snapshot(session).values.aiyouSidebar.turn, 0);
    await ctx.plugin(loaded.find(module => module.id === core.id).imported).await();
    checks.push({ check: 'installed-real-host-entry-imports-and-native-workspace-projection', ok: true, modules: loaded.length });
    const origin = ctx.webServer.getOrigin();
    const removeIndex = ctx.webServer.register({ kind: 'exact', path: '/', handler(req, res) { if (!ctx.connection.authorizeIndex(req, res)) return; res.writeHead(200); res.end('isolated smoke'); } });
    try {
      const anonymous = await fetch(origin + '/aiyoucodex-dsh/status', { signal: AbortSignal.timeout(10_000) });
      assert.equal(anonymous.status, 401);
      await anonymous.arrayBuffer();
      const auth = await fetch(ctx.connection.authenticatedUrl(origin + '/'), { redirect: 'manual', signal: AbortSignal.timeout(10_000) });
      assert.equal(auth.status, 303);
      const cookie = auth.headers.get('set-cookie')?.split(';')[0];
      assert.ok(cookie);
      await auth.arrayBuffer();
      const response = await fetch(origin + '/aiyoucodex-dsh/status', { headers: { cookie }, signal: AbortSignal.timeout(10_000) });
      assert.equal(response.status, 200);
      const status = await response.json();
      assert.ok(status.modules && typeof status.modules === 'object');
      const rejected = await fetch(origin + '/aiyoucodex-dsh/status', { headers: { cookie, origin: 'https://smoke-untrusted.invalid' }, signal: AbortSignal.timeout(10_000) });
      assert.equal(rejected.status, 403);
      await rejected.arrayBuffer();
      checks.push({ check: 'native-authenticated-addon-http-status-and-host-origin-fence', ok: true, unauthenticatedStatus: 401, authenticatedStatus: 200, untrustedOriginStatus: 403 });
    } finally { removeIndex(); }
    await official('dsh-session-query-sqlite');
    const { DatabaseSync } = await import('node:sqlite');
    const db = new DatabaseSync(join(config.dshHome, 'native-smoke.sqlite'));
    try {
      db.exec("CREATE VIRTUAL TABLE smoke USING fts5(text); INSERT INTO smoke(text) VALUES ('intel native sqlite');");
      assert.equal(db.prepare("SELECT count(*) AS count FROM smoke WHERE smoke MATCH 'intel'").get().count, 1);
      checks.push({ check: 'actual-x64-node-sqlite-file-and-fts5-execution', ok: true, sqliteVersion: db.prepare('SELECT sqlite_version() AS version').get().version });
    } finally { db.close(); }
    const sharp = appRequire('sharp');
    const png = await sharp({ create: { width: 2, height: 2, channels: 4, background: { r: 1, g: 2, b: 3, alpha: 1 } } }).png().toBuffer();
    const metadata = await sharp(png).metadata();
    assert.equal(metadata.width, 2);
    assert.equal(metadata.format, 'png');
    checks.push({ check: 'actual-x64-official-sharp-native-payload-encode-and-decode', ok: true });
    return { ok: true, platform: process.platform, arch: process.arch, node: process.versions.node, pid: process.pid, probe, checks };
  } catch (error) { error.smokeChecks = checks; throw error; }
  finally { await ctx.fiber.dispose(); }
}

export async function runSmoke(options) {
  const checks = [];
  const report = { schemaVersion: 1, ok: false, platform: 'darwin-x64', controller: { platform: process.platform, arch: process.arch, node: process.versions.node }, checks, profileScope: 'unique temporary fixture only', userDesktopAcceptance: false, graphicalDesktopLaunched: false, officialApplicationInstalled: false, modelRequests: 0 };
  let fixture, before, application, executable, asar, archive, operation, installed = false;
  const protectedRoots = ['/Applications', join(homedir(), 'Applications'), join(homedir(), '.dsh')];
  if (process.env.DSH_HOME) protectedRoots.push(resolve(process.env.DSH_HOME));
  assertIsolatedPath(options.report, protectedRoots);
  try {
    assert.equal(process.platform, 'darwin', 'The official macOS smoke requires macOS; there is no emulated host override.');
    const baseline = JSON.parse(await readFile(options.baseline, 'utf8'));
    const runtime = await realpath(options.runtime);
    const manifest = JSON.parse(await readFile(join(runtime, 'manifest.json'), 'utf8'));
    validatePinnedInputs(baseline, manifest);
    report.version = manifest.version;
    report.upstreamVersion = baseline.appVersion;
    report.buildCommit = baseline.buildCommit;
    report.archiveSource = baseline.sourceUrl;
    await mkdir(options.workRoot, { recursive: true });
    fixture = await mkdtemp(join(options.workRoot, 'aiyoudsh-intel-smoke-'));
    const dshHome = join(fixture, 'dsh home');
    const profile = join(dshHome, 'profiles/desktop');
    const enhancerHome = join(fixture, 'enhancer home');
    if (options.app) {
      application = await realpath(assertIsolatedPath(options.app, protectedRoots));
      if (options.archive) {
        archive = options.archive;
        report.archiveSha256 = await verifyArchive(archive, baseline);
        checks.push({ check: 'pinned-official-archive-size-and-sha256', ok: true });
      }
    }
    else {
      archive = options.archive ?? join(fixture, 'official-intel.zip');
      if (!options.archive) await downloadArchive(baseline.sourceUrl, archive, baseline.archiveSize);
      report.archiveSha256 = await verifyArchive(archive, baseline);
      checks.push({ check: 'pinned-official-archive-size-and-sha256-before-extraction', ok: true });
      const entries = command('/usr/bin/unzip', ['-Z1', archive]).split(/\r?\n/u).filter(Boolean);
      validateArchiveEntries(entries);
      const extracted = join(fixture, 'official application');
      command('/usr/bin/ditto', ['-x', '-k', archive, extracted]);
      const apps = (await readdir(extracted, { withFileTypes: true })).filter(entry => entry.isDirectory() && entry.name.endsWith('.app'));
      assert.equal(apps.length, 1);
      application = await realpath(join(extracted, apps[0].name));
    }
    assertIsolatedPath(application, protectedRoots);
    asar = join(application, 'Contents/Resources/app.asar');
    executable = join(application, baseline.executable);
    assert.equal(await digest(asar), baseline.appAsarSha256, 'The official application archive differs from the pinned Intel baseline.');
    command('/usr/bin/codesign', ['--verify', '--deep', '--strict', application]);
    const signature = spawnSync('/usr/bin/codesign', ['-dv', '--verbose=4', application], { encoding: 'utf8', timeout: 30_000 });
    assert.equal(signature.status, 0, 'Unable to inspect the official code-signing identity.');
    const teamIdentifier = /^TeamIdentifier=(.+)$/mu.exec(signature.stderr)?.[1];
    assert.equal(teamIdentifier, baseline.signingTeamIdentifier ?? 'NAN929V4UM', 'The application was not signed by the pinned DeepSeek team.');
    report.codeSignature = { verified: true, teamIdentifier };
    checks.push({ check: 'official-deepseek-code-signature-and-sealed-native-resources', ok: true });
    before = { appAsar: await digest(asar), executable: await digest(executable), ...(archive ? { archive: await digest(archive) } : {}) };
    checks.push({ check: 'pinned-official-asar-and-isolated-application-location', ok: true, archiveVerified: Boolean(archive) });
    const packagedInstaller = join(dirname(runtime), 'installer/installer.mjs');
    const installerScript = await stat(packagedInstaller).then(info => info.isFile() ? packagedInstaller : null).catch(error => { if (error.code === 'ENOENT') return null; throw error; }) ?? join(root, 'addon/installer.mjs');
    report.installerSource = installerScript === packagedInstaller ? 'packaged-sibling' : 'repository-source';
    // A small allowlist avoids passing API keys or tokens into smoke children.
    const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => ['PATH', 'TMPDIR', 'LANG', 'LC_ALL', 'LC_CTYPE', 'TZ', 'SYSTEMROOT'].includes(key)));
    Object.assign(env, { ELECTRON_RUN_AS_NODE: '1', DSH_HOME: dshHome });
    const officialScript = (script, action) => {
      try { return parseOfficialResult(spawnSync(executable, ['--input-type=module', '-e', script], { env, cwd: fixture, encoding: 'utf8', timeout: 120_000, maxBuffer: 8 * 1024 * 1024 })); }
      catch (error) { report.failedOperation = action; throw error; }
    };
    const serialize = (fn, config) => `(${fn.toString()})(${JSON.stringify(config)}).then(value=>console.log(${JSON.stringify(marker)}+JSON.stringify(value))).catch(error=>{console.log(${JSON.stringify(marker)}+JSON.stringify({ok:false,code:error.code||error.name,message:String(error.message).slice(0,400),checks:error.smokeChecks}));process.exitCode=1;});`;
    const actual = officialScript(serialize(runtimeEvidencePayload), 'actual-runtime-evidence');
    assert.equal(await realpath(actual.executable), await realpath(executable));
    report.actualRuntime = validateRuntimeEvidence(actual);
    if (baseline.embeddedRuntime?.node) assert.equal(actual.node, baseline.embeddedRuntime.node, 'Official Electron embedded Node version changed.');
    if (baseline.embeddedRuntime?.electron) assert.equal(actual.electron, baseline.embeddedRuntime.electron);
    checks.push({ check: 'actual-official-x64-process-and-intel-or-rosetta-evidence', ok: true, mode: report.actualRuntime.executionMode });
    operation = (action, extra = []) => {
      const output = command(executable, [installerScript, action, '--runtime', runtime, '--app', application, '--profile', profile, '--dsh-home', dshHome, '--enhancer-home', enhancerHome, ...extra], { env, cwd: fixture });
      return JSON.parse(output);
    };
    await mkdir(profile, { recursive: true });
    const originalProfile = Buffer.from(JSON.stringify({ dsh: { profile: { bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'] } } }) + '\n');
    const originalPatch = Buffer.from('# Unique smoke fixture, never a user profile.\n- id: ci-fixture\n  disabled: false\n');
    const fixtureMarker = Buffer.from('{"fixture":true}\n');
    await writeFile(join(profile, 'package.json'), originalProfile);
    await writeFile(join(profile, 'cordis.patch.yml'), originalPatch);
    await writeFile(join(profile, 'fixture-preservation.json'), fixtureMarker);
    const dryRun = operation('install', ['--dry-run']);
    assert.equal(dryRun.dryRun, true);
    assert.equal(dryRun.changed, false);
    await assert.rejects(lstat(enhancerHome), { code: 'ENOENT' });
    assert.deepEqual(await readFile(join(profile, 'cordis.patch.yml')), originalPatch);
    checks.push({ check: 'official-x64-installer-dry-run-no-writes', ok: true });
    const result = operation('install');
    installed = true;
    assert.equal(result.changed, true);
    assert.equal(result.compatible, true);
    assert.equal(result.platform, 'darwin-x64');
    assert.equal(result.modules, manifest.modules.length);
    const receipt = await readFile(join(enhancerHome, 'install-state.json'));
    const patch = await readFile(join(profile, 'cordis.patch.yml'));
    const receiptData = JSON.parse(receipt);
    for (const module of manifest.modules) {
      const link = join(profile, 'node_modules', module.name);
      assert.equal((await lstat(link)).isSymbolicLink(), true);
      assert.equal(await realpath(link), await realpath(join(receiptData.runtimePath, module.directory)));
    }
    const current = operation('status');
    assert.ok(current.installed && current.runtimeUnchanged && current.managedPatchUnchanged && current.moduleLinks.every(link => link.matches));
    checks.push({ check: 'official-x64-install-native-symlinks-status-and-owned-payload', ok: true, modules: manifest.modules.length });
    const payload = officialScript(serialize(hostPayload, { application, asar, installerScript, runtime, profile, dshHome }), 'real-host-and-native-payload');
    assert.equal(payload.arch, 'x64');
    report.hostPayload = { platform: payload.platform, arch: payload.arch, node: payload.node, pid: payload.pid };
    checks.push(...payload.checks);
    const repeated = operation('install');
    assert.ok(repeated.alreadyInstalled && !repeated.changed);
    assert.deepEqual(await readFile(join(enhancerHome, 'install-state.json')), receipt);
    assert.deepEqual(await readFile(join(profile, 'cordis.patch.yml')), patch);
    checks.push({ check: 'official-x64-repeat-install-is-idempotent', ok: true });
    assert.equal(operation('uninstall').installed, false);
    installed = false;
    assert.equal(operation('status').installed, false);
    assert.deepEqual(await readFile(join(profile, 'package.json')), originalProfile);
    assert.deepEqual(await readFile(join(profile, 'cordis.patch.yml')), originalPatch);
    assert.deepEqual(await readFile(join(profile, 'fixture-preservation.json')), fixtureMarker);
    for (const module of manifest.modules) await assert.rejects(lstat(join(profile, 'node_modules', module.name)), { code: 'ENOENT' });
    checks.push({ check: 'official-x64-uninstall-restores-fixture-and-removes-owned-symlinks', ok: true });
    report.ok = true;
  } catch (error) {
    if (Array.isArray(error.completedChecks)) checks.push(...error.completedChecks);
    report.failure = diagnostic(error);
  }
  finally {
    if (installed && operation) {
      try { report.failureCleanupUninstalled = operation('uninstall').installed === false; }
      catch (error) { report.failureCleanupError = diagnostic(error); }
    }
    if (before) {
      try {
        const after = { appAsar: await digest(asar), executable: await digest(executable), ...(archive ? { archive: await digest(archive) } : {}) };
        report.officialFileHashes = after;
        report.officialFilesUnchanged = JSON.stringify(before) === JSON.stringify(after);
        checks.push({ check: 'official-archive-asar-and-executable-remain-unchanged', ok: report.officialFilesUnchanged });
        if (!report.officialFilesUnchanged) report.ok = false;
      } catch (error) { report.ok = false; report.integrityFailure = diagnostic(error); }
    }
    if (fixture) {
      await rm(fixture, { recursive: true, force: true });
      report.temporaryProfileRemoved = true;
    }
    await mkdir(dirname(options.report), { recursive: true });
    await writeFile(options.report, JSON.stringify(report, null, 2) + '\n', { mode: 0o600 });
  }
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await runSmoke(parseSmokeOptions(process.argv.slice(2)));
  console.log(JSON.stringify(report));
  if (!report.ok) process.exitCode = 1;
}
