import {body,guardContext,json,route,stateRoot} from '../../runtime.mjs';
import {mountService,ownServices,service} from '../../services.mjs';
import {basename,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createPipeline} from '../../vendor/codex-taskboard/server/pipeline.mjs';
import {createTaskHall} from '../../vendor/codex-taskboard/server/task-hall.mjs';
import {readHallScheduledActivity} from '../../vendor/codex-taskboard/server/task-hall-automation.mjs';

import {createHallRoster} from '../../vendor/codex-taskboard/server/task-hall-roster.mjs';
import {createTaskHallAgents} from '../../vendor/codex-taskboard/server/task-hall-agents.mjs';
import {createDshHallModel,hasDshHallModelHost} from './hall-host.mjs';
import {createDshPipelineRunner} from './pipeline-host.mjs';
/** Complete SQLite project/task/workflow service with source-owned web UI. */
export const name='aiyou-enhancer-taskboard';
export const LANES=Object.freeze([{id:'backlog',label:'待规划'},{id:'todo',label:'待办'},{id:'in_progress',label:'进行中'},{id:'in_review',label:'待验收'},{id:'blocked',label:'受阻'},{id:'done',label:'已完成'}]);
export function apply(ctx){ctx=guardContext(ctx);ownServices(ctx,'taskboard');mountService(ctx,'taskboard');
  let modelHost, pipeline, taskHall, schedule, lastModeCheck = 0, isLocal = false;
  ctx.inject(['schedule'], host => {
    host.effect(() => {
      const current=host.schedule;
      schedule=current;
      return () => { if(schedule===current) schedule=null; };
    },'taskboard:native-schedule-catalog');
  });
  const getTaskHall=()=>taskHall??=createTaskHall();
  // The add-on build prefixes package directories; the source build uses module IDs.
  const installed=basename(dirname(fileURLToPath(import.meta.url)))==='aiyou-enhancer-taskboard';
  let readRoster;
  async function hallRoster(){
    try {
      if(!readRoster) {
        const {builtinAgentProfiles,createAgentDiscovery}=await import(installed
          ? '../aiyou-enhancer-agent-workspace/agent-discovery.mjs' : '../agent-workspace/agent-discovery.mjs');
        readRoster??=createHallRoster({discovery:createAgentDiscovery(),profiles:builtinAgentProfiles});
      }
      return await readRoster();
    } catch { return {available:false,items:[]}; }
  }
  ctx.effect(()=>()=>{taskHall?.close();taskHall=null;},'taskboard:task-hall');
  route(ctx,'/aiyoucodex-dsh/taskboard/task-hall',async(req,res,url)=>{
    const method=req.method;
    if(method!=='GET'&&method!=='POST')return json(res,405,{error:{message:'此接口仅接受 GET 或 POST。'}});
    if(method==='POST'&&!/^application\/json(?:;|$)/i.test(req.headers['content-type']||''))return json(res,415,{error:{message:'写入仅接受 JSON。'}});
    if([...url.searchParams.keys()].some(key=>method!=='GET'||key!=='projectId'||url.searchParams.getAll(key).length!==1))return json(res,400,{error:{message:'任务大厅查询参数无效。'}});
    try{
      const command=method==='POST'?await body(req,128*1024):null;
      const hall=getTaskHall();
      if(method==='POST')return json(res,200,hall.asOperator('dsh',command));
      const projectId=url.searchParams.get('projectId');
      const snapshot=hall.listOperator(projectId);
      const [roster,scheduledActivity]=await Promise.all([
        hallRoster(),readHallScheduledActivity({projectId,pipelineFile:join(stateRoot(),'taskboard','pipeline.sqlite'),dshNative:true,dshSchedule:schedule}),
      ]);
      return json(res,200,{...snapshot,roster,scheduledActivity});
    }catch(error){return json(res,error.status||500,{error:{message:error.status?error.message:'任务大厅请求未完成。'}});}
  });
  ctx.inject(['llm','agentDefaultModel'], host => {
    host.effect(() => { modelHost = host; return () => { if (modelHost === host) modelHost = null; }; }, 'taskboard:pipeline-model');
    if (!hasDshHallModelHost(host)) return;
    host.effect(() => {
      let attached=true, agents, hall;
      const warn=({phase}={})=>{
        const label=phase==='execution'?'任务执行未完成':phase==='readiness'?'模型尚未就绪':'自动接入暂不可用';
        console.warn('[AIYOU Task Hall] DSH Agent '+label+'。');
      };
      // Own the supervisor's DB connection independently from HTTP requests.
      // Same configured file, so both clients see every committed transition;
      // plugin unload can drain the worker before its connection closes.
      try {
        hall=createTaskHall();
        agents=createTaskHallAgents({hall,adapters:{dsh:createDshHallModel(()=>attached?host:null)},onError:warn});
      } catch {
        hall?.close();
        warn();
        return;
      }
      try { Promise.resolve(agents.start()).catch(()=>warn()); }
      catch { warn(); }
      return async()=>{
        attached=false;
        try { await agents.close(); }
        finally { hall.close(); }
      };
    }, 'taskboard:hall-native-agent');
  });
  async function taskboard(path) {
    const running=await service('taskboard');
    const response=await fetch(running.origin+path,{headers:{'x-aiyou-internal-token':running.token},signal:AbortSignal.timeout(5000)});
    if(response.status===404)return null;
    if(!response.ok)throw Object.assign(Error('项目管理服务暂不可用。'),{status:503});
    return response.json();
  }
  async function localMode(force=false) {
    if (!force && Date.now() - lastModeCheck < 5000) return isLocal;
    isLocal = (await taskboard('/api/local/cloud-session'))?.mode === 'local';
    lastModeCheck = Date.now();
    return isLocal;
  }
  // Keep the timer owned by the native module. Avoid starting the Taskboard
  // child just for an empty pipeline database.
  ctx.effect(() => {
    const current=createPipeline({
      file:join(stateRoot(),'taskboard','pipeline.sqlite'),engine:'DSH 原生模型',
      runner:createDshPipelineRunner(()=>modelHost),available:()=>Boolean(modelHost),
      project:async id=>(await taskboard('/api/projects'))?.projects.find(p=>p.id===id),
      task:async(_projectId,id)=>(await taskboard('/api/tasks/'+encodeURIComponent(id)))?.task,
      issues:async id=>(await taskboard('/api/tasks?projectId='+encodeURIComponent(id)+'&archived=false'))?.tasks||[],
      canDispatch:()=>Boolean(modelHost)&&localMode(),
    });
    pipeline=current;
    return async()=>{if(pipeline===current)pipeline=null;await current.close();};
  },'taskboard:pipeline');
  route(ctx,'/aiyoucodex-dsh/taskboard/pipeline',async(req,res,url)=>{
    if(!['GET','POST'].includes(req.method))return json(res,405,{error:{message:'此接口仅接受 GET 或 POST。'}});
    if(!pipeline)return json(res,503,{error:{message:'执行服务未就绪。'}});
    if(!(await localMode(true)))return json(res,409,{error:{message:'流水线使用本机项目；共享看板暂不自动运行。'}});
    try{
      const command=req.method==='POST'?await body(req,128*1024):null;
      if(req.method==='POST'&&(!command||typeof command!=='object'||Array.isArray(command)))return json(res,400,{error:{message:'请求须为 JSON 对象。'}});
      return json(res,200,await pipeline.request(command?command.projectId:url.searchParams.get('projectId'),command));
    }catch(error){return json(res,error.status||500,{error:{message:error.status?error.message:'流水线请求未完成。'}});}
  });
  route(ctx,'/aiyoucodex-dsh/taskboard/status',async(req,res)=>{await service('taskboard');json(res,200,{ready:true,owned:true,storage:'DSH_HOME/aiyou-enhancer/taskboard/taskboard.sqlite'});});
  route(ctx,'/aiyoucodex-dsh/taskboard',async(req,res)=>{const running=await service('taskboard');const response=await fetch(running.origin+'/api/tasks',{headers:{'x-aiyou-internal-token':running.token}});const value=await response.json();if(!response.ok)return json(res,response.status,value);const tasks=value.tasks||[];json(res,200,{reachable:true,tasks,lanes:LANES.map(l=>({...l,count:tasks.filter(t=>t.status===l.id&&!t.archivedAt).length})),projects:[]});});
}
