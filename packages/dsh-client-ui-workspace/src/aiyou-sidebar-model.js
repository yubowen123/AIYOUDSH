/** AIYOU sidebar derivation shared by the reconstructed client and native projection. */
const AIYOU_SIDEBAR_KEY = 'aiyouSidebar';
const AIYOU_SIDEBAR_VIEWS = ['pinned', 'projects', 'recent', 'interrupted'];
const AIYOU_INTERRUPTED_REASONS = new Set(['aborted', 'interrupted', 'error', 'max-tokens', 'blocked']);
const AIYOU_EMPTY_SIDEBAR_FACTS = Object.freeze({
  turn: 0, prompt: '', response: '', endReason: null, turnOpen: false, updatedAt: 0,
});

/** Collapse bounded text blocks without concatenating an unbounded response. */
function aiyouSidebarPreview(content, limit) {
  let text = '';
  for (const block of content ?? []) {
    if (block.type !== 'text') continue;
    text += `${text ? ' ' : ''}${block.text.slice(0, limit * 2)}`;
    if (text.length >= limit * 2) break;
  }
  const normalized = text.replace(/\s+/gu, ' ').trim();
  if (normalized.length <= limit) return normalized;
  let end = limit - 1;
  if (/[\uD800-\uDBFF]/u.test(normalized[end - 1] ?? '')) end--;
  return `${normalized.slice(0, end).trimEnd()}…`;
}

/** Fold the shipped SessionEvent discriminators; no client log reads or model calls. */
function aiyouFoldSidebarFacts(state, event) {
  switch (event.type) {
    case 'turn/start':
      return { ...state, turn: event.data.turn, turnOpen: true, endReason: null, response: '', updatedAt: event.time };
    case 'user/message':
      if (event.data.source.kind !== 'user') return state;
      return { ...state, prompt: aiyouSidebarPreview(event.data.content, 240), updatedAt: event.time };
    case 'assistant/message': {
      const response = aiyouSidebarPreview(event.data.message.content, 400);
      return response === '' ? state : { ...state, response, updatedAt: event.time };
    }
    case 'turn/end':
      if (event.data.turn < state.turn) return state;
      return { ...state, turn: event.data.turn, turnOpen: false, endReason: event.data.reason.kind, updatedAt: event.time };
    default:
      return state;
  }
}

/** Read published values first; missing historical end reasons stay unknown. */
function aiyouSidebarFacts(list, sessionId) {
  const values = list.projectionsBySession?.[sessionId]?.values ?? list.byId[sessionId]?.projectionValues ?? {};
  const facts = values[AIYOU_SIDEBAR_KEY];
  if (facts) return facts;
  const last = values.turnOutline?.at(-1);
  return last ? { ...AIYOU_EMPTY_SIDEBAR_FACTS, prompt: last.prompt, response: last.response } : AIYOU_EMPTY_SIDEBAR_FACTS;
}

/** Local topic labels are literal matches over available title and preview text. */
function aiyouSidebarTags(summary, facts, annotation) {
  if (annotation?.tags?.length) return annotation.tags;
  const text = `${summary?.title ?? ''} ${facts.prompt} ${facts.response}`;
  return [
    ['影视', /剧本|短剧|分镜|视频|剪辑|storyboard|video/iu],
    ['图像', /图片|图像|美术|海报|image|visual/iu],
    ['音乐', /音乐|配音|音频|music|audio/iu],
    ['办公', /文档|表格|钉钉|飞书|document|spreadsheet/iu],
    ['开发', /代码|开发|调试|应用|code|debug|harness/iu],
    ['研究', /研究|调研|分析|research|analysis/iu],
  ].filter(([, pattern]) => pattern.test(text)).slice(0, 3).map(([label]) => label);
}

/** A completed or unknown idle session is never inferred to be interrupted. */
function aiyouSidebarInterrupted(list, sessionId, statuses) {
  const row = list.byId[sessionId];
  const status = statuses.get(sessionId);
  if ((status?.running ?? row?.running) || status?.pendingInteraction) return false;
  return AIYOU_INTERRUPTED_REASONS.has(aiyouSidebarFacts(list, sessionId).endReason);
}

