import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const packageRoot = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, packageRoot), 'utf8');
const modelSource = read('src/aiyou-sidebar-model.js');
const exposed = ['aiyouFoldSidebarFacts', 'aiyouSidebarFacts', 'aiyouSidebarInterrupted', 'aiyouSidebarVisibleIds', 'aiyouSidebarFilterList', 'aiyouSidebarSearchPage', 'aiyouSidebarAnnotation', 'aiyouSidebarOrderRows', 'AIYOU_EMPTY_SIDEBAR_FACTS'];
const model = vm.runInNewContext(`${modelSource}\n({${exposed.join(',')}})`, { Set, Map });
const plain = value => JSON.parse(JSON.stringify(value));
const event = (type, data, seq = 0) => ({ type, data, seq, time: 100 + seq });

function fixture() {
  const ids = ['old', 'new', 'stopped', 'running', 'waiting', 'unknown', 'archive', 'child', 'blank'];
  const byId = Object.fromEntries(ids.map((id, index) => [id, {
    id, title: id, displayTitle: id, running: id === 'running', blank: id === 'blank', updatedAt: index,
    retainedBy: id === 'new' ? { mainView: 1 } : {},
    ...(id === 'child' ? { origin: 'subagent' } : {}),
  }]));
  const facts = reason => ({ ...model.AIYOU_EMPTY_SIDEBAR_FACTS, turn: 1, endReason: reason, prompt: '视频分析', response: '已核对当前镜头' });
  const projectionsBySession = Object.fromEntries(['old', 'new', 'stopped', 'running', 'waiting', 'archive'].map(id => [id, { values: { aiyouSidebar: facts(id === 'stopped' || id === 'running' || id === 'waiting' ? 'aborted' : 'completed') } }]));
  const list = { ids, byId, phase: 'ready', projectionsBySession };
  const workspaces = [
    { workspaceId: 'parent', title: '影视', path: '/projects/film', sessionIds: ['old', 'stopped', 'running', 'waiting'], createdAt: '2026-10-19' },
    { workspaceId: 'nested', title: '子项目', path: '/projects/film/ep1', sessionIds: ['new'], createdAt: '2026-10-19' },
    { workspaceId: 'other', title: '其他', path: '/projects/filmmaker', sessionIds: ['archive'], createdAt: '2026-10-19' },
  ];
  const statuses = new Map([['running', { running: true }], ['waiting', { running: false, pendingInteraction: { kind: 'question' } }]]);
  return { list, workspaces, statuses, pins: ['old'], archives: ['archive'] };
}

test('native event fold preserves human previews and records the actual latest end reason', () => {
  let state = { ...model.AIYOU_EMPTY_SIDEBAR_FACTS };
  for (const entry of [
    event('turn/start', { turn: 1 }, 0),
    event('user/message', { source: { kind: 'user' }, content: [{ type: 'text', text: '  核对\n镜头  ' }] }, 1),
    event('user/message', { source: { kind: 'agent' }, content: [{ type: 'text', text: 'not a human prompt' }] }, 2),
    event('assistant/message', { message: { content: [{ type: 'text', text: '画面已核对' }] } }, 3),
    event('turn/end', { turn: 1, reason: { kind: 'aborted', reason: 'stop' } }, 4),
  ]) state = model.aiyouFoldSidebarFacts(state, entry);
  assert.equal(state.prompt, '核对 镜头');
  assert.equal(state.response, '画面已核对');
  assert.equal(state.endReason, 'aborted');
  assert.equal(state.turnOpen, false);
  state = model.aiyouFoldSidebarFacts(state, event('turn/start', { turn: 2 }, 5));
  assert.equal(state.endReason, null);
  assert.equal(state.response, '');
  assert.equal(state.turnOpen, true);
  state = model.aiyouFoldSidebarFacts(state, event('turn/end', { turn: 1, reason: { kind: 'error' } }, 6));
  assert.equal(state.turn, 2);
  assert.equal(state.endReason, null);
});

test('previews are bounded for large unicode text and ignore nontext blocks', () => {
  const state = model.aiyouFoldSidebarFacts({ ...model.AIYOU_EMPTY_SIDEBAR_FACTS }, event('user/message', {
    source: { kind: 'user' }, content: [{ type: 'image', text: 'not text' }, { type: 'text', text: '🎬'.repeat(20000) }],
  }));
  assert.ok(state.prompt.length <= 240);
  assert.equal(state.prompt.at(-1), '…');
  assert.equal(/[\uD800-\uDBFF]$/u.test(state.prompt.slice(0, -1)), false);
});

