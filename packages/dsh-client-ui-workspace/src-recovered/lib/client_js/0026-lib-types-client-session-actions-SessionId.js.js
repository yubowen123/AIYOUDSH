		//#region lib/types/client/session-actions/SessionId.js
		/** Copy the row's Session ID without opening its history. */
		/**
		* Copy the complete ID after dismissing the row menu.
		* @param props - Row identity, menu dismissal, clipboard action, and locale.
		* @returns The final built-in menu item.
		*/
		function SessionIdMenuItem({ sessionId, useMenuOpenState, copySessionId, t }) {
			const [, setMenuOpen] = useMenuOpenState();
			return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.MenuItemButton, {
				icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutlineRegular, {}),
				onSelect: () => {
					setMenuOpen(false);
					copySessionId(sessionId);
				},
				children: t("menu.sessionId")
			});
		}
		//#endregion
