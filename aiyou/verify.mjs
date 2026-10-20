import assert from 'node:assert/strict';
import {mkdtemp,mkdir,rm,writeFile,readFile,readdir} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=dirname(fileURLToPath(import.meta.url));
const fixture=await mkdtemp(join(root,'.verification-'));
process.env.DSH_HOME=join(fixture,'new-profile');
const results=[];
const {service,stopServices}=await import('./services.mjs');
try{
  for(const module of JSON.parse(await readFile(join(root,'manifest.json'),'utf8')).modules){
    if(!module.client)continue;
    let definition;
    vm.runInNewContext(await readFile(join(root,'modules',module.id,'client.js'),'utf8'),{window:{__ModuleLoader__:{load:value=>{definition=value;}}},console});
    assert.equal(definition.id,module.name);assert.equal(typeof definition.factory,'function');
    // Applying registers native slots only. React hooks cannot run as a hidden production self-test.
    const plugin=definition.factory(name=>name==='react'?{createElement:()=>({}),Fragment:'fragment'}:(()=>{throw new Error('unexpected require '+name);})());
    assert.equal(typeof plugin.apply,'function');
    const applyContext={effect:()=>{},slots:{},sidebarRightTabs:{},theme:{}};
    plugin.apply(applyContext);
  }
  results.push({check:'all-client-entry-factories',ok:true});
  const {guardContext}=await import('./runtime.mjs');
  let guarded,checks=0;const base={get:()=>({requestRejection:()=>{checks++;return 401;}}),webServer:{register:route=>{guarded=route;return()=>{};}}};
  guardContext(base).webServer.register({handler:()=>{throw new Error('unauthenticated route executed');}});
  let status;let payload;await guarded.handler({method:'GET',headers:{}},{writeHead:code=>{status=code;},end:text=>{payload=text;}});
  assert.equal(status,401);assert.equal(checks,1);assert.match(payload,/登录/u);
  results.push({check:'native-connection-admission-required',ok:true});
  const board=await service('taskboard');
  let response=await fetch(board.origin+'/api/projects',{headers:{'x-aiyou-internal-token':board.token}});assert.equal(response.status,200);
  const projects=await response.json();assert.deepEqual(projects.projects.map(p=>[p.id,p.name]),[['local','Local']]);
  response=await fetch(board.origin+'/api/projects',{method:'POST',headers:{'content-type':'application/json','x-aiyou-internal-token':board.token},body:JSON.stringify({id:'fixture-project',name:'隔离验证项目'})});
  const created=await response.json();assert.equal(response.status,201,JSON.stringify(created));assert.ok(created.project.id);
  response=await fetch(board.origin+'/api/tasks',{method:'POST',headers:{'content-type':'application/json','x-aiyou-internal-token':board.token},body:JSON.stringify({title:'隔离验证任务',projectId:created.project.id,status:'backlog'})});
  const task=await response.json();assert.equal(response.status,201,JSON.stringify(task));assert.equal(task.task.title,'隔离验证任务');
  response=await fetch(board.origin+'/',{headers:{'x-aiyou-internal-token':board.token}});assert.equal(response.status,200);assert.match(await response.text(),/\/aiyoucodex-dsh\/taskboard\/ui\/assets\//u);
  results.push({check:'complete-taskboard-fresh-database-project-task-ui',ok:true});
  const asset=await service('asset-console');
  response=await fetch(asset.origin+'/api/library');assert.ok([401,403].includes(response.status));
  response=await fetch(asset.origin+'/api/library',{headers:{'x-asset-console-token':asset.token}});const library=await response.json();assert.equal(response.status,200,JSON.stringify(library));assert.equal((library.assets||[]).length,0,JSON.stringify(library));
  response=await fetch(asset.origin+'/');assert.equal(response.status,200);
  results.push({check:'complete-asset-service-isolated-empty-library-token-required',ok:true});
  const source=await readFile(join(root,'modules','model-arena','index.js'),'utf8');assert.ok(source.includes('AIYOU_ARENA_MCP_URL'));assert.ok(!source.includes('cordis.patch.yml'));
  results.push({check:'arena-no-profile-or-credential-discovery',ok:true});
}finally{await stopServices();await rm(fixture,{recursive:true,force:true});}
console.log(JSON.stringify({ok:true,results},null,2));