test('four views use native pin/archive membership and never confuse idle or waiting with interruption', () => {
  const { list, workspaces, statuses, pins, archives } = fixture();
  const visible = view => plain(model.aiyouSidebarVisibleIds(list, workspaces, pins, archives, statuses, view, '*', 'default'));
  assert.deepEqual(visible('pinned'), ['old']);
  assert.deepEqual(visible('interrupted'), ['stopped']);
  assert.deepEqual(visible('recent'), ['old', 'new', 'stopped', 'running', 'waiting', 'unknown']);
  assert.deepEqual(visible('projects'), visible('recent'));
  assert.equal(model.aiyouSidebarInterrupted(list, 'unknown', statuses), false);
  assert.equal(model.aiyouSidebarInterrupted(list, 'waiting', statuses), false);
});

test('folder filters include registered descendants, respect path boundaries and preserve full accounting', () => {
  const { list, workspaces, statuses, pins, archives } = fixture();
  const before = JSON.stringify({ list, workspaces });
  const visible = model.aiyouSidebarVisibleIds(list, workspaces, pins, archives, statuses, 'projects', 'parent', 'show');
  assert.deepEqual(plain(visible), ['old', 'new', 'stopped', 'running', 'waiting']);
  const filtered = model.aiyouSidebarFilterList(list, visible);
  assert.equal(filtered.byId.archive, undefined);
  assert.deepEqual(plain(model.aiyouSidebarVisibleIds(list, workspaces, pins, archives, statuses, 'projects', '__ungrouped__', 'default')), ['unknown']);
  assert.equal(JSON.stringify({ list, workspaces }), before);
});

test('search merges labels, loaded previews and literal folder paths with native content results', () => {
  const { list, workspaces } = fixture();
  const page = { items: [{ sessionId: 'unknown', snippet: 'backend-only' }], hasMore: false };
  const annotated = model.aiyouSidebarSearchPage(list, workspaces, 'review-label', { old: { tags: ['review-label'] } }, page);
  assert.deepEqual(plain(annotated.items.map(item => item.sessionId)), ['old', 'unknown']);
  assert.ok(model.aiyouSidebarSearchPage(list, workspaces, '/film/ep1', {}, { items: [], hasMore: false }).items.some(item => item.sessionId === 'new'));
  assert.ok(model.aiyouSidebarSearchPage(list, workspaces, '已核对当前镜头', {}, { items: [], hasMore: false }).items.length > 0);
  assert.equal(page.items.length, 1);
});

test('annotations bound user text and recent order is independent from native pin state', () => {
  assert.deepEqual(plain(model.aiyouSidebarAnnotation({ tags: ' one,one，two,three,four', urgency: 'critical' })), { tags: ['one', 'two', 'three'], urgency: 'critical' });
  assert.equal(model.aiyouSidebarAnnotation({ tags: '', urgency: 'invented' }).urgency, '');
  const rows = [{ id: 'pinned', updatedAt: 1, pinned: true }, { id: 'new', updatedAt: 2, pinned: false }];
  assert.deepEqual(plain(model.aiyouSidebarOrderRows(rows, 'recent').map(row => row.id)), ['new', 'pinned']);
  assert.equal(rows[0].pinned, true);
});

function assembledClient() {
  const manifest = JSON.parse(read('reconstruction.json'));
  const entry = manifest.entries.find(entry => entry.output === 'lib/client.js');
  return entry.parts.map(part => read(part.file)).join('');
}

