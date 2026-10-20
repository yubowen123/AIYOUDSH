import { guardContext } from '../../runtime.mjs';
/**
 * Host half — AIYOUcodex Skills panel for DSH.
 *
 * Serves the skill catalog, classification and custom-organization state to the
 * Client half over the suite's host<->client channel (a route on the harness web
 * server; a third-party plugin cannot import @deepseek-ai/* so Typert Remote is
 * unavailable — see PORT-NOTES.md).
 *
 * Custom groups and manual assignments persist to
 * ~/.dsh/aiyoucodex-dsh/skills-organization.json, matching upstream's contract:
 * manual classification always wins over the local automatic rules, and moving a
 * skill never touches the skill's own files.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';

import { scanSkills, frontmatterValue } from './catalog.js';
import { countsByCategory, presentSkillOrganization, validateGroupEdit } from './groups.js';

export const name = 'aiyou-enhancer-skills';

const BASE = '/aiyoucodex-dsh/skills';
const STATE_DIR = join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'aiyou-enhancer');
const STATE_FILE = join(STATE_DIR, 'skills-organization.json');
const STATUS_FILE = join(STATE_DIR, 'status', `${name}.json`);

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return fallback;
  }
}

async function writeJson(file, value) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

async function record(entry) {
  try {
    // One file per module: no shared mutable state to race on (see packages/core).
    await writeJson(STATUS_FILE, { ...entry, pid: process.pid, at: new Date().toISOString() });
  } catch {
    /* diagnostics are best-effort */
  }
}

async function readState() {
  const state = await readJson(STATE_FILE, {});
  return {
    version: Number.isInteger(state?.version) ? state.version : 0,
    groups: Array.isArray(state?.groups) ? state.groups : [],
    assignments: state?.assignments && typeof state.assignments === 'object' ? state.assignments : {},
    favorites: Array.isArray(state?.favorites) ? state.favorites : [],
  };
}

async function writeState(next) {
  await writeJson(STATE_FILE, {
    version: next.version,
    groups: next.groups,
    assignments: next.assignments,
    favorites: next.favorites,
  });
}

function cors(res) {
  // Same-origin host route; the Desktop IPC forwarder preserves the host policy.
  res.setHeader('access-control-allow-methods', 'GET,POST,OPTIONS');
  res.setHeader('access-control-allow-headers', 'content-type');
  res.setHeader('cache-control', 'no-store');
}

function sendJson(res, status, value) {
  cors(res);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
}

function readBody(req, limit = 256 * 1024) {
  return new Promise((resolvePromise, rejectPromise) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        rejectPromise(new Error('payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8');
      if (!text) return resolvePromise({});
      try {
        resolvePromise(JSON.parse(text));
      } catch {
        rejectPromise(new Error('invalid JSON body'));
      }
    });
    req.on('error', rejectPromise);
  });
}

