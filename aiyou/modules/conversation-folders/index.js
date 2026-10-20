import { guardContext } from '../../runtime.mjs';
/**
 * Host half — conversation-specific output folders.
 *
 * COUPLING LADDER:
 *   L0  `conversationFolderName` + `renderConversationFolderContext` are upstream's,
 *       copied (see folders.mjs).
 *   L2  the data sources are swapped:
 *         workspace  <- the session's own cwd, from the projection header
 *         title      <- DSH's persisted session title (projection `title` row).
 *                       Upstream insists a title must come from the native title
 *                       index and never be guessed from prompt or tool text; the
 *                       projection row is the equivalent authoritative source.
 *   L3  delivery: upstream injects through Codex SessionStart/UserPromptSubmit
 *       hooks. Here it is a dynamic systemPrompt section, which is re-evaluated on
 *       every assembly — so a rename cannot leave a stale path in the prompt.
 *
 * Upstream's disciplines kept:
 *   · a hidden marker file records ownership; only a directory carrying our exact
 *     thread id may ever be renamed or reused, so two conversations never merge;
 *   · history is never bulk-migrated — a folder appears when a conversation is used;
 *   · failures are explicit; the code does not silently fall back to the whole
 *     project directory and then claim the rule worked.
 */
import { mkdir, readFile, rename, stat, lstat, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { absoluteDirectory, sameDirectory, directChildOf, sessionDirectory } from '../../lib/platform-paths.mjs';

import { MARKER, conversationFolderName, renderConversationFolderContext } from './folders.mjs';

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

export const name = 'aiyou-enhancer-conversation-folders';

const BASE = '/aiyoucodex-dsh/conversation-folders';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STORE_FILE = join(ROOT, 'conversation-folders.json');
const PROJ_DIR = join(DSH_HOME, 'storages', 'session_projcache', 'sessions');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

/** Policy band, alongside PLAN_POLICY (500) / TEAM_POLICY (600) / output-preference (700). */
const SECTION_ORDER = 750;
const SECTION_NAME = 'aiyoucodex:conversation-output-directory';

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
  if (now - lastServingWrite < 8000) return;
  lastServingWrite = now;
  void record({ phase: 'serving', ...extra });
}