function browserHarness(state, overrides = {}) {
  let captured;
  const effects = [];
  const element = (type, props, ...children) => ({ type, props: { ...props, ...(children.length ? { children } : {}) } });
  const React = {
    Component: class {},
    createElement: element, memo: fn => fn, Fragment: 'fragment',
    useMemo: fn => fn(), useCallback: fn => fn,
    useState: initial => [typeof initial === 'function' ? initial() : initial, () => {}],
    useEffect: fn => { effects.push(fn); }, useRef: initial => ({ current: initial }),
  };
  const jsxRuntime = { jsx: element, jsxs: element, Fragment: 'fragment' };
  const require = id => {
    if (id === 'react') return React;
    if (id === 'react/jsx-runtime') return jsxRuntime;
    if (id === '@deepseek-ai/cordis') return overrides.cordis ?? { Service: class {} };
    if (id === '@deepseek-ai/dsh-client-store') return { defineStore: spec => spec, createSnapshotStore: initial => ({ getSnapshot: () => initial, subscribe: () => () => {}, set() {} }) };
    if (id === '@deepseek-ai/dsh-client-ui-primitives') return new Proxy({}, { get: (_, key) => String(key) });
    throw new Error(id);
  };
  let source = assembledClient().replace('exports.apply = apply;', 'exports.__test = { WorkspaceBrowser, FlatList, SessionTree, SearchResults, AiyouSessionCard, AiyouSidebarControls, SessionNodeItem, createWorkspaceViewStore, UiWorkspaceService, zh }; exports.apply = apply;');
  if (overrides.moduleId) source = source.replace('id: "@deepseek-ai/dsh-client-ui-workspace"', `id: "${overrides.moduleId}"`);
  vm.runInNewContext(source, { window: { __ModuleLoader__: { load: definition => { captured = definition; } } }, Set, Map, Date, AbortController, console });
  const internals = captured.factory(require).__test;
  const { list, workspaces, statuses, pins, archives } = fixture();
  const calls = [];
  const actions = new Proxy({}, { get: (_, key) => (...args) => { calls.push([key, ...args]); } });
  const props = {
    wide: true, usePanelInfo: select => select({ activePanelId: null }), expandSidebar() {},
    useSessions: select => select(list), useSessionStatus: select => select(statuses),
    useWorkspaces: select => select({ items: workspaces, phase: 'ready', state: 'idle', pinnedSessionIds: pins, archivedSessionIds: archives }),
    useStore: select => select(state), actions, useDirectoryFlow: select => select(true),
    useHostInfo: select => select({ home: '/home/fixture' }), useShortcuts: select => select([]),
    useWorkspaceShortcuts: select => select({ searchRequest: 0, addRequested: false }),
    open: id => calls.push(['open', id]), startSession() {}, requestSessionRename() {}, notifyArchivedNotOpenable() {},
    renameWorkspace() {}, deleteWorkspace() {}, insertWorkspaceBefore() {}, unarchiveSession() {}, createWorkspace() {},
    searchSessions() {}, searchResultLimit: 20, requestSearch() {}, requestAddWorkspace() {}, closeAddWorkspace() {}, setDirectoryBusy() {}, renderSlot() {},
    t: (key, params) => (internals.zh[key] ?? key).replace(/\{(\w+)\}/gu, (_, name) => params?.[name] ?? ''),
  };
  return { internals, props, calls, effects, moduleId: captured.id };
}

function descendants(node) {
  if (Array.isArray(node)) return node.flatMap(descendants);
  if (!node || typeof node !== 'object') return [];
  return [node, ...descendants(node.props?.children)];
}

test('assembled native browser wires filters, cards and preserved search without changing complete orders', () => {
  const state = { groupBy: 'workspace', orderBy: 'manual', groupExpansion: { parent: true }, sessionOrderByAccount: { parent: ['old', 'stopped', 'running', 'waiting'] }, archivedFilter: 'default', aiyouView: 'pinned', aiyouWorkspace: '*', aiyouQuery: '', aiyouAnnotations: {} };
  const harness = browserHarness(state);
  const tree = harness.internals.WorkspaceBrowser(harness.props);
  const nodes = descendants(tree);
  const controls = nodes.find(node => node.type === harness.internals.AiyouSidebarControls);
  assert.equal(controls.props.counts.pinned, 1);
  assert.equal(controls.props.counts.interrupted, 1);
  const flat = nodes.find(node => node.type === harness.internals.FlatList);
  assert.deepEqual(plain(flat.props.list.ids), ['old']);
  assert.ok(flat.props.sessionIds.includes('archive'));
  assert.ok(flat.props.sessionIds.includes('unknown'));
  assert.equal(harness.calls.length, 0);
  const flatTree = harness.internals.FlatList(flat.props);
  const card = descendants(flatTree).find(node => node.type === harness.internals.AiyouSessionCard);
  assert.equal(card.props.node.pinned, true);
  const cardTree = harness.internals.AiyouSessionCard(card.props);
  assert.ok(descendants(cardTree).some(node => node.type === harness.internals.SessionNodeItem));
  const searchHarness = browserHarness({ ...state, aiyouQuery: '视频' });
  const searchTree = searchHarness.internals.WorkspaceBrowser(searchHarness.props);
  const search = descendants(searchTree).find(node => node.type === searchHarness.internals.SearchResults);
  search.props.open('old');
  assert.deepEqual(searchHarness.calls, [['open', 'old']]);
});

