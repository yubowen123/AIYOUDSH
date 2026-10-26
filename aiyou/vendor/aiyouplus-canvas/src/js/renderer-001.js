var K5r = Object.defineProperty;

var FVt = e => {
  throw TypeError(e);
};

var Q5r = (e, t, n) => t in e ? K5r(e, t, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: n
}) : e[t] = n;

var On = (e, t, n) => Q5r(e, typeof t != "symbol" ? t + "" : t, n),
  qZe = (e, t, n) => t.has(e) || FVt("Cannot " + n);

var te = (e, t, n) => (qZe(e, t, "read from private field"), n ? n.call(e) : t.get(e)),
  qt = (e, t, n) => t.has(e) ? FVt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n),
  yt = (e, t, n, r) => (qZe(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n),
  Gt = (e, t, n) => (qZe(e, t, "access private method"), n);

var rm = (e, t, n, r) => ({
  set _(a) {
    yt(e, t, a, n);
  },
  get _() {
    return te(e, t, r);
  }
});

function Y5r(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const a in r) if (a !== "default" && !(a in e)) {
        const i = Object.getOwnPropertyDescriptor(r, a);
        i && Object.defineProperty(e, a, i.get ? i : {
          enumerable: !0,
          get: () => r[a]
        });
      }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
    value: "Module"
  }));
}

(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) r(a);
  new MutationObserver(a => {
    for (const i of a) if (i.type === "childList") for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, {
    childList: !0,
    subtree: !0
  });
  function n(a) {
    const i = {};
    return a.integrity && (i.integrity = a.integrity), a.referrerPolicy && (i.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? i.credentials = "include" : a.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
  }
  function r(a) {
    if (a.ep) return;
    a.ep = !0;
    const i = n(a);
    fetch(a.href, i);
  }
})();

const X5r = "modulepreload",
  J5r = function (e, t) {
    return new URL(e, t).href;
  },
  zVt = {},
  Ie = function (t, n, r) {
    let a = Promise.resolve();
    if (n && n.length > 0) {
      let o = function (u) {
        return Promise.all(u.map(h => Promise.resolve(h).then(p => ({
          status: "fulfilled",
          value: p
        }), p => ({
          status: "rejected",
          reason: p
        }))));
      };
      const s = document.getElementsByTagName("link"),
        l = document.querySelector("meta[property=csp-nonce]"),
        d = (l == null ? void 0 : l.nonce) || (l == null ? void 0 : l.getAttribute("nonce"));
      a = o(n.map(u => {
        if (u = J5r(u, r), u in zVt) return;
        zVt[u] = !0;
        const h = u.endsWith(".css"),
          p = h ? '[rel="stylesheet"]' : "";
        if (!!r) for (let y = s.length - 1; y >= 0; y--) {
          const b = s[y];
          if (b.href === u && (!h || b.rel === "stylesheet")) return;
        } else if (document.querySelector(`link[href="${u}"]${p}`)) return;
        const f = document.createElement("link");
        if (f.rel = h ? "stylesheet" : X5r, h || (f.as = "script"), f.crossOrigin = "", f.href = u, d && f.setAttribute("nonce", d), document.head.appendChild(f), h) return new Promise((y, b) => {
          f.addEventListener("load", y), f.addEventListener("error", () => b(new Error(`Unable to preload CSS for ${u}`)));
        });
      }));
    }
    function i(o) {
      const s = new Event("vite:preloadError", {
        cancelable: !0
      });
      if (s.payload = o, window.dispatchEvent(s), !s.defaultPrevented) throw o;
    }
    return a.then(o => {
      for (const s of o || []) s.status === "rejected" && i(s.reason);
      return t().catch(i);
    });
  };

function h1(e, t, n, r) {
  if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}

function Zte(e, t, n, r, a) {
  if (typeof t == "function" ? e !== t || !0 : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(e, n), n;
}

var kG, a4, uee, TEe, E9e;

const a_ = "__TAURI_TO_IPC_KEY__";

function M4t(e, t = !1) {
  return window.__TAURI_INTERNALS__.transformCallback(e, t);
}

class P4t {
  constructor(t) {
    kG.set(this, void 0), a4.set(this, 0), uee.set(this, []), TEe.set(this, void 0), Zte(this, kG, t || (() => {})), this.id = M4t(n => {
      const r = n.index;
      if ("end" in n) {
        r == h1(this, a4, "f") ? this.cleanupCallback() : Zte(this, TEe, r);
        return;
      }
      const a = n.message;
      if (r == h1(this, a4, "f")) {
        for (h1(this, kG, "f").call(this, a), Zte(this, a4, h1(this, a4, "f") + 1); h1(this, a4, "f") in h1(this, uee, "f");) {
          const i = h1(this, uee, "f")[h1(this, a4, "f")];
          h1(this, kG, "f").call(this, i), delete h1(this, uee, "f")[h1(this, a4, "f")], Zte(this, a4, h1(this, a4, "f") + 1);
        }
        h1(this, a4, "f") === h1(this, TEe, "f") && this.cleanupCallback();
      } else h1(this, uee, "f")[r] = a;
    });
  }
  cleanupCallback() {
    window.__TAURI_INTERNALS__.unregisterCallback(this.id);
  }
  set onmessage(t) {
    Zte(this, kG, t);
  }
  get onmessage() {
    return h1(this, kG, "f");
  }
  [(kG = new WeakMap(), a4 = new WeakMap(), uee = new WeakMap(), TEe = new WeakMap(), a_)]() {
    return `__CHANNEL__:${this.id}`;
  }
  toJSON() {
    return this[a_]();
  }
}

class Bht {
  constructor(t, n, r) {
    this.plugin = t, this.event = n, this.channelId = r;
  }
  async unregister() {
    return Fr(`plugin:${this.plugin}|remove_listener`, {
      event: this.event,
      channelId: this.channelId
    });
  }
}

async function Z5r(e, t, n) {
  const r = new P4t(n);
  try {
    return await Fr(`plugin:${e}|register_listener`, {
      event: t,
      handler: r
    }), new Bht(e, t, r.id);
  } catch {
    return await Fr(`plugin:${e}|registerListener`, {
      event: t,
      handler: r
    }), new Bht(e, t, r.id);
  }
}

async function eIr(e) {
  return Fr(`plugin:${e}|check_permissions`);
}

async function tIr(e) {
  return Fr(`plugin:${e}|request_permissions`);
}

async function Fr(e, t = {}, n) {
  return window.__TAURI_INTERNALS__.invoke(e, t, n);
}

function SSn(e, t = "asset") {
  return window.__TAURI_INTERNALS__.convertFileSrc(e, t);
}

class fVe {
  get rid() {
    return h1(this, E9e, "f");
  }
  constructor(t) {
    E9e.set(this, void 0), Zte(this, E9e, t);
  }
  async close() {
    return Fr("plugin:resources|close", {
      rid: this.rid
    });
  }
}

E9e = new WeakMap();

function R4t() {
  return !!(globalThis || window).isTauri;
}

const sd = Object.freeze(Object.defineProperty({
  __proto__: null,
  Channel: P4t,
  PluginListener: Bht,
  Resource: fVe,
  SERIALIZE_TO_IPC_FN: a_,
  addPluginListener: Z5r,
  checkPermissions: eIr,
  convertFileSrc: SSn,
  invoke: Fr,
  isTauri: R4t,
  requestPermissions: tIr,
  transformCallback: M4t
}, Symbol.toStringTag, {
  value: "Module"
}));

var Ep;

(function (e) {
  e[e.Audio = 1] = "Audio", e[e.Cache = 2] = "Cache", e[e.Config = 3] = "Config", e[e.Data = 4] = "Data", e[e.LocalData = 5] = "LocalData", e[e.Document = 6] = "Document", e[e.Download = 7] = "Download", e[e.Picture = 8] = "Picture", e[e.Public = 9] = "Public", e[e.Video = 10] = "Video", e[e.Resource = 11] = "Resource", e[e.Temp = 12] = "Temp", e[e.AppConfig = 13] = "AppConfig", e[e.AppData = 14] = "AppData", e[e.AppLocalData = 15] = "AppLocalData", e[e.AppCache = 16] = "AppCache", e[e.AppLog = 17] = "AppLog", e[e.Desktop = 18] = "Desktop", e[e.Executable = 19] = "Executable", e[e.Font = 20] = "Font", e[e.Home = 21] = "Home", e[e.Runtime = 22] = "Runtime", e[e.Template = 23] = "Template";
})(Ep || (Ep = {}));

async function nIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.AppConfig
  });
}

async function ISn() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.AppData
  });
}

async function rIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.AppLocalData
  });
}

async function aIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.AppCache
  });
}

async function iIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Audio
  });
}

async function oIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Cache
  });
}

async function sIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Config
  });
}

async function lIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Data
  });
}

async function cIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Desktop
  });
}

async function Fht() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Document
  });
}

async function dIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Download
  });
}

async function uIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Executable
  });
}

async function hIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Font
  });
}

async function pIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Home
  });
}

async function mIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.LocalData
  });
}

async function fIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Picture
  });
}

async function gIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Public
  });
}

async function yIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Resource
  });
}

async function bIr(e) {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Resource,
    path: e
  });
}

async function vIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Runtime
  });
}

async function wIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Template
  });
}

async function xIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Video
  });
}

async function _Ir() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.AppLog
  });
}

async function kIr() {
  return Fr("plugin:path|resolve_directory", {
    directory: Ep.Temp
  });
}

function AIr() {
  return window.__TAURI_INTERNALS__.plugins.path.sep;
}

function SIr() {
  return window.__TAURI_INTERNALS__.plugins.path.delimiter;
}

async function IIr(...e) {
  return Fr("plugin:path|resolve", {
    paths: e
  });
}

async function CIr(e) {
  return Fr("plugin:path|normalize", {
    path: e
  });
}

async function Vu(...e) {
  return Fr("plugin:path|join", {
    paths: e
  });
}

async function EIr(e) {
  return Fr("plugin:path|dirname", {
    path: e
  });
}

async function TIr(e) {
  return Fr("plugin:path|extname", {
    path: e
  });
}

async function MIr(e, t) {
  return Fr("plugin:path|basename", {
    path: e,
    ext: t
  });
}

async function PIr(e) {
  return Fr("plugin:path|is_absolute", {
    path: e
  });
}

const wT = Object.freeze(Object.defineProperty({
  __proto__: null,
  get BaseDirectory() {
    return Ep;
  },
  appCacheDir: aIr,
  appConfigDir: nIr,
  appDataDir: ISn,
  appLocalDataDir: rIr,
  appLogDir: _Ir,
  audioDir: iIr,
  basename: MIr,
  cacheDir: oIr,
  configDir: sIr,
  dataDir: lIr,
  delimiter: SIr,
  desktopDir: cIr,
  dirname: EIr,
  documentDir: Fht,
  downloadDir: dIr,
  executableDir: uIr,
  extname: TIr,
  fontDir: hIr,
  homeDir: pIr,
  isAbsolute: PIr,
  join: Vu,
  localDataDir: mIr,
  normalize: CIr,
  pictureDir: fIr,
  publicDir: gIr,
  resolve: IIr,
  resolveResource: bIr,
  resourceDir: yIr,
  runtimeDir: vIr,
  sep: AIr,
  tempDir: kIr,
  templateDir: wIr,
  videoDir: xIr
}, Symbol.toStringTag, {
  value: "Module"
}));

var zht;

(function (e) {
  e[e.Start = 0] = "Start", e[e.Current = 1] = "Current", e[e.End = 2] = "End";
})(zht || (zht = {}));

function N4t(e) {
  return {
    isFile: e.isFile,
    isDirectory: e.isDirectory,
    isSymlink: e.isSymlink,
    size: e.size,
    mtime: e.mtime !== null ? new Date(e.mtime) : null,
    atime: e.atime !== null ? new Date(e.atime) : null,
    birthtime: e.birthtime !== null ? new Date(e.birthtime) : null,
    readonly: e.readonly,
    fileAttributes: e.fileAttributes,
    dev: e.dev,
    ino: e.ino,
    mode: e.mode,
    nlink: e.nlink,
    uid: e.uid,
    gid: e.gid,
    rdev: e.rdev,
    blksize: e.blksize,
    blocks: e.blocks
  };
}

function RIr(e) {
  const t = new Uint8ClampedArray(e),
    n = t.byteLength;
  let r = 0;
  for (let a = 0; a < n; a++) {
    const i = t[a];
    r *= 256, r += i;
  }
  return r;
}

class j4t extends fVe {
  async read(t) {
    if (t.byteLength === 0) return 0;
    const n = await Fr("plugin:fs|read", {
        rid: this.rid,
        len: t.byteLength
      }),
      r = RIr(n.slice(-8)),
      a = n instanceof ArrayBuffer ? new Uint8Array(n) : n;
    return t.set(a.slice(0, a.length - 8)), r === 0 ? null : r;
  }
  async seek(t, n) {
    return await Fr("plugin:fs|seek", {
      rid: this.rid,
      offset: t,
      whence: n
    });
  }
  async stat() {
    const t = await Fr("plugin:fs|fstat", {
      rid: this.rid
    });
    return N4t(t);
  }
  async truncate(t) {
    await Fr("plugin:fs|ftruncate", {
      rid: this.rid,
      len: t
    });
  }
  async write(t) {
    return await Fr("plugin:fs|write", {
      rid: this.rid,
      data: t
    });
  }
}

async function NIr(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  const n = await Fr("plugin:fs|create", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
  return new j4t(n);
}

async function CSn(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  const n = await Fr("plugin:fs|open", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
  return new j4t(n);
}

async function ESn(e, t, n) {
  if (e instanceof URL && e.protocol !== "file:" || t instanceof URL && t.protocol !== "file:") throw new TypeError("Must be a file URL.");
  await Fr("plugin:fs|copy_file", {
    fromPath: e instanceof URL ? e.toString() : e,
    toPath: t instanceof URL ? t.toString() : t,
    options: n
  });
}

async function qc(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  await Fr("plugin:fs|mkdir", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
}

async function i3(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  return await Fr("plugin:fs|read_dir", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
}

async function Au(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  const n = await Fr("plugin:fs|read_file", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
  return n instanceof ArrayBuffer ? new Uint8Array(n) : Uint8Array.from(n);
}

async function jIr(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  const n = await Fr("plugin:fs|read_text_file", {
      path: e instanceof URL ? e.toString() : e,
      options: t
    }),
    r = n instanceof ArrayBuffer ? n : Uint8Array.from(n);
  return new TextDecoder().decode(r);
}

async function DIr(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  const n = e instanceof URL ? e.toString() : e;
  return await Promise.resolve({
    path: n,
    rid: null,
    async next() {
      this.rid === null && (this.rid = await Fr("plugin:fs|read_text_file_lines", {
        path: n,
        options: t
      }));
      const r = await Fr("plugin:fs|read_text_file_lines_next", {
          rid: this.rid
        }),
        a = r instanceof ArrayBuffer ? new Uint8Array(r) : Uint8Array.from(r),
        i = a[a.byteLength - 1] === 1;
      return i ? (this.rid = null, {
        value: null,
        done: i
      }) : {
        value: new TextDecoder().decode(a.slice(0, a.byteLength - 1)),
        done: i
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  });
}

async function hk(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  await Fr("plugin:fs|remove", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
}

async function iY(e, t, n) {
  if (e instanceof URL && e.protocol !== "file:" || t instanceof URL && t.protocol !== "file:") throw new TypeError("Must be a file URL.");
  await Fr("plugin:fs|rename", {
    oldPath: e instanceof URL ? e.toString() : e,
    newPath: t instanceof URL ? t.toString() : t,
    options: n
  });
}

async function oY(e, t) {
  const n = await Fr("plugin:fs|stat", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
  return N4t(n);
}

async function LIr(e, t) {
  const n = await Fr("plugin:fs|lstat", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
  return N4t(n);
}

async function OIr(e, t, n) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  await Fr("plugin:fs|truncate", {
    path: e instanceof URL ? e.toString() : e,
    len: t,
    options: n
  });
}

async function wE(e, t, n) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  if (t instanceof ReadableStream) {
    const r = await CSn(e, {
        read: !1,
        create: !0,
        write: !0,
        ...n
      }),
      a = t.getReader();
    try {
      for (;;) {
        const {
          done: i,
          value: o
        } = await a.read();
        if (i) break;
        await r.write(o);
      }
    } finally {
      a.releaseLock(), await r.close();
    }
  } else await Fr("plugin:fs|write_file", t, {
    headers: {
      path: encodeURIComponent(e instanceof URL ? e.toString() : e),
      options: JSON.stringify(n)
    }
  });
}

async function ab(e, t, n) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  const r = new TextEncoder();
  await Fr("plugin:fs|write_text_file", r.encode(t), {
    headers: {
      path: encodeURIComponent(e instanceof URL ? e.toString() : e),
      options: JSON.stringify(n)
    }
  });
}

async function Fp(e, t) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  return await Fr("plugin:fs|exists", {
    path: e instanceof URL ? e.toString() : e,
    options: t
  });
}

class BIr extends fVe {}

async function TSn(e, t, n) {
  const r = Array.isArray(e) ? e : [e];
  for (const s of r) if (s instanceof URL && s.protocol !== "file:") throw new TypeError("Must be a file URL.");
  const a = new P4t();
  a.onmessage = t;
  const i = await Fr("plugin:fs|watch", {
      paths: r.map(s => s instanceof URL ? s.toString() : s),
      options: n,
      onEvent: a
    }),
    o = new BIr(i);
  return () => {
    o.close();
  };
}

async function FIr(e, t, n) {
  return await TSn(e, t, {
    delayMs: 2e3,
    ...n
  });
}

async function zIr(e, t, n) {
  return await TSn(e, t, {
    ...n,
    delayMs: void 0
  });
}

async function UIr(e) {
  if (e instanceof URL && e.protocol !== "file:") throw new TypeError("Must be a file URL.");
  return await Fr("plugin:fs|size", {
    path: e instanceof URL ? e.toString() : e
  });
}

const oc = Object.freeze(Object.defineProperty({
    __proto__: null,
    get BaseDirectory() {
      return Ep;
    },
    FileHandle: j4t,
    get SeekMode() {
      return zht;
    },
    copyFile: ESn,
    create: NIr,
    exists: Fp,
    lstat: LIr,
    mkdir: qc,
    open: CSn,
    readDir: i3,
    readFile: Au,
    readTextFile: jIr,
    readTextFileLines: DIr,
    remove: hk,
    rename: iY,
    size: UIr,
    stat: oY,
    truncate: OIr,
    watch: FIr,
    watchImmediate: zIr,
    writeFile: wE,
    writeTextFile: ab
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  $Ir = "qiaodoumayi_cache_directory_config",
  NDe = "qiaodoumayi_pending_cache_switch",
  UVt = ".workspace-browser-state.json";

function KZe(e) {
  return ["qiaodoumayi_chat_sessions", "qiaodoumayi_history_deleted", "qiaodoumayi_canvas_state", "qiaodoumayi_project_memory", "qiaodoumayi_script_", "qiaodoumayi_storyboard_", "qiaodoumayi_generation_", "qiaodoumayi_studio_generation_", "studio-generation-workspace", "qiaodoumayi_studio_home_local_skill_roots", "qiaodoumayi_studio_home_local_skill_workspaces", "qiaodoumayi_local_skill_roots", "qiaodoumayi_local_skill_workspaces", "qiaodoumayi_studio_home_tools:", "workspace-browser-session:", "qiaodoumayi_production_history", "qiaodoumayi_production_job_queue", "qiaodoumayi_production_run_checkpoints", "qiaodoumayi_production_recipes", "qiaodoumayi_production_triggers", "qiaodoumayi_production_recipe_pool", "qiaodoumayi_material_lib_", "qiaodoumayi_global_oss_upload_dedup", "qiaodoumayi_local_edit_"].some(n => e.startsWith(n)) || ["qiaodoumayi_history", "qiaodoumayi_project_name", "qiaodoumayi_projects", "qiaodoumayi_studio_home_chat", "qiaodoumayi_studio_home_chat_threads", "qiaodoumayi_studio_home_threads", "qiaodoumayi_studio_home_conversation_view", "qiaodoumayi_studio_home_local_skill", "qiaodoumayi_studio_home_local_skill_last_root", "qiaodoumayi_local_skill_last_root", "qiaodoumayi_studio_home_workspaces_isolated_v1", "qiaodoumayi_batch_item_category_map", "qiaodoumayi_batch_manage_favorites"].includes(e);
}

const Uht = new Set();

function gVe(e) {
  return Uht.add(e), () => {
    Uht.delete(e);
  };
}

async function MSn() {
  for (const e of Uht) await e();
}

function $Vt(e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e.key(n);
    r && (t[r] = e.getItem(r));
  }
  return t;
}

async function GIr(e, t) {
  const n = e.getItem(NDe);
  if (!n) return !1;
  const {
    source: r,
    target: a
  } = JSON.parse(n);
  if (!r || !a) throw new Error("缓存目录切换信息无效。");
  const i = $Vt(e),
    o = Object.fromEntries(Object.entries(i).filter(([u]) => KZe(u)));
  await t.write(`${r}/${UVt}`, JSON.stringify(o));
  const s = await t.read(`${a}/${UVt}`),
    l = s === null ? {} : JSON.parse(s);
  if (!l || typeof l != "object" || Array.isArray(l) || Object.values(l).some(u => typeof u != "string")) throw new Error("所选目录的工作区记录无法读取，已保留原目录。");
  const d = {};
  for (const [u, h] of Object.entries(i)) {
    if (h !== "__QDMY_DISK_V1__" || KZe(u)) continue;
    const p = await t.read(`${r}/localStorage/${u.replace(/[^a-zA-Z0-9._-]/g, "_")}.json`);
    if (p === null) throw new Error("原目录中的设置无法读取，请重新连接原目录后再切换。");
    d[u] = p;
  }
  try {
    for (const u of Object.keys(o)) e.removeItem(u);
    for (const [u, h] of Object.entries(l)) KZe(u) && e.setItem(u, h);
    for (const [u, h] of Object.entries(d)) e.setItem(u, h);
    e.setItem($Ir, JSON.stringify({
      enabled: !0,
      directoryPath: a
    })), e.removeItem(NDe);
  } catch (u) {
    for (const h of Object.keys($Vt(e))) h in i || e.removeItem(h);
    for (const [h, p] of Object.entries(i)) e.setItem(h, p);
    throw u;
  }
  return !0;
}

const D4t = "qiaodoumayi_teaching_mode",
  jDe = "qiaodoumayi_pending_teaching_mode";

function ch() {
  try {
    return localStorage.getItem(D4t) === "1";
  } catch {
    return !1;
  }
}

function Nx(e) {
  return !ch() || e.teaching === !0;
}

function P$() {
  return ch() ? {
    teaching: !0
  } : {};
}

function N4e(e, t) {
  const n = new Map(t.map(r => [r.id, r]));
  return e.map(r => {
    const a = n.get(r.id);
    return a != null && a.teaching || !a && ch() ? {
      ...r,
      teaching: !0
    } : r;
  });
}

function L4t(e, t) {
  return ch() ? [...e.filter(n => !Nx(n)), ...t] : t;
}

function _S(e) {
  return ch() ? `${e}_teaching` : e;
}

const pz = e => e.startsWith("project_teaching_"),
  O4t = e => !ch() || pz(e.id);

function PSn(e, t) {
  const n = e.getItem(jDe);
  n !== "0" && n !== "1" || (e.setItem(D4t, n), t.removeItem("qiaodoumayi_studio_view"), e.removeItem(jDe));
}

const VIr = Object.freeze(Object.defineProperty({
  __proto__: null,
  PENDING_TEACHING_MODE_KEY: jDe,
  TEACHING_MODE_KEY: D4t,
  applyPendingTeachingMode: PSn,
  isProjectVisibleInTeaching: O4t,
  isTeachingMode: ch,
  isTeachingProjectId: pz,
  isTeachingVisible: Nx,
  markTeachingRecords: N4e,
  mergeTeachingRecords: L4t,
  teachingDraftKey: _S,
  teachingTag: P$
}, Symbol.toStringTag, {
  value: "Module"
}));

async function HIr() {
  try {
    (await GIr(localStorage, {
      read: async t => (await Fp(t)) ? new TextDecoder().decode(await Au(t)) : null,
      write: async (t, n) => {
        await Fr("write_text_file_atomic", {
          path: t,
          body: n
        });
      }
    })) && sessionStorage.removeItem("qiaodoumayi_studio_view");
  } catch (e) {
    localStorage.removeItem(NDe), alert(`缓存目录未切换，仍使用原目录。${e instanceof Error ? e.message : String(e)}`);
  }
  PSn(localStorage, sessionStorage), await Ie(() => Promise.resolve().then(() => dva), void 0, import.meta.url);
}

HIr();

var MEe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function j4e(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}

var QZe = {
    exports: {}
  },
  qpe = {},
  YZe = {
    exports: {}
  },
  dd = {};

/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var GVt;

function WIr() {
  if (GVt) return dd;
  GVt = 1;
  var e = Symbol.for("react.element"),
    t = Symbol.for("react.portal"),
    n = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    a = Symbol.for("react.profiler"),
    i = Symbol.for("react.provider"),
    o = Symbol.for("react.context"),
    s = Symbol.for("react.forward_ref"),
    l = Symbol.for("react.suspense"),
    d = Symbol.for("react.memo"),
    u = Symbol.for("react.lazy"),
    h = Symbol.iterator;
  function p(O) {
    return O === null || typeof O != "object" ? null : (O = h && O[h] || O["@@iterator"], typeof O == "function" ? O : null);
  }
  var m = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {}
    },
    f = Object.assign,
    y = {};
  function b(O, L, D) {
    this.props = O, this.context = L, this.refs = y, this.updater = D || m;
  }
  b.prototype.isReactComponent = {}, b.prototype.setState = function (O, L) {
    if (typeof O != "object" && typeof O != "function" && O != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, O, L, "setState");
  }, b.prototype.forceUpdate = function (O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function v() {}
  v.prototype = b.prototype;
  function _(O, L, D) {
    this.props = O, this.context = L, this.refs = y, this.updater = D || m;
  }
  var w = _.prototype = new v();
  w.constructor = _, f(w, b.prototype), w.isPureReactComponent = !0;
  var k = Array.isArray,
    A = Object.prototype.hasOwnProperty,
    S = {
      current: null
    },
    C = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    };
  function I(O, L, D) {
    var U,
      H = {},
      Y = null,
      K = null;
    if (L != null) for (U in L.ref !== void 0 && (K = L.ref), L.key !== void 0 && (Y = "" + L.key), L) A.call(L, U) && !C.hasOwnProperty(U) && (H[U] = L[U]);
    var W = arguments.length - 2;
    if (W === 1) H.children = D;else if (1 < W) {
      for (var Q = Array(W), q = 0; q < W; q++) Q[q] = arguments[q + 2];
      H.children = Q;
    }
    if (O && O.defaultProps) for (U in W = O.defaultProps, W) H[U] === void 0 && (H[U] = W[U]);
    return {
      $$typeof: e,
      type: O,
      key: Y,
      ref: K,
      props: H,
      _owner: S.current
    };
  }
  function E(O, L) {
    return {
      $$typeof: e,
      type: O.type,
      key: L,
      ref: O.ref,
      props: O.props,
      _owner: O._owner
    };
  }
  function M(O) {
    return typeof O == "object" && O !== null && O.$$typeof === e;
  }
  function T(O) {
    var L = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + O.replace(/[=:]/g, function (D) {
      return L[D];
    });
  }
  var P = /\/+/g;
  function R(O, L) {
    return typeof O == "object" && O !== null && O.key != null ? T("" + O.key) : L.toString(36);
  }
  function j(O, L, D, U, H) {
    var Y = typeof O;
    (Y === "undefined" || Y === "boolean") && (O = null);
    var K = !1;
    if (O === null) K = !0;else switch (Y) {
      case "string":
      case "number":
        K = !0;
        break;
      case "object":
        switch (O.$$typeof) {
          case e:
          case t:
            K = !0;
        }
    }
    if (K) return K = O, H = H(K), O = U === "" ? "." + R(K, 0) : U, k(H) ? (D = "", O != null && (D = O.replace(P, "$&/") + "/"), j(H, L, D, "", function (q) {
      return q;
    })) : H != null && (M(H) && (H = E(H, D + (!H.key || K && K.key === H.key ? "" : ("" + H.key).replace(P, "$&/") + "/") + O)), L.push(H)), 1;
    if (K = 0, U = U === "" ? "." : U + ":", k(O)) for (var W = 0; W < O.length; W++) {
      Y = O[W];
      var Q = U + R(Y, W);
      K += j(Y, L, D, Q, H);
    } else if (Q = p(O), typeof Q == "function") for (O = Q.call(O), W = 0; !(Y = O.next()).done;) Y = Y.value, Q = U + R(Y, W++), K += j(Y, L, D, Q, H);else if (Y === "object") throw L = String(O), Error("Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead.");
    return K;
  }
  function B(O, L, D) {
    if (O == null) return O;
    var U = [],
      H = 0;
    return j(O, U, "", "", function (Y) {
      return L.call(D, Y, H++);
    }), U;
  }
  function F(O) {
    if (O._status === -1) {
      var L = O._result;
      L = L(), L.then(function (D) {
        (O._status === 0 || O._status === -1) && (O._status = 1, O._result = D);
      }, function (D) {
        (O._status === 0 || O._status === -1) && (O._status = 2, O._result = D);
      }), O._status === -1 && (O._status = 0, O._result = L);
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var N = {
      current: null
    },
    G = {
      transition: null
    },
    z = {
      ReactCurrentDispatcher: N,
      ReactCurrentBatchConfig: G,
      ReactCurrentOwner: S
    };
  function V() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return dd.Children = {
    map: B,
    forEach: function (O, L, D) {
      B(O, function () {
        L.apply(this, arguments);
      }, D);
    },
    count: function (O) {
      var L = 0;
      return B(O, function () {
        L++;
      }), L;
    },
    toArray: function (O) {
      return B(O, function (L) {
        return L;
      }) || [];
    },
    only: function (O) {
      if (!M(O)) throw Error("React.Children.only expected to receive a single React element child.");
      return O;
    }
  }, dd.Component = b, dd.Fragment = n, dd.Profiler = a, dd.PureComponent = _, dd.StrictMode = r, dd.Suspense = l, dd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z, dd.act = V, dd.cloneElement = function (O, L, D) {
    if (O == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + O + ".");
    var U = f({}, O.props),
      H = O.key,
      Y = O.ref,
      K = O._owner;
    if (L != null) {
      if (L.ref !== void 0 && (Y = L.ref, K = S.current), L.key !== void 0 && (H = "" + L.key), O.type && O.type.defaultProps) var W = O.type.defaultProps;
      for (Q in L) A.call(L, Q) && !C.hasOwnProperty(Q) && (U[Q] = L[Q] === void 0 && W !== void 0 ? W[Q] : L[Q]);
    }
    var Q = arguments.length - 2;
    if (Q === 1) U.children = D;else if (1 < Q) {
      W = Array(Q);
      for (var q = 0; q < Q; q++) W[q] = arguments[q + 2];
      U.children = W;
    }
    return {
      $$typeof: e,
      type: O.type,
      key: H,
      ref: Y,
      props: U,
      _owner: K
    };
  }, dd.createContext = function (O) {
    return O = {
      $$typeof: o,
      _currentValue: O,
      _currentValue2: O,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null
    }, O.Provider = {
      $$typeof: i,
      _context: O
    }, O.Consumer = O;
  }, dd.createElement = I, dd.createFactory = function (O) {
    var L = I.bind(null, O);
    return L.type = O, L;
  }, dd.createRef = function () {
    return {
      current: null
    };
  }, dd.forwardRef = function (O) {
    return {
      $$typeof: s,
      render: O
    };
  }, dd.isValidElement = M, dd.lazy = function (O) {
    return {
      $$typeof: u,
      _payload: {
        _status: -1,
        _result: O
      },
      _init: F
    };
  }, dd.memo = function (O, L) {
    return {
      $$typeof: d,
      type: O,
      compare: L === void 0 ? null : L
    };
  }, dd.startTransition = function (O) {
    var L = G.transition;
    G.transition = {};
    try {
      O();
    } finally {
      G.transition = L;
    }
  }, dd.unstable_act = V, dd.useCallback = function (O, L) {
    return N.current.useCallback(O, L);
  }, dd.useContext = function (O) {
    return N.current.useContext(O);
  }, dd.useDebugValue = function () {}, dd.useDeferredValue = function (O) {
    return N.current.useDeferredValue(O);
  }, dd.useEffect = function (O, L) {
    return N.current.useEffect(O, L);
  }, dd.useId = function () {
    return N.current.useId();
  }, dd.useImperativeHandle = function (O, L, D) {
    return N.current.useImperativeHandle(O, L, D);
  }, dd.useInsertionEffect = function (O, L) {
    return N.current.useInsertionEffect(O, L);
  }, dd.useLayoutEffect = function (O, L) {
    return N.current.useLayoutEffect(O, L);
  }, dd.useMemo = function (O, L) {
    return N.current.useMemo(O, L);
  }, dd.useReducer = function (O, L, D) {
    return N.current.useReducer(O, L, D);
  }, dd.useRef = function (O) {
    return N.current.useRef(O);
  }, dd.useState = function (O) {
    return N.current.useState(O);
  }, dd.useSyncExternalStore = function (O, L, D) {
    return N.current.useSyncExternalStore(O, L, D);
  }, dd.useTransition = function () {
    return N.current.useTransition();
  }, dd.version = "18.3.1", dd;
}

var VVt;

function D4e() {
  return VVt || (VVt = 1, YZe.exports = WIr()), YZe.exports;
}

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var HVt;

function qIr() {
  if (HVt) return qpe;
  HVt = 1;
  var e = D4e(),
    t = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    r = Object.prototype.hasOwnProperty,
    a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    };
  function o(s, l, d) {
    var u,
      h = {},
      p = null,
      m = null;
    d !== void 0 && (p = "" + d), l.key !== void 0 && (p = "" + l.key), l.ref !== void 0 && (m = l.ref);
    for (u in l) r.call(l, u) && !i.hasOwnProperty(u) && (h[u] = l[u]);
    if (s && s.defaultProps) for (u in l = s.defaultProps, l) h[u] === void 0 && (h[u] = l[u]);
    return {
      $$typeof: t,
      type: s,
      key: p,
      ref: m,
      props: h,
      _owner: a.current
    };
  }
  return qpe.Fragment = n, qpe.jsx = o, qpe.jsxs = o, qpe;
}

var WVt;

function KIr() {
  return WVt || (WVt = 1, QZe.exports = qIr()), QZe.exports;
}

var c = KIr(),
  g = D4e();

const Ia = j4e(g);

async function WE(e = {}) {
  return typeof e == "object" && Object.freeze(e), await Fr("plugin:dialog|open", {
    options: e
  });
}

async function QIr(e = {}) {
  return typeof e == "object" && Object.freeze(e), await Fr("plugin:dialog|save", {
    options: e
  });
}

async function YIr(e, t) {
  var r, a, i;
  const n = typeof t == "string" ? {
    title: t
  } : t;
  return await Fr("plugin:dialog|ask", {
    message: e.toString(),
    title: (r = n == null ? void 0 : n.title) == null ? void 0 : r.toString(),
    kind: n == null ? void 0 : n.kind,
    yesButtonLabel: (a = n == null ? void 0 : n.okLabel) == null ? void 0 : a.toString(),
    noButtonLabel: (i = n == null ? void 0 : n.cancelLabel) == null ? void 0 : i.toString()
  });
}

const Sb = Object.freeze(Object.defineProperty({
    __proto__: null,
    ask: YIr,
    open: WE,
    save: QIr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  P1 = new Map(),
  $7 = new Map(),
  T9e = new Map(),
  DDe = new Map();

function Cle(e) {
  const t = String(e || "").trim();
  if (!t.startsWith("blob:") || typeof document > "u") return !1;
  try {
    const n = document.querySelectorAll("img");
    for (let i = 0; i < n.length; i++) {
      const o = n[i];
      if (o.src === t || o.currentSrc === t) return !0;
    }
    const r = document.querySelectorAll("video");
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      if (o.src === t || o.currentSrc === t) return !0;
    }
    const a = document.querySelectorAll("audio");
    for (let i = 0; i < a.length; i++) {
      const o = a[i];
      if (o.src === t || o.currentSrc === t) return !0;
    }
  } catch {}
  return !1;
}

const XIr = 6e4;

let qVt = !1;

function JIr() {
  qVt || typeof window > "u" || (qVt = !0, setInterval(() => {
    try {
      const {
        purged: e
      } = jSn({
        maxAgeMs: 9e4,
        maxEntries: 64,
        protectDomRendered: !0
      });
      e > 0 && Ie(async () => {
        const {
          dispatchMediaBlobUrlsInvalidated: t
        } = await Promise.resolve().then(() => mjt);
        return {
          dispatchMediaBlobUrlsInvalidated: t
        };
      }, void 0, import.meta.url).then(({
        dispatchMediaBlobUrlsInvalidated: t
      }) => t()).catch(() => {});
    } catch {}
  }, XIr));
}

function Ewe(e) {
  const t = (DDe.get(e) || 0) + 1;
  return DDe.set(e, t), t;
}

function sY(e, t = !1) {
  if (e.retired = !0, !(!t && (e.refs > 0 || e.borrowed))) {
    try {
      URL.revokeObjectURL(e.url);
    } catch {}
    $7.delete(e.url);
  }
}

async function RSn(e, t) {
  JIr();
  const n = P1.get(e);
  if (n && !n.retired) return n.lastAccessed = Date.now(), n;
  const r = T9e.get(e);
  if (r) return r;
  const a = DDe.get(e) || 0,
    i = (async () => {
      const o = await t();
      if (!o || o.size <= 0) return null;
      const s = URL.createObjectURL(o);
      if ((DDe.get(e) || 0) !== a) return URL.revokeObjectURL(s), null;
      const l = P1.get(e);
      if (l && !l.retired) return URL.revokeObjectURL(s), l.lastAccessed = Date.now(), l;
      const d = {
        key: e,
        url: s,
        blob: o,
        refs: 0,
        borrowed: !1,
        retired: !1,
        generation: a,
        lastAccessed: Date.now()
      };
      return P1.set(e, d), $7.set(s, d), d;
    })().finally(() => {
      T9e.delete(e);
    });
  return T9e.set(e, i), i;
}

async function B4t(e, t) {
  const n = await RSn(e, t);
  if (!n || n.retired) return null;
  n.refs += 1, n.lastAccessed = Date.now();
  let r = !1;
  return {
    url: n.url,
    managed: !0,
    release() {
      r || (r = !0, n.refs = Math.max(0, n.refs - 1), n.retired && n.refs === 0 && !n.borrowed && sY(n));
    }
  };
}

async function Ele(e, t) {
  const n = await RSn(e, t);
  return !n || n.retired ? null : (n.borrowed = !0, n.lastAccessed = Date.now(), n.url);
}

function F4t(e) {
  const t = P1.get(e);
  return !t || t.retired ? null : (t.lastAccessed = Date.now(), t.url);
}

function R$(e) {
  return !!e && $7.has(e);
}

function z4t(e) {
  if (!e) return null;
  const t = $7.get(e);
  return !t || t.retired || !t.blob || t.blob.size <= 0 ? null : (t.lastAccessed = Date.now(), t.blob);
}

function ZIr(e) {
  if (!e) return null;
  const t = $7.get(e);
  if (!t || t.retired || !t.blob || t.blob.size <= 0) return null;
  $7.delete(t.url);
  try {
    URL.revokeObjectURL(t.url);
  } catch {}
  const n = URL.createObjectURL(t.blob);
  return t.url = n, t.lastAccessed = Date.now(), $7.set(n, t), n;
}

function M9e(e) {
  if (!(!e || !e.startsWith("blob:")) && !R$(e)) try {
    URL.revokeObjectURL(e);
  } catch {}
}

function Xne(e) {
  Ewe(e);
  const t = P1.get(e);
  P1.delete(e), t && (t.borrowed || t.refs === 0 ? sY(t, !0) : sY(t));
}

function NSn(e) {
  const t = String(e || "").trim();
  if (!t.startsWith("blob:")) return !1;
  const n = $7.get(t);
  return n ? (Ewe(n.key), P1.delete(n.key), sY(n, !0), !0) : !1;
}

function Twe(e) {
  const t = (e == null ? void 0 : e.force) === !0;
  for (const [n, r] of P1) Ewe(n), P1.delete(n), sY(r, t);
}

function jSn(e) {
  const t = (e == null ? void 0 : e.maxAgeMs) ?? 9e4,
    n = (e == null ? void 0 : e.maxEntries) ?? 48,
    r = (e == null ? void 0 : e.forceBorrowed) === !0,
    a = (e == null ? void 0 : e.protectDomRendered) !== !1,
    i = Date.now();
  let o = 0;
  for (const [s, l] of [...P1.entries()]) {
    const d = i - l.lastAccessed >= t,
      u = l.refs <= 0 && (!l.borrowed || r || a && !Cle(l.url));
    d && u && (Ewe(s), P1.delete(s), sY(l, !0), o += 1);
  }
  if (P1.size > n) {
    const s = [...P1.values()].sort((l, d) => l.lastAccessed - d.lastAccessed);
    for (const l of s) {
      if (P1.size <= n) break;
      l.refs > 0 && !r || l.borrowed && !r && !(a && !Cle(l.url)) || (Ewe(l.key), P1.delete(l.key), sY(l, !0), o += 1);
    }
  }
  return {
    purged: o,
    remaining: P1.size
  };
}

function eCr() {
  let e = 0,
    t = 0;
  return $7.forEach(n => {
    e += n.refs, n.borrowed && (t += 1);
  }), {
    entries: P1.size,
    inFlight: T9e.size,
    leased: e,
    borrowed: t
  };
}

const eU = Object.freeze(Object.defineProperty({
    __proto__: null,
    acquireLocalObjectUrl: B4t,
    clearLocalObjectUrls: Twe,
    getBorrowedLocalObjectUrl: Ele,
    getLocalObjectUrlRegistryStats: eCr,
    getManagedLocalObjectBlob: z4t,
    invalidateLocalObjectUrl: Xne,
    isBlobUrlRenderedInDom: Cle,
    isManagedLocalObjectUrl: R$,
    peekLocalObjectUrl: F4t,
    purgeIdleLocalObjectUrls: jSn,
    rebindManagedLocalObjectUrl: ZIr,
    releaseLocalObjectUrlByUrl: NSn,
    safeRevokeObjectURL: M9e
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  tCr = "QiaodoumayiAssetCache",
  nCr = 1,
  ev = "assets";

function PEe(e) {
  return `local-asset:${e}`;
}

async function rCr(e, t) {
  if (e.size !== t.size || e.type !== t.type) return !1;
  if (e === t) return !0;
  const [n, r] = await Promise.all([crypto.subtle.digest("SHA-256", await e.arrayBuffer()), crypto.subtle.digest("SHA-256", await t.arrayBuffer())]),
    a = new Uint8Array(n),
    i = new Uint8Array(r);
  return a.length === i.length && a.every((o, s) => o === i[s]);
}

function REe(e) {
  return e.startsWith("preview_") || e.startsWith("thumb_") || e.endsWith("_thumbnail");
}

class aCr {
  constructor() {
    On(this, "db", null);
    On(this, "initPromise", null);
    On(this, "initFailed", !1);
    On(this, "listeners", new Set());
    On(this, "localCacheMirrorListenerActive", !1);
  }
  setLocalCacheMirrorListenerActive(t) {
    this.localCacheMirrorListenerActive = t;
  }
  addListener(t) {
    return this.listeners.add(t), () => this.listeners.delete(t);
  }
  notifyListeners(t, n) {
    this.listeners.forEach(r => {
      try {
        r(t, n);
      } catch (a) {
        console.error("[AssetStore] Listener error:", a);
      }
    });
  }
  async _saveToLocalCacheAwaitable(t, n, r, a, i, o) {
    try {
      const {
        localCacheManager: s,
        ensureCacheRootReadyForWrite: l
      } = await Ie(async () => {
        const {
          localCacheManager: u,
          ensureCacheRootReadyForWrite: h
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: u,
          ensureCacheRootReadyForWrite: h
        };
      }, void 0, import.meta.url);
      if (await l(), !s.isAvailable()) return !1;
      const d = await s.saveAsset(t, n, r, a, i, o);
      return d && (console.log(`[AssetStore] ✅ Saved to resource cache dir: ${t}`), await s.flushManifest().catch(() => {})), d;
    } catch {
      return !1;
    }
  }
  _saveToLocalCache(t, n, r, a, i, o) {
    this._saveToLocalCacheAwaitable(t, n, r, a, i, o);
  }
  inferCacheSubdirFromManifestPath(t) {
    const n = t.split("/")[0];
    if (n === "local" || n === "thumbnails") return n;
  }
  async init() {
    if (this.initFailed) {
      console.warn("[AssetStore] IndexedDB init previously failed, running in degraded mode");
      return;
    }
    if (this.db) return;
    if (this.initPromise) return this.initPromise;
    const t = new Promise((r, a) => {
        setTimeout(() => {
          a(new Error("IndexedDB initialization timeout (5s)"));
        }, 5e3);
      }),
      n = new Promise((r, a) => {
        try {
          if (typeof indexedDB > "u") {
            console.warn("[AssetStore] IndexedDB not available"), r();
            return;
          }
          const i = indexedDB.open(tCr, nCr);
          i.onerror = () => {
            console.error("[AssetStore] Failed to open IndexedDB:", i.error), a(i.error);
          }, i.onsuccess = () => {
            this.db = i.result, console.log("[AssetStore] IndexedDB initialized successfully"), r();
          }, i.onupgradeneeded = o => {
            const s = o.target.result;
            if (!s.objectStoreNames.contains(ev)) {
              const l = s.createObjectStore(ev, {
                keyPath: "id"
              });
              l.createIndex("remoteUrl", "remoteUrl", {
                unique: !1
              }), l.createIndex("cachedAt", "cachedAt", {
                unique: !1
              }), console.log("[AssetStore] Object store created");
            }
          };
        } catch (i) {
          console.error("[AssetStore] Error during IndexedDB init:", i), a(i);
        }
      });
    return this.initPromise = Promise.race([n, t]).catch(r => {
      console.error("[AssetStore] IndexedDB init failed:", r), this.initFailed = !0;
    }), this.initPromise;
  }
  invalidateBlobUrlCacheFor(t) {
    Xne(PEe(t));
  }
  async saveBlobAsset(t, n, r, a, i) {
    try {
      await this.init();
      const o = await this.getAsset(t);
      if (o && !(i != null && i.forceReplace)) {
        const y = await rCr(o.blob, n).catch(() => !1);
        if (o.remoteUrl === r && y) return console.log("[AssetStore] Asset already cached (same content):", t), !0;
      }
      o && this.invalidateBlobUrlCacheFor(t);
      const s = n.type || "application/octet-stream",
        l = a !== void 0 ? a : (o == null ? void 0 : o.cacheSubdir) || (REe(t) ? "thumbnails" : void 0),
        d = l === "local" || t.startsWith("local_") || t.startsWith("local_clip_"),
        u = (i == null ? void 0 : i.idbOnly) === !0;
      let h = !1;
      d && !u && (h = await this._saveToLocalCacheAwaitable(t, n, s, r, l, {
        forceReplace: (i == null ? void 0 : i.forceReplace) === !0 || !!o
      }), !h && this.isTauriEnvironment() && console.warn("[AssetStore] Tauri: 资源缓存目录不可用或写入失败，将仅使用 IndexedDB（请在设置中启用并选择缓存目录）:", t));
      let p = !u && this.isTauriEnvironment() && d && h,
        m = !1;
      if (!p && !u && this.isTauriEnvironment()) try {
        const {
            isCanvasLocalCacheMode: y
          } = await Ie(async () => {
            const {
              isCanvasLocalCacheMode: v
            } = await Promise.resolve().then(() => So);
            return {
              isCanvasLocalCacheMode: v
            };
          }, void 0, import.meta.url),
          {
            localCacheManager: b
          } = await Ie(async () => {
            const {
              localCacheManager: v
            } = await Promise.resolve().then(() => Ha);
            return {
              localCacheManager: v
            };
          }, void 0, import.meta.url);
        y() && b.isAvailable() && b.hasAsset(t) && (p = !0, m = !0);
      } catch {}
      const f = {
        id: t,
        blob: n,
        mimeType: s,
        size: n.size,
        remoteUrl: r,
        cachedAt: Date.now(),
        ...(l ? {
          cacheSubdir: l
        } : {})
      };
      return p || (await this.putAsset(f)), console.log("[AssetStore] Blob asset cached successfully:", t, `(${(n.size / 1024 / 1024).toFixed(2)} MB)`, p ? "[Tauri disk-only]" : u ? "[IDB-only]" : ""), !(i != null && i.silent) && !m && this.notifyListeners(t, f), !m && !d && !u && !this.localCacheMirrorListenerActive && this._saveToLocalCache(t, n, s, r, l, {
        forceReplace: (i == null ? void 0 : i.forceReplace) === !0 || !!o
      }), !0;
    } catch {
      return !1;
    }
  }
  async saveAsset(t, n) {
    try {
      await this.init();
      const r = await this.getAsset(t);
      if (r) {
        if (r.remoteUrl === n) return console.log("[AssetStore] Asset already cached (same URL):", t), !0;
        this.invalidateBlobUrlCacheFor(t);
      }
      if (console.log("[AssetStore] Downloading asset:", n), n.startsWith("http://") || n.startsWith("https://")) try {
        const {
          localCacheManager: u
        } = await Ie(async () => {
          const {
            localCacheManager: p
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: p
          };
        }, void 0, import.meta.url);
        if (await u.ensureRestored(), u.isAvailable() && u.hasAsset(t)) return console.log("[AssetStore] Skip remote download, local cache hit:", t), !0;
        const h = /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(n) || /\/video\//i.test(n) || n.includes("webstatic.") || n.includes("prod-ss-vidu") || n.includes("prod-sa-vidu");
        if (h && u.isAvailable()) {
          const p = u.getManifest();
          if (Object.values((p == null ? void 0 : p.assets) ?? {}).some(f => (f == null ? void 0 : f.remoteUrl) === n) || u.hasAsset(t)) return console.log("[AssetStore] Skip video Blob/IDB path (disk already has asset):", t), !0;
          try {
            const {
              isCanvasLocalCacheMode: f
            } = await Ie(async () => {
              const {
                isCanvasLocalCacheMode: y
              } = await Promise.resolve().then(() => So);
              return {
                isCanvasLocalCacheMode: y
              };
            }, void 0, import.meta.url);
            if (f()) {
              const {
                downloadUrlToLocal: y
              } = await Ie(async () => {
                const {
                  downloadUrlToLocal: b
                } = await Promise.resolve().then(() => No);
                return {
                  downloadUrlToLocal: b
                };
              }, void 0, import.meta.url);
              return await y(n, t), console.log("[AssetStore] Video routed to downloadUrlToLocal (no Bypass CORS Blob):", t), !0;
            }
          } catch (f) {
            console.warn("[AssetStore] video downloadUrlToLocal failed:", f);
          }
        }
        if (!h) {
          const {
              resolveLocalBlobByRemoteUrl: p
            } = await Ie(async () => {
              const {
                resolveLocalBlobByRemoteUrl: f
              } = await Promise.resolve().then(() => Ui);
              return {
                resolveLocalBlobByRemoteUrl: f
              };
            }, void 0, import.meta.url),
            m = await p(n);
          if (m != null && m.size) {
            const f = m.type || "application/octet-stream";
            return await this.saveBlobAsset(t, m, n, void 0, {
              silent: !0
            }), console.log("[AssetStore] Skip remote download, reused local blob by URL:", t), !0;
          }
        }
      } catch {}
      if (n.startsWith("blob:")) try {
        const {
            getAssetIdForDisplayBlobUrl: u
          } = await Ie(async () => {
            const {
              getAssetIdForDisplayBlobUrl: p
            } = await Promise.resolve().then(() => No);
            return {
              getAssetIdForDisplayBlobUrl: p
            };
          }, void 0, import.meta.url),
          h = u(n);
        if (h) {
          const p = await this.getAsset(h),
            m = p ? await this.getAssetBlob(h) : null;
          if (m) {
            const f = m.type || "application/octet-stream",
              y = REe(t) ? "thumbnails" : p == null ? void 0 : p.cacheSubdir,
              b = {
                id: t,
                blob: m,
                mimeType: f,
                size: m.size,
                remoteUrl: (p == null ? void 0 : p.remoteUrl) || n,
                cachedAt: Date.now(),
                ...(y ? {
                  cacheSubdir: y
                } : {})
              };
            await this.putAsset(b), this.notifyListeners(t, b);
            const v = p != null && p.remoteUrl && (p.remoteUrl.startsWith("http://") || p.remoteUrl.startsWith("https://")) ? p.remoteUrl : void 0;
            return this._saveToLocalCache(t, m, f, v, y), !0;
          }
        }
      } catch (u) {
        console.warn("[AssetStore] Resolve original from display URL failed, fallback to fetch:", u);
      }
      const a = n.includes(".mp4") || n.includes(".webm") || n.includes("video") || n.includes("/v/") || n.includes("amazonaws") || n.includes("prod-sa-vidu") || n.includes("prod-ss-vidu"),
        i = async u => {
          if (u.type && u.type !== "application/octet-stream") return u;
          const h = await u.arrayBuffer(),
            p = n.toLowerCase();
          return a || p.includes(".mp4") || p.includes(".webm") ? new Blob([h], {
            type: "video/mp4"
          }) : p.includes(".png") ? new Blob([h], {
            type: "image/png"
          }) : p.includes(".webp") ? new Blob([h], {
            type: "image/webp"
          }) : p.includes(".gif") ? new Blob([h], {
            type: "image/gif"
          }) : p.includes(".jpg") || p.includes(".jpeg") ? new Blob([h], {
            type: "image/jpeg"
          }) : new Blob([h], {
            type: a ? "video/mp4" : "image/png"
          });
        };
      let o;
      if (n.startsWith("http://") || n.startsWith("https://")) try {
        const {
          downloadWithFallback: u
        } = await Ie(async () => {
          const {
            downloadWithFallback: h
          } = await Promise.resolve().then(() => El);
          return {
            downloadWithFallback: h
          };
        }, void 0, import.meta.url);
        o = await i(await u(n, 12e4));
      } catch (u) {
        console.warn("[AssetStore] Remote download failed, fallback to fetch:", u);
        const h = await fetch(n, {
          mode: "cors",
          credentials: "omit"
        });
        if (!h.ok) throw new Error(`HTTP ${h.status}: ${h.statusText}`);
        o = await h.blob();
      } else {
        const u = await fetch(n, {
          mode: "cors",
          credentials: "omit"
        });
        if (!u.ok) throw new Error(`HTTP ${u.status}: ${u.statusText}`);
        o = await u.blob();
      }
      const l = o.type || (a ? "video/mp4" : "application/octet-stream"),
        d = {
          id: t,
          blob: o,
          mimeType: l,
          size: o.size,
          remoteUrl: n,
          cachedAt: Date.now(),
          ...(REe(t) ? {
            cacheSubdir: "thumbnails"
          } : {})
        };
      return await this.putAsset(d), console.log("[AssetStore] Asset cached successfully:", t, `(${(o.size / 1024 / 1024).toFixed(2)} MB)`), this.notifyListeners(t, d), this.localCacheMirrorListenerActive || this._saveToLocalCache(t, o, l, n, REe(t) ? "thumbnails" : void 0), !0;
    } catch (r) {
      return console.debug("[AssetStore] Failed to save asset:", t, r), !1;
    }
  }
  isTauriEnvironment() {
    return typeof window < "u" && ("__TAURI_INTERNALS__" in window || "__TAURI__" in window || window.location.protocol === "tauri:");
  }
  async convertTauriFileSrc(t) {
    if (!this.isTauriEnvironment()) return t;
    try {
      const {
        convertFileSrc: n
      } = await Ie(async () => {
        const {
          convertFileSrc: r
        } = await Promise.resolve().then(() => sd);
        return {
          convertFileSrc: r
        };
      }, void 0, import.meta.url);
      return n(t);
    } catch (n) {
      return console.warn("[AssetStore] Failed to convert Tauri file src:", n), t;
    }
  }
  isAbsoluteFilePath(t) {
    return !!(t.match(/^[A-Za-z]:[\\\/]/) || t.startsWith("/"));
  }
  async getAssetUrl(t, n) {
    if (n && this.isTauriEnvironment() && this.isAbsoluteFilePath(n)) return this.convertTauriFileSrc(n);
    try {
      const {
        localCacheManager: r
      } = await Ie(async () => {
        const {
          localCacheManager: a
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: a
        };
      }, void 0, import.meta.url);
      if (await r.ensureRestored(), r.isAvailable() && r.hasAsset(t)) {
        const a = await r.getConvertFileSrcForAsset(t);
        if (a) return a;
      }
    } catch {}
    return Ele(PEe(t), () => this.getAssetBlob(t));
  }
  async acquireAssetUrl(t, n) {
    if (n && this.isTauriEnvironment() && this.isAbsoluteFilePath(n)) return null;
    try {
      const {
        localCacheManager: r
      } = await Ie(async () => {
        const {
          localCacheManager: a
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: a
        };
      }, void 0, import.meta.url);
      if (await r.ensureRestored(), r.isAvailable() && r.hasAsset(t)) {
        const a = await r.getConvertFileSrcForAsset(t);
        if (a) return {
          url: a,
          managed: !0,
          release() {}
        };
      }
    } catch {}
    return B4t(PEe(t), () => this.getAssetBlob(t));
  }
  getCachedAssetUrlSync(t) {
    return F4t(PEe(t));
  }
  isManagedBlobUrl(t) {
    return R$(t);
  }
  async getAssetBlob(t) {
    var n;
    try {
      await this.init();
      try {
        const {
          localCacheManager: a
        } = await Ie(async () => {
          const {
            localCacheManager: i
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: i
          };
        }, void 0, import.meta.url);
        if (a.isAvailable() && a.hasAsset(t)) {
          const i = a.getAssetManifestMeta(t),
            o = !!((n = i == null ? void 0 : i.mimeType) != null && n.startsWith("video/")) || /\.(mp4|webm|mov|m4v)(\?|$)/i.test((i == null ? void 0 : i.fileName) || "") || /(?:^|\/)videos\//i.test(String((i == null ? void 0 : i.fileName) || "").replace(/\\/g, "/"));
          o && typeof (i == null ? void 0 : i.size) == "number" && i.size > 2 * 1024 * 1024 && console.warn("[AssetStore] getAssetBlob 将整段视频读入 JS 堆（仅上传/导出应走此路径）:", t, `${(i.size / 1024 / 1024).toFixed(1)}MB`);
          const s = await a.readAsset(t, {
            allowVideoBlob: o
          });
          if (s) return s.blob;
        }
      } catch {}
      const r = await this.getAsset(t);
      return r != null && r.blob ? r.blob : null;
    } catch {
      return null;
    }
  }
  async getAssetRecord(t) {
    try {
      await this.init();
      try {
        const {
          localCacheManager: r
        } = await Ie(async () => {
          const {
            localCacheManager: a
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: a
          };
        }, void 0, import.meta.url);
        if (r.isAvailable() && r.hasAsset(t)) {
          const a = await r.readAsset(t);
          if (a) {
            const i = r.getManifest(),
              o = i == null ? void 0 : i.assets[t],
              s = o != null && o.fileName ? this.inferCacheSubdirFromManifestPath(o.fileName) : void 0;
            return {
              id: t,
              blob: a.blob,
              mimeType: a.mimeType,
              size: a.blob.size,
              remoteUrl: (o == null ? void 0 : o.remoteUrl) || "",
              cachedAt: (o == null ? void 0 : o.cachedAt) || Date.now(),
              ...(s ? {
                cacheSubdir: s
              } : {})
            };
          }
        }
      } catch {}
      const n = await this.getAsset(t);
      return n || null;
    } catch {
      return null;
    }
  }
  async getAssetBlobByRemoteUrl(t) {
    try {
      if (await this.init(), !this.db) return null;
      let n = "";
      try {
        n = new URL(t).pathname;
      } catch {}
      let r = await new Promise((a, i) => {
        const d = this.db.transaction([ev], "readonly").objectStore(ev).index("remoteUrl").get(t);
        d.onsuccess = () => a(d.result || null), d.onerror = () => i(d.error);
      });
      if (!(r != null && r.blob) && n && (t.includes("prod-ss-vidu") || t.includes("prod-sa-vidu") || t.includes("amazonaws"))) {
        const a = await this.findAssetIdByRemotePathname(n);
        r = a ? await this.getAsset(a) : null;
      }
      if (r != null && r.blob) return r.blob;
      try {
        const {
          localCacheManager: a
        } = await Ie(async () => {
          const {
            localCacheManager: i
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: i
          };
        }, void 0, import.meta.url);
        if (a.isAvailable()) {
          const i = a.getManifest(),
            o = a.findAssetIdsByRemoteUrl(t);
          let s;
          for (const l of o) if (i != null && i.assets[l]) {
            s = [l, i.assets[l]];
            break;
          }
          if (!s && n && (s = (i == null ? void 0 : i.assets) && Object.entries(i.assets).find(([, l]) => {
            try {
              return !!(l != null && l.remoteUrl && new URL(l.remoteUrl).pathname === n);
            } catch {
              return !1;
            }
          })), s) {
            const [l] = s,
              d = await a.readAsset(l);
            if (d) return d.blob;
          }
        }
      } catch {}
      return null;
    } catch {
      return null;
    }
  }
  async hasAsset(t) {
    try {
      await this.init();
      try {
        const {
          localCacheManager: r
        } = await Ie(async () => {
          const {
            localCacheManager: a
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: a
          };
        }, void 0, import.meta.url);
        if (r.isAvailable() && r.hasAsset(t)) return !0;
      } catch {}
      return !!(await this.getAsset(t));
    } catch {
      return !1;
    }
  }
  async deleteAsset(t) {
    try {
      this.invalidateBlobUrlCacheFor(t), await this.init();
      try {
        const {
          localCacheManager: n
        } = await Ie(async () => {
          const {
            localCacheManager: r
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: r
          };
        }, void 0, import.meta.url);
        n.isAvailable() && n.hasAsset(t) && (await n.removeAsset(t));
      } catch (n) {
        console.warn("[AssetStore] Failed to remove asset from local cache:", t, n);
      }
      return this.db ? new Promise((n, r) => {
        const o = this.db.transaction([ev], "readwrite").objectStore(ev).delete(t);
        o.onsuccess = () => {
          console.log("[AssetStore] Asset deleted:", t), n(!0);
        }, o.onerror = () => {
          console.error("[AssetStore] Failed to delete asset:", t, o.error), r(o.error);
        };
      }) : (console.log("[AssetStore] Asset deleted (local only / no IDB):", t), !0);
    } catch (n) {
      return console.error("[AssetStore] Failed to delete asset:", t, n), !1;
    }
  }
  async deleteAssets(t) {
    let n = 0;
    for (const r of t) (await this.deleteAsset(r)) && n++;
    return n;
  }
  async getAllAssetIds() {
    try {
      return await this.init(), this.db ? new Promise((t, n) => {
        const i = this.db.transaction([ev], "readonly").objectStore(ev).getAllKeys();
        i.onsuccess = () => {
          t(i.result);
        }, i.onerror = () => {
          console.error("[AssetStore] Failed to get all asset IDs:", i.error), n(i.error);
        };
      }) : [];
    } catch (t) {
      return console.error("[AssetStore] Failed to get all asset IDs:", t), [];
    }
  }
  async getStorageUsage() {
    try {
      if (await this.init(), !this.db) return {
        totalSize: 0,
        count: 0,
        formattedSize: "0 B",
        blobUrlCacheSize: 0
      };
      const {
        totalSize: t,
        count: n
      } = await new Promise((r, a) => {
        const i = this.db.transaction([ev], "readonly"),
          s = i.objectStore(ev).openCursor();
        let l = 0,
          d = 0;
        s.onsuccess = () => {
          const u = s.result;
          if (!u) return;
          const h = u.value;
          l += typeof h.size == "number" ? h.size : 0, d += 1, u.continue();
        }, s.onerror = () => a(s.error), i.oncomplete = () => r({
          totalSize: l,
          count: d
        }), i.onerror = () => a(i.error), i.onabort = () => a(i.error);
      });
      return {
        totalSize: t,
        count: n,
        formattedSize: this.formatBytes(t),
        blobUrlCacheSize: 0
      };
    } catch (t) {
      return console.error("[AssetStore] Failed to get storage usage:", t), {
        totalSize: 0,
        count: 0,
        formattedSize: "0 B",
        blobUrlCacheSize: 0
      };
    }
  }
  clearBlobUrlCache() {
    Twe();
  }
  async clearAll() {
    try {
      return Twe({
        force: !0
      }), await this.init(), this.db ? new Promise((t, n) => {
        const i = this.db.transaction([ev], "readwrite").objectStore(ev).clear();
        i.onsuccess = () => {
          console.log("[AssetStore] All assets cleared"), t(!0);
        }, i.onerror = () => {
          console.error("[AssetStore] Failed to clear assets:", i.error), n(i.error);
        };
      }) : !1;
    } catch (t) {
      return console.error("[AssetStore] Failed to clear assets:", t), !1;
    }
  }
  async getAsset(t) {
    return this.db ? new Promise((n, r) => {
      const o = this.db.transaction([ev], "readonly").objectStore(ev).get(t);
      o.onsuccess = () => {
        n(o.result || null);
      }, o.onerror = () => {
        console.error("[AssetStore] Failed to get asset:", t, o.error), r(o.error);
      };
    }) : null;
  }
  async putAsset(t) {
    if (!this.db) throw new Error("Database not initialized");
    return new Promise((n, r) => {
      const o = this.db.transaction([ev], "readwrite").objectStore(ev).put(t);
      o.onsuccess = () => {
        n();
      }, o.onerror = () => {
        console.error("[AssetStore] Failed to put asset:", t.id, o.error), r(o.error);
      };
    });
  }
  async findAssetIdByRemotePathname(t) {
    return !this.db || !t ? null : new Promise(n => {
      const r = this.db.transaction([ev], "readonly"),
        i = r.objectStore(ev).index("remoteUrl").openKeyCursor();
      let o = null;
      i.onsuccess = () => {
        const s = i.result;
        if (!s || o) return;
        const l = typeof s.key == "string" ? s.key : "";
        try {
          if (l && new URL(l).pathname === t) {
            o = String(s.primaryKey);
            return;
          }
        } catch {}
        s.continue();
      }, i.onerror = () => n(null), r.oncomplete = () => n(o), r.onerror = () => n(null), r.onabort = () => n(null);
    });
  }
  formatBytes(t) {
    if (t === 0) return "0 B";
    const n = 1024,
      r = ["B", "KB", "MB", "GB"],
      a = Math.floor(Math.log(t) / Math.log(n));
    return `${(t / Math.pow(n, a)).toFixed(2)} ${r[a]}`;
  }
}

const ni = new aCr(),
  Ri = Object.freeze(Object.defineProperty({
    __proto__: null,
    assetStore: ni
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  rx = new Map(),
  B6 = new Map(),
  iCr = 300,
  KVt = 32 * 1024 * 1024;

let mbe = 0;

function DSn(e) {
  const t = rx.get(e);
  t !== void 0 && (rx.delete(e), rx.set(e, t));
}

function oCr() {
  for (const e of rx.keys()) {
    const t = rx.get(e);
    rx.delete(e), t && (mbe -= t.length * 2), t != null && t.startsWith("blob:") && Ie(async () => {
      const {
        isManagedLocalObjectUrl: n
      } = await Promise.resolve().then(() => eU);
      return {
        isManagedLocalObjectUrl: n
      };
    }, void 0, import.meta.url).then(({
      isManagedLocalObjectUrl: n
    }) => {
      n(t) || URL.revokeObjectURL(t);
    });
    return;
  }
}

function $ht(e, t) {
  if (rx.has(e)) {
    const n = rx.get(e);
    n !== void 0 && (mbe -= n.length * 2), rx.delete(e);
  }
  if (!(t.length * 2 > KVt / 2) && !(t.startsWith("data:") && t.length > 96 * 1024)) for (rx.set(e, t), mbe += t.length * 2; (rx.size > iCr || mbe > KVt) && rx.size !== 0;) oCr();
}

function sCr() {
  for (const e of rx.values()) e.startsWith("blob:") && Ie(async () => {
    const {
      isManagedLocalObjectUrl: t
    } = await Promise.resolve().then(() => eU);
    return {
      isManagedLocalObjectUrl: t
    };
  }, void 0, import.meta.url).then(({
    isManagedLocalObjectUrl: t
  }) => {
    t(e) || URL.revokeObjectURL(e);
  });
  rx.clear(), B6.clear(), mbe = 0, GSn();
}

function LSn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++) t ^= e.charCodeAt(n), t = t + (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24) >>> 0;
  return t >>> 0;
}

function lCr(e) {
  const t = e.trim(),
    n = LSn(t);
  return `b64:${t.length}:${n.toString(16)}`;
}

function OSn(e) {
  const t = e.trim(),
    n = LSn(t);
  return `url:${t.length}:${n.toString(16)}`;
}

function BSn(e) {
  return typeof e != "string" ? !1 : e.startsWith("data:image/") || e.startsWith("data:video/") || e.startsWith("data:audio/");
}

function cCr(e) {
  return typeof e != "string" ? !1 : e.startsWith("blob:");
}

function dCr(e) {
  return typeof e != "string" || e.startsWith("data:") ? !1 : !!(e.startsWith("blob:") || e.startsWith("http://") || e.startsWith("https://"));
}

const uCr = 2 * 1024 * 1024;

function FSn(e) {
  var i;
  if (!(e != null && e.startsWith("data:"))) return null;
  const t = e.lastIndexOf(";base64,");
  if (t === -1) return null;
  const r = ((i = e.slice(0, e.indexOf(",")).match(/:(.*?);/)) == null ? void 0 : i[1]) || "image/png",
    a = e.slice(t + 8).replace(/\s/g, "");
  return {
    mime: r,
    base64: a
  };
}

function zSn(e) {
  if (!(e != null && e.startsWith("data:image"))) return e;
  const t = FSn(e);
  if (!t) return e;
  try {
    return atob(t.base64), `data:${t.mime};base64,${t.base64}`;
  } catch {
    return e;
  }
}

function U4t(e) {
  if (!(e != null && e.startsWith("data:")) || !e.includes(";base64,")) return e;
  try {
    const t = FSn(e);
    if (!t) return e;
    const n = atob(t.base64),
      r = new Uint8Array(n.length);
    for (let i = 0; i < n.length; i++) r[i] = n.charCodeAt(i);
    const a = new Blob([r], {
      type: t.mime
    });
    return URL.createObjectURL(a);
  } catch (t) {
    return console.warn("[BlobSerialization] dataUrlToBlobUrlSync failed:", t), e;
  }
}

const Jne = new Map(),
  NK = [],
  hCr = 48,
  AR = new Set();

let XZe = null;

function USn() {
  XZe !== null || AR.size === 0 || (XZe = setTimeout(() => {
    if (XZe = null, AR.size === 0) return;
    const e = new Set();
    try {
      if (typeof document < "u") {
        const t = document.querySelectorAll("img");
        for (let n = 0; n < t.length; n++) {
          const r = t[n].src;
          r.startsWith("blob:") && AR.has(r) && e.add(r);
          const a = t[n].currentSrc;
          a.startsWith("blob:") && AR.has(a) && e.add(a);
        }
      }
    } catch {}
    for (const t of [...AR]) if (!e.has(t)) {
      AR.delete(t);
      try {
        URL.revokeObjectURL(t);
      } catch {}
    }
    AR.size > 0 && USn();
  }, 1e4));
}

function pCr(e) {
  !e.startsWith("blob:") || AR.has(e) || (AR.add(e), USn());
}

function $Sn(e) {
  e.startsWith("blob:") && pCr(e);
}

function mCr(e) {
  const t = NK.indexOf(e);
  t > -1 && NK.splice(t, 1), NK.push(e);
}

function GSn() {
  for (const e of Jne.values()) $Sn(e);
  Jne.clear(), NK.length = 0;
}

function NS(e) {
  if (!(e != null && e.startsWith("data:image"))) return e;
  const t = zSn(e);
  if (t.length <= uCr) return t;
  const n = OSn(t),
    r = Jne.get(n);
  if (r) return mCr(n), r;
  const a = U4t(t);
  if (!a.startsWith("blob:")) return a;
  for (Jne.set(n, a), NK.push(n); NK.length > hCr;) {
    const i = NK.shift();
    if (i) {
      const o = Jne.get(i);
      Jne.delete(i), o && $Sn(o);
    }
  }
  return a;
}

async function $4t(e, t) {
  const n = lCr(e),
    r = !!t;
  if (!r) {
    const i = rx.get(n);
    if (i) return DSn(n), i;
    const o = B6.get(n);
    if (o) return o;
  }
  const a = (async () => {
    try {
      let i = e.trim();
      i.startsWith("data:") && i.includes(";base64,") && (i = i.replace(/;base64,\s+/, ";base64,"));
      const s = await (await fetch(i)).blob(),
        l = t ? t(s) : URL.createObjectURL(s);
      return r || ($ht(n, l), B6.delete(n)), l;
    } catch (i) {
      return console.error("[Hydration] Failed to convert Base64 to Blob URL:", i), r || B6.delete(n), e;
    }
  })();
  return r || B6.set(n, a), a;
}

async function QVt(e) {
  const t = OSn(e),
    n = rx.get(t);
  if (n) return DSn(t), n;
  const r = B6.get(t);
  if (r) return r;
  const a = (async () => {
    try {
      if (e.startsWith("http://") || e.startsWith("https://")) {
        const l = await fetch(e);
        if (!l.ok) throw new Error(`HTTP ${l.status}: ${l.statusText}`);
        const d = await l.blob(),
          u = await new Promise((h, p) => {
            const m = new FileReader();
            m.onloadend = () => {
              const f = m.result;
              h(f);
            }, m.onerror = p, m.readAsDataURL(d);
          });
        return $ht(t, u), B6.delete(t), u;
      }
      const o = await (await fetch(e)).blob(),
        s = await new Promise((l, d) => {
          const u = new FileReader();
          u.onloadend = () => {
            const h = u.result;
            l(h);
          }, u.onerror = d, u.readAsDataURL(o);
        });
      return $ht(t, s), B6.delete(t), s;
    } catch (i) {
      return console.error("[Serialization] Failed to convert URL to Base64:", i), console.warn(`[Serialization] 保留原始URL: ${e.substring(0, 50)}...`), B6.delete(t), e;
    }
  })();
  return B6.set(t, a), a;
}

async function yVe(e, t = 10, n) {
  console.log("[Hydration] Starting Base64 → Blob URL conversion...");
  const r = {
      converted: 0,
      skipped: 0,
      totalSize: 0
    },
    a = [];
  Array.isArray(e) ? e.forEach((o, s) => {
    a.push({
      obj: o,
      key: s,
      parent: e,
      depth: 0
    });
  }) : typeof e == "object" && e !== null && Object.keys(e).forEach(o => {
    a.push({
      obj: e[o],
      key: o,
      parent: e,
      depth: 0
    });
  });
  const i = [];
  for (; a.length > 0;) {
    const {
      obj: o,
      key: s,
      parent: l,
      depth: d
    } = a.shift();
    if (d > t) {
      r.skipped++;
      continue;
    }
    if (BSn(o)) {
      const u = o,
        h = u.length;
      r.totalSize += h;
      const p = $4t(u, n).then(m => {
        l[s] = m, r.converted++, r.converted % 10 === 0 && console.log(`[Hydration] Converted ${r.converted} images, saved ${(r.totalSize / 1024 / 1024).toFixed(2)}MB`);
      }).catch(m => {
        console.error(`[Hydration] Failed to convert Base64 at key "${s}":`, m), l[s] = u, r.skipped++;
      });
      i.push(p);
    } else Array.isArray(o) ? o.forEach((u, h) => {
      a.push({
        obj: u,
        key: h,
        parent: o,
        depth: d + 1
      });
    }) : typeof o == "object" && o !== null && Object.keys(o).forEach(u => {
      a.push({
        obj: o[u],
        key: u,
        parent: o,
        depth: d + 1
      });
    });
  }
  return await Promise.all(i), console.log("[Hydration] Conversion complete:", {
    converted: r.converted,
    skipped: r.skipped,
    savedMemory: `${(r.totalSize / 1024 / 1024).toFixed(2)}MB`
  }), {
    data: e,
    stats: r
  };
}

async function fCr(e, t, n = 10, r) {
  console.log("[StreamingHydration] Starting streaming Base64 → Blob URL conversion...");
  const a = {
      converted: 0,
      skipped: 0,
      totalSize: 0
    },
    i = [],
    o = (d, u, h, p, m) => {
      p > n || (BSn(d) ? i.push({
        obj: d,
        key: h,
        parent: u,
        priority: m
      }) : Array.isArray(d) ? d.forEach((f, y) => {
        o(f, d, y, p + 1, m);
      }) : typeof d == "object" && d !== null && Object.keys(d).forEach(f => {
        let y = m;
        f === "nodes" ? y = 100 : f === "connections" ? y = 90 : f === "history" && (y = 50), o(d[f], d, f, p + 1, y);
      }));
    };
  Array.isArray(e) ? e.forEach((d, u) => {
    o(d, e, u, 0, 50);
  }) : typeof e == "object" && e !== null && Object.keys(e).forEach(d => {
    let u = 50;
    d === "nodes" ? u = 100 : d === "connections" ? u = 90 : d === "history" && (u = 50), o(e[d], e, d, 0, u);
  }), console.log(`[StreamingHydration] Found ${i.length} Base64 items to convert`), t == null || t(5, `发现 ${i.length} 个图片需要转换`), i.sort((d, u) => u.priority - d.priority);
  const s = 5,
    l = Math.ceil(i.length / s);
  for (let d = 0; d < l; d++) {
    const u = d * s,
      h = Math.min(u + s, i.length),
      m = i.slice(u, h).map(async ({
        obj: y,
        key: b,
        parent: v
      }) => {
        try {
          const _ = y,
            w = _.length;
          a.totalSize += w;
          const k = await $4t(_, r);
          v[b] = k, a.converted++;
        } catch (_) {
          console.error("[StreamingHydration] Failed to convert Base64:", _), a.skipped++;
        }
      });
    await Promise.all(m);
    const f = Math.round(h / i.length * 100);
    t == null || t(5 + f * .9, `已转换 ${a.converted}/${i.length} 个图片`), await new Promise(y => setTimeout(y, 10));
  }
  return console.log("[StreamingHydration] Conversion complete:", {
    converted: a.converted,
    skipped: a.skipped,
    savedMemory: `${(a.totalSize / 1024 / 1024).toFixed(2)}MB`
  }), t == null || t(95, "图片转换完成"), {
    data: e,
    stats: a
  };
}

async function gCr(e, t = 10) {
  console.log("[Serialization] Starting Blob URL → Base64 conversion...");
  const n = {
      converted: 0,
      skipped: 0
    },
    r = JSON.parse(JSON.stringify(e, (o, s) => s)),
    a = [];
  Array.isArray(r) ? r.forEach((o, s) => {
    a.push({
      obj: o,
      key: s,
      parent: r,
      depth: 0
    });
  }) : typeof r == "object" && r !== null && Object.keys(r).forEach(o => {
    a.push({
      obj: r[o],
      key: o,
      parent: r,
      depth: 0
    });
  });
  const i = [];
  for (; a.length > 0;) {
    const {
      obj: o,
      key: s,
      parent: l,
      depth: d
    } = a.shift();
    if (d > t) {
      n.skipped++;
      continue;
    }
    if (cCr(o)) {
      const h = QVt(o).then(p => {
        l[s] = p, n.converted++, n.converted % 10 === 0 && console.log(`[Serialization] Converted ${n.converted} Blob URLs to Base64`);
      }).catch(p => {
        console.error(`[Serialization] Failed to convert Blob URL at key "${s}":`, p), n.skipped++;
      });
      i.push(h);
    } else if (dCr(o)) {
      const h = QVt(o).then(p => {
        l[s] = p, n.converted++, n.converted % 10 === 0 && console.log(`[Serialization] Converted ${n.converted} remote URLs to Base64`);
      }).catch(p => {
        console.error(`[Serialization] Failed to convert remote URL at key "${s}":`, p), n.skipped++;
      });
      i.push(h);
    } else Array.isArray(o) ? o.forEach((u, h) => {
      a.push({
        obj: u,
        key: h,
        parent: o,
        depth: d + 1
      });
    }) : typeof o == "object" && o !== null && Object.keys(o).forEach(u => {
      a.push({
        obj: o[u],
        key: u,
        parent: o,
        depth: d + 1
      });
    });
  }
  return await Promise.all(i), console.log("[Serialization] Conversion complete:", {
    converted: n.converted,
    skipped: n.skipped
  }), {
    data: r,
    stats: n
  };
}

function yCr(e, t, n = 2e5) {
  const r = [e],
    a = new WeakSet();
  let i = 0;
  for (; r.length > 0 && i < n;) {
    i++;
    const o = r.pop();
    if (o == null) continue;
    const s = typeof o;
    if (s === "string") {
      if (t(o)) return !0;
      continue;
    }
    if (s !== "object") continue;
    const l = o;
    if (!a.has(l)) if (a.add(l), Array.isArray(l)) for (let d = 0; d < l.length; d++) r.push(l[d]);else for (const d in l) Object.prototype.hasOwnProperty.call(l, d) && r.push(l[d]);
  }
  return !1;
}

function L4e(e) {
  return yCr(e, t => t.length >= 11 && t.charCodeAt(0) === 100 && (t.startsWith("data:image/") || t.startsWith("data:video/") || t.startsWith("data:audio/")));
}

function VSn(e) {
  let t = 0;
  const n = [e],
    r = new WeakSet();
  let a = 0;
  const i = 2e5;
  for (; n.length > 0 && a < i;) {
    a++;
    const o = n.pop();
    if (o == null) continue;
    const s = typeof o;
    if (s === "string") {
      const d = o;
      d.length >= 11 && d.startsWith("data:image/") && (t += d.length);
      continue;
    }
    if (s !== "object") continue;
    const l = o;
    if (!r.has(l)) if (r.add(l), Array.isArray(l)) for (let d = 0; d < l.length; d++) n.push(l[d]);else for (const d in l) Object.prototype.hasOwnProperty.call(l, d) && n.push(l[d]);
  }
  return t;
}

const Tle = Object.freeze(Object.defineProperty({
    __proto__: null,
    base64ToBlobUrl: $4t,
    clearBlobSerializationCache: sCr,
    clearSyncBlobUrlCache: GSn,
    containsBase64Media: L4e,
    dataUrlToBlobUrlSync: U4t,
    estimateBase64Size: VSn,
    getDisplaySafeImageUrlSync: NS,
    hydrateProjectData: yVe,
    hydrateProjectDataStreaming: fCr,
    normalizeDataUrl: zSn,
    serializeProjectData: gCr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  HSn = "qiaodoumayi_huya_corporate_proxy",
  Ght = "qiaodoumayi-huya-corporate-proxy-changed";

function bCr() {
  return typeof window < "u" && "__TAURI__" in window;
}

function YVt() {
  return {
    proxyUrl: "",
    useEnvProxy: !0,
    openApiToken: ""
  };
}

function WSn(e) {
  return {
    proxyUrl: String((e == null ? void 0 : e.proxyUrl) ?? "").trim(),
    useEnvProxy: (e == null ? void 0 : e.useEnvProxy) !== !1,
    openApiToken: String((e == null ? void 0 : e.openApiToken) ?? "").trim().replace(/^Bearer\s+/i, ""),
    openApiFileUploadEnabled: (e == null ? void 0 : e.openApiFileUploadEnabled) === !0
  };
}

function vCr() {
  return lY().openApiFileUploadEnabled === !0;
}

function wCr() {
  return lY().openApiToken;
}

function lY() {
  try {
    const e = localStorage.getItem(HSn);
    return e ? WSn(JSON.parse(e)) : YVt();
  } catch {
    return YVt();
  }
}

function xCr(e) {
  const t = WSn(e);
  localStorage.setItem(HSn, JSON.stringify(t)), window.dispatchEvent(new CustomEvent(Ght));
}

function Mle(e) {
  const t = String(e || "").toLowerCase();
  return t.includes("art.huya.info") || t.includes("copilot.huya.info");
}

function _Cr() {
  const e = lY();
  if (e.proxyUrl) return e.proxyUrl;
}

function kCr() {
  return lY().useEnvProxy;
}

function Vht(e, t) {
  if (!Mle(e)) return t;
  const n = _Cr(),
    r = kCr();
  return {
    ...t,
    ...(n ? {
      proxyUrl: n
    } : {}),
    useEnvProxy: r
  };
}

function ACr(e, t = !0) {
  const n = e.trim();
  if (!n) return "";
  if (!n.includes("=")) return n.includes("://") ? n : `http://${n}`;
  const r = t ? "https" : "http";
  let a = "";
  for (const i of n.split(";")) {
    const o = i.trim();
    if (!o) continue;
    const s = o.indexOf("=");
    if (s <= 0) continue;
    const l = o.slice(0, s).trim().toLowerCase(),
      d = o.slice(s + 1).trim();
    if (!d) continue;
    const u = d.includes("://") ? d : `http://${d}`;
    if (l === r) return u;
    !a && (l === "http" || l === "https") && (a = u);
  }
  return a;
}

function SCr(e) {
  return e != null && e.trim() ? ACr(e) : "";
}

async function ICr(e = lY()) {
  if (!bCr()) return null;
  try {
    const t = await Fr("get_huya_upstream_proxy_diagnostics", {
      configuredProxyUrl: e.proxyUrl,
      useEnvProxy: e.useEnvProxy
    });
    return {
      configuredProxyUrl: String(t.configured_proxy_url ?? ""),
      useEnvProxy: t.use_env_proxy !== !1,
      envHttpsProxy: t.env_https_proxy ?? null,
      windowsProxyEnabled: !!t.windows_proxy_enabled,
      windowsProxyServer: t.windows_proxy_server ?? null,
      windowsAutoConfigUrl: t.windows_auto_config_url ?? null,
      effectiveProxyUrl: t.effective_proxy_url ?? null,
      effectiveSource: String(t.effective_source ?? "none"),
      hint: String(t.hint ?? "")
    };
  } catch {
    return null;
  }
}

function nH(e, t) {
  if (e !== 403) return null;
  const n = String(t || "");
  return n.includes("网关错误页面") || n.includes("webproxy_gateway") || n.trim().toLowerCase().startsWith("<!doctype") && n.includes("403") ? qSn(!0) : null;
}

function qSn(e = !1) {
  const t = "海艺网关拒绝（HTTP 403）：海艺网页能打开不代表 OpenAPI 已放行。";
  return e ? t + "若已连公司内网：请关闭 VPN/系统代理（或到设置 → 画布功能 → 出站代理清空），桌面端会优先直连 art.huya.info。若在家办公：填写公司 HTTP 代理（与浏览器一致）或设置 HTTPS_PROXY 后重启。" : t + "请确认已连接公司内网/VPN 后重试。";
}

const XVt = "x-studio-channel-group",
  CCr = "media";

function KSn(e) {
  const t = String(e || "").trim();
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

function QSn(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
  try {
    const n = new URL(KSn(t)).hostname.toLowerCase();
    return n === "soonstudio.ai" || n.endsWith(".soonstudio.ai");
  } catch {
    return !1;
  }
}

function ECr(e) {
  return new URL(KSn(e)).origin;
}

function YSn(e) {
  try {
    const t = new URL(e),
      n = t.hostname.toLowerCase();
    if (n !== "soonstudio.ai" && !n.endsWith(".soonstudio.ai")) return !1;
    const r = t.pathname.replace(/\/+$/, "") || "/";
    return r === "/fal" || r.startsWith("/fal/");
  } catch {
    return !1;
  }
}

function TCr(e, t = {}) {
  if (!YSn(e)) return t;
  const n = new Headers(t.headers);
  return n.has(XVt) || n.set(XVt, CCr), {
    ...t,
    headers: n
  };
}

const G4t = "http://127.0.0.1:41600/proxy";

async function O4e() {
  await Fr("ensure_builtin_proxy");
  for (let e = 0; e < 10; e++) {
    try {
      if ((await fetch("http://127.0.0.1:41600/health")).ok) return;
    } catch {}
    await new Promise(t => setTimeout(t, 80 + e * 40));
  }
  throw new Error("内置 HTTP 代理（127.0.0.1:41600）启动失败");
}

function V4t(e) {
  const t = String(e ?? "");
  return t ? /10060|没有正确答复|连接尝试失败/i.test(t) ? "说明：10060 表示 TCP 连 art.huya.info:443 超时。海艺通常需办公网、EOA 或企微访问；请确认网络出口后重试。可在 PowerShell 执行 Test-NetConnection art.huya.info -Port 443；若仅浏览器能开网页，请到设置填写与浏览器一致的公司 HTTP 代理（或 HTTPS_PROXY）后重启。" : /10061|积极拒绝|actively refused|connection refused/i.test(t) ? "说明：10061 表示 TCP 连 art.huya.info:443 被拒绝，尚未建立 HTTPS。已接公司网仍常见：浏览器经 PAC/公司 HTTP 代理出网，而本应用由 Rust 直连、未走同一出口；或本机代理/安全软件拦截。可执行 Test-NetConnection art.huya.info -Port 443；若仅浏览器能访问，请配置与浏览器一致的 HTTPS_PROXY 或设置页公司代理后重启。" : /tcp connect error|error trying to connect/i.test(t) ? "说明：无法建立到 art.huya.info 的 TCP 连接。请确认已连办公网/EOA，或配置公司 HTTP 代理后重试。" : /timed out|timeout|ETIMEDOUT/i.test(t) ? "说明：连接或请求超时。海艺域名不稳定时请稍后重试；持续失败请检查办公网/EOA 或公司代理。" : /dns|name or service not known|getaddrinfo|nodename nor servname/i.test(t) ? "说明：域名解析失败，请检查 DNS 或网络。" : null : null;
}

function XSn(e) {
  const t = e.toLowerCase();
  return t.includes("failed to fetch") || t.includes("network") || t.includes("connection") || t.includes("refused") || t.includes("econnrefused") || t.includes("econnreset") || t.includes("net::err_") || t.includes("load failed");
}

async function MCr(e, t, n, r, a, i = 4) {
  await O4e();
  const o = JSON.stringify({
    url: e,
    method: t.toUpperCase(),
    headers: n,
    body: r ?? void 0,
    formData: a != null && a.length ? a : void 0
  });
  let s = null;
  for (let l = 0; l <= i; l++) try {
    const d = await fetch(G4t, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: o
      }),
      u = await d.text();
    if (!d.ok) throw new Error(u || `Proxy request failed: ${d.status}`);
    return u;
  } catch (d) {
    s = d instanceof Error ? d : new Error(String(d));
    const u = s.message;
    if (l < i && XSn(u)) {
      const h = 500 + 600 * (l + 1);
      await new Promise(p => setTimeout(p, h));
      continue;
    }
    throw s;
  }
  throw s || new Error("Proxy request failed");
}

function us() {
  var t;
  if (typeof window > "u") return !1;
  if ("__TAURI__" in window) return !0;
  const e = window;
  return (t = e.__TAURI_INTERNALS__) != null && t.invoke ? !!(e.__LINGO_ELECTRON_NATIVE_SHELL__ || e.__LINGO_SIDECAR__) : !1;
}

function o3() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__LINGO_ELECTRON_NATIVE_SHELL__ && !e.__LINGO_SIDECAR__);
}

function Ple() {
  return us() && !o3();
}

async function H4t(e, t) {
  var n, r;
  if (!Ple()) return $i(e, t);
  if ((n = t.signal) == null || n.throwIfAborted(), await O4e(), (r = t.signal) == null || r.throwIfAborted(), t.body != null && typeof t.body != "string") throw new Error("流式对话请求体必须是 JSON 文本");
  return fetch(G4t, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    signal: t.signal,
    body: JSON.stringify({
      url: e,
      method: t.method || "POST",
      headers: FN(t),
      body: t.body,
      streamResponse: !0
    })
  });
}

async function JSn(e, t = {}) {
  const {
      method: n = "GET",
      headers: r = {},
      body: a
    } = t,
    i = e.startsWith("/") ? e : `/${e}`,
    o = a ? typeof a == "string" ? a : JSON.stringify(a) : void 0;
  try {
    const s = await Fr("proxy_dashscope_request", {
      path: i,
      method: n.toUpperCase(),
      headers: r,
      body: o
    });
    try {
      return JSON.parse(s);
    } catch {
      return s;
    }
  } catch (s) {
    throw s;
  }
}

function W4t(e) {
  try {
    return e.toLowerCase().includes("/vidu/");
  } catch {
    return !1;
  }
}

function q4t(e) {
  try {
    const t = new URL(e).hostname.toLowerCase();
    return t === "shop.comfly.chat" || t === "www.shop.comfly.chat" || t === "new.comfly.chat" || t === "www.new.comfly.chat";
  } catch {
    const t = e.toLowerCase();
    return t.includes("shop.comfly.chat") || t.includes("new.comfly.chat");
  }
}

async function LDe(e) {
  const t = [];
  for (const [n, r] of e.entries()) if (typeof r == "string") t.push({
    name: n,
    value: r
  });else if (r instanceof Blob) {
    if (!r.size) throw new Error(`multipart 字段 "${n}" 文件为空（0 bytes），拒绝经代理发送以免网关报 NextPart: EOF`);
    const a = await NCr(r);
    if (!a) throw new Error(`multipart 字段 "${n}" Base64 序列化结果为空，拒绝经代理发送以免网关报 NextPart: EOF`);
    const i = r instanceof File ? r.name : void 0,
      o = (r.type || "").trim() || PCr(i);
    t.push({
      name: n,
      blob_base64: a,
      filename: i,
      mime_type: o
    });
  }
  return t;
}

function PCr(e) {
  var n;
  const t = ((n = String(e || "").split(".").pop()) == null ? void 0 : n.toLowerCase()) || "";
  return t === "jpg" || t === "jpeg" ? "image/jpeg" : t === "png" ? "image/png" : t === "webp" ? "image/webp" : t === "gif" ? "image/gif" : t === "mp4" ? "video/mp4" : t === "mov" ? "video/quicktime" : t === "webm" ? "video/webm" : t === "wav" ? "audio/wav" : t === "mp3" ? "audio/mpeg" : t === "m4a" ? "audio/mp4" : "application/octet-stream";
}

function RCr(e) {
  try {
    const t = e.toLowerCase();
    return t.includes("/files/upload") ? t.includes("/minimax/") ? !0 : t.includes("minimax.io") || t.includes("minimaxi.chat") : !1;
  } catch {
    return !1;
  }
}

async function JVt(e, t, n = 300) {
  const r = FN(t),
    a = (t.method || "POST").toUpperCase(),
    i = await LDe(t.body),
    o = {
      ...r
    };
  delete o["content-type"], delete o["Content-Type"];
  const s = await Fr("proxy_fetch_raw", {
      args: {
        url: e,
        method: a,
        headers: o,
        body: void 0,
        formData: i.length ? i : void 0,
        timeoutSecs: n
      }
    }),
    l = new Headers();
  if (s != null && s.headers && typeof s.headers == "object") for (const [d, u] of Object.entries(s.headers)) typeof u == "string" && l.set(d, u);
  return l.has("content-type") || l.set("content-type", "application/json; charset=utf-8"), new Response((s == null ? void 0 : s.body) ?? "", {
    status: (s == null ? void 0 : s.status) ?? 502,
    statusText: "OK",
    headers: l
  });
}

function NCr(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      const i = r.result.split(",")[1];
      t(i || "");
    }, r.onerror = () => n(r.error), r.readAsDataURL(e);
  });
}

function FN(e) {
  const t = {};
  return e.headers && (e.headers instanceof Headers ? e.headers.forEach((n, r) => {
    t[r] = n;
  }) : Array.isArray(e.headers) ? e.headers.forEach(([n, r]) => {
    t[n] = r;
  }) : Object.assign(t, e.headers)), t;
}

function bVe() {
  var n, r;
  if (typeof window > "u") return !1;
  const e = String(((n = window.location) == null ? void 0 : n.hostname) || "").toLowerCase(),
    t = String(((r = window.location) == null ? void 0 : r.protocol) || "").toLowerCase();
  return e === "tauri.localhost" || e === "asset.localhost" || t === "tauri:";
}

function jCr(e) {
  const t = e.toLowerCase();
  return t === "localhost" || t === "127.0.0.1" || t === "[::1]" || t === "::1";
}

function ZSn(e) {
  var n;
  const t = String(e || "").trim();
  if (!t || t.startsWith("/") || t.startsWith("blob:") || t.startsWith("data:")) return !1;
  try {
    const r = new URL(t);
    return !(r.protocol !== "http:" && r.protocol !== "https:" || jCr(r.hostname) || typeof window < "u" && r.hostname.toLowerCase() === String(((n = window.location) == null ? void 0 : n.hostname) || "").toLowerCase());
  } catch {
    return !1;
  }
}

function K4t(e) {
  return ZSn(e) ? bVe() ? !0 : !!us() : !1;
}

function DCr(e) {
  const t = new Headers();
  if (e != null && e.headers && typeof e.headers == "object") for (const [r, a] of Object.entries(e.headers)) typeof a == "string" && t.set(r, a);
  t.has("content-type") || t.set("content-type", "application/json; charset=utf-8"), t.delete("content-encoding"), t.delete("content-length");
  const n = new Response((e == null ? void 0 : e.body) ?? "", {
    status: (e == null ? void 0 : e.status) ?? 502,
    statusText: "OK",
    headers: t
  });
  return typeof (e == null ? void 0 : e.finalURL) == "string" && /^https?:\/\//i.test(e.finalURL) && Object.defineProperty(n, "url", {
    value: e.finalURL
  }), n;
}

async function LCr(e) {
  return e.body == null ? {} : typeof e.body == "string" ? {
    body: e.body
  } : e.body instanceof FormData ? {
    formData: await LDe(e.body)
  } : typeof e.body.text == "function" ? {
    body: await e.body.text()
  } : {};
}

async function OCr(e, t, n, r, a, i = 4) {
  await O4e();
  const o = JSON.stringify({
    url: e,
    method: t.toUpperCase(),
    headers: n,
    body: r ?? void 0,
    formData: a != null && a.length ? a : void 0
  });
  let s = null;
  for (let l = 0; l <= i; l++) try {
    const d = await fetch(G4t, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: o
      }),
      u = await d.text();
    return new Response(u, {
      status: d.status,
      statusText: d.statusText,
      headers: {
        "Content-Type": d.headers.get("content-type") || "application/json; charset=utf-8"
      }
    });
  } catch (d) {
    if (s = d instanceof Error ? d : new Error(String(d)), l < i && XSn(s.message)) {
      await new Promise(u => setTimeout(u, 500 + 600 * (l + 1)));
      continue;
    }
    throw s;
  }
  throw s || new Error("Proxy request failed");
}

async function BCr(e, t = {}) {
  const n = FN(t),
    r = (t.method || "GET").toUpperCase(),
    {
      body: a,
      formData: i
    } = await LCr(t),
    o = {
      ...n
    };
  i != null && i.length && (delete o["content-type"], delete o["Content-Type"]);
  const s = r === "POST" || r === "PUT" || r === "PATCH" ? 300 : 60,
    l = {
      url: e,
      method: r,
      headers: o,
      body: a ?? void 0,
      formData: i != null && i.length ? i : void 0,
      timeoutSecs: s
    };
  try {
    const d = await Fr("proxy_fetch_raw", {
      args: l
    });
    return DCr(d);
  } catch (d) {
    if (!(bVe() || us() && !0)) throw d;
    try {
      return await OCr(e, r, o, a, i);
    } catch {
      throw d;
    }
  }
}

function Q4t(e, t = {}) {
  return t.body instanceof FormData || !us() && !bVe() ? !1 : W4t(e) || e.includes("generativelanguage.googleapis.com") || Mle(e) || q4t(e) || K4t(e);
}

function e3n(e) {
  const t = e instanceof Error ? e.message : String(e ?? "");
  return /未实现的原生命令:\s*proxy_fetch_json|proxy_fetch_json\s+not\s+allowed|command\s+proxy_fetch_json\s+not found|proxy_fetch_json[^\n]*command not found|unknown command[^\n]*proxy_fetch_json|lingo-electron-proxy-fetch-json/i.test(t);
}

async function t3n(e, t = {}) {
  if (!Q4t(e, t)) throw new Error(`proxy_fetch_json is not available for ${e}`);
  const n = FN(t),
    r = (t.method || "GET").toUpperCase();
  let a;
  if (t.body != null) if (typeof t.body == "string") a = t.body;else if (typeof t.body.text == "function") a = await t.body.text();else throw new Error("proxy_fetch_json only supports string-like request bodies");
  let i = r === "POST" ? 180 : 60;
  (W4t(e) || q4t(e)) && (i = r === "POST" ? 300 : 60), Mle(e) && (i = r === "POST" ? 180 : 45);
  const o = {
      url: e,
      method: r,
      headers: n,
      body: a ?? void 0,
      timeoutSecs: i
    },
    s = Mle(e) ? Vht(e, o) : o,
    l = await Fr("proxy_fetch_json", {
      args: s
    });
  return {
    status: Number((l == null ? void 0 : l.status) ?? 0),
    headers: l != null && l.headers && typeof l.headers == "object" ? l.headers : {},
    data: l == null ? void 0 : l.data,
    parsed: (l == null ? void 0 : l.parsed) === !0,
    bodyBytes: Number((l == null ? void 0 : l.bodyBytes) ?? (l == null ? void 0 : l.body_bytes) ?? 0)
  };
}

async function $i(e, t = {}) {
  t = TCr(e, t);
  const n = e.includes("dashscope.aliyuncs.com"),
    r = W4t(e),
    a = us();
  if (r) {
    const s = us() && !0,
      l = FN(t);
    let d, u;
    t.body != null && (typeof t.body == "string" ? d = t.body : t.body instanceof FormData ? u = await LDe(t.body) : typeof t.body.text == "function" ? d = await t.body.text() : d = void 0);
    const h = (t.method || "GET").toUpperCase();
    try {
      if (s) {
        const f = async () => {
            const b = await Fr("proxy_fetch_raw", {
                args: {
                  url: e,
                  method: h,
                  headers: l,
                  body: d ?? void 0,
                  formData: u != null && u.length ? u : void 0,
                  timeoutSecs: h === "POST" ? 300 : 60
                }
              }),
              v = new Headers();
            if (b != null && b.headers && typeof b.headers == "object") for (const [_, w] of Object.entries(b.headers)) typeof w == "string" && v.set(_, w);
            return v.has("content-type") || v.set("content-type", "application/json; charset=utf-8"), new Response((b == null ? void 0 : b.body) ?? "", {
              status: (b == null ? void 0 : b.status) ?? 200,
              statusText: "OK",
              headers: v
            });
          },
          y = async () => {
            const b = await MCr(e, h, l, d, u);
            return new Response(b, {
              status: 200,
              statusText: "OK",
              headers: {
                "Content-Type": "application/json"
              }
            });
          };
        try {
          return await f();
        } catch (b) {
          try {
            return await y();
          } catch {
            try {
              return await f();
            } catch {
              throw b;
            }
          }
        }
      }
      const p = await Fr("proxy_fetch_raw", {
          args: {
            url: e,
            method: h,
            headers: l,
            body: d ?? void 0,
            formData: u != null && u.length ? u : void 0,
            timeoutSecs: h === "POST" ? 300 : 60
          }
        }),
        m = new Headers();
      if (p != null && p.headers && typeof p.headers == "object") for (const [f, y] of Object.entries(p.headers)) typeof y == "string" && m.set(f, y);
      return m.has("content-type") || m.set("content-type", "application/json; charset=utf-8"), new Response((p == null ? void 0 : p.body) ?? "", {
        status: (p == null ? void 0 : p.status) ?? 200,
        statusText: "OK",
        headers: m
      });
    } catch (p) {
      const m = p instanceof Error ? p.message : String(p),
        f = us() && !0,
        y = /capability|permission|denied|allow|not allowed|unauthorized|IPC/i.test(m),
        b = m.includes("HTTP ") || m.includes("502") || m.includes("Bad Gateway") || m.includes("timeout") || m.includes("Timeout") || m.includes("Request failed");
      if (y) return new Response(JSON.stringify({
        error: "打包版需要后端代理权限。请重新安装应用或确认应用未损坏。"
      }), {
        status: 403,
        statusText: "Capability",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (b) {
        let v = m;
        return m.includes("502") || m.includes("Bad Gateway") ? v = "API 服务暂时不可用 (502)，请稍后重试或检查 API 服务状态。" : (m.includes("timeout") || m.includes("Timeout")) && (v = "请求超时，请检查网络后重试。"), new Response(JSON.stringify({
          error: v
        }), {
          status: 500,
          statusText: "Proxy Error"
        });
      }
      if (f) return new Response(JSON.stringify({
        error: "打包版 Vidu 需通过 Tauri 后端代理。请确认应用已正确安装；若仍失败可尝试重新安装。可检查本机 41600 端口是否被占用、或安全软件是否拦截。"
      }), {
        status: 403,
        statusText: "Proxy",
        headers: {
          "Content-Type": "application/json"
        }
      });
      try {
        const v = new URL(e),
          _ = `/api/vidu-proxy${v.pathname}${v.search}`,
          w = await fetch(_, {
            method: t.method || "GET",
            headers: t.headers,
            body: t.body
          }),
          k = await w.text();
        return /^\s*<(!DOCTYPE|html|head|<)/i.test(k) || w.status === 404 && k.length > 0 ? new Response(JSON.stringify({
          error: "打包版 Vidu 需通过 Tauri 后端代理。请确认应用已正确安装；若仍失败，可尝试重新安装。"
        }), {
          status: 403,
          statusText: "Proxy",
          headers: {
            "Content-Type": "application/json"
          }
        }) : new Response(k, {
          status: w.status,
          statusText: w.statusText,
          headers: w.headers
        });
      } catch {
        return new Response(JSON.stringify({
          error: "Vidu 图生视频需在 Tauri 桌面版中运行（tauri dev 或打包后启动），或确保使用 npm run dev 启动开发服务器以通过代理访问。"
        }), {
          status: 403,
          statusText: "CORS",
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }
  }
  const i = e.includes("generativelanguage.googleapis.com");
  if (a && i) try {
    const s = FN(t);
    let l;
    t.body != null && (typeof t.body == "string" ? l = t.body : typeof t.body.text == "function" && (l = await t.body.text()));
    const d = (t.method || "GET").toUpperCase(),
      u = await Fr("proxy_fetch_raw", {
        args: {
          url: e,
          method: d,
          headers: s,
          body: l ?? void 0,
          timeoutSecs: d === "POST" ? 180 : 60
        }
      }),
      h = new Headers();
    if (u != null && u.headers && typeof u.headers == "object") for (const [p, m] of Object.entries(u.headers)) typeof m == "string" && h.set(p, m);
    return h.has("content-type") || h.set("content-type", "application/json; charset=utf-8"), new Response((u == null ? void 0 : u.body) ?? "", {
      status: (u == null ? void 0 : u.status) || 200,
      statusText: "OK",
      headers: h
    });
  } catch (s) {
    const l = s instanceof Error ? s.message : String(s),
      d = /HTTP |502|timeout|Timeout|Request failed/i.test(l);
    return new Response(JSON.stringify({
      error: d ? l : `Gemini 官方 API 代理请求失败: ${l}`
    }), {
      status: 500,
      statusText: "Proxy Error",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  const o = Mle(e);
  if (a && o) try {
    const s = FN(t),
      l = (t.method || "GET").toUpperCase();
    if (t.body instanceof FormData) {
      const p = await LDe(t.body),
        m = {
          ...s
        };
      delete m["content-type"], delete m["Content-Type"];
      const f = await Fr("proxy_fetch_raw", {
          args: Vht(e, {
            url: e,
            method: l,
            headers: m,
            body: void 0,
            formData: p.length ? p : void 0,
            timeoutSecs: l === "POST" ? 300 : 60
          })
        }),
        y = new Headers();
      if (f != null && f.headers && typeof f.headers == "object") for (const [b, v] of Object.entries(f.headers)) typeof v == "string" && y.set(b, v);
      return y.has("content-type") || y.set("content-type", "application/json; charset=utf-8"), new Response((f == null ? void 0 : f.body) ?? "", {
        status: (f == null ? void 0 : f.status) ?? 502,
        statusText: "OK",
        headers: y
      });
    }
    let d;
    t.body != null && (typeof t.body == "string" ? d = t.body : typeof t.body.text == "function" && (d = await t.body.text()));
    const u = await Fr("proxy_fetch_raw", {
        args: Vht(e, {
          url: e,
          method: l,
          headers: s,
          body: d ?? void 0,
          timeoutSecs: l === "POST" ? 180 : 45
        })
      }),
      h = new Headers();
    if (u != null && u.headers && typeof u.headers == "object") for (const [p, m] of Object.entries(u.headers)) typeof m == "string" && h.set(p, m);
    return h.has("content-type") || h.set("content-type", "application/json; charset=utf-8"), new Response((u == null ? void 0 : u.body) ?? "", {
      status: (u == null ? void 0 : u.status) ?? 502,
      statusText: "OK",
      headers: h
    });
  } catch (s) {
    const l = s instanceof Error ? s.message : String(s),
      d = V4t(l),
      u = d ? `${l}
${d}` : l;
    return new Response(JSON.stringify({
      error: `虎牙 API 代理请求失败: ${u}`
    }), {
      status: 500,
      statusText: "Proxy Error",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  if (a && RCr(e) && t.body instanceof FormData) try {
    return await JVt(e, t, 300);
  } catch (s) {
    const l = s instanceof Error ? s.message : String(s);
    return new Response(JSON.stringify({
      error: `MiniMax 文件上传代理失败: ${l}`
    }), {
      status: 500,
      statusText: "Proxy Error",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  if (q4t(e)) try {
    if (t.body instanceof FormData) return await JVt(e, t, 300);
    const s = FN(t),
      l = (t.method || "GET").toUpperCase();
    let d;
    t.body != null && (typeof t.body == "string" ? d = t.body : typeof t.body.text == "function" && (d = await t.body.text()));
    const u = await Fr("proxy_fetch_raw", {
        args: {
          url: e,
          method: l,
          headers: s,
          body: d ?? void 0,
          timeoutSecs: l === "POST" ? 300 : 60
        }
      }),
      h = new Headers();
    if (u != null && u.headers && typeof u.headers == "object") for (const [p, m] of Object.entries(u.headers)) typeof m == "string" && h.set(p, m);
    return h.has("content-type") || h.set("content-type", "application/json; charset=utf-8"), new Response((u == null ? void 0 : u.body) ?? "", {
      status: (u == null ? void 0 : u.status) ?? 502,
      statusText: "OK",
      headers: h
    });
  } catch (s) {
    const l = s instanceof Error ? s.message : String(s);
    return a ? new Response(JSON.stringify({
      error: `shop.comfly 代理请求失败: ${l}`
    }), {
      status: 500,
      statusText: "Proxy Error",
      headers: {
        "Content-Type": "application/json"
      }
    }) : fetch(e, t);
  }
  if (a && n) try {
    const s = new URL(e),
      l = s.pathname + s.search,
      d = FN(t),
      u = await JSn(l, {
        method: t.method || "GET",
        headers: d,
        body: t.body
      }),
      h = typeof u == "string" ? u : JSON.stringify(u);
    return new Response(h, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (s) {
    const l = s instanceof Error ? s.message : String(s);
    return new Response(JSON.stringify({
      error: l,
      details: "Tauri proxy failed. Check if proxy_dashscope_request command is registered."
    }), {
      status: 500,
      statusText: "Proxy Error"
    });
  }
  if (K4t(e)) try {
    return await BCr(e, t);
  } catch (s) {
    const l = s instanceof Error ? s.message : String(s);
    return new Response(JSON.stringify({
      error: `桌面端代理请求失败: ${l}`
    }), {
      status: 502,
      statusText: "Proxy Error",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  return fetch(e, t);
}

const FCr = Object.freeze(Object.defineProperty({
    __proto__: null,
    canFetchJsonWithNativeProxy: Q4t,
    ensureBuiltinHttpProxy: O4e,
    fetchJsonWithNativeProxy: t3n,
    fetchStreamingWithTauriProxy: H4t,
    fetchWithTauriProxy: $i,
    getHuyaProxyInvokeErrorHint: V4t,
    hasRustProxyFetchBackend: Ple,
    isElectronNativeShell: o3,
    isNativeJsonProxyUnavailableError: e3n,
    isPackagedTauriWebViewOrigin: bVe,
    isRemoteCrossOriginApiUrl: ZSn,
    isTauriEnvironment: us,
    proxyDashScopeRequest: JSn,
    shouldProxyRemoteFromDesktopWebView: K4t
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  zCr = 1;

let JZe = 0;

const ZVt = [];

function Y4t(e) {
  const t = async () => {
    JZe += 1;
    try {
      return await e();
    } finally {
      JZe -= 1;
      const n = ZVt.shift();
      n && n();
    }
  };
  return JZe < zCr ? t() : new Promise((n, r) => {
    ZVt.push(() => {
      t().then(n, r);
    });
  });
}

const Sue = "qiaodoumayi_huya_seedance_oss",
  X4t = "qiaodoumayi_media_hosting_domain_hidden",
  J4t = "qiaodoumayi_media_hosting_bucket_hidden",
  ODe = "qiaodoumayi-media-hosting-domain-hidden",
  UCr = "Alibaba Cloud OSS",
  $Cr = "alibaba-cloud-oss-config.json",
  go = "qiaodoumayi-huya-seedance-oss-config-changed";

function Z4t() {
  try {
    return localStorage.getItem(X4t) === "1";
  } catch {
    return !1;
  }
}

function n3n(e) {
  r3n(X4t, e);
}

function e5t() {
  try {
    return localStorage.getItem(J4t) === "1";
  } catch {
    return !1;
  }
}

function Hht(e) {
  r3n(J4t, e);
}

function Wht() {
  return Z4t() || e5t();
}

function r3n(e, t) {
  try {
    localStorage.setItem(e, t ? "1" : "0");
  } catch {}
  typeof window < "u" && window.dispatchEvent(new CustomEvent(ODe));
}

function a3n() {
  return {
    bucket: "",
    endpoint: "",
    accessKeyId: "",
    accessKeySecret: "",
    prefix: "",
    materialPrefix: ""
  };
}

function i3n() {
  return {
    cloudinaryCloudName: "",
    cloudinaryApiKey: "",
    cloudinaryApiSecret: "",
    cloudinaryFolder: "",
    prefix: "",
    materialPrefix: ""
  };
}

function o3n() {
  return {
    bucket: "",
    endpoint: "z2",
    accessKeyId: "",
    accessKeySecret: "",
    qiniuDomain: "",
    prefix: "",
    materialPrefix: ""
  };
}

function mz() {
  return {
    version: 2,
    provider: "aliyun-oss",
    globalUploadEnabled: !0,
    profiles: {
      "aliyun-oss": a3n(),
      cloudinary: i3n(),
      qiniu: o3n()
    }
  };
}

function s3n() {
  return {
    provider: "aliyun-oss",
    bucket: "",
    endpoint: "",
    accessKeyId: "",
    accessKeySecret: "",
    prefix: "",
    globalUploadEnabled: !0,
    materialPrefix: "",
    cloudinaryCloudName: "",
    cloudinaryApiKey: "",
    cloudinaryApiSecret: "",
    cloudinaryFolder: "",
    qiniuDomain: ""
  };
}

function mae(e) {
  return e === "cloudinary" ? "cloudinary" : e === "qiniu" ? "qiniu" : "aliyun-oss";
}

function mo(e) {
  if (e) return mae(e.provider);
  try {
    const t = localStorage.getItem(Sue);
    if (t) {
      const n = JSON.parse(t);
      if (n.version === 2) return mae(n.provider);
      if (n.provider === "cloudinary") return "cloudinary";
      if (n.provider === "qiniu") return "qiniu";
      if (n.provider === "aliyun-oss") return "aliyun-oss";
    }
  } catch {}
  return mae(sc().provider);
}

function vD(e) {
  const t = String(e ?? "").trim().toLowerCase();
  return t ? /^z[0-2]$/.test(t) || t === "na0" || t === "as0" || t === "cn-east-2" ? t : t.includes("华南") || t.includes("广东") || t.includes("cn-south") ? "z2" : t.includes("华北") || t.includes("cn-north") ? "z1" : t.includes("华东") || t.includes("浙江") || t.includes("cn-east") ? "z0" : t : "z0";
}

function s3(e) {
  var r;
  let t = String(e ?? "").trim();
  return t ? (t = t.replace(/^https?\(s\):\/\//i, ""), t = t.replace(/^https?:\/\//i, ""), t = t.replace(/^\/+/, ""), (((r = t.split(/[/?#]/)[0]) == null ? void 0 : r.trim()) ?? "").replace(/\/+$/, "")) : "";
}

function B4e(e) {
  const t = s3(e).toLowerCase();
  return t ? /\.s3\./i.test(t) || t.includes("qiniucs.com") : !1;
}

function Mwe(e) {
  return B4e(e) ? "当前填的是 S3 协议接口域名，浏览器无法匿名访问图片。请到「域名管理」复制 CDN 测试域名（如 xxx.hn-bkt.clouddn.com）或绑定自定义 CDN 域名。" : null;
}

function t5t(e) {
  const t = String(e || "").trim().toLowerCase();
  return t && (t.endsWith(".clouddn.com") || t.endsWith(".qiniucdn.com")) ? "http" : "https";
}

const eHt = "qiaodoumayi_global_oss_upload_dedup_v1";

function vVe(e) {
  const t = String(e || "").trim().toLowerCase();
  return t ? t.endsWith(".clouddn.com") || t.endsWith(".qiniucdn.com") : !1;
}

function ZZe(e, t) {
  const n = bb(String(e || "").trim());
  if (/^https?:\/\//i.test(n)) try {
    const r = new URL(n).hostname.toLowerCase();
    if (!r || B4e(r)) return;
    (vVe(r) || !r.includes("qiniucs.com")) && t.add(r);
  } catch {}
}

let hR = null;

function GCr() {
  return [...l3n()];
}

function l3n() {
  const e = sc(),
    t = s3(e.qiniuDomain).toLowerCase(),
    n = String(e.bucket || "").trim();
  if (hR && hR.cacheKey.startsWith(`${n}|${t}|`)) return hR.hosts;
  let r = "0";
  try {
    const s = localStorage.getItem(eHt);
    r = s ? String(s.length) : "0";
  } catch {
    r = "0";
  }
  const a = `${n}|${t}|${r}`;
  if ((hR == null ? void 0 : hR.cacheKey) === a) return hR.hosts;
  const i = new Set(),
    o = s => {
      const l = s3(s).toLowerCase();
      l && !B4e(l) && i.add(l);
    };
  o(e.qiniuDomain);
  try {
    const s = Iue();
    o(s.profiles.qiniu.qiniuDomain);
  } catch {}
  try {
    const s = localStorage.getItem(eHt);
    if (s) {
      const l = JSON.parse(s);
      for (const d of Object.values((l == null ? void 0 : l.entries) || {})) ZZe(d == null ? void 0 : d.remoteUrl, i), ZZe(d == null ? void 0 : d.thumbnailUrl, i), ZZe(d == null ? void 0 : d.displayUrl, i);
    }
  } catch {}
  return hR = {
    cacheKey: a,
    hosts: i
  }, i;
}

function n5t() {
  hR = null;
}

function c3n(e) {
  const t = String(e || "").trim().toLowerCase();
  return !t || B4e(t) ? !1 : vVe(t) ? !0 : l3n().has(t);
}

function N$(e) {
  const t = bb(String(e || "").trim());
  if (!/^https?:\/\//i.test(t) || /qiniucs\.com/i.test(t)) return !1;
  if (/qiniucdn\.com/i.test(t) || /clouddn\.com/i.test(t)) return !0;
  try {
    return c3n(new URL(t).hostname);
  } catch {
    return !1;
  }
}

function d3n(e) {
  let t = String(e ?? "").trim();
  if (!t) return "";
  const n = t.match(/res\.cloudinary\.com\/([^/?#]+)/i);
  if (n != null && n[1]) return n[1].trim();
  const r = t.match(/\/v1_1\/([^/?#]+)/i);
  return r != null && r[1] ? r[1].trim() : t.replace(/^\/+|\/+$/g, "");
}

function u3n(e) {
  return String(e ?? "").trim().replace(/^\/+|\/+$/g, "");
}

function F4e(e) {
  var i;
  const t = String(e || "").trim();
  if (!t) return "Cloudinary 上传失败";
  let n = t;
  const r = t.match(/\{[\s\S]*\}/);
  if (r) try {
    const o = JSON.parse(r[0]);
    (i = o == null ? void 0 : o.error) != null && i.message && (n = o.error.message);
  } catch {}
  const a = n.match(/Invalid cloud_name\s+(\S+)/i);
  return a ? `Cloud Name「${a[1]}」在 Cloudinary 不存在。请填控制台左上角环境名（Dashboard → Product environment credentials 里的 Cloud name），不要填 Upload Presets 的预设名` : /invalid signature/i.test(n) ? "API Secret 错误或与当前 Cloud Name / API Key 不匹配，请从控制台重新复制 API Secret" : /resources with extension bin are not allowed/i.test(n) ? "Cloudinary 不允许上传 .bin 扩展名文件；JSON/文本备份请使用 raw 类型（应用已自动修正，请重试备份）" : /invalid api key/i.test(n) ? "API Key 无效，请从控制台 Product environment credentials 重新复制" : /401|unauthorized/i.test(t) && !a ? `鉴权失败：${n}。请核对 Cloud name、API Key、API Secret 是否来自同一环境` : n;
}

function h3n(e) {
  return {
    bucket: String((e == null ? void 0 : e.bucket) ?? ""),
    endpoint: String((e == null ? void 0 : e.endpoint) ?? ""),
    accessKeyId: String((e == null ? void 0 : e.accessKeyId) ?? ""),
    accessKeySecret: String((e == null ? void 0 : e.accessKeySecret) ?? ""),
    prefix: String((e == null ? void 0 : e.prefix) ?? ""),
    materialPrefix: tU(e == null ? void 0 : e.materialPrefix)
  };
}

function p3n(e) {
  const t = vj(e == null ? void 0 : e.cloudinaryFolder),
    n = String((e == null ? void 0 : e.materialPrefix) ?? "").trim(),
    r = t || vj(n),
    a = n && n.endsWith("/") ? n.replace(/^\/+/, "") : tU(n || r);
  return {
    cloudinaryCloudName: d3n(e == null ? void 0 : e.cloudinaryCloudName),
    cloudinaryApiKey: String((e == null ? void 0 : e.cloudinaryApiKey) ?? "").trim(),
    cloudinaryApiSecret: String((e == null ? void 0 : e.cloudinaryApiSecret) ?? "").trim(),
    cloudinaryFolder: r,
    prefix: String((e == null ? void 0 : e.prefix) ?? ""),
    materialPrefix: a
  };
}

function m3n(e) {
  return {
    bucket: String((e == null ? void 0 : e.bucket) ?? ""),
    endpoint: vD(e == null ? void 0 : e.endpoint),
    accessKeyId: String((e == null ? void 0 : e.accessKeyId) ?? ""),
    accessKeySecret: String((e == null ? void 0 : e.accessKeySecret) ?? ""),
    qiniuDomain: s3(e == null ? void 0 : e.qiniuDomain),
    prefix: String((e == null ? void 0 : e.prefix) ?? ""),
    materialPrefix: tU(e == null ? void 0 : e.materialPrefix)
  };
}

function r5t(e) {
  const t = mae(e.provider),
    n = s3n();
  if (t === "cloudinary") {
    const a = e.profiles.cloudinary;
    return {
      ...n,
      provider: t,
      globalUploadEnabled: e.globalUploadEnabled,
      prefix: a.prefix,
      materialPrefix: a.materialPrefix,
      cloudinaryCloudName: a.cloudinaryCloudName,
      cloudinaryApiKey: a.cloudinaryApiKey,
      cloudinaryApiSecret: a.cloudinaryApiSecret,
      cloudinaryFolder: a.cloudinaryFolder
    };
  }
  if (t === "qiniu") {
    const a = e.profiles.qiniu;
    return {
      ...n,
      provider: t,
      globalUploadEnabled: e.globalUploadEnabled,
      bucket: a.bucket,
      endpoint: a.endpoint,
      accessKeyId: a.accessKeyId,
      accessKeySecret: a.accessKeySecret,
      prefix: a.prefix,
      materialPrefix: a.materialPrefix,
      qiniuDomain: a.qiniuDomain
    };
  }
  const r = e.profiles["aliyun-oss"];
  return {
    ...n,
    provider: t,
    globalUploadEnabled: e.globalUploadEnabled,
    bucket: r.bucket,
    endpoint: r.endpoint,
    accessKeyId: r.accessKeyId,
    accessKeySecret: r.accessKeySecret,
    prefix: r.prefix,
    materialPrefix: r.materialPrefix
  };
}

function a5t(e) {
  const t = s5t(e),
    n = mo(t);
  return n === "cloudinary" ? {
    cloudinary: {
      cloudinaryCloudName: t.cloudinaryCloudName ?? "",
      cloudinaryApiKey: t.cloudinaryApiKey ?? "",
      cloudinaryApiSecret: t.cloudinaryApiSecret ?? "",
      cloudinaryFolder: t.cloudinaryFolder ?? "",
      prefix: t.prefix ?? "",
      materialPrefix: t.materialPrefix ?? ""
    }
  } : n === "qiniu" ? {
    qiniu: {
      bucket: t.bucket,
      endpoint: vD(t.endpoint),
      accessKeyId: t.accessKeyId,
      accessKeySecret: t.accessKeySecret,
      qiniuDomain: t.qiniuDomain ?? "",
      prefix: t.prefix ?? "",
      materialPrefix: t.materialPrefix ?? ""
    }
  } : {
    "aliyun-oss": {
      bucket: t.bucket,
      endpoint: t.endpoint,
      accessKeyId: t.accessKeyId,
      accessKeySecret: t.accessKeySecret,
      prefix: t.prefix ?? "",
      materialPrefix: t.materialPrefix ?? ""
    }
  };
}

function wVe(...e) {
  const t = mz().profiles,
    n = {
      "aliyun-oss": {
        ...t["aliyun-oss"]
      },
      cloudinary: {
        ...t.cloudinary
      },
      qiniu: {
        ...t.qiniu
      }
    };
  for (const r of e) r && (r["aliyun-oss"] && (n["aliyun-oss"] = h3n({
    ...n["aliyun-oss"],
    ...r["aliyun-oss"]
  })), r.cloudinary && (n.cloudinary = p3n({
    ...n.cloudinary,
    ...r.cloudinary
  })), r.qiniu && (n.qiniu = m3n({
    ...n.qiniu,
    ...r.qiniu
  })));
  return n;
}

function VCr(e) {
  const t = s5t(e),
    n = mo(t),
    r = mz();
  r.provider = n, r.globalUploadEnabled = t.globalUploadEnabled !== !1;
  const a = a5t(t);
  return r.profiles = wVe(r.profiles, a), r;
}

function i5t(e) {
  const t = r5t(e),
    n = P2(t);
  let r = {
      ...e
    },
    a = !1;
  return r.globalUploadDefaultOssMigrated || (n && !r.globalUploadEnabled && !r.globalUploadUserOptOut && (r.globalUploadEnabled = !0, a = !0), r.globalUploadDefaultOssMigrated = !0, a = !0), n && !r.globalUploadUserOptOut && !r.globalUploadEnabled && (r.globalUploadEnabled = !0, a = !0), a ? r : e;
}

function xVe(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.version === 2 && t.profiles && typeof t.profiles == "object") {
    const n = t.profiles;
    return {
      version: 2,
      updatedAt: typeof t.updatedAt == "string" ? t.updatedAt : void 0,
      provider: mae(t.provider),
      globalUploadEnabled: t.globalUploadEnabled !== !1,
      globalUploadUserOptOut: !!t.globalUploadUserOptOut,
      globalUploadDefaultOssMigrated: !!t.globalUploadDefaultOssMigrated,
      profiles: {
        "aliyun-oss": h3n(n["aliyun-oss"] ?? {}),
        cloudinary: p3n(n.cloudinary ?? {}),
        qiniu: m3n(n.qiniu ?? {})
      }
    };
  }
  return VCr(t);
}

let MA = null,
  zge = null;

function f3n() {
  MA = null, zge = null;
}

function g3n() {
  f3n();
}

function Iue() {
  if (MA) return {
    ...MA,
    profiles: {
      ...MA.profiles
    }
  };
  try {
    const e = localStorage.getItem(Sue);
    if (!e) return MA = mz(), {
      ...MA,
      profiles: {
        ...MA.profiles
      }
    };
    const t = xVe(JSON.parse(e)) ?? mz(),
      n = i5t(t);
    return n !== t && _Ve(n), MA = n, {
      ...MA,
      profiles: {
        ...MA.profiles
      }
    };
  } catch {
    return MA = mz(), {
      ...MA,
      profiles: {
        ...MA.profiles
      }
    };
  }
}

function _Ve(e) {
  const t = {
    ...xVe(e),
    updatedAt: new Date().toISOString()
  };
  f3n(), n5t(), localStorage.setItem(Sue, JSON.stringify(t)), queueMicrotask(() => {
    window.dispatchEvent(new CustomEvent(go));
  }), Ie(() => Promise.resolve().then(() => yjt), void 0, import.meta.url).then(n => n.pushHuyaSeedanceOssToCacheDirectory(t)).catch(() => {});
}

function y3n(e, t) {
  const n = Iue(),
    r = mo(e),
    a = a5t({
      ...e,
      provider: r
    });
  return n.profiles = wVe(n.profiles, a), n.globalUploadEnabled = !!e.globalUploadEnabled, n.provider = t, _Ve(n), r5t(n);
}

function o5t(...e) {
  const t = mz();
  let n = t.provider,
    r = t.globalUploadEnabled,
    a = !!t.globalUploadUserOptOut,
    i = !!t.globalUploadDefaultOssMigrated;
  const o = [];
  for (const s of e) s && ((s.provider === "cloudinary" || s.provider === "aliyun-oss" || s.provider === "qiniu") && (n = s.provider), typeof s.globalUploadEnabled == "boolean" && (r = s.globalUploadEnabled), typeof s.globalUploadUserOptOut == "boolean" && (a = s.globalUploadUserOptOut), typeof s.globalUploadDefaultOssMigrated == "boolean" && (i = s.globalUploadDefaultOssMigrated), s.profiles && o.push(s.profiles));
  return i5t({
    version: 2,
    provider: n,
    globalUploadEnabled: r,
    globalUploadUserOptOut: a,
    globalUploadDefaultOssMigrated: i,
    profiles: wVe(t.profiles, ...o)
  });
}

function qht(e) {
  var n, r, a, i, o, s, l, d, u, h, p;
  if (!e) return !1;
  const {
    profiles: t
  } = e;
  return !!((n = t["aliyun-oss"].bucket) != null && n.trim() || (r = t["aliyun-oss"].endpoint) != null && r.trim() || (a = t["aliyun-oss"].accessKeyId) != null && a.trim() || (i = t["aliyun-oss"].accessKeySecret) != null && i.trim() || (o = t.cloudinary.cloudinaryCloudName) != null && o.trim() || (s = t.cloudinary.cloudinaryApiKey) != null && s.trim() || (l = t.cloudinary.cloudinaryApiSecret) != null && l.trim() || (d = t.qiniu.bucket) != null && d.trim() || (u = t.qiniu.accessKeyId) != null && u.trim() || (h = t.qiniu.accessKeySecret) != null && h.trim() || (p = t.qiniu.qiniuDomain) != null && p.trim() || e.provider === "cloudinary" || e.provider === "qiniu");
}

function s5t(e) {
  const t = vj(e == null ? void 0 : e.cloudinaryFolder),
    n = String((e == null ? void 0 : e.materialPrefix) ?? "").trim(),
    r = t || vj(n),
    a = n && n.endsWith("/") ? n.replace(/^\/+/, "") : tU(n || r);
  return {
    provider: mae(e == null ? void 0 : e.provider),
    bucket: String((e == null ? void 0 : e.bucket) ?? ""),
    endpoint: String((e == null ? void 0 : e.endpoint) ?? ""),
    accessKeyId: String((e == null ? void 0 : e.accessKeyId) ?? ""),
    accessKeySecret: String((e == null ? void 0 : e.accessKeySecret) ?? ""),
    prefix: String((e == null ? void 0 : e.prefix) ?? ""),
    globalUploadEnabled: (e == null ? void 0 : e.globalUploadEnabled) !== !1,
    materialPrefix: a,
    cloudinaryCloudName: d3n(e == null ? void 0 : e.cloudinaryCloudName),
    cloudinaryApiKey: String((e == null ? void 0 : e.cloudinaryApiKey) ?? "").trim(),
    cloudinaryApiSecret: String((e == null ? void 0 : e.cloudinaryApiSecret) ?? "").trim(),
    cloudinaryFolder: r,
    qiniuDomain: s3(e == null ? void 0 : e.qiniuDomain)
  };
}

function kVe(e) {
  var t, n, r, a;
  return !!((t = e.bucket) != null && t.trim() && vD(e.endpoint) && ((n = e.accessKeyId) != null && n.trim()) && ((r = e.accessKeySecret) != null && r.trim()) && ((a = e.qiniuDomain) != null && a.trim()));
}

function l5t(e) {
  var t, n, r;
  return !!((t = e.cloudinaryCloudName) != null && t.trim() && ((n = e.cloudinaryApiKey) != null && n.trim()) && ((r = e.cloudinaryApiSecret) != null && r.trim()));
}

function c5t(e) {
  var t, n, r, a;
  return !!((t = e.bucket) != null && t.trim() && ((n = e.endpoint) != null && n.trim()) && ((r = e.accessKeyId) != null && r.trim()) && ((a = e.accessKeySecret) != null && a.trim()));
}

function ua() {
  const e = sc();
  return !!(e.globalUploadEnabled && P2(e));
}

function Ph() {
  return P2();
}

function P2(e) {
  const t = e ?? sc(),
    n = mo(t);
  return n === "cloudinary" ? l5t(t) : n === "qiniu" ? kVe(t) : c5t(t);
}

function AVe(e) {
  const t = e ?? sc(),
    n = mo(t),
    r = t9(n);
  if (!P2(t)) throw new Error(n === "cloudinary" ? "请先在「设置 → 画布功能 → 图床」中配置 Cloudinary（Cloud Name、API Key、API Secret）" : n === "qiniu" ? "请先在「设置 → 画布功能 → 图床」中配置七牛云（Bucket、区域、外链域名、Access Key）" : "请先在「设置 → 画布功能 → 图床」中配置阿里云 OSS（Bucket、Endpoint、AccessKey）");
  if (n === "qiniu") {
    const a = Mwe(t.qiniuDomain);
    if (a) throw new Error(a);
  }
  if (!us()) throw new Error(`${r} 上传需在桌面端运行（Tauri 或 Electron 打包版）`);
}

function sc() {
  return zge ? {
    ...zge
  } : (zge = r5t(Iue()), {
    ...zge
  });
}

function b3n(e) {
  const t = s5t(e),
    n = Iue(),
    r = mo(t),
    a = a5t({
      ...t,
      provider: r
    });
  n.profiles = wVe(n.profiles, a), n.provider = r, t.globalUploadEnabled ? (n.globalUploadEnabled = !0, n.globalUploadUserOptOut = !1) : (n.globalUploadEnabled = !1, n.globalUploadUserOptOut = !0), P2(t) && !n.globalUploadUserOptOut && (n.globalUploadEnabled = !0), _Ve(i5t(n));
}

function d5t(e) {
  const t = String(e || "").replace(/^\/+/, "").replace(/\/+$/, "");
  return t ? t.split("/").map(n => {
    if (!n) return "";
    try {
      return encodeURIComponent(decodeURIComponent(n));
    } catch {
      return encodeURIComponent(n);
    }
  }).join("/") : "";
}

function XJ(e, t) {
  if (mo(e) === "qiniu") return Cue(e, t);
  const n = String(e.endpoint || "").trim().replace(/^https?:\/\//i, "").replace(/\/+$/, ""),
    r = String(e.bucket || "").trim(),
    a = d5t(t);
  return `https://${r}.${n}/${a}`;
}

function bb(e) {
  let t = String(e || "").trim();
  if (!t) return t;
  t = t.replace(/^https?:\/\/http\(s\)\//i, "https://");
  try {
    const n = new URL(t);
    if (n.protocol === "https:" && t5t(n.hostname) === "http") return n.protocol = "http:", n.toString();
  } catch {}
  return t;
}

function Cue(e, t) {
  const n = s3(e.qiniuDomain);
  if (!n) return "";
  const r = t5t(n),
    a = d5t(t);
  return `${r}://${n}/${a}`;
}

function u5t(e) {
  const t = e ?? sc();
  return vD(t.endpoint);
}

async function SVe(e, t, n) {
  const r = sc();
  if (!kVe(r)) throw new Error("请先在「设置 → 画布功能 → 图床」中配置七牛云（Bucket、区域、外链域名、Access Key）");
  if (!us()) throw new Error("七牛云上传需在桌面端运行（Tauri 或 Electron 打包版）");
  const a = e.type || "application/octet-stream",
    i = await IVe(e),
    o = t.trim().replace(/^\/+/, ""),
    s = await Fr("qiniu_put_object", {
      args: {
        region: u5t(r),
        bucket: r.bucket.trim(),
        object_key: o,
        access_key_id: r.accessKeyId.trim(),
        access_key_secret: r.accessKeySecret.trim(),
        domain: s3(r.qiniuDomain),
        content_type: a,
        body_base64: i,
        ...(n ? {
          cache_control: n
        } : {})
      }
    }),
    l = String(s || "").trim();
  return /^https?:\/\//i.test(l) ? l : Cue(r, o);
}

function IVe(e) {
  return Y4t(() => new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      const a = r.result,
        i = a.indexOf(",");
      t(i >= 0 ? a.slice(i + 1) : a);
    }, r.onerror = () => n(r.error), r.readAsDataURL(e);
  }));
}

function v3n(e) {
  var o;
  const t = String(e || ""),
    n = t.indexOf(",");
  if (n <= 5) return null;
  const r = t.slice(0, n);
  if (!/^data:/i.test(r) || !/;base64(?:;|$)/i.test(r)) return null;
  const a = ((o = r.slice(5).split(";", 1)[0]) == null ? void 0 : o.trim().toLowerCase()) || "",
    i = t.slice(n + 1);
  return !a || !i ? null : {
    mimeType: a,
    bodyBase64: i
  };
}

function CVe(e, t = "bin") {
  const n = (e || "").toLowerCase();
  return n.includes("jpeg") || n.includes("jpg") ? "jpg" : n.includes("png") ? "png" : n.includes("webp") ? "webp" : n.includes("gif") ? "gif" : n.includes("mp4") ? "mp4" : n.includes("quicktime") || n.includes("mov") ? "mov" : n.includes("webm") ? "webm" : n.includes("wav") ? "wav" : n.includes("mpeg") || n.includes("mp3") ? "mp3" : n.includes("m4a") ? "m4a" : t;
}

function w3n(e, t) {
  const n = String(e ?? "").trim().replace(/^\/+/, ""),
    r = n === "" ? "" : n.endsWith("/") ? n : `${n}/`,
    a = CVe(t.type, t.name.split(".").pop() || "bin"),
    i = (t.name || `media.${a}`).replace(/[^\w.\-]+/g, "_").slice(0, 80);
  return `${r}${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${i}`;
}

function Kht(e, t) {
  return w3n(String(e.prefix ?? ""), t);
}

function vj(e) {
  return String(e ?? "").trim().replace(/^\/+|\/+$/g, "");
}

function tU(e) {
  const t = vj(e);
  return t ? `${t}/` : "";
}

function x3n(e) {
  const t = e ?? sc(),
    n = vj(t.cloudinaryFolder),
    r = vj(t.materialPrefix);
  return n || r;
}

function h5t(e, t) {
  const n = x3n(t);
  return n ? `${n}/${e}` : e;
}

function _3n(e) {
  const t = sc();
  return u3n(t.prefix);
}

async function EVe(e, t, n) {
  const r = sc();
  if (!l5t(r)) throw new Error("请先在「设置 → 画布功能 → 图床」中配置 Cloudinary（Cloud Name、API Key、API Secret）");
  if (!us()) throw new Error("Cloudinary 上传需在桌面端运行（Tauri 或 Electron 打包版）");
  const a = e.type || "application/octet-stream",
    i = await IVe(e),
    o = u3n(t),
    s = n || (a.startsWith("video/") ? "video" : "auto");
  try {
    const l = await Fr("cloudinary_upload", {
        args: {
          cloud_name: r.cloudinaryCloudName.trim(),
          api_key: r.cloudinaryApiKey.trim(),
          api_secret: r.cloudinaryApiSecret.trim(),
          folder: o || void 0,
          content_type: a,
          body_base64: i,
          resource_type: s
        }
      }),
      d = String(l || "").trim();
    if (!/^https?:\/\//i.test(d)) throw new Error("Cloudinary 上传未返回有效 HTTPS URL");
    return d;
  } catch (l) {
    HCr(l);
  }
}

function HCr(e) {
  const t = e instanceof Error ? e.message : String(e);
  throw new Error(F4e(t));
}

async function TVe(e, t) {
  const n = mo();
  if (n === "cloudinary") return EVe(e, h5t(t));
  if (n === "qiniu") {
    const r = sc(),
      a = wj(r, e, t);
    return SVe(e, a, t === "thumbnails" ? "public, max-age=31536000, immutable" : void 0);
  }
  return E3n(e, t);
}

function p5t(e) {
  const t = e ?? sc();
  if (mo(t) === "cloudinary") {
    const i = x3n(t);
    return i ? `${i}/` : "";
  }
  const r = String(t.materialPrefix ?? "").trim() || String(t.prefix ?? "").trim();
  if (!r) return "";
  const a = r.replace(/^\/+/, "");
  return a.endsWith("/") ? a : `${a}/`;
}

function wj(e, t, n) {
  const r = p5t(e),
    a = r ? `${r}${n}/` : `${n}/`;
  return w3n(a, t);
}

function k3n(e) {
  if (typeof e == "string") {
    const o = e.trim();
    return /^https?:\/\//i.test(o) ? {
      remoteUrl: o
    } : null;
  }
  if (!e || typeof e != "object") return null;
  const t = e,
    n = String(t.publicUrl || t.public_url || "").trim();
  if (!/^https?:\/\//i.test(n)) return null;
  const r = String(t.thumbnailUrl || t.thumbnail_url || "").trim(),
    a = Number(t.imageWidth ?? t.image_width),
    i = Number(t.imageHeight ?? t.image_height);
  return {
    remoteUrl: n,
    ...(/^https?:\/\//i.test(r) ? {
      displayUrl: r
    } : {}),
    ...(Number.isFinite(a) && a > 0 ? {
      imageWidth: a
    } : {}),
    ...(Number.isFinite(i) && i > 0 ? {
      imageHeight: i
    } : {})
  };
}

async function A3n(e, t, n, r) {
  const a = await I3n(e, t, n, r);
  return (a == null ? void 0 : a.remoteUrl) || null;
}

async function S3n(e, t, n) {
  return I3n(e, t, n, "images", {
    withThumbnail: !0
  });
}

async function I3n(e, t, n, r, a) {
  const i = sc();
  if (mo(i) !== "qiniu" || !kVe(i) || !us()) return null;
  const o = String(e || "").trim();
  if (!/^https?:\/\//i.test(o)) return null;
  const s = String(n || "").trim() || "application/octet-stream",
    l = new File([], t || `remote-result.${CVe(s)}`, {
      type: s
    }),
    d = wj(i, l, r),
    h = !!(a != null && a.withThumbnail) && r === "images" ? new File([], `${(t || "remote-result").replace(/\.[^.]+$/, "")}-list.jpg`, {
      type: "image/jpeg"
    }) : null,
    p = h ? wj(i, h, "thumbnails") : void 0,
    m = await Fr("qiniu_put_object_from_url", {
      args: {
        region: u5t(i),
        bucket: i.bucket.trim(),
        object_key: d,
        access_key_id: i.accessKeyId.trim(),
        access_key_secret: i.accessKeySecret.trim(),
        domain: s3(i.qiniuDomain),
        source_url: o,
        content_type: s,
        ...(p ? {
          thumbnail_object_key: p
        } : {})
      }
    }),
    f = k3n(m);
  if (!f) {
    const y = Cue(i, d);
    return /^https?:\/\//i.test(y) ? {
      remoteUrl: bb(y)
    } : null;
  }
  return {
    remoteUrl: bb(f.remoteUrl),
    ...(f.displayUrl ? {
      displayUrl: bb(f.displayUrl)
    } : {}),
    imageWidth: f.imageWidth,
    imageHeight: f.imageHeight
  };
}

async function m5t(e, t, n, r) {
  const a = sc(),
    i = mo(a);
  if (i === "qiniu") return A3n(e, t, n, r);
  if (i !== "aliyun-oss" || !c5t(a) || !us()) return null;
  const o = String(e || "").trim();
  if (!/^https?:\/\//i.test(o)) return null;
  const s = String(n || "").trim() || "application/octet-stream",
    l = new File([], t || `remote-result.${CVe(s)}`, {
      type: s
    }),
    d = wj(a, l, r),
    u = r === "thumbnails" ? "public, max-age=31536000, immutable" : void 0,
    h = await Fr("oss_put_object_from_url", {
      args: {
        endpoint: a.endpoint,
        bucket: a.bucket,
        object_key: d,
        access_key_id: a.accessKeyId.trim(),
        access_key_secret: a.accessKeySecret.trim(),
        source_url: o,
        content_type: s,
        ...(u ? {
          cache_control: u
        } : {})
      }
    }),
    p = String(h || "").trim();
  return /^https?:\/\//i.test(p) ? p : XJ(a, d);
}

async function C3n(e, t, n = "images") {
  const r = v3n(e);
  if (!r || !us()) return null;
  const a = sc(),
    i = mo(a),
    o = CVe(r.mimeType),
    s = (t || "inline-result").replace(/\.[^.]+$/, ""),
    l = new File([], `${s}.${o}`, {
      type: r.mimeType
    }),
    d = n === "thumbnails" ? "public, max-age=31536000, immutable" : void 0;
  if (i === "qiniu") {
    if (!kVe(a)) return null;
    const m = wj(a, l, n),
      f = await Fr("qiniu_put_object", {
        args: {
          region: u5t(a),
          bucket: a.bucket.trim(),
          object_key: m,
          access_key_id: a.accessKeyId.trim(),
          access_key_secret: a.accessKeySecret.trim(),
          domain: s3(a.qiniuDomain),
          content_type: r.mimeType,
          body_base64: r.bodyBase64,
          ...(d ? {
            cache_control: d
          } : {})
        }
      }),
      y = String(f || "").trim();
    return /^https?:\/\//i.test(y) ? bb(y) : Cue(a, m);
  }
  if (i === "cloudinary") {
    if (!l5t(a)) return null;
    const m = await Fr("cloudinary_upload", {
        args: {
          cloud_name: a.cloudinaryCloudName.trim(),
          api_key: a.cloudinaryApiKey.trim(),
          api_secret: a.cloudinaryApiSecret.trim(),
          folder: h5t(n) || void 0,
          content_type: r.mimeType,
          body_base64: r.bodyBase64,
          resource_type: r.mimeType.startsWith("video/") ? "video" : "image"
        }
      }),
      f = String(m || "").trim();
    return /^https?:\/\//i.test(f) ? f : null;
  }
  if (!c5t(a)) return null;
  const u = wj(a, l, n),
    h = await Fr("oss_put_object", {
      args: {
        endpoint: a.endpoint,
        bucket: a.bucket,
        object_key: u,
        access_key_id: a.accessKeyId.trim(),
        access_key_secret: a.accessKeySecret.trim(),
        content_type: r.mimeType,
        body_base64: r.bodyBase64,
        ...(d ? {
          cache_control: d
        } : {})
      }
    }),
    p = String(h || "").trim();
  return /^https?:\/\//i.test(p) ? p : XJ(a, u);
}

async function E3n(e, t) {
  var d, u, h, p;
  const n = sc();
  if (!((d = n.bucket) != null && d.trim()) || !((u = n.endpoint) != null && u.trim())) throw new Error("请先在「设置 → 画布功能 → 图床」中配置阿里云 OSS（Bucket、Endpoint）");
  if (!((h = n.accessKeyId) != null && h.trim()) || !((p = n.accessKeySecret) != null && p.trim())) throw new Error("请先在「设置 → 画布功能 → 图床」中填写 OSS AccessKey ID 与 AccessKey Secret");
  if (!us()) throw new Error("全局 OSS 上传需在桌面端运行（Tauri 或 Electron 打包版）");
  const r = wj(n, e, t),
    a = e.type || "application/octet-stream",
    i = await IVe(e),
    o = t === "thumbnails" ? "public, max-age=31536000, immutable" : void 0,
    s = await Fr("oss_put_object", {
      args: {
        endpoint: n.endpoint,
        bucket: n.bucket,
        object_key: r,
        access_key_id: n.accessKeyId.trim(),
        access_key_secret: n.accessKeySecret.trim(),
        content_type: a,
        body_base64: i,
        ...(o ? {
          cache_control: o
        } : {})
      }
    }),
    l = String(s || "").trim();
  return /^https?:\/\//i.test(l) ? l : XJ(n, r);
}

function RR(e) {
  const t = bb(String(e || "").trim());
  if (!/^https?:\/\//i.test(t)) return !1;
  try {
    const n = new URL(t);
    return n.hostname.includes("art.huya.info") && /\/files\/[^/]+\/content$/i.test(n.pathname) ? !1 : !!(/aliyuncs\.com$/i.test(n.hostname) || /\.aliyuncs\.com$/i.test(n.hostname) || /res\.cloudinary\.com$/i.test(n.hostname) || /\.res\.cloudinary\.com$/i.test(n.hostname) || vVe(n.hostname) || /art-oss-cdn\.huya\.cn$/i.test(n.hostname) || /\.art-oss-cdn\.huya\.cn$/i.test(n.hostname) || /art\.huya\.info$/i.test(n.hostname));
  } catch {
    return !1;
  }
}

async function fz(e) {
  var l, d, u, h;
  const t = mo();
  if (t === "cloudinary") return EVe(e, _3n());
  if (t === "qiniu") {
    const p = sc(),
      m = Kht(p, e);
    return SVe(e, m);
  }
  const n = sc();
  if (!((l = n.bucket) != null && l.trim()) || !((d = n.endpoint) != null && d.trim())) throw new Error("请先在「设置 → 画布功能 → 图床」中配置阿里云 OSS（Bucket、Endpoint）");
  if (!((u = n.accessKeyId) != null && u.trim()) || !((h = n.accessKeySecret) != null && h.trim())) throw new Error("请先在「设置 → 画布功能 → 图床」中填写 OSS AccessKey ID 与 AccessKey Secret");
  if (!us()) throw new Error("OSS 上传需在桌面端运行（Tauri 或 Electron 打包版）");
  const r = Kht(n, e),
    a = e.type || "application/octet-stream",
    i = await IVe(e),
    o = await Fr("oss_put_object", {
      args: {
        endpoint: n.endpoint,
        bucket: n.bucket,
        object_key: r,
        access_key_id: n.accessKeyId.trim(),
        access_key_secret: n.accessKeySecret.trim(),
        content_type: a,
        body_base64: i
      }
    }),
    s = String(o || "").trim();
  return /^https?:\/\//i.test(s) ? s : XJ(n, r);
}

async function f5t(e) {
  if (mo() === "cloudinary") return EVe(e, _3n(), "video");
  if (mo() === "qiniu") {
    const t = sc(),
      n = Kht(t, e);
    return SVe(e, n);
  }
  return fz(e);
}

async function WCr(e) {
  var n, r, a, i;
  if (mo() === "cloudinary") return EVe(e, h5t("images"));
  if (mo() === "qiniu") {
    const o = sc(),
      s = wj(o, e, "images");
    return SVe(e, s);
  }
  const t = sc();
  if (!((n = t.bucket) != null && n.trim()) || !((r = t.endpoint) != null && r.trim())) throw new Error("请先在「设置 → 画布功能 → 图床」中配置阿里云 OSS（Bucket、Endpoint）");
  if (!((a = t.accessKeyId) != null && a.trim()) || !((i = t.accessKeySecret) != null && i.trim())) throw new Error("请先在「设置 → 画布功能 → 图床」中填写 OSS AccessKey ID 与 AccessKey Secret");
  if (!us()) throw new Error("全局 OSS 上传需在桌面端运行（Tauri 或 Electron 打包版）");
  return E3n(e, "images");
}

async function jK(e) {
  return TVe(e, "images");
}

async function Eue(e) {
  return TVe(e, "thumbnails");
}

async function MVe(e) {
  return TVe(e, "videos");
}

async function T3n(e) {
  return TVe(e, "Music");
}

const qCr = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

function t9(e) {
  return e === "cloudinary" ? "Cloudinary" : e === "qiniu" ? "七牛云" : "阿里云 OSS";
}

function $g(e) {
  return e === "cloudinary" ? "Cloudinary" : e === "qiniu" ? "七牛云" : "OSS";
}

function Jk(e) {
  return `勾选后：引用图片/视频先上传至「设置 → 画布功能 → 图床」中的${t9(e)}，以公网 URL 调用模型；不勾选使用画布默认方式`;
}

async function M3n(e) {
  const t = e ?? sc(),
    n = mo(t),
    r = t9(n);
  if (!P2(t)) return {
    success: !1,
    message: `请先填写${r}凭证`
  };
  if (!us()) return {
    success: !1,
    message: "测试上传需在桌面端运行（Tauri 或 Electron 打包版）"
  };
  if (n === "qiniu") {
    const a = Mwe(t.qiniuDomain);
    if (a) return {
      success: !1,
      message: a
    };
  }
  try {
    const a = Uint8Array.from(atob(qCr), s => s.charCodeAt(0)),
      i = new File([a], `media-hosting-test-${Date.now()}.png`, {
        type: "image/png"
      });
    return {
      success: !0,
      url: await fz(i),
      message: `${r} 测试上传成功`
    };
  } catch (a) {
    const i = a instanceof Error ? a.message : String(a),
      o = n === "cloudinary" ? F4e(i) : i;
    return {
      success: !1,
      message: `${r} 测试上传失败：${o}`
    };
  }
}

const Ah = Object.freeze(Object.defineProperty({
    __proto__: null,
    ALIBABA_CLOUD_OSS_CACHE_DIR: UCr,
    ALIBABA_CLOUD_OSS_CONFIG_FILE: $Cr,
    HUYA_SEEDANCE_OSS_CONFIG_CHANGED_EVENT: go,
    HUYA_SEEDANCE_OSS_STORAGE_KEY: Sue,
    MEDIA_HOSTING_BUCKET_HIDDEN_KEY: J4t,
    MEDIA_HOSTING_DOMAIN_HIDDEN_EVENT: ODe,
    MEDIA_HOSTING_DOMAIN_HIDDEN_KEY: X4t,
    assertMediaHostingUploadReady: AVe,
    buildHuyaSeedanceOssPublicUrl: XJ,
    buildMaterialObjectKey: wj,
    buildQiniuPublicUrl: Cue,
    encodeOssObjectKeyPath: d5t,
    formatCloudinaryUploadErrorMessage: F4e,
    getDefaultAliyunOssProviderProfile: a3n,
    getDefaultCloudinaryProviderProfile: i3n,
    getDefaultHuyaSeedanceAliyunOssConfig: s3n,
    getDefaultMediaHostingStorage: mz,
    getDefaultQiniuProviderProfile: o3n,
    getKnownQiniuCdnDomainHosts: GCr,
    getMaterialRootPrefix: p5t,
    getMediaHostingNodeToggleLabel: $g,
    getMediaHostingNodeToggleTitle: Jk,
    getMediaHostingProvider: mo,
    getMediaHostingProviderDisplayName: t9,
    getQiniuDomainConfigWarning: Mwe,
    getQiniuPublicUrlScheme: t5t,
    hasMeaningfulMediaHostingStorage: qht,
    invalidateKnownQiniuCdnDomainHostsCache: n5t,
    invalidateOssConfigCacheExternal: g3n,
    isConfiguredQiniuCdnHost: c3n,
    isGlobalOssUploadEnabled: ua,
    isHuyaSeedanceAliyunOssConfigured: Ph,
    isHuyaSeedanceVolcAccessiblePublicUrl: RR,
    isMediaHostingBucketHidden: e5t,
    isMediaHostingConfigured: P2,
    isMediaHostingDomainHidden: Z4t,
    isMediaHostingPublicUrlHidden: Wht,
    isQiniuBuiltinCdnHost: vVe,
    isQiniuPublicHttpUrl: N$,
    isQiniuS3ApiDomain: B4e,
    loadHuyaSeedanceAliyunOssConfig: sc,
    loadMediaHostingStorage: Iue,
    mergeMediaHostingStorageLayers: o5t,
    normalizeMaterialFolderName: vj,
    normalizeMaterialPrefixSlash: tU,
    normalizeMediaHostingStorage: xVe,
    normalizeQiniuDomain: s3,
    normalizeQiniuRegion: vD,
    parseBase64DataUrlForUpload: v3n,
    parseQiniuPutFromUrlResult: k3n,
    repairQiniuPublicUrl: bb,
    saveHuyaSeedanceAliyunOssConfig: b3n,
    saveMediaHostingStorage: _Ve,
    setMediaHostingBucketHidden: Hht,
    setMediaHostingDomainHidden: n3n,
    switchMediaHostingProviderConfig: y3n,
    testMediaHostingUpload: M3n,
    transferRemoteImageUrlToGlobalMaterialQiniuWithThumb: S3n,
    transferRemoteUrlToGlobalMaterialHosting: m5t,
    transferRemoteUrlToGlobalMaterialQiniu: A3n,
    uploadBase64DataUrlToGlobalMaterialHosting: C3n,
    uploadFileToGlobalMaterialAliyunOss: WCr,
    uploadFileToGlobalMaterialImagesOss: jK,
    uploadFileToGlobalMaterialMusicOss: T3n,
    uploadFileToGlobalMaterialThumbnailsOss: Eue,
    uploadFileToGlobalMaterialVideosOss: MVe,
    uploadFileToHuyaSeedanceAliyunOss: fz,
    uploadGenApiVideoToMediaHosting: f5t
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  g5t = "qiaodoumayi_ui_language",
  PVe = [{
    id: "zh-CN",
    name: "中文",
    locale: "zh-CN"
  }, {
    id: "en",
    name: "English",
    locale: "en-US"
  }, {
    id: "ja",
    name: "日本語",
    locale: "ja-JP"
  }, {
    id: "ko",
    name: "한국어",
    locale: "ko-KR"
  }];

let BH = "zh-CN",
  BDe = {},
  eet,
  tet = 0,
  P3n = [];

const ene = new Map(),
  Qht = new Set(),
  KCr = e => (Qht.add(e), () => {
    Qht.delete(e);
  }),
  R3n = e => PVe.some(t => t.id === e),
  Yht = () => BH,
  on = () => g.useSyncExternalStore(KCr, Yht, Yht),
  ew = () => PVe.find(e => e.id === BH).locale;

function QCr() {
  try {
    const e = localStorage.getItem(g5t);
    return R3n(e) ? e : "zh-CN";
  } catch {
    return "zh-CN";
  }
}

async function Xht(e) {
  const t = ++tet;
  if (e !== "zh-CN") {
    eet ?? (eet = Ie(() => Promise.resolve().then(() => _va), void 0, import.meta.url).then(n => {
      BDe = n.default, P3n = Object.keys(BDe).filter(r => /\{\d+\}/.test(r) && /[\u3400-\u9fff]/.test(r)).sort((r, a) => a.replace(/\{\d+\}/g, "").length - r.replace(/\{\d+\}/g, "").length).map(r => {
        const a = [],
          i = r.split(/(\{\d+\})/).map(o => /^\{\d+\}$/.test(o) ? (a.push(Number(o.slice(1, -1))), "([\\s\\S]*?)") : o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        return {
          source: r,
          prefix: r.split(/\{\d+\}/)[0],
          pattern: new RegExp(`^${i.join("")}$`),
          indices: a
        };
      });
    }).catch(n => {
      throw eet = void 0, n;
    }));
    try {
      await eet;
    } catch (n) {
      if (t !== tet) return !1;
      throw n;
    }
  }
  return t !== tet ? !1 : (BH = e, ene.clear(), typeof document < "u" && (document.documentElement.lang = e), Qht.forEach(n => n()), !0);
}

async function YCr(e) {
  if (R3n(e) && (await Xht(e))) try {
    localStorage.setItem(g5t, e);
  } catch {}
}

async function N3n() {
  try {
    await Xht(QCr());
  } catch {
    await Xht("zh-CN");
  }
}

typeof window < "u" && window.addEventListener("storage", e => {
  (e.key === g5t || e.key === null) && N3n().catch(() => {});
});

function x(e, ...t) {
  var o, s, l;
  if (typeof e != "string") return e;
  const n = e.trim(),
    r = BH === "en" ? 0 : BH === "ja" ? 1 : 2;
  let a = BH === "zh-CN" || (o = BDe[n]) == null ? void 0 : o[r];
  if (!a && BH !== "zh-CN" && !t.length && /[\u3400-\u9fff]/.test(n) && (a = ene.get(n), a === void 0)) {
    for (const d of P3n) {
      if (!n.startsWith(d.prefix)) continue;
      const u = d.pattern.exec(n);
      if (!u) continue;
      const h = [];
      d.indices.forEach((p, m) => {
        h[p] = u[m + 1];
      }), a = (l = (s = BDe[d.source]) == null ? void 0 : s[r]) == null ? void 0 : l.replace(/\{(\d+)\}/g, (p, m) => h[Number(m)] ?? p);
      break;
    }
    ene.size >= 256 && ene.delete(ene.keys().next().value), ene.set(n, a || n);
  }
  const i = a ? e.replace(n, () => a) : e;
  return t.length ? i.replace(/\{(\d+)\}/g, (d, u) => Number(u) < t.length ? String(t[Number(u)]) : d) : i;
}

function z4e(e) {
  const t = e.toLowerCase();
  return t.endsWith(".jpg") || t.endsWith(".jpeg") ? "image/jpeg" : t.endsWith(".png") ? "image/png" : t.endsWith(".gif") ? "image/gif" : t.endsWith(".webp") ? "image/webp" : t.endsWith(".mp4") ? "video/mp4" : t.endsWith(".webm") ? "video/webm" : t.endsWith(".mov") ? "video/quicktime" : t.endsWith(".mp3") ? "audio/mpeg" : t.endsWith(".wav") ? "audio/wav" : t.endsWith(".m4a") ? "audio/mp4" : "application/octet-stream";
}

function j3n(e) {
  return e instanceof ArrayBuffer ? new Uint8Array(e) : e instanceof Uint8Array ? e : Array.isArray(e) ? Uint8Array.from(e) : null;
}

function nU(e, t) {
  return new Blob([e], t ? {
    type: t
  } : void 0);
}

async function D3n(e) {
  return (await fetch(e)).blob();
}

async function FDe(e) {
  try {
    const n = await Fr("read_file_bytes", {
        filePath: e
      }),
      r = j3n(n);
    if (r) return nU(r, z4e(e));
  } catch {}
  const t = await Fr("read_file_as_base64", {
    filePath: e
  });
  if (!t) throw new Error(`读取文件失败: ${e}`);
  return D3n(t);
}

async function L3n(e) {
  return Fr("read_file_as_base64", {
    filePath: e
  });
}

async function y5t(e) {
  try {
    const n = await Fr("fetch_remote_image_bytes", {
        url: e
      }),
      r = j3n(n);
    if (r) return nU(r);
  } catch {}
  const t = await Fr("fetch_remote_image_base64", {
    url: e
  });
  if (!t || !t.startsWith("data:")) throw new Error(`下载失败: ${e}`);
  return D3n(t);
}

async function b5t(e, t) {
  let n = null;
  try {
    const r = await t.arrayBuffer();
    await Fr("write_bytes_to_file", r, {
      headers: {
        "x-file-path": encodeURIComponent(e)
      }
    });
    return;
  } catch (r) {
    n = r;
  }
  try {
    const r = await new Promise((a, i) => {
      const o = new FileReader();
      o.onloadend = () => a(o.result), o.onerror = () => i(new Error("blob to data url failed")), o.readAsDataURL(t);
    });
    await Fr("write_base64_to_file", {
      params: {
        path: e,
        base64Data: r
      }
    });
  } catch (r) {
    const a = n ? `binary IPC failed (${String(n)}); base64 fallback also failed: ${String(r)}` : String(r);
    throw new Error(a);
  }
}

async function v5t(e, t) {
  try {
    const n = await t.arrayBuffer();
    await Fr("write_bytes_file_atomic", n, {
      headers: {
        "x-file-path": encodeURIComponent(e)
      }
    });
    return;
  } catch {}
  await b5t(e, t);
}

const hg = Object.freeze(Object.defineProperty({
  __proto__: null,
  bytesToBlob: nU,
  fetchRemoteImageAsBlob: y5t,
  inferMimeFromPath: z4e,
  readFileAsBlob: FDe,
  readFileAsDataUrl: L3n,
  writeBlobToFile: b5t,
  writeBlobToFileAtomic: v5t
}, Symbol.toStringTag, {
  value: "Module"
}));

function n9() {
  const e = sc(),
    t = mo(e),
    n = t9(t);
  if (!P2(e)) throw new Error(t === "cloudinary" ? "请先在「设置 → 画布功能 → 图床」中配置 Cloudinary（Cloud Name、API Key、API Secret）" : t === "qiniu" ? "请先在「设置 → 画布功能 → 图床」中配置七牛云（Bucket、区域、外链域名、Access Key）" : "请先在「设置 → 画布功能 → 图床」中配置阿里云 OSS（Bucket、Endpoint、AccessKey）");
  if (!us()) throw new Error(`${n} 云端备份需在桌面端运行（Tauri 或 Electron 打包版）`);
  return e;
}

function RVe(e) {
  if (typeof e == "string" && e.trim()) return e;
  if (e && typeof e == "object") {
    const t = e.message;
    if (t && String(t).trim()) return String(t);
  }
  return String(e ?? "").trim() || "云端操作失败";
}

function rU(e) {
  const t = RVe(e);
  return /404|NoSuchKey|not found|不存在|Resource not found/i.test(t);
}

function w5t(e) {
  let t = "";
  for (let r = 0; r < e.length; r += 8192) t += String.fromCharCode(...e.subarray(r, r + 8192));
  return btoa(t);
}

function P9e(e) {
  const t = atob(e),
    n = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r++) n[r] = t.charCodeAt(r);
  return n;
}

function x5t(e, t) {
  const n = String(e || "").toLowerCase(),
    r = String(t || "").toLowerCase();
  return n.includes("json") || /\.json$/i.test(r) ? "raw" : n.startsWith("image/") || /\.(jpe?g|png|webp|gif|bmp|svg)$/i.test(r) ? "image" : n.startsWith("video/") || n.startsWith("audio/") || /\.(mp4|mov|webm|mkv|mp3|wav|m4a)$/i.test(r) ? "video" : "raw";
}

function _5t(e, t) {
  let n = String(e || "").trim().replace(/^\/+/, "").replace(/\\/g, "/");
  return t === "raw" && /\.[^./]+$/.test(n) && (n = n.replace(/\.[^./]+$/, "")), n;
}

function XCr(e) {
  return e.split("/").filter(Boolean).map(t => encodeURIComponent(t)).join("/");
}

function JCr(e, t) {
  const n = _5t(e, t);
  if (t !== "raw") return n;
  const r = String(e || "").toLowerCase();
  return r.endsWith(".json") ? `${n}.json` : r.endsWith(".txt") ? `${n}.txt` : r.endsWith(".xml") ? `${n}.xml` : r.endsWith(".pdf") ? `${n}.pdf` : n;
}

function DK(e, t, n) {
  if (mo(e) === "cloudinary") {
    const r = x5t(n || "", t),
      a = JCr(t, r);
    return `https://res.cloudinary.com/${String(e.cloudinaryCloudName || "").trim()}/${r}/upload/${XCr(a)}`;
  }
  return mo(e) === "qiniu" ? Cue(e, t) : XJ(e, t);
}

async function ZCr(e, t, n, r) {
  const a = r.includes("json") || t.endsWith(".json");
  await Fr("qiniu_put_object", {
    args: {
      region: vD(e.endpoint),
      bucket: e.bucket.trim(),
      object_key: t,
      access_key_id: e.accessKeyId.trim(),
      access_key_secret: e.accessKeySecret.trim(),
      domain: s3(e.qiniuDomain),
      content_type: r,
      body_base64: w5t(n),
      ...(a ? {
        cache_control: "no-cache, no-store, must-revalidate"
      } : {})
    }
  });
}

async function eEr(e, t) {
  var s, l, d, u, h;
  const n = s3(e.qiniuDomain),
    r = t.trim().replace(/^\/+/, ""),
    a = (s = e.bucket) == null ? void 0 : s.trim(),
    i = vD(e.endpoint);
  if ((l = e.accessKeyId) != null && l.trim() && ((d = e.accessKeySecret) != null && d.trim()) && a) try {
    const p = await Fr("qiniu_get_object_bucket", {
      args: {
        region: i,
        bucket: a,
        object_key: r,
        access_key_id: e.accessKeyId.trim(),
        access_key_secret: e.accessKeySecret.trim()
      }
    });
    return P9e(String((p == null ? void 0 : p.body_base64) || ""));
  } catch (p) {
    if (rU(p)) throw p;
    console.warn("[mediaHostingBackupStorage] qiniu bucket get failed, fallback CDN:", p);
  }
  if ((u = e.accessKeyId) != null && u.trim() && ((h = e.accessKeySecret) != null && h.trim()) && n) try {
    const p = await Fr("qiniu_get_object_auth", {
      args: {
        domain: n,
        object_key: r,
        access_key_id: e.accessKeyId.trim(),
        access_key_secret: e.accessKeySecret.trim()
      }
    });
    return P9e(String((p == null ? void 0 : p.body_base64) || ""));
  } catch (p) {
    if (rU(p)) throw p;
    console.warn("[mediaHostingBackupStorage] qiniu auth get failed, fallback CDN:", p);
  }
  const o = await Fr("qiniu_get_object", {
    args: {
      domain: n,
      object_key: r
    }
  });
  return P9e(String((o == null ? void 0 : o.body_base64) || ""));
}

async function tEr(e, t) {
  await Fr("qiniu_delete_object", {
    args: {
      region: vD(e.endpoint),
      bucket: e.bucket.trim(),
      object_key: t,
      access_key_id: e.accessKeyId.trim(),
      access_key_secret: e.accessKeySecret.trim()
    }
  });
}

async function nEr(e, t, n) {
  const r = await Fr("qiniu_list_objects", {
    args: {
      region: vD(e.endpoint),
      bucket: e.bucket.trim(),
      prefix: t,
      access_key_id: e.accessKeyId.trim(),
      access_key_secret: e.accessKeySecret.trim(),
      max_keys: 1e3,
      delimiter: (n == null ? void 0 : n.delimiter) || ""
    }
  });
  return {
    keys: (r == null ? void 0 : r.keys) ?? [],
    prefixes: (r == null ? void 0 : r.prefixes) ?? []
  };
}

async function rEr(e, t, n, r) {
  await Fr("oss_put_object", {
    args: {
      endpoint: e.endpoint,
      bucket: e.bucket,
      object_key: t,
      access_key_id: e.accessKeyId.trim(),
      access_key_secret: e.accessKeySecret.trim(),
      content_type: r,
      body_base64: w5t(n)
    }
  });
}

async function aEr(e, t) {
  const n = await Fr("oss_get_object", {
    args: {
      endpoint: e.endpoint,
      bucket: e.bucket,
      object_key: t,
      access_key_id: e.accessKeyId.trim(),
      access_key_secret: e.accessKeySecret.trim()
    }
  });
  return P9e(String((n == null ? void 0 : n.body_base64) || ""));
}

async function iEr(e, t) {
  await Fr("oss_delete_object", {
    args: {
      endpoint: e.endpoint,
      bucket: e.bucket,
      object_key: t,
      access_key_id: e.accessKeyId.trim(),
      access_key_secret: e.accessKeySecret.trim()
    }
  });
}

async function oEr(e, t, n) {
  const r = await Fr("oss_list_objects", {
    args: {
      endpoint: e.endpoint,
      bucket: e.bucket,
      prefix: t,
      access_key_id: e.accessKeyId.trim(),
      access_key_secret: e.accessKeySecret.trim(),
      max_keys: 1e3,
      delimiter: (n == null ? void 0 : n.delimiter) || ""
    }
  });
  return {
    keys: (r == null ? void 0 : r.keys) ?? [],
    prefixes: (r == null ? void 0 : r.prefixes) ?? []
  };
}

async function sEr(e, t, n, r) {
  const a = x5t(r, t),
    i = _5t(t, a);
  try {
    await Fr("cloudinary_upload", {
      args: {
        cloud_name: e.cloudinaryCloudName.trim(),
        api_key: e.cloudinaryApiKey.trim(),
        api_secret: e.cloudinaryApiSecret.trim(),
        content_type: r,
        body_base64: w5t(n),
        resource_type: a,
        public_id: i,
        overwrite: !0
      }
    });
  } catch (o) {
    throw new Error(F4e(RVe(o)));
  }
}

async function lEr(e, t) {
  const n = t.endsWith(".json") ? "application/json" : "application/octet-stream",
    r = DK(e, t, n);
  try {
    const i = await (await y5t(r)).arrayBuffer();
    return new Uint8Array(i);
  } catch (a) {
    throw new Error(F4e(RVe(a)));
  }
}

async function O3n(e, t, n) {
  return Fr("cloudinary_admin_request", {
    args: {
      cloud_name: e.cloudinaryCloudName.trim(),
      api_key: e.cloudinaryApiKey.trim(),
      api_secret: e.cloudinaryApiSecret.trim(),
      method: t,
      resource_path: n
    }
  });
}

async function cEr(e, t) {
  const n = t.endsWith(".json") ? "application/json" : "application/octet-stream",
    r = x5t(n, t),
    a = _5t(t, r),
    i = `resources/${r}/upload?public_id=${encodeURIComponent(a)}`;
  await O3n(e, "DELETE", i);
}

async function dEr(e, t) {
  const n = String(t || "").replace(/^\/+/, "").replace(/\\/g, "/"),
    r = new Set(),
    a = new Set();
  for (const i of ["raw", "image", "video"]) {
    const o = `resources/${i}?type=upload&prefix=${encodeURIComponent(n)}&max_results=500`,
      s = await O3n(e, "GET", o);
    let l;
    try {
      l = JSON.parse(s);
    } catch {
      continue;
    }
    for (const d of l.resources || []) {
      const u = String(d.public_id || "").trim();
      if (!u || !u.startsWith(n.replace(/\/$/, ""))) continue;
      let h = u;
      i === "raw" && d.format && !h.endsWith(`.${d.format}`) && (h = `${u}.${d.format}`), r.add(h);
      const p = h.split("/");
      if (p.length > 1) for (let m = 1; m < p.length; m++) a.add(`${p.slice(0, m).join("/")}/`);
    }
  }
  return {
    keys: [...r],
    prefixes: [...a]
  };
}

function NVe(e) {
  return e ?? n9();
}

async function Pv(e, t, n, r) {
  const a = NVe(r);
  if (mo(a) === "cloudinary") {
    await sEr(a, e, t, n);
    return;
  }
  if (mo(a) === "qiniu") {
    await ZCr(a, e, t, n);
    return;
  }
  await rEr(a, e, t, n);
}

async function Hp(e, t) {
  const n = NVe(t);
  return mo(n) === "cloudinary" ? lEr(n, e) : mo(n) === "qiniu" ? eEr(n, e) : aEr(n, e);
}

async function aU(e, t) {
  const n = NVe(t);
  if (mo(n) === "cloudinary") {
    await cEr(n, e);
    return;
  }
  if (mo(n) === "qiniu") {
    await tEr(n, e);
    return;
  }
  await iEr(n, e);
}

async function JJ(e, t, n) {
  const r = NVe(t);
  return mo(r) === "cloudinary" ? dEr(r, e) : mo(r) === "qiniu" ? nEr(r, e, n) : oEr(r, e, n);
}

function H2() {
  try {
    return n9(), !0;
  } catch {
    return !1;
  }
}

function uEr(e) {
  const t = x(t9(mo()));
  return e.trim() ? x("启用 {0} 云端备份（{1}）", x(e.trim()), t) : x("启用云端备份（{0}）", t);
}

function hEr() {
  const e = mo(),
    t = x(t9(e));
  return x(e === "cloudinary" ? "仅限桌面端。请先在「设置 → 画布功能 → 图床」中配置 Cloudinary（Cloud Name、API Key、API Secret）。当前上传通道：{0}" : e === "qiniu" ? "仅限桌面端。请先在「设置 → 画布功能 → 图床」中配置七牛云（Bucket、区域、外链域名、Access Key）。当前上传通道：{0}" : "仅限桌面端。请先在「设置 → 画布功能 → 图床」中配置阿里云 OSS（Bucket、Endpoint、AccessKey）。当前上传通道：{0}", t);
}

const pEr = 720 * 60 * 1e3;

function Jht(e) {
  if (typeof e == "number") return Number.isFinite(e) && e > 0 ? e : 0;
  if (typeof e == "string" && e.trim()) {
    const t = Number(e);
    if (Number.isFinite(t) && t > 0) return t;
    const n = Date.parse(e);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }
  return 0;
}

function mEr(...e) {
  const t = e.map(Jht).filter(a => a > 0);
  if (t.length === 0) return 0;
  if (t.length === 1) return t[0];
  const n = Math.min(...t),
    r = Math.max(...t);
  return r - n > pEr ? n : r;
}

function fEr(e) {
  const t = String(e || "").trim();
  if (!t) return 0;
  if (/[T/\-]/.test(t) || /^\d{4}/.test(t)) {
    const a = Date.parse(t);
    if (Number.isFinite(a) && a > 0) return a;
  }
  if (t.match(/^(上午|下午|AM|PM)?\s*(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(上午|下午|AM|PM)?$/i)) return 0;
  const r = Date.parse(t);
  return Number.isFinite(r) && r > 0 ? r : 0;
}

function gEr(e, t, n) {
  const r = String(e || "").trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!r) return !1;
  const a = new Date(n),
    i = new Date(a.getFullYear(), a.getMonth(), a.getDate(), Number(r[1]), Number(r[2]), Number(r[3] || 0), 0).getTime();
  return t === i;
}

function ZJ(e, t = Date.now()) {
  const n = e,
    r = Jht(e.startTime);
  let a = Jht(n.timestamp);
  a > 0 && r <= 0 && gEr(String(e.time || ""), a, t) && (a = 0);
  const i = mEr(a, r);
  return i > 0 ? i : fEr(String(e.time || ""));
}

function Iv(e, t = Date.now()) {
  return e.map((n, r) => ({
    item: n,
    index: r,
    time: ZJ(n, t)
  })).sort((n, r) => {
    const a = n.time > 0,
      i = r.time > 0;
    return a && i ? r.time - n.time : a !== i ? a ? -1 : 1 : n.index - r.index;
  }).map(({
    item: n
  }) => n);
}

function yEr(e, t = Date.now()) {
  return e.map((n, r) => ({
    item: n,
    index: r,
    time: ZJ(n, t)
  })).sort((n, r) => {
    const a = n.time > 0,
      i = r.time > 0;
    return a && i ? n.time - r.time : a !== i ? a ? -1 : 1 : n.index - r.index;
  }).map(({
    item: n
  }) => n);
}

function bEr(e, t = Date.now()) {
  const n = ZJ(e);
  if (n > 0) {
    const a = new Date(n),
      i = new Date(t),
      o = u => String(u).padStart(2, "0"),
      s = `${o(a.getHours())}:${o(a.getMinutes())}:${o(a.getSeconds())}`;
    return a.getFullYear() === i.getFullYear() && a.getMonth() === i.getMonth() && a.getDate() === i.getDate() ? s : a.getFullYear() === i.getFullYear() ? `${o(a.getMonth() + 1)}-${o(a.getDate())} ${s}` : `${a.getFullYear()}-${o(a.getMonth() + 1)}-${o(a.getDate())} ${s}`;
  }
  const r = String(e.time || "").trim();
  return r.includes("T") && (r.split("T")[1] || "").split(".")[0] || r;
}

function ky(e = Date.now()) {
  return {
    time: new Date(e).toLocaleTimeString(),
    startTime: e,
    timestamp: e
  };
}

function vEr(e) {
  const t = e;
  return e.type === "audio" ? t._audioAssetId || e._assetId : t._audioAssetId;
}

function wEr(e) {
  if (!(e != null && e.trim())) return null;
  const t = Array.from(e.trim());
  return t.length <= 5 ? t.join("") : `${t.slice(0, 5).join("")}...`;
}

const fbe = "Music",
  B3n = "Music";

function jVe(e) {
  return String(e || "").startsWith("speech_");
}

function U4e(e) {
  if (e.type !== "audio") return !1;
  const t = String(e._audioAssetId || e._assetId || "");
  if (jVe(t)) return !0;
  const n = String(e.modelName || "").toLowerCase();
  return n.includes("speech") || n.includes("seed-audio") || n.includes("seed audio") || n.includes("qwen-audio") || n.includes("qwen audio") || n.includes("gemini-3.1-flash-tts") || n.includes("gemini-3.8-flash") || n.includes("gemini tts");
}

function xEr(e) {
  return jVe(e) && e.slice(7) || null;
}

const F3n = Object.freeze(Object.defineProperty({
    __proto__: null,
    SPEECH_AUDIO_CACHE_SUBDIR: fbe,
    SPEECH_AUDIO_OSS_ROOT: B3n,
    isSpeechAudioAssetId: jVe,
    isSpeechHistoryAudioItem: U4e,
    speechHistoryTaskIdFromAssetId: xEr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  k5t = "qiaodoumayi_history_oss_backup",
  Zne = "qiaodoumayi-history-oss-backup-changed",
  iU = "qiaodoumayi-history-restored",
  xj = "Generation History";

function tHt() {
  return {
    enabled: !1,
    folderName: xj
  };
}

function zk() {
  try {
    const e = localStorage.getItem(k5t);
    if (!e) return tHt();
    const t = JSON.parse(e);
    return {
      enabled: !!t.enabled,
      folderName: String(t.folderName ?? xj).trim() || xj
    };
  } catch {
    return tHt();
  }
}

function z3n(e) {
  const t = {
    enabled: !!e.enabled,
    folderName: String(e.folderName ?? xj).trim() || xj
  };
  localStorage.setItem(k5t, JSON.stringify(t)), window.dispatchEvent(new CustomEvent(Zne));
}

function A5t(e) {
  if (typeof e == "string" && e.trim()) return e;
  if (e && typeof e == "object") {
    const t = e.message;
    if (t && String(t).trim()) return String(t);
  }
  return String(e ?? "").trim() || "操作云端失败";
}

function j$() {
  return n9();
}

function xE(e, t, n) {
  if (jVe(t)) return `${B3n}/${t}`.replace(/\/+/g, "/");
  const r = (e || xj).trim().replace(/^\/+/, "").replace(/\/+$/, "");
  let a = "images";
  return t.startsWith("preview_") || t.startsWith("thumb_") || t.includes("_thumbnail") ? a = "thumbnails" : n === "video" ? a = "videos" : n === "audio" && (a = "audio"), `${r}/${a}/${t}`.replace(/\/+/g, "/");
}

function Ad(e, t) {
  const n = String(e || "").trim();
  if (!n) return !1;
  const r = (zk().folderName || xj).trim().replace(/^\/+/, "").replace(/\/+$/, "");
  if (!r) return !1;
  let a = n;
  try {
    a = decodeURIComponent(new URL(n).pathname);
  } catch {
    try {
      a = decodeURIComponent(n);
    } catch {}
  }
  const i = `/${r}/`,
    o = a.startsWith("/") ? a : `/${a}`;
  return o.includes(i) || o.startsWith(`${r}/`) || o === `/${r}` || o.endsWith(`/${r}`);
}

function $4e(e) {
  return `${(e || xj).trim().replace(/^\/+/, "").replace(/\/+$/, "")}/history_manifest.json`.replace(/\/+/g, "/");
}

function DVe(e) {
  if (e._globalOssUrlOnly) return !0;
  if (!e.ossUploaded) return !1;
  for (const t of [e._ossRemoteUrl, e.originalUrl, e.url, e._ossThumbnailUrl, e.thumbnailUrl]) if (t && nr(t)) return !0;
  return !1;
}

function Zht(e, t, n) {
  return DK(e, t, n);
}

function U3n(e) {
  if (e.type === "video" && e.url && (e.url.includes("prod-ss-vidu") || e.url.includes("prod-sa-vidu") || e.url.includes("amazonaws") && e.url.includes("vidu"))) {
    const n = (e.url.split("/").pop() || e.url).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 36);
    return `${e.id}_vidu_${n || Date.now()}`;
  }
  return e._assetId || e.id;
}

function LVe(e, t) {
  var l, d;
  if (e._globalOssUrlOnly) return {
    remoteUrl: null,
    thumbnailUrl: null
  };
  if (!e.ossUploaded) return {
    remoteUrl: null,
    thumbnailUrl: null
  };
  let n;
  try {
    n = sc();
  } catch {
    return {
      remoteUrl: null,
      thumbnailUrl: null
    };
  }
  if (!((l = n.bucket) != null && l.trim()) || !((d = n.endpoint) != null && d.trim())) return {
    remoteUrl: null,
    thumbnailUrl: null
  };
  const r = (t || zk().folderName).trim(),
    a = U3n(e),
    i = xE(r, a, e.type),
    o = Zht(n, i);
  if (U4e(e)) return {
    remoteUrl: o,
    thumbnailUrl: null
  };
  let s = null;
  return e.type === "video" && (s = Zht(n, xE(r, `preview_${a}`, e.type))), {
    remoteUrl: o,
    thumbnailUrl: s
  };
}

function G4e(e, t) {
  if (e._globalOssUrlOnly) return {};
  const n = LVe(e, t),
    r = {};
  return n.remoteUrl && (nr(e._ossRemoteUrl) || (r._ossRemoteUrl = n.remoteUrl), nr(e.originalUrl) || (r.originalUrl = n.remoteUrl)), e.type === "video" && n.thumbnailUrl && (nr(e._ossThumbnailUrl) || (r._ossThumbnailUrl = n.thumbnailUrl), nr(e.thumbnailUrl) || (r.thumbnailUrl = n.thumbnailUrl)), r;
}

function $3n(e) {
  return Iv(e);
}

async function G3n(e) {
  const t = j$(),
    n = zk(),
    r = $4e(n.folderName),
    {
      filterDeletedHistoryItems: a,
      mergeHistoryItemSnapshots: i
    } = await Ie(async () => {
      const {
        filterDeletedHistoryItems: u,
        mergeHistoryItemSnapshots: h
      } = await Promise.resolve().then(() => Gu);
      return {
        filterDeletedHistoryItems: u,
        mergeHistoryItemSnapshots: h
      };
    }, void 0, import.meta.url);
  let o = [];
  try {
    const u = await Hp(r, t);
    o = JSON.parse(new TextDecoder().decode(u)), Array.isArray(o) || (o = []);
  } catch {
    o = [];
  }
  const s = new Map();
  for (const u of o) s.set(String(u.id), u);
  for (const u of e) {
    const h = String(u.id),
      p = s.get(h);
    s.set(h, p ? i(u, p) : u);
  }
  const l = a($3n([...s.values()])),
    d = new TextEncoder().encode(JSON.stringify(l, null, 2));
  await Pv(r, d, "application/json", t);
}

async function _Er(e) {
  const t = zk();
  if (!t.enabled) return;
  const n = new Set([...e].map(String).filter(Boolean));
  if (n.size !== 0) try {
    const r = j$(),
      a = $4e(t.folderName);
    let i = [];
    try {
      const l = await Hp(a, r);
      i = JSON.parse(new TextDecoder().decode(l)), Array.isArray(i) || (i = []);
    } catch {
      return;
    }
    const o = i.filter(l => !n.has(String(l.id)));
    if (o.length === i.length) return;
    const s = new TextEncoder().encode(JSON.stringify(o, null, 2));
    await Pv(a, s, "application/json", r);
  } catch (r) {
    console.warn("[historyOssBackup] removeHistoryItemsFromOssManifest failed:", r);
  }
}

function V3n(e, t) {
  try {
    const n = ya(e) || e,
      a = new URL(n).pathname.replace(/^\//, "");
    return a ? decodeURIComponent(a) : null;
  } catch {
    return null;
  }
}

async function H3n(e) {
  var i, o, s, l;
  const t = sc();
  if (!((i = t.bucket) != null && i.trim()) || !((o = t.endpoint) != null && o.trim()) || !((s = t.accessKeyId) != null && s.trim()) || !((l = t.accessKeySecret) != null && l.trim())) return;
  const {
      collectHistoryItemUrls: n
    } = await Ie(async () => {
      const {
        collectHistoryItemUrls: d
      } = await Promise.resolve().then(() => Gu);
      return {
        collectHistoryItemUrls: d
      };
    }, void 0, import.meta.url),
    r = n(e).filter(d => nr(d)),
    a = new Set();
  for (const d of r) {
    const u = V3n(d);
    u && a.add(u);
  }
  for (const d of a) try {
    await aU(d, t);
  } catch (u) {
    console.warn("[historyOssBackup] deleteGlobalOssUrlsForHistoryItem failed:", d, u);
  }
}

function _j(e) {
  const t = A5t(e);
  return /404|NoSuchKey|not found|不存在/i.test(t);
}

const ept = new Set(),
  tpt = new Set(),
  nHt = new Set(),
  kEr = 300 * 1e3,
  AEr = 2e3,
  npt = new Map(),
  rpt = new Map();

function W3n(e) {
  return typeof e == "number" && Date.now() - e < kEr;
}

function q3n(e, t, n) {
  for (e.set(t, Date.now()), n.add(t); e.size > AEr;) {
    const r = e.keys().next().value;
    if (r === void 0) break;
    e.delete(r), n.delete(r);
  }
}

function OVe(e) {
  return ept.has(e) ? W3n(rpt.get(e)) ? !0 : (ept.delete(e), rpt.delete(e), !1) : !1;
}

function K3n(e) {
  e && q3n(rpt, e, ept);
}

function BVe(e) {
  const t = ya(String(e || "").trim()) || String(e || "").trim();
  return !t || !nr(t) ? null : t;
}

function Q3n(e) {
  try {
    const t = BVe(e);
    if (!t) return null;
    const n = new URL(t);
    if (!/aliyuncs\.com/i.test(n.hostname)) return null;
    const r = n.pathname.replace(/^\//, "");
    return r ? decodeURIComponent(r) : null;
  } catch {
    return null;
  }
}

function S5t(e) {
  var t;
  try {
    const n = sc();
    if ((t = n.bucket) != null && t.trim()) {
      const r = V3n(e, n);
      if (r) return r;
    }
  } catch {}
  return Q3n(e);
}

function Nb(e) {
  const t = BVe(e);
  if (t && tpt.has(t)) {
    if (W3n(npt.get(t))) return !0;
    tpt.delete(t), npt.delete(t);
  }
  const n = S5t(e);
  return !!n && OVe(n);
}

function cY(e) {
  const t = BVe(e);
  t && q3n(npt, t, tpt);
  const n = S5t(e);
  n && K3n(n);
}

async function SEr(e) {
  if (!nHt.has(e)) {
    nHt.add(e);
    try {
      let t = null;
      const n = localStorage.getItem("qiaodoumayi_history");
      n && (t = JSON.parse(n));
      const {
        localCacheManager: r
      } = await Ie(async () => {
        const {
          localCacheManager: l
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: l
        };
      }, void 0, import.meta.url);
      t || (t = (await r.loadHistory()) || []);
      const a = t.findIndex(l => String(l.id) === String(e)),
        i = t[a];
      if (a < 0 || !(i != null && i.ossUploaded)) return;
      const o = [...t];
      o[a] = {
        ...o[a],
        ossUploaded: !1
      };
      const {
        persistHistoryToStorage: s
      } = await Ie(async () => {
        const {
          persistHistoryToStorage: l
        } = await Promise.resolve().then(() => Gu);
        return {
          persistHistoryToStorage: l
        };
      }, void 0, import.meta.url);
      await s(o), window.dispatchEvent(new CustomEvent(iU, {
        detail: {
          taskId: e,
          ossUploaded: !1
        }
      }));
    } catch {}
  }
}

async function R9e(e, t, n) {
  if (OVe(e)) return null;
  try {
    const r = j$(),
      a = await Hp(e, r);
    if (!a.length) return null;
    const i = nU(a, t || "application/octet-stream");
    return URL.createObjectURL(i);
  } catch (r) {
    return _j(r) ? K3n(e) : n != null && n.silentNotFound || console.warn("[historyOssBackup] OSS 冷读转 blob 失败:", e, r), null;
  }
}

function FH(e) {
  return !!e && /^https?:\/\//i.test(e) && /aliyuncs\.com/i.test(e);
}

async function FVe(e, t) {
  const n = [],
    r = {
      blobUrls: n
    };
  if (!e.ossUploaded || !us()) return r;
  const a = t == null ? void 0 : t.localMainUrl,
    i = t == null ? void 0 : t.localPosterUrl,
    o = (t == null ? void 0 : t.posterOnly) === !0,
    s = o ? !1 : !a || FH(a);
  if (!s && i && !FH(i)) return r;
  const l = u => (n.push(u), u),
    d = {
      blobUrls: n
    };
  try {
    const {
        localCacheManager: u
      } = await Ie(async () => {
        const {
          localCacheManager: k
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: k
        };
      }, void 0, import.meta.url),
      {
        getViduVideoAssetId: h
      } = await Ie(async () => {
        const {
          getViduVideoAssetId: k
        } = await Promise.resolve().then(() => bjt);
        return {
          getViduVideoAssetId: k
        };
      }, void 0, import.meta.url);
    await u.ensureRestored();
    const m = e.type === "video" && e.url && (e.url.includes("prod-ss-vidu") || e.url.includes("prod-sa-vidu") || e.url.includes("amazonaws") && e.url.includes("vidu")) ? h(e.id, e.url) : e._assetId || e.id,
      f = zk(),
      y = [e._assetId, m, e.id].filter(Boolean).some(k => u.hasAsset(String(k))),
      b = u.hasThumbnail(m, "preview"),
      _ = !U4e(e) && (!i || FH(i));
    if (!s && !_) return r;
    const w = async () => {
      if (e.type !== "video") return;
      if (b) {
        const S = await u.readThumbnail(m, "preview");
        if (S) return S;
      }
      const k = `preview_${m}`,
        A = ["image/webp", "image/jpeg", "image/png"];
      for (const S of A) {
        const C = xE(f.folderName, k, e.type),
          I = await R9e(C, S, {
            silentNotFound: !0
          });
        if (I) return l(I);
      }
    };
    if (_ && e.type === "video") {
      const k = await w();
      k && (d.posterUrl = k);
    }
    if (d.posterUrl && (o || !s)) return d;
    if (s) if (y) {
      const {
        assetStore: k
      } = await Ie(async () => {
        const {
          assetStore: A
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: A
        };
      }, void 0, import.meta.url);
      for (const A of [e._assetId, m, e.id].filter(Boolean)) {
        let S = await u.readAssetAsUrl(A);
        if (S || (S = await k.getAssetUrl(A)), S && !FH(S)) {
          d.mainUrl = S;
          break;
        }
      }
    } else {
      const k = xE(f.folderName, m, e.type),
        A = e.type === "video" ? "video/mp4" : e.type === "audio" ? "audio/mpeg" : "image/png",
        S = await R9e(k, A, {
          silentNotFound: !0
        });
      if (S) {
        if (d.mainUrl = l(S), e.type === "video" && !d.posterUrl && !b) try {
          const {
              captureVideoPosterDataUrl: C
            } = await Ie(async () => {
              const {
                captureVideoPosterDataUrl: E
              } = await Promise.resolve().then(() => pg);
              return {
                captureVideoPosterDataUrl: E
              };
            }, void 0, import.meta.url),
            I = await C(S);
          I && (d.posterUrl = I);
        } catch {}
      } else OVe(k) && SEr(e.id);
    }
    if (_ && !d.posterUrl && b) {
      const k = await u.readThumbnail(m, "preview");
      k && (d.posterUrl = k);
    } else if (_ && !d.posterUrl && e.type !== "video") {
      const k = xE(f.folderName, `preview_${m}`, e.type),
        A = await R9e(k, "image/jpeg", {
          silentNotFound: !0
        });
      A && (d.posterUrl = l(A));
    } else if (_ && !d.posterUrl && e.type === "video") {
      const k = await w();
      k && (d.posterUrl = k);
    }
  } catch (u) {
    _j(u) || console.warn("[historyOssBackup] OSS 冷读失败:", e.id, u);
  }
  return d;
}

async function Y3n(e, t) {
  if (t != null && t.hasResolvedFromStore) return !0;
  try {
    const {
      localCacheManager: n
    } = await Ie(async () => {
      const {
        localCacheManager: a
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: a
      };
    }, void 0, import.meta.url);
    return n.isAvailable() ? [e._assetId, e.id, ...((t == null ? void 0 : t.mjAssetIds) || []), t == null ? void 0 : t.audioAssetId].filter(Boolean).some(a => n.hasAsset(a)) : !1;
  } catch {
    return !!(t != null && t.hasResolvedFromStore);
  }
}

const zC = new Set();

let net = !1,
  UC = null;

function X3n(e) {
  return UC = e, e(zC.size, Array.from(zC)[0]), () => {
    UC === e && (UC = null);
  };
}

async function J3n(e) {
  const {
    localCacheManager: t
  } = await Ie(async () => {
    const {
      localCacheManager: a
    } = await Promise.resolve().then(() => Ha);
    return {
      localCacheManager: a
    };
  }, void 0, import.meta.url);
  if (await t.ensureRestored(), t.hasAsset(e)) {
    const a = await t.readAsset(e);
    if (a != null && a.blob) return a;
  }
  const {
      assetStore: n
    } = await Ie(async () => {
      const {
        assetStore: a
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: a
      };
    }, void 0, import.meta.url),
    r = await n.getAssetRecord(e);
  return r != null && r.blob ? {
    blob: r.blob,
    mimeType: r.mimeType || "application/octet-stream"
  } : null;
}

async function IEr(e) {
  const {
    localCacheManager: t
  } = await Ie(async () => {
    const {
      localCacheManager: a
    } = await Promise.resolve().then(() => Ha);
    return {
      localCacheManager: a
    };
  }, void 0, import.meta.url);
  if (await t.ensureRestored(), t.hasAsset(e)) return !0;
  const {
      assetStore: n
    } = await Ie(async () => {
      const {
        assetStore: a
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: a
      };
    }, void 0, import.meta.url),
    r = await n.getAssetRecord(e);
  return !!(r != null && r.blob && r.blob.size > 0);
}

function CEr(e, t) {
  return t ? "image/jpeg" : e === "video" ? "video/mp4" : e === "audio" ? "audio/mpeg" : "image/png";
}

function EEr(e, t) {
  if (!zk().enabled || !ua()) return;
  const r = [...new Set([...(t || []).filter(Boolean), e])];
  (async () => {
    const o = Date.now();
    for (; Date.now() - o < 9e5;) {
      if ((await Promise.all(r.map(l => IEr(l)))).some(Boolean)) {
        console.log("[historyOssBackup] 资源已就绪，开始云端备份:", e, r), apt(e);
        return;
      }
      await new Promise(l => setTimeout(l, 2500));
    }
    console.warn("[historyOssBackup] 等待本地视频缓存超时，仍尝试云端备份:", e), apt(e);
  })();
}

function apt(e) {
  !zk().enabled || !ua() || (zC.add(e), console.log("[historyOssBackup] 后台自动上传队列新增任务:", e, "目前排队中数量:", zC.size), UC && UC(zC.size, e), TEr());
}

async function TEr() {
  if (!net) {
    net = !0;
    try {
      const e = j$(),
        t = zk(),
        {
          localCacheManager: n
        } = await Ie(async () => {
          const {
            localCacheManager: r
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: r
          };
        }, void 0, import.meta.url);
      for (await n.ensureRestored(); zC.size > 0;) {
        const r = Array.from(zC)[0];
        if (!r) break;
        console.log("[historyOssBackup] 队列开始自动上传任务:", r), UC && UC(zC.size, r);
        try {
          let a = null;
          try {
            const i = localStorage.getItem("qiaodoumayi_history");
            i && (a = JSON.parse(i), console.log("[historyOssBackup] 成功从 localStorage 读取历史元数据, 总数:", a.length));
          } catch (i) {
            console.warn("[historyOssBackup] 尝试从 localStorage 加载失败, 降级至 loadHistory:", i);
          }
          if (a || (console.log("[historyOssBackup] 正在从本地 history.json 加载历史元数据..."), a = await n.loadHistory(), console.log("[historyOssBackup] 成功从本地 history.json 加载历史元数据, 总数:", a == null ? void 0 : a.length)), a) {
            const i = a.find(o => String(o.id) === String(r));
            if (i) {
              console.log("[historyOssBackup] 找到匹配历史记录项:", i.id, "模型:", i.modelName, "类型:", i.type);
              let o = !1;
              try {
                await t4n(e, t.folderName, i), o = !0;
              } catch (s) {
                console.warn("[historyOssBackup] 队列自动上传未写入任何资产（可能视频仍在下载）:", r, s);
              }
              if (o) {
                console.log("[historyOssBackup] 队列自动上传成功:", r), i.ossUploaded = !0, Object.assign(i, G4e(i, t.folderName));
                const {
                  persistHistoryToStorage: s
                } = await Ie(async () => {
                  const {
                    persistHistoryToStorage: l
                  } = await Promise.resolve().then(() => Gu);
                  return {
                    persistHistoryToStorage: l
                  };
                }, void 0, import.meta.url);
                await s(a), window.dispatchEvent(new CustomEvent(iU, {
                  detail: {
                    taskId: i.id
                  }
                }));
              }
            } else console.warn("[historyOssBackup] 队列任务在当前历史元数据中未找到，跳过:", r);
          } else console.warn("[historyOssBackup] 无法获取历史元数据，跳过本次自动同步");
        } catch (a) {
          console.error("[historyOssBackup] 队列内部任务执行异常失败:", r, a);
        }
        zC.delete(r), UC && UC(zC.size, Array.from(zC)[0]), await new Promise(a => setTimeout(a, 1e3));
      }
    } catch (e) {
      console.warn("[historyOssBackup] 队列启动失败(可能未配置 OSS 或不在桌面端):", e);
    } finally {
      net = !1, UC && UC(0);
    }
  }
}

async function Z3n(e, t) {
  const n = await (await fetch(t)).blob();
  if (!n.size) return !1;
  const {
    persistHistoryListThumbnailLocal: r,
    buildListPreviewFileFromBlob: a
  } = await Ie(async () => {
    const {
      persistHistoryListThumbnailLocal: l,
      buildListPreviewFileFromBlob: d
    } = await Promise.resolve().then(() => ii);
    return {
      persistHistoryListThumbnailLocal: l,
      buildListPreviewFileFromBlob: d
    };
  }, void 0, import.meta.url);
  if (!(await r(e, n, {
    forceReplace: !0
  }))) return !1;
  const o = await a(n, `preview-${e.replace(/[^\w.\-]+/g, "_").slice(0, 48)}`),
    {
      assetStore: s
    } = await Ie(async () => {
      const {
        assetStore: l
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: l
      };
    }, void 0, import.meta.url);
  return await s.saveBlobAsset(`${e}_thumbnail`, o, ""), console.log("[historyOssBackup] 视频封面 WebP 已生成:", e), !0;
}

async function ipt(e) {
  const {
      localCacheManager: t
    } = await Ie(async () => {
      const {
        localCacheManager: h
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: h
      };
    }, void 0, import.meta.url),
    n = t.getAssetManifestMeta(e),
    r = String((n == null ? void 0 : n.fileName) || "").trim().replace(/\\/g, "/");
  if (!r) return {
    ok: !1
  };
  try {
    const {
        writeLocalAssetVideoPreviewViaRust: h
      } = await Ie(async () => {
        const {
          writeLocalAssetVideoPreviewViaRust: m
        } = await Promise.resolve().then(() => Ui);
        return {
          writeLocalAssetVideoPreviewViaRust: m
        };
      }, void 0, import.meta.url),
      p = await h(e, r, 512);
    if (p) {
      console.log("[historyOssBackup] ffmpeg 抽帧封面已落盘 preview（对齐 Infinite-Canvas，不读整段 mp4）:", e);
      let m, f;
      try {
        const y = await new Promise(b => {
          const v = new Image();
          v.onload = () => {
            const _ = v.naturalWidth,
              w = v.naturalHeight;
            b(_ > 0 && w > 0 ? {
              w: _,
              h: w
            } : null);
          }, v.onerror = () => b(null), v.src = p;
        });
        y && (m = y.w, f = y.h, console.log("[historyOssBackup] 视频封面抽帧完成:", `${m}x${f}`));
      } catch {}
      return {
        ok: !0,
        width: m,
        height: f
      };
    }
  } catch (h) {
    console.warn("[historyOssBackup] ffmpeg/Rust 封面失败:", e, h);
  }
  try {
    const {
      isCanvasLocalCacheMode: h
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: p
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: p
      };
    }, void 0, import.meta.url);
    if (h()) return console.log("[historyOssBackup] 本地缓存模式跳过 JS 整段 mp4 抽帧（请确认 C:\\ffmpeg\\ffmpeg.exe 可用）:", e), {
      ok: !1
    };
  } catch {}
  const a = await t.getAssetSourcePath(e);
  if (!a) return {
    ok: !1
  };
  const i = Number(n == null ? void 0 : n.size) || 0,
    {
      captureVideoPosterFromLocalAssetFile: o,
      MAX_LOCAL_VIDEO_POSTER_BYTES: s
    } = await Ie(async () => {
      const {
        captureVideoPosterFromLocalAssetFile: h,
        MAX_LOCAL_VIDEO_POSTER_BYTES: p
      } = await Promise.resolve().then(() => pg);
      return {
        captureVideoPosterFromLocalAssetFile: h,
        MAX_LOCAL_VIDEO_POSTER_BYTES: p
      };
    }, void 0, import.meta.url),
    l = Math.min(s, 8 * 1024 * 1024);
  if (i > l) return console.log("[historyOssBackup] 本地视频过大，跳过一次性 JS 抽帧:", e, i), {
    ok: !1
  };
  const d = await o(a, l);
  if (!(d != null && d.dataUrl)) return {
    ok: !1
  };
  console.log("[historyOssBackup] 一次性 JS 抽帧生成封面（ffmpeg 不可用时的兜底）:", e, i || "(size unknown)", d.width, "x", d.height);
  const u = await Z3n(e, d.dataUrl);
  return u && console.log("[historyOssBackup] 视频封面抽帧完成:", `${d.width}x${d.height}`), u ? {
    ok: !0,
    width: d.width,
    height: d.height
  } : {
    ok: !1
  };
}

const NEe = new Map();

async function e4n(e, t) {
  const n = String(e || "").trim();
  if (!n) return;
  const r = NEe.get(n);
  if (r) return r;
  const a = (async () => {
    var f, y, b, v, _;
    const {
      localCacheManager: i
    } = await Ie(async () => {
      const {
        localCacheManager: w
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: w
      };
    }, void 0, import.meta.url);
    await i.ensureRestored();
    const {
      readLocalPreviewThumbnailAsUrl: o
    } = await Ie(async () => {
      const {
        readLocalPreviewThumbnailAsUrl: w
      } = await Promise.resolve().then(() => Ui);
      return {
        readLocalPreviewThumbnailAsUrl: w
      };
    }, void 0, import.meta.url);
    if (i.hasThumbnail(n, "preview") && (await o(n))) return;
    try {
      const w = await ipt(n);
      if (w.ok) return w.width && w.height ? {
        width: w.width,
        height: w.height
      } : void 0;
    } catch (w) {
      console.warn("[historyOssBackup] 本地读盘抽封面失败，继续尝试其它路径:", n, w);
    }
    try {
      const {
        isCanvasLocalCacheMode: w
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: k
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: k
        };
      }, void 0, import.meta.url);
      if (w()) return;
    } catch {}
    const {
        isBrowserCorsHostileVideoUrl: s
      } = await Ie(async () => {
        const {
          isBrowserCorsHostileVideoUrl: w
        } = await Promise.resolve().then(() => pg);
        return {
          isBrowserCorsHostileVideoUrl: w
        };
      }, void 0, import.meta.url),
      l = String(((b = (y = (f = i.getManifest()) == null ? void 0 : f.assets) == null ? void 0 : y[n]) == null ? void 0 : b.remoteUrl) || "").trim(),
      d = String((t == null ? void 0 : t.remotePlayUrl) || "").trim() || l,
      u = /^https?:\/\//i.test(d) && !/^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(d) ? d : "";
    if (u && !s(u)) try {
      if (await zDe(n, u), i.hasThumbnail(n, "preview") && (await o(n))) return;
    } catch (w) {
      console.warn("[historyOssBackup] 远程 URL 抽封面失败，继续尝试本地:", n, w);
    } else u && console.log("[historyOssBackup] 跳过 CORS 敌对远程视频浏览器抽帧（改用本地落盘）:", n, u.slice(0, 72));
    const h = await i.getConvertFileSrcForAsset(n);
    if (h) {
      await zDe(n, h, {
        remotePlayUrl: u && !s(u) ? u : void 0
      });
      return;
    }
    const p = await J3n(n);
    if (!(p != null && p.blob)) return;
    if (p.blob.size > 12 * 1024 * 1024) {
      console.log("[historyOssBackup] IDB 视频过大，跳过整 Blob 抽帧:", n, p.blob.size);
      return;
    }
    ((v = p.blob.type) != null && v.startsWith("video/") || (_ = p.mimeType) != null && _.startsWith("video/") || /vidu_|_video|\.mp4$/i.test(n)) && (await MEr(n, p.blob));
  })();
  NEe.set(n, a);
  try {
    return await a;
  } finally {
    NEe.get(n) === a && NEe.delete(n);
  }
}

async function zDe(e, t, n) {
  var d, u, h;
  const {
      isLocalListPreviewWebp: r
    } = await Ie(async () => {
      const {
        isLocalListPreviewWebp: p
      } = await Promise.resolve().then(() => ii);
      return {
        isLocalListPreviewWebp: p
      };
    }, void 0, import.meta.url),
    {
      localCacheManager: a
    } = await Ie(async () => {
      const {
        localCacheManager: p
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: p
      };
    }, void 0, import.meta.url);
  if (await a.ensureRestored(), a.hasThumbnail(e, "preview") && (await r(e))) return;
  const {
    isBrowserCorsHostileVideoUrl: i,
    captureVideoPosterDataUrl: o
  } = await Ie(async () => {
    const {
      isBrowserCorsHostileVideoUrl: p,
      captureVideoPosterDataUrl: m
    } = await Promise.resolve().then(() => pg);
    return {
      isBrowserCorsHostileVideoUrl: p,
      captureVideoPosterDataUrl: m
    };
  }, void 0, import.meta.url);
  if (/^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(t) || t.startsWith("asset:")) {
    try {
      if ((await ipt(e)).ok) return;
    } catch (m) {
      console.warn("[historyOssBackup] asset.localhost 本地读盘抽帧失败:", e, m);
    }
    const p = String((n == null ? void 0 : n.remotePlayUrl) || "").trim() || String(((h = (u = (d = a.getManifest()) == null ? void 0 : d.assets) == null ? void 0 : u[e]) == null ? void 0 : h.remoteUrl) || "").trim();
    if (/^https?:\/\//i.test(p) && !/^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(p) && !i(p)) try {
      await zDe(e, p);
      return;
    } catch (m) {
      console.warn("[historyOssBackup] asset.localhost 回退远程抽帧失败:", e, m);
    }
    console.log("[historyOssBackup] 跳过 asset.localhost 封面抽帧（无可用本地盘/安全远程，避免整文件进堆）:", e);
    return;
  }
  if (i(t)) {
    try {
      if ((await ipt(e)).ok) return;
    } catch {}
    throw new Error("CORS_HOSTILE_VIDEO_POSTER");
  }
  const l = await o(t);
  await Z3n(e, l);
}

async function MEr(e, t) {
  var a;
  const n = (a = t.type) != null && a.startsWith("video/") ? t : new Blob([t], {
      type: "video/mp4"
    }),
    r = URL.createObjectURL(n);
  try {
    await zDe(e, r);
  } finally {
    URL.revokeObjectURL(r);
  }
}

async function t4n(e, t, n) {
  if (DVe(n)) {
    console.log("[historyOssBackup] 跳过全局 OSS 项物理上传:", n.id);
    return;
  }
  const {
      localCacheManager: r
    } = await Ie(async () => {
      const {
        localCacheManager: f
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: f
      };
    }, void 0, import.meta.url),
    a = n._mjAssetIds,
    i = n._audioAssetId,
    s = n.type === "video" && n.url && (n.url.includes("prod-ss-vidu") || n.url.includes("prod-sa-vidu") || n.url.includes("amazonaws") && n.url.includes("vidu")) ? `${n.id}_vidu_${(n.url.split("/").pop() || n.url).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 36) || Date.now()}` : n._assetId || n.id;
  if (console.log("[historyOssBackup] [uploadSingleHistoryItemAssets] 主资源 assetId:", s), n.type === "video" && s) try {
    await e4n(s);
  } catch (f) {
    console.warn("[historyOssBackup] 视频封面生成失败，继续上传主文件:", f);
  }
  const l = new Set();
  s && l.add(s), i && (Array.isArray(i) ? i.forEach(f => l.add(f)) : l.add(i)), a && a.length > 0 && a.forEach(f => l.add(f));
  const d = U4e(n) ? [] : [s, ...(a || [])].filter(Boolean),
    u = [];
  for (const f of d) {
    const y = r.hasAsset(`preview_${f}`);
    console.log(`[historyOssBackup] [uploadSingleHistoryItemAssets] 检查 preview_${f} 缩略图是否存在:`, y), y && u.push(`preview_${f}`);
  }
  const h = [...Array.from(l).map(f => ({
    id: f,
    isThumb: !1
  })), ...u.map(f => ({
    id: f,
    isThumb: !0
  }))];
  console.log("[historyOssBackup] 上传单项资产清单汇总:", n.id, "资产数量:", h.length, "详情:", JSON.stringify(h));
  let p = 0,
    m = !1;
  for (const f of h) try {
    console.log("[historyOssBackup] 正在读取资源（本地目录 / IndexedDB）:", f.id);
    const y = await J3n(f.id);
    if (!y) {
      console.log("[historyOssBackup] 本地与 IndexedDB 均无此资产, 跳过上传:", f.id);
      continue;
    }
    console.log("[historyOssBackup] 成功读取资源, 大小:", y.blob.size, "类型:", y.mimeType);
    const b = await y.blob.arrayBuffer(),
      v = new Uint8Array(b),
      _ = xE(t, f.id, n.type),
      w = y.mimeType && y.mimeType !== "application/octet-stream" ? y.mimeType : CEr(n.type, f.isThumb);
    console.log("[historyOssBackup] 正在推送资源到 OSS:", _, "大小:", v.length, "bytes"), await Pv(_, v, w, e), p++, !f.isThumb && f.id === s && (m = !0), console.log("[historyOssBackup] 资源推送 OSS 成功:", _);
  } catch (y) {
    console.warn("[historyOssBackup] 处理并上传资产失败:", f.id, y);
  }
  if (p === 0) throw new Error(`未找到可上传的本地资产（taskId=${n.id}）`);
  if (!m) throw new Error(`主资源未上传到 OSS（可能仍在下载本地缓存，taskId=${n.id}）`);
  Object.assign(n, G4e(n, t));
}

async function n4n(e) {
  const t = j$(),
    n = zk(),
    {
      localCacheManager: r
    } = await Ie(async () => {
      const {
        localCacheManager: u
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: u
      };
    }, void 0, import.meta.url),
    {
      filterDeletedHistoryItems: a
    } = await Ie(async () => {
      const {
        filterDeletedHistoryItems: u
      } = await Promise.resolve().then(() => Gu);
      return {
        filterDeletedHistoryItems: u
      };
    }, void 0, import.meta.url);
  await r.ensureRestored(), e == null || e({
    percent: 10,
    message: "正在加载本地历史元数据..."
  });
  const i = a((await r.loadHistory()) || []);
  if (!i || i.length === 0) {
    e == null || e({
      percent: 100,
      message: "本地无生成历史记录，无需备份。"
    });
    return;
  }
  const o = i.length;
  console.log("[historyOssBackup] 启动全量历史备份，总项数:", o);
  let s = 0,
    l = 0,
    d = 0;
  for (let u = 0; u < o; u++) {
    const h = i[u],
      p = 10 + Math.floor(u / o * 75);
    if (DVe(h)) {
      s++, h.ossUploaded = !0, Object.assign(h, G4e(h, n.folderName)), e == null || e({
        percent: p,
        message: `复用全局 OSS (${u + 1}/${o}): ${h.modelName || "未知模型"}`
      });
      continue;
    }
    e == null || e({
      percent: p,
      message: `正在上传历史资产 (${u + 1}/${o}): ${h.modelName || "未知模型"}`
    });
    try {
      await t4n(t, n.folderName, h), h.ossUploaded = !0, d++;
    } catch (m) {
      l++, console.warn("[historyOssBackup] 单项上传失败:", h.id, m);
    }
  }
  e == null || e({
    percent: 92,
    message: "正在上传云盘清单文件..."
  }), await G3n(i), e == null || e({
    percent: 100,
    message: `生成历史备份成功！上传 ${d} 项，复用全局 OSS ${s} 项${l > 0 ? `，失败 ${l} 项` : ""}。`
  });
}

async function r4n(e) {
  const t = j$(),
    n = zk(),
    {
      localCacheManager: r
    } = await Ie(async () => {
      const {
        localCacheManager: A
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: A
      };
    }, void 0, import.meta.url),
    {
      filterDeletedHistoryItems: a,
      loadDeletedHistoryIds: i
    } = await Ie(async () => {
      const {
        filterDeletedHistoryItems: A,
        loadDeletedHistoryIds: S
      } = await Promise.resolve().then(() => Gu);
      return {
        filterDeletedHistoryItems: A,
        loadDeletedHistoryIds: S
      };
    }, void 0, import.meta.url),
    {
      recoverHistoryItemsFromGlobalMaterialOss: o
    } = await Ie(async () => {
      const {
        recoverHistoryItemsFromGlobalMaterialOss: A
      } = await Promise.resolve().then(() => ii);
      return {
        recoverHistoryItemsFromGlobalMaterialOss: A
      };
    }, void 0, import.meta.url);
  await r.ensureRestored(), e == null || e({
    percent: 15,
    message: "正在从云端读取历史记录清单..."
  });
  const s = $4e(n.folderName);
  let l = [],
    d = !0;
  try {
    const A = await Hp(s, t),
      S = new TextDecoder().decode(A);
    l = JSON.parse(S), Array.isArray(l) || (l = []);
  } catch (A) {
    if (_j(A)) {
      if (d = !1, l = await o(), l.length === 0) throw new Error("未在云端找到 history_manifest.json，且 videos/ 目录无可用视频。请先在本地有完整历史的设备上执行「备份到云端」。");
    } else throw new Error("读取云端历史清单失败：" + A5t(A));
  }
  if (l = a(l), l.length === 0) {
    e == null || e({
      percent: 100,
      message: "云端备份没有有效的历史记录项。"
    });
    return;
  }
  const u = i(),
    {
      mergeHistoryItemSnapshots: h
    } = await Ie(async () => {
      const {
        mergeHistoryItemSnapshots: A
      } = await Promise.resolve().then(() => Gu);
      return {
        mergeHistoryItemSnapshots: A
      };
    }, void 0, import.meta.url),
    p = a((await r.loadHistory()) || []),
    m = new Map();
  p.forEach(A => m.set(String(A.id), A));
  const f = new Map();
  for (const A of p) f.set(String(A.id), A);
  const y = [];
  for (const A of l) {
    const S = String(A.id);
    if (u.has(S)) continue;
    const C = m.get(S);
    C ? f.set(S, h(C, A)) : (f.set(S, A), y.push(A));
  }
  const b = $3n([...f.values()]),
    v = l.length;
  console.log("[historyOssBackup] 开始拉取资产，总项数:", v, "新增条目:", y.length, "manifestFound:", d);
  let _ = 0;
  for (let A = 0; A < v; A++) {
    const S = l[A];
    if (DVe(S)) continue;
    const C = 15 + Math.floor(A / v * 75);
    e == null || e({
      percent: C,
      message: `正在对齐本地缓存 (${A + 1}/${v}): 下载缺失的资产`
    });
    const I = S._mjAssetIds,
      E = S._audioAssetId,
      T = S.type === "video" && S.url && (S.url.includes("prod-ss-vidu") || S.url.includes("prod-sa-vidu") || S.url.includes("amazonaws") && S.url.includes("vidu")) ? `${S.id}_vidu_${(S.url.split("/").pop() || S.url).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 36) || Date.now()}` : S._assetId || S.id,
      P = new Set();
    T && P.add(T), E && P.add(E), I && I.length > 0 && I.forEach(j => P.add(j));
    for (const j of P) if (!(await r.hasAsset(j))) try {
      const F = xE(n.folderName, j, S.type);
      console.log("[historyOssBackup] 从 OSS 拉取缺失资产:", F);
      const N = await Hp(F, t),
        G = S.type === "video" ? "video/mp4" : S.type === "audio" ? "audio/mpeg" : "image/png",
        z = nU(N, G);
      await r.saveAsset(j, z, G), _++;
    } catch (F) {
      console.log("[historyOssBackup] 下载资产失败(可能备份时此项资产尚未生成), 跳过:", j, F);
    }
    const R = [T, ...(I || [])].filter(Boolean);
    for (const j of R) {
      const B = `preview_${j}`;
      if (!(await r.hasAsset(B))) try {
        const N = xE(n.folderName, B, S.type),
          G = await Hp(N, t),
          z = nU(G, "image/jpeg");
        await r.saveAsset(B, z, "image/jpeg");
      } catch {}
    }
  }
  e == null || e({
    percent: 95,
    message: "正在同步历史记录元数据..."
  });
  const w = a(b),
    {
      persistHistoryToStorage: k
    } = await Ie(async () => {
      const {
        persistHistoryToStorage: A
      } = await Promise.resolve().then(() => Gu);
      return {
        persistHistoryToStorage: A
      };
    }, void 0, import.meta.url);
  await k(w), window.dispatchEvent(new CustomEvent(iU)), e == null || e({
    percent: 100,
    message: d ? `生成历史恢复并同步成功！新增记录 ${y.length} 条，下载缺失资产 ${_} 个。` : `已从 videos/ 目录恢复 ${y.length} 条视频（无 manifest，任务卡元数据可能不全）。`
  });
}

async function PEr(e) {
  await H3n(e);
  const t = zk();
  if (t.enabled) try {
    const n = j$();
    console.log("[historyOssBackup] 开始静默清理云端历史关联资源:", e.id);
    const r = e._mjAssetIds,
      a = e._audioAssetId,
      o = e.type === "video" && e.url && (e.url.includes("prod-ss-vidu") || e.url.includes("prod-sa-vidu") || e.url.includes("amazonaws") && e.url.includes("vidu")) ? `${e.id}_vidu_${(e.url.split("/").pop() || e.url).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 36) || Date.now()}` : e._assetId || e.id,
      s = new Set();
    o && s.add(o), a && (Array.isArray(a) ? a.forEach(m => s.add(m)) : s.add(a)), r && r.length > 0 && r.forEach(m => s.add(m));
    const d = [o, ...(r || [])].filter(Boolean).map(m => `preview_${m}`),
      u = [...Array.from(s).map(m => xE(t.folderName, m, e.type)), ...d.map(m => xE(t.folderName, m, e.type))];
    console.log("[historyOssBackup] 待从 OSS 删除的文件列表:", u);
    for (const m of u) try {
      await aU(m, n), console.log("[historyOssBackup] 从 OSS 删除文件成功:", m);
    } catch (f) {
      console.log("[historyOssBackup] 从 OSS 删除文件失败或不存在(可能备份未成功), 跳过:", m, f);
    }
    console.log("[historyOssBackup] 正在同步删除云端清单里的记录...");
    const h = $4e(t.folderName);
    let p = [];
    try {
      const m = await Hp(h, n),
        f = new TextDecoder().decode(m);
      p = JSON.parse(f);
    } catch {}
    if (p.length > 0) {
      const m = p.filter(b => String(b.id) !== String(e.id)),
        f = JSON.stringify(m, null, 2),
        y = new TextEncoder().encode(f);
      await Pv(h, y, "application/json", n), console.log("[historyOssBackup] 云端清单同步删除完成，剩余项数:", m.length);
    }
  } catch (n) {
    console.warn("[historyOssBackup] 尝试清理云端数据失败(可能未配置凭证):", n);
  }
}

const qh = Object.freeze(Object.defineProperty({
    __proto__: null,
    DEFAULT_HISTORY_OSS_FOLDER_NAME: xj,
    HISTORY_OSS_BACKUP_CHANGED_EVENT: Zne,
    HISTORY_OSS_BACKUP_STORAGE_KEY: k5t,
    HISTORY_OSS_RESTORED_EVENT: iU,
    assertHistoryOssCredentialsReady: j$,
    buildHistoryManifestObjectKey: $4e,
    buildHistoryOssPublicUrl: Zht,
    checkHistoryItemLocallyCached: Y3n,
    coldReadHistoryItemFromOss: FVe,
    deleteGlobalOssUrlsForHistoryItem: H3n,
    deleteHistoryItemFromOss: PEr,
    deriveHistoryItemOssUrls: LVe,
    downloadHistoryFromOss: r4n,
    ensureHistoryVideoPreviewThumbnailForAssetId: e4n,
    fetchHistoryOssObjectAsBlobUrl: R9e,
    formatHistoryOssInvokeError: A5t,
    getHistoryOssObjectKey: xE,
    historyOssObjectKeyFromPublicUrl: S5t,
    isAliyunOssHttpsUrlForHistory: FH,
    isHistoryBackupFolderOssUrl: Ad,
    isHistoryItemAlreadyBackedByGlobalOss: DVe,
    isHistoryOssNotFoundError: _j,
    isHistoryOssObjectKnownMissing: OVe,
    isHistoryOssPublicUrlKnownMissing: Nb,
    loadHistoryOssBackupSettings: zk,
    markHistoryOssPublicUrlMissing: cY,
    normalizeHistoryOssPublicUrlForCache: BVe,
    ossObjectKeyLooseFromPublicUrl: Q3n,
    patchHistoryItemOssUrlFields: G4e,
    registerHistoryQueueCallback: X3n,
    removeHistoryItemsFromOssManifest: _Er,
    resolveHistoryMainAssetId: U3n,
    saveHistoryOssBackupSettings: z3n,
    scheduleHistoryOssAutoUpload: EEr,
    triggerHistoryOssAutoUpload: apt,
    uploadHistoryManifest: G3n,
    uploadHistoryToOss: n4n
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  REr = 2;

function NEr() {
  return typeof window > "u" ? 1 : window.devicePixelRatio || 1;
}

function jEr(e) {
  return 1;
}

function DEr() {
  return Math.min(NEr(), REr);
}

function I5t(e, t) {
  return {
    width: e,
    height: t
  };
}

let zN = null,
  Pwe = null;

function opt() {
  zN = null;
}

function LEr() {
  Pwe = null;
}

function C5t(e, t) {
  Pwe = {
    el: e,
    left: t.left,
    top: t.top,
    width: t.width,
    height: t.height
  };
}

function dY(e) {
  const t = Pwe;
  return t ? t.el.isConnected ? e && t.el !== e ? null : t : (Pwe = null, null) : null;
}

function OEr(e) {
  const t = dY(e);
  if (t) return t;
  const n = e.getBoundingClientRect();
  return n.width <= 0 || n.height <= 0 ? null : (C5t(e, {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height
  }), i4n(e, n), dY(e));
}

function BEr(e) {
  const t = dY(e);
  if (t) return {
    width: t.width,
    height: t.height
  };
}

typeof window < "u" && window.addEventListener("resize", () => {
  zN = null, Pwe = null;
}, {
  passive: !0
});

function uY(e, t, n, r) {
  const a = n > 0 ? n : 1,
    i = r ?? (typeof document < "u" ? document.getElementById("canvas-bg") : null);
  return zN && i && zN.el === i && !zN.isUnit ? {
    dx: e * zN.sx / a,
    dy: t * zN.sy / a
  } : {
    dx: e / a,
    dy: t / a
  };
}

function a4n(e, t) {
  opt();
  const n = t ?? (typeof document < "u" ? document.getElementById("canvas-bg") : null);
  if (n) {
    const r = n.getBoundingClientRect();
    i4n(n, r);
  }
  return uY(1, 1, e, n);
}

function i4n(e, t) {
  const n = e.offsetWidth;
  if (n <= 0 || t.width <= 0) return;
  const r = n / t.width,
    a = e.offsetHeight,
    i = t.height ?? null,
    o = i != null && i > 0 && a > 0 ? a / i : r,
    s = Math.abs(r - 1) < .001 && Math.abs(o - 1) < .001;
  zN = {
    el: e,
    rectW: t.width,
    rectH: i,
    sx: r,
    sy: o,
    isUnit: s
  };
}

function UDe(e, t, n, r) {
  const a = r ?? (typeof document < "u" ? document.getElementById("canvas-bg") : null),
    i = e - n.left,
    o = t - n.top;
  if (!a || n.width == null || n.width <= 0) return {
    x: i,
    y: o
  };
  let s = zN;
  const l = n.height ?? null;
  return !(!!s && s.el === a && Math.abs(s.rectW - n.width) <= .5 && (l == null ? s.rectH == null : s.rectH != null && Math.abs(s.rectH - l) <= .5)) || !s ? {
    x: i,
    y: o
  } : s.isUnit ? {
    x: i,
    y: o
  } : {
    x: i * s.sx,
    y: o * s.sy
  };
}

function B8(e, t, n, r, a) {
  const i = UDe(e, t, n, a),
    o = r.zoom > 0 ? r.zoom : 1;
  return {
    x: (i.x - r.x) / o,
    y: (i.y - r.y) / o
  };
}

function kj(e, t, n, r, a) {
  const i = r ?? (typeof document < "u" ? document.getElementById("canvas-bg") : null);
  if (!i) return null;
  const o = dY(i);
  if (o) return B8(e, t, o, n, i);
  if ((a == null ? void 0 : a.allowLayoutRead) === !1) return null;
  const s = i.getBoundingClientRect();
  return C5t(i, s), B8(e, t, s, n, i);
}

function hY(e, t, n, r) {
  const a = I5t(r.width, r.height);
  return {
    x: a.width / 2 - e * n,
    y: a.height / 2 - t * n,
    zoom: n
  };
}

const o4n = 250,
  s4n = 250,
  Sd = {
    OVERSCAN: 1e3,
    OVERSCAN_INTERACTIVE: 300,
    TRANSLATE_EXTENT: null,
    MIN_ZOOM: .15,
    MAX_ZOOM: 2,
    FIT_VIEW_MIN_ZOOM: .7,
    FIT_VIEW_MAX_ZOOM: 1.3,
    DEFAULT_ZOOM: 1,
    DEFAULT_VIEW: {
      x: 0,
      y: 0,
      zoom: 1
    },
    INITIAL_VIEWPORT_NODE_THRESHOLD: 50,
    INITIAL_VIEWPORT_PAD_X: 120,
    INITIAL_VIEWPORT_PAD_Y: 80,
    FIT_VIEW_PADDING: .1,
    APPLY_AI_ROLE_TO_CANVAS_ZOOM: .56
  };

function $De(e) {
  return Math.min(Sd.MAX_ZOOM, Math.max(Sd.MIN_ZOOM, e));
}

function FEr(e) {
  return Math.min(Sd.FIT_VIEW_MAX_ZOOM, Math.max(Sd.FIT_VIEW_MIN_ZOOM, e));
}

function oU() {
  const {
    x: e,
    y: t,
    zoom: n
  } = Sd.DEFAULT_VIEW;
  return {
    x: e,
    y: t,
    zoom: n
  };
}

const l4n = {
    TINY: .12,
    MINI: 0,
    LOW: 0,
    MEDIUM: 0
  },
  V4e = {
    PERF_MODE_THRESHOLD: 50,
    DEBOUNCE_DELAY: {
      STORAGE_SAVE: 1e3,
      CHARACTER_SAVE: 500,
      IMAGE_LAZY_LOAD: 100
    },
    IMAGE_QUEUE: {
      MAX_CONCURRENT: 3,
      OFFSCREEN_DELAY: 200
    },
    MEMORY: {
      MAX_CACHE_SIZE_MB: 50,
      CLEANUP_THRESHOLD_MB: 40,
      MAX_CACHE_ITEMS: 100
    }
  };

function c4n(e) {
  const t = [];
  return e <= l4n.TINY && t.push("zoom-tiny"), Number.isFinite(e) && e > 0 && e < .25 && t.push("zoom-oss-lod-tiny"), t.join(" ");
}

function d4n(e, t = !1) {
  return t ? e > 150 ? 60 : e > 80 ? 100 : Sd.OVERSCAN_INTERACTIVE : e > 200 ? 80 : e > 150 ? 120 : e > 100 ? 160 : e > 50 ? 250 : 400;
}

function zEr(e) {
  return e >= V4e.PERF_MODE_THRESHOLD;
}

function u4n(e) {
  return {
    w: e.width ?? o4n,
    h: e.height ?? s4n
  };
}

function E5t(e) {
  if (!e.length) return null;
  let t = 1 / 0,
    n = 1 / 0,
    r = -1 / 0,
    a = -1 / 0;
  for (const i of e) {
    const {
      w: o,
      h: s
    } = u4n(i);
    t = Math.min(t, i.x), n = Math.min(n, i.y), r = Math.max(r, i.x + o), a = Math.max(a, i.y + s);
  }
  return !Number.isFinite(t) || !Number.isFinite(n) ? null : {
    minX: t,
    minY: n,
    maxX: r,
    maxY: a
  };
}

function h4n(e, t, n) {
  const r = (n == null ? void 0 : n.padding) ?? Sd.FIT_VIEW_PADDING,
    a = (n == null ? void 0 : n.minZoom) ?? Sd.MIN_ZOOM,
    i = (n == null ? void 0 : n.maxZoom) ?? Sd.MAX_ZOOM,
    o = Math.max(1, e.maxX - e.minX),
    s = Math.max(1, e.maxY - e.minY),
    l = Math.min(i, Math.max(a, Math.min(t.width / (o * (1 + r)), t.height / (s * (1 + r)))));
  return hY((e.minX + e.maxX) / 2, (e.minY + e.maxY) / 2, l, t);
}

function T5t(e, t, n) {
  const r = E5t(e);
  return r ? h4n(r, t, {
    minZoom: (n == null ? void 0 : n.minZoom) ?? Sd.FIT_VIEW_MIN_ZOOM,
    maxZoom: (n == null ? void 0 : n.maxZoom) ?? Sd.FIT_VIEW_MAX_ZOOM,
    padding: (n == null ? void 0 : n.padding) ?? Sd.FIT_VIEW_PADDING
  }) : null;
}

function p4n(e) {
  if (!e.length) return null;
  let t = e[0];
  for (const n of e) n.y !== t.y ? n.y < t.y && (t = n) : n.x < t.x && (t = n);
  return {
    x: -t.x * Sd.DEFAULT_ZOOM + Sd.INITIAL_VIEWPORT_PAD_X,
    y: -t.y * Sd.DEFAULT_ZOOM + Sd.INITIAL_VIEWPORT_PAD_Y,
    zoom: Sd.DEFAULT_ZOOM
  };
}

function m4n(e, t) {
  const n = t.width,
    r = t.height;
  if (!e.length || n <= 0 || r <= 0) {
    const a = I5t(Math.max(n, 0), Math.max(r, 0));
    return {
      x: a.width / 2,
      y: a.height / 2,
      zoom: Sd.DEFAULT_ZOOM
    };
  }
  return e.length > Sd.INITIAL_VIEWPORT_NODE_THRESHOLD ? p4n(e) ?? oU() : T5t(e, t) ?? oU();
}

function f4n(e, t, n = 1) {
  const r = E5t(e);
  if (!r || t.width <= 0 || t.height <= 0) return null;
  const a = Math.max(1, r.maxX - r.minX),
    i = Math.max(1, r.maxY - r.minY),
    o = Math.min(t.width / (a * (1 + .24)), t.height / (i * (1 + .24))),
    s = n > 0 ? n : Sd.DEFAULT_ZOOM,
    l = Math.min(Sd.FIT_VIEW_MAX_ZOOM, Math.max(Sd.FIT_VIEW_MIN_ZOOM, Math.min(s, o)));
  return hY((r.minX + r.maxX) / 2, (r.minY + r.maxY) / 2, l, t);
}

function g4n(e) {
  if (!e || typeof e != "object") return null;
  const t = e,
    n = Number(t.x),
    r = Number(t.y),
    a = Number(t.zoom);
  if (!Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(a) || a <= 0) return null;
  const i = $De(a);
  return {
    x: n,
    y: r,
    zoom: i
  };
}

function y4n(e, t, n) {
  return g4n(e) ?? m4n(t, n);
}

var ret = {
    exports: {}
  },
  x_ = {},
  aet = {
    exports: {}
  },
  iet = {};

/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rHt;

function UEr() {
  return rHt || (rHt = 1, (function (e) {
    function t(G, z) {
      var V = G.length;
      G.push(z);
      e: for (; 0 < V;) {
        var O = V - 1 >>> 1,
          L = G[O];
        if (0 < a(L, z)) G[O] = z, G[V] = L, V = O;else break e;
      }
    }
    function n(G) {
      return G.length === 0 ? null : G[0];
    }
    function r(G) {
      if (G.length === 0) return null;
      var z = G[0],
        V = G.pop();
      if (V !== z) {
        G[0] = V;
        e: for (var O = 0, L = G.length, D = L >>> 1; O < D;) {
          var U = 2 * (O + 1) - 1,
            H = G[U],
            Y = U + 1,
            K = G[Y];
          if (0 > a(H, V)) Y < L && 0 > a(K, H) ? (G[O] = K, G[Y] = V, O = Y) : (G[O] = H, G[U] = V, O = U);else if (Y < L && 0 > a(K, V)) G[O] = K, G[Y] = V, O = Y;else break e;
        }
      }
      return z;
    }
    function a(G, z) {
      var V = G.sortIndex - z.sortIndex;
      return V !== 0 ? V : G.id - z.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var i = performance;
      e.unstable_now = function () {
        return i.now();
      };
    } else {
      var o = Date,
        s = o.now();
      e.unstable_now = function () {
        return o.now() - s;
      };
    }
    var l = [],
      d = [],
      u = 1,
      h = null,
      p = 3,
      m = !1,
      f = !1,
      y = !1,
      b = typeof setTimeout == "function" ? setTimeout : null,
      v = typeof clearTimeout == "function" ? clearTimeout : null,
      _ = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function w(G) {
      for (var z = n(d); z !== null;) {
        if (z.callback === null) r(d);else if (z.startTime <= G) r(d), z.sortIndex = z.expirationTime, t(l, z);else break;
        z = n(d);
      }
    }
    function k(G) {
      if (y = !1, w(G), !f) if (n(l) !== null) f = !0, F(A);else {
        var z = n(d);
        z !== null && N(k, z.startTime - G);
      }
    }
    function A(G, z) {
      f = !1, y && (y = !1, v(I), I = -1), m = !0;
      var V = p;
      try {
        for (w(z), h = n(l); h !== null && (!(h.expirationTime > z) || G && !T());) {
          var O = h.callback;
          if (typeof O == "function") {
            h.callback = null, p = h.priorityLevel;
            var L = O(h.expirationTime <= z);
            z = e.unstable_now(), typeof L == "function" ? h.callback = L : h === n(l) && r(l), w(z);
          } else r(l);
          h = n(l);
        }
        if (h !== null) var D = !0;else {
          var U = n(d);
          U !== null && N(k, U.startTime - z), D = !1;
        }
        return D;
      } finally {
        h = null, p = V, m = !1;
      }
    }
    var S = !1,
      C = null,
      I = -1,
      E = 5,
      M = -1;
    function T() {
      return !(e.unstable_now() - M < E);
    }
    function P() {
      if (C !== null) {
        var G = e.unstable_now();
        M = G;
        var z = !0;
        try {
          z = C(!0, G);
        } finally {
          z ? R() : (S = !1, C = null);
        }
      } else S = !1;
    }
    var R;
    if (typeof _ == "function") R = function () {
      _(P);
    };else if (typeof MessageChannel < "u") {
      var j = new MessageChannel(),
        B = j.port2;
      j.port1.onmessage = P, R = function () {
        B.postMessage(null);
      };
    } else R = function () {
      b(P, 0);
    };
    function F(G) {
      C = G, S || (S = !0, R());
    }
    function N(G, z) {
      I = b(function () {
        G(e.unstable_now());
      }, z);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function (G) {
      G.callback = null;
    }, e.unstable_continueExecution = function () {
      f || m || (f = !0, F(A));
    }, e.unstable_forceFrameRate = function (G) {
      0 > G || 125 < G ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < G ? Math.floor(1e3 / G) : 5;
    }, e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }, e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }, e.unstable_next = function (G) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = p;
      }
      var V = p;
      p = z;
      try {
        return G();
      } finally {
        p = V;
      }
    }, e.unstable_pauseExecution = function () {}, e.unstable_requestPaint = function () {}, e.unstable_runWithPriority = function (G, z) {
      switch (G) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          G = 3;
      }
      var V = p;
      p = G;
      try {
        return z();
      } finally {
        p = V;
      }
    }, e.unstable_scheduleCallback = function (G, z, V) {
      var O = e.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? O + V : O) : V = O, G) {
        case 1:
          var L = -1;
          break;
        case 2:
          L = 250;
          break;
        case 5:
          L = 1073741823;
          break;
        case 4:
          L = 1e4;
          break;
        default:
          L = 5e3;
      }
      return L = V + L, G = {
        id: u++,
        callback: z,
        priorityLevel: G,
        startTime: V,
        expirationTime: L,
        sortIndex: -1
      }, V > O ? (G.sortIndex = V, t(d, G), n(l) === null && G === n(d) && (y ? (v(I), I = -1) : y = !0, N(k, V - O))) : (G.sortIndex = L, t(l, G), f || m || (f = !0, F(A))), G;
    }, e.unstable_shouldYield = T, e.unstable_wrapCallback = function (G) {
      var z = p;
      return function () {
        var V = p;
        p = z;
        try {
          return G.apply(this, arguments);
        } finally {
          p = V;
        }
      };
    };
  })(iet)), iet;
}

var aHt;

function $Er() {
  return aHt || (aHt = 1, aet.exports = UEr()), aet.exports;
}

/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iHt;

function GEr() {
  if (iHt) return x_;
  iHt = 1;
  var e = D4e(),
    t = $Er();
  function n(ee) {
    for (var se = "https://reactjs.org/docs/error-decoder.html?invariant=" + ee, Pe = 1; Pe < arguments.length; Pe++) se += "&args[]=" + encodeURIComponent(arguments[Pe]);
    return "Minified React error #" + ee + "; visit " + se + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var r = new Set(),
    a = {};
  function i(ee, se) {
    o(ee, se), o(ee + "Capture", se);
  }
  function o(ee, se) {
    for (a[ee] = se, ee = 0; ee < se.length; ee++) r.add(se[ee]);
  }
  var s = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    l = Object.prototype.hasOwnProperty,
    d = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    u = {},
    h = {};
  function p(ee) {
    return l.call(h, ee) ? !0 : l.call(u, ee) ? !1 : d.test(ee) ? h[ee] = !0 : (u[ee] = !0, !1);
  }
  function m(ee, se, Pe, ot) {
    if (Pe !== null && Pe.type === 0) return !1;
    switch (typeof se) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return ot ? !1 : Pe !== null ? !Pe.acceptsBooleans : (ee = ee.toLowerCase().slice(0, 5), ee !== "data-" && ee !== "aria-");
      default:
        return !1;
    }
  }
  function f(ee, se, Pe, ot) {
    if (se === null || typeof se > "u" || m(ee, se, Pe, ot)) return !0;
    if (ot) return !1;
    if (Pe !== null) switch (Pe.type) {
      case 3:
        return !se;
      case 4:
        return se === !1;
      case 5:
        return isNaN(se);
      case 6:
        return isNaN(se) || 1 > se;
    }
    return !1;
  }
  function y(ee, se, Pe, ot, Nt, mn, hr) {
    this.acceptsBooleans = se === 2 || se === 3 || se === 4, this.attributeName = ot, this.attributeNamespace = Nt, this.mustUseProperty = Pe, this.propertyName = ee, this.type = se, this.sanitizeURL = mn, this.removeEmptyString = hr;
  }
  var b = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (ee) {
    b[ee] = new y(ee, 0, !1, ee, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (ee) {
    var se = ee[0];
    b[se] = new y(se, 1, !1, ee[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (ee) {
    b[ee] = new y(ee, 2, !1, ee.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (ee) {
    b[ee] = new y(ee, 2, !1, ee, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (ee) {
    b[ee] = new y(ee, 3, !1, ee.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function (ee) {
    b[ee] = new y(ee, 3, !0, ee, null, !1, !1);
  }), ["capture", "download"].forEach(function (ee) {
    b[ee] = new y(ee, 4, !1, ee, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function (ee) {
    b[ee] = new y(ee, 6, !1, ee, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function (ee) {
    b[ee] = new y(ee, 5, !1, ee.toLowerCase(), null, !1, !1);
  });
  var v = /[\-:]([a-z])/g;
  function _(ee) {
    return ee[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (ee) {
    var se = ee.replace(v, _);
    b[se] = new y(se, 1, !1, ee, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (ee) {
    var se = ee.replace(v, _);
    b[se] = new y(se, 1, !1, ee, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function (ee) {
    var se = ee.replace(v, _);
    b[se] = new y(se, 1, !1, ee, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function (ee) {
    b[ee] = new y(ee, 1, !1, ee.toLowerCase(), null, !1, !1);
  }), b.xlinkHref = new y("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function (ee) {
    b[ee] = new y(ee, 1, !1, ee.toLowerCase(), null, !0, !0);
  });
  function w(ee, se, Pe, ot) {
    var Nt = b.hasOwnProperty(se) ? b[se] : null;
    (Nt !== null ? Nt.type !== 0 : ot || !(2 < se.length) || se[0] !== "o" && se[0] !== "O" || se[1] !== "n" && se[1] !== "N") && (f(se, Pe, Nt, ot) && (Pe = null), ot || Nt === null ? p(se) && (Pe === null ? ee.removeAttribute(se) : ee.setAttribute(se, "" + Pe)) : Nt.mustUseProperty ? ee[Nt.propertyName] = Pe === null ? Nt.type === 3 ? !1 : "" : Pe : (se = Nt.attributeName, ot = Nt.attributeNamespace, Pe === null ? ee.removeAttribute(se) : (Nt = Nt.type, Pe = Nt === 3 || Nt === 4 && Pe === !0 ? "" : "" + Pe, ot ? ee.setAttributeNS(ot, se, Pe) : ee.setAttribute(se, Pe))));
  }
  var k = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    A = Symbol.for("react.element"),
    S = Symbol.for("react.portal"),
    C = Symbol.for("react.fragment"),
    I = Symbol.for("react.strict_mode"),
    E = Symbol.for("react.profiler"),
    M = Symbol.for("react.provider"),
    T = Symbol.for("react.context"),
    P = Symbol.for("react.forward_ref"),
    R = Symbol.for("react.suspense"),
    j = Symbol.for("react.suspense_list"),
    B = Symbol.for("react.memo"),
    F = Symbol.for("react.lazy"),
    N = Symbol.for("react.offscreen"),
    G = Symbol.iterator;
  function z(ee) {
    return ee === null || typeof ee != "object" ? null : (ee = G && ee[G] || ee["@@iterator"], typeof ee == "function" ? ee : null);
  }
  var V = Object.assign,
    O;
  function L(ee) {
    if (O === void 0) try {
      throw Error();
    } catch (Pe) {
      var se = Pe.stack.trim().match(/\n( *(at )?)/);
      O = se && se[1] || "";
    }
    return `
` + O + ee;
  }
  var D = !1;
  function U(ee, se) {
    if (!ee || D) return "";
    D = !0;
    var Pe = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (se) {
        if (se = function () {
          throw Error();
        }, Object.defineProperty(se.prototype, "props", {
          set: function () {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(se, []);
          } catch (ti) {
            var ot = ti;
          }
          Reflect.construct(ee, [], se);
        } else {
          try {
            se.call();
          } catch (ti) {
            ot = ti;
          }
          ee.call(se.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (ti) {
          ot = ti;
        }
        ee();
      }
    } catch (ti) {
      if (ti && ot && typeof ti.stack == "string") {
        for (var Nt = ti.stack.split(`
`), mn = ot.stack.split(`
`), hr = Nt.length - 1, ra = mn.length - 1; 1 <= hr && 0 <= ra && Nt[hr] !== mn[ra];) ra--;
        for (; 1 <= hr && 0 <= ra; hr--, ra--) if (Nt[hr] !== mn[ra]) {
          if (hr !== 1 || ra !== 1) do if (hr--, ra--, 0 > ra || Nt[hr] !== mn[ra]) {
            var ka = `
` + Nt[hr].replace(" at new ", " at ");
            return ee.displayName && ka.includes("<anonymous>") && (ka = ka.replace("<anonymous>", ee.displayName)), ka;
          } while (1 <= hr && 0 <= ra);
          break;
        }
      }
    } finally {
      D = !1, Error.prepareStackTrace = Pe;
    }
    return (ee = ee ? ee.displayName || ee.name : "") ? L(ee) : "";
  }
  function H(ee) {
    switch (ee.tag) {
      case 5:
        return L(ee.type);
      case 16:
        return L("Lazy");
      case 13:
        return L("Suspense");
      case 19:
        return L("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ee = U(ee.type, !1), ee;
      case 11:
        return ee = U(ee.type.render, !1), ee;
      case 1:
        return ee = U(ee.type, !0), ee;
      default:
        return "";
    }
  }
  function Y(ee) {
    if (ee == null) return null;
    if (typeof ee == "function") return ee.displayName || ee.name || null;
    if (typeof ee == "string") return ee;
    switch (ee) {
      case C:
        return "Fragment";
      case S:
        return "Portal";
      case E:
        return "Profiler";
      case I:
        return "StrictMode";
      case R:
        return "Suspense";
      case j:
        return "SuspenseList";
    }
    if (typeof ee == "object") switch (ee.$$typeof) {
      case T:
        return (ee.displayName || "Context") + ".Consumer";
      case M:
        return (ee._context.displayName || "Context") + ".Provider";
      case P:
        var se = ee.render;
        return ee = ee.displayName, ee || (ee = se.displayName || se.name || "", ee = ee !== "" ? "ForwardRef(" + ee + ")" : "ForwardRef"), ee;
      case B:
        return se = ee.displayName || null, se !== null ? se : Y(ee.type) || "Memo";
      case F:
        se = ee._payload, ee = ee._init;
        try {
          return Y(ee(se));
        } catch {}
    }
    return null;
  }
  function K(ee) {
    var se = ee.type;
    switch (ee.tag) {
      case 24:
        return "Cache";
      case 9:
        return (se.displayName || "Context") + ".Consumer";
      case 10:
        return (se._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return ee = se.render, ee = ee.displayName || ee.name || "", se.displayName || (ee !== "" ? "ForwardRef(" + ee + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return se;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Y(se);
      case 8:
        return se === I ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof se == "function") return se.displayName || se.name || null;
        if (typeof se == "string") return se;
    }
    return null;
  }
  function W(ee) {
    switch (typeof ee) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return ee;
      case "object":
        return ee;
      default:
        return "";
    }
  }
  function Q(ee) {
    var se = ee.type;
    return (ee = ee.nodeName) && ee.toLowerCase() === "input" && (se === "checkbox" || se === "radio");
  }
  function q(ee) {
    var se = Q(ee) ? "checked" : "value",
      Pe = Object.getOwnPropertyDescriptor(ee.constructor.prototype, se),
      ot = "" + ee[se];
    if (!ee.hasOwnProperty(se) && typeof Pe < "u" && typeof Pe.get == "function" && typeof Pe.set == "function") {
      var Nt = Pe.get,
        mn = Pe.set;
      return Object.defineProperty(ee, se, {
        configurable: !0,
        get: function () {
          return Nt.call(this);
        },
        set: function (hr) {
          ot = "" + hr, mn.call(this, hr);
        }
      }), Object.defineProperty(ee, se, {
        enumerable: Pe.enumerable
      }), {
        getValue: function () {
          return ot;
        },
        setValue: function (hr) {
          ot = "" + hr;
        },
        stopTracking: function () {
          ee._valueTracker = null, delete ee[se];
        }
      };
    }
  }
  function ne(ee) {
    ee._valueTracker || (ee._valueTracker = q(ee));
  }
  function de(ee) {
    if (!ee) return !1;
    var se = ee._valueTracker;
    if (!se) return !0;
    var Pe = se.getValue(),
      ot = "";
    return ee && (ot = Q(ee) ? ee.checked ? "true" : "false" : ee.value), ee = ot, ee !== Pe ? (se.setValue(ee), !0) : !1;
  }
  function le(ee) {
    if (ee = ee || (typeof document < "u" ? document : void 0), typeof ee > "u") return null;
    try {
      return ee.activeElement || ee.body;
    } catch {
      return ee.body;
    }
  }
  function J(ee, se) {
    var Pe = se.checked;
    return V({}, se, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: Pe ?? ee._wrapperState.initialChecked
    });
  }
  function pe(ee, se) {
    var Pe = se.defaultValue == null ? "" : se.defaultValue,
      ot = se.checked != null ? se.checked : se.defaultChecked;
    Pe = W(se.value != null ? se.value : Pe), ee._wrapperState = {
      initialChecked: ot,
      initialValue: Pe,
      controlled: se.type === "checkbox" || se.type === "radio" ? se.checked != null : se.value != null
    };
  }
  function ce(ee, se) {
    se = se.checked, se != null && w(ee, "checked", se, !1);
  }
  function we(ee, se) {
    ce(ee, se);
    var Pe = W(se.value),
      ot = se.type;
    if (Pe != null) ot === "number" ? (Pe === 0 && ee.value === "" || ee.value != Pe) && (ee.value = "" + Pe) : ee.value !== "" + Pe && (ee.value = "" + Pe);else if (ot === "submit" || ot === "reset") {
      ee.removeAttribute("value");
      return;
    }
    se.hasOwnProperty("value") ? Z(ee, se.type, Pe) : se.hasOwnProperty("defaultValue") && Z(ee, se.type, W(se.defaultValue)), se.checked == null && se.defaultChecked != null && (ee.defaultChecked = !!se.defaultChecked);
  }
  function X(ee, se, Pe) {
    if (se.hasOwnProperty("value") || se.hasOwnProperty("defaultValue")) {
      var ot = se.type;
      if (!(ot !== "submit" && ot !== "reset" || se.value !== void 0 && se.value !== null)) return;
      se = "" + ee._wrapperState.initialValue, Pe || se === ee.value || (ee.value = se), ee.defaultValue = se;
    }
    Pe = ee.name, Pe !== "" && (ee.name = ""), ee.defaultChecked = !!ee._wrapperState.initialChecked, Pe !== "" && (ee.name = Pe);
  }
  function Z(ee, se, Pe) {
    (se !== "number" || le(ee.ownerDocument) !== ee) && (Pe == null ? ee.defaultValue = "" + ee._wrapperState.initialValue : ee.defaultValue !== "" + Pe && (ee.defaultValue = "" + Pe));
  }
  var re = Array.isArray;
  function fe(ee, se, Pe, ot) {
    if (ee = ee.options, se) {
      se = {};
      for (var Nt = 0; Nt < Pe.length; Nt++) se["$" + Pe[Nt]] = !0;
      for (Pe = 0; Pe < ee.length; Pe++) Nt = se.hasOwnProperty("$" + ee[Pe].value), ee[Pe].selected !== Nt && (ee[Pe].selected = Nt), Nt && ot && (ee[Pe].defaultSelected = !0);
    } else {
      for (Pe = "" + W(Pe), se = null, Nt = 0; Nt < ee.length; Nt++) {
        if (ee[Nt].value === Pe) {
          ee[Nt].selected = !0, ot && (ee[Nt].defaultSelected = !0);
          return;
        }
        se !== null || ee[Nt].disabled || (se = ee[Nt]);
      }
      se !== null && (se.selected = !0);
    }
  }
  function ye(ee, se) {
    if (se.dangerouslySetInnerHTML != null) throw Error(n(91));
    return V({}, se, {
      value: void 0,
      defaultValue: void 0,
      children: "" + ee._wrapperState.initialValue
    });
  }
  function ie(ee, se) {
    var Pe = se.value;
    if (Pe == null) {
      if (Pe = se.children, se = se.defaultValue, Pe != null) {
        if (se != null) throw Error(n(92));
        if (re(Pe)) {
          if (1 < Pe.length) throw Error(n(93));
          Pe = Pe[0];
        }
        se = Pe;
      }
      se == null && (se = ""), Pe = se;
    }
    ee._wrapperState = {
      initialValue: W(Pe)
    };
  }
  function ae(ee, se) {
    var Pe = W(se.value),
      ot = W(se.defaultValue);
    Pe != null && (Pe = "" + Pe, Pe !== ee.value && (ee.value = Pe), se.defaultValue == null && ee.defaultValue !== Pe && (ee.defaultValue = Pe)), ot != null && (ee.defaultValue = "" + ot);
  }
  function be(ee) {
    var se = ee.textContent;
    se === ee._wrapperState.initialValue && se !== "" && se !== null && (ee.value = se);
  }
  function Ee(ee) {
    switch (ee) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function xe(ee, se) {
    return ee == null || ee === "http://www.w3.org/1999/xhtml" ? Ee(se) : ee === "http://www.w3.org/2000/svg" && se === "foreignObject" ? "http://www.w3.org/1999/xhtml" : ee;
  }
  var he,
    ue = (function (ee) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function (se, Pe, ot, Nt) {
        MSApp.execUnsafeLocalFunction(function () {
          return ee(se, Pe, ot, Nt);
        });
      } : ee;
    })(function (ee, se) {
      if (ee.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in ee) ee.innerHTML = se;else {
        for (he = he || document.createElement("div"), he.innerHTML = "<svg>" + se.valueOf().toString() + "</svg>", se = he.firstChild; ee.firstChild;) ee.removeChild(ee.firstChild);
        for (; se.firstChild;) ee.appendChild(se.firstChild);
      }
    });
  function ge(ee, se) {
    if (se) {
      var Pe = ee.firstChild;
      if (Pe && Pe === ee.lastChild && Pe.nodeType === 3) {
        Pe.nodeValue = se;
        return;
      }
    }
    ee.textContent = se;
  }
  var _e = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    },
    ke = ["Webkit", "ms", "Moz", "O"];
  Object.keys(_e).forEach(function (ee) {
    ke.forEach(function (se) {
      se = se + ee.charAt(0).toUpperCase() + ee.substring(1), _e[se] = _e[ee];
    });
  });
  function ve(ee, se, Pe) {
    return se == null || typeof se == "boolean" || se === "" ? "" : Pe || typeof se != "number" || se === 0 || _e.hasOwnProperty(ee) && _e[ee] ? ("" + se).trim() : se + "px";
  }
  function Te(ee, se) {
    ee = ee.style;
    for (var Pe in se) if (se.hasOwnProperty(Pe)) {
      var ot = Pe.indexOf("--") === 0,
        Nt = ve(Pe, se[Pe], ot);
      Pe === "float" && (Pe = "cssFloat"), ot ? ee.setProperty(Pe, Nt) : ee[Pe] = Nt;
    }
  }
  var Ne = V({
    menuitem: !0
  }, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  });
  function me(ee, se) {
    if (se) {
      if (Ne[ee] && (se.children != null || se.dangerouslySetInnerHTML != null)) throw Error(n(137, ee));
      if (se.dangerouslySetInnerHTML != null) {
        if (se.children != null) throw Error(n(60));
        if (typeof se.dangerouslySetInnerHTML != "object" || !("__html" in se.dangerouslySetInnerHTML)) throw Error(n(61));
      }
      if (se.style != null && typeof se.style != "object") throw Error(n(62));
    }
  }
  function Ae(ee, se) {
    if (ee.indexOf("-") === -1) return typeof se.is == "string";
    switch (ee) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Fe = null;
  function Me(ee) {
    return ee = ee.target || ee.srcElement || window, ee.correspondingUseElement && (ee = ee.correspondingUseElement), ee.nodeType === 3 ? ee.parentNode : ee;
  }
  var Re = null,
    $e = null,
    rt = null;
  function nt(ee) {
    if (ee = wu(ee)) {
      if (typeof Re != "function") throw Error(n(280));
      var se = ee.stateNode;
      se && (se = xg(se), Re(ee.stateNode, ee.type, se));
    }
  }
  function ze(ee) {
    $e ? rt ? rt.push(ee) : rt = [ee] : $e = ee;
  }
  function Le() {
    if ($e) {
      var ee = $e,
        se = rt;
      if (rt = $e = null, nt(ee), se) for (ee = 0; ee < se.length; ee++) nt(se[ee]);
    }
  }
  function Ke(ee, se) {
    return ee(se);
  }
  function Xe() {}
  var De = !1;
  function Ye(ee, se, Pe) {
    if (De) return ee(se, Pe);
    De = !0;
    try {
      return Ke(ee, se, Pe);
    } finally {
      De = !1, ($e !== null || rt !== null) && (Xe(), Le());
    }
  }
  function Ce(ee, se) {
    var Pe = ee.stateNode;
    if (Pe === null) return null;
    var ot = xg(Pe);
    if (ot === null) return null;
    Pe = ot[se];
    e: switch (se) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (ot = !ot.disabled) || (ee = ee.type, ot = !(ee === "button" || ee === "input" || ee === "select" || ee === "textarea")), ee = !ot;
        break e;
      default:
        ee = !1;
    }
    if (ee) return null;
    if (Pe && typeof Pe != "function") throw Error(n(231, se, typeof Pe));
    return Pe;
  }
  var He = !1;
  if (s) try {
    var Ve = {};
    Object.defineProperty(Ve, "passive", {
      get: function () {
        He = !0;
      }
    }), window.addEventListener("test", Ve, Ve), window.removeEventListener("test", Ve, Ve);
  } catch {
    He = !1;
  }
  function it(ee, se, Pe, ot, Nt, mn, hr, ra, ka) {
    var ti = Array.prototype.slice.call(arguments, 3);
    try {
      se.apply(Pe, ti);
    } catch (Li) {
      this.onError(Li);
    }
  }
  var It = !1,
    Ft = null,
    We = !1,
    Ze = null,
    Ge = {
      onError: function (ee) {
        It = !0, Ft = ee;
      }
    };
  function Oe(ee, se, Pe, ot, Nt, mn, hr, ra, ka) {
    It = !1, Ft = null, it.apply(Ge, arguments);
  }
  function st(ee, se, Pe, ot, Nt, mn, hr, ra, ka) {
    if (Oe.apply(this, arguments), It) {
      if (It) {
        var ti = Ft;
        It = !1, Ft = null;
      } else throw Error(n(198));
      We || (We = !0, Ze = ti);
    }
  }
  function vt(ee) {
    var se = ee,
      Pe = ee;
    if (ee.alternate) for (; se.return;) se = se.return;else {
      ee = se;
      do se = ee, (se.flags & 4098) !== 0 && (Pe = se.return), ee = se.return; while (ee);
    }
    return se.tag === 3 ? Pe : null;
  }
  function Ht(ee) {
    if (ee.tag === 13) {
      var se = ee.memoizedState;
      if (se === null && (ee = ee.alternate, ee !== null && (se = ee.memoizedState)), se !== null) return se.dehydrated;
    }
    return null;
  }
  function nn(ee) {
    if (vt(ee) !== ee) throw Error(n(188));
  }
  function pt(ee) {
    var se = ee.alternate;
    if (!se) {
      if (se = vt(ee), se === null) throw Error(n(188));
      return se !== ee ? null : ee;
    }
    for (var Pe = ee, ot = se;;) {
      var Nt = Pe.return;
      if (Nt === null) break;
      var mn = Nt.alternate;
      if (mn === null) {
        if (ot = Nt.return, ot !== null) {
          Pe = ot;
          continue;
        }
        break;
      }
      if (Nt.child === mn.child) {
        for (mn = Nt.child; mn;) {
          if (mn === Pe) return nn(Nt), ee;
          if (mn === ot) return nn(Nt), se;
          mn = mn.sibling;
        }
        throw Error(n(188));
      }
      if (Pe.return !== ot.return) Pe = Nt, ot = mn;else {
        for (var hr = !1, ra = Nt.child; ra;) {
          if (ra === Pe) {
            hr = !0, Pe = Nt, ot = mn;
            break;
          }
          if (ra === ot) {
            hr = !0, ot = Nt, Pe = mn;
            break;
          }
          ra = ra.sibling;
        }
        if (!hr) {
          for (ra = mn.child; ra;) {
            if (ra === Pe) {
              hr = !0, Pe = mn, ot = Nt;
              break;
            }
            if (ra === ot) {
              hr = !0, ot = mn, Pe = Nt;
              break;
            }
            ra = ra.sibling;
          }
          if (!hr) throw Error(n(189));
        }
      }
      if (Pe.alternate !== ot) throw Error(n(190));
    }
    if (Pe.tag !== 3) throw Error(n(188));
    return Pe.stateNode.current === Pe ? ee : se;
  }
  function lt(ee) {
    return ee = pt(ee), ee !== null ? gt(ee) : null;
  }
  function gt(ee) {
    if (ee.tag === 5 || ee.tag === 6) return ee;
    for (ee = ee.child; ee !== null;) {
      var se = gt(ee);
      if (se !== null) return se;
      ee = ee.sibling;
    }
    return null;
  }
  var Ut = t.unstable_scheduleCallback,
    _t = t.unstable_cancelCallback,
    At = t.unstable_shouldYield,
    Yt = t.unstable_requestPaint,
    qe = t.unstable_now,
    kt = t.unstable_getCurrentPriorityLevel,
    St = t.unstable_ImmediatePriority,
    hn = t.unstable_UserBlockingPriority,
    Qt = t.unstable_NormalPriority,
    Ot = t.unstable_LowPriority,
    ln = t.unstable_IdlePriority,
    Pn = null,
    rn = null;
  function Yn(ee) {
    if (rn && typeof rn.onCommitFiberRoot == "function") try {
      rn.onCommitFiberRoot(Pn, ee, void 0, (ee.current.flags & 128) === 128);
    } catch {}
  }
  var Ct = Math.clz32 ? Math.clz32 : Jn,
    Cn = Math.log,
    un = Math.LN2;
  function Jn(ee) {
    return ee >>>= 0, ee === 0 ? 32 : 31 - (Cn(ee) / un | 0) | 0;
  }
  var Kn = 64,
    en = 4194304;
  function Vn(ee) {
    switch (ee & -ee) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return ee & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return ee & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return ee;
    }
  }
  function Tt(ee, se) {
    var Pe = ee.pendingLanes;
    if (Pe === 0) return 0;
    var ot = 0,
      Nt = ee.suspendedLanes,
      mn = ee.pingedLanes,
      hr = Pe & 268435455;
    if (hr !== 0) {
      var ra = hr & ~Nt;
      ra !== 0 ? ot = Vn(ra) : (mn &= hr, mn !== 0 && (ot = Vn(mn)));
    } else hr = Pe & ~Nt, hr !== 0 ? ot = Vn(hr) : mn !== 0 && (ot = Vn(mn));
    if (ot === 0) return 0;
    if (se !== 0 && se !== ot && (se & Nt) === 0 && (Nt = ot & -ot, mn = se & -se, Nt >= mn || Nt === 16 && (mn & 4194240) !== 0)) return se;
    if ((ot & 4) !== 0 && (ot |= Pe & 16), se = ee.entangledLanes, se !== 0) for (ee = ee.entanglements, se &= ot; 0 < se;) Pe = 31 - Ct(se), Nt = 1 << Pe, ot |= ee[Pe], se &= ~Nt;
    return ot;
  }
  function Ue(ee, se) {
    switch (ee) {
      case 1:
      case 2:
      case 4:
        return se + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return se + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function et(ee, se) {
    for (var Pe = ee.suspendedLanes, ot = ee.pingedLanes, Nt = ee.expirationTimes, mn = ee.pendingLanes; 0 < mn;) {
      var hr = 31 - Ct(mn),
        ra = 1 << hr,
        ka = Nt[hr];
      ka === -1 ? ((ra & Pe) === 0 || (ra & ot) !== 0) && (Nt[hr] = Ue(ra, se)) : ka <= se && (ee.expiredLanes |= ra), mn &= ~ra;
    }
  }
  function ft(ee) {
    return ee = ee.pendingLanes & -1073741825, ee !== 0 ? ee : ee & 1073741824 ? 1073741824 : 0;
  }
  function ht() {
    var ee = Kn;
    return Kn <<= 1, (Kn & 4194240) === 0 && (Kn = 64), ee;
  }
  function wt(ee) {
    for (var se = [], Pe = 0; 31 > Pe; Pe++) se.push(ee);
    return se;
  }
  function jt(ee, se, Pe) {
    ee.pendingLanes |= se, se !== 536870912 && (ee.suspendedLanes = 0, ee.pingedLanes = 0), ee = ee.eventTimes, se = 31 - Ct(se), ee[se] = Pe;
  }
  function bt(ee, se) {
    var Pe = ee.pendingLanes & ~se;
    ee.pendingLanes = se, ee.suspendedLanes = 0, ee.pingedLanes = 0, ee.expiredLanes &= se, ee.mutableReadLanes &= se, ee.entangledLanes &= se, se = ee.entanglements;
    var ot = ee.eventTimes;
    for (ee = ee.expirationTimes; 0 < Pe;) {
      var Nt = 31 - Ct(Pe),
        mn = 1 << Nt;
      se[Nt] = 0, ot[Nt] = -1, ee[Nt] = -1, Pe &= ~mn;
    }
  }
  function Bt(ee, se) {
    var Pe = ee.entangledLanes |= se;
    for (ee = ee.entanglements; Pe;) {
      var ot = 31 - Ct(Pe),
        Nt = 1 << ot;
      Nt & se | ee[ot] & se && (ee[ot] |= se), Pe &= ~Nt;
    }
  }
  var wn = 0;
  function at(ee) {
    return ee &= -ee, 1 < ee ? 4 < ee ? (ee & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Pt,
    dt,
    xt,
    yn,
    gn,
    mt = !1,
    Xt = [],
    Gn = null,
    rr = null,
    qn = null,
    Dn = new Map(),
    Ar = new Map(),
    _r = [],
    Pa = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function fa(ee, se) {
    switch (ee) {
      case "focusin":
      case "focusout":
        Gn = null;
        break;
      case "dragenter":
      case "dragleave":
        rr = null;
        break;
      case "mouseover":
      case "mouseout":
        qn = null;
        break;
      case "pointerover":
      case "pointerout":
        Dn.delete(se.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ar.delete(se.pointerId);
    }
  }
  function Ca(ee, se, Pe, ot, Nt, mn) {
    return ee === null || ee.nativeEvent !== mn ? (ee = {
      blockedOn: se,
      domEventName: Pe,
      eventSystemFlags: ot,
      nativeEvent: mn,
      targetContainers: [Nt]
    }, se !== null && (se = wu(se), se !== null && dt(se)), ee) : (ee.eventSystemFlags |= ot, se = ee.targetContainers, Nt !== null && se.indexOf(Nt) === -1 && se.push(Nt), ee);
  }
  function $n(ee, se, Pe, ot, Nt) {
    switch (se) {
      case "focusin":
        return Gn = Ca(Gn, ee, se, Pe, ot, Nt), !0;
      case "dragenter":
        return rr = Ca(rr, ee, se, Pe, ot, Nt), !0;
      case "mouseover":
        return qn = Ca(qn, ee, se, Pe, ot, Nt), !0;
      case "pointerover":
        var mn = Nt.pointerId;
        return Dn.set(mn, Ca(Dn.get(mn) || null, ee, se, Pe, ot, Nt)), !0;
      case "gotpointercapture":
        return mn = Nt.pointerId, Ar.set(mn, Ca(Ar.get(mn) || null, ee, se, Pe, ot, Nt)), !0;
    }
    return !1;
  }
  function yr(ee) {
    var se = vu(ee.target);
    if (se !== null) {
      var Pe = vt(se);
      if (Pe !== null) {
        if (se = Pe.tag, se === 13) {
          if (se = Ht(Pe), se !== null) {
            ee.blockedOn = se, gn(ee.priority, function () {
              xt(Pe);
            });
            return;
          }
        } else if (se === 3 && Pe.stateNode.current.memoizedState.isDehydrated) {
          ee.blockedOn = Pe.tag === 3 ? Pe.stateNode.containerInfo : null;
          return;
        }
      }
    }
    ee.blockedOn = null;
  }
  function Ir(ee) {
    if (ee.blockedOn !== null) return !1;
    for (var se = ee.targetContainers; 0 < se.length;) {
      var Pe = ta(ee.domEventName, ee.eventSystemFlags, se[0], ee.nativeEvent);
      if (Pe === null) {
        Pe = ee.nativeEvent;
        var ot = new Pe.constructor(Pe.type, Pe);
        Fe = ot, Pe.target.dispatchEvent(ot), Fe = null;
      } else return se = wu(Pe), se !== null && dt(se), ee.blockedOn = Pe, !1;
      se.shift();
    }
    return !0;
  }
  function Gr(ee, se, Pe) {
    Ir(ee) && Pe.delete(se);
  }
  function Zr() {
    mt = !1, Gn !== null && Ir(Gn) && (Gn = null), rr !== null && Ir(rr) && (rr = null), qn !== null && Ir(qn) && (qn = null), Dn.forEach(Gr), Ar.forEach(Gr);
  }
  function La(ee, se) {
    ee.blockedOn === se && (ee.blockedOn = null, mt || (mt = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Zr)));
  }
  function sa(ee) {
    function se(Nt) {
      return La(Nt, ee);
    }
    if (0 < Xt.length) {
      La(Xt[0], ee);
      for (var Pe = 1; Pe < Xt.length; Pe++) {
        var ot = Xt[Pe];
        ot.blockedOn === ee && (ot.blockedOn = null);
      }
    }
    for (Gn !== null && La(Gn, ee), rr !== null && La(rr, ee), qn !== null && La(qn, ee), Dn.forEach(se), Ar.forEach(se), Pe = 0; Pe < _r.length; Pe++) ot = _r[Pe], ot.blockedOn === ee && (ot.blockedOn = null);
    for (; 0 < _r.length && (Pe = _r[0], Pe.blockedOn === null);) yr(Pe), Pe.blockedOn === null && _r.shift();
  }
  var Ea = k.ReactCurrentBatchConfig,
    ba = !0;
  function ga(ee, se, Pe, ot) {
    var Nt = wn,
      mn = Ea.transition;
    Ea.transition = null;
    try {
      wn = 1, $a(ee, se, Pe, ot);
    } finally {
      wn = Nt, Ea.transition = mn;
    }
  }
  function _a(ee, se, Pe, ot) {
    var Nt = wn,
      mn = Ea.transition;
    Ea.transition = null;
    try {
      wn = 4, $a(ee, se, Pe, ot);
    } finally {
      wn = Nt, Ea.transition = mn;
    }
  }
  function $a(ee, se, Pe, ot) {
    if (ba) {
      var Nt = ta(ee, se, Pe, ot);
      if (Nt === null) Ho(ee, se, ot, Ya, Pe), fa(ee, ot);else if ($n(Nt, ee, se, Pe, ot)) ot.stopPropagation();else if (fa(ee, ot), se & 4 && -1 < Pa.indexOf(ee)) {
        for (; Nt !== null;) {
          var mn = wu(Nt);
          if (mn !== null && Pt(mn), mn = ta(ee, se, Pe, ot), mn === null && Ho(ee, se, ot, Ya, Pe), mn === Nt) break;
          Nt = mn;
        }
        Nt !== null && ot.stopPropagation();
      } else Ho(ee, se, ot, null, Pe);
    }
  }
  var Ya = null;
  function ta(ee, se, Pe, ot) {
    if (Ya = null, ee = Me(ot), ee = vu(ee), ee !== null) if (se = vt(ee), se === null) ee = null;else if (Pe = se.tag, Pe === 13) {
      if (ee = Ht(se), ee !== null) return ee;
      ee = null;
    } else if (Pe === 3) {
      if (se.stateNode.current.memoizedState.isDehydrated) return se.tag === 3 ? se.stateNode.containerInfo : null;
      ee = null;
    } else se !== ee && (ee = null);
    return Ya = ee, null;
  }
  function ki(ee) {
    switch (ee) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (kt()) {
          case St:
            return 1;
          case hn:
            return 4;
          case Qt:
          case Ot:
            return 16;
          case ln:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Wn = null,
    wr = null,
    jn = null;
  function _n() {
    if (jn) return jn;
    var ee,
      se = wr,
      Pe = se.length,
      ot,
      Nt = "value" in Wn ? Wn.value : Wn.textContent,
      mn = Nt.length;
    for (ee = 0; ee < Pe && se[ee] === Nt[ee]; ee++);
    var hr = Pe - ee;
    for (ot = 1; ot <= hr && se[Pe - ot] === Nt[mn - ot]; ot++);
    return jn = Nt.slice(ee, 1 < ot ? 1 - ot : void 0);
  }
  function ar(ee) {
    var se = ee.keyCode;
    return "charCode" in ee ? (ee = ee.charCode, ee === 0 && se === 13 && (ee = 13)) : ee = se, ee === 10 && (ee = 13), 32 <= ee || ee === 13 ? ee : 0;
  }
  function Vt() {
    return !0;
  }
  function vn() {
    return !1;
  }
  function An(ee) {
    function se(Pe, ot, Nt, mn, hr) {
      this._reactName = Pe, this._targetInst = Nt, this.type = ot, this.nativeEvent = mn, this.target = hr, this.currentTarget = null;
      for (var ra in ee) ee.hasOwnProperty(ra) && (Pe = ee[ra], this[ra] = Pe ? Pe(mn) : mn[ra]);
      return this.isDefaultPrevented = (mn.defaultPrevented != null ? mn.defaultPrevented : mn.returnValue === !1) ? Vt : vn, this.isPropagationStopped = vn, this;
    }
    return V(se.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var Pe = this.nativeEvent;
        Pe && (Pe.preventDefault ? Pe.preventDefault() : typeof Pe.returnValue != "unknown" && (Pe.returnValue = !1), this.isDefaultPrevented = Vt);
      },
      stopPropagation: function () {
        var Pe = this.nativeEvent;
        Pe && (Pe.stopPropagation ? Pe.stopPropagation() : typeof Pe.cancelBubble != "unknown" && (Pe.cancelBubble = !0), this.isPropagationStopped = Vt);
      },
      persist: function () {},
      isPersistent: Vt
    }), se;
  }
  var ur = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (ee) {
        return ee.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    },
    zr = An(ur),
    Dr = V({}, ur, {
      view: 0,
      detail: 0
    }),
    Wr = An(Dr),
    gr,
    jr,
    ea,
    pa = V({}, Dr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Mr,
      button: 0,
      buttons: 0,
      relatedTarget: function (ee) {
        return ee.relatedTarget === void 0 ? ee.fromElement === ee.srcElement ? ee.toElement : ee.fromElement : ee.relatedTarget;
      },
      movementX: function (ee) {
        return "movementX" in ee ? ee.movementX : (ee !== ea && (ea && ee.type === "mousemove" ? (gr = ee.screenX - ea.screenX, jr = ee.screenY - ea.screenY) : jr = gr = 0, ea = ee), gr);
      },
      movementY: function (ee) {
        return "movementY" in ee ? ee.movementY : jr;
      }
    }),
    Br = An(pa),
    tn = V({}, pa, {
      dataTransfer: 0
    }),
    Lr = An(tn),
    br = V({}, Dr, {
      relatedTarget: 0
    }),
    Jr = An(br),
    Kr = V({}, ur, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }),
    ir = An(Kr),
    Hr = V({}, ur, {
      clipboardData: function (ee) {
        return "clipboardData" in ee ? ee.clipboardData : window.clipboardData;
      }
    }),
    ha = An(Hr),
    Ga = V({}, ur, {
      data: 0
    }),
    Za = An(Ga),
    va = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    },
    Kt = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    },
    Pr = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
  function kr(ee) {
    var se = this.nativeEvent;
    return se.getModifierState ? se.getModifierState(ee) : (ee = Pr[ee]) ? !!se[ee] : !1;
  }
  function Mr() {
    return kr;
  }
  var Hn = V({}, Dr, {
      key: function (ee) {
        if (ee.key) {
          var se = va[ee.key] || ee.key;
          if (se !== "Unidentified") return se;
        }
        return ee.type === "keypress" ? (ee = ar(ee), ee === 13 ? "Enter" : String.fromCharCode(ee)) : ee.type === "keydown" || ee.type === "keyup" ? Kt[ee.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Mr,
      charCode: function (ee) {
        return ee.type === "keypress" ? ar(ee) : 0;
      },
      keyCode: function (ee) {
        return ee.type === "keydown" || ee.type === "keyup" ? ee.keyCode : 0;
      },
      which: function (ee) {
        return ee.type === "keypress" ? ar(ee) : ee.type === "keydown" || ee.type === "keyup" ? ee.keyCode : 0;
      }
    }),
    $t = An(Hn),
    je = V({}, pa, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }),
    Qe = An(je),
    Mt = V({}, Dr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Mr
    }),
    cn = An(Mt),
    Qn = V({}, ur, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }),
    Lt = An(Qn),
    ct = V({}, pa, {
      deltaX: function (ee) {
        return "deltaX" in ee ? ee.deltaX : "wheelDeltaX" in ee ? -ee.wheelDeltaX : 0;
      },
      deltaY: function (ee) {
        return "deltaY" in ee ? ee.deltaY : "wheelDeltaY" in ee ? -ee.wheelDeltaY : "wheelDelta" in ee ? -ee.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }),
    Dt = An(ct),
    bn = [9, 13, 27, 32],
    Rt = s && "CompositionEvent" in window,
    fn = null;
  s && "documentMode" in document && (fn = document.documentMode);
  var Zt = s && "TextEvent" in window && !fn,
    Ln = s && (!Rt || fn && 8 < fn && 11 >= fn),
    tt = " ",
    zt = !1;
  function an(ee, se) {
    switch (ee) {
      case "keyup":
        return bn.indexOf(se.keyCode) !== -1;
      case "keydown":
        return se.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Rn(ee) {
    return ee = ee.detail, typeof ee == "object" && "data" in ee ? ee.data : null;
  }
  var Un = !1;
  function er(ee, se) {
    switch (ee) {
      case "compositionend":
        return Rn(se);
      case "keypress":
        return se.which !== 32 ? null : (zt = !0, tt);
      case "textInput":
        return ee = se.data, ee === tt && zt ? null : ee;
      default:
        return null;
    }
  }
  function Cr(ee, se) {
    if (Un) return ee === "compositionend" || !Rt && an(ee, se) ? (ee = _n(), jn = wr = Wn = null, Un = !1, ee) : null;
    switch (ee) {
      case "paste":
        return null;
      case "keypress":
        if (!(se.ctrlKey || se.altKey || se.metaKey) || se.ctrlKey && se.altKey) {
          if (se.char && 1 < se.char.length) return se.char;
          if (se.which) return String.fromCharCode(se.which);
        }
        return null;
      case "compositionend":
        return Ln && se.locale !== "ko" ? null : se.data;
      default:
        return null;
    }
  }
  var tr = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function kn(ee) {
    var se = ee && ee.nodeName && ee.nodeName.toLowerCase();
    return se === "input" ? !!tr[ee.type] : se === "textarea";
  }
  function xn(ee, se, Pe, ot) {
    ze(ot), se = Ls(se, "onChange"), 0 < se.length && (Pe = new zr("onChange", "change", null, Pe, ot), ee.push({
      event: Pe,
      listeners: se
    }));
  }
  var Fn = null,
    cr = null;
  function vr(ee) {
    la(ee, 0);
  }
  function Wt(ee) {
    var se = Df(ee);
    if (de(se)) return ee;
  }
  function Jt(ee, se) {
    if (ee === "change") return se;
  }
  var Nn = !1;
  if (s) {
    var En;
    if (s) {
      var Zn = "oninput" in document;
      if (!Zn) {
        var Sr = document.createElement("div");
        Sr.setAttribute("oninput", "return;"), Zn = typeof Sr.oninput == "function";
      }
      En = Zn;
    } else En = !1;
    Nn = En && (!document.documentMode || 9 < document.documentMode);
  }
  function Bn() {
    Fn && (Fn.detachEvent("onpropertychange", Et), cr = Fn = null);
  }
  function Et(ee) {
    if (ee.propertyName === "value" && Wt(cr)) {
      var se = [];
      xn(se, cr, ee, Me(ee)), Ye(vr, se);
    }
  }
  function zn(ee, se, Pe) {
    ee === "focusin" ? (Bn(), Fn = se, cr = Pe, Fn.attachEvent("onpropertychange", Et)) : ee === "focusout" && Bn();
  }
  function Mn(ee) {
    if (ee === "selectionchange" || ee === "keyup" || ee === "keydown") return Wt(cr);
  }
  function or(ee, se) {
    if (ee === "click") return Wt(se);
  }
  function mr(ee, se) {
    if (ee === "input" || ee === "change") return Wt(se);
  }
  function Yr(ee, se) {
    return ee === se && (ee !== 0 || 1 / ee === 1 / se) || ee !== ee && se !== se;
  }
  var aa = typeof Object.is == "function" ? Object.is : Yr;
  function wa(ee, se) {
    if (aa(ee, se)) return !0;
    if (typeof ee != "object" || ee === null || typeof se != "object" || se === null) return !1;
    var Pe = Object.keys(ee),
      ot = Object.keys(se);
    if (Pe.length !== ot.length) return !1;
    for (ot = 0; ot < Pe.length; ot++) {
      var Nt = Pe[ot];
      if (!l.call(se, Nt) || !aa(ee[Nt], se[Nt])) return !1;
    }
    return !0;
  }
  function xa(ee) {
    for (; ee && ee.firstChild;) ee = ee.firstChild;
    return ee;
  }
  function Aa(ee, se) {
    var Pe = xa(ee);
    ee = 0;
    for (var ot; Pe;) {
      if (Pe.nodeType === 3) {
        if (ot = ee + Pe.textContent.length, ee <= se && ot >= se) return {
          node: Pe,
          offset: se - ee
        };
        ee = ot;
      }
      e: {
        for (; Pe;) {
          if (Pe.nextSibling) {
            Pe = Pe.nextSibling;
            break e;
          }
          Pe = Pe.parentNode;
        }
        Pe = void 0;
      }
      Pe = xa(Pe);
    }
  }
  function pn(ee, se) {
    return ee && se ? ee === se ? !0 : ee && ee.nodeType === 3 ? !1 : se && se.nodeType === 3 ? pn(ee, se.parentNode) : "contains" in ee ? ee.contains(se) : ee.compareDocumentPosition ? !!(ee.compareDocumentPosition(se) & 16) : !1 : !1;
  }
  function xr() {
    for (var ee = window, se = le(); se instanceof ee.HTMLIFrameElement;) {
      try {
        var Pe = typeof se.contentWindow.location.href == "string";
      } catch {
        Pe = !1;
      }
      if (Pe) ee = se.contentWindow;else break;
      se = le(ee.document);
    }
    return se;
  }
  function Nr(ee) {
    var se = ee && ee.nodeName && ee.nodeName.toLowerCase();
    return se && (se === "input" && (ee.type === "text" || ee.type === "search" || ee.type === "tel" || ee.type === "url" || ee.type === "password") || se === "textarea" || ee.contentEditable === "true");
  }
  function qr(ee) {
    var se = xr(),
      Pe = ee.focusedElem,
      ot = ee.selectionRange;
    if (se !== Pe && Pe && Pe.ownerDocument && pn(Pe.ownerDocument.documentElement, Pe)) {
      if (ot !== null && Nr(Pe)) {
        if (se = ot.start, ee = ot.end, ee === void 0 && (ee = se), "selectionStart" in Pe) Pe.selectionStart = se, Pe.selectionEnd = Math.min(ee, Pe.value.length);else if (ee = (se = Pe.ownerDocument || document) && se.defaultView || window, ee.getSelection) {
          ee = ee.getSelection();
          var Nt = Pe.textContent.length,
            mn = Math.min(ot.start, Nt);
          ot = ot.end === void 0 ? mn : Math.min(ot.end, Nt), !ee.extend && mn > ot && (Nt = ot, ot = mn, mn = Nt), Nt = Aa(Pe, mn);
          var hr = Aa(Pe, ot);
          Nt && hr && (ee.rangeCount !== 1 || ee.anchorNode !== Nt.node || ee.anchorOffset !== Nt.offset || ee.focusNode !== hr.node || ee.focusOffset !== hr.offset) && (se = se.createRange(), se.setStart(Nt.node, Nt.offset), ee.removeAllRanges(), mn > ot ? (ee.addRange(se), ee.extend(hr.node, hr.offset)) : (se.setEnd(hr.node, hr.offset), ee.addRange(se)));
        }
      }
      for (se = [], ee = Pe; ee = ee.parentNode;) ee.nodeType === 1 && se.push({
        element: ee,
        left: ee.scrollLeft,
        top: ee.scrollTop
      });
      for (typeof Pe.focus == "function" && Pe.focus(), Pe = 0; Pe < se.length; Pe++) ee = se[Pe], ee.element.scrollLeft = ee.left, ee.element.scrollTop = ee.top;
    }
  }
  var Oa = s && "documentMode" in document && 11 >= document.documentMode,
    Fa = null,
    Ra = null,
    ui = null,
    pr = !1;
  function In(ee, se, Pe) {
    var ot = Pe.window === Pe ? Pe.document : Pe.nodeType === 9 ? Pe : Pe.ownerDocument;
    pr || Fa == null || Fa !== le(ot) || (ot = Fa, "selectionStart" in ot && Nr(ot) ? ot = {
      start: ot.selectionStart,
      end: ot.selectionEnd
    } : (ot = (ot.ownerDocument && ot.ownerDocument.defaultView || window).getSelection(), ot = {
      anchorNode: ot.anchorNode,
      anchorOffset: ot.anchorOffset,
      focusNode: ot.focusNode,
      focusOffset: ot.focusOffset
    }), ui && wa(ui, ot) || (ui = ot, ot = Ls(Ra, "onSelect"), 0 < ot.length && (se = new zr("onSelect", "select", null, se, Pe), ee.push({
      event: se,
      listeners: ot
    }), se.target = Fa)));
  }
  function fr(ee, se) {
    var Pe = {};
    return Pe[ee.toLowerCase()] = se.toLowerCase(), Pe["Webkit" + ee] = "webkit" + se, Pe["Moz" + ee] = "moz" + se, Pe;
  }
  var na = {
      animationend: fr("Animation", "AnimationEnd"),
      animationiteration: fr("Animation", "AnimationIteration"),
      animationstart: fr("Animation", "AnimationStart"),
      transitionend: fr("Transition", "TransitionEnd")
    },
    Ba = {},
    ai = {};
  s && (ai = document.createElement("div").style, "AnimationEvent" in window || (delete na.animationend.animation, delete na.animationiteration.animation, delete na.animationstart.animation), "TransitionEvent" in window || delete na.transitionend.transition);
  function vi(ee) {
    if (Ba[ee]) return Ba[ee];
    if (!na[ee]) return ee;
    var se = na[ee],
      Pe;
    for (Pe in se) if (se.hasOwnProperty(Pe) && Pe in ai) return Ba[ee] = se[Pe];
    return ee;
  }
  var Vi = vi("animationend"),
    Ti = vi("animationiteration"),
    Gi = vi("animationstart"),
    hi = vi("transitionend"),
    vo = new Map(),
    ci = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ji(ee, se) {
    vo.set(ee, se), i(se, [ee]);
  }
  for (var ts = 0; ts < ci.length; ts++) {
    var Ts = ci[ts],
      dc = Ts.toLowerCase(),
      Tl = Ts[0].toUpperCase() + Ts.slice(1);
    ji(dc, "on" + Tl);
  }
  ji(Vi, "onAnimationEnd"), ji(Ti, "onAnimationIteration"), ji(Gi, "onAnimationStart"), ji("dblclick", "onDoubleClick"), ji("focusin", "onFocus"), ji("focusout", "onBlur"), ji(hi, "onTransitionEnd"), o("onMouseEnter", ["mouseout", "mouseover"]), o("onMouseLeave", ["mouseout", "mouseover"]), o("onPointerEnter", ["pointerout", "pointerover"]), o("onPointerLeave", ["pointerout", "pointerover"]), i("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), i("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), i("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), i("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), i("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), i("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Ml = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    sr = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ml));
  function da(ee, se, Pe) {
    var ot = ee.type || "unknown-event";
    ee.currentTarget = Pe, st(ot, se, void 0, ee), ee.currentTarget = null;
  }
  function la(ee, se) {
    se = (se & 4) !== 0;
    for (var Pe = 0; Pe < ee.length; Pe++) {
      var ot = ee[Pe],
        Nt = ot.event;
      ot = ot.listeners;
      e: {
        var mn = void 0;
        if (se) for (var hr = ot.length - 1; 0 <= hr; hr--) {
          var ra = ot[hr],
            ka = ra.instance,
            ti = ra.currentTarget;
          if (ra = ra.listener, ka !== mn && Nt.isPropagationStopped()) break e;
          da(Nt, ra, ti), mn = ka;
        } else for (hr = 0; hr < ot.length; hr++) {
          if (ra = ot[hr], ka = ra.instance, ti = ra.currentTarget, ra = ra.listener, ka !== mn && Nt.isPropagationStopped()) break e;
          da(Nt, ra, ti), mn = ka;
        }
      }
    }
    if (We) throw ee = Ze, We = !1, Ze = null, ee;
  }
  function Ta(ee, se) {
    var Pe = se[fc];
    Pe === void 0 && (Pe = se[fc] = new Set());
    var ot = ee + "__bubble";
    Pe.has(ot) || (to(se, ee, 2, !1), Pe.add(ot));
  }
  function Wa(ee, se, Pe) {
    var ot = 0;
    se && (ot |= 4), to(Pe, ee, ot, se);
  }
  var pi = "_reactListening" + Math.random().toString(36).slice(2);
  function wi(ee) {
    if (!ee[pi]) {
      ee[pi] = !0, r.forEach(function (Pe) {
        Pe !== "selectionchange" && (sr.has(Pe) || Wa(Pe, !1, ee), Wa(Pe, !0, ee));
      });
      var se = ee.nodeType === 9 ? ee : ee.ownerDocument;
      se === null || se[pi] || (se[pi] = !0, Wa("selectionchange", !1, se));
    }
  }
  function to(ee, se, Pe, ot) {
    switch (ki(se)) {
      case 1:
        var Nt = ga;
        break;
      case 4:
        Nt = _a;
        break;
      default:
        Nt = $a;
    }
    Pe = Nt.bind(null, se, Pe, ee), Nt = void 0, !He || se !== "touchstart" && se !== "touchmove" && se !== "wheel" || (Nt = !0), ot ? Nt !== void 0 ? ee.addEventListener(se, Pe, {
      capture: !0,
      passive: Nt
    }) : ee.addEventListener(se, Pe, !0) : Nt !== void 0 ? ee.addEventListener(se, Pe, {
      passive: Nt
    }) : ee.addEventListener(se, Pe, !1);
  }
  function Ho(ee, se, Pe, ot, Nt) {
    var mn = ot;
    if ((se & 1) === 0 && (se & 2) === 0 && ot !== null) e: for (;;) {
      if (ot === null) return;
      var hr = ot.tag;
      if (hr === 3 || hr === 4) {
        var ra = ot.stateNode.containerInfo;
        if (ra === Nt || ra.nodeType === 8 && ra.parentNode === Nt) break;
        if (hr === 4) for (hr = ot.return; hr !== null;) {
          var ka = hr.tag;
          if ((ka === 3 || ka === 4) && (ka = hr.stateNode.containerInfo, ka === Nt || ka.nodeType === 8 && ka.parentNode === Nt)) return;
          hr = hr.return;
        }
        for (; ra !== null;) {
          if (hr = vu(ra), hr === null) return;
          if (ka = hr.tag, ka === 5 || ka === 6) {
            ot = mn = hr;
            continue e;
          }
          ra = ra.parentNode;
        }
      }
      ot = ot.return;
    }
    Ye(function () {
      var ti = mn,
        Li = Me(Pe),
        zi = [];
      e: {
        var Ni = vo.get(ee);
        if (Ni !== void 0) {
          var Io = zr,
            zo = ee;
          switch (ee) {
            case "keypress":
              if (ar(Pe) === 0) break e;
            case "keydown":
            case "keyup":
              Io = $t;
              break;
            case "focusin":
              zo = "focus", Io = Jr;
              break;
            case "focusout":
              zo = "blur", Io = Jr;
              break;
            case "beforeblur":
            case "afterblur":
              Io = Jr;
              break;
            case "click":
              if (Pe.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Io = Br;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Io = Lr;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Io = cn;
              break;
            case Vi:
            case Ti:
            case Gi:
              Io = ir;
              break;
            case hi:
              Io = Lt;
              break;
            case "scroll":
              Io = Wr;
              break;
            case "wheel":
              Io = Dt;
              break;
            case "copy":
            case "cut":
            case "paste":
              Io = ha;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Io = Qe;
          }
          var Jo = (se & 4) !== 0,
            sn = !Jo && ee === "scroll",
            Tn = Jo ? Ni !== null ? Ni + "Capture" : null : Ni;
          Jo = [];
          for (var lr = ti, Tr; lr !== null;) {
            Tr = lr;
            var Qr = Tr.stateNode;
            if (Tr.tag === 5 && Qr !== null && (Tr = Qr, Tn !== null && (Qr = Ce(lr, Tn), Qr != null && Jo.push(jo(lr, Qr, Tr)))), sn) break;
            lr = lr.return;
          }
          0 < Jo.length && (Ni = new Io(Ni, zo, null, Pe, Li), zi.push({
            event: Ni,
            listeners: Jo
          }));
        }
      }
      if ((se & 7) === 0) {
        e: {
          if (Ni = ee === "mouseover" || ee === "pointerover", Io = ee === "mouseout" || ee === "pointerout", Ni && Pe !== Fe && (zo = Pe.relatedTarget || Pe.fromElement) && (vu(zo) || zo[Ic])) break e;
          if ((Io || Ni) && (Ni = Li.window === Li ? Li : (Ni = Li.ownerDocument) ? Ni.defaultView || Ni.parentWindow : window, Io ? (zo = Pe.relatedTarget || Pe.toElement, Io = ti, zo = zo ? vu(zo) : null, zo !== null && (sn = vt(zo), zo !== sn || zo.tag !== 5 && zo.tag !== 6) && (zo = null)) : (Io = null, zo = ti), Io !== zo)) {
            if (Jo = Br, Qr = "onMouseLeave", Tn = "onMouseEnter", lr = "mouse", (ee === "pointerout" || ee === "pointerover") && (Jo = Qe, Qr = "onPointerLeave", Tn = "onPointerEnter", lr = "pointer"), sn = Io == null ? Ni : Df(Io), Tr = zo == null ? Ni : Df(zo), Ni = new Jo(Qr, lr + "leave", Io, Pe, Li), Ni.target = sn, Ni.relatedTarget = Tr, Qr = null, vu(Li) === ti && (Jo = new Jo(Tn, lr + "enter", zo, Pe, Li), Jo.target = Tr, Jo.relatedTarget = sn, Qr = Jo), sn = Qr, Io && zo) t: {
              for (Jo = Io, Tn = zo, lr = 0, Tr = Jo; Tr; Tr = _s(Tr)) lr++;
              for (Tr = 0, Qr = Tn; Qr; Qr = _s(Qr)) Tr++;
              for (; 0 < lr - Tr;) Jo = _s(Jo), lr--;
              for (; 0 < Tr - lr;) Tn = _s(Tn), Tr--;
              for (; lr--;) {
                if (Jo === Tn || Tn !== null && Jo === Tn.alternate) break t;
                Jo = _s(Jo), Tn = _s(Tn);
              }
              Jo = null;
            } else Jo = null;
            Io !== null && Pl(zi, Ni, Io, Jo, !1), zo !== null && sn !== null && Pl(zi, sn, zo, Jo, !0);
          }
        }
        e: {
          if (Ni = ti ? Df(ti) : window, Io = Ni.nodeName && Ni.nodeName.toLowerCase(), Io === "select" || Io === "input" && Ni.type === "file") var Sa = Jt;else if (kn(Ni)) {
            if (Nn) Sa = mr;else {
              Sa = Mn;
              var Ka = zn;
            }
          } else (Io = Ni.nodeName) && Io.toLowerCase() === "input" && (Ni.type === "checkbox" || Ni.type === "radio") && (Sa = or);
          if (Sa && (Sa = Sa(ee, ti))) {
            xn(zi, Sa, Pe, Li);
            break e;
          }
          Ka && Ka(ee, Ni, ti), ee === "focusout" && (Ka = Ni._wrapperState) && Ka.controlled && Ni.type === "number" && Z(Ni, "number", Ni.value);
        }
        switch (Ka = ti ? Df(ti) : window, ee) {
          case "focusin":
            (kn(Ka) || Ka.contentEditable === "true") && (Fa = Ka, Ra = ti, ui = null);
            break;
          case "focusout":
            ui = Ra = Fa = null;
            break;
          case "mousedown":
            pr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            pr = !1, In(zi, Pe, Li);
            break;
          case "selectionchange":
            if (Oa) break;
          case "keydown":
          case "keyup":
            In(zi, Pe, Li);
        }
        var ma;
        if (Rt) e: {
          switch (ee) {
            case "compositionstart":
              var Va = "onCompositionStart";
              break e;
            case "compositionend":
              Va = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Va = "onCompositionUpdate";
              break e;
          }
          Va = void 0;
        } else Un ? an(ee, Pe) && (Va = "onCompositionEnd") : ee === "keydown" && Pe.keyCode === 229 && (Va = "onCompositionStart");
        Va && (Ln && Pe.locale !== "ko" && (Un || Va !== "onCompositionStart" ? Va === "onCompositionEnd" && Un && (ma = _n()) : (Wn = Li, wr = "value" in Wn ? Wn.value : Wn.textContent, Un = !0)), Ka = Ls(ti, Va), 0 < Ka.length && (Va = new Za(Va, ee, null, Pe, Li), zi.push({
          event: Va,
          listeners: Ka
        }), ma ? Va.data = ma : (ma = Rn(Pe), ma !== null && (Va.data = ma)))), (ma = Zt ? er(ee, Pe) : Cr(ee, Pe)) && (ti = Ls(ti, "onBeforeInput"), 0 < ti.length && (Li = new Za("onBeforeInput", "beforeinput", null, Pe, Li), zi.push({
          event: Li,
          listeners: ti
        }), Li.data = ma));
      }
      la(zi, se);
    });
  }
  function jo(ee, se, Pe) {
    return {
      instance: ee,
      listener: se,
      currentTarget: Pe
    };
  }
  function Ls(ee, se) {
    for (var Pe = se + "Capture", ot = []; ee !== null;) {
      var Nt = ee,
        mn = Nt.stateNode;
      Nt.tag === 5 && mn !== null && (Nt = mn, mn = Ce(ee, Pe), mn != null && ot.unshift(jo(ee, mn, Nt)), mn = Ce(ee, se), mn != null && ot.push(jo(ee, mn, Nt))), ee = ee.return;
    }
    return ot;
  }
  function _s(ee) {
    if (ee === null) return null;
    do ee = ee.return; while (ee && ee.tag !== 5);
    return ee || null;
  }
  function Pl(ee, se, Pe, ot, Nt) {
    for (var mn = se._reactName, hr = []; Pe !== null && Pe !== ot;) {
      var ra = Pe,
        ka = ra.alternate,
        ti = ra.stateNode;
      if (ka !== null && ka === ot) break;
      ra.tag === 5 && ti !== null && (ra = ti, Nt ? (ka = Ce(Pe, mn), ka != null && hr.unshift(jo(Pe, ka, ra))) : Nt || (ka = Ce(Pe, mn), ka != null && hr.push(jo(Pe, ka, ra)))), Pe = Pe.return;
    }
    hr.length !== 0 && ee.push({
      event: se,
      listeners: hr
    });
  }
  var xl = /\r\n?/g,
    Bi = /\u0000|\uFFFD/g;
  function Do(ee) {
    return (typeof ee == "string" ? ee : "" + ee).replace(xl, `
`).replace(Bi, "");
  }
  function co(ee, se, Pe) {
    if (se = Do(se), Do(ee) !== se && Pe) throw Error(n(425));
  }
  function ls() {}
  var Ms = null,
    ks = null;
  function Yo(ee, se) {
    return ee === "textarea" || ee === "noscript" || typeof se.children == "string" || typeof se.children == "number" || typeof se.dangerouslySetInnerHTML == "object" && se.dangerouslySetInnerHTML !== null && se.dangerouslySetInnerHTML.__html != null;
  }
  var Vc = typeof setTimeout == "function" ? setTimeout : void 0,
    zd = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Xh = typeof Promise == "function" ? Promise : void 0,
    Pp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xh < "u" ? function (ee) {
      return Xh.resolve(null).then(ee).catch(Ub);
    } : Vc;
  function Ub(ee) {
    setTimeout(function () {
      throw ee;
    });
  }
  function t0(ee, se) {
    var Pe = se,
      ot = 0;
    do {
      var Nt = Pe.nextSibling;
      if (ee.removeChild(Pe), Nt && Nt.nodeType === 8) if (Pe = Nt.data, Pe === "/$") {
        if (ot === 0) {
          ee.removeChild(Nt), sa(se);
          return;
        }
        ot--;
      } else Pe !== "$" && Pe !== "$?" && Pe !== "$!" || ot++;
      Pe = Nt;
    } while (Pe);
    sa(se);
  }
  function yu(ee) {
    for (; ee != null; ee = ee.nextSibling) {
      var se = ee.nodeType;
      if (se === 1 || se === 3) break;
      if (se === 8) {
        if (se = ee.data, se === "$" || se === "$!" || se === "$?") break;
        if (se === "/$") return null;
      }
    }
    return ee;
  }
  function oo(ee) {
    ee = ee.previousSibling;
    for (var se = 0; ee;) {
      if (ee.nodeType === 8) {
        var Pe = ee.data;
        if (Pe === "$" || Pe === "$!" || Pe === "$?") {
          if (se === 0) return ee;
          se--;
        } else Pe === "/$" && se++;
      }
      ee = ee.previousSibling;
    }
    return null;
  }
  var Ps = Math.random().toString(36).slice(2),
    xi = "__reactFiber$" + Ps,
    ld = "__reactProps$" + Ps,
    Ic = "__reactContainer$" + Ps,
    fc = "__reactEvents$" + Ps,
    bu = "__reactListeners$" + Ps,
    qd = "__reactHandles$" + Ps;
  function vu(ee) {
    var se = ee[xi];
    if (se) return se;
    for (var Pe = ee.parentNode; Pe;) {
      if (se = Pe[Ic] || Pe[xi]) {
        if (Pe = se.alternate, se.child !== null || Pe !== null && Pe.child !== null) for (ee = oo(ee); ee !== null;) {
          if (Pe = ee[xi]) return Pe;
          ee = oo(ee);
        }
        return se;
      }
      ee = Pe, Pe = ee.parentNode;
    }
    return null;
  }
  function wu(ee) {
    return ee = ee[xi] || ee[Ic], !ee || ee.tag !== 5 && ee.tag !== 6 && ee.tag !== 13 && ee.tag !== 3 ? null : ee;
  }
  function Df(ee) {
    if (ee.tag === 5 || ee.tag === 6) return ee.stateNode;
    throw Error(n(33));
  }
  function xg(ee) {
    return ee[ld] || null;
  }
  var Lf = [],
    Jh = -1;
  function Zh(ee) {
    return {
      current: ee
    };
  }
  function Bl(ee) {
    0 > Jh || (ee.current = Lf[Jh], Lf[Jh] = null, Jh--);
  }
  function ql(ee, se) {
    Jh++, Lf[Jh] = ee.current, ee.current = se;
  }
  var Kd = {},
    uh = Zh(Kd),
    Lc = Zh(!1),
    Xp = Kd;
  function Qm(ee, se) {
    var Pe = ee.type.contextTypes;
    if (!Pe) return Kd;
    var ot = ee.stateNode;
    if (ot && ot.__reactInternalMemoizedUnmaskedChildContext === se) return ot.__reactInternalMemoizedMaskedChildContext;
    var Nt = {},
      mn;
    for (mn in Pe) Nt[mn] = se[mn];
    return ot && (ee = ee.stateNode, ee.__reactInternalMemoizedUnmaskedChildContext = se, ee.__reactInternalMemoizedMaskedChildContext = Nt), Nt;
  }
  function Qd(ee) {
    return ee = ee.childContextTypes, ee != null;
  }
  function Xv() {
    Bl(Lc), Bl(uh);
  }
  function $b(ee, se, Pe) {
    if (uh.current !== Kd) throw Error(n(168));
    ql(uh, se), ql(Lc, Pe);
  }
  function Jl(ee, se, Pe) {
    var ot = ee.stateNode;
    if (se = se.childContextTypes, typeof ot.getChildContext != "function") return Pe;
    ot = ot.getChildContext();
    for (var Nt in ot) if (!(Nt in se)) throw Error(n(108, K(ee) || "Unknown", Nt));
    return V({}, Pe, ot);
  }
  function td(ee) {
    return ee = (ee = ee.stateNode) && ee.__reactInternalMemoizedMergedChildContext || Kd, Xp = uh.current, ql(uh, ee), ql(Lc, Lc.current), !0;
  }
  function Ym(ee, se, Pe) {
    var ot = ee.stateNode;
    if (!ot) throw Error(n(169));
    Pe ? (ee = Jl(ee, se, Xp), ot.__reactInternalMemoizedMergedChildContext = ee, Bl(Lc), Bl(uh), ql(uh, ee)) : Bl(Lc), ql(Lc, Pe);
  }
  var hh = null,
    Jp = !1,
    Hc = !1;
  function Rp(ee) {
    hh === null ? hh = [ee] : hh.push(ee);
  }
  function fw(ee) {
    Jp = !0, Rp(ee);
  }
  function Xm() {
    if (!Hc && hh !== null) {
      Hc = !0;
      var ee = 0,
        se = wn;
      try {
        var Pe = hh;
        for (wn = 1; ee < Pe.length; ee++) {
          var ot = Pe[ee];
          do ot = ot(!0); while (ot !== null);
        }
        hh = null, Jp = !1;
      } catch (Nt) {
        throw hh !== null && (hh = hh.slice(ee + 1)), Ut(St, Xm), Nt;
      } finally {
        wn = se, Hc = !1;
      }
    }
    return null;
  }
  var Zp = [],
    Of = 0,
    Jm = null,
    Js = 0,
    uc = [],
    ep = 0,
    tp = null,
    xm = 1,
    xd = "";
  function _m(ee, se) {
    Zp[Of++] = Js, Zp[Of++] = Jm, Jm = ee, Js = se;
  }
  function Eo(ee, se, Pe) {
    uc[ep++] = xm, uc[ep++] = xd, uc[ep++] = tp, tp = ee;
    var ot = xm;
    ee = xd;
    var Nt = 32 - Ct(ot) - 1;
    ot &= ~(1 << Nt), Pe += 1;
    var mn = 32 - Ct(se) + Nt;
    if (30 < mn) {
      var hr = Nt - Nt % 5;
      mn = (ot & (1 << hr) - 1).toString(32), ot >>= hr, Nt -= hr, xm = 1 << 32 - Ct(se) + Nt | Pe << Nt | ot, xd = mn + ee;
    } else xm = 1 << mn | Pe << Nt | ot, xd = ee;
  }
  function Zs(ee) {
    ee.return !== null && (_m(ee, 1), Eo(ee, 1, 0));
  }
  function Wo(ee) {
    for (; ee === Jm;) Jm = Zp[--Of], Zp[Of] = null, Js = Zp[--Of], Zp[Of] = null;
    for (; ee === tp;) tp = uc[--ep], uc[ep] = null, xd = uc[--ep], uc[ep] = null, xm = uc[--ep], uc[ep] = null;
  }
  var Qs = null,
    Xo = null,
    fl = !1,
    Oc = null;
  function km(ee, se) {
    var Pe = $0(5, null, null, 0);
    Pe.elementType = "DELETED", Pe.stateNode = se, Pe.return = ee, se = ee.deletions, se === null ? (ee.deletions = [Pe], ee.flags |= 16) : se.push(Pe);
  }
  function gl(ee, se) {
    switch (ee.tag) {
      case 5:
        var Pe = ee.type;
        return se = se.nodeType !== 1 || Pe.toLowerCase() !== se.nodeName.toLowerCase() ? null : se, se !== null ? (ee.stateNode = se, Qs = ee, Xo = yu(se.firstChild), !0) : !1;
      case 6:
        return se = ee.pendingProps === "" || se.nodeType !== 3 ? null : se, se !== null ? (ee.stateNode = se, Qs = ee, Xo = null, !0) : !1;
      case 13:
        return se = se.nodeType !== 8 ? null : se, se !== null ? (Pe = tp !== null ? {
          id: xm,
          overflow: xd
        } : null, ee.memoizedState = {
          dehydrated: se,
          treeContext: Pe,
          retryLane: 1073741824
        }, Pe = $0(18, null, null, 0), Pe.stateNode = se, Pe.return = ee, ee.child = Pe, Qs = ee, Xo = null, !0) : !1;
      default:
        return !1;
    }
  }
  function oe(ee) {
    return (ee.mode & 1) !== 0 && (ee.flags & 128) === 0;
  }
  function Se(ee) {
    if (fl) {
      var se = Xo;
      if (se) {
        var Pe = se;
        if (!gl(ee, se)) {
          if (oe(ee)) throw Error(n(418));
          se = yu(Pe.nextSibling);
          var ot = Qs;
          se && gl(ee, se) ? km(ot, Pe) : (ee.flags = ee.flags & -4097 | 2, fl = !1, Qs = ee);
        }
      } else {
        if (oe(ee)) throw Error(n(418));
        ee.flags = ee.flags & -4097 | 2, fl = !1, Qs = ee;
      }
    }
  }
  function Be(ee) {
    for (ee = ee.return; ee !== null && ee.tag !== 5 && ee.tag !== 3 && ee.tag !== 13;) ee = ee.return;
    Qs = ee;
  }
  function Je(ee) {
    if (ee !== Qs) return !1;
    if (!fl) return Be(ee), fl = !0, !1;
    var se;
    if ((se = ee.tag !== 3) && !(se = ee.tag !== 5) && (se = ee.type, se = se !== "head" && se !== "body" && !Yo(ee.type, ee.memoizedProps)), se && (se = Xo)) {
      if (oe(ee)) throw ut(), Error(n(418));
      for (; se;) km(ee, se), se = yu(se.nextSibling);
    }
    if (Be(ee), ee.tag === 13) {
      if (ee = ee.memoizedState, ee = ee !== null ? ee.dehydrated : null, !ee) throw Error(n(317));
      e: {
        for (ee = ee.nextSibling, se = 0; ee;) {
          if (ee.nodeType === 8) {
            var Pe = ee.data;
            if (Pe === "/$") {
              if (se === 0) {
                Xo = yu(ee.nextSibling);
                break e;
              }
              se--;
            } else Pe !== "$" && Pe !== "$!" && Pe !== "$?" || se++;
          }
          ee = ee.nextSibling;
        }
        Xo = null;
      }
    } else Xo = Qs ? yu(ee.stateNode.nextSibling) : null;
    return !0;
  }
  function ut() {
    for (var ee = Xo; ee;) ee = yu(ee.nextSibling);
  }
  function dn() {
    Xo = Qs = null, fl = !1;
  }
  function Xn(ee) {
    Oc === null ? Oc = [ee] : Oc.push(ee);
  }
  var Rr = k.ReactCurrentBatchConfig;
  function Vr(ee, se, Pe) {
    if (ee = Pe.ref, ee !== null && typeof ee != "function" && typeof ee != "object") {
      if (Pe._owner) {
        if (Pe = Pe._owner, Pe) {
          if (Pe.tag !== 1) throw Error(n(309));
          var ot = Pe.stateNode;
        }
        if (!ot) throw Error(n(147, ee));
        var Nt = ot,
          mn = "" + ee;
        return se !== null && se.ref !== null && typeof se.ref == "function" && se.ref._stringRef === mn ? se.ref : (se = function (hr) {
          var ra = Nt.refs;
          hr === null ? delete ra[mn] : ra[mn] = hr;
        }, se._stringRef = mn, se);
      }
      if (typeof ee != "string") throw Error(n(284));
      if (!Pe._owner) throw Error(n(290, ee));
    }
    return ee;
  }
  function ca(ee, se) {
    throw ee = Object.prototype.toString.call(se), Error(n(31, ee === "[object Object]" ? "object with keys {" + Object.keys(se).join(", ") + "}" : ee));
  }
  function za(ee) {
    var se = ee._init;
    return se(ee._payload);
  }
  function Xr(ee) {
    function se(Tn, lr) {
      if (ee) {
        var Tr = Tn.deletions;
        Tr === null ? (Tn.deletions = [lr], Tn.flags |= 16) : Tr.push(lr);
      }
    }
    function Pe(Tn, lr) {
      if (!ee) return null;
      for (; lr !== null;) se(Tn, lr), lr = lr.sibling;
      return null;
    }
    function ot(Tn, lr) {
      for (Tn = new Map(); lr !== null;) lr.key !== null ? Tn.set(lr.key, lr) : Tn.set(lr.index, lr), lr = lr.sibling;
      return Tn;
    }
    function Nt(Tn, lr) {
      return Tn = Zb(Tn, lr), Tn.index = 0, Tn.sibling = null, Tn;
    }
    function mn(Tn, lr, Tr) {
      return Tn.index = Tr, ee ? (Tr = Tn.alternate, Tr !== null ? (Tr = Tr.index, Tr < lr ? (Tn.flags |= 2, lr) : Tr) : (Tn.flags |= 2, lr)) : (Tn.flags |= 1048576, lr);
    }
    function hr(Tn) {
      return ee && Tn.alternate === null && (Tn.flags |= 2), Tn;
    }
    function ra(Tn, lr, Tr, Qr) {
      return lr === null || lr.tag !== 6 ? (lr = NI(Tr, Tn.mode, Qr), lr.return = Tn, lr) : (lr = Nt(lr, Tr), lr.return = Tn, lr);
    }
    function ka(Tn, lr, Tr, Qr) {
      var Sa = Tr.type;
      return Sa === C ? Li(Tn, lr, Tr.props.children, Qr, Tr.key) : lr !== null && (lr.elementType === Sa || typeof Sa == "object" && Sa !== null && Sa.$$typeof === F && za(Sa) === lr.type) ? (Qr = Nt(lr, Tr.props), Qr.ref = Vr(Tn, lr, Tr), Qr.return = Tn, Qr) : (Qr = v_(Tr.type, Tr.key, Tr.props, null, Tn.mode, Qr), Qr.ref = Vr(Tn, lr, Tr), Qr.return = Tn, Qr);
    }
    function ti(Tn, lr, Tr, Qr) {
      return lr === null || lr.tag !== 4 || lr.stateNode.containerInfo !== Tr.containerInfo || lr.stateNode.implementation !== Tr.implementation ? (lr = jI(Tr, Tn.mode, Qr), lr.return = Tn, lr) : (lr = Nt(lr, Tr.children || []), lr.return = Tn, lr);
    }
    function Li(Tn, lr, Tr, Qr, Sa) {
      return lr === null || lr.tag !== 7 ? (lr = Qx(Tr, Tn.mode, Qr, Sa), lr.return = Tn, lr) : (lr = Nt(lr, Tr), lr.return = Tn, lr);
    }
    function zi(Tn, lr, Tr) {
      if (typeof lr == "string" && lr !== "" || typeof lr == "number") return lr = NI("" + lr, Tn.mode, Tr), lr.return = Tn, lr;
      if (typeof lr == "object" && lr !== null) {
        switch (lr.$$typeof) {
          case A:
            return Tr = v_(lr.type, lr.key, lr.props, null, Tn.mode, Tr), Tr.ref = Vr(Tn, null, lr), Tr.return = Tn, Tr;
          case S:
            return lr = jI(lr, Tn.mode, Tr), lr.return = Tn, lr;
          case F:
            var Qr = lr._init;
            return zi(Tn, Qr(lr._payload), Tr);
        }
        if (re(lr) || z(lr)) return lr = Qx(lr, Tn.mode, Tr, null), lr.return = Tn, lr;
        ca(Tn, lr);
      }
      return null;
    }
    function Ni(Tn, lr, Tr, Qr) {
      var Sa = lr !== null ? lr.key : null;
      if (typeof Tr == "string" && Tr !== "" || typeof Tr == "number") return Sa !== null ? null : ra(Tn, lr, "" + Tr, Qr);
      if (typeof Tr == "object" && Tr !== null) {
        switch (Tr.$$typeof) {
          case A:
            return Tr.key === Sa ? ka(Tn, lr, Tr, Qr) : null;
          case S:
            return Tr.key === Sa ? ti(Tn, lr, Tr, Qr) : null;
          case F:
            return Sa = Tr._init, Ni(Tn, lr, Sa(Tr._payload), Qr);
        }
        if (re(Tr) || z(Tr)) return Sa !== null ? null : Li(Tn, lr, Tr, Qr, null);
        ca(Tn, Tr);
      }
      return null;
    }
    function Io(Tn, lr, Tr, Qr, Sa) {
      if (typeof Qr == "string" && Qr !== "" || typeof Qr == "number") return Tn = Tn.get(Tr) || null, ra(lr, Tn, "" + Qr, Sa);
      if (typeof Qr == "object" && Qr !== null) {
        switch (Qr.$$typeof) {
          case A:
            return Tn = Tn.get(Qr.key === null ? Tr : Qr.key) || null, ka(lr, Tn, Qr, Sa);
          case S:
            return Tn = Tn.get(Qr.key === null ? Tr : Qr.key) || null, ti(lr, Tn, Qr, Sa);
          case F:
            var Ka = Qr._init;
            return Io(Tn, lr, Tr, Ka(Qr._payload), Sa);
        }
        if (re(Qr) || z(Qr)) return Tn = Tn.get(Tr) || null, Li(lr, Tn, Qr, Sa, null);
        ca(lr, Qr);
      }
      return null;
    }
    function zo(Tn, lr, Tr, Qr) {
      for (var Sa = null, Ka = null, ma = lr, Va = lr = 0, Ci = null; ma !== null && Va < Tr.length; Va++) {
        ma.index > Va ? (Ci = ma, ma = null) : Ci = ma.sibling;
        var Ji = Ni(Tn, ma, Tr[Va], Qr);
        if (Ji === null) {
          ma === null && (ma = Ci);
          break;
        }
        ee && ma && Ji.alternate === null && se(Tn, ma), lr = mn(Ji, lr, Va), Ka === null ? Sa = Ji : Ka.sibling = Ji, Ka = Ji, ma = Ci;
      }
      if (Va === Tr.length) return Pe(Tn, ma), fl && _m(Tn, Va), Sa;
      if (ma === null) {
        for (; Va < Tr.length; Va++) ma = zi(Tn, Tr[Va], Qr), ma !== null && (lr = mn(ma, lr, Va), Ka === null ? Sa = ma : Ka.sibling = ma, Ka = ma);
        return fl && _m(Tn, Va), Sa;
      }
      for (ma = ot(Tn, ma); Va < Tr.length; Va++) Ci = Io(ma, Tn, Va, Tr[Va], Qr), Ci !== null && (ee && Ci.alternate !== null && ma.delete(Ci.key === null ? Va : Ci.key), lr = mn(Ci, lr, Va), Ka === null ? Sa = Ci : Ka.sibling = Ci, Ka = Ci);
      return ee && ma.forEach(function (Os) {
        return se(Tn, Os);
      }), fl && _m(Tn, Va), Sa;
    }
    function Jo(Tn, lr, Tr, Qr) {
      var Sa = z(Tr);
      if (typeof Sa != "function") throw Error(n(150));
      if (Tr = Sa.call(Tr), Tr == null) throw Error(n(151));
      for (var Ka = Sa = null, ma = lr, Va = lr = 0, Ci = null, Ji = Tr.next(); ma !== null && !Ji.done; Va++, Ji = Tr.next()) {
        ma.index > Va ? (Ci = ma, ma = null) : Ci = ma.sibling;
        var Os = Ni(Tn, ma, Ji.value, Qr);
        if (Os === null) {
          ma === null && (ma = Ci);
          break;
        }
        ee && ma && Os.alternate === null && se(Tn, ma), lr = mn(Os, lr, Va), Ka === null ? Sa = Os : Ka.sibling = Os, Ka = Os, ma = Ci;
      }
      if (Ji.done) return Pe(Tn, ma), fl && _m(Tn, Va), Sa;
      if (ma === null) {
        for (; !Ji.done; Va++, Ji = Tr.next()) Ji = zi(Tn, Ji.value, Qr), Ji !== null && (lr = mn(Ji, lr, Va), Ka === null ? Sa = Ji : Ka.sibling = Ji, Ka = Ji);
        return fl && _m(Tn, Va), Sa;
      }
      for (ma = ot(Tn, ma); !Ji.done; Va++, Ji = Tr.next()) Ji = Io(ma, Tn, Va, Ji.value, Qr), Ji !== null && (ee && Ji.alternate !== null && ma.delete(Ji.key === null ? Va : Ji.key), lr = mn(Ji, lr, Va), Ka === null ? Sa = Ji : Ka.sibling = Ji, Ka = Ji);
      return ee && ma.forEach(function (Vo) {
        return se(Tn, Vo);
      }), fl && _m(Tn, Va), Sa;
    }
    function sn(Tn, lr, Tr, Qr) {
      if (typeof Tr == "object" && Tr !== null && Tr.type === C && Tr.key === null && (Tr = Tr.props.children), typeof Tr == "object" && Tr !== null) {
        switch (Tr.$$typeof) {
          case A:
            e: {
              for (var Sa = Tr.key, Ka = lr; Ka !== null;) {
                if (Ka.key === Sa) {
                  if (Sa = Tr.type, Sa === C) {
                    if (Ka.tag === 7) {
                      Pe(Tn, Ka.sibling), lr = Nt(Ka, Tr.props.children), lr.return = Tn, Tn = lr;
                      break e;
                    }
                  } else if (Ka.elementType === Sa || typeof Sa == "object" && Sa !== null && Sa.$$typeof === F && za(Sa) === Ka.type) {
                    Pe(Tn, Ka.sibling), lr = Nt(Ka, Tr.props), lr.ref = Vr(Tn, Ka, Tr), lr.return = Tn, Tn = lr;
                    break e;
                  }
                  Pe(Tn, Ka);
                  break;
                } else se(Tn, Ka);
                Ka = Ka.sibling;
              }
              Tr.type === C ? (lr = Qx(Tr.props.children, Tn.mode, Qr, Tr.key), lr.return = Tn, Tn = lr) : (Qr = v_(Tr.type, Tr.key, Tr.props, null, Tn.mode, Qr), Qr.ref = Vr(Tn, lr, Tr), Qr.return = Tn, Tn = Qr);
            }
            return hr(Tn);
          case S:
            e: {
              for (Ka = Tr.key; lr !== null;) {
                if (lr.key === Ka) {
                  if (lr.tag === 4 && lr.stateNode.containerInfo === Tr.containerInfo && lr.stateNode.implementation === Tr.implementation) {
                    Pe(Tn, lr.sibling), lr = Nt(lr, Tr.children || []), lr.return = Tn, Tn = lr;
                    break e;
                  } else {
                    Pe(Tn, lr);
                    break;
                  }
                } else se(Tn, lr);
                lr = lr.sibling;
              }
              lr = jI(Tr, Tn.mode, Qr), lr.return = Tn, Tn = lr;
            }
            return hr(Tn);
          case F:
            return Ka = Tr._init, sn(Tn, lr, Ka(Tr._payload), Qr);
        }
        if (re(Tr)) return zo(Tn, lr, Tr, Qr);
        if (z(Tr)) return Jo(Tn, lr, Tr, Qr);
        ca(Tn, Tr);
      }
      return typeof Tr == "string" && Tr !== "" || typeof Tr == "number" ? (Tr = "" + Tr, lr !== null && lr.tag === 6 ? (Pe(Tn, lr.sibling), lr = Nt(lr, Tr), lr.return = Tn, Tn = lr) : (Pe(Tn, lr), lr = NI(Tr, Tn.mode, Qr), lr.return = Tn, Tn = lr), hr(Tn)) : Pe(Tn, lr);
    }
    return sn;
  }
  var fi = Xr(!0),
    Bo = Xr(!1),
    sl = Zh(null),
    xu = null,
    Bf = null,
    Gb = null;
  function By() {
    Gb = Bf = xu = null;
  }
  function Jv(ee) {
    var se = sl.current;
    Bl(sl), ee._currentValue = se;
  }
  function O0(ee, se, Pe) {
    for (; ee !== null;) {
      var ot = ee.alternate;
      if ((ee.childLanes & se) !== se ? (ee.childLanes |= se, ot !== null && (ot.childLanes |= se)) : ot !== null && (ot.childLanes & se) !== se && (ot.childLanes |= se), ee === Pe) break;
      ee = ee.return;
    }
  }
  function Ff(ee, se) {
    xu = ee, Gb = Bf = null, ee = ee.dependencies, ee !== null && ee.firstContext !== null && ((ee.lanes & se) !== 0 && (Np = !0), ee.firstContext = null);
  }
  function n0(ee) {
    var se = ee._currentValue;
    if (Gb !== ee) if (ee = {
      context: ee,
      memoizedValue: se,
      next: null
    }, Bf === null) {
      if (xu === null) throw Error(n(308));
      Bf = ee, xu.dependencies = {
        lanes: 0,
        firstContext: ee
      };
    } else Bf = Bf.next = ee;
    return se;
  }
  var B0 = null;
  function Fy(ee) {
    B0 === null ? B0 = [ee] : B0.push(ee);
  }
  function _g(ee, se, Pe, ot) {
    var Nt = se.interleaved;
    return Nt === null ? (Pe.next = Pe, Fy(se)) : (Pe.next = Nt.next, Nt.next = Pe), se.interleaved = Pe, Zm(ee, ot);
  }
  function Zm(ee, se) {
    ee.lanes |= se;
    var Pe = ee.alternate;
    for (Pe !== null && (Pe.lanes |= se), Pe = ee, ee = ee.return; ee !== null;) ee.childLanes |= se, Pe = ee.alternate, Pe !== null && (Pe.childLanes |= se), Pe = ee, ee = ee.return;
    return Pe.tag === 3 ? Pe.stateNode : null;
  }
  var F0 = !1;
  function ll(ee) {
    ee.updateQueue = {
      baseState: ee.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: 0
      },
      effects: null
    };
  }
  function zy(ee, se) {
    ee = ee.updateQueue, se.updateQueue === ee && (se.updateQueue = {
      baseState: ee.baseState,
      firstBaseUpdate: ee.firstBaseUpdate,
      lastBaseUpdate: ee.lastBaseUpdate,
      shared: ee.shared,
      effects: ee.effects
    });
  }
  function Nh(ee, se) {
    return {
      eventTime: ee,
      lane: se,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function zf(ee, se, Pe) {
    var ot = ee.updateQueue;
    if (ot === null) return null;
    if (ot = ot.shared, (Fc & 2) !== 0) {
      var Nt = ot.pending;
      return Nt === null ? se.next = se : (se.next = Nt.next, Nt.next = se), ot.pending = se, Zm(ee, Pe);
    }
    return Nt = ot.interleaved, Nt === null ? (se.next = se, Fy(ot)) : (se.next = Nt.next, Nt.next = se), ot.interleaved = se, Zm(ee, Pe);
  }
  function Zv(ee, se, Pe) {
    if (se = se.updateQueue, se !== null && (se = se.shared, (Pe & 4194240) !== 0)) {
      var ot = se.lanes;
      ot &= ee.pendingLanes, Pe |= ot, se.lanes = Pe, Bt(ee, Pe);
    }
  }
  function bI(ee, se) {
    var Pe = ee.updateQueue,
      ot = ee.alternate;
    if (ot !== null && (ot = ot.updateQueue, Pe === ot)) {
      var Nt = null,
        mn = null;
      if (Pe = Pe.firstBaseUpdate, Pe !== null) {
        do {
          var hr = {
            eventTime: Pe.eventTime,
            lane: Pe.lane,
            tag: Pe.tag,
            payload: Pe.payload,
            callback: Pe.callback,
            next: null
          };
          mn === null ? Nt = mn = hr : mn = mn.next = hr, Pe = Pe.next;
        } while (Pe !== null);
        mn === null ? Nt = mn = se : mn = mn.next = se;
      } else Nt = mn = se;
      Pe = {
        baseState: ot.baseState,
        firstBaseUpdate: Nt,
        lastBaseUpdate: mn,
        shared: ot.shared,
        effects: ot.effects
      }, ee.updateQueue = Pe;
      return;
    }
    ee = Pe.lastBaseUpdate, ee === null ? Pe.firstBaseUpdate = se : ee.next = se, Pe.lastBaseUpdate = se;
  }
  function gw(ee, se, Pe, ot) {
    var Nt = ee.updateQueue;
    F0 = !1;
    var mn = Nt.firstBaseUpdate,
      hr = Nt.lastBaseUpdate,
      ra = Nt.shared.pending;
    if (ra !== null) {
      Nt.shared.pending = null;
      var ka = ra,
        ti = ka.next;
      ka.next = null, hr === null ? mn = ti : hr.next = ti, hr = ka;
      var Li = ee.alternate;
      Li !== null && (Li = Li.updateQueue, ra = Li.lastBaseUpdate, ra !== hr && (ra === null ? Li.firstBaseUpdate = ti : ra.next = ti, Li.lastBaseUpdate = ka));
    }
    if (mn !== null) {
      var zi = Nt.baseState;
      hr = 0, Li = ti = ka = null, ra = mn;
      do {
        var Ni = ra.lane,
          Io = ra.eventTime;
        if ((ot & Ni) === Ni) {
          Li !== null && (Li = Li.next = {
            eventTime: Io,
            lane: 0,
            tag: ra.tag,
            payload: ra.payload,
            callback: ra.callback,
            next: null
          });
          e: {
            var zo = ee,
              Jo = ra;
            switch (Ni = se, Io = Pe, Jo.tag) {
              case 1:
                if (zo = Jo.payload, typeof zo == "function") {
                  zi = zo.call(Io, zi, Ni);
                  break e;
                }
                zi = zo;
                break e;
              case 3:
                zo.flags = zo.flags & -65537 | 128;
              case 0:
                if (zo = Jo.payload, Ni = typeof zo == "function" ? zo.call(Io, zi, Ni) : zo, Ni == null) break e;
                zi = V({}, zi, Ni);
                break e;
              case 2:
                F0 = !0;
            }
          }
          ra.callback !== null && ra.lane !== 0 && (ee.flags |= 64, Ni = Nt.effects, Ni === null ? Nt.effects = [ra] : Ni.push(ra));
        } else Io = {
          eventTime: Io,
          lane: Ni,
          tag: ra.tag,
          payload: ra.payload,
          callback: ra.callback,
          next: null
        }, Li === null ? (ti = Li = Io, ka = zi) : Li = Li.next = Io, hr |= Ni;
        if (ra = ra.next, ra === null) {
          if (ra = Nt.shared.pending, ra === null) break;
          Ni = ra, ra = Ni.next, Ni.next = null, Nt.lastBaseUpdate = Ni, Nt.shared.pending = null;
        }
      } while (!0);
      if (Li === null && (ka = zi), Nt.baseState = ka, Nt.firstBaseUpdate = ti, Nt.lastBaseUpdate = Li, se = Nt.shared.interleaved, se !== null) {
        Nt = se;
        do hr |= Nt.lane, Nt = Nt.next; while (Nt !== se);
      } else mn === null && (Nt.shared.lanes = 0);
      fA |= hr, ee.lanes = hr, ee.memoizedState = zi;
    }
  }
  function zT(ee, se, Pe) {
    if (ee = se.effects, se.effects = null, ee !== null) for (se = 0; se < ee.length; se++) {
      var ot = ee[se],
        Nt = ot.callback;
      if (Nt !== null) {
        if (ot.callback = null, ot = Pe, typeof Nt != "function") throw Error(n(191, Nt));
        Nt.call(ot);
      }
    }
  }
  var ph = {},
    cd = Zh(ph),
    Lo = Zh(ph),
    e1 = Zh(ph);
  function Uf(ee) {
    if (ee === ph) throw Error(n(174));
    return ee;
  }
  function np(ee, se) {
    switch (ql(e1, se), ql(Lo, ee), ql(cd, ph), ee = se.nodeType, ee) {
      case 9:
      case 11:
        se = (se = se.documentElement) ? se.namespaceURI : xe(null, "");
        break;
      default:
        ee = ee === 8 ? se.parentNode : se, se = ee.namespaceURI || null, ee = ee.tagName, se = xe(se, ee);
    }
    Bl(cd), ql(cd, se);
  }
  function ns() {
    Bl(cd), Bl(Lo), Bl(e1);
  }
  function Uy(ee) {
    Uf(e1.current);
    var se = Uf(cd.current),
      Pe = xe(se, ee.type);
    se !== Pe && (ql(Lo, ee), ql(cd, Pe));
  }
  function Ox(ee) {
    Lo.current === ee && (Bl(cd), Bl(Lo));
  }
  var Yd = Zh(0);
  function r0(ee) {
    for (var se = ee; se !== null;) {
      if (se.tag === 13) {
        var Pe = se.memoizedState;
        if (Pe !== null && (Pe = Pe.dehydrated, Pe === null || Pe.data === "$?" || Pe.data === "$!")) return se;
      } else if (se.tag === 19 && se.memoizedProps.revealOrder !== void 0) {
        if ((se.flags & 128) !== 0) return se;
      } else if (se.child !== null) {
        se.child.return = se, se = se.child;
        continue;
      }
      if (se === ee) break;
      for (; se.sibling === null;) {
        if (se.return === null || se.return === ee) return null;
        se = se.return;
      }
      se.sibling.return = se.return, se = se.sibling;
    }
    return null;
  }
  var Ud = [];
  function UT() {
    for (var ee = 0; ee < Ud.length; ee++) Ud[ee]._workInProgressVersionPrimary = null;
    Ud.length = 0;
  }
  var $y = k.ReactCurrentDispatcher,
    h_ = k.ReactCurrentBatchConfig,
    Ed = 0,
    Kl = null,
    Fl = null,
    Xd = null,
    p_ = !1,
    t1 = !1,
    Vb = 0,
    $f = 0;
  function jh() {
    throw Error(n(321));
  }
  function a0(ee, se) {
    if (se === null) return !1;
    for (var Pe = 0; Pe < se.length && Pe < ee.length; Pe++) if (!aa(ee[Pe], se[Pe])) return !1;
    return !0;
  }
  function Bx(ee, se, Pe, ot, Nt, mn) {
    if (Ed = mn, Kl = se, se.memoizedState = null, se.updateQueue = null, se.lanes = 0, $y.current = ee === null || ee.memoizedState === null ? VT : XD, ee = Pe(ot, Nt), t1) {
      mn = 0;
      do {
        if (t1 = !1, Vb = 0, 25 <= mn) throw Error(n(301));
        mn += 1, Xd = Fl = null, se.updateQueue = null, $y.current = JD, ee = Pe(ot, Nt);
      } while (t1);
    }
    if ($y.current = lA, se = Fl !== null && Fl.next !== null, Ed = 0, Xd = Fl = Kl = null, p_ = !1, se) throw Error(n(300));
    return ee;
  }
  function m_() {
    var ee = Vb !== 0;
    return Vb = 0, ee;
  }
  function Gf() {
    var ee = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Xd === null ? Kl.memoizedState = Xd = ee : Xd = Xd.next = ee, Xd;
  }
  function kg() {
    if (Fl === null) {
      var ee = Kl.alternate;
      ee = ee !== null ? ee.memoizedState : null;
    } else ee = Fl.next;
    var se = Xd === null ? Kl.memoizedState : Xd.next;
    if (se !== null) Xd = se, Fl = ee;else {
      if (ee === null) throw Error(n(310));
      Fl = ee, ee = {
        memoizedState: Fl.memoizedState,
        baseState: Fl.baseState,
        baseQueue: Fl.baseQueue,
        queue: Fl.queue,
        next: null
      }, Xd === null ? Kl.memoizedState = Xd = ee : Xd = Xd.next = ee;
    }
    return Xd;
  }
  function nA(ee, se) {
    return typeof se == "function" ? se(ee) : se;
  }
  function N3(ee) {
    var se = kg(),
      Pe = se.queue;
    if (Pe === null) throw Error(n(311));
    Pe.lastRenderedReducer = ee;
    var ot = Fl,
      Nt = ot.baseQueue,
      mn = Pe.pending;
    if (mn !== null) {
      if (Nt !== null) {
        var hr = Nt.next;
        Nt.next = mn.next, mn.next = hr;
      }
      ot.baseQueue = Nt = mn, Pe.pending = null;
    }
    if (Nt !== null) {
      mn = Nt.next, ot = ot.baseState;
      var ra = hr = null,
        ka = null,
        ti = mn;
      do {
        var Li = ti.lane;
        if ((Ed & Li) === Li) ka !== null && (ka = ka.next = {
          lane: 0,
          action: ti.action,
          hasEagerState: ti.hasEagerState,
          eagerState: ti.eagerState,
          next: null
        }), ot = ti.hasEagerState ? ti.eagerState : ee(ot, ti.action);else {
          var zi = {
            lane: Li,
            action: ti.action,
            hasEagerState: ti.hasEagerState,
            eagerState: ti.eagerState,
            next: null
          };
          ka === null ? (ra = ka = zi, hr = ot) : ka = ka.next = zi, Kl.lanes |= Li, fA |= Li;
        }
        ti = ti.next;
      } while (ti !== null && ti !== mn);
      ka === null ? hr = ot : ka.next = ra, aa(ot, se.memoizedState) || (Np = !0), se.memoizedState = ot, se.baseState = hr, se.baseQueue = ka, Pe.lastRenderedState = ot;
    }
    if (ee = Pe.interleaved, ee !== null) {
      Nt = ee;
      do mn = Nt.lane, Kl.lanes |= mn, fA |= mn, Nt = Nt.next; while (Nt !== ee);
    } else Nt === null && (Pe.lanes = 0);
    return [se.memoizedState, Pe.dispatch];
  }
  function j3(ee) {
    var se = kg(),
      Pe = se.queue;
    if (Pe === null) throw Error(n(311));
    Pe.lastRenderedReducer = ee;
    var ot = Pe.dispatch,
      Nt = Pe.pending,
      mn = se.memoizedState;
    if (Nt !== null) {
      Pe.pending = null;
      var hr = Nt = Nt.next;
      do mn = ee(mn, hr.action), hr = hr.next; while (hr !== Nt);
      aa(mn, se.memoizedState) || (Np = !0), se.memoizedState = mn, se.baseQueue === null && (se.baseState = mn), Pe.lastRenderedState = mn;
    }
    return [mn, ot];
  }
  function D3() {}
  function L3(ee, se) {
    var Pe = Kl,
      ot = kg(),
      Nt = se(),
      mn = !aa(ot.memoizedState, Nt);
    if (mn && (ot.memoizedState = Nt, Np = !0), ot = ot.queue, iA(B3.bind(null, Pe, ot, ee), [ee]), ot.getSnapshot !== se || mn || Xd !== null && Xd.memoizedState.tag & 1) {
      if (Pe.flags |= 2048, z3(9, O3.bind(null, Pe, ot, Nt, se), void 0, null), Dh === null) throw Error(n(349));
      (Ed & 30) !== 0 || Fx(Pe, se, Nt);
    }
    return Nt;
  }
  function Fx(ee, se, Pe) {
    ee.flags |= 16384, ee = {
      getSnapshot: se,
      value: Pe
    }, se = Kl.updateQueue, se === null ? (se = {
      lastEffect: null,
      stores: null
    }, Kl.updateQueue = se, se.stores = [ee]) : (Pe = se.stores, Pe === null ? se.stores = [ee] : Pe.push(ee));
  }
  function O3(ee, se, Pe, ot) {
    se.value = Pe, se.getSnapshot = ot, rA(se) && F3(ee);
  }
  function B3(ee, se, Pe) {
    return Pe(function () {
      rA(se) && F3(ee);
    });
  }
  function rA(ee) {
    var se = ee.getSnapshot;
    ee = ee.value;
    try {
      var Pe = se();
      return !aa(ee, Pe);
    } catch {
      return !0;
    }
  }
  function F3(ee) {
    var se = Zm(ee, 1);
    se !== null && Xb(se, ee, 1, -1);
  }
  function Hb(ee) {
    var se = Gf();
    return typeof ee == "function" && (ee = ee()), se.memoizedState = se.baseState = ee, ee = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nA,
      lastRenderedState: ee
    }, se.queue = ee, ee = ee.dispatch = YD.bind(null, Kl, ee), [se.memoizedState, ee];
  }
  function z3(ee, se, Pe, ot) {
    return ee = {
      tag: ee,
      create: se,
      destroy: Pe,
      deps: ot,
      next: null
    }, se = Kl.updateQueue, se === null ? (se = {
      lastEffect: null,
      stores: null
    }, Kl.updateQueue = se, se.lastEffect = ee.next = ee) : (Pe = se.lastEffect, Pe === null ? se.lastEffect = ee.next = ee : (ot = Pe.next, Pe.next = ee, ee.next = ot, se.lastEffect = ee)), ee;
  }
  function ef() {
    return kg().memoizedState;
  }
  function aA(ee, se, Pe, ot) {
    var Nt = Gf();
    Kl.flags |= ee, Nt.memoizedState = z3(1 | se, Pe, void 0, ot === void 0 ? null : ot);
  }
  function yw(ee, se, Pe, ot) {
    var Nt = kg();
    ot = ot === void 0 ? null : ot;
    var mn = void 0;
    if (Fl !== null) {
      var hr = Fl.memoizedState;
      if (mn = hr.destroy, ot !== null && a0(ot, hr.deps)) {
        Nt.memoizedState = z3(se, Pe, mn, ot);
        return;
      }
    }
    Kl.flags |= ee, Nt.memoizedState = z3(1 | se, Pe, mn, ot);
  }
  function zl(ee, se) {
    return aA(8390656, 8, ee, se);
  }
  function iA(ee, se) {
    return yw(2048, 8, ee, se);
  }
  function v9(ee, se) {
    return yw(4, 2, ee, se);
  }
  function oA(ee, se) {
    return yw(4, 4, ee, se);
  }
  function n1(ee, se) {
    if (typeof se == "function") return ee = ee(), se(ee), function () {
      se(null);
    };
    if (se != null) return ee = ee(), se.current = ee, function () {
      se.current = null;
    };
  }
  function zx(ee, se, Pe) {
    return Pe = Pe != null ? Pe.concat([ee]) : null, yw(4, 4, n1.bind(null, se, ee), Pe);
  }
  function U3() {}
  function $T(ee, se) {
    var Pe = kg();
    se = se === void 0 ? null : se;
    var ot = Pe.memoizedState;
    return ot !== null && se !== null && a0(se, ot[1]) ? ot[0] : (Pe.memoizedState = [ee, se], ee);
  }
  function w9(ee, se) {
    var Pe = kg();
    se = se === void 0 ? null : se;
    var ot = Pe.memoizedState;
    return ot !== null && se !== null && a0(se, ot[1]) ? ot[0] : (ee = ee(), Pe.memoizedState = [ee, se], ee);
  }
  function vI(ee, se, Pe) {
    return (Ed & 21) === 0 ? (ee.baseState && (ee.baseState = !1, Np = !0), ee.memoizedState = Pe) : (aa(Pe, se) || (Pe = ht(), Kl.lanes |= Pe, fA |= Pe, ee.baseState = !0), se);
  }
  function x9(ee, se) {
    var Pe = wn;
    wn = Pe !== 0 && 4 > Pe ? Pe : 4, ee(!0);
    var ot = h_.transition;
    h_.transition = {};
    try {
      ee(!1), se();
    } finally {
      wn = Pe, h_.transition = ot;
    }
  }
  function sA() {
    return kg().memoizedState;
  }
  function GT(ee, se, Pe) {
    var ot = i1(ee);
    if (Pe = {
      lane: ot,
      action: Pe,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, wI(ee)) r1(se, Pe);else if (Pe = _g(ee, se, Pe, ot), Pe !== null) {
      var Nt = Ag();
      Xb(Pe, ee, ot, Nt), _9(Pe, se, ot);
    }
  }
  function YD(ee, se, Pe) {
    var ot = i1(ee),
      Nt = {
        lane: ot,
        action: Pe,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
    if (wI(ee)) r1(se, Nt);else {
      var mn = ee.alternate;
      if (ee.lanes === 0 && (mn === null || mn.lanes === 0) && (mn = se.lastRenderedReducer, mn !== null)) try {
        var hr = se.lastRenderedState,
          ra = mn(hr, Pe);
        if (Nt.hasEagerState = !0, Nt.eagerState = ra, aa(ra, hr)) {
          var ka = se.interleaved;
          ka === null ? (Nt.next = Nt, Fy(se)) : (Nt.next = ka.next, ka.next = Nt), se.interleaved = Nt;
          return;
        }
      } catch {} finally {}
      Pe = _g(ee, se, Nt, ot), Pe !== null && (Nt = Ag(), Xb(Pe, ee, ot, Nt), _9(Pe, se, ot));
    }
  }
  function wI(ee) {
    var se = ee.alternate;
    return ee === Kl || se !== null && se === Kl;
  }
  function r1(ee, se) {
    t1 = p_ = !0;
    var Pe = ee.pending;
    Pe === null ? se.next = se : (se.next = Pe.next, Pe.next = se), ee.pending = se;
  }
  function _9(ee, se, Pe) {
    if ((Pe & 4194240) !== 0) {
      var ot = se.lanes;
      ot &= ee.pendingLanes, Pe |= ot, se.lanes = Pe, Bt(ee, Pe);
    }
  }
  var lA = {
      readContext: n0,
      useCallback: jh,
      useContext: jh,
      useEffect: jh,
      useImperativeHandle: jh,
      useInsertionEffect: jh,
      useLayoutEffect: jh,
      useMemo: jh,
      useReducer: jh,
      useRef: jh,
      useState: jh,
      useDebugValue: jh,
      useDeferredValue: jh,
      useTransition: jh,
      useMutableSource: jh,
      useSyncExternalStore: jh,
      useId: jh,
      unstable_isNewReconciler: !1
    },
    VT = {
      readContext: n0,
      useCallback: function (ee, se) {
        return Gf().memoizedState = [ee, se === void 0 ? null : se], ee;
      },
      useContext: n0,
      useEffect: zl,
      useImperativeHandle: function (ee, se, Pe) {
        return Pe = Pe != null ? Pe.concat([ee]) : null, aA(4194308, 4, n1.bind(null, se, ee), Pe);
      },
      useLayoutEffect: function (ee, se) {
        return aA(4194308, 4, ee, se);
      },
      useInsertionEffect: function (ee, se) {
        return aA(4, 2, ee, se);
      },
      useMemo: function (ee, se) {
        var Pe = Gf();
        return se = se === void 0 ? null : se, ee = ee(), Pe.memoizedState = [ee, se], ee;
      },
      useReducer: function (ee, se, Pe) {
        var ot = Gf();
        return se = Pe !== void 0 ? Pe(se) : se, ot.memoizedState = ot.baseState = se, ee = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ee,
          lastRenderedState: se
        }, ot.queue = ee, ee = ee.dispatch = GT.bind(null, Kl, ee), [ot.memoizedState, ee];
      },
      useRef: function (ee) {
        var se = Gf();
        return ee = {
          current: ee
        }, se.memoizedState = ee;
      },
      useState: Hb,
      useDebugValue: U3,
      useDeferredValue: function (ee) {
        return Gf().memoizedState = ee;
      },
      useTransition: function () {
        var ee = Hb(!1),
          se = ee[0];
        return ee = x9.bind(null, ee[1]), Gf().memoizedState = ee, [se, ee];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (ee, se, Pe) {
        var ot = Kl,
          Nt = Gf();
        if (fl) {
          if (Pe === void 0) throw Error(n(407));
          Pe = Pe();
        } else {
          if (Pe = se(), Dh === null) throw Error(n(349));
          (Ed & 30) !== 0 || Fx(ot, se, Pe);
        }
        Nt.memoizedState = Pe;
        var mn = {
          value: Pe,
          getSnapshot: se
        };
        return Nt.queue = mn, zl(B3.bind(null, ot, mn, ee), [ee]), ot.flags |= 2048, z3(9, O3.bind(null, ot, mn, Pe, se), void 0, null), Pe;
      },
      useId: function () {
        var ee = Gf(),
          se = Dh.identifierPrefix;
        if (fl) {
          var Pe = xd,
            ot = xm;
          Pe = (ot & ~(1 << 32 - Ct(ot) - 1)).toString(32) + Pe, se = ":" + se + "R" + Pe, Pe = Vb++, 0 < Pe && (se += "H" + Pe.toString(32)), se += ":";
        } else Pe = $f++, se = ":" + se + "r" + Pe.toString(32) + ":";
        return ee.memoizedState = se;
      },
      unstable_isNewReconciler: !1
    },
    XD = {
      readContext: n0,
      useCallback: $T,
      useContext: n0,
      useEffect: iA,
      useImperativeHandle: zx,
      useInsertionEffect: v9,
      useLayoutEffect: oA,
      useMemo: w9,
      useReducer: N3,
      useRef: ef,
      useState: function () {
        return N3(nA);
      },
      useDebugValue: U3,
      useDeferredValue: function (ee) {
        var se = kg();
        return vI(se, Fl.memoizedState, ee);
      },
      useTransition: function () {
        var ee = N3(nA)[0],
          se = kg().memoizedState;
        return [ee, se];
      },
      useMutableSource: D3,
      useSyncExternalStore: L3,
      useId: sA,
      unstable_isNewReconciler: !1
    },
    JD = {
      readContext: n0,
      useCallback: $T,
      useContext: n0,
      useEffect: iA,
      useImperativeHandle: zx,
      useInsertionEffect: v9,
      useLayoutEffect: oA,
      useMemo: w9,
      useReducer: j3,
      useRef: ef,
      useState: function () {
        return j3(nA);
      },
      useDebugValue: U3,
      useDeferredValue: function (ee) {
        var se = kg();
        return Fl === null ? se.memoizedState = ee : vI(se, Fl.memoizedState, ee);
      },
      useTransition: function () {
        var ee = j3(nA)[0],
          se = kg().memoizedState;
        return [ee, se];
      },
      useMutableSource: D3,
      useSyncExternalStore: L3,
      useId: sA,
      unstable_isNewReconciler: !1
    };
  function Gy(ee, se) {
    if (ee && ee.defaultProps) {
      se = V({}, se), ee = ee.defaultProps;
      for (var Pe in ee) se[Pe] === void 0 && (se[Pe] = ee[Pe]);
      return se;
    }
    return se;
  }
  function k9(ee, se, Pe, ot) {
    se = ee.memoizedState, Pe = Pe(ot, se), Pe = Pe == null ? se : V({}, se, Pe), ee.memoizedState = Pe, ee.lanes === 0 && (ee.updateQueue.baseState = Pe);
  }
  var $3 = {
    isMounted: function (ee) {
      return (ee = ee._reactInternals) ? vt(ee) === ee : !1;
    },
    enqueueSetState: function (ee, se, Pe) {
      ee = ee._reactInternals;
      var ot = Ag(),
        Nt = i1(ee),
        mn = Nh(ot, Nt);
      mn.payload = se, Pe != null && (mn.callback = Pe), se = zf(ee, mn, Nt), se !== null && (Xb(se, ee, Nt, ot), Zv(se, ee, Nt));
    },
    enqueueReplaceState: function (ee, se, Pe) {
      ee = ee._reactInternals;
      var ot = Ag(),
        Nt = i1(ee),
        mn = Nh(ot, Nt);
      mn.tag = 1, mn.payload = se, Pe != null && (mn.callback = Pe), se = zf(ee, mn, Nt), se !== null && (Xb(se, ee, Nt, ot), Zv(se, ee, Nt));
    },
    enqueueForceUpdate: function (ee, se) {
      ee = ee._reactInternals;
      var Pe = Ag(),
        ot = i1(ee),
        Nt = Nh(Pe, ot);
      Nt.tag = 2, se != null && (Nt.callback = se), se = zf(ee, Nt, ot), se !== null && (Xb(se, ee, ot, Pe), Zv(se, ee, ot));
    }
  };
  function xI(ee, se, Pe, ot, Nt, mn, hr) {
    return ee = ee.stateNode, typeof ee.shouldComponentUpdate == "function" ? ee.shouldComponentUpdate(ot, mn, hr) : se.prototype && se.prototype.isPureReactComponent ? !wa(Pe, ot) || !wa(Nt, mn) : !0;
  }
  function cA(ee, se, Pe) {
    var ot = !1,
      Nt = Kd,
      mn = se.contextType;
    return typeof mn == "object" && mn !== null ? mn = n0(mn) : (Nt = Qd(se) ? Xp : uh.current, ot = se.contextTypes, mn = (ot = ot != null) ? Qm(ee, Nt) : Kd), se = new se(Pe, mn), ee.memoizedState = se.state !== null && se.state !== void 0 ? se.state : null, se.updater = $3, ee.stateNode = se, se._reactInternals = ee, ot && (ee = ee.stateNode, ee.__reactInternalMemoizedUnmaskedChildContext = Nt, ee.__reactInternalMemoizedMaskedChildContext = mn), se;
  }
  function _I(ee, se, Pe, ot) {
    ee = se.state, typeof se.componentWillReceiveProps == "function" && se.componentWillReceiveProps(Pe, ot), typeof se.UNSAFE_componentWillReceiveProps == "function" && se.UNSAFE_componentWillReceiveProps(Pe, ot), se.state !== ee && $3.enqueueReplaceState(se, se.state, null);
  }
  function G3(ee, se, Pe, ot) {
    var Nt = ee.stateNode;
    Nt.props = Pe, Nt.state = ee.memoizedState, Nt.refs = {}, ll(ee);
    var mn = se.contextType;
    typeof mn == "object" && mn !== null ? Nt.context = n0(mn) : (mn = Qd(se) ? Xp : uh.current, Nt.context = Qm(ee, mn)), Nt.state = ee.memoizedState, mn = se.getDerivedStateFromProps, typeof mn == "function" && (k9(ee, se, mn, Pe), Nt.state = ee.memoizedState), typeof se.getDerivedStateFromProps == "function" || typeof Nt.getSnapshotBeforeUpdate == "function" || typeof Nt.UNSAFE_componentWillMount != "function" && typeof Nt.componentWillMount != "function" || (se = Nt.state, typeof Nt.componentWillMount == "function" && Nt.componentWillMount(), typeof Nt.UNSAFE_componentWillMount == "function" && Nt.UNSAFE_componentWillMount(), se !== Nt.state && $3.enqueueReplaceState(Nt, Nt.state, null), gw(ee, Pe, Nt, ot), Nt.state = ee.memoizedState), typeof Nt.componentDidMount == "function" && (ee.flags |= 4194308);
  }
  function Nu(ee, se) {
    try {
      var Pe = "",
        ot = se;
      do Pe += H(ot), ot = ot.return; while (ot);
      var Nt = Pe;
    } catch (mn) {
      Nt = `
Error generating stack: ` + mn.message + `
` + mn.stack;
    }
    return {
      value: ee,
      source: se,
      stack: Nt,
      digest: null
    };
  }
  function Ux(ee, se, Pe) {
    return {
      value: ee,
      source: null,
      stack: Pe ?? null,
      digest: se ?? null
    };
  }
  function HT(ee, se) {
    try {
      console.error(se.value);
    } catch (Pe) {
      setTimeout(function () {
        throw Pe;
      });
    }
  }
  var Vy = typeof WeakMap == "function" ? WeakMap : Map;
  function A9(ee, se, Pe) {
    Pe = Nh(-1, Pe), Pe.tag = 3, Pe.payload = {
      element: null
    };
    var ot = se.value;
    return Pe.callback = function () {
      _w || (_w = !0, Q3 = ot), HT(ee, se);
    }, Pe;
  }
  function S9(ee, se, Pe) {
    Pe = Nh(-1, Pe), Pe.tag = 3;
    var ot = ee.type.getDerivedStateFromError;
    if (typeof ot == "function") {
      var Nt = se.value;
      Pe.payload = function () {
        return ot(Nt);
      }, Pe.callback = function () {
        HT(ee, se);
      };
    }
    var mn = ee.stateNode;
    return mn !== null && typeof mn.componentDidCatch == "function" && (Pe.callback = function () {
      HT(ee, se), typeof ot != "function" && (Qb === null ? Qb = new Set([this]) : Qb.add(this));
      var hr = se.stack;
      this.componentDidCatch(se.value, {
        componentStack: hr !== null ? hr : ""
      });
    }), Pe;
  }
  function $x(ee, se, Pe) {
    var ot = ee.pingCache;
    if (ot === null) {
      ot = ee.pingCache = new Vy();
      var Nt = new Set();
      ot.set(se, Nt);
    } else Nt = ot.get(se), Nt === void 0 && (Nt = new Set(), ot.set(se, Nt));
    Nt.has(Pe) || (Nt.add(Pe), ee = L9.bind(null, ee, se, Pe), se.then(ee, ee));
  }
  function dA(ee) {
    do {
      var se;
      if ((se = ee.tag === 13) && (se = ee.memoizedState, se = se !== null ? se.dehydrated !== null : !0), se) return ee;
      ee = ee.return;
    } while (ee !== null);
    return null;
  }
  function WT(ee, se, Pe, ot, Nt) {
    return (ee.mode & 1) === 0 ? (ee === se ? ee.flags |= 65536 : (ee.flags |= 128, Pe.flags |= 131072, Pe.flags &= -52805, Pe.tag === 1 && (Pe.alternate === null ? Pe.tag = 17 : (se = Nh(-1, 1), se.tag = 2, zf(Pe, se, 1))), Pe.lanes |= 1), ee) : (ee.flags |= 65536, ee.lanes = Nt, ee);
  }
  var Gx = k.ReactCurrentOwner,
    Np = !1;
  function Bc(ee, se, Pe, ot) {
    se.child = ee === null ? Bo(se, null, Pe, ot) : fi(se, ee.child, Pe, ot);
  }
  function qT(ee, se, Pe, ot, Nt) {
    Pe = Pe.render;
    var mn = se.ref;
    return Ff(se, Nt), ot = Bx(ee, se, Pe, ot, mn, Nt), Pe = m_(), ee !== null && !Np ? (se.updateQueue = ee.updateQueue, se.flags &= -2053, ee.lanes &= ~Nt, z0(ee, se, Nt)) : (fl && Pe && Zs(se), se.flags |= 1, Bc(ee, se, ot, Nt), se.child);
  }
  function KT(ee, se, Pe, ot, Nt) {
    if (ee === null) {
      var mn = Pe.type;
      return typeof mn == "function" && !t4(mn) && mn.defaultProps === void 0 && Pe.compare === null && Pe.defaultProps === void 0 ? (se.tag = 15, se.type = mn, kI(ee, se, mn, ot, Nt)) : (ee = v_(Pe.type, null, ot, se, se.mode, Nt), ee.ref = se.ref, ee.return = se, se.child = ee);
    }
    if (mn = ee.child, (ee.lanes & Nt) === 0) {
      var hr = mn.memoizedProps;
      if (Pe = Pe.compare, Pe = Pe !== null ? Pe : wa, Pe(hr, ot) && ee.ref === se.ref) return z0(ee, se, Nt);
    }
    return se.flags |= 1, ee = Zb(mn, ot), ee.ref = se.ref, ee.return = se, se.child = ee;
  }
  function kI(ee, se, Pe, ot, Nt) {
    if (ee !== null) {
      var mn = ee.memoizedProps;
      if (wa(mn, ot) && ee.ref === se.ref) if (Np = !1, se.pendingProps = ot = mn, (ee.lanes & Nt) !== 0) (ee.flags & 131072) !== 0 && (Np = !0);else return se.lanes = ee.lanes, z0(ee, se, Nt);
    }
    return Wb(ee, se, Pe, ot, Nt);
  }
  function jp(ee, se, Pe) {
    var ot = se.pendingProps,
      Nt = ot.children,
      mn = ee !== null ? ee.memoizedState : null;
    if (ot.mode === "hidden") {
      if ((se.mode & 1) === 0) se.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, ql(mA, qy), qy |= Pe;else {
        if ((Pe & 1073741824) === 0) return ee = mn !== null ? mn.baseLanes | Pe : Pe, se.lanes = se.childLanes = 1073741824, se.memoizedState = {
          baseLanes: ee,
          cachePool: null,
          transitions: null
        }, se.updateQueue = null, ql(mA, qy), qy |= ee, null;
        se.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }, ot = mn !== null ? mn.baseLanes : Pe, ql(mA, qy), qy |= ot;
      }
    } else mn !== null ? (ot = mn.baseLanes | Pe, se.memoizedState = null) : ot = Pe, ql(mA, qy), qy |= ot;
    return Bc(ee, se, Nt, Pe), se.child;
  }
  function i0(ee, se) {
    var Pe = se.ref;
    (ee === null && Pe !== null || ee !== null && ee.ref !== Pe) && (se.flags |= 512, se.flags |= 2097152);
  }
  function Wb(ee, se, Pe, ot, Nt) {
    var mn = Qd(Pe) ? Xp : uh.current;
    return mn = Qm(se, mn), Ff(se, Nt), Pe = Bx(ee, se, Pe, ot, mn, Nt), ot = m_(), ee !== null && !Np ? (se.updateQueue = ee.updateQueue, se.flags &= -2053, ee.lanes &= ~Nt, z0(ee, se, Nt)) : (fl && ot && Zs(se), se.flags |= 1, Bc(ee, se, Pe, Nt), se.child);
  }
  function Us(ee, se, Pe, ot, Nt) {
    if (Qd(Pe)) {
      var mn = !0;
      td(se);
    } else mn = !1;
    if (Ff(se, Nt), se.stateNode === null) em(ee, se), cA(se, Pe, ot), G3(se, Pe, ot, Nt), ot = !0;else if (ee === null) {
      var hr = se.stateNode,
        ra = se.memoizedProps;
      hr.props = ra;
      var ka = hr.context,
        ti = Pe.contextType;
      typeof ti == "object" && ti !== null ? ti = n0(ti) : (ti = Qd(Pe) ? Xp : uh.current, ti = Qm(se, ti));
      var Li = Pe.getDerivedStateFromProps,
        zi = typeof Li == "function" || typeof hr.getSnapshotBeforeUpdate == "function";
      zi || typeof hr.UNSAFE_componentWillReceiveProps != "function" && typeof hr.componentWillReceiveProps != "function" || (ra !== ot || ka !== ti) && _I(se, hr, ot, ti), F0 = !1;
      var Ni = se.memoizedState;
      hr.state = Ni, gw(se, ot, hr, Nt), ka = se.memoizedState, ra !== ot || Ni !== ka || Lc.current || F0 ? (typeof Li == "function" && (k9(se, Pe, Li, ot), ka = se.memoizedState), (ra = F0 || xI(se, Pe, ra, ot, Ni, ka, ti)) ? (zi || typeof hr.UNSAFE_componentWillMount != "function" && typeof hr.componentWillMount != "function" || (typeof hr.componentWillMount == "function" && hr.componentWillMount(), typeof hr.UNSAFE_componentWillMount == "function" && hr.UNSAFE_componentWillMount()), typeof hr.componentDidMount == "function" && (se.flags |= 4194308)) : (typeof hr.componentDidMount == "function" && (se.flags |= 4194308), se.memoizedProps = ot, se.memoizedState = ka), hr.props = ot, hr.state = ka, hr.context = ti, ot = ra) : (typeof hr.componentDidMount == "function" && (se.flags |= 4194308), ot = !1);
    } else {
      hr = se.stateNode, zy(ee, se), ra = se.memoizedProps, ti = se.type === se.elementType ? ra : Gy(se.type, ra), hr.props = ti, zi = se.pendingProps, Ni = hr.context, ka = Pe.contextType, typeof ka == "object" && ka !== null ? ka = n0(ka) : (ka = Qd(Pe) ? Xp : uh.current, ka = Qm(se, ka));
      var Io = Pe.getDerivedStateFromProps;
      (Li = typeof Io == "function" || typeof hr.getSnapshotBeforeUpdate == "function") || typeof hr.UNSAFE_componentWillReceiveProps != "function" && typeof hr.componentWillReceiveProps != "function" || (ra !== zi || Ni !== ka) && _I(se, hr, ot, ka), F0 = !1, Ni = se.memoizedState, hr.state = Ni, gw(se, ot, hr, Nt);
      var zo = se.memoizedState;
      ra !== zi || Ni !== zo || Lc.current || F0 ? (typeof Io == "function" && (k9(se, Pe, Io, ot), zo = se.memoizedState), (ti = F0 || xI(se, Pe, ti, ot, Ni, zo, ka) || !1) ? (Li || typeof hr.UNSAFE_componentWillUpdate != "function" && typeof hr.componentWillUpdate != "function" || (typeof hr.componentWillUpdate == "function" && hr.componentWillUpdate(ot, zo, ka), typeof hr.UNSAFE_componentWillUpdate == "function" && hr.UNSAFE_componentWillUpdate(ot, zo, ka)), typeof hr.componentDidUpdate == "function" && (se.flags |= 4), typeof hr.getSnapshotBeforeUpdate == "function" && (se.flags |= 1024)) : (typeof hr.componentDidUpdate != "function" || ra === ee.memoizedProps && Ni === ee.memoizedState || (se.flags |= 4), typeof hr.getSnapshotBeforeUpdate != "function" || ra === ee.memoizedProps && Ni === ee.memoizedState || (se.flags |= 1024), se.memoizedProps = ot, se.memoizedState = zo), hr.props = ot, hr.state = zo, hr.context = ka, ot = ti) : (typeof hr.componentDidUpdate != "function" || ra === ee.memoizedProps && Ni === ee.memoizedState || (se.flags |= 4), typeof hr.getSnapshotBeforeUpdate != "function" || ra === ee.memoizedProps && Ni === ee.memoizedState || (se.flags |= 1024), ot = !1);
    }
    return rs(ee, se, Pe, ot, mn, Nt);
  }
  function rs(ee, se, Pe, ot, Nt, mn) {
    i0(ee, se);
    var hr = (se.flags & 128) !== 0;
    if (!ot && !hr) return Nt && Ym(se, Pe, !1), z0(ee, se, mn);
    ot = se.stateNode, Gx.current = se;
    var ra = hr && typeof Pe.getDerivedStateFromError != "function" ? null : ot.render();
    return se.flags |= 1, ee !== null && hr ? (se.child = fi(se, ee.child, null, mn), se.child = fi(se, null, ra, mn)) : Bc(ee, se, ra, mn), se.memoizedState = ot.state, Nt && Ym(se, Pe, !0), se.child;
  }
  function V3(ee) {
    var se = ee.stateNode;
    se.pendingContext ? $b(ee, se.pendingContext, se.pendingContext !== se.context) : se.context && $b(ee, se.context, !1), np(ee, se.containerInfo);
  }
  function I9(ee, se, Pe, ot, Nt) {
    return dn(), Xn(Nt), se.flags |= 256, Bc(ee, se, Pe, ot), se.child;
  }
  var uA = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
  };
  function a1(ee) {
    return {
      baseLanes: ee,
      cachePool: null,
      transitions: null
    };
  }
  function ZD(ee, se, Pe) {
    var ot = se.pendingProps,
      Nt = Yd.current,
      mn = !1,
      hr = (se.flags & 128) !== 0,
      ra;
    if ((ra = hr) || (ra = ee !== null && ee.memoizedState === null ? !1 : (Nt & 2) !== 0), ra ? (mn = !0, se.flags &= -129) : (ee === null || ee.memoizedState !== null) && (Nt |= 1), ql(Yd, Nt & 1), ee === null) return Se(se), ee = se.memoizedState, ee !== null && (ee = ee.dehydrated, ee !== null) ? ((se.mode & 1) === 0 ? se.lanes = 1 : ee.data === "$!" ? se.lanes = 8 : se.lanes = 1073741824, null) : (hr = ot.children, ee = ot.fallback, mn ? (ot = se.mode, mn = se.child, hr = {
      mode: "hidden",
      children: hr
    }, (ot & 1) === 0 && mn !== null ? (mn.childLanes = 0, mn.pendingProps = hr) : mn = n4(hr, ot, 0, null), ee = Qx(ee, ot, Pe, null), mn.return = se, ee.return = se, mn.sibling = ee, se.child = mn, se.child.memoizedState = a1(Pe), se.memoizedState = uA, ee) : AI(se, hr));
    if (Nt = ee.memoizedState, Nt !== null && (ra = Nt.dehydrated, ra !== null)) return eL(ee, se, hr, ot, ra, Nt, Pe);
    if (mn) {
      mn = ot.fallback, hr = se.mode, Nt = ee.child, ra = Nt.sibling;
      var ka = {
        mode: "hidden",
        children: ot.children
      };
      return (hr & 1) === 0 && se.child !== Nt ? (ot = se.child, ot.childLanes = 0, ot.pendingProps = ka, se.deletions = null) : (ot = Zb(Nt, ka), ot.subtreeFlags = Nt.subtreeFlags & 14680064), ra !== null ? mn = Zb(ra, mn) : (mn = Qx(mn, hr, Pe, null), mn.flags |= 2), mn.return = se, ot.return = se, ot.sibling = mn, se.child = ot, ot = mn, mn = se.child, hr = ee.child.memoizedState, hr = hr === null ? a1(Pe) : {
        baseLanes: hr.baseLanes | Pe,
        cachePool: null,
        transitions: hr.transitions
      }, mn.memoizedState = hr, mn.childLanes = ee.childLanes & ~Pe, se.memoizedState = uA, ot;
    }
    return mn = ee.child, ee = mn.sibling, ot = Zb(mn, {
      mode: "visible",
      children: ot.children
    }), (se.mode & 1) === 0 && (ot.lanes = Pe), ot.return = se, ot.sibling = null, ee !== null && (Pe = se.deletions, Pe === null ? (se.deletions = [ee], se.flags |= 16) : Pe.push(ee)), se.child = ot, se.memoizedState = null, ot;
  }
  function AI(ee, se) {
    return se = n4({
      mode: "visible",
      children: se
    }, ee.mode, 0, null), se.return = ee, ee.child = se;
  }
  function Vx(ee, se, Pe, ot) {
    return ot !== null && Xn(ot), fi(se, ee.child, null, Pe), ee = AI(se, se.pendingProps.children), ee.flags |= 2, se.memoizedState = null, ee;
  }
  function eL(ee, se, Pe, ot, Nt, mn, hr) {
    if (Pe) return se.flags & 256 ? (se.flags &= -257, ot = Ux(Error(n(422))), Vx(ee, se, hr, ot)) : se.memoizedState !== null ? (se.child = ee.child, se.flags |= 128, null) : (mn = ot.fallback, Nt = se.mode, ot = n4({
      mode: "visible",
      children: ot.children
    }, Nt, 0, null), mn = Qx(mn, Nt, hr, null), mn.flags |= 2, ot.return = se, mn.return = se, ot.sibling = mn, se.child = ot, (se.mode & 1) !== 0 && fi(se, ee.child, null, hr), se.child.memoizedState = a1(hr), se.memoizedState = uA, mn);
    if ((se.mode & 1) === 0) return Vx(ee, se, hr, null);
    if (Nt.data === "$!") {
      if (ot = Nt.nextSibling && Nt.nextSibling.dataset, ot) var ra = ot.dgst;
      return ot = ra, mn = Error(n(419)), ot = Ux(mn, ot, void 0), Vx(ee, se, hr, ot);
    }
    if (ra = (hr & ee.childLanes) !== 0, Np || ra) {
      if (ot = Dh, ot !== null) {
        switch (hr & -hr) {
          case 4:
            Nt = 2;
            break;
          case 16:
            Nt = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            Nt = 32;
            break;
          case 536870912:
            Nt = 268435456;
            break;
          default:
            Nt = 0;
        }
        Nt = (Nt & (ot.suspendedLanes | hr)) !== 0 ? 0 : Nt, Nt !== 0 && Nt !== mn.retryLane && (mn.retryLane = Nt, Zm(ee, Nt), Xb(ot, ee, Nt, -1));
      }
      return Z3(), ot = Ux(Error(n(421))), Vx(ee, se, hr, ot);
    }
    return Nt.data === "$?" ? (se.flags |= 128, se.child = ee.child, se = O9.bind(null, ee), Nt._reactRetry = se, null) : (ee = mn.treeContext, Xo = yu(Nt.nextSibling), Qs = se, fl = !0, Oc = null, ee !== null && (uc[ep++] = xm, uc[ep++] = xd, uc[ep++] = tp, xm = ee.id, xd = ee.overflow, tp = se), se = AI(se, ot.children), se.flags |= 4096, se);
  }
  function H3(ee, se, Pe) {
    ee.lanes |= se;
    var ot = ee.alternate;
    ot !== null && (ot.lanes |= se), O0(ee.return, se, Pe);
  }
  function QT(ee, se, Pe, ot, Nt) {
    var mn = ee.memoizedState;
    mn === null ? ee.memoizedState = {
      isBackwards: se,
      rendering: null,
      renderingStartTime: 0,
      last: ot,
      tail: Pe,
      tailMode: Nt
    } : (mn.isBackwards = se, mn.rendering = null, mn.renderingStartTime = 0, mn.last = ot, mn.tail = Pe, mn.tailMode = Nt);
  }
  function hA(ee, se, Pe) {
    var ot = se.pendingProps,
      Nt = ot.revealOrder,
      mn = ot.tail;
    if (Bc(ee, se, ot.children, Pe), ot = Yd.current, (ot & 2) !== 0) ot = ot & 1 | 2, se.flags |= 128;else {
      if (ee !== null && (ee.flags & 128) !== 0) e: for (ee = se.child; ee !== null;) {
        if (ee.tag === 13) ee.memoizedState !== null && H3(ee, Pe, se);else if (ee.tag === 19) H3(ee, Pe, se);else if (ee.child !== null) {
          ee.child.return = ee, ee = ee.child;
          continue;
        }
        if (ee === se) break e;
        for (; ee.sibling === null;) {
          if (ee.return === null || ee.return === se) break e;
          ee = ee.return;
        }
        ee.sibling.return = ee.return, ee = ee.sibling;
      }
      ot &= 1;
    }
    if (ql(Yd, ot), (se.mode & 1) === 0) se.memoizedState = null;else switch (Nt) {
      case "forwards":
        for (Pe = se.child, Nt = null; Pe !== null;) ee = Pe.alternate, ee !== null && r0(ee) === null && (Nt = Pe), Pe = Pe.sibling;
        Pe = Nt, Pe === null ? (Nt = se.child, se.child = null) : (Nt = Pe.sibling, Pe.sibling = null), QT(se, !1, Nt, Pe, mn);
        break;
      case "backwards":
        for (Pe = null, Nt = se.child, se.child = null; Nt !== null;) {
          if (ee = Nt.alternate, ee !== null && r0(ee) === null) {
            se.child = Nt;
            break;
          }
          ee = Nt.sibling, Nt.sibling = Pe, Pe = Nt, Nt = ee;
        }
        QT(se, !0, Pe, null, mn);
        break;
      case "together":
        QT(se, !1, null, null, void 0);
        break;
      default:
        se.memoizedState = null;
    }
    return se.child;
  }
  function em(ee, se) {
    (se.mode & 1) === 0 && ee !== null && (ee.alternate = null, se.alternate = null, se.flags |= 2);
  }
  function z0(ee, se, Pe) {
    if (ee !== null && (se.dependencies = ee.dependencies), fA |= se.lanes, (Pe & se.childLanes) === 0) return null;
    if (ee !== null && se.child !== ee.child) throw Error(n(153));
    if (se.child !== null) {
      for (ee = se.child, Pe = Zb(ee, ee.pendingProps), se.child = Pe, Pe.return = se; ee.sibling !== null;) ee = ee.sibling, Pe = Pe.sibling = Zb(ee, ee.pendingProps), Pe.return = se;
      Pe.sibling = null;
    }
    return se.child;
  }
  function C9(ee, se, Pe) {
    switch (se.tag) {
      case 3:
        V3(se), dn();
        break;
      case 5:
        Uy(se);
        break;
      case 1:
        Qd(se.type) && td(se);
        break;
      case 4:
        np(se, se.stateNode.containerInfo);
        break;
      case 10:
        var ot = se.type._context,
          Nt = se.memoizedProps.value;
        ql(sl, ot._currentValue), ot._currentValue = Nt;
        break;
      case 13:
        if (ot = se.memoizedState, ot !== null) return ot.dehydrated !== null ? (ql(Yd, Yd.current & 1), se.flags |= 128, null) : (Pe & se.child.childLanes) !== 0 ? ZD(ee, se, Pe) : (ql(Yd, Yd.current & 1), ee = z0(ee, se, Pe), ee !== null ? ee.sibling : null);
        ql(Yd, Yd.current & 1);
        break;
      case 19:
        if (ot = (Pe & se.childLanes) !== 0, (ee.flags & 128) !== 0) {
          if (ot) return hA(ee, se, Pe);
          se.flags |= 128;
        }
        if (Nt = se.memoizedState, Nt !== null && (Nt.rendering = null, Nt.tail = null, Nt.lastEffect = null), ql(Yd, Yd.current), ot) break;
        return null;
      case 22:
      case 23:
        return se.lanes = 0, jp(ee, se, Pe);
    }
    return z0(ee, se, Pe);
  }
  var xG, bw, E9, vw;
  xG = function (ee, se) {
    for (var Pe = se.child; Pe !== null;) {
      if (Pe.tag === 5 || Pe.tag === 6) ee.appendChild(Pe.stateNode);else if (Pe.tag !== 4 && Pe.child !== null) {
        Pe.child.return = Pe, Pe = Pe.child;
        continue;
      }
      if (Pe === se) break;
      for (; Pe.sibling === null;) {
        if (Pe.return === null || Pe.return === se) return;
        Pe = Pe.return;
      }
      Pe.sibling.return = Pe.return, Pe = Pe.sibling;
    }
  }, bw = function () {}, E9 = function (ee, se, Pe, ot) {
    var Nt = ee.memoizedProps;
    if (Nt !== ot) {
      ee = se.stateNode, Uf(cd.current);
      var mn = null;
      switch (Pe) {
        case "input":
          Nt = J(ee, Nt), ot = J(ee, ot), mn = [];
          break;
        case "select":
          Nt = V({}, Nt, {
            value: void 0
          }), ot = V({}, ot, {
            value: void 0
          }), mn = [];
          break;
        case "textarea":
          Nt = ye(ee, Nt), ot = ye(ee, ot), mn = [];
          break;
        default:
          typeof Nt.onClick != "function" && typeof ot.onClick == "function" && (ee.onclick = ls);
      }
      me(Pe, ot);
      var hr;
      Pe = null;
      for (ti in Nt) if (!ot.hasOwnProperty(ti) && Nt.hasOwnProperty(ti) && Nt[ti] != null) if (ti === "style") {
        var ra = Nt[ti];
        for (hr in ra) ra.hasOwnProperty(hr) && (Pe || (Pe = {}), Pe[hr] = "");
      } else ti !== "dangerouslySetInnerHTML" && ti !== "children" && ti !== "suppressContentEditableWarning" && ti !== "suppressHydrationWarning" && ti !== "autoFocus" && (a.hasOwnProperty(ti) ? mn || (mn = []) : (mn = mn || []).push(ti, null));
      for (ti in ot) {
        var ka = ot[ti];
        if (ra = Nt != null ? Nt[ti] : void 0, ot.hasOwnProperty(ti) && ka !== ra && (ka != null || ra != null)) if (ti === "style") {
          if (ra) {
            for (hr in ra) !ra.hasOwnProperty(hr) || ka && ka.hasOwnProperty(hr) || (Pe || (Pe = {}), Pe[hr] = "");
            for (hr in ka) ka.hasOwnProperty(hr) && ra[hr] !== ka[hr] && (Pe || (Pe = {}), Pe[hr] = ka[hr]);
          } else Pe || (mn || (mn = []), mn.push(ti, Pe)), Pe = ka;
        } else ti === "dangerouslySetInnerHTML" ? (ka = ka ? ka.__html : void 0, ra = ra ? ra.__html : void 0, ka != null && ra !== ka && (mn = mn || []).push(ti, ka)) : ti === "children" ? typeof ka != "string" && typeof ka != "number" || (mn = mn || []).push(ti, "" + ka) : ti !== "suppressContentEditableWarning" && ti !== "suppressHydrationWarning" && (a.hasOwnProperty(ti) ? (ka != null && ti === "onScroll" && Ta("scroll", ee), mn || ra === ka || (mn = [])) : (mn = mn || []).push(ti, ka));
      }
      Pe && (mn = mn || []).push("style", Pe);
      var ti = mn;
      (se.updateQueue = ti) && (se.flags |= 4);
    }
  }, vw = function (ee, se, Pe, ot) {
    Pe !== ot && (se.flags |= 4);
  };
  function pA(ee, se) {
    if (!fl) switch (ee.tailMode) {
      case "hidden":
        se = ee.tail;
        for (var Pe = null; se !== null;) se.alternate !== null && (Pe = se), se = se.sibling;
        Pe === null ? ee.tail = null : Pe.sibling = null;
        break;
      case "collapsed":
        Pe = ee.tail;
        for (var ot = null; Pe !== null;) Pe.alternate !== null && (ot = Pe), Pe = Pe.sibling;
        ot === null ? se || ee.tail === null ? ee.tail = null : ee.tail.sibling = null : ot.sibling = null;
    }
  }
  function tf(ee) {
    var se = ee.alternate !== null && ee.alternate.child === ee.child,
      Pe = 0,
      ot = 0;
    if (se) for (var Nt = ee.child; Nt !== null;) Pe |= Nt.lanes | Nt.childLanes, ot |= Nt.subtreeFlags & 14680064, ot |= Nt.flags & 14680064, Nt.return = ee, Nt = Nt.sibling;else for (Nt = ee.child; Nt !== null;) Pe |= Nt.lanes | Nt.childLanes, ot |= Nt.subtreeFlags, ot |= Nt.flags, Nt.return = ee, Nt = Nt.sibling;
    return ee.subtreeFlags |= ot, ee.childLanes = Pe, se;
  }
  function tL(ee, se, Pe) {
    var ot = se.pendingProps;
    switch (Wo(se), se.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return tf(se), null;
      case 1:
        return Qd(se.type) && Xv(), tf(se), null;
      case 3:
        return ot = se.stateNode, ns(), Bl(Lc), Bl(uh), UT(), ot.pendingContext && (ot.context = ot.pendingContext, ot.pendingContext = null), (ee === null || ee.child === null) && (Je(se) ? se.flags |= 4 : ee === null || ee.memoizedState.isDehydrated && (se.flags & 256) === 0 || (se.flags |= 1024, Oc !== null && (qx(Oc), Oc = null))), bw(ee, se), tf(se), null;
      case 5:
        Ox(se);
        var Nt = Uf(e1.current);
        if (Pe = se.type, ee !== null && se.stateNode != null) E9(ee, se, Pe, ot, Nt), ee.ref !== se.ref && (se.flags |= 512, se.flags |= 2097152);else {
          if (!ot) {
            if (se.stateNode === null) throw Error(n(166));
            return tf(se), null;
          }
          if (ee = Uf(cd.current), Je(se)) {
            ot = se.stateNode, Pe = se.type;
            var mn = se.memoizedProps;
            switch (ot[xi] = se, ot[ld] = mn, ee = (se.mode & 1) !== 0, Pe) {
              case "dialog":
                Ta("cancel", ot), Ta("close", ot);
                break;
              case "iframe":
              case "object":
              case "embed":
                Ta("load", ot);
                break;
              case "video":
              case "audio":
                for (Nt = 0; Nt < Ml.length; Nt++) Ta(Ml[Nt], ot);
                break;
              case "source":
                Ta("error", ot);
                break;
              case "img":
              case "image":
              case "link":
                Ta("error", ot), Ta("load", ot);
                break;
              case "details":
                Ta("toggle", ot);
                break;
              case "input":
                pe(ot, mn), Ta("invalid", ot);
                break;
              case "select":
                ot._wrapperState = {
                  wasMultiple: !!mn.multiple
                }, Ta("invalid", ot);
                break;
              case "textarea":
                ie(ot, mn), Ta("invalid", ot);
            }
            me(Pe, mn), Nt = null;
            for (var hr in mn) if (mn.hasOwnProperty(hr)) {
              var ra = mn[hr];
              hr === "children" ? typeof ra == "string" ? ot.textContent !== ra && (mn.suppressHydrationWarning !== !0 && co(ot.textContent, ra, ee), Nt = ["children", ra]) : typeof ra == "number" && ot.textContent !== "" + ra && (mn.suppressHydrationWarning !== !0 && co(ot.textContent, ra, ee), Nt = ["children", "" + ra]) : a.hasOwnProperty(hr) && ra != null && hr === "onScroll" && Ta("scroll", ot);
            }
            switch (Pe) {
              case "input":
                ne(ot), X(ot, mn, !0);
                break;
              case "textarea":
                ne(ot), be(ot);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof mn.onClick == "function" && (ot.onclick = ls);
            }
            ot = Nt, se.updateQueue = ot, ot !== null && (se.flags |= 4);
          } else {
            hr = Nt.nodeType === 9 ? Nt : Nt.ownerDocument, ee === "http://www.w3.org/1999/xhtml" && (ee = Ee(Pe)), ee === "http://www.w3.org/1999/xhtml" ? Pe === "script" ? (ee = hr.createElement("div"), ee.innerHTML = "<script><\/script>", ee = ee.removeChild(ee.firstChild)) : typeof ot.is == "string" ? ee = hr.createElement(Pe, {
              is: ot.is
            }) : (ee = hr.createElement(Pe), Pe === "select" && (hr = ee, ot.multiple ? hr.multiple = !0 : ot.size && (hr.size = ot.size))) : ee = hr.createElementNS(ee, Pe), ee[xi] = se, ee[ld] = ot, xG(ee, se, !1, !1), se.stateNode = ee;
            e: {
              switch (hr = Ae(Pe, ot), Pe) {
                case "dialog":
                  Ta("cancel", ee), Ta("close", ee), Nt = ot;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Ta("load", ee), Nt = ot;
                  break;
                case "video":
                case "audio":
                  for (Nt = 0; Nt < Ml.length; Nt++) Ta(Ml[Nt], ee);
                  Nt = ot;
                  break;
                case "source":
                  Ta("error", ee), Nt = ot;
                  break;
                case "img":
                case "image":
                case "link":
                  Ta("error", ee), Ta("load", ee), Nt = ot;
                  break;
                case "details":
                  Ta("toggle", ee), Nt = ot;
                  break;
                case "input":
                  pe(ee, ot), Nt = J(ee, ot), Ta("invalid", ee);
                  break;
                case "option":
                  Nt = ot;
                  break;
                case "select":
                  ee._wrapperState = {
                    wasMultiple: !!ot.multiple
                  }, Nt = V({}, ot, {
                    value: void 0
                  }), Ta("invalid", ee);
                  break;
                case "textarea":
                  ie(ee, ot), Nt = ye(ee, ot), Ta("invalid", ee);
                  break;
                default:
                  Nt = ot;
              }
              me(Pe, Nt), ra = Nt;
              for (mn in ra) if (ra.hasOwnProperty(mn)) {
                var ka = ra[mn];
                mn === "style" ? Te(ee, ka) : mn === "dangerouslySetInnerHTML" ? (ka = ka ? ka.__html : void 0, ka != null && ue(ee, ka)) : mn === "children" ? typeof ka == "string" ? (Pe !== "textarea" || ka !== "") && ge(ee, ka) : typeof ka == "number" && ge(ee, "" + ka) : mn !== "suppressContentEditableWarning" && mn !== "suppressHydrationWarning" && mn !== "autoFocus" && (a.hasOwnProperty(mn) ? ka != null && mn === "onScroll" && Ta("scroll", ee) : ka != null && w(ee, mn, ka, hr));
              }
              switch (Pe) {
                case "input":
                  ne(ee), X(ee, ot, !1);
                  break;
                case "textarea":
                  ne(ee), be(ee);
                  break;
                case "option":
                  ot.value != null && ee.setAttribute("value", "" + W(ot.value));
                  break;
                case "select":
                  ee.multiple = !!ot.multiple, mn = ot.value, mn != null ? fe(ee, !!ot.multiple, mn, !1) : ot.defaultValue != null && fe(ee, !!ot.multiple, ot.defaultValue, !0);
                  break;
                default:
                  typeof Nt.onClick == "function" && (ee.onclick = ls);
              }
              switch (Pe) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  ot = !!ot.autoFocus;
                  break e;
                case "img":
                  ot = !0;
                  break e;
                default:
                  ot = !1;
              }
            }
            ot && (se.flags |= 4);
          }
          se.ref !== null && (se.flags |= 512, se.flags |= 2097152);
        }
        return tf(se), null;
      case 6:
        if (ee && se.stateNode != null) vw(ee, se, ee.memoizedProps, ot);else {
          if (typeof ot != "string" && se.stateNode === null) throw Error(n(166));
          if (Pe = Uf(e1.current), Uf(cd.current), Je(se)) {
            if (ot = se.stateNode, Pe = se.memoizedProps, ot[xi] = se, (mn = ot.nodeValue !== Pe) && (ee = Qs, ee !== null)) switch (ee.tag) {
              case 3:
                co(ot.nodeValue, Pe, (ee.mode & 1) !== 0);
                break;
              case 5:
                ee.memoizedProps.suppressHydrationWarning !== !0 && co(ot.nodeValue, Pe, (ee.mode & 1) !== 0);
            }
            mn && (se.flags |= 4);
          } else ot = (Pe.nodeType === 9 ? Pe : Pe.ownerDocument).createTextNode(ot), ot[xi] = se, se.stateNode = ot;
        }
        return tf(se), null;
      case 13:
        if (Bl(Yd), ot = se.memoizedState, ee === null || ee.memoizedState !== null && ee.memoizedState.dehydrated !== null) {
          if (fl && Xo !== null && (se.mode & 1) !== 0 && (se.flags & 128) === 0) ut(), dn(), se.flags |= 98560, mn = !1;else if (mn = Je(se), ot !== null && ot.dehydrated !== null) {
            if (ee === null) {
              if (!mn) throw Error(n(318));
              if (mn = se.memoizedState, mn = mn !== null ? mn.dehydrated : null, !mn) throw Error(n(317));
              mn[xi] = se;
            } else dn(), (se.flags & 128) === 0 && (se.memoizedState = null), se.flags |= 4;
            tf(se), mn = !1;
          } else Oc !== null && (qx(Oc), Oc = null), mn = !0;
          if (!mn) return se.flags & 65536 ? se : null;
        }
        return (se.flags & 128) !== 0 ? (se.lanes = Pe, se) : (ot = ot !== null, ot !== (ee !== null && ee.memoizedState !== null) && ot && (se.child.flags |= 8192, (se.mode & 1) !== 0 && (ee === null || (Yd.current & 1) !== 0 ? nm === 0 && (nm = 3) : Z3())), se.updateQueue !== null && (se.flags |= 4), tf(se), null);
      case 4:
        return ns(), bw(ee, se), ee === null && wi(se.stateNode.containerInfo), tf(se), null;
      case 10:
        return Jv(se.type._context), tf(se), null;
      case 17:
        return Qd(se.type) && Xv(), tf(se), null;
      case 19:
        if (Bl(Yd), mn = se.memoizedState, mn === null) return tf(se), null;
        if (ot = (se.flags & 128) !== 0, hr = mn.rendering, hr === null) {
          if (ot) pA(mn, !1);else {
            if (nm !== 0 || ee !== null && (ee.flags & 128) !== 0) for (ee = se.child; ee !== null;) {
              if (hr = r0(ee), hr !== null) {
                for (se.flags |= 128, pA(mn, !1), ot = hr.updateQueue, ot !== null && (se.updateQueue = ot, se.flags |= 4), se.subtreeFlags = 0, ot = Pe, Pe = se.child; Pe !== null;) mn = Pe, ee = ot, mn.flags &= 14680066, hr = mn.alternate, hr === null ? (mn.childLanes = 0, mn.lanes = ee, mn.child = null, mn.subtreeFlags = 0, mn.memoizedProps = null, mn.memoizedState = null, mn.updateQueue = null, mn.dependencies = null, mn.stateNode = null) : (mn.childLanes = hr.childLanes, mn.lanes = hr.lanes, mn.child = hr.child, mn.subtreeFlags = 0, mn.deletions = null, mn.memoizedProps = hr.memoizedProps, mn.memoizedState = hr.memoizedState, mn.updateQueue = hr.updateQueue, mn.type = hr.type, ee = hr.dependencies, mn.dependencies = ee === null ? null : {
                  lanes: ee.lanes,
                  firstContext: ee.firstContext
                }), Pe = Pe.sibling;
                return ql(Yd, Yd.current & 1 | 2), se.child;
              }
              ee = ee.sibling;
            }
            mn.tail !== null && qe() > yA && (se.flags |= 128, ot = !0, pA(mn, !1), se.lanes = 4194304);
          }
        } else {
          if (!ot) if (ee = r0(hr), ee !== null) {
            if (se.flags |= 128, ot = !0, Pe = ee.updateQueue, Pe !== null && (se.updateQueue = Pe, se.flags |= 4), pA(mn, !0), mn.tail === null && mn.tailMode === "hidden" && !hr.alternate && !fl) return tf(se), null;
          } else 2 * qe() - mn.renderingStartTime > yA && Pe !== 1073741824 && (se.flags |= 128, ot = !0, pA(mn, !1), se.lanes = 4194304);
          mn.isBackwards ? (hr.sibling = se.child, se.child = hr) : (Pe = mn.last, Pe !== null ? Pe.sibling = hr : se.child = hr, mn.last = hr);
        }
        return mn.tail !== null ? (se = mn.tail, mn.rendering = se, mn.tail = se.sibling, mn.renderingStartTime = qe(), se.sibling = null, Pe = Yd.current, ql(Yd, ot ? Pe & 1 | 2 : Pe & 1), se) : (tf(se), null);
      case 22:
      case 23:
        return wA(), ot = se.memoizedState !== null, ee !== null && ee.memoizedState !== null !== ot && (se.flags |= 8192), ot && (se.mode & 1) !== 0 ? (qy & 1073741824) !== 0 && (tf(se), se.subtreeFlags & 6 && (se.flags |= 8192)) : tf(se), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(n(156, se.tag));
  }
  function SI(ee, se) {
    switch (Wo(se), se.tag) {
      case 1:
        return Qd(se.type) && Xv(), ee = se.flags, ee & 65536 ? (se.flags = ee & -65537 | 128, se) : null;
      case 3:
        return ns(), Bl(Lc), Bl(uh), UT(), ee = se.flags, (ee & 65536) !== 0 && (ee & 128) === 0 ? (se.flags = ee & -65537 | 128, se) : null;
      case 5:
        return Ox(se), null;
      case 13:
        if (Bl(Yd), ee = se.memoizedState, ee !== null && ee.dehydrated !== null) {
          if (se.alternate === null) throw Error(n(340));
          dn();
        }
        return ee = se.flags, ee & 65536 ? (se.flags = ee & -65537 | 128, se) : null;
      case 19:
        return Bl(Yd), null;
      case 4:
        return ns(), null;
      case 10:
        return Jv(se.type._context), null;
      case 22:
      case 23:
        return wA(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var YT = !1,
    tm = !1,
    nL = typeof WeakSet == "function" ? WeakSet : Set,
    Ro = null;
  function ww(ee, se) {
    var Pe = ee.ref;
    if (Pe !== null) if (typeof Pe == "function") try {
      Pe(null);
    } catch (ot) {
      Du(ee, se, ot);
    } else Pe.current = null;
  }
  function W3(ee, se, Pe) {
    try {
      Pe();
    } catch (ot) {
      Du(ee, se, ot);
    }
  }
  var Ul = !1;
  function T9(ee, se) {
    if (Ms = ba, ee = xr(), Nr(ee)) {
      if ("selectionStart" in ee) var Pe = {
        start: ee.selectionStart,
        end: ee.selectionEnd
      };else e: {
        Pe = (Pe = ee.ownerDocument) && Pe.defaultView || window;
        var ot = Pe.getSelection && Pe.getSelection();
        if (ot && ot.rangeCount !== 0) {
          Pe = ot.anchorNode;
          var Nt = ot.anchorOffset,
            mn = ot.focusNode;
          ot = ot.focusOffset;
          try {
            Pe.nodeType, mn.nodeType;
          } catch {
            Pe = null;
            break e;
          }
          var hr = 0,
            ra = -1,
            ka = -1,
            ti = 0,
            Li = 0,
            zi = ee,
            Ni = null;
          t: for (;;) {
            for (var Io; zi !== Pe || Nt !== 0 && zi.nodeType !== 3 || (ra = hr + Nt), zi !== mn || ot !== 0 && zi.nodeType !== 3 || (ka = hr + ot), zi.nodeType === 3 && (hr += zi.nodeValue.length), (Io = zi.firstChild) !== null;) Ni = zi, zi = Io;
            for (;;) {
              if (zi === ee) break t;
              if (Ni === Pe && ++ti === Nt && (ra = hr), Ni === mn && ++Li === ot && (ka = hr), (Io = zi.nextSibling) !== null) break;
              zi = Ni, Ni = zi.parentNode;
            }
            zi = Io;
          }
          Pe = ra === -1 || ka === -1 ? null : {
            start: ra,
            end: ka
          };
        } else Pe = null;
      }
      Pe = Pe || {
        start: 0,
        end: 0
      };
    } else Pe = null;
    for (ks = {
      focusedElem: ee,
      selectionRange: Pe
    }, ba = !1, Ro = se; Ro !== null;) if (se = Ro, ee = se.child, (se.subtreeFlags & 1028) !== 0 && ee !== null) ee.return = se, Ro = ee;else for (; Ro !== null;) {
      se = Ro;
      try {
        var zo = se.alternate;
        if ((se.flags & 1024) !== 0) switch (se.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (zo !== null) {
              var Jo = zo.memoizedProps,
                sn = zo.memoizedState,
                Tn = se.stateNode,
                lr = Tn.getSnapshotBeforeUpdate(se.elementType === se.type ? Jo : Gy(se.type, Jo), sn);
              Tn.__reactInternalSnapshotBeforeUpdate = lr;
            }
            break;
          case 3:
            var Tr = se.stateNode.containerInfo;
            Tr.nodeType === 1 ? Tr.textContent = "" : Tr.nodeType === 9 && Tr.documentElement && Tr.removeChild(Tr.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(n(163));
        }
      } catch (Qr) {
        Du(se, se.return, Qr);
      }
      if (ee = se.sibling, ee !== null) {
        ee.return = se.return, Ro = ee;
        break;
      }
      Ro = se.return;
    }
    return zo = Ul, Ul = !1, zo;
  }
  function q3(ee, se, Pe) {
    var ot = se.updateQueue;
    if (ot = ot !== null ? ot.lastEffect : null, ot !== null) {
      var Nt = ot = ot.next;
      do {
        if ((Nt.tag & ee) === ee) {
          var mn = Nt.destroy;
          Nt.destroy = void 0, mn !== void 0 && W3(se, Pe, mn);
        }
        Nt = Nt.next;
      } while (Nt !== ot);
    }
  }
  function _d(ee, se) {
    if (se = se.updateQueue, se = se !== null ? se.lastEffect : null, se !== null) {
      var Pe = se = se.next;
      do {
        if ((Pe.tag & ee) === ee) {
          var ot = Pe.create;
          Pe.destroy = ot();
        }
        Pe = Pe.next;
      } while (Pe !== se);
    }
  }
  function f_(ee) {
    var se = ee.ref;
    if (se !== null) {
      var Pe = ee.stateNode;
      switch (ee.tag) {
        case 5:
          ee = Pe;
          break;
        default:
          ee = Pe;
      }
      typeof se == "function" ? se(ee) : se.current = ee;
    }
  }
  function II(ee) {
    var se = ee.alternate;
    se !== null && (ee.alternate = null, II(se)), ee.child = null, ee.deletions = null, ee.sibling = null, ee.tag === 5 && (se = ee.stateNode, se !== null && (delete se[xi], delete se[ld], delete se[fc], delete se[bu], delete se[qd])), ee.stateNode = null, ee.return = null, ee.dependencies = null, ee.memoizedProps = null, ee.memoizedState = null, ee.pendingProps = null, ee.stateNode = null, ee.updateQueue = null;
  }
  function qb(ee) {
    return ee.tag === 5 || ee.tag === 3 || ee.tag === 4;
  }
  function M9(ee) {
    e: for (;;) {
      for (; ee.sibling === null;) {
        if (ee.return === null || qb(ee.return)) return null;
        ee = ee.return;
      }
      for (ee.sibling.return = ee.return, ee = ee.sibling; ee.tag !== 5 && ee.tag !== 6 && ee.tag !== 18;) {
        if (ee.flags & 2 || ee.child === null || ee.tag === 4) continue e;
        ee.child.return = ee, ee = ee.child;
      }
      if (!(ee.flags & 2)) return ee.stateNode;
    }
  }
  function XT(ee, se, Pe) {
    var ot = ee.tag;
    if (ot === 5 || ot === 6) ee = ee.stateNode, se ? Pe.nodeType === 8 ? Pe.parentNode.insertBefore(ee, se) : Pe.insertBefore(ee, se) : (Pe.nodeType === 8 ? (se = Pe.parentNode, se.insertBefore(ee, Pe)) : (se = Pe, se.appendChild(ee)), Pe = Pe._reactRootContainer, Pe != null || se.onclick !== null || (se.onclick = ls));else if (ot !== 4 && (ee = ee.child, ee !== null)) for (XT(ee, se, Pe), ee = ee.sibling; ee !== null;) XT(ee, se, Pe), ee = ee.sibling;
  }
  function g_(ee, se, Pe) {
    var ot = ee.tag;
    if (ot === 5 || ot === 6) ee = ee.stateNode, se ? Pe.insertBefore(ee, se) : Pe.appendChild(ee);else if (ot !== 4 && (ee = ee.child, ee !== null)) for (g_(ee, se, Pe), ee = ee.sibling; ee !== null;) g_(ee, se, Pe), ee = ee.sibling;
  }
  var nf = null,
    U0 = !1;
  function y_(ee, se, Pe) {
    for (Pe = Pe.child; Pe !== null;) rL(ee, se, Pe), Pe = Pe.sibling;
  }
  function rL(ee, se, Pe) {
    if (rn && typeof rn.onCommitFiberUnmount == "function") try {
      rn.onCommitFiberUnmount(Pn, Pe);
    } catch {}
    switch (Pe.tag) {
      case 5:
        tm || ww(Pe, se);
      case 6:
        var ot = nf,
          Nt = U0;
        nf = null, y_(ee, se, Pe), nf = ot, U0 = Nt, nf !== null && (U0 ? (ee = nf, Pe = Pe.stateNode, ee.nodeType === 8 ? ee.parentNode.removeChild(Pe) : ee.removeChild(Pe)) : nf.removeChild(Pe.stateNode));
        break;
      case 18:
        nf !== null && (U0 ? (ee = nf, Pe = Pe.stateNode, ee.nodeType === 8 ? t0(ee.parentNode, Pe) : ee.nodeType === 1 && t0(ee, Pe), sa(ee)) : t0(nf, Pe.stateNode));
        break;
      case 4:
        ot = nf, Nt = U0, nf = Pe.stateNode.containerInfo, U0 = !0, y_(ee, se, Pe), nf = ot, U0 = Nt;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!tm && (ot = Pe.updateQueue, ot !== null && (ot = ot.lastEffect, ot !== null))) {
          Nt = ot = ot.next;
          do {
            var mn = Nt,
              hr = mn.destroy;
            mn = mn.tag, hr !== void 0 && ((mn & 2) !== 0 || (mn & 4) !== 0) && W3(Pe, se, hr), Nt = Nt.next;
          } while (Nt !== ot);
        }
        y_(ee, se, Pe);
        break;
      case 1:
        if (!tm && (ww(Pe, se), ot = Pe.stateNode, typeof ot.componentWillUnmount == "function")) try {
          ot.props = Pe.memoizedProps, ot.state = Pe.memoizedState, ot.componentWillUnmount();
        } catch (ra) {
          Du(Pe, se, ra);
        }
        y_(ee, se, Pe);
        break;
      case 21:
        y_(ee, se, Pe);
        break;
      case 22:
        Pe.mode & 1 ? (tm = (ot = tm) || Pe.memoizedState !== null, y_(ee, se, Pe), tm = ot) : y_(ee, se, Pe);
        break;
      default:
        y_(ee, se, Pe);
    }
  }
  function CI(ee) {
    var se = ee.updateQueue;
    if (se !== null) {
      ee.updateQueue = null;
      var Pe = ee.stateNode;
      Pe === null && (Pe = ee.stateNode = new nL()), se.forEach(function (ot) {
        var Nt = oL.bind(null, ee, ot);
        Pe.has(ot) || (Pe.add(ot), ot.then(Nt, Nt));
      });
    }
  }
  function Hy(ee, se) {
    var Pe = se.deletions;
    if (Pe !== null) for (var ot = 0; ot < Pe.length; ot++) {
      var Nt = Pe[ot];
      try {
        var mn = ee,
          hr = se,
          ra = hr;
        e: for (; ra !== null;) {
          switch (ra.tag) {
            case 5:
              nf = ra.stateNode, U0 = !1;
              break e;
            case 3:
              nf = ra.stateNode.containerInfo, U0 = !0;
              break e;
            case 4:
              nf = ra.stateNode.containerInfo, U0 = !0;
              break e;
          }
          ra = ra.return;
        }
        if (nf === null) throw Error(n(160));
        rL(mn, hr, Nt), nf = null, U0 = !1;
        var ka = Nt.alternate;
        ka !== null && (ka.return = null), Nt.return = null;
      } catch (ti) {
        Du(Nt, se, ti);
      }
    }
    if (se.subtreeFlags & 12854) for (se = se.child; se !== null;) JT(se, ee), se = se.sibling;
  }
  function JT(ee, se) {
    var Pe = ee.alternate,
      ot = ee.flags;
    switch (ee.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Hy(se, ee), Wy(ee), ot & 4) {
          try {
            q3(3, ee, ee.return), _d(3, ee);
          } catch (Jo) {
            Du(ee, ee.return, Jo);
          }
          try {
            q3(5, ee, ee.return);
          } catch (Jo) {
            Du(ee, ee.return, Jo);
          }
        }
        break;
      case 1:
        Hy(se, ee), Wy(ee), ot & 512 && Pe !== null && ww(Pe, Pe.return);
        break;
      case 5:
        if (Hy(se, ee), Wy(ee), ot & 512 && Pe !== null && ww(Pe, Pe.return), ee.flags & 32) {
          var Nt = ee.stateNode;
          try {
            ge(Nt, "");
          } catch (Jo) {
            Du(ee, ee.return, Jo);
          }
        }
        if (ot & 4 && (Nt = ee.stateNode, Nt != null)) {
          var mn = ee.memoizedProps,
            hr = Pe !== null ? Pe.memoizedProps : mn,
            ra = ee.type,
            ka = ee.updateQueue;
          if (ee.updateQueue = null, ka !== null) try {
            ra === "input" && mn.type === "radio" && mn.name != null && ce(Nt, mn), Ae(ra, hr);
            var ti = Ae(ra, mn);
            for (hr = 0; hr < ka.length; hr += 2) {
              var Li = ka[hr],
                zi = ka[hr + 1];
              Li === "style" ? Te(Nt, zi) : Li === "dangerouslySetInnerHTML" ? ue(Nt, zi) : Li === "children" ? ge(Nt, zi) : w(Nt, Li, zi, ti);
            }
            switch (ra) {
              case "input":
                we(Nt, mn);
                break;
              case "textarea":
                ae(Nt, mn);
                break;
              case "select":
                var Ni = Nt._wrapperState.wasMultiple;
                Nt._wrapperState.wasMultiple = !!mn.multiple;
                var Io = mn.value;
                Io != null ? fe(Nt, !!mn.multiple, Io, !1) : Ni !== !!mn.multiple && (mn.defaultValue != null ? fe(Nt, !!mn.multiple, mn.defaultValue, !0) : fe(Nt, !!mn.multiple, mn.multiple ? [] : "", !1));
            }
            Nt[ld] = mn;
          } catch (Jo) {
            Du(ee, ee.return, Jo);
          }
        }
        break;
      case 6:
        if (Hy(se, ee), Wy(ee), ot & 4) {
          if (ee.stateNode === null) throw Error(n(162));
          Nt = ee.stateNode, mn = ee.memoizedProps;
          try {
            Nt.nodeValue = mn;
          } catch (Jo) {
            Du(ee, ee.return, Jo);
          }
        }
        break;
      case 3:
        if (Hy(se, ee), Wy(ee), ot & 4 && Pe !== null && Pe.memoizedState.isDehydrated) try {
          sa(se.containerInfo);
        } catch (Jo) {
          Du(ee, ee.return, Jo);
        }
        break;
      case 4:
        Hy(se, ee), Wy(ee);
        break;
      case 13:
        Hy(se, ee), Wy(ee), Nt = ee.child, Nt.flags & 8192 && (mn = Nt.memoizedState !== null, Nt.stateNode.isHidden = mn, !mn || Nt.alternate !== null && Nt.alternate.memoizedState !== null || (t8 = qe())), ot & 4 && CI(ee);
        break;
      case 22:
        if (Li = Pe !== null && Pe.memoizedState !== null, ee.mode & 1 ? (tm = (ti = tm) || Li, Hy(se, ee), tm = ti) : Hy(se, ee), Wy(ee), ot & 8192) {
          if (ti = ee.memoizedState !== null, (ee.stateNode.isHidden = ti) && !Li && (ee.mode & 1) !== 0) for (Ro = ee, Li = ee.child; Li !== null;) {
            for (zi = Ro = Li; Ro !== null;) {
              switch (Ni = Ro, Io = Ni.child, Ni.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  q3(4, Ni, Ni.return);
                  break;
                case 1:
                  ww(Ni, Ni.return);
                  var zo = Ni.stateNode;
                  if (typeof zo.componentWillUnmount == "function") {
                    ot = Ni, Pe = Ni.return;
                    try {
                      se = ot, zo.props = se.memoizedProps, zo.state = se.memoizedState, zo.componentWillUnmount();
                    } catch (Jo) {
                      Du(ot, Pe, Jo);
                    }
                  }
                  break;
                case 5:
                  ww(Ni, Ni.return);
                  break;
                case 22:
                  if (Ni.memoizedState !== null) {
                    EI(zi);
                    continue;
                  }
              }
              Io !== null ? (Io.return = Ni, Ro = Io) : EI(zi);
            }
            Li = Li.sibling;
          }
          e: for (Li = null, zi = ee;;) {
            if (zi.tag === 5) {
              if (Li === null) {
                Li = zi;
                try {
                  Nt = zi.stateNode, ti ? (mn = Nt.style, typeof mn.setProperty == "function" ? mn.setProperty("display", "none", "important") : mn.display = "none") : (ra = zi.stateNode, ka = zi.memoizedProps.style, hr = ka != null && ka.hasOwnProperty("display") ? ka.display : null, ra.style.display = ve("display", hr));
                } catch (Jo) {
                  Du(ee, ee.return, Jo);
                }
              }
            } else if (zi.tag === 6) {
              if (Li === null) try {
                zi.stateNode.nodeValue = ti ? "" : zi.memoizedProps;
              } catch (Jo) {
                Du(ee, ee.return, Jo);
              }
            } else if ((zi.tag !== 22 && zi.tag !== 23 || zi.memoizedState === null || zi === ee) && zi.child !== null) {
              zi.child.return = zi, zi = zi.child;
              continue;
            }
            if (zi === ee) break e;
            for (; zi.sibling === null;) {
              if (zi.return === null || zi.return === ee) break e;
              Li === zi && (Li = null), zi = zi.return;
            }
            Li === zi && (Li = null), zi.sibling.return = zi.return, zi = zi.sibling;
          }
        }
        break;
      case 19:
        Hy(se, ee), Wy(ee), ot & 4 && CI(ee);
        break;
      case 21:
        break;
      default:
        Hy(se, ee), Wy(ee);
    }
  }
  function Wy(ee) {
    var se = ee.flags;
    if (se & 2) {
      try {
        e: {
          for (var Pe = ee.return; Pe !== null;) {
            if (qb(Pe)) {
              var ot = Pe;
              break e;
            }
            Pe = Pe.return;
          }
          throw Error(n(160));
        }
        switch (ot.tag) {
          case 5:
            var Nt = ot.stateNode;
            ot.flags & 32 && (ge(Nt, ""), ot.flags &= -33);
            var mn = M9(ee);
            g_(ee, mn, Nt);
            break;
          case 3:
          case 4:
            var hr = ot.stateNode.containerInfo,
              ra = M9(ee);
            XT(ee, ra, hr);
            break;
          default:
            throw Error(n(161));
        }
      } catch (ka) {
        Du(ee, ee.return, ka);
      }
      ee.flags &= -3;
    }
    se & 4096 && (ee.flags &= -4097);
  }
  function P9(ee, se, Pe) {
    Ro = ee, R9(ee);
  }
  function R9(ee, se, Pe) {
    for (var ot = (ee.mode & 1) !== 0; Ro !== null;) {
      var Nt = Ro,
        mn = Nt.child;
      if (Nt.tag === 22 && ot) {
        var hr = Nt.memoizedState !== null || YT;
        if (!hr) {
          var ra = Nt.alternate,
            ka = ra !== null && ra.memoizedState !== null || tm;
          ra = YT;
          var ti = tm;
          if (YT = hr, (tm = ka) && !ti) for (Ro = Nt; Ro !== null;) hr = Ro, ka = hr.child, hr.tag === 22 && hr.memoizedState !== null ? ZT(Nt) : ka !== null ? (ka.return = hr, Ro = ka) : ZT(Nt);
          for (; mn !== null;) Ro = mn, R9(mn), mn = mn.sibling;
          Ro = Nt, YT = ra, tm = ti;
        }
        aL(ee);
      } else (Nt.subtreeFlags & 8772) !== 0 && mn !== null ? (mn.return = Nt, Ro = mn) : aL(ee);
    }
  }
  function aL(ee) {
    for (; Ro !== null;) {
      var se = Ro;
      if ((se.flags & 8772) !== 0) {
        var Pe = se.alternate;
        try {
          if ((se.flags & 8772) !== 0) switch (se.tag) {
            case 0:
            case 11:
            case 15:
              tm || _d(5, se);
              break;
            case 1:
              var ot = se.stateNode;
              if (se.flags & 4 && !tm) if (Pe === null) ot.componentDidMount();else {
                var Nt = se.elementType === se.type ? Pe.memoizedProps : Gy(se.type, Pe.memoizedProps);
                ot.componentDidUpdate(Nt, Pe.memoizedState, ot.__reactInternalSnapshotBeforeUpdate);
              }
              var mn = se.updateQueue;
              mn !== null && zT(se, mn, ot);
              break;
            case 3:
              var hr = se.updateQueue;
              if (hr !== null) {
                if (Pe = null, se.child !== null) switch (se.child.tag) {
                  case 5:
                    Pe = se.child.stateNode;
                    break;
                  case 1:
                    Pe = se.child.stateNode;
                }
                zT(se, hr, Pe);
              }
              break;
            case 5:
              var ra = se.stateNode;
              if (Pe === null && se.flags & 4) {
                Pe = ra;
                var ka = se.memoizedProps;
                switch (se.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    ka.autoFocus && Pe.focus();
                    break;
                  case "img":
                    ka.src && (Pe.src = ka.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (se.memoizedState === null) {
                var ti = se.alternate;
                if (ti !== null) {
                  var Li = ti.memoizedState;
                  if (Li !== null) {
                    var zi = Li.dehydrated;
                    zi !== null && sa(zi);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(n(163));
          }
          tm || se.flags & 512 && f_(se);
        } catch (Ni) {
          Du(se, se.return, Ni);
        }
      }
      if (se === ee) {
        Ro = null;
        break;
      }
      if (Pe = se.sibling, Pe !== null) {
        Pe.return = se.return, Ro = Pe;
        break;
      }
      Ro = se.return;
    }
  }
  function EI(ee) {
    for (; Ro !== null;) {
      var se = Ro;
      if (se === ee) {
        Ro = null;
        break;
      }
      var Pe = se.sibling;
      if (Pe !== null) {
        Pe.return = se.return, Ro = Pe;
        break;
      }
      Ro = se.return;
    }
  }
  function ZT(ee) {
    for (; Ro !== null;) {
      var se = Ro;
      try {
        switch (se.tag) {
          case 0:
          case 11:
          case 15:
            var Pe = se.return;
            try {
              _d(4, se);
            } catch (ka) {
              Du(se, Pe, ka);
            }
            break;
          case 1:
            var ot = se.stateNode;
            if (typeof ot.componentDidMount == "function") {
              var Nt = se.return;
              try {
                ot.componentDidMount();
              } catch (ka) {
                Du(se, Nt, ka);
              }
            }
            var mn = se.return;
            try {
              f_(se);
            } catch (ka) {
              Du(se, mn, ka);
            }
            break;
          case 5:
            var hr = se.return;
            try {
              f_(se);
            } catch (ka) {
              Du(se, hr, ka);
            }
        }
      } catch (ka) {
        Du(se, se.return, ka);
      }
      if (se === ee) {
        Ro = null;
        break;
      }
      var ra = se.sibling;
      if (ra !== null) {
        ra.return = se.return, Ro = ra;
        break;
      }
      Ro = se.return;
    }
  }
  var e8 = Math.ceil,
    b_ = k.ReactCurrentDispatcher,
    xw = k.ReactCurrentOwner,
    rf = k.ReactCurrentBatchConfig,
    Fc = 0,
    Dh = null,
    ju = null,
    Lh = 0,
    qy = 0,
    mA = Zh(0),
    nm = 0,
    K3 = null,
    fA = 0,
    TI = 0,
    N9 = 0,
    gA = null,
    o0 = null,
    t8 = 0,
    yA = 1 / 0,
    Kb = null,
    _w = !1,
    Q3 = null,
    Qb = null,
    Yb = !1,
    Hx = null,
    MI = 0,
    Y3 = 0,
    PI = null,
    bA = -1,
    X3 = 0;
  function Ag() {
    return (Fc & 6) !== 0 ? qe() : bA !== -1 ? bA : bA = qe();
  }
  function i1(ee) {
    return (ee.mode & 1) === 0 ? 1 : (Fc & 2) !== 0 && Lh !== 0 ? Lh & -Lh : Rr.transition !== null ? (X3 === 0 && (X3 = ht()), X3) : (ee = wn, ee !== 0 || (ee = window.event, ee = ee === void 0 ? 16 : ki(ee.type)), ee);
  }
  function Xb(ee, se, Pe, ot) {
    if (50 < Y3) throw Y3 = 0, PI = null, Error(n(185));
    jt(ee, Pe, ot), ((Fc & 2) === 0 || ee !== Dh) && (ee === Dh && ((Fc & 2) === 0 && (TI |= Pe), nm === 4 && Kx(ee, Lh)), Am(ee, ot), Pe === 1 && Fc === 0 && (se.mode & 1) === 0 && (yA = qe() + 500, Jp && Xm()));
  }
  function Am(ee, se) {
    var Pe = ee.callbackNode;
    et(ee, se);
    var ot = Tt(ee, ee === Dh ? Lh : 0);
    if (ot === 0) Pe !== null && _t(Pe), ee.callbackNode = null, ee.callbackPriority = 0;else if (se = ot & -ot, ee.callbackPriority !== se) {
      if (Pe != null && _t(Pe), se === 1) ee.tag === 0 ? fw(D9.bind(null, ee)) : Rp(D9.bind(null, ee)), Pp(function () {
        (Fc & 6) === 0 && Xm();
      }), Pe = null;else {
        switch (at(ot)) {
          case 1:
            Pe = St;
            break;
          case 4:
            Pe = hn;
            break;
          case 16:
            Pe = Qt;
            break;
          case 536870912:
            Pe = ln;
            break;
          default:
            Pe = Qt;
        }
        Pe = B9(Pe, vA.bind(null, ee));
      }
      ee.callbackPriority = se, ee.callbackNode = Pe;
    }
  }
  function vA(ee, se) {
    if (bA = -1, X3 = 0, (Fc & 6) !== 0) throw Error(n(327));
    var Pe = ee.callbackNode;
    if (_A() && ee.callbackNode !== Pe) return null;
    var ot = Tt(ee, ee === Dh ? Lh : 0);
    if (ot === 0) return null;
    if ((ot & 30) !== 0 || (ot & ee.expiredLanes) !== 0 || se) se = Qy(ee, ot);else {
      se = ot;
      var Nt = Fc;
      Fc |= 2;
      var mn = J3();
      (Dh !== ee || Lh !== se) && (Kb = null, yA = qe() + 500, kw(ee, se));
      do try {
        n8();
        break;
      } catch (ra) {
        xA(ee, ra);
      } while (!0);
      By(), b_.current = mn, Fc = Nt, ju !== null ? se = 0 : (Dh = null, Lh = 0, se = nm);
    }
    if (se !== 0) {
      if (se === 2 && (Nt = ft(ee), Nt !== 0 && (ot = Nt, se = Wx(ee, Nt))), se === 1) throw Pe = K3, kw(ee, 0), Kx(ee, ot), Am(ee, qe()), Pe;
      if (se === 6) Kx(ee, ot);else {
        if (Nt = ee.current.alternate, (ot & 30) === 0 && !j9(Nt) && (se = Qy(ee, ot), se === 2 && (mn = ft(ee), mn !== 0 && (ot = mn, se = Wx(ee, mn))), se === 1)) throw Pe = K3, kw(ee, 0), Kx(ee, ot), Am(ee, qe()), Pe;
        switch (ee.finishedWork = Nt, ee.finishedLanes = ot, se) {
          case 0:
          case 1:
            throw Error(n(345));
          case 2:
            Yy(ee, o0, Kb);
            break;
          case 3:
            if (Kx(ee, ot), (ot & 130023424) === ot && (se = t8 + 500 - qe(), 10 < se)) {
              if (Tt(ee, 0) !== 0) break;
              if (Nt = ee.suspendedLanes, (Nt & ot) !== ot) {
                Ag(), ee.pingedLanes |= ee.suspendedLanes & Nt;
                break;
              }
              ee.timeoutHandle = Vc(Yy.bind(null, ee, o0, Kb), se);
              break;
            }
            Yy(ee, o0, Kb);
            break;
          case 4:
            if (Kx(ee, ot), (ot & 4194240) === ot) break;
            for (se = ee.eventTimes, Nt = -1; 0 < ot;) {
              var hr = 31 - Ct(ot);
              mn = 1 << hr, hr = se[hr], hr > Nt && (Nt = hr), ot &= ~mn;
            }
            if (ot = Nt, ot = qe() - ot, ot = (120 > ot ? 120 : 480 > ot ? 480 : 1080 > ot ? 1080 : 1920 > ot ? 1920 : 3e3 > ot ? 3e3 : 4320 > ot ? 4320 : 1960 * e8(ot / 1960)) - ot, 10 < ot) {
              ee.timeoutHandle = Vc(Yy.bind(null, ee, o0, Kb), ot);
              break;
            }
            Yy(ee, o0, Kb);
            break;
          case 5:
            Yy(ee, o0, Kb);
            break;
          default:
            throw Error(n(329));
        }
      }
    }
    return Am(ee, qe()), ee.callbackNode === Pe ? vA.bind(null, ee) : null;
  }
  function Wx(ee, se) {
    var Pe = gA;
    return ee.current.memoizedState.isDehydrated && (kw(ee, se).flags |= 256), ee = Qy(ee, se), ee !== 2 && (se = o0, o0 = Pe, se !== null && qx(se)), ee;
  }
  function qx(ee) {
    o0 === null ? o0 = ee : o0.push.apply(o0, ee);
  }
  function j9(ee) {
    for (var se = ee;;) {
      if (se.flags & 16384) {
        var Pe = se.updateQueue;
        if (Pe !== null && (Pe = Pe.stores, Pe !== null)) for (var ot = 0; ot < Pe.length; ot++) {
          var Nt = Pe[ot],
            mn = Nt.getSnapshot;
          Nt = Nt.value;
          try {
            if (!aa(mn(), Nt)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (Pe = se.child, se.subtreeFlags & 16384 && Pe !== null) Pe.return = se, se = Pe;else {
        if (se === ee) break;
        for (; se.sibling === null;) {
          if (se.return === null || se.return === ee) return !0;
          se = se.return;
        }
        se.sibling.return = se.return, se = se.sibling;
      }
    }
    return !0;
  }
  function Kx(ee, se) {
    for (se &= ~N9, se &= ~TI, ee.suspendedLanes |= se, ee.pingedLanes &= ~se, ee = ee.expirationTimes; 0 < se;) {
      var Pe = 31 - Ct(se),
        ot = 1 << Pe;
      ee[Pe] = -1, se &= ~ot;
    }
  }
  function D9(ee) {
    if ((Fc & 6) !== 0) throw Error(n(327));
    _A();
    var se = Tt(ee, 0);
    if ((se & 1) === 0) return Am(ee, qe()), null;
    var Pe = Qy(ee, se);
    if (ee.tag !== 0 && Pe === 2) {
      var ot = ft(ee);
      ot !== 0 && (se = ot, Pe = Wx(ee, ot));
    }
    if (Pe === 1) throw Pe = K3, kw(ee, 0), Kx(ee, se), Am(ee, qe()), Pe;
    if (Pe === 6) throw Error(n(345));
    return ee.finishedWork = ee.current.alternate, ee.finishedLanes = se, Yy(ee, o0, Kb), Am(ee, qe()), null;
  }
  function Ky(ee, se) {
    var Pe = Fc;
    Fc |= 1;
    try {
      return ee(se);
    } finally {
      Fc = Pe, Fc === 0 && (yA = qe() + 500, Jp && Xm());
    }
  }
  function Jb(ee) {
    Hx !== null && Hx.tag === 0 && (Fc & 6) === 0 && _A();
    var se = Fc;
    Fc |= 1;
    var Pe = rf.transition,
      ot = wn;
    try {
      if (rf.transition = null, wn = 1, ee) return ee();
    } finally {
      wn = ot, rf.transition = Pe, Fc = se, (Fc & 6) === 0 && Xm();
    }
  }
  function wA() {
    qy = mA.current, Bl(mA);
  }
  function kw(ee, se) {
    ee.finishedWork = null, ee.finishedLanes = 0;
    var Pe = ee.timeoutHandle;
    if (Pe !== -1 && (ee.timeoutHandle = -1, zd(Pe)), ju !== null) for (Pe = ju.return; Pe !== null;) {
      var ot = Pe;
      switch (Wo(ot), ot.tag) {
        case 1:
          ot = ot.type.childContextTypes, ot != null && Xv();
          break;
        case 3:
          ns(), Bl(Lc), Bl(uh), UT();
          break;
        case 5:
          Ox(ot);
          break;
        case 4:
          ns();
          break;
        case 13:
          Bl(Yd);
          break;
        case 19:
          Bl(Yd);
          break;
        case 10:
          Jv(ot.type._context);
          break;
        case 22:
        case 23:
          wA();
      }
      Pe = Pe.return;
    }
    if (Dh = ee, ju = ee = Zb(ee.current, null), Lh = qy = se, nm = 0, K3 = null, N9 = TI = fA = 0, o0 = gA = null, B0 !== null) {
      for (se = 0; se < B0.length; se++) if (Pe = B0[se], ot = Pe.interleaved, ot !== null) {
        Pe.interleaved = null;
        var Nt = ot.next,
          mn = Pe.pending;
        if (mn !== null) {
          var hr = mn.next;
          mn.next = Nt, ot.next = hr;
        }
        Pe.pending = ot;
      }
      B0 = null;
    }
    return ee;
  }
  function xA(ee, se) {
    do {
      var Pe = ju;
      try {
        if (By(), $y.current = lA, p_) {
          for (var ot = Kl.memoizedState; ot !== null;) {
            var Nt = ot.queue;
            Nt !== null && (Nt.pending = null), ot = ot.next;
          }
          p_ = !1;
        }
        if (Ed = 0, Xd = Fl = Kl = null, t1 = !1, Vb = 0, xw.current = null, Pe === null || Pe.return === null) {
          nm = 1, K3 = se, ju = null;
          break;
        }
        e: {
          var mn = ee,
            hr = Pe.return,
            ra = Pe,
            ka = se;
          if (se = Lh, ra.flags |= 32768, ka !== null && typeof ka == "object" && typeof ka.then == "function") {
            var ti = ka,
              Li = ra,
              zi = Li.tag;
            if ((Li.mode & 1) === 0 && (zi === 0 || zi === 11 || zi === 15)) {
              var Ni = Li.alternate;
              Ni ? (Li.updateQueue = Ni.updateQueue, Li.memoizedState = Ni.memoizedState, Li.lanes = Ni.lanes) : (Li.updateQueue = null, Li.memoizedState = null);
            }
            var Io = dA(hr);
            if (Io !== null) {
              Io.flags &= -257, WT(Io, hr, ra, mn, se), Io.mode & 1 && $x(mn, ti, se), se = Io, ka = ti;
              var zo = se.updateQueue;
              if (zo === null) {
                var Jo = new Set();
                Jo.add(ka), se.updateQueue = Jo;
              } else zo.add(ka);
              break e;
            } else {
              if ((se & 1) === 0) {
                $x(mn, ti, se), Z3();
                break e;
              }
              ka = Error(n(426));
            }
          } else if (fl && ra.mode & 1) {
            var sn = dA(hr);
            if (sn !== null) {
              (sn.flags & 65536) === 0 && (sn.flags |= 256), WT(sn, hr, ra, mn, se), Xn(Nu(ka, ra));
              break e;
            }
          }
          mn = ka = Nu(ka, ra), nm !== 4 && (nm = 2), gA === null ? gA = [mn] : gA.push(mn), mn = hr;
          do {
            switch (mn.tag) {
              case 3:
                mn.flags |= 65536, se &= -se, mn.lanes |= se;
                var Tn = A9(mn, ka, se);
                bI(mn, Tn);
                break e;
              case 1:
                ra = ka;
                var lr = mn.type,
                  Tr = mn.stateNode;
                if ((mn.flags & 128) === 0 && (typeof lr.getDerivedStateFromError == "function" || Tr !== null && typeof Tr.componentDidCatch == "function" && (Qb === null || !Qb.has(Tr)))) {
                  mn.flags |= 65536, se &= -se, mn.lanes |= se;
                  var Qr = S9(mn, ra, se);
                  bI(mn, Qr);
                  break e;
                }
            }
            mn = mn.return;
          } while (mn !== null);
        }
        RI(Pe);
      } catch (Sa) {
        se = Sa, ju === Pe && Pe !== null && (ju = Pe = Pe.return);
        continue;
      }
      break;
    } while (!0);
  }
  function J3() {
    var ee = b_.current;
    return b_.current = lA, ee === null ? lA : ee;
  }
  function Z3() {
    (nm === 0 || nm === 3 || nm === 2) && (nm = 4), Dh === null || (fA & 268435455) === 0 && (TI & 268435455) === 0 || Kx(Dh, Lh);
  }
  function Qy(ee, se) {
    var Pe = Fc;
    Fc |= 2;
    var ot = J3();
    (Dh !== ee || Lh !== se) && (Kb = null, kw(ee, se));
    do try {
      o1();
      break;
    } catch (Nt) {
      xA(ee, Nt);
    } while (!0);
    if (By(), Fc = Pe, b_.current = ot, ju !== null) throw Error(n(261));
    return Dh = null, Lh = 0, nm;
  }
  function o1() {
    for (; ju !== null;) s0(ju);
  }
  function n8() {
    for (; ju !== null && !At();) s0(ju);
  }
  function s0(ee) {
    var se = a8(ee.alternate, ee, qy);
    ee.memoizedProps = ee.pendingProps, se === null ? RI(ee) : ju = se, xw.current = null;
  }
  function RI(ee) {
    var se = ee;
    do {
      var Pe = se.alternate;
      if (ee = se.return, (se.flags & 32768) === 0) {
        if (Pe = tL(Pe, se, qy), Pe !== null) {
          ju = Pe;
          return;
        }
      } else {
        if (Pe = SI(Pe, se), Pe !== null) {
          Pe.flags &= 32767, ju = Pe;
          return;
        }
        if (ee !== null) ee.flags |= 32768, ee.subtreeFlags = 0, ee.deletions = null;else {
          nm = 6, ju = null;
          return;
        }
      }
      if (se = se.sibling, se !== null) {
        ju = se;
        return;
      }
      ju = se = ee;
    } while (se !== null);
    nm === 0 && (nm = 5);
  }
  function Yy(ee, se, Pe) {
    var ot = wn,
      Nt = rf.transition;
    try {
      rf.transition = null, wn = 1, iL(ee, se, Pe, ot);
    } finally {
      rf.transition = Nt, wn = ot;
    }
    return null;
  }
  function iL(ee, se, Pe, ot) {
    do _A(); while (Hx !== null);
    if ((Fc & 6) !== 0) throw Error(n(327));
    Pe = ee.finishedWork;
    var Nt = ee.finishedLanes;
    if (Pe === null) return null;
    if (ee.finishedWork = null, ee.finishedLanes = 0, Pe === ee.current) throw Error(n(177));
    ee.callbackNode = null, ee.callbackPriority = 0;
    var mn = Pe.lanes | Pe.childLanes;
    if (bt(ee, mn), ee === Dh && (ju = Dh = null, Lh = 0), (Pe.subtreeFlags & 2064) === 0 && (Pe.flags & 2064) === 0 || Yb || (Yb = !0, B9(Qt, function () {
      return _A(), null;
    })), mn = (Pe.flags & 15990) !== 0, (Pe.subtreeFlags & 15990) !== 0 || mn) {
      mn = rf.transition, rf.transition = null;
      var hr = wn;
      wn = 1;
      var ra = Fc;
      Fc |= 4, xw.current = null, T9(ee, Pe), JT(Pe, ee), qr(ks), ba = !!Ms, ks = Ms = null, ee.current = Pe, P9(Pe), Yt(), Fc = ra, wn = hr, rf.transition = mn;
    } else ee.current = Pe;
    if (Yb && (Yb = !1, Hx = ee, MI = Nt), mn = ee.pendingLanes, mn === 0 && (Qb = null), Yn(Pe.stateNode), Am(ee, qe()), se !== null) for (ot = ee.onRecoverableError, Pe = 0; Pe < se.length; Pe++) Nt = se[Pe], ot(Nt.value, {
      componentStack: Nt.stack,
      digest: Nt.digest
    });
    if (_w) throw _w = !1, ee = Q3, Q3 = null, ee;
    return (MI & 1) !== 0 && ee.tag !== 0 && _A(), mn = ee.pendingLanes, (mn & 1) !== 0 ? ee === PI ? Y3++ : (Y3 = 0, PI = ee) : Y3 = 0, Xm(), null;
  }
  function _A() {
    if (Hx !== null) {
      var ee = at(MI),
        se = rf.transition,
        Pe = wn;
      try {
        if (rf.transition = null, wn = 16 > ee ? 16 : ee, Hx === null) var ot = !1;else {
          if (ee = Hx, Hx = null, MI = 0, (Fc & 6) !== 0) throw Error(n(331));
          var Nt = Fc;
          for (Fc |= 4, Ro = ee.current; Ro !== null;) {
            var mn = Ro,
              hr = mn.child;
            if ((Ro.flags & 16) !== 0) {
              var ra = mn.deletions;
              if (ra !== null) {
                for (var ka = 0; ka < ra.length; ka++) {
                  var ti = ra[ka];
                  for (Ro = ti; Ro !== null;) {
                    var Li = Ro;
                    switch (Li.tag) {
                      case 0:
                      case 11:
                      case 15:
                        q3(8, Li, mn);
                    }
                    var zi = Li.child;
                    if (zi !== null) zi.return = Li, Ro = zi;else for (; Ro !== null;) {
                      Li = Ro;
                      var Ni = Li.sibling,
                        Io = Li.return;
                      if (II(Li), Li === ti) {
                        Ro = null;
                        break;
                      }
                      if (Ni !== null) {
                        Ni.return = Io, Ro = Ni;
                        break;
                      }
                      Ro = Io;
                    }
                  }
                }
                var zo = mn.alternate;
                if (zo !== null) {
                  var Jo = zo.child;
                  if (Jo !== null) {
                    zo.child = null;
                    do {
                      var sn = Jo.sibling;
                      Jo.sibling = null, Jo = sn;
                    } while (Jo !== null);
                  }
                }
                Ro = mn;
              }
            }
            if ((mn.subtreeFlags & 2064) !== 0 && hr !== null) hr.return = mn, Ro = hr;else e: for (; Ro !== null;) {
              if (mn = Ro, (mn.flags & 2048) !== 0) switch (mn.tag) {
                case 0:
                case 11:
                case 15:
                  q3(9, mn, mn.return);
              }
              var Tn = mn.sibling;
              if (Tn !== null) {
                Tn.return = mn.return, Ro = Tn;
                break e;
              }
              Ro = mn.return;
            }
          }
          var lr = ee.current;
          for (Ro = lr; Ro !== null;) {
            hr = Ro;
            var Tr = hr.child;
            if ((hr.subtreeFlags & 2064) !== 0 && Tr !== null) Tr.return = hr, Ro = Tr;else e: for (hr = lr; Ro !== null;) {
              if (ra = Ro, (ra.flags & 2048) !== 0) try {
                switch (ra.tag) {
                  case 0:
                  case 11:
                  case 15:
                    _d(9, ra);
                }
              } catch (Sa) {
                Du(ra, ra.return, Sa);
              }
              if (ra === hr) {
                Ro = null;
                break e;
              }
              var Qr = ra.sibling;
              if (Qr !== null) {
                Qr.return = ra.return, Ro = Qr;
                break e;
              }
              Ro = ra.return;
            }
          }
          if (Fc = Nt, Xm(), rn && typeof rn.onPostCommitFiberRoot == "function") try {
            rn.onPostCommitFiberRoot(Pn, ee);
          } catch {}
          ot = !0;
        }
        return ot;
      } finally {
        wn = Pe, rf.transition = se;
      }
    }
    return !1;
  }
  function r8(ee, se, Pe) {
    se = Nu(Pe, se), se = A9(ee, se, 1), ee = zf(ee, se, 1), se = Ag(), ee !== null && (jt(ee, 1, se), Am(ee, se));
  }
  function Du(ee, se, Pe) {
    if (ee.tag === 3) r8(ee, ee, Pe);else for (; se !== null;) {
      if (se.tag === 3) {
        r8(se, ee, Pe);
        break;
      } else if (se.tag === 1) {
        var ot = se.stateNode;
        if (typeof se.type.getDerivedStateFromError == "function" || typeof ot.componentDidCatch == "function" && (Qb === null || !Qb.has(ot))) {
          ee = Nu(Pe, ee), ee = S9(se, ee, 1), se = zf(se, ee, 1), ee = Ag(), se !== null && (jt(se, 1, ee), Am(se, ee));
          break;
        }
      }
      se = se.return;
    }
  }
  function L9(ee, se, Pe) {
    var ot = ee.pingCache;
    ot !== null && ot.delete(se), se = Ag(), ee.pingedLanes |= ee.suspendedLanes & Pe, Dh === ee && (Lh & Pe) === Pe && (nm === 4 || nm === 3 && (Lh & 130023424) === Lh && 500 > qe() - t8 ? kw(ee, 0) : N9 |= Pe), Am(ee, se);
  }
  function e4(ee, se) {
    se === 0 && ((ee.mode & 1) === 0 ? se = 1 : (se = en, en <<= 1, (en & 130023424) === 0 && (en = 4194304)));
    var Pe = Ag();
    ee = Zm(ee, se), ee !== null && (jt(ee, se, Pe), Am(ee, Pe));
  }
  function O9(ee) {
    var se = ee.memoizedState,
      Pe = 0;
    se !== null && (Pe = se.retryLane), e4(ee, Pe);
  }
  function oL(ee, se) {
    var Pe = 0;
    switch (ee.tag) {
      case 13:
        var ot = ee.stateNode,
          Nt = ee.memoizedState;
        Nt !== null && (Pe = Nt.retryLane);
        break;
      case 19:
        ot = ee.stateNode;
        break;
      default:
        throw Error(n(314));
    }
    ot !== null && ot.delete(se), e4(ee, Pe);
  }
  var a8;
  a8 = function (ee, se, Pe) {
    if (ee !== null) {
      if (ee.memoizedProps !== se.pendingProps || Lc.current) Np = !0;else {
        if ((ee.lanes & Pe) === 0 && (se.flags & 128) === 0) return Np = !1, C9(ee, se, Pe);
        Np = (ee.flags & 131072) !== 0;
      }
    } else Np = !1, fl && (se.flags & 1048576) !== 0 && Eo(se, Js, se.index);
    switch (se.lanes = 0, se.tag) {
      case 2:
        var ot = se.type;
        em(ee, se), ee = se.pendingProps;
        var Nt = Qm(se, uh.current);
        Ff(se, Pe), Nt = Bx(null, se, ot, ee, Nt, Pe);
        var mn = m_();
        return se.flags |= 1, typeof Nt == "object" && Nt !== null && typeof Nt.render == "function" && Nt.$$typeof === void 0 ? (se.tag = 1, se.memoizedState = null, se.updateQueue = null, Qd(ot) ? (mn = !0, td(se)) : mn = !1, se.memoizedState = Nt.state !== null && Nt.state !== void 0 ? Nt.state : null, ll(se), Nt.updater = $3, se.stateNode = Nt, Nt._reactInternals = se, G3(se, ot, ee, Pe), se = rs(null, se, ot, !0, mn, Pe)) : (se.tag = 0, fl && mn && Zs(se), Bc(null, se, Nt, Pe), se = se.child), se;
      case 16:
        ot = se.elementType;
        e: {
          switch (em(ee, se), ee = se.pendingProps, Nt = ot._init, ot = Nt(ot._payload), se.type = ot, Nt = se.tag = F9(ot), ee = Gy(ot, ee), Nt) {
            case 0:
              se = Wb(null, se, ot, ee, Pe);
              break e;
            case 1:
              se = Us(null, se, ot, ee, Pe);
              break e;
            case 11:
              se = qT(null, se, ot, ee, Pe);
              break e;
            case 14:
              se = KT(null, se, ot, Gy(ot.type, ee), Pe);
              break e;
          }
          throw Error(n(306, ot, ""));
        }
        return se;
      case 0:
        return ot = se.type, Nt = se.pendingProps, Nt = se.elementType === ot ? Nt : Gy(ot, Nt), Wb(ee, se, ot, Nt, Pe);
      case 1:
        return ot = se.type, Nt = se.pendingProps, Nt = se.elementType === ot ? Nt : Gy(ot, Nt), Us(ee, se, ot, Nt, Pe);
      case 3:
        e: {
          if (V3(se), ee === null) throw Error(n(387));
          ot = se.pendingProps, mn = se.memoizedState, Nt = mn.element, zy(ee, se), gw(se, ot, null, Pe);
          var hr = se.memoizedState;
          if (ot = hr.element, mn.isDehydrated) {
            if (mn = {
              element: ot,
              isDehydrated: !1,
              cache: hr.cache,
              pendingSuspenseBoundaries: hr.pendingSuspenseBoundaries,
              transitions: hr.transitions
            }, se.updateQueue.baseState = mn, se.memoizedState = mn, se.flags & 256) {
              Nt = Nu(Error(n(423)), se), se = I9(ee, se, ot, Pe, Nt);
              break e;
            } else if (ot !== Nt) {
              Nt = Nu(Error(n(424)), se), se = I9(ee, se, ot, Pe, Nt);
              break e;
            } else for (Xo = yu(se.stateNode.containerInfo.firstChild), Qs = se, fl = !0, Oc = null, Pe = Bo(se, null, ot, Pe), se.child = Pe; Pe;) Pe.flags = Pe.flags & -3 | 4096, Pe = Pe.sibling;
          } else {
            if (dn(), ot === Nt) {
              se = z0(ee, se, Pe);
              break e;
            }
            Bc(ee, se, ot, Pe);
          }
          se = se.child;
        }
        return se;
      case 5:
        return Uy(se), ee === null && Se(se), ot = se.type, Nt = se.pendingProps, mn = ee !== null ? ee.memoizedProps : null, hr = Nt.children, Yo(ot, Nt) ? hr = null : mn !== null && Yo(ot, mn) && (se.flags |= 32), i0(ee, se), Bc(ee, se, hr, Pe), se.child;
      case 6:
        return ee === null && Se(se), null;
      case 13:
        return ZD(ee, se, Pe);
      case 4:
        return np(se, se.stateNode.containerInfo), ot = se.pendingProps, ee === null ? se.child = fi(se, null, ot, Pe) : Bc(ee, se, ot, Pe), se.child;
      case 11:
        return ot = se.type, Nt = se.pendingProps, Nt = se.elementType === ot ? Nt : Gy(ot, Nt), qT(ee, se, ot, Nt, Pe);
      case 7:
        return Bc(ee, se, se.pendingProps, Pe), se.child;
      case 8:
        return Bc(ee, se, se.pendingProps.children, Pe), se.child;
      case 12:
        return Bc(ee, se, se.pendingProps.children, Pe), se.child;
      case 10:
        e: {
          if (ot = se.type._context, Nt = se.pendingProps, mn = se.memoizedProps, hr = Nt.value, ql(sl, ot._currentValue), ot._currentValue = hr, mn !== null) if (aa(mn.value, hr)) {
            if (mn.children === Nt.children && !Lc.current) {
              se = z0(ee, se, Pe);
              break e;
            }
          } else for (mn = se.child, mn !== null && (mn.return = se); mn !== null;) {
            var ra = mn.dependencies;
            if (ra !== null) {
              hr = mn.child;
              for (var ka = ra.firstContext; ka !== null;) {
                if (ka.context === ot) {
                  if (mn.tag === 1) {
                    ka = Nh(-1, Pe & -Pe), ka.tag = 2;
                    var ti = mn.updateQueue;
                    if (ti !== null) {
                      ti = ti.shared;
                      var Li = ti.pending;
                      Li === null ? ka.next = ka : (ka.next = Li.next, Li.next = ka), ti.pending = ka;
                    }
                  }
                  mn.lanes |= Pe, ka = mn.alternate, ka !== null && (ka.lanes |= Pe), O0(mn.return, Pe, se), ra.lanes |= Pe;
                  break;
                }
                ka = ka.next;
              }
            } else if (mn.tag === 10) hr = mn.type === se.type ? null : mn.child;else if (mn.tag === 18) {
              if (hr = mn.return, hr === null) throw Error(n(341));
              hr.lanes |= Pe, ra = hr.alternate, ra !== null && (ra.lanes |= Pe), O0(hr, Pe, se), hr = mn.sibling;
            } else hr = mn.child;
            if (hr !== null) hr.return = mn;else for (hr = mn; hr !== null;) {
              if (hr === se) {
                hr = null;
                break;
              }
              if (mn = hr.sibling, mn !== null) {
                mn.return = hr.return, hr = mn;
                break;
              }
              hr = hr.return;
            }
            mn = hr;
          }
          Bc(ee, se, Nt.children, Pe), se = se.child;
        }
        return se;
      case 9:
        return Nt = se.type, ot = se.pendingProps.children, Ff(se, Pe), Nt = n0(Nt), ot = ot(Nt), se.flags |= 1, Bc(ee, se, ot, Pe), se.child;
      case 14:
        return ot = se.type, Nt = Gy(ot, se.pendingProps), Nt = Gy(ot.type, Nt), KT(ee, se, ot, Nt, Pe);
      case 15:
        return kI(ee, se, se.type, se.pendingProps, Pe);
      case 17:
        return ot = se.type, Nt = se.pendingProps, Nt = se.elementType === ot ? Nt : Gy(ot, Nt), em(ee, se), se.tag = 1, Qd(ot) ? (ee = !0, td(se)) : ee = !1, Ff(se, Pe), cA(se, ot, Nt), G3(se, ot, Nt, Pe), rs(null, se, ot, !0, ee, Pe);
      case 19:
        return hA(ee, se, Pe);
      case 22:
        return jp(ee, se, Pe);
    }
    throw Error(n(156, se.tag));
  };
  function B9(ee, se) {
    return Ut(ee, se);
  }
  function sL(ee, se, Pe, ot) {
    this.tag = ee, this.key = Pe, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = se, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = ot, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function $0(ee, se, Pe, ot) {
    return new sL(ee, se, Pe, ot);
  }
  function t4(ee) {
    return ee = ee.prototype, !(!ee || !ee.isReactComponent);
  }
  function F9(ee) {
    if (typeof ee == "function") return t4(ee) ? 1 : 0;
    if (ee != null) {
      if (ee = ee.$$typeof, ee === P) return 11;
      if (ee === B) return 14;
    }
    return 2;
  }
  function Zb(ee, se) {
    var Pe = ee.alternate;
    return Pe === null ? (Pe = $0(ee.tag, se, ee.key, ee.mode), Pe.elementType = ee.elementType, Pe.type = ee.type, Pe.stateNode = ee.stateNode, Pe.alternate = ee, ee.alternate = Pe) : (Pe.pendingProps = se, Pe.type = ee.type, Pe.flags = 0, Pe.subtreeFlags = 0, Pe.deletions = null), Pe.flags = ee.flags & 14680064, Pe.childLanes = ee.childLanes, Pe.lanes = ee.lanes, Pe.child = ee.child, Pe.memoizedProps = ee.memoizedProps, Pe.memoizedState = ee.memoizedState, Pe.updateQueue = ee.updateQueue, se = ee.dependencies, Pe.dependencies = se === null ? null : {
      lanes: se.lanes,
      firstContext: se.firstContext
    }, Pe.sibling = ee.sibling, Pe.index = ee.index, Pe.ref = ee.ref, Pe;
  }
  function v_(ee, se, Pe, ot, Nt, mn) {
    var hr = 2;
    if (ot = ee, typeof ee == "function") t4(ee) && (hr = 1);else if (typeof ee == "string") hr = 5;else e: switch (ee) {
      case C:
        return Qx(Pe.children, Nt, mn, se);
      case I:
        hr = 8, Nt |= 8;
        break;
      case E:
        return ee = $0(12, Pe, se, Nt | 2), ee.elementType = E, ee.lanes = mn, ee;
      case R:
        return ee = $0(13, Pe, se, Nt), ee.elementType = R, ee.lanes = mn, ee;
      case j:
        return ee = $0(19, Pe, se, Nt), ee.elementType = j, ee.lanes = mn, ee;
      case N:
        return n4(Pe, Nt, mn, se);
      default:
        if (typeof ee == "object" && ee !== null) switch (ee.$$typeof) {
          case M:
            hr = 10;
            break e;
          case T:
            hr = 9;
            break e;
          case P:
            hr = 11;
            break e;
          case B:
            hr = 14;
            break e;
          case F:
            hr = 16, ot = null;
            break e;
        }
        throw Error(n(130, ee == null ? ee : typeof ee, ""));
    }
    return se = $0(hr, Pe, se, Nt), se.elementType = ee, se.type = ot, se.lanes = mn, se;
  }
  function Qx(ee, se, Pe, ot) {
    return ee = $0(7, ee, ot, se), ee.lanes = Pe, ee;
  }
  function n4(ee, se, Pe, ot) {
    return ee = $0(22, ee, ot, se), ee.elementType = N, ee.lanes = Pe, ee.stateNode = {
      isHidden: !1
    }, ee;
  }
  function NI(ee, se, Pe) {
    return ee = $0(6, ee, null, se), ee.lanes = Pe, ee;
  }
  function jI(ee, se, Pe) {
    return se = $0(4, ee.children !== null ? ee.children : [], ee.key, se), se.lanes = Pe, se.stateNode = {
      containerInfo: ee.containerInfo,
      pendingChildren: null,
      implementation: ee.implementation
    }, se;
  }
  function i8(ee, se, Pe, ot, Nt) {
    this.tag = se, this.containerInfo = ee, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = wt(0), this.expirationTimes = wt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wt(0), this.identifierPrefix = ot, this.onRecoverableError = Nt, this.mutableSourceEagerHydrationData = null;
  }
  function Sn(ee, se, Pe, ot, Nt, mn, hr, ra, ka) {
    return ee = new i8(ee, se, Pe, ra, ka), se === 1 ? (se = 1, mn === !0 && (se |= 8)) : se = 0, mn = $0(3, null, null, se), ee.current = mn, mn.stateNode = ee, mn.memoizedState = {
      element: ot,
      isDehydrated: Pe,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null
    }, ll(mn), ee;
  }
  function Or(ee, se, Pe) {
    var ot = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: S,
      key: ot == null ? null : "" + ot,
      children: ee,
      containerInfo: se,
      implementation: Pe
    };
  }
  function oa(ee) {
    if (!ee) return Kd;
    ee = ee._reactInternals;
    e: {
      if (vt(ee) !== ee || ee.tag !== 1) throw Error(n(170));
      var se = ee;
      do {
        switch (se.tag) {
          case 3:
            se = se.stateNode.context;
            break e;
          case 1:
            if (Qd(se.type)) {
              se = se.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        se = se.return;
      } while (se !== null);
      throw Error(n(171));
    }
    if (ee.tag === 1) {
      var Pe = ee.type;
      if (Qd(Pe)) return Jl(ee, Pe, se);
    }
    return se;
  }
  function ia(ee, se, Pe, ot, Nt, mn, hr, ra, ka) {
    return ee = Sn(Pe, ot, !0, ee, Nt, mn, hr, ra, ka), ee.context = oa(null), Pe = ee.current, ot = Ag(), Nt = i1(Pe), mn = Nh(ot, Nt), mn.callback = se ?? null, zf(Pe, mn, Nt), ee.current.lanes = Nt, jt(ee, Nt, ot), Am(ee, ot), ee;
  }
  function qa(ee, se, Pe, ot) {
    var Nt = se.current,
      mn = Ag(),
      hr = i1(Nt);
    return Pe = oa(Pe), se.context === null ? se.context = Pe : se.pendingContext = Pe, se = Nh(mn, hr), se.payload = {
      element: ee
    }, ot = ot === void 0 ? null : ot, ot !== null && (se.callback = ot), ee = zf(Nt, se, hr), ee !== null && (Xb(ee, Nt, hr, mn), Zv(ee, Nt, hr)), hr;
  }
  function mi(ee) {
    if (ee = ee.current, !ee.child) return null;
    switch (ee.child.tag) {
      case 5:
        return ee.child.stateNode;
      default:
        return ee.child.stateNode;
    }
  }
  function ro(ee, se) {
    if (ee = ee.memoizedState, ee !== null && ee.dehydrated !== null) {
      var Pe = ee.retryLane;
      ee.retryLane = Pe !== 0 && Pe < se ? Pe : se;
    }
  }
  function Di(ee, se) {
    ro(ee, se), (ee = ee.alternate) && ro(ee, se);
  }
  function _o() {
    return null;
  }
  var po = typeof reportError == "function" ? reportError : function (ee) {
    console.error(ee);
  };
  function Ao(ee) {
    this._internalRoot = ee;
  }
  Fo.prototype.render = Ao.prototype.render = function (ee) {
    var se = this._internalRoot;
    if (se === null) throw Error(n(409));
    qa(ee, se, null, null);
  }, Fo.prototype.unmount = Ao.prototype.unmount = function () {
    var ee = this._internalRoot;
    if (ee !== null) {
      this._internalRoot = null;
      var se = ee.containerInfo;
      Jb(function () {
        qa(null, ee, null, null);
      }), se[Ic] = null;
    }
  };
  function Fo(ee) {
    this._internalRoot = ee;
  }
  Fo.prototype.unstable_scheduleHydration = function (ee) {
    if (ee) {
      var se = yn();
      ee = {
        blockedOn: null,
        target: ee,
        priority: se
      };
      for (var Pe = 0; Pe < _r.length && se !== 0 && se < _r[Pe].priority; Pe++);
      _r.splice(Pe, 0, ee), Pe === 0 && yr(ee);
    }
  };
  function hs(ee) {
    return !(!ee || ee.nodeType !== 1 && ee.nodeType !== 9 && ee.nodeType !== 11);
  }
  function Rs(ee) {
    return !(!ee || ee.nodeType !== 1 && ee.nodeType !== 9 && ee.nodeType !== 11 && (ee.nodeType !== 8 || ee.nodeValue !== " react-mount-point-unstable "));
  }
  function xs() {}
  function Lu(ee, se, Pe, ot, Nt) {
    if (Nt) {
      if (typeof ot == "function") {
        var mn = ot;
        ot = function () {
          var ti = mi(hr);
          mn.call(ti);
        };
      }
      var hr = ia(se, ot, ee, 0, null, !1, !1, "", xs);
      return ee._reactRootContainer = hr, ee[Ic] = hr.current, wi(ee.nodeType === 8 ? ee.parentNode : ee), Jb(), hr;
    }
    for (; Nt = ee.lastChild;) ee.removeChild(Nt);
    if (typeof ot == "function") {
      var ra = ot;
      ot = function () {
        var ti = mi(ka);
        ra.call(ti);
      };
    }
    var ka = Sn(ee, 0, !1, null, null, !1, !1, "", xs);
    return ee._reactRootContainer = ka, ee[Ic] = ka.current, wi(ee.nodeType === 8 ? ee.parentNode : ee), Jb(function () {
      qa(se, ka, Pe, ot);
    }), ka;
  }
  function Sm(ee, se, Pe, ot, Nt) {
    var mn = Pe._reactRootContainer;
    if (mn) {
      var hr = mn;
      if (typeof Nt == "function") {
        var ra = Nt;
        Nt = function () {
          var ka = mi(hr);
          ra.call(ka);
        };
      }
      qa(se, hr, ee, Nt);
    } else hr = Lu(Pe, se, ee, Nt, ot);
    return mi(hr);
  }
  Pt = function (ee) {
    switch (ee.tag) {
      case 3:
        var se = ee.stateNode;
        if (se.current.memoizedState.isDehydrated) {
          var Pe = Vn(se.pendingLanes);
          Pe !== 0 && (Bt(se, Pe | 1), Am(se, qe()), (Fc & 6) === 0 && (yA = qe() + 500, Xm()));
        }
        break;
      case 13:
        Jb(function () {
          var ot = Zm(ee, 1);
          if (ot !== null) {
            var Nt = Ag();
            Xb(ot, ee, 1, Nt);
          }
        }), Di(ee, 1);
    }
  }, dt = function (ee) {
    if (ee.tag === 13) {
      var se = Zm(ee, 134217728);
      if (se !== null) {
        var Pe = Ag();
        Xb(se, ee, 134217728, Pe);
      }
      Di(ee, 134217728);
    }
  }, xt = function (ee) {
    if (ee.tag === 13) {
      var se = i1(ee),
        Pe = Zm(ee, se);
      if (Pe !== null) {
        var ot = Ag();
        Xb(Pe, ee, se, ot);
      }
      Di(ee, se);
    }
  }, yn = function () {
    return wn;
  }, gn = function (ee, se) {
    var Pe = wn;
    try {
      return wn = ee, se();
    } finally {
      wn = Pe;
    }
  }, Re = function (ee, se, Pe) {
    switch (se) {
      case "input":
        if (we(ee, Pe), se = Pe.name, Pe.type === "radio" && se != null) {
          for (Pe = ee; Pe.parentNode;) Pe = Pe.parentNode;
          for (Pe = Pe.querySelectorAll("input[name=" + JSON.stringify("" + se) + '][type="radio"]'), se = 0; se < Pe.length; se++) {
            var ot = Pe[se];
            if (ot !== ee && ot.form === ee.form) {
              var Nt = xg(ot);
              if (!Nt) throw Error(n(90));
              de(ot), we(ot, Nt);
            }
          }
        }
        break;
      case "textarea":
        ae(ee, Pe);
        break;
      case "select":
        se = Pe.value, se != null && fe(ee, !!Pe.multiple, se, !1);
    }
  }, Ke = Ky, Xe = Jb;
  var Vf = {
      usingClientEntryPoint: !1,
      Events: [wu, Df, xg, ze, Le, Ky]
    },
    Hf = {
      findFiberByHostInstance: vu,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom"
    },
    Yx = {
      bundleType: Hf.bundleType,
      version: Hf.version,
      rendererPackageName: Hf.rendererPackageName,
      rendererConfig: Hf.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: k.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (ee) {
        return ee = lt(ee), ee === null ? null : ee.stateNode;
      },
      findFiberByHostInstance: Hf.findFiberByHostInstance || _o,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var kA = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!kA.isDisabled && kA.supportsFiber) try {
      Pn = kA.inject(Yx), rn = kA;
    } catch {}
  }
  return x_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Vf, x_.createPortal = function (ee, se) {
    var Pe = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!hs(se)) throw Error(n(200));
    return Or(ee, se, null, Pe);
  }, x_.createRoot = function (ee, se) {
    if (!hs(ee)) throw Error(n(299));
    var Pe = !1,
      ot = "",
      Nt = po;
    return se != null && (se.unstable_strictMode === !0 && (Pe = !0), se.identifierPrefix !== void 0 && (ot = se.identifierPrefix), se.onRecoverableError !== void 0 && (Nt = se.onRecoverableError)), se = Sn(ee, 1, !1, null, null, Pe, !1, ot, Nt), ee[Ic] = se.current, wi(ee.nodeType === 8 ? ee.parentNode : ee), new Ao(se);
  }, x_.findDOMNode = function (ee) {
    if (ee == null) return null;
    if (ee.nodeType === 1) return ee;
    var se = ee._reactInternals;
    if (se === void 0) throw typeof ee.render == "function" ? Error(n(188)) : (ee = Object.keys(ee).join(","), Error(n(268, ee)));
    return ee = lt(se), ee = ee === null ? null : ee.stateNode, ee;
  }, x_.flushSync = function (ee) {
    return Jb(ee);
  }, x_.hydrate = function (ee, se, Pe) {
    if (!Rs(se)) throw Error(n(200));
    return Sm(null, ee, se, !0, Pe);
  }, x_.hydrateRoot = function (ee, se, Pe) {
    if (!hs(ee)) throw Error(n(405));
    var ot = Pe != null && Pe.hydratedSources || null,
      Nt = !1,
      mn = "",
      hr = po;
    if (Pe != null && (Pe.unstable_strictMode === !0 && (Nt = !0), Pe.identifierPrefix !== void 0 && (mn = Pe.identifierPrefix), Pe.onRecoverableError !== void 0 && (hr = Pe.onRecoverableError)), se = ia(se, null, ee, 1, Pe ?? null, Nt, !1, mn, hr), ee[Ic] = se.current, wi(ee), ot) for (ee = 0; ee < ot.length; ee++) Pe = ot[ee], Nt = Pe._getVersion, Nt = Nt(Pe._source), se.mutableSourceEagerHydrationData == null ? se.mutableSourceEagerHydrationData = [Pe, Nt] : se.mutableSourceEagerHydrationData.push(Pe, Nt);
    return new Fo(se);
  }, x_.render = function (ee, se, Pe) {
    if (!Rs(se)) throw Error(n(200));
    return Sm(null, ee, se, !1, Pe);
  }, x_.unmountComponentAtNode = function (ee) {
    if (!Rs(ee)) throw Error(n(40));
    return ee._reactRootContainer ? (Jb(function () {
      Sm(null, null, ee, !1, function () {
        ee._reactRootContainer = null, ee[Ic] = null;
      });
    }), !0) : !1;
  }, x_.unstable_batchedUpdates = Ky, x_.unstable_renderSubtreeIntoContainer = function (ee, se, Pe, ot) {
    if (!Rs(Pe)) throw Error(n(200));
    if (ee == null || ee._reactInternals === void 0) throw Error(n(38));
    return Sm(ee, se, Pe, !1, ot);
  }, x_.version = "18.3.1-next-f1338f8080-20240426", x_;
}

var oHt;

function b4n() {
  if (oHt) return ret.exports;
  oHt = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
    } catch (t) {
      console.error(t);
    }
  }
  return e(), ret.exports = GEr(), ret.exports;
}

var Da = b4n();

const Kpe = j4e(Da),
  GDe = 760,
  sHt = 650,
  VEr = 640,
  HEr = {
    width: `min(${sHt}px, 90vw)`,
    minWidth: `min(${VEr}px, 90vw)`,
    maxWidth: `min(${sHt}px, 90vw)`,
    boxSizing: "border-box",
    flexShrink: 0
  };

function eZ(e) {
  return !Number.isFinite(e) || e <= 0 ? 1 : 1 / e;
}

function WEr(e, t = 48, n = 60) {
  return Math.min(t * eZ(e), n);
}

const H4e = 80,
  qEr = 56,
  W4e = "bg-[#1f1f1f] border-zinc-800 shadow-none",
  q4e = "bg-white border-[rgba(0,0,0,0.18)] shadow-none",
  KEr = 400,
  zVe = {
    width: `min(${GDe}px, 90vw)`,
    maxWidth: `min(${GDe}px, 90vw)`,
    boxSizing: "border-box",
    flexShrink: 0
  },
  M5t = "pointer-events-auto absolute left-1/2 top-full z-[120] flex min-h-0 max-h-[min(90vh,720px)] min-w-0 shrink-0 flex-col overflow-visible",
  wD = "absolute left-1/2 top-full z-[120] flex min-h-0 max-h-[min(90vh,720px)] min-w-0 shrink-0 flex-col overflow-visible",
  P5t = "box-border flex w-full min-w-0 flex-col rounded-2xl border px-3 pb-2 pt-3",
  R5t = "group/prompt relative mb-2 min-w-0 shrink-0 overflow-hidden",
  N5t = "flex w-full min-w-0 flex-col overflow-hidden bg-transparent p-2",
  lHt = new WeakMap();

function QEr(e, t) {
  if (!e || lHt.get(e) === t) return;
  lHt.set(e, t);
  const r = eZ(t);
  e.style.setProperty("--canvas-locked-ui-scale", String(r)), e.style.setProperty("--float-scale", String(r)), e.style.setProperty("--float-offset", `${WEr(t)}px`);
}

function pY(e) {
  const t = Number.isFinite(e.zoom) ? e.zoom : 1,
    n = Number.isFinite(e.x) ? e.x : 0,
    r = Number.isFinite(e.y) ? e.y : 0;
  return {
    x: n,
    y: r,
    zoom: t,
    transform: `translate(${n}px, ${r}px) scale(${t})`
  };
}

let jM = null;

function cHt(e) {
  jM = e;
}

function v4n(e) {
  const t = [],
    n = e.children;
  if (!n) return t;
  for (let r = 0; r < n.length; r++) {
    const a = n[r];
    a.hasAttribute("data-canvas-world-layer") && t.push(a);
  }
  return t;
}

function YEr(e) {
  const t = v4n(e);
  return t.length > 0 ? t : [e];
}

function j5t(e, t) {
  const n = v4n(e);
  if (n.length === 0) {
    e.style.transform = t;
    return;
  }
  e.style.transform && (e.style.transform = "");
  for (let r = 0; r < n.length; r++) n[r].style.transform = t;
}

function w4n(e) {
  if (e) for (const t of YEr(e)) t.style.willChange && (t.style.willChange = "");
}

function XEr(e, t) {
  if (!e) return;
  const n = pY(t);
  j5t(e, n.transform), jM == null || jM(n);
}

function mY(e, t) {
  if (!e) return;
  const n = pY(t);
  j5t(e, n.transform), QEr(e, n.zoom), jM == null || jM(n);
}

function VDe(e, t, n, r) {
  if (!e) return;
  const a = `translate(${t}px, ${n}px) scale(${r})`;
  j5t(e, a), jM == null || jM({
    x: t,
    y: n,
    zoom: r
  });
}

const JEr = 1;

function dHt(e, t) {
  return Math.abs(e.x - t.x) > .5 || Math.abs(e.y - t.y) > .5 || Math.abs(e.zoom - t.zoom) > 1e-4;
}

function D5t(e, t, n = JEr) {
  return e * e + t * t >= n * n;
}

function oet(e) {
  const t = pY(e);
  return {
    x: t.x,
    y: t.y,
    zoom: t.zoom
  };
}

function ZEr(e, t, n = {
  x: 0,
  y: 0
}) {
  return {
    viewX: e.x - n.x,
    viewY: e.y - n.y,
    clientX: t.x - n.x,
    clientY: t.y - n.y
  };
}

function eTr(e) {
  const {
    origin: t,
    view: n,
    clientX: r,
    clientY: a,
    lastMouse: i
  } = e;
  if (t) {
    const l = t.viewX + (r - t.clientX),
      d = t.viewY + (a - t.clientY);
    return l === n.x && d === n.y ? null : {
      x: l,
      y: d,
      lastMouse: null
    };
  }
  const o = r - i.x,
    s = a - i.y;
  return o === 0 && s === 0 ? null : {
    x: n.x + o,
    y: n.y + s,
    lastMouse: {
      x: r,
      y: a
    }
  };
}

function tTr(e) {
  const t = !!e.pendingStart && !e.isPanning;
  if (e.mouseUpFired && !t) return {
    type: "ignore"
  };
  if (!e.isPanning && !t) return {
    type: "ignore"
  };
  if (!e.ignoreReleasedButtons) {
    if (e.isMiddleMouse) {
      if ((e.buttons & 4) === 0) return {
        type: "release"
      };
    } else if ((e.buttons & 1) === 0) return {
      type: "release"
    };
  }
  if (t) {
    if (!e.pendingStart) return {
      type: "ignore"
    };
    const n = e.clientX - e.pendingStart.x,
      r = e.clientY - e.pendingStart.y;
    return D5t(n, r) ? {
      type: "begin",
      dx: n,
      dy: r
    } : {
      type: "wait-slop"
    };
  }
  return {
    type: "schedule"
  };
}

function uHt(e, t) {
  return e && !t;
}

function nTr(e, t, n) {
  return e || t || n;
}

const rTr = 150,
  HDe = 800;

function set(e) {
  return e.panning || e.zooming || e.interacting || e.panPending || !!e.cullFrozen;
}

function aTr(e) {
  return e.cullFreeze ? e.cullFreeze : e.frozen ? e.frozenView : e.liveView;
}

function iTr(e) {
  return e.panning || e.zooming || e.panPending || !!e.held;
}

function oTr(e) {
  return e.panning && !e.zooming;
}

function sTr(e) {
  return e.interacting || e.hookPanning || e.viewRefPending || e.dragStatePanning || e.panPending || e.cullFrozen;
}

function x4n() {
  return typeof document > "u" ? null : document.querySelector(".canvas-world");
}

let gbe = 0,
  zH = null;

function UVe() {
  const e = () => {
    Ib.current || Gg.current || Y4e || performance.now() < gbe || w4n(x4n());
  };
  if (typeof requestAnimationFrame == "function") {
    requestAnimationFrame(e);
    return;
  }
  e();
}

function lTr(e) {
  gbe = Math.max(gbe, performance.now() + Math.max(0, e)), zH != null && clearTimeout(zH);
  const t = Math.max(0, gbe - performance.now());
  zH = setTimeout(() => {
    zH = null, UVe();
  }, t + 8);
}

let Ib = {
    current: !1
  },
  Gg = {
    current: !1
  },
  _4n = !1,
  k4n = !1,
  V_ = null,
  H_ = null,
  N9e = 0;

const spt = new Set(),
  lpt = new Set(),
  cpt = new Set(),
  dpt = new Set(),
  upt = new Set();

function sU() {
  const e = Yi();
  cpt.forEach(t => {
    try {
      t(e);
    } catch (n) {
      console.error("[canvasDragState] view interacting listener error:", n);
    }
  });
}

function A4n() {
  sU();
}

function $v(e) {
  return cpt.add(e), e(Yi()), () => cpt.delete(e);
}

const hpt = new Set(),
  ppt = new Set();

function S4n(e) {
  const t = Q4e(e);
  return ppt.forEach(n => {
    try {
      n(t);
    } catch (r) {
      console.error("[canvasDragState] zoom-chrome listener error:", r);
    }
  }), t;
}

function K4e(e) {
  return ppt.add(e), () => ppt.delete(e);
}

const mpt = new Set(),
  fpt = new Set();

let fY = oU();

function Q4e(e) {
  return fY = {
    x: e.x,
    y: e.y,
    zoom: e.zoom
  }, fY;
}

function Rle(e) {
  const t = Q4e(e);
  hpt.forEach(n => {
    try {
      n(t);
    } catch (r) {
      console.error("[canvasDragState] view listener error:", r);
    }
  });
}

let fae = null,
  ybe = null;

function I4n(e) {
  mpt.forEach(t => {
    try {
      t(e);
    } catch (n) {
      console.error("[canvasDragState] pan-frame view listener error:", n);
    }
  });
}

function L5t(e) {
  ybe = Q4e(e), fae == null && (fae = requestAnimationFrame(() => {
    fae = null;
    const t = ybe;
    ybe = null, t && I4n(t);
  }));
}

function C4n(e) {
  fae != null && (cancelAnimationFrame(fae), fae = null);
  const t = e ? Q4e(e) : ybe ?? fY;
  ybe = null, I4n(t);
}

function E4n(e) {
  const t = Q4e(e);
  return fpt.forEach(n => {
    try {
      n(t);
    } catch (r) {
      console.error("[canvasDragState] minimap pan listener error:", r);
    }
  }), t;
}

function T4n(e) {
  return fpt.add(e), () => fpt.delete(e);
}

function Cd() {
  return fY;
}

function dw(e) {
  return hpt.add(e), e(fY), () => hpt.delete(e);
}

function O5t(e) {
  return mpt.add(e), () => mpt.delete(e);
}

const jS = [],
  C2 = new Map();

function gpt(e) {
  _4n = e, spt.forEach(t => {
    try {
      t(e);
    } catch (n) {
      console.error("[canvasDragState] pan listener error:", n);
    }
  });
}

function cTr(e) {
  dpt.forEach(t => {
    try {
      t(e);
    } catch (n) {
      console.error("[canvasDragState] pan activity listener error:", n);
    }
  });
}

function D$(e) {
  return dpt.add(e), e(Ib.current), () => dpt.delete(e);
}

function dTr(e) {
  upt.forEach(t => {
    try {
      t(e);
    } catch (n) {
      console.error("[canvasDragState] zoom activity listener error:", n);
    }
  });
}

function L$(e) {
  return upt.add(e), e(Gg.current), () => upt.delete(e);
}

const ypt = 2,
  M4n = 256,
  uTr = 64;

let gae = null;

function hTr() {
  gae != null && (cancelAnimationFrame(gae), gae = null);
}

function hHt(e) {
  const t = [];
  for (; t.length < e && jS.length > 0;) {
    const n = jS.shift();
    n && t.push(n);
  }
  if (t.length < e && C2.size > 0) for (const [n, r] of C2) {
    if (t.length >= e) break;
    C2.delete(n), t.push(r);
  }
  return t;
}

function P4n() {
  if (gae == null) {
    if (typeof requestAnimationFrame != "function") {
      for (; !Yi();) {
        const e = hHt(ypt);
        if (e.length === 0) {
          cet();
          break;
        }
        Da.unstable_batchedUpdates(() => {
          for (const t of e) try {
            t();
          } catch (n) {
            console.error("[canvasDragState] deferred flush failed:", n);
          }
        });
      }
      return;
    }
    gae = requestAnimationFrame(() => {
      if (gae = null, Yi()) return;
      const e = hHt(ypt);
      if (e.length === 0) {
        cet();
        return;
      }
      Da.unstable_batchedUpdates(() => {
        for (const t of e) try {
          t();
        } catch (n) {
          console.error("[canvasDragState] deferred flush failed:", n);
        }
      }), jS.length > 0 || C2.size > 0 ? P4n() : cet();
    });
  }
}

function B5t() {
  Yi() || P4n();
}

function R4n() {
  hTr();
  const e = jS.length + C2.size;
  return jS.splice(0, jS.length), C2.clear(), jle(), Ie(async () => {
    const {
      resetGenerationTerminalCommitSchedule: t
    } = await Promise.resolve().then(() => Mva);
    return {
      resetGenerationTerminalCommitSchedule: t
    };
  }, void 0, import.meta.url).then(({
    resetGenerationTerminalCommitSchedule: t
  }) => {
    t();
  }).catch(() => {}), e;
}

function oM() {
  Dle(), Nle();
}

function F5t(e) {
  C2.delete(e);
}

function O$(e) {
  if (!Yi()) {
    e();
    return;
  }
  for (jS.push(e); jS.length > M4n;) jS.shift();
}

function Nle() {
  if (!Yi()) {
    if (Lle()) {
      j4n();
      return;
    }
    Z4e(), B5t();
  }
}

function N4n() {
  Nle();
}

const bpt = new Set();

let jEe = null;

const pTr = 150,
  mTr = 420;

let yae = null;

function jle() {
  yae != null && (clearTimeout(yae), yae = null);
}

function z5t() {
  if (nZ.size > 0 || WVe) return !0;
  if (typeof document > "u") return !1;
  const e = document.body;
  return e.classList.contains("canvas-node-dragging") || e.classList.contains("canvas-box-select-group-dragging");
}

function fTr() {
  if (z5t() || Ib.current || Gg.current) return C2.size > 0;
  if (C2.size === 0) return !1;
  const e = [...C2.values()];
  return C2.clear(), e.length === 0 ? !1 : (Da.unstable_batchedUpdates(() => {
    for (const t of e) try {
      t();
    } catch (n) {
      console.error("[canvasDragState] progress flush failed:", n);
    }
  }), !0);
}

function gTr() {
  return Ib.current || Gg.current ? mTr : pTr;
}

function U5t() {
  Yi() && (Ib.current || Gg.current || z5t() || yae == null && (yae = window.setTimeout(() => {
    yae = null, Yi() && (fTr(), Yi() && C2.size > 0 && U5t());
  }, gTr())));
}

function yTr() {
  U5t();
}

function pHt() {
  typeof window < "u" && window.dispatchEvent(new CustomEvent("canvasActivity"));
}

function cet() {
  jEe != null && clearTimeout(jEe), jEe = globalThis.setTimeout(() => {
    jEe = null, !Yi() && bpt.forEach(e => {
      try {
        e();
      } catch (t) {
        console.error("[canvasDragState] settled listener error:", t);
      }
    });
  }, 200);
}

function $Ve(e) {
  return bpt.add(e), () => bpt.delete(e);
}

let DEe = null;

const bTr = 12e3;

let mHt = 0;

function Rwe(e = 4200) {
  const t = performance.now();
  WDe() || (mHt = t);
  const n = mHt + bTr;
  if (N9e = Math.max(N9e, Math.min(t + e, n)), typeof document < "u") {
    document.body.classList.add("canvas-generation-burst"), DEe && clearTimeout(DEe);
    const r = Math.max(0, N9e - performance.now()) + 40;
    DEe = setTimeout(() => {
      DEe = null, !WDe() && typeof document < "u" && document.body.classList.remove("canvas-generation-burst");
    }, r);
  }
}

function WDe() {
  return performance.now() < N9e;
}

const vTr = 120;

let qDe = 0,
  det = null;

function Dle() {
  qDe = Math.max(qDe, performance.now() + vTr);
}

function Lle() {
  return performance.now() < qDe;
}

function $5t() {
  return Math.max(0, qDe - performance.now());
}

function j4n() {
  if (det != null) return;
  const e = $5t();
  e <= 0 || (det = setTimeout(() => {
    det = null, !Yi() && (Z4e(), B5t());
  }, e + 8));
}

let gz = 0;

function D4n(e) {
  const t = () => {
      const r = e.classList.contains("canvas-interacting") && !e.classList.contains("canvas-node-dragging"),
        a = r && !e.classList.contains("canvas-box-select-group-dragging");
      for (const [i, o] of [["data-canvas-subtree-effects", r], ["data-canvas-subtree-hit-block", a]]) e.hasAttribute(i) !== o && e.toggleAttribute(i, o);
    },
    n = new MutationObserver(t);
  return n.observe(e, {
    attributes: !0,
    attributeFilter: ["class"]
  }), t(), () => {
    n.disconnect(), e.removeAttribute("data-canvas-subtree-effects"), e.removeAttribute("data-canvas-subtree-hit-block");
  };
}

let Y4e = !1;

function Aj(e) {
  const t = gz === 0;
  gz++, !(e != null && e.skipBodyClass) && typeof document < "u" && document.body.classList.add("canvas-interacting"), t && !(e != null && e.skipNotify) && sU();
}

function lU() {
  gz > 0 && gz--, gz === 0 && typeof document < "u" && (document.body.classList.remove("canvas-interacting"), jle(), sU(), Gg.current || Nwe(!1), Dle(), Nle());
}

function yP(e) {
  if (!(e != null && e.force)) {
    if (nZ.size > 0) return;
    if (typeof document < "u") {
      const r = document.body;
      if (r.classList.contains("canvas-node-dragging") || r.classList.contains("canvas-box-select-group-dragging")) return;
    }
  }
  const t = (e == null ? void 0 : e.force) && _4n,
    n = (e == null ? void 0 : e.force) && k4n;
  if (e != null && e.force && (V_ != null && (cancelAnimationFrame(V_), V_ = null), H_ != null && (cancelAnimationFrame(H_), H_ = null), Ib.current = !1, Gg.current = !1, WVe = !1, w4n(x4n())), gz = 0, jle(), d7(), VVe(), bbe = 0, UH != null && (clearTimeout(UH), UH = null), gbe = 0, zH != null && (clearTimeout(zH), zH = null), typeof document < "u" && (document.body.classList.remove("canvas-interacting"), HVe(!1), document.body.classList.remove("canvas-pan-lite"), e != null && e.force)) {
    document.body.classList.remove("canvas-node-dragging"), document.body.classList.remove("canvas-box-select-group-dragging");
    const r = typeof document.getElementById == "function" ? document.getElementById("canvas-bg") : null;
    r == null || r.classList.remove("canvas-node-dragging"), r == null || r.classList.remove("canvas-local-node-dragging"), r == null || r.classList.remove("canvas-box-select-group-dragging"), r == null || r.classList.remove("canvas-panning"), r == null || r.classList.remove("canvas-local-panning"), r == null || r.classList.remove("canvas-minimap-dragging"), r == null || r.classList.remove("canvas-viewport-interacting");
  }
  t && gpt(!1), n && Nwe(!1), sU(), gY();
}

let KDe = null;

function GVe(e) {
  KDe || (KDe = {
    x: e.x,
    y: e.y,
    zoom: e.zoom
  });
}

function VVe() {
  KDe = null;
}

function bae() {
  return KDe;
}

const uet = "data-gesture-lite",
  het = "data-pan-lite",
  pet = "data-zoom-lite";

let j9e = null;

function vpt(e) {
  j9e = e;
}

function G5t() {
  j9e == null || j9e();
}

let bbe = 0,
  UH = null;

function wTr() {
  return performance.now() < bbe;
}

function V5t(e) {
  bbe = Math.max(bbe, performance.now() + Math.max(0, e)), gY(), UH != null && clearTimeout(UH);
  const t = Math.max(0, bbe - performance.now());
  UH = setTimeout(() => {
    UH = null, gY();
  }, t + 8);
}

function gY() {
  if (typeof document > "u" || typeof document.querySelector != "function") return;
  const e = document.querySelector(".canvas-world");
  if (!e) return;
  const t = iTr({
    panning: Ib.current,
    zooming: Gg.current,
    panPending: Y4e,
    held: wTr()
  });
  t !== e.hasAttribute(uet) && (t ? e.setAttribute(uet, "") : e.removeAttribute(uet));
  const n = Gg.current;
  n !== e.hasAttribute(pet) && (n ? e.setAttribute(pet, "") : e.removeAttribute(pet));
  const r = oTr({
    panning: Ib.current,
    zooming: Gg.current
  });
  r !== e.hasAttribute(het) && (r ? e.setAttribute(het, "") : e.removeAttribute(het));
}

function HVe(e, t) {
  var r;
  if (Y4e = e, e ? GVe(t ?? fY) : Ib.current || (VVe(), UVe()), gY(), typeof document > "u") return;
  const n = (r = document.getElementById) == null ? void 0 : r.call(document, "canvas-pan-hit-shield");
  n == null || n.classList.toggle("canvas-pan-hit-shield--active", e), e || L4n(!1), document.body.classList.contains("canvas-pan-pending") && document.body.classList.remove("canvas-pan-pending");
}

function Av() {
  var e, t;
  return Y4e ? !0 : typeof document > "u" ? !1 : document.body.classList.contains("canvas-pan-pending") || !!((t = (e = document.getElementById) == null ? void 0 : e.call(document, "canvas-pan-hit-shield")) != null && t.classList.contains("canvas-pan-hit-shield--active"));
}

function H5t() {
  return typeof document < "u" && document.body.classList.contains("canvas-interacting");
}

function vae(e, t) {
  if (!Yi()) {
    e();
    return;
  }
  if (t) {
    C2.set(t, e), U5t();
    return;
  }
  for (jS.push(e); jS.length > M4n;) jS.shift();
}

function tZ(e) {
  return spt.add(e), () => spt.delete(e);
}

function Nwe(e) {
  k4n = e, lpt.forEach(t => {
    try {
      t(e);
    } catch (n) {
      console.error("[canvasDragState] zoom listener error:", n);
    }
  });
}

function X4e(e) {
  return lpt.add(e), e(Gg.current), () => lpt.delete(e);
}

function L4n(e) {
  var r, a, i;
  if (typeof document > "u" || typeof document.getElementById != "function") return;
  const t = document.getElementById("canvas-pan-hit-shield");
  t == null || t.classList.toggle("canvas-pan-hit-shield--grabbing", e);
  const n = e ? "var(--canvas-pan-grab-cursor, grabbing)" : "";
  e ? (r = t == null ? void 0 : t.style) == null || r.setProperty("cursor", n, "important") : (a = t == null ? void 0 : t.style) == null || a.removeProperty("cursor"), (i = document.getElementById("canvas-node-drag-hit-shield")) == null || i.classList.toggle("canvas-node-drag-hit-shield--panning", e);
}

function XC(e, t) {
  L4n(e);
  const n = Ib.current;
  if (Ib.current = e, e ? (G5t(), GVe(fY)) : n !== e && (VVe(), HVe(!1)), gY(), n !== e) {
    if (!e && !Gg.current && UVe(), cTr(e), t != null && t.skipNotify) {
      V_ != null && (cancelAnimationFrame(V_), V_ = null), e || (jle(), pHt(), Dle(), Nle());
      return;
    }
    if (e) {
      V_ != null && cancelAnimationFrame(V_), V_ = requestAnimationFrame(() => {
        V_ = requestAnimationFrame(() => {
          V_ = null, Ib.current && (gpt(!0), sU());
        });
      });
      return;
    }
    V_ != null && (cancelAnimationFrame(V_), V_ = null), jle(), gpt(!1), sU(), Gg.current || Nwe(!1), pHt(), Dle(), Nle();
  }
}

function jl() {
  return Ib.current;
}

let W5t = !1;

function O4n() {
  W5t = !0;
}

function wpt() {
  W5t = !1;
}

function wae() {
  return W5t;
}

function xTr() {
  return Ib;
}

function xv(e, t) {
  const n = Gg.current;
  if (Gg.current = e, e && G5t(), gY(), n !== e) {
    if (!e && !Ib.current && (lTr(HDe), V5t(HDe), UVe()), dTr(e), e) {
      yTr(), H_ != null && cancelAnimationFrame(H_), H_ = requestAnimationFrame(() => {
        H_ = null, Gg.current && (Nwe(!0), sU());
      });
      return;
    }
    H_ != null && (cancelAnimationFrame(H_), H_ = null), jle(), Dle(), t != null && t.skipNotify || (H_ != null && cancelAnimationFrame(H_), H_ = requestAnimationFrame(() => {
      H_ = null, !(Gg.current || Ib.current) && (Nwe(!1), sU());
    })), t != null && t.skipDeferredFlush || Nle();
  }
}

function Rl() {
  return Gg.current;
}

let B4n = !1;

function D9e(e) {
  B4n = e;
}

function F4n() {
  return B4n;
}

function _Tr() {
  return Gg;
}

function Yi() {
  return Ib.current || Gg.current || Y4e || gz > 0 || H5t();
}

function J4e() {
  return Ib.current || Gg.current || gz > 0 || z5t() || H5t();
}

const $C = [];

let xae = null,
  LEe = null;

const z4n = 500;

function kTr() {
  xae != null && (clearTimeout(xae), xae = null);
}

function QDe() {
  xae == null && (typeof window > "u" || (xae = window.setTimeout(() => {
    if (xae = null, J4e()) {
      QDe();
      return;
    }
    Z4e();
  }, z4n)));
}

function Z4e() {
  var t;
  if ($C.length === 0) return;
  if (Lle()) {
    j4n();
    return;
  }
  if (LEe != null) return;
  if (typeof window > "u") {
    for (; $C.length > 0;) (t = $C.shift()) == null || t.resolve();
    return;
  }
  const e = () => {
    if (LEe = null, J4e()) {
      QDe();
      return;
    }
    let n = 0;
    for (; n < ypt && $C.length > 0;) {
      const r = $C.shift();
      n += 1;
      try {
        r == null || r.resolve();
      } catch (a) {
        console.error("[canvasDragState] idle waiter resolve failed:", a);
      }
    }
    $C.length > 0 ? LEe = requestAnimationFrame(e) : kTr();
  };
  LEe = requestAnimationFrame(e);
}

function vb(e = z4n) {
  return J4e() ? new Promise(t => {
    if ($C.length >= uTr) {
      const n = $C[$C.length - 1],
        r = n.resolve;
      n.resolve = () => {
        try {
          r();
        } catch {}
        t();
      }, QDe();
      return;
    }
    $C.push({
      resolve: t
    }), QDe();
  }) : Promise.resolve();
}

function U4n() {
  return (nZ.size > 0 || H5t()) && !Ib.current && !Gg.current;
}

let nZ = new Set(),
  WVe = !1;

function $4n() {
  return WVe;
}

function xpt(e) {
  WVe = e, !e && !J4e() && Z4e();
}

const ATr = 200;

function q5t(e) {
  return Yi() && performance.now() - e < ATr;
}

function cU(e) {
  nZ = new Set(e), G4n();
}

function d7() {
  nZ = new Set(), G4n(), J4e() || Z4e();
}

function G4n() {
  var e, t;
  typeof document > "u" || (t = (e = document.getElementById) == null ? void 0 : e.call(document, "canvas-node-drag-hit-shield")) == null || t.classList.toggle("canvas-node-drag-hit-shield--active", nZ.size > 0);
}

function qE() {
  return nZ;
}

function STr() {
  return {
    deferredReactQueue: jS.length,
    deferredByNodeId: C2.size,
    idleWaiters: $C.length
  };
}

const W2 = Object.freeze(Object.defineProperty({
  __proto__: null,
  awaitCanvasViewportGestureIdle: vb,
  beginCanvasInteracting: Aj,
  cancelDeferredCanvasUpdatesForNode: F5t,
  clearActiveNodeDragIds: d7,
  clearCanvasPanClassRemovalPending: wpt,
  deferCanvasReactUpdate: vae,
  deferCanvasReactUpdateUntilIdle: O$,
  discardDeferredCanvasReactUpdates: R4n,
  endCanvasInteracting: lU,
  flushCanvasViewPanFrame: C4n,
  flushDeferredCanvasReactUpdates: B5t,
  flushDeferredCanvasReactUpdatesIfIdle: N4n,
  freezeCanvasViewportCull: GVe,
  getActiveNodeDragIds: qE,
  getCanvasGestureReleaseQuietRemaining: $5t,
  getCanvasPanning: jl,
  getCanvasPanningRef: xTr,
  getCanvasStackDragging: F4n,
  getCanvasViewportCullFreeze: bae,
  getCanvasZooming: Rl,
  getCanvasZoomingRef: _Tr,
  getDeferredQueueAudit: STr,
  getLatestCanvasView: Cd,
  holdCanvasGestureLite: V5t,
  interruptProgrammaticViewport: G5t,
  isCanvasGenerationBurst: WDe,
  isCanvasGestureReleaseQuiet: Lle,
  isCanvasNodeMovementActive: U4n,
  isCanvasNodeResizeActive: $4n,
  isCanvasPanClassRemovalPending: wae,
  isCanvasPanPending: Av,
  isCanvasViewInteracting: Yi,
  markCanvasGenerationBurst: Rwe,
  markCanvasGestureReleaseQuiet: Dle,
  markCanvasPanClassRemovalPending: O4n,
  notifyCanvasInteractionEnded: oM,
  notifyCanvasViewInteracting: A4n,
  observeCanvasInteractionSubtreeState: D4n,
  publishCanvasMinimapPan: E4n,
  publishCanvasView: Rle,
  publishCanvasViewPanFrame: L5t,
  publishCanvasZoomChrome: S4n,
  releaseCanvasViewportCullFreeze: VVe,
  resetCanvasInteracting: yP,
  setActiveNodeDragIds: cU,
  setCanvasNodeResizeActive: xpt,
  setCanvasPanPending: HVe,
  setCanvasPanning: XC,
  setCanvasStackDragging: D9e,
  setCanvasZooming: xv,
  setProgrammaticViewportInterrupt: vpt,
  shouldDeferCanvasStreamingFrame: q5t,
  subscribeCanvasInteractionSettled: $Ve,
  subscribeCanvasMinimapPan: T4n,
  subscribeCanvasPanActivity: D$,
  subscribeCanvasPanning: tZ,
  subscribeCanvasView: dw,
  subscribeCanvasViewInteracting: $v,
  subscribeCanvasViewPanFrame: O5t,
  subscribeCanvasZoomActivity: L$,
  subscribeCanvasZoomChrome: K4e,
  subscribeCanvasZooming: X4e,
  syncCanvasGestureLite: gY
}, Symbol.toStringTag, {
  value: "Module"
}));

class V4n {
  constructor(t) {
    On(this, "maxConcurrent");
    On(this, "minStartGapMs");
    On(this, "pauseRetryMs");
    On(this, "shouldPause");
    On(this, "maxPauseMs");
    On(this, "queue", []);
    On(this, "activeCount", 0);
    On(this, "lastStartedAt", Number.NEGATIVE_INFINITY);
    On(this, "drainTimer", null);
    On(this, "pausedSince", null);
    On(this, "drain", () => {
      if (!(this.queue.length === 0 || this.activeCount >= this.maxConcurrent)) {
        if (this.shouldPause() && (this.pausedSince ?? (this.pausedSince = Date.now()), this.maxPauseMs <= 0 || Date.now() - this.pausedSince < this.maxPauseMs)) {
          this.scheduleDrain(this.pauseRetryMs);
          return;
        }
        for (this.pausedSince = null; this.activeCount < this.maxConcurrent && this.queue.length > 0;) {
          const t = Math.max(0, this.lastStartedAt + this.minStartGapMs - Date.now());
          if (t > 0) {
            this.scheduleDrain(t);
            return;
          }
          const n = this.queue.shift();
          if (this.activeCount += 1, this.lastStartedAt = Date.now(), n.operation().then(n.resolve, n.reject).finally(() => {
            this.activeCount -= 1, this.drain();
          }), this.minStartGapMs > 0 && this.queue.length > 0) {
            this.scheduleDrain(this.minStartGapMs);
            return;
          }
        }
      }
    });
    this.maxConcurrent = Math.max(1, Math.floor(t.maxConcurrent)), this.minStartGapMs = Math.max(0, Math.floor(t.minStartGapMs)), this.pauseRetryMs = Math.max(16, Math.floor(t.pauseRetryMs ?? 80)), this.shouldPause = t.shouldPause ?? (() => !1), this.maxPauseMs = Math.max(0, Math.floor(t.maxPauseMs ?? 12e3));
  }
  run(t) {
    return new Promise((n, r) => {
      this.queue.push({
        operation: t,
        resolve: n,
        reject: r
      }), this.drain();
    });
  }
  getStatus() {
    return {
      active: this.activeCount,
      queued: this.queue.length
    };
  }
  scheduleDrain(t) {
    this.drainTimer === null && (this.drainTimer = setTimeout(() => {
      this.drainTimer = null, this.drain();
    }, Math.max(0, t)));
  }
}

const qVe = new V4n({
  maxConcurrent: 2,
  minStartGapMs: 40,
  pauseRetryMs: 80,
  maxPauseMs: 12e3,
  shouldPause: Yi
});

function H4n() {
  return new Promise(e => {
    const t = globalThis;
    if (typeof t.requestIdleCallback == "function") {
      t.requestIdleCallback(() => e(), {
        timeout: 240
      });
      return;
    }
    if (typeof requestAnimationFrame == "function") {
      requestAnimationFrame(() => setTimeout(e, 0));
      return;
    }
    setTimeout(e, 0);
  });
}

class W4n {
  constructor(t = {}) {
    On(this, "isEnabled");
    On(this, "shouldPause");
    On(this, "waitForGestureIdle");
    On(this, "waitForIdleSlice");
    On(this, "maxWaitMs");
    On(this, "gate");
    this.isEnabled = t.isEnabled ?? (() => !ua()), this.shouldPause = t.shouldPause ?? Yi, this.waitForGestureIdle = t.waitForGestureIdle ?? vb, this.waitForIdleSlice = t.waitForIdleSlice ?? H4n, this.maxWaitMs = Math.max(0, Math.floor(t.maxWaitMs ?? 12e3)), this.gate = new V4n({
      maxConcurrent: 1,
      minStartGapMs: t.minStartGapMs ?? 36,
      pauseRetryMs: t.pauseRetryMs ?? 80,
      maxPauseMs: this.maxWaitMs,
      shouldPause: this.shouldPause
    });
  }
  run(t) {
    return this.isEnabled() ? this.gate.run(async () => (this.shouldPause() && this.maxWaitMs > 0 && (await Promise.race([this.waitForGestureIdle(), new Promise(n => setTimeout(n, this.maxWaitMs))])), this.shouldPause() || (await this.waitForIdleSlice()), t())) : t();
  }
  getStatus() {
    return this.gate.getStatus();
  }
}

const ITr = new W4n();

function xD(e) {
  return ITr.run(e);
}

const CTr = Object.freeze(Object.defineProperty({
    __proto__: null,
    LocalPreviewWorkQueue: W4n,
    runLocalPreviewWork: xD,
    waitForLocalPreviewIdleSlice: H4n
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  ETr = 2;

let vbe = 0;

const K5t = [];

let Uge = 0,
  _pt = 0;

function TTr() {
  vbe = Math.max(0, vbe - 1);
  const e = K5t.shift();
  e && e();
}

function MTr() {
  return vbe < ETr ? (vbe += 1, Promise.resolve()) : new Promise(e => {
    K5t.push(() => {
      vbe += 1, e();
    });
  });
}

function kpt() {
  return Uge > 0;
}

function Q5t() {
  Uge += 1;
  let e = !1;
  return () => {
    if (!e && (e = !0, Uge = Math.max(0, Uge - 1), Uge === 0)) {
      _pt += 1;
      const t = K5t.splice(0);
      for (const n of t) n();
    }
  };
}

class YDe extends Error {
  constructor() {
    super("history-list-media-io-cancelled"), this.name = "HistoryListMediaIoCancelledError";
  }
}

function PTr(e) {
  return e instanceof YDe || e instanceof Error && e.name === "HistoryListMediaIoCancelledError";
}

async function q4n(e) {
  if (!kpt()) throw new YDe();
  const t = _pt;
  await MTr();
  try {
    if (!kpt() || t !== _pt) throw new YDe();
    return await e();
  } finally {
    TTr();
  }
}

const Y5t = Object.freeze(Object.defineProperty({
    __proto__: null,
    HistoryListMediaIoCancelledError: YDe,
    acquireHistoryListMediaIo: Q5t,
    isHistoryListMediaIoActive: kpt,
    isHistoryListMediaIoCancelledError: PTr,
    withHistoryRemoteFetchGate: q4n
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  RTr = 100 * 1024 * 1024;

function NTr(e) {
  return typeof e == "string" ? Math.ceil(e.length * 3 / 4) : e instanceof File || e instanceof Blob ? e.size : 0;
}

async function jTr(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      const a = r.result,
        i = a.includes(",") ? a.split(",")[1] : a;
      t(i);
    }, r.onerror = n, r.readAsDataURL(e);
  });
}

async function X5t(e, t, n, r) {
  const a = NTr(t),
    i = a >= RTr,
    o = Z5t(),
    s = (o == null ? void 0 : o.usagePercent) || 0,
    l = r || s > 70,
    d = i || l;
  console.log(`[LargeDataProcessor] 处理数据: ${e}, 大小: ${(a / 1024 / 1024).toFixed(2)} MB`), console.log(`[LargeDataProcessor] JavaScript 堆使用率: ${s.toFixed(2)}%`), console.log(`[LargeDataProcessor] 使用: ${d ? "Rust后端" : "JavaScript"} (${d ? i ? "数据大小触发" : "内存使用率触发" : "正常处理"})`);
  let u;
  if (typeof t == "string" ? u = t : u = await jTr(t), d) try {
    const h = await Fr("process_large_data_rust", {
      operation: e,
      data: u,
      options: n ? JSON.stringify(n) : void 0
    });
    return console.log("[LargeDataProcessor] Rust 后端处理完成"), h;
  } catch (h) {
    return console.error("[LargeDataProcessor] Rust 后端处理失败:", h), console.warn("[LargeDataProcessor] 降级到 JavaScript 处理"), fHt(e, u, n);
  }
  return fHt(e, u, n);
}

async function fHt(e, t, n) {
  switch (e) {
    case "process_image":
      return OTr(t, n);
    case "process_video":
      return t;
    case "process_file":
      return t;
    case "compress_data":
      return t;
    default:
      throw new Error(`不支持的操作: ${e}`);
  }
}

const DTr = 10 * 1024 * 1024,
  LTr = 8192;

async function OTr(e, t) {
  const n = (t == null ? void 0 : t.maxDimension) ?? LTr,
    r = (t == null ? void 0 : t.maxSize) ?? DTr,
    a = (t == null ? void 0 : t.forceReencode) === !0,
    i = e.includes(",") && e.split(",")[1] || e;
  let o = 0;
  try {
    o = Math.ceil(i.length * (3 / 4));
  } catch {
    o = 0;
  }
  let s = "image/jpeg";
  try {
    const A = atob(i);
    if (A.length >= 2) {
      const S = A.charCodeAt(0),
        C = A.charCodeAt(1);
      S === 255 && C === 216 ? s = "image/jpeg" : S === 137 && C === 80 && (s = "image/png");
    }
  } catch {}
  const l = `data:${s};base64,${i}`,
    d = await new Promise((A, S) => {
      const C = new Image();
      C.onload = () => A(C), C.onerror = () => S(new Error("图片加载失败")), C.src = l;
    }),
    u = d.naturalWidth,
    h = d.naturalHeight,
    p = u > n || h > n;
  if (!a && !p && o > 0 && o <= r) return console.log(`[LargeDataProcessor] 原图约 ${(o / 1024 / 1024).toFixed(2)}MB、${u}x${h}，边长≤${n}，跳过 Canvas 重编码`), i;
  let m = u,
    f = h;
  if (p) {
    const A = Math.min(n / m, n / f);
    m = Math.floor(m * A), f = Math.floor(f * A);
  }
  const y = document.createElement("canvas");
  y.width = m, y.height = f;
  const b = y.getContext("2d");
  if (!b) return i;
  b.drawImage(d, 0, 0, m, f);
  const v = .35;
  for (let A = .98; A >= v; A -= .02) {
    const S = y.toDataURL("image/jpeg", A),
      C = S.split(",")[1] || S,
      I = Math.ceil(C.length * (3 / 4));
    if (I <= r) return console.log(`[LargeDataProcessor] Canvas 编码完成: 质量${(A * 100).toFixed(0)}%, 约${(I / 1024 / 1024).toFixed(2)}MB, ${m}x${f}`), C;
  }
  let _ = .85;
  for (; _ >= .3;) {
    let A = Math.max(1, Math.floor(u * _)),
      S = Math.max(1, Math.floor(h * _));
    if (A > n || S > n) {
      const C = Math.min(n / A, n / S);
      A = Math.max(1, Math.floor(A * C)), S = Math.max(1, Math.floor(S * C));
    }
    y.width = A, y.height = S, b.drawImage(d, 0, 0, A, S);
    for (let C = .98; C >= v; C -= .02) {
      const I = y.toDataURL("image/jpeg", C),
        E = I.split(",")[1] || I,
        M = Math.ceil(E.length * (3 / 4));
      if (M <= r) return console.log(`[LargeDataProcessor] Canvas 编码完成（缩放）: ${A}x${S}, 质量${(C * 100).toFixed(0)}%, 约${(M / 1024 / 1024).toFixed(2)}MB`), E;
    }
    _ -= .1;
  }
  y.width = Math.max(1, m), y.height = Math.max(1, f), b.drawImage(d, 0, 0, m, f);
  const w = y.toDataURL("image/jpeg", v),
    k = w.split(",")[1] || w;
  return console.warn(`[LargeDataProcessor] 仍偏大，兜底输出 约 ${(Math.ceil(k.length * (3 / 4)) / 1024 / 1024).toFixed(2)}MB`), k;
}

function BTr() {
  var t, n;
  if (typeof window > "u") return null;
  const e = window;
  if (!e.__LINGO_ELECTRON_NATIVE_SHELL__) return null;
  try {
    const r = (n = (t = e.__LINGO_ELECTRON_SYSTEM_INFO__) == null ? void 0 : t.getMemory) == null ? void 0 : n.call(t);
    if (r && r.total_memory_gb > 0) return r;
  } catch {}
  return null;
}

async function J5t() {
  var t;
  const e = BTr();
  if (e) return e;
  if (typeof window > "u" || typeof ((t = window.__TAURI_INTERNALS__) == null ? void 0 : t.invoke) != "function") return {
    total_memory_gb: 0,
    platform: "unknown",
    message: "当前环境未提供原生内存信息"
  };
  try {
    const n = await Fr("get_system_memory_info");
    return n && n.total_memory_gb > 0, n;
  } catch (n) {
    return console.error("[LargeDataProcessor] 获取系统内存信息失败:", n), {
      total_memory_gb: 0,
      platform: "unknown",
      message: "无法获取内存信息"
    };
  }
}

function Z5t() {
  const e = performance.memory;
  if (!e) return null;
  const t = e.usedJSHeapSize,
    n = e.totalJSHeapSize,
    r = e.jsHeapSizeLimit,
    a = t / r * 100;
  return {
    used: t,
    total: n,
    limit: r,
    usagePercent: a
  };
}

const eIt = Object.freeze(Object.defineProperty({
  __proto__: null,
  getJSHeapMemory: Z5t,
  getSystemMemoryInfo: J5t,
  processLargeData: X5t
}, Symbol.toStringTag, {
  value: "Module"
}));

async function tIt() {
  const e = Z5t(),
    t = await J5t(),
    n = (e == null ? void 0 : e.used) || 0,
    r = (e == null ? void 0 : e.limit) || 0,
    a = (e == null ? void 0 : e.usagePercent) || 0,
    i = a > 70;
  let o = "";
  return a > 90 ? o = "🔴 内存使用率极高！强烈建议使用 Rust 后端处理大数据" : a > 75 ? o = "🟡 内存使用率较高，建议使用 Rust 后端处理大数据" : a > 50 ? o = "🟢 内存使用正常，可以继续使用 JavaScript 处理" : o = "✅ 内存使用率很低，可以正常使用", {
    jsHeapUsed: n,
    jsHeapLimit: r,
    jsHeapUsagePercent: a,
    systemTotalGB: t.total_memory_gb,
    shouldUseRust: i,
    recommendation: o
  };
}

const nIt = Object.freeze(Object.defineProperty({
    __proto__: null,
    getMemoryStatus: tIt,
    getSystemMemoryInfo: J5t
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  gHt = "canvas-probe-media-pool";

function FTr() {
  if (typeof document > "u" || !document.body) return null;
  const e = document.getElementById(gHt);
  if (e) return e;
  const t = document.createElement("div");
  return t.id = gHt, t.setAttribute("aria-hidden", "true"), t.style.cssText = "display:none!important;position:fixed;left:-9999px;top:-9999px;width:0;height:0;overflow:hidden;pointer-events:none;contain:strict", document.body.appendChild(t), t;
}

function rIt(e) {
  e.muted = !0, e.playsInline = !0, e.controls = !1, e.setAttribute("aria-hidden", "true"), e.setAttribute("width", "0"), e.setAttribute("height", "0");
  try {
    e.disablePictureInPicture = !0;
  } catch {}
  e.style.cssText = "display:none!important;width:0!important;height:0!important;opacity:0!important;pointer-events:none!important;position:absolute;left:-9999px;top:-9999px";
  const t = FTr();
  t && e.parentNode !== t && t.appendChild(e);
}

const K4n = 5 * 1024 * 1024;

function q2(e, t = "image/jpeg", n) {
  return new Promise((r, a) => {
    try {
      e.toBlob(i => {
        if (!i) {
          a(new Error("Canvas 编码失败"));
          return;
        }
        const o = new FileReader();
        o.onload = () => r(String(o.result || "")), o.onerror = () => a(o.error || new Error("Canvas 编码读取失败")), o.readAsDataURL(i);
      }, t, n);
    } catch (i) {
      a(i);
    }
  });
}

async function Q4n(e) {
  return e.startsWith("data:") ? e.split(",")[1] || "" : Z4n(e);
}

function Tue(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => t({
      w: r.naturalWidth,
      h: r.naturalHeight
    }), r.onerror = () => n(new Error("Failed to load image")), r.src = e;
  });
}

async function zTr(e) {
  return !e || typeof e != "string" || !e.startsWith("data:image/webp") && !e.toLowerCase().includes("image/webp") ? e : new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      const a = document.createElement("canvas");
      a.width = r.naturalWidth, a.height = r.naturalHeight;
      const i = a.getContext("2d");
      if (!i) {
        n(new Error("Cannot get canvas context"));
        return;
      }
      i.drawImage(r, 0, 0), q2(a, "image/jpeg", .9).then(t, n);
    }, r.onerror = () => n(new Error("Failed to load webp image")), r.src = e;
  });
}

async function UTr(e) {
  return !e || typeof e != "string" || e.startsWith("data:image/jpeg") ? e : new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      const a = document.createElement("canvas");
      a.width = r.naturalWidth, a.height = r.naturalHeight;
      const i = a.getContext("2d");
      if (!i) {
        n(new Error("Cannot get canvas context"));
        return;
      }
      i.drawImage(r, 0, 0), q2(a, "image/jpeg", .9).then(t, n);
    }, r.onerror = () => n(new Error("Failed to load image")), r.src = e;
  });
}

function B$(e) {
  if (e != null) {
    if (typeof e == "string") return e;
    if (typeof e == "object") {
      const t = e;
      if (t.__stencilAsset === !0) return;
      for (const n of ["url", "src", "dataUrl", "href", "value", "path"]) {
        const r = t[n];
        if (typeof r == "string" && r.length > 0) return r;
      }
    }
  }
}

function Sh(e) {
  var r, a;
  const t = typeof e == "string" ? e : B$(e);
  if (!t) return !1;
  if (t.startsWith("data:video") || t.includes("force_video_display=true")) return !0;
  const n = ((a = (r = t.split(".").pop()) == null ? void 0 : r.split("?")[0]) == null ? void 0 : a.toLowerCase()) || "";
  return ["mp4", "webm", "ogg", "mov"].includes(n);
}

const yHt = new Map(),
  met = new Map();

function KVe(e) {
  const t = String(e || "").trim();
  if (/athena-haicong-llm-external\.oss/i.test(t) || /\/haiyi\//i.test(t) && /aliyuncs\.com/i.test(t)) return Promise.reject(new Error("跳过海艺外链视频元数据探测（Tracking Prevention）"));
  const n = yHt.get(t);
  if (n) return Promise.resolve(n);
  const r = met.get(t);
  if (r) return r;
  const a = new Promise((i, o) => {
    const s = document.createElement("video");
    s.preload = "metadata", rIt(s);
    const l = setTimeout(() => {
        d(), o(new Error("视频元数据读取超时"));
      }, 12e3),
      d = () => {
        clearTimeout(l), s.onloadedmetadata = null, s.onerror = null;
        try {
          s.removeAttribute("src"), s.load(), s.remove();
        } catch {}
      };
    s.onloadedmetadata = () => {
      const u = {
        duration: Number(s.duration) || 0,
        w: s.videoWidth || 0,
        h: s.videoHeight || 0
      };
      u.w > 0 && u.h > 0 && yHt.set(t, u), d(), i(u);
    }, s.onerror = () => {
      d(), o(new Error("视频加载失败"));
    }, s.src = t;
  }).finally(() => {
    met.delete(t);
  });
  return met.set(t, a), a;
}

function Y4n(e) {
  const t = String(e || "").trim();
  if (!t || !/^https?:\/\//i.test(t)) return !1;
  if (/^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(t) || t.startsWith("asset:")) return !0;
  try {
    const n = new URL(t).hostname.toLowerCase();
    return n.includes("aliyuncs.com") || n.includes("volces.com") || n.includes("tos-cn-") || n.includes("myqcloud.com") || n.includes("qiniucdn.com") || n.includes("clouddn.com") || n.includes("byteimg.com") || n.includes("bytedance.com") || n.includes("art.huya.info") || n.includes("aiproxy.vip") || n.includes("closeai.fans") || n.includes("comfly.org") || n.includes("comfly.chat") || n === "vidgen.x.ai" || n.endsWith(".vidgen.x.ai");
  } catch {
    return /aliyuncs\.com|volces\.com|tos-cn-|myqcloud\.com|aiproxy\.vip|closeai\.fans|vidgen\.x\.ai/i.test(t);
  }
}

const QVe = 1;

function aIt(e, t = QVe) {
  return new Promise((n, r) => {
    const a = String(e || "").trim();
    if (!a) {
      r(new Error("视频封面抽帧失败：空地址"));
      return;
    }
    const i = /^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(a) || a.startsWith("asset:");
    if (/^https?:\/\//i.test(a) && !i && !a.startsWith("blob:") && Y4n(a)) {
      r(new Error("CORS_HOSTILE_VIDEO_POSTER: 远程视频无 CORS，禁止浏览器抽帧（请改用本地落盘后读盘抽帧）"));
      return;
    }
    const o = document.createElement("video"),
      s = document.createElement("canvas"),
      l = s.getContext("2d");
    if (!l) {
      r(new Error("无法创建 Canvas 上下文"));
      return;
    }
    rIt(o), o.preload = "metadata", (a.startsWith("http://") || a.startsWith("https://")) && !i && (o.crossOrigin = "anonymous");
    const d = () => {
      o.onerror = null, o.onloadedmetadata = null, o.onseeked = null, o.removeAttribute("src"), o.load();
      try {
        o.remove();
      } catch {}
      s.width = 1, s.height = 1;
    };
    o.onerror = () => {
      d(), r(new Error("视频封面抽帧失败"));
    }, o.onloadedmetadata = () => {
      const u = Number(o.duration) || 0,
        h = u > 0 ? Math.min(t, Math.max(0, u - .05)) : t;
      o.onseeked = async () => {
        try {
          if (i) {
            d(), r(new Error("ASSET_PROTOCOL_POSTER_UNSUPPORTED: asset.localhost 无法安全导出封面且禁止整文件进堆"));
            return;
          }
          const p = o.videoWidth || 640,
            m = o.videoHeight || 360,
            f = Math.min(1, 512 / Math.max(p, m)),
            y = Math.max(1, Math.round(p * f)),
            b = Math.max(1, Math.round(m * f));
          s.width = y, s.height = b, l.drawImage(o, 0, 0, y, b), n({
            dataUrl: await q2(s, "image/jpeg", .82),
            width: p,
            height: m
          });
        } catch (p) {
          r(p instanceof Error ? p : new Error("视频封面绘制失败"));
        } finally {
          d();
        }
      }, o.currentTime = h;
    }, o.src = a;
  });
}

function X4n(e, t = QVe) {
  return aIt(e, t).then(n => n.dataUrl);
}

const J4n = 48 * 1024 * 1024;

async function $Tr(e, t = J4n, n = QVe) {
  var a;
  const r = String(e || "").trim();
  if (!r) return null;
  try {
    const {
        readFileAsBlob: i
      } = await Ie(async () => {
        const {
          readFileAsBlob: d
        } = await Promise.resolve().then(() => hg);
        return {
          readFileAsBlob: d
        };
      }, void 0, import.meta.url),
      o = await i(r);
    if (!(o != null && o.size) || o.size > t) return o && o.size > t && console.warn("[captureVideoPosterFromLocalAssetFile] 视频过大跳过读盘抽帧:", r, o.size), null;
    const s = (a = o.type) != null && a.startsWith("video/") ? o : new Blob([o], {
        type: "video/mp4"
      }),
      l = URL.createObjectURL(s);
    try {
      return await aIt(l, n);
    } finally {
      URL.revokeObjectURL(l);
    }
  } catch (i) {
    return console.warn("[captureVideoPosterFromLocalAssetFile] failed:", i), null;
  }
}

function GTr(e, t = {}) {
  const {
    fps: n = 2
  } = t;
  return new Promise((r, a) => {
    const i = document.createElement("video"),
      o = document.createElement("canvas"),
      s = o.getContext("2d");
    if (!s) {
      a(new Error("无法创建 Canvas 上下文"));
      return;
    }
    i.muted = !0, i.playsInline = !0, i.crossOrigin = "anonymous", i.src = e;
    const l = [],
      d = () => a(new Error("视频抽帧失败"));
    i.onerror = d, i.onloadedmetadata = () => {
      const u = Number(i.duration) || 0;
      if (!u || !isFinite(u)) {
        a(new Error("无法读取视频时长"));
        return;
      }
      o.width = i.videoWidth || 1280, o.height = i.videoHeight || 720;
      const h = 1 / Math.max(.1, n);
      let p = 0;
      const m = async () => {
        try {
          s.drawImage(i, 0, 0, o.width, o.height), l.push({
            time: Number(p.toFixed(2)),
            url: await q2(o, "image/jpeg", .82)
          }), p += h, p <= u ? i.currentTime = Math.min(p, u) : r(l);
        } catch (f) {
          a(f instanceof Error ? f : new Error("视频抽帧编码失败"));
        }
      };
      i.onseeked = m, i.currentTime = 0;
    };
  });
}

async function iIt(e) {
  return (await fetch(e)).blob();
}

async function Z4n(e) {
  const t = await iIt(e);
  return new Promise((n, r) => {
    const a = new FileReader();
    a.onloadend = () => {
      const i = a.result,
        o = i.split(",")[1] || i;
      n(o);
    }, a.onerror = r, a.readAsDataURL(t);
  });
}

async function UN(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  if (t.startsWith("blob:") || t.startsWith("data:")) {
    const n = await iIt(t);
    if (!n.size) throw new Error("图片内容为空");
    return URL.createObjectURL(n);
  }
  return t;
}

async function VTr(e, t = "normal") {
  const n = t === "ultra" ? {
    maxSize: 80,
    jpegQuality: .3
  } : {
    maxSize: 150,
    jpegQuality: .6
  };
  return new Promise(r => {
    try {
      const a = new Image();
      a.crossOrigin = "anonymous", a.onload = () => {
        const i = document.createElement("canvas");
        let o = a.naturalWidth,
          s = a.naturalHeight;
        o > s ? o > n.maxSize && (s = s * n.maxSize / o, o = n.maxSize) : s > n.maxSize && (o = o * n.maxSize / s, s = n.maxSize), i.width = o, i.height = s;
        const l = i.getContext("2d");
        if (!l) {
          r(null);
          return;
        }
        l.drawImage(a, 0, 0, o, s), q2(i, "image/jpeg", n.jpegQuality).then(r, () => r(null));
      }, a.onerror = () => r(null), a.src = e;
    } catch {
      r(null);
    }
  });
}

function e5n(e, t) {
  let n = 1024,
    r = 1024;
  if (t === "1080P" ? (n = 1920, r = 1080) : t === "720P" ? (n = 1280, r = 720) : t === "2K" ? (n = 2048, r = 2048) : t === "4K" && (n = 3840, r = 2160), e === "Auto") return {
    str: `${n}x${r}`,
    w: n,
    h: r
  };
  const [a, i] = e.split(":").map(Number);
  if (!a || !i) return {
    str: "1024x1024",
    w: 1024,
    h: 1024
  };
  let o, s;
  return Math.abs(a - i) < .1 ? (o = n, s = r) : a > i ? (o = t === "Auto" || t === "1K" ? 1280 : n, s = Math.round(o * (i / a))) : (s = t === "Auto" || t === "1K" ? 1280 : n, o = Math.round(s * (a / i))), o = Math.round(o / 16) * 16, s = Math.round(s / 16) * 16, {
    str: `${o}x${s}`,
    w: o,
    h: s
  };
}

function HTr(e, t, n) {
  const {
    str: r,
    w: a,
    h: i
  } = e5n(t, n);
  return e.includes("minimax") ? {
    sizeStr: n === "4K" ? "1080p" : "720p",
    w: a,
    h: i
  } : e.includes("jimeng") || e.includes("veo") ? {
    sizeStr: t,
    w: a,
    h: i
  } : e.includes("grok") ? {
    sizeStr: t,
    w: a,
    h: i
  } : {
    sizeStr: r,
    w: a,
    h: i
  };
}

async function t5n(e, t = 4.5 * 1024 * 1024, n = 4096, r) {
  const a = y => {
    console.log(`[压缩] ${y}`), r == null || r(y);
  };
  try {
    const y = await Q4n(e),
      b = Math.ceil(y.length * 3 / 4),
      v = await tIt();
    if (b >= K4n || v.shouldUseRust) {
      a("使用 Rust 后端压缩");
      const w = await X5t("process_image", y, {
          maxDimension: n,
          maxSize: t,
          quality: .9
        }, !0),
        k = Math.ceil(w.length * 3 / 4);
      if (k <= t) return a("压缩完成"), w;
      a(`processLargeData 返回 ${(k / 1024 / 1024).toFixed(2)}MB，超限，降级 Canvas 重压`);
    }
  } catch (y) {
    console.warn("[compressImageForSuperRes] 处理失败，降级为 Canvas:", y);
  }
  const i = await new Promise((y, b) => {
    const v = new Image();
    v.crossOrigin = "anonymous", v.onload = () => y(v), v.onerror = () => b(new Error("图片加载失败")), v.src = e;
  });
  let {
    naturalWidth: o,
    naturalHeight: s
  } = i;
  if (a(`原始尺寸: ${o}x${s}`), o > n || s > n) {
    const y = Math.min(n / o, n / s);
    o = Math.floor(o * y), s = Math.floor(s * y), a(`尺寸超限，缩放至: ${o}x${s}`);
  }
  const l = document.createElement("canvas");
  l.width = o, l.height = s;
  const d = l.getContext("2d");
  if (!d) throw new Error("无法创建 Canvas 上下文");
  d.drawImage(i, 0, 0, o, s);
  let u = .95;
  const h = .3;
  let p;
  for (; u >= h;) {
    const y = await q2(l, "image/jpeg", u);
    p = y.split(",")[1] || y;
    const b = Math.ceil(p.length * 3 / 4);
    if (a(`质量 ${(u * 100).toFixed(0)}%: 约 ${(b / 1024 / 1024).toFixed(2)}MB`), b <= t) return a(`压缩完成，最终大小约 ${(b / 1024 / 1024).toFixed(2)}MB`), p;
    u -= .1;
  }
  a("质量压缩不足，尝试缩小尺寸...");
  let m = .8;
  for (; m >= .3;) {
    const y = Math.floor(o * m),
      b = Math.floor(s * m);
    l.width = y, l.height = b, d.drawImage(i, 0, 0, y, b);
    const v = await q2(l, "image/jpeg", h);
    p = v.split(",")[1] || v;
    const _ = Math.ceil(p.length * 3 / 4);
    if (a(`尺寸 ${y}x${b}, 质量 ${(h * 100).toFixed(0)}%: 约 ${(_ / 1024 / 1024).toFixed(2)}MB`), _ <= t) return a(`压缩完成，最终尺寸 ${y}x${b}，大小约 ${(_ / 1024 / 1024).toFixed(2)}MB`), p;
    m -= .1;
  }
  a("警告：无法将图片压缩到目标大小，使用最小尺寸");
  const f = await q2(l, "image/jpeg", h);
  return f.split(",")[1] || f;
}

const _ae = 1024,
  oIt = 2 * 1024 * 1024,
  WTr = [.88, .78, .68, .58, .48, .38, .28],
  qTr = [2048, 1792, 1536, 1280, 1024, 768, 512, 384];

function n5n(e, t = _ae) {
  const n = e > 0 ? Math.min(e, t) : t,
    r = e > 0 ? Math.min(e, n) : n,
    a = [n, ...qTr].filter((i, o, s) => i > 0 && i <= r && s.indexOf(i) === o);
  return a.length ? a : [t, 1024, 768, 512, 384];
}

function KTr() {
  return new Promise(e => {
    setTimeout(e, 0);
  });
}

function QTr(e, t) {
  return new Promise((n, r) => {
    e.toBlob(a => {
      a ? n(a) : r(new Error("Canvas 编码失败"));
    }, "image/jpeg", t);
  });
}

function bHt(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      const a = String(r.result || "");
      t(a);
    }, r.onerror = () => n(r.error || new Error("Canvas 编码读取失败")), r.readAsDataURL(e);
  });
}

async function YTr(e) {
  if (typeof createImageBitmap == "function") try {
    const n = await fetch(e).then(a => a.blob()),
      r = await createImageBitmap(n);
    return {
      width: r.width,
      height: r.height,
      draw: (a, i, o) => a.drawImage(r, 0, 0, i, o),
      close: () => r.close()
    };
  } catch {}
  const t = await new Promise((n, r) => {
    const a = new Image();
    a.crossOrigin = "anonymous", a.onload = () => n(a), a.onerror = () => r(new Error("图片加载失败")), a.src = e;
  });
  return {
    width: t.naturalWidth || 0,
    height: t.naturalHeight || 0,
    draw: (n, r, a) => n.drawImage(t, 0, 0, r, a),
    close: () => {
      t.src = "";
    }
  };
}

async function sIt(e, t, n = oIt, r = _ae) {
  const a = await YTr(e),
    i = document.createElement("canvas");
  try {
    const o = a.width || 0,
      s = a.height || 0,
      l = Math.max(o, s);
    if (t > 0 && t <= n && l > 0 && l <= r) return null;
    if (!o || !s) throw new Error("无法读取图片尺寸");
    const d = i.getContext("2d");
    if (!d) throw new Error("无法创建 Canvas 上下文");
    let u = null;
    for (const h of n5n(l, r)) {
      await KTr();
      const p = Math.min(h / o, h / s, 1),
        m = Math.max(1, Math.round(o * p)),
        f = Math.max(1, Math.round(s * p));
      i.width = m, i.height = f, d.fillStyle = "#ffffff", d.fillRect(0, 0, m, f), a.draw(d, m, f);
      for (const y of WTr) {
        const b = await QTr(i, y);
        if (b.size <= n) return console.log(`[compressImageForBase64Send] ${m}x${f}, 质量${Math.round(y * 100)}%, 约${(b.size / 1024 / 1024).toFixed(2)}MB`), bHt(b);
        (!u || b.size < u.size) && (u = b);
      }
    }
    if (u && u.size <= n) return bHt(u);
    throw new Error(`压缩后仍有 ${(((u == null ? void 0 : u.size) || t) / 1024 / 1024).toFixed(2)} MB`);
  } finally {
    a.close(), i.width = 0, i.height = 0;
  }
}

async function G7(e, t = 9 * 1024 * 1024, n = 10 * 1024 * 1024, r = 8192, a = 0) {
  if (e.startsWith("data:")) {
    const b = e.split(",")[1] || "",
      v = Math.ceil(b.length * 3 / 4);
    try {
      const _ = await Tue(e),
        w = _.w <= r && _.h <= r,
        k = a <= 0 || _.w >= a && _.h >= a;
      if (console.log(`[compressImageForAPI] skipCheck: estimatedBytes=${(v / 1024 / 1024).toFixed(2)}MB, maxSizeBytes=${(n / 1024 / 1024).toFixed(2)}MB, dims=${_.w}x${_.h}, dimsOk=${w}, minDimsOk=${k}`), v > 0 && v <= n && k) return console.log(`[compressImageForAPI] 图片已满足直发条件（约${(v / 1024 / 1024).toFixed(2)}MB, ${_.w}x${_.h}）跳过压缩`), e;
    } catch {
      if (v > 0 && v <= n && a <= 0) return console.log(`[compressImageForAPI] 获取尺寸失败但字节满足约${(v / 1024 / 1024).toFixed(2)}MB，按原图直发`), e;
    }
  }
  try {
    const b = await Q4n(e),
      v = Math.ceil(b.length * 3 / 4),
      _ = await tIt();
    if (v >= K4n || _.shouldUseRust) {
      const k = await X5t("process_image", b, {
        maxDimension: r,
        maxSize: n,
        quality: .98
      });
      return console.log("[compressImageForAPI] Rust 后端处理完成"), `data:image/jpeg;base64,${k}`;
    }
  } catch (b) {
    console.warn("[compressImageForAPI] Rust 处理失败，降级为 Canvas 压缩:", b);
  }
  const i = await new Promise((b, v) => {
    const _ = new Image();
    _.crossOrigin = "anonymous", _.onload = () => b(_), _.onerror = () => v(new Error("图片加载失败")), _.src = e;
  });
  let {
    naturalWidth: o,
    naturalHeight: s
  } = i;
  if (console.log(`[compressImageForAPI] 原始尺寸: ${o}x${s}`), o > r || s > r) {
    const b = Math.min(r / o, r / s);
    let v = Math.floor(o * b),
      _ = Math.floor(s * b);
    if (a > 0) {
      const w = Math.min(v, _);
      if (w < a) {
        const k = a / w;
        v = Math.min(Math.ceil(v * k), o), _ = Math.min(Math.ceil(_ * k), s);
      }
    }
    o = v, s = _, console.log(`[compressImageForAPI] 缩放至: ${o}x${s}`);
  }
  const l = document.createElement("canvas");
  l.width = o, l.height = s;
  const d = l.getContext("2d");
  if (!d) throw new Error("无法创建 Canvas 上下文");
  d.drawImage(i, 0, 0, o, s);
  const u = .35;
  for (let b = .98; b >= u; b -= .02) {
    const v = await q2(l, "image/jpeg", b),
      _ = v.split(",")[1] || "",
      w = Math.ceil(_.length * 3 / 4);
    if (w <= n) return console.log(`[compressImageForAPI] 完成: 质量${(b * 100).toFixed(0)}%, 约${(w / 1024 / 1024).toFixed(2)}MB, ${o}x${s}`), v;
  }
  const h = i.naturalWidth,
    p = i.naturalHeight;
  let m = .85;
  for (; m >= .3;) {
    let b = Math.max(1, Math.floor(h * m)),
      v = Math.max(1, Math.floor(p * m));
    if (b > r || v > r) {
      const _ = Math.min(r / b, r / v);
      b = Math.max(1, Math.floor(b * _)), v = Math.max(1, Math.floor(v * _));
    }
    if (a > 0 && Math.min(b, v) < a) break;
    l.width = b, l.height = v, d.drawImage(i, 0, 0, b, v);
    for (let _ = .98; _ >= u; _ -= .02) {
      const w = await q2(l, "image/jpeg", _),
        k = w.split(",")[1] || "",
        A = Math.ceil(k.length * 3 / 4);
      if (A <= n) return console.log(`[compressImageForAPI] 完成（缩放）: ${b}x${v}, 质量${(_ * 100).toFixed(0)}%, 约${(A / 1024 / 1024).toFixed(2)}MB`), w;
    }
    m -= .1;
  }
  l.width = Math.max(1, o), l.height = Math.max(1, s), d.drawImage(i, 0, 0, o, s);
  const f = await q2(l, "image/jpeg", u),
    y = Math.ceil((f.split(",")[1] || "").length * (3 / 4));
  return console.log(`[compressImageForAPI] 兜底: ${o}x${s}, 约${(y / 1024 / 1024).toFixed(2)}MB`), f;
}

const vHt = 8 * 1024 * 1024,
  XTr = 5 * 1024 * 1024,
  JTr = 4.5 * 1024 * 1024,
  fet = 300,
  ZTr = 1920;

async function r5n(e) {
  const t = await Tue(e),
    {
      w: n,
      h: r
    } = t;
  if (n < fet || r < fet) return console.warn(`[compressImageForKling] 图片尺寸 ${n}x${r} 低于可灵要求 300px，不压缩`), e;
  const a = e.startsWith("data:") && e.split(",")[1] || "",
    i = a ? Math.ceil(a.length * 3 / 4) : 0;
  if (i > 0 && i <= JTr) return console.log(`[compressImageForKling] 图片未超过4.5MB (${(i / 1024).toFixed(0)}KB)，按原尺寸 ${n}x${r} 发送`), e;
  const o = await G7(e, XTr, vHt, ZTr, fet),
    s = o.split(",")[1] || "",
    l = Math.ceil(s.length * 3 / 4);
  return l > vHt && console.warn(`[compressImageForKling] 压缩后仍约 ${(l / 1024 / 1024).toFixed(1)}MB，已尽量缩小`), o;
}

const wHt = 11 * 1024 * 1024,
  e8r = 8 * 1024 * 1024,
  get = .25,
  yet = 4;

function t8r(e) {
  const t = e.toLowerCase();
  return t.includes(".png") ? "image/png" : t.includes(".webp") ? "image/webp" : t.includes(".gif") ? "image/gif" : "image/jpeg";
}

async function n8r(e) {
  if (!e || e.startsWith("data:") || e.startsWith("blob:")) return {
    src: e,
    revoke: !1
  };
  if (e.startsWith("http://") || e.startsWith("https://")) {
    const {
        downloadWithFallback: t
      } = await Ie(async () => {
        const {
          downloadWithFallback: i
        } = await Promise.resolve().then(() => El);
        return {
          downloadWithFallback: i
        };
      }, void 0, import.meta.url),
      n = await t(e, 12e4),
      r = n.type && n.type.startsWith("image/") ? n.type : t8r(e),
      a = n.type === r ? n : new Blob([await n.arrayBuffer()], {
        type: r
      });
    return {
      src: URL.createObjectURL(a),
      revoke: !0
    };
  }
  return {
    src: e,
    revoke: !1
  };
}

async function r8r(e, t = "图片加载失败") {
  const {
    src: n,
    revoke: r
  } = await n8r(e);
  try {
    return await new Promise((a, i) => {
      const o = new Image();
      o.crossOrigin = "anonymous", o.onload = () => a(o), o.onerror = () => i(new Error(t)), o.src = n;
    });
  } finally {
    r && URL.revokeObjectURL(n);
  }
}

async function a5n(e) {
  var y;
  const t = await r8r(e, "Vidu 图片加载失败");
  let n = t.naturalWidth,
    r = t.naturalHeight;
  const a = n / r;
  let i = 0,
    o = 0,
    s = n,
    l = r;
  a > yet ? (s = Math.round(r * yet), i = Math.round((n - s) / 2)) : a < get && (l = Math.round(n / get), o = Math.round((r - l) / 2));
  const d = document.createElement("canvas");
  d.width = s, d.height = l;
  const u = d.getContext("2d");
  if (!u) return e;
  u.drawImage(t, i, o, s, l, 0, 0, s, l);
  let h = await q2(d, "image/jpeg", .9),
    p = h.split(",")[1] || "";
  if (Math.ceil(p.length * 3 / 4) <= wHt) return (a > yet || a < get) && console.log(`[Vidu] 比例裁剪完成: ${n}x${r} → ${s}x${l}`), h;
  const f = await G7(h, e8r, wHt, Math.max(s, l));
  return console.log(`[Vidu] 压缩完成: ${(Math.ceil((((y = f.split(",")[1]) == null ? void 0 : y.length) || 0) * 3 / 4) / 1024 / 1024).toFixed(2)} MB`), f;
}

function i5n(e) {
  try {
    const t = JSON.stringify(e);
    return new Blob([t]).size;
  } catch {
    return 0;
  }
}

function o5n(e, t = 3e4, n = 2e4, r = 5e3) {
  if (e.length <= t) return {
    text: e,
    wasTruncated: !1
  };
  const a = e.slice(0, n) + `

...[内容过长，已省略中间 ${e.length - n - r} 个字符]...

` + e.slice(-r);
  return console.log(`[truncatePrompt] 文本从 ${e.length} 截断至 ${a.length} 字符`), {
    text: a,
    wasTruncated: !0
  };
}

async function a8r(e, t, n = {}) {
  const {
    maxRetries: r = 2,
    retryDelayMs: a = 2e3,
    onRetry: i
  } = n;
  let o = null;
  for (let s = 0; s <= r; s++) try {
    return await fetch(e, t);
  } catch (l) {
    if (o = l instanceof Error ? l : new Error(String(l)), console.warn(`[fetchWithRetry] 第 ${s + 1} 次请求失败:`, o.message), s < r) {
      i == null || i(s + 1, o);
      const d = a * Math.pow(2, s);
      console.log(`[fetchWithRetry] ${d}ms 后重试...`), await new Promise(u => setTimeout(u, d));
    }
  }
  throw o || new Error("请求失败");
}

const pg = Object.freeze(Object.defineProperty({
    __proto__: null,
    BASE64_SEND_MAX_BYTES: oIt,
    BASE64_SEND_MAX_EDGE: _ae,
    DEFAULT_VIDEO_POSTER_SEEK_SECONDS: QVe,
    MAX_LOCAL_VIDEO_POSTER_BYTES: J4n,
    base64SendCandidateEdges: n5n,
    calculateResolution: e5n,
    canvasToDataUrlAsync: q2,
    captureVideoPosterDataUrl: X4n,
    captureVideoPosterFrame: aIt,
    captureVideoPosterFromLocalAssetFile: $Tr,
    cloneImageUrlToOwnedBlobUrl: UN,
    coerceCanvasMediaUrl: B$,
    compressImageForAPI: G7,
    compressImageForBase64Send: sIt,
    compressImageForKling: r5n,
    compressImageForSuperRes: t5n,
    compressImageForVidu: a5n,
    convertWebpDataUrlToJpg: zTr,
    ensureJpegDataUrl: UTr,
    estimatePayloadSize: i5n,
    extractKeyFrames: GTr,
    fetchWithRetry: a8r,
    generateThumbnail: VTr,
    getBase64FromUrl: Z4n,
    getBlobFromUrl: iIt,
    getImageDimensions: Tue,
    getModelParams: HTr,
    getVideoMetadata: KVe,
    isBrowserCorsHostileVideoUrl: Y4n,
    isVideoUrl: Sh,
    truncatePrompt: o5n
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  i8r = "oss_index",
  o8r = "oss_index.sqlite";

let rH = null,
  aH = !1,
  kae,
  $ge = null,
  Apt;

const xHt = "dedup_ls_migrated_v1",
  _Ht = "material_global_ls_migrated_v1",
  kHt = "material_backup_ls_migrated_v1";

function s8r() {
  return typeof window < "u" && us();
}

function l8r(e, ...t) {
  return [e.replace(/[\\/]+$/, "").replace(/\\/g, "/"), ...t].join("/").replace(/\/+/g, "/");
}

function s5n(e) {
  const t = String(e || "").trim();
  if (t) return l8r(t, i8r, o8r);
}

async function rZ(e) {
  if (!s8r()) return !1;
  const t = s5n(e);
  return aH && kae === t ? !0 : (kae !== t && (aH = !1), rH || (rH = (async () => {
    try {
      const n = await Fr("oss_index_db_open", {
        dbPath: t ?? null
      });
      return aH = !!(n != null && n.open), kae = t, aH;
    } catch (n) {
      return console.warn("[ossIndexSqlite] open failed:", n), aH = !1, !1;
    } finally {
      rH = null;
    }
  })(), rH));
}

function c8r() {
  aH = !1, rH = null, kae = void 0, $ge = null, Apt = void 0;
}

async function bet(e, t) {
  if (!(await rZ(t))) return null;
  try {
    return (await Fr("oss_index_db_get_meta", {
      key: e
    })) ?? null;
  } catch {
    return null;
  }
}

async function vet(e, t, n) {
  if (await rZ(n)) try {
    await Fr("oss_index_db_set_meta", {
      key: e,
      value: t
    });
  } catch (r) {
    console.warn("[ossIndexSqlite] set meta failed:", r);
  }
}

async function l5n(e, t, n) {
  if (!t.length || !(await rZ(n))) return 0;
  try {
    return await Fr("oss_index_db_dedup_upsert", {
      scope: e,
      entries: t
    });
  } catch (r) {
    return console.warn("[ossIndexSqlite] dedup upsert failed:", r), 0;
  }
}

async function d8r(e, t) {
  if (!(await rZ(t))) return [];
  try {
    const n = await Fr("oss_index_db_dedup_load_scope", {
      scope: e
    });
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}

async function Ole(e, t, n) {
  if (!t.length || !(await rZ(n))) return 0;
  try {
    return await Fr("oss_index_db_material_upsert", {
      kind: e,
      entries: t
    });
  } catch (r) {
    return console.warn("[ossIndexSqlite] material upsert failed:", r), 0;
  }
}

async function c5n(e, t) {
  if (!(await rZ(t))) return [];
  try {
    const n = await Fr("oss_index_db_material_load_kind", {
      kind: e
    });
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}

function wet(e) {
  if (!e) return null;
  try {
    const t = JSON.parse(e);
    return t && typeof t == "object" && !Array.isArray(t) ? t : null;
  } catch {
    return null;
  }
}

async function lIt(e) {
  const t = e.cacheRoot,
    n = s5n(t) || "";
  return Apt !== n && ($ge = null, Apt = n, kae !== n && (aH = !1, rH = null, kae = void 0)), (await rZ(t)) ? ($ge || ($ge = (async () => {
    var r, a, i;
    if ((await bet(xHt, t)) !== "1") {
      const o = String(e.dedupScope || "").trim(),
        s = ((r = e.loadDedupLs) == null ? void 0 : r.call(e)) ?? null,
        l = wet(s);
      if ((l == null ? void 0 : l.version) === 1 && l.entries && typeof l.entries == "object") {
        const d = String(l.scope || o || "").trim();
        if (d) {
          const u = Object.entries(l.entries).map(([p, m]) => ({
              fingerprint: p,
              remoteUrl: String(m.remoteUrl || ""),
              displayUrl: String(m.displayUrl || ""),
              mediaType: m.mediaType != null ? String(m.mediaType) : null,
              imageWidth: typeof m.imageWidth == "number" ? m.imageWidth : null,
              imageHeight: typeof m.imageHeight == "number" ? m.imageHeight : null,
              updatedAt: typeof m.updatedAt == "number" ? m.updatedAt : Date.now(),
              payload: m
            })),
            h = 200;
          for (let p = 0; p < u.length; p += h) await l5n(d, u.slice(p, p + h), t);
          console.log(`[ossIndexSqlite] migrated ${u.length} dedup entries (scope=${d})`);
        }
      }
      await vet(xHt, "1", t);
    }
    if ((await bet(_Ht, t)) !== "1") {
      const o = wet(((a = e.loadMaterialGlobalLs) == null ? void 0 : a.call(e)) ?? null);
      if (o) {
        const s = Object.entries(o).map(([d, u]) => {
            const h = u || {};
            return {
              pathKey: d,
              remoteUrl: String(h.remoteUrl || ""),
              displayUrl: h.displayUrl != null ? String(h.displayUrl) : null,
              updatedAt: typeof h.updatedAt == "number" ? h.updatedAt : Date.now(),
              payload: h
            };
          }),
          l = 200;
        for (let d = 0; d < s.length; d += l) await Ole("global", s.slice(d, d + l), t);
        console.log(`[ossIndexSqlite] migrated ${s.length} material global entries`);
      }
      await vet(_Ht, "1", t);
    }
    if ((await bet(kHt, t)) !== "1") {
      const o = wet(((i = e.loadMaterialBackupLs) == null ? void 0 : i.call(e)) ?? null);
      if (o) {
        const s = Object.entries(o).map(([d, u]) => {
            const h = u || {};
            return {
              pathKey: d,
              remoteUrl: String(h.remoteUrl || ""),
              displayUrl: h.displayUrl != null ? String(h.displayUrl) : null,
              updatedAt: typeof h.updatedAt == "number" ? h.updatedAt : Date.now(),
              payload: h
            };
          }),
          l = 200;
        for (let d = 0; d < s.length; d += l) await Ole("backup", s.slice(d, d + l), t);
        console.log(`[ossIndexSqlite] migrated ${s.length} material backup entries`);
      }
      await vet(kHt, "1", t);
    }
    return !0;
  })().catch(r => (console.warn("[ossIndexSqlite] migrate failed:", r), !1))), $ge) : !1;
}

const YVe = "qiaodoumayi_global_oss_upload_dedup_v1";

let _F = null,
  L9e = null,
  O9e = null,
  Qpe = null;

function Mue() {
  const e = sc(),
    t = p5t(e);
  if (mo(e) === "cloudinary") return `cloudinary|${String(e.cloudinaryCloudName || "").trim()}|${t}`;
  if (mo(e) === "qiniu") {
    const a = String(e.bucket || "").trim(),
      i = String(e.qiniuDomain || "").trim();
    return `qiniu|${a}|${i}|${t}`;
  }
  const n = String(e.bucket || "").trim(),
    r = String(e.endpoint || "").trim();
  return `oss|${n}|${r}|${t}`;
}

function d5n(e) {
  if (!e) return null;
  try {
    const t = JSON.parse(e);
    return (t == null ? void 0 : t.version) !== 1 || typeof t.entries != "object" ? null : t;
  } catch {
    return null;
  }
}

function u5n() {
  try {
    return d5n(localStorage.getItem(YVe));
  } catch {
    return null;
  }
}

function u8r(e) {
  try {
    localStorage.setItem(YVe, JSON.stringify(e)), n5t();
  } catch (t) {
    console.warn("[globalOssUploadDedup] 写入 LS 失败:", t);
  }
}

function jwe(e) {
  _F = e, L9e = null, O9e = null, B9e = null, F9e = null;
}

function cIt() {
  if (_F) return _F;
  const e = u5n();
  return e && jwe(e), _F;
}

async function h5n() {
  try {
    const {
      localCacheManager: e
    } = await Ie(async () => {
      const {
        localCacheManager: t
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: t
      };
    }, void 0, import.meta.url);
    return String(e.getDirectoryPathTauri() || "").trim() || null;
  } catch {
    return null;
  }
}

function h8r(e) {
  return {
    remoteUrl: e.remoteUrl,
    displayUrl: e.displayUrl,
    mediaType: e.mediaType || "image",
    imageWidth: e.imageWidth ?? void 0,
    imageHeight: e.imageHeight ?? void 0,
    updatedAt: e.updatedAt || Date.now()
  };
}

async function dIt() {
  return Qpe || (Qpe = (async () => {
    const e = await h5n(),
      t = Mue();
    await lIt({
      cacheRoot: e,
      dedupScope: t,
      loadDedupLs: () => {
        try {
          return localStorage.getItem(YVe);
        } catch {
          return null;
        }
      },
      loadMaterialGlobalLs: () => {
        try {
          return localStorage.getItem("qiaodoumayi_material_lib_global_oss_index");
        } catch {
          return null;
        }
      },
      loadMaterialBackupLs: () => {
        try {
          return localStorage.getItem("qiaodoumayi_material_lib_backup_oss_index");
        } catch {
          return null;
        }
      }
    });
    const n = await d8r(t, e);
    if (n.length > 0) {
      const r = {};
      for (const i of n) !i.fingerprint || !i.remoteUrl || !i.displayUrl || (r[i.fingerprint] = h8r(i));
      jwe({
        version: 1,
        scope: t,
        entries: r
      });
    } else {
      const r = u5n();
      r && r.scope === t && jwe(r);
    }
  })().catch(e => {
    console.warn("[globalOssUploadDedup] hydrate failed:", e);
  }).finally(() => {
    Qpe = null;
  }), Qpe);
}

function p8r(e, t, n) {
  (async () => {
    const r = await h5n();
    if (r) try {
      await l5n(n, [{
        fingerprint: e,
        remoteUrl: t.remoteUrl,
        displayUrl: t.displayUrl,
        mediaType: t.mediaType,
        imageWidth: t.imageWidth ?? null,
        imageHeight: t.imageHeight ?? null,
        updatedAt: t.updatedAt
      }], r);
      return;
    } catch (i) {
      console.warn("[globalOssUploadDedup] SQL upsert failed, fallback LS:", i);
    }
    const a = cIt();
    a && u8r(a);
  })();
}

async function uIt(e) {
  if (typeof crypto > "u" || !crypto.subtle) return "";
  const t = e.size;
  if (t <= 0) return "";
  const n = 16 * 1024;
  let r;
  if (t <= n * 2) r = await e.arrayBuffer();else {
    const i = await e.slice(0, n).arrayBuffer(),
      o = await e.slice(t - n).arrayBuffer(),
      s = new Uint8Array(8 + i.byteLength + o.byteLength);
    new DataView(s.buffer).setBigUint64(0, BigInt(t), !0), s.set(new Uint8Array(i), 8), s.set(new Uint8Array(o), 8 + i.byteLength), r = s.buffer;
  }
  const a = await crypto.subtle.digest("SHA-256", r);
  return Array.from(new Uint8Array(a)).map(i => i.toString(16).padStart(2, "0")).join("");
}

function p5n(e, t) {
  const n = String(e || "").trim();
  if (!n) return null;
  const r = cIt();
  if (!r || r.scope !== Mue()) return null;
  const a = r.entries[n];
  return !(a != null && a.remoteUrl) || !a.displayUrl || t && a.mediaType !== t ? null : {
    remoteUrl: bb(a.remoteUrl),
    displayUrl: bb(a.displayUrl),
    mediaType: a.mediaType,
    imageWidth: a.imageWidth,
    imageHeight: a.imageHeight
  };
}

function m5n(e, t) {
  const n = String(e || "").trim();
  if (!n || !t.remoteUrl || !t.displayUrl) return;
  const r = Mue(),
    a = cIt(),
    i = a && a.scope === r ? {
      ...a.entries
    } : {},
    o = {
      remoteUrl: t.remoteUrl,
      displayUrl: t.displayUrl,
      mediaType: t.mediaType,
      imageWidth: t.imageWidth,
      imageHeight: t.imageHeight,
      updatedAt: Date.now()
    };
  i[n] = o, jwe({
    version: 1,
    scope: r,
    entries: i
  }), p8r(n, o, r);
}

async function XVe(e, t) {
  dIt();
  const n = await uIt(e);
  return n ? p5n(n, t) : null;
}

async function yY(e, t) {
  const n = await uIt(e);
  n && m5n(n, t);
}

function hIt() {
  if (_F) return _F;
  try {
    const e = eEt(YVe),
      t = d5n(e);
    return t && jwe(t), _F;
  } catch {
    return _F;
  }
}

function m8r(e) {
  if (L9e) return L9e;
  const t = new Map();
  for (const n of Object.values(e.entries)) {
    const r = String(n.displayUrl || "").trim().split("?")[0];
    r && n.remoteUrl && !t.has(r) && t.set(r, n.remoteUrl);
  }
  return L9e = t, t;
}

function A0(e) {
  const t = String(e || "").trim().split("?")[0];
  if (!t) return null;
  const n = hIt();
  return !n || n.scope !== Mue() ? null : m8r(n).get(t) ?? null;
}

function f8r(e) {
  if (O9e) return O9e;
  const t = new Map();
  for (const n of Object.values(e.entries)) {
    const r = String(n.remoteUrl || "").trim().split("?")[0],
      a = String(n.displayUrl || "").trim();
    r && a && !t.has(r) && t.set(r, a);
  }
  return O9e = t, t;
}

function Dwe(e) {
  const t = String(e || "").trim().split("?")[0];
  if (!t) return null;
  const n = hIt();
  if (!n || n.scope !== Mue()) return null;
  const r = f8r(n).get(t);
  return r ? bb(r) : null;
}

function dU(e) {
  const t = String(e || "").trim().split("?")[0];
  if (!t) return "";
  let n = t.split("/").pop() || "";
  try {
    n = decodeURIComponent(n);
  } catch {}
  return n.replace(/-list\.(webp|jpe?g|png)$/i, "").replace(/\.(webp|jpe?g|png|gif|bmp|mp4|webm|mov|m4v)$/i, "").replace(/[-_](thumb|preview|list)$/i, "");
}

function pIt(e) {
  const t = dU(e);
  if (!t) return "";
  const n = t.match(/^\d{10,}-[a-z0-9]{4,12}-(.+)$/i),
    r = String((n == null ? void 0 : n[1]) || "").trim();
  return r.length >= 4 ? r : "";
}

function g8r(e) {
  const t = String(e || "").match(/^(\d{10,})/);
  return (t == null ? void 0 : t[1]) || "";
}

function Lwe(e, t, n, r, a) {
  const i = String(e || "").trim(),
    o = String(t || "").trim();
  if (!i || i.length < 8 || !o) return;
  n.has(i) || n.set(i, o);
  const s = g8r(i);
  if (!s || s === i) return;
  const l = r.get(s);
  l && l !== o ? a.add(s) : l || r.set(s, o);
}

function JVe(e) {
  const t = String(e || "").trim().split("?")[0];
  if (!t || !/\/thumbnails\//i.test(t)) return null;
  const n = dU(t);
  if (!n || n.length < 8) return null;
  const r = hIt();
  if (!r || r.scope !== Mue()) return null;
  const {
    exact: a,
    prefix: i
  } = y8r(r);
  return a.get(n) ?? i.get(n) ?? null;
}

let B9e = null,
  F9e = null;

function y8r(e) {
  if (B9e && F9e) return {
    exact: B9e,
    prefix: F9e
  };
  const t = new Map(),
    n = new Map(),
    r = new Set();
  for (const a of Object.values(e.entries)) {
    const i = String(a.remoteUrl || "").trim();
    i && (Lwe(dU(String(a.displayUrl || "")), i, t, n, r), Lwe(dU(i), i, t, n, r));
  }
  for (const a of r) n.delete(a);
  return B9e = t, F9e = n, {
    exact: t,
    prefix: n
  };
}

const mIt = Object.freeze(Object.defineProperty({
    __proto__: null,
    addOssStemToIndexes: Lwe,
    computeFileContentFingerprint: uIt,
    extractOssMaterialLogicalNameKey: pIt,
    extractOssMaterialObjectStem: dU,
    hydrateGlobalOssUploadDedupFromSqlite: dIt,
    lookupGlobalOssDisplayByRemoteUrl: Dwe,
    lookupGlobalOssRemoteByDisplayUrl: A0,
    lookupGlobalOssRemoteByThumbnailStem: JVe,
    lookupGlobalOssUploadDedup: p5n,
    rememberGlobalOssUploadForFile: yY,
    saveGlobalOssUploadDedup: m5n,
    tryReuseGlobalOssUploadFromFile: XVe
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Zi = {
    THEME: "qiaodoumayi_theme",
    PERFORMANCE_MODE: "qiaodoumayi_performance_mode",
    HISTORY: "qiaodoumayi_history",
    CHARACTERS: "qiaodoumayi_characters",
    KLING_SUBJECTS: "qiaodoumayi_kling_subjects",
    PROJECT_NAME: "qiaodoumayi_project_name",
    PROMPT_LIBRARY: "qiaodoumayi_prompt_library",
    RH_API_KEY: "qiaodoumayi_rh_api_key",
    RH_APP_LIBRARY: "qiaodoumayi_rh_app_library",
    LEFT_TOOLBAR_OVERFLOW_ORDER: "qiaodoumayi_left_toolbar_overflow_order",
    LEFT_TOOLBAR_SIDEBAR_PINS: "qiaodoumayi_left_toolbar_sidebar_pins",
    NODE_TOOLS_ORDER: "qiaodoumayi_node_tools_order",
    CANVAS_NODE_CUSTOMIZATION: "qiaodoumayi_canvas_node_customization",
    MODEL_LIST_DISPLAY: "qiaodoumayi_model_list_display",
    SHOW_CANVAS_GRID: "qiaodoumayi_show_canvas_grid",
    CANVAS_GRID_SPACING: "qiaodoumayi_canvas_grid_spacing",
    CANVAS_GRID_DOT_SIZE: "qiaodoumayi_canvas_grid_dot_size",
    CANVAS_GRID_STYLE_VERSION: "qiaodoumayi_canvas_grid_style_version",
    SHOW_CANVAS_SNAP: "qiaodoumayi_show_canvas_snap",
    SHOW_CANVAS_MINIMAP: "qiaodoumayi_show_canvas_minimap",
    CANVAS_MINIMAP_DOCK: "qiaodoumayi_canvas_minimap_dock",
    FOLLOW_DOWNSTREAM_ON_DRAG: "qiaodoumayi_follow_downstream_on_drag",
    POSE_LIBRARY_PANEL: "qiaodoumayi_pose_library_panel",
    LEFT_TOOLBAR_COLLAPSED: "qiaodoumayi_left_toolbar_collapsed",
    LEFT_TOOLBAR_DOCK: "qiaodoumayi_left_toolbar_dock",
    HIDE_ALL_INPUT_IMAGE_PREVIEWS: "qiaodoumayi_hide_all_input_image_previews",
    CONNECTION_FULL_DISPLAY: "qiaodoumayi_connection_full_display",
    CONNECTION_HIT_WIDTH: "qiaodoumayi_connection_hit_width",
    SHOW_ALIGNMENT_GUIDES: "qiaodoumayi_show_alignment_guides",
    LOCATE_ANIMATION_MAX_NODES: "qiaodoumayi_locate_animation_max_nodes",
    SHOW_CANVAS_BG_GLOW: "qiaodoumayi_show_canvas_bg_glow",
    SHOW_NODE_DELETE_BUTTON: "qiaodoumayi_show_node_delete_button",
    SHOW_START_GENERATE_BUTTON: "qiaodoumayi_show_start_generate_button",
    CANVAS_BG_COLOR_LIGHT: "qiaodoumayi_canvas_bg_color_light",
    CANVAS_BG_COLOR_DARK: "qiaodoumayi_canvas_bg_color_dark",
    EDIT_IMAGE_LAST_MODEL_ID: "qiaodoumayi_edit_image_last_model_id",
    ENABLE_CONNECT_WIRE_TILT: "qiaodoumayi_enable_connect_wire_tilt",
    ENABLE_CONNECT_WIRE_MARQUEE: "qiaodoumayi_enable_connect_wire_marquee",
    ENABLE_GENERATION_CONNECTION_FLOW: "qiaodoumayi_enable_generation_connection_flow",
    ENABLE_GENERATION_NODE_ANIMATION: "qiaodoumayi_enable_generation_node_animation",
    SHOW_CANVAS_GENERATION_TIMER: "qiaodoumayi_show_canvas_generation_timer",
    CONNECTION_LINE_STROKE_WIDTH: "qiaodoumayi_connection_line_stroke_width",
    CONNECTION_LINE_OPACITY_PERCENT: "qiaodoumayi_connection_line_opacity_percent",
    CONNECTION_LINE_COLOR_DARK: "qiaodoumayi_connection_line_color_dark",
    CONNECTION_LINE_COLOR_LIGHT: "qiaodoumayi_connection_line_color_light",
    CANVAS_MEDIA_TILES: "qiaodoumayi_canvas_media_tiles",
    CANVAS_MEDIA_TILE_BACKEND: "qiaodoumayi_canvas_media_tile_backend",
    CANVAS_UNIFIED_GL: "qiaodoumayi_canvas_unified_gl",
    CANVAS_COMPOSITOR: "qiaodoumayi_canvas_compositor",
    CANVAS_VIDEO_TILE_FRAMES: "qiaodoumayi_canvas_video_tile_frames",
    PERFORMANCE_PANEL_MODE: "qiaodoumayi_performance_panel_mode"
  };

function ZVe() {
  return ua() ? "oss" : "local";
}

function ei() {
  return ZVe() === "local";
}

function E0() {
  return ZVe() === "oss";
}

function Mk(e) {
  const t = String(e || "").trim();
  return t ? t.startsWith("blob:") || t.startsWith("data:") || vs(t) ? !0 : nr(t) ? !1 : !/^https?:\/\//i.test(t) : !1;
}

function vs(e) {
  const t = String(e || "").trim();
  return t ? t.startsWith("asset:") ? !0 : /^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(t) : !1;
}

let Owe = "";

function Gge(e) {
  Owe = String(e || "").trim().replace(/\\/g, "/").replace(/\/+/g, "/").toLowerCase();
}

function S3(e) {
  if (!vs(e)) return !1;
  if (!Owe) return !0;
  let t = String(e);
  try {
    t = decodeURIComponent(t);
  } catch {}
  return t.replace(/\\/g, "/").replace(/\/+/g, "/").toLowerCase().includes(Owe);
}

function eHe(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
  if (!Owe) return !0;
  let n = t;
  try {
    n = decodeURIComponent(t);
  } catch {}
  const r = n.replace(/\\/g, "/").replace(/\/+/g, "/").toLowerCase(),
    a = Owe.replace(/\/+$/, "");
  return r === a || r.startsWith(`${a}/`);
}

function R2(e) {
  const t = String(e || "").trim();
  return !t || vs(t) ? !1 : /^https?:\/\//i.test(t);
}

function Spt(e, t) {
  return new RegExp(`(?:[/\\\\]|%5[cC])${t}(?:[/\\\\]|%5[cC])`, "i").test(e);
}

function Af(e) {
  if (!vs(e)) return !1;
  const t = String(e);
  return !!(Spt(t, "thumbnails") || /preview_[^/\\%?]+\.(?:webp|jpe?g|png)/i.test(t));
}

function zg(e) {
  if (!vs(e) || Af(e)) return !1;
  const t = String(e);
  return !!(Spt(t, "images") || Spt(t, "local") && !/\.webp(?:\?|#|$)/i.test(t));
}

async function tHe(e, t) {
  const n = String(e || "").trim();
  if (!n) return null;
  if (n.startsWith("blob:") || n.startsWith("data:")) return n;
  if (nr(n) && !(t != null && t.some(i => String(i || "").trim()))) return null;
  const r = [],
    a = new Set();
  for (const i of t ?? []) {
    const o = String(i || "").trim();
    !o || a.has(o) || (a.add(o), r.push(o));
  }
  if (r.length > 0) {
    try {
      const {
        resolveLocalCachedDisplayUrls: i
      } = await Ie(async () => {
        const {
          resolveLocalCachedDisplayUrls: o
        } = await Promise.resolve().then(() => Ui);
        return {
          resolveLocalCachedDisplayUrls: o
        };
      }, void 0, import.meta.url);
      for (const o of r) {
        const s = await i(o, {
          fallbackCreateThumbMax: 256
        });
        if (s != null && s.displayUrl && Mk(s.displayUrl)) return s.displayUrl;
      }
    } catch {}
    try {
      const {
        assetStore: i
      } = await Ie(async () => {
        const {
          assetStore: o
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: o
        };
      }, void 0, import.meta.url);
      for (const o of r) {
        const s = await i.getAssetUrl(o, n);
        if (s && Mk(s) && !zg(s)) return s;
      }
    } catch {}
  }
  return nr(n) || zg(n) ? null : Af(n) || n.startsWith("blob:") || n.startsWith("data:") || Mk(n) && !vs(n) ? n : null;
}

const So = Object.freeze(Object.defineProperty({
    __proto__: null,
    getCanvasStorageMode: ZVe,
    isCanvasLocalCacheMode: ei,
    isCanvasOssDisplayMode: E0,
    isLocalCanvasDisplayUrl: Mk,
    isLocalPathUnderCurrentCacheRoot: eHe,
    isRemoteHttpUrl: R2,
    isTauriAssetProtocolUrl: vs,
    isTauriAssetUrlUnderCurrentCacheRoot: S3,
    isTauriLocalOriginalImageUrl: zg,
    isTauriLocalPreviewDisplayUrl: Af,
    resolveCanvasLocalModeDisplayUrl: tHe,
    setCurrentLocalCacheRoot: Gge
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  dg = "_localCacheAssetId";

function f5n(e) {
  return /^split_/i.test(String(e || "").trim());
}

function bY(e) {
  const t = String(e || "").trim();
  return !t || /^preview_[^_]+_(?:img\d+|selected|video\d+|selected_video)_\d+$/i.test(t) || /^preview_[^_]+_\d+$/i.test(t) ? !1 : t.startsWith("preview_") || t.startsWith("thumb_") || t.endsWith("_thumbnail");
}

function b8r(e) {
  const t = String(e).trim();
  return t ? /^preview_[^_]+_(?:img\d+|selected|video\d+|selected_video)_\d+$/i.test(t) || /^preview_[^_]+_\d+$/i.test(t) : !1;
}

function Bwe(e, t) {
  if (!e) return !1;
  const n = e.replace(/\\/g, "/").toLowerCase();
  return n.includes("/thumbnails/") ? !0 : typeof t == "number" && t > 200 * 1024 ? !1 : n.includes("thumbnail") || n.includes("_humbnail");
}

function v8r(e, t, n) {
  if (t === e || t.startsWith(`${e}_`)) return !0;
  if (!n) return !1;
  const r = n.replace(/\\/g, "/").toLowerCase(),
    a = e.toLowerCase(),
    i = a.slice(0, Math.min(8, a.length)),
    o = a.slice(Math.max(0, a.length - 6));
  return !!(i && r.includes(i) || o && r.includes(o));
}

async function Pue(e) {
  if (!e.type.startsWith("image/")) return null;
  const t = URL.createObjectURL(e);
  try {
    return await new Promise(n => {
      const r = new Image();
      r.onload = () => {
        const a = r.naturalWidth,
          i = r.naturalHeight;
        n(a > 0 && i > 0 ? {
          width: a,
          height: i
        } : null);
      }, r.onerror = () => n(null), r.src = t;
    });
  } finally {
    URL.revokeObjectURL(t);
  }
}

async function fIt(e) {
  const t = String(e || "").trim();
  if (!t || bY(t)) return null;
  try {
    const {
      localCacheManager: n
    } = await Ie(async () => {
      const {
        localCacheManager: a
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: a
      };
    }, void 0, import.meta.url);
    await n.ensureRestored();
    const r = await n.getConvertFileSrcForAsset(t);
    if (r) {
      const a = await new Promise(i => {
        const o = new Image();
        o.onload = () => {
          const s = o.naturalWidth,
            l = o.naturalHeight;
          i(s > 0 && l > 0 ? {
            width: s,
            height: l
          } : null);
        }, o.onerror = () => i(null), o.src = r;
      });
      if (a) return a;
    }
  } catch {}
  try {
    const n = await _D(t, void 0, {
      allowPreviewFallback: !1
    });
    return n ? Pue(n) : null;
  } catch {
    return null;
  }
}

function XDe(e, t, n = 0) {
  return t > 200 * 1024 ? !1 : n > 0 ? t <= n * 1.15 : t < 64 * 1024;
}

function g5n(e) {
  var t;
  try {
    const n = `preview_${e}`;
    return !Ur.isAvailable() || !Ur.hasAsset(n) ? 0 : Number(((t = Ur.getAssetManifestMeta(n)) == null ? void 0 : t.size) || 0);
  } catch {
    return 0;
  }
}

async function iH(e, t) {
  try {
    const {
      localCacheManager: n
    } = await Ie(async () => {
      const {
        localCacheManager: r
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: r
      };
    }, void 0, import.meta.url);
    return await n.ensureRestored(), XDe(e, t.size, g5n(e));
  } catch {
    return XDe(e, t.size);
  }
}

async function gIt(e) {
  var t;
  try {
    const {
      localCacheManager: n
    } = await Ie(async () => {
      const {
        localCacheManager: i
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: i
      };
    }, void 0, import.meta.url);
    if (await n.ensureRestored(), !n.isAvailable()) return null;
    const r = g5n(e);
    let a = null;
    for (const i of n.getCachedAssetIds()) {
      if (bY(i)) continue;
      const o = n.getAssetManifestMeta(i);
      if (!v8r(e, i, o == null ? void 0 : o.fileName) || Bwe(o == null ? void 0 : o.fileName, o == null ? void 0 : o.size)) continue;
      const s = ((t = o == null ? void 0 : o.fileName) == null ? void 0 : t.replace(/\\/g, "/")) ?? "";
      if (s && !s.startsWith("images/") && !s.startsWith("local/") && !s.startsWith("videos/")) continue;
      const l = Number((o == null ? void 0 : o.size) || 0);
      XDe(e, l, r) || (!a || l > a.sizeHint) && (a = {
        key: i,
        fileName: o == null ? void 0 : o.fileName,
        sizeHint: l
      });
    }
    return a;
  } catch {
    return null;
  }
}

async function y5n(e) {
  var n;
  const t = await gIt(e);
  if (!t) return null;
  try {
    const {
        localCacheManager: r
      } = await Ie(async () => {
        const {
          localCacheManager: i
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: i
        };
      }, void 0, import.meta.url),
      a = await r.readAsset(t.key);
    return !((n = a == null ? void 0 : a.blob) != null && n.size) || (await iH(e, a.blob)) ? null : {
      blob: a.blob,
      assetId: t.key,
      fileName: t.fileName
    };
  } catch {
    return null;
  }
}

function sM(e) {
  const t = e._mjAssetIds;
  if (e.mjImages && t && t.length > 0) {
    const n = Math.max(0, Number(e.selectedMjImageIndex ?? 0));
    return t[Math.min(n, t.length - 1)] || t[0];
  }
  return e._assetId || e.id;
}

async function b5n(e) {
  if (e._globalOssUrlOnly || e.ossUploaded) return !1;
  const t = sM(e);
  if (!t || bY(t)) return !1;
  try {
    const {
      localCacheManager: n
    } = await Ie(async () => {
      const {
        localCacheManager: r
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: r
      };
    }, void 0, import.meta.url);
    if (await n.ensureRestored(), n.isAvailable()) {
      if (n.hasAsset(t)) {
        const r = n.getAssetManifestMeta(t);
        if (!Bwe(r == null ? void 0 : r.fileName, r == null ? void 0 : r.size)) return !0;
      }
      if (await gIt(t)) return !0;
    }
  } catch {}
  try {
    const {
      assetStore: n
    } = await Ie(async () => {
      const {
        assetStore: a
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: a
      };
    }, void 0, import.meta.url);
    return await n.init(), !!((await n.getAssetRecord(t)) && !bY(t));
  } catch {
    return !1;
  }
}

async function _D(e, t, n) {
  var u;
  const r = String(e || "").trim();
  if (!r || bY(r)) return null;
  const a = (n == null ? void 0 : n.allowPreviewFallback) !== !1;
  let i = null,
    o = null,
    s = !1;
  try {
    const {
      localCacheManager: h
    } = await Ie(async () => {
      const {
        localCacheManager: p
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: p
      };
    }, void 0, import.meta.url);
    if (await h.ensureRestored(), s = h.isAvailable(), s && h.hasAsset(r)) {
      const p = await h.readAsset(r),
        m = h.getAssetManifestMeta(r);
      if (p != null && p.blob && p.blob.size > 0) {
        if (f5n(r)) return p.blob;
        Bwe(m == null ? void 0 : m.fileName, p.blob.size) || ((await iH(r, p.blob)) ? o = p.blob : i = p.blob);
      }
    }
  } catch {}
  if (i) return i;
  const l = await y5n(r);
  if (l) return l.blob;
  if (a && s) try {
    const {
        localCacheManager: h
      } = await Ie(async () => {
        const {
          localCacheManager: m
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: m
        };
      }, void 0, import.meta.url),
      p = `preview_${r}`;
    if (h.hasAsset(p)) {
      const m = await h.readAsset(p);
      if ((u = m == null ? void 0 : m.blob) != null && u.size) return m.blob;
    }
    if (h.hasThumbnail(r, "preview")) {
      const m = await h.readThumbnail(r, "preview");
      if (m != null && m.startsWith("blob:")) {
        const f = await fetch(m);
        if (f.ok) {
          const y = await f.blob();
          if (y.size > 0) return y;
        }
      }
    }
  } catch {}
  try {
    const {
      assetStore: h
    } = await Ie(async () => {
      const {
        assetStore: y
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: y
      };
    }, void 0, import.meta.url);
    await h.init();
    const p = await h.getAssetBlob(r);
    if (p && p.size > 0) {
      if (!(await iH(r, p))) return p;
      o != null && o.size || (o = p);
    }
    const m = await h.getAssetRecord(r),
      f = m == null ? void 0 : m.remoteUrl;
    if (f && (f.startsWith("http://") || f.startsWith("https://")) && !s && !Nb(f)) {
      const y = await fetch(f);
      if (y.ok) {
        const b = await y.blob();
        if (b.size > 0 && !(await iH(r, b))) return b;
      }
    }
  } catch {}
  const d = String(t || "").trim();
  if (d.startsWith("http://") || d.startsWith("https://")) {
    if (s) {
      const h = await v5n(d);
      return h != null && h.size && !(await iH(r, h)) ? h : a && (o != null && o.size) ? o : null;
    }
    if (Nb(d)) return a && (o != null && o.size) ? o : null;
    try {
      const h = await fetch(d);
      if (h.ok) {
        const p = await h.blob();
        if (p.size > 0 && !(await iH(r, p))) return p;
      }
    } catch {}
  }
  return a && (o != null && o.size) ? o : null;
}

async function v5n(e) {
  var n, r;
  const t = String(e || "").trim();
  if (!t.startsWith("http://") && !t.startsWith("https://") || Nb(t)) return null;
  try {
    const {
      localCacheManager: a
    } = await Ie(async () => {
      const {
        localCacheManager: i
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: i
      };
    }, void 0, import.meta.url);
    if (await a.ensureRestored(), a.isAvailable()) {
      const i = a.getManifest();
      let o = "";
      try {
        o = new URL(t).pathname;
      } catch {}
      for (const s of a.findAssetIdsByRemoteUrl(t)) {
        const l = i == null ? void 0 : i.assets[s];
        if (!(l != null && l.remoteUrl)) continue;
        const d = await a.readAsset(s);
        if ((n = d == null ? void 0 : d.blob) != null && n.size && !Bwe(l.fileName, d.blob.size)) return d.blob;
      }
      if (o && (i != null && i.assets)) for (const [s, l] of Object.entries(i.assets)) {
        const d = l == null ? void 0 : l.remoteUrl;
        if (!d) continue;
        try {
          if (new URL(d).pathname !== o) continue;
        } catch {
          continue;
        }
        const u = await a.readAsset(s);
        if ((r = u == null ? void 0 : u.blob) != null && r.size && !Bwe(l.fileName, u.blob.size)) return u.blob;
      }
    }
  } catch {}
  try {
    const {
        assetStore: a
      } = await Ie(async () => {
        const {
          assetStore: o
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: o
        };
      }, void 0, import.meta.url),
      i = await a.getAssetBlobByRemoteUrl(t);
    if (i != null && i.size) return i;
  } catch {}
  return null;
}

async function lM(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  try {
    const {
        localCacheManager: n
      } = await Ie(async () => {
        const {
          localCacheManager: a
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: a
        };
      }, void 0, import.meta.url),
      r = n.getCachedAssetUrlSync(t);
    return r || (await n.ensureRestored(), !n.isAvailable() || !n.hasAsset(t) ? null : await n.readAssetAsUrl(t));
  } catch {
    return null;
  }
}

function Fwe(e, t) {
  if (!(e != null && e.startsWith("blob:"))) return !1;
  const n = String(t || "").trim();
  return Ur.isManagedBlobUrl(e) ? n ? Ur.getCachedAssetUrlSync(n) === e : !0 : n ? vm(e) === n : !1;
}

async function yIt(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  try {
    const {
      assetStore: n
    } = await Ie(async () => {
      const {
        assetStore: r
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: r
      };
    }, void 0, import.meta.url);
    return await n.init(), await n.getAssetUrl(t);
  } catch {
    return null;
  }
}

async function F$(e, t) {
  const n = await lM(e);
  if (n) return n;
  const r = await gIt(e);
  if (r && r.key !== e) {
    const o = await lM(r.key);
    if (o) return o;
  }
  const a = await yIt(e);
  if (a) return a;
  const i = await _D(e, t);
  return i ? URL.createObjectURL(i) : null;
}

async function Ipt(e, t) {
  const n = String(e || "").trim();
  if (!n) return null;
  try {
    const {
      localCacheManager: s
    } = await Ie(async () => {
      const {
        localCacheManager: l
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: l
      };
    }, void 0, import.meta.url);
    if (await s.ensureRestored(), s.isAvailable() && s.hasAsset(n)) {
      const l = await s.getConvertFileSrcForAsset(n);
      if (l) return l;
    }
  } catch {}
  const r = await lM(n);
  if (r) {
    const {
      isTauriAssetProtocolUrl: s
    } = await Ie(async () => {
      const {
        isTauriAssetProtocolUrl: l
      } = await Promise.resolve().then(() => So);
      return {
        isTauriAssetProtocolUrl: l
      };
    }, void 0, import.meta.url);
    if (s(r) || !r.startsWith("blob:")) return r;
  }
  const a = await yIt(n);
  if (a) {
    const {
      isTauriAssetProtocolUrl: s
    } = await Ie(async () => {
      const {
        isTauriAssetProtocolUrl: l
      } = await Promise.resolve().then(() => So);
      return {
        isTauriAssetProtocolUrl: l
      };
    }, void 0, import.meta.url);
    if (s(a) || !/^blob:https?:\/\//i.test(a)) return a;
  }
  const i = await F$(n);
  if (i) {
    const {
      isTauriAssetProtocolUrl: s
    } = await Ie(async () => {
      const {
        isTauriAssetProtocolUrl: l
      } = await Promise.resolve().then(() => So);
      return {
        isTauriAssetProtocolUrl: l
      };
    }, void 0, import.meta.url);
    if (s(i) || !/^blob:https?:\/\//i.test(i)) return i;
  }
  const o = String(t || "").trim();
  if (o.startsWith("blob:") || o.startsWith("data:image")) {
    try {
      const {
          getFullBlobUrlForDisplayUrl: s
        } = await Ie(async () => {
          const {
            getFullBlobUrlForDisplayUrl: d
          } = await Promise.resolve().then(() => No);
          return {
            getFullBlobUrlForDisplayUrl: d
          };
        }, void 0, import.meta.url),
        l = await s(o, n, null);
      if (l) return l;
    } catch {}
    if (o.startsWith("blob:")) try {
      const s = await fetch(o, {
        cache: "no-store"
      });
      if (s.ok && (await s.blob()).size > 0) return o;
    } catch {}
  }
  return r || a || i || null;
}

async function Ype(e, t, n) {
  if (!e || e.size <= 0) return null;
  const r = b8r(t);
  if (!r && (await iH(t, e))) return null;
  const a = String(n || "").trim();
  if (a.startsWith("blob:")) {
    const {
        getOriginalDimensionsForDisplayUrl: i
      } = await Ie(async () => {
        const {
          getOriginalDimensionsForDisplayUrl: s
        } = await Promise.resolve().then(() => No);
        return {
          getOriginalDimensionsForDisplayUrl: s
        };
      }, void 0, import.meta.url),
      o = i(a);
    if (o && o.width > 0) {
      const s = await Pue(e);
      if (!r && s && s.width > 0 && s.width < o.width * .85) return null;
    }
  }
  return URL.createObjectURL(e);
}

async function w8r(e) {
  const t = String(e || "").trim();
  if (!t.startsWith("http://") && !t.startsWith("https://")) return null;
  try {
    const {
        downloadWithFallback: n
      } = await Ie(async () => {
        const {
          downloadWithFallback: a
        } = await Promise.resolve().then(() => El);
        return {
          downloadWithFallback: a
        };
      }, void 0, import.meta.url),
      r = await n(t, 12e4);
    if (r && r.size > 0) return r;
  } catch {}
  try {
    const n = await fetch(t);
    if (n.ok) {
      const r = await n.blob();
      if (r.size > 0) return r;
    }
  } catch {}
  return null;
}

async function Vge(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  let a = n;
  if (!a && r.startsWith("blob:")) {
    const {
      getAssetIdForDisplayBlobUrl: s
    } = await Ie(async () => {
      const {
        getAssetIdForDisplayBlobUrl: l
      } = await Promise.resolve().then(() => No);
      return {
        getAssetIdForDisplayBlobUrl: l
      };
    }, void 0, import.meta.url);
    a = s(r) || "";
  }
  const i = a || n || "preview";
  if (ei()) {
    if (a) {
      const s = await F$(a);
      if (s) return s;
    }
    if (r.startsWith("blob:")) {
      const {
          getFullBlobUrlForDisplayUrl: s
        } = await Ie(async () => {
          const {
            getFullBlobUrlForDisplayUrl: d
          } = await Promise.resolve().then(() => No);
          return {
            getFullBlobUrlForDisplayUrl: d
          };
        }, void 0, import.meta.url),
        l = await s(r, a || null, null);
      if (l) return l;
      try {
        const d = await fetch(r, {
          cache: "no-store"
        });
        if (d.ok && (await d.blob()).size > 0) return r;
      } catch {}
    }
    return r.startsWith("data:image") ? r : null;
  }
  let o = "";
  if (a) {
    try {
      const {
        assetStore: u
      } = await Ie(async () => {
        const {
          assetStore: f
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: f
        };
      }, void 0, import.meta.url);
      await u.init();
      const h = await u.getAssetRecord(a);
      o = String((h == null ? void 0 : h.remoteUrl) || "").trim();
      const p = await u.getAssetBlob(a),
        m = await Ype(p, i, r);
      if (m) return m;
      if (o) {
        const f = await w8r(o),
          y = await Ype(f, i, r);
        if (y) return y;
      }
    } catch {}
    const s = await y5n(a);
    if (s) {
      const u = await Ype(s.blob, i, r);
      if (u) return u;
    }
    const l = await _D(a, o || void 0),
      d = await Ype(l, i, r);
    if (d) return d;
  }
  if (r.startsWith("blob:")) {
    const {
        getFullBlobUrlForDisplayUrl: s
      } = await Ie(async () => {
        const {
          getFullBlobUrlForDisplayUrl: d
        } = await Promise.resolve().then(() => No);
        return {
          getFullBlobUrlForDisplayUrl: d
        };
      }, void 0, import.meta.url),
      l = await s(r, a || null, null);
    if (l) try {
      const d = await fetch(l),
        u = d.ok ? await d.blob() : null,
        h = await Ype(u, i, r);
      if (h) return h;
    } catch {
      return l;
    }
  }
  return null;
}

function bIt(e) {
  const t = String(e.assetId || "").trim(),
    n = String(e.originalUrl || "").trim(),
    r = String(e.mimeType || "").trim().toLowerCase(),
    a = String(e.blobMimeType || "").trim().toLowerCase(),
    i = String(e.fileName || "").trim().replace(/\\/g, "/");
  return r.startsWith("image/") || a.startsWith("image/") || /\.(?:avif|bmp|gif|jpe?g|png|webp)(?:$|[?#])/i.test(i) || tl(n) ? !1 : n.startsWith("data:video/") || $o(n) || r.startsWith("video/") || a.startsWith("video/") || /\.(?:avi|m4v|mkv|mov|mp4|webm)(?:$|[?#])/i.test(i) ? !0 : /(?:^|[_-])(?:frame|poster|thumb|thumbnail)(?:[_-]|$)/i.test(t) ? !1 : /(?:^|_)(?:vidu_|huya_video|video)(?:_|$)/i.test(t);
}

function z9e(e, t, n) {
  let r = "",
    a = "";
  try {
    const i = Ur.getAssetManifestMeta(e);
    r = String((i == null ? void 0 : i.mimeType) || ""), a = String((i == null ? void 0 : i.fileName) || "");
  } catch {}
  return bIt({
    assetId: e,
    originalUrl: t,
    mimeType: r,
    fileName: a,
    blobMimeType: n == null ? void 0 : n.type
  });
}

async function _5(e) {
  var n;
  const t = String(e || "").trim();
  if (!t) return null;
  try {
    const {
      localCacheManager: r
    } = await Ie(async () => {
      const {
        localCacheManager: a
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: a
      };
    }, void 0, import.meta.url);
    if (await r.ensureRestored(), r.isAvailable() && t.startsWith("preview_") && r.hasAsset(t)) {
      const a = await r.getConvertFileSrcForAsset(t);
      if (a) return a;
      const i = await r.readAsset(t);
      if ((n = i == null ? void 0 : i.blob) != null && n.size) return await new Promise(o => {
        const s = new FileReader();
        s.onload = () => o(typeof s.result == "string" ? s.result : null), s.onerror = () => o(null), s.readAsDataURL(i.blob);
      });
    }
    if (r.isAvailable() && r.hasThumbnail(t, "preview")) return (await r.readThumbnail(t, "preview")) || null;
    if (r.isAvailable()) return null;
    try {
      const {
          thumbnailStore: a
        } = await Ie(async () => {
          const {
            thumbnailStore: o
          } = await Promise.resolve().then(() => Y$);
          return {
            thumbnailStore: o
          };
        }, void 0, import.meta.url),
        i = (await a.getPreview(t)) || (await a.getThumbnail(t));
      if (i) return i;
    } catch {}
  } catch {}
  return null;
}

async function x8r(e, t, n = 512) {
  return e5e(e, {
    maxDim: n,
    allowVideoOriginal: !0
  });
}

const OEe = new Map(),
  GC = new Map(),
  _8r = 1024;

function w5n(e) {
  const t = String((e == null ? void 0 : e.failedUrl) || "").trim();
  if (t) for (const [r, a] of [...GC.entries()]) a === t && GC.delete(r);
  const n = new Set();
  for (const r of (e == null ? void 0 : e.assetIds) || []) {
    const a = String(r || "").trim();
    a && n.add(a);
  }
  for (const r of n) {
    GC.delete(r);
    try {
      Ur.invalidateConvertFileSrcCache(`preview_${r}`), Ur.invalidateConvertFileSrcCache(r), r.startsWith("preview_") && Ur.invalidateConvertFileSrcCache(r.slice(8));
    } catch {}
  }
  if (!n.size && t) {
    let r = t;
    try {
      r = decodeURIComponent(t);
    } catch {}
    const a = /preview_([^/\\%?]+)\.(?:webp|jpe?g|png)/i.exec(r);
    if (a != null && a[1]) {
      const i = a[1];
      try {
        Ur.invalidateConvertFileSrcCache(`preview_${i}`), Ur.invalidateConvertFileSrcCache(i);
      } catch {}
      GC.delete(i), GC.delete(`preview_${i}`);
    }
  }
}

async function k8r(e, t, n) {
  const r = String(e || "").trim();
  if (!r) return null;
  const a = String(t || "").trim();
  w5n({
    assetIds: [r],
    failedUrl: a || null
  });
  const i = await e5e(r, {
    maxDim: (n == null ? void 0 : n.maxDim) ?? 256,
    allowVideoOriginal: (n == null ? void 0 : n.allowVideoOriginal) ?? !1
  });
  if (!i) return null;
  if (a && i === a) {
    if (!vs(i)) return null;
    const o = i.includes("?") ? "&" : "?";
    return `${i}${o}local_preview_retry=${Date.now().toString(36)}`;
  }
  return i;
}

async function e5e(e, t) {
  const n = String(e || "").trim();
  if (!n) return null;
  if ((t == null ? void 0 : t.allowVideoOriginal) === !1) {
    const i = GC.get(n);
    if (i) return i;
  }
  const r = OEe.get(n);
  if (r) return r;
  const a = A8r(n, t);
  OEe.set(n, a);
  try {
    const i = await a;
    if (i && (t == null ? void 0 : t.allowVideoOriginal) === !1) for (GC.delete(n), GC.set(n, i); GC.size > _8r;) {
      const o = GC.keys().next().value;
      if (!o) break;
      GC.delete(o);
    }
    return i;
  } finally {
    OEe.get(n) === a && OEe.delete(n);
  }
}

async function A8r(e, t) {
  const n = await _5(e);
  if (n) return n;
  const r = (t == null ? void 0 : t.maxDim) ?? 512;
  try {
    const {
      localCacheManager: a
    } = await Ie(async () => {
      const {
        localCacheManager: d
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: d
      };
    }, void 0, import.meta.url);
    await a.ensureRestored();
    const i = a.getAssetManifestMeta(e);
    if (bIt({
      assetId: e,
      mimeType: i == null ? void 0 : i.mimeType,
      fileName: i == null ? void 0 : i.fileName
    })) {
      try {
        const {
          ensureHistoryVideoPreviewThumbnailForAssetId: h
        } = await Ie(async () => {
          const {
            ensureHistoryVideoPreviewThumbnailForAssetId: p
          } = await Promise.resolve().then(() => qh);
          return {
            ensureHistoryVideoPreviewThumbnailForAssetId: p
          };
        }, void 0, import.meta.url);
        await h(e);
      } catch (h) {
        console.warn("[ensureLocalPreviewDisplayUrl] video poster ensure failed:", e, h);
      }
      const d = await _5(e);
      if (d) return d;
      if ((t == null ? void 0 : t.allowVideoOriginal) === !1) return null;
      const u = await a.getConvertFileSrcForAsset(e);
      return u || null;
    }
    let s = null;
    if (a.isAvailable() && a.hasAsset(e) && (i != null && i.fileName)) try {
      const d = await Cpt(e, i.fileName, r);
      if (d) return d;
    } catch (d) {
      s = d;
    }
    const l = await a.getConvertFileSrcForAsset(e);
    if (l) try {
      const d = await E8r(e, l, r);
      if (d) return d;
    } catch (d) {
      console.warn("[ensureLocalPreviewDisplayUrl] convertFileSrc 缩略图失败:", e, d);
    }
    if (a.isAvailable() && a.hasAsset(e) && (i != null && i.fileName)) {
      const d = i.fileName;
      (async () => {
        try {
          await new Promise(u => setTimeout(u, 800)), await Cpt(e, d, r);
        } catch {}
      })();
    }
    return s && console.warn("[ensureLocalPreviewDisplayUrl] Rust preview 失败且无原图可回退:", e, s), null;
  } catch {}
  return null;
}

const BEe = new Map();

async function Cpt(e, t, n, r) {
  const i = `${String(r || "").trim() || `preview_${e}`}\0${t}\0${n}`,
    o = BEe.get(i);
  if (o) return o;
  const s = xD(() => S8r(e, t, n, r));
  BEe.set(i, s);
  try {
    return await s;
  } finally {
    BEe.get(i) === s && BEe.delete(i);
  }
}

async function S8r(e, t, n, r) {
  var u;
  const {
    localCacheManager: a,
    ensureCacheRootReadyForWrite: i
  } = await Ie(async () => {
    const {
      localCacheManager: h,
      ensureCacheRootReadyForWrite: p
    } = await Promise.resolve().then(() => Ha);
    return {
      localCacheManager: h,
      ensureCacheRootReadyForWrite: p
    };
  }, void 0, import.meta.url);
  await i();
  const o = (u = a.getDirectoryPathTauri()) == null ? void 0 : u.trim();
  if (!o || !a.isAvailable()) return null;
  const s = String(r || "").trim() || `preview_${e}`;
  if (a.hasAsset(s)) {
    const h = await a.getConvertFileSrcForAsset(s);
    if (h) return h;
  }
  const {
      invoke: l
    } = await Ie(async () => {
      const {
        invoke: h
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: h
      };
    }, void 0, import.meta.url),
    d = await l("write_local_asset_image_preview", {
      args: {
        cacheRoot: o,
        sourceRelativePath: t,
        previewAssetId: s,
        maxDim: n
      }
    });
  return d != null && d.relativePath ? (await a.registerExistingAsset({
    assetId: d.assetId || s,
    relativePath: d.relativePath,
    mimeType: d.mimeType || "image/jpeg",
    size: d.size,
    absolutePath: d.absolutePath
  }), (await a.getConvertFileSrcForAsset(s)) || (await _5(e))) : null;
}

async function I8r(e, t = 1536) {
  var r, a;
  const n = String(e || "").trim();
  if (!n || !ei()) return null;
  try {
    const {
      localCacheManager: i,
      ensureCacheRootReadyForWrite: o
    } = await Ie(async () => {
      const {
        localCacheManager: f,
        ensureCacheRootReadyForWrite: y
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: f,
        ensureCacheRootReadyForWrite: y
      };
    }, void 0, import.meta.url);
    if (await o(), !i.isAvailable() || !i.hasAsset(n)) return null;
    const s = i.getAssetManifestMeta(n),
      l = String((s == null ? void 0 : s.fileName) || "").trim().replace(/\\/g, "/");
    if (!l) return null;
    const d = `api_ref_${n}`,
      u = Math.max(256, Math.min(2048, Math.round(t) || 1536)),
      h = ((r = i.getAssetManifestMeta(d)) == null ? void 0 : r.size) ?? 0;
    if (!(h > 0 && h < 3 * 1024 * 1024) && !(await Cpt(n, l, u, d))) return null;
    const p = await i.readAsset(d);
    return !((a = p == null ? void 0 : p.blob) != null && a.size) || p.blob.size > 6 * 1024 * 1024 ? null : await new Promise(f => {
      const y = new FileReader();
      y.onload = () => f(typeof y.result == "string" ? y.result : null), y.onerror = () => f(null), y.readAsDataURL(p.blob);
    });
  } catch (i) {
    return console.warn("[encodeLocalImageAssetAsApiDataUrl] failed:", n, i), null;
  }
}

const FEe = new Map();

async function C8r(e, t, n = 512) {
  const r = String(e || "").trim(),
    a = String(t || "").trim().replace(/\\/g, "/");
  if (!r || !a) return null;
  const i = await _5(r);
  if (i) return i;
  const o = `${r}\0${a}\0${n}`,
    s = FEe.get(o);
  if (s) return s;
  const l = xD(async () => {
    var f;
    const {
      localCacheManager: d,
      ensureCacheRootReadyForWrite: u
    } = await Ie(async () => {
      const {
        localCacheManager: y,
        ensureCacheRootReadyForWrite: b
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: y,
        ensureCacheRootReadyForWrite: b
      };
    }, void 0, import.meta.url);
    await u();
    const h = (f = d.getDirectoryPathTauri()) == null ? void 0 : f.trim();
    if (!h || !d.isAvailable()) return null;
    const p = await _5(r);
    if (p) return p;
    const m = `preview_${r}`;
    try {
      const {
          invoke: y
        } = await Ie(async () => {
          const {
            invoke: v
          } = await Promise.resolve().then(() => sd);
          return {
            invoke: v
          };
        }, void 0, import.meta.url),
        b = await y("write_local_asset_video_preview", {
          args: {
            cacheRoot: h,
            sourceRelativePath: a,
            previewAssetId: m,
            maxDim: n
          }
        });
      return b != null && b.relativePath ? (await d.registerExistingAsset({
        assetId: b.assetId || m,
        relativePath: b.relativePath,
        mimeType: b.mimeType || "image/jpeg",
        size: b.size,
        absolutePath: b.absolutePath
      }), (await d.getConvertFileSrcForAsset(m)) || (await _5(r))) : null;
    } catch (y) {
      const b = String((y == null ? void 0 : y.message) || y || ""),
        v = await _5(r);
      return v || (/not allowed|Command not found|未找到 ffmpeg/i.test(b) ? console.warn("[writeLocalAssetVideoPreviewViaRust] unavailable (请确认 C:\\ffmpeg\\ffmpeg.exe 或 PATH):", r, b) : console.warn("[writeLocalAssetVideoPreviewViaRust] failed:", r, y), null);
    }
  });
  FEe.set(o, l);
  try {
    return await l;
  } finally {
    FEe.get(o) === l && FEe.delete(o);
  }
}

async function E8r(e, t, n) {
  const {
      createThumbnailForAi: r
    } = await Ie(async () => {
      const {
        createThumbnailForAi: o
      } = await Promise.resolve().then(() => No);
      return {
        createThumbnailForAi: o
      };
    }, void 0, import.meta.url),
    a = await xD(async () => {
      let o = t,
        s;
      try {
        if (/^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(t) || t.startsWith("asset:")) {
          const u = await fetch(t);
          if (!u.ok) return null;
          const h = await u.blob();
          if (!h.size || h.type && !h.type.startsWith("image/") && h.type !== "application/octet-stream") return null;
          o = URL.createObjectURL(h), s = () => URL.revokeObjectURL(o);
        }
        const {
          url: l
        } = await r(o, n);
        if (!l) return null;
        const d = await (await fetch(l)).blob();
        return d.size ? d : null;
      } finally {
        s == null || s();
      }
    });
  if (!a) return null;
  const {
    persistHistoryListThumbnailLocal: i
  } = await Ie(async () => {
    const {
      persistHistoryListThumbnailLocal: o
    } = await Promise.resolve().then(() => ii);
    return {
      persistHistoryListThumbnailLocal: o
    };
  }, void 0, import.meta.url);
  return await i(e, a, {
    forceReplace: !1
  }), await _5(e);
}

async function vIt(e, t) {
  var r;
  const n = String(e || "").trim();
  if (!n) return null;
  try {
    const {
      localCacheManager: a
    } = await Ie(async () => {
      const {
        localCacheManager: h
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: h
      };
    }, void 0, import.meta.url);
    await a.ensureRestored();
    const i = a.isAvailable() && a.hasAsset(n) ? await a.acquireAssetUrl(n) : null,
      o = (i == null ? void 0 : i.url) || (await F$(n));
    if (!o || nr(o)) return i == null || i.release(), null;
    const {
      registerDisplayUrlAssetId: s
    } = await Ie(async () => {
      const {
        registerDisplayUrlAssetId: h
      } = await Promise.resolve().then(() => No);
      return {
        registerDisplayUrlAssetId: h
      };
    }, void 0, import.meta.url);
    s(o, n);
    let l = z9e(n, o, null);
    if (!l) {
      const h = a.getAssetManifestMeta(n);
      ((r = h == null ? void 0 : h.mimeType) != null && r.startsWith("video/") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test((h == null ? void 0 : h.fileName) || "")) && (l = !0);
    }
    let d = (await e5e(n, {
      maxDim: (t == null ? void 0 : t.fallbackCreateThumbMax) ?? 256,
      allowVideoOriginal: !1
    })) || "";
    !d && !l && (t != null && t.allowOriginalAsDisplay) && (d = o), d.startsWith("blob:") && s(d, n);
    let u = !1;
    return {
      originalUrl: o,
      displayUrl: d,
      release() {
        u || (u = !0, i == null || i.release(), d !== o && d.startsWith("blob:") && Ie(async () => {
          const {
            isManagedLocalObjectUrl: h
          } = await Promise.resolve().then(() => eU);
          return {
            isManagedLocalObjectUrl: h
          };
        }, void 0, import.meta.url).then(({
          isManagedLocalObjectUrl: h
        }) => {
          h(d) || URL.revokeObjectURL(d);
        }));
      }
    };
  } catch {
    return null;
  }
}

async function T8r(e, t) {
  var r, a;
  const n = String(e || "").trim();
  if (!n) return null;
  try {
    const {
      localCacheManager: i
    } = await Ie(async () => {
      const {
        localCacheManager: p
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: p
      };
    }, void 0, import.meta.url);
    await i.ensureRestored();
    const {
        registerDisplayUrlAssetId: o
      } = await Ie(async () => {
        const {
          registerDisplayUrlAssetId: p
        } = await Promise.resolve().then(() => No);
        return {
          registerDisplayUrlAssetId: p
        };
      }, void 0, import.meta.url),
      s = (await e5e(n, {
        maxDim: (t == null ? void 0 : t.fallbackCreateThumbMax) ?? 256,
        allowVideoOriginal: !0
      })) || "";
    if (!i.isAvailable() || !i.hasAsset(n)) {
      if (ei() && (z9e(n, "", null) || /\.(mp4|webm|mov|m4v)(_|$)/i.test(n) || /(?:^|_)(?:vidu_|huya_video|video)/i.test(n))) return s ? {
        originalUrl: "",
        displayUrl: s
      } : null;
      const p = await _D(n);
      if (!(p != null && p.size)) return s ? {
        originalUrl: "",
        displayUrl: s
      } : null;
      const m = URL.createObjectURL(p);
      o(m, n);
      const f = z9e(n, m, p);
      return s ? (s.startsWith("blob:") && o(s, n), {
        originalUrl: m,
        displayUrl: s
      }) : f || t != null && t.allowOriginalAsDisplay ? {
        originalUrl: m,
        displayUrl: m
      } : {
        originalUrl: m,
        displayUrl: ""
      };
    }
    const l = await i.readAssetAsUrl(n);
    if (!l) return s ? {
      originalUrl: "",
      displayUrl: s
    } : null;
    if (nr(l)) return null;
    o(l, n);
    let d = !1;
    const u = i.getAssetManifestMeta(n);
    if ((r = u == null ? void 0 : u.mimeType) != null && r.startsWith("video/")) d = !0;else if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test((u == null ? void 0 : u.fileName) || "") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(l)) d = !0;else if (l.startsWith("blob:")) {
      const p = (a = await i.readAsset(n)) == null ? void 0 : a.blob;
      d = z9e(n, l, p ?? null);
    }
    let h = s;
    return (!h && !d && (t != null && t.allowOriginalAsDisplay) || !h && d && (t != null && t.allowOriginalAsDisplay) && !ei()) && (h = l), h.startsWith("blob:") && o(h, n), {
      originalUrl: l,
      displayUrl: h
    };
  } catch {
    return null;
  }
}

const Ui = Object.freeze(Object.defineProperty({
    __proto__: null,
    LOCAL_CACHE_ASSET_SETTING_KEY: dg,
    encodeLocalImageAssetAsApiDataUrl: I8r,
    ensureLocalPreviewAfterRustDownload: x8r,
    ensureLocalPreviewDisplayUrl: e5e,
    historyItemHasLocalOriginalAsset: b5n,
    invalidateLocalPreviewDisplayUrlCache: w5n,
    isLocalAssetVideoForPreview: bIt,
    isLocalCacheOriginalBlobUrl: Fwe,
    isSizeLikelyPreviewNotOriginal: XDe,
    isSplitCropAssetId: f5n,
    isThumbnailAssetId: bY,
    pickHistoryPrimaryAssetId: sM,
    probeBlobImageDimensions: Pue,
    probeLocalOriginalImageDimensions: fIt,
    readAssetStoreOriginalAsUrl: yIt,
    readLocalCacheManifestAssetAsUrl: lM,
    readLocalOriginalAssetAsUrl: F$,
    readLocalOriginalAssetBlob: _D,
    readLocalPreviewThumbnailAsUrl: _5,
    readPreviewWindowAssetOriginalUrl: Vge,
    recoverLocalPreviewDisplayUrlAfterError: k8r,
    resolveInputImageNodeLightboxUrl: Ipt,
    resolveLocalBlobByRemoteUrl: v5n,
    resolveLocalCachedDisplayUrlLease: vIt,
    resolveLocalCachedDisplayUrls: T8r,
    writeLocalAssetVideoPreviewViaRust: C8r
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  AHt = new WeakMap();

function bP(e) {
  const t = AHt.get(e);
  if (t) return t;
  const n = new Map();
  let r = n;
  for (const i of e) {
    const o = i.id;
    n.has(o) && r === n && (r = new Map(n)), r.has(o) || r.set(o, i), n.set(o, i);
  }
  const a = {
    nodes: e,
    byId: n,
    firstById: r
  };
  return AHt.set(e, a), a;
}

function wIt(e, t) {
  return (t == null ? void 0 : t.nodes) === e ? t.byId : bP(e).byId;
}

function M8r(e, t) {
  const n = bP(e).firstById.get(t);
  return n ? {
    x: n.x,
    y: n.y,
    width: n.width > 0 ? n.width : 260,
    height: n.height > 0 ? n.height : 260
  } : null;
}

const SHt = new WeakMap(),
  P8r = Object.freeze([]);

function mv(e, t) {
  let n = SHt.get(e);
  if (!n) {
    const r = new Map();
    for (const a of e) {
      const i = r.get(a.to);
      i ? i.push(a) : r.set(a.to, [a]);
    }
    n = r, SHt.set(e, n);
  }
  return n.get(t) ?? P8r;
}

function R8r(e, t, n) {
  if (e === t) return !0;
  const r = mv(e, n),
    a = mv(t, n);
  return r.length === a.length && r.every((i, o) => {
    var u, h;
    const s = a[o];
    if (i === s) return !0;
    if (i.id !== s.id || i.from !== s.from || (i.inputType || "default") !== (s.inputType || "default")) return !1;
    const l = (u = i.fromGroupNodeIds) != null && u.length ? i.fromGroupNodeIds : [i.from],
      d = (h = s.fromGroupNodeIds) != null && h.length ? s.fromGroupNodeIds : [s.from];
    return l.length === d.length && l.every((p, m) => p === d[m]);
  });
}

const N8r = new Set(["_ossRemoteUrl", "_ossThumbnailUrl", "originalUrl"]),
  zwe = (() => {
    const e = typeof globalThis < "u" ? globalThis.scheduler : void 0;
    return e && typeof e.yield == "function" ? () => e.yield() : typeof MessageChannel == "function" ? () => new Promise(t => {
      const n = new MessageChannel();
      n.port1.onmessage = () => {
        n.port1.close(), t();
      }, n.port2.postMessage(0);
    }) : () => new Promise(t => setTimeout(t, 0));
  })();

function x5n(e) {
  if (e.length < 5) return !1;
  const t = e.trim();
  return t.startsWith("data:") ? !1 : t.startsWith("http://") || t.startsWith("https://") || t.startsWith("blob:") || t.startsWith("file://") || /^[a-zA-Z]:[\\/]/.test(t) || t.startsWith("/") && /\.(jpg|jpeg|png|gif|webp|mp4|webm|mov|avi|mp3|wav|ogg|m4a|aac)$/i.test(t);
}

function j8r(e, t = 2e5) {
  const n = [e],
    r = new WeakSet();
  let a = 0;
  for (; n.length > 0 && a < t;) {
    a++;
    const i = n.pop();
    if (i == null) continue;
    const o = typeof i;
    if (o === "string") {
      if (x5n(i)) return !0;
      continue;
    }
    if (o !== "object") continue;
    const s = i;
    if (!r.has(s)) if (r.add(s), Array.isArray(s)) for (let l = 0; l < s.length; l++) n.push(s[l]);else for (const l in s) Object.prototype.hasOwnProperty.call(s, l) && n.push(s[l]);
  }
  return !1;
}

const D8r = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="#374151" width="100" height="100"/><text x="50" y="55" font-size="12" fill="#9ca3af" text-anchor="middle" font-family="sans-serif">N/A</text></svg>',
  _5n = "data:image/svg+xml;base64," + btoa(D8r);

function Tu(e) {
  return e ? e === _5n : !1;
}

function Ept(e) {
  try {
    const t = new URL(e).hostname.toLowerCase();
    return t.includes("art.huya.info") || t.includes("copilot.huya.info") || t.includes("aliyuncs.com");
  } catch {
    return /art\.huya\.info|copilot\.huya\.info|aliyuncs\.com/i.test(e);
  }
}

const IHt = (e, t = 2048, n = .85) => new Promise(r => {
    if (e.startsWith("data:image/jpeg") && (e.length - e.indexOf(",") - 1) * 3 / 4 / 1024 / 1024 < .5) {
      r(e);
      return;
    }
    const a = new Image();
    a.onload = () => {
      try {
        const i = document.createElement("canvas"),
          o = i.getContext("2d", {
            willReadFrequently: !1,
            alpha: !1
          });
        if (!o) {
          r(e);
          return;
        }
        let s = a.width,
          l = a.height;
        if (s > t || l > t) {
          const u = t / Math.max(s, l);
          s = Math.floor(s * u), l = Math.floor(l * u);
        }
        i.width = s, i.height = l, o.drawImage(a, 0, 0, s, l);
        const d = i.toDataURL("image/jpeg", n);
        i.width = 0, i.height = 0, r(d);
      } catch (i) {
        console.warn("[compressImage] 压缩失败:", i), r(e);
      }
    }, a.onerror = () => r(e), a.src = e;
  }),
  L8r = async (e, t = !0, n, r) => {
    const a = (r == null ? void 0 : r.onFailedBehavior) ?? "keep",
      i = (r == null ? void 0 : r.silentFail) ?? !1,
      o = (r == null ? void 0 : r.preserveOriginalFields) ?? [],
      s = (r == null ? void 0 : r._currentFieldName) ?? "",
      l = (r == null ? void 0 : r.timeoutMs) ?? 2500,
      d = o.some(h => s === h || s.endsWith(`_${h}`) || s.includes(`[${h}]`)),
      u = t && !d;
    if (d && s && console.log(`[urlToDataURL] 保留原图不压缩，字段: ${s}`), r != null && r.skipOssHttps && Ept(e)) return e;
    if (!e || e.startsWith("data:")) {
      if (u && e.startsWith("data:image/") && !e.startsWith("data:image/jpeg")) try {
        return await IHt(e);
      } catch {
        return e;
      }
      return e;
    }
    if (r != null && r.localCacheFallback && !e.startsWith("blob:")) try {
      const h = await r.localCacheFallback(e);
      if (typeof h == "string" && h.startsWith("data:")) return h;
    } catch {}
    try {
      const h = new Promise((y, b) => {
          setTimeout(() => b(new Error("转换超时")), l);
        }),
        m = (async () => {
          if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window) && (e.startsWith("https://") || e.startsWith("http://")) && Ept(e)) try {
            const {
              downloadWithFallback: v
            } = await Ie(async () => {
              const {
                downloadWithFallback: _
              } = await Promise.resolve().then(() => El);
              return {
                downloadWithFallback: _
              };
            }, void 0, import.meta.url);
            return await v(e, Math.max(l, 3e4));
          } catch {}
          const b = await fetch(e);
          if (!b.ok) throw new Error(`HTTP ${b.status}`);
          return b.blob();
        })().then(y => new Promise((b, v) => {
          const _ = new FileReader();
          _.onloadend = () => {
            const w = _.result;
            u && w.startsWith("data:image/") ? IHt(w).then(k => {
              b(k);
            }).catch(() => b(w)) : b(w);
          }, _.onerror = () => v(new Error("FileReader 失败")), _.readAsDataURL(y);
        }));
      return await Promise.race([m, h]);
    } catch (h) {
      if (i || console.warn("[urlToDataURL] 转换失败:", e.substring(0, 60) + "...", h), n && n.push(e), r != null && r.localCacheFallback) try {
        const p = await r.localCacheFallback(e);
        if (typeof p == "string" && p.startsWith("data:")) return p;
      } catch {}
      return a === "placeholder" ? _5n : e;
    }
  },
  wS = async (e, t = 0, n, r = {
    count: 0,
    current: 0
  }, a, i) => {
    if (t > 10 || e == null || t === 0 && !j8r(e)) return e;
    if (typeof e == "string") {
      const o = e.trim();
      return (o.startsWith("http://") || o.startsWith("https://") || o.startsWith("blob:") || o.match(/^[a-zA-Z]:[\\\/]/) || o.startsWith("file:///") || o.startsWith("file://") || o.startsWith("/") && o.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm|mov|avi|mp3|wav|ogg|m4a|aac)$/i)) && !o.startsWith("data:") ? (r.current++, n && r.count > 0 && n(r.current / r.count * 100, `正在转换 ${r.current}/${r.count}`, "export"), await L8r(o, !0, a, i)) : e;
    }
    if (Array.isArray(e)) {
      const o = [],
        l = (i == null ? void 0 : i._currentFieldName) ?? "";
      for (let d = 0; d < e.length; d += 20) {
        const u = e.slice(d, d + 20),
          h = await Promise.all(u.map((p, m) => {
            const f = {
              ...i,
              _currentFieldName: l
            };
            return wS(p, t + 1, n, r, a, f);
          }));
        o.push(...h), d % 80 === 0 && d > 0 && (await zwe());
      }
      return o;
    }
    if (typeof e == "object") {
      const o = {},
        s = Object.entries(e),
        l = 30;
      for (let d = 0; d < s.length; d += l) {
        const u = s.slice(d, d + l);
        (await Promise.all(u.map(async ([p, m]) => {
          if (N8r.has(p) && typeof m == "string" && (m.startsWith("https://") || m.startsWith("http://")) && Ept(m)) return [p, m];
          const f = {
              ...i,
              _currentFieldName: p
            },
            y = await wS(m, t + 1, n, r, a, f);
          return [p, y];
        }))).forEach(([p, m]) => {
          o[p] = m;
        }), d % (l * 4) === 0 && d > 0 && (await zwe());
      }
      return o;
    }
    return e;
  },
  cM = e => {
    let t = 0;
    const n = [e],
      r = new WeakSet();
    let a = 0;
    const i = 2e5;
    for (; n.length > 0 && a < i;) {
      a++;
      const o = n.pop();
      if (o == null) continue;
      const s = typeof o;
      if (s === "string") {
        x5n(o) && t++;
        continue;
      }
      if (s !== "object") continue;
      const l = o;
      if (!r.has(l)) if (r.add(l), Array.isArray(l)) for (let d = 0; d < l.length; d++) n.push(l[d]);else for (const d in l) Object.prototype.hasOwnProperty.call(l, d) && n.push(l[d]);
    }
    return t;
  };

function k5n(e) {
  const t = String(e || "").trim();
  return !t || !/^https?:\/\//i.test(t) ? !1 : /athena-haicong-llm-external\.oss/i.test(t) || /\/haiyi\//i.test(t) && /aliyuncs\.com/i.test(t);
}

const O8r = 96 * 1024;

function xIt() {
  return !1;
}

function DM(e) {
  const t = String(e || "").trim();
  return t ? !!(t.startsWith("data:video") || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(t) || /\/videos\//i.test(t) || vs(t) && /(?:[/\\]|%5[cC])videos(?:[/\\]|%5[cC])/i.test(t)) : !1;
}

function yz(e) {
  const t = String(e || "").trim();
  return !t || DM(t) || zg(t) || vs(t) && !S3(t) ? "" : Af(t) || /\/thumbnails\//i.test(t) || t.startsWith("data:image") && t.length <= O8r ? t : t.startsWith("data:") ? "" : t.startsWith("blob:") ? Nd(t) ? t : "" : vs(t) ? "" : /^https?:\/\//i.test(t) ? /\/thumbnails\//i.test(t) ? t : ei() ? "" : /\/images\//i.test(t) ? t.replace(/\/images\//i, "/thumbnails/") : t : "";
}

function gd(e) {
  const t = String(e || "").trim();
  return !t || k5n(t) ? "" : ei() ? yz(t) : DM(t) || zg(t) ? "" : t.startsWith("blob:") ? Nd(t) ? t : "" : t;
}

function Uwe(e) {
  const t = String(e || "").trim();
  return !t || k5n(t) || DM(t) ? "" : t.startsWith("blob:") ? Nd(t) ? t : "" : t.startsWith("data:image/gif") || t.startsWith("data:image/webp") ? t : t.startsWith("data:") || vs(t) && !S3(t) ? "" : t;
}

const CHt = Object.freeze(Object.defineProperty({
    __proto__: null,
    acceptAnimatedImageCanvasDisplayUrl: Uwe,
    acceptCanvasLightShellDisplayUrl: gd,
    isCanvasLightShellVideoFileUrl: DM,
    pickSafeCanvasLightShellUrl: yz,
    shouldAllowVideoFileOnCanvasLightShell: xIt
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  A5n = `(function(){"use strict";function w(n){return new Promise((e,s)=>{const t=new FileReader;t.onloadend=()=>e(t.result),t.onerror=()=>s(t.error),t.readAsDataURL(n)})}function C(n,e,s){try{const t=n.getImageData(0,0,e,s).data;for(let o=3;o<t.length;o+=16)if(t[o]<255)return!0}catch{return!1}return!1}function D(n,e){if(String(e.type||"").toLowerCase().includes("png"))return!0;const s=String(n||"").toLowerCase();return s.startsWith("data:image/png")||/\\.png(?:$|\\?|#)/i.test(s)}async function b(n,e,s,t,o){if(D(s,t)||C(e,n.width,n.height))return n.convertToBlob({type:"image/png"});let a=await n.convertToBlob({type:"image/webp",quality:o});return a.type.includes("webp")||(a=await n.convertToBlob({type:"image/jpeg",quality:o})),a}async function y(n,e,s){if(typeof createImageBitmap>"u"||typeof OffscreenCanvas>"u")throw new Error("createImageBitmap or OffscreenCanvas not supported in this worker");const t=await fetch(n);if(!t.ok)throw new Error("Failed to fetch image data");const o=await t.blob(),r=await createImageBitmap(o);try{let a=r.width,i=r.height;if(a>e||i>e){const h=Math.min(e/a,e/i);a=Math.round(a*h),i=Math.round(i*h)}const l=new OffscreenCanvas(a,i),c=l.getContext("2d");if(!c)throw new Error("Failed to get OffscreenCanvas context");c.imageSmoothingEnabled=!0,c.imageSmoothingQuality="high",c.drawImage(r,0,0,a,i);const u=await b(l,c,n,o,s);return w(u)}finally{r.close()}}async function I(n,e,s,t,o){if(typeof createImageBitmap>"u"||typeof OffscreenCanvas>"u")throw new Error("createImageBitmap or OffscreenCanvas not supported in this worker");const r=await fetch(n);if(!r.ok)throw new Error("Failed to fetch image data");const a=await r.blob(),i=await createImageBitmap(a);try{const l=i.width,c=i.height,u=async(g,k)=>{let d=i.width,f=i.height;if(d>g||f>g){const B=Math.min(g/d,g/f);d=Math.round(d*B),f=Math.round(f*B)}const M=new OffscreenCanvas(d,f),p=M.getContext("2d");if(!p)throw new Error("Failed to get OffscreenCanvas context");p.imageSmoothingEnabled=!0,p.imageSmoothingQuality="high",p.drawImage(i,0,0,d,f);const O=await b(M,p,n,a,k);return w(O)},[h,m]=await Promise.all([u(e,s),u(t,o)]);return{thumbData:h,previewData:m,sourceWidth:l,sourceHeight:c}}finally{i.close()}}async function E(n){var s;const e=n.data;try{if(e.type==="generate-dual"){const{id:t,imageData:o,thumbSize:r,thumbQuality:a,previewSize:i,previewQuality:l}=e,{thumbData:c,previewData:u,sourceWidth:h,sourceHeight:m}=await I(o,r,a,i,l),g={type:"dual-result",id:t,thumbData:c,previewData:u,sourceWidth:h,sourceHeight:m};self.postMessage(g)}else if(e.type==="generate"){const t=await y(e.imageData,e.maxSize,e.quality),o={type:"result",id:e.id,thumbnailData:t};self.postMessage(o)}else if(e.type==="batch-generate"&&e.batch){const t=[];for(const r of e.batch)try{const a=await y(r.imageData,r.maxSize,r.quality);t.push({id:r.id,thumbnailData:a})}catch(a){t.push({id:r.id,error:a instanceof Error?a.message:String(a)})}const o={type:"batch-result",id:e.id,batch:t};self.postMessage(o)}}catch(t){const o=t instanceof Error?t.message:String(t);if(e.type==="generate-dual"){const r={type:"dual-result",id:e.id,error:o};self.postMessage(r)}else if(e.type==="generate"){const r={type:"result",id:e.id,thumbnailData:"",error:o};self.postMessage(r)}else{const r={type:"batch-result",id:e.id,batch:((s=e.batch)==null?void 0:s.map(a=>({id:a.id,error:o})))??[]};self.postMessage(r)}}}let v=Promise.resolve();self.onmessage=n=>{v=v.then(()=>E(n)).catch(()=>{})}})();
`,
  EHt = typeof self < "u" && self.Blob && new Blob([A5n], {
    type: "text/javascript;charset=utf-8"
  });

function S5n(e) {
  let t;
  try {
    if (t = EHt && (self.URL || self.webkitURL).createObjectURL(EHt), !t) throw "";
    const n = new Worker(t, {
      name: e == null ? void 0 : e.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), n;
  } catch {
    return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(A5n), {
      name: e == null ? void 0 : e.name
    });
  } finally {
    t && (self.URL || self.webkitURL).revokeObjectURL(t);
  }
}

const _It = 1600,
  I5n = .82,
  C5n = 2,
  B8r = 96,
  F8r = 64 * 1024 * 1024;

let Hge = 0;

const E5n = 15e4,
  ere = new Map(),
  LC = new Map(),
  Tpt = [];

let Aae = 0,
  z8r = 0,
  Xpe = null;

function U8r() {
  return Xpe || (Xpe = new S5n(), Xpe.onmessage = e => {
    const t = e.data;
    if ((t == null ? void 0 : t.type) !== "result" || !t.id) return;
    const n = ere.get(t.id);
    n && (ere.delete(t.id), Aae -= 1, T5n(), t.error ? n.reject(new Error(t.error)) : n.resolve(t.thumbnailData ?? ""));
  }, Xpe.onerror = () => {
    const e = [...ere.values()];
    ere.clear(), Aae = 0;
    for (const t of e) t.reject(new Error("display image decode worker error"));
  }), Xpe;
}

function T5n() {
  for (; Aae < C5n && Tpt.length > 0;) {
    const e = Tpt.shift();
    e && e();
  }
}

function M5n(e) {
  const t = LC.get(e);
  if (t !== void 0) return LC.delete(e), LC.set(e, t), t;
}

function $8r(e, t) {
  if (!t) return;
  const n = LC.get(e);
  if (n !== t) for (n !== void 0 && (Hge -= n.length), LC.set(e, t), Hge += t.length; (LC.size > B8r || Hge > F8r) && LC.size > 0;) {
    const r = LC.keys().next().value;
    if (r === void 0) break;
    const a = LC.get(r);
    a !== void 0 && (Hge -= a.length), LC.delete(r);
  }
}

function kIt(e, t = _It, n = I5n) {
  const r = String(e || "").trim();
  if (!r) return Promise.reject(new Error("empty image source"));
  const a = `${t}|${r}`,
    i = M5n(a);
  return i ? Promise.resolve(i) : new Promise((o, s) => {
    const l = () => {
      Aae += 1;
      const d = `disp-${++z8r}`;
      ere.set(d, {
        resolve: u => {
          $8r(a, u), o(u);
        },
        reject: s
      });
      try {
        U8r().postMessage({
          type: "generate",
          id: d,
          imageData: r,
          maxSize: t,
          quality: n
        });
      } catch (u) {
        ere.delete(d), Aae -= 1, T5n(), s(u instanceof Error ? u : new Error(String(u)));
      }
    };
    Aae >= C5n ? Tpt.push(l) : l();
  });
}

function G8r() {
  LC.clear(), Hge = 0;
}

function P5n(e, t = _It) {
  const n = String(e || "").trim();
  return n ? M5n(`${t}|${n}`) ?? null : null;
}

function AIt(e) {
  const t = String(e || "").trim();
  return t.startsWith("data:") && t.length > E5n;
}

function SIt(e, t = _It) {
  const [n, r] = g.useState({
    data: null,
    failed: !1
  });
  return g.useEffect(() => {
    const a = String(e || "").trim();
    if (!a) {
      r({
        data: null,
        failed: !1
      });
      return;
    }
    let i = !1;
    const o = P5n(a, t);
    if (o) {
      r({
        data: o,
        failed: !1
      });
      return;
    }
    return r({
      data: null,
      failed: !1
    }), kIt(a, t, I5n).then(s => {
      i || r({
        data: s,
        failed: !1
      });
    }, () => {
      i || r({
        data: null,
        failed: !0
      });
    }), () => {
      i = !0;
    };
  }, [e, t]), n;
}

const V8r = Object.freeze(Object.defineProperty({
    __proto__: null,
    HEAVY_DATA_URL_LENGTH: E5n,
    clearDisplayDecodeCache: G8r,
    decodeDisplayImageUrl: kIt,
    isHeavyDataUrl: AIt,
    peekDisplayDecodeCache: P5n,
    useDecodedDisplaySrc: SIt
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  H8r = 3 * 1024 * 1024,
  IIt = new Set();

function U9e(e) {
  const t = String(e || "").trim();
  t.startsWith("blob:") && IIt.add(t);
}

function R5n(e) {
  const t = String(e || "").trim();
  return t.startsWith("blob:") && IIt.has(t);
}

function W8r(e) {
  var t, n;
  return !!((n = (t = e.type) == null ? void 0 : t.startsWith) != null && n.call(t, "image/") || /\.(jpe?g|png|gif|webp|bmp)$/i.test(e.name || ""));
}

async function q8r(e, t, n) {
  const r = URL.createObjectURL(e);
  try {
    const a = await kIt(r, t, n),
      i = await fetch(a).then(o => o.blob());
    return !i || i.size <= 0 ? null : URL.createObjectURL(i);
  } catch (a) {
    return console.warn("[instantCanvasPreview] worker preview decode failed:", a), null;
  } finally {
    URL.revokeObjectURL(r);
  }
}

function K8r(e) {
  var t, n;
  return !!((n = (t = e.type) == null ? void 0 : t.startsWith) != null && n.call(t, "video/") || /\.(mp4|webm|ogg|mov|m4v|mkv|avi|flv)$/i.test(e.name || ""));
}

async function CIt(e, t) {
  if (!K8r(e)) return null;
  const n = URL.createObjectURL(e);
  try {
    const {
        captureVideoPosterFrame: r
      } = await Ie(async () => {
        const {
          captureVideoPosterFrame: s
        } = await Promise.resolve().then(() => pg);
        return {
          captureVideoPosterFrame: s
        };
      }, void 0, import.meta.url),
      a = await r(n);
    if (!(a != null && a.dataUrl)) return null;
    const i = await (await fetch(a.dataUrl)).blob();
    if (!(i != null && i.size)) return null;
    const o = URL.createObjectURL(i);
    return Il(o, t), U9e(o), {
      url: o,
      width: a.width,
      height: a.height
    };
  } catch (r) {
    return console.warn("[instantCanvasPreview] video poster capture failed:", r), null;
  } finally {
    URL.revokeObjectURL(n);
  }
}

async function nHe(e, t, n = wm) {
  if (!W8r(e)) return null;
  try {
    const {
      detectAnimatedImageBlob: r,
      looksLikeGifFile: a
    } = await Ie(async () => {
      const {
        detectAnimatedImageBlob: l,
        looksLikeGifFile: d
      } = await Promise.resolve().then(() => iCe);
      return {
        detectAnimatedImageBlob: l,
        looksLikeGifFile: d
      };
    }, void 0, import.meta.url);
    if (a(e) || (await r(e, e.name))) {
      const l = URL.createObjectURL(e);
      return Il(l, t), U9e(l), l;
    }
    if (e.size > H8r) {
      const l = await q8r(e, n, $k);
      if (l) return Il(l, t), U9e(l), l;
    }
    const o = await i_(e, n, $k);
    if (!o || o.size <= 0) return null;
    const s = URL.createObjectURL(o);
    return Il(s, t), U9e(s), s;
  } catch (r) {
    return console.warn("[instantCanvasPreview] instant preview failed:", r), null;
  }
}

function N5n(e) {
  const t = String(e || "").trim();
  if (t.startsWith("blob:")) {
    IIt.delete(t), UHe(t);
    try {
      URL.revokeObjectURL(t);
    } catch {}
  }
}

function wbe(e, t = 1600) {
  const n = String(e || "").trim();
  n.startsWith("blob:") && window.setTimeout(() => N5n(n), t);
}

const Q8r = Object.freeze(Object.defineProperty({
    __proto__: null,
    createInstantCanvasPreviewUrl: nHe,
    createInstantVideoPosterPreview: CIt,
    isInstantCanvasPreviewUrl: R5n,
    releaseInstantCanvasPreviewUrl: N5n,
    scheduleReleaseInstantCanvasPreviewUrl: wbe
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Y8r = 512,
  $N = new Map();

function $we(e) {
  return String(e || "").trim();
}

function F6(e, t) {
  const n = $we(e),
    r = $we(t);
  if (!(!n || !r || r.startsWith("content_ref:"))) for ($N.delete(n), $N.set(n, r); $N.size > Y8r;) {
    const a = $N.keys().next().value;
    if (!a) break;
    $N.delete(a);
  }
}

function _E(e) {
  return $N.get($we(e)) || "";
}

function Gwe(e, t) {
  const n = $we(e);
  if (!n) return;
  const r = $we(t);
  r && $N.get(n) !== r || $N.delete(n);
}

function X8r() {
  return {
    entries: $N.size
  };
}

const J8r = Object.freeze(Object.defineProperty({
  __proto__: null,
  forgetRememberedCanvasNodeMediaSrc: Gwe,
  getRememberedCanvasNodeMediaSrc: _E,
  getRememberedNodeMediaAudit: X8r,
  rememberCanvasNodeMediaSrc: F6
}, Symbol.toStringTag, {
  value: "Module"
}));

class rHe {
  constructor(t = "") {
    On(this, "prefix");
    this.prefix = t;
  }
  debug(...t) {}
  info(...t) {}
  warn(...t) {
    console.warn(this.prefix, ...t);
  }
  error(...t) {
    console.error(this.prefix, ...t);
  }
  child(t) {
    return new rHe(`${this.prefix}[${t}]`);
  }
}

function t5e(e) {
  return new rHe(`[${e}]`);
}

const Z8r = new rHe("[App]"),
  xet = t5e("ImageOptimizer");

function e6r() {
  try {
    const e = window.__qdmSystemMemoryGB;
    if (typeof e == "number" && e > 0) return e;
  } catch {}
  try {
    const e = navigator.deviceMemory;
    if (typeof e == "number" && e > 0) return e;
  } catch {}
  return 8;
}

const t6r = e => new Promise(t => setTimeout(t, e)),
  kF = {
    SMALL_THRESHOLD: 500 * 1024,
    MEDIUM_THRESHOLD: 2 * 1024 * 1024,
    LARGE_THRESHOLD: 5 * 1024 * 1024,
    ULTRA_THRESHOLD: 10 * 1024 * 1024,
    THUMBNAIL_SIZES: {
      tiny: 128,
      small: 256,
      medium: 512,
      large: 1024
    }
  };

function EIt(e) {
  const t = e.length * .75;
  return t < kF.SMALL_THRESHOLD ? "small" : t < kF.MEDIUM_THRESHOLD ? "medium" : t < kF.LARGE_THRESHOLD ? "large" : t < kF.ULTRA_THRESHOLD ? "4k" : "8k";
}

function j5n(e) {
  return e < .2 ? kF.THUMBNAIL_SIZES.tiny : e < .5 ? kF.THUMBNAIL_SIZES.small : e < 1 ? kF.THUMBNAIL_SIZES.medium : kF.THUMBNAIL_SIZES.large;
}

async function D5n(e, t) {
  const n = e.filter(o => {
    const s = EIt(o.dataUrl);
    return s !== "small" && s !== "8k" && o.dataUrl.startsWith("data:image");
  });
  if (n.length === 0) return;
  const r = e6r(),
    a = Math.max(2, Math.min(8, r >= 16 ? 8 : r >= 8 ? 5 : 3)),
    i = n.slice(0, a);
  xet.debug(`Batch preloading ${i.length}/${n.length} thumbnails...`);
  for (let o = 0; o < i.length; o++) {
    const s = i[o];
    await Wd.storeWithThumbnails(s.nodeId, s.dataUrl).catch(l => xet.warn(`Failed to generate thumbnail for ${s.nodeId}:`, l)), await t6r(120);
  }
  xet.debug("Batch preload completed");
}

const L5n = 250,
  O5n = Number.POSITIVE_INFINITY,
  B5n = 250,
  $9e = 250;

function kc(e, t, n) {
  const r = (n == null ? void 0 : n.longEdge) ?? L5n,
    a = (n == null ? void 0 : n.maxLongEdge) ?? O5n,
    i = (n == null ? void 0 : n.minShortEdge) ?? B5n;
  if (!Number.isFinite(e) || !Number.isFinite(t) || e <= 0 || t <= 0) return {
    width: r,
    height: r
  };
  const o = e / t;
  let s, l;
  o >= 1 ? (l = r, s = Math.round(r * o)) : (s = r, l = Math.round(r / o));
  const d = Math.max(s, l),
    u = Math.min(s, l);
  if (Number.isFinite(a) && d > a) {
    const h = a / d;
    s = Math.round(s * h), l = Math.round(l * h);
  } else if (u < i) {
    const h = i / u;
    s = Math.round(s * h), l = Math.round(l * h);
  }
  if (o < 1 && s < $9e) {
    const h = $9e / s;
    s = $9e, l = Math.round(l * h);
  }
  return {
    width: s,
    height: l
  };
}

function F5n(e, t, n, r) {
  if (!(e > 0) || !(t > 0) || !(n > 0) || !(r > 0)) return Number.POSITIVE_INFINITY;
  const a = n / r;
  return e / t >= a ? e - t * a : t - e / a;
}

function z$(e, t, n, r, a, i) {
  const o = Math.abs(e - n),
    s = Math.abs(t - r);
  return o <= 1 && s <= 1 ? !0 : o > 10 || s > 10 ? !1 : F5n(e, t, a, i) <= 1;
}

function z5n(e, t, n, r) {
  const {
    width: a,
    height: i
  } = kc(n, r);
  let o = !1;
  const s = e.map(l => {
    var h;
    if (l.id !== t) return l;
    Math.abs((l.width || 0) - a), Math.abs((l.height || 0) - i);
    const d = `${n}×${r}`;
    return String(((h = l.settings) == null ? void 0 : h.imageSize) || "").trim() === d && z$(l.width || 0, l.height || 0, a, i, n, r) ? l : (o = !0, {
      ...l,
      width: a,
      height: i,
      settings: {
        ...(l.settings || {}),
        imageSize: d,
        hasCustomSize: void 0
      }
    });
  });
  return o ? s : e;
}

const Rue = Object.freeze(Object.defineProperty({
    __proto__: null,
    INPUT_IMAGE_NODE_DISPLAY_LONG_EDGE: L5n,
    INPUT_IMAGE_NODE_DISPLAY_MAX_LONG_EDGE: O5n,
    INPUT_IMAGE_NODE_DISPLAY_MIN_PORTRAIT_WIDTH: $9e,
    INPUT_IMAGE_NODE_DISPLAY_MIN_SHORT_EDGE: B5n,
    applyInputImageNodeDisplayFitToNodesList: z5n,
    batchPreloadThumbnails: D5n,
    calcInputImageNodeDisplaySize: kc,
    canvasMediaFrameLetterboxPx: F5n,
    detectImageSize: EIt,
    getRecommendedThumbnailSize: j5n,
    isCanvasMediaDisplayFrameSettled: z$
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  n6r = .4,
  U5n = .45,
  r6r = 128,
  a6r = .75,
  i6r = .8,
  $5n = 64,
  o6r = new Set(["text-node", "custom-agent", "script-parse"]);

function G5n(e) {
  return !!(e && o6r.has(e));
}

let THt = 0;

const MHt = new Set();

function PHt(e) {
  const t = Math.max(0, Math.floor(Number(e) || 0));
  if (t !== THt) {
    THt = t;
    try {
      const n = globalThis;
      n.__VISIBLE_NODE_COUNT__ = t, n.window && (n.window.__VISIBLE_NODE_COUNT__ = t);
    } catch {}
  }
}

function V5n(e) {
  return MHt.add(e), () => {
    MHt.delete(e);
  };
}

function s6r(e) {
  return Number.isFinite(e) && e > 0 ? e : 1;
}

function H5n(e, t, n, r) {
  return s6r(e) <= (r ? n : t);
}

function TIt(e, t, n) {
  return H5n(e, n6r, U5n, n);
}

function W5n(e, t, n) {
  return H5n(e, a6r, i6r, n);
}

function aHe(e, t, n) {
  return W5n(e, t, n);
}

function _et(e, t) {
  switch (e) {
    case "gen-image":
    case "gen-video":
    case "input-image":
    case "preview":
    case "video-input":
    case "motion-control":
    case "virtual-try-on":
    case "canvas-node":
      return t ? "#1f1f1f" : "#f4f4f5";
    case "text-node":
    case "novel-input":
      return t ? "#2a2a2a" : "#ffffff";
    case "custom-agent":
      return t ? "#252530" : "#eef0f5";
    case "gen-speech":
    case "gen-music":
      return t ? "#1a2420" : "#ecfdf5";
    case "director-3d":
    case "gen-3d":
    case "three-d-studio":
      return t ? "#1e2430" : "#eef2ff";
    default:
      return t ? "#262626" : "#f4f4f5";
  }
}

function l6r(e, t) {
  return t ? "#3a3a42" : "#b8b8c0";
}

function c6r(e, t, n) {
  if (!((n == null ? void 0 : n.overviewActive) ?? TIt(1)) || n != null && n.keepGenPromptInteractive && (t.type === "gen-image" || t.type === "gen-video") || G5n(t.type)) return !1;
  const a = t.settings;
  return !(a != null && a.editImageToolActive || a != null && a.eraserToolActive || a != null && a.textEditToolActive || a != null && a.previewPuzzleChromeOpen || a != null && a._expandSourceHidden || t._expandPending || (a == null ? void 0 : a._expandPending) === !0 || n != null && n.focusEditActiveSourceNodeId && n.nodeId && n.focusEditActiveSourceNodeId === n.nodeId);
}

const Sae = 256,
  vY = 512;

let JDe = !1;

function MIt() {
  JDe = !0;
}

const PIt = 1.3,
  d6r = 100,
  u6r = PIt;

function aZ(e, t) {
  var a;
  const n = Number.isFinite(e) && e > 0 ? e : 1;
  let r = j5n(n);
  n <= PIt && (r = Math.min(r, Sae));
  try {
    const i = globalThis,
      o = i.__NODE_COUNT__ ?? ((a = i.window) == null ? void 0 : a.__NODE_COUNT__);
    typeof o == "number" && o >= d6r && n < u6r && (r = Math.min(r, Sae));
  } catch {}
  return aHe(n, void 0, t) ? r = Math.min(r, $5n) : TIt(n) && (r = Math.min(r, r6r)), Math.min(r, vY);
}

function q5n(e, t, n, r, a) {
  const i = aZ(e),
    o = Number(t),
    s = Number(n);
  if ((!Number.isFinite(o) || o <= 0) && (!Number.isFinite(s) || s <= 0) || i <= $5n) return i;
  const l = typeof r == "number" ? r : typeof globalThis.devicePixelRatio == "number" ? globalThis.devicePixelRatio : 1,
    d = Math.max(1, Math.min(2, Number(l) || 1)),
    u = Number.isFinite(e) && e > 0 ? e : 1,
    h = Math.max(Number.isFinite(o) && o > 0 ? o : 0, Number.isFinite(s) && s > 0 ? s : 0) * u * d,
    p = h <= 64 ? 64 : h <= 128 ? 128 : h <= 256 ? 256 : vY;
  return Math.min(i, K5n(h, p, a));
}

const RHt = .15;

function K5n(e, t, n) {
  if (n == null || n === t || n !== 64 && n !== 128 && n !== 256 && n !== vY) return t;
  if (t > n) return e > n * (1 + RHt) ? t : n;
  const r = n / 2;
  return e < r * (1 - RHt) ? t : n;
}

function Q5n(e) {
  return e > .75 && e < 1 ? .85 : e;
}

function iHe(e, t, n, r, a, i) {
  const o = q5n(Q5n(e), t, n, r, a),
    s = i ?? aZ(e);
  return Math.min(s, o);
}

function n5e(e) {
  const t = String(e || "").trim();
  return !t || !/^https?:\/\//i.test(t) || /\/videos\//i.test(t) || /\/images\//i.test(t) && !/\/thumbnails\//i.test(t) ? !1 : /\/thumbnails\//i.test(t);
}

function Cp(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  let n = t;
  try {
    const r = new URL(t);
    let a = !1;
    r.searchParams.has("x-oss-process") && (r.searchParams.delete("x-oss-process"), a = !0);
    const i = [];
    r.searchParams.forEach((o, s) => {
      (/^imageView2\b/i.test(s) || s.toLowerCase().startsWith("imageview2")) && i.push(s);
    });
    for (const o of i) r.searchParams.delete(o), a = !0;
    a && (n = r.toString());
  } catch {}
  return n = n.replace(/([?&])x-oss-process=[^&#]*/gi, "$1").replace(/([?&])imageView2\/[^&#]*/gi, "$1").replace(/\?&/, "?").replace(/&&+/g, "&").replace(/[?&]$/, "").replace(/\?&/, "?"), n;
}

function oHe(e) {
  const t = String(e || "");
  return /(?:\?|&)x-oss-process=/i.test(t) || /(?:\?|&)imageView2\//i.test(t);
}

function sHe(e, t) {
  const n = String(e || "").trim();
  if (!n) return "";
  const r = Cp(n);
  if (!n5e(r) || JDe) return r;
  const a = Math.max(64, Math.min(2048, Math.round(Number(t) || vY)));
  if (a >= vY) return r;
  const i = r.indexOf("#"),
    o = i >= 0 ? r.slice(0, i) : r,
    s = i >= 0 ? r.slice(i) : "",
    l = o.includes("?") ? "&" : "?",
    u = /\.png(?:$|\?|#)/i.test(o) ? `image/resize,l_${a}/format,png` : `image/resize,l_${a}`;
  return `${o}${l}x-oss-process=${u}${s}`;
}

function Xg(e, t = Sae) {
  const n = String(e || "").trim();
  if (!n) return "";
  if (n5e(n)) {
    if (JDe) return Cp(n) || n;
    if (mo() === "qiniu") {
      const h = Cp(n),
        p = Math.max(64, Math.min(2048, Math.round(Number(t) || Sae))),
        m = h.indexOf("#"),
        f = m >= 0 ? h.slice(0, m) : h,
        y = m >= 0 ? h.slice(m) : "",
        b = f.includes("?") ? "&" : "?";
      return `${f}${b}imageView2/2/w/${p}/h/${p}${y}`;
    }
    return sHe(n, t);
  }
  if (!/(?:\?|&)x-oss-process=/i.test(n) || JDe) return n;
  const r = Cp(n),
    a = Math.max(64, Math.min(2048, Math.round(Number(t) || Sae))),
    i = r.indexOf("#"),
    o = i >= 0 ? r.slice(0, i) : r,
    s = i >= 0 ? r.slice(i) : "",
    l = o.includes("?") ? "&" : "?",
    u = /\.png(?:$|\?|#)/i.test(o) ? `image/resize,l_${a}/format,png` : `image/resize,l_${a}`;
  return `${o}${l}x-oss-process=${u}${s}`;
}

function Gv(e) {
  const t = e.currentSrc || e.src;
  if (!oHe(t)) return !1;
  const n = Cp(t);
  return !n || n === t ? !1 : (MIt(), e.src = n, !0);
}

function RIt(e, t) {
  const n = String(e || "").trim();
  if (!n) return "";
  if (!E0()) return n;
  if (!n5e(n)) return Cp(n) || n;
  const r = typeof t == "number" && Number.isFinite(t) && t > 0 ? t : Cd().zoom;
  return sHe(n, aZ(r));
}

function Y5n(e, t) {
  if (!E0()) return e;
  const n = Cd().zoom;
  return e.map(r => RIt(r, n));
}

function NIt(e, t, n, r = aZ(t), a) {
  const i = String(e || "").trim();
  if (!i || !E0() || !n5e(i)) return i;
  const o = iHe(t, n == null ? void 0 : n.worldWidth, n == null ? void 0 : n.worldHeight, n == null ? void 0 : n.devicePixelRatio, a, r);
  return sHe(i, o);
}

function X5n(e) {
  const t = String(e || "").trim();
  if (!/^https?:\/\//i.test(t)) return !1;
  let n;
  try {
    n = new URL(t).pathname;
  } catch {
    return !1;
  }
  const r = oHe(t);
  return /\.(?:mp4|webm|mov|m4v|m3u8)(?:$)/i.test(n) || /\/videos\//i.test(n) ? /(?:[?&])x-oss-process=video(?:%2f|\/)snapshot/i.test(t) : /\/thumbnails\//i.test(n) || r;
}

const h6r = Object.freeze(Object.defineProperty({
    __proto__: null,
    OSS_THUMB_LOD_FULL_EDGE: vY,
    OSS_THUMB_LOD_SMALL_EDGE: Sae,
    QIAODOUMAYI_THUMB_MEDIUM_ZOOM: PIt,
    applyOssImageResizeProcess: sHe,
    getOssThumbLodEdge: aZ,
    getOssThumbLodEdgeForDisplay: q5n,
    holdOssThumbDisplayEdge: K5n,
    isOssCanvasImagePreloadUrl: X5n,
    mapUrlsToOssThumbLod: Y5n,
    markOssImageProcessBroken: MIt,
    ossCanvasThumbSizingZoom: Q5n,
    ossThumbDisplayEdge: iHe,
    recoverCompactUiThumbnailImage: Gv,
    resolveCompactUiThumbnailUrl: Xg,
    resolveOssCanvasThumbDisplayUrl: NIt,
    resolveOssCanvasThumbLodUrl: RIt,
    shouldApplyOssThumbLod: n5e,
    stripOssImageProcessParams: Cp,
    urlHasOssImageProcess: oHe
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Mpt = 2e3,
  p6r = Mpt + 100,
  NHt = 1600,
  RV = "cubic-bezier(0.16, 1, 0.3, 1)",
  m6r = 50,
  f6r = 1600,
  jHt = 1400,
  g6r = 12e3;

function DHt(e) {
  let t = String(e || "").trim();
  if (!t) return "";
  try {
    t = decodeURI(t);
  } catch {}
  t = Cp(t) || t;
  const n = t.indexOf("#");
  n >= 0 && (t = t.slice(0, n));
  const r = t.indexOf("?");
  return (r >= 0 ? t.slice(0, r) : t).replace(/\/images\//i, "/thumbnails/").toLowerCase();
}

function AF(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  if (!n || !r) return !1;
  if (n === r) return !0;
  const a = DHt(n),
    i = DHt(r);
  return !!(a && i && a === i);
}

function y6r(e) {
  const {
    phase: t,
    replacing: n,
    generatingShell: r,
    hidden: a
  } = e;
  return t === "revealing" ? {
    opacity: 1,
    filter: "blur(0px)",
    transform: "scale(1)",
    transition: `opacity 0.7s ${RV}, filter ${Mpt}ms ${RV}, transform ${Mpt}ms ${RV}`
  } : n ? {
    opacity: 0,
    filter: "blur(36px)",
    transform: "scale(1.06)",
    transition: "none"
  } : r ? {
    opacity: 1,
    filter: "blur(14px)",
    transform: "scale(1.1)",
    transition: `filter ${NHt}ms ${RV}, transform ${NHt}ms ${RV}`
  } : {
    opacity: a ? 0 : 1,
    filter: "blur(0px)",
    transform: "scale(1)",
    transition: `opacity 150ms ${RV}`
  };
}

const Ppt = new Map();

function b6r(e, t, n) {
  const r = String(e || "").trim();
  return n && r && Ppt.has(r) ? Ppt.get(r) : {
    shownOnce: !1,
    primed: !1,
    baseline: t,
    lastDisplay: t,
    phase: "idle",
    underlay: "",
    replacing: !1
  };
}

function LHt(e, t) {
  const n = String(e || "").trim();
  n && Ppt.set(n, t);
}

function J5n(e, t) {
  let n = !1;
  const r = () => {
    n || t();
  };
  return typeof e.decode == "function" ? e.decode().then(r, r) : r(), () => {
    n = !0;
  };
}

const Rpt = new Map(),
  Z5n = new Map(),
  Npt = new Map(),
  eIn = new Map(),
  jpt = new Map(),
  tIn = new Map();

function jIt(e, t, n) {
  let r = e.get(t);
  return r || (r = new Set(), e.set(t, r)), r.add(n), () => {
    r.delete(n), r.size === 0 && e.delete(t);
  };
}

function OHt(e, t) {
  var r;
  const n = String(e || "").trim();
  !n || Rpt.get(n) === t || (Rpt.set(n, t), (r = Z5n.get(n)) == null || r.forEach(a => a()));
}

function nIn(e, t) {
  const n = String(e || "").trim();
  !n || jpt.get(n) === t || (jpt.set(n, t), queueMicrotask(() => {
    var r;
    (r = tIn.get(n)) == null || r.forEach(a => a());
  }));
}

function v6r(e) {
  nIn(e, !1);
}

function w6r(e) {
  var n;
  const t = String(e || "").trim();
  t && (nIn(t, !0), Npt.set(t, (Npt.get(t) || 0) + 1), (n = eIn.get(t)) == null || n.forEach(r => r()));
}

function x6r(e) {
  const t = String(e || "").trim();
  return g.useSyncExternalStore(n => t ? jIt(tIn, t, n) : () => {}, () => t ? jpt.get(t) === !0 : !1, () => !1);
}

function _6r(e) {
  const t = String(e || "").trim();
  return g.useSyncExternalStore(n => t ? jIt(Z5n, t, n) : () => {}, () => t ? Rpt.get(t) === !0 : !1, () => !1);
}

function k6r(e) {
  const t = String(e || "").trim();
  return g.useSyncExternalStore(n => t ? jIt(eIn, t, n) : () => {}, () => t && Npt.get(t) || 0, () => 0);
}

function A6r(e) {
  return e.running || e.runtimeStatus === "generating" ? !1 : e.runtimeStatus === "completed" || e.runtimeStatus === "failed" ? !0 : e.hasNodeError;
}

function S6r(e, t = 0, n) {
  const r = !!(n != null && n.instantIn),
    a = !!(n != null && n.releaseImmediately),
    i = n == null ? void 0 : n.nodeId,
    o = x6r(i),
    s = e && !o,
    l = k6r(i),
    d = t + l,
    [u, h] = g.useState(!1),
    [p, m] = g.useState(s),
    [f, y] = g.useState(s || r),
    b = g.useRef(d),
    v = g.useRef(e);
  a && (u && h(!1), p && m(!1), f && y(!1)), g.useEffect(() => {
    e && !v.current && !a && (v6r(i), b.current = d, h(!0)), v.current = e, !e && d > b.current && (b.current = d, h(!1)), o && h(!1);
  }, [e, d, i, o, a]), g.useEffect(() => {
    if (a || !u || s) return;
    const w = window.setTimeout(() => h(!1), g6r);
    return () => window.clearTimeout(w);
  }, [u, s, a]);
  const _ = s || u;
  return g.useEffect(() => (OHt(i, _), () => OHt(i, !1)), [_, i]), g.useEffect(() => {
    if (a) return;
    if (_) {
      m(!0);
      return;
    }
    if (!p) return;
    const w = window.setTimeout(() => m(!1), jHt);
    return () => window.clearTimeout(w);
  }, [_, p, a]), g.useEffect(() => {
    if (!a) {
      if (_ && p) {
        if (r) {
          y(!0);
          return;
        }
        const w = requestAnimationFrame(() => y(!0));
        return () => cancelAnimationFrame(w);
      }
      _ || y(!1);
    }
  }, [_, p, r, a]), {
    mounted: p,
    loadingOverlayActive: _,
    style: {
      opacity: f ? 1 : 0,
      transition: r && _ ? "none" : `opacity ${_ ? f6r : jHt}ms ${RV}`,
      pointerEvents: "none"
    }
  };
}

function rIn(e, t, n, r) {
  const a = String(e || "").trim(),
    i = _6r(n),
    o = (r == null ? void 0 : r.loadingOverlayActive) ?? i,
    s = b6r(n, a, t),
    [l, d] = g.useState(s.phase),
    [u, h] = g.useState(s.underlay),
    [p, m] = g.useState(s.replacing),
    [f, y] = g.useState(""),
    b = g.useRef(s.shownOnce || t),
    v = g.useRef(s.baseline),
    _ = g.useRef(s.primed),
    w = g.useRef(s.lastDisplay || a),
    k = g.useRef(a),
    A = g.useRef(t),
    S = g.useRef(r == null ? void 0 : r.onNewImageReady);
  S.current = r == null ? void 0 : r.onNewImageReady;
  const C = g.useCallback(() => {
    LHt(n, {
      shownOnce: b.current,
      primed: _.current,
      baseline: v.current,
      lastDisplay: w.current,
      phase: l,
      underlay: u,
      replacing: p
    });
  }, [n, l, u, p]);
  g.useEffect(() => {
    C();
  }, [C]), g.useEffect(() => {
    t && !A.current && (b.current = !0, _.current = !1, v.current = a, d("idle"), h(""), m(!0)), t && (b.current = !0), A.current = t;
  }, [t, a]), g.useEffect(() => {
    l === "idle" && a && (w.current = a);
  }, [l, a]), g.useEffect(() => {
    const T = k.current;
    !AF(a, T) && a !== T && (k.current = a, b.current && (T && !AF(T, a) || !T && a) && (h(""), m(!0), _.current = !1));
  }, [a]);
  const I = !!a && !!f && !AF(a, v.current) && (AF(f, a) || f === a);
  g.useEffect(() => {
    var T;
    !b.current || _.current || I && (_.current = !0, d("priming"), w6r(n), (T = S.current) == null || T.call(S));
  }, [I, n]), g.useEffect(() => {
    if (l !== "priming" || o) return;
    let T = 0;
    const P = requestAnimationFrame(() => {
      T = requestAnimationFrame(() => d("revealing"));
    });
    return () => {
      cancelAnimationFrame(P), cancelAnimationFrame(T);
    };
  }, [l, o]), g.useEffect(() => {
    if (l !== "revealing") return;
    const T = window.setTimeout(() => {
      d("idle"), h(""), m(!1), b.current = !1, _.current = !1, v.current = a, LHt(n, {
        shownOnce: !1,
        primed: !1,
        baseline: a,
        lastDisplay: a,
        phase: "idle",
        underlay: "",
        replacing: !1
      });
    }, p6r);
    return () => window.clearTimeout(T);
  }, [l, a, n]);
  const E = o && l === "idle" && !p,
    M = y6r({
      phase: l,
      replacing: p,
      generatingShell: E
    });
  return {
    phase: l,
    underlaySrc: u,
    replacing: p,
    generatingShell: E,
    style: M,
    markReady: T => {
      const P = String(T || "").trim();
      P && y(P);
    }
  };
}

function DIt(e) {
  return /^https?:\/\//i.test(e) && (/\/thumbnails\//i.test(e) || /(?:\?|&)x-oss-process=image\/resize/i.test(e) || /(?:\?|&)imageView2\/2\/w\/\d+/i.test(e));
}

function LIt(e) {
  const t = String(e || "").trim();
  return !t || Tu(t) || !/^https?:\/\//i.test(t) && !t.startsWith("asset:") ? "" : vs(t) ? Af(t) ? t : (zg(t), "") : /\/thumbnails\//i.test(t) ? t : /\/images\//i.test(t) ? ym(t) : /\/videos\//i.test(t) ? "" : t;
}

function pd(e) {
  const t = String(e || "").trim();
  if (!t || Tu(t)) return "";
  if (Er.isContentRef(t)) {
    const r = Er.getFromCacheSync(Er.extractId(t));
    return r && !Er.isContentRef(r) ? pd(r) : t;
  }
  const n = LIt(t);
  return n ? ei() ? yz(n) : n : t.startsWith("blob:") ? yz(t) : t.startsWith("data:image") || t.startsWith("data:video") ? ei() ? yz(t) : t : "";
}

function Dpt(e) {
  const t = String(e || "").trim();
  if (!t || Tu(t)) return "";
  if (Er.isContentRef(t)) {
    const r = Er.getFromCacheSync(Er.extractId(t));
    return r && !Er.isContentRef(r) ? Dpt(r) : t;
  }
  const n = LIt(t);
  return n ? ei() ? yz(n) : n : t.startsWith("blob:") ? yz(t) : t.startsWith("data:image") || t.startsWith("data:video") ? ei() ? yz(t) : t : "";
}

function r5e(e, t) {
  const n = e.settings,
    r = [],
    a = t != null && t.startsWith("blob:") ? vm(t) : void 0;
  if (a && r.push(a), e.type === "gen-image" || e.type === "gen-video") {
    const l = Math.max(0, Number((n == null ? void 0 : n.selectedMjImageIndex) ?? 0)),
      d = p => Array.isArray(p) ? p[Math.min(l, Math.max(0, p.length - 1))] : void 0,
      u = n == null ? void 0 : n.generatedImages,
      h = u == null ? void 0 : u[Math.min(l, Math.max(0, ((u == null ? void 0 : u.length) || 1) - 1))];
    r.push(d(n == null ? void 0 : n._mjPreviewAssetIds), d(n == null ? void 0 : n._mjAssetIds), h == null ? void 0 : h.assetId);
  }
  if (e.type === "preview" && (n != null && n._isStoryboardMosaic)) {
    const l = typeof n._stitchedPreviewUrl == "string" ? String(n._stitchedPreviewUrl).trim() : "";
    l && Er.isContentRef(l) && r.push(Er.extractId(l));
    const d = String(n._thumbnailAssetId || n._contentAssetId || e._contentAssetId || "").trim();
    d && r.push(d.startsWith("preview_") ? d : `preview_${d}`);
  }
  e.type === "input-image" ? r.push(e._contentAssetId, n == null ? void 0 : n._contentAssetId, n == null ? void 0 : n._localCacheAssetId, n == null ? void 0 : n._thumbnailAssetId, n == null ? void 0 : n._assetId) : r.push(n == null ? void 0 : n._thumbnailAssetId, n == null ? void 0 : n._localCacheAssetId, n == null ? void 0 : n._contentAssetId, n == null ? void 0 : n._assetId, e._contentAssetId);
  const i = new Set(),
    o = r.filter(l => {
      const d = typeof l == "string" ? l.trim() : "";
      return !d || i.has(d) ? !1 : (i.add(d), !0);
    });
  if (!((e.type === "gen-image" || e.type === "gen-video") && o.length === 0 && !(typeof e.content == "string" && e.content.trim()))) {
    const l = String(e.id || "").trim();
    l && !i.has(l) && o.push(l);
  }
  return o;
}

function a5e(e, t) {
  return r5e(e, t)[0] || null;
}

function K2(e) {
  const t = e.settings || {},
    n = String(t.mediaType || "").toLowerCase();
  if (n === "video" || n === "audio") return n;
  if (n === "3d") return "image";
  const r = String(t[_i] || t._ossRemoteUrl || "").trim();
  if (r && (/\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(r) || /\/videos\//i.test(r))) return "video";
  const a = typeof e.content == "string" ? e.content.trim() : "";
  if (a.startsWith("data:video") || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(a) || /\/videos\//i.test(a)) return "video";
  if (a.startsWith("data:audio") || /\.(mp3|mpeg|mpga|wav|m4a|aac|flac|opus)(\?|#|$)/i.test(a)) return "audio";
  if (n === "image") return "image";
}

function Lpt(e) {
  const t = e.settings,
    n = [e.videoPosterUrl, t == null ? void 0 : t.videoPosterUrl, t == null ? void 0 : t._canvasDisplayPreviewUrl, t == null ? void 0 : t[Pi]];
  for (const r of n) {
    const a = pd(typeof r == "string" ? r : "");
    if (!(!a || Er.isContentRef(a) || DM(a)) && (/\/thumbnails\//i.test(a) || /\.(jpe?g|png|webp|gif|bmp)(\?|#|$)/i.test(a) || a.startsWith("data:image") || a.startsWith("blob:") || /^https?:\/\//i.test(a) && !/\/videos\//i.test(a))) return a;
  }
  return "";
}

function Ble(e) {
  const t = e.settings,
    n = [typeof e.content == "string" ? e.content : "", typeof (t == null ? void 0 : t._blobUrl) == "string" ? t._blobUrl : "", typeof (t == null ? void 0 : t[_i]) == "string" ? t[_i] : ""];
  for (const r of n) {
    const a = String(r || "").trim();
    if (!(!a || Tu(a)) && !Er.isContentRef(a) && (a.startsWith("blob:") || a.startsWith("data:video") || /^https?:\/\//i.test(a) && (/\/videos\//i.test(a) || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(a)))) return a;
  }
  return "";
}

function Opt(e) {
  const t = e.settings,
    n = [t?.audioUrl, t?._audioUrl, t?._blobUrl, e.content, t?.[_i], t?._ossRemoteUrl];
  for (const r of n) {
    const a = String(r || "").trim();
    if (!(!a || Er.isContentRef(a)) && (a.startsWith("blob:") || a.startsWith("data:audio") || /\.(mp3|mpeg|mpga|wav|ogg|m4a|aac|flac|opus)(\?|#|$)/i.test(a) || /^https?:\/\//i.test(a) && !/\.(jpg|jpeg|png|webp|gif|bmp)(\?|#|$)/i.test(a))) return a;
  }
  return "";
}

function OIt(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  if (Ur.isAvailable()) {
    const n = Ur.getCachedAssetUrlSync(t);
    if (n) return gd(n);
  }
  return "";
}

function I6r(e) {
  const t = String(e || "").trim();
  return !t || /^preview_[^_]+_(?:img\d+|selected|video\d+|selected_video)_\d+$/i.test(t) || /^preview_[^_]+_\d+$/i.test(t) ? !1 : t.startsWith("preview_") || t.startsWith("thumb_") || t.endsWith("_thumbnail");
}

function Fle(e) {
  const t = a5e(e);
  if (t && I6r(t)) {
    const n = OIt(t);
    if (n) return n;
  }
  return "";
}

function xbe(e) {
  return String(e || "").trim();
}

function aIn(e) {
  const t = e.settings || {},
    n = Math.max(0, Number(t.selectedMjImageIndex ?? 0)),
    r = [],
    a = xbe(e.content);
  a && r.push(a);
  const i = t.generatedImages;
  if (Array.isArray(i)) {
    const o = i[Math.min(n, Math.max(0, i.length - 1))],
      s = xbe(o == null ? void 0 : o.fullUrl),
      l = xbe(o == null ? void 0 : o.url);
    s && r.push(s), l && r.push(l);
  }
  return [...new Set(r)];
}

function U$(e, t) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return !1;
  const n = xbe(t);
  return n ? zg(n) ? !0 : DIt(n) ? !1 : aIn(e).includes(n) : !1;
}

function __(e, t) {
  const n = xbe(t);
  return !n || U$(e, n) ? "" : gd(n);
}

function C6r(e) {
  const t = e.settings,
    n = typeof e.thumbnailUrl == "string" ? e.thumbnailUrl.trim() : "",
    r = pd(n);
  if (r) return r;
  const a = !!(typeof (t == null ? void 0 : t._localCacheAssetId) == "string" && t._localCacheAssetId.trim() || typeof (t == null ? void 0 : t._assetId) == "string" && t._assetId.trim() || typeof (t == null ? void 0 : t._contentAssetId) == "string" && t._contentAssetId.trim()),
    i = typeof (t == null ? void 0 : t._canvasDisplayPreviewUrl) == "string" ? t._canvasDisplayPreviewUrl.trim() : "",
    o = a ? pd(i) : "";
  if (o) return o;
  const s = typeof (t == null ? void 0 : t._thumbnailAssetId) == "string" ? t._thumbnailAssetId.trim() : "",
    l = OIt(s);
  if (l) return l;
  const d = typeof (t == null ? void 0 : t[Pi]) == "string" ? String(t[Pi]).trim() : "",
    u = pd(d);
  if (u) return u;
  const h = Fle(e);
  return h || "";
}

function lHe(e) {
  if (K2(e) === "audio") return "";
  const t = K2(e) === "video";
  if (ei()) {
    if (t) {
      const v = gd(Lpt(e));
      if (v) return v;
    }
    const h = gd(C6r(e));
    if (h) return h;
    const p = e.settings,
      m = typeof e.content == "string" ? e.content.trim() : "",
      f = gd(pd(m));
    if (f) return f;
    const y = typeof (p == null ? void 0 : p[_i]) == "string" ? String(p[_i]).trim() : "",
      b = gd(LIt(y));
    return b || "";
  }
  if (t) {
    const h = Lpt(e);
    if (h) return h;
  }
  const n = _f(e),
    r = pd(n);
  if (r && !Er.isContentRef(r)) {
    const h = gd(r);
    if (h) return h;
  }
  const a = e.settings,
    i = typeof (a == null ? void 0 : a._blobUrl) == "string" ? a._blobUrl.trim() : "",
    o = pd(i);
  if (o && !Er.isContentRef(o)) {
    const h = gd(o);
    if (h) return h;
  }
  const s = typeof e.content == "string" ? e.content.trim() : "",
    l = pd(s);
  if (l && !Er.isContentRef(l)) {
    const h = gd(l);
    if (h) return h;
  }
  if (t) {
    const h = Ble(e);
    if (h) return h;
  }
  const d = Vv(e),
    u = pd(d);
  return u && !Er.isContentRef(u) ? gd(u) : "";
}

function tre(e) {
  if (K2(e) === "audio") return "";
  const t = _E(e.id),
    n = gd(t),
    r = lHe(e),
    a = typeof e.content == "string" ? e.content.trim() : "";
  if (n && (!r || AF(n, r) || AF(n, a))) return n;
  const i = String(r || "").trim();
  if (!i || Er.isContentRef(i)) return "";
  if (ei()) return gd(i);
  if (/^https?:\/\//i.test(i)) {
    const o = ym(i);
    return o || (/\/images\//i.test(i) && !/\/thumbnails\//i.test(i) ? "" : i);
  }
  return i.startsWith("blob:") || i.startsWith("data:image"), gd(i);
}

function K1(e) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return "";
  const t = e.settings || {},
    n = Math.max(0, Number(t.selectedMjImageIndex ?? 0)),
    r = b => {
      const v = ei() ? Dpt(b) : pd(b);
      if (!v) return "";
      if (Er.isContentRef(v)) {
        const _ = Er.getFromCacheSync(Er.extractId(v));
        return _ && !Er.isContentRef(_) ? ei() ? Dpt(_) : pd(_) || _ : "";
      }
      return v;
    };
  if (ei()) {
    const b = t.generatedImages || [];
    if (b.length > 0) {
      const R = b[Math.min(n, b.length - 1)],
        j = __(e, r(R == null ? void 0 : R.thumbUrl));
      if (j) return j;
    }
    const v = typeof e.content == "string" ? e.content.trim() : "",
      _ = __(e, r(v));
    if (_) return _;
    const w = typeof t._canvasDisplayPreviewUrl == "string" ? String(t._canvasDisplayPreviewUrl).trim() : "",
      k = __(e, r(w));
    if (k) return k;
    const A = typeof e.thumbnailUrl == "string" ? e.thumbnailUrl.trim() : "",
      S = __(e, r(A));
    if (S) return S;
    const C = typeof t[Pi] == "string" ? String(t[Pi]).trim() : "",
      I = __(e, r(C));
    if (I) return I;
    if (e.type === "gen-video") {
      const R = typeof e.videoPosterUrl == "string" ? String(e.videoPosterUrl).trim() : "",
        j = typeof t.videoPosterUrl == "string" ? String(t.videoPosterUrl).trim() : "";
      for (const B of [R, j]) {
        const F = __(e, r(B));
        if (F) return F;
      }
    }
    const E = Array.isArray(t._mjPreviewAssetIds) ? t._mjPreviewAssetIds.map(R => String(R || "").trim()).filter(Boolean) : [],
      M = E[Math.min(n, Math.max(0, E.length - 1))];
    if (M) {
      const R = OIt(M),
        j = __(e, R);
      if (j) return j;
    }
    const T = Fle(e),
      P = __(e, T);
    return P || "";
  }
  const a = Bm(e, n);
  if (a && nr(a)) return a;
  const i = Fle(e);
  if (i) return i;
  if (a) return a;
  const o = b => {
      const v = String(b || "").trim();
      return v ? e.type === "gen-video" ? __(e, v) : ym(v) : "";
    },
    s = t.generatedImages || [];
  if (s.length > 0) {
    const b = s[Math.min(n, s.length - 1)];
    if (e.type === "gen-video") {
      const v = r(b == null ? void 0 : b.thumbUrl),
        _ = __(e, v);
      if (_) return _;
    } else {
      const v = o(r(b == null ? void 0 : b.thumbUrl)) || o(r(b == null ? void 0 : b.fullUrl)) || o(r(b == null ? void 0 : b.url));
      if (v) return v;
    }
  }
  const l = ["previewMjImages", "mjImages", "batchImages"];
  for (const b of l) {
    const v = t[b];
    if (!Array.isArray(v)) continue;
    const _ = v[Math.min(n, v.length - 1)],
      w = r(typeof _ == "string" ? _ : "");
    if (w) {
      if (e.type === "gen-video") {
        const A = __(e, w);
        if (A) return A;
        continue;
      }
      const k = o(w);
      if (k) return k;
    }
  }
  const d = typeof t[Pi] == "string" ? String(t[Pi]).trim() : "",
    u = pd(d);
  if (u) if (e.type === "gen-video") {
    const b = __(e, u);
    if (b) return b;
  } else {
    const b = o(u);
    if (b) return b;
  }
  const h = typeof e.videoPosterUrl == "string" ? String(e.videoPosterUrl).trim() : "",
    p = typeof t.videoPosterUrl == "string" ? String(t.videoPosterUrl).trim() : "";
  for (const b of [h, p]) {
    const v = __(e, pd(b));
    if (v) return v;
  }
  const m = typeof e.content == "string" ? e.content.trim() : "",
    f = r(m);
  if (f) return e.type === "gen-video" ? __(e, f) : o(f);
  const y = typeof t[_i] == "string" ? String(t[_i]).trim() : "";
  return e.type !== "gen-video" && y ? o(y) : "";
}

function BIt(e) {
  if (e.type !== "preview") return "";
  const t = e.settings || {},
    n = Math.max(0, Number(t.selectedPreviewImageIndex ?? 0));
  if (ei()) {
    const f = Fle(e);
    if (f) return f;
    const y = t.generatedImages || [];
    if (y.length > 0) {
      const b = y[Math.min(n, y.length - 1)],
        v = pd(b == null ? void 0 : b.thumbUrl) || pd(b == null ? void 0 : b.fullUrl) || pd(b == null ? void 0 : b.url);
      if (v && !/^https?:\/\//i.test(v) && !Er.isContentRef(v)) return v;
    }
  }
  const r = typeof t._stitchedFullUrl == "string" ? String(t._stitchedFullUrl).trim() : "";
  if (t._isStoryboardMosaic) {
    const f = typeof t._stitchedPreviewUrl == "string" ? String(t._stitchedPreviewUrl).trim() : "";
    if (f) {
      const w = pd(f);
      if (w && !Er.isContentRef(w)) return w;
    }
    const y = typeof t[Pi] == "string" ? String(t[Pi]).trim() : "",
      b = pd(y);
    if (b && !Er.isContentRef(b)) return b;
    const v = typeof e.content == "string" ? e.content.trim() : "",
      _ = pd(v);
    if (_ && !Er.isContentRef(_)) return _;
    if (r) {
      const w = pd(r);
      if (w && !Er.isContentRef(w)) return w;
    }
    return "";
  }
  const a = typeof t[Pi] == "string" ? String(t[Pi]).trim() : "",
    i = pd(a);
  if (i) return i;
  const o = Array.isArray(e.previewMjImages) ? e.previewMjImages : [];
  if (o.length > 0) {
    const f = pd(typeof o[Math.min(n, o.length - 1)] == "string" ? o[Math.min(n, o.length - 1)] : "");
    if (f) return f;
  }
  const s = ["previewMjImages", "mjImages", "batchImages"];
  for (const f of s) {
    const y = t[f];
    if (!Array.isArray(y)) continue;
    const b = y[Math.min(n, y.length - 1)],
      v = pd(typeof b == "string" ? b : "");
    if (v) return v;
  }
  const l = typeof t.previewOssRemoteUrl == "string" ? String(t.previewOssRemoteUrl).trim() : "",
    d = pd(l);
  if (d) return d;
  const u = typeof e.selectedPreviewImage == "string" ? e.selectedPreviewImage.trim() : "",
    h = pd(u);
  if (h) return h;
  const p = typeof e.content == "string" ? e.content.trim() : "",
    m = pd(p);
  return m || "";
}

function iIn(e) {
  var a, i, o;
  const t = e.previewMjImages;
  if (Array.isArray(t) && t.length > 0) {
    const s = pd(typeof t[0] == "string" ? t[0] : "");
    if (s) return s;
  }
  const n = (a = e.settings) == null ? void 0 : a.generatedImages;
  if (Array.isArray(n) && n.length > 0) {
    const s = pd((i = n[0]) == null ? void 0 : i.thumbUrl) || pd((o = n[0]) == null ? void 0 : o.fullUrl);
    if (s) return s;
  }
  const r = typeof e.content == "string" ? e.content.trim() : "";
  return pd(r);
}

function E6r(e) {
  const t = e.settings || {};
  return typeof t.expandModelId == "string" || typeof t.expandModelName == "string" || typeof t.eraserModelId == "string" || typeof t.eraserModelName == "string";
}

function T6r(e) {
  switch (e.type) {
    case "input-image":
      return !!(typeof e.content == "string" && e.content.trim());
    case "gen-image":
    case "gen-video":
      return !!(K1(e).trim() || e.content);
    case "gen-3d":
      return !!(xf(e).trim() || e.content || e.thumbnailUrl);
    case "rh-app":
    case "rh-comfy":
      return !!iIn(e).trim();
    case "topaz-upscale":
    case "jimeng-super-resolution":
    case "fal-rembg":
    case "virtual-try-on":
    case "motion-control":
    case "video-relight":
      return !!xf(e).trim();
    default:
      return !1;
  }
}

function oIn(e, t, n) {
  return n.filter(a => a.to === e && (!a.inputType || a.inputType === "default")).map(a => t.find(i => i.id === a.from)).filter(a => a != null);
}

function sIn(e, t, n) {
  if (e.type !== "preview") return e;
  const r = e.settings || {};
  if (r._isStoryboardMosaic && r._stitchedFullUrl || BIt(e).trim() || e._expandPending || E6r(e) && typeof e.content == "string" && e.content.trim()) return e;
  const i = oIn(e.id, t, n),
    o = ["input-image", "gen-image", "gen-video", "topaz-upscale", "jimeng-super-resolution", "fal-rembg", "virtual-try-on", "rh-app", "rh-comfy"];
  for (const s of o) for (const l of i) if (l.type === s && T6r(l)) return l;
  return e;
}

const hee = new Map(),
  M6r = 2048,
  P6r = 250;

function xf(e) {
  const t = Date.now(),
    n = hee.get(e.id);
  if (n && t - n.at < P6r && n.type === e.type && n.content === e.content && n.thumbnailUrl === e.thumbnailUrl && n.settingsRef === e.settings) return n.result;
  const r = (() => {
      var i;
      switch (e.type) {
        case "input-image":
          return lHe(e);
        case "gen-image":
        case "gen-video":
          return K1(e);
        case "gen-3d":
          {
            const o = (i = e.settings) == null ? void 0 : i.threedMeta;
            return pd(e.thumbnailUrl) || pd(o == null ? void 0 : o.src_thumbnail_url) || pd(o == null ? void 0 : o.rendered_image_url) || pd(e.content);
          }
        case "preview":
          return BIt(e);
        case "rh-app":
        case "rh-comfy":
          return iIn(e);
        case "topaz-upscale":
        case "jimeng-super-resolution":
        case "fal-rembg":
        case "virtual-try-on":
        case "motion-control":
        case "video-relight":
          {
            const o = e.settings || {};
            if (e.type === "topaz-upscale" && String(o.superResMode || "") === "video" || e.type === "motion-control" || e.type === "video-relight") {
              const l = typeof e.videoPosterUrl == "string" ? String(e.videoPosterUrl).trim() : "",
                d = typeof o.videoPosterUrl == "string" ? String(o.videoPosterUrl).trim() : "",
                u = typeof o._canvasDisplayPreviewUrl == "string" ? String(o._canvasDisplayPreviewUrl).trim() : "",
                h = typeof o[Pi] == "string" ? String(o[Pi]).trim() : "";
              for (const m of [l, d, u, h]) {
                const f = pd(m);
                if (!f || DM(f)) continue;
                const y = gd(f);
                if (y) return y;
              }
              const p = pd(typeof e.content == "string" ? e.content : "");
              if (p && !DM(p)) {
                const m = gd(p);
                if (m) return m;
              }
              if (ei()) {
                const m = Fle(e);
                if (m && !DM(m)) return m;
              }
              return "";
            }
            if (ei()) {
              const l = Fle(e);
              if (l) return l;
            }
            return pd(typeof e.content == "string" ? e.content : "");
          }
        default:
          return "";
      }
    })(),
    a = gd(r);
  for (hee.delete(e.id), hee.set(e.id, {
    type: e.type,
    content: e.content,
    thumbnailUrl: e.thumbnailUrl,
    settingsRef: e.settings,
    result: a,
    at: t
  }); hee.size > M6r;) {
    const i = hee.keys().next().value;
    if (!i) break;
    hee.delete(i);
  }
  return a;
}

function BHt(e) {
  return new Promise(t => {
    const n = String(e || "").trim();
    if (!n) {
      t(null);
      return;
    }
    const r = new Image();
    r.onload = () => {
      const a = r.naturalWidth,
        i = r.naturalHeight;
      t(a > 0 && i > 0 ? {
        width: a,
        height: i
      } : null);
    }, r.onerror = () => t(null), r.src = n;
  });
}

async function R6r(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  try {
    const n = await KVe(t);
    return n.w > 0 && n.h > 0 ? {
      width: n.w,
      height: n.h
    } : null;
  } catch {
    return null;
  }
}

async function lIn(e, t) {
  const n = e.settings,
    a = String((n == null ? void 0 : n.imageSize) || "").trim().match(/^(\d+)\s*[×xX]\s*(\d+)$/);
  if (a) {
    const s = Number(a[1]),
      l = Number(a[2]);
    if (Number.isFinite(s) && Number.isFinite(l) && s > 0 && l > 0) return {
      width: s,
      height: l
    };
  }
  if (K2(e) === "video") {
    const s = Lpt(e),
      l = Ble(e);
    if (s && s !== l) {
      const d = await BHt(s);
      if (d) return d;
    }
    if (l) {
      const d = await R6r(l);
      if (d) return d;
    }
    return null;
  }
  const o = String(t || e.content || "").trim();
  if (!o) return null;
  if (o.startsWith("blob:") || o.startsWith("data:image")) return BHt(o);
  if (/^https?:\/\//i.test(o)) {
    const {
        probeHttpImageDimensions: s
      } = await Ie(async () => {
        const {
          probeHttpImageDimensions: d
        } = await Promise.resolve().then(() => ii);
        return {
          probeHttpImageDimensions: d
        };
      }, void 0, import.meta.url),
      l = await s(o);
    if (l && l.width > 0 && l.height > 0) return l;
  }
  return null;
}

function cIn(e, t, n) {
  const r = t === "input-image" && n === "video";
  if (t !== "gen-video" && t !== "video-input" && !r && !(t === "topaz-upscale" && n === "video")) return !1;
  const i = String(e || "").trim();
  return i ? !!(i.startsWith("data:video") || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(i) || /\/videos\//i.test(i) || r && i.startsWith("blob:") && !R5n(i)) : !1;
}

const FIt = Object.freeze(Object.defineProperty({
    __proto__: null,
    getCanvasGenNodeThumbSyncUrl: K1,
    getCanvasInputImageThumbSyncUrl: lHe,
    getCanvasNodeThumbSyncUrl: xf,
    getCanvasPreviewThumbSyncUrl: BIt,
    getGenNodeFullResolutionUrls: aIn,
    getInputImageNodeMediaType: K2,
    getPreviewIncomingNodes: oIn,
    isCanvasVideoThumbUrl: cIn,
    isGenNodeFullResolutionThumbUrl: U$,
    pickInputImageAudioPlayUrl: Opt,
    pickInputImageFullShellSeedDisplayUrl: tre,
    pickInputImageVideoPlayUrl: Ble,
    probeInputImageNodeIntrinsicDimensions: lIn,
    resolveCanvasNodeThumbAssetId: a5e,
    resolveCanvasNodeThumbAssetIds: r5e,
    resolvePreviewLightThumbSourceNode: sIn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  FHt = new WeakMap();

function JC(...e) {
  for (const t of e) {
    const n = String(t || "").trim();
    if (n && !Tu(n)) return n;
  }
  return "";
}

function N6r(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  return !n.startsWith("blob:") || !r ? n : `local-asset://${r}`;
}

function zIt(e, t) {
  const n = o => (Array.isArray(o) ? o : []).map(s => String(s || "").trim()).filter(s => s.length > 0),
    r = Array.isArray(e == null ? void 0 : e.generatedImages) ? e.generatedImages.map(o => o.thumbUrl || o.fullUrl || o.url || "").filter(o => typeof o == "string" && o.length > 0) : [],
    a = [n(t), n(e == null ? void 0 : e.previewMjImages), n(e == null ? void 0 : e.mjImages), n(e == null ? void 0 : e.batchImages), r];
  let i = [];
  for (const o of a) o.length > i.length && (i = o);
  return i;
}

function zHt(e, t, n) {
  const r = Bm(e, t);
  if (r) return r;
  const i = (e.settings || {}).generatedImages || [];
  if (i.length > 0) {
    const s = i[Math.min(t, i.length - 1)],
      l = JC(s == null ? void 0 : s.thumbUrl, s == null ? void 0 : s.fullUrl, s == null ? void 0 : s.url);
    if (l) return l;
  }
  const o = JC(n);
  if (o) return o;
  if (t === 0) {
    const s = K1(e);
    if (s) return s;
    const l = typeof e.selectedPreviewImage == "string" ? e.selectedPreviewImage.trim() : "";
    if (l) return l;
    const d = typeof e.content == "string" ? e.content.trim() : "";
    if (d) return d;
  }
  return "";
}

function G9e(e) {
  if (e.type !== "gen-image") return [];
  const t = e.settings || {},
    n = Array.isArray(e.previewMjImages) ? e.previewMjImages : void 0,
    r = zIt(t, n);
  if (r.length > 0) return r.map((i, o) => zHt(e, o, i)).filter(i => i.length > 0);
  const a = zHt(e, 0);
  return a ? [a] : [];
}

function j6r(e, t, n) {
  const r = Math.max(0, t),
    a = e.settings || {},
    i = String(n || "").trim(),
    s = (a.generatedImages || [])[r],
    l = a._mjAssetIds || [],
    d = a._mjPreviewAssetIds || [],
    u = [l[r], s == null ? void 0 : s.assetId, r === 0 ? a._contentAssetId : void 0, r === 0 ? e._contentAssetId : void 0, r === 0 ? a._assetId : void 0, d[r], i.startsWith("blob:") ? vm(i) : void 0, uU(e, i, r)];
  for (const h of u) {
    const p = String(h || "").trim();
    if (!(!p || p.includes("_batch_"))) return /_mj_\d+$/.test(p) ? p.replace(/_mj_\d+$/, "") : p;
  }
}

async function V9e(e, t = 0, n) {
  if (e.type !== "gen-image") return null;
  const r = Math.max(0, t),
    a = String(n || "").trim(),
    i = ei() && Lue(e) && !S0(e);
  if (!i) {
    const h = Zo(e, r);
    if (h) return h;
  }
  const o = j6r(e, r, a);
  if (o) {
    const h = await F$(o);
    if (h) return h;
    const {
        readPreviewWindowAssetOriginalUrl: p
      } = await Ie(async () => {
        const {
          readPreviewWindowAssetOriginalUrl: f
        } = await Promise.resolve().then(() => Ui);
        return {
          readPreviewWindowAssetOriginalUrl: f
        };
      }, void 0, import.meta.url),
      m = await p(o, a);
    if (m) return m;
  }
  const d = ((e.settings || {}).generatedImages || [])[r],
    u = [d == null ? void 0 : d.fullUrl, d == null ? void 0 : d.url, a, r === 0 && typeof e.content == "string" ? e.content : ""];
  for (const h of u) {
    const p = String(h || "").trim();
    if (!(!p || Tu(p))) {
      if (Er.isContentRef(p)) {
        const m = await Er.get(Er.extractId(p));
        if (m && !Tu(m)) return m;
      }
      if (p.startsWith("blob:")) {
        const m = await exe(p, o || null, null);
        if (m) return m;
      }
      if (p.startsWith("data:")) return p;
      if (nr(p)) {
        if (i) continue;
        const m = Go(p) || ya(p) || p;
        if (m) return m;
      }
    }
  }
  if (r === 0) {
    const h = Xl(e);
    if (h != null && h.url && (!i || !nr(h.url))) return h.url;
  }
  return null;
}

function UIt(...e) {
  for (const t of e) {
    const n = String(t || "").trim();
    if (n && nr(n)) return ya(n);
  }
  return null;
}

function ket(...e) {
  const t = UIt(...e);
  return t ? kE(t) || t : null;
}

function ZDe(e, t) {
  if (e.type !== "gen-video") return !0;
  const n = String(t || "").trim();
  return nr(n) ? !/\/videos\//i.test(n) : !0;
}

function Xl(e) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return null;
  const t = ei(),
    n = S0(e),
    r = ua(),
    a = FHt.get(e);
  if (a && a.settings === e.settings && a.content === e.content && a.localCacheMode === t && a.ossUrlOnly === n && a.ossUploadEnabled === r) return a.result;
  const i = e.settings,
    o = v => {
      const _ = (v == null ? void 0 : v.assetId) || (v != null && v.url.startsWith("blob:") ? vm(v.url) || uU(e, v.url) : void 0),
        w = v && t && !n ? {
          ...v,
          assetId: _,
          url: N6r(v.url, _)
        } : v;
      return FHt.set(e, {
        settings: e.settings,
        content: e.content,
        localCacheMode: t,
        ossUrlOnly: n,
        ossUploadEnabled: r,
        result: w
      }), w;
    },
    s = Array.isArray(i == null ? void 0 : i.generationVersions) ? i.generationVersions.length : 0,
    l = Zo(e) || (s > 1 ? null : Gle(e));
  if (l && ua() && !t) {
    const v = Ij(e),
      _ = ZDe(e, l);
    return o({
      url: l,
      assetId: _ ? (v == null ? void 0 : v._assetId) || (v == null ? void 0 : v.id) : void 0
    });
  }
  const d = SHe(e);
  if (d) {
    const v = d.replace(/^local-asset:\/\//, "").trim();
    return o({
      url: d,
      assetId: v || void 0
    });
  }
  if (l) {
    const v = Ij(e),
      _ = ZDe(e, l);
    return o({
      url: l,
      assetId: _ ? (v == null ? void 0 : v._assetId) || (v == null ? void 0 : v.id) : void 0
    });
  }
  const u = (i == null ? void 0 : i._contentAssetId) || (i == null ? void 0 : i._assetId) || void 0,
    h = i == null ? void 0 : i.generatedImages;
  if (h && h.length > 0) {
    const v = Math.max(0, Math.min(Number((i == null ? void 0 : i.selectedMjImageIndex) ?? 0), h.length - 1)),
      _ = h[v],
      w = ket(_ == null ? void 0 : _.fullUrl, _ == null ? void 0 : _.url);
    if (w) return o({
      url: w,
      assetId: void 0
    });
  }
  const p = zIt(i);
  if (p.length >= 1) {
    const v = Math.max(0, Math.min(Number((i == null ? void 0 : i.selectedMjImageIndex) ?? 0), p.length - 1)),
      _ = ket(p[v]);
    if (_) return o({
      url: _,
      assetId: void 0
    });
  }
  const m = JC(typeof e.content == "string" ? e.content : void 0),
    f = ket(m);
  if (f) return o({
    url: f,
    assetId: void 0
  });
  if (m && (m.startsWith("blob:") || m.startsWith("data:image/") || m.startsWith("data:video/"))) return o({
    url: m,
    assetId: u
  });
  if (p.length >= 2) {
    const v = Math.max(0, Math.min(Number((i == null ? void 0 : i.selectedMjImageIndex) ?? 0), p.length - 1)),
      _ = JC(p[v]);
    if (_) {
      const w = (i == null ? void 0 : i._mjPreviewAssetIds) || (i == null ? void 0 : i._mjAssetIds) || [],
        k = typeof w[v] == "string" && w[v].trim() ? w[v].trim() : void 0;
      return o({
        url: _,
        assetId: k
      });
    }
  }
  if (h && h.length > 0) {
    const v = Math.max(0, Math.min(Number((i == null ? void 0 : i.selectedMjImageIndex) ?? 0), h.length - 1)),
      _ = h[v],
      w = typeof (_ == null ? void 0 : _.assetId) == "string" && _.assetId.trim() ? _.assetId.trim() : void 0,
      k = JC(_ == null ? void 0 : _.thumbUrl),
      S = (JC(_ == null ? void 0 : _.fullUrl, _ == null ? void 0 : _.url) || k).trim();
    if (S) return o({
      url: S,
      assetId: w
    });
    if (w) return o({
      url: "",
      assetId: w
    });
  }
  const y = i == null ? void 0 : i.generatedImageUrl;
  if (typeof y == "string" && y.trim()) {
    const v = y.trim(),
      _ = UIt(v);
    return o({
      url: _ || v,
      assetId: (i == null ? void 0 : i._assetId) || void 0
    });
  }
  const b = JC(typeof e.content == "string" ? e.content : void 0);
  if (b) {
    const v = (i == null ? void 0 : i._contentAssetId) || (i == null ? void 0 : i._assetId) || void 0;
    return o({
      url: b,
      assetId: v
    });
  }
  return o(null);
}

function kE(e) {
  const t = String(e || "").trim();
  if (!t || !nr(t)) return null;
  const n = Go(t);
  return n ? ya(n) || n : /\/images\//i.test(t) ? ya(t) || t : /\/thumbnails\//i.test(t) ? null : SY(t) ? ya(t) || t : null;
}

function zle(e) {
  if (!e || Lue(e) && !S0(e)) return null;
  if (e.type === "input-image") for (const t of [wP(e), G$(e), Vh(e)]) {
    const n = t ? kE(t) : null;
    if (n) return n;
  }
  if (e.type === "gen-image" || e.type === "gen-video") {
    const t = Zo(e);
    if (t) return t;
    const n = Xl(e);
    if (n != null && n.url) {
      const r = kE(n.url);
      if (r) return r;
    }
  }
  if (e.type === "preview") {
    const t = e.settings || {};
    for (const n of [t.previewOssRemoteUrl, t._ossRemoteUrl, e.selectedPreviewImage, e.content]) {
      const r = n ? kE(String(n)) : null;
      if (r) return r;
    }
  }
  return null;
}

function dIn(e, t, n) {
  const r = [],
    a = n.filter(i => i.to === e && (!i.inputType || i.inputType === "default"));
  for (const i of a) {
    const o = t.find(d => d.id === i.from);
    if (!o || o.type === "camera-movement" || o.type === "professional-camera" || o.type === "text-node") continue;
    const s = zle(o);
    if (s) {
      r.push(s);
      continue;
    }
    const l = Ry(o);
    for (const d of l) {
      const u = kE(d);
      if (u) {
        r.push(u);
        break;
      }
    }
  }
  return r;
}

function D6r(e, t, n, r) {
  const a = r.filter(o => o.to === t && (!o.inputType || o.inputType === "default")),
    i = dIn(t, n, r);
  return e.map((o, s) => {
    const l = String(o || "").trim();
    if (!l) return o;
    if (nr(l)) {
      const u = kE(l);
      if (u) return u;
    }
    const d = i[s];
    if (d) return d;
    for (const u of a) {
      const h = n.find(y => y.id === u.from);
      if (!h) continue;
      const p = String(h.content || "").trim();
      if (!(p === l || o === l || p && l && p === o) && h.type !== "gen-image" && h.type !== "gen-video" && h.type !== "input-image") continue;
      const f = zle(h);
      if (f) return f;
    }
    return o;
  });
}

function L6r(e) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return null;
  const t = e.settings,
    n = zIt(t),
    r = t == null ? void 0 : t.generatedImages,
    a = d => {
      if (!d) return "";
      const u = String(d.fullUrl || d.url || "").trim(),
        h = String(d.thumbUrl || "").trim();
      return (u || h).trim();
    },
    i = () => {
      const d = t;
      if (typeof (d == null ? void 0 : d._contentAssetId) == "string" && d._contentAssetId.trim().startsWith("pm_")) return d._contentAssetId.trim();
      if (typeof (d == null ? void 0 : d._assetId) == "string" && d._assetId.trim()) return d._assetId.trim();
    },
    o = Zo(e);
  if (o) return {
    url: o,
    assetId: void 0
  };
  const s = JC(typeof e.content == "string" ? e.content : void 0);
  if (s && (s.startsWith("blob:") || s.startsWith("data:image/") || s.startsWith("data:video/"))) return {
    url: s,
    assetId: i()
  };
  if (n.length >= 2) {
    const d = Math.max(0, Math.min(Number((t == null ? void 0 : t.selectedMjImageIndex) ?? 0), n.length - 1)),
      u = JC(n[d]);
    if (u) {
      const h = (t == null ? void 0 : t._mjPreviewAssetIds) || (t == null ? void 0 : t._mjAssetIds) || [],
        p = typeof h[d] == "string" && h[d].trim() ? h[d].trim() : void 0;
      return {
        url: u,
        mjImages: n,
        assetId: p
      };
    }
  }
  if (r && r.length > 0) {
    const d = Math.max(0, Math.min(Number((t == null ? void 0 : t.selectedMjImageIndex) ?? 0), r.length - 1)),
      u = r[d],
      h = typeof (u == null ? void 0 : u.assetId) == "string" && u.assetId.trim() ? u.assetId.trim() : void 0,
      p = a(u);
    if (p) {
      const m = r.map(f => a(f)).filter(Boolean);
      return {
        url: p,
        mjImages: m.length > 1 ? m : void 0,
        assetId: h
      };
    }
    if (h) return {
      url: "",
      assetId: h
    };
  }
  const l = JC(typeof e.content == "string" ? e.content : void 0);
  return l ? {
    url: l,
    assetId: i()
  } : null;
}

function uIn(e) {
  const t = Xl(e);
  return t != null && t.url ? [t.url] : [];
}

function $It(e) {
  const t = e.settings,
    n = Ij(e),
    r = n ? Bd(n) : null,
    a = (n == null ? void 0 : n._assetId) || (n == null ? void 0 : n.id),
    i = t == null ? void 0 : t.generatedImages;
  if (i && i.length > 0) {
    const l = [];
    if (i.forEach((d, u) => {
      const p = Zo(e, u) || UIt(d.fullUrl, d.url) || (u === 0 ? r : null) || JC(d.fullUrl, d.url, d.thumbUrl);
      if (!p) return;
      const m = ZDe(e, p);
      l.push({
        url: p,
        assetId: m ? typeof d.assetId == "string" && d.assetId.trim() ? d.assetId.trim() : u === 0 ? a : void 0 : void 0
      });
    }), l.length > 0) return l;
  }
  const o = Zo(e) || Gle(e) || r;
  if (o) {
    const l = ZDe(e, o);
    return [{
      url: o,
      assetId: l ? a : void 0
    }];
  }
  const s = Xl(e);
  return s != null && s.url ? [{
    url: s.url,
    assetId: s.assetId || a
  }] : [];
}

function Jpe(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  if (!n || !r) return !1;
  if (n === r) return !0;
  const a = ya(n) || n,
    i = ya(r) || r;
  return a === i;
}

function eLe(e, t, n) {
  const r = String(e || "").trim();
  if (!r) return !1;
  const a = t.settings || {},
    i = Math.max(0, n ?? Number(a.selectedMjImageIndex ?? 0)),
    o = Bm(t, i);
  if (o && Jpe(r, o)) return !0;
  const s = Zo(t, i);
  if (s && Jpe(r, s)) return !0;
  const l = a.generatedImages || [];
  if (l.length > 0) {
    const u = l[Math.min(i, l.length - 1)],
      h = String((u == null ? void 0 : u.thumbUrl) || "").trim(),
      p = String((u == null ? void 0 : u.fullUrl) || (u == null ? void 0 : u.url) || "").trim();
    if (h && Jpe(r, h) || p && Jpe(r, p)) return !0;
  }
  const d = String(t.content || "").trim();
  return !!(d && Jpe(r, d));
}

function uU(e, t, n) {
  var h, p, m;
  const r = String(t || "").trim();
  if (!r) return;
  const a = e.settings || {},
    i = Math.max(0, n ?? Number(a.selectedMjImageIndex ?? 0));
  if (r.startsWith("blob:")) {
    const f = vm(r);
    if (f) return f;
  }
  const o = a.generatedImages || [];
  for (const f of o) {
    const y = typeof (f == null ? void 0 : f.assetId) == "string" ? f.assetId.trim() : "";
    if (!y) continue;
    const b = String((f == null ? void 0 : f.thumbUrl) || "").trim(),
      v = String((f == null ? void 0 : f.fullUrl) || (f == null ? void 0 : f.url) || "").trim();
    if (r === b || r === v) return y;
  }
  const s = e._previewMjAssetIds,
    l = a._mjPreviewAssetIds,
    d = a._mjAssetIds;
  if (Array.isArray(s) && ((h = s[i]) != null && h.trim())) return s[i].trim();
  if (Array.isArray(l) && ((p = l[i]) != null && p.trim())) return l[i].trim();
  if (Array.isArray(d) && ((m = d[i]) != null && m.trim())) return d[i].trim();
  if (String(e.content || "").trim() === r) {
    const f = e._contentAssetId;
    if (typeof f == "string" && f.trim()) return f.trim();
    const y = a._contentAssetId;
    if (typeof y == "string" && y.trim()) return y.trim();
    const b = a._assetId;
    if (typeof b == "string" && b.trim()) return b.trim();
  }
}

function i4(e, t) {
  const n = String(t || "").trim();
  !n || e.includes(n) || e.push(n);
}

function O6r(e, t, n) {
  const r = e.settings || {},
    a = [],
    i = String(t || "").trim();
  i.startsWith("blob:") && i4(a, vm(i));
  const s = (r.generatedImages || [])[n];
  if (i4(a, s == null ? void 0 : s.assetId), s != null && s.id) {
    const h = String(s.id).trim(),
      p = h.replace(/_(batch_)?\d+$/, "");
    i4(a, h), p && (i4(a, n === 0 ? p : `${p}_${n}`), i4(a, `${p}_mj_${n}`), i4(a, `${p}_batch_${n}`));
  }
  const l = r._mjAssetIds;
  i4(a, l == null ? void 0 : l[n]), i4(a, uU(e, i, n));
  const d = e._contentAssetId;
  n === 0 && (i4(a, d), i4(a, r._contentAssetId), i4(a, r._assetId));
  const u = r._mjPreviewAssetIds;
  return i4(a, u == null ? void 0 : u[n]), a;
}

async function wY(e, t, n) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return null;
  const r = e.settings || {},
    a = Math.max(0, n ?? Number(r.selectedMjImageIndex ?? 0)),
    i = String(t || "").trim();
  if (!i) return null;
  const o = ei(),
    s = Zo(e, a),
    d = (r.generatedImages || [])[a],
    u = String((d == null ? void 0 : d.fullUrl) || (d == null ? void 0 : d.url) || "").trim(),
    h = u || s || void 0,
    p = O6r(e, i, a),
    m = a === 0 && typeof r._compactOriginalRelPath == "string" ? String(r._compactOriginalRelPath).trim() : "",
    f = async () => {
      try {
        const {
          assetStore: b
        } = await Ie(async () => {
          const {
            assetStore: v
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: v
          };
        }, void 0, import.meta.url);
        await b.init();
        for (const v of p) {
          if (/^preview_/i.test(v) || v.endsWith("_thumbnail")) continue;
          const _ = await b.getAssetUrl(v);
          if (_ && Mk(_)) return _;
        }
      } catch {}
      for (const b of p) if (!(/^preview_/i.test(b) || b.endsWith("_thumbnail"))) try {
        const v = await F$(b, h);
        if (v && (!o || Mk(v))) return v;
      } catch {}
      if (i.startsWith("blob:")) {
        const v = [vm(i), ...p].filter(w => typeof w == "string" && w.trim().length > 0),
          _ = new Set();
        for (const w of v) {
          if (_.has(w)) continue;
          _.add(w);
          const k = await Vm(i, w, m || null);
          if (k) return URL.createObjectURL(k);
        }
      }
      if (Er.isContentRef(i)) try {
        await Er.init();
        const b = await Er.get(Er.extractId(i));
        if (b) return wY(e, b, a);
      } catch {}
      return null;
    };
  if (o) {
    const b = await f();
    if (b) return b;
    if (i.startsWith("blob:") || i.startsWith("data:")) {
      const {
          ensureResolvableBlobUrl: v
        } = await Ie(async () => {
          const {
            ensureResolvableBlobUrl: w
          } = await Promise.resolve().then(() => No);
          return {
            ensureResolvableBlobUrl: w
          };
        }, void 0, import.meta.url),
        _ = await v(i, p, m ? [m] : []);
      if (_) return _;
    }
    return null;
  }
  if (s && SY(s)) return s;
  if (u && /^https?:\/\//i.test(u) && !Lae(u, {
    fullUrlHint: u
  })) return u;
  const y = await f();
  return y || (u && !Lae(u, {
    fullUrlHint: u
  }) ? u : null);
}

const LM = Object.freeze(Object.defineProperty({
  __proto__: null,
  buildUpstreamOssRefUrlsForGeneration: dIn,
  collectGenNodePreviewDisplayUrls: G9e,
  genNodeDisplayUrlMatchesOss: eLe,
  getGenImageVideoAllDownloadUrls: $It,
  getGenImageVideoLightboxSource: L6r,
  getGenImageVideoOutputUrlAndAssetId: Xl,
  getGenImageVideoOutputUrlsForConnection: uIn,
  resolveAssetIdForGenNodeDisplay: uU,
  resolveGenNodeOriginalUrlForCropExpand: wY,
  resolveGenNodeSlotOriginalUrlAsync: V9e,
  resolveRefImagesFromUpstreamOss: D6r,
  resolveSourceNodeOssOriginalUrlForGenApi: zle,
  upgradeOssUrlToOriginalForGenApi: kE
}, Symbol.toStringTag, {
  value: "Module"
}));

function u7(e) {
  if (!e) return !1;
  const t = String(e).trim();
  return !(!t || t === "undefined" || t === "null");
}

function Ry(e) {
  var t, n, r;
  if (!e) return [];
  if (e.type === "camera-movement" || e.type === "professional-camera") return [];
  if (e.type === "preview") {
    if (e.selectedPreviewImage) return [String(e.selectedPreviewImage)];
    const a = e.previewMjImages;
    return a != null && a[0] ? [a[0]] : typeof e.content == "string" && e.content.trim() ? [e.content.trim()] : [];
  }
  if (e.type === "canvas-node") return e.content ? [e.content] : (t = e.settings) != null && t.canvasData ? [`canvas-node:${e.id}`] : [];
  if (e.type === "inpaint-crop" || e.type === "inpaint-stitch") return e.content ? [e.content] : [];
  if (e.type === "rh-app") {
    const a = (n = e.settings) == null ? void 0 : n.generatedImages;
    return a != null && a.length ? a.map(i => i.fullUrl).filter(u7) : typeof e.content == "string" && e.content.trim() ? [e.content.trim()] : [];
  }
  if (e.type === "input-image") {
    const a = Vv(e);
    return a && u7(a) ? [a] : [];
  }
  if (e.type === "gen-image" || e.type === "gen-video") return uIn(e).filter(u7);
  if (e.type === "gen-music" || e.type === "gen-speech") {
    const a = (r = e.settings) == null ? void 0 : r.audioUrl;
    return a && u7(a) ? [a.trim()] : typeof e.content == "string" && e.content.trim() ? [e.content.trim()] : [];
  }
  return typeof e.content == "string" && e.content.trim() ? [e.content.trim()] : [];
}

function B6r(e) {
  return Ry(e)[0] || null;
}

function cHe(e) {
  var r;
  if (!e) return;
  if (e.type === "gen-image" || e.type === "gen-video") return (r = Xl(e)) == null ? void 0 : r.assetId;
  const t = e.settings || {};
  return typeof e._contentAssetId == "string" && e._contentAssetId.trim() || typeof t._assetId == "string" && String(t._assetId).trim() || typeof t._contentAssetId == "string" && String(t._contentAssetId).trim() || "" || void 0;
}

const GIt = "canvas-node:",
  N2 = "@asset:",
  Ld = "local-asset://";

function Pk(e) {
  const t = String(e || "").trim();
  return t.startsWith(Ld) && decodeURIComponent(t.slice(Ld.length).trim()) || null;
}

function hU(e) {
  const t = String(e || "").trim();
  return t.startsWith(N2) && t.slice(N2.length).trim() || null;
}

function _be(e, t, n) {
  if (t === n || t < 0 || n < 0 || t >= e.length || n >= e.length) return null;
  const r = [...e],
    a = r[t];
  return r[t] = r[n], r[n] = a, r;
}

function AE(e) {
  const t = String(e || "").trim();
  return !t || t.length < 6 || t.startsWith(GIt) || t.startsWith(N2) || t.startsWith(Ld) || Er.isContentRef(t) || /^(blob:|data:|https?:\/\/|file:)/i.test(t) || /\s/.test(t) ? null : /^(pm_|asset-|seedance-mat-|local-|history-|[0-9a-f]{8,}-)/i.test(t) || /^[A-Za-z0-9_-]{12,}$/.test(t) ? t : null;
}

function yy(e, t) {
  return hU(e) || Pk(e) || t || AE(e) || void 0;
}

function SE(e, t) {
  return !e || DS(e) ? !1 : hU(e) || Pk(e) || AE(e) || Er.isContentRef(e) ? !0 : !(!t || e.startsWith(GIt));
}

function UHt(e) {
  return gd(e) || void 0;
}

async function dHe(e, t) {
  if (Er.isContentRef(e)) try {
    await Er.init();
    const o = await Er.get(Er.extractId(e));
    return o ? ei() ? UHt(o) : o : void 0;
  } catch {
    return;
  }
  const n = yy(e, t);
  if (!n) return;
  const r = !!Pk(e) || e.startsWith(Ld) || !!hU(e) || !!AE(e) || ei();
  if (r) try {
    const {
        resolveLocalCachedDisplayUrls: o
      } = await Ie(async () => {
        const {
          resolveLocalCachedDisplayUrls: d
        } = await Promise.resolve().then(() => Ui);
        return {
          resolveLocalCachedDisplayUrls: d
        };
      }, void 0, import.meta.url),
      s = await o(n),
      l = UHt(s == null ? void 0 : s.displayUrl);
    if (l) return l;
  } catch {}
  if (ei() && r) return;
  const {
    assetStore: a
  } = await Ie(async () => {
    const {
      assetStore: o
    } = await Promise.resolve().then(() => Ri);
    return {
      assetStore: o
    };
  }, void 0, import.meta.url);
  await a.init();
  let i = await a.getAssetUrl(n, e);
  if (!i && (hU(e) || AE(e) || Pk(e))) {
    const o = await F$(n);
    o && (i = o);
  }
  if (!i && Pk(e)) try {
    const {
        resolveLocalCachedDisplayUrls: o
      } = await Ie(async () => {
        const {
          resolveLocalCachedDisplayUrls: l
        } = await Promise.resolve().then(() => Ui);
        return {
          resolveLocalCachedDisplayUrls: l
        };
      }, void 0, import.meta.url),
      s = await o(n);
    s != null && s.displayUrl && (i = s.displayUrl);
  } catch {}
  return i || void 0;
}

function DS(e) {
  const t = String(e || "").trim();
  return !!t && nr(t);
}

function vP(e) {
  const t = String(e || "").trim();
  return t ? t.startsWith("blob:") || t.startsWith("data:image/") || t.startsWith("data:video/") ? !(t.startsWith("blob:") && !Nd(t)) : Af(t) || ei() && gd(t) ? !0 : DS(t) : !1;
}

function Iae(e) {
  const t = String(e || "").trim();
  if (!t || Ko(t)) return "";
  if (gx(t)) {
    const n = ym(t);
    return !n || Ko(n) || gx(n) ? "" : n;
  }
  return t;
}

function Cae(e) {
  const t = String(e || "").trim();
  return !t || !DS(t) ? t : ya(t) || t;
}

function xY(e, t) {
  const n = (e || []).map(d => String(d || "").trim()).filter(d => d && d !== "undefined" && d !== "null"),
    r = (t || []).map(d => String(d || "").trim()).filter(d => d && d !== "undefined" && d !== "null");
  if (!r.length) return n;
  const a = new Map();
  n.forEach(d => a.set(d, (a.get(d) ?? 0) + 1));
  const i = [];
  for (const d of r) {
    const u = a.get(d) ?? 0;
    if (u <= 0) {
      i.push(null);
      continue;
    }
    i.push(d), u === 1 ? a.delete(d) : a.set(d, u - 1);
  }
  const o = n.filter(d => {
    const u = a.get(d) ?? 0;
    return u <= 0 ? !1 : (u === 1 ? a.delete(d) : a.set(d, u - 1), !0);
  });
  let s = 0;
  for (let d = 0; d < i.length; d++) i[d] == null && (i[d] = o[s++] ?? null);
  const l = i.filter(d => typeof d == "string" && d.length > 0);
  return s < o.length && l.push(...o.slice(s)), l;
}

function _Y(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  if (t.startsWith(Ld)) {
    const n = t.slice(Ld.length).trim();
    try {
      return `asset:${decodeURIComponent(n)}`;
    } catch {
      return `asset:${n}`;
    }
  }
  if (t.startsWith(N2)) return `asset:${t.slice(N2.length).trim()}`;
  try {
    if (/^https?:\/\//i.test(t)) {
      const n = new URL(t);
      return `${n.origin}${n.pathname}`.replace(/\/+$/, "").toLowerCase();
    }
  } catch {}
  return t.split("?")[0].split("#")[0].replace(/\/+$/, "");
}

function tLe(e) {
  const t = new Set(),
    n = [];
  for (const r of e || []) {
    const a = String(r || "").trim();
    if (!a || a === "undefined" || a === "null") continue;
    const i = _Y(a) || a;
    t.has(i) || (t.add(i), n.push(a));
  }
  return n;
}

function hIn(e) {
  const t = new Map();
  for (const o of e.nodes) t.set(o.id, o);
  const n = (e.connections || []).filter(o => o.to === e.targetId && (!o.inputType || o.inputType === "default" || o.inputType === (e.inputType || "default"))),
    r = [],
    a = new Set();
  for (const o of n) {
    const s = t.get(o.from);
    if (!s || e.includeGenImage === !1 && (s.type === "gen-image" || s.type === "gen-video")) continue;
    let l = Ry(s).filter(u7);
    if (l.length !== 0) for (const d of l) {
      const u = _Y(d) || d;
      a.has(u) || (a.add(u), r.push(d));
    }
  }
  const i = [...r];
  return {
    referenceImages: r,
    inputImageOrder: i
  };
}

function pIn(e) {
  const t = new Set();
  for (const n of e.fromConnections || []) {
    const r = _Y(n);
    r && t.add(r);
    const a = Pk(n) || hU(n);
    a && t.add(`asset:${a}`);
  }
  for (const n of e.connectionAssetIds || []) {
    const r = String(n || "").trim();
    r && t.add(`asset:${r}`);
  }
  return (e.fromSettings || []).filter(n => {
    const r = String(n || "").trim();
    if (!r || r === "undefined" || r === "null") return !1;
    const a = _Y(r);
    if (a && t.has(a)) return !1;
    const i = Pk(r) || hU(r);
    return !(i && t.has(`asset:${i}`));
  });
}

function F6r(e) {
  const t = String(e || "").trim().toLowerCase();
  return !t || t.startsWith(Ld) || t.startsWith(N2) ? !1 : t.includes("asset.localhost") || t.startsWith("blob:");
}

function Nue(e) {
  const t = s => {
      const l = String(s).trim();
      return l && l !== "undefined" && l !== "null";
    },
    n = tLe((e.fromConnections || []).filter(t)),
    r = (e.fromSettings || []).filter(t),
    a = (e.connectionAssetIds || []).map(s => String(s || "").trim()).filter(Boolean),
    i = pIn({
      fromSettings: r,
      fromConnections: n,
      connectionAssetIds: e.connectionAssetIds
    });
  if (n.length > 0 && i.length > 0 && i.length === n.length && a.length === n.length && i.every(F6r)) return xY(n, e.order);
  const o = tLe([...n, ...i]);
  return xY(o, e.order);
}

function uHe(e) {
  return e.type === "camera-movement" || e.type === "professional-camera";
}

function mIn(e, t, n, r) {
  var a, i, o, s;
  for (const l of r) {
    const d = String(l).trim();
    d && e.set(d, n);
  }
  if (t.type === "input-image") {
    const l = typeof t.content == "string" ? t.content.trim() : "";
    l && e.set(l, n);
    const d = (a = t.settings) == null ? void 0 : a.imageUrl;
    typeof d == "string" && d.trim() && e.set(d.trim(), n);
    const u = r9(t);
    u && (e.set(u, n), e.set(`${N2}${u}`, n), e.set(`${Ld}${u}`, n));
  } else if (t.type === "gen-image" || t.type === "gen-video") {
    const l = Xl(t);
    l != null && l.url && e.set(l.url, n), l != null && l.assetId && (e.set(l.assetId, n), e.set(`${N2}${l.assetId}`, n), e.set(`${Ld}${l.assetId}`, n));
    const d = typeof t.content == "string" ? t.content.trim() : "";
    d && e.set(d, n);
  } else if (t.type === "gen-music" || t.type === "gen-speech") {
    const l = String(((i = t.settings) == null ? void 0 : i.audioUrl) || "").trim(),
      d = typeof t.content == "string" ? t.content.trim() : "";
    l && e.set(l, n), d && e.set(d, n);
    const u = String(((o = t.settings) == null ? void 0 : o._audioAssetId) || "").trim();
    u && (e.set(u, n), e.set(`${N2}${u}`, n));
  } else if (t.type === "video-input") {
    const l = typeof t.content == "string" ? t.content.trim() : "";
    l && e.set(l, n);
    const d = String(((s = t.settings) == null ? void 0 : s._assetId) || "").trim();
    d && (e.set(d, n), e.set(`${N2}${d}`, n));
  }
}

function kY(e, t, n) {
  const r = new Map(),
    a = bP(t);
  return mv(e, n).filter(i => !i.inputType || i.inputType === "default").forEach(i => {
    var s;
    ((s = i.fromGroupNodeIds) != null && s.length ? i.fromGroupNodeIds : [i.from]).forEach(l => {
      const d = a.firstById.get(l);
      !d || uHe(d) || mIn(r, d, l, Ry(d));
    });
  }), r;
}

function fIn(e, t, n, r) {
  var o;
  if (r < 0) return null;
  let a = 0;
  const i = new Set();
  for (const s of e) {
    if (s.to !== n || s.inputType && s.inputType !== "default") continue;
    const l = (o = s.fromGroupNodeIds) != null && o.length ? s.fromGroupNodeIds : [s.from];
    for (const d of l) {
      if (!d || i.has(d)) continue;
      const u = t.find(h => h.id === d);
      if (!(!u || uHe(u))) {
        if (i.add(d), a === r) return d;
        a += 1;
      }
    }
  }
  return null;
}

function gIn(e, t, n, r) {
  var o;
  if (r < 0) return null;
  let a = 0;
  const i = new Set();
  for (const s of e) {
    if (s.to !== n || s.inputType && s.inputType !== "default") continue;
    const l = (o = s.fromGroupNodeIds) != null && o.length ? s.fromGroupNodeIds : [s.from];
    for (const d of l) {
      if (!d || i.has(d)) continue;
      const u = t.find(p => p.id === d);
      if (!u || uHe(u)) continue;
      i.add(d);
      const h = Ry(u).filter(p => String(p).trim());
      if (h.length !== 0) for (const p of h) {
        if (a === r) return d;
        a += 1;
      }
    }
  }
  return fIn(e, t, n, r);
}

function pU(e, t) {
  var i, o;
  const n = String(e || "").trim();
  if (!n) return null;
  const r = t.imageSourceMap.get(n);
  if (r) return r;
  const a = t.connections.filter(s => s.to === t.scopeNodeId && (!s.inputType || s.inputType === "default"));
  for (const s of a) {
    const l = (i = s.fromGroupNodeIds) != null && i.length ? s.fromGroupNodeIds : [s.from];
    for (const d of l) {
      const u = t.nodes.find(p => p.id === d);
      if (!u || uHe(u)) continue;
      const h = new Set();
      if (Ry(u).forEach(p => {
        const m = String(p).trim();
        m && h.add(m);
      }), u.type === "input-image") {
        const p = typeof u.content == "string" ? u.content.trim() : "";
        p && h.add(p);
        const m = (o = u.settings) == null ? void 0 : o.imageUrl;
        typeof m == "string" && m.trim() && h.add(m.trim());
        const f = r9(u);
        f && (h.add(f), h.add(`${N2}${f}`));
      }
      if (h.has(n)) return d;
    }
  }
  return typeof t.connectionIndex == "number" && Number.isInteger(t.connectionIndex) && t.connectionIndex >= 0 ? gIn(t.connections, t.nodes, t.scopeNodeId, t.connectionIndex) : null;
}

function nLe(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  if (t.startsWith("data:image/")) return "image";
  if (t.startsWith("data:video/")) return "video";
  if (t.startsWith("data:audio/")) return "audio";
  if (t.startsWith("blob:")) return null;
  if (KE(t)) return "audio";
  if ($o(t) || /\/videos\//i.test(t)) return "video";
  if (/\/images\//i.test(t) || /\/thumbnails\//i.test(t)) return "image";
  const n = t.split("?")[0].toLowerCase();
  return /\.(jpg|jpeg|png|webp|gif|bmp|avif)(\?|#|$)/i.test(n) ? "image" : null;
}

function VIt(e, t) {
  const n = String(t || "").trim(),
    r = e.settings ?? {},
    a = r.mediaType;
  if (a === "video" && !!(Pk(n) || r._localCacheAssetId || r._assetId || r._contentAssetId || e._contentAssetId || r.seedanceLibraryVideoAssetId)) return "video";
  if (!n) return a === "video" ? "video" : "image";
  const o = n.startsWith("data:video/") || $o(n) || /\/videos\//i.test(n),
    s = n.startsWith("data:image/") || n.startsWith("blob:") || Er.isContentRef(n) || /\/images\//i.test(n) || /\/thumbnails\//i.test(n);
  if (s && !o) {
    const u = String(r[_i] || r._ossRemoteUrl || "").trim();
    return a === "video" && (/\/thumbnails\//i.test(n) || u && (/\/videos\//i.test(u) || $o(u))) ? "video" : "image";
  }
  if (a === "audio") return "audio";
  const l = nLe(n);
  if (l) return l;
  const d = String(r.seedanceVideoAssetUrl || "").trim();
  return s || a === "video" && !o && (!d || n !== d) ? "image" : a === "video" && o ? "video" : "image";
}

function hHe(e) {
  const t = (Vv(e) || _f(e)).trim();
  return t ? {
    url: t,
    type: VIt(e, t)
  } : null;
}

function mU(e, t, n) {
  var o;
  const r = String(e || "").trim();
  if (t === "audio") return "audio";
  if (t === "image") return "image";
  if ((n == null ? void 0 : n.type) === "gen-music" || (n == null ? void 0 : n.type) === "gen-speech") return "audio";
  if ((n == null ? void 0 : n.type) === "video-input" || t === "video" && ($o(r) || r.startsWith("data:video/") || /\/videos\//i.test(r) || (n == null ? void 0 : n.type) === "gen-video" || (n == null ? void 0 : n.previewType) === "video")) return "video";
  if ((n == null ? void 0 : n.type) === "input-image") return VIt(n, e);
  if ((n == null ? void 0 : n.type) === "gen-image") return nLe(r) === "video" ? "video" : "image";
  const a = nLe(r);
  if (a) return a;
  if ((n == null ? void 0 : n.type) === "gen-video") return r.startsWith("data:video/") || $o(r) || /\/videos\//i.test(r) ? "video" : Er.isContentRef(r) || r.startsWith("data:image/") || r.startsWith("blob:") ? "image" : "video";
  if ((n == null ? void 0 : n.previewType) === "video") return "video";
  if (t === "video") return "image";
  const i = (o = n == null ? void 0 : n.settings) == null ? void 0 : o.mediaType;
  return i === "audio" ? "audio" : i === "video" ? $o(r) || r.startsWith("data:video/") || /\/videos\//i.test(r) ? "video" : "image" : r.startsWith("data:video/") || $o(r) || /\/videos\//i.test(r) ? "video" : KE(r) ? "audio" : "image";
}

function pHe(e) {
  const t = String(e.syncDisplay || "").trim();
  if (t && zEe(t)) return t;
  const n = String(e.localPreferredUrl || "").trim();
  if (e.preferLocalRef && n && zEe(n)) return n;
  const r = String(e.resolvedThumbUrl || "").trim();
  if (r && zEe(r)) return r;
  const a = String(e.rawUrl || "").trim();
  return a && zEe(a) ? a : t || n || r || a;
}

function zEe(e) {
  const t = String(e || "").trim();
  return !(!t || Er.isContentRef(t) || t.startsWith(Ld) || t.startsWith("blob:") && !Nd(t) || ei() && !gd(t) && !DS(t));
}

function wk(e, t) {
  const n = i => {
    const o = String(i || "").trim();
    if (!o) return "";
    if (Er.isContentRef(o)) {
      const s = Er.getFromCacheSync(Er.extractId(o));
      return s && !Er.isContentRef(s) ? n(s) || s : "";
    }
    return (o.startsWith("blob:") || o.startsWith("data:image/") || o.startsWith("data:video/") || /^https?:\/\//i.test(o)) && o.startsWith("blob:") && !Nd(o) ? "" : o;
  };
  if ((t == null ? void 0 : t.type) === "gen-image" || (t == null ? void 0 : t.type) === "gen-video") {
    const i = K1(t);
    if (i) return i;
    const o = Bm(t);
    if (o) return o;
  }
  if (Pk(e) && t) {
    if (t.type === "gen-image" || t.type === "gen-video") {
      const o = K1(t);
      if (o) return o;
    }
    const i = xf(t);
    if (i) return i;
  }
  const a = n(e);
  if (a && !a.startsWith(Ld) && !((t == null ? void 0 : t.type) === "gen-image" || (t == null ? void 0 : t.type) === "gen-video") && !gx(a) && !Ko(a) || a && !a.startsWith(Ld) && ((t == null ? void 0 : t.type) === "gen-image" || (t == null ? void 0 : t.type) === "gen-video") && (!nr(a) || /\/thumbnails\//i.test(a))) return a;
  if ((t == null ? void 0 : t.type) === "gen-image" || (t == null ? void 0 : t.type) === "gen-video") {
    const i = K1(t);
    if (i) return i;
  }
  if ((t == null ? void 0 : t.type) === "input-image") {
    const i = xf(t);
    if (i) return i;
    const o = _f(t) || Vv(t),
      s = n(o);
    if (s && !s.startsWith(Ld)) return s;
  }
  if ((t == null ? void 0 : t.type) === "video-input") {
    const i = fU(e, a, t);
    if (i) return i;
    const o = iZ(e, a, t);
    if (o) return o;
  }
  if ((t == null ? void 0 : t.type) === "preview" && t.previewType === "video") {
    const i = fU(e, a, t);
    if (i) return i;
  }
  return a && !a.startsWith(Ld) ? a : n(e);
}

function mHe(e, t, n) {
  var a;
  const r = String(e || "").trim();
  if (r) return (a = n.find(i => String(i.url || "").trim() === r)) == null ? void 0 : a.type;
}

function NV(e) {
  const t = String(e || "").trim();
  return !t || Er.isContentRef(t) || ei() && (t.startsWith("blob:") && !Nd(t) || DS(t)) ? "" : dx(t, "video") ? DS(t) ? Cae(t) : t : "";
}

function yIn(e) {
  const t = String(e || "").trim();
  if (!t || !ei()) return "";
  try {
    const n = Ur.getCachedAssetUrlSync(t);
    if (n) return _c(n) || n;
  } catch {}
  return "";
}

function bIn(e) {
  if (!ei()) return "";
  const t = e.settings || {},
    n = [String(t._localCacheAssetId || "").trim(), String(t._assetId || "").trim(), String(t._contentAssetId || "").trim(), String(e._contentAssetId || "").trim()];
  for (const a of n) {
    const i = yIn(a);
    if (i) return i;
  }
  const r = String(t._blobUrl || "").trim();
  return r.startsWith("data:video/") || r.startsWith("blob:") && Nd(r) ? _c(r) || r : "";
}

function z6r(e) {
  if (ei()) {
    const i = bIn(e);
    if (i) return i;
  }
  const t = e.settings || {},
    n = [String(t[_i] || "").trim(), String(t.seedanceVideoAssetUrl || "").trim()];
  for (const i of n) {
    if (!i) continue;
    if ($o(i) || /\/videos\//i.test(i)) return _c(ya(i) || i) || i;
    const o = Go(i);
    if (o && ($o(o) || /\/videos\//i.test(o))) return _c(ya(o) || o) || o;
  }
  const r = String(t._blobUrl || "").trim();
  if (r.startsWith("data:video/") || r.startsWith("blob:") && Nd(r)) return _c(r) || r;
  const a = String(e.content || "").trim();
  if (a && ($o(a) || /\/videos\//i.test(a))) return _c(a) || a;
  if (a && /\/thumbnails\//i.test(a) && nr(a)) {
    const i = Go(a);
    if (i && ($o(i) || /\/videos\//i.test(i))) return _c(ya(i) || i) || i;
  }
  return "";
}

function U6r(e) {
  const t = e.settings || {},
    n = [e.videoPosterUrl, t.videoPosterUrl, t[Pi], e.content];
  for (const r of n) {
    const a = NV(typeof r == "string" ? r : "");
    if (a) return a;
  }
  return "";
}

function Vwe(e) {
  for (const t of e) {
    const n = String(t || "").trim();
    if (!(!n || Er.isContentRef(n)) && !n.startsWith(Ld) && !(n.startsWith("blob:") && !Nd(n)) && !(ei() && DS(n))) return n;
  }
  return "";
}

function vIn(e, t, n) {
  const r = [],
    a = i => {
      const o = String(i || "").trim();
      o && !r.includes(o) && r.push(o);
    };
  for (const i of n ?? []) a(i);
  if (a(yy(String(t || ""), void 0)), (e == null ? void 0 : e.type) === "input-image" && a(r9(e)), e) {
    const i = e.settings || {};
    a(i._localCacheAssetId), a(i._assetId), a(i._contentAssetId), a(e._contentAssetId), a(i.seedanceLibraryVideoAssetId);
  }
  return r;
}

function Bpt(e) {
  return !!Vwe([e]);
}

function fU(e, t, n) {
  var a, i;
  if ((n == null ? void 0 : n.type) === "video-input") {
    const o = U6r(n);
    if (o) return o;
  }
  if ((n == null ? void 0 : n.type) === "input-image" && ((a = n.settings) == null ? void 0 : a.mediaType) === "video") {
    const s = n.settings || {};
    for (const d of [n.videoPosterUrl, s.videoPosterUrl, s[Pi]]) {
      const u = NV(typeof d == "string" ? d : "");
      if (u) return u;
    }
    const l = NV(xf(n));
    if (l) return l;
  }
  if ((n == null ? void 0 : n.type) === "gen-video") {
    const o = K1(n),
      s = NV(o);
    if (s) return s;
  }
  if ((n == null ? void 0 : n.type) === "preview" && n.previewType === "video") for (const o of [n.videoPosterUrl, n.selectedPreviewImage]) {
    const s = NV(typeof o == "string" ? o : "");
    if (s) return s;
  }
  const r = NV((n == null ? void 0 : n.videoPosterUrl) || ((i = n == null ? void 0 : n.settings) == null ? void 0 : i.videoPosterUrl));
  if (r) return r;
  for (const o of [t, e]) {
    const s = NV(o);
    if (s) return s;
  }
  return "";
}

function KE(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
  if (t.startsWith("data:audio/")) return !0;
  const n = t.toLowerCase();
  return n.includes(".mp3") || n.includes(".wav") || n.includes(".ogg") || n.includes(".m4a") || n.includes(".aac") || n.includes(".flac") || n.includes(".opus") || /\/audio\//i.test(n) || /\/music\//i.test(n) || /\/music(?:[/?#]|$)/i.test(n);
}

function wIn(e, t, n) {
  var r, a, i;
  if ((n == null ? void 0 : n.type) === "gen-music" || (n == null ? void 0 : n.type) === "gen-speech") {
    const o = String(((r = n.settings) == null ? void 0 : r.audioUrl) || "").trim();
    if (o) return o;
    const s = String(n.content || "").trim();
    if (s) return s;
  }
  if ((n == null ? void 0 : n.type) === "input-image" && ((a = n.settings) == null ? void 0 : a.mediaType) === "audio") {
    const s = String(((i = n.settings) == null ? void 0 : i._blobUrl) || "").trim();
    if (s.startsWith("blob:") || s.startsWith("data:audio/")) return s;
    const l = Vh(n);
    if (l && KE(l)) return ya(l) || l;
  }
  for (const o of [t, e]) {
    const s = String(o || "").trim();
    if (s && (KE(s) || s.startsWith("blob:"))) return s;
  }
  return t || e;
}

function iZ(e, t, n) {
  var r, a, i;
  if (ei()) {
    const o = yy(e, void 0);
    if (o && SE(e, o)) {
      const s = yIn(o);
      if (s) return s;
    }
    if (n) {
      const s = bIn(n);
      if (s) return s;
    }
  }
  if ((n == null ? void 0 : n.type) === "gen-video") {
    const o = P0(n);
    if (o) return _c(o) || o;
  }
  if ((n == null ? void 0 : n.type) === "input-image" && ((r = n.settings) == null ? void 0 : r.mediaType) === "video") {
    const s = wP(n) || Vh(n) || "",
      l = String(s).trim();
    if (l && ($o(l) || /\/videos\//i.test(l))) return ya(l) || l;
    const d = String(((a = n.settings) == null ? void 0 : a._blobUrl) || "").trim();
    if (d.startsWith("blob:") || d.startsWith("data:video/")) return d;
  }
  if ((n == null ? void 0 : n.type) === "video-input") {
    const o = z6r(n);
    if (o) return o;
  }
  if ((n == null ? void 0 : n.type) === "preview" && n.previewType === "video") {
    const o = String(n.selectedPreviewImage || n.content || "").trim();
    if (o) return _c(o) || o;
  }
  for (const o of [t, e]) {
    const s = String(o || "").trim();
    if (s) {
      if ($o(s) || /\/videos\//i.test(s) || s.startsWith("data:video/") || s.startsWith("blob:") && (n == null ? void 0 : n.type) === "input-image" && ((i = n.settings) == null ? void 0 : i.mediaType) === "video") return _c(s) || s;
      if (/\/thumbnails\//i.test(s) && nr(s)) {
        const l = Go(s);
        if (l && ($o(l) || /\/videos\//i.test(l))) return ya(l) || l;
      }
    }
  }
  return _c(t) || _c(e) || t || e;
}

function dx(e, t) {
  if (t === "audio") return !1;
  const n = String(e || "").trim();
  return !n || KE(n) ? !1 : (t === "image" || t === void 0) && (n.startsWith("blob:") || n.startsWith("data:image/") || Er.isContentRef(n) || n.startsWith(Ld)) || n.startsWith("data:image/") || /\/images\//i.test(n) || /\/thumbnails\//i.test(n) || nr(n) && !$o(n) && !/\/videos\//i.test(n) ? !0 : /\.(jpg|jpeg|png|webp|gif|bmp|avif)(\?|#|$)/i.test(n);
}

function Eae(e) {
  const t = String(e.materialId || "").trim();
  if (t) return `mat-${t}`;
  const n = String(e.sourceNodeId || "").trim();
  if (n) return `ref-src-${n}-${e.idx}`;
  const r = String(e.assetId || "").trim();
  return r ? `ref-aid-${r}-${e.idx}` : `ref-idx-${e.idx}`;
}

const H9e = Object.freeze(Object.defineProperty({
    __proto__: null,
    LOCAL_ASSET_REF_PREFIX: Ld,
    REF_IMG_ASSET_PREFIX: N2,
    REF_IMG_CANVAS_PREFIX: GIt,
    applyReferenceStripOrder: xY,
    buildReferenceImageSourceMap: kY,
    buildReferenceStripFromConnections: hIn,
    buildReferenceStripSlotKey: Eae,
    canDisplayConnectedRefImmediately: vP,
    classifyUrlMediaType: nLe,
    coerceReferenceStripLightImageUrl: Iae,
    collectReferenceStripLocalAssetIds: vIn,
    dedupeReferenceStripUrls: tLe,
    filterSettingsRefsMirroredByConnections: pIn,
    inferReferenceStripMediaType: mU,
    isConnectedRefOssDirectDisplayUrl: DS,
    isLikelyAudioReferenceUrl: KE,
    isReferenceStripDisplayUsableUrl: Bpt,
    isReferenceStripPosterImage: dx,
    mergeConnectedReferenceUrls: Nue,
    parseAssetPrefixedUrl: hU,
    parseBareReferenceAssetId: AE,
    parseLocalAssetRefUrl: Pk,
    pickConnectedReferenceThumbDisplayUrl: pHe,
    pickReferenceStripEffectiveDisplayUrl: Vwe,
    referenceStripIdentityKey: _Y,
    registerReferenceSourceAliases: mIn,
    resolveConnectedRefAssetId: yy,
    resolveConnectedRefOssDirectDisplayUrl: Cae,
    resolveConnectedReferenceDeclaredType: mHe,
    resolveConnectedReferenceLocalUrl: dHe,
    resolveInputImageConnectedAttachment: hHe,
    resolveInputImageConnectedMediaType: VIt,
    resolveReferenceImageSourceNodeId: pU,
    resolveReferenceSourceNodeIdByConnectionIndex: gIn,
    resolveReferenceSourceNodeIdByConnectionOrder: fIn,
    resolveReferenceStripAudioPlayUrl: wIn,
    resolveReferenceStripSyncDisplayUrl: wk,
    resolveReferenceStripVideoPlayUrl: iZ,
    resolveReferenceStripVideoPosterUrl: fU,
    shouldPreferLocalConnectedAsset: SE,
    swapReferenceStripOrder: _be
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  $6r = "_edit_composite",
  G6r = new Set(["合并图层", "改图合成"]);

function V6r(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  if (t.startsWith("data:image/")) return "image";
  if (t.startsWith("data:video/")) return "video";
  if (t.startsWith("data:audio/")) return "audio";
  const n = t.toLowerCase();
  return n.includes(".mp3") || n.includes(".wav") || n.includes(".ogg") || n.includes(".m4a") ? "audio" : n.includes(".mp4") || n.includes(".webm") || n.includes(".mov") || /\/videos\//i.test(t) ? "video" : /\/images\//i.test(t) || /\/thumbnails\//i.test(t) || /\.(jpg|jpeg|png|webp|gif|bmp|avif)(\?|#|$)/i.test(t.split("?")[0].toLowerCase()) ? "image" : null;
}

function Hwe(e) {
  return `${e}${$6r}`;
}

let $H = null,
  pO = [],
  NR = null;

function H6r() {
  $H = null, pO = [], NR = null;
}

function W6r() {
  return {
    cachedHistoryRawBytes: $H ? $H.length * 2 : 0,
    listItems: pO.length
  };
}

function q6r() {
  try {
    const e = eEt(Zi.HISTORY);
    if (!e) return $H !== null && ($H = null, pO = [], NR = null), pO;
    if (e === $H) return pO;
    const t = JSON.parse(e);
    return $H = e, pO = Array.isArray(t) ? t : [], NR = null, pO;
  } catch {
    return pO;
  }
}

function i5e(e) {
  const t = q6r();
  if (NR && NR.has(e)) return NR.get(e) ?? null;
  let n = null;
  for (const r of t) {
    if (r.sourceNodeId !== e || r.status && r.status !== "completed") continue;
    const a = (r.prompt || "").trim();
    if (G6r.has(a) || a.includes("改图")) {
      n = r;
      break;
    }
  }
  return NR || (NR = new Map()), NR.set(e, n), n;
}

function fHe(e) {
  if (e.type !== "input-image") return !1;
  const t = e.settings || {};
  return typeof t.editImageCommittedPreview == "string" && t.editImageCommittedPreview.trim() || typeof t.editImageCommittedLocalAssetId == "string" && t.editImageCommittedLocalAssetId.trim() || typeof t.editImageCommittedOssRemote == "string" && t.editImageCommittedOssRemote.trim() || (t.editImageLayers || []).filter(r => r == null ? void 0 : r.content).some(r => r.name === "合并图层") ? !0 : !!i5e(e.id);
}

function xIn(e) {
  const t = e.settings || {},
    n = typeof t.editImageCommittedLocalAssetId == "string" ? t.editImageCommittedLocalAssetId.trim() : "";
  if (n) return n;
  const r = i5e(e.id),
    a = String((r == null ? void 0 : r._assetId) || (r == null ? void 0 : r.id) || "").trim();
  return a || Hwe(e.id);
}

function r9(e) {
  const t = e.settings || {};
  return e.type === "input-image" && fHe(e) ? xIn(e) : typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof e._contentAssetId == "string" && e._contentAssetId.trim() || "" || void 0;
}

function jue(e, t) {
  const n = String(t || "").trim();
  return n ? {
    ...(e || {}),
    _assetId: n,
    _localCacheAssetId: n,
    _contentAssetId: n
  } : {
    ...(e || {})
  };
}

function gHe(e, t) {
  const n = {
      ...(e || {})
    },
    r = String(t || "").trim(),
    a = r ? V6r(r) : null;
  if (a === "video" || a === "audio" || n.mediaType === "audio" || !a && n.mediaType === "video") return n;
  const i = String(n._ossRemoteUrl || "").trim(),
    o = !!i && (/\.(mp4|webm|ogg|mov|m4v|mkv|avi)(\?|#|$)/i.test(i) || /\/videos\//i.test(i) || i.startsWith("data:video")),
    s = !!String(n.videoPosterUrl || "").trim() || !!String(n.seedanceLibraryVideoAssetId || "").trim() || !!String(n.seedanceVideoAssetUrl || "").trim();
  return n.mediaType === "video" && (o || s) || (n.mediaType === "video" && (n.mediaType = "image"), n.seedanceVideoAssetUrl && delete n.seedanceVideoAssetUrl), n;
}

function $$(e, t, n) {
  const r = jue(e, t);
  return gHe(r, n);
}

function _In(e) {
  if (e.type !== "input-image") return e;
  const t = e.settings || {},
    r = (typeof e.content == "string" ? e.content.trim() : "") || _f(e),
    a = !String(t._localCacheAssetId || "").trim() && String(t._assetId || t._contentAssetId || e._contentAssetId || "").trim() ? jue(t, String(t._assetId || t._contentAssetId || e._contentAssetId).trim()) : {
      ...t
    },
    i = gHe(a, r);
  return JSON.stringify(i) === JSON.stringify(t) ? e : {
    ...e,
    settings: i
  };
}

function HIt(e) {
  let t = !1;
  const n = e.map(r => {
    const a = _In(r);
    return a !== r && (t = !0), a;
  });
  return t ? n : e;
}

function kIn(e) {
  for (const t of [e.url, e.originalUrl, e._ossRemoteUrl]) {
    const n = String(t || "").trim();
    if (n && (n.startsWith("blob:") || n.startsWith("data:image/") || /^https?:\/\//i.test(n) || Er.isContentRef(n))) return n;
  }
  return null;
}

function AIn(e) {
  if (e.type !== "input-image" || !fHe(e)) return null;
  const t = e.settings || {},
    n = typeof t.editImageCommittedOssRemote == "string" ? t.editImageCommittedOssRemote.trim() : "";
  if (n) return n;
  const r = i5e(e.id),
    a = r ? kIn(r) : null;
  if (a) return a;
  const i = xIn(e);
  if (!ua()) return `${N2}${i}`;
  if (r) {
    const d = String(r.url || r.originalUrl || "").trim();
    if (Er.isContentRef(d)) return d;
  }
  const o = typeof t.editImageCommittedPreview == "string" ? t.editImageCommittedPreview.trim() : "";
  if (o) return o;
  const l = (t.editImageLayers || []).filter(d => d == null ? void 0 : d.content).find(d => d.name === "合并图层");
  return l != null && l.content ? l.content.trim() : `${N2}${i}`;
}

async function Fpt(e) {
  return F$(e);
}

async function SIn(e, t, n, r) {
  const a = e || {},
    i = typeof a.editImageCommittedOssRemote == "string" ? a.editImageCommittedOssRemote.trim() : "";
  if (i) return i;
  const o = typeof r == "string" && r.trim() || (typeof a.editImageCommittedLocalAssetId == "string" ? String(a.editImageCommittedLocalAssetId).trim() : "") || Hwe(t),
    s = await Fpt(o);
  if (s) return s;
  const l = i5e(t);
  if (l) {
    const p = String(l._assetId || l.id || "").trim();
    if (p) {
      const f = await Fpt(p);
      if (f) return f;
    }
    const m = kIn(l);
    if (m) if (Er.isContentRef(m)) try {
      await Er.init();
      const f = await Er.get(Er.extractId(m));
      if (f) return f;
    } catch {} else return m;
  }
  const d = typeof n == "string" && n.trim() || (typeof a.editImageCommittedPreview == "string" ? a.editImageCommittedPreview.trim() : "");
  if (d) if (Er.isContentRef(d)) try {
    await Er.init();
    const p = await Er.get(Er.extractId(d));
    if (p) return p;
  } catch {} else return d;
  const h = (a.editImageLayers || []).filter(p => p == null ? void 0 : p.content).find(p => p.name === "合并图层");
  if (h != null && h.content) {
    const p = h.content.trim();
    if (Er.isContentRef(p)) try {
      await Er.init();
      const m = await Er.get(Er.extractId(p));
      if (m) return m;
    } catch {} else return p;
  }
  return null;
}

const o5e = Object.freeze(Object.defineProperty({
    __proto__: null,
    clearEditImageHistorySyncCache: H6r,
    findLatestEditCompositeHistoryItemSync: i5e,
    getEditImageCommittedLocalAssetId: Hwe,
    getEditImageHistorySyncCacheAudit: W6r,
    hasInputImageEditComposite: fHe,
    mergeInputImageLocalCacheAssetSettings: jue,
    migrateCanvasNodesOnProjectOpen: HIt,
    migrateInputImageNodeOnProjectOpen: _In,
    patchInputImageAssetSettings: $$,
    pickInputImageEditCompositeUrlForDownstream: AIn,
    readExactLocalCacheAssetAsUrl: Fpt,
    resolveInputImageAssetIdForDownstream: r9,
    resolveInputImageEditLightboxFromNodeSettings: SIn,
    sanitizeInputImageSettingsForImageContent: gHe
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  yHe = "qiaodoumayi_material_lib_backup_oss_index";

let Tae = null,
  kbe = null;

function s5e(e) {
  Tae = e, kbe = null;
}

let Zpe = null;

function gU(e) {
  return String(e || "").trim().replace(/\\/g, "/");
}

function WIt(e, t) {
  var a, i;
  const n = e[t];
  if ((a = n == null ? void 0 : n.remoteUrl) != null && a.trim()) return n;
  const r = gU(t);
  for (const [o, s] of Object.entries(e)) if (gU(o) === r && ((i = s == null ? void 0 : s.remoteUrl) != null && i.trim())) return s;
  return null;
}

function IIn() {
  try {
    const e = localStorage.getItem(yHe);
    return e ? JSON.parse(e) : {};
  } catch {
    return {};
  }
}

function qIt(e) {
  try {
    localStorage.setItem(yHe, JSON.stringify(e));
  } catch (t) {
    console.warn("[materialLibraryBackupOssIndex] LS 写入失败:", t);
  }
}

async function bHe() {
  try {
    const {
      localCacheManager: e
    } = await Ie(async () => {
      const {
        localCacheManager: t
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: t
      };
    }, void 0, import.meta.url);
    return String(e.getDirectoryPathTauri() || "").trim() || null;
  } catch {
    return null;
  }
}

function oZ() {
  return Tae || (s5e(IIn()), Tae ?? {});
}

async function CIn() {
  return Zpe || (Zpe = (async () => {
    const e = await bHe();
    await lIt({
      cacheRoot: e,
      loadMaterialBackupLs: () => {
        try {
          return localStorage.getItem(yHe);
        } catch {
          return null;
        }
      },
      loadMaterialGlobalLs: () => {
        try {
          return localStorage.getItem("qiaodoumayi_material_lib_global_oss_index");
        } catch {
          return null;
        }
      },
      loadDedupLs: () => {
        try {
          return localStorage.getItem("qiaodoumayi_global_oss_upload_dedup_v1");
        } catch {
          return null;
        }
      }
    });
    const t = await c5n("backup", e);
    if (t.length > 0) {
      const n = {};
      for (const r of t) !r.pathKey || !r.remoteUrl || (n[r.pathKey] = {
        remoteUrl: r.remoteUrl,
        ...(r.displayUrl ? {
          displayUrl: r.displayUrl
        } : {}),
        updatedAt: r.updatedAt || Date.now()
      });
      Tae = n, kbe = null;
    } else Tae || s5e(IIn());
  })().catch(e => console.warn("[materialLibraryBackupOssIndex] hydrate failed:", e)).finally(() => {
    Zpe = null;
  }), Zpe);
}

function K6r(e, t) {
  (async () => {
    const n = await bHe();
    if (n) try {
      await Ole("backup", [{
        pathKey: e,
        remoteUrl: t.remoteUrl,
        displayUrl: t.displayUrl ?? null,
        updatedAt: t.updatedAt
      }], n);
      return;
    } catch (a) {
      console.warn("[materialLibraryBackupOssIndex] SQL upsert failed, fallback LS:", a);
    }
    const r = oZ();
    qIt(r);
  })();
}

function KIt(e) {
  var n;
  const t = WIt(oZ(), e);
  return !((n = t == null ? void 0 : t.remoteUrl) != null && n.trim()) || !nr(t.remoteUrl) ? null : t;
}

function QIt(e) {
  var n;
  const t = (n = KIt(e)) == null ? void 0 : n.remoteUrl;
  return t ? ya(t) : null;
}

function EIn(e) {
  var r;
  const t = KIt(e);
  if (!t) return null;
  const n = (r = t.displayUrl) == null ? void 0 : r.trim();
  return n && nr(n) ? ya(n) : t.remoteUrl ? ya(t.remoteUrl) : null;
}

function TIn(e) {
  var a, i;
  const t = String(e || "").trim().split("?")[0];
  if (!t) return null;
  const n = oZ();
  if (!kbe) {
    const o = new Map();
    for (const s of Object.values(n)) {
      const l = (a = s.displayUrl) == null ? void 0 : a.trim().split("?")[0];
      l && ((i = s.remoteUrl) != null && i.trim()) && !o.has(l) && o.set(l, s.remoteUrl);
    }
    kbe = o;
  }
  const r = kbe.get(t);
  return r ? ya(r) : null;
}

function YIt(e, t, n) {
  const r = ya(String(t || "").trim());
  if (!e || !nr(r)) return;
  const a = String(n || "").trim(),
    i = a && nr(a) ? ya(a) : "",
    o = {
      ...oZ()
    },
    s = gU(e),
    l = WIt(o, e),
    d = {
      remoteUrl: r,
      ...(i ? {
        displayUrl: i
      } : l != null && l.displayUrl ? {
        displayUrl: l.displayUrl
      } : {}),
      updatedAt: Date.now()
    };
  o[s] = d, s5e(o), K6r(s, d);
}

function XIt(e) {
  if (!e || Object.keys(e).length === 0) return;
  const t = {
      ...oZ()
    },
    n = Date.now(),
    r = [];
  for (const [a, i] of Object.entries(e)) {
    const o = ya(String(i || "").trim());
    if (!a || !nr(o)) continue;
    const s = gU(a),
      l = WIt(t, a),
      d = {
        remoteUrl: o,
        ...(l != null && l.displayUrl ? {
          displayUrl: l.displayUrl
        } : {}),
        updatedAt: n
      };
    t[s] = d, r.push({
      pathKey: s,
      entry: d
    });
  }
  s5e(t), r.length && (async () => {
    const a = await bHe();
    if (a) try {
      await Ole("backup", r.map(({
        pathKey: i,
        entry: o
      }) => ({
        pathKey: i,
        remoteUrl: o.remoteUrl,
        displayUrl: o.displayUrl ?? null,
        updatedAt: o.updatedAt
      })), a);
      return;
    } catch (i) {
      console.warn("[materialLibraryBackupOssIndex] batch SQL upsert failed, fallback LS:", i);
    }
    qIt(t);
  })();
}

function Q6r() {
  const e = {
    ...oZ()
  };
  let t = !1;
  for (const [n, r] of Object.entries(e)) {
    const a = ya(r.remoteUrl),
      i = r.displayUrl ? ya(r.displayUrl) : void 0;
    (a !== r.remoteUrl || i !== r.displayUrl) && (e[n] = {
      ...r,
      remoteUrl: a,
      ...(i ? {
        displayUrl: i
      } : {})
    }, t = !0);
  }
  t && (s5e(e), (async () => {
    const n = await bHe();
    if (n) try {
      await Ole("backup", Object.entries(e).map(([r, a]) => ({
        pathKey: r,
        remoteUrl: a.remoteUrl,
        displayUrl: a.displayUrl ?? null,
        updatedAt: a.updatedAt
      })), n);
      return;
    } catch (r) {
      console.warn("[materialLibraryBackupOssIndex] migrate SQL upsert failed, fallback LS:", r);
    }
    qIt(e);
  })());
}

const vHe = Object.freeze(Object.defineProperty({
  __proto__: null,
  MATERIAL_LIB_BACKUP_OSS_INDEX_KEY: yHe,
  getMaterialBackupOssIndexEntry: KIt,
  getMaterialBackupOssOriginalUrl: QIt,
  getMaterialBackupOssThumbUrl: EIn,
  hydrateMaterialBackupOssIndexFromSqlite: CIn,
  loadMaterialBackupOssIndex: oZ,
  lookupMaterialBackupOssRemoteByDisplayUrl: TIn,
  migrateMaterialBackupOssIndexEncoding: Q6r,
  normalizeMaterialAssetPathKey: gU,
  saveMaterialBackupOssIndexBatch: XIt,
  saveMaterialBackupOssIndexEntry: YIt
}, Symbol.toStringTag, {
  value: "Module"
}));

function MIn(e) {
  const t = String(e || "").trim().toLowerCase();
  return t ? t.startsWith("data:image/png") || /[?&]format,png(?:[/,]|$)/i.test(t) ? !0 : /\.png(?:$|\?|#)/i.test(t) : !1;
}

function Y6r(e) {
  return String((e == null ? void 0 : e.type) || "").toLowerCase().includes("png");
}

function X6r(e, t) {
  if (Y6r(t)) return !0;
  const n = String(e || "").trim().toLowerCase();
  return n ? !!(n.startsWith("data:image/png") || /\.png(?:$|\?|#)/i.test(n)) : !1;
}

function J6r(e, t, n) {
  const r = Math.max(0, Math.floor(t)),
    a = Math.max(0, Math.floor(n));
  if (r < 1 || a < 1) return !1;
  try {
    const i = e.getImageData(0, 0, r, a).data;
    for (let o = 3; o < i.length; o += 16) if (i[o] < 255) return !0;
  } catch {
    return !1;
  }
  return !1;
}

function zpt(e) {
  var n;
  if (X6r(e.imageData, e.blob)) return !0;
  const t = String(((n = e.blob) == null ? void 0 : n.type) || "").toLowerCase();
  return t.includes("jpeg") || t.includes("jpg") ? !1 : e.ctx && e.width && e.height ? J6r(e.ctx, e.width, e.height) : !1;
}

function PIn(e, t = 512) {
  const n = String(e || "").trim();
  if (!n || !/^https?:\/\//i.test(n)) return "";
  let r = n;
  try {
    const d = new URL(n);
    d.searchParams.delete("x-oss-process"), r = d.toString();
  } catch {
    r = n.replace(/([?&])x-oss-process=[^&#]*/gi, "$1").replace(/[?&]$/, "");
  }
  const a = r.indexOf("#"),
    i = a >= 0 ? r.slice(0, a) : r,
    o = a >= 0 ? r.slice(a) : "",
    s = Math.max(64, Math.min(2048, Math.round(Number(t) || 512))),
    l = i.includes("?") ? "&" : "?";
  return `${i}${l}x-oss-process=image/resize,l_${s}/format,png${o}`;
}

async function Z6r(e) {
  if (e.blobUrl) {
    const t = e.blobUrl;
    let n = !1;
    try {
      n = (await fetch(t, {
        cache: "no-store"
      })).ok;
    } catch {
      n = !1;
    }
    if (!n && e.blobUrl === t) {
      try {
        URL.revokeObjectURL(e.blobUrl);
      } catch {}
      e.blobUrl = "";
    }
  }
  return e.blobUrl || (e.blobUrl = URL.createObjectURL(e.blob)), e.blobUrl;
}

function JIt(e) {
  return e.refCount = (e.refCount || 0) + 1, e.createdAt = Date.now(), e.blobUrl;
}

function RIn(e) {
  const t = String(e || "").trim();
  if (t.startsWith("blob:")) {
    for (const n of AY()) if (n.blobUrl === t) {
      if (n.refCount = Math.max(0, (n.refCount || 1) - 1), n.refCount <= 0) {
        try {
          URL.revokeObjectURL(n.blobUrl);
        } catch {}
        n.blobUrl = "", n.refCount = 0, IE.delete(n);
      }
      return;
    }
    try {
      URL.revokeObjectURL(t);
    } catch {}
  }
}

function rLe(e) {
  const t = String(e || "").trim();
  if (t.startsWith("blob:")) {
    for (const n of AY()) if (n.blobUrl === t) {
      JIt(n);
      return;
    }
  }
}

const LS = new Map(),
  IE = new Set();

function AY() {
  return [...LS.values(), ...IE];
}

function ZIt(e) {
  if (e.blobUrl) try {
    URL.revokeObjectURL(e.blobUrl);
  } catch {}
  for (const [t, n] of LS) n === e && LS.delete(t);
  IE.delete(e);
}

function $Ht(e, t) {
  const n = LS.get(e);
  n && n !== t && (n.refCount > 0 ? IE.add(n) : ZIt(n)), LS.set(e, t);
}

const Aet = new Map(),
  eCt = 14400 * 1e3,
  Iet = 64,
  Cet = 160 * 1024 * 1024;

function Ule(e) {
  return ya(e.trim()) || e.trim();
}

function wHe(e) {
  const t = Ule(e),
    n = t.includes("/thumbnails/") ? "t" : t.includes("/videos/") ? "v" : t.includes("/images/") ? "i" : "o";
  let r = 0;
  for (let a = 0; a < t.length; a++) r = (r << 5) - r + t.charCodeAt(a) | 0;
  try {
    const i = new URL(t).pathname.split("/").filter(Boolean).slice(-2).join("_").slice(0, 48);
    return `oss_${n}_${Math.abs(r).toString(36)}_${i.replace(/[^\w.\-]+/g, "_")}`;
  } catch {
    return `oss_${n}_${Math.abs(r).toString(36)}`;
  }
}

function eMr(e, t) {
  if (t && t !== "application/octet-stream") return t;
  const n = e.toLowerCase();
  return n.includes(".webp") ? "image/webp" : n.includes(".png") ? "image/png" : n.includes(".jpeg") || n.includes(".jpg") ? "image/jpeg" : n.includes(".gif") ? "image/gif" : n.includes(".webm") ? "video/webm" : n.includes(".mov") ? "video/quicktime" : n.includes(".mp4") || n.includes("/videos/") ? "video/mp4" : n.includes("/thumbnails/") ? "image/webp" : "application/octet-stream";
}

function tMr(e, t) {
  if (!t.startsWith("video/") && e.includes("/thumbnails/")) return "thumbnails";
}

function nMr(e) {
  return SY(e);
}

async function rMr(e, t) {
  if (t === !0) return !0;
  if (t === !1 || !nMr(e)) return !1;
  try {
    const {
      isGlobalOssUploadEnabled: n
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: r
      } = await Promise.resolve().then(() => Ah);
      return {
        isGlobalOssUploadEnabled: r
      };
    }, void 0, import.meta.url);
    return n();
  } catch {
    return !1;
  }
}

function Upt() {
  let e = 0;
  for (const a of AY()) e += a.blob.size;
  if (LS.size + IE.size <= Iet && e <= Cet) return;
  const t = Iet * 3,
    n = Cet * 4,
    r = AY().sort((a, i) => a.createdAt - i.createdAt);
  for (const a of r) {
    if (LS.size + IE.size <= Iet && e <= Cet) break;
    a.refCount > 0 && LS.size + IE.size <= t && e <= n || (ZIt(a), e = Math.max(0, e - a.blob.size));
  }
}

function NIn() {
  const e = Date.now();
  let t = 0;
  for (const n of AY()) e - n.createdAt < eCt || n.refCount > 0 || (ZIt(n), t += 1);
  return Upt(), t;
}

function aMr() {
  let e = 0;
  const t = LS.size + IE.size;
  for (const n of AY()) if (e += n.blob.size, !!n.blobUrl) try {
    URL.revokeObjectURL(n.blobUrl);
  } catch {}
  return LS.clear(), IE.clear(), {
    entries: t,
    bytes: e
  };
}

async function iMr(e, t) {
  var o, s, l;
  const n = new Set(),
    r = [];
  for (const d of e) {
    const u = String(d || "").trim();
    !u || n.has(u) || (n.add(u), r.push(u));
  }
  if (r.length === 0) return null;
  const a = t ? Ule(t) : "",
    i = d => {
      if (!a) return !0;
      const u = String(d || "").trim();
      return u ? Ule(u) === a : !1;
    };
  try {
    const {
      localCacheManager: d
    } = await Ie(async () => {
      const {
        localCacheManager: u
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: u
      };
    }, void 0, import.meta.url);
    typeof d.ensureRestored == "function" && (await d.ensureRestored());
    for (const u of r) if (d.isAvailable() && d.hasAsset(u)) {
      const h = (o = d.getManifest()) == null ? void 0 : o.assets[u];
      if (!i(h == null ? void 0 : h.remoteUrl)) continue;
      const p = await d.readAsset(u);
      if ((s = p == null ? void 0 : p.blob) != null && s.size) return p.blob;
    }
  } catch {}
  try {
    const {
      assetStore: d
    } = await Ie(async () => {
      const {
        assetStore: u
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: u
      };
    }, void 0, import.meta.url);
    await d.init();
    for (const u of r) {
      const h = await d.getAssetRecord(u);
      if ((l = h == null ? void 0 : h.blob) != null && l.size && i(h.remoteUrl)) return h.blob;
    }
  } catch {}
  return null;
}

async function GHt(e, t) {
  const n = Ule(e);
  if (Nb(n)) return null;
  try {
    const {
      downloadWithFallback: r
    } = await Ie(async () => {
      const {
        downloadWithFallback: a
      } = await Promise.resolve().then(() => El);
      return {
        downloadWithFallback: a
      };
    }, void 0, import.meta.url);
    return await r(n, t);
  } catch (r) {
    return _j(r) && cY(n), null;
  }
}

async function xHe(e, t) {
  const n = String(e || "").trim();
  if (!n) return null;
  if (!nr(n)) return n;
  if (ei()) return tHe(n, t != null && t.assetId ? [t.assetId] : void 0);
  if (Nb(n)) return null;
  const r = Ule(n);
  if (t != null && t.forceNetwork) {
    const s = t.downloadTimeoutMs ?? (r.includes("/videos/") ? 3e5 : 12e4),
      l = await GHt(r, s);
    if (!(l != null && l.size)) return null;
    const d = URL.createObjectURL(l);
    return $Ht(r, {
      blob: l,
      blobUrl: d,
      createdAt: Date.now(),
      refCount: 1
    }), Upt(), d;
  }
  const a = LS.get(r);
  if (a && Date.now() - a.createdAt < eCt) return JIt(a), (async () => {
    try {
      return await Z6r(a);
    } catch (s) {
      throw a.blobUrl ? RIn(a.blobUrl) : (a.refCount = Math.max(0, a.refCount - 1), a.refCount === 0 && IE.delete(a)), s;
    }
  })();
  const i = Aet.get(r);
  if (i) {
    const s = await i;
    return rLe(s), s;
  }
  const o = (async () => {
    const {
      assetStore: s
    } = await Ie(async () => {
      const {
        assetStore: b
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: b
      };
    }, void 0, import.meta.url);
    let l = (t != null && t.assetId ? await iMr([t.assetId], r) : null) || (await s.getAssetBlobByRemoteUrl(r));
    if (!l || !l.size) {
      const b = (t == null ? void 0 : t.downloadTimeoutMs) ?? (r.includes("/videos/") ? 3e5 : 9e4);
      l = await GHt(r, b);
    }
    if (!l || !l.size) return null;
    const d = eMr(r, l.type),
      u = (t == null ? void 0 : t.assetId) || wHe(r),
      h = tMr(r, d),
      p = typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window);
    let m = !1;
    if (!(await rMr(r, t == null ? void 0 : t.skipPersist))) {
      try {
        const {
          localCacheManager: b,
          ensureCacheRootReadyForWrite: v
        } = await Ie(async () => {
          const {
            localCacheManager: _,
            ensureCacheRootReadyForWrite: w
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: _,
            ensureCacheRootReadyForWrite: w
          };
        }, void 0, import.meta.url);
        await v(), b.isAvailable() && (m = await b.saveAsset(u, l, d, r, h));
      } catch {}
      if (p && m) s.saveBlobAsset(u, l, r, h, {
        silent: !0
      }).catch(() => {});else try {
        await s.saveBlobAsset(u, l, r, h, {
          silent: !0
        });
      } catch {}
    }
    const y = URL.createObjectURL(l);
    return $Ht(r, {
      blob: l,
      blobUrl: y,
      createdAt: Date.now(),
      refCount: 1
    }), Upt(), y;
  })();
  Aet.set(r, o);
  try {
    return await o;
  } finally {
    Aet.delete(r);
  }
}

async function jIn(e, t) {
  const n = String(e || "").trim();
  return n ? nr(n) && (await xHe(n, t)) || n : void 0;
}

function $le(e) {
  return ei() || E0() ? !1 : nr(String(e || "").trim());
}

function DIn(e) {
  const t = String(e || "").trim();
  if (!nr(t)) return null;
  const n = Ule(t),
    r = LS.get(n);
  return !r || Date.now() - r.createdAt >= eCt || !r.blobUrl ? null : (JIt(r), r.blobUrl);
}

function oMr() {
  let e = 0,
    t = 0,
    n = 0;
  for (const r of AY()) e += r.blob.size, t += r.refCount || 0, (r.refCount || 0) > 0 && (n += 1);
  return {
    entries: LS.size + IE.size,
    bytes: e,
    refCountSum: t,
    pinnedEntries: n
  };
}

const l3 = Object.freeze(Object.defineProperty({
    __proto__: null,
    acquireOssSessionBlobRef: rLe,
    cleanupExpiredOssUrlSessionCache: NIn,
    clearOssUrlLocalMemoryCache: aMr,
    getOssSessionCacheAudit: oMr,
    ossUrlToCacheAssetId: wHe,
    peekOssSessionDisplayUrl: DIn,
    releaseOssDisplayUrl: RIn,
    resolveOssPublicUrlForDisplay: xHe,
    shouldMapOssUrlForDisplay: $le,
    toLocalDisplayUrlIfOss: jIn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  _i = "_ossRemoteUrl",
  Pi = "_ossThumbnailUrl",
  Cl = "_ossUrlOnlyMode",
  kD = "previewMjOssRemoteUrls",
  T0 = "_ossUploading",
  h7 = "_cropSplitPending",
  tne = new Map(),
  sMr = 256;

function LIn(e) {
  const t = String(e || "").trim();
  return t ? ya(t) || t : "";
}

function LK(e, t) {
  const n = LIn(e);
  if (!n) return;
  const r = t.then(a => {
    const i = ya(a) || String(a || "").trim();
    return i && !/\/thumbnails\//i.test(i) ? i : null;
  }).catch(() => null);
  for (tne.delete(n), tne.set(n, r); tne.size > sMr;) {
    const a = tne.keys().next().value;
    if (!a) break;
    tne.delete(a);
  }
}

async function tCt(e) {
  const t = LIn(e);
  if (!t) return null;
  const n = A0(t);
  return n && !/\/thumbnails\//i.test(n) ? ya(n) || n : tne.get(t) || null;
}

function nr(e) {
  const t = bb(String(e || "").trim());
  return /^https?:\/\//i.test(t) ? /aliyuncs\.com/i.test(t) || /res\.cloudinary\.com/i.test(t) || N$(t) ? !0 : /\/canvas-materials\/(?:images|thumbnails|videos|Music)\//i.test(t) : !1;
}

function Ko(e) {
  const t = String(e || "").trim();
  return !t || !/^https?:\/\//i.test(t) ? !1 : /athena-haicong-llm-external\.oss/i.test(t) || /\/haiyi\//i.test(t) && /aliyuncs\.com/i.test(t);
}

function ff(e) {
  const t = String(e || "").trim();
  return !!t && nr(t) && !Ko(t);
}

function Iy(e) {
  const t = String(e || "").trim();
  return t ? /\/thumbnails\//i.test(t) || /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(t) : !1;
}

function gx(e) {
  const t = String(e || "").trim();
  return !t || !nr(t) || Iy(t) || Qc(t) ? !1 : /\/images\//i.test(t);
}

function Due(e) {
  const t = String(e || "").trim();
  return t && (/\/images\//i.test(t) && /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(t) ? t.replace(/\/images\//i, "/thumbnails/") : t);
}

function SY(e) {
  const t = String(e || "").trim(),
    n = ya(t) || t;
  return !(!n || !nr(n) || Iy(n) || /\/videos\//i.test(n) || /\/Music\//i.test(n) || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(n));
}

function lMr(e) {
  const t = String(e || "").trim();
  return !(!/^https?:\/\//i.test(t) || nr(t));
}

function _He(e) {
  if (ei()) return !1;
  const t = e.settings || {},
    n = typeof e.content == "string" ? e.content.trim() : "";
  if (e.type === "input-image") {
    if (S0(e)) return !0;
    const r = typeof t[Pi] == "string" ? String(t[Pi]).trim() : "";
    return !!(nr(r) || nr(n));
  }
  if (e.type === "preview") {
    if (nr(n)) return !0;
    const r = e.previewMjImages;
    return !!(Array.isArray(r) && r.some(a => nr(String(a || "").trim())));
  }
  if (e.type === "gen-image" || e.type === "gen-video") {
    const r = Bm(e);
    return !!(nr(r) || nr(n));
  }
  if (e.type === "gen-3d") {
    const r = typeof t._ossThumbnailUrl == "string" ? String(t._ossThumbnailUrl).trim() : typeof t.ossThumbnailUrl == "string" ? String(t.ossThumbnailUrl).trim() : "",
      a = typeof t._ossRemoteUrl == "string" ? String(t._ossRemoteUrl).trim() : "";
    return !!(nr(r) || nr(a) || nr(n));
  }
  if (e.type === "video-input") {
    const r = typeof t._ossThumbnailUrl == "string" ? String(t._ossThumbnailUrl).trim() : typeof t.ossThumbnailUrl == "string" ? String(t.ossThumbnailUrl).trim() : "";
    return !!(nr(r) || nr(n));
  }
  return !1;
}

function QE(e) {
  const t = String(e || "").trim();
  return !t || !/^https?:\/\//i.test(t) ? !1 : /(?:\?|&)vframe\/jpg\b/i.test(t) || /(?:\?|&)x-oss-process=video\/snapshot\b/i.test(t);
}

function $pt(e) {
  return /[?&](?:Expires|OSSAccessKeyId|Signature|x-oss-signature|x-oss-credential)=/i.test(String(e || ""));
}

function nCt(e) {
  const t = String(e || "").trim();
  if (!t || !/^https?:\/\//i.test(t) || !QE(t)) return t;
  try {
    const n = new URL(t),
      r = n.search.replace(/^\?/, "").split("&").filter(a => a && !/^vframe\/jpg\b/i.test(a) && !/^x-oss-process=/i.test(a));
    return n.search = r.length ? `?${r.join("&")}` : "", `${n.origin}${n.pathname}${n.search}${n.hash}`;
  } catch {
    return t.split(/[?#]/, 1)[0] || t;
  }
}

function kHe(e) {
  const t = ya(String(e || "").trim()) || String(e || "").trim();
  if (!t || !nr(t) || Ko(t)) return "";
  if (QE(t)) return t;
  if (!iy(t)) return "";
  try {
    const n = new URL(t);
    n.search = "";
    const r = `${n.origin}${n.pathname}`;
    let a = mo();
    return /aliyuncs\.com/i.test(t) ? a = "aliyun-oss" : N$(t) && (a = "qiniu"), a === "qiniu" ? `${r}?vframe/jpg/offset/1/w/512` : a === "aliyun-oss" ? `${r}?x-oss-process=video/snapshot,t_1000,f_jpg,w_512,h_0,m_fast` : "";
  } catch {
    return "";
  }
}

function tl(e) {
  if (typeof e != "string" || !e) return !1;
  if (e.startsWith("data:image") || e.startsWith("blob:") || QE(e)) return !0;
  const t = e.toLowerCase();
  return t.startsWith("data:video/") ? !1 : /^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(e) || e.startsWith("asset:") ? /\.(jpe?g|png|webp|gif|bmp)(\?|$)/i.test(t) || /preview_|thumbnails?|\/thumbs?\//i.test(t) : /\.(jpe?g|png|webp|gif|bmp)(\?|$)/i.test(t) || t.includes("/thumbnails/");
}

function iy(e) {
  if (typeof e != "string" || !e || QE(e)) return !1;
  const t = e.toLowerCase();
  return /^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(e) || e.startsWith("asset:") ? /\.(mp4|webm|mov|m4v)(\?|$)/i.test(t) || /videos?[%/\\]/i.test(t) || /(?:^|[_%])(?:vidu_|huya_video|video)/i.test(t) : t.startsWith("blob:") || t.startsWith("data:video/") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(t) || t.includes("/videos/");
}

function $o(e) {
  return iy(e);
}

function Ay(...e) {
  for (const t of e) {
    const n = String(t || "").trim();
    if (n && tl(n) && !iy(n)) return ya(n) || n;
  }
  return "";
}

const RO = new Map(),
  cMr = 1e3;

function ya(e) {
  const t = bb(String(e || "").trim());
  if (!t || !nr(t)) return t;
  const n = RO.get(t);
  if (n !== void 0) return n;
  let r;
  try {
    const a = new URL(t),
      o = "/" + a.pathname.split("/").filter(s => s.length > 0).map(s => encodeURIComponent(decodeURIComponent(s))).join("/");
    r = `${a.origin}${o}${a.search}${a.hash}`;
  } catch {
    r = t;
  }
  if (RO.size >= cMr) {
    const a = RO.keys().next().value;
    a !== void 0 && RO.delete(a);
  }
  return RO.set(t, r), r;
}

function S0(e) {
  const t = e.settings;
  if (t != null && t[Cl]) return !0;
  if (!ua()) return !1;
  const n = typeof e.content == "string" ? e.content.trim() : "";
  return nr(n) && !!(t != null && t[_i]);
}

