import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { libraryFolderId, resolveLibraryFolder, validateLinkedLibraryFolder, listLibraryFolderTree } from '../aiyou/vendor/codex-workspace-enhancer/asset-browser/library-folders.js';
import { createAssetScanCoordinator } from '../aiyou/vendor/codex-workspace-enhancer/asset-browser/asset-scan-coordinator.js';
import { collectAssetDirectory } from '../aiyou/vendor/codex-workspace-enhancer/asset-browser/asset-index-reconciliation.js';
import { AssetLibraryPager } from '../aiyou/vendor/codex-workspace-enhancer/asset-browser/asset-library-pagination.js';
import { AssetLibrarySearch } from '../aiyou/vendor/codex-workspace-enhancer/asset-browser/asset-library-search.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const server = path.join(ROOT, 'aiyou/vendor/codex-workspace-enhancer/asset-browser/server.js');
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+cRZkAAAAASUVORK5CYII=', 'base64');
const MP4 = Buffer.from('AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAtNtZGF0AAACrQYF//+p3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE2NSByMzIyMiBiMzU2MDVhIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAyNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIzLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IGlwX3JhdGlvPTEuNDAgYXE9MToxLjAwAIAAAAAWZYiEABX//uzPfgU3IDyL9ZQIdLVvgQAAAxVtb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAD6AABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACP3RyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAD6AAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAEAAAABAAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAA+gAAAAAAAEAAAAAAbdtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAAEAAAABAAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAFibWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABInN0YmwAAAC+c3RzZAAAAAAAAAABAAAArmF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAEAAQAEgAAABIAAAAAAAAAAEVTGF2YzYyLjI4LjEwMCBsaWJ4MjY0AAAAAAAAAAAAAAAY//8AAAA0YXZjQwFkAAr/4QAXZ2QACqzZXsBEAAADAAQAAAMACDxIllgBAAZo6+PLIsD9+PgAAAAAEHBhc3AAAAABAAAAAQAAABRidHJ0AAAAAAAAFlgAAAAAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAEAAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAssAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjYyLjEyLjEwMA==', 'base64');
const WAV = (() => { const bytes = Buffer.alloc(44 + 800); bytes.write('RIFF'); bytes.writeUInt32LE(bytes.length - 8, 4); bytes.write('WAVEfmt ', 8); bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(1, 22); bytes.writeUInt32LE(8000, 24); bytes.writeUInt32LE(16000, 28); bytes.writeUInt16LE(2, 32); bytes.writeUInt16LE(16, 34); bytes.write('data', 36); bytes.writeUInt32LE(800, 40); return bytes; })();
const digest = value => createHash('sha256').update(value).digest('hex');
async function sandbox(t) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-library-folders-'));
  const root = await fs.realpath(directory);
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  return root;
}
async function fixture(t) {
  const root = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-library-folders-service-'))), linked = path.join(root, 'linked'), second = path.join(root, 'linked-more'), configFile = path.join(root, 'config.json');
  await fs.mkdir(path.join(linked, 'shots', 'deep'), { recursive: true });
  await fs.mkdir(path.join(linked, 'empty')); await fs.mkdir(second);
  const originals = new Map([
    [path.join(linked, 'image.png'), PNG], [path.join(linked, 'shots', 'voice.wav'), WAV],
    [path.join(linked, 'shots', 'deep', 'video.mp4'), MP4], [path.join(linked, 'shots', 'deep', 'script.txt'), Buffer.from('目录过滤与本地扫描 fixture')],
    [path.join(second, 'not-linked.txt'), Buffer.from('不能串入同名前缀目录')],
  ]);
  for (const [file, bytes] of originals) await fs.writeFile(file, bytes);
  await fs.symlink(second, path.join(linked, 'escape'), 'dir');
  await fs.writeFile(configFile, JSON.stringify({ enabled: true, projects: [{ id: 'local', name: '本地素材', path: linked, folders: [linked], scanRoots: ['.'] }], assetMetadata: { [path.join(linked, 'image.png')]: { tags: ['保留标签'], smartGroup: 'asset' } }, automation: { inbox: { enabled: false }, routing: { enabled: false } }, deduplication: { enabled: false } }));
  const token = 'isolated-library-folder-token-' + 'x'.repeat(40);
  const env = { PATH: process.env.PATH, PORT: '0', ASSET_BROWSER_CONFIG: configFile, ASSET_BROWSER_API_TOKEN: token, DSH_HOME: root };
  if (process.env.SystemRoot) env.SystemRoot = process.env.SystemRoot;
  for (const [key, name] of Object.entries({ ASSET_BROWSER_LEDGER: 'download.json', GENERATION_TICKETS: 'tickets.json', GENERATION_THREAD_BINDINGS: 'bindings.json', CODEX_PROMPT_ASSOCIATIONS: 'prompts.json', ASSET_LIBRARY_INDEX: 'index.json', DUPLICATE_CLEANUP_LEDGER: 'duplicates.json', DUPLICATE_QUARANTINE: 'quarantine', PROMPT_LIBRARY_ROOT: 'prompt-library', THREE_D_TASKS: '3d.json', ASSET_ACTION_TRASH: 'trash', RHYTHM_CONTROL_REGISTRY: 'rhythm.json', CODEX_SESSIONS_ROOT: 'sessions', CODEX_GENERATED_IMAGES_ROOT: 'generated', CODEX_GLOBAL_STATE: 'state.json', CODEX_SESSION_INDEX: 'sessions.jsonl', AIYOU_ARENA_STATE_ROOT: 'arena' })) env[key] = path.join(root, name);
  let child, origin, stderr = '';
  async function stop() {
    if (child?.exitCode === null) await new Promise(resolve => { const timer = setTimeout(() => { child.kill('SIGKILL'); resolve(); }, 2000); child.once('exit', () => { clearTimeout(timer); resolve(); }); child.kill('SIGTERM'); });
  }
  async function start() {
    child = fork(server, [], { env, stdio: ['ignore', 'ignore', 'pipe', 'ipc'] });
    child.stderr.on('data', value => { stderr += String(value); });
    const port = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(Error('素材服务启动超时 ' + stderr)), 12000);
      child.once('error', reject); child.once('exit', code => { clearTimeout(timer); reject(Error('素材服务退出 ' + code + ' ' + stderr)); });
      child.on('message', message => { if (message?.type === 'ready') { clearTimeout(timer); resolve(message.port); } });
    });
    origin = 'http://127.0.0.1:' + port;
  }
  t.after(async () => { await stop(); await fs.rm(root, { recursive: true, force: true }); }); await start();
  const api = async (route, options = {}) => {
    const response = await fetch(origin + route, { ...options, headers: { 'x-asset-console-token': token, 'content-type': 'application/json', ...options.headers } });
    const body = await response.json();
    if (!response.ok) throw Object.assign(Error(body.error), { status: response.status });
    return body;
  };
  return { root, linked, second, configFile, originals, api, token, get origin() { return origin; }, restart: async () => { await stop(); await start(); } };
}

