        // AIYOU workbench: native actions keep the conversation mounted.
        const AIYOU_FEATURES = [
            { id: 'aiyou-moke', kind: 'browser', native: true, label: 'MOKE AIGC', group: '创作与资产', primary: true },
            { id: 'aiyou-agents', kind: 'aiyoucodex-agent-workspace', label: 'Agent 工作区', glyph: '◈', group: '项目与协作', primary: true },
            { id: 'aiyou-skills', kind: 'aiyoucodex-skills', label: 'Skills 分组', glyph: '✧', group: '创作与资产', primary: true },
            { id: 'aiyou-assets', kind: 'aiyoucodex-asset-console', label: '资产控制台', glyph: '▧', group: '创作与资产', primary: true },
            { id: 'aiyou-arena', kind: 'aiyoucodex-model-arena', label: '模型竞技场', glyph: '◇', group: '创作与资产', primary: true },
            { id: 'aiyou-projects', kind: 'aiyoucodex-taskboard', label: '项目管理', glyph: '▤', group: '项目与协作', primary: true },
            { id: 'aiyou-context', kind: 'aiyoucodex-session-context', label: '任务上下文', glyph: '◎', group: '当前对话' },
            { id: 'aiyou-efficiency', kind: 'aiyoucodex-efficiency', label: '输出偏好', glyph: '≋', group: '当前对话' },
            { id: 'aiyou-usage', kind: 'aiyoucodex-usage', label: '用量与上下文', glyph: '◴', group: '当前对话', placement: 'header' },
            { id: 'aiyou-folders', kind: 'aiyoucodex-conversation-folders', label: '输出目录', glyph: '▱', group: '当前对话', placement: 'header' },
            { id: 'aiyou-transcript', kind: 'aiyoucodex-session-transcript', label: '对话副本', glyph: '▥', group: '当前对话' },
            { id: 'aiyou-theme', kind: 'aiyoucodex-theme', label: '主题配置', glyph: '◐', group: '外观与服务' },
            { id: 'aiyou-reset', kind: 'aiyoucodex-reset-monitor', label: '重置公告', glyph: '↻', group: '外观与服务' }
        ];
        const AIYOU_NAV_NOTICE = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)({ message: '', activeId: null });
        const AIYOU_HUB_KIND = 'aiyoucodex-workbench';
        const AIYOU_HUB_TYPE = '@aiyou/workbench/tab';
        function currentAiyouSession(ctx) {
            const rows = ctx.get('sessions').list.getSnapshot().byId;
            return Object.values(rows).find(row => (row.retainedBy?.mainView ?? 0) > 0);
        }
        function openAiyouFeature(ctx, featureId, extra = {}, { toggle = false } = {}) {
            const feature = AIYOU_FEATURES.find(row => row.id === featureId);
            const current = currentAiyouSession(ctx);
            const session = extra.sessionId === undefined ? current
                : ctx.get('sessions').list.getSnapshot().byId[extra.sessionId];
            if (extra.sessionId !== undefined && (!session || session.id !== current?.id))
                throw new Error('当前对话已切换，请在新对话顶部重新打开工具。');
            if (!session) throw new Error('请先打开或新建一个对话，再使用工作台工具。');
            if (featureId === 'aiyou-moke') {
                const kind = openAiyouMoke(ctx, session, { toggle });
                AIYOU_NAV_NOTICE.set({ message: '', activeId: ctx.get('sidebarRight').isExpanded?.() ? featureId : null });
                return kind;
            }
            const kind = feature?.kind ?? (featureId === 'aiyou-workbench' ? AIYOU_HUB_KIND : null);
            if (!kind) throw new Error('未找到该工作台工具');
            const sidebar = ctx.get('sidebarRight');
            if (toggle && sidebar.active?.()?.kind === kind && sidebar.isExpanded?.()) {
                sidebar.toggleExpanded();
                AIYOU_NAV_NOTICE.set({ message: '', activeId: null });
                return kind;
            }
            // Native sidebarRight is scoped to the selected conversation. Selecting a
            // global placeholder first unmounts that scope and makes openTab fail.
            ctx.layout.selectPanel(null);
            sidebar.openTab(kind, {
                revealIfOpened: true,
                params: { ...extra, sessionId: session.id, project: session.cwd ?? '' }
            });
            ctx.layout.openRightbar(true, false);
            AIYOU_NAV_NOTICE.set({ message: '', activeId: featureId });
            return kind;
        }
        function AiyouWorkbenchPanel({ __ctx: ctx, sessionId }) {
            const [query, setQuery] = react.useState('');
            const [error, setError] = react.useState('');
            const visible = AIYOU_FEATURES.filter(row => row.placement !== 'header').filter(row => `${row.label} ${row.group}`.toLowerCase().includes(query.toLowerCase()));
            const button = { border: '1px solid var(--dsw-alias-border-l2)', borderRadius: '12px', background: 'var(--dsw-alias-bg-layer-1)', color: 'var(--dsw-alias-label-primary)', padding: '14px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', font: 'inherit' };
            return react.createElement('section', { 'data-aiyou-workbench': true, style: { padding: '20px', height: '100%', boxSizing: 'border-box', overflow: 'auto', color: 'var(--dsw-alias-label-primary)', fontSize: '13px' } },
                react.createElement('h2', { style: { fontSize: '20px', margin: '0 0 6px' } }, 'AIYOUDSH 设置'),
                react.createElement('p', { style: { color: 'var(--dsw-alias-label-secondary)', margin: '0 0 20px' } }, '配置主题外观、输出偏好与常用工具。'),
                react.createElement('input', { type: 'search', 'aria-label': '搜索工作台工具', placeholder: '搜索工具', value: query, onChange: event => setQuery(event.target.value), style: { ...button, width: '100%', boxSizing: 'border-box', padding: '10px 12px' } }),
                react.createElement('button', { type: 'button', style: { ...button, width: '100%', marginTop: '14px' }, onClick: () => { try { openAiyouFeature(ctx, 'aiyou-theme', { sessionId }); setError(''); } catch (failure) { setError(failure.message); } } }, react.createElement(AiyouShortcutIcon, { id: 'aiyou-theme', size: 22 }), '主题配置 · 背景与动态'),
                error && react.createElement('p', { role: 'alert' }, error),
                ...[...new Set(visible.map(row => row.group))].map(group => react.createElement('section', { key: group, style: { marginTop: '22px' } },
                    react.createElement('h3', { style: { fontSize: '12px', fontWeight: 600, color: 'var(--dsw-alias-label-secondary)' } }, group),
                    react.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '10px' } }, ...visible.filter(row => row.group === group).map(feature => react.createElement('button', {
                        key: feature.id, type: 'button', style: button,
                        onClick: () => { try { openAiyouFeature(ctx, feature.id); setError(''); } catch (failure) { setError(failure.message); } }
                    }, react.createElement(AiyouShortcutIcon, { id: feature.id, size: 22 }), feature.label))))),
                visible.length === 0 && react.createElement('p', { role: 'status' }, '没有匹配的工具'));
        }
        function installAiyouWorkbench(ctx) {
            installAiyouShortcutStyles(ctx);
            installAiyouBranding(ctx);
            installAiyouHeaderTools(ctx);
            ctx.slots.inject('sidebar.brand.name', () => ctx.slots.register({ name: 'sidebar.brand.name', priority: -100 }, () => react.createElement('span', { style: { fontSize: '16px', fontWeight: 650, letterSpacing: '-0.3px', color: 'var(--dsw-alias-label-primary)' } }, 'AIYOUDSH')));
            ctx.slots.inject('sidebar.panellist', function* () {
                for (const [index, feature] of [...AIYOU_FEATURES.filter(row => row.placement !== 'header'), { id: 'aiyou-workbench', label: '设置', glyph: '⚙' }].entries()) {
                    yield ctx.slots.register({ name: 'sidebar.panellist', id: feature.id, label: feature.label, order: -100 + index }, () => react.createElement(AiyouShortcutIcon, { id: feature.id }));
                }
            });
            ctx.effect(() => ctx.get('sidebarRightTabs').register({
                id: AIYOU_HUB_TYPE, kind: AIYOU_HUB_KIND, title: () => '设置',
                guide: [{ id: 'open', order: 1, title: () => '设置', description: () => '项目、资产、当前对话与外观设置' }]
            }), 'aiyou: workbench tab');
            ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({ name: 'sidebar.right.pane.tab', key: AIYOU_HUB_TYPE }, props => react.createElement(AiyouWorkbenchPanel, { ...props, __ctx: ctx })));
        }
