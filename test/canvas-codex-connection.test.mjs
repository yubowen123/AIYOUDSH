import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawn} from 'node:child_process';
import {createCodexConnection} from '../aiyou/lib/canvas/codex-connection.mjs';
import {createCodexCliAdapter} from '../aiyou/lib/canvas/codex-cli-adapter.mjs';
import {inspectCodexCli,createCodexRpc} from '../aiyou/lib/canvas/codex-cli-rpc.mjs';
import {createHostLlm} from '../aiyou/lib/canvas/host-llm.mjs';
import {LlmRuntime} from './runtime/node_modules/@deepseek-ai/dsh-llm/lib/index.js';
import vm from 'node:vm';

const fixtureScript=String.raw`
const fs=require('node:fs'),readline=require('node:readline');
const log=value=>fs.appendFileSync(process.env.CLI_FIXTURE_LOG,JSON.stringify({...value,pid:process.pid})+'\n');
const mode=process.env.CLI_FIXTURE_MODE;
let toolName='canvas_snapshot';
if(process.argv.includes('--version')){if(mode==='metadata-wait'){log({kind:'metadata-wait'});setInterval(()=>{},1000);}else{console.log('codex-cli 0.162.1');process.exit(0);}}
else {
if(process.argv[2]==='login'){log({kind:'login-status',args:process.argv.slice(2)});if(mode==='unlogged'){console.error('Not logged in');process.exit(1);}console.error('Logged in using ChatGPT');process.exit(0);}
log({kind:'spawn',args:process.argv.slice(2),hasInjectedKey:Boolean(process.env.OPENAI_API_KEY)});
const output=value=>process.stdout.write(JSON.stringify(value)+'\n');
const note=(method,params)=>output({method,params});
const done=()=>{note('item/agentMessage/delta',{threadId:'thread-fixture',turnId:'turn-fixture',itemId:'final',delta:'工具已完成'});note('item/completed',{threadId:'thread-fixture',item:{type:'agentMessage',id:'final',text:'工具已完成'}});note('thread/tokenUsage/updated',{threadId:'thread-fixture',turnId:'turn-fixture',tokenUsage:{last:{inputTokens:12,cachedInputTokens:2,outputTokens:5,totalTokens:17}}});note('turn/completed',{threadId:'thread-fixture',turn:{id:'turn-fixture',status:'completed',items:[]}});};
readline.createInterface({input:process.stdin}).on('line',line=>{
 const x=JSON.parse(line);log({kind:'wire',frame:x});
 if(!x.method&&x.id===700){log({kind:'tool-reply',result:x.result});done();return;}
 if(!x.method||x.id===undefined)return;
 const answer=result=>output({id:x.id,result});
 if(x.method==='initialize')answer({userAgent:'fixture'});
 else if(x.method==='account/read')answer({account:{type:'chatgpt',email:'private-fixture@example.invalid'},requiresOpenaiAuth:true});
 else if(x.method==='model/list')answer({data:[{id:'fixture-model',model:'fixture-model',displayName:'Fixture Codex',description:'fixture only',hidden:false,isDefault:true,inputModalities:['text','image'],supportedReasoningEfforts:[{reasoningEffort:'low',description:'low'}],defaultReasoningEffort:'low'}]});
 else if(x.method==='thread/start'){toolName=x.params.dynamicTools?.[0]?.name||toolName;answer({thread:{id:'thread-fixture'}});}
 else if(x.method==='thread/inject_items')answer({});
 else if(x.method==='turn/start'){
  answer({turn:{id:'turn-fixture'}});
  if(mode==='error'){note('turn/completed',{threadId:'thread-fixture',turn:{id:'turn-fixture',status:'failed',error:{message:'FIXTURE_PRIVATE_TOKEN'}}});return;}
  if(mode==='malformed'){process.stdout.write('not-json-FIXTURE_PRIVATE_TOKEN\n');return;}
  if(mode==='builtin'){note('item/started',{threadId:'thread-fixture',item:{id:'cmd1',type:'commandExecution'}});return;}
  note('item/agentMessage/delta',{threadId:'thread-fixture',turnId:'turn-fixture',itemId:'intro',delta:'hello '});
  if(mode==='cancel')return;
  if(mode==='tool'||mode==='badtool'){output({id:700,method:'item/tool/call',params:{threadId:mode==='badtool'?'other-thread':'thread-fixture',turnId:'turn-fixture',callId:'host-call',tool:toolName,namespace:null,arguments:{projectId:'owned-project'}}});return;}
  if(mode==='unicode'){const bytes=Buffer.from(JSON.stringify({method:'item/agentMessage/delta',params:{threadId:'thread-fixture',turnId:'turn-fixture',itemId:'intro',delta:'中文'}})+'\n');for(let i=0;i<bytes.length;i++)process.stdout.write(bytes.subarray(i,i+1));}
  note('item/completed',{threadId:'thread-fixture',item:{type:'agentMessage',id:'intro',text:mode==='unicode'?'hello 中文':'hello world'}});
  note('turn/completed',{threadId:'thread-fixture',turn:{id:'turn-fixture',status:'completed',items:[]}});
 }
 else if(x.method==='turn/interrupt'){answer({});note('turn/completed',{threadId:'thread-fixture',turn:{id:'turn-fixture',status:'interrupted',items:[]}});}
 else output({id:x.id,error:{code:-32601,message:'unknown'}});
});
process.on('SIGTERM',()=>{log({kind:'exit'});process.exit(0);});
}
`;
const tick=()=>new Promise(resolve=>setTimeout(resolve,15));
async function waitFor(check,{timeoutMs=15000,label='fixture condition'}={}){
 const deadline=performance.now()+timeoutMs;
 while(performance.now()<deadline){if(await check())return;await tick();}
 assert.fail(label+' did not settle within '+timeoutMs+'ms');
}
async function fixture(t,mode='normal'){
 const root=await mkdtemp(join(tmpdir(),'dsh-local-cli-')),bin=join(root,'codex-fixture'),log=join(root,'wire.jsonl');await writeFile(bin,'#!'+process.execPath+'\n'+fixtureScript,{mode:0o755});await writeFile(log,'');
 const children=[],spawnImpl=(exe,args,options)=>{const child=spawn(exe,args,{...options,env:{...options.env,CLI_FIXTURE_MODE:mode,CLI_FIXTURE_LOG:log}});children.push(child);return child;};
 const effects=[],ctx={events:{dispatch:()=>[]},logger:{warn(){}},effect(fn){const it=fn();if(it?.next){const yielded=it.next().value,dispose=()=>yielded?.();effects.push(dispose);return dispose;}effects.push(it);return it;},waterfall(_self,_event,_options,run){return run();},get(name){return this[name];}};
 const llm=Object.assign(Object.create(LlmRuntime.prototype),{ctx,adapters:new Map(),directory:new Map(),discoveries:new Map()});
 ctx.llm=llm;ctx.agents={get:id=>['session-a','session-b'].includes(id)?{session:{id,header:{cwd:root},requestHeader:()=>null}}:undefined};ctx.agentDefaultModel={currentSelection:()=>({provider:'codex-cli',model:'fixture-model'})};ctx.sessionProjections={stateOf:()=>({pending:null})};
 ctx.attachments={readImageRequest:async()=>({mediaType:'image/png',data:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=','base64')})};
 const stateDir=join(root,'state'),service=createCodexConnection({ctx,stateDir,spawnImpl});const invoke=(cmd,args={})=>service.invoke('dsh_codex_'+cmd,args,{sessionId:'session-a'});
 async function frames(){return (await readFile(log,'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);}
 async function connect(){return invoke('begin',{executablePath:bin});}
 t.after(async()=>{await service.dispose();for(const child of children)if(child.exitCode===null&&child.signalCode===null)child.kill('SIGKILL');await Promise.all(children.map(c=>c.exitCode!==null||c.signalCode!==null?Promise.resolve():new Promise(r=>c.once('close',r))));await rm(root,{recursive:true,force:true});});
 return{root,bin,log,ctx,llm,service,invoke,connect,frames,children,stateDir,spawnImpl};
}
const request={prompt:'fixture user text',tools:[{type:'function',function:{name:'canvas_snapshot',description:'Host snapshot',parameters:{type:'object',properties:{}}}}]};
const context={sessionId:'session-a',projectId:'owned-project'};
async function collect(iterator){const result=[];for await(const item of iterator)result.push(item);return result;}

test('CLI metadata uses only version/login status; explicit local connection registers native route without OAuth or credential copying',async t=>{
 const f=await fixture(t);f.ctx.authorization={begin(){assert.fail('must not OAuth');}};f.ctx.credentials={readRecord(){assert.fail('must not read credentials');}};
 const detected=await f.invoke('status',{executablePath:f.bin,refresh:true});assert.equal(detected.installed,true);assert.equal(detected.loggedIn,true);assert.equal(detected.version,'0.162.1');assert.equal(detected.enabled,false);
 const connected=await f.connect();assert.equal(connected.provider,'codex-cli');assert.equal(connected.extraOAuthRequired,false);assert.equal(connected.modelCallVerified,false);assert.equal(connected.currentModelUnchanged,true);assert.equal(f.llm.listProviders()[0].id,'codex-cli');
 assert.deepEqual(await f.llm.listModels('codex-cli'),[{provider:'codex-cli',id:'fixture-model',name:'Fixture Codex',description:'fixture only',inputModalities:['text','image']}]);
 const bytes=await readFile(join(f.stateDir,'local-cli.json'),'utf8');assert.deepEqual(JSON.parse(bytes),{schema:1,enabled:true,executablePath:f.bin});assert.equal(bytes.includes('private-fixture'),false);
 const frames=await f.frames();assert.equal(frames.some(f=>f.frame?.method==='turn/start'),false);assert.equal(frames.some(f=>f.frame?.method?.includes('login')),false);assert.equal(frames.find(f=>f.frame?.method==='account/read').frame.params.refreshToken,false);
 await assert.rejects(f.invoke('respond',{answer:'unused'}),e=>e.code==='OAUTH_REMOVED');
});
test('missing CLI and not-logged-in state are explicit; plugin never starts login',async t=>{
 const f=await fixture(t,'unlogged');const s=await f.invoke('status',{executablePath:f.bin});assert.equal(s.loggedIn,false);await assert.rejects(f.connect(),e=>e.code==='CLI_NOT_LOGGED_IN');assert.equal(f.llm.listProviders().length,0);
 const missing=await f.invoke('status',{executablePath:join(f.root,'absent')});assert.equal(missing.diagnostic,'CLI_NOT_INSTALLED');assert.equal(missing.installed,false);assert.equal((await f.frames()).every(x=>x.kind!=='login-status'||JSON.stringify(x.args)==='["login","status"]'),true);
});
test('actual native LLM registry prepares exact CLI model, preserves system/history/image and streams Unicode/final suffix',async t=>{
 const f=await fixture(t,'unicode');await f.connect();const call=await f.llm.prepareCall({provider:'codex-cli',model:'fixture-model'});assert.equal(call.config.reasoningEffort,'low');assert.deepEqual(call.inputModalities,['text','image']);assert.equal(call.retryPolicy.maxRetries,0);
 const host=createHostLlm({ctx:f.ctx}),r=await host({messages:[{role:'system',content:'system contract'},{role:'assistant',content:'prior response'},{role:'user',content:[{type:'text',text:'current user'},{type:'image',attachment:{attachmentId:'sha-fixture',width:1,height:1}}]}]},context);assert.equal(r.text,'hello 中文');assert.equal(r.provider,'codex-cli');
 const frames=await f.frames(),start=frames.find(x=>x.frame?.method==='thread/start').frame.params;assert.equal(start.baseInstructions,'system contract');assert.equal(start.ephemeral,true);assert.deepEqual(start.environments,[]);assert.equal(start.sandbox,'read-only');
 const prior=frames.find(x=>x.frame?.method==='thread/inject_items').frame.params.items;assert.equal(prior[0].role,'assistant');assert.equal(prior[0].content[0].text,'prior response');const turn=frames.find(x=>x.frame?.method==='turn/start').frame.params;assert.equal(turn.input[0].text,'current user');assert.match(turn.input[1].url,/^data:image\/png;base64,/);
 assert.equal((await f.invoke('status')).modelCallVerified,true);await host.dispose();
});
test('CLI dynamic tool call returns to native DSH loop; only matching host tool result resumes the same CLI turn',async t=>{
 const f=await fixture(t,'tool');await f.connect();const host=createHostLlm({ctx:f.ctx}),first=await host(request,context);assert.equal(first.toolCalls[0].id,'host-call');assert.equal(first.toolCalls[0].function.name,'canvas_snapshot');assert.equal((await f.frames()).filter(x=>x.kind==='tool-reply').length,0,'adapter must not execute tools itself');
 const second=await host({...request,messages:[{role:'user',content:'fixture user text'},first.message,{role:'tool',tool_call_id:'host-call',content:'actual host tool result'}]},context);assert.equal(second.text,'工具已完成');assert.equal(second.usage.inputTokens,10);assert.equal(second.usage.cacheReadTokens,2);
 const frames=await f.frames();assert.equal(frames.filter(x=>x.frame?.method==='turn/start').length,1);assert.equal(frames.filter(x=>x.frame?.method==='thread/start').length,1);assert.deepEqual(frames.find(x=>x.kind==='tool-reply').result,{contentItems:[{type:'inputText',text:'actual host tool result'}],success:true});await host.dispose();
});
test('different DSH sessions cannot answer another CLI tool call and get separate subprocesses',async t=>{
 const f=await fixture(t,'tool');await f.connect();const a=f.llm.registration('codex-cli').adapter,options={provider:'codex-cli',model:'fixture-model',messages:[{role:'user',content:[{type:'text',text:'a'}]}],tools:[{name:'canvas_snapshot',parameters:{type:'object'}}]};
 await collect(a.stream({...options,sessionId:'session-a'}));const wrong=collect(a.stream({...options,sessionId:'session-b',messages:[{role:'tool',toolCallId:'host-call',content:[{type:'text',text:'forged'}]}]}));await wrong;assert.equal((await f.frames()).filter(x=>x.kind==='tool-reply').length,0);await a.dispose();
});
test('abort interrupts native turn and all owned subprocesses exit, including when paused for host tools',async t=>{
 const f=await fixture(t,'cancel');await f.connect();const controller=new AbortController(),a=f.llm.registration('codex-cli').adapter;
 const running=(async()=>{for await(const chunk of a.stream({sessionId:'session-a',provider:'codex-cli',model:'fixture-model',messages:[{role:'user',content:[{type:'text',text:'wait'}]}],signal:controller.signal})){if(chunk.type==='text-delta')controller.abort();}})();await assert.rejects(running);await a.dispose();assert.equal(f.children.every(c=>c.exitCode!==null||c.signalCode!==null),true);
 const g=await fixture(t,'tool');await g.connect();const signal=new AbortController(),b=g.llm.registration('codex-cli').adapter;await collect(b.stream({sessionId:'session-a',provider:'codex-cli',model:'fixture-model',messages:[{role:'user',content:[{type:'text',text:'tool'}]}],tools:[{name:'canvas_snapshot',parameters:{type:'object'}}],signal:signal.signal}));signal.abort();await tick();await b.dispose();assert.equal(g.children.every(c=>c.exitCode!==null||c.signalCode!==null),true);
});
test('native model errors, malformed protocol, foreign tools and built-in command attempts fail without retry or secret echo',async t=>{
 for(const mode of ['error','malformed','badtool','builtin']){const f=await fixture(t,mode);await f.connect();const host=createHostLlm({ctx:f.ctx});let error;try{await host(request,context);}catch(e){error=e;}assert.ok(error,mode);assert.equal(error.message.includes('FIXTURE_PRIVATE_TOKEN'),false,mode);assert.equal((await f.frames()).filter(x=>x.frame?.method==='turn/start').length,1,mode);await host.dispose();}
});
test('unsupported controls reject before turn, disconnect preserves CLI login and current host model',async t=>{
 const f=await fixture(t);await f.connect();const a=f.llm.registration('codex-cli').adapter;
 for(const key of ['temperature','maxTokens','stop'])await assert.rejects(collect(a.stream({sessionId:'session-a',model:'fixture-model',[key]:1})),e=>e.code==='UNSUPPORTED_OPTION');assert.equal((await f.frames()).some(x=>x.frame?.method==='turn/start'),false);
 const state=await f.invoke('cancel');assert.equal(state.enabled,false);assert.equal(state.cliLoginUnchanged,true);assert.equal(state.currentModelUnchanged,true);assert.equal(f.llm.listProviders().length,0);assert.equal(JSON.parse(await readFile(join(f.stateDir,'local-cli.json'),'utf8')).enabled,false);assert.equal((await f.frames()).some(x=>x.frame?.method==='account/logout'),false);
});

test('native CLI tool aliases preserve long/namespace host names and missing tool results fail visibly without another POST/turn',async t=>{
 const f=await fixture(t,'tool');await f.connect();const host=createHostLlm({ctx:f.ctx}),name='mcp.host.namespace.'+'long_name_'.repeat(8),tools=[{name,description:'host-owned',parameters:{type:'object'}}];
 const result=await host({prompt:'use host tool',tools},context);assert.equal(result.toolCalls[0].function.name,name);const wire=(await f.frames()).find(x=>x.frame?.method==='thread/start').frame.params;assert.match(wire.dynamicTools[0].name,/^dsh_[a-f0-9]{40}$/);
 await assert.rejects(host({prompt:'missing tool reply',tools},context),e=>e.code==='MISSING_TOOL_RESULT');assert.equal((await f.frames()).filter(x=>x.frame?.method==='turn/start').length,1);await host.dispose();
});

test('persisted plugin executable/enabled settings recreate the native provider; tokens and CLI account file are never persisted',async t=>{
 const f=await fixture(t);await f.connect();await f.service.dispose();assert.equal(f.llm.listProviders().length,0);
 const restored=createCodexConnection({ctx:f.ctx,stateDir:f.stateDir,spawnImpl:f.spawnImpl});try{const state=await restored.invoke('dsh_codex_status');assert.equal(state.connected,true);assert.equal(state.executablePath,f.bin);assert.equal(state.loggedIn,true);assert.equal(state.modelCallVerified,false);assert.equal(f.llm.listProviders()[0].id,'codex-cli');assert.equal((await f.frames()).some(x=>x.frame?.method==='turn/start'),false);}finally{await restored.dispose();}
});

test('readonly detection of a draft CLI path preserves the actual connected executable and model directory',async t=>{
 const f=await fixture(t);await f.connect();const missing=join(f.root,'different-cli');
 const detected=await f.invoke('status',{executablePath:missing,refresh:true});assert.equal(detected.connected,true);assert.equal(detected.executablePath,f.bin);assert.equal(detected.models[0].id,'fixture-model');assert.equal(detected.detection.executablePath,missing);assert.equal(detected.detection.diagnostic,'CLI_NOT_INSTALLED');assert.equal(f.llm.listProviders()[0].id,'codex-cli');
 const current=await f.invoke('status',{refresh:true});assert.equal(current.connected,true);assert.equal(current.detection,undefined);assert.equal(current.executablePath,f.bin);
});

test('cancel during CLI detection waits for the owned metadata subprocess to exit and prevents late registration',async t=>{
 const f=await fixture(t,'metadata-wait'),pending=f.connect();const failed=pending.catch(e=>e);
 await waitFor(async()=>(await f.frames()).some(x=>x.kind==='metadata-wait'),{label:'CLI metadata subprocess start'});
 const state=await f.invoke('cancel');assert.equal((await failed).code,'ABORTED');assert.equal(state.enabled,false);assert.equal(f.llm.listProviders().length,0);assert.equal(f.children.every(c=>c.exitCode!==null||c.signalCode!==null),true);assert.equal((await f.frames()).some(x=>x.frame?.method==='turn/start'),false);
});

async function uiFixture(f){
 const elements=new Map(),events=new Map(),wire=[];
 class Element{constructor(tag='div'){this.tagName=tag;this.children=[];this.handlers=new Map();this.dataset={};this.value='';this.disabled=false;this.hidden=false;this._text='';}set id(v){this._id=v;elements.set(v,this);}get id(){return this._id;}set textContent(v){this._text=v;this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}append(...c){this.children.push(...c);}replaceChildren(...c){this.children=c;this._text='';}addEventListener(n,fn){this.handlers.set(n,fn);}click(){return this.handlers.get('click')?.({preventDefault(){}});}}
 const html=await readFile(new URL('../aiyou/vendor/canvas-model-settings/index.html',import.meta.url),'utf8');for(const m of html.matchAll(/<(\w+)\b[^>]*\bid="([^"]+)"[^>]*>/g)){const e=new Element(m[1]);e.id=m[2];}elements.get('catalog').value='[]';elements.get('defaults').value='{}';
 const document={getElementById:id=>elements.get(id),createElement:tag=>new Element(tag),querySelectorAll:()=>[]},box={URL,URLSearchParams,document,location:{search:'?sessionId=session-a'},window:{addEventListener:(n,fn)=>events.set(n,fn)},
  fetch:async(_url,options)=>{const input=JSON.parse(options.body);wire.push(input);try{const value=input.command==='aiyouplus_model_config'?{profiles:{host:{provider:'host',available:true}}}:await f.service.invoke(input.command,input.command==='dsh_codex_status'&&input.args.executablePath===undefined?{...input.args,executablePath:f.bin}:input.args,input);return{ok:true,json:async()=>({ok:true,value})};}catch(e){return{ok:false,json:async()=>({ok:false,error:{message:e.message}})};}}};
 vm.runInNewContext(await readFile(new URL('../aiyou/vendor/canvas-model-settings/app.js',import.meta.url),'utf8'),box);
 async function settled(){await waitFor(()=>elements.get('codex-refresh').disabled===false,{label:'CLI UI; commands='+wire.map(x=>x.command).join(',')});}
 await settled();return{elements,wire,html,events,settled};
}
test('actual CLI settings client has path/detect/connect/disconnect, never OAuth controls, and leaves media API draft untouched',async t=>{
 const f=await fixture(t),ui=await uiFixture(f),get=id=>ui.elements.get(id);assert.match(ui.html,/连接本地 Codex CLI/);assert.equal(ui.html.includes('id="codex-prompt"'),false);assert.equal(ui.wire.some(x=>x.command==='dsh_codex_begin'),false);assert.equal(f.llm.listProviders().length,0);
 get('api-key').value='unsaved-media-draft';get('codex-path').value=f.bin;get('codex-begin').click();await ui.settled();assert.equal(f.llm.listProviders()[0].id,'codex-cli');assert.match(get('codex-status').textContent,/已接入 DSH/);assert.match(get('codex-models').textContent,/实际模型调用尚未验证/);assert.equal(get('api-key').value,'unsaved-media-draft');
 assert.equal(ui.wire.some(x=>x.command==='dsh_codex_respond'||x.command==='aiyouplus_model_configure'),false);get('codex-cancel').click();await ui.settled();assert.equal(f.llm.listProviders().length,0);assert.equal(get('api-key').value,'unsaved-media-draft');assert.equal(ui.events.has('pagehide'),false,'closing settings must not logout or disconnect a global CLI provider');
});

test('CLI settings cancel remains usable while connecting and a late connect cannot relabel the disconnected UI',async t=>{
 const f=await fixture(t),ui=await uiFixture(f),get=id=>ui.elements.get(id);get('codex-path').value=f.bin;get('codex-begin').click();await tick();assert.equal(get('codex-cancel').hidden,false);assert.equal(get('codex-cancel').disabled,false);get('codex-cancel').click();await ui.settled();assert.equal(f.llm.listProviders().length,0);assert.equal(get('codex-cancel').hidden,true);assert.equal(get('codex-status').textContent.includes('已接入 DSH'),false);
});
