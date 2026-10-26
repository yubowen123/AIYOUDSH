import { guardContext } from '../../runtime.mjs';
/**
 * Host half — theme catalogue and selection.
 *
 * Themes are DATA (ported from AIYOUCODEX's theme packages, see themes.js); this
 * half only serves them and persists the choice, so adding a theme is a data
 * edit rather than a code change.
 *
 * Endpoints:
 *   GET  /aiyoucodex-dsh/theme          catalogue + active id
 *   GET  /aiyoucodex-dsh/theme/detail   full palette/design for one theme
 *   POST /aiyoucodex-dsh/theme          { id } persist the selection
 */
import { mkdir, readFile, readdir, writeFile, rename } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { DEFAULT_THEME_ID, SYSTEM_THEME_ID, THEMES, themeById } from './themes.js';
import { MINIMUM, PAIRS, scaffoldTheme, validateTheme } from './contract.mjs';
import { publicBackground } from './backgrounds.js';
import { readBackground,mediaResponse } from './media.mjs';
import {configureTheme,normalizeConfiguration,normalizeSystemConfiguration} from './configuration.mjs';

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

export const name = 'aiyou-enhancer-theme';

const BASE = '/aiyoucodex-dsh/theme';
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const ROOT = join(DSH_HOME, 'aiyou-enhancer');
const STATE_FILE = join(ROOT, 'theme.json');
const STATUS_DIR = join(ROOT, 'status');
const STATUS_FILE = join(STATUS_DIR, `${name}.json`);

const USER_THEME_DIR = join(ROOT, 'themes');

/**
 * Themes authored after install, one JSON file each.
 *
 * Built-ins come from a generated catalogue; anything a user (or the theme skill)
 * writes here is merged on top, keyed by `id`. A malformed file is REPORTED rather
 * than skipped silently — a theme that silently fails to appear is exactly the kind
 * of thing that makes an author doubt their own work.
 */
export async function loadUserThemes() {
  const themes = {};
  const problems = [];
  let entries = [];
  try {
    entries = await readdir(USER_THEME_DIR);
  } catch {
    return { themes, problems };
  }
  for (const entry of entries) {
    if (!entry.endsWith('.json')) continue;
    try {
      const value = JSON.parse(await readFile(join(USER_THEME_DIR, entry), 'utf8'));
      validateTheme(value);
      if (value.id === SYSTEM_THEME_ID) throw new Error('system 是 系统默认外观的保留标识');
      themes[value.id] = {
        id: value.id,
        label: value.label,
        mode: value.mode,
        language: value.language ?? '用户主题',
        primitives: value.primitives,
        semantic: value.semantic,
        radius: value.radius ?? {},
        spacing: value.spacing ?? {},
        borders: value.borders ?? {},
        pairs: value.pairs ?? [],
        controls: value.controls ?? {},
        background: publicBackground(value.background,value.id),
        // Kept on the host only; response projection below removes filenames.
        localBackground: value.background ?? null,
        user: true,
      };
    } catch (error) {
      problems.push({ file: entry, error: String(error?.message ?? error) });
    }
  }
  return { themes, problems };
}

/** Built-ins plus user themes; a user theme with a built-in id deliberately wins. */
async function allThemes() {
  const { themes: user, problems } = await loadUserThemes();
  return { themes: { ...THEMES, ...user }, problems };
}

function publicTheme(theme) {
  if(!theme)return theme;
  const {localBackground,...visible}=theme;return visible;
}

function detailFor(theme,state){return configureTheme(publicTheme(theme),state.options?.[theme.id]||{});}

const INSTANCE = Math.random().toString(36).slice(2, 10);
let lastServingWrite = 0;

async function record(entry) {
  try {
    await mkdir(STATUS_DIR, { recursive: true });
    const payload = { instance: INSTANCE, ...entry, pid: process.pid, at: new Date().toISOString() };
    await writeStatusAtomic(STATUS_FILE, `${JSON.stringify(payload, null, 2)}\n`);
  } catch {
    /* diagnostics are best-effort */
  }
}

function recordServing() {
  const now = Date.now();
  if (now - lastServingWrite < 10000) return;
  lastServingWrite = now;
  void record({ phase: 'serving' });
}

export async function readActiveThemeId() {
  return (await readThemeState()).active;
}

