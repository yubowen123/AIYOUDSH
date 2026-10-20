# 常见问题与排障

[返回首页](../README.md) · [安装与卸载](installation.md) · [反馈问题](https://github.com/yubowen123/AIYOUDSH/issues/new/choose)

## Windows 未找到应用或无法启动安装器

先完整解压 Windows ZIP，保留 `AIYOUDSHInstaller.exe`、`installer/`、`runtime/` 的相对位置。确认运行于 Windows 10/11 x64，.NET Framework 4.8 可用；不要把 Mac 安装包改名使用。

未自动识别官方应用时，在安装器中选择同时包含 `DeepSeek Harness.exe` 和 `resources/app.asar` 的真实安装目录。命令行 `--app` 也接受完整 EXE 路径。没有可用 Node.js 24 时，安装器会检测支持的官方内嵌运行时；两者都不可用会明确提示，不会下载替代运行环境。

## 安装后仍是原界面

先退出并重新打开官方应用，再查看安装器状态。确认安装和启动使用同一个 desktop profile；设置了 `DSH_HOME` 或自定义路径时尤需核对。安装器成功写入配置不等于已完成界面刷新。

源码工程中可执行：

```sh
node addon/installer.mjs status
node addon/installer.mjs dry-run --runtime dist/addon/runtime
```

不要通过删除原 profile、会话数据库或凭证来重置增强。

## 错误码说明

| 错误或表现 | 含义与处理 |
| --- | --- |
| `APP_PLATFORM` | 安装包目标与当前系统/架构不一致。选用 Windows x64 或 macOS arm64 对应包。 |
| `APP_NOT_FOUND` | 未找到官方应用。使用安装器选择真实目录，或通过 `--app` 指定。 |
| `APP_VERSION` / `APP_HASH` / `APP_COMPATIBILITY` | 官方版本、归档或原生模块与适配基线不符。当前版本未安装；核对官方构建，等待对应适配。 |
| `PROFILE_FORMAT` | desktop profile 尚未初始化。先正常打开官方应用一次，再重试。 |
| `LINK_CONFLICT` / `LINK_CHANGED` | 模块路径已由其他内容占用，或在事务期间被修改（Windows 为目录 junction，Mac 为符号链接）。保留现场，核对该路径的所有者。 |
| `PATCH_CONFLICT` / `PATCH_CHANGED` | 受管配置被修改、移除，或并发变化。对比当前配置与私有备份，保留后续编辑。 |
| `BACKUP_CHANGED` | 私有恢复备份缺失或改变。不要用旧快照直接覆盖当前配置；先找回完整备份。 |
| `RUNTIME_CHANGED` | 当前运行库发生修改。保留文件，查明修改来源后决定重新构建或迁移。 |
| `INSTALLER_BUSY` | 另一个安装器事务持有锁。等待当前操作结束，避免同时安装/卸载。 |
| `ROLLBACK_CONFLICT` | 回滚期间出现后续修改，安装器保护了新内容。查看状态和冲突路径后再继续。 |
| “操作结果尚未确认” | 图形安装器未得到完整结果。先查看状态，避免把未确认结果当作成功。 |

## 主题不动或看不到背景

只有机甲主题包含循环视频，其他主题当前为静态图或中性回退。在主题配置中核对背景模式、动态开关和显现强度；系统“减少动态效果”、窗口隐藏和加载失败都会暂停或回退静态背景。关闭配置页或点取消会恢复已保存值，需保存才能保留调整。

某些表面透明度过高会盖住背景，文字对比度也会随背景变化。先用“恢复本主题默认设置”预览基准，再分别调节主体、气泡、面板和输入框。该操作仍需保存。

两套带个人素材来源的主题并未打包原图片；当前显示中性纹理是已声明的回退，详见[主题清单](themes.md)。

## MOKE 无法打开、登录或恢复页面

MOKE 需要一个当前对话以及官方 Browser 插件。未启用 Browser 时会显示原因；可使用系统浏览器访问 [MOKE](https://www.mokeaigc.ai/)。

菜单复用的是同一对话仍存在的标签页，不会自动刷新站内页面。若页面网络错误，可用原生刷新；登录、弹窗、Cookie 和跨重启页面状态由官方 Browser 与网站管理。需要外部登录流程时，用原生“外部打开”处理。本增强不读取或导入其他浏览器的登录态。

## 某个业务功能显示未连接

模型竞技场需要显式配置 MCP 地址。资产内模型调用、3D、节奏处理与看板 AI Chat 当前尚未适配宿主执行通道；页面可见不代表这些能力已连接。Laya 语义检索还需要独立本地模型/运行时。不要通过复制其他应用凭证或绕过宿主权限来解决。

## 如何提交可复现问题

说明 AIYOUDSH 版本、所用安装包平台、官方版本/构建、操作系统版本、CPU 架构、操作步骤、预期与实际结果；附上去除私人内容后的截图和错误码。可使用[问题模板](https://github.com/yubowen123/AIYOUDSH/issues/new/choose)。

不应公开上传完整 profile、配置备份、Cookie、凭证、对话日志或含个人数据的数据库。只附能复现问题的最小信息和脱敏截图。
