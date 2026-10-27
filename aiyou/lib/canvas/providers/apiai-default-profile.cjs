'use strict';

// Pure, documented contracts for the channel's authenticated catalog. This
// module performs no network requests and never receives or stores a Key.
const APIAI_PRESET=Object.freeze({
  provider:'apiai',name:'APIAI 默认媒体通道',docsUrl:'https://apiai.apifox.cn/',
  baseUrl:'https://www.ggwk1.online',kinds:Object.freeze(['image','video'])
});
const doc=id=>'https://apiai.apifox.cn/api-'+id+'.md';
const BAD_SUPPLIER=/qiniu|qnaigc|qbox\.me|clouddn\.com|qnssl\.com|qiniucdn\.com|七牛/i;
const NON_MEDIA_KINDS=new Set(['chat','text','llm','completion','completions','conversation','embedding','embeddings','rerank','reranker','audio','music','speech','transcription']);
const UNSAFE_IDS=new Set(['__proto__','prototype','constructor']);
const clone=value=>structuredClone(value);
const isObject=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const safeLabel=value=>typeof value==='string'&&value.length<=200&&!/[\x00-\x1f\x7f]/.test(value)&&!BAD_SUPPLIER.test(value)?value:undefined;

function image(id,sources){
  return {
    model:{id,name:id,kind:'image',inputModalities:['text'],maxReferences:0,
      parameters:{},parameterSchema:{size:{type:'string',description:'图片尺寸；该文档未按模型列出完整尺寸枚举。'}},
      request:{method:'POST',path:'/v1/images/generations',template:{model:'{{model}}',prompt:'{{prompt}}',size:'{{parameters.size}}'},optionalFields:['size']},
      response:{urlsPath:'data.*.url',base64Path:'data.*.b64_json'}},
    sources,notes:['本默认合同提供文生图；图片编辑是另一 multipart 接口，未将其冒充文生图的参考输入。']
  };
}
function veo(id){
  return {
    model:{id,name:id,kind:'video',inputModalities:['text','image'],maxReferences:1,referencePurpose:'当前文档仅确认公开图片URL，本机dataURL未核实；客户端保守限制为1张参考图。',
      parameters:{enhance_prompt:false},
      parameterSchema:{enhance_prompt:{type:'boolean',required:true,description:'是否由服务优化提示词；客户端初始为关闭，保持原提示词。'},aspectRatio:{type:'string',enum:['16:9','9:16']}},
      request:{method:'POST',path:'/veo/v1/video/create',template:{model:'{{model}}',prompt:'{{prompt}}',enhance_prompt:'{{parameters.enhance_prompt}}',images:'{{referenceUrls}}',aspect_ratio:'{{aspectRatio}}'},optionalFields:['aspect_ratio']},
      response:{taskIdPath:'id',statusPath:'status'},
      polling:{method:'GET',path:'/veo/v1/video/query?id={{taskId}}',statusPath:'status',urlsPath:'video_url',completedValues:['completed'],failedValues:['failed','video_generation_failed','video_upsampling_failed']}},
    sources:[doc(330393122),doc(330393123)],
    notes:['images 是文档中的必填字符串数组，未选参考图时提交空数组；只映射公开图片URL，本机dataURL未核实。','客户端将参考图保守限制为1张，不将其表述为供应商声明的上限。','enhance_prompt=false 是明确的客户端初始策略，文档未声明服务端默认值。','文档未声明 duration 或 resolution 字段，不传入猜测的时长/清晰度。','供应商文档标为 developing；配置不代表已完成实际生成验收。']
  };
}
function kling(id,imageInput=false){
  const action=imageInput?'image2video':'text2video';
  const template={model_name:'{{model}}',prompt:'{{prompt}}',duration:'{{parameters.duration}}',mode:'{{parameters.mode}}',negative_prompt:'{{parameters.negative_prompt}}',cfg_scale:'{{parameters.cfg_scale}}'};
  const optionalFields=['duration','mode','negative_prompt','cfg_scale'];
  if(imageInput){template.image='{{referenceBase64.0}}';optionalFields.push('prompt');}
  else {template.aspect_ratio='{{aspectRatio}}';optionalFields.push('aspect_ratio');}
  const parameterSchema={duration:{type:'string',enum:['5','10'],description:'秒数须使用接口声明的字符串值。'},mode:{type:'string',enum:['std','pro']},negative_prompt:{type:'string',maxLength:200},cfg_scale:{type:'number',minimum:0,maximum:1}};
  if(!imageInput)parameterSchema.aspectRatio={type:'string',enum:['16:9','9:16','1:1']};
  return {
    model:{id,name:id,kind:'video',inputModalities:imageInput?['text','image']:['text'],maxReferences:imageInput?1:0,
      ...(imageInput?{referencePurpose:'首帧必填：jpg/jpeg/png，单图不超过10 MB，至少300×300。该合同不包含尾帧。'}:{}),parameters:{},parameterSchema,
      request:{method:'POST',path:'/kling/v1/videos/'+action,template,optionalFields},
      response:{taskIdPath:'data.task_id',statusPath:'data.task_status'},
      polling:{method:'GET',path:'/kling/v1/videos/'+action+'/{{taskId}}',statusPath:'data.task_status',urlsPath:'data.task_result.videos.*.url',completedValues:['succeed'],failedValues:['failed']}},
    sources:[doc(imageInput?213098367:213098360),doc(213098466)],
    notes:[imageInput?'只开放一张首帧的图生视频；未声明尾帧能力。':'本默认合同选择文生视频；同名模型的图生接口未混入同一合同。','供应商提示该页面不实时更新，只有实际模型目录仍包含的精确 ID 才加入配置。']
  };
}
function sora(id){
  return {
    model:{id,name:id+'（APIAI 兼容）',kind:'video',inputModalities:['text','image'],maxReferences:1,referencePurpose:'可选一张首帧，作为 input_reference 文件提交。',
      parameters:{duration:4},parameterSchema:{duration:{type:'integer',enum:[4,8,12],description:'DSH使用整数秒，multipart传输层将其映射为接口seconds字符串；未混用逆向通道的10/15/25秒。'},size:{type:'string',enum:['720x1280','1280x720','1024x1792','1792x1024']}},
      request:{method:'POST',path:'/v1/videos',encoding:'multipart-form-data',fileFields:['input_reference'],template:{model:'{{model}}',prompt:'{{prompt}}',seconds:'{{duration}}',size:'{{parameters.size}}',input_reference:'{{firstFrame}}'},optionalFields:['size','input_reference']},
      response:{taskIdPath:'id',statusPath:'status'},
      polling:{method:'GET',path:'/v1/videos/{{taskId}}',statusPath:'status',urlsPath:'video_url',completedValues:['completed'],failedValues:['failed'],download:{method:'GET',path:'/v1/videos/{{taskId}}/content',mimeType:'video/mp4'}}},
    sources:[doc(358244464),doc(358250902),doc(358250948),'https://developers.openai.com/api/reference/resources/videos/methods/retrieve'],
    notes:['这是 APIAI 文档的同名兼容合同，不代表 OpenAI 官方仍提供 Sora。OpenAI 官方文档记录其 Videos API 已于2026-09-24下线。','只在账号实际目录含精确 ID 时配置；供应商实际路由/秒数支持仍待真实生成验收。','查询页 schema 未列 video_url，下载页正文声明可能返回；未返回地址时仅在任务完成后同源鉴权下载 content。']
  };
}

