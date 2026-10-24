import {createHash,randomUUID} from 'node:crypto';
import {mkdir,readFile,writeFile,rename,realpath} from 'node:fs/promises';
import {join,resolve} from 'node:path';
export class CanvasError extends Error { constructor(code,message,status=409){super(message);this.code=code;this.status=status;} }
export function createProjectStore({rootDir}) {
 const root=resolve(rootDir), projects=new Map(), bindings=new Map();let writes=Promise.resolve();
 const ready=readFile(join(root,'projects.json'),'utf8').then(JSON.parse).then(data=>{for(const p of data.projects||[])projects.set(p.id,p);for(const b of data.bindings||[])bindings.set(b.sessionId,b.projectId);}).catch(e=>{if(e.code!=='ENOENT')throw e;});
 function persist(){const data=JSON.stringify({schema:1,projects:[...projects.values()],bindings:[...bindings].map(([sessionId,projectId])=>({sessionId,projectId}))},null,2);writes=writes.catch(()=>{}).then(async()=>{await mkdir(root,{recursive:true});const file=join(root,'projects.json'),tmp=file+'.'+randomUUID()+'.tmp';await writeFile(tmp,data,{mode:0o600});await rename(tmp,file);});return writes;}
 async function bind({sessionId='',cwd='',projectId}={}){await ready;if(projectId){const p=projects.get(projectId);if(!p)throw new CanvasError('PROJECT_NOT_FOUND','画布项目不存在',404);if(sessionId&&bindings.has(sessionId)&&bindings.get(sessionId)!==projectId)throw new CanvasError('PROJECT_MISMATCH','当前对话绑定了其他画布项目');if(sessionId){bindings.set(sessionId,projectId);await persist();}return p;}
  if(sessionId&&bindings.has(sessionId))return projects.get(bindings.get(sessionId));
  const canonical=cwd?await realpath(resolve(cwd)).catch(()=>resolve(cwd)):'';
  const id='dsh-canvas-'+(canonical?createHash('sha256').update(canonical).digest('hex').slice(0,20):'local');
  if(!projects.has(id))projects.set(id,{id,cwd:canonical,title:canonical.split(/[\\/]/).pop()||'本地画布',createdAt:new Date().toISOString(),rootDir:join(root,'projects',id)});
  if(sessionId)bindings.set(sessionId,id);await persist();return projects.get(id);
 }
 return {bind,async get(id){await ready;return projects.get(id)||null;},async forSession(sessionId){await ready;const p=projects.get(bindings.get(sessionId));if(!p)throw new CanvasError('PROJECT_NOT_BOUND','请先打开当前对话的画布');return p;},async list(){await ready;return [...projects.values()];},async dispose(){await ready;await writes;}};
}
