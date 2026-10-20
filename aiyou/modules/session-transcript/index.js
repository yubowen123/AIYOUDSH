import { guardContext } from '../../runtime.mjs';
/** Source-owned native feature. Reads bounded metadata from its stated source and reports unknowns explicitly. */
import { mkdirSync, writeFileSync } from 'node:fs';
import { mkdir, readFile, readdir, stat, lstat, writeFile, rename } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { absoluteDirectory, sessionDirectory } from '../../lib/platform-paths.mjs';
// Namespace import, NOT `import { zstdDecompressSync } from 'node:zlib'`.
// node:zlib is CommonJS: asking for a named export the runtime does not have fails
// at LINK time, which takes the whole plugin down before apply() runs — the module
// then leaves no status file and its routes never appear, with no error surface.
// Reading it off the namespace makes availability a runtime check instead.
import * as zlib from 'node:zlib';

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

const zstdDecompressSync = zlib.zstdDecompressSync;

export const name = 'aiyou-enhancer-session-transcript';

const BASE = '/aiyoucodex-dsh/session-transcript';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const SESSIONS_DIR = join(DSH_HOME, 'sessions');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

const ZSTD_MAGIC = Buffer.from([0x28, 0xb5, 0x2f, 0xfd]);
const MAX_EVENTS = 200000;

/**
 * Filtering rules, derived from the ACTUAL event shapes rather than assumed:
 *
 *   user/message      { data: { content: [{type:'text',text}], source: {kind} } }
 *   assistant/message { data: { message: { content: [{type, ...}] } } }
 *
 * Two distinctions decide whether the output is trustworthy:
 *
 *  1. Only `source.kind === 'user'` is something the user actually typed. In this
 *     session 58 user/message events exist but just 8 are `user` — the other 50 are
 *     injected context: `goal` 19, `time-context` 11, `skill-catalog` 7,
 *     `subagent-settled` 3, `agent-message` 3, `runtime-context` 2, `tool-jobs` 2,
 *     `user-approval` 1, `compact-checkpoint` 1. Counting the event type would
 *     report 58 user messages and be wrong by 7x.
 *  2. An assistant content array mixes `reasoning`, `tool-call` and `text`. Upstream
 *     says the readable copy keeps user and assistant TEXT only — never internal
 *     tool calls. Reasoning is model-internal and must not leak into a transcript
 *     either. In this session 668 assistant messages carry 668 `reasoning` parts,
 *     711 `tool-call` parts and only 349 `text` parts.
 */
const USER_KIND = 'user';

/** Collect only `{type:'text'}` parts from a content array. */
function textParts(content) {
  if (!Array.isArray(content)) return '';
  return content
    .filter((part) => part?.type === 'text' && typeof part.text === 'string')
    .map((part) => part.text)
    .join('\n')
    .trim();
}

/**
 * Read the session and return the readable flow plus honest counts of what was
 * dropped — upstream filters "system notes / tool calls / internal transport", and
 * a filter that does not report its own effect is hard to trust.
 */
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
  if (now - lastServingWrite < 8000) return;
  lastServingWrite = now;
  void record({ phase: 'serving', ...extra });
}

