import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createCanvasModelAdapter} from '../aiyou/vendor/aiyouplus-canvas/public/local/canvas-model-adapter.js';
const require=createRequire(import.meta.url);
const {buildApiaiCatalog}=require('../aiyou/lib/canvas/providers/apiai-default-profile.cjs');
const {buildGenericRequest}=require('../aiyou/lib/canvas/providers/aiyouplus-generic-provider.cjs');
const tick=()=>new Promise(resolve=>setImmediate(resolve));

async function fixture(t,ids){
 let config,deferred;const plans=[],events=new EventTarget();let configs=[];
 const setCatalog=values=>{const catalog=buildApiaiCatalog(values);config={provider:'apiai',profiles:{apiai:{provider:'apiai',name:'APIAI fixture',baseUrl:'https://fixture.invalid',protocol:'http-json',authType:'bearer',authHeader:'Authorization',enabled:true,hasKey:true,...catalog}}};};setCatalog(ids);
 const adapter=createCanvasModelAdapter({eventTarget:events,invoke:async(command,args)=>{
  if(command==='aiyouplus_model_config'){const snapshot=config,wait=deferred;deferred=null;if(wait){wait.started();await wait.gate;}return snapshot;}
  if(command==='aiyouplus_model_generate'){plans.push({args,plan:buildGenericRequest({...config.profiles.apiai,apiKey:'offline-key'},args)});return{paths:['/tmp/apiai-offline-fixture.mp4'],taskId:'offline-fixture'};}
  throw Error('Unexpected command '+command);
 }});
 t.after(()=>adapter.dispose());adapter.registerModels({getConfigs:()=>configs,updateConfigs:value=>{configs=value;}});await adapter.refreshModels();
 async function generate(id,settings={}){
  const model=configs.find(model=>model.modelName===id);assert.ok(model,id);
  const node={id:'node-fixture',type:'gen-video',prompt:'offline fixture only',settings:{model:model.id,ratio:'9:16',...settings}};
  const result=await adapter.generate({node,nodes:[node],updateNode(){},setHistory(){},getReferenceSources:async()=>[],cacheOutput:async output=>({...output,url:'file://'+output.path})});
  assert.equal(result.status,'completed',result.error);return plans.at(-1);
 }
 return{adapter,generate,plans,setCatalog,events,configs:()=>configs,pauseNextRead(){let started,release;const began=new Promise(r=>{started=r;}),gate=new Promise(r=>{release=r;});deferred={started,gate};return{began,release};}};
}

test('Kling duration controls preserve the documented string wire type and aspect ratio',async t=>{
 const f=await fixture(t,['kling-v1']);const {args,plan}=await f.generate('kling-v1',{duration:'10s'});
 assert.equal(args.duration,'10');assert.equal(plan.body.duration,'10');assert.equal(plan.body.aspect_ratio,'9:16');
 assert.deepEqual(f.configs()[0].durations,['5s','10s']);
});

test('Sora controls expose 4/8/12 seconds and submit that exact duration through multipart',async t=>{
 const f=await fixture(t,['sora-2']);const {args,plan}=await f.generate('sora-2',{duration:'8s'});
 assert.equal(args.duration,8);assert.equal(plan.body.seconds,8);assert.equal(plan.encoding,'multipart-form-data');
 assert.deepEqual(f.configs()[0].durations,['4s','8s','12s']);
});

test('Veo carries the chosen aspect ratio without inventing duration or resolution controls',async t=>{
 const f=await fixture(t,['veo3']);const {args,plan}=await f.generate('veo3',{duration:'5s',resolution:'720p'});
 assert.equal(args.aspectRatio,'9:16');assert.equal(plan.body.aspect_ratio,'9:16');assert.deepEqual(plan.body.images,[]);
 assert.equal(args.duration,undefined);assert.equal(args.resolution,undefined);
});

test('an existing canvas refreshes its own configuration on focus and detaches when disposed',async t=>{
 const f=await fixture(t,['gpt-image-1']);assert.equal(f.configs().length,1);f.setCatalog(['gpt-image-1','veo3']);
 f.events.dispatchEvent(new Event('focus'));await tick();assert.equal(f.configs().length,2);
 f.adapter.dispose();f.setCatalog(['sora-2']);f.events.dispatchEvent(new Event('focus'));await tick();assert.equal(f.configs().length,2);
});

test('configuration invalidation during an older directory read schedules a fresh read instead of losing the update',async t=>{
 const f=await fixture(t,['gpt-image-1']),read=f.pauseNextRead();f.events.dispatchEvent(new Event('focus'));await read.began;
 f.setCatalog(['gpt-image-1','veo3']);f.events.dispatchEvent(new Event('aiyouplus-model-config-changed'));read.release();await tick();await tick();
 assert.equal(f.configs().length,2);assert.ok(f.configs().some(model=>model.modelName==='veo3'));
});
