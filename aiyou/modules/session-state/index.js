import { guardContext } from '../../runtime.mjs';
/**
 * Host half — per-session marks.
 *
 * L2 PORT of AIYOUcodex's tri-colour conversation marking (README: "每张对话卡片
 * 默认保持'未标记'；用户主动选择后，才用红、橙、绿三色标注'紧急且重要 / 紧急或
 * 重要 / 不紧急'。颜色状态按对话保存，清除后恢复未标记").
 *
 * Upstream stored this against Codex thread ids in its own data dir. Here the key
 * is the harness session id, which is what the sidebar slots hand to the Client
 * half, and the store lives under $DSH_HOME.
 *
 * Endpoints:
 *   GET  /aiyoucodex-dsh/session-state           all marks
 *   POST /aiyoucodex-dsh/session-state           { sessionId, mark } set or clear
 */
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
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

export const name = 'aiyou-enhancer-session-state';

const BASE = '/aiyoucodex-dsh/session-state';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STATE_FILE = join(ROOT, 'session-state.json');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

/** Upstream's three levels, plus the implicit "unmarked". */
export const MARKS = Object.freeze(['urgent-important', 'urgent-or-important', 'neither']);

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

function recordServing() {
  const now = Date.now();
  if (now - lastServingWrite < 10000) return;
  lastServingWrite = now;
  void record({ phase: 'serving' });
}

export async function readMarks() {
  try {
    const state = JSON.parse(await readFile(STATE_FILE, 'utf8'));
    const marks = state?.marks;
    if (marks && typeof marks === 'object') return marks;
  } catch {
    /* no marks yet */
  }
  return {};
}

async function writeMarks(marks) {
  await mkdir(ROOT, { recursive: true });
  await writeFile(STATE_FILE, `${JSON.stringify({ marks, at: new Date().toISOString() }, null, 2)}\n`);
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

export function apply(ctx) {
  ctx = guardContext(ctx);
  const lifecycle = () => {
    void record({ phase: 'applied' });
    return () => {
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-session-state:lifecycle');
  else lifecycle();

  if (!ctx.inject) return;
  ctx.inject(['webServer'], (webCtx) => {
    // NOTE: one path per route. Registering two handlers on the same path throws
    // and aborts the whole block (learned the hard way on the theme module), so
    // the write side lives at `${BASE}/set`.
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
          json(res, 200, { marks: await readMarks(), levels: MARKS });
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-session-state:read');

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
          const sessionId = typeof payload?.sessionId === 'string' ? payload.sessionId : '';
          const mark = typeof payload?.mark === 'string' ? payload.mark : '';
          if (!sessionId) return json(res, 400, { error: 'sessionId required' });
          if (mark && !MARKS.includes(mark)) return json(res, 400, { error: 'unknown mark' });

          const marks = { ...(await readMarks()) };
          if (!mark) delete marks[sessionId];
          else marks[sessionId] = mark;
          await writeMarks(marks);
          json(res, 200, { ok: true, marks, sessionId, mark: mark || null });
        } catch (error) {
          json(res, 400, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-session-state:write');
  });
}
