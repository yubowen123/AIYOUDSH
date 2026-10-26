import { guardContext } from '../../runtime.mjs';
/**
 * Host half — task context (目标 / 进度 / 下一步).
 *
 * COUPLING LADDER:
 *   L0  `context-draft.mjs` is upstream's file copied verbatim. It is pure text
 *       analysis with no Codex coupling, so nothing about it needed changing.
 *   L2  the DATA SOURCE is swapped. Upstream extracts from Codex thread history
 *       (`~/.codex/sessions/**` + its own context store). Here the history comes
 *       from DSH's own session projection cache, which is richer and already
 *       structured:
 *
 *         rows.title.val             session title
 *         rows.titleInput.val.first  the first user prompt
 *         rows.goal.val.current.goal the persisted goal (objective/phase/rounds)
 *         rows.turnOutline.val.turns [{turn, seq, prompt, response}]
 *         rows.todos.val / plan.val  recorded todos and plan state
 *
 *       Because DSH records these itself, every field can cite the exact
 *       projection row it came from rather than being guessed, which is what the
 *       panel's provenance badges show.
 *
 * Endpoints:
 *   GET  /aiyoucodex-dsh/session-context?session=<id>   build a draft
 *   POST /aiyoucodex-dsh/session-context/save           persist a confirmed draft
 */
import { mkdir, readdir, readFile, stat, writeFile, rename, rm } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { buildContextDraft } from './context-draft.mjs';

/**
 * Status files are written with temp + rename.
 *
 * Two concurrent record() calls used to read-modify-write the same path, and one
 * write landing under another produced INVALID JSON on disk — observed as
 * aiyoucodex-reset-monitor.json ending with a fragment (`tes": 15 }`) after a
 * complete object, which broke every reader of that file. rename() is atomic on
 * POSIX, so a reader sees either the old file or the new one, never a partial one.
 */
async function writeStatusAtomic(file, content) {
  const temporary = `${file}.${process.pid}.${Math.random().toString(36).slice(2, 8)}.tmp`;
  await writeFile(temporary, content);
  await rename(temporary, file);
}

export const name = 'aiyou-enhancer-session-context';

const BASE = '/aiyoucodex-dsh/session-context';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const PROJECTION_DIR = join(DSH_HOME, 'storages', 'session_projcache', 'sessions');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const SAVED_DIR = join(ROOT, 'session-context');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

/** Upstream's own history bound, reused so the draft is comparable. */
const MAX_MESSAGES = 40;

const INSTANCE = Math.random().toString(36).slice(2, 10);
let lastServingWrite = 0;

async function record(entry) {
  try {
    await mkdir(STATUS_DIR, { recursive: true });
    await writeStatusAtomic(STATUS_FILE, `${JSON.stringify({ instance: INSTANCE, ...entry, pid: process.pid, at: new Date().toISOString() }, null, 2)}\n`);
  } catch {
    /* diagnostics are best-effort */
  }
}

function recordServing(extra) {
  const now = Date.now();
  if (now - lastServingWrite < 10000) return;
  lastServingWrite = now;
  void record({ phase: 'serving', ...extra });
}

function cors(res) {
  // Same-origin host route; the Desktop IPC forwarder preserves the host policy.
  res.setHeader('access-control-allow-methods', 'GET,POST,OPTIONS');
  res.setHeader('access-control-allow-headers', 'content-type');
  res.setHeader('cache-control', 'no-store');
}

