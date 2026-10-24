> 本文记录首次核查时发现的宿主入口缺口。后续已由本插件的 `aiyou/lib/canvas/codex-connection.mjs` 与媒体模型设置卡补齐；复用原生授权流程，14项交互回归通过。真实账户登录和 Codex 模型调用尚未执行，具体见本任务交付目录的 Codex 连接实施验收报告。

# DSH 原生模型与 Codex 连接核查

本轮为只读核查：未读取用户 profile、凭证文档或凭证记录，未登录、未执行模型、未启动应用。核查对象为本机官方 DeepSeek Harness 0.2.1-rc.2 的应用资源与对应恢复源码；插件应作为 AIYOUDSH 的功能，文字默认沿当前 DSH 会话选择，不能另设一个文字模型 Key 冒充宿主连接。

## 结论

官方安装包确实带有 `openai-codex` 模型适配器和 OAuth 实现，但默认 profile 没有启用该路由。原生“模型”设置能够添加该供应商并动态注册路由；当前官方基线未发现可达的通用 OAuth 登录界面或 Remote，因此只提供“打开模型设置”还不能使新用户完成首次 Codex 连接。插件需要一个调用宿主授权服务的连接界面，凭证仍由宿主原生 flow 写入、刷新和使用。

本轮确认的是默认组合、安装包内的公共协议与静态调用链。没有检查现有账户是否授权，也没有证明账号权益、网络可达或实际 Codex 调用成功。运行中 fresh QA profile 的公开服务快照由主任务另行采集，不应从源码目录推定为已启用。

## 官方默认状态与可达入口

| 层 | 当前证据 | 可确认的状态 |
| --- | --- | --- |
| 默认文字模型 | `packages/dsh-base/cordis.patch.yml:90` | 默认为 `deepseek-official/deepseek-flash`，用户保存的会话和默认选择可覆盖它。 |
| 多供应商适配器 | 同文件 `:128–136`；`dsh-llm-pi-ai/lib/index.js:1083` | 挂载 `llm-pi-ai`，但 `providers` 默认为 `{}`，没有 Codex 路由。 |
| 桌面组合 | `apps/desktop/src-recovered/sections/lib-main.js/010-lib-types-project-manager.js.js:4,88`；`009-..-..-packages-boot-app-boot-lib-index.js.js:21`；`packages/dsh-desktop-host/lib/index.js:224–239` | fresh desktop 使用 base + web；web 补丁未额外启用 Codex。 |
| 模型设置目录 | `dsh-llm-pi-ai/lib/index.js:2841–2856` | 会声明已安装 catalog 的可配置供应商；目录可见并不代表注册了可执行路由。 |
| 原生设置入口 | `dsh-client-ui-settings-general/lib/client.js:1187–1228`；`dsh-client-ui-settings-models/lib/client.js:4485–4501` | macOS `Cmd+,` 打开设置，再进入 section `models`，在添加供应商的 catalog 中选择 `openai-codex`。 |
| 保存并启用 | `dsh-client-ui-settings-models/lib/client.js:1936–1944,3179–3192` | 未修改的原生 catalog 配置明确写入 `providers.openai-codex = {}`；使用 revision 检测并发编辑。 |
| 动态注册 | `dsh-llm-pi-ai/lib/index.js:2876–2883,2943–2960` | 保存后读取当前 profiles 的 keys，收到 `loader/volatile-update` 后注册/更新 adapter routes，无须安装时强制启用。 |
| 原生模型选择 | `dsh-api-session-controller/lib/index.js:563–569,793–812` | selector 从实际注册 providers 构建目录；用户选择后安装到会话并保存为默认。模型可列出仍不证明 OAuth 成功。 |

## Codex 安装包事实

直接读取 `/Applications/DeepSeek Harness.app/Contents/Resources/app.asar` 内的公开代码，未执行该代码：

