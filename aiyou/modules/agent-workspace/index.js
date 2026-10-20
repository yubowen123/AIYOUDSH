import { guardContext } from '../../runtime.mjs';
/** Source-owned native feature. Reads bounded metadata from its stated source and reports unknowns explicitly. */
import { mkdir, readFile, readdir, stat, writeFile, rename } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { AGENT_CATALOG, builtinAgentProfiles, createAgentDiscovery } from './agent-discovery.mjs';

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

export const name = 'aiyou-enhancer-agent-workspace';

const BASE = '/aiyoucodex-dsh/agent-workspace';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

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

async function dirExists(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function fileExists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function countChildren(path) {
  try {
    return (await readdir(path)).length;
  } catch {
    return 0;
  }
}

function cors(res) {
  // Native authentication and same-origin route policy.
  res.setHeader('access-control-allow-methods', 'GET,OPTIONS');
  res.setHeader('access-control-allow-headers', 'content-type');
  res.setHeader('cache-control', 'no-store');
}

function json(res, status, value) {
  cors(res);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
}

export function apply(ctx) {
  ctx=guardContext(ctx);
  let lastScan = null;

  const lifecycle = () => {
    void record({ phase: 'applied', catalog: AGENT_CATALOG.length });
    return () => {
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-agent-workspace:lifecycle');
  else lifecycle();

  if (!ctx.inject) return;
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
          const refresh = url.searchParams.get('refresh') === '1';
          if (!refresh) return json(res,200,{scope:'尚未运行本机检测',warnings:[],catalogSize:AGENT_CATALOG.length,summary:{installed:0,withContent:0,contentOnly:0},agents:[],semantics:{evidence:'点击检测后才读取受限目录的元数据；此处不会执行其他 Agent 或迁移内容。',cli:'程序证据、内容证据和登录状态分别展示。',scope:'未检测',caveat:'尚未验证本机安装状态。',shared:''}});

          const home = homedir();
          const scan = await createAgentDiscovery({ home }).scan({ refresh });
          const profiles = await builtinAgentProfiles(home);

          const agents = [];
          for (const profile of profiles) {
            const catalog = AGENT_CATALOG.find((entry) => entry.id === profile.id) ?? {};
            const evidence = scan.results?.[profile.id]?.evidence ?? [];
            const installed = Boolean(scan.results?.[profile.id]?.installed);

            // Content evidence, kept SEPARATE from program evidence on purpose.
            const contentRoots = await Promise.all(profile.contentRoots.map(async (root) => ({
              path: root,
              exists: await dirExists(root),
            })));
            const presentRoots = await Promise.all((profile.presenceRoots ?? []).map(async (root) => ({
              path: root,
              exists: await dirExists(root),
            })));
            const hasContent = contentRoots.some((entry) => entry.exists) || presentRoots.some((entry) => entry.exists);

            const skillRoots = await Promise.all((profile.skillRoots ?? []).map(async (root) => ({
              path: root,
              exists: await dirExists(root),
              count: await countChildren(root),
            })));
            const instructionPath = profile.instructionFile ? join(profile.root, profile.instructionFile) : '';
            const memoryPath = profile.memoryFile ? join(profile.root, profile.memoryFile) : '';

            agents.push({
              id: profile.id,
              name: profile.name,
              mark: profile.mark,
              shared: Boolean(catalog.shared),
              installed,
              contentOnly: hasContent && !installed,
              evidence: evidence.map((entry) => ({ kind: entry.kind, path: entry.path })),
              contentRoots,
              presenceRoots: presentRoots.filter((entry) => entry.exists),
              skillRoots: skillRoots.filter((entry) => entry.exists),
              skillCount: skillRoots.reduce((total, root) => total + (root.exists ? root.count : 0), 0),
              instructionFile: instructionPath ? { path: instructionPath, exists: await fileExists(instructionPath) } : null,
              memoryFile: memoryPath ? { path: memoryPath, exists: await fileExists(memoryPath) } : null,
              note: profile.note,
            });
          }

          lastScan = { at: Date.now(), agents: agents.length, installed: agents.filter((a) => a.installed).length };
          recordServing(lastScan);
          json(res, 200, {
            scope: scan.scope,
            warnings: scan.warnings ?? [],
            catalogSize: AGENT_CATALOG.length,
            summary: {
              installed: agents.filter((a) => a.installed).length,
              withContent: agents.filter((a) => a.installed || a.contentOnly).length,
              contentOnly: agents.filter((a) => a.contentOnly).length,
            },
            agents: agents.sort((a, b) => Number(b.installed) - Number(a.installed) || a.name.localeCompare(b.name)),
            // Repeated verbatim so no reader mistakes this for an install guarantee.
            semantics: {
              evidence: '程序证据（应用 / CLI）与内容证据分开收集；只有内容、没有程序时标注为"本地内容保留"。',
              cli: 'CLI 只检查文件与执行权限，不执行它，检测本身没有副作用。',
              scope: '不扫描当前项目，也不递归读取整盘私人文件。',
              caveat: '安装证据不代表已登录，也不代表内容格式未来不变。',
              // The counts look additive and are not. Upstream says the same thing.
              shared: '共享 Skills 可能被多个兼容 Agent 使用（例如 Kimi Code 与 Kimi Work 根目录相同），因此不能把各 Agent 的技能数相加当作本机唯一资源总量。',
            },
          });
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-agent-workspace:scan');
  });
}
