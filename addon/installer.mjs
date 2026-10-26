/** Local, reversible enhancer installation. The official application is read-only. */
import { createHash, randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { access, chmod, cp, lstat, mkdir, open, readFile, readdir, readlink, realpath, rename, rm, stat, symlink, unlink, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve, win32 } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import YAML from './vendor/yaml/dist/index.js';

const here = dirname(fileURLToPath(import.meta.url));
const BEGIN = '# >>> AIYOU HARNESS ENHANCER MANAGED v1';
const END = '# <<< AIYOU HARNESS ENHANCER MANAGED v1';
const hash = value => createHash('sha256').update(value).digest('hex');
const fail = (code, message) => Object.assign(new Error(message), { code });
const optional = async file => { try { return await readFile(file); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } };
const metadata = async file => { try { return await lstat(file); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } };
function within(root, path) {
  const target = resolve(root, path), rel = relative(root, target);
  if (rel.startsWith('..') || isAbsolute(rel)) throw fail('INVALID_PATH', 'An enhancer path escapes its root');
  return target;
}
async function privateDirectory(path) { await mkdir(path, { recursive: true, mode: 0o700 }); }
async function atomic(file, bytes, mode = 0o600, expectedHash) {
  await mkdir(dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.aiyou-${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, bytes, { flag: 'wx', mode });
    if (expectedHash !== undefined) {
      const current = await optional(file), info = await metadata(file);
      if (info?.isSymbolicLink() || (current ? hash(current) : null) !== expectedHash) throw fail('PATCH_CHANGED', 'The user patch changed before replacement; it was preserved');
    }
    await rename(temporary, file);
  }
  finally { await rm(temporary, { force: true }); }
}
async function json(file) { const bytes = await optional(file); return bytes ? JSON.parse(bytes.toString()) : null; }

// The explicit internal host fixture is unavailable from the command line. It
// lets isolated tests exercise platform preflight without changing process state.
function host(options = {}) {
  const value = options._testHost ?? {};
  return { platform: value.platform ?? process.platform, arch: value.arch ?? process.arch, home: value.home ?? homedir(), env: value.env ?? process.env };
}
function hostPlatform(options = {}) { const h = host(options); return `${h.platform}-${h.arch}`; }
function normalizeWindowsPath(value) {
  let path = String(value).replaceAll('/', '\\');
  if (path.slice(0, 8).toLowerCase() === '\\\\?\\unc\\') path = `\\\\${path.slice(8)}`;
  else if (path.startsWith('\\\\?\\') || path.startsWith('\\??\\')) path = path.slice(4);
  return win32.normalize(path).replace(/\\+$/, '').toLowerCase();
}
function samePath(left, right, platform = process.platform) {
  return typeof left === 'string' && typeof right === 'string' && (platform === 'win32' ? normalizeWindowsPath(left) === normalizeWindowsPath(right) : left === right);
}
function sameLink(left, right, platform = process.platform) {
  return left.type === right.type && (left.type !== 'symlink' || samePath(left.target, right.target, platform));
}
function validatePlatform(manifest, options = {}) {
  const expected = manifest.upstream.platform ?? 'darwin-arm64';
  if (!['darwin-arm64', 'darwin-x64', 'win32-x64'].includes(expected)) throw fail('MANIFEST', 'Unsupported runtime target platform');
  if (hostPlatform(options) !== expected) throw fail('APP_PLATFORM', `This runtime requires ${expected}; this computer is ${hostPlatform(options)}. Nothing was installed`);
  return expected;
}
async function applicationRoot(candidate, platform) {
  if (!candidate) return null;
  const selected = resolve(candidate);
  const executable = platform === 'win32' && /\.exe$/i.test(selected);
  if (executable && !(await metadata(selected))?.isFile()) return null;
  const root = executable ? dirname(selected) : selected;
  const archive = join(root, platform === 'win32' ? 'resources/app.asar' : 'Contents/Resources/app.asar');
  return (await metadata(archive))?.isFile() ? root : null;
}
async function discoverApplication(options, h) {
  if (options.app) return { app: await applicationRoot(options.app, h.platform), requestedApp: resolve(options.app) };
  const candidates = h.platform === 'win32' ? [
    ...[h.env.LOCALAPPDATA && join(h.env.LOCALAPPDATA, 'Programs'), h.env.LOCALAPPDATA, h.env.ProgramFiles, h.env['ProgramFiles(x86)']].filter(Boolean)
      .flatMap(base => [join(base, 'DeepSeek Harness'), join(base, 'deepseek-harness'), join(base, 'DeepSeekHarness')]),
  ] : ['/Applications/DeepSeek Harness.app', join(h.home, 'Applications/DeepSeek Harness.app')];
  for (const candidate of candidates) {
    const app = await applicationRoot(candidate, h.platform);
    if (app) return { app, requestedApp: null };
  }
  return { app: null, requestedApp: null };
}

export async function paths(options = {}) {
  const h = host(options);
  const selectedHome = options.dshHome ?? (h.env.DSH_HOME?.trim() || join(h.home, '.dsh'));
  const expandedHome = selectedHome === '~' ? h.home : selectedHome.startsWith('~/') ? join(h.home, selectedHome.slice(2)) : selectedHome;
  const dshHome = resolve(expandedHome);
  const enhancerHome = resolve(options.enhancerHome ?? (h.platform === 'win32' ? join(h.env.LOCALAPPDATA || join(h.home, 'AppData/Local'), 'AIYOUDSH') : join(h.home, 'Library/Application Support/AIYOU Harness Enhancer')));
  let runtime = options.runtime;
  if (!runtime) {
    for (const candidate of [join(here, 'runtime'), join(here, '../runtime'), join(here, '../dist/addon/runtime')]) {
      if (await metadata(join(candidate, 'manifest.json'))) { runtime = candidate; break; }
    }
  }
  return {
    dshHome, enhancerHome, platform: h.platform, arch: h.arch,
    profile: resolve(options.profile ?? join(dshHome, 'profiles/desktop')),
    runtime: runtime ? resolve(runtime) : null,
    ...await discoverApplication(options, h),
    backupRoot: join(dshHome, 'backups/aiyou-enhancer'),
    stateFile: join(enhancerHome, 'install-state.json'),
  };
}

/** Read shipped ASAR metadata without executing application code. */
export async function readAsar(archive) {
  const handle = await open(archive, 'r');
  try {
    const lead = Buffer.alloc(16); await handle.read(lead, 0, 16, 0);
    const headerSize = lead.readUInt32LE(4), jsonSize = lead.readUInt32LE(12);
    if (jsonSize < 2 || jsonSize > 32 * 1024 * 1024 || headerSize < jsonSize) throw fail('APP_FORMAT', 'The installed application archive has an unsupported header');
    const bytes = Buffer.alloc(jsonSize); await handle.read(bytes, 0, jsonSize, 16);
    const tree = JSON.parse(bytes.toString('utf8'));
    return {
      async read(path) {
        let node = tree;
        for (const part of path.split('/')) node = node?.files?.[part];
        if (!node || node.unpacked || node.link || !Number.isSafeInteger(node.size) || node.size > 20 * 1024 * 1024) throw fail('APP_FORMAT', 'A compatibility entry is missing or unsupported');
        const result = Buffer.alloc(node.size);
        await handle.read(result, 0, node.size, 8 + headerSize + Number(node.offset));
        return result;
      },
      close: () => handle.close(),
    };
  } catch (error) { await handle.close(); throw error; }
}
async function fileHash(file) {
  const digest = createHash('sha256');
  for await (const chunk of createReadStream(file)) digest.update(chunk);
  return digest.digest('hex');
}
export async function probeApplication(app, manifest, options = {}) {
  const platform = validatePlatform(manifest, options);
  const selected = await applicationRoot(app, host(options).platform);
  if (!selected) throw fail('APP_NOT_FOUND', 'Official DeepSeek Harness was not found. Select its installation directory or executable with --app; nothing was installed');
  const archive = join(selected, platform.startsWith('win32-') ? 'resources/app.asar' : 'Contents/Resources/app.asar');
  const reader = await readAsar(archive);
  try {
    const info = JSON.parse((await reader.read('package.json')).toString());
    if (info.version !== manifest.upstream.appVersion || info.dshBuildCommit !== manifest.upstream.buildCommit) throw fail('APP_VERSION', 'The installed Harness version differs from the supported build; nothing was installed');
    const digest = await fileHash(archive);
    if (digest !== manifest.upstream.appAsarSha256) throw fail('APP_HASH', 'The installed application archive differs from the supported build; nothing was installed');
    for (const entry of manifest.upstream.compatibility ?? []) {
      if (!/^@deepseek-ai\/[a-z0-9-]+$/.test(entry.package) || !(entry.file === 'package.json' || /^lib\/[a-zA-Z0-9/._-]+$/.test(entry.file)) || entry.file.includes('..')) throw fail('MANIFEST', 'Invalid compatibility record');
      if (hash(await reader.read(`dsh/node_modules/${entry.package}/${entry.file}`)) !== entry.sha256) throw fail('APP_COMPATIBILITY', 'A native replacement compatibility check failed; nothing was installed');
    }
    return { version: info.version, buildCommit: info.dshBuildCommit, appAsarSha256: digest, platform, app: selected, compatible: true };
  } finally { await reader.close(); }
}

async function inventory(root, prefix = '') {
  const records = [];
  for (const entry of (await readdir(join(root, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isSymbolicLink()) throw fail('RUNTIME_SYMLINK', 'Runtime payload must not contain symlinks');
    const file = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) records.push(...await inventory(root, file));
    else if (entry.isFile()) records.push({ file, sha256: hash(await readFile(join(root, file))) });
  }
  return records;
}
async function runtimeInfo(runtime) {
  if (!runtime) throw fail('RUNTIME_MISSING', 'No addon runtime was found; provide --runtime');
  const manifest = await json(join(runtime, 'manifest.json'));
  if (manifest?.schemaVersion !== 1 || !Array.isArray(manifest.modules) || !Array.isArray(manifest.patches) || !manifest.upstream) throw fail('MANIFEST', 'Unsupported addon runtime manifest');
  const names = new Set(), ids = new Set();
  for (const module of manifest.modules) {
    if (!/^@local\/[a-z0-9-]+$/.test(module.name) || !/^[a-z0-9-]+$/.test(module.id) || !/^modules\/[a-z0-9-]+$/.test(module.directory) || names.has(module.name) || ids.has(module.id)) throw fail('MANIFEST', 'Invalid or duplicate runtime module');
    names.add(module.name); ids.add(module.id);
    const file = join(within(runtime, module.directory), 'package.json');
    if ((await json(file))?.name !== module.name) throw fail('MANIFEST', 'Runtime module identity does not match its manifest');
  }
  for (const patch of manifest.patches) {
    if (patch.name) throw fail('MANIFEST', 'Replacement patches must not try to rename an existing plugin');
    if (patch.insert && (!Array.isArray(patch.insert) || patch.insert.some(row => !ids.has(row.id) || !names.has(row.name)))) throw fail('MANIFEST', 'Inserted plugin identity is not declared');
  }
  const records = await inventory(runtime);
  return { manifest, records, digest: hash(JSON.stringify(records)) };
}

function parsePatch(text) {
  const doc = YAML.parseDocument(text ?? '', { keepSourceTokens: true, uniqueKeys: true, strict: true });
  // Blank/comment-only YAML has no content node. Treat that as an empty
  // sequence without rewriting its original whitespace or comments in patchPlan.
  // Explicit scalars (including null and ~) still fail the sequence contract.
  if (!doc.errors.length && doc.contents == null) doc.contents = doc.createNode([]);
  if (doc.errors.length || !YAML.isSeq(doc.contents)) throw fail('PATCH_FORMAT', 'The existing patch must be one valid YAML sequence; its contents were not changed');
  return doc;
}
function scalar(node) { return YAML.isScalar(node) ? node.value : undefined; }
function definedIds(doc) {
  const result = new Set();
  const entries = sequence => {
    if (!YAML.isSeq(sequence)) return;
    for (const row of sequence.items) {
      if (!YAML.isMap(row)) continue;
      const id = scalar(row.get('id', true)); if (typeof id === 'string') result.add(id);
      entries(row.get('config', true));
    }
  };
  for (const row of doc.contents.items) if (YAML.isMap(row)) entries(row.get('insert', true));
  return result;
}
function managed(text) {
  const begins = [...text.matchAll(/^# >>> AIYOU HARNESS ENHANCER MANAGED v1\r?$/gm)];
  const ends = [...text.matchAll(/^# <<< AIYOU HARNESS ENHANCER MANAGED v1\r?$(?:\n)?/gm)];
  if (!begins.length && !ends.length) return null;
  if (begins.length !== 1 || ends.length !== 1 || begins[0].index >= ends[0].index) throw fail('PATCH_CONFLICT', 'Managed patch boundaries were changed; user edits were preserved');
  const start = begins[0].index, end = ends[0].index + ends[0][0].length;
  return { start, end, text: text.slice(start, end), base: text.slice(0, start) + text.slice(end) };
}
function nodeIdentity(node) {
  // Compare inert YAML structure, including tags/anchors, rather than evaluating
  // JS tags or losing them through toJS(). Formatting and map key order may vary.
  const metadata = [node?.tag ?? null, node?.anchor ?? null];
  if (YAML.isScalar(node)) return ['scalar', ...metadata, typeof node.value, node.value];
  if (YAML.isSeq(node)) return ['sequence', ...metadata, node.items.map(nodeIdentity)];
  if (YAML.isMap(node)) return ['mapping', ...metadata, node.items.map(pair => [nodeIdentity(pair.key), nodeIdentity(pair.value)]).sort((a, b) => JSON.stringify(a[0]).localeCompare(JSON.stringify(b[0])))];
  if (YAML.isAlias(node)) return ['alias', node.source];
  if (node === null) return ['null'];
  throw fail('PATCH_CONFLICT', 'Owned patch aliases or unsupported YAML nodes were preserved');
}
function ownership(rows) {
  const rowHashes = parsePatch(YAML.stringify(rows, { lineWidth: 0 })).contents.items.map(row => hash(JSON.stringify(nodeIdentity(row))));
  return { schemaVersion: 1, hash: hash(JSON.stringify(rowHashes)), rowHashes };
}
async function ownedPatchBase(original, block, state) {
  if (!state) throw fail('PATCH_CONFLICT', 'The managed patch has no matching receipt; user configuration was preserved');
  if (hash(block.text) === state.patch.managedHash) return block.base;
  // Official settings serialization can append unrelated user rows before END.
  // Recovery is permitted only using the exact previously installed runtime,
  // with its original generated bytes still bound to the old receipt hash.
  const records = await inventory(state.runtimePath);
  if (hash(JSON.stringify(records)) !== state.runtimeDigest) throw fail('RUNTIME_CHANGED', 'The previous runtime was edited; patch ownership cannot be verified');
  const manifestBytes = await readFile(join(state.runtimePath, 'manifest.json'));
  if (hash(manifestBytes) !== records.find(row => row.file === 'manifest.json')?.sha256) throw fail('RUNTIME_CHANGED', 'The previous runtime changed during ownership verification');
  const manifest = JSON.parse(manifestBytes.toString('utf8'));
  const contentStart = block.text.indexOf('\n') + 1, contentEnd = block.text.lastIndexOf(END);
  const content = block.text.slice(contentStart, contentEnd), doc = parsePatch(content);
  if (doc.contents.flow) throw fail('PATCH_CONFLICT', 'Managed flow-list edits cannot be separated safely');
  const ids = new Set(doc.contents.items.filter(YAML.isMap).map(row => scalar(row.get('id', true))));
  const legacy = (manifest.legacyPluginIds ?? []).filter(id => ids.has(id));
  const expected = [...manifest.patches.slice(0, -1), ...legacy.map(id => ({ id, disabled: true })), manifest.patches.at(-1)];
  const generated = `${BEGIN}\n${YAML.stringify(expected, { lineWidth: 0 })}${END}\n`;
  if (hash(generated) !== state.patch.managedHash) throw fail('PATCH_CONFLICT', 'The prior owned patch cannot be verified against its receipt');
  const owned = ownership(expected);
  if (state.patch.owned && (state.patch.owned.schemaVersion !== 1 || state.patch.owned.hash !== owned.hash || JSON.stringify(state.patch.owned.rowHashes) !== JSON.stringify(owned.rowHashes))) throw fail('PATCH_CONFLICT', 'The owned patch receipt is inconsistent');
  const actual = doc.contents.items.map(row => hash(JSON.stringify(nodeIdentity(row))));
  const selected = owned.rowHashes.map(digest => {
    const indices = actual.flatMap((value, index) => value === digest ? [index] : []);
    if (indices.length !== 1) throw fail('PATCH_CONFLICT', 'An owned patch row was changed, removed or duplicated');
    return indices[0];
  });
  if (selected.some((index, i) => i && index <= selected[i - 1])) throw fail('PATCH_CONFLICT', 'Owned patch row order was changed');
  const ownedIds = new Set([...expected.map(row => row.id).filter(Boolean), ...manifest.modules.map(row => row.id)]), ownedNames = new Set(manifest.modules.map(row => row.name));
  function touchesOwned(row) {
    if (!YAML.isMap(row)) return false;
    if (ownedIds.has(scalar(row.get('id', true))) || ownedNames.has(scalar(row.get('name', true)))) return true;
    return ['insert', 'config'].some(key => { const nested = row.get(key, true); return YAML.isSeq(nested) && nested.items.some(touchesOwned); });
  }
  if (doc.contents.items.some((row, index) => !selected.includes(index) && touchesOwned(row))) throw fail('PATCH_CONFLICT', 'An additional row claims an owned plugin identity');
  let preserved = content;
  for (const index of [...selected].sort((a, b) => b - a)) {
    const row = doc.contents.items[index], start = content.lastIndexOf('\n', row.range[0] - 1) + 1, end = row.range[2];
    if (!/^-[ \t]/.test(content.slice(start, row.range[0])) || end > content.length) throw fail('PATCH_CONFLICT', 'Owned patch row boundaries cannot be separated safely');
    preserved = preserved.slice(0, start) + preserved.slice(end);
  }
  const base = original.slice(0, block.start) + preserved + original.slice(block.end);
  parsePatch(base);
  return base;
}
async function patchPlan(raw, state, manifest) {
  const original = raw?.toString('utf8') ?? '';
  const block = managed(original);
  let base = original;
  if (block) {
    base = await ownedPatchBase(original, block, state);
  } else if (state?.status === 'installed') throw fail('PATCH_CONFLICT', 'The managed patch was removed; inspect the current configuration before reinstalling');
  let restore = base;
  let restoreExisted = Boolean(raw);
  if (state && raw && hash(raw) === state.patch.afterHash) {
    restore = null; // resolved from private backup by the caller
    restoreExisted = state.patch.restoreExisted;
  }
  const doc = parsePatch(base);
  const legacy = (manifest.legacyPluginIds ?? []).filter(id => definedIds(doc).has(id));
  const patches = [...manifest.patches.slice(0, -1), ...legacy.map(id => ({ id, disabled: true })), manifest.patches.at(-1)];
  // Preserve every original byte for block-style lists. Flow lists are converted
  // through the YAML AST; custom tags remain inert tagged scalar nodes.
  if (!doc.contents.items.length && doc.contents.range) {
    const [start, end] = doc.contents.range;
    base = base.slice(0, start) + base.slice(end);
  } else if (doc.contents.flow) { doc.contents.flow = false; base = doc.toString({ lineWidth: 0 }); }
  let ending = '';
  base = base.replace(/^\.\.\.[ \t]*(?:#[^\r\n]*)?(?:\r?\n|$)/m, value => { ending = value; return ''; });
  if (base.trim() === '[]') base = base.replace(/\[\]/, '');
  const generated = `${BEGIN}\n${YAML.stringify(patches, { lineWidth: 0 })}${END}\n`;
  const after = `${base}${base && !base.endsWith('\n') ? '\n' : ''}${generated}${ending}`;
  parsePatch(after);
  return { after: Buffer.from(after), managedHash: hash(generated), owned: ownership(patches), restore, restoreExisted, legacyDisabled: legacy };
}
async function linkState(file) {
  const info = await metadata(file);
  if (!info) return { type: 'absent' };
  if (info.isSymbolicLink()) return { type: 'symlink', target: await readlink(file) };
  return { type: 'other' };
}
async function safeParents(file, root, platform = process.platform) {
  let current = dirname(file);
  while (!samePath(current, dirname(root), platform)) {
    const info = await metadata(current);
    if (info?.isSymbolicLink() || info && !info.isDirectory()) throw fail('PROFILE_PATH', 'A profile module parent is a symlink or not a directory; nothing was overwritten');
    if (samePath(current, root, platform)) return;
    const parent = dirname(current);
    if (samePath(parent, current, platform)) break;
    current = parent;
  }
  throw fail('PROFILE_PATH', 'Module path is outside the profile');
}
async function createModuleLink(target, file, platform) {
  // Windows directory junctions do not require elevation or Developer Mode.
  // symlink() remains exclusive: an arriving user-owned path is never replaced.
  await symlink(target, file, platform === 'win32' ? 'junction' : 'dir');
}
async function installLinks(plan, touched) {
  for (const row of plan) {
    if (!sameLink(await linkState(row.path), row.current, row.platform)) throw fail('LINK_CHANGED', 'A profile module path changed during installation');
    await safeParents(row.path, row.profile, row.platform);
    await mkdir(dirname(row.path), { recursive: true });
    if (sameLink(row.current, { type: 'symlink', target: row.target }, row.platform)) continue;
    if (!sameLink(await linkState(row.path), row.current, row.platform)) throw fail('LINK_CHANGED', 'A profile module path changed before replacement');
    if (row.current.type === 'symlink') {
      await unlink(row.path);
      touched.push(row); // rollback can restore an old link if creation fails
    }
    await createModuleLink(row.target, row.path, row.platform);
    if (row.current.type === 'absent') touched.push(row);
  }
}
async function removeRetiredLinks(plan, removed) {
  for (const row of plan) {
    await safeParents(row.path, row.profile, row.platform);
    const current = await linkState(row.path);
    if (!sameLink(current, row.current, row.platform)) throw fail('LINK_CHANGED', 'A retired module path changed during installation; the new owner was preserved');
    if (current.type === 'absent') continue;
    await unlink(row.path);
    removed.push(row);
  }
}
async function restoreRetiredLinks(rows, conflicts) {
  for (const row of [...rows].reverse()) {
    try {
      await safeParents(row.path, row.profile, row.platform);
      const current = await linkState(row.path);
      if (sameLink(current, row.current, row.platform)) continue;
      if (current.type !== 'absent') {
        conflicts.push({ component: 'retired-module-link', name: row.name });
        continue;
      }
      await createModuleLink(row.target, row.path, row.platform);
    } catch {
      let restored = false;
      try { restored = sameLink(await linkState(row.path), row.current, row.platform); } catch { /* Preserve unreadable paths and continue rolling back the other links. */ }
      if (!restored) conflicts.push({ component: 'retired-module-link', name: row.name });
    }
  }
}
async function restoreLinks(rows, conflicts) {
  for (const row of [...rows].reverse()) {
    try {
      await safeParents(row.path, row.profile, row.platform);
      const current = await linkState(row.path);
      if (sameLink(current, row.before, row.platform)) continue;
      if (current.type === 'absent') {
        if (row.before.type === 'symlink') await createModuleLink(row.before.target, row.path, row.platform);
        continue;
      }
      if (!sameLink(current, { type: 'symlink', target: row.target }, row.platform)) { conflicts.push({ component: 'module-link', name: row.name }); continue; }
      await unlink(row.path);
      if (row.before.type === 'symlink') await createModuleLink(row.before.target, row.path, row.platform);
    } catch { conflicts.push({ component: 'module-link', name: row.name }); }
  }
}
async function withLock(location, operation) {
  await privateDirectory(location);
  const lock = join(location, '.installer.lock');
  try { await mkdir(lock, { mode: 0o700 }); } catch (error) { if (error.code === 'EEXIST') throw fail('INSTALLER_BUSY', 'Another installer is active; no configuration was changed'); throw error; }
  try { return await operation(); } finally { await rm(lock, { recursive: true, force: true }); }
}

function validateState(p, state) {
  if (!state) return;
  if (state.schemaVersion !== 1 || !samePath(state.profile, p.profile, p.platform) || !/^[a-f0-9]{64}$/.test(state.runtimeDigest) || !samePath(state.runtimePath, join(p.enhancerHome, 'runtime', state.runtimeDigest), p.platform) || !samePath(state.patch?.file, join(p.profile, 'cordis.patch.yml'), p.platform) || !Array.isArray(state.links)) throw fail('RECEIPT_INVALID', 'The installation receipt does not match this enhancer/profile');
  for (const file of [state.patch.restoreBackup, state.patch.rawBackup]) within(p.backupRoot, relative(p.backupRoot, file));
  for (const row of state.links) {
    if (!/^@local\/[a-z0-9-]+$/.test(row.name) || !samePath(row.path, join(p.profile, 'node_modules', row.name), p.platform) || row.before?.type !== 'absent') throw fail('RECEIPT_INVALID', 'The module receipt is inconsistent');
    within(state.runtimePath, relative(state.runtimePath, row.target));
  }
}

export const __testing = Object.freeze({ normalizeWindowsPath, sameLink });

export async function install(options = {}) {
  const p = await paths(options);
  // Platform and app discovery must fail before even creating the lock directory.
  const preflight = await runtimeInfo(p.runtime);
  await probeApplication(p.app, preflight.manifest, options);
  const perform = async () => {
    const runtime = await runtimeInfo(p.runtime);
    const application = await probeApplication(p.app, runtime.manifest, options);
    const profileMeta = await json(join(p.profile, 'package.json'));
    if (!Array.isArray(profileMeta?.dsh?.profile?.bundles)) throw fail('PROFILE_FORMAT', 'The selected desktop profile is not initialized; open official Harness once first');
    const state = await json(p.stateFile);
    validateState(p, state);
    if (state && !samePath(state.profile, p.profile, p.platform)) throw fail('PROFILE_CONFLICT', 'This enhancer installation belongs to a different profile');
    const patchFile = join(p.profile, 'cordis.patch.yml');
    const patchInfo = await metadata(patchFile);
    if (patchInfo && (!patchInfo.isFile() || patchInfo.isSymbolicLink())) throw fail('PATCH_PATH', 'The user patch is not a regular file');
    const raw = await optional(patchFile);
    const patch = await patchPlan(raw, state, runtime.manifest);
    const runtimePath = join(p.enhancerHome, 'runtime', runtime.digest);
    const links = [];
    for (const module of runtime.manifest.modules) {
      const file = join(p.profile, 'node_modules', module.name);
      const current = await linkState(file);
      const previous = state?.links?.find(row => samePath(row.path, file, p.platform));
      if (current.type !== 'absent' && (!previous || !sameLink(current, { type: 'symlink', target: previous.target }, p.platform))) throw fail('LINK_CONFLICT', 'A module path belongs to another installation; nothing was overwritten');
      await safeParents(file, p.profile, p.platform);
      links.push({ name: module.name, path: file, target: within(runtimePath, module.directory), current, before: previous?.before ?? { type: 'absent' }, profile: p.profile, platform: p.platform });
    }
    const activePaths = links.map(row => row.path);
    const retiredLinks = [];
    for (const previous of state?.links ?? []) {
      if (activePaths.some(file => samePath(file, previous.path, p.platform))) continue;
      const current = await linkState(previous.path);
      if (current.type !== 'absent' && !sameLink(current, { type: 'symlink', target: previous.target }, p.platform)) throw fail('LINK_CONFLICT', 'A retired module path belongs to another owner; nothing was removed');
      await safeParents(previous.path, p.profile, p.platform);
      retiredLinks.push({ ...previous, current, profile: p.profile, platform: p.platform });
    }
    const runtimeUnchanged = Boolean(await metadata(runtimePath)) && hash(JSON.stringify(await inventory(runtimePath))) === runtime.digest;
    const unchanged = !retiredLinks.length && runtimeUnchanged && state?.status === 'installed' && state.runtimeDigest === runtime.digest && raw && hash(raw) === state.patch.afterHash && links.every(row => sameLink(row.current, { type: 'symlink', target: row.target }, p.platform));
    const result = { action: 'install', version: runtime.manifest.version, modules: links.length, removedModules: retiredLinks.filter(row => row.current.type !== 'absent').map(row => row.name), profile: p.profile, enhancerHome: p.enhancerHome, platform: application.platform, app: application.app, compatible: application.compatible, legacyDisabled: patch.legacyDisabled, needsRestart: !unchanged, refreshRecommended: !unchanged, appTerminated: false };
    if (options.dryRun || unchanged) return { ...result, dryRun: Boolean(options.dryRun), changed: false, ...(unchanged ? { alreadyInstalled: true } : {}) };
    let restore = patch.restore;
    if (restore === null) {
      const bytes = await optional(state.patch.restoreBackup);
      if (patch.restoreExisted && (!bytes || hash(bytes) !== state.patch.restoreHash)) throw fail('BACKUP_CHANGED', 'The private restore backup is missing or changed');
      restore = bytes?.toString('utf8') ?? '';
    }
    const transaction = randomUUID();
    const backup = join(p.backupRoot, transaction);
    await privateDirectory(backup);
    const rawBackup = join(backup, 'before.raw.yml');
    const restoreBackup = join(backup, 'restore.yml');
    if (raw) await writeFile(rawBackup, raw, { mode: 0o600, flag: 'wx' });
    if (patch.restoreExisted) await writeFile(restoreBackup, restore, { mode: 0o600, flag: 'wx' });
    const receipt = {
      schemaVersion: 1, status: 'installed', transaction, version: runtime.manifest.version,
      profile: p.profile, runtimePath, runtimeDigest: runtime.digest, application,
      patch: { file: patchFile, afterHash: hash(patch.after), managedHash: patch.managedHash, owned: patch.owned, restoreExisted: patch.restoreExisted, restoreHash: hash(restore), restoreBackup, rawBackup, mode: patchInfo?.mode & 0o777 || 0o600 },
      links: links.map(({ current, profile, platform, ...row }) => row),
    };
    await writeFile(join(backup, 'transaction.json'), `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600, flag: 'wx' });
    const stage = join(p.enhancerHome, `.runtime-${transaction}`);
    let patchWritten = false;
    const removedLinks = [], touchedLinks = [];
    try {
      if (!await metadata(runtimePath)) {
        await cp(p.runtime, stage, { recursive: true, dereference: false });
        if (hash(JSON.stringify(await inventory(stage))) !== runtime.digest) throw fail('RUNTIME_CHANGED', 'Runtime payload changed while being copied');
        await mkdir(dirname(runtimePath), { recursive: true });
        await rename(stage, runtimePath);
      } else if (hash(JSON.stringify(await inventory(runtimePath))) !== runtime.digest) throw fail('RUNTIME_CHANGED', 'The installed runtime directory was edited; it was preserved');
      await installLinks(links, touchedLinks);
      await removeRetiredLinks(retiredLinks, removedLinks);
      await options.hooks?.beforePatchWrite?.();
      const latest = await optional(patchFile);
      if ((latest ? hash(latest) : null) !== (raw ? hash(raw) : null)) throw fail('PATCH_CHANGED', 'The user patch changed during installation; it was preserved');
      await atomic(patchFile, patch.after, receipt.patch.mode, raw ? hash(raw) : null);
      patchWritten = true;
      await atomic(p.stateFile, `${JSON.stringify(receipt, null, 2)}\n`);
      return { ...result, changed: true, backupDirectory: backup, runtimeDigest: runtime.digest };
    } catch (error) {
      const conflicts = [];
      try {
        if (patchWritten && hash(await readFile(patchFile)) === receipt.patch.afterHash) {
          if (raw) await atomic(patchFile, raw, receipt.patch.mode, receipt.patch.afterHash); else await rm(patchFile, { force: true });
        }
      } catch {
        conflicts.push({ component: 'patch' });
      }
      await restoreRetiredLinks(removedLinks, conflicts);
      await restoreLinks(touchedLinks.map(row => ({ ...row, before: row.current })), conflicts);
      if (conflicts.length) throw fail('ROLLBACK_CONFLICT', 'Installation stopped; later module edits were preserved. Inspect installer status before retrying');
      throw error;
    } finally { await rm(stage, { recursive: true, force: true }); }
  };
  return options.dryRun ? perform() : withLock(p.enhancerHome, perform);
}

export async function uninstall(options = {}) {
  const p = await paths(options);
  const perform = async () => {
    const state = await json(p.stateFile);
    validateState(p, state);
    if (!state) return { action: 'uninstall', installed: false, changed: false, needsRestart: false, appTerminated: false };
    if (!samePath(state.profile, p.profile, p.platform)) throw fail('PROFILE_CONFLICT', 'This receipt belongs to a different desktop profile');
    const raw = await optional(state.patch.file), text = raw?.toString('utf8') ?? '';
    const block = managed(text);
    let base;
    if (block) {
      try { base = await ownedPatchBase(text, block, state); }
      catch (error) { if (!['PATCH_CONFLICT', 'PATCH_FORMAT', 'RUNTIME_CHANGED'].includes(error.code)) throw error; return { action: 'uninstall', installed: true, changed: false, conflicts: ['managed-patch-edited'], needsRestart: false, appTerminated: false }; }
    }
    if (options.dryRun) return { action: 'uninstall', dryRun: true, installed: true, changed: false, modules: state.links.length, needsRestart: true, appTerminated: false };
    let changed = false;
    if (raw && hash(raw) === state.patch.afterHash) {
      if (state.patch.restoreExisted) {
        const backup = await optional(state.patch.restoreBackup);
        if (!backup || hash(backup) !== state.patch.restoreHash) throw fail('BACKUP_CHANGED', 'The private restore backup was edited or removed; configuration was preserved');
        await atomic(state.patch.file, backup, state.patch.mode, hash(raw));
      } else {
        const latest = await optional(state.patch.file);
        if (!latest || hash(latest) !== hash(raw)) throw fail('PATCH_CHANGED', 'The user patch changed before removal; it was preserved');
        await rm(state.patch.file, { force: true });
      }
      changed = true;
    } else if (block) {
      parsePatch(base);
      await atomic(state.patch.file, base, state.patch.mode, hash(raw));
      changed = true;
    }
    const conflicts = [];
    await restoreLinks(state.links.map(row => ({ ...row, profile: p.profile, platform: p.platform })), conflicts);
    if (!conflicts.length) {
      if (await metadata(state.runtimePath)) {
        if (hash(JSON.stringify(await inventory(state.runtimePath))) === state.runtimeDigest) await rm(state.runtimePath, { recursive: true });
        else conflicts.push({ component: 'runtime', reason: 'edited-runtime-preserved' });
      }
    }
    if (!conflicts.length) await rm(p.stateFile, { force: true });
    else await atomic(p.stateFile, `${JSON.stringify({ ...state, status: 'uninstall-partial' }, null, 2)}\n`);
    return { action: 'uninstall', installed: Boolean(conflicts.length), changed, conflicts, needsRestart: changed, refreshRecommended: changed, appTerminated: false, privateBackupsRetained: true };
  };
  return options.dryRun ? perform() : withLock(p.enhancerHome, perform);
}

export async function status(options = {}) {
  const p = await paths(options), state = await json(p.stateFile);
  validateState(p, state);
  if (!state) return { action: 'status', installed: false, profile: p.profile, needsRestart: false };
  const raw = await optional(state.patch.file), block = raw ? managed(raw.toString()) : null;
  const runtimeUnchanged = Boolean(await metadata(state.runtimePath)) && hash(JSON.stringify(await inventory(state.runtimePath))) === state.runtimeDigest;
  let ownedUnchanged = false;
  if (block) {
    try { await ownedPatchBase(raw.toString('utf8'), block, state); ownedUnchanged = true; }
    catch (error) { if (!['PATCH_CONFLICT', 'PATCH_FORMAT', 'RUNTIME_CHANGED'].includes(error.code)) throw error; }
  }
  const linked = await Promise.all(state.links.map(async row => ({ name: row.name, matches: sameLink(await linkState(row.path), { type: 'symlink', target: row.target }, p.platform) })));
  return { action: 'status', installed: state.status === 'installed' && ownedUnchanged && linked.every(row => row.matches), version: state.version, profile: state.profile, enhancerHome: p.enhancerHome, runtimeDigest: state.runtimeDigest, runtimeUnchanged, patchUnchanged: raw ? hash(raw) === state.patch.afterHash : false, managedPatchUnchanged: ownedUnchanged, modules: linked.length, moduleLinks: linked, needsRestart: false };
}

async function cli() {
  let action = process.argv[2] ?? 'status';
  const options = {};
  const flags = { '--runtime': 'runtime', '--profile': 'profile', '--enhancer-home': 'enhancerHome', '--dsh-home': 'dshHome', '--app': 'app' };
  for (let index = 3; index < process.argv.length; index += 1) {
    const arg = process.argv[index];
    if (arg === '--dry-run') options.dryRun = true;
    else if (flags[arg] && process.argv[index + 1]) options[flags[arg]] = process.argv[++index];
    else throw fail('ARGUMENT', 'Unknown or incomplete installer argument');
  }
  if (action === 'dry-run') { action = 'install'; options.dryRun = true; }
  const operation = { install, uninstall, status }[action];
  if (!operation) throw fail('ARGUMENT', 'Use install, uninstall, status, or dry-run');
  console.log(JSON.stringify(await operation(options), null, 2));
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  // The installer inspects raw archive bytes; Electron otherwise treats app.asar as a directory.
  if (process.versions.electron) process.noAsar = true;
  cli().catch(error => { console.error(JSON.stringify({ ok: false, code: error.code ?? 'INSTALLER_ERROR', message: error.code ? error.message : 'Installer operation failed; no configuration contents are printed' })); process.exitCode = 1; });
}
