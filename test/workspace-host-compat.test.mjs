import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const root = new URL('../packages/dsh-client-ui-workspace/', import.meta.url);
const flowSource = await readFile(new URL('src-recovered/lib/client_js/0015-lib-types-client-WorkspacePicker.js.js', root), 'utf8');
const compatSource = await readFile(new URL('src/aiyou-host-compat.js', root), 'utf8');
const tick = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };

/** Render the existing picker flow with persistent hooks and explicit effect turns. */
function hookRenderer() {
  const cells = [];
  let cursor = 0, dirty = false, effects = [];
  const equal = (a, b) => a?.length === b?.length && a.every((value, i) => Object.is(value, b[i]));
  const react = {
    useRef(value) { const i = cursor++; return cells[i] ??= { current: value }; },
    useState(value) {
      const i = cursor++;
      if (!(i in cells)) cells[i] = typeof value === 'function' ? value() : value;
      return [cells[i], next => { const value = typeof next === 'function' ? next(cells[i]) : next; if (!Object.is(value, cells[i])) { cells[i] = value; dirty = true; } }];
    },
    useCallback(callback, deps) { const i = cursor++; if (!cells[i] || !equal(cells[i].deps, deps)) cells[i] = { deps, callback }; return cells[i].callback; },
    useEffect(callback, deps) { const i = cursor++; if (!cells[i] || !equal(cells[i], deps)) { cells[i] = deps; effects.push(callback); } },
  };
  return { react, render(component, props) {
    let output, turns = 0;
    do {
      dirty = false; cursor = 0; effects = [];
      output = component(props);
      for (const effect of effects) effect();
      assert.ok(++turns < 20, 'picker effects settle');
    } while (dirty);
    return output;
  } };
}

function fixture({ items = [{ workspaceId: 'existing', title: 'Existing', path: '/existing' }], create } = {}) {
  const hooks = hookRenderer(), factories = new Map(), declarations = new Set(), listeners = new Set();
  const picked = [], created = [], busy = [], closed = [];
  const snapshot = { phase: 'ready', items };
  let directoryAvailable = false;
  const workspaces = { async create(input) { created.push(input); return create ? create(input) : { workspaceId: 'created', path: input.path }; } };
  const ctx = { get(name) { assert.equal(name, 'workspaces'); return workspaces; }, slots: {
    registerFactory(meta, component) {
      assert.equal(factories.has(meta.name), false);
      factories.set(meta.name, { meta, component });
      for (const hole of Object.keys(meta.children ?? {})) declarations.add(hole);
      return () => { factories.delete(meta.name); for (const hole of Object.keys(meta.children ?? {})) declarations.delete(hole); };
    },
    entries(hole) { assert.equal(hole, 'workspace.picker.directoryFlow'); return directoryAvailable ? [{}] : []; },
    subscribe(hole, listener) { assert.equal(hole, 'workspace.picker.directoryFlow'); listeners.add(listener); return () => listeners.delete(listener); },
  } };
  const jsx = (type, props) => ({ type, props });
  const api = vm.runInNewContext(`(() => { ${flowSource}\n${compatSource}\nreturn { install: installAiyouWorkspacePickerFactory }; })()`, {
    react: hooks.react, react_jsx_runtime: { jsx, jsxs: jsx, Fragment: 'Fragment' }, Error,
    _deepseek_ai_dsh_client_ui_primitives: new Proxy({}, { get: (_target, name) => name }),
    WorkspacePicker_module_css_default: {}, workspaceDisplayTitle: (title, fallback) => title || fallback,
  });
  const dispose = api.install(ctx);
  const registration = factories.get('workspace.picker'), injection = registration.meta.inject();
  let rect = { left: 12, top: 20, width: 40, height: 16 };
  const anchorRef = { current: { getBoundingClientRect: () => rect } };
  const owner = { open: true, anchorRef, selectedId: 'existing',
    t: key => key, useWorkspaces: selector => selector(snapshot),
    useDirectoryFlow: selector => selector(injection.hooks.directoryFlow.getSnapshot()),
    onPick: id => picked.push(id), onClose() { closed.push(true); owner.open = false; }, onBusyChange: value => busy.push(value),
    renderSlot: (name, props) => ({ type: name, props }),
  };
  const render = () => {
    const element = registration.component({ ...injection, ...owner });
    const output = hooks.render(element.type, element.props), children = output.props.children;
    return { menu: children.find(child => child?.type === 'Menu').props,
      directory: children.find(child => child?.type === 'workspace.picker.directoryFlow').props,
      modal: children.find(child => child?.type === 'Modal').props };
  };
  return { registration, injection, owner, anchorRef, declarations, factories, listeners, picked, created, busy, closed, dispose, render,
    moveAnchor(value) { rect = value; }, directory(available) { directoryAvailable = available; for (const listener of listeners) listener(); } };
}

