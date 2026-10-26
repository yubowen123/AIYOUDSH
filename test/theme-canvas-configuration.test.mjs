import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Readable} from 'node:stream';
import {THEMES} from '../aiyou/modules/theme/themes.js';
import {normalizeConfiguration,normalizeSystemConfiguration} from '../aiyou/modules/theme/configuration.mjs';

test('canvas colors follow each theme until explicitly detached and reset restores following',()=>{
 for(const theme of Object.values(THEMES)){
  const configured=normalizeConfiguration({colors:{primary:'#234567',accent:'#124578'},canvas:{colors:{text:'#ffffff'}}},theme);
  assert.equal(configured.canvas.colors.text,'#234567');assert.equal(configured.canvas.colors.edge,'#124578');
  const detached=normalizeConfiguration({canvas:{followTheme:false,colors:{text:'#ffffff'},opacity:{node:.3},background:{mode:'transparent',grid:'none'}}},theme);
  assert.equal(detached.canvas.colors.text,'#ffffff');assert.equal(detached.canvas.opacity.node,.3);assert.equal(detached.canvas.background.mode,'transparent');
  assert.equal(normalizeConfiguration({},theme).canvas.followTheme,true);
 }
});

test('canvas validation rejects malformed values, unsafe URLs and unknown options',()=>{
 const theme=THEMES['pink-candy'];
 for(const canvas of [null,[],{followTheme:1},{colors:{node:['#ffffff']}},{colors:{node:'red'}},{opacity:{node:1.1}},{opacity:{node:-1}},{background:{url:'https://outside.invalid/image.png'}},{background:{mode:'url'}},{background:{gridSize:7}},{background:{gridSize:24.5}},{background:{grid:'mesh'}},{background:{x:101}},{unexpected:true}])assert.throws(()=>normalizeConfiguration({canvas},theme));
 assert.throws(()=>normalizeSystemConfiguration({colors:{primary:'#ffffff'}}),/仅支持画布/u);
 assert.equal(normalizeSystemConfiguration({canvas:{opacity:{toolbar:0}}}).canvas.opacity.toolbar,0);
});

test('host persists native canvas overrides separately, merges partial patches and publishes authenticated revision state',async()=>{
 const root=await mkdtemp(join(tmpdir(),'aiyou-canvas-theme-')),previous=process.env.DSH_HOME;process.env.DSH_HOME=root;
 const routes=new Map();let rejection;
 const ctx={get:()=>({requestRejection:()=>rejection}),effect:fn=>fn(),webServer:{register:route=>{routes.set(route.path,route);return()=>{};}},inject(_services,fn){fn(this);}};
 try{
  (await import('../aiyou/modules/theme/index.js?canvas-state='+Date.now())).apply(ctx);
  async function request(path,body,method=body?'POST':'GET'){
   const req=Readable.from(body?[Buffer.from(JSON.stringify(body))]:[]);Object.assign(req,{method,url:path,headers:body?{'content-type':'application/json'}:{}});let status,raw;
   const res={setHeader(){},writeHead(code){status=code;},end(value){raw=value;}};await routes.get(path).handler(req,res);return{status,value:raw?JSON.parse(raw):undefined};
  }
  const base='/aiyoucodex-dsh/theme';let r=await request(base+'/state');assert.equal(r.status,200);assert.deepEqual(Object.keys(r.value).sort(),['active','revision']);
  r=await request(base+'/select',{id:'system',ifRevision:0,options:{canvas:{followTheme:false,colors:{node:'#123456'},opacity:{node:.7},background:{grid:'lines'}}}});assert.equal(r.status,200);assert.equal(r.value.detail,null);assert.equal(r.value.systemConfiguration.canvas.colors.node,'#123456');
  r=await request(base+'/select',{id:'system',ifRevision:1,options:{canvas:{background:{gridSize:40}}}});assert.equal(r.status,200);assert.equal(r.value.systemConfiguration.canvas.colors.node,'#123456');assert.equal(r.value.systemConfiguration.canvas.opacity.node,.7);assert.equal(r.value.systemConfiguration.canvas.background.grid,'lines');
  r=await request(base+'/select',{id:'pink-candy',ifRevision:2,options:{alpha:{control:.42},canvas:{background:{grid:'none'}}}});assert.equal(r.status,200);
  r=await request(base+'/select',{id:'pink-candy',ifRevision:3,options:{canvas:{opacity:{panel:.61}}}});assert.equal(r.status,200);assert.equal(r.value.detail.configuration.alpha.control,.42);assert.equal(r.value.detail.configuration.canvas.background.grid,'none');
  r=await request(base+'/select',{id:'system',ifRevision:4});assert.equal(r.value.detail,null);assert.equal(r.value.systemConfiguration.canvas.background.gridSize,40);
  r=await request(base+'/select',{id:'system',ifRevision:5,options:{background:{x:30}}});assert.equal(r.status,400);assert.equal((await request(base+'/state')).value.revision,5);
  r=await request(base+'/select',{id:'system',ifRevision:4,options:{canvas:{background:{gridSize:60}}}});assert.equal(r.status,409);assert.equal((await request(base)).value.systemConfiguration.canvas.background.gridSize,40);
  assert.equal(JSON.parse(await readFile(join(root,'aiyou-enhancer/theme.json'),'utf8')).schemaVersion,3);
  rejection=401;assert.equal((await request(base+'/state')).status,401);rejection=undefined;assert.equal((await request(base+'/state',{},'POST')).status,405);
 }finally{if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;await new Promise(r=>setTimeout(r,30));await rm(root,{recursive:true,force:true});}
});
