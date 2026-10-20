# AIYOUDSH 安装器

安装器把增强运行库装到当前用户目录，通过官方 DeepSeek Harness 的 desktop profile 和 Cordis patch 接入。macOS 与 Windows 使用相同的安装事务、配置保护和 JSON CLI；分别核对各自官方安装包的精确基线。官方应用只读，不修改、重新签名或覆盖官方文件，也不复制登录态或会话数据库。

## 安装与查看

在交付安装包中双击安装入口，或通过 Node.js 调用随包安装器：

```sh
node addon/installer.mjs dry-run --runtime runtime
node addon/installer.mjs install --runtime runtime
node addon/installer.mjs status
node addon/installer.mjs uninstall --dry-run
node addon/installer.mjs uninstall
```

源码工程运行库位于 `dist/addon/runtime`。Windows 运行库必须先按 `win32-x64` 构建，macOS 使用 `darwin-arm64` 构建；两者不能混装。命令行可显式选择官方安装位置，例如：

```powershell
node addon/installer.mjs dry-run --runtime runtime --app "C:\Users\Me\AppData\Local\Programs\DeepSeek Harness\DeepSeek Harness.exe"
```

`install --dry-run` 与 `dry-run` 子命令相同。`--dry-run`、`status` 不写 profile。官方应用未找到、平台或架构不匹配时，安装会在创建锁、私有备份或修改配置前停止。

| 参数 | macOS 默认值 | Windows 默认值 |
| --- | --- | --- |
| `--runtime` | 同包 `runtime/`；源码查找 `dist/addon/runtime/` | 同左，须为 Windows 运行库 |
| `--app` | `/Applications/DeepSeek Harness.app`，再查当前用户 `Applications` | 探测 `LOCALAPPDATA/Programs`、`LOCALAPPDATA`、`ProgramFiles`、`ProgramFiles(x86)` 下常用目录名 |
| `--dsh-home` | 已设置的 `DSH_HOME` 或 `~/.dsh` | 已设置的 `DSH_HOME` 或 `%USERPROFILE%/.dsh` |
| `--profile` | 上述 DSH 根目录下 `profiles/desktop` | 同左 |
| `--enhancer-home` | `~/Library/Application Support/AIYOU Harness Enhancer`，兼容旧版 | `%LOCALAPPDATA%/AIYOUDSH` |

Windows 的 `--app` 接收安装根目录或真实存在的 `.exe`，归一为包含 `resources/app.asar` 的安装根目录。macOS 读取 `Contents/Resources/app.asar`。官方安装目录允许自选；自动发现失败时使用界面选择或显式 `--app`，不会猜测并修改另一个目录。卸载与状态查看不要求官方应用仍然安装。

## 精确兼容性与回执

运行库 manifest 保持 `schemaVersion: 1`，包含：

- `upstream.platform`：`darwin-arm64` 或 `win32-x64`。缺失时仅按旧版 Mac ARM64 格式处理。
- 精确 `upstream.appVersion/buildCommit/appAsarSha256/compatibility`。
- `modules`、`patches` 和 `legacyPluginIds`。

安装前读取官方 ASAR 的版本与构建提交，校验整个 ASAR 及被替换模块的哈希。只接受该平台实包核验过的基线；不会用另一平台的哈希或忽略校验继续安装。运行库按完整文件树哈希区分；相同运行库和 profile 重复安装返回 `alreadyInstalled: true`。

安装回执同样保持 `schemaVersion: 1`，兼容旧版 Mac 回执。Windows 的连接所有权比较会处理 `readlink()` 返回的 NT 命名空间前缀、UNC、分隔符与大小写差异，同时核对 profile、运行库路径及模块名，不能据此接管其他目录。

## 接入与原配置

- 不写 profile 的 `package.json`、凭证文件或官方应用。
- 模块通过 `profile/node_modules/@local/` 接入，数量由运行库 manifest 决定。macOS 使用目录 symlink；Windows 使用目录 junction，无需管理员权限或 Developer Mode。
- 当前官方 `ui-sidebar`、`ui-workspace` 以 `disabled: true` 停用；新增独立 ID `aiyou-native-sidebar`、`aiyou-native-workspace`，不使用 `name` 不匹配的 patch 改名。
- 只对用户 patch 中实际定义的旧 prototype 插件追加停用项。
- 随包 YAML AST 库仅解析，不求值 `!!js` 等标签。原 block-style YAML 的正文、折行、注释与字面量保持；flow-style 列表必要时由 AST 转换，卸载可恢复原始字节。
- 新 patch 位于明确的受管区。修改前在私有备份目录保存原文件和恢复版本；后续用户编辑不会被旧快照覆盖。

备份只放在 `DSH_HOME/backups/aiyou-enhancer/<事务编号>/`。macOS 目录权限为 `0700`，备份与回执为 `0600`；Windows 文件访问继承当前用户目录的 ACL，不能把 POSIX mode 当作 Windows ACL 验证结果。安装状态仅含哈希、路径、版本与连接所有权，不在源码、日志或交付包中收集用户配置、私有备份或秘密。JSON 输出不包含配置正文。

升级时核对并清理本安装器拥有、但新版本已移除的模块连接（包括旧 Claude Code）。用户已替换的文件或连接会被保护并报冲突；回滚只恢复本事务实际删除或替换的连接。Windows 用独占 junction 创建避免覆盖后来出现的新所有者，profile 父目录若为 symlink/junction 则拒绝接入。

## 卸载、回滚与运行状态

安装事务核对并准备运行库和模块连接后，原子替换用户 patch。冲突时仅回滚本事务仍拥有的改动。卸载时：

1. 整个 patch 哈希仍匹配，恢复原始私有备份。
2. 用户只在受管区外新编辑，仅移除未变的受管区。
3. 受管区本身被修改，保留配置及模块连接，返回冲突。
4. 模块连接或运行库被其他操作修改，保留内容并报告冲突。

私有备份在卸载后保留。安装器不会退出、终止或重启官方应用。配置变更返回 `needsRestart: true`、`refreshRecommended: true`，这些标记表示需要刷新确认，不代表界面已经验收。登录、IPC 鉴权、权限和会话仍由官方宿主管理。

CLI 成功输出保留 `action`、`changed`、`modules`、`compatible`、`needsRestart` 等字段；安装结果新增 `platform` 和实际 `app` 根目录。错误以 `{ok:false,code,message}` 输出到 stderr，未发现官方应用为 `APP_NOT_FOUND`，平台/架构错误为 `APP_PLATFORM`，其他兼容性错误包括 `APP_VERSION`、`APP_HASH`、`APP_COMPATIBILITY`。不存在跳过平台或哈希检查的 CLI 参数。

## 验证与许可证

```sh
node --test addon/test/*.test.mjs
```

隔离测试在工程 `temporary/` 下创建小型合成 ASAR 与临时 profile，结束后清理，不读写真实安装状态。测试覆盖原有 Mac 事务，以及 Windows 布局、默认目录、显式 exe、平台拒绝、幂等升级卸载、用户修改保护、退休模块清理、并发回滚、父目录 junction 拒绝与 NT 路径比较。在 macOS 上执行的 Windows 夹具验证共享逻辑，不能代替 Windows 文件系统验证；带有 `native Windows` 标记的测试仅在 Windows CI 上实际创建和操作目录 junction。

`vendor/yaml` 为 `yaml 2.9.1`，ISC 许可证原文位于 `vendor/yaml/LICENSE`。增强模块与恢复代码的上游 MIT 许可证随源码与运行库保留。打包只收集源码、随包依赖和运行库，不读取用户安装状态或备份。
