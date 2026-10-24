import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {dirname,join,resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const SOURCE=dirname(fileURLToPath(import.meta.url));
// Rebuild recovered shared-scope canvas from its maintained source on every build.
await import('./vendor/aiyouplus-canvas/scripts/build.mjs');
export async function buildAiyou(appDir){
  const app=resolve(appDir);const dsh=join(app,'dsh');const domain=join(dsh,'aiyou');
  await mkdir(domain,{recursive:true});
  await cp(SOURCE,domain,{recursive:true,filter:file=>!file.includes('/.verification/')&&!file.endsWith('/build.mjs')&&!file.endsWith('/verify.mjs')&&!file.endsWith('/verify-embedded.mjs')});
  const manifest=JSON.parse(await readFile(join(SOURCE,'manifest.json'),'utf8'));
  for(const module of manifest.modules){
    const target=join(dsh,'node_modules',...module.name.split('/'));await mkdir(target,{recursive:true});
    const meta=JSON.parse(await readFile(join(SOURCE,'modules',module.id,'package.json'),'utf8'));
    await writeFile(join(target,'package.json'),JSON.stringify(meta,null,2)+'\n');
    await writeFile(join(target,'index.js'),`export * from '../../../aiyou/modules/${module.id}/index.js';\n`);
    if(module.client)await cp(join(SOURCE,'modules',module.id,'client.js'),join(target,'client.js'));
  }
  const descriptorFile=join(dsh,'desktop-runtime.json');
  const descriptor=JSON.parse(await readFile(descriptorFile,'utf8'));
  const names=new Set(manifest.modules.map(m=>m.name));
  descriptor.sharedPackages=[...descriptor.sharedPackages.filter(p=>!names.has(p.name)),...manifest.modules.map(m=>({name:m.name,version:manifest.version,path:'node_modules/'+m.name}))];
  await writeFile(descriptorFile,JSON.stringify(descriptor,null,2)+'\n');
  const packageFile=join(dsh,'package.json');const pkg=JSON.parse(await readFile(packageFile,'utf8'));
  pkg.dependencies={...pkg.dependencies,...Object.fromEntries(manifest.modules.map(m=>[m.name,manifest.version]))};
  await writeFile(packageFile,JSON.stringify(pkg,null,2)+'\n');
  return {modules:manifest.modules.length,source:'dsh/aiyou',registry:manifest.modules.map(m=>({id:'aiyou-enhancer-'+m.id,name:m.name})),tabKinds:manifest.modules.filter(m=>m.tabKind).map(m=>({module:m.id,kind:m.tabKind}))};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  if(!process.argv[2])throw new Error('Usage: node aiyou/build.mjs <built app directory>');
  console.log(JSON.stringify(await buildAiyou(process.argv[2]),null,2));
}
/** Package the enhancement as a removable native Cordis add-on; never mutates the real profile. */
export async function buildAddonFeatures(outDir){
  const target=resolve(outDir);if(target===SOURCE||target.startsWith(SOURCE+sep))throw new Error('Addon output must be outside the feature source directory');
  await mkdir(target,{recursive:true});
  for(const name of ['runtime.mjs','services.mjs','service-worker.mjs','manifest.json','registry.json','builtin-cordis.patch.yml','LICENSE-AIYOUCODEX','THIRD_PARTY_NOTICES.md','lib','vendor'])await cp(join(SOURCE,name),join(target,name),{recursive:true});
  const manifest=JSON.parse(await readFile(join(SOURCE,'manifest.json'),'utf8'));
  // The native workspace owns row state in the add-on composition.
  const activeModules=manifest.modules.filter(module=>module.id!=='session-state');
  for(const module of activeModules)await cp(join(SOURCE,'modules',module.id),join(target,'modules',module.name.split('/').at(-1)),{recursive:true});
  const packages=activeModules.map(module=>({name:module.name,source:'modules/'+module.name.split('/').at(-1),profileLink:'node_modules/'+module.name,id:'aiyou-enhancer-'+module.id,tabKind:module.tabKind}));
  await writeFile(join(target,'feature-manifest.json'),JSON.stringify({...manifest,modules:activeModules},null,2)+'\n');
  await writeFile(join(target,'registry.json'),JSON.stringify(packages.map(({id,name})=>({id,name})),null,2)+'\n');
  await writeFile(join(target,'builtin-cordis.patch.yml'),packages.map(({id,name})=>`- insert:\n    id: ${JSON.stringify(id)}\n    name: ${JSON.stringify(name)}\n`).join(''));
  await writeFile(join(target,'addon-features.json'),JSON.stringify({schemaVersion:1,stateDirectory:'${DSH_HOME}/aiyou-enhancer',packages},null,2)+'\n');
  return {modules:activeModules.length,packages};
}
