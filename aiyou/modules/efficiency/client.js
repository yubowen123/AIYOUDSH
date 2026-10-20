/**
 * Client half — output efficiency settings.
 *
 * The panel's job is to make the INHERITANCE visible: every field shows which
 * layer currently supplies it, because "my setting did nothing" is the failure
 * mode this feature exists to prevent. Editing a field writes only that layer's
 * override; clearing it restores the layer beneath.
 *
 * It also shows the EXACT text that will be injected into the system prompt, so
 * "已保存" and "真的会被加载" are not the same claim. Upstream draws the same
 * distinction ("界面区分已保存和真实加载回执"); here the receipt is the rendered
 * section text, which is what the model actually receives.
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-efficiency',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-efficiency/tab';
    const KIND = 'aiyoucodex-efficiency';

    const API_ORIGIN = '';
    const BASE = `${API_ORIGIN}/aiyoucodex-dsh/efficiency`;

    const MODE_LABEL = { smart: '智能', concise: '精简', detailed: '详细' };
    const MODE_NOTE = {
      smart: '操作任务简短汇报，方案分析按需要展开',
      concise: '结果优先，减少客套、重复解释与逐步旁白',
      detailed: '提供充分解释、理由与必要示例',
    };

    const S = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
      bar: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px 6px', flexWrap: 'wrap' },
      body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' },
      card: { padding: '9px 11px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', display: 'flex', flexDirection: 'column', gap: '7px' },
      head: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 },
      btn: { padding: '4px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      btnOn: { padding: '4px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-brand-primary)', background: 'var(--dsw-alias-interactive-bg-hover-accent)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      meta: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
      src: { fontSize: '10px', lineHeight: '15px', padding: '1px 6px', borderRadius: '999px', border: '1px solid var(--dsw-alias-border-l2)', color: 'var(--dsw-alias-label-tertiary)' },
      srcSet: { fontSize: '10px', lineHeight: '15px', padding: '1px 6px', borderRadius: '999px', border: '1px solid var(--dsw-alias-brand-primary)', color: 'var(--dsw-alias-brand-primary)' },
      row: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' },
      pre: { margin: 0, padding: '8px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', fontSize: '11px', lineHeight: '16px', whiteSpace: 'pre-wrap', maxHeight: '240px', overflowY: 'auto', color: 'var(--dsw-alias-label-secondary)' },
    };

    const SCOPES = [
      { id: 'global', label: '全局默认' },
      { id: 'project', label: '项目' },
      { id: 'session', label: '当前对话' },
    ];

    function EfficiencyPanel(props) {
      const [data, setData] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [scope, setScope] = React.useState('global');
      const [project, setProject] = React.useState('');
      const [session, setSession] = React.useState('');
      const [note, setNote] = React.useState('');

      const load = React.useCallback(async () => {
        try {
          setError(null);
          const params = new URLSearchParams();
          if (project) params.set('project', project);
          if (session) params.set('session', session);
          const response = await fetch(`${BASE}?${params}`, { cache: 'no-store' });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setData(value);
          if (!project && value?.layers?.project !== undefined) {
            // The panel cannot read the conversation's cwd itself; ask the host.
            const info = await fetch(`${BASE}?project=${encodeURIComponent('')}&session=${encodeURIComponent(session || 'current')}`, { cache: 'no-store' });
            if (info.ok) {
              const resolved = await info.json();
              setSession(resolved?.sessionId ?? session);
            }
          }
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        }
      }, [project, session]);

      React.useEffect(() => {
        void load();
      }, [load]);

      const write = React.useCallback(async (patch, targetScope = scope) => {
        try {
          const response = await fetch(`${BASE}/set`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              scope: targetScope,
              id: targetScope === 'project' ? project : targetScope === 'session' ? session : '',
              patch,
              project,
              session,
            }),
          });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setData((current) => current ? { ...current, layers: value.layers, resolved: value.resolved, appliedBy: value.appliedBy, instruction: value.instruction } : current);
          setNote(`已写入${SCOPES.find((entry) => entry.id === targetScope)?.label ?? targetScope}层`);
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        }
      }, [scope, project, session]);

      const reset = React.useCallback(async (layer) => {
        try {
          const response = await fetch(`${BASE}/set`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ scope: 'reset', layer, id: layer === 'project' ? project : session }),
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          await load();
          setNote(`已清除${layer}层覆盖`);
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        }
      }, [project, session, load]);

      const resolved = data?.resolved;
      const appliedBy = data?.appliedBy ?? {};
      const layer = data?.layers?.[scope] ?? {};
      const isOverriddenHere = (key) => Object.prototype.hasOwnProperty.call(layer, key);
      const sourceBadge = (key) => {
        const from = appliedBy[key];
        if (!from) return h('span', { style: S.src }, '默认值');
        return h('span', { style: from === 'global' ? S.src : S.srcSet }, from);
      };

      return h('div', { style: S.root },
        h('div', { style: S.bar },
          h('span', { style: { flex: 1, fontWeight: 600 } }, '输出效率'),
          h('button', { type: 'button', style: S.btn, onClick: () => void load() }, '刷新'),
        ),
        h('div', { style: S.body },
          error ? h('div', { style: { ...S.meta, color: 'var(--dsw-alias-state-error-primary)' } }, error) : null,

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '编辑层')),
            h('div', { style: S.row },
              ...SCOPES.map((entry) => h('button', {
                key: entry.id,
                type: 'button',
                style: scope === entry.id ? S.btnOn : S.btn,
                onClick: () => setScope(entry.id),
              }, entry.label)),
            ),
            scope === 'project'
              ? h('input', {
                  style: { padding: '5px 8px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px' },
                  placeholder: '项目目录绝对路径',
                  value: project,
                  onChange: (event) => setProject(event.target.value),
                })
              : null,
            scope === 'session'
              ? h('input', {
                  style: { padding: '5px 8px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px' },
                  placeholder: '会话 id（留空则用最近活动会话）',
                  value: session,
                  onChange: (event) => setSession(event.target.value),
                })
              : null,
            h('div', { style: S.meta }, '在这一层设置的项会覆盖上层；未设置的项继续继承。清除后恢复上层。'),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head },
              h('span', null, '输出模式'),
              sourceBadge('mode'),
              isOverriddenHere('mode') ? h('span', { style: S.srcSet }, '本层已覆盖') : null,
            ),
            h('div', { style: S.row },
              ...(data?.modes ?? ['smart', 'concise', 'detailed']).map((mode) => h('button', {
                key: mode,
                type: 'button',
                style: (resolved?.mode === mode) ? S.btnOn : S.btn,
                onClick: () => void write({ mode }),
              }, MODE_LABEL[mode] ?? mode)),
            ),
            h('div', { style: S.meta }, MODE_NOTE[resolved?.mode] ?? ''),
            h('div', { style: S.row },
              h('button', { type: 'button', style: S.btn, onClick: () => void write({ mode: null }) }, '在本层清除模式覆盖'),
            ),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '启用'), sourceBadge('enabled')),
            h('div', { style: S.row },
              h('button', { type: 'button', style: resolved?.enabled ? S.btnOn : S.btn, onClick: () => void write({ enabled: true }) }, '启用'),
              h('button', { type: 'button', style: resolved?.enabled ? S.btn : S.btnOn, onClick: () => void write({ enabled: false }) }, '停用'),
            ),
            h('div', { style: S.meta }, '停用后不注入任何输出偏好，等于本套件在此作用域不存在。'),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '上下文预算'), sourceBadge('contextBudget')),
            h('div', { style: S.meta }, `当前 ${resolved?.contextBudget ?? '—'} 字符（允许 512–2400）`),
            h('div', { style: S.row },
              ...[900, 1400, 2000].map((value) => h('button', {
                key: value,
                type: 'button',
                style: resolved?.contextBudget === value ? S.btnOn : S.btn,
                onClick: () => void write({ contextBudget: value }),
              }, String(value))),
            ),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head },
              h('span', null, '将被注入的系统提示'),
              h('span', { style: S.src }, `section ${data?.section?.name ?? '—'} @ ${data?.section?.order ?? '—'}`),
            ),
            h('div', { style: S.meta }, '这是每回合真实进入模型的文本（由动态 section 在装配时求值），不是"已保存"的声明。'),
            h('pre', { style: S.pre }, data?.instruction || '（当前为停用状态，不注入）'),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '各层覆盖')),
            ...SCOPES.map((entry) => h('div', { key: entry.id, style: S.meta },
              `${entry.label}：${JSON.stringify(data?.layers?.[entry.id] ?? {})}`)),
            h('div', { style: S.row },
              h('button', { type: 'button', style: S.btn, onClick: () => void reset('project') }, '清除项目层'),
              h('button', { type: 'button', style: S.btn, onClick: () => void reset('session') }, '清除对话层'),
              h('button', { type: 'button', style: S.btn, onClick: () => void reset('global') }, '清除全局层'),
            ),
          ),

          note ? h('div', { style: S.meta }, note) : null,
        ),
      );
    }

    return {
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: TYPE_ID, kind: KIND, title: () => "输出偏好",
          guide: [{ id: 'open', order: 62, title: () => "输出偏好", description: () => "输出偏好" }],
        }), 'efficiency:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
          ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TYPE_ID },
            (props) => h(EfficiencyPanel, { ...props, __sidebarRight: ctx.sidebarRight }))), 'efficiency:panel');
      },
    };
  },
});
