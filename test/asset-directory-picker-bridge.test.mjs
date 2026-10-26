import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {randomUUID} from 'node:crypto';
let definition;
const sandbox={URL,Promise,globalThis:null,window:{__ModuleLoader__:{load:value=>definition=value}}};sandbox.globalThis=sandbox;
vm.runInNewContext((await readFile(new URL('../aiyou/modules/asset-console/client.js',import.meta.url),'utf8')).replace('  function Workspace(', '  globalThis.bridgeTest=createDirectoryPickerBridge;\n  function Workspace('),sandbox);definition.factory(()=>({createElement(){}}));
const origin='https://owned.dsh.test';
const settle=async()=>{for(let i=0;i<6;i++)await new Promise(r=>setImmediate(r));};
function fixture(){
 const listeners=new Map(),page={baseURI:origin+'/',frames:[],querySelectorAll(){return this.frames;}},replies=[],calls=[];let action=async()=>'/owned/assets';
 const win={location:{origin,href:origin+'/'},addEventListener:(k,v)=>listeners.set(k,v),removeEventListener:(k,v)=>{if(listeners.get(k)===v)listeners.delete(k);}};
 function frame(path='/aiyoucodex-dsh/asset-console/ui/',parent=page){const doc={URL:origin+path,baseURI:origin+path,frames:[],querySelectorAll(){return this.frames;}},source={postMessage:(data,targetOrigin)=>replies.push({data,targetOrigin})},item={src:path,doc,source,visible:true,srcdoc:null,getAttribute(k){return k==='src'?this.src:k==='srcdoc'?this.srcdoc:null;},getBoundingClientRect(){return{width:this.visible?500:0,height:this.visible?500:0};},get contentDocument(){return this.doc;},get contentWindow(){return source;}};parent.frames.push(item);return item;}
 const library=frame(),stop=sandbox.bridgeTest({win,page,pick:()=>{calls.push(true);return action();}});
 const send=(f=library,extra={})=>{const data={type:'dsh-asset-folder-pick',requestId:randomUUID(),...extra.data};listeners.get('message')?.({origin,source:f.source,...extra,data});return data.requestId;};
 return{win,page,library,frame,stop,calls,replies,listeners,send,setAction(fn){action=fn;}};
}
test('owned library gets absolute host path or explicit cancellation without a filesystem write',async()=>{
 for(const value of ['/owned/assets','D:\\Media\\Assets',null]){const f=fixture();f.setAction(async()=>value);const id=f.send();await settle();assert.equal(f.calls.length,1);assert.equal(f.replies[0].data.requestId,id);assert.equal(f.replies[0].data.ok,true);assert.equal(f.replies[0].data.path,value);assert.equal(f.replies[0].targetOrigin,origin);f.stop();assert.equal(f.listeners.size,0);}
 const f=fixture();f.setAction(async()=>'relative/assets');f.send();await settle();assert.equal(f.replies[0].data.ok,false);assert.match(f.replies[0].data.error,/绝对路径/u);f.stop();
});
test('timeline nested library is allowed only through owned canvas ancestors',async()=>{
 const f=fixture();f.page.frames=[];const canvas=f.frame('/aiyoucodex-dsh/canvas/ui/'),nested=f.frame('/aiyoucodex-dsh/asset-console/ui/?picker=canvas',canvas.doc);f.send(nested);await settle();assert.equal(f.calls.length,1);assert.equal(f.replies.length,1);f.stop();
});
test('external, srcdoc, hidden, wrong-source and wrong actual-document requests cannot open a chooser',async()=>{
 const f=fixture();let read=0;const remote=f.frame('https://remote.invalid/aiyoucodex-dsh/asset-console/ui/');Object.defineProperty(remote,'contentDocument',{get(){read++;throw Error('Cross origin');}});
 f.send(remote);f.send(f.library,{origin:'https://foreign.invalid'});f.send(f.library,{source:{}});f.send(f.library,{data:{requestId:'invalid'}});f.library.srcdoc='<h1>fake</h1>';f.send();f.library.srcdoc=null;f.library.visible=false;f.send();f.library.visible=true;f.library.doc.URL=origin+'/unowned/';f.send();await settle();assert.equal(f.calls.length,0);assert.equal(f.replies.length,0);assert.equal(read,0);f.stop();
});
test('one native chooser owns concurrent requests and repeated nonce cannot open another',async()=>{
 const f=fixture();let finish;f.setAction(()=>new Promise(r=>finish=r));const id=f.send();await settle();f.send(f.library,{data:{requestId:id}});f.send();await settle();assert.equal(f.calls.length,1);assert.equal(f.replies.length,1);assert.equal(f.replies[0].data.ok,false);finish('/owned/chosen');await settle();assert.equal(f.replies.length,2);assert.equal(f.replies[1].data.requestId,id);assert.equal(f.replies[1].data.ok,true);f.stop();
});
test('navigation and removal quarantine late chooser replies',async()=>{
 for(const change of [f=>f.library.doc={...f.library.doc},f=>{f.page.frames=[];},f=>{f.library.src='https://foreign.invalid/';}]){const f=fixture();let finish;f.setAction(()=>new Promise(r=>finish=r));f.send();await settle();change(f);finish('/owned/chosen');await settle();assert.equal(f.replies.length,0);f.stop();}
});
test('disposing before dispatch or while choosing cannot open another chooser or reply to retired frames',async()=>{
 const immediate=fixture();immediate.send();immediate.stop();await settle();assert.equal(immediate.calls.length,0);
 const f=fixture();let finish;f.setAction(()=>new Promise(r=>finish=r));f.send();await settle();f.stop();finish('/owned/chosen');await settle();assert.equal(f.replies.length,0);assert.equal(f.listeners.size,0);
});
