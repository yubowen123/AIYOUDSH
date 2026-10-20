import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../packages/dsh-client-ui-sidebar/src/aiyou-moke.js', import.meta.url), 'utf8');
const STORAGE_KEY = 'aiyou.moke-browser-tabs.v1';
function memoryStorage() {
  const values = new Map();
  return {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
}
function helper(storage) {
  const external = [];
  const methods = vm.runInNewContext(`(() => { ${source}; return { openAiyouMoke, openAiyouMokeExternal }; })()`, {window:{localStorage:storage,open:(...args)=>external.push(args)}});
  return {...methods, external};
}
function nativeContext() {
  const calls = [];
  const state = {sessionId:'one',rows:[],active:null,expanded:true,enabled:true,sequence:0};
  const sidebar = {
    openTabs:{getSnapshot:()=>state.rows}, active:()=>state.active, isExpanded:()=>state.expanded,
    toggleExpanded:()=>{state.expanded=!state.expanded;calls.push(['toggle']);},
    focus:id=>{state.active={id,kind:'browser'};calls.push(['focus',id]);},
    openTab:(kind,options)=>{
      calls.push(['open',kind,options]);
      const id=`b${++state.sequence}`;
      state.rows.push({sessionId:state.sessionId,tabId:id,kind});
      state.active={id,kind};state.expanded=true;
    },
  };
  const ctx={get:name=>name==='sidebarRight'?sidebar:{get:kind=>state.enabled&&kind==='browser'?{kind}:undefined},layout:{selectPanel:id=>calls.push(['select',id])}};
  return {ctx,calls,state};
}

test('MOKE menu opens the official browser directly at the fixed HTTPS destination',()=>{
  const {openAiyouMoke}=helper();const {ctx,calls}=nativeContext();
  assert.equal(openAiyouMoke(ctx,{id:'one'}),'browser');
  assert.equal(calls[0][0],'select');assert.equal(calls[0][1],null);
  assert.equal(calls[1][0],'open');assert.equal(calls[1][1],'browser');
  assert.equal(calls[1][2].params.url,'https://www.mokeaigc.ai/');
  assert.equal(calls[1][2].revealIfOpened,false);
  assert.equal(calls[1][2].replaceTab,undefined);
});

test('repeated MOKE clicks collapse, expand, or reveal the owned live tab without reloading it',()=>{
  const {openAiyouMoke}=helper();const {ctx,calls,state}=nativeContext();
  openAiyouMoke(ctx,{id:'one'});calls.length=0;
  openAiyouMoke(ctx,{id:'one'},{toggle:true});
  assert.deepEqual(calls,[['toggle']]);assert.equal(state.expanded,false);
  calls.length=0;openAiyouMoke(ctx,{id:'one'},{toggle:true});
  assert.deepEqual(calls,[['select',null],['focus','b1'],['toggle']]);
  state.active={id:'another',kind:'browser'};calls.length=0;
  openAiyouMoke(ctx,{id:'one'});
  assert.deepEqual(calls,[['select',null],['focus','b1']]);
  assert.equal(state.rows.length,1);
});

test('closed tabs reopen and each conversation owns an independent MOKE destination',()=>{
  const {openAiyouMoke}=helper();const {ctx,calls,state}=nativeContext();
  openAiyouMoke(ctx,{id:'one'});
  state.sessionId='two';openAiyouMoke(ctx,{id:'two'});
  assert.equal(state.rows.length,2);calls.length=0;
  state.sessionId='one';openAiyouMoke(ctx,{id:'one'});
  assert.deepEqual(calls,[['select',null],['focus','b1']]);
  state.rows=state.rows.filter(row=>row.tabId!=='b1');calls.length=0;
  openAiyouMoke(ctx,{id:'one'});assert.equal(calls[1][0],'open');
  assert.equal(state.rows.at(-1).tabId,'b3');
});

test('unavailable conversation or native browser fails before mutating the current surface',()=>{
  const {openAiyouMoke,openAiyouMokeExternal,external}=helper();const {ctx,calls,state}=nativeContext();
  assert.throws(()=>openAiyouMoke(ctx,null),/对话/);assert.equal(calls.length,0);
  state.enabled=false;assert.throws(()=>openAiyouMoke(ctx,{id:'one'}),/Browser 插件/);
  assert.equal(calls.length,0);assert.equal(external.length,0);
  openAiyouMokeExternal();assert.deepEqual(external,[['https://www.mokeaigc.ai/','_blank','noopener,noreferrer']]);
});

test('MOKE does not take over unrelated Browser pages or a tab ID belonging to another conversation',()=>{
  const {openAiyouMoke}=helper();const {ctx,calls,state}=nativeContext();
  state.rows=[{sessionId:'one',tabId:'unrelated',kind:'browser'}];
  openAiyouMoke(ctx,{id:'one'});
  assert.equal(state.rows[0].tabId,'unrelated');assert.equal(state.rows.length,2);
  state.rows=state.rows.map(row=>row.tabId==='b1'?{...row,sessionId:'other'}:row);calls.length=0;
  openAiyouMoke(ctx,{id:'one'});
  assert.equal(calls[1][0],'open');assert.equal(state.rows.at(-1).tabId,'b2');
  assert.equal(state.rows.find(row=>row.tabId==='b1').sessionId,'other');
});

test('a restarted menu reuses its saved MOKE tab after checking the native session inventory',()=>{
  const storage=memoryStorage();const {ctx,calls,state}=nativeContext();
  helper(storage).openAiyouMoke(ctx,{id:'one'});
  assert.deepEqual(JSON.parse(storage.getItem(STORAGE_KEY)),{version:1,tabs:[['one','b1']]});
  calls.length=0;state.expanded=false;
  helper(storage).openAiyouMoke(ctx,{id:'one'});
  assert.deepEqual(calls,[['select',null],['focus','b1'],['toggle']]);
  assert.equal(state.rows.length,1);
});

test('restored stale ownership is removed and never claims an unrelated or other-session tab',()=>{
  const storage=memoryStorage();const {ctx,calls,state}=nativeContext();
  storage.setItem(STORAGE_KEY,JSON.stringify({version:1,tabs:[['one','stale'],['closed','removed']]}));
  state.rows=[{sessionId:'other',tabId:'stale',kind:'browser'},{sessionId:'one',tabId:'unrelated',kind:'browser'}];
  helper(storage).openAiyouMoke(ctx,{id:'one'});
  assert.equal(calls[1][0],'open');assert.equal(state.rows.length,3);
  assert.equal(state.rows[0].sessionId,'other');
  assert.deepEqual(JSON.parse(storage.getItem(STORAGE_KEY)),{version:1,tabs:[['one','b1']]});
});

test('ownership metadata is bounded to 64 entries and contains only session and tab IDs',()=>{
  const storage=memoryStorage();const {ctx,state}=nativeContext();
  const {openAiyouMoke}=helper(storage);
  for(let i=0;i<70;i++){state.sessionId=`s${i}`;openAiyouMoke(ctx,{id:state.sessionId});}
  const stored=storage.getItem(STORAGE_KEY);const saved=JSON.parse(stored);
  assert.equal(saved.tabs.length,64);assert.deepEqual(saved.tabs[0],['s6','b7']);
  assert.deepEqual(saved.tabs.at(-1),['s69','b70']);assert.equal(stored.includes('https:'),false);
  assert.ok(saved.tabs.every(pair=>pair.length===2&&pair.every(value=>typeof value==='string')));
});

test('malformed or unavailable storage degrades to live-window ownership without breaking navigation',()=>{
  const storage=memoryStorage();storage.setItem(STORAGE_KEY,'{invalid');
  const first=nativeContext();helper(storage).openAiyouMoke(first.ctx,{id:'one'});
  assert.equal(first.state.rows.length,1);
  const blocked={getItem:()=>{throw new Error('blocked');},setItem:()=>{throw new Error('blocked');}};
  const second=nativeContext();const {openAiyouMoke}=helper(blocked);
  openAiyouMoke(second.ctx,{id:'one'});openAiyouMoke(second.ctx,{id:'one'});
  assert.equal(second.state.rows.length,1);assert.equal(second.calls.at(-1)[0],'focus');
});
