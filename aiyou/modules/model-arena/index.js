import { guardContext } from '../../runtime.mjs';
/**
 * Host half — Model Arena.
 *
 * WHAT THE ARENA IS HERE. Upstream compares image/video models side by side, and
 * its own registry is not in the public repo. The equivalent is not invented: this
 * machine already reaches a real multi-model service over MCP (DramaTV), whose
 * `list_models` returned 16 text-to-image models with full parameter contracts.
 * So the Arena is a comparison harness over that catalogue.
 *
 * THE SAFETY RULE, AND WHY IT IS THE WHOLE DESIGN.
 * Every generation this service accepts creates a canvas node and spends credits,
 * and the service states plainly that a submission cannot be undone. An "arena"
 * that fans a prompt across eight models on a page load would spend the user's
 * balance as a side effect of looking at a panel. Therefore:
 *
 *   · nothing is ever submitted automatically — not on load, not on a timer;
 *   · `prepare` builds the exact payload and returns it for inspection, free;
 *   · `submit` refuses unless the caller passes `confirm: true`, and the client
 *     only sends that from a deliberate second click;
 *   · the impact (how many nodes, how many generations, which canvas) is computed
 *     and returned BEFORE anything can be submitted.
 *
 * MCP client: minimal Streamable-HTTP JSON-RPC. `initialize` + `tools/call` is all
 * this needs; the endpoint answers plain JSON, and no session id is required.
 *
 * Endpoints:
 *   GET  /aiyoucodex-dsh/model-arena/catalog?scene=      model catalogue (read-only)
 *   GET  /aiyoucodex-dsh/model-arena/targets             projects + canvases (read-only)
 *   POST /aiyoucodex-dsh/model-arena/prepare             build payload + impact (NO cost)
 *   POST /aiyoucodex-dsh/model-arena/submit              requires {confirm:true}
 *   GET  /aiyoucodex-dsh/model-arena/status?nodes=a,b     poll generations (read-only)
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

export const name = 'aiyou-enhancer-model-arena';

const BASE = '/aiyoucodex-dsh/model-arena';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

/**
 * The MCP endpoint, read from the profile's own patch file rather than duplicated,
 * so rotating the token in one place rotates it everywhere.
 */
async function resolveEndpoint() {
  // A dedicated endpoint must be configured explicitly for this application.
  return process.env.AIYOU_ARENA_MCP_URL || null;
}

const INSTANCE = Math.random().toString(36).slice(2, 10);
let lastServingWrite = 0;
let rpcId = 1;

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

