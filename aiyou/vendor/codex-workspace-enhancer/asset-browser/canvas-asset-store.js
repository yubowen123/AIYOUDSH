/** Unified canonical identities, owned originals and references for the DSH library.
 * This module is instantiated only by the existing asset service writer.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

const MAX_BYTES = 512 * 1024 * 1024;
const TYPES = {
  '.png':['image','image/png'], '.jpg':['image','image/jpeg'], '.jpeg':['image','image/jpeg'],
  '.webp':['image','image/webp'], '.gif':['image','image/gif'], '.bmp':['image','image/bmp'],
  '.tif':['image','image/tiff'], '.tiff':['image','image/tiff'], '.avif':['image','image/avif'],
  '.heic':['image','image/heic'], '.heif':['image','image/heif'],
  '.mp4':['video','video/mp4'], '.mov':['video','video/quicktime'], '.m4v':['video','video/mp4'], '.webm':['video','video/webm'],
  '.mp3':['audio','audio/mpeg'], '.wav':['audio','audio/wav'], '.m4a':['audio','audio/mp4'], '.aac':['audio','audio/aac'],
  '.flac':['audio','audio/flac'], '.ogg':['audio','audio/ogg'], '.oga':['audio','audio/ogg'], '.opus':['audio','audio/ogg'],
  '.txt':['text','text/plain'], '.md':['text','text/markdown'], '.markdown':['text','text/markdown'],
  '.rtf':['text','application/rtf'], '.doc':['text','application/msword'], '.docx':['text','application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const legacyId = file => Buffer.from(path.resolve(file)).toString('base64url');
const now = () => new Date().toISOString();
const inside = (root, file) => { const relative=path.relative(path.resolve(root),path.resolve(file));return relative===''||relative!=='..'&&!relative.startsWith('..'+path.sep)&&!path.isAbsolute(relative); };
function fail(message,statusCode=400,code='ASSET_INVALID'){throw Object.assign(new Error(message),{statusCode,code});}
function text(value,label,max=512){if(typeof value!=='string'||!value.trim()||value.length>max||/[\x00-\x1f]/.test(value)||['__proto__','constructor','prototype'].includes(value))fail(label+'无效');return value.trim();}
function optional(value,label,max){return value===undefined||value===''?'':text(value,label,max);}
function aliases(value){return value===undefined?[]:[...new Set((Array.isArray(value)?value:[value]).map(v=>text(v,'资产别名',8192)))];}
function cleanName(value){const name=text(value,'文件名',240);if(path.basename(name)!==name||/[\\/]/.test(name)||name==='.'||name==='..')fail('文件名不能包含路径');return name;}
export function isCanvasThumbnail(file){return /(?:^|[\\/])(?:thumbnails?|thumbs?)(?:[\\/]|$)|(?:^|[\\/])[^\\/]*(?:\.thumb(?:nail)?|[-_]thumbnail)(?:\.[^.]+)?$/i.test(String(file));}
function checkOriginalName(file){if(isCanvasThumbnail(file))fail('缩略图不能作为原件入库或解析',400,'THUMBNAIL_NOT_ORIGINAL');}
function inspect(bytes,name,mimeType){
  const extension=path.extname(name).toLowerCase(),type=TYPES[extension];
  if(!type)fail('不支持此原件格式');
  if(!bytes.length||bytes.length>MAX_BYTES)fail('原件为空或超过512MiB');
  const ascii=(start,length)=>bytes.toString('ascii',start,start+length),magic=bytes.subarray(0,16);
  let valid=false;
  if(extension==='.png')valid=bytes.length>=33&&magic.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))&&ascii(12,4)==='IHDR'&&bytes.readUInt32BE(16)>0&&bytes.readUInt32BE(20)>0&&bytes.subarray(-8,-4).toString()==='IEND';
  else if(['.jpg','.jpeg'].includes(extension))valid=bytes.length>4&&bytes[0]===255&&bytes[1]===216&&bytes[bytes.length-2]===255&&bytes[bytes.length-1]===217;
  else if(extension==='.webp')valid=bytes.length>=20&&ascii(0,4)==='RIFF'&&ascii(8,4)==='WEBP'&&bytes.readUInt32LE(4)+8<=bytes.length;
  else if(extension==='.gif')valid=bytes.length>=14&&/^GIF8[79]a$/.test(ascii(0,6))&&bytes[bytes.length-1]===59;
  else if(extension==='.bmp')valid=bytes.length>=54&&ascii(0,2)==='BM';
  else if(['.tif','.tiff'].includes(extension))valid=bytes.length>8&&(magic.subarray(0,4).equals(Buffer.from([73,73,42,0]))||magic.subarray(0,4).equals(Buffer.from([77,77,0,42])));
  else if(['.avif','.heic','.heif','.mp4','.m4v','.mov','.m4a'].includes(extension))valid=bytes.length>=16&&ascii(4,4)==='ftyp'&&bytes.readUInt32BE(0)>=16&&bytes.readUInt32BE(0)<=bytes.length;
  else if(extension==='.webm')valid=bytes.length>16&&magic.subarray(0,4).equals(Buffer.from([26,69,223,163]));
  else if(extension==='.wav')valid=bytes.length>=44&&ascii(0,4)==='RIFF'&&ascii(8,4)==='WAVE'&&bytes.readUInt32LE(4)+8<=bytes.length&&bytes.includes(Buffer.from('data'));
  else if(extension==='.mp3')valid=bytes.length>16&&(ascii(0,3)==='ID3'||bytes[0]===255&&(bytes[1]&224)===224);
  else if(extension==='.aac')valid=bytes.length>8&&bytes[0]===255&&(bytes[1]&246)===240;
  else if(extension==='.flac')valid=bytes.length>42&&ascii(0,4)==='fLaC';
  else if(['.ogg','.oga','.opus'].includes(extension))valid=bytes.length>28&&ascii(0,4)==='OggS';
  else if(extension==='.rtf')valid=bytes.toString('ascii',0,5)==='{\\rtf';
  else if(extension==='.doc')valid=bytes.length>512&&magic.subarray(0,8).equals(Buffer.from([208,207,17,224,161,177,26,225]));
  else if(extension==='.docx')valid=bytes.length>32&&magic.subarray(0,4).equals(Buffer.from([80,75,3,4]))&&bytes.includes(Buffer.from('[Content_Types].xml'));
  else if(type[0]==='text'){try{new TextDecoder('utf-8',{fatal:true}).decode(bytes);valid=!bytes.includes(0);}catch{}}
  if(!valid)fail('原件内容与格式不符或容器不完整');
  if(mimeType&&mimeType.split(';')[0]!==type[1]&&!(extension==='.wav'&&mimeType==='audio/x-wav'))fail('原件MIME与格式不符');
  return {kind:type[0],mimeType:type[1],extension,size:bytes.length,sha256:digest(bytes)};
}
async function readOriginal(file){
  if(typeof file!=='string'||!path.isAbsolute(file))fail('原件必须为绝对路径');
  checkOriginalName(file);
  const before=await fs.lstat(file);if(!before.isFile()||before.isSymbolicLink())fail('原件必须为真实普通文件');
  const real=await fs.realpath(file);checkOriginalName(real);
  const handle=await fs.open(real,'r');
  try{
    const stat=await handle.stat();if(!stat.isFile()||stat.size<1||stat.size>MAX_BYTES)fail('原件为空或超过512MiB');
    const bytes=await handle.readFile(),after=await handle.stat();
    if(after.size!==stat.size||after.mtimeMs!==stat.mtimeMs||bytes.length!==stat.size)fail('原件在读取时发生变化，请重试',409);
    return {bytes,real,stat:after};
  }finally{await handle.close();}
}
function publicAsset(asset){return {id:asset.id,path:asset.path,name:asset.name,kind:asset.kind,mimeType:asset.mimeType,size:asset.size,sha256:asset.sha256,aliases:[...asset.aliases],projectIds:[...asset.projectIds]};}
function empty(){return {schemaVersion:1,assets:{},references:{},requests:{}};}
function validateState(value){
  if(!value||value.schemaVersion!==1||!value.assets||!value.references||!value.requests)fail('统一素材登记格式损坏，已保留原文件',500);
  for(const [id,asset]of Object.entries(value.assets))if(!asset||asset.id!==id||!path.isAbsolute(asset.path)||!Array.isArray(asset.aliases)||!Array.isArray(asset.projectIds)||!/^[a-f0-9]{64}$/.test(asset.sha256))fail('统一素材记录无效，已保留原文件',500);
  return value;
}

export function createCanvasAssetStore({root,loadConfig,updateConfig,listLegacy,resolveLegacy,renameLegacy,deleteLegacy,recoverLegacyRename=async()=>{},syncPaths=async()=>{},notify=()=>{}}){
  root=path.resolve(root);const registryFile=path.join(root,'canvas-assets.json'),ownedRoot=path.join(root,'assets','canvas-originals');
  let state,loading,recovering,renaming=false,queue=Promise.resolve();
  async function ready(){if(!state)await(loading||=fs.readFile(registryFile,'utf8').then(raw=>validateState(JSON.parse(raw))).catch(error=>{if(error.code==='ENOENT')return empty();throw error;}).then(value=>(state=value)).catch(error=>{loading=null;throw error;}));if(!renaming&&Object.keys(state.pendingRenames||{}).length){if(!recovering)recovering=recoverRenames().finally(()=>{recovering=null;});await recovering;}return state;}
  async function persist(draft){
    await fs.mkdir(root,{recursive:true});const temp=registryFile+'.'+randomUUID()+'.tmp';
    try{await fs.writeFile(temp,JSON.stringify(draft)+'\n',{mode:0o600,flag:'wx'});await fs.rename(temp,registryFile);}finally{await fs.rm(temp,{force:true});}
  }
  function serial(operation){const pending=queue.catch(()=>{}).then(async()=>{await ready();return operation();});queue=pending;return pending;}
  function find(value,snapshot=state){return snapshot&&Object.hasOwn(snapshot.assets,value)?snapshot.assets[value]:Object.values(snapshot?.assets||{}).find(a=>a.aliases.includes(value)||a.path===value)||null;}
  function addAliases(draft,asset,values){for(const alias of values){const existing=find(alias,draft);if(existing&&existing.id!==asset.id)fail('资产别名已绑定其它原件',409,'ASSET_ALIAS_CONFLICT');if(alias!==asset.id&&!asset.aliases.includes(alias))asset.aliases.push(alias);}}
  async function recoverRenames(){
    const draft=structuredClone(state);
    for(const [id,intent]of Object.entries(draft.pendingRenames||{})){
      const asset=draft.assets[id];
      if(!asset||intent.from!==asset.path||!path.isAbsolute(intent.to||'')||path.dirname(intent.from)!==path.dirname(intent.to)||intent.to===intent.from||intent.sha256!==asset.sha256)fail('改名恢复记录无效，已保留登记和引用保护',500,'ASSET_RENAME_RECOVERY_REQUIRED');
      const matches=async file=>{try{return digest((await readOriginal(file)).bytes)===asset.sha256;}catch(error){if(error.code==='ENOENT')return false;throw error;}};
      const fromExists=await matches(intent.from),toExists=fromExists?false:await matches(intent.to);
      if(!fromExists&&!toExists)fail('改名后的原件位置尚不能确认，已保留登记和引用保护',409,'ASSET_RENAME_RECOVERY_REQUIRED');
      if(!fromExists){await recoverLegacyRename({previousPath:intent.from,nextPath:intent.to});asset.path=intent.to;asset.name=path.basename(intent.to);asset.updatedAt=now();addAliases(draft,asset,[intent.from,legacyId(intent.from),intent.to,legacyId(intent.to)]);}
      delete draft.pendingRenames[id];
    }
    if(!Object.keys(draft.pendingRenames||{}).length)delete draft.pendingRenames;
    await persist(draft);state=draft;
  }
  async function ensureProject(projectId){
    let selected;
    await updateConfig(config=>{
      config.projects||=[];selected=projectId||config.projects.find(p=>p.id==='dsh-assets')?.id||config.projects[0]?.id||'dsh-assets';
      selected=text(selected,'项目ID',240);
      let project=config.projects.find(p=>p.id===selected);
      if(!project){project={id:selected,name:selected==='dsh-assets'?'本地资产库':selected,path:ownedRoot,folders:[ownedRoot],scanRoots:['.']};config.projects.push(project);}
      else if(!(project.folders||[]).some(folder=>inside(folder,ownedRoot)))project.folders=[...(project.folders||[project.path]).filter(Boolean),ownedRoot];
    });
    await fs.mkdir(ownedRoot,{recursive:true});return selected;
  }
  async function commit(draft,paths=[]){await persist(draft);state=draft;await syncPaths(paths);notify('asset-change');}
  async function validateAsset(asset){
    if(!asset||asset.trashed)return null;
    checkOriginalName(asset.path);const record=await readOriginal(asset.path);
    if(record.bytes.length!==asset.size||digest(record.bytes)!==asset.sha256)fail('资产原件内容已变化，请重新登记后使用',409,'ASSET_CONTENT_CHANGED');
    return publicAsset(asset);
  }
  async function adopt(draft,alias,row){
    const resolved=row?.sourcePath?{filePath:row.sourcePath}:await resolveLegacy(alias);
    if(!resolved?.filePath)return null;
    const file=path.resolve(resolved.filePath),known=find(file,draft)||find(legacyId(file),draft);
    if(known){addAliases(draft,known,aliases(alias));return known;}
    const record=await readOriginal(file),meta=inspect(record.bytes,path.basename(file));
    const config=await loadConfig(),projectIds=row?.projectId?[row.projectId]:config.assetAssignments?.[file]?[config.assetAssignments[file]]:config.projects.filter(p=>(p.folders||[p.path]).some(folder=>inside(folder,file))).map(p=>p.id);
    const asset={id:'asset-'+randomUUID(),path:file,name:path.basename(file),kind:meta.kind,mimeType:meta.mimeType,size:meta.size,sha256:meta.sha256,aliases:[],projectIds:[...new Set(projectIds)],owned:false,createdAt:now()};
    draft.assets[asset.id]=asset;addAliases(draft,asset,[legacyId(file),file,...aliases(alias)]);return asset;
  }
  async function get(assetId){
    const id=text(assetId,'资产ID',8192);await ready();const existing=find(id);if(existing)return validateAsset(existing);
    return serial(async()=>{const known=find(id);if(known)return validateAsset(known);const draft=structuredClone(state);let asset;try{asset=await adopt(draft,id);}catch(error){if(error.code==='ENOENT'||error.message==='素材引用无效'||error.message==='素材不属于任何本地项目'||error.message==='素材文件不存在或不是普通文件')return null;throw error;}if(!asset)return null;await commit(draft);return validateAsset(asset);});
  }
  async function list({projectId,kind,query}={}){
    await ready();const rows=await listLegacy({projectId,kind,query});
    return serial(async()=>{
      const draft=structuredClone(state);let changed=false;
      for(const row of rows||[]){if(find(row.id,draft)||find(row.sourcePath,draft))continue;try{const adopted=await adopt(draft,row.id,row);if(adopted)changed=true;}catch(error){if(error.code==='THUMBNAIL_NOT_ORIGINAL'||error.code==='ENOENT')continue;throw error;}}
      if(changed)await commit(draft);
      const needle=String(query||'').trim().toLocaleLowerCase();
      return Object.values(state.assets).filter(a=>!a.trashed&&(!projectId||a.projectIds.includes(projectId))&&(!kind||a.kind===kind)&&(!needle||(a.name+' '+a.aliases.join(' ')).toLocaleLowerCase().includes(needle))).map(publicAsset);
    });
  }
  async function ingest(bytes,options,sourcePath){
    const name=cleanName(options.name||path.basename(sourcePath||'asset.bin'));checkOriginalName(name);
    const meta=inspect(bytes,name,options.mimeType),requestedAliases=aliases(options.alias),requestId=optional(options.requestId,'请求ID',512),source=optional(options.source,'来源',2000);
    if(sourcePath)requestedAliases.push(legacyId(sourcePath),sourcePath);
    const fingerprint=digest(Buffer.from(JSON.stringify({sha256:meta.sha256,name,projectId:options.projectId||'',source,aliases:requestedAliases})));
    return serial(async()=>{
      const receipt=requestId&&Object.hasOwn(state.requests,requestId)&&state.requests[requestId];
      if(receipt){if(receipt.fingerprint!==fingerprint)fail('同一请求ID不能用于不同入库内容',409,'ASSET_REQUEST_CONFLICT');const previous=state.assets[receipt.assetId];if(!previous||previous.trashed)fail('该请求的原资产已删除，禁止静默重新入库',409);await syncPaths([previous.path]);return validateAsset(previous);}
      const draft=structuredClone(state),projectId=await ensureProject(options.projectId);
      if(Object.values(draft.assets).some(asset=>asset.owned&&asset.trashed&&asset.sha256===meta.sha256))fail('相同原件仍在回收区，请先撤销删除',409);
      const sourceAsset=sourcePath&&find(sourcePath,draft);
      if(sourceAsset&&sourceAsset.sha256!==meta.sha256)fail('已登记的来源原件内容已变化',409,'ASSET_CONTENT_CHANGED');
      if(sourceAsset?.trashed)fail('来源资产已进入回收区，请先撤销删除',409);
      let asset=sourceAsset||Object.values(draft.assets).find(a=>!a.trashed&&a.sha256===meta.sha256&&a.kind===meta.kind);
      if(asset)await validateAsset(asset);
      else{
        const folder=path.join(ownedRoot,meta.sha256.slice(0,2)),destination=path.join(folder,meta.sha256+meta.extension);
        await fs.mkdir(folder,{recursive:true});const temp=destination+'.'+randomUUID()+'.tmp';
        try{await fs.writeFile(temp,bytes,{mode:0o600,flag:'wx'});if(digest(await fs.readFile(temp))!==meta.sha256)fail('原件副本校验失败',500);try{await fs.link(temp,destination);}catch(error){if(error.code!=='EEXIST')throw error;if(digest(await fs.readFile(destination))!==meta.sha256)fail('已有原件内容冲突',409);} }finally{await fs.rm(temp,{force:true});}
        asset={id:'asset-'+randomUUID(),path:destination,name,kind:meta.kind,mimeType:meta.mimeType,size:meta.size,sha256:meta.sha256,aliases:[],projectIds:[],owned:true,source,createdAt:now()};draft.assets[asset.id]=asset;
      }
      addAliases(draft,asset,[legacyId(asset.path),asset.path,...requestedAliases]);if(!asset.projectIds.includes(projectId))asset.projectIds.push(projectId);
      if(asset.assignmentPreviousProjectIds&&!asset.assignmentPreviousProjectIds.includes(projectId))asset.assignmentPreviousProjectIds.push(projectId);
      if(requestId)draft.requests[requestId]={fingerprint,assetId:asset.id};
      await commit(draft,[asset.path]);return publicAsset(asset);
    });
  }
  async function ingestFile(filePath,options={}){const record=await readOriginal(filePath);return ingest(record.bytes,{...options,name:options.name||path.basename(filePath)},path.resolve(filePath));}
  async function ingestBytes(bytes,options={}){if(!(bytes instanceof Uint8Array))fail('入库内容必须为字节');return ingest(Buffer.from(bytes),options);}
  async function resolveForMutation(assetId){const asset=await get(assetId);if(!asset)fail('资产不存在',404,'ASSET_NOT_FOUND');return asset.id;}
  function reference(options={}){return Object.fromEntries(['projectId','nodeId','slot'].map(key=>[key,optional(options[key],key,512)]));}
  async function mutateReference(assetId,options,remove=false){
    const id=await resolveForMutation(assetId),ref=reference(options),key=JSON.stringify(ref);
    return serial(async()=>{
      const draft=structuredClone(state),asset=draft.assets[id];if(!asset||asset.trashed)fail('资产不存在',404,'ASSET_NOT_FOUND');
      draft.references[id]||={};if(remove)delete draft.references[id][key];else{
        await validateAsset(asset);
        if(ref.projectId){const projectId=await ensureProject(ref.projectId);if(!asset.projectIds.includes(projectId))asset.projectIds.push(projectId);if(asset.assignmentPreviousProjectIds&&!asset.assignmentPreviousProjectIds.includes(projectId))asset.assignmentPreviousProjectIds.push(projectId);}
        draft.references[id][key]=ref;
      }
      await commit(draft,[asset.path]);return publicAsset(asset);
    });
  }
  async function rename(assetId,newName){
    const id=await resolveForMutation(assetId);let name=cleanName(newName);checkOriginalName(name);
    return serial(async()=>{
      const draft=structuredClone(state),asset=draft.assets[id];
      if(!asset||asset.trashed)fail('资产不存在',404,'ASSET_NOT_FOUND');
      const extension=path.extname(asset.path);if(!path.extname(name))name+=extension;
      if(path.extname(name).toLowerCase()!==extension.toLowerCase())fail('重命名不能改变原件格式');
      if(name===asset.name)return publicAsset(asset);
      const previousPath=asset.path;let nextPath=previousPath,physicalRenamed=false;
      if(asset.owned){asset.name=name;asset.updatedAt=now();await commit(draft,[previousPath]);return publicAsset(asset);}
      const intendedPath=path.join(path.dirname(previousPath),name),staged=structuredClone(state);
      staged.pendingRenames||={};staged.pendingRenames[id]={from:previousPath,to:intendedPath,sha256:asset.sha256,createdAt:now()};
      // A durable intent reserves the existing canonical ID and references even
      // if the process exits between the physical move and registry commit.
      await persist(staged);state=staged;renaming=true;
      try{
        const renamed=await renameLegacy({assetId:legacyId(previousPath),name});nextPath=renamed.filePath||Buffer.from(renamed.assetId,'base64url').toString();physicalRenamed=true;
        if(path.resolve(nextPath)!==intendedPath)fail('改名结果与已登记的目标不一致',409,'ASSET_RENAME_RECOVERY_REQUIRED');
        asset.path=nextPath;asset.name=path.basename(nextPath);asset.updatedAt=now();addAliases(draft,asset,[legacyId(previousPath),previousPath,legacyId(nextPath),nextPath]);
        await commit(draft,[previousPath,nextPath]);return publicAsset(asset);
      }catch(error){
        // Legacy metadata failures roll their files back themselves. A later
        // canonical persistence failure also attempts the inverse operation.
        if(physicalRenamed&&state.pendingRenames?.[id])await renameLegacy({assetId:legacyId(intendedPath),name:path.basename(previousPath)}).catch(()=>{});
        if(state.pendingRenames?.[id])await recoverRenames().catch(recovery=>{error.recoveryCode=recovery.code||'ASSET_RENAME_RECOVERY_REQUIRED';});
        throw error;
      }finally{renaming=false;}
    });
  }
  async function remove(assetId){
    const id=await resolveForMutation(assetId);
    return serial(async()=>{
      if(Object.keys(state.references[id]||{}).length)fail('资产仍被画布或项目引用，不能删除',409,'ASSET_REFERENCED');
      const draft=structuredClone(state),asset=draft.assets[id];
      if(!asset||asset.trashed)fail('资产不存在',404,'ASSET_NOT_FOUND');
      if(asset.owned){await fs.unlink(asset.path);await updateConfig(config=>{delete config.assetMetadata?.[asset.path];delete config.assetAssignments?.[asset.path];});}
      else await deleteLegacy({assetId:legacyId(asset.path),confirmName:path.basename(asset.path)});
      delete draft.assets[id];delete draft.references[id];await commit(draft,[asset.path]);return {removed:true,id};
    });
  }
  async function resolveRegistered(assetId){await ready();const asset=find(assetId);return asset?validateAsset(asset):null;}
  function projectIdsForPath(file){const asset=find(path.resolve(file));return asset?[...asset.projectIds]:null;}
  function recordForPath(file){const asset=find(path.resolve(file));return asset&&!asset.trashed?publicAsset(asset):null;}
  function isOwnedPath(file){const asset=find(path.resolve(file));return Boolean(asset&&inside(ownedRoot,asset.path));}
  function pathsForProject(projectId){return Object.values(state?.assets||{}).filter(a=>!a.trashed&&a.projectIds.includes(projectId)).map(a=>a.path);}
  // Existing DSH physical operations share this queue with ingestion/reference writes.
  // Canonical records follow moves and reversible trash; automatic cleanup never moves them.
  async function mutateLegacyFiles({paths=[],recursive=false,mode,relocate,projectId,sourceProjectId}={},operation){
    if(typeof operation!=='function')throw new TypeError('Missing legacy file operation');
    const roots=paths.map(file=>path.resolve(file));
    return serial(async()=>{
      const affected=Object.values(state.assets).filter(asset=>roots.some(root=>recursive?inside(root,asset.path):root===asset.path));
      if(mode==='quarantine'&&affected.length)return null;
      if(mode==='trash')for(const asset of affected)if(Object.keys(state.references[asset.id]||{}).length)fail('资产仍被画布或项目引用，不能删除',409,'ASSET_REFERENCED');
      const result=await operation();if(!affected.length)return result;
      const draft=structuredClone(state),changed=[];
      for(const previous of affected){
        const asset=draft.assets[previous.id];
        if(mode==='trash'){asset.trashed=true;asset.updatedAt=now();changed.push(asset.path);}
        else if(mode==='restore'){delete asset.trashed;await validateAsset(asset);asset.updatedAt=now();changed.push(asset.path);}
        else if(mode==='relocate'){
          const destination=path.resolve(relocate(result,asset.path));
          const original=await readOriginal(destination);if(digest(original.bytes)!==asset.sha256)fail('移动后的原件校验失败',409);
          asset.path=destination;asset.name=path.basename(destination);asset.owned=asset.owned&&inside(ownedRoot,destination);asset.updatedAt=now();
          addAliases(draft,asset,[previous.path,legacyId(previous.path),destination,legacyId(destination)]);
          if(projectId){
            const referencedProjects=Object.values(draft.references[asset.id]||{}).map(ref=>ref.projectId);
            asset.projectIds=[...new Set([...asset.projectIds.filter(id=>id!==sourceProjectId||referencedProjects.includes(id)),projectId])];
            if(asset.assignmentPreviousProjectIds)asset.assignmentPreviousProjectIds=[...new Set([...asset.assignmentPreviousProjectIds.filter(id=>id!==sourceProjectId||referencedProjects.includes(id)),projectId])];
          }
          changed.push(previous.path,destination);
          await updateConfig(config=>{for(const key of ['assetMetadata','assetAssignments'])if(config[key]&&Object.hasOwn(config[key],previous.path)){config[key][destination]=key==='assetAssignments'&&projectId?projectId:config[key][previous.path];delete config[key][previous.path];}});
        }
      }
      await commit(draft,changed);return result;
    });
  }
  async function assignProject(file,projectId,operation){
    return serial(async()=>{
      const result=await operation(),known=find(path.resolve(file));if(!known)return result;
      const draft=structuredClone(state),asset=draft.assets[known.id],referenceProjects=Object.values(draft.references[asset.id]||{}).map(ref=>ref.projectId).filter(Boolean);
      if(projectId){asset.assignmentPreviousProjectIds||=[...asset.projectIds];asset.projectIds=[...new Set([projectId,...referenceProjects])];}
      else{const config=await loadConfig(),previous=asset.assignmentPreviousProjectIds||(asset.owned?asset.projectIds:config.projects.filter(project=>(project.folders||[project.path]).some(folder=>inside(folder,asset.path))).map(project=>project.id));asset.projectIds=[...new Set([...previous,...referenceProjects])];delete asset.assignmentPreviousProjectIds;}
      await commit(draft,[asset.path]);return result;
    });
  }
  async function refreshPath(file){
    return serial(async()=>{const known=find(path.resolve(file));if(!known)return;const original=await readOriginal(known.path),meta=inspect(original.bytes,path.basename(known.path));const draft=structuredClone(state);Object.assign(draft.assets[known.id],{sha256:meta.sha256,size:meta.size,kind:meta.kind,mimeType:meta.mimeType,updatedAt:now()});await commit(draft,[known.path]);});
  }
  return {ready,list,get,ingestFile,ingestBytes,addReference:(id,options)=>mutateReference(id,options),removeReference:(id,options)=>mutateReference(id,options,true),rename,remove,resolveRegistered,projectIdsForPath,recordForPath,isOwnedPath,pathsForProject,refreshPath,mutateLegacyFiles,assignProject};
}

export function canvasAssetRoute(store){
  return async(req,res,url)=>{
    if(url.pathname!=='/api/canvas-assets')return false;
    if(req.method!=='POST'){res.writeHead(405,{'content-type':'application/json'});res.end(JSON.stringify({error:'需要POST'}));return true;}
    // The generic UI proxy strips this header. Only the owned Host client sends it.
    if(req.headers['x-aiyou-canvas-gateway']!=='1'){res.writeHead(403,{'content-type':'application/json'});res.end(JSON.stringify({error:'统一素材操作需要宿主授权客户端'}));return true;}
    try{
      const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>MAX_BYTES*1.4+1024*1024)fail('入库请求过大',413);chunks.push(chunk);}
      const {action,args={}}=JSON.parse(Buffer.concat(chunks).toString());let value;
      if(action==='list')value=await store.list(args);
      else if(action==='get')value=await store.get(args.assetId);
      else if(action==='ingestFile')value=await store.ingestFile(args.filePath,args.options);
      else if(action==='ingestBytes'){if(typeof args.base64!=='string'||!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(args.base64))fail('入库Base64无效');value=await store.ingestBytes(Buffer.from(args.base64,'base64'),args.options);}
      else if(action==='addReference'||action==='removeReference')value=await store[action](args.assetId,args.options);
      else if(action==='rename')value=await store.rename(args.assetId,args.newName);
      else if(action==='remove')value=await store.remove(args.assetId);
      else fail('未知素材操作');
      res.writeHead(200,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify({value}));
    }catch(error){res.writeHead(error.statusCode||400,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify({error:error.message,code:error.code}));}
    return true;
  };
}
