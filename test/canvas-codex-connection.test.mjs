import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {randomUUID} from 'node:crypto';
import {createCodexConnection} from '../aiyou/lib/canvas/codex-connection.mjs';

const KEY='llm-pi-ai/openai-codex',A={sessionId:'session-a',projectId:'project-a'},B={sessionId:'session-b',projectId:'project-a'},C={sessionId:'session-a',projectId:'project-b'};
const tick=()=>new Promise(resolve=>setImmediate(resolve));
// Execute the official shipped authorization state machine, replacing only its
// imports with the identical local test runtime. No profile/app/API is loaded.
const {AuthorizationService}=await import('./runtime/node_modules/@deepseek-ai/dsh-authorization/lib/index.js');
function fixture(t,{flow,configured=false}={}){
 const listeners=new Map(),records=new Map(),events=[],calls=[],mutations=[],logs=[];let routes=[];
 if(configured)records.set(KEY,{kind:'grant',payload:{access:'old-fixture-token'}});
 const authCtx={on(name,fn){const set=listeners.get(name)||new Set();set.add(fn);listeners.set(name,set);return()=>set.delete(fn);},
  events:{dispatch(_mode,args){return [...listeners.get(args[0])||[]];}},logger:{warn:(...args)=>logs.push(args),debug:(...args)=>logs.push(args)},
  credentials:{async modifyRecord(key,fn){const record=await fn(records.get(key));records.set(key,record);for(const fn of listeners.get('credentials/record-updated')||[])fn(key);},async describeRecord(key){return{configured:records.has(key)};}}};
 const auth=Object.assign(Object.create(AuthorizationService.prototype),{ctx:authCtx,flows:new Map(),running:new Map()});
 auth.flows.set(KEY,{key:KEY,label:'ChatGPT Codex fixture',methods:[{id:'oauth',label:'Sign in'}],async run(session){calls.push({method:session.method,signal:session.signal});await flow?.(session);}});
 const descriptors=[{ns:'native-pi-instance',revision:7,value:{providers:{keep:{displayName:'keep me',apiKeyEnv:'UNREAD_REF'}}}}];
 const ctx={authorization:auth,llm:{listProviders:()=>routes,listConfigurableProviders:()=>[{provider:'openai-codex',settingsNs:'native-pi-instance',settingsPath:['providers','openai-codex'],nativeAuth:{env:[],oauth:true}}]},
  settings:{describe:options=>{assert.deepEqual(options,{redactSecrets:true});return structuredClone(descriptors);},async mutate(ns,ops,revision){assert.equal(revision,descriptors[0].revision);mutations.push({ns,ops,revision});assert.equal(ns,'native-pi-instance');for(const op of ops){assert.equal(op.op,'set');descriptors[0].value.providers[op.path[1]]=structuredClone(op.value);}descriptors[0].revision++;routes=[{id:'openai-codex',name:'fixture'}];}},
  credentials:{readRecord(){throw Error('must never read credentials');},resolve(){throw Error('must never resolve credentials');}}};
 const service=createCodexConnection({ctx,emit:(...args)=>events.push(args)});t.after(()=>service.dispose());
 const invoke=(command,args={},context=A)=>service.invoke('dsh_codex_'+command,args,context);
 async function until(predicate){for(let n=0;n<40;n++){const s=await invoke('status');if(predicate(s))return s;await tick();}assert.fail('fixture status did not settle');}
 return{service,invoke,until,ctx,auth,calls,records,events,mutations,descriptors,logs};
}
const commit=session=>session.commit({kind:'grant',payload:{access:'private-fixture-token',refresh:'private-fixture-refresh'}});
async function answer(f,status,value){return f.invoke('respond',{attemptId:status.attemptId,promptId:status.prompt.id,answer:value});}

