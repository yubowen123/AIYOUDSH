# DSH 嵌入画布

从冻结的 AIYOUPLUS 1.3.1 恢复工程选择移植。原工程及交付包未修改。本目录不是独立 Electron 应用，不包含供应商凭证、Electron runtime、node_modules 或模型权重。

## 入口与边界

- 宿主静态根是 `public/`。画布入口 `index.html`，创作工具入口 `creative-tools.html`，完整显示原 22 个工具；旧 `tools.html?module=media|pipeline|world|production` 仅保留内部兼容入口，不作为 DSH 创作工具菜单。
- 每个入口必须传 `projectId`，并传入宿主生成的 `panelId` 与可空的 `sessionId`。Storage 和 IndexedDB 在当前 iframe 内按 projectId 分区，父 DSH 的存储对象保持原样。
- `scripts/build.mjs` 按顺序合并 41 个原始 JS 分片；分片共享词法作用域，不能分别作为模块加载。构建仅在内存中对精确锚点变换，`src/js` 保持冻结来源。
- 原 `$Oi → fdi → GOi` 画布保留；不挂载原 `TJt` 独立主页。创作工具在原 `Olo` 模块中挂载，不包含原工作台素材库或独立模型设置表单。画布更多工具固定保留剪辑时间线、3D导演台、全局视角、预览与拼图、角色库、导出项目、项目管理七项；项目管理回到 DSH 项目列表，角色库使用 DSH 原件与持久引用。
- 所有模型、共享原件、项目文件、命令与事件经同源 `/aiyoucodex-dsh/canvas/`。文字默认 `host/dsh-current`，原文字解析入口也委托宿主模型；媒体模型来自宿主启用目录。嵌入 renderer 禁止独立访问远端供应商。

## 创作工具恢复与改写边界

原 12 个图像创作入口和 10 个图形纹理入口完整展示。十个图形纹理、图片平铺、黑白图抠图保留原本地算法；改图保留原多图层编辑器，执行回调改接宿主媒体服务；剧本创作保留原项目与分集编辑持久化，文字模型使用当前 DSH 模型。

质感增强、图像放大、商品合图、光照重置、动作迁移、图层拆分、智能抠补、局部修改的原实现依赖未随包提供的 GPU 模型环境或固定供应商协议，已改写成明确的可配置媒体工作区。没有匹配模型、参考类型或蒙版能力时阻止提交；不会把本地滤镜当成 AI 生成成功。所有输入先注册到 DSH 素材 Gateway，结果要求真实原件回执；图像放大另校验实际输出尺寸。分层输出可保存分层 PSD，透明度与分层质量仍由所配置模型实际结果决定。

剪辑时间线保留原片段状态、裁剪、顺序与导出器，选材直接嵌入现有 DSH 素材库的 video/audio 选择模式，真实回读 canonical 原件并探测时长；旧素材别名经 Gateway 解析后使用 canonical ID，不另造输入节点。3D导演台保留原完整导演工作区与 Three 渲染器。全局视角与预览拼图保留原节点及本地合成算法。缩略预览只在项目缓存生成，不能覆盖 DSH 原件。浏览器 CORS 兼容仅限同源 blob、媒体 data 和受控 Gateway file URL 的实际字节，不提供远程代理下载。

## 素材库入口与原件保存

原左侧放大镜（旧 pose-library）及底部素材库按钮统一打开 DSH 现有素材库；旧 pose/material 面板的 central toggle 和挂载均被精确拦截，持久化旧 open=true 也不能恢复旧库界面。父层消息为 `{type:'dsh-canvas-open-asset-library', projectId, sessionId, panelId, focusAssetId?}`，由宿主按同源、来源窗口及当前项目会话校验后打开。顶栏重复入口由 native 宿主移除。

原节点右键、选中素材工具栏及历史素材的“保存到素材库”仍保留实际保存语义：已有 canonical 原件直接定位；缺失时先取得原 AssetStore Blob 或 originalUrl 对应的真实 Blob，再经分块上传和 Gateway 入库，成功才定位 DSH 素材。缩略图不能作为原件降级写入，失败显示原入口错误。内容相同由 Gateway 去重，不复制已有原件。

DSH 的图片、视频、音频使用原 File drop 创建节点；UTF-8 `.txt`、`.md`、`.markdown` 使用原 executor 创建 text-node，并在 settings 中持久化文字和 canonical `_assetId`，随后走同一原项目保存回执与引用保护。文本限 4 MiB；其他文档格式在入图前明确拒绝并提示转换。原“参考素材库”在节点内部用于已有历史或节点绑定，不是独立文件库，保留其引用选择语义；旧库拖拽协议仅保留兼容读取，不再有旧面板发起入口。

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

