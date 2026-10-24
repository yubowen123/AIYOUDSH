'use strict';
// Import is inert. Polling starts only after a renderer explicitly syncs/runs a trigger.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const object = x => x && typeof x === 'object' && !Array.isArray(x);
const clone = x => JSON.parse(JSON.stringify(x));
const TYPES = new Set(['schedule', 'watch_folder', 'notify_failure']);
const FIELDS = ['lastFiredAt', 'lastFingerprint', 'pendingFiles', 'lastImportedFiles', 'lastError', 'lastRunStatus', 'lastStartedAt', 'lastCompletedAt', 'lastFireKey'];
const EXT = Object.fromEntries([['image','png jpg jpeg webp gif bmp svg avif'],['video','mp4 webm ogg mov avi mkv flv m4v'],['audio','mp3 wav m4a aac flac opus'],['text','md txt json yaml yml csv tsv xml html css js jsx ts tsx py java c cpp h hpp rs go toml ini log sql sh bat ps1 prompt srt vtt markdown rst org tex cfg conf properties']].flatMap(([kind,list]) => list.split(' ').map(ext => [ext,kind])));
const nameValid = x => typeof x === 'string' && x && x.length <= 320 && !/[\\/\0]/.test(x) && x !== '.' && x !== '..';
const hash = x => crypto.createHash('sha256').update(x).digest('hex');
function filesOf(value) {
  if (value == null) return [];
  if (!Array.isArray(value) || value.length > 80) throw new Error('触发器文件列表无效或超过80项');
  const seen = new Set();
  return value.map(file => {
    if (!object(file) || !nameValid(file.name) || seen.has(file.name.toLocaleLowerCase())) throw new Error('触发器文件名无效或重复');
    seen.add(file.name.toLocaleLowerCase());
    const kind = file.kind || EXT[path.extname(file.name).slice(1).toLowerCase()];
    if (!['image','video','audio','text'].includes(kind)) throw new Error('触发器文件类型无效');
    const result = {name:file.name,kind};
    for (const key of ['size','modifiedAt']) if (file[key] !== undefined) { if (!Number.isFinite(file[key]) || file[key] < 0) throw new Error('文件元数据无效'); result[key] = file[key]; }
    return result;
  });
}
function fingerprint(files) { return JSON.stringify(files.map(f => ({n:f.name,s:f.size,m:f.modifiedAt})).sort((a,b) => a.n.localeCompare(b.n)).slice(0,80)); }
function parseFingerprint(raw) { try { const x = JSON.parse(raw || '[]'); return Array.isArray(x) ? x : []; } catch { return []; } }
function normalizeItem(item,now) {
  if (!object(item) || typeof item.id !== 'string' || !item.id.trim() || item.id.length > 80 || !TYPES.has(item.kind)) throw new Error('触发器id/kind无效');
  if (item.recipeId !== undefined && (typeof item.recipeId !== 'string' || item.recipeId.length > 80)) throw new Error('触发器recipeId无效');
  if (item.folderPath !== undefined && (typeof item.folderPath !== 'string' || !path.isAbsolute(item.folderPath) || item.folderPath.includes('\0'))) throw new Error('监视文件夹必须是本机绝对路径');
  const result = {...clone(item),enabled:item.enabled !== false,createdAt:Number(item.createdAt)>0?Number(item.createdAt):now,updatedAt:Number(item.updatedAt)>0?Number(item.updatedAt):now};
  if (item.kind === 'schedule') result.everyMinutes = Math.max(5,Math.min(1440,Math.round(Number(item.everyMinutes)||30)));
  if (item.pendingFiles !== undefined) result.pendingFiles = filesOf(item.pendingFiles);
  return result;
}
function createSnapshot(input,pendingEvents=[]) { return clone({engine:'electron-local',notifyOnFailure:input?.notifyOnFailure !== false,items:Array.isArray(input?.items)?input.items:[],pendingEvents}); }
function createRuntime(options={}) {
  const clock = options.now || Date.now, leaseMs = options.leaseMs ?? 90000, stableMs = options.stableMs ?? 2000, retryMs = options.retryMs ?? 30000;
  if (![leaseMs,stableMs,retryMs].every(n=>Number.isFinite(n)&&n>=0) || leaseMs < 1) throw new Error('触发器运行时限额无效');
  const statePath = options.statePath || (options.userDataDir ? path.join(options.userDataDir,'Production/trigger-runtime.json') : null);
  if (statePath && !path.isAbsolute(statePath)) throw new Error('statePath必须是绝对路径');
  let state={version:1,notifyOnFailure:true,items:[],events:[],completed:[],observations:{},retryAt:{}}, loaded=false, closed=false, timer=null, queue=Promise.resolve(), emit=options.emit;
  async function load() {
    if (loaded) return;
    if (statePath) try {
      if ((await fs.stat(statePath)).size > 16*1024*1024) throw new Error('触发器持久队列超过限制');
      const saved=JSON.parse(await fs.readFile(statePath,'utf8'));
      if (saved.version!==1 || !Array.isArray(saved.items) || !Array.isArray(saved.events) || !Array.isArray(saved.completed) || !object(saved.observations) || !object(saved.retryAt)) throw new Error('触发器持久队列格式无效');
      if (saved.items.length>24 || saved.events.length>128 || saved.completed.length>256) throw new Error('触发器持久队列项目数超过限制');
      saved.items=saved.items.map(item=>normalizeItem(item,clock()));
      for (const e of saved.events) if (!object(e) || typeof e.eventId!=='string' || typeof e.triggerId!=='string' || !TYPES.has(e.kind) || !Array.isArray(e.files) || (e.lease && (typeof e.lease.consumerId!=='string' || !Number.isFinite(e.lease.expiresAt)))) throw new Error('触发器持久事件无效');
      state=saved;
    } catch(error) { if(error.code!=='ENOENT') throw error; }
    loaded=true;
  }
  async function persist() {
    if (!statePath) return;
    await fs.mkdir(path.dirname(statePath),{recursive:true});
    const temporary=statePath+'.'+crypto.randomUUID()+'.tmp';
    try { const file=await fs.open(temporary,'wx',0o600); try { await file.writeFile(JSON.stringify(state)); await file.sync(); } finally { await file.close(); } await fs.rename(temporary,statePath); }
    finally { await fs.rm(temporary,{force:true}); }
  }
  function snapshot(events=[]) { return createSnapshot(state,events); }
  function terminal(event,status,data={}) { state.completed.push({eventId:event.eventId,fireKey:event.fireKey,triggerId:event.triggerId,consumerId:event.lease?.consumerId,status,at:clock(),...data}); state.completed=state.completed.slice(-256); }
  function expire() {
    for (const event of state.events) if(event.lease && event.lease.expiresAt<=clock()) {
      event.lease=null;
      const item=state.items.find(i=>i.id===event.triggerId);
      if(item) Object.assign(item,{lastRunStatus:'interrupted',lastError:'执行窗口租约已到期，等待重新领取；实际结果尚未确认',updatedAt:clock()});
    }
  }
  function enqueue(item,files,fireKey,now) {
    if(state.events.some(e=>e.triggerId===item.id)) return false;
    if(state.events.length>=128) throw new Error('触发器待处理队列已满');
    state.events.push({eventId:'trigger-'+crypto.randomUUID(),fireKey,triggerId:item.id,kind:item.kind,recipeId:item.recipeId||'',...(item.folderPath?{folderPath:item.folderPath}:{}),files:clone(files),detectedAt:now,attempt:0,lease:null});
    Object.assign(item,{lastFireKey:fireKey,lastFiredAt:now,updatedAt:now}); return true;
  }
  async function scanFolder(folder) {
    const result=[];
    for(const entry of (await fs.readdir(folder,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))) {
      const kind=EXT[path.extname(entry.name).slice(1).toLowerCase()];
      if(!entry.isFile() || !nameValid(entry.name) || !kind) continue;
      const stat=await fs.lstat(path.join(folder,entry.name)); if(!stat.isFile() || stat.isSymbolicLink()) continue;
      // Match the native fs.stat ISO Date contract used by the renderer guard.
      // Date can round fractional milliseconds where trunc(mtimeMs) differs by 1 ms.
      result.push({name:entry.name,kind,size:stat.size,modifiedAt:stat.mtime.getTime()}); if(result.length>=80) break;
    }
    return result;
  }
  async function refresh() {
    expire(); const now=clock(); let fired=false;
    for(const item of state.items) {
      if(!item.enabled || !item.recipeId || item.kind==='notify_failure') continue;
      if(item.kind==='schedule') { const due=(item.lastFiredAt||item.createdAt||now)+item.everyMinutes*60000; if(now>=due) fired=enqueue(item,[],'schedule:'+item.id+':'+due,now)||fired; continue; }
      if(!item.folderPath) continue;
      try {
        const files=await scanFolder(item.folderPath), current=fingerprint(files), old=new Map(parseFingerprint(item.lastFingerprint).map(f=>[String(f.n).toLocaleLowerCase(),f]));
        const names=new Set(files.map(f=>f.name.toLocaleLowerCase())), pending=new Map((item.pendingFiles||[]).filter(f=>names.has(f.name.toLocaleLowerCase())).map(f=>[f.name.toLocaleLowerCase(),f]));
        if(item.lastFingerprint) for(const file of files) { const before=old.get(file.name.toLocaleLowerCase()); if(!before || before.s!==file.size || before.m!==file.modifiedAt) pending.set(file.name.toLocaleLowerCase(),file); }
        // The first scan establishes a baseline; existing files are not new inputs.
        item.lastFingerprint=current; item.pendingFiles=[...pending.values()];
        let observed=state.observations[item.id];
        if(!observed || observed.fingerprint!==current || observed.folderPath!==item.folderPath) observed=state.observations[item.id]={fingerprint:current,folderPath:item.folderPath,seenAt:now};
        if(item.pendingFiles.length && now-observed.seenAt>=stableMs && now>=(state.retryAt[item.id]||0)) {
          const last=state.completed.findLast(e=>e.triggerId===item.id&&['success','cancelled'].includes(e.status)), key='watch:'+item.id+':'+hash(fingerprint(item.pendingFiles)).slice(0,24);
          if(!last || last.fireKey!==key) fired=enqueue(item,item.pendingFiles,key,now)||fired;
        }
      } catch(error) { item.lastError='无法读取监视文件夹: '+error.message; item.updatedAt=now; }
    }
    return fired || state.events.some(event=>!event.lease);
  }
  async function transaction(work) {
    if(closed) throw new Error('触发器运行时已关闭'); await load(); const before=clone(state);
    try { const result=await work(); await persist(); return result; } catch(error) { state=before; throw error; }
  }
  function serial(work) { const next=queue.then(()=>transaction(work)); queue=next.catch(()=>{}); return next; }
  function notify(fired) { if(fired && typeof emit==='function') try { emit('production-trigger-fired',{pending:true}); } catch {} }
  function start() { if(timer || closed || options.autoStart===false) return; timer=setInterval(()=>tick().catch(e=>options.onError?.(e)),options.pollMs||1000); timer.unref?.(); }
  async function sync(args={}) {
    const result=await serial(async()=>{
      const incoming=args.snapshot; if(!object(incoming)||!Array.isArray(incoming.items)||incoming.items.length>24) throw new Error('触发器快照必须包含最多24条items');
      const ids=new Set(), now=clock(), old=new Map(state.items.map(i=>[i.id,i]));
      state.items=incoming.items.map(value=>{ const item=normalizeItem(value,now); if(ids.has(item.id)) throw new Error('触发器id重复'); ids.add(item.id); const previous=old.get(item.id); if(previous&&previous.updatedAt>=item.updatedAt) for(const key of FIELDS) { if(previous[key]===undefined) delete item[key]; else item[key]=clone(previous[key]); } return item; });
      state.notifyOnFailure=incoming.notifyOnFailure!==false;
      const enabled=new Map(state.items.filter(i=>i.enabled).map(i=>[i.id,i]));
      state.events=state.events.filter(event=>{ const item=enabled.get(event.triggerId); if(item&&item.kind===event.kind&&item.recipeId===event.recipeId&&item.folderPath===event.folderPath) return true; terminal(event,'cancelled'); const remains=state.items.find(i=>i.id===event.triggerId); if(remains) Object.assign(remains,{lastRunStatus:'interrupted',lastError:'触发器已停用、修改或删除；已派发任务结果尚未确认',updatedAt:now}); return false; });
      for(const key of Object.keys(state.observations)) if(!ids.has(key)) { delete state.observations[key]; delete state.retryAt[key]; }
      return {fired:await refresh(),value:snapshot()};
    }); start(); notify(result.fired); return result.value;
  }
  async function tick() { const result=await serial(async()=>({fired:await refresh(),value:snapshot()})); notify(result.fired); return result.value; }
  function consumer(args) { const id=args.consumerId??args.consumer_id; if(typeof id!=='string'||!id.trim()||id.length>180) throw new Error('consumerId缺失或无效'); return id; }
  async function takePending(args={}) {
    const owner=consumer(args); return serial(async()=>{ await refresh(); const event=state.events.find(e=>!e.lease); if(!event) return snapshot(); event.lease={consumerId:owner,expiresAt:clock()+leaseMs}; event.attempt++;
      const item=state.items.find(i=>i.id===event.triggerId); if(item) Object.assign(item,{lastRunStatus:'running',lastStartedAt:clock(),lastError:undefined,updatedAt:clock()});
      // The recovered renderer executes returned events serially, so lease one at a time.
      return snapshot([{...clone(event),consumerId:owner,leaseExpiresAt:event.lease.expiresAt}]); });
  }
  function requireLease(args) { const owner=consumer(args), event=state.events.find(e=>e.eventId===(args.eventId??args.event_id)); if(!event) throw new Error('触发事件不存在或已经确认'); if(!event.lease||event.lease.consumerId!==owner||event.lease.expiresAt<=clock()) throw new Error('触发事件租约不存在、已过期或属于其他窗口'); return event; }
  async function renew(args={}) { return serial(()=>{ const event=requireLease(args); event.lease.expiresAt=clock()+leaseMs; return true; }); }
  async function ack(args={}) {
    return serial(()=>{
      const id=args.eventId??args.event_id, owner=consumer(args); if(typeof args.success!=='boolean') throw new Error('ack success必须是布尔值');
      const prior=state.completed.findLast(e=>e.eventId===id); if(prior) { if(prior.consumerId===owner&&prior.status===(args.success?'success':'failed')&&JSON.stringify(prior.consumedFiles||[])===JSON.stringify(args.consumedFiles||[])) return snapshot(); throw new Error('触发事件已结束，不能重复或改变确认结果'); }
      const event=requireLease(args), now=clock(), consumed=args.consumedFiles==null?[]:args.consumedFiles;
      if(!Array.isArray(consumed)||consumed.some(name=>!nameValid(name)||!event.files.some(f=>f.name.toLocaleLowerCase()===name.toLocaleLowerCase()))) throw new Error('consumedFiles包含未领取的文件');
      const item=state.items.find(i=>i.id===event.triggerId);
      if(item) {
        Object.assign(item,{lastRunStatus:args.success?'success':'failed',lastCompletedAt:now,lastError:args.success?undefined:String(args.error||'自动生产失败').slice(0,500),updatedAt:now});
        if(args.success&&event.kind==='watch_folder') { const names=new Set(consumed.map(n=>n.toLocaleLowerCase())), claimed=new Map(event.files.map(f=>[f.name.toLocaleLowerCase(),f])); item.pendingFiles=(item.pendingFiles||[]).filter(f=>{ const old=claimed.get(f.name.toLocaleLowerCase()); return !names.has(f.name.toLocaleLowerCase())||!old||old.size!==f.size||old.modifiedAt!==f.modifiedAt; }); item.lastImportedFiles=consumed.slice(0,8); }
      }
      state.retryAt[event.triggerId]=args.success?0:now+retryMs; terminal(event,args.success?'success':'failed',{consumedFiles:consumed}); state.events=state.events.filter(e=>e!==event); return snapshot();
    });
  }
  async function runNow(args={}) {
    const result=await serial(()=>{ expire(); const item=state.items.find(i=>i.id===(args.triggerId??args.trigger_id)); if(!item) throw new Error('自动任务不存在'); if(!item.enabled) throw new Error('自动任务已暂停，请先启用'); if(!item.recipeId||item.kind==='notify_failure') throw new Error('此触发器没有可执行的生产模板'); return {fired:enqueue(item,filesOf(item.pendingFiles),'manual:'+item.id+':'+crypto.randomUUID(),clock()),value:snapshot()}; });
    start(); notify(result.fired); return result.value;
  }
  async function cancel(args={}) { return serial(()=>{ if(!args.eventId&&!args.triggerId) throw new Error('取消需要eventId或triggerId'); const events=state.events.filter(e=>args.eventId?e.eventId===args.eventId:e.triggerId===args.triggerId); if(!events.length) throw new Error('没有可取消的触发事件'); for(const event of events) { terminal(event,'cancelled'); const item=state.items.find(i=>i.id===event.triggerId); if(item) Object.assign(item,{lastRunStatus:'interrupted',lastError:'触发事件已取消；已派发任务结果尚未确认',updatedAt:clock()}); } const ids=new Set(events.map(e=>e.eventId)); state.events=state.events.filter(e=>!ids.has(e.eventId)); return snapshot(); }); }
  async function close() { if(timer) clearInterval(timer); timer=null; await queue; closed=true; }
  async function handle(cmd,args={}) {
    if(cmd==='production_trigger_runtime_sync') return sync(args); if(cmd==='production_trigger_runtime_take_pending') return takePending(args); if(cmd==='production_trigger_runtime_renew') return renew(args); if(cmd==='production_trigger_runtime_ack') return ack(args); if(cmd==='production_trigger_runtime_run_now') return runNow(args); if(cmd==='production_trigger_runtime_cancel') return cancel(args); throw new Error('未实现的原生命令: '+cmd+' (unknown command)');
  }
  return {handle,sync,takePending,renew,ack,runNow,cancel,tick,close,setEmitter(value){emit=value;}};
}
let runtime=null, runtimeContext={};
function setProductionTriggerRuntimeContext(context={}) { if(runtime&&context.userDataDir&&runtimeContext.userDataDir&&context.userDataDir!==runtimeContext.userDataDir) throw new Error('活动运行时不能切换userDataDir'); runtimeContext={...runtimeContext,...context}; if(runtime&&context.emit) runtime.setEmitter(context.emit); }
function defaultRuntime() { if(!runtime) { if(!runtimeContext.userDataDir&&!runtimeContext.statePath) { throw new Error('DSH requires an explicit per-project trigger runtime root'); } runtime=createRuntime(runtimeContext); } return runtime; }
function isProductionTriggerCommand(cmd) { return typeof cmd==='string'&&cmd.startsWith('production_trigger_runtime_'); }
function handleProductionTriggerCommand(cmd,args,context) { if(context) setProductionTriggerRuntimeContext(context); return defaultRuntime().handle(cmd,args); }
async function closeProductionTriggerRuntime() { if(runtime) await runtime.close(); runtime=null; }
module.exports={createRuntime,createSnapshot,isProductionTriggerCommand,handleProductionTriggerCommand,setProductionTriggerRuntimeContext,closeProductionTriggerRuntime};