test('folder association validation rejects missing, relative, non-directory and unreadable paths before saving', async t => {
  const root = await sandbox(t), file = path.join(root, 'file.txt'); await fs.writeFile(file, 'original');
  for (const value of ['', '.', '../x', null, ['x'], root + '\0x', path.join(root, 'missing'), file]) await assert.rejects(validateLinkedLibraryFolder(value));
  const alias = path.join(root, 'alias'); await fs.symlink(root, alias, 'dir');
  assert.equal(await validateLinkedLibraryFolder(alias), root);
  await assert.rejects(validateLinkedLibraryFolder(root, { io: { ...fs, access: async () => { throw Object.assign(Error('denied'), { code: 'EACCES' }); } } }), error => error.statusCode === 403 && /EACCES/.test(error.message));
});

test('folder selectors enforce configured root boundaries, canonical encoding and symlink restrictions', async t => {
  const root = await sandbox(t), linked = path.join(root, 'assets'), outside = path.join(root, 'assets-more');
  await fs.mkdir(path.join(linked, 'nested'), { recursive: true }); await fs.mkdir(outside); await fs.symlink(outside, path.join(linked, 'escape'), 'dir');
  const project = { folders: [linked] };
  assert.equal((await resolveLibraryFolder(project, libraryFolderId(path.join(linked, 'nested')))).path, path.join(linked, 'nested'));
  const alias = path.join(root, 'legacy-root-alias'); await fs.symlink(linked, alias, 'dir');
  assert.equal((await resolveLibraryFolder({ folders: [alias] }, libraryFolderId(alias))).realPath, linked);
  assert.equal((await resolveLibraryFolder({ folders: [alias] }, libraryFolderId(path.join(alias, 'nested')))).realPath, path.join(linked, 'nested'));
  for (const value of [libraryFolderId(outside), libraryFolderId(path.join(linked, 'escape')), libraryFolderId(path.join(linked, 'escape', 'child')), 'garbage', 'dir_' + Buffer.from(linked + '/../assets-more').toString('base64url')]) await assert.rejects(resolveLibraryFolder(project, value));
});

