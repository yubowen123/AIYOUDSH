# DSH 嵌入画布

从冻结的 AIYOUPLUS 1.3.1 恢复工程选择移植。原工程及交付包未修改。本目录不是独立 Electron 应用，不包含供应商凭证、Electron runtime、node_modules 或模型权重。

## 入口与边界

- 宿主静态根是 `public/`。画布入口 `index.html`，工具入口 `tools.html?module=media|pipeline|world|production`。
- 每个入口必须传 `projectId`，并传入宿主生成的 `panelId` 与可空的 `sessionId`。Storage 和 IndexedDB 在当前 iframe 内按 projectId 分区，父 DSH 的存储对象保持原样。
- `scripts/build.mjs` 按顺序合并 41 个原始 JS 分片；分片共享词法作用域，不能分别作为模块加载。构建仅在内存中对精确锚点变换，`src/js` 保持冻结来源。
- 原 `$Oi → fdi → GOi` 画布保留；不挂载原 `TJt` 独立主页。工具菜单为独立页面，不包含原工作台素材库或模型设置表单。
- 所有模型、共享原件、项目文件、命令与事件经同源 `/aiyoucodex-dsh/canvas/`。文字默认 `host/dsh-current`，原文字解析入口也委托宿主模型；媒体模型来自宿主启用目录。嵌入 renderer 禁止独立访问远端供应商。

## 宿主依赖

`aiyou/lib/canvas/runtime-host.mjs` 导出 `createCanvasBackend({rootDir, assets, models, emit, mediaTools, host})`。

- 每个 DSH 项目一个绝对 owned root；后端提供 `invoke`、`media`、`probe`、`authorizeFile`、`dispose` 和 `directories`。
- `assets` 为 DSH 唯一素材 Gateway。内部缓存原件和工具产物必须经 `ingestFile` 注册；每次原文档保存按 `canvas:<documentRef>` 更新 canonical 引用差异，释放已删节点引用；首次迁移先保护所有可读取文档，再移除其可确定的 legacy canvas 引用，不猜测删除无法归属的历史引用；共享原件只读，cache cleanup 不能删除或覆盖。模型参考图先校验 owned staging，再入统一库，模型只收到 canonical 原件路径。
- `models.invoke` 由宿主提供。移植包不管理 Key 或独立模型账户。`emit(event,payload,context)` 由宿主投送当前项目的 native 事件。
- 需要 Node 24 的 `node:sqlite`。FFmpeg/FFprobe 通过 `mediaTools.ffmpegPath/ffprobePath` 注入，宿主另行打包 `vendor/media-tools`，本目录不复制二进制或依赖全目录。图片 decode/resize 使用真实 FFmpeg，不依赖 Electron nativeImage。
- 生产工具的 `host.production({method,args}, context)` 必须发到当前项目实际画布 coordinator，再取真实 `actionResult.result`。后端自身可管理项目内定时/文件夹 trigger runtime，并在 dispose 时关闭。
- 浏览器等价文件选择由 shim 的真实 file input 提供；文件经 UUID、严格 offset/字节数和项目/session 绑定的分块 RPC 写入 owned staging。浏览器命名保存先分配 owned exports 目标，实际写完才提供同源下载；原 ZIP/JSON exporter 使用同一真实可写 handle，并在 close 后下载实际文件。3D 打开场景使用真实 JSON file input。浏览器目录选择明确不支持，不能冒称选择了本机目录。

## 画布动作与真实保存

`public/actions.json` 是可调用动作、节点类型、精确 payload 示例与模型选择规则。`execute_node`/`run_generation` 回执表示原节点派发结果，媒体完成还须读取宿主 job，不能将 accepted 当成媒体成功。

`window.__DSH_CANVAS__` 暴露 `ready` Promise、`snapshot()`、`execute(command)`、`flushSave()`、`production(method,args)`、`dispose()`。snapshot 来自原 `eOi` 状态；原文档切换会重置版本，因此桥保留 `sourceStateVersion`，把 `stateVersion` 映射为本项目持久单调的宿主 revision。节点、连线等内容仍来自原状态。execute 经过原 `WLi → LDi → KDi/VLi` executor；没有第二份 shadow graph。写动作随后调用原保存回调，并读取实际 payload/patch 文件返回 SHA、字节数与 `documentRef`。

原持久化可能把最新节点写入 `autosave-patch.json`；宿主验证回执时应同时核对 payload 与可选 patch。`documentRef=project:<原文档ID>`，与 DSH projectId 分开。宿主保存映射并检查 snapshot.projectId 与原文档ID一致。

pagehide/unmount 调用 POST `/close`（keepalive JSON）释放面板 lease。关闭后立即重开无需等待过期时间。parent 素材消息仅接受同 origin 的 parent 来源：`{type:'dsh-canvas-import-asset',projectId,assetId,requestId}`；DSH 拖放 MIME 为 `application/x-aiyou-dsh-asset`。两种入口在提交前先 await heartbeat，把同一实际 snapshot/revision 登记到宿主，再经 `/command` 排序、原 File drop 与真实保存回执。

## 验证

- `node --test aiyou/vendor/aiyouplus-canvas/test/runtime-host.test.mjs`：13 项真实文件、SQLite、Gateway、staging、分块上传/导出、生产 RPC、批量拷贝与多文档素材引用边界回归。
- `node aiyou/vendor/aiyouplus-canvas/test/verify-browser.mjs`：隔离 Chrome、本地 HTTP、真实原画布与真实 coordinator。12 项覆盖原项目 ZIP 实际下载/导入/保存重开、3D JSON 文件选择/载入，以及原节点创建/保存、原件 drop/预览、项目重开、立即关闭/重开、图片处理入库、两步流水线、3D JSON/GLB/重开、模板/暂停自动任务/JSON 导出，以及跨项目 Storage/IDB 隔离。
- `node aiyou/vendor/aiyouplus-canvas/test/verify-file-dialog.mjs`：3 项真实多文件选择/staging、命名保存/实际写入/浏览器下载、目录不支持明确错误。
- `node aiyou/vendor/aiyouplus-canvas/test/verify-submit-sync.mjs`：手动文件 drop 后立即 parent 素材插入与统一库 MIME drop 的 2 项真实版本同步/执行/保存回归。
- 浏览器验证依赖开发机 Playwright 和 Chrome；它拒绝模型生成，未读取凭证、未发供应商请求，也不启动正式 DSH app。最终 DSH 官方菜单和 Codex 对话验收由宿主工程另外完成。
- 稳定证据在任务输出目录 `融合设计/画布专项验证/`，不随生产静态包放置截图、临时 profile 或运行数据库。

## 未移植及未声称通过

旧 OSS/七牛目录、独立浏览器扩展桥、PLUS 自有生产 HTTP 网关、账户与云端均未启用。相应命令明确返回 Unsupported，原初始化有 catch 降级，不能将这些旧入口视为可用。独立工作台模型配置由 DSH 模型服务替代；素材库由 DSH 唯一 Gateway 替代。未复制的 ML 权重、旧本地模型环境、独立浏览器代理和平台专用桌面功能不因画布启动而算通过。

原始代码及第三方声明见 `notices/`。来源快照与新增移植文件 hash 见 `provenance.json`；保留声明不代表获得新的开源或商业许可。
