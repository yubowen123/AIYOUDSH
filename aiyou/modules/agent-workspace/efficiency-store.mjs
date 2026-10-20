// Required storage primitives from AIYOUcodex (MIT). Policy storage is not copied.
import {randomUUID} from "node:crypto";
import {mkdir,open,readFile,rename,rm,stat} from "node:fs/promises";
import path from "node:path";
import {setTimeout as delay} from "node:timers/promises";
const MAX_STATE_BYTES=8*1024*1024;
export async function withEfficiencyFileLock(filePath, callback, { timeoutMs = 5000, platform = process.platform, mkdirLock = mkdir } = {}) {
  await mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
  const lockPath = `${filePath}.lock`;
  const token = randomUUID();
  const start = Date.now();
  const waitForLock = async () => {
    if (Date.now() - start > timeoutMs) { const error = new Error("Efficiency state is busy; retry later"); error.code = "EFFICIENCY_BUSY"; throw error; }
    await delay(12 + Math.floor(Math.random() * 15));
  };
  while (true) {
    let acquired = false;
    try {
      await mkdirLock(lockPath, { mode: 0o700 });
      acquired = true;
      await (await open(path.join(lockPath, "owner.json"), "wx", 0o600)).close();
      const handle = await open(path.join(lockPath, "owner.json"), "w", 0o600);
      try { await handle.writeFile(JSON.stringify({ pid: process.pid, token, createdAt: Date.now() })); } finally { await handle.close(); }
      break;
    } catch (error) {
      // NTFS may report a directory pending deletion as EPERM rather than
      // EEXIST while another writer releases its lock. Only retry acquisition:
      // never treat this as ownership, run the callback, or remove that lock.
      if (!acquired && platform === "win32" && ["EPERM", "EACCES", "EBUSY"].includes(error.code)) {
        await waitForLock(); continue;
      }
      if (error.code !== "EEXIST") throw error;
      let owner;
      try { owner = JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8")); } catch { /* An owner is still initializing; don't steal it. */ }
      let dead = false;
      if (Number.isInteger(owner?.pid) && owner.pid > 0) {
        try { process.kill(owner.pid, 0); } catch (error) { dead = error.code === "ESRCH"; }
      }
      if (dead) {
        const reaper = `${lockPath}.reaper`;
        let acquired = false;
        try {
          await mkdir(reaper, { mode: 0o700 }); acquired = true;
          const latest = JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8"));
          if (latest.token === owner.token) {
            const stale = `${lockPath}.stale-${token}`;
            await rename(lockPath, stale);
            await rm(stale, { recursive: true, force: true });
          }
        } catch (error) { if (!["ENOENT", "EEXIST"].includes(error.code)) throw error; }
        finally { if (acquired) await rm(reaper, { recursive: true, force: true }); }
      }
      await waitForLock();
    }
  }
  try { return await callback(); }
  finally {
    const owner = JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8"));
    if (owner.token === token) await rm(lockPath, { recursive: true, force: true });
  }
}
export async function readEfficiencyJson(filePath, fallback) {
  try {
    const info = await stat(filePath);
    if (info.size > MAX_STATE_BYTES) throw new Error("Efficiency state exceeds the size limit");
    return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/u, ""));
  } catch (error) { if (error.code === "ENOENT") return structuredClone(fallback); throw error; }
}
export async function writeEfficiencyJson(filePath, value) {
  const serialized = `${JSON.stringify(value, null, 2)}\n`;
  if (Buffer.byteLength(serialized) > MAX_STATE_BYTES) throw new Error("Efficiency state exceeds the size limit");
  const temporary = `${filePath}.tmp-${process.pid}-${randomUUID()}`;
  const handle = await open(temporary, "wx", 0o600);
  try { await handle.writeFile(serialized); await handle.sync(); } finally { await handle.close(); }
  try { await rename(temporary, filePath); } finally { await rm(temporary, { force: true }); }
}
