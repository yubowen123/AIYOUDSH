'use strict';
// Offline media processing. No shell commands, remote inputs or implicit output paths.
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
const { randomUUID } = require('node:crypto');
const { resizeBgra } = require('./local-image-math.cjs');
const { bundledMediaCandidates } = require('./aiyouplus-media-tools.cjs');
const MAX_PIXELS = 32 * 1024 * 1024;
const INPUT_EXTENSIONS = new Set('.mp4 .mov .mkv .webm .avi .m4v .mp3 .wav .m4a .aac .flac .ogg .opus .aiff .aif .png .jpg .jpeg .webp .bmp .tiff .tif .gif'.split(' '));
const IMAGE_EXTENSIONS = new Set('.png .jpg .jpeg .webp .bmp .tiff .tif .gif'.split(' '));
const COMMANDS = new Set(['probe', 'video_analyze', 'thumbnail', 'video_convert', 'video_trim', 'audio_extract', 'audio_trim', 'audio_merge', 'image_transform', 'image_montage'].map(name => `aiyouplus_media_${name}`));

function abortError() { const e = new Error('本地媒体处理已取消'); e.name = 'AbortError'; e.code = 'ABORT_ERR'; return e; }
function checkAbort(context) { if (context.signal?.aborted) throw abortError(); }
function number(value, fallback, min, max, name, integer = false) {
  const n = value === undefined ? fallback : Number(value);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) throw new Error(`${name}无效（${min}–${max}${integer ? ' 整数' : ''}）`);
  return n;
}
function localPath(value, name) {
  if (typeof value !== 'string' || !value || value.includes('\0') || /^[a-z][a-z\d+.-]*:\/\//i.test(value) || /^file:/i.test(value) || !path.isAbsolute(value)) throw new Error(`${name}必须是绝对本地文件路径，不支持 URL`);
  return path.resolve(value);
}
async function inputFile(value) {
  const file = localPath(value, '输入');
  if (!INPUT_EXTENSIONS.has(path.extname(file).toLowerCase())) throw new Error('不支持该输入格式；不接受播放列表或网络引用文件');
  const real = await fsp.realpath(file);
  if (!(await fsp.stat(real)).isFile()) throw new Error('输入路径不是文件');
  return real;
}
async function outputFile(value, inputs, extensions) {
  const file = localPath(value, '输出');
  if (!extensions.includes(path.extname(file).toLowerCase())) throw new Error(`输出扩展名必须为 ${extensions.join(' / ')}`);
  if (inputs.includes(file)) throw new Error('输出文件不能覆盖原始素材');
  try { await fsp.lstat(file); throw new Error('输出文件已存在，拒绝覆盖原始素材或既有结果'); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  await fsp.mkdir(path.dirname(file), { recursive: true });
  const realParent = await fsp.realpath(path.dirname(file));
  const realOutput = path.join(realParent, path.basename(file));
  if (inputs.includes(realOutput)) throw new Error('输出文件不能覆盖原始素材');
  return realOutput;
}
function tool(name, explicit) {
  const executable = process.platform === 'win32' ? `${name}.exe` : name;
  const candidates = explicit ? [localPath(explicit, `${name} 可执行文件`)] : [...bundledMediaCandidates(name), ...String(process.env.PATH || '').split(path.delimiter).filter(Boolean).map(p => path.join(p, executable)), path.join('/opt/homebrew/bin', executable), path.join('/usr/local/bin', executable)];
  for (const p of candidates) { try { fs.accessSync(p, fs.constants.X_OK); if (fs.statSync(p).isFile()) return p; } catch { /* next local candidate */ } }
  throw new Error(`找不到本地 ${name}，请设置有效的 ${name}Path`);
}
function run(executable, argv, context, options = {}) {
  checkAbort(context);
  const timeout = number(context.mediaTimeoutMs, 180000, 1, 3600000, '处理超时', true);
  return new Promise((resolve, reject) => {
    const child = spawn(executable, argv, { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true, detached: process.platform !== 'win32' });
    const stdout = [], stderr = []; let outBytes = 0, errBytes = 0, failure, timer, killTimer, finished = false;
    const kill = signal => { try { if (process.platform !== 'win32' && child.pid) process.kill(-child.pid, signal); else child.kill(signal); } catch { /* child already gone */ } };
    const stop = error => { if (failure || finished) return; failure = error; kill('SIGTERM'); killTimer = setTimeout(() => kill('SIGKILL'), 500); killTimer.unref?.(); };
    const onAbort = () => stop(abortError());
    const processEvent = phase => { try { context.onMediaProcess?.({ phase, pid: child.pid, tool: path.basename(executable) }); } catch { /* observer must not affect processing */ } };
    const cleanup = () => { finished = true; clearTimeout(timer); clearTimeout(killTimer); context.signal?.removeEventListener('abort', onAbort); };
    child.stdout.on('data', chunk => { outBytes += chunk.length; if (outBytes > (options.maxOutputBytes || 4 * 1024 * 1024)) stop(new Error('媒体工具输出超过内存上限')); else stdout.push(chunk); });
    child.stderr.on('data', chunk => { errBytes += chunk.length; if (errBytes > 8 * 1024 * 1024) stop(new Error('媒体工具日志超过上限')); else stderr.push(chunk); });
    child.stdin.on('error', () => { /* EPIPE is reported with the process exit status below. */ });
    child.once('error', error => { cleanup(); reject(error); });
    child.once('close', (code, signal) => { cleanup(); processEvent('close'); const details = Buffer.concat(stderr).toString(); if (failure) reject(failure); else if (code !== 0) reject(new Error(`${path.basename(executable)} 执行失败（${code ?? signal}）: ${details.slice(-3000)}`)); else resolve({ stdout: Buffer.concat(stdout), stderr: details }); });
    context.signal?.addEventListener('abort', onAbort, { once: true });
    if (context.signal?.aborted) onAbort();
    processEvent('start');
    timer = setTimeout(() => stop(new Error(`本地媒体处理超时（${timeout}ms），子进程已终止`)), timeout); timer.unref?.();
    child.stdin.end(options.stdin);
  });
}
const baseArgs = () => ['-hide_banner', '-loglevel', 'error', '-nostdin', '-protocol_whitelist', 'file,pipe'];
function ratio(value) { const [a, b = 1] = String(value || '').split('/').map(Number); return Number.isFinite(a / b) ? a / b : 0; }
async function probe(file, context) {
  const ffprobe = tool('ffprobe', context.ffprobePath);
  const result = await run(ffprobe, ['-v', 'error', '-protocol_whitelist', 'file,pipe', '-show_streams', '-show_format', '-of', 'json', file], context);
  let data; try { data = JSON.parse(result.stdout.toString()); } catch { throw new Error('FFprobe 返回了无法解析的媒体信息'); }
  const streams = Array.isArray(data.streams) ? data.streams : [];
  const video = streams.find(s => s.codec_type === 'video' && !s.disposition?.attached_pic), audio = streams.find(s => s.codec_type === 'audio');
  if (!video && !audio) throw new Error('文件没有可处理的音视频/图片轨道');
  const duration = Number(video?.duration || data.format?.duration || audio?.duration || 0);
  const rotation = Number(video?.side_data_list?.find(x => x.rotation !== undefined)?.rotation || video?.tags?.rotate || 0);
  const width = Number(video?.width || 0), height = Number(video?.height || 0);
  return { path: file, fileName: path.basename(file), size: (await fsp.stat(file)).size, kind: IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()) ? 'image' : video ? 'video' : 'audio', format: data.format?.format_name || '', formatDuration: Number(data.format?.duration) || 0, duration: Number.isFinite(duration) ? duration : 0, width, height, displayWidth: Math.abs(rotation % 180) === 90 ? height : width, displayHeight: Math.abs(rotation % 180) === 90 ? width : height, rotation, fps: ratio(video?.avg_frame_rate) || ratio(video?.r_frame_rate), hasVideo: Boolean(video), hasAudio: Boolean(audio), streams: streams.map(s => ({ index: s.index, type: s.codec_type, codec: s.codec_name, width: s.width, height: s.height, sampleRate: s.sample_rate ? Number(s.sample_rate) : undefined, channels: s.channels, duration: Number(s.duration) || undefined })) };
}
function needVideo(meta) { if (!meta.hasVideo || meta.kind === 'image' || !(meta.duration > 0)) throw new Error('输入必须是具有有效时长的视频文件'); }
function needAudio(meta) { if (!meta.hasAudio || !(meta.duration > 0)) throw new Error('输入文件没有可用音轨'); }
function trimRange(args, meta) {
  const start = number(args.startSeconds, 0, 0, Number.MAX_SAFE_INTEGER, '起始秒数');
  const duration = number(args.durationSeconds, meta.duration - start, 0.001, Number.MAX_SAFE_INTEGER, '裁剪时长');
  if (start >= meta.duration || start + duration > meta.duration + 0.05) throw new Error('裁剪范围超出源素材时长');
  return { start, duration: Math.min(duration, meta.duration - start) };
}
function dimensions(w, h) { if (!Number.isInteger(w) || !Number.isInteger(h) || w < 1 || h < 1 || w > 8192 || h > 8192 || w * h > MAX_PIXELS) throw new Error('图片尺寸需为正整数，单边不超过 8192 且总像素不超过 32MP'); }
async function publish(output, producer, context, validator) {
  const staged = path.join(path.dirname(output), `.aiyouplus-media-${randomUUID()}${path.extname(output)}`);
  try { await producer(staged); const metadata = validator ? await validator(staged) : undefined; checkAbort(context); const stat = await fsp.stat(staged); if (stat.size < 16) throw new Error('媒体工具未生成有效文件'); await fsp.link(staged, output); return { path: output, outputPath: output, fileName: path.basename(output), size: stat.size, ...(metadata ? { metadata: { ...metadata, path: output, fileName: path.basename(output) } } : {}) }; }
  finally { await fsp.rm(staged, { force: true }); }
}
async function videoConvert(args, context) {
  checkAbort(context); const input = await inputFile(args.inputPath), metadata = await probe(input, context); needVideo(metadata);
  const range = trimRange(args, metadata), output = await outputFile(args.outputPath, [input], ['.mp4']); const ffmpeg = tool('ffmpeg', context.ffmpegPath);
  const width = args.width === undefined ? undefined : number(args.width, undefined, 2, 8192, '视频宽度', true), height = args.height === undefined ? undefined : number(args.height, undefined, 2, 8192, '视频高度', true);
  if ((width && width % 2) || (height && height % 2)) throw new Error('H.264 输出宽高必须是偶数');
  const filters = [width && height ? `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=black` : width ? `scale=${width}:-2` : height ? `scale=-2:${height}` : 'scale=trunc(iw/2)*2:trunc(ih/2)*2', 'setsar=1'];
  if (args.fps !== undefined) filters.push(`fps=${number(args.fps, undefined, 1, 120, '帧率')}`);
  const argv = [...baseArgs(), '-ss', String(range.start), '-i', input, '-t', String(range.duration), '-map', '0:v:0'];
  if (args.includeAudio !== false && metadata.hasAudio) argv.push('-map', '0:a:0', '-c:a', 'aac', '-b:a', '192k'); else argv.push('-an');
  argv.push('-vf', filters.join(','), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(number(args.crf, 20, 0, 51, 'CRF', true)), '-pix_fmt', 'yuv420p', '-movflags', '+faststart');
  return publish(output, target => run(ffmpeg, [...argv, target], context), context, target => probe(target, context));
}
function audioCodec(output) {
  switch (path.extname(output).toLowerCase()) { case '.wav': return ['-c:a', 'pcm_s16le']; case '.mp3': return ['-c:a', 'libmp3lame', '-b:a', '192k']; case '.m4a': return ['-c:a', 'aac', '-b:a', '192k']; case '.flac': return ['-c:a', 'flac']; default: throw new Error('音频输出格式无效'); }
}
function audioSettings(args) { return { sampleRate: number(args.sampleRate, 48000, 8000, 192000, '采样率', true), channels: number(args.channels, 2, 1, 2, '声道数', true) }; }
async function audioExtract(args, context) {
  checkAbort(context); const input = await inputFile(args.inputPath), metadata = await probe(input, context); needAudio(metadata);
  const { start, duration } = trimRange(args, metadata), output = await outputFile(args.outputPath, [input], ['.wav', '.mp3', '.m4a', '.flac']); const { sampleRate, channels } = audioSettings(args), ffmpeg = tool('ffmpeg', context.ffmpegPath);
  const result = await publish(output, target => run(ffmpeg, [...baseArgs(), '-ss', String(start), '-i', input, '-t', String(duration), '-map', '0:a:0', '-vn', ...audioCodec(output), '-ar', String(sampleRate), '-ac', String(channels), target], context), context, target => probe(target, context));
  return result;
}
async function audioMerge(args, context) {
  checkAbort(context); if (!Array.isArray(args.inputPaths) || args.inputPaths.length < 2 || args.inputPaths.length > 128) throw new Error('音频合并需要 2–128 个本地输入文件');
  const inputs = []; for (const file of args.inputPaths) { const input = await inputFile(file), meta = await probe(input, context); needAudio(meta); inputs.push(input); }
  const output = await outputFile(args.outputPath, inputs, ['.wav', '.mp3', '.m4a', '.flac']), { sampleRate, channels } = audioSettings(args), ffmpeg = tool('ffmpeg', context.ffmpegPath);
  const argv = [...baseArgs()]; for (let i = 0; i < inputs.length; i += 1) argv.push(...(i ? ['-protocol_whitelist', 'file,pipe'] : []), '-i', inputs[i]);
  const layout = channels === 1 ? 'mono' : 'stereo';
  const filters = inputs.map((_, i) => `[${i}:a:0]aresample=${sampleRate},aformat=sample_fmts=fltp:channel_layouts=${layout},asetpts=PTS-STARTPTS[a${i}]`).join(';') + ';' + inputs.map((_, i) => `[a${i}]`).join('') + `concat=n=${inputs.length}:v=0:a=1[out]`;
  argv.push('-filter_complex', filters, '-map', '[out]', ...audioCodec(output), '-ar', String(sampleRate), '-ac', String(channels));
  const result = await publish(output, target => run(ffmpeg, [...argv, target], context), context, target => probe(target, context));
  return { ...result, inputCount: inputs.length };
}
async function thumbnailTo(input, meta, output, args, context) {
  const time = number(args.time, 0, 0, Number.MAX_SAFE_INTEGER, '缩略图时间');
  if (time >= meta.duration) throw new Error('缩略图时间超出视频时长');
  const seek = Math.min(time, Math.max(0, meta.duration - 1 / (meta.fps || 25)));
  const argv = [...baseArgs(), '-ss', String(seek), '-i', input, '-map', '0:v:0', '-frames:v', '1'];
  if (args.width !== undefined) argv.push('-vf', `scale=${number(args.width, undefined, 1, 8192, '缩略图宽度', true)}:-1`);
  argv.push('-update', '1');
  const result = await publish(output, target => run(tool('ffmpeg', context.ffmpegPath), [...argv, target], context), context, target => probe(target, context));
  const metadata = result.metadata;
  return { ...result, time: seek, requestedTime: time, width: metadata.width, height: metadata.height, metadata };
}
async function thumbnail(args, context) { const input = await inputFile(args.inputPath), meta = await probe(input, context); needVideo(meta); const output = await outputFile(args.outputPath, [input], ['.png', '.jpg', '.jpeg']); return thumbnailTo(input, meta, output, args, context); }
async function analyzeVideo(args, context) {
  checkAbort(context); const input = await inputFile(args.inputPath), metadata = await probe(input, context); needVideo(metadata);
  const count = number(args.sampleCount, 6, 1, 60, '采样帧数量', true), threshold = number(args.sceneThreshold, 0.35, 0, 1, '镜头变化阈值'), minScene = number(args.minSceneSeconds, Math.min(0.3, metadata.duration), 0.001, metadata.duration, '最短镜头秒数');
  const directory = localPath(args.outputDir, '分析输出目录'); await fsp.mkdir(directory, { recursive: true }); const work = await fsp.mkdtemp(path.join(directory, 'aiyouplus-analysis-'));
  try {
    const frames = [];
    for (let i = 0; i < count; i += 1) { checkAbort(context); const output = path.join(work, `frame-${String(i + 1).padStart(3, '0')}.png`); frames.push(await thumbnailTo(input, metadata, output, { time: (i + 0.5) * metadata.duration / count, width: 640 }, context)); }
    const result = await run(tool('ffmpeg', context.ffmpegPath), ['-hide_banner', '-loglevel', 'info', '-nostdin', '-protocol_whitelist', 'file,pipe', '-i', input, '-map', '0:v:0', '-vf', `setpts=PTS-STARTPTS,select='gt(scene,${threshold})',showinfo`, '-an', '-fps_mode', 'vfr', '-f', 'null', '-'], context);
    const cuts = [...result.stderr.matchAll(/\bn:\s*\d+[^\r\n]*?\bpts_time:([\d.e+-]+)/g)].map(m => Number(m[1])).filter(Number.isFinite).sort((a, b) => a - b);
    const boundaries = [0]; for (const time of cuts) if (time - boundaries.at(-1) >= minScene && metadata.duration - time >= minScene) { if (boundaries.length >= 1000) throw new Error('阈值镜头数超过 1000，请提高镜头阈值'); boundaries.push(time); }
    boundaries.push(metadata.duration);
    const scenes = boundaries.slice(0, -1).map((start, i) => ({ start, end: boundaries[i + 1], duration: boundaries[i + 1] - start }));
    return { metadata, outputDir: work, frames, scenes, method: 'ffmpeg-scene-score', sceneThreshold: threshold, minSceneSeconds: minScene };
  } catch (error) { await fsp.rm(work, { recursive: true, force: true }); throw error; }
}
async function loadPixels(input, context) {
  checkAbort(context);
  if (!IMAGE_EXTENSIONS.has(path.extname(input).toLowerCase())) throw new Error('图片操作只接受本地图片文件');
  const metadata = await probe(input, context); dimensions(metadata.width, metadata.height);
  if (context.nativeImage?.createFromPath) {
    const image = context.nativeImage.createFromPath(input);
    if (!image.isEmpty()) {
      const size = image.getSize(), pixels = image.toBitmap({ scaleFactor: metadata.width / size.width });
      if (pixels.length === metadata.width * metadata.height * 4) return { width: metadata.width, height: metadata.height, pixels };
    }
  }
  const raw = await run(tool('ffmpeg', context.ffmpegPath), [...baseArgs(), '-noautorotate', '-i', input, '-map', '0:v:0', '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'bgra', 'pipe:1'], context, { maxOutputBytes: MAX_PIXELS * 4 + 1024 });
  if (raw.stdout.length !== metadata.width * metadata.height * 4) throw new Error('图片解码像素与尺寸不一致');
  return { width: metadata.width, height: metadata.height, pixels: raw.stdout };
}
function cropPixels(source, x, y, width, height) {
  const pixels = Buffer.alloc(width * height * 4);
  for (let row = 0; row < height; row += 1) source.pixels.copy(pixels, row * width * 4, ((y + row) * source.width + x) * 4, ((y + row) * source.width + x + width) * 4);
  return { width, height, pixels };
}
function transformPixels(source, args) {
  source.pixels = Buffer.from(source.pixels);
  if (args.crop) { const { x, y, width, height } = args.crop; if (![x, y, width, height].every(Number.isInteger) || x < 0 || y < 0 || width <= 0 || height <= 0 || x + width > source.width || y + height > source.height) throw new Error('图片裁剪范围超出原图或不是整数'); source = cropPixels(source, x, y, width, height); }
  const width = args.width === undefined ? (args.height === undefined ? source.width : Math.max(1, Math.round(source.width * Number(args.height) / source.height))) : Number(args.width);
  const height = args.height === undefined ? Math.max(1, Math.round(source.height * width / source.width)) : Number(args.height); dimensions(width, height);
  let pixels = resizeBgra(source.pixels, source.width, source.height, width, height);
  const rotation = args.rotation === undefined ? 0 : Number(args.rotation); if (![0, 90, 180, 270].includes(rotation)) throw new Error('旋转角度只支持 0 / 90 / 180 / 270（顺时针）');
  const dw = rotation % 180 ? height : width, dh = rotation % 180 ? width : height;
  if (rotation || args.flipX || args.flipY) { const rotated = Buffer.alloc(pixels.length); for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) { let dx = rotation === 90 ? height - 1 - y : rotation === 180 ? width - 1 - x : rotation === 270 ? y : x; let dy = rotation === 90 ? x : rotation === 180 ? height - 1 - y : rotation === 270 ? width - 1 - x : y; if (args.flipX) dx = dw - 1 - dx; if (args.flipY) dy = dh - 1 - dy; pixels.copy(rotated, (dy * dw + dx) * 4, (y * width + x) * 4, (y * width + x) * 4 + 4); } pixels = rotated; }
  return { width: dw, height: dh, pixels };
}
function backgroundColor(value) {
  if (value === 'transparent') return [0, 0, 0, 0];
  if (!/^#[\da-f]{6}([\da-f]{2})?$/i.test(value)) throw new Error('拼图背景色需为 #RRGGBB、#RRGGBBAA 或 transparent');
  return [parseInt(value.slice(5, 7), 16), parseInt(value.slice(3, 5), 16), parseInt(value.slice(1, 3), 16), value.length === 9 ? parseInt(value.slice(7, 9), 16) : 255];
}
function montagePixels(sources, args) {
  const columns = number(args.columns, 2, 1, 64, '拼图列数', true), cellWidth = number(args.cellWidth, 512, 1, 8192, '单元格宽度', true), cellHeight = number(args.cellHeight, 512, 1, 8192, '单元格高度', true), gap = number(args.gap, 0, 0, 1024, '拼图间距', true), rows = Math.ceil(sources.length / columns), width = columns * cellWidth + (columns - 1) * gap, height = rows * cellHeight + (rows - 1) * gap; dimensions(width, height);
  const fit = args.fit || 'contain'; if (!['contain', 'cover'].includes(fit)) throw new Error('拼图 fit 只支持 contain / cover');
  const color = backgroundColor(args.background === undefined ? '#151B18' : args.background), pixels = Buffer.alloc(width * height * 4); for (let p = 0; p < pixels.length; p += 4) for (let c = 0; c < 4; c += 1) pixels[p + c] = color[c];
  sources.forEach((s, index) => { const scale = (fit === 'cover' ? Math.max : Math.min)(cellWidth / s.width, cellHeight / s.height), w = Math.max(1, Math.round(s.width * scale)), h = Math.max(1, Math.round(s.height * scale)); dimensions(w, h); const scaled = resizeBgra(Buffer.from(s.pixels), s.width, s.height, w, h), cx = Math.max(0, Math.floor((w - cellWidth) / 2)), cy = Math.max(0, Math.floor((h - cellHeight) / 2)), drawW = Math.min(w, cellWidth), drawH = Math.min(h, cellHeight), dx = (index % columns) * (cellWidth + gap) + Math.max(0, Math.floor((cellWidth - w) / 2)), dy = Math.floor(index / columns) * (cellHeight + gap) + Math.max(0, Math.floor((cellHeight - h) / 2));
    for (let y = 0; y < drawH; y += 1) for (let x = 0; x < drawW; x += 1) { const si = ((y + cy) * w + x + cx) * 4, di = ((y + dy) * width + x + dx) * 4, a = scaled[si + 3] / 255, outA = a + pixels[di + 3] / 255 * (1 - a); for (let c = 0; c < 3; c += 1) pixels[di + c] = outA ? Math.round((scaled[si + c] * a + pixels[di + c] * pixels[di + 3] / 255 * (1 - a)) / outA) : 0; pixels[di + 3] = Math.round(outA * 255); }
  }); return { width, height, pixels };
}
function pixelWorker(operation, sources, args, context) {
  checkAbort(context);
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData: { aiyouplusLocalMediaPixels: true, operation, sources, args } }); let done = false, cancelling = false;
    const finish = (error, value) => { if (done) return; done = true; context.signal?.removeEventListener('abort', onAbort); if (error) reject(error); else resolve(value); };
    const onAbort = () => { if (done) return; cancelling = true; worker.terminate().then(() => finish(abortError()), error => finish(error)); };
    worker.once('message', message => { if (cancelling) return; if (message.error) finish(new Error(message.error)); else finish(null, { ...message, pixels: Buffer.from(message.pixels) }); });
    worker.once('error', error => { if (!cancelling) finish(error); });
    worker.once('exit', code => { if (!done && !cancelling) finish(new Error(`图片处理工作线程退出（${code}）`)); });
    context.signal?.addEventListener('abort', onAbort, { once: true }); if (context.signal?.aborted) onAbort();
  });
}
async function savePixels(data, output, context) {
  const jpeg = ['.jpg', '.jpeg'].includes(path.extname(output).toLowerCase());
  const result = await publish(output, target => run(tool('ffmpeg', context.ffmpegPath), [...baseArgs(), '-f', 'rawvideo', '-pixel_format', 'bgra', '-video_size', `${data.width}x${data.height}`, '-i', 'pipe:0', '-frames:v', '1', '-c:v', jpeg ? 'mjpeg' : 'png', ...(jpeg ? ['-q:v', '2'] : []), '-update', '1', target], context, { stdin: data.pixels }), context);
  return { ...result, width: data.width, height: data.height, mimeType: jpeg ? 'image/jpeg' : 'image/png' };
}
async function imageTransform(args, context) { const input = await inputFile(args.inputPath), output = await outputFile(args.outputPath, [input], ['.png', '.jpg', '.jpeg']); const source = await loadPixels(input, context); const transformed = await pixelWorker('transform', [source], args, context); return savePixels(transformed, output, context); }
async function imageMontage(args, context) { if (!Array.isArray(args.inputPaths) || !args.inputPaths.length || args.inputPaths.length > 64) throw new Error('拼图需要 1–64 张本地图片'); const inputs = []; for (const value of args.inputPaths) inputs.push(await inputFile(value)); const output = await outputFile(args.outputPath, inputs, ['.png', '.jpg', '.jpeg']), sources = []; for (const input of inputs) sources.push(await loadPixels(input, context)); const result = await pixelWorker('montage', sources, args, context); return savePixels(result, output, context); }
async function tryHandleLocalMediaCommand(cmd, rawArgs, context = {}) {
  if (!COMMANDS.has(cmd)) return { handled: false };
  checkAbort(context);
  const args = rawArgs?.args && typeof rawArgs.args === 'object' ? rawArgs.args : rawArgs;
  if (!args || typeof args !== 'object' || Array.isArray(args)) throw new Error('本地媒体命令参数必须是对象');
  for (const name of ['flipX', 'flipY', 'includeAudio']) if (args[name] !== undefined && typeof args[name] !== 'boolean') throw new Error(`${name} 必须为布尔值`);
  let value;
  switch (cmd) {
    case 'aiyouplus_media_probe': value = await probe(await inputFile(args.inputPath), context); break;
    case 'aiyouplus_media_video_analyze': value = await analyzeVideo(args, context); break;
    case 'aiyouplus_media_thumbnail': value = await thumbnail(args, context); break;
    case 'aiyouplus_media_video_convert': case 'aiyouplus_media_video_trim': value = await videoConvert(args, context); break;
    case 'aiyouplus_media_audio_extract': case 'aiyouplus_media_audio_trim': value = await audioExtract(args, context); break;
    case 'aiyouplus_media_audio_merge': value = await audioMerge(args, context); break;
    case 'aiyouplus_media_image_transform': value = await imageTransform(args, context); break;
    case 'aiyouplus_media_image_montage': value = await imageMontage(args, context); break;
  }
  return { handled: true, value };
}
if (!isMainThread && workerData?.aiyouplusLocalMediaPixels) {
  try { const result = workerData.operation === 'transform' ? transformPixels(workerData.sources[0], workerData.args) : montagePixels(workerData.sources, workerData.args); parentPort.postMessage(result, [result.pixels.buffer]); }
  catch (error) { parentPort.postMessage({ error: error.message }); }
}
module.exports = { tryHandleLocalMediaCommand, LOCAL_MEDIA_COMMANDS: [...COMMANDS] };
