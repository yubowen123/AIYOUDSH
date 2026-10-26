import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import {createHash} from 'node:crypto';
import {createModelService} from '../aiyou/lib/canvas/model-service.mjs';

const PNG=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lF8AAAAASUVORK5CYII=','base64');
const ID='service-12345678-1234-4234-8234-123456789abc',context={sessionId:'session-a',projectId:'project-a'};
async function fixture(t,handler){
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'dsh-canvas-model-')),requests=[],records=new Map(),ingests=[];
 const server=http.createServer(async(req,res)=>{const chunks=[];for await(const c of req)chunks.push(c);requests.push({method:req.method,path:req.url,body:Buffer.concat(chunks).toString(),auth:req.headers.authorization});await handler(req,res,requests);});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const baseUrl='http://127.0.0.1:'+server.address().port;
 const credentials={describeRecord:async key=>({configured:records.has(key)}),readRecord:async key=>records.get(key),modifyRecord:async(key,fn)=>records.set(key,await fn(records.get(key))),deleteRecord:async key=>records.delete(key)};
 const llm=Object.assign(async request=>({text:request.prompt.includes('untrusted API')?'{}':'host reply',requestId:'host-result'}),{capabilities:async()=>({available:true,inputModalities:['text','image'],authorizationVerified:false})});
 const assets={get:async()=>null,ingestFile:async(file,opts)=>{const b=await fs.readFile(file),sha256=createHash('sha256').update(b).digest('hex'),asset={id:'asset-'+sha256,path:file,sha256,mimeType:'image/png'};ingests.push({asset,opts});return asset;}};
 const options={stateDir:root,credentials,llm,assets,mediaTools:{probe:async()=>({kind:'image',hasVideo:true,width:1,height:1})}};
 const service=createModelService(options);t.after(async()=>{await service.dispose();await new Promise(resolve=>server.close(resolve));await fs.rm(root,{recursive:true,force:true});});
 const profile={provider:ID,name:'Loopback fixture',baseUrl,protocol:'http-json',authType:'bearer',authHeader:'Authorization',scope:'production',models:{image:'fixture-image'},modelCatalog:[{id:'fixture-image',kind:'image',request:{method:'POST',path:'/generate',template:{model:'{{model}}',prompt:'{{prompt}}'}},response:{base64Path:'data.0.b64_json'}}]};
 const setup=extra=>service.invoke('aiyouplus_model_configure',{...profile,apiKey:'fixture-only-key',...extra},context);
 return{root,requests,records,ingests,service,options,profile,setup,baseUrl};
}
function json(res,value,status=200){res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify(value));}
test('single synchronous POST, concurrent joins, idempotent replay, original ingestion; secret absent from config/jobs',async t=>{
 const f=await fixture(t,(_req,res)=>json(res,{data:[{b64_json:PNG.toString('base64')}]}));await f.setup();
 const args={kind:'image',provider:ID,model:'fixture-image',prompt:'blue cube',requestId:'sync-image'};
 const [a,b]=await Promise.all([f.service.invoke('aiyouplus_model_generate',args,context),f.service.invoke('aiyouplus_model_generate',args,context)]);
 assert.deepEqual(a,b);assert.equal(f.requests.filter(r=>r.method==='POST').length,1);assert.equal(f.ingests.length,1);assert.deepEqual(await fs.readFile(a.paths[0]),PNG);assert.equal(a.assets[0].sha256,f.ingests[0].asset.sha256);
 assert.deepEqual(await f.service.invoke('aiyouplus_model_generate',args,context),a);await assert.rejects(f.service.invoke('aiyouplus_model_generate',{...args,prompt:'changed'},context),e=>e.code==='REQUEST_CONFLICT');
 const publicConfig=await f.service.invoke('aiyouplus_model_config',{},context),store=await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),job=await fs.readFile(path.join(f.root,'model-jobs/sync-image.json'),'utf8');
 assert.equal(publicConfig.profiles[ID].hasKey,true);for(const text of [JSON.stringify(publicConfig),store,job])assert.equal(text.includes('fixture-only-key'),false);assert.equal(f.requests[0].auth,'Bearer fixture-only-key');
});
test('persisted async task resumes by GET only after process service recreation; wrong project rejected',async t=>{
 let failed=false;const f=await fixture(t,(req,res)=>{if(req.method==='POST')return json(res,{taskId:'paid-task'});if(!failed){failed=true;return json(res,{message:'fixture query unavailable'},503);}json(res,{status:'done',url:f.baseUrl+'/original.png'});});
 const originalHandler=f.options.fetch;
 f.options.fetch=async(url,opts)=>url.endsWith('/original.png')?new Response(PNG,{headers:{'content-type':'image/png'}}):fetch(url,opts);
 await f.service.dispose();f.service=createModelService(f.options);
 const model={...f.profile.modelCatalog[0],response:{taskIdPath:'taskId'},polling:{method:'GET',path:'/status/{{taskId}}',statusPath:'status',completedValues:['done'],failedValues:['failed'],urlsPath:'url'}};
 await f.service.invoke('aiyouplus_model_configure',{...f.profile,apiKey:'fixture-only-key',modelCatalog:[model]},context);
 await assert.rejects(f.service.invoke('aiyouplus_model_generate',{kind:'image',provider:ID,model:'fixture-image',prompt:'cube',requestId:'async-image'},context),/503|query unavailable/);
 const failedJob=JSON.parse(await fs.readFile(path.join(f.root,'model-jobs/async-image.json')));assert.equal(failedJob.taskId,'paid-task');
 await f.service.dispose();f.service=createModelService(f.options);t.after(()=>f.service.dispose());
 await assert.rejects(f.service.invoke('aiyouplus_model_resume',{requestId:'async-image'},{...context,projectId:'other'}),e=>e.code==='PROJECT_MISMATCH');
 const result=await f.service.invoke('aiyouplus_model_resume',{requestId:'async-image'},context);assert.equal(result.assets.length,1);assert.equal(f.requests.filter(r=>r.method==='POST').length,1);
 const job=JSON.parse(await fs.readFile(path.join(f.root,'model-jobs/async-image.json')));assert.equal(job.status,'completed');assert.equal(job.error,undefined);assert.equal(job.recoveryErrors.length,1);
});
test('origin change clears credential and old API mapping; session-only key vanishes and test config never persists',async t=>{
 const f=await fixture(t,(_req,res)=>json(res,{data:[]}));await f.setup();
 await f.service.invoke('aiyouplus_model_configure',{provider:ID,baseUrl:'https://new.fixture.invalid'},context);
 const c=await f.service.invoke('aiyouplus_model_config',{},context);assert.equal(c.profiles[ID].hasKey,false);assert.deepEqual(c.profiles[ID].modelCatalog,[]);
 const temp={...f.profile,scope:'test',sessionOnly:true,apiKey:'session-fixture-key'};await f.service.invoke('aiyouplus_model_configure',temp,context);
 assert.equal((await f.service.invoke('aiyouplus_model_config',{},context)).profiles[ID].hasKey,true);
 assert.equal((await fs.readFile(path.join(f.root,'model-services.json'),'utf8')).includes('session-fixture-key'),false);
 const other=await f.service.invoke('aiyouplus_model_config',{}, {...context,sessionId:'other'});assert.equal(other.profiles[ID].baseUrl,'https://new.fixture.invalid');
 await assert.rejects(f.service.invoke('aiyouplus_model_configure',{...temp,baseUrl:'https://api.qnaigc.com'},context));assert.equal(f.requests.length,0);
});
test('Chat always uses host without media credential; discovery GET cannot auto-save guessed model contract',async t=>{
 const f=await fixture(t,(_req,res)=>{res.writeHead(200,{'content-type':'text/html'});res.end('<h1>Unknown API</h1><p>No model or endpoint contract.</p>');});
 const r=await f.service.invoke('aiyouplus_model_generate',{kind:'chat',prompt:'hello',requestId:'chat-1'},context);assert.equal(r.text,'host reply');assert.equal(f.requests.length,0);
 const result=await f.service.invoke('aiyouplus_model_discover',{url:f.baseUrl+'/docs',autoConfigure:true},context);assert.equal(result.discovery.readyToConfigure,false);assert.equal(result.configuration,undefined);assert.ok(result.discovery.issues.length>0);assert.equal(f.requests.every(r=>r.method==='GET'&&!r.auth),true);
 const config=await f.service.invoke('aiyouplus_model_config',{},context);assert.equal(config.models.chat,'dsh-current');assert.equal(Object.keys(config.profiles).length,1);
});
test('API discovery omits its internal token default for local CLI while preserving other provider defaults',async t=>{
 const f=await fixture(t,(_req,res)=>{res.writeHead(200,{'content-type':'text/html'});res.end('<h1>Unknown API</h1><p>Manual configuration required.</p>');});
 for(const provider of ['codex-cli','deepseek']){
  await f.service.dispose();const calls=[];
  const llm=Object.assign(async request=>{calls.push(request);return{text:'{}'};},{capabilities:async()=>({available:true,selected:{provider}})});
  f.service=createModelService({...f.options,llm});
  await f.service.invoke('aiyouplus_model_discover',{url:f.baseUrl+'/docs'},context);
  assert.equal(calls.length,1);assert.equal(Object.hasOwn(calls[0],'max_tokens'),provider!=='codex-cli');
  if(provider!=='codex-cli')assert.equal(calls[0].max_tokens,6000);
 }
});
test('stop only ends local waiting; persisted taskId permits GET-only resume',async t=>{
 let ready;const querySeen=new Promise(r=>{ready=r;});let done=false;
 const f=await fixture(t,(req,res)=>{if(req.url==='/original.png'){res.writeHead(200,{'content-type':'image/png'});return res.end(PNG);}if(req.method==='POST')return json(res,{taskId:'stoppable'});ready();return json(res,done?{status:'done',url:f.baseUrl+'/original.png'}:{status:'running'});});
 const row={...f.profile.modelCatalog[0],response:{taskIdPath:'taskId'},polling:{method:'GET',path:'/status/{{taskId}}',statusPath:'status',completedValues:['done'],failedValues:['failed'],urlsPath:'url'}};
 await f.setup({modelCatalog:[row]});const pending=f.service.invoke('aiyouplus_model_generate',{kind:'image',provider:ID,prompt:'cube',requestId:'stop-image'},context).then(()=>null,e=>e);
 await querySeen;const stop=await f.service.invoke('aiyouplus_model_stop',{requestId:'stop-image'},context);assert.deepEqual(stop,{stoppedWaiting:true,remoteTaskCancelled:false});assert.equal((await pending).code,'ABORTED');
 const job=JSON.parse(await fs.readFile(path.join(f.root,'model-jobs/stop-image.json')));assert.equal(job.status,'stopped');assert.equal(job.taskId,'stoppable');
 done=true;const result=await f.service.invoke('aiyouplus_model_resume',{requestId:'stop-image'},context);assert.equal(result.assets.length,1);assert.equal(f.requests.filter(r=>r.method==='POST').length,1);
});
test('download failure preserves synchronous paid receipt; restoring downloads without re-reading Key or re-POST',async t=>{
 let downloads=0;const f=await fixture(t,(req,res)=>{if(req.method==='POST')return json(res,{url:f.baseUrl+'/media.png',subtitle:f.baseUrl+'/subtitle.json'});if(req.url==='/subtitle.json')return json(res,{text:'original subtitle'});if(!downloads++)return json(res,{error:'download unavailable'},503);res.writeHead(200,{'content-type':'image/png'});res.end(PNG);});
 await f.setup({modelCatalog:[{...f.profile.modelCatalog[0],response:{urlsPath:'url',subtitleUrlPath:'subtitle'}}]});
 await assert.rejects(f.service.invoke('aiyouplus_model_generate',{kind:'image',provider:ID,prompt:'cube',requestId:'receipt-image'},context),/503/);
 const failed=JSON.parse(await fs.readFile(path.join(f.root,'model-jobs/receipt-image.json')));assert.equal(failed.status,'download_failed');assert.ok(failed.resultReceipt);
 f.records.clear();const result=await f.service.invoke('aiyouplus_model_resume',{requestId:'receipt-image'},context);assert.equal(result.assets.length,1);assert.deepEqual(result.subtitle,{text:'original subtitle'});assert.equal(f.requests.filter(r=>r.method==='POST').length,1);
 assert.equal(f.requests.find(r=>r.path==='/media.png').auth,undefined);
});
test('test-only profile cannot inherit production Key and unknown credentials do not block public catalog metadata',async t=>{
 const f=await fixture(t,(_req,res)=>json(res,{data:[]}));await f.setup();
 await f.service.invoke('aiyouplus_model_configure',{...f.profile,scope:'test',sessionOnly:true},context);
 const config=await f.service.invoke('aiyouplus_model_config',{},context);assert.equal(config.profiles[ID].hasKey,false);
 const catalog=await f.service.invoke('aiyouplus_model_catalog',{provider:ID},context);assert.equal(catalog.requiresKey,true);assert.equal(f.requests.length,0);
 await assert.rejects(f.service.invoke('aiyouplus_model_generate',{kind:'image',provider:ID,prompt:'x',requestId:'test-no-key'},context),e=>e.code==='MISSING_CREDENTIAL');assert.equal(f.requests.length,0);
});
test('multiple originals receive distinct asset-writer request IDs, stable across download resume',async t=>{
 const f=await fixture(t,(_req,res)=>json(res,{data:[{b64_json:PNG.toString('base64')},{b64_json:PNG.toString('base64')}]}));
 await f.setup({modelCatalog:[{...f.profile.modelCatalog[0],response:{base64Path:'data.*.b64_json'}}]});
 const result=await f.service.invoke('aiyouplus_model_generate',{kind:'image',provider:ID,prompt:'two cubes',requestId:'two-images'},context);
 assert.equal(result.paths.length,2);assert.deepEqual(f.ingests.map(i=>i.opts.requestId),['two-images:output:0','two-images:output:1']);
 assert.equal(new Set(f.ingests.map(i=>i.opts.alias)).size,2);
});
test('session-only origin overlays, clear and delete preserve the hidden durable binding; explicit persistent clear still clears',async t=>{
 const f=await fixture(t,(_req,res)=>json(res,{}));await f.setup();
 const persistedBefore=await fs.readFile(path.join(f.root,'model-services.json'),'utf8');
 await f.service.invoke('aiyouplus_model_configure',{...f.profile,baseUrl:'https://session.fixture.invalid',sessionOnly:true,apiKey:'ephemeral-fixture-only'},context);
 assert.equal(f.records.size,1);assert.equal(await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),persistedBefore);
 const other=(await f.service.invoke('aiyouplus_model_config',{}, {...context,sessionId:'different-session'})).profiles[ID];assert.equal(other.baseUrl,f.baseUrl);assert.equal(other.hasKey,true);
 const restored=await f.service.invoke('aiyouplus_model_delete',{provider:ID},context);assert.equal(restored.profiles[ID].baseUrl,f.baseUrl);assert.equal(restored.profiles[ID].hasKey,true);assert.equal(f.records.size,1);
 await f.service.invoke('aiyouplus_model_configure',{...f.profile,baseUrl:'https://session.fixture.invalid',sessionOnly:true,apiKey:'overlay-to-clear'},context);
 await f.service.invoke('aiyouplus_model_configure',{provider:ID,clearKey:true},context);assert.equal(f.records.size,1);assert.equal((await f.service.invoke('aiyouplus_model_config',{},context)).profiles[ID].hasKey,false);
 const durable=(await f.service.invoke('aiyouplus_model_config',{}, {...context,sessionId:'other'})).profiles[ID];assert.equal(durable.hasKey,true);assert.equal(durable.baseUrl,f.baseUrl);
 await f.service.invoke('aiyouplus_model_delete',{provider:ID},context);await f.service.invoke('aiyouplus_model_configure',{provider:ID,clearKey:true},context);assert.equal(f.records.size,0,'explicit persistent clearKey still clears the selected durable service');
});
for(const tamper of [false,true])test('multi-output checkpoint '+(tamper?'rejects changed local bytes':'resumes only remaining downloads after restart and URL expiry'),async t=>{
 let first=0,second=0;const f=await fixture(t,(req,res)=>{if(req.method==='POST')return json(res,{urls:[f.baseUrl+'/first.png',f.baseUrl+'/second.png']});if(req.url==='/first.png'&&first++)return json(res,{error:'expired'},410);if(req.url==='/second.png'&&!second++)return json(res,{error:'temporary'},503);res.writeHead(200,{'content-type':'image/png'});res.end(PNG);});
 f.options.assets.get=async value=>f.ingests.find(row=>row.asset.id===value||row.asset.path===value)?.asset||null;
 await f.setup({modelCatalog:[{...f.profile.modelCatalog[0],response:{urlsPath:'urls'}}]});
 await assert.rejects(f.service.invoke('aiyouplus_model_generate',{kind:'image',provider:ID,prompt:'two',requestId:'checkpoint-two'},context),/503/);
 const partial=JSON.parse(await fs.readFile(path.join(f.root,'model-jobs/checkpoint-two.json')));assert.equal(partial.outputCheckpoints.length,1);assert.equal(partial.assets.length,1);assert.equal(partial.outputCheckpoints[0].sha256,createHash('sha256').update(PNG).digest('hex'));
 if(tamper)await fs.writeFile(partial.outputCheckpoints[0].assetPath,'changed bytes');
 await f.service.dispose();f.service=createModelService(f.options);t.after(()=>f.service.dispose());const before=f.requests.length;
 if(tamper){await assert.rejects(f.service.invoke('aiyouplus_model_resume',{requestId:'checkpoint-two'},context),/410/);assert.notEqual(JSON.parse(await fs.readFile(path.join(f.root,'model-jobs/checkpoint-two.json'))).status,'completed');}
 else {const result=await f.service.invoke('aiyouplus_model_resume',{requestId:'checkpoint-two'},context);assert.equal(result.assets.length,2);assert.equal(f.ingests.length,2);assert.deepEqual(f.requests.slice(before).map(r=>r.path),['/second.png']);assert.equal(JSON.parse(await fs.readFile(path.join(f.root,'model-jobs/checkpoint-two.json'))).error,undefined);}
 assert.equal(f.requests.filter(r=>r.method==='POST').length,1);
});
test('an uncheckpointed residual file cannot replace an expired remote result',async t=>{
 const f=await fixture(t,(req,res)=>req.method==='POST'?json(res,{url:f.baseUrl+'/gone.png'}):json(res,{error:'expired'},410));
 await f.setup({modelCatalog:[{...f.profile.modelCatalog[0],response:{urlsPath:'url'}}]});await fs.mkdir(path.join(f.root,'outputs'),{recursive:true});await fs.writeFile(path.join(f.root,'outputs/orphan-0.png'),PNG);
 await assert.rejects(f.service.invoke('aiyouplus_model_generate',{kind:'image',provider:ID,prompt:'one',requestId:'orphan'},context),/410/);assert.equal(f.ingests.length,0);assert.equal(f.requests.filter(r=>r.method==='POST').length,1);
});

