'use strict';
const YAML=require('../../../vendor/yaml/dist/index.js');
const BAD=/qiniu|qnaigc|七牛/i;
const KIND={text:'chat',chat:'chat',llm:'chat',image:'image',video:'video',tts:'audio',speech:'audio',music:'music'};
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o||{},k);
const object=o=>o&&typeof o==='object'&&!Array.isArray(o);
function inert(value,depth=0,budget={n:0}){
  if(depth>70||++budget.n>200000)throw Error('公开文档结构超过解析预算');
  if(value&&typeof value==='object')for(const [key,item]of Object.entries(value)){
    if(['__proto__','prototype','constructor'].includes(key))throw Error('公开文档包含不安全对象字段');
    inert(item,depth+1,budget);
  }
  return value;
}
function parseDocument(text){
  let parsed;
  try{parsed=JSON.parse(text);}catch{
    if(!/^\s*(?:openapi|swagger)\s*:/m.test(text))return null;
    const doc=YAML.parseDocument(text,{version:'1.2',schema:'core',merge:false,uniqueKeys:true,customTags:[]});
    if(doc.errors.length||doc.warnings.length)throw Error('YAML文档含重复键、未知标签或不安全结构');
    parsed=doc.toJS({maxAliasCount:0});
  }
  return inert(parsed);
}
function structuredLinks(parsed,url){
  if(!object(parsed))return {links:[],manifest:false};
  const links=[],push=value=>{if(typeof value==='string'&&value.trim())try{links.push(new URL(value,url).href);}catch{}};
  const discovery=object(parsed.discovery)?parsed.discovery:{};
  const manifest=Boolean(parsed.documentation||Object.keys(discovery).some(k=>/^(?:openapi|swagger|models_json|llms_txt|llms_full_txt)$/.test(k)));
  // Contracts and typed catalogs precede broad human documentation.
  for(const key of ['openapi','swagger','models_json','llms_txt'])push(discovery[key]);
  if(typeof parsed.documentation==='string')push(parsed.documentation);
  else if(object(parsed.documentation))for(const key of ['openapi','swagger','url','llms_txt','models_json'])push(parsed.documentation[key]);
  push(discovery.llms_full_txt);
  if(object(parsed.categories)&&object(parsed.endpoints))push(parsed.endpoints.list);
  if(object(parsed.links))for(const key of ['openapi','models','models_json','llms'])push(parsed.links[key]);
  return {links:[...new Set(links)],manifest};
}
const operationKind=operation=>({
  'text-to-image':'image','image-to-image':'image','image-edit':'image',
  'text-to-video':'video','image-to-video':'video','reference-to-video':'video','video-to-video':'video',
  tts:'audio','text-to-speech':'audio',speech:'audio',music:'music','text-to-music':'music',
  chat:'chat','chat-completions':'chat',
})[String(operation).toLowerCase()];
function modelMetadata(row){
  const nested=Object.values(row||{}).find(value=>object(value)&&(value.category||value.public_contract_summary||value.request_format_summary));
  return {...row,...(nested||{})};
}
function catalogModels(parsed,url){
  if(!object(parsed)&&!Array.isArray(parsed))return [];
  const rows=[],base=parsed.base_url||parsed.api_base_url||new URL(url).origin;
  const endpointFormats=parsed.endpoints?.native_formats||[];
  const categoryEndpoint=kind=>endpointFormats.find(row=>({images:'image',videos:'video',audio_speech:'audio',chat_completions:'chat',music:'music'})[row.id]===kind&&row.method==='POST')?.path;
  const append=(row,category,endpoint)=>{
    if(typeof row==='string')row={id:row};if(!object(row)||typeof row.id!=='string'||!row.id.trim()||row.id.length>160)return;
    const meta=modelMetadata(row),contract=meta.public_contract_summary||meta.request_format_summary||{},operations=contract.public_operations||meta.capabilities||meta.operations||[];
    const explicitKind=String(meta.kind||meta.category||meta.type||category||'').toLowerCase();
    const kinds=[...new Set((Array.isArray(operations)?operations:[]).map(operationKind).filter(Boolean))];
    let kind=KIND[explicitKind]||(['image','video','chat','music'].includes(explicitKind)?explicitKind:null);
    if(explicitKind==='audio')kind=kinds.length===1?kinds[0]:null;
    if(!kind&&kinds.length===1&&!['stt','embedding','rerank','translation','3d','decision'].includes(explicitKind))kind=kinds[0];
    if(!kind)return;
    const lifecycle=meta.lifecycle?.stage||row.lifecycle?.stage||'';
    const providers=[meta.provider,meta.providers,row.owned_by,meta.supplier].flat().filter(value=>typeof value==='string').join(' ');
    const paths=contract.request_endpoint_by_operation||meta.request_endpoint_by_operation||{};
    const endpoints=[...new Set([contract.request_endpoint,meta.request_endpoint,meta.endpoint,endpoint,...Object.entries(paths).filter(([operation])=>operationKind(operation)===kind).map(([,value])=>value)].filter(value=>typeof value==='string'))];
    rows.push({id:row.id.trim(),name:row.name||row.id,kind,endpoints,operations:Array.isArray(operations)?operations.filter(x=>typeof x==='string'):[],baseUrl:base,url,lifecycle,blocked:BAD.test(providers+' '+row.id+' '+(row.name||'')),metadata:meta});
  };
  for(const row of Array.isArray(parsed)?parsed:Array.isArray(parsed.data)?parsed.data:Array.isArray(parsed.models)?parsed.models:parsed.id?[parsed]:[])append(row);
  for(const [category,group]of Object.entries(parsed.categories||{})){
    if(!object(group))continue;
    const kind=KIND[category];
    if(kind)for(const row of group.models||[])append(row,category,categoryEndpoint(kind));
    for(const [subcategory,subgroup]of Object.entries(group.subcategories||{})){
      const subkind=KIND[subcategory];if(subkind)for(const row of subgroup.models||[])append(row,subcategory,categoryEndpoint(subkind));
    }
  }
  return rows;
}
function mergeCatalogs(documents){
  const rows=new Map();
  for(const doc of documents)for(const row of catalogModels(doc.parsed,doc.url)){
    const key=new URL(row.baseUrl,doc.url).origin+'\0'+row.kind+'\0'+row.id,previous=rows.get(key);
    if(!previous){rows.set(key,row);continue;}
    const richer=row.operations.length||row.lifecycle||Object.keys(row.metadata).length>Object.keys(previous.metadata).length?row:previous;
    rows.set(key,{...richer,endpoints:[...new Set([...previous.endpoints,...row.endpoints])],operations:[...new Set([...previous.operations,...row.operations])],blocked:previous.blocked||row.blocked});
  }
  return [...rows.values()];
}
module.exports={parseDocument,structuredLinks,mergeCatalogs};
