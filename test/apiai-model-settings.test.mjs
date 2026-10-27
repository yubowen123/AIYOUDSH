import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const html=await readFile(new URL('../aiyou/vendor/canvas-model-settings/index.html',import.meta.url),'utf8');
const source=await readFile(new URL('../aiyou/vendor/canvas-model-settings/app.js',import.meta.url),'utf8');
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const preset={provider:'apiai',name:'APIAI 默认媒体通道',docsUrl:'https://apiai.apifox.cn/',baseUrl:'',kinds:['image','video']};
const host={provider:'host',name:'DSH 当前对话模型',available:true};
const custom={provider:'service-fixture',name:'原有自定义服务',baseUrl:'https://custom.fixture.invalid',protocol:'http-json',authType:'bearer',authHeader:'Authorization',scope:'production',hasKey:true,modelCatalog:[],models:{}};
const initial=(overrides={})=>({provider:'host',profiles:{host},defaultMediaChannel:preset,...overrides});
const saved=(overrides={})=>({...preset,baseUrl:'https://api.fixture.invalid',protocol:'http-json',authType:'bearer',authHeader:'Authorization',scope:'production',hasKey:true,models:{image:'fixture-image',video:'fixture-video'},modelCatalog:[{kind:'image',id:'fixture-image',name:'Fixture image'},{kind:'video',id:'fixture-video',name:'Fixture video'}],...overrides});
const ok=value=>({ok:true,json:async()=>({ok:true,value})});
const error=message=>({ok:false,json:async()=>({ok:false,error:{message}})});
const configured=(profile=saved(),others={})=>({configured:true,configuration:initial({provider:'apiai',profiles:{host,apiai:profile,...others}}),discovery:{modelCatalog:profile.modelCatalog,models:profile.models,pendingModels:[{id:'not-mapped',reason:'文档缺少生成接口'}],issues:[],evidence:[{type:'public-document',url:preset.docsUrl}],readyToConfigure:true,accountCatalogVerified:true}});

test('successful automatic setup broadcasts only a credential-free invalidation to existing canvases',async()=>{
 const messages=[],channels=[];
 class Broadcast{constructor(name){this.name=name;channels.push(this);}postMessage(value){messages.push(value);}close(){this.closed=true;}}
 const f=await fixture({handler:()=>ok(configured()),broadcast:Broadcast});await f.edit('base-url','https://api.fixture.invalid');await f.edit('api-key','private-offline-fixture');await f.submit();
 assert.deepEqual(JSON.parse(JSON.stringify(messages)),[{type:'configuration-changed'}]);assert.equal(channels[0].name,'aiyoudsh-media-models');assert.equal(channels[0].closed,true);assert.equal(JSON.stringify(messages).includes('private-offline-fixture'),false);
});

