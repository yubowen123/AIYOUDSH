import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const modules=['efficiency','session-transcript','conversation-folders','usage','reset-monitor'];
const sources=Object.fromEntries(await Promise.all(modules.map(async name=>[name,await readFile(new URL(`../aiyou/modules/${name}/client.js`,import.meta.url),'utf8')])));
const pause=()=>new Promise(resolve=>setImmediate(resolve));
const deferred=()=>{let resolve;const promise=new Promise(done=>{resolve=done;});return{promise,resolve};};
const response=(value,ok=true)=>({ok,status:ok?200:400,json:async()=>structuredClone(value)});
const text=node=>node==null||node===false?'':typeof node!=='object'?String(node):(node.children||[]).map(text).join('');
const nodes=tree=>!tree||typeof tree!=='object'?[]:[tree,...(tree.children||[]).flatMap(nodes)];
const url=value=>new URL(value,'https://fixture.invalid');

// Execute each unchanged client with deterministic React hooks and mocked fetch.
// Component identities include React keys: changing a native tab's key unmounts
// old hook instances and runs their cleanups before mounting the new effects.
function fixture(module,handler,{params={},props={},now=1900000000000}={}){
 let definition,slot,tree,queued=false,dead=false,current,index=0,effects=[],boundaries=[];
 let nativeParams={...params},clock=now,timerId=0;const instances=new Map(),timers=new Map(),calls=[];
 const changed=(a,b)=>!a||!b||a.length!==b.length||a.some((value,i)=>!Object.is(value,b[i]));
 const schedule=()=>{if(!dead&&!queued){queued=true;queueMicrotask(()=>{queued=false;render();});}};
 const memo=(make,deps)=>{const i=index++;if(changed(current.hooks[i]?.deps,deps))current.hooks[i]={deps,value:make()};return current.hooks[i].value;};
 const React={
  Fragment:'fixture-fragment',
  createElement:(type,p,...children)=>({type,props:p||{},children:children.flat(Infinity)}),
  useState(initial){const owner=current,i=index++;owner.hooks[i]??={value:typeof initial==='function'?initial():initial};return[owner.hooks[i].value,value=>{if(!owner.active)return;const next=typeof value==='function'?value(owner.hooks[i].value):value;if(!Object.is(next,owner.hooks[i].value)){owner.hooks[i].value=next;schedule();}}];},
  useRef(initial){const i=index++;current.hooks[i]??={current:initial};return current.hooks[i];},
  useCallback:(fn,deps)=>memo(()=>fn,deps),useMemo:memo,
  useEffect(fn,deps){const owner=current,i=index++;if(changed(owner.hooks[i]?.deps,deps)){const previous=owner.hooks[i];owner.hooks[i]={deps};effects.push(()=>{previous?.cleanup?.();owner.hooks[i].cleanup=fn();});}},
 };
 const fetcher=async(resource,options={})=>{const call={url:String(resource),method:options.method||'GET',body:options.body?JSON.parse(options.body):undefined};calls.push(call);return handler(call);};
 vm.runInNewContext(sources[module],{
  window:{__ModuleLoader__:{load:value=>{definition=value;}}},fetch:fetcher,URLSearchParams,structuredClone,
  Date:class extends Date{static now(){return clock;}},
  setInterval:(fn,delay)=>{const id=++timerId;timers.set(id,{fn,delay});return id;},clearInterval:id=>timers.delete(id),
 },{filename:`${module}/client.js`});
 definition.factory(name=>{assert.equal(name,'react');return React;}).apply({effect:fn=>fn(),sidebarRightTabs:{register(){}},sidebarRight:{},slots:{inject:(_name,fn)=>fn(),register:(_name,component)=>{slot=component;}}});
 function render(){
  if(dead)return;effects=[];boundaries=[];const seen=new Set();
  const expand=(node,location)=>{
   if(!node||typeof node!=='object')return node;
   if(typeof node.type==='function'){
    const id=`${location}/${node.type.name}:${node.props.key??''}`;let owner=instances.get(id);
    if(!owner){owner={hooks:[],active:true};instances.set(id,owner);}seen.add(id);owner.active=true;current=owner;index=0;
    boundaries.push({name:node.type.name,key:node.props.key,props:node.props});
    return expand(node.type(node.props),id);
   }
   return{...node,children:node.children.map((child,i)=>expand(child,`${location}/${child?.props?.key??i}`))};
  };
  tree=expand(slot({...props,useTabInfo:()=>({tab:{navigation:{params:nativeParams}}})}),'root');
  for(const [id,owner]of instances){if(!seen.has(id)){owner.active=false;for(const hook of owner.hooks)hook?.cleanup?.();instances.delete(id);}}
  for(const effect of effects)effect();
 }
 render();
 return{
  calls,timers,all:()=>nodes(tree),text:()=>text(tree),boundaries:()=>boundaries,
  button:label=>nodes(tree).find(node=>node.type==='button'&&text(node)===label),
  input:label=>nodes(tree).find(node=>node.type==='input'&&(node.props['aria-label']===label||node.props.placeholder===label)),
  async click(label,{force=false}={}){const button=this.button(label);assert.ok(button,'button '+label);if(!force)assert.equal(!!button.props.disabled,false,'button enabled: '+label);await button.props.onClick();await pause();},
  async edit(label,value){const input=this.input(label);assert.ok(input,'input '+label);input.props.onChange({target:{value}});await pause();},
  async navigation(params){nativeParams={...params};render();await pause();},
  async tickAt(value){clock=value;for(const [id,timer]of [...timers])if(timers.has(id))timer.fn();await pause();},
  unmount(){dead=true;for(const owner of instances.values()){owner.active=false;for(const hook of owner.hooks)hook?.cleanup?.();}instances.clear();},
 };
}

