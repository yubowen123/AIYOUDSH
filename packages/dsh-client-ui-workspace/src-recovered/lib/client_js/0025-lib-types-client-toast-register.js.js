		//#region lib/types/client/toast/register.js
		/** Register notice presentations with their business-owned display fields and actions.
		* @param ctx - Workspace plugin context.
		* @param viewStore - Viewing store, read only by archive notices.
		* @param actions - Archive and source-opening callbacks.
		*/
		function registerToasts(ctx, viewStore, actions) {
			const archiveFilterAction = (t, dismiss) => ({
				prefix: t("toast.archivedOr"),
				label: t("toast.archivedFilter"),
				onClick: () => {
					dismiss();
					actions.showArchived();
				}
			});
			ctx.slots.registerFactory({
				name: "workspace.toast.content",
				scope: "root"
			}, WorkspaceToast);
			ctx.slots.inject("workspace.toast", function* () {
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "sessionIdCopied",
					locale: "workspace",
					inject: () => ({ display: (_notice, t) => ({
						text: t("toast.sessionIdCopied"),
						tone: "success"
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "sessionIdCopyFailed",
					locale: "workspace",
					inject: () => ({ display: (_notice, t) => ({
						text: t("toast.sessionIdCopyFailed"),
						tone: "warning"
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "pinFailed",
					locale: "workspace",
					inject: () => ({ display: (_notice, t) => ({
						text: t("toast.pinFailed"),
						tone: "warning"
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "unpinFailed",
					locale: "workspace",
					inject: () => ({ display: (_notice, t) => ({
						text: t("toast.unpinFailed"),
						tone: "warning"
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "archivedNotOpenable",
					locale: "workspace",
					inject: () => ({ display: (_notice, t) => ({
						text: t("toast.archivedNotOpenable"),
						tone: "warning"
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "defaultWorkspaceFailed",
					locale: "workspace",
					inject: () => ({ display: (_notice, t) => ({
						text: t("defaultWorkspace.failed"),
						tone: "warning"
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "shortcutForkFailed",
					locale: "workspace",
					inject: () => ({ display: (notice, t) => ({
						text: t(notice.reason === "unavailable" ? "shortcut.noCompletedTurn" : "shortcut.forkFailed"),
						tone: "plain"
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "createFailed",
					locale: "workspace",
					inject: () => ({ display: (notice, t) => ({
						text: t("toast.createFailed", { message: notice.message }),
						tone: "warning",
						holdMs: 6e3
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "forkRequiresOpen",
					locale: "workspace",
					inject: () => ({ display: (notice, t, dismiss) => ({
						text: t("toast.forkRequiresOpen"),
						tone: "warning",
						holdMs: 6e3,
						actions: [{
							label: t("toast.openForkSource"),
							onClick: () => {
								dismiss();
								actions.openForkSource(notice.sessionId);
							}
						}]
					}) })
				}, ToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "archived",
					locale: "workspace",
					store: viewStore,
					inject: () => ({
						display: (notice, t, dismiss) => ({
							text: t("toast.archived"),
							tone: "success",
							holdMs: 6e3,
							actions: [{
								label: t("toast.archivedUndo"),
								onClick: () => {
									dismiss();
									actions.undoArchive(notice.sessionId);
								}
							}]
						}),
						filterAction: archiveFilterAction
					})
				}, ArchiveToastEntry);
				yield ctx.slots.register({
					name: "workspace.toast",
					key: "stoppedAndArchived",
					locale: "workspace",
					store: viewStore,
					inject: () => ({
						display: (notice, t, dismiss) => ({
							text: t("toast.stoppedAndArchived"),
							tone: "success",
							holdMs: 6e3,
							actions: [{
								label: t("toast.archivedUndo"),
								onClick: () => {
									dismiss();
									actions.undoArchive(notice.sessionId);
								}
							}]
						}),
						filterAction: archiveFilterAction
					})
				}, ArchiveToastEntry);
			});
		}
		//#endregion
