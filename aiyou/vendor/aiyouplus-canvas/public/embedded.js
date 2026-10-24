import './theme-adapter.js';
import {bootstrap,rpc,identity,route,emit,disposeShim,uploadBrowserFile} from './host-shim.js';
const documentRefOf=id=>id?(String(id).startsWith('project:')?String(id):'project:'+id):null;
const wait=ms=>new Promise(r=>setTimeout(r,ms));let disposed=false,cursor=0,lastHeartbeat=0,readyResolve,readyReject;const receipts=new Map();
const ready=new Promise((resolve,reject)=>{readyResolve=resolve;readyReject=reject;});
const bindings=()=>{const b=window.__DSH_CANVAS_BINDINGS__;if(!b?.snapshot||!b.execute)throw Error('画布尚未就绪');return b;};
let revisionState;try{const saved=JSON.parse(localStorage.getItem('dsh.canvasRevision'));if(Number.isSafeInteger(saved?.revision)&&saved.revision>=0)revisionState=saved;}catch{}
const baseRevision=Number(new URLSearchParams(location.search).get('baseRevision'))||0;if(Number.isSafeInteger(baseRevision)&&baseRevision>=0&&(!revisionState||revisionState.revision<baseRevision))revisionState={stamp:null,revision:baseRevision};
function snapshot(){const source=bindings().snapshot(),nativeRevision=Number(source.stateVersion);if(!Number.isSafeInteger(nativeRevision)||nativeRevision<0)throw Error('原画布缺少有效状态版本');const stamp=JSON.stringify([source.projectId,nativeRevision]);if(!revisionState||revisionState.stamp!==stamp){revisionState={stamp,revision:(revisionState?.revision||0)+1};if(!Number.isSafeInteger(revisionState.revision))throw Error('画布宿主版本超出安全范围');localStorage.setItem('dsh.canvasRevision',JSON.stringify(revisionState));}return{...structuredClone(source),sourceStateVersion:nativeRevision,stateVersion:revisionState.revision};}
async function flushSave(){await window.__qdmFlushProjectAutosave?.();const documentRef=await window.__qdmEmergencySave?.('DSH');if(!documentRef)throw Error('原画布未返回持久化保存回执');let current;for(let i=0;i<100;i++){await wait(20);bindings().invalidate?.();current=snapshot();if(documentRefOf(current.projectId)===documentRef)break;if(i===99)throw Error('保存后的原文档标识尚未一致');}localStorage.setItem('dsh.lastDocumentRef',documentRef);const saveReceipt=await rpc('canvas_save_receipt',{documentRef,snapshot:current});return{snapshot:current,revision:Number(current.stateVersion),documentRef,saveReceipt};}
async function execute(command){await ready;const{requestId,projectId,expectedRevision,action,payload={}}=command;if(projectId&&projectId!==identity.projectId)throw Error('命令与当前画布项目不匹配');if(!requestId)throw Error('缺少 requestId');const fingerprint=JSON.stringify({action,payload,expectedRevision,projectId});if(receipts.has(requestId)){const old=receipts.get(requestId);if(old.fingerprint!==fingerprint)throw Error('requestId已用于不同命令');return old.result;}
 const result=(async()=>{const before=snapshot(),revision=Number(before.stateVersion);if(expectedRevision!==undefined&&Number(expectedRevision)!==revision)throw Error('画布版本已变化，请读取最新状态');if(action==='snapshot')return{snapshot:before,revision,changedIds:[],documentRef:documentRefOf(before.projectId),saveReceipt:null};if(action==='flush_save')return{...await flushSave(),changedIds:[]};
 const value=action==='import_asset'?await importAsset(payload.assetId):action==='production'?{ok:true,result:await production(payload.method,payload.args)}:await bindings().execute({action,payload,requestId},{assertCurrent(){if(disposed)throw Error('画布已关闭');}});if(value?.ok===false)throw Error(value.error||'原画布拒绝命令');await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));bindings().invalidate?.();const saved=await flushSave();const a=new Map((before.nodes||[]).map(n=>[n.id,JSON.stringify(n)])),b=new Map((saved.snapshot.nodes||[]).map(n=>[n.id,JSON.stringify(n)]));const changedIds=[...new Set([...a.keys(),...b.keys()])].filter(id=>a.get(id)!==b.get(id));return{...saved,changedIds,actionResult:value};})();receipts.set(requestId,{fingerprint,result});return result;}
