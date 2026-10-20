/** Native browser controls and cards; all navigation and row actions remain with their existing owners. */
const AIYOU_SIDEBAR_STYLE = {
  controls: { padding: '8px 10px 4px', display: 'flex', flexDirection: 'column', gap: '9px' },
  tabs: { display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '3px', padding: '3px', borderRadius: '10px', background: 'var(--dsw-alias-bg-layer-1)' },
  tab: { minWidth: 0, border: 0, borderRadius: '7px', padding: '7px 2px', color: 'var(--dsw-alias-label-secondary)', background: 'transparent', font: 'inherit', fontSize: '11px', cursor: 'pointer' },
  activeTab: { color: 'var(--dsw-alias-label-primary)', background: 'var(--dsw-alias-bg-layer-2)', boxShadow: '0 1px 3px #00000012' },
  folders: { display: 'flex', gap: '5px', overflowX: 'auto', paddingBottom: '3px', scrollbarWidth: 'thin' },
  folder: { flex: '0 0 auto', maxWidth: '150px', padding: '4px 8px', borderRadius: '7px', border: '1px solid var(--dsw-alias-border-l2)', color: 'var(--dsw-alias-label-secondary)', background: 'transparent', font: 'inherit', fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' },
  card: { margin: '3px 0 7px', borderRadius: '10px', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', overflow: 'hidden' },
  body: { padding: '0 11px 9px 28px', display: 'flex', flexDirection: 'column', gap: '6px' },
  preview: { margin: 0, color: 'var(--dsw-alias-label-secondary)', fontSize: '11px', lineHeight: '17px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', overflowWrap: 'anywhere', cursor: 'pointer' },
  footer: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px' },
  tag: { fontSize: '10px', lineHeight: '16px', borderRadius: '4px', padding: '0 5px', color: 'var(--dsw-alias-label-secondary)', background: 'var(--dsw-alias-bg-layer-2)' },
  edit: { border: 0, color: 'var(--dsw-alias-label-secondary)', background: 'transparent', fontSize: '10px', marginLeft: 'auto', padding: '1px 4px', cursor: 'pointer' },
  editor: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px', borderRadius: '6px', background: 'var(--dsw-alias-bg-layer-2)' },
  input: { width: '100%', boxSizing: 'border-box', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: '5px', padding: '5px', font: 'inherit', fontSize: '11px', color: 'var(--dsw-alias-label-primary)', background: 'var(--dsw-alias-bg-layer-1)' },
};

function AiyouSidebarControls({ view, selected, workspaces, counts, unknownCount, onView, onWorkspace, t }) {
  const h = react.createElement;
  const chip = (id, label, title) => h('button', {
    key: id, type: 'button', 'aria-pressed': selected === id, title,
    style: { ...AIYOU_SIDEBAR_STYLE.folder, ...(selected === id ? AIYOU_SIDEBAR_STYLE.activeTab : {}) },
    onClick: () => onWorkspace(id),
  }, label);
  return h('div', { style: AIYOU_SIDEBAR_STYLE.controls, 'data-aiyou-sidebar-controls': true },
    h('div', { role: 'tablist', 'aria-label': t('aiyou.views'), style: AIYOU_SIDEBAR_STYLE.tabs },
      ...AIYOU_SIDEBAR_VIEWS.map(id => h('button', {
        key: id, type: 'button', role: 'tab', 'aria-selected': view === id,
        style: { ...AIYOU_SIDEBAR_STYLE.tab, ...(view === id ? AIYOU_SIDEBAR_STYLE.activeTab : {}) },
        onClick: () => onView(id),
      }, `${t(`aiyou.view.${id}`)} ${counts[id]}`))),
    h('div', { style: AIYOU_SIDEBAR_STYLE.folders, role: 'group', 'aria-label': t('aiyou.folders') },
      chip('*', t('aiyou.all')),
      ...workspaces.map(workspace => chip(workspace.workspaceId, workspace.title, workspace.path)),
      chip('__ungrouped__', t('group.ungrouped'))),
    view === 'interrupted' && unknownCount > 0
      ? h('div', { style: { fontSize: '10px', color: 'var(--dsw-alias-label-secondary)' }, 'data-aiyou-interrupted-unknown': true }, t('aiyou.unknownHistory', { n: unknownCount })) : null);
}

/** Wrap the real SessionNodeItem rather than replacing menus, pinning, status or archiving. */
function AiyouSessionCard({ aiyouList, aiyouAnnotations, aiyouSetAnnotation, ...rowProps }) {
  const h = react.createElement;
  const { node, t } = rowProps;
  const facts = aiyouSidebarFacts(aiyouList, node.id);
  const annotation = aiyouAnnotations[node.id] ?? { tags: [], urgency: '' };
  const [editing, setEditing] = react.useState(false);
  const [tags, setTags] = react.useState(annotation.tags.join(', '));
  const [urgency, setUrgency] = react.useState(annotation.urgency);
  const labels = aiyouSidebarTags(aiyouList.byId[node.id], facts, annotation);
  const colors = { critical: '#d43c4d', important: '#b27508', normal: '#14815b' };
  if (node.blank) return h(SessionNodeItem, rowProps);
  const preview = facts.response || facts.prompt;
  return h('div', {
    style: { ...AIYOU_SIDEBAR_STYLE.card, ...(annotation.urgency ? { borderInlineStart: `3px solid ${colors[annotation.urgency]}` } : {}) },
    'data-aiyou-session-card': node.id,
    'data-aiyou-urgency': annotation.urgency,
  },
  h(SessionNodeItem, rowProps),
  h('div', { style: AIYOU_SIDEBAR_STYLE.body },
    h('p', { style: AIYOU_SIDEBAR_STYLE.preview, onClick: () => rowProps.onOpen(node.id), title: preview || t('aiyou.preview.empty') },
      preview ? `${t(facts.response ? 'aiyou.preview.response' : 'aiyou.preview.prompt')}${preview}` : t('aiyou.preview.empty')),
    h('div', { style: AIYOU_SIDEBAR_STYLE.footer },
      ...labels.map(label => h('span', { key: label, style: AIYOU_SIDEBAR_STYLE.tag, title: t(annotation.tags.length ? 'aiyou.tags.user' : 'aiyou.tags.auto') }, label)),
      facts.endReason && AIYOU_INTERRUPTED_REASONS.has(facts.endReason)
        ? h('span', { style: AIYOU_SIDEBAR_STYLE.tag }, t(`aiyou.reason.${facts.endReason}`)) : null,
      h('button', {
        type: 'button', style: AIYOU_SIDEBAR_STYLE.edit, 'aria-expanded': editing,
        onClick: () => { setTags(annotation.tags.join(', ')); setUrgency(annotation.urgency); setEditing(value => !value); },
      }, t('aiyou.annotate'))),
    editing ? h('div', { style: AIYOU_SIDEBAR_STYLE.editor },
      h('input', { style: AIYOU_SIDEBAR_STYLE.input, value: tags, maxLength: 100, 'aria-label': t('aiyou.tags.label'), placeholder: t('aiyou.tags.placeholder'), onChange: event => setTags(event.target.value) }),
      h('select', { style: AIYOU_SIDEBAR_STYLE.input, value: urgency, 'aria-label': t('aiyou.urgency'), onChange: event => setUrgency(event.target.value) },
        ...['', 'critical', 'important', 'normal'].map(value => h('option', { key: value, value }, t(`aiyou.urgency.${value || 'none'}`)))),
      h('button', { type: 'button', style: AIYOU_SIDEBAR_STYLE.folder, onClick: () => { aiyouSetAnnotation(node.id, { tags, urgency }); setEditing(false); } }, t('aiyou.save'))) : null));
}
