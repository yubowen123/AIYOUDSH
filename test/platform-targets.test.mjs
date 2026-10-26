import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {platformBaseline,rewriteThemeSelectors} from '../scripts/platform-targets.mjs';
import {THEMES} from '../aiyou/modules/theme/themes.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const source=await readFile(new URL('../aiyou/modules/theme/client.js',import.meta.url),'utf8');
const descriptor=JSON.parse(await readFile(new URL('../platforms/win32-x64-selectors.json',import.meta.url),'utf8'));
function load(code){
 let definition;
 const sandbox={URL,console,window:{__ModuleLoader__:{load:value=>{definition=value;}}}};
 vm.runInNewContext(code.replace('    // ---------- theme switcher panel ----------','    globalThis.platformTheme={buildThemeSurfaceCss,createMotionBackground};\n    // ---------- theme switcher panel ----------'),sandbox);
 definition.factory(name=>{assert.equal(name,'react');return {createElement:()=>null};});
 return sandbox.platformTheme;
}
test('official Mac and Windows manifests lock distinct archives and exact component sets',async()=>{
 const mac=await platformBaseline(root,'darwin-arm64'),win=await platformBaseline(root,'win32-x64');
 assert.equal(mac.buildCommit,win.buildCommit);assert.notEqual(mac.appAsarSha256,win.appAsarSha256);
 assert.equal(mac.compatibility.length,6);assert.equal(win.compatibility.length,6);
 assert.notEqual(mac.compatibility.find(x=>x.package.endsWith('ui-sidebar')&&x.file==='lib/client.js').sha256,win.compatibility.find(x=>x.package.endsWith('ui-sidebar')&&x.file==='lib/client.js').sha256);
 await assert.rejects(platformBaseline(root,'win32-arm64'),/Unsupported/);
});
test('Intel Mac pins the real rc.1 archive independently of Apple Silicon rc.2',async()=>{
 const arm=await platformBaseline(root,'darwin-arm64'),intel=await platformBaseline(root,'darwin-x64');
 assert.equal(intel.os,'darwin');assert.equal(intel.arch,'x64');assert.equal(intel.appVersion,'0.2.1-rc.1');
 assert.equal(intel.buildCommit,'ed75efeffee65f9fe93625bbd76a68cb219aaaf9');assert.equal(intel.minimumMacOS,'13.0');
 assert.notEqual(intel.appAsarSha256,arm.appAsarSha256);assert.equal(intel.compatibility.length,6);
 assert.match(intel.sourceUrl,/^https:\/\/download\.deepseek\.com\/dsh-desk\/bin\/mac-x64\//);
 assert.equal(Buffer.from(intel.archiveSha512,'base64').length,64);
});
test('Intel theme maps only proven native CSS exports and retains custom ARM-source UI classes',async()=>{
 const intelDescriptor=JSON.parse(await readFile(new URL('../platforms/darwin-x64-selectors.json',import.meta.url),'utf8'));
 const compiled=rewriteThemeSelectors(source,intelDescriptor),intel=load(compiled.source),mac=load(source);
 const frame=intelDescriptor.modules.find(x=>x.package.endsWith('ui-layout')).cssModules.find(x=>x.path.endsWith('/AppFrame.module.css.mjs')).exports.frame;
 const css=intel.buildThemeSurfaceCss(THEMES['mecha-control']);assert.ok(css.includes('.'+frame.intel));assert.ok(!css.includes('.'+frame.mac));
 assert.ok(mac.buildThemeSurfaceCss(THEMES['mecha-control']).includes('.'+frame.mac));assert.equal(compiled.references.length,31);
 const bad=structuredClone(intelDescriptor);bad.mapping[frame.mac]='unproven_intel_class';assert.throws(()=>rewriteThemeSelectors(source,bad),/evidence mismatch/);
});
test('Windows theme CSS follows official semantic exports while source Mac CSS stays unchanged',()=>{
 const compiled=rewriteThemeSelectors(source,descriptor);
 const win=load(compiled.source),mac=load(source);
 const frame=descriptor.modules.find(x=>x.package.endsWith('ui-layout')).cssModules.find(x=>x.path.endsWith('/AppFrame.module.css.mjs')).exports.frame;
 const winCss=win.buildThemeSurfaceCss(THEMES['mecha-control']);
 assert.ok(winCss.includes('.'+frame.windows));assert.ok(!winCss.includes('.'+frame.mac));
 assert.ok(mac.buildThemeSurfaceCss(THEMES['mecha-control']).includes('.'+frame.mac));
 assert.equal(compiled.references.length,31);
 const bad=structuredClone(descriptor);bad.mapping[frame.mac]='guessed_frame';
 assert.throws(()=>rewriteThemeSelectors(source,bad),/evidence mismatch/);
});
test('Windows video attaches to the actual Windows frame and fully releases its media',async()=>{
 const {source:compiled}=rewriteThemeSelectors(source,descriptor),api=load(compiled);
 const frameExport=descriptor.modules.find(x=>x.package.endsWith('ui-layout')).cssModules.find(x=>x.path.endsWith('/AppFrame.module.css.mjs')).exports.frame;
 const children=[],events=new Map(),queries=[];
 const frame={appendChild:video=>children.push(video),setAttribute(){},removeAttribute(){}};
 const page={hidden:false,documentElement:{},defaultView:{matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}})},
  addEventListener(){},removeEventListener(){},querySelector(selector){queries.push(selector);return selector==='.'+frameExport.windows?frame:null;},
  createElement(tag){assert.equal(tag,'video');return {style:{},setAttribute(){},removeAttribute(key){if(key==='src')this.src='';},addEventListener:(e,fn)=>events.set(e,fn),removeEventListener:e=>events.delete(e),load(){},play:()=>Promise.resolve(),pause(){this.paused=true;},remove(){children.splice(children.indexOf(this),1);}};}};
 const motion=api.createMotionBackground(page);
 motion.set({id:'mecha-control',configuration:{motion:true},background:{type:'video',videoUrl:'/only-an-identity-marker',opacity:0.46,fit:'cover',x:75,y:50}});
 assert.equal(children.length,1);assert.ok(queries.includes('.'+frameExport.windows));
 const video=children[0];assert.equal(video.muted,true);assert.equal(video.loop,true);
 assert.equal(video.src,'/aiyoucodex-dsh/theme/media?id=mecha-control&slot=loop');
 events.get('loadeddata')();await Promise.resolve();motion.dispose();
 assert.equal(children.length,0);assert.equal(video.src,'');assert.equal(video.paused,true);assert.equal(events.size,0);
});
