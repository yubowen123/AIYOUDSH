import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import vm from 'node:vm';
import http from 'node:http';
import {fork} from 'node:child_process';
import {createAssetGateway} from '../aiyou/lib/canvas/asset-gateway.mjs';
import {createProjectStore} from '../aiyou/lib/canvas/project-store.mjs';
import {createCommandService} from '../aiyou/lib/canvas/command-service.mjs';
import {createCanvasAssetStore} from '../aiyou/vendor/codex-workspace-enhancer/asset-browser/canvas-asset-store.js';

const embedded=await fs.readFile(new URL('../aiyou/vendor/aiyouplus-canvas/public/embedded.js',import.meta.url),'utf8');
const postSource=embedded.slice(embedded.indexOf('async function post('),embedded.indexOf('\nasync function heartbeat('));
const pollSource=embedded.slice(embedded.indexOf('async function poll(){'),embedded.indexOf('\ntry{const boot='));
const importSource=embedded.slice(embedded.indexOf('async function importAsset('),embedded.indexOf('\nasync function production('));
const PNG=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+cRZkAAAAASUVORK5CYII=','base64');
const legacyId=file=>Buffer.from(file).toString('base64url');
const wait=()=>new Promise(resolve=>setImmediate(resolve));
async function temp(t){const root=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'dsh-reliability-')));t.after(()=>fs.rm(root,{recursive:true,force:true}));return root;}

async function pollFixture(t,{late=false,lostAck=false}={}){
 const root=await temp(t),projects=createProjectStore({rootDir:root}),p=await projects.bind({sessionId:'s',cwd:root}),panel={sessionId:'s',projectId:p.id,panelId:'audit_panel_writer',revision:0,snapshot:{nodes:[],edges:[]}};
 const coordinator=createCommandService({projects,timeoutMs:100,journalDir:path.join(root,'receipts')});await coordinator.panel(panel);
 let context,release,started,ackLost=false,cycles=0;const began=new Promise(resolve=>started=resolve),gate=new Promise(resolve=>release=resolve),executed=[],replies=[],notices=[],cache=new Map();
 const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://local');let value;
  if(url.pathname==='/events')value=await coordinator.poll(Object.fromEntries(url.searchParams));
  else{const chunks=[];for await(const chunk of req)chunks.push(chunk);const body=JSON.parse(Buffer.concat(chunks));replies.push(body);
   if(lostAck&&!ackLost){ackLost=true;res.writeHead(503,{'content-type':'application/json'});res.end(JSON.stringify({ok:false,error:'temporary local transport failure'}));return;}
   value=await coordinator.reply(body);if(body.requestId==='following'||!late)vm.runInContext('disposed=true',context);
  }
  res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({ok:true,value}));
 }catch(error){res.writeHead(error.status||409,{'content-type':'application/json'});res.end(JSON.stringify({ok:false,error:error.message,code:error.code}));}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port;
 t.after(async()=>{coordinator.dispose();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));await projects.dispose();});
 context={fetch,URL,location:{origin:base},route:base,identity:{sessionId:'s',projectId:p.id,panelId:panel.panelId},Date,Error,
  window:{dispatchEvent:event=>notices.push(event.detail)},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}},emit(){},heartbeat:async()=>{},
  execute:async command=>{if(!cache.has(command.requestId)){executed.push(command.requestId);cache.set(command.requestId,(async()=>{if(command.requestId==='expired'&&late){started();await gate;}return{revision:1,snapshot:{nodes:[{id:command.requestId}],edges:[]},saveReceipt:{saved:true}};})());}return cache.get(command.requestId);},
  wait:async()=>{if(++cycles>5)throw Error('poll did not recover');await wait();}};
 vm.createContext(context);vm.runInContext('let disposed=false,cursor=0,lastHeartbeat=Date.now();\n'+postSource+'\n'+pollSource,context);
 return{coordinator,panel,context,executed,replies,notices,began,release,run:()=>vm.runInContext('poll()',context)};
}

test('late expired reply advances only that event and the next command executes without regenerating the expired one',async t=>{
 const f=await pollFixture(t,{late:true}),old=f.coordinator.execute(f.panel,{requestId:'expired',action:'write_text',expectedRevision:0,payload:{content:'first'}}).catch(error=>error.code),poll=f.run();
 await f.began;assert.equal(await old,'RECEIPT_TIMEOUT');const next=f.coordinator.execute(f.panel,{requestId:'following',action:'write_text',expectedRevision:0,payload:{content:'second'}});await wait();f.release();
 assert.equal((await next).status,'completed');await poll;assert.deepEqual(f.executed,['expired','following']);assert.ok(vm.runInContext('cursor',f.context)>=2);assert.ok(f.notices.some(row=>row.code==='UNKNOWN_REQUEST'));
 assert.deepEqual(f.replies.map(row=>row.ok),[true,true]);
});
test('temporary reply transport failure retries the same success receipt and never reports an execution failure',async t=>{
 const f=await pollFixture(t,{lostAck:true}),command=f.coordinator.execute(f.panel,{requestId:'one',action:'write_text',expectedRevision:0,payload:{content:'one'}}),poll=f.run();
 assert.equal((await command).status,'completed');await poll;assert.deepEqual(f.executed,['one']);assert.equal(f.replies.length,2);assert.deepEqual(f.replies.map(row=>row.ok),[true,true]);assert.deepEqual(f.replies[0],f.replies[1]);
});

