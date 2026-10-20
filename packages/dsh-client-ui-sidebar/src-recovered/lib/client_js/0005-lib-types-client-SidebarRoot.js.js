		//#region lib/types/client/SidebarRoot.js
		/**
		* Sidebar shell: column geometry and global panel navigation.
		* Collapse is a slide plus crossfade:
		* content freezes at its expanded width (inline style) and fades out in place
		* while the sliding column (AppFrame grid tracks) clips it — nothing reflows
		* mid-slide. At settle the wide-only content unmounts and the upper
		* controls enter the 56px rail from the same horizontal offset (one icon each,
		* same top-down order) on one fade that ends with the slide. The bottom-pinned
		* settings control only fades. The workspace/session browsing region between
		* global panel rows and the foot is the `sidebar.workspaces` registrant's,
		* and the foot holds `sidebar.settings` plus `sidebar.footer.action`; the shell
		* hands them the wide flag (plus an expand request callback for the browser).
		*
		* The column also owns whether the scroll regions nested in it draw a
		* scrollbar at all: the shell tracks the pointer and rebinds ui-theme's
		* scrollbar indirection away while it is elsewhere, so a list the user is not
		* pointing at carries no bar.
		*/
		/** Wide-content unmount delay; matches the 150ms wide-content fade-out. */
		const COLLAPSE_SETTLE_MS = 150;
		/**
		* How long the column's scrollbars stay drawn after the pointer leaves it.
		* The bar is a pointer affordance here, and hiding it on the leave event
		* itself makes it blink out while the pointer is only crossing the column's
		* edge — on the way to the conversation, or around a portalled menu.
		*/
		const SCROLLBAR_LINGER_MS = 2e3;
		/** Format complete-build metadata for the local brand badge. */
		function localBuildVersion() {
			return `0.2.1-rc.2-332895e` + ({}.DSH_CLIENT_GIT_DIRTY === "true" ? "-dirty" : "");
		}
		/** Each panel row subscribes only to its own selection state. */
		function PanelRow({ id, label, wide, rail, usePanelInfo, selectPanel, renderSlot, aiyouSelected }) {
			const mainActive = usePanelInfo((info) => info.activePanelId === id);
            const active = id.startsWith("aiyou-") ? aiyouSelected === id : mainActive;
			return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label,
				delayMs: 500,
				disabled: wide,
				children: (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: rail ? "aiyou-rail-item" : wide ? "aiyou-shortcut-card" : clsx(SidebarRoot_module_css_default.panelRow, active && SidebarRoot_module_css_default.panelActive),
                        title: label,
                        "data-aiyou-nav-id": id,
					"aria-label": label,
					"aria-current": active ? "page" : void 0,
					onClick: () => {
						selectPanel(id);
					},
					children: [(0, react_jsx_runtime.jsx)("span", {
						className: wide ? "aiyou-shortcut-icon" : SidebarRoot_module_css_default.panelGlyph,
						"aria-hidden": "true",
						children: renderSlot("sidebar.panellist", {
							size: wide ? 16 : 18,
							active
						}, { only: id })
					}), wide && (0, react_jsx_runtime.jsx)("span", {
						className: "aiyou-shortcut-label",
						children: label
					})]
				})
			});
		}
		/**
		* Render the sidebar column shell.
		* @param props - composed slot props (runtime share + injected callbacks, contract/slots.ts).
		* @returns the sidebar element tree.
		*/
		function SidebarRoot({ collapsed, width, startSession, toggleSidebar, selectPanel, useAiyouNavigationNotice, usePanels, useShortcuts, usePanelInfo, t, renderSlot }) {
			const panels = usePanels((snapshot) => snapshot);
            const aiyouNotice = useAiyouNavigationNotice(snapshot => snapshot);
			const shortcut = useShortcuts((rows) => rows.find((row) => row.id === "sidebar.left.toggle"));
			const newShortcut = useShortcuts((rows) => rows.find((row) => row.id === "session.new"));
			const toggleLabel = collapsed ? t("toggle.open") : t("toggle.collapse");
			const [settled, setSettled] = (0, react.useState)(collapsed);
			(0, react.useEffect)(() => {
				if (!collapsed) {
					setSettled(false);
					return;
				}
				const timer = window.setTimeout(() => {
					setSettled(true);
				}, COLLAPSE_SETTLE_MS);
				return () => {
					window.clearTimeout(timer);
				};
			}, [collapsed]);
			const windowsTitlebar = document.documentElement.hasAttribute("data-windows-titlebar");
			const wide = windowsTitlebar ? !collapsed : !collapsed || !settled;
			const captionTooltipSide = windowsTitlebar ? "bottom" : "right";
			const lastWideWidth = (0, react.useRef)(width);
			if (!collapsed) lastWideWidth.current = width;
			const everWide = (0, react.useRef)(!collapsed);
			if (!collapsed) everWide.current = true;
			const column = (0, react.useRef)(null);
			const [pointerInside, setPointerInside] = (0, react.useState)(false);
			const lingerTimer = (0, react.useRef)(void 0);
			const armLinger = () => {
				if (lingerTimer.current !== void 0) return;
				lingerTimer.current = window.setTimeout(() => {
					lingerTimer.current = void 0;
					setPointerInside(false);
				}, SCROLLBAR_LINGER_MS);
			};
			const cancelLinger = () => {
				window.clearTimeout(lingerTimer.current);
				lingerTimer.current = void 0;
			};
			(0, react.useEffect)(() => {
				if (!pointerInside) return;
				const onMove = (event) => {
					const rect = column.current?.getBoundingClientRect();
					/* v8 ignore next -- the listener only exists while the column is mounted and revealed. */
					if (rect === void 0) return;
					if (event.clientX >= rect.left && event.clientX < rect.right && event.clientY >= rect.top && event.clientY < rect.bottom) cancelLinger();
					else armLinger();
				};
				document.addEventListener("pointermove", onMove);
				return () => {
					document.removeEventListener("pointermove", onMove);
					cancelLinger();
				};
			}, [pointerInside]);
			const buildVersion = localBuildVersion();
			const darwinDesktop = (0, _deepseek_ai_dsh_client_ui_primitives.isDarwinDesktop)();
			const toggle = (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label: toggleLabel,
				shortcutKeys: shortcut?.keys,
				delayMs: 500,
				side: captionTooltipSide,
				children: (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: clsx(SidebarRoot_module_css_default.iconButton, SidebarRoot_module_css_default.toggle),
					"aria-label": toggleLabel,
					"aria-keyshortcuts": shortcut?.aria,
					onClick: () => {
						toggleSidebar();
					},
					children: [
						!wide && !windowsTitlebar && (0, react_jsx_runtime.jsx)("span", {
							className: SidebarRoot_module_css_default.railMark,
							"aria-hidden": "true",
							children: renderSlot("sidebar.brand.mark", { size: 24 }, { fallback: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.FishLogo, { size: 24 }) })
						}),
						(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPanelLeftOutlineRegular, {
							className: SidebarRoot_module_css_default.panelIcon,
							size: wide || windowsTitlebar ? 16 : 18
						}),
						!wide && renderSlot("sidebar.toggle.badge", {})
					]
				})
			});
            const h = react.createElement;
            return h('div', {
                ref: column, 'data-aiyou-sidebar': true, 'data-aiyou-navigation': 'rail',
                className: clsx(SidebarRoot_module_css_default.root, 'aiyou-sidebar-shell', !wide && 'aiyou-sidebar-rail-only', !pointerInside && SidebarRoot_module_css_default.quietBars),
                style: wide ? { width: collapsed ? lastWideWidth.current : width } : undefined,
                onPointerEnter: () => { cancelLinger(); setPointerInside(true); },
                onPointerLeave: armLinger,
            },
                h('aside', { className: 'aiyou-navigation-rail', 'aria-label': '应用菜单' },
                    h('div', { className: 'aiyou-rail-caption', 'data-window-drag': true }),
                    h('button', { type: 'button', className: 'aiyou-rail-item aiyou-rail-home',
                        title: collapsed ? '展开会话列表' : '收起会话列表',
                        'aria-label': collapsed ? '展开会话列表' : '收起会话列表',
                        'aria-expanded': !collapsed, onClick: toggleSidebar,
                    }, h(AiyouShortcutIcon, { id: 'home' })),
                    h(AiyouShortcutNavigation, { panels, startSession,
                        aiyouSelected: aiyouNotice.activeId, usePanelInfo, selectPanel, renderSlot }),
                    h('div', { className: 'aiyou-navigation-footer' }, renderSlot('sidebar.settings', { wide: false }))),
                wide && h('section', { className: 'aiyou-session-pane', 'aria-label': '会话列表' },
                    h('header', { className: 'aiyou-session-heading', 'data-window-drag': true },
                        h('span', { className: 'aiyou-session-product' }, 'AIYOUDSH'),
                        h('button', { type: 'button', className: 'aiyou-session-tool', title: '设置',
                            'aria-label': '设置', onClick: () => selectPanel('aiyou-workbench') },
                            h(AiyouShortcutIcon, { id: 'aiyou-workbench', size: 16 })),
                        toggle),
                    aiyouNotice.message && h('p', { role: 'alert', className: 'aiyou-navigation-notice' }, aiyouNotice.message),
                    h('div', { className: SidebarRoot_module_css_default.regionArea },
                        renderSlot('sidebar.workspaces', { wide: true, expandSidebar: () => { if (collapsed) toggleSidebar(); } })),
                    h('div', { className: SidebarRoot_module_css_default.footerActions }, renderSlot('sidebar.footer.action', { wide: true }))))
        }
        //#endregion
