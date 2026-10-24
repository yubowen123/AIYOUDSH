'use strict';
// Official MiniMax transport only. The caller owns credentials, durable jobs and
// decoding/publishing media. A stopped local wait never cancels a remote task.
const {assertNetworkAllowed, isLoopbackUrl} = require('./aiyouplus-runtime.cjs');

const MINIMAX_MODELS = Object.freeze({
  image: Object.freeze(['image-01']),
  audio: Object.freeze(['speech-2.8-hd', 'speech-2.8-turbo', 'speech-2.6-hd', 'speech-2.6-turbo']),
  // The official docs restrict these paid APIs to existing paying music users.
  // A shared API Key does not prove the account has music entitlement.
  music: Object.freeze(['music-3.0', 'music-2.6']),
  video: Object.freeze(['MiniMax-H3']),
});
const MINIMAX_SYSTEM_VOICES = Object.freeze([
  'Chinese (Mandarin)_Sweet_Lady', 'Chinese (Mandarin)_Male_Announcer',
  'Chinese (Mandarin)_Wise_Women', 'English_expressive_narrator',
  'English_Graceful_Lady', 'English_Insightful_Speaker',
]);
const IMAGE_RATIOS = ['1:1', '16:9', '4:3', '3:2', '2:3', '3:4', '9:16', '21:9'];
const VIDEO_RATIOS = ['adaptive', '21:9', '16:9', '4:3', '1:1', '3:4', '9:16'];
const MAX_REQUEST_BYTES = 64 * 1024 * 1024;
const MAX_RESPONSE_BYTES = 80 * 1024 * 1024;
const MAX_MEDIA_BYTES = 64 * 1024 * 1024;
const FORBIDDEN = /qiniu|qnaigc|qbox\.me|clouddn\.com|qnssl\.com|qiniucdn\.com|七牛/i;

