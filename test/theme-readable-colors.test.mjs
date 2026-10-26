import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {THEMES} from '../aiyou/modules/theme/themes.js';
const source=await readFile(new URL('../aiyou/modules/theme/client.js',import.meta.url),'utf8');let definition;
const box={URL,window:{__ModuleLoader__:{load:value=>definition=value}}};
vm.runInNewContext(source.replace('    // ---------- theme switcher panel ----------','    globalThis.colorTest={uiColor,compositeUiColor,uiContrast,readableUiInk,buildReadableUiVariables,buildAssetLibraryVariables,buildThemeSurfaceCss,buildEmbeddedThemeCss,configureTheme,controlLabel};\n    // ---------- theme switcher panel ----------'),box);
definition.factory(()=>({createElement:()=>null}));const api=box.colorTest;

test('readable pairs meet text and adjacent boundary targets for all built-in themes without editing preferences',()=>{
 for(const theme of Object.values(THEMES)){
  const before=JSON.stringify(theme),tokens=api.buildReadableUiVariables(theme);
  const value=key=>tokens['--dsh-readable-'+key];
  for(const role of ['accent','badge','selected','status','error','warning','danger']){
   assert.ok(api.uiContrast(value(role+'-ink'),value(role+'-bg'))>=4.5,theme.id+' '+role);
   assert.ok(api.uiContrast(value(role+'-border'),value('modal-bg'))>=3,theme.id+' '+role+' boundary');
  }
  for(const [ink,bg]of [['ink','bg'],['muted','bg'],['surface-ink','surface-bg'],['surface-muted','surface-bg'],['modal-ink','modal-bg'],['modal-muted','modal-bg']])assert.ok(api.uiContrast(value(ink),value(bg))>=4.5,theme.id+' '+ink);
  assert.equal(JSON.stringify(theme),before);
 }
});
test('extreme user accents, inverse labels and translucent materials keep original settings and derive readable controls',()=>{
 for(const accent of ['#ffffff','#ffff00','#000000','#101012','#ff00ff','#888888'])for(const mode of ['light','dark']){
  const base=THEMES[mode==='light'?'pink-candy':'mecha-control'];const configured=api.configureTheme(base,{colors:{accent,inverse:accent,primary:accent,secondary:accent,border:accent},alpha:{text:0,card:.15,menu:.2,overall:.25}});
  const before=JSON.stringify(configured.configuration),tokens=api.buildReadableUiVariables(configured),get=k=>tokens['--dsh-readable-'+k];
  assert.equal(configured.configuration.colors.accent,accent);assert.equal(configured.configuration.alpha.text,0);
  for(const role of ['accent','badge','selected','status','error','danger'])assert.ok(api.uiContrast(get(role+'-ink'),get(role+'-bg'))>=4.5,accent+' '+mode+' '+role);
  assert.equal(JSON.stringify(configured.configuration),before);
 }
});
test('alpha and modern computed RGB colors are composited before contrast decisions',()=>{
 assert.equal(api.compositeUiColor('#0000001a','#ffffff'),'#e5e5e5');
 assert.equal(api.compositeUiColor('rgb(255 255 255 / 50%)','#000000'),'#808080');
 assert.equal(api.compositeUiColor('rgba(100%, 0%, 0%, .5)','#000000'),'#800000');
 assert.equal(api.compositeUiColor('color(srgb 1 1 1 / .5)','#000000'),'#808080');
 assert.equal(api.compositeUiColor('#fff8','#000000'),'#888888');
 const ink=api.readableUiInk('rgb(255 255 255 / 8%)','#ffffff');assert.ok(api.uiContrast(ink,'#ffffff')>=4.5);
});
test('unknown or malformed colors use valid safe fallbacks rather than NaN or arbitrary CSS',()=>{
 for(const value of ['var(--unknown)','color-mix(in srgb,red 50%,white)','red;display:none','rgb(1evil,2,3)','rgb(1 2 / .5)','url(https://no.invalid)','']){
  assert.equal(api.uiColor(value),null,value);
  const bg=api.compositeUiColor(value,'#111111'),ink=api.readableUiInk(value,bg);assert.match(bg,/^#[a-f\d]{6}$/u);assert.match(ink,/^#[a-f\d]{6}$/u);assert.ok(api.uiContrast(ink,bg)>=4.5);
 }
});
test('derived control labels choose either lightening or darkening and retain an already readable preference',()=>{
 assert.equal(api.readableUiInk('#111111','#ffffff'),'#111111');
 for(const bg of ['#000000','#ffffff','#444444','#888888','#ffff00','#ff00ff'])for(const fg of ['#000000','#ffffff','#444444','#888888','#ffff00','#ff00ff'])assert.ok(api.uiContrast(api.controlLabel(fg,bg),bg)>=4.5,fg+' '+bg);
});

test('mecha asset actions are restrained cool surfaces while global amber and stored preferences remain intact',()=>{
 const theme=api.configureTheme(THEMES['mecha-control'],{}),before=JSON.stringify(theme),globalBefore=api.buildReadableUiVariables(theme),asset=api.buildAssetLibraryVariables(theme),get=k=>asset['--dsh-asset-'+k];
 assert.equal(get('interaction'),'#49adff');assert.notEqual(get('action-bg'),get('interaction'));assert.notEqual(get('identity-bg'),get('interaction'));
 for(const role of ['action','action-hover','identity','avatar','selected'])assert.ok(api.uiContrast(get(role+'-ink'),get(role+'-bg'))>=4.5,role);
 for(const role of ['action','selected'])assert.ok(api.uiContrast(get(role+'-border'),globalBefore['--dsh-readable-modal-bg'])>=3.2,role+' boundary');
 assert.equal(globalBefore['--dsh-readable-accent-bg'],'#ffa932');assert.deepEqual(api.buildReadableUiVariables(theme),globalBefore);assert.equal(JSON.stringify(theme),before);
});
test('asset palette respects an explicit accent and all other theme brands without editing the original theme',()=>{
 for(const [base,accent]of [[THEMES['mecha-control'],'#ff00ff'],[THEMES['mecha-control'],'#000000'],[THEMES['mecha-control'],'#ffffff'],...Object.values(THEMES).filter(t=>t.id!=='mecha-control').map(t=>[t,null])]){
  const theme=api.configureTheme(base,accent?{colors:{accent}}:{}),before=JSON.stringify(theme),asset=api.buildAssetLibraryVariables(theme),get=k=>asset['--dsh-asset-'+k],global=api.buildReadableUiVariables(theme);
  assert.equal(get('interaction'),accent||global['--dsh-readable-accent-bg']);assert.equal(get('action-bg'),accent||global['--dsh-readable-accent-bg']);
  for(const bg of ['bg','surface-bg','modal-bg'])assert.ok(api.uiContrast(get('link'),global['--dsh-readable-'+bg])>=4.5,theme.id+' link '+bg);
  for(const role of ['action','action-hover','identity','avatar','selected'])assert.ok(api.uiContrast(get(role+'-ink'),get(role+'-bg'))>=4.5,theme.id+' '+role);
  assert.equal(JSON.stringify(theme),before);
 }
});
