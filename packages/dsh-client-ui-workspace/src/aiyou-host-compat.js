/** Shared picker surface added by Harness 0.2.2; keep the existing flow owner. */
function AiyouWorkspacePickerFactory(props) {
  return (0, react_jsx_runtime.jsx)(WorkspacePickFlow, {
    ...props,
    renderDirectoryFlow: owner => props.renderSlot('workspace.picker.directoryFlow', owner),
  });
}

/** The factory eagerly declares its directory hole, even before it is rendered.
 * Both generations of the native slot registry own the registration's teardown. */
function installAiyouWorkspacePickerFactory(ctx) {
  const workspaces = ctx.get('workspaces');
  const hole = 'workspace.picker.directoryFlow';
  const directoryFlow = {
    getSnapshot: () => ctx.slots.entries(hole).length > 0,
    subscribe: listener => ctx.slots.subscribe(hole, listener),
  };
  return ctx.slots.registerFactory({
    name: 'workspace.picker',
    scope: 'root',
    children: { [hole]: { kind: 'single', scope: 'root' } },
    inject: () => ({
      createWorkspace: input => workspaces.create(input),
      hooks: { directoryFlow },
    }),
    locale: 'workspace',
  }, AiyouWorkspacePickerFactory);
}

let AIYOU_NATIVE_WORKSPACE_MENUS;

/** Preserve old menu entries inside the newer native menu's content seat. */
function AiyouNativeSessionMenu({ target, dismiss, renderSlot }) {
  const hookContext = (0, react.useMemo)(() => [true, open => { if (!open) dismiss(); }], [dismiss]);
  return target.kind === 'session'
    ? renderSlot('sidebar.workspaces.session.menu.item', target.value, { hookContext })
    : null;
}

/** Resolve Header-owned export actions through their native owner, never by
 * reproducing download/copy commands. Keep the inner resolution live until the
 * outer occurrence closes; a refresh abort must not tear down its successor. */
function aiyouSessionExportContribution(ctx) {
  const resolutions = new Map();
  const live = target => ctx.get('sessions').list.getSnapshot().byId[target.sessionId];
  const release = (target, record) => {
    if (resolutions.get(target) !== record) return;
    resolutions.delete(target);
    record.resolution.dispose();
  };
  ctx.effect(() => () => {
    for (const [target, record] of resolutions) release(target, record);
  }, 'aiyou: native session export occurrences');
  return {
    id: 'aiyou-workspace.session-exports', target: 'session', order: 480,
    observe(target) {
      if (!live(target)) return [];
      const previous = resolutions.get(target);
      if (previous) release(target, previous);
      const resolution = ctx.contextMenus.resolve({ kind: 'sessionHeader', value: { sessionId: target.sessionId } });
      resolutions.set(target, { resolution, signal: null });
      return [resolution.source];
    },
    async resolve(target, signal) {
      const record = resolutions.get(target);
      if (!record || !live(target)) return [];
      record.signal = signal;
      signal.addEventListener('abort', () => queueMicrotask(() => {
        if (record.signal === signal) release(target, record);
      }), { once: true });
      await record.resolution.ready;
      if (signal.aborted || !live(target)) return [];
      return record.resolution.source.getSnapshot()
        .filter(action => action.id.startsWith('session-log-download.export/'))
        .map(action => ({ ...action, run: () => { if (live(target)) record.resolution.select(action.id); } }));
    },
  };
}

