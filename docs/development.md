# 源码构建与打包

[返回首页](../README.md) · [贡献方式](../CONTRIBUTING.md)

## 环境

- Node.js **24 或更新版本**。根构建使用仓库内已随带的依赖，无需联网下载。
- 运行库构建及隔离测试不需要修改真实 Harness profile。
- 图形安装器打包需要 **macOS、Command Line Tools、Swift/AppKit、`codesign` 和 `ditto`**。当前正式发布包为 Apple Silicon（arm64）；构建器按本机架构编译，其他架构尚未据此宣称通过宿主验证。

本仓库保留的是当前发布组件的可编辑 JavaScript 分区及新增模块。`reconstruction.json` 明确分区顺序、输出和上游哈希，构建会按原共享作用域组装；它不是原始 TypeScript monorepo 的替代品。

## 克隆与验证

```sh
git clone https://github.com/yubowen123/AIYOUDSH.git
cd AIYOUDSH
node --version
npm run build
npm test
npm run verify
node aiyou/verify.mjs
node aiyou/verify-embedded.mjs
```

| 命令 | 作用 |
| --- | --- |
| `npm run build` | 生成 `dist/addon/runtime/`；组装两个界面模块与 13 个功能模块，写入精确兼容清单 |
| `npm test` | 执行导航、MOKE、主题、原生 workspace 和安装器测试 |
| `npm run verify` | 验证运行库装配、模块身份、兼容信息与构建产物 |
| `node aiyou/verify.mjs` | 使用临时 DSH 根目录验证功能模块和服务 |
| `node aiyou/verify-embedded.mjs` | 使用临时目录验证内嵌资产/看板服务与路由 |

功能验证结束会停止自己启动的服务并清理临时目录。测试通过后，针对改动执行必要的官方宿主界面检查；单元测试不能代替页面、安装和卸载行为验证。

## 在本机装配

先构建，再执行只读检查：

```sh
node addon/installer.mjs dry-run --runtime dist/addon/runtime
node addon/installer.mjs status
```

确认使用支持的官方构建后，执行安装：

```sh
node addon/installer.mjs install --runtime dist/addon/runtime
```

上述安装命令会修改选定 profile。所有自定义路径须显式传入，详见[安装器接口](../addon/README.md)。重新打开官方应用后核对：品牌与左栏、当前对话顶部工具、主题预览/取消/保存、MOKE 同对话标签复用，以及官方聊天继续可用。

## 打包

在 macOS 上完成构建后运行：

```sh
npm run package
```

主打包器组装 `.app`、中文命令行入口、运行库与源码归档，使用本地 ad-hoc 签名并核对载荷。发布到 GitHub 时使用以下资源名：

- `AIYOUDSH-v0.4.0-macos-arm64.zip`：图形安装器、运行库、安装/卸载入口。
- `AIYOUDSH-v0.4.0-source.zip`：可构建源码与随包依赖。

脚本输出位置和实际生成文件以打包器结果为准；Release 使用稳定 ASCII 名称。发布时应核对归档哈希、解压源码的独立构建、安装器架构与实际宿主效果。不要把私有配置、profile、备份、凭证、聊天记录、完整官方应用或安装包取证目录打入仓库。

## 源码目录

```text
AIYOUDSH/
├── addon/                    # 兼容检查、安装/卸载事务、备份与 YAML 库
├── installer-ui/             # Swift/AppKit 中文图形安装器
├── packages/
│   ├── dsh-client-ui-sidebar/ # 左侧导航、品牌、MOKE、顶部工具与恢复分区
│   ├── dsh-client-ui-workspace/ # 原生会话列表、状态投影与恢复分区
│   └── dsh-client-ui-*/       # 主题测试所需的六个原生 CSS 参考分区
├── aiyou/
│   ├── modules/              # 14 个功能源码模块，13 个默认安装
│   ├── lib/                  # 共享适配和服务桥接
│   └── vendor/               # 随包资产与任务看板服务
├── scripts/                  # 运行库构建、核对与打包
├── test/                     # 隔离测试与运行时夹具
└── docs/                     # 使用、范围、开发与截图
```

运行时包名使用 `@local/aiyou-*`，部分路由和 tab kind 保留 `aiyoucodex-*` 以兼容数据与接口。这些标识不代表运行时依赖另一套 AIYOUcodex 安装目录。

## 兼容适配原则

官方基线固定在 `0.2.1-rc.2 / 332895e`。新版本适配应重新读取目标发布组件，核对 slot、投影、模块身份、CSS 和扩展合同，再更新兼容清单与验证。不要只改版本字符串、跳过归档校验或把无证据的新构建标记为兼容。

开发恢复分区时保持 manifest 顺序和共享作用域。导航使用原生会话身份、右栏 slot 与 Browser 接口；主题媒体使用宿主认证路由。本地服务只在打开相应工作区后按需启动，沿用宿主的连接认证和权限。
