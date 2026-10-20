import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdtemp,rm} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

// Use the vendored current application's actual registration and matching code.
const nativeRequire=createRequire(new URL('../test/runtime/package.json',import.meta.url));
const {WebServer}=await import(pathToFileURL(nativeRequire.resolve('@deepseek-ai/dsh-host-webserver')).href);
const {Context}=await import(pathToFileURL(nativeRequire.resolve('@deepseek-ai/cordis')).href);
const nativeContext=new Context();
const regressionContext=new Context();
const config={host:'127.0.0.1',port:0,compression:'none'};
const webServer=new WebServer(nativeContext,config);
const brokenWebServer=new WebServer(regressionContext,config);
const disposers=[];
// Only Cordis activation is synchronous in this isolated fixture. Routes and
// handlers are registered by mountService, without duplicating its path logic.
const mountContext={
 webServer,
 inject(dependencies,apply){assert.deepEqual(dependencies,['webServer']);return apply(this);},
 effect(register){const dispose=register();disposers.push(dispose);return dispose;},
};
const server=createServer(async(req,res)=>{
 try{
  const matched=webServer.match(new URL(req.url??'/','http://fixture').pathname);
  if(matched===undefined){res.writeHead(404);res.end();return;}
  await matched.handler(req,res);
 }catch(error){
  if(res.headersSent){res.destroy(error);return;}
  res.writeHead(500,{'content-type':'application/json'});res.end(JSON.stringify({error:error.message}));
 }
});
const root=dirname(fileURLToPath(import.meta.url));
const fixture=await mkdtemp(join(root,'.verification-embedded-'));
const previousHome=process.env.DSH_HOME;
process.env.DSH_HOME=join(fixture,'profile');
const {mountService,service,stopServices}=await import('./services.mjs');
const results=[];
try{
 for(const kind of ['asset-console','taskboard'])mountService(mountContext,kind);
 assert.equal(webServer.prefixes.size,2);
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 for(const kind of ['asset-console','taskboard']){
  const prefix='/aiyoucodex-dsh/'+kind+'/ui/';
  const registered=webServer.match(prefix);
  assert.ok(registered,kind+' root is not registered');
  assert.equal(registered.kind,'prefix');
  assert.equal(registered.path,prefix.slice(0,-1),kind+' native prefix must omit its trailing slash');
  assert.equal(webServer.match(prefix.slice(0,-1)+'-neighbor/'),undefined);
  let response=await fetch(origin+prefix);
  assert.equal(response.status,200,prefix);
  const html=await response.text();
  const paths=[...html.matchAll(/(?:src|href)="([^"#]+)"/gu)].map(m=>m[1]).filter(p=>!p.startsWith('http'));
  assert.ok(paths.some(path=>new URL(path,origin+prefix).pathname.endsWith('.css')),kind+' stylesheet is absent');
  assert.ok(paths.some(path=>new URL(path,origin+prefix).pathname.endsWith('.js')),kind+' script is absent');

  // Reproduce the old registration against the same native class: its root
  // HTML matches, while ordinary descendants require an unintended double '/'.
  brokenWebServer.register({...registered,path:prefix});
  assert.equal(brokenWebServer.match(prefix)?.path,prefix);
  for(const path of paths){
   const url=new URL(path,origin+prefix);
   assert.ok(url.pathname.startsWith(prefix),url.pathname);
   assert.equal(brokenWebServer.match(url.pathname),undefined,'old trailing-slash registration unexpectedly matches '+url.pathname);
   assert.equal(webServer.match(url.pathname),registered,'native registration misses '+url.pathname);
   response=await fetch(url);
   assert.equal(response.status,200,url.pathname);
   if(url.pathname.endsWith('.js')){
    const source=await response.text();
    assert.ok(source.includes(prefix+'api/'),kind+' API mount is absent');
    for(const match of source.matchAll(/from\s+["'](\.\/[\w.-]+\.js)["']/gu)){
     const dependency=new URL(match[1],url);
     assert.equal(webServer.match(dependency.pathname),registered,dependency.pathname);
     assert.equal((await fetch(dependency)).status,200,dependency.pathname);
    }
   }
  }
  assert.equal(brokenWebServer.match(prefix+'api/projects'),undefined);
  response=await fetch(origin+prefix+'api/projects');
  assert.equal(response.status,200);
  const data=await response.json();
  assert.ok(Array.isArray(data.projects));
  const current=await service(kind);
  assert.ok(!JSON.stringify(data).includes(current.token));
  if(kind==='asset-console')assert.equal(data.projects[0].id,'dsh-assets');
  results.push({check:kind+'-mountService-native-match-html-js-css-imports-and-api',ok:true,resources:paths.length});
  results.push({check:kind+'-native-trailing-slash-regression',ok:true,rootMatches:true,descendantsMatch:false});
 }
 console.log(JSON.stringify({ok:true,matcher:'vendored installed-app WebServer.register/match',results},null,2));
}finally{
 server.closeAllConnections();
 if(server.listening)await new Promise(resolve=>server.close(resolve));
 for(const dispose of disposers.reverse())dispose();
 await stopServices();
 await Promise.all([nativeContext.fiber.dispose(),regressionContext.fiber.dispose()]);
 await rm(fixture,{recursive:true,force:true});
 if(previousHome===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previousHome;
}
