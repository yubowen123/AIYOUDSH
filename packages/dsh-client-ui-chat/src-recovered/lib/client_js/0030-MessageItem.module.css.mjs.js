		//#region \0dsh-css:upstream/packages/client/ui-chat/src/client/chat/MessageItem.module.css.mjs
		const css$14 = ".IzP3Va_userRow{flex-direction:column;align-items:flex-end;gap:6px;display:flex}.IzP3Va_userStack{min-width:0;max-width:min(calc(var(--dsh-chat-content-width,748px) * .702), 82%);flex-direction:column;align-items:flex-end;gap:8px;display:flex}.IzP3Va_bubble{background:var(--dsw-specific-bubble);border-radius:var(--dsw-radius-xl);max-width:100%;font-size:var(--dsh-content-font-size,14px);line-height:calc(22px + var(--dsh-content-font-delta,0px));color:var(--dsw-alias-label-primary);white-space:pre-wrap;word-break:break-word;padding:10px 16px}.IzP3Va_referenceSummary{color:var(--dsw-alias-label-tertiary);font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(18px + var(--dsh-content-font-delta-secondary,0px))}.IzP3Va_contextRow{padding:2px 0}.IzP3Va_compactionRow{--dsh-compaction-header-height:calc(24px + var(--dsh-content-font-delta,0px));padding:2px 0}.IzP3Va_compactionButton{width:100%;height:var(--dsh-compaction-header-height);border-radius:var(--dsw-radius-sm);min-width:0;color:var(--dsw-alias-label-tertiary);font:inherit;text-align:left;background:0 0;border:none;align-items:center;padding:0;transition:color .1s;display:flex}.IzP3Va_compactionRow:has(.IzP3Va_compactionBody) .IzP3Va_compactionButton{z-index:7;background:var(--dsw-alias-bg-base);border-radius:0;position:sticky;top:0}.IzP3Va_compactionBody :has(>[data-code-block-banner]){top:var(--dsh-compaction-header-height)}.IzP3Va_compactionRow:has(.IzP3Va_compactionBody) .IzP3Va_compactionButton:hover{background:var(--dsw-alias-interactive-bg-hover-solid)}.IzP3Va_compactionButton:not(:disabled){cursor:pointer}.IzP3Va_compactionButton:hover{color:var(--dsw-alias-label-secondary)}.IzP3Va_compactionButton:not(:disabled):hover{background:var(--dsw-alias-interactive-bg-hover)}.IzP3Va_compactionLeading{width:calc(16px + var(--dsh-content-font-delta,0px));height:calc(16px + var(--dsh-content-font-delta,0px));color:inherit;flex:none;place-items:center;margin-right:6px;display:inline-grid}.IzP3Va_compactionLeading svg{width:calc(14px + var(--dsh-content-font-delta,0px));height:calc(14px + var(--dsh-content-font-delta,0px))}.IzP3Va_compactionContextIcon,.IzP3Va_compactionDisclosureIcon{grid-area:1/1;justify-content:center;align-items:center;display:inline-flex}.IzP3Va_compactionDisclosureIcon,.IzP3Va_compactionButton:not(:disabled):hover .IzP3Va_compactionContextIcon,.IzP3Va_compactionButton:not(:disabled):focus-visible .IzP3Va_compactionContextIcon{opacity:0}.IzP3Va_compactionButton:not(:disabled):hover .IzP3Va_compactionDisclosureIcon,.IzP3Va_compactionButton:not(:disabled):focus-visible .IzP3Va_compactionDisclosureIcon{opacity:1}.IzP3Va_compactionTitle{font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(24px + var(--dsh-content-font-delta,0px));color:inherit;flex:none}.IzP3Va_compactionSep{background:var(--dsw-alias-label-caption);border-radius:1px;flex:none;width:2px;height:2px;margin:0 8px}.IzP3Va_compactionSummary{min-width:0;color:inherit;font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(24px + var(--dsh-content-font-delta,0px));text-overflow:ellipsis;white-space:nowrap;flex:auto;overflow:hidden}.IzP3Va_compactionBody{padding:4px 0 4px calc(22px + var(--dsh-content-font-delta,0px));color:var(--dsw-alias-label-tertiary);font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(24px + var(--dsh-content-font-delta,0px))}.IzP3Va_retryRow{color:var(--dsw-alias-label-tertiary);font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(20px + var(--dsh-content-font-delta-secondary,0px))}.IzP3Va_retrySummary{border-radius:var(--dsw-radius-sm);width:fit-content;max-width:100%;color:inherit;cursor:pointer;user-select:none;align-items:center;gap:7px;padding:2px 0;list-style:none;display:inline-flex}.IzP3Va_retrySummary::-webkit-details-marker{display:none}.IzP3Va_retrySummary:after{content:\"\";border-bottom:1.5px solid;border-right:1.5px solid;flex:none;width:6px;height:6px;margin-right:2px;transition:transform .12s;transform:rotate(-45deg)}.IzP3Va_retrySummary:hover{color:var(--dsw-alias-label-secondary)}@media (prefers-reduced-motion:reduce){.IzP3Va_compactionButton{transition:none}}.IzP3Va_retrySummary:focus-visible{outline:1.5px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}.IzP3Va_retryText{overflow-wrap:anywhere;min-width:0}.IzP3Va_retryRow[open] .IzP3Va_retrySummary:after{transform:rotate(45deg)}.IzP3Va_retryDetails{overflow-wrap:anywhere;font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(18px + var(--dsh-content-font-delta-secondary,0px));gap:2px;margin-top:3px;padding-left:14px;display:grid}.IzP3Va_retryDetailLabel{color:var(--dsw-alias-label-secondary)}.IzP3Va_turnErrorRow{font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(20px + var(--dsh-content-font-delta-secondary,0px));grid-template-columns:10px minmax(0,1fr) auto;align-items:start;gap:8px;padding:2px 0;display:grid}.IzP3Va_turnErrorDot{margin-top:5px}.IzP3Va_turnErrorCopy{overflow-wrap:anywhere;min-width:0}.IzP3Va_turnErrorTitle{color:var(--dsw-alias-state-error-primary);margin-right:6px;font-weight:600}.IzP3Va_turnErrorMessage{color:var(--dsw-alias-label-secondary)}.IzP3Va_turnErrorCode{color:var(--dsw-alias-label-tertiary);font:var(--dsw-font-markdown-code-block-small)}.IzP3Va_maxTokensTitle{color:var(--dsw-alias-state-warn-primary);margin-right:6px;font-weight:600}.IzP3Va_attachmentRow{flex-wrap:wrap;justify-content:flex-end;gap:8px;max-width:100%;display:flex}.IzP3Va_fileCard{border:.5px solid var(--dsw-alias-border-l2,#0000001f);border-radius:var(--dsw-radius-lg);background:var(--dsw-specific-input-major,transparent);box-sizing:border-box;flex:0 0 240px;align-items:center;gap:10px;width:240px;min-height:64px;padding:8px 12px;display:inline-flex}.IzP3Va_fileIcon{flex:none;width:28px;height:28px}.IzP3Va_fileContent{flex-direction:column;flex:1;min-width:0;display:flex}.IzP3Va_fileName{white-space:nowrap;text-overflow:ellipsis;color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:22px;overflow:hidden}.IzP3Va_fileMeta{white-space:nowrap;text-overflow:ellipsis;color:var(--dsw-alias-label-tertiary,#00000073);font-size:12px;line-height:15px;overflow:hidden}";
		const tagId$14 = "@deepseek-ai/dsh-client-ui-chat/MessageItem.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$14) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-chat";
			tag.dataset.pluginCss = tagId$14;
			tag.textContent = css$14;
			document.head.appendChild(tag);
		}
		var MessageItem_module_css_default = {
			"attachmentRow": "IzP3Va_attachmentRow",
			"bubble": "IzP3Va_bubble",
			"compactionBody": "IzP3Va_compactionBody",
			"compactionButton": "IzP3Va_compactionButton",
			"compactionContextIcon": "IzP3Va_compactionContextIcon",
			"compactionDisclosureIcon": "IzP3Va_compactionDisclosureIcon",
			"compactionLeading": "IzP3Va_compactionLeading",
			"compactionRow": "IzP3Va_compactionRow",
			"compactionSep": "IzP3Va_compactionSep",
			"compactionSummary": "IzP3Va_compactionSummary",
			"compactionTitle": "IzP3Va_compactionTitle",
			"contextRow": "IzP3Va_contextRow",
			"fileCard": "IzP3Va_fileCard",
			"fileContent": "IzP3Va_fileContent",
			"fileIcon": "IzP3Va_fileIcon",
			"fileMeta": "IzP3Va_fileMeta",
			"fileName": "IzP3Va_fileName",
			"maxTokensTitle": "IzP3Va_maxTokensTitle",
			"referenceSummary": "IzP3Va_referenceSummary",
			"retryDetailLabel": "IzP3Va_retryDetailLabel",
			"retryDetails": "IzP3Va_retryDetails",
			"retryRow": "IzP3Va_retryRow",
			"retrySummary": "IzP3Va_retrySummary",
			"retryText": "IzP3Va_retryText",
			"turnErrorCode": "IzP3Va_turnErrorCode",
			"turnErrorCopy": "IzP3Va_turnErrorCopy",
			"turnErrorDot": "IzP3Va_turnErrorDot",
			"turnErrorMessage": "IzP3Va_turnErrorMessage",
			"turnErrorRow": "IzP3Va_turnErrorRow",
			"turnErrorTitle": "IzP3Va_turnErrorTitle",
			"userRow": "IzP3Va_userRow",
			"userStack": "IzP3Va_userStack"
		};
		//#endregion