test('status reads only public native directories, never starts login or claims existing record is verified',async t=>{
 const f=fixture(t,{configured:true});const s=await f.invoke('status');assert.equal(s.enabled,false);assert.equal(s.catalogSupported,true);assert.equal(s.flowAvailable,true);assert.equal(s.authorized,false);assert.equal(s.modelCallVerified,false);assert.equal(f.calls.length,0);assert.equal(f.mutations.length,0);
 await assert.rejects(f.invoke('status',{},{}),e=>e.code==='SCOPE_REQUIRED');
});
test('enable mutates exactly native catalog path with revision, preserves other profiles, and does not select model or start auth',async t=>{
 const f=fixture(t);const results=await Promise.all([f.invoke('enable'),f.invoke('enable')]);assert.equal(results[0].changed,true);assert.equal(results[1].changed,false);assert.equal(f.mutations.length,1);
 assert.deepEqual(f.mutations[0],{ns:'native-pi-instance',ops:[{op:'set',path:['providers','openai-codex'],value:{}}],revision:7});assert.equal(f.descriptors[0].value.providers.keep.displayName,'keep me');assert.equal(f.calls.length,0);
 f.descriptors[0].value.providers['openai-codex']={displayName:'user custom'};await f.invoke('enable');assert.deepEqual(f.descriptors[0].value.providers['openai-codex'],{displayName:'user custom'});
});
test('native browser flow supports select, URL notice, text and fresh commit; one begin only and answers never leave memory',async t=>{
 const answers=[];const f=fixture(t,{flow:async session=>{answers.push(await session.prompt({kind:'select',message:'method',options:[{id:'browser',label:'Browser'},{id:'device_code',label:'Device'}]}));session.notify({message:'Continue',url:'https://auth.openai.com/oauth/authorize?state=fixture'});answers.push(await session.prompt({kind:'text',message:'Paste redirect',placeholder:'http://localhost:1455/auth/callback'}));await commit(session);}});
 const [started,duplicate]=await Promise.all([f.invoke('begin'),f.invoke('begin')]);assert.equal(started.attemptId,duplicate.attemptId);assert.equal(f.calls.length,1);
 let s=await f.until(s=>s.prompt?.kind==='select');await assert.rejects(answer(f,s,'not-an-option'),e=>e.code==='INVALID_ANSWER');await answer(f,s,'browser');
 s=await f.until(s=>s.prompt?.kind==='text');assert.match(s.notices[0].url,/auth.openai.com/);const redirect='http://localhost:1455/auth/callback?code=private-fixture-code';await answer(f,s,redirect);
 const done=await f.until(s=>s.status==='authorized');assert.equal(done.authorized,true);assert.equal(done.modelCallVerified,false);assert.equal(done.prompt,undefined);assert.equal(done.notices,undefined);assert.deepEqual(answers,['browser',redirect]);assert.ok(f.records.has(KEY));
 const publicBytes=JSON.stringify({done,events:f.events,logs:f.logs});for(const value of ['private-fixture-token','private-fixture-refresh','private-fixture-code','oauth/authorize'])assert.equal(publicBytes.includes(value),false,value);
});
test('device-code strategy stays inside native oauth method; secret prompt uses scoped reply then host commits',async t=>{
 const f=fixture(t,{flow:async session=>{assert.equal(await session.prompt({kind:'select',message:'choose',options:[{id:'device_code',label:'Device'}]}),'device_code');session.notify({message:'Enter code',url:'https://auth.openai.com/codex/device',code:'CODE-123'});assert.equal(await session.prompt({kind:'secret',message:'fixture secret'}),'fixture-only-answer');await commit(session);}});
 await assert.rejects(f.invoke('begin',{method:'device_code'}),e=>e.code==='UNKNOWN_METHOD');await f.invoke('begin');let s=await f.until(s=>s.prompt?.kind==='select');await answer(f,s,'device_code');s=await f.until(s=>s.prompt?.kind==='secret');assert.equal(s.notices[0].code,'CODE-123');await answer(f,s,'fixture-only-answer');await f.until(s=>s.status==='authorized');assert.equal(f.calls[0].method,'oauth');assert.equal(JSON.stringify(f.events).includes('CODE-123'),false);
});
test('an old credential or returned flow is not a fresh native commit: NOT_COMMITTED remains failure',async t=>{
 const f=fixture(t,{configured:true,flow:async()=>{}});await f.invoke('begin');const s=await f.until(s=>s.status==='failed');assert.equal(s.authorized,false);assert.equal(s.error.code,'NOT_COMMITTED');
});
test('prompt signal withdraws only its waiter; stale response fails and browser callback may still commit',async t=>{
 const withdraw=new AbortController();let callback;
 const callbackReady=new Promise(resolve=>{callback=resolve;});
 const f=fixture(t,{flow:async session=>{await Promise.race([session.prompt({kind:'text',message:'manual',signal:withdraw.signal}).catch(()=>{}),callbackReady]);await callbackReady;await commit(session);}});
 await f.invoke('begin');const before=await f.until(s=>s.prompt?.kind==='text');withdraw.abort();const after=await f.invoke('status');assert.equal(after.prompt,undefined);assert.equal(after.status,'running');await assert.rejects(answer(f,before,'late-code'),e=>e.code==='PROMPT_NOT_FOUND');callback();await f.until(s=>s.status==='authorized');
});
test('other sessions/projects cannot read notices, respond or cancel; cancel withdraws native prompt without deleting credentials',async t=>{
 const f=fixture(t,{configured:true,flow:async session=>{session.notify({message:'owned notice',code:'ONLY-A'});await session.prompt({kind:'secret',message:'secret'});await commit(session);}});
 await f.invoke('begin');const s=await f.until(s=>s.prompt?.kind==='secret');
 for(const scope of [B,C]){const other=await f.invoke('status',{},scope);assert.equal(other.attemptId,undefined);assert.equal(other.notices,undefined);await assert.rejects(f.invoke('respond',{attemptId:s.attemptId,promptId:s.prompt.id,answer:'forged'},scope),e=>e.code==='ATTEMPT_NOT_FOUND');await assert.rejects(f.invoke('cancel',{attemptId:s.attemptId},scope),e=>e.code==='ATTEMPT_NOT_FOUND');await assert.rejects(f.invoke('begin',{},scope),e=>e.code==='ALREADY_IN_FLIGHT');}
 await f.invoke('cancel',{attemptId:s.attemptId});const done=await f.until(s=>s.status==='cancelled');assert.equal(done.prompt,undefined);assert.equal(done.notices,undefined);assert.equal(f.calls[0].signal.aborted,true);assert.ok(f.records.has(KEY));
});
test('dispose rejects waiters and stops late events; caller abort also cancels native flow',async t=>{
 const f=fixture(t,{flow:async session=>{await session.prompt({kind:'text',message:'code'});await commit(session);}});await f.invoke('begin');await f.until(s=>Boolean(s.prompt));const before=f.events.length;await f.service.dispose();await tick();assert.equal(f.events.length,before);assert.equal(f.auth.running.size,0);assert.equal(f.records.size,0);await assert.rejects(f.invoke('status'),e=>e.code==='DISPOSED');
 const controller=new AbortController(),g=fixture(t,{flow:async session=>session.prompt({kind:'text',message:'code'})});await g.invoke('begin',{}, {...A,signal:controller.signal});await g.until(s=>Boolean(s.prompt));controller.abort();await g.until(s=>s.status==='cancelled');
});
test('invalid URL is never exposed/executed; native errors and supplied answers are not echoed',async t=>{
 const f=fixture(t,{flow:async session=>{session.notify({message:'bad link',url:'javascript:globalThis.fixtureExecuted=true'});await session.prompt({kind:'text',message:'never'});}});await f.invoke('begin');const s=await f.until(s=>s.status==='failed');assert.equal(s.error.code,'INVALID_AUTH_NOTICE');assert.equal(JSON.stringify(s).includes('javascript:'),false);
 const g=fixture(t,{flow:async()=>{throw Error('private-fixture-token was rejected');}});await g.invoke('begin');const failed=await g.until(s=>s.status==='failed');assert.equal(failed.error.code,'AUTHORIZATION_FAILED');assert.equal(JSON.stringify(failed).includes('private-fixture-token'),false);
});
test('native service gates authorized on actual commit signal, not UI reply; cannot use guessed settings target or unavailable flow',async t=>{
 let release;const finish=new Promise(resolve=>{release=resolve;});const f=fixture(t,{flow:async session=>{await session.prompt({kind:'text',message:'code'});await finish;await commit(session);}});await f.invoke('begin');let s=await f.until(s=>Boolean(s.prompt));await answer(f,s,'fixture-code');s=await f.invoke('status');assert.equal(s.authorized,false);assert.equal(s.status,'running');release();await f.until(s=>s.authorized);
 const g=fixture(t);g.ctx.llm.listConfigurableProviders=()=>[{provider:'openai-codex',settingsNs:'native-pi-instance',settingsPath:['providers','other']}];await assert.rejects(g.invoke('enable'),e=>e.code==='INVALID_SETTINGS_TARGET');assert.equal(g.mutations.length,0);g.auth.flows.clear();await assert.rejects(g.invoke('begin'),e=>e.code==='NO_FLOW');
});