function json(res, status, value) {
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

/** Projection rows are stored as `{ ver, seq, val }`; unwrap the value. */
function rowValue(rows, key) {
  const row = rows?.[key];
  if (!row || typeof row !== 'object') return null;
  return 'val' in row ? row.val : row;
}

/**
 * Newest session by projection-cache mtime.
 *
 * The right-pane tab slot does not hand a plugin the current session id: the
 * official panels open by resource ADDRESS with a `canOpen` predicate, which a
 * third-party plugin cannot participate in. So when the caller does not name a
 * session, fall back to the most recently written projection cache — the same
 * strategy the usage module uses, and the honest definition of "the session in
 * front of the user" available to a plugin.
 */
export async function newestSessionId() {
  try {
    const entries = await readdir(PROJECTION_DIR);
    let best = null;
    for (const entry of entries) {
      if (!entry.endsWith('.json')) continue;
      try {
        const info = await stat(join(PROJECTION_DIR, entry));
        if (!best || info.mtimeMs > best.mtimeMs) {
          best = { id: entry.replace(/\.json$/u, ''), mtimeMs: info.mtimeMs };
        }
      } catch {
        /* skip unreadable entry */
      }
    }
    return best?.id ?? null;
  } catch {
    return null;
  }
}

export async function readProjection(sessionId) {
  const file = join(PROJECTION_DIR, `${sessionId}.json`);
  const raw = JSON.parse(await readFile(file, 'utf8'));
  const rows = raw?.record?.rows ?? {};
  return { rows, version: raw?.version ?? null };
}

/** Turn the projection's turn outline into the `{role, text}` history upstream expects. */
function historyFromProjection(rows) {
  const outline = rowValue(rows, 'turnOutline');
  const turns = Array.isArray(outline?.turns) ? outline.turns : [];
  const messages = [];
  for (const turn of turns) {
    if (typeof turn?.prompt === 'string' && turn.prompt.trim()) {
      messages.push({ role: 'user', text: turn.prompt, source: `turnOutline.turn${turn.turn}.prompt` });
    }
    if (typeof turn?.response === 'string' && turn.response.trim()) {
      messages.push({ role: 'assistant', text: turn.response, source: `turnOutline.turn${turn.turn}.response` });
    }
  }
  // Upstream bounds the history it reasons over; keep the most recent window.
  return messages.slice(-MAX_MESSAGES);
}

async function readSaved(sessionId) {
  try {
    return JSON.parse(await readFile(join(SAVED_DIR, `${sessionId}.json`), 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return {};
    throw error;
  }
}

const savedWrites = new Map();
function serializeSaved(sessionId, operation) {
  const next = (savedWrites.get(sessionId) || Promise.resolve()).then(operation);
  const settled = next.then(() => {}, () => {});
  savedWrites.set(sessionId, settled);
  void settled.then(() => { if (savedWrites.get(sessionId) === settled) savedWrites.delete(sessionId); });
  return next;
}
async function writeSaved(sessionId, payload) {
  await mkdir(SAVED_DIR, { recursive: true });
  const file = join(SAVED_DIR, `${sessionId}.json`), temporary = `${file}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, `${JSON.stringify(payload, null, 2)}\n`, { mode: 0o600, flag: 'wx' });
    await rename(temporary, file);
  } finally {
    await rm(temporary, { force: true }).catch(() => {});
  }
}

/**
 * Facts DSH records itself. These are AUTHORITATIVE — they are not extracted from
 * prose, so the panel marks them as recorded rather than unverified.
 */
function recordedFacts(rows) {
  const title = rowValue(rows, 'title');
  const titleInput = rowValue(rows, 'titleInput');
  const goal = rowValue(rows, 'goal');
  const plan = rowValue(rows, 'plan');
  const todos = rowValue(rows, 'todos');
  const stats = rowValue(rows, 'sessionStats');
  return {
    title: typeof title?.val === 'string' ? title.val : (typeof title === 'string' ? title : ''),
    firstPrompt: titleInput?.val?.first?.text ?? '',
    promptCount: titleInput?.val?.count ?? null,
    goal: goal?.current?.goal ?? null,
    plan: plan ?? null,
    todos: todos ?? null,
    stats: stats ?? null,
  };
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  const lifecycle = () => {
    void record({ phase: 'applied' });
    return () => {
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-session-context:lifecycle');
  else lifecycle();

  if (!ctx.inject) return;
  ctx.inject(['webServer'], (webCtx) => {
    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: BASE,
      handler: async (req, res) => {
        recordServing();
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        try {
          const url = new URL(req.url ?? BASE, 'http://127.0.0.1');
          let sessionId = url.searchParams.get('session') ?? '';
          let sessionSource = 'param';
          if (!sessionId || sessionId === 'current') {
            sessionId = (await newestSessionId()) ?? '';
            sessionSource = 'newest-activity';
          }
          if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/u.test(sessionId)) {
            return json(res, 400, { error: 'valid session id required (none could be inferred)' });
          }
          const { rows, version } = await readProjection(sessionId);
          const facts = recordedFacts(rows);
          const history = historyFromProjection(rows);
          const saved = await readSaved(sessionId);

          // Upstream's extractor, unchanged. `threadId` doubles as the storage key.
          const draft = buildContextDraft({
            threadId: sessionId,
            title: facts.title,
            history: history.map(({ role, text }) => ({ role, text })),
            savedContext: url.searchParams.get('fresh') === '1' ? {} : saved?.context
              ? { ...saved.context, version: saved.version ?? 0 }
              : {},
          });

          json(res, 200, {
            sessionId,
            sessionSource,
            projectionVersion: version,
            facts,
            historyCount: history.length,
            // Which projection row each recorded fact came from — the panel's badges.
            recordedSources: [
              facts.title ? { field: 'title', row: 'title', seq: rows.title?.seq ?? null } : null,
              facts.firstPrompt ? { field: 'firstPrompt', row: 'titleInput', seq: rows.titleInput?.seq ?? null } : null,
              facts.goal ? { field: 'goal', row: 'goal', seq: rows.goal?.seq ?? null } : null,
              facts.plan ? { field: 'plan', row: 'plan', seq: rows.plan?.seq ?? null } : null,
            ].filter(Boolean),
            historySources: history.slice(-8).map((message) => ({ role: message.role, source: message.source })),
            draft,
            saved: saved?.context ?? null,
            savedVersion: saved?.version ?? 0,
            savedAt: saved?.at ?? null,
          });
        } catch (error) {
          const message = String(error?.message ?? error);
          const missing = /ENOENT/u.test(message);
          json(res, missing ? 404 : 500, {
            error: missing ? 'no projection cache for this session yet' : message,
          });
        }
      },
    }), 'aiyoucodex-session-context:read');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/save`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        if (req.method !== 'POST') return json(res, 405, { error: 'POST only' });
        try {
          const payload = await readBody(req).catch(error => { error.status = 400; throw error; });
          const sessionId = String(payload?.session ?? '');
          if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/u.test(sessionId)) {
            return json(res, 400, { error: 'valid session id required' });
          }
          const context = payload?.context ?? {};
          // Reuse upstream's validator so a saved draft obeys the same bounds the
          // extractor produces (per-field clamps, 8192-char ceiling).
          const { normalizeEfficiencyContext } = await import('./efficiency-store.mjs');
          const normalized = normalizeEfficiencyContext({
            goal: String(context.goal ?? '').slice(0, 600),
            progress: String(context.progress ?? '').slice(0, 1200),
            nextStep: String(context.nextStep ?? '').slice(0, 600),
            agreements: Array.isArray(context.agreements) ? context.agreements.slice(0, 12) : [],
            references: Array.isArray(context.references) ? context.references.slice(0, 12) : [],
          });
          // Older panels already send `version`; keep it as the CAS precondition.
          // A versionless writer cannot safely replace another window's record.
          const expectedVersion = payload?.expectedVersion ?? payload?.version;
          if (expectedVersion === undefined) return json(res, 428, { error: '保存需要读取版本，请刷新任务上下文后重试。', code: 'CONTEXT_VERSION_REQUIRED' });
          if (!Number.isSafeInteger(expectedVersion) || expectedVersion < 0 || (payload.expectedVersion !== undefined && payload.version !== undefined && payload.expectedVersion !== payload.version)) return json(res, 400, { error: '任务上下文版本无效，请刷新后重试。', code: 'CONTEXT_VERSION_INVALID' });
          const result = await serializeSaved(sessionId, async () => {
            const saved = await readSaved(sessionId), currentVersion = saved.version ?? 0;
            if (!Number.isSafeInteger(currentVersion) || currentVersion < 0 || currentVersion === Number.MAX_SAFE_INTEGER) throw Object.assign(new Error('已保存的任务上下文版本无效，原记录已保留。'), { status: 500, code: 'CONTEXT_SAVED_VERSION_INVALID' });
            if (expectedVersion !== currentVersion) throw Object.assign(new Error('此会话已在其他窗口更新；本地草稿未保存，请刷新核对最新记录。'), { status: 409, code: 'CONTEXT_VERSION_CONFLICT', currentVersion });
            const version = currentVersion + 1;
            await writeSaved(sessionId, { context: normalized, version, at: new Date().toISOString() });
            return { ok: true, context: normalized, version };
          });
          json(res, 200, result);
        } catch (error) {
          json(res, error.status || 500, { error: String(error?.message ?? error), ...(error.code ? { code: error.code } : {}), ...(Number.isSafeInteger(error.currentVersion) ? { currentVersion: error.currentVersion } : {}) });
        }
      },
    }), 'aiyoucodex-session-context:save');
  });
}
