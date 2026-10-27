import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {APIAI_PRESET,buildApiaiCatalog,validateApiaiReferences}=require('../aiyou/lib/canvas/providers/apiai-default-profile.cjs');
const {validateServiceProfile}=require('../aiyou/lib/canvas/providers/aiyouplus-provider-registry.cjs');
const {buildGenericRequest,executeGeneric}=require('../aiyou/lib/canvas/providers/aiyouplus-generic-provider.cjs');
const PNG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
const IDS=['gpt-image-1','gpt-image-2','flux-pro-1.1','recraftv3','veo2','veo2-fast','veo2-fast-frames','veo2-fast-components','veo2-pro','veo3','veo3-fast','veo3-pro','veo3-pro-frames','veo3.1','veo3.1-pro','kling-v1','kling-v1-6','kling-v2-master','kling-v2-1-master','kling-v1-5','kling-v2-1','sora-2','sora-2-pro'];
function configured(ids,options){
 const catalog=buildApiaiCatalog(ids,options);
 return {...validateServiceProfile({provider:'apiai',name:APIAI_PRESET.name,baseUrl:'http://127.0.0.1:5555',protocol:'http-json',authType:'bearer',scope:'production',docsUrl:APIAI_PRESET.docsUrl,...catalog}),apiKey:'fixture-only-key'};
}
const plan=(cfg,id,extra={},refs={})=>buildGenericRequest(cfg,{kind:cfg.modelCatalog.find(model=>model.id===id).kind,model:id,prompt:'fixture cube',...extra},refs);