async function importAsset(assetId){
 if(typeof assetId!=='string'||!assetId)throw Error('缺少统一素材 assetId');
 const asset=await rpc('canvas_get_asset',{assetId});
 if(!asset.path)throw Error('统一素材没有本地原件');
 const name=String(asset.name||asset.path.split(/[\\/]/).at(-1)||'素材'),plainText=asset.kind==='text'&&/\.(?:txt|md|markdown)$/i.test(name);
 if(!['image','video','audio'].includes(asset.kind)&&!plainText)throw Error(asset.kind==='text'?'画布目前支持 UTF-8 的 .txt、.md、.markdown 文本；请先转换此文档格式':'此素材类型无法插入画布，支持图片、视频、音频和 UTF-8 文本');
 const textLimit=4*1024*1024;
 if(plainText&&Number(asset.size)>textLimit)throw Error('文本素材超过 4 MiB，请先拆分文件');
 const response=await fetch(window.__TAURI_INTERNALS__.convertFileSrc(asset.path));
 if(!response.ok)throw Error('读取统一素材原件失败');
 if(plainText){
  const chunks=[];let size=0;
  if(response.body){const reader=response.body.getReader();try{while(true){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>textLimit){await reader.cancel();throw Error('文本素材超过 4 MiB，请先拆分文件');}chunks.push(part.value);}}finally{reader.releaseLock();}}
  else{const bytes=new Uint8Array(await response.arrayBuffer());size=bytes.length;if(size>textLimit)throw Error('文本素材超过 4 MiB，请先拆分文件');chunks.push(bytes);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{throw Error('文本素材不是有效 UTF-8，请转换编码后导入');}
  if(text.includes('\0'))throw Error('文本素材含二进制空字符，未导入');
  const result=await bindings().execute({action:'create_node',requestId:crypto.randomUUID(),payload:{type:'text-node',nodeName:name,settings:{text,_assetId:asset.id},run:false}},{assertCurrent(){if(disposed)throw Error('画布已关闭');}});
  if(!result?.ok||!result.nodeId)throw Error(result?.error||'原画布未完成文本节点创建');
  return{...result,importedAssetId:asset.id,nodeIds:[result.nodeId],mediaKind:'text'};
 }
 const blob=await response.blob(),file=new File([blob],name,{type:asset.mimeType||blob.type}),transfer=new DataTransfer();transfer.items.add(file);
 const target=document.querySelector('[data-canvas-container="true"]');if(!target)throw Error('画布文件输入尚未就绪');
 const before=new Set(snapshot().nodes.map(n=>n.id)),r=target.getBoundingClientRect();target.dispatchEvent(new DragEvent('drop',{bubbles:true,cancelable:true,dataTransfer:transfer,clientX:r.x+r.width*.55,clientY:r.y+r.height*.5}));
 for(let i=0;i<200;i++){await wait(100);bindings().invalidate?.();const added=snapshot().nodes.filter(n=>!before.has(n.id));if(added.length)return{ok:true,nodeId:added[0].id,importedAssetId:asset.id,nodeIds:added.map(n=>n.id)};}
 throw Error('原画布未完成素材输入回调');
}
async function production(method,args){await ready;const facade=window.__AIYOUPLUS_PRODUCTION__;if(!facade||!['snapshot','saveRecipe','createFromCanvas','deleteRecipe','execute','control','saveTrigger','deleteTrigger','runTrigger'].includes(method)||typeof facade[method]!=='function')throw Error('不支持的生产工具方法');return facade[method](...(args||[]));}
function mountProjectControls(){const bar=document.createElement('nav');bar.dataset.dshProjectControls='true';bar.setAttribute('aria-label','项目文件');for(const [name,method]of [['导入项目','importProject'],['导出项目','exportProject']]){const button=document.createElement('button');button.type='button';button.textContent=name;button.onclick=async()=>{button.disabled=true;try{const callback=bindings()[method];if(typeof callback!=='function')throw Error('原项目文件功能尚未就绪');await callback();}catch(error){window.dispatchEvent(new CustomEvent('dsh-canvas-file-error',{detail:{message:error.message}}));const p=document.createElement('p');p.setAttribute('role','alert');p.textContent=error.message;bar.append(p);}finally{button.disabled=false;}};bar.append(button);}document.body.append(bar);}
function dispose(){if(disposed)return;disposed=true;void fetch(route+'/close',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(identity),keepalive:true}).catch(()=>{});window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.dispose();window.__DSH_CANVAS_REACT_ROOT__?.unmount();disposeShim();delete window.__DSH_CANVAS_BINDINGS__;document.querySelector('[data-dsh-project-controls]')?.remove();}
window.__DSH_CANVAS_PICK_TIMELINE_ASSET__=async()=>{
 const requestId=crypto.randomUUID(),dialog=document.createElement('dialog'),frame=document.createElement('iframe'),closeButton=document.createElement('button');
 dialog.className='dsh-gateway-picker';dialog.dataset.dshTimelineLibrary='true';dialog.style.cssText='width:min(1080px,92vw);max-width:92vw;height:min(760px,88vh);max-height:88vh;box-sizing:border-box;padding:12px;overflow:hidden;';
 const heading=document.createElement('h2');heading.textContent='从 DSH 素材库添加时间线素材';heading.style.cssText='margin:0 0 10px;font-size:16px;';
 closeButton.textContent='取消';closeButton.style.cssText='position:absolute;right:14px;top:4px;width:auto;margin:0;';
 frame.title='DSH 时间线素材库';frame.src='/aiyoucodex-dsh/asset-console/ui/?'+new URLSearchParams({picker:'canvas',requestId,kinds:'video,audio'});frame.style.cssText='display:block;width:100%;height:calc(100% - 36px);border:0;border-radius:8px;';frame.setAttribute('sandbox','allow-scripts allow-forms allow-same-origin allow-downloads');
 dialog.append(heading,closeButton,frame);document.body.append(dialog);
 return new Promise(resolve=>{
  let settled=false,pending=false;
  const close=value=>{if(settled)return;settled=true;window.removeEventListener('message',onMessage);dialog.close();dialog.remove();resolve(value);};
  const onMessage=async event=>{
   if(settled||pending||event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.type!=='dsh-asset-library-select'||event.data.requestId!==requestId)return;
   pending=true;
   try{
    const ids=event.data.assetIds;if(!Array.isArray(ids)||ids.length!==1||typeof ids[0]!=='string')throw Error('请选择一个视频或音频原件');
    const asset=await rpc('canvas_get_asset',{assetId:ids[0]});
    if(typeof asset.id!=='string'||!asset.id||!['video','audio'].includes(asset.kind)||!asset.path)throw Error('所选素材不是 DSH 视频或音频原件');
    const info=await rpc('aiyouplus_media_probe',{inputPath:asset.path});if(!(info.duration>0)||!['video','audio'].includes(info.kind))throw Error('素材时长不可解码');
    const source={id:crypto.randomUUID(),assetId:asset.id,kind:asset.kind,url:window.__TAURI_INTERNALS__.convertFileSrc(asset.path),localFilePath:asset.path,fileName:asset.name,duration:info.duration,width:info.width||0,height:info.height||0};
    frame.contentWindow.postMessage({type:'dsh-asset-library-result',requestId,ok:true},location.origin);close(source);
   }catch(error){if(!settled){pending=false;frame.contentWindow.postMessage({type:'dsh-asset-library-result',requestId,ok:false,message:error.message},location.origin);}}
  };
  window.addEventListener('message',onMessage);closeButton.onclick=()=>close(null);dialog.oncancel=event=>{event.preventDefault();close(null);};dialog.showModal();
 });
};
window.__DSH_CANVAS_OPEN_ASSET_LIBRARY__=({focusAssetId}={})=>{if(disposed)return;parent.postMessage({type:'dsh-canvas-open-asset-library',projectId:identity.projectId,sessionId:identity.sessionId,panelId:identity.panelId,...(typeof focusAssetId==='string'&&focusAssetId?{focusAssetId}:{})},location.origin);};
window.__DSH_CANVAS_SAVE_ASSET_LIBRARY__=async(items,resolveOriginal)=>{
 await ready;
 if(!Array.isArray(items)||!items.length||items.length>100||typeof resolveOriginal!=='function')throw Error('没有可保存的素材原件');
 const saved=[];
 for(const item of items){
  let asset;
  if(item.assetId)asset=await rpc('canvas_get_asset',{assetId:item.assetId}).catch(()=>null);
  if(!asset?.id||!asset?.path){
   let blob;
   // Prefer the original asset object, even when the node currently displays a thumbnail.
   if(item.assetId&&! /^(?:preview_|api_ref_)/.test(item.assetId))blob=await bindings().assetStore?.getAssetBlob(item.assetId).catch(()=>null);
   if(!blob){
    const url=String(item.originalUrl||item.url||'').trim();
    if(!url||url===item.thumbnailUrl||/\/thumbnails\//i.test(url))throw Error('无法确认素材原件，未使用缩略图保存');
    blob=await resolveOriginal({...item,url,originalUrl:url,thumbnailUrl:undefined});
   }
   if(!(blob instanceof Blob)||!blob.size||! /^(?:image|video|audio)\//.test(blob.type))throw Error('无法读取素材原件，未保存到 DSH 素材库');
   const file=new File([blob],String(item.name||'素材').replace(/[\\/]/g,'_'),{type:blob.type}),upload=await uploadBrowserFile(file);
   try{
    const rows=await rpc('aiyouplus_local_import',{inputPaths:[upload.path]});asset=rows?.[0];
    if(!asset?.id||!asset?.path)throw Error('DSH 未返回素材原件保存回执');
   }finally{await rpc('canvas_upload_cancel',{uploadId:upload.uploadId});}
  }
  saved.push(asset.id);
 }
 window.__DSH_CANVAS_OPEN_ASSET_LIBRARY__({focusAssetId:saved[0]});
 return{assetIds:saved,focusAssetId:saved[0]};
};
window.__DSH_CANVAS_OPEN_THEME_SETTINGS__=()=>{if(disposed)return;parent.postMessage({type:'dsh-canvas-open-theme-settings',projectId:identity.projectId,sessionId:identity.sessionId,panelId:identity.panelId},location.origin);};
window.__DSH_CANVAS_OPEN_PROJECTS__=()=>parent.postMessage({type:'dsh-canvas-show-projects',projectId:identity.projectId,sessionId:identity.sessionId},location.origin);
window.__DSH_CANVAS_OPEN_CHARACTERS__=async()=>{try{const {openCharacterLibrary}=await import('./local/character-library.js');await openCharacterLibrary({rpc,fileUrl:window.__TAURI_INTERNALS__.convertFileSrc,identity});}catch(error){const p=document.createElement('p');p.setAttribute('role','alert');p.textContent='角色库载入失败：'+error.message;document.body.append(p);}};
window.__DSH_CANVAS__={ready,snapshot,execute,flushSave,production,dispose,identity};
async function post(path,body){const response=await fetch(route+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...identity,...body})});const data=await response.json();if(!response.ok||!data.ok)throw Error(data.error?.message||data.error||'画布宿主连接失败');return data.value;}
async function heartbeat(){const current=snapshot();await post('/panel',{revision:Number(current.stateVersion),snapshot:current,documentRef:documentRefOf(current.projectId)});lastHeartbeat=Date.now();return current;}
async function submitCommand(command){await ready;if(disposed)throw Error('画布已关闭');const current=await heartbeat();return post('/command',{...command,expectedRevision:Number(current.stateVersion)});}
async function poll(){while(!disposed){try{if(Date.now()-lastHeartbeat>10000)await heartbeat();const url=new URL(route+'/events',location.origin);for(const[k,v]of Object.entries({...identity,cursor}))url.searchParams.set(k,v);const response=await fetch(url);const data=await response.json();if(!response.ok||!data.ok)throw Error(data.error?.message||data.error||'命令通道不可用');for(const event of data.value.events||[]){if(event.type==='native')emit(event.event,event.payload);else if(event.type==='command'){const command=event.command;try{const value=await execute(command);await post('/reply',{requestId:command.requestId,ok:true,value});}catch(error){await post('/reply',{requestId:command.requestId,ok:false,error:error.message});}}cursor=Math.max(cursor,Number(event.id)||0);}cursor=Math.max(cursor,Number(data.value.cursor)||0);}catch(error){if(!disposed){window.dispatchEvent(new CustomEvent('dsh-canvas-transport-error',{detail:{message:error.message}}));await wait(1000);}}}}
try{const boot=await bootstrap();await import('./local/canvas-model-adapter.js');await import('./assets/canvas.js');for(let i=0;i<300;i++){if(window.__DSH_CANVAS_BINDINGS__?.openProject&&typeof window.__qdmEmergencySave==='function'){const requestedDocument=new URLSearchParams(location.search).get('documentId');if(requestedDocument&&!/^(?:project:)?[A-Za-z0-9_-]+$/.test(requestedDocument))throw Error('项目文档标识无效');const last=requestedDocument||boot.lastDocumentRef||localStorage.getItem('dsh.lastDocumentRef');if(last){const opened=await bindings().openProject(last.replace(/^project:/,''));if(opened===false)throw Error('无法重开原文档');await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));}await window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__.refreshModels();await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));if(!last)await flushSave();readyResolve();mountProjectControls();await heartbeat();void poll();break;}await wait(100);if(i===299)throw Error('原画布初始化超时');}}catch(error){readyReject(error);const panel=document.createElement('pre');panel.id='dsh-canvas-error';panel.textContent='画布载入失败：'+error.message;document.body.append(panel);}
window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==parent||event.data?.type!=='dsh-canvas-import-asset'||event.data.projectId!==identity.projectId)return;void submitCommand({requestId:event.data.requestId||crypto.randomUUID(),action:'import_asset',payload:{assetId:event.data.assetId}}).then(value=>parent.postMessage({type:'dsh-canvas-import-result',projectId:identity.projectId,requestId:event.data.requestId,ok:true,value},location.origin),error=>parent.postMessage({type:'dsh-canvas-import-result',projectId:identity.projectId,requestId:event.data.requestId,ok:false,error:error.message},location.origin));});
document.addEventListener('drop',event=>{const raw=event.dataTransfer?.getData('application/x-aiyou-dsh-asset');if(!raw)return;event.preventDefault();event.stopPropagation();try{const asset=JSON.parse(raw);void submitCommand({requestId:crypto.randomUUID(),action:'import_asset',payload:{assetId:asset.assetId}}).catch(error=>window.dispatchEvent(new CustomEvent('dsh-canvas-import-error',{detail:{message:error.message}})));}catch(error){window.dispatchEvent(new CustomEvent('dsh-canvas-import-error',{detail:{message:error.message}}));}},true);
window.addEventListener('pagehide',dispose,{once:true});
