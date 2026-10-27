const $=id=>document.getElementById(id),query=new URLSearchParams(location.search);
const context=Object.fromEntries(['sessionId','projectId','panelId'].map(k=>[k,query.get(k)||'']));
let selected=null,config,busy=false;
const status=(text,error=false)=>{$('status').textContent=text;$('status').dataset.error=String(error);};
const defaultPreset=()=>config?.defaultMediaChannel;
const isDefaultService=()=>Boolean(defaultPreset()&&selected===defaultPreset().provider);
const modelCounts=catalog=>['image','video'].map(kind=>({kind,count:(catalog||[]).filter(row=>row.kind===kind).length})).filter(row=>row.count).map(row=>(row.kind==='image'?'图片':'视频')+' '+row.count+' 个').join('、');
function updateControls(){
 const automatic=isDefaultService();
 $('save').textContent=automatic?'校验 Key 并自动配置图/视频模型':'保存服务';
 $('catalog-refresh').textContent=automatic?'重新校验并更新图/视频模型':'核对模型目录';
 $('automatic-help').hidden=!automatic;$('service-name-label').hidden=automatic;$('connection-advanced').hidden=automatic;$('documentation-settings').hidden=automatic;$('manual-catalog').hidden=automatic;$('manual-defaults').hidden=automatic;$('test-only-option').hidden=automatic;$('clear-key-option').hidden=automatic;
 $('delete').disabled=busy||!selected||!config?.profiles?.[selected];
}
// Keep drafts in this document; switching services must never silently discard them.
const draftFields=['name','base-url','protocol','auth-type','auth-header','api-key','session-only','test-only','clear-key','docs-url','catalog','defaults'];
const draftSignature=()=>JSON.stringify([selected,...draftFields.map(id=>{const el=$(id);return el.type==='checkbox'?el.checked:el.value;})]);
let cleanSignature=draftSignature(),confirmation=null;
function updateDraft(){const dirty=cleanSignature!==draftSignature();$('draft-status').textContent=dirty?'有未保存的修改':'当前表单无未保存修改';$('draft-status').dataset.dirty=String(dirty);return dirty;}
function markClean(){cleanSignature=draftSignature();updateDraft();}
function confirmChange(title,message,label){
 if(confirmation)return Promise.resolve(false);
 const dialog=$('change-confirmation');$('confirmation-title').textContent=title;$('confirmation-message').textContent=message;$('confirmation-accept').textContent=label;
 return new Promise(resolve=>{const finish=value=>{dialog.close();confirmation=null;dialog.removeEventListener('cancel',cancel);$('confirmation-cancel').removeEventListener('click',no);$('confirmation-accept').removeEventListener('click',yes);resolve(value);},cancel=event=>{event.preventDefault();finish(false);},no=()=>finish(false),yes=()=>finish(true);confirmation=finish;dialog.addEventListener('cancel',cancel);$('confirmation-cancel').addEventListener('click',no);$('confirmation-accept').addEventListener('click',yes);dialog.showModal();});
}
async function changeService(action){if(busy)return;if(updateDraft()&&!await confirmChange('放弃未保存的修改？','切换或刷新会替换当前表单。你可以取消后先保存。','放弃修改'))return;await run(action);}
$('settings').addEventListener('input',updateDraft);$('settings').addEventListener('change',updateDraft);