// Fixed source order makes selection independent of the remote catalog order.
// Complete JSON video contracts precede the channel's Sora-compatible route.
const DECLARATIONS=[
  image('gpt-image-1',[doc(162417546)]),image('gpt-image-2',[doc(162417546)]),
  image('flux-pro-1.1',[doc(207768493),doc(162417546)]),image('recraftv3',[doc(229357434),doc(162417546)]),
  ...['veo2','veo2-fast','veo2-fast-frames','veo2-fast-components','veo2-pro','veo3','veo3-fast','veo3-pro','veo3-pro-frames','veo3.1','veo3.1-pro'].map(veo),
  ...['kling-v1','kling-v1-6','kling-v2-master','kling-v2-1-master'].map(id=>kling(id)),
  ...['kling-v1-5','kling-v2-1'].map(id=>kling(id,true)),
  sora('sora-2'),sora('sora-2-pro')
];
const DECLARED_IDS=new Set(DECLARATIONS.map(item=>item.model.id));
const INCOMPLETE=new Map([
  ['video-01',{reason:'需要 file_id 后的文件解析阶段；当前文档未提供最终文件结果字段，未自动启用。',sources:[doc(237512852),doc(237512855),doc(237514175)]}],
  ['image-01',{reason:'图片文档未提供图片结果或对应查询映射，未自动启用。',sources:[doc(301420300)]}],
  ['doubao-seaweed',{reason:'创建响应缺少任务编号字段，且未声明现代 Seedance 模型与参数，未自动启用。',sources:[doc(302328089),doc(302353375)]}]
]);

