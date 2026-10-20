# 安装、更新与卸载

[返回首页](../README.md) · [排障](troubleshooting.md)

## 安装前

当前 Release 是 macOS Apple Silicon（arm64）增强包。它需要已安装、已初始化的官方 DeepSeek Harness；安装器不会下载或替换官方应用。

支持的官方版本为 `0.2.1-rc.2`，构建 `332895e0f7c9d4dbfb29729f5eb367fa263ff986`。安装时还会校验官方 `app.asar` 与两个被适配界面模块。仅版本号相同也可能不匹配；遇到校验拒绝，应等待针对该构建的适配，保留原有校验。

## 图形安装

1. 下载并解压 [AIYOUDSH-v0.4.0-macos-arm64.zip](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.4.0/AIYOUDSH-v0.4.0-macos-arm64.zip)。
2. 打开官方应用一次，让 desktop profile 完成初始化。
3. 打开 `AIYOUDSH 增强安装器.app`，点击 **安装增强**，等待结果。
4. 完成后退出并重新打开官方应用；界面品牌应显示 AIYOUDSH。

安装器是本地 ad-hoc 签名包，未附 Apple Developer ID 公证。macOS 的来源校验提示以系统显示为准；使用系统提供的打开流程即可，不需要关闭系统整体安全设置。

安装包同时提供 `安装.command` 与 `卸载.command`。图形界面优先使用本机 Node；缺少独立 Node 时，使用官方应用随带的运行时执行安装逻辑。源码构建仍需 Node.js 24。

## 更新

运行新版本安装器即可。安装器验证当前安装回执、运行库和受管配置后，再装配新版本。完全相同的运行库重复安装会报告已安装。

v0.4.0 更新会清理本增强包拥有的旧 Claude Code 模块连接。遗留的同类右侧标签页由新界面清理；用户独立安装的 Claude CLI、其他应用插件和历史消息不会被卸载或改写。

官方应用更新后，应先确认增强包是否支持新构建。当前 Release 没有宣称兼容所有 `0.2.x` 或所有 macOS/CPU 组合。

## 数据和备份

| 内容 | 默认位置与处理 |
| --- | --- |
| 官方用户根目录 | `DSH_HOME` 环境变量指定位置；未设置时为 `~/.dsh` |
| 原生 desktop profile | `${DSH_HOME}/profiles/desktop` |
| 本增强的模块连接 | profile 下 `node_modules/@local/` 中拥有独立 ID 的符号链接 |
| 安装运行库与回执 | `~/Library/Application Support/AIYOU Harness Enhancer`；兼容旧安装器的目录名 |
| 配置备份 | `${DSH_HOME}/backups/aiyou-enhancer/<事务编号>/` |
| 功能设置、资产与看板 | `${DSH_HOME}/aiyou-enhancer/` |

备份目录权限为 `0700`，备份与回执文件为 `0600`。备份保留在本机，安装器输出只含状态、路径和哈希，不包含原配置正文。安装不会把登录态、会话数据库、凭证或私有备份复制进发布包。

## 卸载

打开同一安装器，点击 **卸载增强**，完成后重新打开官方应用。卸载的是本增强拥有的装配关系；官方应用和原生会话由宿主继续管理。私有备份保留，便于核对恢复结果。

恢复遵循以下规则：

- 配置自安装后未改变：恢复安装前的原始备份。
- 用户只修改了受管区外的内容：仅移除未变的受管区，保留后续编辑。
- 受管区、模块连接或运行库被另外修改：保护现有内容，报告冲突。

不要为绕过冲突直接删除配置、安装回执或备份。先查看状态，比较当前文件与私有备份，再决定如何合并；[排障指南](troubleshooting.md)列出了对应错误码。

## 可审查的命令行操作

在解压安装包根目录执行：

```sh
node installer/installer.mjs dry-run --runtime runtime
node installer/installer.mjs install --runtime runtime
node installer/installer.mjs status
node installer/installer.mjs uninstall --dry-run
node installer/installer.mjs uninstall
```

`dry-run`、`install --dry-run`、`status` 和 `uninstall --dry-run` 不写入 profile。安装与卸载不会主动终止或重启官方应用，返回的 `needsRestart` 表示仍需重新打开宿主。

源码工程中路径为 `addon/installer.mjs`，运行库为 `dist/addon/runtime`。完整参数说明见 [addon/README.md](../addon/README.md)，包括 `--app`、`--dsh-home`、`--profile` 和 `--enhancer-home`。自定义 profile 时，应在后续状态与卸载命令中使用同一组路径。