const efficiencyRead=()=>({layers:{global:{},project:{},session:{}},resolved:{mode:'smart',enabled:true,contextBudget:1400},appliedBy:{},instruction:'fixture policy',modes:['smart','concise','detailed'],section:{name:'fixture',order:700}});
function efficiencyWrite(call){const {session,project,scope,patch}=call.body;return response({layers:{global:{},projects:{[project]:scope==='project'?patch:{}},sessions:{[session]:scope==='session'?patch:{}}},resolved:{...efficiencyRead().resolved,...patch},appliedBy:{mode:scope},instruction:'updated fixture policy'});}

test('efficiency native tab identity supplies exact session and project to GET and both scoped POSTs',async()=>{
 const f=fixture('efficiency',call=>call.method==='POST'?efficiencyWrite(call):response(efficiencyRead()),{params:{sessionId:'native-A',project:'/fixture/project-A'},props:{sessionId:'wrong-prop',project:'/wrong-project'}});
 await pause();assert.equal(url(f.calls[0].url).searchParams.get('session'),'native-A');assert.equal(url(f.calls[0].url).searchParams.get('project'),'/fixture/project-A');
 await f.click('当前对话');assert.equal(f.input('输出偏好对话 ID').props.value,'native-A');await f.click('详细');
 assert.deepEqual(f.calls.find(call=>call.method==='POST').body,{scope:'session',id:'native-A',patch:{mode:'detailed'},project:'/fixture/project-A',session:'native-A'});
 await f.click('项目');assert.equal(f.input('输出偏好项目目录').props.value,'/fixture/project-A');await f.click('精简');
 assert.equal(f.calls.filter(call=>call.method==='POST').at(-1).body.id,'/fixture/project-A');assert.equal(f.calls.some(call=>url(call.url).searchParams.get('session')==='current'),false);f.unmount();
});

test('efficiency rejects empty session and project writes without a latest/current fallback',async()=>{
 const f=fixture('efficiency',()=>response(efficiencyRead()));await pause();assert.equal(f.calls.length,1);assert.equal(url(f.calls[0].url).searchParams.has('session'),false);
 await f.click('当前对话');assert.equal(f.button('详细').props.disabled,true);await f.click('详细',{force:true});await f.click('清除对话层',{force:true});
 await f.click('项目');assert.equal(f.button('详细').props.disabled,true);await f.click('详细',{force:true});await f.click('清除项目层',{force:true});
 assert.equal(f.calls.filter(call=>call.method==='POST').length,0);assert.match(f.text(),/请先填写/);assert.doesNotMatch(f.text(),/最近活动会话/);assert.equal(f.calls.length,1);f.unmount();
});