/** Native contextMenus is optional: rc.2 keeps its existing menu and dialogs. */
function installAiyouWorkspaceContextMenus(ctx) {
  const request = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)(null);
  const settle = () => request.set(null);
  ctx.inject(['contextMenus'], host => {
    const runtime = { host, menus: host.contextMenus, button: null };
    host.effect(() => {
      AIYOU_NATIVE_WORKSPACE_MENUS = runtime;
      return () => { if (AIYOU_NATIVE_WORKSPACE_MENUS === runtime) AIYOU_NATIVE_WORKSPACE_MENUS = undefined; settle(); };
    }, 'aiyou: native workspace menu bridge');
    host.slots.inject('contextMenu.content', () => host.slots.register({
      name: 'contextMenu.content', key: 'session',
    }, AiyouNativeSessionMenu));
    host.effect(() => host.contextMenus.register(aiyouSessionExportContribution(host)), 'aiyou: native session exports');
    host.slots.inject('contextMenu.icon', function* () {
      for (const [key, Icon] of Object.entries({
        'workspace.rename': _deepseek_ai_dsh_client_ui_primitives.IconEditOutlineRegular,
        'workspace.delete': _deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular,
      })) yield host.slots.register({ name: 'contextMenu.icon', key }, Icon);
    });
    for (const [action, order] of [['rename', 100], ['delete', 300]]) {
      host.effect(() => host.contextMenus.register({
        id: `aiyou-workspace.${action}`, target: 'workspace', order,
        observe: ({ workspaceId }) => [host.workspaces.list, host.locale,
          host.remoteAccess.source('workspace', workspaceId, `workspace/${action}`)],
        resolve: ({ workspaceId, displayTitle }) => {
          const allowed = () => host.remoteAccess.source('workspace', workspaceId, `workspace/${action}`).getSnapshot();
          const workspace = () => host.workspaces.list.getSnapshot().items.find(row => row.workspaceId === workspaceId);
          if (!workspace() || !allowed()) return [];
          return [{ id: action, label: host.locale.bind('workspace')(action === 'rename' ? 'rename' : 'delete.workspace'),
            icon: { key: `workspace.${action}` },
            ...(action === 'delete' ? { danger: true, separatorBefore: true } : {}),
            run: () => {
              const current = workspace();
              if (current && allowed()) request.set({ action, workspaceId, displayTitle, storedTitle: current.title });
            },
          }];
        },
      }), `aiyou: native workspace ${action}`);
    }
  });
  return { request, settle };
}

/** Targets follow the native session/workspace owner contracts. Re-read live
 * identity before opening so a removed row cannot act through a stale closure. */
function openAiyouNativeRowMenu(kind, value, event, button = false) {
  const runtime = AIYOU_NATIVE_WORKSPACE_MENUS;
  if (event.defaultPrevented) return true;
  if (!runtime) return false;
  const stale = () => { event.preventDefault(); event.stopPropagation(); return true; };
  let target;
  if (kind === 'session') {
    const session = runtime.host.get('sessions').list.getSnapshot().byId[value.sessionId];
    if (!session || session.blank) return stale();
    target = { kind, value: { sessionId: value.sessionId, displayTitle: session.title ?? value.displayTitle } };
  } else {
    const workspace = runtime.host.workspaces.list.getSnapshot().items.find(row => row.workspaceId === value.workspaceId);
    if (!workspace) return stale();
    target = { kind: 'workspace', value: { workspaceId: workspace.workspaceId, path: workspace.path, displayTitle: value.displayTitle } };
  }
  event.preventDefault(); event.stopPropagation(); event.currentTarget.focus?.({ preventScroll: true });
  const rect = button || !event.clientX && !event.clientY ? event.currentTarget.getBoundingClientRect() : null;
  const point = { x: rect?.left ?? event.clientX, y: rect?.bottom ?? event.clientY };
  const id = `${kind}:${kind === 'session' ? value.sessionId : value.workspaceId}`;
  const active = runtime.menus.active.getSnapshot();
  if (button && runtime.button === id && active?.kind === kind
    && (kind === 'session' ? active.value.sessionId === value.sessionId : active.value.workspaceId === value.workspaceId)) {
    runtime.menus.close(); runtime.button = null;
  } else {
    runtime.button = button ? id : null;
    runtime.menus.open(target, point, button ? { button: id } : undefined);
  }
  return true;
}
