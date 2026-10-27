import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {createModelService} from '../aiyou/lib/canvas/model-service.mjs';

const context={sessionId:'session-fixture',projectId:'project-fixture'};
const key='only-for-offline-apiai-fixture',baseUrl='https://apiai-channel.fixture.invalid/v1';
const response=ids=>new Response(JSON.stringify({data:ids.map(id=>({id,object:'model',owned_by:'fixture'}))}),{headers:{'content-type':'application/json'}});
const platformMetadata={success:true,vendors:[],supported_endpoint:{'image-generation':{path:'/v1/images/generations',method:'POST'},'openai-videos':{path:'/v1/videos',method:'POST'},'查询视频':{path:'/v1/videos/{video_id}',method:'GET'}},data:[...['gpt-image-1','gpt-image-2'].map(model_name=>({model_name,supported_endpoint_types:['image-generation']})),...['veo3','veo3.1'].map(model_name=>({model_name,supported_endpoint_types:['openai-videos','查询视频']}))]};
async function fixture(t){
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'dsh-apiai-')),records=new Map(),requests=[];
 let handle=()=>response(['gpt-image-1','veo3','unknown-fixture']),metadata=()=>new Response(JSON.stringify(platformMetadata));
 const options={stateDir:root,credentials:{describeRecord:async id=>({configured:records.has(id)}),readRecord:async id=>records.get(id),modifyRecord:async(id,fn)=>records.set(id,await fn(records.get(id))),deleteRecord:async id=>records.delete(id)},fetch:async(url,opts)=>{requests.push({url,opts});return new URL(url).pathname==='/api/pricing'?metadata(url,opts):handle(url,opts);},llm:Object.assign(async()=>{throw Error('No LLM or generation in configuration');},{capabilities:async()=>({available:true,selected:{provider:'dsh-fixture',model:'current-fixture'}})})};
 const f={root,records,requests,options,service:createModelService(options),handle:fn=>{handle=fn;},metadata:fn=>{metadata=fn;}};
 f.invoke=(command,args={})=>f.service.invoke('aiyouplus_model_'+command,args,context);
 t.after(async()=>{await f.service.dispose();await fs.rm(root,{recursive:true,force:true});});return f;
}

test('the published business API origin is preset without creating a service or exposing a Key',async t=>{
 const f=await fixture(t),config=await f.invoke('config');
 assert.equal(config.defaultMediaChannel.provider,'apiai');assert.equal(config.defaultMediaChannel.docsUrl,'https://apiai.apifox.cn/');assert.equal(config.defaultMediaChannel.baseUrl,'https://www.ggwk1.online');
 assert.deepEqual(Object.keys(config.profiles),['host']);assert.equal(config.chatProvider,'host');assert.equal(f.requests.length,0);
 await assert.rejects(f.invoke('autoconfigure',{baseUrl:'',apiKey:key}),e=>e.code==='MISSING_BASE_URL');
 await assert.rejects(f.invoke('autoconfigure',{baseUrl:'https://apiai.apifox.cn/',apiKey:key}),/文档站/);
 await assert.rejects(f.invoke('autoconfigure',{baseUrl:'https://api.qnaigc.com',apiKey:key}));
 await assert.rejects(f.invoke('autoconfigure',{provider:'other',baseUrl,apiKey:key}),e=>e.code==='INVALID_REQUEST');
 await assert.rejects(f.invoke('autoconfigure',{baseUrl}),e=>e.code==='MISSING_CREDENTIAL');assert.equal(f.requests.length,0);assert.equal(f.records.size,0);
});

test('the default channel can be configured with only the Key and the verified preset URL',async t=>{
 const f=await fixture(t);const result=await f.invoke('autoconfigure',{apiKey:key});
 assert.equal(result.configured,true);assert.equal(f.requests[0].url,'https://www.ggwk1.online/v1/models');assert.equal(result.configuration.profiles.apiai.baseUrl,'https://www.ggwk1.online');
});

