import { cp, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';

// Distribution documents retain working local links; source-only destinations
// point to the exact release tag instead of breaking in the installer layout.
export async function rewriteDistributionLinks(file, sourceFile, { root, version }) {
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
        if (original.startsWith(root + sep)) {
          try {
            const entry = await stat(original);
            const repositoryPath = relative(root, original).split(sep).map(encodeURIComponent).join('/');
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
export async function rewriteDocumentDirectory(directory, sourceDirectory, options) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) await rewriteDocumentDirectory(join(directory, entry.name), join(sourceDirectory, entry.name), options);
    else if (entry.isFile() && entry.name.endsWith('.md')) await rewriteDistributionLinks(join(directory, entry.name), join(sourceDirectory, entry.name), options);
  }
}

export async function prepareDistributionDocuments(root, stage, version) {
  await cp(join(root, 'README.md'), join(stage, 'README.md'));
  await cp(join(root, 'README.md'), join(stage, '使用说明.md'));
  for (const name of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'THIRD_PARTY_DEPENDENCIES.json', 'docs']) {
    await cp(join(root, name), join(stage, name), { recursive: true });
  }
  for (const name of ['README.md', '使用说明.md', 'THIRD_PARTY_NOTICES.md']) {
    await rewriteDistributionLinks(join(stage, name), join(root, name === '使用说明.md' ? 'README.md' : name), { root, version });
  }
  await rewriteDocumentDirectory(join(stage, 'docs'), join(root, 'docs'), { root, version });
}
