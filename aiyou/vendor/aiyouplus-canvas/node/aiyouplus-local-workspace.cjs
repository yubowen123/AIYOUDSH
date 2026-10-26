'use strict';

// Local workspace and restartable media pipelines. No cloud account or server.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const states = new Map();
function absolute(value) {
  if (typeof value !== 'string' || !path.isAbsolute(value) || /^(https?|asset|file):/i.test(value)) throw new Error('请选择绝对本地路径');
  return path.resolve(value);
}
function safeName(value) {
  return String(value || '未命名').replace(/[\\/:*?"<>|\x00-\x1f]/g, '_').slice(0, 100);
}
async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (e) { if (e.code === 'ENOENT') return fallback; throw e; }
}
async function atomic(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = file + '.' + crypto.randomUUID() + '.tmp';
  try { await fs.writeFile(temporary, data, { flag: 'wx' }); await fs.rename(temporary, file); }
  finally { await fs.rm(temporary, { force: true }); }
}
async function json(file, value) { await atomic(file, JSON.stringify(value, null, 2) + '\n'); }
function state(ctx) {
  const data = absolute(ctx.userData);
  if (!states.has(data)) states.set(data, { data, jobs: new Map() });
  return states.get(data);
}
async function workspace(st, directory) {
  const config = await readJson(path.join(st.data, 'local-workspace.json'), {});
  const root = absolute(directory || config.directory || path.join(st.data, 'Workspace'));
  for (const dir of ['', 'assets', 'exports', 'projects', 'jobs', 'scenes']) await fs.mkdir(path.join(root, dir), { recursive: true });
  return root;
}
function kind(file) {
  const ext = path.extname(file).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.svg'].includes(ext)) return 'image';
  if (['.mp4', '.mov', '.webm', '.mkv', '.avi'].includes(ext)) return 'video';
  if (['.mp3', '.wav', '.m4a', '.flac', '.aac', '.ogg'].includes(ext)) return 'audio';
  if (['.glb', '.gltf', '.obj'].includes(ext)) return '3d';
  return 'file';
}
function jobId(value) {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(String(value))) throw new Error('无效任务标识');
  return String(value);
}
async function addAsset(root, input) {
  input = absolute(input);
  const info = await fs.stat(input);
  if (!info.isFile()) throw new Error('素材必须是文件');
  const digest = crypto.createHash('sha256');
  for await (const chunk of require('node:fs').createReadStream(input)) digest.update(chunk);
  const sha256 = digest.digest('hex');
  const manifestFile = path.join(root, 'assets.json');
  const manifest = await readJson(manifestFile, []);
  const existing = manifest.find(item => item.sha256 === sha256);
  if (existing) {
    try { await fs.access(existing.path); return existing; } catch {}
  }
  const id = crypto.randomUUID();
  const target = path.join(root, 'assets', id + path.extname(input).toLowerCase());
  await fs.copyFile(input, target, require('node:fs').constants.COPYFILE_EXCL);
  const item = { id, name: path.basename(input), path: target, kind: kind(input),
    size: info.size, sha256, importedAt: new Date().toISOString() };
  manifest.push(item);
  await json(manifestFile, manifest);
  return item;
}
function substitute(value, previous) {
  if (value === '$previous') {
    if (!previous?.path) throw new Error('上一步没有可作为输入的文件');
    return previous.path;
  }
  if (Array.isArray(value)) return value.map(v => substitute(v, previous));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, substitute(v, previous)]));
  return value;
}
async function runJob(st, root, job, ctx) {
  const controller = new AbortController();
  const active = { controller, job };
  st.jobs.set(job.id, active);
  const persist = async () => {
    job.updatedAt = new Date().toISOString();
    await json(path.join(root, 'jobs', job.id + '.json'), job);
    ctx.emit?.('aiyouplus-local-job', { id: job.id, status: job.status, completed: job.completed, total: job.steps.length });
  };
  const media = ctx.handleMedia || require('./aiyouplus-local-media.cjs').tryHandleLocalMediaCommand;
  try {
    job.status = 'running'; job.error = null; await persist();
    for (let i = job.completed; i < job.steps.length; i++) {
      if (controller.signal.aborted) throw Object.assign(new Error('任务已取消'), { name: 'AbortError' });
      const step = job.steps[i];
      if (!/^aiyouplus_media_/.test(step.command)) throw new Error('流水线只允许本地媒体处理');
      const args = substitute(step.args || {}, job.results.at(-1));
      job.activeStep = i; await persist();
      const result = await media(step.command, args, { ...ctx, signal: controller.signal });
      if (!result.handled) throw new Error('未支持的媒体步骤: ' + step.command);
      job.results.push(result.value); job.completed = i + 1; await persist();
    }
    job.status = 'succeeded';
  } catch (error) {
    job.status = error.name === 'AbortError' || controller.signal.aborted ? 'cancelled' : 'failed';
    job.error = String(error.message || error);
  } finally {
    job.activeStep = null;
    await persist();
    st.jobs.delete(job.id);
  }
}
async function tryHandleLocalWorkspaceCommand(command, args = {}, ctx = {}) {
  if (!String(command).startsWith('aiyouplus_local_')) return { handled: false };
  const st = state(ctx);
  const root = await workspace(st);
  let value;
  if (command === 'aiyouplus_local_status') {
    value = { version: '1.1.0', directory: root, userData: st.data, mode: 'local',
      accountRequired: false, modelServices: '可配置模型 API 或本地推理服务',
      folders: ['assets', 'exports', 'projects', 'jobs', 'scenes'] };
  } else if (command === 'aiyouplus_local_set_directory') {
    const directory = await workspace(st, args.directory);
    await json(path.join(st.data, 'local-workspace.json'), { directory });
    value = { directory };
  } else if (command === 'aiyouplus_local_import') {
    if (!Array.isArray(args.inputPaths) || args.inputPaths.length < 1 || args.inputPaths.length > 100) throw new Error('请选择1到100个本地文件');
    const operation = (st.assetQueue || Promise.resolve()).then(async () => {
      const imported = [];
      for (const file of args.inputPaths) imported.push(await addAsset(root, file));
      return imported;
    });
    st.assetQueue = operation.catch(() => {});
    value = await operation;
  } else if (command === 'aiyouplus_local_assets') {
    value = await readJson(path.join(root, 'assets.json'), []);
  } else if (command === 'aiyouplus_local_read_text') {
    const file = absolute(args.path);
    if ((await fs.stat(file)).size > 10 * 1024 * 1024) throw new Error('文本超过10 MiB');
    value = await fs.readFile(file, 'utf8');
  } else if (command === 'aiyouplus_local_scene_save') {
    const scene = args.scene;
    if (!scene || scene.schema !== 'aiyouplus.scene.v1' || !Array.isArray(scene.objects) || scene.objects.length > 1000) throw new Error('场景格式无效');
    const file = args.outputPath ? absolute(args.outputPath) : path.join(root, 'scenes', safeName(args.name) + '.json');
    if (path.extname(file).toLowerCase() !== '.json') throw new Error('场景请保存为JSON');
    await json(file, scene); value = { path: file, objects: scene.objects.length };
  } else if (command === 'aiyouplus_local_scene_export') {
    const file = absolute(args.outputPath);
    const data = Buffer.from(String(args.dataBase64 || ''), 'base64');
    if (!data.length || data.length > 32 * 1024 * 1024) throw new Error('导出内容为空或超过32 MiB');
    const ext = path.extname(file).toLowerCase();
    if (ext === '.glb') {
      if (data.toString('ascii', 0, 4) !== 'glTF' || data.readUInt32LE(4) !== 2 || data.readUInt32LE(8) !== data.length) throw new Error('GLB数据无效');
    } else if (ext === '.gltf') {
      if (JSON.parse(data.toString()).asset?.version !== '2.0') throw new Error('glTF数据无效');
    } else throw new Error('请选择GLB或glTF格式');
    await atomic(file, data); value = { path: file, size: data.length };
  } else if (command === 'aiyouplus_local_pipeline_run') {
    let job;
    if (args.resumeId) {
      const id = jobId(args.resumeId);
      if (st.jobs.has(id)) throw new Error('任务仍在运行');
      job = await readJson(path.join(root, 'jobs', id + '.json'), null);
      if (!job) throw new Error('任务不存在');
      if (job.status === 'succeeded') throw new Error('任务已完成');
      for (const result of job.results) if (result.path) await fs.access(result.path);
      job.status = 'queued'; job.error = null; job.activeStep = null;
    } else {
      if (!Array.isArray(args.steps) || !args.steps.length || args.steps.length > 50) throw new Error('流水线需要1到50个步骤');
      if (args.steps.some(s => !/^aiyouplus_media_/.test(s.command))) throw new Error('流水线含非本地媒体命令');
      job = { id: crypto.randomUUID(), name: safeName(args.name || '本地处理任务'), createdAt: new Date().toISOString(),
        status: 'queued', steps: args.steps, completed: 0, results: [], activeStep: null };
    }
    await json(path.join(root, 'jobs', job.id + '.json'), job);
    // Defer work until IPC has returned the durable task id.
    const running = runJob(st, root, job, ctx);
    running.catch(error => { ctx.onError?.(error); });
    value = { id: job.id, status: job.status };
  } else if (command === 'aiyouplus_local_pipeline_cancel') {
    const active = st.jobs.get(jobId(args.id));
    if (active) active.controller.abort();
    value = { cancellationRequested: Boolean(active) };
  } else if (command === 'aiyouplus_local_jobs' || command === 'aiyouplus_local_job') {
    const names = command.endsWith('_job') ? [jobId(args.id) + '.json'] : (await fs.readdir(path.join(root, 'jobs'))).filter(x => x.endsWith('.json'));
    const jobs = [];
    for (const name of names) {
      const file = path.join(root, 'jobs', name);
      const activeAtRead = st.jobs.has(path.basename(name, '.json'));
      let job = await readJson(file, null);
      if (!job) continue;
      if (['queued', 'running'].includes(job.status) && !st.jobs.has(job.id)) {
        // Completion persists its terminal state before removing the active handle.
        // A read can hold the previous inode across that rename, so refresh it.
        job = await readJson(file, job);
        if (['queued', 'running'].includes(job.status) && !activeAtRead && !st.jobs.has(job.id)) {
          job.status = 'interrupted'; job.error = '应用曾退出；可从已完成的检查点继续';
        }
      }
      jobs.push(job);
    }
    value = command.endsWith('_job') ? jobs[0] || null : jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } else return { handled: false };
  return { handled: true, value };
}
module.exports = { tryHandleLocalWorkspaceCommand };
