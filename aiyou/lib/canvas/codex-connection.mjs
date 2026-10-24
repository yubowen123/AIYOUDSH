import {randomUUID} from 'node:crypto';

const PROVIDER='openai-codex',KEY='llm-pi-ai/openai-codex';
const unsafeKeys=new Set(['__proto__','constructor','prototype']);
const fail=(code,message)=>Object.assign(new Error(message),{code});
const short=(value,max=2000)=>typeof value==='string'?value.slice(0,max):'';
const abortError=()=>fail('ABORTED','授权交互已撤回');
const terminal=new Set(['authorized','cancelled','failed']);
function scopeOf(context){
 const {sessionId,projectId}=context||{};
 if([sessionId,projectId].some(x=>typeof x!=='string'||!x||x.length>240||/[\x00-\x1f]/.test(x)))throw fail('SCOPE_REQUIRED','Codex 连接需要当前 DSH 对话和画布项目');
 return {sessionId,projectId,key:sessionId+'\0'+projectId};
}
function atPath(value,path){for(const key of path){if(value===null||typeof value!=='object'||!Object.hasOwn(value,key))return undefined;value=value[key];}return value;}
function publicUrl(value){
 if(typeof value!=='string'||value.length>16000)return undefined;
 try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||!u.hostname||/[\x00-\x20]/.test(value))return undefined;return u.href;}catch{return undefined;}
}
function publicFailure(error){
 const messages={NO_FLOW:'当前宿主没有注册 Codex 授权流程',UNKNOWN_METHOD:'宿主未提供该授权方式',ALREADY_IN_FLIGHT:'另一个 Codex 授权流程正在进行',NOT_COMMITTED:'宿主未确认本次授权凭证已提交',UNSUPPORTED_PROMPT:'宿主提供了无法显示的授权问题',INVALID_AUTH_NOTICE:'宿主提供了无效的授权网址',INVALID_OUTCOME:'宿主没有确认授权结果'};
 const code=Object.hasOwn(messages,error?.code)?error.code:'AUTHORIZATION_FAILED';
 return {code,message:messages[code]||'Codex 授权未完成，请在宿主连接界面重试'};
}