function validModelId(id){return typeof id==='string'&&id.length>0&&id.length<=200&&id===id.trim()&&!/[\x00-\x20\x7f{}]/.test(id)&&!id.includes('${')&&!UNSAFE_IDS.has(id);}
function forbiddenSupplier(value,depth=0){
  if(typeof value==='string')return BAD_SUPPLIER.test(value);
  if(depth>4||value===null||typeof value!=='object')return false;
  return Object.entries(value).some(([key,item])=>BAD_SUPPLIER.test(key)||forbiddenSupplier(item,depth+1));
}
function forbiddenRow(raw,vendor){return [raw.id,raw.model_name,raw.name,raw.owned_by,raw.owner_by,raw.owner,raw.provider,raw.vendor,raw.description,vendor].some(value=>forbiddenSupplier(value));}
function readAvailable(availableRows){
  if(!Array.isArray(availableRows)||availableRows.length>10000)throw new TypeError('APIAI 模型目录须为最多10000项的数组');
  const available=new Map();let invalid=0;
  for(const row of availableRows){
    const raw=typeof row==='string'?{id:row}:row;
    if(!isObject(raw)||!validModelId(raw.id)){invalid++;continue;}
    const id=raw.id,old=available.get(id);
    const forbidden=forbiddenRow(raw);
    const nonMediaKind=[raw.kind,raw.type,raw.modality,raw.task].some(value=>typeof value==='string'&&NON_MEDIA_KINDS.has(value.toLowerCase()));
    available.set(id,{id,name:safeLabel(raw.name)||safeLabel(raw.display_name)||id,blocked:Boolean(old?.blocked||forbidden),nonMedia:Boolean(old?.nonMedia||nonMediaKind)});
  }
  return {available,invalid};
}
function buildApiaiCatalog(availableRows,{previousModels={},platformCatalog}={}){
  if(platformCatalog!==undefined)return buildPlatformCatalog(availableRows,{previousModels,platformCatalog});
  const {available,invalid}=readAvailable(availableRows),issues=[],pendingModels=[],evidence=[];
  let blocked=0,nonMedia=0;
  const modelCatalog=[];
  for(const declaration of DECLARATIONS){
    const row=available.get(declaration.model.id);
    if(!row||row.blocked||row.nonMedia)continue;
    const model=clone(declaration.model);modelCatalog.push(model);
    evidence.push({id:model.id,kind:model.kind,sourceUrls:[...declaration.sources],notes:[...declaration.notes]});
    if(model.id==='sora-2'||model.id==='sora-2-pro')issues.push({code:'third_party_sora_compatibility',modelId:model.id,message:'已按 APIAI 同名兼容合同配置；OpenAI 官方 Videos API 已下线，不能据此声称官方服务可用。'});
  }
  for(const row of available.values()){
    if(row.blocked){blocked++;continue;}
    if(row.nonMedia){nonMedia++;continue;}
    if(DECLARED_IDS.has(row.id))continue;
    const incomplete=INCOMPLETE.get(row.id);
    pendingModels.push({id:row.id,name:row.name,reason:incomplete?.reason||'模型目录仅证明 ID 可见，尚无该精确 ID 的图片/视频调用合同，保留待识别。',code:incomplete?'incomplete_documented_contract':'unmapped_model_id',...(incomplete?{sourceUrls:[...incomplete.sources]}:{})});
  }
  const models={};
  for(const kind of APIAI_PRESET.kinds){
    const rows=modelCatalog.filter(model=>model.kind===kind);
    if(rows.length)models[kind]=rows.some(model=>model.id===previousModels?.[kind])?previousModels[kind]:rows[0].id;
  }
  if(!modelCatalog.length)issues.push({code:'no_supported_media_models',message:'本次目录中没有可闭合配置的图片或视频模型；保留原配置，不用猜测合同覆盖。'});
  if(pendingModels.length)issues.push({code:'pending_model_contracts',count:pendingModels.length,message:'部分模型缺少精确调用合同，已列入待识别。'});
  if(blocked)issues.push({code:'blocked_supplier_filtered',count:blocked,message:'已过滤禁用供应商目录项。'});
  if(nonMedia)issues.push({code:'non_media_filtered',count:nonMedia,message:'已过滤明确标注为对话或其他非图片/视频类型的目录项。'});
  if(invalid)issues.push({code:'invalid_catalog_rows',count:invalid,message:'已忽略无效模型目录项。'});
  return {modelCatalog,models,pendingModels,issues,evidence};
}

