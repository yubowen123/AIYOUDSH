import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../aiyou/modules/media-tools/client.js',import.meta.url),'utf8');
const pause=()=>new Promise(resolve=>setImmediate(resolve));
const deferred=()=>{let resolve;const promise=new Promise(done=>{resolve=done;});return{promise,resolve};};
const response=(value,ok=true)=>({ok,status:ok?200:503,json:async()=>ok?{ok:true,value}:{ok:false,error:value}});
const text=node=>node==null||node===false?'':typeof node!=='object'?String(node):(node.children||[]).map(text).join('');
const nodes=tree=>!tree||typeof tree!=='object'?[]:[tree,...(tree.children||[]).flatMap(nodes)];
const catalog=(id,{selected=false}={})=>({projects:[{projectId:`project-${id}`,title:`catalog-${id}`}],selectedProjectId:selected?`project-${id}`:null});
const parse=resource=>new URL(resource,'https://fixture.invalid');

// Real client code, deterministic hooks and mock fetch only. The native tab
// wrapper is re-evaluated on navigation so the same Workspace receives new props.
function fixture(handler,params={sessionId:'A',project:'/fixture/A'}){
 let definition,slot,tree,index=0,effects=[],queued=false,dead=false,currentParams={...params};const hooks=[],calls=[];
 const schedule=()=>{if(!dead&&!queued){queued=true;queueMicrotask(()=>{queued=false;render();});}};
 const changed=(a,b)=>!a||!b||a.length!==b.length||a.some((v,i)=>!Object.is(v,b[i]));
 const React={createElement:(type,props,...children)=>({type,props:props||{},children:children.flat(Infinity)}),
  useState(initial){const i=index++;hooks[i]??={value:typeof initial==='function'?initial():initial};return[hooks[i].value,value=>{if(dead)return;const next=typeof value==='function'?value(hooks[i].value):value;if(!Object.is(next,hooks[i].value)){hooks[i].value=next;schedule();}}];},
  useRef(initial){const i=index++;hooks[i]??={current:initial};return hooks[i];},
  useEffect(fn,deps){const i=index++;if(changed(hooks[i]?.deps,deps)){const previous=hooks[i];hooks[i]={deps};effects.push(()=>{previous?.cleanup?.();hooks[i].cleanup=fn();});}},
 };
 vm.runInNewContext(source,{window:{__ModuleLoader__:{load:value=>{definition=value;}}},crypto:{randomUUID:()=> 'fixture-panel'},URLSearchParams,
  fetch:async(resource,options={})=>{const call={url:String(resource),method:options.method||'GET',body:options.body?JSON.parse(options.body):undefined};calls.push(call);return handler(call);},
 },{filename:'media-tools/client.js'});
 definition.factory(name=>{assert.equal(name,'react');return React;}).apply({effect:fn=>fn(),sidebarRightTabs:{register(){}},slots:{inject:(_name,fn)=>fn(),register:(info,component)=>{if(info.name==='sidebar.right.pane.tab')slot=component;}}});
 function render(){if(dead)return;const element=slot({useTabInfo:()=>({tab:{navigation:{params:currentParams}}})});index=0;effects=[];tree=element.type(element.props);for(const effect of effects)effect();}
 render();return{calls,all:()=>nodes(tree),text:()=>text(tree),button:()=>nodes(tree).find(n=>n.type==='button'),select:()=>nodes(tree).find(n=>n.type==='select'),frame:()=>nodes(tree).find(n=>n.type==='iframe'),
  async refresh(){assert.equal(!!this.button().props.disabled,false);this.button().props.onClick();await pause();},
  async choose(projectId){assert.equal(!!this.select().props.disabled,false);this.select().props.onChange({target:{value:projectId}});await pause();},
  async navigation(next){currentParams={...next};render();await pause();},
  unmount(){dead=true;for(const hook of hooks)hook?.cleanup?.();},
 };
}

test('initial project failure stops loading and leaves a visible error with a usable retry',async()=>{
 const f=fixture(()=>response('fixture 项目读取失败',false));await pause();
 assert.match(f.text(),/fixture 项目读取失败/);assert.equal(f.all().some(n=>n.props.role==='alert'),true);assert.equal(f.all().some(n=>n.props.role==='status'),false);assert.doesNotMatch(f.text(),/正在读取本地项目|正在打开项目/);assert.equal(f.button().props.disabled,false);assert.equal(f.select().props.disabled,true);assert.equal(f.frame(),undefined);f.unmount();
});

test('successful refresh clears the old error and makes the refreshed project selectable',async()=>{
 let reads=0;const f=fixture(call=>call.method==='POST'?response({projectId:call.body.projectId}):++reads===1?response('fixture 旧错误',false):response(catalog('A')));await pause();assert.match(f.text(),/fixture 旧错误/);
 await f.refresh();assert.doesNotMatch(f.text(),/fixture 旧错误/);assert.equal(f.all().some(n=>n.props.role==='alert'),false);assert.equal(f.select().props.disabled,false);assert.match(f.text(),/catalog-A/);await f.choose('project-A');
 assert.ok(f.frame());const selected=parse(f.frame().props.src);assert.equal(selected.searchParams.get('projectId'),'project-A');assert.equal(selected.searchParams.get('sessionId'),'A');assert.deepEqual(f.calls.find(call=>call.method==='POST').body,{sessionId:'A',projectId:'project-A'});f.unmount();
});

test('late catalog and project-open responses from scope A cannot overwrite scope B',async()=>{
 const catalogGate=deferred();const f=fixture(async call=>{const session=parse(call.url).searchParams.get('sessionId');if(session==='A')await catalogGate.promise;return response(catalog(session));});
 await pause();await f.navigation({sessionId:'B',project:'/fixture/B'});assert.match(f.text(),/catalog-B/);catalogGate.resolve();await pause();assert.match(f.text(),/catalog-B/);assert.doesNotMatch(f.text(),/catalog-A/);assert.equal(f.calls.length,2);f.unmount();

 const openGate=deferred();const g=fixture(async call=>{if(call.method==='GET')return response(catalog(parse(call.url).searchParams.get('sessionId'),{selected:true}));if(call.body.sessionId==='A')await openGate.promise;return response({projectId:call.body.projectId});});
 await pause();assert.equal(g.frame(),undefined);await g.navigation({sessionId:'B',project:'/fixture/B'});assert.equal(parse(g.frame().props.src).searchParams.get('projectId'),'project-B');
 openGate.resolve();await pause();assert.equal(parse(g.frame().props.src).searchParams.get('projectId'),'project-B');assert.equal(parse(g.frame().props.src).searchParams.get('sessionId'),'B');assert.doesNotMatch(g.text(),/catalog-A/);assert.equal(g.all().some(n=>n.props.role==='alert'),false);g.unmount();
});