test('the default preset is media-only and never mistakes an Apifox origin for the business endpoint',()=>{
 assert.deepEqual(APIAI_PRESET,{provider:'apiai',name:'APIAI 默认媒体通道',docsUrl:'https://apiai.apifox.cn/',baseUrl:'https://www.ggwk1.online',kinds:['image','video']});
 assert.equal(Object.isFrozen(APIAI_PRESET),true);assert.equal(Object.isFrozen(APIAI_PRESET.kinds),true);
 assert.equal(validateServiceProfile({...APIAI_PRESET,protocol:'http-json'}).baseUrl,'https://www.ggwk1.online');
 assert.notEqual(new URL(APIAI_PRESET.baseUrl).origin,new URL(APIAI_PRESET.docsUrl).origin);
});
test('an empty or entirely unmapped live directory cannot invent a configured default',()=>{
 for(const rows of [[],['future-image-1','future-video-2'],[{id:'gpt-image-2-suffix',kind:'image'}]]){
  const result=buildApiaiCatalog(rows,{previousModels:{image:'gpt-image-1',video:'veo3'}});
  assert.deepEqual(result.modelCatalog,[]);assert.deepEqual(result.models,{});assert.ok(result.issues.some(issue=>issue.code==='no_supported_media_models'));
  assert.equal(result.pendingModels.length,rows.length);
 }
 assert.throws(()=>buildApiaiCatalog({data:[]}),/数组/);
});
test('only exact documented model IDs intersect the actual directory; names cannot grant a contract',()=>{
 const result=buildApiaiCatalog([{id:'gpt-image-1'},'sora-2',{id:'SORA-2',name:'sora-2'},{id:'seedance-2.5'},{id:'gpt-image-1-alias',kind:'image'}]);
 assert.deepEqual(result.modelCatalog.map(model=>model.id),['gpt-image-1','sora-2']);
 assert.deepEqual(result.pendingModels.map(model=>model.id),['SORA-2','seedance-2.5','gpt-image-1-alias']);
 assert.equal(result.modelCatalog.some(model=>model.kind==='chat'),false);
});
test('disabled supplier ownership, explicit non-media metadata and invalid IDs are filtered independently',()=>{
 const rows=[{id:'gpt-image-1',owned_by:'qiniu'},{id:'recraftv3',provider:'QNAIGC'},'qiniu-image',
  {id:'sora-2',kind:'chat'},{id:'text-model',type:'chat'},{id:'voice-model',kind:'audio'},
  {id:'__proto__'},{id:' gpt-image-2'},{id:'bad\nmodel'},null,{id:5},'gpt-image-2'];
 const before=structuredClone(rows),result=buildApiaiCatalog(rows);
 assert.deepEqual(result.modelCatalog.map(model=>model.id),['gpt-image-2']);assert.deepEqual(rows,before);
 assert.deepEqual(result.pendingModels,[]);
 assert.equal(result.issues.find(issue=>issue.code==='blocked_supplier_filtered').count,3);
 assert.equal(result.issues.find(issue=>issue.code==='non_media_filtered').count,3);
 assert.equal(result.issues.find(issue=>issue.code==='invalid_catalog_rows').count,5);
});
test('a forbidden or contradictory duplicate never becomes enabled through another copy of its ID',()=>{
 const result=buildApiaiCatalog(['gpt-image-1',{id:'gpt-image-1',owned_by:'七牛'},'veo3',{id:'veo3',type:'chat'},'recraftv3','recraftv3']);
 assert.deepEqual(result.modelCatalog.map(model=>model.id),['recraftv3']);
 assert.equal(result.evidence.length,1);
});
test('defaults retain a still-available selection, otherwise follow fixed JSON-first declaration order',()=>{
 const rows=['sora-2','kling-v1','veo3','gpt-image-2','gpt-image-1'];
 const first=buildApiaiCatalog(rows),second=buildApiaiCatalog([...rows].reverse());
 assert.deepEqual(first,second);assert.deepEqual(first.models,{image:'gpt-image-1',video:'veo3'});
 const retained=buildApiaiCatalog(rows,{previousModels:{image:'gpt-image-2',video:'kling-v1',chat:'dsh-current'}});
 assert.deepEqual(retained.models,{image:'gpt-image-2',video:'kling-v1'});
 assert.deepEqual(buildApiaiCatalog(['gpt-image-2'],{previousModels:{video:'veo3'}}).models,{image:'gpt-image-2'});
});
test('known incomplete endpoints stay pending, including the extra MiniMax file-lookup stage',()=>{
 const result=buildApiaiCatalog(['video-01','image-01','doubao-seaweed']);
 assert.deepEqual(result.modelCatalog,[]);assert.equal(result.pendingModels.length,3);
 for(const row of result.pendingModels){assert.equal(row.code,'incomplete_documented_contract');assert.ok(row.sourceUrls.length);}
 assert.match(result.pendingModels.find(model=>model.id==='video-01').reason,/file_id/);
});
test('every generated contract passes the registry and produces a real generic request plan',()=>{
 const cfg=configured(IDS);assert.equal(cfg.modelCatalog.length,23);
 for(const model of cfg.modelCatalog){
  const refs=model.request.path.endsWith('/image2video')?{imageUrls:[PNG]}:{};
  const result=plan(cfg,model.id,{},refs);
  assert.equal(new URL(result.url).origin,'http://127.0.0.1:5555');assert.equal(result.method,'POST');
  assert.equal(result.headers.Authorization,'Bearer fixture-only-key');assert.equal(result.model.id,model.id);
 }
});
test('image generation exposes only its documented size field and never pretends to support reference editing',()=>{
 const cfg=configured(['gpt-image-1']);
 assert.deepEqual(plan(cfg,'gpt-image-1').body,{model:'gpt-image-1',prompt:'fixture cube'});
 assert.deepEqual(plan(cfg,'gpt-image-1',{parameters:{size:'1024x1024'}}).body,{model:'gpt-image-1',prompt:'fixture cube',size:'1024x1024'});
 assert.throws(()=>plan(cfg,'gpt-image-1',{}, {imageUrls:[PNG]}),/参考图片超过|未声明图片/);
 assert.equal(cfg.modelCatalog[0].response.urlsPath,'data.*.url');assert.equal(cfg.modelCatalog[0].response.base64Path,'data.*.b64_json');
});
test('Veo required boolean and image-array mappings are explicit, with no invented duration controls',()=>{
 const cfg=configured(['veo3.1']),plain=plan(cfg,'veo3.1');
 assert.deepEqual(plain.body,{model:'veo3.1',prompt:'fixture cube',enhance_prompt:false,images:[]});
 const image=plan(cfg,'veo3.1',{aspectRatio:'9:16',parameters:{enhance_prompt:true}},{imageUrls:['https://assets.example/first.png']});
 assert.deepEqual(image.body,{model:'veo3.1',prompt:'fixture cube',enhance_prompt:true,images:['https://assets.example/first.png'],aspect_ratio:'9:16'});
 assert.throws(()=>plan(cfg,'veo3.1',{}, {imageUrls:[PNG]}),/映射遗漏/);
 assert.throws(()=>plan(cfg,'veo3.1',{duration:5}),/未映射参数/);
 assert.equal(image.polling.path,'/veo/v1/video/query?id={{taskId}}');
 assert.deepEqual(image.polling.completedValues,['completed']);
 assert.equal(image.polling.completedValues.includes('video_generation_completed'),false);
});
test('Kling text mode uses model_name and validates duration as the documented string, without an image alias',()=>{
 const cfg=configured(['kling-v1']),result=plan(cfg,'kling-v1',{aspectRatio:'1:1',parameters:{duration:'5',mode:'std',cfg_scale:0}});
 assert.deepEqual(result.body,{model_name:'kling-v1',prompt:'fixture cube',duration:'5',mode:'std',cfg_scale:0,aspect_ratio:'1:1'});
 assert.equal(result.polling.path,'/kling/v1/videos/text2video/{{taskId}}');assert.equal(result.polling.urlsPath,'data.task_result.videos.*.url');
 assert.throws(()=>plan(cfg,'kling-v1',{duration:5}),/类型不符/);
 assert.throws(()=>plan(cfg,'kling-v1',{}, {imageUrls:[PNG]}),/参考图片超过|未声明图片/);
});
test('Kling image-only IDs require the mapped first frame, strip the data URL prefix and reject a second image',()=>{
 const cfg=configured(['kling-v1-5']);assert.throws(()=>plan(cfg,'kling-v1-5'),/缺少参数/);
 const result=plan(cfg,'kling-v1-5',{prompt:undefined},{imageUrls:[PNG]});
 assert.deepEqual(result.body,{model_name:'kling-v1-5',image:PNG.split(',')[1]});
 assert.equal(result.polling.path,'/kling/v1/videos/image2video/{{taskId}}');
 assert.throws(()=>plan(cfg,'kling-v1-5',{}, {imageUrls:[PNG,PNG]}),/超过/);
});
test('Sora remains an explicitly third-party multipart route with authenticated completion download',()=>{
 const cfg=configured(['sora-2']),result=plan(cfg,'sora-2',{}, {imageUrls:[PNG]});
 assert.equal(result.encoding,'multipart-form-data');assert.deepEqual(result.fileFields,['input_reference']);
 assert.equal(Object.keys(result.headers).some(key=>key.toLowerCase()==='content-type'),false);
 assert.deepEqual(result.body,{model:'sora-2',prompt:'fixture cube',seconds:4,input_reference:PNG});
 assert.deepEqual(result.polling.download,{method:'GET',path:'/v1/videos/{{taskId}}/content',mimeType:'video/mp4'});
 assert.equal(result.polling.urlsPath,'video_url');assert.equal(plan(cfg,'sora-2').body.input_reference,undefined);
 assert.throws(()=>plan(cfg,'sora-2',{duration:10}),/可用选项/);
 assert.throws(()=>plan(cfg,'sora-2',{duration:'4'}),/类型不符/);
 assert.ok(buildApiaiCatalog(['sora-2']).issues.some(issue=>issue.code==='third_party_sora_compatibility'));
});
test('DSH Sora duration maps an integer control value into the actual multipart seconds string',async()=>{
 const cfg=configured(['sora-2']),calls=[];
 const fetch=async(url,options)=>{
  calls.push({url,options});
  if(options.method==='POST'){
   assert.ok(options.body instanceof FormData);assert.equal(options.body.get('seconds'),'8');
   assert.equal(options.body.get('model'),'sora-2');
   return new Response(JSON.stringify({id:'fixture-task',status:'queued'}),{headers:{'content-type':'application/json'}});
  }
  return new Response(JSON.stringify({status:'completed',video_url:'https://assets.example/result.mp4'}),{headers:{'content-type':'application/json'}});
 };
 const result=await executeGeneric({fetch},cfg,{kind:'video',model:'sora-2',prompt:'fixture cube',duration:8});
 assert.equal(calls.length,2);assert.deepEqual(result.urls,['https://assets.example/result.mp4']);
});
test('Veo guard requires a public image URL and keeps the one-image limit explicit',()=>{
 const model=configured(['veo3.1']).modelCatalog[0];
 assert.deepEqual(validateApiaiReferences(model,[]),{validated:true,count:0,remoteDimensionsUnverified:false});
 assert.equal(validateApiaiReferences(model,[{kind:'image',dataUrl:'https://assets.example/first.png'}]).remoteDimensionsUnverified,true);
 for(const dataUrl of [PNG,'file:///private/example.png','https://localhost/first.png','http://127.0.0.1/image.png','https://u:p@assets.example/image.png']){
  assert.throws(()=>validateApiaiReferences(model,[{kind:'image',dataUrl}]),/当前文档仅确认公开图片URL/);
 }
 assert.throws(()=>validateApiaiReferences(model,[{kind:'image',dataUrl:'https://assets.example/a.png'},{kind:'image',dataUrl:'https://assets.example/b.png'}]),/限制为1张/);
});
test('Kling first-frame guard checks actual data size and format plus trusted probe dimensions before a POST',()=>{
 const model=configured(['kling-v1-5']).modelCatalog[0];
 const valid={kind:'image',dataUrl:PNG,mimeType:'image/png',width:300,height:300};
 const checked=validateApiaiReferences(model,[valid]);assert.equal(checked.bytes,Buffer.from(PNG.split(',')[1],'base64').length);
 assert.equal(checked.remoteDimensionsUnverified,false);
 for(const [rows,message] of [
  [[],/恰好1张/],[[valid,valid],/恰好1张/],[[{...valid,kind:'video'}],/恰好1张/],
  [[{...valid,width:299}],/300×300/],[[{...valid,height:299}],/300×300/],[[{...valid,width:undefined}],/探针/],
  [[{...valid,mimeType:'image/webp'}],/格式与实际内容类型不一致/],
  [[{...valid,dataUrl:'data:image/webp;base64,UklGRg==',mimeType:'image/webp'}],/仅支持PNG\/JPEG/],
  [[{...valid,dataUrl:'data:image/png;base64,YWJjZA=='}],/字节与PNG\/JPEG/],
  [[{...valid,dataUrl:'data:image/png;base64,@@@@'}],/仅支持PNG\/JPEG/],
  [[{...valid,dataUrl:'http://assets.example/first.png'}],/公开HTTPS/]
 ])assert.throws(()=>validateApiaiReferences(model,rows),message);
 const large=Buffer.alloc(10_000_001);Buffer.from('89504e470d0a1a0a','hex').copy(large);
 assert.throws(()=>validateApiaiReferences(model,[{...valid,dataUrl:'data:image/png;base64,'+large.toString('base64')}]),/超过10 MB/);
});
test('Kling remote first-frame constraints remain explicitly subject to provider verification with no download',()=>{
 const model=configured(['kling-v2-1']).modelCatalog[0];
 assert.deepEqual(validateApiaiReferences(model,[{kind:'image',dataUrl:'https://assets.example/first.png'}]),{validated:true,count:1,remoteDimensionsUnverified:true});
 assert.throws(()=>validateApiaiReferences(model,[{kind:'image',dataUrl:'https://127.0.0.1/first.png'}]),/公开HTTPS/);
});
test('source evidence stays compact and returned contracts cannot mutate subsequent results',()=>{
 const first=buildApiaiCatalog(['veo3','gpt-image-1']);
 assert.equal(first.evidence.length,2);for(const record of first.evidence)assert.ok(record.sourceUrls.every(url=>url.startsWith('https://')));
 first.modelCatalog[0].request.template.model='changed';first.evidence[0].sourceUrls.push('https://untrusted.invalid');
 const next=buildApiaiCatalog(['veo3','gpt-image-1']);
 assert.equal(next.modelCatalog[0].request.template.model,'{{model}}');assert.equal(next.evidence[0].sourceUrls.includes('https://untrusted.invalid'),false);
 assert.equal(JSON.stringify(next).includes('fixture-only-key'),false);
});

