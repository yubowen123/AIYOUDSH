import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const stateRoot = () => join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'aiyou-enhancer');
const writes = new Map();
export function json(res, code, payload) {
  res.writeHead(code, {'content-type':'application/json; charset=utf-8','cache-control':'no-store'});
  res.end(JSON.stringify(payload));
}
export async function readJson(name, fallback) {
  try { return JSON.parse(await readFile(join(stateRoot(), name), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return structuredClone(fallback); throw error; }
}
export function mutateJson(name, fallback, mutate) {
  const previous = writes.get(name) || Promise.resolve();
  const pending = previous.catch(() => {}).then(async () => {
    const current = await readJson(name, fallback);
    const next = await mutate(current);
    await mkdir(stateRoot(), {recursive:true});
    const file = join(stateRoot(), name);
    const temporary = `${file}.${process.pid}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporary, JSON.stringify(next,null,2)+'\n', {mode:0o600});
    await rename(temporary,file);
    return next;
  });
  writes.set(name,pending);
  return pending.finally(() => { if(writes.get(name)===pending) writes.delete(name); });
}
export async function body(req, limit=1024*1024) {
  let size=0; const chunks=[];
  for await (const chunk of req) { size+=chunk.length; if(size>limit) throw Object.assign(new Error('请求内容过大'),{status:413}); chunks.push(chunk); }
  const raw=Buffer.concat(chunks).toString('utf8');
  try { return raw ? JSON.parse(raw) : {}; } catch { throw Object.assign(new Error('JSON 格式无效'),{status:400}); }
}
export function fail(message,status=400) { throw Object.assign(new Error(message),{status}); }
export function text(value,max=4000) { return typeof value==='string' ? value.trim().slice(0,max) : ''; }
export function route(ctx,path,handler,kind='exact') {
  ctx.inject(['webServer'], webCtx => webCtx.effect(() => webCtx.webServer.register({kind,path,handler:async(req,res)=>{
    if(req.method==='OPTIONS') {res.writeHead(204);res.end();return;}
    try { await handler(req,res,new URL(req.url || path,'http://dsh.internal')); }
    catch(error) {if(!res.headersSent)json(res,error.status || 500,{error:error.message || String(error)});else res.destroy(error);}
  }}),'aiyou:'+path));
}
export function requirePost(req) { if(req.method!=='POST') fail('此操作需要 POST',405); }
/** Use the installed application's signed-cookie and Host/Origin fence for every feature route. */
export function guardContext(ctx) {
  return new Proxy(ctx,{get(target,key){
    if(key==='inject') return (services,callback,...rest)=>target.inject([...new Set([...services,'connection'])],scoped=>callback(guardContext(scoped)),...rest);
    if(key==='webServer') {
      const server=Reflect.get(target,key,target);
      return new Proxy(server,{get(service,property){
        if(property!=='register') {const value=Reflect.get(service,property,service);return typeof value==='function'?value.bind(service):value;}
        return definition=>service.register({...definition,handler:async(req,res)=>{
          const connection=typeof target.get==='function'?target.get('connection'):target.connection;
          if(typeof connection?.requestRejection!=='function'){json(res,503,{error:'宿主认证服务未就绪'});return;}
          const rejection=connection.requestRejection(req);
          if(rejection!==undefined){json(res,rejection,{error:rejection===401?'请先登录当前应用':'请求来源不受信任'});return;}
          if(!['GET','HEAD','OPTIONS'].includes(req.method)&&!(/^(?:application\/json|multipart\/form-data|application\/octet-stream)(?:;|$)/iu.test(String(req.headers['content-type']||'')))){json(res,415,{error:'写操作仅接受 application/json'});return;}
          await definition.handler(req,res);
        }});
      }});
    }
    const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
  }});
}
