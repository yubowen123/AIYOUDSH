'use strict';

// Local-only implementations for IPC contracts retained in the recovered renderer.
// This module never starts work on import. The renderer's existing permission and
// approval flow must complete before the host dispatches an explicit invocation.
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { StringDecoder } = require('node:string_decoder');
const { fileURLToPath, pathToFileURL } = require('node:url');

const commandRuns = new Map();
const earlyCancellations = new Map();
const OUTPUT_LIMIT = 2 * 1024 * 1024;

function argsOf(args) {
  return args && typeof args.args === 'object' && args.args !== null ? args.args : (args || {});
}
function commandKey(requestId, context) {
  return `${String(context.commandScope ?? 'main')}\0${requestId}`;
}
function requestIdOf(args) {
  const value = String(args.requestId || '').trim();
  if (!value || value.length > 200 || /[\r\n\0]/.test(value)) throw new Error('本地命令缺少有效 requestId');
  return value;
}
function killTree(child, signal = 'SIGTERM') {
  if (!child?.pid) return;
  try {
    if (process.platform !== 'win32') process.kill(-child.pid, signal);
    else if (signal === 'SIGTERM') spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' }).unref();
    else child.kill(signal);
  } catch { try { child.kill(signal); } catch { /* already exited */ } }
}

async function runLocalSkillCommand(args, context) {
  const requestId = requestIdOf(args);
  const command = String(args.command || '').trim();
  if (!command || command.includes('\0')) throw new Error('本地命令缺少 command');
  const cwd = path.resolve(String(args.cwd || context.defaultCwd || process.cwd()));
  if (!(await fsp.stat(cwd)).isDirectory()) throw new Error('本地命令工作目录不是文件夹');
  const key = commandKey(requestId, context);
  if (commandRuns.has(key)) throw new Error('该 requestId 的本地命令仍在运行');
  const earlyCancelledAt = earlyCancellations.get(key);
  earlyCancellations.delete(key);
  if (earlyCancelledAt && Date.now() - earlyCancelledAt < 10000) {
    return { ok: false, code: null, stdout: '', stderr: '', durationMs: 0, timedOut: false, cancelled: true };
  }
  const timeoutMs = Math.max(1, Math.min(600000, Number(args.timeoutMs) || 120000));
  const startedAt = Date.now();
  const state = { child: null, cancelled: false, timedOut: false };
  commandRuns.set(key, state);
  let timer, killTimer;
  try {
    return await new Promise((resolve, reject) => {
      const windows = process.platform === 'win32';
      const executable = context.commandShell || (windows ? 'powershell.exe' : process.platform === 'darwin' ? '/bin/zsh' : '/bin/sh');
      const shellArgs = windows
        ? ['-NoLogo', '-NoProfile', '-NonInteractive', '-Command', command]
        : ['-lc', command];
      const child = spawn(executable, shellArgs, {
        cwd, env: context.commandEnv || process.env,
        detached: !windows, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
      });
      state.child = child;
      const texts = { stdout: '', stderr: '' };
      const truncated = { stdout: false, stderr: false };
      const decoders = { stdout: new StringDecoder('utf8'), stderr: new StringDecoder('utf8') };
      const append = (stream, value) => {
        texts[stream] += value;
        if (texts[stream].length > OUTPUT_LIMIT) {
          texts[stream] = texts[stream].slice(-OUTPUT_LIMIT);
          truncated[stream] = true;
        }
        if (args.streamOutput && typeof context.emit === 'function') {
          try { context.emit(`local-skill-command-${requestId}`, { stream, text: texts[stream] }); } catch { /* UI detached */ }
        }
      };
      for (const stream of ['stdout', 'stderr']) child[stream].on('data', chunk => append(stream, decoders[stream].write(chunk)));
      child.once('error', reject);
      child.once('close', (code, signal) => {
        for (const stream of ['stdout', 'stderr']) append(stream, decoders[stream].end());
        resolve({
          ok: code === 0 && !state.cancelled && !state.timedOut,
          code, stdout: texts.stdout, stderr: texts.stderr,
          durationMs: Date.now() - startedAt, timedOut: state.timedOut,
          cancelled: state.cancelled, signal, outputTruncated: truncated,
        });
      });
      state.stop = () => {
        killTree(child);
        killTimer ??= setTimeout(() => killTree(child, 'SIGKILL'), 500);
        killTimer.unref?.();
      };
      timer = setTimeout(() => { state.timedOut = true; state.stop(); }, timeoutMs);
      timer.unref?.();
      if (state.cancelled) state.stop();
    });
  } finally {
    clearTimeout(timer); clearTimeout(killTimer);
    commandRuns.delete(key);
  }
}

