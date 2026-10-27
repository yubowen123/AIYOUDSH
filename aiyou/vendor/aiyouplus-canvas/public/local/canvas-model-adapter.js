// Editable adapter for the recovered canvas generation callback. No provider Key
// enters the renderer; native IPC owns submission, polling and media download.
export const ADAPTER_READY_EVENT = 'aiyouplus-canvas-model-adapter-ready';
export const CANVAS_MODELS = Object.freeze([
  Object.freeze({ id: 'aiyouplus-wuread-chat', modelName: 'tencent/gemini-3-flash-preview', provider: 'Gemini 3 Flash · 腾讯 Wuread', type: 'Chat' }),
  Object.freeze({ id: 'aiyouplus-wuread-image', modelName: 'hunyuan-image-3.5-preview', provider: '混元 3.5 · Wuread', type: 'Image', ratios: ['1:1', '16:9', '9:16', '4:3', '3:4'], resolutions: ['1K', '2K'] }),
  Object.freeze({ id: 'aiyouplus-wuread-video', modelName: 'seedance-2.5', provider: 'Seedance 2.5 · Wuread', type: 'Video', ratios: ['16:9', '9:16', '1:1'], resolutions: ['480p', '720p'], durations: ['5s', '10s'] }),
]);
export const NATIVE_CHAT_MODELS = Object.freeze([
  Object.freeze({ id: 'aiyouplus-deepseek-flash-chat', modelName: 'deepseek-flash', provider: 'DeepSeek V4.1 Flash · 官方', type: 'Chat', nativeService: 'deepseek', inputModalities: ['text', 'image'] }),
  Object.freeze({ id: 'aiyouplus-deepseek-v4-pro-chat', modelName: 'deepseek-v4-pro', provider: 'DeepSeek V4 Pro · 官方', type: 'Chat', nativeService: 'deepseek', inputModalities: ['text'] }),
]);
export const MINIMAX_SYSTEM_VOICES = Object.freeze(['Chinese (Mandarin)_Sweet_Lady','Chinese (Mandarin)_Male_Announcer','Chinese (Mandarin)_Wise_Women','English_expressive_narrator','English_Graceful_Lady','English_Insightful_Speaker']);
export const NATIVE_MEDIA_MODELS = Object.freeze([
  Object.freeze({ id:'aiyouplus-minimax-image', modelName:'image-01', provider:'MiniMax Image 01 · 文生图/单张肖像', type:'Image', nativeService:'minimax', ratios:['1:1','16:9','9:16','4:3','3:4','3:2','2:3'], maxReferences:1, referencePurpose:'portrait' }),
  Object.freeze({ id:'aiyouplus-minimax-video', modelName:'MiniMax-H3', provider:'MiniMax H3 · 5–15s / 2K', type:'Video', nativeService:'minimax', ratios:['16:9','9:16','1:1'], resolutions:['2K'], durations:['5s','6s','7s','8s','9s','10s','11s','12s','13s','14s','15s'], maxReferences:9 }),
  Object.freeze({ id:'aiyouplus-minimax-speech-turbo', modelName:'speech-2.8-turbo', provider:'MiniMax Speech 2.8 Turbo · 官方', type:'Speech', nativeService:'minimax', audioScene:'speech', voices:MINIMAX_SYSTEM_VOICES, defaultVoice:'Chinese (Mandarin)_Male_Announcer' }),
  Object.freeze({ id:'aiyouplus-minimax-speech-hd', modelName:'speech-2.8-hd', provider:'MiniMax Speech 2.8 HD · 官方', type:'Speech', nativeService:'minimax', audioScene:'speech', voices:MINIMAX_SYSTEM_VOICES, defaultVoice:'Chinese (Mandarin)_Male_Announcer' }),
  Object.freeze({ id:'aiyouplus-minimax-music-3', modelName:'music-3.0', provider:'MiniMax Music 3.0 · 官方', type:'Music', nativeService:'minimax', audioScene:'music' }),
  Object.freeze({ id:'aiyouplus-minimax-music-26', modelName:'music-2.6', provider:'MiniMax Music 2.6 · 官方', type:'Music', nativeService:'minimax', audioScene:'music' }),
]);
const ALL_MODELS = Object.freeze([...CANVAS_MODELS.map(model => ({ ...model, nativeService: 'wuread', ...(model.type === 'Chat' ? { inputModalities: ['text', 'image'] } : {}) })), ...NATIVE_CHAT_MODELS, ...NATIVE_MEDIA_MODELS]);
const NODE_KINDS = Object.freeze({'gen-image':'image','gen-video':'video','gen-speech':'audio','gen-music':'music'});
const MODEL_KINDS = Object.freeze({Image:'image',Video:'video',Speech:'audio',Music:'music'});
let configuredModels=[];
const serviceModelId=(provider,kind,id)=>'aiyouplus-service:'+encodeURIComponent(provider)+':'+kind+':'+encodeURIComponent(id);
function missingServiceModel(id){
  if(typeof id!=='string')return null;
  const match=/^aiyouplus-service:([^:]+):(chat|image|video|audio|music):(.+)$/.exec(id);
  if(!match)return null;
  try{return{id,nativeService:decodeURIComponent(match[1]),modelName:decodeURIComponent(match[3]),type:({chat:'Chat',image:'Image',video:'Video',audio:'Speech',music:'Music'})[match[2]],unavailable:true};}catch{return null;}
}
const availableModels=()=>[...configuredModels,...ALL_MODELS];
export const getNativeMediaModel = id => availableModels().find(model => MODEL_KINDS[model.type] && model.id === id) || (MODEL_KINDS[missingServiceModel(id)?.type]?missingServiceModel(id):null);

