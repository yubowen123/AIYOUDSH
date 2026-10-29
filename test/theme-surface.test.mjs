import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile,readdir,mkdtemp,rm,mkdir,writeFile,symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Readable} from 'node:stream';
import {THEMES} from '../aiyou/modules/theme/themes.js';
import {readBackground} from '../aiyou/modules/theme/media.mjs';
import {BACKGROUNDS} from '../aiyou/modules/theme/backgrounds.js';
import {mediaResponse} from '../aiyou/modules/theme/media.mjs';
import {defaultConfiguration,normalizeConfiguration,configureTheme} from '../aiyou/modules/theme/configuration.mjs';

const source=await readFile(new URL('../aiyou/modules/theme/client.js',import.meta.url),'utf8');
let definition;
const intervals=new Map(),themeWarnings=[];let intervalSequence=0;
const sandbox={URL,console:{...console,warn:(...args)=>themeWarnings.push(args)},AbortController,CustomEvent,
 setInterval(fn,delay){const id=++intervalSequence;intervals.set(id,{fn,delay});return id;},clearInterval:id=>intervals.delete(id),
 window:{__ModuleLoader__:{load:value=>{definition=value;}}}};
vm.runInNewContext(source.replace('    // ---------- theme switcher panel ----------',
 '    globalThis.themeTest={buildTokens,buildThemeSurfaceCss,buildEmbeddedThemeCss,createThemeController,createThemeSession,createMotionBackground,defaultConfiguration,normalizeConfiguration,configureTheme,ThemePanel,createThemeRemoteSync,buildCanvasVariables};\n    // ---------- theme switcher panel ----------'),sandbox);
definition.factory(name=>{assert.equal(name,'react');return {createElement:()=>null};});
const api=sandbox.themeTest;
const pink=THEMES['pink-candy'];
const dark=THEMES['mecha-control'];
const selection=theme=>({id:theme.id,detail:theme});

function documentFixture(url='dsh-app://app/'){
 const attributes=new Map();
 const doc={URL:url,baseURI:url,frames:[],observers:[],head:{children:[]},
  documentElement:{getAttribute:key=>attributes.get(key)??null,setAttribute:(key,value)=>attributes.set(key,String(value)),removeAttribute:key=>attributes.delete(key)},
  createElement(tag){assert.equal(tag,'style');return {dataset:{},textContent:'',remove(){const index=doc.head.children.indexOf(this);if(index>=0)doc.head.children.splice(index,1);}};},
  querySelectorAll(selector){assert.equal(selector,'iframe');return this.frames;},
 };
 doc.head.appendChild=element=>{doc.head.children.push(element);};
 doc.defaultView={MutationObserver:class{constructor(callback){this.callback=callback;this.connected=false;doc.observers.push(this);}observe(){this.connected=true;}disconnect(){this.connected=false;}}};
 return doc;
}
function frameFixture(src,doc){const listeners=new Map(),attributes=new Map([['src',src]]);return {src,contentDocument:doc,listeners,getAttribute:key=>attributes.get(key)??null,setAttribute:(key,value)=>attributes.set(key,String(value)),removeAttribute:key=>attributes.delete(key),addEventListener:(event,listener)=>listeners.set(event,listener),removeEventListener:(event,listener)=>{if(listeners.get(event)===listener)listeners.delete(event);}};}
function controllerFixture(doc=documentFixture()){
 const layers=new Map();let revision=0;
 const ctx={theme:{overrideTokens(source,tokens){const layer={tokens,revision:revision++};layers.set(source,layer);return ()=>{if(layers.get(source)===layer)layers.delete(source);};}}};
 return {doc,layers,controller:api.createThemeController(ctx,doc)};
}
const attr='data-aiyou-harness-theme';

function eventTarget(target){
 const listeners=new Map(),events=[];
 Object.assign(target,{listeners,events,addEventListener(type,listener){if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(listener);},removeEventListener(type,listener){const handlers=listeners.get(type);handlers?.delete(listener);if(!handlers?.size)listeners.delete(type);},dispatchEvent(event){events.push(event);for(const listener of [...listeners.get(event.type)||[]])listener(event);return true;}});
 return target;
}
function remotePageFixture(){const doc=documentFixture();eventTarget(doc);eventTarget(doc.defaultView);return doc;}
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});return {promise,resolve,reject};};
const response=value=>({ok:true,json:async()=>value});
const settle=()=>new Promise(resolve=>setImmediate(resolve));
const normalizedSelection=(theme,hostRevision)=>({id:theme.id,detail:configureTheme(theme.base||theme,theme.configuration||{}),hostRevision});
function savedThemeRemote(theme=pink,revision=0){
 let value={active:theme.id,detail:configureTheme(theme,{}),revision};const calls=[];
 return {calls,get value(){return value;},set(theme,nextRevision){value={active:theme.id,detail:theme,revision:nextRevision};},async request(url,init={}){calls.push({url,init});if(url.includes('/detail?')){const id=new URL(url,'http://fixture').searchParams.get('id');return response(id===value.active?value.detail:configureTheme(THEMES[id],{}));}return response(url.endsWith('/state')?{revision:value.revision}:value);}};
}

