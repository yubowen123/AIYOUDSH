/** Native feature workspace backed by the complete built-in local service source. */
window.__ModuleLoader__.load({
 id:"@local/aiyou-enhancer-asset-console",
 factory(require){
  const React=require('react'),h=React.createElement;const TYPE_ID="@local/aiyou-enhancer-asset-console/tab";
  /** Only an owned, visible same-origin library frame may open the host chooser. */
  function createDirectoryPickerBridge({win=window,page=document,pick}){
   let disposed=false,pending=null;
   const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
   function owned(value,base,library=false){try{const host=new URL(win.location.href),url=new URL(value,base);return url.protocol===host.protocol&&url.host===host.host&&(library?url.pathname.startsWith('/aiyoucodex-dsh/asset-console/ui/'):/^\/aiyoucodex-dsh\/(?:asset-console\/ui\/|canvas\/ui\/)/u.test(url.pathname));}catch{return false;}}
   function locate(source){let seen=0;const visit=(doc,depth)=>{if(depth>8)return null;for(const frame of doc.querySelectorAll('iframe')){if(++seen>128)return null;if(frame.getAttribute('srcdoc')!==null||!owned(frame.getAttribute('src'),doc.baseURI))continue;const rect=frame.getBoundingClientRect?.();if(rect&&(!rect.width||!rect.height))continue;let child;try{child=frame.contentDocument;}catch{continue;}if(!child||!owned(child.URL||child.baseURI,doc.baseURI))continue;if(frame.contentWindow===source&&owned(child.URL||child.baseURI,doc.baseURI,true))return{frame,doc:child};const nested=visit(child,depth+1);if(nested)return nested;}return null;};return visit(page,0);}
   const reply=(source,requestId,value)=>{if(!disposed)try{source.postMessage({type:'dsh-asset-folder-picked',requestId,...value},win.location.origin);}catch{/* The requesting document may have closed. */}};
   const receive=event=>{
    const data=event.data;if(disposed||event.origin!==win.location.origin||win.location.origin==='null'||data?.type!=='dsh-asset-folder-pick'||typeof data.requestId!=='string'||!uuid.test(data.requestId))return;
    const target=locate(event.source);if(!target)return;
    if(pending){if(pending.source!==event.source||pending.requestId!==data.requestId)reply(event.source,data.requestId,{ok:false,error:'目录选择器正在使用，请完成或取消后重试。'});return;}
    const ticket={source:event.source,requestId:data.requestId,target};pending=ticket;
    void Promise.resolve().then(()=>{if(disposed||pending!==ticket||locate(ticket.source)?.doc!==target.doc)return null;return pick();}).then(path=>{
     const current=locate(ticket.source);if(disposed||pending!==ticket||current?.frame!==target.frame||current?.doc!==target.doc)return;
     if(path!==null&&(typeof path!=='string'||path.length>32768||/[\u0000-\u001f\u007f]/u.test(path)||!(/^(?:\/|[a-z]:[\\/]|\\\\)/iu.test(path))))throw Error('目录选择器没有返回有效的本机绝对路径，请手动填写。');
     reply(ticket.source,ticket.requestId,{ok:true,path});
    }).catch(error=>{const current=locate(ticket.source);if(!disposed&&current?.doc===target.doc)reply(ticket.source,ticket.requestId,{ok:false,error:String(error?.message||error||'目录选择失败，可手动填写绝对路径。')});}).finally(()=>{if(pending===ticket)pending=null;});
   };
   win.addEventListener('message',receive);return()=>{disposed=true;pending=null;win.removeEventListener('message',receive);};
  }
  // Keep uncertain durable envelopes across a tab remount; never invent a new write.
  const quickInsertAttempts=new Map();
  function createCanvasQuickInsertBridge({win=window,getFrame,getContext,onState,openProject,fetcher=fetch,attempts=quickInsertAttempts,selectionTimeoutMs=30000,fetchTimeoutMs=15000}){
   const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
   const opaque=value=>typeof value==='string'&&value.length>0&&value.length<=4096&&!/[\s\u0000-\u001f\u007f/\\]/u.test(value)&&! /^[a-z][a-z0-9+.-]*:/iu.test(value);
   const uncertainCodes=new Set(['RECEIPT_TIMEOUT','ABORTED','REQUEST_UNCERTAIN','CANVAS_CLOSED','DISPOSED']);
   let disposed=false,current=null;const ledger=new Map();
   const context=()=>{const value=getContext()||{};return{sessionId:typeof value.sessionId==='string'?value.sessionId:'',cwd:typeof value.cwd==='string'?value.cwd:''};};
   const sameContext=(a,b)=>a.sessionId===b.sessionId&&a.cwd===b.cwd;
   function frameDocument(visible=false){
    const frame=getFrame();if(!frame||frame.isConnected===false||frame.getAttribute('srcdoc')!==null)return null;
    try{const host=new URL(win.location.href),src=new URL(frame.getAttribute('src'),host),doc=frame.contentDocument,actual=new URL(doc?.URL||doc?.baseURI||'',host);
     if(win.location.origin==='null'||src.protocol!==host.protocol||src.host!==host.host||actual.protocol!==host.protocol||actual.host!==host.host||src.pathname!=='/aiyoucodex-dsh/asset-console/ui/'||actual.pathname!==src.pathname||src.searchParams.has('picker')||actual.searchParams.has('picker'))return null;
     if(visible){const r=frame.getBoundingClientRect();if(!r.width||!r.height||frame.hidden)return null;const style=win.getComputedStyle?.(frame);if(style&&(style.display==='none'||style.visibility==='hidden'))return null;}
     return doc?{frame,doc,source:frame.contentWindow}:null;
    }catch{return null;}
   }
   function valid(ticket,visible=!ticket.started){const live=frameDocument(visible);return !disposed&&current===ticket&&!ticket.controller.signal.aborted&&sameContext(context(),ticket.context)&&live?.frame===ticket.target.frame&&live?.doc===ticket.target.doc&&live?.source===ticket.target.source;}
   function assertCurrent(ticket){if(!valid(ticket))throw Object.assign(Error('素材库或所属对话已变化，操作已停止。'),{code:'VIEW_CHANGED'});}
   function emit(ticket,value){if(valid(ticket))onState({...value,requestId:ticket.requestId,assetId:ticket.assetId});}
   function reply(ticket,ok,error=''){
    if(!valid(ticket,false))return;
    const value={source:'codex-sidebar-enhancer',action:ok?'asset-added':'asset-add-failed',requestId:ticket.requestId,...(ok?{count:1}:{error})};
    ticket.reply=value;try{ticket.target.source.postMessage(value,win.location.origin);}catch{}
   }
   function finish(ticket,ok,error=''){reply(ticket,ok,error);ticket.target.frame.removeEventListener?.('load',ticket.onLoad);if(current===ticket){current=null;ticket.controller.abort();onState(null);}}
   async function api(ticket,path,data,timeoutMs=fetchTimeoutMs){
    assertCurrent(ticket);const timeout=AbortSignal.timeout(Math.max(1,timeoutMs)),signal=AbortSignal.any([ticket.controller.signal,timeout]);
    let response,result;try{response=await fetcher('/aiyoucodex-dsh/canvas'+path,{cache:'no-store',signal,...(data===undefined?{}:{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)})});result=await response.json();}
    catch(error){if(timeout.aborted)throw Object.assign(Error('读取画布回执超时，请重试确认上次结果。'),{code:'RECEIPT_TIMEOUT',confirmedFailure:false});throw error;}
    assertCurrent(ticket);if(!response.ok||!result.ok)throw Object.assign(Error(result.error?.message||result.error||'画布请求失败'),{code:result.code,confirmedFailure:Boolean(result.code)&&!uncertainCodes.has(result.code)});return result.value;
   }
   function outstanding(c,asset){return[...attempts.values()].find(a=>sameContext(a.context,c)&&a.assetId===asset&&a.command);}
   async function catalog(ticket){try{const value=await api(ticket,'/projects?'+new URLSearchParams(ticket.context));assertCurrent(ticket);ticket.projects=(value.projects||[]).map(p=>({...p,id:p?.projectId||p?.id})).filter(p=>typeof p.id==='string'&&p.id);const previous=outstanding(ticket.context,ticket.assetId);ticket.lockedProjectId=previous?.projectId||'';emit(ticket,{phase:'choose',projects:ticket.projects,lockedProjectId:ticket.lockedProjectId,error:ticket.lockedProjectId?'上次保存结果待确认，请重试同一目标项目；不会再次创建导入操作。':''});}catch(error){if(valid(ticket))emit(ticket,{phase:'error',projects:[],error:error.message});}}
   async function choose(projectId){
    const ticket=current;if(!ticket||ticket.busy)return;if(!valid(ticket)){finish(ticket,false,'素材库已隐藏或所属对话已变化，请重新选择。');return;}if(!ticket.projects?.some(p=>p.id===projectId))return;
    const previous=outstanding(ticket.context,ticket.assetId);if(previous&&previous.projectId!==projectId){emit(ticket,{phase:'choose',projects:ticket.projects,lockedProjectId:previous.projectId,error:'上次操作结果尚未确认，请先重试原目标项目。'});return;}
    ticket.busy=true;ticket.started=true;
    const key=JSON.stringify([ticket.context.sessionId,ticket.context.cwd,projectId,ticket.assetId]);let attempt=attempts.get(key);if(!attempt){attempt={context:ticket.context,projectId,assetId:ticket.assetId};attempts.set(key,attempt);}
    try{
     emit(ticket,{phase:'opening',projects:ticket.projects,projectId});await openProject({...ticket.context,projectId});assertCurrent(ticket);
     const end=Date.now()+selectionTimeoutMs;let selected=false;
     while(Date.now()<end){const value=await api(ticket,'/projects?'+new URLSearchParams(ticket.context),undefined,Math.min(fetchTimeoutMs,Math.max(1,end-Date.now())));if(value.selectedProjectId===projectId){selected=true;break;}await new Promise((resolve,reject)=>{const done=()=>{clearTimeout(timer);ticket.controller.signal.removeEventListener('abort',abort);resolve();},abort=()=>{clearTimeout(timer);ticket.controller.signal.removeEventListener('abort',abort);reject(Object.assign(Error('操作已停止'),{code:'VIEW_CHANGED'}));},timer=setTimeout(done,100);ticket.controller.signal.addEventListener('abort',abort,{once:true});});assertCurrent(ticket);}
     if(!selected)throw Object.assign(Error('目标画布尚未打开，请返回素材库重试。'),{code:'CANVAS_NOT_OPEN',confirmedFailure:true});
     if(!attempt.command){const snapshot=await api(ticket,'/command',{...ticket.context,projectId,action:'snapshot',requestId:win.crypto.randomUUID()});assertCurrent(ticket);if(snapshot.projectId!==projectId||!Number.isSafeInteger(snapshot.revision))throw Error('画布缺少真实状态回执，请重新打开后重试。');attempt.command={sessionId:ticket.context.sessionId,cwd:ticket.context.cwd,projectId,action:'import_asset',payload:{assetId:ticket.assetId},expectedRevision:snapshot.revision,requestId:win.crypto.randomUUID()};}
     emit(ticket,{phase:'saving',projects:ticket.projects,projectId});assertCurrent(ticket);attempt.uncertain=true;
     let saved;try{saved=await api(ticket,'/command',attempt.command);}catch(error){if(error.confirmedFailure){delete attempt.command;attempt.uncertain=false;}throw error;}
     assertCurrent(ticket);const receipt=saved?.saveReceipt;
     if(saved?.status!=='completed'||saved.projectId!==projectId||saved.requestId!==attempt.command.requestId||!Number.isSafeInteger(saved.revision)||!receipt||!Number.isSafeInteger(receipt.bytes)||receipt.bytes<=0||!/^[a-f0-9]{64}$/iu.test(receipt.sha256||'')||typeof saved.documentRef!=='string')throw Object.assign(Error('尚未收到有效保存回执，请重试确认原操作。'),{code:'INVALID_RECEIPT',confirmedFailure:false});
     attempts.delete(key);finish(ticket,true);
    }catch(error){if(!attempt.command)attempts.delete(key);if(valid(ticket,false))finish(ticket,false,error.message||'加入画布未完成，请重试。');}
    finally{ticket.busy=false;}
   }
   const receive=event=>{
    const data=event.data;if(disposed||event.origin!==win.location.origin||data?.source!=='asset-console'||data.action!=='use-in-canvas'||!uuid.test(data.requestId||'')||!opaque(data.assetId))return;
    const target=frameDocument(true);if(!target||event.source!==target.source)return;
    const old=ledger.get(data.requestId);if(old){if(old.assetId===data.assetId&&old.target.doc===target.doc&&sameContext(old.context,context())&&old.reply)try{target.source.postMessage(old.reply,win.location.origin);}catch{}return;}
    const ticket={assetId:data.assetId,requestId:data.requestId,target,context:context(),controller:new AbortController(),started:false,busy:false};
    if(current){ticket.reply={source:'codex-sidebar-enhancer',action:'asset-add-failed',requestId:data.requestId,error:'请先完成或取消当前目标选择。'};ledger.set(ticket.requestId,ticket);try{target.source.postMessage(ticket.reply,win.location.origin);}catch{}return;}
    current=ticket;ticket.onLoad=()=>{if(current===ticket)finish(ticket,false,'素材库已重新载入，请重新选择。');};target.frame.addEventListener?.('load',ticket.onLoad);ledger.set(ticket.requestId,ticket);while(ledger.size>256){const key=ledger.keys().next().value;if(ledger.get(key)===current)break;ledger.delete(key);}
    if(!ticket.context.sessionId){finish(ticket,false,'当前素材库未关联对话，请从目标对话打开素材库后再加入画布。');return;}
    emit(ticket,{phase:'loading',projects:[]});void catalog(ticket);
   };
   const lifecycle=typeof win.MutationObserver==='function'?new win.MutationObserver(()=>{if(current&&!current.started&&!valid(current))finish(current,false,'素材库已隐藏或所属对话已变化，请重新选择。');}):null;
   if(lifecycle&&win.document?.documentElement)lifecycle.observe(win.document.documentElement,{attributes:true,attributeFilter:['style','class','hidden','src'],childList:true,subtree:true});
   win.addEventListener('message',receive);
   return{choose,retry(){if(current&&!current.busy){emit(current,{phase:'loading',projects:[]});void catalog(current);}},cancel(){const ticket=current;if(!ticket||ticket.busy)return;finish(ticket,false,'已取消加入画布。');},dispose(){disposed=true;lifecycle?.disconnect();if(current){current.target.frame.removeEventListener?.('load',current.onLoad);current.controller.abort();}current=null;win.removeEventListener('message',receive);}};
  }
  const modalButton={padding:'8px 12px',borderRadius:8,border:'1px solid var(--dsh-readable-surface-border,var(--dsw-alias-border-l2))',background:'var(--dsh-readable-surface-bg,var(--dsw-alias-bg-layer-1))',color:'var(--dsh-readable-surface-ink,var(--dsw-alias-label-primary))',font:'inherit',cursor:'pointer'};
  function Workspace({sessionId='',cwd='',ctx}){
   const[ready,setReady]=React.useState(false),[error,setError]=React.useState(''),[selection,setSelection]=React.useState(null),[target,setTarget]=React.useState(''),frame=React.useRef(null),bridge=React.useRef(null),identity=React.useRef({sessionId,cwd});identity.current={sessionId,cwd};
   const load=React.useCallback(async()=>{try{setError('');const response=await fetch('/aiyoucodex-dsh/asset-console/status',{cache:'no-store'});const value=await response.json();if(!response.ok||!value.ready)throw new Error(value.error||'服务尚未就绪');setReady(true);}catch(e){setError(e.message);}},[]);
   React.useEffect(()=>{void load();},[load]);
   React.useEffect(()=>{const instance=createCanvasQuickInsertBridge({getFrame:()=>frame.current,getContext:()=>identity.current,onState:value=>{setSelection(value);setTarget(value?.lockedProjectId||'');},openProject:async value=>{ctx.layout.selectPanel(null);ctx.sidebarRight.openTab('aiyoucodex-canvas',{revealIfOpened:true,params:{sessionId:value.sessionId,project:value.cwd,projectId:value.projectId}});ctx.layout.openRightbar(true,false);window.dispatchEvent(new CustomEvent('dsh-canvas-open-project',{detail:{sessionId:value.sessionId,projectId:value.projectId}}));}});bridge.current=instance;return()=>{instance.dispose();bridge.current=null;};},[sessionId,cwd]);
   const busy=selection&&['loading','opening','saving'].includes(selection.phase);
   const modal=selection&&h('section',{'data-dsh-asset-canvas-target':true,role:'dialog','aria-modal':'true','aria-label':'选择目标画布',style:{position:'absolute',inset:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:12,boxSizing:'border-box',background:'rgba(0,0,0,.3)'}},h('div',{style:{boxSizing:'border-box',width:'min(520px,100%)',maxHeight:'100%',overflow:'auto',padding:18,borderRadius:14,border:'1px solid var(--dsh-readable-modal-border,var(--dsw-alias-border-l2))',background:'var(--dsh-readable-modal-bg,var(--dsw-alias-bg-layer-1))',color:'var(--dsh-readable-modal-ink,var(--dsw-alias-label-primary))'}},h('h2',{style:{margin:'0 0 10px',fontSize:18}},'选择目标画布'),h('p',{style:{margin:'0 0 12px',fontSize:12,lineHeight:1.6,color:'var(--dsh-readable-modal-muted,var(--dsw-alias-label-secondary))'}},'选择项目后会打开画布，导入素材并保存。'),selection.error&&h('p',{role:'alert',style:{fontSize:13,lineHeight:1.6}},selection.error),busy?h('p',{role:'status'},selection.phase==='loading'?'正在读取画布项目…':selection.phase==='opening'?'正在打开目标画布…':'正在导入并等待保存回执…'):selection.phase==='error'?h('button',{type:'button',style:modalButton,onClick:()=>bridge.current?.retry()},'重试读取'):!selection.projects.length?h('p',{role:'status'},'还没有画布项目，请先到画布创建项目，再返回素材库。'):h('div',{role:'radiogroup','aria-label':'画布项目',style:{display:'grid',gap:8}},...selection.projects.map(project=>h('label',{key:project.id,style:{display:'flex',alignItems:'flex-start',gap:9,padding:12,borderRadius:8,border:'1px solid var(--dsh-readable-surface-border,var(--dsw-alias-border-l2))',background:'var(--dsh-readable-surface-bg,var(--dsw-alias-bg-layer-1))',color:'var(--dsh-readable-surface-ink,var(--dsw-alias-label-primary))',overflowWrap:'anywhere'}},h('input',{type:'radio',name:'asset-canvas-project',value:project.id,checked:target===project.id,disabled:Boolean(selection.lockedProjectId&&selection.lockedProjectId!==project.id),onChange:()=>setTarget(project.id),style:{accentColor:'var(--dsh-readable-accent-bg,var(--dsw-alias-brand-primary))'}}),h('span',null,project.title||project.name||project.id)))) ,h('footer',{style:{display:'flex',justifyContent:'flex-end',gap:8,marginTop:18,flexWrap:'wrap'}},h('button',{type:'button',style:modalButton,disabled:selection.phase==='opening'||selection.phase==='saving',onClick:()=>bridge.current?.cancel()},'取消'),selection.phase==='choose'&&selection.projects.length>0&&h('button',{type:'button',disabled:busy||!target,onClick:()=>void bridge.current?.choose(target),style:{...modalButton,background:'var(--dsh-readable-accent-bg,var(--dsw-alias-brand-primary))',color:'var(--dsh-readable-accent-ink,var(--dsw-alias-label-primary-inverted,#fff))',borderColor:'var(--dsh-readable-accent-border,var(--dsw-alias-brand-primary))',opacity:target?1:.55}},selection.lockedProjectId?'重试确认原操作':'加入并保存'))));
   if(error)return h('div',{role:'alert',style:{padding:20,color:'var(--dsw-alias-label-primary)'}},h('p',null,error),h('button',{type:'button',onClick:load},'重试'));
   if(!ready)return h('div',{style:{padding:20,color:'var(--dsw-alias-label-secondary)'}},'正在打开资产库…');
   return h('div',{style:{position:'relative',height:'100%',minHeight:0}},h('iframe',{ref:frame,src:'/aiyoucodex-dsh/asset-console/ui/',title:'资产库',style:{border:0,width:'100%',height:'100%',display:'block',background:'var(--dsw-alias-bg-base)'},sandbox:'allow-scripts allow-forms allow-same-origin allow-downloads'}),modal);
  }
  function Tab({useTabInfo,ctx}){const{tab}=useTabInfo(),p=tab.navigation.params||{};return h(Workspace,{key:(p.sessionId||'global')+':'+(p.project||p.cwd||''),sessionId:p.sessionId||'',cwd:p.project||p.cwd||'',ctx});}

  return {inject:['slots','sidebarRightTabs','uiWorkspace','sidebarRight','layout'],apply(ctx){
   ctx.effect(()=>createDirectoryPickerBridge({pick:()=>{const desktop=globalThis.__DSH_DIRECTORY_PICKER__;return desktop?.pick?desktop.pick():ctx.uiWorkspace.pickDirectory();}}),'asset-console:directory-picker');
   ctx.effect(()=>ctx.sidebarRightTabs.register({id:TYPE_ID,kind:"aiyoucodex-asset-console",title:()=>"资产库",keepMounted:true,guide:[{id:'open',order:40,title:()=>"资产库",description:()=>"资产库"}]}),'asset-console:type');
   ctx.effect(()=>ctx.slots.inject('sidebar.right.pane.tab',()=>ctx.slots.register({name:'sidebar.right.pane.tab',key:TYPE_ID},props=>h(Tab,{...props,ctx}))),'asset-console:workspace');
  }};
 }
});
