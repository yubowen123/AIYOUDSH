/**
 * Client half — token / context usage panel (native DSH right-sidebar panel).
 *
 * Reports only numbers the harness actually recorded; anything unknown stays
 * "—" rather than being estimated. That mirrors upstream AIYOUCODEX's contract
 * ("只显示 Codex 已记录的 Token，用量未知不估算") and avoids inventing a quota
 * reset clock that DSH does not expose — context headroom is the honest
 * substitute for Codex's "剩余比例与重置时间".
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-usage',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-usage/tab';
    const KIND = 'aiyoucodex-usage';

    const API_ORIGIN = '';
    const API = `${API_ORIGIN}/aiyoucodex-dsh/usage`;

    const t = {
      title: '用量与上下文',
      refresh: '刷新',
      loading: '正在读取用量…',
      retry: '重试',
      current: '当前会话',
      // Deliberately not "当前会话": with several sessions writing at once, the
      // newest log write is not necessarily the session the user is looking at,
      // so the label states exactly what was measured rather than implying more.
      recentActivity: '最近写入',
      aggregate: '全部会话合计',
      sessions: '会话用量',
      context: '上下文占用',
      output: '输出 Token',
      input: '未缓存输入',
      cache: '缓存命中',
      turns: '轮次',
      steps: '步骤',
      llmTime: '模型耗时',
      toolTime: '工具耗时',
      updated: '更新于',
      recentTurns: '最近轮次',
      noSessions: '没有找到会话用量记录',
      unknown: '—',
    };

    const DASH = t.unknown;

    const fmtTokens = (value) => {
      if (typeof value !== 'number' || !Number.isFinite(value)) return DASH;
      if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
      if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
      if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
      return String(value);
    };
    const fmtMs = (value) => {
      if (typeof value !== 'number' || !Number.isFinite(value)) return DASH;
      if (value >= 60000) return `${Math.round(value / 60000)}m`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}s`;
      return `${Math.round(value)}ms`;
    };
    const fmtTime = (iso) => {
      if (!iso) return DASH;
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return DASH;
      const pad = (n) => String(n).padStart(2, '0');
      return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const S = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
      header: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 12px 8px' },
      h1: { fontSize: '14px', fontWeight: 600, margin: 0, flex: 1 },
      body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' },
      card: { padding: '10px 12px', borderRadius: 'var(--dsw-radius-lg)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', display: 'flex', flexDirection: 'column', gap: '6px' },
      cardTitle: { fontSize: '13px', fontWeight: 600, lineHeight: '18px', wordBreak: 'break-word' },
      label: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
      value: { fontSize: '13px', lineHeight: '18px', color: 'var(--dsw-alias-label-primary)' },
      btn: { padding: '4px 10px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l4)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' },
      excerpt: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' },
    };

    function Stat(props) {
      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 } },
        h('span', { style: S.label }, props.label),
        h('span', { style: { ...S.value, color: props.accent || S.value.color } }, props.value),
      );
    }

    function PressureBar(props) {
      const percent = props.percent;
      const has = typeof percent === 'number' && Number.isFinite(percent);
      const width = has ? Math.max(0, Math.min(100, percent)) : 0;
      const fill = has && percent >= 80
        ? 'var(--dsw-alias-state-error-primary, var(--dsw-alias-brand-primary))'
        : 'var(--dsw-alias-brand-primary)';
      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
          h('span', { style: S.label }, t.context),
          h('span', { style: S.value }, has ? `${percent}%` : DASH),
        ),
        h('div', { style: { height: '6px', borderRadius: '999px', background: 'var(--dsw-alias-bg-layer-2)', overflow: 'hidden' } },
          h('div', { style: { width: `${width}%`, height: '100%', background: fill, borderRadius: '999px' } }),
        ),
        h('div', { style: S.label },
          `${fmtTokens(props.pressureTokens)} / ${fmtTokens(props.contextWindow)}`),
      );
    }

    function SessionCard(props) {
      const [open, setOpen] = React.useState(false);
      const session = props.session;
      return h('div', { style: S.card },
        h('div', { style: { display: 'flex', gap: '6px', alignItems: 'baseline' } },
          h('div', { style: { ...S.cardTitle, flex: 1 } }, session.title),
          props.badge ? h('span', { style: { ...S.label, color: 'var(--dsw-alias-brand-primary)' } }, props.badge) : null,
        ),
        h(PressureBar, { percent: session.context?.usedPercent, pressureTokens: session.context?.pressureTokens, contextWindow: session.context?.contextWindow }),
        h('div', { style: S.grid },
          h(Stat, { label: t.output, value: fmtTokens(session.tokens?.output) }),
          h(Stat, { label: t.input, value: fmtTokens(session.tokens?.uncachedInput) }),
          h(Stat, { label: t.cache, value: fmtTokens(session.tokens?.cacheRead) }),
          h(Stat, { label: `${t.turns} / ${t.steps}`, value: `${session.stats?.turns ?? DASH} / ${session.stats?.steps ?? DASH}` }),
        ),
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: S.label }, `${t.updated} ${fmtTime(session.updatedAt)}`),
          session.recentTurns?.length
            ? h('button', { type: 'button', style: S.btn, onClick: () => setOpen((value) => !value) }, t.recentTurns)
            : null,
        ),
        open
          ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' } },
              ...session.recentTurns.map((turn, index) => h('div', { key: `${session.id}-${index}`, style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
                h('span', { style: S.label }, `#${turn.turn ?? index + 1}`),
                turn.prompt ? h('span', { style: S.excerpt }, `▶ ${turn.prompt}`) : null,
                turn.response ? h('span', { style: S.excerpt }, `◀ ${turn.response}`) : null,
              )),
            )
          : null,
      );
    }

    function UsagePanel({ sessionId = '' } = {}) {
      const [snapshot, setSnapshot] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [busy, setBusy] = React.useState(false);

      const load = React.useCallback(async () => {
        setBusy(true);
        setError(null);
        try {
          const response = await fetch(API, { cache: 'no-store' });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setSnapshot(value);
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        } finally {
          setBusy(false);
        }
      }, []);

      React.useEffect(() => {
        void load();
      }, [load]);

      const sessions = snapshot?.sessions ?? [];
      const aggregate = snapshot?.aggregate;
      const exact = sessions.find((session) => session.id === sessionId);
      const current = exact ?? sessions.find((session) => session.id === snapshot?.currentSessionId);

      return h('div', { style: S.root },
        h('div', { style: S.header },
          h('h1', { style: S.h1 }, t.title),
          h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void load() }, t.refresh),
        ),
        h('div', { style: S.body },
          error
            ? h('div', { style: S.card },
                h('div', { style: S.cardTitle }, '读取失败'),
                h('div', { style: S.excerpt }, error),
                h('button', { type: 'button', style: S.btn, onClick: () => void load() }, t.retry),
              )
            : null,
          snapshot === null && !error ? h('div', { style: S.label }, t.loading) : null,

          current
            ? h(SessionCard, {
                session: current,
                badge: exact || snapshot?.currentSessionIdSource === 'env' ? t.current : t.recentActivity,
              })
            : null,

          aggregate
            ? h('div', { style: S.card },
                h('div', { style: S.label }, t.aggregate),
                h('div', { style: S.grid },
                  h(Stat, { label: t.output, value: fmtTokens(aggregate.output) }),
                  h(Stat, { label: t.input, value: fmtTokens(aggregate.uncachedInput) }),
                  h(Stat, { label: t.cache, value: fmtTokens(aggregate.cacheRead) }),
                  h(Stat, { label: `${t.turns} / ${t.steps}`, value: `${aggregate.turns} / ${aggregate.steps}` }),
                  h(Stat, { label: t.llmTime, value: fmtMs(aggregate.llmMs) }),
                  h(Stat, { label: t.toolTime, value: fmtMs(aggregate.toolMs) }),
                ),
              )
            : null,

          snapshot && sessions.length === 0 ? h('div', { style: S.label }, t.noSessions) : null,

          sessions.length
            ? h('div', { style: S.label, marginTop: '2px' }, t.sessions)
            : null,
          ...sessions
            .filter((session) => session.id !== current?.id)
            .map((session) => h(SessionCard, { key: session.id, session })),
        ),
      );
    }

    /**
     * The right sidebar is one docking surface PER SESSION, so the tab body may
     * already receive the session identity. If it does, the panel can highlight
     * the exact session instead of falling back to "newest log write". This
     * probe reports the prop shape and any session-shaped string on first mount.
     */
    function UsageTab(props) {
      const tab = typeof props.useTabInfo === 'function' ? props.useTabInfo().tab : null;
      return h(UsagePanel, { sessionId: tab?.navigation?.params?.sessionId ?? props.sessionId ?? props.session ?? '' });
    }

    return {
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: TYPE_ID, kind: KIND, title: () => "用量与上下文",
          guide: [{ id: 'open', order: 70, title: () => "用量与上下文", description: () => "用量与上下文" }],
        }), 'usage:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
          ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TYPE_ID },
            (props) => h(UsageTab, props))), 'usage:panel');
      },
    };
  },
});