/** One JSON-RPC call against the MCP endpoint. */
export async function callTool(toolName, args, { timeoutMs = 120000 } = {}) {
  const endpoint = await resolveEndpoint();
  if (!endpoint) throw new Error('模型竞技场尚未配置 AIYOU_ARENA_MCP_URL');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: rpcId++, method: 'tools/call', params: { name: toolName, arguments: args ?? {} } }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) throw new Error(`MCP HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.error) throw new Error(payload.error.message ?? 'MCP error');
  const content = payload.result?.content ?? [];
  const text = content.map((part) => part?.text ?? '').join('\n');
  const structured = payload.result?.structuredContent;
  let parsed = structured ?? null;
  if (!parsed && text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { text };
    }
  }
  if (parsed && parsed.ok === false) throw new Error(parsed.error ?? parsed.message ?? 'MCP tool reported failure');
  return parsed?.data ?? parsed;
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

function readBody(req, limit = 256 * 1024) {
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
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolvePromise({});
        return;
      }
      try {
        resolvePromise(JSON.parse(raw));
      } catch {
        rejectPromise(new Error('invalid JSON body'));
      }
    });
    req.on('error', rejectPromise);
  });
}

/** Scenes the Arena can compare, mapped to the MCP scene codes. */
export const SCENES = Object.freeze({
  image: { label: '图片', listScene: 'text_to_image', submitTool: 'batch_generate_image', key: 'canvasNodeIds' },
  video: { label: '视频', listScene: 'text_to_video', submitTool: 'batch_generate_video', key: 'canvasNodeIds' },
});

/** Build the exact submission payload — pure, no side effects. */
export function buildPrepare({ kind, projectId, canvasId, prompt, negativePrompt, models, defaults }) {
  const scene = SCENES[kind];
  if (!scene) throw new Error('kind must be image or video');
  if (!projectId || !canvasId) throw new Error('projectId and canvasId are required');
  const text = String(prompt ?? '').trim();
  if (!text) throw new Error('prompt is required');
  const list = Array.isArray(models) ? models.filter((model) => model && typeof model.model === 'string') : [];
  if (list.length === 0) throw new Error('at least one model is required');
  if (list.length > 20) throw new Error('batch_generate_* accepts at most 20 items');

  const items = list.map((entry) => ({
    model: entry.model,
    prompt: text,
    ...(entry.aspectRatio ? { aspectRatio: entry.aspectRatio } : {}),
    ...(entry.resolution ? { resolution: entry.resolution } : {}),
    ...(kind === 'video' && entry.duration ? { duration: entry.duration } : {}),
    ...(entry.title ? { title: entry.title } : {}),
    ...(negativePrompt ? { negativePrompt: String(negativePrompt).slice(0, 500) } : {}),
  }));
  const shared = {};
  if (defaults?.aspectRatio) shared.aspectRatio = defaults.aspectRatio;
  if (defaults?.resolution) shared.resolution = defaults.resolution;
  if (kind === 'video' && defaults?.duration) shared.duration = defaults.duration;
  if (negativePrompt) shared.negativePrompt = String(negativePrompt).slice(0, 500);
  const args = {
    projectId: Number(projectId),
    canvasId: Number(canvasId),
    items,
    ...(Object.keys(shared).length ? { defaults: shared } : {}),
    idempotencyKeyPrefix: `arena-${Date.now().toString(36)}`,
  };
  return {
    scene: scene.label,
    tool: scene.submitTool,
    args,
    // The impact is computed here so the client can show it BEFORE anything is sent.
    impact: {
      generations: items.length,
      nodes: items.length,
      canvasId: Number(canvasId),
      projectId: Number(projectId),
      note: `将新建 ${items.length} 个画布节点并扣除对应积分；该服务明确说明提交后无法自动撤销。`,
    },
    models: items.map((item) => item.model),
  };
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  const lifecycle = () => {
    void record({ phase: 'applied' });
    return () => {
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-model-arena:lifecycle');
  else lifecycle();

  if (!ctx.inject) return;
  ctx.inject(['webServer'], (webCtx) => {
    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/catalog`,
      handler: async (req, res) => {
        try {
          const url = new URL(req.url ?? '/', 'http://127.0.0.1');
          const kind = url.searchParams.get('kind') === 'video' ? 'video' : 'image';
          const projectId = Number(url.searchParams.get('projectId'));
          const canvasId = Number(url.searchParams.get('canvasId'));
          if (!projectId || !canvasId) return json(res, 400, { error: 'projectId and canvasId required' });
          const result = await callTool('list_models', { projectId, canvasId, sceneCode: SCENES[kind].listScene }, { timeoutMs: 60000 });
          const models = Array.isArray(result?.items) ? result.items : [];
          recordServing({ kind, models: models.length });
          json(res, 200, {
            kind,
            sceneCode: SCENES[kind].listScene,
            submitTool: SCENES[kind].submitTool,
            total: result?.total ?? models.length,
            hint: result?.hint ?? null,
            models: models.map((model) => ({
              model: model.modelCode,
              name: model.modelName ?? model.modelCode,
              aspectRatio: model.parameters?.aspectRatio ?? null,
              resolution: model.parameters?.resolution ?? null,
              duration: model.parameters?.duration ?? null,
              sourceCount: model.parameters?.sourceCount ?? null,
              inputConstraints: model.inputConstraints ?? null,
            })),
          });
        } catch (error) {
          json(res, 502, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-model-arena:catalog');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/targets`,
      handler: async (req, res) => {
        try {
          const projects = await callTool('list_projects', { size: 20 }, { timeoutMs: 45000 });
          const items = Array.isArray(projects?.items) ? projects.items : [];
          const first = items[0];
          let canvases = [];
          if (first) {
            const list = await callTool('list_canvases', { projectId: first.id }, { timeoutMs: 45000 });
            canvases = Array.isArray(list?.items) ? list.items : [];
          }
          recordServing({ projects: items.length, canvases: canvases.length });
          json(res, 200, {
            projects: items.map((project) => ({ id: project.id, name: project.name })),
            canvases: canvases.map((canvas) => ({ id: canvas.id, name: canvas.name, projectId: first?.id })),
          });
        } catch (error) {
          json(res, 502, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-model-arena:targets');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/prepare`,
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
          // Pure: builds the payload and reports the cost. Sends nothing.
          json(res, 200, { ok: true, prepared: buildPrepare(payload ?? {}) });
        } catch (error) {
          json(res, 400, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-model-arena:prepare');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/submit`,
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
          // The gate. Without an explicit confirm flag this endpoint does nothing at
          // all, so no client bug can spend credits by accident.
          if (payload?.confirm !== true) {
            return json(res, 428, { error: 'submission requires {confirm:true}', prepared: buildPrepare(payload ?? {}) });
          }
          const prepared = buildPrepare(payload ?? {});
          const result = await callTool(prepared.tool, prepared.args, { timeoutMs: 120000 });
          void record({
            phase: 'serving',
            lastSubmit: { at: Date.now(), tool: prepared.tool, models: prepared.models.length, nodeIds: result?.canvasNodeIds ?? null },
          });
          json(res, 200, { ok: true, submitted: true, tool: prepared.tool, impact: prepared.impact, result });
        } catch (error) {
          json(res, 502, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-model-arena:submit');

    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: `${BASE}/status`,
      handler: async (req, res) => {
        try {
          const url = new URL(req.url ?? '/', 'http://127.0.0.1');
          const projectId = Number(url.searchParams.get('projectId'));
          const canvasId = Number(url.searchParams.get('canvasId'));
          const nodes = (url.searchParams.get('nodes') ?? '').split(',').map((value) => value.trim()).filter(Boolean).slice(0, 50);
          if (!projectId || !canvasId || nodes.length === 0) return json(res, 400, { error: 'projectId, canvasId, nodes required' });
          const result = await callTool('get_generation_status', { projectId, canvasId, canvasNodeIds: nodes }, { timeoutMs: 60000 });
          const items = Array.isArray(result?.items) ? result.items : Array.isArray(result) ? result : [];
          recordServing({ polled: nodes.length, done: items.filter((item) => item?.status === 'SUCCESS').length });
          json(res, 200, { ok: true, total: nodes.length, items });
        } catch (error) {
          json(res, 502, { error: String(error?.message ?? error) });
        }
      },
    }), 'aiyoucodex-model-arena:status');
  });
}
