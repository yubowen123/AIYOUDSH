/** Host client for the one DSH asset-service writer. No registry writes here. */
export function createAssetGateway({connect}) {
  if(typeof connect!=='function')throw new TypeError('AssetGateway requires owned-service connect');
  async function call(action,args={}){
    const current=await connect(),origin=new URL(current.origin);
    if(origin.protocol!=='http:'||!['127.0.0.1','localhost','[::1]'].includes(origin.hostname)||origin.username||origin.password||origin.pathname!=='/'||origin.search||origin.hash)throw new Error('AssetGateway只允许已拥有的本机服务');
    if(typeof current.token!=='string'||current.token.length<32||/[\r\n\x00]/.test(current.token))throw new Error('AssetGateway服务认证未就绪');
    const response=await fetch(new URL('/api/canvas-assets',origin),{method:'POST',redirect:'error',headers:{'content-type':'application/json','x-asset-console-token':current.token,'x-aiyou-canvas-gateway':'1'},body:JSON.stringify({action,args}),signal:AbortSignal.timeout(120000)});
    const result=await response.json();
    if(!response.ok||result.error)throw Object.assign(new Error(result.error||'DSH素材服务操作失败'),{statusCode:response.status,code:result.code});
    return result.value;
  }
  return {
    list:options=>call('list',options),get:assetId=>call('get',{assetId}),
    ingestFile:(filePath,options={})=>call('ingestFile',{filePath,options}),
    ingestBytes:(bytes,options={})=>{if(!(bytes instanceof Uint8Array))throw new TypeError('入库内容必须为字节');return call('ingestBytes',{base64:Buffer.from(bytes).toString('base64'),options});},
    addReference:(assetId,options={})=>call('addReference',{assetId,options}),
    removeReference:(assetId,options={})=>call('removeReference',{assetId,options}),
    rename:(assetId,newName)=>call('rename',{assetId,newName}),remove:assetId=>call('remove',{assetId}),
  };
}
