export const ALPHA_KEYS=['overall','chrome','sidebar','chat','panel','card','message','composer','composer-area','control','menu','text','border','shadow','decoration','image'];
export const COLOR_KEYS=['primary','secondary','link','success','danger','warning','inverse','bg','surface','elevated','border','userBg','accent'];
const own=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
export function defaultConfiguration(theme){
 const c=role=>theme.primitives?.[theme.semantic?.[role]];
 return {motion:Boolean(theme.background?.animated),alpha:Object.fromEntries(ALPHA_KEYS.map(key=>[key,Number.isFinite(theme.controls?.alpha?.[key])?theme.controls.alpha[key]:key==='chat'||key==='composer-area'?0:1])),
 colors:{primary:c('text'),secondary:c('muted'),link:c('running'),success:c('complete'),danger:c('error'),warning:c('accent'),inverse:c('elevated'),...theme.controls?.colors,bg:c('bg'),surface:c('surface'),elevated:c('elevated'),border:c('border'),userBg:c('user-bg'),accent:c('brand')||c('accent')},
 background:{type:theme.background?.animated?'video':'image',fit:theme.background?.fit||'cover',x:theme.background?.x??75,y:theme.background?.y??50,opacity:theme.background?.opacity??0.46}};
}
export function normalizeConfiguration(value,theme){
 if(!object(value))throw new Error('主题配置须为对象');
 for(const key of Object.keys(value))if(!['motion','alpha','colors','background'].includes(key))throw new Error('未知主题配置项：'+key);
 const output=defaultConfiguration(theme);
 if(own(value,'motion')){if(typeof value.motion!=='boolean')throw new Error('motion 必须为布尔值');output.motion=value.motion;}
 for(const [group,keys] of [['alpha',ALPHA_KEYS],['colors',COLOR_KEYS],['background',['type','fit','x','y','opacity']]]){
  if(!own(value,group))continue;if(!object(value[group]))throw new Error(group+' 须为对象');
  for(const [key,entry]of Object.entries(value[group])){
   if(!keys.includes(key))throw new Error('未知配置项：'+group+'.'+key);
   if(group==='colors'){if(!/^#[0-9a-f]{6}$/iu.test(entry))throw new Error('颜色须为六位 HEX');}
   else if(key==='type'){if(!['image','video'].includes(entry))throw new Error('背景模式无效');}
   else if(key==='fit'){if(!['cover','contain'].includes(entry))throw new Error('背景显示方式无效');}
   else {const max=['x','y'].includes(key)?100:1;if(!Number.isFinite(entry)||entry<0||entry>max)throw new Error(group+'.'+key+' 超出范围');}
   output[group][key]=entry;
  }
 }
 if(!theme.background?.animated)output.background.type='image';
 return output;
}
export function configureTheme(theme,value){
 const configuration=normalizeConfiguration(value||{},theme),primitives={...theme.primitives},semantic={...theme.semantic};
 for(const [key,role]of Object.entries({primary:'text',secondary:'muted',bg:'bg',surface:'surface',elevated:'elevated',border:'border',userBg:'user-bg',accent:'brand'})){
  primitives['custom-'+key.replace(/[A-Z]/gu,c=>'-'+c.toLowerCase())]=configuration.colors[key];semantic[role]='custom-'+key.replace(/[A-Z]/gu,c=>'-'+c.toLowerCase());
 }
 return {...theme,primitives,semantic,controls:{...theme.controls,colors:{...theme.controls?.colors,...configuration.colors},alpha:configuration.alpha},background:theme.background?{...theme.background,...configuration.background,motion:configuration.motion}:null,configuration,defaultConfiguration:defaultConfiguration(theme),base:theme};
}
