# AIYOUDSH

[![Verify](https://github.com/yubowen123/AIYOUDSH/actions/workflows/verify.yml/badge.svg)](https://github.com/yubowen123/AIYOUDSH/actions/workflows/verify.yml)
[![Release](https://img.shields.io/github/v/release/yubowen123/AIYOUDSH)](https://github.com/yubowen123/AIYOUDSH/releases/latest)
[![Code license: MIT](https://img.shields.io/badge/code-MIT-blue)](LICENSE)

**让官方 DeepSeek Harness 拥有更完整的工作台、主题和创作入口。**

AIYOUDSH 是可安装、可卸载的桌面增强包：基于官方安装包中的原生扩展接口，重新整理导航和对话侧栏，加入主题配置、动态背景、本地资产与项目管理，并将常用工具放到当前对话中。

[下载安装 v0.4.0](https://github.com/yubowen123/AIYOUDSH/releases/tag/v0.4.0) · [安装与卸载](docs/installation.md) · [功能说明](docs/features.md) · [主题与动效](docs/themes.md) · [构建源码](docs/development.md) · [问题反馈](https://github.com/yubowen123/AIYOUDSH/issues)

![AIYOUDSH 工作台：左侧功能栏与对话列表、中间聊天和主题背景](docs/screenshots/overview.jpg)

## 这一版有什么

- **统一工作台。** 独立竖向功能栏与会话列表，置顶、项目、最近、中断四类视图；搜索、摘要、标签和三色标注。工具在右侧打开，中间聊天保留。
- **完整主题配置。** 七套内置配色，背景位置与强度、14 项分层透明度、13 项颜色；支持实时预览、取消、保存和恢复系统默认。
- **真实动态背景。** 机甲主题使用原视频静音循环。关闭动态、系统减少动态或媒体失败时回退静态背景。
- **创作入口。** MOKE AIGC 在官方内置浏览器中打开；资产控制台和项目看板使用随包本地服务。
- **对话工具归位。** 用量与上下文、输出目录固定在对话顶部右侧，绑定当前对话。

v0.4.0 已将界面与窗口名称统一为 **AIYOUDSH**，移除 Claude Code 功能模块、菜单及本增强包遗留的标签页。官方应用包和 macOS 应用菜单保留原名，便于原生更新及恢复。

## 界面预览

| 主题与动效配置 | MOKE 内置浏览器 |
| --- | --- |
| ![主题与动效配置页面](docs/screenshots/theme-settings.jpg) | ![MOKE AIGC 原生内置浏览器](docs/screenshots/moke-browser.jpg) |
| 各区域分别调节，修改先预览、保存后生效于后续启动。 | 保留原生地址栏、前进后退、刷新和外部打开。 |

![AIYOUDSH 中文增强安装器](docs/screenshots/installer.jpg)

截图为本版本实际界面。欢迎页在未发送演示消息的状态下拍摄，历史会话通过搜索筛选隐藏；主题背景与显示比例可自行调整。[截图来源](docs/screenshots/README.md)

## 安装

当前发布包面向 **macOS Apple Silicon（arm64）**，需要先安装并打开一次受支持的官方 DeepSeek Harness。

| 要求 | 当前支持 |
| --- | --- |
| 官方版本 | `0.2.1-rc.2` |
| 官方构建 | `332895e0f7c9d4dbfb29729f5eb367fa263ff986` |
| 匹配方式 | 校验版本、构建、应用归档哈希和被适配组件；不匹配时停止 |
| 增强运行库 | 15 个安装模块：2 个原生界面模块 + 13 个功能模块 |
| 安装器 | macOS 原生中文界面；当前预编译包为 arm64 |
| 源码构建 | Node.js 24 或更新版本；打包安装器另需 macOS Command Line Tools |

1. 从 [v0.4.0 Release](https://github.com/yubowen123/AIYOUDSH/releases/tag/v0.4.0) 下载 [AIYOUDSH-v0.4.0-macos-arm64.zip](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.4.0/AIYOUDSH-v0.4.0-macos-arm64.zip)。
2. 解压后打开 `AIYOUDSH 增强安装器.app`，点击 **安装增强**。
3. 安装完成后退出并重新打开官方应用。卸载时回到同一安装器，点击 **卸载增强**，再重新打开官方应用。

安装前自动建立私有备份；更新和卸载遇到用户后续修改时会保护现场并报告冲突。安装器不覆盖官方 `.app`，已有会话、草稿与模型账号仍由官方应用管理。详细路径、自定义安装和冲突处理见[安装指南](docs/installation.md)。

## 支持范围

这是围绕当前官方安装包制作的外挂增强工程，不是可独立启动的官方应用 fork。源码包括从当前发布组件恢复的可编辑 JavaScript 分区、新增扩展及本地服务；不宣称还原了官方原始 TypeScript 工程，也不宣称与 AIYOUcodex 全功能等价。

当前主题中的 **机甲为 4 秒视频循环**，其他主题使用静态背景；原版七状态事件动效、声音、轮播与媒体上传界面尚未接入。两套原本依赖个人图片的主题使用明确标注的中性纹理回退。MOKE 的站点登录及跨重启页面恢复由官方浏览器和站点管理。[完整能力与边界](docs/features.md) · [各主题实际媒体](docs/themes.md)

## 从源码构建

```sh
git clone https://github.com/yubowen123/AIYOUDSH.git
cd AIYOUDSH
npm run build
npm test
npm run verify
```

根构建使用随仓库依赖，无需先运行 `npm install`。上述命令构建和验证文件，不会安装到真实 profile。要生成桌面安装包，在 macOS 上继续运行 `npm run package`。目录、安装命令、验证范围和打包产物见[开发指南](docs/development.md)。也可下载 [v0.4.0 源码归档](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.4.0/AIYOUDSH-v0.4.0-source.zip)。

## 来源与许可

本项目基于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 发布组件及 AIYOUcodex 的适配逻辑。保留 DeepSeek 与各第三方项目的原有署名和许可；任务看板、资产服务、字体、YAML 库、MOKE 标识和主题媒体有各自来源。[许可与素材说明](docs/licensing.md) · [第三方声明](aiyou/THIRD_PARTY_NOTICES.md)

主题代码许可不转授第三方角色、商标或其他媒体权利。

---

**English:** AIYOUDSH is a removable workbench and theme add-on for the official DeepSeek Harness desktop application. The current release targets macOS arm64 and one exact `0.2.1-rc.2` build. It includes editable JavaScript reconstruction partitions and extension sources, not a standalone application or a restoration of the original TypeScript project. See the Chinese guides above for installation, supported features, and limitations.
