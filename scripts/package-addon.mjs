import { cp, mkdir, readFile, readdir, rm, writeFile, chmod, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const delivery = resolve(root, '..');
const { version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
// Distribution documents retain working local links; source-only destinations
// point to the exact release tag instead of breaking in the installer layout.
async function rewriteDistributionLinks(file, sourceFile) {
  const content = await readFile(file, 'utf8');
  const links = [...content.matchAll(/(!?\[[^\]]*\]\()(<[^>]*>|[^)\s]+)(\))/gu)];
  let result = '', offset = 0;
  for (const match of links) {
    const target = match[2].replace(/^<|>$/gu, '');
    let replacement = match[0];
    if (!/^(?:[a-z][a-z\d+.-]*:|\/|#)/iu.test(target)) {
      const suffix = /[?#].*$/u.exec(target)?.[0] || '';
      const pathPart = target.slice(0, target.length - suffix.length);
      let decoded;
      try { decoded = decodeURIComponent(pathPart); } catch { decoded = pathPart; }
      try { await stat(resolve(dirname(file), decoded)); }
      catch {
        const original = resolve(dirname(sourceFile), decoded);
        if (original.startsWith(root + '/')) {
          try {
            const entry = await stat(original);
            const repositoryPath = relative(root, original).split('/').map(encodeURIComponent).join('/');
            const destination = `https://github.com/yubowen123/AIYOUDSH/${entry.isDirectory() ? 'tree' : 'blob'}/v${version}/${repositoryPath}${suffix}`;
            replacement = match[1] + destination + match[3];
          } catch { /* Leave unresolved author-provided links visible for review. */ }
        }
      }
    }
    result += content.slice(offset, match.index) + replacement;
    offset = match.index + match[0].length;
  }
  await writeFile(file, result + content.slice(offset));
}
async function rewriteDocumentDirectory(directory, sourceDirectory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) await rewriteDocumentDirectory(join(directory, entry.name), join(sourceDirectory, entry.name));
    else if (entry.isFile() && entry.name.endsWith('.md')) await rewriteDistributionLinks(join(directory, entry.name), join(sourceDirectory, entry.name));
  }
}
const stage = join(root, 'dist', 'release', 'AIYOUDSH');
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
await cp(join(root, 'dist', 'addon', 'runtime'), join(stage, 'runtime'), { recursive: true });
await cp(join(root, 'addon'), join(stage, 'installer'), { recursive: true, filter: path => !path.includes('/test/') && !path.endsWith('.test.mjs') });
await cp(join(root, 'README.md'), join(stage, 'README.md'));
await cp(join(root, 'README.md'), join(stage, '使用说明.md'));
for (const name of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'THIRD_PARTY_DEPENDENCIES.json', 'docs']) {
  await cp(join(root, name), join(stage, name), { recursive: true });
}
for (const name of ['README.md', '使用说明.md', 'THIRD_PARTY_NOTICES.md']) {
  await rewriteDistributionLinks(join(stage, name), join(root, name === '使用说明.md' ? 'README.md' : name));
}
await rewriteDocumentDirectory(join(stage, 'docs'), join(root, 'docs'));
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
await rewriteDistributionLinks(join(notices, 'THIRD_PARTY_NOTICES.md'), join(root, 'THIRD_PARTY_NOTICES.md'));
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
for (const name of ['README.md', 'package.json', 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'THIRD_PARTY_DEPENDENCIES.json', 'CHANGELOG.md', 'CONTRIBUTING.md', 'docs', '.github', '.gitignore', '.gitattributes', 'addon', 'installer-ui', 'aiyou', 'test']) await cp(join(root, name), join(sourceStage, name), { recursive: true, filter: path => !path.includes('/.verification') && !(name === 'installer-ui' && path.includes('/build/')) });
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
await mkdir(join(sourceStage, 'scripts'), { recursive: true });
for (const name of ['build-addon.mjs', 'verify-addon.mjs', 'package-addon.mjs']) await cp(join(root, 'scripts', name), join(sourceStage, 'scripts', name));
const sourceZip = join(delivery, `AIYOUDSH-v${version}-source.zip`);
await rm(sourceZip, { force: true });
const sourceArchive = spawnSync('/usr/bin/ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', sourceStage, sourceZip], { encoding: 'utf8' });
if (sourceArchive.status !== 0) throw new Error(sourceArchive.stderr);
const hashes = {};
for (const path of [zip, sourceZip]) hashes[path] = createHash('sha256').update(await readFile(path)).digest('hex');
await writeFile(join(delivery, '交付文件校验.json'), JSON.stringify({ files: Object.fromEntries(Object.entries(hashes).map(([file, digest]) => [file.split('/').at(-1), digest])), installerSignature: 'local ad-hoc', baseApplicationModified: false }, null, 2) + '\n');
console.log(JSON.stringify({ installer: zip, source: sourceZip, app, hashes }));