test('efficiency normalizes returned projects/sessions maps so the selected layer retains its override badge',async()=>{
 const f=fixture('efficiency',call=>call.method==='POST'?efficiencyWrite(call):response(efficiencyRead()),{params:{sessionId:'session-A',project:'/fixture/A'}});await pause();
 await f.click('当前对话');assert.doesNotMatch(f.text(),/本层已覆盖/);await f.click('详细');assert.match(f.text(),/本层已覆盖/);assert.match(f.text(),/当前对话：\{"mode":"detailed"\}/);
 await f.click('项目');assert.doesNotMatch(f.text(),/本层已覆盖/);await f.click('精简');assert.match(f.text(),/本层已覆盖/);assert.match(f.text(),/项目：\{"mode":"concise"\}/);f.unmount();
});

const transcript=id=>({sessionId:id,frames:1,framesFailed:0,events:2,kept:1,roles:{user:1,assistant:0},preview:[{index:1,role:'user',excerpt:`transcript-${id}`}],note:'fixture readable copy'});
const folder=id=>({sessionId:id,title:`folder-${id}`,entry:{path:`/fixture/${id}`},workspace:'/fixture',exists:true,markerPresent:true,context:`rule-${id}`,section:{name:'fixture',order:1}});

test('transcript native A/B tab params change component keys and export only the selected session',async()=>{
 const f=fixture('session-transcript',call=>call.method==='POST'?response({dir:'/fixture',files:['copy.md'],kept:1}):response(transcript(url(call.url).searchParams.get('session'))),{params:{sessionId:'A'},props:{sessionId:'wrong-prop'}});
 await pause();assert.equal(f.boundaries().find(b=>b.name==='SessionTranscript').key,'A');assert.match(f.text(),/transcript-A/);await f.click('导出 md + json');assert.deepEqual(f.calls.find(call=>call.method==='POST').body,{session:'A'});
 await f.navigation({sessionId:'B'});assert.equal(f.boundaries().find(b=>b.name==='SessionTranscript').key,'B');assert.match(f.text(),/transcript-B/);assert.doesNotMatch(f.text(),/transcript-A/);await f.click('导出 md + json');assert.deepEqual(f.calls.filter(call=>call.method==='POST').at(-1).body,{session:'B'});f.unmount();
});

test('transcript ignores a delayed A response after remounting native session B',async()=>{
 const gate=deferred();const f=fixture('session-transcript',async call=>{const id=url(call.url).searchParams.get('session');if(id==='A')await gate.promise;return response(transcript(id));},{params:{sessionId:'A'}});
 await pause();assert.equal(f.button('导出 md + json').props.disabled,true);await f.navigation({sessionId:'B'});assert.match(f.text(),/transcript-B/);gate.resolve();await pause();assert.match(f.text(),/transcript-B/);assert.doesNotMatch(f.text(),/transcript-A/);assert.equal(f.calls.length,2);f.unmount();
});

test('transcript with no session does not read latest or export even if a disabled handler is invoked',async()=>{
 const f=fixture('session-transcript',()=>{throw Error('No request permitted');});await pause();assert.equal(f.calls.length,0);assert.match(f.text(),/未指定对话时不会读取最近活动对话/);assert.equal(f.button('导出 md + json').props.disabled,true);
 await f.click('导出 md + json',{force:true});await f.click('刷新');assert.equal(f.calls.length,0);f.unmount();
});

test('folder native A/B tab params change component keys and reveal/open only the selected session',async()=>{
 const f=fixture('conversation-folders',call=>call.method==='POST'?response({path:'/fixture/opened'}):response(folder(url(call.url).searchParams.get('session'))),{params:{sessionId:'A'},props:{sessionId:'wrong-prop'}});
 await pause();assert.equal(f.boundaries().find(b=>b.name==='ConversationFolders').key,'A');await f.click('定位输出目录');assert.equal(url(f.calls.at(-1).url).searchParams.get('session'),'A');assert.equal(url(f.calls.at(-1).url).searchParams.get('mode'),'reveal');
 await f.navigation({sessionId:'B'});assert.equal(f.boundaries().find(b=>b.name==='ConversationFolders').key,'B');assert.match(f.text(),/folder-B/);assert.doesNotMatch(f.text(),/folder-A/);await f.click('直接打开目录');assert.equal(url(f.calls.at(-1).url).searchParams.get('session'),'B');assert.equal(url(f.calls.at(-1).url).searchParams.get('mode'),'open');f.unmount();
});

