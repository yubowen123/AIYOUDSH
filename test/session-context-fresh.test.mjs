import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {setTimeout as delay} from 'node:timers/promises';

test('fresh extraction reads real isolated projection history without changing the confirmed saved file',async t=>{
 const root=await mkdtemp(join(tmpdir(),'dsh-context-fresh-')),before=process.env.DSH_HOME;
 process.env.DSH_HOME=root;
 let plugin;try{plugin=await import('../aiyou/modules/session-context/index.js?fresh-fixture='+Date.now());}finally{if(before===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=before;}
 t.after(()=>rm(root,{recursive:true,force:true}));
 const projection=join(root,'storages/session_projcache/sessions'),savedDir=join(root,'aiyou-enhancer/session-context');await mkdir(projection,{recursive:true});await mkdir(savedDir,{recursive:true});
 await writeFile(join(projection,'session-A.json'),JSON.stringify({version:3,record:{rows:{title:{val:'历史任务'},titleInput:{val:{first:{text:'帮我实现本地画布项目列表并支持继续编辑'},count:1}},turnOutline:{val:{turns:[{turn:1,prompt:'帮我实现本地画布项目列表并支持继续编辑'}]}}}}}));
 const file=join(savedDir,'session-A.json'),saved={context:{goal:'用户确认的旧目标',progress:'已保存进度',nextStep:'保持原记录',agreements:['不要自动覆盖'],references:['./saved.md']},version:7,at:'2026-10-26T00:00:00.000Z'};
 const bytes=JSON.stringify(saved);await writeFile(file,bytes);
 const routes=new Map(),ctx={connection:{requestRejection:()=>undefined},effect(fn,name){if(!name.endsWith(':lifecycle'))return fn();},inject(_names,fn){return fn(ctx);},webServer:{register(v){routes.set(v.path,v.handler);return()=>{};}}};plugin.apply(ctx);
 async function read(query){let status,body;await routes.get('/aiyoucodex-dsh/session-context')({url:'/aiyoucodex-dsh/session-context?session=session-A'+query,method:'GET',headers:{}},{setHeader(){},writeHead(value){status=value;},end(value){body=JSON.parse(value);}});assert.equal(status,200);return body;}
 const normal=await read(''),fresh=await read('&fresh=1');assert.equal(normal.draft.context.goal,saved.context.goal);assert.equal(normal.savedVersion,7);assert.notEqual(fresh.draft.context.goal,saved.context.goal);assert.match(fresh.draft.context.goal,/历史任务|本地画布/);assert.equal(fresh.saved.goal,saved.context.goal);assert.equal(await readFile(file,'utf8'),bytes);
 // Wait only for the module's best-effort status rename before removing its own fixture tree.
 for(let i=0;i<100;i++){try{JSON.parse(await readFile(join(root,'aiyou-enhancer/status/aiyou-enhancer-session-context.json'),'utf8'));break;}catch{await delay(2);}}
});