test('one authenticated GET intersects documented image/video contracts, saves defaults, and never exports the Key',async t=>{
 const f=await fixture(t),result=await f.invoke('autoconfigure',{baseUrl,apiKey:key});
 assert.equal(result.configured,true);assert.equal(result.discovery.accountCatalogVerified,true);assert.equal(result.configuration.provider,'apiai');
 assert.equal(result.configuration.models.chat,'dsh-current');assert.equal(result.configuration.profiles.apiai.hasKey,true);
 assert.ok(result.discovery.modelCatalog.some(m=>m.id==='gpt-image-1'&&m.kind==='image'));assert.ok(result.discovery.modelCatalog.some(m=>m.id==='veo3'&&m.kind==='video'));
 assert.ok(result.discovery.pendingModels.some(m=>m.id==='unknown-fixture'));
 assert.equal(f.requests.length,2);const call=f.requests[0];assert.equal(call.url,baseUrl+'/models');assert.equal(call.opts.method,'GET');assert.equal(call.opts.body,undefined);assert.equal(call.opts.redirect,'error');assert.equal(call.opts.headers.Authorization,'Bearer '+key);
 const publicCall=f.requests[1];assert.equal(publicCall.url,'https://apiai-channel.fixture.invalid/api/pricing');assert.equal(publicCall.opts.method,'GET');assert.equal(publicCall.opts.headers.Authorization,undefined);assert.equal(publicCall.opts.credentials,'omit');
 const stored=await fs.readFile(path.join(f.root,'model-services.json'),'utf8');for(const text of [JSON.stringify(result),stored])assert.equal(text.includes(key),false);
 if(process.platform!=='win32')assert.equal((await fs.stat(path.join(f.root,'model-services.json'))).mode&0o777,0o600);
 assert.deepEqual((await fs.readdir(f.root)).sort(),['model-services.json']);
});

test('saved Key is reused after restart; automatic refresh preserves valid defaults and other services',async t=>{
 const f=await fixture(t),other='service-12345678-1234-4234-8234-123456789abc';
 await f.invoke('configure',{provider:other,name:'Existing custom',baseUrl:'https://other.fixture.invalid',protocol:'http-json',authType:'bearer',authHeader:'Authorization',apiKey:'other-only-fixture',modelCatalog:[],models:{}});
 await f.invoke('autoconfigure',{baseUrl,apiKey:key});
 await f.service.dispose();f.service=createModelService(f.options);f.handle(()=>response(['gpt-image-1','gpt-image-2','veo3','veo3.1']));
 const result=await f.invoke('autoconfigure',{provider:'apiai'}),config=result.configuration;
 assert.equal(config.profiles[other].name,'Existing custom');assert.equal(config.profiles[other].hasKey,true);assert.equal(config.profiles.apiai.hasKey,true);
 assert.equal(config.models.image,'gpt-image-1');assert.equal(config.models.video,'veo3');assert.equal(f.requests.filter(r=>r.opts.headers.Authorization).at(-1).opts.headers.Authorization,'Bearer '+key);
 assert.equal(config.chatProvider,'host');assert.equal(config.hostModel.selected.provider,'dsh-fixture');
});

test('a public metadata failure cannot silently fall back to obsolete route contracts or replace saved state',async t=>{
 const f=await fixture(t);await f.invoke('autoconfigure',{baseUrl,apiKey:key});const before=await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),record=JSON.stringify([...f.records]);
 f.metadata(()=>new Response('unavailable',{status:503}));await assert.rejects(f.invoke('autoconfigure',{}),e=>e.code==='CATALOG_UNAVAILABLE');
 f.metadata(()=>new Response(JSON.stringify({success:true,data:[]})));await assert.rejects(f.invoke('autoconfigure',{}),e=>e.code==='CATALOG_INVALID');
 assert.equal(await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),before);assert.equal(JSON.stringify([...f.records]),record);
});

test('failed authentication, malformed metadata and unsupported-only catalogs preserve the prior Key and configuration',async t=>{
 const f=await fixture(t);await f.invoke('autoconfigure',{baseUrl,apiKey:key});
 const before=await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),record=JSON.stringify([...f.records]);
 f.handle(()=>new Response(JSON.stringify({error:{message:'echo '+key}}),{status:401}));
 await assert.rejects(f.invoke('autoconfigure',{baseUrl,apiKey:'invalid-fixture'}),e=>e.code==='CATALOG_AUTH_FAILED'&&!e.message.includes(key));
 f.handle(()=>new Response('<html>not an API</html>'));
 await assert.rejects(f.invoke('autoconfigure',{baseUrl,apiKey:'invalid-fixture'}),e=>e.code==='CATALOG_INVALID');
 f.handle(()=>response(['unknown-only-fixture']));const missing=await f.invoke('autoconfigure',{baseUrl,apiKey:'unmapped-fixture'});
 assert.equal(missing.configured,false);assert.equal(missing.discovery.accountCatalogVerified,true);assert.ok(missing.discovery.pendingModels.length);assert.equal(missing.configuration.models.video,'veo3');
 assert.equal(await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),before);assert.equal(JSON.stringify([...f.records]),record);
});

