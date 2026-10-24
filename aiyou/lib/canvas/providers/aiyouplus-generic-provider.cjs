'use strict';
// Declarative model transports. No executable snippets, provider keys or SDKs
// are taken from documentation; credentials remain scoped to their service.
const {assertNetworkAllowed}=require('./aiyouplus-runtime.cjs');
const {parseFieldPath,isWureadUrl,normalizeModelCatalog}=require('./aiyouplus-provider-registry.cjs');
const {buildChatPayload}=require('./aiyouplus-chat-request.cjs');
const BAD=/qiniu|qnaigc|qbox\.me|clouddn\.com|qnssl\.com|qiniucdn\.com|七牛/i;
const CHAT_FIELDS=['tools','tool_choice','response_format','max_tokens','temperature','top_p','stop','parallel_tool_calls'];
function select(value,selector) {
  if(selector===undefined)return undefined;
  let values=[value];
  for(const part of parseFieldPath(selector))values=values.flatMap(item=>part==='*'?(Array.isArray(item)?item:Object.values(item||{})):[item!=null&&Object.hasOwn(Object(item),part)?item[part]:undefined]);
  return values.length===1?values[0]:values;
}
function render(value,variables) {
  if(Array.isArray(value))return value.map(item=>render(item,variables)).filter(item=>item!==undefined);
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,render(item,variables)]).filter(([,item])=>item!==undefined));
  if(typeof value!=='string')return value;
  const exact=/^\{\{([^{}]+)\}\}$/.exec(value);
  if(exact){const found=select(variables,exact[1]);if(found===undefined)throw new Error('请求模板缺少参数：'+exact[1]);return structuredClone(found);}
  return value.replace(/\{\{([^{}]+)\}\}/g,(_,selector)=>{const found=select(variables,selector);if(found===undefined||found===null||typeof found==='object')throw new Error('请求模板缺少标量参数：'+selector);return String(found);});
}
function address(cfg,relative) {
  if(typeof relative!=='string'||!relative.startsWith('/')||relative.startsWith('//')||relative.includes('\\')||relative.includes('#'))throw new Error('接口必须为服务内相对路径');
  const base=new URL(cfg.baseUrl),suffix=base.pathname.replace(/\/+$/,'').endsWith('/v1')&&relative.startsWith('/v1/')?relative.slice(3):relative;
  const url=new URL(cfg.baseUrl.replace(/\/+$/,'')+suffix);
  if([...url.searchParams.keys()].some(key=>/api[-_]?key|token|secret|password/i.test(key)))throw new Error('接口地址不能携带凭证参数');
  if(url.origin!==base.origin||BAD.test(url.href))throw new Error('接口不能越过配置的服务域名或访问禁用供应商');
  if(isWureadUrl(url)&&cfg.scope!=='test')throw new Error('此接口仅允许当前会话测试');
  assertNetworkAllowed(url.href,false);return url.href;
}
function headers(cfg) {
  const value={'Content-Type':'application/json'};
  if(cfg.authType!=='none'){
    if(!cfg.apiKey)throw new Error('当前服务未配置凭证');
    const name=cfg.authHeader||(cfg.authType==='api-key'?'X-API-Key':'Authorization');
    if(!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(name)||/^(host|cookie|content-type|content-length|proxy-)/i.test(name))throw new Error('鉴权请求头无效');
    value[name]=cfg.authType==='api-key'?cfg.apiKey:'Bearer '+cfg.apiKey;
  }
  if(cfg.protocol==='anthropic-messages')value['anthropic-version']='2023-06-01';
  return value;
}
function sources(refs){return refs.imageUrls||refs.referenceImageUrls||(refs.imageUrl?[refs.imageUrl]:[]);}
function anthropicPayload(payload,parameters) {
  if(payload.response_format!==undefined)throw new Error('Claude Messages不接受OpenAI response_format；请使用已核对的原生结构化输出映射');
  const system=payload.messages.filter(m=>m.role==='system').map(m=>m.content).join('\n');
  const convert=part=>{
    if(part.type==='text')return{type:'text',text:part.text};
    const url=part.image_url?.url,match=typeof url==='string'&&/^data:([^;]+);base64,(.+)$/s.exec(url);
    if(!url)throw new Error('Claude图片输入格式无效');
    return{type:'image',source:match?{type:'base64',media_type:match[1],data:match[2]}:{type:'url',url}};
  };
  const messages=payload.messages.filter(m=>m.role!=='system').map(m=>{
    if(m.role==='tool')return{role:'user',content:[{type:'tool_result',tool_use_id:m.tool_call_id,content:m.content}]};
    const content=typeof m.content==='string'?[{type:'text',text:m.content}]:Array.isArray(m.content)?m.content.map(convert):[];
    for(const tool of m.tool_calls||[])content.push({type:'tool_use',id:tool.id,name:tool.function.name,input:JSON.parse(tool.function.arguments)});
    return{role:m.role,content};
  });
  const body={...parameters,model:payload.model,max_tokens:payload.max_tokens||parameters.max_tokens||4096,messages,...(system?{system}:{})};
  if(payload.tools)body.tools=payload.tools.map(t=>({name:t.function.name,description:t.function.description,input_schema:t.function.parameters||{type:'object'}}));
  if(payload.tool_choice!==undefined){const choice=payload.tool_choice;body.tool_choice=typeof choice==='string'?{type:choice==='required'?'any':choice}:choice?.type==='function'?{type:'tool',name:choice.function?.name}:choice;}
  if(payload.stop!==undefined)body.stop_sequences=Array.isArray(payload.stop)?payload.stop:[payload.stop];
  if(payload.parallel_tool_calls!==undefined)body.tool_choice={...(body.tool_choice||{type:'auto'}),disable_parallel_tool_use:!payload.parallel_tool_calls};
  for(const key of ['response_format','stop','parallel_tool_calls'])delete body[key];
  for(const key of ['temperature','top_p','stop_sequences'])if(payload[key]!==undefined)body[key]=payload[key];
  return body;
}
function buildGenericRequest(cfg,args,refs={},ctx={}) {
  if(cfg.enabled===false||cfg.legacyArchived)throw new Error('当前模型服务已停用');
  const model=cfg.modelCatalog?.find(item=>item.id===args.model&&item.kind===args.kind);
  if(!model)throw new Error('当前服务未配置该类型的模型，请先补全模型目录');
  const images=sources(refs),max=model.maxReferences??(model.inputModalities?.includes('image')?5:0);
  if(images.length>max)throw new Error('参考图片超过模型配置上限：'+max);
  if(images.length&&!model.inputModalities?.includes('image'))throw new Error('当前模型未声明图片输入能力，请先配置或清空参考图');
  const supplied=normalizeModelCatalog([{id:args.model,kind:args.kind,parameters:args.parameters||{}}])[0].parameters;
  const parameters={...(model.parameters||{}),...supplied};
  for(const key of ['duration','resolution','aspectRatio','voiceId','speed','volume','pitch','lyrics','instrumental','count','seed','width','height',...CHAT_FIELDS])if(args[key]!==undefined)parameters[key]=args[key];
  const chat=args.kind==='chat'?buildChatPayload(cfg,args,args.prompt||'',{imageUrls:images},ctx):undefined;
  const nativeChat=chat&&(cfg.protocol==='anthropic-messages'?anthropicPayload(chat,parameters):{...chat,...parameters,...Object.fromEntries(Object.entries(chat).filter(([key])=>args[key]!==undefined)),model:args.model,messages:chat.messages,stream:false});
  const chatImages=chat?.messages.flatMap(m=>Array.isArray(m.content)?m.content:[]).filter(p=>p.type==='image_url').length||0;
  if(chatImages&&(!model.inputModalities?.includes('image')||chatImages>max))throw new Error('当前模型仅接受已声明范围内的文字或参考图片');
  const variables={...parameters,...args,model:args.model,prompt:args.prompt,parameters,messages:nativeChat?.messages,system:nativeChat?.system,tools:nativeChat?.tools,references:images,referenceImages:images,referenceImageUrls:images,referenceUrls:images.filter(x=>/^https?:/.test(x)),referenceBase64:images.map(x=>x.replace(/^data:[^;]+;base64,/,'')),firstFrame:args.firstFrame||images[0],lastFrame:args.lastFrame};
  if(model.request){
    const mapping=JSON.stringify(model.request.template)+' '+model.request.path;
    if(chatImages&&cfg.protocol==='http-json'&&!/\{\{messages(?:\}\}|\.)/.test(mapping))throw new Error('API请求模板尚未映射对话中的参考图片，未提交生成');
    if(images.length&&!/\{\{(?:references|referenceImages|referenceImageUrls|referenceUrls|referenceBase64|firstFrame|messages)(?:\}\}|\.)/.test(mapping))throw new Error('API请求模板尚未映射参考图片，未提交生成');
    for(const [key,value]of Object.entries({...supplied,...Object.fromEntries(['duration','resolution','aspectRatio','voiceId','speed','volume','pitch','lyrics','instrumental','count','seed','width','height',...CHAT_FIELDS].filter(k=>args[k]!==undefined).map(k=>[k,args[k]]))})){
      if(args.kind==='chat'&&['openai-compatible','anthropic-messages'].includes(cfg.protocol)&&CHAT_FIELDS.includes(key))continue;
      const mapped=mapping.includes('{{parameters}}')||mapping.includes('{{parameters.'+key+'}}')||mapping.includes('{{parameters.'+key+'.')||mapping.includes('{{'+key+'}}');
      if(!mapped&&JSON.stringify(value)!==JSON.stringify(model.parameters?.[key]))throw new Error('API请求模板尚未映射参数：'+key+'；请补充映射，未提交生成');
    }
  }
  let request=model.request,response=model.response||{};
  if(!request){
    if(cfg.protocol==='openai-compatible'){
      if(args.kind==='chat'){request={path:'/v1/chat/completions',template:{...chat,...parameters,...Object.fromEntries(Object.entries(chat).filter(([key])=>args[key]!==undefined)),model:args.model,messages:chat.messages,stream:false}};response={textPath:'choices.0.message.content'};}
      else if(args.kind==='image'){
        if(images.length)throw new Error('参考生图需配置真实图片编辑接口和请求映射，不能以文生图接口代替');
        request={path:'/v1/images/generations',template:{...parameters,model:args.model,prompt:args.prompt,n:1}};response={urlsPath:'data',base64Path:'data.0.b64_json'};
      }else if(args.kind==='audio'){request={path:'/v1/audio/speech',template:{...parameters,model:args.model,input:args.prompt,voice:args.voiceId||parameters.voice||'alloy',response_format:'mp3'}};response={binary:true,mimeType:'audio/mpeg'};}
      else throw new Error('视频/音乐需配置供应商真实请求、结果和任务查询映射');
    }else if(cfg.protocol==='anthropic-messages'&&args.kind==='chat'){request={path:'/v1/messages',template:anthropicPayload(chat,parameters)};response={textPath:'content'};}
    else throw new Error('该协议需要配置明确的请求与响应映射');
  }
  // Only declared templates are expanded. User prompts/tool results in a
  // standard protocol payload must keep literal {{...}} text unchanged.
  let body=model.request?render(request.template,variables):request.template;
  if(model.request&&args.kind==='chat'&&['openai-compatible','anthropic-messages'].includes(cfg.protocol))body={...body,...nativeChat};
  for(const [key,schema]of Object.entries(model.parameterSchema||{})){
    if(!schema||typeof schema!=='object')continue;
    const value=body[key]??args[key]??chat?.[key]??parameters[key];
    if(value===undefined){if(schema.required===true)throw new Error('缺少模型参数：'+key);continue;}
    const type=schema.type;
    if(type==='integer'&&!Number.isInteger(value)||type==='number'&&(!Number.isFinite(value)||typeof value!=='number')||type==='string'&&typeof value!=='string'||type==='boolean'&&typeof value!=='boolean')throw new Error('模型参数类型不符：'+key);
    if(schema.enum&&!schema.enum.some(x=>JSON.stringify(x)===JSON.stringify(value)))throw new Error('模型参数不在可用选项中：'+key);
    if(typeof value==='number'&&(value<(schema.minimum??schema.min??-Infinity)||value>(schema.maximum??schema.max??Infinity)))throw new Error('模型参数超出范围：'+key);
    if(typeof value==='string'&&(value.length<(schema.minLength??0)||value.length>(schema.maxLength??Infinity)))throw new Error('模型参数文本长度超限：'+key);
  }
  if(Buffer.byteLength(JSON.stringify(body))>64*1024*1024)throw new Error('模型请求超过64 MiB');
  const pathVariables=Object.fromEntries(Object.entries(variables).filter(([,v])=>['string','number','boolean'].includes(typeof v)).map(([k,v])=>[k,encodeURIComponent(String(v))]));
  return {url:address(cfg,render(request.path,pathVariables)),method:'POST',headers:headers(cfg),body,response,polling:model.polling,model};
}
async function readResponse(ctx,cfg,url,options,responseMap,signal){
  const response=await ctx.fetch(url,{...options,signal:signal?AbortSignal.any([signal,AbortSignal.timeout(180000)]):AbortSignal.timeout(180000),redirect:'error'});
  if(responseMap.binary&&response.ok){
    const buffers=[];let size=0;
    for await(const chunk of response.body){size+=chunk.length;if(size>512*1024*1024)throw new Error('二进制结果超过512 MiB');buffers.push(chunk);}
    const type=(response.headers.get('content-type')||responseMap.mimeType||'').split(';')[0];
    if(!size||/text\/html|application\/json/.test(type))throw new Error('服务未返回有效媒体原件');
    return{binary:{bytes:Buffer.concat(buffers),mimeType:type,extension:type.startsWith('audio/')?'.mp3':type.startsWith('video/')?'.mp4':'.png'}};
  }
  const raw=await response.text();
  if(Buffer.byteLength(raw)>64*1024*1024)throw new Error('模型响应超过64 MiB');
  let data;try{data=JSON.parse(raw);}catch{throw new Error('模型服务返回非JSON响应（HTTP '+response.status+'）');}
  const mappedError=select(data,responseMap.errorPath);
  if(!response.ok||data.success===false||data.error||mappedError){
    const message=typeof mappedError==='string'?mappedError:data.error?.message||data.message||data.errorMessage||('HTTP '+response.status);
    const err=new Error(String(message).split(cfg.apiKey||'\0').join('[REDACTED]').slice(0,1500));err.httpStatus=response.status;err.providerCode=data.code||data.base_resp?.status_code;throw err;
  }
  return{data};
}
function mediaResult(data,response){
  const raw=select(data,response.urlsPath),items=raw===undefined?[]:Array.isArray(raw)?raw:[raw];
  const urls=items.map(item=>typeof item==='string'?item:item?.url).filter(Boolean);
  for(const url of urls){if(!/^https?:\/\//i.test(url)||BAD.test(url))throw new Error('模型媒体地址无效或属于禁用供应商');assertNetworkAllowed(url,false);}
  const encoded=select(data,response.base64Path),buffers=[];
  for(const value of encoded===undefined?[]:Array.isArray(encoded)?encoded:[encoded]){
    if(typeof value!=='string'||value.length>700*1024*1024||!/^[A-Za-z0-9+/=\r\n]+$/.test(value))throw new Error('媒体Base64无效');
    buffers.push({bytes:Buffer.from(value,'base64'),mimeType:response.mimeType||'image/png',extension:response.mimeType?.startsWith('audio/')?'.mp3':'.png'});
  }
  return{urls,buffers};
}
async function executeGeneric(ctx,cfg,args,refs={},previous){
  // Resuming only uses persisted taskId and contract, never issues another POST.
  const plan=previous?.genericContract?{...previous.genericContract,headers:headers(cfg)}:buildGenericRequest(cfg,args,refs,ctx);
  if(previous?.genericContract&&!plan.polling){
    const current=cfg.modelCatalog?.find(item=>item.id===args.model&&item.kind===args.kind);
    if(current?.polling){
      plan.polling=structuredClone(current.polling);
      await ctx.persistJob?.({genericContract:{url:plan.url,response:plan.response,polling:plan.polling}});
    }
  }
  let taskId=previous?.taskId,data;
  if(!taskId){
    const result=await readResponse(ctx,cfg,plan.url,{method:'POST',headers:plan.headers,body:JSON.stringify(plan.body)},plan.response,ctx.signal);
    if(result.binary)return{urls:[],buffers:[result.binary]};
    data=result.data;taskId=select(data,plan.response.taskIdPath);
    if(taskId!==undefined&&taskId!==null){
      if(!['string','number'].includes(typeof taskId)||!String(taskId).trim())throw new Error('模型任务编号无效，禁止重提');
      taskId=String(taskId);
      await ctx.persistJob?.({taskId,status:'running',genericContract:{url:plan.url,response:plan.response,polling:plan.polling}});
    }
  }
  if(taskId){
    if(!plan.polling)throw new Error('已保存服务端任务编号，缺少查询接口；请补全原服务查询映射后恢复，禁止重新提交');
    const began=Date.now();
    for(;;){
      if(Date.now()-began>(ctx.maxPollMs||30*60*1000))throw new Error('等待超时，任务编号已保存，可继续查询而不重新提交');
      const pollPath=render(plan.polling.path,{taskId:encodeURIComponent(taskId)});
      const result=await readResponse(ctx,cfg,address(cfg,pollPath),{method:'GET',headers:plan.headers},plan.polling,ctx.signal);data=result.data;
      const state=String(select(data,plan.polling.statusPath)??'');await ctx.persistJob?.({remoteStatus:state,status:'running'});
      if(plan.polling.completedValues.some(x=>x.toLowerCase()===state.toLowerCase()))break;
      if(plan.polling.failedValues.some(x=>x.toLowerCase()===state.toLowerCase()))throw new Error(String(select(data,plan.polling.errorPath)||'服务端任务失败：'+state));
      await new Promise((resolve,reject)=>{const abort=()=>{clearTimeout(timer);reject(new Error('已停止等待，服务端任务可能继续运行'));};const timer=setTimeout(()=>{ctx.signal?.removeEventListener('abort',abort);resolve();},ctx.pollIntervalMs??3000);if(ctx.signal?.aborted)abort();else ctx.signal?.addEventListener('abort',abort,{once:true});});
    }
  }
  if(args.kind==='chat'){
    if(cfg.protocol==='anthropic-messages'){
      const parts=data.content||[],text=parts.filter(p=>p.type==='text').map(p=>p.text).join('\n'),toolCalls=parts.filter(p=>p.type==='tool_use').map(p=>({id:p.id,type:'function',function:{name:p.name,arguments:JSON.stringify(p.input)}}));
      if(!text&&!toolCalls.length)throw new Error('服务未返回有效对话结果');return{text,toolCalls,usage:data.usage,finishReason:data.stop_reason};
    }
    const text=select(data,plan.response.textPath)||'',choice=data.choices?.[0],toolCalls=choice?.message?.tool_calls;
    if(typeof text!=='string'||(!text.trim()&&!toolCalls?.length))throw new Error('服务未返回文本或工具调用');
    if(toolCalls!==undefined&&(!Array.isArray(toolCalls)||toolCalls.some(tool=>!tool?.id||tool.type!=='function'||typeof tool.function?.name!=='string'||typeof tool.function?.arguments!=='string')))throw new Error('对话接口返回的工具调用格式无效');
    return{text,toolCalls,usage:data.usage,finishReason:choice?.finish_reason};
  }
  const result=mediaResult(data,taskId?{...plan.response,...plan.polling}:plan.response);
  if(!result.urls.length&&!result.buffers.length)throw new Error('任务没有有效媒体原件，未标记成功');
  const mapping=taskId?plan.polling:plan.response;
  return{...result,taskId,subtitle:select(data,mapping?.subtitlePath),subtitleUrl:select(data,mapping?.subtitleUrlPath),metadata:{provider:cfg.provider,model:args.model}};
}
async function genericCatalog(ctx,cfg){
  const configured=cfg.modelCatalog||[];
  if(cfg.authType!=='none'&&!cfg.apiKey)return{modelCatalog:configured,models:cfg.models,liveDiscovery:false,connection:'credentials_required',requiresKey:true};
  if(cfg.protocol!=='openai-compatible'&&cfg.protocol!=='anthropic-messages')return{modelCatalog:configured,models:cfg.models,liveDiscovery:false,connection:'configured_contract_only'};
  const result=await readResponse(ctx,cfg,address(cfg,'/v1/models'),{method:'GET',headers:headers(cfg)}, {},ctx.signal);
  const available=(result.data.data||result.data.models||[]).filter(m=>m?.id&&!BAD.test(m.id)).map(m=>String(m.id));
  // A remote list of IDs alone does not establish image/video/audio capability.
  return{modelCatalog:configured.filter(m=>available.includes(m.id)),models:cfg.models,availableModelIds:available,liveDiscovery:true,connection:'reachable',unclassifiedModelIds:available.filter(id=>!configured.some(m=>m.id===id))};
}
module.exports={buildGenericRequest,executeGeneric,genericCatalog,select,render,address};
