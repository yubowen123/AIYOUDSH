import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import vm from 'node:vm';
import {randomUUID,createHash} from 'node:crypto';
import {WebServer} from './runtime/node_modules/@deepseek-ai/dsh-host-webserver/lib/index.js';
import {apply} from '../aiyou/modules/canvas/index.js';

const BASE='/aiyoucodex-dsh/canvas',ROOT=new URL('../',import.meta.url),sha=b=>createHash('sha256').update(b).digest('hex');
async function fixture(t){
 const temp=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'dsh-root-http-'))),oldHome=process.env.DSH_HOME;
 process.env.DSH_HOME=temp;const disposers=[],tools=[];
 // Actual shipped WebServer.register/match; only socket construction is local.
 const web=Object.assign(Object.create(WebServer.prototype),{exact:new Map(),prefixes:new Map()});
 const session={id:'session-a',header:{cwd:temp},requestHeader:()=>null};
 const ctx={webServer:web,connection:{requestRejection:req=>req.headers.cookie==='qa-session=fixture'&&(!req.headers.origin||req.headers.origin===ctx.origin)?undefined:401},
  agents:{get:id=>id===session.id?{session}:undefined},sessionProjections:{stateOf:()=>({pending:null})},agentDefaultModel:{currentSelection:()=>({provider:'fixture',model:'fixture-chat'})},
  credentials:{describeRecord:async()=>({configured:false})},attachments:{},
  llm:{listProviders:()=>[{id:'fixture'}],resolveModelInfo:async()=>({inputModalities:['text']})},tools:{register:def=>{tools.push(def);return()=>{};}},
  get(key){return this[key];},inject(_names,fn){fn(this);},effect(fn){const cleanup=fn();if(typeof cleanup==='function')disposers.push(cleanup);return cleanup;}};
 apply(ctx);
 const server=http.createServer(async(req,res)=>{const route=web.match(new URL(req.url,'http://local').pathname);if(!route){res.writeHead(404);res.end();return;}try{await route.handler(req,res);}catch(e){if(!res.headersSent){res.writeHead(500);res.end(e.message);}else res.destroy(e);}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));ctx.origin='http://127.0.0.1:'+server.address().port;
 t.after(async()=>{for(const dispose of disposers.reverse())await dispose();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));if(oldHome===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=oldHome;await fs.rm(temp,{recursive:true,force:true});});
 async function api(route,args,extra={}){const response=await fetch(ctx.origin+BASE+route,{method:args===undefined?'GET':'POST',headers:{cookie:'qa-session=fixture',...(args===undefined?{}:{'content-type':'application/json'}),...extra.headers},...(args===undefined?{}:{body:JSON.stringify(args)}),...Object.fromEntries(Object.entries(extra).filter(([key])=>key!=='headers'))});const body=await response.json();return{response,body};}
 const bind=await api('/bind',{sessionId:session.id,cwd:temp});assert.equal(bind.response.status,200);
 return{temp,web,tools,ctx,api,projectId:bind.body.value.projectId,context:{sessionId:session.id,projectId:bind.body.value.projectId}};
}
test('native prefix matcher serves canvas/settings HTML and their actual static children; auth and content-type fences apply',async t=>{
 const f=await fixture(t);
 for(const entry of ['/ui/','/model-settings/']){
  const response=await fetch(f.ctx.origin+BASE+entry,{headers:{cookie:'qa-session=fixture'}});assert.equal(response.status,200);const html=await response.text();assert.match(response.headers.get('content-type'),/text\/html/);
  const children=[...html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)].map(m=>m[1]);assert.ok(children.length);
  for(const child of children){const res=await fetch(new URL(child,response.url),{headers:{cookie:'qa-session=fixture'}});assert.equal(res.status,200,child);assert.ok((await res.arrayBuffer()).byteLength>0);}
 }
 assert.equal(f.web.match(BASE+'/ui-unrelated'),undefined);
 let r=await fetch(f.ctx.origin+BASE+'/model-settings/app.js');assert.equal(r.status,401);
 r=await fetch(f.ctx.origin+BASE+'/ui/',{headers:{cookie:'qa-session=fixture',origin:'https://untrusted.fixture.invalid'}});assert.equal(r.status,401);
 const rejected=await f.api('/rpc',{...f.context,command:'aiyouplus_model_config'},{headers:{'content-type':'text/plain'}});assert.equal(rejected.response.status,415);
});
test('actual RPC uses native injected model service and keeps exact session/project binding',async t=>{
 const f=await fixture(t),r=await f.api('/rpc',{...f.context,command:'aiyouplus_model_config',args:{}});
 assert.equal(r.response.status,200,JSON.stringify(r.body));assert.equal(r.body.value.chatProvider,'host');assert.equal(r.body.value.profiles.host.credentialManagedByHost,true);
 const other=await f.api('/bind',{sessionId:'session-b',cwd:path.join(f.temp,'other')});
 const rejected=await f.api('/rpc',{sessionId:'session-a',projectId:other.body.value.projectId,command:'aiyouplus_model_config',args:{}});assert.equal(rejected.response.status,409);assert.match(rejected.body.error,/其他画布项目/);
 assert.equal(f.tools.length,6);for(const tool of f.tools){assert.equal(tool.parameters.type,'object');assert.equal(tool.parameters.additionalProperties,false);assert.equal(tool.output.schema.type,'string');assert.equal(typeof tool.output.render,'function');assert.equal(typeof tool.execute,'function');}
 await assert.rejects(f.tools[0].execute({},{}),e=>e.code==='SESSION_REQUIRED');
 const opened=JSON.parse(await f.tools.find(t=>t.name==='canvas_open').execute({sessionId:'forged'}, {agent:{session:f.ctx.agents.get('session-a').session},signal:new AbortController().signal}));assert.equal(opened.projectId,f.projectId);
});
test('save receipt rejects another owned file and patch mismatch; canonical payload reply completes and remains replayable',async t=>{
 const f=await fixture(t),panel={...f.context,panelId:'panel_fixture_123',revision:0,snapshot:{nodes:[],edges:[]},documentRef:'project:doc-a'};
 assert.equal((await f.api('/panel',panel)).response.status,200);
 const command={...f.context,requestId:'write-fixture',action:'write_text',expectedRevision:0,payload:{id:'n1',text:'saved'}};
 const executing=f.api('/command',command);const events=await f.api('/events?'+new URLSearchParams({...f.context,panelId:panel.panelId,cursor:'0'}));assert.equal(events.body.value.events[0].command.requestId,command.requestId);
 const projectRoot=path.join(f.temp,'aiyou-enhancer/canvas/projects',f.projectId),wrong=path.join(projectRoot,'unrelated.txt'),bytes=Buffer.from('fixture original');await fs.mkdir(projectRoot,{recursive:true});await fs.writeFile(wrong,bytes);
 const canonical=path.join(projectRoot,'MediaCache/project management/doc-a/payload.json');await fs.mkdir(path.dirname(canonical),{recursive:true});await fs.writeFile(canonical,bytes);
 const receipt={projectId:f.projectId,documentRef:'project:doc-a',path:wrong,sha256:sha(bytes),bytes:bytes.length,patchSha256:null};
 const value={revision:1,snapshot:{projectId:'doc-a',nodes:[{id:'n1',text:'saved'}],edges:[]},documentRef:'project:doc-a',saveReceipt:receipt};
 const rejected=await f.api('/reply',{...panel,requestId:command.requestId,ok:true,value});assert.equal(rejected.response.status,409,'an unrelated owned file must not prove this document was saved');
 receipt.path=canonical;
 await fs.writeFile(path.join(path.dirname(canonical),'autosave-patch.json'),'changed patch');
 const badPatch=await f.api('/reply',{...panel,requestId:command.requestId,ok:true,value});assert.equal(badPatch.response.status,409,'patch SHA must be checked');
 receipt.patchSha256=sha(Buffer.from('changed patch'));assert.equal((await f.api('/reply',{...panel,requestId:command.requestId,ok:true,value})).response.status,200);
 const actual=await executing;assert.equal(actual.body.value.status,'completed');assert.deepEqual((await f.api('/command',command)).body.value,actual.body.value);
});
test('actual client open-request cursor is per session, preserving a background session request across navigation',async()=>{
 const source=await fs.readFile(new URL('../aiyou/modules/canvas/client.js',import.meta.url),'utf8');let loaded,interval,current='A';const opened=[],calls=[];
 const sandbox={URLSearchParams,crypto:{randomUUID},setInterval:fn=>(interval=fn,1),clearInterval(){},window:{__ModuleLoader__:{load:value=>{loaded=value;}}},
  fetch:async url=>{const q=new URL(url,'http://fixture').searchParams,sessionId=q.get('sessionId'),cursor=Number(q.get('cursor'));calls.push({sessionId,cursor});return{ok:true,json:async()=>({ok:true,value:{cursor:1,requests:sessionId==='B'&&cursor<1?[{id:1,sessionId:'B'}]:[]}})};}};
 vm.runInNewContext(source,sandbox);
 const sessions={list:{getSnapshot:()=>({byId:{A:{id:'A',cwd:'/A',retainedBy:{mainView:current==='A'?1:0}},B:{id:'B',cwd:'/B',retainedBy:{mainView:current==='B'?1:0}}}})}};
 const ctx={sessions,get:key=>ctx[key],layout:{selectPanel(){},openRightbar(){}},sidebarRight:{openTab:(_kind,args)=>opened.push(args)},sidebarRightTabs:{register:()=>()=>{}},slots:{inject:(_name,fn)=>fn(),register:()=>()=>{}},effect:fn=>fn()};
 loaded.factory(()=>({createElement(){}})).apply(ctx);
 await new Promise(resolve=>setImmediate(resolve));current='B';interval();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(opened.length,1,JSON.stringify(calls));assert.equal(opened[0].params.sessionId,'B');
});
test('official native JSON-schema validator accepts every captured canvas tool input/output declaration',async t=>{
 const native=await import('./runtime/native-json-schema.mjs');
 const f=await fixture(t);for(const tool of f.tools){native.assertObjectJsonSchema(tool.parameters);native.assertSupportedJsonSchema(tool.output.schema);}
 assert.throws(()=>native.assertSupportedJsonSchema({type:'object',patternProperties:{'.*':{type:'string'}}}),/patternProperties/);
});
test('explicit panel close releases its local command waiter immediately and permits a replacement panel',async t=>{
 const f=await fixture(t),panel={...f.context,panelId:'panel_close_old',revision:0,snapshot:{nodes:[],edges:[]}};
 assert.equal((await f.api('/panel',panel)).response.status,200);
 let settled=false;const running=f.api('/command',{...f.context,requestId:'close-pending',action:'create_node',expectedRevision:0,payload:{type:'text'}}).then(r=>(settled=true,r),e=>(settled=true,{error:e}));
 await f.api('/events?'+new URLSearchParams({...f.context,panelId:panel.panelId,cursor:'0'}));
 assert.equal((await f.api('/close',panel)).response.status,200);
 assert.equal((await f.api('/panel',{...panel,panelId:'panel_close_new'})).response.status,200);
 await new Promise(resolve=>setTimeout(resolve,30));assert.equal(settled,true,'old command must stop waiting instead of blocking the project queue for 45 seconds');
 const actual=await running;assert.equal(actual.response.status,409);assert.match(actual.body.error,/关闭|停止等待/);
});