/** Find the session log on disk, whatever project key it is filed under. */
export async function findSessionLog(sessionId) {
  sessionDirectory(SESSIONS_DIR, sessionId);
  let projectDirs = [];
  try {
    projectDirs = await readdir(SESSIONS_DIR);
  } catch {
    return null;
  }
  for (const project of projectDirs) {
    const candidate = join(SESSIONS_DIR, project, sessionId, 'session.v4.jsonl.zstd');
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

/**
 * Every frame inflated independently; the magic delimits them.
 *
 * The file is a CONCATENATION of zstd frames — 2,749 of them in this session — not
 * one stream. `zstdDecompressSync` returns only the first frame and a streaming
 * decoder raises "Unknown frame descriptor", so the frames are located by their
 * magic and inflated one at a time.
 */
export function inflateFrames(buffer) {
  const offsets = [];
  let cursor = 0;
  for (;;) {
    cursor = buffer.indexOf(ZSTD_MAGIC, cursor);
    if (cursor < 0) break;
    offsets.push(cursor);
    cursor += 4;
  }
  if (typeof zstdDecompressSync !== 'function') {
    throw new Error(`this runtime has no zlib.zstdDecompressSync (node ${process.versions.node}); session logs cannot be read`);
  }
  const lines = [];
  let failed = 0;
  for (let index = 0; index < offsets.length; index += 1) {
    const start = offsets[index];
    const end = index + 1 < offsets.length ? offsets[index + 1] : buffer.length;
    try {
      const text = zstdDecompressSync(buffer.subarray(start, end)).toString('utf8');
      for (const line of text.split('\n')) if (line.trim()) lines.push(line);
    } catch {
      failed += 1;
    }
  }
  return { lines, frames: offsets.length, failed };
}

export async function buildTranscript(sessionId) {
  const file = await findSessionLog(sessionId);
  if (!file) throw Object.assign(new Error('session log not found'), { code: 'ENOENT' });
  const buffer = await readFile(file);
  const { lines, frames, failed } = inflateFrames(buffer);

  const counts = {};
  const messages = [];
  let index = 0;
  for (const line of lines) {
    if (messages.length >= MAX_EVENTS) break;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    const type = String(event.type ?? event.kind ?? '?');
    counts[type] = (counts[type] ?? 0) + 1;

    if (type === 'user/message') {
      const kind = String(event.data?.source?.kind ?? '(none)');
      counts[`user-source:${kind}`] = (counts[`user-source:${kind}`] ?? 0) + 1;
      // Injected context is not something the user said.
      if (kind !== USER_KIND) continue;
      const text = textParts(event.data?.content);
      if (!text) continue;
      index += 1;
      messages.push({ index, role: 'user', text, at: event.time ?? null, source: kind });
      continue;
    }
    if (type === 'assistant/message') {
      for (const part of event.data?.message?.content ?? []) {
        const partType = String(part?.type ?? '?');
        counts[`assistant-part:${partType}`] = (counts[`assistant-part:${partType}`] ?? 0) + 1;
      }
      // Text only: no reasoning, no tool calls.
      const text = textParts(event.data?.message?.content);
      if (!text) continue;
      index += 1;
      messages.push({ index, role: 'assistant', text, at: event.time ?? null, source: 'assistant' });
    }
  }

  // Three separate breakdowns, because they answer three different questions and
  // collapsing them hides the interesting one: how much of a "user message" is
  // actually the user, and how much of an assistant turn is actually prose.
  const events = {};
  const userSources = {};
  const assistantParts = {};
  for (const [key, value] of Object.entries(counts)) {
    if (key.startsWith('user-source:')) userSources[key.slice('user-source:'.length)] = value;
    else if (key.startsWith('assistant-part:')) assistantParts[key.slice('assistant-part:'.length)] = value;
    else events[key] = value;
  }
  const sortDesc = (object) => Object.fromEntries(Object.entries(object).sort((a, b) => b[1] - a[1]));

  return {
    sessionId,
    file,
    bytes: buffer.byteLength,
    frames,
    framesFailed: failed,
    lines: lines.length,
    counts,
    messages,
    kept: messages.length,
    events: sortDesc(events),
    userSources: sortDesc(userSources),
    assistantParts: sortDesc(assistantParts),
    note: '这是可读副本，不是历史恢复：DSH 的会话日志完整且与界面投影同步，没有任何消息需要"补回"。过滤掉的只是工具调用、系统项与传输事件。',
  };
}

/** Upstream's readable formats: `conversation.md` + `conversation.json`. */
export function renderMarkdown(transcript) {
  const head = [
    `# 对话副本 ${transcript.sessionId}`,
    '',
    `- 事件 ${transcript.lines} 条（zstd frame ${transcript.frames} 个，解压失败 ${transcript.framesFailed}）`,
    `- 可读消息 ${transcript.kept} 条（用户 ${transcript.messages.filter((m) => m.role === 'user').length} / 助手 ${transcript.messages.filter((m) => m.role === 'assistant').length}）`,
    `- 已过滤事件：${Object.entries(transcript.events).slice(0, 8).map(([type, count]) => `${type} ${count}`).join('、')}`,
    `- 其中 user/message 来源：${Object.entries(transcript.userSources).map(([kind, count]) => `${kind} ${count}`).join('、')}`,
    `- 助手部件：${Object.entries(transcript.assistantParts).map(([kind, count]) => `${kind} ${count}`).join('、')}`,
    '',
    '> 只保留用户与助手文字；不含工具调用、附件、凭据或可续跑状态。',
    '',
  ];
  const body = transcript.messages.map((message) => `## ${message.role === 'user' ? '用户' : '助手'} #${message.index}\n\n${message.text}\n`);
  return `${head.join('\n')}${body.join('\n')}`;
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

async function newestSessionId() {
  try {
    const projects = await readdir(SESSIONS_DIR);
    let best = null;
    for (const project of projects) {
      const base = join(SESSIONS_DIR, project);
      let sessions = [];
      try {
        sessions = await readdir(base);
      } catch {
        continue;
      }
      for (const session of sessions) {
        try {
          const info = await stat(join(base, session, 'session.v4.jsonl.zstd'));
          if (!best || info.mtimeMs > best.mtimeMs) best = { id: session, mtimeMs: info.mtimeMs };
        } catch {
          /* not a session dir */
        }
      }
    }
    return best?.id ?? null;
  } catch {
    return null;
  }
}

export function transcriptExportTarget(dir, sessionId, platform = process.platform) {
  const root = dir === undefined || dir === null || dir === '' ? join(ROOT, 'aiyou-conversations') : absoluteDirectory(dir, platform);
  if (!root) throw Object.assign(new Error('an absolute export directory path is required'), { status: 400 });
  try { return sessionDirectory(root, sessionId, platform); }
  catch (error) { throw Object.assign(error, { status: 400 }); }
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  const lifecycle = () => {
    void record({ phase: 'applied' });
    return () => {
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-session-transcript:lifecycle');
  else lifecycle();

  if (!ctx.inject) { void trace('no-inject'); return; }
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
          const url = new URL(req.url ?? BASE, 'http://127.0.0.1');
          let sessionId = url.searchParams.get('session') ?? '';
          if (!sessionId || sessionId === 'current') sessionId = (await newestSessionId()) ?? '';
          if (!sessionId) return json(res, 400, { error: 'no session could be inferred' });
          const transcript = await buildTranscript(sessionId);
          recordServing({ sessionId, events: transcript.lines, kept: transcript.kept, frames: transcript.frames });
          const preview = Number(url.searchParams.get('preview') ?? 20);
          json(res, 200, {
            sessionId,
            file: transcript.file,
            bytes: transcript.bytes,
            frames: transcript.frames,
            framesFailed: transcript.framesFailed,
            events: transcript.lines,
            kept: transcript.kept,
            roles: {
              user: transcript.messages.filter((message) => message.role === 'user').length,
              assistant: transcript.messages.filter((message) => message.role === 'assistant').length,
            },
            eventsByName: Object.fromEntries(Object.entries(transcript.events).slice(0, 12)),
            userSources: transcript.userSources,
            assistantParts: transcript.assistantParts,
            preview: transcript.messages.slice(-preview).map((message) => ({
              index: message.index,
              role: message.role,
              excerpt: message.text.slice(0, 400),
            })),
            note: transcript.note,
          });
        } catch (error) {
          json(res, 404, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-session-transcript:read');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/export`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        if (req.method !== 'POST') return json(res, 405, { error: 'POST only' });
        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString('utf8');
          const payload = raw ? JSON.parse(raw) : {};
          const sessionId = String(payload?.session ?? '') || (await newestSessionId()) || '';
          const target = transcriptExportTarget(payload?.dir, sessionId);
          const transcript = await buildTranscript(sessionId);
          const current = await lstat(target).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
          if (current && (!current.isDirectory() || current.isSymbolicLink())) throw new Error('the export destination is not an owned directory path');
          await mkdir(target, { recursive: true });
          for (const file of ['conversation.md', 'conversation.json']) {
            const info = await lstat(join(target, file)).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
            if (info && (!info.isFile() || info.isSymbolicLink())) throw new Error('an export file was replaced by another owner');
          }
          await writeFile(join(target, 'conversation.md'), renderMarkdown(transcript));
          await writeFile(join(target, 'conversation.json'), `${JSON.stringify({
            schemaVersion: 1,
            sessionId,
            exportedAt: new Date().toISOString(),
            source: transcript.file,
            events: transcript.lines,
            kept: transcript.kept,
            dropped: transcript.events,
            messages: transcript.messages,
          }, null, 2)}\n`);
          recordServing({ exported: target, kept: transcript.kept });
          json(res, 200, { ok: true, dir: target, files: ['conversation.md', 'conversation.json'], kept: transcript.kept, events: transcript.lines });
        } catch (error) {
          json(res, error?.status ?? 500, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-session-transcript:export');
  });
}