test('explicitly promoting a session overlay persists its matching credential under the new durable binding',async t=>{
 const f=await fixture(t,(_req,res)=>json(res,{}));await f.setup();
 await f.service.invoke('aiyouplus_model_configure',{...f.profile,baseUrl:'https://session.fixture.invalid',sessionOnly:true,apiKey:'promotion-fixture-only'},context);
 await f.service.invoke('aiyouplus_model_configure',{provider:ID,sessionOnly:false},context);
 await f.service.dispose();f.service=createModelService(f.options);t.after(()=>f.service.dispose());
 const p=(await f.service.invoke('aiyouplus_model_config',{},context)).profiles[ID];assert.equal(p.baseUrl,'https://session.fixture.invalid');assert.equal(p.storage,'host-credentials');assert.equal(p.hasKey,true);
 const record=[...f.records.values()][0];assert.equal(record.payload.origin,'https://session.fixture.invalid');assert.equal(record.payload.key,'promotion-fixture-only');
});

for(const authType of ['none','bearer'])test('temporary profile lifetime is explicit independently of credential storage: '+authType,async t=>{
 const f=await fixture(t,(_req,res)=>json(res,{}));await f.setup();const persisted=await fs.readFile(path.join(f.root,'model-services.json'),'utf8');
 await f.service.invoke('aiyouplus_model_configure',{...f.profile,baseUrl:'https://temporary.fixture.invalid',authType,authHeader:authType==='none'?'':'Authorization',sessionOnly:true},context);
 let p=(await f.service.invoke('aiyouplus_model_config',{},context)).profiles[ID];assert.equal(p.sessionOnly,true);assert.equal(p.hasKey,false);assert.equal(p.storage,'none');
 await f.service.invoke('aiyouplus_model_configure',{provider:ID,name:'Edited temporary metadata'},context);p=(await f.service.invoke('aiyouplus_model_config',{},context)).profiles[ID];assert.equal(p.sessionOnly,true);assert.equal(await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),persisted);assert.equal(f.records.size,1);
 const c=await f.service.invoke('aiyouplus_model_delete',{provider:ID},context);assert.equal(c.profiles[ID].sessionOnly,false);assert.equal(c.profiles[ID].baseUrl,f.baseUrl);assert.equal(c.profiles[ID].hasKey,true);
});
