import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fork} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {createAssetGateway} from '../aiyou/lib/canvas/asset-gateway.mjs';
const ROOT=fileURLToPath(new URL('../',import.meta.url)),server=path.join(ROOT,'aiyou/vendor/codex-workspace-enhancer/asset-browser/server.js');
const PNG=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+cRZkAAAAASUVORK5CYII=','base64');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const legacyId=file=>Buffer.from(path.resolve(file)).toString('base64url');
async function fixture(t,{deduplication={enabled:false}}={}){
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'dsh-canvas-assets-')),legacy=path.join(root,'legacy'),configFile=path.join(root,'asset-browser.config.json');
 await fs.mkdir(legacy);await fs.writeFile(path.join(legacy,'old.png'),PNG);
 const metadata={category:'角色',tags:['既有标签'],smartGroup:'asset'};
 await fs.writeFile(configFile,JSON.stringify({enabled:true,projects:[{id:'legacy',name:'旧素材项目',path:legacy,folders:[legacy],scanRoots:['.']}],assetMetadata:{[path.join(legacy,'old.png')]:metadata},automation:{inbox:{enabled:false},routing:{enabled:false}},deduplication}));
 const token='isolated-fixture-token-'+ 'x'.repeat(40),env={PATH:process.env.PATH,PORT:'0',ASSET_BROWSER_CONFIG:configFile,ASSET_BROWSER_API_TOKEN:token,DSH_HOME:root};
 if(process.env.SystemRoot)env.SystemRoot=process.env.SystemRoot;
 for(const [key,name]of Object.entries({ASSET_BROWSER_LEDGER:'download.json',GENERATION_TICKETS:'tickets.json',GENERATION_THREAD_BINDINGS:'bindings.json',CODEX_PROMPT_ASSOCIATIONS:'prompts.json',ASSET_LIBRARY_INDEX:'asset-index.json',DUPLICATE_CLEANUP_LEDGER:'duplicates.json',DUPLICATE_QUARANTINE:'quarantine',PROMPT_LIBRARY_ROOT:'prompt-library',THREE_D_TASKS:'3d.json',ASSET_ACTION_TRASH:'trash',RHYTHM_CONTROL_REGISTRY:'rhythm.json',CODEX_SESSIONS_ROOT:'sessions',CODEX_GENERATED_IMAGES_ROOT:'generated',CODEX_GLOBAL_STATE:'state.json',CODEX_SESSION_INDEX:'sessions.jsonl',AIYOU_ARENA_STATE_ROOT:'arena'}))env[key]=path.join(root,name);
 let stderr='',child,origin;
 async function stop(){if(child?.exitCode===null)await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve();},1500);child.once('exit',()=>{clearTimeout(timer);resolve();});child.kill('SIGTERM');});}
 async function start(){child=fork(server,[],{env,stdio:['ignore','ignore','pipe','ipc']});child.stderr.on('data',value=>stderr+=String(value));const port=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Fixture startup timeout '+stderr)),10000);child.once('error',reject);child.once('exit',code=>{clearTimeout(timer);reject(new Error('Fixture exited '+code+' '+stderr));});child.on('message',message=>{if(message?.type==='ready'){clearTimeout(timer);resolve(message.port);}});});origin='http://127.0.0.1:'+port;}
 t.after(async()=>{await stop();await fs.rm(root,{recursive:true,force:true});});await start();
 const gateway=createAssetGateway({connect:async()=>({origin,token})});
 async function api(route,options={}){const response=await fetch(origin+route,{...options,headers:{'x-asset-console-token':token,'content-type':'application/json',...options.headers}});const body=await response.json();if(!response.ok)throw Object.assign(new Error(body.error),{status:response.status});return body;}
 return {root,legacy,configFile,get origin(){return origin;},token,gateway,api,metadata,stderr:()=>stderr,restart:async()=>{await stop();await start();}};
}
test('new originals enter the existing DSH schema1 library and survive service registry reload',async t=>{
 const f=await fixture(t),asset=await f.gateway.ingestBytes(PNG,{name:'新角色.png',mimeType:'image/png',projectId:'dsh-canvas-fixture',source:'canvas-generation',requestId:'job:0',alias:'plus-old-asset-id'});
 assert.match(asset.id,/^asset-/);assert.equal(asset.sha256,hash(PNG));assert.equal(asset.kind,'image');assert.deepEqual(await fs.readFile(asset.path),PNG);assert.ok(asset.aliases.includes('plus-old-asset-id'));
 const library=await f.api('/api/library?project=dsh-canvas-fixture');assert.equal(library.assets.length,1);assert.equal(library.assets[0].name,'新角色.png');assert.equal(library.assets[0].canonicalAssetId,asset.id);
 const index=JSON.parse(await fs.readFile(path.join(f.root,'asset-index.json')));assert.equal(index.schemaVersion,1);assert.equal(index.projects['dsh-canvas-fixture'].assets[0].canonicalAssetId,asset.id);
 await f.restart();const second=createAssetGateway({connect:async()=>({origin:f.origin,token:f.token})});assert.equal((await second.get('plus-old-asset-id')).id,asset.id);
 assert.equal((await f.api('/api/library?project=dsh-canvas-fixture')).assets[0].canonicalAssetId,asset.id);
 const registry=JSON.parse(await fs.readFile(path.join(f.root,'canvas-assets.json')));assert.equal(registry.assets[asset.id].id,asset.id);assert.equal(registry.requests['job:0'].assetId,asset.id);
});
test('SHA deduplication and concurrent ingestion produce one canonical original with additive project aliases',async t=>{
 const f=await fixture(t),results=await Promise.all(Array.from({length:8},(_,i)=>f.gateway.ingestBytes(PNG,{name:'same.png',projectId:i%2?'project-a':'project-b',requestId:'same-'+i,alias:'plus-'+i})));
 assert.equal(new Set(results.map(a=>a.id)).size,1);assert.equal(new Set(results.map(a=>a.path)).size,1);
 const asset=await f.gateway.get(results[0].id);assert.deepEqual(new Set(asset.projectIds),new Set(['project-a','project-b']));for(let i=0;i<8;i++)assert.equal((await f.gateway.get('plus-'+i)).id,asset.id);
 for(const project of ['project-a','project-b']){const page=await f.api('/api/library?project='+project);assert.equal(page.assets.length,1);assert.equal(page.assets[0].canonicalAssetId,asset.id);}
});
test('new ingestion deduplicates against a registered legacy original without losing its metadata or path',async t=>{
 const f=await fixture(t),old=await f.gateway.get(legacyId(path.join(f.legacy,'old.png')));
 const reused=await f.gateway.ingestBytes(PNG,{name:'same-result.png',projectId:'canvas',requestId:'same-legacy',alias:'canvas-output'});
 assert.equal(reused.id,old.id);assert.equal(reused.path,old.path);assert.equal((await f.gateway.get('canvas-output')).id,old.id);
 const page=await f.api('/api/library?project=canvas');assert.equal(page.assets.length,1);assert.equal(page.assets[0].canonicalAssetId,old.id);assert.deepEqual(JSON.parse(await fs.readFile(f.configFile)).assetMetadata[old.path],f.metadata);
});
test('opted-in old duplicate cleanup preserves every registered original while still quarantining an unregistered duplicate',async t=>{
 const f=await fixture(t,{deduplication:{enabled:true,automaticSweep:true,settleSeconds:2}}),old=path.join(f.legacy,'old.png'),second=path.join(f.legacy,'second-copy.png'),third=path.join(f.legacy,'unregistered-copy-99.png');
 await fs.writeFile(second,PNG);await fs.writeFile(third,PNG);for(const file of [old,second,third])await fs.utimes(file,new Date(0),new Date(Date.now()-60000));
 const firstAsset=await f.gateway.get(legacyId(old)),secondAsset=await f.gateway.get(legacyId(second));assert.notEqual(firstAsset.id,secondAsset.id);
 const ledgerFile=path.join(f.root,'duplicates.json'),deadline=Date.now()+11000;let ledger;
 while(Date.now()<deadline){try{ledger=JSON.parse(await fs.readFile(ledgerFile));if(ledger.events?.length)break;}catch(error){if(error.code!=='ENOENT')throw error;}await new Promise(resolve=>setTimeout(resolve,50));}
 assert.equal(ledger?.events?.length,1);assert.equal(ledger.events[0].sourcePath,third);
 assert.deepEqual(await fs.readFile(old),PNG);assert.deepEqual(await fs.readFile(second),PNG);assert.equal((await f.gateway.get(firstAsset.id)).sha256,hash(PNG));assert.equal((await f.gateway.get(secondAsset.id)).sha256,hash(PNG));
});
test('idempotency returns the original receipt and rejects a reused request ID with different content',async t=>{
 const f=await fixture(t),options={name:'notes.md',projectId:'notes',requestId:'write-once',alias:'old-note'},bytes=Buffer.from('原始文字');
 const first=await f.gateway.ingestBytes(bytes,options),again=await f.gateway.ingestBytes(bytes,options);assert.equal(first.id,again.id);
 await assert.rejects(f.gateway.ingestBytes(Buffer.from('不同文字'),options),/同一请求ID/);assert.equal((await f.gateway.list({projectId:'notes'})).length,1);
});
test('old path identity, metadata and sidecars survive physical rename; references protect both old and canonical delete APIs',async t=>{
 const f=await fixture(t),old=path.join(f.legacy,'old.png'),oldId=legacyId(old);await fs.writeFile(path.join(f.legacy,'old.prompt.md'),'旧提示词');
 const asset=await f.gateway.get(oldId);assert.equal(asset.path,old);await f.gateway.addReference(asset.id,{projectId:'canvas-1',nodeId:'node-1',slot:'image'});
 assert.equal((await f.api('/api/library?project=canvas-1')).assets[0].canonicalAssetId,asset.id);
 await f.restart();await assert.rejects(f.gateway.remove(asset.id),/仍被.*引用/);
 const renamed=await f.gateway.rename(asset.id,'renamed.png');assert.equal(renamed.id,asset.id);assert.equal((await f.gateway.get(oldId)).path,renamed.path);assert.equal((await f.gateway.get(legacyId(renamed.path))).id,asset.id);assert.equal(await fs.readFile(path.join(f.legacy,'renamed.prompt.md'),'utf8'),'旧提示词');
 const config=JSON.parse(await fs.readFile(f.configFile));assert.deepEqual(config.assetMetadata[renamed.path],f.metadata);assert.equal(config.assetMetadata[old],undefined);
 await assert.rejects(f.gateway.remove(oldId),/仍被.*引用/);
 await assert.rejects(f.api('/api/assets/delete',{method:'DELETE',body:JSON.stringify({assetId:oldId,confirmName:'renamed.png'})}),/仍被.*引用/);assert.deepEqual(await fs.readFile(renamed.path),PNG);
 await f.gateway.removeReference(asset.id,{projectId:'canvas-1',nodeId:'node-1',slot:'image'});await f.gateway.remove(asset.id);assert.equal(await f.gateway.get(asset.id),null);await assert.rejects(fs.stat(renamed.path),{code:'ENOENT'});
});
test('existing batch trash rejects the whole referenced batch, and undo preserves an unreferenced canonical identity',async t=>{
 const f=await fixture(t),second=path.join(f.legacy,'second.png');await fs.writeFile(second,PNG);
 const first=await f.gateway.get(legacyId(path.join(f.legacy,'old.png'))),other=await f.gateway.get(legacyId(second));
 await f.gateway.addReference(first.id,{projectId:'canvas',nodeId:'node',slot:'image'});
 await assert.rejects(f.api('/api/trash-assets',{method:'POST',body:JSON.stringify({items:[{projectId:'legacy',sourcePath:'second.png'},{projectId:'legacy',sourcePath:'old.png'}]})}),/仍被.*引用/);
 assert.deepEqual(await fs.readFile(second),PNG);assert.deepEqual(await fs.readFile(first.path),PNG);
 const trashed=await f.api('/api/trash-assets',{method:'POST',body:JSON.stringify({items:[{projectId:'legacy',sourcePath:'second.png'}]})});
 assert.equal(await f.gateway.get(other.id),null);assert.ok(!(await f.gateway.list({projectId:'legacy'})).some(asset=>asset.id===other.id));
 await f.restart();await f.api('/api/restore-trash',{method:'POST',body:JSON.stringify({token:trashed.result.token})});
 const restored=await f.gateway.get(other.id);assert.equal(restored.id,other.id);assert.equal(restored.sha256,other.sha256);assert.deepEqual(await fs.readFile(restored.path),PNG);
});
test('old DSH physical move and folder rename preserve canonical aliases, original bytes and references',async t=>{
 const f=await fixture(t),old=path.join(f.legacy,'old.png'),asset=await f.gateway.get(legacyId(old));
 await fs.writeFile(path.join(f.legacy,'old.prompt.md'),'保留的旁文件');
 await f.gateway.addReference(asset.id,{projectId:'canvas',nodeId:'move-node',slot:'image'});
 const moved=await f.api('/api/move-asset',{method:'POST',body:JSON.stringify({sourceProjectId:'legacy',sourcePath:'old.png',targetProjectId:'legacy',targetDirectory:'shots',fileName:'moved.png'})});
 const after=await f.gateway.get(asset.id);assert.equal(after.path,moved.result.destinationPath);assert.equal((await f.gateway.get(legacyId(old))).id,asset.id);assert.equal(after.sha256,asset.sha256);
 await f.api('/api/folders',{method:'PATCH',body:JSON.stringify({projectId:'legacy',path:'shots',name:'renamed-shots'})});
 const renamed=await f.gateway.get(asset.id);assert.equal(renamed.path,path.join(f.legacy,'renamed-shots','moved.png'));assert.equal((await f.gateway.get(legacyId(after.path))).id,asset.id);assert.deepEqual(await fs.readFile(renamed.path),PNG);
 assert.equal(await fs.readFile(path.join(f.legacy,'renamed-shots','moved.prompt.md'),'utf8'),'保留的旁文件');
 assert.deepEqual(JSON.parse(await fs.readFile(f.configFile)).assetMetadata[renamed.path],f.metadata);
 await f.restart();await assert.rejects(f.gateway.remove(asset.id),/仍被.*引用/);
 assert.equal((await f.api('/api/library?project=canvas')).assets[0].sourcePath,renamed.path);
});
test('old project assignment stays exclusive except for referenced canvas projects, and clear restores the earlier membership',async t=>{
 const f=await fixture(t),asset=await f.gateway.get(legacyId(path.join(f.legacy,'old.png')));
 await f.gateway.ingestBytes(Buffer.from('目标项目'),{name:'target.txt',projectId:'target'});
 await f.gateway.addReference(asset.id,{projectId:'canvas',nodeId:'assigned-node',slot:'image'});
 await f.api('/api/assets/assign',{method:'POST',body:JSON.stringify({assetId:asset.id,targetProjectId:'target'})});
 assert.equal((await f.api('/api/library?project=legacy')).assets.length,0);
 assert.ok((await f.api('/api/library?project=target')).assets.some(item=>item.canonicalAssetId===asset.id));
 assert.equal((await f.api('/api/library?project=canvas')).assets[0].canonicalAssetId,asset.id);
 await f.restart();await f.api('/api/assets/assign',{method:'DELETE',body:JSON.stringify({assetId:asset.id})});
 assert.equal((await f.api('/api/library?project=legacy')).assets[0].canonicalAssetId,asset.id);
 assert.ok(!(await f.api('/api/library?project=target')).assets.some(item=>item.canonicalAssetId===asset.id));
 assert.equal((await f.api('/api/library?project=canvas')).assets[0].canonicalAssetId,asset.id);
});
test('old cross-project move changes its source membership and does not leak into other logical projects sharing owned storage',async t=>{
 const f=await fixture(t),asset=await f.gateway.get(legacyId(path.join(f.legacy,'old.png')));
 await f.gateway.ingestBytes(Buffer.from('目标'),{name:'target.txt',projectId:'target'});await f.gateway.ingestBytes(Buffer.from('另一项目'),{name:'other.txt',projectId:'other'});
 await f.api('/api/move-asset',{method:'POST',body:JSON.stringify({sourceProjectId:'legacy',sourcePath:'old.png',targetProjectId:'target',targetDirectory:'',fileName:'moved.png'})});
 const after=await f.gateway.get(asset.id);assert.equal(after.sha256,asset.sha256);assert.deepEqual(after.projectIds,['target']);
 assert.equal((await f.api('/api/library?project=legacy')).assets.length,0);
 assert.ok((await f.api('/api/library?project=target')).assets.some(item=>item.canonicalAssetId===asset.id));
 assert.ok(!(await f.api('/api/library?project=other')).assets.some(item=>item.canonicalAssetId===asset.id));
});
test('the actual DSH asset-card handler exports the exact canonical drop contract and old-ID fallback',async()=>{
 const source=await fs.readFile(path.join(ROOT,'aiyou/vendor/codex-workspace-enhancer/asset-browser/public/app.js'),'utf8');
 const start=source.indexOf('function createAssetCard(asset) {'),end=source.indexOf('\nfunction disposeAssetCard',start);assert.ok(start>=0&&end>start);
 let current,handler,card;
 const render=asset=>{card={dataset:{assetId:asset.id},addEventListener:(type,fn)=>{assert.equal(type,'dragstart');handler=fn;}};return card;};
 const context={renderTextCard:render,renderImageCard:render,renderAudioCard:render,renderVideoCard:render,assetById:()=>current};vm.createContext(context);vm.runInContext(source.slice(start,end),context);
 for(const asset of [{id:'legacy-path-id',canonicalAssetId:'asset-stable',kind:'image'},{id:'old-path-only',kind:'audio'}]){
   current=asset;const created=context.createAssetCard(asset);assert.equal(created.draggable,true);let mime,payload;const transfer={setData:(type,value)=>{mime=type;payload=JSON.parse(value);}};handler({dataTransfer:transfer});
   assert.equal(transfer.effectAllowed,'copy');assert.equal(mime,'application/x-aiyou-dsh-asset');assert.deepEqual(payload,{assetId:asset.canonicalAssetId||asset.id});
   assert.doesNotThrow(()=>handler({}));
 }
});
test('DSH UI rename of an owned original changes display name while canonical ID and raw media remain valid',async t=>{
 const f=await fixture(t),asset=await f.gateway.ingestBytes(PNG,{name:'first.png',projectId:'canvas'});
 const result=await f.api('/api/assets/rename',{method:'POST',body:JSON.stringify({assetId:legacyId(asset.path),name:'second.png'})});assert.equal(result.result.canonicalAssetId,asset.id);
 const actual=await f.gateway.get(asset.id);assert.equal(actual.name,'second.png');assert.equal(actual.path,asset.path);
 const media=await fetch(f.origin+'/media?id='+encodeURIComponent(asset.id),{headers:{'x-asset-console-token':f.token}});assert.equal(media.status,200);assert.equal(hash(Buffer.from(await media.arrayBuffer())),asset.sha256);
 const page=await f.api('/api/library?project=canvas');assert.equal(page.assets[0].name,'second.png');
});
test('thumbnail paths, disguised media and changed originals fail without a false registered asset',async t=>{
 const f=await fixture(t),thumb=path.join(f.root,'thumbnails');await fs.mkdir(thumb);const file=path.join(thumb,'preview.png');await fs.writeFile(file,PNG);
 await assert.rejects(f.gateway.ingestFile(file,{projectId:'canvas'}),/缩略图/);await assert.rejects(f.gateway.ingestBytes(PNG,{name:'preview.thumbnail.png'}),/缩略图/);
 await assert.rejects(f.gateway.ingestBytes(Buffer.from('<html>not a PNG</html>'),{name:'fake.png'}),/内容与格式/);
 const asset=await f.gateway.ingestBytes(PNG,{name:'real.png',projectId:'canvas'});await fs.writeFile(asset.path,Buffer.from('changed'));await assert.rejects(f.gateway.get(asset.id),/原件内容已变化/);
});
test('service route remains token and Host-client protected, and legacy parent symlinks cannot escape its managed root',async t=>{
 const f=await fixture(t);let response=await fetch(f.origin+'/api/canvas-assets',{method:'POST',headers:{'content-type':'application/json','x-aiyou-canvas-gateway':'1'},body:JSON.stringify({action:'list'})});assert.equal(response.status,403);
 response=await fetch(f.origin+'/api/canvas-assets',{method:'POST',headers:{'content-type':'application/json','x-asset-console-token':f.token},body:JSON.stringify({action:'list'})});assert.equal(response.status,403);
 const outside=path.join(f.root,'outside');await fs.mkdir(outside);await fs.writeFile(path.join(outside,'outside.png'),PNG);await fs.symlink(outside,path.join(f.legacy,'escape'),'dir');
 await assert.rejects(f.gateway.get(legacyId(path.join(f.legacy,'escape','outside.png'))),/越过受管目录/);
});
