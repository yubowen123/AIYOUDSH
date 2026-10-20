import test from 'node:test';
import assert from 'node:assert/strict';
import {cp,mkdtemp,mkdir,readFile,rm,symlink} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';

const root=new URL('../../../',import.meta.url);
const built=new URL('dist/addon/runtime/modules/aiyou-native-workspace/',root);
const runtimeRequire=createRequire(new URL('test/runtime/package.json',root));

test('actual packaged workspace imports through a profile symlink outside the app and registers its projection',async()=>{
  const temporary=await mkdtemp(join(tmpdir(),'aiyou-workspace-addon-'));
  let ctx;
  try{
    const physical=join(temporary,'versioned runtime','modules','aiyou-native-workspace');
    await cp(fileURLToPath(built),physical,{recursive:true});
    const profile=join(temporary,'profile','node_modules','@local');await mkdir(profile,{recursive:true});
    const link=join(profile,'aiyou-native-workspace');await symlink(physical,link,'dir');
    const metadata=JSON.parse(await readFile(join(link,'package.json'),'utf8'));
    assert.equal(metadata.name,'@local/aiyou-native-workspace');
    // Node resolves ESM from the real package path. This fails if the build omitted its declared zod dependency.
    const host=await import(pathToFileURL(join(link,'lib','index.js')).href);
    assert.equal(typeof host.apply,'function');assert.deepEqual(host.inject,['sessionProjections']);
    const {Context}=await import(pathToFileURL(runtimeRequire.resolve('@deepseek-ai/cordis')).href);
    const {SessionProjectionRegistry}=await import(pathToFileURL(runtimeRequire.resolve('@deepseek-ai/dsh-session-projection')).href);
    ctx=new Context();const registry=new SessionProjectionRegistry(ctx);host.apply(ctx);
    const session={seq:0,header:{id:'fixture',version:4,createdAt:0,isSeeded:false},inheritedEventCount:0,snapshotEvents:()=>[],eventAt:()=>undefined};
    assert.equal(registry.snapshot(session).values.aiyouSidebar.turn,0);
  }finally{await ctx?.fiber.dispose();await rm(temporary,{recursive:true,force:true});}
});
