# AIYOUDSH

[![Verify](https://github.com/yubowen123/AIYOUDSH/actions/workflows/verify.yml/badge.svg)](https://github.com/yubowen123/AIYOUDSH/actions/workflows/verify.yml)
[![Release](https://img.shields.io/github/v/release/yubowen123/AIYOUDSH)](https://github.com/yubowen123/AIYOUDSH/releases/latest)
[![Code license: MIT](https://img.shields.io/badge/code-MIT-blue)](LICENSE)

**让官方 DeepSeek Harness 拥有更完整的工作台、主题和创作入口。**

AIYOUDSH 是可安装、可卸载的桌面增强包：基于官方安装包的原生扩展接口，重新整理导航和对话侧栏，加入主题配置、动态背景、本地资产与项目管理。v0.8.5 新增 GGWK / APIAI 默认媒体通道，填写 Key 后自动配置图片/视频模型；保留 Intel Mac（x64）独立安装包，并延续 AIYOUPLUS 画布与创作工具的本地融合，文字使用宿主模型，素材使用 DSH 统一素材库；新增全插件主题同步和独立的画布外观配置；素材库采用左目录右素材，支持目录关联与扫描，媒体 API 支持文档、模型目录与调用合同自动关联配置。本轮主题检查在 macOS Apple Silicon 与隔离浏览器中分层验证；v0.5.0 的 Windows x64 支持保留，新增主题及画布能力尚未完成 Windows 桌面实测。

[下载 v0.8.5](https://github.com/yubowen123/AIYOUDSH/releases/tag/v0.8.5) · [安装与卸载](docs/installation.md) · [功能说明](docs/features.md) · [主题与动效](docs/themes.md) · [构建源码](docs/development.md) · [问题反馈](https://github.com/yubowen123/AIYOUDSH/issues)

![AIYOUDSH 工作台：左侧功能栏与对话列表、中间聊天和主题背景；macOS 实机](docs/screenshots/overview.jpg)

默认媒体通道与验证范围见 [v0.8.5 说明](docs/releases/v0.8.5.md)；Intel 架构适配基线见 [v0.8.4 说明](docs/releases/v0.8.4.md)。v0.8.5 分别发布 macOS Apple Silicon、Intel 与完整源码；Windows v0.5.0 下载保留为历史版本。

## 下载与兼容

| 平台 | 安装包 | 条件 |
| --- | --- | --- |
| Windows 10 / 11 x64（历史 v0.5.0） | [AIYOUDSH-v0.5.0-windows-x64.zip](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.5.0/AIYOUDSH-v0.5.0-windows-x64.zip) | 历史稳定包；官方 x64 应用、.NET Framework 4.8。v0.8.3 新能力尚未完成 Windows 桌面验收 |
| macOS Apple Silicon arm64 | [AIYOUDSH-v0.8.5-macos-arm64.zip](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.8.5/AIYOUDSH-v0.8.5-macos-arm64.zip) | 官方 arm64 应用；原生 AppKit 安装器 |
| macOS Intel x64 | [AIYOUDSH-v0.8.5-macos-x64.zip](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.8.5/AIYOUDSH-v0.8.5-macos-x64.zip) | macOS 13+；官方 Intel rc.1 应用；独立 x64 安装器与媒体工具 |
| 可构建源码 | [AIYOUDSH-v0.8.5-source.zip](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.8.5/AIYOUDSH-v0.8.5-source.zip) | Node.js 24 或更新版本；按平台构建 |

[SHA-256 校验文件](https://github.com/yubowen123/AIYOUDSH/releases/download/v0.8.5/AIYOUDSH-v0.8.5-SHA256SUMS.txt) · [v0.5.0 说明](docs/releases/v0.5.0.md) · [上一版 macOS v0.4.0](https://github.com/yubowen123/AIYOUDSH/releases/tag/v0.4.0)

Apple Silicon 与 Windows 目标固定官方 **`0.2.1-rc.2 / 332895e`**；Intel 目标固定官方 **`0.2.1-rc.1 / ed75efe`**，其官方 Intel [ZIP](https://download.deepseek.com/dsh-desk/bin/mac-x64/deepseek-harness-0.2.1-rc.1-mac-x64.zip)已独立核对。各包校验对应架构、应用归档和组件哈希，不匹配时停止安装。Windows ARM 不在支持范围。

## 工作台与功能

- **画布与创作。** 左侧画布、创作工具和媒体模型菜单；支持对话控制原画布、同库素材插入、图片/视频/音频自定义接口及文档智能配置。说明与验证边界见[融合说明](docs/integration/aiyouplus.md)。
- **统一工作台。** 独立竖向功能栏与会话列表，置顶、项目、最近、中断四类视图；搜索、摘要、标签和三色标注。工具在右侧打开，中间聊天保留。
- **统一主题与画布外观。** 七套内置主题加系统默认，资产库、项目看板、媒体模型、原生信息面板及本机画布页面跟随主题。全局保留 14 项透明度与 13 项颜色；画布另有 9 项颜色、4 项底色透明度、背景与网格配置。保存同步到其他宿主窗口，本地未保存预览受到保护。
- **真实动态背景。** 机甲使用原视频静音循环；关闭动态、系统减少动态或媒体失败时回退静态背景。
- **创作入口。** MOKE AIGC 使用官方内置浏览器；资产控制台和项目看板使用随包本地服务。
- **对话工具归位。** 用量与上下文、输出目录位于有消息对话的顶部右侧，绑定当前对话。

界面与窗口名称统一为 **AIYOUDSH**，Claude Code 功能模块、菜单及本增强拥有的遗留标签页已移除。官方应用包与系统应用入口保留原名。功能以原生插件和随包本地服务装配，保留参考源码的模块不等于默认启用。

Windows 版本使用独立官方基线和语义 CSS 映射适配原生界面与主题，并非将 Mac 包改名分发。功能范围、待连接的模型通道和验证边界见[功能说明](docs/features.md)。

## 界面预览

| 主题与动效配置 · macOS | MOKE 内置浏览器 · macOS |
| --- | --- |
| ![macOS 主题与动效配置](docs/screenshots/theme-settings.jpg) | ![macOS MOKE AIGC 原生内置浏览器](docs/screenshots/moke-browser.jpg) |
| 各区域分别调节，修改先预览，保存后保留。 | 保留原生地址栏、前进后退、刷新和外部打开。 |

![macOS 中文增强安装器](docs/screenshots/installer.jpg)

以上为 v0.4.0 的 macOS 实机截图，展示两平台共用的功能设计；不是 Windows 宿主界面截图。欢迎页在未发送演示消息的状态下拍摄，历史会话通过搜索筛选隐藏。[截图来源](docs/screenshots/README.md)

![Windows 中文增强安装器：CI 中由实际 WinForms 程序渲染](docs/screenshots/windows-installer.png)

Windows 图为实际编译安装器在 GitHub Windows runner 中的准备界面，不是 Windows 宿主聊天截图。

## 产品能力与主题图解

![AIYOUDSH 完整能力与主题图解：共享画布、统一素材、创作工具、媒体模型、Codex CLI 与项目管理](docs/knowledge-card-v0.8.3-expanded.png)

详细展示共享画布、统一素材库、22 个创作工具、媒体 API 智能配置、本地 Codex CLI、项目与对话管理，以及多主题配色、透明度、背景和画布外观联动。图中工作台与主题界面为能力示意，实际界面见上方截图。功能范围见[功能说明](docs/features.md)，使用边界见[审查与剩余事项](docs/releases/v0.8.3-audit.md)。

## 安装

先正常打开一次受支持的官方 DeepSeek Harness，完成 profile 初始化，再**完整解压**对应平台增强包。

- **Windows：** 双击 `AIYOUDSHInstaller.exe`，点击“安装增强”。未自动找到官方应用时，选择包含 `DeepSeek Harness.exe` 和 `resources/app.asar` 的安装目录。不要仅移动安装器 EXE。
- **macOS：** 打开 `AIYOUDSH 增强安装器.app`，点击“安装增强”。

完成后退出并重新打开官方应用。卸载使用同一安装器的“卸载增强”；两平台也提供对应的安装/卸载脚本。

安装前自动建立备份。更新和卸载遇到用户后续修改时会保护现场并报告冲突；官方应用文件、已有会话、草稿与账号仍由宿主管理。[安装、路径与恢复规则](docs/installation.md)

## 源码构建

```sh
git clone https://github.com/yubowen123/AIYOUDSH.git
cd AIYOUDSH
npm run build
npm test
npm run verify
```

Node.js 24 起，默认按当前平台构建 `dist/addon/runtime/`；也可显式选择 `darwin-arm64`、`darwin-x64` 或 `win32-x64` 目标。根构建使用随仓库依赖，无需先运行 `npm install`。macOS 打包使用 `npm run package`，Windows 使用 `npm run package:windows`。[开发与验证指南](docs/development.md)

## 当前范围

AIYOUDSH 是官方应用的外挂增强，不是可独立启动的官方 fork。源码包含可编辑 JavaScript 恢复分区、新增扩展与本地服务，不宣称还原官方原始 TypeScript 工程或与 AIYOUcodex 全功能等价。

机甲为 **4 秒背景视频循环**，其他主题使用静态背景或明确标注的中性纹理回退；原版事件动效、声音、轮播与媒体上传页尚未接入。MOKE 的登录和跨重启页面状态由官方 Browser 与站点管理，主题仅作用于原生容器，不注入外站内部。[主题清单](docs/themes.md) · [本轮验证边界](docs/releases/v0.8.0.md#验证与边界)

<!-- aiyou-contact:start -->
## 联系作者 / Contact

扫码添加作者微信，交流使用体验与项目合作。

<p><img src="docs/assets/wechat-contact.jpg" alt="Glimmer · 光波的个人微信二维码" width="280" /></p>
<!-- aiyou-contact:end -->

## 来源与许可

基于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 发布组件及 AIYOUcodex 适配逻辑，保留 DeepSeek 与第三方项目的署名和许可。任务看板、资产服务、字体、YAML、MOKE 标识和主题媒体有各自来源；代码许可不转授第三方角色、商标或媒体权利。[许可与素材](docs/licensing.md) · [第三方声明](aiyou/THIRD_PARTY_NOTICES.md)

---

**English:** AIYOUDSH is a removable workbench and theme add-on for official DeepSeek Harness. v0.8.3 adds a shared canvas, DSH asset workflows, configurable media APIs and local Codex CLI integration. v0.8.4 added separate macOS Apple Silicon and Intel x64 installers plus source archives; the historical Windows v0.5.0 download remains available. New canvas/theme features have not completed Windows desktop validation. The Intel target requires macOS 13+ and official `0.2.1-rc.1 / ed75efe`; Apple Silicon and Windows retain `0.2.1-rc.2 / 332895e`. Sources include editable JavaScript reconstruction partitions and extensions, not a standalone app or a restoration of the original TypeScript project. The gallery above shows macOS captures; see the release notes for validation scope.
