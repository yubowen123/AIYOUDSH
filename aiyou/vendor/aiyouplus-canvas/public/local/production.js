// Local recipe UI. Execution remains in the recovered canvas engine.
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bridge = () => { const value=window.__AIYOUPLUS_PRODUCTION__;if(!value)throw Error('画布尚未就绪，请先进入画布');return value; };
const names = {queued:'排队',planning:'准备中',running:'执行中',waiting_generation:'等待生成',waiting_approval:'等待确认',completed:'已完成',reviewing:'等待审阅',paused:'已暂停',failed:'失败'};
const select = (items,value) => items.map(([id,name])=>`<option value="${esc(id)}"${id===value?' selected':''}>${esc(name)}</option>`).join('');
let timer;
export function productionHtml() {
 const data=bridge().snapshot();
 return `<div class="lp-grid"><div><section class="lp-card"><h2>画布模板</h2><p>选择画布中的参考输入与输出，保存为可重复执行的本地模板。</p>
 <label for="lp-recipe-name">模板名称</label><input id="lp-recipe-name" placeholder="例如：产品主视觉流程">
 <label for="lp-recipe-goal">执行目标</label><textarea id="lp-recipe-goal" placeholder="说明每次执行的目标"></textarea>
 <label for="lp-recipe-input-mode">参考输入</label><select id="lp-recipe-input-mode">${select([['fixed','固定当前参考'],['each-run','每次接受新素材（文件夹 / 本机调用）']],'fixed')}</select>
 <div id="lp-recipe-nodes">${data.nodes.length?data.nodes.map(n=>`<label class="lp-row" data-recipe-node="${esc(n.id)}"><span style="flex:1">${esc(n.name)}</span><select aria-label="${esc(n.name)}用途" data-recipe-role="${esc(n.id)}">${select([['skip','不使用'],['input','参考输入'],['output','成品输出']],'skip')}</select></label>`).join(''):'<p class="lp-muted">先在画布添加文字或生成节点，再回来保存模板。</p>'}</div>
 <label for="lp-recipe-directory">成品输出目录（可选）</label><input id="lp-recipe-directory"><button id="lp-recipe-pick-directory">选择输出目录</button>
 <p class="lp-muted">文字节点保存现有内容；图像、视频和声音输出按节点设置调用模型。执行前按权限显示确认。</p>
 <div class="lp-row"><button id="lp-recipe-save" class="lp-primary">从画布保存模板</button><button id="lp-recipe-refresh">刷新画布节点</button><button id="lp-recipe-import">导入模板</button></div><div id="lp-result" class="lp-result">所有模板与记录保存在本机。</div></section>
 <section class="lp-card"><h2>自动任务</h2><label for="lp-trigger-recipe">使用模板</label><select id="lp-trigger-recipe">${select(data.recipes.map(r=>[r.id,r.name]),'')}</select>
 <label for="lp-trigger-kind">触发方式</label><select id="lp-trigger-kind">${select([['schedule','定时执行'],['watch_folder','文件夹新素材']],'schedule')}</select>
 <label for="lp-trigger-minutes">间隔分钟</label><input id="lp-trigger-minutes" type="number" min="5" max="1440" value="5">
 <label for="lp-trigger-folder">监视文件夹</label><input id="lp-trigger-folder"><button id="lp-trigger-pick-folder">选择文件夹</button>
 <p class="lp-muted">当前画布打开时执行。文件夹模式等待文件稳定后导入新素材，模板步骤派发后确认本次素材；生成与成品交付状态另见执行记录。</p>
 <button id="lp-trigger-save">添加自动任务</button><div id="lp-trigger-list"></div></section>
 <section class="lp-card"><h2>本机调用</h2><label><input id="lp-production-api" type="checkbox" ${data.api.enabled?'checked':''}>允许本机工具访问生产服务</label>
 <div class="lp-row">${[['read','读取状态'],['run','启动模板'],['control','暂停 / 继续 / 取消']].map(([key,label])=>`<label><input data-api-scope="${key}" type="checkbox" ${data.api.scopes.includes(key)?'checked':''}>${label}</label>`).join('')}</div>
 <button id="lp-production-api-save">保存访问设置</button><p id="lp-production-api-status" class="lp-muted"></p><button id="lp-production-api-copy">复制本机调用凭证</button></section></div>
 <div><section class="lp-card"><h2>已保存模板</h2><div id="lp-recipe-list"></div></section><section class="lp-card"><h2>执行与交付记录</h2><button id="lp-production-refresh">刷新记录</button><div id="lp-production-runs"></div></section></div></div>
 <dialog id="lp-recipe-edit-dialog" class="lp-card"><h2>修改模板</h2><label for="lp-recipe-edit-name">模板名称</label><input id="lp-recipe-edit-name"><label for="lp-recipe-edit-goal">执行目标</label><textarea id="lp-recipe-edit-goal"></textarea><div class="lp-row"><button id="lp-recipe-edit-save">保存修改</button><button id="lp-recipe-edit-cancel">取消</button></div></dialog>
 <dialog id="lp-delete-dialog" class="lp-card"><h2>确认删除</h2><p id="lp-delete-label"></p><p id="lp-delete-error" role="alert"></p><div class="lp-row"><button id="lp-delete-confirm">删除</button><button id="lp-delete-cancel">取消</button></div></dialog>`;
}
export function disposeProduction(){clearInterval(timer);timer=null;}
export function bindProduction({invoke,result,perform,render,close}) {
 disposeProduction();
 let editingRecipeId=null,pendingDelete=null;
 const $=s=>document.querySelector('#aiyouplus-local '+s);
 const on=(id,fn)=>{const b=$('#'+id);if(b)b.onclick=()=>perform(b,fn);};
 const askDelete=(kind,id)=>{pendingDelete={kind,id};$('#lp-delete-label').textContent=kind==='recipe'?'删除这个本地模板？':'删除这个自动任务？';$('#lp-delete-error').textContent='';$('#lp-delete-dialog').showModal();};
 const pick=async(id)=>{const folder=await invoke('plugin:dialog|open',{options:{directory:true,multiple:false}});if(folder)$('#'+id).value=Array.isArray(folder)?folder[0]:folder;};
 async function refresh(){
  const data=bridge().snapshot();
  if(!$('#lp-recipe-list'))return;
  $('#lp-recipe-list').innerHTML=data.recipes.length?data.recipes.map(r=>`<article class="lp-job" data-recipe-id="${esc(r.id)}"><strong>${esc(r.name)}</strong><span class="lp-status">v${r.currentVersion}</span><p>${esc(r.goal)}</p><p class="lp-muted">${r.slots.filter(s=>s.role==='input').length}个输入 · ${r.slots.filter(s=>s.role==='output').length}个输出${r.output.autoSave?' · 自动保存到 '+esc(r.output.directory):''}</p><div class="lp-row"><button data-recipe-run="${esc(r.id)}">预览并执行</button><button data-recipe-edit="${esc(r.id)}">修改名称 / 目标</button><button data-recipe-export="${esc(r.id)}">导出模板</button><button data-recipe-delete="${esc(r.id)}">删除模板</button></div></article>`).join(''):'<div class="lp-empty">暂无模板。</div>';
  $('#lp-trigger-list').innerHTML=data.triggers.items.map(t=>`<article class="lp-job" data-trigger-id="${esc(t.id)}"><strong>${esc(data.recipes.find(r=>r.id===t.recipeId)?.name||'模板已删除')}</strong><p>${t.kind==='schedule'?`每${t.everyMinutes}分钟`:esc(t.folderPath)} · ${t.enabled?'已启用':'已暂停'} · ${esc(t.lastError||t.lastRunStatus||'等待触发')}</p><div class="lp-row"><button data-trigger-run="${esc(t.id)}">现在执行一次</button><button data-trigger-toggle="${esc(t.id)}">${t.enabled?'暂停自动任务':'启用自动任务'}</button><button data-trigger-delete="${esc(t.id)}">删除自动任务</button></div></article>`).join('');
  const active=data.activeRun, history=data.history.filter(h=>h.runId!==active?.id);
  $('#lp-production-runs').innerHTML=(active?[`<article class="lp-job" data-production-run="${esc(active.id)}"><strong>${esc(active.name||active.goal)}</strong><span class="lp-status">${esc(names[active.status]||active.status)}</span><p>${esc(active.lastError||'')}</p><p>已保存文件：${active.delivery?.files?.length||0} · ${esc(active.delivery?.status||'未设置自动保存')}</p><div class="lp-row">${!['completed','reviewing','failed'].includes(active.status)?`<button data-production-control="${active.status==='paused'?'resume_run':'pause_run'}" data-run-id="${esc(active.id)}">${active.status==='paused'?'继续':'暂停'}</button><button data-production-control="cancel_run" data-run-id="${esc(active.id)}">取消未提交步骤</button>`:''}${['failed','paused'].includes(active.status)||active.delivery?.status==='failed'?`<button data-production-control="retry_run" data-run-id="${esc(active.id)}">重试失败步骤</button>`:''}</div></article>`]:[]).concat(history.map(h=>`<article class="lp-job"><strong>${esc(h.name||h.goal||h.runId)}</strong><span class="lp-status">${esc(names[h.status]||h.status)}</span><p>${esc(h.updatedAt?new Date(h.updatedAt).toLocaleString():'')}</p></article>`)).join('')||'<div class="lp-empty">执行模板后显示真实状态与文件记录。</div>';
  for(const [attr,fn]of Object.entries({
   'recipe-run':async(id)=>{close();try{const r=await bridge().execute(id);if(!r?.ok)throw Error(r?.error||'执行失败');}catch(e){await render();result(e.message,true);}},
   'recipe-delete':async(id)=>askDelete('recipe',id),
   'recipe-edit':async(id)=>{const r=bridge().snapshot().recipes.find(r=>r.id===id);if(!r)throw Error('模板已不存在');editingRecipeId=id;$('#lp-recipe-edit-name').value=r.name;$('#lp-recipe-edit-goal').value=r.goal;$('#lp-recipe-edit-dialog').showModal();},
   'recipe-export':async(id)=>{const r=bridge().snapshot().recipes.find(r=>r.id===id);const file=await invoke('plugin:dialog|save',{options:{defaultPath:r.name+'.json',filters:[{name:'AIYOUPLUS 模板',extensions:['json']}]}});if(file){await invoke('write_text_file_atomic',{path:file,body:JSON.stringify(r,null,2)});result('模板已导出');}},
   'trigger-run':async(id)=>{close();await bridge().runTrigger(id);},
   'trigger-toggle':async(id)=>{const t=bridge().snapshot().triggers.items.find(t=>t.id===id);await bridge().saveTrigger({...t,enabled:!t.enabled});await refresh();},
   'trigger-delete':async(id)=>askDelete('trigger',id)
  }))document.querySelectorAll('#aiyouplus-local [data-'+attr+']').forEach(b=>b.onclick=()=>perform(b,()=>fn(b.dataset[attr.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())])));
  document.querySelectorAll('#aiyouplus-local [data-production-control]').forEach(b=>b.onclick=()=>perform(b,async()=>{await bridge().control(b.dataset.productionControl,b.dataset.runId);await refresh();}));
 }
 on('lp-recipe-save',async()=>{const roles=Object.fromEntries([...document.querySelectorAll('#aiyouplus-local [data-recipe-role]')].map(e=>[e.dataset.recipeRole,e.value]));const r=bridge().createFromCanvas({name:$('#lp-recipe-name').value,goal:$('#lp-recipe-goal').value,roles,inputMode:$('#lp-recipe-input-mode').value,outputDirectory:$('#lp-recipe-directory').value.trim()});result('模板已保存：'+r.name);await render();});
 on('lp-recipe-edit-save',async()=>{const r=bridge().snapshot().recipes.find(r=>r.id===editingRecipeId);if(!r)throw Error('模板已不存在');const name=$('#lp-recipe-edit-name').value.trim();if(!name)throw Error('请填写模板名称');bridge().saveRecipe({...r,name,goal:$('#lp-recipe-edit-goal').value});$('#lp-recipe-edit-dialog').close();await refresh();});
 on('lp-recipe-edit-cancel',()=>$('#lp-recipe-edit-dialog').close());
 on('lp-delete-cancel',()=>{$('#lp-delete-dialog').close();pendingDelete=null;});
 on('lp-delete-confirm',async()=>{if(!pendingDelete)return;try{if(pendingDelete.kind==='recipe')bridge().deleteRecipe(pendingDelete.id);else await bridge().deleteTrigger(pendingDelete.id);}catch(error){$('#lp-delete-error').textContent=error.message;return;}pendingDelete=null;$('#lp-delete-dialog').close();await render();});
 on('lp-recipe-refresh',render);on('lp-recipe-pick-directory',()=>pick('lp-recipe-directory'));on('lp-trigger-pick-folder',()=>pick('lp-trigger-folder'));
 on('lp-recipe-import',async()=>{const file=await invoke('plugin:dialog|open',{options:{multiple:false,filters:[{name:'AIYOUPLUS 模板',extensions:['json']}]}});if(file){const r=bridge().saveRecipe(JSON.parse(await invoke('aiyouplus_local_read_text',{path:file})));result('已导入：'+r.name);await render();}});
 on('lp-trigger-save',async()=>{await bridge().saveTrigger({kind:$('#lp-trigger-kind').value,recipeId:$('#lp-trigger-recipe').value,everyMinutes:Number($('#lp-trigger-minutes').value),folderPath:$('#lp-trigger-folder').value.trim(),enabled:true});await refresh();});
 on('lp-production-api-save',async()=>{const value=await bridge().setApi($('#lp-production-api').checked,[...document.querySelectorAll('#aiyouplus-local [data-api-scope]:checked')].map(e=>e.dataset.apiScope));$('#lp-production-api-status').textContent=value.enabled?'已启用：'+value.baseUrl:'已停用本机调用';});
 on('lp-production-api-copy',async()=>{const info=await invoke('get_local_bridge_info');if(!info.token)throw Error('本机桥未就绪');await navigator.clipboard.writeText(info.token);result('本机调用凭证已复制，请只交给你信任的本机工具。');});
 on('lp-production-refresh',refresh);void refresh().catch(e=>result(e.message,true));
 timer=setInterval(()=>{if($('#lp-recipe-list'))void refresh().catch(()=>{});else disposeProduction();},1500);
}
