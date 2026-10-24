import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {createCharacterLibrary} from '../aiyou/lib/canvas/character-library.mjs';
import {createCanvasAssetStore} from '../aiyou/vendor/codex-workspace-enhancer/asset-browser/canvas-asset-store.js';

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+cRZkAAAAASUVORK5CYII=', 'base64');
async function fixture(t) {
  const root = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-characters-'))), project = path.join(root, 'project'), assetRoot = path.join(root, 'dsh-assets');
  let config = {projects: [], assetMetadata: {}};
  const assets = createCanvasAssetStore({root: assetRoot, loadConfig: async () => config, updateConfig: async fn => { await fn(config); }, listLegacy: async () => [], resolveLegacy: async () => null});
  const first = await assets.ingestBytes(png, {name: '角色原图.png', projectId: 'library'});
  const context = {projectId: 'project-A', sessionId: 'session-A'};
  const library = createCharacterLibrary({rootDir: project, assets});
  t.after(async () => { await library.dispose(); await fs.rm(root, {recursive: true, force: true}); });
  return {root, project, assets, first, context, library, call: (cmd, args = {}, ctx = context) => library.invoke('canvas_characters_' + cmd, args, ctx)};
}
test('character metadata survives reopen and the real DSH writer protects canonical originals across renames', async t => {
  const f = await fixture(t);
  const saved = await f.call('save', {name: '阿澈', description: '深色外套', assetId: f.first.path, expectedRevision: 0});
  assert.equal(saved.characters[0].assetId, f.first.id);
  await assert.rejects(f.assets.remove(f.first.id), /引用/);
  const renamed = await f.assets.rename(f.first.id, '角色新原图.png');
  const reopened = createCharacterLibrary({rootDir: f.project, assets: f.assets});
  const state = await reopened.invoke('canvas_characters_list', {}, f.context);
  assert.equal(state.characters[0].asset.path, renamed.path); assert.equal(state.characters[0].name, '阿澈');
  await f.call('remove', {id: saved.changedId, expectedRevision: state.revision});
  assert.equal((await fs.readFile(renamed.path)).length, png.length);
  await f.assets.remove(f.first.id); assert.equal(await f.assets.get(f.first.id), null);
});
test('image replacement releases only the old character reference and preserves another character', async t => {
  const f = await fixture(t), second = await f.assets.ingestBytes(Buffer.from('GIF89a' + ' '.repeat(16) + ';'), {name: '第二原图.gif', projectId: 'library'});
  const a = await f.call('save', {name: '甲', assetId: f.first.id, expectedRevision: 0});
  const b = await f.call('save', {name: '乙', assetId: f.first.id, expectedRevision: 1});
  const changed = await f.call('save', {id: a.changedId, name: '甲改', assetId: second.id, expectedRevision: 2});
  assert.equal(changed.characters.find(c => c.id === a.changedId).assetId, second.id);
  await assert.rejects(f.assets.remove(f.first.id), /引用/);
  await f.call('remove', {id: b.changedId, expectedRevision: 3}); await f.assets.remove(f.first.id);
  await assert.rejects(f.assets.remove(second.id), /引用/);
});
test('concurrent stale writes and another project cannot overwrite character metadata', async t => {
  const f = await fixture(t);
  const results = await Promise.allSettled(['甲', '乙'].map(name => f.call('save', {name, assetId: f.first.id, expectedRevision: 0})));
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal(results.find(r => r.status === 'rejected').reason.code, 'CHARACTER_REVISION_CONFLICT');
  await assert.rejects(f.call('list', {}, {projectId: 'project-B'}), /不属于当前项目/);
  assert.equal((await f.call('list')).characters.length, 1);
});
test('failed reference release is durable and retried without losing a committed character deletion', async t => {
  const f = await fixture(t), base = f.assets.removeReference;
  const saved = await f.call('save', {name: '角色', assetId: f.first.id, expectedRevision: 0});
  f.assets.removeReference = async () => { throw Error('素材服务暂不可用'); };
  const removed = await f.call('remove', {id: saved.changedId, expectedRevision: 1});
  assert.equal(removed.characters.length, 0); assert.equal(removed.pendingCleanup, 1);
  await assert.rejects(f.assets.remove(f.first.id), /引用/);
  f.assets.removeReference = base;
  const reopened = createCharacterLibrary({rootDir: f.project, assets: f.assets});
  assert.equal((await reopened.invoke('canvas_characters_list', {}, f.context)).pendingCleanup, 0);
  await f.assets.remove(f.first.id);
});
test('failed gateway registration cannot claim a saved role, and non-images are rejected before mutation', async t => {
  const f = await fixture(t), base = f.assets.addReference;
  f.assets.addReference = async () => { throw Error('登记失败'); };
  await assert.rejects(f.call('save', {name: '角色', assetId: f.first.id, expectedRevision: 0}), /登记失败/);
  assert.equal((await f.call('list')).characters.length, 0);
  f.assets.addReference = base;
  const note = await f.assets.ingestBytes(Buffer.from('说明'), {name: 'note.txt'});
  await assert.rejects(f.call('save', {name: '角色', assetId: note.id, expectedRevision: 0}), /有效图片/);
  await assert.rejects(f.call('list', {}, {}), /先打开画布项目/);
  assert.equal((await f.call('list')).revision, 0);
});
