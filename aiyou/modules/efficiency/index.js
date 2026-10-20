import { guardContext } from '../../runtime.mjs';
/**
 * Host half — output efficiency (模式 / 默认 Skills / 上下文预算) with inheritance.
 *
 * THE DELIVERY CHANNEL is the interesting part. Upstream injects its preference
 * through Codex hooks and reports a "real load receipt". On DSH the sanctioned
 * equivalent is the system-prompt registry:
 *
 *     ctx.systemPrompt.section({ name, order, text })
 *
 * and `text` may be a FUNCTION (`typeof section.text === 'function' ?
 * section.text(context) : section.text`), evaluated on every assembly. That is
 * strictly better than a change-triggered hook: the section re-resolves from the
 * store on every turn, so it cannot go stale, and registering/disposing it is a
 * plain Cordis effect.
 *
 * `order` uses the centrally owned policy band — the same band as PLAN_POLICY (500)
 * and TEAM_POLICY (600) — because this is per-turn policy, not a tool schema
 * (tools start at 1000).
 *
 * Endpoints:
 *   GET  /aiyoucodex-dsh/efficiency            policies + resolved view for a scope
 *   POST /aiyoucodex-dsh/efficiency/set        write one layer's partial patch
 */
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { DEFAULT_POLICY, MODES, buildInstruction, normalizePolicy, resolvePolicy } from './policy.mjs';

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

export const name = 'aiyou-enhancer-efficiency';

const BASE = '/aiyoucodex-dsh/efficiency';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STORE_FILE = join(ROOT, 'efficiency.json');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

/** Policy band, alongside PLAN_POLICY (500) / TEAM_POLICY (600). */
const SECTION_ORDER = 700;
const SECTION_NAME = 'aiyoucodex:output-preference';

const INSTANCE = Math.random().toString(36).slice(2, 10);
let lastServingWrite = 0;