function importFixture({matchAfter=2,matching=true}={}){
 const asset={id:'asset-canonical',path:'/isolated/original.png',name:'original.png',kind:'image',mimeType:'image/png'},lookups=[];let round=0,first=true;
 const context={disposed:false,Error,File,crypto:globalThis.crypto,TextDecoder,Uint8Array,Blob,
  rpc:async(_command,args)=>{lookups.push(args.assetId);if(args.assetId==='asset-canonical'||args.assetId==='old-cache-alias')return asset;return{id:'different-original'};},
  fetch:async()=>new Response(PNG,{headers:{'content-type':'image/png'}}),window:{__TAURI_INTERNALS__:{convertFileSrc:value=>value}},
  snapshot:()=>{if(first){first=false;return{nodes:[]};}return{nodes:[{id:'unrelated-manual-text',type:'text-node'},{id:'other-media',referenceAssetId:'another-cache-alias'},...(matching&&round>=matchAfter?[{id:'correct-import',referenceAssetId:'old-cache-alias'}]:[])]};},
  bindings:()=>({invalidate(){}}),wait:async()=>{round++;},
  DataTransfer:class{constructor(){this.items={add(){}};}},DragEvent:class{constructor(type,options){this.type=type;Object.assign(this,options);}},document:{querySelector:()=>({getBoundingClientRect:()=>({x:0,y:0,width:200,height:200}),dispatchEvent(){}})}};
 vm.createContext(context);vm.runInContext(importSource,context);return{context,lookups,run:()=>context.importAsset(asset.id)};
}
test('media insertion ignores unrelated manual and media nodes and accepts only the matching canonical original alias',async()=>{
 const f=importFixture(),result=await f.run();assert.equal(result.nodeId,'correct-import');assert.deepEqual(Array.from(result.nodeIds),['correct-import']);assert.equal(result.importedAssetId,'asset-canonical');assert.ok(f.lookups.includes('old-cache-alias'));
});
test('an unrelated new node never proves a failed media drop succeeded',async()=>{const f=importFixture({matching:false});await assert.rejects(f.run(),/未完成素材输入回调/);});

test('failed project catalog persistence exposes no uncommitted name, binding, project or document revision', {skip:process.platform==='win32'||process.getuid?.()===0},async t=>{
 const root=await temp(t),store=createProjectStore({rootDir:root}),project=await store.create({title:'committed'});await fs.chmod(root,0o500);
 try{
  await assert.rejects(store.rename(project.id,'failed rename'),{code:'EACCES'});assert.equal((await store.get(project.id)).title,'committed');
  await assert.rejects(store.select({sessionId:'s',projectId:project.id}),{code:'EACCES'});assert.equal(await store.selected('s'),null);
  await assert.rejects(store.create({title:'failed create'}),{code:'EACCES'});assert.equal((await store.list()).length,1);
  await assert.rejects(store.recordDocument(project.id,{documentRef:'project:doc',revision:9}),{code:'EACCES'});assert.equal((await store.get(project.id)).revision,undefined);
 }finally{await fs.chmod(root,0o700);}
 await store.rename(project.id,'recovered');const external=await store.get(project.id);external.title='caller mutation';assert.equal((await store.get(project.id)).title,'recovered');await store.dispose();const restarted=createProjectStore({rootDir:root});assert.equal((await restarted.get(project.id)).title,'recovered');assert.equal((await restarted.list()).length,1);await restarted.dispose();
});

