import {spawn} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import {mkdir,writeFile,access} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Readable} from 'node:stream';
import {fail,json,route,stateRoot} from './runtime.mjs';
const SOURCE=dirname(fileURLToPath(import.meta.url));
const REGISTRY=new Map();
async function seed(file,value){try{await access(file);}catch{await writeFile(file,JSON.stringify(value,null,2)+'\n',{mode:0o600,flag:'wx'}).catch(error=>{if(error.code!=='EEXIST')throw error;});}}
async function launch(kind){
  const root=join(stateRoot(),kind);const isolated=join(root,'host-context');
  await mkdir(root,{recursive:true});await mkdir(isolated,{recursive:true});await mkdir(join(root,'assets'),{recursive:true});
  await seed(join(root,'asset-browser.config.json'),{enabled:true,projects:[{id:'dsh-assets',name:'本地资产库',folders:[join(root,'assets')]}],automation:{inbox:{enabled:false,capturePolicy:'ticketed-only'},routing:{enabled:false,profiles:[]}},deduplication:{enabled:false}});
  const token=randomBytes(32).toString('hex');
  const env={...process.env,ELECTRON_RUN_AS_NODE:'1',PORT:'0',AIYOU_INTERNAL_SERVICE_TOKEN:token,CODEX_HOME:isolated,CODEX_SIDEBAR_INSTALL_DIR:SOURCE,CODEX_SIDEBAR_STATE_DIR:root,DSH_AGENTS_HOME:join(root,'agents'),CODEX_EXECUTABLE:join(isolated,'host-execution-not-connected'),CODEX_TASKBOARD_DATA_DIR:root,CODEX_TASKBOARD_HOST:'127.0.0.1',CODEX_TASKBOARD_PORT:'0',ASSET_BROWSER_CONFIG:join(root,'asset-browser.config.json'),ASSET_BROWSER_API_TOKEN:token,ASSET_BROWSER_LEDGER:join(root,'download-ledger.json'),GENERATION_TICKETS:join(root,'generation-tickets.json'),GENERATION_THREAD_BINDINGS:join(root,'thread-bindings.json'),CODEX_PROMPT_ASSOCIATIONS:join(root,'prompt-associations.json'),ASSET_LIBRARY_INDEX:join(root,'asset-index.json'),DUPLICATE_CLEANUP_LEDGER:join(root,'duplicate-ledger.json'),DUPLICATE_QUARANTINE:join(root,'quarantine'),PROMPT_LIBRARY_ROOT:join(root,'prompts'),THREE_D_TASKS:join(root,'three-d-tasks.json'),ASSET_ACTION_TRASH:join(root,'trash'),RHYTHM_CONTROL_REGISTRY:join(root,'rhythm-control.json'),CODEX_SESSIONS_ROOT:join(isolated,'sessions'),CODEX_GENERATED_IMAGES_ROOT:join(isolated,'generated_images'),CODEX_GLOBAL_STATE:join(isolated,'state.json'),CODEX_SESSION_INDEX:join(isolated,'sessions.jsonl'),IMG2THREEJS_SKILL_ROOT:join(isolated,'skills','img2threejs'),SCORE_MIX_SKILL_ROOT:join(isolated,'skills','score-and-mix-picture'),AIYOU_ARENA_STATE_ROOT:join(root,'arena')};
  const child=spawn(process.execPath,[join(SOURCE,'service-worker.mjs'),kind],{cwd:SOURCE,env,stdio:['ignore','ignore','pipe','ipc'],windowsHide:true});
  let errors='';child.stderr.on('data',data=>{errors=(errors+String(data)).slice(-4000);});
  return await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>{child.kill('SIGTERM');reject(new Error(kind+'服务启动超时'));},15000);
    child.once('error',error=>{clearTimeout(timer);reject(error);});
    child.once('exit',(code)=>{clearTimeout(timer);if(code!==0)reject(new Error(kind+'服务启动失败：'+errors.slice(-1500)));});
    child.on('message',message=>{if(message?.type==='ready'&&Number.isInteger(message.port)){clearTimeout(timer);resolve({origin:'http://127.0.0.1:'+message.port,token,child});}});
  });
}
export function service(kind){
  if(REGISTRY.has(kind))return REGISTRY.get(kind);
  const pending=launch(kind).then(current=>{current.child.once('exit',()=>{if(REGISTRY.get(kind)===pending)REGISTRY.delete(kind);});return current;}).catch(error=>{if(REGISTRY.get(kind)===pending)REGISTRY.delete(kind);throw error;});
  REGISTRY.set(kind,pending);return pending;
}
export function ownServices(ctx,kind){ctx.effect(()=>()=>{const pending=REGISTRY.get(kind);if(!pending)return;REGISTRY.delete(kind);void pending.then(s=>s.child.kill('SIGTERM')).catch(()=>{});},'aiyou:owned-service:'+kind);}
export async function proxy(kind,req,res,path){
  // These operations need a native execution/permission adapter and must never bypass it.
  if(/^\/api\/(?:arena\/|generation|generate|three-d|rhythm|local\/ai\/)/u.test(path))fail('此操作需要宿主权限与模型适配器，当前未连接',503);
  const current=await service(kind);const headers={};
  for(const key of ['content-type','range','accept','if-none-match'])if(req.headers[key])headers[key]=req.headers[key];
  if(kind==='asset-console')headers['x-asset-console-token']=current.token;else headers['x-aiyou-internal-token']=current.token;
  const method=req.method||'GET';const response=await fetch(current.origin+path,{method,headers,...(['GET','HEAD'].includes(method)?{}:{body:req,duplex:'half'}),redirect:'manual',signal:AbortSignal.timeout(120000)});
  const outgoing={};for(const key of ['content-type','content-length','content-range','accept-ranges','cache-control','etag'])if(response.headers.has(key))outgoing[key]=response.headers.get(key);
  // The browser always stays on the authenticated native application's origin.
  if(outgoing['content-type']?.includes('application/json')){
    let raw=await response.text();
    raw=raw.replace(/"\/(media|download)\?/gu,'"/aiyoucodex-dsh/'+kind+'/ui/$1?');
    delete outgoing['content-length'];res.writeHead(response.status,outgoing);res.end(raw);return;
  }
  res.writeHead(response.status,outgoing);
  if(!response.body||method==='HEAD'){res.end();return;}
  Readable.fromWeb(response.body).on('error',error=>res.destroy(error)).pipe(res);
}
export function mountService(ctx,kind){
  const prefix='/aiyoucodex-dsh/'+kind+'/ui/';
  // Harness matches prefix + '/'; the registration itself must omit the slash.
  route(ctx,prefix.slice(0,-1),async(req,res,url)=>proxy(kind,req,res,'/'+url.pathname.slice(prefix.length)+url.search),'prefix');
}
export async function stopServices(){const running=[...REGISTRY.values()];REGISTRY.clear();await Promise.all(running.map(async pending=>{try{const current=await pending;if(current.child.exitCode!==null)return;await new Promise(resolve=>{current.child.once('exit',resolve);current.child.kill('SIGTERM');setTimeout(()=>{if(current.child.exitCode===null)current.child.kill('SIGKILL');resolve();},3000).unref();});}catch{}}));}
