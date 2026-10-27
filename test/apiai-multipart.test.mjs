import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {BUILTIN_PROFILES,normalizeModelCatalog,validateServiceProfile}=require('../aiyou/lib/canvas/providers/aiyouplus-provider-registry.cjs');
const {buildGenericRequest,executeGeneric}=require('../aiyou/lib/canvas/providers/aiyouplus-generic-provider.cjs');

const PNG=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lF8AAAAASUVORK5CYII=','base64');
const image='data:image/png;base64,'+PNG.toString('base64');
const VIDEO=Buffer.from('000000186674797069736f6d0000020069736f6d69736f32','hex');
const KEY='local-multipart-fixture-only';
const data=(res,body,status=200)=>{res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify(body));};
async function fixture(t,handler){
 const calls=[],server=http.createServer(async(req,res)=>{
  const bytes=[];for await(const chunk of req)bytes.push(chunk);
  const body=Buffer.concat(bytes);calls.push({method:req.method,path:req.url,headers:req.headers,body});
  try{await handler(req,res,body,calls);}catch(error){res.writeHead(500);res.end(error.message);}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 t.after(()=>new Promise(resolve=>server.close(resolve)));
 return{calls,baseUrl:'http://127.0.0.1:'+server.address().port};
}
function profile(baseUrl,entry){
 return{...validateServiceProfile({provider:'apiai',baseUrl,modelCatalog:[entry],models:{[entry.kind]:entry.id}}),apiKey:KEY};
}
function sora(overrides={}){
 return{id:'sora-fixture',kind:'video',inputModalities:['text','image'],maxReferences:1,parameters:{seconds:'4',watermark:false},
  request:{method:'POST',path:'/v1/videos',encoding:'multipart-form-data',template:{model:'{{model}}',prompt:'{{prompt}}',seconds:'{{parameters.seconds}}',watermark:'{{parameters.watermark}}',input_reference:'{{firstFrame}}'},optionalFields:['input_reference'],fileFields:['input_reference']},
  response:{taskIdPath:'id'},polling:{method:'GET',path:'/v1/videos/{{taskId}}',statusPath:'status',completedValues:['completed'],failedValues:['failed'],urlsPath:'video_url',download:{method:'GET',path:'/v1/videos/{{taskId}}/content',mimeType:'video/mp4'}},...overrides};
}
const args={kind:'video',model:'sora-fixture',prompt:'A rotating cube'};
async function form(req,body){return new Request('http://fixture.invalid',{method:'POST',headers:{'content-type':req.headers['content-type']},body}).formData();}

test('APIAI preset carries the business API origin verified by the public site',()=>{
 assert.equal(BUILTIN_PROFILES.apiai.docsUrl,'https://apiai.apifox.cn/');
 assert.equal(BUILTIN_PROFILES.apiai.baseUrl,'https://www.ggwk1.online');
 assert.equal(validateServiceProfile({provider:'apiai'}).baseUrl,'https://www.ggwk1.online');
});

test('multipart scalar generation, authenticated status and binary content use one POST and declared same-origin GETs',async t=>{
 let f,posted;f=await fixture(t,async(req,res,body)=>{
  if(req.method==='POST'){
   assert.match(req.headers['content-type'],/^multipart\/form-data; boundary=/);
   posted=await form(req,body);return data(res,{id:'task/one'});
  }
  if(req.url.endsWith('/content')){res.writeHead(200,{'content-type':'video/mp4'});return res.end(VIDEO);}
  return data(res,{status:'completed'});
 });
 const cfg=profile(f.baseUrl,sora()),plan=buildGenericRequest(cfg,args),receipts=[];
 assert.equal(plan.encoding,'multipart-form-data');assert.deepEqual(plan.body,{model:'sora-fixture',prompt:args.prompt,seconds:'4',watermark:false});
 assert.equal(Object.keys(plan.headers).some(key=>key.toLowerCase()==='content-type'),false);
 const result=await executeGeneric({fetch,signal:undefined,persistJob:async patch=>receipts.push(patch)},cfg,args);
 assert.equal(posted.get('model'),'sora-fixture');assert.equal(posted.get('seconds'),'4');assert.equal(posted.get('watermark'),'false');assert.equal(posted.has('input_reference'),false);
 assert.deepEqual(f.calls.map(c=>[c.method,c.path]),[['POST','/v1/videos'],['GET','/v1/videos/task%2Fone'],['GET','/v1/videos/task%2Fone/content']]);
 assert.equal(f.calls.every(c=>c.headers.authorization==='Bearer '+KEY),true);
 assert.equal(result.taskId,'task/one');assert.deepEqual(result.buffers[0].bytes,VIDEO);assert.equal(result.buffers[0].mimeType,'video/mp4');assert.equal(result.buffers[0].extension,'.mp4');
 assert.equal(JSON.stringify(receipts).includes(KEY),false);assert.equal(JSON.stringify(receipts).includes(args.prompt),false);
});

test('Sora first frame is a binary multipart file; an existing result URL avoids extra authenticated content fetch',async t=>{
 let posted,f;f=await fixture(t,async(req,res,body)=>{
  if(req.method==='POST'){posted=await form(req,body);return data(res,{id:'frame-task'});}
  return data(res,{status:'completed',video_url:f.baseUrl+'/already-returned.mp4'});
 });
 const cfg=profile(f.baseUrl,sora()),refs={imageUrls:[image]};
 const result=await executeGeneric({fetch},cfg,args,refs),file=posted.get('input_reference');
 assert.equal(file.type,'image/png');assert.equal(file.name,'reference-0.png');assert.deepEqual(Buffer.from(await file.arrayBuffer()),PNG);
 assert.deepEqual(result.urls,[f.baseUrl+'/already-returned.mp4']);assert.equal(result.buffers.length,0);assert.equal(f.calls.length,2);
});

test('declared image[] files repeat exact field name; mask remains a binary file',async t=>{
 let posted;const f=await fixture(t,async(req,res,body)=>{posted=await form(req,body);return data(res,{data:[{b64_json:PNG.toString('base64')}]});});
 const entry={id:'image-fixture',kind:'image',inputModalities:['text','image'],maxReferences:2,maskSupported:true,
  request:{method:'POST',path:'/v1/images/edits',encoding:'multipart-form-data',fileFields:['image[]','mask'],template:{model:'{{model}}',prompt:'{{prompt}}','image[]':'{{referenceImages}}',mask:'{{maskImage}}'}},response:{base64Path:'data.0.b64_json'}};
 const cfg=profile(f.baseUrl,entry),refs={imageUrls:[image,image],maskImage:image};
 const result=await executeGeneric({fetch},cfg,{kind:'image',model:entry.id,prompt:'edit selected area'},refs);
 assert.equal(posted.getAll('image[]').length,2);assert.equal(posted.getAll('image').length,0);
 for(const file of [...posted.getAll('image[]'),posted.get('mask')])assert.deepEqual(Buffer.from(await file.arrayBuffer()),PNG);
 assert.deepEqual(result.buffers[0].bytes,PNG);assert.equal(f.calls.length,1);
});

test('JSON mapping and primitive value types stay unchanged',async t=>{
 const f=await fixture(t,(req,res,body)=>{
  assert.equal(req.headers['content-type'],'application/json');
  assert.deepEqual(JSON.parse(body),{model:'json-fixture',prompt:'literal {{prompt}}',n:2,watermark:false});
  return data(res,{data:[{b64_json:PNG.toString('base64')}]});
 });
 const cfg=profile(f.baseUrl,{id:'json-fixture',kind:'image',request:{path:'/v1/images/generations',template:{model:'{{model}}',prompt:'{{prompt}}',n:2,watermark:false}},response:{base64Path:'data.0.b64_json'}});
 const plan=buildGenericRequest(cfg,{kind:'image',model:'json-fixture',prompt:'literal {{prompt}}'});assert.equal(Object.hasOwn(plan,'encoding'),false);
 const result=await executeGeneric({fetch},cfg,{kind:'image',model:'json-fixture',prompt:'literal {{prompt}}'});assert.deepEqual(result.buffers[0].bytes,PNG);
});

test('wildcard URL and Base64 selectors accept URL-only and mixed collections without hiding invalid present data',async t=>{
 let response;const f=await fixture(t,(_req,res)=>data(res,response));
 const entry={id:'collection-fixture',kind:'image',request:{path:'/v1/images/generations',template:{model:'{{model}}',prompt:'{{prompt}}'}},response:{urlsPath:'data.*.url',base64Path:'data.*.b64_json'}};
 const cfg=profile(f.baseUrl,entry),input={kind:'image',model:entry.id,prompt:'two outputs'};
 response={data:[{url:f.baseUrl+'/one.png'},{url:f.baseUrl+'/two.png'}]};
 const urls=await executeGeneric({fetch},cfg,input);assert.deepEqual(urls.urls,[f.baseUrl+'/one.png',f.baseUrl+'/two.png']);assert.equal(urls.buffers.length,0);
 response={data:[{url:f.baseUrl+'/one.png',b64_json:null},{b64_json:PNG.toString('base64')}]};
 const mixed=await executeGeneric({fetch},cfg,input);assert.deepEqual(mixed.urls,[f.baseUrl+'/one.png']);assert.equal(mixed.buffers.length,1);assert.deepEqual(mixed.buffers[0].bytes,PNG);
 response={data:[{url:f.baseUrl+'/one.png'},{b64_json:'not valid base64!'}]};
 await assert.rejects(executeGeneric({fetch},cfg,input),/Base64无效/);
});

test('unsupported encodings, undeclared file fields and unsafe download contracts fail normalization',()=>{
 const row=sora();
 for(const request of [
  {...row.request,encoding:'form-urlencoded'},
  {...row.request,encoding:'json'},
  {...row.request,fileFields:['missing']},
  {...row.request,fileFields:['input_reference','input_reference']},
  {...row.request,fileFields:'input_reference'},
 ])assert.throws(()=>normalizeModelCatalog([{...row,request}],{protocol:'http-json'}));
 for(const download of [
  {method:'POST',path:'/content/{{taskId}}',mimeType:'video/mp4'},
  {method:'GET',path:'https://different.invalid/{{taskId}}',mimeType:'video/mp4'},
  {method:'GET',path:'/content',mimeType:'video/mp4'},
  {method:'GET',path:'/content/{{taskId}}',mimeType:'text/html'},
 ])assert.throws(()=>normalizeModelCatalog([{...row,polling:{...row.polling,download}}],{protocol:'http-json'}));
});

test('invalid data URL, mismatched media bytes, remote paths and object/array scalar fields reject before POST',async t=>{
 const f=await fixture(t,(_req,res)=>data(res,{})),cfg=profile(f.baseUrl,sora());
 const invalidFiles=['/tmp/reference.png','https://fixture.invalid/reference.png','data:text/plain;base64,aGVsbG8=','data:image/png;base64,%%%=', 'data:image/png;base64,aGVsbG8=', 'data:image/png;base64,iVBORw0KGgoA='];
 for(const firstFrame of invalidFiles)await assert.rejects(executeGeneric({fetch},cfg,{...args,firstFrame}),/文件字段/);
 for(const value of [[],{},null,[1,2]]){
  const bad=profile(f.baseUrl,sora({request:{path:'/v1/videos',encoding:'multipart-form-data',template:{model:'{{model}}',prompt:'{{prompt}}',extra:value}}}));
  await assert.rejects(executeGeneric({fetch},bad,args),/普通字段/);
 }
 const raw={...cfg,modelCatalog:[{...sora(),request:{...sora().request,encoding:'unsupported'}}]};
 await assert.rejects(executeGeneric({fetch},raw,args),/请求编码/);
 assert.equal(f.calls.length,0);
});

test('content download failure resumes using authenticated GET only and never resubmits multipart',async t=>{
 let allow=false;const f=await fixture(t,(req,res)=>{
  if(req.method==='POST')return data(res,{id:'recover-task'});
  if(req.url.endsWith('/content')){if(!allow)return data(res,{message:'fixture download unavailable'},503);res.writeHead(200,{'content-type':'video/mp4'});return res.end(VIDEO);}
  return data(res,{status:'completed'});
 });
 const cfg=profile(f.baseUrl,sora());let persisted={};const ctx={fetch,persistJob:async patch=>{persisted={...persisted,...patch};}};
 await assert.rejects(executeGeneric(ctx,cfg,args),/fixture download unavailable/);
 assert.equal(persisted.taskId,'recover-task');assert.equal(persisted.genericContract.polling.download.path,'/v1/videos/{{taskId}}/content');
 const saved=JSON.parse(JSON.stringify(persisted));assert.equal(JSON.stringify(saved).includes(KEY),false);allow=true;
 const result=await executeGeneric(ctx,cfg,args,{},saved);assert.deepEqual(result.buffers[0].bytes,VIDEO);
 assert.equal(f.calls.filter(c=>c.method==='POST').length,1);assert.equal(f.calls.slice(1).every(c=>c.method==='GET'&&c.headers.authorization==='Bearer '+KEY),true);
});

test('no undeclared content fallback and wrong binary MIME is not marked successful',async t=>{
 const f=await fixture(t,(req,res)=>{
  if(req.method==='POST')return data(res,{id:'bad-result'});
  if(req.url.endsWith('/content')){res.writeHead(200,{'content-type':'image/png'});return res.end(PNG);}
  return data(res,{status:'completed'});
 });
 await assert.rejects(executeGeneric({fetch},profile(f.baseUrl,sora()),args),/声明格式/);
 const entry=sora();delete entry.polling.download;const before=f.calls.length;
 await assert.rejects(executeGeneric({fetch},profile(f.baseUrl,entry),args),/没有有效媒体原件/);
 assert.equal(f.calls.slice(before).some(c=>c.path.endsWith('/content')),false);
});
