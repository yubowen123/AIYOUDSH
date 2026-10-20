import { guardContext } from '../../runtime.mjs';
/**
 * Host half — usage / context-pressure panel for DSH.
 *
 * L2 PORT of AIYOUCODEX's usage surfaces (`lib/usage-data.mjs` +
 * `lib/preview-data.mjs` token/rate-limit readers + the "任务上下文面板" usage
 * strip). Upstream parsed Codex rollout JSONL for `token_count` and
 * `rate_limits`. Here the data source is the harness's own **session projection
 * cache**, which already publishes exactly the right projections — no log
 * folding, no model calls:
 *
 *   $DSH_HOME/storages/session_projcache/sessions/<sessionId>.json
 *     record.rows.tokenUsage        totals + last turn/step buckets
 *     record.rows.contextPressure   surfaceTokens / contextWindow / pressureTokens
 *     record.rows.contextBreakdown  per-event heuristic tokens
 *     record.rows.sessionStats      turns, steps, llmMs, toolMs, ttftMs, decodeMs
 *     record.rows.turnOutline       per-turn prompt/response excerpts
 *     record.rows.title             session title
 *
 * What upstream showed and what replaces it:
 *   "真实剩余比例与重置时间"  -> contextPressure ratio against contextWindow
 *                               (DSH exposes no quota-reset clock; the honest
 *                               substitute is context headroom, not a fake ETA)
 *   "只显示 Codex 已记录的 Token" -> same contract: only recorded numbers are
 *                               reported, and unknown values stay null
 */
import { readFile, readdir, stat, rename } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

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

export const name = 'aiyou-enhancer-usage';

const BASE = '/aiyoucodex-dsh/usage';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const CACHE_DIR = join(DSH_HOME, 'storages', 'session_projcache', 'sessions');
const STATUS_FILE = join(DSH_HOME, 'aiyou-enhancer', 'status', `${name}.json`);

/** Bounded so a huge session history cannot stall the panel. */
const LIMITS = { maxSessions: 200, maxTitleChars: 120, maxExcerptChars: 160 };

/**
 * Per-load instance id. On an HMR reload the replaced instance's disposer can run
 * *after* the new instance applied, and a blind write would then bury the live
 * entry as "disposed" (observed while developing this module). A disposer from a
 * stale instance must never overwrite an entry owned by a newer one.
 */
const INSTANCE = Math.random().toString(36).slice(2, 10);

/**
 * Liveness is recorded by the route handler, not by lifecycle events.
 *
 * Lifecycle phases proved unreliable as ground truth: after a reload the
 * replaced instance's disposer can write last, and a route registered through
 * `ctx.inject(['webServer'])` keeps serving regardless (observed: status said
 * "disposed" while the endpoint answered 200). A record written by the code path
 * that actually serves a request cannot be stale in that way. Throttled so a
 * polling panel does not churn the file.
 */
let lastServingWrite = 0;
function recordServing() {
  const now = Date.now();
  if (now - lastServingWrite < 10000) return;
  lastServingWrite = now;
  void record({ phase: 'serving' });
}

async function record(entry) {
  try {
    const { mkdir, writeFile } = await import('node:fs/promises');
    await mkdir(join(DSH_HOME, 'aiyou-enhancer', 'status'), { recursive: true });
    // One file per module: no shared mutable state, so a concurrent writer in
    // another plugin cannot clobber this entry (see packages/core).
    const payload = { instance: INSTANCE, ...entry, pid: process.pid, at: new Date().toISOString() };
    await writeStatusAtomic(STATUS_FILE, `${JSON.stringify(payload, null, 2)}\n`);
  } catch {
    /* diagnostics are best-effort */
  }
}

const num = (value) => (typeof value === 'number' && Number.isFinite(value) ? value : null);
const clip = (value, max) => {
  const text = typeof value === 'string' ? value.trim() : '';
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
};

function readProjection(filePath) {
  return readFile(filePath, 'utf8').then((text) => {
    const parsed = JSON.parse(text);
    return parsed?.record ?? null;
  });
}

function projectSession(sessionId, record, fileStat) {
  const rows = record?.rows ?? {};
  const val = (key) => rows?.[key]?.val ?? null;

  const usage = val('tokenUsage');
  const pressure = val('contextPressure');
  const stats = val('sessionStats');
  const outline = val('turnOutline');

  const contextWindow = num(pressure?.contextWindow);
  const pressureTokens = num(pressure?.pressureTokens);
  const usedPercent =
    contextWindow && pressureTokens !== null && contextWindow > 0
      ? Math.min(100, Math.round((pressureTokens / contextWindow) * 1000) / 10)
      : null;

  const turns = Array.isArray(outline?.turns) ? outline.turns : [];

  return {
    id: sessionId,
    title: clip(val('title'), LIMITS.maxTitleChars) || '(未命名会话)',
    cwd: record?.identity?.cwd ?? null,
    updatedAt: fileStat ? new Date(fileStat.mtimeMs).toISOString() : null,
    tokens: {
      uncachedInput: num(usage?.totals?.uncachedInputTokens),
      output: num(usage?.totals?.outputTokens),
      cacheRead: num(usage?.totals?.cacheReadTokens),
      cacheWrite: num(usage?.totals?.cacheWriteTokens),
      lastTurn: num(usage?.last?.turn),
      lastStep: num(usage?.last?.step),
    },
    context: { contextWindow, pressureTokens, surfaceTokens: num(pressure?.surfaceTokens), usedPercent },
    stats: {
      turns: num(stats?.turns),
      steps: num(stats?.steps),
      llmMs: num(stats?.llmMs),
      toolMs: num(stats?.toolMs),
      ttftMs: num(stats?.ttftMs),
      decodeMs: num(stats?.decodeMs),
      decodeTokens: num(stats?.decodeTokens),
    },
    turnCount: turns.length,
    recentTurns: turns.slice(-5).map((turn) => ({
      turn: num(turn?.turn),
      prompt: clip(turn?.prompt, LIMITS.maxExcerptChars),
      response: clip(turn?.response, LIMITS.maxExcerptChars),
    })),
  };
}

