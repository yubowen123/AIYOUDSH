import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../aiyou/modules/session-context/client.js',import.meta.url),'utf8');
const pause=()=>new Promise(resolve=>setImmediate(resolve));
const deferred=()=>{let resolve;const promise=new Promise(yes=>{resolve=yes;});return{promise,resolve};};
const text=n=>typeof n==='string'?n:(n?.children||[]).map(text).join('');
function nodes(tree){return !tree||typeof tree!=='object'?[]:[tree,...(tree.children||[]).flatMap(nodes)];}
const saved={goal:'已保存目标',progress:'已保存进度',nextStep:'已保存下一步',agreements:['保留既有约定'],references:['./existing.md']};
const automatic={...saved,goal:'新提取目标',progress:'新提取进度'};
const snapshot=(fresh=false)=>({facts:{title:'当前对话'},saved,savedVersion:4,draft:{context:fresh?automatic:saved,warnings:[]},historyCount:3});
function fixture(fetcher,sessionId='session-A'){
 let definition,register,active,index=0,queued=false,tree,dead=false,props={sessionId},effects=[];const hooks=[];
 const schedule=()=>{if(!dead&&!queued){queued=true;queueMicrotask(()=>{queued=false;render();});}};
 const changed=(a,b)=>!a||!b||a.length!==b.length||a.some((v,i)=>!Object.is(v,b[i]));
 const React={createElement:(type,p,...children)=>({type,props:p||{},children:children.flat(Infinity)}),
  useState(initial){const i=index++;hooks[i]??={value:typeof initial==='function'?initial():initial};return[hooks[i].value,v=>{hooks[i].value=typeof v==='function'?v(hooks[i].value):v;schedule();}];},
  useRef(initial){const i=index++;hooks[i]??={current:initial};return hooks[i];},
  useCallback(fn,deps){const i=index++;if(changed(hooks[i]?.deps,deps))hooks[i]={deps,value:fn};return hooks[i].value;},
  useEffect(fn,deps){const i=index++;if(changed(hooks[i]?.deps,deps)){const previous=hooks[i];hooks[i]={deps};effects.push(()=>{previous?.cleanup?.();hooks[i].cleanup=fn();});}}};
 vm.runInNewContext(source,{window:{__ModuleLoader__:{load:d=>{definition=d;}}},fetch:fetcher,URLSearchParams,structuredClone});
 definition.factory(()=>React).apply({effect:fn=>fn(),sidebarRightTabs:{register:()=>()=>{}},slots:{inject:(_n,fn)=>fn(),register:(_n,c)=>{register=c;return()=>{};}}});
 let element=register({sessionId,useTabInfo:()=>({tab:{navigation:{params:{sessionId}}}})});
 while(typeof element.type==='function'&&element.type.name!=='SessionContext')element=element.type(element.props);
 const component=element.type;props=element.props;
 function render(){if(dead)return;index=0;effects=[];active=true;tree=component(props);active=false;for(const effect of effects)effect();}
 render();
 return{all:()=>nodes(tree),area:i=>nodes(tree).filter(n=>n.type==='textarea')[i],button:label=>nodes(tree).find(n=>n.type==='button'&&text(n)===label),text:()=>text(tree),
  edit(i,value){const area=this.area(i);area.props.onChange({target:{value}});},
  async click(label){const button=this.button(label);assert.ok(button,'button '+label);await button.props.onClick();await pause();},
  session(id){props={...props,sessionId:id};render();},
  unmount(){dead=true;for(const hook of hooks)hook?.cleanup?.();},
  nativeSession(){let value=register({useTabInfo:()=>({tab:{navigation:{params:{sessionId:'native-tab-session'}}}})});while(typeof value.type==='function'&&value.type.name!=='SessionContext')value=value.type(value.props);return value.props.sessionId;}};
}
function response(value,ok=true,status=ok?200:503){return{ok,status,json:async()=>value};}