test('cancel during native credential commit waits for native outcome and does not misreport a completed grant as cancelled',async t=>{
 let started,release;const committing=new Promise(resolve=>{started=resolve;}),gate=new Promise(resolve=>{release=resolve;});
 const f=fixture(t,{flow:async session=>{await session.prompt({kind:'text',message:'fixture code'});await commit(session);}});
 const original=f.auth.ctx.credentials.modifyRecord;f.auth.ctx.credentials.modifyRecord=async(...args)=>{started();await gate;return original(...args);};
 await f.invoke('begin');const prompt=await f.until(s=>Boolean(s.prompt));await answer(f,prompt,'fixture-code');await committing;
 const cancelled=await f.invoke('cancel',{attemptId:prompt.attemptId});assert.equal(cancelled.status,'cancelling');assert.equal(cancelled.authorized,false);release();const done=await f.until(s=>s.status==='authorized');assert.equal(done.authorized,true);assert.ok(f.records.has(KEY));
});

async function uiFixture(f){
 const elements=new Map(),pageEvents=new Map(),timers=new Map(),wire=[];let timerId=0;
 class Element{
  constructor(tag='div'){this.tagName=tag;this.children=[];this.handlers=new Map();this.dataset={};this.value='';this.hidden=false;this.disabled=false;this._text='';}
  set id(value){this._id=value;elements.set(value,this);}get id(){return this._id;}
  set textContent(value){this._text=value;this.children=[];}get textContent(){return this._text+this.children.map(e=>e.textContent).join('');}
  append(...children){this.children.push(...children);}
  replaceChildren(...children){for(const child of this.children)if(child.id)elements.delete(child.id);this.children=children;this._text='';}
  addEventListener(name,fn){this.handlers.set(name,fn);}
  querySelectorAll(tag){return this.children.flatMap(child=>[...(child.tagName===tag?[child]:[]),...child.querySelectorAll(tag)]);}
  focus(){}click(){return this.handlers.get('click')?.({preventDefault(){}});}submit(){return this.handlers.get('submit')?.({preventDefault(){}});}
 }
 const html=await readFile(new URL('../aiyou/vendor/canvas-model-settings/index.html',import.meta.url),'utf8');
 for(const match of html.matchAll(/<(\w+)\b[^>]*\bid="([^"]+)"[^>]*>/g)){const element=new Element(match[1]);element.id=match[2];}
 elements.get('catalog').value='[]';elements.get('defaults').value='{}';
 const document={getElementById:id=>elements.get(id),createElement:tag=>new Element(tag),querySelectorAll:()=>[]};
 const box={URL,URLSearchParams,document,crypto:{randomUUID},location:{search:'?'+new URLSearchParams(A)},window:{addEventListener:(name,fn)=>pageEvents.set(name,fn)},
  setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id),
  fetch:async(_url,options)=>{
   const input=JSON.parse(options.body);wire.push({input,keepalive:options.keepalive});
   assert.equal(input.sessionId,A.sessionId);assert.equal(input.projectId,A.projectId);
   try{const value=input.command==='aiyouplus_model_config'?{profiles:{host:{provider:'host',available:true,capabilities:{selected:{provider:'deepseek-official',model:'deepseek-flash'}}}}}:await f.service.invoke(input.command,input.args,input);return{ok:true,json:async()=>({ok:true,value})};}
   catch(e){return{ok:false,json:async()=>({ok:false,error:{message:e.message}})};}
  }};
 vm.runInNewContext(await readFile(new URL('../aiyou/vendor/canvas-model-settings/app.js',import.meta.url),'utf8'),box);
 await tick();return{elements,wire,pageEvents,timers,async poll(){const callback=timers.values().next().value;timers.clear();callback?.();await tick();}};
}
test('actual settings client binds native enable/select/text/secret and clears answers; page mount never initiates OAuth or changes media draft',async t=>{
 const f=fixture(t,{flow:async session=>{await session.prompt({kind:'select',message:'strategy',options:[{id:'browser',label:'Browser'}]});await session.prompt({kind:'text',message:'redirect'});await session.prompt({kind:'secret',message:'secret'});await commit(session);}}),ui=await uiFixture(f),get=id=>ui.elements.get(id);
 assert.deepEqual(ui.wire.map(r=>r.input.command).sort(),['aiyouplus_model_config','dsh_codex_status']);assert.equal(f.calls.length,0);get('api-key').value='unsubmitted-media-draft';
 get('codex-enable').click();await tick();assert.equal(f.mutations.length,1);assert.equal(get('api-key').value,'unsubmitted-media-draft');get('codex-begin').click();await tick();await ui.poll();assert.equal(f.calls.length,1);assert.equal(get('codex-answer').tagName,'select');
 get('codex-answer').value='browser';get('codex-prompt').submit();await tick();assert.equal(get('codex-answer').type,'text');get('codex-answer').value='fixture-only-redirect';get('codex-prompt').submit();await tick();assert.equal(get('codex-answer').type,'password');const secretInput=get('codex-answer');secretInput.value='fixture-only-secret';get('codex-prompt').submit();assert.equal(secretInput.value,'');await tick();get('codex-refresh').click();await tick();
 assert.match(get('codex-status').textContent,/凭证保存成功/);assert.match(get('codex-status').textContent,/实际模型调用尚未验证/);assert.equal(get('codex-prompt').hidden,true);assert.equal(get('api-key').value,'unsubmitted-media-draft');assert.equal(JSON.stringify(ui.wire).includes('private-fixture-token'),false);
 const replies=ui.wire.filter(r=>r.input.command==='dsh_codex_respond');assert.equal(replies.length,3);assert.deepEqual(replies.map(r=>r.input.args.answer),['browser','fixture-only-redirect','fixture-only-secret']);assert.equal(ui.wire.some(r=>r.input.command==='aiyouplus_model_configure'),false);
 get('codex-begin').click();await tick();await ui.poll();assert.equal(f.calls.length,2,'an explicit reconnect after a completed attempt remains usable');get('codex-cancel').click();await tick();
});
test('actual settings pagehide sends scoped keepalive cancellation and clears its current answer',async t=>{
 const f=fixture(t,{flow:async session=>session.prompt({kind:'secret',message:'secret'})}),ui=await uiFixture(f);ui.elements.get('codex-begin').click();await tick();await ui.poll();const input=ui.elements.get('codex-answer');input.value='unsent-answer';ui.pageEvents.get('pagehide')();await tick();assert.equal(input.value,'');const close=ui.wire.at(-1);assert.equal(close.input.command,'dsh_codex_cancel');assert.equal(close.keepalive,true);assert.equal(JSON.stringify(close.input).includes('unsent-answer'),false);assert.equal(f.auth.running.size,0);assert.equal(ui.timers.size,0);
});
test('early page close cancels only its scoped begin request, even when close reaches service before begin',async t=>{
 const f=fixture(t,{flow:async session=>session.prompt({kind:'text',message:'code'})});
 await f.invoke('cancel',{requestId:'closing-request'});await assert.rejects(f.invoke('begin',{requestId:'closing-request'}),e=>e.code==='ABORTED');assert.equal(f.calls.length,0);
 await f.invoke('begin',{requestId:'another-request'});const active=await f.until(s=>Boolean(s.prompt));await f.invoke('cancel',{requestId:'stale-unrelated-request'});assert.equal((await f.invoke('status')).attemptId,active.attemptId);assert.equal((await f.invoke('status')).status,'running');
 await f.invoke('cancel',{requestId:'another-request'});await f.until(s=>s.status==='cancelled');
 const g=fixture(t,{flow:async session=>session.prompt({kind:'text',message:'code'})}),ui=await uiFixture(g);ui.elements.get('codex-begin').click();ui.pageEvents.get('pagehide')();await tick();const close=ui.wire.find(r=>r.input.command==='dsh_codex_cancel');assert.ok(close?.input.args.requestId);assert.equal(close.keepalive,true);assert.equal(g.auth.running.size,0);
});