async function invoke(command,args={}){
 const response=await fetch('/aiyoucodex-dsh/canvas/rpc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({command,args,...context})});
 const result=await response.json();if(!response.ok||!result.ok)throw new Error(result.error?.message||result.error||'请求未完成');return result.value;
}
async function run(action){if(busy)return;busy=true;for(const b of document.querySelectorAll('#settings button,#settings input,#settings select,#settings textarea,#services button,#new,#refresh,#default-channel-select'))b.disabled=true;try{await action();}catch(e){status(e.message,true);}finally{busy=false;for(const b of document.querySelectorAll('#settings button,#settings input,#settings select,#settings textarea,#services button,#new,#refresh,#default-channel-select'))b.disabled=false;updateControls();updateDraft();}}
function models(catalog){
 $('models').replaceChildren();
 for(const kind of ['image','video','audio','music']){
  const rows=(catalog||[]).filter(row=>row.kind===kind);if(!rows.length)continue;
  const group=document.createElement('details');group.open=rows.length<10;
  const title=document.createElement('summary');title.textContent=({image:'图片',video:'视频',audio:'配音',music:'音乐'})[kind]+' · '+rows.length+' 个模型';group.append(title);
  for(const row of rows){const div=document.createElement('div');div.className='model';div.textContent=(row.name||row.id)+' · '+row.id;group.append(div);}
  $('models').append(group);
 }
 if(!catalog?.length)$('models').textContent='尚未配置媒体模型，可从文档自动配置或手动填写。';
}
function discoveryReport(d){
 const counts={};for(const row of d.modelCatalog||[])counts[row.kind]=(counts[row.kind]||0)+1;
 const lines=Object.entries(counts).map(([k,n])=>({image:'图片',video:'视频',audio:'配音',music:'音乐'}[k]||k)+' '+n+' 个');
 $('discovery-summary').textContent=lines.length?'已配置映射：'+lines.join('、'):'尚未识别完整的媒体接口。';
 const gaps=[...(d.pendingModels||[]).map(row=>`${row.name||row.id||row.kind||'模型'}：${row.reason||row.message||'接口资料不完整'}`),...(d.issues||[]).map(row=>row.message||row.code)];
 $('discovery-gaps').textContent=gaps.length?gaps.join('\n'):'未发现配置合同缺项；账户权限与实际生成效果仍需使用时验证。';
 const list=$('discovery-sources');list.replaceChildren();
 for(const evidence of (d.evidence||[]).filter(row=>row.type==='public-document')){
  const item=document.createElement('li'),link=document.createElement('a');link.textContent=evidence.url;link.href=evidence.url;link.target='_blank';link.rel='noreferrer noopener';item.append(link);list.append(item);
 }
 $('discovery-result').hidden=false;
}

function fill(profile={}){
 $('discovery-result').hidden=true;selected=profile.provider||null;$('name').value=profile.name||'';$('base-url').value=profile.baseUrl||'';$('protocol').value=profile.protocol||'openai-compatible';$('auth-type').value=profile.authType||'bearer';$('auth-header').value=profile.authHeader||'Authorization';$('docs-url').value=profile.docsUrl||'';
 $('api-key').value='';$('clear-key').checked=false;$('test-only').checked=profile.scope==='test';$('session-only').checked=Boolean(profile.sessionOnly)||profile.scope==='test'||profile.storage==='session';$('key-status').textContent=profile.hasKey?'凭证已配置，原值不回显。':'尚未配置凭证。';$('catalog').value=JSON.stringify(profile.modelCatalog||[],null,2);$('defaults').value=JSON.stringify(profile.models||{},null,2);models(profile.modelCatalog);status(isDefaultService()&&!profile.hasKey?'填写 API 地址与 Key，即可自动配置账号可用的图片、视频模型。':selected?'已加载服务。':'请填写服务资料。');updateControls();markClean();
}
function render(){
 const host=config.profiles?.host,caps=host?.capabilities;$('host-status').textContent=caps?.selected?(caps.selected.provider+' / '+caps.selected.model+(caps.authorizationVerified?'':'（授权状态由宿主管理）')):host?.available?'已连接宿主模型。':'当前模型尚未就绪，请在 DSH 选择模型。';
 $('services').replaceChildren();for(const p of Object.values(config.profiles||{})){if(p.provider==='host')continue;const b=document.createElement('button');b.type='button';b.textContent=p.name+(p.scope==='test'?' · 测试':'');b.setAttribute('aria-pressed',String(p.provider===selected));b.addEventListener('click',()=>void changeService(()=>{fill(p);render();}));$('services').append(b);}
 const preset=defaultPreset();$('default-channel').hidden=!preset;
 if(preset){const saved=config.profiles?.[preset.provider];$('default-channel-title').textContent=preset.name;$('default-channel-select').textContent=selected===preset.provider?'正在配置默认通道':'配置默认通道';$('default-channel-status').textContent=saved?.hasKey?'已保存凭证 · '+(modelCounts(saved.modelCatalog)||'待更新模型目录'):'填写 Key，自动读取账号模型并配置图片、视频接口。';}
}
async function refresh(){config=await invoke('aiyouplus_model_config');const current=config.profiles?.[selected]||config.profiles?.[config.provider];fill(current&&current.provider!=='host'?current:defaultPreset()||{});render();}
$('new').addEventListener('click',()=>void changeService(()=>{fill();render();}));$('refresh').addEventListener('click',()=>void changeService(refresh));
$('default-channel-select').addEventListener('click',()=>void changeService(()=>{const preset=defaultPreset();if(!preset)throw new Error('默认通道资料尚未就绪，请刷新重试。');fill(config.profiles?.[preset.provider]||preset);render();}));
$('auth-type').addEventListener('change',()=>{$('auth-header').value=$('auth-type').value==='api-key'?'X-API-Key':$('auth-type').value==='none'?'':'Authorization';});
$('test-only').addEventListener('change',()=>{if($('test-only').checked)$('session-only').checked=true;});
$('catalog').addEventListener('input',()=>{try{models(JSON.parse($('catalog').value));}catch{}});
function formProfile(){
 const profile={provider:selected||'new',create:!selected,name:$('name').value,baseUrl:$('base-url').value,protocol:$('protocol').value,authType:$('auth-type').value,authHeader:$('auth-header').value,docsUrl:$('docs-url').value,scope:$('test-only').checked?'test':'production',sessionOnly:$('session-only').checked,clearKey:$('clear-key').checked,modelCatalog:JSON.parse($('catalog').value),models:JSON.parse($('defaults').value)};
 if($('api-key').value)profile.apiKey=$('api-key').value;return profile;
}
async function saveProfile(profile){
 config=await invoke('aiyouplus_model_configure',profile);$('api-key').value='';
 selected=config.provider;render();if(config.profiles?.[selected])fill(config.profiles[selected]);
 announceConfiguration();
}
function announceConfiguration(){
 // Same-origin canvas documents reload their own bound public configuration.
 // Broadcast only invalidation, never a Key, profile, or another session's data.
 if(typeof BroadcastChannel!=='function')return;
 try{const channel=new BroadcastChannel('aiyoudsh-media-models');try{channel.postMessage({type:'configuration-changed'});}finally{channel.close();}}catch{/* Focus refresh remains available when broadcasting is unavailable. */}
}
async function configureDefault(){
 const preset=defaultPreset(),baseUrl=$('base-url').value.trim();
 if(!preset||selected!==preset.provider)throw new Error('请先选择默认媒体通道。');
 if(!baseUrl)throw new Error('请填写此通道的真实 API 地址；接口文档网址不是 API 地址。');
 const args={provider:preset.provider,baseUrl,sessionOnly:$('session-only').checked};
 if($('api-key').value)args.apiKey=$('api-key').value;
 status('正在校验 Key、读取账号模型并匹配图片和视频接口…');
 const result=await invoke('aiyouplus_model_autoconfigure',args);
 if(result.configured===false&&result.discovery?.accountCatalogVerified===true){discoveryReport(result.discovery);status('Key 校验通过，但暂无完整可配置的图片/视频合同；原配置未变。API 地址与 Key 草稿已保留。',true);return;}
 if(!result.configured||!result.configuration?.profiles?.[preset.provider])throw new Error('通道尚未完成配置，请重试。');
 config=result.configuration;selected=preset.provider;fill(config.profiles[selected]);render();discoveryReport(result.discovery||{});
 announceConfiguration();
 status('已自动保存默认媒体通道：'+(modelCounts(config.profiles[selected].modelCatalog)||'暂无图片或视频模型')+'。账号模型目录已校验，实际生成权限与效果仍需使用时验证；未提交生成请求。');
}
$('settings').addEventListener('submit',event=>{event.preventDefault();void run(async()=>{if(isDefaultService())return configureDefault();await saveProfile(formProfile());status('服务已保存。尚未提交生成请求。');});});
$('discover').addEventListener('click',()=>run(async()=>{
 const before={provider:selected,baseUrl:$('base-url').value,key:$('api-key').value,clearKey:$('clear-key').checked,scope:$('test-only').checked?'test':'production',sessionOnly:$('session-only').checked,hasKey:config?.profiles?.[selected]?.hasKey};
 status('正在读取公开文档、匹配媒体模型与接口…');
 const {discovery:d}=await invoke('aiyouplus_model_discover',{url:$('docs-url').value});
 const sameOrigin=(()=>{try{return new URL(before.baseUrl).origin===new URL(d.baseUrl).origin;}catch{return !before.baseUrl;}})();
 const custom=before.provider?.startsWith('service-')&&sameOrigin;
 fill({...d,provider:custom?before.provider:null,hasKey:custom&&before.hasKey});cleanSignature=null;
 // Never inherit a stored credential after switching API origin. A newly typed
 // credential stays in memory only when bound to the same API or a blank draft.
 if(sameOrigin)$('api-key').value=before.key;
 $('clear-key').checked=custom&&before.clearKey;
 if(d.scope!=='test'){$('test-only').checked=before.scope==='test';$('session-only').checked=before.sessionOnly||before.scope==='test';}
 discoveryReport(d);
 if(!d.readyToConfigure){status('已保留识别结果，接口合同尚不完整，未保存通道。请查看待补内容。',true);return;}
 await saveProfile(formProfile());discoveryReport(d);
 status('已自动保存媒体通道，共 '+(d.modelCatalog?.length||0)+' 个模型。'+(config.profiles?.[selected]?.hasKey?'':' 尚未配置 Key，可在上方填写后保存。')+' 未提交生成请求。');
}));
$('catalog-refresh').addEventListener('click',()=>run(async()=>{if(isDefaultService())return configureDefault();if(!selected)throw new Error('请先保存服务。');const result=await invoke('aiyouplus_model_catalog',{provider:selected});models(result.modelCatalog||config.profiles[selected]?.modelCatalog);status(result.liveDiscovery?'模型目录已核对；实际生成权限仍需逐项验证。':'已读取配置目录；'+(result.requiresKey?'需要配置凭证。':'尚未验证当前账户生成权限。'));}));
$('delete').addEventListener('click',()=>void run(async()=>{if(!selected)throw new Error('请先选择服务。');const id=selected,temporary=Boolean(config.profiles?.[id]?.sessionOnly);if(!await confirmChange(temporary?'移除本次对话的临时服务？':'删除当前服务？',temporary?'仅移除当前对话的临时配置。原先保存的服务和已生成素材会保留。':'将移除服务配置与凭证绑定，相关未完成任务将无法按原配置恢复。已生成素材会保留。',temporary?'移除临时服务':'删除服务'))return;config=await invoke('aiyouplus_model_delete',{provider:id});selected=null;render();fill();announceConfiguration();status(config.profiles?.[id]?'临时配置已移除，原先保存的服务已恢复。':'服务配置已删除。');}));
void run(refresh);

// Local CLI metadata only. No OAuth, login URL, authorization code or API Key.
let codexState=null,codexBusy=false,codexGeneration=0,codexOperation=0,codexError='',codexPathDirty=false;
function renderCodex(){
 const state=codexState||{};
 if(!codexPathDirty&&state.executablePath)$('codex-path').value=state.executablePath;
 $('codex-status').textContent=!state.installed?'本机尚未检测到可用 Codex CLI。':('CLI '+(state.version||'版本未知')+' · '+(state.loggedIn?'已检测到本机已有登录':'本机 CLI 尚未登录')+' · '+(state.connected?'已接入 DSH 模型通道':'尚未连接'));
 $('codex-models').textContent=state.models?.length?('模型：'+state.models.map(m=>m.name||m.id).join('、')+'。'+(state.modelCallVerified?'本次已完成模型调用。':'实际模型调用尚未验证。')):'检测和连接只读取 CLI 元数据，不会提交模型请求。';
 const messages={CLI_NOT_INSTALLED:'未找到 CLI，请安装后填写可执行路径。',CLI_NOT_LOGGED_IN:'请先在终端完成 Codex CLI 登录；插件不会自动登录。',INVALID_CLI:'所选文件不是可识别的 Codex CLI。',CLI_TIMEOUT:'CLI 检测超时，请检查本机程序状态。'};
 const detection=state.detection?(state.detection.diagnostic?(messages[state.detection.diagnostic]||state.detection.diagnostic):'新路径已检测到 CLI '+(state.detection.version||'')+'，点击连接后才会切换。'):'';
 $('codex-error').textContent=codexError||messages[state.diagnostic]||state.diagnostic||detection;
 for(const id of ['codex-refresh','codex-begin'])$(id).disabled=codexBusy;
 $('codex-cancel').disabled=!state.enabled&&!codexBusy;
 $('codex-cancel').hidden=!state.enabled&&!codexBusy;
}
async function codexRequest(kind,args={}){
 const generation=++codexGeneration,result=await invoke('dsh_codex_'+kind,args);
 if(generation!==codexGeneration)return;codexState=result;codexError='';renderCodex();return result;
}
async function runCodex(action,interrupt=false){if(codexBusy&&!interrupt)return;const operation=++codexOperation;codexBusy=true;renderCodex();try{await action();}catch(e){if(operation===codexOperation)codexError=e.message;}finally{if(operation===codexOperation){codexBusy=false;renderCodex();}}}
$('codex-path').addEventListener('input',()=>{codexPathDirty=true;});
$('codex-refresh').addEventListener('click',()=>void runCodex(()=>codexRequest('status',{executablePath:$('codex-path').value.trim(),refresh:true})));
$('codex-begin').addEventListener('click',()=>void runCodex(async()=>{const result=await codexRequest('begin',{executablePath:$('codex-path').value.trim()});if(result?.connected){codexPathDirty=false;renderCodex();}}));
$('codex-cancel').addEventListener('click',()=>void runCodex(()=>codexRequest('cancel'),true));
void runCodex(()=>codexRequest('status'));
