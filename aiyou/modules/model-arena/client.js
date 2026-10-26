/**
 * Client half — Model Arena.
 *
 * THE TWO-STEP, ON PURPOSE.
 *
 * Every generation here creates a canvas node and spends credits, and the service
 * says a submission cannot be undone. So this panel cannot have a single button
 * that fans a prompt across eight models: that would turn "looking at the arena"
 * into spending money. Instead:
 *
 *   准备  → builds the exact payload server-side and shows it. Costs nothing.
 *   提交  → only enabled after a prepare, and it re-sends the SAME spec with
 *           `confirm: true`. The button states the number of generations on it.
 *
 * Nothing runs on mount, nothing runs on a timer, and a failed prepare never
 * leaves the submit button armed.
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-model-arena',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-model-arena/tab';
    const KIND = 'aiyoucodex-model-arena';

    const API_ORIGIN = '';
    const BASE = `${API_ORIGIN}/aiyoucodex-dsh/model-arena`;

    const S = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
      bar: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px 6px', flexWrap: 'wrap' },
      body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '9px' },
      card: { padding: '9px 11px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', display: 'flex', flexDirection: 'column', gap: '6px' },
      head: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 },
      btn: { padding: '4px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      btnOn: { padding: '4px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-brand-primary)', background: 'var(--dsw-alias-interactive-bg-hover-accent)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      danger: { padding: '6px 12px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-state-error-primary)', background: 'transparent', color: 'var(--dsw-alias-state-error-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer', fontWeight: 600 },
      disabled: { padding: '6px 12px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-tertiary)', fontSize: '12px', lineHeight: '18px', cursor: 'not-allowed' },
      meta: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
      warn: { fontSize: '11px', lineHeight: '16px', padding: '7px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-state-warn-secondary)', color: 'var(--dsw-alias-state-warn-label)' },
      area: { width: '100%', boxSizing: 'border-box', minHeight: '60px', resize: 'vertical', padding: '6px 8px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', fontFamily: 'inherit' },
      pre: { margin: 0, padding: '8px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', fontSize: '11px', lineHeight: '16px', whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto', color: 'var(--dsw-alias-label-secondary)' },
      select: { padding: '4px 7px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '7px' },
    };

    function ModelArena({useTabInfo,sessionId:providedSessionId=''}={}) {
      const tabInfo=typeof useTabInfo==='function'?useTabInfo():null;
      const sessionId=tabInfo?.tab?.navigation?.params?.sessionId||providedSessionId;
      const panel=React.useRef(null);if(!panel.current)panel.current=globalThis.crypto.randomUUID();
      const currentSession=React.useRef(sessionId);currentSession.current=sessionId;
      const catalogSequence=React.useRef(0),prepareSequence=React.useRef(0),inputRevision=React.useRef(0),targetSequence=React.useRef(0);
      const [targets, setTargets] = React.useState(null);
      const [kind, setKind] = React.useState('image');
      const [catalog, setCatalog] = React.useState(null);
      const [picked, setPicked] = React.useState([]);
      const [prompt, setPrompt] = React.useState('');
      const [prepared, setPrepared] = React.useState(null);
      const [submitted, setSubmitted] = React.useState(null);
      const [statuses, setStatuses] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [targetsState,setTargetsState]=React.useState('loading');
      const [catalogBusy,setCatalogBusy]=React.useState(false),[prepareBusy,setPrepareBusy]=React.useState(false),[submitBusy,setSubmitBusy]=React.useState(false);
      const busy=catalogBusy||prepareBusy||submitBusy;
      const invalidate=React.useCallback(()=>{inputRevision.current++;setPrepared(null);setSubmitted(null);setStatuses(null);},[]);

      const target = targets?.canvases?.[0] ?? null;
      React.useEffect(()=>{invalidate();},[sessionId,invalidate]);

      const loadTargets=React.useCallback(async()=>{
        const sequence=++targetSequence.current;setTargetsState('loading');setError(null);
        try{
          const response=await fetch(`${BASE}/targets`,{cache:'no-store'}),value=await response.json();
          if(!response.ok)throw new Error(value?.error||`HTTP ${response.status}`);
          if(!Array.isArray(value?.projects)||!Array.isArray(value?.canvases))throw new Error('项目目录格式无效，请重试。');
          if(sequence!==targetSequence.current)return;setTargets(value);setTargetsState('ready');
        }catch(failure){if(sequence===targetSequence.current){setTargets(null);setTargetsState('error');setError(String(failure?.message??failure));}}
      },[]);
      React.useEffect(()=>{void loadTargets();return()=>{targetSequence.current++;catalogSequence.current++;prepareSequence.current++;};},[loadTargets]);
      const loadCatalog=React.useCallback(async()=>{
        if(!target)return;const sequence=++catalogSequence.current;
        setCatalogBusy(true);setError(null);setCatalog(null);setPicked([]);invalidate();
        try{
          const response=await fetch(`${BASE}/catalog?kind=${kind}&projectId=${target.projectId}&canvasId=${target.id}`,{cache:'no-store'}),value=await response.json();
          if(!response.ok)throw new Error(value?.error||`HTTP ${response.status}`);
          if(sequence===catalogSequence.current)setCatalog(value);
        }catch(failure){if(sequence===catalogSequence.current)setError(String(failure?.message??failure));}
        finally{if(sequence===catalogSequence.current)setCatalogBusy(false);}
      },[kind,target,invalidate]);
      React.useEffect(()=>{void loadCatalog();return()=>{catalogSequence.current++;};},[loadCatalog]);
      const changeKind=value=>{if(value!==kind){invalidate();setKind(value);}};
      const toggle = (modelCode) => {
        invalidate();
        setPicked((current) => current.includes(modelCode)
          ? current.filter((value) => value !== modelCode)
          : current.length >= 8 ? current : [...current, modelCode]);
      };

      const prepare=React.useCallback(async()=>{
        if(!target||!prompt.trim()||!picked.length||prepareBusy||submitBusy)return;
        const sequence=++prepareSequence.current,revision=inputRevision.current;
        const requestSpec={sessionId,panelId:panel.current,kind,projectId:target.projectId,canvasId:target.id,prompt,models:picked.map(model=>({model}))};
        setPrepareBusy(true);setError(null);setPrepared(null);
        try{
          const response=await fetch(`${BASE}/prepare`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(requestSpec)}),value=await response.json();
          if(sequence!==prepareSequence.current||revision!==inputRevision.current||requestSpec.sessionId!==currentSession.current)return;
          if(!response.ok)throw new Error(value?.error||`HTTP ${response.status}`);
          setPrepared({...value.prepared,requestSpec,revision});setSubmitted(null);
        }catch(failure){if(sequence===prepareSequence.current&&revision===inputRevision.current){setError(String(failure?.message??failure));setPrepared(null);}}
        finally{if(sequence===prepareSequence.current)setPrepareBusy(false);}
      },[kind,target,prompt,picked,sessionId,prepareBusy,submitBusy]);
      const submit=React.useCallback(async()=>{
        if(!prepared||submitBusy||prepared.revision!==inputRevision.current||prepared.requestSpec.sessionId!==sessionId)return;
        const confirmed=prepared,revision=prepared.revision;setSubmitBusy(true);setError(null);
        try{
          const response=await fetch(`${BASE}/submit`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...confirmed.requestSpec,preparationId:confirmed.preparationId,confirm:true})}),value=await response.json();
          if(!response.ok)throw new Error(value?.error||`HTTP ${response.status}`);
          if(revision===inputRevision.current){setSubmitted(value);setPrepared(null);}
        }catch(failure){if(revision===inputRevision.current)setError(String(failure?.message??failure));}
        finally{setSubmitBusy(false);}
      },[prepared,submitBusy,sessionId]);

      const nodes = submitted?.result?.canvasNodeIds ?? [];
      const poll = React.useCallback(async () => {
        if (!target || nodes.length === 0) return;
        try {
          const response = await fetch(`${BASE}/status?projectId=${target.projectId}&canvasId=${target.id}&nodes=${nodes.join(',')}`, { cache: 'no-store' });
          const value = await response.json();
          if (response.ok) setStatuses(value);
        } catch {
          /* polling is best-effort */
        }
      }, [target, nodes.join(',')]);

      React.useEffect(() => {
        if (nodes.length === 0) return undefined;
        void poll();
        const timer = setInterval(() => void poll(), 15000);
        return () => clearInterval(timer);
      }, [poll, nodes.length]);

      return h('div', { style: S.root },
        h('div', { style: S.bar },
          h('span', { style: { flex: 1, fontWeight: 600 } }, '模型竞技场'),
          h('button', { type: 'button', style: kind === 'image' ? S.btnOn : S.btn, onClick: () => changeKind('image') }, '图片'),
          h('button', { type: 'button', style: kind === 'video' ? S.btnOn : S.btn, onClick: () => changeKind('video') }, '视频'),
          h('button', { type: 'button', style: S.btn, disabled: busy||targetsState==='loading', onClick: () => void (target?loadCatalog():loadTargets()) }, target?'刷新目录':'重新读取项目'),
        ),
        h('div', { style: S.body },
          error ? h('div', { style: { ...S.meta, color: 'var(--dsw-alias-state-error-primary)' } }, error) : null,

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '目标')),
            target
              ? h('div', { style: S.meta }, `${targets.projects.find((p) => p.id === target.projectId)?.name ?? '—'} / ${target.name} · 画布 ${target.id}`)
              : h('div', { style: S.meta }, targetsState==='loading'?'正在读取项目…':targetsState==='error'?'项目读取失败，请点击“重新读取项目”。':'尚无可用画布项目，请先创建项目后重试。'),
            !sessionId?h('div',{style:S.meta},'请从当前 DSH 对话打开竞技场后准备；未关联对话时不会提交。'):null,
            h('div', { style: S.meta }, `目录：${catalog?.total ?? '—'} 个${kind === 'image' ? '图片' : '视频'}模型 · ${catalog?.submitTool ?? ''}`),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '提示词')),
            h('textarea', { style: S.area, value: prompt, placeholder: '所有被选模型共用这一条提示词（这是对比的前提：只变模型）', onChange: (event) => { invalidate();setPrompt(event.target.value); } }),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head },
              h('span', null, '选择模型'),
              h('span', { style: S.meta }, `已选 ${picked.length} / 8`),
            ),
            h('div', { style: S.grid },
              ...((catalog?.models ?? []).map((model) => h('button', {
                key: model.model,
                type: 'button',
                style: { ...(picked.includes(model.model) ? S.btnOn : S.btn), textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2px' },
                onClick: () => toggle(model.model),
              },
                h('span', { style: { fontSize: '11px', lineHeight: '15px' } }, model.name),
                model.resolution?.default ? h('span', { style: { fontSize: '10px', color: 'var(--dsw-alias-label-tertiary)' } }, `${model.resolution.default} · ${model.aspectRatio?.default ?? 'auto'}`) : null,
              ))),
            ),
          ),

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '提交影响')),
            h('div', { style: S.warn }, prepared
              ? prepared.impact.note
              : `将创建 ${picked.length} 个画布节点并扣除积分。点击"准备"只会生成待提交内容，不会扣费。`),
            h('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } },
              h('button', {
                type: 'button',
                style: S.btn,
                disabled: busy || !target || !sessionId || !prompt.trim() || picked.length === 0,
                onClick: () => void prepare(),
              }, busy ? '处理中…' : `准备（${picked.length} 个模型，不扣费）`),
              prepared
                ? h('button', { type: 'button', style: S.danger, disabled: busy, onClick: () => void submit() },
                    `确认提交 · 扣费 ${prepared.impact.generations} 次`)
                : h('button', { type: 'button', style: S.disabled, disabled: true }, '确认提交（需先准备）'),
            ),
          ),

          prepared
            ? h('div', { style: S.card },
                h('div', { style: S.head }, h('span', null, '待提交内容（预览）')),
                h('pre', { style: S.pre }, JSON.stringify(prepared.args, null, 2)),
              )
            : null,

          submitted
            ? h('div', { style: S.card },
                h('div', { style: S.head }, h('span', null, '已提交')),
                h('div', { style: S.meta }, `工具 ${submitted.tool} · 节点 ${(submitted.result?.canvasNodeIds ?? []).join(', ') || '—'}`),
                h('div', { style: S.meta }, '轮询中（每 15 秒）。生成是异步的，不会立刻出结果。'),
                ...((statuses?.items ?? []).map((item, index) => h('div', { key: index, style: S.meta },
                  `${item.canvasNodeId ?? item.id ?? `#${index}`} · ${item.status ?? '—'}${item.mediaUrl ? ' · 已就绪' : ''}`))),
                (statuses?.items ?? []).filter((item) => item.thumbnailUrl || item.mediaUrl).map((item, index) => h('img', {
                  key: `img${index}`,
                  src: item.thumbnailUrl || item.mediaUrl,
                  alt: '结果',
                  style: { width: '100%', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)' },
                })),
              )
            : null,

          h('div', { style: S.card },
            h('div', { style: S.head }, h('span', null, '说明')),
            h('div', { style: S.meta }, '目录与状态查询是只读的；只有"确认提交"会真正创建节点并扣费。'),
            h('div', { style: S.meta }, '面板打开、切换类型、刷新目录都不会提交任何生成。'),
          ),
        ),
      );
    }

    return {
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: TYPE_ID, kind: KIND, title: () => "模型竞技场",
          guide: [{ id: 'open', order: 66, title: () => "模型竞技场", description: () => "模型竞技场" }],
        }), 'model-arena:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
          ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TYPE_ID },
            (props) => h(ModelArena, { ...props, __sidebarRight: ctx.sidebarRight }))), 'model-arena:panel');
      },
    };
  },
});
