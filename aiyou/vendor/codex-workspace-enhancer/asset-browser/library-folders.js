import { promises as fs, constants } from 'node:fs';
import path from 'node:path';
import { isIgnoredAssetPath, yieldToEventLoop } from './asset-index-update-utils.js';

const badRequest = message => Object.assign(new Error(message), { statusCode: 400 });
const forbidden = message => Object.assign(new Error(message), { statusCode: 403 });
export function containsFolder(root, target) {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  return relative === '' || relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
export const libraryFolderId = absolute => 'dir_' + Buffer.from(path.resolve(absolute), 'utf8').toString('base64url');

// IDs are selectors, never grants. Every decoded path is checked against this
// project's configured roots and their real locations before touching the disk.
export async function resolveLibraryFolder(project, id, { io = fs } = {}) {
  if (!id) return null;
  let candidate;
  try {
    if (typeof id !== 'string' || !/^dir_[A-Za-z0-9_-]+$/.test(id)) throw Error();
    candidate = Buffer.from(id.slice(4), 'base64url').toString('utf8');
    if (!path.isAbsolute(candidate) || candidate.includes('\0') || path.resolve(candidate) !== candidate || libraryFolderId(candidate) !== id) throw Error();
  } catch { throw badRequest('文件夹引用无效，请重新选择文件夹'); }
  const roots = (project?.folders || []).map(root => path.resolve(root)).filter(root => containsFolder(root, candidate));
  if (!roots.length) throw forbidden('仅能查看当前素材库已关联文件夹');
  if (roots.every(root => path.relative(root, candidate).split(path.sep).some(part => part.startsWith('.')) || isIgnoredAssetPath(candidate, root))) throw forbidden('该目录不在素材扫描范围内');
  let actual, stats;
  try { actual = await io.realpath(candidate); stats = await io.lstat(candidate); }
  catch (error) { throw Object.assign(new Error(`文件夹不可访问：${error.code || 'UNKNOWN'}`), { statusCode: error.code === 'ENOENT' ? 404 : 403 }); }
  // Legacy configurations may explicitly authorize a root alias. Preserve it,
  // while refusing every nested symlink encountered inside that root.
  if (stats.isSymbolicLink() && roots.includes(candidate)) stats = await io.stat(candidate);
  if (!stats.isDirectory() || stats.isSymbolicLink()) throw forbidden('不能将符号链接或文件作为素材目录');
  for (const root of roots) {
    const realRoot = await io.realpath(root).catch(() => '');
    if (realRoot && actual === path.resolve(realRoot, path.relative(root, candidate))) return { id, path: candidate, realPath: actual };
  }
  throw forbidden('文件夹符号链接越过扫描目录');
}

export async function validateLinkedLibraryFolder(value, { io = fs } = {}) {
  if (typeof value !== 'string' || !value.trim() || value.includes('\0') || !path.isAbsolute(value.trim())) throw badRequest('请选择已有文件夹，或输入完整的绝对路径');
  const requested = path.resolve(value.trim());
  try {
    const absolute = await io.realpath(requested);
    if (!(await io.stat(absolute)).isDirectory()) throw badRequest('关联路径必须是文件夹');
    await io.access(absolute, constants.R_OK | constants.X_OK);
    // access() alone does not detect every unavailable filesystem/volume.
    await io.readdir(absolute, { withFileTypes: true });
    return absolute;
  } catch (error) {
    if (error.statusCode) throw error;
    throw Object.assign(new Error(`无法关联文件夹（${error.code || 'UNKNOWN'}），请检查路径和读取权限`), { statusCode: error.code === 'EACCES' || error.code === 'EPERM' ? 403 : 400 });
  }
}

export function filterLibraryFolderAssets(assets, folder) {
  return folder ? assets.filter(asset => typeof asset.sourcePath === 'string' && containsFolder(folder.path, asset.sourcePath)) : assets;
}

export async function listLibraryFolderTree(project, assets, { io = fs, limit = 5000, maxDepth = 64 } = {}) {
  const nodes = new Map(), warnings = [], roots = [...new Set(project.folders.map(root => path.resolve(root)))];
  let truncated = false, visited = 0;
  const warn = (absolute, code) => warnings.push({ path: absolute, code, message: `文件夹不可访问（${code}），请检查权限或重新关联` });
  for (const root of roots) {
    const rootId = libraryFolderId(root);
    const stack = [{ absolute: root, parentId: null, relativePath: '', depth: 0 }];
    let realRoot;
    try { realRoot = await io.realpath(root); }
    catch (error) { warn(root, error.code || 'UNKNOWN'); }
    while (stack.length) {
      const current = stack.pop(), id = libraryFolderId(current.absolute), isRoot = current.absolute === root;
      if (nodes.has(id)) continue;
      if (nodes.size >= limit) { truncated = true; break; }
      const node = { id, parentId: current.parentId, rootId, path: current.absolute, name: path.basename(current.absolute) || current.absolute, relativePath: current.relativePath, depth: current.depth, isRoot, count: 0, directCount: 0, readable: true };
      nodes.set(id, node);
      let entries;
      try {
        const actual = await io.realpath(current.absolute);
        if (!realRoot || actual !== path.resolve(realRoot, current.relativePath)) throw Object.assign(Error(), { code: 'SYMLINK' });
        entries = await io.readdir(current.absolute, { withFileTypes: true });
      } catch (error) { node.readable = false; if (realRoot) warn(current.absolute, error.code || 'UNKNOWN'); continue; }
      const directories = entries.filter(entry => entry.isDirectory() && !entry.isSymbolicLink() && !entry.name.startsWith('.') && !isIgnoredAssetPath(path.join(current.absolute, entry.name), root))
        .sort((a, b) => b.name.localeCompare(a.name, 'zh-CN', { numeric: true }));
      if (current.depth >= maxDepth) { if (directories.length) truncated = true; continue; }
      for (const entry of directories) stack.push({ absolute: path.join(current.absolute, entry.name), parentId: id, relativePath: path.join(current.relativePath, entry.name), depth: current.depth + 1 });
      if (++visited % 64 === 0) await yieldToEventLoop();
    }
  }
  // Overlapping configured roots remain independent selectable roots, with a
  // single row per physical path and children under the most specific root.
  // Counts still include the complete subtree of every enclosing directory.
  const bySpecificity = [...roots].sort((a, b) => b.length - a.length);
  for (const node of nodes.values()) {
    const owner = bySpecificity.find(root => containsFolder(root, node.path));
    const relative = path.relative(owner, node.path);
    Object.assign(node, { rootId: libraryFolderId(owner), isRoot: !relative, parentId: relative ? libraryFolderId(path.dirname(node.path)) : null, relativePath: relative, depth: relative ? relative.split(path.sep).length : 0 });
  }
  // Count each indexed original once per directory, even for overlapping roots.
  const counted = new Set();
  for (const asset of assets || []) {
    if (typeof asset.sourcePath !== 'string') continue;
    const absolute = path.resolve(asset.sourcePath), key = String(asset.id || absolute);
    if (counted.has(key)) continue;
    counted.add(key);
    let directory = path.dirname(absolute), direct = true;
    while (true) {
      const node = nodes.get(libraryFolderId(directory));
      if (node) { node.count++; if (direct) node.directCount++; }
      const parent = path.dirname(directory); if (parent === directory) break;
      directory = parent; direct = false;
    }
  }
  const order = new Map(roots.map((root, index) => [libraryFolderId(root), index]));
  const folders = [...nodes.values()].sort((a, b) => order.get(a.rootId) - order.get(b.rootId) || a.relativePath.localeCompare(b.relativePath, 'zh-CN', { numeric: true }));
  return { folders, truncated, warnings };
}
