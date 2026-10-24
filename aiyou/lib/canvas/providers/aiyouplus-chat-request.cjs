'use strict';
const {assertNetworkAllowed}=require('./aiyouplus-runtime.cjs');
const DEEPSEEK_MODELS=['deepseek-flash','deepseek-v4-pro'];
const DEEPSEEK_CAPABILITIES={
 'deepseek-flash':{inputModalities:['text','image'],outputModalities:['text'],toolCalls:true},
 'deepseek-v4-pro':{inputModalities:['text'],outputModalities:['text'],toolCalls:true},
};
function buildChatPayload(cfg,args,prompt,refs,ctx){
 const messages=args.messages===undefined?[{role:'user',content:refs.imageUrls?.length?[{type:'text',text:prompt},...refs.imageUrls.map(url=>({type:'image_url',image_url:{url}}))]:prompt}]:structuredClone(args.messages);
 if(!Array.isArray(messages)||!messages.length||messages.length>512)throw new Error('对话消息须为1到512条');
 let images=0;
 for(const message of messages){
  if(!message||!['system','user','assistant','tool'].includes(message.role))throw new Error('不支持的对话消息角色');
  if(message.content===null&&message.role==='assistant'&&message.tool_calls?.length)continue;
  if(typeof message.content==='string')continue;
  if(!Array.isArray(message.content))throw new Error('对话消息内容无效');
  for(const part of message.content){
   if(part?.type==='text'&&typeof part.text==='string')continue;
   if(part?.type!=='image_url'||typeof part.image_url?.url!=='string')throw new Error('当前对话输入支持文字和图片；视频请先抽帧，声音请先转写');
   if(cfg.provider==='deepseek'&&(args.model!=='deepseek-flash'||message.role!=='user'))throw new Error('DeepSeek图片理解须使用Flash模型，并把图片放在用户消息中');
   const source=part.image_url.url;images++;
   if(source.startsWith('data:')){
    const match=/^data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=\r\n]+)$/.exec(source);
    if(!match)throw new Error('对话参考图片的base64格式无效');
    const bytes=Buffer.from(match[2],'base64');
    const signature=bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a'||bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff||bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP'||/^GIF8[79]a$/.test(bytes.subarray(0,6).toString());
    if(!signature||!bytes.length||bytes.length>32*1024*1024)throw new Error('对话参考图片损坏或超过32 MiB');
    if(ctx.nativeImage?.createFromBuffer&&ctx.nativeImage.createFromBuffer(bytes).isEmpty())throw new Error('对话参考图片无法解码');
   }else{
    const url=new URL(source);
    if(!['https:','http:'].includes(url.protocol)||source.length>8192)throw new Error('对话参考图片须为有效图片URL或内联原件');
    assertNetworkAllowed(source,false);
   }
  }
 }
 if(images>600)throw new Error('对话参考图片超过600张');
 const payload={model:args.model,messages,stream:false};
 for(const field of ['tools','tool_choice','response_format','max_tokens','temperature','top_p','stop','parallel_tool_calls'])if(args[field]!==undefined)payload[field]=structuredClone(args[field]);
 if(payload.max_tokens!==undefined&&(!Number.isInteger(payload.max_tokens)||payload.max_tokens<1||payload.max_tokens>393216))throw new Error('输出token上限无效');
 if(payload.temperature!==undefined&&(!Number.isFinite(payload.temperature)||payload.temperature<0||payload.temperature>2))throw new Error('temperature须在0到2之间');
 if(payload.tools!==undefined&&(!Array.isArray(payload.tools)||payload.tools.length>128||payload.tools.some(tool=>tool?.type!=='function'||!tool.function?.name)))throw new Error('工具定义无效');
 if(cfg.provider==='deepseek')payload.thinking={type:'disabled'};
 if(Buffer.byteLength(JSON.stringify(payload))>48*1024*1024)throw new Error('对话请求超过48 MiB，请减少参考图片');
 return payload;
}
module.exports={buildChatPayload,DEEPSEEK_MODELS,DEEPSEEK_CAPABILITIES};
