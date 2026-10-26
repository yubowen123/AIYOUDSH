import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

test('Agent Workspace renders real unscanned host response without scanning and accepts scanned scope arrays',async()=>{
 const root=await mkdtemp(join(tmpdir(),'dsh-agent-panel-')),previous=process.env.DSH_HOME;process.env.DSH_HOME=root;
 try{
  const routes=new Map();const ctx={get:()=>({requestRejection:()=>undefined}),effect:fn=>fn(),webServer:{register:route=>routes.set(route.path,route)},inject(_services,fn){fn(this);}};
  (await import('../aiyou/modules/agent-workspace/index.js?render='+Date.now())).apply(ctx);
  let response;await routes.get('/aiyoucodex-dsh/agent-workspace').handler({method:'GET',url:'/aiyoucodex-dsh/agent-workspace',headers:{}},{setHeader(){},writeHead(code){assert.equal(code,200);},end(raw){response=JSON.parse(raw);}});
  assert.equal(response.scope,'尚未运行本机检测');assert.equal(response.agents.length,0);
  let definition,render,seed,index;
  const React={createElement(type,props,...children){return typeof type==='function'?type(props):{type,props,children};},useState(initial){return[index++===0?seed:initial,()=>{}];},useCallback:fn=>fn,useEffect(){}};
  vm.runInNewContext(await readFile(new URL('../aiyou/modules/agent-workspace/client.js',import.meta.url),'utf8'),{window:{__ModuleLoader__:{load:value=>definition=value}}});
  const client=definition.factory(()=>React);client.apply({effect:fn=>fn(),sidebarRight:{},sidebarRightTabs:{register(){}},slots:{inject(_slot,fn){return fn();},register(_options,fn){render=fn;}}});
  const text=node=>typeof node==='string'?node:Array.isArray(node)?node.map(text).join(' '):node?.children?text(node.children):'';
  for(const [data,expected]of [[response,'扫描范围：尚未运行本机检测'],[{...response,scope:['/bounded/one','/bounded/two']},'扫描范围：/bounded/one · /bounded/two'],[null,'扫描范围：尚未运行本机检测']]){seed=data;index=0;const output=text(render({}));assert.ok(output.includes('Agent 工作区'));assert.ok(output.includes(expected),output);}
 }finally{if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;await new Promise(r=>setTimeout(r,30));await rm(root,{recursive:true,force:true});}
});