test('factory exposes its directory declaration before rendering and releases the native registration', () => {
  const f = fixture();
  assert.equal(f.registration.meta.scope, 'root');
  assert.equal(f.registration.meta.locale, 'workspace');
  assert.ok(f.declarations.has('workspace.picker.directoryFlow'));
  const updates = [], source = f.injection.hooks.directoryFlow;
  const unsubscribe = source.subscribe(() => updates.push(source.getSnapshot()));
  f.directory(true); f.directory(false);
  assert.deepEqual(updates, [true, false]);
  unsubscribe(); assert.equal(f.listeners.size, 0);
  f.dispose(); assert.equal(f.factories.size, 0); assert.equal(f.declarations.size, 0);
});

test('existing workspace selection and menu closing remain owner-controlled without creating a workspace', () => {
  const f = fixture(), ui = f.render();
  assert.equal(ui.menu.open, true);
  assert.equal(ui.menu.selectedId, 'existing');
  ui.menu.onSelect('existing'); assert.deepEqual(f.picked, ['existing']);
  assert.deepEqual(f.created, []);
  ui.menu.onClose(); assert.equal(f.render().menu.open, false); assert.equal(f.closed.length, 1);
});

test('directory creation uses the native workspace controller and holds busy state until its response', async () => {
  const pending = deferred(), f = fixture({ create: () => pending.promise });
  f.directory(true);
  f.render().menu.onSelect('::add-workspace');
  let ui = f.render(); assert.equal(ui.menu.open, false); assert.equal(ui.directory.open, true);
  ui.directory.onPicked('/new-project'); ui = f.render();
  assert.equal(ui.directory.busy, true); assert.deepEqual(f.picked, []);
  assert.equal(f.created.length, 1); assert.equal(f.created[0].path, '/new-project');
  pending.resolve({ workspaceId: 'native-created', path: '/new-project' }); await tick();
  ui = f.render(); assert.equal(ui.directory.busy, false); assert.equal(ui.directory.open, false);
  assert.deepEqual(f.picked, ['native-created']); assert.equal(f.closed.length, 1);
});

test('directory cancel and failed adoption close safely without manufacturing a selected workspace', async () => {
  const f = fixture({ create: async () => { throw Error('native create refused'); } });
  f.directory(true); f.render().menu.onSelect('::add-workspace');
  f.render().directory.onCancel(); assert.equal(f.render().directory.open, false); assert.deepEqual(f.created, []);
  f.owner.open = true; f.render().menu.onSelect('::add-workspace');
  f.render().directory.onPicked('/refused'); await tick();
  let ui = f.render(); assert.equal(ui.directory.open, false); assert.equal(ui.directory.busy, false); assert.equal(ui.modal.open, true);
  assert.deepEqual(f.picked, []);
  ui.modal.onClose(); ui = f.render(); assert.equal(ui.modal.open, false);
});

test('one live anchor supports both rc.2 getAnchorRect and rc.5 anchorRef menu contracts', () => {
  const f = fixture(), ui = f.render();
  assert.equal(ui.menu.anchorRef, f.anchorRef);
  assert.equal(ui.menu.getAnchorRect(), f.anchorRef.current.getBoundingClientRect());
  const next = { left: 120, top: 200, width: 50, height: 20 }; f.moveAnchor(next);
  assert.equal(ui.menu.getAnchorRect(), next); assert.equal(ui.menu.anchorRef.current.getBoundingClientRect(), next);
  f.owner.anchorRef = undefined;
  const absent = f.render().menu; assert.equal(absent.anchorRef.current, null); assert.equal(absent.getAnchorRect(), null);
});
