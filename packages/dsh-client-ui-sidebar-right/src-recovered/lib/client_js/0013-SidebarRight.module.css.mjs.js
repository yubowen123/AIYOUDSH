		//#region \0dsh-css:upstream/packages/client/ui-sidebar-right/src/client/shell/SidebarRight.module.css.mjs
		const css = ".irMxjq_session{display:contents}.irMxjq_session[hidden]{display:none}.irMxjq_panel{--dsh-dockkit-dock-layer:10;--dsh-dockkit-float-layer:60;pointer-events:none;flex-direction:column;min-width:0;display:flex;position:absolute;top:0;bottom:0;right:0;overflow:clip}.irMxjq_panel [data-dockkit-host=dock],.irMxjq_panel [data-dockkit-empty],.irMxjq_panel [data-dockkit-divider]{transform:translateX(var(--dsh-sidebar-width));visibility:hidden;transition:transform var(--ds-transition-duration-slow) var(--ds-ease-in-out), visibility 0s linear var(--ds-transition-duration-slow)}.irMxjq_panel[data-sidebar-right-open] [data-dockkit-host=dock],.irMxjq_panel[data-sidebar-right-open] [data-dockkit-empty],.irMxjq_panel[data-sidebar-right-open] [data-dockkit-divider]{visibility:visible;transition:transform var(--ds-transition-duration-slow) var(--ds-ease-in-out);transform:none}.irMxjq_panel[data-sidebar-right-panel=fullscreen]{--dsh-dockkit-dock-layer:40}[data-windows-titlebar] .irMxjq_panel[data-sidebar-right-panel=fullscreen]{max-width:calc(100vw - var(--dsh-windows-sidebar-width))}[data-windows-titlebar] .irMxjq_panel[data-sidebar-right-panel=fullscreen] [data-dockkit-column=\"0\"][data-dockkit-pane]{border-radius:var(--dsh-windows-content-radius) 0 0 0;corner-shape:round}[data-platform=darwin] .irMxjq_panel[data-sidebar-right-panel=fullscreen] [data-dockkit-host=dock][data-dockkit-column=\"0\"]{--dsh-dockkit-strip-inline-start:88px}[data-platform=darwin] .irMxjq_panel[data-sidebar-right-panel=fullscreen] [data-dockkit-host=dock][data-dockkit-column=\"1\"]{--dsh-dockkit-strip-inline-start:10px}[data-platform=darwin][data-fullscreen] .irMxjq_panel[data-sidebar-right-panel=fullscreen] [data-dockkit-host=dock][data-dockkit-column=\"0\"]{--dsh-dockkit-strip-inline-start:10px}@media (prefers-reduced-motion:reduce){.irMxjq_panel [data-dockkit-host=dock],.irMxjq_panel [data-dockkit-empty],.irMxjq_panel [data-dockkit-divider]{transition:none}}.irMxjq_iconButton{width:28px;height:28px;color:var(--dsw-alias-label-secondary);border-radius:var(--dsw-radius-sm);cursor:pointer;background:0 0;border:none;flex:none;justify-content:center;align-items:center;padding:6px;line-height:1;display:inline-flex}.irMxjq_iconButton svg{width:15px;height:15px}.irMxjq_iconButton:hover{background:var(--dsw-alias-interactive-bg-hover)}.irMxjq_collapseGlyph{transform:scaleX(-1)}.irMxjq_panelBody{flex:auto;min-height:0;display:flex}.irMxjq_unavailable{color:var(--dsw-alias-label-tertiary);font-size:var(--dsh-content-font-size-secondary,13px);margin:0;padding:12px}.irMxjq_tabTitle{display:contents}.irMxjq_tabBody{flex-direction:column;min-width:0;height:100%;min-height:0;display:flex;overflow:hidden}";
		const tagId = "@deepseek-ai/dsh-client-ui-sidebar-right/SidebarRight.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-sidebar-right";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var SidebarRight_module_css_default = {
			"collapseGlyph": "irMxjq_collapseGlyph",
			"iconButton": "irMxjq_iconButton",
			"panel": "irMxjq_panel",
			"panelBody": "irMxjq_panelBody",
			"session": "irMxjq_session",
			"tabBody": "irMxjq_tabBody",
			"tabTitle": "irMxjq_tabTitle",
			"unavailable": "irMxjq_unavailable"
		};
		//#endregion
