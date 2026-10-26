/**
 * Electron 对齐 Tauri chat_db（src-tauri/src/chat_db.rs）
 * 使用 Node/Electron 内置 node:sqlite（DatabaseSync）。
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
// DSH: explicit database path supplied by the per-project backend.
const app = {getPath(){throw new Error('DSH requires an explicit owned database path')}};

let DatabaseSync;
try {
  ({ DatabaseSync } = require('node:sqlite'));
} catch {
  DatabaseSync = null;
}

/** @type {{ db: import('node:sqlite').DatabaseSync, path: string } | null} */
let inner = null;

function pick(args, camel, snake) {
  if (!args || typeof args !== 'object') return undefined;
  if (args[camel] !== undefined) return args[camel];
  if (args[snake] !== undefined) return args[snake];
  return undefined;
}

function nowMs() {
  return Date.now();
}

function ensureSqliteAvailable() {
  if (!DatabaseSync) {
    throw new Error('node:sqlite 不可用，无法打开 chat db');
  }
}

function defaultDbPath() {
  const chatDir = path.join(app.getPath('userData'), 'Chat');
  fs.mkdirSync(chatDir, { recursive: true });
  return path.join(chatDir, 'chat.sqlite');
}

function resolveDbPath(dbPath) {
  const trimmed = dbPath == null ? '' : String(dbPath).trim();
  if (trimmed) {
    const parent = path.dirname(trimmed);
    if (parent && parent !== '.' && parent !== trimmed) {
      fs.mkdirSync(parent, { recursive: true });
    }
    return trimmed;
  }
  return defaultDbPath();
}

