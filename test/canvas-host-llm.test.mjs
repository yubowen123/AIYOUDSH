import test from 'node:test';
import assert from 'node:assert/strict';
import {createHostLlm} from '../aiyou/lib/canvas/host-llm.mjs';

function fixture({pending=null,header={config:{provider:'old',model:'old-model'}},stream}={}){
 const calls=[],events=[],session={id:'session-a',requestHeader:()=>header,append:(type,data)=>events.push({type,data})};
 const ctx={agents:{get:id=>id===session.id?{session}:undefined},sessionProjections:{stateOf:()=>({pending})},agentDefaultModel:{currentSelection:()=>({provider:'default',model:'default-model'})},
  attachments:{admitPromptContent:async parts=>parts.map(p=>({type:'image',attachment:{attachmentId:'sha-original',mediaType:p.mediaType}}))},
  llm:{listProviders:()=>['old','new','default','codex-cli'].map(id=>({id})),resolveModelInfo:async()=>({inputModalities:['text','image']}),
   prepareCall:async(config,signal)=>({config,inputModalities:['text','image'],stream:options=>{calls.push({config,options,signal});return stream?stream(options):async function*(){yield{type:'text-delta',index:0,text:'done'};yield{type:'finish',reason:{kind:'stop'}};}();}})}};
 return{ctx,calls,events,llm:createHostLlm({ctx,record:async(_session,type,data)=>events.push({type,data})}),context:{sessionId:session.id,projectId:'project-a'}};
}
test('session pending route wins; exact message/tool/image order reaches native adapter without copied credentials',async()=>{
 const f=fixture({pending:{provider:'new',model:'new-model',reasoningEffort:'low'}});
 const result=await f.llm({prompt:'unused',messages:[{role:'system',content:'system'},{role:'user',content:[{type:'text',text:'look'},{type:'image_url',image_url:{url:'data:image/png;base64,aGVsbG8='}}]},{role:'assistant',content:null,tool_calls:[{id:'call1',type:'function',function:{name:'read',arguments:'{}'}}]},{role:'tool',tool_call_id:'call1',content:'found'}],tools:[{type:'function',function:{name:'read',parameters:{type:'object'}}}],max_tokens:123,temperature:0},f.context);
 assert.equal(result.text,'done');assert.deepEqual(f.calls[0].config,{provider:'new',model:'new-model',reasoningEffort:'low',maxTokens:123});
 assert.equal(f.calls[0].options.messages[1].content[1].attachment.attachmentId,'sha-original');assert.equal(f.calls[0].options.messages[3].toolCallId,'call1');assert.equal(f.calls[0].options.temperature,0);assert.equal(f.calls[0].options.tools[0].name,'read');
 assert.deepEqual(f.events.map(e=>e.type),['llm-request','llm-result']);assert.equal(f.events[0].data.request,undefined);assert.equal(JSON.stringify(f.events).includes('system'),false);assert.equal(f.events[0].data.selection.model,'new-model');
});
test('stored header precedes default; adapter-provided reasoning default is not pinned',async()=>{
 const f=fixture({header:{config:{provider:'old',model:'old-model',reasoningEffort:'high'},adapterDefaults:{reasoningEffort:true}}});await f.llm({prompt:'x'},f.context);assert.deepEqual(f.calls[0].config,{provider:'old',model:'old-model'});
 const d=fixture({header:null});await d.llm({prompt:'x'},d.context);assert.equal(d.calls[0].config.provider,'default');
});
test('Codex route reuses host preparation; status never claims OAuth authenticated',async()=>{
 const f=fixture({pending:{provider:'codex-cli',model:'codex-model'}}),caps=await f.llm.capabilities(f.context);
 assert.equal(caps.codex.supported,true);assert.equal(caps.authorizationVerified,false);await f.llm({prompt:'x'},f.context);assert.equal(f.calls[0].config.provider,'codex-cli');assert.equal(f.calls[0].options.apiKey,undefined);
});
test('unsupported forcing/structured controls reject before model dispatch; none removes tools',async()=>{
 const f=fixture();for(const request of [{tool_choice:'required'},{response_format:{type:'json_object'}},{top_p:0.5}])await assert.rejects(f.llm({prompt:'x',...request},f.context),e=>e.code==='UNSUPPORTED_OPTION');
 assert.equal(f.calls.length,0);await f.llm({prompt:'x',tools:[{name:'read',parameters:{type:'object'}}],tool_choice:'none'},f.context);assert.deepEqual(f.calls[0].options.tools,[]);
});
test('tool deltas preserved, length completion discards incomplete calls and closed-only blocks assemble',async()=>{
 const f=fixture({stream:async function*(){yield{type:'tool-call-delta',index:0,id:'c',name:'read',argumentsDelta:'{"a":'};yield{type:'tool-call-delta',index:0,argumentsDelta:'1}'};yield{type:'finish',reason:{kind:'tool-calls'}};}});
 const r=await f.llm({prompt:'x'},f.context);assert.equal(r.toolCalls[0].function.arguments,'{"a":1}');
 const g=fixture({stream:async function*(){yield{type:'block-end',index:2,block:{type:'text',text:'closed'}};yield{type:'finish',reason:{kind:'stop'}};}});assert.equal((await g.llm({prompt:'x'},g.context)).text,'closed');
});
test('user abort and adapter terminal error are real failures; no tool call survives cancellation',async()=>{
 const controller=new AbortController(),f=fixture({stream:async function*(){yield{type:'text-delta',index:0,text:'partial'};controller.abort(new Error('fixture stop'));yield{type:'finish',reason:{kind:'stop'}};}});
 await assert.rejects(f.llm({prompt:'x'},{...f.context,signal:controller.signal}),/fixture stop/);assert.equal(f.events.at(-1).data.code,'ABORTED');
 const g=fixture({stream:async function*(){yield{type:'finish',reason:{kind:'error',failure:{code:'AUTH',message:'login required'}}};}});await assert.rejects(g.llm({prompt:'x'},g.context),e=>e.code==='AUTH');
});