export const NATIVE_TRANSPORT_MARKER = 'aiyouplus-native-transport';
export const isNativeChatModel = id => availableModels().some(model => model.type === 'Chat' && model.id === id)||missingServiceModel(id)?.type==='Chat';
function chatModel(id, service) {
  return availableModels().find(model => model.type === 'Chat' && (model.id === id || model.modelName === id)) || (!id ? availableModels().find(model => model.type === 'Chat' && model.nativeService === service) : null);
}
// The active settings tab is independent from the credentials used by a node.
// Public profiles contain availability only; the selected provider owns its Key in main.
export function nativeProviderProfile(config, provider) {
  const profile = config?.profiles?.[provider];
  if (profile && profile.provider === provider) return profile;
  return config?.provider === provider ? config : null;
}
const FORBIDDEN = /qiniu|qnaigc|qbox\.me|clouddn\.com|qnssl\.com|qiniucdn\.com|七牛/i;
const absolutePath = value => typeof value === 'string' && !value.includes('\0') && (value.startsWith('/') || /^[A-Za-z]:[\\/]/.test(value));
const uuid = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
function nativePath(value) {
  if (absolutePath(value)) return value;
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if(typeof window!=='undefined'&&url.origin===window.location.origin&&url.pathname==='/aiyoucodex-dsh/canvas/file'&&url.searchParams.get('projectId')===window.__DSH_CANVAS__?.identity?.projectId){const p=url.searchParams.get('path');return absolutePath(p)?p:null;}
    if ((url.protocol === 'asset:' && url.hostname === 'localhost') || (url.protocol === 'file:' && !url.hostname) || (url.protocol === 'http:' && url.hostname === 'asset.localhost')) {
      if (url.search || url.hash || url.username || url.password) throw new Error('本地素材URL不能带查询或凭证');
      let file = decodeURIComponent(url.pathname);
      if (/^\/[A-Za-z]:\//.test(file)) file = file.slice(1);
      return absolutePath(file) ? file : null;
    }
  } catch { return null; }
  return null;
}
function remoteUrl(value) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || FORBIDDEN.test(url.href)) return null;
    url.hash = '';
    return url.href;
  } catch { return null; }
}
function errorText(error) { return error instanceof Error ? error.message : String(error || '模型生成失败'); }
export function mediaMimeFromBytes(value, kind) {
  const bytes = value instanceof Uint8Array ? value : value instanceof ArrayBuffer ? new Uint8Array(value) : ArrayBuffer.isView(value) ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength) : value?.type === 'Buffer' && Array.isArray(value.data) ? new Uint8Array(value.data) : Array.isArray(value) ? new Uint8Array(value) : null;
  if (!bytes?.length || bytes.length > 512 * 1024 * 1024) throw new Error('下载媒体为空或超过512 MiB');
  const text = (start, end) => String.fromCharCode(...bytes.subarray(start, end));
  let mime;
  if (bytes.length >= 8 && bytes[0] === 137 && text(1, 4) === 'PNG' && bytes[4] === 13 && bytes[5] === 10) mime = 'image/png';
  else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) mime = 'image/jpeg';
  else if (text(0, 4) === 'RIFF' && text(8, 12) === 'WEBP') mime = 'image/webp';
  else if (['GIF87a', 'GIF89a'].includes(text(0, 6))) mime = 'image/gif';
  else if (text(4, 8) === 'ftyp') mime = 'video/mp4';
  else if (bytes[0] === 26 && bytes[1] === 69 && bytes[2] === 223 && bytes[3] === 163) mime = 'video/webm';
  else if (text(0, 3) === 'ID3' || (bytes[0] === 255 && (bytes[1] & 0xe0) === 0xe0 && (bytes[1] & 0x06) !== 0)) mime = 'audio/mpeg';
  if (!mime || !mime.startsWith(kind + '/')) throw new Error('下载文件内容与所选媒体类型不一致，未写入成功结果');
  return { bytes, mime };
}
export async function cacheCanvasModelOutput(output, bindings) {
  if (!absolutePath(output.path) || !bindings.assetStore?.saveBlobAsset || typeof bindings.toAssetUrl !== 'function') throw new Error('原画布素材缓存绑定缺失');
  const raw = await bindings.invoke('read_file_bytes', { filePath: output.path });
  const { bytes, mime } = mediaMimeFromBytes(raw, output.kind);
  const blob = new Blob([bytes], { type: mime });
  if (output.kind === 'image' && typeof createImageBitmap === 'function') { const image = await createImageBitmap(blob); image.close(); }
  const saved = await bindings.assetStore.saveBlobAsset(output.assetId, blob, 'file://aiyouplus-model/' + encodeURIComponent(output.path), 'local', { silent: true, forceReplace: true });
  if (!saved) throw new Error('原画布素材缓存写入失败；下载文件仍保存在本机');
  const url = bindings.toAssetUrl(output.path);
  if (!nativePath(url)) throw new Error('本地下载媒体地址无法用于画布');
  return { url, assetId: output.assetId, path: output.path, mimeType: mime };
}
function normalizedDuration(value) {
  if (value === undefined || value === null || value === '') return 5;
  const duration = Number(String(value).replace(/s$/i, ''));
  if (!Number.isFinite(duration) || duration <= 0) throw new Error('视频时长无效');
  return duration;
}
function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 16384) binary += String.fromCharCode(...bytes.subarray(i, i + 16384));
  return btoa(binary);
}
function sourceLocalPath(source, nodes) {
  const direct = nativePath(source);
  if (direct) return direct;
  const node = nodes.find(item => item.content === source || item.thumbnailUrl === source || item.settings?._blobUrl === source);
  const settings = node?.settings || {};
  return [node?._localFilePath, settings._localFilePath, settings.localFilePath, settings.aiyouplusLocalPath].find(absolutePath) || null;
}
export async function readCanvasReferenceAsset(assetId, bindings) {
  if (!bindings?.assetStore?.getAssetBlob) throw new Error('本地参考素材读取入口尚未就绪');
  if (bindings.isThumbnailAsset?.(assetId)) throw new Error('参考素材是缩略图，请使用本地原图');
  await bindings.localCache?.ensureRestored?.();
  const meta = bindings.localCache?.getAssetManifestMeta?.(assetId);
  const thumbnailPath = value => /(?:^|\/)thumbnails(?:\/|$)/i.test(String(value || '').replace(/\\/g, '/'));
  if (thumbnailPath(meta?.fileName) || String(meta?.cacheSubdir || '').toLowerCase() === 'thumbnails') throw new Error('参考素材仅有缩略图，请重新导入原图');
  // Both store methods read the exact local ID from the cache/IndexedDB. Do not
  // use display-URL resolvers: they can return thumbnails or fetch a remote URL.
  const record = await bindings.assetStore.getAssetRecord?.(assetId);
  if (String(record?.cacheSubdir || '').toLowerCase() === 'thumbnails') throw new Error('参考素材仅有缩略图，请重新导入原图');
  const blob = record?.blob || await bindings.assetStore.getAssetBlob(assetId);
  if (!blob) throw new Error('本地参考素材原件缺失，请重新导入');
  return blob;
}
export function createCanvasModelAdapter(options = {}) {
  const invoke = options.invoke || ((command, args = {}) => globalThis.window.__TAURI_INTERNALS__.invoke(command, args));
  const eventTarget = options.eventTarget || globalThis.window;
  const active = new Map();
  let referenceAssets = options.referenceAssets;
  let apiManager, currentConfig, refreshPending, modelUnsubscribe, applyingModels = false, disposed = false;
  const supports = node => Boolean(NODE_KINDS[node?.type] && getNativeMediaModel(node.settings?.model));
  function applyModels() {
    if (!apiManager || disposed || applyingModels) return [];
    applyingModels = true;
    try {
    const profiles=currentConfig?.profiles||{};
    configuredModels=Object.values(profiles).filter(profile=>!profile.legacyArchived).flatMap(profile=>(profile.modelCatalog||[]).map(row=>{
      const type=({chat:'Chat',image:'Image',video:'Video',audio:'Speech',music:'Music'})[row.kind];
      const previous=ALL_MODELS.find(model=>model.nativeService===profile.provider&&model.modelName===row.id&&model.type===type);
      const schema=row.parameterSchema||{},defaults=row.parameters||{};
      return{...previous,id:previous?.id||serviceModelId(profile.provider,row.kind,row.id),modelName:row.id,type,nativeService:profile.provider,provider:row.name+' · '+profile.name,
        inputModalities:row.inputModalities||['text'],maxReferences:row.maxReferences??(row.inputModalities?.includes('image')?5:0),parameters:defaults,parameterSchema:schema,referencePurpose:row.referencePurpose,genericProtocol:profile.protocol,
        ratios:schema.aspectRatio?.enum,resolutions:schema.resolution?.enum,durations:schema.duration?.enum?.map(x=>String(x)+'s'),voices:schema.voiceId?.enum||previous?.voices||[],defaultVoice:defaults.voiceId??previous?.defaultVoice};
    }));
    const configs = apiManager.getConfigs(), ids = new Set([...ALL_MODELS,...configuredModels].map(model => model.id));
    const retained = []; // DSH owns all available models; recovered remote entries are not published.
    // Old Wuread IDs remain recognizable so old nodes fail visibly instead of
    // falling through to recovered remote transports. They are never published.
    const candidates=configuredModels;
    const models = candidates.map(model => {
      const previous = configs.find(config => config.id === model.id);
      const profile = nativeProviderProfile(currentConfig, model.nativeService);
      const inactive = Boolean(currentConfig && (!profile || profile.enabled===false || profile.legacyArchived || profile.hasKey === false&&profile.authType!=='none'));
      return { ...model, enabled: !inactive && (previous?.enabled !== false || previous?.nativeProviderInactive === true),
        nativeProviderInactive: inactive, isCustom: false, apiProviderId: 'aiyouplus-native',
        nativeTransport: 'aiyouplus_model_generate', key: '', url: '', followGlobalBaseUrl: false, requestMode: 'sync' };
    });
    const next = [...retained, ...models.filter(model => !model.nativeProviderInactive), ...models.filter(model => model.nativeProviderInactive)];
    if (JSON.stringify(configs) !== JSON.stringify(next)) apiManager.updateConfigs(next);
    return models;
    } finally { applyingModels = false; }
  }
  async function refreshModels() {
    if (refreshPending) return refreshPending;
    refreshPending = (async () => { currentConfig = await invoke('aiyouplus_model_config'); return applyModels(); })();
    try { return await refreshPending; } finally { refreshPending = null; }
  }
  function registerModels(manager, bindings = {}) {
    if (!manager?.getConfigs || !manager?.updateConfigs) throw new Error('原画布模型管理器不可用');
    if (bindings.referenceAssets) referenceAssets = bindings.referenceAssets;
    if (apiManager !== manager) { modelUnsubscribe?.(); apiManager = manager; modelUnsubscribe = manager.subscribe?.(() => applyModels()); }
    const models = applyModels();
    void refreshModels().catch(() => {});
    return models;
  }
  async function localReference(source, context) {
    const nodes = context.nodesRef?.current || context.nodes || [];
    let blob;
    if (typeof source === 'string' && source.startsWith('local-asset://')) {
      let assetId;
      try { assetId = decodeURIComponent(source.slice('local-asset://'.length).trim()); } catch { throw new Error('本地参考素材编号编码无效'); }
      if (!assetId || /[\u0000-\u001f\u007f]/.test(assetId)) throw new Error('本地参考素材编号无效');
      // The canonical cache is authoritative after save/reopen, even when an
      // input node still contains a stale original-file path.
      blob = await readCanvasReferenceAsset(assetId, referenceAssets);
    } else {
      const local = sourceLocalPath(source, nodes);
      if (local) return { kind: 'path', value: local };
      if (FORBIDDEN.test(String(source))) throw new Error('参考素材属于已禁用的七牛服务，请改用本地文件');
      const remote = remoteUrl(source);
      if (remote) return { kind: 'url', value: remote };
      if (typeof source !== 'string' || !/^(blob:|data:image\/)/.test(source)) throw new Error('参考素材无法解析为本地图片或有效URL，请重新导入');
      const response = await (options.fetch || globalThis.fetch)(source);
      if (!response.ok) throw new Error('本地参考素材读取失败');
      blob = await response.blob();
    }
    // Blob/data references are materialized before submission, so resume records
    // contain a durable absolute file path instead of a renderer-lifetime blob URL.
    if (!blob.size || blob.size > 20 * 1024 * 1024 || !blob.type.startsWith('image/')) throw new Error('参考图片为空、不是图片或超过20 MiB');
    if (options.validateImage) await options.validateImage(blob);
    else if (typeof createImageBitmap === 'function') { const image = await createImageBitmap(blob); if (!image.width || !image.height) throw new Error('参考图片没有有效尺寸'); image.close(); }
    const { directory } = await invoke('aiyouplus_local_status');
    if (!absolutePath(directory)) throw new Error('本地素材工作目录尚未就绪');
    const ext = ({ 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' })[blob.type] || 'png';
    const file = directory.replace(/[\\/]+$/, '') + '/assets/canvas-reference-' + uuid() + '.' + ext;
    await invoke('write_base64_to_file', { path: file, base64Data: bytesToBase64(new Uint8Array(await blob.arrayBuffer())) });
    return { kind: 'path', value: file };
  }
  async function stop(nodeId) {
    const task = active.get(nodeId);
    if (!task) return { stoppedWaiting: false, remoteTaskCancelled: false };
    task.stopped = true;
    return invoke('aiyouplus_model_stop', { requestId: task.requestId });
  }
  async function generateChat(context) {
    const publicConfig = await invoke('aiyouplus_model_config');
    const model = chatModel(context.modelId || context.model, 'host');
    if (!model) throw new Error('请选择已接入的本地模型接口');
    const config = nativeProviderProfile(publicConfig, model.nativeService);
    if(config?.enabled===false||config?.legacyArchived)throw new Error('所选服务已停用，请在模型配置中选择可用服务');
    if (!config?.hasKey&&config?.authType!=='none') throw new Error('未配置当前服务的 API Key；请在本地工作台的模型接口中录入');
    if (model.nativeService === 'wuread' && new URL(config.baseUrl).origin !== 'https://ai-mcp.wuread.cn') throw new Error('此画布模型使用Wuread官方接口，请先在模型接口中选择Wuread');
    const sources = context.references || [];
    if (sources.some(source => source.type && source.type !== 'image')) throw new Error('此文字节点入口当前接受文字与图片；视频请先在本地工作台抽帧后连接图片');
    if (sources.length > (model.maxReferences??5)) throw new Error('此文字节点入口最多接受'+(model.maxReferences??5)+'张参考图片');
    if (sources.length && !model.inputModalities.includes('image')) throw new Error('所选模型仅支持文字，请切换支持图片的模型');
    const paths = [], urls = [], order = [];
    for (const source of sources) {
      const ref = await localReference(source.url || source, context);
      if (ref.kind === 'path') { order.push({kind:'path',index:paths.length}); paths.push(ref.value); }
      else { order.push({kind:'url',index:urls.length}); urls.push(ref.value); }
    }
    const messages = context.messages;
    if (messages && !Array.isArray(messages)) throw new Error('对话消息必须为数组');
    const hasImages = messages?.some(message => Array.isArray(message.content) && message.content.some(part => part.type === 'image_url'));
    if (hasImages && !model.inputModalities.includes('image')) throw new Error('所选模型仅支持文字，请切换支持图片的模型');
    context.signal?.throwIfAborted();
    const requestId = 'chat-' + uuid();
    const abort = () => { void invoke('aiyouplus_model_stop', {requestId}).catch(() => {}); };
    context.signal?.addEventListener('abort',abort,{once:true});
    try {
      const args = {kind:'chat',provider:model.nativeService,model:model.modelName,prompt:context.prompt || '',requestId,
        ...(messages ? {messages} : {}), referencePaths:paths,referenceUrls:urls,referenceOrder:order};
      for (const key of ['tools','tool_choice','response_format','max_tokens','temperature']) if (context[key] !== undefined) args[key] = context[key];
      const result = await invoke('aiyouplus_model_generate',args);
      context.signal?.throwIfAborted();
      return result;
    } finally { context.signal?.removeEventListener('abort',abort); }
  }
  // Original parsers consume Response/SSE. A completed native response is adapted
  // here without claiming that the supplier streamed tokens in real time.
  async function chatResponse(context) {
    const result = await generateChat(context);
    const message = { role:'assistant', content:result.text || '', ...(result.toolCalls?.length ? {tool_calls:result.toolCalls} : {}) };
    const finish = result.finishReason || (result.toolCalls?.length ? 'tool_calls' : 'stop');
    const body = {choices:[{index:0,message,finish_reason:finish}], ...(result.usage ? {usage:result.usage} : {})};
    if (!context.stream) return new Response(JSON.stringify(body), {headers:{'Content-Type':'application/json','X-AIYOUPLUS-Delivery':'buffered'}});
    const chunk = {choices:[{index:0,delta:{...message,...(message.tool_calls ? {tool_calls:message.tool_calls.map((call,index)=>({...call,index}))} : {})},finish_reason:null}]};
    const completed = {choices:[{index:0,delta:{},finish_reason:finish}], ...(result.usage ? {usage:result.usage} : {})};
    return new Response('data: '+JSON.stringify(chunk)+'\n\ndata: '+JSON.stringify(completed)+'\n\ndata: [DONE]\n\n', {headers:{'Content-Type':'text/event-stream','X-AIYOUPLUS-Delivery':'buffered'}});
  }
  async function generate(context) {
    const node = context.node;
    const model = getNativeMediaModel(node?.settings?.model);
    if (!model) return { handled: false };
    const kind = NODE_KINDS[node.type] || 'image', mediaKind = kind === 'music' ? 'audio' : kind;
    const isCurrent = () => context.isCurrent?.() !== false;
    const update = patch => { if (isCurrent()) context.updateNode(node.id, patch); };
    const history = updater => { if (isCurrent()) context.setHistory?.(updater); };
    const currentSettings = () => (context.nodesRef?.current || context.nodes || []).find(item => item.id === node.id)?.settings || node.settings || {};
    const requestId = 'canvas-' + uuid(), startedAt = Date.now();
    const task = { requestId, stopped: false, isCurrent };
    const historyItem = { id: requestId, type: mediaKind, url: '', prompt: String(context.prompt ?? node.prompt ?? '').trim(), time: new Date(startedAt).toLocaleTimeString(), timestamp: startedAt, startTime: startedAt, status: 'generating', progress: 0, sourceNodeId: node.id, modelName: model.provider, apiConfig: { modelId: model.id, nativeTransport: 'aiyouplus_model_generate' } };
    let historyStarted = false;
    const patchHistory = patch => history(items => items.map(item => item.id === requestId ? { ...item, ...patch } : item));
    try {
      const previous = active.get(node.id);
      if (previous && previous.isCurrent()) return { handled: true, status: 'waiting', requestId: previous.requestId };
      if (!isCurrent()) return { handled: true, stale: true };
      // Reserve before any async validation to prevent two fast clicks submitting twice.
      active.set(node.id, task);
      if (!supports(node)) throw new Error('此模型入口用于对应的原画布图片、视频、语音或音乐生成节点');
      if(model.unavailable)throw new Error('模型所属服务已删除或未配置，请重新选择模型');
      const configuredModel = apiManager?.getConfigs().find(config => config.id === model.id);
      if (configuredModel?.enabled === false && !configuredModel.nativeProviderInactive) throw new Error('此模型已停用，请先在模型配置中启用');
      if (MODEL_KINDS[model.type] !== kind) throw new Error('模型与节点类型不一致，请重新选择模型');
      if (!historyItem.prompt) throw new Error('请填写提示词或连接上游文本');
      if (Number(node.settings.batchSize ?? node.settings.batchCount ?? 1) > 1) throw new Error('此原生模型入口每次生成1份结果，请将批量数量设为1');
      if (typeof context.cacheOutput !== 'function') throw new Error('本地素材缓存入口尚未接通，未提交模型请求');
      const publicConfig = await invoke('aiyouplus_model_config');
      const config = nativeProviderProfile(publicConfig, model.nativeService);
      if(config?.enabled===false||config?.legacyArchived)throw new Error('所选服务已停用，请重新配置或选择模型');
      if (!config?.hasKey&&config?.authType!=='none') throw new Error('未配置当前模型服务 API Key；请在本地工作台的模型接口中录入');
      if (model.nativeService === 'wuread' && new URL(config.baseUrl).origin !== 'https://ai-mcp.wuread.cn') throw new Error('此画布模型使用Wuread官方接口，请先在模型接口中选择Wuread');
      if (model.nativeService === 'minimax' && new URL(config.baseUrl).origin !== 'https://api.minimax.io') throw new Error('此画布模型使用MiniMax官方接口，请在模型接口中选择MiniMax');
      const sources = await context.getReferenceSources?.() || [];
      const maxReferences = model.maxReferences ?? (kind === 'image' ? 5 : 30);
      if (!Array.isArray(sources) || sources.length > maxReferences) throw new Error(model.nativeService === 'minimax' && kind === 'image' ? 'Image 01仅支持纯文生图或1张肖像参考，不支持通用多图改图' : '此模型最多支持' + maxReferences + '张参考图片');
      if (mediaKind === 'audio' && sources.length) throw new Error('当前语音/音乐入口不接受参考音频；请使用纯文本创作');
      if (kind === 'audio' && node.settings.speechTaskMode && node.settings.speechTaskMode !== 'tts') throw new Error('当前MiniMax原生入口仅支持文本配音，未接入音色克隆或设计');
      if (kind === 'music' && (node.settings.mode === 'extend' || node.settings.continueClipId || node.settings.continueAudioPublicUrl)) throw new Error('当前MiniMax原生入口支持新建歌曲/纯音乐，未接入旧音乐续写');
      const references = [];
      for (const source of sources) references.push(await localReference(source, context));
      if (!isCurrent()) return { handled: true, stale: true };
      if (task.stopped) throw new Error('已停止等待，尚未提交模型请求');
      const paths = [], urls = [], order = [];
      for (const ref of references) { if (ref.kind === 'path') { order.push({ kind: 'path', index: paths.length }); paths.push(ref.value); } else { order.push({ kind: 'url', index: urls.length }); urls.push(ref.value); } }
      context.recordTask?.(requestId);
      history(items => [historyItem, ...items]); historyStarted = true;
      update({ isGenerating: true, errorMsg: undefined, settings: { ...currentSettings(), isGenerating: true, progress: 0, error: null, aiyouplusModelRequestId: requestId } });
      const args = { kind, provider:model.nativeService, model: model.modelName, prompt: historyItem.prompt, requestId,
        ...(paths.length ? { referencePaths: paths } : {}), ...(urls.length ? { referenceUrls: urls } : {}),
        ...(paths.length && urls.length ? { referenceOrder: order } : {}),
      };
      if (kind === 'image' || kind === 'video') {
        args.aspectRatio = node.settings.ratio && node.settings.ratio !== 'Auto' ? node.settings.ratio : model.parameters?.aspectRatio || (kind === 'image' ? '1:1' : '16:9');
        if(model.genericProtocol&&model.genericProtocol!=='minimax-native'&&!Object.hasOwn(model.parameterSchema||{},'aspectRatio')&&!Object.hasOwn(model.parameters||{},'aspectRatio'))delete args.aspectRatio;
        if (model.ratios && !model.ratios.includes(args.aspectRatio)) throw new Error('此模型不支持所选画面比例，请重新选择');
        if (model.nativeService === 'minimax') {
          if (kind === 'video') {
            args.duration = normalizedDuration(node.settings.duration);
            args.resolution = !node.settings.resolution || node.settings.resolution === 'Auto' ? '2K' : node.settings.resolution;
            if (!Number.isInteger(args.duration) || args.duration < 5 || args.duration > 15) throw new Error('MiniMax H3当前入口支持5到15整数秒');
            if (args.resolution !== '2K') throw new Error('MiniMax H3当前入口使用2K，请重新选择分辨率');
          }
        } else if(model.nativeService==='wuread') {
          args.resolution = node.settings.resolution && node.settings.resolution !== 'Auto' ? node.settings.resolution : kind === 'image' ? '1K' : '720p';
          if (kind === 'video') args.duration = normalizedDuration(node.settings.duration);
        } else {
          if((Object.hasOwn(model.parameterSchema||{},'resolution')||Object.hasOwn(model.parameters||{},'resolution'))&&(node.settings.resolution&&node.settings.resolution!=='Auto'||model.parameters?.resolution))args.resolution=node.settings.resolution&&node.settings.resolution!=='Auto'?node.settings.resolution:model.parameters.resolution;
          if(kind==='video'&&(Object.hasOwn(model.parameterSchema||{},'duration')||Object.hasOwn(model.parameters||{},'duration'))&&(node.settings.duration||model.parameters?.duration)){
            const duration=normalizedDuration(node.settings.duration||model.parameters.duration);
            args.duration=model.parameterSchema?.duration?.type==='string'?String(duration):duration;
          }
        }
      } else if (kind === 'audio') {
        const genericAudio = model.genericProtocol && model.genericProtocol !== 'minimax-native';
        const declared = param => {
          const definition = model.parameterSchema?.[param];
          return definition?.mapped !== false && definition?.supported !== false &&
            (Object.hasOwn(model.parameterSchema || {}, param) || Object.hasOwn(model.parameters || {}, param));
        };
        // Recovered speech nodes always contain MiniMax defaults. A declarative
        // service receives only controls its own catalog exposes.
        if (!genericAudio || declared('voiceId')) {
          const voice = node.settings.voiceId || model.defaultVoice;
          if (voice !== undefined) args.voiceId = voice;
          if (model.voices?.length && !model.voices.includes(voice)) throw new Error('请选择当前模型目录中的音色；旧音色ID不适用于此接口');
        }
        for (const [setting,param] of [['speechSpeed','speed'],['speechVol','volume'],['speechPitch','pitch']]) {
          if ((!genericAudio || declared(param)) && node.settings[setting] !== undefined) args[param] = node.settings[setting];
        }
      } else if (kind === 'music') {
        args.instrumental = Boolean(node.settings.isInstrumental);
        const lyrics = String(node.settings.lyrics || '').trim();
        if (!args.instrumental && !lyrics) throw new Error('当前MiniMax音乐入口需要原创歌词，或选择纯音乐；尚未接入自动填词');
        if (!args.instrumental) args.lyrics = lyrics;
      }
      args.parameters={...(model.parameters||{}),...(node.settings.parameters||{})};
      const result = await invoke('aiyouplus_model_generate', args);
      if (!isCurrent()) return { handled: true, stale: true, paths: result.paths, taskId: result.taskId };
      if (task.stopped) throw new Error('已停止等待；远端任务未确认取消，已下载结果可在模型任务记录中查看');
      if (!Array.isArray(result.paths) || !result.paths.length || result.paths.some(file => !absolutePath(file))) throw new Error('模型未返回已下载的本地媒体文件');
      const outputs = [];
      for (let index = 0; index < result.paths.length; index++) {
        const file = result.paths[index], assetId = requestId + (index ? '_' + index : '');
        const cached = await context.cacheOutput({ path: file, kind:mediaKind, assetId, requestId, index });
        if (!cached || typeof cached.url !== 'string' || !nativePath(cached.url) || cached.assetId !== assetId) throw new Error('模型结果未完成真实本地缓存');
        outputs.push({ ...cached, path: file, assetId });
      }
      if (!isCurrent()) return { handled: true, stale: true, paths: result.paths, taskId: result.taskId };
      if (task.stopped) throw new Error('已停止等待；结果已缓存，可在模型任务记录中查看');
      const first = outputs[0], generated = outputs.map((output, index) => ({ id: output.assetId, thumbUrl: kind === 'image' ? output.url : '', fullUrl: output.url, url: output.url, createdAt: Date.now(), localPath: output.path }));
      const audioOutput = mediaKind === 'audio';
      const settings = { ...currentSettings(), isGenerating: false, progress: 100, error: null, errorMsg: undefined, _localCacheAssetId: first.assetId, _assetId: first.assetId, _contentAssetId: first.assetId, _localFilePath: first.path, aiyouplusLocalPath: first.path, aiyouplusModelRequestId: requestId, aiyouplusRemoteTaskId: result.taskId,
        ...(audioOutput ? {audioUrl:first.url,_audioAssetId:first.assetId,...(result.subtitle ? {subtitle:result.subtitle} : {})} : {generatedImages:generated}) };
      update({ content: first.url, _contentAssetId: first.assetId, _localFilePath: first.path, previewType: mediaKind, isGenerating: false, errorMsg: undefined,
        ...(kind === 'image' ? { selectedPreviewImage: first.url, previewMjImages: outputs.map(output => output.url) } : kind === 'video' ? { selectedPreviewVideo: first.url, previewMjVideos: outputs.map(output => output.url) } : {}), settings });
      patchHistory({ status: 'completed', progress: 100, url: first.url, _assetId: first.assetId, localPath: first.path, localPaths: result.paths, remoteTaskId: result.taskId, durationMs: Date.now() - startedAt,
        ...(audioOutput ? {audioUrl:first.url,_audioAssetId:first.assetId,nativeAudioKind:kind} : {}), ...(kind === 'image' ? { mjImages: outputs.map(output => output.url), _mjAssetIds: outputs.map(output => output.assetId) } : {}) });
      if (!audioOutput) await context.updatePreviews?.({ content: first.url, previewType: kind, taskId: requestId, extra: { sourceNodeName: node.nodeName, previewSourceModel: model.id, contentAssetId: first.assetId, ...(kind === 'image' ? { previewMjImages: outputs.map(output => output.url), previewMjAssetIds: outputs.map(output => output.assetId), selectedPreviewImage: first.url } : { previewMjVideos: outputs.map(output => output.url), selectedPreviewVideo: first.url }) } });
      return { handled: true, status: 'completed', requestId, taskId: result.taskId, paths: result.paths, outputs };
    } catch (error) {
      const message = errorText(error);
      update({ isGenerating: false, errorMsg: message, settings: { ...currentSettings(), isGenerating: false, progress: 0, error: message, errorMsg: message } });
      if (historyStarted) patchHistory({ status: 'failed', progress: 0, errorMsg: message, durationMs: Date.now() - startedAt });
      return { handled: true, status: 'failed', requestId, error: message, stale: !isCurrent() };
    } finally {
      if (active.get(node.id) === task) active.delete(node.id);
      if (isCurrent() && (!active.has(node.id) || active.get(node.id) === task)) context.finish?.();
    }
  }
  const onCancel = event => { const id = event.detail?.nodeId; if (id && active.has(id)) void stop(id).catch(() => {}); };
  eventTarget?.addEventListener?.('cancelPolling', onCancel);
  const onConfigChanged = () => { if(!disposed)void refreshModels().catch(() => {}); };
  eventTarget?.addEventListener?.('aiyouplus-model-config-changed', onConfigChanged);
  eventTarget?.addEventListener?.('focus',onConfigChanged);
  const channel=typeof window!=='undefined'&&typeof BroadcastChannel==='function'?new BroadcastChannel('aiyoudsh-media-models'):null;
  if(channel)channel.onmessage=event=>{if(event.data?.type==='configuration-changed')onConfigChanged();};
  function getDefaultModel(kind){if(kind==='chat')return configuredModels.find(m=>m.type==='Chat'&&m.nativeService==='host')?.id;const type=({chat:'Chat',image:'Image',video:'Video',audio:'Speech',music:'Music'})[kind],profile=currentConfig?.profiles?.[currentConfig?.provider];return configuredModels.find(m=>m.type===type&&m.nativeService===currentConfig?.provider&&m.modelName===profile?.models?.[kind])?.id||configuredModels.find(m=>m.type===type&&nativeProviderProfile(currentConfig,m.nativeService)?.enabled!==false)?.id;}
  return { version: 2, supports, registerModels, refreshModels, getDefaultModel, isNativeChat: isNativeChatModel, getMediaModel:getNativeMediaModel, chatResponse, generate, generateChat, stop, cacheOutput(output, bindings) { return cacheCanvasModelOutput(output, { invoke, ...bindings }); }, dispose() { disposed = true; channel?.close();modelUnsubscribe?.(); modelUnsubscribe = undefined; eventTarget?.removeEventListener?.('cancelPolling', onCancel); eventTarget?.removeEventListener?.('aiyouplus-model-config-changed', onConfigChanged);eventTarget?.removeEventListener?.('focus',onConfigChanged); } };
}
if (typeof window !== 'undefined') {
  const adapter = createCanvasModelAdapter();
  window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__ = adapter;
  window.dispatchEvent(new CustomEvent(ADAPTER_READY_EVENT));
}
