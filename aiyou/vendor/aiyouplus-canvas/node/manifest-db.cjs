/**
 * Electron 对齐 Tauri manifest_db（src-tauri/src/manifest_db.rs）
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

function nowMs() {
  return Date.now();
}

function ensureSqliteAvailable() {
  if (!DatabaseSync) {
    throw new Error('node:sqlite 不可用，无法打开 manifest db');
  }
}

function defaultDbPath() {
  const dir = app.getPath('userData');
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'manifest.sqlite');
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

    CREATE TABLE IF NOT EXISTS manifest_assets (
      id TEXT PRIMARY KEY NOT NULL,
      file_name TEXT NOT NULL,
      mime_type TEXT NOT NULL DEFAULT '',
      size INTEGER NOT NULL DEFAULT 0,
      cached_at INTEGER NOT NULL DEFAULT 0,
      remote_url TEXT,
      content_hash TEXT,
      payload TEXT NOT NULL,
      updated_at INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_manifest_file_name
      ON manifest_assets(file_name);
    CREATE INDEX IF NOT EXISTS idx_manifest_content_hash
      ON manifest_assets(content_hash);
    CREATE INDEX IF NOT EXISTS idx_manifest_remote_url
      ON manifest_assets(remote_url);

    CREATE TABLE IF NOT EXISTS manifest_deleted_ids (
      id TEXT PRIMARY KEY NOT NULL,
      deleted_at INTEGER NOT NULL DEFAULT 0
    );
  `);
}

function requireDb() {
  if (!inner) throw new Error('manifest db not open');
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

function metaGet(db, key) {
  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get(key);
  return row?.value != null ? String(row.value) : null;
}

function metaSet(db, key, value) {
  db.prepare(
    `INSERT INTO meta(key, value) VALUES(?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(key, value);
}

function statusOf(db, dbPath) {
  const assetCount =
    Number(db.prepare('SELECT COUNT(*) AS c FROM manifest_assets').get()?.c) || 0;
  const deletedCount =
    Number(db.prepare('SELECT COUNT(*) AS c FROM manifest_deleted_ids').get()?.c) || 0;
  const revRaw = metaGet(db, 'revision');
  const revision = revRaw != null && Number.isFinite(Number(revRaw)) ? Number(revRaw) : 0;
  return {
    open: true,
    path: dbPath,
    assetCount,
    deletedCount,
    revision,
  };
}

function normalizeAssetRow(row) {
  const id = String(row?.id || '').trim();
  const fileName = String(pick(row || {}, 'fileName', 'file_name') || '').trim();
  const mimeType = String(pick(row || {}, 'mimeType', 'mime_type') || '').trim();
  const size = Math.max(0, Number(row?.size) || 0);
  const cachedAt = Math.max(0, Number(pick(row || {}, 'cachedAt', 'cached_at') || 0) || 0);
  let remoteUrl = pick(row || {}, 'remoteUrl', 'remote_url');
  remoteUrl =
    remoteUrl == null ? null : String(remoteUrl).trim() || null;
  let contentHash = pick(row || {}, 'contentHash', 'content_hash');
  contentHash =
    contentHash == null ? null : String(contentHash).trim() || null;
  const payload = row?.payload != null ? row.payload : {};
  return { id, fileName, mimeType, size, cachedAt, remoteUrl, contentHash, payload };
}

function upsertAssetRow(db, rawRow) {
  const row = normalizeAssetRow(rawRow);
  if (!row.id || !row.fileName) return;
  const payload = JSON.stringify(row.payload ?? {});
  const ts = nowMs();
  db.prepare(
    `
    INSERT INTO manifest_assets(
      id, file_name, mime_type, size, cached_at, remote_url, content_hash, payload, updated_at
    ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      file_name = excluded.file_name,
      mime_type = excluded.mime_type,
      size = excluded.size,
      cached_at = excluded.cached_at,
      remote_url = excluded.remote_url,
      content_hash = excluded.content_hash,
      payload = excluded.payload,
      updated_at = excluded.updated_at
  `,
  ).run(
    row.id,
    row.fileName,
    row.mimeType,
    row.size,
    row.cachedAt,
    row.remoteUrl,
    row.contentHash,
    payload,
    ts,
  );
  db.prepare('DELETE FROM manifest_deleted_ids WHERE id = ?').run(row.id);
}

function rowFromDb(r) {
  let payload;
  try {
    payload = JSON.parse(String(r.payload || ''));
  } catch {
    payload = {
      fileName: r.file_name,
      mimeType: r.mime_type,
      size: r.size,
      cachedAt: r.cached_at,
      remoteUrl: r.remote_url,
      contentHash: r.content_hash,
    };
  }
  return {
    id: String(r.id),
    fileName: String(r.file_name),
    mimeType: String(r.mime_type || ''),
    size: Number(r.size) || 0,
    cachedAt: Number(r.cached_at) || 0,
    remoteUrl: r.remote_url != null ? String(r.remote_url) : null,
    contentHash: r.content_hash != null ? String(r.content_hash) : null,
    payload,
  };
}

function manifestDbOpen(args = {}) {
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
    `[manifest_db] opened ${dbPath} (assets=${st.assetCount}, deleted=${st.deletedCount}, rev=${st.revision})`,
  );
  return st;
}

function manifestDbStatus() {
  const { db, path: dbPath } = requireDb();
  return statusOf(db, dbPath);
}

function manifestDbGetMeta(args = {}) {
  const { db } = requireDb();
  return metaGet(db, String(args.key || '').trim());
}

function manifestDbSetMeta(args = {}) {
  const { db } = requireDb();
  metaSet(db, String(args.key || '').trim(), String(args.value ?? ''));
  return null;
}

function manifestDbUpsertAssets(args = {}) {
  const { db } = requireDb();
  const assets = Array.isArray(args.assets) ? args.assets : [];
  return withTx(db, () => {
    let n = 0;
    for (const row of assets) {
      upsertAssetRow(db, row || {});
      n += 1;
    }
    return n;
  });
}

function manifestDbDeleteIds(args = {}) {
  const { db } = requireDb();
  const ids = Array.isArray(args.ids) ? args.ids : [];
  return withTx(db, () => {
    const ts = nowMs();
    let n = 0;
    const tomb = db.prepare(
      `INSERT INTO manifest_deleted_ids(id, deleted_at) VALUES(?, ?)
       ON CONFLICT(id) DO UPDATE SET deleted_at = excluded.deleted_at`,
    );
    const del = db.prepare('DELETE FROM manifest_assets WHERE id = ?');
    for (const raw of ids) {
      const id = String(raw || '').trim();
      if (!id) continue;
      tomb.run(id, ts);
      n += Number(del.run(id).changes) || 0;
    }
    return n;
  });
}

function manifestDbApplySnapshot(args = {}) {
  const { db } = requireDb();
  const snapshot = args.snapshot || args;
  const assets = Array.isArray(snapshot.assets) ? snapshot.assets : [];
  const deletedAssetIds = Array.isArray(
    pick(snapshot, 'deletedAssetIds', 'deleted_asset_ids'),
  )
    ? pick(snapshot, 'deletedAssetIds', 'deleted_asset_ids')
    : [];

  return withTx(db, () => {
    const keep = new Set(
      assets
        .map((a) => String(a?.id || '').trim())
        .filter(Boolean),
    );
    const deletedSet = new Set(
      deletedAssetIds.map((id) => String(id || '').trim()).filter(Boolean),
    );

    const ts = nowMs();
    db.exec('DELETE FROM manifest_deleted_ids');
    const tomb = db.prepare(
      `INSERT INTO manifest_deleted_ids(id, deleted_at) VALUES(?, ?)
       ON CONFLICT(id) DO UPDATE SET deleted_at = excluded.deleted_at`,
    );
    for (const id of deletedSet) {
      tomb.run(id, ts);
    }

    const existing = db.prepare('SELECT id FROM manifest_assets').all();
    const del = db.prepare('DELETE FROM manifest_assets WHERE id = ?');
    for (const row of existing) {
      const id = String(row.id);
      if (!keep.has(id)) del.run(id);
    }

    let n = 0;
    for (const row of assets) {
      const id = String(row?.id || '').trim();
      if (!id || deletedSet.has(id)) continue;
      upsertAssetRow(db, row || {});
      n += 1;
    }

    metaSet(db, 'version', String(snapshot.version || '').trim() || '1.0');
    metaSet(
      db,
      'revision',
      String(Number(snapshot.revision) || 0),
    );
    metaSet(
      db,
      'created_at',
      String(pick(snapshot, 'createdAt', 'created_at') || '').trim(),
    );
    metaSet(
      db,
      'updated_at',
      String(pick(snapshot, 'updatedAt', 'updated_at') || '').trim(),
    );
    return n;
  });
}

function manifestDbLoadSnapshot() {
  const { db } = requireDb();
  const version = metaGet(db, 'version') || '1.0';
  const revRaw = metaGet(db, 'revision');
  const revision = revRaw != null && Number.isFinite(Number(revRaw)) ? Number(revRaw) : 0;
  const createdAt = metaGet(db, 'created_at') || '';
  const updatedAt = metaGet(db, 'updated_at') || '';

  const deletedAssetIds = db
    .prepare('SELECT id FROM manifest_deleted_ids ORDER BY deleted_at ASC')
    .all()
    .map((r) => String(r.id));

  const assets = db
    .prepare(
      `SELECT id, file_name, mime_type, size, cached_at, remote_url, content_hash, payload
       FROM manifest_assets
       ORDER BY cached_at DESC`,
    )
    .all()
    .map(rowFromDb);

  return {
    version,
    revision,
    createdAt,
    updatedAt,
    deletedAssetIds,
    assets,
  };
}

function manifestDbGetAsset(args = {}) {
  const { db } = requireDb();
  const id = String(args.id || '').trim();
  if (!id) return null;
  const row = db
    .prepare(
      `SELECT payload FROM manifest_assets WHERE id = ?
       AND id NOT IN (SELECT id FROM manifest_deleted_ids)`,
    )
    .get(id);
  if (!row?.payload) return null;
  try {
    return JSON.parse(String(row.payload));
  } catch {
    return null;
  }
}

function manifestDbFindByContentHash(args = {}) {
  const { db } = requireDb();
  const hash = String(pick(args, 'contentHash', 'content_hash') || '').trim();
  if (!hash) return [];
  return db
    .prepare(
      `SELECT id, file_name, mime_type, size, cached_at, remote_url, content_hash, payload
       FROM manifest_assets
       WHERE content_hash = ?
         AND id NOT IN (SELECT id FROM manifest_deleted_ids)
       LIMIT 20`,
    )
    .all(hash)
    .map(rowFromDb);
}

function manifestDbPathExists(args = {}) {
  const p = String(args.path || '').trim();
  return Boolean(p && fs.existsSync(p));
}

function handleManifestDbCommand(cmd, args) {
  switch (cmd) {
    case 'manifest_db_open':
      return manifestDbOpen(args);
    case 'manifest_db_status':
      return manifestDbStatus();
    case 'manifest_db_get_meta':
      return manifestDbGetMeta(args);
    case 'manifest_db_set_meta':
      return manifestDbSetMeta(args);
    case 'manifest_db_upsert_assets':
      return manifestDbUpsertAssets(args);
    case 'manifest_db_delete_ids':
      return manifestDbDeleteIds(args);
    case 'manifest_db_apply_snapshot':
      return manifestDbApplySnapshot(args);
    case 'manifest_db_load_snapshot':
      return manifestDbLoadSnapshot();
    case 'manifest_db_get_asset':
      return manifestDbGetAsset(args);
    case 'manifest_db_find_by_content_hash':
      return manifestDbFindByContentHash(args);
    case 'manifest_db_path_exists':
      return manifestDbPathExists(args);
    default:
      return undefined;
  }
}

function isManifestDbCommand(cmd) {
  return typeof cmd === 'string' && cmd.startsWith('manifest_db_');
}

module.exports = {
  handleManifestDbCommand,
  isManifestDbCommand,
};

// DSH backend owns a separate module/connection per project.
module.exports.__dispose=()=>{if(inner){inner.db.close();inner=null;}};