/**
 * Recency must come from the session LOG, not the projection cache. The cache is
 * written with a throttled write-behind checkpoint, so its mtime lags badly
 * (verified in-app: the cache ranked a 23:55 session above the live 00:29 one,
 * while the log mtimes ordered them correctly).
 *
 * Layout: $DSH_HOME/sessions/<projectKey>/<sessionId>/session.v<N>.jsonl[.zstd]
 */
async function sessionLogTimes() {
  const times = new Map();
  const root = join(DSH_HOME, 'sessions');
  let projects = [];
  try {
    projects = await readdir(root, { withFileTypes: true });
  } catch {
    return times;
  }
  for (const project of projects) {
    if (!project.isDirectory()) continue;
    const projectDir = join(root, project.name);
    let sessionDirs = [];
    try {
      sessionDirs = await readdir(projectDir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const session of sessionDirs) {
      if (!session.isDirectory()) continue;
      const sessionDir = join(projectDir, session.name);
      let files = [];
      try {
        files = await readdir(sessionDir);
      } catch {
        continue;
      }
      const log = files.find((file) => /^session\.v\d+\.jsonl(?:\.zstd)?$/u.test(file));
      if (!log) continue;
      try {
        times.set(session.name, (await stat(join(sessionDir, log))).mtimeMs);
      } catch {
        /* skip unreadable */
      }
    }
  }
  return times;
}

export async function buildUsageSnapshot() {
  let dirents = [];
  try {
    dirents = await readdir(CACHE_DIR, { withFileTypes: true });
  } catch {
    return { generatedAt: new Date().toISOString(), currentSessionId: null, sessions: [], aggregate: null, cacheDir: CACHE_DIR, available: false };
  }

  const logTimes = await sessionLogTimes();

  const files = dirents
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .slice(0, LIMITS.maxSessions);

  const sessions = [];
  for (const entry of files) {
    const filePath = join(CACHE_DIR, entry.name);
    try {
      const [record, fileStat] = await Promise.all([readProjection(filePath), stat(filePath)]);
      if (!record) continue;
      const sessionId = entry.name.replace(/\.json$/u, '');
      const projected = projectSession(sessionId, record, fileStat);
      // Prefer the log's mtime; the cache mtime is only a fallback.
      const logTime = logTimes.get(sessionId);
      if (typeof logTime === 'number') projected.updatedAt = new Date(logTime).toISOString();
      sessions.push(projected);
    } catch {
      /* a cache file being rewritten mid-read is normal; skip it */
    }
  }

  sessions.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));

  // The harness exports DSH_SESSION_ID to agent shells, but the desktop host
  // process does NOT carry it (verified in-app: null there while the local shell
  // had a value). Fall back to the session LOG with the newest mtime -- that is
  // genuinely the session being written -- and report which signal was used so
  // the UI can label it honestly instead of claiming knowledge it lacks.
  const envSessionId = process.env.DSH_SESSION_ID ?? null;
  const currentSessionId = envSessionId ?? sessions[0]?.id ?? null;
  const currentSessionIdSource = envSessionId ? 'env' : sessions[0] ? 'newest-activity' : null;

  const aggregate = sessions.reduce(
    (acc, session) => ({
      sessions: acc.sessions + 1,
      uncachedInput: acc.uncachedInput + (session.tokens.uncachedInput ?? 0),
      output: acc.output + (session.tokens.output ?? 0),
      cacheRead: acc.cacheRead + (session.tokens.cacheRead ?? 0),
      turns: acc.turns + (session.stats.turns ?? 0),
      steps: acc.steps + (session.stats.steps ?? 0),
      llmMs: acc.llmMs + (session.stats.llmMs ?? 0),
      toolMs: acc.toolMs + (session.stats.toolMs ?? 0),
    }),
    { sessions: 0, uncachedInput: 0, output: 0, cacheRead: 0, turns: 0, steps: 0, llmMs: 0, toolMs: 0 },
  );

  return {
    generatedAt: new Date().toISOString(),
    available: true,
    cacheDir: CACHE_DIR,
    currentSessionId,
    currentSessionIdSource,
    sessions,
    aggregate,
  };
}

function cors(res) {
  // Same-origin host route; the Desktop IPC forwarder preserves the host policy.
  res.setHeader('access-control-allow-methods', 'GET,OPTIONS');
  res.setHeader('access-control-allow-headers', 'content-type');
  res.setHeader('cache-control', 'no-store');
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  const lifecycle = () => {
    void record({ phase: 'applied' });
    return () => {
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-usage:lifecycle');
  else lifecycle();

  if (!ctx.inject) return;
  ctx.inject(['webServer'], (webCtx) => {
    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: BASE,
      handler: async (req, res) => {
        recordServing();
        cors(res);
        if (req.method === 'OPTIONS') {
          res.writeHead(204);
          res.end();
          return;
        }
        try {
          const snapshot = await buildUsageSnapshot();
          res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(snapshot));
        } catch (error) {
          res.writeHead(500, { 'content-type': 'application/json' });
          res.end(JSON.stringify({ error: String(error?.message ?? error) }));
        }
      },
    }), 'aiyoucodex-usage:snapshot-route');
  });
}
