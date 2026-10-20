# 安装、更新与卸载

[返回首页](../README.md) · [排障](troubleshooting.md)

## 选择平台

| 平台 | v0.5.0 下载 | 额外环境 |
| --- | --- | --- |
| Windows 10 / 11 x64 | [Windows x64 安装包](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.5.0/AIYOUDSH-v0.5.0-windows-x64.zip) | .NET Framework 4.8；Node.js 24 优先，也可检测官方内嵌运行时 |
| macOS Apple Silicon arm64 | [macOS arm64 安装包](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.5.0/AIYOUDSH-v0.5.0-macos-arm64.zip) | 官方 arm64 应用；安装器可使用其随带运行时 |

Mac Intel、Windows ARM 和其他官方构建未列入支持。安装包只有增强运行库，不包含或替换官方应用。

两平台官方版本固定为 `0.2.1-rc.2`，构建固定为 `332895e0f7c9d4dbfb29729f5eb367fa263ff986`。还会校验应用归档与被适配模块：

| 官方 `app.asar` | SHA-256 |
| --- | --- |
| macOS arm64 | `b9ec4c2bbc20c9dbc3e39fa4c961434a943434ab0a803052b26753dd15f3b066` |
| Windows x64 | `47874618bf5b3011fcaac10cd4c85f69da333e70d4f99b921207c78d0999512a` |

以上是**官方应用归档**的哈希，增强 ZIP 的哈希另见 Release 中的 [SHA256SUMS](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.5.0/AIYOUDSH-v0.5.0-SHA256SUMS.txt)。不匹配时应保留校验并等待对应适配。

## Windows 安装

1. 安装并正常打开官方 DeepSeek Harness 一次，完成 desktop profile 初始化。
2. 完整解压增强 ZIP，保留 `AIYOUDSHInstaller.exe`、`installer/`、`runtime/` 和脚本的相对位置。
3. 双击 `AIYOUDSHInstaller.exe`，点击 **安装增强**。
4. 未自动找到官方应用时，点击 **选择应用目录**，选择同时包含 `DeepSeek Harness.exe` 与 `resources/app.asar` 的目录。
5. 完成后完全退出并重新打开官方应用。

安装器通过官方卸载信息和常用目录寻找应用。增强写入当前用户目录，模块使用目录 junction 接入；不要求管理员权限或开发者模式。不要将单独的 EXE 拷出安装包后运行。

运行环境优先选择 Node.js 24 或更新版本；没有可用 Node 时，检测受支持官方应用内嵌 Node `24.21.0` 的 `ELECTRON_RUN_AS_NODE` 模式。执行前会探测其可用性；两者均不可用时显示需要运行环境，不自动下载。日常“打开 AIYOUDSH”仍以正常桌面模式启动官方程序。

`安装.cmd` / `卸载.cmd` 是同一图形安装器的快捷操作入口；对应 PowerShell 脚本随包提供。Windows 图形安装器源码和编译要求见 [installer-win/README.md](../installer-win/README.md)。

## macOS 安装

1. 安装并打开一次受支持的官方应用。
2. 解压增强包，打开 `AIYOUDSH 增强安装器.app`，点击 **安装增强**。
3. 完成后退出并重新打开官方应用。

也提供可审查的 `安装.command` / `卸载.command`。安装器优先使用本机 Node，缺少独立 Node 时使用官方应用的 Node 模式。当前 `.app` 为本地 ad-hoc 签名，未附 Developer ID 公证；来源验证以系统提供的打开流程为准。

## 更新与数据位置

使用新版本安装器更新即可。它先核对安装回执、运行库与受管配置；完全相同的运行库重复安装会报告已安装。v0.4.0 到 v0.5.0 的 Mac 安装目录与 schema 1 回执继续兼容。

| 内容 | Windows | macOS |
| --- | --- | --- |
| 默认 DSH 根目录 | `%USERPROFILE%\.dsh` | `~/.dsh` |
| 环境变量覆盖 | `DSH_HOME` | `DSH_HOME` |
| desktop profile | `${DSH_HOME}/profiles/desktop` | 同左 |
| 增强运行库与回执 | `%LOCALAPPDATA%\AIYOUDSH` | `~/Library/Application Support/AIYOU Harness Enhancer`，保留旧目录名 |
| 功能设置、资产与看板 | `${DSH_HOME}/aiyou-enhancer/` | 同左 |
| 配置备份 | `${DSH_HOME}/backups/aiyou-enhancer/<事务编号>/` | 同左 |
| 模块接入 | profile 下 `node_modules/@local/` 的目录 junction | 同位置的符号链接 |

备份保留在本机当前用户目录，不收进发布包。macOS 备份目录权限为 `0700`、文件为 `0600`；Windows 访问控制沿用用户目录的系统权限。安装器结果不打印原配置正文、凭证或备份内容。

官方应用文件、登录态与会话数据库不被复制覆盖。更新清理的旧 Claude Code 连接只限本增强拥有的连接，不卸载用户独立 CLI 或改写历史消息。

## 卸载与冲突保护

在同一安装器中点击 **卸载增强**，完成后重新打开官方应用。私有备份保留以便核对。

- 配置未被后续修改：恢复安装前原始备份。
- 只在受管区外新增编辑：仅移除未变的受管区，保留新内容。
- 受管区、模块链接或运行库被其他内容改变：保护现场并报告冲突。

不要为绕过冲突删除配置、回执或备份。先查看状态，比较当前文件与备份，再处理合并，见[排障指南](troubleshooting.md)。官方应用更新后也应重新核对目标基线，而不是直接复用旧适配。

## 命令行检查

解压安装包后，在根目录执行：

```sh
node installer/installer.mjs dry-run --runtime runtime
node installer/installer.mjs install --runtime runtime
node installer/installer.mjs status
node installer/installer.mjs uninstall --dry-run
node installer/installer.mjs uninstall
```

命令需要可用的 Node.js 24；图形安装器会自动寻找运行环境。Windows 可用 `--app` 指定官方目录或 `DeepSeek Harness.exe`，Mac 指定官方 `.app`。源码工程使用 `addon/installer.mjs` 与 `dist/addon/runtime`。

`dry-run`、`status` 和 `uninstall --dry-run` 不写 profile。安装器不会主动退出或重启官方应用；`needsRestart` 提示仍需重新打开。自定义 DSH、profile 与增强目录后，应在状态和卸载时使用同一组参数，详见[共享安装器接口](../addon/README.md)。