async function record(entry) {
  try {
    await mkdir(STATUS_DIR, { recursive: true });
    const previous = await readFile(STATUS_FILE, 'utf8').then(JSON.parse).catch(() => ({}));
    await writeStatusAtomic(STATUS_FILE, `${JSON.stringify({ instance: INSTANCE, ...previous, ...entry, pid: process.pid, at: new Date().toISOString() }, null, 2)}\n`);
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

export async function readStore() {
  try {
    const value = JSON.parse(await readFile(STORE_FILE, 'utf8'));
    return { global: value?.global ?? {}, projects: value?.projects ?? {}, sessions: value?.sessions ?? {} };
  } catch {
    return { global: {}, projects: {}, sessions: {} };
  }
}

async function writeStore(store) {
  await mkdir(ROOT, { recursive: true });
  await writeFile(STORE_FILE, `${JSON.stringify({ ...store, at: new Date().toISOString() }, null, 2)}\n`);
}

/**
 * Resolve the effective policy. Layers fold global → project → session, which is
 * upstream's order minus the per-turn user request (that one is enforced by the
 * model itself from the conversation, not by a stored setting).
 */
export function resolveFromStore(store, { project, session } = {}) {
  const layers = [['global', store.global ?? {}]];
  if (project && store.projects?.[project]) layers.push([`project:${project}`, store.projects[project]]);
  if (session && store.sessions?.[session]) layers.push([`session:${session}`, store.sessions[session]]);
  return resolvePolicy(layers);
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

/**
 * Best-effort read of whatever identity the assembly hands a section's text
 * function. The exact shape is not documented for third-party plugins, so this
 * probes common locations and records the observed keys once, rather than
 * assuming and silently resolving the wrong scope.
 */
let contextShapeSamples = 0;

function sessionFromContext(context) {
  // Sample several assemblies: the first one after a reload may be a background
  // assembly (title generation, subagent) with no session, which would otherwise
  // make "no session identity is available" look true when it is not.
  if (contextShapeSamples < 6) {
    contextShapeSamples += 1;
    void record({
      phase: 'serving',
      contextProbe: (() => {
        try {
          return {
            sample: contextShapeSamples,
            keys: context && typeof context === 'object' ? Object.keys(context).slice(0, 40) : typeof context,
            sessionish: context && typeof context === 'object'
              ? Object.fromEntries(Object.entries(context).filter(([key]) => /session|agent|turn/i.test(key)).map(([key, value]) => [key, typeof value]))
              : null,
            // One level deeper: `agent` is an object, and the session identity a
            // section can see lives somewhere under it.
            agent: (() => {
              try {
                const agent = context?.agent;
                if (!agent || typeof agent !== 'object') return typeof agent;
                const out = {};
                for (const [key, value] of Object.entries(agent)) {
                  out[key] = value && typeof value === 'object' ? `object:${Object.keys(value).slice(0, 12).join(',')}` : typeof value;
                }
                return out;
              } catch {
                return 'agent probe failed';
              }
            })(),
            // Resolve the actual identity values, not just their types: the
            // session id is what "current conversation" scope keys on.
            identity: (() => {
              try {
                const agent = context?.agent ?? {};
                const session = agent.session ?? {};
                const header = session.header ?? {};
                return {
                  agentId: typeof agent.id === 'string' ? agent.id.slice(0, 60) : typeof agent.id,
                  headerKeys: header && typeof header === 'object' ? Object.keys(header).slice(0, 24) : typeof header,
                  headerId: typeof header.id === 'string' ? header.id.slice(0, 60) : typeof header.id,
                  headerSessionId: typeof header.sessionId === 'string' ? header.sessionId.slice(0, 60) : typeof header.sessionId,
                  headerCwd: typeof header.cwd === 'string' ? header.cwd.slice(0, 90) : typeof header.cwd,
                  sessionKeys: session && typeof session === 'object' ? Object.keys(session).slice(0, 20) : typeof session,
                };
              } catch (error) {
                return `identity probe failed: ${String(error?.message ?? error)}`;
              }
            })(),
            scope: (() => {
              try {
                return context?.scope && typeof context.scope === 'object'
                  ? Object.fromEntries(Object.entries(context.scope).map(([key, value]) => [key, value && typeof value === 'object' ? `object:${Object.keys(value).slice(0, 10).join(',')}` : typeof value]))
                  : typeof context?.scope;
              } catch {
                return 'scope probe failed';
              }
            })(),
          };
        } catch {
          return 'probe failed';
        }
      })(),
    });
  }
  try {
    // MEASURED, not guessed. A section's text function receives
    // { agent, scope, signal }, and for a real turn:
    //   context.agent.id                    === the DSH session id ("session-…")
    //   context.agent.session.header.id     === the same id
    //   context.agent.session.header.cwd    === the project directory
    // Background assemblies (title generation, subagents) hand a null agent, which
    // is why this must be read defensively rather than assumed present.
    const agent = context?.agent ?? {};
    const header = agent.session?.header ?? {};
    const candidates = [
      agent.id,
      header.id,
      header.sessionId,
      context?.sessionId,
      context?.session?.id,
    ];
    return candidates.find((value) => typeof value === 'string' && value) ?? '';
  } catch {
    return '';
  }
}

function projectFromContext(context) {
  try {
    // Same probe result: the project scope keys on the session's cwd.
    return String(context?.agent?.session?.header?.cwd ?? context?.cwd ?? process.cwd());
  } catch {
    return process.cwd();
  }
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  const lifecycle = () => {
    void record({ phase: 'applied' });
    return () => {
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-efficiency:lifecycle');
  else lifecycle();

  // ---- delivery: a dynamic system-prompt section ----
  if (ctx.inject) {
    ctx.inject(['systemPrompt'], (promptCtx) => {
      promptCtx.effect(() => promptCtx.systemPrompt.section({
        name: SECTION_NAME,
        order: SECTION_ORDER,
        // Re-resolved on EVERY assembly, so the preference can never go stale.
        text: (context) => {
          try {
            const store = storeCache ?? { global: {}, projects: {}, sessions: {} };
            const resolved = resolveFromStore(store, {
              project: projectFromContext(context),
              session: sessionFromContext(context),
            });
            return buildInstruction(resolved.policy);
          } catch (error) {
            void record({ phase: 'serving', sectionError: String(error?.message ?? error) });
            return '';
          }
        },
      }), 'aiyoucodex-efficiency:prompt-section');
    });
  }

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
          const project = url.searchParams.get('project') ?? '';
          const session = url.searchParams.get('session') ?? '';
          const store = await readStore();
          storeCache = store;
          const resolved = resolveFromStore(store, { project, session });
          json(res, 200, {
            defaults: DEFAULT_POLICY,
            modes: MODES,
            layers: { global: store.global ?? {}, project: project ? store.projects?.[project] ?? {} : {}, session: session ? store.sessions?.[session] ?? {} : {} },
            resolved: resolved.policy,
            appliedBy: resolved.appliedBy,
            instruction: buildInstruction(resolved.policy),
            section: { name: SECTION_NAME, order: SECTION_ORDER },
          });
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-efficiency:read');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/set`,
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
          const scope = String(payload?.scope ?? '');
          const id = String(payload?.id ?? '');
          const patch = normalizePolicy(payload?.patch ?? {});
          const store = await readStore();
          if (scope === 'global') {
            store.global = { ...(store.global ?? {}), ...patch };
          } else if (scope === 'project') {
            if (!id) return json(res, 400, { error: 'project id required' });
            store.projects = { ...(store.projects ?? {}), [id]: { ...(store.projects?.[id] ?? {}), ...patch } };
          } else if (scope === 'session') {
            if (!id) return json(res, 400, { error: 'session id required' });
            store.sessions = { ...(store.sessions ?? {}), [id]: { ...(store.sessions?.[id] ?? {}), ...patch } };
          } else if (scope === 'reset') {
            if (payload?.layer === 'project' && id) delete store.projects?.[id];
            else if (payload?.layer === 'session' && id) delete store.sessions?.[id];
            else if (payload?.layer === 'global') store.global = {};
            else return json(res, 400, { error: 'unknown layer to reset' });
          } else {
            return json(res, 400, { error: 'scope must be global | project | session | reset' });
          }
          await writeStore(store);
          storeCache = store;
          const resolved = resolveFromStore(store, {
            project: scope === 'project' ? id : String(payload?.project ?? ''),
            session: scope === 'session' ? id : String(payload?.session ?? ''),
          });
          json(res, 200, {
            ok: true,
            layers: { global: store.global ?? {}, projects: store.projects ?? {}, sessions: store.sessions ?? {} },
            resolved: resolved.policy,
            appliedBy: resolved.appliedBy,
            instruction: buildInstruction(resolved.policy),
          });
        } catch (error) {
          json(res, 400, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-efficiency:write');
  });
}

/**
 * Cached store so the per-assembly section text does not hit the disk on every
 * turn; the HTTP handlers refresh it after every write.
 */
let storeCache = null;
void readStore().then((value) => {
  storeCache = value;
}).catch(() => {
  storeCache = { global: {}, projects: {}, sessions: {} };
});
