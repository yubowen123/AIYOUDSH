# AIYOUDSH 功能源码域

此目录交付 14 个可编辑功能模块及完整本地资产、项目管理业务服务。官方 Harness 应用仍作为宿主；安装器只装配原生 Cordis 扩展，不改安装的官方 App、不替换已有会话日志，也不依赖旧迁移套件或 AIYOUcodex 的安装目录。

最终外挂启用其中 13 个模块，加上 2 个原生界面模块，共 15 个安装模块。`session-state` 源码留作参考，默认不安装；三色标注与标签统一由原生 workspace 管理。

`shortcuts` 的平铺跳转和 `sidebar-cards` 的外观注入由增强包的原生导航、侧栏结构覆盖，故不在本域重复加载。

## 构建与装配

```js
import { buildAddonFeatures } from './aiyou/build.mjs';
const result = await buildAddonFeatures('/absolute/output/runtime');
```

输出包含 `modules/aiyou-enhancer-<module>`、`runtime.mjs`、`services.mjs`、`service-worker.mjs`、完整 `lib/` 与 `vendor/`、`addon-features.json`。安装器按 `addon-features.json` 的 `profileLink` 为模块建立符号链接，按 `registry.json` / `builtin-cordis.patch.yml` 装配扩展。此构建函数不会访问或修改真实 profile。

包名使用 `@local/aiyou-enhancer-<module>`，Cordis id 为 `aiyou-enhancer-<module>`。客户端 ModuleLoader id 与包名完全相同。右栏导航 kind 保持 `aiyoucodex-<module>`，详见 `manifest.json`；`core` 与 `session-state` 没有独立 tab。

宿主源码恢复工程若需要一体化构建，可使用 `buildAiyou(appDir)`；最终外挂交付使用上面的 `buildAddonFeatures`。

MOKE AIGC 入口位于原生左侧图标栏，使用官方原生内置浏览器标签页，导航与同对话标签页复用逻辑位于 `packages/dsh-client-ui-sidebar/src/aiyou-moke.js`。品牌、对话顶栏工具分别见同目录 `aiyou-brand.js`、`aiyou-header.js`。Claude Code 功能模块已移除；不卸载用户独立安装的 CLI 或更改历史消息。

## 状态与通信

- 扩展自己的设置、主题、确认后的上下文、监控状态、资产库与看板数据库位于 `${DSH_HOME}/aiyou-enhancer`。默认不会读取旧 AIYOUcodex 配置、资产库、凭证或历史。
- 会话用量、任务上下文和对话副本读取宿主本身的会话投影/日志；这些模块不重写原始会话。导出是新的可读副本。
- 客户端仅请求相对 `/aiyoucodex-dsh/*` 路径。Desktop 使用原生 `dsh-app://app` forwarder 转发到当前 Host，无固定端口。
- `guardContext` 在每个 HTTP handler 前调用安装版真实 `connection.requestRejection(req)`，沿用 Host/Origin 与签名 cookie 认证。Desktop 会剥离 Origin 并附上当前 Host 的 cookie，因而不另造绕过规则，也不开放 `Access-Control-Allow-Origin: *`。
- 完整资产/看板服务只在用户打开相应工作区时启动，由本扩展持有的子进程绑定随机 loopback 端口；仅转发经过认证的 Host 请求。两个内部服务均需临时随机 token，token 只存在于 Host/子进程内存环境，不写入配置、不发给客户端。卸载模块会停止它自己启动的服务。
- 完整 UI 的 HTML、JS、CSS、API、事件流和媒体均挂在扩展前缀下面；不将内部端口暴露给前端，也不从生产客户端运行 DOM 自检或自动修改真实列表。

## 功能位置

