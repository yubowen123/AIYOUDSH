/**
 * Client half — reset / release monitor panel.
 *
 * The panel's job is to keep four things visually distinct, because upstream's doc
 * treats conflating them as the failure mode:
 *
 *   证据置信度  source quality — NOT the probability a reset happens
 *   到账状态    requires a verifiable reset-count increment; this harness exposes
 *               none, so it says 待核验 rather than inferring delivery
 *   倒计时      only from a verified exact time; on arrival: 已到时 · 待核验
 *   本机压力    this harness's own numbers, with this suite's own thresholds,
 *               explicitly unrelated to OpenAI's quota rules
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-reset-monitor',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-reset-monitor/tab';
    const KIND = 'aiyoucodex-reset-monitor';

    const API_ORIGIN = '';
    const BASE = `${API_ORIGIN}/aiyoucodex-dsh/reset-monitor`;

    const S = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
      bar: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px 6px', flexWrap: 'wrap' },
      body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '9px' },
      card: { padding: '9px 11px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', display: 'flex', flexDirection: 'column', gap: '5px' },
      head: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 },
      btn: { padding: '4px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l4)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      meta: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
      input: { width: '72px', padding: '4px 7px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px' },
    };

    function bandStyle(band) {
      if (band === 'red') return { borderColor: 'var(--dsw-alias-state-error-primary)' };
      if (band === 'yellow') return { borderColor: 'var(--dsw-alias-state-warn-primary)' };
      return {};
    }

    function ResetMonitor() {
      const [data, setData] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [interval, setIntervalMinutes] = React.useState(15);
      const [busy, setBusy] = React.useState(false);
      const [note, setNote] = React.useState('');
      const [now, setNow] = React.useState(Date.now);

      const load = React.useCallback(async () => {
        try {
          setError(null);
          const response = await fetch(BASE, { cache: 'no-store' });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setData(value);
          setIntervalMinutes(value?.settings?.intervalMinutes ?? 15);
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        }
      }, []);

      React.useEffect(() => {
        void load();
      }, [load]);
      React.useEffect(() => {
        setNow(Date.now());
        if (!(data?.events ?? []).some(event => Number.isFinite(event.countdownAt) && event.countdownAt > Date.now())) return;
        const timer = setInterval(() => {
          const next = Date.now();setNow(next);
          if (!(data?.events ?? []).some(event => Number.isFinite(event.countdownAt) && event.countdownAt > next)) clearInterval(timer);
        }, 1000);
        return () => clearInterval(timer);
      }, [data]);

      const save = React.useCallback(async (patch) => {
        try {
          setBusy(true);
          const response = await fetch(`${BASE}/settings`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(patch),
          });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setNote(`已保存：每 ${value.settings.intervalMinutes} 分钟${value.settings.enabled ? '' : '（已暂停）'}`);
          await load();
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        } finally {
          setBusy(false);
        }
      }, [load]);

      const checkNow = React.useCallback(async () => {
        try {
          setBusy(true);
          const response = await fetch(`${BASE}/check`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setNote(`已扫描：${(value.results ?? []).map((r) => `${r.feedId}${r.notModified ? ' 未变更' : ` 新 ${r.new ?? 0}`}`).join(' · ')}`);
          await load();
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        } finally {
          setBusy(false);
        }
      }, [load]);

      const pressure = data?.pressure;
      const events = data?.events ?? [];

      const countdown = (event) => {
        if (!event.countdownAt) return null;
        const delta = event.countdownAt - now;
        if (delta <= 0) return '已到时 · 待核验';
        const hours = Math.floor(delta / 3_600_000);
        const minutes = Math.floor((delta % 3_600_000) / 60_000);
        return hours > 0 ? `${hours} 小时 ${minutes} 分后` : `${minutes} 分钟后`;
      };

      return h('div', { style: S.root },
        h('div', { style: S.bar },
          h('span', { style: { flex: 1, fontWeight: 600 } }, '重置公告与监控'),
          h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void checkNow() }, '立即检查'),
          h('button', { type: 'button', style: S.btn, onClick: () => void load() }, '刷新'),
        ),
        h('div', { style: S.body },
          error ? h('div', { style: { ...S.meta, color: 'var(--dsw-alias-state-error-primary, #d33)' } }, error) : null,

          // ---- DSH-native signal, labelled as such ----
          h('div', { style: { ...S.card, ...(pressure?.band === 'red' ? bandStyle('red') : pressure?.band === 'yellow' ? bandStyle('yellow') : {}) } },
            h('div', { style: S.head },
              h('span', null, '本机上下文压力'),
              h('span', { style: S.meta }, 'DSH 原生信号'),
            ),
            pressure?.available
              ? h(React.Fragment, null,
                  h('div', { style: { fontSize: '18px', fontWeight: 600 } }, `${pressure.percent ?? '—'}%`),
                  h('div', { style: S.meta }, `${pressure.pressureTokens ?? '—'} / ${pressure.contextWindow ?? '—'} tokens`),
                  h('div', { style: S.meta }, `会话 ${pressure.session ?? '—'}`),
                )
              : h('div', { style: S.meta }, pressure?.reason ?? '不可用'),
            h('div', { style: S.meta }, pressure?.note ?? ''),
          ),

          // ---- announcement feed ----
          h('div', { style: S.card },
            h('div', { style: S.head },
              h('span', null, '公告预警'),
              h('span', { style: S.meta }, `进入预警层 ${events.length} 条 / 历史 ${data?.historyCount ?? 0} 条`),
            ),
            events.length === 0
              ? h('div', { style: S.meta }, '当前没有达到 70% 证据置信度的公告。低于阈值不展示，这是有意为之。')
              : null,
            ...events.slice(0, 12).map((event) => h('div', {
              key: event.key,
              style: { ...S.card, ...bandStyle(event.band) },
            },
              h('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } },
                h('span', { style: { fontSize: '11px', padding: '1px 6px', borderRadius: '999px', border: '1px solid currentColor', color: event.band === 'red' ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-state-warn-primary)' } },
                  `证据 ${event.confidence}%`),
                h('span', { style: S.meta }, `${event.status} · ${event.resetType === 'banked' ? '重置次数' : '直接重置'}`),
                event.countdownAt ? h('span', { style: S.meta }, countdown(event)) : null,
              ),
              h('div', { style: { fontSize: '12px', lineHeight: '17px' } }, event.excerpt),
              h('div', { style: S.meta }, `到账状态：待核验 —— ${event.deliveryNote}`),
              h('div', { style: S.meta },
                `${event.publishedAt ? new Date(event.publishedAt).toLocaleString() : '时间未知'} · ${event.timing?.basis ?? '未提取到可靠时间'}`),
            )),
          ),

          // ---- settings ----
          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '监控设置')),
            h('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } },
              h('span', { style: S.meta }, '间隔（分钟 1–10080）'),
              h('input', {
                style: S.input,
                type: 'number',
                'aria-label': '公告检查间隔（分钟）',
                min: 1,
                max: 10080,
                value: interval,
                onChange: (event) => setIntervalMinutes(Number(event.target.value)),
              }),
              h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void save({ intervalMinutes: interval }) }, '保存'),
              h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void save({ enabled: !data?.settings?.enabled }) },
                data?.settings?.enabled ? '暂停' : '启用'),
            ),
            h('div', { style: S.meta }, `状态：${data?.settings?.enabled ? '启用' : '已暂停'} · 上次扫描 ${data?.health?.lastRunAt ? new Date(data.health.lastRunAt).toLocaleTimeString() : '—'} · 连续失败 ${data?.health?.failures ?? 0}`),
            h('div', { style: S.meta }, (data?.settings?.feeds ?? []).map((feed) => feed.label).join(' · ')),
            note ? h('div', { style: S.meta }, note) : null,
          ),

          // ---- semantics, always visible ----
          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '口径说明')),
            ...Object.values(data?.semantics ?? {}).map((line, index) => h('div', { key: index, style: S.meta }, line)),
            h('div', { style: S.meta }, '分类全部在本地完成：不调用模型、不唤醒对话、不产生 Token 消耗。'),
          ),
        ),
      );
    }

    return {
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: TYPE_ID, kind: KIND, title: () => "发布追踪",
          guide: [{ id: 'open', order: 67, title: () => "发布追踪", description: () => "发布追踪" }],
        }), 'reset-monitor:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
          ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TYPE_ID },
            (props) => h(ResetMonitor, { ...props, __sidebarRight: ctx.sidebarRight }))), 'reset-monitor:panel');
      },
    };
  },
});