async function assetFixture(t){
 const root=await temp(t),stateRoot=path.join(root,'state'),legacy=path.join(root,'legacy'),original=path.join(legacy,'original.png');await fs.mkdir(stateRoot);await fs.mkdir(legacy);await fs.writeFile(original,PNG);
 let config={projects:[{id:'p',path:legacy,folders:[legacy]}]},moves=0,failAfterMove=false;
 const options={root:stateRoot,loadConfig:async()=>structuredClone(config),updateConfig:async fn=>{const next=structuredClone(config);await fn(next);config=next;},listLegacy:async()=>[],resolveLegacy:async id=>({filePath:Buffer.from(id,'base64url').toString()}),
  renameLegacy:async({assetId,name})=>{const from=Buffer.from(assetId,'base64url').toString(),to=path.join(path.dirname(from),name);await fs.rename(from,to);moves++;if(failAfterMove)throw Object.assign(Error('injected metadata failure'),{code:'EIO'});return{filePath:to};},deleteLegacy:async()=>{throw Error('not used');}};
 const store=createCanvasAssetStore(options),asset=await store.get(legacyId(original));await store.addReference(asset.id,{projectId:'canvas',nodeId:'node',slot:'canvas:doc'});
 return{root:stateRoot,original,store,asset,options,get moves(){return moves;},failAfterMove(){failAfterMove=true;}};
}
test('an unwritable registry rejects a legacy rename before any original file is moved', {skip:process.platform==='win32'||process.getuid?.()===0},async t=>{
 const f=await assetFixture(t);await fs.chmod(f.root,0o500);try{await assert.rejects(f.store.rename(f.asset.id,'renamed.png'),{code:'EACCES'});assert.equal(f.moves,0);}finally{await fs.chmod(f.root,0o700);}
 assert.equal((await f.store.get(f.asset.id)).path,f.original);assert.deepEqual(await fs.readFile(f.original),PNG);await assert.rejects(f.store.remove(f.asset.id),error=>error.code==='ASSET_REFERENCED');
});
test('a failure after a physical move preserves canonical identity and references through restart',async t=>{
 const f=await assetFixture(t);f.failAfterMove();await assert.rejects(f.store.rename(f.asset.id,'renamed.png'),{code:'EIO'});
 const renamed=path.join(path.dirname(f.original),'renamed.png'),actual=await f.store.get(f.asset.id);assert.equal(actual.path,renamed);assert.equal((await f.store.get(legacyId(renamed))).id,f.asset.id);
 const restarted=createCanvasAssetStore(f.options);assert.equal((await restarted.get(legacyId(renamed))).id,f.asset.id);await assert.rejects(restarted.remove(f.asset.id),error=>error.code==='ASSET_REFERENCED');
});
test('a canonical commit failure rolls physical rename back while preserving the original identity',async t=>{
 const f=await assetFixture(t),nativeRename=fs.rename;let commits=0;
 fs.rename=async(from,to)=>{if(to===path.join(f.root,'canvas-assets.json')&&++commits===2)throw Object.assign(Error('injected registry commit failure'),{code:'EIO'});return nativeRename(from,to);};
 try{await assert.rejects(f.store.rename(f.asset.id,'renamed.png'),{code:'EIO'});}finally{fs.rename=nativeRename;}
 assert.equal(f.moves,2);assert.equal((await f.store.get(f.asset.id)).path,f.original);assert.deepEqual(await fs.readFile(f.original),PNG);assert.equal((await createCanvasAssetStore(f.options).get(f.asset.id)).path,f.original);await assert.rejects(f.store.remove(f.asset.id),error=>error.code==='ASSET_REFERENCED');
});
test('durable rename intent repairs an interrupted move on restart and refuses a mismatched replacement',async t=>{
 const f=await assetFixture(t),file=path.join(f.root,'canvas-assets.json'),registry=JSON.parse(await fs.readFile(file)),to=path.join(path.dirname(f.original),'renamed.png');registry.pendingRenames={[f.asset.id]:{from:f.original,to,sha256:f.asset.sha256}};await fs.writeFile(file,JSON.stringify(registry));await fs.rename(f.original,to);
 const restarted=createCanvasAssetStore(f.options);assert.equal((await restarted.get(legacyId(to))).id,f.asset.id);assert.equal(JSON.parse(await fs.readFile(file)).pendingRenames,undefined);await assert.rejects(restarted.remove(f.asset.id),error=>error.code==='ASSET_REFERENCED');
 const second=await assetFixture(t),secondFile=path.join(second.root,'canvas-assets.json'),secondRegistry=JSON.parse(await fs.readFile(secondFile)),other=path.join(path.dirname(second.original),'renamed.png');secondRegistry.pendingRenames={[second.asset.id]:{from:second.original,to:other,sha256:second.asset.sha256}};await fs.writeFile(secondFile,JSON.stringify(secondRegistry));await fs.rm(second.original);await fs.writeFile(other,Buffer.from('different content'));
 const blocked=createCanvasAssetStore(second.options);await assert.rejects(blocked.get(second.asset.id),error=>error.code==='ASSET_RENAME_RECOVERY_REQUIRED');assert.ok(JSON.parse(await fs.readFile(secondFile)).references[second.asset.id]);
});