test('directory scanning stops before enumeration when a nested directory resolves outside its configured root', async t => {
  const root = await sandbox(t), nested = path.join(root, 'nested'), reads = [];
  const result = await collectAssetDirectory(root, new Set(['.txt']), { io: {
    realpath: async directory => directory === root ? root : path.join(path.dirname(root), 'outside'),
    readdir: async directory => { reads.push(directory); return [{ name: 'nested', isSymbolicLink: () => false, isDirectory: () => true }]; },
  } });
  assert.deepEqual(reads, [root]); assert.deepEqual(result.files, []); assert.deepEqual(result.failedPaths, [nested]);
});

test('folder tree retains empty and deep directories, deduplicates overlapping roots and reports unreadable nodes', async t => {
  const root = await sandbox(t), deep = path.join(root, 'one', 'two'); await fs.mkdir(deep, { recursive: true }); await fs.mkdir(path.join(root, 'empty')); await fs.mkdir(path.join(root, '.hidden')); await fs.symlink(os.tmpdir(), path.join(root, 'escape'), 'dir');
  const project = { folders: [root, path.join(root, 'one')] }, assets = [{ id: 'a', sourcePath: path.join(deep, 'file.txt') }, { id: 'a', sourcePath: path.join(deep, 'file.txt') }];
  const tree = await listLibraryFolderTree(project, assets);
  assert.equal(tree.folders.length, 4); assert.equal(tree.folders.find(node => node.path === root).count, 1); assert.equal(tree.folders.find(node => node.path === deep).directCount, 1);
  assert.equal(tree.folders.find(node => node.path === path.join(root, 'one')).isRoot, true);
  const unavailable = await listLibraryFolderTree({ folders: [root] }, assets, { io: { ...fs, readdir: async (directory, options) => { if (directory === deep) throw Object.assign(Error(), { code: 'EACCES' }); return fs.readdir(directory, options); } } });
  assert.equal(unavailable.folders.find(node => node.path === deep).readable, false); assert.equal(unavailable.warnings[0].code, 'EACCES');
  assert.equal((await listLibraryFolderTree({ folders: [root] }, [], { limit: 2 })).truncated, true);
  const veryDeep = path.join(root, ...Array.from({ length: 12 }, (_, index) => 'level-' + index)); await fs.mkdir(veryDeep, { recursive: true });
  assert.ok((await listLibraryFolderTree({ folders: [root] }, [])).folders.some(node => node.path === veryDeep));
});