async function buildSnapshot() {
  const state = await readState();
  const { skills, truncated, roots } = await scanSkills({ cwd: process.cwd() });
  const presented = presentSkillOrganization(skills, state);
  return {
    ...presented,
    counts: countsByCategory(presented),
    stats: { total: skills.length, truncated, roots },
  };
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  if (typeof ctx.effect === 'function') {
    ctx.effect(() => {
      void record({ phase: 'applied' });
      return () => {
        void record({ phase: 'disposed' });
      };
    }, 'aiyoucodex-skills:lifecycle');
  } else {
    void record({ phase: 'applied' });
  }

  if (!ctx.inject) return;
  ctx.inject(['webServer'], (webCtx) => {
    const register = (label, route) =>
      webCtx.effect(() => webCtx.webServer.register(route), `aiyoucodex-skills:${label}`);

    // Catalog snapshot (list view).
    register('list', {
      kind: 'exact',
      path: BASE,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        try {
          const url = new URL(req.url ?? BASE, 'http://127.0.0.1');
          const snapshot = await buildSnapshot();
          if (url.searchParams.get('refresh') === '1') void record({ phase: 'refreshed', total: snapshot.stats.total });
          sendJson(res, 200, snapshot);
        } catch (error) {
          sendJson(res, 500, { error: String(error?.message ?? error) });
        }
      },
    });

    // Skill body, read on demand only (never during listing).
    register('detail', {
      kind: 'exact',
      path: `${BASE}/detail`,
      handler: async (req, res) => {
        try {
          const url = new URL(req.url ?? BASE, 'http://127.0.0.1');
          const id = url.searchParams.get('id') ?? '';
          const snapshot = await buildSnapshot();
          const skill = snapshot.catalog.find((entry) => entry.id === id);
          if (!skill) return sendJson(res, 404, { error: 'unknown skill' });
          const body = await readFile(skill.skillFile, 'utf8').catch(() => '');
          const instructions = body.replace(/^---[\s\S]*?---\s*/u, '').trim();
          sendJson(res, 200, {
            id: skill.id,
            name: skill.name,
            title: skill.title,
            description: skill.description,
            whenToUse: skill.whenToUse,
            categoryId: skill.categoryId,
            automaticCategoryId: skill.automaticCategoryId,
            classificationSource: skill.classificationSource,
            source: skill.source,
            path: skill.path,
            skillFile: skill.skillFile,
            instructions,
          });
        } catch (error) {
          sendJson(res, 500, { error: String(error?.message ?? error) });
        }
      },
    });

    // Manual assignment: the only write path. Never touches skill files.
    register('assign', {
      kind: 'exact',
      path: `${BASE}/assign`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        if (req.method !== 'POST') return sendJson(res, 405, { error: 'POST only' });
        try {
          const payload = await readBody(req);
          const skillId = typeof payload?.skillId === 'string' ? payload.skillId : '';
          const categoryId = typeof payload?.categoryId === 'string' ? payload.categoryId : '';
          if (!skillId) return sendJson(res, 400, { error: 'skillId required' });

          const state = await readState();
          const assignments = { ...state.assignments };
          if (categoryId === 'auto' || categoryId === '') delete assignments[skillId];
          else assignments[skillId] = categoryId;

          const next = { ...state, version: state.version + 1, assignments };
          await writeState(next);
          sendJson(res, 200, { ok: true, version: next.version, assignments });
        } catch (error) {
          sendJson(res, 400, { error: String(error?.message ?? error) });
        }
      },
    });

    // Custom categories: create / rename / delete. Purely local metadata; skill
    // files are never touched, matching upstream's contract.
    register('groups', {
      kind: 'exact',
      path: `${BASE}/groups`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        if (req.method !== 'POST') return sendJson(res, 405, { error: 'POST only' });
        try {
          const payload = await readBody(req);
          const action = String(payload?.action ?? '');
          if (!['create', 'rename', 'delete'].includes(action)) {
            return sendJson(res, 400, { error: 'action must be create|rename|delete' });
          }
          const state = await readState();
          const problem = validateGroupEdit(state, {
            action,
            id: typeof payload?.id === 'string' ? payload.id : '',
            label: typeof payload?.label === 'string' ? payload.label : '',
          });
          if (problem) return sendJson(res, 400, { error: problem });

          let groups = [...state.groups];
          if (action === 'create') {
            const label = String(payload.label).trim().slice(0, 40);
            const id = `custom:${label}`;
            const keywords = Array.isArray(payload?.keywords)
              ? payload.keywords.filter((item) => typeof item === 'string').map((item) => item.trim()).filter(Boolean).slice(0, 64)
              : [];
            groups.push({ id, label, keywords });
          } else if (action === 'rename') {
            groups = groups.map((group) => (group.id === payload.id
              ? { ...group, label: String(payload.label).trim().slice(0, 40) }
              : group));
          } else {
            groups = groups.filter((group) => group.id !== payload.id);
          }

          const next = { ...state, version: state.version + 1, groups };
          await writeState(next);
          sendJson(res, 200, { ok: true, version: next.version, groups });
        } catch (error) {
          sendJson(res, 400, { error: String(error?.message ?? error) });
        }
      },
    });

    // Favourites ("常用"). Stored as skill ids; unknown ids are ignored on read.
    register('favorite', {
      kind: 'exact',
      path: `${BASE}/favorite`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        if (req.method !== 'POST') return sendJson(res, 405, { error: 'POST only' });
        try {
          const payload = await readBody(req);
          const skillId = typeof payload?.skillId === 'string' ? payload.skillId : '';
          if (!skillId) return sendJson(res, 400, { error: 'skillId required' });
          const state = await readState();
          const favorites = new Set(state.favorites);
          if (payload?.favorite === false) favorites.delete(skillId);
          else favorites.add(skillId);
          const next = { ...state, version: state.version + 1, favorites: [...favorites] };
          await writeState(next);
          sendJson(res, 200, { ok: true, version: next.version, favorites: next.favorites });
        } catch (error) {
          sendJson(res, 400, { error: String(error?.message ?? error) });
        }
      },
    });
  });
}

export { frontmatterValue };
