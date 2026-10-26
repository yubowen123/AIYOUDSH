export const ALPHA_KEYS=['overall','chrome','sidebar','chat','panel','card','message','composer','composer-area','control','menu','text','border','shadow','decoration','image'];
export const COLOR_KEYS=['primary','secondary','link','success','danger','warning','inverse','bg','surface','elevated','border','userBg','accent'];
export const CANVAS_COLOR_KEYS=['bg','node','panel','text','muted','border','accent','grid','edge'];
export const CANVAS_OPACITY_KEYS=['bg','node','panel','toolbar'];
export const SYSTEM_PLUGIN_THEME={id:'system',label:'系统默认',mode:'light',primitives:{bg:'#ffffff',surface:'#f5f6f7',elevated:'#ffffff',text:'#17212b',muted:'#52606d',border:'#d6d9df',accent:'#b05d00',running:'#176aba',complete:'#23804a',error:'#b43232','user-bg':'#eff3f8'},semantic:{bg:'bg',surface:'surface',elevated:'elevated',text:'text',muted:'muted',border:'border',brand:'accent',accent:'accent',running:'running',complete:'complete',error:'error','user-bg':'user-bg'},controls:{},background:null};
const own=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
function colorValue(value){return typeof value==='string'&&/^#[0-9a-f]{6}$/iu.test(value);}
export function defaultCanvasConfiguration(colors,theme={}){
 return {followTheme:true,colors:{bg:colors.bg,node:colors.elevated,panel:colors.surface,text:colors.primary,muted:colors.secondary,border:colors.border,accent:colors.accent,grid:colors.border,edge:colors.accent},opacity:{bg:1,node:1,panel:1,toolbar:1},background:{mode:theme.background?'theme':'solid',opacity:0.15,fit:'cover',x:50,y:50,grid:'dots',gridSize:24,gridOpacity:0.22}};
}
export function normalizeCanvasConfiguration(value,colors,theme={}){
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
export function defaultConfiguration(theme){
 const c=role=>theme.primitives?.[theme.semantic?.[role]];
 const colors={primary:c('text'),secondary:c('muted'),link:c('running'),success:c('complete'),danger:c('error'),warning:c('accent'),inverse:c('elevated'),...theme.controls?.colors,bg:c('bg'),surface:c('surface'),elevated:c('elevated'),border:c('border'),userBg:c('user-bg'),accent:c('brand')||c('accent')};
 return {motion:Boolean(theme.background?.animated),alpha:Object.fromEntries(ALPHA_KEYS.map(key=>[key,Number.isFinite(theme.controls?.alpha?.[key])?theme.controls.alpha[key]:key==='chat'||key==='composer-area'?0:1])),colors,background:{type:theme.background?.animated?'video':'image',fit:theme.background?.fit||'cover',x:theme.background?.x??75,y:theme.background?.y??50,opacity:theme.background?.opacity??0.46},canvas:defaultCanvasConfiguration(colors,theme)};
}
export function normalizeConfiguration(value,theme){
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
export function normalizeSystemConfiguration(value={}){
 if(!object(value)||Object.keys(value).some(key=>key!=='canvas'))throw new Error('系统默认仅支持画布配置');
 return {canvas:normalizeConfiguration(value,SYSTEM_PLUGIN_THEME).canvas};
}
export function configureTheme(theme,value){
 const configuration=normalizeConfiguration(value||{},theme),primitives={...theme.primitives},semantic={...theme.semantic};
 for(const [key,role]of Object.entries({primary:'text',secondary:'muted',bg:'bg',surface:'surface',elevated:'elevated',border:'border',userBg:'user-bg',accent:'brand'})){
  primitives['custom-'+key.replace(/[A-Z]/gu,c=>'-'+c.toLowerCase())]=configuration.colors[key];semantic[role]='custom-'+key.replace(/[A-Z]/gu,c=>'-'+c.toLowerCase());
 }
 return {...theme,primitives,semantic,controls:{...theme.controls,colors:{...theme.controls?.colors,...configuration.colors},alpha:configuration.alpha},background:theme.background?{...theme.background,...configuration.background,motion:configuration.motion}:null,configuration,defaultConfiguration:defaultConfiguration(theme),base:theme};
}
