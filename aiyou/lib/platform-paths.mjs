import { posix, win32 } from 'node:path';

const apiFor = platform => platform === 'win32' ? win32 : posix;

/** Fully qualified native directories only; C:foo and \foo depend on the process drive. */
export function absoluteDirectory(value, platform = process.platform) {
  if (typeof value !== 'string' || !value || value.includes('\0')) return '';
  const api = apiFor(platform);
  if (!api.isAbsolute(value)) return '';
  if (platform === 'win32') {
    const windows = value.replaceAll('/', '\\');
    if (!/^[A-Za-z]:\\/u.test(windows) && !/^\\\\[^\\/:?*]+\\[^\\/:?*]+(?:\\|$)/u.test(windows)) return '';
    return api.normalize(windows);
  }
  return api.normalize(value);
}

export function sameDirectory(left, right, platform = process.platform) {
  const a = absoluteDirectory(left, platform), b = absoluteDirectory(right, platform);
  if (!a || !b) return false;
  const canonical = value => value.length > apiFor(platform).parse(value).root.length ? value.replace(/[\\/]+$/u, '') : value;
  return platform === 'win32' ? canonical(a).toLowerCase() === canonical(b).toLowerCase() : canonical(a) === canonical(b);
}

export function directChildOf(root, target, platform = process.platform) {
  const base = absoluteDirectory(root, platform), child = absoluteDirectory(target, platform);
  if (!base || !child) return false;
  const api = apiFor(platform), rel = api.relative(base, child);
  return Boolean(rel) && rel !== '..' && !api.isAbsolute(rel) && !rel.includes(api.sep);
}

export function sessionDirectory(root, sessionId, platform = process.platform) {
  if (typeof sessionId !== 'string' || !/^[A-Za-z0-9_-]{1,200}$/u.test(sessionId) || ['__proto__', 'constructor', 'prototype'].includes(sessionId)) throw new Error('a safe session id is required');
  const base = absoluteDirectory(root, platform);
  if (!base) throw new Error('an absolute directory path is required');
  const target = apiFor(platform).join(base, sessionId);
  if (!directChildOf(base, target, platform)) throw new Error('session directory escapes its root');
  return target;
}
