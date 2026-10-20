import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const SUPPORTED_PLATFORMS = ['darwin-arm64', 'win32-x64'];
export async function platformBaseline(root, platform) {
  if (!SUPPORTED_PLATFORMS.includes(platform)) throw new Error('Unsupported target platform: ' + platform);
  const baseline = JSON.parse(await readFile(join(root, 'platforms', platform + '.json'), 'utf8'));
  if (baseline.schemaVersion !== 1 || baseline.platform !== platform || !/^[a-f0-9]{64}$/.test(baseline.appAsarSha256)
      || !/^[a-f0-9]{40}$/.test(baseline.buildCommit) || !Array.isArray(baseline.compatibility) || !baseline.compatibility.length)
    throw new Error('Invalid or incomplete official platform baseline');
  for (const item of baseline.compatibility) {
    if (!/^@deepseek-ai\/[a-z0-9-]+$/.test(item.package) || !/^(?:package\.json|lib\/[a-zA-Z0-9/._-]+)$/.test(item.file)
        || item.file.includes('..') || !/^[a-f0-9]{64}$/.test(item.sha256)) throw new Error('Invalid platform compatibility record');
  }
  return baseline;
}
export function rewriteThemeSelectors(source, descriptor) {
  if (descriptor.schemaVersion !== 1 || descriptor.platform !== 'win32-x64' || !descriptor.mapping || !Array.isArray(descriptor.modules))
    throw new Error('Invalid Windows native selector map');
  const evidence = new Map();
  const expectedReferences = new Set();
  for (const module of descriptor.modules) {
    if (!['chat', 'conversation', 'layout', 'sidebar-right'].some(name => module.package === '@deepseek-ai/dsh-client-ui-' + name))
      throw new Error('Selector map must only address untouched official modules');
    for (const css of module.cssModules) for (const [key, value] of Object.entries(css.exports)) {
      if (descriptor.mapping[value.mac] !== value.windows || !/^[-A-Za-z_][A-Za-z0-9_-]*$/.test(value.mac)
          || !/^[-A-Za-z_][A-Za-z0-9_-]*$/.test(value.windows)) throw new Error('Native CSS export evidence mismatch: ' + key);
      evidence.set(value.mac, value.windows);
      if (value.themeReferences) expectedReferences.add(value.mac);
    }
  }
  for (const [from, to] of Object.entries(descriptor.mapping)) if (evidence.get(from) !== to) throw new Error('Unproven native CSS selector: ' + from);
  for (const item of expectedReferences) if (!source.includes(item)) throw new Error('Theme source and selector references have drifted: ' + item);
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const candidates = [...evidence.keys()].sort((a,b) => b.length-a.length).map(escape);
  const pattern = new RegExp('(?<![A-Za-z0-9_-])(?:' + candidates.join('|') + ')(?![A-Za-z0-9_-])', 'g');
  const references = new Set();
  const compiled = source.replace(pattern, value => { references.add(value); return evidence.get(value); });
  if (!references.size || references.size < expectedReferences.size) throw new Error('Windows theme selectors were not fully applied');
  return { source: compiled, references: [...references].sort() };
}
