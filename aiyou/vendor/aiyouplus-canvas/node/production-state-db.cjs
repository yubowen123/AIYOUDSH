/**
 * Electron 对齐 Tauri production_state_db（src-tauri/src/production_state_db.rs）
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

const DOMAINS = ['recipes', 'triggers', 'job_queue', 'history', 'run_checkpoints', 'pattern_tools'];

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
    throw new Error('node:sqlite 不可用，无法打开 production state db');
  }
}

function defaultDbPath() {
  const dir = path.join(app.getPath('userData'), 'Production');
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'production-state.sqlite');
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

    CREATE TABLE IF NOT EXISTS production_state (
      domain TEXT PRIMARY KEY NOT NULL,
      payload TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS production_state_meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
}

function requireDb() {
  if (!inner) throw new Error('production state db not open');
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

function validateDomain(domain) {
  const trimmed = String(domain || '').trim();
  if (!DOMAINS.includes(trimmed)) {
    throw new Error(`unsupported production state domain: ${trimmed}`);
  }
  return trimmed;
}

function migratedDomains(db) {
  const rows = db
    .prepare(
      "SELECT substr(key, 10) AS domain FROM production_state_meta WHERE key LIKE 'migrated:%' ORDER BY key",
    )
    .all();
  return rows
    .map((row) => String(row.domain || ''))
    .filter((domain) => DOMAINS.includes(domain));
}

function statusOf(db, dbPath) {
  return {
    open: true,
    path: dbPath,
    migratedDomains: migratedDomains(db),
  };
}

function productionStateDbOpen(args = {}) {
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
  console.log(`[production_state_db] opened ${dbPath}`);
  return status;
}

function parsePayload(raw) {
  try {
    return JSON.parse(String(raw));
  } catch (e) {
    throw new Error(`parse production state: ${e instanceof Error ? e.message : e}`);
  }
}

function productionStateDbGet(args = {}) {
  const { db } = requireDb();
  const domain = validateDomain(args.domain);
  const row = db.prepare('SELECT payload FROM production_state WHERE domain = ?').get(domain);
  if (!row?.payload) return null;
  return parsePayload(row.payload);
}

function productionStateDbGetAll() {
  const { db } = requireDb();
  const rows = db.prepare('SELECT domain, payload FROM production_state ORDER BY domain').all();
  const result = {};
  for (const row of rows) {
    const domain = String(row.domain || '');
    if (!DOMAINS.includes(domain)) continue;
    result[domain] = parsePayload(row.payload);
  }
  return result;
}

function productionStateDbSet(args = {}) {
  const { db } = requireDb();
  const domain = validateDomain(args.domain);
  const updatedAt = Number(pick(args, 'updatedAt', 'updated_at') || Date.now()) || Date.now();
  let raw;
  try {
    raw = JSON.stringify(args.payload === undefined ? null : args.payload);
  } catch (e) {
    throw new Error(`encode production state: ${e instanceof Error ? e.message : e}`);
  }
  withTx(db, () => {
    db.prepare(
      `INSERT INTO production_state(domain, payload, updated_at) VALUES(?, ?, ?)
       ON CONFLICT(domain) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at`,
    ).run(domain, raw, updatedAt);
    db.prepare(
      `INSERT INTO production_state_meta(key, value, updated_at) VALUES(?, '1', ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    ).run(`migrated:${domain}`, updatedAt);
  });
  return null;
}

function handleProductionStateDbCommand(cmd, args) {
  switch (cmd) {
    case 'production_state_db_open':
      return productionStateDbOpen(args);
    case 'production_state_db_get':
      return productionStateDbGet(args);
    case 'production_state_db_get_all':
      return productionStateDbGetAll();
    case 'production_state_db_set':
      return productionStateDbSet(args);
    default:
      return undefined;
  }
}

function isProductionStateDbCommand(cmd) {
  return typeof cmd === 'string' && cmd.startsWith('production_state_db_');
}

module.exports = {
  handleProductionStateDbCommand,
  isProductionStateDbCommand,
};

// DSH backend owns a separate module/connection per project.
module.exports.__dispose=()=>{if(inner){inner.db.close();inner=null;}};
