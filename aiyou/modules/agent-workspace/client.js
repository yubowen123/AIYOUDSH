/**
 * Client half — Agent Workspace discovery panel.
 *
 * Displays the two kinds of evidence SEPARATELY, because that separation is the
 * feature: an agent whose directory exists but whose program was not detected is
 * "本地内容保留", not "已安装". Collapsing them into one badge would tell the user
 * something the scan did not establish.
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-agent-workspace',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-agent-workspace/tab';
    const KIND = 'aiyoucodex-agent-workspace';

    const API_ORIGIN = '';
    const BASE = `${API_ORIGIN}/aiyoucodex-dsh/agent-workspace`;

    const S = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
      bar: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px 6px', flexWrap: 'wrap' },
      body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' },
      card: { padding: '8px 10px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', display: 'flex', flexDirection: 'column', gap: '5px' },
      row: { display: 'flex', alignItems: 'center', gap: '7px' },
      mark: { width: '22px', height: '22px', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', fontSize: '10px', color: 'var(--dsw-alias-label-secondary)' },
      name: { flex: 1, fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
      btn: { padding: '4px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l4)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      meta: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
      mono: { fontSize: '10px', lineHeight: '15px', fontFamily: 'ui-monospace, monospace', wordBreak: 'break-all', color: 'var(--dsw-alias-label-tertiary)' },
      ok: { fontSize: '10px', lineHeight: '15px', padding: '1px 6px', borderRadius: '999px', border: '1px solid var(--dsw-alias-state-success-primary)', color: 'var(--dsw-alias-state-success-primary)', whiteSpace: 'nowrap' },
      keep: { fontSize: '10px', lineHeight: '15px', padding: '1px 6px', borderRadius: '999px', border: '1px solid var(--dsw-alias-state-warn-primary)', color: 'var(--dsw-alias-state-warn-primary)', whiteSpace: 'nowrap' },
      none: { fontSize: '10px', lineHeight: '15px', padding: '1px 6px', borderRadius: '999px', border: '1px solid var(--dsw-alias-border-l2)', color: 'var(--dsw-alias-label-tertiary)', whiteSpace: 'nowrap' },
      pre: { margin: 0, padding: '7px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', fontSize: '11px', lineHeight: '16px', whiteSpace: 'pre-wrap', color: 'var(--dsw-alias-label-secondary)' },
    };

    function AgentWorkspace() {
      const [data, setData] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [busy, setBusy] = React.useState(false);
      const [onlyContent, setOnlyContent] = React.useState(false);

      const load = React.useCallback(async (refresh) => {
        setBusy(true);
        setError(null);
        try {
          const response = await fetch(`${BASE}${refresh ? '?refresh=1' : ''}`, { cache: 'no-store' });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setData(value);
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        } finally {
          setBusy(false);
        }
      }, []);

      React.useEffect(() => {
        void load(false);
      }, [load]);

      const agents = (data?.agents ?? []).filter((agent) => !onlyContent || agent.contentOnly);

      return h('div', { style: S.root },
        h('div', { style: S.bar },
          h('span', { style: { flex: 1, fontWeight: 600 } }, 'Agent 工作区'),
          h('button', { type: 'button', style: S.btn, onClick: () => setOnlyContent((v) => !v) }, onlyContent ? '显示全部' : '只看本地内容'),
          h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void load(true) }, busy ? '扫描中…' : '重新扫描'),
        ),
        h('div', { style: S.body },
          error ? h('div', { style: { ...S.meta, color: 'var(--dsw-alias-state-error-primary)' } }, error) : null,

          h('div', { style: S.card },
            h('div', { style: S.row },
              h('span', { style: S.name }, `本机 Agent（目录 ${data?.catalogSize ?? 16} 个）`),
            ),
            h('div', { style: S.meta }, `已安装程序 ${data?.summary?.installed ?? '—'} · 有内容 ${data?.summary?.withContent ?? '—'} · 仅本地内容 ${data?.summary?.contentOnly ?? '—'}`),
          ),

          ...agents.map((agent) => h('div', { key: agent.id, style: S.card },
            h('div', { style: S.row },
              h('span', { style: S.mark }, agent.mark),
              h('span', { style: S.name }, agent.name),
              agent.installed
                ? h('span', { style: S.ok }, '已安装')
                : agent.contentOnly
                  ? h('span', { style: S.keep }, '本地内容保留')
                  : h('span', { style: S.none }, '未检出'),
            ),
            h('div', { style: S.meta },
              `Skills ${agent.skillCount} · 指令 ${agent.instructionFile?.exists ? '有' : '无'} · 记忆 ${agent.memoryFile?.exists ? '有' : '无'}${agent.shared ? ' · 共享 Skills' : ''}`),
            agent.evidence.length
              ? h('div', { style: S.mono }, `程序证据：${agent.evidence.map((entry) => entry.path).join(' · ')}`)
              : null,
            agent.contentRoots.filter((entry) => entry.exists).length
              ? h('div', { style: S.mono }, `内容目录：${agent.contentRoots.filter((entry) => entry.exists).map((entry) => entry.path).join(' · ')}`)
              : null,
          )),

          h('div', { style: S.card },
            h('div', { style: S.row }, h('span', { style: S.name }, '检测口径')),
            ...Object.values(data?.semantics ?? {}).map((line, index) => h('div', { key: index, style: S.meta }, line)),
            h('div', { style: S.meta }, `扫描范围：${(Array.isArray(data?.scope) ? data.scope.join(' · ') : data?.scope ?? '尚未运行本机检测')}`),
            (data?.warnings ?? []).length ? h('pre', { style: S.pre }, (data.warnings ?? []).join('\n')) : null,
          ),
        ),
      );
    }

    return {
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: TYPE_ID, kind: KIND, title: () => "Agent 工作区",
          guide: [{ id: 'open', order: 65, title: () => "Agent 工作区", description: () => "Agent 工作区" }],
        }), 'agent-workspace:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
          ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TYPE_ID },
            (props) => h(AgentWorkspace, { ...props, __sidebarRight: ctx.sidebarRight }))), 'agent-workspace:panel');
      },
    };
  },
});
