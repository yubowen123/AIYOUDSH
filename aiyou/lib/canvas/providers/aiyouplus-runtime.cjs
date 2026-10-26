'use strict';
// Node Host policy seam. No Electron globals or process-wide network patches.
const BLOCKED=/qiniu|qnaigc|qiniucdn|qiniudn|qiniucs|qiniup|qiniuapi|qnqcdn|qbox\.me|clouddn\.com|qnssl\.com|七牛/i;
function isLoopbackUrl(value){try{const h=new URL(String(value)).hostname;return h==='localhost'||h==='[::1]'||/^127\.\d+\.\d+\.\d+$/.test(h);}catch{return false;}}
function assertNetworkAllowed(value,offline=false){
 const u=new URL(String(value?.url||value));
 if(!['https:','http:'].includes(u.protocol)||u.username||u.password||BLOCKED.test(u.href))throw new Error('模型地址无效或属于已禁用供应商');
 if(u.protocol==='http:'&&!isLoopbackUrl(u))throw new Error('远程模型接口必须使用HTTPS');
 if(offline&&!isLoopbackUrl(u))throw new Error('离线模式不请求外部模型服务');
}
module.exports={assertNetworkAllowed,isLoopbackUrl};