test('compiled materials cover native surfaces, with paired bubble geometry and independent composer alpha',()=>{
 for(const theme of Object.values(THEMES)){
  const css=api.buildThemeSurfaceCss(theme);
  assert.match(css,new RegExp(`html\\[${attr}="${theme.id}"\\]\\{color-scheme:${theme.mode};`));
  assert.doesNotMatch(css,/undefined|NaN|@keyframes/u);
  assert.ok(css.includes(`url("/aiyoucodex-dsh/theme/media?id=${theme.id}")`));
  const shared=/(:is\(\.IzP3Va_bubble,\.gKv1-q_body:has\([^\n]+?)\{([^}]+)\}/u.exec(css)?.[2];
  assert.ok(shared,theme.id+' shared bubble rule is missing');
  for(const property of ['padding:','border:','border-radius:','box-shadow:'])assert.ok(shared.includes(property));
  assert.ok(!/(?:^|;)(?:width|max-width|height|overflow|position|opacity):/u.test(shared));
  assert.match(css,/\.ST7X_W_composerStack\{background:var\(--aiyou-harness-composer-area-fill\)\}/u);
  assert.match(css,/\.yhfFVG_card\{background:var\(--aiyou-harness-composer-fill\)/u);
  assert.match(css,/\.gKv1-q_body \.md-table-wide\{width:100%;max-width:100%;min-width:0;margin-left:0;padding-left:0;overflow-x:auto\}/u);
  assert.ok(css.includes('@media(prefers-reduced-motion:reduce)'));
  assert.doesNotMatch(css,/\b(?:grid-template-columns|--dsh-chat-content-width|--dsh-composer-card-max-width):/u);
  assert.match(css,/\[data-aiyou-theme-video\]\{[^}]+z-index:-1;pointer-events:none/u);
 }
 const theme={...pink,controls:{...pink.controls,alpha:{...pink.controls.alpha,composer:0.17,'composer-area':0.68}}};
 const css=api.buildThemeSurfaceCss(theme);
 assert.match(css,/--aiyou-harness-composer-fill:rgba\([^;]+, 0\.17\);/u);
 assert.match(css,/--aiyou-harness-composer-area-fill:rgba\([^;]+, 0\.68\);/u);
 assert.throws(()=>api.buildThemeSurfaceCss({...pink,id:'bad"{}'}),/标识/u);
});

test('wallpaper lives behind native transparent columns and composer without overlay geometry or arbitrary imported URLs',()=>{
 const css=api.buildThemeSurfaceCss(dark);
 assert.match(css,/\._6Qf49G_frame\{isolation:isolate;background-color:[^}]+background-image:linear-gradient\([^}]+url\("\/aiyoucodex-dsh\/theme\/media\?id=mecha-control"\)/u);
 assert.ok(css.includes(':is(._6Qf49G_centerCol,._6Qf49G_rightbarCol,.irMxjq_panel){background:transparent}'));
 assert.ok(css.includes('.ST7X_W_root[data-phase=active] .ST7X_W_composerSeat'));
 assert.ok(css.includes('.aiyou-navigation-rail{background:var(--aiyou-harness-rail-fill)'));
 const hostile=api.buildThemeSurfaceCss({...dark,background:{...dark.background,url:'https://outside.test/"; color:red',x:1000,opacity:-1}});
 assert.ok(!hostile.includes('outside.test'));assert.ok(hostile.includes('background-position:100% 50%'));
 assert.ok(hostile.includes('linear-gradient(rgba(12, 21, 30, 1),rgba(12, 21, 30, 1))'));
 const {controller,doc}=controllerFixture();controller.commit(selection(dark));const saved=doc.head.children[0].textContent;
 controller.preview(selection(pink),'preview');assert.ok(doc.head.children[0].textContent.includes('media?id=pink-candy'));
 controller.cancel('preview');assert.equal(doc.head.children[0].textContent,saved);
 controller.commit({id:'system',detail:null});assert.equal(doc.head.children.length,0);controller.dispose();
});

test('declared background assets are real, bounded, independent of original install and exclude personal media',async()=>{
 for(const id of Object.keys(THEMES)){
  const media=await readBackground(id);assert.ok(media.bytes.length>500,id);assert.match(media.mime,/^image\//u);
  assert.equal(THEMES[id].background.animated,id==='mecha-control');
 }
 assert.match(BACKGROUNDS['crayon-shinchan-four-scenes-xixi'].note,/未包含用户相册/u);
 assert.match(BACKGROUNDS['spongebob-beach-motion'].note,/未包含用户参考图片/u);
 await assert.rejects(readBackground('../mecha-control'),error=>error.status===400);
 await assert.rejects(readBackground('not-a-theme'),error=>error.status===404);
 const fixture=await mkdtemp(join(tmpdir(),'aiyou-theme-media-'));
 try{
  const root=join(fixture,'custom-test','assets');await mkdir(root,{recursive:true});
  const bytes=(await readBackground('mecha-control')).bytes;await writeFile(join(root,'wall.png'),bytes);
  assert.equal((await readBackground('custom-test',fixture,{background:{file:'wall.png'}})).bytes.length,bytes.length);
  for(const file of ['../wall.png','/tmp/wall.png','file://wall.png','https://test/wall.png'])await assert.rejects(readBackground('custom-test',fixture,{background:{file}}),error=>error.status===400);
  await writeFile(join(fixture,'private.png'),bytes);await symlink(join(fixture,'private.png'),join(root,'escape.png'));
  await assert.rejects(readBackground('custom-test',fixture,{background:{file:'escape.png'}}),error=>error.status===403);
  await writeFile(join(root,'invalid.png'),'not image');await assert.rejects(readBackground('custom-test',fixture,{background:{file:'invalid.png'}}),/内容无效/u);
  await writeFile(join(root,'large.png'),Buffer.alloc(10*1024*1024+1));await assert.rejects(readBackground('custom-test',fixture,{background:{file:'large.png'}}),error=>error.status===413);
 }finally{await rm(fixture,{recursive:true,force:true});}
});

test('hashed selectors are grounded in the current recovered native modules',async()=>{
 const groups=[
  ['chat','MessageItem.module.css',['IzP3Va_bubble','IzP3Va_fileCard']],
  ['chat','AssistantMarkdown.module.css',['gKv1-q_body']],
  ['conversation','InputBar.module.css',['yhfFVG_card','yhfFVG_input','yhfFVG_placeholder']],
  ['conversation','ConversationRoot.module.css',['ST7X_W_root','ST7X_W_header','ST7X_W_composerStack']],
  ['layout','AppFrame.module.css',['_6Qf49G_frame']],
  ['sidebar-right','SidebarRight.module.css',['irMxjq_tabBody']],
 ];
 const css=api.buildThemeSurfaceCss(pink);
 for(const [name,fragment,selectors] of groups){
  const dir=new URL(`../packages/dsh-client-ui-${name}/src-recovered/lib/client_js/`,import.meta.url);
  const file=(await readdir(dir)).find(file=>file.includes(fragment));assert.ok(file,fragment);
  const native=await readFile(new URL(file,dir),'utf8');
  for(const selector of selectors){assert.ok(native.includes(selector));assert.ok(css.includes('.'+selector));}
 }
});

test('switch, native default and disposal remove owned CSS and token layers without touching native preferences',()=>{
 const {doc,layers,controller}=controllerFixture();
 doc.documentElement.setAttribute('data-ds-dark-theme','native-setting');
 const draft={text:'不要修改这段草稿'};
 controller.commit(selection(pink));
 assert.equal(doc.head.children.length,1);assert.equal(layers.size,1);
 assert.equal(doc.head.children[0].dataset.pluginCss,'@local/aiyou-enhancer-theme/theme.css');
 controller.commit(selection(dark));
 assert.equal(doc.head.children.length,1);assert.equal(layers.size,1);
 assert.equal(doc.documentElement.getAttribute(attr),dark.id);
 assert.match(doc.head.children[0].textContent,/color-scheme:dark/u);
 controller.commit({id:'system',detail:null});
 assert.equal(doc.head.children.length,0);assert.equal(layers.size,0);assert.equal(doc.documentElement.getAttribute(attr),null);
 assert.equal(doc.documentElement.getAttribute('data-ds-dark-theme'),'native-setting');
 controller.commit(selection(pink));controller.dispose();controller.dispose();
 assert.equal(doc.head.children.length,0);assert.equal(layers.size,0);assert.equal(doc.documentElement.getAttribute(attr),null);
 assert.ok(doc.observers.every(observer=>!observer.connected));
 controller.commit(selection(dark));assert.equal(layers.size,0);
 assert.equal(draft.text,'不要修改这段草稿');
});

test('same-origin embedded assets and taskboard follow switching, navigation, late mounting and cleanup',()=>{
 const {doc,controller}=controllerFixture();
 const asset=documentFixture('dsh-app://app/aiyoucodex-dsh/asset-console/ui/');
 const frame=frameFixture('/aiyoucodex-dsh/asset-console/ui/',asset);doc.frames.push(frame);
 let crossOriginReads=0;const external=frameFixture('https://outside.test/aiyoucodex-dsh/taskboard/ui/',null);
 Object.defineProperty(external,'contentDocument',{get(){crossOriginReads++;throw Error('cross-origin');}});doc.frames.push(external);
 controller.commit(selection(pink));
 assert.equal(asset.head.children.length,1);assert.equal(asset.documentElement.getAttribute(attr),pink.id);
 assert.ok(asset.head.children[0].textContent.includes('--text-primary:'));
 assert.equal(crossOriginReads,0);
 const board=documentFixture('dsh-app://app/aiyoucodex-dsh/taskboard/ui/');
 board.documentElement.setAttribute('data-theme','dark');
 const boardFrame=frameFixture('/aiyoucodex-dsh/taskboard/ui/',board);doc.frames.push(boardFrame);
 doc.observers.find(observer=>observer.connected).callback();
 assert.equal(board.head.children.length,1);
 controller.commit(selection(dark));
 assert.equal(asset.head.children.length,1);assert.equal(board.documentElement.getAttribute(attr),dark.id);
 const reloaded=documentFixture(asset.URL);frame.contentDocument=reloaded;frame.listeners.get('load')();
 assert.equal(asset.head.children.length,0);assert.equal(asset.documentElement.getAttribute(attr),null);
 assert.equal(reloaded.head.children.length,1);
 doc.frames=doc.frames.filter(value=>value!==frame);doc.observers.find(observer=>observer.connected).callback();
 assert.equal(reloaded.head.children.length,0);assert.equal(frame.listeners.size,0);
 controller.commit({id:'system',detail:null});
 assert.equal(board.head.children.length,1);assert.equal(boardFrame.listeners.size,1);
 assert.equal(board.documentElement.getAttribute('data-theme'),'dark');assert.equal(board.documentElement.getAttribute(attr),'system');
 assert.equal(crossOriginReads,0);controller.dispose();assert.equal(board.head.children.length,0);assert.equal(boardFrame.listeners.size,0);assert.equal(board.documentElement.getAttribute(attr),null);
});

function requestFixture(){let saved=pink;const calls=[];let rejectSave=false;return {calls,get saved(){return saved;},set rejectSave(value){rejectSave=value;},request:async(url,options={})=>{
 calls.push({url,method:options.method??'GET'});
 if(options.method==='POST'){
  if(rejectSave)return {ok:false,json:async()=>({error:'保存失败'})};
  const id=JSON.parse(options.body).id;saved=id==='system'?null:THEMES[id];
  return {ok:true,json:async()=>({active:id,detail:saved})};
 }
 if(url.includes('/detail?'))return {ok:true,json:async()=>THEMES[new URL(url,'http://fixture').searchParams.get('id')]};
 return {ok:true,json:async()=>({active:saved?.id??'system',detail:saved,themes:[{id:'system'},...Object.values(THEMES)]})};
 }};}

test('preview and cancel do not persist; save persists once and a failed save preserves the prior saved choice',async()=>{
 const {controller,doc}=controllerFixture();const remote=requestFixture();const session=api.createThemeSession(controller,remote.request);
 await session.load();let state=await session.preview(dark.id);
 assert.equal(state.draftId,dark.id);assert.equal(state.savedId,pink.id);assert.equal(remote.calls.filter(call=>call.method==='POST').length,0);
 state=session.cancel();assert.equal(state.draftId,pink.id);assert.equal(doc.documentElement.getAttribute(attr),pink.id);
 await session.preview(dark.id);state=await session.save();assert.equal(remote.saved.id,dark.id);assert.equal(state.savedId,dark.id);
 await session.preview(pink.id);remote.rejectSave=true;
 await assert.rejects(session.save(),/保存失败/u);assert.equal(remote.saved.id,dark.id);
 session.dispose();assert.equal(doc.documentElement.getAttribute(attr),dark.id);
 assert.equal(remote.calls.filter(call=>call.method==='POST').length,2);controller.dispose();
});

test('late preview responses and closed panels cannot overwrite the latest selection',async()=>{
 const {controller,doc}=controllerFixture();const remote=requestFixture();let finish;
 const session=api.createThemeSession(controller,(url,options)=>url.includes('/detail?')?new Promise(resolve=>{finish=resolve;}):remote.request(url,options));
 await session.load();const pending=session.preview(dark.id);
 await session.preview('system');finish({ok:true,json:async()=>dark});assert.equal(await pending,null);
 assert.equal(doc.head.children.length,0);
 session.dispose();assert.equal(doc.documentElement.getAttribute(attr),pink.id);
 controller.dispose();
});

test('host persists native-default selection in an isolated profile and returns no synthetic theme data',async()=>{
 const fixture=await mkdtemp(join(tmpdir(),'aiyou-theme-surface-'));const previous=process.env.DSH_HOME;process.env.DSH_HOME=fixture;
 const routes=new Map();
 const ctx={get:()=>({requestRejection:()=>undefined}),effect:fn=>fn(),webServer:{register:route=>{routes.set(route.path,route);return ()=>routes.delete(route.path);}},inject(_services,apply){apply(this);}};
 try{
  const host=await import(new URL(`../aiyou/modules/theme/index.js?fixture=${Date.now()}`,import.meta.url));host.apply(ctx);
  async function request(path,body){const req=Readable.from(body?[Buffer.from(JSON.stringify(body))]:[]);Object.assign(req,{method:body?'POST':'GET',url:path,headers:body?{'content-type':'application/json'}:{}});let status,raw;const res={setHeader(){},writeHead(value){status=value;},end(value){raw=value;}};await routes.get(path.split('?')[0]).handler(req,res);return {status,value:JSON.parse(raw)};}
  let result=await request('/aiyoucodex-dsh/theme');assert.equal(result.status,200);assert.ok(result.value.themes.some(theme=>theme.id==='system'));
  result=await request('/aiyoucodex-dsh/theme/select',{id:'system'});assert.equal(result.status,200);assert.equal(result.value.detail,null);
  result=await request('/aiyoucodex-dsh/theme');assert.equal(result.value.active,'system');assert.equal(result.value.detail,null);
  assert.equal(JSON.parse(await readFile(join(fixture,'aiyou-enhancer/theme.json'),'utf8')).active,'system');
  result=await request('/aiyoucodex-dsh/theme/detail?id=unknown');assert.equal(result.status,404);
 }finally{if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;await new Promise(resolve=>setTimeout(resolve,20));await rm(fixture,{recursive:true,force:true});}
});

test('background media route keeps host authentication and returns only declared media with safe content headers',async()=>{
 const fixture=await mkdtemp(join(tmpdir(),'aiyou-theme-media-route-'));const previous=process.env.DSH_HOME;process.env.DSH_HOME=fixture;
 const routes=new Map();let rejection;
 const ctx={get:()=>({requestRejection:()=>rejection}),effect:fn=>fn(),webServer:{register:route=>{routes.set(route.path,route);return ()=>routes.delete(route.path);}},inject(_services,apply){apply(this);}};
 try{
  const host=await import(new URL(`../aiyou/modules/theme/index.js?media=${Date.now()}`,import.meta.url));host.apply(ctx);
  async function request(query,method='GET'){
   const req={method,url:'/aiyoucodex-dsh/theme/media?'+query,headers:{}};let status,raw,headers;
   const res={setHeader(){},writeHead(value,values){status=value;headers=values;},end(value){raw=value;}};
   await routes.get('/aiyoucodex-dsh/theme/media').handler(req,res);return {status,raw,headers};
  }
  rejection=401;let response=await request('id=mecha-control');assert.equal(response.status,401);assert.match(String(response.raw),/请先登录/u);
  rejection=undefined;response=await request('id=mecha-control');assert.equal(response.status,200);assert.equal(response.headers['content-type'],'image/png');assert.equal(response.headers['x-content-type-options'],'nosniff');assert.ok(Buffer.isBuffer(response.raw));
  response=await request('id=mecha-control','HEAD');assert.equal(response.status,200);assert.equal(response.raw,undefined);
  response=await request('id=..%2Fprivate');assert.equal(response.status,400);
  response=await request('id=not-declared');assert.equal(response.status,404);
 }finally{if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;await new Promise(resolve=>setTimeout(resolve,20));await rm(fixture,{recursive:true,force:true});}
});

test('configuration validation matches client, applies individual surfaces/colors, and preserves independent defaults',()=>{
 for(const theme of Object.values(THEMES)){
  assert.deepEqual(JSON.parse(JSON.stringify(api.defaultConfiguration(theme))),defaultConfiguration(theme));
  assert.deepEqual(JSON.parse(JSON.stringify(api.normalizeConfiguration({},theme))),normalizeConfiguration({},theme));
 }
 const configured=configureTheme(dark,{alpha:{composer:0.17,'composer-area':0.68,text:0.84},colors:{primary:'#ffffff',bg:'#111122'},background:{x:31,y:62,opacity:0.73},motion:true});
 const css=api.buildThemeSurfaceCss(configured);assert.ok(css.includes('--aiyou-harness-composer-fill:rgba(27, 42, 56, 0.17)'));
 assert.ok(css.includes('--aiyou-harness-composer-area-fill:rgba(19, 31, 43, 0.68)'));assert.ok(css.includes('background-position:31% 62%'));
 assert.equal(api.buildTokens(configured).tokens['--dsw-alias-label-primary'].light,'rgba(255, 255, 255, 0.84)');
 for(const invalid of [{alpha:{composer:2}},{background:{x:-1}},{background:{type:'file://private'}},{colors:{bg:'red'}},{extra:1},{motion:'true'},{colors:{unknown:'#ffffff'}}])assert.throws(()=>normalizeConfiguration(invalid,dark));
 assert.equal(normalizeConfiguration({background:{type:'video'}},pink).background.type,'image');
 assert.equal(defaultConfiguration(dark).background.type,'video');assert.equal(defaultConfiguration(dark).motion,true);
 assert.ok(api.buildThemeSurfaceCss(configureTheme(dark,{motion:false})).includes('url("/aiyoucodex-dsh/theme/media?id=mecha-control")'),'video mode must retain original static fallback when motion is disabled or fails');
});

function motionFixture(){
 const listeners=new Map(),reducedListeners=new Map(),frames=[];
 const attrs=new Map(),frame={children:[],setAttribute:(key,value)=>attrs.set(key,value),removeAttribute:key=>attrs.delete(key),appendChild(node){this.children.push(node);node.parent=this;}};
 const reduced={matches:false,addEventListener:(event,fn)=>reducedListeners.set(event,fn),removeEventListener:(event,fn)=>{if(reducedListeners.get(event)===fn)reducedListeners.delete(event);}};
 const doc={hidden:false,documentElement:{},head:{},observers:[],querySelector:selector=>{assert.equal(selector,'._6Qf49G_frame');return frame;},
  addEventListener:(event,fn)=>listeners.set(event,fn),removeEventListener:(event,fn)=>{if(listeners.get(event)===fn)listeners.delete(event);},
  createElement(tag){assert.equal(tag,'video');const events=new Map(),attributes=new Map();const node={style:{},events,attributes,paused:0,loaded:0,played:0,
   setAttribute:(key,value)=>attributes.set(key,value),removeAttribute(key){attributes.delete(key);if(key==='src')delete this.src;},addEventListener:(event,fn)=>events.set(event,fn),removeEventListener:(event,fn)=>{if(events.get(event)===fn)events.delete(event);},
   pause(){this.paused++;},load(){this.loaded++;},play(){this.played++;return Promise.resolve();},remove(){if(this.parent){this.parent.children=this.parent.children.filter(node=>node!==this);this.parent=null;}}};frames.push(node);return node;},
 };
 doc.defaultView={matchMedia:()=>reduced,MutationObserver:class{constructor(callback){this.callback=callback;doc.observers.push(this);}observe(){this.connected=true;}disconnect(){this.connected=false;}}};
 return {doc,frame,frames,attrs,listeners,reduced,reducedListeners};
}

test('real-video controller owns silent playback, edits without restart, static fallback, visibility/reduced-motion and full cleanup',async()=>{
 const f=motionFixture(),motion=api.createMotionBackground(f.doc),theme=configureTheme(dark,{});
 motion.set(theme);let video=f.frame.children[0];assert.ok(video.src.endsWith('id=mecha-control&slot=loop'));assert.equal(video.loop,true);assert.equal(video.muted,true);assert.equal(video.controls,false);assert.equal(video.tabIndex,-1);
 video.events.get('loadeddata')();await new Promise(resolve=>setImmediate(resolve));assert.equal(video.played,1);assert.equal(f.attrs.has('data-aiyou-video-ready'),true);
 motion.set(configureTheme(dark,{background:{x:30,opacity:0.71}}));assert.equal(f.frame.children[0],video);assert.equal(video.style.opacity,'0.71');assert.equal(video.style.objectPosition,'30% 50%');
 f.doc.hidden=true;f.listeners.get('visibilitychange')();assert.equal(f.frame.children.length,0);assert.ok(video.paused);assert.equal(video.src,undefined);assert.equal(video.events.size,0);assert.equal(f.attrs.size,0);
 f.doc.hidden=false;f.listeners.get('visibilitychange')();assert.equal(f.frame.children.length,1);
 f.reduced.matches=true;f.reducedListeners.get('change')();assert.equal(f.frame.children.length,0);
 f.reduced.matches=false;f.reducedListeners.get('change')();video=f.frame.children[0];video.events.get('error')();assert.equal(f.frame.children.length,0);
 f.listeners.get('visibilitychange')();assert.equal(f.frame.children.length,0,'failed video must retain static fallback');
 motion.set(configureTheme(dark,{motion:false}));assert.equal(f.frame.children.length,0);
 motion.set(theme);assert.equal(f.frame.children.length,1);motion.dispose();motion.dispose();assert.equal(f.frame.children.length,0);assert.equal(f.listeners.size,0);assert.equal(f.reducedListeners.size,0);assert.ok(f.doc.observers.every(observer=>!observer.connected));
 assert.ok(!source.includes("addEventListener('click',"));assert.ok(!source.includes("addEventListener('keydown',"));
});

test('original MP4 and range responses support Electron byte seeks, suffix/open ranges and invalid range boundaries',async()=>{
 const media=await readBackground('mecha-control',undefined,undefined,'loop');assert.equal(media.mime,'video/mp4');assert.equal(media.bytes.toString('ascii',4,8),'ftyp');assert.equal(media.bytes.length,3214522);
 for(const [range,start,end]of [['bytes=0-1023',0,1023],['bytes=20-',20,media.bytes.length-1],['bytes=-100',media.bytes.length-100,media.bytes.length-1]]){
  const value=mediaResponse(media,range);assert.equal(value.status,206);assert.equal(value.headers['content-range'],`bytes ${start}-${end}/${media.bytes.length}`);assert.deepEqual(value.body,media.bytes.subarray(start,end+1));assert.equal(mediaResponse(media,range,true).body,undefined);
 }
 for(const range of ['bytes=9999999-','bytes=10-1','bytes=-0','bytes=0-1,5-8','invalid']){const value=mediaResponse(media,range);assert.equal(value.status,416);assert.equal(value.headers['content-range'],`bytes */${media.bytes.length}`);}
 await assert.rejects(readBackground('pink-candy',undefined,undefined,'loop'),error=>error.status===404);
});

test('host migrates saved selection, persists per-theme options atomically, and rejects stale/invalid saves without overwriting state',async()=>{
 const fixture=await mkdtemp(join(tmpdir(),'aiyou-theme-configuration-')),previous=process.env.DSH_HOME;process.env.DSH_HOME=fixture;
 await mkdir(join(fixture,'aiyou-enhancer'),{recursive:true});await writeFile(join(fixture,'aiyou-enhancer/theme.json'),JSON.stringify({active:pink.id,retained:'legacy-field'}));
 const routes=new Map(),ctx={get:()=>({requestRejection:()=>undefined}),effect:fn=>fn(),webServer:{register:route=>{routes.set(route.path,route);return ()=>{};}},inject(_services,apply){apply(this);}};
 try{
  (await import(new URL(`../aiyou/modules/theme/index.js?configuration=${Date.now()}`,import.meta.url))).apply(ctx);
  async function request(path,payload){const req=Readable.from(payload?[Buffer.from(JSON.stringify(payload))]:[]);Object.assign(req,{method:payload?'POST':'GET',url:path,headers:payload?{'content-type':'application/json'}:{}});let status,raw;const res={setHeader(){},writeHead(value){status=value;},end(value){raw=value;}};await routes.get(path.split('?')[0]).handler(req,res);return {status,value:JSON.parse(raw)};}
  let value=await request('/aiyoucodex-dsh/theme');assert.equal(value.value.active,pink.id);assert.equal(value.value.revision,0);
  let result=await request('/aiyoucodex-dsh/theme/select',{id:dark.id,options:{alpha:{composer:0.17,'session-card':0},background:{x:28},colors:{primary:'#ffffff'}},ifRevision:0});assert.equal(result.status,200);assert.equal(result.value.revision,1);assert.equal(result.value.detail.configuration.alpha.composer,0.17);
  const concurrent=await Promise.all([request('/aiyoucodex-dsh/theme/select',{id:pink.id,options:{background:{x:19}},ifRevision:1}),request('/aiyoucodex-dsh/theme/select',{id:dark.id,options:{background:{x:71}},ifRevision:1})]);assert.deepEqual(concurrent.map(result=>result.status).sort(),[200,409]);
  const state=JSON.parse(await readFile(join(fixture,'aiyou-enhancer/theme.json'),'utf8'));assert.equal(state.retained,'legacy-field');assert.equal(state.options[dark.id].alpha.composer,0.17);assert.equal(state.options[dark.id].alpha['session-card'],0);assert.equal(state.revision,2);
  result=await request('/aiyoucodex-dsh/theme/select',{id:dark.id,options:{alpha:{composer:2}},ifRevision:2});assert.equal(result.status,400);assert.equal(JSON.parse(await readFile(join(fixture,'aiyou-enhancer/theme.json'),'utf8')).revision,2);
  result=await request('/aiyoucodex-dsh/theme/detail?id='+dark.id);assert.equal(result.value.configuration.background.x,concurrent[1].status===200?71:28);assert.equal(result.value.base.configuration,undefined);assert.equal(result.value.defaultConfiguration.alpha.composer,dark.controls.alpha.composer);
  result=await request('/aiyoucodex-dsh/theme/select',{id:'system',ifRevision:2});assert.equal(result.status,200);assert.equal(result.value.detail,null);assert.equal(JSON.parse(await readFile(join(fixture,'aiyou-enhancer/theme.json'),'utf8')).options[dark.id].alpha.composer,0.17);
 }finally{if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;await new Promise(resolve=>setTimeout(resolve,20));await rm(fixture,{recursive:true,force:true});}
});

function configurationRemote(){
 let active=dark.id,revision=0;const options={},calls=[];
 const detail=id=>id==='system'?null:configureTheme(THEMES[id],options[id]||{});
 return {calls,request:async(url,init={})=>{
  calls.push({url,init});
  if(init.method==='POST'){
   const payload=JSON.parse(init.body);if(payload.ifRevision!==revision)return {ok:false,json:async()=>({error:'配置已在其他窗口更新'})};
   active=payload.id;if(payload.options)options[active]=normalizeConfiguration(payload.options,THEMES[active]);revision++;
   return {ok:true,json:async()=>({active,detail:detail(active),revision})};
  }
  if(url.includes('/detail?')){const id=new URL(url,'http://fixture').searchParams.get('id');return {ok:true,json:async()=>detail(id)};}
  return {ok:true,json:async()=>({active,detail:detail(active),revision,themes:[{id:'system',label:'系统默认'},...Object.values(THEMES)]})};
 }};
}

test('same-theme configuration previews become dirty; cancel/default/reset and save preserve exact parameters',async()=>{
 const {controller,doc}=controllerFixture(),remote=configurationRemote(),session=api.createThemeSession(controller,remote.request);
 let state=await session.load();assert.equal(state.dirty,false);
 state=session.edit({alpha:{composer:0.22},background:{x:41},colors:{bg:'#112233'}});assert.equal(state.dirty,true);assert.equal(state.draftId,state.savedId);assert.ok(doc.head.children[0].textContent.includes('background-position:41% 50%'));
 state=session.cancel();assert.equal(state.dirty,false);assert.equal(state.previewDetail.configuration.background.x,75);assert.equal(remote.calls.filter(call=>call.init.method==='POST').length,0);
 session.edit({alpha:{composer:0.22}});state=session.reset();assert.equal(state.dirty,false);assert.equal(state.previewDetail.configuration.alpha.composer,dark.controls.alpha.composer);
 session.edit({alpha:{composer:0.22},motion:false});state=await session.save();assert.equal(state.dirty,false);assert.equal(state.previewDetail.configuration.alpha.composer,0.22);assert.equal(state.revision,1);
 const savedPayload=JSON.parse(remote.calls.find(call=>call.init.method==='POST').init.body);assert.equal(savedPayload.ifRevision,0);assert.equal(savedPayload.options.motion,false);assert.equal(savedPayload.options.alpha.composer,0.22);
 await session.preview(pink.id);state=session.cancel();assert.equal(state.previewDetail.configuration.alpha.composer,0.22);
 session.dispose();controller.dispose();
});

test('reopening settings ignores a catalogue read older than a completed save',async()=>{
 const {controller,doc}=controllerFixture(),pending=deferred();
 const session=api.createThemeSession(controller,()=>pending.promise);
 const opening=session.load();
 const saved=configureTheme(pink,{alpha:{sidebar:0},background:{x:32,opacity:0.61}});
 controller.commit({id:pink.id,detail:saved,hostRevision:9});
 pending.resolve(response({active:pink.id,detail:configureTheme(pink,{}),revision:8,themes:[{id:pink.id}]}));
 const state=await opening;
 assert.equal(state.previewDetail.configuration.background.x,32);
 assert.equal(state.previewDetail.configuration.background.opacity,0.61);
 assert.equal(state.previewDetail.configuration.alpha.sidebar,0);
 assert.equal(state.revision,9);assert.equal(state.dirty,false);
 assert.ok(doc.head.children[0].textContent.includes('background-position:32% 50%'));
 session.dispose();controller.dispose();
});

test('conversation card transparency is independent and survives save and a fresh settings controller',async()=>{
 const {controller}=controllerFixture(),remote=configurationRemote(),session=api.createThemeSession(controller,remote.request);
 await session.load();
 const before=session.snapshot().previewDetail.configuration;
 session.edit({alpha:{'session-card':0},background:{x:29}});
 const saved=await session.save();
 assert.equal(saved.previewDetail.configuration.alpha.card,before.alpha.card);
 session.dispose();controller.dispose();
 const reopenedController=controllerFixture().controller,reopened=api.createThemeSession(reopenedController,remote.request);
 const state=await reopened.load();
 assert.equal(state.previewDetail.configuration.alpha['session-card'],0);
 assert.equal(state.previewDetail.configuration.background.x,29);
 assert.equal(state.dirty,false);
 const css=api.buildThemeSurfaceCss(state.previewDetail);
 assert.match(css,/--aiyou-harness-session-card-fill:rgba\([^;]+, 0\);/u);
 assert.match(css,/\[data-aiyou-session-card\]\{[^}]*--dsw-alias-interactive-bg-hover:var\(--aiyou-harness-session-row-fill\)/u);
 const legacy=normalizeConfiguration({alpha:{card:0.37}},pink);
 assert.equal(legacy.alpha['session-card'],0.37);
 assert.deepEqual(JSON.parse(JSON.stringify(api.normalizeConfiguration({alpha:{card:0.37}},pink))),JSON.parse(JSON.stringify(legacy)));
 reopened.dispose();reopenedController.dispose();
});

test('save completion cannot replace a newer local edit or a later preview after the old settings panel closes',async()=>{
 const {controller,doc}=controllerFixture(),remote=configurationRemote();let finish,payload;
 const request=(url,init)=>init?.method==='POST'?new Promise(resolve=>{payload=JSON.parse(init.body);finish=()=>resolve({ok:true,json:async()=>({active:payload.id,detail:configureTheme(THEMES[payload.id],payload.options),revision:1})});}):remote.request(url,init);
 const session=api.createThemeSession(controller,request);await session.load();session.edit({background:{x:44}});let saving=session.save();
 session.edit({background:{x:81}});finish();let state=await saving;assert.equal(state.dirty,true);assert.equal(state.previewDetail.configuration.background.x,81);assert.ok(doc.head.children[0].textContent.includes('background-position:81% 50%'));
 state=session.cancel();assert.equal(state.previewDetail.configuration.background.x,44);assert.equal(state.dirty,false);
 session.edit({background:{x:33}});saving=session.save();session.dispose();controller.preview(selection(pink),'new-panel');finish();assert.equal(await saving,null);assert.equal(doc.documentElement.getAttribute(attr),pink.id);controller.dispose();
});

test('configuration page renders native interactive settings and wires controls to live preview',async()=>{
 const {controller,layers}=controllerFixture(),remote=configurationRemote(),session=api.createThemeSession(controller,remote.request);let current=await session.load(),hookIndex=0,refIndex=0;
 const React={Fragment:'fragment',createElement:(tag,props,...children)=>({tag,props:props||{},children}),
  useState(initial){const index=hookIndex++;return [index===0?current:initial,value=>{if(index===0)current=value;}];},useRef(){return {current:refIndex++===0?session:true};},useCallback:fn=>fn,useEffect(){}};
 definition.factory(name=>{assert.equal(name,'react');return React;});
 const render=()=>{hookIndex=0;refIndex=0;const tree=sandbox.themeTest.ThemePanel(),nodes=[];const walk=node=>{if(Array.isArray(node))return node.forEach(walk);if(node&&typeof node==='object'){nodes.push(node);node.children?.forEach(walk);}};walk(tree);return nodes;};
 let nodes=render();const byLabel=label=>nodes.find(node=>node.props['aria-label']===label);
 assert.ok(byLabel('界面主题'));assert.ok(byLabel('背景模式'));assert.equal(byLabel('播放动态背景').props.checked,true);assert.ok(byLabel('主要文字 HEX'));
 assert.equal(nodes.filter(node=>node.tag==='input'&&node.props.type==='range').length,27);
 byLabel('对话卡片透明度').props.onChange({target:{value:'100'}});assert.equal(current.previewDetail.configuration.alpha['session-card'],0);
 byLabel('输入框内部透明度').props.onChange({target:{value:'71'}});assert.equal(current.dirty,true);assert.ok(Math.abs(current.previewDetail.configuration.alpha.composer-0.29)<1e-9);
 nodes=render();byLabel('主要文字 HEX').props.onBlur({target:{value:'#ffffff'}});assert.equal(layers.values().next().value.tokens['--dsw-alias-label-primary'].light,'rgba(255, 255, 255, 1)');
 nodes=render();byLabel('背景模式').props.onChange({target:{value:'image'}});assert.equal(current.previewDetail.configuration.background.type,'image');
 nodes=render();assert.equal(byLabel('画布背景颜色').props.disabled,true);byLabel('画布配色跟随主题').props.onChange({target:{checked:false}});nodes=render();byLabel('画布节点颜色').props.onChange({target:{value:'#123456'}});byLabel('画布节点透明度').props.onChange({target:{value:'65'}});nodes=render();byLabel('画布背景模式').props.onChange({target:{value:'transparent'}});assert.equal(current.previewDetail.configuration.canvas.colors.node,'#123456');assert.ok(Math.abs(current.previewDetail.configuration.canvas.opacity.node-0.35)<1e-9);assert.equal(current.previewDetail.configuration.canvas.background.mode,'transparent');
 nodes.find(node=>node.tag==='button'&&node.children.includes('恢复本主题默认设置')).props.onClick();assert.equal(current.dirty,false);
 session.dispose();controller.dispose();
});

test('remote saved themes update idle windows, skip unchanged revisions, and preserve local previews until cancel',async()=>{
 const doc=remotePageFixture(),{controller}=controllerFixture(doc),remote=savedThemeRemote(pink,4);
 controller.commit(normalizedSelection(pink,4));const sync=api.createThemeRemoteSync(controller,remote.request,doc);
 try{
  await sync.ready;assert.equal(remote.calls.length,2);assert.equal(intervals.size,1);
  assert.equal([...intervals.values()][0].delay,1500);assert.equal(doc.listeners.get('visibilitychange').size,1);assert.equal(doc.defaultView.listeners.get('focus').size,1);
  assert.equal(doc.defaultView.events.filter(e=>e.type==='dsh-theme-saved').length,0);
  await sync.refresh();assert.equal(remote.calls.length,3,'unchanged status must not fetch a full theme');
  assert.ok(remote.calls.every(call=>call.init.cache==='no-store'&&call.init.signal instanceof AbortSignal));
  remote.set(configureTheme(dark,{}),5);await sync.refresh();
  assert.equal(controller.saved.id,dark.id);assert.equal(controller.hostRevision,5);assert.equal(doc.documentElement.getAttribute(attr),dark.id);
  let event=doc.defaultView.events.filter(e=>e.type==='dsh-theme-saved').at(-1);assert.equal(event.detail.revision,5);assert.equal(event.detail.preservePreview,false);
  const owner={};controller.preview(normalizedSelection(pink,5),owner);const previewCss=doc.head.children[0].textContent;
  remote.set(configureTheme(dark,{background:{x:37},canvas:{followTheme:false,colors:{node:'#123456'}}}),6);await sync.refresh();
  assert.equal(controller.saved.detail.configuration.background.x,37);assert.equal(controller.saved.detail.configuration.canvas.colors.node,'#123456');
  assert.equal(doc.documentElement.getAttribute(attr),pink.id);assert.equal(doc.head.children[0].textContent,previewCss);assert.equal(controller.hasPreview,true);
  event=doc.defaultView.events.filter(e=>e.type==='dsh-theme-saved').at(-1);assert.equal(event.detail.revision,6);assert.equal(event.detail.preservePreview,true);
  controller.cancel(owner);assert.equal(doc.documentElement.getAttribute(attr),dark.id);assert.ok(doc.head.children[0].textContent.includes('background-position:37% 50%'));
  assert.equal(controller.hasPreview,false);assert.ok(remote.calls.every(call=>!call.init.method),'remote synchronization must never persist a preview');
 }finally{sync.dispose();controller.dispose();}
 assert.equal(intervals.size,0);assert.equal(doc.listeners.size,0);assert.equal(doc.defaultView.listeners.size,0);assert.ok(doc.observers.every(o=>!o.connected));
});

test('remote focus, visibility and polling coalesce in-flight reads; stale revisions cannot roll back a newer host save',async()=>{
 const doc=remotePageFixture(),{controller}=controllerFixture(doc),remote=savedThemeRemote(pink,10),gate=deferred();let pending=false;
 const request=(url,init)=>{if(pending&&url.endsWith('/state')){remote.calls.push({url,init});return gate.promise;}return remote.request(url,init);};
 controller.commit(normalizedSelection(pink,10));const sync=api.createThemeRemoteSync(controller,request,doc);
 try{
  await sync.ready;pending=true;const before=remote.calls.length,read=sync.refresh();
  doc.defaultView.dispatchEvent(new Event('focus'));doc.dispatchEvent(new Event('visibilitychange'));[...intervals.values()][0].fn();await sync.refresh();
  assert.equal(remote.calls.length,before+1,'one state read must own all concurrent triggers');
  remote.set(configureTheme(dark,{}),11);gate.resolve(response({revision:11}));await read;assert.equal(controller.saved.id,dark.id);assert.equal(controller.hostRevision,11);
  pending=false;controller.commit(normalizedSelection(configureTheme(pink,{background:{x:64}}),20));remote.set(configureTheme(dark,{}),12);
  const calls=remote.calls.length;await sync.refresh();assert.equal(remote.calls.length,calls+1,'an older status must be rejected before fetching its document');assert.equal(controller.hostRevision,20);assert.equal(controller.saved.id,pink.id);assert.equal(controller.saved.detail.configuration.background.x,64);
  remote.set(configureTheme(dark,{background:{x:9}}),21);doc.defaultView.dispatchEvent(new Event('focus'));await settle();assert.equal(controller.hostRevision,21);assert.equal(controller.saved.detail.configuration.background.x,9);
 }finally{gate.resolve(response({revision:0}));sync.dispose();controller.dispose();}
 assert.equal(intervals.size,0);assert.equal(doc.listeners.size,0);assert.equal(doc.defaultView.listeners.size,0);
});

test('remote disposal aborts the outstanding read, detaches triggers, and ignores a late successful response',async()=>{
 const doc=remotePageFixture(),{controller}=controllerFixture(doc),remote=savedThemeRemote(pink,1),gate=deferred();let block=false;
 const request=(url,init)=>{if(block&&url.endsWith('/state')){remote.calls.push({url,init});return gate.promise;}return remote.request(url,init);};
 controller.commit(normalizedSelection(pink,1));const sync=api.createThemeRemoteSync(controller,request,doc);await sync.ready;block=true;
 const pending=sync.refresh(),signal=remote.calls.at(-1).init.signal,css=doc.head.children[0].textContent,calls=remote.calls.length;
 try{
  sync.dispose();sync.dispose();assert.equal(signal.aborted,true);assert.equal(intervals.size,0);assert.equal(doc.listeners.size,0);assert.equal(doc.defaultView.listeners.size,0);
  gate.resolve(response({revision:99}));await pending;await sync.refresh();doc.defaultView.dispatchEvent(new Event('focus'));doc.dispatchEvent(new Event('visibilitychange'));await settle();
  assert.equal(remote.calls.length,calls);assert.equal(controller.saved.id,pink.id);assert.equal(controller.hostRevision,1);assert.equal(doc.head.children[0].textContent,css);
 }finally{gate.resolve(response({revision:99}));sync.dispose();controller.dispose();}
 assert.equal(intervals.size,0);
});

test('remote request failures are deduplicated and a later valid revision resumes saved-theme updates',async()=>{
 const doc=remotePageFixture(),{controller}=controllerFixture(doc),remote=savedThemeRemote(pink,1);let fail=false;
 const request=(url,init)=>fail?Promise.resolve({ok:false,json:async()=>({error:'受控离线'})}):remote.request(url,init);
 controller.commit(normalizedSelection(pink,1));const sync=api.createThemeRemoteSync(controller,request,doc),before=themeWarnings.length;
 try{
  await sync.ready;fail=true;await sync.refresh();await sync.refresh();assert.equal(themeWarnings.length,before+1);assert.equal(controller.saved.id,pink.id);
  fail=false;remote.set(configureTheme(dark,{}),2);await sync.refresh();assert.equal(controller.saved.id,dark.id);assert.equal(controller.hostRevision,2);
 }finally{sync.dispose();controller.dispose();}
 assert.equal(intervals.size,0);
});

test('remote system selection keeps native tokens and applies the saved canvas configuration',async()=>{
 const doc=remotePageFixture(),{controller,layers}=controllerFixture(doc),remote=savedThemeRemote(dark,1);
 controller.commit(normalizedSelection(dark,1));const sync=api.createThemeRemoteSync(controller,remote.request,doc);
 try{
  await sync.ready;Object.assign(remote.value,{active:'system',detail:null,revision:2,systemConfiguration:{canvas:{followTheme:false,colors:{node:'#234567'},background:{mode:'transparent',grid:'lines'}}}});await sync.refresh();
  assert.equal(controller.saved.id,'system');assert.equal(controller.hostRevision,2);assert.equal(controller.saved.detail.configuration.canvas.colors.node,'#234567');assert.equal(controller.saved.detail.configuration.canvas.background.mode,'transparent');assert.equal(controller.saved.detail.configuration.canvas.background.grid,'lines');
  assert.equal(layers.size,0,'system must release custom host token overrides');assert.equal(doc.head.children.length,0);assert.equal(doc.documentElement.getAttribute(attr),null);assert.equal(doc.defaultView.events.filter(e=>e.type==='dsh-theme-saved').at(-1).detail.preservePreview,false);
 }finally{sync.dispose();controller.dispose();}
 assert.equal(intervals.size,0);
});

test('clean theme selections and edits reverted to saved values release preview ownership and accept other-window saves',async()=>{
 for(const action of ['select-current','edit-revert']){
  const doc=remotePageFixture(),{controller}=controllerFixture(doc),remote=savedThemeRemote(dark,0),session=api.createThemeSession(controller,remote.request);let sync;
  try{
   let state=await session.load();const originalX=state.previewDetail.configuration.background.x;
   if(action==='select-current')state=await session.preview(dark.id);
   else{state=session.edit({background:{x:13}});assert.equal(state.dirty,true);assert.equal(controller.hasPreview,true);state=session.edit({background:{x:originalX}});}
   assert.equal(state.dirty,false,action+' matches the persisted configuration');assert.equal(controller.hasPreview,false,action+' must not retain an invisible dirty-preview owner');
   sync=api.createThemeRemoteSync(controller,remote.request,doc);await sync.ready;remote.set(configureTheme(dark,{background:{x:62}}),1);await sync.refresh();
   assert.equal(controller.hasPreview,false);assert.equal(controller.saved.detail.configuration.background.x,62);assert.ok(doc.head.children[0].textContent.includes('background-position:62% 50%'),'clean settings must not suppress the remote presentation');assert.equal(doc.defaultView.events.filter(e=>e.type==='dsh-theme-saved').at(-1).detail.preservePreview,false);
  }finally{sync?.dispose();session.dispose();controller.dispose();}
  assert.equal(intervals.size,0);
 }
});

test('a save that completes after its panel closes becomes the saved baseline when no newer view owns the theme',async()=>{
 const {controller,doc}=controllerFixture(),remote=savedThemeRemote(pink,10),gate=deferred();let body;
 const request=(url,init)=>init?.method==='POST'?(body=JSON.parse(init.body),gate.promise):remote.request(url,init);
 const session=api.createThemeSession(controller,request);
 try{
  await session.load();session.edit({background:{x:43},canvas:{followTheme:false,colors:{node:'#225577'}}});const saving=session.save();assert.equal(body.ifRevision,10);
  session.dispose();assert.equal(doc.documentElement.getAttribute(attr),pink.id);assert.equal(controller.saved.detail.configuration.background.x,75);
  gate.resolve(response({active:body.id,detail:configureTheme(THEMES[body.id],body.options),revision:11}));assert.equal(await saving,null);
  assert.equal(controller.hostRevision,11);assert.equal(controller.hasPreview,false);assert.equal(controller.saved.detail.configuration.background.x,43);assert.equal(controller.saved.detail.configuration.canvas.colors.node,'#225577');assert.ok(doc.head.children[0].textContent.includes('background-position:43% 50%'));
 }finally{gate.resolve(response({active:pink.id,detail:configureTheme(pink,{}),revision:11}));session.dispose();controller.dispose();}
 assert.equal(doc.head.children.length,0);assert.equal(intervals.size,0);
});

test('closed-panel save completion preserves a newer preview but its cancel restores that latest saved configuration',async()=>{
 const {controller,doc}=controllerFixture(),remote=savedThemeRemote(dark,20),gate=deferred();let body;
 const first=api.createThemeSession(controller,(url,init)=>init?.method==='POST'?(body=JSON.parse(init.body),gate.promise):remote.request(url,init));let second;
 try{
  await first.load();first.edit({background:{x:29},canvas:{followTheme:false,colors:{node:'#334455'}}});const saving=first.save();first.dispose();
  second=api.createThemeSession(controller,remote.request);await second.load();await second.preview(pink.id);second.edit({background:{x:82}});const preview=doc.head.children[0].textContent;
  gate.resolve(response({active:body.id,detail:configureTheme(THEMES[body.id],body.options),revision:21}));assert.equal(await saving,null);
  assert.equal(controller.saved.detail.configuration.background.x,29);assert.equal(controller.saved.detail.configuration.canvas.colors.node,'#334455');assert.equal(controller.hostRevision,21);
  assert.equal(controller.hasPreview,true);assert.equal(doc.documentElement.getAttribute(attr),pink.id);assert.equal(doc.head.children[0].textContent,preview);assert.equal(second.snapshot().dirty,true);
  const state=second.cancel();assert.equal(state.dirty,false);assert.equal(state.savedId,dark.id);assert.equal(state.previewDetail.configuration.background.x,29);assert.equal(state.previewDetail.configuration.canvas.colors.node,'#334455');assert.ok(doc.head.children[0].textContent.includes('background-position:29% 50%'));
 }finally{gate.resolve(response({active:dark.id,detail:configureTheme(dark,{}),revision:21}));first.dispose();second?.dispose();controller.dispose();}
 assert.equal(intervals.size,0);
});

test('a closed panel cannot replace a newer server revision with its delayed save receipt',async()=>{
 const {controller,doc}=controllerFixture(),remote=savedThemeRemote(pink,3),gate=deferred();let body;
 const session=api.createThemeSession(controller,(url,init)=>init?.method==='POST'?(body=JSON.parse(init.body),gate.promise):remote.request(url,init));
 try{
  await session.load();session.edit({background:{x:31}});const saving=session.save();session.dispose();
  controller.commit(normalizedSelection(configureTheme(dark,{background:{x:68}}),9));const latest=doc.head.children[0].textContent;
  gate.resolve(response({active:body.id,detail:configureTheme(THEMES[body.id],body.options),revision:4}));assert.equal(await saving,null);
  assert.equal(controller.hostRevision,9);assert.equal(controller.saved.id,dark.id);assert.equal(controller.saved.detail.configuration.background.x,68);assert.equal(doc.head.children[0].textContent,latest);
 }finally{gate.resolve(response({active:pink.id,detail:configureTheme(pink,{}),revision:4}));session.dispose();controller.dispose();}
 assert.equal(intervals.size,0);
});

test('owned nested documents support late mounting, navigation quarantine and complete branch removal',()=>{
 const {doc,controller}=controllerFixture(),canvas=documentFixture('dsh-app://app/aiyoucodex-dsh/canvas/ui/'),assets=documentFixture('dsh-app://app/aiyoucodex-dsh/asset-console/ui/');
 assets.documentElement.setAttribute(attr,'prior-theme');assets.documentElement.setAttribute('data-aiyou-harness-mode','prior-mode');
 const outer=frameFixture('/aiyoucodex-dsh/canvas/ui/',canvas),inner=frameFixture('/aiyoucodex-dsh/asset-console/ui/',assets);doc.frames.push(outer);canvas.frames.push(inner);
 try{
  controller.commit(selection(dark));for(const child of [canvas,assets]){assert.equal(child.head.children.length,1);assert.equal(child.documentElement.getAttribute(attr),dark.id);assert.equal(child.documentElement.getAttribute('data-aiyou-harness-mode'),'dark');}
  const model=documentFixture('dsh-app://app/aiyoucodex-dsh/canvas/model-settings/'),late=frameFixture('/aiyoucodex-dsh/canvas/model-settings/',model);assets.frames.push(late);assets.observers.find(o=>o.connected).callback([{type:'childList',target:assets.documentElement}]);
  assert.equal(model.head.children.length,1);assert.equal(late.listeners.size,1);assert.equal(model.documentElement.getAttribute(attr),dark.id);
  controller.commit(selection(pink));for(const child of [canvas,assets,model]){assert.equal(child.head.children.length,1);assert.equal(child.documentElement.getAttribute(attr),pink.id);assert.equal(child.documentElement.getAttribute('data-aiyou-harness-mode'),'light');}
  const untrusted=documentFixture('dsh-app://app/private/same-origin-page');inner.contentDocument=untrusted;inner.listeners.get('load')();
  assert.equal(untrusted.head.children.length,0);assert.equal(assets.head.children.length,0);assert.equal(assets.documentElement.getAttribute(attr),'prior-theme');assert.equal(assets.documentElement.getAttribute('data-aiyou-harness-mode'),'prior-mode');assert.equal(model.head.children.length,0);assert.equal(late.listeners.size,0);assert.ok(assets.observers.every(o=>!o.connected));assert.ok(model.observers.every(o=>!o.connected));
  const replacement=documentFixture('dsh-app://app/aiyoucodex-dsh/taskboard/ui/');inner.contentDocument=replacement;inner.listeners.get('load')();assert.equal(replacement.head.children.length,1);
  doc.frames=[];doc.observers.find(o=>o.connected).callback([{type:'childList',target:doc.documentElement}]);assert.equal(canvas.head.children.length,0);assert.equal(replacement.head.children.length,0);assert.equal(outer.listeners.size,0);assert.equal(inner.listeners.size,0);assert.ok(canvas.observers.every(o=>!o.connected));assert.ok(replacement.observers.every(o=>!o.connected));
 }finally{controller.dispose();}
 assert.ok(doc.observers.every(o=>!o.connected));assert.equal(intervals.size,0);
});

test('untrusted src, srcdoc and real document URLs never receive presentation injection or recursive access',()=>{
 const {doc,controller}=controllerFixture(),frames=[];let forbiddenReads=0;
 const forbidden=['https://outside.test/aiyoucodex-dsh/canvas/ui/','//outside.test/aiyoucodex-dsh/taskboard/ui/','about:blank','data:text/html,owned','blob:dsh-app://app/owned','file:///aiyoucodex-dsh/canvas/ui/','/aiyoucodex-dsh/canvas/ui-evil/','/aiyoucodex-dsh/canvas/ui/../private/','/not-owned/'];
 for(const src of forbidden){const frame=frameFixture(src,null);Object.defineProperty(frame,'contentDocument',{get(){forbiddenReads++;throw Error('must not access untrusted window');}});frames.push(frame);}
 const srcdoc=frameFixture('/aiyoucodex-dsh/canvas/ui/',null);srcdoc.setAttribute('srcdoc','');Object.defineProperty(srcdoc,'contentDocument',{get(){forbiddenReads++;throw Error('must not access srcdoc window');}});frames.push(srcdoc);
 const otherOrigin=documentFixture('https://outside.test/aiyoucodex-dsh/canvas/ui/'),wrongPath=documentFixture('dsh-app://app/secret'),blank=documentFixture('about:blank');
 for(const child of [otherOrigin,wrongPath,blank])frames.push(frameFixture('/aiyoucodex-dsh/canvas/ui/',child));doc.frames=frames;
 try{
  controller.commit(selection(pink));assert.equal(forbiddenReads,0);
  for(const child of [otherOrigin,wrongPath,blank]){assert.equal(child.head.children.length,0);assert.equal(child.documentElement.getAttribute(attr),null);assert.equal(child.observers.length,0);}
  for(const frame of frames.slice(0,forbidden.length+1))assert.equal(frame.listeners.size,0);
 }finally{controller.dispose();}
 for(const frame of frames)assert.equal(frame.listeners.size,0);assert.equal(intervals.size,0);
});

test.after(()=>{assert.equal(intervals.size,0,'all theme polling intervals must be disposed');});
