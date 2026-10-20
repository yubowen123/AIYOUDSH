import { guardContext } from '../../runtime.mjs';
/**
 * Host half — reset / release monitor, plus the DSH-native pressure signal.
 *
 * SCOPE, STATED PLAINLY. Upstream watches one X account for Codex quota-reset
 * announcements. That feed is reachable from this machine and stays the shipped
 * default, so the original purpose is preserved rather than replaced. What is
 * ADDED is the signal DSH actually owns: its own context pressure and token use,
 * which is the same *shape* of thing (a periodically sampled number with warning
 * thresholds and an honest "cannot confirm" state) without pretending OpenAI's
 * quota rules apply here.
 *
 * Upstream's disciplines that are kept, because they are the valuable part:
 *   · local-only classification, no model calls, no chat wakeups, no token spend
 *   · >=70 evidence score to surface anything; 70-89 yellow, >=90 red
 *   · a countdown only from a verified exact time; on arrival it says "已到时 · 待核验"
 *   · delivery is NEVER inferred from an announcement — only a verifiable reset-count
 *     increment would show it, and since this harness exposes no such counter the
 *     panel says 待核验 rather than inventing one
 *   · interval 1..10080 minutes, exponential backoff to 60 min on failure
 */
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { classifyPost } from './classify.mjs';
import { DEFAULT_FEEDS, collectFeed, dedupePosts, parseFeed } from './feed.mjs';

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

export const name = 'aiyou-enhancer-reset-monitor';

const BASE = '/aiyoucodex-dsh/reset-monitor';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STORE_FILE = join(ROOT, 'reset-monitor.json');
const PROJ_DIR = join(DSH_HOME, 'storages', 'session_projcache', 'sessions');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

const MAX_EVENTS = 200;
const BACKOFF_MAX_MS = 60 * 60 * 1000;

const INSTANCE = Math.random().toString(36).slice(2, 10);

const DEFAULT_STATE = Object.freeze({
  schemaVersion: 1,
  enabled: false,
  intervalMinutes: 15,
  feeds: DEFAULT_FEEDS,
});

async function record(entry) {
  try {
    await mkdir(STATUS_DIR, { recursive: true });
    const previous = await readFile(STATUS_FILE, 'utf8').then(JSON.parse).catch(() => ({}));
    await writeStatusAtomic(STATUS_FILE, `${JSON.stringify({ instance: INSTANCE, ...previous, ...entry, pid: process.pid, at: new Date().toISOString() }, null, 2)}\n`);
  } catch {
    /* diagnostics are best-effort */
  }
}

export async function readState() {
  try {
    const raw = JSON.parse(await readFile(STORE_FILE, 'utf8'));
    return {
      ...DEFAULT_STATE,
      ...raw,
      feeds: Array.isArray(raw?.feeds) && raw.feeds.length ? raw.feeds : DEFAULT_FEEDS,
    };
  } catch {
    return { ...DEFAULT_STATE, cache: {}, events: [], seen: [], lastRunAt: null, failures: 0 };
  }
}

async function writeState(state) {
  await mkdir(ROOT, { recursive: true });
  await writeFile(STORE_FILE, `${JSON.stringify({ ...state, updatedAt: new Date().toISOString() }, null, 2)}\n`);
}

/** Interval bounds from upstream: 1..10080 minutes. */
export function clampInterval(value) {
  const minutes = Math.trunc(Number(value));
  if (!Number.isFinite(minutes)) return null;
  if (minutes < 1 || minutes > 10080) return null;
  return minutes;
}

/**
 * The DSH-native signal. Same shape as an announcement source (sampled number,
 * thresholds, explicit unknown) but read from this harness's own projection cache.
 */
