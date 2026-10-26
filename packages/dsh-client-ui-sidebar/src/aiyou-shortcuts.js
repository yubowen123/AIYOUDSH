        // Artwork from AIYOUcodex (MIT); independent icon-rail layout follows the supplied screenshot.
        // Keep callbacks native: these controls never submit a message or simulate clicks.
        const AIYOU_SHORTCUT_ICONS = {
    canvas: '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h6a3 3 0 0 1 3 3v6M6 9v6a3 3 0 0 0 3 3h6"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/>',
    sites: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>',
    plugins: '<path d="m8 3 1 5m6-5 1 5M6 9h12v3a6 6 0 0 1-12 0V9Zm6 9v4"/>',
    scheduled: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-12 5 2 2 4-4"/>',
    pullRequest: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v10m12 0v-7a4 4 0 0 0-4-4h-2m3-3-3 3 3 3"/>',
    agent: '<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M2 12v4m20-4v4M9 16h6"/><circle cx="9" cy="12" r=".65" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r=".65" fill="currentColor" stroke="none"/>',
    link: '<path d="M10.2 13.8 13.8 10.2M8.1 15.9l-1.4 1.4a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0M15.9 8.1l1.4-1.4a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0"/>',
    book: '<path d="M4 4.5h5.5A2.5 2.5 0 0 1 12 7v13a3 3 0 0 0-3-3H4zM20 4.5h-5.5A2.5 2.5 0 0 0 12 7v13a3 3 0 0 1 3-3h5z"/>',
    sparkle: '<path d="m12 2 1.5 5.2L19 9l-5.5 1.8L12 16l-1.5-5.2L5 9l5.5-1.8zM5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8z"/>',
    play: '<rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    code: '<path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>',
    skills: '<path d="M9 4H5a1 1 0 0 0-1 1v4h2a2 2 0 0 1 0 4H4v6a1 1 0 0 0 1 1h4v-2a2 2 0 0 1 4 0v2h6a1 1 0 0 0 1-1v-6h-2a2 2 0 0 1 0-4h2V5a1 1 0 0 0-1-1h-6V3a2 2 0 0 0-4 0v1Z"/>',
    assets: '<path d="M20 10V7a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"/><path d="m17 12 4 2.5v5L17 22l-4-2.5v-5L17 12Zm-4 2.5 4 2.5 4-2.5M17 17v5"/>',
    arena: '<path d="M8 3h8v5a4 4 0 0 1-8 0V3ZM8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 12v6m-4 3h8M9 18h6v3H9z"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8.2 8.2 12 12M8.2 15.8 20 4M12 12h.01"/>',
    newChat: '<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v9a2.5 2.5 0 0 1-2.5 2.5H9l-4 4V5.5Z"/><path d="M9 10h6m-3-3v6"/>',
    project: '<rect x="3.5" y="4" width="17" height="16" rx="2.5"/><path d="M9 4v16m5.5-12h2.5m-2.5 4h2.5m-2.5 4h2.5"/>',
            settings: "<path d=\"M19.13 9.68 L19.39 10.70 L21.31 10.69 L21.31 13.31 L19.39 13.30 L19.13 14.32 L18.68 15.40 L18.14 16.30 L19.51 17.66 L17.66 19.51 L16.30 18.14 L15.40 18.68 L14.32 19.13 L13.30 19.39 L13.31 21.31 L10.69 21.31 L10.70 19.39 L9.68 19.13 L8.60 18.68 L7.70 18.14 L6.34 19.51 L4.49 17.66 L5.86 16.30 L5.32 15.40 L4.87 14.32 L4.61 13.30 L2.69 13.31 L2.69 10.69 L4.61 10.70 L4.87 9.68 L5.32 8.60 L5.86 7.70 L4.49 6.34 L6.34 4.49 L7.70 5.86 L8.60 5.32 L9.68 4.87 L10.70 4.61 L10.69 2.69 L13.31 2.69 L13.30 4.61 L14.32 4.87 L15.40 5.32 L16.30 5.86 L17.66 4.49 L19.51 6.34 L18.14 7.70 L18.68 8.60Z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>"
        };
        const AIYOU_SHORTCUT_ICON_IDS = {
            'aiyou-canvas': 'canvas', 'aiyou-media-tools': 'scissors', 'aiyou-media-models': 'plugins',
            'aiyou-agents': 'agent', 'aiyou-skills': 'skills', 'aiyou-assets': 'assets',
            'aiyou-arena': 'arena', 'aiyou-projects': 'project', 'aiyou-workbench': 'settings',
            'aiyou-context': 'book', 'aiyou-efficiency': 'sparkle', 'aiyou-usage': 'chart',
            'aiyou-folders': 'assets', 'aiyou-transcript': 'book',
            'aiyou-theme': 'sparkle', 'aiyou-reset': 'scheduled', 'new': 'newChat', 'home': 'home'
        };
        function AiyouShortcutIcon({ id, size = 18 }) {
            if (id === 'aiyou-moke') return react.createElement('img', { src: AIYOU_MOKE_LOGO, width: 24, height: 24, alt: '', 'aria-hidden': true, draggable: false, style: { objectFit: 'contain' } });
            return react.createElement('svg', {
                width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
                stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
                'aria-hidden': true, dangerouslySetInnerHTML: { __html: AIYOU_SHORTCUT_ICONS[AIYOU_SHORTCUT_ICON_IDS[id] || 'link'] }
            });
        }
        const AIYOU_SHORTCUT_CSS = `
            [data-aiyou-sidebar].aiyou-sidebar-shell {display:flex;flex-direction:row;padding:0;min-width:0;overflow:hidden;--dsh-sidebar-inline-padding:10px;}
            .aiyou-navigation-rail {width:48px;flex:0 0 48px;min-height:0;display:flex;flex-direction:column;align-items:center;background:var(--dsw-alias-bg-layer-1);border-right:1px solid var(--dsw-alias-border-l2);box-sizing:border-box;color:var(--dsw-alias-label-secondary);}
            .aiyou-rail-caption {height:44px;flex:0 0 44px;width:100%;}
            .aiyou-rail-item {box-sizing:border-box;display:flex;position:relative;align-items:center;justify-content:center;flex:none;width:32px;height:32px;margin:1px 0;border:1px solid transparent;border-radius:8px;padding:0;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;-webkit-app-region:no-drag;}
            .aiyou-rail-item:hover {background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);}
            .aiyou-rail-item[aria-current=page],.aiyou-rail-home[aria-expanded=true] {border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);box-shadow:0 1px 3px #0002;}
            .aiyou-rail-item:focus-visible,.aiyou-session-tool:focus-visible {outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px;}
            .aiyou-rail-item img {width:24px;height:24px;flex:none;object-fit:contain;}
            .aiyou-rail-item svg {width:18px;height:18px;flex:none;}
            .aiyou-rail-menu {display:flex;flex:1;flex-direction:column;align-items:center;width:100%;min-height:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;padding:2px 0 6px;}
            .aiyou-rail-menu::-webkit-scrollbar {display:none;}
            .aiyou-rail-divider {flex:none;height:1px;width:24px;margin:6px 0;background:var(--dsw-alias-border-l2);}
            .aiyou-navigation-footer {flex:none;display:flex;flex-direction:column;align-items:center;width:100%;padding:6px 0;}
            .aiyou-session-pane {min-width:0;min-height:0;flex:1;display:flex;flex-direction:column;padding:0 10px 6px;box-sizing:border-box;background:var(--dsw-specific-sidebar-fill);}
            .aiyou-session-heading {display:flex;flex:none;align-items:center;gap:4px;height:58px;padding-top:10px;box-sizing:border-box;}
            .aiyou-session-product {min-width:0;flex:1;font-size:14px;font-weight:600;letter-spacing:-.2px;color:var(--dsw-alias-label-primary);}
            .aiyou-session-tool {display:flex;flex:none;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;-webkit-app-region:no-drag;}
            .aiyou-session-heading ._3WPZCG_toggle {flex:none;position:static;}
            .aiyou-session-heading button {-webkit-app-region:no-drag;}
            .aiyou-session-pane ._3WPZCG_regionArea {min-width:0;margin-left:-4px;margin-right:-10px;padding-left:4px;}
            .aiyou-sidebar-rail-only .aiyou-navigation-rail {width:100%;flex-basis:100%;}
            .aiyou-navigation-notice {margin:4px 0;font-size:12px;color:var(--dsw-alias-label-secondary);}
            .aiyou-header-tools {display:inline-flex;align-items:center;gap:4px;flex:none;-webkit-app-region:no-drag;}
            .aiyou-header-tool {display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;flex:none;padding:0;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;-webkit-app-region:no-drag;}
            .aiyou-header-tool:hover {color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover);}
            .aiyou-header-tool:focus-visible {outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px;}
            @media(prefers-reduced-motion:reduce){.aiyou-navigation-rail *{transition:none;animation:none}}
        `;
        function installAiyouShortcutStyles(ctx) {
            ctx.effect(() => {
                const element = document.createElement('style');
                element.setAttribute('data-plugin-css', '@local/aiyou-native-sidebar/shortcuts');
                element.textContent = AIYOU_SHORTCUT_CSS;
                document.head.appendChild(element);
                return () => element.remove();
            }, 'aiyou: shortcut geometry');
        }
        function AiyouShortcutNavigation({ panels, startSession, ...props }) {
            const h = react.createElement;
            const native = panels.filter(row => !row.id.startsWith('aiyou-'));
            const tools = panels.filter(row => row.id.startsWith('aiyou-') && row.id !== 'aiyou-workbench');
            const settings = panels.filter(row => row.id === 'aiyou-workbench');
            const row = ({id,label}) => h(PanelRow,{...props,key:id,id,label,rail:true,wide:false});
            return h('nav', { className:'aiyou-rail-menu', 'aria-label':'功能菜单', 'data-aiyou-shortcut-layout':'rail' },
                h('button', { type:'button',className:'aiyou-rail-item',title:'新对话','aria-label':'新建会话',onClick:() => startSession() }, h(AiyouShortcutIcon,{id:'new'})),
                ...native.map(row),
                h('span',{className:'aiyou-rail-divider','aria-hidden':true}),
                ...tools.map(row),
                h('span',{className:'aiyou-rail-divider','aria-hidden':true}),
                ...settings.map(row));
        }