export async function readStore() {
  try {
    const value = JSON.parse(await readFile(STORE_FILE, 'utf8'));
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

async function writeStore(store) {
  await mkdir(ROOT, { recursive: true });
  await writeFile(STORE_FILE, `${JSON.stringify(store, null, 2)}\n`);
}

/**
 * Read a session's projection. Note `identity` sits beside `rows`, NOT inside them:
 * the cwd is `record.identity.cwd`. Reading only the rows loses the workspace.
 */
async function readProjection(sessionId) {
  try {
    const raw = JSON.parse(await readFile(join(PROJ_DIR, `${sessionId}.json`), 'utf8'));
    const record = raw?.record ?? {};
    return { rows: record.rows ?? {}, identity: record.identity ?? {} };
  } catch {
    return null;
  }
}

function rowValue(rows, key) {
  const row = rows?.[key];
  if (!row || typeof row !== 'object') return null;
  return 'val' in row ? row.val : row;
}

export function titleOf(rows) {
  const title = rowValue(rows, 'title');
  if (typeof title === 'string') return title;
  if (typeof title?.val === 'string') return title.val;
  return '';
}

export function cwdOf(identity, platform = process.platform) {
  return absoluteDirectory(identity?.cwd, platform);
}

async function pathInfo(file) {
  try {
    return await stat(file);
  } catch (error) {
    if (error?.code === 'ENOENT') return null;
    throw error;
  }
}

/** A directory is OURS only if it carries a marker naming exactly this thread. */
export async function ownedBy(directory, sessionId) {
  const info = await lstat(directory).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
  if (!info?.isDirectory() || info.isSymbolicLink()) return false;
  const marker = join(directory, MARKER);
  const markerInfo = await lstat(marker).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
  if (!markerInfo?.isFile() || markerInfo.isSymbolicLink() || markerInfo.size > 4096) return false;
  try {
    const value = JSON.parse(await readFile(marker, 'utf8'));
    return value?.schemaVersion === 1 && value.threadId === sessionId;
  } catch {
    return false;
  }
}

/**
 * Ensure the conversation's directory exists and is bound. On a title change the
 * directory is renamed IN PLACE (contents kept) and only when the marker proves it
 * is ours, so a same-named folder belonging to something else is never adopted.
 */
export async function ensureFolder({ sessionId, workspace, title }) {
  workspace = absoluteDirectory(workspace);
  if (!workspace) throw new Error('an absolute workspace path is required');
  // Validate the id before any projection/store path can use it.
  sessionDirectory(workspace, sessionId);
  const store = await readStore();
  const existing = Object.hasOwn(store, sessionId) ? store[sessionId] : null;
  if (existing && (!sameDirectory(existing.workspace, workspace) || !directChildOf(workspace, existing.path))) throw new Error('the existing output folder belongs to a different workspace');
  const desiredName = conversationFolderName(title, sessionId);
  const desiredPath = join(workspace, desiredName);
  if (!directChildOf(workspace, desiredPath)) throw new Error('the output folder escapes its workspace');
  const createOwnedFolder = async () => {
    const info = await lstat(desiredPath).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
    if (info && !(await ownedBy(desiredPath, sessionId))) throw new Error('the output folder exists and is not owned by this conversation');
    await mkdir(desiredPath, { recursive: true });
  };

  let entry = existing;
  if (!existing) {
    await createOwnedFolder();
    entry = { threadId: sessionId, path: desiredPath, workspace, title: title ?? '', createdAt: Date.now() };
  } else if (!sameDirectory(existing.path, desiredPath)) {
    const previousExists = await pathInfo(existing.path);
    if (previousExists && await ownedBy(existing.path, sessionId)) {
      // Only rename when the target is free; otherwise keep the old path rather
      // than merging two conversations into one directory.
      if (!(await pathInfo(desiredPath))) {
        await rename(existing.path, desiredPath);
        entry = { ...existing, path: desiredPath, title: title ?? '', renamedAt: Date.now() };
      } else {
        entry = { ...existing, title: title ?? '', collision: desiredPath };
      }
    } else if (!previousExists) {
      await createOwnedFolder();
      entry = { ...existing, path: desiredPath, title: title ?? '' };
    } else {
      // A directory exists but is not provably ours: do not touch it.
      throw new Error('the bound output folder is no longer owned by this conversation');
    }
  } else {
    entry = { ...existing, title: title ?? '' };
  }

  if (!(await ownedBy(entry.path, sessionId)) && existing && await pathInfo(existing.path)) throw new Error('the bound output folder ownership changed');
  await mkdir(entry.path, { recursive: true });
  await writeFile(join(entry.path, MARKER), `${JSON.stringify({ schemaVersion: 1, threadId: sessionId, boundAt: entry.createdAt ?? Date.now() }, null, 2)}\n`);
  store[sessionId] = entry;
  await writeStore(store);
  return entry;
}

/**
 * Resolve everything the prompt section needs, with a short in-memory cache so the
 * section does not touch the filesystem on every single assembly.
 */
const resolutionCache = new Map();

export async function resolveForSession(sessionId) {
  sessionDirectory(PROJ_DIR, sessionId);
  const cached = resolutionCache.get(sessionId);
  if (cached && Date.now() - cached.at < 15000) return cached.entry;
  const projection = await readProjection(sessionId);
  if (!projection) return null;
  const { rows, identity } = projection;
  const title = titleOf(rows);
  const workspace = cwdOf(identity);
  if (!workspace) throw new Error('the session has no absolute workspace path');
  const entry = await ensureFolder({ sessionId, workspace, title });
  resolutionCache.set(sessionId, { at: Date.now(), entry });
  return entry;
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

export function apply(ctx) {
  ctx = guardContext(ctx);
  // ---- delivery: the model-visible default save rule ----
  let lastInjected = null;

  const lifecycle = () => {
    void record({ phase: 'applied', section: SECTION_NAME, order: SECTION_ORDER });
    return () => {
      resolutionCache.clear();
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-conversation-folders:lifecycle');
  else lifecycle();

  if (ctx.inject) {
    ctx.inject(['systemPrompt'], (promptCtx) => {
      promptCtx.effect(() => promptCtx.systemPrompt.section({
        name: SECTION_NAME,
        order: SECTION_ORDER,
        // Re-evaluated per assembly: a rename therefore cannot leave a stale path
        // in the prompt, which is exactly why upstream's hook had to re-sync.
        text: (context) => {
          try {
            const agent = context?.agent ?? {};
            const sessionId = typeof agent.id === 'string' ? agent.id : '';
            if (!sessionId) return '';
            const cached = resolutionCache.get(sessionId);
            if (cached) {
              lastInjected = { sessionId, path: cached.entry.path, at: Date.now() };
              return renderConversationFolderContext(cached.entry);
            }
            // First assembly for this session: resolve in the background and inject
            // from the next turn rather than blocking prompt assembly on filesystem
            // work. Not injecting once is safer than stalling every turn.
            void resolveForSession(sessionId)
              .then((entry) => {
                if (entry) {
                  lastInjected = { sessionId, path: entry.path, at: Date.now() };
                  void record({ phase: 'serving', bound: entry.path, title: entry.title });
                }
              })
              .catch((error) => void record({ phase: 'serving', bindError: String(error?.message ?? error) }));
            return '';
          } catch (error) {
            void record({ phase: 'serving', sectionError: String(error?.message ?? error) });
            return '';
          }
        },
      }), 'aiyoucodex-conversation-folders:prompt-section');
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
          let sessionId = url.searchParams.get('session') ?? '';
          if (!sessionId || sessionId === 'current') {
            // Same inference the other panels use: newest projection cache.
            const { readdir } = await import('node:fs/promises');
            const entries = await readdir(PROJ_DIR);
            let newest = null;
            for (const entry of entries) {
              if (!entry.endsWith('.json')) continue;
              const info = await stat(join(PROJ_DIR, entry));
              if (!newest || info.mtimeMs > newest.mtimeMs) newest = { id: entry.replace(/\.json$/u, ''), mtimeMs: info.mtimeMs };
            }
            sessionId = newest?.id ?? '';
          }
          if (!sessionId) return json(res, 400, { error: 'no session could be inferred' });
          const entry = await resolveForSession(sessionId);
          if (!entry) return json(res, 404, { error: 'no projection cache for this session yet' });
          const projection = await readProjection(sessionId);
          json(res, 200, {
            sessionId,
            entry,
            title: titleOf(projection?.rows ?? {}),
            workspace: cwdOf(projection?.identity) || entry.workspace,
            exists: Boolean(await pathInfo(entry.path)),
            markerPresent: await ownedBy(entry.path, sessionId),
            section: { name: SECTION_NAME, order: SECTION_ORDER },
            injected: lastInjected?.sessionId === sessionId ? lastInjected : null,
            context: renderConversationFolderContext(entry),
          });
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-conversation-folders:read');

    /**
     * "打开文件" — reveal the conversation's folder. Upstream's
     * `workspaceFolderCommand` chooses the platform command; only `open -R` and
     * `explorer /select,` are used, and the path is passed as an argument, never
     * interpolated into a shell string.
     */
    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/reveal`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        try {
          const url = new URL(req.url ?? '/', 'http://127.0.0.1');
          const sessionId = url.searchParams.get('session') ?? '';
          const entry = sessionId ? await resolveForSession(sessionId) : null;
          if (!entry) return json(res, 404, { error: 'no folder bound for this session' });
          if (!(await pathInfo(entry.path))) return json(res, 404, { error: 'bound folder is missing on disk', path: entry.path });
          const { execFile } = await import('node:child_process');
          const target = url.searchParams.get('mode') === 'open' ? null : entry.path;
          const command = process.platform === 'darwin'
            ? ['open', target ? ['-R', target] : [entry.path]]
            : process.platform === 'win32'
              ? ['explorer', [target ? `/select,${target}` : entry.path]]
              : ['xdg-open', [entry.path]];
          await new Promise((resolvePromise, rejectPromise) => {
            execFile(command[0], command[1], (error) => (error ? rejectPromise(error) : resolvePromise(null)));
          });
          json(res, 200, { ok: true, path: entry.path, command: command[0] });
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-conversation-folders:reveal');
  });
}
