/**
 * Electron 对齐 Tauri project_memory_db（src-tauri/src/project_memory_db.rs）
 * 使用 Node/Electron 内置 node:sqlite（DatabaseSync）。
 */

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

function ensureSqliteAvailable() {
  if (!DatabaseSync) {
    throw new Error('node:sqlite 不可用，无法打开 project memory db');
  }
}

function defaultDbPath() {
  const dir = path.join(app.getPath('userData'), 'Memory');
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'project-memory.sqlite');
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
    PRAGMA busy_timeout = 8000;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;

    CREATE TABLE IF NOT EXISTS project_memory_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      payload TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS project_memory_usage (
      id TEXT PRIMARY KEY NOT NULL,
      memory_id TEXT NOT NULL,
      project_id TEXT,
      agent TEXT NOT NULL,
      run_id TEXT,
      query_text TEXT,
      used_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_project_memory_usage_memory
      ON project_memory_usage(memory_id, used_at DESC);
    CREATE INDEX IF NOT EXISTS idx_project_memory_usage_run
      ON project_memory_usage(run_id, used_at DESC);
  `);
}

function requireDb() {
  if (!inner) throw new Error('project memory db not open');
  return inner;
}

function usageCount(db) {
  return Number(db.prepare('SELECT COUNT(*) AS c FROM project_memory_usage').get()?.c) || 0;
}

function statusOf(db, dbPath) {
  return {
    open: true,
    path: dbPath,
    usageCount: usageCount(db),
  };
}

function projectMemoryDbOpen(args = {}) {
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
  inner = { db, path: dbPath };
  const status = statusOf(db, dbPath);
  console.log(`[project_memory_db] opened ${dbPath} (usage=${status.usageCount})`);
  return status;
}

function projectMemoryDbGetState() {
  const { db } = requireDb();
  const row = db.prepare('SELECT payload FROM project_memory_state WHERE id = 1').get();
  if (!row?.payload) return null;
  try {
    return JSON.parse(String(row.payload));
  } catch (e) {
    throw new Error(`parse project memory state: ${e instanceof Error ? e.message : e}`);
  }
}

function projectMemoryDbSetState(args = {}) {
  const { db } = requireDb();
  const updatedAt = Number(pick(args, 'updatedAt', 'updated_at') || Date.now()) || Date.now();
  let raw;
  try {
    raw = JSON.stringify(args.payload === undefined ? null : args.payload);
  } catch (e) {
    throw new Error(`encode project memory state: ${e instanceof Error ? e.message : e}`);
  }
  db.prepare(
    `INSERT INTO project_memory_state(id, payload, updated_at) VALUES(1, ?, ?)
     ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at`,
  ).run(raw, updatedAt);
  return null;
}

function projectMemoryDbRecordUsage(args = {}) {
  const { db } = requireDb();
  const items = Array.isArray(args.items) ? args.items.slice(0, 100) : [];
  if (!items.length) return null;
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO project_memory_usage
     (id, memory_id, project_id, agent, run_id, query_text, used_at)
     VALUES(?, ?, ?, ?, ?, ?, ?)`,
  );
  for (const item of items) {
    const id = String(pick(item, 'id', 'id') || '').trim();
    const memoryId = String(pick(item, 'memoryId', 'memory_id') || '').trim();
    if (!id || !memoryId) continue;
    const projectId = pick(item, 'projectId', 'project_id');
    const runId = pick(item, 'runId', 'run_id');
    const query = pick(item, 'query', 'query');
    stmt.run(
      id,
      memoryId,
      projectId == null ? null : String(projectId),
      String(item.agent || ''),
      runId == null ? null : String(runId),
      query == null ? null : String(query),
      Number(pick(item, 'usedAt', 'used_at') || 0) || 0,
    );
  }
  return null;
}

function handleProjectMemoryDbCommand(cmd, args) {
  switch (cmd) {
    case 'project_memory_db_open':
      return projectMemoryDbOpen(args);
    case 'project_memory_db_get_state':
      return projectMemoryDbGetState();
    case 'project_memory_db_set_state':
      return projectMemoryDbSetState(args);
    case 'project_memory_db_record_usage':
      return projectMemoryDbRecordUsage(args);
    default:
      return undefined;
  }
}

function isProjectMemoryDbCommand(cmd) {
  return typeof cmd === 'string' && cmd.startsWith('project_memory_db_');
}

module.exports = {
  handleProjectMemoryDbCommand,
  isProjectMemoryDbCommand,
};

// DSH backend owns a separate module/connection per project.
module.exports.__dispose=()=>{if(inner){inner.db.close();inner=null;}};