function livePlatform(){
 return {success:true,vendors:[{id:1,name:'OpenAI'},{id:2,name:'Google'},{id:3,name:'ByteDance'}],supported_endpoint:{
  'image-generation':{method:'POST',path:'/v1/images/generations'},'image-edits':{method:'POST',path:'/v1/images/edits'},
  'openai-videos':{method:'POST',path:'/v1/videos'},'查询视频':{method:'GET',path:'/v1/videos/{video_id}'},openai:{method:'POST',path:'/v1/chat/completions'}
 },data:[
  {model_name:'gpt-image-2.5',vendor_id:1,supported_endpoint_types:['image-generation','image-edits']},
  {model_name:'veo3.1',vendor_id:2,supported_endpoint_types:['openai','openai-videos','查询视频'],billing_usage_schema:{seconds:{type:'number',enum:[5,15]},resolution:{enum:['480p','4k']}},billing_usage_examples:[{facts:{seconds:15,resolution:'4k'}}]},
  {model_name:'doubao-seedance-2-0-260128',vendor_id:3,supported_endpoint_types:['openai-videos','查询视频']},
  {model_name:'sora-2',vendor_id:1,supported_endpoint_types:['openai-videos','查询视频']},
  {model_name:'public-only-image',vendor_id:1,supported_endpoint_types:['image-generation']},
  {model_name:'edit-only',vendor_id:1,supported_endpoint_types:['image-edits']},
  {model_name:'chat-only',vendor_id:2,supported_endpoint_types:['openai']},
  {model_name:'unknown-route',vendor_id:2,supported_endpoint_types:['future-video-api']}
 ]};
}
test('current platform metadata overrides legacy Veo routes and intersects both exact account IDs and endpoint bindings',()=>{
 const platformCatalog=livePlatform(),account=['veo3.1','gpt-image-2.5','doubao-seedance-2-0-260128','veo2'];
 const result=buildApiaiCatalog(account,{platformCatalog});
 assert.deepEqual(result.modelCatalog.map(model=>model.id),['gpt-image-2.5','veo3.1','doubao-seedance-2-0-260128']);
 assert.deepEqual(result.models,{image:'gpt-image-2.5',video:'veo3.1'});
 assert.equal(result.modelCatalog.some(model=>model.id==='public-only-image'),false);
 assert.equal(result.modelCatalog.find(model=>model.id==='veo3.1').request.path,'/v1/videos');
 assert.ok(result.modelCatalog.every(model=>!model.request.path.startsWith('/veo/')));
 assert.equal(result.pendingModels.find(model=>model.id==='veo2').code,'not_in_platform_catalog');
});
test('dynamic video descriptors use only the declared shared transport and do not turn billing fields into request controls',()=>{
 const platformCatalog=livePlatform(),cfg=configured(['veo3.1','doubao-seedance-2-0-260128'],{platformCatalog});
 for(const model of cfg.modelCatalog){
  const request=plan(cfg,model.id);assert.equal(request.encoding,'multipart-form-data');
  assert.deepEqual(request.body,{model:model.id,prompt:'fixture cube'});
  assert.deepEqual(model.parameters,{});assert.deepEqual(model.parameterSchema,{});
  assert.deepEqual(model.inputModalities,['text']);assert.equal(model.maxReferences,0);
  assert.equal(request.polling.path,'/v1/videos/{{taskId}}');assert.equal(request.polling.download.path,'/v1/videos/{{taskId}}/content');
  assert.throws(()=>plan(cfg,model.id,{duration:15}),/未映射参数/);
  assert.throws(()=>plan(cfg,model.id,{resolution:'4k'}),/未映射参数/);
  assert.throws(()=>plan(cfg,model.id,{}, {imageUrls:[PNG]}),/超过|未声明图片/);
 }
 const result=buildApiaiCatalog(['veo3.1'],{platformCatalog});
 assert.ok(result.issues.some(issue=>issue.code==='model_specific_video_controls_unverified'));
});
test('dynamic Sora preserves only the documented optional first-frame mapping and leaves ambiguous time variants unset',()=>{
 const cfg=configured(['sora-2'],{platformCatalog:livePlatform()}),request=plan(cfg,'sora-2',{}, {imageUrls:[PNG]});
 assert.deepEqual(request.body,{model:'sora-2',prompt:'fixture cube',input_reference:PNG});
 assert.deepEqual(request.fileFields,['input_reference']);assert.equal(request.body.seconds,undefined);
 assert.deepEqual(cfg.modelCatalog[0].parameterSchema,{});assert.deepEqual(cfg.modelCatalog[0].parameters,{});
 assert.throws(()=>plan(cfg,'sora-2',{duration:4}),/未映射参数/);
});
test('a current video binding actually constructs multipart creation followed by the matching generic query',async()=>{
 const cfg=configured(['veo3.1'],{platformCatalog:livePlatform()}),requests=[];
 const fetch=async(url,options)=>{
  requests.push({url,options});
  if(options.method==='POST'){
   assert.equal(new URL(url).pathname,'/v1/videos');assert.ok(options.body instanceof FormData);
   assert.deepEqual([...options.body.keys()].sort(),['model','prompt']);assert.equal(options.body.get('model'),'veo3.1');
   return new Response(JSON.stringify({id:'platform-task',status:'queued'}),{headers:{'content-type':'application/json'}});
  }
  assert.equal(new URL(url).pathname,'/v1/videos/platform-task');
  return new Response(JSON.stringify({status:'completed',video_url:'https://assets.example/result.mp4'}),{headers:{'content-type':'application/json'}});
 };
 const result=await executeGeneric({fetch},cfg,{kind:'video',model:'veo3.1',prompt:'fixture cube'});
 assert.deepEqual(result.urls,['https://assets.example/result.mp4']);assert.equal(requests.length,2);
});
test('endpoint method and path must both match the declared binding; partial video metadata never falls back',()=>{
 for(const change of [
  catalog=>{catalog.supported_endpoint['openai-videos'].path='/veo/v1/video/create';},
  catalog=>{catalog.supported_endpoint['openai-videos'].method='GET';},
  catalog=>{delete catalog.supported_endpoint['查询视频'];},
  catalog=>{catalog.data.find(row=>row.model_name==='veo3.1').supported_endpoint_types=['openai-videos'];}
 ]){
  const platformCatalog=livePlatform();change(platformCatalog);
  const result=buildApiaiCatalog(['veo3.1'],{platformCatalog});
  assert.deepEqual(result.modelCatalog,[]);assert.deepEqual(result.models,{});assert.equal(result.pendingModels.length,1);
 }
 const platformCatalog=livePlatform();platformCatalog.supported_endpoint['image-generation'].path='https://another.example/generate';
 assert.deepEqual(buildApiaiCatalog(['gpt-image-2.5'],{platformCatalog}).modelCatalog,[]);
});
test('unsuccessful or incomplete live metadata fails closed instead of selecting old documentation contracts',()=>{
 const variants=[null,{}, {...livePlatform(),success:false},{...livePlatform(),data:{}},{...livePlatform(),vendors:undefined},{...livePlatform(),supported_endpoint:undefined}];
 const malformed=livePlatform();malformed.data[0].supported_endpoint_types='image-generation';variants.push(malformed);
 for(const platformCatalog of variants)assert.throws(()=>buildApiaiCatalog(['veo3.1'],{platformCatalog}),/元数据无效|不完整/);
});
test('live supplier evidence includes vendor dictionary aliases, owner fields and multilingual descriptions before sanitization',()=>{
 const platformCatalog=livePlatform();platformCatalog.vendors.push({id:99,name:'Qiniu'});
 const rows=[
  {model_name:'normal-image',vendor_id:1},
  {model_name:'bad-dictionary',vendor_id:99},
  {model_name:'bad-description',description:{en:'A QNAIGC proxy',zh:'别名'}},
  {model_name:'bad-owner',owner_by:'七牛'},
  {model_name:'bad-provider',provider:{display_name:'Qiniu bridge'}},
  {model_name:'bad-available-owner',vendor_id:1}
 ].map(row=>({...row,supported_endpoint_types:['image-generation']}));
 platformCatalog.data.push(...rows);
 const available=rows.map(row=>({id:row.model_name,...(row.model_name==='bad-available-owner'?{owned_by:'qiniu'}:{})}));
 const result=buildApiaiCatalog(available,{platformCatalog});
 assert.deepEqual(result.modelCatalog.map(model=>model.id),['normal-image']);
 assert.equal(result.issues.find(issue=>issue.code==='blocked_supplier_filtered').count,5);
 assert.equal(JSON.stringify(result).includes('QNAIGC'),false);
});
test('a duplicate public row or vendor label cannot erase forbidden supplier evidence',()=>{
 const platformCatalog=livePlatform();platformCatalog.data.push({...platformCatalog.data[0],owner_by:'qiniu'});
 assert.deepEqual(buildApiaiCatalog(['gpt-image-2.5'],{platformCatalog}).modelCatalog,[]);
 const aliases=livePlatform();aliases.vendors.push({id:1,name:'七牛代理'});
 assert.deepEqual(buildApiaiCatalog(['gpt-image-2.5'],{platformCatalog:aliases}).modelCatalog,[]);
});
test('edit-only and unbound IDs remain pending while explicit chat-only bindings do not become media by name',()=>{
 const result=buildApiaiCatalog(['edit-only','unknown-route','chat-only'],{platformCatalog:livePlatform()});
 assert.deepEqual(result.modelCatalog,[]);assert.equal(result.pendingModels.length,2);
 assert.equal(result.pendingModels.find(model=>model.id==='edit-only').code,'image_edit_contract_unavailable');
 assert.equal(result.pendingModels.find(model=>model.id==='unknown-route').code,'platform_endpoint_contract_incomplete');
 assert.equal(result.issues.find(issue=>issue.code==='non_media_filtered').count,1);
});
test('current metadata default selection is stable, retains a valid prior choice, and never grants publicly listed models to an empty account',()=>{
 const platformCatalog=livePlatform(),account=['sora-2','veo3.1','gpt-image-2.5','doubao-seedance-2-0-260128'];
 const first=buildApiaiCatalog(account,{platformCatalog}),second=buildApiaiCatalog([...account].reverse(),{platformCatalog:{...platformCatalog,data:[...platformCatalog.data].reverse()}});
 assert.deepEqual(first.modelCatalog,second.modelCatalog);assert.deepEqual(first.models,second.models);
 const saved=buildApiaiCatalog(account,{platformCatalog,previousModels:{video:'doubao-seedance-2-0-260128'}});
 assert.equal(saved.models.video,'doubao-seedance-2-0-260128');
 const empty=buildApiaiCatalog([],{platformCatalog,previousModels:first.models});
 assert.deepEqual(empty.modelCatalog,[]);assert.deepEqual(empty.models,{});assert.ok(empty.issues.some(issue=>issue.code==='no_supported_media_models'));
});