| ASAR 内模块（均在 `dsh/node_modules/@earendil-works/pi-ai/` 下） | 事实 |
| --- | --- |
| `package.json` | 安装版本为 `1.1.0`。 |
| `dist/providers/all.js:28,109` | 导入并调用 `openaiCodexProvider()`，不是只有未引用的源码。 |
| `dist/providers/openai-codex.js:6–19` | provider `openai-codex`，显示名为 `OpenAI Codex (legacy)`；原生 endpoint 为 `https://chatgpt.com/backend-api`；只声明 OAuth，没有 API Key 登录。 |
| `dist/auth/oauth/openai-codex.js:321–339` | 外层 OAuth 登录首先询问 `select`：`browser` 或 `device_code`。 |
| 同文件 `:275–313` | browser 方式使用 localhost:1455 回调；端口不可用时可手动粘贴授权码/redirect URL；回调与手动输入竞速，结束时关闭回调服务器。 |
| 同文件 `:263–273` | device code 方式显示验证码并轮询授权。该分支是否被账户/服务支持需要实际登录才能确认。 |

`openai` 与 `openai-codex` 是不同路由。宿主的 `UNSERVED_OAUTH = new Set(['openai'])` 禁用了前者的 ChatGPT OAuth；不能据此误判后者不可用，也不能将前者当作 Codex OAuth 的替代配置（`dsh-llm-pi-ai/lib/index.js:2448–2478`）。

## 当前首次连接缺口

`llm-pi-ai` 会在挂载时无条件注册可用登录 flow（`:2555–2595,2914–2916`），记录地址为 `llm-pi-ai/openai-codex`（`:2040–2047`）。这与路由是否已配置独立。

但已检查的官方组合缺少通用授权 surface：

- `dsh-authorization/lib/index.js:75–160` 是进程内 Service，没有 `Remote` 装饰或浏览器 controller。
- `dsh-api-settings-controller/lib/index.js:90–101` 只为 credential references 暴露 `describe/set/unset`，不暴露 OAuth flow 的 begin/prompt/cancel。
- 模型页 `createModelsOperations` 仅有 credential set/unset、settings mutate 和 discoverModels（`dsh-client-ui-settings-models/lib/client.js:3169–3204`）。对 env 为空且 OAuth 存在的 provider 会隐藏 Key 输入（`:2030–2045`），该分支没有提供登录按钮。
- `settings.models.provider-card` 是可由插件补充的 keyed slot，但本轮全包搜索未发现官方模块为 `llm-pi-ai/openai-codex` 注册实际登录卡。`settings.models.sign-in` 的现有实现是专用 DeepSeek Account，并非通用授权界面。
- 本轮搜索全部恢复包的实际 `lib/*.js` 调用点，只有 DeepSeek Account 的专用 controller 调用 `ctx.authorization.begin`（`dsh-deepseek-account-platform/lib/index.js:854`），未发现 Codex 的 UI/RPC 调用点。

这不意味着宿主 OAuth 协议不存在，而是新用户尚缺一个可发起并完成该交互的入口。没有读取用户 profile，不能排除某位用户自行安装了其它授权 surface。

## 插件内最小接入方案

1. 保留画布文字请求沿 DSH 当前会话的 model selection。媒体服务设置继续只管理图、视频、音频和音乐，不能向媒体配置复制宿主 OAuth 凭证。
2. 插件连接卡首先读取实际 `ctx.llm.listProviders()`、`ctx.llm.listConfigurableProviders()` 与 `ctx.authorization.describe('llm-pi-ai/openai-codex')` 的公开元数据。目录支持、路由已启用、宿主 flow 可用、授权已提交和实际调用已验证分别展示。
3. 启用路由优先引导用户通过原生 Models 保存 `{}`。若做插件“启用 Codex”按钮，只在用户点击时对 directory 声明的 namespace/path 使用原生 settings mutation 和 expectedRevision；只补缺失的单一 profile，不覆盖整个 providers，不改当前模型，不写 `api/baseURL/apiKeyEnv/headers`。
4. 插件新增宿主侧连接桥，调用已注册 flow：`ctx.authorization.begin({ key: 'llm-pi-ai/openai-codex', method: 'oauth', interaction, signal })`。不重复 registerFlow，不重写 OAuth，不读/复制/迁移 `credential.payload`。`method` 只能取宿主 flow 实际声明的方法；`device_code` 是 OAuth 内部 select 答案，不能当作外层 method。
5. `interaction.notify(notice)` 向本次发起页面显示 message/url/code；`interaction.prompt(prompt)` 返回 `Promise<string>`，支持 `text/secret/select`，处理 `prompt.signal` 撤回。`AbortSignal` 不序列化进 JSON。回答、授权码和 redirect URL 仅保存在内存，不进入 canvas history、审计日志或保存 receipt。
6. 取消、页面关闭和插件卸载时撤回该尝试与 prompt waiter，调用宿主 cancel/abort；拒绝 prompt 应使用官方 `AuthorizationDeclinedError`。宿主正在提交时依其原生生命周期结算，不能伪称远端吊销。授权 outcome 为 `authorized` 才表示本次宿主记录已提交；这仍不等于已真实调用模型。
7. 成功后刷新实际 provider/model 目录，让用户在原生 selector 选择 Codex。原生设置壳的 `actions.openSection('models')` 位于 `settings-general/client.js:36–39`；应由可访问 root-scoped `sidebar.settings` store 的插件 client 绑定入口，不能在 iframe 中假造不存在的全局 API。

