        // A fixed destination in the official Browser provider. No site proxy,
        // injected page script, credentials, or second webview implementation.
        const AIYOU_MOKE_URL = 'https://www.mokeaigc.ai/';
        const AIYOU_MOKE_TABS = new WeakMap();
        const AIYOU_MOKE_STORAGE_KEY = 'aiyou.moke-browser-tabs.v1';
        const AIYOU_MOKE_MAX_TABS = 64;
        function readAiyouMokeTabs() {
            const owned = new Map();
            try {
                const saved = JSON.parse(window.localStorage.getItem(AIYOU_MOKE_STORAGE_KEY));
                if (saved?.version !== 1 || !Array.isArray(saved.tabs)) return owned;
                for (const pair of saved.tabs.slice(-AIYOU_MOKE_MAX_TABS)) {
                    if (!Array.isArray(pair) || pair.length !== 2 || !pair.every(value => typeof value === 'string' && value.length > 0 && value.length <= 512)) continue;
                    owned.set(pair[0], pair[1]);
                }
            } catch { /* Unavailable or malformed storage falls back to this window. */ }
            return owned;
        }
        function saveAiyouMokeTabs(owned) {
            while (owned.size > AIYOU_MOKE_MAX_TABS) owned.delete(owned.keys().next().value);
            try {
                // Only bounded navigation ownership metadata: no destination URL,
                // site content, authentication state, or native Browser internals.
                window.localStorage.setItem(AIYOU_MOKE_STORAGE_KEY, JSON.stringify({version: 1, tabs: [...owned]}));
            } catch { /* Private/storage-disabled profiles retain WeakMap behavior. */ }
        }

        /** Open the MOKE-owned Browser tab in this conversation, or reveal it.
         * The inventory remains authoritative: closing a tab or changing sessions
         * invalidates our remembered ID. Reusing the tab preserves its live MOKE
         * navigation and forms; the menu does not reload it on every click.
         *
         * Browser is the official Desktop isolation provider. Its address bar,
         * Back/Forward/Reload, loading errors and external-open button are kept.
         */
        function openAiyouMoke(ctx, session, { toggle = false } = {}) {
            if (!session || typeof session.id !== 'string' || !session.id)
                throw new Error('请先打开或新建一个对话，再打开 MOKE。');
            const sidebar = ctx.get('sidebarRight');
            const types = ctx.get('sidebarRightTabs');
            if (typeof sidebar?.openTab !== 'function' || typeof sidebar?.openTabs?.getSnapshot !== 'function' || !types?.get?.('browser'))
                throw new Error('应用内浏览器尚未启用，请启用官方 Browser 插件，或在系统浏览器打开 https://www.mokeaigc.ai/。');

            let owned = AIYOU_MOKE_TABS.get(sidebar);
            if (!owned) AIYOU_MOKE_TABS.set(sidebar, owned = readAiyouMokeTabs());
            const inventory = sidebar.openTabs.getSnapshot();
            // Prune closed records, including records in conversations no longer
            // adopted. Never focus a matching ID belonging to a different session.
            for (const [sessionId, tabId] of owned)
                if (!inventory.some(row => row.sessionId === sessionId && row.tabId === tabId && row.kind === 'browser')) owned.delete(sessionId);
            const existing = owned.get(session.id);
            if (existing) { owned.delete(session.id); owned.set(session.id, existing); }
            saveAiyouMokeTabs(owned);
            if (existing && toggle && sidebar.active?.()?.id === existing && sidebar.isExpanded?.()) {
                sidebar.toggleExpanded();
                return 'browser';
            }

            // A global panel must give way to the real conversation before asking
            // its Session-scoped Browser service to navigate.
            ctx.layout.selectPanel(null);
            if (existing) {
                sidebar.focus(existing);
                if (!sidebar.isExpanded()) sidebar.toggleExpanded();
                return 'browser';
            }
            const before = new Set(inventory.filter(row => row.sessionId === session.id).map(row => row.tabId));
            sidebar.openTab('browser', {
                params: { url: AIYOU_MOKE_URL },
                revealIfOpened: false,
            });
            // Native openContent commits synchronously and publishes openTabs.
            const opened = sidebar.openTabs.getSnapshot().find(row => row.sessionId === session.id && row.kind === 'browser' && !before.has(row.tabId));
            if (opened) { owned.set(session.id, opened.tabId); saveAiyouMokeTabs(owned); }
            return 'browser';
        }

        /** Explicit fallback only; the primary menu action stays inside the app.
         * The official Desktop setWindowOpenHandler sends this fixed HTTPS URL
         * to shell.openExternal. Browser web builds retain the normal link action.
         */
        function openAiyouMokeExternal() {
            window.open(AIYOU_MOKE_URL, '_blank', 'noopener,noreferrer');
        }
