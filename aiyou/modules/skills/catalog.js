/**
 * Skill discovery for the DSH panel.
 *
 * L2 PORT — logic adapted from AIYOUCODEX `lib/skill-catalog.mjs` (MIT);
 * the *data source* is replaced. Upstream scanned Codex roots
 * (`~/.codex/skills`, `~/.agents/skills`, `<cwd>/.agents/skills`). Here the
 * roots follow the harness's own documented discovery order
 * (`@deepseek-ai/dsh-skill-filesystem` "Roots and priority"):
 *
 *   rank 100  <projectRoot>/.dsh/skills      (project-dsh)
 *   rank 200  <projectRoot>/.agents/skills   (project-agents)
 *   rank 400  <dshHome>/skills               (user-dsh)
 *   rank 500  <agentsHome>/skills            (user-agents)
 *
 * Kept from upstream: metadata-only reads (bounded prefix, never the whole
 * body), realpath dedupe, priority-ordered first-wins, and bounded traversal
 * so a linked plugin tree cannot run away.
 *
 * DSH also accepts a flat `<name>.md` at a root's top level and deliberately
 * does NOT discover nested `**\/SKILL.md`; that is why the walk below only looks
 * for `SKILL.md` exactly one level down from each root.
 */
import { createHash } from 'node:crypto';
import { open, readFile, readdir, realpath, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { basename, dirname, join } from 'node:path';

const LIMITS = Object.freeze({
  maxMetadataBytes: 64 * 1024,
  maxSkills: 2000,
  maxEntries: 20000,
  maxDepth: 3,
});

function unquote(value) {
  const text = String(value || '').trim();
  if (text.startsWith('"') && text.endsWith('"')) {
    try {
      return JSON.parse(text);
    } catch {
      return text.slice(1, -1);
    }
  }
  return text.startsWith("'") && text.endsWith("'") ? text.slice(1, -1).replaceAll("''", "'") : text;
}

/** Ported verbatim from upstream: bounded YAML-frontmatter scalar reader. */
export function frontmatterValue(source, key) {
  const block =
    String(source || '')
      .replace(/^\uFEFF/u, '')
      .match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/u)?.[1] || '';
  const match = block.match(new RegExp(`^${key}:[ \\t]*(.*)$`, 'mu'));
  if (!match) return '';
  const value = match[1].trim();
  if (/^[>|][-+]?$/u.test(value)) {
    const remainder = block.slice(match.index + match[0].length);
    return (
      remainder
        .match(/^(?:\r?\n[ \t]+[^\n]*)+/u)?.[0]
        ?.split(/\r?\n/u)
        .map((line) => line.trim())
        .filter(Boolean)
        .join(' ') || ''
    );
  }
  return unquote(value);
}

async function metadataPrefix(filePath, maxBytes) {
  let handle;
  try {
    if (!(await stat(filePath)).isFile()) return '';
    handle = await open(filePath, 'r');
    if (!(await handle.stat()).isFile()) return '';
    const buffer = Buffer.alloc(maxBytes);
    const { bytesRead } = await handle.read(buffer, 0, maxBytes, 0);
    return buffer.subarray(0, bytesRead).toString('utf8');
  } catch {
    return '';
  } finally {
    await handle?.close();
  }
}

async function workspacePaths(dshHome) {
  const storeFile = join(dshHome, 'storages', 'workspace.json');
  try {
    const parsed = JSON.parse(await readFile(storeFile, 'utf8'));
    const workspaces = parsed?.tables?.workspaces;
    if (!workspaces || typeof workspaces !== 'object') return [];
    return [...new Set(
      Object.values(workspaces)
        .map((record) => (typeof record?.path === 'string' ? record.path.trim() : ''))
        .filter(Boolean),
    )];
  } catch {
    return [];
  }
}

export async function skillRoots({ cwd = process.cwd(), home = homedir(), dshHome, agentsHome } = {}) {
  const resolvedDshHome = dshHome || process.env.DSH_HOME || join(home, '.dsh');
  const roots = [];

  const bases = await workspacePaths(resolvedDshHome);
  let rank = 100;
  for (const base of bases.length ? bases : [cwd]) {
    roots.push({ path: join(base, '.dsh', 'skills'), source: 'project-dsh', rank: rank++ });
    roots.push({ path: join(base, '.agents', 'skills'), source: 'project-agents', rank: rank++ });
  }

  roots.push({ path: join(resolvedDshHome, 'skills'), source: 'user-dsh', rank: 400 });
  roots.push({
    path: join(agentsHome || process.env.DSH_AGENTS_HOME || join(resolvedDshHome, 'agents'), 'skills'),
    source: 'user-agents',
    rank: 500,
  });
  return roots;
}

async function readSkill(skillFile, root) {
  let canonicalFile;
  try {
    canonicalFile = await realpath(skillFile);
    if (!(await stat(canonicalFile)).isFile()) return null;
  } catch {
    return null;
  }
  const source = await metadataPrefix(canonicalFile, LIMITS.maxMetadataBytes);
  if (!source) return null;
  const directory = dirname(canonicalFile);
  const name = frontmatterValue(source, 'name') || basename(directory);
  const description = frontmatterValue(source, 'description') || '打开查看 Skill 详情';
  const whenToUse = frontmatterValue(source, 'whenToUse');
  return {
    id: `skill:${createHash('sha256').update(canonicalFile).digest('hex').slice(0, 16)}`,
    name,
    title: name,
    description,
    whenToUse,
    path: directory,
    skillFile: canonicalFile,
    source: root.source,
    sourceRoot: root.path,
    rank: root.rank,
  };
}

/**
 * Metadata-only discovery across the harness roots. Never reads a skill body:
 * only the bounded frontmatter prefix, so a large catalog stays cheap.
 */
export async function scanSkills(options = {}) {
  const roots = await skillRoots(options);
  const skills = new Map();
  const seenFiles = new Set();
  let entries = 0;
  let truncated = false;

  for (const root of roots.sort((a, b) => a.rank - b.rank)) {
    let dirents;
    try {
      dirents = await readdir(root.path, { withFileTypes: true });
    } catch {
      continue; // a missing root is normal, not an error
    }
    for (const entry of dirents) {
      if (entries >= LIMITS.maxEntries || skills.size >= LIMITS.maxSkills) {
        truncated = true;
        break;
      }
      entries += 1;

      // Directory bundle: <name>/SKILL.md (exactly one level, per DSH contract).
      if (entry.isDirectory() || entry.isSymbolicLink()) {
        const skillFile = join(root.path, entry.name, 'SKILL.md');
        let ok = false;
        try {
          ok = (await stat(skillFile)).isFile();
        } catch {
          ok = false;
        }
        if (!ok) continue;
        const skill = await readSkill(skillFile, root);
        if (!skill || seenFiles.has(skill.skillFile)) continue;
        seenFiles.add(skill.skillFile);
        if (!skills.has(skill.id)) skills.set(skill.id, skill);
        continue;
      }

      // Flat file: <name>.md (only at the root's top level, and not a skill body).
      if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'SKILL.md') {
        const skill = await readSkill(join(root.path, entry.name), root);
        if (!skill || seenFiles.has(skill.skillFile)) continue;
        seenFiles.add(skill.skillFile);
        if (!skills.has(skill.id)) skills.set(skill.id, skill);
      }
    }
  }

  return { skills: [...skills.values()], entries, truncated, roots: roots.map((r) => ({ path: r.path, source: r.source })) };
}
