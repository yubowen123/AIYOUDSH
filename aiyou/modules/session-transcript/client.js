/**
 * Client half — readable conversation transcript.
 *
 * The panel shows the FILTERING, not just the result, because the filtering is
 * where this can go quietly wrong: 58 events are typed `user/message` in a session
 * where the user typed 8 things, and an assistant message carries `reasoning` and
 * `tool-call` parts alongside its prose. A transcript built without those
 * distinctions would report 7x the real user message count and leak the model's
 * internal reasoning into a file meant to be readable.
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-session-transcript',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-session-transcript/tab';
    const KIND = 'aiyoucodex-session-transcript';

    const API_ORIGIN = '';
    const BASE = `${API_ORIGIN}/aiyoucodex-dsh/session-transcript`;

    const S = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
      bar: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px 6px', flexWrap: 'wrap' },
      body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '9px' },
      card: { padding: '9px 11px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', display: 'flex', flexDirection: 'column', gap: '5px' },
      head: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 },
      btn: { padding: '4px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l4)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      meta: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
      kv: { display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: '11px', lineHeight: '16px' },
      msg: { padding: '7px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', fontSize: '11px', lineHeight: '16px', whiteSpace: 'pre-wrap', maxHeight: '160px', overflowY: 'auto', color: 'var(--dsw-alias-label-secondary)' },
      note: { fontSize: '11px', lineHeight: '16px', padding: '7px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-state-warn-secondary)', color: 'var(--dsw-alias-state-warn-label)' },
    };

    function SessionTranscript(props) {
      const sessionId=props?.sessionId || props?.session || "";
      const [data, setData] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [busy, setBusy] = React.useState(false);
      const [note, setNote] = React.useState('');

      const load = React.useCallback(async () => {
        setBusy(true);
        setError(null);
        try {
          const response = await fetch(`${BASE}?preview=6&session=${encodeURIComponent(sessionId)}`, { cache: 'no-store' });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setData(value);
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        } finally {
          setBusy(false);
        }
      }, [sessionId]);

      React.useEffect(() => {
        void load();
      }, [load]);

      const exportFiles = React.useCallback(async () => {
        setBusy(true);
        setNote('');
        try {
          const response = await fetch(`${BASE}/export`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({session:sessionId}) });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          setNote(`已写入 ${value.dir}：${value.files.join('、')}（${value.kept} 条可读消息）`);
        } catch (failure) {
          setNote(`导出失败：${String(failure?.message ?? failure)}`);
        } finally {
          setBusy(false);
        }
      }, [sessionId]);

      const rows = (object) => Object.entries(object ?? {}).slice(0, 8)
        .map(([key, value]) => h('div', { key, style: S.kv }, h('span', null, key), h('span', null, String(value))));

      return h('div', { style: S.root },
        h('div', { style: S.bar },
          h('span', { style: { flex: 1, fontWeight: 600 } }, '对话副本'),
          h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void load() }, busy ? '读取中…' : '刷新'),
          h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void exportFiles() }, '导出 md + json'),
        ),
        h('div', { style: S.body },
          error ? h('div', { style: { ...S.meta, color: 'var(--dsw-alias-state-error-primary)' } }, error) : null,

          h('div', { style: S.note }, data?.note ?? '这是可读副本，不是历史恢复。'),

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '来源')),
            h('div', { style: S.kv }, h('span', null, '会话'), h('span', null, data?.sessionId ?? '—')),
            h('div', { style: S.kv }, h('span', null, 'zstd frame'), h('span', null, `${data?.frames ?? '—'}（解压失败 ${data?.framesFailed ?? '—'}）`)),
            h('div', { style: S.kv }, h('span', null, '事件总数'), h('span', null, String(data?.events ?? '—'))),
            h('div', { style: S.kv }, h('span', null, '可读消息'), h('span', null, `${data?.kept ?? '—'}（用户 ${data?.roles?.user ?? '—'} / 助手 ${data?.roles?.assistant ?? '—'}）`)),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head },
              h('span', null, 'user/message 的来源'),
              h('span', { style: S.meta }, '只有 user 是用户真正输入'),
            ),
            ...rows(data?.userSources),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head },
              h('span', null, 'assistant 内容部件'),
              h('span', { style: S.meta }, '只保留 text'),
            ),
            ...rows(data?.assistantParts),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '尾部预览')),
            ...((data?.preview ?? []).map((message) => h('div', { key: message.index, style: S.card },
              h('div', { style: S.meta }, `#${message.index} · ${message.role === 'user' ? '用户' : '助手'}`),
              h('div', { style: S.msg }, message.excerpt),
            ))),
          ),

          note ? h('div', { style: S.meta }, note) : null,
          h('div', { style: S.meta }, '导出只写用户与助手文字：不含思考过程、工具调用、附件或可续跑状态。'),
        ),
      );
    }

    return {
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: TYPE_ID, kind: KIND, title: () => "对话副本",
          guide: [{ id: 'open', order: 64, title: () => "对话副本", description: () => "对话副本" }],
        }), 'session-transcript:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
          ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TYPE_ID },
            (props) => h(SessionTranscript, { ...props, __sidebarRight: ctx.sidebarRight }))), 'session-transcript:panel');
      },
    };
  },
});