export async function readPressure() {
  try {
    const { readdir, stat } = await import('node:fs/promises');
    const entries = await readdir(PROJ_DIR);
    let newest = null;
    for (const entry of entries) {
      if (!entry.endsWith('.json')) continue;
      const info = await stat(join(PROJ_DIR, entry));
      if (!newest || info.mtimeMs > newest.mtimeMs) newest = { file: entry, mtimeMs: info.mtimeMs };
    }
    if (!newest) return { available: false, reason: '没有会话投影缓存' };
    const raw = JSON.parse(await readFile(join(PROJ_DIR, newest.file), 'utf8'));
    const rows = raw?.record?.rows ?? {};
    const pressure = rows.contextPressure?.val ?? null;
    const usage = rows.tokenUsage?.val ?? null;
    if (!pressure) return { available: false, reason: '投影里没有 contextPressure 行' };
    const ratio = pressure.contextWindow > 0 ? pressure.pressureTokens / pressure.contextWindow : null;
    const percent = ratio === null ? null : Math.round(ratio * 1000) / 10;
    return {
      available: true,
      session: newest.file.replace(/\.json$/u, ''),
      sampledAt: new Date(newest.mtimeMs).toISOString(),
      surfaceTokens: pressure.surfaceTokens ?? null,
      contextWindow: pressure.contextWindow ?? null,
      pressureTokens: pressure.pressureTokens ?? null,
      percent,
      // Bands are this harness's own thresholds, not OpenAI's. Stated as such.
      band: percent === null ? 'unknown' : percent >= 90 ? 'red' : percent >= 70 ? 'yellow' : 'ok',
      totals: usage?.totals ?? null,
      note: '阈值是本套件自定的，与 OpenAI 额度规则无关；这里只报告本机实测数字。',
    };
  } catch (error) {
    return { available: false, reason: String(error?.message ?? error) };
  }
}

