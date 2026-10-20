import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const code = await readFile(new URL('../packages/dsh-client-ui-sidebar/src/aiyou-workbench.js', import.meta.url), 'utf8');
function load() {
  return vm.runInNewContext(`(() => { ${code}; return { openAiyouFeature, AIYOU_FEATURES, currentAiyouSession }; })()`, {
    react: {}, _deepseek_ai_dsh_client_store: { createSnapshotStore: value => ({ getSnapshot: () => value, set: next => { value = next; } }) }
  });
}
function context(rows) {
  const calls = [];
  const ctx = { layout: { selectPanel: id => calls.push(['select', id]), openRightbar: (...args) => calls.push(['rightbar', ...args]) },
    get: name => name === 'sessions' ? { list: { getSnapshot: () => ({ byId: rows }) } }
      : name === 'sidebarRight' ? { openTab: (...args) => calls.push(['open', ...args]) } : undefined };
  return { ctx, calls };
}
test('tool opens in the current native conversation without a placeholder or submission', () => {
  const { ctx, calls } = context({ old: { id: 'old', retainedBy: {} }, current: { id: 'current', cwd: '/project', retainedBy: { mainView: 1 } } });
  const kind = load().openAiyouFeature(ctx, 'aiyou-context');
  assert.equal(kind, 'aiyoucodex-session-context');
  assert.equal(calls[0][1], null);
  assert.equal(calls[1][1], kind);
  assert.equal(calls[1][2].params.sessionId, 'current');
  assert.equal(calls[1][2].replaceTab, undefined);
  assert.equal(calls[2][0], 'rightbar');
  assert.equal(calls.length, 3);
});
test('missing conversation leaves the active surface and draft untouched', () => {
  const { ctx, calls } = context({});
  assert.throws(() => load().openAiyouFeature(ctx, 'aiyou-assets'), /先打开或新建/);
  assert.equal(calls.length, 0);
});
test('all feature kinds refer to real packaged panels', async () => {
  const manifest = JSON.parse(await readFile(new URL('../aiyou/manifest.json', import.meta.url)));
  const kinds = new Set(manifest.modules.map(module => module.tabKind).filter(Boolean));
  for (const feature of load().AIYOU_FEATURES) {
    if (feature.native) assert.equal(feature.kind, 'browser');
    else assert.ok(kinds.has(feature.kind), feature.kind);
  }
});
test('unsupported navigation does not mutate the current surface', () => {
  const { ctx, calls } = context({ one: { id: 'one', retainedBy: { mainView: 1 } } });
  assert.throws(() => load().openAiyouFeature(ctx, 'unknown'), /未找到/);
  assert.equal(calls.length, 0);
});
test('explicit shortcut click toggles its visible native panel without creating another tab', () => {
  const calls = [];
  const ctx = {
    get: name => name === 'sessions' ? {list:{getSnapshot:()=>({byId:{current:{id:'current',retainedBy:{mainView:1}}}})}} : {
      active: () => ({kind:'aiyoucodex-skills'}), isExpanded:()=>true,
      toggleExpanded:()=>calls.push('collapse'), openTab:()=>calls.push('open')
    },
    layout: {selectPanel:()=>calls.push('select'),openRightbar:()=>calls.push('expand')}
  };
  load().openAiyouFeature(ctx, 'aiyou-skills', {}, {toggle:true});
  assert.deepEqual(calls, ['collapse']);
});
test('independent icon rail preserves native callbacks, has one new conversation action, and keeps settings last', async () => {
  const source = await readFile(new URL('../packages/dsh-client-ui-sidebar/src/aiyou-shortcuts.js',import.meta.url),'utf8');
  const PanelRow = () => {};
  const navigation = vm.runInNewContext(`(() => {${source};return AiyouShortcutNavigation;})()`,{
    react:{createElement:(type,props,...children)=>({type,props,children})}, PanelRow,
  });
  let created = 0;
  const selectPanel = () => {};
  const panels = [{id:'aiyou-workbench',label:'设置'},{id:'aiyou-skills',label:'Skills 分组'},{id:'plugins',label:'插件'}];
  const rail = navigation({panels,startSession:()=>created++,selectPanel});
  assert.equal(rail.props['data-aiyou-shortcut-layout'],'rail');
  assert.equal(rail.props.className,'aiyou-rail-menu');
  const actions = rail.children.filter(child=>child.type===PanelRow);
  assert.deepEqual(actions.map(child=>child.props.id),['plugins','aiyou-skills','aiyou-workbench']);
  assert.ok(actions.every(child=>child.props.selectPanel===selectPanel && child.props.rail===true && child.props.wide===false));
  const newConversation = rail.children.filter(child=>child.type==='button');
  assert.equal(newConversation.length,1);
  assert.equal(created,0);
  newConversation[0].props.onClick();
  assert.equal(created,1);
});

