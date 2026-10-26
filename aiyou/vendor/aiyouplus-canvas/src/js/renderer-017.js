const ndi = Object.freeze(Object.defineProperty({
    __proto__: null,
    defaultOptions: kBt,
    parseAsync: Esr,
    renderAsync: tdi,
    renderDocument: Tsr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  rdi = `:root{--button-primary-bg-color:var( --button-background-color-primary, light-dark(#0060df, #0df) );--button-primary-fg-color:var( --button-text-color-primary, light-dark(#fbfbfe, #15141a) );--button-primary-border-color:var(--button-primary-bg-color);--button-primary-active-bg-color:var( --button-background-color-primary-active, light-dark(#054096, #aaf2ff) );--button-primary-active-fg-color:var(--button-primary-fg-color);--button-primary-active-border-color:var(--button-primary-active-bg-color);--button-primary-hover-bg-color:var( --button-background-color-primary-hover, light-dark(#0250bb, #80ebff) );--button-primary-hover-fg-color:var(--button-primary-fg-color);--button-primary-hover-border-color:var(--button-primary-hover-bg-color);--button-primary-disabled-bg-color:var(--button-primary-bg-color);--button-primary-disabled-border-color:var(--button-primary-border-color);--button-primary-disabled-fg-color:var(--button-primary-fg-color);--button-secondary-bg-color:var( --button-background-color, light-dark(rgb(21 20 26 / .07), rgb(251 251 254 / .07)) );--button-secondary-fg-color:var(--text-color, light-dark(#15141a, #fbfbfe));--button-secondary-border-color:var( --button-border-color, var(--button-secondary-bg-color) );--button-secondary-active-bg-color:var( --button-background-color-active, light-dark(rgb(21 20 26 / .21), rgb(251 251 254 / .21)) );--button-secondary-active-fg-color:var(--button-secondary-fg-color);--button-secondary-active-border-color:var(--button-secondary-bg-color);--button-secondary-hover-bg-color:var( --button-background-color-hover, light-dark(rgb(21 20 26 / .14), rgb(251 251 254 / .14)) );--button-secondary-hover-fg-color:var(--button-secondary-fg-color);--button-secondary-hover-border-color:var(--button-secondary-hover-bg-color);--button-secondary-disabled-bg-color:var(--button-secondary-bg-color);--button-secondary-disabled-border-color:var( --button-secondary-border-color );--button-secondary-disabled-fg-color:var(--button-secondary-fg-color);--button-disabled-opacity:.4;--hover-filter:brightness(.9)}@media(prefers-color-scheme:dark){:root{--button-disabled-opacity:.6;--hover-filter:brightness(1.4)}}@media screen and (forced-colors:active){:root{--button-primary-bg-color:var( --button-background-color-primary, ButtonText );--button-primary-fg-color:var(--button-text-color-primary, ButtonFace);--button-primary-border-color:var( --button-border-color-primary, ButtonText );--button-primary-active-bg-color:var( --button-background-color-primary-active, SelectedItem );--button-primary-active-fg-color:var( --button-text-color-primary-active, HighlightText );--button-primary-active-border-color:var( --button-border-color-primary-active, ButtonText );--button-primary-hover-bg-color:var( --button-background-color-primary-hover, SelectedItem );--button-primary-hover-fg-color:var( --button-text-color-primary-hover, HighlightText );--button-primary-hover-border-color:var( --button-border-color-primary-hover, SelectedItem );--button-primary-disabled-bg-color:var( --button-background-color-primary-disabled, GrayText );--button-primary-disabled-fg-color:var( --button-text-color-primary-disabled, ButtonFace );--button-primary-disabled-border-color:var( --button-border-color-primary-disabled, GrayText );--button-secondary-bg-color:var(--button-background-color, ButtonFace);--button-secondary-fg-color:var(--button-text-color, ButtonText);--button-secondary-border-color:var(--button-border-color, ButtonText);--button-secondary-active-bg-color:var( --button-background-color-active, HighlightText );--button-secondary-active-fg-color:var( --button-text-color-active, SelectedItem );--button-secondary-active-border-color:var( --button-border-color-active, ButtonText );--button-secondary-hover-bg-color:var( --button-background-color-hover, HighlightText );--button-secondary-hover-fg-color:var( --button-text-color-hover, SelectedItem );--button-secondary-hover-border-color:var( --button-border-color-hover, SelectedItem );--button-secondary-disabled-fg-color:var( --button-text-color-disabled, GrayText );--button-secondary-disabled-border-color:var( --button-border-color-disabled, GrayText );--button-disabled-opacity:1;--hover-filter:none}}.primaryButton,.secondaryButton{border-radius:var(--button-border-radius, 4px);border:1px solid;font:menu;font-weight:var(--button-font-weight, 590);font-size:var(--button-font-size, 13px);padding:var(--button-padding, 4px 16px);width:auto;min-height:var(--button-min-height, 32px)}.primaryButton:hover,.secondaryButton:hover{cursor:pointer;filter:var(--hover-filter)}.primaryButton>span,.secondaryButton>span{color:inherit;font:inherit}.primaryButton:disabled,.secondaryButton:disabled{pointer-events:none}.primaryButton{color:var(--button-primary-fg-color);background-color:var(--button-primary-bg-color);border-color:var(--button-primary-border-color);opacity:1}.primaryButton:hover{color:var(--button-primary-hover-fg-color);background-color:var(--button-primary-hover-bg-color);border-color:var(--button-primary-hover-border-color)}.primaryButton:active{color:var(--button-primary-active-fg-color);background-color:var(--button-primary-active-bg-color);border-color:var(--button-primary-active-border-color)}.primaryButton:disabled{background-color:var(--button-primary-disabled-bg-color);border-color:var(--button-primary-disabled-border-color);color:var(--button-primary-disabled-fg-color);opacity:var(--button-disabled-opacity)}.secondaryButton{color:var(--button-secondary-fg-color);background-color:var(--button-secondary-bg-color);border-color:var(--button-secondary-border-color)}.secondaryButton:hover{color:var(--button-secondary-hover-fg-color);background-color:var(--button-secondary-hover-bg-color);border-color:var(--button-secondary-hover-border-color)}.secondaryButton:active{color:var(--button-secondary-active-fg-color);background-color:var(--button-secondary-active-bg-color);border-color:var(--button-secondary-active-border-color)}.secondaryButton:disabled{background-color:var(--button-secondary-disabled-bg-color);border-color:var(--button-secondary-disabled-border-color);color:var(--button-secondary-disabled-fg-color);opacity:var(--button-disabled-opacity)}.messageBar{--closing-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.85822%208.84922L4.85322%2011.8542C4.75891%2011.9453%204.63261%2011.9957%204.50151%2011.9946C4.37042%2011.9934%204.24501%2011.9408%204.15231%2011.8481C4.0596%2011.7554%204.00702%2011.63%204.00588%2011.4989C4.00474%2011.3678%204.05514%2011.2415%204.14622%2011.1472L7.15122%208.14222V7.85922L4.14622%204.85322C4.05514%204.75891%204.00474%204.63261%204.00588%204.50151C4.00702%204.37042%204.0596%204.24501%204.15231%204.15231C4.24501%204.0596%204.37042%204.00702%204.50151%204.00588C4.63261%204.00474%204.75891%204.05514%204.85322%204.14622L7.85822%207.15122H8.14122L11.1462%204.14622C11.2405%204.05514%2011.3668%204.00474%2011.4979%204.00588C11.629%204.00702%2011.7544%204.0596%2011.8471%204.15231C11.9398%204.24501%2011.9924%204.37042%2011.9936%204.50151C11.9947%204.63261%2011.9443%204.75891%2011.8532%204.85322L8.84822%207.85922V8.14222L11.8532%2011.1472C11.9443%2011.2415%2011.9947%2011.3678%2011.9936%2011.4989C11.9924%2011.63%2011.9398%2011.7554%2011.8471%2011.8481C11.7544%2011.9408%2011.629%2011.9934%2011.4979%2011.9946C11.3668%2011.9957%2011.2405%2011.9453%2011.1462%2011.8542L8.14122%208.84922L8.14222%208.85022L7.85822%208.84922Z'%20fill='black'/%3e%3c/svg%3e");--message-bar-close-button-color:var(--text-primary-color);--message-bar-close-button-color-hover:var(--text-primary-color);--message-bar-close-button-border-radius:var(--border-radius-small, 4px);--message-bar-close-button-border:none;--message-bar-close-button-hover-bg-color:var( --button-background-color-hover, light-dark(rgb(21 20 26 / .14), rgb(251 251 254 / .14)) );--message-bar-close-button-active-bg-color:var( --button-background-color-active, light-dark(rgb(21 20 26 / .21), rgb(251 251 254 / .21)) );--message-bar-close-button-focus-bg-color:var( --button-background-color, light-dark(rgb(21 20 26 / .07), rgb(251 251 254 / .07)) );display:flex;position:relative;padding:8px 8px 8px 16px;flex-direction:column;justify-content:center;align-items:center;gap:8px;-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:var(--border-radius-small, 4px);border:1px solid var(--message-bar-border-color);background:var(--message-bar-bg-color);color:var(--message-bar-fg-color)}@media screen and (forced-colors:active){.messageBar{--message-bar-close-button-color:var(--button-text-color, ButtonText);--message-bar-close-button-border:1px solid var(--button-border-color, ButtonText);--message-bar-close-button-hover-bg-color:var( --button-background-color-hover, SelectedItemText );--message-bar-close-button-active-bg-color:var( --button-background-color-hover, SelectedItemText );--message-bar-close-button-focus-bg-color:var( --button-background-color-hover, SelectedItemText );--message-bar-close-button-color-hover:var( --button-text-color-hover, SelectedItem )}}.messageBar>div{display:flex;align-items:flex-start;gap:8px;align-self:stretch}.messageBar>div:before{content:"";display:inline-block;width:16px;height:16px;-webkit-mask-image:var(--message-bar-icon);mask-image:var(--message-bar-icon);-webkit-mask-size:cover;mask-size:cover;background-color:var(--message-bar-icon-color);flex-shrink:0}.messageBar button{cursor:pointer}.messageBar button:focus-visible{outline:var(--focus-ring-outline);outline-offset:2px}.messageBar .closeButton{width:32px;height:32px;background:none;border-radius:var(--message-bar-close-button-border-radius);border:var(--message-bar-close-button-border);display:flex;align-items:center;justify-content:center}.messageBar .closeButton:before{content:"";display:inline-block;width:16px;height:16px;-webkit-mask-image:var(--closing-button-icon);mask-image:var(--closing-button-icon);-webkit-mask-size:cover;mask-size:cover;background-color:var(--message-bar-close-button-color)}.messageBar .closeButton:is(:hover,:active,:focus):before{background-color:var(--message-bar-close-button-color-hover)}.messageBar .closeButton:hover{background-color:var(--message-bar-close-button-hover-bg-color)}.messageBar .closeButton:active{background-color:var(--message-bar-close-button-active-bg-color)}.messageBar .closeButton:focus{background-color:var(--message-bar-close-button-focus-bg-color)}.messageBar .closeButton>span{display:inline-block;width:0;height:0;overflow:hidden}#editorUndoBar{--message-bar-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.625%200.5C6.64009%200.5%205.66482%200.693993%204.75487%201.0709C3.84493%201.44781%203.01814%202.00026%202.3217%202.6967C1.62526%203.39314%201.07281%204.21993%200.695904%205.12987C0.318993%206.03982%200.125%207.01509%200.125%208C0.125%208.98491%200.318993%209.96018%200.695904%2010.8701C1.07281%2011.7801%201.62526%2012.6069%202.3217%2013.3033C3.01814%2013.9997%203.84493%2014.5522%204.75487%2014.9291C5.66482%2015.306%206.64009%2015.5%207.625%2015.5C9.61412%2015.5%2011.5218%2014.7098%2012.9283%2013.3033C14.3348%2011.8968%2015.125%209.98912%2015.125%208C15.125%206.01088%2014.3348%204.10322%2012.9283%202.6967C11.5218%201.29018%209.61412%200.5%207.625%200.5ZM8.25%2011.375C8.25%2011.5408%208.18415%2011.6997%208.06694%2011.8169C7.94973%2011.9342%207.79076%2012%207.625%2012C7.45924%2012%207.30027%2011.9342%207.18306%2011.8169C7.06585%2011.6997%207%2011.5408%207%2011.375V6.938C7%206.77224%207.06585%206.61327%207.18306%206.49606C7.30027%206.37885%207.45924%206.313%207.625%206.313C7.79076%206.313%207.94973%206.37885%208.06694%206.49606C8.18415%206.61327%208.25%206.77224%208.25%206.938V11.375ZM8.25%205L8%205.25H7.25L7%205V4.25L7.25%204H8L8.25%204.25V5Z'%20fill='black'%20/%3e%3c/svg%3e");--message-bar-icon-color:light-dark(#0060df, #73a7f3);--message-bar-bg-color:light-dark(#deeafc, #003070);--message-bar-fg-color:var(--text-primary-color);--message-bar-border-color:light-dark( rgb(0 0 0 / .08), rgb(255 255 255 / .08) );position:fixed;top:50px;left:50%;transform:translate(-50%);z-index:10;padding-block:8px;padding-inline:16px 8px;font:menu;font-size:15px;cursor:default}@media screen and (forced-colors:active){#editorUndoBar{--message-bar-icon-color:CanvasText;--message-bar-bg-color:Canvas;--message-bar-border-color:CanvasText}}#editorUndoBar button{cursor:pointer}#editorUndoBar #editorUndoBarUndoButton{margin-inline-start:8px;border-color:var(--color-accent-primary, light-dark(#0060df, #0df))}#editorUndoBar>div{align-items:center}.dialog{--dialog-bg-color:var(--background-color-canvas, light-dark(white, #1c1b22));--dialog-border-color:var( --background-color-canvas, light-dark(white, #1c1b22) );--dialog-shadow:0 2px 14px 0 light-dark(rgb(58 57 68 / .2), #15141a);--text-secondary-color:light-dark(#5b5b66, #cfcfd8);--separator-color:light-dark(#f0f0f4, #52525e);--textarea-border-color:var(--border-color-interactive, #8f8f9d);--textarea-bg-color:light-dark(white, #42414d);--textarea-fg-color:var(--text-secondary-color);--input-text-bg-color:light-dark(white, #42414d);--input-text-fg-color:var(--text-primary-color);font:message-box;font-size:13px;font-weight:400;line-height:150%;border-radius:var(--border-radius-medium, 4px);padding:12px 16px;border:1px solid var(--dialog-border-color);background:var(--dialog-bg-color);color:var(--text-primary-color);box-shadow:var(--dialog-shadow)}@media screen and (forced-colors:active){.dialog{--dialog-bg-color:var(--background-color-canvas, Canvas);--dialog-border-color:var(--border-color, CanvasText);--dialog-shadow:none;--text-secondary-color:CanvasText;--separator-color:CanvasText;--textarea-border-color:ButtonBorder;--textarea-bg-color:Field;--textarea-fg-color:ButtonText;--input-text-bg-color:Field;--input-text-fg-color:FieldText}}.dialog .mainContainer *:focus-visible{outline:var(--focus-ring-outline);outline-offset:2px}.dialog .mainContainer .title{display:flex;width:auto;flex-direction:column;justify-content:flex-end;align-items:flex-start;gap:12px}.dialog .mainContainer .title>span{font-size:13px;font-style:normal;font-weight:590;line-height:150%}.dialog .mainContainer .dialogSeparator{width:100%;height:0;margin-block:4px;border-top:1px solid var(--separator-color);border-bottom:none}.dialog .mainContainer .dialogButtonsGroup{display:flex;gap:12px;align-self:flex-end}.dialog .mainContainer input:is([type=checkbox],[type=radio]){accent-color:var(--color-accent-primary, light-dark(#0060df, #0df));width:var(--checkbox-size, 16px);height:var(--checkbox-size, 16px)}.dialog .mainContainer .radio{display:flex;flex-direction:column;align-items:flex-start;gap:4px}.dialog .mainContainer .radio>.radioButton{display:flex;gap:8px;align-self:stretch;align-items:center}.dialog .mainContainer .radio>.radioLabel{display:flex;padding-inline-start:24px;align-items:flex-start;gap:10px;align-self:stretch}.dialog .mainContainer .radio>.radioLabel>span{flex:1 0 0;font-size:11px;color:var(--text-secondary-color)}.dialog .mainContainer button:not(:is(.toggle-button,.closeButton,.clearInputButton)){border-radius:var(--button-border-radius, 4px);border-width:1px;border-style:solid;font:menu;font-weight:var(--button-font-weight, 590);font-size:var(--button-font-size, 13px);padding:var(--button-padding, 4px 16px);width:auto;min-height:var(--button-min-height, 32px)}.dialog .mainContainer button:not(:is(.toggle-button,.closeButton,.clearInputButton)):hover{cursor:pointer;filter:var(--hover-filter)}.dialog .mainContainer button:not(:is(.toggle-button,.closeButton,.clearInputButton))>span{color:inherit;font:inherit}.dialog .mainContainer button:not(:is(.toggle-button,.closeButton,.clearInputButton)):disabled{pointer-events:none}.dialog .mainContainer a{color:var(--link-fg-color)}.dialog .mainContainer a:hover{color:var(--link-hover-fg-color)}.dialog .mainContainer textarea{font:inherit;padding:8px;resize:none;margin:0;box-sizing:border-box;border-radius:var(--border-radius-small, 4px);border:1px solid var(--textarea-border-color);background:var(--textarea-bg-color);color:var(--textarea-fg-color)}.dialog .mainContainer textarea:focus{outline-offset:0;border-color:transparent}.dialog .mainContainer textarea:disabled{pointer-events:none;opacity:.4}.dialog .mainContainer input[type=text]{background-color:var(--input-text-bg-color);color:var(--input-text-fg-color)}.dialog .mainContainer .messageBar{--message-bar-bg-color:light-dark(#ffebcd, #5a3100);--message-bar-fg-color:light-dark(#15141a, #fbfbfe);--message-bar-border-color:light-dark( rgb(0 0 0 / .08), rgb(255 255 255 / .08) );--message-bar-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14.8748%2012.037L9.37782%202.037C8.99682%201.346%208.31082%201%207.62482%201C6.93882%201%206.25282%201.346%205.87282%202.037L0.375823%2012.037C-0.358177%2013.37%200.606823%2015%202.12782%2015H13.1228C14.6428%2015%2015.6078%2013.37%2014.8748%2012.037ZM8.24982%2011.75L7.99982%2012H7.24982L6.99982%2011.75V11L7.24982%2010.75H7.99982L8.24982%2011V11.75ZM8.24982%209.062C8.24982%209.22776%208.18398%209.38673%208.06677%209.50394C7.94955%209.62115%207.79058%209.687%207.62482%209.687C7.45906%209.687%207.30009%209.62115%207.18288%209.50394C7.06567%209.38673%206.99982%209.22776%206.99982%209.062V5.625C6.99982%205.45924%207.06567%205.30027%207.18288%205.18306C7.30009%205.06585%207.45906%205%207.62482%205C7.79058%205%207.94955%205.06585%208.06677%205.18306C8.18398%205.30027%208.24982%205.45924%208.24982%205.625V9.062Z'%20fill='black'/%3e%3c/svg%3e");--message-bar-icon-color:light-dark(#cd411e, #e49c49);align-self:stretch}@media screen and (forced-colors:active){.dialog .mainContainer .messageBar{--message-bar-bg-color:HighlightText;--message-bar-fg-color:CanvasText;--message-bar-border-color:CanvasText;--message-bar-icon-color:CanvasText}}.dialog .mainContainer .messageBar>div:before,.dialog .mainContainer .messageBar>div>div{margin-block:4px}.dialog .mainContainer .messageBar>div>div{display:flex;flex-direction:column;align-items:flex-start;gap:8px;flex:1 0 0}.dialog .mainContainer .messageBar>div>div .title{font-size:13px;font-weight:590}.dialog .mainContainer .messageBar>div>div .description{font-size:13px}.dialog .mainContainer .toggler{display:flex;align-items:center;gap:8px;align-self:stretch}.dialog .mainContainer .toggler>.togglerLabel{-webkit-user-select:none;-moz-user-select:none;user-select:none}.textLayer{color-scheme:only light;position:absolute;text-align:initial;top:0;right:0;bottom:0;left:0;overflow:clip;opacity:1;line-height:1;letter-spacing:normal;word-spacing:normal;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;text-size-adjust:none;forced-color-adjust:none;transform-origin:0 0;caret-color:CanvasText;z-index:0;--min-font-size:1;--text-scale-factor:calc(var(--total-scale-factor) * var(--min-font-size));--min-font-size-inv:calc(1 / var(--min-font-size))}.textLayer.highlighting{touch-action:none}.textLayer :is(span,br){color:transparent;position:absolute;white-space:pre;cursor:text;transform-origin:0% 0%;-webkit-user-select:text;-moz-user-select:text;user-select:text}.textLayer>:not(.markedContent),.textLayer .markedContent span:not(.markedContent){z-index:1;--font-height:0;font-size:calc(var(--text-scale-factor) * var(--font-height));--scale-x:1;--rotate:0deg;transform:rotate(var(--rotate)) scaleX(var(--scale-x)) scale(var(--min-font-size-inv))}.textLayer .markedContent{display:contents}.textLayer span[role=img]{-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:default}.textLayer .highlight{--highlight-bg-color:rgb(180 0 170 / .25);--highlight-selected-bg-color:rgb(0 100 0 / .25);--highlight-backdrop-filter:none;--highlight-selected-backdrop-filter:none;margin:-1px;padding:1px;background-color:var(--highlight-bg-color);-webkit-backdrop-filter:var(--highlight-backdrop-filter);backdrop-filter:var(--highlight-backdrop-filter);border-radius:4px}@media screen and (forced-colors:active){.textLayer .highlight{--highlight-bg-color:transparent;--highlight-selected-bg-color:transparent;--highlight-backdrop-filter:var(--hcm-highlight-filter);--highlight-selected-backdrop-filter:var( --hcm-highlight-selected-filter )}}.textLayer .highlight.appended{position:initial}.textLayer .highlight.begin{border-radius:4px 0 0 4px}.textLayer .highlight.end{border-radius:0 4px 4px 0}.textLayer .highlight.middle{border-radius:0}.textLayer .highlight.selected{background-color:var(--highlight-selected-bg-color);-webkit-backdrop-filter:var(--highlight-selected-backdrop-filter);backdrop-filter:var(--highlight-selected-backdrop-filter);scroll-margin-top:50px}.textLayer ::-moz-selection{background:#0000ff40;background:color-mix(in srgb,AccentColor,transparent 50%);color:transparent}.textLayer ::selection{background:#0000ff40;background:color-mix(in srgb,AccentColor,transparent 50%);color:transparent}.textLayer.selectionRendering ::-moz-selection{background:transparent;color:transparent}.textLayer.selectionRendering ::selection{background:transparent;color:transparent}.textLayer br::-moz-selection{background:transparent}.textLayer br::selection{background:transparent}.textLayer .endOfContent{display:block;position:absolute;top:100%;right:0;bottom:0;left:0;z-index:0;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none}.textLayer.selecting .endOfContent{top:0}.textLayerImages{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.textLayerImages canvas{position:absolute;transform-origin:0% 0%}.annotationLayer{color-scheme:only light;--annotation-unfocused-field-background:url("data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);'/></svg>");--annotation-unfocused-field-filter:url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='pdfjsFillableField' x='0%' y='0%' width='100%' height='100%' color-interpolation-filters='sRGB'><feFlood flood-color='rgb(0,54,255)' flood-opacity='0.13' result='f'/><feComposite in='f' in2='SourceGraphic' operator='over'/></filter></svg>#pdfjsFillableField");--input-focus-border-color:Highlight;--input-focus-outline:1px solid Canvas;--input-unfocused-border-color:transparent;--input-disabled-border-color:transparent;--input-hover-border-color:black;--link-outline:none;position:absolute;top:0;left:0;pointer-events:none;transform-origin:0 0}@media screen and (forced-colors:active){.annotationLayer{--input-focus-border-color:CanvasText;--input-unfocused-border-color:ActiveText;--input-disabled-border-color:GrayText;--input-hover-border-color:Highlight;--link-outline:1.5px solid LinkText}.annotationLayer .textWidgetAnnotation :is(input,textarea):required,.annotationLayer .choiceWidgetAnnotation select:required,.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) input:required{outline:1.5px solid selectedItem}.annotationLayer .linkAnnotation{outline:var(--link-outline)}.annotationLayer .linkAnnotation:hover{-webkit-backdrop-filter:var(--hcm-highlight-filter);backdrop-filter:var(--hcm-highlight-filter)}.annotationLayer .linkAnnotation>a:hover{opacity:0!important;background:none!important;box-shadow:none}.annotationLayer .popupAnnotation .popup{outline:calc(1.5px * var(--total-scale-factor)) solid CanvasText!important;background-color:ButtonFace!important;color:ButtonText!important}.annotationLayer .highlightArea:hover:after{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-backdrop-filter:var(--hcm-highlight-filter);backdrop-filter:var(--hcm-highlight-filter);content:"";pointer-events:none}.annotationLayer .popupAnnotation.focused .popup{outline:calc(3px * var(--total-scale-factor)) solid Highlight!important}}.annotationLayer[data-main-rotation="90"] .norotate{transform:rotate(270deg) translate(-100%)}.annotationLayer[data-main-rotation="180"] .norotate{transform:rotate(180deg) translate(-100%,-100%)}.annotationLayer[data-main-rotation="270"] .norotate{transform:rotate(90deg) translateY(-100%)}.annotationLayer.disabled section,.annotationLayer.disabled .popup{pointer-events:none}.annotationLayer .annotationContent{position:absolute;width:100%;height:100%;pointer-events:none}.annotationLayer .annotationContent.freetext{background:transparent;border:none;top:0;right:0;bottom:0;left:0;overflow:visible;white-space:nowrap;font:10px sans-serif;line-height:1.35}.annotationLayer section{position:absolute;text-align:initial;pointer-events:auto;box-sizing:border-box;transform-origin:0 0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.annotationLayer section:has(div.annotationContent) canvas.annotationContent{display:none}.annotationLayer section .overlaidText{position:absolute;top:0;left:0;width:0;height:0;display:inline-block;overflow:hidden}.annotationLayer .hasOwnCanvas:not(.sandboxModified) :is(input,textarea){display:none}.annotationLayer .hasOwnCanvas.sandboxModified canvas.annotationContent{display:none}.textLayer.selecting~.annotationLayer section{pointer-events:none}.annotationLayer :is(.linkAnnotation,.buttonWidgetAnnotation.pushButton)>a{position:absolute;font-size:1em;top:0;left:0;width:100%;height:100%}.annotationLayer :is(.linkAnnotation,.buttonWidgetAnnotation.pushButton):not(.hasBorder)>a:hover{opacity:.2;background-color:#ff0}.annotationLayer .linkAnnotation.hasBorder:hover{background-color:#ff03}.annotationLayer .hasBorder{background-size:100% 100%}.annotationLayer .textAnnotation img{position:absolute;cursor:pointer;width:100%;height:100%;top:0;left:0}.annotationLayer .textWidgetAnnotation :is(input,textarea),.annotationLayer .choiceWidgetAnnotation select,.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) input{background-image:var(--annotation-unfocused-field-background);border:2px solid var(--input-unfocused-border-color);box-sizing:border-box;font:calc(9px * var(--total-scale-factor)) sans-serif;height:100%;margin:0;vertical-align:top;width:100%}.annotationLayer .textWidgetAnnotation :is(input,textarea):required,.annotationLayer .choiceWidgetAnnotation select:required,.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) input:required{outline:1.5px solid red}.annotationLayer .choiceWidgetAnnotation select option{padding:0}.annotationLayer .textWidgetAnnotation textarea{resize:none}.annotationLayer .textWidgetAnnotation :is(input,textarea)[disabled],.annotationLayer .choiceWidgetAnnotation select[disabled],.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) input[disabled]{background:none;border:2px solid var(--input-disabled-border-color);cursor:not-allowed}.annotationLayer .textWidgetAnnotation :is(input,textarea):hover,.annotationLayer .choiceWidgetAnnotation select:hover,.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) input:hover{border:2px solid var(--input-hover-border-color)}.annotationLayer .textWidgetAnnotation :is(input,textarea):hover,.annotationLayer .choiceWidgetAnnotation select:hover,.annotationLayer .buttonWidgetAnnotation.checkBox input:hover{border-radius:2px}.annotationLayer .textWidgetAnnotation :is(input,textarea):focus,.annotationLayer .choiceWidgetAnnotation select:focus{background:none;border:2px solid var(--input-focus-border-color);border-radius:2px;outline:var(--input-focus-outline)}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) :focus{background-image:none;background-color:transparent}.annotationLayer .buttonWidgetAnnotation.checkBox :focus{border:2px solid var(--input-focus-border-color);border-radius:2px;outline:var(--input-focus-outline)}.annotationLayer .buttonWidgetAnnotation.radioButton :focus{border:2px solid var(--input-focus-border-color);outline:var(--input-focus-outline)}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) [data-canvas-name]{filter:var(--annotation-unfocused-field-filter)}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton):focus-within [data-canvas-name]{filter:none}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) [data-canvas-name=checked]:has(~input:checked){display:block}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) [data-canvas-name=checked]:has(~input:not(:checked)){display:none}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) [data-canvas-name=unchecked]:has(~input:checked){display:none}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) [data-canvas-name=unchecked]:has(~input:not(:checked)){display:block}.annotationLayer .textWidgetAnnotation input.comb{--comb-width:0px;--comb-letter-spacing:calc(var(--comb-width) - 1ch);font-family:monospace;letter-spacing:var(--comb-letter-spacing);overflow-x:hidden;padding:0;text-indent:calc(var(--comb-offset, 0) * var(--comb-width) + var(--comb-letter-spacing) / 2)}.annotationLayer .textWidgetAnnotation input.comb:focus{background-image:repeating-linear-gradient(to right,transparent 0 calc(var(--comb-width) - 1px),var(--input-focus-border-color) calc(var(--comb-width) - 1px) var(--comb-width))}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton) input{-webkit-appearance:none;-moz-appearance:none;appearance:none}.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton):has([data-canvas-name=checked]) input:checked,.annotationLayer .buttonWidgetAnnotation:is(.checkBox,.radioButton):has([data-canvas-name=unchecked]) input:not(:checked){background-image:none}.annotationLayer .fileAttachmentAnnotation .popupTriggerArea{height:100%;width:100%}.annotationLayer .mediaAnnotation{pointer-events:auto}.annotationLayer .mediaAnnotation .mediaContent{width:100%}.annotationLayer .mediaAnnotation video.mediaContent{height:100%;-o-object-fit:contain;object-fit:contain}.annotationLayer .mediaAnnotation audio.mediaContent{position:absolute;bottom:0}.annotationLayer .mediaAnnotation .mediaPlayButton{height:100%;width:100%;margin:0;padding:0;border:none;cursor:pointer;background-color:transparent;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='rgba(0,0,0,0.55)'/%3E%3Cpath d='M40 32 L70 50 L40 68 Z' fill='white'/%3E%3C/svg%3E");background-position:center;background-repeat:no-repeat;background-size:calc(48px * var(--total-scale-factor))}.annotationLayer .mediaAnnotation .mediaPlayButton:hover{background-color:#ffffff1a}.annotationLayer .popupAnnotation{position:absolute;font-size:calc(9px * var(--total-scale-factor));pointer-events:none;width:-moz-max-content;width:max-content;max-width:45%;height:auto}.annotationLayer .popup{background-color:#ff9;color:#000;box-shadow:0 calc(2px * var(--total-scale-factor)) calc(5px * var(--total-scale-factor)) #888;border-radius:calc(2px * var(--total-scale-factor));outline:1.5px solid rgb(255 255 74);padding:calc(6px * var(--total-scale-factor));cursor:pointer;font:message-box;white-space:normal;word-wrap:break-word;pointer-events:auto;-webkit-user-select:text;-moz-user-select:text;user-select:text}.annotationLayer .popupAnnotation.focused .popup{outline-width:3px}.annotationLayer .popup *{font-size:calc(9px * var(--total-scale-factor))}.annotationLayer .popup>.header{display:inline-block}.annotationLayer .popup>.header>.title{display:inline;font-weight:700}.annotationLayer .popup>.header .popupDate{display:inline-block;margin-left:calc(5px * var(--total-scale-factor));width:-moz-fit-content;width:fit-content}.annotationLayer .popupContent{border-top:1px solid rgb(51 51 51);margin-top:calc(2px * var(--total-scale-factor));padding-top:calc(2px * var(--total-scale-factor))}.annotationLayer .richText>*{white-space:pre-wrap;font-size:calc(9px * var(--total-scale-factor))}.annotationLayer .popupTriggerArea{cursor:pointer}.annotationLayer .popupTriggerArea:hover{-webkit-backdrop-filter:var(--hcm-highlight-filter);backdrop-filter:var(--hcm-highlight-filter)}.annotationLayer section svg{position:absolute;width:100%;height:100%;top:0;left:0}.annotationLayer .annotationTextContent{position:absolute;width:100%;height:100%;opacity:0;color:transparent;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none}.annotationLayer .annotationTextContent span{width:100%;display:inline-block}.annotationLayer svg.quadrilateralsContainer{contain:strict;width:0;height:0;position:absolute;top:0;left:0;z-index:-1}:root{--xfa-unfocused-field-background:url("data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);'/></svg>");--xfa-focus-outline:auto}@media screen and (forced-colors:active){:root{--xfa-focus-outline:2px solid CanvasText}.xfaLayer *:required{outline:1.5px solid selectedItem}}.xfaLayer{color-scheme:only light;background-color:transparent}.xfaLayer .highlight{margin:-1px;padding:1px;background-color:#efcbed;border-radius:4px}.xfaLayer .highlight.appended{position:initial}.xfaLayer .highlight.begin{border-radius:4px 0 0 4px}.xfaLayer .highlight.end{border-radius:0 4px 4px 0}.xfaLayer .highlight.middle{border-radius:0}.xfaLayer .highlight.selected{background-color:#cbdfcb}.xfaPage{overflow:hidden;position:relative}.xfaContentarea{position:absolute}.xfaPrintOnly{display:none}.xfaLayer{position:absolute;text-align:initial;top:0;left:0;transform-origin:0 0;line-height:1.2}.xfaLayer *{color:inherit;font:inherit;font-style:inherit;font-weight:inherit;font-kerning:inherit;letter-spacing:-.01px;text-align:inherit;text-decoration:inherit;box-sizing:border-box;background-color:transparent;padding:0;margin:0;pointer-events:auto;line-height:inherit}.xfaLayer *:required{outline:1.5px solid red}.xfaLayer div,.xfaLayer svg,.xfaLayer svg *{pointer-events:none}.xfaLayer a{color:#00f}.xfaRich li{margin-left:3em}.xfaFont{color:#000;font-weight:400;font-kerning:none;font-size:10px;font-style:normal;letter-spacing:0;text-decoration:none;vertical-align:0}.xfaCaption{overflow:hidden;flex:0 0 auto}.xfaCaptionForCheckButton{overflow:hidden;flex:1 1 auto}.xfaLabel{height:100%;width:100%}.xfaLeft{display:flex;flex-direction:row;align-items:center}.xfaRight{display:flex;flex-direction:row-reverse;align-items:center}:is(.xfaLeft,.xfaRight)>:is(.xfaCaption,.xfaCaptionForCheckButton){max-height:100%}.xfaTop{display:flex;flex-direction:column;align-items:flex-start}.xfaBottom{display:flex;flex-direction:column-reverse;align-items:flex-start}:is(.xfaTop,.xfaBottom)>:is(.xfaCaption,.xfaCaptionForCheckButton){width:100%}.xfaBorder{background-color:transparent;position:absolute;pointer-events:none}.xfaWrapped{width:100%;height:100%}:is(.xfaTextfield,.xfaSelect):focus{background-image:none;background-color:transparent;outline:var(--xfa-focus-outline);outline-offset:-1px}:is(.xfaCheckbox,.xfaRadio):focus{outline:var(--xfa-focus-outline)}.xfaTextfield,.xfaSelect{height:100%;width:100%;flex:1 1 auto;border:none;resize:none;background-image:var(--xfa-unfocused-field-background)}.xfaSelect{padding-inline:2px}:is(.xfaTop,.xfaBottom)>:is(.xfaTextfield,.xfaSelect){flex:0 1 auto}.xfaButton{cursor:pointer;width:100%;height:100%;border:none;text-align:center}.xfaLink{width:100%;height:100%;position:absolute;top:0;left:0}.xfaCheckbox,.xfaRadio{width:100%;height:100%;flex:0 0 auto;border:none}.xfaRich{white-space:pre-wrap;width:100%;height:100%}.xfaImage{-o-object-position:left top;object-position:left top;-o-object-fit:contain;object-fit:contain;width:100%;height:100%}.xfaLrTb,.xfaRlTb,.xfaTb{display:flex;flex-direction:column;align-items:stretch}.xfaLr{display:flex;flex-direction:row;align-items:stretch}.xfaRl{display:flex;flex-direction:row-reverse;align-items:stretch}.xfaTb>div{justify-content:left}.xfaPosition,.xfaArea{position:relative}.xfaValignMiddle{display:flex;align-items:center}.xfaTable{display:flex;flex-direction:column;align-items:stretch}.xfaTable .xfaRow{display:flex;flex-direction:row;align-items:stretch}.xfaTable .xfaRlRow{display:flex;flex-direction:row-reverse;align-items:stretch;flex:1}.xfaTable .xfaRlRow>div{flex:1}:is(.xfaNonInteractive,.xfaDisabled,.xfaReadOnly) :is(input,textarea){background:initial}@media print{.xfaTextfield,.xfaSelect{background:transparent}.xfaSelect{-webkit-appearance:none;-moz-appearance:none;appearance:none;text-indent:1px;text-overflow:""}}.canvasWrapper svg{transform:none}.canvasWrapper svg.moving{z-index:100000}.canvasWrapper svg.highlight[data-main-rotation="90"] mask,.canvasWrapper svg.highlight[data-main-rotation="90"] use:not(.clip,.mask),.canvasWrapper svg.highlightOutline[data-main-rotation="90"] mask,.canvasWrapper svg.highlightOutline[data-main-rotation="90"] use:not(.clip,.mask){transform:matrix(0,1,-1,0,1,0)}.canvasWrapper svg.highlight[data-main-rotation="180"] mask,.canvasWrapper svg.highlight[data-main-rotation="180"] use:not(.clip,.mask),.canvasWrapper svg.highlightOutline[data-main-rotation="180"] mask,.canvasWrapper svg.highlightOutline[data-main-rotation="180"] use:not(.clip,.mask){transform:matrix(-1,0,0,-1,1,1)}.canvasWrapper svg.highlight[data-main-rotation="270"] mask,.canvasWrapper svg.highlight[data-main-rotation="270"] use:not(.clip,.mask),.canvasWrapper svg.highlightOutline[data-main-rotation="270"] mask,.canvasWrapper svg.highlightOutline[data-main-rotation="270"] use:not(.clip,.mask){transform:matrix(0,-1,1,0,0,1)}.canvasWrapper svg.draw{position:absolute;mix-blend-mode:normal}.canvasWrapper svg.draw[data-draw-rotation="90"]{transform:rotate(90deg)}.canvasWrapper svg.draw[data-draw-rotation="180"]{transform:rotate(180deg)}.canvasWrapper svg.draw[data-draw-rotation="270"]{transform:rotate(270deg)}.canvasWrapper svg.highlight{--blend-mode:multiply;position:absolute;mix-blend-mode:var(--blend-mode)}@media screen and (forced-colors:active){.canvasWrapper svg.highlight{--blend-mode:difference}}.canvasWrapper svg.highlight:not(.free){fill-rule:evenodd}.canvasWrapper svg.highlightOutline{position:absolute;mix-blend-mode:normal;fill-rule:evenodd;fill:none}.canvasWrapper svg.highlightOutline:not(.free).hovered:not(.selected){stroke:var(--hover-outline-color);stroke-width:var(--outline-width)}.canvasWrapper svg.highlightOutline:not(.free).selected .mainOutline{stroke:var(--outline-around-color);stroke-width:calc(var(--outline-width) + 2 * var(--outline-around-width))}.canvasWrapper svg.highlightOutline:not(.free).selected .secondaryOutline{stroke:var(--outline-color);stroke-width:var(--outline-width)}.canvasWrapper svg.highlightOutline.free.hovered:not(.selected){stroke:var(--hover-outline-color);stroke-width:calc(2 * var(--outline-width))}.canvasWrapper svg.highlightOutline.free.selected .mainOutline{stroke:var(--outline-around-color);stroke-width:calc(2 * (var(--outline-width) + var(--outline-around-width)))}.canvasWrapper svg.highlightOutline.free.selected .secondaryOutline{stroke:var(--outline-color);stroke-width:calc(2 * var(--outline-width))}.toggle-button{--toggle-background-color:var( --button-background-color, color-mix(in srgb, currentColor 7%, transparent) );--toggle-background-color-hover:var( --button-background-color-hover, color-mix(in srgb, currentColor 14%, transparent) );--toggle-background-color-active:var( --button-background-color-active, color-mix(in srgb, currentColor 21%, transparent) );--toggle-background-color-pressed:var( --color-accent-primary, light-dark(#0060df, #0df) );--toggle-background-color-pressed-hover:var( --color-accent-primary-hover, light-dark(#0250bb, #80ebff) );--toggle-background-color-pressed-active:var( --color-accent-primary-active, light-dark(#054096, #aaf2ff) );--toggle-border-color:var( --border-color-interactive, light-dark(#8f8f9d, #f9f9fa) );--toggle-border-color-hover:var(--toggle-border-color);--toggle-border-color-active:var(--toggle-border-color);--toggle-border-radius:var(--border-radius-circle, 9999px);--toggle-border-width:var(--border-width, 1px);--toggle-height:var(--size-item-small, 16px);--toggle-width:var(--size-item-large, 32px);--toggle-dot-background-color:var(--toggle-border-color);--toggle-dot-background-color-hover:var(--toggle-dot-background-color);--toggle-dot-background-color-active:var(--toggle-dot-background-color);--toggle-dot-background-color-on-pressed:var( --background-color-canvas, light-dark(white, #1c1b22) );--toggle-dot-margin:1px;--toggle-dot-height:calc( var(--toggle-height) - 2 * var(--toggle-dot-margin) - 2 * var(--toggle-border-width) );--toggle-dot-width:var(--toggle-dot-height);--toggle-dot-transform-x:calc( var(--toggle-width) - 4 * var(--toggle-dot-margin) - var(--toggle-dot-width) );--input-width:var(--toggle-width);-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;border:var(--toggle-border-width) solid var(--toggle-border-color);height:var(--toggle-height);width:var(--toggle-width);border-radius:var(--toggle-border-radius);background-color:var(--toggle-background-color);box-sizing:border-box}.toggle-button:focus-visible{outline:var(--focus-ring-outline);outline-offset:var(--focus-outline-offset, 2px)}.toggle-button:enabled:hover{background-color:var(--toggle-background-color-hover);border-color:var(--toggle-border-color)}.toggle-button:enabled:hover:active{background-color:var(--toggle-background-color-active);border-color:var(--toggle-border-color)}.toggle-button:before{display:block;content:"";background-color:var(--toggle-dot-background-color);height:var(--toggle-dot-height);width:var(--toggle-dot-width);margin:var(--toggle-dot-margin);border-radius:var(--toggle-border-radius);translate:0}.toggle-button[aria-pressed=true]{background-color:var(--toggle-background-color-pressed);border-color:transparent}.toggle-button[aria-pressed=true]:enabled:hover{background-color:var(--toggle-background-color-pressed-hover);border-color:transparent}.toggle-button[aria-pressed=true]:enabled:hover:active{background-color:var(--toggle-background-color-pressed-active);border-color:transparent}.toggle-button[aria-pressed=true]:before{translate:var(--toggle-dot-transform-x);background-color:var(--toggle-dot-background-color-on-pressed)}.toggle-button[aria-pressed=true]:enabled:hover:before,.toggle-button[aria-pressed=true]:enabled:hover:active:before{background-color:var(--toggle-dot-background-color-on-pressed)}.toggle-button[aria-pressed=true]:-moz-locale-dir(rtl):before,.toggle-button[aria-pressed=true]:dir(rtl):before{translate:calc(-1 * var(--toggle-dot-transform-x))}@media(prefers-reduced-motion:no-preference){.toggle-button:before{transition:translate .1s}}@media(prefers-contrast){.toggle-button:enabled:hover{border-color:var(--toggle-border-color-hover)}.toggle-button:enabled:hover:active{border-color:var(--toggle-border-color-active)}.toggle-button[aria-pressed=true]:enabled{border-color:var(--toggle-border-color);position:relative}.toggle-button[aria-pressed=true]:enabled:hover{border-color:var(--toggle-border-color-hover)}.toggle-button[aria-pressed=true]:enabled:hover:active{background-color:var(--toggle-dot-background-color-active);border-color:var(--toggle-dot-background-color-hover)}.toggle-button:enabled:hover:before,.toggle-button:enabled:hover:active:before{background-color:var(--toggle-dot-background-color-hover)}}@media(forced-colors){.toggle-button{--toggle-background-color:var(--button-background-color, ButtonFace);--toggle-background-color-pressed:var(--color-accent-primary, ButtonText);--toggle-background-color-pressed-hover:var( --color-accent-primary-hover, SelectedItem );--toggle-background-color-pressed-active:var( --color-accent-primary-active, SelectedItem );--toggle-border-color:var(--border-color-interactive, ButtonText);--toggle-dot-background-color:var(--color-accent-primary, ButtonText);--toggle-dot-background-color-hover:var( --color-accent-primary-hover, SelectedItem );--toggle-dot-background-color-active:var( --color-accent-primary-active, SelectedItem );--toggle-dot-background-color-on-pressed:var( --button-background-color, ButtonFace );--toggle-border-color-hover:var( --border-color-interactive-hover, SelectedItem );--toggle-border-color-active:var( --border-color-interactive-active, ButtonText )}.toggle-button[aria-pressed=true]:enabled:after{border:1px solid var(--button-background-color, ButtonFace);content:"";position:absolute;height:var(--toggle-height);width:var(--toggle-width);display:block;border-radius:var(--toggle-border-radius);top:-2px;right:-2px;bottom:-2px;left:-2px}.toggle-button[aria-pressed=true]:enabled:hover:active:after{border-color:var(--toggle-border-color-active)}}:root{--clear-signature-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11%203H13.6C14%203%2014.3%203.3%2014.3%203.6C14.3%203.9%2014%204.2%2013.7%204.2H13.3V14C13.3%2015.1%2012.4%2016%2011.3%2016H4.80005C3.70005%2016%202.80005%2015.1%202.80005%2014V4.2H2.40005C2.00005%204.2%201.80005%204%201.80005%203.6C1.80005%203.2%202.00005%203%202.40005%203H5.00005V2C5.00005%200.9%205.90005%200%207.00005%200H9.00005C10.1%200%2011%200.9%2011%202V3ZM6.90005%201.2L6.30005%201.8V3H9.80005V1.8L9.20005%201.2H6.90005ZM11.4%2014.7L12%2014.1V4.2H4.00005V14.1L4.60005%2014.7H11.4ZM7.00005%2012.4C7.00005%2012.7%206.70005%2013%206.40005%2013C6.10005%2013%205.80005%2012.7%205.80005%2012.4V7.6C5.70005%207.3%206.00005%207%206.40005%207C6.80005%207%207.00005%207.3%207.00005%207.6V12.4ZM10.2001%2012.4C10.2001%2012.7%209.90006%2013%209.60006%2013C9.30006%2013%209.00006%2012.7%209.00006%2012.4V7.6C9.00006%207.3%209.30006%207%209.60006%207C9.90006%207%2010.2001%207.3%2010.2001%207.6V12.4Z'%20fill='black'%20/%3e%3c/svg%3e");--signature-bg:var( --background-color-box-info, light-dark(#f9f9fb, #2b2a33) );--signature-hover-bg:var( --button-background-color-hover, light-dark(#f0f0f4, var(--signature-bg)) );--button-signature-bg:transparent;--button-signature-color:var(--main-color);--button-signature-active-bg:light-dark(#cfcfd8, #5b5b66);--button-signature-active-border:none;--button-signature-active-color:var(--button-signature-color);--button-signature-border:none;--button-signature-hover-bg:light-dark(#e0e0e6, #52525e);--button-signature-hover-color:var(--button-signature-color)}@media screen and (forced-colors:active){:root{--signature-bg:HighlightText;--signature-hover-bg:var(--signature-bg);--button-signature-bg:HighlightText;--button-signature-color:ButtonText;--button-signature-active-bg:ButtonText;--button-signature-active-color:HighlightText;--button-signature-border:1px solid ButtonText;--button-signature-hover-bg:Highlight;--button-signature-hover-color:HighlightText}}.signatureDialog{--primary-color:var(--text-primary-color);--signature-border-color:var(--border-color-interactive, #8f8f9d);--open-link-fg:var(--link-fg-color);--open-link-hover-fg:var(--link-hover-fg-color);width:570px;max-width:100%;min-width:300px;padding:16px 0}@media screen and (forced-colors:active){.signatureDialog{--primary-color:ButtonText;--signature-border-color:var(--border-color-interactive, ButtonText);--open-link-fg:ButtonText;--open-link-hover-fg:ButtonText}}.signatureDialog .mainContainer{width:100%;display:flex;flex-direction:column;align-items:flex-start;gap:12px}.signatureDialog .mainContainer span:not([role=sectionhead]){font-size:13px;font-style:normal;font-weight:400;line-height:normal}.signatureDialog .mainContainer .title{margin-inline-start:16px}.signatureDialog .inputWithClearButton{--button-dimension:24px;--clear-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.85822%208.84922L4.85322%2011.8542C4.75891%2011.9453%204.63261%2011.9957%204.50151%2011.9946C4.37042%2011.9934%204.24501%2011.9408%204.15231%2011.8481C4.0596%2011.7554%204.00702%2011.63%204.00588%2011.4989C4.00474%2011.3678%204.05514%2011.2415%204.14622%2011.1472L7.15122%208.14222V7.85922L4.14622%204.85322C4.05514%204.75891%204.00474%204.63261%204.00588%204.50151C4.00702%204.37042%204.0596%204.24501%204.15231%204.15231C4.24501%204.0596%204.37042%204.00702%204.50151%204.00588C4.63261%204.00474%204.75891%204.05514%204.85322%204.14622L7.85822%207.15122H8.14122L11.1462%204.14622C11.2405%204.05514%2011.3668%204.00474%2011.4979%204.00588C11.629%204.00702%2011.7544%204.0596%2011.8471%204.15231C11.9398%204.24501%2011.9924%204.37042%2011.9936%204.50151C11.9947%204.63261%2011.9443%204.75891%2011.8532%204.85322L8.84822%207.85922V8.14222L11.8532%2011.1472C11.9443%2011.2415%2011.9947%2011.3678%2011.9936%2011.4989C11.9924%2011.63%2011.9398%2011.7554%2011.8471%2011.8481C11.7544%2011.9408%2011.629%2011.9934%2011.4979%2011.9946C11.3668%2011.9957%2011.2405%2011.9453%2011.1462%2011.8542L8.14122%208.84922L8.14222%208.85022L7.85822%208.84922Z'%20fill='black'/%3e%3c/svg%3e");width:100%;position:relative;display:flex;align-items:center;justify-content:center}.signatureDialog .inputWithClearButton>input{width:100%;height:var(--size-item-large, 32px);padding-inline:8px calc(4px + var(--button-dimension));box-sizing:border-box;border-radius:var(--border-radius-small, 4px);border:1px solid var(--signature-border-color)}.signatureDialog .inputWithClearButton .clearInputButton{position:absolute;inset-block-start:4px;inset-inline-end:4px;display:inline-block;width:var(--button-dimension);height:var(--button-dimension);background-color:var(--input-text-fg-color);-webkit-mask-size:cover;mask-size:cover;-webkit-mask-image:var(--clear-button-icon);mask-image:var(--clear-button-icon);padding:0;border:0}#addSignatureDialog{--secondary-color:var(--text-secondary-color);--bg-hover:var( --button-background-color-hover, light-dark(#e0e0e6, #52525e) );--tab-top-line-active-color:var( --color-accent-primary, light-dark(#0060df, #0df) );--tab-top-line-active-hover-color:var(--tab-text-hover-color);--tab-top-line-hover-color:var(--border-color-interactive, #8f8f9d);--tab-top-line-inactive-color:light-dark(#cfcfd8, #8f8f9d);--tab-bottom-line-active-color:var(--tab-top-line-inactive-color);--tab-bottom-line-hover-color:var(--tab-top-line-inactive-color);--tab-bottom-line-inactive-color:var(--tab-top-line-inactive-color);--tab-bg:var(--dialog-bg-color);--tab-bg-active-color:var(--tab-bg);--tab-bg-active-hover-color:var(--bg-hover);--tab-bg-hover:var(--bg-hover);--tab-panel-border:none;--tab-panel-border-radius:var(--border-radius-small, 4px);--tab-text-color:var(--primary-color);--tab-text-active-color:var(--tab-top-line-active-color);--tab-text-active-hover-color:var(--tab-text-hover-color);--tab-text-hover-color:var(--tab-text-color);--signature-placeholder-color:var(--secondary-color);--signature-draw-placeholder-color:var(--primary-color);--signature-color:var(--primary-color);--save-warning-color:var(--secondary-color);--thickness-bg:var(--dialog-bg-color);--thickness-label-color:var(--primary-color);--thickness-slider-color:var(--primary-color);--thickness-border:none;--draw-cursor:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0.0189877%2013.6645L0.612989%2010.4635C0.687989%2010.0545%200.884989%209.6805%201.18099%209.3825L9.98199%200.5805C10.756%20-0.1925%2012.015%20-0.1945%2012.792%200.5805L14.42%202.2085C15.194%202.9835%2015.194%204.2435%2014.42%205.0185L5.61599%2013.8215C5.31999%2014.1165%204.94599%2014.3125%204.53799%2014.3875L1.33599%2014.9815C1.26599%2014.9935%201.19799%2015.0005%201.12999%2015.0005C0.832989%2015.0005%200.544988%2014.8835%200.330988%2014.6695C0.0679874%2014.4055%20-0.0490122%2014.0305%200.0189877%2013.6645Z'%20fill='white'/%3e%3cpath%20d='M0.0189877%2013.6645L0.612989%2010.4635C0.687989%2010.0545%200.884989%209.6805%201.18099%209.3825L9.98199%200.5805C10.756%20-0.1925%2012.015%20-0.1945%2012.792%200.5805L14.42%202.2085C15.194%202.9835%2015.194%204.2435%2014.42%205.0185L5.61599%2013.8215C5.31999%2014.1165%204.94599%2014.3125%204.53799%2014.3875L1.33599%2014.9815C1.26599%2014.9935%201.19799%2015.0005%201.12999%2015.0005C0.832989%2015.0005%200.544988%2014.8835%200.330988%2014.6695C0.0679874%2014.4055%20-0.0490122%2014.0305%200.0189877%2013.6645ZM12.472%205.1965L13.632%204.0365L13.631%203.1885L11.811%201.3675L10.963%201.3685L9.80299%202.5285L12.472%205.1965ZM4.31099%2013.1585C4.47099%2013.1285%204.61799%2013.0515%204.73399%2012.9345L11.587%206.0815L8.91899%203.4135L2.06599%2010.2655C1.94899%2010.3835%201.87199%2010.5305%201.84099%2010.6915L1.36699%2013.2485L1.75199%2013.6335L4.31099%2013.1585Z'%20fill='black'/%3e%3c/svg%3e") 0 16, pointer}@media screen and (forced-colors:active){#addSignatureDialog{--secondary-color:ButtonText;--bg:HighlightText;--bg-hover:var(--bg);--tab-top-line-active-color:var(--color-accent-primary, ButtonText);--tab-top-line-active-hover-color:HighlightText;--tab-top-line-hover-color:var(--border-color-interactive, SelectedItem);--tab-top-line-inactive-color:ButtonText;--tab-bottom-line-active-color:var(--tab-top-line-active-color);--tab-bottom-line-hover-color:var(--tab-top-line-hover-color);--tab-bg:var(--bg);--tab-bg-active-color:SelectedItem;--tab-bg-active-hover-color:SelectedItem;--tab-panel-border:1px solid ButtonText;--tab-panel-border-radius:8px;--tab-text-color:ButtonText;--tab-text-active-color:HighlightText;--tab-text-active-hover-color:HighlightText;--tab-text-hover-color:SelectedItem;--signature-color:ButtonText;--thickness-bg:Canvas;--thickness-label-color:CanvasText;--thickness-slider-color:ButtonText;--thickness-border:1px solid var(--signature-border-color)}}#addSignatureDialog #addSignatureDialogLabel{overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;width:0;height:0}#addSignatureDialog.waiting:after{content:"";cursor:wait;position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%}#addSignatureDialog .mainContainer [role=tablist]{width:100%;display:flex;align-items:flex-start;gap:0}#addSignatureDialog .mainContainer [role=tablist]>[role=tab]{flex:1 0 0;align-self:stretch;background-color:var(--tab-bg);padding-inline:0;cursor:default;border-inline:0;border-block-width:1px;border-block-style:solid;border-block-start-color:var(--tab-top-line-inactive-color);border-block-end-color:var(--tab-bottom-line-inactive-color);border-radius:0;font:menu;font-size:13px;font-style:normal;line-height:normal;font-weight:400;color:var(--tab-text-color)}#addSignatureDialog .mainContainer [role=tablist]>[role=tab]:hover{border-block-start-width:2px;border-block-start-color:var(--tab-top-line-hover-color);border-block-end-color:var(--tab-bottom-line-hover-color);background-color:var(--tab-bg-hover);color:var(--tab-text-hover-color)}#addSignatureDialog .mainContainer [role=tablist]>[role=tab]:focus-visible{outline:2px solid var(--tab-top-line-active-color);outline-offset:-2px}#addSignatureDialog .mainContainer [role=tablist]>[role=tab][aria-selected=true]{border-block-start-width:2px;border-block-start-color:var(--tab-top-line-active-color);border-block-end-color:var(--tab-bottom-line-active-color);background-color:var(--tab-bg-active-color);font-weight:590;color:var(--tab-text-active-color)}#addSignatureDialog .mainContainer [role=tablist]>[role=tab][aria-selected=true]:hover{border-block-start-color:var(--tab-top-line-active-hover-color);background-color:var(--tab-bg-active-hover-color);color:var(--tab-text-active-hover-color)}#addSignatureDialog .mainContainer #addSignatureActionContainer{width:100%;height:auto;display:flex;flex-direction:column;align-items:flex-end;align-self:stretch;gap:12px;padding-inline:16px;box-sizing:border-box}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]{position:relative;width:100%;height:220px;background-color:var(--signature-bg);border:var(--tab-panel-border);border-radius:var(--tab-panel-border-radius)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]>svg{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;background-color:transparent}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureTypeContainer{display:none}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureTypeContainer #addSignatureTypeInput{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;border:0;padding:0;text-align:center;color:var(--signature-color);background-color:transparent;border-radius:var(--tab-panel-border-radius);font-family:Brush script,Apple Chancery,Segoe script,Freestyle Script,Palace Script MT,Brush Script MT,TK,cursive,serif;font-size:44px;font-style:italic;font-weight:400}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureTypeContainer #addSignatureTypeInput::-moz-placeholder{color:var(--signature-placeholder-color);text-align:center;font:menu;font-style:normal;font-weight:274;font-size:44px;line-height:normal}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureTypeContainer #addSignatureTypeInput::placeholder{color:var(--signature-placeholder-color);text-align:center;font:menu;font-style:normal;font-weight:274;font-size:44px;line-height:normal}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer{display:none}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer>span{position:absolute;top:0;left:0;width:100%;height:100%;display:grid;align-items:center;justify-content:center;background-color:transparent;color:var(--signature-placeholder-color);-webkit-user-select:none;-moz-user-select:none;user-select:none}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer>svg{stroke:var(--signature-color);fill:none;stroke-opacity:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer>svg:hover{cursor:var(--draw-cursor)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness{position:absolute;width:100%;inset-block-end:0;display:grid;align-items:center;justify-content:center;pointer-events:none}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>span{color:var(--signature-draw-placeholder-color)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>div{width:auto;height:auto;display:flex;align-items:center;justify-content:center;gap:8px;padding:6px 8px 7px;margin:0;background-color:var(--thickness-bg);border-radius:4px 4px 0 0;border-inline:var(--thickness-border);border-top:var(--thickness-border);pointer-events:auto;position:relative;top:1px}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>div>label{color:var(--thickness-label-color)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>div>input{width:100px;height:14px;background-color:transparent;border-radius:4.5px;border:0;color:var(--signature-color)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>div>input::-webkit-slider-runnable-track,#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>div>input::-moz-range-track,#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>div>input::-moz-range-progress{background-color:var(--thickness-slider-color)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>div>input::-webkit-slider-thumb,#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureDrawContainer #thickness>div>input::-moz-range-thumb{background-color:var(--thickness-bg)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureImageContainer{display:none}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureImageContainer>svg{stroke:none;stroke-width:0;fill:var(--signature-color);fill-opacity:1}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureImageContainer #addSignatureImagePlaceholder{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureImageContainer #addSignatureImagePlaceholder span{color:var(--signature-placeholder-color)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureImageContainer #addSignatureImagePlaceholder a{color:var(--open-link-fg);text-decoration:underline;cursor:pointer}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureImageContainer #addSignatureImagePlaceholder a:hover{color:var(--open-link-hover-fg)}#addSignatureDialog .mainContainer #addSignatureActionContainer>[role=tabpanel]#addSignatureImageContainer #addSignatureFilePicker{visibility:hidden;position:relative;width:0;height:0}#addSignatureDialog .mainContainer #addSignatureActionContainer[data-selected=type]>#addSignatureTypeContainer,#addSignatureDialog .mainContainer #addSignatureActionContainer[data-selected=draw]>#addSignatureDrawContainer,#addSignatureDialog .mainContainer #addSignatureActionContainer[data-selected=image]>#addSignatureImageContainer{display:block}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:12px;align-self:stretch}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #horizontalContainer{display:flex;align-items:flex-end;gap:16px;align-self:stretch}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #horizontalContainer #addSignatureDescriptionContainer{display:flex;flex-direction:column;align-items:flex-start;gap:4px;flex:1 0 0}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #horizontalContainer #addSignatureDescriptionContainer:has(input:disabled)>label{opacity:.4}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #horizontalContainer #addSignatureDescriptionContainer>label{width:auto}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #horizontalContainer #clearSignatureButton{display:flex;align-items:center}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #horizontalContainer #clearSignatureButton>span{display:flex;height:24px;align-items:center;gap:4px;flex-shrink:0}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #horizontalContainer #clearSignatureButton>span:after{content:"";display:inline-block;width:16px;height:16px;-webkit-mask-image:var(--clear-signature-button-icon);mask-image:var(--clear-signature-button-icon);-webkit-mask-size:cover;mask-size:cover;background-color:currentColor;flex-shrink:0}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #addSignatureSaveContainer{display:grid;grid-template-columns:max-content auto;gap:4px;width:100%}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #addSignatureSaveContainer>input{margin:0}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #addSignatureSaveContainer>input:disabled+label{opacity:.4}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #addSignatureSaveContainer>label{-webkit-user-select:none;-moz-user-select:none;user-select:none}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #addSignatureSaveContainer:not(.fullStorage) #addSignatureSaveWarning{display:none}#addSignatureDialog .mainContainer #addSignatureActionContainer #addSignatureControls #addSignatureSaveContainer.fullStorage #addSignatureSaveWarning{display:block;opacity:1;color:var(--save-warning-color);font-size:11px}#editSignatureDescriptionDialog .mainContainer{padding-inline:16px;box-sizing:border-box}#editSignatureDescriptionDialog .mainContainer .title{margin-inline-start:0}#editSignatureDescriptionDialog .mainContainer #editSignatureDescriptionAndView{width:auto;display:flex;justify-content:flex-end;align-items:flex-start;gap:12px;align-self:stretch}#editSignatureDescriptionDialog .mainContainer #editSignatureDescriptionAndView #editSignatureDescriptionContainer{display:flex;flex-direction:column;align-items:flex-start;gap:4px;flex:1 1 auto}#editSignatureDescriptionDialog .mainContainer #editSignatureDescriptionAndView>svg{width:210px;height:180px;padding:8px;background-color:var(--signature-bg)}#editSignatureDescriptionDialog .mainContainer #editSignatureDescriptionAndView>svg>path{stroke:var(--button-signature-color);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;vector-effect:non-scaling-stroke;fill:none}#editSignatureDescriptionDialog .mainContainer #editSignatureDescriptionAndView>svg>path.contours{fill:var(--button-signature-color);stroke-width:.5px}#editorSignatureParamsToolbar{padding:8px}#editorSignatureParamsToolbar #addSignatureDoorHanger{gap:8px;padding:2px}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer{height:32px;display:flex;justify-content:space-between;align-items:center;align-self:stretch;gap:8px}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer button{border:var(--button-signature-border);border-radius:4px;background-color:var(--button-signature-bg);color:var(--button-signature-color)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer button:hover{background-color:var(--button-signature-hover-bg)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer button:active{border:var(--button-signature-active-border);background-color:var(--button-signature-active-bg);color:var(--button-signature-active-color)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer button:active:before{background-color:var(--button-signature-active-color)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer button:focus-visible{outline:var(--focus-ring-outline)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer button:focus-visible:before{background-color:var(--button-signature-color)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .deleteButton:before{-webkit-mask-image:var(--clear-signature-button-icon);mask-image:var(--clear-signature-button-icon)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton{width:calc(.8 * var(--editor-toolbar-min-width));height:100%;min-height:var(--menuitem-height);aspect-ratio:unset;display:flex;align-items:center;justify-content:flex-start;outline:none;border-radius:4px;box-sizing:border-box;font:message-box;position:relative;flex:1 1 auto;padding:0;gap:8px;text-align:start;white-space:normal;cursor:default;overflow:hidden}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton>svg{display:inline-block;height:100%;aspect-ratio:1;background-color:var(--signature-bg);flex:none;padding:4px;box-sizing:border-box;border:none;border-radius:4px}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton>svg>path{stroke:var(--button-signature-color);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;vector-effect:non-scaling-stroke;fill:none}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton>svg>path.contours{fill:var(--button-signature-color);stroke-width:.5px}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton:is(:hover,:active)>svg{border-radius:4px 0 0 4px;background-color:var(--signature-hover-bg)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton:hover>span{color:var(--button-signature-hover-color)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton:active{background-color:var(--button-signature-active-bg)}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton:is([disabled=disabled],[disabled]){opacity:.5;pointer-events:none}#editorSignatureParamsToolbar #addSignatureDoorHanger .toolbarAddSignatureButtonContainer .toolbarAddSignatureButton>span{height:auto;text-overflow:ellipsis;white-space:nowrap;flex:1 1 auto;font:menu;font-size:13px;font-style:normal;font-weight:400;line-height:normal;overflow:hidden}.editDescription.altText{--alt-text-add-image:url("data:image/svg+xml,%3csvg%20width='16'%20height='17'%20viewBox='0%200%2016%2017'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14.9815%2014.3461L14.3875%2011.1451C14.3125%2010.7361%2014.1155%2010.3621%2013.8195%2010.0641L5.0185%201.26214C4.2445%200.489141%202.9855%200.487141%202.2085%201.26214L0.5805%202.89014C-0.1935%203.66514%20-0.1935%204.92514%200.5805%205.70014L9.3845%2014.5031C9.6805%2014.7981%2010.0545%2014.9941%2010.4625%2015.0691L13.6645%2015.6631C13.7345%2015.6751%2013.8025%2015.6821%2013.8705%2015.6821C14.1675%2015.6821%2014.4555%2015.5651%2014.6695%2015.3511C14.9325%2015.0871%2015.0495%2014.7121%2014.9815%2014.3461ZM2.5285%205.87814L1.3685%204.71814L1.3695%203.87014L3.1895%202.04914L4.0375%202.05014L5.1975%203.21014L2.5285%205.87814ZM10.6895%2013.8401C10.5295%2013.8101%2010.3825%2013.7331%2010.2665%2013.6161L3.4135%206.76314L6.0815%204.09514L12.9345%2010.9471C13.0515%2011.0651%2013.1285%2011.2121%2013.1595%2011.3731L13.6335%2013.9301L13.2485%2014.3151L10.6895%2013.8401Z'%20fill='black'/%3e%3c/svg%3e") !important}.editDescription.altText:before{width:16px!important;height:16px!important}.commentPopup,#commentManagerDialog{width:360px;max-width:100%;min-width:200px;position:absolute;padding:8px 16px 16px;margin-left:0;margin-top:0;box-sizing:border-box;border-radius:8px}#commentManagerDialog{--comment-close-button-icon:url("data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.6241%2011.7759L18.3331%207.06694C18.4423%206.94811%2018.5015%206.79167%2018.4981%206.63028C18.4948%206.46889%2018.4292%206.31502%2018.3152%206.20081C18.2011%206.0866%2018.0473%206.02088%2017.8859%206.01736C17.7245%206.01384%2017.568%206.0728%2017.4491%206.18194L12.7601%2010.8709H12.2721L7.58306%206.18294C7.52495%206.12489%207.45598%206.07886%207.38008%206.04747C7.30418%206.01609%207.22284%205.99995%207.14071%206C7.05857%206.00005%206.97725%206.01627%206.90139%206.04774C6.82553%206.07922%206.75661%206.12533%206.69856%206.18344C6.64052%206.24155%206.59449%206.31052%206.5631%206.38642C6.53171%206.46232%206.51558%206.54366%206.51563%206.62579C6.51572%206.79167%206.5817%206.95071%206.69906%207.06794L11.3861%2011.7539V12.2449L6.69906%2016.9319C6.5898%2017.0508%206.53066%2017.2072%206.53399%2017.3686C6.53732%2017.53%206.60288%2017.6839%206.71696%2017.7981C6.83104%2017.9123%206.98483%2017.978%207.14622%2017.9815C7.3076%2017.985%207.46411%2017.9261%207.58306%2017.8169L12.2701%2013.1299H12.7611L17.4481%2017.8169C17.5656%2017.934%2017.7247%2017.9997%2017.8906%2017.9997C18.0564%2017.9997%2018.2155%2017.934%2018.3331%2017.8169C18.4504%2017.6996%2018.5163%2017.5404%2018.5163%2017.3744C18.5163%2017.2085%2018.4504%2017.0493%2018.3331%2016.9319L13.6241%2012.2229V11.7759Z'%20fill='black'/%3e%3c/svg%3e")}#commentManagerDialog .mainContainer{width:100%;height:auto;display:flex;flex-direction:column;align-items:flex-start;gap:4px}#commentManagerDialog .mainContainer #commentManagerToolbar{width:100%;height:32px;display:flex;justify-content:flex-start;align-items:flex-start;gap:8px;align-self:stretch;cursor:move}#commentManagerDialog .mainContainer #commentManagerTextInput{width:100%;min-height:132px;margin-bottom:12px}.annotationLayer.disabled :is(.annotationCommentButton){display:none}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton{color-scheme:light dark;--comment-button-bg:var( --background-color-canvas, light-dark(white, #1c1b22) );--comment-button-fg:light-dark(#5b5b66, #fbfbfe);--comment-button-active-bg:light-dark(#0041a4, #a6ecf4);--comment-button-active-fg:var( --button-text-color-primary, light-dark(white, #15141a) );--comment-button-hover-bg:var( --color-accent-primary-hover, light-dark(#0053cb, #61dce9) );--comment-button-hover-fg:var( --button-text-color-primary, light-dark(white, #15141a) );--comment-button-selected-bg:var( --color-accent-primary, light-dark(#0062fa, #00cadb) );--comment-button-border-color:var( --border-color-interactive, light-dark(#8f8f9d, #bfbfc9) );--comment-button-active-border-color:var(--comment-button-active-bg);--comment-button-focus-border-color:light-dark(#cfcfd8, #3a3944);--comment-button-hover-border-color:var(--comment-button-hover-bg);--comment-button-selected-border-color:var(--comment-button-selected-bg);--comment-button-selected-fg:var( --button-text-color-primary, light-dark(white, #15141a) );--comment-button-dim:24px;--comment-button-box-shadow:0 .25px .75px 0 light-dark(rgb(0 0 0 / .05), rgb(0 0 0 / .2)), 0 2px 6px 0 light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .4));--comment-button-focus-outline-color:var( --focus-outline-color, light-dark(#0062fa, #00cadb) );position:absolute;width:var(--comment-button-dim);height:var(--comment-button-dim);background-color:var(--comment-button-bg);border-radius:6px 6px 6px 0;border:1px solid var(--comment-button-border-color);box-shadow:var(--comment-button-box-shadow);cursor:auto;z-index:1;padding:4px;margin:0;box-sizing:border-box;pointer-events:auto}@media screen and (forced-colors:active){:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton{--comment-button-bg:var(--button-background-color, ButtonFace);--comment-button-fg:var(--button-text-color, ButtonText);--comment-button-hover-bg:var( --button-background-color-hover, SelectedItemText );--comment-button-hover-fg:var(--button-text-color-hover, SelectedItem);--comment-button-active-bg:var( --button-background-color-active, SelectedItemText );--comment-button-active-fg:var(--button-text-color-active, SelectedItem);--comment-button-border-color:var(--button-border-color, ButtonBorder);--comment-button-active-border-color:var( --button-border-color-active, ButtonBorder );--comment-button-hover-border-color:var( --button-border-color-hover, SelectedItem );--comment-button-box-shadow:none;--comment-button-focus-outline-color:var( --focus-outline-color, CanvasText );--comment-button-selected-bg:var( --button-background-color-primary, ButtonBorder );--comment-button-selected-fg:var( --button-text-color-primary, ButtonFace )}}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton:dir(rtl){border-radius:6px 6px 0}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton:before{content:"";display:inline-block;width:100%;height:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:cover;mask-size:cover;-webkit-mask-image:var(--comment-edit-button-icon);mask-image:var(--comment-edit-button-icon);background-color:var(--comment-button-fg);margin:0;padding:0;transform:scaleX(var(--dir-factor))}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton:focus-visible{outline:2px solid var(--comment-button-focus-outline-color);outline-offset:1px;border-color:var(--comment-button-focus-border-color)}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton:hover{background-color:var(--comment-button-hover-bg)!important;border-color:var(--comment-button-hover-border-color)}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton:hover:before{background-color:var(--comment-button-hover-fg)}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton:active{background-color:var(--comment-button-active-bg)!important;border-color:var(--comment-button-active-border-color)}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton:active:before{background-color:var(--comment-button-active-fg)}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton.selected{background-color:var(--comment-button-selected-bg)!important;border-color:var(--comment-button-selected-border-color)}:is(.annotationLayer,.annotationEditorLayer) .annotationCommentButton.selected:before{background-color:var(--comment-button-selected-fg)}#editorCommentsSidebar,.commentPopup{--comment-close-button-icon:url("data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.6241%2011.7759L18.3331%207.06694C18.4423%206.94811%2018.5015%206.79167%2018.4981%206.63028C18.4948%206.46889%2018.4292%206.31502%2018.3152%206.20081C18.2011%206.0866%2018.0473%206.02088%2017.8859%206.01736C17.7245%206.01384%2017.568%206.0728%2017.4491%206.18194L12.7601%2010.8709H12.2721L7.58306%206.18294C7.52495%206.12489%207.45598%206.07886%207.38008%206.04747C7.30418%206.01609%207.22284%205.99995%207.14071%206C7.05857%206.00005%206.97725%206.01627%206.90139%206.04774C6.82553%206.07922%206.75661%206.12533%206.69856%206.18344C6.64052%206.24155%206.59449%206.31052%206.5631%206.38642C6.53171%206.46232%206.51558%206.54366%206.51563%206.62579C6.51572%206.79167%206.5817%206.95071%206.69906%207.06794L11.3861%2011.7539V12.2449L6.69906%2016.9319C6.5898%2017.0508%206.53066%2017.2072%206.53399%2017.3686C6.53732%2017.53%206.60288%2017.6839%206.71696%2017.7981C6.83104%2017.9123%206.98483%2017.978%207.14622%2017.9815C7.3076%2017.985%207.46411%2017.9261%207.58306%2017.8169L12.2701%2013.1299H12.7611L17.4481%2017.8169C17.5656%2017.934%2017.7247%2017.9997%2017.8906%2017.9997C18.0564%2017.9997%2018.2155%2017.934%2018.3331%2017.8169C18.4504%2017.6996%2018.5163%2017.5404%2018.5163%2017.3744C18.5163%2017.2085%2018.4504%2017.0493%2018.3331%2016.9319L13.6241%2012.2229V11.7759Z'%20fill='black'/%3e%3c/svg%3e");--comment-popup-edit-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0.0189877%2013.6645L0.612989%2010.4635C0.687989%2010.0545%200.884989%209.6805%201.18099%209.3825L9.98199%200.5805C10.756%20-0.1925%2012.015%20-0.1945%2012.792%200.5805L14.42%202.2085C15.194%202.9835%2015.194%204.2435%2014.42%205.0185L5.61599%2013.8215C5.31999%2014.1165%204.94599%2014.3125%204.53799%2014.3875L1.33599%2014.9815C1.26599%2014.9935%201.19799%2015.0005%201.12999%2015.0005C0.832989%2015.0005%200.544988%2014.8835%200.330988%2014.6695C0.0679874%2014.4055%20-0.0490122%2014.0305%200.0189877%2013.6645ZM12.472%205.1965L13.632%204.0365L13.631%203.1885L11.811%201.3675L10.963%201.3685L9.80299%202.5285L12.472%205.1965ZM4.31099%2013.1585C4.47099%2013.1285%204.61799%2013.0515%204.73399%2012.9345L11.587%206.0815L8.91899%203.4135L2.06599%2010.2655C1.94899%2010.3835%201.87199%2010.5305%201.84099%2010.6915L1.36699%2013.2485L1.75199%2013.6335L4.31099%2013.1585Z'%20fill='black'/%3e%3c/svg%3e%3c!--path%20d='M0.0189877%2014.1645L0.612989%2010.9635C0.687989%2010.5545%200.884989%2010.1805%201.18099%209.8825L9.98199%201.0805C10.756%200.3075%2012.015%200.3055%2012.792%201.0805L14.42%202.7085C15.194%203.4835%2015.194%204.7435%2014.42%205.5185L5.61599%2014.3215C5.31999%2014.6165%204.94599%2014.8125%204.53799%2014.8875L1.33599%2015.4815C1.26599%2015.4935%201.19799%2015.5005%201.12999%2015.5005C0.832989%2015.5005%200.544988%2015.3835%200.330988%2015.1695C0.0679874%2014.9055%20-0.0490122%2014.5305%200.0189877%2014.1645ZM12.472%205.6965L13.632%204.5365L13.631%203.6885L11.811%201.8675L10.963%201.8685L9.80299%203.0285L12.472%205.6965ZM4.31099%2013.6585C4.47099%2013.6285%204.61799%2013.5515%204.73399%2013.4345L11.587%206.5815L8.91899%203.9135L2.06599%2010.7655C1.94899%2010.8835%201.87199%2011.0305%201.84099%2011.1915L1.36699%2013.7485L1.75199%2014.1335L4.31099%2013.6585Z'%20fill='black'/--%3e");--comment-popup-delete-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11%203H13.6C14%203%2014.3%203.3%2014.3%203.6C14.3%203.9%2014%204.2%2013.7%204.2H13.3V14C13.3%2015.1%2012.4%2016%2011.3%2016H4.80005C3.70005%2016%202.80005%2015.1%202.80005%2014V4.2H2.40005C2.00005%204.2%201.80005%204%201.80005%203.6C1.80005%203.2%202.00005%203%202.40005%203H5.00005V2C5.00005%200.9%205.90005%200%207.00005%200H9.00005C10.1%200%2011%200.9%2011%202V3ZM6.90005%201.2L6.30005%201.8V3H9.80005V1.8L9.20005%201.2H6.90005ZM11.4%2014.7L12%2014.1V4.2H4.00005V14.1L4.60005%2014.7H11.4ZM7.00005%2012.4C7.00005%2012.7%206.70005%2013%206.40005%2013C6.10005%2013%205.80005%2012.7%205.80005%2012.4V7.6C5.70005%207.3%206.00005%207%206.40005%207C6.80005%207%207.00005%207.3%207.00005%207.6V12.4ZM10.2001%2012.4C10.2001%2012.7%209.90006%2013%209.60006%2013C9.30006%2013%209.00006%2012.7%209.00006%2012.4V7.6C9.00006%207.3%209.30006%207%209.60006%207C9.90006%207%2010.2001%207.3%2010.2001%207.6V12.4Z'%20fill='black'%20/%3e%3c/svg%3e");--comment-date-fg-color:light-dark( rgb(21 20 26 / .69), rgb(251 251 254 / .69) );--comment-bg-color:light-dark(#f9f9fb, #1c1b22);--comment-hover-bg-color:light-dark(#e0e0e6, #2c2b33);--comment-active-bg-color:light-dark(#d1d1d9, #3a3944);--comment-hover-brightness:.89;--comment-hover-filter:brightness(var(--comment-hover-brightness));--comment-active-brightness:.825;--comment-active-filter:brightness(var(--comment-active-brightness));--comment-border-color:light-dark(#f0f0f4, #52525e);--comment-focus-outline-color:var( --focus-outline-color, light-dark(#0062fa, #00cadb) );--comment-fg-color:var(--text-color, light-dark(#15141a, #fbfbfe));--comment-count-bg-color:light-dark(#e2f7ff, #00317e);--comment-indicator-active-fg-color:light-dark(#0041a4, #a6ecf4);--comment-indicator-active-filter:brightness( calc(1 / var(--comment-active-brightness)) );--comment-indicator-focus-fg-color:light-dark(#5b5b66, #fbfbfe);--comment-indicator-hover-fg-color:var( --color-accent-primary-hover, light-dark(#0053cb, #61dce9) );--comment-indicator-hover-filter:brightness( calc(1 / var(--comment-hover-brightness)) );--comment-indicator-selected-fg-color:var( --color-accent-primary, light-dark(#0062fa, #00cadb) );--button-comment-bg:transparent;--button-comment-color:var(--main-color);--button-comment-active-bg:light-dark(#cfcfd8, #5b5b66);--button-comment-active-border:none;--button-comment-active-color:var(--button-comment-color);--button-comment-border:none;--button-comment-hover-bg:light-dark(#e0e0e6, #52525e);--button-comment-hover-color:var(--button-comment-color)}@media screen and (forced-colors:active){#editorCommentsSidebar,.commentPopup{--comment-date-fg-color:CanvasText;--comment-bg-color:Canvas;--comment-hover-bg-color:Canvas;--comment-hover-filter:none;--comment-active-bg-color:Canvas;--comment-active-filter:none;--comment-border-color:CanvasText;--comment-fg-color:var(--text-color, CanvasText);--comment-count-bg-color:Canvas;--comment-indicator-active-fg-color:SelectedItem;--comment-indicator-focus-fg-color:var(--text-color, CanvasText);--comment-indicator-hover-fg-color:var(--text-color, CanvasText);--comment-indicator-selected-fg-color:SelectedItem;--button-comment-bg:ButtonFace;--button-comment-color:ButtonText;--button-comment-active-bg:Highlight;--button-comment-active-color:HighlightText;--button-comment-border:1px solid ButtonText;--button-comment-hover-bg:Highlight;--button-comment-hover-color:HighlightText}}#editorCommentsSidebar{display:flex;height:auto;padding-bottom:16px;flex-direction:column;align-items:flex-start;overflow-y:visible}#editorCommentsSidebar #editorCommentsSidebarHeader{width:100%;box-sizing:border-box;padding:16px;display:flex;align-items:center;justify-content:space-between}#editorCommentsSidebar #editorCommentsSidebarHeader .commentCount{display:flex;align-items:baseline;gap:6px;-webkit-user-select:none;-moz-user-select:none;user-select:none}#editorCommentsSidebar #editorCommentsSidebarHeader .commentCount #editorCommentsSidebarTitle{font:menu;font-style:normal;font-weight:590;line-height:normal;font-size:17px;color:var(--comment-fg-color)}#editorCommentsSidebar #editorCommentsSidebarHeader .commentCount #editorCommentsSidebarCount{padding:0 4px;border-radius:4px;background-color:var(--comment-count-bg-color);color:var(--comment-fg-color);text-align:center;font:menu;font-size:13px;font-style:normal;font-weight:400;line-height:normal}#editorCommentsSidebar #editorCommentsSidebarHeader #editorCommentsSidebarCloseButton{width:32px;height:32px;padding:8px;border-radius:4px;border:var(--button-comment-border);background-color:var(--button-comment-bg);cursor:pointer}#editorCommentsSidebar #editorCommentsSidebarHeader #editorCommentsSidebarCloseButton:before{content:"";display:inline-block;width:100%;height:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:var(--comment-close-button-icon);mask-image:var(--comment-close-button-icon);background-color:var(--button-comment-color)}#editorCommentsSidebar #editorCommentsSidebarHeader #editorCommentsSidebarCloseButton:hover{background-color:var(--button-comment-hover-bg)}#editorCommentsSidebar #editorCommentsSidebarHeader #editorCommentsSidebarCloseButton:hover:before{background-color:var(--button-comment-hover-color)}#editorCommentsSidebar #editorCommentsSidebarHeader #editorCommentsSidebarCloseButton:active{border:var(--button-comment-active-border);background-color:var(--button-comment-active-bg)}#editorCommentsSidebar #editorCommentsSidebarHeader #editorCommentsSidebarCloseButton:active:before{background-color:var(--button-comment-active-color)}#editorCommentsSidebar #editorCommentsSidebarHeader #editorCommentsSidebarCloseButton:focus-visible{outline:var(--focus-ring-outline)}#editorCommentsSidebar #editorCommentsSidebarHeader #editorCommentsSidebarCloseButton>span{display:inline-block;width:0;height:0;overflow:hidden}#editorCommentsSidebar #editorCommentsSidebarListContainer{overflow:auto;width:100%}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList{display:flex;width:auto;padding:4px 16px;gap:10px;align-items:flex-start;flex-direction:column;list-style-type:none}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment{display:flex;width:auto;padding:8px 16px 16px;flex-direction:column;align-items:flex-start;align-self:stretch;gap:4px;border-radius:8px;border:.5px solid var(--comment-border-color);background-color:var(--comment-bg-color)}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments):hover{filter:var(--comment-hover-filter)}@media screen and (forced-colors:active){#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments):hover{background-color:var(--comment-hover-bg-color)}}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments):hover time:after{display:inline-block;background-color:var(--comment-indicator-hover-fg-color);filter:var(--comment-indicator-hover-filter)}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments):active{filter:var(--comment-active-filter)}@media screen and (forced-colors:active){#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments):active{background-color:var(--comment-active-bg-color)}}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments):active time:after{display:inline-block;background-color:var(--comment-indicator-active-fg-color);filter:var(--comment-indicator-active-filter)}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments):is(:focus,:focus-visible) time:after{display:inline-block;background-color:var(--comment-indicator-focus-fg-color)}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments):focus-visible{outline:2px solid var(--comment-focus-outline-color);outline-offset:2px}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments).selected .sidebarCommentText{max-height:-moz-fit-content;max-height:fit-content;-webkit-line-clamp:unset}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment:not(.noComments).selected time:after{display:inline-block;background-color:var(--comment-indicator-selected-fg-color)}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment .sidebarCommentText{font:menu;font-style:normal;font-weight:400;line-height:normal;font-size:15px;width:100%;height:-moz-fit-content;height:fit-content;max-height:80px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;overflow-wrap:break-word}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment .sidebarCommentText .richText{--total-scale-factor:1.5}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment.noComments .sidebarCommentText{max-height:-moz-fit-content;max-height:fit-content;-webkit-line-clamp:unset;-webkit-user-select:none;-moz-user-select:none;user-select:none}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment.noComments a{font:menu;font-style:normal;font-weight:400;line-height:normal;font-size:15px;width:100%;height:auto;overflow-wrap:break-word;margin-block-start:15px;color:var(--link-fg-color)}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment.noComments a:focus-visible{outline:var(--focus-ring-outline)}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment.noComments a:hover{color:var(--link-hover-fg-color)}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment time{width:100%;display:inline-flex;align-items:center;justify-content:space-between;font:menu;font-style:normal;font-weight:400;line-height:normal;font-size:13px}#editorCommentsSidebar #editorCommentsSidebarListContainer #editorCommentsSidebarList .sidebarComment time:after{content:"";display:none;width:16px;height:16px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:var(--comment-edit-button-icon);mask-image:var(--comment-edit-button-icon);transform:scaleX(var(--dir-factor))}.commentPopup{color-scheme:light dark;--divider-color:light-dark(#cfcfd8, #3a3944);--comment-shadow:0 .5px 2px 0 light-dark(rgb(0 0 0 / .05), rgb(0 0 0 / .2)), 0 4px 16px 0 light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .4));display:flex;flex-direction:column;align-items:flex-start;gap:12px;z-index:100001;pointer-events:auto;margin-top:2px;border:.5px solid var(--comment-border-color);background:var(--comment-bg-color);box-shadow:var(--comment-shadow)}@media screen and (forced-colors:active){.commentPopup{--divider-color:CanvasText;--comment-shadow:none}}.commentPopup:focus-visible{outline:none}.commentPopup.dragging,.commentPopup.dragging *{cursor:move!important}.commentPopup.dragging button{pointer-events:none!important}.commentPopup:not(.selected) .commentPopupButtons{visibility:hidden!important}.commentPopup hr{width:100%;height:1px;border:none;border-top:1px solid var(--divider-color);margin:0;padding:0}.commentPopup .commentPopupTop{display:flex;width:100%;height:auto;padding-bottom:4px;justify-content:space-between;align-items:center;align-self:stretch;cursor:move;-webkit-user-select:none;-moz-user-select:none;user-select:none}.commentPopup .commentPopupTop .commentPopupTime{font:menu;font-style:normal;font-weight:400;line-height:normal;font-size:13px;color:var(--comment-date-fg-color)}.commentPopup .commentPopupTop .commentPopupButtons{display:flex;align-items:center;gap:2px;cursor:default}.commentPopup .commentPopupTop .commentPopupButtons>button{width:32px;height:32px;padding:8px;border:var(--button-comment-border);border-radius:4px;background-color:var(--button-comment-bg);color:var(--button-comment-color)}.commentPopup .commentPopupTop .commentPopupButtons>button:hover{background-color:var(--button-comment-hover-bg)}.commentPopup .commentPopupTop .commentPopupButtons>button:hover:before{background-color:var(--button-comment-hover-color)}.commentPopup .commentPopupTop .commentPopupButtons>button:active{border:var(--button-comment-active-border);background-color:var(--button-comment-active-bg);color:var(--button-comment-active-color)}.commentPopup .commentPopupTop .commentPopupButtons>button:active:before{background-color:var(--button-comment-active-color)}.commentPopup .commentPopupTop .commentPopupButtons>button:focus-visible{background-color:var(--button-comment-hover-bg);outline:2px solid var(--comment-focus-outline-color);outline-offset:0}.commentPopup .commentPopupTop .commentPopupButtons>button:before{content:"";display:inline-block;width:100%;height:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center}.commentPopup .commentPopupTop .commentPopupButtons>button.commentPopupEdit:before{-webkit-mask-image:var(--comment-popup-edit-button-icon);mask-image:var(--comment-popup-edit-button-icon)}.commentPopup .commentPopupTop .commentPopupButtons>button.commentPopupDelete:before{-webkit-mask-image:var(--comment-popup-delete-button-icon);mask-image:var(--comment-popup-delete-button-icon)}.commentPopup .commentPopupText{width:100%;height:auto;font:menu;font-style:normal;font-weight:400;line-height:normal;font-size:15px;color:var(--comment-fg-color)}.commentPopupText,.sidebarCommentText .richText{margin-block:0}.commentPopupText p:first-of-type,.sidebarCommentText .richText p:first-of-type{margin-block:0}.commentPopupText>*,.sidebarCommentText .richText>*{white-space:pre-wrap;font-size:max(15px,calc(10px * var(--total-scale-factor)));overflow-wrap:break-word}.commentPopupText span,.sidebarCommentText .richText span{color:var(--comment-fg-color)!important}:root{--editor-toolbar-vert-offset:6px;--outline-width:2px;--outline-color:var(--color-blue-60, #0060df);--outline-around-width:1px;--outline-around-color:var(--color-gray-20, #f0f0f4);--hover-outline-around-color:var(--outline-around-color);--editor-selection-outline:solid var(--outline-width) var(--outline-color);--unfocus-outline:solid var(--outline-width) transparent;--focus-outline-around:solid var(--outline-around-width) var(--outline-around-color);--hover-outline-color:var(--color-gray-60, #8f8f9d);--hover-outline:solid var(--outline-width) var(--hover-outline-color);--hover-outline-around:solid var(--outline-around-width) var(--hover-outline-around-color);--freetext-line-height:1.35;--freetext-padding:2px;--resizer-bg-color:var(--outline-color);--resizer-size:6px;--resizer-shift:calc( 0px - (var(--outline-width) + var(--resizer-size)) / 2 - var(--outline-around-width) );--editorFreeText-editing-cursor:text;--editorInk-editing-cursor:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0.0189877%2013.6645L0.612989%2010.4635C0.687989%2010.0545%200.884989%209.6805%201.18099%209.3825L9.98199%200.5805C10.756%20-0.1925%2012.015%20-0.1945%2012.792%200.5805L14.42%202.2085C15.194%202.9835%2015.194%204.2435%2014.42%205.0185L5.61599%2013.8215C5.31999%2014.1165%204.94599%2014.3125%204.53799%2014.3875L1.33599%2014.9815C1.26599%2014.9935%201.19799%2015.0005%201.12999%2015.0005C0.832989%2015.0005%200.544988%2014.8835%200.330988%2014.6695C0.0679874%2014.4055%20-0.0490122%2014.0305%200.0189877%2013.6645Z'%20fill='white'/%3e%3cpath%20d='M0.0189877%2013.6645L0.612989%2010.4635C0.687989%2010.0545%200.884989%209.6805%201.18099%209.3825L9.98199%200.5805C10.756%20-0.1925%2012.015%20-0.1945%2012.792%200.5805L14.42%202.2085C15.194%202.9835%2015.194%204.2435%2014.42%205.0185L5.61599%2013.8215C5.31999%2014.1165%204.94599%2014.3125%204.53799%2014.3875L1.33599%2014.9815C1.26599%2014.9935%201.19799%2015.0005%201.12999%2015.0005C0.832989%2015.0005%200.544988%2014.8835%200.330988%2014.6695C0.0679874%2014.4055%20-0.0490122%2014.0305%200.0189877%2013.6645ZM12.472%205.1965L13.632%204.0365L13.631%203.1885L11.811%201.3675L10.963%201.3685L9.80299%202.5285L12.472%205.1965ZM4.31099%2013.1585C4.47099%2013.1285%204.61799%2013.0515%204.73399%2012.9345L11.587%206.0815L8.91899%203.4135L2.06599%2010.2655C1.94899%2010.3835%201.87199%2010.5305%201.84099%2010.6915L1.36699%2013.2485L1.75199%2013.6335L4.31099%2013.1585Z'%20fill='black'/%3e%3c/svg%3e") 0 16, pointer;--editorHighlight-editing-cursor:url(` + new URL("cursor-editorTextHighlight-kG3uUOwL.svg", import.meta.url).href + `) 24 24, text;--editorFreeHighlight-editing-cursor:url("data:image/svg+xml,%3csvg%20width='18'%20height='19'%20viewBox='0%200%2018%2019'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%203.09C12.28%203.01%2012.43%203%2012.43%203C12.48%203%2012.58%203.02%2012.66%203.1L14.45%204.89C14.58%205.02%2014.58%205.22%2014.45%205.35L11.7713%208.02872L9.51628%205.77372L12.2%203.09ZM13.2658%205.12L11.7713%206.6145L10.9305%205.77372L12.425%204.27921L13.2658%205.12Z'%20fill='%23FBFBFE'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.98%209.32L8.23%2011.57L10.7106%209.08938L8.45562%206.83438L5.98%209.31V9.32ZM8.23%2010.1558L9.29641%209.08938L8.45562%208.24859L7.38921%209.315L8.23%2010.1558Z'%20fill='%23FBFBFE'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.1526%2013.1816L16.2125%207.1217C16.7576%206.58919%2017.05%205.8707%2017.05%205.12C17.05%204.36931%2016.7576%203.65084%2016.2126%203.11834L14.4317%201.33747C13.8992%200.79242%2013.1807%200.5%2012.43%200.5C11.6643%200.5%2010.9529%200.812929%2010.4329%201.33289L3.68289%208.08289C3.04127%208.72452%203.00459%209.75075%203.57288%2010.4363L1.29187%2012.7239C1.09186%2012.9245%200.990263%2013.1957%201.0007%2013.4685L1%2014.5C0.447715%2014.5%200%2014.9477%200%2015.5V17.5C0%2018.0523%200.447715%2018.5%201%2018.5H16C16.5523%2018.5%2017%2018.0523%2017%2017.5V15.5C17%2014.9477%2016.5523%2014.5%2016%2014.5H10.2325C9.83594%2014.5%209.39953%2013.9347%2010.1526%2013.1816ZM4.39%209.85L4.9807%2010.4407L2.39762%2013.0312H6.63877L7.10501%2012.565L7.57125%2013.0312H8.88875L15.51%206.41C15.86%206.07%2016.05%205.61%2016.05%205.12C16.05%204.63%2015.86%204.17%2015.51%203.83L13.72%202.04C13.38%201.69%2012.92%201.5%2012.43%201.5C11.94%201.5%2011.48%201.7%2011.14%202.04L4.39%208.79C4.1%209.08%204.1%209.56%204.39%209.85ZM16%2017.5V15.5H1V17.5H16Z'%20fill='%23FBFBFE'/%3e%3cpath%20d='M15.1616%206.05136L15.1616%206.05132L15.1564%206.05645L8.40645%2012.8064C8.35915%2012.8537%208.29589%2012.88%208.23%2012.88C8.16411%2012.88%208.10085%2012.8537%208.05355%2012.8064L7.45857%2012.2115L7.10501%2011.8579L6.75146%2012.2115L6.03289%2012.93H3.20465L5.33477%2010.7937L5.6873%2010.4402L5.33426%2010.0871L4.74355%209.49645C4.64882%209.40171%204.64882%209.23829%204.74355%209.14355L11.4936%202.39355C11.7436%202.14354%2012.0779%202%2012.43%202C12.7883%202%2013.1179%202.13776%2013.3614%202.38839L13.3613%202.38843L13.3664%202.39355L15.1564%204.18355L15.1564%204.18359L15.1616%204.18864C15.4122%204.43211%2015.55%204.76166%2015.55%205.12C15.55%205.47834%2015.4122%205.80789%2015.1616%206.05136ZM7.87645%2011.9236L8.23%2012.2771L8.58355%2011.9236L11.0642%209.44293L11.4177%209.08938L11.0642%208.73582L8.80918%206.48082L8.45562%206.12727L8.10207%206.48082L5.62645%208.95645L5.48%209.10289V9.31V9.32V9.52711L5.62645%209.67355L7.87645%2011.9236ZM11.4177%208.38227L11.7713%208.73582L12.1248%208.38227L14.8036%205.70355C15.1288%205.37829%2015.1288%204.86171%2014.8036%204.53645L13.0136%202.74645C12.8186%202.55146%2012.5792%202.5%2012.43%202.5H12.4134L12.3967%202.50111L12.43%203C12.3967%202.50111%2012.3966%202.50112%2012.3965%202.50112L12.3963%202.50114L12.3957%202.50117L12.3947%202.50125L12.3924%202.50142L12.387%202.50184L12.3732%202.50311C12.3628%202.50416%2012.3498%202.50567%2012.3346%202.50784C12.3049%202.51208%2012.2642%202.51925%2012.2178%202.53146C12.1396%202.55202%2011.9797%202.60317%2011.8464%202.73645L9.16273%205.42016L8.80918%205.77372L9.16273%206.12727L11.4177%208.38227ZM1.5%2016H15.5V17H1.5V16Z'%20stroke='%2315141A'/%3e%3c/svg%3e") 1 18, pointer;--new-alt-text-warning-image:url("data:image/svg+xml,%3csvg%20width='17'%20height='16'%20viewBox='0%200%2017%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.78182%202.63903C8.58882%202.28803%208.25782%202.25003%208.12482%202.25003C7.99019%202.24847%207.85771%202.28393%207.74185%202.35253C7.62599%202.42113%207.5312%202.52023%207.46782%202.63903L1.97082%2012.639C1.90673%2012.7528%201.87406%2012.8816%201.87617%2013.0122C1.87828%2013.1427%201.91509%2013.2704%201.98282%2013.382C2.04798%2013.4951%202.14207%2013.5888%202.25543%2013.6535C2.36879%2013.7182%202.49732%2013.7515%202.62782%2013.75H13.6218C13.7523%2013.7515%2013.8809%2013.7182%2013.9942%2013.6535C14.1076%2013.5888%2014.2017%2013.4951%2014.2668%2013.382C14.3346%2013.2704%2014.3714%2013.1427%2014.3735%2013.0122C14.3756%2012.8816%2014.3429%2012.7528%2014.2788%2012.639L8.78182%202.63903ZM6.37282%202.03703C6.75182%201.34603%207.43882%201.00003%208.12482%201.00003C8.48341%200.997985%208.83583%201.09326%209.14454%201.2757C9.45325%201.45814%209.70668%201.72092%209.87782%202.03603L15.3748%2012.036C16.1078%2013.369%2015.1438%2015%2013.6228%2015H2.62782C1.10682%2015%200.141823%2013.37%200.875823%2012.037L6.37282%202.03703ZM8.74982%209.06203C8.74982%209.22779%208.68397%209.38676%208.56676%209.50397C8.44955%209.62118%208.29058%209.68703%208.12482%209.68703C7.95906%209.68703%207.80009%209.62118%207.68288%209.50397C7.56566%209.38676%207.49982%209.22779%207.49982%209.06203V5.62503C7.49982%205.45927%207.56566%205.3003%207.68288%205.18309C7.80009%205.06588%207.95906%205.00003%208.12482%205.00003C8.29058%205.00003%208.44955%205.06588%208.56676%205.18309C8.68397%205.3003%208.74982%205.45927%208.74982%205.62503V9.06203ZM7.74982%2012L7.49982%2011.75V11L7.74982%2010.75H8.49982L8.74982%2011V11.75L8.49982%2012H7.74982Z'%20fill='black'/%3e%3c/svg%3e")}.textLayer.highlighting{cursor:var(--editorFreeHighlight-editing-cursor)}.textLayer.highlighting:not(.free) span{cursor:var(--editorHighlight-editing-cursor)}.textLayer.highlighting:not(.free) span[role=img]{cursor:var(--editorFreeHighlight-editing-cursor)}.textLayer.highlighting.free span{cursor:var(--editorFreeHighlight-editing-cursor)}.page:has(.annotationEditorLayer.nonEditing) .annotationLayer .editorAnnotation{position:absolute;pointer-events:none}#viewerContainer.pdfPresentationMode:fullscreen .noAltTextBadge,.annotationEditorLayer.disabled .noAltTextBadge{display:none!important}@media(min-resolution:1.1dppx){:root{--editorFreeText-editing-cursor:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%202.75H12.5V2.25V1V0.5H12H10.358C9.91165%200.5%209.47731%200.625661%209.09989%200.860442L9.09886%200.861087L8%201.54837L6.89997%200.860979L6.89911%200.860443C6.5218%200.625734%206.08748%200.5%205.642%200.5H4H3.5V1V2.25V2.75H4H5.642C5.66478%202.75%205.6885%202.75641%205.71008%202.76968C5.71023%202.76977%205.71038%202.76986%205.71053%202.76995L6.817%203.461C6.81704%203.46103%206.81709%203.46105%206.81713%203.46108C6.81713%203.46108%206.81713%203.46108%206.81714%203.46109C6.8552%203.48494%206.876%203.52285%206.876%203.567V8V12.433C6.876%2012.4771%206.85523%2012.515%206.81722%2012.5389C6.81715%2012.5389%206.81707%2012.539%206.817%2012.539L5.70953%2013.23C5.70941%2013.2301%205.70929%2013.2302%205.70917%2013.2303C5.68723%2013.2438%205.6644%2013.25%205.641%2013.25H4H3.5V13.75V15V15.5H4H5.642C6.08835%2015.5%206.52269%2015.3743%206.90011%2015.1396L6.90086%2015.1391L8%2014.4526L9.10003%2015.14L9.10089%2015.1406C9.47831%2015.3753%209.91265%2015.501%2010.359%2015.501H12H12.5V15.001V13.751V13.251H12H10.358C10.3352%2013.251%2010.3115%2013.2446%2010.2899%2013.2313C10.2897%2013.2312%2010.2896%2013.2311%2010.2895%2013.231L9.183%2012.54C9.18298%2012.54%209.18295%2012.54%209.18293%2012.54C9.18291%2012.5399%209.18288%2012.5399%209.18286%2012.5399C9.14615%2012.5169%209.125%2012.4797%209.125%2012.434V8V3.567C9.125%203.52266%209.14603%203.48441%209.18364%203.4606C9.18377%203.46052%209.1839%203.46043%209.18404%203.46035L10.2895%202.76995C10.2896%202.76985%2010.2898%202.76975%2010.2899%202.76966C10.3119%202.75619%2010.3346%202.75%2010.358%202.75H12Z'%20fill='black'%20stroke='white'/%3e%3c/svg%3e") 0 16, text}}@media screen and (forced-colors:active){:root{--outline-color:CanvasText;--outline-around-color:ButtonFace;--resizer-bg-color:ButtonText;--hover-outline-color:var(--color-accent-primary-hover, Highlight);--hover-outline-around-color:SelectedItemText}}[data-editor-rotation="90"]{transform:rotate(90deg)}[data-editor-rotation="180"]{transform:rotate(180deg)}[data-editor-rotation="270"]{transform:rotate(270deg)}.annotationEditorLayer{background:transparent;position:absolute;top:0;right:0;bottom:0;left:0;font-size:calc(100px * var(--total-scale-factor));transform-origin:0 0;cursor:auto}.annotationEditorLayer .selectedEditor{z-index:100000!important}.annotationEditorLayer.drawing *{pointer-events:none!important}.annotationEditorLayer.getElements{pointer-events:auto!important}.annotationEditorLayer.getElements>div{pointer-events:auto!important}.annotationEditorLayer.waiting{content:"";cursor:wait;position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%}.annotationEditorLayer.disabled{pointer-events:none}.annotationEditorLayer.disabled.highlightEditing :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor,.commentPopup){pointer-events:auto}.annotationEditorLayer.freetextEditing{cursor:var(--editorFreeText-editing-cursor)}.annotationEditorLayer.inkEditing{cursor:var(--editorInk-editing-cursor)}.annotationEditorLayer .draw{box-sizing:border-box}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor){position:absolute;background:transparent;z-index:1;transform-origin:0 0;cursor:auto;max-width:100%;max-height:100%;border:var(--unfocus-outline)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor).draggable.selectedEditor{cursor:move}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor).selectedEditor{border:var(--editor-selection-outline);outline:var(--focus-outline-around)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor).selectedEditor:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border:var(--focus-outline-around);pointer-events:none}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor):hover:not(.selectedEditor){border:var(--hover-outline);outline:var(--hover-outline-around)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor):hover:not(.selectedEditor):before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border:var(--focus-outline-around)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar,.textLayer .editToolbar{--editor-toolbar-delete-image:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11%203H13.6C14%203%2014.3%203.3%2014.3%203.6C14.3%203.9%2014%204.2%2013.7%204.2H13.3V14C13.3%2015.1%2012.4%2016%2011.3%2016H4.80005C3.70005%2016%202.80005%2015.1%202.80005%2014V4.2H2.40005C2.00005%204.2%201.80005%204%201.80005%203.6C1.80005%203.2%202.00005%203%202.40005%203H5.00005V2C5.00005%200.9%205.90005%200%207.00005%200H9.00005C10.1%200%2011%200.9%2011%202V3ZM6.90005%201.2L6.30005%201.8V3H9.80005V1.8L9.20005%201.2H6.90005ZM11.4%2014.7L12%2014.1V4.2H4.00005V14.1L4.60005%2014.7H11.4ZM7.00005%2012.4C7.00005%2012.7%206.70005%2013%206.40005%2013C6.10005%2013%205.80005%2012.7%205.80005%2012.4V7.6C5.70005%207.3%206.00005%207%206.40005%207C6.80005%207%207.00005%207.3%207.00005%207.6V12.4ZM10.2001%2012.4C10.2001%2012.7%209.90006%2013%209.60006%2013C9.30006%2013%209.00006%2012.7%209.00006%2012.4V7.6C9.00006%207.3%209.30006%207%209.60006%207C9.90006%207%2010.2001%207.3%2010.2001%207.6V12.4Z'%20fill='black'%20/%3e%3c/svg%3e");--editor-toolbar-bg-color:light-dark(#f0f0f4, #2b2a33);--editor-toolbar-highlight-image:url("data:image/svg+xml,%3csvg%20width='17'%20height='16'%20viewBox='0%200%2017%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.10918%2011.66C7.24918%2011.8%207.43918%2011.88%207.63918%2011.88C7.83918%2011.88%208.02918%2011.8%208.16918%2011.66L14.9192%204.91C15.2692%204.57%2015.4592%204.11%2015.4592%203.62C15.4592%203.13%2015.2692%202.67%2014.9192%202.33L13.1292%200.54C12.7892%200.19%2012.3292%200%2011.8392%200C11.3492%200%2010.8892%200.2%2010.5492%200.54L3.79918%207.29C3.50918%207.58%203.50918%208.06%203.79918%208.35L4.38988%208.9407L1.40918%2011.93H5.64918L6.51419%2011.065L7.10918%2011.66ZM7.63918%2010.07L5.38918%207.82V7.81L7.8648%205.33438L10.1198%207.58938L7.63918%2010.07ZM11.1805%206.52872L13.8592%203.85C13.9892%203.72%2013.9892%203.52%2013.8592%203.39L12.0692%201.6C11.9892%201.52%2011.8892%201.5%2011.8392%201.5C11.8392%201.5%2011.6892%201.51%2011.6092%201.59L8.92546%204.27372L11.1805%206.52872Z'%20fill='%23000'/%3e%3cpath%20d='M0.40918%2014H15.4092V16H0.40918V14Z'%20fill='%23000'/%3e%3c/g%3e%3c/svg%3e");--editor-toolbar-fg-color:light-dark(#2e2e56, #fbfbfe);--editor-toolbar-border-color:var(--border-color-interactive, #8f8f9d);--editor-toolbar-hover-border-color:var(--editor-toolbar-border-color);--editor-toolbar-hover-bg-color:light-dark(#e0e0e6, #52525e);--editor-toolbar-hover-fg-color:var(--editor-toolbar-fg-color);--editor-toolbar-hover-outline:none;--editor-toolbar-focus-outline-color:var( --focus-outline-color, light-dark(#0060df, #0df) );--editor-toolbar-shadow:0 2px 6px 0 rgb(58 57 68 / .2);--editor-toolbar-height:28px;--editor-toolbar-padding:2px;--alt-text-done-color:var( --color-accent-attention, light-dark(#2ac3a2, #54ffbd) );--alt-text-warning-color:light-dark(#0090ed, #80ebff);--alt-text-hover-done-color:var(--alt-text-done-color);--alt-text-hover-warning-color:var(--alt-text-warning-color);display:flex;width:-moz-fit-content;width:fit-content;height:var(--editor-toolbar-height);flex-direction:column;justify-content:center;align-items:center;cursor:default;pointer-events:auto;box-sizing:content-box;padding:var(--editor-toolbar-padding);-webkit-user-select:none;-moz-user-select:none;user-select:none;position:absolute;inset-inline-end:0;inset-block-start:calc(100% + var(--editor-toolbar-vert-offset));border-radius:6px;background-color:var(--editor-toolbar-bg-color);border:1px solid var(--editor-toolbar-border-color);box-shadow:var(--editor-toolbar-shadow)}@media screen and (forced-colors:active){.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar,.textLayer .editToolbar{--editor-toolbar-bg-color:var(--button-background-color, ButtonFace);--editor-toolbar-fg-color:var(--button-text-color, ButtonText);--editor-toolbar-border-color:var(--button-border-color, ButtonText);--editor-toolbar-hover-border-color:var( --button-border-color-hover, AccentColor );--editor-toolbar-hover-bg-color:var( --button-background-color-hover, ButtonFace );--editor-toolbar-hover-fg-color:var( --button-text-color-hover, AccentColor );--editor-toolbar-hover-outline:2px solid var(--editor-toolbar-hover-border-color);--editor-toolbar-focus-outline-color:var( --button-border-color, ButtonBorder );--editor-toolbar-shadow:none;--alt-text-done-color:var(--editor-toolbar-fg-color);--alt-text-warning-color:var(--editor-toolbar-fg-color);--alt-text-hover-done-color:var(--editor-toolbar-hover-fg-color);--alt-text-hover-warning-color:var(--editor-toolbar-hover-fg-color)}}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar.hidden,.textLayer .editToolbar.hidden{display:none}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar:has(:focus-visible),.textLayer .editToolbar:has(:focus-visible){border-color:transparent}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar:dir(ltr),.textLayer .editToolbar:dir(ltr){transform-origin:100% 0}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar:dir(rtl),.textLayer .editToolbar:dir(rtl){transform-origin:0 0}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons,.textLayer .editToolbar .buttons{display:flex;justify-content:center;align-items:center;gap:0;height:100%}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons button,.textLayer .editToolbar .buttons button{padding:0}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .divider,.textLayer .editToolbar .buttons .divider{width:0;height:calc(2 * var(--editor-toolbar-padding) + var(--editor-toolbar-height));border-left:1px solid var(--editor-toolbar-border-color);border-right:none;display:inline-block;margin-inline:2px}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .basic,.textLayer .editToolbar .buttons .basic{width:var(--editor-toolbar-height)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .basic:before,.textLayer .editToolbar .buttons .basic:before{content:"";-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;display:inline-block;background-color:var(--editor-toolbar-fg-color);width:100%;height:100%}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .basic:hover:before,.textLayer .editToolbar .buttons .basic:hover:before{background-color:var(--editor-toolbar-hover-fg-color)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .basic.highlightButton:before,.textLayer .editToolbar .buttons .basic.highlightButton:before{-webkit-mask-image:var(--editor-toolbar-highlight-image);mask-image:var(--editor-toolbar-highlight-image)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .basic.commentButton:before,.textLayer .editToolbar .buttons .basic.commentButton:before{-webkit-mask-image:var(--comment-edit-button-icon);mask-image:var(--comment-edit-button-icon)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .basic.deleteButton:before,.textLayer .editToolbar .buttons .basic.deleteButton:before{-webkit-mask-image:var(--editor-toolbar-delete-image);mask-image:var(--editor-toolbar-delete-image)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons>*,.textLayer .editToolbar .buttons>*{height:var(--editor-toolbar-height)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons>:not(.divider),.textLayer .editToolbar .buttons>:not(.divider){border:none;background-color:transparent;cursor:pointer}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons>:not(.divider):hover,.textLayer .editToolbar .buttons>:not(.divider):hover{border-radius:2px;background-color:var(--editor-toolbar-hover-bg-color);color:var(--editor-toolbar-hover-fg-color);outline:var(--editor-toolbar-hover-outline);outline-offset:1px}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons>:not(.divider):hover:active,.textLayer .editToolbar .buttons>:not(.divider):hover:active{outline:none}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons>:not(.divider):focus-visible,.textLayer .editToolbar .buttons>:not(.divider):focus-visible{border-radius:2px;outline:2px solid var(--editor-toolbar-focus-outline-color)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText,.textLayer .editToolbar .buttons .altText{--alt-text-add-image:url("data:image/svg+xml,%3csvg%20width='12'%20height='13'%20viewBox='0%200%2012%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.375%207.625V11.875C5.375%2012.0408%205.44085%2012.1997%205.55806%2012.3169C5.67527%2012.4342%205.83424%2012.5%206%2012.5C6.16576%2012.5%206.32473%2012.4342%206.44194%2012.3169C6.55915%2012.1997%206.625%2012.0408%206.625%2011.875V7.625L7.125%207.125H11.375C11.5408%207.125%2011.6997%207.05915%2011.8169%206.94194C11.9342%206.82473%2012%206.66576%2012%206.5C12%206.33424%2011.9342%206.17527%2011.8169%206.05806C11.6997%205.94085%2011.5408%205.875%2011.375%205.875H7.125L6.625%205.375V1.125C6.625%200.95924%206.55915%200.800269%206.44194%200.683058C6.32473%200.565848%206.16576%200.5%206%200.5C5.83424%200.5%205.67527%200.565848%205.55806%200.683058C5.44085%200.800269%205.375%200.95924%205.375%201.125V5.375L4.875%205.875H0.625C0.45924%205.875%200.300269%205.94085%200.183058%206.05806C0.065848%206.17527%200%206.33424%200%206.5C0%206.66576%200.065848%206.82473%200.183058%206.94194C0.300269%207.05915%200.45924%207.125%200.625%207.125H4.762L5.375%207.625Z'%20fill='black'/%3e%3c/svg%3e");--alt-text-done-image:url("data:image/svg+xml,%3csvg%20width='12'%20height='13'%20viewBox='0%200%2012%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6%200.5C5.21207%200.5%204.43185%200.655195%203.7039%200.956723C2.97595%201.25825%202.31451%201.70021%201.75736%202.25736C1.20021%202.81451%200.758251%203.47595%200.456723%204.2039C0.155195%204.93185%200%205.71207%200%206.5C0%207.28793%200.155195%208.06815%200.456723%208.7961C0.758251%209.52405%201.20021%2010.1855%201.75736%2010.7426C2.31451%2011.2998%202.97595%2011.7417%203.7039%2012.0433C4.43185%2012.3448%205.21207%2012.5%206%2012.5C7.5913%2012.5%209.11742%2011.8679%2010.2426%2010.7426C11.3679%209.61742%2012%208.0913%2012%206.5C12%204.9087%2011.3679%203.38258%2010.2426%202.25736C9.11742%201.13214%207.5913%200.5%206%200.5ZM5.06%208.9L2.9464%206.7856C2.85273%206.69171%202.80018%206.56446%202.80033%206.43183C2.80048%206.29921%202.85331%206.17207%202.9472%206.0784C3.04109%205.98473%203.16834%205.93218%203.30097%205.93233C3.43359%205.93248%203.56073%205.98531%203.6544%206.0792L5.3112%207.7368L8.3464%204.7008C8.44109%204.6109%208.56715%204.56153%208.69771%204.56322C8.82827%204.56492%208.95301%204.61754%209.04534%204.70986C9.13766%204.80219%209.19028%204.92693%209.19198%205.05749C9.19367%205.18805%209.1443%205.31411%209.0544%205.4088L5.5624%208.9H5.06Z'%20fill='%23FBFBFE'/%3e%3c/svg%3e");display:flex;align-items:center;justify-content:center;width:-moz-max-content;width:max-content;padding-inline:8px;pointer-events:all;font:menu;font-weight:590;font-size:12px;color:var(--editor-toolbar-fg-color)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText:disabled,.textLayer .editToolbar .buttons .altText:disabled{pointer-events:none}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText:before,.textLayer .editToolbar .buttons .altText:before{content:"";-webkit-mask-image:var(--alt-text-add-image);mask-image:var(--alt-text-add-image);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;display:inline-block;width:12px;height:13px;background-color:var(--editor-toolbar-fg-color);margin-inline-end:4px}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText:hover:before,.textLayer .editToolbar .buttons .altText:hover:before{background-color:var(--editor-toolbar-hover-fg-color)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText.done:before,.textLayer .editToolbar .buttons .altText.done:before{-webkit-mask-image:var(--alt-text-done-image);mask-image:var(--alt-text-done-image)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText.new:before,.textLayer .editToolbar .buttons .altText.new:before{width:16px;height:16px;-webkit-mask-image:var(--new-alt-text-warning-image);mask-image:var(--new-alt-text-warning-image);background-color:var(--alt-text-warning-color);-webkit-mask-size:cover;mask-size:cover}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText.new:hover:before,.textLayer .editToolbar .buttons .altText.new:hover:before{background-color:var(--alt-text-hover-warning-color)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText.new.done:before,.textLayer .editToolbar .buttons .altText.new.done:before{-webkit-mask-image:var(--alt-text-done-image);mask-image:var(--alt-text-done-image);background-color:var(--alt-text-done-color)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText.new.done:hover:before,.textLayer .editToolbar .buttons .altText.new.done:hover:before{background-color:var(--alt-text-hover-done-color)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText .tooltip,.textLayer .editToolbar .buttons .altText .tooltip{display:none;word-wrap:anywhere}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText .tooltip.show,.textLayer .editToolbar .buttons .altText .tooltip.show{--alt-text-tooltip-bg:light-dark(#f0f0f4, #1c1b22);--alt-text-tooltip-fg:var( --text-color, light-dark(#15141a, #fbfbfe) );--alt-text-tooltip-border:var(--border-color-interactive, #8f8f9d);--alt-text-tooltip-shadow:0 2px 6px 0 light-dark(rgb(58 57 68 / .2), #15141a);display:inline-flex;flex-direction:column;align-items:center;justify-content:center;position:absolute;top:calc(100% + 2px);inset-inline-start:0;padding-block:2px 3px;padding-inline:3px;max-width:300px;width:-moz-max-content;width:max-content;height:auto;font-size:12px;border:.5px solid var(--alt-text-tooltip-border);background:var(--alt-text-tooltip-bg);box-shadow:var(--alt-text-tooltip-shadow);color:var(--alt-text-tooltip-fg);pointer-events:none}@media screen and (forced-colors:active){.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .altText .tooltip.show,.textLayer .editToolbar .buttons .altText .tooltip.show{--alt-text-tooltip-bg:Canvas;--alt-text-tooltip-fg:var(--text-color, CanvasText);--alt-text-tooltip-border:var(--border-color, CanvasText);--alt-text-tooltip-shadow:none}}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .comment,.textLayer .editToolbar .buttons .comment{width:var(--editor-toolbar-height)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.highlightEditor,.signatureEditor) .editToolbar .buttons .comment:before,.textLayer .editToolbar .buttons .comment:before{content:"";-webkit-mask-image:var(--comment-edit-button-icon);mask-image:var(--comment-edit-button-icon);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;display:inline-block;background-color:var(--editor-toolbar-fg-color);width:100%;height:100%}.annotationEditorLayer .freeTextEditor{padding:calc(var(--freetext-padding) * var(--total-scale-factor));width:auto;height:auto;touch-action:none}.annotationEditorLayer .freeTextEditor .internal{background:transparent;border:none;top:0;right:0;bottom:0;left:0;overflow:visible;white-space:nowrap;font:10px sans-serif;line-height:var(--freetext-line-height);text-align:start;-webkit-user-select:none;-moz-user-select:none;user-select:none}.annotationEditorLayer .freeTextEditor .overlay{position:absolute;display:none;background:transparent;top:0;right:0;bottom:0;left:0;width:100%;height:100%}.annotationEditorLayer freeTextEditor .overlay.enabled{display:block}.annotationEditorLayer .freeTextEditor .internal:empty:before{content:attr(default-content);color:gray}.annotationEditorLayer .freeTextEditor .internal:focus{outline:none;-webkit-user-select:auto;-moz-user-select:auto;user-select:auto}.annotationEditorLayer .inkEditor{width:100%;height:100%}.annotationEditorLayer .inkEditor.editing{cursor:inherit}.annotationEditorLayer .inkEditor .inkEditorCanvas{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;touch-action:none}.annotationEditorLayer .stampEditor{width:auto;height:auto}.annotationEditorLayer .stampEditor canvas{position:absolute;width:100%;height:100%;margin:0;top:0;left:0}.annotationEditorLayer .stampEditor .noAltTextBadge{--no-alt-text-badge-border-color:light-dark(#f0f0f4, #52525e);--no-alt-text-badge-bg-color:light-dark(#cfcfd8, #fbfbfe);--no-alt-text-badge-fg-color:light-dark(#5b5b66, #15141a);position:absolute;inset-inline-end:5px;inset-block-end:5px;display:inline-flex;width:32px;height:32px;padding:3px;justify-content:center;align-items:center;pointer-events:none;z-index:1;border-radius:2px;border:1px solid var(--no-alt-text-badge-border-color);background:var(--no-alt-text-badge-bg-color)}@media screen and (forced-colors:active){.annotationEditorLayer .stampEditor .noAltTextBadge{--no-alt-text-badge-border-color:ButtonText;--no-alt-text-badge-bg-color:ButtonFace;--no-alt-text-badge-fg-color:ButtonText}}.annotationEditorLayer .stampEditor .noAltTextBadge:before{content:"";display:inline-block;width:16px;height:16px;-webkit-mask-image:var(--new-alt-text-warning-image);mask-image:var(--new-alt-text-warning-image);-webkit-mask-size:cover;mask-size:cover;background-color:var(--no-alt-text-badge-fg-color)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers.hidden{display:none}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer{width:var(--resizer-size);height:var(--resizer-size);background:content-box var(--resizer-bg-color);border:var(--focus-outline-around);border-radius:2px;position:absolute}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer.topLeft{top:var(--resizer-shift);left:var(--resizer-shift)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer.topMiddle{top:var(--resizer-shift);left:calc(50% + var(--resizer-shift))}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer.topRight{top:var(--resizer-shift);right:var(--resizer-shift)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer.middleRight{top:calc(50% + var(--resizer-shift));right:var(--resizer-shift)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer.bottomRight{bottom:var(--resizer-shift);right:var(--resizer-shift)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer.bottomMiddle{bottom:var(--resizer-shift);left:calc(50% + var(--resizer-shift))}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer.bottomLeft{bottom:var(--resizer-shift);left:var(--resizer-shift)}.annotationEditorLayer :is(.freeTextEditor,.inkEditor,.stampEditor,.signatureEditor)>.resizers>.resizer.middleLeft{top:calc(50% + var(--resizer-shift));left:var(--resizer-shift)}.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.topLeft,.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.bottomRight,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.topLeft,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.bottomRight,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.topLeft,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.bottomRight,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.topLeft,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.bottomRight{cursor:nwse-resize}.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.topMiddle,.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.bottomMiddle,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.topMiddle,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.bottomMiddle,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.topMiddle,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.bottomMiddle,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.topMiddle,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.bottomMiddle{cursor:ns-resize}.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.topRight,.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.bottomLeft,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.topRight,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.bottomLeft,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.topRight,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.bottomLeft,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.topRight,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.bottomLeft{cursor:nesw-resize}.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.middleRight,.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.middleLeft,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.middleRight,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.middleLeft,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.middleRight,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.middleLeft,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.middleRight,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.middleLeft{cursor:ew-resize}.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.topLeft,.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.bottomRight,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.topLeft,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.bottomRight,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.topLeft,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.bottomRight,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.topLeft,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.bottomRight{cursor:nesw-resize}.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.topMiddle,.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.bottomMiddle,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.topMiddle,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.bottomMiddle,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.topMiddle,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.bottomMiddle,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.topMiddle,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.bottomMiddle{cursor:ew-resize}.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.topRight,.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.bottomLeft,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.topRight,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.bottomLeft,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.topRight,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.bottomLeft,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.topRight,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.bottomLeft{cursor:nwse-resize}.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.middleRight,.annotationEditorLayer[data-main-rotation="0"] :is([data-editor-rotation="90"],[data-editor-rotation="270"])>.resizers>.resizer.middleLeft,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.middleRight,.annotationEditorLayer[data-main-rotation="90"] :is([data-editor-rotation="0"],[data-editor-rotation="180"])>.resizers>.resizer.middleLeft,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.middleRight,.annotationEditorLayer[data-main-rotation="180"] :is([data-editor-rotation="270"],[data-editor-rotation="90"])>.resizers>.resizer.middleLeft,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.middleRight,.annotationEditorLayer[data-main-rotation="270"] :is([data-editor-rotation="180"],[data-editor-rotation="0"])>.resizers>.resizer.middleLeft{cursor:ns-resize}.annotationEditorLayer :is([data-main-rotation="0"] [data-editor-rotation="90"],[data-main-rotation="90"] [data-editor-rotation="0"],[data-main-rotation="180"] [data-editor-rotation="270"],[data-main-rotation="270"] [data-editor-rotation="180"]) .editToolbar{rotate:270deg}.annotationEditorLayer :is([data-main-rotation="0"] [data-editor-rotation="90"],[data-main-rotation="90"] [data-editor-rotation="0"],[data-main-rotation="180"] [data-editor-rotation="270"],[data-main-rotation="270"] [data-editor-rotation="180"]) .editToolbar:dir(ltr){inset-inline-end:calc(0px - var(--editor-toolbar-vert-offset));inset-block-start:0}.annotationEditorLayer :is([data-main-rotation="0"] [data-editor-rotation="90"],[data-main-rotation="90"] [data-editor-rotation="0"],[data-main-rotation="180"] [data-editor-rotation="270"],[data-main-rotation="270"] [data-editor-rotation="180"]) .editToolbar:dir(rtl){inset-inline-end:calc(100% + var(--editor-toolbar-vert-offset));inset-block-start:0}.annotationEditorLayer :is([data-main-rotation="0"] [data-editor-rotation="180"],[data-main-rotation="90"] [data-editor-rotation="90"],[data-main-rotation="180"] [data-editor-rotation="0"],[data-main-rotation="270"] [data-editor-rotation="270"]) .editToolbar{rotate:180deg;inset-inline-end:100%;inset-block-start:calc(0px - var(--editor-toolbar-vert-offset))}.annotationEditorLayer :is([data-main-rotation="0"] [data-editor-rotation="270"],[data-main-rotation="90"] [data-editor-rotation="180"],[data-main-rotation="180"] [data-editor-rotation="90"],[data-main-rotation="270"] [data-editor-rotation="0"]) .editToolbar{rotate:90deg}.annotationEditorLayer :is([data-main-rotation="0"] [data-editor-rotation="270"],[data-main-rotation="90"] [data-editor-rotation="180"],[data-main-rotation="180"] [data-editor-rotation="90"],[data-main-rotation="270"] [data-editor-rotation="0"]) .editToolbar:dir(ltr){inset-inline-end:calc(100% + var(--editor-toolbar-vert-offset));inset-block-start:100%}.annotationEditorLayer :is([data-main-rotation="0"] [data-editor-rotation="270"],[data-main-rotation="90"] [data-editor-rotation="180"],[data-main-rotation="180"] [data-editor-rotation="90"],[data-main-rotation="270"] [data-editor-rotation="0"]) .editToolbar:dir(rtl){inset-inline-start:calc(0px - var(--editor-toolbar-vert-offset));inset-block-start:0}.dialog.altText::backdrop{-webkit-mask:url(#alttext-manager-mask);mask:url(#alttext-manager-mask)}.dialog.altText.positioned{margin:0}.dialog.altText #altTextContainer{width:300px;height:-moz-fit-content;height:fit-content;display:inline-flex;flex-direction:column;align-items:flex-start;gap:16px}.dialog.altText #altTextContainer #overallDescription{display:flex;flex-direction:column;align-items:flex-start;gap:4px;align-self:stretch}.dialog.altText #altTextContainer #overallDescription span{align-self:stretch}.dialog.altText #altTextContainer #overallDescription .title{font-size:13px;font-style:normal;font-weight:590}.dialog.altText #altTextContainer #addDescription{display:flex;flex-direction:column;align-items:stretch;gap:8px}.dialog.altText #altTextContainer #addDescription .descriptionArea{flex:1;padding-inline:24px 10px}.dialog.altText #altTextContainer #addDescription .descriptionArea textarea{width:100%;min-height:75px}.dialog.altText #altTextContainer #buttons{display:flex;justify-content:flex-end;align-items:flex-start;gap:8px;align-self:stretch}.dialog.newAltText{--new-alt-text-ai-disclaimer-icon:url("data:image/svg+xml,%3csvg%20width='17'%20height='16'%20viewBox='0%200%2017%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.49073%201.3015L3.30873%202.1505C3.29349%202.22246%203.25769%202.28844%203.20568%202.34045C3.15368%202.39246%203.08769%202.42826%203.01573%202.4435L2.16673%202.6255C1.76473%202.7125%201.76473%203.2865%202.16673%203.3725L3.01573%203.5555C3.08769%203.57074%203.15368%203.60654%203.20568%203.65855C3.25769%203.71056%203.29349%203.77654%203.30873%203.8485L3.49073%204.6975C3.57773%205.0995%204.15173%205.0995%204.23773%204.6975L4.42073%203.8485C4.43598%203.77654%204.47177%203.71056%204.52378%203.65855C4.57579%203.60654%204.64178%203.57074%204.71373%203.5555L5.56173%203.3725C5.96373%203.2855%205.96373%202.7115%205.56173%202.6255L4.71273%202.4435C4.64083%202.42814%204.57491%202.3923%204.52292%202.34031C4.47093%202.28832%204.43509%202.2224%204.41973%202.1505L4.23773%201.3015C4.15073%200.8995%203.57673%200.8995%203.49073%201.3015ZM10.8647%2013.9995C10.4853%2014.0056%2010.1158%2013.8782%209.82067%2013.6397C9.52553%2013.4013%209.32347%2013.0667%209.24973%2012.6945L8.89273%2011.0275C8.83676%2010.7687%208.70738%2010.5316%208.52009%2010.3445C8.3328%2010.1574%208.09554%2010.0282%207.83673%209.9725L6.16973%209.6155C5.38873%209.4465%204.86473%208.7975%204.86473%207.9995C4.86473%207.2015%205.38873%206.5525%206.16973%206.3845L7.83673%206.0275C8.09551%205.97135%208.33267%205.84193%208.51992%205.65468C8.70716%205.46744%208.83658%205.23028%208.89273%204.9715L9.25073%203.3045C9.41773%202.5235%2010.0667%201.9995%2010.8647%201.9995C11.6627%201.9995%2012.3117%202.5235%2012.4797%203.3045L12.8367%204.9715C12.9507%205.4995%2013.3647%205.9135%2013.8927%206.0265L15.5597%206.3835C16.3407%206.5525%2016.8647%207.2015%2016.8647%207.9995C16.8647%208.7975%2016.3407%209.4465%2015.5597%209.6145L13.8927%209.9715C13.6337%2010.0275%2013.3963%2010.157%2013.209%2010.3445C13.0217%2010.5319%2012.8925%2010.7694%2012.8367%2011.0285L12.4787%2012.6945C12.4054%2013.0667%2012.2036%2013.4014%2011.9086%2013.6399C11.6135%2013.8784%2011.2441%2014.0057%2010.8647%2013.9995ZM10.8647%203.2495C10.7667%203.2495%2010.5337%203.2795%2010.4727%203.5655L10.1147%205.2335C10.0081%205.72777%209.76116%206.18082%209.40361%206.53837C9.04606%206.89593%208.59301%207.14283%208.09873%207.2495L6.43173%207.6065C6.14573%207.6685%206.11473%207.9015%206.11473%207.9995C6.11473%208.0975%206.14573%208.3305%206.43173%208.3925L8.09873%208.7495C8.59301%208.85617%209.04606%209.10307%209.40361%209.46062C9.76116%209.81817%2010.0081%2010.2712%2010.1147%2010.7655L10.4727%2012.4335C10.5337%2012.7195%2010.7667%2012.7495%2010.8647%2012.7495C10.9627%2012.7495%2011.1957%2012.7195%2011.2567%2012.4335L11.6147%2010.7665C11.7212%2010.272%2011.9681%209.81878%2012.3256%209.46103C12.6832%209.10329%2013.1363%208.85624%2013.6307%208.7495L15.2977%208.3925C15.5837%208.3305%2015.6147%208.0975%2015.6147%207.9995C15.6147%207.9015%2015.5837%207.6685%2015.2977%207.6065L13.6307%207.2495C13.1365%207.14283%2012.6834%206.89593%2012.3259%206.53837C11.9683%206.18082%2011.7214%205.72777%2011.6147%205.2335L11.2567%203.5655C11.1957%203.2795%2010.9627%203.2495%2010.8647%203.2495ZM3.30873%2012.1505L3.49073%2011.3015C3.57673%2010.8995%204.15073%2010.8995%204.23773%2011.3015L4.41973%2012.1505C4.43509%2012.2224%204.47093%2012.2883%204.52292%2012.3403C4.57491%2012.3923%204.64083%2012.4281%204.71273%2012.4435L5.56173%2012.6255C5.96373%2012.7115%205.96373%2013.2855%205.56173%2013.3725L4.71273%2013.5545C4.64083%2013.5699%204.57491%2013.6057%204.52292%2013.6577C4.47093%2013.7097%204.43509%2013.7756%204.41973%2013.8475L4.23773%2014.6965C4.15173%2015.0985%203.57773%2015.0985%203.49073%2014.6965L3.30873%2013.8475C3.29337%2013.7756%203.25754%2013.7097%203.20555%2013.6577C3.15356%2013.6057%203.08764%2013.5699%203.01573%2013.5545L2.16673%2013.3725C1.76473%2013.2865%201.76473%2012.7125%202.16673%2012.6255L3.01573%2012.4435C3.08769%2012.4283%203.15368%2012.3925%203.20568%2012.3405C3.25769%2012.2884%203.29349%2012.2225%203.30873%2012.1505Z'%20fill='black'/%3e%3c/svg%3e");--new-alt-text-spinner-icon:url("data:image/svg+xml,%3c!--%20This%20Source%20Code%20Form%20is%20subject%20to%20the%20terms%20of%20the%20Mozilla%20Public%20-%20License,%20v.%202.0.%20If%20a%20copy%20of%20the%20MPL%20was%20not%20distributed%20with%20this%20-%20file,%20You%20can%20obtain%20one%20at%20http://mozilla.org/MPL/2.0/.%20--%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20width='16'%20height='16'%3e%3cstyle%3e%20@media%20not%20(prefers-reduced-motion)%20{%20@keyframes%20loadingRotate%20{%20from%20{%20rotate:%200;%20}%20to%20{%20rotate:%20360deg%20}%20}%20%23circle-arrows%20{%20animation:%20loadingRotate%201.8s%20linear%20infinite;%20transform-origin:%2050%25%2050%25;%20}%20%23hourglass%20{%20display:%20none;%20}%20}%20@media%20(prefers-reduced-motion)%20{%20%23circle-arrows%20{%20display:%20none;%20}%20}%20%3c/style%3e%3cpath%20id='circle-arrows'%20d='M9%205.528c0%20.42.508.63.804.333l2.528-2.528a.47.47%200%200%200%200-.666L9.805.14A.471.471%200%200%200%209%20.472v1.866A5.756%205.756%200%200%200%202.25%208c0%20.942.232%201.83.635%202.615l1.143-1.143A4.208%204.208%200%200%201%203.75%208%204.254%204.254%200%200%201%208%203.75c.345%200%20.68.042%201%20.122v1.656zM7%2010.472v1.656c.32.08.655.122%201%20.122A4.254%204.254%200%200%200%2012.25%208c0-.52-.107-1.013-.279-1.474l1.143-1.143c.404.786.636%201.674.636%202.617A5.756%205.756%200%200%201%207%2013.662v1.866a.47.47%200%200%201-.804.333l-2.528-2.528a.47.47%200%200%201%200-.666l2.528-2.528a.47.47%200%200%201%20.804.333z'/%3e%3cg%20id='hourglass'%3e%3cpath%20d='M13,1%20C13.5522847,1%2014,1.44771525%2014,2%20C14,2.55228475%2013.5522847,3%2013,3%20L12.9854217,2.99990801%20C12.9950817,3.16495885%2013,3.33173274%2013,3.5%20C13,5.24679885%2010.9877318,6.01090495%2010.9877318,8.0017538%20C10.9877318,9.99260264%2013,10.7536922%2013,12.5%20C13,12.6686079%2012.9950617,12.8357163%2012.985363,13.0010943%20L13,13%20C13.5522847,13%2014,13.4477153%2014,14%20C14,14.5522847%2013.5522847,15%2013,15%20L3,15%20C2.44771525,15%202,14.5522847%202,14%20C2,13.4477153%202.44771525,13%203,13%20L3.01463704,13.0010943%20C3.00493827,12.8357163%203,12.6686079%203,12.5%20C3,10.7536922%204.9877318,9.99260264%205,8.0017538%20C5.0122682,6.01090495%203,5.24679885%203,3.5%20C3,3.33173274%203.00491834,3.16495885%203.01457832,2.99990801%20L3,3%20C2.44771525,3%202,2.55228475%202,2%20C2,1.44771525%202.44771525,1%203,1%20L13,1%20Z%20M10.987,3%20L5.012,3%20L5.00308914,3.24815712%20C5.00103707,3.33163368%205,3.4155948%205,3.5%20C5,5.36125069%206.99153646,6.01774089%206.99153646,8.0017538%20C6.99153646,9.98576671%205,10.6393737%205,12.5%20L5.00307746,12.7513676%20L5.01222201,12.9998392%20L5.60191711,12.9988344%20L6.0425138,12.2959826%20C7.02362731,10.7653275%207.67612271,10%208,10%20C8.37014547,10%209.16950644,10.9996115%2010.3980829,12.9988344%20L10.987778,12.9998392%20C10.9958674,12.8352104%2011,12.66849%2011,12.5%20C11,10.6393737%208.98689779,10.0147381%208.98689779,8.0017538%20C8.98689779,5.98876953%2011,5.36125069%2011,3.5%20L10.9969109,3.24815712%20L10.987,3%20Z'/%3e%3cpath%20d='M6,4%20L10,4%20C8.95166016,6%208.28499349,7%208,7%20C7.71500651,7%207.04833984,6%206,4%20Z'/%3e%3c/g%3e%3c/svg%3e");--preview-image-bg-color:light-dark(#f0f0f4, #2b2a33);--preview-image-border:none;width:80%;max-width:570px;min-width:300px;padding:0}@media screen and (forced-colors:active){.dialog.newAltText{--preview-image-bg-color:ButtonFace;--preview-image-border:1px solid ButtonText}}.dialog.newAltText.noAi #newAltTextDisclaimer,.dialog.newAltText.noAi #newAltTextCreateAutomatically,.dialog.newAltText.aiInstalling #newAltTextCreateAutomatically{display:none!important}.dialog.newAltText.aiInstalling #newAltTextDownloadModel{display:flex!important}.dialog.newAltText.error #newAltTextNotNow{display:none!important}.dialog.newAltText.error #newAltTextCancel{display:inline-block!important}.dialog.newAltText:not(.error) #newAltTextError{display:none!important}.dialog.newAltText #newAltTextContainer{display:flex;width:auto;padding:16px;flex-direction:column;justify-content:flex-end;align-items:flex-start;gap:12px;flex:0 1 auto;line-height:normal}.dialog.newAltText #newAltTextContainer #mainContent{display:flex;justify-content:flex-end;align-items:flex-start;gap:12px;align-self:stretch;flex:1 1 auto}.dialog.newAltText #newAltTextContainer #mainContent #descriptionAndSettings{display:flex;flex-direction:column;align-items:flex-start;gap:16px;flex:1 0 0;align-self:stretch}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction{display:flex;flex-direction:column;align-items:flex-start;gap:8px;align-self:stretch;flex:1 1 auto}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescriptionContainer{width:100%;height:70px;position:relative}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescriptionContainer textarea{width:100%;height:100%;padding:8px}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescriptionContainer textarea::-moz-placeholder{color:var(--text-secondary-color)}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescriptionContainer textarea::placeholder{color:var(--text-secondary-color)}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescriptionContainer .altTextSpinner{display:none;position:absolute;width:16px;height:16px;inset-inline-start:8px;inset-block-start:8px;-webkit-mask-size:cover;mask-size:cover;background-color:var(--text-secondary-color);pointer-events:none}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescriptionContainer.loading textarea::-moz-placeholder{color:transparent}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescriptionContainer.loading textarea::placeholder{color:transparent}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescriptionContainer.loading .altTextSpinner{display:inline-block;-webkit-mask-image:var(--new-alt-text-spinner-icon);mask-image:var(--new-alt-text-spinner-icon)}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDescription{font-size:11px}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDisclaimer{display:flex;flex-direction:row;align-items:flex-start;gap:4px;font-size:11px}.dialog.newAltText #newAltTextContainer #mainContent #descriptionInstruction #newAltTextDisclaimer:before{content:"";display:inline-block;width:17px;height:16px;-webkit-mask-image:var(--new-alt-text-ai-disclaimer-icon);mask-image:var(--new-alt-text-ai-disclaimer-icon);-webkit-mask-size:cover;mask-size:cover;background-color:var(--text-secondary-color);flex:1 0 auto}.dialog.newAltText #newAltTextContainer #mainContent #newAltTextDownloadModel{display:flex;align-items:center;gap:4px;align-self:stretch}.dialog.newAltText #newAltTextContainer #mainContent #newAltTextDownloadModel:before{content:"";display:inline-block;width:16px;height:16px;-webkit-mask-image:var(--new-alt-text-spinner-icon);mask-image:var(--new-alt-text-spinner-icon);-webkit-mask-size:cover;mask-size:cover;background-color:var(--text-secondary-color)}.dialog.newAltText #newAltTextContainer #mainContent #newAltTextImagePreview{width:180px;aspect-ratio:1;display:flex;justify-content:center;align-items:center;flex:0 0 auto;background-color:var(--preview-image-bg-color);border:var(--preview-image-border)}.dialog.newAltText #newAltTextContainer #mainContent #newAltTextImagePreview>canvas{max-width:100%;max-height:100%}.colorPicker{--hover-outline-color:var( --color-accent-primary-hover, light-dark(#0250bb, #80ebff) );--selected-outline-color:light-dark(#0060df, #aaf2ff);--swatch-border-color:light-dark(#cfcfd8, #52525e)}@media screen and (forced-colors:active){.colorPicker{--hover-outline-color:Highlight;--selected-outline-color:var(--hover-outline-color);--swatch-border-color:ButtonText}}.colorPicker .swatch{width:16px;height:16px;border:1px solid var(--swatch-border-color);border-radius:100%;outline-offset:2px;box-sizing:border-box;forced-color-adjust:none}.colorPicker button:is(:hover,.selected)>.swatch{border:none}.basicColorPicker{width:28px}.basicColorPicker::-moz-color-swatch{border-radius:100%;margin:0}.basicColorPicker::-webkit-color-swatch{border-radius:100%;margin:0}.annotationEditorLayer[data-main-rotation="0"] .highlightEditor:not(.free)>.editToolbar{rotate:0deg}.annotationEditorLayer[data-main-rotation="90"] .highlightEditor:not(.free)>.editToolbar{rotate:270deg}.annotationEditorLayer[data-main-rotation="180"] .highlightEditor:not(.free)>.editToolbar{rotate:180deg}.annotationEditorLayer[data-main-rotation="270"] .highlightEditor:not(.free)>.editToolbar{rotate:90deg}.annotationEditorLayer .highlightEditor{position:absolute;background:transparent;z-index:1;cursor:auto;max-width:100%;max-height:100%;border:none;outline:none;pointer-events:none;transform-origin:0 0}.annotationEditorLayer .highlightEditor:not(.free){transform:none}.annotationEditorLayer .highlightEditor .internal{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:auto}.annotationEditorLayer .highlightEditor.disabled .internal{pointer-events:none}.annotationEditorLayer .highlightEditor.selectedEditor .internal{cursor:pointer}.annotationEditorLayer .highlightEditor .editToolbar{--editor-toolbar-colorpicker-arrow-image:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.23336%2010.4664L11.8474%206.85339C11.894%206.8071%2011.931%206.75203%2011.9563%206.69136C11.9816%206.63069%2011.9946%206.56562%2011.9946%206.49989C11.9946%206.43417%2011.9816%206.3691%2011.9563%206.30843C11.931%206.24776%2011.894%206.19269%2011.8474%206.14639C11.7536%206.05266%2011.6264%206%2011.4939%206C11.3613%206%2011.2341%206.05266%2011.1404%206.14639L7.99236%209.29339L4.84736%206.14739C4.75305%206.05631%204.62675%206.00592%204.49566%206.00706C4.36456%206.0082%204.23915%206.06078%204.14645%206.15348C4.05374%206.24619%204.00116%206.37159%204.00002%206.50269C3.99888%206.63379%204.04928%206.76009%204.14036%206.85439L7.75236%2010.4674L8.23336%2010.4664Z'%20fill='black'/%3e%3c/svg%3e");transform-origin:center!important}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker{position:relative;width:auto;display:flex;justify-content:center;align-items:center;gap:4px;padding:4px}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker:after{content:"";-webkit-mask-image:var(--editor-toolbar-colorpicker-arrow-image);mask-image:var(--editor-toolbar-colorpicker-arrow-image);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;display:inline-block;background-color:var(--editor-toolbar-fg-color);width:12px;height:12px}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker:hover:after{background-color:var(--editor-toolbar-hover-fg-color)}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker:has(.dropdown:not(.hidden)){background-color:var(--editor-toolbar-hover-bg-color)}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker:has(.dropdown:not(.hidden)):after{scale:-1}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker .dropdown{position:absolute;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:11px;padding-block:8px;border-radius:6px;background-color:var(--editor-toolbar-bg-color);border:1px solid var(--editor-toolbar-border-color);box-shadow:var(--editor-toolbar-shadow);inset-block-start:calc(100% + 4px);width:calc(100% + 2 * var(--editor-toolbar-padding))}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker .dropdown button{width:100%;height:auto;border:none;cursor:pointer;display:flex;justify-content:center;align-items:center;background:none}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker .dropdown button:is(:active,:focus-visible){outline:none}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker .dropdown button>.swatch{outline-offset:2px}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker .dropdown button[aria-selected=true]>.swatch{outline:2px solid var(--selected-outline-color)}.annotationEditorLayer .highlightEditor .editToolbar .buttons .colorPicker .dropdown button:is(:hover,:active,:focus-visible)>.swatch{outline:2px solid var(--hover-outline-color)}.editorParamsToolbar:has(#highlightParamsToolbarContainer){padding:unset}#highlightParamsToolbarContainer{gap:16px;padding-inline:10px;padding-block-end:12px}#highlightParamsToolbarContainer .colorPicker{display:flex;flex-direction:column;gap:8px}#highlightParamsToolbarContainer .colorPicker .dropdown{display:flex;justify-content:space-between;align-items:center;flex-direction:row;height:auto}#highlightParamsToolbarContainer .colorPicker .dropdown button{width:auto;height:auto;border:none;cursor:pointer;display:flex;justify-content:center;align-items:center;background:none;flex:0 0 auto;padding:0}#highlightParamsToolbarContainer .colorPicker .dropdown button .swatch{width:24px;height:24px}#highlightParamsToolbarContainer .colorPicker .dropdown button:is(:active,:focus-visible){outline:none}#highlightParamsToolbarContainer .colorPicker .dropdown button[aria-selected=true]>.swatch{outline:2px solid var(--selected-outline-color)}#highlightParamsToolbarContainer .colorPicker .dropdown button:is(:hover,:active,:focus-visible)>.swatch{outline:2px solid var(--hover-outline-color)}#highlightParamsToolbarContainer #editorHighlightThickness{display:flex;flex-direction:column;align-items:center;gap:4px;align-self:stretch}#highlightParamsToolbarContainer #editorHighlightThickness .editorParamsLabel{height:auto;align-self:stretch}#highlightParamsToolbarContainer #editorHighlightThickness .thicknessPicker{display:flex;justify-content:space-between;align-items:center;align-self:stretch;--example-color:light-dark(#bfbfc9, #80808e)}@media screen and (forced-colors:active){#highlightParamsToolbarContainer #editorHighlightThickness .thicknessPicker{--example-color:CanvasText}}:is(#highlightParamsToolbarContainer #editorHighlightThickness .thicknessPicker>.editorParamsSlider[disabled]){opacity:.4}#highlightParamsToolbarContainer #editorHighlightThickness .thicknessPicker:before,#highlightParamsToolbarContainer #editorHighlightThickness .thicknessPicker:after{content:"";width:8px;aspect-ratio:1;display:block;border-radius:100%;background-color:var(--example-color)}#highlightParamsToolbarContainer #editorHighlightThickness .thicknessPicker:after{width:24px}#highlightParamsToolbarContainer #editorHighlightThickness .thicknessPicker .editorParamsSlider{width:unset;height:14px}#highlightParamsToolbarContainer #editorHighlightVisibility{display:flex;flex-direction:column;align-items:flex-start;gap:8px;align-self:stretch}#highlightParamsToolbarContainer #editorHighlightVisibility .divider{--divider-color:light-dark(#d7d7db, #8f8f9d);margin-block:4px;width:100%;height:1px;background-color:var(--divider-color)}@media screen and (forced-colors:active){#highlightParamsToolbarContainer #editorHighlightVisibility .divider{--divider-color:CanvasText}}#highlightParamsToolbarContainer #editorHighlightVisibility .toggler{display:flex;justify-content:space-between;align-items:center;align-self:stretch}#altTextSettingsDialog{padding:16px}#altTextSettingsDialog #altTextSettingsContainer{display:flex;width:573px;flex-direction:column;gap:16px}#altTextSettingsDialog #altTextSettingsContainer .mainContainer{gap:16px}#altTextSettingsDialog #altTextSettingsContainer .description{color:var(--text-secondary-color)}#altTextSettingsDialog #altTextSettingsContainer #aiModelSettings{display:flex;flex-direction:column;gap:12px}#altTextSettingsDialog #altTextSettingsContainer #automaticAltText,#altTextSettingsDialog #altTextSettingsContainer #altTextEditor{display:flex;flex-direction:column;gap:8px}#altTextSettingsDialog #altTextSettingsContainer #createModelDescription,#altTextSettingsDialog #altTextSettingsContainer #aiModelSettings,#altTextSettingsDialog #altTextSettingsContainer #showAltTextDialogDescription{padding-inline-start:40px}#altTextSettingsDialog #altTextSettingsContainer #automaticSettings{display:flex;flex-direction:column;gap:16px}button.hasPopupMenu[aria-expanded=true]+menu{visibility:visible}button.hasPopupMenu[aria-expanded=false]+menu{visibility:hidden}.popupMenu{--menuitem-checkmark-icon:url("data:image/svg+xml,%3csvg%20width='11'%20height='11'%20viewBox='0%200%2011%2011'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.79253%200.14683C10.2086%200.418844%2010.3253%200.976607%2010.0533%201.39263L4.56097%209.79263C4.4081%2010.0264%204.15533%2010.176%203.87682%2010.1974C3.5983%2010.2189%203.32561%2010.1098%203.13874%209.90217L0.231043%206.6714C-0.10147%206.30194%20-0.0715196%205.73288%200.29794%205.40037C0.667399%205.06786%201.23646%205.09781%201.56897%205.46727L3.69438%207.82883L8.54674%200.407579C8.81875%20-0.00844234%209.37651%20-0.125183%209.79253%200.14683Z'%20fill='black'/%3e%3c/g%3e%3c/svg%3e");--menu-mark-icon-size:0;--menu-icon-size:16px;--menuitem-gap:5px;--menuitem-border-color:transparent;--menuitem-active-bg:color-mix( in srgb, var(--menu-text-color), transparent 79% );--menuitem-text-active-fg:var(--menu-text-color);--menuitem-active-border-color:var(--menuitem-border-color);--menuitem-focus-bg:color-mix( in srgb, var(--menu-text-color), transparent 93% );--menuitem-focus-outline-color:var( --focus-outline-color, light-dark(#0062fa, #00cadb) );--menuitem-focus-border-color:light-dark(white, black);--menu-bg:var(--background-color-box, light-dark(white, #23222b));--menu-background-blend-mode:normal;--menu-box-shadow:0 .375px 1.5px 0 light-dark(rgb(0 0 0 / .05), rgb(0 0 0 / .2)), 0 3px 12px 0 light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .4));--menu-border-color:light-dark(rgb(21 20 26 / .1), rgb(251 251 254 / .1));--menuitem-border-radius:8px;--menu-backdrop-filter:none;--menu-text-color:var(--text-color, light-dark(#15141a, #fbfbfe));--menu-text-disabled-color:var(--menu-text-color);--menuitem-text-hover-fg:var(--menu-text-color);--menuitem-hover-bg:color-mix( in srgb, var(--menu-text-color), transparent 86% );--menuitem-hover-background-blend-mode:normal;--disabled-opacity:.62;display:flex;flex-direction:column;width:-moz-max-content;width:max-content;height:auto;position:relative;left:0;top:1px;margin:0;padding:5px;box-sizing:border-box;background:var(--menu-bg);background-blend-mode:var(--menu-background-blend-mode);box-shadow:var(--menu-box-shadow);border-radius:6px;border:1px solid var(--menu-border-color);-webkit-backdrop-filter:var(--menu-backdrop-filter);backdrop-filter:var(--menu-backdrop-filter)}@media screen and (forced-colors:active){.popupMenu{--menu-bg:var(--background-color-box, Canvas);--menu-background-blend-mode:normal;--menu-box-shadow:none;--menu-backdrop-filter:none;--menu-text-color:var(--text-color, ButtonText);--menu-text-disabled-color:GrayText;--menu-border-color:CanvasText;--menuitem-border-color:none;--menuitem-hover-bg:SelectedItemText;--menuitem-text-hover-fg:SelectedItem;--menuitem-active-bg:SelectedItemText;--menuitem-active-border-color:ButtonText;--menuitem-text-active-fg:SelectedItem;--menuitem-focus-bg:ButtonFace;--menuitem-focus-outline-color:var(--focus-outline-color, CanvasText);--menuitem-focus-border-color:none;--disabled-opacity:1}}.popupMenu.withMark{--menu-mark-icon-size:16px}.popupMenu>button{display:flex;align-items:center;position:relative;width:100%;height:26px;padding-inline:calc(var(--menu-mark-icon-size) + var(--menuitem-gap)) var(--menuitem-gap);gap:var(--menuitem-gap);box-sizing:border-box;border-radius:var(--menuitem-border-radius);border:1px solid var(--menuitem-border-color);background:transparent}.popupMenu>button.selected:after{content:"";display:inline-block;width:11px;height:11px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:var(--menuitem-checkmark-icon);mask-image:var(--menuitem-checkmark-icon);background-color:var(--menu-text-color);position:absolute;inset-inline-start:var(--menuitem-gap);top:50%;transform:translateY(-50%) scaleX(var(--dir-factor))}.popupMenu>button:disabled{opacity:var(--disabled-opacity)}.popupMenu>button:disabled.selected:after{background-color:var(--menu-text-disabled-color)}.popupMenu>button:disabled:not(.noIcon):before{background-color:var(--menu-text-disabled-color)}.popupMenu>button:disabled>span{color:var(--menu-text-disabled-color)}.popupMenu>button:not(:disabled):hover{background:var(--menuitem-hover-bg);background-blend-mode:var(--menuitem-hover-background-blend-mode)}.popupMenu>button:not(:disabled):hover:not(.noIcon):before{background-color:var(--menuitem-text-hover-fg)}.popupMenu>button:not(:disabled):hover>span{color:var(--menuitem-text-hover-fg)}.popupMenu>button:not(:disabled):hover.selected:after{background-color:var(--menuitem-text-hover-fg)}.popupMenu>button:not(:disabled):active{background-color:var(--menuitem-active-bg);border-color:var(--menuitem-active-border-color)}.popupMenu>button:not(:disabled):active>span{color:var(--menuitem-text-active-fg)}.popupMenu>button:not(:disabled):focus-visible{border-color:var(--menuitem-focus-border-color);background-color:var(--menuitem-focus-bg);outline:2px solid var(--menuitem-focus-outline-color);outline-offset:2px}.popupMenu>button:not(.noIcon):before{display:inline-block;width:var(--menu-icon-size);height:var(--menu-icon-size);content:"";-webkit-mask-size:cover;mask-size:cover;-webkit-mask-position:center;mask-position:center;background-color:var(--menu-text-color)}.popupMenu>button>span{display:flex;align-items:center;align-self:stretch;width:100%;min-width:-moz-max-content;min-width:max-content;text-align:start;color:var(--menu-text-color);-webkit-user-select:none;-moz-user-select:none;user-select:none;padding-inline-start:6px;font:menu;font-size:13px;font-style:normal;font-weight:510;line-height:normal}.treeView{--treeitem-color:light-dark(rgb(0 0 0 / .8), rgb(255 255 255 / .8));--treeitem-bg-color:light-dark(rgb(0 0 0 / .15), rgb(255 255 255 / .15));--treeitem-hover-color:light-dark(rgb(0 0 0 / .9), rgb(255 255 255 / .9));--treeitem-selected-color:light-dark( rgb(0 0 0 / .9), rgb(255 255 255 / .9) );--treeitem-selected-bg-color:light-dark( rgb(0 0 0 / .25), rgb(255 255 255 / .25) );--treeitem-expanded-icon:url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%3e%3cpath%20d='M10%2013l4-7H6z'/%3e%3c/svg%3e");--treeitem-collapsed-icon:url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%3e%3cpath%20d='M13%209L6%205v8z'/%3e%3c/svg%3e")}.treeView.withNesting .treeItemToggler{position:relative;float:inline-start;height:0;width:0;color:#ffffff80}.treeView.withNesting .treeItemToggler:before{position:absolute;display:inline-block;width:16px;height:16px;inset-inline-end:4px;content:"";background-color:var(--toolbar-icon-bg-color);-webkit-mask-image:var(--treeitem-expanded-icon);mask-image:var(--treeitem-expanded-icon);-webkit-mask-size:cover;mask-size:cover}.treeView.withNesting .treeItemToggler.treeItemsHidden:before{-webkit-mask-image:var(--treeitem-collapsed-icon);mask-image:var(--treeitem-collapsed-icon);transform:scaleX(var(--dir-factor))}.treeView.withNesting .treeItemToggler.treeItemsHidden~.treeItems{display:none}.treeView.withNesting .treeItemToggler:hover+a,.treeView.withNesting .treeItemToggler:hover~.treeItems{background-color:var(--treeitem-bg-color);background-clip:padding-box;border-radius:2px;color:var(--treeitem-hover-color)}.treeView.withNesting>.treeItem,.treeView.withNesting .treeItem>.treeItems{margin-inline-start:20px}.treeView#layersView .treeItem>a *{cursor:pointer}.treeView#layersView .treeItem>a>label{display:flex;align-items:center;padding-inline-start:4px}.treeView#layersView .treeItem>a>label>input{margin-top:1px}.treeView .treeItem>a{text-decoration:none;display:inline-block;min-width:calc(100% - 4px);height:auto;margin-bottom:1px;padding:2px 0 5px;padding-inline-start:4px;border-radius:2px;color:var(--treeitem-color);font-size:13px;line-height:15px;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:normal;cursor:default}.treeView .treeItem>a:hover{background-color:var(--treeitem-bg-color);background-clip:padding-box;border-radius:2px;color:var(--treeitem-hover-color)}.treeView .treeItem.selected>a{background-color:var(--treeitem-selected-bg-color);color:var(--treeitem-selected-color)}#outerContainer.viewsManagerMoving #viewsManager{visibility:visible}#outerContainer.viewsManagerOpen #viewsManager{visibility:visible;inset-inline-start:8px}#outerContainer.viewsManagerOpen #viewerContainer:not(.pdfPresentationMode){inset-inline-start:var(--viewsManager-width, 0);transition-property:inset-inline-start}#outerContainer.viewsManagerResizing :is(#sidebarContainer,#viewerContainer,#loadingBar){transition-duration:0s}#viewsManager{--views-manager-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3%207H5C5.53043%207%206.03914%206.78929%206.41421%206.41421C6.78929%206.03914%207%205.53043%207%205V3C7%202.46957%206.78929%201.96086%206.41421%201.58579C6.03914%201.21071%205.53043%201%205%201H3C2.46957%201%201.96086%201.21071%201.58579%201.58579C1.21071%201.96086%201%202.46957%201%203V5C1%205.53043%201.21071%206.03914%201.58579%206.41421C1.96086%206.78929%202.46957%207%203%207ZM11%207H13C13.5304%207%2014.0391%206.78929%2014.4142%206.41421C14.7893%206.03914%2015%205.53043%2015%205V3C15%202.46957%2014.7893%201.96086%2014.4142%201.58579C14.0391%201.21071%2013.5304%201%2013%201H11C10.4696%201%209.96086%201.21071%209.58579%201.58579C9.21071%201.96086%209%202.46957%209%203V5C9%205.53043%209.21071%206.03914%209.58579%206.41421C9.96086%206.78929%2010.4696%207%2011%207ZM5%2015H3C2.46957%2015%201.96086%2014.7893%201.58579%2014.4142C1.21071%2014.0391%201%2013.5304%201%2013V11C1%2010.4696%201.21071%209.96086%201.58579%209.58579C1.96086%209.21071%202.46957%209%203%209H5C5.53043%209%206.03914%209.21071%206.41421%209.58579C6.78929%209.96086%207%2010.4696%207%2011V13C7%2013.5304%206.78929%2014.0391%206.41421%2014.4142C6.03914%2014.7893%205.53043%2015%205%2015ZM11%2015H13C13.5304%2015%2014.0391%2014.7893%2014.4142%2014.4142C14.7893%2014.0391%2015%2013.5304%2015%2013V11C15%2010.4696%2014.7893%209.96086%2014.4142%209.58579C14.0391%209.21071%2013.5304%209%2013%209H11C10.4696%209%209.96086%209.21071%209.58579%209.58579C9.21071%209.96086%209%2010.4696%209%2011V13C9%2013.5304%209.21071%2014.0391%209.58579%2014.4142C9.96086%2014.7893%2010.4696%2015%2011%2015Z'%20fill='black'/%3e%3c/svg%3e");--views-manager-button-arrow-icon:url("data:image/svg+xml,%3csvg%20width='8'%20height='10'%20viewBox='0%200%208%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.23336%207.46639L7.84736%203.85339C7.89401%203.8071%207.93104%203.75203%207.9563%203.69136C7.98157%203.63069%207.99458%203.56562%207.99458%203.49989C7.99458%203.43417%207.98157%203.3691%207.9563%203.30843C7.93104%203.24776%207.89401%203.19269%207.84736%203.14639C7.75359%203.05266%207.62644%203%207.49386%203C7.36127%203%207.23412%203.05266%207.14036%203.14639L3.99236%206.29339L0.847356%203.14739C0.753055%203.05631%200.626754%203.00592%200.495655%203.00706C0.364557%203.0082%200.239151%203.06078%200.146447%203.15348C0.0537425%203.24619%200.00115811%203.37159%201.89013e-05%203.50269C-0.00112031%203.63379%200.0492769%203.76009%200.140356%203.85439L3.75236%207.46739L4.23336%207.46639Z'%20fill='black'/%3e%3c/svg%3e");--views-manager-add-file-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.00488%209.75V14C7.00488%2014.1658%207.07073%2014.3247%207.18794%2014.4419C7.30515%2014.5592%207.46412%2014.625%207.62988%2014.625C7.79564%2014.625%207.95461%2014.5592%208.07183%2014.4419C8.18904%2014.3247%208.25488%2014.1658%208.25488%2014V9.75L8.75488%209.25H13.0049C13.1706%209.25%2013.3296%209.18415%2013.4468%209.06694C13.564%208.94973%2013.6299%208.79076%2013.6299%208.625C13.6299%208.45924%2013.564%208.30027%2013.4468%208.18306C13.3296%208.06585%2013.1706%208%2013.0049%208H8.75488L8.25488%207.5V3.25C8.25488%203.08424%208.18904%202.92527%208.07183%202.80806C7.95461%202.69085%207.79564%202.625%207.62988%202.625C7.46412%202.625%207.30515%202.69085%207.18794%202.80806C7.07073%202.92527%207.00488%203.08424%207.00488%203.25V7.5L6.50488%208H2.25488C2.08912%208%201.93015%208.06585%201.81294%208.18306C1.69573%208.30027%201.62988%208.45924%201.62988%208.625C1.62988%208.79076%201.69573%208.94973%201.81294%209.06694C1.93015%209.18415%202.08912%209.25%202.25488%209.25H6.39188L7.00488%209.75Z'%20fill='black'/%3e%3c/svg%3e");--current-outline-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.803%204.74998V6.02436C10.803%206.39302%2010.3571%206.57793%2010.0967%206.31753L7.87716%204.098C7.71566%203.93649%207.71566%203.67434%207.87716%203.51283L10.0967%201.29329C10.3571%201.0329%2010.8036%201.21722%2010.8036%201.58588V3.24998H15V4.74998H10.803ZM8%201.24998H3V2.74998H6.5L8%201.24998ZM6.5%205.24998H3V6.74998H8L6.5%205.24998ZM3%2013.25H15V14.75H3V13.25ZM6%209.24998H15V10.75H6V9.24998ZM1.5%205.24998H0V6.74998H1.5V5.24998ZM0%2013.25H1.5V14.75H0V13.25ZM1.5%201.24998H0V2.74998H1.5V1.24998ZM3%209.24998H4.5V10.75H3V9.24998Z'%20fill='black'/%3e%3c/svg%3e");--menuitem-thumbnailsView-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3%207H5C5.53043%207%206.03914%206.78929%206.41421%206.41421C6.78929%206.03914%207%205.53043%207%205V3C7%202.46957%206.78929%201.96086%206.41421%201.58579C6.03914%201.21071%205.53043%201%205%201H3C2.46957%201%201.96086%201.21071%201.58579%201.58579C1.21071%201.96086%201%202.46957%201%203V5C1%205.53043%201.21071%206.03914%201.58579%206.41421C1.96086%206.78929%202.46957%207%203%207ZM11%207H13C13.5304%207%2014.0391%206.78929%2014.4142%206.41421C14.7893%206.03914%2015%205.53043%2015%205V3C15%202.46957%2014.7893%201.96086%2014.4142%201.58579C14.0391%201.21071%2013.5304%201%2013%201H11C10.4696%201%209.96086%201.21071%209.58579%201.58579C9.21071%201.96086%209%202.46957%209%203V5C9%205.53043%209.21071%206.03914%209.58579%206.41421C9.96086%206.78929%2010.4696%207%2011%207ZM5%2015H3C2.46957%2015%201.96086%2014.7893%201.58579%2014.4142C1.21071%2014.0391%201%2013.5304%201%2013V11C1%2010.4696%201.21071%209.96086%201.58579%209.58579C1.96086%209.21071%202.46957%209%203%209H5C5.53043%209%206.03914%209.21071%206.41421%209.58579C6.78929%209.96086%207%2010.4696%207%2011V13C7%2013.5304%206.78929%2014.0391%206.41421%2014.4142C6.03914%2014.7893%205.53043%2015%205%2015ZM11%2015H13C13.5304%2015%2014.0391%2014.7893%2014.4142%2014.4142C14.7893%2014.0391%2015%2013.5304%2015%2013V11C15%2010.4696%2014.7893%209.96086%2014.4142%209.58579C14.0391%209.21071%2013.5304%209%2013%209H11C10.4696%209%209.96086%209.21071%209.58579%209.58579C9.21071%209.96086%209%2010.4696%209%2011V13C9%2013.5304%209.21071%2014.0391%209.58579%2014.4142C9.96086%2014.7893%2010.4696%2015%2011%2015Z'%20fill='black'/%3e%3c/svg%3e");--menuitem-outlinesView-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3%201.25H15V2.75H3V1.25ZM15%205.25H3V6.75H15V5.25ZM15%2013.25H3V14.75H15V13.25ZM15%209.25H6V10.75H15V9.25ZM0%205.25H1.5V6.75H0V5.25ZM1.5%2013.25H0V14.75H1.5V13.25ZM0%201.25H1.5V2.75H0V1.25ZM4.5%209.25H3V10.75H4.5V9.25Z'%20fill='black'/%3e%3c/svg%3e");--menuitem-attachmentsView-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.5%203.75C3.5%201.67879%205.17879%200%207.25%200C9.32121%200%2011%201.67879%2011%203.75V10.25C11%2011.4922%209.99221%2012.5%208.75%2012.5C7.50779%2012.5%206.5%2011.4922%206.5%2010.25V3.5H8V10.25C8%2010.6638%208.33621%2011%208.75%2011C9.16379%2011%209.5%2010.6638%209.5%2010.25V3.75C9.5%202.50721%208.49279%201.5%207.25%201.5C6.00721%201.5%205%202.50721%205%203.75V10.75C5%2012.8208%206.67921%2014.5%208.75%2014.5C10.8208%2014.5%2012.5%2012.8208%2012.5%2010.75V3.5H14V10.75C14%2013.6492%2011.6492%2016%208.75%2016C5.85079%2016%203.5%2013.6492%203.5%2010.75V3.75Z'%20fill='black'/%3e%3c/svg%3e");--menuitem-layersView-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.36645%202.34562C8.13878%202.21813%207.86122%202.21813%207.63355%202.34562L1.38355%205.84562C1.14669%205.97826%201%206.22853%201%206.5C1%206.77147%201.14669%207.02174%201.38355%207.15438L7.63355%2010.6544C7.86122%2010.7819%208.13878%2010.7819%208.36645%2010.6544L14.6165%207.15438C14.8533%207.02174%2015%206.77147%2015%206.5C15%206.22853%2014.8533%205.97826%2014.6165%205.84562L8.36645%202.34562ZM8%209.14041L3.28499%206.5L8%203.85959L12.715%206.5L8%209.14041ZM1.63647%209.0766L7.99999%2012.6404L14.3255%209.09761L15.0585%2010.4063L8.36649%2014.1543C8.13881%2014.2818%207.86122%2014.2819%207.63353%2014.1543L0.903534%2010.3853L1.63647%209.0766Z'%20fill='black'/%3e%3c/svg%3e");--manage-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.35176%2010.9989L13.8178%205.53391C13.876%205.47594%2013.9222%205.40702%2013.9537%205.33113C13.9851%205.25524%2014.0013%205.17387%2014.0012%205.0917C14.0011%205.00954%2013.9848%204.9282%2013.9531%204.85238C13.9215%204.77656%2013.8751%204.70775%2013.8168%204.64991C13.6991%204.53309%2013.5401%204.46753%2013.3743%204.46753C13.2085%204.46753%2013.0494%204.53309%2012.9318%204.64991L7.99776%209.58491L3.06776%204.65091C2.9494%204.53853%202.79183%204.47682%202.62863%204.47894C2.46542%204.48106%202.3095%204.54683%202.19409%204.66224C2.07868%204.77765%202.01291%204.93357%202.01079%205.09677C2.00868%205.25997%202.07039%205.41754%202.18276%205.53591L7.64776%2010.9999L8.35176%2010.9989Z'%20fill='black'/%3e%3c/svg%3e");--close-button-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14%203.06055L9.06055%208L14%2012.9385L12.9395%2014L8%209.06055L3.06152%2014L2.00098%2012.9395L6.93848%208L2%203.06152L3.06055%202.00098L7.99902%206.93945L12.9385%202L14%203.06055Z'%20fill='black'/%3e%3c/svg%3e");--undo-label-icon:url("data:image/svg+xml,%3csvg%20width='12'%20height='13'%20viewBox='0%200%2012%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6%200.5C5.21207%200.5%204.43185%200.655195%203.7039%200.956723C2.97595%201.25825%202.31451%201.70021%201.75736%202.25736C1.20021%202.81451%200.758251%203.47595%200.456723%204.2039C0.155195%204.93185%200%205.71207%200%206.5C0%207.28793%200.155195%208.06815%200.456723%208.7961C0.758251%209.52405%201.20021%2010.1855%201.75736%2010.7426C2.31451%2011.2998%202.97595%2011.7417%203.7039%2012.0433C4.43185%2012.3448%205.21207%2012.5%206%2012.5C7.5913%2012.5%209.11742%2011.8679%2010.2426%2010.7426C11.3679%209.61742%2012%208.0913%2012%206.5C12%204.9087%2011.3679%203.38258%2010.2426%202.25736C9.11742%201.13214%207.5913%200.5%206%200.5ZM5.06%208.9L2.9464%206.7856C2.85273%206.69171%202.80018%206.56446%202.80033%206.43183C2.80048%206.29921%202.85331%206.17207%202.9472%206.0784C3.04109%205.98473%203.16834%205.93218%203.30097%205.93233C3.43359%205.93248%203.56073%205.98531%203.6544%206.0792L5.3112%207.7368L8.3464%204.7008C8.44109%204.6109%208.56715%204.56153%208.69771%204.56322C8.82827%204.56492%208.95301%204.61754%209.04534%204.70986C9.13766%204.80219%209.19028%204.92693%209.19198%205.05749C9.19367%205.18805%209.1443%205.31411%209.0544%205.4088L5.5624%208.9H5.06Z'%20fill='%23FBFBFE'/%3e%3c/svg%3e");--pages-selected-icon:url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask'%3e%3crect%20width='16'%20height='16'%20rx='2'%20fill='white'/%3e%3cpath%20d='M12%208L4%208'%20stroke='black'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/mask%3e%3crect%20width='16'%20height='16'%20fill='black'%20mask='url(%23mask)'/%3e%3c/svg%3e");--spinner-icon:url("data:image/svg+xml,%3c!--%20This%20Source%20Code%20Form%20is%20subject%20to%20the%20terms%20of%20the%20Mozilla%20Public%20-%20License,%20v.%202.0.%20If%20a%20copy%20of%20the%20MPL%20was%20not%20distributed%20with%20this%20-%20file,%20You%20can%20obtain%20one%20at%20http://mozilla.org/MPL/2.0/.%20--%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20width='16'%20height='16'%3e%3cstyle%3e%20@media%20not%20(prefers-reduced-motion)%20{%20@keyframes%20loadingRotate%20{%20from%20{%20rotate:%200;%20}%20to%20{%20rotate:%20360deg%20}%20}%20%23circle-arrows%20{%20animation:%20loadingRotate%201.8s%20linear%20infinite;%20transform-origin:%2050%25%2050%25;%20}%20%23hourglass%20{%20display:%20none;%20}%20}%20@media%20(prefers-reduced-motion)%20{%20%23circle-arrows%20{%20display:%20none;%20}%20}%20%3c/style%3e%3cpath%20id='circle-arrows'%20d='M9%205.528c0%20.42.508.63.804.333l2.528-2.528a.47.47%200%200%200%200-.666L9.805.14A.471.471%200%200%200%209%20.472v1.866A5.756%205.756%200%200%200%202.25%208c0%20.942.232%201.83.635%202.615l1.143-1.143A4.208%204.208%200%200%201%203.75%208%204.254%204.254%200%200%201%208%203.75c.345%200%20.68.042%201%20.122v1.656zM7%2010.472v1.656c.32.08.655.122%201%20.122A4.254%204.254%200%200%200%2012.25%208c0-.52-.107-1.013-.279-1.474l1.143-1.143c.404.786.636%201.674.636%202.617A5.756%205.756%200%200%201%207%2013.662v1.866a.47.47%200%200%201-.804.333l-2.528-2.528a.47.47%200%200%201%200-.666l2.528-2.528a.47.47%200%200%201%20.804.333z'/%3e%3cg%20id='hourglass'%3e%3cpath%20d='M13,1%20C13.5522847,1%2014,1.44771525%2014,2%20C14,2.55228475%2013.5522847,3%2013,3%20L12.9854217,2.99990801%20C12.9950817,3.16495885%2013,3.33173274%2013,3.5%20C13,5.24679885%2010.9877318,6.01090495%2010.9877318,8.0017538%20C10.9877318,9.99260264%2013,10.7536922%2013,12.5%20C13,12.6686079%2012.9950617,12.8357163%2012.985363,13.0010943%20L13,13%20C13.5522847,13%2014,13.4477153%2014,14%20C14,14.5522847%2013.5522847,15%2013,15%20L3,15%20C2.44771525,15%202,14.5522847%202,14%20C2,13.4477153%202.44771525,13%203,13%20L3.01463704,13.0010943%20C3.00493827,12.8357163%203,12.6686079%203,12.5%20C3,10.7536922%204.9877318,9.99260264%205,8.0017538%20C5.0122682,6.01090495%203,5.24679885%203,3.5%20C3,3.33173274%203.00491834,3.16495885%203.01457832,2.99990801%20L3,3%20C2.44771525,3%202,2.55228475%202,2%20C2,1.44771525%202.44771525,1%203,1%20L13,1%20Z%20M10.987,3%20L5.012,3%20L5.00308914,3.24815712%20C5.00103707,3.33163368%205,3.4155948%205,3.5%20C5,5.36125069%206.99153646,6.01774089%206.99153646,8.0017538%20C6.99153646,9.98576671%205,10.6393737%205,12.5%20L5.00307746,12.7513676%20L5.01222201,12.9998392%20L5.60191711,12.9988344%20L6.0425138,12.2959826%20C7.02362731,10.7653275%207.67612271,10%208,10%20C8.37014547,10%209.16950644,10.9996115%2010.3980829,12.9988344%20L10.987778,12.9998392%20C10.9958674,12.8352104%2011,12.66849%2011,12.5%20C11,10.6393737%208.98689779,10.0147381%208.98689779,8.0017538%20C8.98689779,5.98876953%2011,5.36125069%2011,3.5%20L10.9969109,3.24815712%20L10.987,3%20Z'/%3e%3cpath%20d='M6,4%20L10,4%20C8.95166016,6%208.28499349,7%208,7%20C7.71500651,7%207.04833984,6%206,4%20Z'/%3e%3c/g%3e%3c/svg%3e");--sidebar-bg-color:light-dark(rgb(255 255 255 / .92), rgb(66 65 77 / .92));--sidebar-backdrop-filter:blur(7px);--sidebar-width:230px;--sidebar-min-width:min-content;--sidebar-max-width:50vw;--sidebar-block-padding:8px;--views-text-color:var(--text-color, light-dark(#15141a, #fbfbfe));--button-fg:var(--views-text-color);--button-no-bg:var(--button-background-color-toolbar, transparent);--button-bg:var( --button-background-color, light-dark(rgb(21 20 26 / .07), rgb(251 251 254 / .07)) );--views-button-border-color:var(--button-border-color, transparent);--button-hover-bg:var( --button-background-color-hover, light-dark(rgb(21 20 26 / .14), rgb(251 251 254 / .14)) );--button-hover-fg:var(--views-text-color);--button-hover-border-color:var(--views-button-border-color);--button-active-bg:var( --button-background-color-active, light-dark(rgb(21 20 26 / .21), rgb(251 251 254 / .21)) );--button-active-fg:var(--views-text-color);--button-active-border-color:var(--views-button-border-color);--button-focus-no-bg:color-mix( in srgb, var(--views-text-color), transparent 93% );--button-focus-outline-color:var( --focus-outline-color, light-dark(#0062fa, #00cadb) );--button-focus-border-color:light-dark(white, black);--status-border-color:transparent;--status-actions-bg:light-dark( rgb(21 20 26 / .03), rgb(251 251 254 / .03) );--status-undo-bg:light-dark(rgb(0 98 250 / .08), rgb(0 202 219 / .08));--status-waiting-bg:var(--status-undo-bg);--indicator-color:var(--color-accent-primary, light-dark(#0062fa, #00cadb));--status-warning-bg:light-dark(#ffe8ea, #6e001f);--indicator-warning-color:light-dark(#b20037, #ffa0aa);--header-shadow:0 .25px .75px -.75px light-dark(rgb(0 0 0 / .05), rgb(0 0 0 / .2)), 0 2px 6px -6px light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .4));--header-bg:light-dark(rgb(255 255 255 / .92), #42414e);--image-outline:none;--image-border-width:6px;--image-border-color:light-dark(#cfcfd8, #3a3944);--image-hover-border-color:#bfbfc9;--image-current-border-color:var(--button-focus-outline-color);--image-current-focused-outline-color:var(--image-hover-border-color);--image-page-number-bg:light-dark(#f0f0f4, #42414d);--image-page-number-fg:var(--views-text-color);--image-page-number-border-color:transparent;--image-hover-page-number-bg:var(--image-page-number-bg);--image-hover-page-number-fg:var(--image-page-number-fg);--image-current-page-number-bg:var(--image-current-border-color);--image-current-page-number-fg:light-dark(#fff, #15141a);--image-current-hover-page-number-bg:var(--image-current-page-number-bg);--image-current-hover-page-number-fg:var(--image-current-page-number-fg);--image-shadow:0 .375px 1.5px 0 light-dark(rgb(0 0 0 / .05), rgb(0 0 0 / .2)), 0 0 0 1px var(--image-border-color), 0 3px 12px 0 light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .4));--image-hover-shadow:0 .375px 1.5px 0 light-dark(rgb(0 0 0 / .05), rgb(0 0 0 / .2)), 0 0 0 1px light-dark(rgb(21 20 26 / .1), rgb(251 251 254 / .1)), 0 0 0 var(--image-border-width) var(--image-hover-border-color), 0 3px 12px 0 light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .4));--image-current-shadow:0 .375px 1.5px 0 light-dark(rgb(0 0 0 / .05), rgb(0 0 0 / .2)), 0 0 0 var(--image-border-width) var(--image-current-border-color), 0 3px 12px 0 light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .4));--image-dragging-placeholder-bg:light-dark( rgb(0 98 250 / .08), rgb(0 202 219 / .08) );--image-dragging-placeholder-border:var(--image-outline);--multiple-dragging-bg:white;--image-multiple-dragging-shadow:0 0 0 var(--image-border-width) var(--image-current-border-color), var(--image-border-width) var(--image-border-width) 0 calc(var(--image-border-width) / 2) var(--multiple-dragging-bg), var(--image-border-width) var(--image-border-width) 0 calc(3 * var(--image-border-width) / 2) var(--image-current-border-color);--image-dragging-shadow:0 0 0 var(--image-border-width) var(--image-current-border-color);--multiple-dragging-indicator-bg:var(--indicator-color);--multiple-dragging-text-color:light-dark(#fbfbfe, #15141a);display:flex;padding-bottom:16px;flex-direction:column;align-items:flex-start;inset-block-start:calc(100% + var(--sidebar-block-padding));height:calc(var(--viewer-container-height) - 2 * var(--sidebar-block-padding));position:absolute;inset-inline-start:calc(-1 * var(--viewsManager-width, --sidebar-width) - 1px);transition-property:inset-inline-start;transition-duration:var(--sidebar-transition-duration);transition-timing-function:var(--sidebar-transition-timing-function)}@media screen and (forced-colors:active){#viewsManager{--views-text-color:var(--text-color, CanvasText);--button-fg:var(--button-text-color, ButtonText);--button-bg:var(--button-background-color, ButtonFace);--button-no-bg:var(--button-background-color, ButtonFace);--views-button-border-color:var(--button-border-color, ButtonText);--button-hover-bg:var(--button-background-color-hover, SelectedItemText);--button-hover-fg:var(--button-text-color-hover, SelectedItem);--button-hover-border-color:var(--button-border-color-hover, SelectedItem);--button-active-bg:var(--button-background-color-active, SelectedItemText);--button-active-fg:var(--button-text-color-active, SelectedItem);--button-active-border-color:var(--button-border-color-active, ButtonText);--button-focus-no-bg:var(--button-background-color, ButtonFace);--button-focus-outline-color:var(--focus-outline-color, CanvasText);--button-focus-border-color:none;--status-border-color:CanvasText;--status-undo-bg:none;--indicator-color:var(--text-color, CanvasText);--status-warning-bg:none;--indicator-warning-color:CanvasText;--header-shadow:none;--image-shadow:none;--image-outline:1px solid ButtonText;--image-focus-outline-color:CanvasText;--image-hover-border-color:SelectedItem;--image-hover-page-number-bg:SelectedItemText;--image-hover-page-number-fg:SelectedItem;--image-current-page-number-bg:ButtonText;--image-current-page-number-fg:ButtonFace;--image-current-border-color:var(--border-color, ButtonText);--image-current-focused-outline-color:var(--image-hover-border-color);--image-current-hover-page-number-bg:SelectedItem;--image-current-hover-page-number-fg:SelectedItemText;--image-page-number-bg:ButtonFace;--image-page-number-fg:ButtonText;--image-page-number-border-color:var(--image-page-number-fg);--multiple-dragging-bg:Canvas;--multiple-dragging-indicator-bg:var(--text-color, ButtonBorder);--multiple-dragging-text-color:Canvas;--image-dragging-placeholder-bg:Canvas;--image-dragging-placeholder-border:1px GrayText solid}}#viewsManager .sidebarResizer{inset-inline-start:calc(100% + 4px)}#viewsManager .viewsManagerButton{width:auto;color:var(--button-fg);border-radius:var(--button-border-radius, 8px);border:1px solid var(--views-button-border-color);background:var(--button-bg)}#viewsManager .viewsManagerButton:hover{background-color:var(--button-hover-bg)!important;color:var(--button-hover-fg)!important;border-color:var(--button-hover-border-color)!important}#viewsManager .viewsManagerButton:hover:before{background-color:var(--button-hover-fg)!important}#viewsManager .viewsManagerButton:active{background:var(--button-active-bg)!important;color:var(--button-active-fg)!important;border-color:var(--button-active-border-color)!important}#viewsManager .viewsManagerButton:active:before{background-color:var(--button-active-fg)!important}#viewsManager .viewsManagerButton:focus-visible{outline:2px solid var(--button-focus-outline-color);outline-offset:2px;border-color:var(--button-focus-border-color)}#viewsManager .viewsManagerButton.viewsCloseButton{width:var(--size-item-large, 26px);height:var(--size-item-large, 26px);border-radius:var(--button-border-radius, 8px);background:none;display:flex;align-items:center;justify-content:center}#viewsManager .viewsManagerButton.viewsCloseButton:before{width:16px;height:16px;-webkit-mask-image:var(--close-button-icon);mask-image:var(--close-button-icon)}#viewsManager #viewsManagerHeader{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch;width:100%;box-shadow:var(--header-shadow);flex:0 0 auto;background-color:var(--header-bg)}#viewsManager #viewsManagerHeader .viewsManagerLabel{flex:1 1 auto;color:var(--views-text-color);text-align:center;height:-moz-fit-content;height:fit-content;width:-moz-fit-content;width:fit-content;-webkit-user-select:none;-moz-user-select:none;user-select:none;font:menu;font-size:15px;font-style:normal;font-weight:400;line-height:normal}#viewsManager #viewsManagerHeader #viewsManagerTitle{display:flex;flex-direction:row;align-items:center;align-self:stretch;justify-content:space-between;width:auto;padding-block:12px;padding-inline:8px 16px}#viewsManager #viewsManagerHeader #viewsManagerTitle:not(:has(#viewsManagerHeaderLabel~button:not([hidden]))):after{content:"";flex:0 0 auto;width:32px;height:32px;pointer-events:none}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector{width:48px;height:32px;display:block}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>button{background:var(--button-no-bg);width:100%;height:100%}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>button:focus-visible{background-color:var(--button-focus-no-bg)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>button:before{-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-image:var(--views-manager-button-icon);mask-image:var(--views-manager-button-icon);background-color:var(--button-fg)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>button:after{content:"";display:inline-block;width:12px;height:12px;margin-inline-start:8px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:var(--views-manager-button-arrow-icon);mask-image:var(--views-manager-button-arrow-icon);background-color:var(--button-fg)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>button:hover:before,#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>button:hover:after{background-color:var(--button-hover-fg)!important}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>button:active:before,#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>button:active:after{background-color:var(--button-active-fg)!important}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>.popupMenu{min-width:182px;z-index:1}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>.popupMenu>button#thumbnailsViewMenu:before{-webkit-mask-image:var(--menuitem-thumbnailsView-icon);mask-image:var(--menuitem-thumbnailsView-icon)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>.popupMenu>button#outlinesViewMenu:before{-webkit-mask-image:var(--menuitem-outlinesView-icon);mask-image:var(--menuitem-outlinesView-icon)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>.popupMenu>button#attachmentsViewMenu:before{-webkit-mask-image:var(--menuitem-attachmentsView-icon);mask-image:var(--menuitem-attachmentsView-icon)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerSelector>.popupMenu>button#layersViewMenu:before{-webkit-mask-image:var(--menuitem-layersView-icon);mask-image:var(--menuitem-layersView-icon)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerAddFileButton{background:var(--button-no-bg);width:32px;height:32px}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerAddFileButton:focus-visible{background-color:var(--button-focus-no-bg)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerAddFileButton:before{-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-image:var(--views-manager-add-file-button-icon);mask-image:var(--views-manager-add-file-button-icon);background-color:var(--button-fg)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerAddFileButton>input{display:none}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerCurrentOutlineButton{background:var(--button-no-bg);width:32px;height:32px}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerCurrentOutlineButton:focus-visible{background-color:var(--button-focus-no-bg)}#viewsManager #viewsManagerHeader #viewsManagerTitle #viewsManagerCurrentOutlineButton:before{-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-image:var(--current-outline-button-icon);mask-image:var(--current-outline-button-icon);background-color:var(--button-fg)}#viewsManager #viewsManagerHeader #viewsManagerStatus{display:grid;width:100%;border:1px solid var(--status-border-color)}#viewsManager #viewsManagerHeader #viewsManagerStatus>div{min-height:64px;width:100%;padding-inline:16px;grid-area:1 / 1;box-sizing:border-box}#viewsManager #viewsManagerHeader #viewsManagerStatus>div.hidden{visibility:hidden;display:unset!important}#viewsManager #viewsManagerHeader #viewsManagerStatus .viewsManagerStatusLabel{display:flex;align-items:center;gap:8px;font:menu;font-size:13px}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction{display:flex;justify-content:space-between;align-items:center;align-self:stretch;background-color:var(--status-actions-bg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button{position:relative;width:var(--icon-size);height:var(--icon-size);border:none;padding:0;flex:0 0 auto}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background-color:var(--indicator-color);-webkit-mask-image:var(--pages-selected-icon);mask-image:var(--pages-selected-icon)}@media screen and (forced-colors:active){#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button{border-radius:2px;background-color:var(--button-bg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button:before{background-color:var(--button-fg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button:hover{background-color:var(--button-hover-bg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button:hover:before{background-color:var(--button-hover-fg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button:active{background-color:var(--button-active-bg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button:active:before{background-color:var(--button-active-fg)}}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #viewsManagerStatusActionLabelContainer>button#viewsManagerStatusActionDeselectButton:focus-visible{outline:2px solid var(--button-focus-outline-color);border:1px solid var(--button-focus-border-color);border-radius:2px;outline-offset:1px}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #actionSelector{height:32px;min-width:115px;width:auto;display:block}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #actionSelector #viewsManagerStatusActionButton{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;height:100%;padding:4px 16px}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #actionSelector #viewsManagerStatusActionButton:after{content:"";display:inline-block;width:var(--icon-size);height:var(--icon-size);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:var(--manage-button-icon);mask-image:var(--manage-button-icon);background-color:var(--button-fg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #actionSelector #viewsManagerStatusActionButton:hover:after{background-color:var(--button-hover-fg)!important}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #actionSelector #viewsManagerStatusActionButton:active:after{background-color:var(--button-active-fg)!important}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusAction #actionSelector>.popupMenu{width:100%;min-width:-moz-fit-content;min-width:fit-content;z-index:1}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusUndo{display:flex;justify-content:space-between;align-items:center;align-self:stretch;background-color:var(--status-undo-bg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusUndo>span:before{content:"";display:inline-block;width:var(--icon-size);height:var(--icon-size);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:var(--undo-label-icon);mask-image:var(--undo-label-icon);background-color:var(--indicator-color)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusUndo>div{display:flex;align-items:center;gap:8px;width:auto}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusUndo>div #viewsManagerStatusUndoButton{width:auto;min-height:24px;padding:4px 8px}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusWarning{display:flex;align-items:center;justify-content:space-between;background-color:var(--status-warning-bg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusWarning>span{align-items:flex-start}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusWarning>span:before{content:"";display:inline-block;width:var(--icon-size);height:var(--icon-size);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background-color:var(--indicator-warning-color);-webkit-mask-image:var(--undo-label-icon);mask-image:var(--undo-label-icon);flex:0 0 auto}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusWaiting{display:flex;align-items:center;justify-content:space-between;background-color:var(--status-waiting-bg)}#viewsManager #viewsManagerHeader #viewsManagerStatus #viewsManagerStatusWaiting>span:before{content:"";display:inline-block;width:var(--icon-size);height:var(--icon-size);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background-color:var(--indicator-color);-webkit-mask-image:var(--spinner-icon);mask-image:var(--spinner-icon);flex:0 0 auto}#viewsManager #viewsManagerContent{width:100%;flex:1 1 0%;overflow:auto}#viewsManager #viewsManagerContent:has(#thumbnailsView.isDragging){overflow-x:hidden}#viewsManager #viewsManagerContent #thumbnailsView{--thumbnail-width:126px;--gap-between-input-and-thumbnail:16px;display:flex;flex-flow:row wrap;align-items:center;justify-content:space-evenly;padding:20px 32px;gap:44px;width:100%;box-sizing:border-box;position:relative}#viewsManager #viewsManagerContent #thumbnailsView.isDragging{cursor:grabbing}#viewsManager #viewsManagerContent #thumbnailsView.isDragging>.thumbnail>.thumbnailImageContainer:hover{cursor:grabbing}#viewsManager #viewsManagerContent #thumbnailsView.isDragging>.thumbnail>.thumbnailImageContainer:hover:not([aria-current=page]){box-shadow:var(--image-shadow)}#viewsManager #viewsManagerContent #thumbnailsView.isDragging>.thumbnail>input{pointer-events:none}#viewsManager #viewsManagerContent #thumbnailsView.isDragging>.dragMarker,#viewsManager #viewsManagerContent #thumbnailsView.isDraggingFile>.dragMarker{position:absolute;top:0;left:0;border:2px solid var(--indicator-color);contain:strict}#viewsManager #viewsManagerContent #thumbnailsView.pasteMode{gap:var(--gap-between-input-and-thumbnail)}#viewsManager #viewsManagerContent #thumbnailsView.pasteMode>.thumbnail{flex-direction:column}#viewsManager #viewsManagerContent #thumbnailsView.pasteMode>.thumbnail>input{display:none}#viewsManager #viewsManagerContent #thumbnailsView.pasteMode>.thumbnail>.thumbnailPasteButton{display:flex;justify-content:center;align-items:center;border-radius:16px;min-height:24px;padding:4px 16px;font:menu;font-size:13px;font-style:normal;font-weight:400;line-height:normal}#viewsManager #viewsManagerContent #thumbnailsView:not(.pasteMode)>.thumbnail>.thumbnailPasteButton{display:none}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail{--input-dim:16px;display:inline-flex;justify-content:flex-end;align-items:center;flex-direction:row-reverse;gap:var(--gap-between-input-and-thumbnail);width:calc(var(--thumbnail-width) + 2 * (var(--input-dim) + var(--gap-between-input-and-thumbnail)));height:auto;position:relative;scroll-margin-top:20px}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail:not(#viewsManager #viewsManagerContent #thumbnailsView .thumbnail:has(input)){--input-dim:0px;--gap-between-input-and-thumbnail:0px}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail .thumbnailPasteButton{padding:8px 0;text-align:center}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail:not(.isDragging)>.thumbnailImageContainer:after{content:attr(page-number);border-radius:8px;border:1px solid var(--image-page-number-border-color);background-color:var(--image-page-number-bg);color:var(--image-page-number-fg);position:absolute;bottom:5px;inset-inline-end:50%;min-width:32px;height:16px;text-align:center;box-sizing:content-box;translate:calc(var(--dir-factor) * 50%);font:menu;font-size:12px;font-style:normal;font-weight:400;line-height:normal;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail:has([aria-current=page]):not(.isDragging)>.thumbnailImageContainer:after{background-color:var(--image-current-page-number-bg);color:var(--image-current-page-number-fg);outline:1px solid var(--image-current-border-color)}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail.isDragging>input{visibility:hidden}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>input{margin:0;width:var(--input-dim);height:var(--input-dim);accent-color:var(--indicator-color)}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer{--thumbnail-dragging-scale:1.4;width:var(--thumbnail-width);border:none;border-radius:8px;box-shadow:var(--image-shadow);box-sizing:content-box;outline:var(--image-outline);-webkit-user-select:none;-moz-user-select:none;user-select:none;position:relative}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer img{width:100%;height:100%;border:none;border-radius:8px;outline:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer.missingThumbnailImage{content-visibility:hidden}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:hover{cursor:pointer;box-shadow:var(--image-hover-shadow)}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:hover:after{background-color:var(--image-hover-page-number-bg);color:var(--image-hover-page-number-fg)}@media screen and (forced-colors:active){#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:hover{box-shadow:none;outline:var(--image-border-width) var(--image-hover-border-color) solid}}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:focus-visible:not([aria-current=page]){box-shadow:var(--image-hover-shadow);outline:none}@media screen and (forced-colors:active){#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:focus-visible:not([aria-current=page]){box-shadow:none;outline:var(--image-border-width) var(--image-focus-outline-color) solid}}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:focus-visible[aria-current=page]{outline:var(--image-border-width) solid var(--image-current-focused-outline-color);outline-offset:var(--image-border-width)}@media screen and (forced-colors:active){#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:focus-visible[aria-current=page]{box-shadow:none;outline:var(--image-border-width) var(--image-current-border-color) solid;outline-offset:0}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:focus-visible[aria-current=page]>img{outline:var(--image-border-width) var(--image-focus-outline-color) solid;outline-offset:var(--image-border-width)}}@media screen and (forced-colors:active){#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:focus-visible{box-shadow:none;outline:var(--image-border-width) var(--image-current-border-color) solid}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer:focus-visible:hover>img{outline:var(--image-border-width) var(--image-hover-border-color) solid;outline-offset:var(--image-border-width)}}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer[aria-current=page]{box-shadow:var(--image-current-shadow)}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer[aria-current=page]:hover:after{background-color:var(--image-current-hover-page-number-bg);color:var(--image-current-hover-page-number-fg)}@media screen and (forced-colors:active){#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer[aria-current=page]{box-shadow:none;outline:var(--image-border-width) var(--image-current-border-color) solid}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer[aria-current=page]:hover>img{outline:var(--image-border-width) var(--image-hover-border-color) solid;outline-offset:var(--image-border-width)}}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer.placeholder{background-color:var(--image-dragging-placeholder-bg);box-shadow:none!important;outline:var(--image-dragging-placeholder-border)}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer.draggingThumbnail{position:absolute;left:0;top:0;z-index:1;transform-origin:0 0 0;scale:calc(1 / var(--thumbnail-dragging-scale));pointer-events:none;box-shadow:var(--image-dragging-shadow)}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer.draggingThumbnail.multiple{box-shadow:var(--image-multiple-dragging-shadow)}@media screen and (forced-colors:active){#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer.draggingThumbnail.multiple{forced-color-adjust:none;box-shadow:var(--image-multiple-dragging-shadow)}}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer.draggingThumbnail.multiple>.thumbnailImageContainer{position:absolute;top:0;left:0;width:var(--thumbnail-width);border:none;border-radius:8px;box-sizing:content-box;outline:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}#viewsManager #viewsManagerContent #thumbnailsView>.thumbnail>.thumbnailImageContainer.draggingThumbnail.multiple:after{content:attr(data-multiple-count);border-radius:calc(8px * var(--thumbnail-dragging-scale));background-color:var(--multiple-dragging-indicator-bg);color:var(--multiple-dragging-text-color);position:absolute;inset-block-end:calc(4px * var(--thumbnail-dragging-scale));inset-inline-start:calc(4px * var(--thumbnail-dragging-scale));min-width:calc(32px * var(--thumbnail-dragging-scale));height:calc(16px * var(--thumbnail-dragging-scale));text-align:center;font:menu;font-size:calc(13px * var(--thumbnail-dragging-scale));font-style:normal;font-weight:400;line-height:normal;contain:strict}#viewsManager #viewsManagerContent #attachmentsView{--attachment-color:light-dark(rgb(0 0 0 / .8), rgb(255 255 255 / .8));--attachment-bg-color:light-dark( rgb(0 0 0 / .15), rgb(255 255 255 / .15) );--attachment-hover-color:light-dark( rgb(0 0 0 / .9), rgb(255 255 255 / .9) )}#viewsManager #viewsManagerContent #attachmentsView>ul{list-style-type:none;padding:0}#viewsManager #viewsManagerContent #attachmentsView>ul>li>a{text-decoration:none;display:inline-block;min-width:calc(100% - 4px);height:auto;margin-bottom:1px;padding:2px 0 5px;padding-inline-start:4px;border-radius:2px;color:var(--attachment-color);font-size:13px;line-height:15px;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:normal;cursor:pointer}#viewsManager #viewsManagerContent #attachmentsView>ul>li>a:hover{background-color:var(--attachment-bg-color);background-clip:padding-box;border-radius:2px;color:var(--attachment-hover-color)}.sidebar{--sidebar-bg-color:var(--background-color-box, light-dark(#fff, #23222b));--sidebar-border-color:light-dark( rgb(21 20 26 / .1), rgb(251 251 254 / .1) );--sidebar-box-shadow:0 .25px .75px light-dark(rgb(0 0 0 / .05), rgb(0 0 0 / .2)), 0 2px 6px 0 light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .4));--sidebar-backdrop-filter:none;--sidebar-border-radius:8px;--sidebar-padding:5px;--sidebar-min-width:180px;--sidebar-max-width:632px;--sidebar-width:239px;--resizer-width:4px;--resizer-shift:calc(0px - var(--resizer-width) - 2px);--resizer-hover-bg-color:var( --color-accent-primary, light-dark(#0062fa, #00cadb) );border-radius:var(--sidebar-border-radius);box-shadow:var(--sidebar-box-shadow);border:1px solid var(--sidebar-border-color);background-color:var(--sidebar-bg-color);inset-block-start:calc(100% + var(--doorhanger-height) - 2px);padding-block:var(--sidebar-padding);width:var(--sidebar-width);min-width:var(--sidebar-min-width);max-width:var(--sidebar-max-width);-webkit-backdrop-filter:var(--sidebar-backdrop-filter);backdrop-filter:var(--sidebar-backdrop-filter);box-sizing:border-box;position:relative}@media screen and (forced-colors:active){.sidebar{--sidebar-bg-color:var(--background-color-box, Canvas);--sidebar-border-color:CanvasText;--sidebar-box-shadow:none;--resizer-hover-bg-color:var(--text-color, CanvasText)}}.sidebar .sidebarResizer{width:var(--resizer-width);background-color:transparent;forced-color-adjust:none;cursor:ew-resize;position:absolute;inset-block:0;inset-inline-start:var(--resizer-shift);transition:background-color .5s ease-in-out,border-color .5s ease-in-out;box-sizing:border-box;border:1px solid transparent;border-block-width:0;background-clip:content-box}.sidebar .sidebarResizer:hover{background-color:var(--resizer-hover-bg-color);border-color:#fff}.sidebar .sidebarResizer:focus-visible{background-color:var(--resizer-hover-bg-color);outline:none}.sidebar.resizing{cursor:ew-resize;-webkit-user-select:none;-moz-user-select:none;user-select:none}.sidebar.resizing :not(.sidebarResizer){pointer-events:none}.sidebar.resizing .sidebarResizer{background-color:var(--resizer-hover-bg-color)}:root{color-scheme:light dark;--viewer-container-height:0;--pdfViewer-padding-bottom:0;--page-margin:1px auto -8px;--page-border:9px solid transparent;--spreadHorizontalWrapped-margin-LR:-3.5px;--loading-icon-delay:.4s;--focus-ring-color:var(--focus-outline-color, light-dark(#0060df, #0df));--focus-ring-outline:var(--focus-outline-width, 2px) solid var(--focus-ring-color);--text-primary-color:var(--text-color, light-dark(#15141a, #fbfbfe));--link-fg-color:var(--link-color, light-dark(#0060df, #0df));--link-hover-fg-color:var(--link-color-hover, light-dark(#0250bb, #80ebff));--new-badge-bg:light-dark(#070, #37b847);--new-badge-color:light-dark(#fff, #15141a);--new-badge-border-color:light-dark(#fbfbfe / 40%, #15141a / 40%)}@media screen and (forced-colors:active){:root{--pdfViewer-padding-bottom:9px;--page-margin:8px auto -1px;--page-border:1px solid CanvasText;--spreadHorizontalWrapped-margin-LR:3.5px;--focus-ring-color:var(--focus-outline-color, CanvasText);--text-primary-color:var(--text-color, CanvasText);--link-fg-color:var(--link-color, LinkText);--link-hover-fg-color:var(--link-color-hover, LinkText);--new-badge-bg:AccentColor;--new-badge-color:ButtonFace;--new-badge-border-color:CanvasText}}.newBadge{background-color:var(--new-badge-bg);color:var(--new-badge-color);border-radius:4px;border:1px solid var(--new-badge-border-color);padding-inline:4px;margin-inline:4px;font:menu;font-size:12px;font-style:normal;font-weight:400;line-height:normal;flex:0 0 fit-content;-webkit-user-select:none;-moz-user-select:none;user-select:none}[data-main-rotation="90"]{transform:rotate(90deg) translateY(-100%)}[data-main-rotation="180"]{transform:rotate(180deg) translate(-100%,-100%)}[data-main-rotation="270"]{transform:rotate(270deg) translate(-100%)}.pdfViewer{--scale-factor:1;--page-bg-color:unset;padding-bottom:var(--pdfViewer-padding-bottom);--hcm-highlight-filter:none;--hcm-highlight-selected-filter:none}@media screen and (forced-colors:active){.pdfViewer{--hcm-highlight-filter:invert(100%)}}.pdfViewer.copyAll{cursor:wait}.pdfViewer .canvasWrapper{overflow:hidden;width:100%;height:100%}.pdfViewer .canvasWrapper canvas{position:absolute;top:0;left:0;margin:0;display:block;width:100%;height:100%;contain:content}.pdfViewer .canvasWrapper canvas .structTree{contain:strict}.pdfViewer .canvasWrapper canvas.detailView{image-rendering:pixelated}.pdfViewer .canvasWrapper .selection{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;background:#005aff38}.pdfViewer .page{--user-unit:1;--total-scale-factor:calc(var(--scale-factor) * var(--user-unit));--scale-round-x:1px;--scale-round-y:1px;direction:ltr;width:816px;height:1056px;margin:var(--page-margin);position:relative;overflow:visible;border:var(--page-border);background-clip:content-box;background-color:var(--page-bg-color, rgb(255 255 255))}.pdfViewer .dummyPage{position:relative;width:0;height:var(--viewer-container-height)}.pdfViewer.noUserSelect{-webkit-user-select:none;-moz-user-select:none;user-select:none}.pdfViewer.removePageBorders .page{margin:0 auto 10px;border:none}.pdfViewer.singlePageView{display:inline-block}.pdfViewer.singlePageView .page{margin:0;border:none}.pdfViewer:is(.scrollHorizontal,.scrollWrapped),.spread{margin-inline:3.5px;text-align:center}.pdfViewer.scrollHorizontal,.spread{white-space:nowrap}.pdfViewer.removePageBorders,.pdfViewer:is(.scrollHorizontal,.scrollWrapped) .spread{margin-inline:0}.spread :is(.page,.dummyPage),.pdfViewer:is(.scrollHorizontal,.scrollWrapped) :is(.page,.spread){display:inline-block;vertical-align:middle}.spread .page,.pdfViewer:is(.scrollHorizontal,.scrollWrapped) .page{margin-inline:var(--spreadHorizontalWrapped-margin-LR)}.pdfViewer.removePageBorders .spread .page,.pdfViewer.removePageBorders:is(.scrollHorizontal,.scrollWrapped) .page{margin-inline:5px}.pdfViewer .page.loadingIcon:after{position:absolute;top:0;left:0;content:"";width:100%;height:100%;background:url(data:image/gif;base64,R0lGODlhGAAYAPQAAP///wAAAM7Ozvr6+uDg4LCwsOjo6I6OjsjIyJycnNjY2KioqMDAwPLy8nZ2doaGhri4uGhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJBwAAACwAAAAAGAAYAAAFriAgjiQAQWVaDgr5POSgkoTDjFE0NoQ8iw8HQZQTDQjDn4jhSABhAAOhoTqSDg7qSUQwxEaEwwFhXHhHgzOA1xshxAnfTzotGRaHglJqkJcaVEqCgyoCBQkJBQKDDXQGDYaIioyOgYSXA36XIgYMBWRzXZoKBQUMmil0lgalLSIClgBpO0g+s26nUWddXyoEDIsACq5SsTMMDIECwUdJPw0Mzsu0qHYkw72bBmozIQAh+QQJBwAAACwAAAAAGAAYAAAFsCAgjiTAMGVaDgR5HKQwqKNxIKPjjFCk0KNXC6ATKSI7oAhxWIhezwhENTCQEoeGCdWIPEgzESGxEIgGBWstEW4QCGGAIJEoxGmGt5ZkgCRQQHkGd2CESoeIIwoMBQUMP4cNeQQGDYuNj4iSb5WJnmeGng0CDGaBlIQEJziHk3sABidDAHBgagButSKvAAoyuHuUYHgCkAZqebw0AgLBQyyzNKO3byNuoSS8x8OfwIchACH5BAkHAAAALAAAAAAYABgAAAW4ICCOJIAgZVoOBJkkpDKoo5EI43GMjNPSokXCINKJCI4HcCRIQEQvqIOhGhBHhUTDhGo4diOZyFAoKEQDxra2mAEgjghOpCgz3LTBIxJ5kgwMBShACREHZ1V4Kg1rS44pBAgMDAg/Sw0GBAQGDZGTlY+YmpyPpSQDiqYiDQoCliqZBqkGAgKIS5kEjQ21VwCyp76dBHiNvz+MR74AqSOdVwbQuo+abppo10ssjdkAnc0rf8vgl8YqIQAh+QQJBwAAACwAAAAAGAAYAAAFrCAgjiQgCGVaDgZZFCQxqKNRKGOSjMjR0qLXTyciHA7AkaLACMIAiwOC1iAxCrMToHHYjWQiA4NBEA0Q1RpWxHg4cMXxNDk4OBxNUkPAQAEXDgllKgMzQA1pSYopBgonCj9JEA8REQ8QjY+RQJOVl4ugoYssBJuMpYYjDQSliwasiQOwNakALKqsqbWvIohFm7V6rQAGP6+JQLlFg7KDQLKJrLjBKbvAor3IKiEAIfkECQcAAAAsAAAAABgAGAAABbUgII4koChlmhokw5DEoI4NQ4xFMQoJO4uuhignMiQWvxGBIQC+AJBEUyUcIRiyE6CR0CllW4HABxBURTUw4nC4FcWo5CDBRpQaCoF7VjgsyCUDYDMNZ0mHdwYEBAaGMwwHDg4HDA2KjI4qkJKUiJ6faJkiA4qAKQkRB3E0i6YpAw8RERAjA4tnBoMApCMQDhFTuySKoSKMJAq6rD4GzASiJYtgi6PUcs9Kew0xh7rNJMqIhYchACH5BAkHAAAALAAAAAAYABgAAAW0ICCOJEAQZZo2JIKQxqCOjWCMDDMqxT2LAgELkBMZCoXfyCBQiFwiRsGpku0EshNgUNAtrYPT0GQVNRBWwSKBMp98P24iISgNDAS4ipGA6JUpA2WAhDR4eWM/CAkHBwkIDYcGiTOLjY+FmZkNlCN3eUoLDmwlDW+AAwcODl5bYl8wCVYMDw5UWzBtnAANEQ8kBIM0oAAGPgcREIQnVloAChEOqARjzgAQEbczg8YkWJq8nSUhACH5BAkHAAAALAAAAAAYABgAAAWtICCOJGAYZZoOpKKQqDoORDMKwkgwtiwSBBYAJ2owGL5RgxBziQQMgkwoMkhNqAEDARPSaiMDFdDIiRSFQowMXE8Z6RdpYHWnEAWGPVkajPmARVZMPUkCBQkJBQINgwaFPoeJi4GVlQ2Qc3VJBQcLV0ptfAMJBwdcIl+FYjALQgimoGNWIhAQZA4HXSpLMQ8PIgkOSHxAQhERPw7ASTSFyCMMDqBTJL8tf3y2fCEAIfkECQcAAAAsAAAAABgAGAAABa8gII4k0DRlmg6kYZCoOg5EDBDEaAi2jLO3nEkgkMEIL4BLpBAkVy3hCTAQKGAznM0AFNFGBAbj2cA9jQixcGZAGgECBu/9HnTp+FGjjezJFAwFBQwKe2Z+KoCChHmNjVMqA21nKQwJEJRlbnUFCQlFXlpeCWcGBUACCwlrdw8RKGImBwktdyMQEQciB7oACwcIeA4RVwAODiIGvHQKERAjxyMIB5QlVSTLYLZ0sW8hACH5BAkHAAAALAAAAAAYABgAAAW0ICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi+AS2SoyXrK4umWPM5wNiV0UDUIBNkdoepTfMkA7thIECiyRtUAGq8fm2O4jIBgMBA1eAZ6Knx+gHaJR4QwdCMKBxEJRggFDGgQEREPjjAMBQUKIwIRDhBDC2QNDDEKoEkDoiMHDigICGkJBS2dDA6TAAnAEAkCdQ8ORQcHTAkLcQQODLPMIgIJaCWxJMIkPIoAt3EhACH5BAkHAAAALAAAAAAYABgAAAWtICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi+AS2SoyXrK4umWHM5wNiV0UN3xdLiqr+mENcWpM9TIbrsBkEck8oC0DQqBQGGIz+t3eXtob0ZTPgNrIwQJDgtGAgwCWSIMDg4HiiUIDAxFAAoODwxDBWINCEGdSTQkCQcoegADBaQ6MggHjwAFBZUFCm0HB0kJCUy9bAYHCCPGIwqmRq0jySMGmj6yRiEAIfkECQcAAAAsAAAAABgAGAAABbIgII4k0DRlmg6kYZCsOg4EKhLE2BCxDOAxnIiW84l2L4BLZKipBopW8XRLDkeCiAMyMvQAA+uON4JEIo+vqukkKQ6RhLHplVGN+LyKcXA4Dgx5DWwGDXx+gIKENnqNdzIDaiMECwcFRgQCCowiCAcHCZIlCgICVgSfCEMMnA0CXaU2YSQFoQAKUQMMqjoyAglcAAyBAAIMRUYLCUkFlybDeAYJryLNk6xGNCTQXY0juHghACH5BAkHAAAALAAAAAAYABgAAAWzICCOJNA0ZVoOAmkY5KCSSgSNBDE2hDyLjohClBMNij8RJHIQvZwEVOpIekRQJyJs5AMoHA+GMbE1lnm9EcPhOHRnhpwUl3AsknHDm5RN+v8qCAkHBwkIfw1xBAYNgoSGiIqMgJQifZUjBhAJYj95ewIJCQV7KYpzBAkLLQADCHOtOpY5PgNlAAykAEUsQ1wzCgWdCIdeArczBQVbDJ0NAqyeBb64nQAGArBTt8R8mLuyPyEAOwAAAAAAAAAAAA==) center no-repeat;display:none;transition-property:display;transition-delay:var(--loading-icon-delay);z-index:5;contain:strict}.pdfViewer .page.loading:after{display:block}.pdfViewer .page:not(.loading):after{transition-property:none;display:none}.pdfPresentationMode .pdfViewer{padding-bottom:0}.pdfPresentationMode .spread{margin:0}.pdfPresentationMode .pdfViewer .page{margin:0 auto;border:2px solid transparent}`,
  adi = `@scope (.studio-document-pdf) { ${rdi.replace(/:root/g, ":scope")} }`;

function idi({
  blob: e,
  zoom: t,
  name: n
}) {
  on();
  const r = g.useRef(null),
    a = g.useRef(null),
    i = g.useRef(null),
    o = g.useRef(t);
  o.current = t;
  const [s, l] = g.useState(""),
    [d, u] = g.useState(!0),
    h = () => {
      var p;
      if ((p = i.current) != null && p.pagesCount && (i.current.currentScaleValue = o.current === "fit" ? "page-width" : o.current, o.current === "fit" && r.current)) {
        const m = r.current.clientWidth;
        i.current.currentScale = Math.min(1, i.current.currentScale * Math.max(.1, (m - 96) / m));
      }
    };
  return g.useEffect(() => {
    const p = new AbortController();
    let m;
    l(""), u(!0);
    const f = new ResizeObserver(() => {
      o.current === "fit" && h();
    });
    return r.current && f.observe(r.current), (async () => {
      const {
        PDFViewer: y,
        EventBus: b,
        PDFLinkService: v
      } = await Ie(async () => {
        const {
          PDFViewer: I,
          EventBus: E,
          PDFLinkService: M
        } = await Promise.resolve().then(() => sqi);
        return {
          PDFViewer: I,
          EventBus: E,
          PDFLinkService: M
        };
      }, void 0, import.meta.url);
      if (p.signal.aborted) return;
      const _ = new b(),
        w = new v({
          eventBus: _
        });
      w.externalLinkEnabled = !1;
      const k = {
          container: r.current,
          viewer: a.current,
          eventBus: _,
          linkService: w,
          annotationMode: 1,
          textLayerMode: 1,
          removePageBorders: !0,
          enableAutoLinking: !1,
          abortSignal: p.signal
        },
        A = new y(k);
      w.setViewer(A), i.current = A, _.on("pagesinit", () => {
        var I;
        h(), (I = r.current) == null || I.scrollTo(0, 0), u(!1);
      }), _.on("pagerendered", ({
        error: I
      }) => {
        I && !p.signal.aborted && l("这一页暂时无法显示，请重新打开文档。");
      });
      const S = new Uint8Array(await e.arrayBuffer());
      if (p.signal.aborted) return;
      m = yBt(S);
      const C = await m.promise;
      p.signal.aborted || (w.setDocument(C), A.setDocument(C));
    })().catch(y => {
      p.signal.aborted || (l(y instanceof Error ? y.message : "文档页面无法打开"), u(!1));
    }), () => {
      var y;
      p.abort(), f.disconnect(), (y = i.current) == null || y.setDocument(null), i.current = null, m == null || m.destroy();
    };
  }, [e]), g.useEffect(h, [t]), c.jsxs("div", {
    className: "studio-document-pdf",
    "aria-label": x("阅读 {0}", n),
    children: [c.jsx("style", {
      children: adi
    }), d || s ? c.jsx("p", {
      role: "status",
      children: s || x("正在加载文档页面…")
    }) : null, c.jsx("div", {
      ref: r,
      className: "studio-document-pdf-scroll",
      children: c.jsx("div", {
        ref: a,
        className: "pdfViewer"
      })
    })]
  });
}

const odi = Object.freeze(Object.defineProperty({
    __proto__: null,
    StudioPdfDocument: idi
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  cUe = "studio-library-generation-open";

let Xie, Jie;

function Msr(e) {
  return Xie = e, Jie == null || Jie(), () => {
    Xie === e && (Xie = void 0);
  };
}

async function sdi(e, t) {
  if (X1("generation"), Xie || (await new Promise((n, r) => {
    const a = window.setTimeout(() => {
      Jie = void 0, r(new Error("言绘页面尚未就绪，请打开言绘后重试"));
    }, 3e4);
    Jie = () => {
      window.clearTimeout(a), Jie = void 0, n();
    };
  })), !Xie) throw new Error("言绘页面已关闭，请重新打开");
  await Xie(e, t);
}

const ldi = Object.freeze(Object.defineProperty({
    __proto__: null,
    LIBRARY_GENERATION_OPEN: cUe,
    openLibraryGeneration: sdi,
    registerLibraryGenerationImporter: Msr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  cdi = new Set(["角色", "场景", "道具", "分镜图", "概念图"]);

function ddi(e) {
  return e.category === "分镜图" || e.category === "概念图" ? e.title : `${e.category} · ${e.title}`;
}

function udi(e) {
  return e.category === "分镜图" ? e.id.split(":").slice(0, 3).join(":") : e.title;
}

function hdi(e, t) {
  return e.find(n => {
    var r;
    return n.type === "gen-image" && (((r = n.settings) == null ? void 0 : r.scriptRef) === t || n.nodeName === t || String(n.nodeName || "").endsWith(` · ${t}`));
  });
}

function pdi(e, t, n, r = {
  x: 200,
  y: 200
}) {
  var s;
  const a = e.map((l, d) => {
      const u = cdi.has(l.category),
        h = r.x + d % 3 * 410,
        p = r.y + Math.floor(d / 3) * 340,
        m = Ki(n(), u ? "gen-image" : "text-node", h, p, u ? ddi(l) : void 0, void 0, t),
        f = u ? {
          ...m,
          width: 360,
          height: 250,
          prompt: l.prompt,
          settings: {
            ...m.settings,
            scriptRef: udi(l),
            scriptKind: l.category,
            ratio: l.category === "道具" ? "1:1" : "16:9"
          }
        } : {
          ...m,
          width: 360,
          height: 290,
          prompt: l.prompt,
          settings: {
            ...m.settings,
            text: l.text
          }
        };
      return {
        output: l,
        node: f
      };
    }),
    i = [...t, ...a.map(l => l.node)],
    o = [];
  for (const l of a) {
    if (l.output.category !== "分镜图" || !((s = l.output.refs) != null && s.length)) continue;
    const d = new Set(),
      u = l.output.refs.map(h => hdi(i, h)).filter(h => !!h && h.id !== l.node.id && !d.has(h.id) && !!d.add(h.id));
    for (const h of u) o.push({
      id: n(),
      from: h.id,
      to: l.node.id
    });
    u.length && (l.node.prompt = `沿用 ${u.map((h, p) => `@${p + 1} ${h.nodeName}`).join("，")} 的外形。
${l.output.prompt}`);
  }
  return {
    nodes: a.map(l => l.node),
    connections: o
  };
}

const mdi = g.createContext(null);

function fdi({
  children: e
}) {
  const [t, n] = g.useState(!1),
    r = g.useCallback(() => n(o => !o), []),
    a = g.useCallback(() => n(!1), []),
    i = g.useMemo(() => ({
      expanded: t,
      toggle: r,
      close: a
    }), [t, r, a]);
  return c.jsx(mdi.Provider, {
    value: i,
    children: e
  });
}

const dUe = Symbol("canvas-document-commit");

function gdi(e) {
  const [t, n] = g.useState(() => ({
      nodes: typeof e == "function" ? e() : e,
      receipts: []
    })),
    r = g.useRef(new Set()),
    a = g.useRef(new WeakSet()),
    i = g.useMemo(() => {
      const o = s => {
        const l = r.current;
        n(d => {
          const u = typeof s == "function" ? s(d.nodes) : s;
          return u === d.nodes ? d : {
            nodes: u,
            receipts: d.receipts.filter(h => !l.has(h.token))
          };
        });
      };
      return o[dUe] = (s, l) => {
        const d = {},
          u = r.current;
        n(h => {
          const {
            nodes: p,
            result: m
          } = s(h.nodes);
          return {
            nodes: p,
            receipts: [...h.receipts.filter(f => !u.has(f.token)), {
              token: d,
              deliver: () => l(m)
            }]
          };
        });
      }, o;
    }, []);
  return g.useLayoutEffect(() => {
    r.current = new Set(t.receipts.map(o => o.token));
    for (const o of t.receipts) if (!a.current.has(o.token)) {
      a.current.add(o.token);
      try {
        o.deliver();
      } catch (s) {
        console.error("Canvas document acknowledgement failed", s);
      }
    }
  }, [t]), [t.nodes, i];
}

function VD(e, t, n) {
  const r = e == null ? void 0 : e[dUe];
  return r ? (r(t, n), !0) : !1;
}

function ydi(e, t) {
  const n = e[dUe],
    r = a => {
      if (t()) return e(i => t(i) ? typeof a == "function" ? a(i) : a : i);
    };
  return n && (r[dUe] = (a, i) => {
    t() && n(o => t(o) ? a(o) : {
      nodes: o,
      result: a(o).result
    }, o => {
      t() && i(o);
    });
  }), r;
}

async function bdi(e, t, n = r => new Promise(a => window.setTimeout(a, r))) {
  const r = [],
    a = t.document.lease(),
    i = () => {
      var l;
      return a.isCurrent() && (((l = t.isCurrent) == null ? void 0 : l.call(t)) ?? !0);
    },
    o = l => r.every(d => l.some(u => u.id === d)),
    s = l => new Promise(d => {
      let u = !1;
      const h = t.document.subscribe(() => {
          i() || p(!1);
        }),
        p = m => {
          u || (u = !0, h(), d(m && i()));
        };
      if (!i()) {
        p(!1);
        return;
      }
      VD(t.setNodes, l, p) || (t.setNodes(m => l(m).nodes), p(i() && o(t.readNodes())));
    });
  for (let l = 0; l < e.steps.length; l++) {
    if (!i() || !o(t.readNodes())) return;
    const d = e.steps[l],
      u = t.generateId(),
      h = [...r],
      p = Ki(u, "custom-agent", t.view.x + 80 + l * 520, t.view.y + 120, d.name || `步骤${l + 1}`, {
        systemPrompt: d.systemPrompt || d.description || ""
      }, t.readNodes());
    if (!(await s(f => !i() || !h.every(y => f.some(b => b.id === y)) ? {
      nodes: f,
      result: !1
    } : {
      nodes: [...f, p],
      result: !0
    }))) return;
    if (r.push(u), l > 0) {
      const f = {
        id: t.generateId(),
        from: r[l - 1],
        to: u
      };
      t.setConnections(y => i() && o(t.readNodes()) ? [...y, f] : y);
    }
    l < e.steps.length - 1 && (await n(220));
  }
  if (!(!i() || !o(t.readNodes()))) {
    if (r.length) {
      const l = WN(r, t.readNodes()),
        d = Date.now(),
        u = {
          id: WK(),
          name: e.workflowName || "未命名工作流",
          color: CQ[0],
          nodeIds: r,
          frameX: l.x,
          frameY: l.y,
          frameWidth: l.width,
          frameHeight: l.height,
          createdAt: d,
          updatedAt: d
        };
      t.setGroups(h => i() && o(t.readNodes()) ? [...h, u] : h);
    }
    (await s(l => ({
      nodes: l,
      result: i() && o(l)
    }))) && (t.success(`已根据 Skill 创建 ${e.steps.length} 个节点，已放入分组「${e.workflowName || "未命名工作流"}」`), t.close());
  }
}

function vdi(e) {
  let t = !0;
  const n = new Map(),
    r = (a, i) => !!i && i.type === a.type && i.prompt === a.prompt;
  return {
    activate() {
      t = !0;
    },
    observe(a) {
      for (const [i, o] of n) (!o.documentCurrent() || !r(o.source, a.find(s => s.id === o.source.id))) && (o.valid = !1, n.delete(i));
    },
    dispose() {
      t = !1;
      for (const a of n.values()) a.valid = !1;
      n.clear();
    },
    async replace(a) {
      const i = e(),
        o = i.document.lease(),
        s = {
          source: a,
          valid: !0,
          documentCurrent: o.isCurrent
        };
      n.set(a.id, s);
      const l = () => t && s.valid && n.get(a.id) === s && o.isCurrent();
      let d = !1;
      try {
        if (!l()) return;
        const u = await i.readText();
        if (!l() || !r(a, i.readNodes().find(p => p.id === a.id))) return;
        if (!u.trim()) {
          i.error("剪贴板为空");
          return;
        }
        const h = p => {
          const m = p.findIndex(y => y.id === a.id);
          if (!l() || !r(a, p[m])) return {
            nodes: p,
            result: !1
          };
          const f = p.slice();
          return f[m] = {
            ...p[m],
            prompt: u
          }, {
            nodes: f,
            result: !0
          };
        };
        d = !0, VD(i.setNodes, h, p => {
          p && l() && i.applied(a.id), n.get(a.id) === s && n.delete(a.id);
        }) || (i.setNodes(p => h(p).nodes), r(a, i.readNodes().find(p => p.id === a.id)) || (d = !1));
      } catch (u) {
        l() && i.error((u == null ? void 0 : u.message) || "无法读取剪贴板"), d = !1;
      } finally {
        !d && n.get(a.id) === s && n.delete(a.id);
      }
    }
  };
}

function wdi(e) {
  const t = g.useRef(e),
    n = g.useMemo(() => vdi(() => ({
      document: t.current.document,
      readNodes: () => t.current.nodesRef.current,
      setNodes: t.current.setNodes,
      readText: () => navigator.clipboard.readText(),
      applied: r => t.current.applied(r),
      error: r => t.current.error(r)
    })), []);
  g.useLayoutEffect(() => {
    t.current = e, n.observe(e.nodes);
  }), g.useEffect(() => {
    n.activate();
    const r = a => {
      var l;
      if (!["c", "C", "v", "V"].includes(a.key) || !a.ctrlKey && !a.metaKey || a.repeat || a.altKey || t.current.isBlocked()) return;
      const i = a.target instanceof HTMLElement ? a.target : null;
      if (i && (["INPUT", "TEXTAREA", "SELECT"].includes(i.tagName) || i.isContentEditable || i.closest('[contenteditable="true"]') || i.closest("[data-chat-copy-zone]")) || (l = window.getSelection()) != null && l.toString().trim()) return;
      const o = t.current.selectedNodeIdsRef.current;
      if (o.size !== 1) return;
      const s = t.current.nodesRef.current.find(d => d.id === [...o][0]);
      !s || s.type !== "gen-image" && s.type !== "gen-video" || (a.preventDefault(), a.stopPropagation(), n.replace(s));
    };
    return window.addEventListener("keydown", r, !0), () => {
      n.dispose(), window.removeEventListener("keydown", r, !0);
    };
  }, [n]);
}

function xdi() {
  const [e, t] = O_(Zi.SHOW_CANVAS_GRID, !0),
    [n, r] = fC(Zi.CANVAS_GRID_SPACING, tce),
    [a, i] = fC(Zi.CANVAS_GRID_DOT_SIZE, BLe),
    o = g.useCallback(He => {
      r(FLe(He));
    }, [r]),
    s = g.useCallback(He => {
      i(zLe(He));
    }, [i]);
  g.useEffect(() => {
    if (typeof window > "u") return;
    const He = "qiaodoumayi-dot-grid-v2";
    window.localStorage.getItem(Zi.CANVAS_GRID_STYLE_VERSION) !== He && (r(tce), i(BLe), window.localStorage.setItem(Zi.CANVAS_GRID_STYLE_VERSION, He));
  }, [i, r]);
  const l = g.useMemo(() => FLe(Number(n)), [n]),
    d = g.useMemo(() => zLe(Number(a)), [a]),
    [u, h] = O_(Zi.SHOW_CANVAS_SNAP, !1);
  g.useEffect(() => {
    if (typeof window > "u") return;
    const He = "qiaodoumayi_canvas_snap_merge_v1";
    if (window.localStorage.getItem(He) === "1") return;
    const it = window.localStorage.getItem("qiaodoumayi_show_canvas_grid_snap") !== "false",
      It = window.localStorage.getItem(Zi.SHOW_CANVAS_SNAP) === "true";
    (it || It) && h(!0), window.localStorage.removeItem("qiaodoumayi_show_canvas_grid_snap"), window.localStorage.setItem(He, "1");
  }, [h]);
  const [p, m] = O_(Zi.FOLLOW_DOWNSTREAM_ON_DRAG, !1),
    [f, y] = O_(Zi.SHOW_CANVAS_MINIMAP, !0),
    [b, v] = O_(Zi.HIDE_ALL_INPUT_IMAGE_PREVIEWS, !1),
    [_, w] = O_(Zi.CONNECTION_FULL_DISPLAY, !1),
    [k, A] = fC(Zi.CONNECTION_HIT_WIDTH, WEt),
    S = g.useMemo(() => QLe(Number(k)), [k]),
    [C, I] = O_(Zi.SHOW_ALIGNMENT_GUIDES, !0),
    [E, M] = fC(Zi.LOCATE_ANIMATION_MAX_NODES, TEt),
    T = g.useMemo(() => ULe(Number(E)), [E]),
    [P, R] = O_(Zi.SHOW_CANVAS_BG_GLOW, !1),
    [j, B] = O_(Zi.SHOW_NODE_DELETE_BUTTON, !0),
    [F, N] = O_(Zi.SHOW_START_GENERATE_BUTTON, !0),
    [G, z] = O_(Zi.ENABLE_CONNECT_WIRE_TILT, !1),
    [V, O] = O_(Zi.ENABLE_CONNECT_WIRE_MARQUEE, !0),
    [L, D] = k0e(Zi.ENABLE_GENERATION_CONNECTION_FLOW, "default"),
    U = g.useMemo(() => ALr(L), [L]),
    H = SLr(U),
    Y = g.useCallback(He => {
      D(He);
    }, [D]),
    [K, W] = k0e(Zi.ENABLE_GENERATION_NODE_ANIMATION, "default"),
    Q = g.useMemo(() => J8n(K), [K]),
    q = qEt(Q),
    ne = g.useCallback(He => {
      W(He);
    }, [W]),
    [de, le] = O_(Zi.SHOW_CANVAS_GENERATION_TIMER, !0),
    [J, pe] = fC(Zi.CONNECTION_LINE_STROKE_WIDTH, jj),
    [ce, we] = fC(Zi.CONNECTION_LINE_OPACITY_PERCENT, zY);
  g.useEffect(() => {
    const He = Number(J);
    (He === $Dr || He === GDr || He === VDr) && pe(jj);
  }, [J, pe]);
  const X = g.useMemo(() => gWe(Number(J)), [J]),
    Z = g.useMemo(() => yWe(Number(ce)), [ce]),
    [re, fe] = fC(Zi.CANVAS_BG_COLOR_LIGHT, I5e),
    [ye, ie] = fC(Zi.CANVAS_BG_COLOR_DARK, yZ),
    [ae, be] = k0e(Zi.CONNECTION_LINE_COLOR_DARK, yxe),
    [Ee, xe] = k0e(Zi.CONNECTION_LINE_COLOR_LIGHT, bxe),
    he = g.useMemo(() => Kmt(!0, ae), [ae]),
    ue = g.useMemo(() => Kmt(!1, Ee), [Ee]),
    ge = g.useCallback(He => {
      be(qmt(He) ?? yxe);
    }, [be]),
    _e = g.useCallback(He => {
      xe(qmt(He) ?? bxe);
    }, [xe]);
  g.useEffect(() => {
    Ive();
  }, [re, ye]);
  const ke = g.useCallback(() => t(!e), [t, e]),
    ve = g.useCallback(() => h(!u), [h, u]),
    Te = g.useCallback(() => m(!p), [m, p]),
    Ne = g.useCallback(() => y(!f), [y, f]),
    me = g.useCallback(() => w(!_), [w, _]),
    Ae = g.useCallback(() => v(!b), [v, b]),
    Fe = g.useCallback(() => I(!C), [I, C]),
    Me = g.useCallback(() => R(!P), [R, P]),
    Re = g.useCallback(He => {
      A(QLe(He));
    }, [A]),
    $e = g.useCallback(He => {
      M(ULe(He));
    }, [M]),
    rt = g.useCallback(() => B(!j), [B, j]),
    nt = g.useCallback(() => N(!F), [N, F]),
    ze = g.useCallback(() => z(!G), [z, G]),
    Le = g.useCallback(() => O(!V), [O, V]),
    Ke = g.useCallback(() => Y(ILr(U)), [Y, U]),
    Xe = g.useCallback(He => Y(He), [Y]),
    De = g.useCallback(() => ne(TLr(Q)), [ne, Q]),
    Ye = g.useCallback(He => ne(He), [ne]),
    Ce = g.useCallback(() => le(!de), [le, de]);
  return {
    showCanvasGrid: e,
    setCanvasGridSpacing: o,
    setCanvasGridDotSize: s,
    effectiveCanvasGridSpacing: l,
    effectiveCanvasGridDotSize: d,
    showCanvasSnap: u,
    followDownstreamOnDrag: p,
    showCanvasMinimap: f,
    hideAllInputImagePreviews: b,
    showAllCanvasConnections: _,
    connectionHitWidth: S,
    setConnectionHitWidth: Re,
    showAlignmentGuides: C,
    locateAnimationMaxNodes: T,
    setLocateAnimationMaxNodes: $e,
    showCanvasBgGlow: P,
    showNodeDeleteButton: j,
    showStartGenerateButton: F,
    enableConnectWireTilt: G,
    enableConnectWireMarquee: V,
    enableGenerationConnectionFlow: H,
    generationConnectionFlowMode: U,
    enableGenerationNodeAnimation: q,
    generationNodeAnimationMode: Q,
    showCanvasGenerationTimer: de,
    connectionLineStrokeWidth: X,
    setConnectionLineStrokeWidthRaw: pe,
    connectionLineOpacityPercent: Z,
    setConnectionLineOpacityPercentRaw: we,
    connectionLineColorDark: he,
    setConnectionLineColorDark: ge,
    connectionLineColorLight: ue,
    setConnectionLineColorLight: _e,
    canvasBgColorLight: re,
    setCanvasBgColorLight: fe,
    canvasBgColorDark: ye,
    setCanvasBgColorDark: ie,
    handleCanvasGridToggle: ke,
    handleCanvasSnapToggle: ve,
    handleFollowDownstreamOnDragToggle: Te,
    handleCanvasMinimapToggle: Ne,
    handleShowAllCanvasConnectionsToggle: me,
    handleHideAllInputImagePreviewsToggle: Ae,
    handleAlignmentGuidesToggle: Fe,
    handleCanvasBgGlowToggle: Me,
    handleNodeDeleteButtonToggle: rt,
    handleStartGenerateButtonToggle: nt,
    handleEnableConnectWireTiltToggle: ze,
    handleEnableConnectWireMarqueeToggle: Le,
    handleEnableGenerationConnectionFlowToggle: Ke,
    handleGenerationConnectionFlowModeChange: Xe,
    handleEnableGenerationNodeAnimationToggle: De,
    handleGenerationNodeAnimationModeChange: Ye,
    handleCanvasGenerationTimerToggle: Ce
  };
}

let Psr = null;

const e_t = new Set();

function _di() {
  e_t.forEach(e => e());
}

function kdi(e) {
  return Psr = e, _di(), e;
}

function t_t() {
  return Psr;
}

function Adi(e) {
  return e_t.add(e), () => {
    e_t.delete(e);
  };
}

function Sdi() {
  return g.useSyncExternalStore(Adi, t_t, t_t);
}

function Idi(e) {
  const t = n => (...r) => {
    var i;
    const a = (i = e.current) == null ? void 0 : i[n];
    return a == null ? void 0 : a(...r);
  };
  return {
    onToggleHelpPanel: t("onToggleHelpPanel"),
    onProjectNameChange: t("onProjectNameChange"),
    onEditProjectNameStart: t("onEditProjectNameStart"),
    onEditProjectNameEnd: t("onEditProjectNameEnd"),
    onLeftToolbarDockChange: t("onLeftToolbarDockChange"),
    onRefreshProjectList: t("onRefreshProjectList"),
    onOpenProjectFromSwitcher: t("onOpenProjectFromSwitcher"),
    onCreateNewCanvasFromSwitcher: t("onCreateNewCanvasFromSwitcher"),
    onOpenSettings: t("onOpenSettings"),
    onOpenConsole: t("onOpenConsole"),
    onOpenStorageManage: t("onOpenStorageManage"),
    onDownloadSelected: t("onDownloadSelected"),
    onCanvasGridToggle: t("onCanvasGridToggle"),
    onCanvasGridSpacingChange: t("onCanvasGridSpacingChange"),
    onCanvasGridDotSizeChange: t("onCanvasGridDotSizeChange"),
    onCanvasSnapToggle: t("onCanvasSnapToggle"),
    onFollowDownstreamOnDragToggle: t("onFollowDownstreamOnDragToggle"),
    onCanvasMinimapToggle: t("onCanvasMinimapToggle"),
    onCanvasMinimapDockChange: t("onCanvasMinimapDockChange"),
    onShowAllCanvasConnectionsToggle: t("onShowAllCanvasConnectionsToggle"),
    onConnectionHitWidthChange: t("onConnectionHitWidthChange"),
    onHideAllInputImagePreviewsToggle: t("onHideAllInputImagePreviewsToggle"),
    onAlignmentGuidesToggle: t("onAlignmentGuidesToggle"),
    onLocateAnimationMaxNodesChange: t("onLocateAnimationMaxNodesChange"),
    onCanvasBgGlowToggle: t("onCanvasBgGlowToggle"),
    onNodeDeleteButtonToggle: t("onNodeDeleteButtonToggle"),
    onStartGenerateButtonToggle: t("onStartGenerateButtonToggle"),
    onClearCanvas: t("onClearCanvas"),
    onEnableConnectWireTiltToggle: t("onEnableConnectWireTiltToggle"),
    onEnableConnectWireMarqueeToggle: t("onEnableConnectWireMarqueeToggle"),
    onEnableGenerationConnectionFlowToggle: t("onEnableGenerationConnectionFlowToggle"),
    onGenerationConnectionFlowModeChange: t("onGenerationConnectionFlowModeChange"),
    onEnableGenerationNodeAnimationToggle: t("onEnableGenerationNodeAnimationToggle"),
    onGenerationNodeAnimationModeChange: t("onGenerationNodeAnimationModeChange"),
    onCanvasGenerationTimerToggle: t("onCanvasGenerationTimerToggle"),
    onConnectionLineStrokeWidthChange: t("onConnectionLineStrokeWidthChange"),
    onConnectionLineOpacityPercentChange: t("onConnectionLineOpacityPercentChange"),
    onConnectionLineColorChange: t("onConnectionLineColorChange")
  };
}

function Cdi(e) {
  const t = g.useRef(e);
  t.current = e;
  const n = g.useRef(null);
  n.current === null && (n.current = Idi(t), kdi(n.current));
}

function Edi(e, t) {
  if (FX() !== "canvas" || !t.enabled || $Z(document.activeElement) || document.body.matches(".canvas-interacting, .canvas-node-dragging, .canvas-box-select-group-dragging")) return;
  e.handled = !0;
  const n = t.viewRef.current;
  if (e.command === "save") {
    t.save().catch(r => qi(String(r)));
    return;
  }
  if (e.command === "undo") {
    t.undo();
    return;
  }
  if (e.command === "redo") {
    t.redo();
    return;
  }
  if (["zoom-in", "zoom-out", "fit"].includes(e.command) && t.zoomLocked) {
    zO("画布缩放已锁定，请先解锁");
    return;
  }
  switch (e.command) {
    case "zoom-in":
      t.zoom($De(n.zoom * 1.15));
      break;
    case "zoom-out":
      t.zoom($De(n.zoom / 1.15));
      break;
    case "fit":
      t.commitView(T5t(t.nodesRef.current, t.viewport, {
        minZoom: Sd.MIN_ZOOM,
        maxZoom: 1
      }) || oU());
      break;
    case "pan-up":
      t.commitView({
        ...n,
        y: n.y + 80
      });
      break;
    case "pan-down":
      t.commitView({
        ...n,
        y: n.y - 80
      });
      break;
    case "pan-left":
      t.commitView({
        ...n,
        x: n.x + 80
      });
      break;
    case "pan-right":
      t.commitView({
        ...n,
        x: n.x - 80
      });
      break;
  }
}

function Tdi(e) {
  const t = g.useRef(e);
  t.current = e, g.useEffect(() => {
    const n = r => Edi(r.detail, t.current);
    return window.addEventListener(bbt, n), () => window.removeEventListener(bbt, n);
  }, []);
}

let Rsr = null;

const n_t = new Set();

function Mdi() {
  n_t.forEach(e => e());
}

function Pdi(e) {
  return Rsr = e, Mdi(), e;
}

function usn() {
  return Rsr;
}

function Rdi(e) {
  return n_t.add(e), () => {
    n_t.delete(e);
  };
}

function Ndi() {
  return g.useSyncExternalStore(Rdi, usn, usn);
}

function jdi(e) {
  const t = n => (...r) => {
    var i;
    const a = (i = e.current) == null ? void 0 : i[n];
    return a == null ? void 0 : a(...r);
  };
  return {
    onToggleCollapsed: t("onToggleCollapsed"),
    onSetActiveTool: t("onSetActiveTool"),
    onToggleHistory: t("onToggleHistory"),
    onToggleCharacters: t("onToggleCharacters"),
    onToggleKlingSubjects: t("onToggleKlingSubjects"),
    onToggleRhAppLibrary: t("onToggleRhAppLibrary"),
    onToggleProjectPanel: t("onToggleProjectPanel"),
    onTogglePoseLibrary: t("onTogglePoseLibrary"),
    onToggleProductionCenter: t("onToggleProductionCenter"),
    onToggleProjectMemory: t("onToggleProjectMemory"),
    onToggleChat: t("onToggleChat"),
    onToggleTextTool: t("onToggleTextTool"),
    onToggleDoodleTool: t("onToggleDoodleTool"),
    onSaveProject: t("onSaveProject"),
    onLoadProject: t("onLoadProject"),
    onImportWorkflow: t("onImportWorkflow"),
    onOpenSkillToWorkflow: t("onOpenSkillToWorkflow"),
    onToggleAlignPanel: t("onToggleAlignPanel"),
    onCategorizedExport: t("onCategorizedExport"),
    onCreateNodeAtCanvasCenter: t("onCreateNodeAtCanvasCenter")
  };
}

function Ddi(e) {
  const t = g.useRef(e);
  t.current = e;
  const n = g.useRef(null);
  n.current === null && (n.current = jdi(t), Pdi(n.current));
}

function cMe(e, t) {
  return t(e);
}

function Ldi(e, t) {
  const n = (() => {
      const h = t.filterModels(e);
      return t.includeJimengCli ? h : h.filter(p => !String(p.id || "").startsWith("jimeng-cli-"));
    })(),
    r = cMe(n, t.filterHuyaModels),
    a = t.filterModelListDisplay(r),
    i = t.filterModelListDisplay(n),
    o = cMe(bPt(a, t.globalBaseUrl), t.filterHuyaModels),
    s = aYr(cMe(t.showHiddenModelsInGenNodes ? n : i, t.filterHuyaModels), t.globalBaseUrl),
    l = p8a(s),
    d = cMe(a, t.filterHuyaModels),
    u = r.filter(h => h.type === "Image");
  return {
    featureFilteredApiConfigs: n,
    huyaFilteredApiConfigs: r,
    displayFilteredApiConfigs: a,
    visibleApiConfigs: o,
    genNodeApiConfigs: l,
    chatApiConfigs: d,
    visibleImageConfigs: o.filter(h => h.type === "Image"),
    expandImageConfigs: u
  };
}

function Odi(e) {
  const {
      apiConfigs: t,
      globalBaseUrl: n,
      filterModels: r,
      filterHuyaModels: a
    } = e,
    {
      isModelHiddenInList: i,
      setModelHiddenInList: o,
      filterModelListDisplay: s,
      showHiddenModelsInGenNodes: l,
      setShowHiddenModelsInGenNodes: d
    } = BZ(),
    {
      tokens: u,
      pricing: h
    } = cVn();
  return {
    ...g.useMemo(() => Ldi(t, {
      filterModels: r,
      filterHuyaModels: a,
      filterModelListDisplay: s,
      showHiddenModelsInGenNodes: l,
      includeJimengCli: Pxe(),
      globalBaseUrl: n
    }), [t, r, a, s, l, n, u.length]),
    platformGroupTokens: u,
    platformPricing: h,
    isModelHiddenInList: i,
    setModelHiddenInList: o,
    showHiddenModelsInGenNodes: l,
    setShowHiddenModelsInGenNodes: d
  };
}

function Bdi(e, t, n) {
  const r = e.find(a => a.id === t);
  if (r != null && r.agentCreativeProject || r != null && r.agentContextLog || r != null && r.agentProductionRun) return r;
  for (let a = e.length - 1; a >= 0; a -= 1) {
    const i = e[a];
    if (i.mode === "agent" && (i.projectId ?? null) === (n ?? null) && (i.agentCreativeProject || i.agentContextLog || i.agentProductionRun)) return i;
  }
}

const Fdi = /记住|以后(?:都|不要|必须|需要)|长期|始终|不要再|必须保留|必须避免|我的偏好|固定(?:使用|为)/;

function zdi(e, t) {
  var a, i;
  const n = [],
    r = e.filter(o => o.role === "user").slice(-8);
  for (const o of r) {
    const s = (o.files ?? []).filter(d => d.isImage),
      l = String(o.content || "").split(/[。！？!?\n]+/).map(d => d.trim()).filter(d => d.length >= 6 && d.length <= 240).filter(d => Fdi.test(d));
    for (const d of l.slice(0, 4)) {
      const u = Number(((a = d.match(/@(\d+)/)) == null ? void 0 : a[1]) || 0),
        h = u >= 1 && u <= s.length ? u - 1 : 0,
        p = s[h],
        m = p ? h + 1 : 0;
      n.push({
        content: d,
        evidence: {
          id: m ? `evidence-chat-${o.id}-${m}` : `evidence-chat-${o.id}`,
          type: "chat",
          sourceId: o.id,
          sessionId: t,
          label: p ? `@${m} ${((i = p.name) == null ? void 0 : i.replace(/\.[^.]+$/, "")) || "对话参考"}` : o.content.slice(0, 32) || "对话",
          thumbnailUrl: [p == null ? void 0 : p.preview, p == null ? void 0 : p._ossRemoteUrl, p == null ? void 0 : p.url].find(f => typeof f == "string" && /^(?:https?:|file:|asset:)/i.test(f))
        }
      });
    }
  }
  return n;
}

const Udi = /不要再?|不得|禁止|避免|不能|不需要/;

function $di(e, t) {
  for (const n of zdi(e, t)) Azn({
    scope: "personal",
    category: Udi.test(n.content) ? "corrections" : "user",
    content: n.content,
    evidence: [n.evidence],
    origin: "agent"
  });
}

function Gdi({
  currentProjectId: e,
  chatSessions: t,
  currentChatId: n
}) {
  const r = g.useMemo(() => Bdi(t, n, e), [t, n, e]);
  g.useEffect(() => {
    $di((r == null ? void 0 : r.messages) ?? [], r == null ? void 0 : r.id);
  }, [r == null ? void 0 : r.id, r == null ? void 0 : r.messages]);
}

function Vdi({
  canvasWorldRef: e,
  effectiveView: t,
  isPanningRef: n,
  isViewRefPending: r
}) {
  g.useLayoutEffect(() => {
    !e.current || sTr({
      interacting: Yi(),
      hookPanning: !!n.current,
      viewRefPending: r,
      dragStatePanning: jl(),
      panPending: Av(),
      cullFrozen: !!bae()
    }) || mY(e.current, t);
  }, [t.x, t.y, t.zoom, r, e, n]);
}

function Hdi(e) {
  const [t, n] = g.useState(!1),
    r = g.useRef(e);
  return g.useEffect(() => {
    if (e === r.current) return;
    r.current = e;
    const a = requestAnimationFrame(() => g.startTransition(() => n(e)));
    return () => cancelAnimationFrame(a);
  }, [e]), t;
}

const Wdi = new Set(["input-image", "preview"]);

function hsn(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  if (!n || !r) return !1;
  if (n === r) return !0;
  try {
    const a = new URL(n),
      i = new URL(r);
    if (a.pathname && i.pathname && a.pathname === i.pathname) return !0;
  } catch {}
  return n.includes(r) || r.includes(n);
}

function ABt(e) {
  const t = e.settings || {},
    n = String(e._contentAssetId || t._contentAssetId || t._assetId || t._localCacheAssetId || "").trim(),
    r = String(t._ossRemoteUrl || t._codexSourceUrl || t._ossThumbnailUrl || "").trim();
  return {
    assetId: n || void 0,
    ossUrl: r && nr(r) ? r : void 0
  };
}

function qdi(e, t) {
  var i, o, s, l, d;
  if (!Wdi.has(t.type)) return !1;
  const n = ABt(t),
    r = String(e._contentAssetId || ((i = e.settings) == null ? void 0 : i._contentAssetId) || ((o = e.settings) == null ? void 0 : o._assetId) || ((s = e.settings) == null ? void 0 : s._localCacheAssetId) || "").trim();
  if (r && n.assetId && r === n.assetId) return !0;
  const a = String(((l = e.settings) == null ? void 0 : l._ossRemoteUrl) || ((d = e.settings) == null ? void 0 : d._codexSourceUrl) || e.content || "").trim();
  return !!(a && n.ossUrl && hsn(a, n.ossUrl) || a && nr(a) && typeof t.content == "string" && hsn(a, t.content));
}

function Kdi(e, t) {
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    if (qdi(t, r)) return r;
  }
  return null;
}

const Qdi = /(?:\bfinal\b|key\s*art|approved|locked|canonical|正稿|定稿|已选定|锁定|主参考|最终)/i,
  Ydi = /(?:model\s*sheet|turnaround|四视图|三视图|转面|表情|动作)/i,
  Xdi = /(?:\bqa\b|review|验收|校对|检查)/i,
  Jdi = /(?:必须|禁止|不要|统一|only|must|avoid)/i;

function lJe(e) {
  let t = String(e.content || "");
  return (t.startsWith("data:") || t.startsWith("blob:") || t.startsWith("http")) && (t = ""), String(e.nodeName || e.prompt || t || e.id).replace(/\s+/g, " ").trim().slice(0, 120) || e.id;
}

function Nsr(e) {
  var t;
  return !!(String(e.content || "").trim() || Array.isArray(e.previewMjImages) && e.previewMjImages.length > 0 || Array.isArray(e.previewMjVideos) && e.previewMjVideos.length > 0 || Array.isArray((t = e.settings) == null ? void 0 : t.generatedImages) && e.settings.generatedImages.length > 0);
}

function Zdi(e) {
  var n;
  const t = String(e.projectAssetRole || ((n = e.settings) == null ? void 0 : n.projectAssetRole) || "").trim();
  return ["reference", "candidate_output", "selected_output", "canonical_reference", "archived"].includes(t) ? t : null;
}

function eui(e) {
  const t = Zdi(e);
  return t || (e.type === "input-image" || e.type === "video-input" ? "reference" : Qdi.test(lJe(e)) ? "canonical_reference" : "candidate_output");
}

function tui(e) {
  var n;
  const t = String(e.projectVersionGroup || ((n = e.settings) == null ? void 0 : n.projectVersionGroup) || "").replace(/\s+/g, " ").trim();
  return t ? t.slice(0, 80) : void 0;
}

function nui(e) {
  const t = e ? lJe(e).toLowerCase() : "";
  if (/pet|宠物|精灵|召唤兽/.test(t)) return "pet";
  if (/role|character|角色|人物|男|女/.test(t)) return "character";
  if (/scene|场景|环境|背景|庄园|地图/.test(t)) return "scene";
  if (/style|风格|色彩|材质/.test(t)) return "style";
}

function rui(e) {
  const t = e.replace(/\s+/g, "").trim();
  return /^(?:image|video|audio|voice|图片|视频|音频|语音)(?:[_-]?\d+)?$/i.test(t);
}

function psn(e) {
  return !!(e && ["input-image", "preview", "gen-image", "gen-video", "video-input"].includes(e.type));
}

function aui(e, t) {
  const n = e.map(lJe).join(`
`),
    r = e.some(a => (a.type === "gen-image" || a.type === "gen-video") && Nsr(a));
  return Xdi.test(n) ? {
    id: "review",
    label: "一致性验收",
    reason: "画布含有验收或检查节点。"
  } : Ydi.test(n) ? {
    id: "production",
    label: "制作扩展",
    reason: "已进入转面、表情或动作等衍生制作。"
  } : t.some(a => a.role === "canonical_reference") ? {
    id: "model_sheet",
    label: "模型单准备",
    reason: "已识别出明确标注的正稿/锁定参考。"
  } : r ? {
    id: "concept_exploration",
    label: "概念探索",
    reason: "已有生成结果，但尚未标记正稿。"
  } : {
    id: "intake",
    label: "项目设定",
    reason: "尚未发现可用的概念输出。"
  };
}

function iui(e) {
  const t = new Map(e.nodes.map(E => [E.id, E])),
    n = e.connections.filter(E => psn(t.get(E.from)) && psn(t.get(E.to))).map(E => {
      var M, T;
      return {
        fromNodeId: E.from,
        toNodeId: E.to,
        relation: ((M = t.get(E.from)) == null ? void 0 : M.type) === "input-image" || ((T = t.get(E.from)) == null ? void 0 : T.type) === "preview" ? "reference" : "derived",
        referenceRole: E.referenceRole || nui(t.get(E.from))
      };
    }),
    r = new Map();
  for (const E of n) {
    const M = r.get(E.toNodeId) || [];
    M.push(E.fromNodeId), r.set(E.toNodeId, M);
  }
  const a = e.nodes.filter(E => (E.type === "gen-image" || E.type === "gen-video" || E.type === "preview") && Nsr(E)),
    i = a.map(E => {
      var M;
      return {
        nodeId: E.id,
        label: lJe(E),
        role: eui(E),
        sourceNodeIds: r.get(E.id) || [],
        versionGroup: tui(E),
        note: String(E.projectAssetNote || ((M = E.settings) == null ? void 0 : M.projectAssetNote) || "").replace(/\s+/g, " ").trim().slice(0, 200) || void 0
      };
    }),
    o = [...i.reduce((E, M) => {
      if (!M.versionGroup) return E;
      const T = E.get(M.versionGroup) || {
        id: M.versionGroup,
        label: M.versionGroup,
        nodeIds: []
      };
      return T.nodeIds.push(M.nodeId), M.role === "canonical_reference" && (T.canonicalNodeId = M.nodeId), E.set(M.versionGroup, T), E;
    }, new Map()).values()],
    s = i.filter(E => E.role === "canonical_reference").map(E => E.nodeId),
    l = new Set(e.connections.flatMap(E => [E.from, E.to])),
    d = new Set(i.map(E => E.nodeId)),
    u = {
      generatedOutputCount: a.length,
      indexedOutputCount: i.length,
      unindexedOutputNodeIds: a.filter(E => !d.has(E.id)).map(E => E.id),
      multipleCanonicalNodeIds: s.length > 1 ? s : [],
      genericNameNodeIds: a.filter(E => rui(String(E.nodeName || ""))).map(E => E.id),
      orphanReferenceNodeIds: e.nodes.filter(E => (E.type === "input-image" || E.type === "video-input") && !l.has(E.id)).map(E => E.id),
      technicalIdNameNodeIds: e.nodes.filter(E => /^\d{5,}-\d+-[a-z0-9]+$/i.test(String(E.nodeName || "").trim())).map(E => E.id),
      encodingAnomalyNodeIds: e.nodes.filter(E => /\uFFFD|锟斤拷/.test(String(E.nodeName || ""))).map(E => E.id),
      multiReferenceOutputNodeIds: i.filter(E => E.sourceNodeIds.length > 1).map(E => E.nodeId),
      namingSuggestions: []
    },
    h = {
      reference: "参考",
      candidate_output: "候选",
      selected_output: "入选",
      canonical_reference: "正稿",
      archived: "归档"
    },
    p = new Map();
  u.namingSuggestions = i.filter(E => u.genericNameNodeIds.includes(E.nodeId)).map(E => {
    const M = E.versionGroup || "未分组",
      T = (p.get(M) || 0) + 1;
    return p.set(M, T), {
      nodeId: E.nodeId,
      currentName: E.label,
      suggestedName: `${M}｜${h[E.role]} ${T}`
    };
  });
  const m = [{
    category: "project",
    content: `项目：${e.projectName.trim() || "未命名项目"}`
  }];
  for (const E of e.nodes) {
    const M = E.type === "text-node" || E.type === "custom-agent" ? `${String(E.nodeName || "")} ${String(E.prompt || "")} ${String(E.content || "")}`.replace(/\s+/g, " ").trim().slice(0, 240) : "";
    M && Jdi.test(M) && m.push({
      category: "rule",
      content: M,
      sourceNodeIds: [E.id]
    });
  }
  for (const E of i.filter(M => M.role === "canonical_reference")) m.push({
    category: "asset",
    content: `锁定参考：${E.label}`,
    sourceNodeIds: [E.nodeId]
  });
  const f = aui(e.nodes, i),
    y = ["intake", "concept_exploration", "key_art_locked", "model_sheet", "production", "review"],
    b = y.indexOf(f.id),
    v = y.map((E, M) => ({
      id: E,
      complete: M < b
    })),
    _ = i.find(E => E.role === "canonical_reference"),
    w = a.filter(E => !String(E.prompt || "").trim()).map(E => E.id),
    k = i.filter(E => !E.versionGroup && E.role !== "archived").map(E => E.nodeId),
    A = i.filter(E => E.sourceNodeIds.length === 0 && E.role !== "canonical_reference").map(E => E.nodeId),
    S = [{
      id: "canonical-anchor",
      label: "正稿锚点",
      status: _ ? "pass" : i.length > 0 ? "blocked" : "warn",
      details: _ ? `已锁定 ${_.nodeId}` : "尚未确认唯一正稿",
      nodeIds: _ ? [_.nodeId] : void 0
    }, {
      id: "asset-index",
      label: "资产索引",
      status: u.unindexedOutputNodeIds.length === 0 ? "pass" : "blocked",
      details: u.unindexedOutputNodeIds.length === 0 ? `已索引 ${u.indexedOutputCount}/${u.generatedOutputCount}` : `未索引 ${u.unindexedOutputNodeIds.join(", ")}`,
      nodeIds: u.unindexedOutputNodeIds.length ? u.unindexedOutputNodeIds : void 0
    }, {
      id: "prompt-completeness",
      label: "生成提示词",
      status: w.length === 0 ? "pass" : "warn",
      details: w.length === 0 ? "所有生成节点都有提示词" : `${w.length} 个生成节点缺少提示词`,
      nodeIds: w.length ? w : void 0
    }, {
      id: "version-groups",
      label: "方案分组",
      status: k.length === 0 ? "pass" : "warn",
      details: k.length === 0 ? `已建立 ${o.length} 个方案组` : `${k.length} 个输出尚未归入方案组`,
      nodeIds: k.length ? k : void 0
    }, {
      id: "reference-lineage",
      label: "参考血缘",
      status: A.length === 0 && u.multiReferenceOutputNodeIds.length === 0 ? "pass" : "warn",
      details: A.length > 0 ? `${A.length} 个输出缺少参考来源` : u.multiReferenceOutputNodeIds.length > 0 ? `${u.multiReferenceOutputNodeIds.length} 个输出使用多参考；需确认是否保留多参考策略` : "生成结果均可追溯参考来源",
      nodeIds: A.length ? A : u.multiReferenceOutputNodeIds.length ? u.multiReferenceOutputNodeIds : void 0
    }, {
      id: "naming",
      label: "命名规范",
      status: u.genericNameNodeIds.length === 0 ? "pass" : "warn",
      details: u.genericNameNodeIds.length === 0 ? "资产命名清晰" : `${u.genericNameNodeIds.length} 个输出仍使用通用名称`,
      nodeIds: u.genericNameNodeIds.length ? u.genericNameNodeIds : void 0
    }, {
      id: "semantic-source-names",
      label: "素材名称可读性",
      status: u.technicalIdNameNodeIds.length === 0 ? "pass" : "warn",
      details: u.technicalIdNameNodeIds.length === 0 ? "素材名称可读" : `${u.technicalIdNameNodeIds.length} 个素材使用技术 ID，建议补充语义化名称`,
      nodeIds: u.technicalIdNameNodeIds.length ? u.technicalIdNameNodeIds : void 0
    }, {
      id: "text-encoding",
      label: "文本编码",
      status: u.encodingAnomalyNodeIds.length === 0 ? "pass" : "warn",
      details: u.encodingAnomalyNodeIds.length === 0 ? "未检测到替换字符或已知乱码标记" : `${u.encodingAnomalyNodeIds.length} 个节点疑似存在编码异常`,
      nodeIds: u.encodingAnomalyNodeIds.length ? u.encodingAnomalyNodeIds : void 0
    }],
    C = [];
  i.length > 0 && !_ && C.push("已有候选输出，但没有标记“正稿/定稿/锁定”；继续衍生前应让用户确认唯一参考。"), _ && _.sourceNodeIds.length === 0 && C.push("锁定参考没有可追溯上游来源；后续生成仍可使用它，但资产血缘不完整。"), u.unindexedOutputNodeIds.length > 0 && C.push(`有 ${u.unindexedOutputNodeIds.length} 个生成结果未纳入资产索引：${u.unindexedOutputNodeIds.join(", ")}。`), u.multipleCanonicalNodeIds.length > 0 && C.push(`存在多个正稿锚点：${u.multipleCanonicalNodeIds.join(", ")}。请保留唯一正稿或按方案组明确主参考。`), u.genericNameNodeIds.length > 0 && C.push(`有 ${u.genericNameNodeIds.length} 个候选仍使用通用名称；建议建立方案组并补充用途命名。`);
  const I = _ ? `以 ${_.nodeId} 为唯一参考，先询问用户确认后再创建下一阶段衍生节点。` : i.length > 0 ? "展示候选结果并请用户标记一张为正稿，随后才进入衍生制作。" : "先补齐项目目标、视觉规则与第一轮概念探索。";
  return {
    projectId: e.projectId ? String(e.projectId) : null,
    currentPhase: f,
    milestones: v,
    memories: m.slice(0, 12),
    lineage: n,
    assetAnchors: i,
    versionGroups: o,
    integrity: u,
    qualityChecks: S,
    nextStep: I,
    risks: C
  };
}

const oui = 0,
  bye = 24,
  uUe = [{
    key: "confirm",
    label: "确认镜头",
    hint: "核对时长 / 画面 / 景别 / 运镜"
  }, {
    key: "assets",
    label: "准备资产",
    hint: "角色 / 场景 / 道具设定"
  }, {
    key: "prompts",
    label: "合成提示词",
    hint: "分镜图 + 视频运动双轨"
  }],
  jsr = "高质量专业角色设定图，横向构图，纯白色纯净背景，中性摄影棚灯光，平光布光；布局必须是角色四视图：正面面部头部特写（占图片水平 1/3）+ [全身正面视图 + 全身左侧面视图 + 全身背面视图]（占剩余 2/3，并列排列），四个视图中间用淡灰色(#E2E2E2)的 2px 细线分割；无任何道具或背景物体，不得出现复杂动作、情绪表情、文字、水印、其他角色。",
  Dsr = "高质量专业场景设定图，2×2 四视角大全景：正面中心线、左前45°、右前45°、背后；同一时间光线与材质；禁人物入画；正视图对称；完整空间层次。",
  Lsr = "高质量专业道具设定图，六视图：正、后、左、右、俯、仰，正交投影，禁透视畸变，禁人物/场景/水印，白底或中性背景，材质清晰。",
  SBt = "{题材}题材，{美术风格}，{媒介}。色彩基调以{主色与对比}为主，辅以{辅色}；光影特征采用{光影手法}；画质呈现{画质与笔触}。",
  sui = "盛唐古风题材，新国风二次元美术风格，2D动漫媒介。色彩基调以高对比度、高饱和度的盛唐金红为主，辅以深邃幽蓝与帝王黑金；光影特征采用史诗感的伦勃朗光与强逆光剪影，伴有神圣感的丁达尔效应；画质呈现高清电影感动漫质感，精致的赛璐璐平涂结合局部厚涂笔触。";

function lui(e) {
  return e === "character" ? jsr : e === "scene" ? Dsr : Lsr;
}

function Zie(e, t) {
  const n = e === "character" ? t == null ? void 0 : t.characterSpec : e === "scene" ? t == null ? void 0 : t.sceneSpec : t == null ? void 0 : t.propSpec;
  return String(n || "").trim() || lui(e);
}

function AO(e) {
  return e === "character" ? "角色" : e === "scene" ? "场景" : "道具";
}

function uj(e) {
  return [...e.assets.characters, ...e.assets.scenes, ...e.assets.props];
}

function FCe(e, t) {
  var a;
  const n = (a = String(e.desc || "").split(/[，。,\n]/)[0]) == null ? void 0 : a.trim();
  return [`名称：${e.name}${n && n !== e.name ? `，${n}` : ""}。`, "", e.desc ? `描述：${e.desc}` : "", e.outfit ? `服装：${e.outfit}` : "", `特征：${e.traits || "无"}。`, "", `构图规范：${e.spec || Zie(e.role)}`, t != null && t.trim() ? `
[视觉风格：${t.trim()}]` : ""].filter((i, o, s) => i !== "" || s[o - 1] !== "").join(`
`).trim();
}

function Osr(e) {
  const t = n => n.filter(r => !String(r.imageUrl || "").trim()).length;
  return e ? {
    characters: t(e.assets.characters),
    scenes: t(e.assets.scenes),
    props: t(e.assets.props)
  } : {
    characters: 0,
    scenes: 0,
    props: 0
  };
}

function Bsr(e) {
  const t = Number(e == null ? void 0 : e.scriptParseShotCount);
  return !Number.isFinite(t) || t <= 0 ? 0 : Math.min(bye, Math.max(1, Math.round(t)));
}

function X7e(e) {
  const t = n => typeof n == "string" ? n.trim() : n == null ? "" : String(n).trim();
  return {
    characterSpec: t(e == null ? void 0 : e.scriptParseCharacterSpec),
    sceneSpec: t(e == null ? void 0 : e.scriptParseSceneSpec),
    propSpec: t(e == null ? void 0 : e.scriptParsePropSpec),
    seedance25Rules: t(e == null ? void 0 : e.scriptParseSeedance25Rules),
    globalStyle: t(e == null ? void 0 : e.scriptParseGlobalStyle)
  };
}

function cui(e) {
  const t = String((e == null ? void 0 : e.scriptParseStage) || "");
  return t === "assets" || t === "prompts" || t === "confirm" ? t : "confirm";
}

function hUe(e) {
  const t = e == null ? void 0 : e.scriptParseResult;
  return !t || typeof t != "object" || Array.isArray(t) ? null : Gsr(t);
}

function Fsr(e) {
  return e ? e.rows.filter(t => t.scene.trim().length > 0).length : 0;
}

function v1e(e) {
  return e ? e.rows.filter(t => t.prompt.status === "done" && t.prompt.imagePrompt.trim()).length : 0;
}

function dui(e) {
  return e ? e.assets.characters.length + e.assets.scenes.length + e.assets.props.length : 0;
}

function r_t(e) {
  return String(e || "").replace(/\s*[（(][^）)]*[）)]\s*/g, "").trim();
}

function zsr(e) {
  if (!e) return [];
  const t = uj(e).filter(a => a.name.length >= 1),
    n = new Map();
  for (const a of t) {
    const i = r_t(a.name);
    i && i !== a.name && n.set(i, (n.get(i) || 0) + 1);
  }
  const r = [];
  for (const a of t) {
    r.push({
      alias: a.name,
      name: a.name,
      role: a.role,
      key: a.key
    });
    const i = r_t(a.name);
    i && i !== a.name && n.get(i) === 1 && r.push({
      alias: i,
      name: a.name,
      role: a.role,
      key: a.key
    });
  }
  return r.sort((a, i) => i.alias.length - a.alias.length);
}

function IBt(e, t) {
  const n = String(e || "");
  if (!n) return [];
  const r = zsr(t);
  if (!r.length) return [{
    text: n,
    kind: "text"
  }];
  const a = [];
  let i = 0,
    o = "";
  const s = () => {
    o && (a.push({
      text: o,
      kind: "text"
    }), o = "");
  };
  for (; i < n.length;) {
    const l = n[i] === "@",
      d = l ? i + 1 : i,
      u = r.find(h => n.startsWith(h.alias, d));
    if (u && (l || u.alias.length >= 2)) {
      s(), a.push({
        text: `@${u.name}`,
        kind: "mention",
        name: u.name,
        role: u.role
      }), i = d + u.alias.length;
      continue;
    }
    o += n[i], i += 1;
  }
  return s(), a;
}

function pUe(e, t) {
  return IBt(e, t).map(n => n.kind === "mention" ? `@${n.name}` : n.text).join("");
}

function mot(e, t) {
  const n = new Set(e),
    r = [...e];
  for (const a of t) !a || n.has(a) || (n.add(a), r.push(a));
  return r;
}

function uui(e, t, n) {
  return e ? e.includes(`@${t.name}`) || e.includes(t.key) ? !0 : n.some(r => r.length >= 2 && e.includes(r)) : !1;
}

function cJe(e, t) {
  var i, o, s, l, d;
  const n = {
      characters: [],
      scenes: [],
      props: []
    },
    r = [e.scene, (i = e.prompt) == null ? void 0 : i.imagePrompt, (o = e.prompt) == null ? void 0 : o.videoMotionPrompt].filter(Boolean).join(`
`),
    a = zsr(t);
  for (const u of uj(t)) {
    const h = a.filter(p => p.key === u.key).map(p => p.alias);
    uui(r, u, h) && (u.role === "character" ? n.characters.push(u.key) : u.role === "scene" ? n.scenes.push(u.key) : n.props.push(u.key));
  }
  return {
    characters: mot(((s = e.refs) == null ? void 0 : s.characters) || [], n.characters),
    scenes: mot(((l = e.refs) == null ? void 0 : l.scenes) || [], n.scenes),
    props: mot(((d = e.refs) == null ? void 0 : d.props) || [], n.props)
  };
}

function hui(e, t, n) {
  let r = pUe(e, t);
  for (const a of n) a.name && (r.includes(`@${a.name}`) || (r = `@${a.name} ${r}`.trim()));
  return r;
}

function pui(e, t, n) {
  if (!n.length) return String(e || "");
  const r = new Map();
  n.forEach((i, o) => {
    const s = o + 1;
    r.set(i.name, s), r.set(i.key, s);
    const l = r_t(i.name);
    l && r.set(l, s);
  });
  let a = IBt(e, t).map(i => {
    if (i.kind !== "mention" || !i.name) return i.text;
    const o = r.get(i.name);
    return o ? `@${o}` : i.text;
  }).join("");
  return n.forEach((i, o) => {
    const s = `@${o + 1}`;
    a.includes(s) || (a = `${s} ${a}`.trim());
  }), a;
}

function lP(e, t) {
  const n = String(e || "").replace(/\s*[,，]?\s*\[视觉风格：[^\]]*\]\s*$/g, "").trimEnd(),
    r = String(t || "").trim();
  return r ? `${n}

[视觉风格：${r}]` : n;
}

function Usr(e, t) {
  const n = String(t || "").trim(),
    r = n !== String(e.globalStyle || "").trim(),
    a = i => i.map(o => ({
      ...o,
      prompt: lP(o.prompt || FCe(o, n), n)
    }));
  return {
    ...e,
    globalStyle: n,
    assets: {
      characters: a(e.assets.characters),
      scenes: a(e.assets.scenes),
      props: a(e.assets.props)
    },
    rows: e.rows.map(i => !i.prompt.imagePrompt && !i.prompt.videoMotionPrompt ? i : {
      ...i,
      prompt: {
        ...i.prompt,
        imagePrompt: lP(i.prompt.imagePrompt, n),
        videoMotionPrompt: lP(i.prompt.videoMotionPrompt, n),
        status: r && i.prompt.status === "done" ? "stale" : i.prompt.status
      }
    })
  };
}

function mui(e, t) {
  const n = String(e || "");
  if (!n || !t) return n ? [{
    text: n,
    kind: "text"
  }] : [];
  const r = [...t.assets.characters.map(o => ({
    name: o.name,
    kind: "character"
  })), ...t.assets.scenes.map(o => ({
    name: o.name,
    kind: "scene"
  })), ...t.assets.props.map(o => ({
    name: o.name,
    kind: "prop"
  }))].filter(o => o.name.length >= 2).sort((o, s) => s.name.length - o.name.length);
  if (!r.length) return [{
    text: n,
    kind: "text"
  }];
  const a = [];
  let i = 0;
  for (; i < n.length;) {
    let o = null;
    for (const s of r) {
      const l = n.indexOf(s.name, i);
      l < 0 || (!o || l < o.at) && (o = {
        at: l,
        name: s.name,
        kind: s.kind
      });
    }
    if (!o) {
      a.push({
        text: n.slice(i),
        kind: "text"
      });
      break;
    }
    o.at > i && a.push({
      text: n.slice(i, o.at),
      kind: "text"
    }), a.push({
      text: o.name,
      kind: o.kind
    }), i = o.at + o.name.length;
  }
  return a.filter(o => o.text.length > 0);
}

function TJ(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}

function _l(e) {
  return typeof e == "string" ? e.trim() : e == null ? "" : String(e).trim();
}

function w1e(e, t = 0) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? n : t;
}

function fot(e) {
  return Array.isArray(e) ? e.map(t => _l(t)).filter(Boolean) : [];
}

function $sr(e, t, n) {
  const r = n.replace(/\s+/g, "").slice(0, 12) || e;
  return `${e}-${t + 1}-${r}`;
}

function got(e, t, n, r, a) {
  const i = TJ(e),
    o = _l(i.name) || `${AO(t)}${n + 1}`,
    s = _l(i.desc) || _l(i.description) || _l(i.text),
    l = _l(i.outfit) || void 0,
    d = _l(i.traits) || _l(i.feature) || void 0,
    u = _l(i.spec) || Zie(t, a),
    h = {
      key: _l(i.key) || $sr(t, n, o),
      role: t,
      name: o,
      desc: s,
      outfit: l,
      traits: d,
      spec: u,
      imageUrl: _l(i.imageUrl) || _l(i.image) || void 0,
      nodeId: _l(i.nodeId) || void 0
    };
  return h.prompt = _l(i.prompt) || FCe(h, r), h;
}

function fui(e) {
  const t = TJ(e),
    n = _l(t.imagePrompt) || _l(t.image) || _l(t.storyboard),
    r = _l(t.videoMotionPrompt) || _l(t.video) || _l(t.motion),
    a = _l(t.status),
    i = a === "done" || a === "generating" || a === "stale" || a === "idle" ? a : n ? "done" : "idle",
    o = _l(t.mode) === "smart" ? "smart" : "concat";
  return {
    status: i,
    imagePrompt: n,
    videoMotionPrompt: r,
    mode: o
  };
}

function gui(e, t) {
  const n = TJ(e),
    r = TJ(n.refs),
    a = Math.max(1, Math.round(w1e(n.shotNo, t + 1))),
    i = Math.max(1, w1e(n.durationSec, w1e(n.duration, 8)));
  return {
    shotNo: a,
    durationSec: i,
    scene: _l(n.scene) || _l(n.content) || _l(n.description),
    shotSize: _l(n.shotSize) || _l(n.camera) || _l(n.shot_size),
    lighting: _l(n.lighting) || _l(n.light),
    dialogue: _l(n.dialogue) || _l(n.narration),
    sfx: _l(n.sfx) || _l(n.sound),
    cameraMove: _l(n.cameraMove) || _l(n.camera_move) || _l(n.move),
    refs: {
      characters: fot(r.characters),
      scenes: fot(r.scenes),
      props: fot(r.props)
    },
    prompt: fui(n.prompt)
  };
}

function Gsr(e, t) {
  const n = TJ(e),
    r = TJ(n.assets),
    a = _l(n.globalStyle) || _l(n.style),
    i = (Array.isArray(r.characters) ? r.characters : []).map((h, p) => got(h, "character", p, a, t)),
    o = (Array.isArray(r.scenes) ? r.scenes : []).map((h, p) => got(h, "scene", p, a, t)),
    s = (Array.isArray(r.props) ? r.props : []).map((h, p) => got(h, "prop", p, a, t)),
    l = (Array.isArray(n.rows) ? n.rows : Array.isArray(n.shots) ? n.shots : []).map((h, p) => gui(h, p)),
    d = l.length || Math.max(1, w1e(n.shotCount, oui)),
    u = {
      scriptTitle: _l(n.scriptTitle) || _l(n.title) || "未命名剧本",
      globalStyle: a,
      shotCount: d,
      rows: l.map((h, p) => ({
        ...h,
        shotNo: p + 1
      })),
      assets: {
        characters: i,
        scenes: o,
        props: s
      },
      model: _l(n.model) || void 0,
      createdAt: _l(n.createdAt) || new Date().toISOString()
    };
  return {
    ...u,
    rows: u.rows.map(h => ({
      ...h,
      refs: cJe(h, u)
    }))
  };
}

function yui(e, t) {
  const n = JNt(e);
  let r;
  try {
    r = JSON.parse(n);
  } catch {
    throw new Error("模型未返回可解析的 JSON，请换模型或缩短剧本后重试");
  }
  const a = Gsr(r, t == null ? void 0 : t.constraints);
  if (a.rows.length === 0) throw new Error("未解析出镜头，请检查剧本内容");
  const i = Wsr(t == null ? void 0 : t.constraints),
    o = i.mode === "lock" ? Usr(a, i.text) : a;
  return {
    ...o,
    rows: o.rows.map(s => ({
      ...s,
      prompt: {
        status: "idle",
        imagePrompt: "",
        videoMotionPrompt: "",
        mode: "concat"
      }
    })),
    shotCount: o.rows.length,
    model: (t == null ? void 0 : t.model) || o.model,
    createdAt: new Date().toISOString()
  };
}

function bui(e) {
  const t = new Map();
  for (const n of [...e.assets.characters, ...e.assets.scenes, ...e.assets.props]) t.set(n.key, n), t.set(n.name, n);
  return t;
}

function vui(e) {
  return e ? [e.name, e.desc, e.outfit ? `服装：${e.outfit}` : "", e.traits ? `特征：${e.traits}` : ""].filter(Boolean).join("，") : "";
}

const Vsr = `参考图使用规则：
角色参考图：只参考图中的角色形象；不参考角度/构图/姿势/表情；多视图时角色不得重复出现（除非分身）。
场景参考图：只参考场景位置/大小/形状/结构；不允许镜像或复制等视觉。
道具参考图：只参考道具大小/形状/结构；含正反面差异的道具需符合正反面逻辑。`;

function Hsr(e) {
  return String((e == null ? void 0 : e.seedance25Rules) || "").trim() || Vsr;
}

function Wsr(e) {
  const t = String((e == null ? void 0 : e.globalStyle) || "").trim();
  return t ? /{[^}]+}/.test(t) ? {
    mode: "preset",
    text: t
  } : {
    mode: "lock",
    text: t
  } : {
    mode: "generate",
    text: SBt
  };
}

function qsr(e, t, n) {
  const r = bui(t),
    a = cJe(e, t),
    i = f => f.map(y => r.get(y)).filter(y => !!y),
    o = i(a.characters),
    s = i(a.scenes),
    l = i(a.props),
    d = hui(e.scene, t, [...o, ...s, ...l]),
    u = f => f.map(y => `@${y.name}：${y.desc || vui(y)}`).join(`
`) || "无",
    h = t.rows.find(f => f.shotNo === e.shotNo - 1),
    p = lP([d, e.shotSize ? `景别：${e.shotSize}` : "", e.lighting ? `光影氛围：${e.lighting}` : "", e.cameraMove ? `运镜：${e.cameraMove}` : ""].filter(Boolean).join("，"), t.globalStyle),
    m = lP([`出场角色：${u(o)}`, "---", `背景场景：${u(s)}`, l.length ? `道具：${u(l)}` : "", "---", Hsr(n), "---", `前一个分镜描述：${h ? pUe(h.scene, t) : "故事开篇"}`, "当前分镜的分段描述：", `时间段：0-${e.durationSec}秒。`, `画面：${d}`, "禁止：角色不得突然换装或消失，道具不得悬浮或跳变，面部不得扭曲、多指畸形。", `约束：保持${e.shotSize || "当前景别"}与既有站位；@资产只参考设定图形象，不参考角度/构图/姿势。`, "站位与朝向：按画面描述。", `运镜：${e.cameraMove || "固定"}`, `音效：${e.sfx || "环境底噪"}`, `输出约束：1.保持角色服饰与设定图一致 2.静态道具绝不能跳变 3.正反面逻辑正确 4.运镜连贯 5.时长约 ${e.durationSec} 秒 6.防面部扭曲/多指畸形`].filter(Boolean).join(`
`), t.globalStyle);
  return {
    imagePrompt: p,
    videoMotionPrompt: m
  };
}

function wui(e, t) {
  const n = new Map(t.map(a => [a.key, a.nodeId])),
    r = a => a.map(i => n.has(i.key) ? {
      ...i,
      nodeId: n.get(i.key)
    } : i);
  return {
    ...e,
    assets: {
      characters: r(e.assets.characters),
      scenes: r(e.assets.scenes),
      props: r(e.assets.props)
    }
  };
}

function xui(e, t, n) {
  return {
    ...e,
    rows: e.rows.map(r => {
      if (t != null && r.shotNo !== t) return r;
      const a = qsr(r, e, n);
      return {
        ...r,
        refs: cJe(r, e),
        prompt: {
          status: a.imagePrompt ? "done" : "idle",
          imagePrompt: a.imagePrompt,
          videoMotionPrompt: a.videoMotionPrompt,
          mode: "concat"
        }
      };
    })
  };
}

function _ui(e, t) {
  return {
    ...e,
    rows: e.rows.map(n => t != null && n.shotNo !== t ? n : {
      ...n,
      prompt: {
        ...n.prompt,
        status: "generating"
      }
    })
  };
}

function kui(e, t, n, r) {
  const a = new Map();
  return t.forEach((i, o) => {
    const s = Math.round(Number(i.shotNo) || o + 1);
    a.set(s, i);
  }), {
    ...e,
    rows: e.rows.map((i, o) => {
      if (n != null && i.shotNo !== n) return i;
      const s = a.get(i.shotNo) || a.get(o + 1);
      if (!s && n != null) return i;
      const l = qsr(i, e, r),
        d = lP(pUe(_l(s == null ? void 0 : s.imagePrompt) || l.imagePrompt, e), e.globalStyle),
        u = lP(pUe(_l(s == null ? void 0 : s.videoMotionPrompt) || l.videoMotionPrompt, e), e.globalStyle);
      return {
        ...i,
        prompt: {
          status: d ? "done" : "idle",
          imagePrompt: d,
          videoMotionPrompt: u,
          mode: "smart"
        }
      };
    })
  };
}

function Aui(e) {
  const t = JNt(e),
    n = JSON.parse(t);
  return (Array.isArray(n.prompts) ? n.prompts : Array.isArray(n.rows) ? n.rows : Array.isArray(n.shots) ? n.shots : []).map(a => {
    const i = TJ(a);
    return {
      shotNo: w1e(i.shotNo, 0) || void 0,
      imagePrompt: _l(i.imagePrompt) || _l(i.image),
      videoMotionPrompt: _l(i.videoMotionPrompt) || _l(i.video)
    };
  });
}

function Sui(e, t, n, r) {
  const a = `新${AO(e)}${t + 1}`,
    i = {
      key: $sr(e, t, a),
      role: e,
      name: a,
      desc: "",
      spec: Zie(e, r)
    };
  return i.prompt = FCe(i, n), i;
}

function Iui(e) {
  return {
    shotNo: e,
    durationSec: 8,
    scene: "",
    shotSize: "中景",
    lighting: "",
    dialogue: "",
    sfx: "",
    cameraMove: "固定",
    refs: {
      characters: [],
      scenes: [],
      props: []
    },
    prompt: {
      status: "idle",
      imagePrompt: "",
      videoMotionPrompt: "",
      mode: "concat"
    }
  };
}

function Cui(e) {
  const t = [`# ${e.scriptTitle || "脚本解析"}`, e.globalStyle ? `全局风格：${e.globalStyle}` : "", `镜头数：${e.rows.length}`, "", "## 分镜"];
  e.rows.forEach(r => {
    t.push(`### 镜头 ${r.shotNo} · ${r.durationSec}s`, `- 画面：${r.scene || "—"}`, `- 景别：${r.shotSize || "—"}`, `- 光影：${r.lighting || "—"}`, `- 运镜：${r.cameraMove || "—"}`, `- 对白：${r.dialogue || "—"}`, `- 音效：${r.sfx || "—"}`, r.prompt.imagePrompt ? `- 分镜图提示词：${r.prompt.imagePrompt}` : "", r.prompt.videoMotionPrompt ? `- 视频运动提示词：${r.prompt.videoMotionPrompt}` : "", "");
  });
  const n = (r, a) => {
    a.length && (t.push(`## ${r}`), a.forEach(i => {
      t.push(`- ${i.name}：${i.prompt || [i.desc, i.outfit, i.traits].filter(Boolean).join("；") || "—"}`);
    }), t.push(""));
  };
  return n("角色", e.assets.characters), n("场景", e.assets.scenes), n("道具", e.assets.props), t.filter((r, a, i) => !(r === "" && i[a - 1] === "")).join(`
`).trim();
}

function Eui(e, t, n) {
  const r = t != null && t.trim() ? `
附加要求：
${t.trim()}
` : "",
    a = e > 0 ? `请拆成约 ${e} 个镜头（可按叙事增减 1–2 镜，但不要少于 1 镜）。` : "镜头数由你根据叙事自行决定，约 6–16 镜：转折多则多拆，过场可合并，不要为凑数灌水。",
    i = Zie("character", n),
    o = Zie("scene", n),
    s = Zie("prop", n),
    l = Wsr(n),
    d = l.mode === "lock" ? `globalStyle 必须原样使用用户指定的视觉风格，不要改写：${l.text}` : `globalStyle 必须按此预设写全（节点级全片公约，不要三个词打发）：${l.text}
示例：${sui}`;
  return `你是影视剧本拆镜导演。把用户剧本理解成可拍摄的镜头表，并抽出角色/场景/道具资产。
${a}
只输出 JSON，不要注释或 Markdown。字段：
{
  "scriptTitle": "剧名",
  "globalStyle": "按预设句式写全片视觉公约",
  "rows": [{
    "shotNo": 1,
    "durationSec": 8,
    "scene": "画面描述（主体+动作+空间）",
    "shotSize": "远景/全景/中景/近景/特写",
    "lighting": "光影氛围",
    "dialogue": "对白或旁白，可空",
    "sfx": "音效，可空",
    "cameraMove": "固定/推/拉/摇/移/跟/升降/手持",
    "refs": { "characters": ["角色key"], "scenes": ["场景key"], "props": ["道具key"] }
  }],
    "assets": {
    "characters": [{ "key": "character-1-名字", "name": "角色名", "desc": "身份外貌年龄体型发型", "outfit": "服装鞋帽配饰", "traits": "气质特征", "prompt": "设定图完整提示词" }],
    "scenes": [{ "key": "scene-1-名字", "name": "场景名", "desc": "空间与时代", "prompt": "场景设定图提示词" }],
    "props": [{ "key": "prop-1-名字", "name": "道具名", "desc": "外形用途", "prompt": "道具设定图提示词" }]
  }
}
要求：镜头边界贴合叙事转折；画面描述可直接当分镜；refs 必须引用 assets 里的 key。
${d}
拆镜时画面描述、光影氛围须服从 globalStyle，不要另开画风。
每个资产 prompt 必须用约束模板（中文，不要写成自由发挥）：
名称：{名字}，{身份一句话}。
描述：{外貌/空间/外形}
服装：{角色才写}
特征：{气质或材质}
构图规范：
角色：${i}
场景：${o}
道具：${s}
[视觉风格：与 globalStyle 一致]
${r}`;
}

function Tui(e, t, n) {
  const r = t != null ? e.rows.filter(o => o.shotNo === t) : e.rows,
    a = {
      scriptTitle: e.scriptTitle,
      globalStyle: e.globalStyle,
      rows: r.map(o => ({
        shotNo: o.shotNo,
        durationSec: o.durationSec,
        scene: o.scene,
        shotSize: o.shotSize,
        lighting: o.lighting,
        dialogue: o.dialogue,
        sfx: o.sfx,
        cameraMove: o.cameraMove,
        refs: o.refs
      })),
      assets: e.assets
    };
  return `你是 Seedance 2.5 提示词合成器。根据分镜与资产，为${t != null ? `第 ${t} 镜` : "每一镜"}生成两轨提示词。
只输出 JSON：{"prompts":[{"shotNo":1,"imagePrompt":"分镜图提示词","videoMotionPrompt":"视频运动提示词"}]}
这是约束生产：出场角色/场景/道具必须写成 @资产名（例如 @现代沈昭昭、@键盘），不要把设定图全文贴进画面句。@ 会绑定到对应设定图作为参考。
分镜图提示词：静态画面 = 嵌 @实体的画面描述 + 景别/构图 + 光影 + 末尾原样附上 [视觉风格：${e.globalStyle || "…"}]，不要运镜动词。
视频运动提示词必须按 Seedance 2.5 规范、用 --- 分段输出：
出场角色：@名：规格
---
背景场景：@名：规格
---
${Hsr(n)}
---
前一个分镜描述：…
当前分镜的分段描述：
时间段：0-N秒。
画面：…
禁止：…
约束：…
站位与朝向：…
运镜：…
音效：…
输出约束：1.服饰一致 2.静态道具不跳变 3.正反面逻辑 4.运镜连贯 5.时长 6.防面部扭曲/多指畸形
[视觉风格：${e.globalStyle || "…"}]
素材：
${JSON.stringify(a)}`;
}

function Mui(e) {
  const t = _Ie(e);
  return {
    inputType: (t == null ? void 0 : t.inputType) ?? "unknown",
    supportsMultipleImages: t == null ? void 0 : t.supportsMultipleImages,
    ratios: ah(e).filter(n => n !== "Auto"),
    resolutions: EZ(e)
  };
}

const msn = 160;

function fsn(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  if (t) return t.length <= msn ? t : `${t.slice(0, msn)}…`;
}

function Sfe(e, t = 600) {
  if (typeof e != "string") return;
  const n = e.trim();
  if (n) return n.length <= t ? n : `${n.slice(0, t)}…`;
}

function Pui(e) {
  var b, v, _;
  const t = Array.isArray(e.selectedNodeIds) ? e.selectedNodeIds : [...e.selectedNodeIds],
    n = Number.isFinite(e.view.zoom) && e.view.zoom > 0 ? e.view.zoom : 1,
    r = ((b = e.canvasSize) == null ? void 0 : b.width) ?? 1200,
    a = ((v = e.canvasSize) == null ? void 0 : v.height) ?? 800,
    i = Math.round((r / 2 - e.view.x) / n),
    o = Math.round((a / 2 - e.view.y) / n),
    s = r / n / 2,
    l = a / n / 2,
    d = new Set(t),
    u = Date.now(),
    h = Number.isFinite(e.stateVersion) && Number(e.stateVersion) >= 0 ? Math.floor(Number(e.stateVersion)) : u,
    p = e.nodes.filter(w => w.type === "gen-image" || w.type === "gen-video").map(w => {
      const k = !!(String(w.content || "").trim() || Array.isArray(w.previewMjImages) && w.previewMjImages.length > 0 || Array.isArray(w.previewMjVideos) && w.previewMjVideos.length > 0),
        A = fsn(w.errorMsg);
      return {
        nodeId: w.id,
        mediaType: w.type === "gen-video" ? "video" : "image",
        status: A ? "error" : w.isGenerating ? "running" : k ? "completed" : "idle",
        errorSummary: A
      };
    }),
    m = (e.recentChanges ?? []).slice(-20).map((w, k) => ({
      id: String(w.id || `change-${h}-${k}`),
      type: String(w.type || "unknown").slice(0, 48),
      nodeId: w.nodeId ? String(w.nodeId).slice(0, 128) : void 0,
      summary: String(w.summary || "").trim().slice(0, 200),
      at: Number.isFinite(w.at) ? Number(w.at) : void 0,
      revision: Number.isFinite(w.revision) ? Number(w.revision) : void 0
    })).filter(w => w.summary),
    f = new Map(),
    y = new Map();
  for (const w of e.connections) f.set(w.to, (f.get(w.to) ?? 0) + 1), y.set(w.from, (y.get(w.from) ?? 0) + 1);
  return {
    ok: !0,
    version: 1,
    projectId: e.projectId ? String(e.projectId) : null,
    stateVersion: h,
    updatedAt: u,
    projectName: e.projectName.trim() || "未命名项目",
    view: {
      zoom: n,
      centerX: i,
      centerY: o
    },
    selectedNodeId: e.selectedNodeId,
    selectedNodeIds: t,
    nodes: e.nodes.map(w => {
      var Q;
      const k = w.settings || {},
        A = k._agentRevisionOf,
        S = String(k.platformGroup || "").trim(),
        C = String(k.model || "").trim(),
        I = String(k.ratio || "").trim(),
        E = String(k.resolution || "").trim(),
        M = Number(k.duration),
        T = w.type === "gen-image" || w.type === "gen-video" || w.type === "text-node",
        P = String(w.prompt || "").trim(),
        R = (w.type === "gen-image" || w.type === "gen-video") && P ? P.length <= 360 ? P : `${P.slice(0, 360)}…` : void 0,
        j = w.type === "input-image" || w.type === "preview",
        B = w.type === "gen-image" || w.type === "gen-video",
        F = j ? ABt(w) : null,
        N = String(w.projectAssetRole || k.projectAssetRole || "").trim(),
        G = String(w.projectVersionGroup || k.projectVersionGroup || "").trim(),
        z = B && !!(String(w.content || "").trim() || Array.isArray(w.previewMjImages) && w.previewMjImages.length > 0 || Array.isArray(w.previewMjVideos) && w.previewMjVideos.length > 0 || Array.isArray(k.generatedImages) && k.generatedImages.length > 0),
        V = j && !!(F != null && F.assetId || F != null && F.ossUrl || typeof w.content == "string" && w.content.trim() && (w.content.startsWith("blob:") || w.content.startsWith("data:") || nr(w.content))),
        O = f.get(w.id) ?? 0,
        L = y.get(w.id) ?? 0,
        D = O + L,
        U = j && !w.isGenerating && D === 0,
        H = d.has(w.id) || e.selectedNodeId === w.id,
        Y = w.x + (w.width ?? 0) >= i - s && w.x <= i + s && w.y + (w.height ?? 0) >= o - l && w.y <= o + l,
        K = w.type === "text-node" ? Sfe(k.text ?? w.prompt) : w.type === "custom-agent" ? Sfe(w.prompt) : w.type === "shot-breakdown" ? Sfe((() => {
          const q = e7t(k);
          return q ? iYe(q) : "";
        })(), 1200) : w.type === "script-parse" ? Sfe((() => {
          const q = hUe(k);
          return q ? Cui(q) : "";
        })(), 1200) : void 0,
        W = w.type === "custom-agent" ? Sfe(k.outputContent) : void 0;
      return {
        id: w.id,
        type: w.type,
        nodeName: typeof w.nodeName == "string" ? w.nodeName : void 0,
        x: w.x,
        y: w.y,
        width: w.width,
        height: w.height,
        isGenerating: w.isGenerating === !0 ? !0 : void 0,
        errorMsg: fsn(w.errorMsg),
        platformGroup: T && S ? S : void 0,
        promptPreview: R,
        hasOutput: z || void 0,
        hasMedia: V || void 0,
        referenceAssetId: (F == null ? void 0 : F.assetId) || void 0,
        generationReferences: Array.isArray((Q = w.settings) == null ? void 0 : Q._agentReferenceBindings) ? w.settings._agentReferenceBindings : void 0,
        design: vze(k._agentDesign),
        revisionOf: typeof (A == null ? void 0 : A.nodeId) == "string" && typeof A.imageRevision == "string" ? {
          nodeId: A.nodeId.slice(0, 128),
          imageRevision: A.imageRevision.slice(0, 128)
        } : void 0,
        imageRevision: hCe(w),
        visualFacts: y7a(w),
        linkCount: D > 0 ? D : void 0,
        isOrphanRef: U || void 0,
        projectAssetRole: N || void 0,
        projectVersionGroup: G || void 0,
        isSelected: H || void 0,
        isInViewport: Y || void 0,
        incomingCount: O || void 0,
        outgoingCount: L || void 0,
        textPreview: K,
        outputPreview: W,
        model: C || void 0,
        ratio: I || void 0,
        resolution: E || void 0,
        duration: Number.isFinite(M) && M > 0 ? M : void 0
      };
    }),
    connections: e.connections.map(w => ({
      id: w.id,
      from: w.from,
      to: w.to,
      inputType: w.inputType,
      referenceRole: w.referenceRole
    })),
    visibleModels: e.visibleApiConfigs.filter(w => w.type === "Image" || w.type === "Video" || w.type === "Chat").map(w => {
      var k;
      return {
        id: w.id,
        type: w.type,
        provider: Yh(w.provider),
        modelName: w.modelName,
        ...(w.type === "Image" ? {
          imageCapabilities: {
            ...Mui(w.id),
            ...((k = w.resolutions) != null && k.length ? {
              resolutions: w.resolutions
            } : {})
          }
        } : {})
      };
    }),
    availableWorkflows: (((_ = e.capabilities) == null ? void 0 : _.workflows) ?? []).map(w => ({
      id: w.id,
      nameZh: w.name,
      summary: w.summary
    })),
    generationTasks: p,
    recentChanges: m,
    projectIntelligence: iui({
      projectId: e.projectId,
      projectName: e.projectName,
      nodes: e.nodes,
      connections: e.connections
    })
  };
}

const Rui = new Set(["create_node", "update_node", "connect_nodes", "connect_multi_refs", "select_node", "run_generation", "delete_node", "cleanup_orphan_nodes", "batch_actions", "gen_image", "write_text", "create_image_series", "undo", "redo"]);

function Ksr(e) {
  return Rui.has(String(e || "").trim());
}

function Nui() {
  return hXe();
}

let gsn = null,
  dMe = null;

async function jui() {
  return Fr("get_local_bridge_info");
}

async function CBt() {
  if (!Nui()) return !1;
  try {
    return await Fr("ensure_extension_bridge");
  } catch {
    return !1;
  }
}

function Dui(e) {
  const t = JSON.stringify(e);
  t !== gsn && (dMe != null && window.clearTimeout(dMe), dMe = window.setTimeout(() => {
    dMe = null, gsn = t, fetch(XXn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: t
    }).catch(() => {});
  }, 800));
}

let XF = "none",
  ysn = !1;

const a_t = new Set();

function Lde(e) {
  if (XF !== e) {
    XF = e, a_t.forEach(t => {
      try {
        t(XF);
      } catch (n) {
        console.warn("[CanvasJsSuspend] listener error:", n);
      }
    });
    try {
      window.dispatchEvent(new CustomEvent("canvasJsSuspendChange", {
        detail: {
          level: XF
        }
      }));
    } catch {}
  }
}

function EBt() {
  return XF;
}

function dJe() {
  return XF !== "none";
}

function TBt() {
  return XF === "idle";
}

function MBt(e) {
  a_t.add(e);
  try {
    e(XF);
  } catch {}
  return () => {
    a_t.delete(e);
  };
}

function Qsr() {
  if (typeof document < "u" && document.hidden) {
    Lde("hidden");
    return;
  }
  Lde("idle");
}

function yot() {
  if (typeof document < "u" && document.hidden) {
    Lde("hidden");
    return;
  }
  Lde("none");
}

function bsn() {
  Ie(async () => {
    const {
      resetIdleTimer: e
    } = await Promise.resolve().then(() => qfr);
    return {
      resetIdleTimer: e
    };
  }, void 0, import.meta.url).then(({
    resetIdleTimer: e
  }) => e()).catch(() => {});
}

function Ysr() {
  if (typeof document < "u" && document.documentElement.dataset.workspaceSurface === "browser") return !0;
  const e = typeof document < "u" ? document.documentElement.dataset.studioView : void 0;
  return e && e !== "canvas" ? !0 : dJe();
}

function bot() {
  Ie(async () => {
    const {
      generationPollScheduler: e
    } = await Promise.resolve().then(() => CFr);
    return {
      generationPollScheduler: e
    };
  }, void 0, import.meta.url).then(({
    generationPollScheduler: e
  }) => {
    typeof document < "u" && document.hidden ? e.pause() : e.isPaused() && e.resume();
  }).catch(() => {});
}

function Lui() {
  if (ysn || typeof window > "u") return;
  ysn = !0;
  const e = () => {
    if (document.hidden) {
      Lde("hidden"), bot(), Ie(async () => {
        const {
          trimMemoryCaches: n
        } = await Promise.resolve().then(() => mBi);
        return {
          trimMemoryCaches: n
        };
      }, void 0, import.meta.url).then(({
        trimMemoryCaches: n
      }) => n({
        keepRatio: .55,
        releaseComponentState: !1,
        releaseOffscreenMedia: !0
      })).catch(() => {});
      return;
    }
    bot(), yot(), bsn();
  };
  document.addEventListener("visibilitychange", e), document.hidden && Lde("hidden"), bot();
  const t = () => {
    yot(), bsn();
  };
  window.addEventListener("canvasActivity", t), window.addEventListener("pointerdown", t, {
    passive: !0,
    capture: !0
  }), window.addEventListener("keydown", t, {
    passive: !0,
    capture: !0
  }), window.__canvasJsSuspend = {
    getLevel: EBt,
    enterIdle: Qsr,
    clear: yot
  }, console.log("[CanvasJsSuspend] 已启动（hidden / idle 分级挂起）");
}

const Xsr = Object.freeze(Object.defineProperty({
    __proto__: null,
    enterCanvasJsIdleSuspend: Qsr,
    getCanvasJsSuspendLevel: EBt,
    initCanvasJsSuspend: Lui,
    isCanvasJsIdleSuspended: TBt,
    isCanvasJsSuspended: dJe,
    shouldPauseCanvasDecorativeRaf: Ysr,
    subscribeCanvasJsSuspend: MBt
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Oui = {
    available: hXe,
    suspended: dJe,
    ensure: () => {
      CBt();
    },
    push: e => fetch(QRa, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: e
    }).then(() => {})
  };

function Bui(e = Oui) {
  g.useEffect(() => {
    if (!e.available()) return;
    e.ensure();
    const t = () => {
        try {
          if (e.suspended()) return;
          e.push(localStorage.getItem(tD) ?? "[]").catch(() => {});
        } catch {}
      },
      n = a => {
        (a.key === tD || a.key === null) && t();
      };
    t(), window.addEventListener("storage", n), window.addEventListener(cw, t);
    const r = window.setInterval(t, 12e4);
    return () => {
      window.removeEventListener("storage", n), window.removeEventListener(cw, t), window.clearInterval(r);
    };
  }, [e]);
}

const i_t = "jiubanbn-codex-create-gen-image",
  Fui = async e => {
    const {
      listen: t
    } = await Ie(async () => {
      const {
        listen: n
      } = await Promise.resolve().then(() => KKe);
      return {
        listen: n
      };
    }, void 0, import.meta.url);
    return t(i_t, n => e(n.payload));
  };

function zui(e, t = Fui) {
  const n = g.useRef(e);
  g.useLayoutEffect(() => {
    n.current = e;
  }, [e]);
  const r = !!window.__TAURI__;
  g.useEffect(() => {
    let a = !1,
      i;
    const o = s => {
      !a && s && n.current(s);
    };
    if (r) t(o).then(s => {
      a ? s() : i = s;
    }).catch(() => {});else {
      const s = l => o(l.detail);
      window.addEventListener(i_t, s), i = () => window.removeEventListener(i_t, s);
    }
    return () => {
      a = !0, i == null || i();
    };
  }, [r, t]);
}

function vot(e, t, n, r = !0) {
  const a = g.useRef(null);
  g.useEffect(() => () => {
    var i;
    (i = a.current) == null || i.call(a), a.current = null;
  }, []), g.useEffect(() => {
    if (!r) {
      a.current = null;
      return;
    }
    const i = () => {
      try {
        localStorage.setItem(e, JSON.stringify(t));
      } catch {}
    };
    a.current = i;
    const o = window.setTimeout(() => {
      i(), a.current = null;
    }, n);
    return () => window.clearTimeout(o);
  }, [e, t, n, r]);
}

function Uui(e, t, n, r) {
  const a = V4e.DEBOUNCE_DELAY.CHARACTER_SAVE;
  vot(Zi.CHARACTERS, e, a, r), vot(Zi.KLING_SUBJECTS, t, a), vot(Zi.RH_APP_LIBRARY, n, a);
}

const cP = new Map(),
  $ui = 8;

function Gui() {
  return [...cP.values()].map(e => [...e.baselineNodes.values()]);
}

function Jsr(e) {
  return {
    ...e,
    settings: e.settings ? {
      ...e.settings
    } : e.settings,
    previewMjImages: e.previewMjImages ? [...e.previewMjImages] : e.previewMjImages,
    previewMjVideos: e.previewMjVideos ? [...e.previewMjVideos] : e.previewMjVideos,
    frames: e.frames ? e.frames.map(t => ({
      ...t
    })) : e.frames
  };
}

function Zsr(e) {
  return {
    ...e,
    fromGroupNodeIds: e.fromGroupNodeIds ? [...e.fromGroupNodeIds] : void 0
  };
}

function vsn(e) {
  return e ? JSON.stringify({
    id: e.id,
    from: e.from,
    to: e.to,
    inputType: e.inputType,
    referenceRole: e.referenceRole,
    fromGroupId: e.fromGroupId,
    fromGroupNodeIds: e.fromGroupNodeIds
  }) : "";
}

function Vui() {
  for (; cP.size > $ui;) {
    const e = cP.keys().next().value;
    if (!e) break;
    cP.delete(e);
  }
}

function elr(e, t, n, r, a = Date.now()) {
  !e || cP.has(e) || (cP.set(e, {
    runId: e,
    baselineNodes: new Map(t.map(i => [i.id, Jsr(i)])),
    baselineConnections: new Map(n.map(i => [i.id, Zsr(i)])),
    affectedNodeIds: new Set(),
    affectedConnectionIds: new Set(),
    latestRevision: r,
    createdAt: a
  }), Vui());
}

function Hui(e) {
  elr(e.runId, e.beforeNodes, e.beforeConnections, e.afterRevision);
  const t = cP.get(e.runId),
    n = new Map(e.beforeNodes.map(o => [o.id, o])),
    r = new Map(e.afterNodes.map(o => [o.id, o]));
  for (const o of new Set([...n.keys(), ...r.keys()])) n.get(o) !== r.get(o) && t.affectedNodeIds.add(o);
  const a = new Map(e.beforeConnections.map(o => [o.id, o])),
    i = new Map(e.afterConnections.map(o => [o.id, o]));
  for (const o of new Set([...a.keys(), ...i.keys()])) {
    const s = a.get(o),
      l = i.get(o);
    vsn(s) !== vsn(l) && (t.affectedConnectionIds.add(o), s && (t.affectedNodeIds.add(s.from), t.affectedNodeIds.add(s.to)), l && (t.affectedNodeIds.add(l.from), t.affectedNodeIds.add(l.to)));
  }
  return t.latestRevision = Math.max(t.latestRevision, e.afterRevision), {
    affectedNodeIds: [...t.affectedNodeIds],
    affectedConnectionIds: [...t.affectedConnectionIds]
  };
}

function Wui(e) {
  const t = cP.get(e);
  return !!(t && (t.affectedNodeIds.size > 0 || t.affectedConnectionIds.size > 0));
}

function qui(e) {
  const t = cP.get(e.runId);
  if (!t || t.affectedNodeIds.size === 0 && t.affectedConnectionIds.size === 0) return {
    ok: !1,
    reason: "missing_snapshot",
    message: "这次生产没有可恢复的画布快照。"
  };
  const n = e.now ?? Date.now(),
    r = Number(e.expectedRevision);
  if (Number.isFinite(r) && e.currentRevision > r && (!t.forceConfirmUntil || t.forceConfirmUntil < n)) return t.forceConfirmUntil = n + 8e3, {
    ok: !1,
    reason: "canvas_changed",
    message: "生产结束后画布又发生了变化。为防止覆盖新修改，请在 8 秒内再次点击撤销确认。"
  };
  const i = new Map(e.currentNodes.map(h => [h.id, h])),
    o = [],
    s = [];
  for (const h of t.affectedNodeIds) {
    const p = t.baselineNodes.get(h);
    p ? (i.set(h, Jsr(p)), o.push(h)) : i.delete(h) && s.push(h);
  }
  const l = new Map(e.currentConnections.map(h => [h.id, h])),
    d = [],
    u = [];
  for (const h of t.affectedConnectionIds) {
    const p = t.baselineConnections.get(h);
    p ? (l.set(h, Zsr(p)), d.push(h)) : l.delete(h) && u.push(h);
  }
  for (const [h, p] of l) (s.includes(p.from) || s.includes(p.to)) && (l.delete(h), u.includes(h) || u.push(h));
  return cP.delete(e.runId), {
    ok: !0,
    nodes: [...i.values()],
    connections: [...l.values()],
    restoredNodeIds: o,
    removedNodeIds: s,
    restoredConnectionIds: d,
    removedConnectionIds: u
  };
}

function Kui(e) {
  const t = new Set(),
    n = new WeakSet(),
    r = [e];
  for (; r.length;) {
    const a = r.pop();
    if (typeof a == "string") {
      a.startsWith("blob:") && t.add(a);
      continue;
    }
    if (!(!a || typeof a != "object" || n.has(a))) if (n.add(a), a instanceof Map) for (const [i, o] of a) r.push(i, o);else if (a instanceof Set) for (const i of a) r.push(i);else for (const i of Object.values(a)) r.push(i);
  }
  return t;
}

function Qui(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
    const n = window;
    n.__NODE_COUNT__ = e.nodes.length, n.__CONNECTION_COUNT__ = e.connections.length;
  }), g.useLayoutEffect(() => {
    const n = window,
      r = () => {
        const {
          readEditLayerHistory: i,
          ...o
        } = t.current;
        return {
          ...o,
          editLayerHistory: (i == null ? void 0 : i()) ?? [],
          productionUndo: Gui()
        };
      },
      a = () => Kui(r());
    return n.__getCanvasMemoryRoots = r, n.__getCanvasReferencedBlobUrls = a, () => {
      n.__getCanvasMemoryRoots === r && (delete n.__getCanvasMemoryRoots, n.__getCanvasReferencedBlobUrls === a && delete n.__getCanvasReferencedBlobUrls, delete n.__NODE_COUNT__, delete n.__CONNECTION_COUNT__);
    };
  }, []);
}

function zCe(e) {
  const t = g.useMemo(() => ({
    subscribe: n => (e == null ? void 0 : e.subscribe(n)) || (() => {}),
    read: () => e == null ? void 0 : e.current().token
  }), [e]);
  return g.useSyncExternalStore(t.subscribe, t.read, t.read);
}

const uMe = e => (e == null ? void 0 : e.type) === "director-3d",
  wot = () => {
    yP(), XC(!1), xv(!1);
  };

function Yui({
  document: e,
  nodes: t,
  nodesRef: n,
  setNodes: r,
  nodeIdRef: a,
  justClosedRef: i,
  cancelFocus: o,
  viewportSize: s,
  commitView: l
}) {
  var E, M;
  const [d, u] = g.useState(!1),
    [h, p] = g.useState(null),
    m = g.useRef(new Map()),
    [f, y] = g.useState({}),
    b = g.useRef(f),
    v = zCe(e),
    _ = g.useMemo(() => e.lease(), [e, v, h, d]);
  g.useLayoutEffect(() => {
    const T = () => {
        b.current = {}, m.current.clear(), a.current = null, i.current = !1;
      },
      P = e.subscribe(() => {
        T(), p(null), u(!1);
      });
    return () => {
      P(), T();
    };
  }, [e, a, i]);
  const w = g.useMemo(() => {
      var P;
      if (!h) return null;
      const T = t.find(R => R.id === h && uMe(R));
      return T ? m.current.get(h) ?? Vvt((P = T.settings) == null ? void 0 : P[Vve]) : null;
    }, [h, t, d, v]),
    k = g.useCallback(T => {
      b.current !== f || !h || !d || a.current !== h || !_.isCurrent() || !n.current.some(P => P.id === h && uMe(P)) || (m.current.set(h, T), r(P => _.isCurrent() ? P.map(R => R.id === h && uMe(R) ? {
        ...R,
        settings: {
          ...R.settings,
          [Vve]: T
        }
      } : R) : P));
    }, [h, d, _, a, n, r, f]),
    A = g.useCallback(T => {
      var j;
      const P = n.current.find(B => B.id === T && uMe(B));
      if (!P) return !1;
      b.current = {}, y(b.current), o(), wot();
      const R = Vvt((j = P.settings) == null ? void 0 : j[Vve]);
      return R && m.current.set(T, R), a.current = T, p(T), u(!0), !0;
    }, [o, n, a]);
  g.useLayoutEffect(() => {
    const T = P => {
      var F;
      const R = String(((F = P.detail) == null ? void 0 : F.nodeId) || "").trim();
      if (!R || A(R)) return;
      let j = 0;
      const B = window.setInterval(() => {
        j += 1, (A(R) || j >= 12) && window.clearInterval(B);
      }, 50);
    };
    return window.addEventListener("qiaodoumayi-open-director-3d", T), () => window.removeEventListener("qiaodoumayi-open-director-3d", T);
  }, [A]);
  const S = g.useCallback(() => {
      b.current = {}, y(b.current), o(), wot(), a.current = null, p(null), u(!0);
    }, [o, a]),
    C = g.useCallback(() => {
      b.current = {};
      const T = n.current.find(P => P.id === a.current);
      T && l(hY(T.x + T.width / 2, T.y + T.height / 2, .56, s)), wot(), i.current = !0, u(!1), a.current = null, p(null);
    }, [n, a, l, s, i]),
    I = !!((M = (E = t.find(T => T.id === h)) == null ? void 0 : E.settings) != null && M.smartBuild) && !w;
  return {
    director3DOpen: d,
    setDirector3DOpen: u,
    director3DInitialScene: w,
    director3DSmartBuild: I,
    handleDirector3DSceneChange: k,
    openDirector3DForNode: A,
    openDirector3DDetached: S,
    closeDirector3D: C
  };
}

let J7e = !1;

const o_t = new Set();

function Xui() {
  o_t.forEach(e => e());
}

function tlr(e) {
  return o_t.add(e), () => {
    o_t.delete(e);
  };
}

function mUe() {
  return J7e;
}

function fUe(e) {
  const t = typeof e == "function" ? e(J7e) : e;
  t !== J7e && (J7e = t, t ? Ie(async () => {
    const {
      markPanelHydrateGrace: n,
      PANEL_OPEN_GRACE_MS: r
    } = await Promise.resolve().then(() => aD);
    return {
      markPanelHydrateGrace: n,
      PANEL_OPEN_GRACE_MS: r
    };
  }, void 0, import.meta.url).then(({
    markPanelHydrateGrace: n,
    PANEL_OPEN_GRACE_MS: r
  }) => {
    n(r);
  }).catch(() => {}) : Ie(async () => {
    const {
      markPanelHydrateGrace: n,
      PANEL_CLOSE_GRACE_MS: r
    } = await Promise.resolve().then(() => aD);
    return {
      markPanelHydrateGrace: n,
      PANEL_CLOSE_GRACE_MS: r
    };
  }, void 0, import.meta.url).then(({
    markPanelHydrateGrace: n,
    PANEL_CLOSE_GRACE_MS: r
  }) => {
    n(r);
  }).catch(() => {}), Xui());
}

function Jui(e) {
  return tlr(e);
}

function Zui() {
  return g.useSyncExternalStore(tlr, mUe, mUe);
}

function ehi(e, t) {
  g.useEffect(() => {
    let n;
    const r = () => {
      e || mUe() ? n || (n = t()) : (n == null || n(), n = void 0);
    };
    r();
    const a = Jui(r);
    return () => {
      a(), n == null || n();
    };
  }, [e, t]);
}

function thi({
  document: e,
  executeGroup: t,
  acquireVideoFreeze: n
}) {
  const r = g.useRef(new Set());
  return g.useLayoutEffect(() => {
    const a = () => {
        for (const o of r.current) o.timer !== void 0 && clearTimeout(o.timer), o.release();
        r.current.clear();
      },
      i = e.subscribe(a);
    return () => {
      i(), a();
    };
  }, [e]), g.useCallback(async a => {
    const i = {
      release: n()
    };
    r.current.add(i);
    try {
      await t(a);
    } finally {
      r.current.has(i) && (i.timer = setTimeout(() => {
        r.current.delete(i), i.release();
      }, 500));
    }
  }, [t, n]);
}

function nhi({
  nodes: e,
  groups: t,
  setGroups: n
}) {
  const r = g.useCallback(i => {
      const o = Date.now();
      n(s => s.map(l => {
        if (l.id !== i || l.frameX != null && l.frameY != null && l.frameWidth != null && l.frameHeight != null && l.frameWidth > 0 && l.frameHeight > 0) return l;
        const u = Gk(l, e);
        return {
          ...l,
          frameX: u.x,
          frameY: u.y,
          frameWidth: u.width,
          frameHeight: u.height,
          updatedAt: o
        };
      }));
    }, [e, n]),
    a = g.useCallback((i, o) => {
      for (const s of t) {
        if (s.collapsed) continue;
        const l = Gk(s, e);
        if (i < l.x || i > l.x + l.width || o < l.y || o > l.y + l.height) continue;
        if (!e.some(u => {
          if (!s.nodeIds.includes(u.id)) return !1;
          const h = u.width ?? 260,
            p = u.height ?? 200;
          return i >= u.x && i <= u.x + h && o >= u.y && o <= u.y + p;
        })) return s.id;
      }
      return null;
    }, [t, e]);
  return {
    freezeGroupFrameIfNeeded: r,
    findGroupAtEmptyPoint: a
  };
}

const wsn = 0;

function nlr(e) {
  return {
    x: e.x + wsn,
    y: e.y + wsn,
    centerX: e.x + e.width / 2
  };
}

function PBt(e) {
  return [...e].sort((t, n) => Math.abs(t.y - n.y) > 24 ? t.y - n.y : t.x - n.x);
}

const rlr = 42,
  alr = 62;

function rhi(e, t, n) {
  const r = e.filter(a => t.has(a.id));
  if (r.length === 0) return null;
  if (n) {
    const a = r.find(i => i.id === n);
    if (a) return a;
  }
  return r.reduce((a, i) => i.y < a.y || i.y === a.y && i.x < a.x ? i : a, r[0]);
}

function ahi(e, t, n, r) {
  if (e.filter(i => t.has(i.id)).length < 2) return e;
  if (n === "distribute-horizontal-top" || n === "distribute-horizontal-center-y" || n === "distribute-horizontal-bottom") {
    const i = _ot(e, t, "distribute-horizontal");
    return xot(i, t, n === "distribute-horizontal-top" ? "align-top" : n === "distribute-horizontal-bottom" ? "align-bottom" : "align-center-y", r);
  }
  if (n === "distribute-vertical-left" || n === "distribute-vertical-center-x" || n === "distribute-vertical-right") {
    const i = _ot(e, t, "distribute-vertical");
    return xot(i, t, n === "distribute-vertical-left" ? "align-left" : n === "distribute-vertical-right" ? "align-right" : "align-center-x", r);
  }
  return n === "distribute-horizontal" || n === "distribute-vertical" ? _ot(e, t, n) : xot(e, t, n, r);
}

function xot(e, t, n, r) {
  const a = e.filter(m => t.has(m.id));
  if (a.length < 2) return e;
  rhi(e, t, r);
  const i = Math.min(...a.map(m => m.x)),
    o = Math.max(...a.map(m => m.x + m.width)),
    s = Math.min(...a.map(m => m.y)),
    l = Math.max(...a.map(m => m.y + m.height)),
    d = (i + o) / 2,
    u = (s + l) / 2,
    h = Math.max(...a.map(m => m.width)),
    p = Math.max(...a.map(m => m.height));
  return e.map(m => {
    if (!t.has(m.id)) return m;
    switch (n) {
      case "align-left":
        return {
          ...m,
          x: i
        };
      case "align-right":
        return {
          ...m,
          x: o - m.width
        };
      case "align-top":
        return {
          ...m,
          y: s
        };
      case "align-bottom":
        return {
          ...m,
          y: l - m.height
        };
      case "align-center-x":
        return {
          ...m,
          x: Math.round(d - m.width / 2)
        };
      case "align-center-y":
        return {
          ...m,
          y: Math.round(u - m.height / 2)
        };
      case "match-width":
        {
          const f = Math.max(0, h),
            y = m.x + m.width / 2,
            b = Math.round(y - f / 2);
          return {
            ...m,
            x: b,
            width: f
          };
        }
      case "match-height":
        {
          const f = Math.max(0, p),
            y = m.y + m.height / 2,
            b = Math.round(y - f / 2);
          return {
            ...m,
            y: b,
            height: f
          };
        }
      default:
        return m;
    }
  });
}

function _ot(e, t, n) {
  const r = e.filter(d => t.has(d.id));
  if (r.length <= 2) return e;
  if (n === "distribute-horizontal") {
    const d = [...r].sort((f, y) => f.x - y.x),
      u = d[0],
      h = u.y;
    let p = u.x;
    const m = new Map();
    return d.forEach(f => {
      m.set(f.id, {
        x: Math.round(p),
        y: h
      }), p += f.width + rlr;
    }), e.map(f => {
      const y = m.get(f.id);
      return y ? {
        ...f,
        x: y.x,
        y: y.y
      } : f;
    });
  }
  const a = [...r].sort((d, u) => d.y - u.y),
    i = a[0],
    o = i.x + i.width / 2;
  let s = i.y;
  const l = new Map();
  return a.forEach(d => {
    const u = o - d.width / 2;
    l.set(d.id, {
      x: Math.round(u),
      y: Math.round(s)
    }), s += d.height + alr;
  }), e.map(d => {
    const u = l.get(d.id);
    return u ? {
      ...d,
      x: u.x,
      y: u.y
    } : d;
  });
}

function xsn(e, t, n, r = rlr) {
  const a = PBt(e.filter(l => t.has(l.id)));
  if (a.length < 2) return e;
  let i = n.x;
  const o = n.y,
    s = new Map();
  return a.forEach(l => {
    s.set(l.id, {
      x: Math.round(i),
      y: o
    }), i += l.width + r;
  }), e.map(l => {
    const d = s.get(l.id);
    return d ? {
      ...l,
      x: d.x,
      y: d.y
    } : l;
  });
}

function _sn(e, t, n, r = alr) {
  const a = PBt(e.filter(s => t.has(s.id)));
  if (a.length < 2) return e;
  let i = n.y;
  const o = new Map();
  return a.forEach(s => {
    const l = n.centerX - s.width / 2;
    o.set(s.id, {
      x: Math.round(l),
      y: Math.round(i)
    }), i += s.height + r;
  }), e.map(s => {
    const l = o.get(s.id);
    return l ? {
      ...s,
      x: l.x,
      y: l.y
    } : s;
  });
}

function ksn(e, t, n, r = 42) {
  const a = PBt(e.filter(b => t.has(b.id)));
  if (a.length < 2) return e;
  const i = Math.ceil(Math.sqrt(a.length)),
    o = Math.ceil(a.length / i),
    s = Array.from({
      length: i
    }, () => 0),
    l = Array.from({
      length: o
    }, () => 0);
  a.forEach((b, v) => {
    const _ = Math.floor(v / i),
      w = v % i;
    s[w] = Math.max(s[w], b.width), l[_] = Math.max(l[_], b.height);
  });
  const d = Math.min(...a.map(b => b.x)),
    u = Math.min(...a.map(b => b.y)),
    h = (n == null ? void 0 : n.x) ?? d,
    p = (n == null ? void 0 : n.y) ?? u,
    m = [h];
  for (let b = 1; b < i; b++) m[b] = m[b - 1] + s[b - 1] + r;
  const f = [p];
  for (let b = 1; b < o; b++) f[b] = f[b - 1] + l[b - 1] + r;
  const y = new Map();
  return a.forEach((b, v) => {
    const _ = Math.floor(v / i),
      w = v % i;
    y.set(b.id, {
      x: Math.round(m[w]),
      y: Math.round(f[_])
    });
  }), e.map(b => {
    const v = y.get(b.id);
    return v ? {
      ...b,
      x: v.x,
      y: v.y
    } : b;
  });
}

function ihi(e) {
  const {
      nodes: t,
      groups: n,
      selectedNodeId: r,
      selectedNodeIds: a,
      setNodes: i
    } = e,
    o = g.useCallback(d => {
      const u = new Set(a);
      r && u.add(r), !(u.size < 2) && i(h => ahi(h, u, d, r ?? void 0));
    }, [r, a, i]),
    s = g.useCallback((d, u) => {
      a.size < 2 || i(h => d === "grid" ? ksn(h, a, u) : d === "horizontal" ? xsn(h, a, u) : _sn(h, a, u));
    }, [a, i]),
    l = g.useCallback((d, u) => {
      const h = n.find(y => y.id === d);
      if (!h || h.nodeIds.length < 2) return;
      const p = new Set(h.nodeIds),
        m = Gk(h, t),
        f = nlr(m);
      i(y => u === "grid" ? ksn(y, p, f) : u === "horizontal" ? xsn(y, p, f) : _sn(y, p, f));
    }, [n, t, i]);
  return {
    handleAlign: o,
    handleArrangeSelected: s,
    handleArrangeGroup: l
  };
}

let s_t = null;

const l_t = new Set();

function ohi() {
  l_t.forEach(e => e());
}

function shi(e) {
  return l_t.add(e), () => {
    l_t.delete(e);
  };
}

function Asn() {
  return s_t;
}

function FQ(e) {
  e !== s_t && (s_t = e, ohi());
}

function RBt() {
  return g.useSyncExternalStore(shi, Asn, Asn);
}

function lhi({
  groupsRef: e,
  nodesRef: t,
  clientToCanvasWorld: n
}) {
  g.useEffect(() => {
    const r = () => {
        if (Yi() || jl() || Rl() || Av() || wae()) return !0;
        if (typeof document > "u") return !1;
        const u = document.body;
        return u.classList.contains("canvas-release-settle") || u.classList.contains("canvas-panning") || u.classList.contains("canvas-interacting");
      },
      a = (u, h) => {
        const p = n(u, h);
        if (!p) {
          FQ(null);
          return;
        }
        const m = e.current,
          f = t.current,
          y = 88,
          b = 44;
        for (let _ = m.length - 1; _ >= 0; _--) {
          const w = m[_];
          if (!w.collapsed || w.stackMode !== "card" || w.collapsedX == null || w.collapsedY == null) continue;
          const {
              halfWidth: k,
              halfHeight: A
            } = Kue(w, f),
            S = w.collapsedX - k,
            C = w.collapsedY - A,
            I = w.collapsedX + k,
            E = w.collapsedY + A,
            M = w.collapsedY,
            T = p.x >= S && p.x <= I && p.y >= C && p.y <= E,
            P = p.x >= I && p.x <= I + y && p.y >= M - b && p.y <= M + b;
          if (T || P) {
            FQ(w.id);
            return;
          }
        }
        const v = aDr(p.x, p.y, m, f);
        FQ(v);
      };
    let i = -1,
      o = -1,
      s = 0;
    const l = () => {
        if (s = 0, r()) {
          i = -1, o = -1;
          return;
        }
        if (i < 0) return;
        const u = i,
          h = o;
        i = -1, o = -1, a(u, h);
      },
      d = u => {
        if (r()) {
          s !== 0 && (cancelAnimationFrame(s), s = 0), i = -1, o = -1;
          return;
        }
        i = u.clientX, o = u.clientY, s === 0 && (s = requestAnimationFrame(l));
      };
    return window.addEventListener("mousemove", d, {
      passive: !0
    }), () => {
      window.removeEventListener("mousemove", d), s !== 0 && cancelAnimationFrame(s);
    };
  }, [n, e, t]);
}

function chi(e, t, n, r, a) {
  if (!n.length) return {
    kind: "none"
  };
  for (let i = e.length - 1; i >= 0; i--) {
    const o = e[i];
    if (!o.collapsed || o.collapsedX == null || o.collapsedY == null) continue;
    const {
      halfWidth: s,
      halfHeight: l
    } = Kue(o, t);
    if (!(r < o.collapsedX - s || r > o.collapsedX + s || a < o.collapsedY - l || a > o.collapsedY + l)) return {
      kind: "collect",
      groupId: o.id,
      nodeIds: n.filter(d => !o.nodeIds.includes(d))
    };
  }
  return {
    kind: "sync"
  };
}

function dhi({
  groups: e,
  nodes: t,
  addNodesToGroup: n,
  syncGroupMembershipByFrame: r
}) {
  return g.useCallback((a, i, o, s) => {
    const l = chi(e, t, o, a, i);
    l.kind === "collect" && l.nodeIds.length && n(l.groupId, l.nodeIds), l.kind === "sync" && r(s);
  }, [e, t, n, r]);
}

function uhi({
  nodes: e,
  groupsRef: t,
  selectedGroupIdRef: n,
  isResizingGroupFrameRef: r,
  setGroups: a,
  setSelectedGroupId: i,
  freezeGroupFrameIfNeeded: o,
  document: s
}) {
  const l = g.useRef(0),
    d = g.useRef(null),
    u = g.useRef(null);
  g.useLayoutEffect(() => {
    const f = () => {
        l.current += 1, d.current !== null && cancelAnimationFrame(d.current), u.current !== null && clearTimeout(u.current), d.current = u.current = null, r.current = !1;
      },
      y = s.subscribe(f);
    return () => {
      y(), f();
    };
  }, [s, r]);
  const h = g.useCallback((f, y) => {
      const b = Date.now();
      a(v => v.map(_ => {
        if (_.id !== f) return _;
        const w = {
            ..._,
            frameX: y.x,
            frameY: y.y,
            frameWidth: y.width,
            frameHeight: y.height,
            updatedAt: b
          },
          k = Wae(w, e),
          A = [..._.nodeIds.filter(S => k.includes(S)), ...k.filter(S => !_.nodeIds.includes(S))];
        return {
          ...w,
          nodeIds: A
        };
      }));
    }, [a, e]),
    p = g.useCallback(f => {
      l.current += 1, r.current = !0, o(f);
    }, [o, r]),
    m = g.useCallback(() => {
      const f = n.current,
        y = l.current;
      d.current !== null && cancelAnimationFrame(d.current), d.current = requestAnimationFrame(() => {
        if (d.current = null, l.current !== y) return;
        const b = t.current.filter(v => v.collapsed || v.nodeIds.length > 0);
        b.length !== t.current.length && a(b), f && !b.some(v => v.id === f) && i(null);
      }), u.current !== null && clearTimeout(u.current), u.current = setTimeout(() => {
        u.current = null, l.current === y && (r.current = !1);
      }, 50);
    }, [a, i, t, n, r]);
  return {
    handleGroupResize: h,
    handleGroupResizeStart: p,
    handleGroupResizeEnd: m
  };
}

function hhi({
  groups: e,
  nodesRef: t,
  viewRef: n,
  viewportSize: r,
  visibleViewport: a,
  focusAnimation: i,
  setSelectedGroupId: o,
  setSelectedNodeId: s,
  setSelectedNodeIds: l,
  setFocusRippleNodeId: d,
  setFocusRippleNonce: u,
  locateAnimationMaxNodes: h = TEt
}) {
  const p = g.useCallback(f => {
    const y = a && a.width > 0 ? a : r,
      b = e.find(A => A.collapsed && A.nodeIds.includes(f.id));
    let v, _;
    b && b.collapsedX != null && b.collapsedY != null ? (v = b.collapsedX, _ = b.collapsedY) : (v = f.x + (f.width || 320) / 2, _ = f.y + (f.height || 200) / 2);
    const w = Math.max(n.current.zoom, .3),
      k = hY(v, _, w, y);
    b ? (o(b.id), s(null), l(new Set())) : (s(f.id), l(new Set([f.id])), d(f.id), u(A => A + 1)), i.start(k, Uet(t.current.length, h));
  }, [r, a, i, t, n, s, l, o, d, u, e, h]);
  g.useEffect(() => {
    const f = y => {
      const b = y.detail,
        v = [...((b == null ? void 0 : b.nodeIds) || []).map(S => String(S || "").trim()).filter(Boolean), String((b == null ? void 0 : b.nodeId) || "").trim()].filter(Boolean),
        w = [...new Set(v)].map(S => t.current.find(C => C.id === S)).filter(S => !!S);
      if (!w.length) return;
      if (w.length === 1) {
        p(w[0]);
        return;
      }
      const k = a && a.width > 0 ? a : r,
        A = f4n(w, k, n.current.zoom);
      if (!A) {
        p(w[w.length - 1]);
        return;
      }
      s(w[w.length - 1].id), l(new Set(w.map(S => S.id))), d(w[w.length - 1].id), u(S => S + 1), i.start(A, Uet(t.current.length, h));
    };
    return window.addEventListener("productionNodeFocusRequested", f), () => window.removeEventListener("productionNodeFocusRequested", f);
  }, [p, i, h, t, d, u, s, l, n, r, a]);
  const m = g.useCallback(f => {
    let y, b;
    if (f.collapsed && f.collapsedX != null && f.collapsedY != null) y = f.collapsedX, b = f.collapsedY;else {
      const w = Gk(f, t.current);
      if (w.width <= 0 || w.height <= 0) return;
      y = w.x + w.width / 2, b = w.y + w.height / 2;
    }
    const v = Math.max(n.current.zoom, .3),
      _ = hY(y, b, v, a && a.width > 0 ? a : r);
    o(f.id), s(null), l(new Set()), i.start(_, Uet(t.current.length, h));
  }, [r, a, i, t, n, o, s, l, h]);
  return {
    centerViewToNode: p,
    centerViewToGroup: m
  };
}

const eoe = new Set(),
  c_t = new Set(),
  Z7e = new Map();

let ilr = new Set();

function phi() {
  ilr = new Set(eoe);
}

function mhi() {
  c_t.forEach(e => e());
}

function fhi(e) {
  var t;
  (t = Z7e.get(e)) == null || t.forEach(n => n()), mhi();
}

function ghi(e) {
  return c_t.add(e), () => {
    c_t.delete(e);
  };
}

function yhi(e, t) {
  let n = Z7e.get(e);
  return n || (n = new Set(), Z7e.set(e, n)), n.add(t), () => {
    n.delete(t), n.size === 0 && Z7e.delete(e);
  };
}

function d_t(e, t) {
  if (typeof document > "u") return;
  const n = document.querySelector(`.node-wrapper[data-node-id="${CSS.escape(e)}"]`);
  n instanceof HTMLElement && (t ? n.dataset.genPromptPanelOpen = "true" : delete n.dataset.genPromptPanelOpen);
}

function N7(e) {
  return eoe.has(e);
}

function Ssn() {
  return ilr;
}

function Dd(e, t) {
  const n = eoe.has(e);
  if (t === n) {
    t && d_t(e, !0);
    return;
  }
  t ? eoe.add(e) : eoe.delete(e), phi(), d_t(e, t), fhi(e);
}

function bhi(e) {
  return g.useSyncExternalStore(t => yhi(e, t), () => eoe.has(e), () => !1);
}

function vhi() {
  return g.useSyncExternalStore(ghi, Ssn, Ssn);
}

function whi() {
  const [e, t] = g.useState(() => new Set()),
    n = g.useCallback((a, i) => {
      t(o => {
        const s = o.has(a);
        if (i ? s : !s) return o;
        const l = new Set(o);
        return i ? l.add(a) : l.delete(a), l;
      });
    }, []),
    r = g.useCallback((a, i) => {
      Dd(a, i);
    }, []);
  return {
    genInlineDirectorUiNodeIds: e,
    registerGenInlineDirectorUi: n,
    registerGenPromptPanelUi: r
  };
}

function xhi() {
  let e = {
    characters: !1,
    kling: !1,
    rh: !1
  };
  const t = new Set();
  let n = 0,
    r = !1;
  const a = () => {
    n || !r || (r = !1, t.forEach(i => i()));
  };
  return {
    get: i => e[i],
    occupied: () => e.characters || e.kling || e.rh,
    subscribe(i) {
      return t.add(i), () => {
        t.delete(i);
      };
    },
    set(i, o) {
      const s = typeof o == "function" ? o(e[i]) : o;
      s !== e[i] && (e = {
        ...e,
        [i]: s
      }, r = !0, a());
    },
    batch(i) {
      n++;
      try {
        i();
      } finally {
        n--, a();
      }
    }
  };
}

const p$ = xhi(),
  u_t = e => p$.set("kling", e),
  olr = e => p$.set("rh", e),
  _hi = () => u_t(!1),
  khi = () => olr(!1);

function Dke(e) {
  const t = g.useCallback(() => p$.get(e), [e]);
  return g.useSyncExternalStore(p$.subscribe, t, t);
}

function Ahi(e) {
  const t = g.useCallback(() => e || p$.occupied(), [e]);
  return g.useSyncExternalStore(p$.subscribe, t, t);
}

const h_t = e => p$.set("characters", e),
  Shi = () => h_t(!1),
  slr = () => Dke("characters"),
  llr = "";

function Ihi(e) {
  return JSON.stringify([e.id, e.from, e.to, e.inputType ?? "default", e.referenceRole ?? "", e.fromGroupId ?? "", e.fromGroupNodeIds ?? []]);
}

function Chi(e) {
  const t = new Map();
  for (const r of e) {
    const a = Ihi(r),
      i = t.get(r.from);
    if (i ? i.push(a) : t.set(r.from, [a]), r.to !== r.from) {
      const o = t.get(r.to);
      o ? o.push(a) : t.set(r.to, [a]);
    }
  }
  const n = new Map();
  return t.forEach((r, a) => {
    n.set(a, r.join(""));
  }), n;
}

const Isn = new WeakMap(),
  Csn = new WeakMap();

function clr(e) {
  const t = Csn.get(e);
  if (t !== void 0) return t;
  const n = [];
  for (const a of e) {
    let i = Isn.get(a);
    i === void 0 && (i = `${a.id}:${a.x},${a.y},${a.width ?? 260},${a.height ?? 200}`, Isn.set(a, i)), n.push(i);
  }
  const r = n.join("|");
  return Csn.set(e, r), r;
}

function Ehi({
  visibleNodeIds: e,
  nodes: t,
  preloadMarginScreens: n = 1.75
}) {
  const r = g.useRef(!1);
  g.useEffect(() => {
    if (E0() && !r.current) {
      const a = (() => {
        const i = window.navigator.hardwareConcurrency || 4;
        return i >= 8 ? 8 : i >= 4 ? 4 : 2;
      })();
      D$n((i, o) => xHe(i, {
        assetId: o == null ? void 0 : o.assetId,
        skipPersist: o == null ? void 0 : o.skipPersist
      }), a), r.current = !0;
    }
  }, []), g.useEffect(() => {
    E0() && O$n(e);
  }, [e]), g.useEffect(() => {
    if (!E0()) return;
    const a = () => B$n(Yi()),
      i = [$v(a), D$(a), L$(a)];
    return () => i.forEach(o => o());
  }, []);
}

function dlr(e, t) {
  const n = e.settings || {};
  return n.editImageToolActive === !0 || n.eraserToolActive === !0 || n.gradeToolActive === !0 || n.splitToolActive === !0 || n.expandToolActive === !0 || n.textEditToolActive === !0 || n.moveObjectToolActive === !0 || n.rembgToolActive === !0 || n.previewPuzzleChromeOpen === !0 || n.videoTimelineWorkspaceOpen === !0 || n._expandSourceHidden === !0 || e._expandPending === !0 || n._expandPending === !0 || t === e.id;
}

const p_t = new Set(),
  x1e = new Set();

let ulr = !0;

function Thi(e) {
  ulr = e;
}

const Mhi = 400,
  Phi = 560,
  Rhi = 560;

function MJ(e, t = !1) {
  const n = e.type;
  if (n !== "custom-agent" && n !== "text-node") return !1;
  if (t || e.isGenerating === !0) return !0;
  const r = e.settings;
  return n === "custom-agent" && (r == null ? void 0 : r._agentRunning) === !0 || n === "text-node" && (r == null ? void 0 : r.textNodeIsAnalyzing) === !0;
}

function Nhi(e, t) {
  const n = e.width ?? 260,
    r = e.height ?? 200,
    a = e.type === "custom-agent" ? Rhi : 0;
  return e.x + n >= t.left - a && e.x <= t.right + a && e.y + r >= t.top - a && e.y <= t.bottom + a;
}

function hlr(e) {
  for (const t of e) p_t.add(t);
}

function jhi(e) {
  const t = e.sticky ? Phi : Mhi;
  return e.screenX + e.screenW >= -t && e.screenX <= e.viewportW + t && e.screenY + e.screenH >= -t && e.screenY <= e.viewportH + t;
}

function Dhi(e, t) {
  const n = x1e.has(e),
    r = jhi({
      ...t,
      sticky: n
    });
  return r ? x1e.add(e) : x1e.delete(e), r;
}

function Lhi(e) {
  return !(!ulr || !e.hasStableMediaContent || !e.shellCandidate || e.inView);
}

function Ohi(e) {
  const t = e instanceof Set ? e : new Set(e);
  for (const n of p_t) t.has(n) || p_t.delete(n);
  for (const n of x1e) t.has(n) || x1e.delete(n);
}

function Bhi(e) {
  const t = new Set([...e.selectedNodeIds, ...e.connectingNodeIds, ...(e.selectionDragIds ?? [])]);
  for (const r of [e.selectedNodeId, e.dragNodeId, e.resizingNodeId, e.editingNodeId]) r && t.add(r);
  const n = new Set();
  for (const r of e.nodes) n.add(r.id), dlr(r, e.focusEditActiveSourceNodeId) && t.add(r.id), MJ(r) && t.add(r.id);
  for (const r of t) n.has(r) || t.delete(r);
  for (const r of e.groups) if (!(!r.collapsed || r.stackMode === "card")) for (const a of r.nodeIds) t.delete(a);
  return t;
}

function Fhi(e) {
  var t;
  return !e || !(e.matches("input, textarea") || e.closest('[contenteditable="true"]')) ? null : ((t = e.closest("[data-node-id]")) == null ? void 0 : t.getAttribute("data-node-id")) || null;
}

function zhi(e) {
  const {
      lightboxOpen: t,
      isPanning: n,
      resizingNodeId: r,
      connectingNodeIds: a,
      isDraggingSelectionBoundsRef: i,
      selectedNodeIdsRef: o
    } = e,
    [s, l] = g.useState({
      editingNodeId: null,
      selectionDragIds: new Set()
    });
  return g.useEffect(() => {
    const d = () => {
      if (t) return;
      const m = Fhi(document.activeElement),
        f = new Set(i.current ? o.current : []);
      l(y => y.editingNodeId === m && y.selectionDragIds.size === f.size && [...f].every(b => y.selectionDragIds.has(b)) ? y : {
        editingNodeId: m,
        selectionDragIds: f
      });
    };
    d();
    const u = r ? window.setInterval(d, 160) : null;
    let h = null;
    const p = () => {
      h !== null && window.clearTimeout(h), h = window.setTimeout(d, 100);
    };
    return document.addEventListener("focusin", d), document.addEventListener("focusout", p), document.addEventListener("visibilitychange", d), () => {
      u !== null && window.clearInterval(u), h !== null && window.clearTimeout(h), document.removeEventListener("focusin", d), document.removeEventListener("focusout", p), document.removeEventListener("visibilitychange", d);
    };
  }, [t, n, r, a, i, o, e.isDragging, e.nodes, e.selectedNodeIds]), g.useMemo(() => Bhi({
    ...e,
    ...s
  }), [e.nodes, e.groups, e.selectedNodeId, e.selectedNodeIds, a, e.dragNodeId, r, e.focusEditActiveSourceNodeId, s]);
}

function plr(e, t) {
  if (e.size !== t.size) return t;
  for (const [n, r] of t) if (e.get(n) !== r) return t;
  return e;
}

const NBt = 1.75,
  m_t = 3,
  mlr = 480,
  rE = new Set(),
  Uhi = 512,
  m$ = new Set(),
  dP = [],
  EM = [];

let t7 = 0,
  f_t = 0;

const Lke = new Set(),
  Oke = new Map();

let Uz = null,
  WP = !1,
  uD = !1,
  RS = null,
  qO = null;

function JF(e) {
  return e.trim();
}

function $hi(e) {
  for (rE.delete(e), rE.add(e); rE.size > Uhi;) {
    const t = rE.values().next().value;
    if (t === void 0) break;
    rE.delete(t);
  }
}

function Ghi(e) {
  const t = JF(e);
  return t.length > 0 && rE.has(t);
}

function Vhi() {
  return dP.length > 0 ? !0 : !uD && EM.length > 0;
}

function Hhi() {
  for (; dP.length > 0;) {
    const e = JF(dP.shift() || "");
    if (e && !rE.has(e) && !m$.has(e)) return e;
  }
  if (uD) return null;
  for (; EM.length > 0;) {
    const e = JF(EM.shift() || "");
    if (e && !rE.has(e) && !m$.has(e)) return e;
  }
  return null;
}

function jBt() {
  qO != null && (clearTimeout(qO), qO = null);
}

function PJ(e = "idle") {
  if (!(WP || t7 >= m_t || !Vhi())) {
    if (WDe()) {
      jBt(), qO = setTimeout(() => {
        qO = null, PJ(e);
      }, 320);
      return;
    }
    if (e === "urgent") {
      g_t();
      return;
    }
    qO == null && (qO = setTimeout(() => {
      qO = null, g_t();
    }, 0));
  }
}

function g_t() {
  if (!(WP || t7 >= m_t)) for (; t7 < m_t;) {
    const e = Hhi();
    if (!e) break;
    m$.add(e), t7 += 1;
    const t = new Image(),
      n = f_t;
    Lke.add(t), Oke.set(e, t), t.decoding = "async";
    const r = a => {
      n !== f_t || !Lke.delete(t) || (t.onload = null, t.onerror = null, Oke.delete(e), m$.delete(e), t7 = Math.max(0, t7 - 1), a && $hi(e), PJ(uD ? "urgent" : "idle"));
    };
    t.onload = () => r(!0), t.onerror = () => r(!1), t.src = e;
  }
}

function y_t(e, t) {
  if (!(!e || !/^https?:\/\//i.test(e)) && !(rE.has(e) || m$.has(e))) {
    if (t === "visible") {
      const n = EM.indexOf(e);
      n >= 0 && EM.splice(n, 1), dP.includes(e) || dP.unshift(e);
      return;
    }
    dP.includes(e) || EM.includes(e) || EM.push(e);
  }
}

function Whi(e, t) {
  if (!ua()) return;
  const n = (t == null ? void 0 : t.priority) ?? "preload",
    r = Y5n(e);
  for (const a of r) {
    const i = JF(a);
    Uz == null || Uz.add(i), y_t(i, n);
  }
  WP || PJ(n === "visible" ? "urgent" : "idle");
}

function qhi(e) {
  var t;
  for (const [n, r] of [...Oke]) e.has(n) || (r.onload = null, r.onerror = null, (t = r.removeAttribute) == null || t.call(r, "src"), Lke.delete(r), Oke.delete(n), m$.delete(n), t7 = Math.max(0, t7 - 1));
}

function uJe() {
  Uz && (qhi(Uz), Uz = null);
}

function flr(e) {
  if (dP.length = 0, EM.length = 0, !ua()) return;
  for (const n of e.visible) y_t(JF(n), "visible");
  for (const n of e.preload) y_t(JF(n), "preload");
  const t = new Set();
  for (const n of e.visible) t.add(JF(n));
  for (const n of e.preload) t.add(JF(n));
  Uz = t, WP || uJe(), WP || PJ(dP.length ? "urgent" : "idle");
}

function $re(e) {
  e && (RS && (clearTimeout(RS), RS = null), jBt()), WP !== e && (WP = e, e || (uJe(), PJ(uD ? "urgent" : "idle")));
}

function glr() {
  RS && clearTimeout(RS), uD = !0, WP = !1, uJe(), PJ("urgent"), RS = setTimeout(() => {
    RS = null, uD = !1, PJ("idle");
  }, mlr);
}

function Khi() {
  RS && (clearTimeout(RS), RS = null), uD = !1, WP = !1, uJe(), g_t();
}

function b_t() {
  var e;
  f_t += 1;
  for (const t of Lke) t.onload = null, t.onerror = null, (e = t.removeAttribute) == null || e.call(t, "src");
  Lke.clear(), Oke.clear(), Uz = null, RS && clearTimeout(RS), RS = null, jBt(), WP = !1, uD = !1, dP.length = 0, EM.length = 0, rE.clear(), m$.clear(), t7 = 0;
}

function Qhi() {
  return uD;
}

function Yhi(e) {
  return e === "visible";
}

function gUe(e) {
  return e === "far";
}

function UCe(e, t, n, r) {
  const a = e.zoom > 0 ? e.zoom : 1,
    i = -e.x / a,
    o = -e.y / a,
    s = (t - e.x) / a,
    l = (n - e.y) / a,
    d = r > 0 ? r : 1,
    u = t * (d - 1) / 2 / a,
    h = n * (d - 1) / 2 / a;
  return {
    worldLeft: i - u,
    worldTop: o - h,
    worldRight: s + u,
    worldBottom: l + h
  };
}

function ylr(e, t, n) {
  return UCe(e, t, n, 1);
}

function Xhi(e, t) {
  const n = t.zoom > 0 ? t.zoom : 1,
    r = e.width ?? 260,
    a = e.height ?? 200,
    i = e.x * n + t.x,
    o = e.y * n + t.y;
  return {
    left: i,
    top: o,
    right: i + r * n,
    bottom: o + a * n
  };
}

function Esn(e, t) {
  return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}

function blr(e, t, n, r, a) {
  if (!ua() || cLe(e).length === 0) return "off";
  if (a != null && a.forceVisible) return "visible";
  const o = Xhi(e, t);
  if (!o || n <= 0 || r <= 0) return "far";
  if (Esn(o, {
    left: 0,
    top: 0,
    right: n,
    bottom: r
  })) return "visible";
  const l = (a == null ? void 0 : a.preloadMarginScreens) ?? NBt,
    d = n * (l - 1) / 2,
    u = r * (l - 1) / 2,
    h = {
      left: -d,
      top: -u,
      right: n + d,
      bottom: r + u
    };
  return Esn(o, h) ? "preload" : "far";
}

function vlr(e, t, n, r, a) {
  const i = new Map();
  if (!ua()) return i;
  for (const o of e) i.set(o.id, blr(o, t, n, r, {
    forceVisible: a == null ? void 0 : a.has(o.id)
  }));
  return i;
}

function Jhi() {
  return {
    loadedUrls: rE.size,
    inflightUrls: m$.size,
    visibleQueue: dP.length,
    preloadQueue: EM.length
  };
}

const wlr = Object.freeze(Object.defineProperty({
  __proto__: null,
  OSS_THUMB_PRELOAD_SCREEN_MARGIN: NBt,
  OSS_THUMB_RING_SETTLE_MS: mlr,
  buildOssThumbZoneMap: vlr,
  classifyOssThumbZone: blr,
  enqueueOssThumbPreload: Whi,
  flushOssThumbPreloadNow: Khi,
  getOssThumbViewportAudit: Jhi,
  getStrictWorldViewport: ylr,
  getWorldViewportByScreenMargin: UCe,
  isOssThumbPreloaded: Ghi,
  isOssThumbRingDeferredForTests: Qhi,
  replaceOssThumbPreloadCandidates: flr,
  resetOssThumbPreloadState: b_t,
  reuseOssThumbZoneMap: plr,
  scheduleOssThumbPreloadAfterInteraction: glr,
  setOssThumbPreloadPaused: $re,
  shouldMountOssThumbInDom: Yhi,
  shouldShowOssViewportPlaceholder: gUe
}, Symbol.toStringTag, {
  value: "Module"
}));

function Zhi(e, t, n, r, a, i) {
  if (t.has(e.id) || n.has(e.id) || MJ(e, Px(e.id)) || a <= 0 || i <= 0) return !0;
  const o = r.zoom > 0 ? r.zoom : 1,
    s = e.width ?? 260,
    l = e.height ?? 200,
    d = e.x * o + r.x,
    u = e.y * o + r.y;
  return d + s * o >= 0 && d <= a && u + l * o >= 0 && u <= i;
}

function epi(e) {
  return {
    id: e.id,
    x: e.x,
    y: e.y,
    width: e.width ?? 260,
    height: e.height ?? 200,
    type: e.type,
    isGenerating: !!e.isGenerating,
    resistOffscreenCull: MJ(e, Px(e.id))
  };
}

function tpi(e, t) {
  const n = t.width ?? 260,
    r = t.height ?? 200;
  return e.x === t.x && e.y === t.y && e.width === n && e.height === r && e.type === t.type && e.isGenerating === !!t.isGenerating && e.resistOffscreenCull === MJ(t, Px(t.id));
}

function npi(e, t) {
  if (e.size !== t.length) return !0;
  for (let n = 0; n < t.length; n++) {
    const r = t[n],
      a = e.get(r.id);
    if (!a || !tpi(a, r)) return !0;
  }
  return !1;
}

const xlr = `(function(){"use strict";const x=new Set,Z=560,q=new Set(["preview","gen-image","gen-video","custom-agent","storyboard-chart-node","video-input","input-image","rh-app","rh-comfy","jimeng-super-resolution","topaz-upscale","fal-rembg","motion-control","virtual-try-on","video-relight"]),C=new Set(["preview","input-image","gen-image","gen-video","topaz-upscale","jimeng-super-resolution","fal-rembg","motion-control","virtual-try-on","video-relight"]),Q=.5,X=.25,F=.15,y=new Map;function U(o){return o.updated.forEach(t=>y.set(t.id,t)),o.added.forEach(t=>y.set(t.id,t)),o.removed.forEach(t=>y.delete(t)),Array.from(y.values())}function W(o){y.clear();for(const t of o)y.set(t.id,t)}function j(o,t,e,n){const s=o.zoom>0?o.zoom:1;return{left:-o.x/s-n,top:-o.y/s-n,right:(t-o.x)/s+n,bottom:(e-o.y)/s+n}}function S(o,t,e,n){const s=o.zoom>0?o.zoom:1,r=-o.x/s,d=-o.y/s,m=(t-o.x)/s,a=(e-o.y)/s,u=n>0?n:1,f=t*(u-1)/2/s,p=e*(u-1)/2/s;return{left:r-f,top:d-p,right:m+f,bottom:a+p}}function k(o,t,e){return S(o,t,e,1)}function D(o,t,e,n,s,r=0){return o+e>=s.left-r&&o<=s.right+r&&t+n>=s.top-r&&t<=s.bottom+r}function B(o,t,e,n,s,r){const d=o-e,m=t-n,a=Math.sqrt(d*d+m*m);return a<=s?"high":a<=r?"medium":"low"}const G=new Set(["input-image","preview","gen-image","gen-video"]),w=60,K=36,J=.65,Y=25e5;function $(o){return o>=8e6?24:o>=5e6?28:o>=Y?32:K}function v(o,t,e,n,s,r){const d=n*s;if(o.length<=w||(e.zoom||1)>=J&&d<=Y)return{visibleNodeIds:o.map(l=>l.id),nodeQualityMap:t};let m=0;const a=[],u={},f=e.zoom>0?e.zoom:1,p=$(d);for(const l of o){const I=r.has(l.id),g=G.has(l.type)&&!I,O=l.width,M=l.height,i=l.x*f+e.x,_=l.y*f+e.y,L=i+O*f>=0&&i<=n&&_+M*f>=0&&_<=s;if(g&&m>=p){if(!L)continue;u[l.id]="low",a.push(l.id);continue}g&&m++,a.push(l.id),u[l.id]=t[l.id]??"low"}return{visibleNodeIds:a,nodeQualityMap:u}}function tt(o,t,e,n,s,r,d,m){const a=[],u={},f=[],p=t.zoom<=(m??F);if(e<=0||n<=0){for(const E of o)a.push(E.id),u[E.id]="low";return{type:"result",requestId:-1,visibleNodeIds:a,nodeQualityMap:u,isTinyZoom:p}}const I=s,g=t.zoom<Q,O=p?Math.min(I,80):I,M=r!=null&&r>=1;let i,_;M?(i=S(t,e,n,r),_=k(t,e,n)):(i=j(t,e,n,O),_=i);const L=(i.left+i.right)/2,ot=(i.top+i.bottom)/2;Math.sqrt((i.right-i.left)**2+(i.bottom-i.top)**2);const et=0,nt=0;for(let E=0;E<o.length;E++){const c=o[E],T=c.width??260,R=c.height??200,V=d.has(c.id),H=x.has(c.type),P=!!c.resistOffscreenCull,b=D(c.x,c.y,T,R,i,c.type==="custom-agent"?Z:0),st=D(c.x,c.y,T,R,_);if(!(b||V||H||P))continue;f.push(c);const A=B(c.x+T/2,c.y+R/2,L,ot,et,nt),N=V||H||P,ct=M?b&&!st&&!N:!b&&!N,it=C.has(c.type)&&(p||g),rt=!N&&t.zoom<=X,lt=q.has(c.type);let h;ct||rt||it?h="low":lt?h=A==="low"?"low":A:h=A,u[c.id]=h}const z=v(f,u,t,e,n,d);return{type:"result",requestId:-1,visibleNodeIds:z.visibleNodeIds,nodeQualityMap:z.nodeQualityMap,isTinyZoom:p}}self.onmessage=o=>{const t=o.data;if(t.type==="reset"){y.clear();return}let e;t.type==="calculate"?(W(t.nodes),e=t.nodes):e=U(t.diff);const n=tt(e,t.view,t.viewportWidth,t.viewportHeight,t.overscan,t.preloadMarginScreens,new Set(t.forceIncludeNodeIds||[]),t.tinyZoomThreshold);n.requestId=t.requestId,self.postMessage(n)}})();
`,
  Tsn = typeof self < "u" && self.Blob && new Blob([xlr], {
    type: "text/javascript;charset=utf-8"
  });

function rpi(e) {
  let t;
  try {
    if (t = Tsn && (self.URL || self.webkitURL).createObjectURL(Tsn), !t) throw "";
    const n = new Worker(t, {
      name: e == null ? void 0 : e.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), n;
  } catch {
    return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(xlr), {
      name: e == null ? void 0 : e.name
    });
  } finally {
    t && (self.URL || self.webkitURL).revokeObjectURL(t);
  }
}

const Msn = new Map(),
  Psn = new Set(),
  kot = epi;

function api({
  nodes: e,
  view: t,
  viewportWidth: n,
  viewportHeight: r,
  overscan: a,
  preloadMarginScreens: i,
  forceIncludeNodeIds: o,
  workerThreshold: s = 200,
  performanceEpoch: l = 0,
  isPanning: d = !1,
  tinyZoomThreshold: u
}) {
  const h = e.length >= s,
    p = g.useRef(null),
    m = g.useRef(!1),
    f = g.useRef(0),
    y = g.useRef(new Map()),
    b = g.useRef(null),
    v = g.useRef(!1),
    _ = g.useRef(l),
    w = g.useRef(0),
    k = g.useRef(""),
    A = g.useRef(null),
    S = g.useRef(null),
    C = g.useRef(null),
    [I, E] = g.useState({
      ids: Psn,
      qualityMap: Msn,
      isTinyZoom: !1,
      received: !1
    });
  return g.useEffect(() => {
    if (!(!h || p.current || m.current)) {
      if (typeof Worker > "u") {
        m.current = !0;
        return;
      }
      try {
        const M = new rpi();
        M.onmessage = T => {
          const P = T.data;
          if (!P || P.type !== "result" || P.requestId !== f.current || (S.current = P, C.current != null)) return;
          let R = 0;
          const j = performance.now(),
            B = 300,
            F = () => {
              C.current = requestAnimationFrame(() => {
                if (R < 1) {
                  R += 1, F();
                  return;
                }
                if (Lle() && performance.now() - j < B) {
                  F();
                  return;
                }
                C.current = null;
                const N = S.current;
                if (S.current = null, !N || N.requestId !== f.current) return;
                const G = new Set(N.visibleNodeIds),
                  z = new Map();
                for (const V in N.nodeQualityMap) z.set(V, N.nodeQualityMap[V]);
                E({
                  ids: G,
                  qualityMap: z,
                  isTinyZoom: N.isTinyZoom,
                  received: !0
                });
              });
            };
          F();
        }, M.onerror = T => {
          console.warn("[useVisibleNodesWorker] worker error, fallback to main thread", T), m.current = !0, M.terminate(), p.current = null;
        }, p.current = M;
      } catch (M) {
        console.warn("[useVisibleNodesWorker] failed to create worker", M), m.current = !0;
      }
    }
  }, [h]), g.useEffect(() => {
    if (h) return;
    C.current != null && (cancelAnimationFrame(C.current), C.current = null), S.current = null;
    const M = p.current;
    M && (M.postMessage({
      type: "reset"
    }), M.terminate(), p.current = null), y.current.clear(), b.current = null, v.current = !1, k.current = "", A.current && (clearTimeout(A.current), A.current = null), I.received && E({
      ids: Psn,
      qualityMap: Msn,
      isTinyZoom: !1,
      received: !1
    });
  }, [h, I.received]), g.useEffect(() => {
    if (!h) return;
    const M = p.current;
    if (!M || m.current) return;
    const T = _.current !== l;
    _.current = l;
    const P = performance.now(),
      R = d ? 42 : 0,
      j = P - w.current,
      B = R > 0 && j < R,
      F = () => {
        const N = y.current,
          G = b.current !== e,
          z = !v.current || T || G && npi(N, e),
          V = o ? Array.from(o) : [],
          O = [t.x, t.y, t.zoom, n, r, a, i ?? "", V.slice().sort().join(","), d ? 1 : 0, u ?? ""].join("|");
        if (v.current && !T && !z && O === k.current) {
          b.current = e;
          return;
        }
        w.current = performance.now();
        const L = ++f.current;
        if (k.current = O, !v.current || T) {
          const D = new Map();
          for (let U = 0; U < e.length; U++) {
            const H = e[U];
            D.set(H.id, kot(H));
          }
          M.postMessage({
            type: "calculate",
            requestId: L,
            nodes: Array.from(D.values()),
            view: t,
            viewportWidth: n,
            viewportHeight: r,
            overscan: a,
            preloadMarginScreens: i,
            forceIncludeNodeIds: V,
            isPanning: d,
            tinyZoomThreshold: u
          }), y.current = D, b.current = e, v.current = !0;
        } else if (!z) b.current = e, M.postMessage({
          type: "calculate-incremental",
          requestId: L,
          diff: {
            added: [],
            updated: [],
            removed: []
          },
          view: t,
          viewportWidth: n,
          viewportHeight: r,
          overscan: a,
          preloadMarginScreens: i,
          forceIncludeNodeIds: V,
          isPanning: d,
          tinyZoomThreshold: u
        });else {
          const D = [],
            U = [],
            H = [],
            Y = new Set();
          for (let K = 0; K < e.length; K++) {
            const W = e[K];
            Y.add(W.id);
            const Q = N.get(W.id);
            if (!Q) {
              D.push(kot(W));
              continue;
            }
            const q = W.width ?? 260,
              ne = W.height ?? 200,
              de = !!W.isGenerating,
              le = MJ(W, Px(W.id));
            (Q.x !== W.x || Q.y !== W.y || Q.width !== q || Q.height !== ne || Q.type !== W.type || Q.isGenerating !== de || !!Q.resistOffscreenCull !== le) && U.push(kot(W));
          }
          N.forEach((K, W) => {
            Y.has(W) || H.push(W);
          });
          for (const K of D) N.set(K.id, K);
          for (const K of U) N.set(K.id, K);
          for (const K of H) N.delete(K);
          b.current = e, M.postMessage({
            type: "calculate-incremental",
            requestId: L,
            diff: {
              added: D,
              updated: U,
              removed: H
            },
            view: t,
            viewportWidth: n,
            viewportHeight: r,
            overscan: a,
            preloadMarginScreens: i,
            forceIncludeNodeIds: V,
            isPanning: d,
            tinyZoomThreshold: u
          });
        }
      };
    B ? (A.current && clearTimeout(A.current), A.current = setTimeout(() => {
      A.current = null, F();
    }, R - j)) : (A.current && (clearTimeout(A.current), A.current = null), F());
  }, [h, e, t.x, t.y, t.zoom, n, r, a, i, o, l, d, u]), g.useEffect(() => () => {
    A.current && clearTimeout(A.current), C.current != null && (cancelAnimationFrame(C.current), C.current = null), S.current = null;
    const M = p.current;
    M && (M.terminate(), p.current = null);
  }, []), g.useMemo(() => ({
    ready: h && !m.current && I.received,
    visibleNodeIds: I.ids,
    nodeQualityMap: I.qualityMap,
    isTinyZoom: I.isTinyZoom
  }), [h, I]);
}

const ipi = 500,
  opi = 1e3,
  spi = 40,
  lpi = 100;

function _lr(e) {
  return e > lpi;
}

const cpi = 1,
  dpi = 1.2;

function upi(e, t, n, r) {
  const a = t > 0 ? t : 1,
    i = Math.round(a * 100),
    o = e > 150 ? 1.1 : e > 80 ? 1.2 : r,
    s = i < 60 ? cpi : i < 100 ? dpi : i > 150 ? 1.1 : i > 80 ? 1.2 : o;
  return Math.min(s, n);
}

function hpi(e) {
  return e > spi;
}

function ppi(e) {
  const {
    rawOn: t,
    mounted: n,
    hasTimer: r
  } = e;
  return t && !n ? "mount" : !t && n ? r ? "noop" : "schedule-leave" : t && n && r ? "cancel-timer" : "noop";
}

function yUe(e, t) {
  if (e && e.size === t.size) {
    let n = !0;
    for (const r of t) if (!e.has(r)) {
      n = !1;
      break;
    }
    if (n) return e;
  }
  return t;
}

function toe(e, t) {
  if (e && e.length === t.length) {
    for (let n = 0; n < t.length; n++) if (e[n] !== t[n]) return t;
    return e;
  }
  return t;
}

function Aot(e) {
  let t = "";
  return e.forEach((n, r) => {
    t += r + String(n);
  }), t;
}

function Sot(e, t, n, r) {
  return {
    visibleNodeIds: yUe(e == null ? void 0 : e.visibleNodeIds, t),
    nodeQualityMap: e && e.signature === r ? e.nodeQualityMap : n,
    signature: r
  };
}

const mpi = 96,
  fpi = new Set([]),
  gpi = new Set(["preview", "input-image", "gen-image", "gen-video", "topaz-upscale", "jimeng-super-resolution", "fal-rembg", "motion-control", "virtual-try-on", "video-relight"]),
  ypi = new Set(["input-image", "preview", "gen-image", "gen-video"]),
  bpi = 60,
  vpi = 36,
  wpi = .65,
  klr = 25e5;

function xpi(e) {
  return e >= 8e6 ? 24 : e >= 5e6 ? 28 : e >= klr ? 32 : vpi;
}

const _pi = .5,
  kpi = .25,
  Api = {
    visibleNodes: [],
    visibleNodeIds: new Set(),
    nodeQualityMap: new Map(),
    isTinyZoom: !1
  },
  Spi = (e, t, n, r) => {
    const a = -e.x / e.zoom - r,
      i = -e.y / e.zoom - r,
      o = (t - e.x) / e.zoom + r,
      s = (n - e.y) / e.zoom + r;
    return {
      worldLeft: a,
      worldTop: i,
      worldRight: o,
      worldBottom: s
    };
  },
  Ipi = (e, t, n, r, a, i) => {
    const o = e - n,
      s = t - r,
      l = Math.sqrt(o * o + s * s);
    return l <= a ? "high" : l <= i ? "medium" : "low";
  },
  Rsn = (e, t) => e > 150 ? Math.max(30, t * .3) : e > 100 ? Math.max(40, t * .5) : e > 50 ? Math.max(50, t * .7) : t;

function Cpi(e, t, n, r, a, i, o, s = !0) {
  const l = a * i;
  if (e.length <= bpi || (r.zoom || 1) >= wpi && l <= klr) return {
    visibleNodes: e,
    visibleNodeIds: t,
    nodeQualityMap: n
  };
  let d = 0;
  const u = [],
    h = new Set(),
    p = new Map(),
    m = r.zoom > 0 ? r.zoom : 1,
    f = xpi(l);
  for (const y of e) {
    const b = o.has(y.id),
      v = ypi.has(y.type) && !b,
      _ = y.width ?? 260,
      w = y.height ?? 200,
      k = y.x * m + r.x,
      A = y.y * m + r.y,
      S = k + _ * m >= 0 && k <= a && A + w * m >= 0 && A <= i;
    if (v && d >= f) {
      if (!S && s) continue;
      p.set(y.id, "low"), u.push(y), h.add(y.id);
      continue;
    }
    v && d++, u.push(y), h.add(y.id), p.set(y.id, n.get(y.id) ?? "low");
  }
  return {
    visibleNodes: u,
    visibleNodeIds: h,
    nodeQualityMap: p
  };
}

const Epi = ({
  nodes: e,
  view: t,
  viewportWidth: n,
  viewportHeight: r,
  overscan: a,
  preloadMarginScreens: i,
  forceIncludeNodeIds: o = new Set(),
  isPanning: s = !1,
  performanceEpoch: l = 0,
  pressureLevel: d = "idle"
}) => {
  const u = g.useRef(null),
    h = a !== void 0 ? a : Rsn(e.length, h0t()),
    p = _lr(e.length);
  Thi(p);
  const m = api({
      nodes: e,
      view: t,
      viewportWidth: n,
      viewportHeight: r,
      overscan: h,
      preloadMarginScreens: i,
      forceIncludeNodeIds: o,
      workerThreshold: p ? mpi : Number.POSITIVE_INFINITY,
      performanceEpoch: l,
      isPanning: s,
      tinyZoomThreshold: pve()
    }),
    f = m.ready,
    y = g.useMemo(() => {
      var ne, de;
      if (f) return Api;
      if (n <= 0 || r <= 0) {
        const le = new Set(e.map(X => X.id)),
          J = new Map();
        e.forEach(X => J.set(X.id, "low"));
        const pe = "unmeasured:" + Aot(J),
          ce = Sot(u.current, le, J, pe),
          we = toe((ne = u.current) == null ? void 0 : ne.visibleNodes, e);
        return u.current = {
          ...ce,
          visibleNodes: we
        }, {
          visibleNodes: we,
          visibleNodeIds: ce.visibleNodeIds,
          nodeQualityMap: ce.nodeQualityMap,
          isTinyZoom: t.zoom <= pve()
        };
      }
      const b = pve(),
        v = h0t(),
        _ = a !== void 0 ? a : v,
        w = a !== void 0 ? _ : Rsn(e.length, _),
        k = e.length,
        A = t.zoom <= b,
        S = t.zoom < _pi,
        C = A ? Math.min(w, 80) : w,
        I = i != null && i >= 1;
      let E, M, T, P, R, j, B, F;
      if (I) {
        const le = UCe(t, n, r, i);
        E = le.worldLeft, M = le.worldTop, T = le.worldRight, P = le.worldBottom;
        const J = ylr(t, n, r);
        R = J.worldLeft, j = J.worldTop, B = J.worldRight, F = J.worldBottom;
      } else {
        const le = Spi(t, n, r, C);
        E = le.worldLeft, M = le.worldTop, T = le.worldRight, P = le.worldBottom, R = E, j = M, B = T, F = P;
      }
      const N = (E + T) / 2,
        G = (M + P) / 2,
        z = Math.sqrt(Math.pow(T - E, 2) + Math.pow(P - M, 2)),
        V = 0,
        O = 0,
        L = z * V,
        D = z * O,
        U = [],
        H = new Set(),
        Y = new Map();
      for (let le = 0; le < k; le++) {
        const J = e[le],
          pe = J.id;
        if (H.has(pe)) continue;
        const ce = o.has(pe),
          we = fpi.has(J.type),
          X = MJ(J, Px(pe)),
          Z = J.width ?? 260,
          re = J.height ?? 200,
          fe = Nhi(J, {
            left: E,
            top: M,
            right: T,
            bottom: P
          }),
          ye = J.x + Z >= R && J.x <= B && J.y + re >= j && J.y <= F;
        if (!(!p || fe || ce || we || X)) continue;
        U.push(J), H.add(pe);
        const ae = Ipi(J.x + (J.width ?? 0) / 2, J.y + (J.height ?? 0) / 2, N, G, L, D),
          be = ce || we || X,
          Ee = I ? fe && !ye && !be : !fe && !be,
          xe = gpi.has(J.type) && (A || S),
          he = !be && t.zoom <= kpi,
          ge = Ee || he || !be && (d === "critical" || d === "tight" && ae !== "high") || xe ? "low" : ae;
        Y.set(pe, ge);
      }
      const K = Cpi(U, H, Y, t, n, r, o, p),
        W = Aot(K.nodeQualityMap),
        Q = Sot(u.current, K.visibleNodeIds, K.nodeQualityMap, W),
        q = toe((de = u.current) == null ? void 0 : de.visibleNodes, K.visibleNodes);
      return u.current = {
        ...Q,
        visibleNodes: q
      }, {
        visibleNodes: q,
        visibleNodeIds: Q.visibleNodeIds,
        nodeQualityMap: Q.nodeQualityMap,
        isTinyZoom: A
      };
    }, [e, t.x, t.y, t.zoom, n, r, a, i, o, l, d, f, p]);
  return g.useMemo(() => {
    var C;
    if (!m.ready) return y;
    const b = m.visibleNodeIds,
      v = [],
      _ = new Set();
    for (const I of e) _.has(I.id) || Zhi(I, b, o, t, n, r) && (_.add(I.id), v.push(I));
    let w = m.nodeQualityMap;
    if (d !== "idle") {
      const I = new Map();
      for (const E of v) {
        const M = m.nodeQualityMap.get(E.id) ?? "low";
        if (o.has(E.id) || MJ(E, Px(E.id))) {
          I.set(E.id, M);
          continue;
        }
        d === "critical" || d === "tight" && M === "medium" ? I.set(E.id, "low") : I.set(E.id, M);
      }
      w = I;
    } else if (v.some(I => !w.has(I.id))) {
      w = new Map(w);
      for (const I of v) w.has(I.id) || w.set(I.id, "low");
    }
    const k = Aot(w),
      A = Sot(u.current, _, w, k),
      S = toe((C = u.current) == null ? void 0 : C.visibleNodes, v);
    return u.current = {
      ...A,
      visibleNodes: S
    }, {
      visibleNodes: S,
      visibleNodeIds: A.visibleNodeIds,
      nodeQualityMap: A.nodeQualityMap,
      isTinyZoom: m.isTinyZoom
    };
  }, [m, y, e, d, o, t.x, t.y, t.zoom, n, r]);
};

function Tpi(e, t, n, r) {
  const a = hpi(r),
    [i, o] = g.useState(() => new Set(e)),
    s = g.useRef(i);
  s.current = i;
  const l = g.useRef(new Set()),
    d = g.useRef(new Map());
  return g.useEffect(() => {
    const h = b => {
      const v = d.current.get(b);
      v && (window.clearTimeout(v.handle), d.current.delete(b));
    };
    if (!a) {
      for (const b of [...d.current.keys()]) h(b);
      o(b => yUe(b, new Set(e)));
      return;
    }
    const p = new Set(s.current);
    let m = !1;
    for (const b of p) n.has(b) || (p.delete(b), l.current.delete(b), h(b), m = !0);
    const f = new Set();
    e.forEach(b => f.add(b)), t.forEach(b => f.add(b)), p.forEach(b => f.add(b)), d.current.forEach((b, v) => f.add(v));
    const y = b => {
      l.current.add(b), h(b), p.has(b) || (p.add(b), m = !0);
    };
    for (const b of f) {
      if (!n.has(b)) {
        h(b);
        continue;
      }
      const v = e.has(b) || t.has(b),
        _ = ppi({
          rawOn: v,
          mounted: p.has(b),
          forced: t.has(b),
          seen: l.current.has(b),
          hasTimer: d.current.has(b)
        });
      _ === "mount" ? y(b) : _ === "unmount" ? (p.delete(b), h(b), m = !0) : _ === "cancel-timer" ? (l.current.add(b), h(b)) : _ === "schedule-enter" ? d.current.set(b, {
        kind: "enter",
        handle: window.setTimeout(() => {
          d.current.delete(b), l.current.add(b), o(w => {
            if (w.has(b) || !n.has(b)) return w;
            const k = new Set(w);
            return k.add(b), k;
          });
        }, ipi)
      }) : _ === "schedule-leave" && d.current.set(b, {
        kind: "leave",
        handle: window.setTimeout(() => {
          d.current.delete(b), o(w => {
            if (!w.has(b)) return w;
            const k = new Set(w);
            return k.delete(b), k;
          });
        }, opi)
      });
    }
    m && o(b => yUe(b, p));
  }, [a, e, t, n]), g.useEffect(() => () => {
    d.current.forEach(h => window.clearTimeout(h.handle)), d.current.clear();
  }, []), g.useMemo(() => {
    if (!a) return e;
    for (const h of i) if (n.has(h) && !e.has(h)) {
      const p = new Set(e);
      for (const m of i) n.has(m) && p.add(m);
      return p;
    }
    return e;
  }, [a, e, i, n]);
}

const Mpi = new Set();

function Ppi({
  nodes: e,
  view: t,
  viewportWidth: n,
  viewportHeight: r,
  forceIncludeNodeIds: a = Mpi,
  loosenOverscan: i
}) {
  const o = e.length,
    s = d4n(o, i),
    [l, d] = g.useState(0);
  g.useEffect(() => {
    const M = () => d(T => T + 1);
    return window.addEventListener("performancePresetChanged", M), () => window.removeEventListener("performancePresetChanged", M);
  }, []);
  const [u, h] = g.useState("idle");
  g.useEffect(() => {
    Wsa();
    const M = j$n(h);
    return () => {
      M(), qsa();
    };
  }, []), g.useEffect(() => {
    Hsa(o);
  }, [o]);
  const p = Tsa(),
    m = a9().preloadMarginScreens,
    f = upi(o, t.zoom, m, NBt),
    y = Csa(f),
    b = Epi({
      nodes: e,
      view: t,
      viewportWidth: n,
      viewportHeight: r,
      overscan: s,
      preloadMarginScreens: y,
      forceIncludeNodeIds: a,
      performanceEpoch: l,
      pressureLevel: u
    }),
    v = g.useRef(new Set()),
    _ = g.useRef([]),
    w = g.useMemo(() => {
      const M = new Set();
      for (const T of e) M.add(T.id);
      return v.current = yUe(v.current, M), v.current;
    }, [e]),
    k = Tpi(b.visibleNodeIds, a, w, o);
  g.useLayoutEffect(() => {
    Ohi(k);
  }, [k]);
  const {
    visibleNodes: A,
    nodeQualityMap: S
  } = g.useMemo(() => {
    if (k === b.visibleNodeIds) {
      const R = toe(_.current, b.visibleNodes);
      return _.current = R, {
        visibleNodes: R,
        nodeQualityMap: b.nodeQualityMap
      };
    }
    const M = new Map(b.nodeQualityMap),
      T = [];
    for (const R of e) k.has(R.id) && (T.push(R), M.has(R.id) || M.set(R.id, "low"));
    const P = toe(_.current, T);
    return _.current = P, {
      visibleNodes: P,
      nodeQualityMap: M
    };
  }, [e, k, b.visibleNodes, b.visibleNodeIds, b.nodeQualityMap]);
  g.useEffect(() => {
    PHt(A.length);
  }, [A.length]), g.useEffect(() => () => {
    PHt(0);
  }, []);
  const C = g.useRef({
      overview: !1,
      micro: !1
    }),
    I = TIt(t.zoom, A.length, C.current.overview),
    E = aHe(t.zoom, A.length, C.current.micro);
  return C.current = {
    overview: I,
    micro: E
  }, {
    visibleNodes: A,
    visibleNodeIds: k,
    nodeQualityMap: S,
    canvasProjectBootActive: p,
    denseMediaOverviewActive: I,
    denseMediaMicroActive: E,
    framePressure: u,
    nodePreloadMarginScreens: y
  };
}

function Rpi({
  groups: e,
  visibleNodes: t,
  setSelectedNodeIds: n,
  setSelectedNodeId: r,
  setFocusRippleNodeId: a
}) {
  const i = g.useMemo(() => {
    const u = new Set();
    return e.forEach(h => {
      h.collapsed && h.nodeIds.forEach(p => u.add(p));
    }), u;
  }, [e]);
  g.useEffect(() => {
    i.size !== 0 && (n(u => {
      const h = new Set([...u].filter(p => !i.has(p)));
      return h.size === u.size && [...u].every(p => h.has(p)) ? u : h;
    }), r(u => u != null && i.has(u) ? null : u), a(u => u != null && i.has(u) ? null : u));
  }, [i, n, r, a]);
  const o = g.useMemo(() => {
      const u = new Set();
      return e.forEach(h => {
        h.collapsed && h.stackMode !== "card" && h.nodeIds.forEach(p => u.add(p));
      }), u;
    }, [e]),
    s = g.useMemo(() => {
      if (o.size === 0) return t;
      const u = new Set(),
        h = [];
      for (const p of t) o.has(p.id) || u.has(p.id) || (u.add(p.id), h.push(p));
      return toe(t, h);
    }, [t, o]),
    d = g.useMemo(() => {
      const u = new Set();
      return e.forEach(h => {
        h.previewCollapsed && h.nodeIds.forEach(p => u.add(p));
      }), u;
    }, [e]);
  return {
    collectedNodeIds: i,
    renderedNodes: s,
    previewCollapsedOrCompactNodeIds: d
  };
}

function Npi(e) {
  const {
      nodes: t,
      connections: n,
      groups: r,
      view: a,
      viewportWidth: i,
      viewportHeight: o,
      loosenOverscan: s,
      selectedNodeId: l,
      selectedNodeIds: d,
      connectingNodeIds: u,
      dragNodeId: h,
      resizingNodeId: p,
      focusEditActiveSourceNodeId: m,
      lightboxOpen: f,
      isPanning: y,
      isDragging: b,
      isDraggingSelectionBoundsRef: v,
      selectedNodeIdsRef: _,
      setSelectedNodeIds: w,
      setSelectedNodeId: k,
      setFocusRippleNodeId: A
    } = e,
    S = g.useMemo(() => {
      const j = new Set();
      return n.forEach(B => j.add(B.to)), j;
    }, [n]),
    C = g.useMemo(() => Chi(n), [n]),
    I = g.useMemo(() => clr(t), [t]),
    E = g.useMemo(() => {
      const j = new Map();
      return t.forEach(B => j.set(B.id, B)), j;
    }, [I]),
    M = zhi({
      nodes: t,
      groups: r,
      selectedNodeId: l,
      selectedNodeIds: d,
      connectingNodeIds: u,
      dragNodeId: h,
      resizingNodeId: p,
      focusEditActiveSourceNodeId: m,
      lightboxOpen: f,
      isPanning: y,
      isDragging: b,
      isDraggingSelectionBoundsRef: v,
      selectedNodeIdsRef: _
    }),
    T = Ppi({
      nodes: t,
      view: a,
      viewportWidth: i,
      viewportHeight: o,
      forceIncludeNodeIds: M,
      loosenOverscan: s
    });
  Ehi({
    visibleNodeIds: T.visibleNodeIds,
    nodes: t,
    preloadMarginScreens: T.nodePreloadMarginScreens
  });
  const P = g.useRef(T.visibleNodeIds);
  P.current = T.visibleNodeIds, g.useEffect(() => {
    window.__getVisibleNodeIds = () => P.current;
  }, []);
  const R = Rpi({
    groups: r,
    visibleNodes: T.visibleNodes,
    setSelectedNodeIds: w,
    setSelectedNodeId: k,
    setFocusRippleNodeId: A
  });
  return {
    connectedNodeIds: S,
    connectionSignatures: C,
    nodesLayoutSignature: I,
    nodesGeometryMap: E,
    forceIncludeNodeIds: M,
    ...T,
    ...R
  };
}

function jpi(e) {
  const t = g.useRef(e),
    n = g.useRef(!1),
    r = g.useRef(!1),
    a = g.useRef(!1),
    i = g.useRef(null),
    o = g.useRef(null);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const s = g.useCallback(() => {
      i.current != null && window.cancelAnimationFrame(i.current), i.current = null;
    }, []),
    l = g.useCallback(() => {
      for (const p of [o.current, t.current.canvasRef.current]) p == null || p.classList.remove("canvas-minimap-dragging", "canvas-panning", "canvas-local-panning");
      o.current = null;
    }, []),
    d = g.useCallback(() => {
      if (a.current = !1, s(), l(), !r.current) return;
      r.current = !1;
      const p = t.current,
        m = p.viewRef.current;
      mY(p.worldRef.current, m), Rle(m), p.setView(m), XC(!1, {
        skipNotify: !0
      }), lU(), oM();
    }, [s, l]);
  g.useLayoutEffect(() => {
    n.current = !0;
    const p = () => {
        s(), r.current && (l(), r.current = !1, a.current = !0, XC(!1, {
          skipNotify: !0
        }), lU(), oM());
      },
      m = e.document.subscribe(p);
    return () => {
      n.current = !1, m(), p();
    };
  }, [e.document, s, l]);
  const u = g.useCallback(() => {
      if (!n.current || r.current) return;
      a.current = !1, r.current = !0, s();
      const p = t.current.canvasRef.current,
        m = ei();
      o.current = p, p == null || p.classList.toggle("canvas-panning", !m), p == null || p.classList.toggle("canvas-local-panning", m), p == null || p.classList.add("canvas-minimap-dragging"), XC(!0, {
        skipNotify: !0
      }), Aj({
        skipBodyClass: m,
        skipNotify: !0
      });
    }, [s]),
    h = g.useCallback(p => {
      if (!n.current || a.current) return;
      const m = t.current;
      m.viewRef.current = p, mY(m.worldRef.current, p), !r.current && (Rle(p), s(), i.current = window.requestAnimationFrame(() => {
        i.current = null, t.current.setView(p);
      }));
    }, [s]);
  return {
    start: u,
    change: h,
    end: d
  };
}

function Dpi(e) {
  const t = a => {
      var s, l;
      const i = a;
      if ((l = (s = i.target) == null ? void 0 : s.closest) != null && l.call(s, "[data-connection-drop-menu]") || e.stickyMenu()) return;
      const o = e.bounds();
      (!o || i.clientX < o.left || i.clientX > o.right || i.clientY < o.top || i.clientY > o.bottom) && e.cancel();
    },
    n = () => {
      e.stickyMenu() || e.cancel();
    },
    r = a => {
      !a.relatedTarget && !e.stickyMenu() && e.cancel();
    };
  return e.window.addEventListener("mouseup", t, {
    capture: !0
  }), e.window.addEventListener("pointerup", t, {
    capture: !0
  }), e.window.addEventListener("blur", n), e.document.addEventListener("mouseleave", r), () => {
    e.window.removeEventListener("mouseup", t, {
      capture: !0
    }), e.window.removeEventListener("pointerup", t, {
      capture: !0
    }), e.window.removeEventListener("blur", n), e.document.removeEventListener("mouseleave", r);
  };
}

function Lpi(e, t, n, r) {
  const a = g.useRef({
    menu: n,
    cancel: r
  });
  g.useLayoutEffect(() => {
    a.current = {
      menu: n,
      cancel: r
    };
  }, [n, r]), g.useEffect(() => {
    if (e) return Dpi({
      window,
      document,
      bounds: () => {
        var i;
        return (i = t.current) == null ? void 0 : i.getBoundingClientRect();
      },
      stickyMenu: () => {
        var o;
        const i = a.current.menu;
        return !!(i.visible && (i.sourceNodeId || i.targetNodeId || (o = i.sourceNodeIds) != null && o.length) && i.stickyConnectionMenu);
      },
      cancel: () => a.current.cancel()
    });
  }, [e, t]);
}

function Opi(e, t, n) {
  if (!e.some(d => {
    if (d.type !== "input-image") return !1;
    const u = d.settings || {};
    return !!String(u._genBatchOutputSourceId || "").trim() || Number.isFinite(Number(u._genBatchOutputSlot));
  })) return n;
  const a = new Set(e.filter(d => d.type === "input-image").map(d => {
      var u;
      return String(((u = d.settings) == null ? void 0 : u._genBatchOutputSourceId) || "").trim();
    }).filter(Boolean)),
    i = t.filter(d => {
      if (d.type !== "input-image") return !1;
      const u = d.settings || {},
        h = String(u._genBatchOutputSourceId || "").trim();
      return h && a.has(h) ? !0 : e.some(p => p.id === d.id);
    }),
    o = WIn(i.length > 0 ? i : t);
  if (o.length === 0) return n;
  let s = !1;
  const l = n.map(d => {
    const u = String(d.id || "").trim(),
      h = String(d.sourceNodeId || "").trim(),
      p = o.find(y => y.historyTaskId && y.historyTaskId === u) || o.find(y => y.genSourceId && y.genSourceId === h) || null,
      m = (p == null ? void 0 : p.remotes) || d5e(d, t),
      f = qIn(d, m, p == null ? void 0 : p.thumbs);
    return f === d ? d : (s = !0, f);
  });
  return s ? l : n;
}

function Bpi(e) {
  return new Set(e.map(t => String(t || "").trim()).filter(Boolean));
}

function Nsn(e, t) {
  const n = e.filter(r => t.has(r.id));
  return {
    deleted: n,
    remaining: n.length ? e.filter(r => !t.has(r.id)) : e
  };
}

function Fpi(e, t) {
  const n = new Set(t.map(r => r.id));
  return e.filter(r => !n.has(r.id));
}

function zpi(e, t, n) {
  const r = new Set(t.map(s => s.id)),
    a = e.filter(s => r.has(String(s.sourceNodeId || "")) && !n.has(String(s.sourceNodeId || ""))),
    i = new Set(a.filter(s => s.status === "generating").map(s => String(s.remoteTaskId || "").trim()).filter(Boolean)),
    o = new Set(a.map(s => String(s.id || "")).filter(Boolean));
  return e.filter(s => s.status === "generating" && n.has(String(s.sourceNodeId || "")) && !i.has(String(s.remoteTaskId || "").trim()) && !o.has(String(s.id || "")));
}

const jsn = {
    schedule: e => requestAnimationFrame(e),
    cancel: e => cancelAnimationFrame(e),
    commitSync: Da.flushSync,
    generating: hu,
    progress: (e, t) => {
      al.updateLatestProgressForNode(e, t);
    },
    runtimeOwned: e => !!al.getNodeGeneratingSnapshot(e),
    cancelDeferred: F5t,
    cancelPolling: e => {
      window.dispatchEvent(new CustomEvent("cancelPolling", {
        detail: e
      }));
    },
    preserveHistory: Opi,
    async persistHistory(e) {
      const {
        persistHistoryToStorage: t
      } = await Ie(async () => {
        const {
          persistHistoryToStorage: n
        } = await Promise.resolve().then(() => Gu);
        return {
          persistHistoryToStorage: n
        };
      }, void 0, import.meta.url);
      return t(e(), {
        force: !0
      });
    },
    async cleanup(e, t) {
      const {
          cleanupNodesBatch: n
        } = await Ie(async () => {
          const {
            cleanupNodesBatch: a
          } = await Promise.resolve().then(() => yzt);
          return {
            cleanupNodesBatch: a
          };
        }, void 0, import.meta.url),
        r = t();
      r && n(Fpi(e, r), r);
    },
    report: (e, t) => console.warn("[NodeCommands] " + e, t)
  },
  Upi = Symbol("node-update-scope");

function $pi(e) {
  var n;
  const t = e.x != null || e.y != null || e.width != null || e.height != null;
  return e.prompt != null || ((n = e.settings) == null ? void 0 : n.isCollapsed) != null || e.settings != null && !t && !e.prompt && !e.content;
}

function Alr(e, t, n) {
  var i, o, s, l;
  let r = e;
  const a = new Map(e.map((d, u) => [d.id, u]));
  for (const {
    nodeId: d,
    updates: u
  } of t) {
    const h = a.get(d);
    if (h == null) continue;
    const p = r[h],
      m = {
        ...p,
        ...u
      };
    if (u.settings != null) {
      m.settings = {
        ...p.settings,
        ...u.settings
      };
      for (const [f, y] of Object.entries(u.settings)) y === void 0 && delete m.settings[f];
    }
    if (!(YEt(p, m) && (Object.is((i = p.settings) == null ? void 0 : i.progress, (o = m.settings) == null ? void 0 : o.progress) || n.has(d))) && (r === e && (r = e.slice()), r[h] = m, p.type === "custom-agent" && ((s = p.settings) != null && s.isCollapsed) && ((l = u.settings) == null ? void 0 : l.isCollapsed) === !1 && h < r.length - 1)) {
      r.splice(h, 1), r.push(m);
      for (let f = h; f < r.length; f++) a.set(r[f].id, f);
    }
  }
  return r;
}

function Gpi(e, t, n) {
  const r = e.findIndex(o => o.id === t);
  if (r < 0) return e;
  const a = e[r].settings;
  if (a && Object.keys(n ?? {}).every(o => Object.prototype.hasOwnProperty.call(a, o) && Object.is(a[o], n == null ? void 0 : n[o]))) return e;
  const i = e.slice();
  return i[r] = {
    ...e[r],
    settings: {
      ...e[r].settings,
      ...n
    }
  }, i;
}

function Vpi(e) {
  let t = !1,
    n = {},
    r = [],
    a = null;
  const i = new Map(),
    o = u => {
      const h = e().document.lease(),
        p = n;
      i.has(u) || i.set(u, {});
      const m = i.get(u);
      return () => t && p === n && h.isCurrent() && i.get(u) === m;
    },
    s = () => {
      a != null && e().io.cancel(a), a = null, r = [], i.clear(), n = {};
    },
    l = () => {
      a != null && e().io.cancel(a), a = null;
      const u = r;
      if (r = [], !u.length) return;
      const h = new Set(u.filter(p => e().io.runtimeOwned(p.nodeId)).map(p => p.nodeId));
      e().setNodes(p => Alr(p, u.filter(m => m.valid(p)), h));
    },
    d = (u, h, p) => {
      var b, v, _;
      const m = p ?? o(u);
      if (!m()) return;
      const f = e().io;
      h.isGenerating === !0 || ((b = h.settings) == null ? void 0 : b.isGenerating) === !0 ? f.generating(u, !0) : (h.isGenerating === !1 || ((v = h.settings) == null ? void 0 : v.isGenerating) === !1) && f.generating(u, !1);
      const y = Number((_ = h.settings) == null ? void 0 : _.progress);
      Number.isFinite(y) && f.progress(u, y), r.push({
        nodeId: u,
        updates: h,
        valid: m
      }), $pi(h) ? l() : a == null && (a = f.schedule(l));
    };
  return {
    activate() {
      t = !0;
    },
    dispose() {
      t = !1, s();
    },
    clear: s,
    cancel(u) {
      u.forEach(h => i.delete(h)), r = r.filter(h => !u.has(h.nodeId));
    },
    updateNode: Object.assign((u, h) => d(u, h), {
      [Upi](u, h) {
        const p = o(u),
          m = (f = e().nodesRef.current) => {
            if (!p()) return !1;
            const y = f.find(b => b.id === u);
            return !!y && h(y);
          };
        return {
          isCurrent: () => m(),
          update: f => d(u, f, m)
        };
      }
    }),
    updateNodeSettings(u, h) {
      const p = o(u);
      p() && (l(), e().setNodes(m => p() ? Gpi(m, u, h) : m));
    }
  };
}

function Hpi(e, t, n) {
  const r = (i, o) => {
      const s = e(),
        l = s.historyRef.current,
        d = s.io.preserveHistory(i, o, l);
      d !== l && (s.setHistory(d), s.io.persistHistory(() => e().historyRef.current).catch(u => s.io.report("删除节点后固化历史失败", u)));
    },
    a = i => {
      const o = e(),
        s = o.document.lease(),
        l = Bpi(i);
      if (!n() || !s.isCurrent() || !l.size) return !1;
      let d = Nsn([], l);
      if (o.io.commitSync(() => {
        o.setNodes(h => !n() || !s.isCurrent() ? h : (d = Nsn(h, l), d.remaining)), o.setConnections(h => n() && s.isCurrent() ? h.filter(p => !l.has(p.from) && !l.has(p.to)) : h), o.setSelectedNodeId(h => n() && s.isCurrent() && h && l.has(h) ? null : h), o.setSelectedNodeIds(h => !n() || !s.isCurrent() || ![...h].some(p => l.has(p)) ? h : new Set([...h].filter(p => !l.has(p))));
      }), !d.deleted.length || !n() || !s.isCurrent()) return !1;
      t(l);
      const u = (h, p) => {
        try {
          p();
        } catch (m) {
          o.io.report(h, m);
        }
      };
      for (const h of l) u("取消节点回填失败", () => o.io.cancelDeferred(h)), u("取消节点轮询失败", () => o.io.cancelPolling({
        nodeId: h
      }));
      u("固化删除节点历史失败", () => r(d.deleted, [...d.deleted, ...d.remaining]));
      for (const h of zpi(o.historyRef.current, d.remaining, l)) u("取消任务轮询失败", () => o.io.cancelPolling({
        taskId: h.id,
        nodeId: h.sourceNodeId
      }));
      return o.io.cleanup(d.deleted, () => n() && s.isCurrent() ? e().nodesRef.current : null).catch(h => o.io.report("删除节点资源清理失败", h)), !0;
    };
  return {
    deleteNodes: a,
    deleteNode: i => {
      a([i]);
    },
    preserveHistory: r
  };
}

function Wpi(e) {
  const t = g.useRef({
    ...e,
    io: e.io ?? jsn
  });
  t.current = {
    ...e,
    io: e.io ?? jsn
  };
  const n = g.useRef(!1),
    [r] = g.useState(() => Vpi(() => t.current)),
    [a] = g.useState(() => ({
      updateNode: r.updateNode,
      updateNodeSettings: r.updateNodeSettings,
      ...Hpi(() => t.current, r.cancel, () => n.current)
    }));
  return g.useLayoutEffect(() => {
    n.current = !0, r.activate();
    const i = e.document.subscribe(r.clear);
    return () => {
      n.current = !1, i(), r.dispose();
    };
  }, [e.document, r]), a;
}

function qpi(e) {
  var u;
  const [t, n] = g.useState([]),
    [r, a] = g.useState([]),
    [i, o] = g.useState(null),
    s = g.useRef(t);
  (u = e == null ? void 0 : e.preserveConnectionsRef) != null && u.call(e) || (s.current = t);
  const l = g.useRef(r);
  l.current = r;
  const d = g.useRef(i);
  return d.current = i, {
    connections: t,
    setConnections: n,
    connectionsRef: s,
    groups: r,
    setGroups: a,
    groupsRef: l,
    selectedGroupId: i,
    setSelectedGroupId: o,
    selectedGroupIdRef: d
  };
}

const zQ = ".node-wrapper[data-node-id]",
  uP = "node-selection-immediate",
  v_t = "node-selection-hidden",
  w_t = "data-selection-chrome-hidden",
  Kpi = "[data-box-select-bounds], [data-box-select-toolbar], [data-box-select-batch-connect]",
  $Ce = new Set();

function Qpi(e) {
  return $Ce.has(e);
}

function Ypi() {
  $Ce.clear();
}

function Slr(e) {
  return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}

function Xpi(e, t) {
  if (e.size !== t.size) return !1;
  for (const n of e) if (!t.has(n)) return !1;
  return !0;
}

function eje(e) {
  if (typeof document > "u") return;
  $Ce.clear(), document.querySelectorAll(`${zQ}.${uP}`).forEach(n => {
    n.dataset.nodeId !== e && n.classList.remove(uP);
  });
  const t = document.querySelector(`.node-wrapper[data-node-id="${Slr(e)}"]`);
  t == null || t.classList.add(uP);
}

function Jpi(e) {
  e == null || e.classList.remove(uP);
}

function Zpi(e) {
  if (typeof document > "u") return;
  const t = new Set();
  document.querySelectorAll(`${zQ}.${uP}`).forEach(n => {
    const r = n.dataset.nodeId;
    if (!r || !e.has(r)) {
      n.classList.remove(uP);
      return;
    }
    t.add(r);
  }), e.forEach(n => {
    var r;
    t.has(n) || (r = document.querySelector(`.node-wrapper[data-node-id="${Slr(n)}"]`)) == null || r.classList.add(uP);
  });
}

function tje() {
  typeof document > "u" || document.querySelectorAll(`${zQ}.${uP}`).forEach(e => {
    e.classList.remove(uP);
  });
}

function emi(e) {
  return !!(e != null && e.clearNodes);
}

function tmi(e) {
  typeof document > "u" || (tje(), document.querySelectorAll(`${zQ}.node-selected-border, ${zQ}[data-node-selected="true"], ${zQ}.${uP}`).forEach(t => {
    t.classList.add(v_t), t.dataset.nodeId && $Ce.add(t.dataset.nodeId);
  }), document.querySelectorAll(Kpi).forEach(t => {
    t.setAttribute(w_t, "");
  }));
}

function nmi() {
  $Ce.clear(), !(typeof document > "u") && (document.querySelectorAll(`${zQ}.${v_t}`).forEach(e => {
    e.classList.remove(v_t);
  }), document.querySelectorAll(`[${w_t}]`).forEach(e => {
    e.removeAttribute(w_t);
  }));
}

function Dsn(e) {
  emi(e) && tmi();
}

function rmi(e, t) {
  return Xpi(e, t) ? e : (Zpi(t), t);
}

let ZF = null,
  _1e = new Set();

function j5(e) {
  _1e = e instanceof Set ? e : new Set(e);
}

function ami() {
  return _1e;
}

function Lsn(e, t = 500) {
  ZF = {
    nodeId: e,
    until: Date.now() + t
  };
}

function zb(e, t, n, r = 500, a) {
  if (!((a == null ? void 0 : a.forceSingle) === !0) && _1e.size > 1 && _1e.has(e)) {
    Lsn(e, r);
    return;
  }
  Lsn(e, r), eje(e), t == null || t(e), n == null || n(o => {
    if (o.size === 1 && o.has(e)) return o;
    const s = new Set([e]);
    return _1e = s, s;
  });
}

function Osn() {
  return !ZF || Date.now() > ZF.until ? (ZF = null, null) : ZF.nodeId;
}

function Iot(e) {
  ZF && (e && ZF.nodeId !== e || (ZF = null));
}

function imi(e, t) {
  return e && t >= 2;
}

function omi() {
  const [e, t] = g.useState(null),
    [n, r] = g.useState(() => new Set()),
    a = g.useCallback(f => {
      r(y => {
        const b = typeof f == "function" ? f(y) : f;
        if (b === y || b.size !== y.size) return b;
        const v = y.values();
        for (const _ of b) if (_ !== v.next().value) return b;
        return y;
      });
    }, []),
    [i, o] = g.useState(null),
    [s, l] = g.useState(!1),
    [d, u] = g.useState(!1),
    h = g.useRef(e),
    p = g.useRef(n),
    m = g.useRef(i);
  return h.current = e, p.current = n, m.current = i, g.useEffect(() => {
    j5(n);
  }, [n]), g.useEffect(() => {
    n.size === 0 && (l(!1), u(!1));
  }, [n.size]), {
    selectedNodeId: e,
    setSelectedNodeId: t,
    selectedNodeIds: n,
    setSelectedNodeIds: a,
    selectedNodeIdRef: h,
    selectedNodeIdsRef: p,
    selectedConnectionId: i,
    setSelectedConnectionId: o,
    selectedConnectionIdRef: m,
    showCollectionForBoxSelect: s,
    setShowCollectionForBoxSelect: l,
    showBoxSelectBounds: d,
    setShowBoxSelectBounds: u
  };
}

function smi(e, t) {
  return e || t != null;
}

function lmi(e, t, n) {
  return e && t != null && n;
}

function cmi() {
  const [e, t] = g.useState(!1),
    [n, r] = g.useState(null),
    a = g.useRef(!1);
  return {
    isSelecting: e,
    setIsSelecting: t,
    selectionBox: n,
    setSelectionBox: r,
    isSelectingRef: a
  };
}

function Ilr(e, t) {
  return e || !!t;
}

function x_t(e, t, n) {
  return Ilr(e, t) || !!n;
}

function dmi(e, t, n, r) {
  return e || x_t(t, n, r);
}

function umi(e, t) {
  return e || t;
}

function hmi(e, t, n, r) {
  return (e || t !== null) && !n && !r;
}

function pmi() {
  const [e, t] = g.useState(!1),
    [n, r] = g.useState(!1),
    [a, i] = g.useState(null),
    [o, s] = g.useState(null),
    [l, d] = g.useState(null);
  return {
    isPanning: e,
    setIsPanning: t,
    isDragging: n,
    setIsDragging: r,
    dragNodeId: a,
    setDragNodeId: i,
    resizingNodeId: o,
    setResizingNodeId: s,
    resizeDirection: l,
    setResizeDirection: d
  };
}

class vye extends Error {}

async function mmi(e, t) {
  const n = String(e.action || "").trim(),
    r = e.payload ?? {},
    a = NFn(n, r);
  if (!a.length) throw new Error(`无法映射到 CLI 命令：${n}`);
  const i = await t.run(a, {
    timeoutMs: 18e4
  });
  if (i.timedOut) throw new vye("CLI 超时，执行结果不确定；请核对画布后再重试。");
  if (!i.ok || i.code !== 0) throw new Error(i.stderr || "qiaodoumay CLI 执行失败");
  let o;
  try {
    o = JSON.parse(i.stdout);
  } catch {
    throw new vye("CLI 回执无法解析，执行结果不确定；请核对画布后再重试。");
  }
  if (!o || typeof o != "object" || Array.isArray(o)) throw new vye("CLI 回执不是合法对象，执行结果不确定。");
  if (o.ok === !1) throw new Error(o.error || "qiaodoumay CLI 返回失败");
  if (o.ok !== !0) throw new vye("CLI 回执缺少成功确认，执行结果不确定。");
  await t.delay(150), t.flush(), await t.delay(24);
  const s = o.data && typeof o.data == "object" && !Array.isArray(o.data) ? o.data : {};
  return {
    ok: !0,
    nodeId: typeof s.nodeId == "string" ? s.nodeId : void 0,
    count: typeof s.count == "number" ? s.count : void 0,
    nodeIds: Array.isArray(s.nodeIds) ? s.nodeIds : void 0,
    results: Array.isArray(s.results) ? s.results : void 0,
    deleted: s.deleted === !0,
    deletedNodeIds: Array.isArray(s.deletedNodeIds) ? s.deletedNodeIds : void 0,
    noChange: s.noChange === !0,
    hint: typeof s.hint == "string" ? s.hint : void 0,
    cliCommand: jFn(n, r)
  };
}

const fmi = new Set(["create_node", "gen_image", "create_gen_image", "create_image_series", "update_node", "delete_node", "cleanup_orphan_nodes", "connect_nodes", "connect_multi_refs", "batch_actions"]),
  gmi = {
    gen_image: "创建并生成图片",
    create_node: "创建节点",
    create_gen_image: "创建生成节点",
    create_image_series: "创建系列图片",
    update_node: "更新节点",
    delete_node: "删除节点",
    cleanup_orphan_nodes: "清理孤立节点",
    connect_nodes: "连接节点",
    connect_multi_refs: "连接多张参考图",
    batch_actions: "批量画布操作"
  };

function ymi(e, t, n, r) {
  return !n || !fmi.has(e) ? null : {
    action: e,
    actionKey: n,
    requestId: r,
    nodeId: String(t.nodeId || t.id || t.to || t.toNodeId || t.from || t.fromNodeId || `action-${n.split(":").pop() || e}`).trim(),
    label: gmi[e] || e
  };
}

function ez(e, t) {
  var n;
  if (!e.isCurrent()) throw new Error("画布项目已切换或正在加载，已停止本次命令的后续处理。");
  if ((((n = e.getActiveRun()) == null ? void 0 : n.id) ?? null) !== t) throw new Error("生产运行已切换，已停止本次命令的后续处理。");
}

function bmi(e, t, n) {
  const r = i => new Promise(o => window.setTimeout(o, i)),
    a = {
      session: n,
      projectId: e.projectId,
      isCurrent: t,
      getState: e.getState,
      getNodes: () => e.nodesRef.current,
      getConnections: () => e.connectionsRef.current,
      getActiveRun: bm,
      executeBuiltin: i => {
        var s;
        const o = ((s = bm()) == null ? void 0 : s.id) ?? null;
        return e.execute(i, {
          assertCurrent: () => ez(a, o)
        });
      },
      executeCli: i => {
        var s;
        const o = ((s = bm()) == null ? void 0 : s.id) ?? null;
        return mmi(i, {
          run: lRt,
          delay: r,
          flush: () => {
            ez(a, o), e.flushStateRef.current();
          }
        });
      },
      cliEnabled: RFn,
      delay: r,
      flush: () => {
        t() && e.flushStateRef.current();
      },
      lookupReceipt: fja,
      writeReceipt: HJn,
      captureBaseline: elr,
      recordMutation: Hui,
      enqueue: VZn,
      now: Date.now
    };
  return a;
}

function vmi(e = 100) {
  const t = new Map(),
    n = (r, a) => JSON.stringify([r, a]);
  return {
    get(r, a) {
      const i = a ? t.get(n(r, a)) : void 0;
      return i ? {
        ...i
      } : void 0;
    },
    set(r, a, i) {
      a && (t.set(n(r, a), {
        ...i
      }), t.size > e && t.delete(t.keys().next().value));
    }
  };
}

function Ife(e) {
  return {
    ...e,
    ...(e.referenceBindings ? {
      referenceBindings: e.referenceBindings.map(t => ({
        ...t
      }))
    } : {}),
    ...(e.nodeIds ? {
      nodeIds: [...e.nodeIds]
    } : {}),
    ...(e.submittedNodeIds ? {
      submittedNodeIds: [...e.submittedNodeIds]
    } : {}),
    ...(e.affectedNodeIds ? {
      affectedNodeIds: [...e.affectedNodeIds]
    } : {}),
    ...(e.deletedNodeIds ? {
      deletedNodeIds: [...e.deletedNodeIds]
    } : {}),
    ...(e.results ? {
      results: e.results.map(t => ({
        ...t
      }))
    } : {}),
    ...(e.actionResults ? {
      actionResults: e.actionResults.map(t => ({
        ...t
      }))
    } : {})
  };
}

function wmi() {
  const e = new WeakMap();
  return (t, n, r, a, i) => {
    let o = e.get(t);
    o || (o = {
      pending: new Map(),
      cache: vmi()
    }, e.set(t, o));
    const s = o.cache.get(n, r);
    if (s) return Promise.resolve(Ife(s));
    const l = r ? o.pending.get(r) : void 0;
    if (l) return l.then(Ife);
    let d;
    const u = new Promise(m => {
      d = m;
    });
    r && o.pending.set(r, u);
    const h = m => {
        r && m.cacheable && a() && o.cache.set(n, r, Ife(m.result)), o.pending.get(r) === u && o.pending.delete(r), d(Ife(m.result));
      },
      p = m => h({
        cacheable: !1,
        result: {
          ok: !1,
          error: m instanceof Error ? m.message : String(m)
        }
      });
    try {
      i().then(h, p);
    } catch (m) {
      p(m);
    }
    return u.then(Ife);
  };
}

function xmi(e, t) {
  const n = e.now(),
    r = (a, i, o) => {
      !t.requestId || !t.runId || e.writeReceipt({
        requestId: t.requestId,
        actionKey: t.actionKey || void 0,
        runId: t.runId,
        projectId: t.projectId,
        tool: "execute_canvas_action",
        action: t.action,
        status: a,
        startedAt: n,
        beforeRevision: (o == null ? void 0 : o.beforeRevision) ?? i,
        ...(o ? {
          finishedAt: e.now(),
          result: BJn(o),
          nodeIds: [...(o.affectedNodeIds ?? []), ...(o.nodeIds ?? []), ...(o.nodeId ? [o.nodeId] : [])],
          submittedNodeIds: o.submittedNodeIds,
          afterRevision: o.afterRevision,
          error: a === "failed" ? o.error : void 0
        } : {})
      });
    };
  return {
    start: a => r("started", a),
    finish: (a, i) => r(a.ok ? "succeeded" : "failed", i, a)
  };
}

function _mi(e) {
  const t = kJn();
  for (const n of e) {
    if (n.type !== "gen-image" && n.type !== "gen-video" || String(n.content || "").trim() || n.isGenerating) continue;
    t.lastGenNodeId = n.id, t.lastNodeId || (t.lastNodeId = n.id);
    const r = String(n.prompt || "").trim();
    r && (t.promptByNodeId[n.id] = r);
  }
  return t;
}

function hJe(e, t) {
  return ["gen_image", "run_generation", "execute_node", "create_image_series", "create_gen_image"].includes(e) ? !0 : e === "create_node" ? t.run === !0 || t.agentForceRun === !0 : e !== "batch_actions" || !Array.isArray(t.actions) ? !1 : t.actions.some(n => {
    if (!n || typeof n != "object" || Array.isArray(n)) return !1;
    const r = n,
      a = String(r.action || "").trim();
    return a !== "batch_actions" && hJe(a, _0(r));
  });
}

function kmi(e, t, n, r) {
  const a = AJn(t, n, {
    nodes: r
  });
  if (a.unresolved.length) return a;
  let i = a.payload;
  if (["gen_image", "run_generation", "execute_node", "update_node", "select_node"].includes(e) && !String(i.nodeId || i.id || "").trim()) {
    const o = n.lastGenNodeId || n.createdGenNodeIds[n.createdGenNodeIds.length - 1] || n.lastNodeId || n.createdNodeIds[n.createdNodeIds.length - 1];
    o && (i = {
      ...i,
      nodeId: o,
      id: o
    });
  }
  if (e === "connect_nodes" && (!String(i.to || i.toNodeId || "").trim() || !String(i.from || i.fromNodeId || "").trim())) {
    const o = String(i.from || i.fromNodeId || "").trim() || n.lastInputNodeId || n.createdNodeIds[0],
      s = String(i.to || i.toNodeId || "").trim() || n.lastGenNodeId || n.createdGenNodeIds[n.createdGenNodeIds.length - 1];
    o && s && (i = {
      ...i,
      from: o,
      to: s,
      fromNodeId: o,
      toNodeId: s
    });
  }
  return {
    payload: i,
    unresolved: []
  };
}

function Ami(e) {
  const t = Number(e.maxGenerationRuns);
  return Number.isFinite(t) && t >= 0 ? Math.floor(t) : null;
}

function Smi(e, t, n, r, a) {
  if (!r.ok) return;
  if (t === "create_image_series") {
    const s = r.nodeIds || (r.nodeId ? [r.nodeId] : []),
      l = new Map(a.map(d => [d.id, d]));
    for (const d of s) {
      const u = l.get(d);
      if (!u) continue;
      const h = {
        type: u.type
      };
      sJ(e, "execute_canvas_action", {
        action: "create_node"
      }, {
        ok: !0,
        nodeId: d
      }, () => h);
    }
    return;
  }
  const i = t === "gen_image" || t === "create_gen_image" ? "create_node" : t === "execute_node" ? "run_generation" : t,
    o = t === "gen_image" || t === "create_gen_image" ? {
      ...n,
      type: n.type || "gen-image"
    } : n;
  sJ(e, "execute_canvas_action", {
    action: i
  }, {
    ok: !0,
    nodeId: r.nodeId,
    targetNodeId: r.nodeId
  }, () => o);
}

function Imi(e, t, n) {
  if (n == null || !hJe(e, t)) return t;
  if (n <= 0) return null;
  if (e !== "create_image_series") return t;
  const r = ["prompts", "items", "variants", "regions"].find(a => Array.isArray(t[a]));
  return r ? {
    ...t,
    [r]: t[r].slice(0, n)
  } : t;
}

async function Cmi(e, t, n) {
  var i;
  ez(t, n);
  let r = !1;
  if (t.cliEnabled() && !hJe(String(e.action).trim(), e.payload ?? {})) try {
    return await t.executeCli(e);
  } catch (o) {
    if (ez(t, n), o instanceof vye) throw o;
    r = !0;
  }
  const a = await t.executeBuiltin(e);
  return t.isCurrent() && (((i = t.getActiveRun()) == null ? void 0 : i.id) ?? null) === n && (t.flush(), await t.delay(24)), r ? {
    ...a,
    cliFallback: !0
  } : a;
}

async function Emi(e, t, n) {
  const r = String(e.requestId || "").trim(),
    a = String(e.action || "").trim(),
    i = e.payload ?? {},
    o = (n == null ? void 0 : n.id) ?? null,
    s = t.projectId,
    l = n ? sja({
      runId: n.id,
      projectId: s,
      action: a,
      payload: i
    }) : "",
    d = xmi(t, {
      requestId: r,
      action: a,
      actionKey: l,
      runId: o,
      projectId: s
    });
  let u,
    h,
    p = !1;
  try {
    if (ez(t, o), n && (n.projectId ?? null) !== s) throw new Error("生产运行不属于当前画布项目。");
    const m = t.getState(),
      f = t.lookupReceipt(r, m, l);
    if (f) return {
      result: {
        ...f
      },
      cacheable: !1
    };
    u = m.stateVersion, d.start(u), p = !0;
    const y = async () => {
        ez(t, o);
        const _ = [...t.getNodes()],
          w = [...t.getConnections()];
        u = t.getState().stateVersion, o && t.captureBaseline(o, _, w, u ?? 0);
        const k = await Cmi(e, t, o);
        h = k, ez(t, o);
        const A = t.getState().stateVersion,
          S = o ? t.recordMutation({
            runId: o,
            beforeNodes: _,
            beforeConnections: w,
            afterNodes: t.getNodes(),
            afterConnections: t.getConnections(),
            afterRevision: A ?? u ?? 0
          }) : null;
        return {
          ...k,
          beforeRevision: u,
          afterRevision: A,
          affectedNodeIds: (S == null ? void 0 : S.affectedNodeIds) ?? k.affectedNodeIds
        };
      },
      b = ymi(a, i, l, r),
      v = b ? await t.enqueue(b, y) : await y();
    return h = v, ez(t, o), d.finish(v, u), {
      result: v,
      cacheable: !0
    };
  } catch (m) {
    const f = {
      ...h,
      ok: !1,
      error: m instanceof Error ? m.message : String(m)
    };
    return p && d.finish(f, u), {
      result: f,
      cacheable: !1
    };
  }
}

function Tmi(e, t) {
  const n = [...new Set(e.map(i => String(i).trim()).filter(Boolean))].slice(0, 4),
    r = [],
    a = [];
  for (const i of n) {
    const o = t.find(l => l.id === i),
      s = o && ["input-image", "preview", "gen-image"].includes(o.type) ? Ry(o).find(u7) : void 0;
    if (!o || !s) {
      a.push(i);
      continue;
    }
    r.push({
      nodeId: i,
      nodeName: typeof o.nodeName == "string" ? o.nodeName : void 0,
      url: s,
      assetId: cHe(o)
    });
  }
  return {
    assets: r,
    unavailableNodeIds: a
  };
}

function Mmi(e) {
  const t = g.useRef(e),
    n = g.useRef({}),
    r = g.useRef(!1);
  g.useLayoutEffect(() => {
    t.current = e;
  }), g.useLayoutEffect(() => {
    n.current = {};
  }, [e.projectId, e.projectLoading]);
  const [a] = g.useState(wmi),
    [i] = g.useState(() => ({
      getState: () => t.current.getState(),
      executeAction: o => {
        const s = t.current,
          l = n.current,
          d = s.projectId,
          u = () => r.current && !t.current.projectLoading && n.current === l && t.current.projectIdRef.current === d;
        if (!u()) return Promise.resolve({
          ok: !1,
          error: "画布项目尚未就绪，请稍后重试。"
        });
        const h = bmi(s, u, l),
          p = h.getActiveRun(),
          m = String(o.requestId || "").trim(),
          f = m ? JSON.stringify([(p == null ? void 0 : p.id) ?? null, m]) : "";
        return a(l, d, f, u, () => Emi(o, h, p));
      },
      getCapabilities: () => t.current.capabilitiesRef.current,
      resolveVisionAssets: async o => Tmi(o, t.current.nodesRef.current),
      setRedesignDirectionGate: o => {
        t.current.redesignGateRef.current = o;
      },
      isRedesignDirectionGateActive: () => t.current.redesignGateRef.current
    }));
  g.useEffect(() => {
    r.current = !0;
    const o = t.current.bridgeRef;
    return o.current = i, () => {
      r.current = !1, n.current = {}, o.current === i && (o.current = null);
    };
  }, [i]);
}

function Pmi(e) {
  const t = new Map();
  let n = !0,
    r = 0;
  return {
    activate() {
      n = !0;
    },
    execute(a) {
      const i = String((a == null ? void 0 : a.runId) || "").trim();
      if (!n || !i) return;
      const o = e(),
        s = o.document.lease();
      if (!s.isCurrent()) {
        o.error("画布项目尚未就绪，暂不能撤销生产变化");
        return;
      }
      const l = o.prepare({
        runId: i,
        currentNodes: o.nodes(),
        currentConnections: o.connections(),
        currentRevision: o.revision(),
        expectedRevision: a == null ? void 0 : a.expectedRevision
      });
      if (!l.ok) {
        o.error(l.message, l.reason === "canvas_changed" ? 8e3 : 4e3);
        return;
      }
      o.commit(l.nodes, l.connections), o.invalidate();
      const d = r,
        u = o.schedule(() => {
          t.delete(u), n && d === r && s.isCurrent() && o.flush();
        });
      t.set(u, o);
      const h = l.restoredNodeIds.length + l.removedNodeIds.length + l.restoredConnectionIds.length + l.removedConnectionIds.length;
      o.success(`已撤销本次生产变化（${h} 项）`), o.applied(i, h);
    },
    dispose() {
      n = !1, r++;
      for (const [a, i] of t) i.cancel(a);
      t.clear();
    }
  };
}

function Rmi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => Pmi(() => {
    const r = t.current;
    return {
      document: r.document,
      nodes: () => r.nodesRef.current,
      connections: () => r.connectionsRef.current,
      revision: r.readRevision,
      prepare: qui,
      commit: (a, i) => {
        r.nodesRef.current = a, r.connectionsRef.current = i, r.setNodes(a), r.setConnections(i);
      },
      invalidate: r.invalidate,
      flush: () => r.flushRef.current(),
      success: r.success,
      error: r.error,
      schedule: a => window.setTimeout(a, 0),
      cancel: a => window.clearTimeout(a),
      applied: (a, i) => window.dispatchEvent(new CustomEvent("productionRunUndoApplied", {
        detail: {
          runId: a,
          changedCount: i
        }
      }))
    };
  }));
  g.useEffect(() => {
    n.activate();
    const r = a => n.execute(a.detail);
    return window.addEventListener("productionRunUndoRequested", r), () => {
      n.dispose(), window.removeEventListener("productionRunUndoRequested", r);
    };
  }, [n]);
}

function Nmi(e, t) {
  const n = e,
    r = t;
  for (const a of Object.keys(n)) if (a !== "progress" && !Object.is(n[a], r[a])) return !1;
  for (const a of Object.keys(r)) if (a !== "progress" && !Object.is(n[a], r[a])) return !1;
  return !0;
}

function jmi(e, t) {
  if (e === t || e.length !== t.length) return !1;
  let n = !1;
  for (let r = 0; r < e.length; r += 1) {
    const a = e[r],
      i = t[r];
    if (a !== i) {
      if (String(a.id) !== String(i.id) || a.status !== "generating" || i.status !== "generating" || !Nmi(a, i)) return !1;
      Object.is(a.progress, i.progress) || (n = !0);
    }
  }
  return n;
}

function Dmi(e, t, n, r) {
  const a = [],
    i = [],
    o = [];
  if (t === e) return {
    next: e,
    runtime: a,
    removed: i,
    duplicates: o
  };
  if (jmi(e, t) && !t.some(nce)) {
    for (let p = 0; p < t.length; p++) Object.is(e[p].progress, t[p].progress) || a.push(t[p]);
    return {
      next: e,
      runtime: a,
      removed: i,
      duplicates: o
    };
  }
  const s = new Map(e.map(p => [String(p.id), p])),
    l = new Set(),
    d = [];
  for (const p of r.heal(t)) {
    if (l.has(p.id)) {
      o.push(p.id);
      continue;
    }
    l.add(p.id);
    const m = s.get(String(p.id)),
      f = (m == null ? void 0 : m.generationTime) || p.generationTime,
      y = m && oWe(m) && (m.durationMs !== p.durationMs || f !== p.generationTime) ? {
        ...p,
        durationMs: m.durationMs,
        generationTime: f
      } : p;
    d.push(y), (!m || m.status !== y.status || m.progress !== y.progress || m.errorMsg !== y.errorMsg || m.remoteTaskId !== y.remoteTaskId || m.sourceNodeId !== y.sourceNodeId) && a.push(y);
  }
  const u = r.open(),
    h = u ? d : r.pack(d);
  if (n === "update" && u && h.length < e.length) {
    const p = new Set(h.map(m => String(m.id)));
    i.push(...e.filter(m => !p.has(String(m.id))));
  }
  return {
    next: h,
    runtime: a,
    removed: i,
    duplicates: o
  };
}

function Lmi(e) {
  let t = !0;
  return {
    activate() {
      t = !0;
    },
    write(n, r = "update") {
      if (!t) return;
      const a = e.current.current,
        i = typeof n == "function" ? n(a) : n,
        o = Dmi(a, i, r, e);
      o.next !== a && (e.current.current = o.next, e.publish(o.next)), e.sync(o.runtime), e.deleted(o.removed);
      for (const s of o.duplicates) e.duplicate(s);
    },
    dispose() {
      t = !1;
    }
  };
}

function Omi(e) {
  const t = new Map();
  let n = !0,
    r = !1,
    a = 0;
  return {
    activate() {
      n = !0;
    },
    enqueue(i) {
      if (!n || !i.length) return;
      for (const s of i) t.set(String(s.id), s);
      if (r) return;
      r = !0;
      const o = a;
      e.defer(() => {
        if (!n || o !== a) return;
        r = !1;
        const s = [...t.values()];
        t.clear();
        for (const l of s) try {
          e.sync(l);
        } catch (d) {
          e.report(d);
        }
      });
    },
    dispose() {
      n = !1, a++, r = !1, t.clear();
    }
  };
}

function Bmi(e) {
  const t = new Map();
  let n = !0,
    r = !1,
    a = !1,
    i = 0,
    o = null;
  const s = () => {
      o !== null && e.cancel(o), o = null;
    },
    l = () => {
      if (t.size) try {
        const u = [...t.values()];
        e.markIds(u.map(h => String(h.id))), e.markUrls(u), t.clear();
      } catch (u) {
        e.report(u);
      }
    },
    d = async () => {
      if (s(), !!r) {
        l(), r = t.size > 0;
        try {
          await e.persistLatest();
        } catch (u) {
          r = !0, e.report(u);
        }
      }
    };
  return {
    activate() {
      n = !0;
    },
    enqueue(u) {
      if (!(!n || !u.length)) {
        for (const h of u) t.set(String(h.id), h);
        if (r = !0, !a) {
          a = !0;
          const h = i;
          e.defer(() => {
            !n || h !== i || (a = !1, l());
          });
        }
        s(), o = e.schedule(() => {
          d();
        }, 700);
      }
    },
    flush: d,
    dispose() {
      d(), n = !1, i++, a = !1, s();
    }
  };
}

function Cot(e, t) {
  return e === t || !(e != null && e.length) && !(t != null && t.length) ? !0 : !!e && !!t && e.length === t.length && e.every((n, r) => n === t[r]);
}

function Fmi(e, t) {
  const n = new Map(e.map(i => [String(i.id), i])),
    r = t.filter(i => {
      if (i.status !== "completed" && i.status !== "failed") return !1;
      const o = n.get(String(i.id));
      return (o == null ? void 0 : o.status) !== "completed" && (o == null ? void 0 : o.status) !== "failed";
    }),
    a = r.length > 0 || t.length !== e.length || t.some(i => {
      var s, l, d, u;
      const o = n.get(String(i.id));
      return o ? o.status !== i.status || o.url !== i.url || o.thumbnailUrl !== i.thumbnailUrl || o.videoPosterUrl !== i.videoPosterUrl || o.errorMsg !== i.errorMsg || String(o.remoteTaskId || "") !== String(i.remoteTaskId || "") || String(o.falModelPath || "") !== String(i.falModelPath || "") || ((s = o.apiConfig) == null ? void 0 : s.modelId) !== ((l = i.apiConfig) == null ? void 0 : l.modelId) || ((d = o.apiConfig) == null ? void 0 : d.baseUrl) !== ((u = i.apiConfig) == null ? void 0 : u.baseUrl) || o.mjNeedsSplit !== i.mjNeedsSplit || o._assetId !== i._assetId || o._ossThumbnailUrl !== i._ossThumbnailUrl || o._ossRemoteUrl !== i._ossRemoteUrl || !Cot(o.mjImages, i.mjImages) || !Cot(o.mjThumbnails, i.mjThumbnails) || !Cot(o._mjAssetIds, i._mjAssetIds) : !0;
    });
  return {
    terminal: r,
    changed: a
  };
}

function zmi(e) {
  let t = !0,
    n = null,
    r = null,
    a = null,
    i = !1;
  const o = new Map(),
    s = () => {
      n !== null && e.cancel(n), n = null;
    },
    l = u => {
      i = !0;
      for (const h of u) o.set(String(h.id), h);
      return a || (a = (async () => {
        for (; i;) {
          i = !1;
          const h = [...o.values()];
          o.clear();
          try {
            await e.migrate(), await e.persist(e.filter(h));
          } catch (p) {
            if (p instanceof DOMException && (p.name === "QuotaExceededError" || p.code === 22)) try {
              await e.persist(e.filter(h));
            } catch (m) {
              e.report(m);
            } else e.report(p);
          }
        }
      })().finally(() => {
        if (a = null, i) return l([]);
      }), a);
    },
    d = () => {
      if (n = null, !t || !r) return;
      if (e.interacting()) {
        n = e.schedule(d, e.delay);
        return;
      }
      const u = r;
      r = null, l(u);
    };
  return {
    activate() {
      t = !0;
    },
    observe(u, h, p) {
      if (!t || !p) return;
      const m = Fmi(u, h);
      m.changed && (r = h, s(), n = e.schedule(d, e.delay), m.terminal.length && l(m.terminal));
    },
    flush(u, h) {
      return !t || !h ? Promise.resolve() : (s(), r = null, l(u));
    },
    dispose() {
      t = !1, s(), r = null;
    }
  };
}

function Umi(e, t, n) {
  const r = g.useRef(e),
    [a] = g.useState(() => zmi({
      delay: V4e.DEBOUNCE_DELAY.STORAGE_SAVE,
      interacting: Yi,
      schedule: (i, o) => window.setTimeout(i, o),
      cancel: i => window.clearTimeout(i),
      migrate: l9,
      filter: Z2,
      persist: NP,
      report: i => console.error("[History] 保存生成历史失败:", i)
    }));
  return g.useEffect(() => {
    a.activate();
    let i = !1;
    const o = () => {
      i || !n.current || (i = !0, a.flush(t.current, !0));
    };
    return window.addEventListener("pagehide", o), window.addEventListener("beforeunload", o), () => {
      window.removeEventListener("pagehide", o), window.removeEventListener("beforeunload", o), a.dispose();
    };
  }, [a, t, n]), g.useEffect(() => {
    n.current && (a.observe(r.current, e, !0), r.current = e);
  }, [a, e, n]), g.useEffect(() => gVe(() => a.flush(t.current, n.current)), [a, t, n]), a;
}

function $mi(e) {
  const t = g.useRef(e);
  g.useEffect(() => {
    const n = t.current;
    if (t.current = e, n === e || !n.length || !e.length) return;
    const r = new Map(n.map(o => [String(o.id), o])),
      a = e.filter(o => {
        const s = r.get(String(o.id));
        return (s == null ? void 0 : s.status) === "generating" && o.status === "completed" && nce(s);
      });
    if (!a.length) return;
    const i = window.setTimeout(() => {
      for (const o of a) window.dispatchEvent(new CustomEvent("genHistoryTaskTerminal", {
        detail: {
          taskId: o.id,
          status: "completed",
          progress: 100
        }
      }));
    }, 0);
    return () => window.clearTimeout(i);
  }, [e]);
}

function Gmi() {
  const [e, t] = g.useState([]),
    n = g.useRef(e),
    r = g.useRef(!1),
    a = Umi(e, n, r),
    [i] = g.useState(() => Omi({
      defer: u => queueMicrotask(u),
      sync: u => al.syncHistoryItem(u),
      report: u => console.warn("[History] 运行态同步失败:", u)
    })),
    [o] = g.useState(() => Bmi({
      defer: u => queueMicrotask(u),
      schedule: (u, h) => window.setTimeout(u, h),
      cancel: u => window.clearTimeout(u),
      markIds: CZ,
      markUrls: oKe,
      persistLatest: () => a.flush(n.current, r.current),
      report: u => console.warn("[History] 删除保存失败:", u)
    })),
    [s] = g.useState(() => Lmi({
      current: n,
      publish: t,
      open: KX,
      heal: cWe,
      pack: HHe,
      sync: i.enqueue,
      deleted: o.enqueue,
      duplicate: u => {}
    }));
  g.useLayoutEffect(() => {
    s.activate(), i.activate(), o.activate();
    const u = () => {
      o.flush();
    };
    return window.addEventListener("pagehide", u), window.addEventListener("beforeunload", u), () => {
      window.removeEventListener("pagehide", u), window.removeEventListener("beforeunload", u), s.dispose(), i.dispose(), o.dispose();
    };
  }, [s, i, o]), $mi(e);
  const l = g.useCallback(u => s.write(h => N4e(typeof u == "function" ? u(h) : u, h), "update"), [s]),
    d = g.useCallback(u => s.write(h => (typeof u == "function" ? u(h) : u).filter(Nx), "storage"), [s]);
  return {
    history: e,
    historyRef: n,
    historyHydratedRef: r,
    setHistory: l,
    setHistoryFromStorage: d
  };
}

function Vmi(e, t, n, r) {
  const a = r.zoom || 1;
  return {
    worldX: n ? (e - n.left - r.x) / a : 0,
    worldY: n ? (t - n.top - r.y) / a : 0
  };
}

function Hmi(e, t) {
  return {
    ...e,
    ...t,
    id: e.id,
    _assetId: t._assetId || e._assetId || e.id,
    thumbnailUrl: t.thumbnailUrl || e.thumbnailUrl,
    url: t.url || e.url
  };
}

function Bsn(e, t, n) {
  const r = t.find(l => l.id === e);
  if (!r) return null;
  const a = Gk(r, n),
    i = [...(r.nodeIds.length ? r.nodeIds : Wae(r, n))],
    o = new Map(n.map(l => [l.id, l])),
    s = new Map();
  for (const l of i) {
    const d = o.get(l);
    d && s.set(l, {
      x: d.x,
      y: d.y
    });
  }
  return {
    groupId: e,
    nodeIds: i,
    positions: s,
    frame: a
  };
}

function Wmi(e, t, n) {
  const r = Number.isFinite(n) && n > 0 ? n : 1;
  return {
    x: (t.x - e.x) / r,
    y: (t.y - e.y) / r
  };
}

function Clr(e, t) {
  return {
    ...e.frame,
    x: e.frame.x + t.x,
    y: e.frame.y + t.y
  };
}

function qmi(e, t, n) {
  let r = !1;
  const a = e.map(i => {
    const o = t.positions.get(i.id);
    if (!o) return i;
    const s = o.x + n.x,
      l = o.y + n.y;
    return i.x === s && i.y === l ? i : (r = !0, {
      ...i,
      x: s,
      y: l
    });
  });
  return r ? a : e;
}

function Kmi(e, t, n, r) {
  const a = Clr(t, n);
  return e.map(i => i.id === t.groupId ? {
    ...i,
    frameX: a.x,
    frameY: a.y,
    frameWidth: a.width,
    frameHeight: a.height,
    updatedAt: r
  } : i);
}

function Qmi(e, t, n) {
  return {
    begin() {
      if (!t.length) return;
      for (const [a, i] of e.positions) R1(a, i.x, i.y);
      const r = n();
      fxe(e.nodeIds, t, r.svg, r.endpoints, r.intraGroupIds, {
        zoom: r.view.zoom,
        startPositions: e.positions
      });
    },
    move(r) {
      const a = n();
      t.length && a.svg && qae(t, a.view, a.svg, r, a.endpoints);
    },
    finish(r, a) {
      const i = n();
      if (!a) {
        for (const o of i.nodes) R1(o.id, o.x, o.y);
        gxe(i.connections, i.view, i.svg, i.endpoints, i.intraGroupIds);
        return;
      }
      for (const [o, s] of e.positions) R1(o, s.x + r.x, s.y + r.y);
      gxe(t, i.view, i.svg, i.endpoints, i.intraGroupIds);
    },
    restore(r) {
      const a = n();
      $Et(r ? t : a.connections, a.view, a.svg, a.endpoints, void 0, a.intraGroupIds);
    }
  };
}

function Ymi(e, t) {
  let n = !1,
    r = e,
    a = null,
    i = null;
  const o = () => Wmi(e, r, t.zoom()),
    s = d => {
      try {
        d();
      } catch (u) {
        t.report(u);
      }
    },
    l = d => {
      if (n) return;
      n = !0, a !== null && (s(() => t.cancelFrame(a)), a = null), i !== null && (s(() => t.cancelLater(i)), i = null);
      const u = t.current(),
        h = d && u ? o() : {
          x: 0,
          y: 0
        };
      let p = !1;
      try {
        u && t.paint(h), d && u && (t.commit(h), p = !0);
      } catch (m) {
        t.report(m);
      } finally {
        try {
          s(() => t.cleanup(h, p, u));
        } finally {
          s(t.release);
        }
      }
    };
  return {
    finish: l,
    move(d) {
      if (!n) {
        if (!t.current()) {
          l(!1);
          return;
        }
        r = d, a === null && (a = t.frame(() => {
          if (a = null, !n) {
            if (!t.current()) {
              l(!1);
              return;
            }
            try {
              const u = o();
              t.paint(u), t.edges(u);
            } catch (u) {
              t.report(u), l(!1);
            }
          }
        }));
      }
    },
    pointerReleased(d) {
      (d & 1) === 0 && l(!0);
    },
    blur() {
      !n && i === null && (i = t.later(() => {
        i = null, l(!0);
      }));
    }
  };
}

const Xmi = {
  find: (e, t) => {
    const n = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(t) : t.replace(/["\\]/g, "\\$&");
    return document.querySelector(`[${e}="${n}"]`);
  },
  transform: e => window.getComputedStyle(e).transform
};

function Jmi(e, t = Xmi) {
  const n = new Map();
  let r;
  const a = l => {
      const d = n.get(l);
      if (d != null && d.isConnected && d.getAttribute("data-node-id") === l) return d;
      const u = t.find("data-node-id", l);
      return u ? n.set(l, u) : n.delete(l), u;
    },
    i = l => {
      if (r !== void 0) return r;
      const u = l.style.transform.trim() || t.transform(l);
      return r = u === "none" ? "" : u, r;
    },
    o = () => ({
      background: t.find("data-group-frame-bg", e.groupId),
      border: t.find("data-group-frame", e.groupId),
      toolbar: t.find("data-group-toolbar-wrap", e.groupId)
    }),
    s = (l, d) => {
      l && (l.style.willChange !== "transform" && (l.style.willChange = "transform"), l.style.transform = d);
    };
  return {
    restoreDocument(l, d) {
      const u = new Map(l.map(p => [p.id, p]));
      for (const p of e.positions.keys()) {
        const m = u.get(p),
          f = a(p);
        m && f && (f.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`);
      }
      const h = o().toolbar;
      h && d && Swt(h, d);
    },
    paint(l) {
      for (const [m, f] of e.positions) s(a(m), `translate3d(${f.x + l.x}px, ${f.y + l.y}px, 0)`);
      const {
          background: d,
          border: u,
          toolbar: h
        } = o(),
        p = `translate3d(${l.x}px, ${l.y}px, 0)`;
      if (s(d, p), s(u, p), h) {
        const m = i(h);
        s(h, m ? `${p} ${m}` : p);
      }
    },
    cleanup(l, d, u) {
      for (const f of e.nodeIds) {
        const y = a(f);
        y && (y.style.willChange = "");
      }
      const {
        background: h,
        border: p,
        toolbar: m
      } = o();
      for (const f of [h, p]) f && (f.style.willChange = "", f.style.transform = "");
      m && (m.style.willChange = "", d ? Swt(m, Clr(e, l)) : u && (m.style.transform = r ?? "")), n.clear();
    }
  };
}

function Zmi(e, t, n) {
  var h;
  const r = Jmi(e),
    a = ["canvas-node-dragging", "canvas-box-select-group-dragging"];
  let i = !1;
  const o = Ymi(t, {
      frame: p => window.requestAnimationFrame(p),
      cancelFrame: p => window.cancelAnimationFrame(p),
      later: p => window.setTimeout(p, 0),
      cancelLater: p => window.clearTimeout(p),
      zoom: n.zoom,
      current: n.current,
      paint: r.paint,
      edges: n.edges.move,
      commit: n.commit,
      report: n.report,
      cleanup: (p, m, f) => {
        try {
          if (!f) {
            const y = n.readLayout();
            r.restoreDocument(y.nodes, y.frame);
          }
          r.cleanup(p, m, f);
        } finally {
          n.edges.finish(p, f);
        }
      },
      release: () => {
        var p;
        window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", l), window.removeEventListener("pointerup", d), window.removeEventListener("pointercancel", d), window.removeEventListener("blur", u);
        try {
          i && (i = !1, lU()), d7(), document.body.classList.remove(...a), (p = document.getElementById("canvas-bg")) == null || p.classList.remove(...a), oM(), n.edges.restore(n.current());
        } finally {
          n.release();
        }
      }
    }),
    s = p => o.move({
      x: p.clientX,
      y: p.clientY
    }),
    l = () => o.finish(!0),
    d = p => o.pointerReleased(p.buttons),
    u = () => o.blur();
  try {
    n.edges.begin(), i = !0, Aj(), cU(e.nodeIds), document.body.classList.add(...a), (h = document.getElementById("canvas-bg")) == null || h.classList.add(...a), window.addEventListener("mousemove", s, {
      passive: !0
    }), window.addEventListener("mouseup", l, {
      passive: !0
    }), window.addEventListener("pointerup", d, {
      passive: !0
    }), window.addEventListener("pointercancel", d, {
      passive: !0
    }), window.addEventListener("blur", u);
  } catch (p) {
    n.report(p), o.finish(!1);
  }
  return o;
}

function efi(e) {
  const t = g.useRef(e),
    n = g.useRef(null),
    r = g.useRef(0),
    a = g.useRef(null),
    i = g.useRef(null),
    o = () => {
      i.current !== null && window.cancelAnimationFrame(i.current), i.current = null;
    };
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const s = g.useCallback(() => {
    var d;
    (d = n.current) == null || d.finish(!1), n.current = null;
  }, []);
  return g.useLayoutEffect(() => {
    const d = e.document.subscribe(s);
    return () => {
      d(), s(), r.current++, o(), a.current !== null && window.clearTimeout(a.current), a.current = null, t.current.isDraggingGroupRef.current = !1;
    };
  }, [e.document, s]), {
    startGroupDragAtPoint: g.useCallback((d, u, h) => {
      const p = ++r.current;
      s(), a.current !== null && window.clearTimeout(a.current), a.current = null;
      const m = t.current,
        f = m.document.lease();
      m.isDraggingGroupRef.current = !0, m.stopPanning();
      const y = Bsn(d, m.groupsRef.current, m.nodesRef.current);
      if (!y || !f.isCurrent()) {
        m.isDraggingGroupRef.current = !1;
        return;
      }
      let b = m.groupsRef.current,
        v = !0;
      const _ = () => f.isCurrent() ? (b !== m.groupsRef.current && (b = m.groupsRef.current, v = b.some(I => I.id === d)), v) : !1,
        w = m.connectionsRef.current.length ? m.connectionsRef.current : m.visibleConnectionsRef.current,
        k = w.length > 0,
        A = Qmi(y, w, () => ({
          view: m.viewRef.current,
          svg: m.svgContainerRef.current,
          endpoints: m.collectionEndpointsRef.current,
          intraGroupIds: m.intraGroupConnectionIdsRef.current,
          nodes: m.nodesRef.current,
          connections: m.connectionsRef.current
        }));
      let S = !1;
      const C = Zmi(y, {
        x: u,
        y: h
      }, {
        edges: A,
        current: _,
        zoom: () => m.viewRef.current.zoom,
        readLayout: () => {
          var I;
          return {
            nodes: m.nodesRef.current,
            frame: (I = Bsn(d, m.groupsRef.current, m.nodesRef.current)) == null ? void 0 : I.frame
          };
        },
        commit: I => {
          const E = Date.now();
          Da.flushSync(() => {
            m.setNodes(M => _() ? qmi(M, y, I) : M), m.setGroups(M => _() ? Kmi(M, y, I, E) : M);
          });
        },
        release: () => {
          var I;
          S = !0, n.current = null, o(), k && ((I = m.setMountTick) == null || I.call(m, E => E + 1)), a.current = window.setTimeout(() => {
            r.current === p && (a.current = null, m.isDraggingGroupRef.current = !1);
          }, 0);
        },
        report: I => console.warn("[GroupDrag] 分组拖拽异常:", I)
      });
      S || (n.current = C, k && m.setMountTick && (o(), i.current = window.requestAnimationFrame(() => {
        var I, E;
        i.current = null, n.current === C && ((E = (I = t.current).setMountTick) == null || E.call(I, M => M + 1));
      })));
    }, [s]),
    cancelActiveGroupDrag: s
  };
}

function tfi(e) {
  e.selection.setSelectedNodeId(null), e.selection.setSelectedNodeIds(new Set()), e.selection.setShowCollectionForBoxSelect(!1), e.selection.setShowBoxSelectBounds(!1), e.selection.setSelectedGroupId(e.groupId), e.startGroupDragAtPoint(e.groupId, e.clientX, e.clientY);
}

function nfi(e) {
  return g.useCallback((t, n, r) => {
    tfi({
      groupId: t,
      clientX: n,
      clientY: r,
      selection: {
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        setSelectedGroupId: e.setSelectedGroupId,
        setShowCollectionForBoxSelect: e.setShowCollectionForBoxSelect,
        setShowBoxSelectBounds: e.setShowBoxSelectBounds
      },
      startGroupDragAtPoint: e.startGroupDragAtPoint
    });
  }, [e.startGroupDragAtPoint]);
}

function Elr(e, t) {
  return e.status === "generating" || t.status === "generating" ? e : xP(e) && !xP(t) ? {
    ...t,
    mjImages: e.mjImages,
    mjThumbnails: e.mjThumbnails || t.mjThumbnails,
    selectedMjImageIndex: e.selectedMjImageIndex ?? 0,
    _ossRemoteUrl: e._ossRemoteUrl || t._ossRemoteUrl,
    originalUrl: e.originalUrl || t.originalUrl,
    mjOriginalUrl: e.mjOriginalUrl || t.mjOriginalUrl,
    _globalOssUrlOnly: !0,
    ossUploaded: !0,
    remoteTaskId: e.remoteTaskId || t.remoteTaskId,
    apiConfig: e.apiConfig || t.apiConfig
  } : e.remoteTaskId && !t.remoteTaskId || e.apiConfig && !t.apiConfig ? {
    ...t,
    remoteTaskId: e.remoteTaskId || t.remoteTaskId,
    apiConfig: e.apiConfig || t.apiConfig
  } : t;
}

function Fsn(e, t, n = !1, r) {
  const a = new Map(e.map(o => [String(o.id), o]));
  let i = !1;
  for (const o of t) {
    const s = String(o.id || "").trim(),
      l = a.get(s);
    if (!s || l === o || n && l || r != null && r.has(s) && !l) continue;
    const d = l ? Elr(l, o) : u3(o);
    d !== l && (a.set(s, d), i = !0);
  }
  return i ? Iv([...a.values()]) : e;
}

function rfi(e, t, n) {
  const r = new Map(t.map(i => [String(i.id), i]));
  let a = !1;
  for (const i of e) {
    const o = String(i.id),
      s = r.get(o);
    if (s) {
      const l = Elr(i, s);
      l !== s && xP(i) && !xP(s) && (a = !0), r.set(o, l);
    } else (i.status === "generating" || !(n != null && n.has(o)) || n.get(o) !== i || i.type === "audio" && (i._globalOssUrlOnly || i.ossUploaded) && i.status === "completed") && r.set(o, i);
  }
  if (n) {
    const i = new Set(e.map(o => String(o.id)));
    for (const o of n.keys()) i.has(o) || r.delete(o);
  }
  return {
    items: Iv([...r.values()]),
    repairedMjFromMemory: a
  };
}

function afi(e) {
  let t = 0,
    n = !1,
    r = !1,
    a = !1,
    i = 0,
    o = !1;
  const s = () => {
      t++, r = !1, a = !1, i = 0, o = !1, e.hasMore(!1);
    },
    l = () => {
      const p = t,
        m = e.mode();
      return {
        mode: m,
        current: () => n && p === t && e.mode() === m
      };
    },
    d = p => {
      o = p, e.hasMore(p);
    },
    u = async () => {
      if (!n || !e.open() || !e.hydrated.current || r || a) return;
      const p = l(),
        m = () => p.current() && e.open();
      r = !0;
      const f = new Map(e.read().map(y => [String(y.id), y]));
      try {
        if (await e.yieldMain(), !m()) return;
        const y = new Map();
        let b = 0,
          v = !1;
        for (let _ = 0; _ < 100; _++) {
          if (await e.idle(), !m()) return;
          const w = await e.page(p.mode, b, 200);
          if (!m()) return;
          const k = [];
          for (const A of w.items) {
            const S = String(A.id || "").trim();
            !S || y.has(S) || (y.set(S, A), k.push(A));
          }
          if (k.length && e.commit(A => Fsn(A, k, !1, f), m), b = w.offset + w.limit, v = w.hasMore, !v || w.items.length === 0) break;
          if (await e.yieldMain(), !m()) return;
        }
        if (!m()) return;
        if (y.size) {
          if (await e.idle(), !m()) return;
          const _ = e.heal([...y.values()], m);
          if (await e.yieldMain(), !m()) return;
          e.commit(w => {
            const k = rfi(w, _, f);
            return k.repairedMjFromMemory && e.repaired(k.items, m), k.items;
          }, m);
        }
        i = b, d(v), a = !0;
      } catch (y) {
        m() && e.error(y);
      } finally {
        p.current() && (r = !1);
      }
    },
    h = async p => {
      const m = l();
      r = !0;
      try {
        const f = await e.cold(m.mode, p);
        if (!m.current()) return;
        e.commit(y => {
          const b = new Map(f.items.map(_ => [String(_.id), _]));
          for (const _ of y) (p || _.status === "generating") && b.set(String(_.id), _);
          const v = Iv([...b.values()]);
          return e.open() ? v : e.pack(v);
        }, m.current), e.hydrated.current = !0, i = f.offset + f.limit, d(f.hasMore);
      } catch (f) {
        m.current() && e.error(f);
      } finally {
        m.current() && (r = !1, e.open() && e.hydrated.current && u());
      }
    };
  return {
    start() {
      return n = !0, s(), h(!e.hydrated.current);
    },
    async modeChanged() {
      if (n) return s(), h(!e.hydrated.current);
    },
    openChanged() {
      if (e.hydrated.current) if (s(), e.open()) u();else {
        const p = l();
        e.commit(m => e.pack(m), p.current);
      }
    },
    async loadMore() {
      if (!n || !e.open() || !e.hydrated.current || !o || r) return;
      const p = l(),
        m = () => p.current() && e.open();
      r = !0;
      try {
        if (await e.idle(), !m()) return;
        const f = await e.page(p.mode, i, 200);
        if (!m()) return;
        e.commit(y => Fsn(y, f.items, !0), m), i = f.offset + f.limit, d(f.hasMore);
      } catch (f) {
        m() && e.error(f);
      } finally {
        p.current() && (r = !1);
      }
    },
    dispose() {
      n = !1, t++, r = !1;
    }
  };
}

async function Tlr(e, t, n) {
  const {
      loadHistoryPage: r
    } = await Ie(async () => {
      const {
        loadHistoryPage: o
      } = await Promise.resolve().then(() => Gu);
      return {
        loadHistoryPage: o
      };
    }, void 0, import.meta.url),
    {
      sanitizeHistoryItemOnLoad: a
    } = await Ie(async () => {
      const {
        sanitizeHistoryItemOnLoad: o
      } = await Promise.resolve().then(() => ii);
      return {
        sanitizeHistoryItemOnLoad: o
      };
    }, void 0, import.meta.url),
    i = await r({
      storageMode: e,
      offset: t,
      limit: n
    });
  return {
    ...i,
    items: cWe(i.items.map(a))
  };
}

async function ifi(e, t) {
  if (!t) return Tlr(e, 0, $K);
  let n = [],
    r = {
      items: n,
      offset: 0,
      limit: $K,
      hasMore: !1,
      total: 0
    };
  try {
    const {
      ensureHistorySqliteMigrated: a,
      loadHistoryPage: i,
      loadHistoryFromAllSources: o
    } = await Ie(async () => {
      const {
        ensureHistorySqliteMigrated: s,
        loadHistoryPage: l,
        loadHistoryFromAllSources: d
      } = await Promise.resolve().then(() => Gu);
      return {
        ensureHistorySqliteMigrated: s,
        loadHistoryPage: l,
        loadHistoryFromAllSources: d
      };
    }, void 0, import.meta.url);
    if (await a(), r = await i({
      storageMode: e,
      offset: 0,
      limit: $K
    }), n = r.items, n.length || (n = await o()), !n.length) n = Mwt();else {
      const {
        sanitizeHistoryItemOnLoad: s
      } = await Ie(async () => {
        const {
          sanitizeHistoryItemOnLoad: l
        } = await Promise.resolve().then(() => ii);
        return {
          sanitizeHistoryItemOnLoad: l
        };
      }, void 0, import.meta.url);
      n = n.map(s);
    }
  } catch (a) {
    console.warn("[History] 冷启动读取失败，使用兼容历史:", a), n = Mwt();
  }
  return {
    ...r,
    items: cWe(n)
  };
}

function ofi(e, t) {
  const n = new Map(e.map(l => [String(l.id), l]));
  let r = !1;
  const a = [],
    i = t.filter(l => l.type === "gen-image" || l.type === "gen-video").map(l => l.prompt),
    o = new Map(t.map(l => [l.id, l]));
  for (const [l, d] of n) {
    if (d._globalOssUrlOnly || d.ossUploaded) {
      let m = Cj(d);
      m = Fue(m, t), m !== d && (n.set(l, m), r = !0);
    }
    const u = n.get(l) || d;
    if (!lg(u.prompt)) continue;
    let h;
    const p = u.sourceNodeId ? String(u.sourceNodeId) : "";
    if (p) {
      const m = o.get(p),
        f = m == null ? void 0 : m.prompt;
      typeof f == "string" && f.trim() && !lg(f) && (h = wLe(u.prompt, [f]) || f);
    }
    h || (h = wLe(u.prompt, i)), h && a.push({
      ...u,
      prompt: h
    });
  }
  return {
    items: g5e(Iv([...n.values()])),
    promptRepairs: a,
    ossChanged: r
  };
}

function sfi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n, r] = g.useState(!1),
    a = g.useRef(null),
    [i] = g.useState(() => afi({
      mode: lZ,
      open: KX,
      hydrated: e.hydratedRef,
      read: () => t.current.historyRef.current,
      cold: ifi,
      page: Tlr,
      pack: o => HHe(g5e(o)),
      heal: (o, s) => {
        const l = ofi(o, t.current.readNodes());
        return l.ossChanged && (a.current = s), l.promptRepairs.length && Ie(() => Promise.resolve().then(() => AYr), void 0, import.meta.url).then(d => {
          if (s()) return d.upsertHistoryPromptsToSidecar(l.promptRepairs);
        }).catch(() => {}), l.items;
      },
      commit: (o, s) => {
        s() && g.startTransition(() => t.current.setHistoryFromStorage(l => {
          if (!s()) return l;
          const d = o(l);
          return d === l ? l : Z2(d);
        }));
      },
      repaired: (o, s) => {
        a.current = s;
      },
      hasMore: r,
      yieldMain: Id,
      idle: async () => {
        Yi() && (await vb());
      },
      error: o => console.warn("[History] 历史加载失败:", o)
    }));
  return g.useEffect(() => {
    const o = a.current;
    if (a.current = null, !(o != null && o())) return;
    const s = e.historyRef.current;
    Ie(() => Promise.resolve().then(() => Gu), void 0, import.meta.url).then(l => {
      if (o()) return l.persistHistoryToStorage(s, {
        force: !0
      });
    }).catch(l => console.warn("[History] MJ 四槽修复保存失败:", l));
  }), g.useEffect(() => {
    const o = window.setTimeout(() => {
        i.start();
      }, 100),
      s = KHn(() => i.openChanged()),
      l = () => {
        i.modeChanged();
      },
      d = "qiaodoumayi-huya-seedance-oss-config-changed";
    return window.addEventListener(d, l), () => {
      window.clearTimeout(o), i.dispose(), s(), window.removeEventListener(d, l);
    };
  }, [i]), {
    historyHasMore: n,
    handleLoadMoreHistory: i.loadMore
  };
}

function lfi(e) {
  let t = null;
  return {
    recover() {
      var l;
      const n = e(),
        r = n.document.lease();
      if (!r.isCurrent() || t === r.token) return;
      const liveRun = n.getActive();
      if (liveRun && (liveRun.projectId ?? null) === r.projectId) {
        t = r.token;
        return;
      }
      const a = n.load(r.projectId);
      if (!a) {
        const d = n.getActive();
        d && (d.projectId ?? null) !== r.projectId && n.publish(null);
        return;
      }
      if ((a.projectId ?? null) !== r.projectId) return;
      const i = ((l = a.run.delivery) == null ? void 0 : l.config.autoSave) && a.run.delivery.status === "pending";
      if ((a.run.status === "completed" || a.run.status === "failed") && !i) {
        t = r.token;
        return;
      }
      const o = n.getState();
      if ((o.projectId ?? null) !== r.projectId || !r.isCurrent()) return;
      if (o.nodes.length === 0) {
        n.publish(null);
        return;
      }
      const s = n.reconcile(a, o);
      r.isCurrent() && (n.save({
        run: s.run,
        sessionId: s.sessionId,
        canvasStateVersion: s.canvasStateVersion,
        nodeIdContext: s.nodeIdContext,
        receipts: s.receipts,
        pendingToolCalls: s.pendingToolCalls
      }), t = r.token, n.publish(s.run));
    }
  };
}

function cfi(e, t, n, r, a) {
  const i = g.useRef({
    document: e,
    getState: a
  });
  g.useLayoutEffect(() => {
    i.current = {
      document: e,
      getState: a
    };
  }, [e, a]);
  const [o] = g.useState(() => lfi(() => ({
    ...i.current,
    load: lJ,
    reconcile: qJn,
    save: R5,
    getActive: bm,
    publish: ex
  })));
  g.useEffect(() => {
    o.recover();
  }, [o, t, n, r, a]);
}

function dfi(e) {
  return {
    flushAutosave() {
      const t = e(),
        n = t.document.lease();
      return n.isCurrent() && n.projectId === t.projectId ? t.flushAutosave() : Promise.resolve(!1);
    },
    async save(t) {
      var a;
      const n = e(),
        r = n.document.lease();
      if (!r.isCurrent() || r.projectId !== n.projectId) return null;
      try {
        if (n.projectId && n.projectName) {
          if (await n.flushAutosave()) return `project:${n.projectId}`;
          if (!r.isCurrent()) return null;
        }
        const i = (n.projectName || n.fallbackName || "").trim() || `紧急保存_${n.now().toISOString().slice(0, 19).replace(/[:T]/g, "-")}`,
          o = await n.save(i, n.projectId || void 0, {
            saveMode: "workflow+assets",
            silent: !0
          });
        return o ? (r.isCurrent() && ((a = n.markClean) == null || a.call(n)), `project:${o}`) : null;
      } catch (i) {
        return n.report(t, i), null;
      }
    }
  };
}

function ufi(e, t) {
  return e.__qdmFlushProjectAutosave = t.flushAutosave, e.__qdmEmergencySave = t.save, () => {
    e.__qdmFlushProjectAutosave === t.flushAutosave && delete e.__qdmFlushProjectAutosave, e.__qdmEmergencySave === t.save && delete e.__qdmEmergencySave;
  };
}

function hfi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => dfi(() => ({
    ...t.current,
    now: () => new Date(),
    report: (r, a) => console.warn("[Project] emergency project save failed:", r, a)
  })));
  g.useEffect(() => ufi(window, n), [n]);
}

function pfi(e, t, n, r) {
  t.current = n, e.commit(n, r);
}

function mfi(e, t, n, r) {
  g.useLayoutEffect(() => {
    pfi(e, t, n, r);
  }, [e, t, n, r]);
}

const ffi = new Set(["gen-image", "gen-video", "gen-music", "gen-speech", "generate-character-video", "generate-scene-video", "generate-character-image", "generate-scene-image", "preview", "rh-comfy", "jimeng-super-resolution", "topaz-upscale", "fal-rembg", "virtual-try-on", "motion-control", "video-relight", "video-analyze", "shot-breakdown", "script-parse"]),
  DBt = new Set();

function Mlr(e) {
  for (const t of e) {
    const n = String(t || "").trim();
    n && DBt.add(n);
  }
}

function gfi(e) {
  return DBt.has(String(e || ""));
}

function UQ(e) {
  DBt.delete(String(e || ""));
}

function yfi(e) {
  const t = typeof e == "string" ? e.trim() : "";
  return !t || Er.isContentRef(t) || Tu(t) ? !1 : t.startsWith("https://") || t.startsWith("http://") || t.startsWith("blob:") || t.startsWith("data:");
}

function bfi(e) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return !1;
  if (Zo(e)) return !0;
  const t = e.settings || {},
    n = typeof t[_i] == "string" ? t[_i].trim() : "";
  if (n && (nr(n) || /^https?:\/\//i.test(n)) || yfi(e.content)) return !0;
  const r = t.generatedImages;
  if (Array.isArray(r)) for (const a of r) {
    const i = String((a == null ? void 0 : a.fullUrl) || (a == null ? void 0 : a.url) || "").trim();
    if (i && !vfi(i)) return !0;
  }
  return !1;
}

function vfi(e) {
  return !e || Er.isContentRef(e) || e.startsWith("blob:") ? !0 : Tu(e);
}

function pJe(e, t) {
  const n = (t == null ? void 0 : t.clearVisual) !== !1;
  return e.map(r => {
    if (!ffi.has(r.type)) return r;
    const a = {
        ...(r.settings || {})
      },
      i = !!r.isGenerating || !!a.isGenerating,
      o = bfi(r),
      s = a.progress,
      l = typeof s == "number" && s > 0 && s < 100;
    if (n && (r.type === "gen-image" || r.type === "gen-video") && hu(r.id, !1), !i && !l && !o) return r;
    const d = {
      ...a
    };
    return delete d.isGenerating, (l || o || i) && (d.progress = o ? 100 : 0), {
      ...r,
      isGenerating: !1,
      settings: d
    };
  });
}

function Plr() {
  if (typeof document > "u") return;
  const e = document.querySelectorAll('.node-wrapper.node-generating-visual, .node-wrapper[data-generating-visual="true"]'),
    t = new Set(hNa());
  e.forEach(n => {
    const r = n.getAttribute("data-node-id");
    r && t.add(r), n.classList.remove("node-generating-visual"), n.classList.remove("node-generating-visual--simple"), n.removeAttribute("data-generating-visual");
  });
  for (const n of t) window.dispatchEvent(new CustomEvent("canvasNodeGeneratingVisual", {
    detail: {
      nodeId: n,
      active: !1
    }
  }));
}

function Rlr(e, t) {
  const n = new Set();
  for (const o of t) {
    const s = String(o || "").trim();
    s && n.add(s);
  }
  if (n.size === 0 || e.length === 0) return e;
  const r = Date.now();
  let a = !1;
  const i = e.map(o => {
    const s = String(o.sourceNodeId || "").trim();
    if (!s || !n.has(s) || !lWe(o)) return o;
    a = !0, AU(String(o.id));
    const l = u3(o, r);
    if (l !== o) return l;
    if (oWe(o)) return {
      ...o,
      status: "failed",
      progress: 0,
      errorMsg: void 0,
      durationMs: o.durationMs,
      generationTime: o.generationTime || TE(o.durationMs)
    };
    const d = iWe(o, r),
      u = o.generationTime || TE(d);
    return {
      ...o,
      status: "failed",
      progress: 0,
      errorMsg: void 0,
      durationMs: d,
      ...(u ? {
        generationTime: u
      } : {})
    };
  });
  return a ? i : e;
}

function Nlr(e, t) {
  const n = e.settings ?? {},
    r = t.settings ?? {};
  return e.settings !== t.settings && Object.keys(n).length === Object.keys(r).length && Object.keys(r).every(a => Object.is(n[a], r[a])) && (t = {
    ...t,
    settings: e.settings
  }), Object.keys(t).every(a => Object.is(e[a], t[a])) ? e : t;
}

function LBt(e, t) {
  var i;
  const n = t.settings ?? {};
  let r = {
    ...e,
    ...t,
    isGenerating: !1,
    settings: {
      ...e.settings,
      ...n,
      isGenerating: !1,
      progress: n.progress ?? ((i = e.settings) == null ? void 0 : i.progress) ?? 0
    }
  };
  return (!(String(t.errorMsg || "").trim() || (typeof n.error == "string" ? n.error.trim() : "") || (typeof n.errorMsg == "string" ? n.errorMsg.trim() : "")) || fu(typeof r.content == "string" ? r.content.trim() : "")) && (r = kIe(e, r)), n.error === null && (r = {
    ...r,
    errorMsg: void 0,
    settings: {
      ...r.settings,
      error: null,
      errorMsg: void 0
    }
  }), Nlr(e, r);
}

function eee(e, t, n) {
  var o, s;
  const r = t.settings,
    a = t.isGenerating === void 0 && r != null && Object.keys(r).length === 1 && "progress" in r;
  if (a && (!n && !e.isGenerating && ((o = e.settings) == null ? void 0 : o.isGenerating) !== !0 || Object.is((s = e.settings) == null ? void 0 : s.progress, r.progress))) return e;
  const i = Nlr(e, a ? {
    ...e,
    settings: {
      ...e.settings,
      progress: r.progress
    }
  } : {
    ...e,
    ...t
  });
  return (t.isGenerating === !0 || (r == null ? void 0 : r.isGenerating) === !0) && YEt(e, i) ? e : i;
}

let noe = {
  id: null,
  name: null,
  snapshotId: null
};

const Ode = new Map(),
  Gre = new Map();

let roe = null,
  wfi = Afi;

function xfi(e) {
  if (typeof structuredClone == "function") try {
    return structuredClone(e);
  } catch {}
  return {
    ...e,
    settings: e.settings ? {
      ...e.settings
    } : void 0
  };
}

function _fi(e) {
  var t;
  return e.isGenerating === !0 || ((t = e.settings) == null ? void 0 : t.isGenerating) === !0;
}

function zsn(e) {
  var t;
  return e.isGenerating === !1 || ((t = e.settings) == null ? void 0 : t.isGenerating) === !1;
}

function kfi(e) {
  for (const t of Gre.values()) if (t === e) return !0;
  return !1;
}

async function Afi(e) {
  if (!e.snapshotId) return;
  const {
    persistProjectDelta: t
  } = await Ie(async () => {
    const {
      persistProjectDelta: n
    } = await Promise.resolve().then(() => vTi);
    return {
      persistProjectDelta: n
    };
  }, void 0, import.meta.url);
  await t({
    projectId: e.projectId,
    projectName: e.projectName,
    baseSnapshotId: e.snapshotId,
    delta: {
      upserts: [e.node],
      deletedIds: [],
      nodeCount: e.nodeCount
    }
  });
}

function Sfi(e) {
  noe = {
    id: e.id,
    name: e.name,
    snapshotId: e.snapshotId
  };
}

function Ifi() {
  return noe.id;
}

function jlr(e) {
  const t = noe.id;
  if (t) for (const n of e) !(n != null && n.id) || !_fi(n) || (Ode.set(n.id, {
    projectId: t,
    projectName: noe.name || "未命名画布",
    snapshotId: noe.snapshotId || "",
    nodeCount: e.length,
    node: xfi(n)
  }), Gre.set(n.id, t), XM("canvas", t, !0));
}

function OBt(e) {
  return Ode.has(String(e || ""));
}

function __t(e, t) {
  const n = String(e || "");
  if (!n) return;
  if (t) {
    const a = Gre.get(n) || noe.id;
    if (!a) return;
    Gre.set(n, a), XM("canvas", a, !0);
    return;
  }
  const r = Gre.get(n);
  Gre.delete(n), Ode.delete(n), r && !kfi(r) && XM("canvas", r, !1);
}

function Cfi(e, t) {
  const n = Ode.get(e);
  if (!n) return !1;
  n.node = zsn(t) ? LBt(n.node, t) : eee(n.node, t, !0);
  const r = (roe == null ? void 0 : roe(n.projectId, e, n.node)) === !0;
  if (zsn(t)) {
    const a = {
      ...n,
      node: n.node
    };
    r ? __t(e, !1) : wfi(a).finally(() => __t(e, !1));
  }
  return !0;
}

function Efi(e, t) {
  if (!Ode.size) return t;
  let n = null;
  return Ode.forEach(r => {
    if (r.projectId !== e) return;
    const a = (n ?? t).findIndex(i => i.id === r.node.id);
    a < 0 || (n ?? (n = t.slice()), n[a] = r.node);
  }), n ?? t;
}

function Tfi(e) {
  return roe = e, () => {
    roe === e && (roe = null);
  };
}

function Mfi(e) {
  let t = null;
  const n = () => {
    t && t.cancel(t.id), t = null;
  };
  return {
    clear(r) {
      const a = e();
      jlr(a.collections.nodes.ref.current);
      const i = a.projectIdRef.current,
        o = a.collections.nodes.ref.current.map(l => l.id).filter(Boolean);
      n(), a.projectIdRef.current = null, a.document.replace(null, !0), a.clearProjectIdentity(), a.discardPending(), a.clearProduction(i), a.releaseResources(r == null ? void 0 : r.preserveDisplayResources), a.detachGeneration(o);
      const s = {
        nodes: [],
        connections: [],
        groups: [],
        canvasTextBoxes: [],
        canvasDoodleStrokes: []
      };
      for (const l of Object.keys(s)) a.collections[l].ref.current = [];
      if (a.collections.nodes.set(s.nodes), a.collections.connections.set(s.connections), a.collections.groups.set(s.groups), a.collections.canvasTextBoxes.set(s.canvasTextBoxes), a.collections.canvasDoodleStrokes.set(s.canvasDoodleStrokes), a.commitView(hY(0, 0, 1, a.viewport)), a.resetInteraction(), a.resetName(!!(r != null && r.focusNameEdit)), a.markClean(), a.document.commit(null, !1), r != null && r.focusNameEdit) {
        const l = a.document.lease();
        t = {
          id: a.schedule(() => {
            t = null, l.isCurrent() && a.focusName();
          }, 150),
          cancel: a.cancel
        };
      }
      (r == null ? void 0 : r.toastMessage) !== null && a.notify((r == null ? void 0 : r.toastMessage) ?? "画布已清空");
    },
    dispose: n
  };
}

function Dlr(e) {
  e.setSelectedNodeId(null), e.setSelectedNodeIds(new Set()), e.setSelectedConnectionId(null), e.clearConnectionDial(), e.setEditingCanvasTextId(null), e.setSelectedCanvasTextId(null), e.setSelectedDoodleIds([]), e.setMultiConnectingSourceIds(null), e.setMultiConnectingTargetIds(null), e.clearBatchConnectionCandidate(), e.setCropSelectModeNodeId(null), e.setSelectionBox(null), e.setIsSelecting(!1), e.setConnectingSource(null), e.setConnectingTarget(null), e.setConnectingInputType(null), e.setActiveTool("select"), e.setAlignPanelOpen(!1), e.setLightboxOpen(!1), e.setLightboxItem(null);
}

function Pfi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => Mfi(() => {
    const r = t.current;
    return {
      ...r,
      discardPending: () => {
        r.cancelOpen(), R4n(), r.pendingNodeCommit.current = !1, r.pendingConnectionCommit.current = !1;
      },
      clearProduction: a => {
        ex(null), uja(a);
      },
      detachGeneration: a => {
        Plr();
        const i = a.filter(o => !OBt(o));
        i.length && (Mlr(i), r.setHistoryFromStorage(o => Rlr(o, i)));
      },
      releaseResources: a => {
        a || BCn(), Ie(() => Promise.resolve().then(() => mqi), void 0, import.meta.url).then(i => {
          var o;
          return (o = i.destroyNodePool) == null ? void 0 : o.call(i);
        }).catch(() => {}), Ie(() => Promise.resolve().then(() => vqi), void 0, import.meta.url).then(i => {
          var o;
          return (o = i.clearConnectionCache) == null ? void 0 : o.call(i);
        }).catch(() => {}), Ie(() => Promise.resolve().then(() => _qi), void 0, import.meta.url).then(i => {
          var o;
          return (o = i.getCanvasDOMBatchOptimizer) == null ? void 0 : o.call(i).clear();
        }).catch(() => {}), Ie(() => Promise.resolve().then(() => Mqi), void 0, import.meta.url).then(i => {
          var o;
          return (o = i.clearNodeUpdateQueue) == null ? void 0 : o.call(i);
        }).catch(() => {});
      },
      resetInteraction: () => Dlr(r.interaction),
      schedule: (a, i) => window.setTimeout(a, i),
      cancel: a => window.clearTimeout(a)
    };
  }));
  return g.useEffect(() => () => n.dispose(), [n]), n.clear;
}

function Rfi(e, t) {
  const n = Array.isArray(e) ? e : [],
    r = Array.isArray(t) ? t : [];
  if (r.length === 0) return n;
  const a = new Map(),
    i = n.map(o => o);
  i.forEach((o, s) => {
    o && typeof o == "object" && typeof o.id == "string" && a.set(o.id, {
      session: o,
      idx: s
    });
  });
  for (const o of r) {
    if (!o || typeof o != "object" || typeof o.id != "string") continue;
    const s = a.get(o.id);
    if (!s) {
      i.push(o);
      continue;
    }
    const l = s.session,
      d = Array.isArray(l.messages) ? [...l.messages] : [],
      u = new Set(d.map(h => h && typeof h == "object" ? h.id : void 0).filter(h => typeof h == "string"));
    if (Array.isArray(o.messages)) for (const h of o.messages) !h || typeof h != "object" || typeof h.id != "string" || u.has(h.id) || (d.push(h), u.add(h.id));
    i[s.idx] = {
      ...l,
      mode: l.mode ?? o.mode,
      messages: d
    };
  }
  return i;
}

function Nfi(e, t) {
  const n = e.view ?? t.readView();
  t.clear({
    toastMessage: null,
    preserveDisplayResources: !0
  });
  const r = t.document.lease(),
    a = ["nodes", "connections", "groups", "canvasTextBoxes", "canvasDoodleStrokes"];
  for (const i of a) t.collections[i].ref.current = e[i];
  for (const i of a) {
    const o = t.collections[i];
    w0(o.set, r.isCurrent)(e[i]);
  }
  t.commitView(n), e.history && w0(t.setHistoryFromStorage, r.isCurrent)(e.history), e.chatSessions && w0(t.setChatSessions, r.isCurrent)(e.chatMode === "merge" ? i => Rfi(i, e.chatSessions) : e.chatSessions), e.projectName && t.setName(FHe(e.projectName)), t.dismissEmpty();
}

function jfi(e) {
  const t = g.useRef(e);
  return g.useLayoutEffect(() => {
    t.current = e;
  }), g.useCallback(n => Nfi(n, t.current), []);
}

function Dfi(e = () => {}, t = setTimeout, n = clearTimeout) {
  let r = {
    visible: !1,
    progress: 0,
    status: "",
    type: "import"
  };
  const a = new Set(),
    i = u => {
      const h = r.visible !== u.visible || r.progress !== u.progress || r.status !== u.status || r.type !== u.type;
      h && (r = u), e(u), h && a.forEach(p => p());
    };
  let o = 0,
    s;
  const l = () => {
    o++, s !== void 0 && n(s), s = void 0;
  };
  return {
    report: (u, h, p = "export") => {
      l();
      const m = o,
        f = {
          visible: u !== 0,
          progress: Math.max(0, u),
          status: h,
          type: p
        };
      i(f), (u < 0 || u >= 100) && (s = t(() => {
        o === m && (s = void 0, i({
          ...f,
          visible: !1
        }));
      }, u < 0 ? 3e3 : 500));
    },
    dispose: l,
    getSnapshot: () => r,
    subscribe: u => (a.add(u), () => {
      a.delete(u);
    })
  };
}

function Lfi() {
  const [e] = g.useState(() => Dfi());
  return g.useEffect(() => () => e.dispose(), [e]), e;
}

function Ofi(e) {
  let t = 0;
  const n = new Map(),
    r = () => {
      t++;
      for (const [i, o] of n) o.cancelFrame(i);
      n.clear();
    },
    a = (i, o) => {
      const s = i.frame(() => {
        n.delete(s), o();
      });
      n.set(s, i);
    };
  return {
    cancel: r,
    async open(i, o, s = "switcher") {
      r();
      const l = t,
        d = e(),
        u = () => l === t;
      try {
        if (d.flush) {
          try {
            await d.flush();
          } catch {}
          if (!u()) return !1;
        }
        return s === "cloud" && (await d.download(i), !u() || (await d.refreshList(), !u())) || !(await d.open(i, o)) || !u() ? !1 : (d.resetInteraction(), a(d, () => {
          u() && a(d, () => {
            u() && d.markClean();
          });
        }), o && d.syncName(o), s === "switcher" ? d.dismissEmpty() : d.closePanel(), d.success(s === "cloud" ? "已从 OSS 同步最新版并打开" : "项目已打开"), !0);
      } catch (h) {
        return u() && d.error((h == null ? void 0 : h.message) || (s === "cloud" ? "云端打开失败" : "打开失败")), !1;
      }
    }
  };
}

function Bfi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => Ofi(() => ({
    ...t.current,
    frame: r => window.requestAnimationFrame(r),
    cancelFrame: r => window.cancelAnimationFrame(r)
  })));
  return g.useEffect(() => () => n.cancel(), [n]), n;
}

function Ffi(e) {
  let t;
  async function n(i, o, s, l) {
    try {
      return await o(), i.success(s), !0;
    } catch (d) {
      return i.error((d == null ? void 0 : d.message) || l), !1;
    }
  }
  async function r(i, o, s, l) {
    var p;
    const d = e(),
      u = d.document.lease();
    if (!u.isCurrent() || u.projectId !== d.projectId) return d.error("项目正在切换，请加载完成后再保存"), !1;
    const h = (p = d.getSignature) == null ? void 0 : p.call(d);
    return n(d, async () => {
      var f, y;
      if (!(await d.save(i, o, {
        saveMode: s
      }))) throw new Error("项目未保存，请重试");
      u.isCurrent() && h !== void 0 && ((f = d.getSignature) == null ? void 0 : f.call(d)) === h && ((y = d.markClean) == null || y.call(d));
    }, l ? "已另存为新项目" : "项目已保存", l ? "另存为失败" : "保存失败");
  }
  async function a(i) {
    await i.refreshList();
    const o = e();
    o.cloudListFetched && (await o.refreshCloudList());
  }
  return {
    close: () => e().close(),
    refresh() {
      if (!t) {
        const i = e();
        t = Promise.resolve().then(() => i.refreshList({
          force: !0
        })).catch(o => (i.error((o == null ? void 0 : o.message) || "刷新项目列表失败"), e().projects)).finally(() => {
          t = void 0;
        });
      }
      return t;
    },
    saveCurrent(i) {
      const o = e();
      return !o.projectId || !o.projectName ? (o.error("请先点击「另存为」保存当前工作流"), Promise.resolve(!1)) : r(o.projectName, o.projectId, i, !1);
    },
    saveAs: (i, o) => r(i, void 0, o, !0),
    saveFromShortcut(i) {
      const o = e(),
        s = o.projectId && o.projectName ? o.projectName : i || "未命名项目";
      return r(s, o.projectId || void 0, "workflow+assets", !1);
    },
    open: (i, o) => e().open(i, o, "panel"),
    openCloud: (i, o) => e().open(i, o, "cloud"),
    async insert(i) {
      const o = e();
      await n(o, () => o.insert(i), "项目已插入到画布", "插入失败");
    },
    deleteLocal(i) {
      const o = e();
      return n(o, async () => {
        await o.deleteLocal(i), await o.clearSynced(i), await a(o);
      }, "已删除本地项目（云端副本保留）", "删除失败");
    },
    async upload(i) {
      const o = e();
      await n(o, () => o.upload(i), "已上传到云端", "上传失败");
    },
    async download(i) {
      const o = e();
      await n(o, async () => {
        await o.download(i), await a(o);
      }, "已从云端下载到本地，可点「本地打开」", "下载失败");
    },
    deleteCloud(i) {
      const o = e();
      return n(o, () => o.deleteCloud(i), "已从 OSS 永久删除该项目（含文件夹内全部文件）", "删除云端项目失败");
    }
  };
}

function zfi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => Ffi(() => ({
    ...t.current,
    async clearSynced(r) {
      const {
        clearProjectOssSynced: a
      } = await Ie(async () => {
        const {
          clearProjectOssSynced: i
        } = await Promise.resolve().then(() => L0a);
        return {
          clearProjectOssSynced: i
        };
      }, void 0, import.meta.url);
      a(r);
    }
  })));
  return n;
}

const k_t = {
    detail: "细节",
    part: "局部",
    overall: "整体"
  },
  tz = e => Math.max(0, Math.min(1, e));

function Ufi(e) {
  return [tz(e.x), tz(e.y), tz(e.x + e.width), tz(e.y + e.height)];
}

function Llr(e) {
  return `{{magic_item:${JSON.stringify(e)}}}`;
}

function Olr(e, t) {
  const n = e.activeLevel,
    r = e.levels[n];
  return {
    box_2d: r.box_2d,
    label_name: r.label_name,
    label_desc: r.label_desc,
    _markId: e._markId,
    nodeId: e.nodeId,
    level: n
  };
}

function $fi(e) {
  if (!Array.isArray(e) || e.length < 4) return null;
  const t = e.slice(0, 4).map(u => Number(u));
  if (t.some(u => !Number.isFinite(u))) return null;
  const [n, r, a, i] = t,
    o = tz(Math.min(n, a)),
    s = tz(Math.min(r, i)),
    l = tz(Math.max(n, a)),
    d = tz(Math.max(r, i));
  return l - o < .001 || d - s < .001 ? null : [o, s, l, d];
}

function Gfi(e) {
  return e.levels[e.activeLevel];
}

const nje = "gemini-3.1-pro",
  rje = "gemini优质",
  Vre = e => Math.max(0, Math.min(1, e));

function Vfi(e, t) {
  const n = (e * 100).toFixed(1),
    r = (t * 100).toFixed(1);
  return `你是一个专业的图像视觉分析助手。用户点击了图片坐标 (${n}%, ${r}%) 附近。

请针对该点击位置，返回**三个层级**的分析（均为中文）：

1. **detail（细节）**：点击处最具体、最小的可见元素（如：口红、紫色护肩、数字300）
2. **part（局部）**：包含该细节的功能部件或角色局部（如：黑猫、银发剑士角色）
3. **overall（整体）**：该细节所属的整体对象或画面主体区域（如：Q版角色群体、游戏宣传图主体）

每个层级都需要：
- label_name：简短名称（2-10字）
- label_desc：详细描述外观、颜色、材质、位置
- box_2d：[x1, y1, x2, y2] 紧密框住该层级所指对象，坐标 0-1

返回 JSON：
{
  "levels": {
    "detail": { "label_name": "...", "label_desc": "...", "box_2d": [0.1, 0.2, 0.3, 0.4] },
    "part": { "label_name": "...", "label_desc": "...", "box_2d": [...] },
    "overall": { "label_name": "...", "label_desc": "...", "box_2d": [...] }
  }
}

只返回 JSON，不要其他文字。`;
}

function Eot(e, t, n = .1) {
  return [Vre(e - n), Vre(t - n), Vre(e + n), Vre(t + n)];
}

function Hfi(e) {
  try {
    const t = new URL(e).hostname.toLowerCase();
    return t === "localhost" || t.endsWith(".localhost") || t === "127.0.0.1" || t === "::1" || t === "[::1]";
  } catch {
    return !1;
  }
}

async function Wfi(e) {
  return await new Promise((t, n) => {
    const r = new FileReader();
    r.onloadend = () => {
      const a = r.result;
      typeof a == "string" && a.startsWith("data:") ? t(a) : n(new Error("无法转换 blob 为 data URL"));
    }, r.onerror = () => n(new Error("读取 blob 失败")), r.readAsDataURL(e);
  });
}

async function qfi(e, t = "image/png") {
  const n = String(e || "").trim();
  if (!n) throw new Error("图片内容为空");
  if (n.startsWith("data:") || /^https?:\/\//i.test(n) && !Hfi(n)) return n;
  if (n.startsWith("blob:") || /^https?:\/\//i.test(n) || n.startsWith("asset:")) {
    const r = await fetch(n);
    if (!r.ok) throw new Error("本地缓存图片读取失败，请重试");
    const a = await r.blob();
    return await Wfi(a);
  }
  return `data:${t};base64,${n}`;
}

function Kfi(e, t) {
  const n = e.filter(a => a.type === "Chat"),
    r = String(t || "").trim();
  if (r) {
    const a = n.find(i => i.id === r) || n.find(i => i.modelName === r) || n.find(i => String(i.modelName || "").includes(r));
    if (a) return a;
  }
  return n.find(a => a.id === nje) || n.find(a => a.modelName === "gemini-3.1-pro-preview" || String(a.modelName || "").includes("gemini-3.1-pro")) || n[0];
}

function Tot(e, t, n) {
  if (!e || typeof e != "object") return {
    label_name: t,
    label_desc: t,
    box_2d: n
  };
  const r = e;
  let a = $fi(r.box_2d);
  if (!a && r.bbox && typeof r.bbox == "object") {
    const i = r.bbox;
    Number.isFinite(i.x) && Number.isFinite(i.y) && Number.isFinite(i.width) && Number.isFinite(i.height) && (a = Ufi({
      x: Number(i.x),
      y: Number(i.y),
      width: Number(i.width),
      height: Number(i.height)
    }));
  }
  return {
    label_name: String(r.label_name || r.text || t).trim() || t,
    label_desc: String(r.label_desc || r.description || r.label_name || t).trim() || t,
    box_2d: a || n
  };
}

const Qfi = 45e3;

async function Yfi(e, t, n = Qfi) {
  const r = new AbortController(),
    a = window.setTimeout(() => r.abort(), n);
  try {
    return await fetch(e, {
      ...t,
      signal: r.signal
    });
  } catch (i) {
    throw i instanceof DOMException && i.name === "AbortError" ? new Error("细节分析超时，请重试") : i;
  } finally {
    window.clearTimeout(a);
  }
}

async function Xfi(e) {
  var u, h, p, m;
  const t = Kfi(e.apiConfigs, e.modelId);
  if (!t) throw new Error("请先配置 Chat 模型");
  const n = ((u = e.platformGroup) == null ? void 0 : u.trim()) || rje,
    r = (t.url || "https://ai.comfly.chat").replace(/\/+$/, ""),
    a = cu(t.key, e.globalApiKey, void 0, {
      platformGroup: n,
      modelId: t.id,
      modelName: t.modelName || t.id,
      baseUrl: r,
      modelSavedApiKeyId: t.savedApiKeyId
    });
  if (!a) throw new Error("请先配置 API Key");
  const i = await qfi(e.imageUrl),
    o = await Yfi(`${r}/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${a}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: t.modelName,
        messages: [{
          role: "user",
          content: [{
            type: "text",
            text: e.prompt
          }, {
            type: "image_url",
            image_url: {
              url: i
            }
          }]
        }],
        max_tokens: 8e3,
        temperature: .2,
        response_format: {
          type: "json_object"
        }
      })
    });
  if (!o.ok) {
    const f = await o.text();
    throw new Error(`元素识别失败 (${o.status}): ${f}`);
  }
  const l = (m = (p = (h = (await o.json()).choices) == null ? void 0 : h[0]) == null ? void 0 : p.message) == null ? void 0 : m.content;
  if (!l) throw new Error("LLM 未返回识别结果");
  const d = String(l).match(/\{[\s\S]*\}/);
  if (!d) throw new Error("无法解析识别结果");
  return JSON.parse(d[0]);
}

async function Jfi(e) {
  const t = Vre(e.clickX),
    n = Vre(e.clickY),
    r = Eot(t, n, .08),
    a = Eot(t, n, .18),
    i = Eot(t, n, .32),
    s = (await Xfi({
      imageUrl: e.imageUrl,
      prompt: Vfi(t, n),
      apiConfigs: e.apiConfigs,
      globalApiKey: e.globalApiKey,
      modelId: e.modelId,
      platformGroup: e.platformGroup
    })).levels || {},
    l = Fi(),
    d = {
      detail: Tot(s.detail, "细节", r),
      part: Tot(s.part, "局部", a),
      overall: Tot(s.overall, "整体", i)
    };
  return {
    _markId: l,
    nodeId: e.sourceNodeId,
    clickX: t,
    clickY: n,
    activeLevel: "detail",
    levels: d
  };
}

const Blr = "qiaodoumayi_focus_edit_settings";

function A_t() {
  try {
    const e = localStorage.getItem(Blr);
    if (e) {
      const t = JSON.parse(e);
      return {
        modelId: String(t.modelId || nje).trim() || nje,
        platformGroup: String(t.platformGroup || rje).trim() || rje
      };
    }
  } catch {}
  return {
    modelId: nje,
    platformGroup: rje
  };
}

function Usn(e) {
  try {
    localStorage.setItem(Blr, JSON.stringify(e));
  } catch {}
}

const S_t = "qdm-compact-gen-prompt-auto-open",
  $sn = 8,
  Zfi = 1200,
  I_t = new Map();

function Flr(e) {
  I_t.set(e, Date.now()), window.dispatchEvent(new CustomEvent(S_t, {
    detail: {
      nodeId: e
    }
  }));
}

function v5(e) {
  Flr(e);
}

function Mot(e) {
  const t = I_t.get(e);
  return t ? (I_t.delete(e), Date.now() - t <= Zfi) : !1;
}

function egi(e) {
  const t = n => {
    var a;
    const r = (a = n.detail) == null ? void 0 : a.nodeId;
    typeof r == "string" && r && e(r);
  };
  return window.addEventListener(S_t, t), () => window.removeEventListener(S_t, t);
}

function zlr(e, t) {
  if (t.button !== 0 || t.ctrlKey || t.metaKey) return;
  const n = t.clientX,
    r = t.clientY,
    a = t.pointerId;
  let i = !0;
  const o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", l), window.removeEventListener("pointercancel", d);
    },
    s = u => {
      u.pointerId === a && Math.hypot(u.clientX - n, u.clientY - r) > $sn && (i = !1, o());
    },
    l = u => {
      u.pointerId === a && (o(), i && (Math.hypot(u.clientX - n, u.clientY - r) > $sn || Flr(e)));
    },
    d = u => {
      u.pointerId === a && o();
    };
  window.addEventListener("pointermove", s), window.addEventListener("pointerup", l), window.addEventListener("pointercancel", d);
}

const Gsn = (e = null) => ({
  targetId: e,
  activeSourceId: null,
  analyzingId: null,
  analyses: {}
});

function tgi() {
  let e = Gsn(),
    t = {},
    n = {},
    r = null;
  const a = new Map(),
    i = new Set(),
    o = h => {
      e = h, i.forEach(p => p());
    },
    s = () => {
      const h = t,
        p = n,
        m = e.targetId;
      return {
        targetId: m,
        isCurrent: () => !!m && t === h && n === p && e.targetId === m
      };
    },
    l = () => {
      n = {}, r = null, a.clear(), e.analyzingId && o({
        ...e,
        analyzingId: null
      });
    },
    d = h => {
      t = {}, n = {}, r = null, a.clear(), o(Gsn(h));
    },
    u = (h, p) => {
      var m;
      return (m = e.analyses[h]) == null ? void 0 : m.find(f => f._markId === p);
    };
  return {
    getSnapshot: () => e,
    subscribe(h) {
      return i.add(h), () => {
        i.delete(h);
      };
    },
    capture: s,
    cancelPending: l,
    find: u,
    dismiss: () => d(null),
    toggle: h => d(e.targetId === h ? null : h),
    selectSource(h) {
      e.activeSourceId !== h && l(), o({
        ...e,
        activeSourceId: h
      });
    },
    beginRecognition(h) {
      if (!e.targetId || r) return null;
      const p = {},
        m = s();
      return r = p, o({
        ...e,
        analyzingId: h
      }), {
        ...m,
        isCurrent: () => m.isCurrent() && r === p,
        finish() {
          r === p && (r = null, o({
            ...e,
            analyzingId: null
          }));
        }
      };
    },
    beginMark(h, p) {
      const m = JSON.stringify([h, p]),
        f = {},
        y = s();
      return a.set(m, f), {
        ...y,
        isCurrent: () => y.isCurrent() && a.get(m) === f && !!u(h, p)
      };
    },
    put(h, p) {
      const m = e.analyses[h] || [];
      o({
        ...e,
        analyses: {
          ...e.analyses,
          [h]: m.some(f => f._markId === p._markId) ? m.map(f => f._markId === p._markId ? p : f) : [...m, p]
        }
      });
    },
    remove(h, p) {
      a.delete(JSON.stringify([h, p])), o({
        ...e,
        analyses: {
          ...e.analyses,
          [h]: (e.analyses[h] || []).filter(m => m._markId !== p)
        }
      });
    },
    prune(h) {
      const p = Object.fromEntries(Object.entries(e.analyses).filter(([f]) => h.has(f))),
        m = e.activeSourceId && h.has(e.activeSourceId) ? e.activeSourceId : null;
      e.analyzingId && !h.has(e.analyzingId) && l(), (m !== e.activeSourceId || Object.keys(p).length !== Object.keys(e.analyses).length) && o({
        ...e,
        analyses: p,
        activeSourceId: m
      });
    }
  };
}

function k1e(e) {
  return !e || e === "default" ? "default" : String(e);
}

function kv(e, t, n, r) {
  if (!t || !n) return !1;
  const a = k1e(r);
  return e.some(i => i.from === t && i.to === n && k1e(i.inputType) === a);
}

function Ulr(e) {
  const t = new Set(),
    n = e.connections || [],
    r = e.multiConnectingSourceIds && e.multiConnectingSourceIds.length > 0 ? e.multiConnectingSourceIds : e.connectingSource ? [e.connectingSource] : null;
  if (r && r.length > 0) {
    const i = new Set(r),
      o = new Map();
    for (const s of n) {
      if (!i.has(s.from) || k1e(s.inputType) !== "default") continue;
      let l = o.get(s.to);
      l || (l = new Set(), o.set(s.to, l)), l.add(s.from);
    }
    for (const [s, l] of o) r.every(d => l.has(d)) && t.add(s);
    return t;
  }
  const a = e.multiConnectingTargetIds && e.multiConnectingTargetIds.length > 0 ? e.multiConnectingTargetIds : e.connectingTarget ? [e.connectingTarget] : null;
  if (a && a.length > 0) {
    const i = new Set(a),
      o = k1e(e.connectingInputType),
      s = new Map();
    for (const l of n) {
      if (!i.has(l.to) || k1e(l.inputType) !== o) continue;
      let d = s.get(l.from);
      d || (d = new Set(), s.set(l.from, d)), d.add(l.to);
    }
    for (const [l, d] of s) a.every(u => d.has(u)) && t.add(l);
  }
  return t;
}

function mJe(e, t) {
  var n, r, a;
  if (t && e.id === t || e.type === "camera-movement" || e.type === "professional-camera" || e.type === "gen-music") return null;
  if (e.type === "preview") {
    if (e.previewType === "video") return null;
    if (e.selectedPreviewImage) return String(e.selectedPreviewImage);
    const i = e.previewMjImages;
    return i != null && i.length ? i[0] : e.content ? String(e.content) : null;
  }
  if (e.type === "canvas-node") return e.content ? String(e.content) : (n = e.settings) != null && n.canvasData ? `canvas-node:${e.id}` : null;
  if (e.type === "rh-app") {
    const i = (r = e.settings) == null ? void 0 : r.generatedImages;
    return i != null && i.length && i[0].fullUrl ? i[0].fullUrl : e.content ? String(e.content) : null;
  }
  if (e.type === "video-input") return null;
  if (e.type === "inpaint-crop" || e.type === "inpaint-stitch") return e.content ? String(e.content) : null;
  if (e.content && typeof e.content == "string") {
    const i = (a = e.settings) == null ? void 0 : a.mediaType;
    return i === "video" || i === "audio" ? null : e.content;
  }
  return null;
}

function $lr(e, t) {
  const n = mJe(e, t);
  return !(!n || Sh(n) || n.startsWith("data:video") || n.startsWith("data:audio"));
}

const Vsn = /\.(mp3|wav|ogg|m4a|aac|flac)(\?|#|$)/i;

function ngi(e) {
  return typeof e.content == "string" ? e.content.trim() : "";
}

function rgi(e) {
  var i, o, s, l;
  if (e.type === "text-node" || e.type === "novel-input") return "text";
  if (e.type === "custom-agent") return "agent";
  const t = e.settings || {},
    n = ngi(e),
    r = typeof t.audioUrl == "string" ? t.audioUrl.trim() : "",
    a = String(t.mediaType || e.previewType || "").toLowerCase();
  if (e.type === "gen-music" || e.type === "gen-speech") return r || n ? "audio" : null;
  if (e.type === "gen-image") return (i = Xl(e)) != null && i.url || n ? "image" : null;
  if (e.type === "gen-video" || e.type === "video-input") return ((o = Xl(e)) == null ? void 0 : o.url) || n ? "video" : null;
  if (e.type === "preview") return a === "audio" ? n ? "audio" : null : a === "video" ? e.selectedPreviewVideo || (s = e.previewMjVideos) != null && s[0] || n ? "video" : null : e.selectedPreviewImage || (l = e.previewMjImages) != null && l[0] || n ? "image" : null;
  if (e.type === "input-image") {
    if (a === "audio" || r || Vsn.test(n)) return r || n ? "audio" : null;
    if (a === "video" || Sh(n) || n.startsWith("data:video")) return n ? "video" : null;
    const d = typeof t.imageUrl == "string" ? t.imageUrl.trim() : "";
    return n || d ? "image" : null;
  }
  return n ? a === "audio" || n.startsWith("data:audio") || Vsn.test(n) ? "audio" : a === "video" || n.startsWith("data:video") || Sh(n) ? "video" : "image" : null;
}

function Glr(e, t, n) {
  var a;
  if (!t || e.id === t.id || n != null && n.connections && kv(n.connections, e.id, t.id, n.inputType)) return !1;
  const r = rgi(e);
  if (!r) return !1;
  switch (t.type) {
    case "gen-image":
      return r === "image" || r === "text" || r === "agent";
    case "gen-video":
      return r === "image" || r === "video" || r === "audio" || r === "text" || r === "agent";
    case "text-node":
      return !0;
    case "input-image":
      return r === "image";
    case "gen-music":
      return r === "audio";
    case "gen-speech":
      {
        const i = String(((a = t.settings) == null ? void 0 : a.model) || "");
        return Cv(i) ? r === "image" || r === "audio" || r === "text" || r === "agent" : r === "text" || r === "agent";
      }
    case "gen-3d":
      return r === "image" || r === "text";
    default:
      return r === "image";
  }
}

function fJe(e) {
  var t;
  if (e.type === "input-image") {
    if (ua()) {
      const o = Vh(e);
      if (o) {
        const l = ya(o) || o;
        return Vg(l);
      }
      const s = Vv(e);
      if (s && nr(s)) return Vg(ya(s) || s);
    }
    const n = e.settings,
      r = typeof (n == null ? void 0 : n._blobUrl) == "string" ? n._blobUrl.trim() : "";
    if (r) return r;
    const a = typeof e.content == "string" ? e.content.trim() : "";
    if (a) return a;
    const i = n == null ? void 0 : n.imageUrl;
    return typeof i == "string" && i.trim() ? i.trim() : null;
  }
  if (e.type === "gen-image") {
    if (ua()) {
      const a = Zo(e);
      if (a) return a;
    }
    const n = Xl(e);
    if (!((t = n == null ? void 0 : n.url) != null && t.trim())) return null;
    const r = n.url.trim();
    return ua() && nr(r) ? Vg(r) : r;
  }
  return null;
}

function agi(e) {
  var t;
  if (e.type === "input-image") {
    if (ua()) {
      const a = _f(e);
      if (a != null && a.trim()) return a.trim();
    }
    const n = typeof e.content == "string" ? e.content.trim() : "";
    if (n) return n;
    const r = (t = e.settings) == null ? void 0 : t.imageUrl;
    return typeof r == "string" && r.trim() ? r.trim() : null;
  }
  if (e.type === "gen-image") {
    if (ua()) {
      const n = Bm(e);
      if (n) return n;
    }
    return fJe(e);
  }
  return null;
}

function Vlr(e) {
  const t = fJe(e);
  return !(!t || Sh(t) || t.startsWith("data:video") || t.startsWith("data:audio"));
}

function igi(e) {
  var n;
  if (e.type === "input-image") {
    const r = e.settings || {},
      a = typeof r._blobUrl == "string" ? r._blobUrl.trim() : "";
    if (a.startsWith("blob:") || a.startsWith("data:")) return a;
    const i = IY(e);
    if (i) return i;
    const o = Vh(e);
    if (o && !/\/thumbnails\//i.test(o)) {
      const d = ya(o) || o;
      return ua() && nr(d) ? Vg(d) : d;
    }
    const s = Vv(e).trim();
    return s ? ua() && nr(s) ? Vg(ya(s) || s) : s : (typeof e.content == "string" ? e.content.trim() : "") || null;
  }
  if (e.type === "gen-image" || e.type === "gen-video") {
    const r = Zo(e);
    if (r) return r;
    const a = Xl(e);
    return ((n = a == null ? void 0 : a.url) == null ? void 0 : n.trim()) || null;
  }
  if (e.type === "preview") {
    const r = typeof e.content == "string" ? e.content.trim() : "",
      a = Nae(e, 0, r);
    return a || r || null;
  }
  const t = V$(e);
  return t || mJe(e);
}

const Hsn = "{{magic_item:";

function BBt(e) {
  const t = [];
  let n = 0;
  for (; n < e.length;) {
    const r = e.indexOf(Hsn, n);
    if (r === -1) {
      n < e.length && t.push({
        type: "text",
        content: e.slice(n)
      });
      break;
    }
    r > n && t.push({
      type: "text",
      content: e.slice(n, r)
    });
    const a = r + Hsn.length;
    let i = 0,
      o = a;
    for (; o < e.length; o++) {
      const u = e[o];
      if (u === "{") i += 1;else if (u === "}" && (i -= 1, i === 0)) {
        o += 1;
        break;
      }
    }
    const s = e.slice(a, o),
      l = e.indexOf("}}", o),
      d = l === -1 ? e.slice(r) : e.slice(r, l + 2);
    try {
      const u = JSON.parse(s);
      t.push({
        type: "magic_item",
        content: d,
        payload: u
      });
    } catch {
      t.push({
        type: "text",
        content: d
      });
    }
    n = l === -1 ? e.length : l + 2;
  }
  return t;
}

function ogi(e, t, n) {
  const r = Llr(n),
    a = BBt(e);
  let i = !1;
  const o = a.map(s => s.type === "magic_item" && s.payload._markId === t ? (i = !0, r) : (s.type === "magic_item", s.content)).join("");
  return i ? o : e.trimEnd() ? `${e.trimEnd()} ${r}` : `${r} `;
}

function sgi(e, t) {
  return BBt(e).filter(r => !(r.type === "magic_item" && r.payload._markId === t)).map(r => (r.type === "magic_item", r.content)).join("").replace(/[ \t]+\n/g, `
`).trimEnd();
}

function lgi(e, t) {
  const n = Llr(t),
    r = String(e || "").trimEnd();
  return r ? `${r} ${n} ` : `${n} `;
}

async function cgi(e, t, n = 28) {
  const r = new Image();
  r.crossOrigin = "anonymous", r.src = e, await new Promise((v, _) => {
    const w = window.setTimeout(() => _(new Error("缩略图加载超时")), 12e3);
    r.onload = () => {
      window.clearTimeout(w), v();
    }, r.onerror = () => {
      window.clearTimeout(w), _(new Error("缩略图加载失败"));
    };
  });
  const [a, i, o, s] = t,
    l = Math.round(a * r.naturalWidth),
    d = Math.round(i * r.naturalHeight),
    u = Math.max(1, Math.round((o - a) * r.naturalWidth)),
    h = Math.max(1, Math.round((s - i) * r.naturalHeight)),
    p = Math.min(1, n / Math.max(u, h)),
    m = Math.max(1, Math.round(u * p)),
    f = Math.max(1, Math.round(h * p)),
    y = document.createElement("canvas");
  y.width = m, y.height = f;
  const b = y.getContext("2d");
  return b ? (b.drawImage(r, l, d, u, h, 0, 0, m, f), y.toDataURL("image/jpeg", .85)) : e;
}

function dgi(e, t, n, r) {
  var o;
  const a = r ? ogi(String(e.prompt || ""), r, t) : lgi(String(e.prompt || ""), t),
    i = ((o = e.settings) == null ? void 0 : o.focusEditThumbCache) || {};
  return {
    prompt: a,
    settings: {
      ...e.settings,
      focusEditThumbCache: {
        ...i,
        [t._markId]: n
      },
      focusEditLinkedMarkId: t._markId
    }
  };
}

const ugi = new Set(["x", "y", "width", "height", "nodeName"]);

function Wsn(e, t) {
  const n = t.find(r => r.id === e.id);
  return n ? Object.keys({
    ...e,
    ...n
  }).every(r => ugi.has(r) || Object.is(e[r], n[r])) : !1;
}

function hgi(e, t, n, r, a = !1) {
  return e.map(i => i.id !== t || i.type !== "gen-image" ? i : {
    ...i,
    ...dgi(i, Olr(n), r, a ? n._markId : void 0)
  });
}

function pgi(e, t, n) {
  return e.map(r => {
    var i;
    if (r.id !== t || r.type !== "gen-image") return r;
    const a = {
      ...((i = r.settings) == null ? void 0 : i.focusEditThumbCache)
    };
    return delete a[n], {
      ...r,
      prompt: sgi(String(r.prompt || ""), n),
      settings: {
        ...r.settings,
        focusEditThumbCache: a
      }
    };
  });
}

function mgi(e, t, n, r) {
  return e.some(a => a.from === t && a.to === n && (!a.inputType || a.inputType === "default")) ? e : [...e, {
    id: r,
    from: t,
    to: n
  }];
}

function fgi(e, t) {
  const n = o => t().nodes.some(s => s.id === o && s.type === "gen-image"),
    r = o => {
      const s = t(),
        l = e.capture(),
        d = s.document.lease(),
        u = s.nodes.find(h => h.id === o);
      return !s.active || !l.targetId || !d.isCurrent() || !u || !n(l.targetId) || !$lr(u, l.targetId) ? null : {
        p: s,
        scope: l,
        source: u,
        targetId: l.targetId,
        current: () => t().active && l.isCurrent() && d.isCurrent() && n(l.targetId) && Wsn(u, t().nodes)
      };
    },
    a = async (o, s, l) => {
      try {
        return await l.crop(o, Olr(s).box_2d);
      } catch {
        return o;
      }
    },
    i = (o, s, l, d) => {
      e.put(o.source.id, s);
      const u = () => o.current() && e.find(o.source.id, s._markId) === s;
      if (o.p.setNodes(h => u() && Wsn(o.source, h) ? hgi(h, o.targetId, s, l, d) : h), !d) {
        const h = o.p.generateId();
        o.p.setConnections(p => u() ? mgi(p, o.source.id, o.targetId, h) : p);
      }
      u() && t().openPrompt(o.targetId, d ? "refresh" : "selection");
    };
  return {
    dismiss: e.dismiss,
    cancelPending: e.cancelPending,
    toggle(o) {
      const s = t();
      !s.active || !s.document.current().ready || !n(o) || (s.cancelPicking(), e.toggle(o));
    },
    selectSource(o) {
      if (!(!e.getSnapshot().targetId || !t().active)) {
        if (!r(o)) {
          t().notify("请选择带图片的节点", "error");
          return;
        }
        e.selectSource(o);
      }
    },
    openTargetPrompt(o) {
      const s = t();
      s.active && s.document.current().ready && e.getSnapshot().targetId === o && n(o) && s.openPrompt(o, "explicit");
    },
    async pointPick(o, s, l) {
      const d = r(o);
      if (!d) return;
      const u = e.beginRecognition(o);
      if (!u) {
        t().notify("正在分析中，请稍候", "error");
        return;
      }
      const h = () => d.current() && u.isCurrent();
      try {
        const p = await d.p.io.resolveImage(d.source, d.targetId);
        if (!h()) return;
        if (!p) {
          t().notify("该节点暂无法识别，请换一张图片节点", "error");
          return;
        }
        const m = await d.p.io.recognize({
          imageUrl: p,
          sourceNodeId: o,
          clickX: s,
          clickY: l,
          apiConfigs: d.p.apiConfigs,
          globalApiKey: d.p.globalApiKey,
          modelId: d.p.modelId,
          platformGroup: d.p.platformGroup
        });
        if (!h()) return;
        const f = await a(p, m, d.p.io);
        if (!h()) return;
        i(d, m, f, !1);
      } catch (p) {
        h() && t().notify(p instanceof Error ? p.message : "细节分析失败", "error");
      } finally {
        u.finish();
      }
    },
    async changeLevel(o, s, l) {
      const d = r(o),
        u = e.find(o, s);
      if (!d || !u) return;
      const h = e.beginMark(o, s),
        p = () => d.current() && h.isCurrent();
      try {
        const m = await d.p.io.resolveImage(d.source, d.targetId);
        if (!p() || !m) return;
        const f = {
            ...u,
            activeLevel: l
          },
          y = await a(m, f, d.p.io);
        p() && i(d, f, y, !0);
      } catch (m) {
        p() && t().notify(m instanceof Error ? m.message : "细节分析失败", "error");
      }
    },
    remove(o, s) {
      const l = t(),
        d = e.capture(),
        u = l.document.lease();
      !l.active || !d.targetId || !u.isCurrent() || (e.remove(o, s), l.setNodes(h => t().active && u.isCurrent() ? pgi(h, d.targetId, s) : h));
    }
  };
}

async function ggi(e, t) {
  let n = mJe(e, t);
  if (!n || n.startsWith("canvas-node:")) return null;
  n.startsWith("content_ref:") && (n = await f5e(n));
  const r = e.settings ?? {},
    a = (typeof r._contentAssetId == "string" ? r._contentAssetId : "") || (typeof r._localCacheAssetId == "string" ? r._localCacheAssetId : "") || e._contentAssetId || "",
    i = e._compactOriginalRelPath ?? null;
  if (n.startsWith("blob:") || n.startsWith("content_ref:") || vs(n)) {
    const o = await Vm(n, a || null, i);
    o && (n = await new Promise((s, l) => {
      const d = new FileReader();
      d.onload = () => s(String(d.result)), d.onerror = () => l(d.error), d.readAsDataURL(o);
    }));
  }
  return n;
}

const ygi = {
  resolveImage: ggi,
  recognize: Jfi,
  crop: cgi
};

function bgi(e) {
  const [t] = g.useState(tgi),
    n = g.useSyncExternalStore(t.subscribe, t.getSnapshot, t.getSnapshot),
    [r, a] = g.useState(() => {
      var f;
      return (((f = e.preferences) == null ? void 0 : f.load) ?? A_t)();
    }),
    i = g.useRef(r),
    [o, s] = g.useState(null),
    l = g.useRef(!1),
    d = g.useRef(e);
  d.current = e;
  const u = g.useRef(null);
  u.current = {
    ...e,
    ...r,
    active: l.current,
    io: e.io ?? ygi,
    openPrompt(f, y) {
      const b = d.current,
        v = {
          genNodeId: f,
          t: Date.now()
        };
      y !== "refresh" && (b.selectNode(f), b.resumePrompt(v)), y === "explicit" && (b.registerPrompt(f, !0), s(v)), v5(f);
    }
  };
  const h = g.useMemo(() => fgi(t, () => ({
    ...u.current,
    ...i.current,
    active: l.current
  })), [t]);
  g.useLayoutEffect(() => {
    l.current = !0;
    const f = e.document.subscribe(() => {
      t.dismiss(), s(null);
    });
    return () => {
      l.current = !1, f(), t.dismiss();
    };
  }, [t, e.document]), g.useLayoutEffect(() => {
    const f = t.getSnapshot().targetId;
    f && !e.nodes.some(y => y.id === f && y.type === "gen-image") && t.dismiss(), t.prune(new Set(e.nodes.map(y => y.id)));
  }, [t, e.nodes]);
  const p = g.useCallback(f => {
      var b;
      const y = {
        ...i.current,
        modelId: f
      };
      i.current = y, a(y), (((b = d.current.preferences) == null ? void 0 : b.save) ?? Usn)(y);
    }, []),
    m = g.useCallback(f => {
      var b;
      const y = {
        ...i.current,
        platformGroup: f
      };
      i.current = y, a(y), (((b = d.current.preferences) == null ? void 0 : b.save) ?? Usn)(y);
    }, []);
  return {
    ...h,
    state: n,
    focusEditPromptOpenSnap: o,
    modelId: r.modelId,
    platformGroup: r.platformGroup,
    setModel: p,
    setPlatformGroup: m
  };
}

function vgi() {
  let e = null;
  const t = new Set(),
    n = {
      current: null
    },
    r = {
      current: null
    },
    a = {
      current: "default"
    },
    i = o => {
      e !== o && (e = o, n.current = (o == null ? void 0 : o.kind) === "reference" ? o.targetId : null, r.current = (o == null ? void 0 : o.kind) === "storyboard" ? o.target : null, a.current = (o == null ? void 0 : o.kind) === "reference" ? o.inputType : "default", t.forEach(s => s()));
    };
  return {
    getSnapshot: () => e,
    subscribe(o) {
      return t.add(o), () => {
        t.delete(o);
      };
    },
    compactTargetRef: n,
    storyboardTargetRef: r,
    inputTypeRef: a,
    startReference(o, s = "default") {
      i((e == null ? void 0 : e.kind) === "reference" && e.targetId === o ? null : {
        kind: "reference",
        targetId: o,
        inputType: s
      });
    },
    startStoryboard(o) {
      i({
        kind: "storyboard",
        target: o
      });
    },
    cancel() {
      i(null);
    },
    cancelReference() {
      (e == null ? void 0 : e.kind) === "reference" && i(null);
    },
    cancelStoryboard() {
      (e == null ? void 0 : e.kind) === "storyboard" && i(null);
    },
    consume(o) {
      return e !== o ? !1 : (i(null), !0);
    }
  };
}

function wgi() {
  const [e] = g.useState(vgi),
    t = g.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getSnapshot);
  return {
    session: e,
    compactTargetId: (t == null ? void 0 : t.kind) === "reference" ? t.targetId : null,
    storyboardTarget: (t == null ? void 0 : t.kind) === "storyboard" ? t.target : null
  };
}

const xgi = 14,
  _gi = 7;

function $z(e) {
  return e && Vj(e) ? _gi : xgi;
}

function kgi(e) {
  return e <= 1 ? 1 : e <= 4 ? 2 : e <= 9 ? 3 : 4;
}

function GCe(e) {
  return e.image_urls && Array.isArray(e.image_urls) && e.image_urls.length > 0 ? e.image_urls : e.image_url && typeof e.image_url == "string" && e.image_url.trim() ? [e.image_url] : [];
}

function bUe(e) {
  const t = e.image_thumb_urls;
  return Array.isArray(t) ? t.map(n => typeof n == "string" ? n.trim() : "").filter(n => n.length > 0) : [];
}

function FBt(e, t, n) {
  const a = bUe(e)[t];
  return a || iLe(n) || n;
}

function Agi(e, t, n, r) {
  const a = [...e],
    i = t.length === e.length ? [...t] : [],
    [o] = a.splice(n, 1);
  if (a.splice(r, 0, o), i.length === e.length) {
    const [s] = i.splice(n, 1);
    i.splice(r, 0, s);
  }
  return {
    image_urls: a,
    image_thumb_urls: i
  };
}

function Sgi(e, t, n) {
  const r = e.filter((i, o) => o !== n),
    a = t.length === e.length ? t.filter((i, o) => o !== n) : [];
  return {
    image_urls: r,
    image_thumb_urls: a
  };
}

function Hlr(e, t, n, r, a) {
  const i = [...e, n].slice(0, a),
    o = (r == null ? void 0 : r.trim()) || n;
  let s = t.length === e.length ? [...t, o] : [...t];
  return s.length < i.length ? s = [...s, o] : s = s.slice(0, i.length), s = s.slice(0, a), {
    image_urls: i,
    image_url: i[0] || "",
    image_thumb_urls: s
  };
}

async function Igi(e, t) {
  const n = String(e || "").trim();
  if (!n) throw new Error("[finalizeStoryboardGeneratedVideo] empty remote video url");
  if (ua()) {
    const i = await xT([n], t, !0);
    if (i) {
      const o = Qpt(i, n, null),
        s = _T(i, {
          type: "video"
        }),
        l = typeof s.thumbnailUrl == "string" && s.thumbnailUrl || typeof s.videoPosterUrl == "string" && s.videoPosterUrl || void 0;
      return {
        playbackUrl: o,
        historyUpdate: {
          ...s,
          status: "completed",
          progress: 100
        },
        shotMediaPatch: {
          video_url: o,
          ...(l && l !== o ? {
            video_thumb_url: l
          } : {}),
          _globalOssUrlOnly: !0,
          _ossRemoteUrl: s._ossRemoteUrl,
          _ossThumbnailUrl: s._ossThumbnailUrl,
          _assetId: void 0
        }
      };
    }
  }
  try {
    const {
      downloadUrlToLocal: i
    } = await Ie(async () => {
      const {
        downloadUrlToLocal: o
      } = await Promise.resolve().then(() => No);
      return {
        downloadUrlToLocal: o
      };
    }, void 0, import.meta.url);
    await i(n, t, `storyboard_${t}.mp4`);
  } catch (i) {
    console.warn("[finalizeStoryboardGeneratedVideo] downloadUrlToLocal 失败，尝试 assetDownloader:", i), await oy({
      url: n,
      type: "video"
    }, t);
  }
  let r = null;
  try {
    r = await ni.getAssetUrl(t);
  } catch {}
  const a = Qpt(null, n, r);
  return {
    playbackUrl: a,
    historyUpdate: {
      url: a,
      status: "completed",
      progress: 100,
      _assetId: t,
      ossUploaded: !1,
      _globalOssUrlOnly: !1,
      _ossRemoteUrl: void 0,
      _ossThumbnailUrl: void 0,
      originalUrl: void 0,
      thumbnailUrl: void 0,
      videoPosterUrl: void 0
    },
    shotMediaPatch: {
      video_url: a,
      _assetId: t,
      _globalOssUrlOnly: !1,
      _ossRemoteUrl: void 0,
      _ossThumbnailUrl: void 0,
      video_thumb_url: void 0
    }
  };
}

async function Cgi(e, t, n) {
  const r = _ce(t) || kce(t),
    {
      isVeoFastHttpImageUrl: a,
      normalizeOssPublicHttpUrl: i
    } = await Ie(async () => {
      const {
        isVeoFastHttpImageUrl: o,
        normalizeOssPublicHttpUrl: s
      } = await Promise.resolve().then(() => ii);
      return {
        isVeoFastHttpImageUrl: o,
        normalizeOssPublicHttpUrl: s
      };
    }, void 0, import.meta.url);
  return Promise.all(e.map(async (o, s) => {
    const l = i(String(o || "").trim()) || String(o || "").trim();
    if (!l) throw new Error(`参考图 ${s + 1} 为空`);
    if (r && a(l)) return console.log(`[分镜] Veo Fast/Lite 参考图 ${s + 1} 使用 HTTP/OSS URL:`, l.slice(0, 120)), l;
    const d = await n(l);
    if (!r && !d.startsWith("data:image/")) throw new Error(`参考图 ${s + 1} 不是有效的 base64 图片`);
    return d;
  }));
}

function Egi(e, t, n) {
  return !e || t <= 0 || Vj(n) ? e : e.replace(/@(\d+)/g, (r, a) => {
    const i = parseInt(a, 10);
    return !i || i > t ? r : `图片${i}`;
  });
}

function Wlr(e) {
  var n;
  const t = (n = e == null ? void 0 : e.settings) == null ? void 0 : n.shots;
  return Array.isArray(t) && t.every(r => r && typeof r == "object" && !Array.isArray(r)) ? t : null;
}

function qsn(e, t) {
  var r;
  if (t.kind === "reference") return e.some(a => a.id === t.targetId);
  const n = e.find(a => a.id === t.target.boardNodeId);
  return ((r = Wlr(n)) == null ? void 0 : r.some(a => a.id === t.target.shotId)) ?? !1;
}

function qlr(e, t, n, r, a) {
  const i = e.find(s => s.id === n),
    o = e.find(s => s.id === r);
  return !!i && !!o && Glr(i, o, {
    connections: t,
    inputType: a
  });
}

function Tgi(e, t, n, r, a, i) {
  return qlr(t, e, n, r, a) ? a !== "default" ? e.some(o => o.from === n && o.to === r && o.inputType === a) ? e : [...e.filter(o => !(o.to === r && o.inputType === a)), {
    id: i,
    from: n,
    to: r,
    inputType: a
  }] : e.some(o => o.from === n && o.to === r && (!o.inputType || o.inputType === "default")) ? e : [...e, {
    id: i,
    from: n,
    to: r
  }] : e;
}

function Mgi(e, t, n) {
  const r = e.find(d => d.id === n);
  if (!r || !Vlr(r)) return e;
  const a = fJe(r);
  if (!a) return e;
  const i = e.find(d => d.id === t.boardNodeId),
    o = Wlr(i);
  if (!o) return e;
  const s = o.find(d => d.id === t.shotId);
  if (!s) return e;
  let l;
  if (t.pickKind === "startFrame") l = {
    startFrame: a
  };else if (t.pickKind === "endFrame") l = {
    endFrame: a
  };else {
    const d = Array.isArray(s.image_urls) ? s.image_urls : typeof s.image_url == "string" ? [s.image_url] : [];
    if (d.includes(a)) return e;
    const u = Array.isArray(s.image_thumb_urls) ? s.image_thumb_urls : [],
      h = d.map((p, m) => u[m] || p);
    l = Hlr(d, h, a, agi(r) || a, $z(typeof s.model == "string" ? s.model : void 0));
  }
  return e.map(d => d !== i ? d : {
    ...d,
    settings: {
      ...d.settings,
      shots: o.map(u => u !== s ? u : {
        ...u,
        ...l
      })
    }
  });
}

function Pgi(e) {
  const t = g.useRef(e);
  t.current = e;
  const n = g.useRef(!1),
    r = g.useRef({}),
    {
      session: a,
      document: i
    } = e;
  g.useLayoutEffect(() => {
    n.current = !0, r.current = {};
    const u = i.subscribe(() => a.cancel());
    return () => {
      n.current = !1, r.current = {}, u(), a.cancel();
    };
  }, [a, i]), g.useLayoutEffect(() => {
    const u = a.getSnapshot();
    u && !qsn(e.nodes, u) && a.cancel();
  }, [e.nodes, a]);
  const o = g.useCallback((u, h = "default") => {
      const p = t.current;
      !n.current || !p.document.current().ready || p.nodes.some(m => m.id === u) && (p.dismissFocusEdit(), p.session.startReference(u, h));
    }, []),
    s = g.useCallback((u, h, p = "ref") => {
      const m = t.current,
        f = {
          boardNodeId: u,
          shotId: h,
          pickKind: p
        };
      !n.current || !m.document.current().ready || !qsn(m.nodes, {
        kind: "storyboard",
        target: f
      }) || (m.dismissFocusEdit(), m.session.startStoryboard(f));
    }, []),
    l = g.useCallback(u => {
      const h = t.current,
        p = h.session.getSnapshot(),
        m = h.document.lease();
      if (!n.current || !m.isCurrent() || (p == null ? void 0 : p.kind) !== "reference" || !qlr(h.nodes, h.connections, u, p.targetId, p.inputType) || !h.session.consume(p)) return;
      const f = h.generateId(),
        y = r.current;
      h.setConnections(b => n.current && r.current === y && m.isCurrent() ? Tgi(b, t.current.nodes, u, p.targetId, p.inputType, f) : b), h.selectNode(p.targetId), h.resumePrompt({
        genNodeId: p.targetId,
        t: Date.now()
      });
    }, []),
    d = g.useCallback(u => {
      const h = t.current,
        p = h.session.getSnapshot(),
        m = h.document.lease();
      if (!n.current || !m.isCurrent() || (p == null ? void 0 : p.kind) !== "storyboard") return;
      const f = h.nodes.find(b => b.id === u);
      if (!f || !Vlr(f) || !fJe(f) || !h.session.consume(p)) return;
      const y = r.current;
      h.setNodes(b => n.current && r.current === y && m.isCurrent() ? Mgi(b, p.target, u) : b);
    }, []);
  return g.useLayoutEffect(() => {
    const u = p => {
        const m = t.current;
        p.key !== "Escape" || !m.session.getSnapshot() && !m.focusEditActive || (m.session.cancel(), m.dismissFocusEdit());
      },
      h = p => {
        var f, y;
        const m = t.current;
        ((f = m.session.getSnapshot()) == null ? void 0 : f.kind) !== "reference" || !(p.target instanceof Node) || !((y = m.canvasRef.current) != null && y.contains(p.target)) || (p.preventDefault(), p.stopPropagation(), m.session.cancelReference());
      };
    return window.addEventListener("keydown", u), document.addEventListener("contextmenu", h, !0), () => {
      window.removeEventListener("keydown", u), document.removeEventListener("contextmenu", h, !0);
    };
  }, []), {
    startCompactRefCanvasPick: o,
    startStoryboardShotCanvasPick: s,
    finalizeCompactRefCanvasPick: l,
    finalizeStoryboardShotCanvasPick: d
  };
}

function SO(e, t) {
  if (!e()) throw new Error(`画布会话已失效，未${t}。`);
}

function Pot(e, t, n) {
  const r = e == null ? void 0 : e.lease(),
    a = () => r ? r.isCurrent() : t();
  return SO(a, n), a;
}

function Ape() {
  let e = null,
    t = !0,
    n = !0,
    r = {};
  const a = new Set(),
    i = () => {
      r = {};
      for (const s of a) s();
    },
    o = () => ({
      projectId: e,
      ready: n && !t,
      token: r
    });
  return {
    current: o,
    replace(s, l) {
      e = s, t = l, i();
    },
    commit(s, l) {
      e === s && t === l || (e = s, t = l, i());
    },
    activate() {
      n = !0;
    },
    dispose() {
      n = !1, i();
    },
    subscribe(s) {
      return a.add(s), () => {
        a.delete(s);
      };
    },
    lease() {
      const s = o(),
        l = () => s.ready && o().ready && r === s.token;
      return {
        ...s,
        isCurrent: l,
        assertCurrent() {
          if (!l()) throw new Error("画布项目已切换或尚未就绪，已停止本次生成派发。");
        }
      };
    }
  };
}

function Rgi() {
  const [e] = g.useState(Ape);
  return g.useLayoutEffect(() => (e.activate(), () => e.dispose()), [e]), e;
}

const Ksn = "qdm-canvas-node-generate";

function Ngi(e) {
  const t = n => {
    var a;
    const r = (a = n.detail) == null ? void 0 : a.node;
    r && typeof r.id == "string" && r.id && e(r);
  };
  return window.addEventListener(Ksn, t), () => window.removeEventListener(Ksn, t);
}

function jgi(e) {
  const t = new Map();
  return {
    dispatch: async a => {
      var h;
      const i = e(),
        o = i.document.lease();
      if (o.assertCurrent(), (a.projectId ?? null) !== o.projectId) throw new Error("生产任务不属于当前画布项目，未派发生成。");
      const s = i.nodesRef.current.find(p => p.id === a.nodeId);
      if (!s) throw new Error(`generation dispatch failed, node not found: ${a.nodeId}`);
      if (String(s.prompt || ((h = s.settings) == null ? void 0 : h.text) || "").trim().length < 8) throw new Error("提示词未就绪，生成请求未发送。");
      if (i.dispatchRef.current.has(s.id) && !t.has(s.id)) return;
      const d = t.get(s.id),
        u = (d == null ? void 0 : d.token) === o.token ? d : {
          token: o.token,
          count: 0
        };
      u.count++, t.set(s.id, u), i.dispatchRef.current.add(s.id);
      try {
        i.noteStarted(s.id), i.visual(s.id, !0), await i.generate({
          ...s,
          settings: jDn({
            ...s.settings,
            _autoCreatedPreviewId: void 0
          }, i.preferencesRef.current)
        });
      } finally {
        u.count--, t.get(s.id) === u && u.count === 0 && (t.delete(s.id), o.isCurrent() && i.dispatchRef.current.delete(s.id));
      }
    },
    reset: () => {
      const a = e();
      for (const [i, o] of t) o.token !== a.document.current().token && (t.delete(i), a.dispatchRef.current.delete(i));
    }
  };
}

const Dgi = new Set(["gen-image", "generate-character-image", "generate-scene-image", "gen-video", "motion-control", "generate-character-video", "generate-scene-video", "gen-music", "gen-speech"]);

async function Lgi(e, t) {
  const n = t.document.lease();
  try {
    n.assertCurrent(), t.noteStarted(e.id), t.visual(e.id, !0), await t.generate(e);
  } catch (r) {
    t.report("[CanvasNodeGenerate]", r);
  }
}

async function Ogi(e, t) {
  var a;
  const n = t.document.lease();
  n.assertCurrent();
  const r = t.nodesRef.current.find(i => i.id === e);
  if (!r) {
    t.report("[handleExecuteNode] 节点不存在:", e);
    return;
  }
  if (Dgi.has(r.type)) {
    const i = r.type === "gen-video" && ((a = r.settings) == null ? void 0 : a._agentAwaitUserPlay) === !0;
    i && t.setNodes(s => n.isCurrent() ? s.map(l => l.id === e ? {
      ...l,
      settings: {
        ...l.settings,
        _agentAwaitUserPlay: !1
      }
    } : l) : s);
    const o = {
      ...r.settings,
      _autoCreatedPreviewId: void 0,
      ...(i ? {
        _agentAwaitUserPlay: !1
      } : {})
    };
    await t.generate({
      ...r,
      settings: o
    });
  } else if (r.type === "custom-agent" || r.type === "text-node") {
    const i = Date.now();
    t.setNodes(o => n.isCurrent() ? o.map(s => s.id === e ? {
      ...s,
      settings: {
        ...s.settings,
        _executeTrigger: i
      }
    } : s) : o);
  } else t.report("[handleExecuteNode] 节点类型不支持执行:", r.type);
}

function Bgi(e) {
  const t = g.useRef({
    ...e,
    noteStarted: UQ,
    visual: hu,
    report: console.warn
  });
  g.useLayoutEffect(() => {
    t.current = {
      ...t.current,
      ...e
    };
  });
  const [n] = g.useState(() => jgi(() => t.current)),
    [r] = g.useState(() => a => Ogi(a, t.current));
  return g.useEffect(() => {
    let a;
    const i = () => {
        a == null || a(), a = void 0, n.reset(), e.document.current().ready && (a = zZn(n.dispatch));
      },
      o = e.document.subscribe(i);
    i();
    const s = Ngi(l => {
      Lgi(l, t.current);
    });
    return () => {
      o(), s(), a == null || a(), n.reset();
    };
  }, [e.document, n]), r;
}

let nz = {
  open: !1,
  tab: "current",
  focusRunId: null,
  focusRecipeId: null
};

const C_t = new Set();

function Klr() {
  for (const e of C_t) e();
}

function E_t() {
  return nz;
}

function Fgi(e) {
  return C_t.add(e), () => C_t.delete(e);
}

function qP(e = "current", t) {
  if (typeof window !== "undefined") window.__AIYOUPLUS_LOCAL__?.close();
  typeof window < "u" && h5() && window.innerWidth < Qge() + 560 && nWe(), nz = {
    ...nz,
    open: !0,
    tab: e === "permissions" ? "permissions" : "current",
    focusRunId: t != null && t.runId ? String(t.runId) : nz.focusRunId,
    focusRecipeId: t != null && t.recipeId ? String(t.recipeId) : nz.focusRecipeId
  }, Klr();
}

function vUe() {
  nz.open && (nz = {
    ...nz,
    open: !1
  }, Klr());
}

function Qlr() {
  return g.useSyncExternalStore(Fgi, E_t, E_t);
}

const zgi = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
  "audio/mp4": "m4a",
  "text/plain": "txt"
};

function wUe(e) {
  return String(e || "").trim().replace(/\\/g, "/").replace(/\/+$/, "").toLocaleLowerCase();
}

async function Ugi(e, t) {
  const n = String(t || "").trim();
  let r = String(e.directory || "").trim();
  if (e.autoSave && n && (!r || wUe(r) === wUe(n))) {
    const {
      join: a
    } = await Ie(async () => {
      const {
        join: i
      } = await Promise.resolve().then(() => wT);
      return {
        join: i
      };
    }, void 0, import.meta.url);
    r = await a(n, "成品");
  }
  return {
    autoSave: e.autoSave,
    directory: r,
    fileNameTemplate: String(e.fileNameTemplate || "").trim() || "{{recipeName}}_{{date}}_{{index}}",
    collisionPolicy: e.collisionPolicy
  };
}

function Cfe(e) {
  return String(e).padStart(2, "0");
}

function $gi(e) {
  const t = e.now ?? new Date(),
    n = {
      recipeName: e.recipeName,
      outputLabel: e.outputLabel,
      runId: e.runId,
      index: String(Math.max(1, e.index)).padStart(2, "0"),
      date: `${t.getFullYear()}${Cfe(t.getMonth() + 1)}${Cfe(t.getDate())}`,
      time: `${Cfe(t.getHours())}${Cfe(t.getMinutes())}${Cfe(t.getSeconds())}`
    },
    r = String(e.template || "{{recipeName}}_{{date}}_{{index}}").replace(/\{\{\s*(recipeName|outputLabel|runId|index|date|time)\s*\}\}/g, (a, i) => n[i] || "").replace(/\{\{[^{}]+\}\}/g, "").replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").trim();
  return s_(r || `${e.recipeName}_${n.index}`, 120).replace(/\.[a-z0-9]{2,5}$/i, "");
}

function Ggi(e) {
  var n, r;
  const t = String(e || "").trim();
  if (!t || t.startsWith("blob:") || t.startsWith("data:") || t.startsWith("local-asset:")) return null;
  try {
    const i = new URL(t).pathname.match(/\.([a-z0-9]{2,5})$/i);
    return ((n = i == null ? void 0 : i[1]) == null ? void 0 : n.toLowerCase()) || null;
  } catch {
    const a = t.split(/[?#]/)[0].match(/\.([a-z0-9]{2,5})$/i);
    return ((r = a == null ? void 0 : a[1]) == null ? void 0 : r.toLowerCase()) || null;
  }
}

function Qsn(e, t) {
  const n = zgi[String(t.type || "").toLowerCase()];
  if (n) return n;
  const r = Ggi(e.url || "");
  return r || (e.mediaType === "video" ? "mp4" : e.mediaType === "audio" ? "mp3" : e.mediaType === "text" ? "txt" : "png");
}

function Ysn(e) {
  const t = e.settings || {},
    n = t._localCacheAssetId || t._assetId || t._contentAssetId || e._contentAssetId;
  return typeof n == "string" && n.trim() ? n.trim() : void 0;
}

function Vgi(e) {
  const t = String(e || "").trim();
  if (!t.startsWith("local-asset://")) return null;
  const n = t.slice(14).trim();
  if (!n) return null;
  try {
    return decodeURIComponent(n) || null;
  } catch {
    return n;
  }
}

async function Hgi(e) {
  const t = String(e.nodeName || e.type || "成品").trim();
  if (e.type === "text-node") return [{
    nodeId: e.id,
    sourceKey: `${e.id}:0`,
    outputLabel: t,
    mediaType: "text",
    blob: new Blob([String(e.content || e.prompt || "")], {
      type: "text/plain"
    })
  }];
  if (e.type === "gen-image" || e.type === "gen-video") {
    const {
        getGenImageVideoAllDownloadUrls: s
      } = await Ie(async () => {
        const {
          getGenImageVideoAllDownloadUrls: d
        } = await Promise.resolve().then(() => LM);
        return {
          getGenImageVideoAllDownloadUrls: d
        };
      }, void 0, import.meta.url),
      l = e.type === "gen-video" ? "video" : "image";
    return s(e).map((d, u) => ({
      nodeId: e.id,
      sourceKey: `${e.id}:${u}`,
      outputLabel: t,
      mediaType: l,
      url: d.url,
      assetId: d.assetId || Ysn(e)
    }));
  }
  const n = e.settings || {},
    r = typeof n.audioUrl == "string" ? n.audioUrl.trim() : "",
    a = typeof e.content == "string" ? e.content.trim() : "",
    i = r || a;
  if (!i) return [];
  const o = r || /audio|speech|music/i.test(e.type) ? "audio" : /video/i.test(e.type) ? "video" : "image";
  return [{
    nodeId: e.id,
    sourceKey: `${e.id}:0`,
    outputLabel: t,
    mediaType: o,
    url: i,
    assetId: Ysn(e)
  }];
}

async function Wgi(e) {
  if (e.blob) return e.blob;
  const t = String(e.url || "").trim(),
    n = e.assetId || Vgi(t) || "";
  if (n) try {
    const {
        readLocalOriginalAssetBlob: o
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetBlob: l
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetBlob: l
        };
      }, void 0, import.meta.url),
      s = await o(n, /^https?:\/\//i.test(t) ? t : void 0, {
        allowPreviewFallback: e.mediaType !== "image"
      });
    if (s != null && s.size) return s;
  } catch {}
  let r = t;
  if (r.startsWith("content_ref:")) {
    const {
      contentStore: o
    } = await Ie(async () => {
      const {
        contentStore: s
      } = await Promise.resolve().then(() => Ly);
      return {
        contentStore: s
      };
    }, void 0, import.meta.url);
    r = (await o.get(o.extractId(r))) || "";
  }
  if (!r || r.startsWith("local-asset://")) throw new Error("本地产物原文件不可用");
  if (/^https?:\/\//i.test(r)) {
    const {
        downloadWithFallback: o
      } = await Ie(async () => {
        const {
          downloadWithFallback: l
        } = await Promise.resolve().then(() => El);
        return {
          downloadWithFallback: l
        };
      }, void 0, import.meta.url),
      s = await o(r, e.mediaType === "image" ? 9e4 : 3e5);
    if (s.size) return s;
    throw new Error("下载到的产物为空");
  }
  const a = await fetch(r, {
    cache: "no-store"
  });
  if (!a.ok) throw new Error(`读取产物失败 HTTP ${a.status}`);
  const i = await a.blob();
  if (!i.size) throw new Error("读取到的产物为空");
  return i;
}

async function qgi(e) {
  const {
      join: t
    } = await Ie(async () => {
      const {
        join: o
      } = await Promise.resolve().then(() => wT);
      return {
        join: o
      };
    }, void 0, import.meta.url),
    {
      exists: n
    } = await Ie(async () => {
      const {
        exists: o
      } = await Promise.resolve().then(() => oc);
      return {
        exists: o
      };
    }, void 0, import.meta.url),
    r = async (o = "") => {
      const s = `${e.baseName}${o}.${e.extension}`;
      return {
        fileName: s,
        path: await t(e.directory, s)
      };
    },
    a = await r(),
    i = async o => e.reserved.has(wUe(o)) || (await n(o));
  if (e.policy === "overwrite" || !(await i(a.path))) return a;
  if (e.policy === "skip") return null;
  for (let o = 2; o <= 9999; o += 1) {
    const s = await r(`_${o}`);
    if (!(await i(s.path))) return s;
  }
  throw new Error(`无法为 ${a.fileName} 分配可用文件名`);
}

async function Kgi(e) {
  var h, p, m, f, y;
  const t = e.run.delivery;
  if (!(t != null && t.config.autoSave)) return {
    files: [],
    skipped: []
  };
  const n = String(t.config.directory || "").trim();
  if (!n) throw new Error("尚未设置成品输出目录");
  (h = e.assertCanWrite) == null || h.call(e);
  const {
    exists: r,
    mkdir: a
  } = await Ie(async () => {
    const {
      exists: b,
      mkdir: v
    } = await Promise.resolve().then(() => oc);
    return {
      exists: b,
      mkdir: v
    };
  }, void 0, import.meta.url);
  (await r(n)) || ((p = e.assertCanWrite) == null || p.call(e), await a(n, {
    recursive: !0
  }));
  const i = new Map(e.nodes.map(b => [b.id, b])),
    o = [];
  for (const b of e.run.artifacts) {
    if (b.kind !== "output" || b.status !== "ready") continue;
    const v = i.get(b.nodeId);
    v && o.push(...(await Hgi(v)));
  }
  if (o.length === 0) throw new Error("没有可保存的已就绪产物");
  const s = [...t.files],
    l = new Set(t.files.map(b => b.sourceKey).filter(Boolean)),
    d = [],
    u = new Set();
  for (const [b, v] of o.entries()) {
    if ((m = e.assertCanWrite) == null || m.call(e), l.has(v.sourceKey)) continue;
    const _ = await Wgi(v),
      w = $gi({
        template: t.config.fileNameTemplate,
        recipeName: e.run.name.replace(/\s+v\d+$/, ""),
        outputLabel: v.outputLabel,
        runId: e.run.id,
        index: b + 1,
        now: e.now
      }),
      k = await qgi({
        directory: n,
        baseName: w,
        extension: Qsn(v, _),
        policy: t.config.collisionPolicy,
        reserved: u
      });
    if (!k) {
      d.push({
        nodeId: v.nodeId,
        fileName: `${w}.${Qsn(v, _)}`
      });
      continue;
    }
    (f = e.assertCanWrite) == null || f.call(e), await v5t(k.path, _), u.add(wUe(k.path));
    const A = {
      nodeId: v.nodeId,
      sourceKey: v.sourceKey,
      fileName: k.fileName,
      path: k.path,
      savedAt: Date.now()
    };
    s.push(A), l.add(v.sourceKey), await ((y = e.onFileSaved) == null ? void 0 : y.call(e, A));
  }
  return {
    files: s,
    skipped: d
  };
}

const Qgi = new Set(["queued", "running"]),
  Ygi = new Set(["run_generation", "execute_node", "retry_step"]),
  Xgi = 2e3;

function Rot(e) {
  return Number(e.timestamp || e.startTime || 0);
}

function Jgi(e, t, n, r) {
  return e.filter(a => {
    if (String(a.sourceNodeId || "") !== t) return !1;
    const i = Rot(a);
    return i <= 0 ? !r : i >= n;
  }).sort((a, i) => Rot(i) - Rot(a))[0];
}

function Zgi(e) {
  return !e || e.status !== "completed" ? !1 : !!(String(e.url || e.originalUrl || e.audioUrl || "").trim() || Array.isArray(e.mjImages) && e.mjImages.length > 0);
}

function e0i(e) {
  return [...new Set(e.artifacts.filter(t => t.kind === "input" && t.status !== "failed").map(t => t.nodeId).filter(Boolean))];
}

function t0i(e, t, n) {
  return e.filter(r => !n.some(a => a.from === r && a.to === t && (!a.inputType || a.inputType === "default")));
}

function n0i(e) {
  const {
      run: t,
      task: n,
      node: r,
      connections: a,
      history: i,
      jobs: o,
      inputNodeIds: s
    } = e,
    l = n.nodeIds[0],
    u = o.filter(C => C.taskId === n.id || C.nodeId === l).filter(C => Ygi.has(C.action)),
    h = u.slice().sort((C, I) => I.createdAt - C.createdAt || I.id.localeCompare(C.id))[0],
    p = !!(h && Qgi.has(h.status)),
    m = (h == null ? void 0 : h.status) === "failed" ? h : void 0,
    f = (h == null ? void 0 : h.status) === "cancelled" ? h : void 0,
    y = u.length > 0 || n.status === "running",
    b = n.note === "recipe-output:new",
    v = Jgi(i, l, t.startedAt, !b);
  if (!y) return {
    status: n.status === "queued" ? "queued" : "ready",
    artifactStatus: "pending"
  };
  if (!r) return p ? {
    status: "running",
    artifactStatus: "generating"
  } : {
    status: "blocked",
    artifactStatus: "failed",
    error: `输出节点 ${l} 已不存在`
  };
  const _ = t0i(s, l, a);
  if (_.length > 0) return {
    status: "blocked",
    artifactStatus: "failed",
    error: `输出节点 ${r.nodeName || r.id} 缺少 ${_.length} 条输入连线`
  };
  if ((v == null ? void 0 : v.status) === "generating" || p || r.isGenerating) return {
    status: "running",
    artifactStatus: "generating"
  };
  const w = String(r.errorMsg || "").trim();
  if ((v == null ? void 0 : v.status) === "failed" || m || f || w) return {
    status: "blocked",
    artifactStatus: "failed",
    error: String((v == null ? void 0 : v.errorMsg) || (m == null ? void 0 : m.lastError) || w || "生成任务失败")
  };
  if (Zgi(v) || (v == null ? void 0 : v.status) === "completed" && Y_e(r) || b && Y_e(r)) return {
    status: "completed",
    artifactStatus: "ready"
  };
  const A = (h == null ? void 0 : h.finishedAt) || 0,
    S = A > 0 ? Xgi - Math.max(0, e.now - A) : 0;
  return S > 0 ? {
    status: "running",
    artifactStatus: "generating",
    recheckAfterMs: S
  } : {
    status: "blocked",
    artifactStatus: "failed",
    error: `输出节点 ${r.nodeName || r.id} 的生成已结束，但没有可用产物`
  };
}

function r0i(e) {
  return !!(e != null && e.tasks.some(t => t.category === "recipe"));
}

function a0i(e) {
  var v;
  const {
    run: t
  } = e;
  if (!r0i(t) || t.status === "completed" || t.status === "paused" || t.status === "waiting_approval") return {
    run: t,
    changed: !1,
    transition: "none",
    completedNodeIds: [],
    failedNodeIds: []
  };
  const n = new Map(e.nodes.map(_ => [_.id, _])),
    r = e0i(t),
    a = new Map(),
    i = t.tasks.map(_ => {
      if (_.category !== "recipe" || _.nodeIds.length === 0) return _;
      const w = n0i({
        run: t,
        task: _,
        node: n.get(_.nodeIds[0]),
        connections: e.connections,
        history: e.history,
        jobs: e.jobs.filter(k => k.runId === t.id),
        inputNodeIds: r,
        now: e.now ?? Date.now()
      });
      return a.set(_.id, w), _.status === w.status ? _ : {
        ..._,
        status: w.status
      };
    }),
    o = t.artifacts.map(_ => {
      if (_.kind !== "output") return _;
      const w = i.find(A => A.id === _.taskId || A.nodeIds.includes(_.nodeId)),
        k = w ? a.get(w.id) : void 0;
      return k && _.status !== k.artifactStatus ? {
        ..._,
        status: k.artifactStatus
      } : _;
    }),
    s = i.filter(_ => _.category === "recipe" && _.status === "completed").flatMap(_ => _.nodeIds),
    l = i.filter(_ => _.category === "recipe" && _.status === "blocked"),
    d = l.flatMap(_ => _.nodeIds),
    u = i.filter(_ => _.category === "recipe"),
    h = [...a.values()].map(_ => _.recheckAfterMs).filter(_ => typeof _ == "number" && _ > 0).sort((_, w) => _ - w)[0],
    p = t.tasks.some((_, w) => {
      var k;
      return _.status !== ((k = i[w]) == null ? void 0 : k.status);
    }),
    m = t.artifacts.some((_, w) => {
      var k;
      return _.status !== ((k = o[w]) == null ? void 0 : k.status);
    });
  let f = p || m ? {
      ...t,
      tasks: i,
      artifacts: o,
      updatedAt: Math.max(e.now ?? Date.now(), t.updatedAt + 1)
    } : t,
    y = p || m ? "progress" : "none",
    b;
  if (l.length > 0) {
    b = ((v = a.get(l[0].id)) == null ? void 0 : v.error) || `${l.length} 个输出未通过验收`;
    const _ = f.lastError === b ? f : {
      ...f,
      lastError: b,
      updatedAt: Math.max(e.now ?? Date.now(), f.updatedAt + 1)
    };
    f = Ug(_, "failed", b, e.now), y = t.status === "failed" ? y : "failed";
  } else u.length > 0 && u.every(_ => _.status === "completed") ? (b = `${s.length} 个配方产物已生成并通过结构检查`, f = Ug(f, "reviewing", b, e.now), y = t.status === "reviewing" ? y : "reviewing") : u.some(_ => _.status === "running") && f.status !== "waiting_generation" && (f = Ug({
    ...f,
    lastError: void 0
  }, "waiting_generation", "等待配方产物生成", e.now));
  return {
    run: f,
    changed: f !== t,
    transition: y,
    completedNodeIds: s,
    failedNodeIds: d,
    message: b,
    recheckAfterMs: h
  };
}

function xH(e, t) {
  return !!e && e.id === t.id && (e.projectId ?? null) === (t.projectId ?? null);
}

function Bde(e, t) {
  return e.ready && e.projectId === (t.projectId ?? null);
}

const Ylr = e => ({
  nodeId: e.nodeId,
  kind: "delivery",
  status: "ready",
  fileName: e.fileName,
  savedPath: e.path,
  savedAt: e.savedAt
});

function i0i(e, t) {
  return e.delivery ? X_e({
    ...e,
    artifacts: [...e.artifacts.filter(n => !(n.kind === "delivery" && n.savedPath === t.path)), Ylr(t)]
  }, {
    ...e.delivery,
    status: "saving",
    files: [...e.delivery.files.filter(n => n.sourceKey !== t.sourceKey), t]
  }) : e;
}

function o0i(e, t) {
  return e.delivery ? X_e({
    ...e,
    artifacts: [...e.artifacts.filter(n => n.kind !== "delivery"), ...t.map(Ylr)]
  }, {
    ...e.delivery,
    status: "completed",
    files: t,
    error: void 0
  }) : e;
}

function s0i(e, t) {
  return e.delivery ? X_e(e, {
    ...e.delivery,
    status: "failed",
    error: t
  }) : e;
}

async function l0i(e, t, n) {
  const r = n.session,
    a = () => {
      const o = e.context();
      return o.session === r && Bde(o, t) && xH(e.retainedRun(), t) && xH(e.readCheckpoint(t.projectId ?? null), t);
    },
    i = o => {
      const s = e.readCheckpoint(t.projectId ?? null);
      if (!xH(s, t)) return;
      const l = e.retainedRun(),
        d = xH(l, t) && Bde(e.context(), t),
        u = d ? l : s;
      if (!xH(u, t) || !u.delivery) return;
      const h = o(u);
      e.checkpoint(h), d && e.publish(h);
    };
  try {
    const o = await e.save({
      run: t,
      nodes: [...n.nodes],
      assertCanWrite: () => {
        if (!a()) throw new Error("画布项目或生产运行已切换，或恢复记录已变更；已停止后续成品写入，已保存文件保留。");
      },
      onFileSaved: s => i(l => i0i(l, s))
    });
    i(s => o0i(s, o.files)), a() && e.success(o.files.length > 0 ? `已自动保存 ${o.files.length} 个成品${o.skipped.length ? `，跳过 ${o.skipped.length} 个重名文件` : ""}` : `没有写入成品，已跳过 ${o.skipped.length} 个重名文件`);
  } catch (o) {
    const s = o instanceof Error ? o.message : String(o);
    i(l => s0i(l, s || "自动保存失败")), a() && e.error(`成品自动保存失败：${s || "未知错误"}`, 7e3);
  }
}

function c0i(e, t) {
  const n = new Set(),
    r = s => JSON.stringify([s.projectId ?? null, s.id]),
    a = s => {
      e.checkpoint(s), e.publish(s);
    },
    i = s => {
      const l = e.context(),
        d = s.delivery,
        u = r(s);
      if (!(!Bde(l, s) || !xH(e.retainedRun(), s) || !(d != null && d.config.autoSave) || d.status !== "pending" || !["reviewing", "completed"].includes(s.status) || n.has(u))) {
        n.add(u);
        try {
          const h = X_e(s, {
            ...d,
            status: "saving",
            error: void 0
          });
          a(h), l0i(e, h, l).catch(e.report).finally(() => {
            n.delete(u), t();
          });
        } catch (h) {
          n.delete(u), e.report(h);
        }
      }
    };
  return {
    start: i,
    retry: s => {
      const l = String((s == null ? void 0 : s.runId) || "").trim(),
        d = e.retainedRun();
      if (!l || !d || d.id !== l || !d.delivery || !Bde(e.context(), d)) return;
      if (n.has(r(d))) {
        e.error("成品仍在保存中，请等待本次保存结束后再重试");
        return;
      }
      const u = String(s.directory || d.delivery.config.directory || "").trim();
      if (!u) {
        e.error("请先选择新的成品输出目录");
        return;
      }
      const h = X_e(d, {
        ...d.delivery,
        config: {
          ...d.delivery.config,
          directory: u,
          autoSave: !0
        },
        status: "pending",
        error: void 0
      });
      a(h), i(h);
    }
  };
}

function d0i(e) {
  let t = !1,
    n = null,
    r = 0,
    a = "";
  const i = () => {
      r++, n !== null && e.cancel(n), n = null;
    },
    o = (d = 0) => {
      if (!t) return;
      i();
      const u = r;
      n = e.schedule(() => {
        if (!(!t || r !== u)) {
          n = null;
          try {
            l();
          } catch (h) {
            e.report(h);
          }
        }
      }, d);
    },
    s = c0i(e, () => o()),
    l = () => {
      const d = e.context(),
        u = e.activeRun();
      if (!u || !Bde(d, u)) return;
      const h = a0i({
        run: u,
        nodes: d.nodes,
        connections: d.connections,
        history: d.history,
        jobs: e.jobs(u.id)
      });
      if (h.changed && (e.checkpoint(h.run), e.publish(h.run)), h.recheckAfterMs && o(h.recheckAfterMs + 32), s.start(h.run), e.context().session !== d.session || !Bde(e.context(), h.run) || !xH(e.retainedRun(), h.run) || h.transition !== "reviewing" && h.transition !== "failed") return;
      const p = JSON.stringify([h.run.projectId ?? null, h.run.id, h.transition]);
      a !== p && (a = p, h.transition === "reviewing" ? (e.success(h.message || "配方产物已生成，等待审核"), e.openCenter(h.run.id)) : e.error(h.message || "配方产物未通过自动验收", 7e3));
    };
  return {
    start: () => {
      t = !0, o();
    },
    stop: () => {
      t = !1, i();
    },
    request: () => o(),
    retry: s.retry
  };
}

const T_t = "productionDeliveryRetryRequested";

function u0i(e, t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(T_t, {
    detail: {
      runId: e,
      directory: t
    }
  }));
}

function h0i(e) {
  const t = a => {
    try {
      e.retry(a.detail);
    } catch (i) {
      e.report(i);
    }
  };
  e.target.addEventListener(T_t, t);
  const n = e.queue(e.changed),
    r = e.runs(e.changed);
  return () => {
    n(), r(), e.target.removeEventListener(T_t, t);
  };
}

function p0i(e) {
  const t = g.useRef(e),
    n = g.useRef({}),
    r = g.useRef(!1);
  g.useLayoutEffect(() => {
    t.current = e;
  }), g.useLayoutEffect(() => {
    n.current = {};
  }, [e.projectId, e.projectLoading]);
  const [a] = g.useState(() => d0i({
    context: () => {
      const i = t.current;
      return {
        session: n.current,
        projectId: i.projectId,
        ready: r.current && !i.projectLoading && i.projectIdRef.current === i.projectId,
        nodes: i.nodesRef.current,
        connections: i.connectionsRef.current,
        history: i.historyRef.current
      };
    },
    activeRun: bm,
    retainedRun: hpe,
    jobs: xde,
    publish: ex,
    checkpoint: i => {
      R5({
        run: i
      });
    },
    readCheckpoint: i => {
      var o;
      return ((o = lJ(i)) == null ? void 0 : o.run) ?? null;
    },
    save: Kgi,
    success: i => t.current.success(i),
    error: (i, o) => t.current.error(i, o),
    openCenter: i => qP("current", {
      runId: i
    }),
    schedule: (i, o) => window.setTimeout(i, o),
    cancel: i => window.clearTimeout(i),
    report: i => console.error("[ProductionOutputs]", i)
  }));
  g.useEffect(() => {
    r.current = !0;
    const i = h0i({
      target: window,
      queue: pCe,
      runs: wXe,
      changed: a.request,
      retry: a.retry,
      report: o => console.error("[ProductionOutputs]", o)
    });
    return a.start(), () => {
      r.current = !1, n.current = {}, a.stop(), i();
    };
  }, [a]), g.useEffect(() => {
    a.request();
  }, [a, e.nodes, e.connections, e.history, e.projectId, e.projectLoading]);
}

const xUe = "qiaodoumayi_production_recipes_v1",
  M_t = {
    autoSave: !1,
    directory: "",
    fileNameTemplate: "{{recipeName}}_{{date}}_{{index}}",
    collisionPolicy: "increment"
  },
  m0i = 80,
  P_t = 24,
  R_t = 16,
  f0i = 1800,
  Xlr = ["gptImage2Resolution", "gptImage2AspectRatio", "mjMode", "mjVersion", "mjOref", "mjSref", "mjOw", "mjSw", "mjSv", "mjIw", "mjStylize", "mjChaos", "mjWeird", "mjRaw", "mjHd", "mjQuality", "mjExtraParams", "huyaMjVersion", "huyaMjQuality", "huyaMjChaos", "huyaMjStylize", "huyaMjWeird", "huyaMjRaw", "huyaMjSw", "huyaMjSv", "huyaMjIw", "huyaMjOw", "huyaMjHd", "useOss", "ossUploadEnabled", "isAsync", "seedanceVolcIsUploadAsset", "seedanceVolcGenerateAudio", "seedanceGenerateAudio"];

function ud(e, t = 240) {
  return typeof e == "string" ? e.replace(/\s+/g, " ").trim().slice(0, t) : "";
}

function zBt(e) {
  return typeof e == "string" ? e.trim().slice(0, f0i) : "";
}

function N_t(e) {
  return e.inputMode === "fixed" || e.inputMode === "each-run" || e.inputMode === "random-canvas" ? e.inputMode : e.boundNodeId ? "fixed" : "each-run";
}

function Jlr(e) {
  const t = e && typeof e == "object" ? e : {},
    n = ["increment", "skip", "overwrite"].includes(String(t.collisionPolicy)) ? t.collisionPolicy : M_t.collisionPolicy;
  return {
    autoSave: t.autoSave === !0,
    directory: typeof t.directory == "string" ? t.directory.trim().slice(0, 1e3) : "",
    fileNameTemplate: typeof t.fileNameTemplate == "string" && t.fileNameTemplate.trim() ? t.fileNameTemplate.trim().slice(0, 240) : M_t.fileNameTemplate,
    collisionPolicy: n
  };
}

function _Ue(e) {
  if (typeof e == "string") return ud(e, 240) || void 0;
  if (typeof e == "boolean" || typeof e == "number" && Number.isFinite(e)) return e;
}

function g0i(e) {
  if (!e) return;
  const t = e.settings || {},
    n = ud(t.model || t.modelId, 120) || void 0,
    r = ud(t.platformGroup, 120) || void 0,
    a = ud(t.ratio, 40) || void 0,
    i = ud(t.resolution, 40) || void 0,
    o = _Ue(t.duration),
    s = typeof o == "string" || typeof o == "number" ? o : void 0,
    l = Number(t.batchCount ?? t.batchSize),
    d = Number.isFinite(l) && l > 0 ? Math.min(64, Math.max(1, Math.round(l))) : void 0,
    u = zBt(e.prompt || (e.type === "text-node" ? e.content : "")) || void 0,
    h = Object.fromEntries(Xlr.flatMap(m => {
      const f = _Ue(t[m]);
      return f === void 0 ? [] : [[m, f]];
    })),
    p = {
      model: n,
      platformGroup: r,
      ratio: a,
      resolution: i,
      duration: s,
      quantity: d,
      promptTemplate: u,
      advanced: Object.keys(h).length > 0 ? h : void 0
    };
  return Object.values(p).some(m => m !== void 0) ? p : void 0;
}

function y0i(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return;
  const t = e,
    n = _Ue(t.duration),
    r = Number(t.quantity),
    a = t.advanced && typeof t.advanced == "object" && !Array.isArray(t.advanced) ? t.advanced : {},
    i = Object.fromEntries(Xlr.flatMap(s => {
      const l = _Ue(a[s]);
      return l === void 0 ? [] : [[s, l]];
    })),
    o = {
      model: ud(t.model, 120) || void 0,
      platformGroup: ud(t.platformGroup, 120) || void 0,
      ratio: ud(t.ratio, 40) || void 0,
      resolution: ud(t.resolution, 40) || void 0,
      duration: typeof n == "string" || typeof n == "number" ? n : void 0,
      quantity: Number.isFinite(r) && r > 0 ? Math.min(64, Math.max(1, Math.round(r))) : void 0,
      promptTemplate: zBt(t.promptTemplate) || void 0,
      advanced: Object.keys(i).length > 0 ? i : void 0
    };
  return Object.values(o).some(s => s !== void 0) ? o : void 0;
}

function b0i(e, t = Date.now()) {
  return `${e}-${t.toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function kUe(e) {
  const t = ud(e, 80).toLowerCase();
  return /video|视频|分镜/.test(t) ? "video" : /character|角色/.test(t) ? "character" : /scene|场景/.test(t) ? "scene" : /speech|audio|music|语音|音乐/.test(t) ? "audio" : /text|文案|脚本|口播/.test(t) ? "text" : "image";
}

function A1e(e, t) {
  return e === "video" ? t === "input" ? ["input-image", "gen-image", "gen-video"] : ["gen-video"] : e === "character" ? ["input-image", "generate-character-image", "gen-image"] : e === "scene" ? ["input-image", "generate-scene-image", "gen-image"] : e === "text" ? ["text-node"] : e === "audio" ? t === "input" ? ["input-image", "text-node", "gen-speech"] : ["gen-music", "gen-speech"] : t === "input" ? ["input-image", "preview", "gen-image"] : ["gen-image"];
}

function UBt(e, t) {
  return A1e(e, t)[0];
}

function v0i(e, t, n) {
  const r = e.kind === "input" ? "input" : "output",
    a = kUe(`${(n == null ? void 0 : n.type) || ""} ${(n == null ? void 0 : n.previewType) || ""} ${e.nodeId}`);
  return {
    id: `slot-${r}-${t + 1}`,
    role: r,
    kind: a,
    label: r === "input" ? `输入 ${t + 1}` : `输出 ${t + 1}`,
    required: !0,
    nodeType: (n == null ? void 0 : n.type) || UBt(a, r),
    boundNodeId: e.nodeId,
    inputMode: r === "input" ? "fixed" : void 0,
    generation: r === "output" ? g0i(n) : void 0
  };
}

function w0i(e) {
  const t = e.tasks.slice(0, P_t).map((n, r) => ({
    id: `step-${r + 1}`,
    action: n.category || "produce",
    summary: n.title,
    slotIds: []
  }));
  return t.length > 0 ? t : e.events.filter(n => n.kind === "tool.completed" && n.ok !== !1).slice(0, P_t).map((n, r) => ({
    id: `step-${r + 1}`,
    action: n.action || n.tool || "tool",
    summary: n.summary,
    slotIds: []
  }));
}

function x0i(e) {
  var s, l;
  const t = e.now ?? Date.now(),
    n = e.run.artifacts.slice(-R_t),
    r = new Map((e.nodes || []).map(d => [d.id, d]));
  let a = n.map((d, u) => v0i(d, u, r.get(d.nodeId)));
  if (a.length === 0) {
    const d = Math.max(1, ((s = e.run.preflight) == null ? void 0 : s.inputNodeCount) || 1);
    a = [...Array.from({
      length: Math.min(4, d)
    }, (u, h) => ({
      id: `slot-input-${h + 1}`,
      role: "input",
      kind: "image",
      label: `参考图 ${h + 1}`,
      required: h === 0,
      nodeType: "input-image",
      inputMode: "each-run"
    })), {
      id: "slot-output-1",
      role: "output",
      kind: kUe(e.run.goal),
      label: "成品",
      required: !0,
      nodeType: UBt(kUe(e.run.goal), "output")
    }];
  }
  const i = new Map(a.flatMap(d => d.boundNodeId ? [[d.boundNodeId, d]] : []));
  a = a.map(d => {
    if (d.role !== "output" || !d.boundNodeId) return d;
    const u = (e.connections || []).flatMap(h => {
      if (h.to !== d.boundNodeId) return [];
      const p = i.get(h.from);
      return !p || p.role !== "input" ? [] : [{
        inputSlotId: p.id,
        inputType: ud(h.inputType, 80) || void 0,
        referenceRole: h.referenceRole
      }];
    });
    return e.connections === void 0 ? d : {
      ...d,
      references: u
    };
  });
  const o = ud(e.run.name, 48) || ud(e.run.goal, 36) || "未命名模板";
  return {
    schemaVersion: 1,
    id: b0i("recipe", t),
    name: o,
    goal: ud(e.run.goal, 600) || o,
    projectId: e.run.projectId,
    sourceRunId: e.run.id,
    sourceSkillId: ud(e.skillId, 120) || void 0,
    sourceSkillName: ud(e.skillName, 80) || void 0,
    executionMode: "direct",
    analysisTemplate: "",
    planningMode: "manual",
    outputCount: 1,
    reviewMode: "human",
    slots: a,
    steps: w0i(e.run),
    output: (l = e.run.delivery) != null && l.config ? Jlr(e.run.delivery.config) : {
      ...M_t
    },
    currentVersion: 1,
    versions: [{
      version: 1,
      createdAt: t,
      summary: "从成功生产任务保存"
    }],
    createdAt: t,
    updatedAt: t
  };
}

function _0i(e) {
  if (!e || typeof e != "object") return null;
  const t = e,
    n = ud(t.id, 128),
    r = ud(t.name, 48);
  if (!n || !r) return null;
  const a = Array.isArray(t.slots) ? t.slots.slice(0, R_t).flatMap((s, l) => {
      if (!s || typeof s != "object") return [];
      const d = s,
        u = d.role === "output" ? "output" : "input",
        h = kUe(d.kind || d.label),
        p = d.inputMode === "fixed" || d.inputMode === "random-canvas" || d.inputMode === "each-run" ? d.inputMode : void 0;
      return [{
        id: ud(d.id, 80) || `slot-${l + 1}`,
        role: u,
        kind: h,
        label: ud(d.label, 80) || (u === "input" ? `输入 ${l + 1}` : `输出 ${l + 1}`),
        required: d.required !== !1,
        nodeType: ud(d.nodeType, 80) || UBt(h, u),
        boundNodeId: ud(d.boundNodeId, 128) || void 0,
        ...(u === "input" && p ? {
          inputMode: p
        } : {}),
        ...(u === "input" && Array.isArray(d.poolNodeIds) ? {
          poolNodeIds: [...new Set(d.poolNodeIds.map(m => ud(m, 128)).filter(Boolean))].slice(0, 200)
        } : {}),
        generation: u === "output" ? y0i(d.generation) : void 0,
        references: u === "output" && Array.isArray(d.references) ? d.references.slice(0, R_t).flatMap(m => {
          if (!m || typeof m != "object") return [];
          const f = m,
            y = ud(f.inputSlotId, 80);
          if (!y) return [];
          const b = new Set(["primary", "character", "pet", "scene", "style", "supplementary"]),
            v = ud(f.referenceRole, 40);
          return [{
            inputSlotId: y,
            inputType: ud(f.inputType, 80) || void 0,
            referenceRole: b.has(v) ? v : void 0
          }];
        }) : void 0
      }];
    }) : [],
    i = Array.isArray(t.steps) ? t.steps.slice(0, P_t).flatMap((s, l) => {
      if (!s || typeof s != "object") return [];
      const d = s;
      return [{
        id: ud(d.id, 80) || `step-${l + 1}`,
        action: ud(d.action, 80) || "produce",
        summary: ud(d.summary, 240) || `步骤 ${l + 1}`,
        slotIds: Array.isArray(d.slotIds) ? d.slotIds.map(u => ud(u, 80)).filter(Boolean) : []
      }];
    }) : [],
    o = Math.max(1, Number(t.currentVersion) || 1);
  return {
    schemaVersion: 1,
    id: n,
    name: r,
    goal: ud(t.goal, 600) || r,
    projectId: t.projectId == null || ud(t.projectId, 128) === "" ? null : ud(t.projectId, 128),
    sourceRunId: ud(t.sourceRunId, 128) || void 0,
    sourceSkillId: ud(t.sourceSkillId, 120) || void 0,
    sourceSkillName: ud(t.sourceSkillName, 80) || void 0,
    executionMode: t.executionMode === "agent-variant" ? "agent-variant" : "direct",
    analysisTemplate: zBt(t.analysisTemplate),
    planningMode: t.planningMode === "skill" || t.planningMode === "manual" || t.planningMode === "agent" ? t.planningMode : t.executionMode === "agent-variant" ? "agent" : "manual",
    outputCount: Math.min(40, Math.max(1, Math.round(Number(t.outputCount) || 1))),
    reviewMode: t.reviewMode === "human" || t.reviewMode === "skill" || t.reviewMode === "agent" ? t.reviewMode : t.executionMode === "agent-variant" ? "agent" : "human",
    slots: a,
    steps: i,
    output: Jlr(t.output),
    currentVersion: o,
    versions: Array.isArray(t.versions) && t.versions.length > 0 ? t.versions.slice(-20).flatMap(s => {
      if (!s || typeof s != "object") return [];
      const l = s;
      return [{
        version: Math.max(1, Number(l.version) || 1),
        createdAt: Number(l.createdAt) || Date.now(),
        summary: ud(l.summary, 160) || `版本 ${l.version}`
      }];
    }) : [{
      version: o,
      createdAt: Number(t.createdAt) || Date.now(),
      summary: "导入"
    }],
    createdAt: Number(t.createdAt) || Date.now(),
    updatedAt: Number(t.updatedAt) || Date.now()
  };
}

function k0i(e, t) {
  return {
    ...e,
    slots: e.slots.map(n => ({
      ...n,
      boundNodeId: ud(t[n.id], 128) || n.boundNodeId
    }))
  };
}

function A0i(e, t, n = []) {
  const r = new Set(A1e(e.kind, "input")),
    a = new Set(n),
    i = Array.isArray(e.poolNodeIds) ? new Set(e.poolNodeIds) : null;
  return t.filter(o => r.has(o.type) && !a.has(o.id) && (!i || i.has(o.id)));
}

function S0i(e) {
  const t = {
    ...(e.bindings || {})
  };
  for (const a of e.recipe.slots) a.role === "input" && N_t(a) === "random-canvas" && delete t[a.id];
  const n = new Set(Object.values(t).filter(Boolean)),
    r = e.random ?? Math.random;
  for (const a of e.recipe.slots.filter(i => i.role === "input")) {
    if (N_t(a) !== "random-canvas") {
      const d = t[a.id] || a.boundNodeId;
      d && (t[a.id] = d, n.add(d));
      continue;
    }
    const o = A0i(a, e.nodes, n);
    if (o.length === 0) continue;
    const s = Math.max(0, Math.min(.999999, Number(r()) || 0)),
      l = o[Math.floor(s * o.length)];
    t[a.id] = l.id, n.add(l.id);
  }
  return t;
}

function I0i(e = !1) {
  return j0t({
    profile: HS(),
    hasApprovedInitialDiff: e
  });
}

function C0i() {
  return m0i;
}

function E0i(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(36);
}

function Zlr(e) {
  return e.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 38) || "slot";
}

function T0i(e, t) {
  return `recipe-run-${Zlr(e.id)}-v${e.currentVersion}-${t.toString(36)}`;
}

function M0i(e, t) {
  const n = E0i(`${e}:${t.id}:${t.nodeType || t.kind}`);
  return `recipe-${Zlr(t.id)}-${n}`.slice(0, 96);
}

function P0i(e) {
  const t = e.steps.map((n, r) => `${r + 1}. ${n.summary}`).filter(Boolean);
  return [e.goal, t.length ? `执行要求：
${t.join(`
`)}` : ""].filter(Boolean).join(`

`).slice(0, 1800);
}

function R0i(e, t) {
  var r;
  return (((r = t.generation) == null ? void 0 : r.promptTemplate) || P0i(e)).replace(/\{\{\s*(goal|recipeName|outputLabel)\s*\}\}/g, (a, i) => i === "goal" ? e.goal : i === "recipeName" ? e.name : t.label).slice(0, 1800);
}

function N0i(e) {
  const t = e.generation;
  if (!t) return {};
  const n = {
    ...(t.advanced || {})
  };
  return {
    ...(t.model ? {
      model: t.model
    } : {}),
    ...(t.platformGroup ? {
      platformGroup: t.platformGroup
    } : {}),
    ...(t.ratio ? {
      ratio: t.ratio
    } : {}),
    ...(t.resolution ? {
      resolution: t.resolution
    } : {}),
    ...(t.duration != null ? {
      duration: t.duration
    } : {}),
    ...(t.quantity ? {
      batchCount: t.quantity,
      batchSize: t.quantity
    } : {}),
    settings: n,
    _recipeExactSettings: !0
  };
}

function Not(e) {
  return new Set(["gen-image", "gen-video", "generate-character-image", "generate-scene-image", "motion-control", "generate-character-video", "generate-scene-video", "gen-music", "gen-speech"]).has(e);
}

function jot(e, t) {
  return t ? e.find(n => n.id === t) : void 0;
}

function j0i(e) {
  var f;
  const t = e.now ?? Date.now(),
    n = e.resolvedInputBindings ? {
      ...e.resolvedInputBindings
    } : S0i({
      recipe: e.recipe,
      nodes: e.nodes,
      bindings: e.bindings
    }),
    r = k0i(e.recipe, n),
    a = {
      ...r,
      slots: r.slots.map(y => y.role === "input" && N_t(y) === "random-canvas" && !n[y.id] ? {
        ...y,
        boundNodeId: void 0
      } : y)
    },
    i = T0i(a, t),
    o = e.nodes ?? [],
    s = e.connections ?? [],
    l = [];
  a.projectId && e.projectId && a.projectId !== e.projectId && l.push({
    code: "project_mismatch",
    severity: "warning",
    message: "模板来自另一个项目；将只使用当前画布中实际存在的绑定节点。"
  }), a.output.autoSave && !a.output.directory && l.push({
    code: "output_directory_missing",
    severity: "error",
    message: "已开启自动保存，请先选择成品输出目录。"
  });
  for (const y of a.slots.filter(b => b.role === "input")) {
    if (!y.boundNodeId) {
      y.required && l.push({
        code: "missing_required_input",
        severity: "error",
        slotId: y.id,
        message: `必填输入「${y.label}」尚未绑定节点。`
      });
      continue;
    }
    const b = jot(o, y.boundNodeId);
    if (!b) {
      l.push({
        code: "bound_node_missing",
        severity: "error",
        slotId: y.id,
        nodeId: y.boundNodeId,
        message: `输入「${y.label}」绑定的节点已经不存在。`
      });
      continue;
    }
    A1e(y.kind, y.role).includes(b.type) || l.push({
      code: "bound_node_type_mismatch",
      severity: "error",
      slotId: y.id,
      nodeId: b.id,
      message: `输入「${y.label}」需要 ${y.kind} 类型，当前节点是 ${b.type}。`
    });
  }
  const d = a.slots.filter(y => y.role === "output");
  d.length === 0 && l.push({
    code: "no_output_slot",
    severity: "error",
    message: "模板没有输出槽，无法编译执行计划。"
  });
  const u = a.slots.filter(y => y.role === "input" && y.boundNodeId && jot(o, y.boundNodeId)).map(y => ({
      slot: y,
      nodeId: y.boundNodeId
    })),
    h = [...new Set(u.map(y => y.nodeId))],
    p = [],
    m = [];
  for (const [y, b] of d.entries()) {
    const v = b.nodeType || A1e(b.kind, "output")[0] || "gen-image",
      _ = jot(o, b.boundNodeId);
    b.boundNodeId && !_ && l.push({
      code: "bound_node_missing",
      severity: "warning",
      slotId: b.id,
      nodeId: b.boundNodeId,
      message: `原输出「${b.label}」已不在画布，本次会自动新建。`
    }), _ && !A1e(b.kind, b.role).includes(_.type) && l.push({
      code: "bound_node_type_mismatch",
      severity: "error",
      slotId: b.id,
      nodeId: _.id,
      message: `输出「${b.label}」需要 ${b.kind} 类型，当前节点是 ${_.type}。`
    });
    const w = (_ == null ? void 0 : _.id) || M0i(i, b),
      k = (_ == null ? void 0 : _.type) || v;
    m.push(w);
    const A = `${i}:output:${y + 1}`,
      S = `${A}:create`,
      C = R0i(a, b),
      I = N0i(b);
    if (_) Not(k) && p.push({
      id: `${A}:update`,
      action: "update_node",
      label: `更新 ${b.label}`,
      payload: {
        nodeId: w,
        prompt: C,
        ...I
      },
      slotId: b.id,
      dependsOn: []
    });else {
      const j = {
        id: w,
        type: k,
        nodeName: b.label,
        forceNew: !0,
        agentSequence: !1,
        skipAutoRun: !0,
        ...I
      };
      k === "text-node" ? j.content = C : Not(k) && (j.prompt = C), p.push({
        id: S,
        action: "create_node",
        label: `创建 ${b.label}`,
        payload: j,
        slotId: b.id,
        dependsOn: []
      });
    }
    const E = p.filter(j => j.slotId === b.id),
      M = (f = E[E.length - 1]) == null ? void 0 : f.id,
      T = [],
      P = b.references || [],
      R = Array.isArray(b.references) ? u.filter(j => P.some(B => B.inputSlotId === j.slot.id)) : u;
    for (const [j, B] of R.entries()) {
      const F = P.find(O => O.inputSlotId === B.slot.id),
        N = F == null ? void 0 : F.inputType,
        G = F == null ? void 0 : F.referenceRole;
      if (s.some(O => O.from === B.nodeId && O.to === w && (O.inputType || "default") === (N || "default") && (!G || O.referenceRole === G))) continue;
      const V = `${A}:connect:${j + 1}`;
      T.push(V), p.push({
        id: V,
        action: "connect_nodes",
        label: `连接 ${B.slot.label} → ${b.label}`,
        payload: {
          fromNodeId: B.nodeId,
          toNodeId: w,
          syncReference: !0,
          ...(N ? {
            inputType: N
          } : {}),
          ...(G ? {
            referenceRole: G
          } : {})
        },
        slotId: b.id,
        dependsOn: M ? [M] : []
      });
    }
    Not(k) && (_ != null && _.isGenerating && l.push({
      code: "generation_already_running",
      severity: "warning",
      slotId: b.id,
      nodeId: w,
      message: `输出「${b.label}」当前正在生成，执行时会由画布防重。`
    }), p.push({
      id: `${A}:run`,
      action: "run_generation",
      label: `运行 ${b.label}`,
      payload: {
        nodeId: w,
        _recipeExactSettings: !0
      },
      slotId: b.id,
      dependsOn: T.length > 0 ? T : M ? [M] : []
    }));
  }
  return {
    schemaVersion: 1,
    id: i,
    recipeId: a.id,
    recipeVersion: a.currentVersion,
    recipeName: a.name,
    goal: a.goal,
    projectId: e.projectId ?? null,
    output: {
      ...a.output
    },
    createdAt: t,
    valid: !l.some(y => y.severity === "error"),
    issues: l,
    resolvedInputBindings: n,
    inputNodeIds: h,
    outputNodeIds: m,
    actions: p
  };
}

function D0i(e, t) {
  const n = e.issues.filter(r => r.code !== "project_mismatch");
  e.projectId && t.projectId && e.projectId !== t.projectId && n.push({
    code: "project_mismatch",
    severity: "error",
    message: "确认预览后项目已经切换，请回到模板重新预览。"
  });
  for (const r of e.inputNodeIds) t.nodes.some(a => a.id === r) || n.push({
    code: "bound_node_missing",
    severity: "error",
    nodeId: r,
    message: `确认预览后输入节点 ${r} 已不存在，请重新绑定。`
  });
  return n;
}

function L0i(e) {
  const t = e.actions.flatMap(a => {
      const i = String(a.payload.nodeId || a.payload.id || "").trim() || void 0;
      return a.action === "create_node" ? [{
        id: a.id,
        kind: "create",
        label: a.label,
        nodeId: i,
        nodeType: String(a.payload.type || "text-node"),
        x: typeof a.payload.x == "number" ? a.payload.x : void 0,
        y: typeof a.payload.y == "number" ? a.payload.y : void 0
      }] : a.action === "update_node" ? [{
        id: a.id,
        kind: "update",
        label: a.label,
        nodeId: i
      }] : a.action === "connect_nodes" ? [{
        id: a.id,
        kind: "connect",
        label: a.label,
        fromNodeId: String(a.payload.fromNodeId || a.payload.from || "") || void 0,
        toNodeId: String(a.payload.toNodeId || a.payload.to || "") || void 0
      }] : a.action === "run_generation" || a.action === "execute_node" ? [{
        id: a.id,
        kind: "run",
        label: a.label,
        nodeId: i
      }] : [];
    }),
    n = a => t.filter(i => i.kind === a).length,
    r = [n("create") ? `新增 ${n("create")}` : "", n("update") ? `修改 ${n("update")}` : "", n("connect") ? `连接 ${n("connect")}` : "", n("run") ? `运行 ${n("run")}` : ""].filter(Boolean).join(" · ");
  return {
    id: `recipe-diff-${e.id}`,
    runId: e.id,
    title: `确定性预览 · ${e.recipeName} v${e.recipeVersion}`,
    summary: r || "无需改动画布",
    operations: t,
    createdAt: e.createdAt
  };
}

function O0i(e, t) {
  const n = RJn({
      goal: e.goal,
      state: t,
      now: e.createdAt
    }),
    r = e.outputNodeIds.map((o, s) => ({
      ...(e.actions.some(l => l.action === "create_node" && String(l.payload.id || l.payload.nodeId || "") === o) ? {
        note: "recipe-output:new"
      } : {
        note: "recipe-output:bound"
      }),
      id: `${n.id}:recipe-task:${s + 1}`,
      title: `${e.recipeName} · 输出 ${s + 1}`,
      category: "recipe",
      quantity: 1,
      status: "ready",
      nodeIds: [o],
      priority: "medium",
      dependsOn: []
    })),
    a = [...e.inputNodeIds.map(o => ({
      nodeId: o,
      kind: "input",
      status: "ready"
    })), ...r.map(o => ({
      nodeId: o.nodeIds[0],
      taskId: o.id,
      kind: "output",
      status: "pending"
    }))],
    i = {
      ...n,
      name: `${e.recipeName} v${e.recipeVersion}`,
      recipeId: e.recipeId,
      recipeVersion: e.recipeVersion,
      delivery: {
        config: {
          ...e.output
        },
        status: e.output.autoSave ? "pending" : "disabled",
        files: []
      },
      status: "running",
      tasks: r,
      artifacts: a,
      updatedAt: Date.now()
    };
  return {
    ...i,
    preflight: hLt(i)
  };
}

const B0i = new Set(["queued", "planning", "running", "waiting_generation", "waiting_approval"]);

function j_t(e, t) {
  e.assertCurrent();
  const n = e.getActiveRun();
  if (n && B0i.has(n.status)) throw new Error(`已有生产任务「${n.name || n.goal}」正在运行，${t}`);
}

function Dot(e, t) {
  e.assertCurrent();
  const n = e.getActiveRun();
  if ((n == null ? void 0 : n.id) !== t) throw new Error("当前生产任务已切换，停止后续配方步骤。");
  if (n.status === "failed") throw new Error(n.lastError || "前一个配方步骤未通过验收，已停止后续步骤。");
  return n;
}

function F0i(e, t, n) {
  const r = n.nodeId || String(t.payload.nodeId || t.payload.id || "");
  let a = NJn(e, {
    id: t.id,
    tool: "recipe_execution",
    action: t.action,
    summary: t.label,
    ok: !0,
    targetNodeId: r || void 0,
    submittedNodeIds: n.submittedNodeIds
  }, n.afterRevision);
  return (t.action === "run_generation" || t.action === "execute_node") && (a = {
    ...a,
    tasks: a.tasks.map(i => i.nodeIds.includes(r) && i.status !== "completed" ? {
      ...i,
      status: "running"
    } : i),
    artifacts: a.artifacts.map(i => i.nodeId === r && i.status !== "ready" ? {
      ...i,
      status: "generating"
    } : i)
  }), a;
}

function z0i(e, t) {
  return e.status === "paused" || e.status === "completed" || e.status === "reviewing" ? e : t ? Ug(e, "waiting_generation", "配方已按确定性计划提交，等待生成结果") : Ug({
    ...e,
    tasks: e.tasks.map(n => ({
      ...n,
      status: "completed"
    })),
    artifacts: e.artifacts.map(n => n.kind === "output" ? {
      ...n,
      status: "ready"
    } : n)
  }, "completed", "配方已按确定性计划执行完成");
}

function U0i(e, t) {
  var r;
  if ((r = e.name) != null && r.trim()) return e.name.trim().slice(0, 240);
  const n = e.filePath || e.url || "";
  try {
    const a = e.url ? new URL(e.url).pathname : n,
      i = decodeURIComponent(a.split(/[\\\\/]/).filter(Boolean).pop() || "");
    if (i) return i.slice(0, 240);
  } catch {
    const a = n.split(/[\\\\/]/).filter(Boolean).pop();
    if (a) return a.slice(0, 240);
  }
  return `外部素材-${t + 1}`;
}

function D_t(e, t, n = "") {
  if (n && n !== "application/octet-stream") return n;
  const r = t.toLocaleLowerCase().split(".").pop() || "";
  return e.kind === "video" ? r === "webm" ? "video/webm" : r === "ogg" ? "video/ogg" : "video/mp4" : e.kind === "audio" ? r === "wav" ? "audio/wav" : r === "ogg" || r === "opus" ? "audio/ogg" : r === "m4a" ? "audio/mp4" : "audio/mpeg" : e.kind === "text" ? "text/plain" : {
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
    avif: "image/avif",
    bmp: "image/bmp"
  }[r] || "image/jpeg";
}

function ecr(e, t) {
  return {
    x: e.x - 180 + t % 3 * 280,
    y: e.y - 160 + Math.floor(t / 3) * 300
  };
}

function tcr(e, t) {
  if (t) try {
    Object.defineProperty(e, "path", {
      value: t
    });
  } catch {}
  return e;
}

function ncr(e, t, n, r, a) {
  e.assertCurrent();
  const i = e.generateId();
  return e.commitNodes(o => {
    const s = Ki(i, "text-node", r.x, r.y, t.replace(/\.[^/.]+$/, "") || t, {
      text: n,
      textNodeComposerOpen: !1,
      textNodeUserFormatted: !0,
      ...a
    }, o);
    return [...o, {
      ...s,
      width: 320,
      height: 400,
      content: n,
      prompt: n
    }];
  }), i;
}

async function $0i({
  recipe: e,
  detail: t,
  bindings: n,
  runtime: r
}) {
  const a = r.getOrigin();
  for (const [i, o] of (t.externalInputs || []).entries()) {
    r.assertCurrent();
    const s = e.slots.find(h => h.role === "input" && h.id === o.slotId);
    if (!s) throw new Error(`Recipe 中不存在输入槽「${o.slotId}」。`);
    const l = U0i(o, i),
      d = ecr(a, i);
    let u = "";
    if (o.text || s.kind === "text") {
      let h = o.text || "";
      if (!h && (o.url || o.filePath)) {
        const p = o.filePath ? new Blob([await r.readFile(o.filePath)], {
          type: "text/plain"
        }) : await r.download(o.url, 3e4);
        if (p.size > 2 * 1024 * 1024) throw new Error(`文本素材「${l}」超过 2MB。`);
        h = (await p.text()).slice(0, 1e5);
      }
      if (!h.trim()) throw new Error(`文本素材「${l}」为空。`);
      u = ncr(r, l, h, d, {
        _productionExternalSource: o.source || "api"
      });
    } else {
      let h;
      if (o.filePath) h = new Blob([await r.readFile(o.filePath)], {
        type: D_t(o, l)
      });else if (o.url) h = await r.download(o.url, 6e4);else throw new Error(`外部素材「${l}」缺少 URL 或文件路径。`);
      if (!h.size) throw new Error(`外部素材「${l}」没有可用内容。`);
      if (h.size > 120 * 1024 * 1024) throw new Error(`外部素材「${l}」超过 120MB。`);
      const p = tcr(new File([h], l, {
        type: D_t(o, l, h.type)
      }), o.filePath);
      r.assertCurrent(), u = await r.importMedia(p, d.x, d.y);
    }
    if (r.assertCurrent(), !u) throw new Error(`无法把外部素材「${l}」导入画布。`);
    n[o.slotId] = u;
  }
}

function Xsn(e, t) {
  return e === "character" || e === "scene" ? t === "image" : e === t;
}

function G0i(e, t) {
  const n = e.label.toLocaleLowerCase().replace(/\.[^.]+$/, "").trim(),
    r = t.name.toLocaleLowerCase().replace(/\.[^.]+$/, "").trim();
  return !n || !r ? 0 : r === n ? 4 : r.includes(n) || n.includes(r) ? 2 : n.split(/[\s_\-—·]+/).filter(i => i.length >= 2).some(i => r.includes(i)) ? 1 : 0;
}

function $Bt(e, t) {
  const n = t.slice(),
    r = [],
    a = e.slots.filter(h => h.role === "input"),
    i = a.filter(h => !h.boundNodeId).sort((h, p) => Number(p.required) - Number(h.required)),
    o = (h, p = !1) => {
      const m = n.map((f, y) => ({
        file: f,
        index: y,
        affinity: G0i(h, f)
      })).filter(f => Xsn(h.kind, f.file.kind)).sort((f, y) => y.affinity - f.affinity || f.index - y.index)[0];
      return !m || p && m.affinity <= 0 ? !1 : (r.push({
        slot: h,
        file: m.file
      }), n.splice(m.index, 1), !0);
    };
  for (const h of i) o(h);
  const s = a.filter(h => h.boundNodeId);
  for (const h of s) o(h, !0);
  const l = new Set(r.map(h => h.file.kind));
  for (const h of n.slice()) {
    if (l.has(h.kind)) continue;
    const p = s.find(f => !r.some(y => y.slot.id === f.id) && Xsn(f.kind, h.kind));
    if (!p) continue;
    const m = n.indexOf(h);
    r.push({
      slot: p,
      file: h
    }), n.splice(m, 1), l.add(h.kind);
  }
  const d = new Set(r.map(h => h.slot.id)),
    u = i.filter(h => h.required && !h.boundNodeId && !d.has(h.id));
  return {
    matches: r,
    missingRequiredSlots: u,
    remainingFiles: n
  };
}

async function V0i({
  recipe: e,
  detail: t,
  bindings: n,
  consumedFiles: r,
  runtime: a
}) {
  const i = t.triggerFiles;
  if (!(i != null && i.files.length)) return;
  const o = $Bt(e, i.files);
  if (o.missingRequiredSlots.length) throw new Error(`监视文件夹仍缺少：${o.missingRequiredSlots.map(l => l.label).join("、")}`);
  if (!o.matches.length) throw new Error("新增文件与 Recipe 输入类型不匹配。");
  const s = a.getOrigin();
  for (const [l, d] of o.matches.entries()) {
    a.assertCurrent();
    const u = ecr(s, l);
    let h = "";
    if (d.file.kind === "text") {
      const p = await a.readTriggerText(i.folderPath, d.file.name);
      h = ncr(a, d.file.name, p.content, u, {
        _productionTriggerFile: d.file.name
      });
    } else {
      const p = i.files.find(y => y.name === d.file.name);
      if (!(p != null && p.absolutePath)) throw new Error(`无法定位监视文件「${d.file.name}」。`);
      const m = await a.readFile(p.absolutePath),
        f = tcr(new File([m], d.file.name, {
          type: D_t({
            kind: d.file.kind
          }, d.file.name)
        }), p.absolutePath);
      a.assertCurrent(), h = await a.importMedia(f, u.x, u.y);
    }
    if (a.assertCurrent(), !h) throw new Error(`无法把「${d.file.name}」导入画布。`);
    n[d.slot.id] = h, r.push(d.file.name);
  }
}

async function H0i(e, t, n) {
  var l, d, u;
  if (n.assertCurrent(), t.plan) return !0;
  const r = n.getRecipe(String(e.recipeId || "").trim());
  if (!r) throw new Error("触发器绑定的生产模板已不存在。");
  const a = {
      ...(e.bindings || {})
    },
    i = {
      recipe: r,
      detail: e,
      bindings: a,
      consumedFiles: t.consumedFiles,
      runtime: n.imports
    };
  (l = e.externalInputs) != null && l.length && (j_t(n, "外部素材尚未导入。"), await $0i(i)), (d = e.triggerFiles) != null && d.files.length && (j_t(n, "新文件已进入等待队列。"), await V0i(i));
  const o = await n.resolveOutput(r.output, (u = e.triggerFiles) == null ? void 0 : u.folderPath);
  n.assertCurrent();
  const s = n.getState();
  if (t.plan = j0i({
    recipe: {
      ...r,
      output: o
    },
    bindings: a,
    projectId: s.projectId,
    ...n.getDocument()
  }), n.needsPreview()) {
    n.openCenter("recipes", {
      recipeId: r.id
    });
    const h = await n.approve(t.plan);
    return n.assertCurrent(), h;
  }
  return !0;
}

function W0i(e) {
  const t = e.settings;
  if (!t || typeof t != "object" || Array.isArray(t) || !Object.prototype.hasOwnProperty.call(t, "_recipeExactSettings")) return e;
  const {
    _recipeExactSettings: n,
    ...r
  } = t;
  return {
    ...e,
    ...(e._recipeExactSettings === !0 || n === !0 ? {
      _recipeExactSettings: !0
    } : {}),
    settings: r
  };
}

async function q0i(e, t, n) {
  n.assertCurrent();
  const r = t.plan,
    a = n.getState(),
    i = D0i(r, a).find(d => d.severity === "error");
  if (i) throw new Error(i.message);
  j_t(n, "请先完成或暂停它。");
  let o = O0i(r, a);
  t.runId = o.id, n.publishRun(o), n.checkpoint(o), (e.source === "panel" || !e.source) && n.openCenter("current", {
    runId: o.id
  });
  const s = n.getBridge();
  if (!s) throw new Error("画布执行桥尚未就绪，请稍后重试。");
  for (const d of r.actions) {
    Dot(n, o.id);
    const u = await s.executeAction({
      requestId: d.id,
      action: d.action,
      payload: W0i(d.payload)
    });
    if (!u.ok) throw new Error(`${d.label}失败：${u.error || u.hint || "画布未确认执行"}`);
    t.completedActionIds.push(d.id), o = Dot(n, o.id), o = F0i(o, d, u), n.publishRun(o);
  }
  const l = r.actions.some(d => d.action === "run_generation" || d.action === "execute_node");
  o = z0i(Dot(n, o.id), l), n.publishRun(o), n.checkpoint(o), n.success(l ? "配方已提交到生产队列" : "配方执行完成");
}

async function K0i(e, t) {
  const n = {
      plan: e.plan,
      completedActionIds: [],
      consumedFiles: []
    },
    r = (a, i) => {
      var o, s;
      return {
        ok: a,
        runId: n.runId,
        planId: ((o = n.plan) == null ? void 0 : o.id) || `recipe-run-${String(e.recipeId || "").trim() || "unknown"}`,
        completedActionIds: n.completedActionIds,
        outputNodeIds: ((s = n.plan) == null ? void 0 : s.outputNodeIds) || [],
        consumedTriggerFiles: n.consumedFiles,
        ...(i ? {
          error: i
        } : {})
      };
    };
  try {
    return (await H0i(e, n, t)) ? (await q0i(e, n, t), r(!0)) : r(!1, "用户取消了模板执行。");
  } catch (a) {
    const i = a instanceof Error ? a.message : String(a),
      o = t.getActiveRun();
    return t.isCurrent() && n.runId && (o == null ? void 0 : o.id) === n.runId && o.status !== "paused" && t.publishRun(Ug({
      ...o,
      lastError: i
    }, "failed", i)), t.error(i), r(!1, i);
  }
}

function Q0i(e) {
  let t = !1;
  return async n => {
    var r;
    if (t) return {
      ok: !1,
      planId: ((r = n.plan) == null ? void 0 : r.id) || `recipe-run-${n.recipeId || "unknown"}`,
      completedActionIds: [],
      outputNodeIds: [],
      consumedTriggerFiles: [],
      error: "已有配方正在准备或执行，请等待当前请求结束。"
    };
    t = !0;
    try {
      // Establish a durable canvas identity before capturing the execution lease.
      const initial = e();
      if (!initial.getState().projectId && typeof window.__qdmEmergencySave === "function") {
        const saved = await window.__qdmEmergencySave("production-start");
        if (!saved) throw new Error("请先保存当前画布，再执行生产模板");
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
      return await K0i(n, e());
    } finally {
      t = !1;
    }
  };
}

let $Q = [],
  Jsn = !1;

const L_t = new Set();

let aje = null;

function Y0i() {
  for (const e of L_t) e();
}

function GBt(e) {
  if (!Array.isArray(e)) return [];
  const t = new Map();
  for (const n of e) {
    const r = _0i(n);
    if (!r) continue;
    const a = t.get(r.id);
    (!a || r.updatedAt >= a.updatedAt) && t.set(r.id, r);
  }
  return [...t.values()].sort((n, r) => r.updatedAt - n.updatedAt).slice(0, C0i());
}

function X0i() {
  try {
    if (typeof localStorage > "u") return $Q;
    const e = localStorage.getItem(xUe);
    return e ? GBt(JSON.parse(e)) : $Q;
  } catch {
    return $Q;
  }
}

function J0i() {
  const e = GZ("recipes");
  if (e.ready && e.value !== null) return cpe(xUe), GBt(e.value);
  const t = X0i();
  return e.ready && sI("recipes", xUe, t), t;
}

function Z0i(e) {
  $Q = GBt(e), sI("recipes", xUe, $Q);
}

function VBt() {
  return Jsn || ($Q = J0i(), Jsn = GZ("recipes").ready || !DJn()), $Q;
}

function eyi(e) {
  const t = [e, ...VBt().filter(n => n.id !== e.id)];
  return Z0i(t), Y0i(), e;
}

function tyi(e) {
  return L_t.add(e), () => L_t.delete(e);
}

function nyi() {
  return VBt();
}

function Spe(e) {
  return VBt().find(t => t.id === e) ?? null;
}

function ryi(e) {
  const t = e.nodes ? null : aje == null ? void 0 : aje();
  return eyi(x0i({
    ...e,
    nodes: e.nodes ?? (t == null ? void 0 : t.nodes),
    connections: e.connections ?? (t == null ? void 0 : t.connections)
  }));
}

function Zsn(e) {
  aje = e;
}

function ayi(e, t) {
  const n = r => {
    t(), Da.flushSync(() => e.setNodes(a => {
      t();
      const i = typeof r == "function" ? r(a) : r;
      return e.nodesRef.current = i, i;
    }));
  };
  return {
    assertCurrent: t,
    commitNodes: n,
    generateId: e.generateId,
    getOrigin: () => {
      var o;
      const r = (o = e.canvasRef.current) == null ? void 0 : o.getBoundingClientRect(),
        a = e.viewRef.current,
        i = a.zoom > 0 ? a.zoom : 1;
      return r ? {
        x: (r.width / 2 - a.x) / i,
        y: (r.height / 2 - a.y) / i
      } : {
        x: 240,
        y: 240
      };
    },
    readFile: async r => (await Ie(async () => {
      const {
        readFile: a
      } = await Promise.resolve().then(() => oc);
      return {
        readFile: a
      };
    }, void 0, import.meta.url)).readFile(r),
    download: async (r, a) => (await Ie(async () => {
      const {
        downloadWithFallback: i
      } = await Promise.resolve().then(() => El);
      return {
        downloadWithFallback: i
      };
    }, void 0, import.meta.url)).downloadWithFallback(r, a, {
      cacheResult: !1
    }),
    readTriggerText: async (r, a) => (await Ie(async () => {
      const {
        readLocalSkillText: i
      } = await Promise.resolve().then(() => O9t);
      return {
        readLocalSkillText: i
      };
    }, void 0, import.meta.url)).readLocalSkillText(r, a),
    importMedia: async (r, a, i) => {
      const {
        importCanvasMediaFile: o
      } = await Ie(async () => {
        const {
          importCanvasMediaFile: s
        } = await Promise.resolve().then(() => Kzn);
        return {
          importCanvasMediaFile: s
        };
      }, void 0, import.meta.url);
      return t(), o({
        file: r,
        x: a,
        y: i,
        setNodes: n,
        generateId: e.generateId
      });
    }
  };
}

function iyi(e, t) {
  const n = () => {
    if (!t()) throw new Error("画布项目已切换或正在加载，已停止本次配方的后续写入。");
  };
  return {
    isCurrent: t,
    assertCurrent: n,
    getState: e.readState,
    getDocument: () => ({
      nodes: e.nodesRef.current,
      connections: e.connectionsRef.current
    }),
    getRecipe: Spe,
    getActiveRun: bm,
    getBridge: () => e.bridgeRef.current,
    imports: ayi(e, n),
    resolveOutput: Ugi,
    needsPreview: () => I0i(!1),
    approve: r => aZn(L0i(r)),
    openCenter: qP,
    publishRun: ex,
    checkpoint: r => {
      R5({
        run: r
      });
    },
    success: r => {
      e.toastSuccess(r);
    },
    error: r => {
      e.toastError(r, 7e3);
    }
  };
}

const eln = "productionRecipeExecuteRequested";

function oyi(e, t, n) {
  const r = a => {
    const i = a.detail;
    if (!(!(i != null && i.plan) && !String((i == null ? void 0 : i.recipeId) || "").trim())) try {
      t(i).then(o => {
        var s;
        return (s = i.resolve) == null ? void 0 : s.call(i, o);
      }).catch(n);
    } catch (o) {
      n(o);
    }
  };
  return e.addEventListener(eln, r), () => e.removeEventListener(eln, r);
}

function syi(e) {
  const t = g.useRef(e),
    n = g.useRef(0),
    r = g.useRef(!1);
  g.useLayoutEffect(() => {
    t.current = e;
  }), g.useLayoutEffect(() => {
    n.current += 1;
  }, [e.projectId, e.projectLoading]);
  const [a] = g.useState(() => Q0i(() => {
    const i = t.current,
      o = n.current,
      s = i.projectId;
    return iyi(i, () => r.current && !t.current.projectLoading && n.current === o && t.current.projectIdRef.current === s);
  }));
  g.useEffect(() => {
    r.current = !0;
    const i = oyi(window, a, o => console.error("[ProductionRecipe] execution subscription failed:", o));
    return () => {
      r.current = !1, n.current += 1, i();
    };
  }, [a]);
}

const AUe = "2084608321469898754",
  lyi = "Minimax-多参视频生成",
  rcr = "MiniMax H3",
  acr = "rh-comfy-minimax-h3",
  cyi = "/runninghub/workflow-2084608321469898754.jpg",
  tln = "qiaodoumayi_rh_minimax_h3_seeded_v1";

function S1e(e) {
  return String(e || "").trim() === AUe;
}

function dyi() {
  return {
    workflowId: AUe,
    rhUseOverseas: !0
  };
}

function uyi() {
  return {
    id: `rh_workflow_${AUe}_bundled`,
    type: "workflow",
    webappId: AUe,
    webappName: lyi,
    customName: rcr,
    covers: [{
      thumbnailUri: cyi
    }],
    createdAt: Date.now(),
    rhUseOverseas: !0
  };
}

function hyi(e) {
  const t = Array.isArray(e) ? e : [];
  if (typeof localStorage < "u") try {
    if (localStorage.getItem(tln) === "1") return t;
    localStorage.setItem(tln, "1");
  } catch {}
  return t.some(n => n.type === "workflow" && S1e(n.webappId)) ? t : [uyi(), ...t];
}

function pyi(e) {
  return {
    fillRhNode(t) {
      const {
          nodes: n,
          selectedNodeId: r,
          updateNode: a,
          viewRef: i,
          canvasInnerViewport: o,
          generateId: s,
          setNodes: l,
          setSelectedNodeId: d,
          setSelectedNodeIds: u,
          selectedNodeIdsRef: h,
          toastSuccess: p
        } = e(),
        m = (t.type || "app") === "workflow",
        f = m ? "rh-comfy" : "rh-app",
        y = t.customName || t.webappName,
        b = t.rhUseOverseas ?? S1e(t.webappId),
        v = r ? n.find(T => T.id === r && T.type === f) : void 0,
        _ = T => ({
          ...T,
          workflowId: t.webappId,
          comfyEditableParams: t.comfyEditableParams,
          rhComfyParamValues: t.rhParamValues || {},
          comfyRawWorkflowJson: t.comfyRawWorkflowJson,
          rhUseOverseas: b,
          rhComfyUploadPreviews: t.rhComfyUploadPreviews || {}
        }),
        w = T => ({
          ...T,
          webappId: t.webappId,
          webappName: y,
          rhCovers: t.covers,
          nodeInfoListTemplate: t.nodeInfoListTemplate,
          rhParamValues: t.rhParamValues || {}
        });
      if (v) {
        a(v.id, {
          settings: m ? _(v.settings) : w(v.settings)
        }), p(`已将${m ? "工作流" : "应用"} "${y}" 填充到节点`);
        return;
      }
      const k = i.current,
        A = k.zoom > 0 ? k.zoom : 1,
        {
          w: S,
          h: C
        } = Ihe(f),
        I = (o.width / 2 - k.x) / A - S / 2,
        E = (o.height / 2 - k.y) / A - C / 2,
        M = s();
      l(T => {
        const P = Ki(M, f, I, E, y, m ? _({}) : w({}), T);
        return [...T, P];
      }), d(M), u(new Set([M])), h.current = new Set([M]), j5(h.current), p(`已创建 ${y}`);
    },
    sendKlingSubject(t) {
      var u, h;
      const {
          nodes: n,
          selectedNodeId: r,
          klingSubjectLibrary: a,
          updateNode: i,
          toastSuccess: o,
          toastError: s
        } = e(),
        l = p => {
          var m;
          return sIe(String(((m = p.settings) == null ? void 0 : m.model) || ""));
        },
        d = r ? n.find(p => p.id === r && l(p)) : n.find(p => l(p));
      if (d) {
        const p = a.find(m => m.id === t);
        if (p) {
          const m = ((u = d.settings) == null ? void 0 : u.klingSubjects) || [],
            f = String(((h = d.settings) == null ? void 0 : h.model) || "").includes("huya") ? 3 : 7;
          m.length < f && !m.includes(t) ? (i(d.id, {
            settings: {
              ...d.settings,
              klingSubjects: [...m, t]
            }
          }), o(`已将主体 "${p.name}" 添加到节点`)) : m.includes(t) ? s("该主体已添加到节点") : s(`最多只能添加 ${f} 个主体`);
        }
      } else s("请先选择一个可灵 / 虎牙可灵视频节点");
    }
  };
}

function myi(e) {
  const t = g.useRef(e);
  return g.useLayoutEffect(() => {
    t.current = e;
  }), g.useMemo(() => pyi(() => t.current), []);
}

let aoe = {
  open: !1,
  scope: "personal"
};

const O_t = new Set();

function icr() {
  O_t.forEach(e => e());
}

function B_t() {
  return aoe;
}

function ocr(e) {
  return O_t.add(e), () => O_t.delete(e);
}

function fyi(e = "personal") {
  aoe = {
    open: !0,
    scope: "personal"
  }, icr();
}

function I1e() {
  aoe.open && (aoe = {
    ...aoe,
    open: !1
  }, icr());
}

function gyi() {
  return g.useSyncExternalStore(ocr, B_t, B_t);
}

function nln() {
  return aoe.open;
}

function scr() {
  return g.useSyncExternalStore(ocr, nln, nln);
}

function lcr() {
  const [e, t] = g.useState(() => ({
    configs: Qa.getConfigs(),
    globalApiKey: Qa.getGlobalApiKey(),
    globalBaseUrl: Qa.getGlobalBaseUrl(),
    activeEndpoint: Qa.getActiveEndpoint(),
    jimengSuperResUrl: Qa.getJimengSuperResUrl(),
    jimengSuperResApiKey: Qa.getJimengSuperResApiKey()
  }));
  g.useEffect(() => {
    Qa.syncWithDefaults();
  }, [JOe]), g.useEffect(() => Qa.subscribe(() => {
    t({
      configs: Qa.getConfigs(),
      globalApiKey: Qa.getGlobalApiKey(),
      globalBaseUrl: Qa.getGlobalBaseUrl(),
      activeEndpoint: Qa.getActiveEndpoint(),
      jimengSuperResUrl: Qa.getJimengSuperResUrl(),
      jimengSuperResApiKey: Qa.getJimengSuperResApiKey()
    });
  }), []);
  const n = g.useCallback(_ => e.configs.filter(w => w.type === _), [e.configs]),
    r = g.useCallback(_ => e.configs.find(w => w.id === _), [e.configs]),
    a = g.useCallback(_ => Qa.getEffectiveApiKey(_), []),
    i = g.useCallback((_, w) => {
      Qa.updateConfig(_, w);
    }, []),
    o = g.useCallback(_ => {
      Qa.updateConfigs(_);
    }, []),
    s = g.useCallback(_ => {
      Qa.setGlobalApiKey(_);
    }, []),
    l = g.useCallback(_ => {
      Qa.setGlobalBaseUrl(_);
    }, []),
    d = g.useCallback(_ => {
      Qa.applyGlobalBaseUrlFromPicker(_);
    }, []),
    u = g.useCallback(_ => {
      Qa.switchEndpoint(_);
    }, []),
    h = g.useCallback(_ => {
      Qa.setJimengSuperResUrl(_);
    }, []),
    p = g.useCallback(_ => {
      Qa.setJimengSuperResApiKey(_);
    }, []),
    m = g.useCallback(_ => {
      Qa.addCustomConfig(_);
    }, []),
    f = g.useCallback(_ => {
      Qa.removeCustomConfig(_);
    }, []),
    y = g.useCallback(() => {
      Qa.resetToDefaults();
    }, []),
    b = g.useCallback(() => {
      Qa.syncWithDefaults();
    }, []),
    v = g.useCallback(() => Qa.getEndpoints(), []);
  return {
    configs: e.configs,
    globalApiKey: e.globalApiKey,
    globalBaseUrl: e.globalBaseUrl,
    activeEndpoint: e.activeEndpoint,
    jimengSuperResUrl: e.jimengSuperResUrl,
    jimengSuperResApiKey: e.jimengSuperResApiKey,
    getConfigsByType: n,
    getConfigById: r,
    getEffectiveApiKey: a,
    getEndpoints: v,
    updateConfig: i,
    updateConfigs: o,
    setGlobalApiKey: s,
    setGlobalBaseUrl: l,
    applyGlobalBaseUrlFromPicker: d,
    switchEndpoint: u,
    setJimengSuperResUrl: h,
    setJimengSuperResApiKey: p,
    addCustomConfig: m,
    removeCustomConfig: f,
    resetToDefaults: y,
    syncWithDefaults: b
  };
}

const yyi = 1200 * 1e3,
  byi = 6.5 * 60 * 1e3,
  vyi = 2e3,
  HBt = new Set(),
  Bke = new Map(),
  wyi = "qiaodoumayi_api_task_sent",
  SUe = new Set(),
  IUe = new Set(),
  Fke = new Set(),
  CUe = new Map(),
  WBt = new Map();

let rln = !1;

const qBt = e => `generation:${String(e)}`;

function ccr(e) {
  for (; e.size > vyi;) {
    const t = e.keys().next().value;
    if (t === void 0) break;
    e.delete(t);
  }
}

function xyi(e) {
  const t = String(e || "").trim();
  if (!t) return;
  const n = `huya:${t}:`;
  for (const r of [...Fke]) r.startsWith(n) && Fke.delete(r);
}

function dcr(e) {
  const t = String(e || "").trim();
  t && (KBt(t), HBt.add(t));
}

function ucr(e) {
  HBt.delete(String(e || "").trim());
}

function VCe(e) {
  return HBt.has(String(e || "").trim());
}

function KBt(e) {
  const t = String(e || "").trim(),
    n = Bke.get(t);
  n != null && (clearTimeout(n), Bke.delete(t));
}

function _yi(e) {
  return Bke.has(String(e || "").trim());
}

function kyi(e, t) {
  const n = String(e || "").trim();
  n && (KBt(n), Bke.set(n, setTimeout(() => {
    Bke.delete(n), !VCe(n) && t();
  }, byi)));
}

function F_t(e) {
  const t = String(e || "").trim();
  return t ? VCe(t) || _yi(t) || ik.has(qBt(t)) : !1;
}

function Ayi(e) {
  return e ? Fke.has(e) ? !1 : (Fke.add(e), !0) : !0;
}

function Jx(e) {
  e && Fke.delete(e);
}

function Syi(e) {
  const t = String(e || "").trim();
  t && (IUe.add(t), ccr(IUe), xyi(t));
}

function z_t(e) {
  return IUe.has(String(e || ""));
}

function QBt(e) {
  IUe.delete(String(e || ""));
}

function U_t(e) {
  return SUe.has(String(e || ""));
}

function Lot(e) {
  SUe.delete(String(e || ""));
}

function hcr() {
  rln || typeof window > "u" || (window.addEventListener("cancelPolling", e => {
    const t = e.detail;
    if (t != null && t.taskId) {
      const n = String(t.taskId);
      SUe.add(n), ccr(SUe), ik.wake(qBt(n));
    }
    t != null && t.nodeId && Syi(t.nodeId);
  }), rln = !0);
}

function Efe(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(wyi, {
    detail: {
      endpoint: e
    }
  }));
}

function Iyi(e) {
  const t = (CUe.get(e) ?? 0) + 1;
  return CUe.set(e, t), t;
}

function Cyi(e, t) {
  return CUe.get(e) === t;
}

function $_t(e, t) {
  WBt.set(e, t);
}

function pcr(e) {
  WBt.delete(e);
}

function GQ(e, t) {
  if (!t) return !1;
  const n = WBt.get(t);
  return n == null ? !1 : n < (CUe.get(e) ?? 0);
}

function mcr(e, t) {
  SO(t, "启动生成");
  const n = Iyi(e);
  return QBt(e), {
    generationEpoch: n,
    isCurrent: () => t() && Cyi(e, n),
    recordTask: r => $_t(r, n)
  };
}

function aln(e, t, n, r = []) {
  const a = mcr(e, t),
    i = n(a.isCurrent, e);
  for (const o of r) i.claimTarget(o);
  return {
    ...i,
    generationEpoch: a.generationEpoch,
    recordTask: a.recordTask
  };
}

function Eyi(e, t) {
  let n = null;
  const r = new Set();
  return {
    run(i) {
      const o = e.lease();
      return o.assertCurrent(), t(), o.assertCurrent(), n ? i(n) : new Promise((s, l) => {
        const d = {
          reject: l,
          current: o.isCurrent,
          start(u) {
            try {
              o.assertCurrent(), Promise.resolve(i(u)).then(s, l);
            } catch (h) {
              l(h);
            }
          }
        };
        r.add(d);
      });
    },
    ready(i) {
      n = i;
      const o = [...r];
      r.clear();
      for (const s of o) s.start(i);
    },
    cancelStale: () => {
      n = null;
      for (const i of r) i.current() || (r.delete(i), i.reject(new Error("画布项目已切换，已取消尚未派发的生成请求。")));
    },
    dispose() {
      n = null;
      for (const i of r) i.reject(new Error("生成入口已卸载，请重新打开画布后重试。"));
      r.clear();
    }
  };
}

const Tyi = g.lazy(() => Ie(() => Promise.resolve().then(() => xoo), void 0, import.meta.url).then(e => ({
  default: e.GenerationRunner
})));

function Ipe(e, t) {
  const [n, r] = g.useState(!1),
    a = g.useCallback(() => {
      r(!0);
    }, []),
    [i] = g.useState(() => Eyi(t, a)),
    o = g.useCallback(m => i.ready(m), [i]);
  g.useEffect(() => {
    const m = t.subscribe(i.cancelStale);
    return () => {
      m(), i.dispose();
    };
  }, [t, i]), g.useEffect(() => {
    let m = !0;
    if (typeof requestIdleCallback == "function") {
      const y = requestIdleCallback(() => {
        m && r(!0);
      }, {
        timeout: 4e3
      });
      return () => {
        m = !1, typeof cancelIdleCallback == "function" && cancelIdleCallback(y);
      };
    }
    const f = window.setTimeout(() => r(!0), 2e3);
    return () => clearTimeout(f);
  }, []);
  const s = g.useCallback(m => i.run(m), [i]),
    l = g.useCallback((...m) => {
      var b;
      const f = m[0],
        y = t.lease();
      if ((f == null ? void 0 : f.type) === "gen-image" && ((b = f.settings) == null ? void 0 : b.model) === aJ) {
        const v = mcr(f.id, y.isCurrent);
        return v8a({
          node: f,
          updateNode: (_, w) => {
            v.isCurrent() && e.updateNode(_, w);
          },
          setHistory: e.setHistory,
          generateId: e.generateId,
          getConnectedInputImages: e.getConnectedInputImages,
          getConnectedInputItems: e.getConnectedInputItems
        });
      }
      return y.assertCurrent(), s(v => v.generate(...m));
    }, [s, t, e.updateNode, e.setHistory, e.generateId, e.getConnectedInputImages, e.getConnectedInputItems]),
    d = g.useCallback((...m) => {
      const f = t.lease();
      return f.assertCurrent(), s(y => (f.assertCurrent(), y.runExpandImage(...m)));
    }, [s, t]),
    u = g.useCallback((...m) => {
      const f = t.lease();
      return f.assertCurrent(), s(y => (f.assertCurrent(), y.runEditImage(...m)));
    }, [s, t]),
    h = g.useCallback((...m) => {
      const f = t.lease();
      return f.assertCurrent(), s(y => (f.assertCurrent(), y.generateChartBatch(...m)));
    }, [s, t]),
    p = g.useMemo(() => n ? c.jsx(g.Suspense, {
      fallback: null,
      children: c.jsx(Tyi, {
        params: e,
        onReady: o,
        document: t
      })
    }) : null, [n, e, o, t]);
  return {
    generate: l,
    runExpandImage: d,
    runEditImage: u,
    generateChartBatch: h,
    generationRunner: p
  };
}

function iln(e, t) {
  var o, s;
  const n = ((o = e.settings) == null ? void 0 : o.chatModel) || ((s = e.settings) == null ? void 0 : s.model) || "gemini-3-pro",
    r = If(n),
    a = r.id;
  let i = t.find(l => l.id === a && l.type === "Chat");
  return i || (i = t.find(l => l.type === "Chat" && l.enabled !== false && l.nativeTransport === 'aiyouplus_model_generate')), i || (i = t.find(l => l.id === "gemini-3-pro" && l.type === "Chat")), i || (i = t.find(l => l.type === "Chat" && l.enabled !== false)), {
    config: i,
    chatModelId: i?.id || a,
    mergedEffort: r.effort
  };
}

function oln(e, t) {
  var a;
  const n = String(((a = e.settings) == null ? void 0 : a.platformGroup) ?? "").trim();
  if (n) return n;
  const r = zs(t);
  return (r == null ? void 0 : r.platformGroup) || ko;
}

function sln(e, t, n, r, a) {
  var o;
  const i = ((t == null ? void 0 : t.url) || "https://api.openai.com").replace(/\/+$/, "");
  return cu(t == null ? void 0 : t.key, r, (o = e.settings) == null ? void 0 : o.savedApiKeyId, {
    platformGroup: a,
    modelName: (t == null ? void 0 : t.modelName) || n,
    modelId: (t == null ? void 0 : t.id) || n,
    baseUrl: i,
    modelSavedApiKeyId: t == null ? void 0 : t.savedApiKeyId
  });
}

async function aiyouplusAnalysisImageDataUrl(source) {
  if (typeof source !== "string" || !source || /qiniu|qnaigc|qbox\.me|clouddn\.com|qnssl\.com|qiniucdn\.com|七牛/i.test(source)) throw new Error("请使用有效的本地关键帧图片");
  let localPath;
  if (source.startsWith("/")) localPath = source;
  else try {
    const url = new URL(source);
    if ((url.protocol === "asset:" && url.hostname === "localhost") || (url.protocol === "file:" && !url.hostname) || (url.protocol === "http:" && url.hostname === "asset.localhost")) localPath = decodeURIComponent(url.pathname);
  } catch {}
  let blob;
  if (localPath) {
    const raw = await window.__TAURI_INTERNALS__.invoke("read_file_bytes", { filePath: localPath });
    const bytes = raw?.type === "Buffer" ? new Uint8Array(raw.data) : new Uint8Array(raw);
    const signature = String.fromCharCode(...bytes.subarray(0, 12));
    const mime = bytes[0] === 137 && signature.slice(1, 4) === "PNG" ? "image/png" : bytes[0] === 255 && bytes[1] === 216 ? "image/jpeg" : signature.startsWith("RIFF") && signature.slice(8, 12) === "WEBP" ? "image/webp" : "";
    if (!mime) throw new Error("本地关键帧不是PNG、JPEG或WebP图片，未提交模型");
    blob = new Blob([bytes], { type: mime });
  } else {
    const response = await fetch(source);
    if (!response.ok) throw new Error("无法读取关键帧图片，未提交模型");
    blob = await response.blob();
  }
  if (!/^image\/(png|jpeg|webp)$/.test(blob.type) || !blob.size || blob.size > 8 * 1024 * 1024) throw new Error("关键帧必须是8MB以内的PNG、JPEG或WebP图片，未提交模型");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("关键帧读取失败，未提交模型"));
    reader.readAsDataURL(blob);
  });
}

function aiyouplusAnalysisFrameSample(frames, limit = 5) {
  if (!Array.isArray(frames) || !frames.length) throw new Error("没有可分析的关键帧");
  const sorted = [...frames].sort((a, b) => a.time - b.time);
  if (sorted.some(frame => !Number.isFinite(frame.time) || frame.time < 0 || !frame.url)) throw new Error("关键帧缺少有效时间戳或图片");
  return sorted.length <= limit ? sorted : Array.from({ length: limit }, (_, index) => sorted[Math.round(index * (sorted.length - 1) / (limit - 1))]);
}

function aiyouplusVisualAnalysisScope(frames, duration) {
  return { method: "local-keyframes", sampledAtSeconds: frames.map(frame => frame.time), sampleCount: frames.length,
    ...(Number.isFinite(duration) && duration > 0 ? { sourceDurationSeconds: duration } : {}), audioAnalyzed: false,
    coverageNote: "仅分析列出的采样帧；未识别音轨，未验证采样间内容或准确镜头切点。" };
}

function aiyouplusAnalysisScopeLabel(scope) {
  const scopes = Array.isArray(scope) ? scope : scope ? [scope] : [];
  const times = scopes.flatMap(item => item.sampledAtSeconds || []).map(time => Number(time).toFixed(2));
  return (times.length ? `采样帧：${times.join("、")}秒。` : "每次最多分析5张采样帧。") + "不识别音轨；采样间内容与准确切点未验证。";
}

async function aiyouplusNativeVideoFrames(videoNode) {
  const source = gcr(videoNode);
  if (!source || /qiniu|qnaigc|qbox\.me|clouddn\.com|qnssl\.com|qiniucdn\.com|七牛/i.test(source)) throw new Error("请连接可读取的本地视频");
  const duration = await new Promise((resolve, reject) => {
    const video = document.createElement("video"), cleanup = () => { clearTimeout(timer); video.removeAttribute("src"); video.load(); video.remove(); };
    const timer = setTimeout(() => { cleanup(); reject(new Error("本地视频信息读取超时，未提交模型")); }, 15000);
    video.muted = true; video.playsInline = true; video.preload = "metadata";
    video.onloadedmetadata = () => { const value = video.duration; cleanup(); Number.isFinite(value) && value > 0 ? resolve(value) : reject(new Error("本地视频时长无效，未提交模型")); };
    video.onerror = () => { cleanup(); reject(new Error("无法解码本地视频，未提交模型")); };
    video.src = source;
  });
  const frames = [];
  for (let index = 0; index < 5; index++) {
    const time = (index + .5) * duration / 5;
    frames.push({ time, url: await Gz(source, time, { preserveOriginal: false, maxSide: 640, quality: .82 }) });
  }
  const parts = [{ type: "text", text: `以下仅为本地视频的5张采样帧，视频时长${duration.toFixed(3)}秒。只描述可见画面，不编造采样间动作、精确切点或任何声音。` }];
  for (const frame of frames) parts.push({ type: "text", text: `采样时间戳：${frame.time.toFixed(3)}秒` }, { type: "image_url", image_url: { url: frame.url } });
  return { parts, frames, scope: aiyouplusVisualAnalysisScope(frames, duration) };
}

async function lln(e) {
  if (window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(e.modelId)) {
    const messages = [];
    for (const message of e.messages || []) {
      if (!Array.isArray(message.content)) { messages.push(message); continue; }
      const content = [];
      for (const part of message.content) content.push(part.type === "image_url" ? { ...part, image_url: { ...part.image_url, url: await aiyouplusAnalysisImageDataUrl(part.image_url?.url) } } : part);
      messages.push({ ...message, content });
    }
    e = { ...e, messages };
  }
  return mx({
    modelId: e.modelId,
    format: e.useGeminiOfficial ? "gemini-official" : "openai",
    baseUrl: e.baseUrl,
    apiKey: e.apiKey,
    modelName: e.modelName,
    messages: e.messages,
    signal: e.signal,
    stream: !1,
    reasoningEffort: e.reasoningEffort
  });
}

function cln(e, t) {
  var a, i, o, s, l, d, u, h;
  if (t) return PD(e);
  const n = e;
  let r = ((o = (i = (a = n.choices) == null ? void 0 : a[0]) == null ? void 0 : i.message) == null ? void 0 : o.content) || ((u = (d = (l = (s = n.data) == null ? void 0 : s.choices) == null ? void 0 : l[0]) == null ? void 0 : d.message) == null ? void 0 : u.content) || n.content || ((h = n.data) == null ? void 0 : h.content) || "";
  return Array.isArray(r) && (r = r.map(p => p && typeof p == "object" && p.type === "text" ? p.text : typeof p == "string" ? p : "").join("")), typeof r == "string" ? r : "";
}

const Myi = ({
  nodesMap: e,
  apiConfigs: t,
  globalApiKey: n,
  getConnectedVideoInputNode: r,
  groupKeyframesByTime: a,
  setNodes: i,
  setConnections: o,
  setSettingsOpen: s
}) => {
  const l = g.useCallback(async h => {
      var j, B, F, N;
      const p = e.get(h);
      if (!p || p.type !== "video-analyze") return;
      const m = r(h);
      if (!m) {
        alert(x("请先连接一个视频输入节点或含视频的图片输入节点"));
        return;
      }
      const f = m.selectedKeyframes || [];
      if (f.length === 0) {
        alert(m.type === "input-image" ? x("手动选帧拆解请连接视频输入节点并选择关键帧") : x("请先在视频输入节点中选择关键帧"));
        return;
      }
      const {
          config: y,
          chatModelId: b,
          mergedEffort: v
        } = iln(p, t),
        _ = oln(p, b),
        w = sln(p, y, b, n, _),
        k = ((y == null ? void 0 : y.url) || "https://api.openai.com").replace(/\/+$/, ""),
        A = (y == null ? void 0 : y.modelName) || (y == null ? void 0 : y.id) || "gemini-3-pro-preview",
        S = ow((j = p.settings) == null ? void 0 : j.videoAnalyzeGeminiApiFormat),
        C = !((B = dh(b)) != null && B.nativeChat) && Wk(b, A) && S === "gemini-official",
        I = F2(b, v ?? ((F = p.settings) == null ? void 0 : F.videoAnalyzeReasoningEffort), A);
      if (!w) {
        alert(x("请先在 API 设置中配置 Key")), s(!0);
        return;
      }
      const E = ((N = p.settings) == null ? void 0 : N.segmentDuration) || 3,
        M = a(f, E);
      if (M.length === 0) {
        alert(x("无法分组关键帧"));
        return;
      }
      const T = BS("analysis", {
        id: crypto.randomUUID(),
        label: "视频分析",
        modelName: A
      });
      i(G => G.map(z => z.id === h ? {
        ...z,
        isGenerating: !0,
        errorMsg: void 0,
        analysisResults: []
      } : z));
      const P = [],
        R = m.videoFileName || "video.mp4";
      try {
        for (let G = 0; G < M.length; G++) {
          const z = M[G],
            V = `${z[0].time.toFixed(1)}s-${z[z.length - 1].time.toFixed(1)}s`,
            O = `你是一个专业的视频拆解和提示词生成助手。请分析提供的视频关键帧，动态拆解视频内容，并根据用户选中的关键帧生成高质量的AI绘图提示词。

请返回严格的 JSON 格式，结构如下：
{
  "video_id": "${R}",
  "scene_index": ${G + 1},
  "time_range": "${V}",
  "keyframes": [
    {
      "type": "prev",
      "time": 5.2,
      "description": "上一画面内容简介",
      "mj_prompt": "Midjourney 英文提示词",
      "jimeng_prompt": "即梦中文提示词"
    },
    {
      "type": "current",
      "time": 6.8,
      "description": "当前画面内容简介",
      "mj_prompt": "Midjourney 英文提示词",
      "jimeng_prompt": "即梦中文提示词"
    }
  ],
  "global_tags": {
    "style": ["赛博朋克", "末日科幻"],
    "camera": ["低机位", "广角"],
    "color": ["冷暖对比"]
  }
}`,
            L = [{
              type: "text",
              text: `请分析以下视频关键帧（场景 ${G + 1}，时间段：${V}），生成详细的提示词：`
            }],
            D = 15,
            U = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(b) ? aiyouplusAnalysisFrameSample(z) : z.length > D ? z.slice(0, D) : z;
          if (window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(b)) L[0].text += "仅分析提供的图片，未包含音轨；不得编造帧间动作或声音。";
          U.forEach((le, J) => {
            L.push({ type: "text", text: `关键帧 ${J + 1}（时间：${le.time.toFixed(3)}s）` }, {
              type: "image_url",
              image_url: {
                url: le.url
              }
            });
          });
          const H = [{
              role: "system",
              content: O
            }, {
              role: "user",
              content: L
            }],
            Y = new AbortController(),
            K = setTimeout(() => Y.abort(), 6e4);
          let W;
          try {
            W = await lln({
              modelId: b,
              useGeminiOfficial: C,
              baseUrl: k,
              apiKey: w,
              modelName: (y == null ? void 0 : y.modelName) || "gemini-3-pro-preview",
              messages: H,
              signal: Y.signal,
              reasoningEffort: I
            });
          } catch (le) {
            clearTimeout(K);
            const J = le;
            throw J.name === "AbortError" ? new Error("请求超时，请检查网络连接或稍后重试") : new Error(`网络请求失败: ${J.message}`);
          } finally {
            clearTimeout(K);
          }
          if (!W.ok) {
            let le = "";
            try {
              le = await W.text();
            } catch {
              le = `HTTP ${W.status}: ${W.statusText}`;
            }
            throw new Error(le || `API Error: ${W.status}`);
          }
          const Q = await W.json();
          let q = cln(Q, C);
          if (!q || q.trim() === "") throw new Error("API 返回内容为空");
          let ne = q.trim();
          ne.startsWith("```") && (ne = ne.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, ""));
          let de;
          try {
            de = JSON.parse(ne);
          } catch {
            throw new Error("关键帧分析未返回有效JSON，未创建模板或空结果，请检查模型响应后重试");
          }
          if (!Array.isArray(de.keyframes) || !de.keyframes.length || de.keyframes.some(frame => !Number.isFinite(frame.time) || !String(frame.description || "").trim() || !(String(frame.mj_prompt || "").trim() || String(frame.jimeng_prompt || "").trim()))) throw new Error("关键帧分析结果缺少有效画面描述或提示词，未创建结果");
          if (window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(b)) de.analysisScope = aiyouplusVisualAnalysisScope(U, m.videoMeta?.duration);
          P.push(de), i(le => le.map(J => J.id === h ? {
            ...J,
            analysisResults: [...P]
          } : J));
        }
        i(G => G.map(z => z.id === h ? {
          ...z,
          isGenerating: !1,
        analysisResults: P,
        settings: { ...z.settings, analysisResults: P, ...(P.some(result => result.analysisScope) ? { nativeAnalysisScope: P.map(result => result.analysisScope) } : {}) }
        } : z)), T();
      } catch (G) {
        const z = G;
        i(V => V.map(O => O.id === h ? {
          ...O,
          isGenerating: !1,
          errorMsg: z.message
        } : O));
      }
    }, [e, r, t, n, a, i, s]),
    d = g.useCallback((h, p) => {
      const m = e.get(h);
      if (!m || !p || p.length === 0) return;
      const f = p.map((w, k) => {
          var R, j, B;
          const A = w.keyframes,
            S = (A == null ? void 0 : A.find(F => F.type === "current")) || (A == null ? void 0 : A[0]),
            C = (S == null ? void 0 : S.mj_prompt) || "",
            I = (S == null ? void 0 : S.jimeng_prompt) || "",
            E = (S == null ? void 0 : S.description) || "",
            M = w.global_tags,
            T = [];
          (R = M == null ? void 0 : M.style) != null && R[0] && T.push(M.style[0]), (j = M == null ? void 0 : M.camera) != null && j[0] && T.push(M.camera[0]);
          const P = ((B = M == null ? void 0 : M.camera) == null ? void 0 : B[0]) || "";
          return {
            id: `shot-${Date.now()}-${k}`,
            scene_index: k + 1,
            time_range: w.time_range || "",
            image_url: "",
            description: E,
            prompt: C || I,
            camera: P,
            tags: T,
            status: "draft"
          };
        }),
        y = m.x + m.width + 100,
        b = m.y,
        v = `node-storyboard-${Date.now()}`,
        _ = {
          id: v,
          type: "storyboard-node",
          x: y,
          y: b,
          width: 600,
          height: 500,
          settings: {
            projectTitle: "AI 拆解结果",
            shots: f
          }
        };
      i(w => [...w, _]), o(w => [...w, {
        id: `conn-${Date.now()}`,
        from: h,
        to: v
      }]), console.log("[自动生成分镜表] 已创建分镜表节点，包含", f.length, "个镜头");
    }, [e, i, o]),
    u = g.useCallback(async h => {
      var N, G, z, V, O, L, D, U, H;
      const p = e.get(h);
      if (!p || p.type !== "video-analyze") return;
      i(Y => Y.map(K => K.id === h ? {
        ...K,
        isGenerating: !0,
        errorMsg: void 0,
        settings: {
          ...K.settings,
          voiceoverResults: [],
          analysisResults: []
        }
      } : K));
      const m = r(h);
      if (!m || !m.content) {
        i(Y => Y.map(K => K.id === h ? {
          ...K,
          isGenerating: !1,
          errorMsg: "请先连接一个包含视频的视频输入节点或图片输入节点"
        } : K)), alert(x("请先连接一个包含视频的视频输入节点或图片输入节点"));
        return;
      }
      const f = m.type === "input-image",
        y = (N = m.settings) == null ? void 0 : N.mediaType,
        b = y === "video" || m.type === "video-input";
      if (console.log("[视频分析] 节点信息:", {
        nodeType: m.type,
        mediaType: y,
        isVideoContent: b,
        contentPreview: (G = m.content) == null ? void 0 : G.substring(0, 50)
      }), !b && f) {
        console.warn("[视频分析] 警告：图片输入节点未正确识别为视频，mediaType:", y);
        const Y = m.content;
        if (!(Y.startsWith("data:video") || Y.includes(".mp4") || Y.includes(".webm") || Y.includes(".mov") || Y.includes("force_video_display=true"))) {
          alert(x("连接的图片输入节点不包含视频内容"));
          return;
        }
        console.log("[视频分析] 通过URL判断确认为视频");
      }
      let v = m.content;
      const {
          config: _,
          chatModelId: w,
          mergedEffort: k
        } = iln(p, t),
        A = oln(p, w),
        S = sln(p, _, w, n, A),
        C = ((_ == null ? void 0 : _.url) || "https://api.openai.com").replace(/\/+$/, "");
      if (!S) {
        alert(x("请先在 API 设置中配置 Key")), s(!0);
        return;
      }
      const I = (_ == null ? void 0 : _.modelName) || (_ == null ? void 0 : _.id) || "gemini-3-pro-preview",
        E = ow((z = p.settings) == null ? void 0 : z.videoAnalyzeGeminiApiFormat),
        M = !((V = dh(w)) != null && V.nativeChat) && Wk(w, I) && E === "gemini-official",
        T = F2(w, k ?? ((O = p.settings) == null ? void 0 : O.videoAnalyzeReasoningEffort), I);
      console.log("[视频分析] 使用的模型配置:", {
        configId: _ == null ? void 0 : _.id,
        modelName: I,
        provider: _ == null ? void 0 : _.provider,
        baseUrl: C,
        platformGroup: A,
        geminiApiFormat: E,
        useGeminiOfficial: M
      });
      const P = !!((L = p.settings) != null && L.agentUseAliyunOss),
        R = m.settings || {},
        j = (typeof m._contentAssetId == "string" ? m._contentAssetId : void 0) || (typeof R._assetId == "string" ? R._assetId : void 0) || (typeof R._contentAssetId == "string" ? R._contentAssetId : void 0);
      console.log("[视频分析] 准备发送视频URL:", {
        urlType: v.startsWith("blob:") ? "blob" : v.startsWith("http") ? "http" : v.startsWith("data:") ? "data" : "unknown",
        urlPreview: v.substring(0, 100),
        agentUseAliyunOss: P
      });
      const nativeVisualAnalysis = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(w);
      let nativeVideoFrames;
      try {
        if (nativeVisualAnalysis) nativeVideoFrames = await aiyouplusNativeVideoFrames(m);
        else v = await Qj(v, {
          useOss: P,
          apiKey: S,
          baseUrl: C,
          assetId: j
        });
      } catch (Y) {
        console.error("[视频分析] 视频上传失败或已取消公网URL输入:", Y), alert(x("视频处理失败: {0}", Y instanceof Error ? Y.message : "未知错误")), i(K => K.map(W => W.id === h ? {
          ...W,
          isGenerating: !1,
          errorMsg: `视频处理失败: ${Y instanceof Error ? Y.message : "未知错误"}`
        } : W));
        return;
      }
      const B = BS("analysis", {
          id: crypto.randomUUID(),
          label: "视频分析",
          modelName: I
        }),
        F = (U = (D = p.settings) == null ? void 0 : D.customAnalysisPrompt) == null ? void 0 : U.trim();
      try {
        const Y = `你是一位世界级的**游戏买量视频拆解专家**和**AI视觉导演**。你需要同时完成两项任务：

1. **视觉拆解**：分析视频的每一个分镜，推测其运镜手法（推拉摇移）、画面动态、人物关系。

2. **听觉提取**：提取视频中的口播文案（Voiceover）。

请按时间顺序，将视频拆解为多个关键场景，并返回如下 **JSON 格式**（不要包含Markdown代码块标记）：

{
  "voiceover_script": [
    { "time_range": "0s-3s", "text": "提取的口播文案..." }
  ],
  "scenes": [
    {
      "scene_id": 1,
      "time_range": "0s-2.5s",
      "visual_analysis": {
        "camera_movement": "详细描述运镜",
        "subject_dynamics": "描述主体动作",
        "atmosphere": "赛博朋克，冷峻，高科技感"
      },
      "prompts": {
        "jimeng_prompt": "即梦提示词",
        "mj_prompt": "Midjourney Prompt"
      }
    }
  ]
}`,
          Q = [{
            type: "text",
            text: F ? `${F}

请基于上述要求拆解该视频，并严格按JSON格式输出拆解报告。` : "请分析这段视频。请严格按JSON格式输出拆解报告。"
          }, {
            type: "image_url",
            image_url: {
              url: v
            }
          }];
        if (nativeVideoFrames) Q.splice(1, Q.length - 1, ...nativeVideoFrames.parts);
        console.log("[视频分析] 发送的视频内容:", {
          urlType: v.startsWith("blob:") ? "blob" : v.startsWith("http") ? "http" : v.startsWith("data:video") ? "data:video" : v.startsWith("data:") ? "data:image" : "unknown",
          urlLength: v.length,
          urlPreview: v.substring(0, 100),
          contentType: nativeVideoFrames ? "带时间戳的本地采样图片；不含原视频或音轨" : "legacy video URL"
        });
        const q = [{
            role: "system",
            content: nativeVideoFrames ? `你是本地视频采样帧视觉分析助手。只根据带时间戳的图片描述可见画面，不分析音轨，不编造采样之间的动作或准确镜头切点。按时间顺序返回严格JSON：{"voiceover_script":[],"scenes":[{"scene_id":1,"time_range":"0s-1s","visual_analysis":{"camera_movement":"只写图片能够支持的观察，不确定则说明","subject_dynamics":"可见画面描述","atmosphere":"可见风格"},"prompts":{"jimeng_prompt":"中文画面提示词","mj_prompt":"English visual prompt"}}]}。voiceover_script必须为空数组。` : Y
          }, {
            role: "user",
            content: Q
          }],
          ne = {
            model: I,
            messages: q,
            stream: !1,
            useGeminiOfficial: M
          };
        console.log("[视频分析] 请求payload:", {
          model: ne.model,
          messagesCount: ne.messages.length,
          userContentTypes: Q.map(ye => ye.type),
          hasVideoUrl: Q.some(ye => {
            var ie;
            return ye.type === "image_url" && ((ie = ye.image_url) == null ? void 0 : ie.url);
          }),
          baseUrl: C,
          endpoint: M ? "gemini-official generateContent" : `${C}/v1/chat/completions`
        });
        const de = new AbortController(),
          le = setTimeout(() => de.abort(), 6e5);
        let J;
        try {
          J = await lln({
            modelId: w,
            useGeminiOfficial: M,
            baseUrl: C,
            apiKey: S,
            modelName: I,
            messages: q,
            signal: de.signal,
            reasoningEffort: T
          });
        } catch (ye) {
          clearTimeout(le);
          const ie = ye;
          throw ie.name === "AbortError" ? new Error("请求超时（10分钟），视频分析可能需要更长时间，请稍后重试") : new Error(`网络请求失败: ${ie.message}`);
        } finally {
          clearTimeout(le);
        }
        if (!J.ok) {
          let ye = "";
          try {
            ye = await J.text();
          } catch {
            ye = `HTTP ${J.status}: ${J.statusText}`;
          }
          throw new Error(ye || `API Error: ${J.status}`);
        }
        const pe = await J.json();
        console.log("[视频分析] API响应:", {
          hasChoices: !!pe.choices,
          choicesLength: ((H = pe.choices) == null ? void 0 : H.length) || 0,
          hasContent: !!pe.content,
          hasData: !!pe.data,
          responseKeys: Object.keys(pe),
          responseSample: JSON.stringify(pe).substring(0, 500)
        });
        let ce = cln(pe, M);
        if (!ce || ce.trim() === "") throw console.error("[视频分析] API响应内容为空，完整响应:", JSON.stringify(pe, null, 2)), new Error("API 返回内容为空，请检查模型是否支持视频分析功能");
        console.log("[视频分析] 提取的AI内容长度:", ce.length, "前100字符:", ce.substring(0, 100));
        let we = ce.trim();
        we.startsWith("```") && (we = we.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, ""));
        const X = we.match(/\{[\s\S]*\}/);
        X && (we = X[0]);
        let Z;
        try {
          Z = JSON.parse(we);
        } catch (ye) {
          throw console.error("[视频分析] JSON解析失败，原始内容长度:", we.length), console.error("[视频分析] JSON解析错误:", ye), console.error("[视频分析] 尝试解析的内容前500字符:", we.substring(0, 500)), new Error(`解析 AI 响应失败: ${ye instanceof Error ? ye.message : "未知错误"}`);
        }
        if (!Array.isArray(Z.scenes) || !Z.scenes.length) throw new Error("视频分析未返回有效场景，未创建空结果");
        if (Z.scenes.some(scene => {
          const visual = scene && typeof scene === "object" && !Array.isArray(scene) ? scene.visual_analysis : null;
          return !visual || typeof visual !== "object" || Array.isArray(visual) || ![visual.camera_movement, visual.subject_dynamics, visual.atmosphere].some(value => typeof value === "string" && value.trim());
        })) throw new Error("视频分析包含空场景或缺少实际视觉描述，未创建结果");
        if (nativeVideoFrames && Array.isArray(Z.voiceover_script) && Z.voiceover_script.length) throw new Error("当前只提供采样图片，模型返回了未验证口播，未采纳该结果");
        const re = nativeVideoFrames ? [] : Z.voiceover_script || [],
          fe = (Z.scenes || []).map((ye, ie) => {
            const ae = ye.visual_analysis,
              be = ye.prompts,
              Ee = `${(ae == null ? void 0 : ae.camera_movement) || ""} ${(ae == null ? void 0 : ae.subject_dynamics) || ""}`.trim();
            return {
              scene_index: ye.scene_id || ie + 1,
              time_range: ye.time_range,
              keyframes: [{
                type: "current",
                time: 0,
                description: Ee,
                mj_prompt: (be == null ? void 0 : be.mj_prompt) || "",
                jimeng_prompt: (be == null ? void 0 : be.jimeng_prompt) || ""
              }],
              global_tags: {
                style: ae != null && ae.atmosphere ? [ae.atmosphere] : [],
                camera: ae != null && ae.camera_movement ? [ae.camera_movement] : [],
                color: []
              }
            };
          });
        i(ye => ye.map(ie => ie.id === h ? {
          ...ie,
          isGenerating: !1,
          analysisResults: fe,
          settings: {
            ...ie.settings,
            voiceoverResults: re,
            analysisResults: fe,
            ...(nativeVideoFrames ? { nativeAnalysisScope: nativeVideoFrames.scope } : {})
          }
        } : ie)), fe.length > 0 && setTimeout(() => {
          d(h, fe), B();
        }, 100);
      } catch (Y) {
        const K = Y;
        i(W => W.map(Q => Q.id === h ? {
          ...Q,
          isGenerating: !1,
          errorMsg: K.message
        } : Q));
      }
    }, [e, r, t, n, d, i, s]);
  return {
    handleGeneratePrompts: l,
    handleAutoVideoAnalysis: u,
    createStoryboardFromAnalysisResult: d
  };
};

function oO(e) {
  return typeof e == "string" ? e.trim() : "";
}

function C1e(e) {
  const t = oO(e);
  if (!t) return !1;
  if (Sh(t) || t.startsWith("blob:") || t.startsWith("data:video") || t.includes("force_video_display=true")) return !0;
  const n = t.toLowerCase();
  return n.includes("/videos/") || n.includes("/v1/videos/") || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(t);
}

function Pyi(e) {
  var r;
  if (String(((r = e.settings) == null ? void 0 : r.mediaType) || "").toLowerCase() === "video") return !0;
  const n = e.settings || {};
  return C1e(e.content) || C1e(n[_i]) || C1e(n._ossRemoteUrl);
}

function fcr(e) {
  return e ? e.type === "video-input" || e.type === "gen-video" ? !0 : e.type === "preview" ? !!(e.previewType === "video" || C1e(e.selectedPreviewVideo) || C1e(e.content)) : e.type === "input-image" ? Pyi(e) : !1 : !1;
}

function gcr(e) {
  if (!e) return "";
  if (e.type === "input-image") {
    const t = Vv(e);
    if (t) return t;
    const n = e.settings || {};
    return oO(e.content) || oO(n[_i]) || oO(n._ossRemoteUrl);
  }
  if (e.type === "gen-video") {
    const t = Xl(e);
    return t != null && t.url ? t.url : oO(e.content);
  }
  return e.type === "preview" && oO(e.selectedPreviewVideo) || oO(e.content);
}

function Ryi(e, t, n) {
  for (const r of t) {
    if (r.to !== e) continue;
    const a = n.get(r.from);
    if (fcr(a)) return a ?? null;
  }
  return null;
}

async function Yk(e) {
  if (!e.startsWith("blob:")) return {
    url: e,
    revoke: null
  };
  try {
    const t = await fetch(e);
    if (t.ok) {
      const n = await t.blob(),
        r = URL.createObjectURL(n);
      return {
        url: r,
        revoke: () => {
          try {
            URL.revokeObjectURL(r);
          } catch {}
        }
      };
    }
  } catch {}
  return {
    url: e,
    revoke: null
  };
}

function Gz(e, t, n) {
  const r = (n == null ? void 0 : n.preserveOriginal) ?? !0,
    a = (n == null ? void 0 : n.maxSide) ?? 1080,
    i = (n == null ? void 0 : n.quality) ?? .95,
    o = s => new Promise((l, d) => {
      let u = !1;
      const h = document.createElement("video");
      h.muted = !0, h.playsInline = !0, s && e.startsWith("http") && (h.crossOrigin = "anonymous"), h.preload = "auto";
      const p = setTimeout(() => {
          u || (u = !0, h.removeAttribute("src"), h.load(), h.remove(), d(new Error(`Extract frame timeout at ${t}s`)));
        }, 15e3),
        m = () => {
          clearTimeout(p), h.removeAttribute("src");
          try {
            h.load();
          } catch {}
          h.remove();
        },
        f = () => {
          const y = Number.isFinite(h.duration) ? h.duration : 0,
            v = y > 0 ? Math.max(.001, Math.min(t, y - .001)) : Math.max(.001, t);
          Math.abs(h.currentTime - v) < 5e-4 && (h.currentTime = Math.max(0, v - .01)), h.currentTime = v;
        };
      h.onloadedmetadata = f, h.onloadeddata = () => {
        h.currentTime === 0 && t > 0 && f();
      }, h.onseeked = () => {
        if (!u) {
          u = !0;
          try {
            const y = document.createElement("canvas"),
              b = h.videoWidth || 1,
              v = h.videoHeight || 1;
            if (r) y.width = b, y.height = v;else {
              const k = Math.max(b, v),
                A = Math.min(1, a / k);
              y.width = Math.max(1, Math.round(b * A)), y.height = Math.max(1, Math.round(v * A));
            }
            const _ = y.getContext("2d");
            if (!_) {
              m(), d(new Error("Canvas context failed"));
              return;
            }
            _.drawImage(h, 0, 0, y.width, y.height);
            const w = y.toDataURL("image/jpeg", i);
            y.width = 0, y.height = 0, m(), l(w);
          } catch (y) {
            m(), d(y);
          }
        }
      }, h.onerror = () => {
        var b;
        if (u) return;
        u = !0;
        const y = ((b = h.error) == null ? void 0 : b.message) || "Video element error";
        m(), d(new Error(y));
      }, h.src = e;
    });
  return o(!0).catch(s => {
    if (e.startsWith("http")) return o(!1);
    throw s;
  });
}

function Oot(e, t, n) {
  const r = (n == null ? void 0 : n.preserveOriginal) ?? !0,
    a = (n == null ? void 0 : n.maxSide) ?? 1080,
    i = (n == null ? void 0 : n.quality) ?? .92;
  return new Promise((o, s) => {
    const l = document.createElement("video");
    l.muted = !0, l.playsInline = !0, l.crossOrigin = e.startsWith("http") ? "anonymous" : null, l.preload = "auto", l.onloadedmetadata = () => {
      const d = Number.isFinite(l.duration) ? l.duration : 0,
        h = d > 0 ? Math.max(0, Math.min(t, d - .001)) : Math.max(0, t);
      l.currentTime = h;
    }, l.onseeked = () => {
      const d = document.createElement("canvas"),
        u = l.videoWidth || 1,
        h = l.videoHeight || 1;
      if (r) d.width = u, d.height = h;else {
        const m = Math.max(u, h),
          f = Math.min(1, a / m);
        d.width = Math.max(1, Math.round(u * f)), d.height = Math.max(1, Math.round(h * f));
      }
      const p = d.getContext("2d");
      if (!p) {
        s(new Error("Canvas context failed"));
        return;
      }
      p.drawImage(l, 0, 0, d.width, d.height), d.toBlob(m => {
        if (d.width = 0, d.height = 0, l.removeAttribute("src"), l.load(), l.remove(), !m || !m.size) {
          s(new Error("抽帧 Blob 为空"));
          return;
        }
        o(m);
      }, "image/jpeg", i);
    }, l.onerror = () => {
      var d;
      s(new Error(((d = l.error) == null ? void 0 : d.message) || "Video element error")), l.remove();
    }, l.src = e;
  });
}

async function JS(e, t, n) {
  let r;
  if (typeof e == "string" ? r = await (await fetch(e)).blob() : r = e, !(r != null && r.size)) throw new Error("抽帧结果为空");
  const {
      isGlobalOssUploadEnabled: a,
      uploadGlobalMaterialImage: i,
      buildUrlOnlyNodePatch: o
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: w,
        uploadGlobalMaterialImage: k,
        buildUrlOnlyNodePatch: A
      } = await Promise.resolve().then(() => ii);
      return {
        isGlobalOssUploadEnabled: w,
        uploadGlobalMaterialImage: k,
        buildUrlOnlyNodePatch: A
      };
    }, void 0, import.meta.url),
    {
      detectAnimatedImageBlob: s
    } = await Ie(async () => {
      const {
        detectAnimatedImageBlob: w
      } = await Promise.resolve().then(() => iCe);
      return {
        detectAnimatedImageBlob: w
      };
    }, void 0, import.meta.url),
    l = (r.type || "image/jpeg").split(";")[0].trim() || "image/jpeg";
  let d = "jpg";
  l.includes("png") ? d = "png" : l.includes("webp") ? d = "webp" : l.includes("gif") && (d = "gif");
  const u = await s(r, `frame.${d}`),
    h = u ? {
      animatedImage: !0
    } : {};
  if (a()) try {
    const w = new File([r], `video_frame_${t}_${Date.now()}.${d}`, {
        type: l
      }),
      k = await i(w),
      A = o(k, {
        mediaType: "image",
        ...h
      });
    return {
      content: String(A.content || k.displayUrl),
      settings: {
        mediaType: "image",
        ...h,
        ...(A.settings || {})
      }
    };
  } catch (w) {
    console.warn("[videoFrameExtract] 帧图上传 OSS 失败，回退本地:", w);
  }
  const m = `video_frame_${String((n == null ? void 0 : n.sourceNodeId) || "frame").replace(/[^\w.-]+/g, "_").slice(0, 48)}_${t}_${Date.now()}`,
    {
      assetStore: f
    } = await Ie(async () => {
      const {
        assetStore: w
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: w
      };
    }, void 0, import.meta.url);
  await f.init(), await f.saveBlobAsset(m, r, `file://video-frame-${t}`);
  try {
    const {
        localCacheManager: w,
        ensureCacheRootReadyForWrite: k
      } = await Ie(async () => {
        const {
          localCacheManager: S,
          ensureCacheRootReadyForWrite: C
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: S,
          ensureCacheRootReadyForWrite: C
        };
      }, void 0, import.meta.url),
      {
        isCanvasLocalCacheMode: A
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: S
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: S
        };
      }, void 0, import.meta.url);
    A() && (await k(), w.isAvailable() && (await w.saveAsset(m, r, r.type || "image/jpeg", `file://video-frame-${t}`)));
  } catch {}
  const y = await f.getAssetUrl(m);
  if (!y) throw new Error("保存帧图失败");
  const {
    contentStore: b
  } = await Ie(async () => {
    const {
      contentStore: w
    } = await Promise.resolve().then(() => Ly);
    return {
      contentStore: w
    };
  }, void 0, import.meta.url);
  let v = y;
  if (!u) try {
    v = await b.storeImageUrlAsRef(y);
  } catch {}
  if (b.isContentRef(v) && y.startsWith("blob:")) try {
    URL.revokeObjectURL(y);
  } catch {}
  const {
    patchInputImageAssetSettings: _
  } = await Ie(async () => {
    const {
      patchInputImageAssetSettings: w
    } = await Promise.resolve().then(() => o5e);
    return {
      patchInputImageAssetSettings: w
    };
  }, void 0, import.meta.url);
  return {
    content: v,
    settings: _({
      mediaType: "image",
      ...h
    }, m, b.isContentRef(v) ? void 0 : v)
  };
}

const Nyi = 16,
  dln = 48,
  jyi = 96,
  Dyi = 32;

function Bot(e, t = 10) {
  const n = String(e || "").replace(/\s+/g, "").trim();
  if (!n) return "";
  const r = Array.from(n);
  return r.length <= t ? n : `${r.slice(0, t).join("")}…`;
}

function Lyi(e) {
  return String(e || "").replace(/\s+/g, "").trim().toLowerCase();
}

function Oyi(e) {
  var i, o, s;
  const t = Bot(((i = e[0]) == null ? void 0 : i.scene) || "", 12),
    n = Bot(((o = e[0]) == null ? void 0 : o.content) || ((s = e[0]) == null ? void 0 : s.shotSize) || "", 8),
    r = e.length > 1 ? e[e.length - 1] : null,
    a = r ? Bot(r.content || r.shotSize || "", 8) : "";
  return t && n && a && a !== n ? `${t}·${n}→${a}` : t && n ? `${t}·${n}` : t || (n && a && a !== n ? `${n}→${a}` : n);
}

function Fot(e, t) {
  const n = Oyi(e),
    r = a_e(t + 1);
  return {
    index: t,
    name: n ? `分镜组${r}｜${n}` : `分镜组${r}`,
    shots: e
  };
}

function Byi(e) {
  if (!e.length) return [];
  const t = [];
  let n = [],
    r = "";
  for (const i of e) {
    const o = Lyi(i.scene);
    if (!n.length) {
      n = [i], r = o;
      continue;
    }
    if (!o || o && o === r) {
      n.push(i);
      continue;
    }
    t.push(n), n = [i], r = o;
  }
  if (n.length && t.push(n), t.length > 3 && t.every(i => i.length === 1)) {
    const i = [];
    for (let o = 0; o < e.length; o += 3) i.push(e.slice(o, o + 3));
    return i.map((o, s) => Fot(o, s));
  }
  const a = t.map((i, o) => Fot(i, o));
  if (a.length === 1 && e.length >= 4) {
    const i = zyi(e);
    if (i.length > 1) return i.map((o, s) => Fot(o, s));
  }
  return a;
}

function Fyi(e) {
  const t = `${e.scene} ${e.content} ${e.shotSize} ${e.promptZh}`;
  return /模糊|转场|虚化/.test(e.content || "") ? "cast" : /飞吻|亲吻|收尾|结束/.test(t) || /项链|耳饰|首饰|吊坠|手镯|产品特写/.test(t) || /特写/.test(e.shotSize || "") && /产品|饰|盒|袋/.test(t) ? "product" : "cast";
}

function zyi(e) {
  const t = [];
  let n = [],
    r = "";
  for (const a of e) {
    const i = Fyi(a);
    if (!n.length) {
      n = [a], r = i;
      continue;
    }
    if (i === r) {
      n.push(a);
      continue;
    }
    t.push(n), n = [a], r = i;
  }
  return n.length && t.push(n), t;
}

function Uyi(e) {
  const t = `S${a_e(e.shotNo)}`,
    n = [e.shotSize, e.camera].filter(Boolean).join("-"),
    r = (e.content || "").trim();
  return n && r ? `${t}｜${n} | ${r}` : n ? `${t}｜${n}` : r ? `${t}｜${r}` : t;
}

function $yi(e) {
  const t = `M${a_e(e.shotNo)}`,
    n = Qce(e.durationSec),
    r = [e.cameraMove, e.subjectAction].filter(Boolean).join("·");
  return r ? `${t}｜${n}·${r}` : `${t}｜${n}`;
}

function Gyi(e) {
  const t = Qce(e);
  return t === "--" ? "BGM01｜全段背景音" : `BGM01｜${t}-全段背景音`;
}

function Vyi(e, t) {
  if (!(e != null && e.length)) return "";
  let n = "",
    r = Number.POSITIVE_INFINITY;
  for (const a of e) {
    const i = String((a == null ? void 0 : a.url) || "").trim();
    if (!i) continue;
    const o = Number(a.time),
      s = Number.isFinite(o) ? Math.abs(o - t) : 999;
    s < r && (r = s, n = i);
  }
  return n;
}

function Hyi(e, t) {
  const n = Number.isFinite(e) ? e : 0,
    r = Number.isFinite(t) ? t : n;
  return Math.max(.2, Math.round((r - n) * 10) / 10);
}

function Wyi(e, t) {
  return KGn({
    startSec: e.shotTime.startSec,
    endSec: e.shotTime.endSec,
    keyframeAtSec: t == null ? void 0 : t.keyframeAtSec,
    content: (t == null ? void 0 : t.content) || e.subjectAction,
    scene: (t == null ? void 0 : t.scene) || e.intention,
    shotSize: t == null ? void 0 : t.shotSize,
    promptZh: t == null ? void 0 : t.promptZh
  });
}

function qyi(e) {
  const t = e.meta.dimsUsed,
    n = t.storyboard ? Byi(e.storyboard) : [],
    r = [];
  if (t.cameraMoves) {
    const i = e.cameraMoves.length ? e.cameraMoves : e.storyboard.map(o => ({
      shotNo: o.shotNo,
      shotTime: o.shotTime,
      cameraMove: o.camera || "固定",
      moveSpeed: "medium",
      subjectAction: o.content,
      intention: o.scene
    }));
    for (const o of i) {
      const s = Hyi(o.shotTime.startSec, o.shotTime.endSec),
        l = e.storyboard.find(d => d.shotNo === o.shotNo);
      r.push({
        shotNo: o.shotNo,
        name: $yi({
          shotNo: o.shotNo,
          durationSec: s,
          cameraMove: o.cameraMove,
          subjectAction: o.subjectAction
        }),
        startSec: o.shotTime.startSec,
        endSec: o.shotTime.endSec,
        durationSec: s,
        cameraMove: o.cameraMove,
        subjectAction: o.subjectAction,
        keyframeAtSec: Wyi(o, l)
      });
    }
  }
  let a = null;
  if (t.musicRef && e.musicRef) {
    const i = e.musicRef.overall,
      o = [i.mood, i.genre, i.bpmHint, i.instruments.join("、")].filter(Boolean).join(" · ");
    a = {
      name: Gyi(e.meta.durationSec),
      groupName: "音乐｜BGM参考·全段",
      durationSec: e.meta.durationSec,
      summary: o
    };
  }
  return {
    clusters: n,
    cameraClips: r,
    music: a
  };
}

const Kyi = [_i, "_ossRemoteUrl", "_assetId", "_contentAssetId", "_localFilePath"];

function Qyi(e, t) {
  const n = e.settings || {},
    r = {
      mediaType: "video"
    };
  for (const a of Kyi) n[a] != null && n[a] !== "" && (r[a] = n[a]);
  return {
    content: t || e.content || "",
    videoPosterUrl: e.videoPosterUrl,
    videoFileName: e.videoFileName,
    videoMeta: e.videoMeta,
    _contentAssetId: e._contentAssetId,
    settings: r
  };
}

function Yyi(e, t) {
  const n = e > 0 ? e : 720,
    r = t > 0 ? t : 1280;
  return kc(n, r);
}

function G_t(e, t, n = Dyi) {
  const r = t.filter(d => e.includes(d.id));
  if (!r.length) return {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  let a = 1 / 0,
    i = 1 / 0,
    o = -1 / 0,
    s = -1 / 0;
  for (const d of r) a = Math.min(a, d.x), i = Math.min(i, d.y), o = Math.max(o, d.x + d.width), s = Math.max(s, d.y + d.height);
  const l = 20;
  return {
    x: a - l,
    y: i - l - n,
    width: o - a + l * 2,
    height: s - i + l * 2 + n
  };
}

function zot(e, t, n, r) {
  const a = G_t(t, n);
  return {
    id: WK(),
    name: e,
    color: CQ[0],
    nodeIds: [...t],
    frameX: a.x,
    frameY: a.y,
    frameWidth: a.width,
    frameHeight: a.height,
    createdAt: r,
    updatedAt: r
  };
}

async function Xyi(e) {
  const t = Vyi(e.source.selectedKeyframes, e.timeSec);
  if (e.extractUrl) try {
    const n = await Gz(e.extractUrl, e.timeSec, {
      preserveOriginal: !1,
      maxSide: 720,
      quality: .86
    });
    return JS(n, `s${e.shotNo}`, {
      sourceNodeId: e.source.id
    });
  } catch {}
  if (t) try {
    return await JS(t, `s${e.shotNo}`, {
      sourceNodeId: e.source.id
    });
  } catch {
    return {
      content: t,
      settings: {
        mediaType: "image"
      }
    };
  }
  return e.posterUrl ? {
    content: e.posterUrl,
    settings: {
      mediaType: "image"
    }
  } : {
    content: "",
    settings: {
      mediaType: "image"
    }
  };
}

function uln(e, t, n, r) {
  return Array.from({
    length: n
  }, (a, i) => ({
    x: e + i * (r.width + Nyi),
    y: t
  }));
}

async function Jyi(e, t) {
  var o, s, l;
  const n = e.settings || {},
    r = String(n._localFilePath || n.localFilePath || e._localFilePath || "").trim();
  if (r) try {
    const {
        readFileAsBlob: d
      } = await Ie(async () => {
        const {
          readFileAsBlob: h
        } = await Promise.resolve().then(() => hg);
        return {
          readFileAsBlob: h
        };
      }, void 0, import.meta.url),
      u = await d(r);
    if (u && u.size > 0) {
      const h = (o = u.type) != null && o.startsWith("video/") ? u : new Blob([u], {
          type: "video/mp4"
        }),
        p = URL.createObjectURL(h);
      return {
        url: p,
        revoke: () => {
          try {
            URL.revokeObjectURL(p);
          } catch {}
        }
      };
    }
  } catch {}
  const a = String(e._contentAssetId || n._contentAssetId || n._assetId || n.assetId || "").trim();
  if (a) try {
    const {
      assetStore: d
    } = await Ie(async () => {
      const {
        assetStore: h
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: h
      };
    }, void 0, import.meta.url);
    await d.init();
    const u = await d.getAssetBlob(a);
    if (u && u.size > 0) {
      const h = (s = u.type) != null && s.startsWith("video/") ? u : new Blob([u], {
          type: "video/mp4"
        }),
        p = URL.createObjectURL(h);
      return {
        url: p,
        revoke: () => {
          try {
            URL.revokeObjectURL(p);
          } catch {}
        }
      };
    }
  } catch {}
  const i = t || String(e.content || "").trim() || String(n._blobUrl || "").trim();
  if (i.startsWith("blob:")) try {
    return await Yk(i);
  } catch {
    return {
      url: i,
      revoke: null
    };
  }
  if (/^https?:\/\//i.test(i)) {
    try {
      const d = new AbortController(),
        u = setTimeout(() => d.abort(), 12e3),
        h = await fetch(i, {
          signal: d.signal
        });
      if (clearTimeout(u), h.ok) {
        const p = await h.blob();
        if (p && p.size > 0) {
          const m = (l = p.type) != null && l.startsWith("video/") ? p : new Blob([p], {
              type: "video/mp4"
            }),
            f = URL.createObjectURL(m);
          return {
            url: f,
            revoke: () => {
              try {
                URL.revokeObjectURL(f);
              } catch {}
            }
          };
        }
      }
    } catch {}
    return {
      url: i,
      revoke: null
    };
  }
  return {
    url: i || null,
    revoke: null
  };
}

async function Zyi(e) {
  var b;
  const t = qyi(e.result),
    n = Date.now(),
    r = e.sourceNode.x + e.sourceNode.width + jyi;
  let a = e.sourceNode.y;
  const i = e.videoSource.videoPosterUrl,
    o = Qyi(e.videoSource, e.playUrl);
  let s = null,
    l = null;
  try {
    const v = await Jyi(e.videoSource, e.playUrl);
    s = v.url, l = v.revoke;
  } catch {
    s = e.playUrl;
  }
  const d = [],
    u = [],
    h = [],
    p = [...e.existingNodes],
    m = v => {
      u.push({
        id: e.generateId(),
        from: e.sourceNode.id,
        to: v
      });
    },
    f = new Map(),
    y = async v => {
      const _ = `${v.shotNo}:${v.keyframeAtSec}`,
        w = f.get(_);
      if (w) return w;
      const k = await Xyi({
        extractUrl: s,
        timeSec: v.keyframeAtSec,
        shotNo: v.shotNo,
        source: e.videoSource,
        posterUrl: i
      });
      return f.set(_, k), k;
    };
  try {
    const v = e.videoSource.videoMeta;
    let _ = v && Number.isFinite(v.w) && v.w > 0 && Number.isFinite(v.h) && v.h > 0 ? {
      w: v.w,
      h: v.h
    } : qce((b = e.videoSource.settings) == null ? void 0 : b.imageSize);
    if (!_ && s) try {
      const S = await KVe(s);
      S.w > 0 && S.h > 0 && (_ = S);
    } catch {}
    const w = (_ == null ? void 0 : _.w) || e.videoSource.width,
      k = (_ == null ? void 0 : _.h) || e.videoSource.height,
      A = Yyi(w, k);
    for (const S of t.clusters) {
      const C = uln(r, a, S.shots.length, A),
        I = [];
      for (let E = 0; E < S.shots.length; E++) {
        const M = S.shots[E],
          T = await y(M),
          P = e.generateId(),
          R = Ki(P, "input-image", C[E].x, C[E].y, Uyi(M), {
            ...T.settings,
            mediaType: "image",
            imageSize: T.settings.imageSize || `${w}×${k}`,
            hasCustomSize: !0,
            shotBreakdownRole: "storyboard",
            shotBreakdownSourceNodeId: e.sourceNode.id,
            shotNo: M.shotNo
          }, [...p, ...d]);
        R.content = T.content, R.prompt = M.promptZh || M.content, R.width = A.width, R.height = A.height, d.push(R), I.push(P), m(P);
      }
      if (I.length) {
        h.push(zot(S.name, I, d, n));
        const E = G_t(I, d);
        a = E.y + E.height + dln;
      }
    }
    if (t.cameraClips.length) {
      const S = uln(r, a, t.cameraClips.length, A),
        C = [];
      for (let I = 0; I < t.cameraClips.length; I++) {
        const E = t.cameraClips[I],
          M = await y({
            shotNo: E.shotNo,
            keyframeAtSec: E.keyframeAtSec
          }),
          T = e.generateId(),
          P = Ki(T, "input-image", S[I].x, S[I].y, E.name, {
            ...o.settings,
            mediaType: "video",
            imageSize: `${w}×${k}`,
            hasCustomSize: !0,
            shotBreakdownRole: "camera",
            shotBreakdownSourceNodeId: e.sourceNode.id,
            shotBreakdownClipStart: E.startSec,
            shotBreakdownClipEnd: E.endSec,
            shotNo: E.shotNo
          }, [...p, ...d]);
        P.content = o.content, P.prompt = [E.cameraMove, E.subjectAction].filter(Boolean).join(" · "), P.videoPosterUrl = M.content || o.videoPosterUrl, P.videoFileName = E.name, P.videoMeta = {
          duration: E.durationSec,
          w,
          h: k
        }, o._contentAssetId && (P._contentAssetId = o._contentAssetId), P.width = A.width, P.height = A.height, d.push(P), C.push(T), m(T);
      }
      if (C.length) {
        h.push(zot("动态｜运镜动作参考", C, d, n));
        const I = G_t(C, d);
        a = I.y + I.height + dln;
      }
    }
    if (t.music) {
      const S = {
          width: 444,
          height: 250
        },
        C = e.generateId(),
        I = e.playUrl || o.content || "",
        E = Ki(C, "input-image", r, a, t.music.name, {
          mediaType: "audio",
          hasCustomSize: !0,
          shotBreakdownRole: "music",
          shotBreakdownSourceNodeId: e.sourceNode.id,
          musicTitle: t.music.name,
          duration: t.music.durationSec,
          audioUrl: I,
          _audioUrl: I,
          ...(o.settings._blobUrl ? {
            _blobUrl: o.settings._blobUrl
          } : {}),
          ...(o.settings._assetId ? {
            _assetId: o.settings._assetId
          } : {}),
          ...(o.settings._contentAssetId ? {
            _contentAssetId: o.settings._contentAssetId
          } : {}),
          ...(o.settings._localFilePath ? {
            _localFilePath: o.settings._localFilePath
          } : {})
        }, [...p, ...d]);
      E.content = I, E.prompt = t.music.summary, E.videoPosterUrl = void 0, E.previewType = "audio", o._contentAssetId && (E._contentAssetId = o._contentAssetId), E.width = S.width, E.height = S.height, d.push(E), m(C), h.push(zot(t.music.groupName, [C], d, n));
    }
  } finally {
    try {
      l == null || l();
    } catch {}
  }
  return {
    nodes: d,
    connections: u,
    groups: h,
    outputNodeIds: d.map(v => v.id),
    outputGroupIds: h.map(v => v.id)
  };
}

function ebi(e, t) {
  var o, s;
  const n = ((o = e.settings) == null ? void 0 : o.chatModel) || ((s = e.settings) == null ? void 0 : s.model) || "gemini-3-pro",
    r = If(n),
    a = r.id;
  let i = t.find(l => l.id === a && l.type === "Chat");
  return i || (i = t.find(l => l.type === "Chat" && l.enabled !== false && l.nativeTransport === 'aiyouplus_model_generate')), i || (i = t.find(l => l.id === "gemini-3-pro" && l.type === "Chat")), i || (i = t.find(l => l.type === "Chat" && l.enabled !== false)), {
    config: i,
    chatModelId: i?.id || a,
    mergedEffort: r.effort
  };
}

function tbi(e, t) {
  var a;
  const n = String(((a = e.settings) == null ? void 0 : a.platformGroup) ?? "").trim();
  if (n) return n;
  const r = zs(t);
  return (r == null ? void 0 : r.platformGroup) || ko;
}

function nbi(e, t, n, r, a) {
  var o;
  const i = ((t == null ? void 0 : t.url) || "https://api.openai.com").replace(/\/+$/, "");
  return cu(t == null ? void 0 : t.key, r, (o = e.settings) == null ? void 0 : o.savedApiKeyId, {
    platformGroup: a,
    modelName: (t == null ? void 0 : t.modelName) || n,
    modelId: (t == null ? void 0 : t.id) || n,
    baseUrl: i,
    modelSavedApiKeyId: t == null ? void 0 : t.savedApiKeyId
  });
}

function rbi(e, t) {
  var a, i, o, s, l, d, u, h;
  if (t) return PD(e);
  const n = e;
  let r = ((o = (i = (a = n.choices) == null ? void 0 : a[0]) == null ? void 0 : i.message) == null ? void 0 : o.content) || ((u = (d = (l = (s = n.data) == null ? void 0 : s.choices) == null ? void 0 : l[0]) == null ? void 0 : d.message) == null ? void 0 : u.content) || n.content || ((h = n.data) == null ? void 0 : h.content) || "";
  return Array.isArray(r) && (r = r.map(p => p && typeof p == "object" && p.type === "text" ? p.text : typeof p == "string" ? p : "").join("")), typeof r == "string" ? r : "";
}

function tR(e, t, n) {
  const {
    settingsPatch: r,
    ...a
  } = n;
  e(i => i.map(o => o.id !== t ? o : {
    ...o,
    ...a,
    settings: r ? {
      ...o.settings,
      ...r
    } : o.settings
  }));
}

function abi(e) {
  const t = e.selectedKeyframes || [];
  if (t.length === 0) return [];
  const n = 12,
    r = t.length > n ? Math.ceil(t.length / n) : 1,
    a = t.filter((o, s) => s % r === 0).slice(0, n),
    i = [{
      type: "text",
      text: `以下是按时间顺序抽取的 ${a.length} 个关键帧，请据此逐步对齐镜头边界（时间码尽量贴近这些帧）：`
    }];
  return a.forEach((o, s) => {
    o.url && (i.push({
      type: "text",
      text: `关键帧 ${s + 1}（${o.time.toFixed(2)}s）`
    }), i.push({
      type: "image_url",
      image_url: {
        url: o.url
      }
    }));
  }), i.length > 1 ? i : [];
}

function hln(e) {
  return Array.isArray(e) ? e.filter(t => typeof t == "string" && t.length > 0) : [];
}

const ibi = ({
    nodesMap: e,
    apiConfigs: t,
    globalApiKey: n,
    getConnectedVideoInputNode: r,
    setNodes: a,
    setConnections: i,
    setGroups: o,
    generateId: s,
    deleteNodes: l,
    setSettingsOpen: d,
    notifyCanvas: u
  }) => ({
    handleShotBreakdown: g.useCallback(async p => {
      var W, Q, q, ne, de, le, J, pe, ce, we, X;
      const m = e.get(p);
      if (!m || m.type !== "shot-breakdown") return;
      const f = qGn(m.settings);
      if (!Tyt(f)) {
        tR(a, p, {
          isGenerating: !1,
          errorMsg: "请至少勾选一个拆解维度"
        });
        return;
      }
      tR(a, p, {
        isGenerating: !0,
        errorMsg: void 0,
        settingsPatch: {
          shotBreakdownProgress: .02,
          shotBreakdownStatus: "running"
        }
      });
      const y = r(p),
        b = gcr(y);
      if (!y || !b) {
        tR(a, p, {
          isGenerating: !1,
          errorMsg: "请先连接一个包含视频的视频输入节点或上传节点",
          settingsPatch: {
            shotBreakdownStatus: "failed",
            shotBreakdownProgress: 0
          }
        });
        return;
      }
      const {
          config: v,
          chatModelId: _,
          mergedEffort: w
        } = ebi(m, t),
        k = tbi(m, _),
        A = nbi(m, v, _, n, k),
        S = ((v == null ? void 0 : v.url) || "https://api.openai.com").replace(/\/+$/, "");
      if (!A) {
        tR(a, p, {
          isGenerating: !1,
          errorMsg: "请先在 API 设置中配置 Key",
          settingsPatch: {
            shotBreakdownStatus: "failed",
            shotBreakdownProgress: 0
          }
        }), d(!0);
        return;
      }
      const C = (v == null ? void 0 : v.modelName) || (v == null ? void 0 : v.id) || "gemini-3-pro-preview",
        I = ow(((W = m.settings) == null ? void 0 : W.shotBreakdownGeminiApiFormat) ?? ((Q = m.settings) == null ? void 0 : Q.videoAnalyzeGeminiApiFormat)),
        E = !((q = dh(_)) != null && q.nativeChat) && Wk(_, C) && I === "gemini-official",
        M = F2(_, w ?? ((ne = m.settings) == null ? void 0 : ne.shotBreakdownReasoningEffort) ?? ((de = m.settings) == null ? void 0 : de.videoAnalyzeReasoningEffort), C),
        T = b;
      const nativeShotAnalysis = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(_);
      if (nativeShotAnalysis && f.musicRef) {
        tR(a, p, { isGenerating: false, errorMsg: "当前原生模型只分析采样画面，不识别音轨；请取消音乐拆解维度后再开始", settingsPatch: { shotBreakdownStatus: "failed", shotBreakdownProgress: 0 } });
        return;
      }
      let P = b;
      let nativeShotFrames;
      const R = !!((le = m.settings) != null && le.agentUseAliyunOss),
        j = y.settings || {},
        B = y.type === "gen-video" ? Xl(y) : null,
        F = (B == null ? void 0 : B.assetId) || (typeof y._contentAssetId == "string" ? y._contentAssetId : void 0) || (typeof j._assetId == "string" ? j._assetId : void 0) || (typeof j._contentAssetId == "string" ? j._contentAssetId : void 0);
      try {
        if (nativeShotAnalysis) nativeShotFrames = await aiyouplusNativeVideoFrames(y);
        else P = await Qj(P, {
          useOss: R,
          apiKey: A,
          baseUrl: S,
          assetId: F
        });
      } catch (Z) {
        tR(a, p, {
          isGenerating: !1,
          errorMsg: `视频处理失败: ${Z instanceof Error ? Z.message : "未知错误"}`,
          settingsPatch: {
            shotBreakdownStatus: "failed",
            shotBreakdownProgress: 0
          }
        });
        return;
      }
      const N = y.videoFileName || y.nodeName || "video.mp4",
        G = ((J = y.videoMeta) == null ? void 0 : J.duration) || 0,
        z = (ce = (pe = m.settings) == null ? void 0 : pe.customAnalysisPrompt) == null ? void 0 : ce.trim(),
        V = nativeShotFrames ? [] : abi(y),
        O = V.length ? "请结合整段视频与上述关键帧，按动作节拍与插入特写逐步拉片（不要均分时长）。飞吻/递袋等收尾动作的 keyframeAtSec 必须落在该动作完成帧。严格输出 JSON。" : "请分析这段视频并按镜头与局部动作节拍拉片。插入特写单独成镜；若片尾是飞吻，最后一镜的代表帧必须是飞吻画面。严格按 JSON 格式输出。",
        D = [{
          type: "text",
          text: z ? `${z}

${O}` : O
        }, {
          type: "image_url",
          image_url: {
            url: P
          }
        }, ...V],
        U = [{
          role: "system",
          content: qda(f, z) + (nativeShotFrames ? "\n当前输入只有带时间戳的采样图片，不包含原视频或声音。只描述可见画面，采样之间内容与准确切点均未知，不得按示例虚构人物、飞吻、项链或音轨。musicRef必须为null。" : "")
        }, {
          role: "user",
          content: D
        }],
        H = new AbortController(),
        Y = setTimeout(() => H.abort(), 6e5),
        K = BS("agent", {
          id: crypto.randomUUID(),
          label: "拉片分析",
          modelName: C,
          signal: H.signal
        });
      try {
        tR(a, p, {
          settingsPatch: {
            shotBreakdownProgress: .2
          }
        });
        if (nativeShotFrames) D.splice(1, D.length - 1, ...nativeShotFrames.parts);
        const Z = await lln({
          modelId: _,
          useGeminiOfficial: E,
          baseUrl: S,
          apiKey: A,
          modelName: C,
          messages: U,
          signal: H.signal,
          stream: !1,
          reasoningEffort: M
        });
        if (!Z.ok) {
          let ue = "";
          try {
            ue = await Z.text();
          } catch {
            ue = `HTTP ${Z.status}: ${Z.statusText}`;
          }
          throw new Error(ue || `API Error: ${Z.status}`);
        }
        const re = await Z.json(),
          fe = rbi(re, E);
        if (!fe.trim()) throw new Error("API 返回内容为空，请检查模型是否支持视频理解");
        const ye = Kda(fe, {
            videoName: N,
            durationSec: nativeShotFrames?.scope.sourceDurationSeconds || G,
            dims: f,
            model: C
          }),
          ie = ye.storyboard.length ? "storyboard" : ye.cameraMoves.length ? "cameraMoves" : "musicRef";
        if (!ye.storyboard.length && !ye.cameraMoves.length && !ye.musicRef) throw new Error("模型未返回所选维度的有效拉片结果，未创建空结果");
        if (nativeShotFrames) ye.meta.analysisScope = nativeShotFrames.scope;
        tR(a, p, {
          settingsPatch: {
            shotBreakdownResult: ye,
            shotBreakdownStatus: "grouping",
            shotBreakdownProgress: .82,
            shotBreakdownTab: ie
          }
        });
        const ae = hln((we = m.settings) == null ? void 0 : we.shotBreakdownOutputNodeIds),
          be = hln((X = m.settings) == null ? void 0 : X.shotBreakdownOutputGroupIds);
        let Ee = "",
          xe = [],
          he = [];
        try {
          const ue = await Zyi({
            sourceNode: m,
            videoSource: y,
            playUrl: T,
            result: ye,
            generateId: s,
            existingNodes: Array.from(e.values()).filter(ge => !ae.includes(ge.id))
          });
          if (xe = ue.outputNodeIds, he = ue.outputGroupIds, ae.length) if (l) l(ae);else {
            const ge = new Set(ae);
            a(_e => _e.filter(ke => !ge.has(ke.id))), i(_e => _e.filter(ke => !ge.has(ke.from) && !ge.has(ke.to)));
          }
          if (be.length) {
            const ge = new Set(be);
            o(_e => _e.filter(ke => !ge.has(ke.id)));
          }
          ue.nodes.length && (a(ge => [...ge, ...ue.nodes]), i(ge => [...ge, ...ue.connections]), o(ge => [...ge, ...ue.groups]));
        } catch (ue) {
          Ee = ue instanceof Error ? ue.message : "自动打组失败";
        }
        tR(a, p, {
          isGenerating: !1,
          errorMsg: Ee || void 0,
          settingsPatch: {
            shotBreakdownResult: ye,
            shotBreakdownStatus: "done",
            shotBreakdownProgress: 1,
            shotBreakdownTab: ie,
            shotBreakdownOutputNodeIds: xe,
            shotBreakdownOutputGroupIds: he,
            ...(nativeShotFrames ? { nativeAnalysisScope: nativeShotFrames.scope } : {})
          }
        }), Ee ? u == null || u(`拉片完成，但自动打组失败：${Ee}`, "error") : he.length ? u == null || u(`拉片完成，已自动打成 ${he.length} 组`, "success") : u == null || u("拉片完成", "success"), Ee || K();
      } catch (Z) {
        const re = Z,
          fe = re.name === "AbortError" ? "请求超时（10分钟），拉片可能需要更长时间，请稍后重试" : re.message || "拉片失败，请重试";
        tR(a, p, {
          isGenerating: !1,
          errorMsg: fe,
          settingsPatch: {
            shotBreakdownStatus: "failed"
          }
        });
      } finally {
        clearTimeout(Y);
      }
    }, [e, t, n, r, a, i, o, s, l, d, u])
  }),
  obi = "视频生成";

function RJ(e) {
  var i, o;
  const t = ((i = e.settings) == null ? void 0 : i.text) || "",
    n = e.prompt || "",
    r = typeof e.content == "string" ? e.content : "",
    a = ((o = e.settings) == null ? void 0 : o.novelContent) || "";
  return (t || n || r || a).trim();
}

function gJe(e) {
  var t;
  return (((t = e.settings) == null ? void 0 : t.outputContent) || "").trim();
}

function Y4(e) {
  return String(e || "").trim() === obi;
}

function E1e(e, t) {
  const n = e.trim(),
    r = t.trim();
  return !!(n && r && n === r);
}

function sbi(e, t, n) {
  if (e.type !== "gen-image" && e.type !== "gen-video" && e.type !== "gen-speech" || !(t != null && t.length) || !(n != null && n.length) || !JBt(e.id, t, n)) return !1;
  const r = String(e.prompt || "").trim();
  if (!r || Y4(r)) return !0;
  const a = Fde({
    nodeId: e.id,
    connections: t,
    nodes: n
  }).trim();
  return a ? E1e(r, a) : !1;
}

function YBt(e) {
  const t = e == null ? void 0 : e.type;
  return t === "text-node" || t === "novel-input" || t === "custom-agent";
}

function XBt(e) {
  return !e || e === "default" || e === "veo_start" || e === "veo_end";
}

function lbi(e) {
  const t = new Set(),
    n = [];
  for (const r of e) {
    const a = String((r == null ? void 0 : r.id) || "").trim();
    !a || t.has(a) || (t.add(a), n.push(r));
  }
  return n;
}

function yJe(e, t, n) {
  if (!e || !(t != null && t.length) || !(n != null && n.length)) return {
    textNodes: [],
    agentNodes: []
  };
  const r = new Map(n.map(s => [s.id, s])),
    a = new Set(),
    i = [],
    o = [];
  for (const s of t) {
    if (s.to !== e || !XBt(s.inputType)) continue;
    const l = r.get(s.from);
    !l || a.has(l.id) || !YBt(l) || (a.add(l.id), l.type === "custom-agent" ? o.push(l) : i.push(l));
  }
  return {
    textNodes: i,
    agentNodes: o
  };
}

function JBt(e, t, n) {
  const {
    textNodes: r,
    agentNodes: a
  } = yJe(e, t, n);
  return r.length > 0 || a.length > 0;
}

function V_t(e) {
  const t = new Set(),
    n = [];
  for (const r of e) {
    const a = (r || "").trim();
    !a || t.has(a) || (t.add(a), n.push(a));
  }
  return n.join("");
}

function ycr(e, t, n, r) {
  if (e.type === "custom-agent") return gJe(e);
  if (e.type !== "text-node" && e.type !== "novel-input") return "";
  const a = RJ(e);
  if (r.has(e.id)) return a;
  r.add(e.id);
  const i = [],
    o = t.filter(d => d.to === e.id && XBt(d.inputType)),
    s = new Set();
  for (const d of o) {
    if (s.has(d.from)) continue;
    const u = n.get(d.from);
    if (!u || !YBt(u)) continue;
    s.add(d.from);
    const h = ycr(u, t, n, r);
    h && i.push(h);
  }
  r.delete(e.id);
  const l = V_t(i);
  return a ? !l || a === l ? a : V_t([a, l]) : l;
}

function Fde(e) {
  const {
    nodeId: t,
    connections: n,
    nodes: r,
    storyboardJsonDataRaw: a
  } = e;
  if (a != null && a.trim()) return a.trim();
  const i = new Map(r.map(d => [d.id, d])),
    o = [],
    s = new Set(),
    l = n.filter(d => d.to === t && XBt(d.inputType));
  for (const d of l) {
    if (s.has(d.from)) continue;
    const u = i.get(d.from);
    if (!u || !YBt(u)) continue;
    s.add(d.from);
    const h = ycr(u, n, i, new Set());
    h && o.push(h);
  }
  return V_t(o);
}

function zke(e, t, n) {
  const r = (e || "").trim(),
    a = (t || "").trim();
  return !n || !a ? r || a : !r || r === a || Y4(r) ? a : `${r}

${a}`;
}

const cbi = "textNodeDisplayText";

function EUe(e) {
  const t = e == null ? void 0 : e[cbi];
  return typeof t == "string" ? t : "";
}

function dbi(e) {
  const {
    isAnalyzing: t,
    streamingContent: n,
    aiGenerated: r,
    ownText: a,
    localDisplayText: i,
    upstreamText: o,
    showUpstreamPreview: s
  } = e;
  return t ? n : r ? a : o ? s ? ((i || "").trim() ? String(i) : "") || o : "" : a;
}

function Uot(e) {
  return !!e.hasUpstreamText && !e.aiGenerated && !e.showUpstreamPreview;
}

function pln(e) {
  return !!e.hasUpstreamText && !e.aiGenerated && !e.markAiGenerated;
}

const ubi = new Set(["text-node", "novel-input", "custom-agent"]);

function bcr(e, t, n) {
  for (const r of t) {
    if (r.to !== e) continue;
    const a = n.get(r.from);
    if (a && ubi.has(a.type)) return a;
  }
  return null;
}

function vcr(e, t) {
  var r;
  const n = String(((r = e.settings) == null ? void 0 : r.scriptText) || "").trim();
  return n || (t ? t.type === "custom-agent" && gJe(t) || RJ(t) : "");
}

function hbi(e, t = 72) {
  const n = e.replace(/\s+/g, " ").trim();
  return n ? n.length > t ? `${n.slice(0, t)}…` : n : "";
}

const mln = 28,
  fln = 5,
  pbi = 80,
  mbi = 36;

function fbi(e, t, n = mbi) {
  const r = t.filter(d => e.includes(d.id));
  if (!r.length) return {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  let a = 1 / 0,
    i = 1 / 0,
    o = -1 / 0,
    s = -1 / 0;
  for (const d of r) a = Math.min(a, d.x), i = Math.min(i, d.y), o = Math.max(o, d.x + d.width), s = Math.max(s, d.y + d.height);
  const l = 20;
  return {
    x: a - l,
    y: i - l - n,
    width: o - a + l * 2,
    height: s - i + l * 2 + n
  };
}

function gln(e, t, n, r) {
  const a = fbi(t, n);
  return {
    id: WK(),
    name: e,
    color: CQ[6] || "#3b82f6",
    nodeIds: [...t],
    frameX: a.x,
    frameY: a.y,
    frameWidth: a.width,
    frameHeight: a.height,
    createdAt: r,
    updatedAt: r
  };
}

function gbi(e) {
  return {
    x: e.x + e.width + pbi,
    y: e.y
  };
}

function yln(e, t, n) {
  const r = t % fln,
    a = Math.floor(t / fln);
  return {
    x: e.x + r * (n.width + mln),
    y: e.y + a * (n.height + mln)
  };
}

function ybi(e, t) {
  return lP(String(e.prompt || "").trim() || FCe(e, t), t);
}

function bbi(e, t, n) {
  const r = new Set(n.map(d => d.id)),
    a = uj(t),
    i = cJe(e, t),
    o = [...i.characters, ...i.scenes, ...i.props],
    s = new Set(),
    l = [];
  for (const d of o) {
    const u = a.find(h => h.key === d || h.name === d);
    !(u != null && u.nodeId) || !r.has(u.nodeId) || s.has(u.nodeId) || (s.add(u.nodeId), l.push(u));
  }
  return l;
}

function vbi(e, t) {
  return t.find(n => {
    var r, a;
    return n.type === "gen-image" && ((r = n.settings) == null ? void 0 : r.scriptParseGridKind) === "image" && Number((a = n.settings) == null ? void 0 : a.scriptParseShotNo) === e.shotNo;
  });
}

function wbi(e) {
  return e === "character" ? "character" : e === "scene" ? "scene" : "supplementary";
}

function xbi(e) {
  var r, a, i;
  if (!e) return "";
  const t = typeof e.content == "string" ? e.content.trim() : "";
  if (t) return t;
  const n = (r = e.settings) == null ? void 0 : r.generatedImages;
  return String(((a = n == null ? void 0 : n[0]) == null ? void 0 : a.fullUrl) || ((i = n == null ? void 0 : n[0]) == null ? void 0 : i.url) || "").trim();
}

function _bi(e) {
  const {
      sourceNode: t,
      result: n,
      mode: r,
      generateId: a,
      existingNodes: i,
      assetKey: o
    } = e,
    s = typeof o == "string" && o.trim() ? o.trim() : void 0,
    l = gbi(t),
    d = Date.now(),
    u = [],
    h = [],
    p = [],
    m = [],
    f = {
      nodes: u,
      connections: h,
      groups: [],
      outputNodeIds: p,
      outputGroupIds: [],
      assetKeys: m
    };
  if (r === "assets") {
    if ([...n.assets.characters, ...n.assets.scenes, ...n.assets.props].filter(S => !s || S.key === s).forEach((S, C) => {
      const I = a(),
        E = Ki(I, "gen-image", l.x, l.y, `${S.role === "character" ? "角色" : S.role === "scene" ? "场景" : "道具"}｜${S.name}`, void 0, [...i, ...u]),
        M = yln(l, C, E);
      E.x = M.x, E.y = M.y, E.prompt = ybi(S, n.globalStyle), E.settings = {
        ...E.settings,
        prompt: E.prompt,
        ratio: "2:1"
      }, u.push(E), p.push(I), m.push(S.key), h.push({
        id: a(),
        from: t.id,
        to: I
      });
    }), s) return {
      ...f,
      nodes: u,
      connections: h,
      outputNodeIds: p,
      assetKeys: m
    };
    const A = gln(`资产｜${n.scriptTitle || t.nodeName || "脚本解析"}`, p, u, d);
    return {
      nodes: u,
      connections: h,
      groups: p.length ? [A] : [],
      outputNodeIds: p,
      outputGroupIds: p.length ? [A.id] : [],
      assetKeys: m
    };
  }
  const y = r === "video" ? "gen-video" : "gen-image";
  n.rows.filter(k => r === "video" ? k.prompt.videoMotionPrompt.trim() : k.prompt.imagePrompt.trim()).forEach((k, A) => {
    const S = a(),
      C = `S${String(k.shotNo).padStart(2, "0")}｜${k.shotSize || "镜头"}｜${(k.scene || "分镜").slice(0, 12)}`,
      I = Ki(S, y, l.x, l.y, C, void 0, [...i, ...u]),
      E = yln(l, A, I);
    I.x = E.x, I.y = E.y;
    const M = r === "video" ? k.prompt.videoMotionPrompt : k.prompt.imagePrompt,
      T = bbi(k, n, i),
      P = r === "video" ? vbi(k, i) : void 0,
      R = P ? [...T, {
        key: P.id,
        role: "scene",
        name: P.nodeName || "分镜图",
        desc: "",
        nodeId: P.id,
        imageUrl: xbi(P)
      }] : T,
      j = lP(pui(M, n, R), n.globalStyle),
      B = R.map(F => String(F.imageUrl || "").trim()).filter(Boolean);
    I.prompt = j, I.settings = {
      ...I.settings,
      prompt: j,
      scriptParseGridKind: r,
      scriptParseShotNo: k.shotNo,
      referenceImages: B,
      inputImageOrder: B,
      ...(r === "video" ? {
        duration: `${Math.max(4, Math.round(k.durationSec))}s`
      } : {})
    }, u.push(I), p.push(S);
    for (const F of T) h.push({
      id: a(),
      from: F.nodeId,
      to: S,
      referenceRole: wbi(F.role)
    });
    P && h.push({
      id: a(),
      from: P.id,
      to: S,
      referenceRole: "primary"
    });
  });
  const v = n.scriptTitle || t.nodeName || "脚本解析",
    _ = r === "video" ? `分镜视频组·${v}` : `分镜图·${v}`,
    w = gln(_, p, u, d);
  return {
    nodes: u,
    connections: h,
    groups: p.length ? [w] : [],
    outputNodeIds: p,
    outputGroupIds: p.length ? [w.id] : [],
    assetKeys: m
  };
}

function kbi(e, t) {
  var o, s;
  const n = ((o = e.settings) == null ? void 0 : o.chatModel) || ((s = e.settings) == null ? void 0 : s.model) || "gemini-3-pro",
    r = If(n),
    a = r.id;
  let i = t.find(l => l.id === a && l.type === "Chat");
  return i || (i = t.find(l => l.type === "Chat" && l.enabled !== false && l.nativeTransport === 'aiyouplus_model_generate')), i || (i = t.find(l => l.id === "gemini-3-pro" && l.type === "Chat")), i || (i = t.find(l => l.type === "Chat" && l.enabled !== false)), {
    config: i,
    chatModelId: i?.id || a,
    mergedEffort: r.effort
  };
}

function Abi(e, t) {
  var r, a;
  const n = String(((r = e.settings) == null ? void 0 : r.platformGroup) ?? "").trim();
  return n || ((a = zs(t)) == null ? void 0 : a.platformGroup) || ko;
}

function Sbi(e, t, n, r, a) {
  var o;
  const i = ((t == null ? void 0 : t.url) || "https://api.openai.com").replace(/\/+$/, "");
  return cu(t == null ? void 0 : t.key, r, (o = e.settings) == null ? void 0 : o.savedApiKeyId, {
    platformGroup: a,
    modelName: (t == null ? void 0 : t.modelName) || n,
    modelId: (t == null ? void 0 : t.id) || n,
    baseUrl: i,
    modelSavedApiKeyId: t == null ? void 0 : t.savedApiKeyId
  });
}

function Ibi(e, t) {
  var a, i, o, s, l, d, u, h;
  if (t) return PD(e);
  const n = e;
  let r = ((o = (i = (a = n.choices) == null ? void 0 : a[0]) == null ? void 0 : i.message) == null ? void 0 : o.content) || ((u = (d = (l = (s = n.data) == null ? void 0 : s.choices) == null ? void 0 : l[0]) == null ? void 0 : d.message) == null ? void 0 : u.content) || n.content || ((h = n.data) == null ? void 0 : h.content) || "";
  return Array.isArray(r) && (r = r.map(p => p && typeof p == "object" && p.type === "text" ? p.text : typeof p == "string" ? p : "").join("")), typeof r == "string" ? r : "";
}

function nR(e, t, n) {
  const {
    settingsPatch: r,
    ...a
  } = n;
  e(i => i.map(o => o.id !== t ? o : {
    ...o,
    ...a,
    settings: r ? {
      ...o.settings,
      ...r
    } : o.settings
  }));
}

function bln(e) {
  return Array.isArray(e) ? e.filter(t => typeof t == "string" && t.length > 0) : [];
}

const Cbi = ({
  nodesMap: e,
  connections: t,
  apiConfigs: n,
  globalApiKey: r,
  setNodes: a,
  setConnections: i,
  setGroups: o,
  generateId: s,
  deleteNodes: l,
  setSettingsOpen: d,
  notifyCanvas: u
}) => {
  const h = g.useCallback(async (y, b, v) => {
      var B, F, N;
      const {
          config: _,
          chatModelId: w,
          mergedEffort: k
        } = kbi(y, n),
        A = Abi(y, w),
        S = Sbi(y, _, w, r, A),
        C = ((_ == null ? void 0 : _.url) || "https://api.openai.com").replace(/\/+$/, "");
      if (!S && !Hk(_, C)) throw d(!0), new Error("请先在 API 设置中配置 Key");
      const I = (_ == null ? void 0 : _.modelName) || (_ == null ? void 0 : _.id) || "gemini-3-pro-preview",
        E = ow((B = y.settings) == null ? void 0 : B.scriptParseGeminiApiFormat),
        M = !((F = dh(w)) != null && F.nativeChat) && Wk(w, I) && E === "gemini-official",
        T = F2(w, k ?? ((N = y.settings) == null ? void 0 : N.scriptParseReasoningEffort), I),
        P = [{
          role: "system",
          content: b
        }, {
          role: "user",
          content: v
        }],
        R = new AbortController(),
        j = setTimeout(() => R.abort(), 18e4);
      try {
        const G = await mx({
          modelId: w,
          format: M ? "gemini-official" : "openai",
          baseUrl: C,
          apiKey: S,
          modelName: I,
          messages: P,
          signal: R.signal,
          stream: !1,
          reasoningEffort: T,
          maxTokens: 16e3
        });
        if (!G.ok) {
          let O = "";
          try {
            O = await G.text();
          } catch {
            O = `HTTP ${G.status}`;
          }
          throw new Error(O || `API Error: ${G.status}`);
        }
        const z = await G.json(),
          V = Ibi(z, M);
        if (!V.trim()) throw new Error("API 返回内容为空");
        return {
          aiContent: V,
          modelName: I
        };
      } finally {
        clearTimeout(j);
      }
    }, [n, r, d]),
    p = g.useCallback(async y => {
      var w;
      const b = e.get(y);
      if (!b || b.type !== "script-parse") return;
      const v = bcr(y, t, e),
        _ = vcr(b, v);
      if (!_.trim()) {
        nR(a, y, {
          isGenerating: !1,
          errorMsg: "请先连接文本节点或粘贴剧本",
          settingsPatch: {
            scriptParseStatus: "failed"
          }
        });
        return;
      }
      nR(a, y, {
        isGenerating: !0,
        errorMsg: void 0,
        settingsPatch: {
          scriptParseStatus: "running",
          scriptParseProgress: .08
        }
      });
      try {
        const k = Bsr(b.settings),
          A = String(((w = b.settings) == null ? void 0 : w.customAnalysisPrompt) || "").trim(),
          S = X7e(b.settings),
          {
            aiContent: C,
            modelName: I
          } = await h(b, Eui(k, A, S), _),
          E = yui(C, {
            model: I,
            shotCount: k,
            constraints: S
          });
        nR(a, y, {
          isGenerating: !1,
          nodeName: E.scriptTitle || b.nodeName,
          settingsPatch: {
            scriptParseResult: E,
            scriptParseStatus: "done",
            scriptParseProgress: 1,
            scriptParseStage: "confirm"
          }
        }), u == null || u(`已拆解 ${E.rows.length} 个镜头`, "success");
      } catch (k) {
        const A = k,
          S = A.name === "AbortError" ? "请求超时，请稍后重试" : A.message || "脚本解析失败，请重试";
        nR(a, y, {
          isGenerating: !1,
          errorMsg: S,
          settingsPatch: {
            scriptParseStatus: "failed"
          }
        }), u == null || u(S, "error");
      }
    }, [t, e, u, h, a]),
    m = g.useCallback(async (y, b, v) => {
      const _ = e.get(y);
      if (!_ || _.type !== "script-parse") return;
      const w = hUe(_.settings);
      if (!w || w.rows.length === 0) {
        u == null || u("请先解析脚本", "error");
        return;
      }
      if (b === "concat") {
        const A = X7e(_.settings),
          S = xui(w, v, A);
        nR(a, y, {
          settingsPatch: {
            scriptParseResult: S,
            scriptParseStage: "prompts"
          }
        }), u == null || u(v != null ? `已本地拼接第 ${v} 镜` : `已本地拼接 ${v1e(S)} 条提示词`, "success");
        return;
      }
      const k = _ui(w, v);
      nR(a, y, {
        isGenerating: !0,
        errorMsg: void 0,
        settingsPatch: {
          scriptParseResult: k,
          scriptParseStatus: "running",
          scriptParseStage: "prompts"
        }
      });
      try {
        const A = X7e(_.settings),
          {
            aiContent: S
          } = await h(_, Tui(k, v, A), v != null ? `请为第 ${v} 镜合成双轨提示词。` : "请为全部镜头合成双轨提示词。"),
          C = kui(k, Aui(S), v, A);
        nR(a, y, {
          isGenerating: !1,
          settingsPatch: {
            scriptParseResult: C,
            scriptParseStatus: "done",
            scriptParseStage: "prompts"
          }
        }), u == null || u(v != null ? `已智能合成第 ${v} 镜` : `已智能合成 ${v1e(C)} 条提示词`, "success");
      } catch (A) {
        const S = A,
          C = S.name === "AbortError" ? "请求超时，请稍后重试" : S.message || "提示词合成失败";
        nR(a, y, {
          isGenerating: !1,
          errorMsg: C,
          settingsPatch: {
            scriptParseStatus: "failed"
          }
        }), u == null || u(C, "error");
      }
    }, [e, u, h, a]),
    f = g.useCallback((y, b, v) => {
      var B, F, N, G, z, V;
      const _ = e.get(y);
      if (!_ || _.type !== "script-parse") return;
      const w = hUe(_.settings),
        k = typeof v == "string" && v.trim() ? v.trim() : void 0;
      if (!w) {
        u == null || u("请先解析脚本", "error");
        return;
      }
      if (b !== "assets" && v1e(w) === 0) {
        u == null || u(b === "video" ? "请先合成提示词后再创建视频生成器组" : "请先合成提示词后再创建分镜图生成器组", "error");
        return;
      }
      if (b === "video") {
        const O = Osr(w);
        if (O.characters + O.scenes + O.props > 0) {
          u == null || u("请先生成所有资产图后再创建视频生成器组", "error");
          return;
        }
      }
      if (b === "assets") {
        if (w.assets.characters.length + w.assets.scenes.length + w.assets.props.length === 0) {
          u == null || u("没有可生成的资产", "error");
          return;
        }
        if (k) {
          const L = [...w.assets.characters, ...w.assets.scenes, ...w.assets.props].find(D => D.key === k);
          if (L != null && L.nodeId && e.has(L.nodeId)) {
            const D = lP(String(L.prompt || "").trim(), w.globalStyle);
            a(U => U.map(H => H.id === L.nodeId ? {
              ...H,
              prompt: D,
              settings: {
                ...H.settings,
                prompt: D
              }
            } : H)), u == null || u("已更新资产节点提示词，可在画布生成", "success");
            return;
          }
        }
      }
      const A = bln(b === "image" ? (B = _.settings) == null ? void 0 : B.scriptParseImageGridNodeIds : b === "video" ? (F = _.settings) == null ? void 0 : F.scriptParseVideoGridNodeIds : (N = _.settings) == null ? void 0 : N.scriptParseAssetGridNodeIds),
        S = bln(b === "image" ? (G = _.settings) == null ? void 0 : G.scriptParseImageGridGroupIds : b === "video" ? (z = _.settings) == null ? void 0 : z.scriptParseVideoGridGroupIds : (V = _.settings) == null ? void 0 : V.scriptParseAssetGridGroupIds),
        C = !(b === "assets" && k),
        I = _bi({
          sourceNode: _,
          result: w,
          mode: b,
          generateId: s,
          existingNodes: Array.from(e.values()).filter(O => !C || !A.includes(O.id)),
          assetKey: b === "assets" ? k : void 0
        });
      if (!I.nodes.length) {
        u == null || u("没有可创建的格子", "error");
        return;
      }
      if (C && A.length) if (l) l(A);else {
        const O = new Set(A);
        a(L => L.filter(D => !O.has(D.id))), i(L => L.filter(D => !O.has(D.from) && !O.has(D.to)));
      }
      if (C && S.length) {
        const O = new Set(S);
        o(L => L.filter(D => !O.has(D.id)));
      }
      a(O => [...O, ...I.nodes]), i(O => [...O, ...I.connections]), I.groups.length && o(O => [...O, ...I.groups]);
      const E = b === "image" ? "scriptParseImageGridNodeIds" : b === "video" ? "scriptParseVideoGridNodeIds" : "scriptParseAssetGridNodeIds",
        M = b === "image" ? "scriptParseImageGridGroupIds" : b === "video" ? "scriptParseVideoGridGroupIds" : "scriptParseAssetGridGroupIds",
        T = C ? I.outputNodeIds : [...A, ...I.outputNodeIds],
        P = C ? I.outputGroupIds : S,
        R = b === "assets" ? wui(w, I.assetKeys.map((O, L) => ({
          key: O,
          nodeId: I.outputNodeIds[L]
        }))) : w;
      nR(a, y, {
        settingsPatch: {
          [E]: T,
          [M]: P,
          ...(b === "assets" ? {
            scriptParseResult: R
          } : {})
        }
      });
      const j = b === "image" ? "分镜图格子" : b === "video" ? "视频格子" : "资产格子";
      u == null || u(b === "assets" ? `已创建 ${I.nodes.length} 个${j}，请在格子上点生成` : `已创建 ${I.nodes.length} 个${j}并连上参考，请在格子上点生成`, "success");
    }, [l, s, e, u, i, o, a]);
  return {
    handleScriptParse: p,
    handleScriptParseCompose: m,
    handleScriptParseCreateGrid: f
  };
};

function Ebi(e, t, n) {
  const r = [...e, ...t.map((a, i) => ({
    ...a,
    scene_index: e.length + i + 1
  }))];
  return {
    shots: r,
    jsonData: JSON.stringify({
      layout_specification: `${n.rows}x${n.cols}`,
      total_shots: r.length,
      shots: r.map((a, i) => ({
        shot_number: i + 1,
        shot_size: a.shot_size || "?? (Medium Shot)",
        description_zh: a.description_zh || a.description || "",
        description_en: a.description_en || a.description || "",
        prompt: a.prompt || "",
        image_url: a.image_url || "",
        model: a.model || "sora-2",
        ratio: a.ratio || "16:9",
        duration: a.duration || "15s",
        resolution: a.resolution || "1080P"
      }))
    }, null, 2)
  };
}

function Tbi(e, t, n, r, a = () => {}) {
  if (!n()) return !1;
  const i = o => {
    if (!n()) return o;
    const s = o.findIndex(u => u.id === t.id && u.type === "storyboard-node" && u.content === t.content);
    if (s < 0) return o;
    const l = o.slice(),
      d = o[s];
    return l[s] = {
      ...d,
      settings: {
        ...d.settings,
        ...r(d)
      }
    }, l;
  };
  return VD(e, o => ({
    nodes: i(o),
    result: void 0
  }), a) ? !0 : (e(i), !1);
}

const wcr = 256 * 1024;

let OL = null,
  $ot = !1,
  Mbi = 0;

const T1e = new Map();

function Pbi() {
  if (OL || $ot) return OL;
  try {
    const e = `
            self.onmessage = function (e) {
                var id = e.data.id;
                try {
                    var result = JSON.stringify(e.data.value);
                    self.postMessage({ id: id, ok: true, result: result });
                } catch (err) {
                    self.postMessage({ id: id, ok: false, error: String((err && err.message) || err) });
                }
            };
        `,
      t = new Blob([e], {
        type: "application/javascript"
      }),
      n = URL.createObjectURL(t);
    OL = new Worker(n), OL.onmessage = r => {
      const {
          id: a,
          ok: i,
          result: o,
          error: s
        } = r.data,
        l = T1e.get(a);
      l && (T1e.delete(a), i && o !== void 0 ? l.resolve(o) : l.reject(new Error(s || "JSON.stringify worker failed")));
    }, OL.onerror = () => {
      $ot = !0, OL = null, T1e.clear();
    };
  } catch {
    $ot = !0, OL = null;
  }
  return OL;
}

function Rbi(e) {
  let t = 0;
  const n = r => {
    if (!(t > wcr)) {
      if (typeof r == "string") t += r.length;else if (Array.isArray(r)) for (let a = 0; a < r.length; a++) n(r[a]);else if (r && typeof r == "object") for (const a in r) n(r[a]);
    }
  };
  return n(e), t;
}

function Pg(e) {
  if (Rbi(e) < wcr) return JSON.stringify(e);
  const t = Pbi();
  if (!t) return JSON.stringify(e);
  const n = ++Mbi;
  return new Promise((r, a) => {
    T1e.set(n, {
      resolve: r,
      reject: a
    });
    try {
      t.postMessage({
        id: n,
        value: e
      });
    } catch {
      T1e.delete(n);
      try {
        r(JSON.stringify(e));
      } catch (i) {
        a(i);
      }
    }
  });
}

const Nbi = new Set(["queued", "running", "pending", "processing", "submitted", "in_progress", "working", "prepare", "preparing", "creating", "not_start"]),
  vln = new Set(["succeeded", "success", "successful", "completed", "complete", "finished", "succeed", "done", "ok"]),
  jbi = new Set(["failed", "failure", "error", "cancelled", "canceled"]),
  Dbi = 10;

function TA(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : null;
}

function wln(...e) {
  for (const t of e) if (typeof t == "string" && (t.startsWith("http://") || t.startsWith("https://"))) return t;
}

function ioe(e, t = 0) {
  if (!(t > Dbi) && e != null) {
    if (typeof e == "string") {
      const n = e.trim();
      return n.startsWith("http://") || n.startsWith("https://") ? n : void 0;
    }
    if (Array.isArray(e)) {
      for (const n of e) {
        const r = ioe(n, t + 1);
        if (r) return r;
      }
      return;
    }
    if (typeof e == "object") {
      const n = e,
        r = ["video_url", "url", "output_url", "download_url", "file_url", "play_url", "mp4", "src", "video", "output", "file", "result"];
      for (const a of r) if (a in n && n[a] !== void 0) {
        const i = ioe(n[a], t + 1);
        if (i) return i;
      }
      for (const a of Object.values(n)) {
        const i = ioe(a, t + 1);
        if (i) return i;
      }
    }
  }
}

function Lbi(...e) {
  for (const t of e) {
    if (t == null) continue;
    const n = String(t).trim();
    if (n !== "") return n.toLowerCase();
  }
  return "";
}

function Obi(...e) {
  for (const t of e) {
    if (t == null) continue;
    if (typeof t == "number" && !Number.isNaN(t)) {
      if (t >= 0 && t <= 1) return Math.round(t * 100);
      if (t >= 0 && t <= 100) return Math.round(t);
    }
    const n = String(t).trim().replace(/%$/u, ""),
      r = parseFloat(n);
    if (!Number.isNaN(r)) return r >= 0 && r <= 1 ? Math.round(r * 100) : Math.min(100, Math.round(r));
  }
}

const Bbi = "接口标记成功但未返回可播放的视频链接（output 等字段无有效 URL）。请重试或联系 API 服务商。";

function ZBt(e) {
  const t = TA(e) ?? {},
    n = TA(t.data),
    r = n && (n.status !== void 0 || n.content !== void 0 || n.id !== void 0 || n.output !== void 0 || n.task_id !== void 0 || n.video_url !== void 0 || n.progress !== void 0) ? n : t,
    a = Lbi(r.status, t.status, n == null ? void 0 : n.status, r.task_status, t.task_status, r.state, t.state),
    i = TA(r.content) ?? TA(t.content) ?? TA(n == null ? void 0 : n.content),
    o = typeof r.output == "object" && r.output !== null ? TA(r.output) : typeof t.output == "object" && t.output !== null ? TA(t.output) : typeof (n == null ? void 0 : n.output) == "object" && (n == null ? void 0 : n.output) !== null ? TA(n.output) : null;
  let s = wln(i == null ? void 0 : i.video_url, i == null ? void 0 : i.video, r.video_url, t.video_url, n == null ? void 0 : n.video_url, r.download_url, t.download_url, n == null ? void 0 : n.download_url, r.file_url, n == null ? void 0 : n.file_url, r.play_url, o == null ? void 0 : o.url, o == null ? void 0 : o.video_url, o == null ? void 0 : o.download_url, typeof r.output == "string" ? r.output : void 0, typeof t.output == "string" ? t.output : void 0, typeof (n == null ? void 0 : n.output) == "string" ? n.output : void 0, r.result, t.result);
  if (!s) {
    const h = TA(r.result) ?? TA(t.result) ?? TA(n == null ? void 0 : n.result);
    s = wln(h == null ? void 0 : h.video_url, h == null ? void 0 : h.url, h == null ? void 0 : h.output, h == null ? void 0 : h.download_url);
  }
  s || (s = ioe(r) ?? ioe(n) ?? ioe(t));
  const l = TA(r.error) ?? TA(t.error),
    d = [r.fail_reason, t.fail_reason, n == null ? void 0 : n.fail_reason, l == null ? void 0 : l.message, r.message, t.message].map(h => typeof h == "string" && h.trim() ? h.trim() : "").find(Boolean) || void 0;
  if (jbi.has(a)) return {
    terminal: "failed",
    videoUrl: s,
    errorMsg: d || "生成失败"
  };
  if (s) return vln.has(a) || a === "" ? {
    terminal: "success",
    videoUrl: s
  } : Nbi.has(a) ? {
    terminal: "running"
  } : {
    terminal: "success",
    videoUrl: s
  };
  const u = Obi(r.progress, t.progress, n == null ? void 0 : n.progress, r.percent);
  return vln.has(a) ? u !== void 0 && u < 98 ? {
    terminal: "running"
  } : {
    terminal: "failed",
    errorMsg: d || Bbi
  } : {
    terminal: "running"
  };
}

const Fbi = ["model", "ratio", "duration", "resolution", "seedanceVolcGenerateAudio", "seedanceGenerateAudio", "seedanceOutputFormat", "seedanceBitrateMode", "seedanceVolcIsUploadAsset", "seedanceVolcNsfw", "seedanceVolcMcpWebSearch", "seedanceVolcCameraFixed", "enableFrames", "enableHD", "veoFramesMode", "huyaWanAudio", "promptExtend", "promptExpansionMode", "h3MaxFalTurbo", "h3MaxFalDirector", "h3MaxFalCameraControls", "h3MaxFalCameraTrajectory", "h3MaxFalLipSync", "h3MaxFalLipSyncTranscription", "huyaWanWatermark", "wan30Prime", "enableThinking", "wan26AudioConfig", "wan26MultiShot", "klingSubjects", "klingVideos", "klingImages"];

function zbi(e) {
  if (!e) return {};
  const t = {};
  for (const n of Fbi) e[n] !== void 0 && (t[n] = e[n]);
  return t;
}

const xln = 12,
  Ubi = 64;

function zde(e) {
  let t = e.trim();
  if (!t) return "";
  const n = [/^Here is the prompt:?\s*/i, /^好的[，,]?这是提示词[：:]\s*/i, /^以下是提示词[：:]\s*/i, /^Prompt[：:]\s*/i];
  for (const r of n) t = t.replace(r, "");
  return t = t.replace(/```[\s\S]*?```/g, ""), t = t.replace(/`([^`]+)`/g, "$1"), t = t.replace(/^#{1,6}\s*/gm, ""), t = t.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1"), t = t.replace(/\*{1,3}/g, ""), t = t.replace(/[【】]/g, ""), t = t.replace(/^\[([^\]]*)\]\s*$/gm, "$1"), t = t.replace(/^-{2,}\s*$/gm, ""), t = t.replace(/\?\?/g, ""), t = t.replace(/\r\n/g, `
`), t = t.replace(/[ \t]+/g, " "), t = t.replace(/ *\n */g, `
`), t = t.replace(/\n{3,}/g, `

`), t = t.trim(), t || e.trim();
}

function eFt(e) {
  const t = String(e.title || e.name || e.图名 || e.shot_title || "").trim();
  let n = String(e.画面构思 || e.visual_concept || e.composition || e.构图 || e.构图描述 || "").trim();
  const r = String(e.description_zh || e.description || "").trim();
  let a = String(e.中文提示词 || e.prompt_zh || e.prompt || "").trim();
  const i = String(e.英文提示词 || e.prompt_en || e.description_en || "").trim(),
    o = String(e.content || e.text || "").trim();
  !n && r && a || !n && r && !a ? n = r : (!a && r && n && r !== n || !n && !a && r) && (a = r);
  const s = [];
  return t && s.push(t), n && s.push(n.startsWith("画面构思") ? n : `画面构思：${n}`), a && a !== n && s.push(a.startsWith("中文提示词") ? a : `中文提示词：${a}`), i && s.push(i.startsWith("英文提示词") ? i : `英文提示词：${i}`), s.length === 0 && o && s.push(o), zde(s.join(`
`));
}

function xcr(e) {
  const t = e.trim();
  if (!t) return null;
  const n = t.replace(/^```(?:json)?\s*|\s*```$/gi, "").trim(),
    r = [n],
    a = n.match(/\{[\s\S]*\}/);
  a && r.push(a[0]);
  const i = n.match(/\[[\s\S]*\]/);
  i && r.push(i[0]);
  for (const o of r) try {
    const s = JSON.parse(o);
    if (Array.isArray(s)) {
      const l = s.map(d => typeof d == "string" ? zde(d) : d && typeof d == "object" ? eFt(d) : "").filter(Boolean);
      if (l.length > 0) return {
        kind: "prompt_array",
        prompts: l
      };
    }
    if (s && typeof s == "object") {
      const l = s;
      if (Array.isArray(l.shots) && l.shots.length > 0) return {
        kind: "json",
        data: l
      };
      const d = l.prompts;
      if (Array.isArray(d) && d.length > 0) {
        const u = d.map(h => typeof h == "string" ? zde(h) : "").filter(Boolean);
        if (u.length > 0) return {
          kind: "prompt_array",
          prompts: u
        };
      }
    }
  } catch {}
  return null;
}

function $bi(e) {
  return `你是一个分镜图表分段助手。用户会提供中文或英文策划文档，通常按「图1」「图2」「Shot 1」等分块。每一块往往包含多段信息，例如：
- 图名/标题（如「图2：生活场景带入图」）
- 画面构思 / 构图描述 / Visual Concept
- 中文提示词 / Prompt
- 英文提示词（如有）

你的任务：
1. 按图1、图2…或 Shot 1、Shot 2…的阅读顺序，将每一张图/每一个分镜的【完整内容】分为一段
2. 每段必须合并该图块内的全部有用信息：画面构思 + 中文提示词 + 英文提示词等，严禁只提取提示词而丢掉画面构思
3. 去掉 Markdown 装饰符号（#、*、【】、行首 --、###、??），但保留「画面构思」「中文提示词」「英文提示词」等字段名
4. 可保留简短图名标题（如「图2：生活场景带入图」）作为该段第一行
5. 每段内部用换行分隔各子项，格式示例：
图2：生活场景带入图
画面构思：中景镜头，温馨的客厅场景...
中文提示词：Medium shot, warm living room scene... --ar 3:4
6. 若某块只有画面构思或只有提示词，也要完整保留；若无图号则按自然段落分段
7. 最多输出 ${e} 段；不足则返回实际数量，超出则只保留前 ${e} 段

你必须且仅返回一个 JSON 数组，每个元素是一个字符串（该图的完整合并文本，含画面构思与提示词）。不要返回 markdown 代码块或其他说明文字。`;
}

function Gbi(e) {
  const n = e.replace(/^```(?:json)?\s*|\s*```$/gi, "").trim().match(/\[[\s\S]*\]/);
  if (!n) throw new Error("模型未返回有效的 JSON 数组");
  const r = JSON.parse(n[0]);
  if (!Array.isArray(r)) throw new Error("模型返回格式无效，需要 JSON 数组");
  const a = r.map(i => typeof i == "string" ? zde(i) : i && typeof i == "object" ? eFt(i) : "").filter(Boolean);
  if (a.length === 0) throw new Error("未能从文本中分段出有效提示词");
  return a;
}

function Vbi(e) {
  var h;
  const {
    parsed: t,
    promptCount: n,
    currentRows: r,
    currentCols: a,
    totalShots: i,
    gridMode: o
  } = e;
  if (o === "grid" || i != null) {
    const p = ((h = t == null ? void 0 : t.shots) == null ? void 0 : h.length) ?? n ?? 0,
      m = Math.max(1, Math.min(Ubi, i ?? (t == null ? void 0 : t.total_shots) ?? (p || r * a)));
    return {
      total: m,
      rows: Math.ceil(m / 3),
      cols: 3
    };
  }
  let l = r,
    d = a;
  const u = t == null ? void 0 : t.layout_specification;
  if (u && /^\d+x\d+$/i.test(u)) {
    const [p, m] = u.split("x").map(Number);
    p >= 1 && p <= xln && m >= 1 && m <= xln && (l = p, d = m);
  }
  return {
    total: l * d,
    rows: l,
    cols: d
  };
}

function Hbi(e, t) {
  const n = eFt(e);
  if (n) return n;
  const r = String(e.prompt || e.description_zh || e.description_en || e.description || "").trim();
  return JSON.stringify({
    shot_number: e.shot_number ?? t + 1,
    shot_size: e.shot_size || "",
    description_zh: e.description_zh || "",
    description_en: e.description_en || "",
    prompt: r
  }, null, 2);
}

function ije(e) {
  const {
      existingCells: t,
      parsed: n,
      plainPrompts: r,
      currentRows: a,
      currentCols: i,
      totalShots: o,
      gridMode: s,
      jsonDataOverride: l
    } = e,
    d = (n == null ? void 0 : n.shots) ?? [],
    u = !!(r != null && r.length),
    {
      total: h,
      rows: p,
      cols: m
    } = Vbi({
      parsed: n,
      promptCount: (r == null ? void 0 : r.length) ?? d.length,
      currentRows: a,
      currentCols: i,
      totalShots: o,
      gridMode: s
    }),
    f = [];
  for (let _ = 0; _ < h; _++) {
    const w = t[_] || {
      id: `c-${_}`
    };
    let k = "";
    if (u) {
      const A = r == null ? void 0 : r[_];
      k = A ? zde(A) : "";
    } else {
      const A = d[_];
      A && (k = Hbi(A, _));
    }
    f.push({
      id: w.id || `c-${_}`,
      prompt: k,
      refs: w.refs,
      linkNodeId: w.linkNodeId
    });
  }
  let y = l ?? "";
  y || (u && r ? y = JSON.stringify({
    source_type: "plain_text",
    total_prompts: r.length,
    prompts: r.map(zde)
  }, null, 2) : n && (y = JSON.stringify(n, null, 2)));
  const b = {
    cells: f,
    jsonData: y,
    rows: p,
    cols: m
  };
  return (s === "grid" || o != null) && (b.totalGrids = h, b.gridMode = "grid"), b;
}

