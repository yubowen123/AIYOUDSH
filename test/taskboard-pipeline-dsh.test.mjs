import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { apply } from '../aiyou/modules/taskboard/index.js';
import { stopServices } from '../aiyou/services.mjs';
import { createDshPipelineRunner } from '../aiyou/modules/taskboard/pipeline-host.mjs';

test('DSH native authenticated route executes two local stages with a user decision in between', {timeout:20000}, async t=>{
  const dir=await mkdtemp(join(process.env.AIYOU_TEST_OUTPUT||tmpdir(),'aiyou-dsh-pipeline-'));
  const oldHome=process.env.DSH_HOME;
  process.env.DSH_HOME=dir;
  const routes=new Map(), disposals=[], calls=[];
  const selection={provider:'fixture',model:'text'};
  const ctx={
    inject(_names,fn){return fn(ctx);},
    effect(fn){const dispose=fn();if(dispose)disposals.push(dispose);},
    connection:{requestRejection:req=>req.headers['x-fixture-auth']==='yes'?undefined:401},
    webServer:{register(def){routes.set(def.path,def);return()=>routes.delete(def.path);}},
    agentDefaultModel:{currentSelection:()=>selection},
    llm:{async prepareCall(selected){
      assert.deepEqual(selected,selection);
      return {config:selection,async *stream(options){
        calls.push(options);
        yield {type:'text-delta',index:0,text:'回执 '+calls.length};
        yield {type:'usage',usage:{inputTokens:20,outputTokens:6}};
        yield {type:'finish',reason:{kind:'stop'}};
      }};
    }},
  };
  apply(ctx);
  const endpoint='/aiyoucodex-dsh/taskboard/pipeline';
  const server=createServer(routes.get(endpoint).handler);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(async()=>{
    await new Promise(resolve=>{server.close(resolve);server.closeAllConnections();});
    for(const dispose of disposals.reverse())await dispose();
    await stopServices();
    if(oldHome===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=oldHome;
    await rm(dir,{recursive:true,force:true});
  });
  const url='http://127.0.0.1:'+server.address().port+endpoint;
  const read=async()=>{const r=await fetch(url+'?projectId=local',{headers:{'x-fixture-auth':'yes'}});assert.equal(r.status,200,await r.clone().text());return r.json();};
  const send=async value=>{
    const r=await fetch(url,{method:'POST',headers:{'content-type':'application/json','x-fixture-auth':'yes'},body:JSON.stringify({projectId:'local',...value})});
    assert.equal(r.status,200,await r.clone().text());return r.json();
  };
  const wait=async id=>{
    for(let i=0;i<80;i++){
      const run=(await read()).runs.find(r=>r.id===id);
      if(['waiting','completed','failed','interrupted'].includes(run?.status))return run;
      await new Promise(r=>setTimeout(r,100));
    }
    assert.fail('流水线未进入预期终态');
  };
  assert.equal((await fetch(url+'?projectId=local')).status,401);
  assert.equal((await fetch(url,{method:'POST',headers:{'x-fixture-auth':'yes'},body:'{}'})).status,415);
  assert.equal((await read()).engine,'DSH 原生模型');
  const stage={kind:'model',name:'分析',instruction:'核对输入'};
  const {rule}=await send({action:'save-rule',rule:{name:'原生测试',enabled:true,trigger:'manual',stages:[
    stage,{kind:'approval',name:'决定',instruction:'采用哪种？',options:['选项甲','选项乙']},{...stage,name:'完成'}
  ]}});
  const {run}=await send({action:'start',ruleId:rule.id,requestId:'dsh-fixture',input:'fixture material'});
  const waiting=await wait(run.id);
  assert.equal(waiting.status,'waiting',waiting.error);
  assert.equal(calls.length,1);
  await send({action:'answer',runId:run.id,revision:waiting.revision,option:'选项乙'});
  const done=await wait(run.id);
  assert.equal(done.status,'completed',done.error);
  assert.equal(calls.length,2);
  assert.deepEqual(calls[1].tools,[]);
  assert.match(calls[1].messages[0].content[0].text,/选项乙/);
  assert.equal(done.results.at(-1).usage.outputTokens,6);
});

test('DSH adapter refuses a changed model or an unbound CLI model before submitting',async ()=>{
  let calls=0;
  const runner=createDshPipelineRunner(()=>({agentDefaultModel:{currentSelection:()=>({provider:'codex-cli',model:'fixture'})},
    llm:{async prepareCall(){calls++;return {config:{provider:'changed',model:'new'},stream(){assert.fail('wrong provider must not run');}};}}}));
  await assert.rejects(runner.select(),{status:503});
  assert.equal(calls,0);
  await assert.rejects(runner.invoke({selection:{provider:'fixture',model:'original'},signal:AbortSignal.timeout(1000)}),{status:409});
  assert.equal(calls,1);
});
