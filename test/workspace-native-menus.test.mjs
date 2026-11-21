import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const root = new URL('../packages/dsh-client-ui-workspace/', import.meta.url);
const source = await readFile(new URL('src/aiyou-host-compat.js', root), 'utf8');
const rows = await readFile(new URL('src-recovered/lib/client_js/0011-lib-types-client-rows-Rows.js.js', root), 'utf8');
const tick = () => new Promise(resolve => setImmediate(resolve));
function observable(initial) {
  let value = initial; const listeners = new Set();
  return { getSnapshot: () => value, subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    set(next) { value = next; for (const fn of listeners) fn(); } };
}
function event(extra = {}) {
  const currentTarget = { focus() {}, getBoundingClientRect: () => ({ left: 10, bottom: 30 }) };
  return { currentTarget, target: currentTarget, clientX: 40, clientY: 50, defaultPrevented: false,
    preventDefault() { this.defaultPrevented = true; }, stopPropagation() { this.stopped = true; }, ...extra };
}
function fixture(native = true) {
  const providers = new Map(), registrations = [], cleanup = [], headers = [], selections = [], opened = [], effects = [];
  const session = { id: 'S', title: 'Current title', blank: false, runningSubagentCount: 0, updatedAt: 1 };
  const sessions = { list: observable({ byId: { S: session } }) };
  const workspaces = { list: observable({ items: [{ workspaceId: 'W', path: '/project', title: 'Project' }] }) };
  const active = observable(null); let allowed = true;
  const access = observable(true);
  const menus = {
    active, register(contribution) { providers.set(contribution.id, contribution); return () => providers.delete(contribution.id); },
    resolve(target) {
      assert.equal(target.kind, 'sessionHeader'); assert.equal(target.value.sessionId, 'S');
      const record = { source: observable([
        { id: 'session-log-download.export/copy', label: 'Copy Markdown', disabled: false },
        { id: 'session-log-download.export/download', label: 'Export', disabled: true },
        { id: 'session-log-download.feedback/feedback', label: 'Feedback' },
      ]), ready: Promise.resolve(), disposed: false,
        dispose() { this.disposed = true; },
        select(id) { if (!this.disposed && !this.source.getSnapshot().find(action => action.id === id)?.disabled) { selections.push(id); this.dispose(); } },
      };
      headers.push(record); return record;
    },
    open(target, point, options) { opened.push({ target, point, options }); active.set(target); },
    close() { active.set(null); },
  };
  const ctx = { workspaces, contextMenus: menus, locale: { bind: () => key => key, subscribe: () => () => {} },
    remoteAccess: { source() { return { getSnapshot: () => allowed, subscribe: access.subscribe }; } },
    get(name) { return name === 'sessions' ? sessions : name === 'workspaces' ? workspaces : undefined; },
    inject(_names, callback) { if (native) callback(this); },
    effect(callback) { const disposer = callback(); if (typeof disposer === 'function') cleanup.push(disposer); return disposer; },
    slots: {
      inject(_name, callback) { const result = callback(); if (result?.[Symbol.iterator]) for (const _ of result) {} },
      register(meta, component) { const record = { meta, component }; registrations.push(record); return () => {}; },
    },
  };
  let cells = [], cursor = 0;
  const react = {
    useRef(value) { const i = cursor++; return cells[i] ??= { current: value }; },
    useState(value) { const i = cursor++; if (!(i in cells)) cells[i] = value; return [cells[i], next => { cells[i] = typeof next === 'function' ? next(cells[i]) : next; }]; },
    useMemo(callback) { cursor++; return callback(); }, useEffect(callback) { cursor++; effects.push(callback); },
  };
  const jsx = (type, props) => ({ type, props });
  const api = vm.runInNewContext(`(() => { ${source}\n${rows}\nreturn { install: installAiyouWorkspaceContextMenus, open: openAiyouNativeRowMenu, SessionNodeItem, ProjectRowItem }; })()`, {
    react, react_jsx_runtime: { jsx, jsxs: jsx, Fragment: 'Fragment' },
    _deepseek_ai_dsh_client_store: { createSnapshotStore: observable },
    _deepseek_ai_dsh_client_ui_primitives: new Proxy({}, { get: (_target, name) => name === 'relativeTime' ? () => ({ unit: 'now' }) : name }),
    Rows_module_css_default: {}, clsx: (...values) => values.filter(value => typeof value === 'string').join(' '),
    queueMicrotask, AbortController, Promise, window: {}, cancelAnimationFrame() {},
  });
  const bridge = api.install(ctx), t = key => key;
  const render = (component, props, reset = false) => { cursor = 0; if (reset) cells = []; return component(props); };
  return { api, ctx, bridge, providers, registrations, headers, selections, opened, session, sessions, workspaces,
    allow(value) { allowed = value; access.set(value); }, dispose() { for (const fn of cleanup.reverse()) fn(); },
    sessionRow() { const tree = render(api.SessionNodeItem, { node: session, now: 2, onOpen() { throw Error('context action opened conversation'); }, renderSlot: () => null, t }); return { tree, row: tree.props.anchor }; },
    workspaceRow() { return render(api.ProjectRowItem, { group: { key: 'W', workspaceId: 'W', label: 'Project', expanded: true }, onToggle() {}, onCreate() {}, actions: { rename() {}, delete() {} }, t }, true); },
  };
}
function find(element, type) {
  if (!element || typeof element !== 'object') return undefined;
  if (element.type === type) return element;
  for (const value of [element.props?.anchor, ...[element.props?.children].flat()]) { const found = find(value, type); if (found) return found; }
}

