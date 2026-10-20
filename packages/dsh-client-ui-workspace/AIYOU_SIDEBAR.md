# AIYOU 原生对话侧栏

本包基于当前安装的 DeepSeek Harness `0.2.1-rc.2` 的 `lib/client.js` 与 `lib/index.js` 分区恢复。原始安装包的构建提交标记为 `332895e0f7c9d4dbfb29729f5eb367fa263ff986`。`src-recovered` 保留发布 JavaScript 的原有共享作用域，`src/aiyou-sidebar-*.js` 是新增的可编辑 JavaScript；没有将其宣称为原始 TypeScript 恢复。

`reconstruction.json` 的 `entries[].parts` 是拼接顺序。客户端在 Module Loader factory 内引入新增纯逻辑与组件，随后保留原生 WorkspaceBrowser、SessionNodeItem、目录选择、菜单、pin、归档及导航；Node half 原生注册 `aiyouSidebar` Session Projection。输出入口仍是 `lib/client.js` 与 `lib/index.js`，可由安装器另行赋予 `@local` 身份。

四视图的“置顶”读取原生 `pinnedSessionIds`；“项目”保留原生分组/树形、手动排序与目录管理；“最近”按原生 `updatedAt` 排序；“中断”只纳入最近一次持久 `turn/end` 为 `aborted`、`interrupted`、`error`、`max-tokens` 或 `blocked` 的非运行、非等待交互会话，并显示具体原因。正常完成、fork、空闲及没有结束原因的历史缓存不会被推定为中断。

文件夹筛选包含已登记的后代工作区，以路径分隔符界定目录边界。搜索保留原生标题/项目与后台内容搜索，并加入已有摘要、标签及文件夹路径；导航到结果保留检索词。视图、检索词、手动标签与三色标注保存在原生 `dsh.workspace.view.v5` 视图记录的附加字段中；它们不是模型确认的任务状态。所有筛选仅改变展示，完整会话记账顺序、pin 集合与 archive 集合继续由原生所有者维护。

摘要来自 `aiyouSidebar` Projection 折叠的最近用户输入/助手回复；历史缓存缺少新键时只使用已存在的 `turnOutline` 预览，没有对应数据时显示“暂无已加载摘要”。客户端不会为侧栏扫描会话日志、自动激活所有历史会话或调用模型。新增 Projection 在宿主正常物化/推进会话时随原生缓存发布；尚无结束原因的历史记录会在中断视图明确计数为未知。

`node --test packages/dsh-client-ui-workspace/test/aiyou-sidebar.test.mjs` 覆盖四视图口径、目录边界、原生 pin/archive、检索、摘要界限、标注、原生组件接线与真实 Projection Registry 的注册/释放。组件接线测试使用受控 React 桩，不代替官方客户端内的可见截图与交互验收。
