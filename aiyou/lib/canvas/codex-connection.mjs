import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {join} from 'node:path';
import {inspectCodexCli,probeCodexCatalog,cliError} from './codex-cli-rpc.mjs';
import {createCodexCliAdapter,CODEX_CLI_PROVIDER} from './codex-cli-adapter.mjs';

/** Local CLI connection only. CLI owns its existing login and credentials. */
export function createCodexConnection({ctx,emit=()=>{},stateDir,spawnImpl}={}){
 if(!ctx?.llm)throw new TypeError('缺少 DSH 原生 LLM 服务');
 let config={schema:1,enabled:false,executablePath:''},metadata=null,activeMetadata=null,registration=null,adapter=null,disposed=false,queue=Promise.resolve(),lastProbe=0,verified=false,epoch=0;
 const controllers=new Set();
 const file=stateDir?join(stateDir,'local-cli.json'):null;
 const ready=(async()=>{
  if(file)try{const value=JSON.parse(await readFile(file,'utf8'));if(value.schema===1&&typeof value.executablePath==='string')config={schema:1,enabled:value.enabled===true,executablePath:value.executablePath};}catch(e){if(e.code!=='ENOENT')metadata={installed:false,diagnostic:'CLI_CONFIG_UNAVAILABLE'};}
  if(config.enabled)try{await connect({},{});}catch(e){metadata={...(metadata||{}),diagnostic:e.code||'CLI_UNAVAILABLE'};}
 })();
 const live=()=>{if(disposed)throw cliError('DISPOSED','本地 Codex CLI 连接已关闭');};
 function view(){
  // Inspecting a draft path must not relabel an already registered adapter.
  const current=registration?activeMetadata:metadata;
  const detection=registration&&metadata!==activeMetadata&&metadata?.executablePath!==activeMetadata?.executablePath?{executablePath:metadata?.executablePath||'',version:metadata?.version||null,installed:Boolean(metadata?.installed),loggedIn:Boolean(metadata?.loggedIn),diagnostic:metadata?.diagnostic||null}:null;
  return {provider:CODEX_CLI_PROVIDER,connectionType:'local-cli',credentialManagedByCli:true,extraOAuthRequired:false,executablePath:current?.executablePath||config.executablePath||'',version:current?.version||null,installed:Boolean(current?.installed),loggedIn:Boolean(current?.loggedIn),loginMethod:current?.loginMethod||'none',enabled:Boolean(registration),connected:Boolean(registration&&current?.loggedIn&&!current?.diagnostic),status:registration&&current?.diagnostic?'connection-error':registration&&current?.loggedIn?'connected':current?.installed?(current.loggedIn?'detected':'not-logged-in'):'not-installed',models:current?.models||[],modelCallVerified:verified,...(current?.diagnostic?{diagnostic:current.diagnostic}:{}),...(detection?{detection}:{})};
 }
 const publish=context=>{try{Promise.resolve(emit('codex-connection',{provider:CODEX_CLI_PROVIDER,enabled:Boolean(registration),loggedIn:Boolean(metadata?.loggedIn),modelCallVerified:verified},context)).catch(()=>{});}catch{}};
 async function persist(){if(!file)return;await mkdir(stateDir,{recursive:true,mode:0o700});const temp=file+'.tmp';await writeFile(temp,JSON.stringify(config)+'\n',{mode:0o600});await rename(temp,file);}
 async function disconnect(){registration?.();registration=null;activeMetadata=null;const old=adapter;adapter=null;await old?.dispose();}
 async function probe(args={},context={},full=false){
  live();const controller=new AbortController();controllers.add(controller);const signal=context.signal?AbortSignal.any([controller.signal,context.signal]):controller.signal;
  try{
   const path=args.executablePath===undefined?config.executablePath:args.executablePath;
   const found=full?await probeCodexCatalog(path,{spawnImpl,signal}):await inspectCodexCli(path,{spawnImpl,signal});
   metadata={...found,models:full?found.models:(activeMetadata?.executablePath===found.executablePath?activeMetadata.models:metadata?.executablePath===found.executablePath?metadata.models||[]:[])};if(registration&&activeMetadata?.executablePath===found.executablePath)activeMetadata=metadata;
   lastProbe=Date.now();return metadata;
  }catch(e){metadata={installed:!['CLI_NOT_INSTALLED','INVALID_CLI_PATH','INVALID_CLI'].includes(e.code),loggedIn:false,executablePath:args.executablePath??config.executablePath,models:[],diagnostic:e.code||'CLI_UNAVAILABLE'};if(registration&&metadata.executablePath===activeMetadata?.executablePath)activeMetadata={...activeMetadata,diagnostic:metadata.diagnostic};throw e;}
  finally{controllers.delete(controller);}
 }
 async function connect(args,context){
  const generation=epoch,found=await probe(args,context,true);live();if(generation!==epoch)throw cliError('ABORTED','本地 CLI 连接已取消');
  if(!found.loggedIn)throw cliError('CLI_NOT_LOGGED_IN','本机 Codex CLI 尚未登录。请先在终端完成登录；插件不会自动登录或另开授权');
  if(!found.models.length)throw cliError('CLI_NO_MODELS','本地 CLI 未返回可用模型目录，未启用该通道');
  if(typeof ctx.llm.registerAdapter!=='function')throw cliError('HOST_NOT_READY','DSH 未提供原生模型注册服务');
  await disconnect();
  adapter=createCodexCliAdapter({ctx,executablePath:found.executablePath,models:found.models,spawnImpl,onStatus:event=>{if(event.status==='completed')verified=true;publish({sessionId:event.sessionId});}});
  try{registration=ctx.llm.registerAdapter([CODEX_CLI_PROVIDER],adapter);}catch(e){await adapter.dispose();adapter=null;throw cliError('CLI_REGISTRATION_FAILED','无法在 DSH 注册本地 Codex CLI 通道');}
  activeMetadata=found;verified=false;
  const previous=config;config={schema:1,enabled:true,executablePath:found.executablePath};
  try{await persist();}catch{await disconnect();config={...previous,enabled:false};throw cliError('CLI_CONFIG_WRITE_FAILED','无法保存本插件的 CLI 连接配置，尚未保持该模型通道');}
  publish(context);return {...view(),currentModelUnchanged:true};
 }
 async function invoke(command,args={},context={}){
  if(command==='dsh_codex_cancel'||command==='cancel'){epoch++;for(const c of controllers)c.abort();}
  await ready;live();
  if(typeof command!=='string'||!args||typeof args!=='object'||Array.isArray(args))throw cliError('INVALID_REQUEST','本地 CLI 请求格式无效');
  const kind=command.replace(/^dsh_codex_/,'');
  if(kind==='status'){
   if(args.refresh||args.executablePath!==undefined||!metadata||Date.now()-lastProbe>30000)try{await probe(args,context,false);}catch(e){if(e.code==='ABORTED')throw e;}
   return view();
  }
  if(kind==='respond')throw cliError('OAUTH_REMOVED','已改用本地 Codex CLI 登录态，不接受插件内授权码或 OAuth 回答');
  if(kind==='enable'||kind==='begin'){
   const operation=queue.then(()=>{live();return connect(args,context);});queue=operation.catch(()=>{});return operation;
  }
  if(kind==='cancel'){
   for(const c of controllers)c.abort();
   const operation=queue.then(async()=>{live();await disconnect();config={...config,enabled:false};await persist();publish(context);return {...view(),cliLoginUnchanged:true,currentModelUnchanged:true};});queue=operation.catch(()=>{});return operation;
  }
  throw cliError('UNSUPPORTED_COMMAND','不支持的本地 Codex CLI 操作');
 }
 async function dispose(){if(disposed)return;disposed=true;epoch++;for(const c of controllers)c.abort();await disconnect();await queue.catch(()=>{});await ready.catch(()=>{});}
 return {invoke,dispose};
}
