/** Owned child process for isolated built-in local services. */
const kind=process.argv[2];
if(kind==='taskboard'){
  const {createTaskboardServer}=await import('./vendor/codex-taskboard/server/app.mjs');
  const app=createTaskboardServer();
  const address=await app.listen({host:'127.0.0.1',port:0});
  process.send?.({type:'ready',port:address.port});
  for(const signal of ['SIGTERM','SIGINT'])process.once(signal,()=>app.close().finally(()=>process.exit(0)));
}else if(kind==='asset-console'){
  await import('./vendor/codex-workspace-enhancer/asset-browser/server.js');
}else throw new Error('Unknown internal service');
