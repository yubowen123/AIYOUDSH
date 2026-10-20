import { cp, mkdir, readFile, readdir, rm, writeFile, chmod } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareDistributionDocuments, rewriteDistributionLinks } from './release-documents.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const delivery = resolve(root, '..');
const { version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (process.platform !== 'darwin' || process.arch !== 'arm64') throw new Error('The macOS installer package requires macOS arm64; use package-windows.mjs on Windows x64.');
const manifest = JSON.parse(await readFile(join(root, 'dist/addon/runtime/manifest.json'), 'utf8'));
if (manifest.upstream?.platform !== 'darwin-arm64') throw new Error('Build the darwin-arm64 runtime before packaging macOS.');
if (manifest.version !== version) throw new Error('Runtime version must match the macOS release version.');
const stage = join(root, 'dist', 'release', 'AIYOUDSH');
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
await cp(join(root, 'dist', 'addon', 'runtime'), join(stage, 'runtime'), { recursive: true });
await cp(join(root, 'addon'), join(stage, 'installer'), { recursive: true, filter: path => !relative(join(root, 'addon'), path).split(sep).includes('test') && !path.endsWith('.test.mjs') });
await prepareDistributionDocuments(root, stage, version);
// Terminal wrappers are also provided for systems that prefer an auditable script.
for (const [name, action] of [['安装.command', 'install'], ['卸载.command', 'uninstall']]) {
  const content = `#!/bin/zsh\nset -eu\nBASE_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"\nif [[ -x /opt/homebrew/bin/node ]]; then\n  NODE_BIN=/opt/homebrew/bin/node\nelif [[ -x /usr/local/bin/node ]]; then\n  NODE_BIN=/usr/local/bin/node\nelse\n  NODE_BIN='/Applications/DeepSeek Harness.app/Contents/MacOS/DeepSeek Harness'\n  export ELECTRON_RUN_AS_NODE=1\nfi\n"$NODE_BIN" "$BASE_DIR/installer/installer.mjs" ${action} --runtime "$BASE_DIR/runtime"\nprint '\n操作完成，请重新打开 AIYOUDSH。'\nread '?按回车关闭…'\n`;
  await writeFile(join(stage, name), content);
  await chmod(join(stage, name), 0o755);
}
const installerUI = await import('../installer-ui/build.mjs');
const app = join(stage, 'AIYOUDSH 增强安装器.app');
await installerUI.buildInstaller(app);
await cp(join(stage, 'installer'), join(app, 'Contents', 'Resources', 'installer'), { recursive: true });
await cp(join(stage, 'runtime'), join(app, 'Contents', 'Resources', 'runtime'), { recursive: true });
const notices = join(app, 'Contents', 'Resources', 'notices');
await mkdir(notices, { recursive: true });
for (const name of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'THIRD_PARTY_DEPENDENCIES.json']) {
  await cp(join(root, name), join(notices, name));
}
await rewriteDistributionLinks(join(notices, 'THIRD_PARTY_NOTICES.md'), join(root, 'THIRD_PARTY_NOTICES.md'), { root, version });
const sign = spawnSync('codesign', ['--force', '--deep', '--sign', '-', app], { encoding: 'utf8' });
if (sign.status !== 0) throw new Error(sign.stderr);
const check = spawnSync('codesign', ['--verify', '--deep', '--strict', app], { encoding: 'utf8' });
if (check.status !== 0) throw new Error(check.stderr);
const zip = join(delivery, `AIYOUDSH-v${version}-macos-arm64.zip`);
await rm(zip, { force: true });
const archive = spawnSync('/usr/bin/ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', stage, zip], { encoding: 'utf8' });
if (archive.status !== 0) throw new Error(archive.stderr);
const sourceStage = join(root, 'dist', 'source', 'AIYOUDSH-source');
await rm(sourceStage, { recursive: true, force: true });
await mkdir(sourceStage, { recursive: true });
for (const name of ['README.md', 'package.json', 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'THIRD_PARTY_DEPENDENCIES.json', 'CHANGELOG.md', 'CONTRIBUTING.md', 'docs', '.github', '.gitignore', '.gitattributes', 'addon', 'installer-ui', 'installer-win', 'platforms', 'scripts', 'aiyou', 'test']) await cp(join(root, name), join(sourceStage, name), { recursive: true, filter: path => { const parts = relative(root, path).split(sep); return !parts.some(part => part.startsWith('.verification')) && !(['installer-ui', 'installer-win'].includes(name) && parts.includes('build')); } });
for (const name of ['dsh-client-ui-sidebar', 'dsh-client-ui-workspace']) await cp(join(root, 'packages', name), join(sourceStage, 'packages', name), { recursive: true });
// Theme compatibility tests use the exact recovered native CSS as evidence.
// Include those six small reference files, rather than requiring the full app.
for (const [name, fragments] of [
  ['chat', ['MessageItem.module.css', 'AssistantMarkdown.module.css']],
  ['conversation', ['InputBar.module.css', 'ConversationRoot.module.css']],
  ['layout', ['AppFrame.module.css']],
  ['sidebar-right', ['SidebarRight.module.css']],
]) {
  const relative = join('packages', `dsh-client-ui-${name}`, 'src-recovered', 'lib', 'client_js');
  const files = await readdir(join(root, relative));
  await mkdir(join(sourceStage, relative), { recursive: true });
  for (const fragment of fragments) {
    const file = files.find(file => file.includes(fragment));
    if (!file) throw new Error(`Missing native CSS reference: ${fragment}`);
    await cp(join(root, relative, file), join(sourceStage, relative, file));
  }
  await cp(join(root, 'packages', `dsh-client-ui-${name}`, 'package.json'), join(sourceStage, 'packages', `dsh-client-ui-${name}`, 'package.json'));
}
const sourceZip = join(delivery, `AIYOUDSH-v${version}-source.zip`);
await rm(sourceZip, { force: true });
// Python's ZIP writer marks Unicode filenames as UTF-8, including the Windows
// command wrappers. macOS ditto omits that flag, which some Windows tools misread.
const sourceZipWriter = `
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import sys
stage, archive = map(Path, sys.argv[1:])
with ZipFile(archive, 'w', compression=ZIP_DEFLATED, compresslevel=6) as bundle:
    for file in sorted(stage.rglob('*')):
        if file.is_file():
            bundle.write(file, stage.name + '/' + file.relative_to(stage).as_posix())
with ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    names = bundle.namelist()
    assert 'AIYOUDSH-source/installer-win/安装.cmd' in names
    assert 'AIYOUDSH-source/installer-win/卸载.cmd' in names
    assert all(entry.flag_bits & 0x800 for entry in bundle.infolist() if not entry.filename.isascii())
`;
const sourceArchive = spawnSync('python3', ['-c', sourceZipWriter, sourceStage, sourceZip], { encoding: 'utf8' });
if (sourceArchive.status !== 0) throw new Error(sourceArchive.stderr);
const hashes = {};
for (const path of [zip, sourceZip]) hashes[path] = createHash('sha256').update(await readFile(path)).digest('hex');
await writeFile(join(delivery, '交付文件校验.json'), JSON.stringify({ files: Object.fromEntries(Object.entries(hashes).map(([file, digest]) => [file.split('/').at(-1), digest])), installerSignature: 'local ad-hoc', baseApplicationModified: false }, null, 2) + '\n');
console.log(JSON.stringify({ installer: zip, source: sourceZip, app, hashes }));