test('a changed API origin cannot receive the existing stored Key; banned ownership and echoed credentials are excluded',async t=>{
 const f=await fixture(t);await f.invoke('autoconfigure',{baseUrl,apiKey:key});const count=f.requests.length;
 await assert.rejects(f.invoke('autoconfigure',{baseUrl:'https://different.fixture.invalid'}),e=>e.code==='MISSING_CREDENTIAL');assert.equal(f.requests.length,count);
 f.handle(()=>new Response(JSON.stringify({data:[{id:'gpt-image-1',owned_by:'QNAIGC'},{id:'echo-'+key},{id:'veo3',owned_by:'fixture'}]})));
 const result=await f.invoke('autoconfigure',{});assert.deepEqual(result.discovery.modelCatalog.map(m=>m.id),['veo3']);assert.equal(JSON.stringify(result).includes(key),false);
});

test('explicit vendor and modality evidence cannot be stripped into a false media match',async t=>{
 const f=await fixture(t);
 for(const extra of [{provider:'Qiniu proxy'},{vendor:'QNAIGC'},{name:'七牛图像'},{modality:'chat'},{task:'embeddings'}]){
  f.handle(()=>new Response(JSON.stringify({data:[{id:'gpt-image-1',owned_by:'openai',...extra},{id:'veo3'}]})));
  const result=await f.invoke('autoconfigure',{baseUrl,apiKey:key});assert.deepEqual(result.discovery.modelCatalog.map(m=>m.id),['veo3']);
 }
});

test('session-only onboarding does not overwrite durable credentials or expose the overlay to another conversation',async t=>{
 const f=await fixture(t);await f.invoke('autoconfigure',{baseUrl,apiKey:key});const before=await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),record=JSON.stringify([...f.records]);
 const result=await f.invoke('autoconfigure',{baseUrl:'https://session.fixture.invalid',apiKey:'ephemeral-apiai-fixture',sessionOnly:true});
 assert.equal(result.configuration.profiles.apiai.storage,'session');assert.equal(result.configuration.profiles.apiai.sessionOnly,true);
 const other=await f.service.invoke('aiyouplus_model_config',{}, {...context,sessionId:'other-session'});assert.equal(other.profiles.apiai.baseUrl,baseUrl);
 assert.equal(await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),before);assert.equal(JSON.stringify([...f.records]),record);
});

test('closing the service aborts catalog discovery and prevents late credential/config writes',async t=>{
 const f=await fixture(t);let started;const began=new Promise(r=>{started=r;});
 f.handle((_url,options)=>new Promise((_resolve,reject)=>{started();options.signal.addEventListener('abort',()=>reject(options.signal.reason),{once:true});}));
 const request=f.invoke('autoconfigure',{baseUrl,apiKey:key}).then(()=>null,e=>e);await began;await f.service.dispose();assert.equal((await request).code,'DISPOSED');
 assert.equal(f.records.size,0);assert.deepEqual(await fs.readdir(f.root),[]);
});

test('shutdown drains a credential/config commit already started and rejects new work until it completes',async t=>{
 const f=await fixture(t);let entered,release;
 const began=new Promise(r=>{entered=r;}),gate=new Promise(r=>{release=r;});
 f.options.credentials.modifyRecord=async(id,fn)=>{entered();await gate;f.records.set(id,await fn(f.records.get(id)));};
 const saving=f.invoke('autoconfigure',{baseUrl,apiKey:key});await began;
 let stopped=false;const closing=f.service.dispose().then(()=>{stopped=true;});
 try{await Promise.resolve();assert.equal(stopped,false);await assert.rejects(f.invoke('config'),e=>e.code==='DISPOSED');assert.equal(f.records.size,0);}finally{release();}
 const saved=await saving;await closing;assert.equal(saved.configured,true);assert.equal(stopped,true);
 assert.equal(f.records.size,1);const stored=JSON.parse(await fs.readFile(path.join(f.root,'model-services.json'),'utf8'));assert.equal(stored.profiles.apiai.modelCatalog.length>0,true);
 const before=await fs.readFile(path.join(f.root,'model-services.json'),'utf8');await assert.rejects(f.invoke('autoconfigure',{baseUrl,apiKey:'later-fixture'}),e=>e.code==='DISPOSED');
 assert.equal(await fs.readFile(path.join(f.root,'model-services.json'),'utf8'),before);
});
