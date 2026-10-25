import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {discoverApi,DISCOVERY_LIMITS}=require('../aiyou/lib/canvas/providers/aiyouplus-api-discovery.cjs');
const {buildGenericRequest,executeGeneric}=require('../aiyou/lib/canvas/providers/aiyouplus-generic-provider.cjs');
const YAML=require('../aiyou/vendor/yaml/dist/index.js');
const str={type:'string'},obj=(properties,required=[])=>({type:'object',properties,required});
const responses=schema=>({200:{description:'ok',content:{'application/json':{schema}}}});
const operation=(schema,output,extra={})=>({requestBody:{required:true,content:{'application/json':{schema}}},responses:responses(output),...extra});
function spec(base){return {openapi:'3.0.3',info:{title:'Unbranded fixture gateway'},servers:[{url:base}],security:[],paths:{
  '/make':{post:operation(obj({model:str,prompt:str,size:{...str},seed:{type:'integer'}},['model','prompt']),obj({data:{type:'array',items:obj({url:str})}}))},
  '/clips':{post:operation(obj({model:str,prompt:str,duration:{type:'integer'},aspect_ratio:str},['model','prompt']),obj({id:{type:'string',description:'Task ID'}},['id']),{description:'Poll the canonical /jobs/{id} status endpoint.'})},
  '/jobs/{id}':{get:{responses:responses(obj({status:{type:'string',enum:['queued','completed','failed']},video:obj({url:str})}))}},
}};}
function model(id,category,endpoint,operations,extra={}){return {id,metadata:{category,public_contract_summary:{request_endpoint:endpoint,public_operations:operations,...extra},lifecycle:{stage:'active'}}};}
async function fixture(t,{api,models,manifest,extra={},business}={}){
  const calls=[];let base;
  const server=http.createServer(async(req,res)=>{
    const chunks=[];for await(const chunk of req)chunks.push(chunk);
    calls.push({path:req.url,method:req.method,headers:req.headers,body:chunks.length?JSON.parse(Buffer.concat(chunks).toString('utf8')):null});
    if(business&&await business(req,res,calls))return;
    const documents={
      '/':manifest||{documentation:'/docs.md',discovery:{openapi:'/spec.json',models_json:'/catalog.json'}},
      '/spec.json':typeof api==='function'?api(base):api||spec(base),
      '/catalog.json':{base_url:base,data:models||[model('opaque-A','image','/make',['text-to-image']),model('opaque-B','video','/clips',['text-to-video'])]},
      '/docs.md':'# Inert documentation',...extra,
    };
    if(!Object.hasOwn(documents,req.url)){res.writeHead(404);res.end();return;}
    const content=documents[req.url];res.writeHead(200,{'content-type':req.url.endsWith('.yaml')?'application/yaml':typeof content==='string'?'text/plain':'application/json'});res.end(typeof content==='string'?content:JSON.stringify(content));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+server.address().port;
  t.after(async()=>{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));});
  return {base,calls,discover:()=>discoverApi({url:base+'/'} )};
}

test('JSON manifest merges typed public catalogs into unnamed endpoint contracts and explicit Task ID polling',async t=>{
  const f=await fixture(t),result=await f.discover();assert.equal(result.readyToConfigure,true);assert.deepEqual(new Set(result.modelCatalog.map(row=>row.id)),new Set(['opaque-A','opaque-B']));
  const video=result.modelCatalog.find(row=>row.kind==='video');assert.equal(video.response.taskIdPath,'id');assert.equal(video.polling.path,'/jobs/{{taskId}}');assert.equal(video.polling.urlsPath,'video.url');
  assert.ok(result.evidence.some(row=>row.type==='structured-document-manifest'));assert.ok(f.calls.every(row=>row.method==='GET'&&!row.headers.authorization&&!row.headers.cookie&&!row.headers['x-api-key']));
});

test('partial contracts keep confirmed models configurable and expose incomplete models without polluting ready catalog',async t=>{
  const f=await fixture(t,{api:base=>{const api=spec(base);delete api.paths['/jobs/{id}'];return api;}}),result=await f.discover();
  assert.equal(result.readyToConfigure,true);assert.deepEqual(result.modelCatalog.map(row=>row.id),['opaque-A']);
  assert.ok(result.pendingModels.some(row=>row.id==='opaque-B'&&/GET/.test(row.reason)));
});

