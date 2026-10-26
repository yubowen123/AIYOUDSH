/**
 * Client half — task context panel (目标 / 进度 / 下一步).
 *
 * TWO KINDS OF CONTENT, NEVER MIXED:
 *
 *   已记录 (recorded)      facts DSH itself wrote into the session projection:
 *                          the persisted goal, plan state, turn count. Marked
 *                          authoritative, each citing the projection row it came
 *                          from. Not editable.
 *   提取草稿 (extracted)   upstream's local-extractive draft. Marked 待核验 and
 *                          editable, exactly as upstream intends ("确认保存或预览
 *                          后继续执行"). Upstream's own warning text is shown
 *                          verbatim rather than softened.
 *
 * Keeping these apart is the point of the feature: a heuristic draft must never
 * read as a recorded fact.
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-session-context',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-session-context/tab';
    const KIND = 'aiyoucodex-session-context';

    const API_ORIGIN = '';
    const API = `${API_ORIGIN}/aiyoucodex-dsh/session-context`;

    const S = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
      bar: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px 6px', flexWrap: 'wrap' },
      body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' },
      btn: { padding: '4px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l4)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer', whiteSpace: 'nowrap' },
      section: { display: 'flex', flexDirection: 'column', gap: '6px' },
      sectionHead: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 },
      badge: { fontSize: '10px', lineHeight: '15px', padding: '1px 6px', borderRadius: '999px', border: '1px solid var(--dsw-alias-border-l2)', color: 'var(--dsw-alias-label-tertiary)' },
      badgeRecorded: { fontSize: '10px', lineHeight: '15px', padding: '1px 6px', borderRadius: '999px', border: '1px solid var(--dsw-alias-state-success-primary)', color: 'var(--dsw-alias-state-success-primary)' },
      badgeDraft: { fontSize: '10px', lineHeight: '15px', padding: '1px 6px', borderRadius: '999px', border: '1px solid var(--dsw-alias-state-warn-primary)', color: 'var(--dsw-alias-state-warn-primary)' },
      card: { padding: '8px 10px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', fontSize: '12px', lineHeight: '18px', display: 'flex', flexDirection: 'column', gap: '5px' },
      meta: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
      area: { width: '100%', boxSizing: 'border-box', minHeight: '64px', resize: 'vertical', padding: '6px 8px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', fontFamily: 'inherit' },
      warn: { fontSize: '11px', lineHeight: '16px', padding: '6px 8px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-state-warn-secondary)', color: 'var(--dsw-alias-state-warn-label)' },
    };

    const FIELDS = [
      { key: 'goal', label: '目标', max: 600 },
      { key: 'progress', label: '进度', max: 1200 },
      { key: 'nextStep', label: '下一步', max: 600 },
    ];

    function SessionContext(props) {
      const sessionId = props?.sessionId ?? props?.session ?? '';
      const [data, setData] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [draft, setDraft] = React.useState({ goal: '', progress: '', nextStep: '' });
      const [dirty, setDirty] = React.useState(false);
      const [savedNote, setSavedNote] = React.useState('');
      const [loading, setLoading] = React.useState(false);
      const [saving, setSaving] = React.useState(false);
      const [conflict, setConflict] = React.useState(null);
      const scope = React.useRef({ sessionId, active: true, read: 0, edit: 0, saving: false });
      const currentDraft = React.useRef(draft);
      currentDraft.current = draft;
      if (scope.current.sessionId !== sessionId) {
        scope.current.active = false;
        scope.current = { sessionId, active: true, read: 0, edit: 0, saving: false };
      }

      const load = React.useCallback(async (fresh = false) => {
        const owner = scope.current;
        const request = ++owner.read;
        const edit = owner.edit;
        const valid = () => owner.active && scope.current === owner && owner.read === request;
        if (!sessionId) {
          setLoading(false);
          setError('这个面板需要知道当前会话 id（由侧栏行菜单或会话打开时提供）');
          return;
        }
        setLoading(true);
        try {
          setError(null);
          const query = new URLSearchParams({ session: sessionId, ...(fresh ? { fresh: '1' } : {}) });
          const response = await fetch(`${API}?${query}`, { cache: 'no-store' });
          const value = await response.json();
          if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
          if (!valid()) return;
          setData(value);
          if (owner.conflict) {
            owner.conflict = 'review';
            setConflict('review');
            setSavedNote('已读取最新记录；本地草稿已保留，请对照后确认保存。');
            return;
          }
          if (owner.edit !== edit) {
            setSavedNote('读取已完成；保留当前尚未保存的修改。');
            return;
          }
          const selected = fresh ? value?.draft?.context : value?.saved ?? value?.draft?.context;
          const next = Object.fromEntries(FIELDS.map(({ key }) => [key, selected?.[key] ?? '']));
          currentDraft.current = next;
          setDraft(next);
          const differs = fresh && JSON.stringify(value?.draft?.context ?? {}) !== JSON.stringify(value?.saved ?? {});
          setDirty(differs);
          setSavedNote(fresh ? (differs ? '已重新提取，尚未保存。' : '提取结果与已保存记录一致。') : value?.savedAt ? `已保存的记录：${String(value.savedAt).slice(0, 16).replace('T', ' ')}` : '');
        } catch (failure) {
          if (valid()) setError(String(failure?.message ?? failure));
        } finally {
          if (valid()) setLoading(false);
        }
      }, [sessionId]);

      React.useEffect(() => {
        const owner = scope.current;
        owner.active = true;
        setData(null);
        setDraft({ goal: '', progress: '', nextStep: '' });
        setDirty(false);
        setSavedNote('');
        setSaving(false);
        setConflict(null);
        void load();
        return () => { owner.active = false; };
      }, [load]);

      const save = React.useCallback(async () => {
        const owner = scope.current;
        if (!owner.active || owner.saving || owner.conflict === 'stale' || !sessionId || !data) return;
        owner.saving = true;
        const edit = owner.edit;
        const submitted = { ...data.draft?.context, ...currentDraft.current };
        const valid = () => owner.active && scope.current === owner;
        setSaving(true);
        setError(null);
        try {
          const response = await fetch(`${API}/save`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ session: sessionId, context: submitted, expectedVersion: data?.savedVersion ?? 0 }),
          });
          const value = await response.json();
          if (!response.ok) {
            if (response.status === 409 && value?.code === 'CONTEXT_VERSION_CONFLICT' && valid()) {
              owner.conflict = 'stale';
              setConflict('stale');
              setDirty(true);
              setSavedNote('其他窗口已保存新版本；本地草稿已保留。请先刷新核对，不会自动覆盖。');
            }
            throw new Error(value?.error || `HTTP ${response.status}`);
          }
          if (!valid()) return;
          owner.conflict = null;
          setConflict(null);
          setData(previous => ({ ...previous, saved: value.context ?? submitted, savedVersion: value.version }));
          const unchanged = owner.edit === edit;
          setDirty(!unchanged);
          setSavedNote(unchanged ? `已保存 v${value.version}` : '上一版已保存；当前修改尚未保存。');
        } catch (failure) {
          if (valid()) setError(String(failure?.message ?? failure));
        } finally {
          owner.saving = false;
          if (valid()) setSaving(false);
        }
      }, [sessionId, draft, data]);

      const goal = data?.facts?.goal;
      const recorded = data?.recordedSources ?? [];
      const fields = draft;

      return h('div', { style: S.root },
        h('div', { style: S.bar },
          h('span', { style: { flex: 1, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
            data?.facts?.title || '任务上下文'),
          h('button', { type: 'button', style: S.btn, disabled: loading || saving, onClick: () => void load() }, '刷新'),
        ),
        h('div', { style: S.body },
          error ? h('div', { role: 'alert', style: S.warn }, error) : null,
          loading ? h('div', { role: 'status', style: S.meta }, '正在读取任务上下文…') : null,
          conflict ? h('div', { role: 'status', style: S.warn },
            conflict === 'stale' ? '此会话已由其他窗口更新。本地草稿已保留，请刷新读取最新记录后核对。' :
              h('div', null, h('strong', null, `最新保存记录 v${data?.savedVersion ?? 0}（下方草稿尚未保存）`),
                ...FIELDS.map(field => h('div', { key: field.key, style: { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' } }, `${field.label}：${data?.saved?.[field.key] || '（空）'}`)))) : null,

          // ---- recorded facts (authoritative) ----
          h('div', { style: S.section },
            h('div', { style: S.sectionHead },
              h('span', null, '已记录'),
              h('span', { style: S.badgeRecorded }, '来自 DSH 会话投影'),
            ),
            goal
              ? h('div', { style: S.card },
                  h('div', { style: S.meta }, `目标 · ${goal.phase === 'complete' ? '已完成' : goal.phase === 'active' ? '进行中' : goal.phase ?? '—'} · 修订 r${goal.revision ?? '?'} · 上限 ${goal.maxGoalRounds ?? '?'} 轮`),
                  h('div', { style: { whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto' } }, goal.objective ?? ''),
                )
              : h('div', { style: S.card }, h('div', { style: S.meta }, '本会话没有持久化目标（未调用 create_goal）')),
            data?.facts?.firstPrompt
              ? h('div', { style: S.card },
                  h('div', { style: S.meta }, `首条消息 · 共 ${data.facts.promptCount ?? '?'} 条用户消息`),
                  h('div', { style: { whiteSpace: 'pre-wrap', maxHeight: '120px', overflowY: 'auto' } }, data.facts.firstPrompt),
                )
              : null,
            h('div', { style: S.meta }, recorded.map((entry) => `${entry.row}@${entry.seq ?? '?'}`).join(' · ') || '无来源'),
          ),

          // ---- extracted draft (unverified, editable) ----
          h('div', { style: S.section },
            h('div', { style: S.sectionHead },
              h('span', null, '提取草稿'),
              h('span', { style: S.badgeDraft }, '待核验 · 可编辑'),
              h('span', { style: S.badge }, `本地提取 · ${data?.historyCount ?? 0} 条消息`),
            ),
            ...FIELDS.map((field) => h('div', { key: field.key, style: S.section },
              h('div', { style: S.meta }, `${field.label}（上限 ${field.max} 字）`),
              h('textarea', {
                style: S.area,
                value: fields[field.key] ?? '',
                maxLength: field.max,
                'aria-label': field.label,
                disabled: loading || saving || !sessionId || data === null,
                onChange: (event) => {
                  scope.current.edit++;
                  currentDraft.current = { ...currentDraft.current, [field.key]: event.target.value };
                  setDirty(true);
                  setDraft(currentDraft.current);
                },
              }),
            )),
            h('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
              h('button', { type: 'button', style: S.btn, disabled: loading || saving || conflict === 'stale' || !dirty || !sessionId || !data, onClick: () => void save() }, saving ? '正在保存…' : conflict === 'stale' ? '请先刷新核对' : conflict === 'review' ? '确认用本地草稿保存' : dirty ? '保存草稿' : '已保存'),
              h('button', { type: 'button', style: S.btn, disabled: loading || saving || Boolean(conflict) || !sessionId, onClick: () => void load(true) }, '恢复自动提取'),
              savedNote ? h('span', { role: 'status', style: S.meta }, savedNote) : null,
            ),
            ...(data?.draft?.warnings ?? []).map((warning, index) => h('div', { key: index, style: S.warn }, warning)),
          ),

          // ---- extracted extras ----
          (data?.draft?.context?.agreements ?? []).length
            ? h('div', { style: S.section },
                h('div', { style: S.sectionHead }, h('span', null, '约定'), h('span', { style: S.badgeDraft }, '待核验')),
                ...data.draft.context.agreements.map((item, index) => h('div', { key: index, style: S.card }, item)),
              )
            : null,
          (data?.draft?.context?.references ?? []).length
            ? h('div', { style: S.section },
                h('div', { style: S.sectionHead }, h('span', null, '引用'), h('span', { style: S.badgeDraft }, '待核验')),
                ...data.draft.context.references.map((item, index) => h('div', { key: index, style: S.card }, item)),
              )
            : null,

          h('div', { style: S.meta }, `来源修订 ${String(data?.draft?.sourceRevision ?? '').slice(0, 12)} · 投影 v${data?.projectionVersion ?? '?'}`),
        ),
      );
    }

    function SessionContextTab(props) {
      const tab = typeof props.useTabInfo === 'function' ? props.useTabInfo().tab : null;
      return h(SessionContext, { sessionId: tab?.navigation?.params?.sessionId ?? props.sessionId ?? props.session ?? '' });
    }

    return {
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: TYPE_ID, kind: KIND, title: () => "任务上下文",
          guide: [{ id: 'open', order: 61, title: () => "任务上下文", description: () => "任务上下文" }],
        }), 'session-context:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
          ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TYPE_ID },
            (props) => h(SessionContextTab, props))), 'session-context:panel');
      },
    };
  },
});