test('new native right-click uses exact live session/workspace targets and supports button toggle', () => {
  const f = fixture(); const click = event();
  f.sessionRow().row.props.onContextMenu(click);
  assert.equal(f.opened[0].target.kind, 'session'); assert.equal(f.opened[0].target.value.sessionId, 'S');
  assert.equal(f.opened[0].target.value.displayTitle, 'Current title'); assert.equal(f.opened[0].point.x, 40);
  assert.ok(click.defaultPrevented && click.stopped);
  const workspace = f.workspaceRow(); workspace.props.onContextMenu(event());
  assert.equal(f.opened[1].target.value.workspaceId, 'W'); assert.equal(f.opened[1].target.value.path, '/project');
  const button = find(workspace, 'Menu').props.anchor;
  button.props.onClick(event()); button.props.onClick(event()); assert.equal(f.ctx.contextMenus.active.getSnapshot(), null);
  f.sessions.list.set({ byId: {} }); f.api.open('session', { sessionId: 'S' }, event()); assert.equal(f.opened.length, 3);
  f.dispose(); assert.equal(f.api.open('session', { sessionId: 'S' }, event()), false);
});

test('old host retains both existing ellipsis menus and right-click fallbacks', () => {
  const f = fixture(false); let rendered = f.sessionRow();
  assert.equal(find(rendered.tree, 'Menu').props.open, false);
  rendered.row.props.onContextMenu(event()); rendered = f.sessionRow(); assert.equal(find(rendered.tree, 'Menu').props.open, true);
  const workspace = f.workspaceRow(), menu = find(workspace, 'Menu');
  menu.props.anchor.props.onClick(event());
  assert.equal(f.opened.length, 0); assert.equal(f.providers.size, 0);
});

test('native session content preserves old action owner and dismiss callback without executing an action', () => {
  const f = fixture(), entry = f.registrations.find(row => row.meta.name === 'contextMenu.content');
  let dismissed = 0, call;
  entry.component({ target: { kind: 'session', value: { sessionId: 'S', displayTitle: 'Title' } }, dismiss: () => dismissed++,
    renderSlot(name, value, options) { call = { name, value, options }; } });
  assert.equal(call.name, 'sidebar.workspaces.session.menu.item'); assert.equal(call.value.sessionId, 'S');
  call.options.hookContext[1](true); assert.equal(dismissed, 0);
  call.options.hookContext[1](false); assert.equal(dismissed, 1); assert.deepEqual(f.selections, []); f.dispose();
});

test('export bridge delegates only native exports and preserves disabled actions, refresh and cancellation', async () => {
  const f = fixture(), contribution = f.providers.get('aiyou-workspace.session-exports'), target = { sessionId: 'S' };
  const sources = contribution.observe(target), first = new AbortController();
  let actions = await contribution.resolve(target, first.signal);
  assert.equal(actions.length, 2); assert.equal(actions[1].disabled, true); assert.equal(sources[0], f.headers[0].source);
  first.abort(); const replacement = new AbortController(); actions = await contribution.resolve(target, replacement.signal); await tick();
  assert.equal(f.headers[0].disposed, false, 'replacing a preparation keeps its native resolution');
  actions[1].run(); assert.deepEqual(f.selections, [], 'native disabled guard remains authoritative');
  replacement.abort(); actions[0].run(); await tick();
  assert.deepEqual(f.selections, ['session-log-download.export/copy']); assert.equal(f.headers[0].disposed, true);
  const cancelledTarget = { sessionId: 'S' }; contribution.observe(cancelledTarget); const cancelled = new AbortController();
  const stale = await contribution.resolve(cancelledTarget, cancelled.signal); cancelled.abort(); await tick(); stale[0].run();
  assert.equal(f.selections.length, 1);
  contribution.observe(target); const previousHeader = f.headers.at(-1);
  contribution.observe(target); assert.equal(previousHeader.disposed, true, 'a reused owner target releases its previous resolution immediately');
  f.dispose();
});

test('workspace native actions honor live access and request the existing confirmation surface', () => {
  const f = fixture(), rename = f.providers.get('aiyou-workspace.rename'), remove = f.providers.get('aiyou-workspace.delete');
  const target = { workspaceId: 'W', path: '/project', displayTitle: 'Project' };
  const renameAction = rename.resolve(target)[0]; f.allow(false); renameAction.run(); assert.equal(f.bridge.request.getSnapshot(), null);
  assert.equal(remove.resolve(target).length, 0);
  f.allow(true); remove.resolve(target)[0].run();
  assert.equal(f.bridge.request.getSnapshot().action, 'delete'); assert.equal(f.bridge.request.getSnapshot().workspaceId, 'W');
  f.bridge.settle(); assert.equal(f.bridge.request.getSnapshot(), null);
  f.workspaces.list.set({ items: [] }); renameAction.run(); assert.equal(f.bridge.request.getSnapshot(), null); f.dispose();
});

test('sidebar native import wrapper retains the single original new-conversation action', async () => {
  const sidebar = await readFile(new URL('../packages/dsh-client-ui-sidebar/src/aiyou-shortcuts.js', import.meta.url), 'utf8');
  const navigation = vm.runInNewContext(`(() => { ${sidebar}; return AiyouShortcutNavigation; })()`, {
    react: { createElement: (type, props, ...children) => ({ type, props, children }) }, PanelRow() {},
  });
  let created = 0, call;
  const result = navigation({ panels: [], startSession: () => created++, renderSlot(name, value, options) { call = { name, value, options }; return { type: 'native-import-wrapper', props: options }; } });
  assert.equal(call.name, 'sidebar.session.action'); assert.equal(call.value.wide, false);
  assert.equal(result.children[0].type, 'native-import-wrapper'); assert.equal(created, 0);
  call.options.children.props.onClick(); assert.equal(created, 1);
});