export async function readThemeState() {
  try {
    const state = JSON.parse(await readFile(STATE_FILE, 'utf8'));
    if(!state||typeof state!=='object'||Array.isArray(state)||typeof state.active!=='string')throw new Error('已保存主题配置格式无效');
    return {...state,revision:Number.isSafeInteger(state.revision)?state.revision:0,options:state.options&&typeof state.options==='object'&&!Array.isArray(state.options)?state.options:{}};
  } catch(error) {
    if(error.code!=='ENOENT')throw error;
  }
  return {active:DEFAULT_THEME_ID,revision:0,options:{}};
}

let stateWrite=Promise.resolve();
async function writeSelection(id,theme,configuration,ifRevision) {
  const next=stateWrite.catch(()=>{}).then(async()=>{
    const state=await readThemeState();
    if(ifRevision!==undefined&&(!Number.isSafeInteger(ifRevision)||ifRevision!==state.revision))throw Object.assign(new Error('配置已在其他窗口更新，请刷新后重试'),{status:409});
    const options={...state.options};
    if(configuration!==undefined){
      const normalize=value=>id===SYSTEM_THEME_ID?normalizeSystemConfiguration(value):normalizeConfiguration(value,theme);
      normalize(configuration);
      const previous=options[id]||{},merged={...previous,...configuration};
      for(const group of ['alpha','colors','background'])if(previous[group]||configuration[group])merged[group]={...previous[group],...configuration[group]};
      if(previous.canvas||configuration.canvas){merged.canvas={...previous.canvas,...configuration.canvas};for(const group of ['colors','opacity','background'])if(previous.canvas?.[group]||configuration.canvas?.[group])merged.canvas[group]={...previous.canvas?.[group],...configuration.canvas?.[group]};}
      options[id]=normalize(merged);
    }
    const result={...state,schemaVersion:3,active:id,revision:state.revision+1,options,at:new Date().toISOString()};
    await mkdir(ROOT,{recursive:true});await writeStatusAtomic(STATE_FILE,JSON.stringify(result,null,2)+'\n');return result;
  });stateWrite=next;return next;
}

/** Compact catalogue: the switcher only needs id/label/mode. */
export function catalogue(themes = THEMES) {
  return [{ id: SYSTEM_THEME_ID, label: '系统默认', mode: 'system', language: '恢复宿主外观，不覆盖原有亮暗设置', user: false }, ...Object.values(themes).map((theme) => ({
    id: theme.id,
    label: theme.label,
    mode: theme.mode,
    language: theme.language,
    backgroundNote:theme.background?.note??null,
    user: Boolean(theme.user),
  }))];
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

function readBody(req, limit = 64 * 1024) {
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
      const text = Buffer.concat(chunks).toString('utf8');
      if (!text) return resolvePromise({});
      try {
        resolvePromise(JSON.parse(text));
      } catch {
        rejectPromise(new Error('invalid JSON body'));
      }
    });
    req.on('error', rejectPromise);
  });
}