test('folder ignores a delayed read when its explicit session input changes within the same component',async()=>{
 const gate=deferred();const f=fixture('conversation-folders',async call=>{const id=url(call.url).searchParams.get('session');if(id==='A')await gate.promise;return response(folder(id));},{params:{sessionId:'A'}});
 await pause();assert.equal(f.button('直接打开目录').props.disabled,true);await f.edit('输出目录对话 ID','B');assert.match(f.text(),/folder-B/);gate.resolve();await pause();assert.match(f.text(),/folder-B/);assert.doesNotMatch(f.text(),/folder-A/);assert.equal(f.calls.length,2);f.unmount();
});

test('folder with no session never reads latest or invokes reveal/open',async()=>{
 const f=fixture('conversation-folders',()=>{throw Error('No request permitted');});await pause();assert.equal(f.calls.length,0);assert.equal(f.button('定位输出目录').props.disabled,true);assert.equal(f.button('直接打开目录').props.disabled,true);
 await f.click('定位输出目录',{force:true});await f.click('直接打开目录',{force:true});await f.click('查询');assert.equal(f.calls.length,0);assert.match(f.text(),/明确指定对话 ID/);f.unmount();
});

const usageSnapshot={sessions:[{id:'A',title:'Usage-A',tokens:{output:10},context:{},stats:{turns:1,steps:2}},{id:'B',title:'Usage-B',tokens:{output:20},context:{},stats:{turns:2,steps:3}}],currentSessionId:'B',currentSessionIdSource:'latest',aggregate:{output:30,uncachedInput:40,cacheRead:50,turns:3,steps:5,llmMs:1000,toolMs:2000}};

test('usage prioritizes the native tab session, shows each session once, and preserves aggregate totals',async()=>{
 const f=fixture('usage',()=>response(usageSnapshot),{params:{sessionId:'A'},props:{sessionId:'B'}});await pause();
 const cards=f.boundaries().filter(b=>b.name==='SessionCard');assert.deepEqual(cards.map(b=>b.props.session.id),['A','B']);assert.equal(cards[0].props.badge,'当前会话');assert.equal(cards[1].props.badge,undefined);
 assert.match(f.text(),/全部会话合计/);assert.equal((f.text().match(/Usage-A/g)||[]).length,1);assert.equal((f.text().match(/Usage-B/g)||[]).length,1);assert.match(f.text(),/模型耗时1.0s/);f.unmount();
});

test('usage retains recent-activity fallback when the selected session is absent or no tab session exists',async()=>{
 const f=fixture('usage',()=>response(usageSnapshot),{params:{sessionId:'missing'}});await pause();
 let cards=f.boundaries().filter(b=>b.name==='SessionCard');assert.equal(cards[0].props.session.id,'B');assert.equal(cards[0].props.badge,'最近写入');assert.deepEqual(cards.map(b=>b.props.session.id),['B','A']);assert.match(f.text(),/全部会话合计/);
 await f.navigation({});cards=f.boundaries().filter(b=>b.name==='SessionCard');assert.equal(cards[0].props.session.id,'B');assert.equal(cards[0].props.badge,'最近写入');assert.equal(f.calls.length,1);f.unmount();
});

test('reset countdown advances locally, clears after the last deadline, and clears on unmount without fetching',async()=>{
 const now=1900000000000;const data={pressure:{available:false,reason:'fixture'},events:[{key:'first',confidence:80,status:'已核对时间',resetType:'direct',countdownAt:now+90000,band:'yellow',excerpt:'first',timing:{},deliveryNote:'fixture'},{key:'last',confidence:80,status:'已核对时间',resetType:'direct',countdownAt:now+190000,band:'yellow',excerpt:'last',timing:{},deliveryNote:'fixture'}],settings:{enabled:true,intervalMinutes:15,feeds:[]},health:{},semantics:{}};
 const f=fixture('reset-monitor',()=>response(data),{now});await pause();assert.match(f.text(),/1 分钟后/);assert.equal(f.timers.size,1);assert.equal(f.calls.length,1);
 await f.tickAt(now+100000);assert.match(f.text(),/已到时 · 待核验/);assert.equal(f.timers.size,1);assert.equal(f.calls.length,1);
 await f.tickAt(now+200000);assert.equal((f.text().match(/已到时 · 待核验/g)||[]).length,2);assert.equal(f.timers.size,0);assert.equal(f.calls.length,1);f.unmount();
 const active=fixture('reset-monitor',()=>response(data),{now});await pause();assert.equal(active.timers.size,1);active.unmount();assert.equal(active.timers.size,0);assert.equal(active.calls.length,1);
});