test('the real asset service rolls back originals, sidecars and metadata when metadata commit fails after the move',async t=>{
 const root=await temp(t),legacy=path.join(root,'legacy'),configFile=path.join(root,'config.json'),marker=path.join(root,'fail-once'),hook=path.join(root,'inject.mjs'),original=path.join(legacy,'original.png'),sidecar=path.join(legacy,'original.prompt.md');await fs.mkdir(legacy);await fs.writeFile(original,PNG);await fs.writeFile(sidecar,'retained prompt');
 const metadata={category:'role',tags:['retained'],smartGroup:'asset'};await fs.writeFile(configFile,JSON.stringify({enabled:true,projects:[{id:'legacy',name:'fixture',path:legacy,folders:[legacy],scanRoots:['.']}],assetMetadata:{[original]:metadata},automation:{inbox:{enabled:false},routing:{enabled:false}},deduplication:{enabled:false}}));
 await fs.writeFile(hook,`import fs from 'node:fs/promises';import {syncBuiltinESMExports} from 'node:module';const native=fs.rename;fs.rename=async(from,to)=>{if(to===${JSON.stringify(configFile)}){try{await fs.unlink(${JSON.stringify(marker)});}catch(error){if(error.code==='ENOENT')return native(from,to);throw error;}throw Object.assign(Error('isolated metadata write failure'),{code:'EIO'});}return native(from,to);};syncBuiltinESMExports();`);
 const token='isolated-local-test-token-'+ 'x'.repeat(40),env={PATH:process.env.PATH,PORT:'0',ASSET_BROWSER_CONFIG:configFile,ASSET_BROWSER_API_TOKEN:token,DSH_HOME:root};if(process.env.SystemRoot)env.SystemRoot=process.env.SystemRoot;
 for(const [key,name]of Object.entries({ASSET_BROWSER_LEDGER:'download.json',GENERATION_TICKETS:'tickets.json',GENERATION_THREAD_BINDINGS:'bindings.json',CODEX_PROMPT_ASSOCIATIONS:'prompts.json',ASSET_LIBRARY_INDEX:'asset-index.json',DUPLICATE_CLEANUP_LEDGER:'duplicates.json',DUPLICATE_QUARANTINE:'quarantine',PROMPT_LIBRARY_ROOT:'prompt-library',THREE_D_TASKS:'3d.json',ASSET_ACTION_TRASH:'trash',RHYTHM_CONTROL_REGISTRY:'rhythm.json',CODEX_SESSIONS_ROOT:'sessions',CODEX_GENERATED_IMAGES_ROOT:'generated',CODEX_GLOBAL_STATE:'state.json',CODEX_SESSION_INDEX:'sessions.jsonl',AIYOU_ARENA_STATE_ROOT:'arena'}))env[key]=path.join(root,name);
 let child,origin,stderr='';async function stop(){if(child?.exitCode===null)await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve();},1500);child.once('exit',()=>{clearTimeout(timer);resolve();});child.kill('SIGTERM');});}
 async function start(){child=fork(new URL('../aiyou/vendor/codex-workspace-enhancer/asset-browser/server.js',import.meta.url),[],{env,execArgv:['--import',hook],stdio:['ignore','ignore','pipe','ipc']});child.stderr.on('data',value=>stderr+=String(value));const port=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('fixture startup '+stderr)),10000);child.once('error',reject);child.once('exit',code=>{clearTimeout(timer);reject(Error('fixture exited '+code+' '+stderr));});child.on('message',value=>{if(value?.type==='ready'){clearTimeout(timer);resolve(value.port);}});});origin='http://127.0.0.1:'+port;}
 t.after(stop);await start();const gateway=createAssetGateway({connect:async()=>({origin,token})}),asset=await gateway.get(legacyId(original));await gateway.addReference(asset.id,{projectId:'canvas',nodeId:'n',slot:'canvas:doc'});
 await fetch(origin+'/api/library?project=legacy',{headers:{'x-asset-console-token':token}}).then(response=>response.json());await fs.writeFile(marker,'inject once');await assert.rejects(gateway.rename(asset.id,'renamed.png'),/isolated metadata write failure/);
 assert.deepEqual(await fs.readFile(original),PNG);assert.equal(await fs.readFile(sidecar,'utf8'),'retained prompt');await assert.rejects(fs.stat(path.join(legacy,'renamed.png')),{code:'ENOENT'});assert.deepEqual(JSON.parse(await fs.readFile(configFile)).assetMetadata[original],metadata);
 assert.equal((await gateway.get(asset.id)).path,original);assert.equal((await gateway.get(legacyId(original))).id,asset.id);await stop();await start();assert.equal((await gateway.get(asset.id)).path,original);await assert.rejects(gateway.remove(asset.id),/仍被.*引用/);assert.equal(JSON.parse(await fs.readFile(path.join(root,'canvas-assets.json'))).pendingRenames,undefined);
});
