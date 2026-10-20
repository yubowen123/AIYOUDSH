		//#region \0dsh-css:upstream/packages/client/ui-chat/src/client/chat/AssistantMarkdown.module.css.mjs
		const css$8 = ".gKv1-q_root{font-size:var(--dsh-content-font-size,14px);line-height:calc(24px + var(--dsh-content-font-delta,0px));color:var(--dsw-alias-label-primary);flex-direction:column;display:flex}.gKv1-q_body{flex-direction:column;gap:16px;display:flex}.gKv1-q_body .md-table-wide{--dsh-table-spare:max(0px, calc((100cqw - var(--dsh-chat-content-width)) / 2));--dsh-table-lead:calc(var(--dsh-table-spare) + min(var(--dsh-chat-content-width), 100cqw) - 100%);box-sizing:border-box;width:calc(100% + var(--dsh-table-lead) + var(--dsh-table-spare));max-width:none;margin-left:calc(-1 * var(--dsh-table-lead));padding-left:var(--dsh-table-lead)}.gKv1-q_body .md-table-wide>table{z-index:1;position:relative}.gKv1-q_body>[data-turn-process-inline][hidden]{margin-bottom:-16px}.gKv1-q_stopped{border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-tertiary);align-self:flex-start;padding:0 6px;font-size:11px;line-height:18px}.gKv1-q_actions{margin-top:16px;margin-left:-6px}";
		const tagId$8 = "@deepseek-ai/dsh-client-ui-chat/AssistantMarkdown.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$8) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-chat";
			tag.dataset.pluginCss = tagId$8;
			tag.textContent = css$8;
			document.head.appendChild(tag);
		}
		var AssistantMarkdown_module_css_default = {
			"actions": "gKv1-q_actions",
			"body": "gKv1-q_body",
			"root": "gKv1-q_root",
			"stopped": "gKv1-q_stopped"
		};
		//#endregion
