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

// Connection state is scoped to this Host session/project. Answers stay in this
// form until a one-way reply; they are never added to media settings or history.
let codexState=null,codexBusy=false,codexGeneration=0,codexPromptId=null,codexTimer=null,codexClosed=false,codexError='',codexPendingBeginId=null;
const codexActive=()=>['starting','running','cancelling'].includes(codexState?.status);
function renderCodex(){
 const state=codexState||{},labels={idle:'尚未在本页面连接。',starting:'正在启动宿主授权…',running:'请完成下方的宿主授权步骤。',cancelling:'正在撤回授权，等待宿主确认…',cancelled:'已取消本次连接。',failed:'本次连接未完成。',authorized:'宿主已确认本次授权凭证保存成功。请在 DSH 模型选择器选择 Codex；实际模型调用尚未验证。'};
 if(!codexBusy&&['authorized','cancelled','failed'].includes(state.status))codexPendingBeginId=null;
 $('codex-status').textContent=!state.flowAvailable?'当前宿主尚未提供 Codex OAuth 连接流程。':(state.enabled?'Codex 模型通道已启用。':'Codex 模型通道尚未启用。')+' '+(labels[state.status]||'正在读取…');
 $('codex-enable').hidden=Boolean(state.enabled);$('codex-enable').disabled=codexBusy||codexActive()||!state.catalogSupported;
 $('codex-begin').disabled=codexBusy||codexActive()||!state.flowAvailable;
 $('codex-refresh').disabled=codexBusy;$('codex-cancel').hidden=!codexActive();$('codex-cancel').disabled=codexBusy||state.status==='cancelling';
 $('codex-error').textContent=codexError||state.error?.message||'';
 $('codex-notices').replaceChildren();
 for(const notice of state.notices||[]){
  const div=document.createElement('p');div.textContent=notice.message||'';
  if(notice.code){const code=document.createElement('code');code.textContent=' '+notice.code;div.append(code);}
  if(notice.url){try{const u=new URL(notice.url);if(u.protocol==='https:'&&!u.username&&!u.password){const a=document.createElement('a');a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';a.referrerPolicy='no-referrer';a.textContent=' 打开官方授权页面';div.append(a);}}catch{}}
  $('codex-notices').append(div);
 }
 const prompt=state.prompt;$('codex-prompt').hidden=!prompt;
 if(!prompt){codexPromptId=null;$('codex-question').replaceChildren();}
 else if(codexPromptId!==prompt.id){
  codexPromptId=prompt.id;const label=$('codex-question');label.replaceChildren();const title=document.createElement('span');title.textContent=prompt.message;label.append(title);
  const input=document.createElement(prompt.kind==='select'?'select':'input');input.id='codex-answer';input.autocomplete='off';
  if(prompt.kind==='select'){for(const option of prompt.options||[]){const node=document.createElement('option');node.value=option.id;node.textContent=option.label;input.append(node);}}
  else{input.type=prompt.kind==='secret'?'password':'text';input.placeholder=prompt.placeholder||'';input.spellcheck=false;input.maxLength=16000;}
  label.append(input);input.focus();
 }
 for(const button of $('codex-prompt').querySelectorAll('button'))button.disabled=codexBusy||state.status==='cancelling';
 clearTimeout(codexTimer);if(codexActive()&&!codexClosed)codexTimer=setTimeout(()=>void refreshCodex(),1000);
}
async function codexRequest(kind,args={}){
 const generation=++codexGeneration,result=await invoke('dsh_codex_'+kind,args);
 if(codexClosed||generation!==codexGeneration)return;codexState=result;codexError='';renderCodex();return result;
}
async function refreshCodex(){if(codexClosed||codexBusy)return;try{await codexRequest('status');}catch(e){codexError=e.message;renderCodex();}}
async function runCodex(action){
 if(codexBusy||codexClosed)return;codexBusy=true;clearTimeout(codexTimer);renderCodex();
 try{await action();}catch(e){codexError=e.message;}
 finally{codexBusy=false;renderCodex();}
}
$('codex-enable').addEventListener('click',()=>void runCodex(()=>codexRequest('enable')));
$('codex-begin').addEventListener('click',()=>{if(codexBusy||codexClosed)return;codexPendingBeginId=crypto.randomUUID();void runCodex(async()=>{try{return await codexRequest('begin',{requestId:codexPendingBeginId});}finally{if(!codexActive())codexPendingBeginId=null;}});});
$('codex-refresh').addEventListener('click',()=>void refreshCodex());
$('codex-cancel').addEventListener('click',()=>void runCodex(()=>codexRequest('cancel',{attemptId:codexState.attemptId})));
$('codex-decline').addEventListener('click',()=>void runCodex(()=>codexRequest('respond',{attemptId:codexState.attemptId,promptId:codexPromptId,decline:true})));
$('codex-prompt').addEventListener('submit',event=>{
 event.preventDefault();const input=$('codex-answer'),answer=input?.value;if(!input||!codexState?.prompt)return;
 const args={attemptId:codexState.attemptId,promptId:codexPromptId,answer};input.value='';
 void runCodex(()=>codexRequest('respond',args));
});
window.addEventListener('pagehide',()=>{
 codexClosed=true;clearTimeout(codexTimer);const input=$('codex-answer');if(input)input.value='';
 if(codexActive()||codexPendingBeginId)void fetch('/aiyoucodex-dsh/canvas/rpc',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({command:'dsh_codex_cancel',args:{...(codexActive()?{attemptId:codexState.attemptId}:{}),...(codexPendingBeginId?{requestId:codexPendingBeginId}:{})},...context})}).catch(()=>{});
});
void refreshCodex();
