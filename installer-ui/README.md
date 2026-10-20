# AIYOUDSH 增强安装器

`Installer.swift` 是独立 AppKit 中文界面。它只在用户点击“安装增强”或“卸载增强”后异步运行对应操作；“打开 AIYOUDSH”只通过系统打开 `/Applications/DeepSeek Harness.app`。操作期间显示进度，禁用三个按钮并等待事务结束。结果区域只显示预设的中文提示，不显示子进程 JSON、错误流或环境变量。

构建接口：

```js
import { buildInstaller } from './installer-ui/build.mjs';
const result = await buildInstaller('/absolute/output/AIYOUDSH 增强安装器.app', resourcesSource);
```

第二个参数可省略。提供时，它是完整 `Contents/Resources` 源目录；构建器验证并复制其内容。省略时生成空 Resources，由主打包器填充。返回 `{ appPath, executablePath, infoPath, resourcesPath, architecture }`。构建只编译、写入目标 `.app` 并验证文件，不运行安装器或修改 Harness profile。该阶段不签名，主打包器应在填充最终资源后统一处理签名。

资源必须保留以下相对结构：

```text
Contents/Resources/
  installer/
    installer.mjs
    vendor/yaml/
  runtime/
```

安装器优先选择 `/opt/homebrew/bin/node`，其次 `/usr/local/bin/node`。均不存在时，使用 `/Applications/DeepSeek Harness.app/Contents/MacOS/DeepSeek Harness` 并向子进程设置 `ELECTRON_RUN_AS_NODE=1`，以 Node 模式执行安装脚本。不会通过 shell 拼接命令。

精确子进程参数为 `[resources/installer/installer.mjs, "install" | "uninstall", "--runtime", resources/runtime]`。子进程应以退出码 `0` 和一个 JSON 对象报告成功；`ok: false` 或非零退出码均展示失败。输出格式不完整时显示“操作结果尚未确认”。stderr 会被独立持续读取并丢弃，stdout 最多保留 256 KiB，仅用于解析结果，不会展示。

构建依赖 macOS 自带 Command Line Tools 中的 `swiftc`、AppKit、`plutil` 与 `file`，生成当前主机架构的 Mach-O，最低系统版本为 macOS 12。可直接运行：

```text
node installer-ui/build.mjs /absolute/output/AIYOUDSH-Installer.app [resources-source]
```

本次已编译并通过 Mach-O、Info.plist 与完整载荷签名检查。主任务已启动中文安装器并实际点击“安装增强”，回读“增强已安装”；官方 Harness 重启后可见新界面。真实卸载未在用户环境执行，恢复与后续编辑保护已在隔离测试中验证。