test('actual service lists only configured folders and applies folder selection before totals, search and pagination', async t => {
  const f = await fixture(t), initial = await f.api('/api/library?project=local&rescan=1');
  assert.deepEqual(initial.counts, { all: 4, text: 1, image: 1, audio: 1, video: 1 });
  const tree = await f.api('/api/library/folders?project=local');
  assert.deepEqual(new Set(tree.folders.map(node => node.name)), new Set(['linked', 'shots', 'deep', 'empty']));
  assert.equal(tree.folders.find(node => node.name === 'linked').count, 4); assert.equal(tree.folders.find(node => node.name === 'shots').count, 3); assert.equal(tree.folders.find(node => node.name === 'empty').count, 0);
  const folderId = tree.folders.find(node => node.name === 'deep').id, route = '/api/library?project=local&folderId=' + encodeURIComponent(folderId);
  const first = await f.api(route + '&limit=1&sort=name&related=0');
  assert.equal(first.total, 2); assert.equal(first.filteredTotal, 2); assert.equal(first.counts.all, 2); assert.equal(first.smartCounts.asset + first.smartCounts.review + first.smartCounts.noise, 2); assert.equal(first.assets.length, 1); assert.equal(first.page.nextOffset, 1);
  const next = await f.api(route + '&limit=1&sort=name&related=0&offset=1&revision=' + first.index.revision); assert.equal(next.assets.length, 1); assert.notEqual(first.assets[0].id, next.assets[0].id); assert.equal(next.page.hasMore, false);
  const rootPage = await f.api('/api/library?project=local&limit=1&sort=name&related=0'); assert.equal(rootPage.total, 4);
  const filtered = await f.api(route + '&limit=1&kind=video&query=video'); assert.equal(filtered.filteredTotal, 1); assert.equal(filtered.assets[0].kind, 'video');
  assert.equal((await f.api(route)).assets.length, 2);
  for (const folder of [f.second, path.join(f.linked, 'escape')]) await assert.rejects(f.api('/api/library?project=local&folderId=' + libraryFolderId(folder)), error => error.status === 403);
  assert.equal((await fetch(f.origin + '/api/library/folders?project=local')).status, 403);
});

test('concurrent association is additive and idempotent, scans new roots, preserves originals and survives restart', async t => {
  const f = await fixture(t), extra = path.join(f.root, 'third'); await fs.mkdir(extra); await fs.writeFile(path.join(extra, 'third.txt'), 'third');
  const add = absolute => f.api('/api/library/folders', { method: 'POST', body: JSON.stringify({ projectId: 'local', path: absolute }) });
  const receipts = await Promise.all([add(f.second), add(extra), add(f.second)]);
  assert.equal(receipts.filter(result => result.added).length, 2); assert.equal(receipts.filter(result => !result.added).length, 1);
  const config = JSON.parse(await fs.readFile(f.configFile)); assert.deepEqual(new Set(config.projects[0].folders), new Set([f.linked, f.second, extra])); assert.deepEqual(config.assetMetadata[path.join(f.linked, 'image.png')].tags, ['保留标签']);
  const before = await f.api('/api/library?project=local&rescan=1'); assert.equal(before.assets.length, 6); assert.equal(new Set(before.assets.map(asset => asset.id)).size, 6);
  const overlapping = await add(path.join(f.linked, 'shots')); assert.equal(overlapping.added, true); assert.equal(overlapping.scan.counts.all, 6);
  const ids = new Map(before.assets.map(asset => [asset.sourcePath, asset.id]));
  for (const [file, original] of f.originals) assert.equal(digest(await fs.readFile(file)), digest(original));
  const badConfig = await fs.readFile(f.configFile, 'utf8');
  await assert.rejects(add(path.join(f.root, 'missing'))); await assert.rejects(add('')); await assert.rejects(add('relative')); assert.equal(await fs.readFile(f.configFile, 'utf8'), badConfig);
  await f.restart(); const after = await f.api('/api/library?project=local'); assert.equal(after.assets.length, 6);
  for (const asset of after.assets) assert.equal(asset.id, ids.get(asset.sourcePath));
  assert.equal((await f.api('/api/library/folders?project=local')).folders.filter(node => node.isRoot).length, 4);
  await fs.writeFile(path.join(extra, 'new.txt'), 'new'); await fs.rm(path.join(extra, 'third.txt'));
  const rescanned = await f.api('/api/library?project=local&rescan=1'); assert.equal(rescanned.assets.length, 6); assert.ok(rescanned.assets.some(asset => asset.name === 'new.txt')); assert.ok(!rescanned.assets.some(asset => asset.name === 'third.txt'));
});