export function apply(ctx) {
  ctx = guardContext(ctx);
  const lifecycle = () => {
    void record({ phase: 'applied', themes: Object.keys(THEMES).length });
    return () => {
      void record({ phase: 'disposed' });
    };
  };
  if (typeof ctx.effect === 'function') ctx.effect(lifecycle, 'aiyoucodex-theme:lifecycle');
  else lifecycle();

  if (!ctx.inject) return;
  ctx.inject(['webServer'], (webCtx) => {
    const register = (label, route) =>
      webCtx.effect(() => webCtx.webServer.register(route), `aiyoucodex-theme:${label}`);

    register('catalogue', {
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
          const state = await readThemeState();const active=state.active;
          const { themes, problems } = await allThemes();
          const resolved = active === SYSTEM_THEME_ID || Object.hasOwn(themes,active) ? active : DEFAULT_THEME_ID;
          json(res, 200, {
            themes: catalogue(themes),
            active: resolved,
            detail: resolved === SYSTEM_THEME_ID ? null : detailFor(themes[resolved] ?? themeById(resolved),state),
            revision:state.revision,
            systemConfiguration:normalizeSystemConfiguration(state.options?.system||{}),
            userThemeProblems: problems,
            contract: { pairs: PAIRS.length, minimums: MINIMUM, scaffold: true },
          });
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    });

    register('state', {kind:'exact',path:BASE+'/state',handler:async(req,res)=>{
      if(req.method!=='GET'&&req.method!=='HEAD')return json(res,405,{error:'GET or HEAD only'});
      try{const state=await readThemeState();json(res,200,{active:state.active,revision:state.revision});}catch(error){json(res,500,{error:error.message||String(error)});}
    }});

    register('detail', {
      kind: 'exact',
      path: `${BASE}/detail`,
      handler: async (req, res) => {
        try {
          const url = new URL(req.url ?? BASE, 'http://127.0.0.1');
          const { themes } = await allThemes();
          const state=await readThemeState();const wanted = url.searchParams.get('id') ?? state.active;
          if (wanted === SYSTEM_THEME_ID) return json(res, 200, null);
          const theme = Object.hasOwn(themes,wanted)?themes[wanted]:null;
          if (!theme) return json(res, 404, { error: 'unknown theme' });
          json(res, 200, detailFor(theme,state));
        } catch (error) {
          json(res, 500, { error: String(error?.message ?? error) });
        }
      },
    });

    register('media', {
      kind:'exact',path:`${BASE}/media`,
      handler:async(req,res)=>{
        if(!['GET','HEAD'].includes(req.method))return json(res,405,{error:'GET or HEAD only'});
        try {
          const url=new URL(req.url??BASE,'http://127.0.0.1');const id=url.searchParams.get('id');
          const {themes:user}=await loadUserThemes();
          const media=await readBackground(id,USER_THEME_DIR,Object.hasOwn(user,id)?{background:user[id].localBackground}:null,url.searchParams.get('slot')||'poster');
          const response=mediaResponse(media,req.headers.range,req.method==='HEAD');res.writeHead(response.status,response.headers);res.end(response.body);
        }catch(error){json(res,error.status||500,{error:String(error?.message??error)});}
      },
    });

    /**
     * Author a theme. Two modes, because they answer different questions:
     *   validate — measure only, write nothing;
     *   install  — validate, then write the JSON so the theme appears in the picker.
     * A theme that fails the contrast contract is never written.
     */
    register('author', {
      kind: 'exact',
      path: `${BASE}/author`,
      handler: async (req, res) => {
        if (req.method === 'OPTIONS') {
          cors(res);
          res.writeHead(204);
          res.end();
          return;
        }
        if (req.method !== 'POST') return json(res, 405, { error: 'POST only' });
        try {
          const payload = await readBody(req, 512 * 1024);
          const action = String(payload?.action ?? 'validate');
          const theme = payload?.scaffold ? scaffoldTheme(payload.scaffold) : payload?.theme;
          const report = validateTheme(theme);
          if (action === 'scaffold') return json(res, 200, { ok: true, theme: scaffoldTheme(payload?.scaffold), report });
          if (action === 'validate') return json(res, 200, { ok: true, validated: true, report });
          if (action !== 'install') return json(res, 400, { error: 'action must be validate | install | scaffold' });
          await mkdir(USER_THEME_DIR, { recursive: true });
          await writeFile(join(USER_THEME_DIR, `${theme.id}.json`), `${JSON.stringify(theme, null, 2)}\n`);
          void record({ phase: 'serving', installedTheme: theme.id, pairs: report.length });
          json(res, 200, { ok: true, installed: theme.id, report });
        } catch (error) {
          json(res, 400, { error: String(error?.message ?? error), rejected: true });
        }
      },
    });

    register('select', {
      kind: 'exact',
      // MUST differ from the catalogue path: the webserver rejects a duplicate
      // path in the route table ("a collision is a misconfiguration"), and the
      // throw aborted this whole registration block, leaving every theme
      // endpoint 404 while the client reported only "Failed to fetch".
      path: `${BASE}/select`,
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
          const id = String(payload?.id ?? '');
          const { themes } = await allThemes();
          if (id !== SYSTEM_THEME_ID && (!/^[a-z][a-z0-9-]{1,60}$/u.test(id)||!Object.hasOwn(themes,id))) return json(res, 400, { error: 'unknown theme' });
          if(id===SYSTEM_THEME_ID&&payload.options!==undefined)normalizeSystemConfiguration(payload.options);
          const state=await writeSelection(id,id===SYSTEM_THEME_ID?null:themes[id],payload.options,payload.ifRevision);
          json(res, 200, { ok: true, active: id, detail: id === SYSTEM_THEME_ID ? null : detailFor(themes[id],state),revision:state.revision,systemConfiguration:normalizeSystemConfiguration(state.options?.system||{}) });
        } catch (error) {
          json(res, error.status||400, { error: String(error?.message ?? error) });
        }
      },
    });
  });
}