test('header actions are scoped to the exact still-current conversation', () => {
  const {ctx,calls}=context({current:{id:'current',retainedBy:{mainView:1}},old:{id:'old',retainedBy:{mainView:0}}});
  assert.throws(()=>load().openAiyouFeature(ctx,'aiyou-usage',{sessionId:'old'}),/已切换/);
  assert.equal(calls.length,0);
  load().openAiyouFeature(ctx,'aiyou-folders',{sessionId:'current'});
  assert.equal(calls[1][2].params.sessionId,'current');
});
test('usage and output directory live in the native right header utilities slot and are absent from the icon rail', async () => {
  const featureList=load().AIYOU_FEATURES;
  assert.deepEqual(Array.from(featureList.filter(row=>row.placement==='header'),row=>row.id),['aiyou-usage','aiyou-folders']);
  assert.ok(!featureList.some(row=>row.id==='aiyou-claude'));
  const source=await readFile(new URL('../packages/dsh-client-ui-sidebar/src/aiyou-header.js',import.meta.url),'utf8');
  let registration;
  const panel=vm.runInNewContext(`(()=>{${source};return {installAiyouHeaderTools,AiyouConversationHeaderTools};})()`,{
    react:{createElement:(type,props,...children)=>({type,props,children}),useEffect:()=>{}},AIYOU_FEATURES:featureList,AiyouShortcutIcon:()=>{},
  });
  const ctx={slots:{inject:(name,callback)=>{assert.equal(name,'conversation.session.header.utilities');callback();},register:(options)=>{registration=options;}}};
  panel.installAiyouHeaderTools(ctx);
  assert.equal(registration.name,'conversation.session.header.utilities');
  const calls=[];
  const view=panel.AiyouConversationHeaderTools({sessionId:'current',openFeature:(...args)=>calls.push(args)});
  const buttons=view.children.flat();
  assert.equal(buttons.length,2);buttons[1].props.onClick();
  assert.deepEqual(calls,[['aiyou-folders','current']]);
});

test('retired Claude diagnostic tabs close only in the exact active conversation', async()=>{
  const source=await readFile(new URL('../packages/dsh-client-ui-sidebar/src/aiyou-header.js',import.meta.url),'utf8');
  const retired=[];
  const close=vm.runInNewContext(`(()=>{${source};return retireRemovedAiyouTabs;})()`,{currentAiyouSession:()=>({id:'current'})});
  const ctx={get:()=>({openTabs:{getSnapshot:()=>[
    {sessionId:'old',tabId:'foreign',kind:'aiyoucodex-claude-code'},
    {sessionId:'current',tabId:'retired',kind:'aiyoucodex-claude-code'},
    {sessionId:'current',tabId:'keep',kind:'browser'}]},close:id=>retired.push(id)})};
  close(ctx,'old');assert.equal(retired.length,0);
  close(ctx,'current');assert.deepEqual(retired,['retired']);
});
