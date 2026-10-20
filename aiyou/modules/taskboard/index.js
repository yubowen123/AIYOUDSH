import {guardContext,json,route} from '../../runtime.mjs';
import {mountService,ownServices,service} from '../../services.mjs';
/** Complete SQLite project/task/workflow service with source-owned web UI. */
export const name='aiyou-enhancer-taskboard';
export const LANES=Object.freeze([{id:'backlog',label:'待规划'},{id:'todo',label:'待办'},{id:'in_progress',label:'进行中'},{id:'in_review',label:'待验收'},{id:'blocked',label:'受阻'},{id:'done',label:'已完成'}]);
export function apply(ctx){ctx=guardContext(ctx);ownServices(ctx,'taskboard');mountService(ctx,'taskboard');
  route(ctx,'/aiyoucodex-dsh/taskboard/status',async(req,res)=>{await service('taskboard');json(res,200,{ready:true,owned:true,storage:'DSH_HOME/aiyou-enhancer/taskboard/taskboard.sqlite'});});
  route(ctx,'/aiyoucodex-dsh/taskboard',async(req,res)=>{const running=await service('taskboard');const response=await fetch(running.origin+'/api/tasks',{headers:{'x-aiyou-internal-token':running.token}});const value=await response.json();if(!response.ok)return json(res,response.status,value);const tasks=value.tasks||[];json(res,200,{reachable:true,tasks,lanes:LANES.map(l=>({...l,count:tasks.filter(t=>t.status===l.id&&!t.archivedAt).length})),projects:[]});});
}