test('rescanning an unavailable configured root retains cached originals and reports degraded health', async t => {
  const f = await fixture(t); const before = await f.api('/api/library?project=local&rescan=1');
  await fs.rename(f.linked, f.linked + '-offline');
  const after = await f.api('/api/library?project=local&rescan=1'); assert.equal(after.assets.length, before.assets.length); assert.equal(after.index.health.state, 'degraded'); assert.equal(after.index.health.code, 'directory_unavailable');
  const tree = await f.api('/api/library/folders?project=local'); assert.equal(tree.folders[0].readable, false); assert.equal(tree.warnings[0].code, 'ENOENT');
  await f.restart();
  const restored = await f.api('/api/library?project=local'); assert.equal(restored.assets.length, before.assets.length);
});

test('actual filesystem permission failures reject linking atomically and preserve unreadable cached subtrees', { skip: process.platform === 'win32' || process.getuid?.() === 0 }, async t => {
  const f = await fixture(t), denied = path.join(f.root, 'denied'), deep = path.join(f.linked, 'shots', 'deep');
  await fs.mkdir(denied); await f.api('/api/library?project=local&rescan=1'); const config = await fs.readFile(f.configFile, 'utf8');
  await fs.chmod(denied, 0); await fs.chmod(deep, 0);
  try {
    await assert.rejects(f.api('/api/library/folders', { method: 'POST', body: JSON.stringify({ projectId: 'local', path: denied }) }), error => error.status === 403);
    assert.equal(await fs.readFile(f.configFile, 'utf8'), config);
    const page = await f.api('/api/library?project=local&rescan=1'); assert.equal(page.counts.all, 4); assert.equal(page.index.health.state, 'degraded');
    const tree = await f.api('/api/library/folders?project=local'); assert.equal(tree.folders.find(node => node.path === deep).readable, false); assert.ok(tree.warnings.some(warning => warning.code === 'EACCES'));
  } finally { await fs.chmod(denied, 0o755); await fs.chmod(deep, 0o755); }
});

test('manual scan reserves a queue slot after an existing read and later readers receive the rescan result', async () => {
  const coordinator = createAssetScanCoordinator(), order = []; let release;
  const pending = coordinator.run('project', () => new Promise(resolve => { order.push('old'); release = resolve; }));
  await Promise.resolve();
  const forced = coordinator.queue('project', async () => { order.push('new'); return 2; });
  const later = coordinator.run('project', () => { throw Error('must join reserved rescan'); });
  release(1); assert.equal(await pending, 1); assert.equal(await forced, 2); assert.equal(await later, 2); assert.deepEqual(order, ['old', 'new']);
});

test('folder selections isolate pager and semantic-search snapshots at the same project revision', async () => {
  const pager = new AssetLibraryPager(), a = [{ id: 'a', name: 'alpha', kind: 'text', smartGroup: 'asset' }], b = [{ id: 'b', name: 'beta', kind: 'image', smartGroup: 'review' }];
  assert.equal(pager.page({ projectId: 'p', assets: a, revision: 'r', filters: { folderId: 'a' } }).assets[0].id, 'a');
  assert.equal(pager.page({ projectId: 'p', assets: b, revision: 'r', filters: { folderId: 'b' } }).assets[0].id, 'b');
  const calls = [], search = new AssetLibrarySearch({ search: async request => { calls.push(request.documents.map(document => document.id)); return { engine: 'laya', results: request.documents.map(document => ({ id: document.id })), coverage: { indexed: 1 } }; } });
  const first = await search.select({ projectId: 'p', assets: a, revision: 'r', filters: { folderId: 'a', searchMode: 'laya', query: 'x' } });
  const second = await search.select({ projectId: 'p', assets: b, revision: 'r', filters: { folderId: 'b', searchMode: 'laya', query: 'x' } });
  assert.deepEqual(calls, [['a'], ['b']]); assert.notEqual(first.key, second.key);
});