async function fixture({configuration=initial(),handler=()=>{throw Error('Unexpected media request');},broadcast}={}){
 const elements=new Map(),calls=[];
 class Element{
  constructor(tag='div'){this.tagName=tag;this.children=[];this.handlers=new Map();this.dataset={};this.attributes={};this.value='';this.type='';this.checked=false;this.disabled=false;this.hidden=false;this._text='';}
  set id(value){this._id=value;elements.set(value,this);}get id(){return this._id;}
  set textContent(value){this._text=String(value);this.children=[];}get textContent(){return this._text+this.children.map(child=>typeof child==='string'?child:child.textContent).join('');}
  append(...children){this.children.push(...children);}replaceChildren(...children){this.children=children;this._text='';}
  addEventListener(name,fn){if(!this.handlers.has(name))this.handlers.set(name,new Set());this.handlers.get(name).add(fn);}
  removeEventListener(name,fn){this.handlers.get(name)?.delete(fn);}
  setAttribute(name,value){this.attributes[name]=String(value);}
  showModal(){this.open=true;}close(){this.open=false;}
  emit(name,extra={}){for(const fn of this.handlers.get(name)||[])fn({preventDefault(){},target:this,...extra});}
  click(){if(!this.disabled)this.emit('click');}
 }
 for(const match of html.matchAll(/<(\w+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)){
  const element=new Element(match[1]);element.id=match[3];element.type=/\btype="([^"]+)"/.exec(match[2])?.[1]||'';element.value=/\bvalue="([^"]*)"/.exec(match[2])?.[1]||'';element.hidden=/\bhidden\b/.test(match[2]);
 }
 elements.get('catalog').value='[]';elements.get('defaults').value='{}';
 const document={getElementById:id=>elements.get(id),createElement:tag=>new Element(tag),querySelectorAll:selector=>[...elements.values()].filter(element=>element.id!=='codex-path'&&!element.id.startsWith('codex-')&&['input','select','textarea','button'].includes(element.tagName)||selector.includes('#default-channel-select')&&element.id==='default-channel-select')};
 vm.runInNewContext(source,{document,URL,URLSearchParams,BroadcastChannel:broadcast,location:{search:'?sessionId=fixture-session&projectId=fixture-project&panelId=fixture-panel'},fetch:async(resource,options)=>{
  assert.equal(resource,'/aiyoucodex-dsh/canvas/rpc');const call=JSON.parse(options.body);calls.push(call);
  if(call.command==='aiyouplus_model_config')return ok(configuration);
  if(call.command==='dsh_codex_status')return ok({installed:false});
  return handler(call);
 }},{filename:'canvas-model-settings/app.js'});
 await tick();
 return{get:id=>elements.get(id),calls,async click(id){elements.get(id).click();await tick();},async submit(){elements.get('settings').emit('submit');await tick();},async edit(id,value){elements.get(id).value=value;elements.get('settings').emit('input');await tick();},async settle(){await tick();}};
}

test('fresh settings select the default media preset without submitting or altering the DSH chat model',async()=>{
 const f=await fixture();
 assert.equal(f.get('name').value,preset.name);assert.equal(f.get('docs-url').value,preset.docsUrl);assert.equal(f.get('base-url').value,'');
 assert.equal(f.get('default-channel').hidden,false);assert.equal(f.get('automatic-help').hidden,false);assert.equal(f.get('manual-catalog').hidden,true);assert.equal(f.get('manual-defaults').hidden,true);assert.equal(f.get('connection-advanced').hidden,true);
 assert.equal(f.get('save').textContent,'校验 Key 并自动配置图/视频模型');assert.equal(f.get('delete').disabled,true);
 assert.deepEqual(f.calls.map(call=>call.command).sort(),['aiyouplus_model_config','dsh_codex_status']);
});

test('Key configuration saves image/video mappings in one command, clears the Key and keeps other services',async()=>{
 const result=configured(saved(),{[custom.provider]:custom});
 const f=await fixture({handler:call=>{assert.equal(call.command,'aiyouplus_model_autoconfigure');return ok(result);}});
 await f.edit('base-url','https://api.fixture.invalid');await f.edit('api-key','fixture-only-key');
 // Automatic setup must not depend on hand-editing either JSON textarea.
 f.get('catalog').value='not json';f.get('defaults').value='not json';await f.submit();
 assert.deepEqual(f.calls.at(-1).args,{provider:'apiai',baseUrl:'https://api.fixture.invalid',apiKey:'fixture-only-key',sessionOnly:false});
 assert.equal(f.get('api-key').value,'');assert.match(f.get('status').textContent,/图片 1 个、视频 1 个/);assert.match(f.get('status').textContent,/未提交生成请求/);assert.match(f.get('status').textContent,/实际生成权限与效果仍需使用时验证/);
 assert.match(f.get('discovery-gaps').textContent,/not-mapped：文档缺少生成接口/);assert.equal(f.get('discovery-result').hidden,false);assert.match(f.get('services').textContent,/原有自定义服务/);assert.equal(f.get('delete').disabled,false);
 assert.equal(f.calls.some(call=>['aiyouplus_model_configure','aiyouplus_model_discover','aiyouplus_model_generate'].includes(call.command)),false);
});

test('failed account validation leaves the original draft and Key available for an explicit retry',async()=>{
 let attempts=0;const f=await fixture({handler:()=>++attempts===1?error('Key 无效或无权限'):ok(configured())});
 await f.edit('base-url','https://api.fixture.invalid');await f.edit('api-key','fixture-draft-key');await f.submit();
 assert.equal(f.get('base-url').value,'https://api.fixture.invalid');assert.equal(f.get('api-key').value,'fixture-draft-key');assert.equal(f.get('status').dataset.error,'true');assert.match(f.get('draft-status').textContent,/未保存/);assert.equal(f.get('save').disabled,false);
 await f.submit();assert.equal(attempts,2);assert.equal(f.get('api-key').value,'');assert.match(f.get('status').textContent,/已自动保存默认媒体通道/);
});

test('an authenticated catalog with no complete media contracts shows pending details without saving or losing the draft',async()=>{
 const profile=saved(),configuration=initial({provider:'apiai',profiles:{host,apiai:profile}});
 const f=await fixture({configuration,handler:()=>ok({configured:false,configuration,discovery:{accountCatalogVerified:true,readyToConfigure:false,modelCatalog:[],pendingModels:[{id:'unknown-video',reason:'视频查询接口未声明'}],issues:[{message:'此模型需补齐响应合同'}],evidence:[{type:'public-document',url:preset.docsUrl}]}})});
 await f.edit('base-url','https://changed.fixture.invalid');await f.edit('api-key','new-fixture-draft');await f.submit();
 assert.equal(f.get('api-key').value,'new-fixture-draft');assert.equal(f.get('base-url').value,'https://changed.fixture.invalid');assert.match(f.get('draft-status').textContent,/未保存/);
 assert.equal(f.get('discovery-result').hidden,false);assert.match(f.get('discovery-gaps').textContent,/unknown-video：视频查询接口未声明/);assert.match(f.get('discovery-gaps').textContent,/此模型需补齐响应合同/);assert.match(f.get('models').textContent,/fixture-image/);
 assert.match(f.get('status').textContent,/Key 校验通过/);assert.match(f.get('status').textContent,/原配置未变/);assert.doesNotMatch(f.get('status').textContent,/已自动保存/);assert.equal(f.calls.filter(call=>call.command==='aiyouplus_model_autoconfigure').length,1);
});

test('an existing selected custom service stays selected and retains the generic configure workflow',async()=>{
 let args;const config=initial({provider:custom.provider,profiles:{host,[custom.provider]:custom}});
 const f=await fixture({configuration:config,handler:call=>{assert.equal(call.command,'aiyouplus_model_configure');args=call.args;return ok(config);}});
 assert.equal(f.get('name').value,custom.name);assert.equal(f.get('connection-advanced').hidden,false);assert.equal(f.get('manual-catalog').hidden,false);assert.equal(f.get('save').textContent,'保存服务');
 await f.edit('name','修改后的自定义服务');await f.submit();assert.equal(args.provider,custom.provider);assert.equal(args.name,'修改后的自定义服务');assert.equal(f.calls.some(call=>call.command==='aiyouplus_model_autoconfigure'),false);
});

test('switching to the default preset preserves an unsaved custom draft until the existing confirmation is accepted',async()=>{
 const config=initial({provider:custom.provider,profiles:{host,[custom.provider]:custom}}),f=await fixture({configuration:config});
 await f.edit('api-key','unsaved-custom-key');await f.click('default-channel-select');assert.equal(f.get('change-confirmation').open,true);
 await f.click('confirmation-cancel');assert.equal(f.get('name').value,custom.name);assert.equal(f.get('api-key').value,'unsaved-custom-key');
 await f.click('default-channel-select');await f.click('confirmation-accept');assert.equal(f.get('name').value,preset.name);assert.equal(f.get('api-key').value,'');assert.equal(f.get('connection-advanced').hidden,true);
 assert.equal(f.calls.some(call=>call.command==='aiyouplus_model_autoconfigure'),false);
});

test('a saved default service can refresh mappings with its stored Key without returning it to the page',async()=>{
 const profile=saved(),f=await fixture({configuration:initial({provider:'apiai',profiles:{host,apiai:profile}}),handler:call=>{assert.equal(call.command,'aiyouplus_model_autoconfigure');assert.equal(Object.hasOwn(call.args,'apiKey'),false);return ok(configured(profile));}});
 assert.equal(f.get('api-key').value,'');assert.match(f.get('key-status').textContent,/已配置/);await f.click('catalog-refresh');assert.match(f.get('status').textContent,/已自动保存默认媒体通道/);assert.equal(f.get('api-key').value,'');
});

test('default setup requires a real API address and does not substitute the documentation origin',async()=>{
 const f=await fixture();await f.edit('api-key','fixture-key');await f.submit();assert.match(f.get('status').textContent,/真实 API 地址/);assert.equal(f.get('api-key').value,'fixture-key');assert.equal(f.calls.some(call=>call.command==='aiyouplus_model_autoconfigure'),false);
});

test('pending automatic configuration locks other media actions until the single response finishes',async()=>{
 let complete;const gate=new Promise(resolve=>{complete=resolve;});const f=await fixture({handler:()=>gate});
 await f.edit('base-url','https://api.fixture.invalid');await f.edit('api-key','fixture-key');await f.submit();assert.equal(f.get('save').disabled,true);assert.equal(f.get('default-channel-select').disabled,true);
 await f.click('refresh');await f.click('new');await f.click('default-channel-select');assert.equal(f.calls.filter(call=>call.command==='aiyouplus_model_config').length,1);assert.equal(f.calls.filter(call=>call.command==='aiyouplus_model_autoconfigure').length,1);
 complete(ok(configured()));await f.settle();assert.equal(f.get('save').disabled,false);assert.equal(f.get('api-key').value,'');assert.equal(f.get('name').value,preset.name);
});
