# AIYOUDSH 安装器

此安装器把增强运行库装到用户目录，并通过官方 Harness 支持的 desktop profile 和 Cordis patch 接入。官方 `.app` 仅用于读取版本与兼容性校验；不修改、重新签名或复制覆盖官方应用，不复制登录态或会话数据库。

## 安装与查看

在交付安装包中双击根目录的安装入口，或在终端运行：

```sh
node addon/installer.mjs dry-run --runtime runtime
node addon/installer.mjs install --runtime runtime
node addon/installer.mjs status
node addon/installer.mjs uninstall --dry-run
node addon/installer.mjs uninstall
```

源码工程的运行库路径是 `dist/addon/runtime`，因此在工程根目录使用：

```sh
node addon/installer.mjs install --runtime dist/addon/runtime
node --test addon/test/installer.test.mjs
```

也可使用 `install --dry-run`；它与 `dry-run` 子命令相同。`--dry-run` 和 `status` 不写 profile。隔离夹具通过显式参数调用，不需要读取本机真实 profile。

支持的显式路径参数：

| 参数 | 默认值 |
| --- | --- |
| `--runtime` | 优先同包 `runtime/`；源码默认查找 `dist/addon/runtime/` |
| `--app` | `/Applications/DeepSeek Harness.app` |
| `--dsh-home` | 已设置的 `DSH_HOME` 或 `~/.dsh` |
| `--profile` | 上述 DSH 根目录下 `profiles/desktop` |
| `--enhancer-home` | `~/Library/Application Support/AIYOU Harness Enhancer` |

`manifest.json` 为 `schemaVersion: 1`，包含精确 `upstream.appVersion/buildCommit/appAsarSha256/compatibility`、`modules`、`patches` 和 `legacyPluginIds`。安装前对官方 ASAR、版本及被替换模块逐项验证，版本不匹配时停止。运行库版本以完整文件树哈希区分；相同运行库和 profile 的重复安装返回 `alreadyInstalled: true`。

## 接入与原配置

- 不写 profile 的 `package.json`、凭证文件或原 `.app`。
- 当前 15 个模块通过 `profile/node_modules/@local/` 的独立 symlink 接入；数量由运行库 manifest 决定。
- 当前官方 `ui-sidebar`、`ui-workspace` 以 `disabled: true` 停用；新增独立 ID `aiyou-native-sidebar`、`aiyou-native-workspace`，没有用 `name` 不匹配 patch 假装改名。
- 只对用户 patch 中实际定义的旧 prototype 插件追加停用项，不凭空 patch 未存在 ID。
- 使用随包 YAML AST 库解析与校验，`!!js` 保持为不求值的带标签节点。原 block-style YAML 的正文、折行、注释与凭证字面量原样保留；flow-style 列表必要时由 AST 转换，卸载可恢复原始字节。
- 新 patch 置于明确的受管区。修改前在私有备份目录保存原文件和恢复版本；后续用户编辑不被旧快照覆盖。

备份只放在 `DSH_HOME/backups/aiyou-enhancer/<事务编号>/`。目录权限 `0700`，备份与回执文件权限 `0600`。安装状态只含哈希、路径、版本及 symlink 所有权，置于增强安装目录；不在源码、日志、交付 ZIP 中收集配置正文或用户备份。安装器的 JSON 输出不包含配置正文。

升级时还会核对并清理本安装器拥有、但新版本已移除的模块连接（包括旧 Claude Code）。用户已替换的文件或连接会被保护并报冲突；回滚只恢复本事务确实删除的旧连接。

## 卸载、回滚与运行状态

安装事务先准备并核对运行库和 symlink，再原子替换用户 patch。发生冲突时只回滚本次仍匹配的改动。卸载时：

1. 整个 patch 哈希仍匹配时恢复原始私有备份。
2. 用户只在受管区外做了新编辑时，仅移除未变的受管区，保留新编辑。
3. 受管区本身被修改时，保留配置和模块连接并返回冲突；不制造指向缺失模块的配置。
4. symlink 或运行库被另外修改时，保留该内容并报告冲突。

私有备份在卸载后保留，以便核对恢复结果。安装器不会退出、终止或重启官方应用。发生配置变更时返回 `needsRestart: true`、`refreshRecommended: true`；通常可等待官方 HMR 后刷新窗口，是否需要重启由宿主回读确认。该标记不是“已完成可见验收”。原生登录、IPC 鉴权、权限和会话继续由官方宿主管理。

## 验证与许可证

隔离测试覆盖：兼容性拒绝、重复安装、精确卸载、后续编辑保护、受管区冲突、升级、私有备份损坏、空列表、flow YAML、`!!js`、折行与注释、无 patch 的 profile、既有 symlink 冲突、CLI 输出不含配置，以及官方应用文件不变。所有测试文件位于本工程 `temporary/`，测试后删除。

`vendor/yaml` 来自当前官方依赖中的 `yaml 2.9.1`，其 ISC 许可证原文在 `vendor/yaml/LICENSE`。增强模块与恢复代码的上游 MIT 许可证由运行库和源码包保留。打包只收集源码、随包依赖和运行库，不读取用户安装状态或私有备份。