| 模块 | 源码与行为 |
| --- | --- |
| 资产库 | `modules/asset-console` + `vendor/codex-workspace-enhancer/asset-browser`：完整资产项目、分类、分页、检索、预览、提示词、文本编辑、角色关联、元数据及文件操作服务；完整前端源码随包附带。新 profile 从扩展自己的空资产目录开始。 |
| 项目管理 | `modules/taskboard` + `vendor/codex-taskboard/{server,shared,web,dist}`：完整 SQLite 服务、六泳道看板、任务/项目、评论、工作流与前端源码。 |
| Skills | `modules/skills`：有界元数据检索、自动分类、自定义分组、常用收藏；默认用户根为本 DSH profile。 |
| 主题配置 | `modules/theme`：独立配置页、内置色板、用户主题和对比度校验；背景模式、动态开关、位置/强度、15 项分层透明度和 13 项颜色；原生 token 与限定样式覆盖主体、气泡、输入区、顶栏、右栏和内嵌业务页。机甲原视频静音循环，同源鉴权及 Range；实时预览、取消、保存、系统默认、每主题独立持久化与并发冲突保护。 |
| 用量与上下文（对话顶栏右侧） | `modules/usage`：仅呈现宿主实际记录的用量、上下文与耗时。缺失数值保持未知。 |
| 任务上下文 | `modules/session-context`：投影事实与提取草稿分开，可确认保存版本化草稿。 |
| 输出偏好 | `modules/efficiency`：全局、项目、会话继承，动态原生 system-prompt section。 |
| 输出目录（对话顶栏右侧） | `modules/conversation-folders`：原生会话身份、目录命名、所有权标记、对话输出规则与定位。 |
| 对话副本 | `modules/session-transcript`：指定当前会话的用户/助手可读文本导出，不包含内部 reasoning/tool-call。 |
| Agent 工作区 | `modules/agent-workspace`：默认不扫描；用户点击检测后收集有界安装/内容元数据，分别展示程序证据与内容证据。不执行其他 Agent，不自动迁移内容。 |
| 会话标记 | 默认由 `packages/dsh-client-ui-workspace` 的原生侧栏实现；`modules/session-state` 为未启用的参考实现。 |
| 发布追踪 | `modules/reset-monitor`：本地分类与上下文压力；默认关闭网络轮询，用户明确开启后才运行配置的 feed。 |
| 模型竞技场 | `modules/model-arena`：显式配置 `AIYOU_ARENA_MCP_URL` 后使用 MCP 模型目录与提交准备/确认合同；缺配置明确报错。不从其他 profile 或凭证文件猜测 endpoint。 |
| 共享基础设施 | `modules/core`：模块状态 API；生产客户端不自动提交渲染或真实数据自检。 |

## 仍需适配的部分

- 资产工作台内的模型调用、3D、节奏处理，以及任务看板自己的 AI Chat 不能绕过宿主的模型/执行权限；相应业务接口在代理处返回 503。MCP 竞技场是独立的显式配置通道。未在本任务中提交任何生成。
- 主题包含 5 套非个人原主题静态插画及 2 套中性回退；机甲另有原主题真实 4 秒视频循环。小新相册与海绵宝宝用户原图未复制。原版七状态事件、声音、轮播和自定义媒体上传页面未移植；详见 `modules/theme/BACKGROUNDS.md`。
- Laya 语义检索需要单独的本地模型/运行时；未配置时由完整资产服务报告回退/不可用，不伪造语义检索结果。
- 本次已在官方 `0.2.1-rc.2 / 332895e` 实际安装并重启验证：四类对话视图、搜索、右侧工作台、Skills、资产库和项目看板可见。未逐项执行所有资产编辑、任务流转和外部模型能力；不据此声称与 AIYOUcodex 全功能等价。

## 验证

```sh
node aiyou/verify.mjs
node aiyou/verify-embedded.mjs
```

两项验证均使用新建的临时 `DSH_HOME`，结束后停止子进程并删除临时数据。结果记录在 `verification.json`。完整资产/看板源码保留各自许可与第三方声明；业务源码里的旧产品命名只是兼容数据字段，不是旧应用运行依赖。
