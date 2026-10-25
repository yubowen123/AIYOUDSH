import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,readdir,rm,chmod} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import http from 'node:http';

async function fixture(t){
 const root=await mkdtemp(join(tmpdir(),'dsh-context-cas-')),projection=join(root,'storages/session_projcache/sessions'),savedDir=join(root,'aiyou-enhancer/session-context');await mkdir(projection,{recursive:true});await mkdir(savedDir,{recursive:true});
 for(const id of ['session-A','session-B'])await writeFile(join(projection,id+'.json'),JSON.stringify({version:1,record:{rows:{title:{val:id},turnOutline:{val:{turns:[{turn:1,prompt:'请继续本地任务'}]}}}}}));
 async function attach(){const before=process.env.DSH_HOME;process.env.DSH_HOME=root;let plugin;try{plugin=await import('../aiyou/modules/session-context/index.js?cas-fixture='+Math.random());}finally{if(before===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=before;}const routes=new Map(),ctx={connection:{requestRejection:()=>undefined},effect(fn,name){if(!name.endsWith(':lifecycle'))return fn();},inject(_names,fn){return fn(ctx);},webServer:{register(value){routes.set(value.path,value.handler);return()=>{};}}};plugin.apply(ctx);return routes;}
 let routes=await attach();const server=http.createServer((req,res)=>routes.get(new URL(req.url,'http://local').pathname)?.(req,res));await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 t.after(async()=>{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));await rm(root,{recursive:true,force:true});});
 const origin='http://127.0.0.1:'+server.address().port;
 async function request(payload){const response=await fetch(origin+'/aiyoucodex-dsh/session-context/save',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});return{status:response.status,body:await response.json()};}
 return{root,savedDir,request,file:id=>join(savedDir,id+'.json'),restart:async()=>{routes=await attach();},read:async id=>{const response=await fetch(origin+'/aiyoucodex-dsh/session-context?session='+id);return{status:response.status,body:await response.json()};}};
}
const payload=(goal,expectedVersion=0,session='session-A')=>({session,context:{goal,progress:'进度',nextStep:'下一步',agreements:['保留'],references:['./local.md']},expectedVersion});

test('two real HTTP writers with one saved version commit once and the loser cannot overwrite the real file',async t=>{
 const f=await fixture(t),results=await Promise.all([f.request(payload('window-one')),f.request(payload('window-two'))]);assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);
 const success=results.find(r=>r.status===200),conflict=results.find(r=>r.status===409);assert.equal(success.body.version,1);assert.equal(conflict.body.code,'CONTEXT_VERSION_CONFLICT');assert.equal(conflict.body.currentVersion,1);assert.equal(JSON.parse(await readFile(f.file('session-A'))).context.goal,success.body.context.goal);
 const stale=await f.request(payload('cannot-overwrite'));assert.equal(stale.status,409);assert.equal(JSON.parse(await readFile(f.file('session-A'))).context.goal,success.body.context.goal);
 assert.equal((await f.request(payload('explicitly-rebased',1))).body.version,2);await f.restart();const read=await f.read('session-A');assert.equal(read.body.savedVersion,2);assert.equal(read.body.saved.goal,'explicitly-rebased');assert.ok((await readdir(f.savedDir)).every(name=>!name.endsWith('.tmp')));
});
test('the old version field remains a guarded precondition while versionless or ambiguous writers are rejected',async t=>{
 const f=await fixture(t),old=payload('legacy');delete old.expectedVersion;old.version=0;assert.equal((await f.request(old)).status,200);assert.equal((await f.request(old)).status,409);
 const noVersion={...old};delete noVersion.version;const missing=await f.request(noVersion);assert.equal(missing.status,428);assert.equal(missing.body.code,'CONTEXT_VERSION_REQUIRED');
 assert.equal((await f.request({...payload('ambiguous',1),version:0})).status,400);assert.equal((await f.request(payload('invalid',-1))).status,400);assert.equal((await f.request(payload('string','1'))).status,400);assert.equal(JSON.parse(await readFile(f.file('session-A'))).version,1);
});
test('sessions have independent version chains and concurrent contenders never produce partial JSON',async t=>{
 const f=await fixture(t),results=await Promise.all(Array.from({length:12},(_,i)=>f.request(payload('candidate-'+i,0,i%2?'session-A':'session-B'))));assert.equal(results.filter(r=>r.status===200).length,2);assert.equal(results.filter(r=>r.status===409).length,10);
 for(const id of ['session-A','session-B']){const saved=JSON.parse(await readFile(f.file(id)));assert.equal(saved.version,1);assert.deepEqual(saved.context.references,['./local.md']);assert.equal((await f.read(id)).body.savedVersion,1);}
});
test('failed filesystem persistence does not advance the version or poison the per-session queue',{skip:process.platform==='win32'||process.getuid?.()===0},async t=>{
 const f=await fixture(t);await f.request(payload('committed'));const before=await readFile(f.file('session-A'),'utf8');await chmod(f.savedDir,0o500);try{const failed=await f.request(payload('not-committed',1));assert.equal(failed.status,500);assert.equal(await readFile(f.file('session-A'),'utf8'),before);}finally{await chmod(f.savedDir,0o700);}
 const recovered=await f.request(payload('recovered',1));assert.equal(recovered.status,200);assert.equal(recovered.body.version,2);assert.equal(JSON.parse(await readFile(f.file('session-A'))).context.goal,'recovered');
});
test('damaged saved JSON and invalid saved versions fail closed without replacing the original bytes',async t=>{
 const f=await fixture(t),bad='{damaged-json';await writeFile(f.file('session-A'),bad);assert.equal((await f.request(payload('must-not-replace'))).status,500);assert.equal(await readFile(f.file('session-A'),'utf8'),bad);
 const invalid=JSON.stringify({version:-1,context:{goal:'retain'}});await writeFile(f.file('session-A'),invalid);assert.equal((await f.request(payload('must-not-replace'))).body.code,'CONTEXT_SAVED_VERSION_INVALID');assert.equal(await readFile(f.file('session-A'),'utf8'),invalid);
});
