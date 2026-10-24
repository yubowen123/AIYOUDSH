const $=id=>document.getElementById(id),query=new URLSearchParams(location.search);
const context=Object.fromEntries(['sessionId','projectId','panelId'].map(k=>[k,query.get(k)||'']));
let selected=null,config,busy=false;
const status=(text,error=false)=>{$('status').textContent=text;$('status').dataset.error=String(error);};
async function invoke(command,args={}){
 const response=await fetch('/aiyoucodex-dsh/canvas/rpc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({command,args,...context})});
 const result=await response.json();if(!response.ok||!result.ok)throw new Error(result.error?.message||result.error||'请求未完成');return result.value;
}
async function run(action){if(busy)return;busy=true;for(const b of document.querySelectorAll('#settings button,#new,#refresh'))b.disabled=true;try{await action();}catch(e){status(e.message,true);}finally{busy=false;for(const b of document.querySelectorAll('#settings button,#new,#refresh'))b.disabled=false;}}
function models(catalog){$('models').replaceChildren();for(const row of catalog||[]){const div=document.createElement('div');div.className='model';const kind={image:'图片',video:'视频',audio:'配音',music:'音乐'}[row.kind]||row.kind;div.textContent=kind+' · '+(row.name||row.id)+' ('+row.id+')';$('models').append(div);}if(!catalog?.length)$('models').textContent='尚未配置媒体模型，可从文档识别或手动填写。';}
function fill(profile={}){
 selected=profile.provider||null;$('name').value=profile.name||'';$('base-url').value=profile.baseUrl||'';$('protocol').value=profile.protocol||'openai-compatible';$('auth-type').value=profile.authType||'bearer';$('auth-header').value=profile.authHeader||'Authorization';$('docs-url').value=profile.docsUrl||'';
 $('api-key').value='';$('clear-key').checked=false;$('test-only').checked=profile.scope==='test';$('session-only').checked=profile.scope==='test'||profile.storage==='session';$('key-status').textContent=profile.hasKey?'凭证已配置，原值不回显。':'尚未配置凭证。';$('catalog').value=JSON.stringify(profile.modelCatalog||[],null,2);$('defaults').value=JSON.stringify(profile.models||{},null,2);models(profile.modelCatalog);status(selected?'已加载服务。':'请填写服务资料。');
}
function render(){
 const host=config.profiles?.host,caps=host?.capabilities;$('host-status').textContent=caps?.selected?(caps.selected.provider+' / '+caps.selected.model+(caps.authorizationVerified?'':'（授权状态由宿主管理）')):host?.available?'已连接宿主模型。':'当前模型尚未就绪，请在 DSH 选择模型。';
 $('services').replaceChildren();for(const p of Object.values(config.profiles||{})){if(p.provider==='host')continue;const b=document.createElement('button');b.type='button';b.textContent=p.name+(p.scope==='test'?' · 测试':'');b.addEventListener('click',()=>fill(p));$('services').append(b);}
}
async function refresh(){config=await invoke('aiyouplus_model_config');render();if(selected&&config.profiles?.[selected])fill(config.profiles[selected]);}
$('new').addEventListener('click',()=>fill());$('refresh').addEventListener('click',()=>run(refresh));
$('auth-type').addEventListener('change',()=>{$('auth-header').value=$('auth-type').value==='api-key'?'X-API-Key':$('auth-type').value==='none'?'':'Authorization';});
$('test-only').addEventListener('change',()=>{if($('test-only').checked)$('session-only').checked=true;});
$('catalog').addEventListener('input',()=>{try{models(JSON.parse($('catalog').value));}catch{}});
$('settings').addEventListener('submit',event=>{event.preventDefault();void run(async()=>{
 const profile={provider:selected||'new',create:!selected,name:$('name').value,baseUrl:$('base-url').value,protocol:$('protocol').value,authType:$('auth-type').value,authHeader:$('auth-header').value,docsUrl:$('docs-url').value,scope:$('test-only').checked?'test':'production',sessionOnly:$('session-only').checked,clearKey:$('clear-key').checked,modelCatalog:JSON.parse($('catalog').value),models:JSON.parse($('defaults').value)};
 const key=$('api-key').value;if(key)profile.apiKey=key;
 try{config=await invoke('aiyouplus_model_configure',profile);}finally{$('api-key').value='';}
 selected=config.provider;render();if(config.profiles?.[selected])fill(config.profiles[selected]);status('服务已保存。尚未提交生成请求。');
});});
$('discover').addEventListener('click',()=>run(async()=>{
 const result=await invoke('aiyouplus_model_discover',{url:$('docs-url').value}),d=result.discovery;
 const keep=selected;fill({...d,provider:keep});selected=keep;
 status((d.readyToConfigure?'已从文档识别接口，请检查后保存。':'接口资料仍需核对：')+'\n'+(d.issues||[]).map(i=>i.message||i.code).join('\n'));
}));
$('catalog-refresh').addEventListener('click',()=>run(async()=>{if(!selected)throw new Error('请先保存服务。');const result=await invoke('aiyouplus_model_catalog',{provider:selected});models(result.modelCatalog||config.profiles[selected]?.modelCatalog);status(result.liveDiscovery?'模型目录已核对；实际生成权限仍需逐项验证。':'已读取配置目录；'+(result.requiresKey?'需要配置凭证。':'尚未验证当前账户生成权限。'));}));
$('delete').addEventListener('click',()=>run(async()=>{if(!selected)throw new Error('请先选择服务。');config=await invoke('aiyouplus_model_delete',{provider:selected});selected=null;render();fill();status('服务配置已删除。');}));
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