function platformVideo(id){
  const knownSora=id==='sora-2'||id==='sora-2-pro';
  return {id,name:knownSora?id+'（APIAI 兼容）':id,kind:'video',inputModalities:knownSora?['text','image']:['text'],maxReferences:knownSora?1:0,
    ...(knownSora?{referencePurpose:'文档允许一张可选首帧，作为 input_reference 文件提交；不推断其他模型的参考能力。'}:{}),
    parameters:{},parameterSchema:{},
    request:{method:'POST',path:'/v1/videos',encoding:'multipart-form-data',template:{model:'{{model}}',prompt:'{{prompt}}',...(knownSora?{input_reference:'{{firstFrame}}'}:{})},...(knownSora?{fileFields:['input_reference'],optionalFields:['input_reference']}:{})},
    response:{taskIdPath:'id',statusPath:'status'},
    polling:{method:'GET',path:'/v1/videos/{{taskId}}',statusPath:'status',urlsPath:'video_url',completedValues:['completed'],failedValues:['failed'],download:{method:'GET',path:'/v1/videos/{{taskId}}/content',mimeType:'video/mp4'}}};
}
function buildPlatformCatalog(availableRows,{previousModels,platformCatalog}){
  const {available,invalid}=readAvailable(availableRows);
  if(!isObject(platformCatalog)||platformCatalog.success!==true||!Array.isArray(platformCatalog.data)||platformCatalog.data.length>10000||!isObject(platformCatalog.supported_endpoint)||!Array.isArray(platformCatalog.vendors)||platformCatalog.vendors.length>1000)throw new TypeError('APIAI 公开模型能力元数据无效，未回退到旧文档路由');
  const endpointMap=platformCatalog.supported_endpoint,vendors=new Map(),published=new Map();
  for(const vendor of platformCatalog.vendors){
    if(!isObject(vendor)||!['string','number'].includes(typeof vendor.id)||typeof vendor.name!=='string'||!vendor.name.trim()||vendor.name.length>500)throw new TypeError('APIAI 公开供应商字典不完整，未自动配置');
    const key=String(vendor.id);vendors.set(key,[...(vendors.get(key)||[]),vendor]);
  }
  for(const raw of platformCatalog.data){
    if(!isObject(raw)||!validModelId(raw.model_name)||!Array.isArray(raw.supported_endpoint_types)||raw.supported_endpoint_types.some(type=>typeof type!=='string'||!type||type.length>100))throw new TypeError('APIAI 公开模型与端点绑定不完整，未自动配置');
    const id=raw.model_name,old=published.get(id),blocked=forbiddenRow(raw,vendors.get(String(raw.vendor_id)));
    published.set(id,{id,types:new Set([...(old?.types||[]),...raw.supported_endpoint_types]),blocked:Boolean(old?.blocked||blocked)});
  }
  const matches=(key,method,path)=>{const row=endpointMap[key];return isObject(row)&&typeof row.method==='string'&&row.method.toUpperCase()===method&&row.path===path;};
  const imageEndpoint=matches('image-generation','POST','/v1/images/generations');
  const videoEndpoint=matches('openai-videos','POST','/v1/videos')&&matches('查询视频','GET','/v1/videos/{video_id}');
  const source=APIAI_PRESET.baseUrl+'/api/pricing',modelCatalog=[],pendingModels=[],issues=[],evidence=[];
  let blocked=0,nonMedia=0;
  for(const row of available.values()){
    const metadata=published.get(row.id);
    if(row.blocked||metadata?.blocked){blocked++;continue;}
    if(row.nonMedia){nonMedia++;continue;}
    if(!metadata){pendingModels.push({id:row.id,name:row.name,code:'not_in_platform_catalog',reason:'账号目录包含该ID，但公开元数据未声明对应的图片/视频端点，未使用旧文档猜测。',sourceUrls:[source]});continue;}
    let configured=false;
    if(metadata.types.has('image-generation')&&imageEndpoint){
      const record=image(row.id,[source,doc(162417546)]);modelCatalog.push(record.model);configured=true;
      evidence.push({id:row.id,kind:'image',sourceUrls:record.sources,notes:[...record.notes,'图片生成路径来自当前站点的精确端点绑定，并与账号可用ID取交集；未把计费字段当请求参数。']});
    }
    if(metadata.types.has('openai-videos')&&metadata.types.has('查询视频')&&videoEndpoint){
      const model=platformVideo(row.id);modelCatalog.push(model);configured=true;
      evidence.push({id:row.id,kind:'video',sourceUrls:[source,doc(358244464),doc(358250902),doc(358250948)],notes:['使用站点明确声明的 /v1/videos 基础multipart创建和对应查询，未因模型名称切换到旧Veo或其他路由。','仅配置model与prompt；未将计费字段推断成时长、清晰度或参考参数。',...(model.inputModalities.includes('image')?['该精确Sora兼容ID的文档声明可选input_reference；其他视频模型未继承参考能力。']:['此默认合同仅开放文生视频，参考输入尚无该模型的明确合同。'])]});
      issues.push({code:'model_specific_video_controls_unverified',modelId:row.id,message:'已配置基础视频创建和查询；该通道的模型级时长、清晰度等控制未确认，由服务端决定，不以计费示例猜测参数。'});
      if(row.id==='sora-2'||row.id==='sora-2-pro')issues.push({code:'third_party_sora_compatibility',modelId:row.id,message:'这是站点声明的Sora同名兼容通道，不代表已下线的OpenAI官方Videos API仍可用。'});
    }
    if(configured)continue;
    const onlyChat=metadata.types.size>0&&[...metadata.types].every(type=>['openai','openai-response','anthropic','gemini'].includes(type));
    if(onlyChat){nonMedia++;continue;}
    const editOnly=metadata.types.has('image-edits')&&!metadata.types.has('image-generation');
    pendingModels.push({id:row.id,name:row.name,code:editOnly?'image_edit_contract_unavailable':'platform_endpoint_contract_incomplete',reason:editOnly?'站点仅声明图片编辑接口，未用文生图接口冒充编辑能力。':'站点的模型端点绑定与已核对的图片/视频创建及查询合同不完整或不一致，保留待识别。',sourceUrls:[source]});
  }
  const rank=new Map(DECLARATIONS.map((item,index)=>[item.model.id,index]));
  const order=model=>model.kind==='video'&&['sora-2','sora-2-pro'].includes(model.id)?100000:rank.get(model.id)??10000;
  modelCatalog.sort((a,b)=>APIAI_PRESET.kinds.indexOf(a.kind)-APIAI_PRESET.kinds.indexOf(b.kind)||order(a)-order(b)||a.id.localeCompare(b.id,'en'));
  const models={};
  for(const kind of APIAI_PRESET.kinds){const rows=modelCatalog.filter(model=>model.kind===kind);if(rows.length)models[kind]=rows.some(model=>model.id===previousModels?.[kind])?previousModels[kind]:rows[0].id;}
  if(!modelCatalog.length)issues.push({code:'no_supported_media_models',message:'账号目录与当前站点的可核对媒体端点没有交集，保留原配置。'});
  if(pendingModels.length)issues.push({code:'pending_model_contracts',count:pendingModels.length,message:'部分模型没有完整的当前站点端点合同，已列入待识别。'});
  if(blocked)issues.push({code:'blocked_supplier_filtered',count:blocked,message:'已过滤账号目录、公开模型资料或供应商字典中的禁用供应商项。'});
  if(nonMedia)issues.push({code:'non_media_filtered',count:nonMedia,message:'已过滤明确非媒体类型或只绑定对话接口的目录项。'});
  if(invalid)issues.push({code:'invalid_catalog_rows',count:invalid,message:'已忽略无效账号模型目录项。'});
  return {modelCatalog,models,pendingModels,issues,evidence};
}

