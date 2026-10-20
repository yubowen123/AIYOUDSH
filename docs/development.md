# 源码构建与双平台打包

[返回首页](../README.md) · [贡献方式](../CONTRIBUTING.md)

## 环境与目标

- Node.js **24 或更新版本**；根构建使用随仓库依赖，不需要先运行 `npm install`。
- 支持目标：`darwin-arm64`、`win32-x64`。源码构建和隔离测试不修改真实 Harness profile。
- macOS 安装器：macOS、Command Line Tools、Swift/AppKit、`codesign` 与 `ditto`。
- Windows 安装器：Windows 10/11 x64、PowerShell、.NET Framework 4.8；使用系统 `csc.exe` 编译 WinForms，无需额外 .NET SDK。

源码包括当前发布组件的可编辑 JavaScript 分区及新增模块。`reconstruction.json` 声明分区顺序、输出与上游哈希，构建按共享作用域组装；不是原始 TypeScript monorepo 的恢复。

## 默认构建与验证

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

默认构建按当前平台选择目标，输出 `dist/addon/runtime/`。平台原生夹具与服务测试应在对应系统运行，结果以实际运行的检查为准。

| 命令 | 作用 |
| --- | --- |
| `npm run build` | 构建目标平台的两个界面模块与 13 个功能模块，写入兼容清单 |
| `npm test` | 导航、MOKE、主题、原生 workspace 与共享安装事务测试 |
| `npm run verify` | 核对构建产物、模块身份与语法 |
| `node aiyou/verify.mjs` | 临时 DSH 根目录下验证功能模块和本地服务 |
| `node aiyou/verify-embedded.mjs` | 临时目录下验证内嵌业务服务与路由 |

功能检查会停止自己启动的服务并清理临时数据。单元测试、静态兼容核对和原生安装器测试各自证明不同层面，均不能代替官方宿主界面实测。

## 显式构建目标

```sh
node scripts/build-addon.mjs --platform darwin-arm64 --out dist/macos/runtime
node scripts/build-addon.mjs --platform win32-x64 --out dist/windows/runtime
```

交叉构建可生成运行库文件，不会把另一平台的安装器或官方应用运行在本机。`npm run verify` 默认核对 `dist/addon/runtime/`；需要按默认验证流程检查另一目标时，可将该目标构建到默认位置：

```sh
npm run build -- --platform win32-x64
npm run verify
```

Windows 兼容清单见 [platforms/win32-x64.json](../platforms/win32-x64.json)。两平台的官方 `app.asar` 哈希不同；Windows 原生 client 的 CSS class 差异通过[语义映射](../platforms/win32-x64-selectors.json)适配。映射覆盖 335 个 class、主题涉及其中 31 个引用，不能用 Mac 包改后缀代替。

## 本机安装检查

先构建与当前系统一致的目标，再检查：

```sh
node addon/installer.mjs dry-run --runtime dist/addon/runtime
node addon/installer.mjs status
```

确认目标官方构建后安装：

```sh
node addon/installer.mjs install --runtime dist/addon/runtime
```

安装会写选定 profile。Windows 使用当前用户目录和 junction，Mac 使用符号链接；两者共享备份、受管补丁、升级与冲突保护。Windows 的 `--app` 接受官方目录或 EXE；Mac 接受 `.app`。完整参数见[安装器说明](../addon/README.md)。

## 打包安装器

macOS arm64 主机：

```sh
npm run build -- --platform darwin-arm64
npm run package
```

该入口生成 Mac 安装包及源码归档，并验证本地 ad-hoc 签名。Windows x64 主机：

```sh
npm run build -- --platform win32-x64
npm run package:windows
```

Windows 等价入口为 `node scripts/package-windows.mjs`。它编译真正的 `AIYOUDSHInstaller.exe`，装入 `installer/`、`runtime/`、脚本、文档和许可后打包。`.NET Framework` 自带编译器路径、GUI 自测与自身截图入口见 [Windows 安装器说明](../installer-win/README.md)。

v0.5.0 Release 资源固定为：

- `AIYOUDSH-v0.5.0-windows-x64.zip`
- `AIYOUDSH-v0.5.0-macos-arm64.zip`
- `AIYOUDSH-v0.5.0-source.zip`
- `AIYOUDSH-v0.5.0-SHA256SUMS.txt`

Windows GUI 与载荷必须完整解压，不能只分发独立 EXE。打包器输出路径以结果为准；发布前还应核对 ZIP 哈希、解压源码独立构建与对应平台清单。完整官方应用、取证目录、profile、凭证、私人聊天与配置备份不进入仓库。

## 源码目录

```text
AIYOUDSH/
├── addon/                    # 双平台共享安装事务、备份、兼容检查与 YAML
├── installer-ui/             # macOS Swift/AppKit 安装器
├── installer-win/            # Windows C#/WinForms 安装器与脚本
├── platforms/                # 平台官方基线与 Windows 语义 CSS 映射
├── packages/
│   ├── dsh-client-ui-sidebar/ # 导航、品牌、MOKE、顶部工具与恢复分区
│   ├── dsh-client-ui-workspace/ # 原生会话列表、状态投影与恢复分区
│   └── dsh-client-ui-*/       # 主题适配所需原生 CSS 参考
├── aiyou/
│   ├── modules/              # 14 个功能源码模块，13 个默认安装
│   ├── lib/                  # 共享适配与服务桥接
│   └── vendor/               # 随包资产与看板服务
├── scripts/                  # 目标构建、核对与双平台打包
├── test/                     # 隔离测试和平台运行时夹具
└── docs/                     # 使用、开发、版本说明与截图
```

运行时包名和部分 `aiyoucodex-*` 路由保持兼容标识，不依赖另一套 AIYOUcodex 安装。

## 兼容与验证原则

基线固定为官方 `0.2.1-rc.2 / 332895e`。适配新构建需重读发布组件，核对 slot、投影、模块身份、原生 CSS 和接口，再更新兼容清单；不能只改版本字符串或绕过哈希。

Mac 实机界面、Windows CI 编译/自测、隔离 junction 事务与 Windows 宿主聊天验收应分别记录。CI 自测安装器的参数、进程环境和结果解析，或输出安装器自身截图，不代表已经在用户 Windows 桌面加载增强并验收聊天。当前证据范围见 [v0.5.0 说明](releases/v0.5.0.md#验证范围)。
