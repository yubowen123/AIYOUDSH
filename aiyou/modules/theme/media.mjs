import {readFile,realpath,stat} from 'node:fs/promises';
import {dirname,extname,resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {BACKGROUNDS} from './backgrounds.js';

const ASSETS=resolve(dirname(fileURLToPath(import.meta.url)),'assets');
const LIMIT=10*1024*1024;
const MIME={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.webm':'video/webm'};
const fail=(message,status=400)=>Object.assign(new Error(message),{status});

/** No arbitrary paths, remote URLs, file URLs, traversal or symlink escapes. */
export async function readBackground(id,userRoot,userTheme,slot='poster') {
  if (!/^[a-z][a-z0-9-]{1,60}$/u.test(id||'')) throw fail('主题标识无效');
  let root,file;
  if(!['poster','loop'].includes(slot))throw fail('未知背景槽位',404);
  if (userTheme) {
    if(slot!=='poster')throw fail('用户主题未声明视频',404);
    root=resolve(userRoot,id,'assets');file=userTheme.background?.file;
    if(typeof file!=='string'||!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,100}\.(?:png|jpe?g|webp)$/u.test(file))throw fail('本地背景须声明 assets 内的 PNG/JPEG/WebP 文件名');
  } else {
    root=ASSETS;file=slot==='loop'&&id==='mecha-control'?'mecha-control-loop.mp4':slot==='poster'?BACKGROUNDS[id]?.file:null;
    if(!file)throw fail('未知背景',404);
  }
  let actualRoot,actual;
  try {actualRoot=await realpath(root);actual=await realpath(resolve(root,file));}catch {throw fail('背景文件不存在',404);}
  if(userTheme){const ownerRoot=await realpath(userRoot);if(!actualRoot.startsWith(ownerRoot+sep))throw fail('背景目录超出本地主题目录',403);}
  if(!actual.startsWith(actualRoot+sep))throw fail('背景文件超出主题目录',403);
  const size=await stat(actual);if(!size.isFile()||size.size>LIMIT)throw fail('背景文件超过 10 MB 或不是普通文件',413);
  const bytes=await readFile(actual);if(bytes.length>LIMIT)throw fail('背景文件超过 10 MB',413);
  const extension=extname(file).toLowerCase(),mime=MIME[extension];
  if(!mime)throw fail('不支持的背景格式');
  if(extension==='.png'&&!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw fail('PNG 文件内容无效');
  if(['.jpg','.jpeg'].includes(extension)&&!(bytes[0]===255&&bytes[1]===216&&bytes[2]===255))throw fail('JPEG 文件内容无效');
  if(extension==='.webp'&&!(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP'))throw fail('WebP 文件内容无效');
  if(extension==='.mp4'&&bytes.toString('ascii',4,8)!=='ftyp')throw fail('MP4 文件内容无效');
  if(extension==='.webm'&&!bytes.subarray(0,4).equals(Buffer.from([26,69,223,163])))throw fail('WebM 文件内容无效');
  return {bytes,mime};
}

export function mediaResponse(media,range,head=false){
 const size=media.bytes.length,headers={'content-type':media.mime,'content-length':String(size),'cache-control':'private, no-store','accept-ranges':'bytes','x-content-type-options':'nosniff','content-security-policy':"default-src 'none'; sandbox"};
 if(!range)return {status:200,headers,body:head?undefined:media.bytes};
 const match=/^bytes=(\d*)-(\d*)$/u.exec(String(range));let start,end;
 if(match&&(match[1]||match[2])){
  if(match[1]){start=Number(match[1]);end=match[2]?Math.min(Number(match[2]),size-1):size-1;}
  else{start=Math.max(0,size-Number(match[2]));end=size-1;}
 }
 if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<0||start>=size||end<start){return {status:416,headers:{...headers,'content-length':'0','content-range':`bytes */${size}`},body:undefined};}
 headers['content-range']=`bytes ${start}-${end}/${size}`;headers['content-length']=String(end-start+1);
 return {status:206,headers,body:head?undefined:media.bytes.subarray(start,end+1)};
}