宿主授权合同：`AuthorizationInteraction.prompt(prompt): Promise<string>`；prompt 的信号位于 `prompt.signal`；begin 的顶层另有 `signal`。可复用 `text/secret/select`、notice 和取消生命周期，不应硬编码某一种 OAuth 交互。

## 验证边界与验收矩阵

| 验证 | 本轮状态 | 后续通过标准 |
| --- | --- | --- |
| 默认 profile 没有启用 Codex | 已证实静态组合 | owned fresh QA 的公开 provider 列表复核，不读取 Key。 |
| 安装包确有可注册 Codex provider/flow | 已证实安装包代码 | 实际 configurable directory 与 authorization.describe 返回对应公开行。 |
| 原生保存 `{}` 触发 live route | 已确认实际实现调用链 | owned QA 原生页面添加后 `listProviders` 出现对应路由，重启仍存在；不得执行模型。 |
| 插件连接 UI 的完整交互 | 当前缺口 | 受控 fake flow 覆盖 select、notice、text/secret、撤回、关闭、并发拒绝、错误与成功，确认答案不持久。 |
| OAuth 真实连接 | 未执行 | 用户点击官方宿主流程完成登录，宿主确认本次 committed；只回读公开元数据。 |
| Codex 真实文字调用 | 未执行 | 当前会话实际选择 Codex，真实请求完成并有宿主用量/结束状态；失败不自动切换模型。 |
| 凭证隔离 | 本轮未读取任何凭证 | fixture 中宿主授权 store 唯一写入方；媒体配置、历史、审计、响应不包含 token/code。 |

## 来源完整性

以下恢复源码逐字节等于本机官方 ASAR 内的对应文件，均为本轮只读校验：

| 模块 | SHA-256 |
| --- | --- |
| `dsh-base/cordis.patch.yml` | `a2cc57868a4d016609801e28781262515483dde29b41c2742d9a3b27a6f52f77` |
| `dsh-web-app/cordis.patch.yml` | `3e1f923309612ed8551141127409d662e78758e2d0d125218a3f70514417e472` |
| `dsh-llm-pi-ai/lib/index.js` | `99b5c20830a52f69641df8a18a39206079b0c725201958cce2c4a934f1d4f7cd` |
| `dsh-client-ui-settings-models/lib/client.js` | `263f8afd006dd9ce93014b37d656d32255f89ac28f84e01d6c2f3930493e8a74` |
| `dsh-authorization/lib/index.js` | `cfe0784f14f5cc55e0e1c18fc82290967e41e48afb964dc4f6384f84e4bab1ef` |
| `dsh-api-settings-controller/lib/index.js` | `9c92e35d80b2b59d08e38cafe8ff9896d96f6e82cc3be4b0e7ead21432e94e1a` |

ASAR 内 pi-ai 公共模块：

| 模块 | SHA-256 |
| --- | --- |
| `package.json` | `1bde433d6f02badc80b44669b3e8fd269b3c2d3e2e61af2fef8f5b1c1be38673` |
| `dist/providers/all.js` | `b152eb706e7968debded248f538fda008869e93fea2042ba089fe64793c40340` |
| `dist/providers/openai-codex.js` | `44087142be22adfd09cf1a87edbbdb74ce155b5fd34e70fa4666f3a9f8a9a680` |
| `dist/auth/oauth/openai-codex.js` | `0b94a219ddb5982f0ee543ef03138ed0254ce6ee0a57c9d89d39c242e2eaf6f6` |

源码根目录：`/Users/yubowen/Documents/ChatGPT/管理优化/将 AIYOUcodex 结构优化移植到 deepseekharness/deepseekharness-reconstructed`。
