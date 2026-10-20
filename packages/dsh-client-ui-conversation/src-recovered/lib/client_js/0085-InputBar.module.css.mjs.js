		//#region \0dsh-css:upstream/packages/client/ui-conversation/src/client/skeleton/InputBar.module.css.mjs
		const css$1 = ".yhfFVG_root{padding:0 var(--dsh-composer-side-clearance) 4px;flex-direction:column;align-items:center;display:flex}.yhfFVG_dock{justify-content:center;align-items:center;gap:12px;max-width:100%;padding-top:4px;display:flex}.yhfFVG_hero .yhfFVG_dock:empty{display:none}.yhfFVG_hero{padding:0 var(--dsh-composer-side-clearance)}.yhfFVG_notice{width:100%;max-width:var(--dsh-composer-card-max-width);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary);margin-bottom:6px;padding:4px 8px;font-size:12px;line-height:18px}.yhfFVG_card{box-sizing:border-box;width:100%;max-width:var(--dsh-composer-card-max-width);--dsw-elevation-stroke-color:var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-panel);background:var(--dsw-specific-input-major);box-shadow:var(--dsw-elevation-soft);font-size:var(--dsh-content-font-size,14px);line-height:calc(24px + var(--dsh-content-font-delta,0px));--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);border:0;flex-direction:column;gap:12px;padding-top:8px;display:flex;position:relative}.yhfFVG_cardWorkspaceTrigger{--dsw-elevation-stroke-color:transparent;cursor:pointer}.yhfFVG_cardWorkspaceTrigger:after{content:\"\";box-sizing:border-box;border-radius:var(--dsw-radius-panel);color:var(--dsw-alias-border-l4);pointer-events:none;border:1px dashed;transition:color .1s;position:absolute;inset:0}.yhfFVG_cardWorkspaceTrigger :disabled{pointer-events:none}.yhfFVG_cardWorkspaceTrigger:hover:after{color:var(--dsw-alias-state-business-primary)}.yhfFVG_accessory{align-items:center;gap:8px;padding:10px 12px 0;display:flex}.yhfFVG_overlayAnchor{height:0;position:absolute;inset:0 0 auto}.yhfFVG_scroll{max-height:var(--dsh-composer-text-max-height);margin-right:4px;overflow-y:auto}.yhfFVG_scroll::-webkit-scrollbar-track{margin-top:8px}.yhfFVG_grow{position:relative}.yhfFVG_pending{corner-shape:round;background:var(--dsw-alias-state-business-primary);border-radius:50%;width:8px;height:8px;animation:1s ease-in-out infinite alternate yhfFVG_input-pending}@keyframes yhfFVG_input-pending{0%{opacity:.35}to{opacity:1}}.yhfFVG_input{box-sizing:border-box;min-height:36px;font-family:var(--dsw-font-family);font-size:inherit;line-height:inherit;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);caret-color:var(--dsw-alias-state-business-primary);outline:none;padding:4px 8px 0 14px}.yhfFVG_input p{margin:0}.yhfFVG_input p:last-child:after{content:var(--dsh-composer-hint);color:var(--dsw-alias-label-caption)}.yhfFVG_input[data-composer-composing] p:last-child:after{content:none}.yhfFVG_input[data-composer-chip-selected]{caret-color:#0000}.yhfFVG_input[data-composer-composing]+.yhfFVG_placeholder{visibility:hidden}.yhfFVG_placeholder{color:var(--dsw-alias-label-caption);white-space:nowrap;text-overflow:ellipsis;pointer-events:none;user-select:none;position:absolute;inset:4px 8px auto 14px;overflow:hidden}.yhfFVG_inputDisabled{color:var(--dsw-alias-label-tertiary);cursor:not-allowed}.yhfFVG_input[aria-haspopup=menu]{cursor:pointer}.yhfFVG_hero .yhfFVG_input{min-height:52px}.yhfFVG_hero .yhfFVG_placeholder{white-space:normal;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box}.yhfFVG_row{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;min-width:0;padding:2px 8px 6px;display:flex;container-type:inline-size}.yhfFVG_row[data-model-compact]{--dsh-composer-model-text-display:none;--dsh-composer-model-icon-display:block}.yhfFVG_tools,.yhfFVG_modes,.yhfFVG_trailing{align-items:center;min-width:0;display:flex}.yhfFVG_tools,.yhfFVG_modes{gap:12px}.yhfFVG_trailing{flex:none;gap:12px;margin-left:auto}@container (width<=560px){.yhfFVG_tools,.yhfFVG_modes,.yhfFVG_trailing{gap:8px}}.yhfFVG_add{corner-shape:round;background:var(--dsw-specific-selector);width:28px;height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;border:none;border-radius:999px;flex:none;place-items:center;display:grid}.yhfFVG_add:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-solid)}.yhfFVG_add:disabled{opacity:.5;cursor:default}.yhfFVG_select{border-radius:var(--dsw-radius-sm);max-width:220px;height:28px;color:var(--dsw-alias-label-secondary);white-space:nowrap;cursor:pointer;appearance:none;background-color:#0000;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\");background-position:right 4px center;background-repeat:no-repeat;background-size:12px 12px;border:none;outline:none;padding:0 20px 0 8px;font-size:13px;font-weight:500;line-height:20px}.yhfFVG_select:hover:not(:disabled){background-color:var(--dsw-alias-interactive-bg-hover)}.yhfFVG_select:disabled{opacity:.5;cursor:default}.yhfFVG_primary{corner-shape:round;background:var(--dsw-alias-button-info-fill);color:#fff;cursor:pointer;border:none;border-radius:999px;flex:none;place-items:center;width:34px;height:34px;transition:background-color .1s;display:grid;transform:translateY(-2px)}.yhfFVG_primary:hover:not(:disabled){background:var(--dsw-alias-button-info-hover)}.yhfFVG_primary:disabled{opacity:.4;cursor:default}.yhfFVG_retry{border-radius:var(--dsw-radius-sm);color:inherit;cursor:pointer;background:0 0;border:1px solid;margin-left:8px;padding:1px 8px;font-size:12px}.yhfFVG_standardControls{align-items:center;gap:12px;min-width:0;display:flex}.yhfFVG_tools[hidden],.yhfFVG_standardControls[hidden]{display:none}.yhfFVG_trailingActive{flex:1;margin-left:0}.yhfFVG_activity{flex:none;align-items:center;display:flex}.yhfFVG_activity:empty{display:none}.yhfFVG_activityExpanded{flex:1;min-width:0}";
		const tagId$1 = "@deepseek-ai/dsh-client-ui-conversation/InputBar.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-conversation";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var InputBar_module_css_default = {
			"accessory": "yhfFVG_accessory",
			"activity": "yhfFVG_activity",
			"activityExpanded": "yhfFVG_activityExpanded",
			"add": "yhfFVG_add",
			"card": "yhfFVG_card",
			"cardWorkspaceTrigger": "yhfFVG_cardWorkspaceTrigger",
			"dock": "yhfFVG_dock",
			"grow": "yhfFVG_grow",
			"hero": "yhfFVG_hero",
			"input": "yhfFVG_input",
			"input-pending": "yhfFVG_input-pending",
			"inputDisabled": "yhfFVG_inputDisabled",
			"modes": "yhfFVG_modes",
			"notice": "yhfFVG_notice",
			"overlayAnchor": "yhfFVG_overlayAnchor",
			"pending": "yhfFVG_pending",
			"placeholder": "yhfFVG_placeholder",
			"primary": "yhfFVG_primary",
			"retry": "yhfFVG_retry",
			"root": "yhfFVG_root",
			"row": "yhfFVG_row",
			"scroll": "yhfFVG_scroll",
			"select": "yhfFVG_select",
			"standardControls": "yhfFVG_standardControls",
			"tools": "yhfFVG_tools",
			"trailing": "yhfFVG_trailing",
			"trailingActive": "yhfFVG_trailingActive"
		};
		//#endregion