/** Only native metadata/flows are used. No credential values are read or copied. */
export function createCodexConnection({ctx,emit=()=>{}}={}){
 if(!ctx)throw new TypeError('缺少 DSH 宿主上下文');
 const states=new Map(),cancelledRequests=new Set();let active=null,disposed=false,enableQueue=Promise.resolve();
 const service=name=>ctx.get?.(name)||ctx[name];
 const changed=a=>{a.updatedAt=new Date().toISOString();if(disposed)return;try{Promise.resolve(emit('codex-connection',{provider:PROVIDER,attemptId:a.id,status:a.status,authorized:a.status==='authorized'},{sessionId:a.scope.sessionId,projectId:a.scope.projectId})).catch(()=>{});}catch{}};
 function assertLive(){if(disposed)throw fail('DISPOSED','Codex 连接服务已关闭');}
 function current(scope,args={}){
  const a=states.get(scope.key);
  if(!a||args.attemptId!==a.id)throw fail('ATTEMPT_NOT_FOUND','本对话与项目中没有该授权尝试');
  return a;
 }
 function view(a){return a?{attemptId:a.id,status:a.status,authorized:a.status==='authorized',createdAt:a.createdAt,updatedAt:a.updatedAt,...(a.notices.length?{notices:a.notices.map(n=>({...n}))}:{}),...(a.prompt?{prompt:structuredClone(a.prompt)}:{}),...(a.failure?{error:{...a.failure}}:{})}:{status:'idle',authorized:false};}
 async function metadata(){
  const llm=service('llm'),auth=service('authorization');
  const directory=llm?.listConfigurableProviders?await llm.listConfigurableProviders():[];
  const entry=Array.isArray(directory)?directory.find(p=>p.provider===PROVIDER):undefined;
  const providers=llm?.listProviders?await llm.listProviders():[];
  const flow=auth?.describe?await auth.describe(KEY):undefined;
  return {entry,flow,public:{provider:PROVIDER,catalogSupported:Boolean(entry),enabled:Array.isArray(providers)&&providers.some(p=>p.id===PROVIDER),flowAvailable:Boolean(flow?.methods?.some(m=>m.id==='oauth')),credentialManagedByHost:true,modelCallVerified:false}};
 }
 async function status(scope){const data=await metadata();return {...data.public,...view(states.get(scope.key))};}
 function clearPrompt(a,error){
  const waiter=a.waiter;a.waiter=null;a.prompt=null;
  if(waiter){waiter.cleanup();waiter.reject(error||abortError());}
 }
 function requestCancel(a){
  if(terminal.has(a.status))return;
  a.status='cancelling';clearPrompt(a);a.notices=[];changed(a);
  a.controller.abort();
  try{service('authorization')?.cancel?.(KEY);}catch{}
 }
 function nativePrompt(a,prompt){
  if(disposed||a.controller.signal.aborted||prompt?.signal?.aborted)return Promise.reject(abortError());
  if(a.waiter)return Promise.reject(fail('UNSUPPORTED_PROMPT','宿主同时提供了多个授权问题'));
  if(!prompt||!['text','secret','select'].includes(prompt.kind))return Promise.reject(fail('UNSUPPORTED_PROMPT','无法显示该授权问题'));
  const publicPrompt={id:randomUUID(),kind:prompt.kind,message:short(prompt.message),...(typeof prompt.placeholder==='string'?{placeholder:short(prompt.placeholder,500)}:{})};
  if(prompt.kind==='select'){
   if(!Array.isArray(prompt.options)||!prompt.options.length||prompt.options.length>50||prompt.options.some(o=>typeof o?.id!=='string'||!o.id||o.id.length>240))return Promise.reject(fail('UNSUPPORTED_PROMPT','授权选项无效'));
   publicPrompt.options=prompt.options.map(o=>({id:o.id,label:short(o.label,500),...(typeof o.description==='string'?{description:short(o.description,1000)}:{})}));
  }
  return new Promise((resolve,reject)=>{
   const withdraw=()=>{if(a.waiter?.id!==publicPrompt.id)return;clearPrompt(a);changed(a);};
   const cleanup=()=>{prompt.signal?.removeEventListener('abort',withdraw);a.controller.signal.removeEventListener('abort',withdraw);};
   a.waiter={id:publicPrompt.id,resolve,reject,cleanup};a.prompt=publicPrompt;
   prompt.signal?.addEventListener('abort',withdraw,{once:true});a.controller.signal.addEventListener('abort',withdraw,{once:true});
   changed(a);
  });
 }
 async function begin(scope,args,context){
  if(args.method!==undefined&&args.method!=='oauth')throw fail('UNKNOWN_METHOD','请选择宿主提供的 OAuth 连接方式');
  if(args.requestId!==undefined&&(typeof args.requestId!=='string'||!args.requestId||args.requestId.length>160||/[\x00-\x1f]/.test(args.requestId)))throw fail('INVALID_REQUEST','授权请求标识无效');
  const requestKey=args.requestId?scope.key+'\0'+args.requestId:null;
  if(requestKey&&cancelledRequests.has(requestKey))throw abortError();
  const existing=states.get(scope.key);
  if(existing&&!terminal.has(existing.status))return {...(await metadata()).public,...view(existing)};
  if(active&&!terminal.has(active.status))throw fail('ALREADY_IN_FLIGHT','另一个 Codex 授权流程正在进行');
  const data=await metadata();
  // Recheck after asynchronous metadata reads: two simultaneous clicks may race.
  assertLive();
  if(active&&!terminal.has(active.status)){
   if(active.scope.key===scope.key)return {...data.public,...view(active)};
   throw fail('ALREADY_IN_FLIGHT','另一个 Codex 授权流程正在进行');
  }
  if(!data.public.flowAvailable||!service('authorization')?.begin)throw fail('NO_FLOW','当前宿主没有注册 Codex OAuth 流程');
  if(data.flow.inFlight)throw fail('ALREADY_IN_FLIGHT','宿主已有 Codex 授权流程正在进行');
  if(context.signal?.aborted)throw abortError();
  if(requestKey&&cancelledRequests.has(requestKey))throw abortError();
  const a={id:randomUUID(),requestId:args.requestId,scope,status:'starting',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),controller:new AbortController(),notices:[],prompt:null,waiter:null};
  active=a;states.delete(scope.key);states.set(scope.key,a);
  while(states.size>64){const oldest=[...states].find(([,value])=>terminal.has(value.status));if(!oldest)break;states.delete(oldest[0]);}
  const abort=()=>requestCancel(a);context.signal?.addEventListener('abort',abort,{once:true});
  changed(a);
  a.done=Promise.resolve().then(async()=>{
   if(a.controller.signal.aborted){a.status='cancelled';return;}
   a.status='running';changed(a);
   const outcome=await service('authorization').begin({key:KEY,method:'oauth',signal:a.controller.signal,interaction:{
    notify(notice){
     if(disposed||a.controller.signal.aborted)return;
     const url=notice?.url===undefined?undefined:publicUrl(notice.url);
     if(notice?.url!==undefined&&!url){a.noticeFailure=fail('INVALID_AUTH_NOTICE','宿主提供了无效的授权网址');requestCancel(a);return;}
     a.notices.push({id:randomUUID(),message:short(notice?.message),...(url?{url}:{}),...(typeof notice?.code==='string'?{code:short(notice.code,200)}:{})});
     if(a.notices.length>8)a.notices.shift();changed(a);
    },
    prompt:prompt=>nativePrompt(a,prompt)
   }});
   if(a.noticeFailure)throw a.noticeFailure;
   if(!outcome||!['authorized','cancelled'].includes(outcome.status))throw fail('INVALID_OUTCOME','宿主未确认授权结果');
   a.status=outcome.status;
  }).catch(error=>{
   if(a.noticeFailure){a.status='failed';a.failure=publicFailure(a.noticeFailure);}
   else if(a.controller.signal.aborted)a.status='cancelled';
   else{a.status='failed';a.failure=publicFailure(error);}
  }).finally(()=>{
   clearPrompt(a);a.notices=[];context.signal?.removeEventListener('abort',abort);
   if(active===a)active=null;if(!disposed)changed(a);
  });
  return {...data.public,...view(a)};
 }
 async function enable(){
  const data=await metadata(),settings=service('settings'),entry=data.entry;
  if(!entry)throw fail('PROVIDER_UNAVAILABLE','当前宿主没有提供 Codex 模型目录');
  const path=entry.settingsPath,ns=entry.settingsNs;
  if(typeof ns!=='string'||!ns||ns.length>240||!Array.isArray(path)||!path.length||path.length>8||path.at(-1)!==PROVIDER||path.some(k=>typeof k!=='string'||!k||unsafeKeys.has(k)))throw fail('INVALID_SETTINGS_TARGET','宿主 Codex 设置地址无效');
  if(!settings?.describe||!settings?.mutate)throw fail('SETTINGS_UNAVAILABLE','当前宿主没有提供可写模型设置');
  const descriptors=await settings.describe({redactSecrets:true}),descriptor=descriptors.find(d=>d.ns===ns);
  if(!descriptor||!Number.isSafeInteger(descriptor.revision))throw fail('SETTINGS_UNAVAILABLE','无法读取宿主 Codex 设置版本');
  if(atPath(descriptor.value,path)!==undefined)return {changed:false};
  assertLive();
  await settings.mutate(ns,[{op:'set',path:[...path],value:{}}],descriptor.revision);
  return {changed:true};
 }
 async function invoke(command,args={},context={}){
  assertLive();const scope=scopeOf(context);
  if(typeof command!=='string'||!args||typeof args!=='object'||Array.isArray(args))throw fail('INVALID_REQUEST','Codex 连接请求格式无效');
  const kind=command.replace(/^dsh_codex_/,'');
  if(kind==='status')return status(scope);
  if(kind==='enable'){
   const operation=enableQueue.then(()=>{assertLive();return enable();});enableQueue=operation.catch(()=>{});
   const result=await operation;return {...(await status(scope)),...result};
  }
  if(kind==='begin')return begin(scope,args,context);
  if(kind==='cancel'){
   // A page can close before its begin HTTP response arrives. Its scoped
   // requestId cancels only that begin, even if cancellation is delivered first.
   if(args.attemptId===undefined&&typeof args.requestId==='string'&&args.requestId&&args.requestId.length<=160&&!/[\x00-\x1f]/.test(args.requestId)){
    const requestKey=scope.key+'\0'+args.requestId;cancelledRequests.add(requestKey);
    while(cancelledRequests.size>128)cancelledRequests.delete(cancelledRequests.values().next().value);
    const a=states.get(scope.key);if(a?.requestId===args.requestId){requestCancel(a);return {...(await metadata()).public,...view(a)};}
    return {...(await metadata()).public,status:'cancelled',authorized:false};
   }
   const a=current(scope,args);requestCancel(a);return {...(await metadata()).public,...view(a)};
  }
  if(kind==='respond'){
   const a=current(scope,args);
   if(!a.waiter||!a.prompt||args.promptId!==a.prompt.id)throw fail('PROMPT_NOT_FOUND','该授权问题已结束或撤回');
   if(args.decline===true){requestCancel(a);return {...(await metadata()).public,...view(a)};}
   if(typeof args.answer!=='string'||!args.answer.trim()||args.answer.length>16000)throw fail('INVALID_ANSWER','请填写有效的授权回答');
   if(a.prompt.kind==='select'&&!a.prompt.options.some(o=>o.id===args.answer))throw fail('INVALID_ANSWER','请选择本次授权提供的选项');
   const waiter=a.waiter;a.waiter=null;a.prompt=null;waiter.cleanup();waiter.resolve(args.answer);changed(a);
   return {...(await metadata()).public,...view(a)};
  }
  throw fail('UNSUPPORTED_COMMAND','不支持的 Codex 连接操作');
 }
 function dispose(){
  if(disposed)return;disposed=true;
  const running=active;if(running)requestCancel(running);
  states.clear();cancelledRequests.clear();return running?.done?.then(()=>{});
 }
 return {invoke,dispose};
}
