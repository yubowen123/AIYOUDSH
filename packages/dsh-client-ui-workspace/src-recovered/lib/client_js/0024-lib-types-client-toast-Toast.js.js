		//#region lib/types/client/toast/Toast.js
		/** One presentation Factory and the adapters for keyed Workspace notices. */
		/**
		* Render one notice using the shared Factory.
		* @param props - Keyed payload, injected display mapping, locale, and Factory renderer.
		* @returns The shared Toast occurrence.
		*/
		function ToastEntry(props) {
			const { dismissToast, display, t, renderFactorySlot, seq } = props;
			return renderFactorySlot("workspace.toast.content", {
				...display(props, t, dismissToast),
				seq,
				onDone: dismissToast
			});
		}
		/**
		* Keep the archive filter action reactive without subscribing unrelated notices.
		* @param props - Archive notice, display mapping, and the existing viewing store.
		* @returns The shared Toast occurrence with its current actions.
		*/
		function ArchiveToastEntry(props) {
			const { dismissToast, display, filterAction, useStore, t, renderFactorySlot, seq } = props;
			const archivedVisible = useStore((state) => (state.archivedFilter ?? "default") !== "default");
			const fields = display(props, t, dismissToast);
			return renderFactorySlot("workspace.toast.content", {
				...fields,
				actions: [...fields.actions ?? [], ...archivedVisible ? [] : [filterAction(t, dismissToast)]],
				seq,
				onDone: dismissToast
			});
		}
		/**
		* Present plain display data with the shared primitive's timing and portal.
		* @param props - Localized display fields, display identity, and dismissal.
		* @returns One Toast, remounted only for a new display identity.
		*/
		function WorkspaceToast({ seq, text, tone, holdMs, actions, onDone }) {
			return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Toast, {
				text,
				onDone,
				...tone === "success" ? { tone: "success" } : {},
				...tone === "warning" ? { icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconWarningOutlineRegular, {}) } : {},
				...holdMs === void 0 ? {} : { holdMs },
				...actions === void 0 ? {} : { actions }
			}, seq);
		}
		//#endregion
