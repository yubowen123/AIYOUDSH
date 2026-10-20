		//#region \0dsh-css:upstream/packages/client/ui-workspace/src/client/rows/Rows.module.css.mjs
		const css$3 = ".jJkEga_projectRow,.jJkEga_sessionRow{border-radius:var(--dsw-radius-md);padding:0 8px;cursor:pointer;user-select:none;color:var(--dsw-alias-label-primary);align-items:center;gap:6px;padding-inline-start:calc(8px + var(--dsh-workspace-indent,0px));display:flex}.jJkEga_projectRow:hover,.jJkEga_sessionRow:hover,.jJkEga_sessionRow.jJkEga_selected{background:var(--dsw-alias-interactive-bg-hover)}.jJkEga_searchResultRow{box-sizing:border-box;border-radius:var(--dsw-radius-lg);cursor:pointer;text-align:left;width:100%;min-height:48px;color:var(--dsw-alias-label-primary);background:0 0;border:none;flex-direction:column;align-items:stretch;padding:4px 8px;display:flex}.jJkEga_searchResultRow:hover,.jJkEga_searchResultRow.jJkEga_selected{background:var(--dsw-alias-interactive-bg-hover)}.jJkEga_searchResultHeading{align-items:center;min-width:0;display:flex}.jJkEga_searchResultTitle{text-overflow:ellipsis;white-space:nowrap;flex:0 auto;min-width:0;margin-left:4px;font-size:14px;line-height:20px;overflow:hidden}.jJkEga_searchResultMeta{align-items:center;gap:6px;min-width:0;margin-left:20px;display:flex}.jJkEga_searchResultWorkspace,.jJkEga_searchResultSnippet{text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:17px;overflow:hidden}.jJkEga_searchResultWorkspace{max-width:40%;color:var(--dsw-alias-label-tertiary);flex:none}.jJkEga_searchResultWorkspace:only-child{max-width:100%}.jJkEga_searchResultSnippet{min-width:0;color:var(--dsw-alias-label-secondary);flex:1}.jJkEga_projectRow{box-sizing:border-box;align-items:center;height:34px}.jJkEga_projectRow .jJkEga_rowActions{height:20px}.jJkEga_sessionRow{gap:0;height:32px}.jJkEga_sessionRow .jJkEga_title{margin:0 6px 0 4px}.jJkEga_slot{width:16px;height:20px;color:var(--dsw-alias-label-tertiary);flex:none;justify-content:center;align-items:center;display:inline-flex}.jJkEga_visuallyHidden{clip:rect(0 0 0 0);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}.jJkEga_folderActive{color:var(--dsw-alias-state-business-primary)}.jJkEga_projectRow .jJkEga_chevron{display:none}.jJkEga_projectRow:hover .jJkEga_chevron{display:inline-flex}.jJkEga_projectRow:hover .jJkEga_folder{display:none}.jJkEga_arrow{transition:transform .15s var(--ds-ease-in-out)}.jJkEga_arrowOpen{transform:rotate(90deg)}.jJkEga_projectText{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}.jJkEga_title{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:14px;line-height:20px;overflow:hidden}.jJkEga_renameInput{border:.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-button-elevated-fill);min-width:0;color:inherit;outline:none;padding:0 2px;font-size:14px;line-height:20px}.jJkEga_sessionRow .jJkEga_title{flex:1}.jJkEga_sessionRow .jJkEga_title[data-scrolled]{mask-image:linear-gradient(90deg,#0000,#000 12px)}.jJkEga_sessionRow .jJkEga_title[data-clipped]{mask-image:linear-gradient(270deg,#0000,#000 12px)}.jJkEga_sessionRow .jJkEga_title[data-scrolled][data-clipped]{mask-image:linear-gradient(90deg,#0000,#000 12px calc(100% - 12px),#0000)}.jJkEga_meta{text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:20px;overflow:hidden}.jJkEga_time{color:var(--dsw-alias-label-tertiary);flex:none;font-size:10px;line-height:16px}.jJkEga_pinIndicator{width:16px;height:20px;color:var(--dsw-alias-label-caption);flex:none;justify-content:center;align-items:center;margin-left:6px;display:inline-flex}.jJkEga_sessionRow.jJkEga_archived .jJkEga_title,.jJkEga_searchResultRow.jJkEga_archived .jJkEga_searchResultTitle,.jJkEga_searchResultRow.jJkEga_archived .jJkEga_searchResultWorkspace,.jJkEga_searchResultRow.jJkEga_archived .jJkEga_searchResultSnippet{color:var(--dsw-alias-label-caption)}.jJkEga_dot{flex:none}.jJkEga_rowActions{flex:none;align-items:center;gap:15px;display:none}.jJkEga_projectRow:hover .jJkEga_rowActions,.jJkEga_sessionRow:hover .jJkEga_rowActions,.jJkEga_searchResultRow:hover .jJkEga_rowActions,.jJkEga_projectRow.jJkEga_menuOpen .jJkEga_rowActions,.jJkEga_sessionRow.jJkEga_menuOpen .jJkEga_rowActions{display:inline-flex}.jJkEga_searchResultHeading .jJkEga_rowActions{margin-left:auto}.jJkEga_sessionRow:hover .jJkEga_time,.jJkEga_sessionRow.jJkEga_menuOpen .jJkEga_time,.jJkEga_sessionRow:hover .jJkEga_pinIndicator,.jJkEga_sessionRow.jJkEga_menuOpen .jJkEga_pinIndicator{display:none}@media (hover:hover){.jJkEga_sessionRow:hover .jJkEga_title,.jJkEga_sessionRow.jJkEga_menuOpen .jJkEga_title{text-overflow:clip}}.jJkEga_projectRow.jJkEga_menuOpen,.jJkEga_sessionRow.jJkEga_menuOpen{background:var(--dsw-alias-interactive-bg-hover)}.jJkEga_sessionRow.jJkEga_dropBefore,.jJkEga_sessionRow.jJkEga_dropAfter{position:relative}.jJkEga_sessionRow.jJkEga_dropBefore:before,.jJkEga_sessionRow.jJkEga_dropAfter:after{content:\"\";z-index:1;background:linear-gradient(55deg, transparent calc(50% - 1px), var(--dsw-alias-state-business-primary) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) 0 0 / 5px 7px no-repeat, linear-gradient(125deg, transparent calc(50% - 1px), var(--dsw-alias-state-business-primary) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) 0 5px / 5px 7px no-repeat, linear-gradient(var(--dsw-alias-state-business-primary) 0 0) 4px 5px / calc(100% - 4px) 2px no-repeat;pointer-events:none;height:12px;position:absolute;left:0;right:4px}.jJkEga_sessionRow.jJkEga_dropBefore:before{top:-7px}.jJkEga_sessionRow.jJkEga_dropAfter:after{bottom:-7px}.jJkEga_hoverContent{flex-direction:column;gap:8px;display:flex}.jJkEga_hoverTitle{color:#fff;overflow-wrap:break-word;font-size:14px;line-height:20px}.jJkEga_hoverPath{color:#cfd3d6;word-break:break-all;font-size:12px;line-height:16px}.jJkEga_hoverTime{color:#cfd3d6;font-size:12px;line-height:16px}.jJkEga_hoverStatus{color:#adb2b8;align-items:center;gap:8px;font-size:12px;line-height:20px;display:flex}.jJkEga_hoverArchived svg{flex-shrink:0;margin:0 -4px}.jJkEga_iconButton{border-radius:var(--dsw-radius-xs);cursor:pointer;width:16px;height:16px;color:var(--dsw-alias-label-tertiary);background:0 0;border:none;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}.jJkEga_iconButton:hover{color:var(--dsw-alias-label-primary)}.jJkEga_chevron{color:var(--dsw-alias-label-caption)}@media (prefers-reduced-motion:reduce){.jJkEga_arrow{transition:none;animation:none}}";
		const tagId$3 = "@deepseek-ai/dsh-client-ui-workspace/Rows.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-workspace";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var Rows_module_css_default = {
			"archived": "jJkEga_archived",
			"arrow": "jJkEga_arrow",
			"arrowOpen": "jJkEga_arrowOpen",
			"chevron": "jJkEga_chevron",
			"dot": "jJkEga_dot",
			"dropAfter": "jJkEga_dropAfter",
			"dropBefore": "jJkEga_dropBefore",
			"folder": "jJkEga_folder",
			"folderActive": "jJkEga_folderActive",
			"hoverArchived": "jJkEga_hoverArchived",
			"hoverContent": "jJkEga_hoverContent",
			"hoverPath": "jJkEga_hoverPath",
			"hoverStatus": "jJkEga_hoverStatus",
			"hoverTime": "jJkEga_hoverTime",
			"hoverTitle": "jJkEga_hoverTitle",
			"iconButton": "jJkEga_iconButton",
			"menuOpen": "jJkEga_menuOpen",
			"meta": "jJkEga_meta",
			"pinIndicator": "jJkEga_pinIndicator",
			"projectRow": "jJkEga_projectRow",
			"projectText": "jJkEga_projectText",
			"renameInput": "jJkEga_renameInput",
			"rowActions": "jJkEga_rowActions",
			"searchResultHeading": "jJkEga_searchResultHeading",
			"searchResultMeta": "jJkEga_searchResultMeta",
			"searchResultRow": "jJkEga_searchResultRow",
			"searchResultSnippet": "jJkEga_searchResultSnippet",
			"searchResultTitle": "jJkEga_searchResultTitle",
			"searchResultWorkspace": "jJkEga_searchResultWorkspace",
			"selected": "jJkEga_selected",
			"sessionRow": "jJkEga_sessionRow",
			"slot": "jJkEga_slot",
			"time": "jJkEga_time",
			"title": "jJkEga_title",
			"visuallyHidden": "jJkEga_visuallyHidden"
		};
		//#endregion
