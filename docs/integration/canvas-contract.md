# DSH Canvas host contract v1

Scope: AIYOUDSH owns application, conversation/model selection, authentication, asset library and plugin lifecycle. PLUS contributes the recovered canvas and local engines. No second desktop window, account or authoritative asset library.

## Shared APIs

`createAssetGateway({connect})` (`aiyou/lib/canvas/asset-gateway.mjs`) returns an asynchronous client; `connect()` resolves the owned asset-console service `{origin,token}`. Its sole writer is the existing asset service. Methods:

- `list({projectId,kind,query}={}) -> Asset[]`
- `get(assetId) -> Asset | null`
- `ingestFile(filePath,{projectId,source,requestId,alias}={}) -> Asset`
- `ingestBytes(bytes,{name,mimeType,projectId,source,requestId,alias}={}) -> Asset`
- `addReference(assetId,{projectId,nodeId,slot}={})`, `removeReference(...)`
- `rename(assetId,newName) -> Asset`, `remove(assetId)` (reject while referenced)

Asset: `{id,path,name,kind,mimeType,size,sha256,aliases,projectIds}`. `id` is stable canonical identity; old path IDs and PLUS IDs are aliases. `path` always identifies an actual original, never a thumbnail. Existing DSH schema1 records/metadata retained. All gateway operations use authenticated service routes; no direct competing writers in the Host process.

`createModelService({stateDir,assets,llm,fetch,emit,mediaTools,credentials})` (`aiyou/lib/canvas/model-service.mjs`) returns:

- `invoke(command,args={},context={sessionId,projectId,signal}) -> value`
- `dispose()`

Preserve `aiyouplus_model_config/configure/catalog/discover/generate/jobs/stop/resume` value shapes for renderer compatibility. Public config has a host chat model (no copied Key); media catalog only is user configured. `llm(request,{sessionId,projectId,signal})` is the host-owned text/multimodal adapter; preserve messages/tools/tool choice/cancellation. Discovery analyze uses the same host adapter, never an extra LLM Key. Media completion must ingest original through `assets.ingestFile`; generic request/task/receipt safeguards and test-only Wuread remain. Native credentials or session storage only, no cleartext persistent Key.

`createCanvasBackend({rootDir,assets,models,emit,mediaTools,host})` (`aiyou/lib/canvas/runtime-host.mjs`) returns:

- `invoke(command,args={},context={sessionId,projectId,signal}) -> value`
- `dispose()`

It runs in Node Host, with no Electron app globals or secondary BrowserWindow. Host callbacks may include model invocation, file-open/save integration and typed events. Filesystem mutations confined to owned project/cache/export roots; DSH originals read through asset gateway. Unsupported native-only operations fail visibly rather than returning fake success. Renderer frontend under `aiyou/vendor/aiyouplus-canvas/` stays self-contained with source/provenance and generated static assets; do not copy the whole PLUS repository.

## Authenticated routes owned by root integration module

`/aiyoucodex-dsh/canvas/ui/` serves embedded canvas frontend.
`POST /aiyoucodex-dsh/canvas/rpc` accepts `{command,args,sessionId,projectId}` and returns `{ok,value}` or actual error.
`GET /aiyoucodex-dsh/canvas/file?...` reads only gateway-authorized originals or owned outputs, with range support.
`GET /aiyoucodex-dsh/canvas/events` and corresponding reply route carry typed commands/events. Panel handshake binds `{panelId,sessionId,projectId}`; project mismatch/stale revision rejected.

Root owns Cordis module, routes, project/command coordinator, menu registration, combined build/package and final QA. Contexts passed explicitly; no reliance on a global active project.

## Action receipts

All commands carry `{requestId,projectId,expectedRevision,action,payload}`. Same request ID returns original result; same ID/different payload rejected. `accepted` != `completed`. Writes return actual snapshot/revision/changed IDs and save receipt, or real error. Native chat tools derive identity from `exec.agent.session.id`, not model-provided session ID. Cancellation stops local waiting; paid asynchronous tasks remain tracked and are never silently re-POSTed.

No new real video generation in this integration task. Fixtures and existing actual approved media may validate paths, but are explicitly distinguished from supplier generation.
