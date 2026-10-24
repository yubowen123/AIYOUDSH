# 原始内容与第三方说明

AIYOUPLUS 基于用户提供的本地「桥豆麻衣酱 Atelier 1.0」发布包恢复和修改。改名与新 Logo 不改变原始代码、素材及第三方组件的权利归属，也不构成新的商业许可。

原包可见声明包括「@桥豆麻衣酱 | 全平台同名 · 禁商用 · 画布免费」与「画布是免费的，切勿购买」。原作者声明在此保留。未随包发现涵盖完整应用的开源许可证，因此没有将原应用代码重新声明为自有或开源授权。

Electron、React、Three.js、PixiJS、PDF.js、FFmpeg 与其他依赖沿用各自许可。恢复的 node_modules 内保留随包 LICENSE、NOTICE 等文件；Chromium 许可见发布应用包的 LICENSE/许可文件。

全新 AIYOUPLUS 几何 Logo 与本次新增的构建、兼容和验证代码位于项目相应目录。原品牌图片已在运行工程中替换；原始安装包保持不变。

## 1.1 随包媒体工具

`resources/media-tools/` 增加 FFmpeg/FFprobe 及其依赖，随 `Contents/Resources/media-tools/` 打包。程序、动态库、版本、SHA-256、构建参数、来源和逐组件许可见该目录 `manifest.json` 与 `licenses/`，说明见 `analysis/bundled-media-tools.md`。本机采集的 FFmpeg 构建启用了 GPL 组件，使用 GPLv3；保留了实际许可证和对应来源链接，但本工程没有包含全部对应源码归档。新增品牌不更改这些许可。

这组媒体工具为 arm64，声明的最低 macOS 为 26.0，本轮实际系统为 macOS 26.6.2。恢复 Electron runtime 自身包含其他架构，不代表媒体工具和所有原生模块完成 Intel 或较旧系统验收。

## DSH 选择移植说明

本目录只选择恢复后的 renderer 资源与本地 Node 引擎；上文对 Electron 发布包、node_modules、Resources 的描述指原 AIYOUPLUS 来源工程，不表示这些目录随当前移植包复制。当前目录没有重新授权原作者代码。`original-bundle-comments.txt` 保留被选择代码中的随包第三方许可声明；DSH 的媒体工具与许可证由宿主 `aiyou/vendor/media-tools/` 单独提供。新增浏览器桥接、owned-root Node 宿主、工具页和验证脚本与原来源文件在 provenance 中区分。