function cancelLocalSkillCommand(args, context) {
  const requestId = requestIdOf(args);
  const key = commandKey(requestId, context);
  const state = commandRuns.get(key);
  if (!state) {
    if (earlyCancellations.size >= 1000) earlyCancellations.delete(earlyCancellations.keys().next().value);
    earlyCancellations.set(key, Date.now());
    return { cancelled: false };
  }
  state.cancelled = true;
  state.stop?.();
  return { cancelled: true };
}

function findExecutable(name, explicit) {
  const candidates = explicit ? [explicit] : [
    ...require('./aiyouplus-media-tools.cjs').bundledMediaCandidates(name),
    ...String(process.env.PATH || '').split(path.delimiter).filter(Boolean).map(dir => path.join(dir, name)),
    path.join('/opt/homebrew/bin', name), path.join('/usr/local/bin', name),
    ...(name === 'soffice' ? ['/Applications/LibreOffice.app/Contents/MacOS/soffice'] : []),
  ];
  for (const file of candidates) {
    try { fs.accessSync(file, fs.constants.X_OK); if (fs.statSync(file).isFile()) return file; } catch { /* next */ }
  }
  return null;
}
function runExecutable(executable, argv, timeoutMs = 600000) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, argv, { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, detached: process.platform !== 'win32' });
    let stdout = '', stderr = '', timer, killTimer, timedOut = false;
    child.stdout.on('data', b => { stdout = (stdout + b.toString()).slice(-OUTPUT_LIMIT); });
    child.stderr.on('data', b => { stderr = (stderr + b.toString()).slice(-OUTPUT_LIMIT); });
    child.once('error', error => { clearTimeout(timer); clearTimeout(killTimer); reject(error); });
    child.once('close', code => {
      clearTimeout(timer); clearTimeout(killTimer);
      if (code !== 0 || timedOut) reject(new Error(`${path.basename(executable)} ${timedOut ? '执行超时' : '执行失败'}: ${stderr.slice(-6000)}`));
      else resolve({ stdout, stderr });
    });
    timer = setTimeout(() => {
      timedOut = true; killTree(child);
      killTimer = setTimeout(() => killTree(child, 'SIGKILL'), 500);
      killTimer.unref?.();
    }, timeoutMs);
    timer.unref?.();
  });
}
function localInput(value) {
  let source = String(value || '').trim();
  if (/^file:/i.test(source)) source = fileURLToPath(source);
  else if (/^asset:\/\/localhost\//i.test(source)) source = decodeURIComponent(new URL(source).pathname);
  if (!source || !path.isAbsolute(source)) throw new Error('时间线源视频必须先缓存到本地，再导出合并视频');
  return source;
}
async function probeTimelineMedia(file, ffprobe, format) {
  const result = await runExecutable(ffprobe, ['-v', 'error', '-protocol_whitelist', 'file,pipe', '-show_streams', '-show_format', '-of', 'json', file], 30000);
  const data = JSON.parse(result.stdout);
  const hasVideo = data.streams?.some(stream => stream.codec_type === 'video');
  const hasAudio = data.streams?.some(stream => stream.codec_type === 'audio');
  if (!hasVideo && !hasAudio) throw new Error('时间线源文件没有可导出的音视频轨道');
  return { hasVideo, hasAudio, duration: Number(data.format?.duration) };
}
async function cleanupTimelineTemp(directory, context) {
  if (!directory) return false;
  const base = path.resolve(context.exportTempRoot || os.tmpdir());
  const target = path.resolve(String(directory));
  if (path.dirname(target) !== base || !/^qdm_export_assets_\d+$/.test(path.basename(target))) {
    throw new Error('拒绝清理非时间线导出临时目录');
  }
  let real;
  try { real = await fsp.realpath(target); } catch (error) { if (error.code === 'ENOENT') return false; throw error; }
  const realBase = await fsp.realpath(base);
  if (path.dirname(real) !== realBase || real !== path.join(realBase, path.basename(target))) throw new Error('拒绝清理指向其他位置的临时目录');
  await fsp.rm(real, { recursive: true, force: true });
  return true;
}
async function exportVideoTimeline(args, context) {
  const clips = args.clips;
  if (!Array.isArray(clips) || !clips.length) throw new Error('时间线中没有可导出的片段');
  if (clips.length > 1000) throw new Error('时间线片段超过 1000 个');
  const format = args.format == null ? 'mp4' : String(args.format).toLowerCase();
  if (!['mp4', 'wav'].includes(format)) throw new Error('时间线导出格式只支持 MP4 或 WAV');
  const output = localInput(args.outputPath);
  if (path.extname(output).toLowerCase() !== `.${format}`) throw new Error(`时间线输出文件必须是 .${format}`);
  const dimension = (value, fallback) => {
    const number = Number(value || fallback);
    if (!Number.isFinite(number) || number < 2 || number > 8192) throw new Error('时间线输出尺寸无效');
    return Math.max(2, Math.round(number / 2) * 2);
  };
  const width = format === 'mp4' ? dimension(args.targetWidth, 1280) : 0;
  const height = format === 'mp4' ? dimension(args.targetHeight, 720) : 0;
  const sampleRate = Number(args.audioSampleRate ?? 48000), channels = Number(args.audioChannels ?? 2);
  if (!Number.isInteger(sampleRate) || sampleRate < 8000 || sampleRate > 192000 || ![1, 2].includes(channels)) throw new Error('时间线音频采样率或声道数无效');
  const ffmpeg = findExecutable(process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg', context.ffmpegPath);
  const ffprobe = findExecutable(process.platform === 'win32' ? 'ffprobe.exe' : 'ffprobe', context.ffprobePath || (ffmpeg && path.join(path.dirname(ffmpeg), process.platform === 'win32' ? 'ffprobe.exe' : 'ffprobe')));
  if (!ffmpeg || !ffprobe) throw new Error('合并导出需要本机 FFmpeg 和 FFprobe，请先安装后重试');
  const normalized = [];
  const probes = new Map();
  for (const clip of clips) {
    const input = localInput(clip.input);
    if (input === output) throw new Error('输出文件不能覆盖时间线源视频');
    if (!(await fsp.stat(input)).isFile()) throw new Error('时间线源视频不是文件');
    const start = Number(clip.sourceStart), end = Number(clip.sourceEnd);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) throw new Error('时间线片段裁剪范围无效');
    if (!probes.has(input)) probes.set(input, await probeTimelineMedia(input, ffprobe, format));
    const probe = probes.get(input);
    if (Number.isFinite(probe.duration) && (start >= probe.duration || end > probe.duration + 0.1)) throw new Error('时间线片段裁剪范围超出源视频时长');
    normalized.push({ input, start, duration: end - start, hasVideo: probe.hasVideo, hasAudio: probe.hasAudio });
  }
  await fsp.mkdir(path.dirname(output), { recursive: true });
  const tempRoot = context.tempRoot || os.tmpdir();
  await fsp.mkdir(tempRoot, { recursive: true });
  const work = await fsp.mkdtemp(path.join(tempRoot, 'aiyouplus-timeline-'));
  const stagedOutput = path.join(path.dirname(output), `.aiyouplus-timeline-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}.${format}`);
  try {
    const files = [];
    for (let index = 0; index < normalized.length; index++) {
      const clip = normalized[index];
      const segment = path.join(work, `clip-${String(index).padStart(5, '0')}.${format}`);
      const argv = ['-hide_banner', '-loglevel', 'error', '-nostdin', '-y', '-protocol_whitelist', 'file,pipe', '-ss', String(clip.start), '-i', clip.input];
      if (!clip.hasAudio) argv.push('-f', 'lavfi', '-i', `anullsrc=r=${format === 'wav' ? sampleRate : 48000}:cl=${channels === 1 ? 'mono' : 'stereo'}`);
      if (format === 'mp4' && !clip.hasVideo) argv.push('-f', 'lavfi', '-i', `color=c=black:s=${width}x${height}:r=30`);
      if (format === 'wav') argv.push('-vn', '-map', clip.hasAudio ? '0:a:0' : '1:a:0', '-t', String(clip.duration),
        '-af', `aresample=${sampleRate},apad`, '-c:a', 'pcm_s16le', '-ar', String(sampleRate), '-ac', String(channels), segment);
      else argv.push('-map', clip.hasVideo ? '0:v:0' : '1:v:0', '-map', clip.hasAudio ? '0:a:0' : '1:a:0', '-t', String(clip.duration),
        '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,fps=30`,
        '-af', 'aresample=48000,apad', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', segment);
      await runExecutable(ffmpeg, argv);
      files.push(segment);
      context.emit?.('video-timeline-export-progress', { percent: Math.round((index + 1) / normalized.length * 90), message: `已处理 ${index + 1}/${normalized.length} 个片段` });
    }
    const manifest = path.join(work, 'concat.txt');
    await fsp.writeFile(manifest, files.map(file => `file '${file.replace(/'/g, "'\\''")}'`).join('\n') + '\n');
    await runExecutable(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-nostdin', '-y', '-f', 'concat', '-safe', '0', '-i', manifest, '-c', 'copy', ...(format === 'mp4' ? ['-movflags', '+faststart'] : []), stagedOutput]);
    const stat = await fsp.stat(stagedOutput);
    if (stat.size < 32) throw new Error('时间线导出未生成有效媒体');
    await fsp.rename(stagedOutput, output);
    if (args.temporaryInputDirectory) await cleanupTimelineTemp(args.temporaryInputDirectory, context);
    return { outputPath: output, path: output, fileName: path.basename(output), clipCount: clips.length, width, height, duration: normalized.reduce((sum, clip) => sum + clip.duration, 0), size: stat.size,
      format, mediaType: format === 'wav' ? 'audio' : 'video', mimeType: format === 'wav' ? 'audio/wav' : 'video/mp4',
      ...(format === 'wav' ? { codec: 'pcm_s16le', sampleRate, channels } : {}) };
  } finally {
    await fsp.rm(work, { recursive: true, force: true });
    await fsp.rm(stagedOutput, { force: true });
  }
}

async function convertDocumentPreview(args, context) {
  const extension = String(args.extension || '').toLowerCase().replace(/^\./, '');
  if (!['docx', 'docm', 'dotx', 'dotm', 'odt', 'rtf'].includes(extension)) throw new Error('文档预览格式不受支持');
  const data = String(args.data || '');
  if (!data || !/^[A-Za-z0-9+/=\r\n]+$/.test(data)) throw new Error('文档预览缺少有效 base64 原文件');
  const bytes = Buffer.from(data, 'base64');
  if (bytes.length > 20 * 1024 * 1024) throw new Error('文档预览原文件超过 20MB');
  const engine = findExecutable('soffice', context.documentEnginePath);
  if (!engine) throw new Error('DOCUMENT_ENGINE_UNAVAILABLE: 本机未找到 LibreOffice 文档排版引擎');
  const root = context.tempRoot || os.tmpdir();
  await fsp.mkdir(root, { recursive: true });
  const work = await fsp.mkdtemp(path.join(root, 'aiyouplus-document-'));
  try {
    const input = path.join(work, `source.${extension}`);
    await fsp.writeFile(input, bytes);
    await runExecutable(engine, [`-env:UserInstallation=${pathToFileURL(path.join(work, 'profile')).href}`, '--headless', '--convert-to', 'pdf', '--outdir', work, input], 120000);
    const result = await fsp.readFile(path.join(work, 'source.pdf'));
    if (!result.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error('文档排版没有生成有效 PDF');
    return result.toString('base64');
  } finally { await fsp.rm(work, { recursive: true, force: true }); }
}

async function tryHandleCompatibilityCommand(cmd, rawArgs, context = {}) {
  const args = argsOf(rawArgs);
  switch (cmd) {
    case 'run_local_skill_command': return { handled: true, value: await runLocalSkillCommand(args, context) };
    case 'cancel_local_skill_command': return { handled: true, value: cancelLocalSkillCommand(args, context) };
    case 'export_video_timeline': return { handled: true, value: await exportVideoTimeline(args, context) };
    case 'cleanup_video_timeline_export_temp_dir': return { handled: true, value: await cleanupTimelineTemp(args.directory, context) };
    case 'convert_document_preview': return { handled: true, value: await convertDocumentPreview(args, context) };
    default: return { handled: false };
  }
}

module.exports = { tryHandleCompatibilityCommand };