/** Browser-safe absolute path normalization; Windows paths compare without case. */
function aiyouSidebarFolderPath(value) {
  if (typeof value !== 'string' || !value || value.includes('\0')) return null;
  const path = value.replaceAll('\\', '/');
  let root, body, windows = false;
  if (/^[A-Za-z]:\//u.test(path)) {
    windows = true;
    root = `${path.slice(0, 2).toLowerCase()}/`;
    body = path.slice(3);
  } else {
    const unc = /^\/\/([^/:?*]+)\/([^/:?*]+)(?:\/|$)/u.exec(path);
    if (unc) {
      windows = true;
      root = `//${unc[1].toLowerCase()}/${unc[2].toLowerCase()}`;
      body = path.slice(unc[0].length);
    } else if (path.startsWith('/') && !value.startsWith('\\') && !path.startsWith('//')) {
      root = '/';
      body = path.slice(1);
    } else return null;
  }
  const segments = [];
  for (const segment of body.split('/')) {
    if (!segment || segment === '.') continue;
    if (segment === '..') segments.pop();
    else segments.push(windows ? segment.toLowerCase() : segment);
  }
  return { windows, path: root + (segments.length ? (root.endsWith('/') ? '' : '/') + segments.join('/') : '') };
}

/** Select a workspace folder together with its registered descendants. */
function aiyouSidebarWorkspaceIds(workspaces, selected) {
  if (selected === '*' || selected === '__ungrouped__') return null;
  const selectedWorkspace = workspaces.find(workspace => workspace.workspaceId === selected);
  if (!selectedWorkspace) return new Set();
  const root = aiyouSidebarFolderPath(selectedWorkspace.path);
  const prefix = root ? root.path + (root.path.endsWith('/') ? '' : '/') : '';
  return new Set(workspaces.filter(workspace => {
    if (workspace.workspaceId === selected) return true;
    const path = aiyouSidebarFolderPath(workspace.path);
    return root && path && root.windows === path.windows && (path.path === root.path || path.path.startsWith(prefix));
  }).flatMap(workspace => workspace.sessionIds));
}

/** Filter only presentation membership, leaving account orders and native pins untouched. */
function aiyouSidebarVisibleIds(list, workspaces, pinnedIds, archivedIds, statuses, view, selected, archivedFilter) {
  const pins = new Set(pinnedIds);
  const archives = new Set(archivedIds);
  const selectedIds = aiyouSidebarWorkspaceIds(workspaces, selected);
  const accounted = selected === '__ungrouped__' ? new Set(workspaces.flatMap(workspace => workspace.sessionIds)) : null;
  return list.ids.filter(id => {
    const row = list.byId[id];
    if (!row || row.origin === 'subagent' || (row.blank && !(row.retainedBy?.mainView > 0))) return false;
    if (archivedFilter === 'only' ? !archives.has(id) : archivedFilter !== 'show' && archives.has(id)) return false;
    if (selectedIds && !selectedIds.has(id)) return false;
    if (accounted?.has(id)) return false;
    if (view === 'pinned' && (!pins.has(id) || archives.has(id))) return false;
    if (view === 'interrupted' && !aiyouSidebarInterrupted(list, id, statuses)) return false;
    return true;
  });
}

/** Make a render-only list; complete source snapshots are never mutated. */
function aiyouSidebarFilterList(list, visibleIds) {
  return { ...list, ids: [...visibleIds], byId: Object.fromEntries(visibleIds.map(id => [id, list.byId[id]])) };
}

/** Add available summaries, folder paths and user labels to the native content-search merge. */
function aiyouSidebarSearchPage(list, workspaces, query, annotations, page) {
  const needle = query.trim().toLocaleLowerCase();
  const local = list.ids.flatMap(sessionId => {
    const summary = list.byId[sessionId];
    const facts = aiyouSidebarFacts(list, sessionId);
    const tags = aiyouSidebarTags(summary, facts, annotations[sessionId]);
    const workspace = workspaces.find(item => item.sessionIds.includes(sessionId));
    const text = `${facts.prompt} ${facts.response} ${tags.join(' ')} ${workspace?.path ?? summary?.cwd ?? ''}`;
    return text.toLocaleLowerCase().includes(needle) ? [{ sessionId, snippet: facts.response || facts.prompt }] : [];
  });
  return { ...page, items: [...local, ...page.items] };
}

/** Recent view is chronological even when a session is pinned. */
function aiyouSidebarOrderRows(rows, view) {
  return view === 'recent' ? [...rows].sort((a, b) => b.updatedAt - a.updatedAt || String(a.id).localeCompare(String(b.id))) : rows;
}

/** Normalize only user-authored annotation fields at the local persistence input. */
function aiyouSidebarAnnotation(value) {
  const tags = [...new Set(String(value.tags ?? '').split(/[,，]/u).map(tag => tag.trim().slice(0, 32)).filter(Boolean))].slice(0, 3);
  const urgency = ['critical', 'important', 'normal'].includes(value.urgency) ? value.urgency : '';
  return { tags, urgency };
}
