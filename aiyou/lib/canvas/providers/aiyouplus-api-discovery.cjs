'use strict';
// Public documentation discovery only. No credentials, business API probes,
// evaluated page code, generated SDKs or executable document instructions.
const {createHash}=require('node:crypto');
const {isIP}=require('node:net');
const {assertNetworkAllowed,isLoopbackUrl}=require('./aiyouplus-runtime.cjs');
const {validateServiceProfile}=require('./aiyouplus-provider-registry.cjs');
const LIMITS=Object.freeze({documents:5,documentBytes:1024*1024,totalBytes:3*1024*1024,documentTimeoutMs:8000,totalTimeoutMs:30000,redirects:3});
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
  if(!Array.isArray(input)||input.length>128)throw new Error('模型目录须为最多128项的数组');
  return input.map(row=>{
    if(!row||typeof row.id!=='string'||!row.id.trim()||row.id.length>160||FORBIDDEN.test(row.id+' '+(row.name||''))||!KINDS.includes(row.kind))throw new Error('模型标识或能力无效/属于禁用供应商');
    if(row.request?.method!=='POST'||!safePath(row.request.path)||!row.request.template||typeof row.request.template!=='object'||Array.isArray(row.request.template))throw new Error('模型请求须为相对路径POST和JSON模板');
    const response={};for(const key of ['textPath','urlsPath','base64Path','taskIdPath','statusPath','errorPath'])if(row.response?.[key]!==undefined){if(!selectorPath(row.response[key]))throw new Error('响应字段不是安全JSON路径');response[key]=row.response[key];}
    if(row.response?.binary!==undefined){if(typeof row.response.binary!=='boolean')throw new Error('binary须为布尔值');response.binary=row.response.binary;}
    if(row.response?.mimeType!==undefined){if(!/^(?:image|audio|video)\/[a-z0-9.+-]+$/i.test(row.response.mimeType))throw new Error('媒体MIME无效');response.mimeType=row.response.mimeType;}
    const out={id:row.id.trim(),name:String(row.name||row.id).slice(0,180),kind:row.kind,request:{method:'POST',path:row.request.path,template:safeJson(row.request.template)},response};
    if(row.polling){const q=row.polling;if(q.method!=='GET'||!safePath(q.path)||!q.path.includes('{{taskId}}')||!selectorPath(q.statusPath)||!selectorPath(q.urlsPath)||![q.completedValues,q.failedValues].every(v=>Array.isArray(v)&&v.length&&v.length<=20&&v.every(x=>typeof x==='string'&&x.length<=80)))throw new Error('轮询须有明确GET路径、状态枚举和结果字段');out.polling={method:'GET',path:q.path,statusPath:q.statusPath,completedValues:[...q.completedValues],failedValues:[...q.failedValues],urlsPath:q.urlsPath};}
    if(row.parameters)out.parameters=safeJson(row.parameters);
    if(row.parameterSchema)out.parameterSchema=safeJson(row.parameterSchema);
    if(row.inputModalities){if(!Array.isArray(row.inputModalities)||row.inputModalities.some(x=>!['text','image','video','audio'].includes(x)))throw new Error('输入模态无效');out.inputModalities=[...new Set(row.inputModalities)];}
    if(row.maxReferences!==undefined){if(!Number.isInteger(row.maxReferences)||row.maxReferences<0||row.maxReferences>100)throw new Error('参考数量无效');out.maxReferences=row.maxReferences;}
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
  const list=fields(root,schema),paths=list.map(f=>f.path),result={};
  const pick=re=>paths.find(p=>re.test(p));
  const text=paths.includes('choices.0.message.content')?'choices.0.message.content':pick(/^(?:text|output_text|data\.text|content\.0\.text)$/);
  if(text)result.textPath=text;
  const urls=list.find(f=>f.type==='array'&&(resolveRef(root,f.items).type==='string'&&/(?:urls?|images|videos|outputs|data)$/i.test(f.path)||resolveRef(root,f.items).properties?.url));
  const url=urls?.path||pick(/(?:^|\.)(?:url|audioUrl|videoUrl|imageUrl|audio_url|video_url)$/);
  if(url)result.urlsPath=url;
  const b64=pick(/(?:^|\.)(?:b64_json|base64|audio_base64)$/);if(b64)result.base64Path=b64.replace(/\.0(?=\.)/g,'.*');
  const task=pick(/(?:^|\.)(?:taskId|task_id|job_id)$/);if(task)result.taskIdPath=task;
  const status=pick(/(?:^|\.)(?:status|state)$/);if(status)result.statusPath=status;
  const error=pick(/(?:^|\.)(?:errorMessage|error_message|error\.message|error)$/);if(error)result.errorPath=error;
  return result;
}
function requestSchema(root,operation){
  const r=resolveRef(root,operation.requestBody);return resolveRef(root,r?.content?.['application/json']?.schema||operation.parameters?.find(p=>p.in==='body')?.schema||{});
}
function kindOf(route,operation,response){
  const words=route+' '+(operation.operationId||'')+' '+(operation.summary||'')+' '+(operation.tags||[]).join(' ');
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
function templateFor(root,schema){
  const s=resolveRef(root,schema),template={},parameters={},parameterSchema={},unfilled=[],unmapped=[];
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
    parameterSchema[key].mapped=own(template,key);
    if(!required&&!parameterSchema[key].mapped)unmapped.push(key);
  }
  return {template,parameters,parameterSchema,unfilled,unmapped};
}
function identifyProtocol(routes){
  if(routes.some(p=>/\/chat\/completions$/.test(p)))return 'openai-compatible';
  if(routes.some(p=>/\/messages$/.test(p)))return 'anthropic-messages';
  if(routes.some(p=>/^\/v2\/video_generation$/.test(p)))return 'minimax-native';return 'http-json';
}
function parseOpenApi(doc,root,allowLoopback){
  const paths=root.paths||{},routes=Object.keys(paths),issues=[],evidence=[],catalog=[];
  const server=root.servers?.[0]?.url||(root.host?(root.schemes?.includes('https')?'https:':(root.schemes?.[0]||new URL(doc.url).protocol.slice(0,-1))+':')+'//'+root.host+(root.basePath||''):null);
  if(!server||server.includes('{'))return {issues:[issue('OPENAPI_SERVER_UNKNOWN','OpenAPI未提供可确定的API服务器，不能自动构造基础地址')]};
  let baseUrl;try{baseUrl=checkUrl(server,doc.url,allowLoopback).href.replace(/\/$/,'');}catch(error){return {issues:[issue('OPENAPI_SERVER_REJECTED',error.message)]};}
  let auth,uncertain=false;
  if(/"\$ref"\s*:\s*"(?!#\/)/.test(JSON.stringify(root))){issues.push(issue('EXTERNAL_REFERENCE','OpenAPI包含外部schema引用，当前不自动拼装外部定义'));uncertain=true;}
  for(const route of routes){const item=resolveRef(root,paths[route]),operation=resolveRef(root,item.post);if(!item.post||!safePath(route))continue;
    if(/\{[^{}]+\}/.test(route)){issues.push(issue('PATH_PARAMETERS_REQUIRED',route+'含未确认的路径变量，不能自动替换'));uncertain=true;continue;}
    const override=operation.servers?.[0]?.url||item.servers?.[0]?.url;
    if(override){let address;try{address=checkUrl(override,doc.url,allowLoopback).href.replace(/\/$/,'');}catch{}if(address!==baseUrl){issues.push(issue('OPERATION_SERVER_OVERRIDE',route+'使用不同服务器，须拆为独立配置'));uncertain=true;continue;}}
    if(FORBIDDEN.test([operation.summary,operation.description,operation['x-provider'],...(operation.tags||[])].join(' '))){issues.push(issue('FORBIDDEN_PROVIDER','文档明确标注禁用供应商的操作已排除'));continue;}
    const schema=requestSchema(root,operation),output=schemaResponse(root,operation),response=responsePaths(root,output.schema),kind=kindOf(route,operation,response);if(!kind)continue;
    if(output.binary){response.binary=true;if(output.mimeType)response.mimeType=output.mimeType;}
    const security=authFor(root,operation);if(!security){issues.push(issue('AUTH_UNSUPPORTED',route+'使用当前配置无法表达的鉴权'));uncertain=true;continue;}
    if(auth&&JSON.stringify(auth)!==JSON.stringify(security)){issues.push(issue('MIXED_AUTH','文档的能力使用不同鉴权，需拆为独立服务配置'));uncertain=true;continue;}auth??=security;
    const requiredTransport=[...(item.parameters||[]),...(operation.parameters||[])].map(p=>resolveRef(root,p)).filter(p=>p.required&&['query','path','header'].includes(p.in)&&!(p.in==='header'&&['content-type','accept',security.authHeader.toLowerCase()].includes(String(p.name).toLowerCase())));
    if(requiredTransport.length){issues.push(issue('REQUIRED_TRANSPORT_PARAMETERS',route+'要求查询/路径/额外头参数：'+requiredTransport.map(p=>p.name).join(', ')+'；不能当作JSON正文参数自动填入'));uncertain=true;}
    const built=templateFor(root,schema),modelSchema=resolveRef(root,schema.properties?.model||{});
    const ids=modelSchema.enum||[modelSchema.const||modelSchema.default||modelSchema.example].filter(x=>typeof x==='string');
    const validIds=ids.filter(x=>typeof x==='string'&&x.trim()&&!FORBIDDEN.test(x)&&!/(?:your[_ -]?model|model[_ -]?id|example[_ -]?model|<|>)/i.test(x));
    if(!validIds.length){issues.push(issue('MODEL_ID_REQUIRED',route+'没有可确认的模型ID；可在用户同意后独立鉴权读取模型目录'));uncertain=true;}
    let polling;
    if(response.taskIdPath){
      const candidates=routes.filter(p=>p.startsWith(route.replace(/\/(?:generate|generations|create)$/,''))&&/\{(?:taskId|task_id|job_id|id)\}/.test(p)&&paths[p]?.get);
      if(candidates.length===1){const q=candidates[0],op=resolveRef(root,paths[q].get),qSchema=schemaResponse(root,op).schema,qp=responsePaths(root,qSchema),status=fields(root,qSchema).find(f=>f.path===qp.statusPath),values=status?.enum||[],pollAuth=authFor(root,op);
        const completedValues=values.filter(v=>/^(?:completed|succeeded|success|done)$/i.test(v)),failedValues=values.filter(v=>/^(?:failed|error|cancelled|canceled|expired)$/i.test(v));
        if(JSON.stringify(pollAuth)!==JSON.stringify(security)){issues.push(issue('POLL_AUTH_MISMATCH',q+'与生成接口使用不同鉴权，不能自动配置'));
        }else if(op.servers||paths[q].servers){issues.push(issue('POLL_SERVER_OVERRIDE',q+'有独立服务器设置，需人工核对'));
        }else if(qp.statusPath&&qp.urlsPath&&completedValues.length&&failedValues.length)polling={path:q.replace(/\{(?:taskId|task_id|job_id|id)\}/g,'{{taskId}}'),method:'GET',statusPath:qp.statusPath,completedValues,failedValues,urlsPath:qp.urlsPath};
      }
      if(!polling){issues.push(issue('POLLING_INCOMPLETE',route+'返回taskId，但没有唯一且字段完整的GET轮询合同'));uncertain=true;}
    }else if(!response.textPath&&!response.urlsPath&&!response.base64Path&&!response.binary){issues.push(issue('RESPONSE_FIELDS_UNKNOWN',route+'没有可确定的文本或媒体结果字段'));uncertain=true;}
    if(built.unfilled.length){issues.push(issue('REQUIRED_PARAMETERS',route+'需填写参数：'+built.unfilled.join(', ')));uncertain=true;}
    if(built.unmapped.length)issues.push(issue('OPTIONAL_PARAMETER_MAPPING_REQUIRED',route+'的可选字段尚未接入请求模板：'+built.unmapped.join(', ')+'；须补充高级映射后才能调整，不会自动发送'));
    const inputFields=fields(root,schema).map(f=>f.path),inputModalities=['text'];
    for(const [modality,re]of [['image',/image|firstFrame|lastFrame/i],['video',/video.*url|referenceVideo/i],['audio',/audio.*url|referenceAudio/i]])if(inputFields.some(p=>re.test(p)))inputModalities.push(modality);
    const imageLimit=fields(root,schema).find(f=>f.type==='array'&&/image|references/i.test(f.path)&&Number.isInteger(f.maxItems)&&f.maxItems<=64)?.maxItems;
    for(const id of validIds)catalog.push({id,name:id,kind,request:{method:'POST',path:route,template:built.template},response,...(polling?{polling}:{}),parameters:built.parameters,parameterSchema:built.parameterSchema,inputModalities,...(imageLimit===undefined?{}:{maxReferences:imageLimit})});
    evidence.push({url:doc.url,type:'openapi-operation',path:route,kind,confidence:0.95,parameterSchema:built.parameterSchema,...(output.binary?{responseMediaType:output.mimeType||'audio/*'}:{})});
  }
  const catalogRoute=routes.find(p=>/\/models$/.test(p)&&paths[p]?.get);
  if(catalogRoute)evidence.push({url:doc.url,type:'authenticated-model-catalog',method:'GET',path:catalogRoute,confidence:1,queried:false});
  return {profile:{name:root.info?.title,baseUrl,protocol:identifyProtocol(routes),...(auth||{authType:'none',authHeader:''}),modelCatalog:catalog},issues,evidence,uncertain};
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
  while(queue.length&&documents.length<LIMITS.documents&&seen.size<LIMITS.documents){combined.throwIfAborted();const address=queue.shift();if(seen.has(address))continue;seen.add(address);
    try{const doc=await fetchDoc(address,{fetch:transport},state);documents.push(doc);evidence.push({url:doc.url,type:'public-document',contentType:doc.contentType,bytes:doc.bytes,sha256:doc.sha256,excerpt:redact(clean(doc.text)).replace(/\s+/g,' ').trim().slice(0,320),confidence:1});
      for(const link of docLinks(doc.text,doc.url)){try{const target=checkUrl(link,doc.url,allowLoopback).href;if(!seen.has(target)&&!queue.includes(target))queue.push(target);}catch(error){issues.push(issue('LINK_REJECTED',error.message));}}
    }catch(error){if(signal?.aborted)throw signal.reason||error;issues.push(issue('DOCUMENT_UNAVAILABLE',redact(error.message)));}
  }
  if(queue.length)issues.push(issue('DOCUMENT_LIMIT','达到最多5份关联文档的读取上限，未继续抓取'));
  const blocked=blockedModelIds(documents),candidates=[];
  for(const doc of documents){let parsed;try{parsed=JSON.parse(doc.text);}catch{}
    let result;try{result=parsed&&(String(parsed.openapi||'').startsWith('3.')||parsed.swagger==='2.0')?parseOpenApi(doc,parsed,allowLoopback):htmlSuggestion(doc,blocked);}catch{issues.push(issue('DOCUMENT_STRUCTURE_UNSUPPORTED','公开文档结构不完整，无法确定性解析'));continue;}
    issues.push(...(result.issues||[]));evidence.push(...(result.evidence||[]));if(result.profile)candidates.push(result);
    if(!parsed&&/^(?:openapi|swagger)\s*:/m.test(doc.text))issues.push(issue('YAML_REQUIRES_ANALYSIS','已读取YAML文档，当前确定性解析只处理JSON；须分析并审阅建议'));
  }
  candidates.sort((a,b)=>Number(a.uncertain)-Number(b.uncertain)||(b.profile.modelCatalog.length-a.profile.modelCatalog.length));
  let chosen=candidates[0],profile;
  if(chosen)try{profile=publicProfile({...chosen.profile,modelCatalog:chosen.profile.modelCatalog.filter(m=>!blocked.has(m.id))},first.href,allowLoopback);}catch(error){issues.push(issue('PROFILE_REJECTED',error.message));}
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
  return {...profile,readyToConfigure,evidence,issues};
}
module.exports={discoverApi,DISCOVERY_LIMITS:LIMITS};
