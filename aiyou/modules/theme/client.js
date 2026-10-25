/**
 * Client half — theme system.
 *
 * HOW A THEME IS APPLIED (three layers, in order of how sanctioned they are):
 *
 *  1. `ctx.theme.overrideTokens(source, tokens)` — the OFFICIAL third-party theme
 *     API. It takes `token → { light, dark }`; a bare string throws a teaching
 *     error, so every value is wrapped. A single-mode theme supplies the same
 *     value for both slots, because a theme defines the appearance rather than
 *     following the host preference — that is what AIYOUCODEX's themes do.
 *  2. A global stylesheet for what tokens cannot express: radii, border widths,
 *     and the themed surfaces (message bubbles, cards, composer). The official
 *     theme package injects its own stylesheets the same way, with
 *     `data-plugin-css` markers and lifecycle-owned removal.
 *  3. Declared static media on the existing frame background, served through the
 *     host's authenticated same-origin route. Native columns and composer fades
 *     receive independently transparent materials, so the art actually shows.
 *     No overlay DOM, new scroll geometry or business behavior is introduced.
 * Static mode reuses original generic theme artwork and explicitly labelled
 * neutral fallbacks where the source package contains user-provided pictures.
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-theme',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-theme/tab';
    const KIND = 'aiyoucodex-theme';
    const STYLE_TAG_ID = '@local/aiyou-enhancer-theme/theme.css';
    const OVERRIDE_SOURCE = '@local/aiyou-enhancer-theme';
    const THEME_ATTRIBUTE = 'data-aiyou-harness-theme';
    const SYSTEM_THEME_ID = 'system';

    const API_ORIGIN = '';
    const API = `${API_ORIGIN}/aiyoucodex-dsh/theme`;

    // Configuration contract mirrors configuration.mjs; covered by parity tests.
    const ALPHA_KEYS=['overall','chrome','sidebar','chat','panel','card','message','composer','composer-area','control','menu','text','border','shadow','decoration','image'];
    const COLOR_KEYS=['primary','secondary','link','success','danger','warning','inverse','bg','surface','elevated','border','userBg','accent'];
    const CANVAS_COLOR_KEYS=['bg','node','panel','text','muted','border','accent','grid','edge'];
    const CANVAS_OPACITY_KEYS=['bg','node','panel','toolbar'];
    const SYSTEM_PLUGIN_THEME={id:'system',label:'系统默认',mode:'light',primitives:{bg:'#ffffff',surface:'#f5f6f7',elevated:'#ffffff',text:'#17212b',muted:'#52606d',border:'#d6d9df',accent:'#b05d00',running:'#176aba',complete:'#23804a',error:'#b43232','user-bg':'#eff3f8'},semantic:{bg:'bg',surface:'surface',elevated:'elevated',text:'text',muted:'muted',border:'border',brand:'accent',accent:'accent',running:'running',complete:'complete',error:'error','user-bg':'user-bg'},controls:{},background:null};
    const own=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
    const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
    function colorValue(value){return typeof value==='string'&&/^#[0-9a-f]{6}$/iu.test(value);}
    function defaultCanvasConfiguration(colors,theme={}){
     return {followTheme:true,colors:{bg:colors.bg,node:colors.elevated,panel:colors.surface,text:colors.primary,muted:colors.secondary,border:colors.border,accent:colors.accent,grid:colors.border,edge:colors.accent},opacity:{bg:1,node:1,panel:1,toolbar:1},background:{mode:theme.background?'theme':'solid',opacity:0.15,fit:'cover',x:50,y:50,grid:'dots',gridSize:24,gridOpacity:0.22}};
    }
    function normalizeCanvasConfiguration(value,colors,theme={}){
     if(!object(value))throw new Error('canvas 须为对象');
     for(const key of Object.keys(value))if(!['followTheme','colors','opacity','background'].includes(key))throw new Error('未知画布配置项：'+key);
     const output=defaultCanvasConfiguration(colors,theme);
     if(own(value,'followTheme')){if(typeof value.followTheme!=='boolean')throw new Error('canvas.followTheme 必须为布尔值');output.followTheme=value.followTheme;}
     for(const [group,keys] of [['colors',CANVAS_COLOR_KEYS],['opacity',CANVAS_OPACITY_KEYS],['background',['mode','opacity','fit','x','y','grid','gridSize','gridOpacity']]]){
      if(!own(value,group))continue;if(!object(value[group]))throw new Error('canvas.'+group+' 须为对象');
      for(const [key,entry]of Object.entries(value[group])){
       if(!keys.includes(key))throw new Error('未知画布配置项：'+group+'.'+key);
       if(group==='colors'){if(!colorValue(entry))throw new Error('画布颜色须为六位 HEX');}
       else if(key==='mode'){if(!['theme','solid','transparent'].includes(entry))throw new Error('画布背景模式无效');}
       else if(key==='fit'){if(!['cover','contain'].includes(entry))throw new Error('画布背景显示方式无效');}
       else if(key==='grid'){if(!['dots','lines','none'].includes(entry))throw new Error('画布网格类型无效');}
       else if(key==='gridSize'){if(!Number.isInteger(entry)||entry<8||entry>80)throw new Error('画布网格间距须为8至80');}
       else {const max=['x','y'].includes(key)?100:1;if(!Number.isFinite(entry)||entry<0||entry>max)throw new Error('canvas.'+group+'.'+key+' 超出范围');}
       output[group][key]=entry;
      }
     }
     if(output.followTheme)output.colors=defaultCanvasConfiguration(colors,theme).colors;
     return output;
    }
    function defaultConfiguration(theme){
     const c=role=>theme.primitives?.[theme.semantic?.[role]];
     const colors={primary:c('text'),secondary:c('muted'),link:c('running'),success:c('complete'),danger:c('error'),warning:c('accent'),inverse:c('elevated'),...theme.controls?.colors,bg:c('bg'),surface:c('surface'),elevated:c('elevated'),border:c('border'),userBg:c('user-bg'),accent:c('brand')||c('accent')};
     return {motion:Boolean(theme.background?.animated),alpha:Object.fromEntries(ALPHA_KEYS.map(key=>[key,Number.isFinite(theme.controls?.alpha?.[key])?theme.controls.alpha[key]:key==='chat'||key==='composer-area'?0:1])),colors,background:{type:theme.background?.animated?'video':'image',fit:theme.background?.fit||'cover',x:theme.background?.x??75,y:theme.background?.y??50,opacity:theme.background?.opacity??0.46},canvas:defaultCanvasConfiguration(colors,theme)};
    }
    function normalizeConfiguration(value,theme){
     if(!object(value))throw new Error('主题配置须为对象');
     for(const key of Object.keys(value))if(!['motion','alpha','colors','background','canvas'].includes(key))throw new Error('未知主题配置项：'+key);
     const output=defaultConfiguration(theme);
     if(own(value,'motion')){if(typeof value.motion!=='boolean')throw new Error('motion 必须为布尔值');output.motion=value.motion;}
     for(const [group,keys] of [['alpha',ALPHA_KEYS],['colors',COLOR_KEYS],['background',['type','fit','x','y','opacity']]]){
      if(!own(value,group))continue;if(!object(value[group]))throw new Error(group+' 须为对象');
      for(const [key,entry]of Object.entries(value[group])){
       if(!keys.includes(key))throw new Error('未知配置项：'+group+'.'+key);
       if(group==='colors'){if(!colorValue(entry))throw new Error('颜色须为六位 HEX');}
       else if(key==='type'){if(!['image','video'].includes(entry))throw new Error('背景模式无效');}
       else if(key==='fit'){if(!['cover','contain'].includes(entry))throw new Error('背景显示方式无效');}
       else {const max=['x','y'].includes(key)?100:1;if(!Number.isFinite(entry)||entry<0||entry>max)throw new Error(group+'.'+key+' 超出范围');}
       output[group][key]=entry;
      }
     }
     if(!theme.background?.animated)output.background.type='image';
     output.canvas=normalizeCanvasConfiguration(own(value,'canvas')?value.canvas:{},output.colors,theme);
     return output;
    }
    function normalizeSystemConfiguration(value={}){
     if(!object(value)||Object.keys(value).some(key=>key!=='canvas'))throw new Error('系统默认仅支持画布配置');
     return {canvas:normalizeConfiguration(value,SYSTEM_PLUGIN_THEME).canvas};
    }
    function configureTheme(theme,value){
     const configuration=normalizeConfiguration(value||{},theme),primitives={...theme.primitives},semantic={...theme.semantic};
     for(const [key,role]of Object.entries({primary:'text',secondary:'muted',bg:'bg',surface:'surface',elevated:'elevated',border:'border',userBg:'user-bg',accent:'brand'})){
      primitives['custom-'+key.replace(/[A-Z]/gu,c=>'-'+c.toLowerCase())]=configuration.colors[key];semantic[role]='custom-'+key.replace(/[A-Z]/gu,c=>'-'+c.toLowerCase());
     }
     return {...theme,primitives,semantic,controls:{...theme.controls,colors:{...theme.controls?.colors,...configuration.colors},alpha:configuration.alpha},background:theme.background?{...theme.background,...configuration.background,motion:configuration.motion}:null,configuration,defaultConfiguration:defaultConfiguration(theme),base:theme};
    }

    // ---------- colour helpers (no dependencies) ----------
    function parse(color) {
      const value = String(color ?? '').trim();
      const short = /^#([0-9a-f]{3})$/iu.exec(value);
      if (short) {
        const [r, g, b] = short[1].split('').map((c) => Number.parseInt(c + c, 16));
        return { r, g, b, a: 1 };
      }
      const long = /^#([0-9a-f]{6})([0-9a-f]{2})?$/iu.exec(value);
      if (long) {
        const n = Number.parseInt(long[1], 16);
        return {
          r: (n >> 16) & 255,
          g: (n >> 8) & 255,
          b: n & 255,
          a: long[2] ? Number.parseInt(long[2], 16) / 255 : 1,
        };
      }
      const rgba = /^rgba?\(([^)]+)\)$/iu.exec(value);
      if (rgba) {
        const parts = rgba[1].split(',').map((p) => Number.parseFloat(p));
        return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
      }
      return null;
    }

    const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

    function toHex(c) {
      const p = (n) => clamp(n).toString(16).padStart(2, '0');
      return `#${p(c.r)}${p(c.g)}${p(c.b)}`;
    }

    /** Blend two colours; t=0 → a, t=1 → b. */
    function mix(a, b, t) {
      const ca = parse(a);
      const cb = parse(b);
      if (!ca || !cb) return a;
      return toHex({
        r: ca.r + (cb.r - ca.r) * t,
        g: ca.g + (cb.g - ca.g) * t,
        b: ca.b + (cb.b - ca.b) * t,
      });
    }

    function alpha(color, a) {
      const c = parse(color);
      if (!c) return color;
      return `rgba(${clamp(c.r)}, ${clamp(c.g)}, ${clamp(c.b)}, ${a})`;
    }


    /**
     * Darken a colour just enough to reach a contrast target against a surface.
     *
     * Upstream's accent (#a44f78 on island-affection) sits at 4.44:1 on this theme's
     * card surface — 1.4% short of WCAG AA for small text. Rather than replacing the
     * accent (that would break fidelity with the upstream palette), the colour is
     * scaled toward black in small steps until it passes. The hue is preserved and
     * the change is the minimum that clears the bar.
     */
    function ensureContrast(foreground, background, target = 4.5) {
      const toRgb = (hex) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
      const toHex = (rgb) => `#${rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')}`;
      const lum = (hex) => {
        const v = toRgb(hex).map((x) => x / 255).map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
        return v[0] * 0.2126 + v[1] * 0.7152 + v[2] * 0.0722;
      };
      const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
      let current = foreground;
      for (let step = 0; step < 24 && ratio(current, background) < target; step += 1) {
        current = toHex(toRgb(current).map((v) => v * 0.94));
      }
      return current;
    }

    // Native primary controls use opaque fills. Keep the skin's label when it
    // is readable, with a black/white fallback when hue-preserving correction
    // runs out of steps. Hover has its own fill and therefore its own label.
    function controlLabel(preferred, background) {
      return readableUiInk(preferred, background);
    }

    // A readable UI pair is derived presentation state. Never rewrite the
    // user's configured color/alpha or apply these rules to media pixels.
    function uiColor(value) {
      const text=String(value??'').trim();
      if(/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/iu.test(text)){const parsed=parse(text);return {r:parsed.r,g:parsed.g,b:parsed.b,a:parsed.a};}
      const short=/^#([0-9a-f]{4})$/iu.exec(text);
      if(short){const parts=short[1].split('').map(x=>Number.parseInt(x+x,16));return {r:parts[0],g:parts[1],b:parts[2],a:parts[3]/255};}
      const match=/^rgba?\(([^)]+)\)$/iu.exec(text),srgb=/^color\(srgb\s+([^)]+)\)$/iu.exec(text);
      if(!match&&!srgb)return null;
      const parts=(match||srgb)[1].trim().replace(/,/gu,' ').replace(/\//gu,' / ').split(/\s+/u),slash=parts.indexOf('/');
      const channels=slash>=0?parts.slice(0,slash):parts.slice(0,3),alphaPart=slash>=0?parts[slash+1]:parts[3];
      if(channels.length!==3||parts.length>(slash>=0?5:4)||(srgb&&slash<0&&parts.length!==3)||parts.some(part=>part!=='/'&&!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?%?$/iu.test(part)))return null;
      const channel=v=>v.endsWith('%')?255*Number.parseFloat(v)/100:Number(v)*(srgb?255:1);
      const rgb=channels.map(channel),opacity=alphaPart===undefined?1:alphaPart.endsWith('%')?Number.parseFloat(alphaPart)/100:Number(alphaPart);
      return [...rgb,opacity].every(Number.isFinite)?{r:clamp(rgb[0]),g:clamp(rgb[1]),b:clamp(rgb[2]),a:Math.max(0,Math.min(1,opacity))}:null;
    }
    function compositeUiColor(value, backdrop='#ffffff') {
      const back=uiColor(backdrop)||{r:255,g:255,b:255,a:1},front=uiColor(value)||back;
      return toHex({r:front.r*front.a+back.r*(1-front.a),g:front.g*front.a+back.g*(1-front.a),b:front.b*front.a+back.b*(1-front.a)});
    }
    function uiContrast(foreground, background) {
      const bg=uiColor(compositeUiColor(background)),fg=uiColor(compositeUiColor(foreground,toHex(bg)));
      const luminance=c=>[c.r,c.g,c.b].map(v=>v/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[0.2126,0.7152,0.0722][i],0);
      const a=luminance(fg),b=luminance(bg);return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
    }
    function readableUiInk(preferred, background, target=4.5) {
      const bg=compositeUiColor(background),original=compositeUiColor(preferred,bg);
      if(uiContrast(original,bg)>=target)return original;
      const candidates=[];
      for(const destination of ['#000000','#ffffff']){
        if(uiContrast(destination,bg)<target)continue;
        let low=0,high=1;
        for(let i=0;i<14;i++){const middle=(low+high)/2;if(uiContrast(mix(original,destination,middle),bg)>=target)high=middle;else low=middle;}
        candidates.push({weight:high,color:mix(original,destination,high)});
      }
      candidates.sort((a,b)=>a.weight-b.weight);
      return candidates[0]?.color||(uiContrast('#000000',bg)>=uiContrast('#ffffff',bg)?'#000000':'#ffffff');
    }
    function readableUiBoundary(preferred, backgrounds, target=3.2) {
      const colors=[...new Set(backgrounds.map(value=>compositeUiColor(value)))],original=compositeUiColor(preferred,colors[0]),minimum=color=>Math.min(...colors.map(bg=>uiContrast(color,bg)));
      // Reserve a small margin for legacy translucent adjacent surfaces.
      if(minimum(original)>=target)return original;
      const candidates=[];
      for(const destination of ['#000000','#ffffff']){
        if(minimum(destination)<target)continue;
        let low=0,high=1;for(let i=0;i<14;i++){const middle=(low+high)/2;if(minimum(mix(original,destination,middle))>=target)high=middle;else low=middle;}
        candidates.push({weight:high,color:mix(original,destination,high)});
      }
      candidates.sort((a,b)=>a.weight-b.weight);
      // Contradictory user surfaces cannot share one universal outline. Each
      // safe component still owns a readable fill/ink pair and modal fallback.
      return candidates[0]?.color||readableUiInk(preferred,colors.at(-1),target);
    }
    function buildReadableUiVariables(theme,palette=buildTokens(theme).palette) {
      const p=palette,opacity=key=>Math.max(0,Math.min(1,Number.isFinite(theme.controls?.alpha?.[key])?theme.controls.alpha[key]:1));
      const base=compositeUiColor(p.bg,p.dark?'#11151a':'#ffffff'),surface=compositeUiColor(alpha(p.elevated,opacity('card')*opacity('overall')),base),modal=compositeUiColor(alpha(p.elevated,opacity('menu')*opacity('overall')),base);
      const ink=alpha(p.text,opacity('text')),muted=alpha(p.muted,opacity('text')),inverse=theme.controls?.colors?.inverse||base,boundary=readableUiBoundary(p.border,[base,compositeUiColor(p.surface,base),compositeUiColor(p.elevated,base),surface,modal]);
      const values={'bg':base,'ink':readableUiInk(ink,base),'muted':readableUiInk(muted,base),'border':boundary,'surface-bg':surface,'surface-ink':readableUiInk(ink,surface),'surface-muted':readableUiInk(muted,surface),'surface-border':boundary,'modal-bg':modal,'modal-ink':readableUiInk(ink,modal),'modal-muted':readableUiInk(muted,modal),'modal-border':boundary,'accent-text':readableUiInk(p.accent,base),'focus':readableUiInk(p.accent,modal,3)};
      const pair=(name,bg,foreground,outer=modal)=>{const fill=compositeUiColor(bg,surface);values[name+'-bg']=fill;values[name+'-ink']=readableUiInk(foreground,fill);values[name+'-border']=boundary;};
      pair('accent',p.accent,inverse);pair('badge',p.accent,inverse);pair('selected',alpha(p.accent,0.16),ink);pair('status',alpha(p.complete,0.12),p.complete);pair('error',alpha(p.error,0.12),p.error);pair('warning',alpha(p.warn,0.12),p.warn);pair('danger',p.error,inverse);
      return Object.fromEntries(Object.entries(values).map(([key,value])=>['--dsh-readable-'+key,value]));
    }
    // The asset library is an owned document, not a new global theme. Its
    // dense counters and full-width actions use restrained surfaces; mecha's
    // amber remains available elsewhere as a small decorative/status accent.
    function buildAssetLibraryVariables(theme,palette=buildTokens(theme).palette) {
      const p=palette,readable=buildReadableUiVariables(theme,p),get=key=>readable['--dsh-readable-'+key];
      const defaults=theme.defaultConfiguration||defaultConfiguration(theme.base||theme),configured=theme.configuration?.colors?.accent;
      const defaultAccent=!configured||configured.toLowerCase()===String(defaults.colors.accent).toLowerCase();
      const coldMecha=theme.id==='mecha-control'&&defaultAccent;
      const interaction=coldMecha?compositeUiColor(theme.controls?.colors?.link||p.running,get('bg')):compositeUiColor(p.accent,get('bg'));
      const surface=get('surface-bg'),modal=get('modal-bg'),ink=get('surface-ink');
      const actionBg=coldMecha?mix(surface,interaction,0.16):get('accent-bg'),actionHover=mix(actionBg,interaction,coldMecha?0.09:0.05);
      const identityBg=mix(surface,interaction,coldMecha?0.055:0.12),selectedBg=mix(surface,interaction,coldMecha?0.12:0.16);
      const boundary=readableUiBoundary(p.border,[get('bg'),surface,modal,identityBg,selectedBg]);
      const actionBorder=coldMecha?readableUiBoundary(interaction,[get('bg'),surface,modal,actionBg,actionHover]):get('accent-border');
      const values={interaction,link:readableUiBoundary(interaction,[get('bg'),compositeUiColor(p.surface,get('bg')),compositeUiColor(p.elevated,get('bg')),surface,modal],4.5),focus:readableUiInk(interaction,modal,3.2),
        'action-bg':actionBg,'action-ink':coldMecha?readableUiInk(p.text,actionBg):get('accent-ink'),'action-border':actionBorder,
        'action-hover-bg':actionHover,'action-hover-ink':readableUiInk(coldMecha?p.text:get('accent-ink'),actionHover),'action-hover-border':actionBorder,
        'identity-bg':identityBg,'identity-ink':readableUiInk(ink,identityBg),'identity-border':mix(identityBg,interaction,0.22),
        'avatar-bg':identityBg,'avatar-ink':readableUiInk(interaction,identityBg),'avatar-border':mix(identityBg,interaction,0.22),
        'selected-bg':selectedBg,'selected-ink':readableUiInk(ink,selectedBg),'selected-border':boundary};
      return Object.fromEntries(Object.entries(values).map(([key,value])=>['--dsh-asset-'+key,value]));
    }
    function buildAssetLibraryThemeCss(theme,palette,scope,assetScope=scope+' body:has(> .app-shell > .library-sidebar)') {
      const vars=buildAssetLibraryVariables(theme,palette);
      const aliases={'accent-bg':'action-bg','accent-ink':'action-ink','accent-border':'action-border','badge-bg':'identity-bg','badge-ink':'identity-ink','badge-border':'identity-border','selected-bg':'selected-bg','selected-ink':'selected-ink','selected-border':'selected-border','accent-text':'link','focus':'focus'};
      return `${assetScope}{${Object.entries(vars).map(([key,value])=>key+':'+value+';').join('')}${Object.entries(aliases).map(([key,value])=>'--dsh-readable-'+key+':var(--dsh-asset-'+value+');').join('')}accent-color:var(--dsh-asset-interaction)}
${assetScope} :is(input[type=radio],input[type=checkbox]){accent-color:var(--dsh-asset-interaction)!important}
${assetScope} :is(button,input,textarea,select):focus-visible{outline:2px solid var(--dsh-asset-focus)!important;outline-offset:2px}`;
    }
    function buildReadableUiCss(scope) {
      return `
/* Paired readable controls only: no global button, SVG, opacity or media rewrite. */
${scope} :is(.primary-button,.secondary-button,.icon-button,.danger-button,.button,.canvas-picker-select,.asset-quick-insert,.folder-row,.folder-expand,.header-project-switcher):focus-visible{outline:2px solid var(--dsh-readable-focus)!important;outline-offset:2px}
${scope} body:has(> #settings) :is(input,textarea,select,button):focus-visible{outline:2px solid var(--dsh-readable-focus)!important;outline-offset:2px}
${scope} :is(.primary-button,.button.primary,.project-profile-modal-actions button.primary){background:var(--dsh-readable-accent-bg)!important;color:var(--dsh-readable-accent-ink)!important;border-color:var(--dsh-readable-accent-border)!important;outline:1px solid var(--dsh-readable-accent-border);outline-offset:-1px}
${scope} :is(.danger-button,.button.danger){background:var(--dsh-readable-danger-bg)!important;color:var(--dsh-readable-danger-ink)!important;border-color:var(--dsh-readable-danger-border)!important;outline:1px solid var(--dsh-readable-danger-border);outline-offset:-1px}
${scope} :is(.secondary-button,.button.secondary,.header-project-switcher,.icon-button){background:var(--dsh-readable-surface-bg)!important;color:var(--dsh-readable-surface-ink)!important;border-color:var(--dsh-readable-surface-border)!important}
${scope} :is(.smart-group-tabs button.active,.kind-tabs button.active,.project-item.active,.nav-item.active,.project-nav-item.active,.view-tab.active){background:var(--dsh-readable-selected-bg)!important;color:var(--dsh-readable-selected-ink)!important;border-color:var(--dsh-readable-selected-border)!important;outline:1px solid var(--dsh-readable-selected-border);outline-offset:-1px}
${scope} :is(.smart-group-tabs button.active small,.kind-tabs button.active small,.project-sync-badge,.prompt-link-badge){background:var(--dsh-readable-badge-bg)!important;color:var(--dsh-readable-badge-ink)!important;border-color:var(--dsh-readable-badge-border)!important}
${scope} :is(.privacy-note,.local-rule-note,.scan-state){background:var(--dsh-readable-status-bg)!important;color:var(--dsh-readable-status-ink)!important;border-color:var(--dsh-readable-status-border)!important}
${scope} :is(.form-error:not(:empty),.project-automation-error,.board-setting-error,.error-banner,#status[data-error=true],#codex-error:not(:empty)){background:var(--dsh-readable-error-bg)!important;color:var(--dsh-readable-error-ink)!important;border-color:var(--dsh-readable-error-border)!important}
${scope} .error-banner :is(strong,p){color:var(--dsh-readable-error-ink)!important}
${scope} :is(dialog.modal,.task-dialog,.project-profile-modal){background:var(--dsh-readable-modal-bg)!important;color:var(--dsh-readable-modal-ink)!important;border-color:var(--dsh-readable-modal-border)!important}
${scope} :is(.task-dialog,.project-profile-modal){--text-primary:var(--dsh-readable-modal-ink);--text-secondary:var(--dsh-readable-modal-muted);--text-tertiary:var(--dsh-readable-modal-muted);--text-quaternary:var(--dsh-readable-modal-muted);--surface:var(--dsh-readable-surface-bg);--surface-muted:var(--dsh-readable-modal-bg);--border:var(--dsh-readable-surface-border)}
${scope} dialog.modal .modal-actions{background:var(--dsh-readable-modal-bg)!important;color:var(--dsh-readable-modal-ink)!important}
${scope} dialog.modal :is(label,legend,.field-hint,.character-fields label){color:var(--dsh-readable-modal-muted)!important}
${scope} body:has(> #settings){background:var(--dsh-readable-bg)!important;color:var(--dsh-readable-ink)!important;--model-text:var(--dsh-readable-ink);--model-muted:var(--dsh-readable-muted);--model-border:var(--dsh-readable-border)}
${scope} body:has(> #settings) :is(section,#settings>section){background:var(--dsh-readable-modal-bg)!important;color:var(--dsh-readable-modal-ink)!important;--model-text:var(--dsh-readable-modal-ink);--model-muted:var(--dsh-readable-modal-muted)}
${scope} body:has(> #settings) :is(input,textarea,select,button){background:var(--dsh-readable-surface-bg)!important;color:var(--dsh-readable-surface-ink)!important;border-color:var(--dsh-readable-surface-border)!important}
${scope} body:has(> #settings) button.primary{background:var(--dsh-readable-accent-bg)!important;color:var(--dsh-readable-accent-ink)!important;border-color:var(--dsh-readable-accent-border)!important}
${scope} body:has(> #settings) :is(#status[data-error=true],#codex-error:not(:empty)){background:var(--dsh-readable-error-bg)!important;color:var(--dsh-readable-error-ink)!important;border-color:var(--dsh-readable-error-border)!important}
${scope}[data-dsh-theme-adapted] :is(.tb-home-head,.dsh-generic-tool){background:var(--dsh-readable-bg)!important;color:var(--dsh-readable-ink)!important}
${scope}[data-dsh-theme-adapted] .tb-home-card{background:var(--dsh-readable-modal-bg)!important;color:var(--dsh-readable-modal-ink)!important;border-color:var(--dsh-readable-modal-border)!important}
${scope}[data-dsh-theme-adapted] :is(.tb-home-copy small,.tb-home-head p,.dsh-generic-tool header p,.dsh-generic-tool aside>p){color:var(--dsh-readable-modal-muted)!important}
${scope}[data-dsh-theme-adapted] :is(.tb-home-total,.tb-home-mark){background:var(--dsh-readable-badge-bg)!important;color:var(--dsh-readable-badge-ink)!important;border-color:var(--dsh-readable-badge-border)!important}
${scope}[data-dsh-theme-adapted] :is(.tb-send,.sw-primary,.motion-submit,.st-actions .st-send,.sketch-toolbar .sketch-toolbar-plus-btn):not(:disabled){background:var(--dsh-readable-accent-bg)!important;color:var(--dsh-readable-accent-ink)!important;border-color:var(--dsh-readable-accent-border)!important;outline:1px solid var(--dsh-readable-accent-border);outline-offset:-1px}
${scope}[data-dsh-theme-adapted] :is(.tb-tool.is-on,.tb-toolbar button.is-on,.sw-history-item.is-active,.sw-mode button[aria-pressed=true],.pt-segment button[aria-pressed=true]){background:var(--dsh-readable-selected-bg)!important;color:var(--dsh-readable-selected-ink)!important;border-color:var(--dsh-readable-selected-border)!important}
${scope}[data-dsh-theme-adapted] :is(.dsh-characters,.dsh-gateway-picker,[data-dsh-save-dialog],.sw-send-dialog){background:var(--dsh-readable-modal-bg)!important;color:var(--dsh-readable-modal-ink)!important;border-color:var(--dsh-readable-modal-border)!important}
${scope}[data-dsh-theme-adapted] .dsh-generic-tool :is(input:not([type=color]):not([type=range]):not([type=checkbox]),textarea,select,button){background:var(--dsh-readable-surface-bg)!important;color:var(--dsh-readable-surface-ink)!important;border-color:var(--dsh-readable-surface-border)!important}
${scope}[data-dsh-theme-adapted] .dsh-generic-tool :is([data-status],[data-capability]){background:var(--dsh-readable-status-bg)!important;color:var(--dsh-readable-status-ink)!important;border-color:var(--dsh-readable-status-border)!important}
`;
    }

    // ---------- palette → DSH token map ----------
    function buildTokens(theme) {
      const prim = theme?.primitives ?? {};
      const sem = theme?.semantic ?? {};
      const color = (role, fallback) => {
        const name = sem[role];
        const value = name ? prim[name] : undefined;
        return value || fallback;
      };
      const both = (value) => ({ light: value, dark: value });

      /*
       * Upstream ships explicit control colours per theme in controls.json
       * (link / success / danger / warning / inverse), tuned for that theme's
       * surfaces. Deriving them from the semantic palette produced slightly
       * different values, so prefer upstream's where present — this is a fidelity
       * fix, not a preference.
       */
      const upstream = theme?.controls?.colors ?? {};
      const controlled = (key, fallback) => (typeof upstream[key] === 'string' && /^#[a-f0-9]{6}$/iu.test(upstream[key]) ? upstream[key] : fallback);

      const bg = color('bg', '#ffffff');
      const surface = color('surface', bg);
      const elevated = color('elevated', surface);
      const text = color('text', '#0f1115');
      const muted = color('muted', mix(text, bg, 0.4));
      const border = color('border', mix(text, bg, 0.85));
      const accent = color('brand', color('accent', text));
      const accentStrong = color('accent', accent);
      const running = color('running', '#3b82f6');
      const complete = color('complete', '#22c55e');
      const error = color('error', '#ef4444');
      const warn = mix(error, color('accent', accent), 0.5);
      const userBg = color('user-bg', mix(surface, accent, 0.12));
      const dark = theme?.mode === 'dark';
      const textAlpha=Number.isFinite(theme.controls?.alpha?.text)?theme.controls.alpha.text:1;

      const tokens = {
        // surfaces
        '--dsw-alias-bg-base': bg,
        '--dsw-alias-bg-layer-1': surface,
        '--dsw-alias-bg-layer-2': elevated,
        '--dsw-alias-bg-layer-3': mix(elevated, text, dark ? 0.06 : 0.03),
        '--dsw-alias-bg-overlay': mix(elevated, text, dark ? 0.08 : 0.04),
        '--dsw-alias-bg-module-platform': surface,
        '--dsw-alias-bg-skeleton': mix(surface, text, dark ? 0.08 : 0.05),
        '--dsw-alias-bg-document-preview': surface,
        '--dsw-alias-bg-document-selection': alpha(accent, 0.24),
        '--dsw-alias-bg-multi-select': alpha(accent, 0.16),
        '--dsw-alias-bg-mask-1': alpha(bg, 0.2),
        '--dsw-alias-bg-mask-2': alpha(bg, 0.5),
        '--dsw-alias-bg-mask-3': alpha(bg, 0.8),
        '--dsw-alias-bg-mask-drop': alpha(bg, 0.6),
        '--dsw-alias-bg-mask-photo': alpha(bg, 0.72),
        // labels
        '--dsw-alias-label-primary': alpha(text,textAlpha),
        '--dsw-alias-label-primary-bluish': text,
        '--dsw-alias-label-primary-dimmed': alpha(text, 0.6),
        '--dsw-alias-label-primary-foreground': bg,
        '--dsw-alias-label-primary-inverted': controlled('inverse', bg),
        '--dsw-alias-label-secondary': alpha(muted,textAlpha),
        '--dsw-alias-label-tertiary': mix(muted, bg, 0.08),
        '--dsw-alias-label-caption': mix(muted, bg, 0.4),
        '--dsw-alias-label-dimmed': alpha(muted, 0.55),
        '--dsw-alias-label-deep-diving': text,
        '--dsw-alias-label-shimmer': mix(text, bg, 0.5),
        '--dsw-alias-label-document-preview': text,
        // borders
        '--dsw-alias-border-l1': mix(border, bg, 0.5),
        '--dsw-alias-border-l2': alpha(border, 0.55),
        '--dsw-alias-border-l2-darkmode-thin': alpha(border, 0.35),
        '--dsw-alias-border-l3': border,
        '--dsw-alias-border-l4': mix(border, text, 0.35),
        '--dsw-alias-border-inverted': alpha(bg, 0.3),
        '--dsw-alias-border-inverted2': alpha(bg, 0.5),
        // brand / links
        // Brand is used as TEXT in badges and icons, and those sit on both `bg` and
        // `surface`. Correcting against `surface` alone left three of the seven
        // built-in themes failing AA against `bg` (measured: 3.15 / 3.57 / 3.88).
        // Chaining both guarantees the single derived colour clears whichever
        // background it lands on.
        '--dsw-alias-brand-primary': ensureContrast(ensureContrast(accent, surface), bg),
        '--dsw-alias-brand-primary-invert': bg,
        '--dsw-alias-brand-text': accentStrong,
        '--dsw-alias-link': controlled('link', accentStrong),
        '--dsw-alias-onboarding-accent': accent,
        '--dsw-alias-menu-icon': muted,
        // interactive
        '--dsw-alias-interactive-bg-hover': alpha(text, dark ? 0.08 : 0.05),
        '--dsw-alias-interactive-bg-active': alpha(text, dark ? 0.12 : 0.08),
        '--dsw-alias-interactive-bg-hover-solid': mix(surface, text, dark ? 0.1 : 0.06),
        '--dsw-alias-interactive-bg-hover-accent': alpha(accent, 0.16),
        '--dsw-alias-interactive-bg-hover-danger': alpha(error, 0.16),
        // buttons
        '--dsw-alias-button-primary-fill': accent,
        '--dsw-alias-button-primary-hover': mix(accent, text, dark ? 0.15 : 0.12),
        '--dsw-alias-button-primary-dimmed': alpha(accent, 0.5),
        '--dsw-alias-button-elevated-fill': elevated,
        '--dsw-alias-button-floating-fill': elevated,
        '--dsw-alias-button-floating-hover': mix(elevated, text, dark ? 0.08 : 0.05),
        '--dsw-alias-button-contrast-fill': text,
        '--dsw-alias-button-ghost-active-fill': alpha(accent, 0.14),
        '--dsw-alias-button-ghost-active-border': alpha(accent, 0.4),
        '--dsw-alias-button-ghost-active-hover': alpha(accent, 0.2),
        '--dsw-alias-button-tool-bar-fill': alpha(text, dark ? 0.06 : 0.04),
        '--dsw-alias-button-tool-bar-fill-invisible': alpha(text, 0),
        '--dsw-alias-button-tool-bar-hover': alpha(text, dark ? 0.12 : 0.08),
        '--dsw-alias-button-info-fill': alpha(running, 0.16),
        '--dsw-alias-button-info-hover': alpha(running, 0.24),
        // states
        '--dsw-alias-state-business-primary': running,
        '--dsw-alias-state-business-tertiary': alpha(running, 0.16),
        '--dsw-alias-state-success-primary': controlled('success', complete),
        '--dsw-alias-state-success-secondary': alpha(complete, 0.5),
        '--dsw-alias-state-success-tertiary': alpha(complete, 0.16),
        '--dsw-alias-state-error-primary': controlled('danger', error),
        '--dsw-alias-state-error-secondary': alpha(error, 0.5),
        '--dsw-alias-state-warn-primary': controlled('warning', warn),
        '--dsw-alias-state-warn-secondary': alpha(warn, 0.5),
        '--dsw-alias-state-warn-tertiary': alpha(warn, 0.16),
        '--dsw-alias-state-warn-label': warn,
        '--dsw-alias-state-idle-primary': mix(muted, bg, 0.3),
        // scrollbars
        '--dsw-alias-scrollbar-bg-l1': alpha(text, 0.12),
        '--dsw-alias-scrollbar-bg-l2': alpha(text, 0.08),
        '--dsw-alias-scrollbar-hover-l1': alpha(text, 0.22),
        '--dsw-alias-scrollbar-hover-l2': alpha(text, 0.16),
        // code / diff
        '--dsw-alias-code-diff-added': complete,
        '--dsw-alias-code-diff-deleted': error,
        '--dsw-alias-file-diff-added-bg': alpha(complete, 0.14),
        '--dsw-alias-file-diff-added-gutter': alpha(complete, 0.2),
        '--dsw-alias-file-diff-added-marker': complete,
        '--dsw-alias-file-diff-deleted-bg': alpha(error, 0.14),
        '--dsw-alias-file-diff-deleted-gutter': alpha(error, 0.2),
        '--dsw-alias-file-diff-deleted-marker': error,
        // markdown
        '--dsw-alias-markdown-code-block': mix(surface, text, dark ? 0.08 : 0.04),
        '--dsw-alias-markdown-code-block-banner': mix(surface, text, dark ? 0.12 : 0.06),
        '--dsw-alias-markdown-inline-code': mix(surface, text, dark ? 0.1 : 0.05),
        '--dsw-alias-markdown-code-segment-selected': alpha(accent, 0.22),
        '--dsw-alias-markdown-code-segment-unselected': alpha(text, 0.06),
        '--dsw-alias-markdown-placeholder': mixedOr(muted, bg, 0.4),
        '--dsw-alias-markdown-tag': alpha(accent, 0.18),
        '--dsw-alias-markdown-citation': alpha(accent, 0.2),
        // misc surfaces
        '--dsw-alias-menu-group-header-fill': surface,
        '--dsw-alias-settings-card-fill': elevated,
        '--dsw-alias-settings-card-stroke': alpha(border, 0.5),
        '--dsw-alias-onboarding-card-fill': elevated,
        '--dsw-alias-onboarding-secondary-fill': mix(elevated, text, dark ? 0.06 : 0.03),
        '--dsw-alias-onboarding-checkbox-border': border,
        '--dsw-alias-switch-thumb': bg,
        '--dsw-alias-toast-bg': elevated,
        '--dsw-alias-toast-label': text,
        '--dsw-alias-tooltip-bg': mix(elevated, text, dark ? 0.12 : 0.06),
        '--dsw-alias-tooltip-key-bg': alpha(text, 0.1),
        '--dsw-alias-turn-trigger-bg': alpha(accent, 0.1),
        '--dsw-alias-turn-trigger-bg-hover': alpha(accent, 0.18),

        // ---- coverage gaps ----------------------------------------------------
        // Found by diffing the tokens the shipped UI actually references (417)
        // against this map (108 covered → 309 gaps). 24 of the gaps are colours,
        // and an uncovered colour token is exactly what makes a dark theme look
        // patchy: most of the shell is themed and a few surfaces stay stock.
        //
        // Deliberately NOT included: --dsw-elevation-* and --dsw-shadow-lv* . Those
        // are COMPOSITE box-shadow values, not colours; feeding them a colour would
        // produce `box-shadow: #123456`, which is invalid and silently drops the
        // shadow. They are left to the host.
        '--dsw-alias-bg-l1': surface,
        '--dsw-alias-bg-l2': elevated,
        '--dsw-alias-bg-layer-4': mix(elevated, text, dark ? 0.1 : 0.05),
        '--dsw-alias-fill-l1': mix(surface, text, dark ? 0.06 : 0.03),
        '--dsw-alias-fill-l2': mix(surface, text, dark ? 0.1 : 0.05),
        '--dsw-alias-fill-tertiary': alpha(text, 0.06),
        '--dsw-alias-fill-tsp-secondary': alpha(text, 0.08),
        '--dsw-alias-label-quaternary': mix(muted, bg, 0.55),
        '--dsw-alias-label-deep-diving-shimmer': alpha(text, 0.5),
        '--dsw-alias-separator-primary': mix(surface, text, dark ? 0.14 : 0.09),
        '--dsw-focus-ring-color': accent,
        '--dsw-hovercard-bg': elevated,
        '--dsw-mask-blur': alpha(bg, 0.6),
        '--dsw-menu-surface-fill': elevated,
        // QuestionComposer and PlanReviewPanel are native section cards rather
        // than role=dialog elements. Their shared fill must follow the skin too.
        '--dsw-specific-input-major': elevated,
        '--dsw-specific-sidebar-fill': mix(surface, bg, dark ? 0.5 : 0.35),
      };

      const out = {};
      for (const [token, value] of Object.entries(tokens)) out[token] = both(value);
      return { tokens: out, palette: { bg, surface, elevated, text, muted, border, accent, running, complete, error, warn, userBg, dark } };
    }

    function mixedOr(a, b, t) {
      const mixed = mix(a, b, t);
      return mixed || a;
    }

    /** Compile material rules against the current installed native CSS modules.
     * Geometry belongs to the host: no reading width, scroll container, docking,
     * titlebar clearance, editor padding, or navigation-card geometry is replaced.
     */
    function buildCanvasVariables(theme,palette=buildTokens(theme).palette){
      const configuration=theme.configuration||normalizeConfiguration({},theme);
      const c=configuration.canvas,base=defaultCanvasConfiguration({bg:palette.bg,elevated:palette.elevated,surface:palette.surface,primary:palette.text,secondary:palette.muted,border:palette.border,accent:palette.accent},theme);
      const colors=c.followTheme?base.colors:c.colors,bg=c.background;
      const image=bg.mode==='theme'&&theme.background&&/^[a-z][a-z0-9-]{1,60}$/u.test(theme.id)?'url("'+API+'/media?id='+encodeURIComponent(theme.id)+'")':'none';
      return {'--dsh-canvas-bg':bg.mode==='transparent'?'transparent':alpha(colors.bg,c.opacity.bg),'--dsh-canvas-node':alpha(colors.node,c.opacity.node),'--dsh-canvas-panel':alpha(colors.panel,c.opacity.panel),'--dsh-canvas-toolbar':alpha(colors.panel,c.opacity.toolbar),'--dsh-canvas-text':colors.text,'--dsh-canvas-muted':colors.muted,'--dsh-canvas-border':colors.border,'--dsh-canvas-accent':colors.accent,'--dsh-canvas-grid':alpha(colors.grid,bg.gridOpacity),'--dsh-canvas-edge':colors.edge,'--dsh-canvas-image':image,'--dsh-canvas-image-opacity':bg.opacity,'--dsh-canvas-image-fit':bg.fit,'--dsh-canvas-image-position':bg.x+'% '+bg.y+'%','--dsh-canvas-grid-style':bg.grid,'--dsh-canvas-grid-size':bg.gridSize+'px'};
    }

    function resolveSystemTheme(page,configuration={}){
      const host=page.querySelector?.('._6Qf49G_frame')||page.documentElement;
      const style=page.defaultView?.getComputedStyle?.(host);
      const nativeDark=host.closest?.('[data-ds-dark-theme]')||page.documentElement.getAttribute('data-ds-dark-theme')!==null;
      const scheme=style?.colorScheme||'',dark=nativeDark||scheme==='dark'||(scheme!=='light'&&page.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches);
      const colors=dark?{bg:'#11151a',surface:'#1a2028',elevated:'#232c37',text:'#edf0f4',muted:'#b4bdca',border:'#465465',accent:'#edaa55',running:'#8ccaff',complete:'#8fd6a3',error:'#ff8b8b','user-bg':'#26364b'}:{...SYSTEM_PLUGIN_THEME.primitives};
      const roles={bg:'--dsw-alias-bg-base',surface:'--dsw-alias-bg-layer-1',elevated:'--dsw-alias-bg-layer-2',text:'--dsw-alias-label-primary',muted:'--dsw-alias-label-secondary',border:'--dsw-alias-border-l2',accent:'--dsw-alias-brand-primary',running:'--dsw-alias-state-progress-primary',complete:'--dsw-alias-state-success-primary',error:'--dsw-alias-state-error-primary','user-bg':'--dsw-alias-bg-layer-2'};
      for(const [role,key]of Object.entries(roles)){
        const raw=style?.getPropertyValue(key)?.trim(),rgb=parse(raw);
        if(rgb&&[rgb.r,rgb.g,rgb.b,rgb.a].every(Number.isFinite)){const backdrop=['bg','surface'].includes(role)?colors.bg:role==='elevated'?colors.surface:colors.bg;colors[role]=rgb.a<1?mix(backdrop,toHex(rgb),Math.max(0,rgb.a)):toHex(rgb);}
      }
      const base={...SYSTEM_PLUGIN_THEME,mode:dark?'dark':'light',primitives:colors};
      return configureTheme(base,{canvas:configuration.canvas||{}});
    }

    function buildThemeSurfaceCss(theme, palette = buildTokens(theme).palette) {
      if (!/^[a-z][a-z0-9-]{1,60}$/u.test(theme?.id || '')) throw new Error('主题标识无效');
      const scope = `html[${THEME_ATTRIBUTE}="${theme.id}"]`;
      const bounded = (value, fallback, maximum = 48) => Number.isFinite(value) ? Math.max(0, Math.min(maximum, value)) : fallback;
      const opacity = (role, fallback = 1) => bounded(theme.controls?.alpha?.[role], fallback, 1);
      const radius = (role, fallback) => `${bounded(theme.radius?.[role], fallback)}px`;
      const fill = (color, role, fallback) => alpha(color, opacity(role, fallback)*opacity('overall'));
      const { bg, surface, elevated, text, muted, border, accent, userBg, dark } = palette;
      const shadow = opacity('shadow');
      const questionBadgeFill = mix(elevated, palette.running, 0.12);
      const questionWarning = theme.controls?.colors?.warning || palette.warn;
      const questionWarningFill = mix(elevated, questionWarning, 0.12);
      const vars = {
        ...buildCanvasVariables(theme,palette),
        ...buildReadableUiVariables(theme,palette),
        '--aiyou-harness-bg': bg,
        '--aiyou-harness-chat-fill': fill(bg, 'chat', 0),
        '--aiyou-harness-sidebar-fill': fill(surface, 'sidebar', 0.8),
        '--aiyou-harness-rail-fill': alpha(surface,0.96*opacity('overall')),
        '--aiyou-harness-chrome-fill': fill(surface, 'chrome', 0.95),
        '--aiyou-harness-panel-fill': fill(elevated, 'panel', 0.98),
        '--aiyou-harness-card-fill': fill(elevated, 'card', 0.96),
        '--aiyou-harness-menu-fill': fill(elevated, 'menu', 0.98),
        '--aiyou-harness-control-fill': fill(surface, 'control', 0.96),
        '--aiyou-harness-question-primary-label': controlLabel(bg, accent),
        '--aiyou-harness-question-primary-hover-label': controlLabel(bg, mix(accent, text, dark ? 0.15 : 0.12)),
        '--aiyou-harness-question-badge-fill': questionBadgeFill,
        '--aiyou-harness-question-badge-label': ensureContrast(palette.running, questionBadgeFill),
        '--aiyou-harness-question-warning-fill': questionWarningFill,
        '--aiyou-harness-question-warning-label': controlLabel(questionWarning, questionWarningFill),
        '--aiyou-harness-message-fill': fill(elevated, 'message', 0.96),
        '--aiyou-harness-user-fill': fill(userBg, 'message', 0.96),
        '--aiyou-harness-composer-fill': fill(elevated, 'composer', 0.96),
        '--aiyou-harness-composer-area-fill': fill(surface, 'composer-area', 0),
        '--aiyou-harness-border': alpha(border, opacity('border', 0.8)),
        '--aiyou-harness-message-radius': radius('message', 16),
        '--aiyou-harness-card-radius': radius('card', 14),
        '--aiyou-harness-dialog-radius': radius('dialog', 18),
        '--aiyou-harness-composer-radius': radius('composer', 22),
        '--aiyou-harness-control-radius': radius('control', 10),
        '--aiyou-harness-message-x': `${bounded(theme.spacing?.['message-x'], 16)}px`,
        '--aiyou-harness-message-y': `${bounded(theme.spacing?.['message-y'], 10)}px`,
        '--aiyou-harness-border-width': `${bounded(theme.borders?.width, 1, 4)}px`,
        '--aiyou-harness-shadow': `0 3px 12px ${alpha(text, (dark ? 0.18 : 0.07) * shadow)}, inset 0 1px 0 ${alpha(elevated, 0.3 * shadow)}`,
        '--aiyou-harness-menu-shadow': `0 8px 28px ${alpha(text, (dark ? 0.3 : 0.14) * shadow)}`,
        '--aiyou-harness-code-fill': mix(elevated, text, dark ? 0.07 : 0.035),
        '--aiyou-harness-code-header': mix(elevated, text, dark ? 0.11 : 0.065),
        '--aiyou-harness-accent-wash': alpha(accent, dark ? 0.14 : 0.08),
      };
      // Shiki reads these semantic variables; the selected skin may be dark while
      // Harness's saved light/system preference remains untouched.
      const syntax = dark
        ? { constant: '#78c3ff', string: '#9bddac', comment: '#b0bdca', keyword: '#ffc2da', parameter: '#ffd099', function: '#cbb8ff', punctuation: '#d9e2ea', link: '#8ccaff' }
        : { constant: '#175d97', string: '#246137', comment: '#59656c', keyword: '#a02c59', parameter: '#8a4a16', function: '#65449e', punctuation: '#46545e', link: '#235c91' };
      const background = theme.background;
      // Construct the URL from the validated theme identity, never an arbitrary
      // URL or CSS fragment supplied by imported theme JSON.
      const media = background && ['image','video'].includes(background.type);
      const imageAlpha = bounded(background?.opacity,opacity('image',0.46),1);
      const imagePosition = `${bounded(background?.x,75,100)}% ${bounded(background?.y,50,100)}%`;
      const art = media ? `linear-gradient(${alpha(bg,1-imageAlpha)},${alpha(bg,1-imageAlpha)}),url("${API}/media?id=${encodeURIComponent(theme.id)}")` : `linear-gradient(145deg,${alpha(accent,dark ? 0.065 : 0.04)},transparent 52%)`;
      return `${scope}{color-scheme:${dark ? 'dark' : 'light'};accent-color:${accent};${Object.entries(vars).map(([key,value]) => `${key}:${value};`).join('')}}
${scope} body{background:var(--aiyou-harness-bg);color:var(--dsw-alias-label-primary)}
${scope} body{${Object.entries(syntax).map(([key,value]) => `--shiki-token-${key}:${value};`).join('')}--shiki-token-string-expression:${syntax.string};}
${scope} ._6Qf49G_frame{isolation:isolate;background-color:var(--aiyou-harness-bg);background-image:${art};background-size:${background?.fit === 'contain' ? 'contain' : 'cover'};background-position:${imagePosition};background-repeat:no-repeat}
${scope} ._6Qf49G_frame[data-aiyou-video-ready]{background-image:none}
${scope} [data-aiyou-theme-video]{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;user-select:none}
/* Native macOS center/right columns otherwise paint an opaque base above the
   frame art. The frame remains the only wallpaper owner and cannot eat clicks. */
${scope} :is(._6Qf49G_centerCol,._6Qf49G_rightbarCol,.irMxjq_panel){background:transparent}
${scope} ._6Qf49G_sidebarCol{background:var(--aiyou-harness-sidebar-fill)}
${scope} [data-aiyou-sidebar]{background:transparent}
${scope} .aiyou-navigation-rail{background:var(--aiyou-harness-rail-fill);border-color:var(--aiyou-harness-border)}
${scope} .aiyou-session-pane{background:var(--aiyou-harness-sidebar-fill)}
${scope} :is(.ST7X_W_root,.icaHSq_frame,.icaHSq_root){background:var(--aiyou-harness-chat-fill)}
${scope} .ST7X_W_header{background:var(--aiyou-harness-chrome-fill);border-bottom-color:var(--aiyou-harness-border);box-shadow:0 1px 0 ${alpha(elevated,0.25)}}
${scope} :is(.ST7X_W_tab,.irMxjq_iconButton,.wmirxG_button){color:var(--dsw-alias-label-secondary)}
${scope} .ST7X_W_tabActive{color:var(--dsw-alias-label-primary);background:var(--aiyou-harness-accent-wash)}
/* One shared shell rule for both roles, including pending/streaming content.
   :has skips an empty response and a body containing only hidden process rows. */
${scope} :is(.IzP3Va_bubble,.gKv1-q_body:has(> :not([hidden]):not(:empty))){box-sizing:border-box;padding:var(--aiyou-harness-message-y) var(--aiyou-harness-message-x);border:var(--aiyou-harness-border-width) solid var(--aiyou-harness-border);border-radius:var(--aiyou-harness-message-radius);box-shadow:var(--aiyou-harness-shadow);background:var(--aiyou-harness-message-fill);color:var(--dsw-alias-label-primary);line-height:calc(24px + var(--dsh-content-font-delta,0px))}
${scope} .IzP3Va_bubble{background:var(--aiyou-harness-user-fill)}
${scope} :is(.IzP3Va_bubble,.gKv1-q_body)>:first-child{margin-block-start:0}
${scope} :is(.IzP3Va_bubble,.gKv1-q_body)>:last-child{margin-block-end:0}
${scope} .gKv1-q_body a{color:var(--dsw-alias-link);overflow-wrap:anywhere}
/* Native wide tables break out of plain prose. A material bubble owns its
   content, so keep the table's horizontal scroll inside that shell. */
${scope} .gKv1-q_body .md-table-wide{width:100%;max-width:100%;min-width:0;margin-left:0;padding-left:0;overflow-x:auto}
${scope} .gKv1-q_body :is(pre,table){border-color:var(--aiyou-harness-border);color:var(--dsw-alias-label-primary)}
${scope} .gKv1-q_body pre{background:var(--aiyou-harness-code-fill);border-radius:var(--aiyou-harness-control-radius)}
${scope} .gKv1-q_body :not(pre)>code{background:var(--dsw-alias-markdown-inline-code);color:var(--dsw-alias-label-primary);border-radius:4px}
${scope} [data-code-block-banner]{background:var(--aiyou-harness-code-header);color:var(--dsw-alias-label-secondary);border-color:var(--aiyou-harness-border)}
${scope} .gKv1-q_body th{background:var(--aiyou-harness-code-header);color:var(--dsw-alias-label-primary)}
${scope} .gKv1-q_body td{background:var(--aiyou-harness-card-fill);color:var(--dsw-alias-label-primary)}
${scope} .gKv1-q_body :is(th,td){border-color:var(--aiyou-harness-border)}
${scope} .gKv1-q_body blockquote{color:var(--dsw-alias-label-secondary);border-color:var(--dsw-alias-brand-primary)}
/* The outer seat and the native editor card use separate alpha roles. */
${scope} .ST7X_W_composerStack{background:var(--aiyou-harness-composer-area-fill)}
${scope} .ST7X_W_root[data-phase=active] .ST7X_W_composerSeat,${scope} .ST7X_W_embeddedBody[data-content-phase=active] .ST7X_W_composerSeat{background:var(--aiyou-harness-composer-area-fill)}
${scope} .yhfFVG_card{background:var(--aiyou-harness-composer-fill);color:var(--dsw-alias-label-primary);border:var(--aiyou-harness-border-width) solid var(--aiyou-harness-border);border-radius:var(--aiyou-harness-composer-radius);box-shadow:var(--aiyou-harness-shadow)}
${scope} .yhfFVG_card:focus-within{border-color:var(--dsw-alias-brand-primary);box-shadow:var(--aiyou-harness-shadow),0 0 0 2px var(--aiyou-harness-accent-wash)}
${scope} .yhfFVG_input{background:transparent;color:var(--dsw-alias-label-primary);caret-color:var(--dsw-alias-brand-primary)}
${scope} .yhfFVG_placeholder{color:var(--dsw-alias-label-secondary)}
${scope} :is(.yhfFVG_add,.yhfFVG_select){background-color:var(--aiyou-harness-control-fill);color:var(--dsw-alias-label-primary)}
${scope} :is(.irMxjq_tabBody,.irMxjq_panel [data-dockkit-host],.irMxjq_panel [data-dockkit-empty]){background:var(--aiyou-harness-panel-fill);color:var(--dsw-alias-label-primary)}
${scope} .irMxjq_panel [data-dockkit-pane]{border-color:var(--aiyou-harness-border)}
${scope} :is(.YS3v9W_root,.IzP3Va_fileCard,._0TPaqG_panel,.w9rwOa_root,.y0jqnG_panel,.-Fl-UW_panel,.JXrxFq_preview){background:var(--aiyou-harness-card-fill);color:var(--dsw-alias-label-primary);border-color:var(--aiyou-harness-border);border-radius:var(--aiyou-harness-card-radius);box-shadow:var(--aiyou-harness-shadow)}
${scope} :is([data-menu-material],[role="menu"],[role="dialog"]){background:var(--aiyou-harness-menu-fill);color:var(--dsw-alias-label-primary);border-color:var(--aiyou-harness-border);border-radius:var(--aiyou-harness-dialog-radius);box-shadow:var(--aiyou-harness-menu-shadow)}
${scope} :is(.y21zpG_card,.R7PCuq_card){background:var(--aiyou-harness-panel-fill);color:var(--dsw-alias-label-primary);border-radius:var(--aiyou-harness-dialog-radius);--dsw-elevation-stroke-color:var(--aiyou-harness-border)}
${scope} .y21zpG_customBlock{background:var(--aiyou-harness-control-fill)}
${scope} .y21zpG_fieldInput::placeholder{color:var(--dsw-alias-label-secondary)}
${scope} .y21zpG_badge{background:var(--aiyou-harness-question-badge-fill);color:var(--aiyou-harness-question-badge-label)}
${scope} .R7PCuq_strip{background:var(--aiyou-harness-question-warning-fill);color:var(--aiyou-harness-question-warning-label)}
${scope} :is(.y21zpG_card,.R7PCuq_card) ._primary_1rv3m_36{color:var(--aiyou-harness-question-primary-label)}
${scope} :is(.y21zpG_card,.R7PCuq_card) ._primary_1rv3m_36:hover:not(:disabled){color:var(--aiyou-harness-question-primary-hover-label)}
${scope} :is([role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]):focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
${scope} :is(.yhfFVG_card,.ST7X_W_header,.irMxjq_tabBody,.y21zpG_card,.R7PCuq_card) :is(button,a,select,[role="button"]):focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
/* Navigation owns its grid, card size and icons; only its semantic paint changes. */
${scope} [data-aiyou-sidebar]{--aiyou-shortcut-fill:var(--aiyou-harness-card-fill);--aiyou-shortcut-border:var(--aiyou-harness-border);--aiyou-shortcut-ink:var(--dsw-alias-label-primary)}
${scope} .aiyou-shortcut-card{background:var(--aiyou-harness-card-fill);border-color:var(--aiyou-harness-border);color:var(--dsw-alias-label-primary)}
${scope} .aiyou-shortcut-label{color:var(--dsw-alias-label-primary)}
${buildAssetLibraryThemeCss(theme,palette,scope,scope+' [data-dsh-asset-canvas-target]')}
@media(prefers-reduced-motion:reduce){${scope} :is(.IzP3Va_bubble,.gKv1-q_body,.yhfFVG_card,.ST7X_W_header,[data-menu-material],.aiyou-shortcut-card){transition:none;animation:none}}
`;
    }

    function buildEmbeddedThemeCss(theme) {
      const { tokens, palette: p } = buildTokens(theme);
      const scope = `html[${THEME_ATTRIBUTE}="${theme.id}"]`;
      const opacity=role=>Math.max(0,Math.min(1,Number.isFinite(theme.controls?.alpha?.[role])?theme.controls.alpha[role]:1));
      const fill=(color,role)=>alpha(color,opacity(role)*opacity('overall'));
      const vars = {
        ...buildCanvasVariables(theme,p),
        ...buildReadableUiVariables(theme,p),
        ...Object.fromEntries(Object.entries(tokens).map(([key,value]) => [key,value.light])),
        '--bg': fill(p.bg,'panel'), '--header-bg': fill(p.surface,'chrome'), '--sidebar-bg': fill(p.surface,'sidebar'),
        '--surface': fill(p.elevated,'control'), '--surface-raised': fill(p.elevated,'card'), '--surface-muted': fill(p.surface,'panel'),
        '--surface-hover': mix(p.surface,p.text,p.dark ? 0.1 : 0.04), '--surface-active': mix(p.surface,p.accent,0.12),
        '--column-header': fill(p.surface,'panel'), '--panel': fill(p.elevated,'menu'), '--card': fill(p.elevated,'card'),
        '--ink': tokens['--dsw-alias-label-primary'].light, '--muted': tokens['--dsw-alias-label-secondary'].light, '--soft': p.surface, '--line': alpha(p.border,opacity('border')),
        '--text-primary': p.text, '--text-secondary': p.muted, '--text-tertiary': p.muted, '--text-quaternary': p.muted,
        '--border': alpha(p.border,opacity('border')), '--border-strong': mix(p.border,p.text,0.15),
        '--accent': tokens['--dsw-alias-brand-primary'].light, '--accent-hover': p.accent, '--accent-soft': alpha(p.accent,0.12),
        '--danger': tokens['--dsw-alias-state-error-primary'].light, '--danger-soft': alpha(p.error,0.12),
        '--warning': tokens['--dsw-alias-state-warn-primary'].light, '--success': tokens['--dsw-alias-state-success-primary'].light,
        '--status-backlog': p.muted, '--status-todo': p.muted, '--status-progress': p.running,
        '--status-review': p.complete, '--status-blocked': p.error, '--status-done': p.complete, '--status-canceled': p.muted,
        '--scrollbar-thumb': alpha(p.text,0.18), '--scrollbar-thumb-hover': alpha(p.text,0.4),
        '--shadow': `0 8px 24px ${alpha(p.text,p.dark ? 0.22 : 0.08)}`,
        '--card-shadow': `0 3px 10px ${alpha(p.text,p.dark ? 0.2 : 0.06)}`,
        '--dialog-shadow': `0 12px 32px ${alpha(p.text,p.dark ? 0.3 : 0.14)}`,
      };
      return `${scope}{color-scheme:${p.dark ? 'dark' : 'light'}!important;accent-color:${p.accent};${Object.entries(vars).map(([key,value]) => `${key}:${value};`).join('')}}
${scope} body{background:var(--bg);color:var(--ink)}
${scope} .empty-state{background:var(--panel);color:var(--ink);border-color:var(--line)}
${scope} .empty-icon{background:var(--surface-muted);color:var(--accent);box-shadow:var(--card-shadow)}
${scope} :is(.library-sidebar,.smart-group-tabs,.kind-tabs){background:var(--surface-muted);border-color:var(--line)}
${scope} :is(.asset-card,.project-item.active,.project-item:hover,.icon-button,.secondary-button,.search-box,.sort-control,.column-control,.category-chips button,.kind-tabs button.active,.smart-group-tabs button.active){background:var(--card);color:var(--ink);border-color:var(--line)}
${scope} :is(.folder-row,.project-copy small,.sidebar-section-heading,.eyebrow,.category-chips button,.kind-tabs button,.smart-group-tabs button){color:var(--muted)}
${scope} :is(.primary-button,.project-item.active .project-avatar){background:var(--accent);color:var(--dsw-alias-label-primary-inverted)}
${scope} .danger-button{background:var(--danger);color:var(--dsw-alias-label-primary-inverted)}
${scope} :is(input,textarea,select){color:var(--ink);background-color:var(--surface)}
${scope} :is(.privacy-note,.local-rule-note,.scan-state){color:var(--success);background:var(--accent-soft);border-color:var(--line)}
${scope} :is([role="dialog"],[role="menu"],.asset-toolbar){background:var(--panel);color:var(--ink);border-color:var(--line)}
${buildReadableUiCss(scope)}
${buildAssetLibraryThemeCss(theme,p,scope)}
@media(prefers-reduced-motion:reduce){${scope} :is(.asset-card,.scan-state.busy::before){transition:none;animation:none}}
`;
    }

    /** Presentation is scoped to packaged same-origin plugin documents, recursively. */
    function createEmbeddedThemeSync(page) {
      const frames=new Map(),documents=new Map(),hostVariables=new Map();
      let selection=null,css='',resolved=null,reconciling=false,media=null;
      const MODE_ATTRIBUTE='data-aiyou-harness-mode';
      function allowed(value,baseURI=page.baseURI){
        try{const base=new URL(page.baseURI),url=new URL(value,baseURI);return url.protocol===base.protocol&&url.host===base.host&&/^\/aiyoucodex-dsh\/(?:(?:asset-console|taskboard)\/ui\/|canvas\/(?:ui|model-settings)\/)/u.test(url.pathname);}
        catch{return false;}
      }
      function restoreHost(){
        const style=page.documentElement.style;if(!style){hostVariables.clear();return;}
        for(const [key,entry]of hostVariables)if(style.getPropertyValue(key)===entry.owned){if(entry.previous)style.setProperty(key,entry.previous,entry.priority);else style.removeProperty(key);}
        hostVariables.clear();
      }
      function paintHost(){
        if(selection?.id!==SYSTEM_THEME_ID){restoreHost();return;}
        const style=page.documentElement.style;if(!style)return;
        for(const [key,value]of Object.entries(buildCanvasVariables(resolved))){
          const next=String(value);let entry=hostVariables.get(key);
          if(!entry){entry={previous:style.getPropertyValue(key),priority:style.getPropertyPriority(key),owned:next};hostVariables.set(key,entry);}
          entry.owned=next;if(style.getPropertyValue(key)!==next)style.setProperty(key,next);
        }
      }
      function releaseDocument(entry){
        entry.style?.remove();entry.style=null;
        if(entry.doc?.documentElement.getAttribute(THEME_ATTRIBUTE)===entry.id){if(entry.previous===null)entry.doc.documentElement.removeAttribute(THEME_ATTRIBUTE);else entry.doc.documentElement.setAttribute(THEME_ATTRIBUTE,entry.previous);}
        if(entry.doc?.documentElement.getAttribute(MODE_ATTRIBUTE)===entry.mode){if(entry.previousMode===null)entry.doc.documentElement.removeAttribute(MODE_ATTRIBUTE);else entry.doc.documentElement.setAttribute(MODE_ATTRIBUTE,entry.previousMode);}
        entry.doc=null;
      }
      function paint(frame,entry){
        let doc;try{doc=frame.contentDocument;}catch{return null;}
        if(!doc?.head||!allowed(doc.URL||doc.baseURI)){releaseDocument(entry);return null;}
        if(entry.doc!==doc){
          releaseDocument(entry);entry.doc=doc;entry.previous=doc.documentElement.getAttribute(THEME_ATTRIBUTE);entry.previousMode=doc.documentElement.getAttribute(MODE_ATTRIBUTE);
          entry.style=doc.createElement('style');entry.style.dataset.plugin=OVERRIDE_SOURCE;entry.style.dataset.pluginCss=STYLE_TAG_ID+'/embedded';doc.head.appendChild(entry.style);
        }
        if(entry.style.isConnected===false||('parentNode' in entry.style&&entry.style.parentNode!==doc.head))doc.head.appendChild(entry.style);
        if(entry.style.textContent!==css)entry.style.textContent=css;
        entry.id=selection.id;entry.mode=resolved.mode;
        if(doc.documentElement.getAttribute(THEME_ATTRIBUTE)!==entry.id)doc.documentElement.setAttribute(THEME_ATTRIBUTE,entry.id);
        if(doc.documentElement.getAttribute(MODE_ATTRIBUTE)!==entry.mode)doc.documentElement.setAttribute(MODE_ATTRIBUTE,entry.mode);
        return doc;
      }
      function refresh(){
        if(!selection)return;
        resolved=selection.id===SYSTEM_THEME_ID?resolveSystemTheme(page,selection.detail?.configuration||{}):selection.detail;
        css=buildEmbeddedThemeCss(resolved);paintHost();
      }
      function observe(doc){
        if(documents.has(doc))return;
        const Observer=doc.defaultView?.MutationObserver;
        if(!Observer){documents.set(doc,null);return;}
        const observer=new Observer(records=>{
          if(!selection||reconciling)return;
          if(selection.id===SYSTEM_THEME_ID&&doc===page){
            const host=page.querySelector?.('._6Qf49G_frame')||page.documentElement;
            const relevant=!records||records.some(record=>record.type!=='attributes'||record.target===page.documentElement||record.target?.contains?.(host));
            if(relevant)refresh();
          }
          reconcile();
        });
        observer.observe(doc.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:doc===page?['src','srcdoc','data-ds-dark-theme','data-theme','data-color-scheme','class','style']:['src','srcdoc']});documents.set(doc,observer);
      }
      function reconcile(){
        if(!selection||reconciling)return;reconciling=true;
        const present=new Set(),visited=new Set();
        try{
          const visit=doc=>{
            if(visited.has(doc))return;visited.add(doc);observe(doc);
            for(const frame of doc.querySelectorAll('iframe')){
              if(frame.getAttribute('srcdoc')!==null||!allowed(frame.getAttribute('src'),doc.baseURI))continue;
              present.add(frame);let entry=frames.get(frame);
              if(!entry){entry={doc:null,style:null,previous:null,previousMode:null,id:null,mode:null,load:()=>{refresh();reconcile();}};frames.set(frame,entry);frame.addEventListener('load',entry.load);}
              const child=paint(frame,entry);if(child)visit(child);
            }
          };
          visit(page);
          for(const [frame,entry]of frames)if(!present.has(frame)){frame.removeEventListener('load',entry.load);releaseDocument(entry);frames.delete(frame);}
          for(const [doc,observer]of documents)if(!visited.has(doc)){observer?.disconnect();documents.delete(doc);}
        }finally{reconciling=false;}
      }
      function clear(){
        for(const observer of documents.values())observer?.disconnect();documents.clear();
        for(const [frame,entry]of frames){frame.removeEventListener('load',entry.load);releaseDocument(entry);}
        frames.clear();restoreHost();media?.removeEventListener?.('change',changed);media=null;selection=null;css='';resolved=null;
      }
      function changed(){refresh();reconcile();}
      return {
        set(value){
          selection=value;
          if(value.id!==SYSTEM_THEME_ID&&!value.detail)throw Error('插件主题数据缺失');
          if(!media&&page.defaultView?.matchMedia){media=page.defaultView.matchMedia('(prefers-color-scheme: dark)');media.addEventListener?.('change',changed);}
          refresh();reconcile();
        },
        dispose:clear,
      };
    }

    /** Original H.264 art played as a silent ambient loop. No chat/task hooks,
     * send/click listeners, state writes or business actions are registered. */
    function createMotionBackground(page){
      let current=null,video=null,frame=null,observer=null,reduced=null,listening=false,signature='',failed=false;
      const stop=()=>{
        if(video){video.pause();video.removeEventListener('loadeddata',ready);video.removeEventListener('error',failure);video.removeAttribute('src');video.load();video.remove();video=null;}
        frame?.removeAttribute('data-aiyou-video-ready');frame=null;
      };
      function failure(){failed=true;stop();}
      function ready(){
        const target=video;if(!target)return;
        Promise.resolve(target.play()).then(()=>{if(video===target&&frame)frame.setAttribute('data-aiyou-video-ready','');}).catch(()=>{if(video===target)failure();});
      }
      function update(){
        if(!current||failed||page.hidden||reduced?.matches||!current.configuration?.motion||current.background?.type!=='video'||!current.background?.videoUrl){stop();return;}
        const host=page.querySelector?.('._6Qf49G_frame');if(!host){stop();return;}
        if(frame!==host)stop();
        if(!video){
          frame=host;video=page.createElement('video');video.setAttribute('data-aiyou-theme-video','');video.setAttribute('aria-hidden','true');video.setAttribute('muted','');video.setAttribute('playsinline','');video.tabIndex=-1;video.muted=true;video.defaultMuted=true;video.playsInline=true;video.loop=true;video.preload='auto';video.controls=false;
          video.poster=`${API}/media?id=${encodeURIComponent(current.id)}`;
          video.addEventListener('loadeddata',ready);video.addEventListener('error',failure);
          // Identity and slot are constructed locally, independent of imported URLs.
          video.src=`${API}/media?id=${encodeURIComponent(current.id)}&slot=loop`;frame.appendChild(video);video.load();
        }
        Object.assign(video.style,{objectFit:current.background.fit||'cover',objectPosition:`${current.background.x}% ${current.background.y}%`,opacity:String(current.background.opacity)});
      }
      function clear(){stop();observer?.disconnect();observer=null;if(listening){page.removeEventListener('visibilitychange',update);reduced?.removeEventListener('change',update);}listening=false;reduced=null;current=null;signature='';failed=false;}
      return {
        set(theme){
          if(!page.querySelector)return;
          const nextSignature=`${theme.id}:${theme.configuration?.motion}:${theme.background?.type}`;
          if(signature!==nextSignature){stop();failed=false;signature=nextSignature;}current=theme;
          if(!listening){reduced=page.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')||null;page.addEventListener('visibilitychange',update);reduced?.addEventListener('change',update);listening=true;
            const Observer=page.defaultView?.MutationObserver;if(Observer){observer=new Observer(update);observer.observe(page.documentElement,{childList:true,subtree:true});}}
          update();
        },dispose:clear,
      };
    }

    function createThemeController(ctx, page = document) {
      let tokenDispose = null;
      let style = null;
      let activeId = null;
      let owner = null;
      let saved = null,hostRevision=-1;
      let disposed = false;
      let revision = 0;
      const root = page.documentElement;
      const previousAttribute = root.getAttribute(THEME_ATTRIBUTE),previousMode=root.getAttribute('data-aiyou-harness-mode');
      const embedded = createEmbeddedThemeSync(page);
      const motion = createMotionBackground(page);
      function clear() {
        if (typeof tokenDispose === 'function') tokenDispose();
        tokenDispose = null;
        style?.remove();style = null;
        if (activeId !== null && root.getAttribute(THEME_ATTRIBUTE) === activeId) {
          if (previousAttribute === null) root.removeAttribute(THEME_ATTRIBUTE);
          else root.setAttribute(THEME_ATTRIBUTE, previousAttribute);
        }
        if(activeId!==null){if(previousMode===null)root.removeAttribute('data-aiyou-harness-mode');else root.setAttribute('data-aiyou-harness-mode',previousMode);}
        activeId = null;
        embedded.dispose();
        motion.dispose();
      }
      function render(selection, nextOwner) {
        if (disposed) return false;
        if (selection.id === SYSTEM_THEME_ID) {clear();embedded.set(selection);}
        else {
          if (!selection.detail || selection.detail.id !== selection.id) throw new Error('主题数据缺失或不匹配');
          const built = buildTokens(selection.detail);
          const css = buildThemeSurfaceCss(selection.detail, built.palette);
          const dispose = ctx.theme.overrideTokens(OVERRIDE_SOURCE, built.tokens);
          if (typeof tokenDispose === 'function') tokenDispose();
          tokenDispose = dispose;
          if (!style) {
            style = page.createElement('style');
            style.dataset.plugin = OVERRIDE_SOURCE;
            style.dataset.pluginCss = STYLE_TAG_ID;
            page.head.appendChild(style);
          }
          style.textContent = css;
          root.setAttribute(THEME_ATTRIBUTE, selection.id);root.setAttribute('data-aiyou-harness-mode',selection.detail.mode);
          activeId = selection.id;
          embedded.set(selection);
          motion.set(selection.detail);
        }
        owner = nextOwner;
        revision += 1;
        return true;
      }
      return {
        get revision() { return revision; },
        get saved() { return saved; },
        get hostRevision() { return hostRevision; },
        get hasPreview() { return owner!==null; },
        systemTheme(configuration={}) { return resolveSystemTheme(page,configuration); },
        commit(selection) { if(Number.isSafeInteger(selection.hostRevision)&&selection.hostRevision<hostRevision)return false;if(render(selection,null)){saved=selection;if(Number.isSafeInteger(selection.hostRevision))hostRevision=selection.hostRevision;return true;}return false; },
        preview(selection, key) { render(selection, key); },
        recordSaved(selection) { if(!disposed&&(!Number.isSafeInteger(selection.hostRevision)||selection.hostRevision>=hostRevision)){saved=selection;if(Number.isSafeInteger(selection.hostRevision))hostRevision=selection.hostRevision;} },
        cancel(key) { if (owner === key) render(saved ?? { id: SYSTEM_THEME_ID, detail: null }, null); },
        dispose() { if (disposed) return;disposed = true;clear();owner = null;saved = null; },
      };
    }

    /** Previews are local. Explicit saves use a host revision and per-theme settings. */
    function createThemeSession(controller, request = fetch) {
      const owner = {};
      let state=null,draft=null,sequence=0,closed=false,saving=false,closedRevision=null;
      const details=new Map(),drafts=new Map();
      async function read(url,options){const response=await request(url,options);const value=await response.json();if(!response.ok)throw new Error(value?.error||`HTTP ${response.status}`);return value;}
      const prepared=(id,detail,system=state?.systemConfiguration||{},hostRevision=state?.revision)=>({id,hostRevision,detail:id===SYSTEM_THEME_ID?controller.systemTheme(system):configureTheme(detail.base||detail,detail.configuration||{})});
      const comparable=selection=>JSON.stringify([selection?.id,selection?.id===SYSTEM_THEME_ID?selection.detail?.configuration?.canvas||null:selection?.detail?.configuration||null]);
      const snapshot=()=>state&&({...state,savedId:controller.saved?.id??state.active,draftId:draft?.id??state.active,previewDetail:draft?.detail??null,dirty:comparable(draft)!==comparable(controller.saved)});
      const presentDraft=()=>{if(controller.saved&&comparable(draft)===comparable(controller.saved)){draft=controller.saved;controller.commit(draft);}else controller.preview(draft,owner);};
      return {
        snapshot,
        async load(){const ticket=++sequence,value=await read(API,{cache:'no-store'});if(closed||ticket!==sequence)return null;state=value;draft=prepared(value.active,value.detail);details.clear();drafts.clear();details.set(draft.id,draft.detail);controller.commit(draft);return snapshot();},
        async preview(id){
          const ticket=++sequence;
          if(draft)drafts.set(draft.id,draft);
          const detail=id===SYSTEM_THEME_ID?null:details.has(id)?details.get(id):await read(`${API}/detail?id=${encodeURIComponent(id)}`,{cache:'no-store'});
          if(closed||ticket!==sequence)return null;
          details.set(id,detail);draft=drafts.get(id)||prepared(id,detail);presentDraft();return snapshot();
        },
        edit(patch){
          if(closed||!draft?.detail)return snapshot();sequence+=1;
          const previous=draft.detail.configuration,base=draft.detail.base;
          if(draft.id===SYSTEM_THEME_ID&&Object.keys(patch).some(key=>key!=='canvas'))throw Error('系统默认仅支持画布配置');
          const options={...previous,...patch,alpha:{...previous.alpha,...patch.alpha},colors:{...previous.colors,...patch.colors},background:{...previous.background,...patch.background},canvas:{...previous.canvas,...patch.canvas,colors:{...previous.canvas.colors,...patch.canvas?.colors},opacity:{...previous.canvas.opacity,...patch.canvas?.opacity},background:{...previous.canvas.background,...patch.canvas?.background}}};
          draft={id:draft.id,detail:configureTheme(base,options)};drafts.set(draft.id,draft);presentDraft();return snapshot();
        },
        reset(){if(!draft?.detail)return snapshot();const defaults=defaultConfiguration(draft.detail.base);return this.edit(draft.id===SYSTEM_THEME_ID?{canvas:defaults.canvas}:defaults);},
        cancel(){sequence+=1;controller.cancel(owner);draft=controller.saved;drafts.clear();return snapshot();},
        async save(){
          if(!draft||closed)return null;if(saving)throw new Error('配置正在保存');saving=true;
          const selection=draft,ticket=++sequence;
          try{
            const value=await read(`${API}/select`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id:selection.id,...(selection.detail?{options:selection.id===SYSTEM_THEME_ID?{canvas:selection.detail.configuration.canvas}:selection.detail.configuration}:{}),...(state.revision!==undefined?{ifRevision:state.revision}:{})})});
            const persisted=prepared(value.active,value.detail,value.systemConfiguration||state?.systemConfiguration||{},value.revision);
            if(closed){controller.recordSaved(persisted);if(controller.revision===closedRevision)controller.commit(persisted);return null;}
            state={...state,active:value.active,detail:value.detail,revision:value.revision,systemConfiguration:value.systemConfiguration||state?.systemConfiguration};
            if(ticket===sequence){draft=persisted;controller.commit(persisted);details.set(draft.id,draft.detail);drafts.delete(draft.id);}else controller.recordSaved(persisted);
            return snapshot();
          }finally{saving=false;}
        },
        dispose(){closed=true;sequence+=1;controller.cancel(owner);closedRevision=controller.revision;},
      };
    }

    /** Saved selections propagate between host windows; previews stay local. */
    function createThemeRemoteSync(controller,request=fetch,page=document){
      let disposed=false,busy=false,lastRevision=-1,lastError='';
      const abort=new AbortController();
      const comparable=value=>JSON.stringify([value?.id,value?.id===SYSTEM_THEME_ID?value?.detail?.configuration?.canvas:value?.detail?.configuration]);
      async function read(url){const response=await request(url,{cache:'no-store',signal:abort.signal}),value=await response.json();if(!response.ok)throw Error(value.error||'主题同步失败');return value;}
      async function refresh(){
        if(disposed||busy)return;busy=true;
        try{
          const status=await read(API+'/state');if(disposed||status.revision===lastRevision||status.revision<controller.hostRevision)return;
          const value=await read(API);if(disposed||value.revision<controller.hostRevision)return;
          const selection={id:value.active,detail:value.active===SYSTEM_THEME_ID?controller.systemTheme(value.systemConfiguration||{}):value.detail,hostRevision:value.revision};
          const changed=comparable(selection)!==comparable(controller.saved),hadSaved=Boolean(controller.saved),preservePreview=controller.hasPreview;
          if(changed&&!controller.hasPreview)controller.commit(selection);else controller.recordSaved(selection);
          lastRevision=value.revision;lastError='';
          if(changed&&hadSaved)page.defaultView?.dispatchEvent?.(new CustomEvent('dsh-theme-saved',{detail:{revision:value.revision,preservePreview}}));
        }catch(error){if(!disposed&&error.name!=='AbortError'&&error.message!==lastError){lastError=error.message;console.warn('[AIYOU theme]',error.message);}}
        finally{busy=false;}
      }
      const focus=()=>void refresh(),timer=setInterval(focus,1500);
      page.defaultView?.addEventListener?.('focus',focus);page.addEventListener?.('visibilitychange',focus);const ready=refresh();
      return {ready,refresh,dispose(){disposed=true;abort.abort();clearInterval(timer);page.defaultView?.removeEventListener?.('focus',focus);page.removeEventListener?.('visibilitychange',focus);}};
    }

    // ---------- theme switcher panel ----------
    function ThemePanel({section:requestedSection=''}={}) {
      const [state, setState] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [busy, setBusy] = React.useState(false);
      const session = React.useRef(null);
      const mounted = React.useRef(false);
      const canvasSettings=React.useRef(null);
      const perform = React.useCallback(async (action) => {
        setBusy(true);
        setError(null);
        try {
          const value = await action();
          if (mounted.current && value) setState(value);
        } catch (failure) {
          if (mounted.current) setError(String(failure?.message ?? failure));
        } finally {
          if (mounted.current) setBusy(false);
        }
      }, []);
      React.useEffect(() => {
        mounted.current = true;
        if (!themeController) { setError('宿主主题服务未就绪');return () => { mounted.current = false; }; }
        const current = createThemeSession(themeController);
        session.current = current;
        void perform(() => current.load());
        const external=event=>{if(event.detail?.preservePreview)setError('主题已在其他窗口更新；取消预览可使用最新设置，保存前请先刷新。');else void perform(()=>current.load());};
        window.addEventListener('dsh-theme-saved',external);
        return () => { mounted.current = false;window.removeEventListener('dsh-theme-saved',external);current.dispose();if (session.current === current) session.current = null; };
      }, [perform]);
      const showCanvas=()=>canvasSettings.current?.scrollIntoView?.({block:'start',behavior:'auto'});
      React.useEffect(()=>{if(requestedSection==='canvas')showCanvas();},[requestedSection,Boolean(state?.previewDetail)]);
      React.useEffect(()=>{window.addEventListener('dsh-theme-show-canvas-settings',showCanvas);return()=>window.removeEventListener('dsh-theme-show-canvas-settings',showCanvas);},[]);
      const load = () => session.current && perform(() => session.current.load());
      const preview = (id) => !busy && session.current && perform(() => session.current.preview(id));
      const save = () => session.current && perform(() => session.current.save());
      const cancel = () => { if (session.current) { setState(session.current.cancel());setError(null); } };
      const dirty = state !== null && state.dirty;
      const edit = patch => {if(session.current&&!busy){setState(session.current.edit(patch));setError(null);}};
      const reset = () => {if(session.current&&!busy)setState(session.current.reset());};

      const S = {
        root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
        header: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 12px 8px' },
        h1: { fontSize: '14px', fontWeight: 600, margin: 0, flex: 1 },
        body: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' },
        card: { padding: '10px 12px', borderRadius: 'var(--dsw-radius-lg)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer' },
        name: { fontSize: '13px', fontWeight: 600 },
        meta: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
        swatches: { display: 'flex', gap: '4px' },
        btn: { padding: '4px 10px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l4)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      };

      const swatch = (color) => h('span', { style: { width: '14px', height: '14px', borderRadius: '4px', background: color, border: '1px solid var(--dsw-alias-border-l2)' } });
      const paletteOf = (theme) => {
        const prim = theme?.primitives ?? {};
        const sem = theme?.semantic ?? {};
        const at = (role) => (sem[role] ? prim[sem[role]] : undefined);
        return [at('bg'), at('surface'), at('accent'), at('text')].filter(Boolean);
      };
      const selected=state?.previewDetail,configuration=selected?.configuration;
      const field={display:'grid',gridTemplateColumns:'minmax(100px,1fr) minmax(100px,1.5fr) 42px',alignItems:'center',gap:'8px',fontSize:'12px',padding:'5px 0'};
      const group={border:'1px solid var(--dsw-alias-border-l2)',borderRadius:'12px',padding:'10px 12px',minWidth:0};
      const alphaLabels={overall:'全部表面',chrome:'顶部栏',sidebar:'会话栏',chat:'聊天底层',panel:'右侧面板',card:'卡片',message:'收发气泡',composer:'输入框内部','composer-area':'输入框外层',control:'按钮控件',menu:'菜单',text:'文字',border:'边框',shadow:'阴影'};
      const colorLabels={primary:'主要文字',secondary:'辅助文字',link:'链接',success:'完成',danger:'错误',warning:'提醒',inverse:'反色文字',bg:'整体底色',surface:'表面底色',elevated:'卡片底色',border:'边框',userBg:'用户气泡',accent:'强调色'};
      const slider=(label,value,change,disabled=false)=>h('label',{style:field},h('span',null,label),h('input',{type:'range',min:0,max:100,step:1,value,disabled:busy||disabled,'aria-label':label,onChange:event=>change(Number(event.target.value))}),h('output',{style:{fontVariantNumeric:'tabular-nums',textAlign:'right'}},`${Math.round(value)}%`));
      const section=(title,children,open=true,props={})=>h('details',{style:group,open,...props},h('summary',{style:{fontWeight:600,cursor:'pointer',marginBottom:'8px'}},title),...children);
      const canvas=configuration?.canvas;
      const canvasColorLabels={bg:'画布背景',node:'画布节点',panel:'画布面板',text:'画布文字',muted:'画布辅助文字',border:'画布边框',accent:'画布强调',grid:'画布网格',edge:'画布连线'};
      const canvasOpacityLabels={bg:'画布背景',node:'画布节点',panel:'画布面板',toolbar:'画布工具栏'};
      const canvasUi=canvas?section('画布与自由工具',[
        h('p',{style:{...S.meta,marginTop:0}},'统一画布、创作工具和相关弹层的界面外观；原图、视频、3D画面与导出结果的颜色保持不变。'),
        h('label',{style:{...field,gridTemplateColumns:'1fr auto'}},'画布配色跟随主题',h('input',{type:'checkbox',checked:canvas.followTheme,disabled:busy,'aria-label':'画布配色跟随主题',onChange:event=>edit({canvas:{followTheme:event.target.checked}})})),
        section('画布配色',Object.entries(canvasColorLabels).map(([key,label])=>h('label',{key,style:{...field,gridTemplateColumns:'minmax(0,1fr) 36px 88px'}},h('span',null,label),h('input',{type:'color',value:canvas.colors[key],disabled:busy||canvas.followTheme,'aria-label':label+'颜色',style:{width:32,height:26,border:0,padding:0,background:'transparent'},onChange:event=>edit({canvas:{colors:{[key]:event.target.value}}})}),h('input',{type:'text',key:canvas.colors[key],defaultValue:canvas.colors[key],disabled:busy||canvas.followTheme,'aria-label':label+' HEX',maxLength:7,spellCheck:false,style:{...S.btn,fontFamily:'monospace',width:88,boxSizing:'border-box'},onBlur:event=>{if(/^#[0-9a-f]{6}$/iu.test(event.target.value))edit({canvas:{colors:{[key]:event.target.value}}});else{event.target.value=canvas.colors[key];setError('颜色须为 #RRGGBB');}}}))),false),
        ...Object.entries(canvasOpacityLabels).map(([key,label])=>h(React.Fragment,{key},slider(label+'透明度',100*(1-canvas.opacity[key]),value=>edit({canvas:{opacity:{[key]:1-value/100}}})))),
        h('p',{style:S.meta},'透明度仅作用于底色，文字与素材不透明。0% 为实色，100% 为完全透明。'),
        h('label',{style:{...field,gridTemplateColumns:'1fr 1.5fr'}},'画布背景模式',h('select',{value:canvas.background.mode,disabled:busy,'aria-label':'画布背景模式',style:S.btn,onChange:event=>edit({canvas:{background:{mode:event.target.value}}})},h('option',{value:'theme',disabled:!selected.background},'主题背景图'),h('option',{value:'solid'},'主题底色'),h('option',{value:'transparent'},'透明背景'))),
        slider('画布背景图强度',canvas.background.opacity*100,value=>edit({canvas:{background:{opacity:value/100}}}),canvas.background.mode!=='theme'||!selected.background),
        h('label',{style:{...field,gridTemplateColumns:'1fr 1.5fr'}},'画布背景显示方式',h('select',{value:canvas.background.fit,disabled:busy||canvas.background.mode!=='theme','aria-label':'画布背景显示方式',style:S.btn,onChange:event=>edit({canvas:{background:{fit:event.target.value}}})},h('option',{value:'cover'},'铺满'),h('option',{value:'contain'},'完整显示'))),
        slider('画布背景水平位置',canvas.background.x,value=>edit({canvas:{background:{x:value}}}),canvas.background.mode!=='theme'),
        slider('画布背景垂直位置',canvas.background.y,value=>edit({canvas:{background:{y:value}}}),canvas.background.mode!=='theme'),
        h('label',{style:{...field,gridTemplateColumns:'1fr 1.5fr'}},'画布网格',h('select',{value:canvas.background.grid,disabled:busy,'aria-label':'画布网格',style:S.btn,onChange:event=>edit({canvas:{background:{grid:event.target.value}}})},h('option',{value:'dots'},'圆点'),h('option',{value:'lines'},'线格'),h('option',{value:'none'},'隐藏'))),
        h('label',{style:field},h('span',null,'画布网格间距'),h('input',{type:'range',min:8,max:80,step:1,value:canvas.background.gridSize,disabled:busy||canvas.background.grid==='none','aria-label':'画布网格间距',onChange:event=>edit({canvas:{background:{gridSize:Number(event.target.value)}}})}),h('output',null,canvas.background.gridSize+'px')),
        slider('画布网格强度',canvas.background.gridOpacity*100,value=>edit({canvas:{background:{gridOpacity:value/100}}}),canvas.background.grid==='none'),
      ],true,{ref:canvasSettings,'data-dsh-canvas-theme-settings':true}):null;
      const configurationUi=configuration?[
        state.draftId===SYSTEM_THEME_ID?null:section('背景与动态',[
          h('p',{style:{...S.meta,margin:'4px 0 10px'}},selected.background?.animated?'原机甲 H.264 视频循环，真实视频画面；当前不随发送、运行或完成状态切换。':'本主题使用静态背景。未提供视频素材时不会把平移图片当作视频。'),
          h('label',{style:{...field,gridTemplateColumns:'1fr auto'}},'播放动态背景',h('input',{type:'checkbox',checked:configuration.motion,disabled:busy||!selected.background?.animated,'aria-label':'播放动态背景',onChange:event=>edit({motion:event.target.checked})})),
          h('label',{style:{...field,gridTemplateColumns:'1fr 1.5fr'}},'背景模式',h('select',{value:configuration.background.type,disabled:busy,'aria-label':'背景模式',style:S.btn,onChange:event=>edit({background:{type:event.target.value}})},h('option',{value:'image'},'静态图片'),selected.background?.animated?h('option',{value:'video'},'原主题视频循环'):null)),
          h('label',{style:{...field,gridTemplateColumns:'1fr 1.5fr'}},'显示方式',h('select',{value:configuration.background.fit,disabled:busy,'aria-label':'背景显示方式',style:S.btn,onChange:event=>edit({background:{fit:event.target.value}})},h('option',{value:'cover'},'铺满（可能裁切）'),h('option',{value:'contain'},'完整（可能留边）'))),
          slider('背景显现强度',configuration.background.opacity*100,value=>edit({background:{opacity:value/100}})),
          slider('背景水平位置',configuration.background.x,value=>edit({background:{x:value}})),
          slider('背景垂直位置',configuration.background.y,value=>edit({background:{y:value}})),
          h('p',{style:{...S.meta,marginBottom:0}},'减少动态效果、窗口隐藏或播放失败时自动回退静态图。背景静音，不拦截聊天操作。'),
        ]),
        state.draftId===SYSTEM_THEME_ID?null:section('分层透明度',[
          h('p',{style:{...S.meta,marginTop:0}},'0% 为实色，100% 为完全透明；输入框内部与外层单独控制。'),
          ...Object.entries(alphaLabels).map(([key,label])=>h(React.Fragment,{key},slider(`${label}透明度`,100*(1-configuration.alpha[key]),value=>edit({alpha:{[key]:1-value/100}})))),
        ]),
        state.draftId===SYSTEM_THEME_ID?null:section('配色',Object.entries(colorLabels).map(([key,label])=>h('label',{key,style:{...field,gridTemplateColumns:'1fr 36px 88px'}},h('span',null,label),h('input',{type:'color',value:configuration.colors[key],disabled:busy,'aria-label':`${label}颜色`,style:{width:'32px',height:'26px',border:0,padding:0,background:'transparent'},onChange:event=>edit({colors:{[key]:event.target.value}})}),h('input',{type:'text',key:configuration.colors[key],defaultValue:configuration.colors[key],disabled:busy,'aria-label':`${label} HEX`,maxLength:7,spellCheck:false,style:{...S.btn,fontFamily:'monospace',width:'88px',boxSizing:'border-box'},onBlur:event=>{if(/^#[0-9a-f]{6}$/iu.test(event.target.value))edit({colors:{[key]:event.target.value}});else{event.target.value=configuration.colors[key];setError('颜色须为 #RRGGBB');}}}))),false),
        canvasUi,
        h('p',{style:S.meta},'自定义颜色与透明度会改变实际对比度，请结合背景检查文字可读性。配置保存在当前主题名下，切换主题不会覆盖其他主题的设置。'),
        h('button',{type:'button',style:S.btn,disabled:busy,onClick:reset},'恢复本主题默认设置'),
      ]:[];

      return h('div', { style: S.root },
        h('div', { style: S.header },
          h('h1', { style: S.h1 }, '主题与动效配置'),
          h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void load() }, '刷新'),
        ),
        h('div', { style: S.body },
          h('div', { style: S.meta }, '点选预览；保存后会在下次打开时继续使用。取消或关闭面板会恢复已保存的主题。'),
          error ? h('div', { style: S.card }, h('div', { style: S.name }, '失败'), h('div', { style: S.meta }, error)) : null,
          state === null && !error ? h('div', { style: S.meta }, '正在读取主题…') : null,
          h('label',{style:{...S.meta,display:'flex',flexDirection:'column',gap:'6px'}},'界面主题',h('select',{'aria-label':'界面主题',value:state?.draftId||'',disabled:busy||!state,style:S.btn,onChange:event=>void preview(event.target.value)},...(state?.themes??[]).map(entry=>h('option',{key:entry.id,value:entry.id},entry.label)))),
          ...(state?.themes ?? []).filter(entry=>entry.id===state.draftId).map((entry) => {
            const active = entry.id === state.draftId;
            return h('div', {
              key: entry.id,
              // Structural marker so the render test can count cards instead of
              // guessing from text — the same rule that fixed the taskboard probe.
              'data-aiyoucodex-theme': entry.id,
              style: { ...S.card, borderColor: active ? 'var(--dsw-alias-brand-primary)' : 'var(--dsw-alias-border-l2)' },
              role: 'button',
              'aria-pressed': active,
              'aria-disabled': busy,
              tabIndex: busy ? -1 : 0,
              onClick: () => void preview(entry.id),
              onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  void preview(entry.id);
                }
              },
            },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                h('span', { style: S.name }, entry.id === 'crayon-shinchan-four-scenes-xixi' ? '小新相册配色·浠浠' : entry.label),
                active ? h('span', { style: { ...S.meta, color: 'var(--dsw-alias-brand-primary)' } }, dirty ? '预览中' : '使用中') : null,
              ),
              h('div', { style: S.swatches }, ...paletteOf(state.previewDetail?.id === entry.id ? state.previewDetail : null).map((c, i) => h(React.Fragment, { key: i }, swatch(c)))),
              h('div', { style: S.meta }, entry.mode === 'system' ? '沿用宿主外观设置' : `${entry.mode === 'dark' ? '深色' : '浅色'} · ${entry.backgroundNote || '主体材质'}`),
            );
          }),
          ...configurationUi,
        ),
        h('div', { style: { ...S.header, borderTop: '1px solid var(--dsw-alias-border-l2)', padding: '10px 12px' } },
          h('span', { role: 'status', style: { ...S.meta, flex: 1 } }, busy ? '正在处理…' : dirty ? '尚未保存' : state ? '已保存' : ''),
          h('button', { type: 'button', style: S.btn, disabled: busy || !dirty, onClick: cancel }, '取消预览'),
          h('button', { type: 'button', style: S.btn, disabled: busy || !dirty, onClick: () => void save() }, '保存'),
        ),
      );
    }

    function ThemeTab({useTabInfo}){const {tab}=useTabInfo();return h(ThemePanel,{section:tab.navigation.params?.section||''});}
    let themeController = null;
    return {
      inject: ['slots','sidebarRightTabs','theme','sidebarRight','layout'],
      apply(ctx) {
        ctx.effect(() => {
          const controller = createThemeController(ctx);
          themeController = controller;
          controller.commit({id:SYSTEM_THEME_ID,detail:controller.systemTheme()});
          const remote=createThemeRemoteSync(controller);
          return () => {remote.dispose();controller.dispose();if(themeController===controller)themeController=null;};
        }, 'theme:selection');
        ctx.effect(()=>{const open=event=>{if(event.detail?.section!=='canvas')return;ctx.layout.selectPanel(null);ctx.sidebarRight.openTab(KIND,{revealIfOpened:true,params:{section:'canvas'}});ctx.layout.openRightbar(true,false);window.dispatchEvent(new CustomEvent('dsh-theme-show-canvas-settings'));};window.addEventListener('dsh-open-theme-settings',open);return()=>window.removeEventListener('dsh-open-theme-settings',open);},'theme:canvas-settings');
        ctx.effect(() => ctx.sidebarRightTabs.register({id:TYPE_ID,kind:KIND,title:()=> '主题配置',guide:[{id:'open',order:80,title:()=> '主题配置',description:()=> '配置配色、透明度、背景与动态，或恢复系统默认外观'}]}), 'theme:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab',()=>ctx.slots.register({name:'sidebar.right.pane.tab',key:TYPE_ID},ThemeTab)), 'theme:panel');
      }
    };
  },
});
