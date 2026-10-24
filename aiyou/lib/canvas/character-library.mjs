import fs from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';

const identifier = value => typeof value === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(value);
const error = (message, code = 'CHARACTER_INVALID') => Object.assign(new Error(message), {code});
const text = (value, max, required = false) => {
  if (typeof value !== 'string' || value.length > max || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value) || required && !value.trim()) throw error('角色名称或描述无效');
  return value.trim();
};

/** Project metadata only. Image bytes and deletion protection belong to DSH. */
export function createCharacterLibrary({rootDir, assets} = {}) {
  if (!path.isAbsolute(rootDir || '') || !assets?.get || !assets?.addReference || !assets?.removeReference) throw error('角色库需要项目目录和 DSH 素材服务');
  const root = path.resolve(rootDir), folder = path.join(root, 'Characters'), file = path.join(folder, 'characters.json');
  let queue = Promise.resolve();
  const ready = (async () => {
    await fs.mkdir(root, {recursive: true});
    if (await fs.realpath(root) !== root) throw error('角色目录不能通过符号链接跳出项目');
    await fs.mkdir(folder, {recursive: true});
    if (await fs.realpath(folder) !== folder) throw error('角色目录不能是符号链接');
  })();
  async function load(projectId) {
    await ready;
    let state;
    try {
      if ((await fs.lstat(file)).isSymbolicLink()) throw error('角色文件不能是符号链接');
      state = JSON.parse(await fs.readFile(file, 'utf8'));
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
      return {schemaVersion: 1, projectId, revision: 0, characters: [], pendingReleases: []};
    }
    if (state.schemaVersion !== 1 || state.projectId !== projectId || !Number.isSafeInteger(state.revision) || state.revision < 0 ||
        !Array.isArray(state.characters) || !Array.isArray(state.pendingReleases) || state.characters.length > 1000 ||
        state.characters.some(c => !identifier(c.id) || typeof c.assetId !== 'string' || typeof c.name !== 'string' || typeof c.description !== 'string')) throw error('角色库状态无效或不属于当前项目');
    return state;
  }
  async function write(state) {
    const temp = file + '.' + randomUUID() + '.tmp';
    try { await fs.writeFile(temp, JSON.stringify(state, null, 2) + '\n', {flag: 'wx', mode: 0o600}); await fs.rename(temp, file); }
    finally { await fs.rm(temp, {force: true}); }
  }
  const ref = (projectId, id) => ({projectId, nodeId: 'character:' + id, slot: 'character:' + id});
  async function drain(state) {
    const remaining = [];
    for (const item of state.pendingReleases) {
      if (!identifier(item.id) || typeof item.assetId !== 'string') throw error('角色引用清理记录无效');
      if (state.characters.some(c => c.id === item.id && c.assetId === item.assetId)) continue;
      try { await assets.removeReference(item.assetId, ref(state.projectId, item.id)); }
      catch { remaining.push(item); }
    }
    if (remaining.length !== state.pendingReleases.length) { state.pendingReleases = remaining; await write(state); }
  }
  async function view(state, changedId) {
    const characters = [];
    for (const item of state.characters) {
      let asset = null, assetError;
      try { asset = await assets.get(item.assetId); } catch (e) { assetError = e.message; }
      characters.push({...item, asset: asset ? {id: asset.id, path: asset.path, name: asset.name, kind: asset.kind, mimeType: asset.mimeType} : null, missingAsset: !asset, ...(assetError ? {assetError} : {})});
    }
    return {revision: state.revision, characters, changedId, pendingCleanup: state.pendingReleases.length,
      ...(state.pendingReleases.length ? {warning: '角色已保存，旧素材引用仍受到保护，将在下次打开时重试清理。'} : {})};
  }
  async function dispatch(command, args, context) {
    if (!identifier(context?.projectId)) throw error('请先打开画布项目', 'PROJECT_NOT_BOUND');
    const state = await load(context.projectId);
    await drain(state);
    if (command === 'canvas_characters_list') return view(state);
    if (command === 'canvas_characters_assets') return (await assets.list({kind: 'image'})).filter(a => a.kind === 'image').map(a => ({id: a.id, path: a.path, name: a.name, kind: a.kind, mimeType: a.mimeType}));
    if (!['canvas_characters_save', 'canvas_characters_remove'].includes(command)) throw error('未知角色库操作');
    if (!Number.isSafeInteger(args.expectedRevision) || args.expectedRevision !== state.revision) throw error('角色库已变化，请刷新后再保存', 'CHARACTER_REVISION_CONFLICT');
    const current = args.id ? state.characters.find(c => c.id === args.id) : null;
    if (args.id && (!identifier(args.id) || !current)) throw error('角色不存在', 'CHARACTER_NOT_FOUND');
    if (command === 'canvas_characters_remove' && !current) throw error('请选择要删除的角色');
    const draft = structuredClone(state);
    let resultId, newAsset, added = false;
    if (command === 'canvas_characters_save') {
      const name = text(args.name, 100, true), description = text(args.description ?? '', 5000);
      if (typeof args.assetId !== 'string' || args.assetId.length > 8192) throw error('请选择 DSH 素材库中的角色原图');
      newAsset = await assets.get(args.assetId);
      if (!newAsset || newAsset.kind !== 'image') throw error('角色原图必须是 DSH 素材库中的有效图片');
      if (!current && draft.characters.length >= 1000) throw error('单个项目角色数量已达上限');
      resultId = current?.id || randomUUID();
      const time = new Date().toISOString(), record = {id: resultId, name, description, assetId: newAsset.id, createdAt: current?.createdAt || time, updatedAt: time};
      if (!current || current.assetId !== newAsset.id) { await assets.addReference(newAsset.id, ref(context.projectId, resultId)); added = true; }
      if (current) draft.characters = draft.characters.map(c => c.id === resultId ? record : c);
      else draft.characters.push(record);
      if (current && current.assetId !== newAsset.id) draft.pendingReleases.push({id: resultId, assetId: current.assetId});
    } else {
      resultId = current.id;
      draft.characters = draft.characters.filter(c => c.id !== resultId);
      draft.pendingReleases.push({id: resultId, assetId: current.assetId});
    }
    draft.revision += 1;
    try { await write(draft); }
    catch (e) { if (added) await assets.removeReference(newAsset.id, ref(context.projectId, resultId)).catch(() => {}); throw e; }
    await drain(draft);
    return view(draft, resultId);
  }
  function invoke(command, args = {}, context = {}) {
    const task = queue.catch(() => {}).then(() => dispatch(command, args, context)); queue = task; return task;
  }
  return {invoke, dispose: () => queue.catch(() => {})};
}
