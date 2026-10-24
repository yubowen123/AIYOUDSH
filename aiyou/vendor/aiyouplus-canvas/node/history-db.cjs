/**
 * Electron 对齐 Tauri history_db（src-tauri/src/history_db.rs）
 * 使用 Node/Electron 内置 node:sqlite（DatabaseSync）。
 */

const fs = require('fs');
const path = require('path');
// DSH: explicit database path supplied by the per-project backend.
const app = {getPath(){throw new Error('DSH requires an explicit owned database path')}};

let DatabaseSync;
try {
  ({ DatabaseSync } = require('node:sqlite'));
} catch (e) {
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

function isPromptPreview(prompt) {
  const s = String(prompt || '');
  return s.endsWith('…') && [...s].length === 161;
}

function preferFullPrompt(a, b) {
  const ax = typeof a === 'string' ? a.trim() : '';
  const bx = typeof b === 'string' ? b.trim() : '';
  const aOk = ax || null;
  const bOk = bx || null;
  if (!aOk && !bOk) return null;
  if (aOk && !bOk) return aOk;
  if (!aOk && bOk) return bOk;
  const aPrev = isPromptPreview(aOk);
  const bPrev = isPromptPreview(bOk);
  if (aPrev && !bPrev) return bOk;
  if (bPrev && !aPrev) return aOk;
  return bOk.length > aOk.length ? bOk : aOk;
}

const RICH_EMPTY_SKIP = new Set([
  'url',
  'originalUrl',
  'thumbnailUrl',
  'prompt',
  '_assetId',
  '_ossRemoteUrl',
  '_ossThumbnailUrl',
  'localCacheUrl',
  'audioUrl',
]);

function mergePayload(incoming, existingRaw) {
  if (!existingRaw) return incoming;
  let existing;
  try {
    existing = JSON.parse(existingRaw);
  } catch {
    return incoming;
  }
  if (
    !existing ||
    typeof existing !== 'object' ||
    Array.isArray(existing) ||
    !incoming ||
    typeof incoming !== 'object' ||
    Array.isArray(incoming)
  ) {
    return incoming;
  }
  const out = { ...existing };
  for (const [k, v] of Object.entries(incoming)) {
    if (typeof v === 'string' && v === '' && RICH_EMPTY_SKIP.has(k)) {
      const prev = out[k];
      if (typeof prev === 'string' && prev !== '') continue;
    }
    if (k === 'prompt') {
      const merged = preferFullPrompt(
        typeof v === 'string' ? v : null,
        typeof out.prompt === 'string' ? out.prompt : null,
      );
      if (merged != null) out.prompt = merged;
      continue;
    }
    if (v == null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
}

function defaultDbPath() {
  const dir = app.getPath('userData');
  const historyDir = path.join(dir, 'history');
  fs.mkdirSync(historyDir, { recursive: true });
  const nested = path.join(historyDir, 'history.sqlite');
  const bare = path.join(dir, 'history.sqlite');
  if (!fs.existsSync(nested) && fs.existsSync(bare)) {
    try {
      fs.renameSync(bare, nested);
      for (const suffix of ['-wal', '-shm']) {
        const from = `${bare}${suffix}`;
        const to = `${nested}${suffix}`;
        if (fs.existsSync(from)) {
          try {
            fs.renameSync(from, to);
          } catch {
            // ignore sidecar
          }
        }
      }
      console.log('[history_db] migrated bare history.sqlite → history/');
    } catch (e) {
      console.warn('[history_db] migrate bare sqlite failed:', e);
    }
  }
  return nested;
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

    CREATE TABLE IF NOT EXISTS history_items (
      id TEXT PRIMARY KEY NOT NULL,
      payload TEXT NOT NULL,
      is_local INTEGER NOT NULL DEFAULT 0,
      is_oss INTEGER NOT NULL DEFAULT 0,
      item_type TEXT NOT NULL DEFAULT 'image',
      status TEXT NOT NULL DEFAULT 'completed',
      sort_ts INTEGER NOT NULL DEFAULT 0,
      model_name TEXT,
      prompt_preview TEXT,
      source_node_id TEXT,
      asset_id TEXT,
      updated_at INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_history_local_ts
      ON history_items(is_local, sort_ts DESC);
    CREATE INDEX IF NOT EXISTS idx_history_oss_ts
      ON history_items(is_oss, sort_ts DESC);
    CREATE INDEX IF NOT EXISTS idx_history_type_ts
      ON history_items(item_type, sort_ts DESC);
    CREATE INDEX IF NOT EXISTS idx_history_source_node
      ON history_items(source_node_id);

    CREATE TABLE IF NOT EXISTS history_prompts (
      id TEXT PRIMARY KEY NOT NULL,
      prompt_full TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS history_deleted_ids (
      id TEXT PRIMARY KEY NOT NULL,
      deleted_at INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS history_deleted_urls (
      url TEXT PRIMARY KEY NOT NULL,
      deleted_at INTEGER NOT NULL DEFAULT 0
    );
  `);
}

function requireDb() {
  if (!inner) throw new Error('history db not open');
  return inner;
}

function countItems(db) {
  try {
    const row = db.prepare('SELECT COUNT(*) AS c FROM history_items').get();
    return Number(row?.c) || 0;
  } catch {
    return 0;
  }
}

function importItemsFromLegacySqlite(db, legacyPath) {
  if (!fs.existsSync(legacyPath)) return 0;
  db.prepare('ATTACH DATABASE ? AS legacy_hist').run(legacyPath);
  try {
    let legacyCount = 0;
    try {
      legacyCount =
        Number(db.prepare('SELECT COUNT(*) AS c FROM legacy_hist.history_items').get()?.c) || 0;
    } catch (e) {
      throw new Error(`legacy count: ${e.message || e}`);
    }
    if (legacyCount <= 0) return 0;

    db.exec(
      'DELETE FROM history_deleted_ids WHERE id IN (SELECT id FROM legacy_hist.history_items)',
    );
    db.exec(`
      INSERT OR REPLACE INTO history_items(
        id, payload, is_local, is_oss, item_type, status, sort_ts,
        model_name, prompt_preview, source_node_id, asset_id, updated_at
      )
      SELECT
        id, payload, is_local, is_oss, item_type, status, sort_ts,
        model_name, prompt_preview, source_node_id, asset_id, updated_at
      FROM legacy_hist.history_items
    `);
    try {
      db.exec(`
        INSERT OR REPLACE INTO history_prompts(id, prompt_full)
        SELECT id, prompt_full FROM legacy_hist.history_prompts
        WHERE IFNULL(prompt_full, '') != ''
      `);
    } catch {
      // 旧库结构不同则忽略
    }
    return countItems(db);
  } finally {
    try {
      db.exec('DETACH DATABASE legacy_hist');
    } catch {
      // ignore
    }
  }
}

function tryRecoverEmptyDbFromLegacy(db, currentPath) {
  let count = countItems(db);
  if (count > 0) return count;

  const candidates = [];
  const parent = path.dirname(currentPath);
  if (parent && parent !== currentPath) {
    if (path.basename(parent).toLowerCase() === 'history') {
      const cacheRoot = path.dirname(parent);
      candidates.push(path.join(cacheRoot, 'history.sqlite'));
    }
    candidates.push(path.join(parent, 'history.sqlite'));
  }

  for (const legacy of candidates) {
    if (path.resolve(legacy) === path.resolve(currentPath)) continue;
    try {
      const n = importItemsFromLegacySqlite(db, legacy);
      if (n > 0) {
        console.log(`[history_db] recovered ${n} items from legacy ${legacy}`);
        return n;
      }
    } catch (e) {
      console.warn(`[history_db] recover from ${legacy} failed:`, e);
    }
  }
  return 0;
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

function upsertOne(db, item) {
  const id = String(item?.id || '').trim();
  if (!id) return;

  const existingRow = db.prepare('SELECT payload FROM history_items WHERE id = ?').get(id);
  const existing = existingRow?.payload != null ? String(existingRow.payload) : null;
  const merged = mergePayload(item.payload ?? {}, existing);
  const payload = JSON.stringify(merged);

  const promptRow = db.prepare('SELECT prompt_full FROM history_prompts WHERE id = ?').get(id);
  const existingPrompt =
    promptRow?.prompt_full != null
      ? String(promptRow.prompt_full)
      : typeof merged.prompt === 'string'
        ? merged.prompt
        : null;

  const promptFull = preferFullPrompt(
    pick(item, 'promptFull', 'prompt_full'),
    preferFullPrompt(
      typeof merged.prompt === 'string' ? merged.prompt : null,
      existingPrompt,
    ),
  );

  let promptPreview = pick(item, 'promptPreview', 'prompt_preview');
  if (promptPreview == null && promptFull) {
    const chars = [...promptFull];
    promptPreview =
      chars.length <= 160 ? promptFull : `${chars.slice(0, 160).join('')}…`;
  }

  const ts = nowMs();
  const isLocal = Number(pick(item, 'isLocal', 'is_local') ?? 0) || 0;
  const isOss = Number(pick(item, 'isOss', 'is_oss') ?? 0) || 0;
  const itemType = String(pick(item, 'itemType', 'item_type') || 'image');
  const status = String(item.status || 'completed');
  const sortTs = Number(pick(item, 'sortTs', 'sort_ts') || 0) || 0;
  const modelName = pick(item, 'modelName', 'model_name') ?? null;
  const sourceNodeId = pick(item, 'sourceNodeId', 'source_node_id') ?? null;
  const assetId = pick(item, 'assetId', 'asset_id') ?? null;

  db.prepare(
    `
    INSERT INTO history_items(
      id, payload, is_local, is_oss, item_type, status, sort_ts,
      model_name, prompt_preview, source_node_id, asset_id, updated_at
    ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      payload = excluded.payload,
      is_local = excluded.is_local,
      is_oss = excluded.is_oss,
      item_type = excluded.item_type,
      status = excluded.status,
      sort_ts = excluded.sort_ts,
      model_name = excluded.model_name,
      prompt_preview = excluded.prompt_preview,
      source_node_id = COALESCE(excluded.source_node_id, history_items.source_node_id),
      asset_id = COALESCE(excluded.asset_id, history_items.asset_id),
      updated_at = excluded.updated_at
  `,
  ).run(
    id,
    payload,
    isLocal,
    isOss,
    itemType,
    status,
    sortTs,
    modelName,
    promptPreview ?? null,
    sourceNodeId,
    assetId,
    ts,
  );

  if (promptFull && !isPromptPreview(promptFull)) {
    db.prepare(
      `
      INSERT INTO history_prompts(id, prompt_full) VALUES(?, ?)
      ON CONFLICT(id) DO UPDATE SET prompt_full = excluded.prompt_full
    `,
    ).run(id, promptFull);
  }
}

function modeColumn(storageMode) {
  return String(storageMode || '')
    .trim()
    .toLowerCase() === 'oss'
    ? 'is_oss'
    : 'is_local';
}

function ensureSqliteAvailable() {
  if (!DatabaseSync) {
    throw new Error('node:sqlite 不可用，无法打开 history db');
  }
}

function historyDbOpen(args = {}) {
  ensureSqliteAvailable();
  const dbPath = resolveDbPath(pick(args, 'dbPath', 'db_path'));

  if (inner && inner.path === dbPath) {
    let count = countItems(inner.db);
    if (count <= 0) {
      count = tryRecoverEmptyDbFromLegacy(inner.db, dbPath) || 0;
    }
    return { open: true, path: dbPath, count };
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
  let count = countItems(db);
  if (count <= 0) {
    count = tryRecoverEmptyDbFromLegacy(db, dbPath) || 0;
  }
  inner = { db, path: dbPath };
  console.log(`[history_db] opened ${dbPath} (count=${count})`);
  return { open: true, path: dbPath, count };
}

function historyDbStatus() {
  if (!inner) {
    return { open: false, path: null, count: 0 };
  }
  return {
    open: true,
    path: inner.path,
    count: countItems(inner.db),
  };
}

function historyDbGetMeta(args = {}) {
  const { db } = requireDb();
  const key = String(pick(args, 'key', 'key') ?? '');
  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get(key);
  return row?.value != null ? String(row.value) : null;
}

function historyDbSetMeta(args = {}) {
  const { db } = requireDb();
  const key = String(pick(args, 'key', 'key') ?? '');
  const value = String(pick(args, 'value', 'value') ?? '');
  db.prepare(
    `INSERT INTO meta(key, value) VALUES(?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(key, value);
}

function historyDbUpsert(args = {}) {
  const { db } = requireDb();
  const items = Array.isArray(args.items) ? args.items : [];
  return withTx(db, () => {
    let n = 0;
    for (const item of items) {
      upsertOne(db, item || {});
      n += 1;
    }
    return n;
  });
}

function historyDbQueryPage(args = {}) {
  const { db } = requireDb();
  const modeCol = modeColumn(pick(args, 'storageMode', 'storage_mode'));
  const offset = Math.max(0, Number(args.offset) || 0);
  const limit = Math.min(500, Math.max(1, Number(args.limit) || 1));
  const mediaRaw = pick(args, 'mediaType', 'media_type');
  const media = mediaRaw
    ? String(mediaRaw).trim().toLowerCase()
    : '';
  const mediaOk = media === 'image' || media === 'video' || media === 'audio' ? media : null;
  const searchRaw = args.search != null ? String(args.search).trim() : '';
  const search = searchRaw || null;

  let whereSql = `${modeCol} = 1 AND id NOT IN (SELECT id FROM history_deleted_ids)`;
  const params = [];
  if (mediaOk) {
    whereSql += ' AND item_type = ?';
    params.push(mediaOk);
  }
  if (search) {
    whereSql +=
      " AND (IFNULL(prompt_preview,'') LIKE ? OR IFNULL(model_name,'') LIKE ? OR id LIKE ?)";
    const like = `%${search}%`;
    params.push(like, like, like);
  }

  const total =
    Number(
      db.prepare(`SELECT COUNT(*) AS c FROM history_items WHERE ${whereSql}`).get(...params)?.c,
    ) || 0;

  const listParams = [...params, limit, offset];
  const rows = db
    .prepare(
      `SELECT payload FROM history_items WHERE ${whereSql} ORDER BY sort_ts DESC LIMIT ? OFFSET ?`,
    )
    .all(...listParams);

  const items = [];
  for (const row of rows) {
    try {
      items.push(JSON.parse(String(row.payload)));
    } catch {
      // skip bad row
    }
  }

  return {
    items,
    total,
    offset,
    limit,
    hasMore: offset + items.length < total,
  };
}

function historyDbGetById(args = {}) {
  const { db } = requireDb();
  const id = String(args.id || '').trim();
  if (!id) return null;
  const row = db
    .prepare(
      `SELECT payload FROM history_items WHERE id = ?
       AND id NOT IN (SELECT id FROM history_deleted_ids)`,
    )
    .get(id);
  if (!row?.payload) return null;
  try {
    return JSON.parse(String(row.payload));
  } catch {
    return null;
  }
}

function historyDbGetPrompt(args = {}) {
  const { db } = requireDb();
  const id = String(args.id || '').trim();
  if (!id) return null;
  const fromTable = db.prepare('SELECT prompt_full FROM history_prompts WHERE id = ?').get(id);
  if (fromTable?.prompt_full && String(fromTable.prompt_full).trim()) {
    return String(fromTable.prompt_full);
  }
  const fromPayload = db
    .prepare(`SELECT json_extract(payload, '$.prompt') AS prompt FROM history_items WHERE id = ?`)
    .get(id);
  const p = fromPayload?.prompt != null ? String(fromPayload.prompt) : '';
  return p.trim() ? p : null;
}

function historyDbDeleteIds(args = {}) {
  const { db } = requireDb();
  const ids = Array.isArray(args.ids) ? args.ids : [];
  return withTx(db, () => {
    const ts = nowMs();
    let n = 0;
    const tomb = db.prepare(
      `INSERT INTO history_deleted_ids(id, deleted_at) VALUES(?, ?)
       ON CONFLICT(id) DO UPDATE SET deleted_at = excluded.deleted_at`,
    );
    const delItem = db.prepare('DELETE FROM history_items WHERE id = ?');
    const delPrompt = db.prepare('DELETE FROM history_prompts WHERE id = ?');
    for (const raw of ids) {
      const id = String(raw || '').trim();
      if (!id) continue;
      tomb.run(id, ts);
      delItem.run(id);
      delPrompt.run(id);
      n += 1;
    }
    return n;
  });
}

function historyDbAddDeletedUrls(args = {}) {
  const { db } = requireDb();
  const urls = Array.isArray(args.urls) ? args.urls : [];
  const ts = nowMs();
  let n = 0;
  const stmt = db.prepare(
    `INSERT INTO history_deleted_urls(url, deleted_at) VALUES(?, ?)
     ON CONFLICT(url) DO UPDATE SET deleted_at = excluded.deleted_at`,
  );
  for (const raw of urls) {
    const url = String(raw || '').trim();
    if (!url) continue;
    stmt.run(url, ts);
    n += 1;
  }
  return n;
}

function historyDbAddDeletedIds(args = {}) {
  const { db } = requireDb();
  const ids = Array.isArray(args.ids) ? args.ids : [];
  const ts = nowMs();
  let n = 0;
  const stmt = db.prepare(
    `INSERT INTO history_deleted_ids(id, deleted_at) VALUES(?, ?)
     ON CONFLICT(id) DO UPDATE SET deleted_at = excluded.deleted_at`,
  );
  for (const raw of ids) {
    const id = String(raw || '').trim();
    if (!id) continue;
    stmt.run(id, ts);
    n += 1;
  }
  return n;
}

function historyDbRemoveDeletedIds(args = {}) {
  const { db } = requireDb();
  const ids = Array.isArray(args.ids) ? args.ids : [];
  let n = 0;
  const stmt = db.prepare('DELETE FROM history_deleted_ids WHERE id = ?');
  for (const raw of ids) {
    const id = String(raw || '').trim();
    if (!id) continue;
    n += Number(stmt.run(id).changes) || 0;
  }
  return n;
}

function historyDbRemoveDeletedUrls(args = {}) {
  const { db } = requireDb();
  const urls = Array.isArray(args.urls) ? args.urls : [];
  const statement = db.prepare('DELETE FROM history_deleted_urls WHERE url = ?');
  let removed = 0;
  for (const raw of urls) {
    const url = String(raw || '').trim();
    if (url) removed += Number(statement.run(url).changes) || 0;
  }
  return removed;
}

function historyDbListDeletedIds() {
  const { db } = requireDb();
  return db
    .prepare('SELECT id FROM history_deleted_ids ORDER BY deleted_at ASC')
    .all()
    .map((r) => String(r.id));
}

function historyDbListDeletedUrls() {
  const { db } = requireDb();
  return db
    .prepare('SELECT url FROM history_deleted_urls ORDER BY deleted_at ASC')
    .all()
    .map((r) => String(r.url));
}

function historyDbUpsertPrompts(args = {}) {
  const { db } = requireDb();
  const prompts = Array.isArray(args.prompts) ? args.prompts : [];
  return withTx(db, () => {
    let n = 0;
    const read = db.prepare('SELECT prompt_full FROM history_prompts WHERE id = ?');
    const write = db.prepare(
      `INSERT INTO history_prompts(id, prompt_full) VALUES(?, ?)
       ON CONFLICT(id) DO UPDATE SET prompt_full = excluded.prompt_full`,
    );
    for (const p of prompts) {
      const id = String(p?.id || '').trim();
      const full = String(pick(p || {}, 'promptFull', 'prompt_full') || '').trim();
      if (!id || !full || isPromptPreview(full)) continue;
      const existing = read.get(id)?.prompt_full;
      const merged = preferFullPrompt(full, existing != null ? String(existing) : null);
      if (!merged || isPromptPreview(merged)) continue;
      write.run(id, merged);
      n += 1;
    }
    return n;
  });
}

function historyDbIsDeletedId(args = {}) {
  const { db } = requireDb();
  const id = String(args.id || '').trim();
  const row = db.prepare('SELECT COUNT(*) AS c FROM history_deleted_ids WHERE id = ?').get(id);
  return (Number(row?.c) || 0) > 0;
}

function historyDbReconcileLiveTombstones() {
  const { db } = requireDb();
  const result = db
    .prepare(
      `DELETE FROM history_deleted_ids
       WHERE id IN (SELECT id FROM history_items)`,
    )
    .run();
  return Number(result?.changes) || 0;
}

function deleteByModeQuery(sqlSelect) {
  const { db } = requireDb();
  return withTx(db, () => {
    const ids = db
      .prepare(sqlSelect)
      .all()
      .map((r) => String(r.id));
    const ts = nowMs();
    const tomb = db.prepare(
      `INSERT INTO history_deleted_ids(id, deleted_at) VALUES(?, ?)
       ON CONFLICT(id) DO UPDATE SET deleted_at = excluded.deleted_at`,
    );
    const delPrompt = db.prepare('DELETE FROM history_prompts WHERE id = ?');
    const delItem = db.prepare('DELETE FROM history_items WHERE id = ?');
    for (const id of ids) {
      tomb.run(id, ts);
      delPrompt.run(id);
      delItem.run(id);
    }
    return ids;
  });
}

function historyDbClearStorageMode(args = {}) {
  const col = modeColumn(pick(args, 'storageMode', 'storage_mode'));
  return deleteByModeQuery(`SELECT id FROM history_items WHERE ${col} = 1`);
}

function historyDbDeleteFailedByMode(args = {}) {
  const col = modeColumn(pick(args, 'storageMode', 'storage_mode'));
  return deleteByModeQuery(
    `SELECT id FROM history_items WHERE ${col} = 1 AND status = 'failed'`,
  );
}

function historyDbPathExists(args = {}) {
  const p = String(args.path || '').trim();
  return Boolean(p && fs.existsSync(p));
}

/**
 * @param {string} cmd
 * @param {Record<string, unknown>} args
 */
function handleHistoryDbCommand(cmd, args) {
  switch (cmd) {
    case 'history_db_open':
      return historyDbOpen(args);
    case 'history_db_status':
      return historyDbStatus();
    case 'history_db_get_meta':
      return historyDbGetMeta(args);
    case 'history_db_set_meta':
      historyDbSetMeta(args);
      return null;
    case 'history_db_upsert':
      return historyDbUpsert(args);
    case 'history_db_query_page':
      return historyDbQueryPage(args);
    case 'history_db_get_by_id':
      return historyDbGetById(args);
    case 'history_db_get_prompt':
      return historyDbGetPrompt(args);
    case 'history_db_delete_ids':
      return historyDbDeleteIds(args);
    case 'history_db_add_deleted_ids':
      return historyDbAddDeletedIds(args);
    case 'history_db_add_deleted_urls':
      return historyDbAddDeletedUrls(args);
    case 'history_db_remove_deleted_ids':
      return historyDbRemoveDeletedIds(args);
    case 'history_db_remove_deleted_urls':
      return historyDbRemoveDeletedUrls(args);
    case 'history_db_list_deleted_ids':
      return historyDbListDeletedIds();
    case 'history_db_list_deleted_urls':
      return historyDbListDeletedUrls();
    case 'history_db_upsert_prompts':
      return historyDbUpsertPrompts(args);
    case 'history_db_is_deleted_id':
      return historyDbIsDeletedId(args);
    case 'history_db_reconcile_live_tombstones':
      return historyDbReconcileLiveTombstones();
    case 'history_db_clear_storage_mode':
      return historyDbClearStorageMode(args);
    case 'history_db_delete_failed_by_mode':
      return historyDbDeleteFailedByMode(args);
    case 'history_db_path_exists':
      return historyDbPathExists(args);
    default:
      return undefined;
  }
}

function isHistoryDbCommand(cmd) {
  return typeof cmd === 'string' && cmd.startsWith('history_db_');
}

module.exports = {
  handleHistoryDbCommand,
  isHistoryDbCommand,
};

// DSH backend owns a separate module/connection per project.
module.exports.__dispose=()=>{if(inner){inner.db.close();inner=null;}};