test('YAML contracts parse with the shipped dependency while aliases, custom tags and prototype keys remain inert',async t=>{
  const f=await fixture(t,{manifest:{discovery:{openapi:'/spec.yaml',models_json:'/catalog.json'}},extra:{'/spec.yaml':YAML.stringify(spec('https://api.yaml-fixture.test'))},models:[]});
  const result=await f.discover();assert.ok(!result.issues.some(row=>row.code==='YAML_REQUIRES_ANALYSIS'));assert.ok(result.evidence.some(row=>row.url.endsWith('/spec.yaml')));
  for(const text of ['openapi: 3.0.3\ninfo: &x {title: test}\ncopy: *x\n','openapi: 3.0.3\ninfo: !!js/function function(){}','{"openapi":"3.0.3","__proto__":{"bad":true}}']){
    const bad=await discoverApi({url:f.base+'/bad.yaml',fetch:async()=>new Response(text,{headers:{'content-type':'application/yaml'}})});
    assert.equal(bad.readyToConfigure,false);assert.ok(bad.issues.some(row=>row.code==='DOCUMENT_STRUCTURE_UNSUPPORTED'));assert.equal({}.bad,undefined);
  }
});

test('typed model metadata excludes deprecated, forbidden and STT models without guessing capability from their IDs',async t=>{
  const rows=[model('chat-looking-name','image','/make',['text-to-image']),model('image-looking-name','stt','/make',['stt']),model('retired','image','/make',['text-to-image']),model('innocent','image','/make',['text-to-image'])];
  rows[2].metadata.lifecycle.stage='retired';rows[3].owned_by='Qiniu';
  const f=await fixture(t,{models:rows}),result=await f.discover();assert.equal(result.readyToConfigure,true);assert.deepEqual(result.modelCatalog.map(row=>row.id),['chat-looking-name']);assert.equal(result.modelCatalog[0].kind,'image');
});

test('reference-only models stay pending and endpoint-wide media inputs never leak into text-only model configuration',async t=>{
  const f=await fixture(t,{models:[model('plain','image','/make',['text-to-image']),model('edit-only','image','/make',['image-edit'])],api:base=>{const api=spec(base);Object.assign(api.paths['/make'].post.requestBody.content['application/json'].schema.properties,{image_urls:{type:'array',maxItems:30,items:str},video_url:str,audio_url:str,mask_url:str});return api;}});
  const result=await f.discover(),plain=result.modelCatalog.find(row=>row.id==='plain');assert.deepEqual(plain.inputModalities,['text']);assert.equal(plain.maxReferences,0);assert.equal(plain.maskSupported,false);assert.ok(result.pendingModels.some(row=>row.id==='edit-only'));assert.ok(!result.modelCatalog.some(row=>row.id==='edit-only'));
});

test('model-specific defaults, selectors and ranges supersede endpoint-wide values without inventing recommended defaults',async t=>{
  const rows=[model('scoped','image','/make',['text-to-image'],{supported_parameters:['prompt','size','seed'],operation_constraints:[{operation:'text-to-image',request_endpoint:'/make',supported_parameters:['prompt','size','seed'],documented_inputs:['text'],parameter_options:{size:['small']},parameter_ranges:{seed:{minimum:0,maximum:10}},recommended_request:{size:'small'}}]})];
  const f=await fixture(t,{models:rows,api:base=>{const api=spec(base);api.paths['/make'].post.requestBody.content['application/json'].schema.properties.size.default='large';return api;}}),result=await f.discover();assert.equal(result.readyToConfigure,true);
  const selected=result.modelCatalog.find(row=>row.id==='scoped');assert.equal(selected.parameters.size,undefined);assert.deepEqual(selected.parameterSchema.size.enum,['small']);assert.ok(selected.request.optionalFields.includes('size'));
  const plan=buildGenericRequest(result,{kind:'image',model:'scoped',prompt:'fixture'});assert.equal(plan.body.size,undefined);
  assert.throws(()=>buildGenericRequest(result,{kind:'image',model:'scoped',prompt:'fixture',seed:20}),/范围/);
});