/** One scan: fetch every feed, classify, keep the surfaced events. */
export async function scan(state) {
  const seen = new Set(state.seen ?? []);
  const cache = { ...(state.cache ?? {}) };
  const events = [...(state.events ?? [])];
  const knownKeys = new Set(events.map((event) => event.key));
  const results = [];

  for (const feed of state.feeds) {
    try {
      const outcome = await collectFeed(feed, { cache: cache[feed.id] ?? null });
      if (outcome.cache) cache[feed.id] = outcome.cache;
      if (!outcome.ok) {
        results.push({ feedId: feed.id, ok: false, error: outcome.error, status: outcome.status });
        continue;
      }
      if (outcome.notModified) {
        results.push({ feedId: feed.id, ok: true, notModified: true, new: 0 });
        continue;
      }
      const fresh = dedupePosts(outcome.posts, seen);
      let surfaced = 0;
      for (const post of fresh) {
        const classified = classifyPost(post, { knownEvents: [...knownKeys], feedKind: feed.kind });
        if (!classified) continue;
        events.unshift(classified);
        knownKeys.add(classified.key);
        if (classified.surfaced) surfaced += 1;
      }
      results.push({ feedId: feed.id, ok: true, notModified: false, fetched: outcome.posts.length, new: fresh.length, surfaced });
    } catch (error) {
      results.push({ feedId: feed.id, ok: false, error: String(error?.message ?? error) });
    }
  }

  const trimmed = events.slice(0, MAX_EVENTS);
  return {
    state: {
      ...state,
      cache,
      seen: [...seen].slice(-2000),
      events: trimmed,
      lastRunAt: Date.now(),
      lastResults: results,
      // Back off only when NOTHING could be fetched. One dead secondary feed must
      // not throttle a healthy primary one.
      failures: results.some((entry) => entry.ok) ? 0 : (state.failures ?? 0) + 1,
    },
    results,
  };
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

function readBody(req, limit = 64 * 1024) {
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
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolvePromise({});
        return;
      }
      try {
        resolvePromise(JSON.parse(raw));
      } catch {
        rejectPromise(new Error('invalid JSON body'));
      }
    });
    req.on('error', rejectPromise);
  });
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  let timer = null;
  let running = false;

  const schedule = async () => {
    const state = await readState();
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (!state.enabled) {
      void record({ phase: 'paused' });
      return;
    }
    // Back off on repeated failure, capped at one hour (upstream's behaviour).
    const base = clampInterval(state.intervalMinutes) ?? 15;
    const failures = state.failures ?? 0;
    const delay = Math.min(BACKOFF_MAX_MS, base * 60_000 * 2 ** Math.min(failures, 6));
    // Never scanned yet: do it shortly after start rather than making the user wait
    // a full interval to see whether the feature works at all.
    const firstDelay = state.lastRunAt ? delay : 5000;
    timer = setTimeout(async () => {
      if (!running) {
        running = true;
        try {
          const current = await readState();
          const { state: next, results } = await scan(current);
          await writeState(next);
          void record({ phase: 'serving', lastRunAt: next.lastRunAt, failures: next.failures, results });
        } catch (error) {
          void record({ phase: 'serving', scanError: String(error?.message ?? error) });
        } finally {
          running = false;
        }
      }
      void schedule();
    }, firstDelay);
    if (typeof timer.unref === 'function') timer.unref();
    void record({ phase: 'scheduled', nextInMs: firstDelay, intervalMinutes: base, lastRunAt: state.lastRunAt ?? null });
  };

  const lifecycle = () => {
    void record({ phase: 'applied' });
    void schedule();
    return () => {
      if (timer) clearTimeout(timer);
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-reset-monitor:lifecycle');
  else lifecycle();

  if (!ctx.inject) return;
  ctx.inject(['webServer'], (webCtx) => {
    webCtx.effect(() => webCtx.webServer.register({
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
          const state = await readState();
          const pressure = await readPressure();
          const events = (state.events ?? []).filter((event) => event.surfaced);
          json(res, 200, {
            settings: {
              enabled: state.enabled,
              intervalMinutes: state.intervalMinutes,
              bounds: { min: 1, max: 10080 },
              feeds: state.feeds,
            },
            health: {
              lastRunAt: state.lastRunAt ?? null,
              lastResults: state.lastResults ?? [],
              failures: state.failures ?? 0,
              running,
              scheduled: Boolean(timer),
            },
            events,
            historyCount: (state.events ?? []).length,
            pressure,
            // Stated for every reader: the panel must not imply OpenAI rules apply here.
            semantics: {
              evidence: '置信度衡量证据质量（来源、原文、时间依据、新鲜度），不是"一定会重置"的概率。',
              threshold: '低于 70 不展示；70–89 黄框；90 及以上红框。',
              delivery: '到账需可核验的重置次数增量。本套件读不到该计数，因此一律显示待核验。',
              countdown: '仅对已核验的精确时间倒计时；到时显示"已到时 · 待核验"，不声称额度已到账。',
            },
          });
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-reset-monitor:read');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/settings`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        if (req.method !== 'POST') return json(res, 405, { error: 'POST only' });
        try {
          const payload = await readBody(req);
          const state = await readState();
          if (payload?.enabled !== undefined) state.enabled = Boolean(payload.enabled);
          if (payload?.intervalMinutes !== undefined) {
            const minutes = clampInterval(payload.intervalMinutes);
            if (minutes === null) return json(res, 400, { error: 'intervalMinutes must be an integer 1..10080' });
            state.intervalMinutes = minutes;
          }
          await writeState(state);
          await schedule();
          json(res, 200, { ok: true, settings: { enabled: state.enabled, intervalMinutes: state.intervalMinutes } });
        } catch (error) {
          json(res, 400, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-reset-monitor:settings');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/check`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        if (req.method !== 'POST') return json(res, 405, { error: 'POST only' });
        try {
          const state = await readState();
          const { state: next, results } = await scan(state);
          await writeState(next);
          json(res, 200, { ok: true, results, surfaced: (next.events ?? []).filter((event) => event.surfaced).length });
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-reset-monitor:check');
  });
}