test('native tab params provide the exact session identity',async()=>{
 const f=fixture(async()=>response(snapshot()));await pause();assert.equal(f.nativeSession(),'native-tab-session');f.unmount();
});
test('restore explicitly requests fresh extraction and leaves it unsaved',async()=>{
 const calls=[];const f=fixture(async(url,o)=>{calls.push({url,o});return response(snapshot(new URL(url,'http://fixture').searchParams.get('fresh')==='1'));});
 await pause();assert.equal(f.area(0).props.value,saved.goal);await f.click('恢复自动提取');assert.match(calls.at(-1).url,/fresh=1/);assert.equal(f.area(0).props.value,automatic.goal);assert.equal(f.button('保存草稿').props.disabled,false);assert.equal(calls.filter(c=>c.o?.method==='POST').length,0);f.unmount();
});
test('save preserves readonly agreements/references and does not mark later edits saved',async()=>{
 const gate=deferred(),calls=[];const f=fixture(async(url,o)=>{if(o?.method==='POST'){calls.push(JSON.parse(o.body));await gate.promise;return response({version:5});}return response(snapshot());});
 await pause();f.edit(0,'提交的修改');await pause();const pending=f.click('保存草稿');await pause();assert.equal(f.area(0).props.disabled,true);
 f.edit(0,'保存途中更新');await pause();gate.resolve();await pending;await pause();assert.equal(calls[0].context.goal,'提交的修改');assert.deepEqual(calls[0].context.agreements,saved.agreements);assert.deepEqual(calls[0].context.references,saved.references);assert.equal(f.area(0).props.value,'保存途中更新');assert.equal(f.button('保存草稿').props.disabled,false);f.unmount();
});
test('a delayed read cannot overwrite a newer edit or a different session',async()=>{
 const gates=[deferred(),deferred()],calls=[];const f=fixture(async(url)=>{calls.push(url);if(calls.length===1)return response(snapshot());if(calls.length===2){await gates[0].promise;return response(snapshot(true));}await gates[1].promise;return response({...snapshot(),saved:{...saved,goal:'B会话目标'}});});
 await pause();const refreshing=f.click('刷新');await pause();f.edit(0,'读取期间的新字');await pause();gates[0].resolve();await refreshing;await pause();assert.equal(f.area(0).props.value,'读取期间的新字');
 const old=f.click('刷新');await pause();f.session('session-B');await pause();gates[1].resolve();await old;await pause();assert.ok(calls.at(-1).includes('session-B'));assert.equal(f.area(0).props.value,'B会话目标');f.unmount();
});
test('failed save retains the draft and exposes retry without claiming saved',async()=>{
 const f=fixture(async(_url,o)=>o?.method==='POST'?response({error:'保存失败，可重试'},false):response(snapshot()));await pause();f.edit(1,'尚未保存进度');await pause();await f.click('保存草稿');assert.equal(f.area(1).props.value,'尚未保存进度');assert.equal(f.button('保存草稿').props.disabled,false);assert.match(f.text(),/保存失败，可重试/);f.unmount();
});


test('CAS conflict preserves the draft, requires a fresh comparison and only explicitly resubmits against the latest version',async()=>{
 const calls=[];let reads=0,posts=0;const remote={...saved,goal:'另一窗口目标'};
 const f=fixture(async(_url,options)=>{if(options?.method==='POST'){calls.push(JSON.parse(options.body));if(++posts===1)return response({error:'其他窗口已更新，请刷新核对',code:'CONTEXT_VERSION_CONFLICT',currentVersion:5},false,409);return response({version:6,context:calls.at(-1).context});}return response(++reads===1?snapshot():{...snapshot(),saved:remote,savedVersion:5,draft:{context:remote,warnings:[]}});});
 await pause();f.edit(0,'本地未保存目标');await pause();await f.click('保存草稿');assert.equal(calls[0].expectedVersion,4);assert.equal(calls[0].version,undefined);assert.equal(f.area(0).props.value,'本地未保存目标');assert.equal(f.button('请先刷新核对').props.disabled,true);assert.match(f.text(),/本地草稿已保留/);assert.equal(posts,1);
 await f.click('刷新');assert.equal(f.area(0).props.value,'本地未保存目标');assert.match(f.text(),/另一窗口目标/);assert.equal(f.button('确认用本地草稿保存').props.disabled,false);assert.equal(posts,1);
 await f.click('确认用本地草稿保存');assert.equal(posts,2);assert.equal(calls[1].expectedVersion,5);assert.equal(calls[1].context.goal,'本地未保存目标');assert.equal(f.button('已保存').props.disabled,true);assert.match(f.text(),/已保存 v6/);f.unmount();
});
test('a delayed conflict from another session cannot lock or alter the newly selected session',async()=>{
 const gate=deferred();const f=fixture(async(url,options)=>{if(options?.method==='POST'){await gate.promise;return response({error:'old conflict',code:'CONTEXT_VERSION_CONFLICT'},false,409);}return response(new URL(url,'http://fixture').searchParams.get('session')==='session-B'?{...snapshot(),saved:{...saved,goal:'B目标'}}:snapshot());});
 await pause();f.edit(0,'A修改');await pause();const pending=f.click('保存草稿');await pause();f.session('session-B');await pause();gate.resolve();await pending;await pause();assert.equal(f.area(0).props.value,'B目标');assert.equal(f.button('请先刷新核对'),undefined);assert.doesNotMatch(f.text(),/old conflict/);f.unmount();
});
