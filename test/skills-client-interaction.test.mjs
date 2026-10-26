import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../aiyou/modules/skills/client.js',import.meta.url),'utf8');
const reply=(value,ok=true)=>({ok,status:ok?200:400,json:async()=>structuredClone(value)});
const pause=()=>new Promise(resolve=>setImmediate(resolve));
const text=node=>node==null||node===false?'':typeof node!=='object'?String(node):(node.children||[]).map(text).join('');
const nodes=tree=>!tree||typeof tree!=='object'?[]:[tree,...(tree.children||[]).flatMap(nodes)];
const skill={id:'test-skill',name:'test-skill',title:'测试 Skill',description:'测试说明',categoryId:'writing',classificationSource:'auto',source:'fixture',path:'/fixture/SKILL.md',instructions:'测试正文'};
const catalog={catalog:[skill],groups:[{id:'all',label:'全部',builtin:true},{id:'writing',label:'创作',builtin:true},{id:'design',label:'设计',builtin:true}],favorites:[],stats:{total:1}};

// The real client runs unchanged in an isolated VM. Fetch and React's hooks are
// deterministic fixtures; no host/profile/API or browser services are loaded.
function fixture(handler=()=>null){
 let definition,slot,index=0,queued=false,tree,dead=false,effects=[];const hooks=[],calls=[];
 const changed=(a,b)=>!a||!b||a.length!==b.length||a.some((value,i)=>!Object.is(value,b[i]));
 const schedule=()=>{if(!dead&&!queued){queued=true;queueMicrotask(()=>{queued=false;render();});}};
 const memo=(fn,deps)=>{const i=index++;if(changed(hooks[i]?.deps,deps))hooks[i]={deps,value:fn()};return hooks[i].value;};
 const React={
  createElement:(type,props,...children)=>({type,props:props||{},children:children.flat(Infinity)}),
  useState(initial){const i=index++;hooks[i]??={value:typeof initial==='function'?initial():initial};return[hooks[i].value,value=>{const next=typeof value==='function'?value(hooks[i].value):value;if(!Object.is(next,hooks[i].value)){hooks[i].value=next;schedule();}}];},
  useCallback:(fn,deps)=>memo(()=>fn,deps),useMemo:memo,
  useEffect(fn,deps){const i=index++;if(changed(hooks[i]?.deps,deps)){const previous=hooks[i];hooks[i]={deps};effects.push(()=>{previous?.cleanup?.();hooks[i].cleanup=fn();});}},
 };
 const fetcher=async(url,options={})=>{const call={url,method:options.method||'GET',body:options.body?JSON.parse(options.body):undefined};calls.push(call);const custom=await handler(call);return custom??reply(url.includes('/detail')?skill:catalog);};
 vm.runInNewContext(source,{window:{__ModuleLoader__:{load:value=>{definition=value;}},prompt:()=>null},fetch:fetcher});
 definition.factory(()=>React).apply({effect:fn=>fn(),sidebarRightTabs:{register(){}},sidebarRight:{},slots:{inject:(_name,fn)=>fn(),register:(_name,fn)=>{slot=fn;}}});
 const root=slot({});const component=root.type;
 function render(){if(dead)return;index=0;effects=[];tree=component(root.props);for(const effect of effects)effect();}
 render();
 return{calls,text:()=>text(tree),all:()=>nodes(tree),input:placeholder=>nodes(tree).find(n=>n.type==='input'&&n.props.placeholder===placeholder),button:label=>nodes(tree).find(n=>n.type==='button'&&text(n)===label),card:()=>nodes(tree).find(n=>n.props.role==='button'),
  async edit(placeholder,value){const input=this.input(placeholder);assert.ok(input,'input '+placeholder);input.props.onChange({target:{value}});await pause();},
  async click(label){const button=this.button(label);assert.ok(button,'button '+label);assert.ok(!button.props.disabled,'button enabled '+label);await button.props.onClick({stopPropagation(){}});await pause();},
  async detail(){this.card().props.onClick();await pause();},
  unmount(){dead=true;for(const hook of hooks)hook?.cleanup?.();},
 };
}

test('failed category creation retains both draft fields and allows a successful retry',async()=>{
 let reject=true;const f=fixture(call=>call.url.endsWith('/groups')?reply(reject?{error:'分类创建失败'}:{ok:true},!reject):null);
 await pause();await f.click('+ 新建分类');await f.edit('分类名称','保留分类草稿');await f.edit('关键词（逗号分隔，按字面匹配）','图片，纹理');await f.click('创建');
 assert.equal(f.input('分类名称')?.props.value,'保留分类草稿');assert.equal(f.input('关键词（逗号分隔，按字面匹配）')?.props.value,'图片，纹理');assert.match(f.text(),/分类创建失败/);assert.equal(f.button('创建')?.props.disabled,false);
 reject=false;await f.click('创建');assert.equal(f.input('分类名称'),undefined);assert.equal(f.calls.filter(call=>call.url.endsWith('/groups')).length,2);
 await f.click('+ 新建分类');assert.equal(f.input('分类名称').props.value,'');assert.equal(f.input('关键词（逗号分隔，按字面匹配）').props.value,'');f.unmount();
});

for(const action of ['assign','favorite'])test(`a failed ${action} remains visible in the open detail and a retry clears it`,async()=>{
 let reject=true;const f=fixture(call=>call.url.endsWith('/'+action)?reply(reject?{error:'详情保存失败'}:{ok:true},!reject):null);
 await pause();await f.detail();await f.click(action==='assign'?'设计':'☆');
 assert.ok(f.button('返回列表'),'detail remains open');const alert=f.all().find(node=>node.props.role==='alert');assert.ok(alert,'detail exposes an alert');assert.match(text(alert),/详情保存失败/);
 reject=false;await f.click(action==='assign'?'设计':'☆');assert.doesNotMatch(f.text(),/详情保存失败/);assert.equal(f.all().some(node=>node.props.role==='alert'),false);f.unmount();
});

for(const key of ['Enter',' '])test(`nested favorite ${JSON.stringify(key)} does not trigger the card action`,async()=>{
 const f=fixture();await pause();const card=f.card(),favorite=nodes(card).find(node=>node.type==='button');let prevented=false;
 card.props.onKeyDown({key,target:favorite,currentTarget:card,preventDefault(){prevented=true;}});await pause();
 assert.equal(prevented,false);assert.equal(f.calls.some(call=>call.url.includes('/detail')),false);assert.ok(f.card(),'list remains open');
 await favorite.props.onClick({stopPropagation(){}});await pause();assert.equal(f.calls.filter(call=>call.url.endsWith('/favorite')).length,1);assert.equal(f.calls.some(call=>call.url.includes('/detail')),false);f.unmount();
});

for(const key of ['Enter',' '])test(`the focused card itself still opens detail with ${JSON.stringify(key)}`,async()=>{
 const f=fixture();await pause();const card=f.card();let prevented=false;
 card.props.onKeyDown({key,target:card,currentTarget:card,preventDefault(){prevented=true;}});await pause();
 assert.equal(prevented,true);assert.equal(f.calls.filter(call=>call.url.includes('/detail')).length,1);assert.ok(f.button('返回列表'));f.unmount();
});
