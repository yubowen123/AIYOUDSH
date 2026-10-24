'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),http=require('node:http');
const {discoverApi,DISCOVERY_LIMITS}=require('./aiyouplus-api-discovery.cjs');
const {buildGenericRequest}=require('./aiyouplus-generic-provider.cjs');
const obj=(properties,required=[])=>({type:'object',properties,required});
const str={type:'string'},url=str,model=id=>({type:'string',enum:[id]});
const response=schema=>({200:{description:'ok',content:{'application/json':{schema}}}});
const request=schema=>({required:true,content:{'application/json':{schema}}});
function spec(base){return {openapi:'3.0.3',info:{title:'Fixture multi-modal API'},servers:[{url:base}],security:[{bearer:[]}],components:{securitySchemes:{bearer:{type:'http',scheme:'bearer'}},schemas:{ChatInput:obj({model:model('chat-fixture'),messages:{type:'array',items:obj({role:str,content:str})}},['model','messages'])}},paths:{
  '/v1/models':{get:{responses:response(obj({data:{type:'array',items:obj({id:str})}}))}},
  '/v1/chat/completions':{post:{requestBody:request({$ref:'#/components/schemas/ChatInput'}),responses:response(obj({choices:{type:'array',items:obj({message:obj({content:str})})}}))}},
  '/v1/images/generations':{post:{requestBody:request(obj({model:model('image-fixture'),prompt:str},['model','prompt'])),responses:response(obj({data:{type:'array',items:obj({url})}}))}},
  '/video/generate':{post:{summary:'Generate video',requestBody:request(obj({model:model('video-fixture'),prompt:str},['model','prompt'])),responses:response(obj({data:obj({taskId:str})}))}},
  '/video/status/{taskId}':{get:{responses:response(obj({data:obj({status:{type:'string',enum:['PENDING','COMPLETED','FAILED']},videoList:{type:'array',items:obj({url})}})}))}},
  '/audio/generate':{post:{requestBody:request(obj({model:model('audio-fixture'),text:str},['model','text'])),responses:response(obj({data:obj({audioUrl:url})}))}},
  '/music/generate':{post:{requestBody:request(obj({model:model('music-fixture'),prompt:str},['model','prompt'])),responses:response(obj({urls:{type:'array',items:str}}))}},
}};}
async function server(t,handler){
  const calls=[],s=http.createServer((req,res)=>{calls.push({method:req.method,path:req.url,authorization:req.headers.authorization,cookie:req.headers.cookie,apiKey:req.headers['x-api-key']});Promise.resolve(handler(req,res)).catch(error=>{res.writeHead(500);res.end(error.message);});});
  await new Promise(resolve=>s.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+s.address().port;
  t.after(async()=>{s.closeAllConnections();await new Promise(resolve=>s.close(resolve));});return {base,calls};
}
function send(res,value,type='application/json'){res.writeHead(200,{'content-type':type});res.end(typeof value==='string'?value:JSON.stringify(value));}

test('HTML links to OpenAPI3; five real capabilities, auth, local $ref and async polling are extracted without business requests',async t=>{
  let f;f=await server(t,(req,res)=>req.url==='/docs'?send(res,'<title>Docs</title><a href="/openapi.json">OpenAPI</a><script>fetch("/must-not-run",{method:"POST"})</script>','text/html'):req.url==='/openapi.json'?send(res,spec(f.base)):send(res,'unexpected'));
  const r=await discoverApi({url:f.base+'/docs'});assert.equal(r.readyToConfigure,true,JSON.stringify({issues:r.issues,models:r.modelCatalog}));assert.equal(r.authType,'bearer');assert.equal(r.authHeader,'Authorization');assert.equal(r.protocol,'openai-compatible');
  assert.deepEqual(new Set(r.modelCatalog.map(m=>m.kind)),new Set(['chat','image','video','audio','music']));
  const video=r.modelCatalog.find(m=>m.kind==='video');assert.deepEqual(video.polling,{path:'/video/status/{{taskId}}',method:'GET',statusPath:'data.status',completedValues:['COMPLETED'],failedValues:['FAILED'],urlsPath:'data.videoList'});
  assert.equal(r.modelCatalog.find(m=>m.kind==='chat').response.textPath,'choices.0.message.content');assert.equal(r.modelCatalog.find(m=>m.kind==='image').response.urlsPath,'data');
  assert.deepEqual(f.calls.map(c=>c.path),['/docs','/openapi.json']);assert.ok(f.calls.every(c=>c.method==='GET'&&!c.authorization&&!c.cookie&&!c.apiKey));
  assert.ok(r.evidence.some(e=>e.type==='authenticated-model-catalog'&&e.path==='/v1/models'&&!e.queried));
});

test('Swagger2 API-key header, basePath, definitions and binary audio contract are preserved',async t=>{
  const swagger={swagger:'2.0',info:{title:'Legacy speech'},host:'api.fixture.test',basePath:'/v1',schemes:['https'],produces:['audio/mpeg'],securityDefinitions:{key:{type:'apiKey',in:'header',name:'X-Vendor-Key'}},security:[{key:[]}],definitions:{Speak:obj({model:model('tts-fixture'),input:str,voice:{type:'string',enum:['official-voice']}},['model','input','voice'])},paths:{'/audio/speech':{post:{parameters:[{in:'body',name:'body',schema:{$ref:'#/definitions/Speak'}}],responses:{200:{description:'MP3',schema:{type:'file'}}}}}}};
  const f=await server(t,(_req,res)=>send(res,swagger)),r=await discoverApi({url:f.base+'/swagger.json'});
  assert.equal(r.baseUrl,'https://api.fixture.test/v1');assert.equal(r.authType,'api-key');assert.equal(r.authHeader,'X-Vendor-Key');assert.equal(r.readyToConfigure,true);
  assert.deepEqual(r.modelCatalog[0].response,{binary:true,mimeType:'audio/mpeg'});assert.equal(r.modelCatalog[0].request.template.voice,'{{parameters.voice}}');assert.equal(r.modelCatalog[0].parameters.voice,'official-voice');assert.equal(f.calls.length,1);
});

test('unknown asynchronous endpoints never acquire a guessed polling URL',async t=>{
  const api=spec('https://api.fixture.test');delete api.paths['/video/status/{taskId}'];api.paths={'/video/generate':api.paths['/video/generate']};
  const f=await server(t,(_req,res)=>send(res,api)),r=await discoverApi({url:f.base+'/openapi.json'});
  assert.equal(r.readyToConfigure,false);assert.equal(r.modelCatalog[0].response.taskIdPath,'data.taskId');assert.equal(r.modelCatalog[0].polling,undefined);assert.ok(r.issues.some(i=>i.code==='POLLING_INCOMPLETE'));assert.equal(f.calls.length,1);
});

test('HTML declares OpenAI compatibility and a scoped model example; page code is not executed',async t=>{
  const html='<title>Compatible</title><p>OpenAI-compatible API. Authorization: Bearer YOUR_KEY</p><pre><code>curl https://api.fixture.test/v1/chat/completions --data \'{"model":"html-chat","messages":[]}\'</code></pre><script>globalThis.__discoveryExecuted=true</script>';
  const f=await server(t,(_req,res)=>send(res,html,'text/html')),r=await discoverApi({url:f.base+'/docs'});
  assert.equal(r.readyToConfigure,true);assert.equal(r.models.chat,'html-chat');assert.equal(r.baseUrl,'https://api.fixture.test');assert.equal(global.__discoveryExecuted,undefined);assert.equal(f.calls.length,1);
});

test('a familiar URL without an explicit standard contract remains a suggestion',async t=>{
  const f=await server(t,(_req,res)=>send(res,'<p>Authorization: Bearer KEY</p><pre>curl https://api.fixture.test/v1/chat/completions --data \'{"model":"html-chat"}\'</pre>','text/html'));
  const r=await discoverApi({url:f.base+'/docs'});assert.equal(r.readyToConfigure,false);assert.ok(r.issues.some(i=>i.code==='STANDARD_COMPATIBILITY_UNCONFIRMED'));
});

test('documented provider labels exclude a Qiniu-routed model even with an innocuous model ID',async t=>{
  const html='<p>OpenAI-compatible Authorization: Bearer KEY</p><table><tr><td>innocent-model</td><td>七牛代理</td></tr></table><pre>curl https://api.fixture.test/v1/chat/completions --data \'{"model":"innocent-model"}\'</pre>';
  const f=await server(t,(_req,res)=>send(res,html,'text/html')),r=await discoverApi({url:f.base+'/docs'});
  assert.deepEqual(r.modelCatalog,[]);assert.deepEqual(r.models,{});assert.equal(r.readyToConfigure,false);
});

test('forbidden or credential-bearing documentation URLs fail before fetch',async()=>{
  let calls=0;const fetch=async()=>{calls++;throw new Error('must not fetch');};
  for(const url of ['https://api.qnaigc.com/docs','https://cdn.qiniucdn.com/openapi.json','https://api.fixture.test/docs?api_key=fixture','https://user:password@api.fixture.test/docs','file:///tmp/docs'])await assert.rejects(discoverApi({url,fetch}));
  assert.equal(calls,0);
});

test('every redirect is revalidated; remote docs cannot redirect into loopback or blocked providers',async()=>{
  for(const target of ['https://qiniu.com/openapi.json','http://127.0.0.1/openapi.json']){
    const calls=[];const r=await discoverApi({url:'https://docs.fixture.test/docs',fetch:async(url,options)=>{calls.push({url,options});return new Response('',{status:302,headers:{location:target}});}});
    assert.equal(calls.length,1);assert.equal(r.readyToConfigure,false);assert.ok(r.issues.some(i=>i.code==='DOCUMENT_UNAVAILABLE'));assert.equal(calls[0].options.credentials,'omit');assert.equal(calls[0].options.redirect,'manual');
  }
});

test('associated documents are capped at five and oversized document bodies are rejected',async t=>{
  const f=await server(t,(req,res)=>req.url==='/docs'?send(res,Array.from({length:8},(_,i)=>'<a href="/spec'+i+'.json">spec</a>').join(''),'text/html'):send(res,{}));
  const r=await discoverApi({url:f.base+'/docs'});assert.equal(f.calls.length,DISCOVERY_LIMITS.documents);assert.ok(r.issues.some(i=>i.code==='DOCUMENT_LIMIT'));
  const large=await server(t,(_req,res)=>{res.writeHead(200,{'content-type':'text/plain','content-length':DISCOVERY_LIMITS.documentBytes+1});res.end('x'.repeat(DISCOVERY_LIMITS.documentBytes+1));});
  const rejected=await discoverApi({url:large.base+'/docs'});assert.equal(rejected.readyToConfigure,false);assert.ok(rejected.issues.some(i=>/1 MiB/.test(i.message)));
});

test('an external abort interrupts a partial document body rather than hanging discovery',async t=>{
  let opened;const began=new Promise(resolve=>opened=resolve);const f=await server(t,(_req,res)=>{res.writeHead(200,{'content-type':'text/html'});res.write('<p>');opened();});
  const controller=new AbortController(),task=discoverApi({url:f.base+'/docs',signal:controller.signal});await began;controller.abort(new Error('fixture cancelled'));
  await assert.rejects(task,/fixture cancelled/);
});

test('analysis hook receives scrubbed inert documentation and grounded suggestions remain explicitly review-only',async t=>{
  const html='<h1>Custom API</h1><p>Base URL https://api.fixture.test; POST /generate, model custom-image; output data.url</p><pre>Authorization: Bearer fixture-public-example-key</pre>';
  const f=await server(t,(_req,res)=>send(res,html,'text/html'));let supplied;
  const r=await discoverApi({url:f.base+'/docs',analyze:async input=>{supplied=input;return {name:'Custom',baseUrl:'https://api.fixture.test',protocol:'http-json',authType:'bearer',authHeader:'Authorization',modelCatalog:[{id:'custom-image',kind:'image',request:{method:'POST',path:'/generate',template:{model:'{{model}}',prompt:'{{prompt}}'}},response:{urlsPath:'data.url'}}]};}});
  assert.equal(JSON.stringify(supplied).includes('fixture-public-example-key'),false);assert.equal(r.modelCatalog[0].id,'custom-image');assert.equal(r.readyToConfigure,false);assert.ok(r.evidence.some(e=>e.type==='model-analysis-suggestion'&&e.requiresReview));
});

test('analysis cannot introduce an unrelated API origin, executable template or unsafe JSON field path',async t=>{
  const f=await server(t,(_req,res)=>send(res,'<p>https://api.fixture.test /generate model custom-image data.url</p>','text/html'));
  const original={name:'Custom',baseUrl:'https://api.fixture.test',protocol:'http-json',authType:'bearer',authHeader:'Authorization',modelCatalog:[{id:'custom-image',kind:'image',request:{method:'POST',path:'/generate',template:{prompt:'{{prompt}}'}},response:{urlsPath:'data.url'}}]};
  for(const mutate of [x=>x.baseUrl='https://other.fixture.test',x=>x.modelCatalog[0].request.template.prompt='${process.env.SECRET}',x=>x.modelCatalog[0].request.template.prompt='{{process.env.SECRET}}',x=>x.modelCatalog[0].request.template.apiKey='fixture-only-key',x=>x.modelCatalog[0].response.urlsPath='__proto__.url',x=>x.authHeader='Cookie',x=>x.modelCatalog[0].request.path='//other.fixture.test/run']){
    const suggestion=structuredClone(original);mutate(suggestion);const r=await discoverApi({url:f.base+'/docs',analyze:async()=>suggestion});assert.equal(r.readyToConfigure,false);assert.deepEqual(r.modelCatalog,[]);assert.ok(r.issues.some(i=>i.code==='ANALYSIS_REJECTED'));
  }
});

test('OpenAPI required unknown parameters and external references are explicit unresolved gaps',async t=>{
  const api=spec('https://api.fixture.test');api.paths={'/v1/images/generations':api.paths['/v1/images/generations']};const s=api.paths['/v1/images/generations'].post.requestBody.content['application/json'].schema;s.properties.accountId={type:'integer'};s.required.push('accountId');
  const f=await server(t,(_req,res)=>send(res,api)),r=await discoverApi({url:f.base+'/spec.json'});assert.equal(r.readyToConfigure,false);assert.equal(r.modelCatalog[0].request.template.accountId,'{{parameters.accountId}}');assert.ok(r.issues.some(i=>i.code==='REQUIRED_PARAMETERS'));
  s.properties.extra={$ref:'https://schema.fixture.test/schema.json#/thing'};const external=await discoverApi({url:f.base+'/spec.json'});assert.ok(external.issues.some(i=>i.code==='EXTERNAL_REFERENCE'));assert.equal(external.readyToConfigure,false);
});

test('Wuread-origin suggestions are forcibly test-scoped and session-only, without hardcoded model defaults',async()=>{
  const api=spec('https://ai-mcp.wuread.cn');api.paths={'/v1/chat/completions':api.paths['/v1/chat/completions']};
  const r=await discoverApi({url:'https://ai-mcp.wuread.cn/openapi.json',fetch:async()=>new Response(JSON.stringify(api),{headers:{'content-type':'application/json'}})});
  assert.equal(r.scope,'test');assert.equal(r.sessionOnly,true);assert.equal(r.models.chat,'chat-fixture');assert.equal(r.modelCatalog.length,1);
});

test('runtime parameters contain only declared values; parameter schema and reference modalities are preserved',async t=>{
  const api=spec('https://api.fixture.test');api.paths={'/v1/images/generations':api.paths['/v1/images/generations']};const schema=api.paths['/v1/images/generations'].post.requestBody.content['application/json'].schema;
  schema.properties.seed={type:'integer',default:42};schema.properties.referenceImageUrls={type:'array',maxItems:3,items:str};
  const f=await server(t,(_req,res)=>send(res,api)),r=await discoverApi({url:f.base+'/spec.json'}),m=r.modelCatalog[0];
  assert.equal(m.parameters.seed,42);assert.equal(m.parameters.referenceImageUrls,undefined);assert.ok(m.inputModalities.includes('image'));assert.equal(m.maxReferences,3);
  assert.equal(r.evidence.find(e=>e.type==='openapi-operation').parameterSchema.seed.type,'integer');assert.equal(m.parameterSchema.seed.type,'integer');assert.equal(m.parameters.seed?.type,undefined);
});

test('supplier metadata in OpenAPI operations prevents a Qiniu proxy with an unbranded model ID from becoming configured',async t=>{
  const api=spec('https://api.fixture.test');api.paths={'/v1/images/generations':api.paths['/v1/images/generations']};api.paths['/v1/images/generations'].post['x-provider']='Qiniu';
  const f=await server(t,(_req,res)=>send(res,api)),r=await discoverApi({url:f.base+'/spec.json'});assert.equal(r.modelCatalog.length,0);assert.equal(r.readyToConfigure,false);assert.ok(r.issues.some(i=>i.code==='FORBIDDEN_PROVIDER'));
});

test('external abort also bounds a supplied analyzer which ignores its signal',async t=>{
  const f=await server(t,(_req,res)=>send(res,'<p>undocumented custom service</p>','text/html'));let started;const began=new Promise(resolve=>started=resolve),controller=new AbortController();
  const task=discoverApi({url:f.base+'/docs',signal:controller.signal,analyze:()=>{started();return new Promise(()=>{});}});await began;controller.abort(new Error('fixture stop analysis'));await assert.rejects(task,/fixture stop analysis/);
});

test('base64 result collections retain every image and failed associated fetches still count against the document cap',async t=>{
  const api=spec('https://api.fixture.test');api.paths={'/v1/images/generations':api.paths['/v1/images/generations']};api.paths['/v1/images/generations'].post.responses=response(obj({data:{type:'array',items:obj({b64_json:str})}}));
  const f=await server(t,(_req,res)=>send(res,api)),r=await discoverApi({url:f.base+'/spec.json'});assert.equal(r.readyToConfigure,true);assert.equal(r.modelCatalog[0].response.base64Path,'data.*.b64_json');
  const failed=await server(t,(req,res)=>{if(req.url==='/docs')send(res,Array.from({length:8},(_,i)=>'<a href="/openapi'+i+'.json">spec</a>').join(''),'text/html');else{res.writeHead(404);res.end();}});
  await discoverApi({url:failed.base+'/docs'});assert.equal(failed.calls.length,5);
});

test('per-operation servers and polling authentication cannot silently reuse another endpoint contract',async t=>{
  const api=spec('https://api.fixture.test');api.paths={'/video/generate':api.paths['/video/generate'],'/video/status/{taskId}':api.paths['/video/status/{taskId}']};api.paths['/video/status/{taskId}'].get.security=[];
  const f=await server(t,(_req,res)=>send(res,api)),r=await discoverApi({url:f.base+'/spec.json'});assert.equal(r.readyToConfigure,false);assert.equal(r.modelCatalog[0].polling,undefined);assert.ok(r.issues.some(i=>i.code==='POLL_AUTH_MISMATCH'));
  api.paths['/video/generate'].post.servers=[{url:'https://another.fixture.test'}];const other=await discoverApi({url:f.base+'/spec.json'});assert.equal(other.readyToConfigure,false);assert.ok(other.issues.some(i=>i.code==='OPERATION_SERVER_OVERRIDE'));
});

test('required transport parameters and unresolved deployment path variables remain explicit rather than a false ready profile',async t=>{
  const api=spec('https://api.fixture.test');api.paths={'/v1/chat/completions':api.paths['/v1/chat/completions']};api.paths['/v1/chat/completions'].post.parameters=[{in:'query',name:'api-version',required:true,schema:{type:'string'}}];
  const f=await server(t,(_req,res)=>send(res,api)),r=await discoverApi({url:f.base+'/spec.json'});assert.equal(r.readyToConfigure,false);assert.ok(r.issues.some(i=>i.code==='REQUIRED_TRANSPORT_PARAMETERS'));
  api.paths={'/deployments/{deployment}/chat/completions':api.paths['/v1/chat/completions']};const dynamic=await discoverApi({url:f.base+'/spec.json'});assert.equal(dynamic.readyToConfigure,false);assert.equal(dynamic.modelCatalog.length,0);assert.ok(dynamic.issues.some(i=>i.code==='PATH_PARAMETERS_REQUIRED'));
});

test('discovered optional and required defaults render user edits in the actual HTTP body without sending schema metadata',async t=>{
  let f;const bodies=[];
  f=await server(t,async(req,res)=>{
    if(req.url==='/video/generate'){
      const chunks=[];for await(const chunk of req)chunks.push(chunk);bodies.push(JSON.parse(Buffer.concat(chunks).toString('utf8')));send(res,{data:{taskId:'fixture-only'}});return;
    }
    const api=spec(f.base);api.security=[];api.paths={'/video/generate':api.paths['/video/generate'],'/video/status/{taskId}':api.paths['/video/status/{taskId}']};
    const s=api.paths['/video/generate'].post.requestBody.content['application/json'].schema;
    Object.assign(s.properties,{duration:{type:'integer',default:2,minimum:1,maximum:3},speed:{type:'number',default:1,minimum:0.5,maximum:2},mode:{type:'string',enum:['motion']},format:{type:'string',enum:['mp4','webm']}});s.required.push('speed','mode');send(res,api);
  });
  const r=await discoverApi({url:f.base+'/openapi.json'}),m=r.modelCatalog[0];
  assert.equal(r.readyToConfigure,true);
  assert.equal(m.request.template.duration,'{{parameters.duration}}');assert.equal(m.request.template.speed,'{{parameters.speed}}');assert.equal(m.request.template.mode,'{{parameters.mode}}');
  assert.equal(m.parameterSchema.duration.mapped,true);assert.equal(m.parameterSchema.format.mapped,false);assert.equal(m.request.template.format,undefined);
  assert.ok(r.issues.some(i=>i.code==='OPTIONAL_PARAMETER_MAPPING_REQUIRED'&&i.message.includes('format')));
  const args={kind:'video',model:'video-fixture',prompt:'A red cube turns once.'};
  const defaults=buildGenericRequest(r,args),changed=buildGenericRequest(r,{...args,duration:3,parameters:{speed:1.5}});
  assert.equal(defaults.body.duration,2);assert.equal(defaults.body.speed,1);assert.equal(defaults.body.mode,'motion');
  assert.equal(changed.body.duration,3);assert.equal(changed.body.speed,1.5);assert.equal(changed.body.parameterSchema,undefined);assert.equal(changed.body.parameters,undefined);
  assert.equal(buildGenericRequest(r,{...args,parameters:{duration:1}}).body.duration,1);
  for(const plan of [defaults,changed])await fetch(plan.url,{method:plan.method,headers:plan.headers,body:JSON.stringify(plan.body)});
  assert.deepEqual(bodies,[{model:'video-fixture',prompt:args.prompt,duration:2,speed:1,mode:'motion'},{model:'video-fixture',prompt:args.prompt,duration:3,speed:1.5,mode:'motion'}]);
  assert.deepEqual(f.calls.map(c=>c.method),['GET','POST','POST']);assert.ok(f.calls.every(c=>!c.authorization&&!c.apiKey));
});
