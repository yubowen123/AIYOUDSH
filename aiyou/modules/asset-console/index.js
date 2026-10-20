import {guardContext,json,route} from '../../runtime.mjs';
import {mountService,ownServices,service,proxy} from '../../services.mjs';
/** The complete AIYOU asset business service is built into this source tree. */
export const name='aiyou-enhancer-asset-console';
export function apply(ctx){
  ctx=guardContext(ctx);ownServices(ctx,'asset-console');mountService(ctx,'asset-console');
  route(ctx,'/aiyoucodex-dsh/asset-console/status',async(req,res)=>{await service('asset-console');json(res,200,{ready:true,owned:true,storage:'DSH_HOME/aiyou-enhancer/asset-console',scope:'new-profile-only'});});
  for(const endpoint of ['library','cases','prompt','character','media','mark'])route(ctx,'/aiyoucodex-dsh/asset-console/'+endpoint,async(req,res,url)=>proxy('asset-console',req,res,(endpoint==='media'?'/media':'/api/'+endpoint)+url.search));
}