function string(value, label, max) {
  if (typeof value !== 'string' || !value.trim() || [...value].length > max) throw new Error(label + '为空或超过' + max + '字符');
  return value.trim();
}
function integer(value, label, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) throw new Error(label + '须为' + min + '到' + max + '的整数');
  return value;
}
function number(value, label, min, max, exclusiveMinimum = false) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max || (exclusiveMinimum && value === min)) throw new Error(label + '超出范围');
  return value;
}
function oneOf(value, values, label) {
  if (!values.includes(value)) throw new Error(label + '不在已核对的MiniMax清单中');
  return value;
}
function baseUrl(value = 'https://api.minimax.io') {
  const url = new URL(value);
  if (url.username || url.password || url.search || url.hash || !['', '/'].includes(url.pathname)) throw new Error('MiniMax服务地址须为官方源站');
  if (url.origin !== 'https://api.minimax.io' && !(url.protocol === 'http:' && isLoopbackUrl(url.href))) throw new Error('MiniMax仅支持官方api.minimax.io；本机HTTP仅用于隔离协议测试');
  assertNetworkAllowed(url.href);
  return url.origin;
}
function checkBase64(value, label, max = MAX_MEDIA_BYTES) {
  if (typeof value !== 'string' || !value || value.length > Math.ceil(max / 3) * 4 + 4 || value.length % 4 !== 0 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)) throw new Error(label + 'base64无效或过大');
  const bytes = Buffer.from(value, 'base64');
  if (!bytes.length || bytes.length > max) throw new Error(label + '为空或过大');
  return bytes;
}
function mediaSource(value, kind, limit, allowFileHandle = true) {
  if (typeof value !== 'string' || FORBIDDEN.test(value)) throw new Error('参考素材地址无效或属于禁用供应商');
  if (value.startsWith('data:')) {
    const match = /^data:([a-z]+\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/.exec(value);
    const allowed = kind === 'image' ? ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif'] : kind === 'video' ? ['video/mp4'] : ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav'];
    if (!match || !allowed.includes(match[1])) throw new Error('参考素材类型与用途不一致');
    checkBase64(match[2], '参考素材', limit);
    return value;
  }
  if (allowFileHandle && /^mm_file:\/\/[A-Za-z0-9_-]{1,200}$/.test(value)) return value;
  const url = new URL(value);
  if (url.username || url.password || url.hash || url.protocol !== 'https:') throw new Error('参考素材须为不带凭证的HTTPS或有效data URL');
  assertNetworkAllowed(url.href);
  return url.href;
}
function outputUrl(value) {
  if (typeof value !== 'string' || FORBIDDEN.test(value)) throw new Error('MiniMax返回的媒体地址无效或属于禁用供应商');
  const url = new URL(value);
  if (url.username || url.password || !['https:', 'http:'].includes(url.protocol) || (url.protocol === 'http:' && !isLoopbackUrl(url.href))) throw new Error('MiniMax返回的媒体地址必须使用HTTPS');
  assertNetworkAllowed(url.href);
  return url.href;
}
function array(value, label, limit) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > limit) throw new Error(label + '数量无效，最多' + limit + '份');
  return value;
}
function ensureNoReferences(args) {
  if (args.referencePath || args.referencePaths?.length || args.referenceUrls?.length || args.referenceImages?.length || args.referenceAudios?.length || args.referenceVideos?.length || args.firstFrame || args.lastFrame) throw new Error('此声音入口仅支持文字及系统音色，不支持参考音色或克隆');
}
function buildMiniMaxRequest(args = {}) {
  const kind = oneOf(args.kind, Object.keys(MINIMAX_MODELS), '生成类型');
  const model = oneOf(args.model || MINIMAX_MODELS[kind][0], MINIMAX_MODELS[kind], '模型');
  let body, path;
  const warnings = [];
  if (kind === 'image') {
    path = '/v1/image_generation';
    body = {model, prompt:string(args.prompt, '图像提示词', 1500), response_format:'url', n:integer(args.count ?? args.n ?? 1, '图片数量', 1, 9), prompt_optimizer:false};
    const refs = array(args.referenceImages, '图像参考', 1);
    if (refs.length) {
      const source = mediaSource(refs[0], 'image', 10 * 1024 * 1024, false);
      if (source.startsWith('data:') && !/^data:image\/(png|jpeg);/.test(source)) throw new Error('image-01角色参考仅支持PNG/JPEG');
      body.subject_reference = [{type:'character', image_file:source}];
    }
    if ((args.width === undefined) !== (args.height === undefined)) throw new Error('图片宽高须配对设置');
    if (args.width !== undefined) {
      if (args.aspectRatio) throw new Error('图片宽高与比例请仅选一种，避免参数被供应商忽略');
      body.width = integer(args.width, '图片宽度', 512, 2048);
      body.height = integer(args.height, '图片高度', 512, 2048);
      if (body.width % 8 || body.height % 8) throw new Error('图片宽高须为8的倍数');
    } else body.aspect_ratio = oneOf(args.aspectRatio || '1:1', IMAGE_RATIOS, '图片比例');
    if (args.seed !== undefined) { if (!Number.isSafeInteger(args.seed)) throw new Error('随机种子须为安全整数'); body.seed = args.seed; }
    if (args.mask || args.maskPath || args.transparentBackground || args.quality) throw new Error('image-01尚未接入蒙版、透明背景或质量字段');
  } else if (kind === 'audio') {
    ensureNoReferences(args);
    path = '/v1/t2a_v2';
    body = {model, text:string(args.prompt, '配音文字', 3000), stream:false, output_format:'hex', language_boost:'auto',
      voice_setting:{voice_id:oneOf(args.voiceId || MINIMAX_SYSTEM_VOICES[0], MINIMAX_SYSTEM_VOICES, '系统音色'), speed:number(args.speed ?? 1, '语速', 0.5, 2), vol:number(args.volume ?? 1, '音量', 0, 10, true), pitch:integer(args.pitch ?? 0, '音高', -12, 12)},
      audio_setting:{sample_rate:32000, bitrate:128000, format:'mp3', channel:1}, subtitle_enable:true, subtitle_type:'sentence'};
  } else if (kind === 'music') {
    ensureNoReferences(args);
    path = '/v1/music_generation';
    const prompt = string(args.prompt, '音乐描述', 2000);
    const lyrics = typeof args.lyrics === 'string' ? args.lyrics.trim() : '';
    const instrumental = args.instrumental === undefined ? !lyrics : Boolean(args.instrumental);
    if (instrumental && lyrics) throw new Error('纯音乐与歌词不能同时设置');
    if (!instrumental) string(lyrics, '原创歌词', 3500);
    body = {model, prompt, stream:false, output_format:'hex', is_instrumental:instrumental, lyrics_optimizer:false,
      audio_setting:{sample_rate:44100, bitrate:256000, format:'mp3'}, ...(lyrics ? {lyrics} : {})};
    warnings.push('音乐API仅既有付费音乐用户可用；统一Key不代表已获权限，不自动重试或改用免费型号');
  } else {
    path = '/v2/video_generation';
    if (args.resolution !== undefined && args.resolution !== '2K') throw new Error('本地MiniMax-H3入口使用已核对的2K合同');
    const duration = integer(args.duration ?? 5, 'H3时长', 5, 15);
    const images = array(args.referenceImages, '参考图片', 9), videos = array(args.referenceVideos, '参考视频', 3), audios = array(args.referenceAudios, '参考音频', 3);
    if (args.lastFrame && !args.firstFrame) throw new Error('尾帧须与首帧配对');
    if ((args.firstFrame || args.lastFrame) && (images.length || videos.length || audios.length)) throw new Error('首尾帧与多模态参考不能混用');
    if (audios.length && !images.length && !videos.length) throw new Error('参考音频须同时具有参考图片或参考视频');
    if (['fps','frameRate','bitrate','codec','generateAudio'].some(field => args[field] !== undefined)) throw new Error('H3入口不接受未核对的帧率、编码或独立生声开关');
    const content = [{type:'text', text:string(args.prompt, 'H3提示词', 7000)}];
    const add = (kind, role, source, limit) => content.push({type:kind + '_url', [kind + '_url']:{url:mediaSource(source, kind, limit)}, role});
    if (args.firstFrame) add('image', 'first_frame', args.firstFrame, 30 * 1024 * 1024);
    if (args.lastFrame) add('image', 'last_frame', args.lastFrame, 30 * 1024 * 1024);
    for (const source of images) add('image', 'reference_image', source, 30 * 1024 * 1024);
    for (const source of videos) add('video', 'reference_video', source, 50 * 1024 * 1024);
    for (const source of audios) add('audio', 'reference_audio', source, 15 * 1024 * 1024);
    const hasFrames = Boolean(args.firstFrame);
    let ratio = oneOf(args.aspectRatio || (content.length > 1 ? 'adaptive' : '16:9'), VIDEO_RATIOS, 'H3比例');
    if (content.length === 1 && ratio === 'adaptive') throw new Error('H3纯文生视频须选择具体比例');
    if (hasFrames && ratio !== 'adaptive') { ratio = 'adaptive'; warnings.push('H3首尾帧视频比例由输入图片决定，供应商固定采用adaptive'); }
    body = {model, content, resolution:'2K', duration, ratio};
  }
  if (Buffer.byteLength(JSON.stringify(body)) > MAX_REQUEST_BYTES) throw new Error('MiniMax请求超过64 MiB；请减少参考素材或使用已有文件句柄');
  return {kind, model, path, body, warnings, expectedKind:kind === 'music' ? 'audio' : kind};
}
function scrub(value, key) {
  let text = String(value || 'MiniMax请求失败');
  if (key) text = text.split(key).join('[REDACTED]');
  return text.replace(/Bearer\s+[^\s"'<>]+/gi, 'Bearer [REDACTED]').slice(0, 1500);
}
function stopped() {
  const error = new Error('已停止本机等待，MiniMax服务端任务未确认取消；保留taskId后可继续查询');
  error.code = 'MINIMAX_WAIT_STOPPED';
  error.remoteTaskCancelled = false;
  return error;
}
function checkStopped(signal) { if (signal?.aborted) throw stopped(); }
async function jsonRequest(ctx, origin, suffix, body) {
  checkStopped(ctx.signal);
  const timeout = AbortSignal.timeout(ctx.requestTimeoutMs || 240000);
  const signal = ctx.signal ? AbortSignal.any([ctx.signal, timeout]) : timeout;
  const url = origin + suffix;
  assertNetworkAllowed(url);
  let response;
  try {
    response = await (ctx.fetch || global.fetch)(url, {method:body === undefined ? 'GET' : 'POST', redirect:'error', signal,
      headers:{Authorization:'Bearer ' + ctx.apiKey, ...(body === undefined ? {} : {'Content-Type':'application/json'})},
      ...(body === undefined ? {} : {body:JSON.stringify(body)})});
    let text;
    if (response.body && typeof response.body[Symbol.asyncIterator] === 'function') {
      const parts = []; let size = 0;
      for await (const chunk of response.body) { size += chunk.length; if (size > MAX_RESPONSE_BYTES) throw new Error('MiniMax JSON响应过大'); parts.push(chunk); }
      text = Buffer.concat(parts).toString('utf8');
    } else { text = await response.text(); if (Buffer.byteLength(text) > MAX_RESPONSE_BYTES) throw new Error('MiniMax JSON响应过大'); }
    let result;
    try { result = JSON.parse(text); } catch { throw new Error('MiniMax返回非JSON响应（HTTP ' + response.status + '）'); }
    if (!response.ok || result.error || (result.base_resp?.status_code !== undefined && Number(result.base_resp.status_code) !== 0)) {
      const error = new Error(scrub(result.error?.message || result.base_resp?.status_msg || 'MiniMax HTTP ' + response.status, ctx.apiKey));
      error.httpStatus = response.status;
      error.providerCode = result.error?.type || result.base_resp?.status_code;
      throw error;
    }
    return result;
  } catch (error) {
    if (ctx.signal?.aborted) throw stopped();
    error.message = scrub(error.message, ctx.apiKey);
    throw error;
  }
}
function imageBuffer(encoded) {
  const raw = typeof encoded === 'string' && encoded.startsWith('data:') ? /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/.exec(encoded)?.[2] : encoded;
  const bytes = checkBase64(raw, '图片结果');
  let mimeType, extension;
  if (bytes.subarray(0,8).toString('hex') === '89504e470d0a1a0a') { mimeType = 'image/png'; extension = '.png'; }
  else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) { mimeType = 'image/jpeg'; extension = '.jpg'; }
  else if (bytes.subarray(0,4).toString() === 'RIFF' && bytes.subarray(8,12).toString() === 'WEBP') { mimeType = 'image/webp'; extension = '.webp'; }
  else throw new Error('MiniMax图片结果不是PNG/JPEG/WebP原件');
  return {bytes, mimeType, extension};
}
function audioBuffer(encoded) {
  if (typeof encoded !== 'string' || !encoded || encoded.length % 2 || encoded.length > MAX_MEDIA_BYTES * 2 || !/^[0-9a-fA-F]+$/.test(encoded)) throw new Error('MiniMax声音结果不是有效hex音频');
  return {bytes:Buffer.from(encoded, 'hex'), mimeType:'audio/mpeg', extension:'.mp3'};
}
function parseSynchronous(plan, response) {
  const output = {kind:plan.expectedKind, model:plan.model, urls:[], buffers:[], traceId:response.trace_id || response.id, warnings:plan.warnings};
  if (plan.kind === 'image') {
    const urls = response.data?.image_urls || [], encoded = response.data?.image_base64 || [];
    if (!Array.isArray(urls) || !Array.isArray(encoded) || urls.length + encoded.length > plan.body.n) throw new Error('MiniMax图片结果数量与请求不一致');
    output.urls = urls.map(outputUrl);
    output.buffers = encoded.map(imageBuffer);
    if (!output.urls.length && !output.buffers.length) throw new Error('MiniMax没有返回可下载图片，可能被内容审核拦截');
    output.metadata = response.metadata;
  } else {
    if (response.data?.status !== 2) throw new Error('MiniMax同步声音请求未返回完成状态');
    const audio = response.data?.audio;
    if (typeof audio === 'string' && /^https?:/.test(audio)) output.urls = [outputUrl(audio)];
    else output.buffers = [audioBuffer(audio)];
    if (response.data?.subtitle_file) output.subtitleUrl = outputUrl(response.data.subtitle_file);
    output.usage = response.extra_info;
  }
  return output;
}
async function delay(ms, signal) {
  checkStopped(signal);
  await new Promise((resolve, reject) => {
    const aborted = () => { clearTimeout(timer); signal?.removeEventListener('abort', aborted); reject(stopped()); };
    const timer = setTimeout(() => { signal?.removeEventListener('abort', aborted); resolve(); }, ms);
    signal?.addEventListener('abort', aborted, {once:true});
    if (signal?.aborted) aborted();
  });
}
async function executeMiniMax(ctx = {}, args = {}, previousJob) {
  if (typeof ctx.apiKey !== 'string' || !ctx.apiKey.trim()) throw new Error('未配置MiniMax API Key');
  const origin = baseUrl(ctx.baseUrl);
  checkStopped(ctx.signal);
  const resume = previousJob?.taskId;
  if (!resume) {
    const plan = buildMiniMaxRequest(args);
    if (plan.kind !== 'video') return parseSynchronous(plan, await jsonRequest(ctx, origin, plan.path, plan.body));
  } else if ((args.kind || previousJob.kind) !== 'video') throw new Error('MiniMax仅视频任务支持taskId恢复查询');
  if (typeof ctx.persistJob !== 'function') throw new Error('视频提交前须接入持久任务记录');
  const maxPollMs = ctx.maxPollMs ?? 30 * 60 * 1000, pollIntervalMs = ctx.pollIntervalMs ?? 5000;
  if (!Number.isFinite(maxPollMs) || maxPollMs <= 0 || !Number.isFinite(pollIntervalMs) || pollIntervalMs < 0) throw new Error('MiniMax查询等待参数无效，未提交新任务');
  if (resume && (!/^[A-Za-z0-9_-]{1,200}$/.test(String(resume)) || (previousJob.model && previousJob.model !== 'MiniMax-H3'))) throw new Error('MiniMax恢复任务标识或模型不合法');
  let taskId = resume ? String(resume) : undefined;
  const plan = resume ? null : buildMiniMaxRequest(args);
  if (!taskId) {
    const response = await jsonRequest(ctx, origin, plan.path, plan.body);
    if (typeof response.task_id !== 'string' || !/^[A-Za-z0-9_-]{1,200}$/.test(response.task_id)) throw new Error('MiniMax未返回有效task_id，禁止自动重复提交');
    taskId = response.task_id;
    // Await this write before ANY poll or abort check: remote work already exists.
    try { await ctx.persistJob({taskId, status:'running', remoteStatus:'queued'}); }
    catch (error) {
      const failure = new Error('MiniMax已创建任务，但taskId持久化失败；请保留返回任务ID后手动恢复，禁止重复提交：' + scrub(error.message, ctx.apiKey));
      failure.taskId = taskId; failure.code = 'MINIMAX_TASK_PERSIST_FAILED'; throw failure;
    }
  }
  const began = Date.now();
  for (;;) {
    checkStopped(ctx.signal);
    const response = await jsonRequest(ctx, origin, '/v2/query/video_generation/' + encodeURIComponent(taskId));
    const task = response.task;
    if (!task || (task.id && String(task.id) !== taskId)) throw new Error('MiniMax查询未返回同一视频任务');
    const status = String(task.status || '').toLowerCase();
    if (!['queued','running','succeeded','failed','cancelled','expired'].includes(status)) throw new Error('MiniMax返回未识别任务状态；已保留taskId，未重新提交');
    await ctx.persistJob({taskId, status:'running', remoteStatus:status, ...(task.usage ? {usage:task.usage} : {})});
    if (status === 'succeeded') {
      if (task.modality && task.modality !== 'video') throw new Error('MiniMax任务输出不是视频');
      return {kind:'video', model:'MiniMax-H3', taskId, remoteStatus:status, urls:[outputUrl(task.content?.url)], buffers:[], usage:task.usage,
        metadata:{resolution:task.resolution, duration:task.duration, ratio:task.ratio}, warnings:plan?.warnings || []};
    }
    if (['failed','cancelled','expired'].includes(status)) {
      const error = new Error('MiniMax视频任务' + status + '：' + scrub(task.error?.message || '未返回有效视频', ctx.apiKey));
      error.taskId = taskId; error.remoteStatus = status; throw error;
    }
    if (Date.now() - began >= maxPollMs) {
      const error = new Error('MiniMax等待超时；taskId已保存，恢复只查询，不会重新提交');
      error.taskId = taskId; error.code = 'MINIMAX_WAIT_TIMEOUT'; throw error;
    }
    await delay(Math.min(pollIntervalMs, Math.max(0, maxPollMs - (Date.now() - began))), ctx.signal);
  }
}
module.exports = {MINIMAX_MODELS, MINIMAX_SYSTEM_VOICES, buildMiniMaxRequest, executeMiniMax};
