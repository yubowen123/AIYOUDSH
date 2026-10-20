        /** Utilities mount in the native Session header's right-side list slot. */
        function AiyouConversationHeaderTools({ sessionId, openFeature, retireRemovedTabs }) {
            react.useEffect(() => { retireRemovedTabs?.(sessionId); }, [sessionId, retireRemovedTabs]);
            return react.createElement('div', { className: 'aiyou-header-tools', 'aria-label': '对话工具' },
                ...AIYOU_FEATURES.filter(row => row.placement === 'header').map(feature =>
                    react.createElement('button', { key: feature.id, type: 'button', className: 'aiyou-header-tool',
                        'aria-label': feature.label, title: feature.label, disabled: !sessionId,
                        'data-aiyou-header-action': feature.id,
                        onClick: () => openFeature(feature.id, sessionId),
                    }, react.createElement(AiyouShortcutIcon, { id: feature.id }))));
        }
        function installAiyouHeaderTools(ctx) {
            ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
                name: 'conversation.session.header.utilities', id: 'aiyou-conversation-tools', order: 10,
                inject: () => ({ retireRemovedTabs: sessionId => retireRemovedAiyouTabs(ctx, sessionId), openFeature: (id, sessionId) => {
                    try { openAiyouFeature(ctx, id, { sessionId }, { toggle: true }); }
                    catch (error) { AIYOU_NAV_NOTICE.set({ message: error.message, activeId: null }); }
                } }),
            }, AiyouConversationHeaderTools));
        }

        /** Remove only the retired diagnostic page from the on-screen Session.
         * The official controller persists the tab close; no conversation is edited. */
        function retireRemovedAiyouTabs(ctx, sessionId) {
            if (!sessionId || currentAiyouSession(ctx)?.id !== sessionId) return;
            const sidebar = ctx.get('sidebarRight');
            for (const tab of sidebar.openTabs?.getSnapshot?.() ?? [])
                if (tab.sessionId === sessionId && tab.kind === 'aiyoucodex-claude-code') sidebar.close(tab.tabId);
        }