- `node --test aiyou/vendor/aiyouplus-canvas/test/runtime-host.test.mjs`：16 项真实文件、SQLite、Gateway、staging、分块上传/导出、生产 RPC、批量拷贝与多文档素材引用边界回归。
- `node aiyou/vendor/aiyouplus-canvas/test/verify-browser.mjs`：隔离 Chrome、本地 HTTP、真实原画布与真实 coordinator。12 项覆盖原项目 ZIP 实际下载/导入/保存重开、3D JSON 文件选择/载入，以及原节点创建/保存、原件 drop/预览、项目重开、立即关闭/重开、图片处理入库、两步流水线、3D JSON/GLB/重开、模板/暂停自动任务/JSON 导出，以及跨项目 Storage/IDB 隔离。
- `node aiyou/vendor/aiyouplus-canvas/test/verify-file-dialog.mjs`：3 项真实多文件选择/staging、命名保存/实际写入/浏览器下载、目录不支持明确错误。
- `node aiyou/vendor/aiyouplus-canvas/test/verify-submit-sync.mjs`：手动文件 drop 后立即 parent 素材插入与统一库 MIME drop 的 2 项真实版本同步/执行/保存回归。
- 浏览器验证依赖开发机 Playwright 和 Chrome；它拒绝模型生成，未读取凭证、未发供应商请求，也不启动正式 DSH app。最终 DSH 官方菜单和 Codex 对话验收由宿主工程另外完成。
- 稳定证据在任务输出目录 `融合设计/画布专项验证/`，不随生产静态包放置截图、临时 profile 或运行数据库。

- `node aiyou/vendor/aiyouplus-canvas/test/verify-creative-tools.mjs`：22 卡片与 8 个模型工作区未配置门禁共 31 项。
- `node aiyou/vendor/aiyouplus-canvas/test/verify-tool-functions.mjs`：22 工具功能及分层 PSD 共 23 项；模型调用使用隔离受控本地夹具，实际生成文件、尺寸、alpha、PSD 头与脚本保存重开独立核对。未调用真实供应商。
- `node aiyou/vendor/aiyouplus-canvas/test/verify-more-tools.mjs`：22 项包含三类本地节点创建、两类图片默认槽连接、受限命名布局/非法操作门禁以及七项菜单、时间线真实导入/裁剪/排序/6 秒音视频导出、3D角色机位与真实取景，以及全局视角/预览实际媒体操作。native 项目管理与角色库宿主流由父工程专项验证。

- `node aiyou/vendor/aiyouplus-canvas/test/verify-library-entry.mjs`：15 项真实原 renderer 入口、旧库禁挂载、canonical 保存/真实 Blob 入库去重、缩略图拒绝、UTF-8 txt/md 原图保存及引用保护、格式/大小门禁、真实 DSH 时间线视频/音频选择（含旧 opaque alias）、严格消息来源/nonce 与取消。使用实际 DSH Gateway、实际项目保存文件和现有素材库前端；素材索引 HTTP 为隔离夹具，官方 native 父子窗口及正式来源由宿主另行验收。证据在任务输出目录 `画布素材库替换/原画布入口验证/最终交付验收/`。

## 未移植及未声称通过

旧 OSS/七牛目录、独立浏览器扩展桥、PLUS 自有生产 HTTP 网关、账户与云端均未启用。旧初始化在嵌入模式下禁用，相应服务不能视为可用。独立工作台模型配置由 DSH 模型服务替代；素材库由 DSH 唯一 Gateway 替代。未复制的 ML 权重、旧本地模型环境、独立浏览器代理和平台专用桌面功能不因画布启动而算通过。

原始代码及第三方声明见 `notices/`。来源快照与新增移植文件 hash 见 `provenance.json`；保留声明不代表获得新的开源或商业许可。

本轮对话桥仅对 video-timeline/director-3d/global-perspective 增加创建和基础命名布局更新，非空settings与供应商生成执行明确拒绝；input-image到global-perspective/preview只允许默认槽，全局视角单入线。动作有效例见public/actions.json，实际能力表可从原L1t回读。现有production facade是模板/自动任务，不包含时间线/导演台深度操作方法，不把UI验收冒充这些深度对话API已提供。
