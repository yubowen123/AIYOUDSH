'use strict';
// Declarative service metadata only. This module neither stores Keys nor fetches.
const crypto=require('node:crypto');
const PROTOCOLS=Object.freeze(['openai-compatible','http-json','anthropic-messages','minimax-native']);
const KINDS=Object.freeze(['chat','image','video','audio','music']);
const MINIMAX_SYSTEM_VOICES=Object.freeze(['Chinese (Mandarin)_Sweet_Lady','Chinese (Mandarin)_Male_Announcer','Chinese (Mandarin)_Wise_Women','English_expressive_narrator','English_Graceful_Lady','English_Insightful_Speaker']);
const BUILTIN_PROFILES=Object.freeze({
  apiai:Object.freeze({provider:'apiai',name:'APIAI 默认媒体通道',baseUrl:'https://www.ggwk1.online',protocol:'http-json',authType:'bearer',authHeader:'Authorization',scope:'production',enabled:true,docsUrl:'https://apiai.apifox.cn/',modelCatalog:[]}),
  deepseek:Object.freeze({provider:'deepseek',name:'DeepSeek 官方',baseUrl:'https://api.deepseek.com',protocol:'openai-compatible',authType:'bearer',authHeader:'Authorization',scope:'production',enabled:true,docsUrl:'https://api-docs.deepseek.com',modelCatalog:[]}),
  minimax:Object.freeze({provider:'minimax',name:'MiniMax 官方',baseUrl:'https://api.minimax.io',protocol:'minimax-native',authType:'bearer',authHeader:'Authorization',scope:'production',enabled:true,docsUrl:'https://platform.minimax.io/docs',modelCatalog:[]}),
  openai:Object.freeze({provider:'openai',name:'OpenAI 兼容 / 本地服务',baseUrl:'https://api.openai.com/v1',protocol:'openai-compatible',authType:'bearer',authHeader:'Authorization',scope:'production',enabled:true,docsUrl:'',modelCatalog:[]}),
  wuread:Object.freeze({provider:'wuread',name:'Wuread（仅测试，旧配置保留）',baseUrl:'https://ai-mcp.wuread.cn',protocol:'http-json',authType:'api-key',authHeader:'X-API-Key',scope:'test',enabled:false,docsUrl:'https://ai-mcp.wuread.cn/docs.html',modelCatalog:[]})
});
const BAD_PROVIDER=/qiniu|qnaigc|qbox\.me|clouddn\.com|qnssl\.com|qiniucdn\.com|七牛/i;
const UNSAFE_KEYS=new Set(['__proto__','prototype','constructor']);
const SECRET_KEYS=/^(authorization|api[-_]?key|x-api-key|password|secret|access[-_]?token|refresh[-_]?token|token|encryptedKey)$/i;
const TEMPLATE_ROOTS=new Set(['model','prompt','text','messages','system','temperature','max_tokens','maxTokens','tools','tool_choice','response_format','aspectRatio','resolution','duration','referenceUrls','referencePaths','referenceImages','referenceImageUrls','referenceBase64','references','referenceMedia','referenceVideoUrls','referenceAudioUrls','maskImage','maskImageUrl','maskBase64','mask','image','imageUrl','firstFrame','lastFrame','lyrics','instrumental','voiceId','speed','volume','pitch','count','width','height','parameters','taskId','userId','userName','projectName','seed','n','format','negativePrompt','input','customParameters']);
const BLOCKED_HEADERS=new Set(['host','cookie','set-cookie','content-length','content-type','connection','transfer-encoding','proxy-authorization','proxy-authenticate','upgrade','trailer','te','origin','referer']);
const DOWNLOAD_MEDIA_TYPES=new Set(['image/png','image/jpeg','image/webp','image/gif','video/mp4','video/webm','audio/mpeg','audio/wav','audio/ogg','audio/flac','audio/mp4','audio/webm']);
const isObject=value=>value!==null&&typeof value==='object'&&!Array.isArray(value)&&(Object.getPrototypeOf(value)===Object.prototype||Object.getPrototypeOf(value)===null);
const serviceId=id=>Object.hasOwn(BUILTIN_PROFILES,id)||/^service-[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
const createServiceId=()=> 'service-'+crypto.randomUUID();
function text(value,label,max=300,allowEmpty=false) {
  if(typeof value!=='string'||value.length>max||/[\x00-\x1f\x7f]/.test(value)||(!allowEmpty&&!value.trim())||BAD_PROVIDER.test(value))throw new Error(label+'无效或包含已禁用供应商');
  return value.trim();
}
function modelId(value){const id=text(value,'模型ID',200);if(UNSAFE_KEYS.has(id)||/[{}]/.test(id)||id.includes('${'))throw new Error('模型ID不允许模板或原型字段');return id;}
function assertServiceUrl(value,label='服务地址') {
  const raw=text(value,label,2048);let url;
  try{url=new URL(raw);}catch{throw new Error(label+'无效');}
  if(!['https:','http:'].includes(url.protocol)||url.username||url.password||BAD_PROVIDER.test(url.hostname))throw new Error(label+'无效或包含已禁用供应商');
  if(url.protocol==='http:'&&!['localhost','127.0.0.1','[::1]'].includes(url.hostname))throw new Error('远程服务必须使用HTTPS');
  return url;
}
const isWureadUrl=value=>{try{const host=new URL(value).hostname.toLowerCase().replace(/\.$/,'');return host==='wuread.cn'||host.endsWith('.wuread.cn');}catch{return false;}};
function parseFieldPath(value,{allowWildcard=true}={}) {
  if(typeof value!=='string'||value.length>300||/[\x00-\x20\x7f]/.test(value))throw new Error('响应字段路径无效');
  let path=value.replace(/^\$(?:\.|(?=\[)|$)/,'');
  if(!path)return [];
  path=path.replace(/\[(\d+|\*)\]/g,'.$1');
  if(path.startsWith('.'))path=path.slice(1);
  if(!/^[A-Za-z0-9_*~-]+(?:\.[A-Za-z0-9_*~-]+)*$/.test(path))throw new Error('响应字段只支持安全字段名、数字索引或通配符');
  const segments=path.split('.');
  if(segments.some(part=>UNSAFE_KEYS.has(part)||(!allowWildcard&&part==='*')||(part.includes('*')&&part!=='*')))throw new Error('响应字段路径不允许表达式或原型访问');
  return segments.map(part=>/^\d+$/.test(part)?Number(part):part);
}
function validateTemplateString(value) {
  if(/\$\{|<%|%>|\b(?:eval|Function)\s*\(/.test(value))throw new Error('模板不允许可执行表达式');
  const without=value.replace(/\{\{([^{}]+)\}\}/g,(_,name)=>{
    if(!/^[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*|\.\d+)*$/.test(name)||!TEMPLATE_ROOTS.has(name.split('.')[0])||name.split('.').some(part=>UNSAFE_KEYS.has(part)))throw new Error('模板只支持安全变量，例如{{model}}或{{parameters.seed}}');
    return '';
  });
  if(/[{}]{2}/.test(without))throw new Error('模板变量括号不完整');
}
function safeJson(value,{template=false,depth=0,budget={nodes:0}}={}) {
  if(depth>16||++budget.nodes>12000)throw new Error('配置JSON过大或嵌套过深');
  if(value===null||typeof value==='boolean')return value;
  if(typeof value==='number'){if(!Number.isFinite(value))throw new Error('配置数字无效');return value;}
  if(typeof value==='string'){
    if(value.length>65536||value.includes('\0')||BAD_PROVIDER.test(value))throw new Error('配置文本无效或包含已禁用供应商');
    if(template)validateTemplateString(value);
    return value;
  }
  if(Array.isArray(value))return value.map(item=>safeJson(item,{template,depth:depth+1,budget}));
  if(!isObject(value))throw new Error('配置只能包含JSON数据');
  const result={};for(const [key,item]of Object.entries(value)){
    if(UNSAFE_KEYS.has(key)||SECRET_KEYS.test(key))throw new Error('模板/参数不能存储凭证或原型字段');
    result[key]=safeJson(item,{template,depth:depth+1,budget});
  }
  return result;
}
function relativePath(value,{polling=false}={}) {
  const result=text(value,'接口路径',1500);
  if(!result.startsWith('/')||result.startsWith('//')||result.includes('\\')||result.includes('#'))throw new Error('接口路径必须是相对于服务地址的/路径');
  let decoded;try{decoded=decodeURIComponent(result);}catch{throw new Error('接口路径编码无效');}
  if(decoded.split('?')[0].split('/').some(part=>part==='.'||part==='..')||/[\r\n\x00]/.test(decoded)||decoded.startsWith('//'))throw new Error('接口路径无效');
  if([...new URL(result,'https://service.invalid').searchParams.keys()].some(key=>SECRET_KEYS.test(key)))throw new Error('接口路径不能包含鉴权凭证查询字段');
  validateTemplateString(result);
  if(polling&&!result.includes('{{taskId}}'))throw new Error('轮询路径必须包含{{taskId}}');
  return result;
}
function selectors(input,keys) {
  if(!isObject(input))throw new Error('响应映射无效');
  const result={};for(const key of keys)if(input[key]!==undefined){parseFieldPath(input[key]);result[key]=input[key];}
  return result;
}
function normalizeRequestEncoding(request) {
  const result={};
  if(request.encoding!==undefined){
    if(!['json','multipart-form-data'].includes(request.encoding))throw new Error('请求编码仅支持JSON或multipart-form-data');
    result.encoding=request.encoding;
  }
  if(request.fileFields!==undefined){
    const fields=request.fileFields;
    if(request.encoding!=='multipart-form-data'||!Array.isArray(fields)||fields.length>32||new Set(fields).size!==fields.length||fields.some(key=>typeof key!=='string'||!/^[A-Za-z_][A-Za-z0-9_.\[\]-]{0,99}$/.test(key)||UNSAFE_KEYS.has(key)||SECRET_KEYS.test(key)||!Object.hasOwn(request.template||{},key)))throw new Error('文件字段必须是multipart模板中明确声明的顶层字段');
    result.fileFields=[...fields];
  }
  return result;
}
function normalizeModelCatalog(catalog=[],options={}) {
  if(!Array.isArray(catalog)||catalog.length>512)throw new Error('模型目录必须是最多512项的数组');
  const seen=new Set();
  return catalog.map(raw=>{
    if(!isObject(raw))throw new Error('模型目录项无效');
    const id=modelId(raw.id),kind=raw.kind;
    if(!KINDS.includes(kind))throw new Error('模型类型无效');
    if(options.scope==='production'&&/^aiyouplus-wuread-/i.test(id))throw new Error('旧Wuread画布模型不能作为正式模型');
    if(seen.has(kind+'\0'+id))throw new Error('同类型模型ID重复');seen.add(kind+'\0'+id);
    const model={id,name:text(raw.name??id,'模型名称',200),kind};
    if(raw.inputModalities!==undefined){if(!Array.isArray(raw.inputModalities)||raw.inputModalities.some(x=>!['text','image','video','audio'].includes(x)))throw new Error('模型输入类型无效');model.inputModalities=[...new Set(raw.inputModalities)];}
    if(raw.maxReferences!==undefined){if(!Number.isInteger(raw.maxReferences)||raw.maxReferences<0||raw.maxReferences>64)throw new Error('参考素材上限无效');model.maxReferences=raw.maxReferences;}
    if(raw.parameters!==undefined){if(!isObject(raw.parameters))throw new Error('模型参数必须为JSON对象');model.parameters=safeJson(raw.parameters);}
    if(raw.parameterSchema!==undefined){if(!isObject(raw.parameterSchema))throw new Error('参数说明必须为安全JSON对象');model.parameterSchema=safeJson(raw.parameterSchema);}
    if(raw.referencePurpose!==undefined)model.referencePurpose=text(raw.referencePurpose,'参考素材用途',200);
    if(raw.maskSupported!==undefined){if(typeof raw.maskSupported!=='boolean')throw new Error('蒙版能力须明确为布尔值');model.maskSupported=raw.maskSupported;}
    if(raw.request!==undefined){
      if(!isObject(raw.request)||String(raw.request.method||'POST').toUpperCase()!=='POST')throw new Error('生成接口仅允许POST');
      if(raw.request.headers!==undefined)throw new Error('请求模板不能自行配置鉴权请求头');
      if(!isObject(raw.request.template))throw new Error('请求模板必须为JSON对象');
      model.request={method:'POST',path:relativePath(raw.request.path),template:safeJson(raw.request.template,{template:true}),...normalizeRequestEncoding(raw.request)};
      if(raw.request.optionalFields!==undefined){
        const list=raw.request.optionalFields;
        if(!Array.isArray(list)||list.length>128||list.some(key=>typeof key!=='string'||!Object.hasOwn(model.request.template,key)||!/^\{\{[^{}]+\}\}$/.test(model.request.template[key])||raw.parameterSchema?.[key]?.required===true))throw new Error('可选字段须为模板中非必填的完整变量字段');
        model.request.optionalFields=[...new Set(list)];
      }
    }
    if(raw.response!==undefined){
      model.response=selectors(raw.response,['textPath','urlsPath','base64Path','taskIdPath','statusPath','errorPath','subtitlePath','subtitleUrlPath']);
      if(raw.response.binary!==undefined){if(typeof raw.response.binary!=='boolean')throw new Error('binary必须为布尔值');model.response.binary=raw.response.binary;}
      if(raw.response.mimeType!==undefined){const mime=text(raw.response.mimeType,'响应MIME',100);if(!/^[a-z0-9.+-]+\/[a-z0-9.+-]+$/i.test(mime))throw new Error('响应MIME无效');model.response.mimeType=mime;}
    }
    if(raw.polling!==undefined){
      const poll=raw.polling;if(!isObject(poll)||String(poll.method||'GET').toUpperCase()!=='GET')throw new Error('轮询接口仅允许GET');
      model.polling={method:'GET',path:relativePath(poll.path,{polling:true}),...selectors(poll,['statusPath','urlsPath','base64Path','errorPath','subtitlePath','subtitleUrlPath'])};
      if(!model.polling.statusPath)throw new Error('轮询必须配置statusPath');
      for(const field of ['completedValues','failedValues']){if(!Array.isArray(poll[field])||!poll[field].length||poll[field].length>30)throw new Error('轮询完成/失败状态列表无效');model.polling[field]=poll[field].map(x=>text(x,'轮询状态',100));}
      if(poll.download!==undefined){
        const download=poll.download;
        if(!isObject(download)||String(download.method||'GET').toUpperCase()!=='GET'||!DOWNLOAD_MEDIA_TYPES.has(download.mimeType))throw new Error('任务结果回取仅支持已声明的GET媒体格式');
        model.polling.download={method:'GET',path:relativePath(download.path,{polling:true}),mimeType:download.mimeType};
      }
    }
    if(options.protocol==='http-json'&&(!model.request||!model.response||(!model.response.binary&&!['textPath','urlsPath','base64Path','taskIdPath'].some(key=>Object.hasOwn(model.response,key)))))throw new Error('HTTP JSON模型必须配置请求与结果映射');
    if(model.polling&&!model.response?.taskIdPath)throw new Error('轮询模型必须配置taskIdPath');
    return model;
  });
}
function validateServiceProfile(raw,options={}) {
  if(!isObject(raw))throw new Error('服务配置必须为JSON对象');
  const provider=raw.provider||raw.id;
  if(provider!==undefined&&!serviceId(provider))throw new Error('服务ID必须是已有官方ID或service-UUID');
  const builtin=BUILTIN_PROFILES[provider]||{};
  const name=text(raw.name??builtin.name??'自定义模型服务','服务名称',120),protocol=raw.protocol||builtin.protocol||'openai-compatible';
  if(!PROTOCOLS.includes(protocol))throw new Error('服务协议无效');
  const url=assertServiceUrl(raw.baseUrl??builtin.baseUrl),scope=raw.scope||builtin.scope||'production';
  if(url.search||url.hash)throw new Error('服务地址不能包含查询或片段');
  if(!['production','test'].includes(scope))throw new Error('服务范围无效');
  if((provider==='wuread'||isWureadUrl(url.href))&&scope!=='test')throw new Error('Wuread仅允许测试范围');
  if(scope==='test'&&options.sessionOnly!==true&&raw.sessionOnly!==true&&!options.allowArchivedTest)throw new Error('测试服务必须仅在当前会话保存');
  if(provider==='deepseek'&&url.origin!=='https://api.deepseek.com')throw new Error('DeepSeek官方配置必须使用官方地址；第三方请新增服务');
  if(provider==='minimax'&&url.href.replace(/\/+$/,'')!=='https://api.minimax.io')throw new Error('MiniMax官方配置必须使用官方地址；第三方请新增服务');
  const authType=raw.authType||builtin.authType||(protocol==='anthropic-messages'?'api-key':'bearer');
  if(!['bearer','api-key','none'].includes(authType))throw new Error('鉴权类型无效');
  const authHeader=authType==='none'?'':text(raw.authHeader||builtin.authHeader||(authType==='bearer'?'Authorization':'X-API-Key'),'鉴权请求头',100);
  if(authHeader&&(!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(authHeader)||BLOCKED_HEADERS.has(authHeader.toLowerCase())||authHeader.toLowerCase().startsWith('proxy-')))throw new Error('鉴权请求头不允许注入或覆盖传输字段');
  if(raw.enabled!==undefined&&typeof raw.enabled!=='boolean')throw new Error('服务启停值必须为布尔值');
  let docsUrl=raw.docsUrl??builtin.docsUrl??'';
  if(docsUrl){const doc=assertServiceUrl(docsUrl,'文档地址');if([...doc.searchParams.keys()].some(x=>/^(api[-_]?key|token|secret|password)$/i.test(x)))throw new Error('文档地址不能保存凭证');docsUrl=doc.href;}
  const modelCatalog=normalizeModelCatalog(raw.modelCatalog??[],{protocol,scope});
  const models={};
  if(raw.models!==undefined){if(!isObject(raw.models))throw new Error('默认模型配置无效');for(const [kind,id]of Object.entries(raw.models)){if(!KINDS.includes(kind))throw new Error('默认模型类型无效');models[kind]=modelId(id);if(scope==='production'&&/^aiyouplus-wuread-/i.test(models[kind]))throw new Error('旧Wuread画布模型不能成为正式默认');}}
  if(protocol==='http-json'&&Object.entries(models).some(([kind,id])=>!modelCatalog.some(model=>model.kind===kind&&model.id===id)))throw new Error('HTTP JSON默认模型必须具有对应的请求与响应配置，不能回退到其他模型');
  return {...(provider?{provider}:{}),name,baseUrl:url.href.replace(/\/+$/,''),protocol,authType,authHeader,scope,enabled:raw.enabled??builtin.enabled??true,docsUrl,modelCatalog,models};
}
module.exports={BUILTIN_PROFILES,PROTOCOLS,KINDS,MINIMAX_SYSTEM_VOICES,createServiceId,validateServiceProfile,normalizeModelCatalog,normalizeRequestEncoding,parseFieldPath,isWureadUrl,isValidServiceId:serviceId};