const invalidReference=message=>{const error=new Error(message);error.code='INVALID_REFERENCE';throw error;};
function publicImageUrl(value,{httpsOnly=false}={}){
  let url;try{url=new URL(value);}catch{return false;}
  if(!(httpsOnly?url.protocol==='https:':['http:','https:'].includes(url.protocol))||url.username||url.password||BAD_SUPPLIER.test(url.hostname))return false;
  const host=url.hostname.toLowerCase().replace(/\.$/,'').replace(/^\[|\]$/g,'');
  if(host==='localhost'||host.endsWith('.localhost')||host.endsWith('.local')||host==='::'||host==='::1'||/^(?:fc|fd|fe[89ab])/i.test(host)&&host.includes(':'))return false;
  const ip=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.exec(host);
  if(ip){const [a,b]=ip.slice(1).map(Number);if(a===0||a===10||a===127||a===169&&b===254||a===172&&b>=16&&b<=31||a===192&&b===168)return false;}
  return true;
}
function referenceRows(refs){
  if(Array.isArray(refs))return refs;
  if(isObject(refs)&&Array.isArray(refs.referenceMedia))return refs.referenceMedia;
  if(isObject(refs)&&Array.isArray(refs.imageUrls))return refs.imageUrls.map(dataUrl=>({kind:'image',dataUrl}));
  if(refs===undefined||refs===null)return [];
  invalidReference('参考素材列表无效，未提交生成。');
}
function validateApiaiReferences(model,refs){
  const rows=referenceRows(refs),path=model?.request?.path||'';
  if(path==='/veo/v1/video/create'){
    if(rows.length>1)invalidReference('当前 Veo 合同保守限制为1张参考图片，未提交生成。');
    for(const row of rows)if(row?.kind!=='image'||typeof row.dataUrl!=='string'||!publicImageUrl(row.dataUrl))invalidReference('当前文档仅确认公开图片URL，本机dataURL未核实，未提交生成。');
    return {validated:true,count:rows.length,remoteDimensionsUnverified:rows.length>0};
  }
  if(path!=='/kling/v1/videos/image2video')return {validated:true,count:rows.length};
  if(rows.length!==1||rows[0]?.kind!=='image')invalidReference('可灵图生视频需要恰好1张首帧图片，未提交生成。');
  const row=rows[0],value=row.dataUrl;
  if(typeof value!=='string')invalidReference('可灵首帧图片内容无效，未提交生成。');
  if(publicImageUrl(value,{httpsOnly:true}))return {validated:true,count:1,remoteDimensionsUnverified:true};
  const match=/^data:(image\/(?:png|jpe?g));base64,([A-Za-z0-9+/]*={0,2})$/i.exec(value);
  if(!match)invalidReference('可灵首帧仅支持PNG/JPEG本地图片或公开HTTPS图片URL，未提交生成。');
  // The probe metadata comes from DSH's authorized original, while byte size
  // and signature are checked against the actual embedded content, not a hint.
  const headerMime=match[1].toLowerCase().replace('image/jpg','image/jpeg');
  const metadataMime=typeof row.mimeType==='string'?row.mimeType.toLowerCase().replace('image/jpg','image/jpeg'):'';
  if(metadataMime!==headerMime)invalidReference('可灵首帧图片的探针格式与实际内容类型不一致，未提交生成。');
  const encoded=match[2];
  if(encoded.length>Math.ceil(10_000_000/3)*4)invalidReference('可灵首帧图片不能超过10 MB，未提交生成。');
  const bytes=Buffer.from(encoded,'base64');
  if(!bytes.length||bytes.toString('base64')!==encoded)invalidReference('可灵首帧图片Base64内容无效，未提交生成。');
  if(bytes.length>10_000_000)invalidReference('可灵首帧图片不能超过10 MB，未提交生成。');
  const isPng=bytes.length>=8&&bytes.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex'));
  const isJpeg=bytes.length>=3&&bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff;
  if(headerMime==='image/png'&&!isPng||headerMime==='image/jpeg'&&!isJpeg)invalidReference('可灵首帧图片字节与PNG/JPEG格式不符，未提交生成。');
  if(!Number.isInteger(row.width)||!Number.isInteger(row.height)||row.width<300||row.height<300)invalidReference('可灵首帧图片至少需要300×300，且须有有效的本地图片探针信息，未提交生成。');
  return {validated:true,count:1,bytes:bytes.length,remoteDimensionsUnverified:false};
}

module.exports={APIAI_PRESET,buildApiaiCatalog,validateApiaiReferences};
