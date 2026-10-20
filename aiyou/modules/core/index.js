import { guardContext } from '../../runtime.mjs';
/**
 * Shared suite infrastructure. Host-only; no Client half.
 *
 * WHY THIS PACKAGE EXISTS (two real defects it fixes):
 *
 *  1. The client self-check channel used to live in the asset-console package.
 *     Rewriting that package silently removed the `/aiyoucodex-dsh/ping` route,
 *     and every other module's self-check started failing with 404. Shared
 *     infrastructure must not be owned by a feature module.
 *
 *  2. Every host half used to read-modify-write ONE status.json. Concurrent
 *     writers clobbered each other and entries vanished (observed: after a
 *     reload the file held only one module). Status is now one file per module,
 *     so there is no shared mutable state to race on.
 *
 * Endpoints:
 *   GET /aiyoucodex-dsh/ping    client self-check; records what the Client half
 *                               reported. This is the only ground truth for
 *                               client-side loading on Desktop, where bundles
 *                               arrive over IPC and /plugins answers 404.
 *   GET /aiyoucodex-dsh/status  aggregate of every module's status file.
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const name = 'aiyou-enhancer-core';

const BASE = '/aiyoucodex-dsh';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STATUS_DIR = join(ROOT, 'status');
const OWN_FILE = join(STATUS_DIR, 'core.json');

const INSTANCE = Math.random().toString(36).slice(2, 10);

async function writeOwn(entry) {
  try {
    await mkdir(STATUS_DIR, { recursive: true });
    await writeFile(OWN_FILE, `${JSON.stringify({ instance: INSTANCE, ...entry, pid: process.pid, at: new Date().toISOString() }, null, 2)}\n`);
  } catch {
    /* diagnostics are best-effort */
  }
}

/** Read every module's own status file. No shared file, so nothing to clobber. */
export async function readStatus() {
  const out = {};
  let entries = [];
  try {
    entries = await readdir(STATUS_DIR, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    try {
      out[entry.name.replace(/\.json$/u, '')] = JSON.parse(await readFile(join(STATUS_DIR, entry.name), 'utf8'));
    } catch {
      /* a file being rewritten mid-read is normal */
    }
  }
  return out;
}

function json(res, status, value) {
  // Same-origin host route; the Desktop IPC forwarder preserves the host policy.
  res.setHeader('access-control-allow-methods', 'GET,OPTIONS');
  res.setHeader('access-control-allow-headers', 'content-type');
  res.setHeader('cache-control', 'no-store');
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  const lifecycle = () => {
    void writeOwn({ phase: 'applied' });
    return () => {
      void writeOwn({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-core:lifecycle');
  else lifecycle();

  if (!ctx.inject) return;
  ctx.inject(['webServer'], (webCtx) => {
    const register = (label, route) =>
      webCtx.effect(() => webCtx.webServer.register(route), `aiyoucodex-core:${label}`);

    register('ping', {
      kind: 'exact',
      path: `${BASE}/ping`,
      handler: async (req, res) => {
        const url = new URL(req.url ?? `${BASE}/ping`, 'http://127.0.0.1');
        let report;
        const raw = url.searchParams.get('report');
        if (raw) {
          try {
            report = JSON.parse(raw);
          } catch {
            report = { parseError: true, raw: String(raw).slice(0, 400) };
          }
        }
        const source = url.searchParams.get('from') ?? 'unknown';
        const plugin = typeof report?.plugin === 'string' ? report.plugin.replace(/[^a-z0-9-]/giu, '').slice(0, 40) : 'unknown';
        try {
          await mkdir(STATUS_DIR, { recursive: true });
          await writeFile(
            join(STATUS_DIR, `client-${plugin}.json`),
            `${JSON.stringify({ plugin, from: source, userAgent: String(req.headers['user-agent'] ?? '').slice(0, 60), ...(report ? { report } : {}), at: new Date().toISOString() }, null, 2)}\n`,
          );
        } catch {
          /* best-effort */
        }
        json(res, 200, { ok: true });
      },
    });

    register('status', {
      kind: 'exact',
      path: `${BASE}/status`,
      handler: async (req, res) => {
        void writeOwn({ phase: 'serving' });
        json(res, 200, { modules: await readStatus() });
      },
    });
  });
}
