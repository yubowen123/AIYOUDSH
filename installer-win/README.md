# AIYOUDSH Windows 图形安装器

Windows 10/11、.NET Framework 4.8。安装器以当前用户权限运行，不申请管理员权限、不下载依赖，也不修改官方应用包。增强运行时、配置补丁、模块 junction 和可逆卸载统一交给共享的 `installer/installer.mjs`。

完整解压 Windows 安装包，双击 `AIYOUDSHInstaller.exe`，选择“安装增强”。安装器读取官方卸载注册表中的 `InstallLocation`，并检查常见目录。未自动找到官方应用时，点击“选择应用目录”，选择包含 `DeepSeek Harness.exe` 及 `resources/app.asar` 的目录。先运行官方应用一次完成初始化；安装后完全退出并重新打开。也可用 `安装.cmd` / `卸载.cmd` 直接进入对应操作。

安装器优先使用 PATH 或标准目录下的 Node.js 24 及以上版本；没有可用 Node 时，探测官方 Electron 的 Node 模式。两者都不满足时只显示预设提示，不自动下载安装工具。“打开 AIYOUDSH”以正常桌面模式启动官方应用，不继承 Node 模式。

## 构建

在 Windows PowerShell 5.1 或更新版本中执行：

```powershell
powershell -NoProfile -File installer-win/build.ps1 `
  -OutputDirectory dist/windows/AIYOUDSH `
  -ResourcesSource dist/release/AIYOUDSH `
  -SelfTest
```

`ResourcesSource` 的根目录必须包含 `installer/installer.mjs`、`installer/vendor/yaml/`、`runtime/manifest.json`。省略该参数仅编译 GUI，不复制运行时。编译器来自 Windows 自带的 `%WINDIR%\Microsoft.NET\Framework[64]\v4.0.30319\csc.exe`，目标为 AnyCPU WinExe。构建不会触碰用户 Harness profile。

## CI 验证范围

```powershell
installer-win/build.ps1 -OutputDirectory dist/windows/AIYOUDSH `
  -SelfTest -ScreenshotPath dist/windows/installer-ci.png
```

`--self-test --result <file>` 仅检查参数转义、进程环境、中文资源路径及结果解析，不安装增强、不启动官方应用。`--ci-screenshot <file>` 仅打开并保存安装器自身窗口然后关闭，不能证明 Windows 宿主应用的实际显示效果。

标准输出和错误流分别异步排空，并限制保留长度。GUI 只读取结构化结果中的已知状态和错误码，任何运行时返回的配置、路径、消息或凭证值都不会原样展示。
