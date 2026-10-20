/** Local, reversible enhancer installation. The official application is read-only. */
import { createHash, randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { access, chmod, cp, lstat, mkdir, open, readFile, readdir, readlink, realpath, rename, rm, stat, symlink, unlink, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
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

export async function paths(options = {}) {
  const selectedHome = options.dshHome ?? (process.env.DSH_HOME?.trim() || join(homedir(), '.dsh'));
  const expandedHome = selectedHome === '~' ? homedir() : selectedHome.startsWith('~/') ? join(homedir(), selectedHome.slice(2)) : selectedHome;
  const dshHome = resolve(expandedHome);
  const enhancerHome = resolve(options.enhancerHome ?? join(homedir(), 'Library/Application Support/AIYOU Harness Enhancer'));
  let runtime = options.runtime;
  if (!runtime) {
    for (const candidate of [join(here, 'runtime'), join(here, '../runtime'), join(here, '../dist/addon/runtime')]) {
      if (await metadata(join(candidate, 'manifest.json'))) { runtime = candidate; break; }
    }
  }
  return {
    dshHome, enhancerHome,
    profile: resolve(options.profile ?? join(dshHome, 'profiles/desktop')),
    runtime: runtime ? resolve(runtime) : null,
    app: resolve(options.app ?? '/Applications/DeepSeek Harness.app'),
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
export async function probeApplication(app, manifest) {
  const archive = join(app, 'Contents/Resources/app.asar');
  const reader = await readAsar(archive);
  try {
    const info = JSON.parse((await reader.read('package.json')).toString());
    if (info.version !== manifest.upstream.appVersion || info.dshBuildCommit !== manifest.upstream.buildCommit) throw fail('APP_VERSION', 'The installed Harness version differs from the supported build; nothing was installed');
    const digest = await fileHash(archive);
    if (digest !== manifest.upstream.appAsarSha256) throw fail('APP_HASH', 'The installed application archive differs from the supported build; nothing was installed');
    for (const entry of manifest.upstream.compatibility ?? []) {
      if (!/^@deepseek-ai\/[a-z0-9-]+$/.test(entry.package) || !/^lib\/[a-zA-Z0-9/._-]+$/.test(entry.file) || entry.file.includes('..')) throw fail('MANIFEST', 'Invalid compatibility record');
      if (hash(await reader.read(`dsh/node_modules/${entry.package}/${entry.file}`)) !== entry.sha256) throw fail('APP_COMPATIBILITY', 'A native replacement compatibility check failed; nothing was installed');
    }
    return { version: info.version, buildCommit: info.dshBuildCommit, appAsarSha256: digest, compatible: true };
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
  const doc = YAML.parseDocument(text || '[]\n', { keepSourceTokens: true, uniqueKeys: true, strict: true });
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
function patchPlan(raw, state, manifest) {
  const original = raw?.toString('utf8') ?? '';
  const block = managed(original);
  let base = original;
  if (block) {
    if (!state || hash(block.text) !== state.patch.managedHash) throw fail('PATCH_CONFLICT', 'The managed patch was edited or has no matching receipt; user configuration was preserved');
    base = block.base;
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
  return { after: Buffer.from(after), managedHash: hash(generated), restore, restoreExisted, legacyDisabled: legacy };
}
async function linkState(file) {
  const info = await metadata(file);
  if (!info) return { type: 'absent' };
  if (info.isSymbolicLink()) return { type: 'symlink', target: await readlink(file) };
  return { type: 'other' };
}
const sameLink = (left, right) => left.type === right.type && left.target === right.target;
async function safeParents(file, root) {
  let current = dirname(file);
  while (current !== dirname(root)) {
    const info = await metadata(current);
    if (info?.isSymbolicLink() || info && !info.isDirectory()) throw fail('PROFILE_PATH', 'A profile module parent is a symlink or not a directory; nothing was overwritten');
    if (current === root) return;
    current = dirname(current);
  }
  throw fail('PROFILE_PATH', 'Module path is outside the profile');
}
async function installLinks(plan) {
  for (const row of plan) {
    if (!sameLink(await linkState(row.path), row.current)) throw fail('LINK_CHANGED', 'A profile module path changed during installation');
    await safeParents(row.path, row.profile);
    await mkdir(dirname(row.path), { recursive: true });
    const temporary = `${row.path}.aiyou-${randomUUID()}`;
    try { await symlink(row.target, temporary, 'dir'); await rename(temporary, row.path); }
    finally { await rm(temporary, { force: true }); }
  }
}
async function removeRetiredLinks(plan, removed) {
  for (const row of plan) {
    await safeParents(row.path, row.profile);
    const current = await linkState(row.path);
    if (!sameLink(current, row.current)) throw fail('LINK_CHANGED', 'A retired module path changed during installation; the new owner was preserved');
    if (current.type === 'absent') continue;
    await unlink(row.path);
    removed.push(row);
  }
}
async function restoreRetiredLinks(rows, conflicts) {
  for (const row of [...rows].reverse()) {
    try {
      await safeParents(row.path, row.profile);
      const current = await linkState(row.path);
      if (sameLink(current, row.current)) continue;
      if (current.type !== 'absent') {
        conflicts.push({ component: 'retired-module-link', name: row.name });
        continue;
      }
      // Create directly rather than rename over the path: EEXIST preserves an
      // owner that appears after the absence check, including dangling links.
      await symlink(row.target, row.path, 'dir');
    } catch {
      let restored = false;
      try { restored = sameLink(await linkState(row.path), row.current); } catch { /* Preserve unreadable paths and continue rolling back the other links. */ }
      if (!restored) conflicts.push({ component: 'retired-module-link', name: row.name });
    }
  }
}
async function restoreLinks(rows, conflicts) {
  for (const row of [...rows].reverse()) {
    const current = await linkState(row.path);
    if (current.type === 'absent' || sameLink(current, row.before)) continue;
    if (!sameLink(current, { type: 'symlink', target: row.target })) { conflicts.push({ component: 'module-link', name: row.name }); continue; }
    if (row.before.type === 'absent') await unlink(row.path);
    else if (row.before.type === 'symlink') {
      const temporary = `${row.path}.aiyou-${randomUUID()}`;
      await symlink(row.before.target, temporary, 'dir'); await rename(temporary, row.path);
    }
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
  if (state.schemaVersion !== 1 || state.profile !== p.profile || !/^[a-f0-9]{64}$/.test(state.runtimeDigest) || state.runtimePath !== join(p.enhancerHome, 'runtime', state.runtimeDigest) || state.patch?.file !== join(p.profile, 'cordis.patch.yml') || !Array.isArray(state.links)) throw fail('RECEIPT_INVALID', 'The installation receipt does not match this enhancer/profile');
  for (const file of [state.patch.restoreBackup, state.patch.rawBackup]) within(p.backupRoot, relative(p.backupRoot, file));
  for (const row of state.links) {
    if (!/^@local\/[a-z0-9-]+$/.test(row.name) || row.path !== join(p.profile, 'node_modules', row.name) || row.before?.type !== 'absent') throw fail('RECEIPT_INVALID', 'The module receipt is inconsistent');
    within(state.runtimePath, relative(state.runtimePath, row.target));
  }
}

export async function install(options = {}) {
  const p = await paths(options);
  const perform = async () => {
    const runtime = await runtimeInfo(p.runtime);
    const application = await probeApplication(p.app, runtime.manifest);
    const profileMeta = await json(join(p.profile, 'package.json'));
    if (!Array.isArray(profileMeta?.dsh?.profile?.bundles)) throw fail('PROFILE_FORMAT', 'The selected desktop profile is not initialized; open official Harness once first');
    const state = await json(p.stateFile);
    validateState(p, state);
    if (state && state.profile !== p.profile) throw fail('PROFILE_CONFLICT', 'This enhancer installation belongs to a different profile');
    const patchFile = join(p.profile, 'cordis.patch.yml');
    const patchInfo = await metadata(patchFile);
    if (patchInfo && (!patchInfo.isFile() || patchInfo.isSymbolicLink())) throw fail('PATCH_PATH', 'The user patch is not a regular file');
    const raw = await optional(patchFile);
    const patch = patchPlan(raw, state, runtime.manifest);
    const runtimePath = join(p.enhancerHome, 'runtime', runtime.digest);
    const links = [];
    for (const module of runtime.manifest.modules) {
      const file = join(p.profile, 'node_modules', module.name);
      const current = await linkState(file);
      const previous = state?.links?.find(row => row.path === file);
      if (current.type !== 'absent' && (!previous || !sameLink(current, { type: 'symlink', target: previous.target }))) throw fail('LINK_CONFLICT', 'A module path belongs to another installation; nothing was overwritten');
      await safeParents(file, p.profile);
      links.push({ name: module.name, path: file, target: within(runtimePath, module.directory), current, before: previous?.before ?? { type: 'absent' }, profile: p.profile });
    }
    const activePaths = new Set(links.map(row => row.path));
    const retiredLinks = [];
    for (const previous of state?.links ?? []) {
      if (activePaths.has(previous.path)) continue;
      const current = await linkState(previous.path);
      if (current.type !== 'absent' && !sameLink(current, { type: 'symlink', target: previous.target })) throw fail('LINK_CONFLICT', 'A retired module path belongs to another owner; nothing was removed');
      await safeParents(previous.path, p.profile);
      retiredLinks.push({ ...previous, current, profile: p.profile });
    }
    const runtimeUnchanged = Boolean(await metadata(runtimePath)) && hash(JSON.stringify(await inventory(runtimePath))) === runtime.digest;
    const unchanged = !retiredLinks.length && runtimeUnchanged && state?.status === 'installed' && state.runtimeDigest === runtime.digest && raw && hash(raw) === state.patch.afterHash && links.every(row => sameLink(row.current, { type: 'symlink', target: row.target }));
    const result = { action: 'install', version: runtime.manifest.version, modules: links.length, removedModules: retiredLinks.filter(row => row.current.type !== 'absent').map(row => row.name), profile: p.profile, enhancerHome: p.enhancerHome, compatible: application.compatible, legacyDisabled: patch.legacyDisabled, needsRestart: !unchanged, refreshRecommended: !unchanged, appTerminated: false };
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
      patch: { file: patchFile, afterHash: hash(patch.after), managedHash: patch.managedHash, restoreExisted: patch.restoreExisted, restoreHash: hash(restore), restoreBackup, rawBackup, mode: patchInfo?.mode & 0o777 || 0o600 },
      links: links.map(({ current, profile, ...row }) => row),
    };
    await writeFile(join(backup, 'transaction.json'), `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600, flag: 'wx' });
    const stage = join(p.enhancerHome, `.runtime-${transaction}`);
    let patchWritten = false;
    const removedLinks = [];
    try {
      if (!await metadata(runtimePath)) {
        await cp(p.runtime, stage, { recursive: true, dereference: false });
        if (hash(JSON.stringify(await inventory(stage))) !== runtime.digest) throw fail('RUNTIME_CHANGED', 'Runtime payload changed while being copied');
        await mkdir(dirname(runtimePath), { recursive: true });
        await rename(stage, runtimePath);
      } else if (hash(JSON.stringify(await inventory(runtimePath))) !== runtime.digest) throw fail('RUNTIME_CHANGED', 'The installed runtime directory was edited; it was preserved');
      await installLinks(links);
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
      await restoreLinks(links.map(row => ({ ...row, before: row.current })), conflicts);
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
    if (state.profile !== p.profile) throw fail('PROFILE_CONFLICT', 'This receipt belongs to a different desktop profile');
    const raw = await optional(state.patch.file), text = raw?.toString('utf8') ?? '';
    const block = managed(text);
    if (block && hash(block.text) !== state.patch.managedHash) return { action: 'uninstall', installed: true, changed: false, conflicts: ['managed-patch-edited'], needsRestart: false, appTerminated: false };
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
      parsePatch(block.base);
      await atomic(state.patch.file, block.base, state.patch.mode, hash(raw));
      changed = true;
    }
    const conflicts = [];
    await restoreLinks(state.links, conflicts);
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
  const linked = await Promise.all(state.links.map(async row => ({ name: row.name, matches: sameLink(await linkState(row.path), { type: 'symlink', target: row.target }) })));
  return { action: 'status', installed: state.status === 'installed' && Boolean(block) && hash(block.text) === state.patch.managedHash && linked.every(row => row.matches), version: state.version, profile: state.profile, enhancerHome: p.enhancerHome, runtimeDigest: state.runtimeDigest, runtimeUnchanged, patchUnchanged: raw ? hash(raw) === state.patch.afterHash : false, managedPatchUnchanged: Boolean(block) && hash(block.text) === state.patch.managedHash, modules: linked.length, moduleLinks: linked, needsRestart: false };
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
  cli().catch(error => { console.error(JSON.stringify({ ok: false, code: error.code ?? 'INSTALLER_ERROR', message: error.code ? error.message : 'Installer operation failed; no configuration contents are printed' })); process.exitCode = 1; });
}