test('native viewing store persists annotation fields alongside existing full account orders', () => {
  const { internals } = browserHarness({});
  const store = internals.createWorkspaceViewStore();
  const state = store.init();
  state.sessionOrderByAccount = { parent: ['one', 'hidden-archive', 'two'] };
  store.actions.setAiyouView(state, 'interrupted');
  store.actions.setAiyouWorkspace(state, 'parent');
  store.actions.setAiyouQuery(state, '视频');
  store.actions.setAiyouAnnotation(state, 'one', { tags: 'review,final', urgency: 'important' });
  assert.deepEqual(plain(state.sessionOrderByAccount.parent), ['one', 'hidden-archive', 'two']);
  assert.equal(state.aiyouView, 'interrupted');
  assert.equal(state.aiyouQuery, '视频');
  assert.deepEqual(plain(state.aiyouAnnotations.one), { tags: ['review', 'final'], urgency: 'important' });
});

test('projection uses the installed registry, publishes real event facts and removes its key on disposal', async () => {
  const runtimeRequire = createRequire(new URL('../../../test/runtime/package.json', import.meta.url));
  const { Context } = await import(pathToFileURL(runtimeRequire.resolve('@deepseek-ai/cordis')).href);
  const { SessionProjectionRegistry } = await import(pathToFileURL(runtimeRequire.resolve('@deepseek-ai/dsh-session-projection')).href);
  const { z } = runtimeRequire('zod');
  const hostSource = read('src/aiyou-sidebar-host.js').replace("import { z } from 'zod';", '').replace('export { apply, inject };', '');
  const projection = vm.runInNewContext(`${modelSource}\n${hostSource}\naiyouSidebarProjection`, { z, Set, Map });
  const ctx = new Context();
  const registry = new SessionProjectionRegistry(ctx);
  const unregister = registry.register(projection);
  const events = [event('turn/start', { turn: 1 }, 0), event('user/message', { source: { kind: 'user' }, content: [{ type: 'text', text: 'test prompt' }] }, 1), event('turn/end', { turn: 1, reason: { kind: 'interrupted' } }, 2)];
  const session = { seq: events.length, header: { id: 'fixture', version: 4, createdAt: 0, isSeeded: false }, inheritedEventCount: 0, snapshotEvents: () => events, eventAt: seq => events[seq] };
  const snapshot = registry.snapshot(session);
  assert.equal(snapshot.values.aiyouSidebar.endReason, 'interrupted');
  assert.equal(snapshot.values.aiyouSidebar.prompt, 'test prompt');
  unregister();
  assert.equal(registry.snapshot(session).values.aiyouSidebar, undefined);
  await ctx.fiber.dispose();
});


test('renamed workspace client still provides the exact native uiWorkspace service', async () => {
  const runtimeRequire = createRequire(new URL('../../../test/runtime/package.json', import.meta.url));
  const cordis = await import(pathToFileURL(runtimeRequire.resolve('@deepseek-ai/cordis')).href);
  const { internals, moduleId } = browserHarness({}, { cordis, moduleId: '@local/aiyou-native-workspace' });
  assert.equal(moduleId, '@local/aiyou-native-workspace');
  const ctx = new cordis.Context();
  // Navigation sources are tested by the native owner. This isolates the service's actual Cordis registration identity.
  internals.UiWorkspaceService.prototype.watchNavigation = () => () => {};
  const service = new internals.UiWorkspaceService(ctx, {}, {}, {}, {}, () => {});
  assert.ok(ctx.get('uiWorkspace') instanceof internals.UiWorkspaceService);
  assert.equal(typeof ctx.get('uiWorkspace').openSession, 'function');
  assert.equal(ctx.get('aiyou-native-workspace'), undefined);
  await ctx.fiber.dispose();
});
