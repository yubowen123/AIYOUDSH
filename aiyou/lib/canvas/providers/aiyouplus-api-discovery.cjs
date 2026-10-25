'use strict';
// Public documentation discovery only. No credentials, business API probes,
// evaluated page code, generated SDKs or executable document instructions.
const {createHash}=require('node:crypto');
const {isIP}=require('node:net');
const {assertNetworkAllowed,isLoopbackUrl}=require('./aiyouplus-runtime.cjs');
const {validateServiceProfile}=require('./aiyouplus-provider-registry.cjs');
const {parseDocument,structuredLinks,mergeCatalogs}=require('./aiyouplus-discovery-documents.cjs');
const LIMITS=Object.freeze({documents:5,manifestDocuments:8,documentBytes:1024*1024,totalBytes:8*1024*1024,documentTimeoutMs:8000,totalTimeoutMs:30000,redirects:3});
const KINDS=['chat','image','video','audio','music'];
const PROTOCOLS=['openai-compatible','http-json','anthropic-messages','minimax-native'];
const FORBIDDEN=/qiniu|qnaigc|七牛/i;
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o||{},k);
const digest=s=>createHash('sha256').update(s).digest('hex');
const issue=(code,message)=>({code,message});
const clean=s=>String(s||'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
function redact(text){return String(text).replace(/Bearer\s+[^\s"'<>\\]+/gi,'Bearer [redacted]').replace(/((?:X-API-Key|api[_-]?key|secret|access[_-]?token|authorization)["']?\s*[:=]\s*["']?)[^\s"'<>;,\\]+/gi,'$1[redacted]');}
function checkUrl(value,base,allowLoopback=false){
  const u=new URL(String(value),base);u.hash='';
  if(!['http:','https:'].includes(u.protocol)||u.username||u.password)throw new Error('文档地址须为不带凭证的HTTP(S) URL');
  const h=u.hostname.toLowerCase().replace(/\.$/,'').replace(/^\[|\]$/g,'');
  if((isLoopbackUrl(u.href)&&!allowLoopback)||(/\.(?:local|internal)$/.test(h)))throw new Error('公开文档不能跳转到本机或内部地址');
  if(u.protocol==='http:'&&!isLoopbackUrl(u.href))throw new Error('公开远程文档须使用HTTPS');
  if(isIP(h)===4&&!isLoopbackUrl(u.href)){
    const [a,b]=h.split('.').map(Number);
    if(a===0||a===10||a===169&&b===254||a===172&&b>=16&&b<=31||a===192&&b===168||a===100&&b>=64&&b<=127||a>=224)throw new Error('不读取私有网络或元数据地址');
  }
  if(isIP(h)===6&&(/^(?:fc|fd|fe[89ab])/i.test(h)||h==='::'||h.startsWith('::ffff:')))throw new Error('不读取私有网络或元数据地址');
  for(const k of u.searchParams.keys())if(/^(?:api[_-]?key|key|token|access[_-]?token|authorization|secret|password)$/i.test(k))throw new Error('公开文档URL不能携带凭证参数');
  assertNetworkAllowed(u.href,false);return u;
}
function safePath(value){
  return typeof value==='string'&&value.startsWith('/')&&!value.startsWith('//')&&!/[\r\n\\?#]/.test(value)&&!value.split('/').some(s=>{try{return decodeURIComponent(s)==='..';}catch{return true;}});
}
function jsonPath(value){return typeof value==='string'&&value.length<=240&&/^[A-Za-z_$][\w$]*(?:\.(?:[A-Za-z_$][\w$]*|\d+))*$/.test(value)&&!value.split('.').some(k=>['__proto__','prototype','constructor'].includes(k));}
function selectorPath(value){return typeof value==='string'&&jsonPath(value.replace(/\.\*(?=\.|$)/g,'.0'));}
function safeJson(value,depth=0){
  if(depth>20)throw new Error('建议JSON嵌套过深');
  if(value===null||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return value;
  if(typeof value==='string'){
    if(value.length>64000||/\$\{|<%/.test(value))throw new Error('不支持可执行模板');
    for(const m of value.matchAll(/\{\{([\s\S]*?)\}\}/g))if(!jsonPath(m[1].trim()))throw new Error('模板变量须为简单安全路径');
    return value;
  }
  if(Array.isArray(value)){if(value.length>128)throw new Error('建议数组过长');return value.map(v=>safeJson(v,depth+1));}
  if(value&&typeof value==='object'){
    if(Object.keys(value).length>128)throw new Error('建议对象过大');const out={};
    for(const [k,v]of Object.entries(value)){if(['__proto__','prototype','constructor'].includes(k))throw new Error('建议含不安全对象键');out[k]=safeJson(v,depth+1);}return out;
  }
  throw new Error('建议须为纯JSON');
}
function normalizeCatalog(input){
  if(!Array.isArray(input)||input.length>512)throw new Error('模型目录须为最多512项的数组');
  return input.map(row=>{
    if(!row||typeof row.id!=='string'||!row.id.trim()||row.id.length>160||FORBIDDEN.test(row.id+' '+(row.name||''))||!KINDS.includes(row.kind))throw new Error('模型标识或能力无效/属于禁用供应商');
    if(row.request?.method!=='POST'||!safePath(row.request.path)||!row.request.template||typeof row.request.template!=='object'||Array.isArray(row.request.template))throw new Error('模型请求须为相对路径POST和JSON模板');
    const response={};for(const key of ['textPath','urlsPath','base64Path','taskIdPath','statusPath','errorPath'])if(row.response?.[key]!==undefined){if(!selectorPath(row.response[key]))throw new Error('响应字段不是安全JSON路径');response[key]=row.response[key];}
    if(row.response?.binary!==undefined){if(typeof row.response.binary!=='boolean')throw new Error('binary须为布尔值');response.binary=row.response.binary;}
    if(row.response?.mimeType!==undefined){if(!/^(?:image|audio|video)\/[a-z0-9.+-]+$/i.test(row.response.mimeType))throw new Error('媒体MIME无效');response.mimeType=row.response.mimeType;}
    const out={id:row.id.trim(),name:String(row.name||row.id).slice(0,180),kind:row.kind,request:{method:'POST',path:row.request.path,template:safeJson(row.request.template)},response};
    if(row.request.optionalFields!==undefined){
      if(!Array.isArray(row.request.optionalFields)||row.request.optionalFields.some(key=>typeof key!=='string'||!own(out.request.template,key)||!/^\{\{[A-Za-z_$][\w$]*(?:\.[A-Za-z_$0-9][\w$]*)*\}\}$/.test(out.request.template[key])||row.parameterSchema?.[key]?.required))throw new Error('可选请求字段须为已声明的安全占位映射且不得省略必填字段');
      out.request.optionalFields=[...new Set(row.request.optionalFields)];
    }
    if(row.polling){const q=row.polling;if(q.method!=='GET'||!safePath(q.path)||!q.path.includes('{{taskId}}')||!selectorPath(q.statusPath)||!selectorPath(q.urlsPath)||![q.completedValues,q.failedValues].every(v=>Array.isArray(v)&&v.length&&v.length<=20&&v.every(x=>typeof x==='string'&&x.length<=80)))throw new Error('轮询须有明确GET路径、状态枚举和结果字段');out.polling={method:'GET',path:q.path,statusPath:q.statusPath,completedValues:[...q.completedValues],failedValues:[...q.failedValues],urlsPath:q.urlsPath};}
    if(row.parameters)out.parameters=safeJson(row.parameters);
    if(row.parameterSchema)out.parameterSchema=safeJson(row.parameterSchema);
    if(row.inputModalities){if(!Array.isArray(row.inputModalities)||row.inputModalities.some(x=>!['text','image','video','audio'].includes(x)))throw new Error('输入模态无效');out.inputModalities=[...new Set(row.inputModalities)];}
    if(row.maxReferences!==undefined){if(!Number.isInteger(row.maxReferences)||row.maxReferences<0||row.maxReferences>100)throw new Error('参考数量无效');out.maxReferences=row.maxReferences;}
    if(row.maskSupported!==undefined){if(typeof row.maskSupported!=='boolean')throw new Error('蒙版能力须为布尔值');out.maskSupported=row.maskSupported;}
    return out;
  });
}
function publicProfile(raw,docUrl,allowLoopback){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('分析建议须为对象');
  const u=checkUrl(raw.baseUrl,docUrl,allowLoopback);if(u.search||u.hash)throw new Error('API基础地址不能带查询参数');
  if(!PROTOCOLS.includes(raw.protocol)||!['bearer','api-key','none'].includes(raw.authType))throw new Error('协议或鉴权类型无效');
  const header=raw.authType==='none'?'':String(raw.authHeader|| (raw.authType==='bearer'?'Authorization':''));
  if(raw.authType!=='none'&&(!/^[!#$%&'*+.^_`|~\w-]{1,100}$/.test(header)||/^(?:host|cookie|set-cookie|content-length|connection|proxy-authorization|transfer-encoding)$/i.test(header)))throw new Error('鉴权头无效');
  const modelCatalog=normalizeCatalog(raw.modelCatalog||[]),models={};
  for(const kind of KINDS)if(raw.models?.[kind]&&modelCatalog.some(m=>m.id===raw.models[kind]&&m.kind===kind))models[kind]=raw.models[kind];
  for(const m of modelCatalog)models[m.kind]??=m.id;
  const test=/^(?:ai-mcp(?:-stage)?\.wuread\.cn)$/i.test(u.hostname)||raw.scope==='test';
  const profile={name:String(raw.name||new URL(docUrl).hostname).slice(0,120),baseUrl:u.href.replace(/\/$/,''),protocol:raw.protocol,authType:raw.authType,authHeader:header,scope:test?'test':'production',docsUrl:docUrl,modelCatalog,models};
  return {...validateServiceProfile(profile,{sessionOnly:test}),...(test?{sessionOnly:true}:{})};
}
function docLinks(text,url){
  const links=[];
  for(const m of text.matchAll(/(?:href|url)\s*[:=]\s*["']([^"']+)["']/gi))links.push(m[1]);
  for(const m of text.matchAll(/\]\(([^)\s]+)\)/g))links.push(m[1]);
  for(const m of text.matchAll(/https?:\/\/[^\s<>"'`]+(?:llms(?:-full)?\.txt|openapi\.json|swagger\.json|models\.json)(?:[?#][^\s<>"'`]*)?/gi))links.push(m[0]);
  return [...new Set(links)].filter(s=>!s.startsWith('#')&&/(?:openapi|swagger|api-docs|llms\.txt|\.md(?:[?#]|$)|\.ya?ml(?:[?#]|$)|\.json(?:[?#]|$))/i.test(s)&&!/(?:node_modules|package(?:-lock)?\.json|manifest\.json|\.js(?:[?#]|$))/i.test(s)).slice(0,25).flatMap(s=>{try{return [new URL(s,url).href];}catch{return [];}});
}
function abortable(promise,signal){
  signal.throwIfAborted();return new Promise((resolve,reject)=>{
    const abort=()=>reject(signal.reason||new Error('已停止文档读取'));signal.addEventListener('abort',abort,{once:true});
    Promise.resolve(promise).then(resolve,reject).finally(()=>signal.removeEventListener('abort',abort));
  });
}
async function fetchDoc(address,options,state){
  let url=checkUrl(address,undefined,state.allowLoopback).href;
  const signal=AbortSignal.any([state.signal,AbortSignal.timeout(LIMITS.documentTimeoutMs)]);
  for(let n=0;n<=LIMITS.redirects;n++){
    const response=await abortable(options.fetch(url,{method:'GET',headers:{Accept:'text/html,application/json,text/plain,application/yaml,text/yaml'},redirect:'manual',credentials:'omit',signal}),signal);
    if(response.status>=300&&response.status<400){const location=response.headers.get('location');await response.body?.cancel?.().catch(()=>{});if(!location||n===LIMITS.redirects)throw new Error('文档重定向次数过多或缺少地址');url=checkUrl(location,url,state.allowLoopback).href;continue;}
    if(!response.ok){await response.body?.cancel?.().catch(()=>{});throw new Error('公开文档读取失败（HTTP '+response.status+'）');}
    const type=(response.headers.get('content-type')||'').split(';')[0].toLowerCase();
    if(type&&!/json|html|text|yaml|octet-stream/.test(type)){await response.body?.cancel?.().catch(()=>{});throw new Error('返回内容不是文档文本');}
    const announced=Number(response.headers.get('content-length')||0);if(announced>LIMITS.documentBytes){await response.body?.cancel?.().catch(()=>{});throw new Error('单份文档超过1 MiB');}
    const chunks=[];let size=0;
    if(response.body?.[Symbol.asyncIterator]){
      const iterator=response.body[Symbol.asyncIterator]();
      try{for(;;){const part=await abortable(iterator.next(),signal);if(part.done)break;const b=Buffer.from(part.value);size+=b.length;if(size>LIMITS.documentBytes||state.bytes+size>LIMITS.totalBytes)throw new Error('文档字节数超过上限');chunks.push(b);}}
      finally{if(iterator.return)void Promise.resolve(iterator.return()).catch(()=>{});}
    }
    else{const b=Buffer.from(await abortable(response.text(),signal));size=b.length;if(size>LIMITS.documentBytes||state.bytes+size>LIMITS.totalBytes)throw new Error('文档字节数超过上限');chunks.push(b);}
    state.bytes+=size;return {url,contentType:type,text:Buffer.concat(chunks).toString('utf8'),bytes:size,sha256:digest(Buffer.concat(chunks))};
  }
}
function resolveRef(root,value,depth=0){
  if(!value||typeof value!=='object'||depth>15)return {};
  if(value.$ref){if(typeof value.$ref!=='string'||!value.$ref.startsWith('#/'))return {};let target=root;for(const raw of value.$ref.slice(2).split('/')){const key=raw.replace(/~1/g,'/').replace(/~0/g,'~');if(['__proto__','prototype','constructor'].includes(key)||!own(target,key))return {};target=target[key];}return resolveRef(root,target,depth+1);}
  if(value.allOf){const merged={...value,properties:{},required:[]};for(const part of value.allOf){const r=resolveRef(root,part,depth+1);Object.assign(merged.properties,r.properties||{});merged.required.push(...(r.required||[]));}delete merged.allOf;return merged;}
  return value;
}
function sampleSchema(value){
  if(Array.isArray(value))return {type:'array',items:sampleSchema(value[0])};
  if(value&&typeof value==='object')return {type:'object',properties:Object.fromEntries(Object.entries(value).filter(([k])=>!['__proto__','prototype','constructor'].includes(k)).map(([k,v])=>[k,sampleSchema(v)]))};
  return {type:typeof value,...(typeof value==='string'?{example:value}:{})};
}
function fields(root,schema,prefix='',depth=0){
  if(depth>12)return [];const s=resolveRef(root,schema),out=[];
  if(prefix)out.push({path:prefix,...s});
  if(s.properties)for(const [key,value]of Object.entries(s.properties))if(jsonPath(prefix?prefix+'.'+key:key))out.push(...fields(root,value,prefix?prefix+'.'+key:key,depth+1));
  if(s.type==='array'&&s.items)out.push(...fields(root,s.items,prefix+'.0',depth+1));
  return out;
}
function schemaResponse(root,operation){
  const map=operation.responses||{},key=Object.keys(map).find(k=>/^20\d$/.test(k));const response=resolveRef(root,map[key]||{});
  const content=response.content||{};const media=content['application/json']||content[Object.keys(content).find(k=>k.endsWith('+json'))];
  const example=media?.example||Object.values(media?.examples||{})[0]?.value||response.examples?.['application/json'];
  const binaryType=Object.keys(content).find(k=>/^(?:image|audio|video)\//.test(k))||(operation.produces||root.produces||[]).find(k=>/^(?:image|audio|video)\//.test(k));
  return {schema:resolveRef(root,media?.schema||response.schema||(example?sampleSchema(example):{})),binary:!media&&Boolean(binaryType)||response.schema?.type==='file',mimeType:binaryType};
}
function responsePaths(root,schema){
  const list=fields(root,schema).filter(field=>!/(?:^|\.)(?:media_retention|retention|request|input|reference|thumbnail|last_frame)(?:[._]|$)/i.test(field.path)),paths=list.map(f=>f.path),result={};
  const pick=re=>paths.find(p=>re.test(p));
  const text=paths.includes('choices.0.message.content')?'choices.0.message.content':pick(/^(?:text|output_text|data\.text|content\.0\.text)$/);
  if(text)result.textPath=text;
  const urls=list.find(f=>f.type==='array'&&(resolveRef(root,f.items).type==='string'&&/(?:urls?|images|videos|outputs|data)$/i.test(f.path)||resolveRef(root,f.items).properties?.url));
  const url=urls?.path||pick(/(?:^|\.)(?:url|audioUrl|videoUrl|imageUrl|audio_url|video_url)$/);
  if(url)result.urlsPath=url;
  const b64=pick(/(?:^|\.)(?:b64_json|base64|audio_base64)$/);if(b64)result.base64Path=b64.replace(/\.0(?=\.)/g,'.*');
  const describedId=list.find(field=>/(?:^|\.)id$/.test(field.path)&&/\btask\s*(?:id|identifier)\b|任务\s*(?:ID|标识)/i.test(field.description||''));
  const task=describedId?.path||pick(/(?:^|\.)(?:taskId|task_id|job_id)$/);if(task)result.taskIdPath=task;
  const status=pick(/(?:^|\.)(?:status|state)$/);if(status)result.statusPath=status;
  const error=pick(/(?:^|\.)(?:errorMessage|error_message|error\.message|error)$/);if(error)result.errorPath=error;
  return result;
}
function requestSchema(root,operation){
  const r=resolveRef(root,operation.requestBody);return resolveRef(root,r?.content?.['application/json']?.schema||operation.parameters?.find(p=>p.in==='body')?.schema||{});
}
function kindOf(route,operation,response){
  const words=route+' '+(operation.operationId||'')+' '+(operation.summary||'')+' '+(operation.tags||[]).join(' ');
  if(/transcriptions|transcribe|speech.to.text|\bSTT\b|embeddings|rerank|translations/i.test(words))return null;
  if(/music|歌曲|音乐/i.test(words))return 'music';
  if(/video|视频/i.test(words)||/video/i.test(response.urlsPath||''))return 'video';
  if(/image|图像|图片/i.test(words)||/image/i.test(response.urlsPath||''))return 'image';
  if(/audio|speech|tts|语音|音频/i.test(words))return 'audio';
  if(/chat|messages|responses|对话/i.test(words)||response.textPath)return 'chat';return null;
}
function authFor(root,operation){
  const security=operation.security??root.security;
  if(security===undefined||Array.isArray(security)&&security.length===0)return {authType:'none',authHeader:''};
  const definitions=root.components?.securitySchemes||root.securityDefinitions||{};
  for(const alternative of security||[]){if(Object.keys(alternative).length!==1)continue;const def=resolveRef(root,definitions[Object.keys(alternative)[0]]);
    if(def.type==='http'&&String(def.scheme).toLowerCase()==='bearer')return {authType:'bearer',authHeader:'Authorization'};
    if(def.type==='apiKey'&&def.in==='header'&&def.name)return {authType:'api-key',authHeader:def.name};
  }
  return null;
}
function templateFor(root,schema,{mapOptional=false}={}){
  const s=resolveRef(root,schema),template={},parameters={},parameterSchema={},unfilled=[],unmapped=[],optionalFields=[];
  const references={image_url:'firstFrame',image_urls:'referenceImageUrls',reference_image_urls:'referenceImageUrls',reference_images:'referenceImageUrls',video_url:'referenceVideoUrls.0',video_urls:'referenceVideoUrls',audio_url:'referenceAudioUrls.0',audio_urls:'referenceAudioUrls',start_image:'firstFrame',end_image:'lastFrame',mask_url:'maskImageUrl'};
  for(const [key,raw]of Object.entries(s.properties||{})){
    if(['__proto__','prototype','constructor'].includes(key))continue;const p=resolveRef(root,raw),required=(s.required||[]).includes(key);
    parameterSchema[key]={type:p.type||'unknown',required,...(p.enum?{enum:p.enum}:{}),...(p.default!==undefined?{default:p.default}:{}),...(p.minimum!==undefined?{minimum:p.minimum}:{}),...(p.maximum!==undefined?{maximum:p.maximum}:{})};
    if(p.default!==undefined)parameters[key]=p.default;else if(required&&p.enum?.length===1)parameters[key]=p.enum[0];
    if(key==='model')template[key]='{{model}}';else if(['prompt','text','input'].includes(key)&&p.type!=='array'&&p.type!=='object')template[key]='{{prompt}}';
    else if(key==='messages')template[key]='{{messages}}';
    else if(required||own(parameters,key)){
      // Keep document defaults in parameters, not as fixed request literals:
      // buildGenericRequest overlays the user's values before rendering.
      template[key]='{{parameters.'+key+'}}';if(required&&!own(parameters,key))unfilled.push(key);
    }
    else if(mapOptional&&(['string','number','integer','boolean','array','object'].includes(p.type)||p.oneOf||p.anyOf)){template[key]='{{'+(references[key]||'parameters.'+key)+'}}';optionalFields.push(key);}
    parameterSchema[key].mapped=own(template,key);
    if(!required&&!parameterSchema[key].mapped)unmapped.push(key);
  }
  return {template,parameters,parameterSchema,unfilled,unmapped,optionalFields};
}
function identifyProtocol(routes){
  if(routes.some(p=>/\/chat\/completions$/.test(p)))return 'openai-compatible';
  if(routes.some(p=>/\/messages$/.test(p)))return 'anthropic-messages';
  if(routes.some(p=>/^\/v2\/video_generation$/.test(p)))return 'minimax-native';return 'http-json';
}
function refinePublicModel(row,metadata,route,reasons){
  if(!metadata)return row;
  const meta=metadata.metadata||{},contract=meta.public_contract||meta.request_format_details||meta.public_contract_summary||meta.request_format_summary||{};
  const primary={image:'text-to-image',video:'text-to-video',audio:'tts',music:'music',chat:'chat'}[row.kind];
  const constraint=(contract.operation_constraints||[]).find(value=>value.operation===primary&&(!value.request_endpoint||value.request_endpoint===route));
  const source=constraint||contract,supported=source.supported_parameters||contract.supported_parameters;
  if(row.kind==='audio'&&(!Array.isArray(supported)||!supported.length))reasons.push(issue('AUDIO_MODEL_CONTRACT_REQUIRED','语音模型尚缺公开的模型级参数和音色合同，请补充该模型详情后配置'));
  const operationEndpoints=contract.request_endpoint_by_operation||{},localOperations=(metadata.operations||[]).filter(operation=>!operationEndpoints[operation]||operationEndpoints[operation]===route);
  const documented=source.documented_inputs;
  const knownInputs=['text'];
  for(const operation of localOperations){if(/^(?:image-to-|image-edit|start-end-to-video)/.test(operation))knownInputs.push('image');if(operation==='video-to-video')knownInputs.push('video');if(operation==='audio-to-video')knownInputs.push('audio');}
  const inputModalities=[...new Set(Array.isArray(documented)&&documented.length?documented.filter(kind=>['text','image','video','audio'].includes(kind)):knownInputs)];
  const mediaInputs=inputModalities.some(kind=>kind!=='text'),limits=Object.entries(source.input_limits||{}).filter(([key])=>/image|reference/i.test(key)).map(([,value])=>value?.maxItems).filter(value=>Number.isInteger(value)&&value>0&&value<=64);
  row={...row,inputModalities,maxReferences:mediaInputs?(limits.length?Math.min(...limits):1):0,maskSupported:mediaInputs&&Array.isArray(supported)&&supported.some(key=>/^(?:mask|mask_url|mask_image)$/.test(key))};
  if(!Array.isArray(supported)||!supported.length)return row;
  const allowed=new Set(['model',...supported]),template=Object.fromEntries(Object.entries(row.request.template).filter(([key])=>allowed.has(key))),parameters=Object.fromEntries(Object.entries(row.parameters).filter(([key])=>allowed.has(key))),parameterSchema=Object.fromEntries(Object.entries(row.parameterSchema).filter(([key])=>allowed.has(key)).map(([key,value])=>[key,{...value}]));
  let optionalFields=(row.request.optionalFields||[]).filter(key=>own(template,key));
  for(const [key,values]of Object.entries(source.parameter_options||{}))if(parameterSchema[key]&&Array.isArray(values)&&values.length<=128){parameterSchema[key].enum=values;if(parameterSchema[key].type==='unknown'&&values.every(value=>typeof value==='string'))parameterSchema[key].type='string';}
  for(const [key,range]of Object.entries(source.parameter_ranges||{}))if(parameterSchema[key]&&range&&typeof range==='object')for(const field of ['minimum','maximum'])if(typeof range[field]==='number')parameterSchema[key][field]=range[field];
  for(const [key,value]of Object.entries(source.parameter_defaults||{}))if(parameterSchema[key])parameters[key]=value;
  for(const [key,note]of Object.entries(source.parameter_notes||{}))if(parameterSchema[key]){
    parameterSchema[key].description=String(note).slice(0,1000);
    if(/(?:no uniform|not verified|no.*default.*guaranteed)/i.test(note)&&!/verified default/i.test(note)){
      delete parameters[key];if(own(template,key)&&!parameterSchema[key].required&&!optionalFields.includes(key))optionalFields.push(key);
    }
  }
  for(const key of source.required_selectors||contract.required_selectors||[])if(parameterSchema[key]){
    parameterSchema[key].required=true;optionalFields=optionalFields.filter(value=>value!==key);
    if(!own(parameters,key))reasons.push(issue('REQUIRED_PARAMETERS','该模型需要用户填写参数：'+key));
  }
  for(const [key,value]of Object.entries(parameters)){
    const schema=parameterSchema[key];if(!schema)continue;
    const invalid=schema.enum&&!schema.enum.some(allowed=>JSON.stringify(allowed)===JSON.stringify(value))||typeof value==='number'&&(value<(schema.minimum??-Infinity)||value>(schema.maximum??Infinity));
    if(!invalid)continue;
    if(schema.required)reasons.push(issue('MODEL_DEFAULT_CONFLICT','公开模型默认参数与该模型专属范围冲突：'+key));
    else{delete parameters[key];if(own(template,key)&&!optionalFields.includes(key))optionalFields.push(key);}
  }
  // Never send one reference through multiple aliases.
  for(const names of [['image_url','image_urls','reference_image_urls','reference_images'],['audio_url','audio_urls'],['video_url','video_urls']]){
    const candidates=names.filter(key=>own(template,key));
    if(candidates.length>1){const preferred=candidates.find(key=>key==='reference_images')||candidates.find(key=>key.endsWith('_urls'))||candidates[0];for(const key of candidates)if(key!==preferred){delete template[key];optionalFields=optionalFields.filter(value=>value!==key);if(parameterSchema[key])parameterSchema[key].mapped=false;}}
  }
  return {...row,request:{...row.request,template,optionalFields},parameters,parameterSchema,inputModalities};
}
function parseOpenApi(doc,root,allowLoopback,publicModels=[]){
  const paths=root.paths||{},routes=Object.keys(paths),issues=[],evidence=[],catalog=[],pendingModels=[];
  const server=root.servers?.[0]?.url||(root.host?(root.schemes?.includes('https')?'https:':(root.schemes?.[0]||new URL(doc.url).protocol.slice(0,-1))+':')+'//'+root.host+(root.basePath||''):null);
  if(!server||server.includes('{'))return {issues:[issue('OPENAPI_SERVER_UNKNOWN','OpenAPI未提供可确定的API服务器，不能自动构造基础地址')]};
  let baseUrl;try{baseUrl=checkUrl(server,doc.url,allowLoopback).href.replace(/\/$/,'');}catch(error){return {issues:[issue('OPENAPI_SERVER_REJECTED',error.message)]};}
  const publicAtOrigin=publicModels.filter(model=>{try{return new URL(model.baseUrl,model.url).origin===new URL(baseUrl).origin;}catch{return false;}});
  const matchesEndpoint=(model,route)=>model.endpoints.some(endpoint=>{try{const u=new URL(endpoint,baseUrl);return u.origin===new URL(baseUrl).origin&&u.pathname===new URL(baseUrl+route).pathname;}catch{return false;}});
  let auth;
  for(const route of routes){
    const item=resolveRef(root,paths[route]),operation=resolveRef(root,item.post);if(!item.post||!safePath(route))continue;
    if(/\{[^{}]+\}/.test(route)){issues.push(issue('PATH_PARAMETERS_REQUIRED',route+'含未确认的路径变量，不能自动替换'));continue;}
    const schema=requestSchema(root,operation),output=schemaResponse(root,operation),response=responsePaths(root,output.schema);
    const explicitKinds=[...new Set(publicAtOrigin.filter(model=>matchesEndpoint(model,route)).map(model=>model.kind))];
    const kind=explicitKinds.length===1?explicitKinds[0]:kindOf(route,operation,response);if(!kind)continue;
    const operationIssues=[],problem=(code,message)=>{const row=issue(code,message);issues.push(row);operationIssues.push(row);};
    const override=operation.servers?.[0]?.url||item.servers?.[0]?.url;
    if(override){let address;try{address=checkUrl(override,doc.url,allowLoopback).href.replace(/\/$/,'');}catch{}if(address!==baseUrl){problem('OPERATION_SERVER_OVERRIDE',route+'使用不同服务器，须拆为独立配置');continue;}}
    if(FORBIDDEN.test([operation.summary,operation.description,operation['x-provider'],...(operation.tags||[])].join(' '))){issues.push(issue('FORBIDDEN_PROVIDER','文档明确标注禁用供应商的操作已排除'));continue;}
    if(/"\$ref"\s*:\s*"(?!#\/)/.test(JSON.stringify([schema,output.schema,operation]))){problem('EXTERNAL_REFERENCE',route+'包含外部schema引用，当前不自动拼装外部定义');}
    if(output.binary){response.binary=true;if(output.mimeType)response.mimeType=output.mimeType;}
    const security=authFor(root,operation);if(!security){problem('AUTH_UNSUPPORTED',route+'使用当前配置无法表达的鉴权');continue;}
    const requiredTransport=[...(item.parameters||[]),...(operation.parameters||[])].map(p=>resolveRef(root,p)).filter(p=>p.required&&['query','path','header'].includes(p.in)&&!(p.in==='header'&&['content-type','accept',security.authHeader.toLowerCase()].includes(String(p.name).toLowerCase())));
    if(requiredTransport.length)problem('REQUIRED_TRANSPORT_PARAMETERS',route+'要求查询/路径/额外头参数：'+requiredTransport.map(p=>p.name).join(', ')+'；不能当作JSON正文参数自动填入');
    const documented=publicAtOrigin.filter(model=>model.kind===kind&&matchesEndpoint(model,route));
    const active=documented.filter(model=>!model.blocked&&!/^(?:deprecated|retired|disabled|removed|sunset)$/i.test(model.lifecycle));
    for(const model of documented.filter(model=>model.blocked))issues.push(issue('FORBIDDEN_PROVIDER',model.id+'的公开供应商元数据属于已禁用服务，已排除'));
    const built=templateFor(root,schema,{mapOptional:documented.length>0}),modelSchema=resolveRef(root,schema.properties?.model||{});
    const ids=modelSchema.enum||[modelSchema.const||modelSchema.default||modelSchema.example].filter(x=>typeof x==='string');
    const validIds=(documented.length?active.map(model=>model.id):ids).filter(x=>typeof x==='string'&&x.trim()&&!FORBIDDEN.test(x)&&!/(?:your[_ -]?model|model[_ -]?id|example[_ -]?model|<|>)/i.test(x));
    if(!validIds.length)problem('MODEL_ID_REQUIRED',route+'没有可确认的可用模型ID；可在用户同意后独立鉴权读取模型目录');
    let polling;
    if(response.taskIdPath){
      const description=[operation.description,operation.summary,...fields(root,output.schema).map(field=>field.description)].join(' ');
      const explicit=routes.filter(p=>paths[p]?.get&&/\{(?:taskId|task_id|job_id|id)\}/.test(p)&&description.includes(p));
      const conventional=routes.filter(p=>p.startsWith(route.replace(/\/(?:generate|generations|create)$/,''))&&/\{(?:taskId|task_id|job_id|id)\}/.test(p)&&paths[p]?.get);
      const shared=routes.filter(p=>{const d=paths[p]?.get?.description||'';return /canonical|fixed status/i.test(d)&&new RegExp('\\b'+kind+'\\b','i').test(d)&&/\{(?:taskId|task_id|job_id|id)\}/.test(p);});
      const candidates=[...new Set(explicit.length?explicit:conventional.length?conventional:shared)];
      if(candidates.length===1){const q=candidates[0],qItem=resolveRef(root,paths[q]),op=resolveRef(root,qItem.get),qSchema=schemaResponse(root,op).schema,qp=responsePaths(root,qSchema),status=fields(root,qSchema).find(f=>f.path===qp.statusPath),values=status?.enum||[],pollAuth=authFor(root,op);
        const kindResult=fields(root,qSchema).find(field=>field.type==='string'&&(kind==='video'?/^(?:video\.url|video_url|data\.video_url)$/:kind==='music'||kind==='audio'?/^(?:audio_url|audio\.url|data\.audio_url)$/:/(?:image_url)$/).test(field.path));
        if(kindResult)qp.urlsPath=kindResult.path;
        const completedValues=values.filter(v=>/^(?:completed|succeeded|success|done)$/i.test(v)),failedValues=values.filter(v=>/^(?:failed|error|cancelled|canceled|expired)$/i.test(v));
        if(JSON.stringify(pollAuth)!==JSON.stringify(security))problem('POLL_AUTH_MISMATCH',q+'与生成接口使用不同鉴权，不能自动配置');
        else if(op.servers||qItem.servers)problem('POLL_SERVER_OVERRIDE',q+'有独立服务器设置，需人工核对');
        else if(qp.statusPath&&qp.urlsPath&&completedValues.length&&failedValues.length)polling={path:q.replace(/\{(?:taskId|task_id|job_id|id)\}/g,'{{taskId}}'),method:'GET',statusPath:qp.statusPath,completedValues,failedValues,urlsPath:qp.urlsPath};
      }
      const synchronousResult=response.textPath||response.urlsPath||response.base64Path||response.binary;
      const taskField=fields(root,output.schema).find(field=>field.path===response.taskIdPath);
      const syncRequired=(resolveRef(root,output.schema).required||[]).some(key=>[response.urlsPath,response.base64Path,response.textPath].some(p=>p&&(p===key||p.startsWith(key+'.'))));
      if(!polling&&synchronousResult&&syncRequired){
        delete response.taskIdPath;delete response.statusPath;
        if(own(built.template,'async')){delete built.template.async;built.optionalFields=built.optionalFields.filter(key=>key!=='async');built.parameterSchema.async.mapped=false;built.unmapped.push('async');}
      }else if(!polling)problem('POLLING_INCOMPLETE',route+'返回taskId，但没有唯一且字段完整的GET轮询合同');
    }else if(!response.textPath&&!response.urlsPath&&!response.base64Path&&!response.binary)problem('RESPONSE_FIELDS_UNKNOWN',route+'没有可确定的文本或媒体结果字段');
    if(kind==='music'&&schema.properties?.mv&&/required.*music|music.*required/i.test(schema.properties.mv.description||'')){built.parameterSchema.mv.required=true;built.optionalFields=built.optionalFields.filter(key=>key!=='mv');built.unfilled.push('mv');}
    if(built.unfilled.length)problem('REQUIRED_PARAMETERS',route+'需填写参数：'+built.unfilled.join(', '));
    if(built.unmapped.length)issues.push(issue('OPTIONAL_PARAMETER_MAPPING_REQUIRED',route+'的可选字段尚未接入请求模板：'+built.unmapped.join(', ')+'；须补充高级映射后才能调整，不会自动发送'));
    const inputFields=fields(root,schema).map(f=>f.path),inputModalities=['text'];
    for(const [modality,re]of [['image',/image|firstFrame|lastFrame/i],['video',/video.*url|referenceVideo/i],['audio',/audio.*url|referenceAudio/i]])if(inputFields.some(p=>re.test(p)))inputModalities.push(modality);
    const imageLimit=fields(root,schema).find(f=>f.type==='array'&&/image|references/i.test(f.path)&&Number.isInteger(f.maxItems)&&f.maxItems<=64)?.maxItems;
    const maskSupported=inputFields.some(p=>/(?:^|\.)(?:mask|mask_image|maskImage|mask_url|maskUrl|mask_base64|maskBase64)$/.test(p));
    for(const id of [...new Set(validIds)]){
      const metadata=active.find(model=>model.id===id),reasons=[...operationIssues];
      const ops=metadata?.operations||[];
      if(metadata&&kind==='image'&&ops.length&&!ops.includes('text-to-image'))reasons.push(issue('REFERENCE_CONTRACT_REQUIRED','该模型仅声明参考图/编辑操作，尚未确认必填参考输入合同'));
      if(metadata&&kind==='video'&&ops.length&&!ops.includes('text-to-video'))reasons.push(issue('REFERENCE_CONTRACT_REQUIRED','该模型仅声明参考媒体操作，尚未确认必填参考输入合同'));
      let row={id,name:metadata?.name||id,kind,request:{method:'POST',path:route,template:built.template,...(built.optionalFields.length?{optionalFields:built.optionalFields}:{})},response,...(polling?{polling}:{}),parameters:built.parameters,parameterSchema:built.parameterSchema,inputModalities,...(maskSupported?{maskSupported:true}:{}),...(imageLimit===undefined?{}:{maxReferences:imageLimit}),_auth:security,_complete:reasons.length===0};
      row=refinePublicModel(row,metadata,route,reasons);row._complete=reasons.length===0;
      if(reasons.length)pendingModels.push({id,name:row.name,kind,path:route,reason:reasons.map(r=>r.message).join('；'),reasons,evidence:[doc.url,...(metadata?[metadata.url]:[])]});
      catalog.push(row);
    }
    evidence.push({url:doc.url,type:'openapi-operation',path:route,kind,confidence:0.95,parameterSchema:built.parameterSchema,...(output.binary?{responseMediaType:output.mimeType||'audio/*'}:{})});
  }
  auth=catalog.find(row=>row._complete)?._auth||catalog[0]?._auth||{authType:'none',authHeader:''};
  for(const row of catalog)if(JSON.stringify(row._auth)!==JSON.stringify(auth)){
    row._complete=false;const message=row.request.path+'使用不同鉴权，须拆为独立服务配置';issues.push(issue('MIXED_AUTH',message));pendingModels.push({id:row.id,name:row.name,kind:row.kind,path:row.request.path,reason:message,reasons:[issue('MIXED_AUTH',message)],evidence:[doc.url]});
  }
  const catalogRoute=routes.find(p=>/\/models$/.test(p)&&paths[p]?.get);
  if(catalogRoute)evidence.push({url:doc.url,type:'authenticated-model-catalog',method:'GET',path:catalogRoute,confidence:1,queried:false});
  return {profile:{name:root.info?.title,baseUrl,protocol:identifyProtocol(routes),...auth,modelCatalog:catalog},issues,evidence,pendingModels,uncertain:!catalog.some(row=>row._complete)};
}
function htmlSuggestion(doc,blockedModels){
  const text=clean(doc.text),catalog=[],evidence=[],urls=[...doc.text.matchAll(/https?:\/\/[^\s"'<>\\]+/g)].map(m=>m[0].replace(/[),;]+$/,''));
  const endpoint=urls.find(u=>/\/(?:v1\/)?(?:chat\/completions|images\/generations|audio\/speech|messages)(?:$|[?#])/.test(u));
  const auth=/Authorization\s*[:=]?\s*(?:Bearer|bearer)|Bearer\s+(?:YOUR|<|\$|\{)/i.test(text)?{authType:'bearer',authHeader:'Authorization'}:/X-API-Key/i.test(text)?{authType:'api-key',authHeader:'X-API-Key'}:/x-api-key/i.test(text)?{authType:'api-key',authHeader:'x-api-key'}:null;
  if(!endpoint)return {issues:[]};
  const base=new URL(endpoint).origin,paths=[...new Set(urls.filter(u=>new URL(u).origin===base).map(u=>new URL(u).pathname))];
  const ids=[...new Set([...text.matchAll(/["']model["']\s*:\s*["']([^"']+)["']/g)].map(m=>m[1]))].filter(id=>id.length<=160&&!FORBIDDEN.test(id)&&!blockedModels.has(id)&&!/[<{]|your[_ -]?model/i.test(id));
  for(const route of paths){const type=/\/chat\/completions$/.test(route)?'chat':/\/images\/generations$/.test(route)?'image':/\/audio\/speech$/.test(route)?'audio':null;if(!type)continue;
    // A model example next to another endpoint does not establish its modality.
    const snippets=[...doc.text.matchAll(/<(?:pre|code)[^>]*>([\s\S]*?)<\/(?:pre|code)>/gi)].map(m=>clean(m[1])).filter(s=>s.includes(base+route));
    const routeIds=[...new Set(snippets.flatMap(s=>[...s.matchAll(/["']model["']\s*:\s*["']([^"']+)["']/g)].map(m=>m[1])))].filter(id=>ids.includes(id));
    for(const id of routeIds)catalog.push({id,name:id,kind:type,request:{method:'POST',path:route,template:type==='chat'?{model:'{{model}}',messages:'{{messages}}'}:type==='image'?{model:'{{model}}',prompt:'{{prompt}}'}:{model:'{{model}}',input:'{{prompt}}',voice:'{{parameters.voice}}'}},response:type==='chat'?{textPath:'choices.0.message.content'}:type==='image'?{urlsPath:'data'}:{}});
    evidence.push({url:doc.url,type:'documented-standard-endpoint',path:route,kind:type,confidence:0.8});
  }
  if(paths.some(p=>/\/models$/.test(p)))evidence.push({url:doc.url,type:'authenticated-model-catalog',method:'GET',path:paths.find(p=>/\/models$/.test(p)),confidence:0.9,queried:false});
  const title=/<title[^>]*>([\s\S]*?)<\/title>/i.exec(doc.text)?.[1];
  const compatible=/openai[\s_-]*compatible|openai.{0,20}兼容|兼容.{0,20}openai/i.test(text);
  const issues=auth?[]:[issue('AUTH_UNKNOWN','公开页面未说明鉴权，不能将其当作免鉴权接口')];
  if(!compatible)issues.push(issue('STANDARD_COMPATIBILITY_UNCONFIRMED','页面未明确声明标准OpenAI兼容，不能只凭相同路径推断返回合同'));
  return {profile:{name:clean(title)||new URL(doc.url).hostname,baseUrl:base,protocol:identifyProtocol(paths),...(auth||{authType:'none',authHeader:''}),modelCatalog:catalog},evidence,issues,uncertain:!auth||!compatible||!catalog.length||catalog.some(m=>m.kind==='audio')};
}
function blockedModelIds(documents){
  const ids=new Set();for(const doc of documents)for(const row of doc.text.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi))if(FORBIDDEN.test(clean(row[1]))){const first=/<td[^>]*>([\s\S]*?)<\/td>/i.exec(row[1]);if(first)ids.add(clean(first[1]));}return ids;
}
function groundedSuggestion(profile,documents){
  const text=documents.map(d=>clean(d.text)).join('\n');
  if(!text.includes(profile.baseUrl))return false;
  for(const m of profile.modelCatalog){if(!text.includes(m.id)||!text.includes(m.request.path))return false;if(m.polling&&!text.includes(m.polling.path.replace('{{taskId}}','{taskId}'))&&!text.includes(m.polling.path.replace('{{taskId}}','{task_id}')))return false;
    for(const [key,p]of Object.entries(m.response))if(key.endsWith('Path')&&!p.split('.').filter(x=>!/^\d+$/.test(x)&&x!=='*').every(segment=>text.includes(segment)))return false;
  }return profile.modelCatalog.length>0;
}
async function discoverApi({url,fetch:transport=global.fetch,analyze,signal}={}){
  const first=checkUrl(url,undefined,isLoopbackUrl(url)),allowLoopback=isLoopbackUrl(first.href),documents=[],issues=[],evidence=[],queue=[first.href],seen=new Set();
  const combined=signal?AbortSignal.any([signal,AbortSignal.timeout(LIMITS.totalTimeoutMs)]):AbortSignal.timeout(LIMITS.totalTimeoutMs),state={allowLoopback,signal:combined,bytes:0};
  let documentCap=LIMITS.documents,detailTemplate,detailsQueued=false;
  while(queue.length&&documents.length<documentCap&&seen.size<documentCap){combined.throwIfAborted();const address=queue.shift();if(seen.has(address))continue;seen.add(address);
    try{const doc=await fetchDoc(address,{fetch:transport},state);
      try{doc.parsed=parseDocument(doc.text);}catch(error){issues.push(issue('DOCUMENT_STRUCTURE_UNSUPPORTED',error.message));}
      documents.push(doc);evidence.push({url:doc.url,type:'public-document',contentType:doc.contentType,bytes:doc.bytes,sha256:doc.sha256,excerpt:redact(clean(doc.text)).replace(/\s+/g,' ').trim().slice(0,320),confidence:1});
      const structured=structuredLinks(doc.parsed,doc.url);
      if(structured.manifest){documentCap=LIMITS.documents+LIMITS.manifestDocuments;evidence.push({url:doc.url,type:'structured-document-manifest',documentLimit:documentCap,confidence:1});}
      const append=(links,priority)=>{for(const link of priority?[...links].reverse():links){try{const target=checkUrl(link,doc.url,allowLoopback).href;if(!seen.has(target)&&!queue.includes(target)){if(priority)queue.unshift(target);else queue.push(target);}}catch(error){issues.push(issue('LINK_REJECTED',error.message));}}};
      append(docLinks(doc.text,doc.url).filter(link=>!structured.links.includes(link)),false);append(structured.links,true);
      if(doc.parsed?.categories&&typeof doc.parsed?.endpoints?.detail==='string')detailTemplate={path:doc.parsed.endpoints.detail,url:doc.url};
      if(!detailsQueued&&detailTemplate&&Array.isArray(doc.parsed?.data)){
        const models=mergeCatalogs(documents).filter(model=>!model.blocked&&!/^(?:deprecated|retired|disabled|removed|sunset)$/i.test(model.lifecycle));
        const selected=[...models.filter(model=>model.kind==='audio').slice(0,3),...['image','video'].flatMap(kind=>models.filter(model=>model.kind===kind&&model.operations.includes('text-to-'+kind)).slice(0,1))];
        const links=selected.map(model=>new URL(detailTemplate.path.replace(/\{(?:model|id)\}/g,encodeURIComponent(model.id)),detailTemplate.url).href);
        detailsQueued=true;append(links,true);evidence.push({url:detailTemplate.url,type:'explicit-public-model-details',models:selected.map(model=>model.id),confidence:1});
      }
    }catch(error){if(signal?.aborted)throw signal.reason||error;issues.push(issue('DOCUMENT_UNAVAILABLE',redact(error.message)));}
  }
  if(queue.length)issues.push(issue('DOCUMENT_LIMIT','达到最多'+documentCap+'份关联公开文档的读取上限，未继续抓取'));
  const blocked=blockedModelIds(documents),publicModels=mergeCatalogs(documents),candidates=[];
  for(const model of publicModels)if(model.blocked)blocked.add(model.id);
  if(publicModels.length)evidence.push({url:first.href,type:'typed-public-model-catalog',models:publicModels.length,sources:[...new Set(publicModels.map(model=>model.url))],confidence:1});
  for(const doc of documents){const parsed=doc.parsed;
    let result;try{result=parsed&&(String(parsed.openapi||'').startsWith('3.')||parsed.swagger==='2.0')?parseOpenApi(doc,parsed,allowLoopback,publicModels):htmlSuggestion(doc,blocked);}catch{issues.push(issue('DOCUMENT_STRUCTURE_UNSUPPORTED','公开文档结构不完整，无法确定性解析'));continue;}
    issues.push(...(result.issues||[]));evidence.push(...(result.evidence||[]));if(result.profile)candidates.push(result);
  }
  candidates.sort((a,b)=>Number(a.uncertain)-Number(b.uncertain)||(b.profile.modelCatalog.filter(row=>row._complete!==false).length-a.profile.modelCatalog.filter(row=>row._complete!==false).length));
  let chosen=candidates[0],profile,pendingModels=[];
  if(chosen){
    const compatible=candidates.filter(candidate=>candidate.profile.baseUrl===chosen.profile.baseUrl&&candidate.profile.authType===chosen.profile.authType&&candidate.profile.authHeader===chosen.profile.authHeader);
    const models=new Map();
    for(const candidate of compatible){pendingModels.push(...(candidate.pendingModels||[]));for(const row of candidate.profile.modelCatalog){const key=row.kind+'\0'+row.id,previous=models.get(key);if(!previous||row._complete&&!previous._complete)models.set(key,row);}}
    let catalog=[...models.values()].filter(row=>!blocked.has(row.id));
    const complete=catalog.filter(row=>row._complete===true||row._complete===undefined&&!chosen.uncertain);
    if(complete.length){catalog=complete;chosen={...chosen,uncertain:false};}
    if(catalog.length>512){issues.push(issue('MODEL_CATALOG_LIMIT','可配置模型超过512项，超出部分保留待处理'));for(const row of catalog.slice(512))pendingModels.push({id:row.id,name:row.name,kind:row.kind,reason:'超过单服务512项模型上限，请分批配置'});catalog=catalog.slice(0,512);}
    try{profile=publicProfile({...chosen.profile,modelCatalog:catalog},first.href,allowLoopback);}catch(error){issues.push(issue('PROFILE_REJECTED',error.message));}
  }
  if(analyze&&(!profile?.modelCatalog.length||chosen?.uncertain)){
    try{const raw=await abortable(analyze({url:first.href,documents:documents.map(d=>({url:d.url,contentType:d.contentType,text:redact(clean(d.text)).slice(0,100000)})),partial:profile||null,signal:combined}),combined);combined.throwIfAborted();
      const suggestion=publicProfile(typeof raw==='string'?JSON.parse(raw):raw?.profile||raw,first.href,allowLoopback);
      if(suggestion.modelCatalog.some(m=>blocked.has(m.id)))throw new Error('建议包含文档明确标注的禁用供应商模型');
      if(!groundedSuggestion(suggestion,documents))throw new Error('分析建议的模型、基础地址或接口路径缺少公开文档证据');
      profile=suggestion;chosen={uncertain:true};evidence.push({url:first.href,type:'model-analysis-suggestion',confidence:0.65,requiresReview:true});issues.push(issue('ANALYSIS_REVIEW_REQUIRED','模型分析建议已通过结构及来源检查，仍须用户审阅，不能视为已实调可执行合同'));
    }catch(error){if(signal?.aborted)throw signal.reason||error;issues.push(issue('ANALYSIS_REJECTED',redact(error.message)));}
  }
  if(!profile)profile={docsUrl:first.href,name:new URL(first.href).hostname,baseUrl:null,protocol:'http-json',authType:'none',authHeader:'',scope:/wuread\.cn$/i.test(first.hostname)?'test':'production',modelCatalog:[],models:{}};
  const incomplete=profile.modelCatalog.some(m=>m.response.taskIdPath&&!m.polling||!m.response.textPath&&!m.response.urlsPath&&!m.response.base64Path&&!m.response.binary&&!m.polling);
  const readyToConfigure=Boolean(profile.baseUrl&&profile.modelCatalog.length&&!chosen?.uncertain&&!incomplete);
  if(!readyToConfigure&&!issues.length)issues.push(issue('CONTRACT_INCOMPLETE','尚未得到完整可配置合同，请补充接口文档或人工参数'));
  return {...profile,readyToConfigure,pendingModels,evidence,issues};
}
module.exports={discoverApi,DISCOVERY_LIMITS:LIMITS};
