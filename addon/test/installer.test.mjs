import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { access, cp, lstat, mkdir, mkdtemp, readFile, readdir, readlink, rm, symlink, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import YAML from '../vendor/yaml/dist/index.js';
import { install, uninstall, status, paths, probeApplication, __testing } from '../installer.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const temporary = join(root, 'temporary');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const archivePath = app => join(app, process.platform === 'win32' ? 'resources/app.asar' : 'Contents/Resources/app.asar');
const makeLink = (target, file) => symlink(resolve(target), file, process.platform === 'win32' ? 'junction' : 'dir');
async function assertLinkTarget(file, target) {
  const actual = await readlink(file);
  assert(__testing.sameLink({ type: 'symlink', target: actual }, { type: 'symlink', target: resolve(target) }), `Unexpected module link target`);
}
const original = '# Preserve this comment and exact spelling\n- insert:\n    - id: old-addon\n      name: "@local/old-addon"\n      config:\n        credential: "fixture-credential-never-print"\n        expression: !!js >-\n          process.env.EXAMPLE_TEST_VALUE\n# user trailing comment\n';
const archive = (files) => {
  const tree = { files: {} }; let offset = 0;
  for (const [path, bytes] of files) {
    const names = path.split('/'); let node = tree;
    for (const name of names.slice(0, -1)) node = node.files[name] ??= { files: {} };
    node.files[names.at(-1)] = { size: bytes.length, offset: String(offset) }; offset += bytes.length;
  }
  const encoded = Buffer.from(JSON.stringify(tree)), jsonPad = (encoded.length + 3) & ~3;
  const prefix = Buffer.alloc(16 + jsonPad);
  prefix.writeUInt32LE(4, 0); prefix.writeUInt32LE(8 + jsonPad, 4); prefix.writeUInt32LE(4 + jsonPad, 8); prefix.writeUInt32LE(encoded.length, 12); encoded.copy(prefix, 16);
  return Buffer.concat([prefix, ...files.map(([, bytes]) => bytes)]);
};
async function fixture(fn, patch = original) {
  await mkdir(temporary, { recursive: true });
  const location = await mkdtemp(join(temporary, 'addon-installer-'));
  const options = { dshHome: join(location, 'dsh'), profile: join(location, 'dsh/profiles/desktop'), enhancerHome: join(location, 'enhancer'), runtime: join(location, 'runtime'), app: join(location, 'Official Harness.app') };
  const expected = Buffer.from('current native client baseline\n');
  const componentMetadata = Buffer.from(JSON.stringify({ name: '@deepseek-ai/dsh-client-ui-sidebar', version: '0.2.1-rc.2' }));
  const upstream = { ...(process.platform === 'win32' ? { platform: 'win32-x64' } : {}), appVersion: '0.2.1-rc.2', buildCommit: 'fixture-build', compatibility: [{ package: '@deepseek-ai/dsh-client-ui-sidebar', file: 'lib/client.js', sha256: hash(expected) }] };
  const bytes = archive([
    ['package.json', Buffer.from(JSON.stringify({ version: upstream.appVersion, dshBuildCommit: upstream.buildCommit }))],
    ['dsh/node_modules/@deepseek-ai/dsh-client-ui-sidebar/lib/client.js', expected],
    ['dsh/node_modules/@deepseek-ai/dsh-client-ui-sidebar/package.json', componentMetadata],
  ]);
  upstream.appAsarSha256 = hash(bytes);
  const manifest = {
    schemaVersion: 1, name: 'AIYOU Harness Enhancer', version: '0.1.0', upstream,
    modules: [{ id: 'aiyou-native-sidebar', name: '@local/aiyou-native-sidebar', directory: 'modules/aiyou-native-sidebar' }, { id: 'aiyou-native-workspace', name: '@local/aiyou-native-workspace', directory: 'modules/aiyou-native-workspace' }],
    patches: [{ id: 'ui-sidebar', disabled: true }, { id: 'ui-workspace', disabled: true }, { insert: [{ id: 'aiyou-native-sidebar', name: '@local/aiyou-native-sidebar' }, { id: 'aiyou-native-workspace', name: '@local/aiyou-native-workspace' }] }],
    legacyPluginIds: ['old-addon', 'nonexistent-old-addon'],
  };
  await mkdir(dirname(archivePath(options.app)), { recursive: true });
  await writeFile(archivePath(options.app), bytes);
  if (process.platform === 'win32') await writeFile(join(options.app, 'DeepSeek Harness.exe'), 'fixture executable marker');
  await mkdir(options.profile, { recursive: true });
  await writeFile(join(options.profile, 'package.json'), JSON.stringify({ dsh: { profile: { bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'] } } }));
  await writeFile(join(options.profile, 'credentials.json'), 'fixture-private-file\n');
  if (patch !== null) await writeFile(join(options.profile, 'cordis.patch.yml'), patch, { mode: 0o600 });
  await mkdir(options.runtime, { recursive: true });
  await writeFile(join(options.runtime, 'manifest.json'), JSON.stringify(manifest));
  for (const module of manifest.modules) {
    await mkdir(join(options.runtime, module.directory), { recursive: true });
    await writeFile(join(options.runtime, module.directory, 'package.json'), JSON.stringify({ name: module.name, type: 'module', main: 'index.js' }));
    await writeFile(join(options.runtime, module.directory, 'index.js'), 'export function apply() {}\n');
  }
  try { await fn({ options, location, manifest, appHash: hash(bytes), componentMetadata }); }
  finally { await rm(location, { recursive: true, force: true }); }
}

test('install is idempotent, preserves user bytes/tags/credentials, and uninstalls exactly', async () => fixture(async ({ options, appHash }) => {
  const profilePackage = await readFile(join(options.profile, 'package.json'));
  const result = await install(options);
  assert.equal(result.modules, 2); assert.equal(result.needsRestart, true); assert.equal(result.appTerminated, false);
  assert.deepEqual(result.legacyDisabled, ['old-addon']);
  const patch = await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8');
  assert(patch.startsWith(original));
  const parsed = YAML.parseDocument(patch); assert.equal(parsed.errors.length, 0);
  assert.match(patch, /!!js >-/); assert.match(patch, /# user trailing comment/);
  const rows = parsed.toJS(); assert.equal(rows.filter(row => row.id === 'old-addon').length, 1); assert(!rows.some(row => row.id === 'nonexistent-old-addon'));
  if (process.platform !== 'win32') {
    assert.equal((await lstat(join(result.backupDirectory, 'before.raw.yml'))).mode & 0o777, 0o600);
    assert.equal((await lstat(join(result.backupDirectory, 'restore.yml'))).mode & 0o777, 0o600);
  }
  assert.equal((await status(options)).installed, true);
  assert.equal((await install(options)).alreadyInstalled, true);
  assert.equal((await readdir(join(options.dshHome, 'backups/aiyou-enhancer'))).length, 1);
  assert.deepEqual(await readFile(join(options.profile, 'package.json')), profilePackage);
  assert.equal(await readFile(join(options.profile, 'credentials.json'), 'utf8'), 'fixture-private-file\n');
  assert.equal(hash(await readFile(archivePath(options.app))), appHash);
  const removed = await uninstall(options); assert.equal(removed.installed, false);
  assert.equal(await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8'), original);
  assert.equal((await status(options)).installed, false);
}));

test('dry-run and CLI output never write a profile or print configuration', async () => fixture(async ({ options }) => {
  const result = await install({ ...options, dryRun: true }); assert.equal(result.changed, false);
  await assert.rejects(access(options.enhancerHome));
  assert.equal(await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8'), original);
  const flags = Object.entries({ '--runtime': options.runtime, '--profile': options.profile, '--enhancer-home': options.enhancerHome, '--dsh-home': options.dshHome, '--app': options.app }).flatMap(([key, value]) => [key, value]);
  const output = execFileSync(process.execPath, [join(root, 'addon/installer.mjs'), 'dry-run', ...flags], { encoding: 'utf8' });
  assert.equal(JSON.parse(output).dryRun, true); assert(!output.includes('fixture-credential-never-print')); assert(!output.includes('process.env.EXAMPLE_TEST_VALUE'));
}));

test('uninstall removes only owned block while preserving later user edits', async () => fixture(async ({ options }) => {
  await install(options);
  const file = join(options.profile, 'cordis.patch.yml');
  await writeFile(file, `${await readFile(file, 'utf8')}\n- id: later-user-edit\n  disabled: true\n`);
  const result = await uninstall(options); assert.equal(result.installed, false);
  const restored = await readFile(file, 'utf8'); assert(restored.startsWith(original)); assert.match(restored, /later-user-edit/); assert.doesNotMatch(restored, /AIYOU HARNESS ENHANCER MANAGED/);
}));

test('edited managed block is never overwritten or partially disconnected', async () => fixture(async ({ options }) => {
  await install(options);
  const file = join(options.profile, 'cordis.patch.yml');
  await writeFile(file, (await readFile(file, 'utf8')).replace('id: ui-sidebar', 'id: user-edited-sidebar'));
  const before = await readFile(file);
  const result = await uninstall(options); assert.deepEqual(result.conflicts, ['managed-patch-edited']);
  assert.deepEqual(await readFile(file), before);
  assert((await lstat(join(options.profile, 'node_modules/@local/aiyou-native-sidebar'))).isSymbolicLink());
  await assert.rejects(install(options), { code: 'PATCH_CONFLICT' });
}));

test('upgrade retains independent later edits and uninstalls without reverting them', async () => fixture(async ({ options }) => {
  await install(options);
  const file = join(options.profile, 'cordis.patch.yml');
  await writeFile(file, `${await readFile(file, 'utf8')}\n- id: later-user-edit\n  disabled: true\n`);
  const manifestFile = join(options.runtime, 'manifest.json'), next = JSON.parse(await readFile(manifestFile, 'utf8'));
  next.version = '0.2.0'; await writeFile(manifestFile, JSON.stringify(next));
  assert.equal((await install(options)).version, '0.2.0');
  await uninstall(options);
  assert.match(await readFile(file, 'utf8'), /later-user-edit/);
  assert.doesNotMatch(await readFile(file, 'utf8'), /AIYOU HARNESS ENHANCER MANAGED/);
}));

test('incompatible app and preexisting module paths are preserved', async () => fixture(async ({ options }) => {
  const manifestFile = join(options.runtime, 'manifest.json'), saved = await readFile(manifestFile), manifest = JSON.parse(saved);
  manifest.upstream.appAsarSha256 = '0'.repeat(64); await writeFile(manifestFile, JSON.stringify(manifest));
  await assert.rejects(install(options), { code: 'APP_HASH' });
  await writeFile(manifestFile, saved);
  await mkdir(join(options.profile, 'node_modules/@local'), { recursive: true });
  await makeLink('/another-owner', join(options.profile, 'node_modules/@local/aiyou-native-sidebar'));
  await assert.rejects(install(options), { code: 'LINK_CONFLICT' });
  await assertLinkTarget(join(options.profile, 'node_modules/@local/aiyou-native-sidebar'), '/another-owner');
  assert.equal(await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8'), original);
}));

test('flow-list YAML with inert JS tags restores its exact original representation', async () => fixture(async ({ options }) => {
  await install(options); await uninstall(options);
  assert.equal(await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8'), '[{id: user-entry, disabled: !!js "Boolean(env.TEST)"}] # keep flow comment\n');
}, '[{id: user-entry, disabled: !!js "Boolean(env.TEST)"}] # keep flow comment\n'));

test('a profile with no user patch gains one and returns to absence on uninstall', async () => fixture(async ({ options }) => {
  await install(options); await uninstall(options);
  await assert.rejects(access(join(options.profile, 'cordis.patch.yml')));
}, null));

test('malformed YAML and rename-style patches are rejected before configuration mutation', async () => fixture(async ({ options }) => {
  const file = join(options.profile, 'cordis.patch.yml');
  await writeFile(file, '- id: [broken\n');
  await assert.rejects(install(options), { code: 'PATCH_FORMAT' });
  assert.equal(await readFile(file, 'utf8'), '- id: [broken\n');
  await writeFile(file, original);
  const manifestFile = join(options.runtime, 'manifest.json'), manifest = JSON.parse(await readFile(manifestFile, 'utf8'));
  manifest.patches[0].name = '@local/cannot-rename'; await writeFile(manifestFile, JSON.stringify(manifest));
  await assert.rejects(install(options), { code: 'MANIFEST' });
  assert.equal(await readFile(file, 'utf8'), original);
}));


test('an empty flow list keeps comments and custom-tag-free structure', async () => fixture(async ({ options }) => {
  await install(options);
  assert.match(await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8'), /keep empty comment/);
  await uninstall(options);
  assert.equal(await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8'), '[] # keep empty comment\n');
}, '[] # keep empty comment\n'));

test('edited private restore backup refuses uninstall before touching live configuration', async () => fixture(async ({ options }) => {
  const result = await install(options);
  const file = join(options.profile, 'cordis.patch.yml'), before = await readFile(file);
  await writeFile(join(result.backupDirectory, 'restore.yml'), 'edited private backup');
  await assert.rejects(uninstall(options), { code: 'BACKUP_CHANGED' });
  assert.deepEqual(await readFile(file), before);
  assert((await lstat(join(options.profile, 'node_modules/@local/aiyou-native-sidebar'))).isSymbolicLink());
}));


test('an interrupted transaction rolls back only its own links and preserves concurrent patch edits', async () => fixture(async ({ options }) => {
  const file = join(options.profile, 'cordis.patch.yml');
  const edited = `${original}\n- id: concurrent-user-edit\n  disabled: true\n`;
  await assert.rejects(install({ ...options, hooks: { beforePatchWrite: async () => writeFile(file, edited) } }), { code: 'PATCH_CHANGED' });
  assert.equal(await readFile(file, 'utf8'), edited);
  await assert.rejects(access(join(options.profile, 'node_modules/@local/aiyou-native-sidebar')));
  assert.equal((await status(options)).installed, false);
}));


test('runtime edits are visible in status and are never silently overwritten', async () => fixture(async ({ options }) => {
  await install(options);
  const state = JSON.parse(await readFile(join(options.enhancerHome, 'install-state.json'), 'utf8'));
  await writeFile(join(state.runtimePath, 'modules/aiyou-native-sidebar/index.js'), 'export const userEdited = true;\n');
  assert.equal((await status(options)).runtimeUnchanged, false);
  await assert.rejects(install(options), { code: 'RUNTIME_CHANGED' });
  assert.equal(await readFile(join(state.runtimePath, 'modules/aiyou-native-sidebar/index.js'), 'utf8'), 'export const userEdited = true;\n');
}));

async function retireModule(options) {
  const file = join(options.runtime, 'manifest.json');
  const next = JSON.parse(await readFile(file, 'utf8'));
  const retired = next.modules.pop();
  next.version = '0.2.0';
  for (const patch of next.patches) if (patch.insert) patch.insert = patch.insert.filter(row => row.name !== retired.name);
  await writeFile(file, JSON.stringify(next));
  await rm(join(options.runtime, retired.directory), { recursive: true });
  return { ...retired, path: join(options.profile, 'node_modules', retired.name) };
}

test('upgrade removes a retired owned link and final uninstall leaves neither module behind', async () => fixture(async ({ options }) => {
  await install(options);
  const oldState = JSON.parse(await readFile(join(options.enhancerHome, 'install-state.json'), 'utf8'));
  const retired = await retireModule(options);
  const oldTarget = await readlink(retired.path);
  const preview = await install({ ...options, dryRun: true });
  assert.deepEqual(preview.removedModules, [retired.name]);
  assert.equal(await readlink(retired.path), oldTarget);
  const upgraded = await install(options);
  assert.equal(upgraded.modules, 1);
  assert.deepEqual(upgraded.removedModules, [retired.name]);
  await assert.rejects(lstat(retired.path), { code: 'ENOENT' });
  const nextState = JSON.parse(await readFile(join(options.enhancerHome, 'install-state.json'), 'utf8'));
  assert.equal(nextState.schemaVersion, oldState.schemaVersion);
  assert.deepEqual(nextState.links.map(row => row.name), ['@local/aiyou-native-sidebar']);
  assert.equal((await status(options)).modules, 1);
  assert.equal((await install(options)).alreadyInstalled, true);
  await uninstall(options);
  for (const row of oldState.links) await assert.rejects(lstat(row.path), { code: 'ENOENT' });
  assert.equal(await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8'), original);
}));

for (const owner of ['symlink', 'file']) {
  test(`upgrade preserves a retired path replaced by a user ${owner}`, async () => fixture(async ({ options }) => {
    await install(options);
    const stateFile = join(options.enhancerHome, 'install-state.json');
    const beforeState = await readFile(stateFile);
    const beforePatch = await readFile(join(options.profile, 'cordis.patch.yml'));
    const retained = join(options.profile, 'node_modules/@local/aiyou-native-sidebar');
    const retainedTarget = await readlink(retained);
    const retired = await retireModule(options);
    await unlink(retired.path);
    if (owner === 'symlink') await makeLink('/user-owned-replacement', retired.path);
    else await writeFile(retired.path, 'user-owned replacement file\n');
    await assert.rejects(install(options), { code: 'LINK_CONFLICT' });
    if (owner === 'symlink') await assertLinkTarget(retired.path, '/user-owned-replacement');
    else assert.equal(await readFile(retired.path, 'utf8'), 'user-owned replacement file\n');
    assert.equal(await readlink(retained), retainedTarget);
    assert.deepEqual(await readFile(stateFile), beforeState);
    assert.deepEqual(await readFile(join(options.profile, 'cordis.patch.yml')), beforePatch);
  }));
}

test('failed upgrade restores the retired link and the previous receipt', async () => fixture(async ({ options }) => {
  await install(options);
  const stateFile = join(options.enhancerHome, 'install-state.json');
  const beforeState = await readFile(stateFile);
  const oldState = JSON.parse(beforeState);
  const beforePatch = await readFile(join(options.profile, 'cordis.patch.yml'));
  const retired = await retireModule(options);
  await assert.rejects(install({ ...options, hooks: { beforePatchWrite: async () => {
    await assert.rejects(lstat(retired.path), { code: 'ENOENT' });
    throw Object.assign(new Error('fixture failure after link retirement'), { code: 'FIXTURE_FAILURE' });
  } } }), { code: 'FIXTURE_FAILURE' });
  for (const row of oldState.links) await assertLinkTarget(row.path, row.target);
  assert.deepEqual(await readFile(stateFile), beforeState);
  assert.deepEqual(await readFile(join(options.profile, 'cordis.patch.yml')), beforePatch);
  assert.equal((await status(options)).installed, true);
}));

test('rollback never overwrites a concurrent new owner at the retired path', async () => fixture(async ({ options }) => {
  await install(options);
  const stateFile = join(options.enhancerHome, 'install-state.json');
  const beforeState = await readFile(stateFile);
  const oldState = JSON.parse(beforeState);
  const beforePatch = await readFile(join(options.profile, 'cordis.patch.yml'));
  const retired = await retireModule(options);
  await assert.rejects(install({ ...options, hooks: { beforePatchWrite: async () => {
    await assert.rejects(lstat(retired.path), { code: 'ENOENT' });
    await makeLink('/concurrent-new-owner', retired.path);
    throw Object.assign(new Error('fixture failure with a concurrent owner'), { code: 'FIXTURE_FAILURE' });
  } } }), { code: 'ROLLBACK_CONFLICT' });
  await assertLinkTarget(retired.path, '/concurrent-new-owner');
  const retained = oldState.links.find(row => row.name !== retired.name);
  await assertLinkTarget(retained.path, retained.target);
  assert.deepEqual(await readFile(stateFile), beforeState);
  assert.deepEqual(await readFile(join(options.profile, 'cordis.patch.yml')), beforePatch);
}));

test('failed upgrade does not resurrect a retired link already removed before installation', async () => fixture(async ({ options }) => {
  await install(options);
  const retired = await retireModule(options);
  await unlink(retired.path);
  await assert.rejects(install({ ...options, hooks: { beforePatchWrite: async () => {
    throw Object.assign(new Error('fixture failure with an initially absent link'), { code: 'FIXTURE_FAILURE' });
  } } }), { code: 'FIXTURE_FAILURE' });
  await assert.rejects(lstat(retired.path), { code: 'ENOENT' });
}));

// These fixtures deliberately contain only tiny fabricated ASAR files. They do
// not replace the independently verified official platform baseline.
async function windowsFixture(fn) {
  return fixture(async value => {
    const { options, manifest } = value;
    manifest.upstream.platform = 'win32-x64';
    await writeFile(join(options.runtime, 'manifest.json'), JSON.stringify(manifest));
    const winArchive = join(options.app, 'resources/app.asar');
    if (archivePath(options.app) !== winArchive) {
      await mkdir(dirname(winArchive), { recursive: true });
      await cp(archivePath(options.app), winArchive);
      await rm(join(options.app, 'Contents'), { recursive: true });
    }
    await writeFile(join(options.app, 'DeepSeek Harness.exe'), 'fixture executable marker');
    options._testHost = { platform: 'win32', arch: 'x64' };
    await fn(value);
  });
}

test('Windows layout accepts both installation root and existing executable', async () => windowsFixture(async ({ options, manifest, appHash }) => {
  for (const app of [options.app, join(options.app, 'DeepSeek Harness.exe')]) {
    const result = await probeApplication(app, manifest, options);
    assert.equal(result.platform, 'win32-x64');
    assert.equal(result.app, options.app);
    assert.equal(result.appAsarSha256, appHash);
  }
  await assert.rejects(install({ ...options, app: join(options.app, 'missing.exe') }), { code: 'APP_NOT_FOUND' });
  await assert.rejects(access(options.enhancerHome));
}));

test('Windows default locations use LOCALAPPDATA while official profile stays in DSH_HOME', async () => windowsFixture(async ({ options, location }) => {
  const home = join(location, 'home'), local = join(home, 'AppData/Local');
  const official = join(local, 'Programs/DeepSeek Harness');
  await cp(options.app, official, { recursive: true });
  const result = await paths({ runtime: options.runtime, _testHost: { platform: 'win32', arch: 'x64', home, env: { LOCALAPPDATA: local } } });
  assert.equal(result.enhancerHome, join(local, 'AIYOUDSH'));
  assert.equal(result.dshHome, join(home, '.dsh'));
  assert.equal(result.profile, join(home, '.dsh/profiles/desktop'));
  assert.equal(result.app, official);
  const overridden = await paths({ runtime: options.runtime, _testHost: { platform: 'win32', arch: 'x64', home, env: { LOCALAPPDATA: local, DSH_HOME: join(location, 'custom-dsh') } } });
  assert.equal(overridden.profile, join(location, 'custom-dsh/profiles/desktop'));
  await assert.rejects(access(result.enhancerHome));
}));

test('Windows discovery also recognizes ProgramFiles installations', async () => windowsFixture(async ({ options, location }) => {
  const programFiles = join(location, 'Program Files');
  const official = join(programFiles, 'DeepSeek Harness');
  await cp(options.app, official, { recursive: true });
  const result = await paths({ runtime: options.runtime, _testHost: { platform: 'win32', arch: 'x64', home: location, env: { ProgramFiles: programFiles } } });
  assert.equal(result.app, official);
}));

test('missing Windows installation fails before lock, backup or configuration mutation', async () => windowsFixture(async ({ options, location }) => {
  const absent = join(location, 'missing-application');
  const before = await readFile(join(options.profile, 'cordis.patch.yml'));
  await assert.rejects(install({ ...options, app: absent }), { code: 'APP_NOT_FOUND' });
  await assert.rejects(access(options.enhancerHome));
  await assert.rejects(access(join(options.dshHome, 'backups')));
  assert.deepEqual(await readFile(join(options.profile, 'cordis.patch.yml')), before);
}));

test('platform and architecture mismatches stop before any installer state is created', async () => windowsFixture(async ({ options }) => {
  const before = await readFile(join(options.profile, 'cordis.patch.yml'));
  for (const _testHost of [{ platform: 'darwin', arch: 'arm64' }, { platform: 'win32', arch: 'arm64' }, { platform: 'linux', arch: 'x64' }]) {
    await assert.rejects(install({ ...options, _testHost }), { code: 'APP_PLATFORM' });
  }
  await assert.rejects(access(options.enhancerHome));
  assert.deepEqual(await readFile(join(options.profile, 'cordis.patch.yml')), before);
}));

test('legacy platform-less schema 1 runtime is Mac arm64 only', async () => fixture(async ({ options, manifest }) => {
  delete manifest.upstream.platform;
  await writeFile(join(options.runtime, 'manifest.json'), JSON.stringify(manifest));
  await assert.rejects(install({ ...options, _testHost: { platform: 'win32', arch: 'x64' } }), { code: 'APP_PLATFORM' });
  await assert.rejects(install({ ...options, _testHost: { platform: 'darwin', arch: 'x64' } }), { code: 'APP_PLATFORM' });
  await assert.rejects(access(options.enhancerHome));
}));

test('Windows target normalization covers NT, UNC, separators and case without merging owners', () => {
  const equal = (left, right) => __testing.sameLink({ type: 'symlink', target: left }, { type: 'symlink', target: right }, 'win32');
  assert(equal('\\\\?\\C:\\Users\\Me\\runtime\\module\\', 'c:/users/me/runtime/module'));
  assert(equal('\\??\\C:\\Users\\Me\\runtime\\module', 'c:/users/me/runtime/module'));
  assert(equal('\\\\?\\UNC\\Server\\Share\\Module', '\\\\server\\share\\module'));
  assert(equal('\\\\?\\unc\\Server\\Share\\Module', '//server/share/module'));
  assert(!equal('C:\\Users\\Me\\runtime\\module', 'C:\\Users\\Me\\runtime\\other'));
  assert(!__testing.sameLink({ type: 'symlink', target: '/a' }, { type: 'other' }, 'win32'));
});

test('Windows transactions install, upgrade, retire, repeat and uninstall with schema 1 receipts', async () => windowsFixture(async ({ options, appHash }) => {
  const first = await install(options);
  assert.equal(first.platform, 'win32-x64');
  assert.equal(first.app, options.app);
  assert.equal((await status(options)).installed, true);
  assert.equal((await install(options)).alreadyInstalled, true);
  const beforeState = JSON.parse(await readFile(join(options.enhancerHome, 'install-state.json')));
  assert.equal(beforeState.schemaVersion, 1);
  const retired = await retireModule(options);
  const upgraded = await install(options);
  assert.deepEqual(upgraded.removedModules, [retired.name]);
  await assert.rejects(lstat(retired.path), { code: 'ENOENT' });
  assert.equal((await install(options)).alreadyInstalled, true);
  assert.equal((await uninstall(options)).installed, false);
  assert.equal(await readFile(join(options.profile, 'cordis.patch.yml'), 'utf8'), original);
  assert.equal(hash(await readFile(join(options.app, 'resources/app.asar'))), appHash);
}));

test('Windows upgrade preserves a user-owned module replacement', async () => windowsFixture(async ({ options }) => {
  await install(options);
  const retired = await retireModule(options);
  await unlink(retired.path);
  await writeFile(retired.path, 'user-owned replacement');
  const before = await readFile(join(options.profile, 'cordis.patch.yml'));
  await assert.rejects(install(options), { code: 'LINK_CONFLICT' });
  assert.equal(await readFile(retired.path, 'utf8'), 'user-owned replacement');
  assert.deepEqual(await readFile(join(options.profile, 'cordis.patch.yml')), before);
}));

test('Windows rollback restores retired junction and preserves concurrent patch changes', async () => windowsFixture(async ({ options }) => {
  await install(options);
  const retired = await retireModule(options);
  const target = await readlink(retired.path);
  const file = join(options.profile, 'cordis.patch.yml');
  const edited = `${await readFile(file, 'utf8')}\n- id: concurrent-win-edit\n  disabled: true\n`;
  await assert.rejects(install({ ...options, hooks: { beforePatchWrite: () => writeFile(file, edited) } }), { code: 'PATCH_CHANGED' });
  assert.equal(await readFile(file, 'utf8'), edited);
  assert.equal(await readlink(retired.path), target);
}));

test('Windows uninstall keeps a user-owned module and reports a partial receipt', async () => windowsFixture(async ({ options }) => {
  await install(options);
  const module = join(options.profile, 'node_modules/@local/aiyou-native-sidebar');
  await unlink(module);
  await writeFile(module, 'keep this user file');
  const result = await uninstall(options);
  assert.equal(result.installed, true);
  assert(result.conflicts.some(value => value.component === 'module-link'));
  assert.equal(await readFile(module, 'utf8'), 'keep this user file');
  assert.equal(JSON.parse(await readFile(join(options.enhancerHome, 'install-state.json'))).status, 'uninstall-partial');
}));

test('Windows junction parent is rejected without following it into another profile', async () => windowsFixture(async ({ options, location }) => {
  const external = join(location, 'external-modules');
  await mkdir(external);
  await makeLink(external, join(options.profile, 'node_modules'));
  const before = await readFile(join(options.profile, 'cordis.patch.yml'));
  await assert.rejects(install(options), { code: 'PROFILE_PATH' });
  assert.deepEqual(await readdir(external), []);
  assert.deepEqual(await readFile(join(options.profile, 'cordis.patch.yml')), before);
}));

test('native Windows creates real directory junctions without symlink elevation', { skip: process.platform !== 'win32' }, async () => windowsFixture(async ({ options }) => {
  await install(options);
  const receipt = JSON.parse(await readFile(join(options.enhancerHome, 'install-state.json')));
  for (const link of receipt.links) {
    assert((await lstat(link.path)).isSymbolicLink());
    await assertLinkTarget(link.path, link.target);
    assert.equal(await readFile(join(link.path, 'index.js'), 'utf8'), 'export function apply() {}\n');
  }
  // Repeat and upgrade must compare actual readlink() NT path representations.
  assert.equal((await install(options)).alreadyInstalled, true);
  await retireModule(options);
  await install(options);
  assert.equal((await status(options)).installed, true);
  await uninstall(options);
}));


test('CLI does not expose a platform-validation bypass', async () => fixture(async ({ options }) => {
  const result = execFileSync(process.execPath, [join(root, 'addon/installer.mjs'), 'dry-run', '--platform', 'win32-x64'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  assert.fail(`Unexpected CLI result: ${result}`);
}).catch(error => {
  if (!error.stderr) throw error;
  const response = JSON.parse(error.stderr.toString().trim());
  assert.equal(response.code, 'ARGUMENT');
}));


test('compatibility can lock package.json identity while rejecting path traversal', async () => fixture(async ({ options, manifest, componentMetadata }) => {
  // Add the exact already shipped package.json archive entry as another check.
  manifest.upstream.compatibility.push({ package: '@deepseek-ai/dsh-client-ui-sidebar', file: 'package.json', sha256: hash(componentMetadata) });
  await writeFile(join(options.runtime, 'manifest.json'), JSON.stringify(manifest));
  assert.equal((await install({ ...options, dryRun: true })).compatible, true);
  manifest.upstream.compatibility.at(-1).sha256 = '0'.repeat(64);
  await writeFile(join(options.runtime, 'manifest.json'), JSON.stringify(manifest));
  await assert.rejects(install(options), { code: 'APP_COMPATIBILITY' });
  manifest.upstream.compatibility.at(-1).file = '../package.json';
  await writeFile(join(options.runtime, 'manifest.json'), JSON.stringify(manifest));
  await assert.rejects(install(options), { code: 'MANIFEST' });
  await assert.rejects(access(options.enhancerHome));
}));


for (const [label, originalPatch] of [
  ['empty flow sequence', '[]\n'],
  ['flow sequence without trailing newline', '[]'],
  ['empty file', ''],
  ['blank file', '\n'],
  ['whitespace and CRLF', '  \r\n\r\n'],
  ['comment-only file', '# preserve my empty configuration\n'],
  ['comment without trailing newline', '# preserve without newline'],
  ['comments with blank CRLF lines', ' # first note\r\n\r\n# last note\r\n'],
]) {
  test(`${label} stays idempotent through install and upgrade, then restores exact bytes`, async () => fixture(async ({ options }) => {
    const file = join(options.profile, 'cordis.patch.yml');
    assert.equal((await install(options)).changed, true);
    const installedPatch = await readFile(file);
    assert.equal((await status(options)).installed, true);
    assert.equal((await install(options)).alreadyInstalled, true);
    assert.deepEqual(await readFile(file), installedPatch);
    const manifestFile = join(options.runtime, 'manifest.json');
    const next = JSON.parse(await readFile(manifestFile));
    next.version = '0.2.0';
    await writeFile(manifestFile, JSON.stringify(next));
    assert.equal((await install(options)).version, '0.2.0');
    assert.equal((await install(options)).alreadyInstalled, true);
    assert.equal((await uninstall(options)).installed, false);
    assert.deepEqual(await readFile(file), Buffer.from(originalPatch));
    assert.equal((await status(options)).installed, false);
  }, originalPatch));
}

test('scalar and malformed YAML patches remain rejected instead of being treated as empty', async () => fixture(async ({ options }) => {
  const file = join(options.profile, 'cordis.patch.yml');
  for (const originalPatch of ['null\n', '~\n', '# note\nplain scalar\n', '- id: [broken\n', '---\n---\n']) {
    await writeFile(file, originalPatch);
    await assert.rejects(install(options), { code: 'PATCH_FORMAT' });
    assert.equal(await readFile(file, 'utf8'), originalPatch);
  }
  await assert.rejects(access(join(options.dshHome, 'backups/aiyou-enhancer')));
}));
