'use strict';

// Recovered local IPC contracts. Importing this module starts no process, server,
// browser scan or tray. All work follows an explicit IPC or mounted HTTP request.
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const http = require('node:http');
const { spawn } = require('node:child_process');

const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const unwrap = value => object(value?.args) ? value.args : object(value) ? value : {};
const runtimes = new Map();
const SCOPES = new Set(['read', 'run', 'control']);
const ACTIONS = new Set(['start_recipe', 'pause_run', 'resume_run', 'cancel_run', 'retry_run']);
const MAX_JSON = 512 * 1024 * 1024;
const MIME_EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'video/mp4': 'mp4', 'video/webm': 'webm', 'video/quicktime': 'mov', 'audio/mpeg': 'mp3', 'audio/wav': 'wav', 'audio/mp4': 'm4a', 'audio/ogg': 'ogg' };
const EXT_MIME = Object.fromEntries(Object.entries(MIME_EXT).map(([mime, ext]) => [ext, mime]));
EXT_MIME.jpeg = 'image/jpeg';

function optionsOf(value) {
  if (value == null) return {};
  if (typeof value === 'string') {
    try { value = JSON.parse(value); } catch { throw new Error('options 必须是有效 JSON 对象'); }
  }
  if (!object(value)) throw new Error('options 必须是 JSON 对象');
  return value;
}
function absolute(value, label = 'path') {
  if (typeof value !== 'string' || !value.trim() || !path.isAbsolute(value) || value.includes('\0')) throw new Error(`${label} 必须是本地绝对路径`);
  return path.resolve(value);
}
function safeRelative(value) {
  if (typeof value !== 'string' || !value || value.includes('\0') || /^(?:[A-Za-z]:|[/\\])/.test(value)) throw new Error('项目资源路径必须是相对路径');
  const normalized = value.replace(/\\/g, '/');
  if (normalized.split('/').some(part => !part || part === '.' || part === '..')) throw new Error('项目资源路径越界或格式无效');
  return normalized;
}
async function containedExisting(root, relative) {
  const safe = safeRelative(relative);
  const realRoot = await fsp.realpath(root);
  const target = path.join(realRoot, ...safe.split('/'));
  const real = await fsp.realpath(target);
  if (real === realRoot || !real.startsWith(realRoot + path.sep)) throw new Error('项目资源指向容器目录以外');
  if (!(await fsp.stat(real)).isFile()) throw new Error('项目资源不是普通文件');
  return real;
}
async function atomicJson(file, value) {
  await fsp.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.aiyouplus-${crypto.randomUUID()}.tmp`;
  try { await fsp.writeFile(temporary, JSON.stringify(value), { mode: 0o600 }); await fsp.rename(temporary, file); }
  finally { await fsp.rm(temporary, { force: true }); }
}
async function readJson(file, limit = MAX_JSON) {
  const stat = await fsp.stat(file);
  if (!stat.isFile() || stat.size > limit) throw new Error(`项目 JSON 不是普通文件或超过 ${Math.round(limit / 1024 / 1024)}MB`);
  try { return JSON.parse(await fsp.readFile(file, 'utf8')); }
  catch (error) { throw new Error(`JSON 解析失败: ${error.message}`); }
}
async function hashFile(file, limit) {
  const stat = await fsp.stat(file);
  if (!stat.isFile() || stat.size > limit) throw new Error('项目资源超过 max_memory_mb 限制');
  const hash = crypto.createHash('sha256');
  for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}
function validateProject(value) {
  if (!object(value) || !Array.isArray(value.nodes) || !Array.isArray(value.connections)) throw new Error('项目 JSON 必须包含 nodes 和 connections 数组');
  if (value.groups !== undefined && !Array.isArray(value.groups)) throw new Error('项目 groups 必须是数组');
  return value;
}
function decodeBase64(input, label = '数据') {
  if (typeof input !== 'string') throw new Error(`${label} 必须是 base64 字符串`);
  const comma = input.startsWith('data:') ? input.indexOf(',') : -1;
  const raw = (comma >= 0 ? input.slice(comma + 1) : input).replace(/\s+/g, '');
  if (!raw || raw.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(raw)) throw new Error(`${label} base64 无效`);
  const bytes = Buffer.from(raw, 'base64');
  if (bytes.toString('base64').replace(/=+$/, '') !== raw.replace(/=+$/, '')) throw new Error(`${label} base64 无效`);
  return bytes;
}
function mediaDataUrl(value) {
  if (typeof value !== 'string') return null;
  const match = /^data:((?:image|video|audio)\/[A-Za-z0-9.+-]+);base64,([\s\S]*)$/.exec(value);
  return match ? { mime: match[1].toLowerCase(), bytes: decodeBase64(match[2], '项目资源') } : null;
}

async function exportProject(args, context) {
  const target = absolute(args.path);
  if (path.dirname(target) === target) throw new Error('项目导出不能覆盖磁盘根目录');
  const options = optionsOf(args.options);
  const raw = args.payloadJson ?? args.payload_json;
  if (typeof raw !== 'string' || Buffer.byteLength(raw) > (context.maxProjectBytes || MAX_JSON)) throw new Error('payloadJson 缺失或超过本地项目大小限制');
  let project;
  try { project = validateProject(JSON.parse(raw)); } catch (error) { throw new Error(`JSON 解析失败: ${error.message}`); }
  const allowed = new Set(['project.data.json', 'project.meta.json', 'checksums.txt', 'assets', '.DS_Store']);
  let previous = false;
  try {
    const stat = await fsp.lstat(target);
    if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error('项目导出目标必须是非符号链接目录');
    const entries = await fsp.readdir(target);
    if (entries.some(name => !allowed.has(name)) || (entries.length && !entries.includes('project.data.json'))) throw new Error('导出目标包含非项目文件，请选择空目录或已有项目容器');
    previous = true;
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await fsp.mkdir(path.dirname(target), { recursive: true });
  const stage = await fsp.mkdtemp(path.join(path.dirname(target), '.aiyouplus-export-'));
  const backup = `${target}.aiyouplus-backup-${crypto.randomUUID()}`;
  const assets = new Map();
  const checksums = [];
  let movedPrevious = false;
  try {
    await fsp.mkdir(path.join(stage, 'assets'));
    async function extract(value, depth = 0) {
      if (depth > 128) throw new Error('项目 JSON 嵌套过深');
      const media = options.separate_assets !== false && options.separateAssets !== false ? mediaDataUrl(value) : null;
      if (media) {
        const id = sha256(Buffer.concat([Buffer.from(media.mime + '\0'), media.bytes]));
        const relative = `assets/${id}.${MIME_EXT[media.mime] || 'bin'}`;
        if (!assets.has(id)) {
          await fsp.writeFile(path.join(stage, relative), media.bytes);
          assets.set(id, { relative, mime: media.mime, size: media.bytes.length });
          checksums.push([relative, sha256(media.bytes)]);
        }
        // Object marker names are retained by the original Rust image/video/audio extractor.
        return { _assetRef: id, _mime: media.mime, _size: media.bytes.length, _path: relative };
      }
      if (Array.isArray(value)) { const result = []; for (const child of value) result.push(await extract(child, depth + 1)); return result; }
      if (object(value)) {
        const result = Object.create(null);
        for (const [key, child] of Object.entries(value)) result[key] = await extract(child, depth + 1);
        return result;
      }
      return value;
    }
    const data = await extract(project);
    const serialized = JSON.stringify(data);
    const meta = { version: '3.0-container', node_count: project.nodes.length, connection_count: project.connections.length, group_count: project.groups?.length || 0, asset_count: assets.size, created_at: new Date().toISOString() };
    await fsp.writeFile(path.join(stage, 'project.data.json'), serialized);
    await fsp.writeFile(path.join(stage, 'project.meta.json'), JSON.stringify(meta));
    checksums.unshift(['project.data.json', sha256(serialized)], ['project.meta.json', sha256(JSON.stringify(meta))]);
    if (options.hash !== false) await fsp.writeFile(path.join(stage, 'checksums.txt'), checksums.map(([name, hash]) => `${name} ${hash}`).join('\n') + '\n');
    if (previous) { await fsp.rename(target, backup); movedPrevious = true; }
    try { await fsp.rename(stage, target); }
    catch (error) { if (movedPrevious) { await fsp.rename(backup, target); movedPrevious = false; } throw error; }
    if (movedPrevious) await fsp.rm(backup, { recursive: true, force: true });
    context.emit?.('project-progress', { percent: 100, message: '项目容器已写入并完成资源校验清单' });
    return { meta, path: target, failures: [] };
  } finally { await fsp.rm(stage, { recursive: true, force: true }); }
}

async function importProject(args, context) {
  let target = absolute(args.path);
  const options = optionsOf(args.options);
  const memoryLimit = Number(options.max_memory_mb ?? options.maxMemoryMb ?? 512);
  if (!Number.isFinite(memoryLimit) || memoryLimit <= 0) throw new Error('max_memory_mb 无效');
  const limit = Math.min(context.maxProjectBytes || MAX_JSON, memoryLimit * 1024 * 1024);
  const inputStat = await fsp.stat(target);
  if (inputStat.isFile()) {
    if (!/\.json$/i.test(target)) throw new Error('本地 import_project 接受 JSON 文件或项目目录；ZIP 请使用界面 ZIP 导入');
    if (path.basename(target) === 'project.data.json') target = path.dirname(target);
    else {
      const project = validateProject(await readJson(target, limit));
      if (/"_assetRef"|"@asset:/.test(JSON.stringify(project))) throw new Error('JSON 含容器资源引用，请选择包含 project.data.json 与 assets 的项目目录');
      return { project_json: project, meta: null, failures: [] };
    }
  }
  if (!inputStat.isDirectory() && !inputStat.isFile()) throw new Error('项目路径不是文件或目录');
  target = await fsp.realpath(target);
  try { await fsp.access(path.join(target, 'project.data.json')); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const candidates = [];
    for (const entry of await fsp.readdir(target, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.isSymbolicLink()) continue;
      const candidate = path.join(target, entry.name);
      try { await fsp.access(path.join(candidate, 'project.data.json')); candidates.push(candidate); } catch (e) { if (e.code !== 'ENOENT') throw e; }
    }
    if (candidates.length !== 1) throw new Error(candidates.length ? '所选目录包含多个项目，请选择具体项目文件夹' : '缺少 project.data.json 文件');
    target = candidates[0];
  }
  const payloadPath = await containedExisting(target, 'project.data.json');
  const project = validateProject(await readJson(payloadPath, limit));
  let meta = null;
  try { meta = await readJson(await containedExisting(target, 'project.meta.json'), 1024 * 1024); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const checksumEntries = new Map();
  let checksumPath;
  try { checksumPath = await containedExisting(target, 'checksums.txt'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (checksumPath) {
    if ((await fsp.stat(checksumPath)).size > 8 * 1024 * 1024) throw new Error('项目校验清单过大');
    for (const line of (await fsp.readFile(checksumPath, 'utf8')).split(/\r?\n/)) {
      if (!line.trim() || line.trim().startsWith('#')) continue;
      const match = /^(.+?)\s+([a-fA-F0-9]{64})$/.exec(line.trim());
      if (!match) throw new Error('项目校验清单格式无效');
      const relative = safeRelative(match[1]);
      const file = await containedExisting(target, relative);
      if (await hashFile(file, limit) !== match[2].toLowerCase()) throw new Error(`项目资源校验失败: ${relative}`);
      checksumEntries.set(relative, match[2].toLowerCase());
    }
  }
  let consumedBytes = (await fsp.stat(payloadPath)).size;
  const assetFiles = [];
  const cache = new Map();
  async function restore(value, depth = 0) {
    if (depth > 128) throw new Error('项目 JSON 嵌套过深');
    let relative, mime, expectedSize;
    if (object(value) && value._assetRef !== undefined && typeof value._path !== 'string') throw new Error('项目资源引用缺少 _path');
    if (object(value) && value._assetRef !== undefined && typeof value._path === 'string') {
      relative = safeRelative(value._path); mime = value._mime; expectedSize = value._size;
    } else if (typeof value === 'string' && value.startsWith('@asset:')) {
      const id = value.slice(7);
      if (!/^[A-Za-z0-9_-]+$/.test(id)) throw new Error('项目资源 ID 无效');
      const matches = (await fsp.readdir(path.join(target, 'assets'))).filter(file => path.parse(file).name === id);
      if (matches.length !== 1) throw new Error(`项目资源缺失或不唯一: ${id}`);
      relative = `assets/${matches[0]}`; mime = EXT_MIME[path.extname(matches[0]).slice(1).toLowerCase()] || 'application/octet-stream';
    }
    if (relative) {
      if (!relative.startsWith('assets/')) throw new Error('项目媒体引用必须位于 assets 目录');
      const file = await containedExisting(target, relative);
      const stat = await fsp.stat(file);
      if (expectedSize !== undefined && (!Number.isSafeInteger(expectedSize) || expectedSize < 0 || expectedSize !== stat.size)) throw new Error(`项目资源大小不符: ${relative}`);
      if (typeof mime !== 'string' || !/^[A-Za-z0-9.+-]+\/[A-Za-z0-9.+-]+$/.test(mime)) throw new Error('项目资源 MIME 无效');
      if (!cache.has(relative)) {
        consumedBytes += stat.size;
        if (consumedBytes > limit) throw new Error('项目和资源超过 max_memory_mb 限制');
        const bytes = await fsp.readFile(file);
        if (checksumEntries.size && !checksumEntries.has(relative)) throw new Error(`项目资源缺少校验项: ${relative}`);
        const dataUrl = `data:${mime};base64,${bytes.toString('base64')}`;
        cache.set(relative, dataUrl); assetFiles.push({ path: file, fileName: relative, mimeType: mime, size: stat.size });
      }
      return options.lazy_assets === true || options.lazyAssets === true ? value : cache.get(relative);
    }
    if (Array.isArray(value)) { const result = []; for (const child of value) result.push(await restore(child, depth + 1)); return result; }
    if (object(value)) { const result = Object.create(null); for (const [key, child] of Object.entries(value)) result[key] = await restore(child, depth + 1); return result; }
    return value;
  }
  const result = await restore(project);
  context.emit?.('project-progress', { percent: 100, message: '项目及引用资源已读取并校验' });
  return { project_json: result, meta, asset_files: assetFiles, failures: [] };
}

function execLocal(executable, argv) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, argv, { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
    let stderr = '', stdout = '';
    let timedOut = false;
    const timeout = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, 30000);
    child.stderr.on('data', part => { stderr = (stderr + part).slice(-4096); });
    child.stdout.on('data', part => { stdout = (stdout + part).slice(-4096); });
    child.once('error', error => { clearTimeout(timeout); reject(error); });
    child.once('close', code => { clearTimeout(timeout); code === 0 ? resolve({ stdout, stderr }) : reject(new Error(timedOut ? '本地图像处理超过 30 秒' : `本地图像处理失败 (${code}): ${stderr}`)); });
  });
}
async function processLargeData(args, context) {
  const operation = String(args.operation || '');
  if (!['process_image', 'process_video', 'process_file', 'compress_data'].includes(operation)) throw new Error(`不支持的操作: ${operation}`);
  if (typeof args.data !== 'string') throw new Error('data 必须是字符串');
  // These three operations are pass-through in the recovered renderer fallback.
  // Keeping their format avoids returning invented compressed/transcoded bytes.
  if (operation !== 'process_image') return args.data;
  const bytes = decodeBase64(args.data, '图片');
  const options = optionsOf(args.options);
  const maxDimension = Number(options.maxDimension ?? 8192), maxSize = Number(options.maxSize ?? 10 * 1024 * 1024);
  if (!Number.isSafeInteger(maxDimension) || maxDimension < 1 || maxDimension > 32768 || !Number.isSafeInteger(maxSize) || maxSize < 1) throw new Error('图片 maxDimension/maxSize 无效');
  let nativeImage = context.nativeImage;
  // DSH supplies portable image decoding explicitly; no Electron fallback.
  if (nativeImage) {
    let image = nativeImage.createFromBuffer(bytes);
    if (image.isEmpty()) throw new Error('图片解码失败');
    const original = image.getSize();
    if (!original.width || !original.height) throw new Error('图片尺寸无效');
    if (!options.forceReencode && Math.max(original.width, original.height) <= maxDimension && bytes.length <= maxSize) return bytes.toString('base64');
    let factor = Math.min(1, maxDimension / Math.max(original.width, original.height));
    for (let pass = 0; pass < 9; pass++, factor *= 0.8) {
      image = nativeImage.createFromBuffer(bytes).resize({ width: Math.max(1, Math.floor(original.width * factor)), height: Math.max(1, Math.floor(original.height * factor)), quality: 'best' });
      for (let quality = 98; quality >= 35; quality -= 7) { const encoded = image.toJPEG(quality); if (encoded.length <= maxSize) return encoded.toString('base64'); }
    }
    throw new Error('无法在指定 maxSize 内编码图片');
  }
  if ((context.platform || process.platform) !== 'darwin') throw new Error('LOCAL_IMAGE_ENGINE_UNAVAILABLE: 当前主机没有原生图片编解码引擎');
  const base = context.tempRoot || os.tmpdir();
  await fsp.mkdir(base, { recursive: true });
  const work = await fsp.mkdtemp(path.join(base, 'aiyouplus-large-image-'));
  try {
    const input = path.join(work, 'source-image'), output = path.join(work, 'encoded.jpg');
    await fsp.writeFile(input, bytes);
    const info = await execLocal('/usr/bin/sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', input]);
    const width = Number(/pixelWidth:\s*(\d+)/.exec(info.stdout)?.[1]), height = Number(/pixelHeight:\s*(\d+)/.exec(info.stdout)?.[1]);
    if (!width || !height) throw new Error('图片解码失败');
    if (!options.forceReencode && Math.max(width, height) <= maxDimension && bytes.length <= maxSize) return bytes.toString('base64');
    for (let pass = 0; pass < 9; pass++) {
      const dimension = Math.max(1, Math.floor(maxDimension * Math.pow(0.8, pass)));
      for (const quality of [98, 75, 50, 35]) {
        await execLocal('/usr/bin/sips', ['-Z', String(dimension), '-s', 'format', 'jpeg', '-s', 'formatOptions', String(quality), input, '--out', output]);
        const result = await fsp.readFile(output);
        if (result.length <= maxSize) return result.toString('base64');
      }
    }
    throw new Error('无法在指定 maxSize 内编码图片');
  } finally { await fsp.rm(work, { recursive: true, force: true }); }
}

async function importChromeBookmarks(args, context) {
  const explicit = args.path ?? args.filePath ?? args.file_path;
  let candidates;
  if (explicit) candidates = [absolute(explicit, '书签路径')];
  else {
    const home = context.homeDir || os.homedir(), platform = context.platform || process.platform;
    const chrome = context.chromeUserDataDir || (platform === 'darwin' ? path.join(home, 'Library/Application Support/Google/Chrome') : platform === 'win32' ? path.join(context.localAppData || process.env.LOCALAPPDATA || path.join(home, 'AppData/Local'), 'Google/Chrome/User Data') : path.join(home, '.config/google-chrome'));
    let profiles;
    try { profiles = await fsp.readdir(chrome, { withFileTypes: true }); }
    catch (error) { if (error.code === 'ENOENT') throw new Error('未找到本机 Chrome 书签，请选择导出的 Bookmarks JSON 文件'); throw error; }
    candidates = profiles.filter(p => p.isDirectory() && /^(Default|Profile \d+)$/.test(p.name)).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })).map(p => path.join(chrome, p.name, 'Bookmarks'));
  }
  const results = [], urls = new Set();
  let parsed = 0, firstError;
  const limit = Number.isSafeInteger(args.limit) ? Math.max(1, Math.min(args.limit, 2000)) : 200;
  for (const file of candidates) try {
    const data = await readJson(file, 32 * 1024 * 1024);
    if (!object(data.roots)) throw new Error('Chrome 书签 JSON 缺少 roots');
    parsed++;
    const stack = Object.values(data.roots).reverse().map(value => ({ value, folder: '' }));
    const seen = new Set();
    while (stack.length && results.length < limit) {
      const { value, folder } = stack.pop();
      if (!object(value) || seen.has(value)) continue;
      seen.add(value);
      if (typeof value.url === 'string') {
        let url;
        try { url = new URL(value.url); } catch { continue; }
        if (!['http:', 'https:', 'file:'].includes(url.protocol) || urls.has(url.href)) continue;
        urls.add(url.href);
        results.push({ id: `chrome-${sha256(url.href).slice(0, 20)}`, title: String(value.name || url.href), url: url.href, ...(folder ? { folder } : {}) });
      }
      if (Array.isArray(value.children)) for (let i = value.children.length - 1; i >= 0; i--) stack.push({ value: value.children[i], folder: [folder, String(value.name || '')].filter(Boolean).join('/') });
    }
  } catch (error) { if (explicit) throw error; firstError ??= error; }
  if (!parsed) throw firstError || new Error('未找到本机 Chrome 书签');
  return results;
}

function createLocalCoreRuntime(initialContext = {}) {
  return { context: { ...initialContext }, production: { enabled: false, scopes: ['read', 'run'], snapshot: null, commands: new Map(), idempotency: new Map(), syncAt: null }, tray: null, disposed: false };
}
function runtimeFor(context) {
  const runtime = context.localCoreRuntime || (() => {
    const key = context.runtimeKey || context.userDataDir || context.commandScope || 'default';
    if (!runtimes.has(key)) runtimes.set(key, createLocalCoreRuntime(context));
    return runtimes.get(key);
  })();
  if (runtime.disposed) throw new Error('本地核心运行时已关闭');
  Object.assign(runtime.context, context);
  return runtime;
}

function apiBase(context) {
  const raw = context.productionApiBaseUrl;
  if (typeof raw !== 'string') throw new Error('PRODUCTION_API_NOT_MOUNTED: 主机未提供实际本地 API 地址');
  const url = new URL(raw);
  if (url.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) || url.pathname.replace(/\/$/, '') !== '/production/v1' || url.username || url.password || url.search || url.hash) throw new Error('生产 API 地址必须指向已挂载的本机 /production/v1');
  return url.href.replace(/\/$/, '');
}
function commandFingerprint(body) {
  const sorted = value => Array.isArray(value) ? value.map(sorted) : object(value) ? Object.fromEntries(Object.keys(value).sort().map(key => [key, sorted(value[key])])) : value;
  return sha256(JSON.stringify(sorted([body.action, body.recipeId, body.runId, body.bindings || {}, body.inputs || [], body.callbackUrl || null])));
}
function localHttpUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' && ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) && !url.username && !url.password && !url.hash;
  } catch { return false; }
}
async function deliverProductionWebhook(args) {
  if (!localHttpUrl(args.url)) throw new Error('生产回调仅支持本机 HTTP 地址');
  if (!object(args.payload)) throw new Error('生产回调内容必须为对象');
  if (typeof args.secret !== 'string' || args.secret.length < 16 || args.secret.length > 512) throw new Error('生产回调签名密钥无效');
  const body = Buffer.from(JSON.stringify(args.payload), 'utf8');
  if (body.length > 1024 * 1024) throw new Error('生产回调内容超过 1 MiB');
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = crypto.createHmac('sha256', args.secret).update(timestamp + '.').update(body).digest('hex');
  return new Promise((resolve, reject) => {
    // No redirects: a local receiver cannot redirect application data elsewhere.
    const req = http.request(args.url, { method: 'POST', headers: {
      'Content-Type': 'application/json; charset=utf-8', 'Content-Length': body.length,
      'X-AIYOUPLUS-Timestamp': timestamp, 'X-AIYOUPLUS-Signature': 'sha256=' + signature
    } }, res => {
      res.resume();
      res.once('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve({ delivered: true, statusCode: res.statusCode, timestamp });
        else reject(new Error('本机生产回调返回 HTTP ' + res.statusCode));
      });
      res.once('error', () => reject(new Error('本机生产回调响应中断')));
    });
    req.setTimeout(5000, () => req.destroy(new Error('本机生产回调超时')));
    req.once('error', error => reject(new Error(error.message === '本机生产回调超时' ? error.message : '无法连接本机生产回调接收方')));
    req.end(body);
  });
}
function validProductionBody(body) {
  if (!object(body) || !ACTIONS.has(body.action)) return false;
  if (body.recipeId !== undefined && (typeof body.recipeId !== 'string' || !body.recipeId.trim() || body.recipeId.length > 160)) return false;
  if (body.runId !== undefined && (typeof body.runId !== 'string' || !body.runId.trim() || body.runId.length > 180)) return false;
  if (body.bindings !== undefined && (!object(body.bindings) || Object.keys(body.bindings).length > 32 || Object.entries(body.bindings).some(([key, value]) => !key.trim() || key.length > 128 || typeof value !== 'string' || !value.trim() || value.length > 128))) return false;
  if (body.inputs !== undefined && (!Array.isArray(body.inputs) || body.inputs.length > 8 || body.inputs.some(input => {
    if (!object(input) || typeof input.slotId !== 'string' || !input.slotId.trim() || input.slotId.length > 128) return true;
    const provided = ['url', 'filePath', 'text'].filter(key => input[key] !== undefined);
    if (provided.length !== 1 || typeof input[provided[0]] !== 'string' || !input[provided[0]].trim()) return true;
    if (input.url !== undefined && (!localHttpUrl(input.url) || input.url.length > 4096)) return true;
    if (input.filePath !== undefined && (!path.isAbsolute(input.filePath) || input.filePath.includes('\0') || input.filePath.length > 2048)) return true;
    if (input.text !== undefined && input.text.length > 100000) return true;
    if (input.kind !== undefined && !['image', 'video', 'audio', 'text', 'character', 'scene'].includes(input.kind)) return true;
    if (input.source !== undefined && !['browser', 'desktop', 'web', 'api'].includes(input.source)) return true;
    return input.name !== undefined && (typeof input.name !== 'string' || input.name.length > 240);
  }))) return false;
  return body.callbackUrl === undefined || (localHttpUrl(body.callbackUrl) && body.callbackUrl.length <= 2048);
}
async function configureProduction(args, runtime) {
  const context = runtime.context;
  const scopes = args.scopes === undefined ? ['read', 'run'] : args.scopes;
  if (!Array.isArray(scopes) || scopes.some(s => !SCOPES.has(s))) throw new Error('生产 API scopes 仅支持 read/run/control');
  if (args.enabled && (context.productionApiMounted !== true || typeof context.emit !== 'function')) throw new Error('PRODUCTION_API_NOT_MOUNTED: 本地路由或前端事件通道尚未挂载');
  const baseUrl = apiBase(context);
  const next = { enabled: args.enabled === true, scopes: [...new Set(scopes)] };
  if (context.userDataDir) await atomicJson(path.join(absolute(context.userDataDir, 'userDataDir'), 'LocalCore/production-api.json'), next);
  Object.assign(runtime.production, next);
  return { ok: true, ...next, baseUrl, mounted: context.productionApiMounted === true };
}
function syncProduction(args, runtime) {
  const snapshot = args.snapshot;
  if (!object(snapshot) || !Array.isArray(snapshot.recipes) || !object(snapshot.queue) || !Array.isArray(snapshot.apiRequests)) throw new Error('生产状态快照缺少 recipes/queue/apiRequests');
  const serialized = JSON.stringify(snapshot);
  if (Buffer.byteLength(serialized) > 8 * 1024 * 1024) throw new Error('生产 API 状态快照超过 8MB');
  runtime.production.snapshot = JSON.parse(serialized);
  runtime.production.syncAt = Date.now();
  for (const request of snapshot.apiRequests) {
    if (!object(request) || typeof request.commandId !== 'string' || typeof request.idempotencyKey !== 'string') continue;
    runtime.production.commands.set(request.commandId, { ...request });
    if (!runtime.production.idempotency.has(request.idempotencyKey)) runtime.production.idempotency.set(request.idempotencyKey, { commandId: request.commandId, action: request.action, recipeId: request.recipeId, runId: request.runId });
  }
  while (runtime.production.commands.size > 500) runtime.production.commands.delete(runtime.production.commands.keys().next().value);
  while (runtime.production.idempotency.size > 500) runtime.production.idempotency.delete(runtime.production.idempotency.keys().next().value);
  return null; // Existing renderer expects a void IPC and reads the snapshot through HTTP.
}

function showMain(context) {
  const window = context.getMainWindow?.();
  if (!window || window.isDestroyed?.()) return false;
  if (window.isMinimized?.()) window.restore();
  window.show(); window.focus();
  return true;
}
function ensureTray(runtime) {
  if (runtime.tray && !runtime.tray.isDestroyed?.()) return true;
  const context = runtime.context;
  if (!context.Tray || !context.Menu || !context.nativeImage || !context.iconPath || typeof context.emit !== 'function') return false;
  const image = context.nativeImage.createFromPath(context.iconPath);
  if (!image || image.isEmpty()) return false;
  try {
    const tray = new context.Tray(image.resize?.({ width: 18, height: 18 }) || image);
    tray.setToolTip?.('AIYOUPLUS');
    tray.on?.('click', () => showMain(runtime.context));
    tray.on?.('double-click', () => showMain(runtime.context));
    runtime.tray = tray;
    syncTray({ snapshot: { items: [] } }, runtime);
    return true;
  } catch { runtime.tray = null; return false; }
}
function syncTray(args, runtime) {
  if (!runtime.tray) { if (!ensureTray(runtime)) return false; }
  const snapshot = args.snapshot;
  if (!object(snapshot) || !Array.isArray(snapshot.items)) throw new Error('系统托盘快照缺少 items');
  const context = runtime.context;
  const template = [{ label: '打开 AIYOUPLUS', click: () => showMain(runtime.context) }];
  for (const item of snapshot.items.slice(0, 30)) {
    if (!object(item) || !['project', 'chat', 'harness'].includes(item.kind) || typeof item.id !== 'string' || !item.id) continue;
    template.push({ label: `${item.busy ? '● ' : ''}${String(item.title || '未命名').slice(0, 120)}`, click: () => { if (showMain(runtime.context)) runtime.context.emit('atelier-tray-open', { kind: item.kind, id: item.id }); } });
  }
  template.push({ type: 'separator' }, { label: '退出 AIYOUPLUS', click: () => runtime.context.emit('atelier-tray-quit', null) });
  runtime.tray.setContextMenu(context.Menu.buildFromTemplate(template));
  return true;
}
function disposeLocalCoreRuntime(runtime) {
  runtime.tray?.destroy?.(); runtime.tray = null; runtime.disposed = true;
  for (const [key, value] of runtimes) if (value === runtime) runtimes.delete(key);
}

async function tryHandleLocalCoreCommand(cmd, rawArgs, context = {}) {
  const args = unwrap(rawArgs);
  switch (cmd) {
    case 'process_large_data_rust': return { handled: true, value: await processLargeData(args, context) };
    case 'export_project': return { handled: true, value: await exportProject(args, context) };
    case 'import_project': return { handled: true, value: await importProject(args, context) };
    case 'workspace_browser_import_chrome_bookmarks': return { handled: true, value: await importChromeBookmarks(args, context) };
    case 'production_api_gateway_configure': return { handled: true, value: await configureProduction(args, runtimeFor(context)) };
    case 'production_api_gateway_sync_state': return { handled: true, value: syncProduction(args, runtimeFor(context)) };
    case 'production_webhook_deliver': return { handled: true, value: await deliverProductionWebhook(args) };
    case 'system_tray_available': return { handled: true, value: ensureTray(runtimeFor(context)) };
    case 'sync_system_tray': return { handled: true, value: syncTray(args, runtimeFor(context)) };
    case 'hide_to_system_tray': {
      const runtime = runtimeFor(context), window = runtime.context.getMainWindow?.();
      if (!ensureTray(runtime) || !window || window.isDestroyed?.()) return { handled: true, value: false };
      window.hide(); return { handled: true, value: true };
    }
    default: return { handled: false };
  }
}

async function handleLocalCoreHttpRequest(req, res, context = {}) {
  const pathname = new URL(req.url || '/', 'http://127.0.0.1').pathname;
  if (pathname !== '/production/v1' && !pathname.startsWith('/production/v1/')) return false;
  const runtime = runtimeFor(context), production = runtime.production;
  const reply = (code, body) => {
    res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Authorization,Content-Type,Idempotency-Key' });
    res.end(JSON.stringify(body));
    return true;
  };
  const failure = (code, error) => reply(code, { ok: false, error });
  if (req.method === 'OPTIONS') return reply(204, null);
  if (!production.enabled) return failure(503, 'production_api_disabled');
  if (typeof runtime.context.verifyBearer !== 'function') return failure(503, 'production_api_auth_unavailable');
  if (!(await runtime.context.verifyBearer(req.headers.authorization))) return failure(401, 'missing_or_invalid_bearer');
  const route = pathname.slice('/production/v1'.length) || '/';
  if (req.method === 'GET' && route === '/health') return reply(200, { ok: true, enabled: true, scopes: production.scopes, baseUrl: apiBase(runtime.context), stateSynced: production.snapshot !== null, updatedAt: production.syncAt });
  const requireScope = scope => production.scopes.includes(scope);
  if (req.method === 'GET') {
    if (!requireScope('read')) return failure(403, 'read_scope_required');
    if (!production.snapshot) return failure(503, 'production_state_not_synced');
    if (route === '/' || route === '/state') return reply(200, production.snapshot);
    if (route === '/recipes') return reply(200, { ok: true, recipes: production.snapshot.recipes });
    if (route === '/queue') return reply(200, { ok: true, queue: production.snapshot.queue });
    if (route === '/runs/current') return reply(200, { ok: true, run: production.snapshot.activeRun ?? null });
    if (route.startsWith('/requests/')) {
      let id;
      try { id = decodeURIComponent(route.slice('/requests/'.length)); }
      catch { return failure(400, 'invalid_request_id'); }
      const synced = production.snapshot.apiRequests.find(item => item.commandId === id);
      const pending = production.commands.get(id);
      return synced || pending ? reply(200, { ok: true, request: synced || pending }) : failure(404, 'request_not_found');
    }
    return failure(404, 'production_route_not_found');
  }
  if (req.method !== 'POST' || route !== '/commands') return failure(404, 'production_route_not_found');
  let body;
  try {
    const chunks = []; let bytes = 0;
    for await (const chunk of req) { bytes += chunk.length; if (bytes > 1024 * 1024) return failure(413, 'production_command_too_large'); chunks.push(chunk); }
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return failure(400, 'invalid_json'); }
  if (!object(body) || !ACTIONS.has(body.action)) return failure(400, 'unsupported_production_action');
  if (!validProductionBody(body)) return failure(400, 'invalid_local_production_command');
  if (!requireScope(body.action === 'start_recipe' ? 'run' : 'control')) return failure(403, 'production_scope_required');
  const key = String(body.idempotencyKey || req.headers['idempotency-key'] || '').trim();
  if (!key || key.length > 160 || /[\r\n\0]/.test(key)) return failure(400, 'idempotencyKey_required');
  if (typeof runtime.context.emit !== 'function' || runtime.context.productionApiMounted !== true) return failure(503, 'production_frontend_unavailable');
  if (!production.snapshot) return failure(503, 'production_state_not_synced');
  const previous = production.idempotency.get(key);
  if (previous) {
    if (previous.fingerprint ? previous.fingerprint !== commandFingerprint(body) : previous.action !== body.action || previous.recipeId !== body.recipeId || previous.runId !== body.runId) return failure(409, 'idempotency_conflict');
    return reply(200, { ok: true, duplicate: true, commandId: previous.commandId, status: production.commands.get(previous.commandId)?.status || 'accepted' });
  }
  if (body.action === 'start_recipe' && (typeof body.recipeId !== 'string' || !production.snapshot.recipes.some(recipe => recipe.id === body.recipeId))) return failure(404, 'recipe_not_found');
  if (body.action !== 'start_recipe' && (typeof body.runId !== 'string' || production.snapshot.activeRun?.id !== body.runId)) return failure(404, 'active_run_not_found');
  const command = { commandId: crypto.randomUUID(), idempotencyKey: key, action: body.action, ...(body.recipeId ? { recipeId: body.recipeId } : {}), ...(body.runId ? { runId: body.runId } : {}), ...(body.bindings ? { bindings: body.bindings } : {}), ...(body.inputs ? { inputs: body.inputs } : {}), ...(body.callbackUrl ? { callbackUrl: body.callbackUrl } : {}), receivedAt: Date.now() };
  try { if (runtime.context.emit('production-api-command', command) === false) return failure(503, 'production_event_delivery_failed'); }
  catch { return failure(503, 'production_event_delivery_failed'); }
  production.commands.set(command.commandId, { ...command, status: 'accepted' });
  production.idempotency.set(key, { commandId: command.commandId, fingerprint: commandFingerprint(body) });
  while (production.commands.size > 500) production.commands.delete(production.commands.keys().next().value);
  while (production.idempotency.size > 500) production.idempotency.delete(production.idempotency.keys().next().value);
  return reply(202, { ok: true, commandId: command.commandId, status: 'accepted', executionConfirmed: false });
}

module.exports = { tryHandleLocalCoreCommand, handleLocalCoreHttpRequest, createLocalCoreRuntime, disposeLocalCoreRuntime };