test('audio requires model-level public details and imports enumerated voices without treating a recommended voice as default',async t=>{
  const audio=base=>{
    const api=spec(base),post=operation(obj({model:str,input:str,voice:str,speed:{type:'number',default:1}},['model','input']),{});
    post.responses={200:{description:'audio',content:{'audio/wav':{schema:{type:'string',format:'binary'}}}}};
    api.paths['/speech']={post};return api;
  };
  const rows=[model('known','tts','/speech',['tts'],{supported_parameters:['input','voice','speed'],operation_constraints:[{operation:'tts',supported_parameters:['input','voice','speed'],documented_inputs:['text'],parameter_options:{voice:['alpha','beta']},parameter_notes:{speed:'A uniform omitted-field default is not verified.'}}]}),model('needs-details','tts','/speech',['tts'])];
  const f=await fixture(t,{models:rows,api:audio}),result=await f.discover(),selected=result.modelCatalog.find(row=>row.id==='known');assert.ok(selected);assert.equal(selected.parameters.voice,undefined);assert.equal(selected.parameters.speed,undefined);assert.deepEqual(selected.parameterSchema.voice.enum,['alpha','beta']);assert.ok(result.pendingModels.some(row=>row.id==='needs-details'));
  assert.equal(buildGenericRequest(result,{kind:'audio',model:'known',prompt:'hello',voiceId:'alpha'}).body.voice,'alpha');assert.throws(()=>buildGenericRequest(result,{kind:'audio',model:'known',prompt:'hello',voiceId:'unknown'}),/选项/);
});

test('manifest links retain SSRF, credentials and forbidden-provider guards and keep a finite traversal budget',async t=>{
  const f=await fixture(t,{manifest:{discovery:{openapi:'https://qiniu.com/openapi.json',models_json:'http://10.1.2.3/models.json',llms_txt:'/llms.txt?api_key=forbidden'}},extra:{}}),result=await f.discover();assert.equal(result.readyToConfigure,false);assert.equal(f.calls.length,1);assert.ok(result.issues.some(row=>row.code==='LINK_REJECTED'));
  assert.ok(DISCOVERY_LIMITS.documents+DISCOVERY_LIMITS.manifestDocuments<=16);
});

test('discovered image submission and canonical video polling execute only against the controlled local fixture',async t=>{
  const bodies=[];const f=await fixture(t,{business:async(req,res)=>{
    if(req.method==='POST'&&req.url==='/make'){res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({data:[{url:'https://media.fixture.test/result.png'}]}));return true;}
    if(req.method==='POST'&&req.url==='/clips'){res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({id:'local-job',status:'queued'}));return true;}
    if(req.url==='/jobs/local-job'){res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({status:'completed',video:{url:'https://media.fixture.test/result.mp4'}}));return true;}
  }}),result=await f.discover();
  const ctx={fetch,signal:new AbortController().signal,pollIntervalMs:0,persistJob:async value=>bodies.push(value)};
  const image=await executeGeneric(ctx,result,{kind:'image',model:'opaque-A',prompt:'only fixture',seed:0});assert.equal(image.urls[0],'https://media.fixture.test/result.png');
  const video=await executeGeneric(ctx,result,{kind:'video',model:'opaque-B',prompt:'only fixture',duration:5,aspectRatio:'16:9'});assert.equal(video.taskId,'local-job');assert.equal(video.urls[0],'https://media.fixture.test/result.mp4');
  const submissions=f.calls.filter(row=>row.method==='POST');assert.equal(submissions.length,2);assert.deepEqual(submissions[0].body,{model:'opaque-A',prompt:'only fixture',seed:0});assert.equal(submissions[1].body.aspect_ratio,'16:9');assert.ok(f.calls.some(row=>row.path==='/jobs/local-job'&&row.method==='GET'));assert.ok(bodies.some(row=>row.taskId==='local-job'));
});