function initSchema(db) {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chat_sessions (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL DEFAULT '新对话',
      mode TEXT NOT NULL DEFAULT 'normal',
      sort_ts INTEGER NOT NULL DEFAULT 0,
      message_count INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_chat_sessions_sort
      ON chat_sessions(sort_ts DESC);

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY NOT NULL,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      sort_ts INTEGER NOT NULL DEFAULT 0,
      payload TEXT NOT NULL,
      content_preview TEXT,
      updated_at INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_chat_messages_session_ts
      ON chat_messages(session_id, sort_ts ASC);

    CREATE TABLE IF NOT EXISTS chat_session_context (
      session_id TEXT PRIMARY KEY NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
      metadata TEXT,
      revision INTEGER NOT NULL DEFAULT 1
    );
  `);
}

function requireDb() {
  if (!inner) throw new Error('chat db not open');
  return inner;
}

function withTx(db, fn) {
  db.exec('BEGIN');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (e) {
    try {
      db.exec('ROLLBACK');
    } catch {
      // ignore
    }
    throw e;
  }
}

function statusOf(db, dbPath) {
  const sessionCount =
    Number(db.prepare('SELECT COUNT(*) AS c FROM chat_sessions').get()?.c) || 0;
  const messageCount =
    Number(db.prepare('SELECT COUNT(*) AS c FROM chat_messages').get()?.c) || 0;
  return {
    open: true,
    path: dbPath,
    sessionCount,
    messageCount,
  };
}

function normalizeMode(mode) {
  const m = String(mode || '').trim();
  if (m === 'skill' || m === 'agent') return m;
  return 'normal';
}

function previewText(raw) {
  const s = String(raw || '').trim();
  if (!s) return null;
  const chars = [...s];
  if (chars.length <= 160) return s;
  return `${chars.slice(0, 160).join('')}…`;
}

function upsertOneSession(db, item) {
  const id = String(item?.id || '').trim();
  if (!id) return;

  const ts = nowMs();
  const titleRaw = String(item.title || '').trim();
  const title = titleRaw || '新对话';
  const mode = normalizeMode(item.mode);
  const sortTs = Number(pick(item, 'sortTs', 'sort_ts') || 0) || ts;
  const replaceMessages = Boolean(
    pick(item, 'replaceMessages', 'replace_messages'),
  );
  const messages = Array.isArray(item.messages) ? item.messages : [];

  db.prepare(
    `
    INSERT INTO chat_sessions(id, title, mode, sort_ts, message_count, updated_at)
    VALUES(?, ?, ?, ?, 0, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      mode = excluded.mode,
      sort_ts = excluded.sort_ts,
      updated_at = excluded.updated_at
  `,
  ).run(id, title, mode, sortTs, ts);

  const metadata = item.metadata && typeof item.metadata === 'object'
    ? JSON.stringify(item.metadata)
    : null;
  db.prepare(
    `INSERT INTO chat_session_context(session_id, metadata, revision) VALUES(?, ?, 1)
     ON CONFLICT(session_id) DO UPDATE SET
       metadata = COALESCE(excluded.metadata, chat_session_context.metadata),
       revision = chat_session_context.revision + 1`,
  ).run(id, metadata);

  if (replaceMessages) {
    db.prepare('DELETE FROM chat_messages WHERE session_id = ?').run(id);
    const insertMsg = db.prepare(
      `
      INSERT INTO chat_messages(id, session_id, role, sort_ts, payload, content_preview, updated_at)
      VALUES(?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        session_id = excluded.session_id,
        role = excluded.role,
        sort_ts = excluded.sort_ts,
        payload = excluded.payload,
        content_preview = excluded.content_preview,
        updated_at = excluded.updated_at
    `,
    );
    for (const m of messages) {
      const mid = String(m?.id || '').trim();
      if (!mid) continue;
      const payload = JSON.stringify(m.payload ?? m);
      const preview = previewText(pick(m, 'contentPreview', 'content_preview'));
      const mts = Number(pick(m, 'sortTs', 'sort_ts') || 0) || ts;
      insertMsg.run(mid, id, String(m.role || 'user').trim(), mts, payload, preview, ts);
    }
  }

  const msgCount =
    Number(
      db.prepare('SELECT COUNT(*) AS c FROM chat_messages WHERE session_id = ?').get(id)?.c,
    ) || 0;
  db.prepare(
    'UPDATE chat_sessions SET message_count = ?, updated_at = ? WHERE id = ?',
  ).run(msgCount, ts, id);
}

function chatDbOpen(args = {}) {
  ensureSqliteAvailable();
  const dbPath = resolveDbPath(pick(args, 'dbPath', 'db_path'));

  if (inner && inner.path === dbPath) {
    return statusOf(inner.db, dbPath);
  }

  if (inner) {
    try {
      inner.db.close();
    } catch {
      // ignore
    }
    inner = null;
  }

  const db = new DatabaseSync(dbPath);
  initSchema(db);
  const st = statusOf(db, dbPath);
  inner = { db, path: dbPath };
  console.log(
    `[chat_db] opened ${dbPath} (sessions=${st.sessionCount}, messages=${st.messageCount})`,
  );
  return st;
}

function chatDbStatus() {
  const { db, path: dbPath } = requireDb();
  return statusOf(db, dbPath);
}

function chatDbGetMeta(args = {}) {
  const { db } = requireDb();
  const key = String(args.key || '').trim();
  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get(key);
  return row?.value != null ? String(row.value) : null;
}

function chatDbSetMeta(args = {}) {
  const { db } = requireDb();
  db.prepare(
    `INSERT INTO meta(key, value) VALUES(?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(String(args.key || '').trim(), String(args.value ?? ''));
  return null;
}

function chatDbUpsertSessions(args = {}) {
  const { db } = requireDb();
  const sessions = Array.isArray(args.sessions) ? args.sessions : [];
  return withTx(db, () => {
    let n = 0;
    for (const s of sessions) {
      upsertOneSession(db, s || {});
      n += 1;
    }
    return n;
  });
}

function chatDbReplaceAllSessions(args = {}) {
  const { db } = requireDb();
  const sessions = Array.isArray(args.sessions) ? args.sessions : [];
  return withTx(db, () => {
    db.exec('DELETE FROM chat_messages');
    db.exec('DELETE FROM chat_session_context');
    db.exec('DELETE FROM chat_sessions');
    let n = 0;
    for (const s of sessions) {
      const row = { ...(s || {}), replaceMessages: true };
      upsertOneSession(db, row);
      n += 1;
    }
    return n;
  });
}

function chatDbListSessions() {
  const { db } = requireDb();
  return db
    .prepare(
      `SELECT id, title, mode, sort_ts, message_count
       FROM chat_sessions
       ORDER BY sort_ts DESC`,
    )
    .all()
    .map((r) => ({
      id: String(r.id),
      title: String(r.title || ''),
      mode: String(r.mode || 'normal'),
      sortTs: Number(r.sort_ts) || 0,
      messageCount: Number(r.message_count) || 0,
    }));
}

function chatDbGetSessionMessages(args = {}) {
  const { db } = requireDb();
  const sid = String(pick(args, 'sessionId', 'session_id') || '').trim();
  if (!sid) return [];
  const offset = Math.max(0, Number(args.offset) || 0);
  const limit = Math.min(2000, Math.max(1, Number(args.limit) || 1));
  const rows = db
    .prepare(
      `SELECT payload FROM chat_messages
       WHERE session_id = ?
       ORDER BY sort_ts ASC
       LIMIT ? OFFSET ?`,
    )
    .all(sid, limit, offset);
  const out = [];
  for (const row of rows) {
    try {
      out.push(JSON.parse(String(row.payload)));
    } catch {
      // skip
    }
  }
  return out;
}

function parseJson(raw, fallback) {
  if (raw == null || raw === '') return fallback;
  try {
    return JSON.parse(String(raw));
  } catch {
    return fallback;
  }
}

function contextDirectory(dbPath, id) {
  const hash = crypto.createHash('sha256').update(String(id), 'utf8').digest('hex');
  return path.join(path.dirname(dbPath), 'contexts', hash);
}

function writeAtomic(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmp = `${filePath}.tmp`;
  fs.writeFileSync(tmp, contents);
  fs.renameSync(tmp, filePath);
}

function removeContextFiles(dbPath, id) {
  const dir = contextDirectory(dbPath, id);
  for (const name of [
    'session.json', 'session.json.bak', 'session.json.tmp',
    'conversation.md', 'conversation.md.bak', 'conversation.md.tmp',
  ]) {
    try { fs.unlinkSync(path.join(dir, name)); } catch { /* ignore */ }
  }
  try { fs.rmdirSync(dir); } catch { /* ignore */ }
}

function loadSessionContext(sessionId) {
  const { db, path: dbPath } = requireDb();
  const id = String(sessionId || '').trim();
  if (!id) return null;
  const row = db.prepare(
    `SELECT s.title, s.mode, s.updated_at, c.metadata, COALESCE(c.revision, 0) AS revision
     FROM chat_sessions s
     LEFT JOIN chat_session_context c ON c.session_id = s.id
     WHERE s.id = ?`,
  ).get(id);
  if (!row) return null;

  const dir = contextDirectory(dbPath, id);
  const file = path.join(dir, 'session.json');
  try {
    const saved = parseJson(fs.readFileSync(file, 'utf8'), null);
    if (
      saved?.version === 1
      && saved.revision === row.revision
      && saved.updatedAt === row.updated_at
      && saved.session?.id === id
      && Array.isArray(saved.session?.messages)
    ) {
      return { session: saved.session, directory: dir };
    }
  } catch {
    /* rebuild */
  }

  const messages = [];
  for (const item of db.prepare(
    'SELECT payload FROM chat_messages WHERE session_id = ? ORDER BY sort_ts ASC, rowid ASC',
  ).all(id)) {
    const payload = parseJson(item.payload, null);
    if (payload) messages.push(payload);
  }

  const metadata = parseJson(row.metadata, null);
  const session = {
    ...(metadata && typeof metadata === 'object' ? metadata : {}),
    id,
    title: String(row.title || ''),
    mode: String(row.mode || 'normal'),
    messages,
  };

  let markdown = `# ${session.title}\n\n会话 ID：${id}\n模式：${session.mode}\n\n`;
  if (session.agentContextLog) markdown += `## 会话记忆\n\n${session.agentContextLog}\n\n`;
  for (const message of messages) {
    const role = message.role === 'assistant' ? '助手' : '用户';
    markdown += `## ${role}\n\n${message.content || ''}\n\n`;
    if (Array.isArray(message.files)) {
      for (const fileItem of message.files) {
        markdown += `附件：${fileItem?.name || ''}（资源 ID：${fileItem?._assetId || ''}）\n\n`;
      }
    }
  }

  const snapshot = { version: 1, revision: row.revision, updatedAt: row.updated_at, session };
  writeAtomic(path.join(dir, 'conversation.md'), markdown);
  writeAtomic(file, `${JSON.stringify(snapshot, null, 2)}\n`);
  return { session, directory: dir };
}

function chatDbLoadAllSessions() {
  const { db } = requireDb();
  const sessions = db
    .prepare(
      `SELECT s.id, s.title, s.mode, c.metadata
       FROM chat_sessions s
       LEFT JOIN chat_session_context c ON c.session_id = s.id
       ORDER BY s.sort_ts DESC`,
    )
    .all();
  const msgStmt = db.prepare(
    `SELECT payload FROM chat_messages
     WHERE session_id = ?
     ORDER BY sort_ts ASC`,
  );
  const out = [];
  for (const s of sessions) {
    const messages = [];
    for (const row of msgStmt.all(String(s.id))) {
      try {
        messages.push(JSON.parse(String(row.payload)));
      } catch {
        // skip
      }
    }
    const metadata = parseJson(s.metadata, null);
    out.push({
      ...(metadata && typeof metadata === 'object' ? metadata : {}),
      id: String(s.id),
      title: String(s.title || ''),
      mode: String(s.mode || 'normal'),
      messages,
    });
  }
  return out;
}

function chatDbDeleteSessions(args = {}) {
  const { db, path: dbPath } = requireDb();
  const ids = Array.isArray(args.ids)
    ? [...new Set(args.ids.map((x) => String(x || '').trim()).filter(Boolean))]
    : [];
  if (!ids.length) return 0;
  const n = withTx(db, () => {
    let count = 0;
    const delMsg = db.prepare('DELETE FROM chat_messages WHERE session_id = ?');
    const delCtx = db.prepare('DELETE FROM chat_session_context WHERE session_id = ?');
    const delSess = db.prepare('DELETE FROM chat_sessions WHERE id = ?');
    for (const id of ids) {
      delMsg.run(id);
      delCtx.run(id);
      count += Number(delSess.run(id).changes) || 0;
    }
    return count;
  });
  for (const id of ids) removeContextFiles(dbPath, id);
  return n;
}

function chatDbSyncSessionIds(args = {}) {
  const { db, path: dbPath } = requireDb();
  const keep = new Set(
    (Array.isArray(pick(args, 'keepIds', 'keep_ids'))
      ? pick(args, 'keepIds', 'keep_ids')
      : []
    )
      .map((x) => String(x || '').trim())
      .filter(Boolean),
  );
  let toDelete = [];
  const n = withTx(db, () => {
    const existing = db.prepare('SELECT id FROM chat_sessions').all().map((r) => String(r.id));
    toDelete = existing.filter((id) => !keep.has(id));
    if (!toDelete.length) return 0;
    let count = 0;
    const delMsg = db.prepare('DELETE FROM chat_messages WHERE session_id = ?');
    const delCtx = db.prepare('DELETE FROM chat_session_context WHERE session_id = ?');
    const delSess = db.prepare('DELETE FROM chat_sessions WHERE id = ?');
    for (const id of toDelete) {
      delMsg.run(id);
      delCtx.run(id);
      count += Number(delSess.run(id).changes) || 0;
    }
    return count;
  });
  for (const id of toDelete) removeContextFiles(dbPath, id);
  return n;
}

function chatDbPathExists(args = {}) {
  const p = String(args.path || '').trim();
  return Boolean(p && fs.existsSync(p));
}

function handleChatDbCommand(cmd, args) {
  switch (cmd) {
    case 'chat_db_open':
      return chatDbOpen(args);
    case 'chat_db_status':
      return chatDbStatus();
    case 'chat_db_get_meta':
      return chatDbGetMeta(args);
    case 'chat_db_set_meta':
      return chatDbSetMeta(args);
    case 'chat_db_upsert_sessions':
      return chatDbUpsertSessions(args);
    case 'chat_db_replace_all_sessions':
      return chatDbReplaceAllSessions(args);
    case 'chat_db_list_sessions':
      return chatDbListSessions();
    case 'chat_db_get_session_messages':
      return chatDbGetSessionMessages(args);
    case 'chat_db_load_all_sessions':
      return chatDbLoadAllSessions();
    case 'chat_db_delete_sessions':
      return chatDbDeleteSessions(args);
    case 'chat_db_sync_session_ids':
      return chatDbSyncSessionIds(args);
    case 'chat_db_path_exists':
      return chatDbPathExists(args);
    case 'chat_db_load_session_context':
      return loadSessionContext(pick(args, 'sessionId', 'session_id'));
    default:
      return undefined;
  }
}

function isChatDbCommand(cmd) {
  return typeof cmd === 'string' && cmd.startsWith('chat_db_');
}

module.exports = {
  handleChatDbCommand,
  isChatDbCommand,
};

// DSH backend owns a separate module/connection per project.
module.exports.__dispose=()=>{if(inner){inner.db.close();inner=null;}};
