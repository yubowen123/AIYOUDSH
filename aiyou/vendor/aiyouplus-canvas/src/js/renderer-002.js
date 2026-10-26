function Lue(e) {
  const t = e.settings,
    n = String(e._contentAssetId || "").trim(),
    r = Array.isArray(t == null ? void 0 : t._mjPreviewAssetIds) ? t._mjPreviewAssetIds.map(a => String(a || "").trim()).filter(Boolean) : [];
  return !!(t && (typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || n || r.length > 0 || typeof t._blobUrl == "string" && t._blobUrl.trim().startsWith("blob:") || typeof t._canvasDisplayPreviewUrl == "string" && t._canvasDisplayPreviewUrl.trim().startsWith("blob:") || typeof t._localOriginalUrlHint == "string" && t._localOriginalUrlHint.trim() || typeof t._materialLibraryPath == "string" && t._materialLibraryPath.trim() || typeof t.editImageCommittedPreview == "string" && t.editImageCommittedPreview.trim()));
}

function AHe(e) {
  var r;
  if (!e) return;
  const t = e.settings;
  return String(typeof (t == null ? void 0 : t._contentAssetId) == "string" && t._contentAssetId.trim() || typeof e._contentAssetId == "string" && ((r = e._contentAssetId) == null ? void 0 : r.trim()) || typeof (t == null ? void 0 : t._assetId) == "string" && t._assetId.trim() || typeof (t == null ? void 0 : t._localCacheAssetId) == "string" && t._localCacheAssetId.trim() || "").trim() || void 0;
}

function SHe(e) {
  const t = AHe(e);
  if (!t) return null;
  if (ua() && !ei()) {
    if (S0(e) || (e.type === "gen-image" || e.type === "gen-video") && Zo(e)) return null;
    if (e.type === "input-image") {
      const a = Vh(e);
      if (a && nr(a)) return null;
      const i = typeof e.content == "string" ? e.content.trim() : "";
      if (SY(i) || nr(i)) return null;
    }
    const n = e.settings,
      r = String((n == null ? void 0 : n[_i]) || (n == null ? void 0 : n._ossRemoteUrl) || "").trim();
    if (r && nr(r)) return null;
  }
  return Lue(e) ? `local-asset://${t}` : S0(e) ? null : `local-asset://${t}`;
}

function Oue(e) {
  if (e.type !== "input-image") return !1;
  if (S0(e)) return !0;
  if (!ua()) return !1;
  const t = typeof e.content == "string" ? e.content.trim() : "";
  return !(!nr(t) || Lue(e));
}

function dMr(e) {
  if (!ua()) return !1;
  const t = e.nodeSettings || {};
  if (t[Cl] || t._globalOssUrlOnly) return !0;
  const n = t[kD];
  if (Array.isArray(n) && n.some(a => nr(String(a || "")))) return !0;
  for (const a of e.connectedGenImageNodes || []) {
    const i = a.settings || {};
    if (i[Cl] || i._globalOssUrlOnly) return !0;
    const o = String(i[_i] || "").trim();
    if (nr(o)) return !0;
  }
  for (const a of e.connectedInputImageNodes || []) if (Oue(a) || S0(a)) return !0;
  const r = e.previewImageUrls || [];
  return !!(r.length > 0 && r.every(a => nr(String(a || "").trim())));
}

function uMr(e, t, n) {
  return {
    previewGridRows: 1,
    previewGridCols: 1,
    _isStoryboardMosaic: !0,
    _stitchedFullUrl: e,
    _stitchedPreviewUrl: t,
    [Cl]: !0,
    _globalOssUrlOnly: !0,
    [_i]: e,
    [Pi]: t,
    disableThumbnailCreationOnImport: !0,
    ...n
  };
}

function Mae(e) {
  if (!e || e.type !== "preview") return null;
  const t = e.settings || {};
  return t._isStoryboardMosaic && (typeof t._stitchedFullUrl == "string" ? t._stitchedFullUrl.trim() : "") || null;
}

function rCt(e) {
  if (!e || e.type !== "preview") return;
  const t = e.settings || {},
    n = e._contentAssetId,
    r = typeof t._contentAssetId == "string" ? t._contentAssetId.trim() : "";
  return n && n.trim() || r || void 0;
}

function aCt(e, t) {
  return {
    mediaType: "image",
    _mosaicRefFull: e,
    _mosaicRefPreview: t,
    [Cl]: !0,
    [_i]: e,
    [Pi]: t,
    disableThumbnailCreationOnImport: !0
  };
}

function hMr(e) {
  const t = e.settings,
    n = [typeof (t == null ? void 0 : t._historySelectedOriginalUrl) == "string" ? String(t._historySelectedOriginalUrl).trim() : "", typeof (t == null ? void 0 : t[_i]) == "string" ? String(t[_i]).trim() : "", typeof e.content == "string" ? e.content.trim() : ""];
  for (const r of n) if (r && MIn(r) && nr(r) && !/\/thumbnails\//i.test(r)) return r;
  return "";
}

function _f(e) {
  const t = e.settings,
    n = hMr(e);
  if (n && mo(sc()) === "aliyun-oss") {
    const s = PIn(n, 512);
    if (s) return s;
  }
  const r = typeof (t == null ? void 0 : t._historySelectedThumbUrl) == "string" ? t._historySelectedThumbUrl.trim() : "";
  if (r && /^https?:\/\//i.test(r)) return ym(r) || r;
  const a = typeof (t == null ? void 0 : t[Pi]) == "string" ? t[Pi].trim() : "";
  if (a && /^https?:\/\//i.test(a) && !zg(a)) return ym(a) || a;
  const i = typeof (t == null ? void 0 : t._canvasDisplayPreviewUrl) == "string" ? t._canvasDisplayPreviewUrl.trim() : "";
  if (i && Af(i)) return i;
  const o = typeof e.content == "string" ? e.content.trim() : "";
  if (zg(o)) return "";
  if (Af(o)) return o;
  if (/^https?:\/\//i.test(o) && !vs(o)) {
    const s = ym(o);
    return s || (/\/images\//i.test(o) && !/\/thumbnails\//i.test(o) && !Qc(o) ? "" : o);
  }
  return o.startsWith("blob:") ? Nd(o) ? o : "" : o.startsWith("data:") || o && !vs(o) ? o : "";
}

function OIn(e) {
  const t = String(e || "").trim();
  return t && (nr(t) && /\/thumbnails\//i.test(t) ? Vg(t) : t);
}

function Vg(e) {
  const t = String(e || "").trim();
  if (!t || !/\/thumbnails\//i.test(t)) return t;
  const n = A0(t) || JVe(t);
  if (n && nr(n) && !Iy(n)) return ya(n) || n;
  const r = t.replace(/\/thumbnails\//i, "/images/");
  return /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(r) ? t : r;
}

function Wh(e) {
  const t = String(e || "").trim();
  if (!t || !nr(t)) return null;
  let n = ya(t) || t;
  if (Ad(n)) return null;
  if (n = Cp(n) || n, /\/thumbnails\//i.test(n) || Iy(n)) {
    const r = Go(n);
    if (!r) return null;
    n = Cp(r) || r;
  }
  return !gf(n) && !/\/music\//i.test(n) && Qc(t), n;
}

function Go(e) {
  const t = String(e || "").trim();
  if (!t || !nr(t)) return null;
  const n = ya(t) || t;
  if (Ad(n)) return null;
  const r = /\/images\//i.test(n) && /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(n);
  if (gf(n) && !r) return Cp(n) || n;
  const a = /\/thumbnails\//i.test(n) ? n : r ? Due(n) : "";
  if (!a) return null;
  const i = A0(a);
  if (i && gf(i) && !Ad(i)) return ya(i) || i;
  const o = TIn(a);
  if (o && gf(o) && !Ad(o)) return ya(o) || o;
  const s = JVe(a);
  if (s && gf(s) && !Ad(s)) return ya(s) || s;
  const l = EHe(a);
  return l && gf(l) && !Ad(l) ? ya(l) || l : null;
}

function IHe(e) {
  const t = String(e || "").trim();
  if (!t || !nr(t)) return {
    display: "",
    remote: ""
  };
  const n = ya(t) || t,
    r = /\/images\//i.test(n) && /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(n),
    a = /\/thumbnails\//i.test(n) ? n : r ? Due(n) : Dwe(n) || "";
  let i = "";
  return gx(n) ? i = n : a && (i = Go(a) || ""), i && Iy(i) && (i = ""), {
    display: a || i && Dwe(i) || "" || (i ? ym(i) : "") || (/\/thumbnails\//i.test(n) ? n : "") || i || (/\/thumbnails\//i.test(n) ? n : ""),
    remote: i
  };
}

function l5e(e) {
  return Math.max(0, Number(e.selectedMjImageIndex ?? 0));
}

function OM(e, t) {
  var i, o;
  const n = t ?? l5e(e),
    r = (i = e.mjThumbnails) == null ? void 0 : i[n];
  if (r && tl(r)) return ya(r) || r;
  const a = (o = e.mjImages) == null ? void 0 : o[n];
  if (a && nr(a) && /\/thumbnails\//i.test(a)) return ya(a) || a;
  if (n === 0) {
    const s = jg(e);
    if (s) return s;
  }
  return a && tl(a) ? ya(a) || a : null;
}

function aLe(e) {
  const t = String(e || "").trim();
  return t ? !!(/\/thumbnails\//i.test(t) || /-list\.webp(?:$|\?)/i.test(t) || Af(t)) : !1;
}

function eme(e) {
  const t = String(e || "").trim();
  if (!t || aLe(t)) return null;
  if (nr(t)) {
    if (/x-oss-process=image\/crop/i.test(t)) return ya(t) || t;
    const n = Wh(t) || Go(t);
    return !n || aLe(n) ? null : ya(n) || n;
  }
  return t;
}

function M0(e, t) {
  var i, o;
  const n = t ?? l5e(e),
    r = (i = e.mjImages) == null ? void 0 : i[n],
    a = (o = e.mjThumbnails) == null ? void 0 : o[n];
  if (r) {
    const s = eme(r);
    if (s) return s;
    if (nr(r) && aLe(r)) {
      const l = Go(r),
        d = eme(l);
      if (d) return d;
    }
  }
  if (a) {
    const s = eme(a);
    if (s) return s;
    if (nr(a)) {
      const l = Go(a),
        d = eme(l);
      if (d) return d;
    }
  }
  if (r) {
    const s = String(r).trim();
    if (!aLe(s) && (s.startsWith("blob:") || s.startsWith("data:") || !nr(s) && s.length > 0)) return s;
  }
  if (n === 0) {
    const s = Bd(e);
    return eme(s) || s;
  }
  return null;
}

function Sj(e) {
  if (e.mjImages && e.mjImages.length > 1) {
    const n = M0(e);
    if (n) return n;
  }
  if (e.type === "video") for (const n of [e._ossRemoteUrl, e.originalUrl, e.url]) {
    if (!n || !nr(n) || e._globalOssUrlOnly && Ad(n)) continue;
    const r = ya(n) || n;
    if (/\/videos\//i.test(r)) return r;
  }
  if (e.type === "audio") {
    for (const n of [e._ossRemoteUrl, e.originalUrl, e.url, e.audioUrl]) if (!(!n || !nr(n)) && !(e._globalOssUrlOnly && Ad(n))) return ya(n) || n;
  }
  const t = Bd(e);
  if (t) return t;
  for (const n of [e._ossRemoteUrl, e.originalUrl, e.url, e._ossThumbnailUrl, e.thumbnailUrl]) {
    if (e._globalOssUrlOnly && n && Ad(n)) continue;
    const r = Go(n);
    if (r) {
      if (e._globalOssUrlOnly && Ad(r)) continue;
      return r;
    }
  }
  return null;
}

function H4(e) {
  return e._globalOssUrlOnly ? !0 : !e.ossUploaded && !ua() ? !1 : Q$(e);
}

function iLe(e) {
  const t = String(e || "").trim();
  return !t || !ua() || !nr(t) ? t : (/\/thumbnails\//i.test(t) || /\/images\//i.test(t)) && ya(t) || t;
}

function oH(e) {
  const t = String(e || "").trim();
  if (!t || !nr(t)) return null;
  const n = ya(t) || t;
  if (QE(n) || tl(n)) return null;
  if ($o(n) || /\/videos\//i.test(n) && !QE(n)) return n;
  const r = A0(n);
  if (r) {
    const i = oH(r);
    if (i) return i;
  }
  const a = Go(t);
  if (a) {
    const i = oH(a);
    if (i) return i;
  }
  return null;
}

function P0(e, t) {
  if (!e || e.type !== "gen-video") return null;
  const n = e.settings || {},
    r = Math.max(0, t ?? Number(n.selectedMjImageIndex ?? 0)),
    a = n.generatedImages || [];
  for (const d of [_i, "previewOssRemoteUrl"]) {
    const u = oH(typeof n[d] == "string" ? String(n[d]).trim() : "");
    if (u) return u;
  }
  if (a.length > 0) {
    const d = a[Math.min(r, a.length - 1)];
    for (const h of [d == null ? void 0 : d.fullUrl, d == null ? void 0 : d.url]) {
      const p = oH(h);
      if (p) return p;
    }
    const u = oH(d == null ? void 0 : d.thumbUrl);
    if (u) return u;
  }
  const i = typeof n[Pi] == "string" ? String(n[Pi]).trim() : "",
    o = oH(i);
  if (o) return o;
  const s = String(e.content || "").trim(),
    l = oH(s);
  return l || null;
}

function pMr(e) {
  const t = String(e || "").trim();
  return !t || !nr(t) || Ad(t) ? null : /\/thumbnails\//i.test(t) ? Go(t) : gf(t) ? ya(t) || t : null;
}

function mMr(e, t) {
  const n = Math.max(0, Math.floor(t)),
    a = (e.generatedImages || [])[n];
  if (!a) return null;
  for (const i of [a.fullUrl, a.url, a.thumbUrl]) {
    const o = pMr(i);
    if (o) return o;
  }
  return null;
}

function Zo(e, t) {
  var p;
  if (!e) return null;
  if (e.type === "gen-video") return P0(e, t);
  if (e.type !== "gen-image") return null;
  const n = e.settings || {},
    r = n.generatedImages || [],
    a = Array.isArray(n.generationVersions) ? n.generationVersions : [];
  if (typeof t == "number" && Number.isFinite(t)) {
    const m = mMr(n, t);
    if (m) return m;
    const f = r.length > 1 || a.length > 1,
      y = Math.max(0, Number(n.selectedMjImageIndex ?? n.activeGenerationVersionIndex ?? 0));
    if (f && Math.floor(t) !== y) return null;
  }
  const i = Math.max(0, t ?? Number(n.selectedMjImageIndex ?? 0)),
    o = [typeof n[Pi] == "string" ? String(n[Pi]).trim() : "", String(e.content || "").trim(), String(((p = r[Math.min(i, Math.max(r.length - 1, 0))]) == null ? void 0 : p.thumbUrl) || "").trim(), typeof e.thumbnailUrl == "string" ? e.thumbnailUrl.trim() : ""].filter((m, f, y) => !!m && y.indexOf(m) === f),
    s = Array.isArray(n.generationVersions) ? n.generationVersions : [],
    l = s.length > 1;
  for (const m of o) {
    if (!nr(m) || !/\/thumbnails\//i.test(m)) continue;
    const f = A0(m);
    if (f && nr(f) && !/\/thumbnails\//i.test(f) && !Ad(f)) return ya(f) || f;
  }
  if (s.length > 0) {
    const m = Math.max(0, Math.min(Number(n.activeGenerationVersionIndex ?? 0), s.length - 1)),
      f = b => {
        const v = [String(b.ossThumbnailUrl || "").trim(), String(b.thumbnailUrl || "").trim(), String(b.content || "").trim()].filter(Boolean);
        return o.some(_ => {
          if (v.includes(_)) return !0;
          if (!nr(_)) return !1;
          const w = ya(_) || _;
          return v.some(k => nr(k) ? (ya(k) || k) === w : !1);
        });
      },
      y = s.find(f) || (l ? null : s[m]);
    if (y) {
      for (const b of [String(y.ossRemoteUrl || "").trim(), String(y.originalUrl || "").trim()]) if (b && nr(b) && !/\/thumbnails\//i.test(b) && !Ad(b)) return ya(b) || b;
    }
    if (l && o.some(b => /\/thumbnails\//i.test(b))) return null;
  }
  if (r.length > 0) {
    const m = r[Math.min(i, r.length - 1)],
      f = String((m == null ? void 0 : m.fullUrl) || (m == null ? void 0 : m.url) || "").trim();
    if (f && nr(f)) {
      if (/\/thumbnails\//i.test(f)) {
        const b = A0(f);
        if (b && nr(b) && !/\/thumbnails\//i.test(b) && !Ad(b)) return ya(b) || b;
        if (!l) {
          const v = Go(f);
          if (v) return v;
        }
      } else if (gf(f)) return ya(f) || f;
    }
    const y = String((m == null ? void 0 : m.thumbUrl) || "").trim();
    if (y && nr(y)) {
      const b = A0(y);
      if (b && nr(b) && !/\/thumbnails\//i.test(b) && !Ad(b)) return ya(b) || b;
      if (!l) {
        const v = Go(y);
        if (v) return v;
      }
    }
  }
  const d = typeof n[_i] == "string" ? String(n[_i]).trim() : "",
    u = typeof n[Pi] == "string" ? String(n[Pi]).trim() : "",
    h = !l || !o.length || u && o.includes(u);
  if (d && nr(d) && h) {
    const m = Go(d) || (gf(d) ? ya(d) || d : null);
    if (m) return m;
  }
  if (n[Cl]) {
    const m = String(e.content || "").trim();
    if (m && nr(m)) {
      const f = A0(m);
      if (f && gf(f) && !Ad(f)) return ya(f) || f;
      if (!l) {
        const y = Go(m);
        if (y) return y;
      }
      if (gf(m)) return ya(m) || m;
    }
  }
  return null;
}

function Bm(e, t) {
  if (!e || e.type !== "gen-image" && e.type !== "gen-video") return null;
  const n = e.settings || {},
    r = Math.max(0, t ?? Number(n.selectedMjImageIndex ?? 0)),
    a = e.type === "gen-video",
    i = n.generatedImages || [];
  if (i.length > 0) {
    const h = i[Math.min(r, i.length - 1)],
      p = String((h == null ? void 0 : h.thumbUrl) || "").trim();
    if (p && nr(p)) if (a) {
      const m = Ay(p);
      if (m) return m;
    } else {
      const m = ym(p);
      if (m && (!/\/images\//i.test(m) || Qc(m) || /\/thumbnails\//i.test(m))) return m;
    }
  }
  const o = typeof n[Pi] == "string" ? String(n[Pi]).trim() : "";
  if (o && nr(o)) if (a) {
    const h = Ay(o);
    if (h) return h;
  } else {
    const h = ym(o);
    if (h) return h;
  }
  const s = typeof e.videoPosterUrl == "string" ? String(e.videoPosterUrl).trim() : "",
    l = typeof n.videoPosterUrl == "string" ? String(n.videoPosterUrl).trim() : "";
  if (a) {
    const h = Ay(s, l);
    if (h) return h;
  }
  const d = String(e.content || "").trim();
  if (d && nr(d) && !Ko(d)) {
    if (a) return Ay(d) || null;
    const h = ym(d);
    if (h && (/\/thumbnails\//i.test(h) || Qc(h) || !/\/images\//i.test(h))) return h;
  }
  const u = typeof n[_i] == "string" ? String(n[_i]).trim() : "";
  return !a && u && ff(u) && (/\/images\//i.test(u) || /\/thumbnails\//i.test(u)) && ym(u) || null;
}

function gf(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
  const n = ya(t) || t;
  return !n || !nr(n) || /\/thumbnails\//i.test(n) || /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(n) ? !1 : /\/images\//i.test(n) || /\/videos\//i.test(n);
}

function SA(e, t, n) {
  const r = String(n || "").trim();
  if (!r) return;
  let a = ya(r) || r;
  a = Cp(a) || a, !(!a || e.has(a) || !gf(a)) && (Qc(a) || (e.add(a), t.push(a)));
}

let GH = null,
  jV = [],
  Pae = null,
  Rae = null,
  bz = [],
  oLe = "",
  W9e = null,
  q9e = null,
  K9e = null,
  Q9e = null,
  Abe = null,
  nne = null,
  Gpt = !1;

function fMr(e) {
  Rae = e, CHe();
}

function iCt(e) {
  if (!(e != null && e.length)) return;
  const t = new Map(bz.map(r => [String(r.id), r]));
  let n = !1;
  for (const r of e) {
    const a = String((r == null ? void 0 : r.id) || "").trim();
    if (!a) continue;
    const i = t.get(a);
    if (!i) {
      t.set(a, r), n = !0;
      continue;
    }
    const o = Z4(r._ossRemoteUrl) || i._ossRemoteUrl;
    (o !== i._ossRemoteUrl || r.thumbnailUrl !== i.thumbnailUrl || r._ossThumbnailUrl !== i._ossThumbnailUrl) && (t.set(a, {
      ...i,
      ...r,
      _ossRemoteUrl: o || r._ossRemoteUrl || i._ossRemoteUrl,
      originalUrl: Z4(r.originalUrl) || i.originalUrl
    }), n = !0);
  }
  !n && t.size === bz.length || (bz = [...t.values()], CHe());
}

function BIn() {
  const e = new Map(),
    t = n => {
      const r = String((n == null ? void 0 : n.id) || "").trim();
      if (!r || !n) return;
      const a = e.get(r);
      if (!a) {
        e.set(r, n);
        return;
      }
      e.set(r, {
        ...a,
        ...n,
        _ossRemoteUrl: Z4(n._ossRemoteUrl) || Z4(a._ossRemoteUrl) || n._ossRemoteUrl || a._ossRemoteUrl,
        originalUrl: Z4(n.originalUrl) || Z4(a.originalUrl) || n.originalUrl || a.originalUrl,
        thumbnailUrl: n.thumbnailUrl || a.thumbnailUrl,
        _ossThumbnailUrl: n._ossThumbnailUrl || a._ossThumbnailUrl
      });
    };
  for (const n of bz) t(n);
  for (const n of Rae || []) t(n);
  if (e.size === 0) for (const n of oCt()) t(n);
  return [...e.values()];
}

function Z4(e) {
  const t = String(e || "").trim();
  if (!t || !nr(t) || /\/thumbnails\//i.test(t) || Iy(t)) return "";
  const n = Cp(ya(t) || t) || t;
  return !gf(n) || Qc(n) || Ad(n) || Ko(n) ? "" : n;
}

function gMr(e) {
  const t = String(e || "").trim();
  return !t || !nr(t) ? "" : (Cp(ya(t) || t) || t).split("?")[0];
}

function FIn(e) {
  const t = gMr(e);
  if (!t) return [];
  const n = new Set([t]),
    r = t.match(/^(.*-list)\.(webp|jpe?g|png)$/i);
  if (r) for (const a of ["jpg", "jpeg", "webp", "png"]) n.add(`${r[1]}.${a}`);
  return [...n];
}

function CHe() {
  oLe = "", W9e = null, q9e = null, K9e = null, Q9e = null, Abe = null;
}

function zIn(e) {
  var t, n;
  return `${bz.length}|${(Rae == null ? void 0 : Rae.length) || 0}|${e.length}|${((t = e[0]) == null ? void 0 : t.id) || ""}|${((n = e[e.length - 1]) == null ? void 0 : n.id) || ""}`;
}

function UIn(e) {
  const t = zIn(e);
  if (oLe === t && W9e && q9e && K9e && Q9e) return {
    exact: W9e,
    prefix: q9e,
    display: K9e,
    logical: Q9e
  };
  const n = new Map(),
    r = new Map(),
    a = new Map(),
    i = new Map(),
    o = new Set(),
    s = new Set(),
    l = (h, p) => {
      const m = pIt(h);
      if (!m) return;
      const f = i.get(m);
      f && f !== p ? s.add(m) : f || i.set(m, p);
    },
    d = h => {
      const p = Z4(h);
      p && (Lwe(dU(p), p, n, r, o), l(p, p));
    },
    u = (h, p) => {
      const m = String(h || "").trim();
      if (m) for (const f of FIn(m)) !f || !/\/thumbnails\//i.test(f) && !Iy(f) || (a.has(f) || a.set(f, p), Lwe(dU(f), p, n, r, o), l(f, p));
    };
  for (const h of e) {
    const p = [Z4(h._ossRemoteUrl), Z4(h.originalUrl), Z4(h.url), ...(Array.isArray(h.mjImages) ? h.mjImages.map(f => Z4(f)) : [])].filter(Boolean),
      m = p[0] || "";
    for (const f of p) d(f);
    if (m) {
      if (u(h.thumbnailUrl, m), u(h._ossThumbnailUrl, m), u(h.url, m), Array.isArray(h.mjThumbnails)) for (const f of h.mjThumbnails) u(f, m);
      Array.isArray(h.mjImages) && h.mjImages.forEach((f, y) => {
        const b = Z4(f),
          v = (Array.isArray(h.mjThumbnails) ? h.mjThumbnails[y] : "") || "";
        b && v && u(v, b);
      });
    }
  }
  for (const h of o) r.delete(h);
  for (const h of s) i.delete(h);
  return oLe = t, W9e = n, q9e = r, K9e = a, Q9e = i, Abe = null, {
    exact: n,
    prefix: r,
    display: a,
    logical: i
  };
}

function yMr(e) {
  const t = zIn(e);
  if (oLe === t && Abe) return Abe;
  UIn(e);
  const n = new Map();
  for (const r of e) {
    const a = String(r.id || "").trim();
    a && !n.has(a) && n.set(a, r);
    const i = String(r._assetId || "").trim();
    i && !n.has(i) && n.set(i, r);
    const o = r._mjAssetIds;
    if (Array.isArray(o)) for (const s of o) {
      const l = String(s || "").trim();
      l && !n.has(l) && n.set(l, r);
    }
  }
  return Abe = n, n;
}

function EHe(e, t) {
  const n = String(e || "").trim();
  if (!n || !nr(n) || !/\/thumbnails\//i.test(n) && !Iy(n)) return null;
  const r = t || BIn();
  if (!r.length) return null;
  const {
    exact: a,
    prefix: i,
    display: o,
    logical: s
  } = UIn(r);
  for (const h of FIn(n)) {
    const p = o.get(h) || "";
    if (p && gf(p)) return p;
  }
  const l = dU(n);
  if (l && l.length >= 8) {
    const h = a.get(l) ?? i.get(l) ?? "";
    if (h && gf(h)) return h;
  }
  const d = pIt(n),
    u = d && s.get(d) || "";
  return u && gf(u) ? u : null;
}

async function sLe() {
  if (!(Gpt && bz.length > 0)) {
    if (nne) {
      await nne;
      return;
    }
    nne = (async () => {
      try {
        const {
            loadAllHistoryPages: e
          } = await Ie(async () => {
            const {
              loadAllHistoryPages: n
            } = await Promise.resolve().then(() => Gu);
            return {
              loadAllHistoryPages: n
            };
          }, void 0, import.meta.url),
          t = await e({
            pageSize: 500,
            mediaType: "image"
          });
        iCt(t.items.map(n => _Ct(n))), Gpt = bz.length > 0;
      } catch (e) {
        console.warn("[globalOssMaterial] 全量历史 OSS 反查索引失败:", e);
      }
    })();
    try {
      await nne;
    } finally {
      nne = null;
    }
  }
}

function Vpt(e) {
  if (Pae) return Pae;
  const t = new Map();
  for (const n of e) {
    const r = String(n.id || "").trim();
    r && !t.has(r) && t.set(r, n);
    const a = String(n._assetId || "").trim();
    a && !t.has(a) && t.set(a, n);
    const i = n._mjAssetIds;
    if (Array.isArray(i)) for (const o of i) {
      const s = String(o || "").trim();
      s && !t.has(s) && t.set(s, n);
    }
  }
  return Pae = t, t;
}

function oCt() {
  try {
    const e = eEt("qiaodoumayi_history");
    if (!e) return GH !== null && (GH = null, jV = [], Pae = null), jV;
    if (e === GH) return jV;
    const t = JSON.parse(e);
    return GH = e, jV = Array.isArray(t) ? t : [], Pae = null, CHe(), jV;
  } catch {
    return jV;
  }
}

function sCt(e) {
  const t = n => {
    const r = Wh(n);
    return !r || !gf(r) || e._globalOssUrlOnly && Ad(r) || Qc(r) ? null : r;
  };
  for (const n of [e._ossRemoteUrl, e.originalUrl]) {
    if (Ko(n)) continue;
    const r = t(n);
    if (r) return r;
    if (n && e._globalOssUrlOnly && Ad(n)) continue;
    const a = t(Go(n));
    if (a) return a;
  }
  for (const n of [e._ossThumbnailUrl, e.thumbnailUrl, e.url]) {
    if (!n || !ff(n) || e._globalOssUrlOnly && Ad(n)) continue;
    const r = t(A0(n));
    if (r) return r;
    const a = t(n);
    if (a) return a;
    const i = t(Go(n));
    if (i) return i;
  }
  return null;
}

function OK(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  const n = BIn();
  if (n.length) {
    const a = yMr(n).get(t);
    if (a) return a;
  }
  const r = oCt();
  return r.length ? Vpt(r).get(t) ?? null : null;
}

const $In = "_historyMjSlotIndex",
  OS = "_historySourceTaskId";

function GIn(e) {
  const t = e.settings,
    n = t == null ? void 0 : t[$In];
  if (typeof n == "number" && Number.isFinite(n)) return Math.max(0, Math.floor(n));
}

function Sbe(e, t) {
  const n = GIn(e);
  return n !== void 0 && t.mjImages && t.mjImages.length > 1 ? M0(t, n) : sCt(t);
}

function Bue(e) {
  var r;
  const t = e.settings;
  return String(typeof (t == null ? void 0 : t._localCacheAssetId) == "string" && t._localCacheAssetId.trim() || typeof (t == null ? void 0 : t._assetId) == "string" && t._assetId.trim() || typeof (t == null ? void 0 : t._contentAssetId) == "string" && t._contentAssetId.trim() || typeof e._contentAssetId == "string" && ((r = e._contentAssetId) == null ? void 0 : r.trim()) || e.id).trim() || void 0;
}

function IY(e) {
  if (e.type !== "input-image") return;
  const t = e.settings,
    n = typeof (t == null ? void 0 : t[_i]) == "string" ? String(t[_i]).trim() : "";
  if (!n || !nr(n)) return;
  const r = Cp(ya(n) || n) || n;
  if (gf(r) && !Qc(r)) return r;
  const a = /\/thumbnails\//i.test(r) ? r : Due(r);
  if (!/\/thumbnails\//i.test(a)) return;
  const i = Go(a);
  if (i && gf(i)) return ya(i) || i;
  const o = A0(_f(e));
  if (o && gf(o)) return ya(o) || o;
  const s = typeof (t == null ? void 0 : t[Pi]) == "string" ? String(t[Pi]).trim() : "";
  if (s) {
    const u = A0(s);
    if (u && gf(u)) return ya(u) || u;
  }
  const l = Bue(e);
  if (l) {
    const u = OK(l);
    if (u) {
      const h = Sbe(e, u);
      if (h) return h;
    }
  }
  const d = String((t == null ? void 0 : t[OS]) || "").trim();
  if (d) {
    const u = OK(d);
    if (u) {
      const h = Sbe(e, u);
      if (h) return h;
    }
  }
}

function Vh(e) {
  const t = IY(e);
  if (t) return t;
  const n = e.settings,
    r = typeof (n == null ? void 0 : n[_i]) == "string" ? String(n[_i]).trim() : "";
  if (!(!r || !/^https?:\/\//i.test(r)) && !(/\/thumbnails\//i.test(r) || /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(r))) return r;
}

function c5e(e) {
  if (e.type !== "input-image") return [];
  const t = e.settings,
    n = new Set(),
    r = [],
    a = typeof (t == null ? void 0 : t._historySelectedOriginalUrl) == "string" ? String(t._historySelectedOriginalUrl).trim() : "";
  SA(n, r, a), SA(n, r, IY(e)), SA(n, r, Vh(e));
  const i = typeof (t == null ? void 0 : t._materialLibraryPath) == "string" ? String(t._materialLibraryPath).trim() : "";
  i && SA(n, r, QIt(i));
  const o = _f(e);
  SA(n, r, A0(o)), SA(n, r, Go(o));
  const s = typeof (t == null ? void 0 : t[Pi]) == "string" ? String(t[Pi]).trim() : "";
  s && (SA(n, r, A0(s)), SA(n, r, Go(s)));
  const l = typeof e.content == "string" ? e.content.trim() : "";
  l && nr(l) && (SA(n, r, A0(l)), SA(n, r, Go(l)));
  const d = Bue(e);
  if (d) {
    const p = OK(d);
    p && SA(n, r, Sbe(e, p));
  }
  const u = String((t == null ? void 0 : t[OS]) || "").trim();
  if (u) {
    const p = OK(u);
    p && SA(n, r, Sbe(e, p));
  }
  const h = OK(e.id);
  return h && SA(n, r, Sbe(e, h)), r;
}

function wP(e) {
  return c5e(e)[0] || "";
}

function G$(e) {
  return c5e(e)[0] || void 0;
}

function VH(e, t) {
  const n = ya(String(e || "").trim());
  return !n || !nr(n) ? "" : t === "image" ? Vg(n) : n;
}

function lLe(e, t, n, r) {
  if (!e) return "";
  const a = e[kD];
  if (Array.isArray(a) && n && Array.isArray(r)) {
    const s = r.findIndex(l => String(l || "").trim() === String(n).trim());
    if (s >= 0) {
      const l = String(a[s] || "").trim();
      if (l && nr(l)) return VH(l, t) || ya(l) || l;
    }
  }
  if (t === "video") {
    const s = String(e[_i] || "").trim(),
      l = VH(s, "video");
    if (l) return l;
    const d = String(e.previewOssRemoteUrl || "").trim();
    return d && nr(d) && /\/videos\//i.test(d) ? ya(d) || d : "";
  }
  const i = String(e.previewOssRemoteUrl || "").trim();
  if (i && nr(i)) return VH(i, t) || ya(i) || i;
  const o = String(e[_i] || "").trim();
  return o && nr(o) ? VH(o, t) || ya(o) || o : "";
}

function lCt(e, t = {}) {
  var p, m, f, y;
  const n = String(e || "").trim(),
    r = t.mediaType ?? "image",
    a = ((p = t.previewNode) == null ? void 0 : p.settings) || {},
    i = Mae(t.previewNode);
  if (i && r === "image") {
    if (!ei() && a._ossUrlOnlyMode) {
      const b = String(a[_i] || a._ossRemoteUrl || "").trim();
      if (b && nr(b)) return VH(b, r) || ya(b) || b;
    }
    return i;
  }
  if (typeof t.imageIndex == "number" && t.imageIndex >= 0) {
    const b = a[kD];
    if (Array.isArray(b)) {
      const v = String(b[t.imageIndex] || "").trim();
      if (v && nr(v)) return VH(v, r) || ya(v) || v;
    }
  }
  const o = lLe(a, r, n, (m = t.previewNode) == null ? void 0 : m.previewMjImages);
  if (o) return o;
  for (const b of t.upstreamNodes || []) {
    if (b.type === "gen-image" || b.type === "gen-video") {
      const v = Zo(b);
      if (v) return r === "image" ? Vg(v) : v;
    }
    if (b.type === "topaz-upscale" || b.type === "jimeng-super-resolution" || b.type === "image-wash" || b.type === "fal-rembg" || b.type === "virtual-try-on") {
      const v = lLe(b.settings || {}, r);
      if (v) return v;
    }
  }
  if (n && nr(n) && /\/thumbnails\//i.test(n)) {
    const b = A0(n);
    if (b && gf(b)) return ya(b) || b;
  }
  const s = a.generatedImages || [],
    l = typeof t.imageIndex == "number" && t.imageIndex >= 0 ? t.imageIndex : 0,
    d = String(((f = s[l]) == null ? void 0 : f.fullUrl) || ((y = s[0]) == null ? void 0 : y.fullUrl) || "").trim(),
    u = String(a.originalResultUrl || "").trim(),
    h = d || u;
  return r === "image" && h && /^https?:\/\//i.test(h) && (n.startsWith("content_ref:") || n.startsWith("blob:")) ? nr(h) && (VH(h, r) || ya(h)) || h : n;
}

function V$(e, t = "image") {
  var i;
  if (e.type === "gen-image" || e.type === "gen-video") return Zo(e) || null;
  const n = e.settings || {},
    r = lLe(n, t);
  if (r) return r;
  const a = n.generatedImages || [];
  if (a.length > 0) {
    const o = String(((i = a[0]) == null ? void 0 : i.fullUrl) || "").trim();
    if (o && nr(o)) return t === "image" ? Vg(o) : o;
  }
  if (e.type === "input-image") {
    const o = G$(e);
    if (o) return o;
    const s = Vh(e);
    if (s) return t === "image" ? Vg(s) : s;
  }
  return null;
}

function dM(e, t, n) {
  const r = (n == null ? void 0 : n.mediaType) ?? "image",
    a = String(t ?? (typeof e.content == "string" ? e.content : "") ?? "").trim();
  if (e.type === "preview") return lCt(a, {
    previewNode: e,
    upstreamNodes: n == null ? void 0 : n.upstreamNodes,
    mediaType: r,
    imageIndex: n == null ? void 0 : n.imageIndex
  });
  if (e.type === "input-image" && r === "image") {
    const o = e.settings || {};
    if (String(o._localCacheAssetId || o._contentAssetId || o._assetId || "").trim() && (a.startsWith("blob:") || a.startsWith("data:"))) return a;
    const l = typeof o.editImageCommittedOssRemote == "string" ? ya(o.editImageCommittedOssRemote) || o.editImageCommittedOssRemote.trim() : "",
      d = typeof o.editImageCommittedPreview == "string" ? o.editImageCommittedPreview.trim() : "";
    if (l) return l;
    if (d) return d;
    const u = G$(e);
    if (u) return u;
  }
  const i = V$(e, r);
  if (i) return i;
  if (e.type === "gen-image" || e.type === "gen-video") {
    const o = Gle(e);
    if (o) return o;
  }
  return a;
}

async function Hpt(e, t = {}) {
  var _;
  const n = String(e || "").trim(),
    r = t.mediaType ?? "image",
    a = lCt(e, t);
  if (r === "image" && a !== n && !a.startsWith("blob:") && !a.startsWith("content_ref:")) return a;
  const i = t.previewNode,
    o = (i == null ? void 0 : i.settings) || {},
    s = Mae(i),
    l = rCt(i),
    {
      readPreviewWindowAssetOriginalUrl: d,
      readLocalCacheManifestAssetAsUrl: u
    } = await Ie(async () => {
      const {
        readPreviewWindowAssetOriginalUrl: w,
        readLocalCacheManifestAssetAsUrl: k
      } = await Promise.resolve().then(() => Ui);
      return {
        readPreviewWindowAssetOriginalUrl: w,
        readLocalCacheManifestAssetAsUrl: k
      };
    }, void 0, import.meta.url);
  if (s && r === "image") {
    if (ei() && l) try {
      const {
          localCacheManager: k
        } = await Ie(async () => {
          const {
            localCacheManager: C
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: C
          };
        }, void 0, import.meta.url),
        A = k.getCachedAssetUrlSync(l);
      if (A) return A;
      const S = await u(l);
      if (S) return S;
    } catch {}
    const w = await d(l, s);
    if (w) return w;
    if (s.startsWith("content_ref:") || s.startsWith("blob:") || s.startsWith("data:")) return s;
  }
  const h = typeof t.imageIndex == "number" && t.imageIndex >= 0 ? t.imageIndex : 0,
    p = i == null ? void 0 : i._previewMjAssetIds,
    m = typeof (p == null ? void 0 : p[h]) == "string" && ((_ = p[h]) == null ? void 0 : _.trim()) || typeof (i == null ? void 0 : i._contentAssetId) == "string" && i._contentAssetId.trim() || typeof o._contentAssetId == "string" && String(o._contentAssetId).trim() || void 0;
  if (n.startsWith("content_ref:")) {
    const w = await d(m, n);
    if (w) return w;
    try {
      const {
        contentStore: k
      } = await Ie(async () => {
        const {
          contentStore: S
        } = await Promise.resolve().then(() => Ly);
        return {
          contentStore: S
        };
      }, void 0, import.meta.url);
      await k.init();
      const A = await k.get(k.extractId(n));
      if (A) {
        if (m) {
          const S = await d(m, A);
          if (S) return S;
        }
        return A;
      }
    } catch {}
    return a;
  }
  if (!n.startsWith("blob:") || a !== n && !a.startsWith("blob:") || r !== "image") return a;
  const f = await d(m, n);
  if (f) return f;
  const y = typeof o._compactOriginalRelPath == "string" ? String(o._compactOriginalRelPath) : void 0,
    {
      getFullBlobUrlForDisplayUrl: b
    } = await Ie(async () => {
      const {
        getFullBlobUrlForDisplayUrl: w
      } = await Promise.resolve().then(() => No);
      return {
        getFullBlobUrlForDisplayUrl: w
      };
    }, void 0, import.meta.url);
  return (await b(e, m ?? null, y ?? null)) || a;
}

function bMr(e, t, n) {
  const r = t.filter(a => a.to === e && (!a.inputType || a.inputType === "default"));
  if (r.length !== 0) return n.find(a => a.id === r[0].from);
}

async function VIn(e, t, n, r, a) {
  const i = String(t || "").trim();
  if (!i) return "";
  const o = (a == null ? void 0 : a.mediaType) ?? "image";
  if (o === "image" && nr(i)) {
    const {
        upgradeOssUrlToOriginalForGenApi: h
      } = await Ie(async () => {
        const {
          upgradeOssUrlToOriginalForGenApi: m
        } = await Promise.resolve().then(() => LM);
        return {
          upgradeOssUrlToOriginalForGenApi: m
        };
      }, void 0, import.meta.url),
      p = h(i);
    if (p && p !== i) return p;
    if (!/\/thumbnails\//i.test(i)) return ya(i) || i;
  }
  const s = bMr(e, n, r);
  if (!s) return i.startsWith("content_ref:") ? Hpt(i, {
    mediaType: o
  }) : i;
  const l = dM(s, i, {
    mediaType: o
  });
  if (l !== i && !l.startsWith("blob:") && !l.startsWith("content_ref:")) return l;
  if (s.type === "preview") {
    const {
        getPreviewIncomingNodes: h
      } = await Ie(async () => {
        const {
          getPreviewIncomingNodes: m
        } = await Promise.resolve().then(() => FIt);
        return {
          getPreviewIncomingNodes: m
        };
      }, void 0, import.meta.url),
      p = h(s.id, r, n);
    return Hpt(i, {
      previewNode: s,
      upstreamNodes: p,
      mediaType: o
    });
  }
  if (s.type === "gen-image" || s.type === "gen-video") {
    const {
        resolveGenNodeOriginalUrlForCropExpand: h
      } = await Ie(async () => {
        const {
          resolveGenNodeOriginalUrlForCropExpand: m
        } = await Promise.resolve().then(() => LM);
        return {
          resolveGenNodeOriginalUrlForCropExpand: m
        };
      }, void 0, import.meta.url),
      p = await h(s, i);
    if (p) return p;
  }
  const d = s.settings || {},
    u = String((a == null ? void 0 : a.assetId) || "").trim() || (s.type === "input-image" ? String(d._localCacheAssetId || d._contentAssetId || d._assetId || s._contentAssetId || "").trim() : "") || (await Ie(async () => {
      const {
        resolveAssetIdForGenNodeDisplay: h
      } = await Promise.resolve().then(() => LM);
      return {
        resolveAssetIdForGenNodeDisplay: h
      };
    }, void 0, import.meta.url)).resolveAssetIdForGenNodeDisplay(s, i) || void 0;
  if (u && o === "image") {
    const {
        readLocalOriginalAssetAsUrl: h
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetAsUrl: m
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetAsUrl: m
        };
      }, void 0, import.meta.url),
      p = typeof d._localOriginalUrlHint == "string" ? String(d._localOriginalUrlHint).trim() : void 0;
    try {
      const m = await h(u, p);
      if (m) return m;
    } catch {}
  }
  if (i.startsWith("blob:") || i.startsWith("content_ref:") || i.startsWith("data:")) {
    const h = typeof d._compactOriginalRelPath == "string" ? String(d._compactOriginalRelPath) : null,
      {
        getFullBlobUrlForDisplayUrl: p
      } = await Ie(async () => {
        const {
          getFullBlobUrlForDisplayUrl: f
        } = await Promise.resolve().then(() => No);
        return {
          getFullBlobUrlForDisplayUrl: f
        };
      }, void 0, import.meta.url),
      m = await p(i, u ?? null, h);
    if (m) return m;
  }
  if (i.startsWith("content_ref:")) try {
    const {
      contentStore: h
    } = await Ie(async () => {
      const {
        contentStore: m
      } = await Promise.resolve().then(() => Ly);
      return {
        contentStore: m
      };
    }, void 0, import.meta.url);
    await h.init();
    const p = await h.get(h.extractId(i));
    if (p) return p;
  } catch {}
  return l || i;
}

function cLe(e) {
  if (!ua()) return [];
  const t = [],
    n = r => {
      const a = ya(String(r || "").trim()) || String(r || "").trim();
      a && /^https?:\/\//i.test(a) && t.push(a);
    };
  if (e.type === "input-image") return n(_f(e)), [...new Set(t)];
  if (e.type === "gen-image" || e.type === "gen-video") {
    const a = (e.settings || {}).generatedImages || [];
    for (const o of a) {
      n(o == null ? void 0 : o.thumbUrl);
      const s = String((o == null ? void 0 : o.fullUrl) || (o == null ? void 0 : o.url) || "").trim();
      s && nr(s) && /\/thumbnails\//i.test(s) && n(s);
    }
    n(Bm(e));
    const i = String(e.content || "").trim();
    return nr(i) && n(i), [...new Set(t)];
  }
  return [];
}

const Wpt = new WeakMap();

function HIn(e) {
  if (e) {
    Wpt.delete(e);
    return;
  }
}

function Vv(e) {
  const t = ei(),
    n = ua(),
    r = Wpt.get(e);
  if (r && r.settings === e.settings && r.content === e.content && r.localCacheMode === t && r.ossUploadEnabled === n) return r.result;
  const a = p => (Wpt.set(e, {
    settings: e.settings,
    content: e.content,
    localCacheMode: t,
    ossUploadEnabled: n,
    result: p
  }), p);
  if (e.type === "input-image") {
    const p = AIn(e);
    if (p) return a(p);
  }
  const i = e.settings,
    o = e.type === "input-image" && fHe(e),
    s = typeof (i == null ? void 0 : i._blobUrl) == "string" ? i._blobUrl.trim() : "",
    l = SHe(e);
  if (!o && ua() && !t) {
    const p = IY(e);
    if (p) return a(p);
    const m = Vh(e);
    if (m) return a(ya(m) || m);
  }
  if (!o && t && l) return a(l);
  if (!o && t) {
    const p = typeof e.content == "string" ? e.content.trim() : "";
    if (p && (p.startsWith("blob:") && Nd(p) || vs(p))) return a(p);
  }
  if (!o && (s.startsWith("blob:") || s.startsWith("data:")) && !(s.startsWith("blob:") && !Nd(s))) return a(s);
  if (l) return a(l);
  const d = IY(e);
  if (d) return a(d);
  const u = Vh(e);
  if (u) return a(ya(u) || u);
  const h = _f(e);
  return a(nr(h) && ya(h) || h);
}

function dLe(e) {
  const t = wP(e);
  if (t) return t;
  const n = e.settings,
    r = typeof (n == null ? void 0 : n._blobUrl) == "string" ? n._blobUrl.trim() : "";
  if (r.startsWith("data:") || r.startsWith("blob:") && Nd(r)) return r;
  const a = typeof e.content == "string" ? e.content.trim() : "";
  return !a || nr(a) && /\/thumbnails\//i.test(a) ? "" : a.startsWith("data:") || a.startsWith("blob:") && Nd(a) ? a : a.startsWith("blob:") ? "" : a;
}

async function vMr(e, t) {
  const n = ya(e) || e;
  if (!gf(n)) return null;
  const {
    resolveOssPublicUrlForDisplay: r
  } = await Ie(async () => {
    const {
      resolveOssPublicUrlForDisplay: a
    } = await Promise.resolve().then(() => l3);
    return {
      resolveOssPublicUrlForDisplay: a
    };
  }, void 0, import.meta.url);
  return r(n, {
    assetId: t,
    skipPersist: !0,
    downloadTimeoutMs: 12e4,
    forceNetwork: !0
  });
}

async function L1(e) {
  const t = Bue(e),
    n = c5e(e),
    r = S0(e),
    a = ei() && !r,
    i = async () => {
      const l = e.settings,
        d = n[0] || Vh(e),
        u = typeof (l == null ? void 0 : l._compactOriginalRelPath) == "string" ? String(l._compactOriginalRelPath).trim() : "",
        h = [t, l == null ? void 0 : l._localCacheAssetId, l == null ? void 0 : l._contentAssetId, l == null ? void 0 : l._assetId, e._contentAssetId].map(f => String(f || "").trim()).filter(Boolean);
      if (t) {
        const {
          readLocalOriginalAssetAsUrl: f,
          readLocalOriginalAssetBlob: y,
          resolveLocalCachedDisplayUrls: b
        } = await Ie(async () => {
          const {
            readLocalOriginalAssetAsUrl: v,
            readLocalOriginalAssetBlob: _,
            resolveLocalCachedDisplayUrls: w
          } = await Promise.resolve().then(() => Ui);
          return {
            readLocalOriginalAssetAsUrl: v,
            readLocalOriginalAssetBlob: _,
            resolveLocalCachedDisplayUrls: w
          };
        }, void 0, import.meta.url);
        try {
          const v = await f(t, d);
          if (v && Mk(v)) return v;
        } catch {}
        try {
          const v = await b(t);
          if (v != null && v.originalUrl && Mk(v.originalUrl)) return v.originalUrl;
        } catch {}
        try {
          const v = await y(t, d);
          if (v != null && v.size) return URL.createObjectURL(v);
        } catch {}
      }
      try {
        const {
          assetStore: f
        } = await Ie(async () => {
          const {
            assetStore: y
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: y
          };
        }, void 0, import.meta.url);
        await f.init();
        for (const y of h) {
          const b = await f.getAssetUrl(y);
          if (b && Mk(b)) return b;
        }
      } catch {}
      const p = dLe(e),
        m = p.startsWith("blob:") || p.startsWith("data:") ? p : typeof e.content == "string" && (e.content.startsWith("blob:") || e.content.startsWith("data:")) ? e.content.trim() : typeof (l == null ? void 0 : l._blobUrl) == "string" && l._blobUrl.startsWith("blob:") ? l._blobUrl.trim() : "";
      if (m) {
        const {
          getFullBlobForDisplayUrl: f,
          ensureResolvableBlobUrl: y
        } = await Ie(async () => {
          const {
            getFullBlobForDisplayUrl: v,
            ensureResolvableBlobUrl: _
          } = await Promise.resolve().then(() => No);
          return {
            getFullBlobForDisplayUrl: v,
            ensureResolvableBlobUrl: _
          };
        }, void 0, import.meta.url);
        for (const v of h) {
          const _ = await f(m, v, u || null);
          if (_) return URL.createObjectURL(_);
        }
        const b = await y(m, h, u ? [u] : []);
        if (b) return b;
      }
      return "";
    };
  if (a) {
    const l = await i();
    return l || "";
  }
  if ((r || E0()) && n.length > 0) {
    const l = Cp(n[0]) || n[0];
    if (l && nr(l) && !/\/thumbnails\//i.test(l)) return l;
  }
  if (t) {
    const {
        readLocalOriginalAssetAsUrl: l,
        resolveLocalCachedDisplayUrls: d
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetAsUrl: p,
          resolveLocalCachedDisplayUrls: m
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetAsUrl: p,
          resolveLocalCachedDisplayUrls: m
        };
      }, void 0, import.meta.url),
      u = await l(t);
    if (u) return u;
    const h = await d(t);
    if (h != null && h.originalUrl) return h.originalUrl;
  }
  for (const l of n) {
    const d = await vMr(l, t);
    if (d) return d;
  }
  if (n.length === 0 && t) {
    const {
        readLocalOriginalAssetBlob: l
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetBlob: u
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetBlob: u
        };
      }, void 0, import.meta.url),
      d = await l(t);
    if (d != null && d.size) return URL.createObjectURL(d);
  }
  let o = dLe(e);
  const {
    contentStore: s
  } = await Ie(async () => {
    const {
      contentStore: l
    } = await Promise.resolve().then(() => Ly);
    return {
      contentStore: l
    };
  }, void 0, import.meta.url);
  if (o && s.isContentRef(o)) try {
    await s.init();
    const l = await s.get(s.extractId(o));
    l && (o = l);
  } catch (l) {
    console.warn("[globalOssMaterial] content_ref 解析失败:", l);
  }
  if (t) {
    const {
        readLocalOriginalAssetBlob: l
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetBlob: h
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetBlob: h
        };
      }, void 0, import.meta.url),
      d = n[0] || Vh(e),
      u = await l(t, d);
    if (u != null && u.size) return URL.createObjectURL(u);
  }
  if (nr(o) && /\/thumbnails\//i.test(o)) return "";
  if (o != null && o.startsWith("blob:") && t) {
    const {
        ensureResolvableBlobUrl: l
      } = await Ie(async () => {
        const {
          ensureResolvableBlobUrl: u
        } = await Promise.resolve().then(() => No);
        return {
          ensureResolvableBlobUrl: u
        };
      }, void 0, import.meta.url),
      d = await l(o, [t]);
    return d || "";
  }
  return o;
}

function Bd(e) {
  const t = sCt(e);
  if (t) return t;
  if (!ua() && !e._globalOssUrlOnly) {
    const n = LVe(e);
    if (n.remoteUrl && gf(n.remoteUrl) && e.ossUploaded) return ya(n.remoteUrl) || n.remoteUrl;
  }
  for (const n of [e._ossRemoteUrl, e.originalUrl, e.url]) {
    if (!n || !ff(n) || e._globalOssUrlOnly && Ad(n)) continue;
    const r = Wh(n);
    if (r && !/\/thumbnails\//i.test(r) && !Qc(r)) return r;
    const a = Wh(Go(n));
    if (a) {
      if (e._globalOssUrlOnly && Ad(a) || Ko(a)) continue;
      if (!Qc(a)) return a;
    }
  }
  return null;
}

function vz(e) {
  return String(e || "").trim().split("?")[0];
}

function Ij(e) {
  const t = oCt();
  if (!t.length) return null;
  const n = e.settings || {},
    r = e._contentAssetId || (typeof n._contentAssetId == "string" ? n._contentAssetId.trim() : "") || (typeof n._assetId == "string" ? n._assetId.trim() : "");
  if (r) {
    const h = Vpt(t).get(r);
    if (h && (jHe(e) || String(h.sourceNodeId || "") === String(e.id))) return h;
  }
  const a = Vpt(t).get(String(e.id));
  if (a) return a;
  const i = new Set(),
    o = vz(String(e.content || ""));
  o && i.add(o);
  const s = n.generatedImages || [];
  for (const h of s) for (const p of [h.fullUrl, h.url, h.thumbUrl]) {
    const m = vz(String(p || ""));
    m && i.add(m);
  }
  const l = t.filter(h => String(h.sourceNodeId || "") === String(e.id) && (!h.status || h.status === "completed"));
  if (!l.length) return null;
  const d = l.filter(h => {
    if (!i.size) return !0;
    const p = vz(h.url || "");
    return p && [...i].some(m => m === p);
  });
  return (d.length ? d : l).sort((h, p) => new Date(p.time || 0).getTime() - new Date(h.time || 0).getTime())[0];
}

function Gle(e) {
  const t = Ij(e);
  return !t || !t.ossUploaded && !t._globalOssUrlOnly ? null : Bd(t);
}

function Zu(e) {
  const t = String(e || "").trim();
  if (!t || !nr(t) || Ad(t) || Ko(t) || Iy(t)) return null;
  const n = Wh(t) || Cp(t) || t;
  if (Qc(n) && !/x-oss-process=image\/crop/i.test(n)) return null;
  const r = Wh(n) || ya(n) || n;
  return !r || Iy(r) || Ko(r) ? null : r;
}

function xP(e) {
  const t = (e.mjImages || []).map(n => Zu(n)).filter(n => !!n);
  return t.length > 1 && new Set(t).size === t.length;
}

function Cj(e) {
  var o, s;
  if (xP(e)) return e;
  const t = (e.mjImages || []).map(l => Zu(l) || Zu(Wh(l)) || "");
  if (t.length > 1 && t.every(Boolean) && new Set(t).size === t.length) {
    const l = Math.min(Math.max(0, Number(e.selectedMjImageIndex ?? 0)), t.length - 1);
    return {
      ...e,
      mjImages: t,
      selectedMjImageIndex: l,
      _ossRemoteUrl: t[l] || t[0],
      originalUrl: t[l] || t[0],
      mjOriginalUrl: t[0],
      _globalOssUrlOnly: !0,
      ossUploaded: !0
    };
  }
  if (e.type !== "video" && t.length > 1 && t.every(Boolean) && new Set(t).size === 1) {
    const l = t[0];
    return {
      ...e,
      mjImages: void 0,
      mjThumbnails: void 0,
      selectedMjImageIndex: 0,
      _ossRemoteUrl: l,
      originalUrl: l,
      mjOriginalUrl: l,
      _globalOssUrlOnly: !0,
      ossUploaded: !0
    };
  }
  if (!Zu(e._ossRemoteUrl)) {
    const l = t.find(Boolean);
    if (l) return {
      ...e,
      _ossRemoteUrl: l,
      originalUrl: e.originalUrl || l,
      mjOriginalUrl: e.mjOriginalUrl || l
    };
  }
  const n = (o = e.mjThumbnails) != null && o.length ? e.mjThumbnails : (s = e.mjImages) != null && s.length ? e.mjImages : [];
  if (n.length <= 1) return e;
  const r = n.map(l => Zu(Go(l)) || Zu(Wh(l)) || "");
  if (!r.every(Boolean) || new Set(r).size !== r.length) return e;
  const a = Math.min(Math.max(0, Number(e.selectedMjImageIndex ?? 0)), r.length - 1),
    i = (e.mjThumbnails || []).map(l => l && /\/thumbnails\//i.test(l) ? l : "");
  return {
    ...e,
    mjImages: r,
    ...(i.some(Boolean) && i.length === r.length ? {
      mjThumbnails: i
    } : {}),
    selectedMjImageIndex: a,
    _ossRemoteUrl: r[a] || r[0],
    originalUrl: r[a] || r[0],
    mjOriginalUrl: r[0],
    _globalOssUrlOnly: !0,
    ossUploaded: !0
  };
}

function WIn(e) {
  if (!(e != null && e.length)) return [];
  const t = new Map();
  for (const r of e) {
    if (r.type !== "input-image") continue;
    const a = r.settings || {},
      i = String(a._genBatchOutputSourceId || "").trim(),
      o = String(a[OS] || "").trim(),
      s = Number(a._genBatchOutputSlot);
    if (!i && !o && !Number.isFinite(s)) continue;
    const l = Zu(wP(r));
    if (!l) continue;
    const d = Number.isFinite(s) ? Math.max(0, Math.floor(s)) : 0,
      u = vz(_f(r)) || vz(typeof a[Pi] == "string" ? String(a[Pi]) : "") || vz(typeof r.content == "string" ? r.content : ""),
      h = o || i || r.id;
    let p = t.get(h);
    p ? (o && !p.historyTaskId && (p.historyTaskId = o), i && !p.genSourceId && (p.genSourceId = i)) : (p = {
      historyTaskId: o,
      genSourceId: i,
      slots: new Map()
    }, t.set(h, p)), p.slots.set(d, {
      remote: l,
      thumb: u
    });
  }
  const n = [];
  for (const r of t.values()) {
    const a = [...r.slots.keys()].sort((u, h) => u - h);
    if (a.length <= 1) continue;
    const i = a[0],
      o = a[a.length - 1],
      s = Array.from({
        length: o - i + 1
      }, () => ""),
      l = Array.from({
        length: o - i + 1
      }, () => "");
    for (const [u, h] of r.slots) s[u - i] = h.remote, l[u - i] = h.thumb;
    const d = s.filter(Boolean);
    d.length <= 1 || new Set(d).size <= 1 || n.push({
      historyTaskId: r.historyTaskId,
      genSourceId: r.genSourceId,
      remotes: s,
      thumbs: l
    });
  }
  return n;
}

function qIn(e, t, n) {
  const r = t.filter(Boolean);
  if (r.length <= 1 || new Set(r).size <= 1) return e;
  if (xP(e)) {
    const o = e.mjImages || [];
    if (o.length === t.length && t.every((d, u) => d === o[u]) || new Set(o.map(d => Zu(d)).filter(Boolean)).size >= new Set(r).size) return e;
  }
  const a = Math.min(Math.max(0, Number(e.selectedMjImageIndex ?? 0)), t.length - 1),
    i = t[a] || r[0];
  return {
    ...e,
    mjImages: t,
    ...(n && n.length === t.length && n.some(Boolean) ? {
      mjThumbnails: n
    } : {}),
    selectedMjImageIndex: a,
    _ossRemoteUrl: i || e._ossRemoteUrl,
    originalUrl: i || e.originalUrl,
    mjOriginalUrl: r[0] || e.mjOriginalUrl,
    _globalOssUrlOnly: !0,
    ossUploaded: !0
  };
}

function d5e(e, t) {
  var p, m, f, y;
  if (!(t != null && t.length)) return [];
  const n = String(e.id || "").trim(),
    r = String(e.sourceNodeId || "").trim(),
    i = (() => {
      if (r && t.some(b => b.id === r && b.type === "gen-image")) return r;
      for (const b of t) {
        if (b.type !== "gen-image") continue;
        const v = b.settings || {},
          _ = [String(v._contentAssetId || "").trim(), String(v._assetId || "").trim(), String(v[OS] || "").trim(), b.id].filter(Boolean);
        if (n && _.includes(n)) return b.id;
        const w = Ij(b);
        if (w && String(w.id) === n) return b.id;
      }
      for (const b of t) {
        if (b.type !== "input-image") continue;
        const v = b.settings || {};
        if (n && String(v[OS] || "").trim() === n) {
          const _ = String(v._genBatchOutputSourceId || "").trim();
          if (_) return _;
        }
      }
      return "";
    })(),
    o = Array.from({
      length: Math.max(((p = e.mjImages) == null ? void 0 : p.length) || 0, ((m = e.mjThumbnails) == null ? void 0 : m.length) || 0)
    }, (b, v) => {
      var w, k;
      const _ = [(w = e.mjThumbnails) == null ? void 0 : w[v], (k = e.mjImages) == null ? void 0 : k[v]].map(A => vz(String(A || ""))).filter(Boolean);
      return new Set(_);
    }),
    s = [];
  for (const b of t) {
    if (b.type !== "input-image") continue;
    const v = b.settings || {},
      _ = String(v._genBatchOutputSourceId || "").trim(),
      w = String(v[OS] || "").trim(),
      k = !!(n && w === n);
    let A = -1;
    if (!k && !(i && _ === i) && o.length > 1) {
      const M = [_f(b), typeof v[Pi] == "string" ? String(v[Pi]) : "", typeof b.content == "string" ? b.content : ""].map(vz).filter(Boolean);
      A = o.findIndex(T => T.size > 0 && M.some(P => T.has(P)));
    }
    if (!(i && _ === i || k || A >= 0)) continue;
    const C = Zu(wP(b));
    if (!C) continue;
    const I = Number(v._genBatchOutputSlot),
      E = A >= 0 ? A : Number.isFinite(I) ? Math.max(0, Math.floor(I)) : s.length;
    s.push({
      slot: E,
      remote: C,
      taskMatch: k,
      legacyThumbMatch: A >= 0
    });
  }
  if (s.length === 0) return [];
  const l = s.some(b => b.taskMatch) ? s.filter(b => b.taskMatch) : s.some(b => b.legacyThumbMatch) ? s.filter(b => b.legacyThumbMatch) : s;
  l.sort((b, v) => b.slot - v.slot);
  const d = ((f = l[0]) == null ? void 0 : f.slot) ?? 0,
    u = ((y = l[l.length - 1]) == null ? void 0 : y.slot) ?? d,
    h = Array.from({
      length: u - d + 1
    }, () => "");
  for (const b of l) h[b.slot - d] = b.remote;
  return h;
}

function THe(e, t) {
  if (!(t != null && t.length)) return null;
  const n = String(e.id || "").trim(),
    r = String(e._assetId || "").trim(),
    a = String(e.sourceNodeId || "").trim(),
    i = typeof e.selectedMjImageIndex == "number" && Number.isFinite(e.selectedMjImageIndex) ? Math.max(0, Math.floor(e.selectedMjImageIndex)) : 0,
    o = d5e(e, t);
  if (o.length > 0) {
    const l = o[i] || o.find(Boolean) || "",
      d = Zu(l);
    if (d) return d;
  }
  const s = l => l ? l.type === "gen-image" || l.type === "gen-video" ? Zu(Zo(l, i)) : l.type === "input-image" ? Zu(wP(l)) : null : null;
  if (a) {
    const l = s(t.find(d => d.id === a));
    if (l) return l;
  }
  for (const l of t) {
    if (l.type !== "gen-image" && l.type !== "gen-video" && l.type !== "input-image") continue;
    const d = l.settings || {},
      u = [String(d._contentAssetId || "").trim(), String(d._assetId || "").trim(), String(d._localCacheAssetId || "").trim(), String(d[OS] || "").trim(), l.id].filter(Boolean);
    if (n && u.includes(n) || r && u.includes(r) || n && l.id === n) {
      const h = s(l);
      if (h) return h;
    }
    if (l.type === "gen-image" || l.type === "gen-video") {
      const h = Ij(l);
      if (h && String(h.id) === n) {
        const p = s(l);
        if (p) return p;
      }
    }
  }
  return null;
}

function Fue(e, t) {
  if (!e._globalOssUrlOnly && !e.ossUploaded) return e;
  const n = Zu(Bd(e));
  if (n && (xP(e) || !Array.isArray(e.mjImages) || e.mjImages.length <= 1) && e._ossRemoteUrl === n && (!e.originalUrl || e.originalUrl === n)) return e;
  const r = d5e(e, t),
    a = Zu(Bd(e)),
    i = Zu(THe(e, t)) || null,
    o = a || i || r.find(Boolean) || null;
  let s = e;
  if (o && (!Zu(e._ossRemoteUrl) || !Zu(e.originalUrl) || e._ossRemoteUrl !== o) && (s = {
    ...s,
    _ossRemoteUrl: o,
    originalUrl: o,
    mjOriginalUrl: o
  }), r.length > 1 && r.some(Boolean)) {
    const d = Array.isArray(e.mjImages) ? e.mjImages.map(m => Zu(m)).filter(m => !!m) : [],
      u = d.length > 1 && new Set(d).size < d.length,
      h = !Array.isArray(e.mjImages) || e.mjImages.length !== r.length || r.some((m, f) => {
        var y;
        return !!m && Zu((y = e.mjImages) == null ? void 0 : y[f]) !== m;
      });
    (!Array.isArray(e.mjImages) || e.mjImages.length <= 1 || u || h || e.mjImages.some(m => !Zu(m) || /\/thumbnails\//i.test(String(m || "")) || /-list\.webp(?:$|\?)/i.test(String(m || "")))) && (s = {
      ...s,
      mjImages: r,
      selectedMjImageIndex: Math.min(Math.max(0, Number(e.selectedMjImageIndex ?? 0)), r.length - 1),
      _ossRemoteUrl: r[Math.max(0, Number(e.selectedMjImageIndex ?? 0))] || r.find(Boolean) || s._ossRemoteUrl,
      originalUrl: r[Math.max(0, Number(e.selectedMjImageIndex ?? 0))] || r.find(Boolean) || s.originalUrl,
      mjOriginalUrl: r.find(Boolean) || s.mjOriginalUrl
    });
  }
  let l;
  for (const d of [e._ossThumbnailUrl, e.thumbnailUrl, e.url, ...(e.mjThumbnails || [])]) if (d && nr(d) && !Ad(d) && (/\/thumbnails\//i.test(d) || Qc(d) || /-list\.webp(?:$|\?)/i.test(d))) {
    l = ya(d) || d;
    break;
  }
  return l && s !== e && (s = {
    ...s,
    _ossThumbnailUrl: e._ossThumbnailUrl || l,
    thumbnailUrl: e.thumbnailUrl || l,
    url: /\/thumbnails\//i.test(String(e.url || "")) || /-list\.webp(?:$|\?)/i.test(String(e.url || "")) ? e.url : e.url || l
  }), s;
}

function wMr(e, t) {
  for (const n of [e._ossRemoteUrl, e.originalUrl, e.url, e._ossThumbnailUrl, e.thumbnailUrl, e.videoPosterUrl, e.audioUrl]) {
    const r = String(n || "").trim();
    if (!(!r || !nr(r)) && !Ad(r) && !/\/thumbnails\//i.test(r)) return ya(r) || r;
  }
  return null;
}

function xMr(e, t) {
  if (!(t != null && t.length)) return;
  const n = String(e.id || "").trim();
  if (n) {
    const a = t.find(o => o.id === n);
    if (a) return a;
    const i = n.match(/^node_canvas_(.+)_\d+$/);
    if (i != null && i[1]) {
      const o = t.find(s => s.id === i[1]);
      if (o) return o;
    }
  }
  const r = [e.url, e._ossThumbnailUrl, e.thumbnailUrl, e.originalUrl].map(a => String(a || "").trim()).filter(a => a && !a.startsWith("pending-oss:") && nr(a));
  for (const a of r) {
    const i = t.find(o => o.type === "input-image" && typeof o.content == "string" && o.content === a);
    if (i) return i;
  }
}

async function KIn(e, t) {
  try {
    const {
      hydrateGlobalOssUploadDedupFromSqlite: p
    } = await Ie(async () => {
      const {
        hydrateGlobalOssUploadDedupFromSqlite: m
      } = await Promise.resolve().then(() => mIt);
      return {
        hydrateGlobalOssUploadDedupFromSqlite: m
      };
    }, void 0, import.meta.url);
    await p();
  } catch {}
  let r = await (async () => {
    try {
      const {
          lookupHistoryItemByIdFromAuthority: p
        } = await Ie(async () => {
          const {
            lookupHistoryItemByIdFromAuthority: f
          } = await Promise.resolve().then(() => Gu);
          return {
            lookupHistoryItemByIdFromAuthority: f
          };
        }, void 0, import.meta.url),
        m = await p(String(e.id));
      return m ? {
        ...e,
        ...m,
        _ossRemoteUrl: e._ossRemoteUrl || m._ossRemoteUrl,
        originalUrl: e.originalUrl || m.originalUrl,
        _ossThumbnailUrl: e._ossThumbnailUrl || m._ossThumbnailUrl,
        thumbnailUrl: e.thumbnailUrl || m.thumbnailUrl,
        url: e.url && nr(e.url) ? e.url : m.url || e.url,
        sourceNodeId: e.sourceNodeId || m.sourceNodeId,
        _globalOssUrlOnly: e._globalOssUrlOnly || m._globalOssUrlOnly,
        ossUploaded: e.ossUploaded || m.ossUploaded
      } : e;
    } catch {
      return e;
    }
  })();
  r = Cj(r), r = Fue(r, t);
  try {
    await sLe();
  } catch {}
  const a = (t == null ? void 0 : t.find(p => p.id === r.id)) || xMr(r, t),
    i = (a == null ? void 0 : a.settings) || {},
    o = [r._ossThumbnailUrl, r.thumbnailUrl, r.url, ...(r.mjThumbnails || []), typeof (a == null ? void 0 : a.content) == "string" ? a.content : "", typeof i._ossThumbnailUrl == "string" ? i._ossThumbnailUrl : "", typeof i._historySelectedThumbUrl == "string" ? i._historySelectedThumbUrl : "", typeof i._historySelectedOriginalUrl == "string" ? i._historySelectedOriginalUrl : "", typeof i._ossRemoteUrl == "string" ? i._ossRemoteUrl : ""],
    s = d5e(r, t),
    l = Math.max(0, Number(r.selectedMjImageIndex ?? 0)),
    d = Array.isArray(r.mjImages) ? r.mjImages.map(p => Zu(p) || "") : [];
  let u = Zu(s[l]) || Zu(s.find(Boolean)) || Zu(d[l]) || Zu(d.find(Boolean)) || Zu(Bd(r)) || Zu(THe(r, t)) || Zu(wMr(r));
  if (!u) for (const p of o) {
    const m = Zu(Go(p) || EHe(p));
    if (m) {
      u = m;
      break;
    }
  }
  if (!u) for (const p of [r._ossThumbnailUrl, r.thumbnailUrl, r.url, ...(r.mjThumbnails || [])]) {
    const m = await tCt(String(p || "")),
      f = Zu(m);
    if (f) {
      u = f;
      break;
    }
  }
  if (!u && r.sourceNodeId && (t != null && t.length)) {
    const p = t.find(f => f.id === r.sourceNodeId),
      m = Bm(p);
    u = Zu(Go(m));
  }
  if (!u) return null;
  const h = {
    ...r,
    ...(s.length > 1 && s.some(Boolean) ? {
      mjImages: s
    } : {}),
    originalUrl: u,
    _ossRemoteUrl: u,
    mjOriginalUrl: s.find(Boolean) || u,
    _globalOssUrlOnly: !0,
    ossUploaded: !0
  };
  return {
    url: u,
    item: h
  };
}

function Nae(e, t = 0, n) {
  if (!e) return null;
  const r = e.settings || {},
    a = r[kD];
  if (Array.isArray(a) && a.length > 0) {
    const o = Math.max(0, Math.min(t, a.length - 1)),
      s = String(a[o] || "").trim();
    if (s && nr(s)) return ya(s) || s;
  }
  return lLe(r, "image", n, e.previewMjImages) || null;
}

function _Mr() {
  return ua();
}

function kMr(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(r.result), r.onerror = () => n(r.error), r.readAsDataURL(e);
  });
}

const Ej = 512,
  uLe = .86;

let tme = null;

function Wwe() {
  if (tme !== null) return tme;
  try {
    tme = document.createElement("canvas").toDataURL("image/webp", .5).startsWith("data:image/webp");
  } catch {
    tme = !1;
  }
  return tme;
}

function AMr(e, t, n) {
  return new Promise(r => {
    if (typeof e.toBlob != "function") {
      try {
        r(e.toDataURL(t, n));
      } catch {
        r(null);
      }
      return;
    }
    e.toBlob(a => {
      if (!a) {
        r(null);
        return;
      }
      const i = new FileReader();
      i.onload = () => r(typeof i.result == "string" ? i.result : null), i.onerror = () => r(null), i.readAsDataURL(a);
    }, t, n);
  });
}

function SMr(e) {
  const t = () => {
    if (Yi()) {
      window.setTimeout(t, 160);
      return;
    }
    e();
  };
  typeof window.requestIdleCallback == "function" ? window.requestIdleCallback(t, {
    timeout: 2e3
  }) : window.setTimeout(t, 80);
}

async function QIn(e, t = Ej, n = uLe) {
  const a = Wwe() ? "image/webp" : "image/jpeg";
  return new Promise(i => {
    const o = new Image();
    let s = !1;
    const l = d => {
      s || (s = !0, o.onload = null, o.onerror = null, o.removeAttribute("src"), i(d));
    };
    /^https?:\/\//i.test(e) && (o.crossOrigin = "anonymous"), o.onload = () => {
      try {
        SMr(() => {
          try {
            const d = document.createElement("canvas"),
              u = d.getContext("2d", {
                alpha: !0
              });
            if (!u) {
              l({
                dataUrl: e,
                mimeType: "image/jpeg"
              });
              return;
            }
            const h = o.naturalWidth || o.width,
              p = o.naturalHeight || o.height;
            let m = h,
              f = p;
            if (m > t || f > t) {
              const b = Math.min(t / m, t / f);
              m = Math.max(1, Math.round(m * b)), f = Math.max(1, Math.round(f * b));
            }
            d.width = m, d.height = f, u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "medium", u.drawImage(o, 0, 0, m, f);
            const y = zpt({
              imageData: e,
              ctx: u,
              width: m,
              height: f
            }) ? "image/png" : a;
            AMr(d, y, n).then(b => {
              d.width = 1, d.height = 1, l({
                dataUrl: b != null && b.startsWith(`data:${y}`) ? b : e,
                mimeType: y,
                sourceWidth: h,
                sourceHeight: p
              });
            });
          } catch {
            l({
              dataUrl: e,
              mimeType: "image/jpeg"
            });
          }
        });
      } catch {
        l({
          dataUrl: e,
          mimeType: "image/jpeg"
        });
      }
    }, o.onerror = () => l({
      dataUrl: e,
      mimeType: "image/jpeg"
    }), o.src = e;
  });
}

let VHt = Promise.resolve();

function IMr(e) {
  const t = VHt.then(e, e);
  return VHt = t.then(() => {}, () => {}), t;
}

async function CMr(e, t = "list-preview", n = Ej) {
  const r = e instanceof File ? e : new File([e], `${t}.bin`, {
      type: e.type || "application/octet-stream"
    }),
    a = URL.createObjectURL(r);
  try {
    let i = "",
      o = Wwe() ? "image/webp" : "image/jpeg";
    try {
      const {
        thumbnailStore: p
      } = await Ie(async () => {
        const {
          thumbnailStore: m
        } = await Promise.resolve().then(() => Y$);
        return {
          thumbnailStore: m
        };
      }, void 0, import.meta.url);
      i = await p.generateThumbnail(a, n, uLe), i.startsWith("data:image/png") ? o = "image/png" : i.startsWith("data:image/jpeg") ? o = "image/jpeg" : i.startsWith("data:image/webp") && (o = "image/webp");
    } catch {}
    if (!i.startsWith("data:image")) {
      const p = await QIn(a, n, uLe);
      i = p.dataUrl, o = p.mimeType;
    }
    const s = await (await fetch(i)).blob(),
      l = o === "image/webp" ? "webp" : o === "image/png" ? "png" : "jpg",
      d = t.replace(/[^\w.\-]+/g, "_").slice(0, 64) || "list-preview",
      u = new File([s], `${d}.${l}`, {
        type: o
      }),
      h = await zue(u);
    if (!h || Math.max(h.width, h.height) > n) throw new Error(`[globalOssMaterial] 缩略图编码未收敛到 ${n}px，拒绝上传原图到 thumbnails/`);
    return u;
  } finally {
    URL.revokeObjectURL(a);
  }
}

function H$(e, t = "list-preview", n = Ej) {
  return IMr(() => CMr(e, t, n));
}

async function MHe(e, t = Ej) {
  const n = e.name.replace(/\.[^.]+$/, "") || "thumb";
  return H$(e, `${n}-list`, t);
}

async function CY(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
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
    if (await n.ensureRestored(), !n.isAvailable()) return !1;
    const r = `preview_${t}`,
      a = n.getAssetManifestMeta(r);
    return a ? a.mimeType === "image/webp" || a.mimeType === "image/png" || /\.(webp|png)$/i.test(a.fileName) : !1;
  } catch {
    return !1;
  }
}

async function PHe(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  try {
    if (t.startsWith("data:") || t.startsWith("blob:")) {
      const n = await fetch(t);
      if (!n.ok) return null;
      const r = await n.blob();
      return r.type.startsWith("image/") ? r : null;
    }
    if (t.startsWith("http://") || t.startsWith("https://")) {
      const {
        isTauriRuntime: n
      } = await Ie(async () => {
        const {
          isTauriRuntime: r
        } = await Promise.resolve().then(() => oqn);
        return {
          isTauriRuntime: r
        };
      }, void 0, import.meta.url);
      if (n()) try {
        const {
            downloadWithFallback: r
          } = await Ie(async () => {
            const {
              downloadWithFallback: i
            } = await Promise.resolve().then(() => El);
            return {
              downloadWithFallback: i
            };
          }, void 0, import.meta.url),
          a = await r(t, 12e4);
        if (a != null && a.size) {
          if (a.type.startsWith("image/")) return a;
          const i = t.toLowerCase(),
            o = i.includes(".png") ? "image/png" : i.includes(".webp") ? "image/webp" : i.includes(".gif") ? "image/gif" : "image/jpeg";
          return new Blob([await a.arrayBuffer()], {
            type: o
          });
        }
      } catch {}
    }
  } catch {}
  return null;
}

async function YIn(e, t, n) {
  const r = String(t || "").trim();
  if (!r) return null;
  const a = await PHe(e);
  if (!a) return null;
  await CE(r, a);
  const i = String(n || "").trim();
  i && i !== r && (await CE(i, a));
  const {
    readLocalPreviewThumbnailAsUrl: o
  } = await Ie(async () => {
    const {
      readLocalPreviewThumbnailAsUrl: s
    } = await Promise.resolve().then(() => Ui);
    return {
      readLocalPreviewThumbnailAsUrl: s
    };
  }, void 0, import.meta.url);
  return (await o(r)) || (i ? await o(i) : null);
}

const Ibe = new Map();

function XIn(e, t) {
  Ibe.set(e, t);
  const n = () => {
    Ibe.get(e) === t && Ibe.delete(e);
  };
  return t.then(n, n), t;
}

function CE(e, t, n) {
  const r = String(e || "").trim();
  if (!r) return Promise.resolve(!1);
  const a = Ibe.get(r);
  if (a) return a;
  const i = JIn(r, t);
  return XIn(r, i);
}

async function JIn(e, t, n = !1) {
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
    }, void 0, import.meta.url);
    if (await r.ensureRestored(), !r.isAvailable()) return !1;
    if (r.hasThumbnail(e, "preview") && (await r.readThumbnail(e, "preview").catch(() => null))) return !0;
    const a = async () => {
      if (r.hasThumbnail(e, "preview")) {
        if (await r.readThumbnail(e, "preview").catch(() => null)) return !0;
        await r.removeAsset(`preview_${e}`);
      }
      const i = await H$(t, `preview-${e.replace(/[^\w.\-]+/g, "_").slice(0, 48)}`),
        o = await kMr(i),
        s = await r.saveThumbnail(e, o, "preview");
      if (s) try {
        const {
          thumbnailStore: l
        } = await Ie(async () => {
          const {
            thumbnailStore: d
          } = await Promise.resolve().then(() => Y$);
          return {
            thumbnailStore: d
          };
        }, void 0, import.meta.url);
        await l.storePreviewOnly(e, o);
      } catch {}
      return s;
    };
    return n ? await a() : await xD(a);
  } catch (r) {
    return console.warn("[globalOssMaterial] 本地列表缩略图保存失败:", e, r), !1;
  }
}

function EMr(e) {
  const t = String(e || "").trim();
  if (!t) return Promise.resolve(!1);
  const n = Ibe.get(t);
  if (n) return n;
  const r = xD(async () => {
    var a;
    try {
      const {
        localCacheManager: i
      } = await Ie(async () => {
        const {
          localCacheManager: s
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: s
        };
      }, void 0, import.meta.url);
      if (await i.ensureRestored(), !i.isAvailable()) return !1;
      if (i.hasThumbnail(t, "preview") && (await i.readThumbnail(t, "preview").catch(() => null))) return !0;
      const o = await i.readAsset(t);
      return !((a = o == null ? void 0 : o.blob) != null && a.size) || !o.blob.type.startsWith("image/") ? !1 : await JIn(t, o.blob, !0);
    } catch {
      return !1;
    }
  });
  return XIn(t, r);
}

async function u5e(e, t, n) {
  return !String(e || "").trim() || ua() ? !1 : CE(e, t);
}

async function hf(e, t) {
  const {
      readLocalPreviewThumbnailAsUrl: n
    } = await Ie(async () => {
      const {
        readLocalPreviewThumbnailAsUrl: o
      } = await Promise.resolve().then(() => Ui);
      return {
        readLocalPreviewThumbnailAsUrl: o
      };
    }, void 0, import.meta.url),
    r = [],
    a = Array.isArray(e._mjAssetIds) ? e._mjAssetIds : [];
  if (typeof t == "number") a[t] && r.push(String(a[t])), r.push(`${e.id}_${t}`), r.push(`${e.id}_mj_${t}`);else if (e.mjImages && e.mjImages.length > 1) {
    const o = e.selectedMjImageIndex ?? 0;
    a[o] && r.push(String(a[o])), r.push(`${e.id}_${o}`), r.push(`${e.id}_mj_${o}`);
  }
  e._assetId && r.push(e._assetId), r.push(e.id);
  const i = new Set();
  for (const o of r) {
    const s = String(o || "").trim();
    if (!s || i.has(s)) continue;
    i.add(s);
    const l = await n(s);
    if (l) return l;
  }
  return null;
}

function TMr(e, t) {
  if (e.type && e.type.startsWith("image/") && e.type !== "application/octet-stream") return e.type;
  const n = String(t || "").toLowerCase();
  return n.includes(".webp") ? "image/webp" : n.includes(".png") ? "image/png" : n.includes(".jpeg") || n.includes(".jpg") ? "image/jpeg" : n.includes(".gif") ? "image/gif" : n.includes("/thumbnails/") ? "image/webp" : (n.includes("/images/"), "image/png");
}

function z6(e, t) {
  if (e.type && e.type.startsWith("image/")) return !0;
  const n = String(t || "").toLowerCase();
  return n.includes("/thumbnails/") || n.includes("/images/") ? !0 : /\.(jpe?g|png|webp|gif)(\?|$)/i.test(n);
}

function BK(e, t) {
  const n = TMr(e, t);
  return e.type === n ? e : new Blob([e], {
    type: n
  });
}

async function h5e(e, t, n) {
  const r = String(e || "").trim(),
    a = ya(String(t || "").trim()) || "";
  if (!r || !a || !nr(a) || Nb(a)) return !1;
  try {
    const {
      localCacheManager: i
    } = await Ie(async () => {
      const {
        localCacheManager: l
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: l
      };
    }, void 0, import.meta.url);
    if (await i.ensureRestored(), i.isAvailable() && i.hasThumbnail(r, "preview") && !(n != null && n.forceReplace) && (await CY(r))) return !0;
    let o = null;
    try {
      const {
        downloadWithFallback: l
      } = await Ie(async () => {
        const {
          downloadWithFallback: d
        } = await Promise.resolve().then(() => El);
        return {
          downloadWithFallback: d
        };
      }, void 0, import.meta.url);
      o = await l(a, 6e4);
    } catch (l) {
      if (_j(l)) return cY(a), !1;
    }
    if (!o || !z6(o, a)) return !1;
    const s = (n == null ? void 0 : n.forceReplace) || i.isAvailable() && i.hasThumbnail(r, "preview") && !(await CY(r));
    return u5e(r, BK(o, a), {
      forceReplace: s
    });
  } catch (i) {
    return _j(i) ? (cY(a), !1) : (console.warn("[globalOssMaterial] OSS 缩略图回填本地失败:", r, i), !1);
  }
}

async function jae(e, t) {
  const {
    isHistoryListMediaIoActive: n
  } = await Ie(async () => {
    const {
      isHistoryListMediaIoActive: h
    } = await Promise.resolve().then(() => Y5t);
    return {
      isHistoryListMediaIoActive: h
    };
  }, void 0, import.meta.url);
  if (!n()) return null;
  const r = [e._assetId, e.id].filter(Boolean);
  for (const h of r) {
    if (!n()) return null;
    if (await CY(h)) return hf(e);
  }
  const a = [];
  for (const h of [jg(e), e._ossThumbnailUrl, e.thumbnailUrl, e.videoPosterUrl]) h && tl(h) && !a.includes(h) && a.push(h);
  const {
    localCacheManager: i
  } = await Ie(async () => {
    const {
      localCacheManager: h
    } = await Promise.resolve().then(() => Ha);
    return {
      localCacheManager: h
    };
  }, void 0, import.meta.url);
  await i.ensureRestored();
  const s = r.some(h => i.hasThumbnail(h, "preview")) && !(await CY(e.id));
  for (const h of a) {
    if (!nr(h) || Nb(h)) continue;
    await h5e(e.id, h, {
      forceReplace: s
    });
    const p = await hf(e);
    if (p) return p;
  }
  for (const h of a) if (!(!/^https?:\/\//i.test(h) || nr(h))) try {
    let p = null;
    try {
      const {
        downloadWithFallback: m
      } = await Ie(async () => {
        const {
          downloadWithFallback: f
        } = await Promise.resolve().then(() => El);
        return {
          downloadWithFallback: f
        };
      }, void 0, import.meta.url);
      p = await m(h, 6e4);
    } catch {}
    if (p && z6(p, h)) {
      await CE(e.id, BK(p, h), {
        forceReplace: !0
      });
      const m = await hf(e);
      if (m) return m;
    }
  } catch {}
  const l = [t == null ? void 0 : t.localVideoPlayUrl, e.url, e.originalUrl, e._ossRemoteUrl, Bd(e)].filter(h => !!h && (/^https?:\/\//i.test(h) || iy(h))),
    {
      captureVideoPosterDataUrl: d,
      isBrowserCorsHostileVideoUrl: u
    } = await Ie(async () => {
      const {
        captureVideoPosterDataUrl: h,
        isBrowserCorsHostileVideoUrl: p
      } = await Promise.resolve().then(() => pg);
      return {
        captureVideoPosterDataUrl: h,
        isBrowserCorsHostileVideoUrl: p
      };
    }, void 0, import.meta.url);
  for (const h of l) if (/^https?:\/\//i.test(h) && !/^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(h) && !u(h)) try {
    const p = await d(h),
      m = await (await fetch(p)).blob();
    if (m.size > 0) {
      await CE(e.id, m, {
        forceReplace: !0
      });
      const f = await hf(e);
      if (f) return f;
    }
  } catch {}
  for (const h of l) if (!nr(h) && !(/^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(h) || h.startsWith("asset:")) && !u(h) && iy(h)) try {
    const p = await d(h),
      m = await (await fetch(p)).blob();
    if (m.size > 0) {
      await CE(e.id, m, {
        forceReplace: !0
      });
      const f = await hf(e);
      if (f) return f;
    }
  } catch {}
  try {
    const {
        ensureHistoryVideoPreviewThumbnailForAssetId: h
      } = await Ie(async () => {
        const {
          ensureHistoryVideoPreviewThumbnailForAssetId: m
        } = await Promise.resolve().then(() => qh);
        return {
          ensureHistoryVideoPreviewThumbnailForAssetId: m
        };
      }, void 0, import.meta.url),
      p = [e._ossRemoteUrl, e.originalUrl, e.url].map(m => String(m || "").trim()).find(m => /^https?:\/\//i.test(m) && !/^https?:\/\/asset\.(localhost|tauri\.localhost)\b/i.test(m) && !u(m)) || void 0;
    for (const m of r) {
      await h(m, {
        remotePlayUrl: p
      });
      const f = await hf(e);
      if (f) return f;
    }
  } catch {}
  return hf(e);
}

function MMr(e, t) {
  return typeof t == "number" ? `${e}_${t}` : e;
}

const SF = new Map(),
  FK = new Set();

function Zw(e) {
  const t = String(e || "").trim();
  t && FK.add(t);
}

function RHe(e) {
  return FK.has(String(e || "").trim());
}

const zK = new Set();

function ZIn(e) {
  const t = String(e || "").trim();
  return !t || RHe(t) || zK.has(t) ? !1 : (zK.add(t), !0);
}

function qpt(e) {
  const t = String(e || "").trim();
  t && (FK.delete(t), zK.delete(t));
}

async function nme(e, t, n) {
  return CE(e, t);
}

function PMr(e) {
  const t = String(e || "").trim();
  return t.startsWith("blob:") || t.startsWith("data:image");
}

async function Eet(e) {
  const t = String(e || "").trim();
  if (!t || nr(t) && Nb(t)) return null;
  if (/^https?:\/\//i.test(t)) {
    try {
      const {
          peekSessionDownloadedBlob: n
        } = await Ie(async () => {
          const {
            peekSessionDownloadedBlob: a
          } = await Promise.resolve().then(() => El);
          return {
            peekSessionDownloadedBlob: a
          };
        }, void 0, import.meta.url),
        r = n(t);
      if (r != null && r.size && z6(r, t)) return BK(r, t);
    } catch {}
    try {
      const {
          resolveLocalBlobByRemoteUrl: n
        } = await Ie(async () => {
          const {
            resolveLocalBlobByRemoteUrl: a
          } = await Promise.resolve().then(() => Ui);
          return {
            resolveLocalBlobByRemoteUrl: a
          };
        }, void 0, import.meta.url),
        r = await n(t);
      if (r != null && r.size && z6(r, t)) return BK(r, t);
    } catch {}
  }
  try {
    return await q4n(async () => {
      try {
        if (t.startsWith("blob:") || t.startsWith("data:image")) {
          const a = await fetch(t);
          return a.ok ? await a.blob() : null;
        }
        if (!/^https?:\/\//i.test(t)) return null;
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
          r = await n(t, 6e4);
        return z6(r, t) ? BK(r, t) : r;
      } catch (n) {
        nr(t) && _j(n) && cY(t);
      }
      return null;
    });
  } catch (n) {
    const {
      isHistoryListMediaIoCancelledError: r
    } = await Ie(async () => {
      const {
        isHistoryListMediaIoCancelledError: a
      } = await Promise.resolve().then(() => Y5t);
      return {
        isHistoryListMediaIoCancelledError: a
      };
    }, void 0, import.meta.url);
    if (r(n)) return null;
    throw n;
  }
}

async function Dae(e, t) {
  if (e.type === "video" || e.type === "audio") return null;
  if (e._globalOssUrlOnly || vv(e)) return Zw(e.id), null;
  const {
    isHistoryListMediaIoActive: n
  } = await Ie(async () => {
    const {
      isHistoryListMediaIoActive: l
    } = await Promise.resolve().then(() => Y5t);
    return {
      isHistoryListMediaIoActive: l
    };
  }, void 0, import.meta.url);
  if (!n()) return null;
  const r = t == null ? void 0 : t.mjIndex,
    a = MMr(e.id, r);
  if (typeof r != "number" && RHe(e.id)) return hf(e, r);
  const i = `${a}:${r ?? "main"}`,
    o = SF.get(i);
  if (o) return o;
  const s = RMr(e, t, a, r);
  SF.set(i, s);
  try {
    return await s;
  } finally {
    SF.get(i) === s && SF.delete(i);
  }
}

async function RMr(e, t, n, r) {
  try {
    return await NMr(e, t, n, r);
  } finally {
    Zw(typeof r != "number" ? e.id : n);
  }
}

async function NMr(e, t, n, r) {
  var m, f, y, b, v, _;
  const a = [...new Set([n, e._assetId, e.id].filter(Boolean))];
  for (const w of a) if (await CY(w)) return hf(e, r);
  const i = [];
  if (typeof r == "number") {
    const w = (m = e.mjThumbnails) == null ? void 0 : m[r],
      k = (f = e.mjImages) == null ? void 0 : f[r];
    w && tl(w) && i.push(w), k && tl(k) && i.push(k);
  }
  for (const w of [jg(e), e._ossThumbnailUrl, e.thumbnailUrl, e.url, e.originalUrl]) w && tl(w) && !i.includes(w) && i.push(w);
  const {
    localCacheManager: o
  } = await Ie(async () => {
    const {
      localCacheManager: w
    } = await Promise.resolve().then(() => Ha);
    return {
      localCacheManager: w
    };
  }, void 0, import.meta.url);
  await o.ensureRestored();
  const l = a.some(w => o.hasThumbnail(w, "preview")) && !(await CY(n)),
    d = typeof r == "number" && Array.isArray(e._mjAssetIds) ? String(((y = e._mjAssetIds) == null ? void 0 : y[r]) || "").trim() : "",
    u = o.isAvailable() && [d, e._assetId, e.id, ...(typeof r == "number" ? [`${e.id}_mj_${r}`, `${e.id}_${r}`] : [])].some(w => !!w && o.hasAsset(String(w))),
    h = [typeof r == "number" ? (b = e.mjImages) == null ? void 0 : b[r] : void 0, Bd(e), e._ossRemoteUrl, e.originalUrl, e.url].filter(w => !!w && /^https?:\/\//i.test(w) && !/asset\.localhost/i.test(w));
  if (!u && h.length > 0) try {
    const {
      resolveLocalBlobByRemoteUrl: w
    } = await Ie(async () => {
      const {
        resolveLocalBlobByRemoteUrl: k
      } = await Promise.resolve().then(() => Ui);
      return {
        resolveLocalBlobByRemoteUrl: k
      };
    }, void 0, import.meta.url);
    for (const k of h) {
      const A = await w(k);
      if (!(A != null && A.size) || !z6(A, k)) continue;
      await nme(n, BK(A, k), {
        forceReplace: !0
      }), Zw(e.id);
      const S = await hf(e, r);
      if (S) return S;
    }
  } catch {}
  try {
    const {
        readLocalOriginalAssetBlob: w
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetBlob: S
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetBlob: S
        };
      }, void 0, import.meta.url),
      k = (typeof r == "number" ? (v = e.mjImages) == null ? void 0 : v[r] : void 0) || Bd(e) || e._ossRemoteUrl || e.url,
      A = typeof r == "number" ? [d, `${e.id}_mj_${r}`, `${e.id}_${r}`, e._assetId, e.id] : [e._assetId, e.id];
    for (const S of [...new Set(A.filter(Boolean))]) {
      const C = await w(S, k);
      if (!C || !z6(C, k)) continue;
      await nme(n, BK(C, k), {
        forceReplace: !0
      });
      const I = await hf(e, r);
      if (I) return Zw(e.id), I;
    }
  } catch {}
  if (u) {
    try {
      const {
        ensureLocalPreviewDisplayUrl: k
      } = await Ie(async () => {
        const {
          ensureLocalPreviewDisplayUrl: A
        } = await Promise.resolve().then(() => Ui);
        return {
          ensureLocalPreviewDisplayUrl: A
        };
      }, void 0, import.meta.url);
      for (const A of a) {
        const S = await k(String(A), {
          maxDim: 256
        });
        if (S) return Zw(e.id), S;
      }
    } catch {}
    const w = await hf(e, r);
    return w ? (Zw(e.id), w) : null;
  }
  const p = [t == null ? void 0 : t.localImageUrl, typeof r == "number" ? (_ = e.mjImages) == null ? void 0 : _[r] : void 0].filter(w => !!w && tl(w) && !nr(w) && PMr(w));
  for (const w of p) {
    const k = await Eet(w);
    if (k && z6(k, w)) {
      await nme(n, k);
      const A = await hf(e, r);
      if (A) return A;
    }
  }
  for (const w of i) {
    if (!nr(w) || Nb(w)) continue;
    await h5e(n, w, {
      forceReplace: l
    });
    const k = await hf(e, r);
    if (k) return k;
  }
  for (const w of [Bd(e), e._ossRemoteUrl, e.originalUrl]) {
    if (!w || !nr(w) || Nb(w)) continue;
    const k = await Eet(w);
    if (k && z6(k, w)) {
      await nme(n, k);
      const A = await hf(e, r);
      if (A) return A;
    }
  }
  for (const w of i) {
    if (!/^https?:\/\//i.test(w) || nr(w) || u) continue;
    const k = await Eet(w);
    if (k && z6(k, w)) {
      await nme(n, k), Zw(e.id);
      const A = await hf(e, r);
      if (A) return A;
    }
  }
  return hf(e, r);
}

function hLe(e, t) {
  if (t) return t;
  const n = jg(e);
  if (!(n && Nb(n))) return n || void 0;
}

function cCt(...e) {
  for (const t of e) if (t && !nr(t) && tl(t)) return t;
  for (const t of e) if (t && tl(t)) return t;
}

async function zue(e) {
  try {
    if (typeof createImageBitmap == "function") {
      const t = await createImageBitmap(e),
        n = t.width,
        r = t.height;
      if (t.close(), n > 0 && r > 0) return {
        width: n,
        height: r
      };
    }
  } catch {}
  return new Promise(t => {
    const n = URL.createObjectURL(e),
      r = new Image(),
      a = setTimeout(() => {
        URL.revokeObjectURL(n), t(null);
      }, 15e3);
    r.onload = () => {
      clearTimeout(a), URL.revokeObjectURL(n);
      const i = r.naturalWidth || r.width || 0,
        o = r.naturalHeight || r.height || 0;
      t(i > 0 && o > 0 ? {
        width: i,
        height: o
      } : null);
    }, r.onerror = () => {
      clearTimeout(a), URL.revokeObjectURL(n), t(null);
    }, r.src = n;
  });
}

async function W$(e) {
  const t = await XVe(e, "image");
  if (t) return t;
  const n = await zue(e),
    r = await jK(e),
    a = await MHe(e),
    i = await Eue(a),
    o = {
      remoteUrl: r,
      displayUrl: i,
      mediaType: "image",
      imageWidth: n == null ? void 0 : n.width,
      imageHeight: n == null ? void 0 : n.height
    };
  return await yY(e, o), o;
}

async function HHt(e, t) {
  const n = String(t || "video").replace(/[^\w.\-]+/g, "_").slice(0, 64) || "video",
    r = URL.createObjectURL(e);
  try {
    const {
        captureVideoPosterFrame: a
      } = await Ie(async () => {
        const {
          captureVideoPosterFrame: m
        } = await Promise.resolve().then(() => pg);
        return {
          captureVideoPosterFrame: m
        };
      }, void 0, import.meta.url),
      i = await a(r);
    if (!(i != null && i.dataUrl)) return {};
    let o, s;
    i.width > 0 && i.height > 0 && (o = i.width, s = i.height);
    const d = await (await fetch(i.dataUrl)).blob(),
      u = await H$(d, `${n}-poster`);
    u.size > 0 && (await u5e(t, u));
    const h = await W$(u);
    return {
      posterUrl: ya(h.displayUrl) || void 0,
      imageWidth: o,
      imageHeight: s
    };
  } catch (a) {
    return console.warn("[globalOssMaterial] 视频首帧封面上传 OSS 失败:", a), {};
  } finally {
    try {
      URL.revokeObjectURL(r);
    } catch {}
  }
}

function WHt(e) {
  return String(e.name || "video").replace(/\.[^.]+$/, "").trim() || "video";
}

async function qHt(e, t) {
  const n = kHe(e);
  if (!n) return {};
  const r = String(t).replace(/[^\w.\-]+/g, "_").slice(0, 64) || "video";
  try {
    const {
        downloadWithFallback: a
      } = await Ie(async () => {
        const {
          downloadWithFallback: o
        } = await Promise.resolve().then(() => El);
        return {
          downloadWithFallback: o
        };
      }, void 0, import.meta.url),
      i = await a(n, 6e4, {
        cacheResult: !1
      });
    if (i && i.size > 0 && i.size < 8 * 1024 * 1024) {
      const o = String(i.type || "").toLowerCase();
      if (o.startsWith("image/") || !o && i.size < 2 * 1024 * 1024) {
        const l = await H$(i, `${r}-poster`);
        l.size > 0 && (await u5e(t, l));
        const d = await W$(l),
          u = ya(d.displayUrl) || void 0;
        if (u) return {
          posterUrl: u
        };
      }
    }
  } catch (a) {
    console.warn("[globalOssMaterial] 图床视频截帧下载/上传失败，软回退截帧 URL:", r, a);
  }
  return {
    posterUrl: n
  };
}

async function eCn(e, t) {
  const n = String(e || "").trim();
  if (!/^https?:\/\//i.test(n)) return {};
  const r = String(t || "video").replace(/[^\w.\-]+/g, "_").slice(0, 64) || "video";
  let a = "";
  if (kHe(n)) {
    const i = await qHt(n, r);
    if (i.posterUrl && !QE(i.posterUrl)) return i;
    i.posterUrl && (a = i.posterUrl);
  }
  if (us()) try {
    const {
        invoke: i
      } = await Ie(async () => {
        const {
          invoke: l
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: l
        };
      }, void 0, import.meta.url),
      o = await i("extract_remote_video_poster_jpeg", {
        args: {
          sourceUrl: n,
          maxDim: 512
        }
      }),
      s = String((o == null ? void 0 : o.jpegBase64) || (o == null ? void 0 : o.jpeg_base64) || "").trim();
    if (s) {
      const l = atob(s),
        d = new Uint8Array(l.length);
      for (let h = 0; h < l.length; h++) d[h] = l.charCodeAt(h);
      const u = new Blob([d], {
        type: "image/jpeg"
      });
      if (u.size) {
        const h = await H$(u, `${r}-poster`);
        h.size > 0 && (await u5e(t, h));
        const p = await W$(h),
          m = ya(p.displayUrl) || void 0;
        if (m) {
          const f = typeof (o == null ? void 0 : o.width) == "number" && o.width > 0 ? o.width : void 0,
            y = typeof (o == null ? void 0 : o.height) == "number" && o.height > 0 ? o.height : void 0;
          return {
            posterUrl: m,
            imageWidth: f,
            imageHeight: y
          };
        }
      }
    }
  } catch (i) {
    console.warn("[globalOssMaterial] Rust 远程视频抽封面失败:", r, i);
  }
  return a ? {
    posterUrl: a
  } : qHt(n, r);
}

async function dCt(e) {
  const t = await XVe(e, "video");
  if (t) {
    const s = ya(t.remoteUrl) || t.remoteUrl,
      l = ya(t.displayUrl) || t.displayUrl,
      d = !!t.posterUrl || !!l && l !== s && !/\/videos\//i.test(l);
    if (!d) {
      const u = await HHt(e, WHt(e));
      if (u.posterUrl) {
        const h = {
          remoteUrl: s,
          displayUrl: u.posterUrl,
          mediaType: "video",
          posterUrl: u.posterUrl,
          imageWidth: u.imageWidth ?? t.imageWidth,
          imageHeight: u.imageHeight ?? t.imageHeight
        };
        return await yY(e, h), h;
      }
    }
    return {
      ...t,
      remoteUrl: s,
      displayUrl: l,
      ...(d && l !== s ? {
        posterUrl: t.posterUrl || l
      } : {})
    };
  }
  const n = await MVe(e),
    r = ya(n) || n,
    a = await HHt(e, WHt(e)),
    i = a.posterUrl,
    o = {
      remoteUrl: r,
      displayUrl: i || r,
      mediaType: "video",
      imageWidth: a.imageWidth,
      imageHeight: a.imageHeight,
      ...(i ? {
        posterUrl: i
      } : {})
    };
  return await yY(e, o), o;
}

async function uCt(e) {
  const t = await XVe(e, "audio");
  if (t) return t;
  const n = await T3n(e),
    r = {
      remoteUrl: n,
      displayUrl: n,
      mediaType: "audio"
    };
  return await yY(e, r), r;
}

function yU(e, t) {
  if (!(!Number.isFinite(e) || !Number.isFinite(t) || e <= 0 || t <= 0)) return `${Math.round(e)}×${Math.round(t)}`;
}

const UEe = Ej;

function nl(e, t) {
  if (e <= 0 || t <= 0) return !1;
  const n = Math.max(e, t);
  return n <= UEe + 48 || (e === UEe || t === UEe) && n <= UEe * 2 + 64;
}

function Lae(e, t) {
  const n = String(e || "").trim();
  if (!n) return !1;
  if (/\/thumbnails\//i.test(n) || /(?:[/\\]|%5[cC])thumbnails(?:[/\\]|%5[cC])/i.test(n) || /(?:\?|&)x-oss-process=image\/resize/i.test(n) || /(?:\?|&)imageView2\/2\/w\/\d+/i.test(n)) return !0;
  if (vs(n)) return Af(n) ? !0 : (zg(n), !1);
  if (nr(n) && /\/images\//i.test(n)) return !1;
  const r = String((t == null ? void 0 : t.fullUrlHint) || "").trim();
  if (r) {
    if (n === r) return !1;
    const a = nr(n) && ya(n) || n,
      i = nr(r) && ya(r) || r;
    if (a === i) return !1;
  }
  return n.startsWith("content_ref:") || n.startsWith("blob:") || n.startsWith("data:") ? !0 : (/^https?:\/\//i.test(n), !1);
}

function NHe(e) {
  if (e) for (const t of ["previewActualSize", "imageSize", "previewSize"]) {
    const n = e[t];
    if (typeof n == "string" && n.trim()) return n.trim();
  }
}

function jMr(e) {
  if (!e) return;
  const t = NHe(e.ossSettings);
  if (t) return t;
  const n = e.imageWidth,
    r = e.imageHeight;
  if (typeof n == "number" && typeof r == "number" && n > 0 && r > 0) return yU(n, r);
}

async function DMr(e, t, n) {
  const r = () => {
      const s = NHe((e == null ? void 0 : e.settings) || {});
      if (!s) return;
      const l = tCn(s);
      if (l && !nl(l.w, l.h)) return s;
    },
    a = String(t || "").trim() || Zo(e ?? null) || "";
  if (n != null && n.preferRemoteProbe && a && /^https?:\/\//i.test(a)) {
    const s = await Z5(a);
    return s && s.width > 0 && s.height > 0 && yU(s.width, s.height) || r();
  }
  const i = r();
  if (i) return i;
  if (!a || !/^https?:\/\//i.test(a)) return;
  const o = await Z5(a);
  if (!(!o || o.width <= 0 || o.height <= 0)) return yU(o.width, o.height) || void 0;
}

function tCn(e) {
  if (typeof e != "string") return null;
  const t = e.trim().match(/^(\d+)\s*[×xX]\s*(\d+)$/);
  if (!t) return null;
  const n = Number(t[1]),
    r = Number(t[2]);
  return !Number.isFinite(n) || !Number.isFinite(r) || n <= 0 || r <= 0 ? null : {
    w: n,
    h: r
  };
}

function Tet(e, t) {
  const n = e.settings || {},
    r = n.generatedImages || [],
    a = r[Math.min(t, Math.max(0, r.length - 1))],
    i = Array.isArray(n._mjAssetIds) ? n._mjAssetIds.map(l => String(l || "").trim()).filter(Boolean) : [],
    o = Array.isArray(n._mjPreviewAssetIds) ? n._mjPreviewAssetIds.map(l => String(l || "").trim()).filter(Boolean) : [],
    s = [typeof n._contentAssetId == "string" ? n._contentAssetId : "", e._contentAssetId || "", (a == null ? void 0 : a.assetId) || "", i[t] || "", o[t] || ""].filter(Boolean);
  return Array.from(new Set(s));
}

async function hCt(e, t) {
  var _;
  const n = Math.max(0, Number((t == null ? void 0 : t.imageIndex) ?? ((_ = e.settings) == null ? void 0 : _.selectedMjImageIndex) ?? 0)),
    r = e.settings || {},
    a = r.generatedImages || [],
    i = a[Math.min(n, Math.max(0, a.length - 1))],
    o = String(e.content || "").trim(),
    s = String(r._ossThumbnailUrl || "").trim(),
    l = String((t == null ? void 0 : t.displaySrc) || "").trim(),
    d = /\/thumbnails\//i.test(o) || /\/thumbnails\//i.test(s) || /\/thumbnails\//i.test(l),
    u = (w, k) => nl(w, k) || d && (w === Ej || k === Ej),
    h = NHe(r);
  if (h) {
    const w = tCn(h);
    if (w && !u(w.w, w.h)) return {
      width: w.w,
      height: w.h
    };
  }
  const p = Zo(e, n),
    m = String((t == null ? void 0 : t.remoteUrlHint) || "").trim() || String((i == null ? void 0 : i.fullUrl) || "").trim() || p || "",
    f = [p, m, String(r._ossRemoteUrl || "").trim(), Go(l), Go(o), Go(s)].map(w => String(w || "").trim()).filter(w => w && /^https?:\/\//i.test(w) && !/\/thumbnails\//i.test(w));
  for (const w of f) {
    const k = await Bae(void 0, w);
    if (k && k.width > 0 && k.height > 0 && !nl(k.width, k.height)) return k;
  }
  const {
      readLocalOriginalAssetBlob: y
    } = await Ie(async () => {
      const {
        readLocalOriginalAssetBlob: w
      } = await Promise.resolve().then(() => Ui);
      return {
        readLocalOriginalAssetBlob: w
      };
    }, void 0, import.meta.url),
    {
      getImageDimensionsFromBlob: b
    } = await Ie(async () => {
      const {
        getImageDimensionsFromBlob: w
      } = await Promise.resolve().then(() => No);
      return {
        getImageDimensionsFromBlob: w
      };
    }, void 0, import.meta.url);
  for (const w of Tet(e, n)) try {
    const k = await y(w, m || f[0] || void 0);
    if (!(k != null && k.size)) continue;
    const A = await b(k);
    if (A.width > 0 && A.height > 0 && !nl(A.width, A.height)) return A;
  } catch {}
  try {
    const {
      assetStore: w
    } = await Ie(async () => {
      const {
        assetStore: k
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: k
      };
    }, void 0, import.meta.url);
    await w.init();
    for (const k of Tet(e, n)) try {
      const A = await w.getAssetBlob(k);
      if (!(A != null && A.size)) continue;
      const S = await b(A);
      if (S.width > 0 && S.height > 0 && !nl(S.width, S.height)) return S;
    } catch {}
  } catch {}
  const v = l;
  if (v.startsWith("blob:")) try {
    const {
        getFullBlobForDisplayUrl: w,
        getOriginalDimensionsForDisplayUrl: k
      } = await Ie(async () => {
        const {
          getFullBlobForDisplayUrl: E,
          getOriginalDimensionsForDisplayUrl: M
        } = await Promise.resolve().then(() => No);
        return {
          getFullBlobForDisplayUrl: E,
          getOriginalDimensionsForDisplayUrl: M
        };
      }, void 0, import.meta.url),
      A = k(v);
    if (A && A.width > 0 && !nl(A.width, A.height)) return A;
    const S = r._compactOriginalRelPath,
      C = Tet(e, n)[0],
      I = await w(v, C ?? null, S ?? null);
    if (I) {
      const E = await b(I);
      if (E.width > 0 && E.height > 0 && !nl(E.width, E.height)) return E;
    }
  } catch {}
  return null;
}

async function LMr(e, t) {
  const n = await hCt(e, t);
  if (!(!n || n.width <= 0 || n.height <= 0)) return yU(n.width, n.height);
}

function nCn(e) {
  const t = e.find(r => typeof r.imageWidth == "number" && typeof r.imageHeight == "number" && r.imageWidth > 0 && r.imageHeight > 0);
  if (!t) return {};
  const n = yU(t.imageWidth, t.imageHeight);
  return n ? {
    previewActualSize: n,
    previewSize: n,
    imageSize: n
  } : {};
}

async function rCn(e) {
  var i;
  const t = nCn(e);
  if (t.previewActualSize) return t;
  const n = String(((i = e[0]) == null ? void 0 : i.remoteUrl) || "").trim();
  if (!n || !/^https?:\/\//i.test(n)) return {};
  const r = await Z5(n);
  if (!r || r.width <= 0 || r.height <= 0) return {};
  const a = yU(r.width, r.height);
  return a ? {
    previewActualSize: a,
    previewSize: a,
    imageSize: a
  } : {};
}

function OMr(e) {
  var a;
  const t = ((a = e.split(/[?#]/, 1)[0]) == null ? void 0 : a.toLowerCase()) || "",
    n = /\.jpe?g$/.test(t) ? "image/jpeg" : /\.webp$/.test(t) ? "image/webp" : /\.gif$/.test(t) ? "image/gif" : "image/png",
    r = n === "image/jpeg" ? "jpg" : n.split("/")[1] || "png";
  return {
    mime: n,
    ext: r
  };
}

function aCn(e) {
  const t = String(e || "").toLowerCase();
  return !t || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(t) || t.includes("/videos/") ? !1 : /\/images\//i.test(t) || /\.(jpe?g|png|webp|gif|bmp)(\?|$)/i.test(t);
}

function iCn(e) {
  if (mo(sc()) === "qiniu") return !0;
  const t = String(e || "").trim();
  return t ? /(?:\?|&)imageView2\//i.test(t) ? !0 : N$(t) : !1;
}

function oCn(e) {
  const t = ya(e) || e,
    n = sc(),
    r = mo(n),
    a = t.includes("?") ? "&" : "?";
  return r === "aliyun-oss" ? MIn(t) ? PIn(t, Ej) || `${t}${a}x-oss-process=image/resize,l_512/format,png` : `${t}${a}x-oss-process=image/resize,l_512` : t;
}

const pLe = 12 * 1024 * 1024,
  BMr = 32 * 1024 * 1024;

async function nre(e, t, n) {
  const r = Cp(e) || e;
  if (!r || !nr(r) || /\/thumbnails\//i.test(r)) return null;
  const a = (n == null ? void 0 : n.maxBytes) ?? Jpt,
    i = await pCn(r);
  if (i != null && i > a) return null;
  const o = [0, 600, 1600];
  let s = "";
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    d > 0 && (await new Promise(u => window.setTimeout(u, d)));
    try {
      const {
          downloadWithFallback: u
        } = await Ie(async () => {
          const {
            downloadWithFallback: b
          } = await Promise.resolve().then(() => El);
          return {
            downloadWithFallback: b
          };
        }, void 0, import.meta.url),
        h = await u(r, 6e4, {
          cacheResult: !1
        });
      if (!(h != null && h.size) || h.size > a) {
        s = h != null && h.size ? `blob ${h.size} > max ${a}` : "empty blob";
        continue;
      }
      const p = await MHe(new File([h], `${t}.png`, {
          type: h.type || "image/png"
        })),
        m = await Eue(p),
        f = ya(m) || m;
      if (!f || !/\/thumbnails\//i.test(f)) {
        s = "thumbnail upload missing /thumbnails/";
        continue;
      }
      const y = await zue(new File([h], `${t}.png`, {
        type: h.type || "image/png"
      }));
      LK(f, Promise.resolve(r));
      try {
        await yY(p, {
          remoteUrl: r,
          displayUrl: f,
          mediaType: "image"
        });
      } catch {}
      return {
        displayUrl: f,
        imageWidth: y == null ? void 0 : y.width,
        imageHeight: y == null ? void 0 : y.height
      };
    } catch (u) {
      s = u instanceof Error ? u.message : String(u);
    }
  }
  return s && console.warn("[globalOssMaterial] 真实 512px 缩略图生成失败:", t, s), null;
}

function Qc(e) {
  const t = String(e || "").trim();
  return t ? /(?:\?|&)x-oss-process=image\/resize/i.test(t) || /(?:\?|&)imageView2\/2\/w\/\d+/i.test(t) : !1;
}

function Rk(e) {
  const t = ya(e) || e;
  return t ? /\/thumbnails\//i.test(t) || Qc(t) || !aCn(t) ? t : mo(sc()) === "qiniu" ? "" : oCn(t) : e;
}

function ym(e) {
  const t = String(e || "").trim();
  if (!t || Ko(t)) return "";
  if (/\/images\//i.test(t) && /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(t)) {
    const n = Due(t);
    return ya(n) || n;
  }
  return /\/thumbnails\//i.test(t) || Qc(t) ? ya(t) || t : /^https?:\/\//i.test(t) && /\/images\//i.test(t) && !/\/thumbnails\//i.test(t) ? mo(sc()) === "qiniu" ? "" : Rk(t) : t;
}

async function KHt(e, t, n, r, a) {
  var y;
  const i = (e.type || n || "image/png").split(";")[0].trim() || "image/png";
  let o = r || "png";
  i.includes("jpeg") || i.includes("jpg") ? o = "jpg" : i.includes("webp") ? o = "webp" : i.includes("gif") ? o = "gif" : i.includes("png") && (o = "png");
  const s = new File([e], `${t}.${o}`, {
      type: i
    }),
    l = await zue(s),
    d = await MHe(s),
    u = await Eue(d),
    h = ya(u) || u,
    p = jK(s);
  LK(h, p);
  try {
    (y = a == null ? void 0 : a.onDisplayReady) == null || y.call(a, {
      displayUrl: h,
      imageWidth: l == null ? void 0 : l.width,
      imageHeight: l == null ? void 0 : l.height,
      index: a == null ? void 0 : a.resultIndex
    });
  } catch {}
  const m = await p;
  return {
    remoteUrl: ya(m) || m,
    displayUrl: h,
    imageWidth: l == null ? void 0 : l.width,
    imageHeight: l == null ? void 0 : l.height
  };
}

const DV = 16 * 1024 * 1024,
  $Ee = 8 * 1024 * 1024,
  EY = "_sourceRemoteResultUrl",
  sCn = 48 * 1024;

function lCn(e) {
  return e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255 || e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 || e.length >= 12 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80 || e.length >= 6 && e[0] === 71 && e[1] === 73 && e[2] === 70 && e[3] === 56 && (e[4] === 55 || e[4] === 57) && e[5] === 97;
}

function cCn(e) {
  return e.length >= 8 && e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 || e.length >= 4 && e[0] === 26 && e[1] === 69 && e[2] === 223 && e[3] === 163;
}

async function FMr(e, t) {
  const n = String(e.type || "").toLowerCase();
  if (n.startsWith("image/")) throw new Error(`[video guard] ${t}: blob MIME 为图片 (${n}, ${e.size} bytes)`);
  const r = new Uint8Array(await e.slice(0, 16).arrayBuffer());
  if (lCn(r)) throw new Error(`[video guard] ${t}: 字节魔数为图片而非视频 (${e.size} bytes)`);
  if (!cCn(r) && !(n.startsWith("video/") && e.size >= sCn)) throw new Error(`[video guard] ${t}: 无法识别为视频容器 (mime=${n || "unknown"}, ${e.size} bytes)`);
}

function Kpt(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
  if (Ko(t)) return !0;
  try {
    const n = new URL(t).hostname.toLowerCase();
    if (n === "vidgen.x.ai" || n.endsWith(".vidgen.x.ai")) return !0;
  } catch {
    if (/vidgen\.x\.ai/i.test(t)) return !0;
  }
  return !1;
}

async function qwe(e) {
  const t = String(e || "").trim();
  if (!t || !/^https?:\/\//i.test(t)) return !1;
  if (QE(t)) return !0;
  if (!iy(t) && !/\/videos\//i.test(t) || Kpt(t)) return !1;
  try {
    const n = await fetch(t, {
      method: "HEAD",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "video/*,application/octet-stream,*/*;q=0.8"
      }
    });
    if (n.ok) {
      const r = String(n.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
      if (r.startsWith("image/")) return !0;
      const a = Number(n.headers.get("content-length") || 0);
      if (Number.isFinite(a) && a > 0 && a < sCn && !r.startsWith("video/")) return !0;
    }
  } catch {}
  try {
    const n = await fetch(t, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Range: "bytes=0-63",
        Accept: "video/*,application/octet-stream,*/*;q=0.8"
      }
    });
    if (!n.ok && n.status !== 206) return !1;
    const r = new Uint8Array(await n.arrayBuffer());
    if (lCn(r)) return !0;
    if (cCn(r)) return !1;
    if (r.length > 0 && r.length < 32) return !0;
  } catch {}
  return !1;
}

async function dCn(e, t, n) {
  var s, l, d;
  const r = t.replace(/[^\w.\-]+/g, "_").slice(0, 64);
  if (e.startsWith("data:")) {
    try {
      const h = await (await fetch(e)).blob();
      if (h != null && h.size) {
        if (h.size > DV) throw new Error(`[OOM guard] 图片兼容链拒绝 Base64 ${h.size} 字节进入 WebView（上限 ${DV}）`);
        return await KHt(h, r, h.type || "image/png", "png", n);
      }
    } catch (u) {
      if (u instanceof Error && u.message.includes("[OOM guard]")) throw u;
      console.warn("[globalOssMaterial] Base64 缩略图优先链失败，回退兼容链:", u instanceof Error ? u.message : String(u));
    }
    try {
      const u = await C3n(e, `${r}.png`, "images");
      if (u) {
        const p = await (await fetch(e)).blob(),
          m = new File([p], `${r}.png`, {
            type: p.type || "image/png"
          }),
          f = await zue(m),
          y = await MHe(m),
          b = await Eue(y),
          v = ya(b) || b;
        LK(v, Promise.resolve(u));
        try {
          (s = n == null ? void 0 : n.onDisplayReady) == null || s.call(n, {
            displayUrl: v,
            imageWidth: f == null ? void 0 : f.width,
            imageHeight: f == null ? void 0 : f.height,
            index: n == null ? void 0 : n.resultIndex
          });
        } catch {}
        return {
          remoteUrl: ya(u),
          displayUrl: v,
          imageWidth: f == null ? void 0 : f.width,
          imageHeight: f == null ? void 0 : f.height
        };
      }
    } catch (u) {
      console.warn("[globalOssMaterial] Base64 原文直传失败，回退兼容链:", u instanceof Error ? u.message : String(u));
    }
  }
  if (/^https?:\/\//i.test(e)) {
    const {
        mime: u,
        ext: h
      } = OMr(e),
      p = mo(sc());
    try {
      if (p === "qiniu") {
        const m = await S3n(e, `${r}.${h}`, u);
        if (m != null && m.remoteUrl) {
          const f = ya(m.remoteUrl) || m.remoteUrl;
          let y = m.displayUrl && /\/thumbnails\//i.test(m.displayUrl) ? m.displayUrl : "",
            b = m.imageWidth,
            v = m.imageHeight;
          if (!y) {
            let _ = await nre(f, r, {
              maxBytes: pLe
            });
            !_ && e !== f && (_ = await nre(e, r, {
              maxBytes: pLe
            })), _ || (_ = await nre(e !== f ? e : f, r, {
              maxBytes: BMr
            })), _ && (y = _.displayUrl, b = _.imageWidth ?? b, v = _.imageHeight ?? v);
          }
          if (!y) return console.warn("[globalOssMaterial] 七牛转存成功但 512px 缩略图暂缺，保留原图供后续切图/补缩略图:", r), {
            remoteUrl: f,
            displayUrl: "",
            imageWidth: b,
            imageHeight: v
          };
          LK(y, Promise.resolve(f));
          try {
            (l = n == null ? void 0 : n.onDisplayReady) == null || l.call(n, {
              displayUrl: y,
              imageWidth: b,
              imageHeight: v,
              index: n == null ? void 0 : n.resultIndex
            });
          } catch {}
          return {
            remoteUrl: f,
            displayUrl: y,
            imageWidth: b,
            imageHeight: v
          };
        }
      } else {
        const m = await m5t(e, `${r}.${h}`, u, "images");
        if (m) {
          const f = oCn(m);
          let y = "",
            b,
            v;
          const _ = ya(m) || m;
          try {
            const w = await Promise.race([Z5(f), new Promise(k => window.setTimeout(() => k(null), 2500))]);
            if (w && w.width > 0 && w.height > 0) y = f, b = w.width, v = w.height;else {
              const k = await nre(m, r);
              k ? (y = k.displayUrl, b = k.imageWidth ?? b, v = k.imageHeight ?? v) : y = f;
            }
          } catch {}
          y && LK(y, Promise.resolve(_));
          try {
            (d = n == null ? void 0 : n.onDisplayReady) == null || d.call(n, {
              displayUrl: y || "",
              imageWidth: b,
              imageHeight: v,
              index: n == null ? void 0 : n.resultIndex
            });
          } catch {}
          return {
            remoteUrl: _,
            displayUrl: y,
            imageWidth: b,
            imageHeight: v
          };
        }
      }
    } catch (m) {
      console.warn("[globalOssMaterial] 后端远程直传失败，回退前端兼容链:", m instanceof Error ? m.message : String(m));
    }
  }
  let a = null;
  if (e.startsWith("data:image") || e.startsWith("data:")) a = await (await fetch(e)).blob();else if (e.startsWith("blob:")) try {
    const u = await fetch(e);
    u.ok && (a = await u.blob());
  } catch {} else if (e.startsWith("http://") || e.startsWith("https://")) {
    if (!iCn(e)) try {
      const h = await fetch(e, {
          method: "HEAD"
        }),
        p = Number(h.headers.get("content-length") || 0);
      if (Number.isFinite(p) && p > DV) throw new Error(`[OOM guard] 图片兼容链拒绝 Content-Length=${p} > ${DV}: ${e.slice(0, 80)}`);
    } catch (h) {
      if (h instanceof Error && h.message.includes("[OOM guard]")) throw h;
    }
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
    a = await u(e, 12e4, {
      cacheResult: !1
    });
  }
  if (!a || !a.size) throw new Error(`无法读取生成图: ${e.slice(0, 80)}`);
  if (a.size > DV) throw new Error(`[OOM guard] 图片兼容链拒绝 ${a.size} 字节进入 WebView（上限 ${DV}）: ${e.slice(0, 80)}`);
  const i = a.type || "image/png";
  let o = "png";
  return i.includes("jpeg") || i.includes("jpg") ? o = "jpg" : i.includes("webp") ? o = "webp" : i.includes("gif") && (o = "gif"), KHt(a, r, i, o, n);
}

async function pCt(e, t) {
  var h;
  const n = t.replace(/[^\w.\-]+/g, "_").slice(0, 64);
  if (/^https?:\/\//i.test(e)) {
    if (e = nCt(e) || e, !Kpt(e) && (await qwe(e))) throw new Error(`[video guard] 源 URL 响应为图片封面，拒绝写入 videos/: ${e.slice(0, 96)}`);
    const p = ((h = e.split(/[?#]/, 1)[0]) == null ? void 0 : h.toLowerCase()) || "",
      m = /\.webm$/.test(p) ? "webm" : /\.mov$/.test(p) ? "mov" : "mp4",
      f = m === "webm" ? "video/webm" : m === "mov" ? "video/quicktime" : "video/mp4";
    try {
      const y = await m5t(e, `${n}.${m}`, f, "videos");
      if (y) {
        const b = ya(y) || y;
        if (await qwe(b)) throw new Error(`[video guard] 转存结果仍为图片封面，拒绝上屏播放: ${b.slice(0, 96)}`);
        const v = await eCn(b || e, n),
          _ = v.posterUrl;
        return {
          remoteUrl: b,
          displayUrl: _ || b,
          ...(_ ? {
            posterUrl: _
          } : {}),
          imageWidth: v.imageWidth,
          imageHeight: v.imageHeight
        };
      }
    } catch (y) {
      const b = y instanceof Error ? y.message : String(y);
      if (b.includes("[video guard]") && b.includes("源 URL")) throw y instanceof Error ? y : new Error(b);
      console.warn("[globalOssMaterial] 视频后端远程直传失败，回退前端兼容链（对齐本地直下）:", b);
    }
  }
  let r = null;
  if (e.startsWith("blob:") || e.startsWith("data:")) r = await (await fetch(e)).blob();else if (e.startsWith("http://") || e.startsWith("https://")) {
    if (!Kpt(e)) try {
      const m = await fetch(e, {
          method: "HEAD"
        }),
        f = Number(m.headers.get("content-length") || 0);
      if (Number.isFinite(f) && f > $Ee) throw new Error(`[OOM guard] 视频兼容链拒绝 Content-Length=${f} > ${$Ee}: ${e.slice(0, 80)}`);
      const y = String(m.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
      if (y.startsWith("image/")) throw new Error(`[video guard] 兼容链 HEAD 为图片 (${y})，拒绝下载转存: ${e.slice(0, 80)}`);
    } catch (m) {
      if (m instanceof Error && (m.message.includes("[OOM guard]") || m.message.includes("[video guard]"))) throw m;
    }
    const {
      downloadWithFallback: p
    } = await Ie(async () => {
      const {
        downloadWithFallback: m
      } = await Promise.resolve().then(() => El);
      return {
        downloadWithFallback: m
      };
    }, void 0, import.meta.url);
    r = await p(e, 3e5, {
      cacheResult: !1
    });
  }
  if (!r || !r.size) throw new Error(`无法读取生成视频: ${e.slice(0, 80)}`);
  if (r.size > $Ee) throw new Error(`[OOM guard] 视频兼容链拒绝 ${r.size} 字节进入 WebView（上限 ${$Ee}）: ${e.slice(0, 80)}`);
  await FMr(r, "兼容链");
  const a = r.type || "video/mp4";
  let i = "mp4";
  a.includes("webm") ? i = "webm" : (a.includes("quicktime") || a.includes("mov")) && (i = "mov");
  const o = new File([r], `${n}.${i}`, {
      type: a
    }),
    s = await dCt(o),
    l = ya(s.remoteUrl) || s.remoteUrl,
    d = s.posterUrl || (s.displayUrl && s.displayUrl !== s.remoteUrl ? ya(s.displayUrl) || s.displayUrl : void 0);
  return {
    remoteUrl: l,
    displayUrl: d || l,
    posterUrl: d,
    imageWidth: s.imageWidth,
    imageHeight: s.imageHeight
  };
}

async function zMr(e, t) {
  let n = null;
  if (e.startsWith("blob:") || e.startsWith("data:")) n = await (await fetch(e)).blob();else if (e.startsWith("http://") || e.startsWith("https://")) {
    const {
      downloadWithFallback: d
    } = await Ie(async () => {
      const {
        downloadWithFallback: u
      } = await Promise.resolve().then(() => El);
      return {
        downloadWithFallback: u
      };
    }, void 0, import.meta.url);
    n = await d(e, 3e5, {
      cacheResult: !1
    });
  }
  if (!n || !n.size) throw new Error(`无法读取生成音频: ${e.slice(0, 80)}`);
  const r = n.type || "audio/mpeg";
  let a = "mp3";
  r.includes("wav") ? a = "wav" : r.includes("ogg") ? a = "ogg" : (r.includes("mp4") || r.includes("aac")) && (a = "m4a");
  const i = t.replace(/[^\w.\-]+/g, "_").slice(0, 64),
    o = new File([n], `${i}.${a}`, {
      type: r
    }),
    s = await uCt(o),
    l = ya(s.remoteUrl);
  return {
    remoteUrl: l,
    displayUrl: l
  };
}

function Qpt(e, t, n) {
  var o;
  const r = String(((o = e == null ? void 0 : e.remoteUrls) == null ? void 0 : o[0]) || "").trim();
  if (r && !Ko(r)) return r;
  const a = String(n || "").trim();
  if (a) return a;
  const i = String(t || "").trim();
  return ua() && Ko(i) ? "" : i;
}

function Ypt(e, t, n) {
  const r = String(e || "").trim();
  if (r.startsWith("http://") || r.startsWith("https://")) return r;
  const a = String(t || "").trim();
  if (a.startsWith("http://") || a.startsWith("https://")) return a;
  const i = String(n || "").trim();
  return i || a;
}

async function xT(e, t, n, r) {
  return !ua() || e.length === 0 ? null : qVe.run(async () => {
    try {
      if (n) {
        const s = String(e[0] || "").trim(),
          l = await pCt(s, t),
          d = Ay(l.posterUrl, l.displayUrl),
          u = typeof l.imageWidth == "number" && typeof l.imageHeight == "number" && l.imageWidth > 0 && l.imageHeight > 0 ? yU(l.imageWidth, l.imageHeight) : void 0;
        return {
          displayUrls: d ? [d] : [],
          remoteUrls: [l.remoteUrl],
          generatedImages: [{
            id: t,
            thumbUrl: d || "",
            fullUrl: l.remoteUrl,
            createdAt: Date.now()
          }],
          imageWidth: l.imageWidth,
          imageHeight: l.imageHeight,
          ossSettings: {
            [Cl]: !0,
            [_i]: l.remoteUrl,
            ...(d ? {
              [Pi]: d
            } : {}),
            ...(s && /^https?:\/\//i.test(s) ? {
              [EY]: s
            } : {}),
            disableThumbnailCreationOnImport: !0,
            ...(u ? {
              previewActualSize: u,
              previewSize: u
            } : {})
          }
        };
      }
      const a = await mCt(e, t, r);
      if (!(a != null && a.length)) return null;
      const i = await rCn(a),
        o = a[0];
      return {
        displayUrls: a.map(s => s.displayUrl),
        remoteUrls: a.map(s => s.remoteUrl),
        generatedImages: uCn(a, t),
        imageWidth: o.imageWidth,
        imageHeight: o.imageHeight,
        ossSettings: {
          [Cl]: !0,
          [_i]: a[0].remoteUrl,
          [Pi]: a[0].displayUrl,
          disableThumbnailCreationOnImport: !0,
          ...i
        }
      };
    } catch (a) {
      return console.warn("[globalOssMaterial] 生成结果上传 OSS 失败，将回退本地缓存:", a), null;
    }
  });
}

async function mCt(e, t, n) {
  if (!ua() || e.length === 0) return null;
  try {
    const r = [];
    for (let a = 0; a < e.length; a++) r.push(await dCn(e[a], `${t}_${a}`, {
      ...n,
      resultIndex: a,
      onDisplayReady: a === 0 ? n == null ? void 0 : n.onDisplayReady : void 0
    })), a + 1 < e.length && (await new Promise(i => window.setTimeout(i, 0)));
    return r;
  } catch (r) {
    return console.warn("[globalOssMaterial] 生成结果上传 OSS 失败，将回退本地缓存:", r), null;
  }
}

function uCn(e, t) {
  return e.map((n, r) => ({
    id: `${t}_${r}`,
    thumbUrl: n.displayUrl,
    fullUrl: n.remoteUrl,
    createdAt: Date.now()
  }));
}

async function _P(e) {
  var r;
  const t = (e.type || "").toLowerCase(),
    n = ((r = e.name.split(".").pop()) == null ? void 0 : r.toLowerCase()) || "";
  return t.startsWith("video/") || ["mp4", "mov", "webm", "mkv", "avi", "m4v", "flv"].includes(n) ? dCt(e) : t.startsWith("audio/") || ["mp3", "wav", "m4a", "aac", "flac", "ogg", "opus"].includes(n) ? uCt(e) : W$(e);
}

function Hv(e, t) {
  const n = e.imageWidth,
    r = e.imageHeight,
    a = typeof n == "number" && typeof r == "number" && n > 0 && r > 0 && Number.isFinite(n) && Number.isFinite(r) ? `${n}×${r}` : void 0,
    i = ya(e.remoteUrl) || e.remoteUrl,
    o = ya(e.displayUrl) || e.displayUrl,
    s = e.mediaType === "video",
    l = s && typeof (t == null ? void 0 : t.videoPosterUrl) == "string" ? String(t.videoPosterUrl).trim() : "",
    d = s && (e.posterUrl || l || (o && o !== i && !/\/videos\//i.test(o) ? o : void 0)) || void 0;
  return {
    content: (t == null ? void 0 : t.animatedImage) === !0 && i ? i : o,
    videoPosterUrl: s && d ? d : void 0,
    settings: {
      mediaType: e.mediaType,
      [_i]: i,
      [Pi]: o,
      [Cl]: !0,
      [T0]: !1,
      disableThumbnailCreationOnImport: !0,
      ...(a ? {
        imageSize: a
      } : {}),
      ...(s && d ? {
        videoPosterUrl: d
      } : {}),
      ...t
    },
    _contentAssetId: void 0
  };
}

function q$(e, t, n) {
  t(r => r.map(a => a.id === e ? {
    ...a,
    ...n,
    settings: {
      ...a.settings,
      ...n.settings
    },
    _contentAssetId: void 0
  } : a));
}

function Kwe(e) {
  if (!ua() || e.type !== "input-image") return !1;
  const t = e.settings || {};
  if (String(t.mediaType || "") !== "video") return !1;
  const n = [e.videoPosterUrl, t.videoPosterUrl, t[Pi], typeof e.content == "string" ? e.content : ""];
  for (const r of n) {
    const a = String(r || "").trim();
    if (a && tl(a) && !iy(a)) return !1;
  }
  return !0;
}

function jHe(e) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return !1;
  const t = e.settings || {};
  if ((typeof e.content == "string" ? e.content.trim() : "") || (typeof e.videoPosterUrl == "string" ? String(e.videoPosterUrl).trim() : "") || typeof e.thumbnailUrl == "string" && e.thumbnailUrl.trim() || typeof t.videoPosterUrl == "string" && t.videoPosterUrl.trim() || typeof t._localVideoPlaybackUrl == "string" && t._localVideoPlaybackUrl.trim() || typeof t[_i] == "string" && String(t[_i]).trim() || typeof t[Pi] == "string" && String(t[Pi]).trim() || typeof t._canvasDisplayPreviewUrl == "string" && t._canvasDisplayPreviewUrl.trim()) return !0;
  const a = t.generatedImages;
  if (Array.isArray(a) && a.length > 0) for (const i of a) {
    if (!i || typeof i != "object") continue;
    const o = i;
    if (typeof o.thumbUrl == "string" && o.thumbUrl.trim() || typeof o.fullUrl == "string" && o.fullUrl.trim() || typeof o.url == "string" && o.url.trim()) return !0;
  }
  for (const i of ["mjImages", "previewMjImages", "batchImages"]) {
    const o = t[i];
    if (Array.isArray(o) && o.some(s => typeof s == "string" && s.trim())) return !0;
  }
  return !1;
}

function Vle(e) {
  if (!ua() || e.type !== "gen-video" || !jHe(e) || !P0(e)) return !1;
  const t = e.settings || {},
    n = Array.isArray(t.generatedImages) ? t.generatedImages[0] : void 0,
    r = [e.videoPosterUrl, t.videoPosterUrl, t[Pi], n == null ? void 0 : n.thumbUrl, typeof e.content == "string" ? e.content : ""];
  for (const a of r) {
    const i = String(a || "").trim();
    if (i && tl(i) && !iy(i)) return !1;
  }
  return !0;
}

function UMr(e) {
  const n = [(e.settings || {})[_i], typeof e.content == "string" ? e.content : ""];
  for (const r of n) {
    const a = ya(String(r || "").trim()) || String(r || "").trim();
    if (a && /^https?:\/\//i.test(a) && iy(a)) return a;
  }
  return "";
}

function fCt(e) {
  return Ay(kHe(e));
}

function gCt(e) {
  if (!Kwe(e)) return null;
  const t = UMr(e);
  if (!t) return null;
  const n = fCt(t);
  return n ? Hv({
    remoteUrl: t,
    displayUrl: n,
    mediaType: "video",
    posterUrl: n
  }) : null;
}

function yCt(e, t) {
  if (!Vle(e)) return null;
  if (Array.isArray(t) && t.length > 0) {
    const a = bCt(t, e);
    if (a) return Xpt(e, a);
  }
  const n = P0(e);
  if (!n) return null;
  const r = fCt(n);
  return r ? Xpt(e, r) : null;
}

const $Mr = 2e3;

function bU(e, t) {
  if (e.delete(t), e.add(t), e.size > $Mr) {
    const n = e.values().next().value;
    n !== void 0 && e.delete(n);
  }
}

const mLe = new Set();

async function hCn(e, t) {
  if (!ua() || e.type !== "gen-video") return !1;
  const n = String(e.id || "").trim();
  if (!n || mLe.has(n)) return !1;
  const r = P0(e);
  if (!r || !/^https?:\/\//i.test(r) || !(await qwe(r))) return !1;
  bU(mLe, n);
  const a = e.settings || {},
    i = String(a[EY] || a._pendingRemoteResultUrl || "").trim(),
    s = Ay(e.videoPosterUrl, a.videoPosterUrl, a[Pi], typeof e.content == "string" ? e.content : "") || r;
  if (i && /^https?:\/\//i.test(i) && i !== r && !(await qwe(i))) try {
    const d = await pCt(i, `${n}-rehost`),
      u = Ay(d.posterUrl, d.displayUrl, s);
    return t(n, {
      content: u || s,
      videoPosterUrl: u || s,
      settings: {
        ...a,
        [Cl]: !0,
        [_i]: d.remoteUrl,
        ...(u ? {
          [Pi]: u
        } : {}),
        [EY]: i,
        videoPosterUrl: u || s,
        generatedImages: [{
          id: `${n}-rehost`,
          thumbUrl: u || "",
          fullUrl: d.remoteUrl,
          createdAt: Date.now()
        }],
        error: null
      }
    }), console.info("[globalOssMaterial] 已重传真实视频，替换假 mp4 封面对象:", n), !0;
  } catch (d) {
    console.warn("[globalOssMaterial] 假 mp4 重传失败，降级为封面-only:", d instanceof Error ? d.message : d);
  }
  const l = i && /^https?:\/\//i.test(i) && i !== r && !Ko(i) ? i : "";
  return t(n, {
    content: s,
    videoPosterUrl: s,
    settings: {
      ...a,
      [Pi]: s,
      videoPosterUrl: s,
      ...(l ? {
        [_i]: l,
        generatedImages: [{
          id: `${n}-fallback`,
          thumbUrl: s,
          fullUrl: l,
          createdAt: Date.now()
        }]
      } : {
        [_i]: "",
        generatedImages: []
      }),
      error: l ? null : "视频文件异常（图床中为封面图），请重新生成"
    }
  }), !0;
}

function bCt(e, t) {
  if (!Array.isArray(e) || e.length === 0) return "";
  const n = String(t.id || "").trim(),
    r = P0(t);
  let a = "";
  for (const i of e) {
    if (i.type !== "video") continue;
    const o = Ay(i.videoPosterUrl, i._ossThumbnailUrl, i.thumbnailUrl, typeof i.url == "string" && /\/thumbnails\//i.test(i.url) ? i.url : "");
    if (o) {
      if (n && String(i.sourceNodeId || "").trim() === n) return o;
      jHe(t) && r && [i._ossRemoteUrl, i.originalUrl, i.url].some(s => String(s || "").trim() === r) && (a = o);
    }
  }
  return a;
}

function GMr(e, t = []) {
  if (!ua() || !e.length) return e;
  const n = Array.isArray(t) ? t : [],
    r = [...e];
  let a = !1;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (!Vle(o)) continue;
    let s = n.length > 0 ? bCt(n, o) : "";
    if (!s) {
      const d = P0(o);
      s = d ? fCt(d) : "";
    }
    if (!s) continue;
    const l = Xpt(o, s);
    l && (r[i] = {
      ...o,
      ...l,
      settings: {
        ...(o.settings || {}),
        ...l.settings
      }
    }, a = !0);
  }
  return a ? r : e;
}

function Xpt(e, t, n) {
  const r = Ay(t);
  if (!r) return null;
  const a = P0(e),
    i = e.settings || {},
    o = Array.isArray(i.generatedImages) ? [...i.generatedImages] : [];
  if (o.length > 0) {
    const s = {
      ...o[0],
      thumbUrl: r
    };
    !s.fullUrl && !s.url && (s.fullUrl = a || r), o[0] = s;
  }
  return {
    content: r,
    videoPosterUrl: r,
    settings: {
      ...i,
      [Pi]: r,
      [_i]: typeof i[_i] == "string" && String(i[_i]).trim() || a || void 0,
      videoPosterUrl: r,
      ...(o.length > 0 ? {
        generatedImages: o
      } : {})
    }
  };
}

function vCt(e) {
  if (!ua() || e.type !== "gen-image" || e.isGenerating) return !1;
  const t = e.settings || {};
  if (t.isGenerating === !0 || t._ossSoftServerThumb === !0) return !1;
  const n = Array.isArray(t.generatedImages) ? t.generatedImages[0] : void 0,
    r = [typeof e.content == "string" ? e.content : "", typeof e.thumbnailUrl == "string" ? e.thumbnailUrl : "", t[Pi], t._canvasDisplayPreviewUrl, n == null ? void 0 : n.thumbUrl];
  for (const i of r) if (/\/thumbnails\//i.test(String(i || ""))) return !1;
  const a = Zo(e);
  return !!(a && nr(a) && /\/images\//i.test(a) && !/\/thumbnails\//i.test(a));
}

function VMr(e) {
  const t = String(Zo(e) || "").trim().split(/[?#]/, 1)[0];
  return `${String(e.id || "").trim()}\0${t}`;
}

const Jpt = 4 * 1024 * 1024;

async function pCn(e) {
  const t = String(e || "").trim();
  if (!t || !/^https?:\/\//i.test(t) || iCn(t)) return null;
  try {
    const n = await fetch(t, {
      method: "HEAD",
      credentials: "omit",
      cache: "no-store"
    });
    if (!n.ok) return null;
    const r = Number(n.headers.get("content-length") || 0);
    if (Number.isFinite(r) && r > 0) return r;
  } catch {}
  return null;
}

function GEe(e, t, n, r) {
  const a = !!(r != null && r.softServerThumb),
    i = {
      ...(e.settings || {})
    },
    o = Array.isArray(i.generatedImages) ? [...i.generatedImages] : [];
  o.length > 0 ? o[0] = {
    ...o[0],
    thumbUrl: t,
    fullUrl: String(o[0].fullUrl || n).trim() || n
  } : o.push({
    id: `heal-${Date.now()}`,
    thumbUrl: t,
    fullUrl: n,
    createdAt: Date.now()
  });
  const s = Array.isArray(i.generationVersions) ? [...i.generationVersions] : null,
    l = Math.max(0, Number(i.activeGenerationVersionIndex ?? 0));
  if (s && s[l]) {
    const d = {
      ...s[l]
    };
    d.ossThumbnailUrl = t, d.thumbnailUrl = t;
    const u = String(d.content || "").trim();
    (!u || /\/images\//i.test(u) && !/\/thumbnails\//i.test(u)) && (d.content = t);
    const h = Array.isArray(d.generatedImages) ? [...d.generatedImages] : [];
    h[0] && (h[0] = {
      ...h[0],
      thumbUrl: t,
      fullUrl: String(h[0].fullUrl || n).trim() || n
    }, d.generatedImages = h), s[l] = d;
  }
  return {
    content: t,
    thumbnailUrl: t,
    settings: {
      [Pi]: t,
      [_i]: String(i[_i] || "").trim() || n,
      [Cl]: !0,
      generatedImageUrl: t,
      generatedImages: o,
      mjImages: [t],
      previewMjImages: [t],
      batchImages: [t],
      _canvasDisplayPreviewUrl: t,
      ...(a ? {
        _ossSoftServerThumb: !0
      } : {
        _ossSoftServerThumb: !1
      }),
      ...(s ? {
        generationVersions: s
      } : {})
    }
  };
}

async function mCn(e) {
  if (!vCt(e)) return null;
  const t = Zo(e);
  if (!t || !nr(t)) return null;
  const n = ya(t) || t,
    r = Rk(n) || n,
    a = r,
    i = mo(sc()) === "qiniu" && /\/images\//i.test(r) && !/\/thumbnails\//i.test(r) && !Qc(r),
    o = () => i ? null : GEe(e, r, n, {
      softServerThumb: !0
    });
  if (i) {
    const u = `heal-${String(e.id || "node").replace(/[^\w.-]+/g, "_").slice(0, 24)}-${Date.now().toString(36)}`,
      h = await nre(n, u, {
        maxBytes: pLe
      });
    return h ? GEe(e, h.displayUrl, n) : null;
  }
  const s = await pCn(a);
  if (s != null && s > Jpt) return o();
  const {
    downloadWithFallback: l
  } = await Ie(async () => {
    const {
      downloadWithFallback: u
    } = await Promise.resolve().then(() => El);
    return {
      downloadWithFallback: u
    };
  }, void 0, import.meta.url);
  let d = null;
  try {
    d = await l(a, 12e4, {
      cacheResult: !1
    });
  } catch {
    d = null;
  }
  if (!(d != null && d.size)) return o();
  if (d.size > Jpt) return d.size, d = null, o();
  try {
    const u = `heal-${String(e.id || "node").replace(/[^\w.-]+/g, "_").slice(0, 24)}-${Date.now().toString(36)}`,
      h = await H$(d, u);
    d = null;
    const p = await Eue(h),
      m = ya(p) || p;
    if (!m || !/\/thumbnails\//i.test(m)) return o();
    LK(m, Promise.resolve(n));
    try {
      await yY(h, {
        remoteUrl: n,
        displayUrl: m,
        mediaType: "image"
      });
    } catch {}
    return GEe(e, m, n);
  } catch (u) {
    return console.warn("[globalOssMaterial] 补缩略图上传失败，回退服务端缩放:", String(e.id || ""), u), GEe(e, r, n, {
      softServerThumb: !0
    });
  }
}

const Cbe = new Set(),
  rre = new Set();

function Qwe(e, t) {
  if (!ua() || !t || !vCt(e) || !String(e.id || "").trim()) return;
  const r = VMr(e);
  if (Cbe.has(r) || rre.has(r)) return;
  if (Yi()) {
    const o = $v(s => {
      s || (o(), Qwe(e, t));
    });
    return;
  }
  rre.add(r);
  const a = e,
    i = async () => {
      try {
        if (Yi()) {
          rre.delete(r);
          const s = $v(l => {
            l || (s(), Qwe(a, t));
          });
          return;
        }
        const o = await mCn(a);
        o && q$(a.id, t, o), bU(Cbe, r);
      } catch (o) {
        console.warn("[globalOssMaterial] 绘画节点补缩略图失败:", String(a.id || ""), o), bU(Cbe, r);
      } finally {
        rre.delete(r);
      }
    };
  typeof requestIdleCallback < "u" ? requestIdleCallback(() => void i(), {
    timeout: 2500
  }) : setTimeout(() => void i(), 120);
}

const Hle = new Set();

async function HMr(e, t, n) {
  var a;
  if (!ua()) return;
  for (const i of e) (Vle(i) || Kwe(i)) && Hle.delete(String(i.id || ""));
  const r = Array.isArray(n == null ? void 0 : n.historyHint) ? n.historyHint : [];
  for (const i of e) {
    if ((a = n == null ? void 0 : n.isCancelled) != null && a.call(n)) return;
    const o = i.type === "gen-video" && Vle(i) ? yCt(i, r) : i.type === "input-image" && Kwe(i) ? gCt(i) : null;
    o && (q$(i.id, t, o), bU(Hle, String(i.id || "")));
  }
}

function Ywe(e, t, n) {
  if (!ua() || !t) return;
  const r = String(e.id || "").trim();
  if (!r || Hle.has(r)) return;
  const a = e.type === "gen-video" && Vle(e) ? "gen" : e.type === "input-image" && Kwe(e) ? "input" : null;
  if (!a) return;
  const i = a === "gen" ? yCt(e, n) : gCt(e);
  i && (bU(Hle, r), q$(r, t, i));
}

const Met = new Set();

function fCn(e, t, n) {
  if (!ua() || Met.has(e)) return;
  Met.add(e), t(a => a.map(i => i.id === e ? {
    ...i,
    settings: {
      ...i.settings,
      [T0]: !0
    }
  } : i));
  const r = async () => {
    try {
      const a = await _P(n);
      q$(e, t, Hv(a));
    } catch (a) {
      console.warn("[globalOssMaterial] URL-only 上传失败:", e, a), t(i => i.map(o => o.id === e ? {
        ...o,
        settings: {
          ...o.settings,
          [T0]: !1
        }
      } : o));
    } finally {
      Met.delete(e);
    }
  };
  typeof requestIdleCallback < "u" ? requestIdleCallback(() => void r(), {
    timeout: 2e3
  }) : setTimeout(() => void r(), 50);
}

function WMr(e, t, n) {
  n.file && fCn(e, t, n.file);
}

function sZ(e) {
  for (const t of [e._ossThumbnailUrl, e.thumbnailUrl, e._ossRemoteUrl, e.originalUrl, e.url]) if (t && ff(t)) return ya(t) || t;
  return Bd(e);
}

function jg(e) {
  for (const r of [e._ossThumbnailUrl, e.thumbnailUrl]) if (r && ff(r)) {
    const a = Rk(ya(r) || r);
    if (a) return a;
  }
  const t = sZ(e);
  if (t && /\/thumbnails\//i.test(t)) return ya(t) || t;
  const n = Bd(e) || t;
  if (n && ff(n) && aCn(n)) {
    const r = Dwe(n);
    if (r && ff(r)) {
      const a = Rk(ya(r) || r);
      if (a) return a;
    }
    return Rk(n) || null;
  }
  return null;
}

function wCt(e) {
  var o, s;
  let t = K$(e);
  const n = l => l && (Ko(l) ? void 0 : l);
  t = {
    ...t,
    url: n(t.url) || "",
    thumbnailUrl: n(t.thumbnailUrl),
    _ossThumbnailUrl: n(t._ossThumbnailUrl),
    _ossRemoteUrl: n(t._ossRemoteUrl),
    originalUrl: n(t.originalUrl),
    mjImages: (o = t.mjImages) == null ? void 0 : o.map(l => Ko(l) ? "" : l),
    mjThumbnails: (s = t.mjThumbnails) == null ? void 0 : s.map(l => Ko(l) ? "" : l)
  };
  const r = jg(t),
    a = Bd(t);
  if (!r && !a) return t;
  const i = r || (a ? Rk(a) : "");
  return i ? {
    ...t,
    url: !t.url || t.url.startsWith("blob:") || Ko(t.url) ? i : t.url,
    thumbnailUrl: !t.thumbnailUrl || t.thumbnailUrl.startsWith("blob:") || Ko(t.thumbnailUrl) ? i : Rk(t.thumbnailUrl) || t.thumbnailUrl,
    _ossThumbnailUrl: !t._ossThumbnailUrl || Ko(t._ossThumbnailUrl) ? i : t._ossThumbnailUrl,
    _ossRemoteUrl: a || t._ossRemoteUrl,
    originalUrl: a || t.originalUrl
  } : t;
}

async function fLe(e) {
  if (!ua() || e.type === "audio") return null;
  const t = wCt(e),
    n = jg(t),
    r = Bd(t);
  if (!n && r && e.type !== "video") {
    const s = `history-${String(e.id || "huya").replace(/[^\w.-]+/g, "_").slice(0, 32)}-${Date.now().toString(36)}`,
      l = await nre(r, s, {
        maxBytes: pLe
      });
    if (l) return {
      url: l.displayUrl,
      thumbnailUrl: l.displayUrl,
      _ossThumbnailUrl: l.displayUrl,
      _ossRemoteUrl: r,
      originalUrl: r,
      ossUploaded: !0,
      _globalOssUrlOnly: !0
    };
  }
  if (n || r) return t.url !== e.url || t.thumbnailUrl !== e.thumbnailUrl || t._ossThumbnailUrl !== e._ossThumbnailUrl || t._ossRemoteUrl !== e._ossRemoteUrl ? {
    url: t.url,
    thumbnailUrl: t.thumbnailUrl,
    _ossThumbnailUrl: t._ossThumbnailUrl,
    _ossRemoteUrl: t._ossRemoteUrl,
    originalUrl: t.originalUrl,
    ossUploaded: t.ossUploaded ?? e.ossUploaded,
    _globalOssUrlOnly: t._globalOssUrlOnly ?? e._globalOssUrlOnly
  } : null;
  const a = [e._ossRemoteUrl, e.originalUrl, e.url, e.thumbnailUrl, e._ossThumbnailUrl, ...(Array.isArray(e.mjImages) ? e.mjImages : [])].map(s => String(s || "").trim()).filter(s => Ko(s));
  if (a.length === 0) return null;
  const i = e.type === "video",
    o = await xT([a[0]], String(e.id || "huya-rehost"), i);
  return o ? _T(o, {
    type: e.type || "image"
  }) : null;
}

function p5e(e) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return [];
  const t = e.settings || {},
    n = t.generatedImages || [],
    r = e.type === "gen-video",
    a = r ? [typeof t._pendingRemoteResultUrl == "string" ? t._pendingRemoteResultUrl : "", typeof t[EY] == "string" ? t[EY] : "", ...n.flatMap(s => [s.fullUrl, s.url]), typeof t[_i] == "string" ? t[_i] : "", typeof e.content == "string" ? e.content : "", typeof e.thumbnailUrl == "string" ? e.thumbnailUrl : "", typeof t[Pi] == "string" ? t[Pi] : "", ...n.map(s => s.thumbUrl)] : [typeof e.content == "string" ? e.content : "", typeof e.thumbnailUrl == "string" ? e.thumbnailUrl : "", typeof t._pendingRemoteResultUrl == "string" ? t._pendingRemoteResultUrl : "", typeof t[_i] == "string" ? t[_i] : "", typeof t[Pi] == "string" ? t[Pi] : "", ...n.flatMap(s => [s.thumbUrl, s.fullUrl, s.url])],
    i = [],
    o = new Set();
  for (const s of a) {
    const d = nCt(String(s || "").trim()) || String(s || "").trim();
    !d || !Ko(d) || o.has(d) || r && QE(d) || (o.add(d), i.push(d));
  }
  return r && i.sort((s, l) => Number($pt(l)) - Number($pt(s))), i;
}

function DHe(e) {
  if (!ua() || e.type !== "gen-image" && e.type !== "gen-video" || e.isGenerating) return !1;
  const t = Bm(e);
  if (t && ff(t)) return !1;
  const n = typeof e.content == "string" ? e.content.trim() : "";
  return n && ff(n) && ym(n) ? !1 : p5e(e).length > 0;
}

async function xCt(e) {
  var s;
  if (!DHe(e)) return null;
  const t = p5e(e);
  if (t.length === 0) return null;
  const n = e.type === "gen-video",
    r = await xT([t[0]], String(e.id || "huya-node-rehost"), n);
  if (!r) return null;
  const a = r.displayUrls.find(l => l && !Ko(l) && (/\/thumbnails\//i.test(l) || Qc(l))) || "",
    i = r.remoteUrls.find(l => l && !Ko(l)) || "";
  if (!a || !i) return null;
  const o = e.settings || {};
  return {
    content: a,
    thumbnailUrl: a,
    settings: {
      ...o,
      ...r.ossSettings,
      [_i]: i || ((s = r.ossSettings) == null ? void 0 : s._ossRemoteUrl),
      [Pi]: a,
      _pendingRemoteResultUrl: void 0,
      _globalOssUrlOnly: !0,
      [Cl]: !0,
      generatedImages: r.generatedImages || o.generatedImages
    }
  };
}

const Oae = new Set(),
  Ebe = new Set();

function gCn(e, t) {
  if (!ua() || !t || !DHe(e)) return;
  const n = String(e.id || "").trim();
  if (!n) return;
  const r = `${n}\0${p5e(e)[0] || ""}`;
  if (Oae.has(r) || Ebe.has(r)) return;
  Ebe.add(r);
  const a = e,
    i = async () => {
      try {
        const o = await xCt(a);
        o && q$(a.id, t, o), bU(Oae, r);
      } catch (o) {
        console.warn("[globalOssMaterial] 海艺→用户桶节点转存失败:", n, o), bU(Oae, r);
      } finally {
        Ebe.delete(r);
      }
    };
  typeof requestIdleCallback < "u" ? requestIdleCallback(() => void i(), {
    timeout: 3e3
  }) : setTimeout(() => void i(), 200);
}

async function qMr(e, t, n) {
  var a;
  if (!ua()) return;
  const r = e.filter(i => DHe(i));
  for (const i of r) {
    if ((a = n == null ? void 0 : n.isCancelled) != null && a.call(n)) return;
    try {
      const o = await xCt(i);
      if (o) {
        q$(i.id, t, o);
        const s = `${i.id}\0${p5e(i)[0] || ""}`;
        bU(Oae, s);
      }
    } catch (o) {
      console.warn("[globalOssMaterial] 打开项目海艺转存失败:", String(i.id || ""), o);
    }
  }
}

function _Ct(e) {
  var a, i, o, s, l;
  let t = K$(e);
  if (t._globalOssUrlOnly) t = KMr(t), t = Cj(t);else if (t.ossUploaded) {
    const d = G4e(t);
    Object.keys(d).length > 0 && (t = {
      ...t,
      ...d
    }), t = Cj(t);
  }
  t = wCt(t);
  const n = t._globalOssUrlOnly || t.ossUploaded ? sZ(t) : null;
  if (n && U4e(t)) {
    const d = Bd(t) || n;
    return {
      ...t,
      url: (a = t.url) != null && a.startsWith("blob:") || !t.url ? d : t.url,
      audioUrl: (i = t.audioUrl) != null && i.startsWith("blob:") || !t.audioUrl ? d : t.audioUrl
    };
  }
  if (n) {
    const d = (t._ossThumbnailUrl && ff(t._ossThumbnailUrl) ? t._ossThumbnailUrl : null) || (t.thumbnailUrl && ff(t.thumbnailUrl) ? t.thumbnailUrl : null) || n,
      u = Rk(d);
    return {
      ...t,
      url: (o = t.url) != null && o.startsWith("blob:") || !t.url || Ko(t.url) ? u : t.url,
      thumbnailUrl: (s = t.thumbnailUrl) != null && s.startsWith("blob:") || !t.thumbnailUrl || Ko(t.thumbnailUrl) ? u : Rk(t.thumbnailUrl),
      _ossThumbnailUrl: !t._ossThumbnailUrl || Ko(t._ossThumbnailUrl) ? u : t._ossThumbnailUrl
    };
  }
  const r = d => d && d.startsWith("blob:") ? "" : d || "";
  return {
    ...t,
    url: r(t.url) || "",
    thumbnailUrl: r(t.thumbnailUrl),
    mjImages: (l = t.mjImages) == null ? void 0 : l.map(d => d != null && d.startsWith("blob:") ? "" : d)
  };
}

function KMr(e) {
  const t = s => {
      if (!s || !Ad(s)) return s;
    },
    n = {
      ...e,
      _ossRemoteUrl: t(e._ossRemoteUrl),
      originalUrl: t(e.originalUrl),
      url: t(e.url) || "",
      _ossThumbnailUrl: t(e._ossThumbnailUrl),
      thumbnailUrl: t(e.thumbnailUrl),
      videoPosterUrl: t(e.videoPosterUrl),
      audioUrl: t(e.audioUrl)
    };
  if (!(n._ossRemoteUrl !== e._ossRemoteUrl || n.originalUrl !== e.originalUrl || n.url !== e.url || n._ossThumbnailUrl !== e._ossThumbnailUrl || n.thumbnailUrl !== e.thumbnailUrl || n.videoPosterUrl !== e.videoPosterUrl || n.audioUrl !== e.audioUrl)) return e;
  const a = sCt(n);
  a && (n._ossRemoteUrl = a, n.originalUrl = a);
  const o = [n._ossThumbnailUrl, n.thumbnailUrl, n.url].find(s => s && nr(s) && !Ad(s));
  if (o) {
    if (n._ossThumbnailUrl || (n._ossThumbnailUrl = o), n.thumbnailUrl || (n.thumbnailUrl = o), n.url || (n.url = o), !n._ossRemoteUrl) {
      const s = Go(o);
      s && (n._ossRemoteUrl = s, n.originalUrl = s);
    }
  } else a && !n.url && (n.url = a);
  return n;
}

function QMr(e) {
  for (const t of ["_blobUrl", "_canvasDisplayPreviewUrl"]) {
    const n = typeof e[t] == "string" ? String(e[t]).trim() : "";
    FCn(n) && (e[t] = "");
  }
}

function m5e(e) {
  var h, p;
  const t = B$(e.content);
  t !== void 0 && t !== e.content ? e = {
    ...e,
    content: t
  } : e.content != null && typeof e.content != "string" && (e = {
    ...e,
    content: ""
  });
  const n = {
      ...(e.settings || {})
    },
    r = m => {
      const f = bb(String(m || "").trim());
      return ya(f) || f;
    };
  let a = typeof n[Pi] == "string" ? String(n[Pi]).trim() : "",
    i = typeof n[_i] == "string" ? String(n[_i]).trim() : "";
  a && (a = r(a), n[Pi] = a), i && (i = r(i), n[_i] = i);
  const o = (a && nr(a) ? a : "") || (i && nr(i) ? i : ""),
    s = S0(e) || !!n[Cl],
    l = s || ua() && !!o;
  if (QMr(n), s && o && typeof e.content == "string" && e.content.startsWith("blob:")) return {
    ...e,
    content: a && nr(a) ? a : o,
    settings: n
  };
  if (e.type === "input-image" && i && /\/thumbnails\//i.test(i)) {
    const m = IY(e);
    m && (n[_i] = m);
  }
  if (e.type === "input-image") {
    const m = typeof n._codexSourceUrl == "string" ? String(n._codexSourceUrl).trim() : "",
      f = m ? r(m) : "";
    if (!i && f && nr(f)) {
      const y = /\/thumbnails\//i.test(f) ? f : "",
        b = y ? Vg(f) : f;
      b && (i = b, n[_i] = b), y && (a = y, n[Pi] = y), ua() && (n[Cl] = !0);
    }
  }
  let d = {
    ...e,
    settings: n
  };
  typeof d.content == "string" && nr(d.content) && (d = {
    ...d,
    content: r(d.content)
  }), l && typeof d.content == "string" && d.content.startsWith("blob:") && (d = {
    ...d,
    content: o || ""
  });
  const u = n.generatedImages;
  if (l && (u != null && u.length)) {
    let m = !1;
    const f = u.map(y => {
      const b = String(y.fullUrl || y.url || "").trim(),
        v = String(y.thumbUrl || "").trim();
      let _ = v,
        w = b;
      return v.startsWith("blob:") && (m = !0, _ = (v && nr(v) ? v : "") || (b && nr(b) ? b : "") || o || ""), b.startsWith("blob:") && (m = !0, w = (b && nr(b) ? b : "") || (i && nr(i) ? Vg(i) : "") || ""), {
        ...y,
        thumbUrl: _,
        fullUrl: w
      };
    });
    m && (d = {
      ...d,
      settings: {
        ...n,
        generatedImages: f
      }
    });
  }
  if (d.type === "gen-music") {
    const m = typeof n.audioUrl == "string" ? String(n.audioUrl).trim() : "",
      f = (m.startsWith("http://") || m.startsWith("https://") ? m : "") || (i && nr(i) ? i : "") || (o && nr(o) ? o : "");
    if (typeof d.content == "string" && d.content.startsWith("blob:") && f) n.audioUrl = f, d = {
      ...d,
      content: f,
      settings: n
    };else if (l && m.startsWith("blob:")) {
      const y = f;
      y && (n.audioUrl = y, typeof d.content == "string" && d.content.startsWith("blob:") ? d = {
        ...d,
        content: y,
        settings: n
      } : d = {
        ...d,
        settings: n
      });
    }
  }
  if (d.type === "input-image") {
    const m = typeof d.content == "string" ? d.content.trim() : "";
    if (String(n.mediaType || "") === "video" || i && iy(i) || m && iy(m)) {
      n.mediaType = "video";
      const y = typeof d.videoPosterUrl == "string" ? d.videoPosterUrl.trim() : "",
        b = typeof n.videoPosterUrl == "string" ? String(n.videoPosterUrl).trim() : "",
        v = Ay(y, b, a, m);
      let _ = !1;
      (!i || !iy(i)) && m && iy(m) && (i = r(m), n[_i] = i, _ = !0), v ? (n[Pi] = v, n.videoPosterUrl = v, d = {
        ...d,
        content: v,
        videoPosterUrl: v,
        settings: n
      }) : (_ || String(n.mediaType) === "video") && (d = {
        ...d,
        settings: n
      });
    }
  }
  if (ua() && (d.type === "gen-image" || d.type === "gen-video")) {
    const m = typeof d.content == "string" ? d.content.trim() : "",
      f = typeof d.thumbnailUrl == "string" ? String(d.thumbnailUrl).trim() : "",
      y = typeof n._pendingRemoteResultUrl == "string" ? String(n._pendingRemoteResultUrl).trim() : "",
      b = n.generatedImages || [],
      v = [m, a, i, f, y, ...b.flatMap(A => [A.thumbUrl, A.fullUrl, A.url])].find(A => Ko(A)) || "",
      _ = {
        ...d,
        settings: n
      },
      w = Bm(_) || (a && ff(a) ? a : "") || (i && ff(i) ? i : "") || (m && ff(m) ? m : "") || "";
    let k = !1;
    if (Ko(a) && (k = !0, w ? (a = w, n[Pi] = w) : (delete n[Pi], a = "")), Ko(i) && (k = !0, w && ff(w) && (/\/images\//i.test(w) || /\/videos\//i.test(w)) ? (i = w, n[_i] = w) : (delete n[_i], i = "")), b.length > 0) {
      let A = !1;
      const S = b.map(C => {
        let I = String(C.thumbUrl || "").trim(),
          E = String(C.fullUrl || C.url || "").trim(),
          M = String(C.url || "").trim();
        return Ko(I) && (A = !0, I = w || ""), Ko(E) && (A = !0, E = (i && ff(i) ? i : "") || w || ""), Ko(M) && (A = !0, M = E || w || ""), {
          ...C,
          thumbUrl: I,
          fullUrl: E,
          url: M
        };
      });
      A && (k = !0, n.generatedImages = S);
    }
    v && !y && (n._pendingRemoteResultUrl = v, k = !0), Ko(m) || Ko(f) ? (k = !0, d = {
      ...d,
      content: w || "",
      thumbnailUrl: w || void 0,
      settings: n
    }) : k && (d = {
      ...d,
      settings: n
    });
  }
  if (d.type === "gen-video") {
    const m = typeof d.content == "string" ? d.content.trim() : "",
      f = typeof d.videoPosterUrl == "string" ? d.videoPosterUrl.trim() : "",
      y = typeof n.videoPosterUrl == "string" ? String(n.videoPosterUrl).trim() : "",
      b = Array.isArray(n.generatedImages) ? n.generatedImages[0] : void 0,
      v = Ay(f, y, a, b == null ? void 0 : b.thumbUrl, m),
      _ = (i && iy(i) ? i : "") || (m && iy(m) ? r(m) : "") || (typeof (b == null ? void 0 : b.fullUrl) == "string" && iy(b.fullUrl) ? r(b.fullUrl) : "") || (typeof (b == null ? void 0 : b.url) == "string" && iy(b.url) ? r(b.url) : "");
    let w = !1;
    if (_ && (!i || !iy(i)) && (i = _, n[_i] = _, w = !0), v) {
      if (n[Pi] = v, n.videoPosterUrl = v, Array.isArray(n.generatedImages) && n.generatedImages.length > 0) {
        const k = [...n.generatedImages];
        k[0] = {
          ...k[0],
          thumbUrl: v,
          fullUrl: String(((h = k[0]) == null ? void 0 : h.fullUrl) || ((p = k[0]) == null ? void 0 : p.url) || _ || "").trim() || _
        }, n.generatedImages = k;
      }
      d = {
        ...d,
        content: v,
        videoPosterUrl: v,
        settings: n
      }, w = !1;
    } else w ? m && iy(m) ? d = {
      ...d,
      content: "",
      settings: n
    } : d = {
      ...d,
      settings: n
    } : m && iy(m) && _ && (d = {
      ...d,
      content: "",
      videoPosterUrl: void 0,
      settings: n
    });
  }
  return d;
}

function LI(e) {
  const t = typeof e == "string" ? e.trim() : "";
  return t ? t.startsWith("data:") || t.startsWith("blob:") || t.startsWith("content_ref:") : !1;
}

function VC(e) {
  const t = typeof e == "string" ? e.trim() : "";
  return t ? /^https?:\/\//i.test(t) : !1;
}

function YMr(e, t, n) {
  return VC(e) ? e : VC(n) ? n : VC(t) ? t : "";
}

function Pet(e, t, n) {
  return VC(e) ? n === "input-image" && /\/thumbnails\//i.test(e) ? Vg(e) : e : VC(t) ? t : "";
}

function XMr(e) {
  delete e._projectFullAssetKey, delete e._projectId, delete e._projectAssetKeys, typeof e._contentAssetId == "string" && e._contentAssetId.startsWith("pm_") && delete e._contentAssetId, Array.isArray(e._mjAssetIds) && (e._mjAssetIds = e._mjAssetIds.filter(t => !String(t).startsWith("pm_"))), typeof e._blobUrl == "string" && e._blobUrl.startsWith("blob:") && (e._blobUrl = "");
}

function LHe(e) {
  if (!ua()) return e;
  let t = m5e(e);
  const n = {
      ...(t.settings || {})
    },
    r = typeof n[Pi] == "string" ? String(n[Pi]).trim() : "",
    a = typeof n[_i] == "string" ? String(n[_i]).trim() : "",
    i = (r && nr(r) ? r : "") || (a && nr(a) ? a : ""),
    o = YMr(r, a, i),
    s = n.generatedImages,
    l = Math.max(0, Number(n.selectedMjImageIndex ?? 0)),
    d = Array.isArray(s) ? s[l] : void 0,
    u = String((d == null ? void 0 : d.fullUrl) || (d == null ? void 0 : d.url) || "").trim(),
    h = Pet(a, u, t.type),
    p = (f, y) => typeof f != "string" ? void 0 : LI(f) ? (y === "full" ? h || o : o || h) || "" : f;
  if (LI(t.content)) {
    const f = t.type === "gen-video" || n.mediaType === "video",
      y = p(t.content, f ? "full" : "display");
    y !== void 0 && (t = {
      ...t,
      content: y
    });
  } else typeof t.content == "string" && VC(t.content) && (t = {
    ...t,
    content: ya(t.content) || t.content
  });
  if (typeof t.selectedPreviewImage == "string" && LI(t.selectedPreviewImage) && (t = {
    ...t,
    selectedPreviewImage: o || h || ""
  }), Array.isArray(t.previewMjImages)) {
    const f = n[kD],
      y = Array.isArray(f) ? f.map(_ => String(_ || "").trim()) : [];
    let b = !1;
    const v = t.previewMjImages.map((_, w) => {
      if (!LI(_)) return _;
      b = !0;
      const k = y[w];
      return VC(k) ? k : o || h || "";
    });
    b && (t = {
      ...t,
      previewMjImages: v
    });
  }
  if (Array.isArray(s) && s.length > 0) {
    let f = !1;
    const y = s.map(b => {
      const v = {
          ...b
        },
        _ = String(v.fullUrl || v.url || "").trim(),
        w = String(v.thumbUrl || "").trim();
      return LI(w) && (v.thumbUrl = (VC(_) ? _ : "") || o || h || "", f = !0), LI(v.fullUrl) && (v.fullUrl = Pet(a, _, t.type) || o || "", f = !0), LI(v.url) && (v.url = v.fullUrl || Pet(a, _, t.type) || "", f = !0), v;
    });
    f && (n.generatedImages = y);
  }
  for (const f of ["mjImages", "batchImages"]) {
    const y = n[f];
    if (!Array.isArray(y)) continue;
    let b = !1;
    const v = y.map(_ => LI(_) ? (b = !0, o || h || "") : _);
    b && (n[f] = v);
  }
  const m = n.generationVersions;
  if (Array.isArray(m) && m.length > 0) {
    let f = !1;
    const y = m.map(b => {
      if (!b || typeof b != "object") return b;
      const v = {
          ...b
        },
        _ = String(v.ossRemoteUrl || v.originalUrl || "").trim(),
        w = String(v.ossThumbnailUrl || v.thumbnailUrl || "").trim(),
        k = (VC(w) ? w : "") || (VC(_) && /\/thumbnails\//i.test(_) ? _ : "") || "",
        A = (VC(_) && !/\/thumbnails\//i.test(_) ? _ : "") || k || "",
        S = String(v.ossThumbnailUrl || "").trim();
      LI(S) && (k || A) && (v.ossThumbnailUrl = k || A, f = !0);
      const C = v.generatedImages;
      if (Array.isArray(C)) {
        let I = !1;
        const E = C.map(M => {
          if (!M || typeof M != "object") return M;
          const T = {
            ...M
          };
          for (const P of ["thumbUrl", "fullUrl", "url"]) {
            const R = T[P];
            if (!LI(R)) continue;
            const j = P === "fullUrl" || P === "url" ? A || k : k || A;
            j && (I = !0, T[P] = j);
          }
          return T;
        });
        I && (v.generatedImages = E, f = !0);
      }
      return v;
    });
    f && (n.generationVersions = y);
  }
  return typeof t.maskContent == "string" && LI(t.maskContent) && (t = {
    ...t,
    maskContent: ""
  }), (o || h) && (a && (n[_i] = a), r && (n[Pi] = r), n[Cl] = !0, XMr(n)), {
    ...t,
    settings: n
  };
}

async function Uk(e, t) {
  if (!ua()) return null;
  try {
    const n = await fetch(e);
    if (!n.ok) return null;
    const r = await n.blob(),
      a = new File([r], t, {
        type: r.type || "image/png"
      });
    return await W$(a);
  } catch (n) {
    return console.warn("[globalOssMaterial] 裁切图上传 OSS 失败:", t, n), null;
  }
}

async function kCt(e, t) {
  const {
      assetStore: n
    } = await Ie(async () => {
      const {
        assetStore: m
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: m
      };
    }, void 0, import.meta.url),
    {
      registerDisplayUrlAssetId: r,
      resizeBlobForDisplay: a,
      PREVIEW_CALLBACK_MAX_DIM: i,
      PREVIEW_CALLBACK_QUALITY: o,
      generateId: s
    } = await Ie(async () => {
      const {
        registerDisplayUrlAssetId: m,
        resizeBlobForDisplay: f,
        PREVIEW_CALLBACK_MAX_DIM: y,
        PREVIEW_CALLBACK_QUALITY: b,
        generateId: v
      } = await Promise.resolve().then(() => No);
      return {
        registerDisplayUrlAssetId: m,
        resizeBlobForDisplay: f,
        PREVIEW_CALLBACK_MAX_DIM: y,
        PREVIEW_CALLBACK_QUALITY: b,
        generateId: v
      };
    }, void 0, import.meta.url);
  await n.init();
  const l = Date.now(),
    d = 2,
    u = new Array(e.length),
    h = ei(),
    p = async (m, f) => {
      const b = await (await fetch(m.url)).blob(),
        v = `split_${t}_${l}_${f}_${s()}`;
      await n.saveBlobAsset(v, b, "file://split-local");
      let _ = "";
      if (h) try {
        const {
          localCacheManager: w,
          ensureCacheRootReadyForWrite: k
        } = await Ie(async () => {
          const {
            localCacheManager: S,
            ensureCacheRootReadyForWrite: C
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: S,
            ensureCacheRootReadyForWrite: C
          };
        }, void 0, import.meta.url);
        await k(), w.isAvailable() && (await w.saveAsset(v, b, b.type || "image/png", "file://split-local")), await CE(v, b, {
          forceReplace: !0
        });
        const {
          ensureLocalPreviewDisplayUrl: A
        } = await Ie(async () => {
          const {
            ensureLocalPreviewDisplayUrl: S
          } = await Promise.resolve().then(() => Ui);
          return {
            ensureLocalPreviewDisplayUrl: S
          };
        }, void 0, import.meta.url);
        if (_ = (await A(v, {
          maxDim: i
        })) || "", _ && vs(_)) try {
          (await fetch(_)).ok || (_ = "");
        } catch {
          _ = "";
        }
      } catch {} else (async () => {
        try {
          const {
            localCacheManager: w,
            ensureCacheRootReadyForWrite: k
          } = await Ie(async () => {
            const {
              localCacheManager: A,
              ensureCacheRootReadyForWrite: S
            } = await Promise.resolve().then(() => Ha);
            return {
              localCacheManager: A,
              ensureCacheRootReadyForWrite: S
            };
          }, void 0, import.meta.url);
          await k(), w.isAvailable() && (await w.saveAsset(v, b, b.type || "image/png", "file://split-local"));
        } catch {}
        try {
          await CE(v, b, {
            forceReplace: !0
          });
        } catch {}
      })();
      if (!_) {
        const w = await a(b, i, o);
        _ = URL.createObjectURL(w), h && (async () => {
          try {
            await CE(v, b, {
              forceReplace: !0
            });
            const {
              ensureLocalPreviewDisplayUrl: k
            } = await Ie(async () => {
              const {
                ensureLocalPreviewDisplayUrl: A
              } = await Promise.resolve().then(() => Ui);
              return {
                ensureLocalPreviewDisplayUrl: A
              };
            }, void 0, import.meta.url);
            await k(v, {
              maxDim: i
            });
          } catch {}
        })();
      }
      if (r(_, v), m.url.startsWith("blob:")) try {
        URL.revokeObjectURL(m.url);
      } catch {}
      u[f] = {
        url: _,
        width: m.width,
        height: m.height,
        assetId: v
      };
    };
  for (let m = 0; m < e.length; m += d) {
    const f = e.slice(m, m + d);
    await Promise.all(f.map((y, b) => p(y, m + b)));
  }
  return u;
}

function yCn(e, t) {
  const n = e.length,
    r = Math.max(1, t.cols || 1),
    a = Math.ceil(n / r),
    i = Math.max(12, Math.round((t.spacingW || 0) - (t.nodeWidth || 0)) || 20),
    o = Math.max(12, Math.round((t.spacingH || 0) - (t.nodeHeight || 0)) || 20),
    s = Array.from({
      length: r
    }, () => 0),
    l = Array.from({
      length: a
    }, () => 0);
  for (let m = 0; m < n; m++) {
    const f = m % r,
      y = Math.floor(m / r);
    s[f] = Math.max(s[f], e[m].width), l[y] = Math.max(l[y], e[m].height);
  }
  const d = [];
  let u = t.originX;
  for (let m = 0; m < r; m++) d[m] = u, u += s[m] + i;
  const h = [];
  let p = t.originY;
  for (let m = 0; m < a; m++) h[m] = p, p += l[m] + o;
  return e.map((m, f) => {
    const y = f % r,
      b = Math.floor(f / r);
    return {
      x: d[y],
      y: h[b],
      width: m.width,
      height: m.height
    };
  });
}

async function ACt(e, t, n) {
  if (!e.length) return [];
  const {
      calcInputImageNodeDisplaySize: r
    } = await Ie(async () => {
      const {
        calcInputImageNodeDisplaySize: o
      } = await Promise.resolve().then(() => Rue);
      return {
        calcInputImageNodeDisplaySize: o
      };
    }, void 0, import.meta.url),
    a = e.map(o => r(o.width, o.height)),
    i = yCn(a, t);
  return e.map((o, s) => {
    const l = t.baseName ? `${t.baseName}_${s + 1}` : `裁切图_${s + 1}`,
      d = a[s],
      u = i[s];
    return {
      id: n(),
      type: "input-image",
      nodeName: l,
      x: u.x,
      y: u.y,
      width: d.width,
      height: d.height,
      content: "",
      prompt: "",
      settings: {
        hasCustomSize: !0,
        imageSize: `${o.width}×${o.height}`,
        dimensions: {
          w: o.width,
          h: o.height
        },
        mediaType: "image",
        disableThumbnailCreationOnImport: !0,
        [h7]: !0
      },
      dimensions: {
        w: o.width,
        h: o.height
      }
    };
  });
}

async function bCn(e, t, n, r) {
  const {
      contentStore: a
    } = await Ie(async () => {
      const {
        contentStore: f
      } = await Promise.resolve().then(() => Ly);
      return {
        contentStore: f
      };
    }, void 0, import.meta.url),
    {
      LOCAL_CACHE_ASSET_SETTING_KEY: i
    } = await Ie(async () => {
      const {
        LOCAL_CACHE_ASSET_SETTING_KEY: f
      } = await Promise.resolve().then(() => Ui);
      return {
        LOCAL_CACHE_ASSET_SETTING_KEY: f
      };
    }, void 0, import.meta.url),
    {
      calcInputImageNodeDisplaySize: o
    } = await Ie(async () => {
      const {
        calcInputImageNodeDisplaySize: f
      } = await Promise.resolve().then(() => Rue);
      return {
        calcInputImageNodeDisplaySize: f
      };
    }, void 0, import.meta.url),
    s = ua(),
    l = n ? `${n}_${t + 1}` : `裁切图_${t + 1}`,
    d = o(e.width, e.height);
  let u = "",
    h = {
      hasCustomSize: !0,
      imageSize: `${e.width}×${e.height}`,
      dimensions: {
        w: e.width,
        h: e.height
      },
      mediaType: "image",
      disableThumbnailCreationOnImport: !0,
      [h7]: !1
    },
    p,
    m = "";
  if (s) {
    const f = await Uk(e.url, `${l.replace(/[^\w\u4e00-\u9fa5-]+/g, "_") || "crop"}.png`);
    if (f) {
      const y = Hv(f);
      u = y.content || f.displayUrl, h = {
        ...h,
        ...y.settings,
        hasCustomSize: !0,
        imageSize: `${e.width}×${e.height}`,
        dimensions: {
          w: e.width,
          h: e.height
        },
        [h7]: !1
      };
    }
  }
  if (!u && (r != null && r[t])) {
    const f = r[t];
    u = f.url, p = f.assetId;
    let y;
    try {
      const {
          localCacheManager: b
        } = await Ie(async () => {
          const {
            localCacheManager: _
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: _
          };
        }, void 0, import.meta.url),
        v = b.getAssetManifestMeta(f.assetId);
      y = ((v == null ? void 0 : v.fileName) || "").replace(/^.*[/\\]/, "").trim() || void 0;
    } catch {}
    y && (m = y), h = {
      ...h,
      _assetId: f.assetId,
      _contentAssetId: f.assetId,
      [i]: f.assetId,
      _canvasDisplayPreviewUrl: f.url,
      disableThumbnailCreationOnImport: !0,
      [h7]: !1,
      ...(y ? {
        _localDiskFileName: y
      } : {}),
      ...(Af(f.url) ? {} : f.url.startsWith("blob:") ? {
        _blobUrl: void 0
      } : {})
    };
  }
  if (!u) {
    if (!s) {
      const f = await kCt([e], `grid_${t}`);
      if (f[0]) {
        const y = f[0];
        u = y.url, p = y.assetId;
        let b;
        try {
          const {
              localCacheManager: v
            } = await Ie(async () => {
              const {
                localCacheManager: w
              } = await Promise.resolve().then(() => Ha);
              return {
                localCacheManager: w
              };
            }, void 0, import.meta.url),
            _ = v.getAssetManifestMeta(y.assetId);
          b = ((_ == null ? void 0 : _.fileName) || "").replace(/^.*[/\\]/, "").trim() || void 0;
        } catch {}
        b && (m = b), h = {
          ...h,
          _assetId: y.assetId,
          _contentAssetId: y.assetId,
          [i]: y.assetId,
          _canvasDisplayPreviewUrl: y.url,
          disableThumbnailCreationOnImport: !0,
          [h7]: !1,
          ...(b ? {
            _localDiskFileName: b
          } : {}),
          ...(Af(y.url) ? {} : y.url.startsWith("blob:") ? {
            _blobUrl: void 0
          } : {})
        };
      }
    }
    u || (u = await a.storeImageUrlAsRef(e.url));
  }
  if (s && e.url.startsWith("blob:")) try {
    URL.revokeObjectURL(e.url);
  } catch {}
  return {
    content: u,
    settings: h,
    contentAssetId: p,
    nodeName: l,
    pixelW: e.width,
    pixelH: e.height,
    frameW: d.width,
    frameH: d.height,
    prompt: m
  };
}

async function SCt(e, t, n, r, a) {
  const i = Math.min(e.length, t.length);
  if (i <= 0) return;
  const o = 2,
    s = a ?? null,
    l = (d, u) => {
      n(h => h.map(p => p.id !== d ? p : {
        ...p,
        nodeName: u.nodeName,
        width: u.frameW,
        height: u.frameH,
        content: u.content,
        prompt: u.prompt,
        settings: {
          ...(p.settings || {}),
          ...u.settings,
          [h7]: !1
        },
        dimensions: {
          w: u.pixelW,
          h: u.pixelH
        },
        ...(u.contentAssetId ? {
          _contentAssetId: u.contentAssetId
        } : {})
      }));
    };
  for (let d = 0; d < i; d += o) {
    const u = Array.from({
      length: Math.min(o, i - d)
    }, (h, p) => {
      const m = d + p;
      return bCn(t[m], m, r, s).then(f => l(e[m], f));
    });
    await Promise.all(u);
  }
}

async function vCn(e, t, n) {
  const {
      calcInputImageNodeDisplaySize: r
    } = await Ie(async () => {
      const {
        calcInputImageNodeDisplaySize: l
      } = await Promise.resolve().then(() => Rue);
      return {
        calcInputImageNodeDisplaySize: l
      };
    }, void 0, import.meta.url),
    a = ua(),
    i = a ? null : await kCt(e, "grid"),
    o = [];
  for (let l = 0; l < e.length; l++) {
    const d = e[l];
    if (!a && (i != null && i[l])) {
      const {
          LOCAL_CACHE_ASSET_SETTING_KEY: u
        } = await Ie(async () => {
          const {
            LOCAL_CACHE_ASSET_SETTING_KEY: y
          } = await Promise.resolve().then(() => Ui);
          return {
            LOCAL_CACHE_ASSET_SETTING_KEY: y
          };
        }, void 0, import.meta.url),
        h = i[l],
        p = t.baseName ? `${t.baseName}_${l + 1}` : `裁切图_${l + 1}`,
        m = r(d.width, d.height);
      let f;
      try {
        const {
            localCacheManager: y
          } = await Ie(async () => {
            const {
              localCacheManager: v
            } = await Promise.resolve().then(() => Ha);
            return {
              localCacheManager: v
            };
          }, void 0, import.meta.url),
          b = y.getAssetManifestMeta(h.assetId);
        f = ((b == null ? void 0 : b.fileName) || "").replace(/^.*[/\\]/, "").trim() || void 0;
      } catch {}
      o.push({
        content: h.url,
        settings: {
          hasCustomSize: !0,
          imageSize: `${d.width}×${d.height}`,
          dimensions: {
            w: d.width,
            h: d.height
          },
          mediaType: "image",
          disableThumbnailCreationOnImport: !0,
          _assetId: h.assetId,
          _contentAssetId: h.assetId,
          [u]: h.assetId,
          _canvasDisplayPreviewUrl: h.url,
          ...(f ? {
            _localDiskFileName: f
          } : {}),
          ...(Af(h.url) ? {} : h.url.startsWith("blob:") ? {
            _blobUrl: void 0
          } : {})
        },
        contentAssetId: h.assetId,
        nodeName: p,
        pixelW: d.width,
        pixelH: d.height,
        frameW: m.width,
        frameH: m.height,
        prompt: f || ""
      });
      continue;
    }
    o.push(await bCn(d, l, t.baseName, i));
  }
  const s = yCn(o.map(l => ({
    width: l.frameW,
    height: l.frameH
  })), t);
  return o.map((l, d) => {
    const u = s[d];
    return {
      id: n(),
      type: "input-image",
      nodeName: l.nodeName,
      x: u.x,
      y: u.y,
      width: l.frameW,
      height: l.frameH,
      content: l.content,
      prompt: l.prompt,
      settings: l.settings,
      dimensions: {
        w: l.pixelW,
        h: l.pixelH
      },
      ...(l.contentAssetId ? {
        _contentAssetId: l.contentAssetId
      } : {})
    };
  });
}

function Nk(e) {
  if (!ua()) return !1;
  if ((e._globalOssUrlOnly || e.ossUploaded) && sZ(e)) return !0;
  if (e.type === "audio") {
    const t = String(e.url || e.audioUrl || "").trim();
    if (/^https?:\/\//i.test(t)) return !0;
  }
  if (!e._assetId) {
    const t = String(e.url || "").trim();
    if (t && /^https?:\/\//i.test(t) && !nr(t) || e._globalOssUrlOnly || e.ossUploaded) return !0;
  }
  return !1;
}

function vv(e) {
  const t = [e._ossRemoteUrl, e.originalUrl, e._ossThumbnailUrl, e.thumbnailUrl, e.url].some(n => ff(n));
  return e._globalOssUrlOnly ? t : !!(e.ossUploaded && ff(e.thumbnailUrl || e.url) || ff(e._ossRemoteUrl) || ff(e.originalUrl) || ua() && ff(e.thumbnailUrl || e._ossThumbnailUrl));
}

function K$(e) {
  const t = [e._ossRemoteUrl, e.originalUrl, e.url, e.thumbnailUrl, e._ossThumbnailUrl, ...(Array.isArray(e.mjImages) ? e.mjImages : [])];
  if (!t.some(o => Ko(o)) || e.type === "audio" && e._globalOssUrlOnly && e.ossUploaded) return e;
  if (t.some(o => ff(o))) {
    const o = Ko(e._ossRemoteUrl),
      s = Ko(e.originalUrl);
    return !o && !s ? e : {
      ...e,
      _ossRemoteUrl: o ? void 0 : e._ossRemoteUrl,
      originalUrl: s ? void 0 : e.originalUrl
    };
  }
  const a = Array.isArray(e._mjAssetIds) ? e._mjAssetIds.filter(Boolean) : [],
    i = String(e._assetId || "").trim() || String(a[0] || "").trim() || String(e.id || "").trim() || e._assetId;
  if (!e._globalOssUrlOnly && !e.ossUploaded) {
    const o = Ko(e._ossRemoteUrl),
      s = Ko(e.originalUrl);
    return !o && !s && String(e._assetId || "").trim() ? e : {
      ...e,
      _assetId: i || e._assetId,
      _ossRemoteUrl: o ? void 0 : e._ossRemoteUrl,
      originalUrl: s ? void 0 : e.originalUrl
    };
  }
  return {
    ...e,
    _globalOssUrlOnly: !1,
    ossUploaded: !1,
    _assetId: i || e._assetId,
    _ossRemoteUrl: Ko(e._ossRemoteUrl) ? void 0 : e._ossRemoteUrl,
    originalUrl: Ko(e.originalUrl) ? void 0 : e.originalUrl
  };
}

function JMr(e) {
  return K$(e);
}

function ZMr(e) {
  const t = String(e.prompt || "");
  return t.includes("智能扩图") || t.includes("智能擦除");
}

function ePr(e, t) {
  return t ? !0 : [e.url, e.thumbnailUrl, e._ossRemoteUrl, e.originalUrl].some(n => !!String(n || "").trim());
}

function gLe(e, t) {
  const n = K$(e),
    r = String(n._assetId || "").trim(),
    a = Q$(n),
    i = !!n._globalOssUrlOnly;
  if (n.status === "generating" || n.status === "failed") return i || a && !r ? t : r && !i ? !t : t ? !r : !a || !!r;
  if (n.type === "3d") {
    const o = [n.url, n.thumbnailUrl, n.originalUrl].some(s => !!String(s || "").trim());
    return t ? i || a || o && !r : i ? !1 : !!r || !a || o;
  }
  return t ? i || a ? !0 : ZMr(n) && ePr(n, r) : i || a && n.type === "audio" ? !1 : !!r || !a;
}

function wCn(e) {
  return gLe(e, ua());
}

function xCn(e) {
  return {
    local: gLe(e, !1),
    oss: gLe(e, !0)
  };
}

function G1(e) {
  return e.map(n => K$(n)).filter(wCn);
}

function Q$(e) {
  const t = K$(e);
  if (t._globalOssUrlOnly) {
    if ([t._ossRemoteUrl, t.originalUrl, t._ossThumbnailUrl, t.thumbnailUrl, t.url, t.audioUrl].some(r => ff(r))) return !0;
    if (t.type === "audio") for (const r of [t._ossRemoteUrl, t.audioUrl, t.url, t.originalUrl]) {
      const a = String(r || "").trim();
      if (/^https?:\/\//i.test(a)) {
        if (t.ossUploaded && t._globalOssUrlOnly) return !0;
        if (!Ko(a)) return !0;
      }
    }
    return !1;
  }
  if (t.ossUploaded) {
    if (Bd(t) || sZ(t)) return !0;
    if (t.type === "audio") for (const r of [t._ossRemoteUrl, t.audioUrl, t.url, t.originalUrl]) {
      const a = String(r || "").trim();
      if (/^https?:\/\//i.test(a) && !Ko(a)) return !0;
    }
    return !1;
  }
  const n = [t._ossRemoteUrl, t.originalUrl, t._ossThumbnailUrl, t.thumbnailUrl, t.url, t.audioUrl];
  for (const r of n) if (ff(r)) return !0;
  if (t.type === "audio") for (const r of [t._ossRemoteUrl, t.audioUrl, t.url, t.originalUrl]) {
    const a = String(r || "").trim();
    if (/^https?:\/\//i.test(a) && !Ko(a) && /\/(?:canvas-materials\/)?Music\//i.test(a)) return !0;
  }
  return !1;
}

function _Cn(e) {
  return !Q$(e);
}

function EE(e) {
  const t = String(e || "").trim();
  if (!t || nr(t)) return !1;
  if (vs(t)) {
    const r = t.toLowerCase();
    return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(r) || /videos?[%/\\]/i.test(r) || /(?:^|[_%])(?:vidu_|huya_video|video)/i.test(r);
  }
  if (/^https?:\/\//i.test(t) && !t.includes("/videos/")) return !1;
  const n = t.toLowerCase();
  return n.startsWith("blob:") || n.startsWith("data:video/") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(n) || n.includes("/videos/");
}

function tPr(e) {
  const t = String(e || "").trim();
  return !t || nr(t) ? !1 : t.startsWith("blob:") || t.startsWith("data:image") || !/^https?:\/\//i.test(t);
}

function ICt(e) {
  return Q$(e);
}

function CCt(e, t) {
  return _Cn(e) ? t.isCachedLocally ? !0 : e.type === "video" ? EE(t.localResolvedUrl) : tPr(t.localResolvedThumbnail) : !1;
}

const NO = new Map(),
  nPr = 800,
  Tbe = new Map();

let Mbe = 0;

const rPr = 3,
  kCn = [];

function aPr() {
  return Mbe < rPr ? (Mbe += 1, Promise.resolve()) : new Promise(e => {
    kCn.push(() => {
      Mbe += 1, e();
    });
  });
}

function iPr() {
  Mbe = Math.max(0, Mbe - 1);
  const e = kCn.shift();
  e && e();
}

function oPr(e) {
  return new Promise(t => {
    const n = new Image(),
      r = () => {
        n.onload = null, n.onerror = null, n.removeAttribute("src");
      },
      a = setTimeout(() => {
        r(), t(null);
      }, 2e4);
    n.onload = () => {
      clearTimeout(a);
      const i = n.naturalWidth || n.width || 0,
        o = n.naturalHeight || n.height || 0;
      r(), t(i > 0 && o > 0 ? {
        width: i,
        height: o
      } : null);
    }, n.onerror = () => {
      clearTimeout(a), r(), t(null);
    }, n.src = e;
  });
}

function Z5(e) {
  const t = ya(String(e || "").trim()) || String(e || "").trim();
  if (!/^https?:\/\//i.test(t)) return Promise.resolve(null);
  const n = NO.get(t);
  if (n) return Promise.resolve(n);
  let r = Tbe.get(t);
  return r || (r = (async () => {
    await aPr();
    try {
      return await oPr(t);
    } finally {
      iPr();
    }
  })().then(a => {
    if (a) {
      if (NO.size >= nPr) {
        const i = NO.keys().next().value;
        i !== void 0 && NO.delete(i);
      }
      NO.set(t, a);
    }
    return Tbe.delete(t), a;
  }), Tbe.set(t, r)), r;
}

function Bae(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim(),
    a = (r && /^https?:\/\//i.test(r) ? r : null) || (n && /^https?:\/\//i.test(n) ? n : null);
  return a ? Z5(a) : Promise.resolve(null);
}

function ACn(e) {
  const t = String(e || "").trim();
  return /^https?:\/\//i.test(t) ? nr(t) ? !0 : /\.(jpg|jpeg|png|webp|gif)(\?|#|$)/i.test(t.split("?")[0] || t) : !1;
}

function SCn(e) {
  const t = bb(String(e || "").trim());
  return /^https?:\/\//i.test(t) ? /aliyuncs\.com/i.test(t) || /res\.cloudinary\.com/i.test(t) ? !0 : N$(t) : !1;
}

function ECt(e) {
  var l, d;
  const t = String(e || "").trim();
  if (!t || !/^https?:\/\//i.test(t)) return null;
  const n = u => {
      const h = String(u || "").trim();
      if (!h) return null;
      const p = Go(h) || (/\/images\//i.test(h) ? h : null) || h,
        m = ya(p) || p;
      return SCn(m) ? m : null;
    },
    r = n(t);
  if (r) return r;
  const a = A0(t),
    i = n(a);
  if (i) return i;
  const o = JVe(t),
    s = n(o);
  if (s) return s;
  try {
    const u = sc();
    if (mo(u) === "aliyun-oss" && ((l = u.bucket) != null && l.trim()) && ((d = u.endpoint) != null && d.trim())) {
      const h = new URL(t),
        p = decodeURIComponent(h.pathname.replace(/^\//, ""));
      if (p && /\/images\//i.test(p)) {
        const m = XJ(u, p),
          f = n(m);
        if (f) return f;
      }
    }
  } catch {}
  return null;
}

function yLe(e) {
  return e.map(t => ECt(t)).filter(t => !!t);
}

function ICn(e, t) {
  if (!t.useOssForApi || t.hasMask) return !1;
  const n = yLe(e);
  return n.length > 0 && n.length === e.length;
}

function TCt(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
  try {
    const n = new URL(t.startsWith("http") ? t : `https://${t}`).hostname.toLowerCase();
    return n === "shop.comfly.chat" || n === "www.shop.comfly.chat" || n === "new.comfly.chat" || n === "www.new.comfly.chat";
  } catch {
    const n = t.toLowerCase();
    return n.includes("shop.comfly.chat") || n.includes("new.comfly.chat");
  }
}

function MCt(e) {
  return e.map(t => ya(String(t || "").trim()) || String(t || "").trim()).filter(t => ACn(t));
}

function CCn(e, t) {
  if (!t.useOssForApi || t.hasMask || TCt(t.baseUrl)) return !1;
  const n = MCt(e);
  return n.length > 0 && n.length === e.length;
}

function F8(e) {
  return e.length === 1 ? e[0] : e;
}

function _T(e, t) {
  const n = f => {
      const y = ya(String(f || "").trim()) || String(f || "").trim();
      return !y || Ko(y) ? "" : y;
    },
    r = n(e.displayUrls[0]),
    a = n(e.remoteUrls[0]),
    i = (t == null ? void 0 : t.type) === "video",
    o = !!a && /\/videos\//i.test(a) && !/\/images\//i.test(a),
    s = i || o,
    l = a && !/\/thumbnails\//i.test(a) && !/-list\.webp(?:$|\?)/i.test(a) && !QE(a) && !(s && tl(a)) ? a : "",
    d = r && Rk(r) || (l ? Rk(l) : "");
  if (s) {
    const f = d && d !== l && Ay(d) || void 0,
      y = e.imageWidth,
      b = e.imageHeight;
    return {
      ...t,
      url: l || d,
      thumbnailUrl: f,
      videoPosterUrl: f,
      originalUrl: l || void 0,
      ossUploaded: !0,
      _globalOssUrlOnly: !0,
      _ossRemoteUrl: l || void 0,
      _ossThumbnailUrl: f,
      _assetId: void 0,
      ...(typeof y == "number" && typeof b == "number" && y > 0 && b > 0 ? {
        width: y,
        height: b
      } : {})
    };
  }
  const u = e.imageWidth,
    h = e.imageHeight,
    p = Array.isArray(t == null ? void 0 : t.mjImages) ? t.mjImages.map(f => n(f)) : void 0,
    m = Array.isArray(t == null ? void 0 : t.mjThumbnails) ? t.mjThumbnails.map(f => n(f)) : void 0;
  return {
    ...t,
    ...(p ? {
      mjImages: p
    } : {}),
    ...(m ? {
      mjThumbnails: m
    } : {}),
    url: d,
    thumbnailUrl: d || void 0,
    originalUrl: l || void 0,
    ossUploaded: !0,
    _globalOssUrlOnly: !0,
    _ossRemoteUrl: l || void 0,
    _ossThumbnailUrl: d || void 0,
    _assetId: void 0,
    ...(typeof u == "number" && typeof h == "number" && u > 0 && h > 0 ? {
      width: u,
      height: h
    } : {})
  };
}

async function PCt(e, t, n) {
  const r = e.map(b => String(b || "").trim()).filter(Boolean);
  if (r.length === 0) throw new Error("[resolveGenImageCompletion] empty resultUrls");
  const a = await xT(r, t, !1);
  if (a) {
    const b = a.displayUrls.find(v => v && !Ko(v) && (/\/thumbnails\//i.test(v) || Qc(v))) || "";
    if (b) return {
      usedOss: !0,
      ossPack: a,
      displayUrls: a.displayUrls.map(v => Ko(v) ? "" : v),
      remoteUrls: a.remoteUrls,
      primaryDisplayUrl: b,
      generatedImages: a.generatedImages,
      contentAssetId: void 0
    };
  }
  const {
      persistGenImageResultForDownstream: i,
      getFullBlobForDisplayUrl: o,
      resizeBlobForDisplay: s,
      PREVIEW_CALLBACK_MAX_DIM: l,
      PREVIEW_CALLBACK_QUALITY: d,
      registerDisplayUrlAssetId: u
    } = await Ie(async () => {
      const {
        persistGenImageResultForDownstream: b,
        getFullBlobForDisplayUrl: v,
        resizeBlobForDisplay: _,
        PREVIEW_CALLBACK_MAX_DIM: w,
        PREVIEW_CALLBACK_QUALITY: k,
        registerDisplayUrlAssetId: A
      } = await Promise.resolve().then(() => No);
      return {
        persistGenImageResultForDownstream: b,
        getFullBlobForDisplayUrl: v,
        resizeBlobForDisplay: _,
        PREVIEW_CALLBACK_MAX_DIM: w,
        PREVIEW_CALLBACK_QUALITY: k,
        registerDisplayUrlAssetId: A
      };
    }, void 0, import.meta.url),
    h = [],
    p = [];
  let m = r[0],
    f = t;
  if (r.length === 1) try {
    const b = await i(r[0], {
      nodeId: (n == null ? void 0 : n.nodeId) || t,
      taskId: t,
      model: n == null ? void 0 : n.model
    });
    m = b.displayUrl || r[0] || "", f = b.assetId || t, p.push(b.displayUrl), h.push({
      id: t,
      thumbUrl: r[0],
      fullUrl: b.fullUrl,
      assetId: b.assetId,
      createdAt: Date.now()
    });
  } catch {
    p.push(r[0]), h.push({
      id: t,
      thumbUrl: r[0],
      fullUrl: r[0],
      createdAt: Date.now()
    });
  } else {
    for (let b = 0; b < r.length; b++) {
      const v = r[b],
        _ = b === 0 ? t : `${t}_${b}`,
        w = `${t}_mj_${b}`;
      let k = "";
      try {
        k = (await YIn(v, w, _)) || "";
      } catch {}
      if (!k) try {
        const A = await o(v, _);
        if (A) {
          const S = await s(A, l, d);
          S && (k = URL.createObjectURL(S), u(k, _));
        }
      } catch {}
      p.push(k), h.push({
        id: _,
        thumbUrl: k,
        fullUrl: v,
        assetId: _,
        createdAt: Date.now()
      });
    }
    m = p[0] || r[0], f = t;
  }
  ua() && Ko(m) && (m = "");
  const y = p.map(b => ua() && Ko(b) ? "" : b);
  return {
    usedOss: !1,
    ossPack: null,
    displayUrls: y.length > 0 ? y : r.map(() => ""),
    remoteUrls: r,
    primaryDisplayUrl: m,
    generatedImages: h,
    contentAssetId: f
  };
}

function ECn(e) {
  return S0(e) ? {
    ...e,
    _contentAssetId: void 0,
    content: _f(e) || e.content,
    settings: {
      ...e.settings,
      _assetId: void 0,
      _contentAssetId: void 0,
      [Cl]: !0
    }
  } : e;
}

function sPr(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) t = Math.imul(31, t) + e.charCodeAt(n) | 0;
  return Math.abs(t).toString(36);
}

function lPr(e) {
  const t = String(e || "").toLowerCase();
  return !t.includes("/videos/") || t.includes("/thumbnails/") || t.includes("/images/") ? !1 : /\.(mp4|webm|mov|m4v)(\?|$)/i.test(t);
}

function cPr(e) {
  return String(e.id || "").startsWith("oss-recovered-") ? !0 : !!(e._globalOssUrlOnly && e.modelName === "全局 OSS" && (e.prompt === "OSS 云端恢复素材" || e.prompt === "OSS 云端恢复视频"));
}

async function dPr() {
  var h, p, m, f;
  if (!us()) return [];
  const e = sc();
  if (!((h = e.bucket) != null && h.trim()) || !((p = e.endpoint) != null && p.trim()) || !((m = e.accessKeyId) != null && m.trim()) || !((f = e.accessKeySecret) != null && f.trim())) return [];
  const {
      invoke: t
    } = await Ie(async () => {
      const {
        invoke: y
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: y
      };
    }, void 0, import.meta.url),
    {
      buildHuyaSeedanceOssPublicUrl: n,
      getMaterialRootPrefix: r
    } = await Ie(async () => {
      const {
        buildHuyaSeedanceOssPublicUrl: y,
        getMaterialRootPrefix: b
      } = await Promise.resolve().then(() => Ah);
      return {
        buildHuyaSeedanceOssPublicUrl: y,
        getMaterialRootPrefix: b
      };
    }, void 0, import.meta.url),
    {
      filterDeletedHistoryItems: a,
      loadDeletedHistoryUrls: i
    } = await Ie(async () => {
      const {
        filterDeletedHistoryItems: y,
        loadDeletedHistoryUrls: b
      } = await Promise.resolve().then(() => Gu);
      return {
        filterDeletedHistoryItems: y,
        loadDeletedHistoryUrls: b
      };
    }, void 0, import.meta.url),
    s = [`${r(e)}videos/`],
    l = i(),
    d = new Set(),
    u = [];
  for (const y of s) {
    let b;
    try {
      b = await t("oss_list_objects", {
        args: {
          endpoint: e.endpoint,
          bucket: e.bucket,
          prefix: y,
          access_key_id: e.accessKeyId.trim(),
          access_key_secret: e.accessKeySecret.trim(),
          max_keys: 1e3
        }
      });
    } catch (v) {
      console.warn("[globalOssMaterial] recoverHistoryItemsFromGlobalMaterialOss list failed:", y, v);
      continue;
    }
    for (const v of (b == null ? void 0 : b.keys) ?? []) {
      if (!lPr(v)) continue;
      const _ = ya(n(e, v));
      !_ || d.has(_) || l.has(_) || (d.add(_), u.push({
        id: `oss-recovered-${sPr(v)}`,
        type: "video",
        url: _,
        originalUrl: _,
        _ossRemoteUrl: _,
        _globalOssUrlOnly: !0,
        prompt: "OSS 云端恢复视频",
        time: new Date().toLocaleTimeString(),
        status: "completed",
        progress: 100,
        modelName: "全局 OSS",
        ossUploaded: !0
      }));
    }
  }
  return a(u);
}

function uPr() {
  return {
    normalizeOssCache: RO.size,
    httpImageDimensionCache: NO.size
  };
}

function hPr(e) {
  if (RO.clear(), NO.clear(), Tbe.clear(), GH = null, jV = [], Pae = null, Rae = null, bz = [], Gpt = !1, nne = null, CHe(), mLe.clear(), Cbe.clear(), rre.clear(), Hle.clear(), Oae.clear(), Ebe.clear(), !e || e.size === 0) {
    FK.clear(), zK.clear(), SF.clear();
    return;
  }
  for (const t of [...FK]) e.has(t) || FK.delete(t);
  for (const t of [...zK]) e.has(t) || zK.delete(t);
  for (const t of [...SF.keys()]) {
    const n = t.split(":")[0];
    e.has(n) || SF.delete(t);
  }
}

function pPr() {
  const e = [mLe, Cbe, rre, Hle, Oae, Ebe];
  let t = 0;
  for (const n of e) t += n.size;
  return {
    normalizeCacheEntries: RO.size,
    httpDimCacheEntries: NO.size + Tbe.size,
    healAttemptedSets: t,
    coverEnsureCount: FK.size + zK.size + SF.size,
    cachedHistoryRawBytes: GH ? GH.length * 2 : 0
  };
}

const ii = Object.freeze(Object.defineProperty({
    __proto__: null,
    CROP_SPLIT_PENDING_SETTING_KEY: h7,
    HISTORY_MJ_SLOT_INDEX_SETTING_KEY: $In,
    HISTORY_SOURCE_TASK_ID_SETTING_KEY: OS,
    LIST_PREVIEW_MAX_EDGE: Ej,
    LIST_PREVIEW_WEBP_QUALITY: uLe,
    MAX_WEBVIEW_IMAGE_FALLBACK_BYTES: DV,
    OSS_REMOTE_URL_SETTING_KEY: _i,
    OSS_THUMBNAIL_URL_SETTING_KEY: Pi,
    OSS_UPLOADING_SETTING_KEY: T0,
    OSS_URL_ONLY_MODE_KEY: Cl,
    PREVIEW_MJ_OSS_REMOTE_URLS_KEY: kD,
    SOURCE_REMOTE_RESULT_URL_SETTING_KEY: EY,
    applyCanvasOssRemoteHealToHistoryItem: Fue,
    applyDistinctMjOssSlotsToHistoryItem: qIn,
    applyUrlOnlyPatchToNode: q$,
    backfillGlobalOssListThumbnailFromOssUrl: h5e,
    backfillHuyaExternalGenNodesAfterProjectOpen: qMr,
    backfillOssInputImageVideoPostersAfterProjectOpen: HMr,
    buildGeneratedImagesFromOssPairs: uCn,
    buildHistoryItemPatchFromGlobalOss: _T,
    buildListPreviewFileFromBlob: H$,
    buildMosaicInputImageOssSettings: aCt,
    buildOssGenPreviewSizeSettings: nCn,
    buildOssVideoFramePosterUrl: kHe,
    buildPreviewStitchOssNodeSettings: uMr,
    buildUrlOnlyNodePatch: Hv,
    canUseComflyOssUrlJsonGenerations: CCn,
    canUseVolcArkOfficialOssUrlRefs: ICn,
    canvasNodePrefersOssDomDisplay: _He,
    clearGlobalOssMaterialMemoryCaches: hPr,
    collectHuyaExternalUrlsFromGenNode: p5e,
    collectInputImageOssOriginalCandidates: c5e,
    collectMjSideOutputGroupsFromCanvasNodes: WIn,
    collectMjSideOutputOssRemotesForHistoryItem: d5e,
    collectOssThumbUrlsFromNode: cLe,
    comflyGenerationsImagePayloadField: F8,
    createInputImageNodesFromCropSplits: vCn,
    createPlaceholderInputImageNodesForCropSplits: ACt,
    deriveInputImageOssOriginalUrl: G$,
    ensureAuthorityHistoryOssIndex: sLe,
    ensureHistoryImageListCoverWebp: Dae,
    ensureHistoryOssListDisplayUrl: Rk,
    ensureHistoryVideoListCoverWebp: jae,
    ensureOssCanvasThumbDisplayUrl: ym,
    ensureOssGenImageThumbnail: mCn,
    ensureOssGenVideoPoster: yCt,
    ensureOssInputImageVideoPoster: gCt,
    extractAndUploadVideoPosterFromRemoteUrl: eCn,
    extractPreviewActualSizeFromOssPack: jMr,
    extractPreviewActualSizeFromOssSettings: NHe,
    fillHistoryOssListDisplayFields: wCt,
    fillInputImageNodesFromCropSplits: SCt,
    filterHistoryByCurrentStorageMode: G1,
    findCanvasNodeOssOriginalForHistoryItem: THe,
    findHistoryItemForAssetOrId: OK,
    findHistoryItemForGenNode: Ij,
    formatImagePixelSizeLabel: yU,
    genNodeHasOwnGeneratedOutput: jHe,
    generateListPreviewDataUrl: QIn,
    getCanvasNodeOssOriginalUrl: V$,
    getCanvasNodePrimaryLocalAssetId: AHe,
    getGenNodeOssDisplayUrl: Bm,
    getGenNodeOssOriginalUrl: Zo,
    getGenNodeOssVideoPlaybackUrl: P0,
    getGlobalOssMaterialCacheProbe: uPr,
    getGlobalOssMaterialMemoryAudit: pPr,
    getInputImageDisplayUrl: _f,
    getInputImageOssRemoteUrl: Vh,
    getInputImagePrimaryAssetId: Bue,
    getPreviewStitchedContentAssetId: rCt,
    getPreviewStitchedFullUrl: Mae,
    hasOssServerThumbProcess: Qc,
    healFakeOssGenVideoPlaybackIfNeeded: hCn,
    healHistoryMjImagesFromStoredThumbs: Cj,
    healMisclassifiedHuyaLocalHistoryItem: K$,
    healMisclassifiedHuyaMjLocalHistoryItem: JMr,
    historyItemHasDistinctMjOssOriginals: xP,
    historyItemSkipsLocalAssetRestore: Nk,
    historyItemStorageModeFlags: xCn,
    invalidateInputImageDownstreamUrlCache: HIn,
    isAliyunOssSignedMediaUrl: $pt,
    isAutoRecoveredGlobalOssHistoryItem: cPr,
    isCanvasLocalCacheMode: ei,
    isCanvasOssDisplayMode: E0,
    isCanvasWebpExportSupported: Wwe,
    isGenNodeCanvasThumbDisplayUrl: Lae,
    isGlobalOssUploadEnabled: ua,
    isGlobalOssUrlOnlyNode: S0,
    isHistoryGlobalOssDisplay: vv,
    isHistoryImageCoverEnsureDone: RHe,
    isHistoryItemCloudStored: Q$,
    isHistoryLightboxOssOnlyMode: H4,
    isHistoryLocalOnlyBadgeMode: _Cn,
    isHostedMediaOriginalImageUrl: SY,
    isHuyaArtExternalResultUrl: Ko,
    isInputImageGlobalOssCanvasNode: Oue,
    isLikelyImageDisplayUrl: tl,
    isLikelyOssThumbnailPixelSize: nl,
    isLikelyVideoDisplayUrl: $o,
    isLocalCanvasDisplayUrl: Mk,
    isLocalListPreviewWebp: CY,
    isLocalVideoOriginalUrl: EE,
    isOssBareOriginalImageUrl: gx,
    isOssGenImageMissingRealThumbnail: vCt,
    isOssGenVideoMissingImagePoster: Vle,
    isOssInputImageVideoMissingImagePoster: Kwe,
    isOssListCoverObjectUrl: Iy,
    isOssPublicHttpUrl: nr,
    isOssVideoFrameProcessUrl: QE,
    isShopComflyChatGateway: TCt,
    isVeoFastHttpImageUrl: ACn,
    isVolcArkOfficialFetchableImageUrl: SCn,
    lookupGlobalOssDisplayByRemoteUrl: Dwe,
    lookupGlobalOssRemoteByDisplayUrl: A0,
    lookupHistoryOssRemoteByThumbnailStem: EHe,
    markHistoryImageCoverEnsureDone: Zw,
    mergeExtraHistoryItemsForOssLookup: iCt,
    mergeOssGenVideoPostersFromHistory: GMr,
    needsHuyaExternalGenNodeRehost: DHe,
    nodeHasLocalCacheAssetMarkers: Lue,
    normalizeComflyGenerationsRefImageUrls: MCt,
    normalizeOssPublicHttpUrl: ya,
    ossImagesPathFromUrl: Vg,
    ossThumbnailsPathFromMisplacedImagesUrl: Due,
    ossUrlToCacheAssetId: wHe,
    persistCropSplitsToAssetStore: kCt,
    persistGenResultPreviewThumbnail: YIn,
    persistGlobalOssListThumbnailLocal: u5e,
    persistHistoryListThumbnailFromLocalAsset: EMr,
    persistHistoryListThumbnailLocal: CE,
    pickGenAudioPlaybackUrl: Ypt,
    pickGenVideoPlaybackUrl: Qpt,
    pickHistoryHybridListThumb: hLe,
    pickHistoryMjSlotIndex: l5e,
    pickHistoryMjSlotOriginalUrl: M0,
    pickHistoryMjSlotThumbUrl: OM,
    pickHistoryOssHttpsUrl: sZ,
    pickHistoryOssOriginalUrl: Bd,
    pickHistoryOssThumbUrl: jg,
    pickHistoryOssUrlForGenNode: Gle,
    pickHistoryOssVideoPosterForNode: bCt,
    pickHistoryVideoListCoverUrl: cCt,
    pickInputImageOriginalLazyRef: dLe,
    pickInputImageOssOriginalUrl: wP,
    pickOssVideoImagePosterUrl: Ay,
    pickPreviewOssRemoteUrl: Nae,
    probeGenNodeOriginalImageDimensions: hCt,
    probeHttpImageDimensions: Z5,
    probeHttpImageDimensionsForLayout: Bae,
    probeRemoteUrlLooksLikeImageNotVideo: qwe,
    readHistoryHybridListThumbnail: hf,
    readImageFilePixelSize: zue,
    readInputImageHistoryMjSlot: GIn,
    recoverHistoryItemsFromGlobalMaterialOss: dPr,
    recoverPlayableVideoUrlFromOssProcess: nCt,
    registerPendingGlobalOssOriginalByDisplayUrl: LK,
    rehostHuyaExternalGenNodeToGlobalOss: xCt,
    rehostHuyaExternalHistoryToGlobalOss: fLe,
    repairPollutedInputImageOssRemoteUrl: IY,
    resetHistoryImageCoverEnsure: qpt,
    resolveConnectedInputOriginalUrlAsync: VIn,
    resolveGenImageCompletion: PCt,
    resolveGenImageOriginalSizeLabel: LMr,
    resolveGenImageUrlsViaGlobalOss: mCt,
    resolveGlobalOssThumbnailToOriginalUrl: Go,
    resolveHistoryGlobalOssLightboxUrl: KIn,
    resolveHistoryLightboxOssOriginalUrl: Sj,
    resolveImageSourceToBlob: PHe,
    resolveInputImageNodeContentForCrop: L1,
    resolveInputImageUrlForDownstream: Vv,
    resolveLocalAssetRefForGenApi: SHe,
    resolveNodeDownloadUrl: dM,
    resolveOssDisplayRemotePair: IHe,
    resolveOssGenPreviewSizeSettings: rCn,
    resolveOssOriginalPreviewSizeLabel: DMr,
    resolveOssPublicUrlForDisplay: xHe,
    resolvePreviewDownloadUrl: lCt,
    resolvePreviewDownloadUrlAsync: Hpt,
    resolveShotMediaDisplayUrl: iLe,
    resolveShotMediaUrlForApi: OIn,
    resolveVolcArkOfficialRefImageUrl: ECt,
    resolveVolcArkOfficialRefImageUrls: yLe,
    sanitizeCanvasNodeForProjectSave: LHe,
    sanitizeCanvasNodeOnLoad: m5e,
    sanitizeHistoryItemOnLoad: _Ct,
    sanitizeNodeForGlobalOssExport: ECn,
    scheduleGlobalOssUploadForInputImageNode: WMr,
    scheduleGlobalOssUrlOnlyUpload: fCn,
    scheduleHuyaExternalGenNodeRehostIfNeeded: gCn,
    scheduleOssGenImageThumbHealIfNeeded: Qwe,
    scheduleOssVideoPosterHealIfNeeded: Ywe,
    setLiveHistoryListForOssLookup: fMr,
    shouldMapOssUrlForDisplay: $le,
    shouldPreviewGridStitchUploadToGlobalOss: dMr,
    shouldSetCrossOriginForRemoteMediaUrl: lMr,
    shouldShowHistoryCloudBackupBadge: ICt,
    shouldShowHistoryItemInCurrentStorageMode: wCn,
    shouldShowHistoryItemInStorageMode: gLe,
    shouldShowHistoryLocalCacheBadge: CCt,
    shouldSkipLocalPersistForGlobalOss: _Mr,
    toHistoryOssBareOriginalUrl: Wh,
    toLocalDisplayUrlIfOss: jIn,
    tryBeginHistoryImageCoverEnsure: ZIn,
    tryResolveGenResultForGlobalOss: xT,
    uploadBlobUrlToGlobalMaterialImage: Uk,
    uploadGlobalMaterialAudio: uCt,
    uploadGlobalMaterialFile: _P,
    uploadGlobalMaterialImage: W$,
    uploadGlobalMaterialVideo: dCt,
    uploadRemoteAudioResultToGlobalOss: zMr,
    uploadRemoteImageResultToGlobalOss: dCn,
    uploadRemoteVideoResultToGlobalOss: pCt,
    waitForPendingGlobalOssOriginalByDisplayUrl: tCt
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  mPr = {
    tier: "high",
    contentCacheMaxBytes: 80 * 1024 * 1024,
    contentCacheMaxItems: 120,
    largeContentCacheMax: 80,
    rustCacheDualWriteThreshold: 2 * 1024 * 1024,
    thumbnailCacheMax: 500,
    previewCacheMax: 80,
    allowHeavyGpuEffects: !0,
    allowVideoFirstFrameBitmap: !0,
    preloadMarginScreens: 1.75,
    enableMemoryPoolPolling: !1,
    memoryCheckIntervalMs: 3e4,
    lazyContentCacheMaxBytes: 48 * 1024 * 1024,
    lazyContentCacheMaxItems: 240,
    idleMemoryCleanupMs: 120 * 1e3,
    debugScore: 0,
    forcedLow: !1,
    debugInfo: {
      deviceMemoryGB: null,
      hardwareConcurrency: 0,
      jsHeapSizeLimitMB: null,
      gpuRenderer: null,
      isWindows: !1,
      isMac: !1,
      systemMemoryGB: null
    }
  };

function fPr() {
  return !1;
}

function gPr(e) {
  return a9();
}

function yPr(e) {
  return a9();
}

function a9() {
  return mPr;
}

function bPr() {
  return "high";
}

function vPr() {
  return !1;
}

typeof window < "u" && (window.__deviceTier = {
  get: bPr,
  getConfig: a9,
  isLowEnd: vPr,
  isForceLowEnd: fPr,
  setForceLowEnd: gPr,
  setSystemMemoryGB: yPr
});

const wPr = "qiaodoumayi_thumbnail_store",
  xPr = 3,
  $s = {
    THUMBNAILS: "thumbnails",
    PREVIEWS: "previews",
    SIZES: "sizes",
    METADATA: "metadata"
  },
  AG = {
    SIZE: 128,
    QUALITY: .5
  },
  pee = {
    MAX_SIZE: 256,
    QUALITY: .36
  },
  _Pr = 8,
  Wge = 256,
  kPr = [128, 256, 512, 1024, 2048],
  APr = {
    128: .4,
    256: .55,
    512: .65,
    1024: .72,
    2048: .78
  },
  rme = a9(),
  Ret = {
    MAX_THUMBNAILS: rme.thumbnailCacheMax,
    MAX_PREVIEWS: rme.previewCacheMax,
    MAX_SIZE_CACHE: rme.thumbnailCacheMax,
    MAX_MEMORY_MB: Math.round(rme.thumbnailCacheMax * .1 + rme.previewCacheMax * .5)
  },
  QHt = 96 * 1024 * 1024;

let TCn = !1,
  jO = 0;

const Xwe = new Map();

function Zpt(e) {
  TCn = e;
}

function VEe() {
  return TCn ? Math.floor(QHt / 2) : QHt;
}

function YHt(e, t) {
  const n = p1.get(e);
  if (n != null && n.width && (n != null && n.height)) {
    const r = Math.min(1, t / Math.max(n.width, n.height, 1));
    return Math.max(4096, Math.round(n.width * r * n.height * r * 4));
  }
  return t * t * 4;
}

function XHt(e, t) {
  const n = Xwe.get(e) || 0;
  jO += t - n, Xwe.set(e, t);
}

function ame(e) {
  const t = Xwe.get(e) || 0;
  t && (jO = Math.max(0, jO - t), Xwe.delete(e));
}

const IA = new Map(),
  k_ = new Map(),
  OI = new Map(),
  p1 = new Map(),
  A_ = new Map(),
  SPr = 1024,
  Sw = [],
  G0 = [],
  S_ = [],
  RGe = class RGe {
    constructor() {
      On(this, "db", null);
      On(this, "initPromise", null);
      On(this, "initFailed", !1);
      On(this, "workerRef", null);
      On(this, "workerReady", !1);
      On(this, "workerBusy", !1);
      On(this, "workerQueue", []);
      On(this, "dualPending", new Map());
    }
    async init() {
      if (this.initFailed || this.db) return;
      if (this.initPromise) return this.initPromise;
      this.initPromise = new Promise((n, r) => {
        try {
          if (typeof indexedDB > "u") {
            console.warn("[ThumbnailStore] IndexedDB not available"), n();
            return;
          }
          const a = indexedDB.open(wPr, xPr);
          a.onerror = () => {
            console.error("[ThumbnailStore] Failed to open IndexedDB:", a.error), this.initFailed = !0, n();
          }, a.onsuccess = () => {
            this.db = a.result, console.log("[ThumbnailStore] IndexedDB initialized"), n();
          }, a.onupgradeneeded = i => {
            const o = i.target.result;
            if (o.objectStoreNames.contains($s.THUMBNAILS) || o.createObjectStore($s.THUMBNAILS, {
              keyPath: "id"
            }), o.objectStoreNames.contains($s.PREVIEWS) || o.createObjectStore($s.PREVIEWS, {
              keyPath: "id"
            }), !o.objectStoreNames.contains($s.SIZES)) {
              const s = o.createObjectStore($s.SIZES, {
                keyPath: ["id", "size"]
              });
              s.createIndex("byId", "id", {
                unique: !1
              }), s.createIndex("bySize", "size", {
                unique: !1
              });
            }
            o.objectStoreNames.contains($s.METADATA) || o.createObjectStore($s.METADATA, {
              keyPath: "id"
            }).createIndex("createdAt", "createdAt", {
              unique: !1
            }), console.log("[ThumbnailStore] Object stores created");
          };
        } catch (a) {
          console.error("[ThumbnailStore] Init error:", a), this.initFailed = !0, n();
        }
      });
      const t = new Promise((n, r) => {
        setTimeout(() => r(new Error("Timeout")), 5e3);
      });
      try {
        await Promise.race([this.initPromise, t]);
      } catch {
        this.initFailed = !0;
      }
    }
    generateId(t, n) {
      return `${n}_${t}`;
    }
    dispatchNextWorkerItem() {
      if (this.workerBusy || !this.workerReady || !this.workerRef) return;
      const t = this.workerQueue[0];
      t && (this.workerBusy = !0, t.timeoutId = setTimeout(() => {
        this.workerQueue = this.workerQueue.filter(n => n.id !== t.id), this.workerBusy = !1, this.generateThumbnailMainThread(t.imageData, t.maxSize, t.quality).then(t.resolve).catch(t.reject), this.dispatchNextWorkerItem();
      }, RGe.WORKER_ITEM_TIMEOUT_MS), this.workerRef.postMessage({
        type: "generate",
        id: t.id,
        imageData: t.imageData,
        maxSize: t.maxSize,
        quality: t.quality
      }));
    }
    async initWorker() {
      if (this.workerRef && this.workerReady) return this.workerRef;
      if (typeof OffscreenCanvas > "u" || typeof Worker > "u") return console.warn("[ThumbnailStore] OffscreenCanvas or Worker not supported, falling back to main thread"), null;
      try {
        return this.workerRef = new S5n(), this.workerRef.onmessage = t => {
          const n = t.data;
          if (n.type === "dual-result") {
            const a = this.dualPending.get(n.id);
            a && (a.timeoutId && clearTimeout(a.timeoutId), this.dualPending.delete(n.id), n.error ? this.generateDualMainThread(a.imageData, a.thumbSize, a.thumbQuality, a.previewSize, a.previewQuality).then(a.resolve).catch(a.reject) : a.resolve({
              thumb: n.thumbData || "",
              preview: n.previewData || "",
              width: n.sourceWidth || 0,
              height: n.sourceHeight || 0
            }));
            return;
          }
          const r = this.workerQueue.find(a => a.id === n.id);
          r && (r.timeoutId && (clearTimeout(r.timeoutId), r.timeoutId = void 0), n.error ? this.generateThumbnailMainThread(r.imageData, r.maxSize, r.quality).then(r.resolve).catch(r.reject) : r.resolve(n.thumbnailData || ""), this.workerQueue = this.workerQueue.filter(a => a.id !== n.id), this.workerBusy = !1, this.dispatchNextWorkerItem());
        }, this.workerRef.onerror = t => {
          var r;
          console.error("[ThumbnailStore] Worker error:", t), (r = this.workerRef) == null || r.terminate();
          for (const a of this.workerQueue) a.timeoutId && clearTimeout(a.timeoutId);
          const n = this.workerQueue.splice(0);
          (async () => {
            for (const a of n) try {
              a.resolve(await this.generateThumbnailMainThread(a.imageData, a.maxSize, a.quality));
            } catch (i) {
              a.reject(i instanceof Error ? i : new Error(String(i)));
            }
          })();
          for (const [, a] of this.dualPending) a.timeoutId && clearTimeout(a.timeoutId), this.generateDualMainThread(a.imageData, a.thumbSize, a.thumbQuality, a.previewSize, a.previewQuality).then(a.resolve).catch(a.reject);
          this.dualPending.clear(), this.workerRef = null, this.workerReady = !1, this.workerBusy = !1;
        }, this.workerReady = !0, this.workerRef;
      } catch (t) {
        return console.warn("[ThumbnailStore] Failed to create Worker, falling back to main thread:", t), null;
      }
    }
    async generateThumbnailMainThread(t, n, r) {
      return new Promise((a, i) => {
        const o = new Image();
        /^https?:\/\//i.test(t) && (o.crossOrigin = "anonymous");
        const s = NS(t);
        o.onload = () => {
          try {
            if (s !== t) try {
              URL.revokeObjectURL(s);
            } catch {}
            const l = document.createElement("canvas"),
              d = l.getContext("2d", {
                alpha: !0
              });
            if (!d) {
              a(t);
              return;
            }
            let u = o.naturalWidth,
              h = o.naturalHeight;
            if (u > n || h > n) {
              const f = Math.min(n / u, n / h);
              u = Math.round(u * f), h = Math.round(h * f);
            }
            l.width = u, l.height = h, d.imageSmoothingEnabled = !0, d.imageSmoothingQuality = "medium", d.drawImage(o, 0, 0, u, h);
            const p = zpt({
                imageData: t,
                ctx: d,
                width: u,
                height: h
              }) ? "image/png" : Wwe() ? "image/webp" : "image/jpeg",
              m = l.toDataURL(p, r);
            a(m);
          } catch (l) {
            console.warn("[ThumbnailStore] Generate thumbnail failed:", l), a(t);
          }
        }, o.onerror = () => {
          if (console.warn("[ThumbnailStore] Image load failed"), s !== t) try {
            URL.revokeObjectURL(s);
          } catch {}
          a(t);
        }, o.src = s;
      });
    }
    async generateDualMainThread(t, n, r, a, i) {
      return new Promise(o => {
        const s = new Image();
        /^https?:\/\//i.test(t) && (s.crossOrigin = "anonymous");
        const l = NS(t);
        s.onload = () => {
          try {
            if (l !== t) try {
              URL.revokeObjectURL(l);
            } catch {}
            const d = (u, h) => {
              let p = s.naturalWidth,
                m = s.naturalHeight;
              if (p > u || m > u) {
                const v = Math.min(u / p, u / m);
                p = Math.round(p * v), m = Math.round(m * v);
              }
              const f = document.createElement("canvas");
              f.width = p, f.height = m;
              const y = f.getContext("2d", {
                alpha: !0
              });
              if (!y) return t;
              y.imageSmoothingEnabled = !0, y.imageSmoothingQuality = "medium", y.drawImage(s, 0, 0, p, m);
              const b = zpt({
                imageData: t,
                ctx: y,
                width: p,
                height: m
              }) ? "image/png" : Wwe() ? "image/webp" : "image/jpeg";
              return f.toDataURL(b, h);
            };
            o({
              thumb: d(n, r),
              preview: d(a, i),
              width: s.naturalWidth,
              height: s.naturalHeight
            });
          } catch (d) {
            console.warn("[ThumbnailStore] Generate dual thumbnail failed:", d), o({
              thumb: t,
              preview: t,
              width: s.naturalWidth,
              height: s.naturalHeight
            });
          }
        }, s.onerror = () => {
          if (console.warn("[ThumbnailStore] Image load failed (dual)"), l !== t) try {
            URL.revokeObjectURL(l);
          } catch {}
          o({
            thumb: t,
            preview: t,
            width: 0,
            height: 0
          });
        }, s.src = l;
      });
    }
    async generateThumbnailAndPreview(t, n = AG.SIZE, r = AG.QUALITY, a = pee.MAX_SIZE, i = pee.QUALITY) {
      const o = await this.initWorker();
      return o && this.workerReady ? new Promise((s, l) => {
        const d = `dual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          u = setTimeout(() => {
            this.dualPending.delete(d), this.generateDualMainThread(t, n, r, a, i).then(s).catch(l);
          }, 3e4);
        this.dualPending.set(d, {
          resolve: s,
          reject: l,
          timeoutId: u,
          imageData: t,
          thumbSize: n,
          thumbQuality: r,
          previewSize: a,
          previewQuality: i
        }), o.postMessage({
          type: "generate-dual",
          id: d,
          imageData: t,
          thumbSize: n,
          thumbQuality: r,
          previewSize: a,
          previewQuality: i
        });
      }) : typeof requestIdleCallback < "u" ? new Promise(s => {
        requestIdleCallback(() => {
          this.generateDualMainThread(t, n, r, a, i).then(s).catch(() => s({
            thumb: t,
            preview: t,
            width: 0,
            height: 0
          }));
        });
      }) : this.generateDualMainThread(t, n, r, a, i);
    }
    async generateThumbnail(t, n = AG.SIZE, r = AG.QUALITY) {
      return (await this.initWorker()) && this.workerReady ? new Promise((i, o) => {
        const s = `thumb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.workerQueue.push({
          id: s,
          imageData: t,
          maxSize: n,
          quality: r,
          resolve: i,
          reject: o
        }), this.dispatchNextWorkerItem();
      }) : typeof requestIdleCallback < "u" ? new Promise(i => {
        requestIdleCallback(() => {
          this.generateThumbnailMainThread(t, n, r).then(i).catch(() => i(t));
        });
      }) : this.generateThumbnailMainThread(t, n, r);
    }
    async getImageDimensions(t) {
      return new Promise(n => {
        const r = new Image();
        r.onload = () => {
          n({
            width: r.naturalWidth,
            height: r.naturalHeight
          });
        }, r.onerror = () => {
          n({
            width: 0,
            height: 0
          });
        }, r.src = t;
      });
    }
    async isPreviewDataCurrent(t) {
      const n = await this.getImageDimensions(t);
      return n.width <= 0 || n.height <= 0 ? !0 : Math.max(n.width, n.height) <= pee.MAX_SIZE + _Pr;
    }
    async isPreviewDataCurrentCached(t, n) {
      const r = A_.get(t);
      if (r && r.data === n) return r.current;
      const a = await this.isPreviewDataCurrent(n);
      for (A_.set(t, {
        data: n,
        current: a
      }); A_.size > SPr;) {
        const i = A_.keys().next().value;
        if (!i) break;
        A_.delete(i);
      }
      return a;
    }
    async generateAndStoreStandardSizes(t, n) {
      if (await this.init(), !n.startsWith("data:image")) return;
      const r = await this.getImageDimensions(n),
        a = r.width,
        i = r.height,
        s = a > Wge || i > Wge ? kPr.filter(l => a > l || i > l) : [];
      if (s.length !== 0) try {
        const l = s.map(u => this.generateThumbnail(n, u, APr[u] || .7).then(h => ({
            size: u,
            data: h
          }))),
          d = await Promise.all(l);
        if (this.db) {
          const u = this.db.transaction([$s.SIZES, $s.METADATA], "readwrite"),
            h = u.objectStore($s.SIZES),
            p = u.objectStore($s.METADATA);
          d.forEach(({
            size: f,
            data: y
          }) => {
            const b = {
              id: t,
              size: f,
              data: y,
              size_bytes: y.length * 2,
              createdAt: Date.now()
            };
            h.put(b);
            const v = `${t}_${f}`;
            this.updateSizeThumbnailCache(v, y);
          });
          const m = p1.get(t) || {
            id: t,
            originalSize: n.length * 2,
            width: a,
            height: i,
            type: "image",
            hasThumbnail: !1,
            hasPreview: !1,
            availableSizes: [],
            createdAt: Date.now()
          };
          m.availableSizes = d.map(f => f.size), p1.set(t, m), p.put(m), await new Promise((f, y) => {
            u.oncomplete = () => f(), u.onerror = () => y(u.error);
          });
        }
        console.log(`[ThumbnailStore] ✅ Stored ${d.length} standard sizes for ${t}:`, s);
      } catch (l) {
        console.warn("[ThumbnailStore] Failed to generate standard sizes:", l);
      }
    }
    async updateAccessTime(t) {
      const n = p1.get(t);
      n && (n.lastAccessed = Date.now());
    }
    async getBestMatchThumbnail(t, n) {
      await this.init(), this.updateAccessTime(t).catch(() => {});
      const r = `${t}_${n}`;
      if (OI.has(r)) {
        const s = S_.indexOf(r);
        return s > -1 && (S_.splice(s, 1), S_.push(r)), OI.get(r) || null;
      }
      const a = p1.get(t),
        i = (a == null ? void 0 : a.availableSizes) || [];
      if (i.length === 0 && this.db) {
        const s = await new Promise(l => {
          try {
            const h = this.db.transaction([$s.METADATA], "readonly").objectStore($s.METADATA).get(t);
            h.onsuccess = () => l(h.result || null), h.onerror = () => l(null);
          } catch {
            l(null);
          }
        });
        s && (p1.set(t, s), i.push(...(s.availableSizes || [])));
      }
      let o = null;
      if (i.length > 0) {
        const s = i.filter(l => l <= n);
        s.length > 0 ? o = Math.max(...s) : o = Math.min(...i);
      }
      return o && this.db ? new Promise(s => {
        try {
          const u = this.db.transaction([$s.SIZES], "readonly").objectStore($s.SIZES).get([t, o]);
          u.onsuccess = () => {
            const h = u.result;
            if (h) {
              const p = `${t}_${o}`;
              this.updateSizeThumbnailCache(p, h.data), s(h.data);
            } else s(null);
          }, u.onerror = () => s(null);
        } catch {
          s(null);
        }
      }) : null;
    }
    updateSizeThumbnailCache(t, n) {
      const r = S_.indexOf(t);
      r > -1 && S_.splice(r, 1), S_.push(t);
      const a = Ret.MAX_SIZE_CACHE;
      for (; OI.size >= a && S_.length > 0;) {
        const i = S_.shift();
        i && OI.delete(i);
      }
      OI.set(t, n);
    }
    async normalizeImageSourceToDataUrl(t) {
      const n = String(t || "").trim();
      if (!n) return null;
      if (n.startsWith("data:image")) return n;
      if (n.startsWith("blob:") || n.startsWith("http://") || n.startsWith("https://")) try {
        const r = await fetch(n);
        if (!r.ok) return null;
        const a = await r.blob();
        return a.type.startsWith("image/") ? await new Promise((i, o) => {
          const s = new FileReader();
          s.onload = () => i(s.result), s.onerror = () => o(s.error), s.readAsDataURL(a);
        }) : null;
      } catch {
        return null;
      }
      return null;
    }
    async storePreviewOnly(t, n) {
      if (!n.startsWith("data:image") || (await this.init(), this.updatePreviewCache(t, n), !this.db)) return;
      const r = this.db.transaction([$s.PREVIEWS], "readwrite");
      r.objectStore($s.PREVIEWS).put({
        id: t,
        data: n,
        size: n.length * 2
      }), await new Promise((a, i) => {
        r.oncomplete = () => a(), r.onerror = () => i(r.error);
      });
    }
    async storeWithThumbnails(t, n) {
      await this.init();
      const r = await this.normalizeImageSourceToDataUrl(n);
      if (!r) return;
      const a = r.length * 2;
      try {
        const {
          thumb: i,
          preview: o,
          width: s,
          height: l
        } = await this.generateThumbnailAndPreview(r, AG.SIZE, AG.QUALITY, pee.MAX_SIZE, pee.QUALITY);
        if (!(a >= 50 * 1024 || s > Wge || l > Wge)) return;
        const u = {
          id: t,
          originalSize: a,
          width: s,
          height: l,
          type: "image",
          hasThumbnail: !0,
          hasPreview: !0,
          createdAt: Date.now()
        };
        if (this.db) {
          const h = this.db.transaction([$s.THUMBNAILS, $s.PREVIEWS, $s.METADATA], "readwrite"),
            p = h.objectStore($s.THUMBNAILS),
            m = h.objectStore($s.PREVIEWS),
            f = h.objectStore($s.METADATA);
          p.put({
            id: t,
            data: i,
            size: i.length * 2
          }), m.put({
            id: t,
            data: o,
            size: o.length * 2
          }), f.put(u), await new Promise((y, b) => {
            h.oncomplete = () => y(), h.onerror = () => b(h.error);
          });
        }
        this.updateThumbnailCache(t, i), this.updatePreviewCache(t, o), p1.set(t, u), Ie(async () => {
          const {
            localCacheManager: h
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: h
          };
        }, void 0, import.meta.url).then(({
          localCacheManager: h
        }) => {
          h.isAvailable() && h.saveThumbnail(t, o, "preview").catch(p => {
            console.warn("[ThumbnailStore] 预览图(256px)保存到本地失败:", p);
          });
        }).catch(h => {
          console.warn("[ThumbnailStore] 加载 LocalCacheManager 失败:", h);
        }), console.log("[ThumbnailStore] Stored thumbnails for:", t, "thumb:", Math.round(i.length / 1024), "KB", "preview:", Math.round(o.length / 1024), "KB");
      } catch (i) {
        console.warn("[ThumbnailStore] Store failed:", i);
      }
    }
    updateThumbnailCache(t, n) {
      const r = Sw.indexOf(t);
      for (r > -1 && Sw.splice(r, 1), Sw.push(t), XHt(`thumb:${t}`, YHt(t, AG.SIZE)); (IA.size >= Ret.MAX_THUMBNAILS || jO > VEe()) && Sw.length > 0;) {
        const a = Sw[0];
        if (!a || a === t) break;
        Sw.shift(), IA.delete(a), ame(`thumb:${a}`);
      }
      IA.set(t, n);
    }
    updatePreviewCache(t, n) {
      A_.delete(t);
      const r = G0.indexOf(t);
      for (r > -1 && G0.splice(r, 1), G0.push(t), XHt(`preview:${t}`, YHt(t, pee.MAX_SIZE)); (k_.size >= Ret.MAX_PREVIEWS || jO > VEe()) && G0.length > 0;) {
        const a = G0[0];
        if (!a || a === t) break;
        G0.shift(), k_.delete(a), A_.delete(a), ame(`preview:${a}`);
      }
      k_.set(t, n);
    }
    async getThumbnail(t) {
      if (IA.has(t)) {
        const n = Sw.indexOf(t);
        return n > -1 && (Sw.splice(n, 1), Sw.push(t)), IA.get(t) || null;
      }
      return await this.init(), this.db ? new Promise(n => {
        try {
          const i = this.db.transaction([$s.THUMBNAILS], "readonly").objectStore($s.THUMBNAILS).get(t);
          i.onsuccess = () => {
            const o = i.result;
            o ? (this.updateThumbnailCache(t, o.data), n(o.data)) : n(null);
          }, i.onerror = () => n(null);
        } catch {
          n(null);
        }
      }) : null;
    }
    async getPreview(t) {
      if (k_.has(t)) {
        const n = G0.indexOf(t);
        n > -1 && (G0.splice(n, 1), G0.push(t));
        const r = k_.get(t) || null;
        if (r && !(await this.isPreviewDataCurrentCached(t, r))) {
          k_.delete(t), A_.delete(t);
          const a = G0.indexOf(t);
          return a > -1 && G0.splice(a, 1), await this.deletePreviewOnly(t), null;
        }
        return r;
      }
      return await this.init(), this.db ? new Promise(n => {
        try {
          const i = this.db.transaction([$s.PREVIEWS], "readonly").objectStore($s.PREVIEWS).get(t);
          i.onsuccess = () => {
            const o = i.result;
            o ? (this.updatePreviewCache(t, o.data), this.isPreviewDataCurrentCached(t, o.data).then(s => {
              if (!s) {
                this.deletePreviewOnly(t), n(null);
                return;
              }
              n(o.data);
            })) : n(null);
          }, i.onerror = () => n(null);
        } catch {
          n(null);
        }
      }) : null;
    }
    async deletePreviewOnly(t) {
      k_.delete(t), A_.delete(t);
      const n = G0.indexOf(t);
      if (n > -1 && G0.splice(n, 1), await this.init(), !!this.db) try {
        const r = this.db.transaction([$s.PREVIEWS], "readwrite");
        r.objectStore($s.PREVIEWS).delete(t), await new Promise((a, i) => {
          r.oncomplete = () => a(), r.onerror = () => i(r.error);
        });
      } catch (r) {
        console.warn("[ThumbnailStore] Delete preview failed:", r);
      }
    }
    async getImageForZoom(t, n, r) {
      if (n < .3) {
        const a = await this.getThumbnail(t);
        if (a) return a;
      }
      if (n < .8) {
        const a = await this.getPreview(t);
        if (a) return a;
      }
      return r || null;
    }
    hasThumbnail(t) {
      var n;
      return IA.has(t) || ((n = p1.get(t)) == null ? void 0 : n.hasThumbnail) === !0;
    }
    hasPreview(t) {
      var n;
      return k_.has(t) || ((n = p1.get(t)) == null ? void 0 : n.hasPreview) === !0;
    }
    async delete(t) {
      IA.delete(t), k_.delete(t), A_.delete(t), p1.delete(t);
      const n = Sw.indexOf(t);
      n > -1 && Sw.splice(n, 1);
      const r = G0.indexOf(t);
      r > -1 && G0.splice(r, 1);
      const a = `${t}_`;
      for (const i of Array.from(OI.keys())) i.startsWith(a) && OI.delete(i);
      for (let i = S_.length - 1; i >= 0; i--) S_[i].startsWith(a) && S_.splice(i, 1);
      if (await this.init(), !!this.db) try {
        const i = this.db.transaction([$s.THUMBNAILS, $s.PREVIEWS, $s.METADATA, $s.SIZES], "readwrite");
        i.objectStore($s.THUMBNAILS).delete(t), i.objectStore($s.PREVIEWS).delete(t), i.objectStore($s.METADATA).delete(t);
        const s = i.objectStore($s.SIZES).index("byId").openKeyCursor(IDBKeyRange.only(t));
        s.onsuccess = () => {
          const l = s.result;
          l && (i.objectStore($s.SIZES).delete(l.primaryKey), l.continue());
        }, await new Promise((l, d) => {
          i.oncomplete = () => l(), i.onerror = () => d(i.error), i.onabort = () => d(i.error);
        });
      } catch (i) {
        console.warn("[ThumbnailStore] Delete failed:", i);
      }
    }
    async clear() {
      if (IA.clear(), k_.clear(), A_.clear(), p1.clear(), OI.clear(), Sw.length = 0, G0.length = 0, S_.length = 0, await this.init(), !!this.db) try {
        const t = this.db.transaction([$s.THUMBNAILS, $s.PREVIEWS, $s.METADATA, $s.SIZES], "readwrite");
        t.objectStore($s.THUMBNAILS).clear(), t.objectStore($s.PREVIEWS).clear(), t.objectStore($s.METADATA).clear(), t.objectStore($s.SIZES).clear(), console.log("[ThumbnailStore] All data cleared (including sizes)");
      } catch (t) {
        console.warn("[ThumbnailStore] Clear failed:", t);
      }
    }
    async getStorageUsage() {
      if (await this.init(), !this.db) return {
        totalSize: 0,
        count: 0
      };
      const t = a => new Promise(i => {
        let o = 0,
          s = 0;
        try {
          const l = this.db.transaction(a, "readonly"),
            d = l.objectStore(a).openCursor();
          d.onsuccess = () => {
            const u = d.result;
            if (!u) return;
            const h = u.value;
            s += 1, a === $s.SIZES ? o += typeof h.size_bytes == "number" ? h.size_bytes : typeof h.data == "string" ? h.data.length * 2 : 0 : a === $s.METADATA ? o += JSON.stringify(h).length * 2 : o += typeof h.size == "number" ? h.size : typeof h.data == "string" ? h.data.length * 2 : 0, u.continue();
          }, d.onerror = () => i({
            totalSize: o,
            count: s
          }), l.oncomplete = () => i({
            totalSize: o,
            count: s
          }), l.onerror = () => i({
            totalSize: o,
            count: s
          }), l.onabort = () => i({
            totalSize: o,
            count: s
          });
        } catch {
          i({
            totalSize: o,
            count: s
          });
        }
      });
      let n = 0,
        r = 0;
      for (const a of [$s.THUMBNAILS, $s.PREVIEWS, $s.SIZES, $s.METADATA]) {
        const i = await t(a);
        n += i.totalSize, r += i.count;
      }
      return {
        totalSize: n,
        count: r
      };
    }
    getStats() {
      return {
        thumbnails: IA.size,
        previews: k_.size,
        metadata: p1.size,
        sizeVariants: OI.size
      };
    }
    async clearMemoryCache() {
      var t;
      if (console.log("[ThumbnailStore] Clearing memory cache"), this.workerQueue.length > 0) {
        for (const r of this.workerQueue) r.timeoutId && clearTimeout(r.timeoutId);
        const n = this.workerQueue.splice(0);
        (t = this.workerRef) == null || t.terminate(), this.workerRef = null, this.workerReady = !1, this.workerBusy = !1;
        for (const r of n) r.reject(new Error("Thumbnail work cancelled by memory cleanup"));
      }
      if (this.dualPending.size > 0) {
        for (const [, n] of this.dualPending) n.timeoutId && clearTimeout(n.timeoutId), n.reject(new Error("Thumbnail work cancelled by memory cleanup"));
        this.dualPending.clear();
      }
      IA.clear(), k_.clear(), A_.clear(), p1.clear(), Sw.length = 0, G0.length = 0, Xwe.clear(), jO = 0, this.clearSizeThumbnailCache();
    }
    async trimMemoryCache(t = .5) {
      const n = Math.min(1, Math.max(0, t));
      let r = 0;
      const a = (o, s, l) => {
        const d = Math.ceil(o.size * n);
        for (; o.size > d && s.length > 0;) {
          const u = s.shift();
          u && o.delete(u) && (ame(`${l}:${u}`), r += 1);
        }
      };
      for (a(IA, Sw, "thumb"), a(k_, G0, "preview"), a(OI, S_, "size"); jO > VEe() && Sw.length > 0;) {
        const o = Sw.shift();
        o && IA.delete(o) && (ame(`thumb:${o}`), r += 1);
      }
      for (; jO > VEe() && G0.length > 0;) {
        const o = G0.shift();
        o && k_.delete(o) && (A_.delete(o), ame(`preview:${o}`), r += 1);
      }
      A_.clear();
      const i = Math.ceil(p1.size * n);
      for (; p1.size > i;) {
        const o = p1.keys().next().value;
        if (!o) break;
        p1.delete(o), r += 1;
      }
      return r;
    }
    async preloadThumbnails(t) {
      if (await this.init(), !this.db) return;
      const n = t.filter(r => !IA.has(r));
      if (n.length !== 0) {
        console.log("[ThumbnailStore] Preloading", n.length, "thumbnails");
        try {
          const a = this.db.transaction([$s.THUMBNAILS], "readonly").objectStore($s.THUMBNAILS);
          await Promise.all(n.map(i => new Promise(o => {
            const s = a.get(i);
            s.onsuccess = () => {
              const l = s.result;
              l && this.updateThumbnailCache(i, l.data), o();
            }, s.onerror = () => o();
          })));
        } catch (r) {
          console.warn("[ThumbnailStore] Preload failed:", r);
        }
      }
    }
    clearSizeThumbnailCache() {
      OI.clear(), S_.length = 0;
    }
  };

On(RGe, "WORKER_ITEM_TIMEOUT_MS", 1e4);

let emt = RGe;

const Wd = new emt(),
  Y$ = Object.freeze(Object.defineProperty({
    __proto__: null,
    SCALE_THRESHOLD_PX: Wge,
    setThumbnailDecodedPressure: Zpt,
    thumbnailStore: Wd
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function Id() {
  const e = globalThis.scheduler;
  return e != null && e.yield ? e.yield() : new Promise(t => {
    requestAnimationFrame(() => t());
  });
}

async function UK() {
  await Id(), await new Promise(e => {
    requestAnimationFrame(() => e());
  });
}

const Net = "qiaodoumayi_content_store",
  c0 = "contents",
  IPr = 50 * 1024,
  CPr = 100 * 1024,
  OHe = a9(),
  EPr = OHe.rustCacheDualWriteThreshold,
  Xy = new Map(),
  tmt = OHe.contentCacheMaxBytes,
  TPr = OHe.contentCacheMaxItems;

let I_ = 0;

const Jy = [],
  jet = new Map(),
  MPr = OHe.largeContentCacheMax,
  Det = Math.min(192 * 1024 * 1024, Math.max(32 * 1024 * 1024, tmt * 2)),
  Zy = new Map(),
  V0 = [];

let o4 = 0;

class PPr {
  constructor() {
    On(this, "db", null);
    On(this, "initPromise", null);
    On(this, "initFailed", !1);
  }
  async init() {
    if (this.initFailed) {
      console.warn("[ContentStore] IndexedDB init previously failed, running in degraded mode");
      return;
    }
    if (this.db) {
      if (this.db.objectStoreNames.contains(c0)) return;
      console.warn("[ContentStore] Object store not found, reinitializing..."), this.db.close(), this.db = null, this.initPromise = null;
    }
    if (this.initPromise) return this.initPromise;
    const t = new Promise((r, a) => {
        setTimeout(() => {
          a(new Error("IndexedDB initialization timeout (5s)"));
        }, 5e3);
      }),
      n = new Promise((r, a) => {
        try {
          if (typeof indexedDB > "u") {
            console.warn("[ContentStore] IndexedDB not available"), r();
            return;
          }
          const i = indexedDB.open(Net);
          i.onsuccess = () => {
            const o = i.result,
              s = !o.objectStoreNames.contains(c0),
              l = o.version;
            if (o.close(), s) {
              console.log("[ContentStore] Object store missing, upgrading database...");
              const d = indexedDB.open(Net, l + 1);
              d.onerror = () => {
                console.error("[ContentStore] Failed to upgrade IndexedDB:", d.error), a(d.error);
              }, d.onsuccess = () => {
                this.db = d.result, console.log("[ContentStore] IndexedDB upgraded and initialized"), r();
              }, d.onupgradeneeded = u => {
                const h = u.target.result;
                if (!h.objectStoreNames.contains(c0)) {
                  const p = h.createObjectStore(c0, {
                    keyPath: "id"
                  });
                  p.createIndex("type", "type", {
                    unique: !1
                  }), p.createIndex("createdAt", "createdAt", {
                    unique: !1
                  }), console.log("[ContentStore] Object store created during upgrade");
                }
              };
            } else {
              const d = indexedDB.open(Net, l);
              d.onerror = () => {
                console.error("[ContentStore] Failed to open IndexedDB:", d.error), a(d.error);
              }, d.onsuccess = () => {
                this.db = d.result, console.log("[ContentStore] IndexedDB initialized"), r();
              };
            }
          }, i.onerror = () => {
            console.error("[ContentStore] Failed to check IndexedDB:", i.error), a(i.error);
          }, i.onupgradeneeded = o => {
            const s = o.target.result;
            if (!s.objectStoreNames.contains(c0)) {
              const l = s.createObjectStore(c0, {
                keyPath: "id"
              });
              l.createIndex("type", "type", {
                unique: !1
              }), l.createIndex("createdAt", "createdAt", {
                unique: !1
              }), console.log("[ContentStore] Object store created (new database)");
            }
          };
        } catch (i) {
          console.error("[ContentStore] Error during IndexedDB init:", i), a(i);
        }
      });
    return this.initPromise = Promise.race([n, t]).catch(r => {
      console.error("[ContentStore] IndexedDB init failed:", r), this.initFailed = !0;
    }), this.initPromise;
  }
  generateId() {
    return `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  detectType(t) {
    return t.startsWith("data:image") ? "image" : t.startsWith("data:video") ? "video" : t.startsWith("data:audio") ? "audio" : t.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i) ? "image" : t.match(/\.(mp4|webm|ogg|mov)$/i) ? "video" : t.match(/\.(mp3|wav|ogg|m4a|aac)$/i) ? "audio" : "unknown";
  }
  estimateSize(t) {
    return t.length * 2;
  }
  shouldStore(t) {
    return !t || !t.startsWith("data:") ? !1 : this.estimateSize(t) > IPr;
  }
  isContentRef(t) {
    return typeof t == "string" && t.startsWith("content_ref:");
  }
  extractId(t) {
    return t.replace("content_ref:", "");
  }
  createRef(t) {
    return `content_ref:${t}`;
  }
  updateMemoryCache(t, n) {
    const r = this.estimateSize(n);
    if (r > tmt / 2) {
      this.addToLargeCache(t, n);
      return;
    }
    for (; (I_ + r > tmt || Xy.size >= TPr) && Jy.length > 0;) {
      const i = Jy.shift();
      if (i && Xy.has(i)) {
        const o = Xy.get(i);
        o && (I_ -= this.estimateSize(o)), Xy.delete(i);
      }
    }
    const a = Jy.indexOf(t);
    a > -1 && Jy.splice(a, 1), Jy.push(t), Xy.has(t) || (Xy.set(t, n), I_ += r);
  }
  addToLargeCache(t, n) {
    const r = this.estimateSize(n),
      a = Zy.get(t);
    if (r > Det) {
      a !== void 0 && (o4 -= this.estimateSize(a), Zy.delete(t));
      const i = V0.indexOf(t);
      i > -1 && V0.splice(i, 1);
      return;
    }
    if (a !== void 0) {
      o4 -= this.estimateSize(a), Zy.delete(t);
      const i = V0.indexOf(t);
      i > -1 && V0.splice(i, 1);
    }
    for (; (V0.length >= MPr || o4 + r > Det) && V0.length > 0;) {
      const i = V0.shift();
      if (!i) continue;
      const o = Zy.get(i);
      o !== void 0 && (o4 -= this.estimateSize(o), Zy.delete(i));
    }
    Zy.set(t, n), V0.push(t), o4 += r;
  }
  async store(t) {
    await this.init();
    const n = this.generateId(),
      r = this.estimateSize(t),
      a = this.detectType(t);
    if (a === "image" && r > CPr && Wd.storeWithThumbnails(n, t).catch(o => {
      console.warn("[ContentStore] Failed to generate thumbnails:", o);
    }), !this.db || !this.db.objectStoreNames.contains(c0)) return console.warn("[ContentStore] IndexedDB not available, using memory cache only"), this.updateMemoryCache(n, t), n;
    const i = {
      id: n,
      content: t,
      type: a,
      size: r,
      createdAt: Date.now()
    };
    return console.log("[ContentStore] Storing content:", n, "size:", t.length, "type:", i.type), new Promise((o, s) => {
      try {
        const u = this.db.transaction([c0], "readwrite").objectStore(c0).put(i);
        u.onsuccess = () => {
          console.log("[ContentStore] Content stored successfully:", n), this.updateMemoryCache(n, t), r > EPr && Fr("rust_cache_set", {
            id: n,
            value: t
          }).catch(h => {
            console.warn("[ContentStore] Rust cache set failed:", h);
          }), o(n);
        }, u.onerror = () => {
          console.error("[ContentStore] Failed to store content:", u.error), this.updateMemoryCache(n, t), o(n);
        };
      } catch (l) {
        console.warn("[ContentStore] Store failed, using memory cache:", l), this.updateMemoryCache(n, t), o(n);
      }
    });
  }
  async fetchImageBlobForStore(t) {
    if (t.startsWith("data:")) return (await fetch(t)).blob();
    if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window) && (t.startsWith("http://") || t.startsWith("https://")) && (() => {
      try {
        const a = new URL(t).hostname.toLowerCase();
        return a.includes("art.huya.info") || a.includes("copilot.huya.info") || a.includes("aliyuncs.com");
      } catch {
        return /art\.huya\.info|copilot\.huya\.info|aliyuncs\.com/i.test(t);
      }
    })()) try {
      const {
        downloadWithFallback: a
      } = await Ie(async () => {
        const {
          downloadWithFallback: i
        } = await Promise.resolve().then(() => El);
        return {
          downloadWithFallback: i
        };
      }, void 0, import.meta.url);
      return await a(t, 12e4);
    } catch {}
    if (t.startsWith("blob:") || t.startsWith("http://") || t.startsWith("https://")) {
      const a = await fetch(t);
      if (!a.ok) throw new Error(`HTTP ${a.status}`);
      return a.blob();
    }
    throw new Error("不支持的图片 URL");
  }
  async storeImageUrlAsRef(t) {
    if (this.isContentRef(t)) return t;
    let n = t;
    if (t.startsWith("blob:") || t.startsWith("http://") || t.startsWith("https://")) {
      const a = await this.fetchImageBlobForStore(t);
      if (await Id(), n = await new Promise((i, o) => {
        const s = new FileReader();
        s.onload = () => i(s.result), s.onerror = o, s.readAsDataURL(a);
      }), t.startsWith("blob:")) try {
        URL.revokeObjectURL(t);
      } catch {}
    }
    if (!n.startsWith("data:")) return t;
    const r = await this.store(n);
    return this.createRef(r);
  }
  async getForZoom(t, n) {
    if (n !== void 0 && n < .8) {
      const r = await Wd.getImageForZoom(t, n);
      if (r) return r;
    }
    return this.get(t);
  }
  getFromCacheSync(t) {
    if (Xy.has(t)) {
      const n = Jy.indexOf(t);
      return n > -1 && Jy.splice(n, 1), Jy.push(t), Xy.get(t) || null;
    }
    if (Zy.has(t)) {
      const n = V0.indexOf(t);
      return n > -1 && V0.splice(n, 1), V0.push(t), Zy.get(t) || null;
    }
    return null;
  }
  async get(t) {
    if (Xy.has(t)) {
      const a = Jy.indexOf(t);
      return a > -1 && Jy.splice(a, 1), Jy.push(t), Xy.get(t) || null;
    }
    if (Zy.has(t)) {
      const a = V0.indexOf(t);
      return a > -1 && V0.splice(a, 1), V0.push(t), Zy.get(t) || null;
    }
    const n = jet.get(t);
    if (n) return n;
    const r = this.getInternal(t);
    return jet.set(t, r), r.finally(() => {
      jet.delete(t);
    }), r;
  }
  async getInternal(t) {
    try {
      const n = await Fr("rust_cache_get", {
        id: t
      });
      if (n != null && n.length > 0) return this.updateMemoryCache(t, n), n;
    } catch {}
    if (Xy.has(t)) {
      const n = Jy.indexOf(t);
      return n > -1 && Jy.splice(n, 1), Jy.push(t), Xy.get(t) || null;
    }
    return await this.init(), !this.db || !this.db.objectStoreNames.contains(c0) ? null : new Promise(n => {
      try {
        const i = this.db.transaction([c0], "readonly").objectStore(c0).get(t);
        i.onsuccess = () => {
          const o = i.result;
          o ? (this.updateMemoryCache(t, o.content), n(o.content)) : n(null);
        }, i.onerror = () => n(null);
      } catch {
        n(null);
      }
    });
  }
  async delete(t) {
    try {
      await Fr("rust_cache_remove", {
        id: t
      });
    } catch {}
    if (Xy.has(t)) {
      const a = Xy.get(t);
      a && (I_ -= this.estimateSize(a)), Xy.delete(t);
      const i = Jy.indexOf(t);
      i > -1 && Jy.splice(i, 1);
    }
    const n = Zy.get(t);
    n !== void 0 && (o4 -= this.estimateSize(n), Zy.delete(t));
    const r = V0.indexOf(t);
    if (r > -1 && V0.splice(r, 1), await this.init(), !(!this.db || !this.db.objectStoreNames.contains(c0))) return new Promise(a => {
      try {
        const i = this.db.transaction([c0], "readwrite");
        i.objectStore(c0).delete(t), i.oncomplete = () => a(), i.onerror = () => {
          console.warn("[ContentStore] Delete failed:", i.error), a();
        }, i.onabort = () => {
          console.warn("[ContentStore] Delete aborted:", i.error), a();
        };
      } catch (i) {
        console.warn("[ContentStore] Delete failed:", i), a();
      }
    });
  }
  async clear() {
    Xy.clear(), Jy.length = 0, I_ = 0, Zy.clear(), V0.length = 0, o4 = 0;
    try {
      const {
        clearRustCache: t
      } = await Ie(async () => {
        const {
          clearRustCache: n
        } = await Promise.resolve().then(() => Sbt);
        return {
          clearRustCache: n
        };
      }, void 0, import.meta.url);
      await t();
    } catch {}
    if (await this.init(), !!this.db) {
      if (!this.db.objectStoreNames.contains(c0)) {
        console.warn("[ContentStore] Object store not found, skipping clear");
        return;
      }
      return new Promise((t, n) => {
        try {
          const i = this.db.transaction([c0], "readwrite").objectStore(c0).clear();
          i.onsuccess = () => {
            console.log("[ContentStore] All contents cleared"), t();
          }, i.onerror = () => n(i.error);
        } catch (r) {
          console.warn("[ContentStore] Failed to clear, object store may not exist:", r), t();
        }
      });
    }
  }
  async getStats() {
    return await this.init(), !this.db || !this.db.objectStoreNames.contains(c0) ? {
      count: 0,
      totalSize: 0,
      memoryCacheSize: I_
    } : new Promise(t => {
      try {
        const n = this.db.transaction([c0], "readonly"),
          r = n.objectStore(c0),
          a = r.count();
        let i = 0;
        const o = r.openCursor();
        o.onsuccess = s => {
          const l = s.target.result;
          l && (i += l.value.size, l.continue());
        }, a.onsuccess = () => {
          n.oncomplete = () => {
            t({
              count: a.result,
              totalSize: i,
              memoryCacheSize: I_
            });
          };
        }, a.onerror = () => {
          console.warn("[ContentStore] getStats count error"), t({
            count: 0,
            totalSize: 0,
            memoryCacheSize: I_
          });
        };
      } catch (n) {
        console.warn("[ContentStore] getStats failed:", n), t({
          count: 0,
          totalSize: 0,
          memoryCacheSize: I_
        });
      }
    });
  }
  getMemoryCacheDetails() {
    return {
      hotCount: Xy.size,
      hotBytes: I_,
      largeCount: Zy.size,
      largeBytesEstimate: o4,
      largeByteBudget: Det
    };
  }
  clearMemoryCache() {
    Xy.clear(), Jy.length = 0, I_ = 0, Zy.clear(), V0.length = 0, o4 = 0, Ie(async () => {
      const {
        clearRustCache: t
      } = await Promise.resolve().then(() => Sbt);
      return {
        clearRustCache: t
      };
    }, void 0, import.meta.url).then(({
      clearRustCache: t
    }) => t()).catch(() => {}), console.log("[ContentStore] Memory cache cleared");
  }
  trimMemoryCache(t = .5) {
    const n = Math.min(1, Math.max(0, t));
    let r = 0;
    ((o, s) => {
      const l = Math.ceil(o.size * n);
      for (; o.size > l && s.length > 0;) {
        const d = s.shift();
        if (!d || !o.has(d)) continue;
        const u = o.get(d);
        u && (I_ -= this.estimateSize(u)), o.delete(d), r += 1;
      }
    })(Xy, Jy), I_ = Math.max(0, I_);
    const i = Math.ceil(Zy.size * n);
    for (; Zy.size > i && V0.length > 0;) {
      const o = V0.shift();
      if (!o) continue;
      const s = Zy.get(o);
      s !== void 0 && (o4 -= this.estimateSize(s), Zy.delete(o), r += 1);
    }
    return o4 = Math.max(0, o4), r;
  }
}

const Er = new PPr(),
  Ly = Object.freeze(Object.defineProperty({
    __proto__: null,
    contentStore: Er,
    default: Er
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function RPr(e) {
  const t = String(e || "").trim().toLowerCase();
  return t ? t.startsWith("data:") || t.startsWith("blob:") : !1;
}

function BHe(e, t) {
  let n = null;
  return function (...a) {
    const i = () => {
      n = null, e(...a);
    };
    n && clearTimeout(n), n = setTimeout(i, t);
  };
}

function MCn(e, t) {
  let n = !1;
  return function (...a) {
    n || (e(...a), n = !0, setTimeout(() => n = !1, t));
  };
}

let Let = 0;

function Fi() {
  const e = performance.now(),
    t = Let++;
  return Let > Number.MAX_SAFE_INTEGER - 1e3 && (Let = 0), `${Math.floor(e)}-${t}-${Math.random().toString(36).substr(2, 9)}`;
}

function PCn(e) {
  if (e.length < 2) return e;
  const t = new Set(),
    n = [];
  for (const r of e) {
    const a = String(r.id);
    t.has(a) || (t.add(a), n.push(r));
  }
  return n.length === e.length ? e : n;
}

function NPr(e) {
  return JSON.parse(JSON.stringify(e));
}

function jPr(e = new Date()) {
  return e.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function DPr(e = new Date()) {
  return e.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function LPr(e) {
  if (e === 0) return "0 B";
  const t = 1024,
    n = ["B", "KB", "MB", "GB", "TB"],
    r = Math.floor(Math.log(e) / Math.log(t));
  return parseFloat((e / Math.pow(t, r)).toFixed(2)) + " " + n[r];
}

function FHe(e, t = "未命名项目") {
  var i;
  const n = (e || "").trim();
  if (!n) return t;
  const r = n.split(/[/\\]/);
  return ((i = r[r.length - 1]) == null ? void 0 : i.trim()) || n || t;
}

function OPr(e) {
  if (!e) return null;
  try {
    const n = e.split("?")[0].split("/");
    return n[n.length - 1].replace(/\.[^.]+$/, "") || null;
  } catch {
    return null;
  }
}

function BPr(e, t) {
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}

function FPr(e) {
  return new Promise(t => setTimeout(t, e));
}

function zPr(e, t, n) {
  return Math.min(Math.max(e, t), n);
}

function UPr(e, t, n) {
  return e + (t - e) * n;
}

function DO(e = new Date()) {
  const t = -e.getTimezoneOffset(),
    n = Math.floor(Math.abs(t) / 60),
    r = Math.abs(t) % 60,
    a = t >= 0 ? "+" : "-",
    i = m => String(m).padStart(2, "0"),
    o = e.getFullYear(),
    s = i(e.getMonth() + 1),
    l = i(e.getDate()),
    d = i(e.getHours()),
    u = i(e.getMinutes()),
    h = i(e.getSeconds()),
    p = String(e.getMilliseconds()).padStart(3, "0");
  return `${o}-${s}-${l}T${d}:${u}:${h}.${p}${a}${i(n)}:${i(r)}`;
}

function RCt(e = "compact", t = new Date()) {
  const n = d => String(d).padStart(2, "0"),
    r = t.getFullYear(),
    a = n(t.getMonth() + 1),
    i = n(t.getDate()),
    o = n(t.getHours()),
    s = n(t.getMinutes()),
    l = n(t.getSeconds());
  return e === "standard" ? `${r}-${a}-${i}_${o}-${s}-${l}` : `${r}${a}${i}_${o}${s}${l}`;
}

function RCn(e = new Date()) {
  const t = i => String(i).padStart(2, "0"),
    n = e.getFullYear(),
    r = t(e.getMonth() + 1),
    a = t(e.getDate());
  return `${n}-${r}-${a}`;
}

function SG(e) {
  const t = e.toLowerCase();
  return (t.includes("prod-ss-vidu") || t.includes("s3") && t.includes("amazonaws")) && (t.includes(".mp4") || t.includes("/video"));
}

const $Pr = ["vlabvod.com", "dreamina.jimeng.com", "dreamnia.jimeng.com", "byteimg.com", "v3-dreamnia.jimeng.com", "v9-dreamnia.jimeng.com"];

function NCn(e) {
  if (!e || typeof e != "string") return !1;
  try {
    const t = new URL(e).hostname.toLowerCase();
    return $Pr.some(n => t === n || t.endsWith("." + n));
  } catch {
    return !1;
  }
}

function _c(e, t) {
  return !e || typeof e != "string" ? "" : e;
}

async function GPr(e, t) {
  const n = String(e || "").trim();
  if (!n) throw new Error("生图结果 URL 为空");
  const {
      buildLocalGenImageAssetId: r,
      buildLocalGenImageCacheFileName: a
    } = await Ie(async () => {
      const {
        buildLocalGenImageAssetId: s,
        buildLocalGenImageCacheFileName: l
      } = await Promise.resolve().then(() => rYe);
      return {
        buildLocalGenImageAssetId: s,
        buildLocalGenImageCacheFileName: l
      };
    }, void 0, import.meta.url),
    i = r(t.taskId, t.model);
  await Xu(n, i, a(t.taskId, t.model));
  let o = n;
  if (RPr(n)) try {
    await vb(), await Id(), await Er.init();
    const s = await Er.storeImageUrlAsRef(n);
    s && Er.isContentRef(s) && (o = s);
  } catch (s) {
    console.warn("[persistGenImageResultForDownstream] 写入 content_ref 失败，回退远程 URL:", s);
  }
  return {
    displayUrl: o,
    assetId: i,
    fullUrl: n
  };
}

async function Jwe(e, t) {
  const n = String(e || "").trim();
  if (!n) throw new Error("生视频结果 URL 为空");
  const r = String(t.taskId || "").trim();
  if (!r) throw new Error("生视频任务 ID 为空");
  await Id();
  const {
    buildLocalGenVideoCacheFileName: a
  } = await Ie(async () => {
    const {
      buildLocalGenVideoCacheFileName: o
    } = await Promise.resolve().then(() => rYe);
    return {
      buildLocalGenVideoCacheFileName: o
    };
  }, void 0, import.meta.url);
  return await Xu(n, r, a(r, t.model)), {
    displayUrl: /^https?:\/\//i.test(n) ? n : "",
    assetId: r,
    fullUrl: n
  };
}

const VPr = 2,
  Pbe = [],
  Zwe = new Map();

let HEe = 0,
  IF = null;

function NCt() {
  IF && (clearTimeout(IF), IF = null);
  const e = Yi() ? 1 : VPr;
  if (!(HEe >= e || Pbe.length === 0)) for (; HEe < e && Pbe.length > 0;) {
    const t = Pbe.shift();
    HEe++, t.run().then(t.resolve, t.reject).finally(() => {
      HEe--, Zwe.delete(t.key), IF = setTimeout(NCt, 24);
    });
  }
}

async function Y9e(e, t, n, r) {
  var a;
  if (e) try {
    const {
      isTauriAssetProtocolUrl: i,
      isRemoteHttpUrl: o
    } = await Ie(async () => {
      const {
        isTauriAssetProtocolUrl: y,
        isRemoteHttpUrl: b
      } = await Promise.resolve().then(() => So);
      return {
        isTauriAssetProtocolUrl: y,
        isRemoteHttpUrl: b
      };
    }, void 0, import.meta.url);
    if (i(e)) return;
    const {
        isSpeechAudioAssetId: s,
        SPEECH_AUDIO_CACHE_SUBDIR: l,
        speechHistoryTaskIdFromAssetId: d
      } = await Ie(async () => {
        const {
          isSpeechAudioAssetId: y,
          SPEECH_AUDIO_CACHE_SUBDIR: b,
          speechHistoryTaskIdFromAssetId: v
        } = await Promise.resolve().then(() => F3n);
        return {
          isSpeechAudioAssetId: y,
          SPEECH_AUDIO_CACHE_SUBDIR: b,
          speechHistoryTaskIdFromAssetId: v
        };
      }, void 0, import.meta.url),
      u = r ?? (s(t) ? l : void 0);
    if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)) try {
      const {
        isCanvasLocalCacheMode: y
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: b
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: b
        };
      }, void 0, import.meta.url);
      if (y()) {
        const {
          localCacheManager: b,
          ensureCacheRootReadyForWrite: v
        } = await Ie(async () => {
          const {
            localCacheManager: w,
            ensureCacheRootReadyForWrite: k
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: w,
            ensureCacheRootReadyForWrite: k
          };
        }, void 0, import.meta.url);
        await v();
        const _ = (a = b.getDirectoryPathTauri()) == null ? void 0 : a.trim();
        if (!_ || !b.isAvailable()) throw new Error("本地缓存目录不可用，无法落盘。请在设置中重新选择缓存目录后重试。");
        {
          const {
            invoke: w
          } = await Ie(async () => {
            const {
              invoke: A
            } = await Promise.resolve().then(() => sd);
            return {
              invoke: A
            };
          }, void 0, import.meta.url);
          let k = null;
          if (o(e)) k = await w("download_url_to_local_asset", {
            args: {
              url: e,
              assetId: t,
              cacheRoot: _,
              subdir: u,
              fileNameHint: n
            }
          });else if (e.startsWith("data:")) k = await w("write_data_url_to_local_asset", {
            args: {
              dataUrl: e,
              assetId: t,
              cacheRoot: _,
              subdir: u,
              fileNameHint: n
            }
          });else {
            const A = n && /\.(mp4|webm|mov|m4v)$/i.test(n) || /\.mp4(\?|#|$)/i.test(e) || e.includes("/video") || SG(e);
            if (n && /\.(png|jpe?g|webp|gif|bmp|tiff?)$/i.test(n) || /\.(png|jpe?g|webp|gif|bmp|tiff?)(\?|#|$)/i.test(e) || /\/(?:images|thumbnails)\//i.test(e) || A) throw new Error(`本地缓存模式无法落盘该 URL 类型: ${e.slice(0, 96)}`);
          }
          if (k) {
            if (await b.registerExistingAsset({
              assetId: k.assetId || t,
              relativePath: k.relativePath,
              mimeType: k.mimeType,
              size: k.size,
              remoteUrl: k.remoteUrl || (o(e) ? e : void 0),
              absolutePath: k.absolutePath
            }), await b.flushManifest().catch(() => {}), (String(k.mimeType || "").startsWith("image/") || !String(k.mimeType || "").startsWith("video/") && !String(k.mimeType || "").startsWith("audio/") && /\.(png|jpe?g|webp|gif|bmp|tiff?)$/i.test(k.fileName || k.relativePath || "")) && k.relativePath) try {
              const {
                ensureLocalPreviewAfterRustDownload: I
              } = await Ie(async () => {
                const {
                  ensureLocalPreviewAfterRustDownload: E
                } = await Promise.resolve().then(() => Ui);
                return {
                  ensureLocalPreviewAfterRustDownload: E
                };
              }, void 0, import.meta.url);
              await I(k.assetId || t, k.relativePath);
            } catch {}
            if (k.mimeType && k.mimeType.startsWith("video/") || n && /\.(mp4|webm|mov|m4v)$/i.test(n) || e.includes(".mp4") || e.includes("/video") || SG(e)) {
              try {
                const {
                  isCanvasLocalCacheMode: E
                } = await Ie(async () => {
                  const {
                    isCanvasLocalCacheMode: M
                  } = await Promise.resolve().then(() => So);
                  return {
                    isCanvasLocalCacheMode: M
                  };
                }, void 0, import.meta.url);
                E() && Ie(async () => {
                  const {
                    ensureHistoryVideoPreviewThumbnailForAssetId: M
                  } = await Promise.resolve().then(() => qh);
                  return {
                    ensureHistoryVideoPreviewThumbnailForAssetId: M
                  };
                }, void 0, import.meta.url).then(({
                  ensureHistoryVideoPreviewThumbnailForAssetId: M
                }) => M(k.assetId || t)).catch(() => {});
              } catch {}
              const I = t.includes("_vidu_") ? t.split("_vidu_")[0] : t.replace(/_video$/i, "");
              Ie(async () => {
                const {
                  isGlobalOssUploadEnabled: E
                } = await Promise.resolve().then(() => Ah);
                return {
                  isGlobalOssUploadEnabled: E
                };
              }, void 0, import.meta.url).then(({
                isGlobalOssUploadEnabled: E
              }) => {
                if (E()) return Ie(async () => {
                  const {
                    scheduleHistoryOssAutoUpload: M,
                    ensureHistoryVideoPreviewThumbnailForAssetId: T
                  } = await Promise.resolve().then(() => qh);
                  return {
                    scheduleHistoryOssAutoUpload: M,
                    ensureHistoryVideoPreviewThumbnailForAssetId: T
                  };
                }, void 0, import.meta.url).then(({
                  scheduleHistoryOssAutoUpload: M,
                  ensureHistoryVideoPreviewThumbnailForAssetId: T
                }) => {
                  T(t).catch(() => {}), M(I, [t]);
                });
              }).catch(() => {});
            }
            if ((k.mimeType && k.mimeType.startsWith("audio/") || n && /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(n)) && s(t)) {
              const I = d(t);
              I && Ie(async () => {
                const {
                  isGlobalOssUploadEnabled: E
                } = await Promise.resolve().then(() => Ah);
                return {
                  isGlobalOssUploadEnabled: E
                };
              }, void 0, import.meta.url).then(({
                isGlobalOssUploadEnabled: E
              }) => {
                if (E()) return Ie(async () => {
                  const {
                    scheduleHistoryOssAutoUpload: M
                  } = await Promise.resolve().then(() => qh);
                  return {
                    scheduleHistoryOssAutoUpload: M
                  };
                }, void 0, import.meta.url).then(({
                  scheduleHistoryOssAutoUpload: M
                }) => {
                  M(I, [t]);
                });
              }).catch(() => {});
            }
            return;
          }
          if (o(e) || e.startsWith("data:")) throw new Error(`本地缓存 Rust 直写未返回元数据: ${t}`);
        }
      }
    } catch (y) {
      const b = n && /\.(mp4|webm|mov|m4v)$/i.test(n) || /\.mp4(\?|#|$)/i.test(e) || e.includes("/video") || SG(e),
        v = n && /\.(png|jpe?g|webp|gif|bmp|tiff?)$/i.test(n) || /\.(png|jpe?g|webp|gif|bmp|tiff?)(\?|#|$)/i.test(e) || /\/(?:images|thumbnails)\//i.test(e) || e.startsWith("data:image") || /^https?:\/\//i.test(e),
        _ = y instanceof Error ? y.message : String(y || "");
      let w = !1;
      try {
        const {
          isCanvasLocalCacheMode: k
        } = await Ie(async () => {
          const {
            isCanvasLocalCacheMode: A
          } = await Promise.resolve().then(() => So);
          return {
            isCanvasLocalCacheMode: A
          };
        }, void 0, import.meta.url);
        w = k() && (b || v || _.includes("本地缓存目录不可用") || _.includes("Rust 直写"));
      } catch {}
      if (w) throw console.error(`[downloadUrlToLocal] 本地缓存${b ? "视频" : "图片"} Rust 直写失败，禁止回退 Bypass CORS Blob（避免 JS 堆暴涨）:`, t, y), y instanceof Error ? y : new Error(String(y));
      console.warn("[downloadUrlToLocal] Rust 直写磁盘失败，回退 Blob 链路:", t, y);
    }
    {
      const y = n && /\.(mp4|webm|mov|m4v)$/i.test(n) || /\.mp4(\?|#|$)/i.test(e) || e.includes("/video") || SG(e),
        b = n && /\.(png|jpe?g|webp|gif|bmp|tiff?)$/i.test(n) || /\.(png|jpe?g|webp|gif|bmp|tiff?)(\?|#|$)/i.test(e) || /\/(?:images|thumbnails)\//i.test(e);
      if (y || b) {
        const {
          isCanvasLocalCacheMode: v
        } = await Ie(async () => {
          const {
            isCanvasLocalCacheMode: _
          } = await Promise.resolve().then(() => So);
          return {
            isCanvasLocalCacheMode: _
          };
        }, void 0, import.meta.url);
        if (v()) throw new Error(`[downloadUrlToLocal] 本地缓存${y ? "视频" : "图片"}未走 Rust 直写成功，已中止 Blob 回退: ${t}`);
      }
    }
    let p;
    if (e.startsWith("data:")) p = await (await fetch(e)).blob();else if (e.startsWith("http://") || e.startsWith("https://")) {
      if (typeof window < "u" && "__TAURI__" in window) try {
        const {
          downloadWithFallback: b
        } = await Ie(async () => {
          const {
            downloadWithFallback: v
          } = await Promise.resolve().then(() => El);
          return {
            downloadWithFallback: v
          };
        }, void 0, import.meta.url);
        if (p = await b(e, 12e4), !p.type && (e.includes(".mp4") || e.includes("/video") || SG(e))) p = new Blob([await p.arrayBuffer()], {
          type: "video/mp4"
        });else if (!p.type && (e.includes(".png") || e.includes(".jpg") || e.includes(".jpeg") || e.includes(".webp") || e.includes(".gif"))) {
          const v = e.includes(".png") ? "image/png" : e.includes(".webp") ? "image/webp" : e.includes(".gif") ? "image/gif" : "image/jpeg";
          p = new Blob([await p.arrayBuffer()], {
            type: v
          });
        }
      } catch (b) {
        const {
          isCanvasLocalCacheMode: v
        } = await Ie(async () => {
          const {
            isCanvasLocalCacheMode: w
          } = await Promise.resolve().then(() => So);
          return {
            isCanvasLocalCacheMode: w
          };
        }, void 0, import.meta.url);
        if (v() && /aliyuncs\.com/i.test(e)) throw new Error(`[downloadUrlToLocal] 本地缓存模式下载阿里云/海艺外链失败: ${t} — ${b instanceof Error ? b.message : String(b)}`);
        const _ = await fetch(e);
        if (!_.ok) throw new Error(`HTTP ${_.status}`);
        p = await _.blob();
      } else {
        const b = await fetch(e);
        if (!b.ok) throw new Error(`HTTP ${b.status}`);
        p = await b.blob();
      }
    } else if (e.startsWith("blob:")) p = await (await fetch(e)).blob();else return;
    if (await ni.saveBlobAsset(t, p, e, u), p.type && p.type.startsWith("video/") || n && /\.(mp4|webm|mov|m4v)$/i.test(n) || e.includes(".mp4") || e.includes("/video") || SG(e)) {
      const y = t.includes("_vidu_") ? t.split("_vidu_")[0] : t.replace(/_video$/i, "");
      Ie(async () => {
        const {
          isGlobalOssUploadEnabled: b
        } = await Promise.resolve().then(() => Ah);
        return {
          isGlobalOssUploadEnabled: b
        };
      }, void 0, import.meta.url).then(({
        isGlobalOssUploadEnabled: b
      }) => {
        if (b()) return Ie(async () => {
          const {
            scheduleHistoryOssAutoUpload: v,
            ensureHistoryVideoPreviewThumbnailForAssetId: _
          } = await Promise.resolve().then(() => qh);
          return {
            scheduleHistoryOssAutoUpload: v,
            ensureHistoryVideoPreviewThumbnailForAssetId: _
          };
        }, void 0, import.meta.url).then(({
          scheduleHistoryOssAutoUpload: v,
          ensureHistoryVideoPreviewThumbnailForAssetId: _
        }) => {
          _(t).catch(() => {}), v(y, [t]);
        });
      }).catch(() => {});
    }
    if ((p.type && p.type.startsWith("audio/") || n && /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(n)) && s(t)) {
      const y = d(t);
      y && Ie(async () => {
        const {
          isGlobalOssUploadEnabled: b
        } = await Promise.resolve().then(() => Ah);
        return {
          isGlobalOssUploadEnabled: b
        };
      }, void 0, import.meta.url).then(({
        isGlobalOssUploadEnabled: b
      }) => {
        if (b()) return Ie(async () => {
          const {
            scheduleHistoryOssAutoUpload: v
          } = await Promise.resolve().then(() => qh);
          return {
            scheduleHistoryOssAutoUpload: v
          };
        }, void 0, import.meta.url).then(({
          scheduleHistoryOssAutoUpload: v
        }) => {
          v(y, [t]);
        });
      }).catch(() => {});
    }
  } catch (i) {
    console.error("[downloadUrlToLocal] ❌ 处理失败:", i);
    const o = i instanceof Error ? i.message : String(i || "");
    let s = !1;
    try {
      const {
        isCanvasLocalCacheMode: l
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: d
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: d
        };
      }, void 0, import.meta.url);
      s = l();
    } catch {}
    if (s) {
      const l = n && /\.(mp4|webm|mov|m4v)$/i.test(n) || /\.mp4(\?|#|$)/i.test(e) || e.includes("/video") || SG(e),
        d = n && /\.(png|jpe?g|webp|gif|bmp|tiff?)$/i.test(n) || /\.(png|jpe?g|webp|gif|bmp|tiff?)(\?|#|$)/i.test(e) || /\/(?:images|thumbnails)\//i.test(e) || e.startsWith("data:image") || /^https?:\/\//i.test(e);
      if (l || d || o.includes("本地缓存") || o.includes("Rust 直写")) throw i instanceof Error ? i : new Error(o || "本地缓存落盘失败");
    }
    if (o.includes("本地缓存模式下载阿里云") || o.includes("本地缓存") && /aliyuncs\.com/i.test(e)) throw i instanceof Error ? i : new Error(o);
  }
}

function zHe(e) {
  return e.length < 12 ? null : e[0] === 255 && e[1] === 216 && e[2] === 255 ? "image/jpeg" : e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 ? "image/png" : e[0] === 71 && e[1] === 73 && e[2] === 70 ? "image/gif" : e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80 ? "image/webp" : null;
}

function jCn(e) {
  const t = e.split(";")[0].trim().toLowerCase();
  if (t === "image/jpeg" || t === "image/jpg" || t === "image/pjpeg") return "jpg";
  if (t === "image/png") return "png";
  if (t === "image/webp") return "webp";
  if (t === "image/gif") return "gif";
  if (t.startsWith("image/")) {
    const n = t.slice(6).split("+")[0];
    return n === "jpeg" ? "jpg" : n.replace(/[^a-z0-9]/g, "") || "png";
  }
  return "png";
}

const nmt = 1024,
  rmt = .75,
  wm = 512,
  $k = .72,
  YE = new Map(),
  Tj = new Map(),
  Uue = new Map(),
  HPr = 1e3,
  LO = [];

function WPr(e) {
  if (YE.delete(e), Tj.delete(e), Uue.delete(e), e.startsWith("blob:") && !R$(e) && !Cle(e)) try {
    URL.revokeObjectURL(e);
  } catch {}
}

function DCn(e) {
  const t = LO.indexOf(e);
  for (t > -1 && LO.splice(t, 1), LO.push(e); LO.length > HPr;) {
    const n = LO.shift();
    n && WPr(n);
  }
}

function UHe(e) {
  const t = String(e || "").trim();
  if (!t) return;
  YE.delete(t), Tj.delete(t), Uue.delete(t);
  const n = LO.indexOf(t);
  n > -1 && LO.splice(n, 1);
}

function x0(e) {
  const t = String(e || "").trim();
  if (t.startsWith("blob:") && !R$(t) && !YE.has(t) && !Cle(t)) try {
    URL.revokeObjectURL(t);
  } catch {}
}

function LCn(e, t) {
  e != null && e.startsWith("blob:") && t && (DCn(e), Uue.set(e, t));
}

const qPr = "Qiaodoumayi_CompactGen";

async function bLe(e, t, n) {
  if (typeof window > "u" || !("__TAURI__" in window) || !e.type.startsWith("image/")) return null;
  const {
      mkdir: r,
      writeFile: a,
      exists: i,
      BaseDirectory: o
    } = await Ie(async () => {
      const {
        mkdir: A,
        writeFile: S,
        exists: C,
        BaseDirectory: I
      } = await Promise.resolve().then(() => oc);
      return {
        mkdir: A,
        writeFile: S,
        exists: C,
        BaseDirectory: I
      };
    }, void 0, import.meta.url),
    s = await Rv(e),
    l = String(n).replace(/[^\w.-]+/g, "_").slice(0, 64),
    d = await e.arrayBuffer(),
    u = new Uint8Array(d),
    h = zHe(u),
    p = e.type && e.type.startsWith("image/") ? e.type : h || "image/png",
    m = jCn(p),
    f = `${l}_${Date.now()}.${m}`,
    y = `${qPr}/${t}`,
    b = `${y}/${f}`;
  (await i(y, {
    baseDir: o.Document
  })) || (await r(y, {
    baseDir: o.Document,
    recursive: !0
  })), await a(b, u, {
    baseDir: o.Document
  });
  const _ = await i_(e, wm, $k),
    w = URL.createObjectURL(_);
  LCn(w, b);
  const k = s.width > 0 && s.height > 0 ? `${s.width} × ${s.height}` : "";
  return s.width > 0 && s.height > 0 && Tj.set(w, {
    width: s.width,
    height: s.height
  }), {
    displayUrl: w,
    relPath: b,
    sizeLabel: k
  };
}

async function OCn(e, t, n) {
  if (typeof window > "u" || !("__TAURI__" in window) || !e.startsWith("http://") && !e.startsWith("https://")) return null;
  let r = null;
  try {
    const {
      downloadWithFallback: a
    } = await Ie(async () => {
      const {
        downloadWithFallback: i
      } = await Promise.resolve().then(() => El);
      return {
        downloadWithFallback: i
      };
    }, void 0, import.meta.url);
    if (r = await a(e, 12e4), !r.type.startsWith("image/")) {
      const i = e.includes(".png") ? "image/png" : e.includes(".webp") ? "image/webp" : "image/jpeg";
      r = new Blob([await r.arrayBuffer()], {
        type: i
      });
    }
  } catch {
    try {
      const a = await fetch(e, {
        mode: "cors",
        credentials: "omit"
      });
      a.ok && (r = await a.blob());
    } catch {}
  }
  return !r || !r.type.startsWith("image/") ? null : bLe(r, t, n);
}

async function Rv(e) {
  if (!e.type.startsWith("image/")) return Promise.resolve({
    width: 0,
    height: 0
  });
  const t = URL.createObjectURL(e);
  return new Promise(n => {
    const r = new Image();
    r.onload = () => {
      URL.revokeObjectURL(t), n({
        width: r.naturalWidth,
        height: r.naturalHeight
      });
    }, r.onerror = () => {
      URL.revokeObjectURL(t), n({
        width: 0,
        height: 0
      });
    }, r.src = t;
  });
}

function vU(e) {
  return Tj.get(e) ?? null;
}

function vm(e) {
  return e != null && e.startsWith("blob:") ? YE.get(e) ?? null : null;
}

function Il(e, t) {
  e != null && e.startsWith("blob:") && t && (DCn(e), YE.set(e, t));
}

function jCt() {
  YE.clear(), Tj.clear(), Uue.clear(), LO.length = 0;
}

function BCn() {
  const e = new Set([...YE.keys(), ...Tj.keys(), ...Uue.keys()]);
  jCt();
  for (const t of e) try {
    t.startsWith("blob:") && !R$(t) && URL.revokeObjectURL(t);
  } catch {}
  return e.size;
}

function Nd(e) {
  const t = String(e || "").trim();
  return t.startsWith("blob:") ? R$(t) ? !0 : !!vm(t) : !1;
}

function FCn(e) {
  const t = String(e || "").trim();
  return t.startsWith("blob:") && !Nd(t);
}

async function i_(e, t = nmt, n = rmt) {
  if (!(e.type || "").startsWith("image/")) return e;
  if (typeof createImageBitmap == "function") try {
    const i = await createImageBitmap(e, {
        resizeWidth: t,
        resizeQuality: "high"
      }),
      o = i.width,
      s = i.height;
    if (o <= 0 || s <= 0) return i.close(), e;
    const l = document.createElement("canvas");
    l.width = o, l.height = s;
    const d = l.getContext("2d");
    return d ? (d.drawImage(i, 0, 0), i.close(), (await new Promise(h => {
      l.toBlob(p => h(p), "image/jpeg", n);
    })) || e) : (i.close(), e);
  } catch {}
  const a = URL.createObjectURL(e);
  return new Promise(i => {
    const o = new Image();
    o.onload = () => {
      URL.revokeObjectURL(a);
      let s = o.naturalWidth,
        l = o.naturalHeight;
      if (s <= t && l <= t) {
        i(e);
        return;
      }
      const d = Math.min(t / s, t / l);
      s = Math.round(s * d), l = Math.round(l * d);
      const u = document.createElement("canvas");
      u.width = s, u.height = l;
      const h = u.getContext("2d");
      if (!h) {
        i(e);
        return;
      }
      h.imageSmoothingEnabled = !0, h.imageSmoothingQuality = "high", h.drawImage(o, 0, 0, s, l), u.toBlob(p => i(p || e), "image/jpeg", n);
    }, o.onerror = () => {
      URL.revokeObjectURL(a), i(e);
    }, o.src = a;
  });
}

async function zCn(e) {
  return e.type.startsWith("image/") ? i_(e, wm, $k) : null;
}

async function Vm(e, t, n) {
  const r = n ?? Uue.get(e) ?? null;
  if (r && typeof window < "u" && "__TAURI__" in window) try {
    const {
        readFile: o,
        BaseDirectory: s
      } = await Ie(async () => {
        const {
          readFile: y,
          BaseDirectory: b
        } = await Promise.resolve().then(() => oc);
        return {
          readFile: y,
          BaseDirectory: b
        };
      }, void 0, import.meta.url),
      l = await o(r, {
        baseDir: s.Document
      }),
      d = l instanceof Uint8Array ? l : new Uint8Array(l),
      u = d.byteLength >= 16 ? d.subarray(0, 16) : d,
      h = zHe(u),
      p = r.toLowerCase(),
      m = p.endsWith(".png") ? "image/png" : p.endsWith(".webp") ? "image/webp" : p.endsWith(".jpg") || p.endsWith(".jpeg") ? "image/jpeg" : null,
      f = h || m || "application/octet-stream";
    return new Blob([d], {
      type: f
    });
  } catch (o) {
    console.warn("[getFullBlobForDisplayUrl] 从本地文件读取原图失败:", o);
  }
  let i = (typeof t == "string" ? t.trim() : "") || YE.get(e) || null;
  if (!i) return null;
  try {
    const {
      localCacheManager: o
    } = await Ie(async () => {
      const {
        localCacheManager: s
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: s
      };
    }, void 0, import.meta.url);
    if (await o.ensureRestored(), o.isAvailable() && o.hasAsset(i)) {
      const s = await o.readAsset(i);
      if (s != null && s.blob && s.blob.size > 0) return s.blob;
    }
  } catch {}
  try {
    return await ni.getAssetBlob(i);
  } catch {
    return null;
  }
}

async function f5e(e) {
  if (!e) return e;
  if (e.startsWith("content_ref:")) {
    await Er.init();
    const a = Er.extractId(e);
    let i = await Er.get(a);
    if (i || (await new Promise(o => setTimeout(o, 200)), i = await Er.get(a)), i) return f5e(i);
  }
  if (e.startsWith("blob:")) {
    const a = await Vm(e, null, null);
    if (a) return URL.createObjectURL(a);
  }
  const {
      isOssPublicHttpUrl: t
    } = await Ie(async () => {
      const {
        isOssPublicHttpUrl: a
      } = await Promise.resolve().then(() => ii);
      return {
        isOssPublicHttpUrl: a
      };
    }, void 0, import.meta.url),
    {
      shouldMapOssUrlForDisplay: n,
      resolveOssPublicUrlForDisplay: r
    } = await Ie(async () => {
      const {
        shouldMapOssUrlForDisplay: a,
        resolveOssPublicUrlForDisplay: i
      } = await Promise.resolve().then(() => l3);
      return {
        shouldMapOssUrlForDisplay: a,
        resolveOssPublicUrlForDisplay: i
      };
    }, void 0, import.meta.url);
  if (n(e) && t(e)) {
    const a = await r(e);
    if (a) return a;
  }
  return e;
}

async function exe(e, t, n) {
  const r = await Vm(e, t, n);
  return r ? URL.createObjectURL(r) : null;
}

async function UCn(e) {
  if (!(e != null && e.startsWith("blob:"))) return !0;
  try {
    return (await fetch(e)).ok;
  } catch {
    return !1;
  }
}

async function $Cn(e, t, n) {
  const r = String(e || "").trim();
  return r ? !r.startsWith("blob:") || (await UCn(r)) ? r : (await $He(r, t, n)) || "" : "";
}

async function $He(e, t, n) {
  if (!(e != null && e.startsWith("blob:"))) return null;
  try {
    const {
        rebindManagedLocalObjectUrl: r
      } = await Ie(async () => {
        const {
          rebindManagedLocalObjectUrl: i
        } = await Promise.resolve().then(() => eU);
        return {
          rebindManagedLocalObjectUrl: i
        };
      }, void 0, import.meta.url),
      a = r(e);
    if (a) return a;
  } catch {}
  for (const r of n || []) if (!(!r || typeof r != "string") && typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)) try {
    const a = await Vm(e, null, r);
    if (a && a.size > 0) return URL.createObjectURL(a);
  } catch {}
  try {
    const {
      assetStore: r
    } = await Ie(async () => {
      const {
        assetStore: l
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: l
      };
    }, void 0, import.meta.url);
    await r.init();
    const a = new Set(),
      i = [],
      o = vm(e);
    o && (a.add(o), i.push(o));
    for (const l of t || []) l && typeof l == "string" && !a.has(l) && (a.add(l), i.push(l));
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
    await s.ensureRestored();
    for (const l of i) {
      if (s.isAvailable() && s.hasAsset(l)) try {
        s.invalidateAssetObjectUrl(l);
        const u = await s.readAssetAsUrl(l);
        if (u) return u;
      } catch {}
      const d = await r.getAssetBlob(l);
      if (d && d.size > 0) {
        const u = await r.getAssetUrl(l);
        return u || URL.createObjectURL(d);
      }
    }
  } catch {}
  return null;
}

const KPr = 800 * 1024;

async function GCn(e) {
  let t = e;
  if (e.startsWith("content_ref:")) {
    await Er.init();
    const i = Er.extractId(e),
      o = await Er.get(i);
    if (!o) throw new Error(`content_ref 不存在: ${i}`);
    t = o;
  }
  const n = await fetch(t).then(i => i.blob());
  if (n.size <= KPr) return new Promise((i, o) => {
    const s = new FileReader();
    s.onload = () => i(s.result), s.onerror = o, s.readAsDataURL(n);
  });
  const {
    processLargeData: r
  } = await Ie(async () => {
    const {
      processLargeData: i
    } = await Promise.resolve().then(() => eIt);
    return {
      processLargeData: i
    };
  }, void 0, import.meta.url);
  return `data:image/jpeg;base64,${await r("process_image", n, {
    maxDimension: 1536,
    quality: .78
  })}`;
}

const QPr = 1024;

async function Ix(e, t = QPr) {
  const {
    url: n,
    revoke: r
  } = await DCt(e);
  try {
    const {
        thumbnailStore: a
      } = await Ie(async () => {
        const {
          thumbnailStore: s
        } = await Promise.resolve().then(() => Y$);
        return {
          thumbnailStore: s
        };
      }, void 0, import.meta.url),
      i = await a.generateThumbnail(n, t, .88),
      o = await JPr(i);
    return {
      url: i,
      width: o.width,
      height: o.height
    };
  } catch {
    return ZPr(n, t);
  } finally {
    if (r && n.startsWith("blob:")) try {
      URL.revokeObjectURL(n);
    } catch {}
  }
}

function Xu(e, t, n, r) {
  if (!e) return Promise.resolve();
  const a = `${t}
${e}
${r || ""}`,
    i = Zwe.get(a);
  if (i) return i;
  let o, s;
  const l = new Promise((d, u) => {
    o = d, s = u;
  });
  return Zwe.set(a, l), Pbe.push({
    key: a,
    run: () => Y9e(e, t, n, r),
    resolve: o,
    reject: s
  }), IF || (IF = setTimeout(NCt, 0)), l;
}

function YPr(e, t, n, r, a) {
  const i = String(e || "").trim();
  if (!i || !t) return Promise.resolve();
  const o = String(n || "image/png").trim() || "image/png",
    s = `${t}
raw-b64:${o}:${i.length}
${a || ""}`,
    l = Zwe.get(s);
  if (l) return l;
  let d, u;
  const h = new Promise((p, m) => {
    d = p, u = m;
  });
  return Zwe.set(s, h), Pbe.push({
    key: s,
    run: () => XPr(i, t, o, r, a),
    resolve: d,
    reject: u
  }), IF || (IF = setTimeout(NCt, 0)), h;
}

async function XPr(e, t, n, r, a) {
  var b;
  if (!(typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window))) return Y9e(`data:${n};base64,${e}`, t, r, a);
  const {
    isCanvasLocalCacheMode: o
  } = await Ie(async () => {
    const {
      isCanvasLocalCacheMode: v
    } = await Promise.resolve().then(() => So);
    return {
      isCanvasLocalCacheMode: v
    };
  }, void 0, import.meta.url);
  if (!o()) return Y9e(`data:${n};base64,${e}`, t, r, a);
  const {
    localCacheManager: s,
    ensureCacheRootReadyForWrite: l
  } = await Ie(async () => {
    const {
      localCacheManager: v,
      ensureCacheRootReadyForWrite: _
    } = await Promise.resolve().then(() => Ha);
    return {
      localCacheManager: v,
      ensureCacheRootReadyForWrite: _
    };
  }, void 0, import.meta.url);
  await l();
  const d = (b = s.getDirectoryPathTauri()) == null ? void 0 : b.trim();
  if (!d || !s.isAvailable()) return Y9e(`data:${n};base64,${e}`, t, r, a);
  const {
      isSpeechAudioAssetId: u,
      SPEECH_AUDIO_CACHE_SUBDIR: h
    } = await Ie(async () => {
      const {
        isSpeechAudioAssetId: v,
        SPEECH_AUDIO_CACHE_SUBDIR: _
      } = await Promise.resolve().then(() => F3n);
      return {
        isSpeechAudioAssetId: v,
        SPEECH_AUDIO_CACHE_SUBDIR: _
      };
    }, void 0, import.meta.url),
    p = a ?? (u(t) ? h : void 0),
    {
      invoke: m
    } = await Ie(async () => {
      const {
        invoke: v
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: v
      };
    }, void 0, import.meta.url),
    f = await m("write_data_url_to_local_asset", {
      args: {
        dataUrl: e,
        assetId: t,
        cacheRoot: d,
        subdir: p,
        mimeHint: n,
        fileNameHint: r
      }
    });
  if (await s.registerExistingAsset({
    assetId: f.assetId || t,
    relativePath: f.relativePath,
    mimeType: f.mimeType || n,
    size: f.size,
    absolutePath: f.absolutePath
  }), ((f.mimeType || n).startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp|tiff?)$/i.test(f.fileName || f.relativePath || r || "")) && f.relativePath) try {
    const {
      ensureLocalPreviewAfterRustDownload: v
    } = await Ie(async () => {
      const {
        ensureLocalPreviewAfterRustDownload: _
      } = await Promise.resolve().then(() => Ui);
      return {
        ensureLocalPreviewAfterRustDownload: _
      };
    }, void 0, import.meta.url);
    await v(f.assetId || t, f.relativePath);
  } catch {}
}

async function JPr(e) {
  if (typeof createImageBitmap < "u") {
    const n = await (await fetch(e)).blob(),
      r = await createImageBitmap(n);
    try {
      return {
        width: r.width,
        height: r.height
      };
    } finally {
      r.close();
    }
  }
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      t({
        width: r.naturalWidth || 0,
        height: r.naturalHeight || 0
      });
    }, r.onerror = () => n(new Error("缩略图尺寸探测失败")), r.src = e;
  });
}

function ZPr(e, t) {
  return new Promise((n, r) => {
    const a = new Image();
    /^https?:\/\//i.test(e) && (a.crossOrigin = "anonymous");
    const i = setTimeout(() => {
      r(new Error("图片加载超时"));
    }, 3e4);
    a.onload = () => {
      clearTimeout(i);
      let o = a.naturalWidth,
        s = a.naturalHeight;
      if (o <= 0 || s <= 0) {
        r(new Error("图片尺寸无效"));
        return;
      }
      const l = Math.min(1, t / Math.max(o, s)),
        d = Math.round(o * l),
        u = Math.round(s * l),
        h = document.createElement("canvas");
      h.width = d, h.height = u;
      const p = h.getContext("2d");
      if (!p) {
        r(new Error("无法创建 canvas"));
        return;
      }
      p.imageSmoothingEnabled = !0, p.imageSmoothingQuality = "high", p.drawImage(a, 0, 0, o, s, 0, 0, d, u);
      const m = h.toDataURL("image/jpeg", .88);
      n({
        url: m,
        width: d,
        height: u
      });
    }, a.onerror = () => {
      clearTimeout(i), r(new Error("图片加载失败"));
    }, a.src = e;
  });
}

async function sk(e, t, n, r) {
  if (e.startsWith("blob:") || e.startsWith("data:")) return e;
  try {
    const {
      isTauriAssetProtocolUrl: d
    } = await Ie(async () => {
      const {
        isTauriAssetProtocolUrl: u
      } = await Promise.resolve().then(() => So);
      return {
        isTauriAssetProtocolUrl: u
      };
    }, void 0, import.meta.url);
    if (d(e)) return e;
  } catch {}
  if (!e.startsWith("http://") && !e.startsWith("https://")) return e;
  if (NCn(e)) {
    let d = null;
    try {
      const u = await fetch(e, {
        mode: "cors",
        credentials: "omit"
      });
      u.ok && (d = await u.blob());
    } catch {}
    if (!d) try {
      d = await new Promise((u, h) => {
        const p = new Image();
        p.crossOrigin = "anonymous";
        const m = setTimeout(() => h(new Error("timeout")), 15e3);
        p.onload = () => {
          clearTimeout(m);
          const f = document.createElement("canvas");
          f.width = p.naturalWidth, f.height = p.naturalHeight;
          const y = f.getContext("2d");
          if (!y) {
            h(new Error("no ctx"));
            return;
          }
          y.drawImage(p, 0, 0), f.toBlob(b => b ? u(b) : h(new Error("toBlob")), "image/png");
        }, p.onerror = () => {
          clearTimeout(m), h(new Error("load fail"));
        }, p.src = e;
      });
    } catch {}
    if (d) try {
      if (await ni.saveBlobAsset(t, d, e), d.type.startsWith("image/")) {
        const h = r != null && r.usePreviewQuality ? wm : nmt,
          p = r != null && r.usePreviewQuality ? $k : rmt,
          m = await i_(d, h, p),
          f = URL.createObjectURL(m);
        YE.set(f, t);
        try {
          const y = await Rv(d);
          y.width > 0 && y.height > 0 && Tj.set(f, y);
        } catch {}
        return f;
      }
      return URL.createObjectURL(d);
    } catch (u) {
      console.warn("[downloadAndGetLocalUrl] 原始 URL 下载后保存失败:", u);
    }
    e = _c(e) || e;
  } else {
    const d = _c(e) || e;
    d !== e && (e = d);
  }
  const {
      isTauriRuntime: a
    } = await Ie(async () => {
      const {
        isTauriRuntime: d
      } = await Promise.resolve().then(() => oqn);
      return {
        isTauriRuntime: d
      };
    }, void 0, import.meta.url),
    {
      isCanvasLocalCacheMode: i
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: d
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: d
      };
    }, void 0, import.meta.url);
  let o = null;
  if (a() && /^https?:\/\//i.test(e)) try {
    const {
      downloadWithFallback: d
    } = await Ie(async () => {
      const {
        downloadWithFallback: u
      } = await Promise.resolve().then(() => El);
      return {
        downloadWithFallback: u
      };
    }, void 0, import.meta.url);
    if (o = await d(e, 12e4), o && !o.type && /\.(png|jpe?g|webp|gif)/i.test(e)) {
      const u = e.toLowerCase().includes(".png") ? "image/png" : e.toLowerCase().includes(".webp") ? "image/webp" : e.toLowerCase().includes(".gif") ? "image/gif" : "image/jpeg";
      o = new Blob([await o.arrayBuffer()], {
        type: u
      });
    }
  } catch {}
  const s = (() => {
    try {
      const d = new URL(e),
        u = d.pathname.includes("/generated/"),
        h = d.port === "6001";
      return (d.protocol === "http:" || d.protocol === "https:") && u && h;
    } catch {
      return !1;
    }
  })();
  if (!o && /^https?:\/\//i.test(e) && /aliyuncs\.com/i.test(e)) try {
    const {
      downloadWithFallback: d
    } = await Ie(async () => {
      const {
        downloadWithFallback: u
      } = await Promise.resolve().then(() => El);
      return {
        downloadWithFallback: u
      };
    }, void 0, import.meta.url);
    o = await d(e, 12e4);
  } catch {}
  if (!o && !s) try {
    const d = await fetch(e, {
      mode: "cors",
      credentials: "omit"
    });
    d.ok && (o = await d.blob());
  } catch {
    console.log("[downloadAndGetLocalUrl] fetch CORS 失败，尝试 Image + Canvas 方式");
  }
  if (!o && typeof window < "u") try {
    const d = new URL(e);
    if (d.origin === window.location.origin && d.pathname.includes("/v1/videos/proxy")) {
      const h = await fetch(e);
      h.ok && (o = await h.blob());
    }
  } catch {}
  if (!o && !s) try {
    o = await new Promise((d, u) => {
      const h = new Image();
      h.crossOrigin = "anonymous";
      const p = setTimeout(() => {
        u(new Error("图片加载超时"));
      }, 3e4);
      h.onload = () => {
        clearTimeout(p);
        try {
          const m = document.createElement("canvas");
          m.width = h.naturalWidth, m.height = h.naturalHeight;
          const f = m.getContext("2d");
          if (!f) {
            u(new Error("无法创建 canvas context"));
            return;
          }
          f.drawImage(h, 0, 0), m.toBlob(y => {
            y ? d(y) : u(new Error("Canvas toBlob 失败"));
          }, "image/png");
        } catch (m) {
          u(m);
        }
      }, h.onerror = () => {
        clearTimeout(p), u(new Error("图片加载失败"));
      }, h.src = e;
    });
  } catch (d) {
    console.warn("[downloadAndGetLocalUrl] Image + Canvas 方式也失败:", d);
  }
  const l = typeof window < "u" && (() => {
    try {
      const d = new URL(e),
        u = d.pathname.includes("/v1/videos/proxy"),
        h = d.hostname === "localhost" || d.hostname === "127.0.0.1" || d.hostname === "",
        p = d.origin === window.location.origin;
      return u && (h || p);
    } catch {
      return !1;
    }
  })();
  if (!o && !l && (e.startsWith("http://") || e.startsWith("https://"))) try {
    const d = `https://wsrv.nl/?url=${encodeURIComponent(e)}&output=png`;
    console.log("[downloadAndGetLocalUrl] 尝试 wsrv.nl 代理下载...");
    const u = await fetch(d, {
      mode: "cors",
      credentials: "omit"
    });
    u.ok && (o = await u.blob(), console.log("[downloadAndGetLocalUrl] ✅ wsrv.nl 代理下载成功"));
  } catch (d) {
    console.warn("[downloadAndGetLocalUrl] wsrv.nl 代理也失败:", d);
  }
  if (o) try {
    if (await ni.saveBlobAsset(t, o, e), o.type.startsWith("image/")) {
      const h = r != null && r.usePreviewQuality ? wm : nmt,
        p = r != null && r.usePreviewQuality ? $k : rmt,
        m = await i_(o, h, p),
        f = URL.createObjectURL(m);
      YE.set(f, t);
      try {
        const y = await Rv(o);
        y.width > 0 && y.height > 0 && Tj.set(f, y);
      } catch {}
      return f;
    }
    return URL.createObjectURL(o);
  } catch (d) {
    console.error("[downloadAndGetLocalUrl] ❌ 保存失败:", d);
  }
  return i() ? (console.warn(`[downloadAndGetLocalUrl] 本地模式无法下载，不回退 https: ${e.slice(0, 80)}`), "") : (console.warn("[downloadAndGetLocalUrl] ⚠️ 无法下载图片，返回原始 URL"), e);
}

async function e9r(e, t) {
  return await ni.init(), await Promise.all(e.map(async (r, a) => {
    try {
      const i = await fetch(r.url).then(d => d.blob()),
        o = `${t}_crop_${a}`;
      await ni.saveBlobAsset(o, i, r.url);
      const s = await i_(i),
        l = URL.createObjectURL(s);
      YE.set(l, o);
      try {
        const d = await Rv(i);
        d.width > 0 && d.height > 0 && Tj.set(l, d);
      } catch {}
      return {
        url: l,
        width: r.width,
        height: r.height
      };
    } catch {
      return r;
    }
  }));
}

async function DCt(e) {
  if (e.startsWith("blob:")) {
    const a = await Vm(e);
    if (a) return {
      url: URL.createObjectURL(a),
      revoke: !0
    };
  }
  let t = e;
  if (e.startsWith("content_ref:")) try {
    await Er.init();
    const a = Er.extractId(e);
    let i = await Er.get(a);
    if (i || (await new Promise(o => setTimeout(o, 300)), i = await Er.get(a)), !i) throw new Error(`content_ref 不存在: ${a}`);
    t = i;
  } catch (a) {
    throw console.error("[getLoadableImageUrl] content_ref 解析失败:", a), new Error("图片加载失败：无法解析 content_ref");
  }
  if (!t.startsWith("http://") && !t.startsWith("https://")) return {
    url: t,
    revoke: !1
  };
  try {
    const {
      isTauriAssetProtocolUrl: a
    } = await Ie(async () => {
      const {
        isTauriAssetProtocolUrl: i
      } = await Promise.resolve().then(() => So);
      return {
        isTauriAssetProtocolUrl: i
      };
    }, void 0, import.meta.url);
    if (a(t)) {
      try {
        const i = await fetch(t);
        if (i.ok) {
          const o = await i.blob();
          if (o != null && o.size) return {
            url: URL.createObjectURL(o),
            revoke: !0
          };
        }
      } catch (i) {
        console.warn("[getLoadableImageUrl] asset.localhost 本地读取失败:", i);
      }
      throw new Error("本地缓存图片读取失败");
    }
  } catch (a) {
    if (a instanceof Error && a.message === "本地缓存图片读取失败") throw a;
  }
  let n = null;
  try {
    const {
      downloadWithFallback: a
    } = await Ie(async () => {
      const {
        downloadWithFallback: i
      } = await Promise.resolve().then(() => El);
      return {
        downloadWithFallback: i
      };
    }, void 0, import.meta.url);
    n = await a(t, 6e4);
  } catch (a) {
    console.warn("[getLoadableImageUrl] 下载失败，尝试公共代理:", a);
  }
  if (!n) try {
    const a = `https://wsrv.nl/?url=${encodeURIComponent(t)}&output=png&fit=inside&w=99999&h=99999`,
      i = await fetch(a);
    i.ok && (n = await i.blob());
  } catch {}
  if (!n) try {
    const a = `https://api.allorigins.win/raw?url=${encodeURIComponent(t)}`,
      i = await fetch(a);
    i.ok && (n = await i.blob());
  } catch {}
  if (n) return {
    url: URL.createObjectURL(n),
    revoke: !0
  };
  if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)) throw new Error("无法下载图片，请检查网络或使用打包版以绕过 CORS");
  return new Promise((a, i) => {
    const o = new Image();
    o.crossOrigin = "anonymous";
    const s = setTimeout(() => {
      i(new Error("图片加载超时"));
    }, 3e4);
    o.onload = () => {
      clearTimeout(s);
      try {
        const l = document.createElement("canvas");
        l.width = o.naturalWidth, l.height = o.naturalHeight;
        const d = l.getContext("2d");
        if (!d) {
          i(new Error("无法创建 canvas context"));
          return;
        }
        d.drawImage(o, 0, 0), l.toBlob(u => {
          if (u) a({
            url: URL.createObjectURL(u),
            revoke: !0
          });else try {
            const h = l.toDataURL("image/png");
            a({
              url: h,
              revoke: !1
            });
          } catch {
            i(new Error("Canvas 导出失败（可能是 CORS 限制）"));
          }
        }, "image/png");
      } catch (l) {
        console.warn("[getLoadableImageUrl] Canvas 导出失败，返回已解析 URL:", l), a({
          url: t,
          revoke: !1
        });
      }
    }, o.onerror = () => {
      clearTimeout(s), console.warn("[getLoadableImageUrl] 图片加载失败，返回原始 URL"), a({
        url: t,
        revoke: !1
      });
    }, o.src = t;
  });
}

function VCn(e, t) {
  return new Promise(async (n, r) => {
    try {
      const {
          url: a,
          revoke: i
        } = await DCt(e),
        o = new Image();
      o.crossOrigin = "anonymous";
      const s = setTimeout(() => {
        i && URL.revokeObjectURL(a), r(new Error("图片加载超时"));
      }, 3e4);
      o.onload = () => {
        clearTimeout(s);
        const {
            x: l,
            y: d,
            w: u,
            h
          } = t,
          p = Math.max(0, Math.min(l, o.width - 1)),
          m = Math.max(0, Math.min(d, o.height - 1)),
          f = Math.min(Math.max(1, u), o.width - p),
          y = Math.min(Math.max(1, h), o.height - m),
          b = document.createElement("canvas");
        b.width = f, b.height = y;
        const v = b.getContext("2d");
        v && (v.fillStyle = "#ffffff", v.fillRect(0, 0, f, y), v.drawImage(o, p, m, f, y, 0, 0, f, y));
        try {
          b.toBlob(_ => {
            if (i && URL.revokeObjectURL(a), _) n({
              url: URL.createObjectURL(_),
              width: f,
              height: y
            });else {
              const w = b.toDataURL("image/png");
              n({
                url: w,
                width: f,
                height: y
              });
            }
          }, "image/png");
        } catch {
          i && URL.revokeObjectURL(a);
          const _ = b.toDataURL("image/png");
          n({
            url: _,
            width: f,
            height: y
          });
        }
      }, o.onerror = () => {
        clearTimeout(s), i && URL.revokeObjectURL(a), r(new Error("图片加载失败"));
      }, o.src = a;
    } catch (a) {
      r(a);
    }
  });
}

async function LCt(e, t) {
  if (!t.length) return [];
  const {
    url: n,
    revoke: r
  } = await DCt(e);
  return new Promise((a, i) => {
    const o = new Image();
    o.crossOrigin = "anonymous";
    const s = setTimeout(() => {
      r && URL.revokeObjectURL(n), i(new Error("图片加载超时"));
    }, 3e4);
    o.onload = () => {
      clearTimeout(s);
      const l = o.width,
        d = o.height,
        u = (h, p) => new Promise((m, f) => {
          const y = Math.max(0, Math.min(h.x, l - 1)),
            b = Math.max(0, Math.min(h.y, d - 1)),
            v = Math.min(Math.max(1, h.w), l - y),
            _ = Math.min(Math.max(1, h.h), d - b),
            w = document.createElement("canvas");
          w.width = v, w.height = _;
          const k = w.getContext("2d");
          k && (k.fillStyle = "#ffffff", k.fillRect(0, 0, v, _), k.drawImage(o, y, b, v, _, 0, 0, v, _));
          try {
            w.toBlob(A => {
              m(A ? {
                url: URL.createObjectURL(A),
                width: v,
                height: _
              } : {
                url: w.toDataURL("image/png"),
                width: v,
                height: _
              });
            }, "image/png");
          } catch {
            m({
              url: w.toDataURL("image/png"),
              width: v,
              height: _
            });
          }
        });
      Promise.all(t.map((h, p) => u(h))).then(h => {
        r && URL.revokeObjectURL(n), a(h);
      }).catch(h => {
        r && URL.revokeObjectURL(n), i(h);
      });
    }, o.onerror = () => {
      clearTimeout(s), r && URL.revokeObjectURL(n), i(new Error("图片加载失败"));
    }, o.src = n;
  });
}

function t9r(e) {
  const t = e.getContext("2d");
  if (!t) return e;
  const n = e.width,
    r = e.height;
  if (n < 8 || r < 8) return e;
  const i = t.getImageData(0, 0, n, r).data,
    o = 40,
    s = 235,
    l = 25,
    d = .12,
    u = Math.max(1, Math.floor(n * d)),
    h = Math.max(1, Math.floor(r * d));
  function p(S) {
    let C = 0,
      I = 0;
    for (let T = 0; T < n; T++) {
      const P = (S * n + T) * 4,
        R = (i[P] + i[P + 1] + i[P + 2]) / 3;
      C += R, I += R * R;
    }
    const E = C / n,
      M = I / n - E * E;
    return (E < o || E > s) && M < l;
  }
  function m(S) {
    let C = 0,
      I = 0;
    for (let T = 0; T < r; T++) {
      const P = (T * n + S) * 4,
        R = (i[P] + i[P + 1] + i[P + 2]) / 3;
      C += R, I += R * R;
    }
    const E = C / r,
      M = I / r - E * E;
    return (E < o || E > s) && M < l;
  }
  let f = 0,
    y = r - 1,
    b = 0,
    v = n - 1;
  for (let S = 0; S < Math.min(h, r) && p(S); S++) f = S + 1;
  for (let S = r - 1; S >= Math.max(0, r - h) && p(S); S--) y = S - 1;
  for (let S = 0; S < Math.min(u, n) && m(S); S++) b = S + 1;
  for (let S = n - 1; S >= Math.max(0, n - u) && m(S); S--) v = S - 1;
  if (v < b || y < f) return e;
  const _ = Math.max(4, v - b + 1),
    w = Math.max(4, y - f + 1);
  if (_ >= n && w >= r) return e;
  const k = document.createElement("canvas");
  k.width = _, k.height = w;
  const A = k.getContext("2d");
  return A ? (A.drawImage(e, b, f, _, w, 0, 0, _, w), k) : e;
}

function n9r(e) {
  return new Promise(t => {
    try {
      e.toBlob(n => t(n), "image/png");
    } catch {
      t(null);
    }
  });
}

async function OCt(e, t = 3, n = 3) {
  let r = e,
    a = !1;
  if (e.startsWith("blob:")) {
    const i = await Vm(e);
    i && (r = URL.createObjectURL(i), a = !0);
  }
  if (r.startsWith("content_ref:")) try {
    await Er.init();
    const i = Er.extractId(e);
    let o = await Er.get(i);
    if (o || (await new Promise(s => setTimeout(s, 300)), o = await Er.get(i)), !o) throw new Error(`content_ref 不存在: ${i}`);
    r = o;
  } catch (i) {
    throw console.error("[splitGridImage] content_ref 解析失败:", i), new Error("图片加载失败：无法解析 content_ref");
  }
  return new Promise(async (i, o) => {
    var s;
    try {
      let l = r,
        d = a;
      const {
        isTauriAssetProtocolUrl: u
      } = await Ie(async () => {
        const {
          isTauriAssetProtocolUrl: y
        } = await Promise.resolve().then(() => So);
        return {
          isTauriAssetProtocolUrl: y
        };
      }, void 0, import.meta.url);
      if (u(r)) try {
        const y = await fetch(r);
        if (!y.ok) throw new Error(`HTTP ${y.status}`);
        const b = await y.blob();
        if (!(b != null && b.size)) throw new Error("empty local asset blob");
        l = URL.createObjectURL(b), d = !0;
      } catch (y) {
        console.error("[splitGridImage] asset.localhost 读盘失败:", y), o(new Error("本地缓存图片读取失败"));
        return;
      } else if (r.startsWith("http://") || r.startsWith("https://")) try {
        const y = await fetch(r, {
          mode: "cors",
          credentials: "omit"
        });
        if (!y.ok) throw new Error(`HTTP ${y.status}`);
        const b = await y.blob();
        l = URL.createObjectURL(b), d = !0;
      } catch (y) {
        console.warn("[splitGridImage] Fetch failed, trying dev proxy / Tauri then proxies:", y);
        let b = null;
        const v = r;
        if (typeof window < "u" && ((s = window.location) != null && s.origin) && /^https?:\/\/localhost(:\d+)?$/.test(window.location.origin)) try {
          const _ = `${window.location.origin}/api/image-proxy?url=${encodeURIComponent(v)}`,
            w = await fetch(_);
          w.ok && (b = await w.blob());
        } catch (_) {
          console.warn("[splitGridImage] Dev image-proxy failed:", _);
        }
        if (!b) try {
          const {
            downloadWithFallback: _
          } = await Ie(async () => {
            const {
              downloadWithFallback: w
            } = await Promise.resolve().then(() => El);
            return {
              downloadWithFallback: w
            };
          }, void 0, import.meta.url);
          b = await _(v, 6e4);
        } catch (_) {
          console.warn("[splitGridImage] Tauri download failed, trying proxies:", _);
        }
        if (!b) try {
          const _ = `https://wsrv.nl/?url=${encodeURIComponent(v)}&output=png&fit=inside&w=99999&h=99999`,
            w = await fetch(_);
          w.ok && (b = await w.blob());
        } catch (_) {
          console.warn("[splitGridImage] wsrv.nl failed:", _);
        }
        if (!b) try {
          const _ = `https://api.allorigins.win/raw?url=${encodeURIComponent(v)}`,
            w = await fetch(_);
          w.ok && (b = await w.blob());
        } catch (_) {
          console.warn("[splitGridImage] allorigins proxy failed:", _);
        }
        if (b) l = URL.createObjectURL(b), d = !0;else {
          console.error("[splitGridImage] All download attempts failed"), o(new Error("无法下载图片，请检查网络或使用打包版以绕过 CORS"));
          return;
        }
      }
      const p = new Image(),
        m = setTimeout(() => {
          console.error("[splitGridImage] Timeout after 30s"), d && URL.revokeObjectURL(l), o(new Error("图片加载超时"));
        }, 3e4),
        f = () => {
          try {
            p.removeAttribute("src");
          } catch {}
          d && l.startsWith("blob:") && URL.revokeObjectURL(l);
        };
      p.onload = () => {
        clearTimeout(m), (async () => {
          try {
            await Id();
            const y = Math.floor(p.width / t),
              b = Math.floor(p.height / n),
              v = p.width % t,
              _ = p.height % n,
              w = new Array(t).fill(y).map((C, I) => C + (I < v ? 1 : 0)),
              k = new Array(n).fill(b).map((C, I) => C + (I < _ ? 1 : 0)),
              A = t === 2 && n === 2,
              S = [];
            for (let C = 0; C < n; C++) for (let I = 0; I < t; I++) {
              S.length > 0 && (await Id());
              const E = w.slice(0, I).reduce((V, O) => V + O, 0),
                M = k.slice(0, C).reduce((V, O) => V + O, 0),
                T = w[I] ?? y,
                P = k[C] ?? b,
                R = document.createElement("canvas");
              R.width = T, R.height = P;
              const j = R.getContext("2d");
              j && (j.fillStyle = "#ffffff", j.fillRect(0, 0, T, P), j.drawImage(p, E, M, T, P, 0, 0, T, P));
              const B = A || T * P > 15e5 ? R : t9r(R),
                F = B.width,
                N = B.height;
              let G = await n9r(B),
                z = "";
              if (G) z = URL.createObjectURL(G);else try {
                z = B.toDataURL("image/png");
              } catch (V) {
                console.error(`[splitGridImage] Crop [${C},${I}] export failed:`, V), f(), o(V instanceof Error && /tainted|SecurityError/i.test(String(V)) ? new Error("Canvas 导出失败：图片跨域污染，请确认本地缓存已落盘为同源 blob") : new Error("Canvas 导出失败"));
                return;
              }
              R.width = 0, R.height = 0, B !== R && (B.width = 0, B.height = 0), G = null, S.push({
                url: z,
                width: F,
                height: N
              });
            }
            f(), i(S);
          } catch (y) {
            console.error("[splitGridImage] Error during split:", y), f(), o(y);
          }
        })();
      }, p.onerror = y => {
        clearTimeout(m), console.error("[splitGridImage] Image load error:", y), f(), o(new Error("图片加载失败"));
      }, p.src = l;
    } catch (l) {
      console.error("[splitGridImage] Unexpected error:", l), o(l);
    }
  });
}

async function HCn(e) {
  return OCt(e, 2, 2);
}

const WEe = new Set(["key", "apikey", "api_key", "api_key_encrypted", "secret", "apisecret", "api_secret", "token", "accesstoken", "access_token", "authtoken", "auth_token", "bearertoken", "bearer_token", "sessionid", "session_id", "jimengsessionid", "jimeng_session_id", "jimengsession", "jimeng_session", "sessiontoken", "session_token", "sid", "password", "passwd", "pwd", "authorization", "credentials", "credential", "privatekey", "private_key", "clientsecret", "client_secret", "refreshtoken", "refresh_token", "globalapikey", "global_api_key", "rhapikey", "rh_api_key"]);

function u5(e) {
  if (e == null) return e;
  if (Array.isArray(e)) return e.map(t => u5(t));
  if (typeof e == "object") {
    const t = {
        ...e
      },
      n = ["key", "apiKey", "api_key", "API_KEY", "apikey", "secret", "apiSecret", "api_secret", "API_SECRET", "token", "accessToken", "access_token", "ACCESS_TOKEN", "authToken", "auth_token", "AUTH_TOKEN", "bearerToken", "bearer_token", "BEARER_TOKEN", "sessionId", "session_id", "SESSION_ID", "sessionid", "jimengSessionId", "jimeng_session_id", "JIMENG_SESSION_ID", "jimengSession", "jimeng_session", "JIMENG_SESSION", "sessionToken", "session_token", "SESSION_TOKEN", "sid", "SID", "password", "passwd", "pwd", "PASSWORD", "authorization", "Authorization", "AUTHORIZATION", "credentials", "credential", "privateKey", "private_key", "PRIVATE_KEY", "clientSecret", "client_secret", "CLIENT_SECRET", "refreshToken", "refresh_token", "REFRESH_TOKEN", "globalApiKey", "global_api_key", "GLOBAL_API_KEY", "rhApiKey", "rh_api_key", "RH_API_KEY"];
    for (const r of n) r in t && delete t[r];
    for (const r of Object.keys(t)) WEe.has(r.toLowerCase()) && delete t[r];
    if ("apiConfig" in t && typeof t.apiConfig == "object" && t.apiConfig !== null) {
      const a = {
        ...t.apiConfig
      };
      for (const i of n) i in a && delete a[i];
      for (const i of Object.keys(a)) WEe.has(i.toLowerCase()) && delete a[i];
      t.apiConfig = u5(a);
    }
    if ("apiConfigs" in t && Array.isArray(t.apiConfigs) && (t.apiConfigs = t.apiConfigs.map(r => {
      if (r !== null && typeof r == "object" && !Array.isArray(r)) {
        const a = {
          ...r
        };
        for (const i of n) i in a && delete a[i];
        for (const i of Object.keys(a)) WEe.has(i.toLowerCase()) && delete a[i];
        return u5(a);
      }
      return r;
    })), "settings" in t && typeof t.settings == "object" && t.settings !== null) {
      const a = {
        ...t.settings
      };
      for (const i of n) i in a && delete a[i];
      for (const i of Object.keys(a)) WEe.has(i.toLowerCase()) && delete a[i];
      "_executeTrigger" in a && delete a._executeTrigger, t.settings = u5(a);
    }
    for (const r in t) typeof t[r] == "object" && t[r] !== null && (t[r] = u5(t[r]));
    return t;
  }
  return e;
}

function BCt(e) {
  const t = e.trim();
  if (t.startsWith("data:")) return t;
  let n = "image/png";
  return t.startsWith("/9j/") ? n = "image/jpeg" : t.startsWith("R0lGOD") ? n = "image/gif" : t.startsWith("UklGR") && (n = "image/webp"), `data:${n};base64,${t}`;
}

const No = Object.freeze(Object.defineProperty({
    __proto__: null,
    PREVIEW_CALLBACK_MAX_DIM: wm,
    PREVIEW_CALLBACK_QUALITY: $k,
    clamp: zPr,
    clearDisplayUrlBlobMappings: jCt,
    compressImageForCanvas: GCn,
    createThumbnailBlobForPreview: zCn,
    createThumbnailForAi: Ix,
    cropImageByRect: VCn,
    debounce: BHe,
    deepClone: NPr,
    downloadAndGetLocalUrl: sk,
    downloadRawBase64ToLocal: YPr,
    downloadUrlToLocal: Xu,
    ensureResolvableBlobUrl: $Cn,
    formatDateTime: DPr,
    formatFileSize: LPr,
    formatTime: jPr,
    generateId: Fi,
    getAssetIdForDisplayBlobUrl: vm,
    getDisplayProjectName: FHe,
    getFilenameFromUrl: OPr,
    getFullBlobForDisplayUrl: Vm,
    getFullBlobUrlForDisplayUrl: exe,
    getImageDimensionsFromBlob: Rv,
    getLocalDateString: RCn,
    getLocalISOString: DO,
    getLocalTimestamp: RCt,
    getOriginalDimensionsForDisplayUrl: vU,
    getVideoDisplayUrl: _c,
    isBlobUrlAlive: UCn,
    isDeadSessionBlobUrl: FCn,
    isJimengCdnVideoUrl: NCn,
    isTrustedSessionBlobUrl: Nd,
    keepFirstById: PCn,
    lerp: UPr,
    mimeToImageFileExtension: jCn,
    normalizeB64JsonFieldToDataUrl: BCt,
    persistGenImageResultForDownstream: GPr,
    persistGenVideoResultForDownstream: Jwe,
    prepareCropResultsForDisplay: e9r,
    recoverDeadBlobUrl: $He,
    registerDisplayUrlAssetId: Il,
    registerDisplayUrlLocalFullPath: LCn,
    releaseAllDisplayUrlBlobMappings: BCn,
    releaseTransientBlobUrlIfUnprotected: x0,
    resizeBlobForDisplay: i_,
    resolveImageUrlForDisplay: f5e,
    safeJsonParse: BPr,
    sanitizeSensitiveData: u5,
    saveImageBlobAsCompactGenDisplay: bLe,
    saveRemoteImageAsCompactGenDisplay: OCn,
    sleep: FPr,
    sniffImageMimeFromUint8: zHe,
    split2x2Image: HCn,
    splitGridImage: OCt,
    splitImageByRegions: LCt,
    throttle: MCn,
    unregisterDisplayUrlMappings: UHe
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  amt = "qiaodoumayi-node-customization-changed",
  Tf = "qiaodoumayi-cache-directory-ready",
  WCn = [{
    type: "input-image",
    label: "上传"
  }, {
    type: "text-node",
    label: "文本"
  }, {
    type: "gen-image",
    label: "绘画"
  }, {
    type: "gen-video",
    label: "视频"
  }, {
    type: "gen-3d",
    label: "3D"
  }, {
    type: "gen-music",
    label: "音频"
  }, {
    type: "custom-agent",
    label: "Agent"
  }, {
    type: "image-compare",
    label: "对比"
  }, {
    type: "inpaint-menu",
    label: "局部重绘"
  }],
  mO = WCn.map(e => e.type),
  r9r = new Set(mO),
  qCn = ["input-image", "text-node", "gen-image", "gen-video", "gen-music", "custom-agent"],
  HH = 3;

function a9r(e) {
  if (e == null || e === "") return null;
  try {
    const t = JSON.parse(e);
    if (Array.isArray(t) && t.every(n => typeof n == "string")) return t;
    if (t && typeof t == "object" && Array.isArray(t.commonNodeTypeIds)) {
      const n = t.commonNodeTypeIds;
      if (n.every(r => typeof r == "string")) return n;
    }
  } catch {}
  return null;
}

function Wle(e) {
  const t = new Set(),
    n = [];
  for (const r of e ?? []) {
    const a = r === "gen-speech" ? "gen-music" : r;
    r9r.has(a) && !t.has(a) && (t.add(a), n.push(a));
  }
  if (n.length < HH) for (const r of mO) {
    if (n.length >= HH) break;
    t.has(r) || (t.add(r), n.push(r));
  }
  return n;
}

function JHt() {
  try {
    const e = localStorage.getItem(Zi.CANVAS_NODE_CUSTOMIZATION),
      t = a9r(e);
    return Wle(t);
  } catch {
    return Wle([...qCn]);
  }
}

async function i9r() {
  var n;
  const {
      localCacheManager: e
    } = await Ie(async () => {
      const {
        localCacheManager: r
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: r
      };
    }, void 0, import.meta.url),
    t = await e.loadNodeCustomization();
  return (n = t == null ? void 0 : t.commonNodeTypeIds) != null && n.length ? Wle(t.commonNodeTypeIds) : null;
}

async function o9r(e) {
  const t = Wle(e),
    n = {
      version: 1,
      commonNodeTypeIds: t,
      updatedAt: new Date().toISOString()
    };
  try {
    localStorage.setItem(Zi.CANVAS_NODE_CUSTOMIZATION, JSON.stringify(n, null, 0));
  } catch (a) {
    console.warn("[nodeCustomization] localStorage save failed", a);
  }
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
  return await r.saveNodeCustomization(n), window.dispatchEvent(new CustomEvent(amt, {
    detail: {
      commonNodeTypeIds: t
    }
  })), t;
}

const s9r = "manifest.sqlite",
  ZHt = "json_migrated_v1";

let rne = null,
  ane = !1,
  X9e;

function l9r() {
  return typeof window < "u" && us();
}

function c9r(e, ...t) {
  return [e.replace(/[\\/]+$/, "").replace(/\\/g, "/"), ...t].join("/").replace(/\/+/g, "/");
}

function d9r(e) {
  const t = String(e || "").trim();
  if (t) return c9r(t, s9r);
}

function KCn(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  if (t && !(/^data:/i.test(t) || /^blob:/i.test(t))) return t;
}

function QCn(e, t) {
  const n = String(e || "").trim(),
    r = String((t == null ? void 0 : t.fileName) || "").trim();
  return !n || !r ? null : {
    id: n,
    fileName: r,
    mimeType: String(t.mimeType || ""),
    size: Number(t.size) || 0,
    cachedAt: Number(t.cachedAt) || 0,
    remoteUrl: KCn(t.remoteUrl) || null,
    contentHash: t.contentHash || null,
    payload: t
  };
}

function u9r(e) {
  const t = {};
  for (const n of e.assets || []) {
    const r = String(n.id || "").trim();
    if (!r) continue;
    const a = n.payload && typeof n.payload == "object" ? n.payload : null;
    t[r] = {
      fileName: (a == null ? void 0 : a.fileName) || n.fileName,
      mimeType: (a == null ? void 0 : a.mimeType) || n.mimeType || "",
      size: Number((a == null ? void 0 : a.size) ?? n.size) || 0,
      cachedAt: Number((a == null ? void 0 : a.cachedAt) ?? n.cachedAt) || 0,
      remoteUrl: (a == null ? void 0 : a.remoteUrl) ?? n.remoteUrl ?? void 0,
      contentHash: (a == null ? void 0 : a.contentHash) ?? n.contentHash ?? void 0,
      temporaryOssRestore: a == null ? void 0 : a.temporaryOssRestore
    };
  }
  return {
    version: e.version || "1.0",
    revision: Number(e.revision) || 0,
    createdAt: e.createdAt || new Date().toISOString(),
    updatedAt: e.updatedAt || new Date().toISOString(),
    deletedAssetIds: Array.isArray(e.deletedAssetIds) ? e.deletedAssetIds.map(String) : [],
    assets: t
  };
}

function h9r(e) {
  const t = [];
  for (const [n, r] of Object.entries(e.assets || {})) {
    const a = QCn(n, r);
    a && t.push(a);
  }
  return {
    version: e.version || "1.0",
    revision: Number(e.revision) || 0,
    createdAt: e.createdAt || new Date().toISOString(),
    updatedAt: e.updatedAt || new Date().toISOString(),
    deletedAssetIds: Array.isArray(e.deletedAssetIds) ? e.deletedAssetIds.map(String) : [],
    assets: t
  };
}

async function kP(e) {
  if (!l9r()) return !1;
  const t = d9r(e);
  return ane && X9e === t ? !0 : (X9e !== t && (ane = !1), rne || (rne = (async () => {
    try {
      const n = await Fr("manifest_db_open", {
        dbPath: t ?? null
      });
      return ane = !!(n != null && n.open), X9e = t, ane;
    } catch (n) {
      return console.warn("[manifestSqlite] open failed:", n), ane = !1, !1;
    } finally {
      rne = null;
    }
  })(), rne));
}

function eWt() {
  ane = !1, rne = null, X9e = void 0;
}

async function p9r(e) {
  if (!(await kP(e))) return null;
  try {
    return await Fr("manifest_db_status");
  } catch {
    return null;
  }
}

async function m9r(e, t) {
  if (!(await kP(t))) return null;
  try {
    return (await Fr("manifest_db_get_meta", {
      key: e
    })) ?? null;
  } catch {
    return null;
  }
}

async function imt(e, t, n) {
  if (await kP(n)) try {
    await Fr("manifest_db_set_meta", {
      key: e,
      value: t
    });
  } catch (r) {
    console.warn("[manifestSqlite] set meta failed:", r);
  }
}

async function f9r(e) {
  if (!(await kP(e))) return null;
  try {
    const t = await Fr("manifest_db_load_snapshot");
    if (!t) return null;
    const n = u9r(t);
    return Object.keys(n.assets).length === 0 && (Number(t.revision) || 0) <= 0 ? null : n;
  } catch (t) {
    return console.warn("[manifestSqlite] load failed:", t), null;
  }
}

async function qge(e, t) {
  if (!(await kP(t))) return 0;
  try {
    return await Fr("manifest_db_apply_snapshot", {
      snapshot: h9r(e)
    });
  } catch (n) {
    return console.warn("[manifestSqlite] apply snapshot failed:", n), 0;
  }
}

async function YCn(e, t) {
  const n = e.map(r => QCn(r.id, r.asset)).filter(r => !!r);
  if (!n.length || !(await kP(t))) return 0;
  try {
    return await Fr("manifest_db_upsert_assets", {
      assets: n
    });
  } catch (r) {
    return console.warn("[manifestSqlite] upsert failed:", r), 0;
  }
}

async function XCn(e, t) {
  const n = [...new Set(e.map(r => String(r || "").trim()).filter(Boolean))];
  if (!n.length || !(await kP(t))) return 0;
  try {
    return await Fr("manifest_db_delete_ids", {
      ids: n
    });
  } catch (r) {
    return console.warn("[manifestSqlite] delete failed:", r), 0;
  }
}

async function g9r(e, t) {
  var i;
  if (!(await kP(t))) return !1;
  const n = await m9r(ZHt, t),
    r = await p9r(t),
    a = !!(r && (Number(r.assetCount) || 0) > 0);
  if (n === "1" && a) return !0;
  try {
    const o = await e(),
      s = o ? Object.keys(o.assets || {}).length : 0;
    if (o && s > 0 && (!a || n !== "1")) {
      if (!a) await qge(o, t);else {
        const l = Object.entries(o.assets || {}).map(([u, h]) => ({
            id: u,
            asset: h
          })),
          d = 200;
        for (let u = 0; u < l.length; u += d) await YCn(l.slice(u, u + d), t);
        (i = o.deletedAssetIds) != null && i.length && (await XCn(o.deletedAssetIds, t));
      }
      console.log(`[manifestSqlite] migrated/merged ${s} assets from JSON` + (a ? " (db already had rows)" : ""));
    }
    return await imt(ZHt, "1", t), !0;
  } catch (o) {
    return console.warn("[manifestSqlite] migrate failed:", o), !1;
  }
}

const GHe = 96 * 1024;

function JCn(e) {
  return e === "audio";
}

function jR(e) {
  const t = String(e || "").trim();
  if (t && (/\/thumbnails\//i.test(t) || t.startsWith("data:image") && t.length <= GHe)) return t;
}

function uM(e) {
  const t = String(e || "").trim();
  return t ? !!(t.startsWith("blob:") || t.startsWith("data:") && !t.startsWith("data:image") || t.startsWith("data:image") && t.length > GHe) : !1;
}

function W4(e) {
  const t = String(e || "").trim();
  if (t && !(t.startsWith("blob:") || t.startsWith("data:")) && (/asset\.localhost/i.test(t) || /^https?:\/\/asset\./i.test(t) || /^asset:/i.test(t) || /^https?:\/\//i.test(t))) return t;
}

function Rbe(e) {
  return W4(e.audioUrl) || W4(e._ossRemoteUrl) || W4(e.url) || W4(e.originalUrl);
}

function VHe(e) {
  const t = String(e || "").trim();
  return t ? /(?:\?|&)x-oss-process=image\/resize/i.test(t) || /(?:\?|&)imageView2\/2\/w\/\d+/i.test(t) : !1;
}

function y9r(e) {
  const t = String(e || "").trim();
  return !/^https?:\/\//i.test(t) || /\/thumbnails\//i.test(t) || /-list\.webp(?:$|\?)/i.test(t) || VHe(t) && !/x-oss-process=image\/crop/i.test(t) ? "" : t;
}

function SR(e) {
  const t = String(e || "").trim();
  if (!t || uM(t)) return !1;
  if (t.startsWith("data:image") && t.length <= GHe) return !0;
  const n = t.toLowerCase();
  return !!(n.includes("/thumbnails/") || n.includes("preview_") || n.includes("\\thumbnails\\") || VHe(t) || /asset\.localhost/i.test(t) || /^https?:\/\/asset\./i.test(t) || /^asset:/i.test(t) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/(asset|convert)/i.test(t));
}

function b9r(e) {
  const t = String(e || "").trim();
  return !t || !/^https?:\/\//i.test(t) ? !1 : /athena-haicong-llm-external\.oss/i.test(t) || /\/haiyi\//i.test(t) && /aliyuncs\.com/i.test(t);
}

function vLe(e) {
  const t = String(e || "").trim();
  if (!t) return;
  const n = eh(t);
  if (n) return n;
  if (/^https?:\/\//i.test(t) && !/\.(glb|gltf|obj|mtl|bin)(\?|#|$)/i.test(t)) return t;
}

function eh(e) {
  const t = String(e || "").trim();
  if (t && !t.startsWith("blob:") && !b9r(t) && (SR(t) || /^https?:\/\//i.test(t) && /\/thumbnails\//i.test(t) || t.startsWith("data:image") && t.length <= GHe || /^https?:\/\//i.test(t) && v9r(t))) return t;
}

function v9r(e) {
  const t = e.toLowerCase();
  return VHe(e) ? !0 : t.includes("/images/") && !t.includes("/thumbnails/") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(t) ? !1 : /\.(jpe?g|png|webp|gif|bmp)(\?|$)/i.test(t) || t.includes("/thumbnails/") || t.includes("poster") || t.includes("cover");
}

function tWt(e) {
  const t = String(e || "").trim();
  if (t && !uM(t)) return t;
}

const qle = 160,
  ZCn = 80,
  $K = 200;

function FCt(e) {
  if (e == null) return;
  const t = typeof e == "string" ? e : String(e);
  return t.length <= qle ? t : `${t.slice(0, qle)}…`;
}

function lg(e) {
  return !e || typeof e != "string" ? !1 : e.endsWith("…") && e.length === qle + 1;
}

function eEn(e) {
  return lg(e) ? e.slice(0, qle) : null;
}

function J9e(e) {
  return String(e || "").replace(/@(图片|视频|音频)(\d+)/g, "$1$2").replace(/@(\d+)/g, "图片$1").replace(/\[(图片|视频|音频)(\d+)\]/g, "$1$2");
}

function Nbe(e) {
  return String(e || "").replace(/@(图片|视频|音频)(\d+)/g, "$1$2").replace(/@(\d+)/g, "图片$1");
}

function wLe(e, t) {
  const n = eEn(e);
  if (!n) return;
  const r = J9e(n);
  for (const i of t) if (!(typeof i != "string" || !i) && !lg(i) && i.startsWith(n) && i.length > n.length) return Nbe(i);
  for (const i of t) {
    if (typeof i != "string" || !i || lg(i)) continue;
    const o = J9e(i);
    if (o.startsWith(r) && o.length > r.length) return Nbe(i);
  }
  const a = Math.min(48, r.length);
  if (a >= 24) {
    const i = r.slice(0, a);
    let o;
    for (const s of t) {
      if (typeof s != "string" || !s || lg(s)) continue;
      const l = J9e(s);
      if (!l.startsWith(i) || l.length <= i.length) continue;
      const d = Nbe(s);
      (!o || d.length > o.length) && (o = d);
    }
    if (o) return o;
  }
}

function TY(e, t) {
  const n = e == null ? "" : typeof e == "string" ? e : String(e),
    r = t == null ? "" : typeof t == "string" ? t : String(t);
  return n ? r ? lg(n) && !lg(r) ? r : lg(r) && !lg(n) || n.length >= r.length ? n : r : n || void 0 : r || void 0;
}

function HHe(e, t) {
  if (!Array.isArray(e) || e.length === 0) return e;
  const n = Math.max(1, (t == null ? void 0 : t.maxCompleted) ?? ZCn),
    r = [],
    a = [];
  for (const s of e) s.status === "generating" ? r.push(s) : a.push(s);
  const o = a.slice(0, n).map(s => {
    const l = FCt(s.prompt),
      d = Number.isFinite(Number(s.startTime)) && Number(s.startTime) > 0 ? Number(s.startTime) : void 0,
      u = Number(s.timestamp),
      h = Number.isFinite(u) && u > 0 ? u : d,
      p = jR(s.url) ?? "",
      m = eh(s.thumbnailUrl) || eh(s._ossThumbnailUrl),
      f = Array.isArray(s.mjThumbnails) ? s.mjThumbnails.map(w => eh(w) || "") : void 0,
      y = (s._globalOssUrlOnly || s.ossUploaded) && Array.isArray(s.mjImages) ? s.mjImages.map(y9r) : void 0,
      b = !!y && y.length > 1 && y.every(Boolean) && new Set(y).size === y.length,
      v = Array.isArray(s._mjAssetIds) ? (s._mjAssetIds || []).filter(w => typeof w == "string" && w.trim().length > 0) : void 0;
    return {
      id: s.id,
      ...(s.teaching ? {
        teaching: !0
      } : {}),
      type: s.type,
      url: p,
      time: s.time,
      status: s.status,
      progress: s.progress,
      modelName: s.modelName,
      width: s.width,
      height: s.height,
      ratio: s.ratio,
      startTime: d,
      timestamp: h,
      durationMs: s.durationMs,
      generationTime: s.generationTime,
      _assetId: s._assetId,
      _audioAssetId: s._audioAssetId,
      _thumbnailAssetId: s._thumbnailAssetId,
      _ossRemoteUrl: s._ossRemoteUrl,
      _ossThumbnailUrl: s._ossThumbnailUrl,
      ossUploaded: s.ossUploaded,
      _globalOssUrlOnly: s._globalOssUrlOnly,
      thumbnailUrl: m,
      prompt: l,
      errorMsg: s.errorMsg,
      sourceNodeId: s.sourceNodeId,
      targetPreviewId: s.targetPreviewId,
      ...(s.studioTool ? {
        studioTool: s.studioTool
      } : {}),
      ...(s.cutoutRepairProject ? {
        cutoutRepairProject: s.cutoutRepairProject
      } : {}),
      ...(s.localEditProject ? {
        localEditProject: s.localEditProject
      } : {}),
      ...(s.harnessImage ? {
        harnessImage: s.harnessImage
      } : {}),
      ...(s.layerSplitGroupId ? {
        layerSplitGroupId: s.layerSplitGroupId
      } : {}),
      ...(typeof s.layerSplitIndex == "number" ? {
        layerSplitIndex: s.layerSplitIndex
      } : {}),
      ...(s.remoteTaskId ? {
        remoteTaskId: s.remoteTaskId
      } : {}),
      ...(s.jimengStatus ? {
        jimengStatus: s.jimengStatus
      } : {}),
      ...(s.falModelPath ? {
        falModelPath: s.falModelPath
      } : {}),
      ...(s.apiConfig ? {
        apiConfig: s.apiConfig
      } : {}),
      ...(v && v.length > 1 ? {
        _mjAssetIds: v
      } : {}),
      ...(f && f.some(Boolean) ? {
        mjThumbnails: f
      } : {}),
      ...(b ? {
        mjImages: y,
        originalUrl: s.originalUrl || y[0],
        mjOriginalUrl: s.mjOriginalUrl || y[0]
      } : f && f.filter(Boolean).length > 1 ? {
        mjImages: f
      } : {}),
      ...(typeof s.selectedMjImageIndex == "number" ? {
        selectedMjImageIndex: s.selectedMjImageIndex
      } : {}),
      ...(s.type === "audio" ? {
        audioUrl: Rbe(s),
        duration: s.duration,
        musicTitle: s.musicTitle
      } : {}),
      ...(s.type === "3d" ? {
        url: /^https?:\/\//i.test(String(s.url || "")) ? String(s.url) : p,
        originalUrl: /^https?:\/\//i.test(String(s.originalUrl || s.url || "")) ? String(s.originalUrl || s.url) : s.originalUrl,
        thumbnailUrl: vLe(s.thumbnailUrl) || vLe(s._ossThumbnailUrl) || m,
        threeDFormat: s.threeDFormat,
        threeDFiles: s.threeDFiles
      } : {})
    };
  });
  return g5e([...r, ...o]);
}

function g5e(e) {
  if (!Array.isArray(e) || e.length === 0) return e;
  let t = !1;
  const n = [],
    r = i => {
      const o = String(i || "").trim();
      return o.startsWith("blob:") && uM(o) && n.push(o), tWt(o);
    },
    a = e.map(i => {
      var b, v;
      if (i.status === "generating") return i;
      const o = r(i.url) ?? "",
        s = r(i.originalUrl),
        l = r(i.thumbnailUrl),
        d = r(i.audioUrl),
        u = r(i.mjOriginalUrl),
        h = r(i.videoPosterUrl),
        p = r(i.localCacheUrl),
        m = _ => {
          if (!(_ != null && _.length)) return _;
          const w = [];
          let k = !1;
          for (const A of _) {
            const S = String(A || "").trim();
            if (S.startsWith("blob:") && uM(S)) {
              n.push(S), k = !0;
              continue;
            }
            const C = tWt(S);
            C && w.push(C);
          }
          return k || w.length !== _.length ? w : _;
        },
        f = (b = i.mjImages) != null && b.some(_ => uM(_)) ? m(i.mjImages) : i.mjImages,
        y = (v = i.mjThumbnails) != null && v.some(_ => uM(_)) ? m(i.mjThumbnails) : i.mjThumbnails;
      return o === (i.url || "") && s === i.originalUrl && l === i.thumbnailUrl && d === i.audioUrl && u === i.mjOriginalUrl && h === i.videoPosterUrl && p === i.localCacheUrl && f === i.mjImages && y === i.mjThumbnails ? i : (t = !0, {
        ...i,
        url: o,
        originalUrl: s,
        thumbnailUrl: l,
        audioUrl: d,
        mjOriginalUrl: u,
        videoPosterUrl: h,
        localCacheUrl: p,
        ...(f !== i.mjImages ? {
          mjImages: f
        } : {}),
        ...(y !== i.mjThumbnails ? {
          mjThumbnails: y
        } : {})
      });
    });
  return n.length > 0 && Ie(async () => {
    const {
      releaseTransientBlobUrlIfUnprotected: i
    } = await Promise.resolve().then(() => No);
    return {
      releaseTransientBlobUrlIfUnprotected: i
    };
  }, void 0, import.meta.url).then(({
    releaseTransientBlobUrlIfUnprotected: i
  }) => {
    for (const o of n) i(o);
  }), t ? a : e;
}

const w9r = Object.freeze(Object.defineProperty({
  __proto__: null,
  HISTORY_CLOSED_MAX_COMPLETED: ZCn,
  HISTORY_PAGE_SIZE: $K,
  HISTORY_PROMPT_PREVIEW_MAX: qle,
  acceptHistoryListDisplayUrl: eh,
  acceptStableHistoryAudioPlayUrl: W4,
  acceptThreeDHistoryListCoverUrl: vLe,
  demoteHistoryEphemeralBlobUrls: g5e,
  expandAtTagsAsHistoryImages: Nbe,
  historyPromptPreviewPrefix: eEn,
  isEphemeralHistoryListDisplayUrl: uM,
  isHistoryPromptPreview: lg,
  isServerSideResizedListCoverUrl: VHe,
  isStableHistoryListDisplayUrl: SR,
  matchFullPromptByPreviewPrefix: wLe,
  normalizeHistoryPromptForMatch: J9e,
  packHistoryForClosedPanelMemory: HHe,
  pickSafeLegacyHistoryListThumbnail: jR,
  pickStableHistoryAudioPlayUrl: Rbe,
  preferFullHistoryPrompt: TY,
  shouldResolveHistoryListOriginal: JCn,
  toHistoryPromptPreview: FCt
}, Symbol.toStringTag, {
  value: "Module"
}));

let ine = null,
  one = !1,
  Z9e;

function x9r() {
  return typeof window < "u" && us();
}

function _9r(e) {
  const t = ZJ(e);
  return t > 0 ? Math.floor(t) : 0;
}

function lZ() {
  return ua() ? "oss" : "local";
}

function k9r(e) {
  const t = String(e.id || "").trim();
  if (!t) return null;
  const n = K$(e),
    r = xCn(n),
    a = typeof n.prompt == "string" ? n.prompt : void 0,
    i = a && !lg(a) ? a : void 0,
    o = FCt(a) || (a ? a.slice(0, qle) : void 0);
  return {
    id: t,
    payload: n,
    isLocal: r.local ? 1 : 0,
    isOss: r.oss ? 1 : 0,
    itemType: n.type || "image",
    status: n.status || "completed",
    sortTs: _9r(n),
    modelName: n.modelName,
    promptPreview: o,
    promptFull: i,
    sourceNodeId: n.sourceNodeId ? String(n.sourceNodeId) : void 0,
    assetId: n._assetId ? String(n._assetId) : void 0
  };
}

const tEn = "history";

function xLe(e, ...t) {
  return [e.replace(/[\\/]+$/, "").replace(/\\/g, "/"), ...t].join("/").replace(/\/+/g, "/");
}

async function A9r(e, t) {
  try {
    const {
        exists: n,
        mkdir: r,
        rename: a
      } = await Ie(async () => {
        const {
          exists: s,
          mkdir: l,
          rename: d
        } = await Promise.resolve().then(() => oc);
        return {
          exists: s,
          mkdir: l,
          rename: d
        };
      }, void 0, import.meta.url),
      i = xLe(e, "history.sqlite");
    if (!(await n(i)) || (await n(t))) return;
    const o = xLe(e, tEn);
    await r(o, {
      recursive: !0
    }), await a(i, t);
    for (const s of ["-wal", "-shm"]) {
      const l = `${i}${s}`,
        d = `${t}${s}`;
      if (await n(l)) try {
        await a(l, d);
      } catch {}
    }
    console.log("[historySqlite] migrated bare history.sqlite → history/");
  } catch (n) {
    console.warn("[historySqlite] migrate bare sqlite skipped:", n);
  }
}

async function nWt() {
  try {
    const {
        localCacheManager: e
      } = await Ie(async () => {
        const {
          localCacheManager: n
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: n
        };
      }, void 0, import.meta.url),
      t = String(e.getDirectoryPathTauri() || "").trim();
    if (t) {
      const n = xLe(t, tEn, "history.sqlite");
      return await A9r(t, n), n;
    }
  } catch {}
}

async function Km() {
  if (!x9r()) return !1;
  const e = await nWt();
  return one && Z9e === e ? !0 : (Z9e !== e && (one = !1), ine || (ine = (async () => {
    try {
      const t = await nWt();
      let n = await Fr("history_db_open", {
        dbPath: t ?? null
      });
      if (n != null && n.open && (Number(n.count) || 0) <= 0) try {
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
          a = String(r.getDirectoryPathTauri() || "").trim();
        if (a) {
          const i = xLe(a, "history.sqlite"),
            {
              exists: o
            } = await Ie(async () => {
              const {
                exists: s
              } = await Promise.resolve().then(() => oc);
              return {
                exists: s
              };
            }, void 0, import.meta.url);
          if (i && (await o(i)) && i !== t) {
            const s = await Fr("history_db_open", {
              dbPath: i
            });
            s != null && s.open && (Number(s.count) || 0) > 0 && (console.warn("[historySqlite] nested db empty; using legacy root history.sqlite", {
              count: s.count,
              path: i
            }), n = s);
          }
        }
      } catch (r) {
        console.warn("[historySqlite] legacy sqlite fallback failed:", r);
      }
      return one = !!(n != null && n.open), Z9e = t, one;
    } catch (t) {
      return console.warn("[historySqlite] open failed:", t), one = !1, !1;
    } finally {
      ine = null;
    }
  })(), ine));
}

function omt() {
  one = !1, ine = null, Z9e = void 0;
}

async function nEn() {
  if (!(await Km())) return null;
  try {
    return await Fr("history_db_status");
  } catch {
    return null;
  }
}

async function Kle(e) {
  if (!(await Km())) return null;
  try {
    return (await Fr("history_db_get_meta", {
      key: e
    })) ?? null;
  } catch {
    return null;
  }
}

async function Fae(e, t) {
  if (await Km()) try {
    await Fr("history_db_set_meta", {
      key: e,
      value: t
    });
  } catch (n) {
    console.warn("[historySqlite] set meta failed:", n);
  }
}

const smt = new Set();

function S9r(e) {
  return smt.add(e), () => {
    smt.delete(e);
  };
}

async function wU(e) {
  if (!e.length || !(await Km())) return 0;
  const t = e.map(k9r).filter(n => !!n);
  if (!t.length) return 0;
  try {
    const n = await Fr("history_db_upsert", {
      items: t
    });
    if (n === t.length) for (const r of smt) try {
      r(t.map(a => a.payload));
    } catch (a) {
      console.warn("[historySqlite] write listener failed:", a);
    }
    return n;
  } catch (n) {
    return console.warn("[historySqlite] upsert failed:", n), 0;
  }
}

async function Qle(e) {
  if (!(await Km())) return null;
  const t = e.storageMode ?? lZ(),
    n = Math.max(0, e.offset ?? 0),
    r = Math.min(500, Math.max(1, e.limit ?? 200)),
    a = e.mediaType && e.mediaType !== "all" ? e.mediaType : null,
    i = String(e.search || "").trim() || null;
  try {
    const o = await Fr("history_db_query_page", {
      teachingOnly: e.teachingOnly === !0,
      storageMode: t,
      offset: n,
      limit: r,
      mediaType: a,
      search: i
    });
    return {
      items: Array.isArray(o.items) ? e.teachingOnly ? o.items.filter(Nx) : o.items : [],
      total: Number(o.total) || 0,
      offset: Number(o.offset) || n,
      limit: Number(o.limit) || r,
      hasMore: !!o.hasMore
    };
  } catch (o) {
    return console.warn("[historySqlite] query page failed:", o), null;
  }
}

async function cZ(e) {
  if (!(await Km())) return null;
  try {
    return (await Fr("history_db_get_by_id", {
      id: String(e || "").trim()
    })) ?? null;
  } catch {
    return null;
  }
}

async function rEn(e) {
  if (!(await Km())) return null;
  try {
    const t = await Fr("history_db_get_prompt", {
      id: String(e || "").trim()
    });
    return t && !lg(t) ? t : null;
  } catch {
    return null;
  }
}

async function WHe(e) {
  const t = [...new Set(e.map(n => String(n || "").trim()).filter(Boolean))];
  if (!t.length || !(await Km())) return 0;
  try {
    return await Fr("history_db_delete_ids", {
      ids: t
    });
  } catch (n) {
    return console.warn("[historySqlite] delete failed:", n), 0;
  }
}

async function I9r(e) {
  const t = [...new Set(e.map(n => String(n || "").trim()).filter(Boolean))];
  if (!t.length || !(await Km())) return 0;
  try {
    return await Fr("history_db_add_deleted_ids", {
      ids: t
    });
  } catch (n) {
    return console.warn("[historySqlite] add deleted ids failed:", n), 0;
  }
}

async function C9r(e) {
  const t = [...new Set(e.map(n => String(n || "").trim()).filter(Boolean))];
  if (!t.length || !(await Km())) return 0;
  try {
    return await Fr("history_db_remove_deleted_ids", {
      ids: t
    });
  } catch (n) {
    return console.warn("[historySqlite] remove deleted ids failed:", n), 0;
  }
}

async function E9r(e) {
  const t = [...new Set(e.map(n => String(n || "").trim()).filter(Boolean))];
  if (!t.length || !(await Km())) return 0;
  try {
    return await Fr("history_db_remove_deleted_urls", {
      urls: t
    });
  } catch (n) {
    return console.warn("[historySqlite] remove deleted urls failed:", n), 0;
  }
}

async function T9r() {
  if (!(await Km())) return 0;
  try {
    return await Fr("history_db_reconcile_live_tombstones");
  } catch (e) {
    return console.warn("[historySqlite] reconcile live tombstones failed:", e), 0;
  }
}

async function M9r() {
  if (!(await Km())) return null;
  try {
    const e = await Fr("history_db_list_deleted_ids");
    return Array.isArray(e) ? e.map(String) : [];
  } catch (e) {
    return console.warn("[historySqlite] list deleted ids failed:", e), null;
  }
}

async function P9r() {
  if (!(await Km())) return null;
  try {
    const e = await Fr("history_db_list_deleted_urls");
    return Array.isArray(e) ? e.map(String) : [];
  } catch (e) {
    return console.warn("[historySqlite] list deleted urls failed:", e), null;
  }
}

async function aEn(e) {
  const t = [...new Set(e.map(n => String(n || "").trim()).filter(Boolean))];
  if (!t.length || !(await Km())) return 0;
  try {
    return await Fr("history_db_add_deleted_urls", {
      urls: t
    });
  } catch (n) {
    return console.warn("[historySqlite] add deleted urls failed:", n), 0;
  }
}

async function iEn(e) {
  const t = e.map(n => ({
    id: String(n.id || "").trim(),
    promptFull: String(n.promptFull || "").trim()
  })).filter(n => n.id && n.promptFull && !lg(n.promptFull));
  if (!t.length || !(await Km())) return 0;
  try {
    return await Fr("history_db_upsert_prompts", {
      prompts: t
    });
  } catch (n) {
    return console.warn("[historySqlite] upsert prompts failed:", n), 0;
  }
}

async function oEn(e, t) {
  const n = [];
  let r = 0;
  for (;;) {
    const a = await Qle({
      storageMode: e,
      teachingOnly: !0,
      offset: r,
      limit: 500
    });
    if (!a) throw new Error("无法读取教学记录，已取消删除。");
    if (n.push(...a.items.filter(i => i.teaching === !0 && (!t || i.status === "failed")).map(i => String(i.id))), !a.hasMore) break;
    r += a.limit;
  }
  if (n.length && (await WHe(n)) !== n.length) throw new Error("教学记录删除尚未完成，请刷新后重试。");
  return n;
}

async function R9r(e) {
  if (!(await Km())) return [];
  if (ch()) return oEn(e, !1);
  try {
    const t = await Fr("history_db_clear_storage_mode", {
      teachingOnly: ch(),
      storageMode: e ?? lZ()
    });
    return Array.isArray(t) ? t.map(String) : [];
  } catch (t) {
    return console.warn("[historySqlite] clear storage mode failed:", t), [];
  }
}

async function N9r(e) {
  if (!(await Km())) return [];
  if (ch()) return oEn(e, !0);
  try {
    const t = await Fr("history_db_delete_failed_by_mode", {
      teachingOnly: ch(),
      storageMode: e ?? lZ()
    });
    return Array.isArray(t) ? t.map(String) : [];
  } catch (t) {
    return console.warn("[historySqlite] delete failed by mode failed:", t), [];
  }
}

const rWt = "json_migrated_v1",
  Oet = "json_flags_resync_v3",
  lmt = "prompts_sidecar_migrated_v1",
  aWt = "tombstones_ls_migrated_v1";

async function j9r(e) {
  if (!(await Km())) return !1;
  if ((await Kle(rWt)) !== "1") {
    const r = await nEn();
    try {
      const a = await e();
      if (a.length > 0) for (let o = 0; o < a.length; o += 200) await wU(a.slice(o, o + 200));
      return await Fae(rWt, "1"), await Fae(Oet, "1"), console.log(`[historySqlite] migrated/merged ${a.length} items from JSON` + (r && r.count > 0 ? " (db already had rows)" : "")), !0;
    } catch (a) {
      return console.warn("[historySqlite] migrate failed:", a), !1;
    }
  }
  if ((await Kle(Oet)) === "1") return !0;
  try {
    const r = await e();
    if (r.length > 0) {
      for (let i = 0; i < r.length; i += 200) await wU(r.slice(i, i + 200));
      console.log(`[historySqlite] resynced storage flags for ${r.length} JSON items`);
    }
    return await Fae(Oet, "1"), !0;
  } catch (r) {
    return console.warn("[historySqlite] flags resync failed:", r), !0;
  }
}

const zCt = "qiaodoumayi_material_lib_global_oss_index";

let CF = null,
  ime = null;

function sEn() {
  try {
    const e = localStorage.getItem(zCt);
    return e ? JSON.parse(e) : {};
  } catch {
    return {};
  }
}

function D9r(e) {
  try {
    localStorage.setItem(zCt, JSON.stringify(e));
  } catch (t) {
    console.warn("[materialLibraryGlobalOssIndex] LS 写入失败:", t);
  }
}

async function lEn() {
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

function cEn() {
  return CF || (CF = sEn(), CF);
}

async function L9r() {
  return ime || (ime = (async () => {
    const e = await lEn();
    await lIt({
      cacheRoot: e,
      loadMaterialGlobalLs: () => {
        try {
          return localStorage.getItem(zCt);
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
      },
      loadDedupLs: () => {
        try {
          return localStorage.getItem("qiaodoumayi_global_oss_upload_dedup_v1");
        } catch {
          return null;
        }
      }
    });
    const t = await c5n("global", e);
    if (t.length > 0) {
      const n = {};
      for (const r of t) !r.pathKey || !r.remoteUrl || (n[r.pathKey] = {
        remoteUrl: r.remoteUrl,
        displayUrl: String(r.displayUrl || r.remoteUrl),
        updatedAt: r.updatedAt || Date.now()
      });
      CF = n;
    } else CF || (CF = sEn());
  })().catch(e => console.warn("[materialLibraryGlobalOssIndex] hydrate failed:", e)).finally(() => {
    ime = null;
  }), ime);
}

function UCt(e) {
  const t = cEn(),
    n = t[e];
  if (n != null && n.remoteUrl) return n;
  const r = gU(e);
  for (const [a, i] of Object.entries(t)) if (gU(a) === r && (i != null && i.remoteUrl)) return i;
  return null;
}

function O9r(e, t) {
  if (!e || !(t != null && t.remoteUrl)) return;
  const n = gU(e),
    r = {
      ...cEn(),
      [n]: {
        remoteUrl: t.remoteUrl,
        displayUrl: t.displayUrl || t.remoteUrl,
        updatedAt: t.updatedAt || Date.now()
      }
    };
  CF = r, (async () => {
    const a = await lEn();
    if (a) try {
      await Ole("global", [{
        pathKey: n,
        remoteUrl: r[n].remoteUrl,
        displayUrl: r[n].displayUrl,
        updatedAt: r[n].updatedAt
      }], a);
      return;
    } catch (i) {
      console.warn("[materialLibraryGlobalOssIndex] SQL upsert failed, fallback LS:", i);
    }
    D9r(r);
  })();
}

const Yle = "qiaodoumayi-storage-transaction",
  _Le = "qiaodoumayi-cache-location-unavailable",
  kLe = {
    invalid_path: "该位置无效，请选择一个完整的本地文件夹路径。",
    drive_root: "不能直接使用磁盘根目录，请选择或新建一个子文件夹。",
    protected_dir: "这是系统保护目录，请选择其他位置。",
    app_install_dir: "不能使用应用安装目录作为数据目录，请选择旁边的独立文件夹。",
    not_writable: "该目录无写入权限，请检查权限或选择其他位置。",
    path_overlap: "新位置不能放在当前缓存文件夹内，也不能包含当前缓存文件夹。",
    path_too_long: "路径过长，可能超过 Windows 260 字符限制，请换更短的位置。",
    destination_not_empty: "新位置已有其他文件。为避免覆盖，请选择空文件夹，或连接已有的缓存目录。",
    migration_in_progress: "另一项存储变更正在进行，请等待完成后再试。",
    generation_in_progress: "请等待生成任务完成后再更换缓存目录。",
    insufficient_space: "目标磁盘空间不足，无法复制现有缓存。",
    configured_location_unavailable: "已设置的缓存位置当前不可用。请重新连接磁盘，或连接此文件夹。",
    missing: "路径不存在。",
    blocked: "只能打开缓存目录或下载目录内的文件。"
  },
  B9r = 259;

let txe = null,
  cmt = null;

function jb() {
  return txe !== null;
}

function $Ct(e) {
  return txe ? !1 : (txe = e, dEn(), !0);
}

function GCt() {
  txe = null, dEn();
}

function dEn() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Yle, {
    detail: {
      kind: txe
    }
  }));
}

function nxe() {
  return cmt;
}

function jbe(e) {
  cmt = e && String(e).trim() || null, !(typeof window > "u") && window.dispatchEvent(new CustomEvent(_Le, {
    detail: cmt
  }));
}

function xU(e) {
  return String(e || "").trim().replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/+$/, "");
}

function VCt(e) {
  const t = String(e || "").trim();
  return t ? /^[A-Za-z]:[\\/]/.test(t) || t.startsWith("\\\\") ? !0 : t.startsWith("/") : !1;
}

function uEn(e) {
  const t = xU(e);
  return !!(!t || /^[A-Za-z]:$/.test(t) || t === "/");
}

function hEn(e, t) {
  const n = xU(e).toLowerCase(),
    r = xU(t).toLowerCase();
  return !n || !r ? !1 : n === r ? !0 : n.startsWith(`${r}/`) || r.startsWith(`${n}/`);
}

function pEn(e, t) {
  const n = xU(e).toLowerCase();
  return n ? t.some(r => {
    const a = xU(r).toLowerCase();
    return a ? n === a || n.startsWith(`${a}/`) : !1;
  }) : !1;
}

function HCt(e, t) {
  const n = String(e || "").trim();
  if (!VCt(n)) return {
    ok: !1,
    error: "invalid_path"
  };
  if (uEn(n)) return {
    ok: !1,
    error: "drive_root"
  };
  if (typeof navigator < "u" && /win/i.test(navigator.platform || navigator.userAgent || "") && n.length > B9r) return {
    ok: !1,
    error: "path_too_long"
  };
  const r = String(t || "").trim();
  return r && hEn(n, r) ? {
    ok: !1,
    error: "path_overlap"
  } : {
    ok: !0
  };
}

function pR(e) {
  return kLe[e] || e;
}

async function mEn(e, t) {
  return Fr("validate_cache_directory", {
    path: e,
    currentPath: t || null
  });
}

function fEn(e, t, n, r) {
  const a = HCt(t, e);
  if (!a.ok) return a;
  if (!n.ok) return {
    ok: !1,
    error: n.error || "invalid_path"
  };
  const i = String(e || "").trim();
  return i ? xU(i).toLowerCase() === xU(t).toLowerCase() ? {
    mode: "set"
  } : r ? n.looksInitialized ? {
    mode: "relink"
  } : n.exists && n.empty === !1 && !n.looksInitialized ? {
    ok: !1,
    error: "destination_not_empty"
  } : {
    mode: "relink"
  } : {
    mode: "relink"
  } : {
    mode: "set"
  };
}

async function F9r(e) {
  const {
      localCacheManager: t,
      getResolvedCacheRootAbsolutePath: n
    } = await Ie(async () => {
      const {
        localCacheManager: s,
        getResolvedCacheRootAbsolutePath: l
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: s,
        getResolvedCacheRootAbsolutePath: l
      };
    }, void 0, import.meta.url),
    r = String(e.assetId || "").trim();
  let a = String(e.fallbackPath || "").trim();
  if (r) {
    const s = await t.getAssetSourcePath(r);
    s && (a = s);
  }
  if (!a) throw new Error(kLe.missing);
  const i = [],
    o = await n();
  o && i.push(o);
  try {
    const s = String(localStorage.getItem("qiaodoumayi_download_directory") || "").trim();
    s && VCt(s) && i.push(s);
  } catch {}
  if (!pEn(a, i)) throw new Error(kLe.blocked);
  await Fr("open_folder_in_explorer", {
    path: a
  });
}

function z9r(e) {
  const t = (e == null ? void 0 : e.settings) || {};
  for (const n of [t._localCacheAssetId, t._assetId, t._contentAssetId, e == null ? void 0 : e._contentAssetId]) {
    const r = String(n || "").trim();
    if (r) return r;
  }
  return "";
}

const gEn = Object.freeze(Object.defineProperty({
  __proto__: null,
  CACHE_DIR_ERROR_MESSAGES: kLe,
  CACHE_LOCATION_UNAVAILABLE_EVENT: _Le,
  STORAGE_TRANSACTION_EVENT: Yle,
  beginStorageTransaction: $Ct,
  cachePathsOverlap: hEn,
  decideCacheDirectoryChange: fEn,
  endStorageTransaction: GCt,
  getUnavailableCacheLocation: nxe,
  isAbsoluteCachePath: VCt,
  isDriveRootPath: uEn,
  isPathInsideAllowedRoots: pEn,
  isStorageTransactionActive: jb,
  messageForCacheDirError: pR,
  normalizeCachePath: xU,
  pickNodeLocalAssetId: z9r,
  revealLocalAssetInExplorer: F9r,
  rustValidateCacheDirectory: mEn,
  setUnavailableCacheLocation: jbe,
  validateCacheDirectoryPath: HCt
}, Symbol.toStringTag, {
  value: "Module"
}));

function dmt(e, t, n) {
  const r = n.replace(/\\/g, "/");
  return Object.entries(e).some(([a, i]) => a !== t && i.fileName.replace(/\\/g, "/") === r);
}

function Bet() {
  typeof window < "u" && window.dispatchEvent(new CustomEvent(Tf)), Promise.all([dIt(), L9r(), CIn()]).catch(() => {});
}

const iWt = "Prompt words",
  oWt = "saved_skills.json",
  s4 = "Material Category Management",
  qEe = "material_category_state.json",
  KEe = "material_library_sidebar_state.json",
  Kge = "ai_role_library.json",
  U9r = typeof window < "u" && "__TAURI__" in window;

function yEn(e) {
  if (typeof window > "u") return !1;
  if (U9r) return !0;
  const t = window;
  return !!(t.__TAURI_INTERNALS__ && (t.__LINGO_ELECTRON_NATIVE_SHELL__ || t.__LINGO_SIDECAR__));
}

function BM() {
  return yEn();
}

function Bs(e, ...t) {
  return [e.replace(/\\/g, "/").replace(/\/+$/, ""), ...t].join("/").replace(/\/+/g, "/");
}

function $9r(e) {
  const t = e.trim();
  return t ? /^[A-Za-z]:[\\/]/.test(t) || t.startsWith("\\\\") ? !0 : t.startsWith("/") : !1;
}

async function bEn(e) {
  const t = e.trim();
  if (!t || $9r(t) || !BM()) return t;
  try {
    const {
        documentDir: n,
        join: r
      } = await Ie(async () => {
        const {
          documentDir: i,
          join: o
        } = await Promise.resolve().then(() => wT);
        return {
          documentDir: i,
          join: o
        };
      }, void 0, import.meta.url),
      a = await n();
    return await r(a, t.replace(/^[\\/]+/, ""));
  } catch (n) {
    return console.warn("[CacheDirectory] resolveDesktopCachePath failed:", n), t;
  }
}

function G9r(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619) >>> 0;
  return t.toString(36);
}

const WCt = "qiaodoumayi_cache_dir",
  k5 = "handles",
  qCt = "cacheDirectoryHandle";

async function V9r(e) {
  return new Promise((t, n) => {
    const r = indexedDB.open(WCt, 1);
    r.onupgradeneeded = () => {
      const a = r.result;
      a.objectStoreNames.contains(k5) || a.createObjectStore(k5);
    }, r.onsuccess = () => {
      const a = r.result,
        i = a.transaction(k5, "readwrite");
      i.objectStore(k5).put(e, qCt), i.oncomplete = () => {
        a.close(), t();
      }, i.onerror = () => {
        a.close(), n(i.error);
      };
    }, r.onerror = () => n(r.error);
  });
}

async function H9r() {
  return new Promise((e, t) => {
    const n = indexedDB.open(WCt, 1);
    n.onupgradeneeded = () => {
      const r = n.result;
      r.objectStoreNames.contains(k5) || r.createObjectStore(k5);
    }, n.onsuccess = () => {
      const r = n.result,
        i = r.transaction(k5, "readonly").objectStore(k5).get(qCt);
      i.onsuccess = () => {
        r.close(), e(i.result || null);
      }, i.onerror = () => {
        r.close(), t(i.error);
      };
    }, n.onerror = () => t(n.error);
  });
}

async function W9r() {
  return new Promise((e, t) => {
    const n = indexedDB.open(WCt, 1);
    n.onupgradeneeded = () => {
      const r = n.result;
      r.objectStoreNames.contains(k5) || r.createObjectStore(k5);
    }, n.onsuccess = () => {
      const r = n.result,
        a = r.transaction(k5, "readwrite");
      a.objectStore(k5).delete(qCt), a.oncomplete = () => {
        r.close(), e();
      }, a.onerror = () => {
        r.close(), t(a.error);
      };
    }, n.onerror = () => t(n.error);
  });
}

const yo = class yo {
  constructor() {
    On(this, "directoryHandle", null);
    On(this, "directoryPathTauri", null);
    On(this, "manifest", null);
    On(this, "manifestDirty", !1);
    On(this, "manifestWriteTimer", null);
    On(this, "manifestWriteSequence", Promise.resolve());
    On(this, "processingQueue", new Set());
    On(this, "_restorePromise", null);
    On(this, "_listenerUnsubscribe", null);
    On(this, "_lastPrunedAt", 0);
    On(this, "_prunePromise", null);
    On(this, "batchWriteConcurrency", 2);
    On(this, "pendingAssets", new Map());
    On(this, "pendingAssetFlushTimer", null);
    On(this, "pendingAssetFlushPromise", null);
    On(this, "convertFileSrcByAssetId", new Map());
    On(this, "convertSrcExistsAt", new Map());
    On(this, "lastAssetProtocolRoot", null);
    On(this, "manifestDirtyAssetIds", new Set());
    On(this, "manifestDeletedAssetIds", new Set());
    On(this, "incrementalDeleteBudget", 0);
    On(this, "urlIndex", new Map());
    On(this, "hashIndex", new Map());
    On(this, "assetIndexKeys", new Map());
  }
  objectUrlKey(t) {
    return `local-asset:${t}`;
  }
  isManagedBlobUrl(t) {
    return R$(t);
  }
  clearBlobUrlCache() {
    Twe({
      force: !0
    }), this.convertFileSrcByAssetId.clear(), this.convertSrcExistsAt.clear();
  }
  capConvertSrcCache() {
    for (; this.convertFileSrcByAssetId.size > yo.CONVERT_SRC_URL_CACHE_MAX;) {
      const t = this.convertFileSrcByAssetId.keys().next().value;
      if (!t) break;
      this.convertFileSrcByAssetId.delete(t), this.convertSrcExistsAt.delete(t);
    }
  }
  invalidateConvertFileSrcCache(t) {
    const n = String(t || "").trim();
    n && (this.convertFileSrcByAssetId.delete(n), this.convertSrcExistsAt.delete(n));
  }
  invalidateConvertSrcCache(t) {
    this.invalidateConvertFileSrcCache(t);
  }
  getCachedAssetUrlSync(t) {
    const n = String(t || "").trim();
    if (!n) return null;
    const r = this.convertFileSrcByAssetId.get(n);
    return r || F4t(this.objectUrlKey(n));
  }
  invalidateAssetObjectUrl(t) {
    const n = String(t || "").trim();
    n && Xne(this.objectUrlKey(n));
  }
  async registerAssetProtocolScope(t) {
    if (!BM()) return;
    const n = String(t ?? this.directoryPathTauri ?? "").trim();
    if (n) try {
      const {
          invoke: r
        } = await Ie(async () => {
          const {
            invoke: i
          } = await Promise.resolve().then(() => sd);
          return {
            invoke: i
          };
        }, void 0, import.meta.url),
        a = await r("register_local_cache_asset_scope", {
          args: {
            cacheRoot: n,
            previousCacheRoot: this.lastAssetProtocolRoot || void 0
          }
        });
      this.lastAssetProtocolRoot = String(a || n).trim() || n, Gge(this.lastAssetProtocolRoot);
    } catch (r) {
      console.warn("[LocalCacheManager] registerAssetProtocolScope failed:", r);
    }
  }
  async convertAbsolutePathToSrc(t) {
    const n = String(t || "").trim();
    if (!n || !BM() || !eHe(n)) return null;
    try {
      const {
          convertFileSrc: r
        } = await Ie(async () => {
          const {
            convertFileSrc: o
          } = await Promise.resolve().then(() => sd);
          return {
            convertFileSrc: o
          };
        }, void 0, import.meta.url),
        a = n.replace(/\\/g, "/");
      return r(a) || null;
    } catch (r) {
      return console.warn("[LocalCacheManager] convertFileSrc failed:", n, r), null;
    }
  }
  async getConvertFileSrcForAsset(t) {
    var o, s;
    const n = String(t || "").trim();
    if (!n) return null;
    if (!this.directoryPathTauri || !((s = (o = this.manifest) == null ? void 0 : o.assets[n]) != null && s.fileName)) return this.invalidateConvertSrcCache(n), null;
    const r = this.convertFileSrcByAssetId.get(n);
    if (r && Date.now() - (this.convertSrcExistsAt.get(n) ?? 0) < yo.CONVERT_SRC_EXISTS_TTL_MS) {
      if (S3(r)) return r;
      this.invalidateConvertSrcCache(n);
    }
    this.lastAssetProtocolRoot || (await this.registerAssetProtocolScope(this.directoryPathTauri));
    const a = Bs(this.directoryPathTauri, this.manifest.assets[n].fileName);
    try {
      if (!(await Fp(a))) return this.invalidateConvertSrcCache(n), null;
    } catch {
      return this.invalidateConvertSrcCache(n), null;
    }
    const i = await this.convertAbsolutePathToSrc(a);
    return i ? (this.convertFileSrcByAssetId.set(n, i), this.convertSrcExistsAt.set(n, Date.now()), this.capConvertSrcCache()) : this.invalidateConvertSrcCache(n), i;
  }
  async registerExistingAsset(t, n) {
    if (!this.manifest || !this.directoryHandle && !this.directoryPathTauri) return !1;
    const r = String(t.assetId || "").trim(),
      a = String(t.relativePath || "").replace(/\\/g, "/").replace(/^\/+/, "");
    if (!r || !a) return !1;
    if (a.includes("..") || /^[A-Za-z]:/.test(a) || a.startsWith("/")) return console.warn("[LocalCacheManager] registerExistingAsset rejected unsafe path:", a), !1;
    Xne(this.objectUrlKey(r)), this.invalidateConvertSrcCache(r), this.restoreManifestAsset(r, {
      fileName: a,
      mimeType: t.mimeType || "application/octet-stream",
      size: Math.max(0, Number(t.size) || 0),
      cachedAt: Date.now(),
      remoteUrl: t.remoteUrl || void 0,
      contentHash: t.contentHash || void 0
    }), n != null && n.skipFlush && this.scheduleManifestWrite();
    const i = String(t.absolutePath || "").trim() || (this.directoryPathTauri ? Bs(this.directoryPathTauri, a) : "");
    if (i) {
      const l = await this.convertAbsolutePathToSrc(i);
      l && (this.convertFileSrcByAssetId.set(r, l), this.convertSrcExistsAt.set(r, Date.now()), this.capConvertSrcCache());
    }
    const o = t.mimeType || "";
    return !(r.startsWith("preview_") || r.startsWith("thumb_") || r.endsWith("_thumbnail")) && o.startsWith("image/") && (t.size || 0) > 50 * 1024 && this._scheduleThumbnailsAfterRegister(r).catch(() => {}), console.log(`[LocalCacheManager] ✅ Registered existing asset ${r} -> ${a} (${((t.size || 0) / 1024).toFixed(1)} KB)`), n != null && n.skipFlush || (await this.flushManifest()), !0;
  }
  async adoptAbsoluteFilesIntoCache(t, n) {
    var h;
    const r = String(this.directoryPathTauri || "").trim();
    if (!r || !this.manifest || t.length === 0) return 0;
    const a = r.replace(/\\/g, "/").replace(/\/+$/, ""),
      i = String(n || "").replace(/\\/g, "/").replace(/\/+$/, ""),
      o = [],
      s = [],
      l = p => {
        var y;
        const m = p.replace(/\\/g, "/"),
          f = b => {
            if (!b) return null;
            if (m.toLowerCase().startsWith(b.toLowerCase() + "/")) {
              const v = m.slice(b.length).replace(/^\/+/, "");
              return !v || v.includes("..") ? null : v;
            }
            return null;
          };
        return f(i) || f(a) || (((y = m.match(/\/((?:images|videos|audio|local|thumbnails|other)\/[^/]+)$/i)) == null ? void 0 : y[1]) ?? null);
      },
      d = p => /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(p) ? "video/mp4" : /\.(mp3|wav|m4a|aac)(\?|#|$)/i.test(p) ? "audio/mpeg" : /\.png(\?|#|$)/i.test(p) ? "image/png" : /\.webp(\?|#|$)/i.test(p) ? "image/webp" : /\.gif(\?|#|$)/i.test(p) ? "image/gif" : /\.jpe?g(\?|#|$)/i.test(p) ? "image/jpeg" : "application/octet-stream";
    for (const p of t) {
      const m = String(p.assetId || "").trim(),
        f = String(p.absolutePath || "").trim();
      if (!m || !f) continue;
      const y = (h = this.manifest.assets[m]) == null ? void 0 : h.fileName;
      if (y) try {
        if (await Fp(Bs(r, y))) continue;
      } catch {}
      let b = !1;
      try {
        b = await Fp(f);
      } catch {
        b = !1;
      }
      if (!b) continue;
      const v = d(f),
        _ = l(f) || `${v.startsWith("video/") ? "videos" : v.startsWith("audio/") ? "audio" : "images"}/${f.replace(/\\/g, "/").split("/").pop() || `${m}.bin`}`;
      if (_.includes("..")) continue;
      const w = Bs(r, _),
        k = w.replace(/\\/g, "/").toLowerCase(),
        A = f.replace(/\\/g, "/").toLowerCase(),
        S = d(_);
      if (k === A) {
        s.push({
          assetId: m,
          relativePath: _,
          absolutePath: w,
          mimeType: S
        });
        continue;
      }
      o.push({
        src: f,
        dest: w,
        assetId: m,
        relativePath: _,
        mimeType: S
      });
    }
    let u = 0;
    if (o.length > 0) for (let m = 0; m < o.length; m += 40) {
      const f = o.slice(m, m + 40);
      try {
        await Fr("copy_local_files_batch", {
          items: f.map(y => ({
            src: y.src,
            dest: y.dest
          }))
        });
      } catch (y) {
        console.warn("[LocalCacheManager] adoptAbsoluteFilesIntoCache copy failed:", y);
        continue;
      }
      for (const y of f) {
        try {
          if (!(await Fp(y.dest))) continue;
        } catch {
          continue;
        }
        (await this.registerExistingAsset({
          assetId: y.assetId,
          relativePath: y.relativePath,
          mimeType: y.mimeType,
          size: 0,
          absolutePath: y.dest
        }, {
          skipFlush: !0
        })) && (u += 1);
      }
    }
    for (const p of s) (await this.registerExistingAsset({
      assetId: p.assetId,
      relativePath: p.relativePath,
      mimeType: p.mimeType,
      size: 0,
      absolutePath: p.absolutePath
    }, {
      skipFlush: !0
    })) && (u += 1);
    return u > 0 && (await this.flushManifest()), u;
  }
  async _scheduleThumbnailsAfterRegister(t) {
    try {
      if (this.hasThumbnail(t, "preview")) return;
      const {
        persistHistoryListThumbnailFromLocalAsset: n
      } = await Ie(async () => {
        const {
          persistHistoryListThumbnailFromLocalAsset: r
        } = await Promise.resolve().then(() => ii);
        return {
          persistHistoryListThumbnailFromLocalAsset: r
        };
      }, void 0, import.meta.url);
      await n(t);
    } catch {}
  }
  async setDirectoryHandle(t) {
    if (this.directoryHandle = t, this.directoryPathTauri = null, Gge(null), omt(), this.clearPendingAssetQueue(), t) {
      try {
        await V9r(t), console.log("[LocalCacheManager] Directory handle saved to IndexedDB");
      } catch (n) {
        console.warn("[LocalCacheManager] Failed to persist handle to IDB:", n);
      }
      await this.loadManifest(), this._registerAssetListener(), this._scheduleSyncSavedSkillsToPromptWords(), this._schedulePushScreenwritingFromLocalStorage(), this._schedulePushChatFromLocalStorage(), this._scheduleSyncHuyaSeedanceOssConfig(), this._scheduleMigrateLocalStorageToDisk(), Bet();
    } else this.manifest = null, this.clearIndexes(), this.manifestDirtyAssetIds.clear(), this.manifestDeletedAssetIds.clear(), this._unregisterAssetListener();
  }
  async setDirectoryPathTauri(t) {
    let n = t;
    n && (n = await bEn(n)), !(n === this.directoryPathTauri && this.manifest !== null) && (this.directoryPathTauri = n, Gge(n), this.directoryHandle = null, this.convertFileSrcByAssetId.clear(), this.convertSrcExistsAt.clear(), this.clearPendingAssetQueue(), eWt(), c8r(), omt(), t ? (await this.registerAssetProtocolScope(n), await this.loadManifest(), this._registerAssetListener(), console.log("[LocalCacheManager] Tauri cache path set:", t), this._scheduleSyncSavedSkillsToPromptWords(), this._schedulePushScreenwritingFromLocalStorage(), this._schedulePushChatFromLocalStorage(), this._scheduleSyncHuyaSeedanceOssConfig(), this._scheduleMigrateLocalStorageToDisk(), Bet()) : (this.manifest = null, this.clearIndexes(), this.manifestDirtyAssetIds.clear(), this.manifestDeletedAssetIds.clear(), this._unregisterAssetListener()));
  }
  getDirectoryPathTauri() {
    return this.directoryPathTauri;
  }
  getDirectoryHandle() {
    return this.directoryHandle;
  }
  isAvailable() {
    return this.directoryHandle !== null || this.directoryPathTauri !== null;
  }
  async restoreFromIDB() {
    var t;
    if (this.directoryHandle) return !0;
    try {
      const n = await H9r();
      if (!n) return console.log("[LocalCacheManager] No saved directory handle found in IDB"), !1;
      const r = n;
      let a = "prompt";
      try {
        r.queryPermission && (a = await r.queryPermission({
          mode: "readwrite"
        }), console.log("[LocalCacheManager] queryPermission result:", a));
      } catch {
        console.warn("[LocalCacheManager] queryPermission not supported, trying requestPermission directly");
      }
      if (a !== "granted") try {
        if (!r.requestPermission) return !1;
        a = await r.requestPermission({
          mode: "readwrite"
        }), console.log("[LocalCacheManager] requestPermission result:", a);
      } catch (i) {
        return console.warn("[LocalCacheManager] requestPermission failed (likely no user gesture):", i), !1;
      }
      return a === "granted" ? (this.directoryHandle = n, await this.loadManifest(), this._registerAssetListener(), console.log(`[LocalCacheManager] ✅ Directory restored from IDB: ${n.name}, ${Object.keys(((t = this.manifest) == null ? void 0 : t.assets) || {}).length} assets in manifest`), Bet(), !0) : (console.warn("[LocalCacheManager] Permission not granted:", a), !1);
    } catch (n) {
      return console.warn("[LocalCacheManager] Failed to restore from IDB:", n), !1;
    }
  }
  ensureRestored() {
    return BM() ? this.directoryPathTauri && this.manifest ? this.lastAssetProtocolRoot ? Promise.resolve(!0) : this.registerAssetProtocolScope(this.directoryPathTauri).then(() => !0, () => !1) : (this._restorePromise || (this._restorePromise = Dbe().then(t => (t || (this._restorePromise = null), t))), this._restorePromise) : this.directoryHandle ? Promise.resolve(!0) : (this._restorePromise || (this._restorePromise = this.restoreFromIDB().then(t => (t || (this._restorePromise = null), t))), this._restorePromise);
  }
  getManifest() {
    return this.manifest;
  }
  async ensureManifestLoaded() {
    this.manifest || (this.directoryPathTauri || this.directoryHandle) && (await this.loadManifest());
  }
  hasAsset(t) {
    var n;
    return !!((n = this.manifest) != null && n.assets[t]);
  }
  async getAssetSourcePath(t) {
    var n, r;
    return !this.directoryPathTauri || !((r = (n = this.manifest) == null ? void 0 : n.assets[t]) != null && r.fileName) ? null : Bs(this.directoryPathTauri, this.manifest.assets[t].fileName);
  }
  getAssetManifestMeta(t) {
    var r;
    if (!((r = this.manifest) != null && r.assets[t])) return null;
    const n = this.manifest.assets[t];
    return {
      fileName: n.fileName,
      mimeType: n.mimeType,
      size: n.size
    };
  }
  getSubdirectoryName(t) {
    const n = String(t || "");
    return n.startsWith("image/") ? "images" : n.startsWith("video/") ? "videos" : n.startsWith("audio/") ? "audio" : "other";
  }
  async getSubdirectory(t) {
    if (!this.directoryHandle) return null;
    try {
      return await this.directoryHandle.getDirectoryHandle(t, {
        create: !0
      });
    } catch (n) {
      return console.error(`[LocalCacheManager] Failed to get/create subdirectory '${t}':`, n), null;
    }
  }
  getExtension(t) {
    const n = String(t || "");
    if (n.startsWith("image/")) {
      const r = n.split("/")[1] || "png";
      return r === "jpeg" ? "jpg" : r;
    }
    return n.startsWith("video/") ? n.split("/")[1] || "mp4" : n.startsWith("audio/") ? n.split("/")[1] || "mp3" : "bin";
  }
  async isManifestFilePresentOnDisk(t) {
    const n = t.replace(/\\/g, "/");
    try {
      if (this.directoryPathTauri) {
        const a = /^[A-Za-z]:\//.test(n) || n.startsWith("/") ? n : Bs(this.directoryPathTauri, n);
        return await Fp(a);
      }
      if (this.directoryHandle) {
        const r = n.split("/").filter(Boolean);
        if (r.length >= 2) {
          const a = r[0],
            i = r.slice(1).join("/");
          return await (await this.directoryHandle.getDirectoryHandle(a, {
            create: !1
          })).getFileHandle(i, {
            create: !1
          }), !0;
        }
      }
    } catch {
      return !1;
    }
    return !1;
  }
  async removeStaleAssetFileIfUnreferenced(t, n, r) {
    const a = n == null ? void 0 : n.fileName;
    if (!(!a || !r || a === r || !this.manifest) && !dmt(this.manifest.assets, t, a)) try {
      if (!(await this.isManifestFilePresentOnDisk(a))) return;
      if (this.directoryPathTauri) await hk(Bs(this.directoryPathTauri, a));else if (this.directoryHandle) {
        const i = a.split("/");
        if (i.length >= 2) {
          const o = i[0];
          await (await this.directoryHandle.getDirectoryHandle(o, {
            create: !1
          })).removeEntry(i.slice(1).join("/"));
        }
      }
    } catch (i) {
      this.isFileNotFoundError(i) || console.warn("[LocalCacheManager] Failed to remove stale asset file on overwrite:", a, i);
    }
  }
  restoreManifestAsset(t, n) {
    var r;
    this.manifest && (n != null && n.remoteUrl && KCn(n.remoteUrl) === void 0 && (n = {
      ...n,
      remoteUrl: void 0
    }), this.manifest.assets[t] = n, (r = this.manifest.deletedAssetIds) != null && r.length && (this.manifest.deletedAssetIds = this.manifest.deletedAssetIds.filter(a => a !== t)), this.manifestDirtyAssetIds.add(t), this.manifestDeletedAssetIds.delete(t), this.manifestDirty = !0, this.indexAsset(t, n));
  }
  deleteManifestAsset(t) {
    if (!this.manifest) return;
    delete this.manifest.assets[t];
    const n = new Set(this.manifest.deletedAssetIds || []);
    n.add(t), this.manifest.deletedAssetIds = Array.from(n).slice(-5e3), this.manifestDirtyAssetIds.delete(t), this.manifestDeletedAssetIds.add(t), this.manifestDirty = !0, this.unindexAsset(t);
  }
  indexAsset(t, n) {
    var o, s;
    if (!n) return;
    const r = this.assetIndexKeys.get(t);
    r && (r.urlKey !== void 0 && ((o = this.urlIndex.get(r.urlKey)) == null || o.delete(t)), r.hashKey !== void 0 && ((s = this.hashIndex.get(r.hashKey)) == null || s.delete(t)));
    let a;
    if (typeof n.remoteUrl == "string" && n.remoteUrl.trim()) {
      a = n.remoteUrl;
      let l = this.urlIndex.get(a);
      l || (l = new Set(), this.urlIndex.set(a, l)), l.add(t);
    }
    let i;
    if (typeof n.contentHash == "string" && n.contentHash.trim()) {
      i = n.contentHash;
      let l = this.hashIndex.get(i);
      l || (l = new Set(), this.hashIndex.set(i, l)), l.add(t);
    }
    this.assetIndexKeys.set(t, {
      urlKey: a,
      hashKey: i
    });
  }
  unindexAsset(t) {
    var r, a;
    const n = this.assetIndexKeys.get(t);
    n && (n.urlKey !== void 0 && ((r = this.urlIndex.get(n.urlKey)) == null || r.delete(t)), n.hashKey !== void 0 && ((a = this.hashIndex.get(n.hashKey)) == null || a.delete(t))), this.assetIndexKeys.delete(t);
  }
  clearIndexes() {
    this.urlIndex.clear(), this.hashIndex.clear(), this.assetIndexKeys.clear();
  }
  rebuildIndexes() {
    if (this.clearIndexes(), !!this.manifest) for (const [t, n] of Object.entries(this.manifest.assets)) n && this.indexAsset(t, n);
  }
  findAssetIdsByRemoteUrl(t) {
    const n = String(t || "").trim();
    return n ? Array.from(this.urlIndex.get(n) ?? []) : [];
  }
  findAssetIdsByContentHash(t) {
    const n = String(t || "").trim();
    return n ? Array.from(this.hashIndex.get(n) ?? []) : [];
  }
  purgeManifestEntriesForMissingFile(t) {
    if (!this.manifest) return;
    const n = t.replace(/\\/g, "/");
    let r = !1;
    for (const [a, i] of Object.entries(this.manifest.assets)) i != null && i.fileName && i.fileName.replace(/\\/g, "/") === n && (this.deleteManifestAsset(a), r = !0);
    r && (this.scheduleManifestWrite(), console.debug(`[LocalCacheManager] Purged manifest entries for missing file: ${n}`));
  }
  async computeBlobFingerprint(t) {
    if (typeof crypto > "u" || !crypto.subtle) return "";
    const n = await crypto.subtle.digest("SHA-256", await t.arrayBuffer());
    return Array.from(new Uint8Array(n), r => r.toString(16).padStart(2, "0")).join("");
  }
  parseManifestText(t) {
    try {
      const n = JSON.parse(t);
      if (!n || typeof n != "object" || !n.assets || typeof n.assets != "object") return null;
      if (n.revision = Number(n.revision || 0), n.assets) for (const r of Object.values(n.assets)) {
        const a = r && typeof r.remoteUrl == "string" ? r.remoteUrl.trim() : "";
        a && (/^data:/i.test(a) || /^blob:/i.test(a)) && (r.remoteUrl = void 0);
      }
      return n;
    } catch {
      return null;
    }
  }
  async loadTauriManifestCandidate(t) {
    try {
      const n = await Au(t),
        r = typeof n == "string" ? n : new TextDecoder().decode(n);
      return this.parseManifestText(r);
    } catch {
      return null;
    }
  }
  async loadFsmManifestCandidate(t) {
    if (!this.directoryHandle) return null;
    try {
      const r = await (await this.directoryHandle.getFileHandle(t, {
        create: !1
      })).getFile();
      return this.parseManifestText(await r.text());
    } catch {
      return null;
    }
  }
  async writeFsmManifestBackup() {
    if (this.directoryHandle) try {
      const r = await (await (await this.directoryHandle.getFileHandle("manifest.json", {
          create: !1
        })).getFile()).text(),
        i = await (await this.directoryHandle.getFileHandle("manifest.json.bak", {
          create: !0
        })).createWritable();
      await i.write(r), await i.close();
    } catch {}
  }
  async loadManifest() {
    if (this.manifestDirtyAssetIds.clear(), this.manifestDeletedAssetIds.clear(), this.incrementalDeleteBudget = 0, this.manifestDirty = !1, this.directoryPathTauri) {
      const t = this.directoryPathTauri;
      eWt();
      const n = Bs(t, "manifest.json"),
        r = async () => {
          let a = await this.loadTauriManifestCandidate(n);
          return a || (a = await this.loadTauriManifestCandidate(`${n}.bak`)), a;
        };
      try {
        await kP(t), await g9r(r, t);
        const a = await f9r(t);
        if (a && Object.keys(a.assets || {}).length > 0) {
          const i = this.stripInlineRemoteUrls(a.assets);
          if (this.manifest = a, this.rebuildIndexes(), i.length > 0) {
            console.log(`[LocalCacheManager] 已剥离 ${i.length} 条内联 data:/blob: remoteUrl 并回写清理 manifest`);
            for (const o of i) this.manifestDirtyAssetIds.add(o);
            this.manifestDirty = !0, await this.flushManifest().catch(() => {});
          }
          console.log(`[LocalCacheManager] Manifest loaded from SQLite: ${Object.keys(this.manifest.assets).length} assets`);
          return;
        }
      } catch (a) {
        console.warn("[LocalCacheManager] manifest SQLite load failed:", a);
      }
      if (this.manifest = await this.loadTauriManifestCandidate(n), this.rebuildIndexes(), !this.manifest && (this.manifest = await this.loadTauriManifestCandidate(`${n}.bak`), this.rebuildIndexes(), this.manifest)) {
        this.manifestDirty = !0, await qge(this.manifest, t).catch(() => {}), await this.flushManifest();
        return;
      }
      this.manifest ? (console.log(`[LocalCacheManager] Manifest loaded from JSON: ${Object.keys(this.manifest.assets).length} assets`), qge(this.manifest, t).catch(() => {})) : this.manifest = {
        version: "1.0",
        revision: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assets: {}
      };
      return;
    }
    this.directoryHandle && (this.manifest = await this.loadFsmManifestCandidate("manifest.json"), this.rebuildIndexes(), this.manifest || (this.manifest = await this.loadFsmManifestCandidate("manifest.json.bak"), this.rebuildIndexes(), this.manifest && (console.warn("[LocalCacheManager] Recovered manifest from manifest.json.bak"), this.manifestDirty = !0, await this.flushManifest())), this.manifest ? console.log(`[LocalCacheManager] Manifest loaded: ${Object.keys(this.manifest.assets).length} assets`) : (this.manifest = {
      version: "1.0",
      revision: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assets: {}
    }, console.log("[LocalCacheManager] Created new manifest")));
  }
  stripInlineRemoteUrls(t) {
    const n = [];
    for (const [r, a] of Object.entries(t)) {
      const i = a && typeof a.remoteUrl == "string" ? a.remoteUrl.trim() : "";
      i && (/^data:/i.test(i) || /^blob:/i.test(i)) && (a.remoteUrl = void 0, n.push(r));
    }
    return n;
  }
  scheduleManifestWrite() {
    this.manifestDirty = !0, this.manifestWriteTimer && clearTimeout(this.manifestWriteTimer), this.manifestWriteTimer = setTimeout(() => {
      this.flushManifest({
        respectCanvasInteraction: !0
      });
    }, 300);
  }
  async flushManifest(t) {
    if (!this.manifest || !this.manifestDirty) return;
    if (t != null && t.respectCanvasInteraction && !(t != null && t.force)) try {
      const {
        isCanvasViewInteracting: a,
        isCanvasGenerationBurst: i
      } = await Ie(async () => {
        const {
          isCanvasViewInteracting: o,
          isCanvasGenerationBurst: s
        } = await Promise.resolve().then(() => W2);
        return {
          isCanvasViewInteracting: o,
          isCanvasGenerationBurst: s
        };
      }, void 0, import.meta.url);
      if (a() || i()) {
        this.manifestWriteTimer && clearTimeout(this.manifestWriteTimer), this.manifestWriteTimer = setTimeout(() => {
          this.flushManifest({
            respectCanvasInteraction: !0
          });
        }, 400);
        return;
      }
    } catch {}
    this.manifestWriteTimer && (clearTimeout(this.manifestWriteTimer), this.manifestWriteTimer = null), this.manifest.updatedAt = new Date().toISOString(), this.manifest.revision = Number(this.manifest.revision || 0) + 1;
    const n = async () => {
        var s, l;
        if (this.directoryPathTauri) {
          const d = this.directoryPathTauri;
          try {
            await kP(d);
            const f = Array.from(this.manifestDeletedAssetIds);
            if (this.incrementalDeleteBudget += f.length, this.incrementalDeleteBudget >= 1500) await qge(this.manifest, d), this.incrementalDeleteBudget = 0;else {
              const y = Array.from(this.manifestDirtyAssetIds).filter(v => {
                  var _;
                  return (_ = this.manifest) == null ? void 0 : _.assets[v];
                }),
                b = 500;
              for (let v = 0; v < y.length; v += b) {
                const _ = y.slice(v, v + b).map(w => ({
                  id: w,
                  asset: this.manifest.assets[w]
                }));
                _.length && (await YCn(_, d));
              }
              f.length && (await XCn(f, d)), await imt("revision", String(Number(((s = this.manifest) == null ? void 0 : s.revision) || 0)), d).catch(() => {}), await imt("updated_at", ((l = this.manifest) == null ? void 0 : l.updatedAt) || new Date().toISOString(), d).catch(() => {});
            }
            this.manifestDirtyAssetIds.clear(), this.manifestDeletedAssetIds.clear();
            return;
          } catch (f) {
            console.warn("[LocalCacheManager] manifest SQLite flush failed, fallback JSON:", f);
          }
          const u = JSON.stringify(this.manifest),
            h = Bs(d, "manifest.json"),
            p = await Fr("write_local_manifest_atomic", {
              path: h,
              body: u
            }),
            m = JSON.parse(p);
          this.manifest = m, this.rebuildIndexes(), this.manifestDirtyAssetIds.clear(), this.manifestDeletedAssetIds.clear(), this.incrementalDeleteBudget = 0;
          try {
            await qge(m, d);
          } catch {}
          return;
        }
        if (!this.directoryHandle) return;
        const a = JSON.stringify(this.manifest);
        await this.writeFsmManifestBackup();
        const o = await (await this.directoryHandle.getFileHandle("manifest.json", {
          create: !0
        })).createWritable();
        await o.write(a), await o.close();
      },
      r = async () => {
        const a = typeof navigator < "u" ? navigator.locks : void 0;
        return a ? a.request("qiaodoumayi-local-cache-manifest", n) : n();
      };
    this.manifestWriteSequence = this.manifestWriteSequence.then(r, r), await this.manifestWriteSequence, this.manifestDirty = !1, console.log("[LocalCacheManager] Manifest flushed");
  }
  async saveAssetsBatch(t, n = this.batchWriteConcurrency) {
    let r = 0,
      a = 0;
    for (let i = 0; i < t.length; i += n) {
      const o = t.slice(i, i + n),
        s = await Promise.all(o.map(l => this.saveAsset(l.assetId, l.blob, l.mimeType, l.remoteUrl, l.subdirOverride).then(d => d ? 1 : 0).catch(() => 0)));
      r += s.reduce((l, d) => l + d, 0), a += o.length - s.reduce((l, d) => l + d, 0);
    }
    return {
      success: r,
      failed: a
    };
  }
  async saveAsset(t, n, r, a, i, o) {
    if (!this.manifest || !this.directoryHandle && !this.directoryPathTauri) return !1;
    if (this.processingQueue.has(t)) {
      const u = Date.now();
      for (; this.processingQueue.has(t) && Date.now() - u < 1e4;) await new Promise(h => window.setTimeout(h, 16));
    }
    const s = this.manifest.assets[t];
    let l;
    if (s != null && s.fileName && !(o != null && o.forceReplace)) if (await this.isManifestFilePresentOnDisk(s.fileName)) {
      const h = await this.computeBlobFingerprint(n).catch(() => "");
      if (l = h || void 0, s.size === n.size && s.mimeType === r && s.contentHash && h && s.contentHash === h) return !0;
    } else this.deleteManifestAsset(t), this.scheduleManifestWrite();
    if (s != null && s.fileName && (o != null && o.forceReplace || s.size !== n.size || s.mimeType !== r) && Xne(this.objectUrlKey(t)), !(o != null && o.forceReplace) && a && (a.startsWith("http://") || a.startsWith("https://"))) {
      const u = l ?? (await this.computeBlobFingerprint(n).catch(() => ""));
      l = u || void 0;
      let h = null;
      for (const p of this.findAssetIdsByRemoteUrl(a)) {
        if (p === t) continue;
        const m = this.manifest.assets[p];
        if ((m == null ? void 0 : m.contentHash) === u) {
          h = [p, m];
          break;
        }
      }
      if (h) {
        const [, p] = h;
        if (await this.isManifestFilePresentOnDisk(p.fileName)) return this.restoreManifestAsset(t, {
          ...p,
          cachedAt: Date.now(),
          remoteUrl: a
        }), this.scheduleManifestWrite(), console.log(`[LocalCacheManager] ♻️ Reuse (remoteUrl) asset ${t} -> ${p.fileName}`), this.removeStaleAssetFileIfUnreferenced(t, s, p.fileName), !0;
        this.purgeManifestEntriesForMissingFile(p.fileName);
      }
    }
    const d = a && (a.startsWith("http://") || a.startsWith("https://"));
    try {
      if (d) {
        l = l ?? (await this.computeBlobFingerprint(n));
        let u = null;
        for (const h of this.findAssetIdsByContentHash(l)) {
          const p = this.manifest.assets[h];
          if (!(!p || p.size !== n.size || p.contentHash !== l || p.mimeType !== r) && !(i === "local" && !p.fileName.replace(/\\/g, "/").startsWith("local/"))) {
            u = [h, p];
            break;
          }
        }
        if (u) {
          const [, h] = u;
          if (await this.isManifestFilePresentOnDisk(h.fileName)) return this.restoreManifestAsset(t, {
            ...h,
            cachedAt: Date.now(),
            remoteUrl: a || void 0,
            contentHash: l
          }), this.scheduleManifestWrite(), console.log(`[LocalCacheManager] ♻️ Reuse (content) asset ${t} -> ${h.fileName} (${(n.size / 1024).toFixed(1)} KB)`), this.removeStaleAssetFileIfUnreferenced(t, s, h.fileName), !0;
          this.purgeManifestEntriesForMissingFile(h.fileName);
        }
      }
    } catch (u) {
      console.warn("[LocalCacheManager] Fingerprint compute failed, skip content dedup:", u);
    }
    this.processingQueue.add(t);
    try {
      const u = d ? l ?? (await this.computeBlobFingerprint(n)) : "",
        h = i ?? this.getSubdirectoryName(r),
        p = this.getExtension(r),
        m = RCn().replace(/-/g, ""),
        f = G9r(t).slice(0, 8),
        y = t.replace(/\.[a-z0-9]{1,8}$/i, ""),
        v = (y.length > 16 ? `${y.substring(0, 8)}_${f}_${y.slice(-8)}` : `${y.substring(0, 16)}_${f}`).replace(/[^a-zA-Z0-9_-]/g, "_"),
        _ = `${m}_${v}.${p}`,
        w = `${h}/${_}`;
      if (this.directoryPathTauri) {
        const C = Bs(this.directoryPathTauri, h),
          I = Bs(this.directoryPathTauri, w);
        await qc(C, {
          recursive: !0
        });
        const E = await n.arrayBuffer();
        return await wE(I, new Uint8Array(E)), await this.removeStaleAssetFileIfUnreferenced(t, s, w), this.invalidateConvertSrcCache(t), this.restoreManifestAsset(t, {
          fileName: w,
          mimeType: r,
          size: n.size,
          cachedAt: Date.now(),
          remoteUrl: a || void 0,
          contentHash: u || void 0
        }), this.scheduleManifestWrite(), console.log(`[LocalCacheManager] ✅ Saved (Tauri): ${w} (${(n.size / 1024).toFixed(1)} KB)`), !0;
      }
      const k = await this.getSubdirectory(h);
      if (!k) return !1;
      const S = await (await k.getFileHandle(_, {
        create: !0
      })).createWritable();
      return await S.write(n), await S.close(), await this.removeStaleAssetFileIfUnreferenced(t, s, w), this.invalidateConvertSrcCache(t), this.restoreManifestAsset(t, {
        fileName: w,
        mimeType: r,
        size: n.size,
        cachedAt: Date.now(),
        remoteUrl: a || void 0,
        contentHash: u || void 0
      }), this.scheduleManifestWrite(), console.log(`[LocalCacheManager] ✅ Saved: ${w} (${(n.size / 1024).toFixed(1)} KB)`), !0;
    } catch (u) {
      return console.error(`[LocalCacheManager] ❌ Failed to save asset ${t}:`, u), !1;
    } finally {
      this.processingQueue.delete(t);
    }
  }
  dataUrlToBlob(t) {
    try {
      const [n, r] = t.split(","),
        a = n == null ? void 0 : n.match(/data:([^;]+)/),
        i = (a == null ? void 0 : a[1]) || "image/jpeg",
        o = atob(r || ""),
        s = new Uint8Array(o.length);
      for (let l = 0; l < o.length; l++) s[l] = o.charCodeAt(l);
      return new Blob([s], {
        type: i
      });
    } catch {
      return null;
    }
  }
  async getImageBlobDimensions(t) {
    if (!t.type.startsWith("image/")) return {
      width: 0,
      height: 0
    };
    const n = URL.createObjectURL(t);
    return new Promise(r => {
      const a = new Image();
      a.onload = () => {
        URL.revokeObjectURL(n), r({
          width: a.naturalWidth,
          height: a.naturalHeight
        });
      }, a.onerror = () => {
        URL.revokeObjectURL(n), r({
          width: 0,
          height: 0
        });
      }, a.src = n;
    });
  }
  async isPreviewThumbnailBlobCurrent(t) {
    const n = await this.getImageBlobDimensions(t);
    return n.width <= 0 || n.height <= 0 ? !0 : Math.max(n.width, n.height) <= 528;
  }
  async saveThumbnail(t, n, r, a = "thumbnails") {
    if (!this.isAvailable() || !this.manifest) return !1;
    const i = `${r}_${t}`,
      o = this.dataUrlToBlob(n);
    if (!o) return !1;
    if (this.hasAsset(i)) {
      const l = this.getAssetManifestMeta(i),
        d = l != null && l.fileName ? await this.isManifestFilePresentOnDisk(l.fileName).catch(() => !1) : !1;
      if (r === "preview") {
        if (d) try {
          const u = await this.readAsset(i);
          if (u != null && u.blob && (await this.isPreviewThumbnailBlobCurrent(u.blob))) return !0;
          if (u != null && u.blob && !(await this.isPreviewThumbnailBlobCurrent(u.blob))) await this.removeAsset(i);else return !0;
        } catch {
          return !0;
        } else this.deleteManifestAsset(i), this.scheduleManifestWrite();
      } else {
        const u = o.type === "image/webp" || n.includes("image/webp"),
          h = (l == null ? void 0 : l.mimeType) === "image/webp" || /\.webp$/i.test((l == null ? void 0 : l.fileName) || "");
        if (d && (!u || h)) return !0;
        d && u && !h ? await this.removeAsset(i) : d || (this.deleteManifestAsset(i), this.scheduleManifestWrite());
      }
    }
    const s = await this.saveAsset(i, o, o.type || "image/jpeg", void 0, a);
    return s && console.log(`[LocalCacheManager] 缩略图已保存到 ${a}/: ${i} (${(o.size / 1024).toFixed(1)} KB)`), s;
  }
  hasThumbnail(t, n) {
    return this.hasAsset(`${n}_${t}`);
  }
  async readThumbnail(t, n) {
    const r = `${n}_${t}`,
      a = await this.getConvertFileSrcForAsset(r);
    if (a) {
      try {
        const {
          isCanvasLocalCacheMode: i
        } = await Ie(async () => {
          const {
            isCanvasLocalCacheMode: o
          } = await Promise.resolve().then(() => So);
          return {
            isCanvasLocalCacheMode: o
          };
        }, void 0, import.meta.url);
        if (i()) return a;
      } catch {}
      if (n === "preview") try {
        const i = await this.readAsset(r);
        if (i != null && i.blob && !(await this.isPreviewThumbnailBlobCurrent(i.blob))) return await this.removeAsset(r), this.invalidateConvertSrcCache(r), null;
      } catch {}
      return a;
    }
    return Ele(this.objectUrlKey(r), async () => {
      const i = await this.readAsset(r);
      return i ? n === "preview" && !(await this.isPreviewThumbnailBlobCurrent(i.blob)) ? (await this.removeAsset(r), null) : i.blob : null;
    });
  }
  isFileNotFoundError(t) {
    const n = String((t == null ? void 0 : t.message) || t || "");
    return /os error 2|ENOENT|No such file|not found|找不到指定的文件/i.test(n);
  }
  async pruneMissingManifestAssets(t) {
    var s;
    if (!((s = this.manifest) != null && s.assets)) return 0;
    const n = !!(t != null && t.force),
      r = Math.max(1, (t == null ? void 0 : t.concurrency) ?? 32),
      a = (t == null ? void 0 : t.minIntervalMs) ?? 300 * 1e3,
      i = Date.now();
    if (!n && i - this._lastPrunedAt < a) return 0;
    if (this._prunePromise) return this._prunePromise;
    const o = (async () => {
      const l = new Map();
      for (const h of Object.values(this.manifest.assets)) {
        if (!(h != null && h.fileName)) continue;
        const p = h.fileName.replace(/\\/g, "/");
        l.has(p) || l.set(p, h.fileName);
      }
      const d = Array.from(l.values()),
        u = [];
      for (let h = 0; h < d.length; h += r) {
        const p = d.slice(h, h + r),
          m = await Promise.all(p.map(async f => ({
            fn: f,
            present: await this.isManifestFilePresentOnDisk(f)
          })));
        for (const f of m) f.present || u.push(f.fn);
      }
      for (const h of u) this.purgeManifestEntriesForMissingFile(h);
      return u.length > 0 && (console.debug(`[LocalCacheManager] Pruned ${u.length} missing file path(s) from manifest (force=${n}, total=${d.length})`), await this.flushManifest()), this._lastPrunedAt = Date.now(), u.length;
    })();
    this._prunePromise = o;
    try {
      return await o;
    } finally {
      this._prunePromise = null;
    }
  }
  async readAsset(t, n) {
    var i;
    if (!this.manifest) return null;
    const r = this.manifest.assets[t];
    if (!(r != null && r.fileName)) return null;
    if ((!!((i = r.mimeType) != null && i.startsWith("video/")) || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(r.fileName) || /(?:^|\/)videos\//i.test(r.fileName.replace(/\\/g, "/"))) && (n == null ? void 0 : n.allowVideoBlob) !== !0) try {
      const {
        isCanvasLocalCacheMode: o
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: s
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: s
        };
      }, void 0, import.meta.url);
      if (o()) return console.warn(`[LocalCacheManager] 本地缓存禁止 readAsset 整段视频进 JS 堆: ${t}`), null;
    } catch {}
    if (this.directoryPathTauri) try {
      const o = Bs(this.directoryPathTauri, r.fileName),
        s = await Au(o),
        l = s instanceof Uint8Array ? s : new Uint8Array(s);
      return {
        blob: new Blob([l], {
          type: r.mimeType
        }),
        mimeType: r.mimeType
      };
    } catch (o) {
      return this.isFileNotFoundError(o) || console.warn(`[LocalCacheManager] Failed to read asset ${t} from cache (Tauri):`, o), this.purgeManifestEntriesForMissingFile(r.fileName), null;
    }
    if (!this.directoryHandle) return null;
    try {
      const o = r.fileName.split("/");
      if (o.length !== 2) return console.warn(`[LocalCacheManager] Invalid fileName in manifest: ${r.fileName}`), null;
      const [s, l] = o,
        h = await (await (await this.directoryHandle.getDirectoryHandle(s, {
          create: !1
        })).getFileHandle(l, {
          create: !1
        })).getFile();
      return {
        blob: h,
        mimeType: r.mimeType || h.type || "application/octet-stream"
      };
    } catch (o) {
      return this.isFileNotFoundError(o) || console.warn(`[LocalCacheManager] Failed to read asset ${t} from cache:`, o), this.purgeManifestEntriesForMissingFile(r.fileName), null;
    }
  }
  async readAssetAsUrl(t) {
    const n = String(t || "").trim();
    if (!n) return null;
    const r = await this.getConvertFileSrcForAsset(n);
    return r || Ele(this.objectUrlKey(n), async () => {
      const a = await this.readAsset(n);
      return (a == null ? void 0 : a.blob) || null;
    });
  }
  async acquireAssetUrl(t) {
    const n = String(t || "").trim();
    if (!n) return null;
    const r = await this.getConvertFileSrcForAsset(n);
    return r ? {
      url: r,
      managed: !0,
      release() {}
    } : B4t(this.objectUrlKey(n), async () => {
      const a = await this.readAsset(n);
      return (a == null ? void 0 : a.blob) || null;
    });
  }
  getCachedAssetIds() {
    return this.manifest ? Object.keys(this.manifest.assets) : [];
  }
  async removeAsset(t) {
    var i;
    if (!((i = this.manifest) != null && i.assets[t])) return !0;
    const r = this.manifest.assets[t].fileName,
      a = dmt(this.manifest.assets, t, r);
    if (Xne(this.objectUrlKey(t)), this.invalidateConvertSrcCache(t), a) return this.deleteManifestAsset(t), this.scheduleManifestWrite(), !0;
    try {
      if (await this.isManifestFilePresentOnDisk(r)) {
        if (this.directoryPathTauri) {
          const s = Bs(this.directoryPathTauri, r);
          await hk(s);
        } else if (this.directoryHandle) {
          const s = r.split("/");
          if (s.length >= 2) {
            const [l, d] = [s[0], s.slice(1).join("/")];
            await (await this.directoryHandle.getDirectoryHandle(l, {
              create: !1
            })).removeEntry(d);
          }
        }
      } else this.purgeManifestEntriesForMissingFile(r);
    } catch (o) {
      this.isFileNotFoundError(o) || console.warn("[LocalCacheManager] Failed to remove asset file:", t, o);
    }
    return this.deleteManifestAsset(t), this.scheduleManifestWrite(), !0;
  }
  async removeAssets(t) {
    let n = 0;
    for (const r of t) (await this.removeAsset(r)) && n++;
    return n;
  }
  historyJsonPathTauri() {
    return Bs(this.directoryPathTauri, yo.HISTORY_DIR, yo.HISTORY_JSON);
  }
  legacyHistoryJsonPathTauri() {
    return Bs(this.directoryPathTauri, yo.HISTORY_JSON);
  }
  async migrateLegacyHistoryJsonTauri() {
    if (this.directoryPathTauri) try {
      const t = this.historyJsonPathTauri(),
        n = this.legacyHistoryJsonPathTauri();
      if ((await Fp(t)) || !(await Fp(n))) return;
      await qc(Bs(this.directoryPathTauri, yo.HISTORY_DIR), {
        recursive: !0
      });
      const r = await Au(n),
        a = typeof r == "string" ? r : new TextDecoder().decode(r);
      await ab(t, a);
      try {
        await hk(n);
      } catch {}
      console.log("[LocalCacheManager] migrated history.json → history/");
    } catch (t) {
      console.warn("[LocalCacheManager] migrate legacy history.json skipped:", t);
    }
  }
  async syncHistory(t) {
    if (this.directoryPathTauri) {
      try {
        await qc(Bs(this.directoryPathTauri, yo.HISTORY_DIR), {
          recursive: !0
        });
        const n = this.historyJsonPathTauri();
        await ab(n, JSON.stringify(t, null, 2)), console.log("[LocalCacheManager] History synced (Tauri):", t.length);
      } catch (n) {
        console.error("[LocalCacheManager] Failed to sync history (Tauri):", n);
      }
      return;
    }
    if (this.directoryHandle) try {
      const a = await (await (await this.directoryHandle.getDirectoryHandle(yo.HISTORY_DIR, {
        create: !0
      })).getFileHandle(yo.HISTORY_JSON, {
        create: !0
      })).createWritable();
      await a.write(JSON.stringify(t, null, 2)), await a.close(), console.log(`[LocalCacheManager] History synced: ${t.length} items`);
    } catch (n) {
      console.error("[LocalCacheManager] Failed to sync history:", n);
    }
  }
  async loadHistory() {
    if (this.directoryPathTauri) try {
      await this.migrateLegacyHistoryJsonTauri();
      const t = this.historyJsonPathTauri();
      if (!(await Fp(t))) {
        const a = this.legacyHistoryJsonPathTauri();
        if (!(await Fp(a))) return null;
        const i = await Au(a),
          o = typeof i == "string" ? i : new TextDecoder().decode(i);
        return JSON.parse(o);
      }
      const n = await Au(t),
        r = typeof n == "string" ? n : new TextDecoder().decode(n);
      return JSON.parse(r);
    } catch {
      return null;
    }
    if (!this.directoryHandle) return null;
    try {
      const a = await (await (await (await this.directoryHandle.getDirectoryHandle(yo.HISTORY_DIR, {
        create: !1
      })).getFileHandle(yo.HISTORY_JSON, {
        create: !1
      })).getFile()).text();
      return JSON.parse(a);
    } catch {
      try {
        const r = await (await (await this.directoryHandle.getFileHandle(yo.HISTORY_JSON, {
          create: !1
        })).getFile()).text();
        return JSON.parse(r);
      } catch {
        return null;
      }
    }
  }
  diskLocalStorageFileName(t) {
    return `${String(t).replace(/[^a-zA-Z0-9._-]/g, "_")}.json`;
  }
  diskLocalStorageKeyFromFileName(t) {
    return t.endsWith(".json") ? t.slice(0, -5) : t;
  }
  async readDiskLocalStorageEntry(t) {
    if (!this.isAvailable()) return null;
    const n = this.diskLocalStorageFileName(t);
    try {
      if (this.directoryPathTauri) {
        const o = Bs(this.directoryPathTauri, yo.DISK_LS_DIR, n),
          s = await Au(o);
        return typeof s == "string" ? s : new TextDecoder().decode(s);
      }
      return this.directoryHandle ? await (await (await (await this.directoryHandle.getDirectoryHandle(yo.DISK_LS_DIR, {
        create: !1
      })).getFileHandle(n, {
        create: !1
      })).getFile()).text() : null;
    } catch {
      return null;
    }
  }
  async writeDiskLocalStorageEntry(t, n) {
    if (!this.isAvailable()) return;
    const r = this.diskLocalStorageFileName(t),
      a = n ?? "";
    try {
      if (this.directoryPathTauri) {
        const l = Bs(this.directoryPathTauri, yo.DISK_LS_DIR);
        await qc(l, {
          recursive: !0
        });
        const d = Bs(l, r);
        await ab(d, a);
        return;
      }
      if (!this.directoryHandle) return;
      const s = await (await (await this.directoryHandle.getDirectoryHandle(yo.DISK_LS_DIR, {
        create: !0
      })).getFileHandle(r, {
        create: !0
      })).createWritable();
      await s.write(a), await s.close();
    } catch (i) {
      throw console.error("[LocalCacheManager] writeDiskLocalStorageEntry failed:", t, i), i;
    }
  }
  async removeDiskLocalStorageEntry(t) {
    if (!this.isAvailable()) return;
    const n = this.diskLocalStorageFileName(t);
    try {
      if (this.directoryPathTauri) {
        const a = Bs(this.directoryPathTauri, yo.DISK_LS_DIR, n);
        (await Fp(a)) && (await hk(a));
        return;
      }
      if (!this.directoryHandle) return;
      await (await this.directoryHandle.getDirectoryHandle(yo.DISK_LS_DIR, {
        create: !1
      })).removeEntry(n);
    } catch {}
  }
  async listDiskLocalStorageKeys() {
    if (!this.isAvailable()) return [];
    try {
      if (this.directoryPathTauri) {
        const r = Bs(this.directoryPathTauri, yo.DISK_LS_DIR);
        if (!(await Fp(r))) return [];
        const {
          readDir: a
        } = await Ie(async () => {
          const {
            readDir: o
          } = await Promise.resolve().then(() => oc);
          return {
            readDir: o
          };
        }, void 0, import.meta.url);
        return (await a(r)).filter(o => {
          var s;
          return o.isFile && ((s = o.name) == null ? void 0 : s.endsWith(".json"));
        }).map(o => this.diskLocalStorageKeyFromFileName(o.name));
      }
      if (!this.directoryHandle) return [];
      const t = await this.directoryHandle.getDirectoryHandle(yo.DISK_LS_DIR, {
          create: !1
        }),
        n = [];
      for await (const [r, a] of t.entries()) a.kind === "file" && r.endsWith(".json") && n.push(this.diskLocalStorageKeyFromFileName(r));
      return n;
    } catch {
      return [];
    }
  }
  _scheduleMigrateLocalStorageToDisk() {
    Ie(() => Promise.resolve().then(() => qHe), void 0, import.meta.url).then(t => {
      if (typeof t.migrateAndHydrateDiskLocalStorage == "function") return t.migrateAndHydrateDiskLocalStorage();
    }).catch(() => {});
  }
  async saveChatSessions(t) {
    if (!this.isAvailable()) return !1;
    const n = "Chat",
      r = "chat_sessions.json",
      a = JSON.stringify(t ?? [], null, 2);
    try {
      if (this.directoryPathTauri) {
        const l = Bs(this.directoryPathTauri, n);
        await qc(l, {
          recursive: !0
        });
        const d = Bs(this.directoryPathTauri, n, r);
        return await ab(d, a), !0;
      }
      if (!this.directoryHandle) return !1;
      const s = await (await (await this.directoryHandle.getDirectoryHandle(n, {
        create: !0
      })).getFileHandle(r, {
        create: !0
      })).createWritable();
      return await s.write(a), await s.close(), !0;
    } catch (i) {
      return console.error("[LocalCacheManager] Failed to save chat sessions:", i), !1;
    }
  }
  async loadChatSessions() {
    if (!this.isAvailable()) return null;
    const t = "Chat",
      n = "chat_sessions.json",
      r = "qiaodoumayi_chat_sessions";
    try {
      const a = await this.readDiskLocalStorageEntry(r);
      if (a) {
        const i = JSON.parse(a);
        if (Array.isArray(i)) return i;
      }
    } catch {}
    try {
      if (this.directoryPathTauri) {
        const d = Bs(this.directoryPathTauri, t, n),
          u = await Au(d),
          h = typeof u == "string" ? u : new TextDecoder().decode(u),
          p = JSON.parse(h);
        return Array.isArray(p) ? p : null;
      }
      if (!this.directoryHandle) return null;
      const s = await (await (await (await this.directoryHandle.getDirectoryHandle(t, {
          create: !1
        })).getFileHandle(n, {
          create: !1
        })).getFile()).text(),
        l = JSON.parse(s);
      return Array.isArray(l) ? l : null;
    } catch {
      return null;
    }
  }
  async saveScreenwritingState(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(t ?? {}, null, 2);
    try {
      if (this.directoryPathTauri) {
        const o = Bs(this.directoryPathTauri, yo.SCREENWRITING_DIR);
        await qc(o, {
          recursive: !0
        });
        const s = Bs(o, yo.SCREENWRITING_STATE_FILE);
        return await ab(s, n), console.log("[LocalCacheManager] Screenwriting state synced (Tauri)"), !0;
      }
      if (!this.directoryHandle) return !1;
      const i = await (await (await this.directoryHandle.getDirectoryHandle(yo.SCREENWRITING_DIR, {
        create: !0
      })).getFileHandle(yo.SCREENWRITING_STATE_FILE, {
        create: !0
      })).createWritable();
      return await i.write(n), await i.close(), console.log("[LocalCacheManager] Screenwriting state synced"), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save Screenwriting state:", r), !1;
    }
  }
  async loadScreenwritingState() {
    if (!this.isAvailable()) return null;
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, yo.SCREENWRITING_DIR, yo.SCREENWRITING_STATE_FILE),
          o = await Au(i),
          s = typeof o == "string" ? o : new TextDecoder().decode(o);
        return JSON.parse(s);
      }
      if (!this.directoryHandle) return null;
      const a = await (await (await (await this.directoryHandle.getDirectoryHandle(yo.SCREENWRITING_DIR, {
        create: !1
      })).getFileHandle(yo.SCREENWRITING_STATE_FILE, {
        create: !1
      })).getFile()).text();
      return JSON.parse(a);
    } catch {
      return null;
    }
  }
  _schedulePushScreenwritingFromLocalStorage() {
    Ie(() => Promise.resolve().then(() => jva), void 0, import.meta.url).then(t => {
      if (typeof t.pushScreenwritingLocalToCacheDirectory == "function") return t.pushScreenwritingLocalToCacheDirectory();
    }).catch(() => {});
  }
  _schedulePushChatFromLocalStorage() {
    Ie(() => Promise.resolve().then(() => Ova), void 0, import.meta.url).then(t => {
      if (typeof t.pushChatSessionsFromLocalStorageToCache == "function") return t.pushChatSessionsFromLocalStorageToCache();
    }).catch(() => {});
  }
  _scheduleSyncHuyaSeedanceOssConfig() {
    Ie(() => Promise.resolve().then(() => yjt), void 0, import.meta.url).then(t => {
      if (typeof t.syncHuyaSeedanceOssWithCacheDirectory == "function") return t.syncHuyaSeedanceOssWithCacheDirectory();
    }).then(() => Ie(async () => {
      const {
        HUYA_SEEDANCE_OSS_CONFIG_CHANGED_EVENT: t
      } = await Promise.resolve().then(() => Ah);
      return {
        HUYA_SEEDANCE_OSS_CONFIG_CHANGED_EVENT: t
      };
    }, void 0, import.meta.url).then(({
      HUYA_SEEDANCE_OSS_CONFIG_CHANGED_EVENT: t
    }) => {
      window.dispatchEvent(new CustomEvent(t));
    })).catch(() => {});
  }
  async saveAliyunOssConfig(t) {
    if (!this.isAvailable()) return !1;
    const n = o5t(mz(), t),
      r = JSON.stringify({
        ...n,
        updatedAt: new Date().toISOString()
      }, null, 2);
    try {
      if (this.directoryPathTauri) {
        const s = Bs(this.directoryPathTauri, yo.ALIBABA_CLOUD_OSS_DIR);
        await qc(s, {
          recursive: !0
        });
        const l = Bs(s, yo.ALIBABA_CLOUD_OSS_CONFIG_FILE);
        return await ab(l, r), !0;
      }
      if (!this.directoryHandle) return !1;
      const o = await (await (await this.directoryHandle.getDirectoryHandle(yo.ALIBABA_CLOUD_OSS_DIR, {
        create: !0
      })).getFileHandle(yo.ALIBABA_CLOUD_OSS_CONFIG_FILE, {
        create: !0
      })).createWritable();
      return await o.write(r), await o.close(), !0;
    } catch (a) {
      return console.error("[LocalCacheManager] Failed to save Alibaba Cloud OSS config:", a), !1;
    }
  }
  async loadAliyunOssConfig() {
    if (!this.isAvailable()) return null;
    try {
      let t = null;
      if (this.directoryPathTauri) {
        const r = Bs(this.directoryPathTauri, yo.ALIBABA_CLOUD_OSS_DIR, yo.ALIBABA_CLOUD_OSS_CONFIG_FILE),
          a = await Au(r);
        t = typeof a == "string" ? a : new TextDecoder().decode(a);
      } else this.directoryHandle && (t = await (await (await (await this.directoryHandle.getDirectoryHandle(yo.ALIBABA_CLOUD_OSS_DIR, {
        create: !1
      })).getFileHandle(yo.ALIBABA_CLOUD_OSS_CONFIG_FILE, {
        create: !1
      })).getFile()).text());
      if (!t) return null;
      const n = JSON.parse(t);
      return xVe(n);
    } catch {
      return null;
    }
  }
  async syncPromptWordsSavedSkills(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(Array.isArray(t) ? t : [], null, 2);
    try {
      if (this.directoryPathTauri) {
        const o = Bs(this.directoryPathTauri, iWt);
        await qc(o, {
          recursive: !0
        });
        const s = Bs(o, oWt);
        return await ab(s, n), console.log("[LocalCacheManager] Prompt words skills synced (Tauri):", t.length), !0;
      }
      if (!this.directoryHandle) return !1;
      const i = await (await (await this.directoryHandle.getDirectoryHandle(iWt, {
        create: !0
      })).getFileHandle(oWt, {
        create: !0
      })).createWritable();
      return await i.write(n), await i.close(), console.log("[LocalCacheManager] Prompt words skills synced:", t.length), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to sync Prompt words skills:", r), !1;
    }
  }
  _scheduleSyncSavedSkillsToPromptWords() {
    Ie(() => Promise.resolve().then(() => S7t), void 0, import.meta.url).then(t => {
      if (typeof t.syncSavedSkillsToPromptWordsDir == "function") return t.syncSavedSkillsToPromptWordsDir();
    }).catch(() => {});
  }
  async saveMaterialCategoryState(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(t ?? {}, null, 2);
    try {
      if (this.directoryPathTauri) {
        const o = Bs(this.directoryPathTauri, s4);
        await qc(o, {
          recursive: !0
        });
        const s = Bs(o, qEe);
        return await ab(s, n), !0;
      }
      if (!this.directoryHandle) return !1;
      const i = await (await (await this.directoryHandle.getDirectoryHandle(s4, {
        create: !0
      })).getFileHandle(qEe, {
        create: !0
      })).createWritable();
      return await i.write(n), await i.close(), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save material category state:", r), !1;
    }
  }
  async loadMaterialCategoryState() {
    if (!this.isAvailable()) return null;
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, s4, qEe),
          o = await Au(i),
          s = new TextDecoder().decode(o);
        return JSON.parse(s);
      }
      if (!this.directoryHandle) return null;
      const a = await (await (await (await this.directoryHandle.getDirectoryHandle(s4, {
        create: !1
      })).getFileHandle(qEe, {
        create: !1
      })).getFile()).text();
      return JSON.parse(a);
    } catch {
      return null;
    }
  }
  async saveMaterialLibrarySidebarState(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(t ?? {}, null, 2);
    try {
      if (this.directoryPathTauri) {
        const o = Bs(this.directoryPathTauri, s4);
        await qc(o, {
          recursive: !0
        });
        const s = Bs(o, KEe);
        return await ab(s, n), !0;
      }
      if (!this.directoryHandle) return !1;
      const i = await (await (await this.directoryHandle.getDirectoryHandle(s4, {
        create: !0
      })).getFileHandle(KEe, {
        create: !0
      })).createWritable();
      return await i.write(n), await i.close(), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save material library sidebar state:", r), !1;
    }
  }
  async loadMaterialLibrarySidebarState() {
    if (!this.isAvailable()) return null;
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, s4, KEe),
          o = await Au(i),
          s = new TextDecoder().decode(o);
        return JSON.parse(s);
      }
      if (!this.directoryHandle) return null;
      const a = await (await (await (await this.directoryHandle.getDirectoryHandle(s4, {
        create: !1
      })).getFileHandle(KEe, {
        create: !1
      })).getFile()).text();
      return JSON.parse(a);
    } catch {
      return null;
    }
  }
  async saveAiRoleLibrary(t) {
    if (!this.isAvailable()) return !1;
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, s4);
        await qc(i, {
          recursive: !0
        });
        const o = Bs(i, Kge);
        return await ab(o, t), !0;
      }
      if (!this.directoryHandle) return !1;
      const a = await (await (await this.directoryHandle.getDirectoryHandle(s4, {
        create: !0
      })).getFileHandle(Kge, {
        create: !0
      })).createWritable();
      return await a.write(t), await a.close(), !0;
    } catch (n) {
      return console.error("[LocalCacheManager] Failed to save ai_role_library:", n), !1;
    }
  }
  async loadAiRoleLibraryData() {
    if (!this.isAvailable()) return null;
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, s4, Kge),
          o = await Au(i),
          s = new TextDecoder().decode(o);
        return JSON.parse(s);
      }
      if (!this.directoryHandle) return null;
      const a = await (await (await (await this.directoryHandle.getDirectoryHandle(s4, {
        create: !1
      })).getFileHandle(Kge, {
        create: !1
      })).getFile()).text();
      return JSON.parse(a);
    } catch {
      return null;
    }
  }
  async saveNodeCustomization(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(t, null, 2);
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, yo.NODE_CUSTOMIZATION_FILE_JSON);
        return await ab(i, n), !0;
      }
      if (!this.directoryHandle) return !1;
      const a = await (await this.directoryHandle.getFileHandle(yo.NODE_CUSTOMIZATION_FILE_JSON, {
        create: !0
      })).createWritable();
      return await a.write(n), await a.close(), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save node customization:", r), !1;
    }
  }
  async loadNodeCustomization() {
    if (!this.isAvailable()) return null;
    const t = async n => {
      try {
        if (this.directoryPathTauri) {
          const i = Bs(this.directoryPathTauri, n),
            o = await Au(i);
          return typeof o == "string" ? o : new TextDecoder().decode(o);
        }
        return this.directoryHandle ? await (await (await this.directoryHandle.getFileHandle(n, {
          create: !1
        })).getFile()).text() : null;
      } catch {
        return null;
      }
    };
    for (const n of [yo.NODE_CUSTOMIZATION_FILE_JSON, yo.NODE_CUSTOMIZATION_FILE_PLAIN]) {
      const r = await t(n);
      if (r) try {
        const a = JSON.parse(r);
        if (a && Array.isArray(a.commonNodeTypeIds) && a.commonNodeTypeIds.every(i => typeof i == "string")) return {
          version: 1,
          commonNodeTypeIds: a.commonNodeTypeIds
        };
      } catch {}
    }
    return null;
  }
  async saveToolbarOverflowOrder(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(t, null, 2);
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, yo.TOOLBAR_OVERFLOW_ORDER_FILE_JSON);
        return await ab(i, n), !0;
      }
      if (!this.directoryHandle) return !1;
      const a = await (await this.directoryHandle.getFileHandle(yo.TOOLBAR_OVERFLOW_ORDER_FILE_JSON, {
        create: !0
      })).createWritable();
      return await a.write(n), await a.close(), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save toolbar overflow order:", r), !1;
    }
  }
  async loadToolbarOverflowOrder() {
    if (!this.isAvailable()) return null;
    const t = async n => {
      try {
        if (this.directoryPathTauri) {
          const i = Bs(this.directoryPathTauri, n),
            o = await Au(i);
          return typeof o == "string" ? o : new TextDecoder().decode(o);
        }
        return this.directoryHandle ? await (await (await this.directoryHandle.getFileHandle(n, {
          create: !1
        })).getFile()).text() : null;
      } catch {
        return null;
      }
    };
    for (const n of [yo.TOOLBAR_OVERFLOW_ORDER_FILE_JSON, yo.TOOLBAR_OVERFLOW_ORDER_FILE_PLAIN]) {
      const r = await t(n);
      if (r) try {
        const a = JSON.parse(r);
        if (a && Array.isArray(a.itemKeys) && a.itemKeys.every(i => typeof i == "string")) return {
          version: 1,
          itemKeys: a.itemKeys
        };
      } catch {}
    }
    return null;
  }
  async saveNodeToolsOrder(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(t, null, 2);
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, yo.NODE_TOOLS_ORDER_FILE_JSON);
        return await ab(i, n), !0;
      }
      if (!this.directoryHandle) return !1;
      const a = await (await this.directoryHandle.getFileHandle(yo.NODE_TOOLS_ORDER_FILE_JSON, {
        create: !0
      })).createWritable();
      return await a.write(n), await a.close(), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save node tools order:", r), !1;
    }
  }
  async loadNodeToolsOrder() {
    if (!this.isAvailable()) return null;
    const t = async n => {
      try {
        if (this.directoryPathTauri) {
          const i = Bs(this.directoryPathTauri, n),
            o = await Au(i);
          return typeof o == "string" ? o : new TextDecoder().decode(o);
        }
        return this.directoryHandle ? await (await (await this.directoryHandle.getFileHandle(n, {
          create: !1
        })).getFile()).text() : null;
      } catch {
        return null;
      }
    };
    for (const n of [yo.NODE_TOOLS_ORDER_FILE_JSON, yo.NODE_TOOLS_ORDER_FILE_PLAIN]) {
      const r = await t(n);
      if (r) try {
        const a = JSON.parse(r);
        if (a && Array.isArray(a.itemKeys) && a.itemKeys.every(i => typeof i == "string")) return {
          version: 1,
          itemKeys: a.itemKeys
        };
      } catch {}
    }
    return null;
  }
  async saveToolbarSidebarPins(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(t, null, 2);
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, yo.TOOLBAR_SIDEBAR_PINS_FILE_JSON);
        return await ab(i, n), !0;
      }
      if (!this.directoryHandle) return !1;
      const a = await (await this.directoryHandle.getFileHandle(yo.TOOLBAR_SIDEBAR_PINS_FILE_JSON, {
        create: !0
      })).createWritable();
      return await a.write(n), await a.close(), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save toolbar sidebar pins:", r), !1;
    }
  }
  async loadToolbarSidebarPins() {
    if (!this.isAvailable()) return null;
    const t = async n => {
      try {
        if (this.directoryPathTauri) {
          const i = Bs(this.directoryPathTauri, n),
            o = await Au(i);
          return typeof o == "string" ? o : new TextDecoder().decode(o);
        }
        return this.directoryHandle ? await (await (await this.directoryHandle.getFileHandle(n, {
          create: !1
        })).getFile()).text() : null;
      } catch {
        return null;
      }
    };
    for (const n of [yo.TOOLBAR_SIDEBAR_PINS_FILE_JSON, yo.TOOLBAR_SIDEBAR_PINS_FILE_PLAIN]) {
      const r = await t(n);
      if (r) try {
        const a = JSON.parse(r);
        if (a && Array.isArray(a.pinnedKeys) && a.pinnedKeys.every(i => typeof i == "string")) return {
          version: 1,
          pinnedKeys: a.pinnedKeys
        };
      } catch {}
    }
    return null;
  }
  async saveProjectMemoryMarkdownFiles(t) {
    if (!this.isAvailable()) return !1;
    const n = t.filter(r => r.markdown.trim());
    if (n.length === 0) return !0;
    try {
      if (this.directoryPathTauri) {
        const a = Bs(this.directoryPathTauri, yo.PROJECT_MEMORY_FILES_DIR);
        await qc(a, {
          recursive: !0
        });
        for (const i of n) await ab(Bs(a, i.name), i.markdown);
        return !0;
      }
      if (!this.directoryHandle) return !1;
      const r = await this.directoryHandle.getDirectoryHandle(yo.PROJECT_MEMORY_FILES_DIR, {
        create: !0
      });
      for (const a of n) {
        const o = await (await r.getFileHandle(a.name, {
          create: !0
        })).createWritable();
        await o.write(a.markdown), await o.close();
      }
      return !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save project memory files:", r), !1;
    }
  }
  async saveModelListDisplay(t) {
    if (!this.isAvailable()) return !1;
    const n = JSON.stringify(t, null, 2);
    try {
      if (this.directoryPathTauri) {
        const o = Bs(this.directoryPathTauri, yo.MODEL_LIST_DISPLAY_DIR);
        await qc(o, {
          recursive: !0
        });
        const s = Bs(o, yo.MODEL_LIST_DISPLAY_FILE);
        return await ab(s, n), !0;
      }
      if (!this.directoryHandle) return !1;
      const i = await (await (await this.directoryHandle.getDirectoryHandle(yo.MODEL_LIST_DISPLAY_DIR, {
        create: !0
      })).getFileHandle(yo.MODEL_LIST_DISPLAY_FILE, {
        create: !0
      })).createWritable();
      return await i.write(n), await i.close(), !0;
    } catch (r) {
      return console.error("[LocalCacheManager] Failed to save model list display:", r), !1;
    }
  }
  async loadModelListDisplay() {
    if (!this.isAvailable()) return null;
    const t = n => {
      try {
        const r = JSON.parse(n);
        if (r && Array.isArray(r.hiddenModelIds) && r.hiddenModelIds.every(a => typeof a == "string")) return {
          version: 1,
          hiddenModelIds: r.hiddenModelIds,
          showHiddenModelsInGenNodes: r.showHiddenModelsInGenNodes === !0,
          hideFalModelsInGenNodes: r.hideFalModelsInGenNodes === !0,
          hideOfficialChannelModels: r.hideOfficialChannelModels === !0,
          hideJimengCliModels: r.hideJimengCliModels === !0,
          haiyiChannelInGenNodes: r.haiyiChannelInGenNodes === !0 ? !0 : r.haiyiChannelInGenNodes === !1 ? !1 : null,
          selectedGenModelChannel: r.selectedGenModelChannel === "fal" || r.selectedGenModelChannel === "official" || r.selectedGenModelChannel === "haiyi" || r.selectedGenModelChannel === "jimengCli" || r.selectedGenModelChannel === "platform" ? r.selectedGenModelChannel : "platform",
          selectedChatModelChannel: r.selectedChatModelChannel === "codex" || r.selectedChatModelChannel === "official" || r.selectedChatModelChannel === "haiyi" || r.selectedChatModelChannel === "platform" ? r.selectedChatModelChannel : "platform",
          selectedAudioModelChannel: r.selectedAudioModelChannel === "fal" || r.selectedAudioModelChannel === "official" || r.selectedAudioModelChannel === "haiyi" || r.selectedAudioModelChannel === "platform" ? r.selectedAudioModelChannel : "platform",
          updatedAt: typeof r.updatedAt == "string" ? r.updatedAt : void 0
        };
      } catch {}
      return null;
    };
    try {
      if (this.directoryPathTauri) {
        const i = Bs(this.directoryPathTauri, yo.MODEL_LIST_DISPLAY_DIR, yo.MODEL_LIST_DISPLAY_FILE),
          o = await Au(i),
          s = typeof o == "string" ? o : new TextDecoder().decode(o);
        return t(s);
      }
      if (!this.directoryHandle) return null;
      const a = await (await (await this.directoryHandle.getDirectoryHandle(yo.MODEL_LIST_DISPLAY_DIR, {
        create: !1
      })).getFileHandle(yo.MODEL_LIST_DISPLAY_FILE, {
        create: !1
      })).getFile();
      return t(await a.text());
    } catch {
      return null;
    }
  }
  _registerAssetListener() {
    this._listenerUnsubscribe || (this._listenerUnsubscribe = ni.addListener((t, n) => {
      this.processingQueue.has(t) || (this.pendingAssets.set(t, {
        assetId: t,
        blob: n.blob,
        mimeType: n.mimeType,
        remoteUrl: n.remoteUrl,
        cacheSubdir: n.cacheSubdir
      }), this.pendingAssetFlushTimer && clearTimeout(this.pendingAssetFlushTimer), this.pendingAssetFlushTimer = setTimeout(() => {
        this.pendingAssetFlushTimer = null, this.flushPendingAssets({
          respectCanvasInteraction: !0
        });
      }, 180));
    }), ni.setLocalCacheMirrorListenerActive(!0));
  }
  async waitForCanvasIdle(t = 2e4) {
    if (typeof window > "u") return;
    const {
        isCanvasViewInteracting: n
      } = await Ie(async () => {
        const {
          isCanvasViewInteracting: a
        } = await Promise.resolve().then(() => W2);
        return {
          isCanvasViewInteracting: a
        };
      }, void 0, import.meta.url),
      r = Date.now();
    for (; n() && Date.now() - r < t;) await new Promise(a => window.setTimeout(a, 120));
  }
  clearPendingAssetQueue() {
    this.pendingAssets.clear(), this.pendingAssetFlushTimer && (clearTimeout(this.pendingAssetFlushTimer), this.pendingAssetFlushTimer = null);
  }
  async flushPendingAssets(t) {
    if (this.pendingAssetFlushTimer && (clearTimeout(this.pendingAssetFlushTimer), this.pendingAssetFlushTimer = null), this.pendingAssetFlushPromise) return this.pendingAssetFlushPromise;
    if (this.pendingAssets.size === 0) return;
    const n = (async () => {
      for (; this.pendingAssets.size > 0;) {
        t != null && t.respectCanvasInteraction && !(t != null && t.force) && (await this.waitForCanvasIdle());
        const r = Array.from(this.pendingAssets.values()).slice(0, this.batchWriteConcurrency);
        for (const a of r) this.pendingAssets.get(a.assetId) === a && this.pendingAssets.delete(a.assetId);
        await Promise.all(r.map(async a => {
          if (!(await this.saveAsset(a.assetId, a.blob, a.mimeType, a.remoteUrl, a.cacheSubdir))) return;
          const o = a.cacheSubdir === "local" || a.assetId.startsWith("local_");
          !(a.assetId.startsWith("preview_") || a.assetId.startsWith("thumb_") || a.assetId.endsWith("_thumbnail")) && !o && String(a.mimeType || "").startsWith("image/") && a.blob.size > 50 * 1024 && (await this._saveThumbnailsForAsset(a.assetId, a.blob).catch(() => {}));
        })), await Id();
      }
    })().finally(() => {
      this.pendingAssetFlushPromise = null;
    });
    return this.pendingAssetFlushPromise = n, n;
  }
  async _saveThumbnailsForAsset(t, n) {
    if (!n.type.startsWith("image/") || this.hasThumbnail(t, "preview")) return;
    const {
      persistHistoryListThumbnailLocal: r,
      isLocalListPreviewWebp: a
    } = await Ie(async () => {
      const {
        persistHistoryListThumbnailLocal: i,
        isLocalListPreviewWebp: o
      } = await Promise.resolve().then(() => ii);
      return {
        persistHistoryListThumbnailLocal: i,
        isLocalListPreviewWebp: o
      };
    }, void 0, import.meta.url);
    (await a(t)) || (await r(t, n));
  }
  _unregisterAssetListener() {
    this._listenerUnsubscribe && (console.log("[LocalCacheManager] Unregistering global asset listener"), this._listenerUnsubscribe(), this._listenerUnsubscribe = null);
  }
  async clearDerivedDiskCache() {
    if (!this.manifest || !this.directoryHandle && !this.directoryPathTauri) return {
      removedAssets: 0,
      freedBytes: 0
    };
    const t = "thumbnails/",
      n = [];
    let r = 0;
    for (const [a, i] of Object.entries(this.manifest.assets)) i.fileName.replace(/\\/g, "/").startsWith(t) && (n.push(a), r += i.size || 0);
    await this.removeAssets(n);
    try {
      if (this.directoryPathTauri) {
        const a = Bs(this.directoryPathTauri, "thumbnails");
        (await Fp(a)) && (await hk(a, {
          recursive: !0
        })), await qc(a, {
          recursive: !0
        });
      } else if (this.directoryHandle) try {
        const a = await this.directoryHandle.getDirectoryHandle("thumbnails", {
          create: !1
        });
        for await (const [i] of a.entries()) await a.removeEntry(i, {
          recursive: !0
        });
      } catch {}
    } catch (a) {
      console.warn("[LocalCacheManager] Failed to clear derived disk cache directory:", a);
    }
    return await this.flushManifest(), {
      removedAssets: n.length,
      freedBytes: r
    };
  }
  getStats() {
    if (!this.manifest) return {
      count: 0,
      totalSize: 0,
      formattedSize: "0 B"
    };
    const t = new Map();
    Object.values(this.manifest.assets).forEach(a => {
      t.has(a.fileName) || t.set(a.fileName, a);
    });
    const n = Array.from(t.values()),
      r = n.reduce((a, i) => a + i.size, 0);
    return {
      count: n.length,
      totalSize: r,
      formattedSize: this.formatBytes(r)
    };
  }
  formatBytes(t) {
    if (t === 0) return "0 B";
    const n = 1024,
      r = ["B", "KB", "MB", "GB"],
      a = Math.floor(Math.log(t) / Math.log(n));
    return `${(t / Math.pow(n, a)).toFixed(2)} ${r[a]}`;
  }
  reset() {
    this._unregisterAssetListener(), this.clearBlobUrlCache(), this.clearPendingAssetQueue(), this.directoryHandle = null, this.directoryPathTauri = null, Gge(null), this.manifest = null, this.clearIndexes(), this.manifestDirtyAssetIds.clear(), this.manifestDeletedAssetIds.clear(), this.incrementalDeleteBudget = 0, this.manifestDirty = !1, this._restorePromise = null, this.manifestWriteTimer && (clearTimeout(this.manifestWriteTimer), this.manifestWriteTimer = null), W9r().catch(() => {});
  }
};

On(yo, "CONVERT_SRC_EXISTS_TTL_MS", 3e4), On(yo, "CONVERT_SRC_URL_CACHE_MAX", 2048), On(yo, "HISTORY_DIR", "history"), On(yo, "HISTORY_JSON", "history.json"), On(yo, "DISK_LS_DIR", "localStorage"), On(yo, "SCREENWRITING_DIR", "Screenwriting"), On(yo, "SCREENWRITING_STATE_FILE", "screenwriting_state.json"), On(yo, "NODE_CUSTOMIZATION_FILE_JSON", "Node customization.json"), On(yo, "NODE_CUSTOMIZATION_FILE_PLAIN", "Node customization"), On(yo, "TOOLBAR_OVERFLOW_ORDER_FILE_JSON", "Toolbar overflow order.json"), On(yo, "TOOLBAR_OVERFLOW_ORDER_FILE_PLAIN", "Toolbar overflow order"), On(yo, "TOOLBAR_SIDEBAR_PINS_FILE_JSON", "Toolbar sidebar pins.json"), On(yo, "TOOLBAR_SIDEBAR_PINS_FILE_PLAIN", "Toolbar sidebar pins"), On(yo, "NODE_TOOLS_ORDER_FILE_JSON", "Node tools order.json"), On(yo, "NODE_TOOLS_ORDER_FILE_PLAIN", "Node tools order"), On(yo, "PROJECT_MEMORY_FILES_DIR", "Memory"), On(yo, "MODEL_LIST_DISPLAY_DIR", "Model list display"), On(yo, "MODEL_LIST_DISPLAY_FILE", "model_list_display.json"), On(yo, "ALIBABA_CLOUD_OSS_DIR", "Alibaba Cloud OSS"), On(yo, "ALIBABA_CLOUD_OSS_CONFIG_FILE", "alibaba-cloud-oss-config.json");

let umt = yo;

const Ur = new umt();

async function KCt(e) {
  return Ur.saveAiRoleLibrary(e);
}

async function QCt() {
  return Ur.loadAiRoleLibraryData();
}

let Fet,
  QEe = null;

function q9r() {
  try {
    const e = localStorage.getItem("qiaodoumayi_cache_directory_config");
    return e === Fet || (Fet = e, QEe = e ? JSON.parse(e) : null), QEe;
  } catch {
    return Fet = null, QEe = null, null;
  }
}

async function Dbe() {
  try {
    const e = q9r();
    if (!(e != null && e.enabled) || !e.directoryPath) return Ur.isAvailable();
    if (BM()) {
      const t = await bEn(e.directoryPath);
      try {
        if (!(await Fp(t))) return jbe(t), !1;
      } catch {
        return jbe(t), !1;
      }
      return await Ur.setDirectoryPathTauri(e.directoryPath), jbe(null), Ur.isAvailable();
    }
    return await Ur.ensureRestored();
  } catch {
    return Ur.isAvailable();
  }
}

async function vEn() {
  var a;
  const e = (a = Ur.getDirectoryPathTauri()) == null ? void 0 : a.trim();
  if (!e) return null;
  const t = /^[A-Za-z]:[\\/]/.test(e),
    n = e.startsWith("\\\\"),
    r = /^\/[^/]/.test(e);
  if (t || n) return e.replace(/\//g, "\\");
  if (r) return e;
  if (BM()) try {
    const {
        documentDir: i,
        join: o
      } = await Ie(async () => {
        const {
          documentDir: d,
          join: u
        } = await Promise.resolve().then(() => wT);
        return {
          documentDir: d,
          join: u
        };
      }, void 0, import.meta.url),
      s = await i(),
      l = e.replace(/^[\\/]+/, "");
    return await o(s, l);
  } catch (i) {
    return console.warn("[CacheDirectory] getResolvedCacheRootAbsolutePath failed:", i), e;
  }
  return e;
}

(() => {
  try {
    const e = localStorage.getItem("qiaodoumayi_cache_directory_config");
    if (e) {
      const t = JSON.parse(e);
      if (t.enabled && t.directoryPath) {
        if (BM()) {
          const n = () => {
            Dbe().then(r => {
              r && console.log("[LocalCacheManager] ✅ Tauri cache path restored from config");
            });
          };
          typeof requestAnimationFrame < "u" ? requestAnimationFrame(() => setTimeout(n, 0)) : setTimeout(n, 0);
          return;
        }
        console.log("[LocalCacheManager] Auto-restoring directory handle on module load..."), Dbe().then(n => {
          if (n) console.log("[LocalCacheManager] ✅ Auto-restore successful (silent)");else {
            console.log("[LocalCacheManager] ⏳ Silent restore failed, will retry on first user interaction");
            const r = () => {
              document.removeEventListener("click", r, !0), document.removeEventListener("keydown", r, !0), document.removeEventListener("pointerdown", r, !0), setTimeout(() => {
                Dbe().then(a => {
                  a ? console.log("[LocalCacheManager] ✅ Restored after user interaction") : console.warn("[LocalCacheManager] ⚠️ Restore failed even after user interaction");
                });
              }, 50);
            };
            document.addEventListener("click", r, {
              once: !0,
              capture: !0
            }), document.addEventListener("keydown", r, {
              once: !0,
              capture: !0
            }), document.addEventListener("pointerdown", r, {
              once: !0,
              capture: !0
            });
          }
        });
      }
    }
  } catch {}
})();

const wEn = () => {
    const [e, t] = g.useState(() => {
        try {
          const d = localStorage.getItem("qiaodoumayi_cache_directory_config");
          if (d) {
            const u = JSON.parse(d);
            return {
              enabled: u.enabled || !1,
              directoryHandle: null,
              directoryPath: u.directoryPath || ""
            };
          }
        } catch (d) {
          console.error("[CacheDirectory] Failed to load config:", d);
        }
        return {
          enabled: !1,
          directoryHandle: null,
          directoryPath: ""
        };
      }),
      n = g.useRef(null),
      r = g.useCallback(d => {
        t(u => {
          const h = {
            ...u,
            ...d
          };
          d.directoryHandle !== void 0 && (n.current = d.directoryHandle);
          try {
            localStorage.setItem("qiaodoumayi_cache_directory_config", JSON.stringify({
              enabled: h.enabled,
              directoryPath: h.directoryPath
            }));
          } catch (p) {
            console.error("[CacheDirectory] Failed to save config:", p);
          }
          return h;
        });
      }, []);
    g.useEffect(() => {
      if (!e.enabled || !e.directoryPath) return;
      if (BM()) {
        if (Ur.getDirectoryPathTauri() === e.directoryPath) return;
        Ur.setDirectoryPathTauri(e.directoryPath);
        return;
      }
      if (n.current) return;
      let d = !1;
      return (async () => {
        console.log("[CacheDirectory] Hook: waiting for directory handle restore...");
        const u = await Ur.ensureRestored();
        if (!d) if (u) {
          const h = Ur.getDirectoryHandle();
          n.current = h, t(p => ({
            ...p,
            directoryHandle: h
          })), console.log("[CacheDirectory] ✅ Hook: directory handle synced");
        } else console.warn("[CacheDirectory] ⚠️ Could not restore directory handle. Showing re-auth prompt.");
      })(), () => {
        d = !0;
      };
    }, []);
    const a = g.useCallback(async () => {
        if (BM()) try {
          if (jb()) return alert(x(pR("migration_in_progress"))), !1;
          try {
            const {
              taskRuntimeStore: u
            } = await Ie(async () => {
              const {
                taskRuntimeStore: h
              } = await Promise.resolve().then(() => c8n);
              return {
                taskRuntimeStore: h
              };
            }, void 0, import.meta.url);
            if (u.hasActiveGeneratingTasks()) return alert(x(pR("generation_in_progress"))), !1;
          } catch {}
          const d = await WE({
            directory: !0,
            multiple: !1,
            title: nxe() ? "连接此文件夹" : "选择资源缓存目录"
          });
          if (d && typeof d == "string") {
            const u = Ur.getDirectoryPathTauri(),
              h = HCt(d, u);
            if (!h.ok) return alert(x(pR(h.error))), !1;
            const p = await mEn(d, u);
            if (!p.ok) return alert(x(pR(p.error || "invalid_path"))), !1;
            let m = !1;
            if (u) try {
              m = await Fp(u);
            } catch {
              m = !1;
            }
            const f = fEn(u, d, p, m);
            if ("error" in f) return alert(x(pR(f.error))), !1;
            if (u && !window.confirm(x("将保存当前内容并刷新界面，切换到所选目录。对话、项目和历史记录各自保留在原目录，不会复制或合并；切回原目录即可查看。继续？"))) return !1;
            if (!$Ct("switch")) return alert(x(pR("migration_in_progress"))), !1;
            try {
              if (u) {
                const {
                    studioActivitySnapshot: y
                  } = await Ie(async () => {
                    const {
                      studioActivitySnapshot: w
                    } = await Promise.resolve().then(() => uZr);
                    return {
                      studioActivitySnapshot: w
                    };
                  }, void 0, import.meta.url),
                  b = y();
                if (b.chat.size || b.skill.size || b.canvas.size) throw new Error(x("请等待对话和生成任务完成后再更换缓存目录。"));
                await MSn();
                const v = window.__qdmEmergencySave;
                if (v && !(await v("cache-directory-switch"))) throw new Error(x("当前项目保存失败，未切换缓存目录。"));
                await Ur.flushPendingAssets({
                  force: !0
                }), await Ur.flushManifest({
                  force: !0
                });
                const {
                  flushDiskLocalStorage: _
                } = await Ie(async () => {
                  const {
                    flushDiskLocalStorage: w
                  } = await Promise.resolve().then(() => qHe);
                  return {
                    flushDiskLocalStorage: w
                  };
                }, void 0, import.meta.url);
                return await _(), localStorage.setItem(NDe, JSON.stringify({
                  source: u,
                  target: d
                })), window.location.reload(), !0;
              }
              return await Ur.setDirectoryPathTauri(d), n.current = null, r({
                directoryHandle: null,
                directoryPath: d,
                enabled: !0
              }), jbe(null), console.log("[CacheDirectory] Tauri cache directory selected:", d, f.mode), !0;
            } finally {
              GCt();
            }
          }
          return !1;
        } catch (d) {
          if (d.name === "AbortError") return !1;
          console.error("[CacheDirectory] Tauri directory selection failed:", d);
          const u = d instanceof Error ? d.message : String(d);
          return alert(x("选择目录失败：{0}", pR(u) !== u ? pR(u) : u)), !1;
        }
        if ("showDirectoryPicker" in window) try {
          const d = await window.showDirectoryPicker();
          return n.current = d, await Ur.setDirectoryHandle(d), r({
            directoryHandle: d,
            directoryPath: d.name || "已选择文件夹",
            enabled: !0
          }), console.log("[CacheDirectory] Directory selected:", d.name), !0;
        } catch (d) {
          return d.name === "AbortError" || (console.error("[CacheDirectory] Directory selection failed:", d), alert(x("选择文件夹失败：{0}", d instanceof Error ? d.message : String(d)))), !1;
        } else return alert(x("您的浏览器不支持文件夹选择功能。请使用 Chrome、Edge 或 Opera 浏览器。")), !1;
      }, [r]),
      i = g.useCallback(async (d, u, h, p, m) => {
        !e.enabled || !Ur.isAvailable() || (await Ur.saveAsset(d, u, h, p, m));
      }, [e.enabled]),
      o = g.useCallback(d => {
        if (d) {
          const u = !!n.current,
            h = BM() && e.directoryPath;
          if (!u && !h) {
            alert(x("请先选择缓存目录"));
            return;
          }
          h && Ur.setDirectoryPathTauri(e.directoryPath);
        }
        d || (n.current = null, Ur.flushPendingAssets().then(() => Ur.flushManifest()).finally(() => Ur.reset())), r({
          enabled: d
        });
      }, [r, e.directoryPath]),
      s = g.useCallback(async d => {
        try {
          const u = await ni.getAssetRecord(d);
          return u && u.blob ? (await i(d, u.blob, u.mimeType || u.blob.type, u.remoteUrl, u.cacheSubdir), !0) : !1;
        } catch (u) {
          return console.error("[CacheDirectory] Manual save failed:", u), !1;
        }
      }, [i]),
      l = g.useCallback(async d => {
        !e.enabled || !Ur.isAvailable() || (await Ur.syncHistory(d));
      }, [e.enabled]);
    return {
      config: e,
      selectDirectory: a,
      setEnabled: o,
      saveAssetToDirectory: i,
      manualSaveAsset: s,
      syncHistory: l,
      manager: Ur
    };
  },
  Ha = Object.freeze(Object.defineProperty({
    __proto__: null,
    AI_ROLE_LIBRARY_FILE: Kge,
    detectDesktopPathCacheEnv: yEn,
    ensureCacheRootReadyForWrite: Dbe,
    getResolvedCacheRootAbsolutePath: vEn,
    hasOtherManifestFileReferences: dmt,
    loadAiRoleLibraryData: QCt,
    localCacheManager: Ur,
    saveAiRoleLibrary: KCt,
    useCacheDirectory: wEn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  zae = "__QDMY_DISK_V1__",
  YCt = 4096,
  ALe = new Set(["qiaodoumayi_history", "qiaodoumayi_chat_sessions", "qiaodoumayi_platform_pricing_cache", "qiaodoumayi_platform_pricing_cache_v1", "qiaodoumayi_global_oss_upload_dedup_v1", "qiaodoumayi_saved_skills", "qiaodoumayi_history_deleted_urls", "qiaodoumayi_history_deleted_ids", "qiaodoumayi_prompt_library", "qiaodoumayi_api_configs", "qiaodoumayi_api_providers_v1", "qiaodoumayi_material_lib_global_oss_index", "qiaodoumayi_material_lib_backup_oss_index"]),
  A5 = new Set(["qiaodoumayi_history", "qiaodoumayi_chat_sessions"]),
  Mj = new Map(),
  MY = new Set(),
  are = new Map(),
  SLe = new Map();

let xEn = !1,
  sH = null,
  nO = null;

function _En(e) {
  nO = e;
}

function V7(e) {
  return e === zae;
}

function XCt() {
  try {
    return Ur.isAvailable();
  } catch {
    return !1;
  }
}

function ILe(e) {
  return MY.has(e);
}

function K9r() {
  return xEn;
}

function kEn(e, t) {
  return XCt() ? ALe.has(e) ? !0 : t.length >= YCt : !1;
}

function JCt(e) {
  if (MY.has(e)) return A5.has(e) ? null : Mj.has(e) ? Mj.get(e) : null;
}

function ZCt(e, t) {
  MY.add(e), A5.has(e) ? Mj.delete(e) : Mj.set(e, t), Q9r(e, t);
}

function hmt(e) {
  Mj.delete(e), MY.delete(e), Y9r(e);
}

function sWt(e, t) {
  if (MY.add(e), A5.has(e)) {
    Mj.delete(e);
    return;
  }
  Mj.set(e, t);
}

function AEn(e, t) {
  const n = (are.get(e) ?? Promise.resolve()).then(async () => {
    Ur.isAvailable() && (t === null ? await Ur.removeDiskLocalStorageEntry(e) : await Ur.writeDiskLocalStorageEntry(e, t), SLe.delete(e));
  }).catch(r => {
    SLe.set(e, r), console.warn("[cacheDirLocalStorage] 更新磁盘失败:", e, r);
  }).finally(() => {
    are.get(e) === n && are.delete(e);
  });
  return are.set(e, n), n;
}

function Q9r(e, t) {
  return AEn(e, t);
}

function Y9r(e) {
  return AEn(e, null);
}

function X9r(e) {
  const t = e.trim();
  return t === "" || t === "[]" || t === "{}" || t === "null";
}

function J9r(e, t) {
  return e && !V7(e) && t ? X9r(e) && t.length > e.length ? t : e.length >= t.length ? e : t : e && !V7(e) ? e : t;
}

async function SEn() {
  return sH || (sH = (async () => {
    const {
      localCacheManager: e,
      ensureCacheRootReadyForWrite: t
    } = await Ie(async () => {
      const {
        localCacheManager: l,
        ensureCacheRootReadyForWrite: d
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: l,
        ensureCacheRootReadyForWrite: d
      };
    }, void 0, import.meta.url);
    if (!(e.isAvailable() || (await t())) || !nO) return;
    const r = await e.listDiskLocalStorageKeys();
    for (const l of r) {
      if (A5.has(l)) {
        MY.add(l);
        continue;
      }
      const d = await e.readDiskLocalStorageEntry(l);
      d != null && sWt(l, d);
    }
    const a = [];
    for (let l = 0; l < window.localStorage.length; l++) {
      const d = window.localStorage.key(l);
      d && a.push(d);
    }
    const i = new Set([...r, ...a, ...ALe]);
    let o = 0,
      s = 0;
    for (const l of i) {
      const d = nO.getItem(l);
      if (A5.has(l) && r.includes(l)) {
        if (MY.add(l), Mj.delete(l), !d || V7(d)) {
          if (!V7(d)) try {
            nO.setItem(l, zae);
          } catch {}
          o++;
          continue;
        }
        await e.writeDiskLocalStorageEntry(l, d), s += d.length;
        try {
          nO.setItem(l, zae);
        } catch {
          nO.removeItem(l);
        }
        o++;
        continue;
      }
      const u = A5.has(l) ? await e.readDiskLocalStorageEntry(l) : Mj.get(l) ?? null,
        h = J9r(d, u);
      if (!(!h || !(ALe.has(l) || h.length >= YCt))) {
        sWt(l, h), await e.writeDiskLocalStorageEntry(l, h), d && !V7(d) && (s += d.length);
        try {
          nO.setItem(l, zae);
        } catch {
          try {
            nO.removeItem(l);
          } catch {}
        }
        o++;
      }
    }
    xEn = !0, o > 0 && console.log(`[cacheDirLocalStorage] 已迁移 ${o} 个大 key 至缓存目录 localStorage/，约释放浏览器配额 ${(s / 1024).toFixed(0)} KB`);
  })().finally(() => {
    sH = null;
  }), sH);
}

function IEn() {
  if (typeof window > "u") return;
  const e = () => {
    SEn();
  };
  window.addEventListener(Tf, e), Ie(async () => {
    const {
      ensureCacheRootReadyForWrite: t
    } = await Promise.resolve().then(() => Ha);
    return {
      ensureCacheRootReadyForWrite: t
    };
  }, void 0, import.meta.url).then(({
    ensureCacheRootReadyForWrite: t
  }) => {
    t().then(n => {
      n && e();
    });
  });
}

async function Z9r() {
  for (sH && (await sH); are.size;) await Promise.all(are.values());
  if (SLe.size) throw SLe.values().next().value;
}

const qHe = Object.freeze(Object.defineProperty({
    __proto__: null,
    COLD_DISK_LS_KEYS: A5,
    DISK_LS_MARKER: zae,
    DISK_LS_OFFLOAD_KEYS: ALe,
    DISK_LS_OFFLOAD_MIN_BYTES: YCt,
    flushDiskLocalStorage: Z9r,
    getDiskMirroredValue: JCt,
    isDiskBackedKey: ILe,
    isDiskLsMarker: V7,
    isDiskStorageReady: XCt,
    isMigrationDone: K9r,
    migrateAndHydrateDiskLocalStorage: SEn,
    registerDiskLocalStorageOnCacheReady: IEn,
    registerRawLocalStorageOps: _En,
    removeDiskMirroredKey: hmt,
    setDiskMirroredValue: ZCt,
    shouldOffloadToDisk: kEn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Uw = new Map(),
  CEn = 3600 * 1e3;

function fO() {
  return performance.now();
}

function eEt(e, t = CEn) {
  if (A5.has(e) && ILe(e)) return null;
  const n = Uw.get(e),
    r = fO();
  if (n && r - n.timestamp < t) return n.value;
  let a = null;
  try {
    a = localStorage.getItem(e);
  } catch {
    a = null;
  }
  return Uw.set(e, {
    value: a,
    timestamp: r
  }), a;
}

function eRr() {
  Uw.clear();
}

function tRr(e = CEn) {
  const t = fO();
  let n = 0;
  for (const [r, a] of Uw) t - a.timestamp < e || (Uw.delete(r), n += 1);
  return n;
}

function nRr() {
  if (!(typeof window > "u") && !globalThis.__qdmy_localStorageShortCache_patched__) try {
    const e = Object.getPrototypeOf(window.localStorage),
      t = e.getItem.bind(window.localStorage),
      n = e.setItem.bind(window.localStorage),
      r = e.removeItem.bind(window.localStorage),
      a = e.clear.bind(window.localStorage);
    _En({
      getItem: t,
      setItem: n,
      removeItem: r
    }), window.localStorage.getItem = function (o) {
      const s = JCt(o);
      if (s !== void 0) return A5.has(o) || Uw.set(o, {
        value: s,
        timestamp: fO()
      }), s;
      const l = t(o);
      return V7(l) ? (Uw.set(o, {
        value: null,
        timestamp: fO()
      }), null) : (A5.has(o) || Uw.set(o, {
        value: l,
        timestamp: fO()
      }), l);
    }, window.localStorage.setItem = function (o, s) {
      if (kEn(o, s)) {
        ZCt(o, s), A5.has(o) ? Uw.delete(o) : Uw.set(o, {
          value: s,
          timestamp: fO()
        });
        try {
          n(o, zae);
        } catch {
          try {
            r(o);
          } catch {}
        }
        return;
      }
      ILe(o) && hmt(o), n(o, s), A5.has(o) ? Uw.delete(o) : Uw.set(o, {
        value: s,
        timestamp: fO()
      });
    }, window.localStorage.removeItem = function (o) {
      ILe(o) && hmt(o), r(o), Uw.set(o, {
        value: null,
        timestamp: fO()
      });
    }, window.localStorage.clear = function () {
      a(), Uw.clear();
    }, window.addEventListener("storage", i => {
      if (i.storageArea === window.localStorage) {
        if (i.key == null) {
          Uw.clear();
          return;
        }
        Uw.delete(i.key);
      }
    }), globalThis.__qdmy_localStorageShortCache_patched__ = !0, IEn();
  } catch (e) {
    console.warn("[localStorageShortCache] install interceptors failed:", e);
  }
}

nRr();

var YEe = {},
  lWt;

function rRr() {
  if (lWt) return YEe;
  lWt = 1;
  var e = b4n();
  return YEe.createRoot = e.createRoot, YEe.hydrateRoot = e.hydrateRoot, YEe;
}

var aRr = rRr();

const cWt = j4e(aRr),
  iRr = "#212121",
  oRr = "#ffffff",
  dWt = 32;

function sRr(e) {
  return e === "light" ? "light" : "dark";
}

function lRr(e) {
  return e === "light" ? oRr : iRr;
}

function y5e(e) {
  var t, n;
  return e ? "__TAURI__" in e || ((t = e.location) == null ? void 0 : t.protocol) === "tauri:" ? !0 : typeof ((n = e.__TAURI_INTERNALS__) == null ? void 0 : n.invoke) == "function" : !1;
}

function cRr(e, t, n) {
  const r = e !== "light";
  t.classList.toggle("theme-dark", r), t.classList.toggle("theme-light", !r), t.style.colorScheme = r ? "dark" : "light", n && (n.style.backgroundColor = r ? "#09090b" : "#f4f4f5");
}

async function dRr(e) {
  if (typeof window > "u" || !y5e(window)) return !1;
  try {
    const {
      getCurrentWindow: t
    } = await Ie(async () => {
      const {
        getCurrentWindow: n
      } = await Promise.resolve().then(() => ede);
      return {
        getCurrentWindow: n
      };
    }, void 0, import.meta.url);
    return await t().setTheme(sRr(e)), !0;
  } catch {
    return !1;
  }
}

const tEt = "" + new URL("window-icon-BjcL9h3W.png", import.meta.url).href;

function EEn({
  isDark: e,
  leading: t,
  menus: n,
  title: r = "AIYOUPLUS",
  hideLogo: a = !1
}) {
  on();
  const [i] = g.useState(() => typeof window < "u" && y5e(window)),
    [o, s] = g.useState(!1);
  if (g.useEffect(() => {
    if (!i) return;
    const m = document.documentElement;
    if (m.dataset.desktopTitlebar = "true", m.style.setProperty("--desktop-titlebar-height", `${dWt}px`), window.__LINGO_ELECTRON_NATIVE_SHELL__) {
      const b = /Mac/i.test(navigator.platform) || /Mac OS X/i.test(navigator.userAgent),
        v = /Win/i.test(navigator.platform) || /Windows/i.test(navigator.userAgent);
      m.dataset.electronShell = b ? "mac" : v ? "win" : "linux";
    }
    let f,
      y = !1;
    return (async () => {
      try {
        const {
            getCurrentWindow: b
          } = await Ie(async () => {
            const {
              getCurrentWindow: w
            } = await Promise.resolve().then(() => ede);
            return {
              getCurrentWindow: w
            };
          }, void 0, import.meta.url),
          v = b(),
          _ = await v.isMaximized();
        y || s(_), f = await v.onResized(async () => {
          s(await v.isMaximized());
        });
      } catch {}
    })(), () => {
      y = !0, f == null || f(), delete m.dataset.desktopTitlebar, m.style.removeProperty("--desktop-titlebar-height");
    };
  }, [i]), !i) return null;
  const l = lRr(e ? "dark" : "light"),
    d = e ? "rgba(224, 224, 224, 0.72)" : "rgba(24, 24, 27, 0.62)",
    u = e ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
    h = e ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.18)",
    p = async m => {
      const {
          getCurrentWindow: f
        } = await Ie(async () => {
          const {
            getCurrentWindow: b
          } = await Promise.resolve().then(() => ede);
          return {
            getCurrentWindow: b
          };
        }, void 0, import.meta.url),
        y = f();
      m === "minimize" ? await y.minimize() : m === "toggleMaximize" ? await y.toggleMaximize() : await y.close();
    };
  return c.jsxs("div", {
    className: "desktop-titlebar",
    "data-tauri-drag-region": !0,
    style: {
      height: dWt,
      background: `var(--desktop-titlebar-background, ${l})`,
      borderBottom: `1px solid var(--desktop-titlebar-border, ${h})`,
      color: d
    },
    onDoubleClick: () => void p("toggleMaximize"),
    children: [c.jsxs("div", {
      className: "desktop-titlebar-brand",
      "data-tauri-drag-region": !0,
      children: [t ? c.jsx("div", {
        className: "desktop-titlebar-leading",
        children: t
      }) : null, a ? null : c.jsx("span", {
        className: "desktop-titlebar-logo",
        children: c.jsx("img", {
          src: tEt,
          width: 18,
          height: 18,
          alt: "",
          draggable: !1,
          "aria-hidden": !0
        })
      }), c.jsx("span", {
        className: "desktop-titlebar-title",
        children: r
      }), n ? c.jsx("div", {
        className: "desktop-titlebar-menus",
        children: n
      }) : null]
    }), c.jsxs("div", {
      className: "desktop-titlebar-controls",
      children: [c.jsx("button", {
        type: "button",
        className: "desktop-titlebar-btn",
        style: {
          "--titlebar-btn-hover": u
        },
        "aria-label": x("最小化"),
        onClick: () => void p("minimize"),
        children: c.jsx("svg", {
          width: "10",
          height: "10",
          viewBox: "0 0 10 10",
          "aria-hidden": "true",
          children: c.jsx("path", {
            d: "M1 5h8",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.1"
          })
        })
      }), c.jsx("button", {
        type: "button",
        className: "desktop-titlebar-btn",
        style: {
          "--titlebar-btn-hover": u
        },
        "aria-label": x(o ? "还原" : "最大化"),
        onClick: () => void p("toggleMaximize"),
        onDoubleClick: m => m.stopPropagation(),
        children: o ? c.jsx("svg", {
          width: "10",
          height: "10",
          viewBox: "0 0 10 10",
          "aria-hidden": "true",
          children: c.jsx("path", {
            d: "M2.4 3.2h4.4v4.4H2.4zM3.2 2.4h4.4v4.4",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.1"
          })
        }) : c.jsx("svg", {
          width: "10",
          height: "10",
          viewBox: "0 0 10 10",
          "aria-hidden": "true",
          children: c.jsx("rect", {
            x: "1.6",
            y: "1.6",
            width: "6.8",
            height: "6.8",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.1"
          })
        })
      }), c.jsx("button", {
        type: "button",
        className: "desktop-titlebar-btn desktop-titlebar-btn--close",
        "aria-label": x("关闭"),
        onClick: () => void p("close"),
        children: c.jsx("svg", {
          width: "10",
          height: "10",
          viewBox: "0 0 10 10",
          "aria-hidden": "true",
          children: c.jsx("path", {
            d: "M2 2l6 6M8 2L2 8",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.1"
          })
        })
      })]
    })]
  });
}

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uRr = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  TEn = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var hRr = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pRr = g.forwardRef(({
  color: e = "currentColor",
  size: t = 24,
  strokeWidth: n = 2,
  absoluteStrokeWidth: r,
  className: a = "",
  children: i,
  iconNode: o,
  ...s
}, l) => g.createElement("svg", {
  ref: l,
  ...hRr,
  width: t,
  height: t,
  stroke: e,
  strokeWidth: r ? Number(n) * 24 / Number(t) : n,
  className: TEn("lucide", a),
  ...s
}, [...o.map(([d, u]) => g.createElement(d, u)), ...(Array.isArray(i) ? i : [i])]));

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $r = (e, t) => {
  const n = g.forwardRef(({
    className: r,
    ...a
  }, i) => g.createElement(pRr, {
    ref: i,
    iconNode: t,
    className: TEn(`lucide-${uRr(e)}`, r),
    ...a
  }));
  return n.displayName = `${e}`, n;
};

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mRr = $r("Activity", [["path", {
  d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
  key: "169zse"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MEn = $r("AlignCenterHorizontal", [["path", {
  d: "M2 12h20",
  key: "9i4pu4"
}], ["path", {
  d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4",
  key: "11f1s0"
}], ["path", {
  d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4",
  key: "t14dx9"
}], ["path", {
  d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1",
  key: "1w07xs"
}], ["path", {
  d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1",
  key: "1apec2"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PEn = $r("AlignCenterVertical", [["path", {
  d: "M12 2v20",
  key: "t6zp3m"
}], ["path", {
  d: "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4",
  key: "14d6g8"
}], ["path", {
  d: "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4",
  key: "1e2lrw"
}], ["path", {
  d: "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1",
  key: "1fkdwx"
}], ["path", {
  d: "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1",
  key: "1euafb"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uWt = $r("AlignCenter", [["path", {
  d: "M17 12H7",
  key: "16if0g"
}], ["path", {
  d: "M19 18H5",
  key: "18s9l3"
}], ["path", {
  d: "M21 6H3",
  key: "1jwq7v"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const REn = $r("AlignEndHorizontal", [["rect", {
  width: "6",
  height: "16",
  x: "4",
  y: "2",
  rx: "2",
  key: "z5wdxg"
}], ["rect", {
  width: "6",
  height: "9",
  x: "14",
  y: "9",
  rx: "2",
  key: "um7a8w"
}], ["path", {
  d: "M22 22H2",
  key: "19qnx5"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NEn = $r("AlignEndVertical", [["rect", {
  width: "16",
  height: "6",
  x: "2",
  y: "4",
  rx: "2",
  key: "10wcwx"
}], ["rect", {
  width: "9",
  height: "6",
  x: "9",
  y: "14",
  rx: "2",
  key: "4p5bwg"
}], ["path", {
  d: "M22 22V2",
  key: "12ipfv"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fRr = $r("AlignJustify", [["path", {
  d: "M3 12h18",
  key: "1i2n21"
}], ["path", {
  d: "M3 18h18",
  key: "1h113x"
}], ["path", {
  d: "M3 6h18",
  key: "d0wm0j"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jEn = $r("AlignStartHorizontal", [["rect", {
  width: "6",
  height: "16",
  x: "4",
  y: "6",
  rx: "2",
  key: "1n4dg1"
}], ["rect", {
  width: "6",
  height: "9",
  x: "14",
  y: "6",
  rx: "2",
  key: "17khns"
}], ["path", {
  d: "M22 2H2",
  key: "fhrpnj"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DEn = $r("AlignStartVertical", [["rect", {
  width: "9",
  height: "6",
  x: "6",
  y: "14",
  rx: "2",
  key: "lpm2y7"
}], ["rect", {
  width: "16",
  height: "6",
  x: "6",
  y: "4",
  rx: "2",
  key: "rdj6ps"
}], ["path", {
  d: "M2 2v20",
  key: "1ivd8o"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gRr = $r("AlignVerticalSpaceAround", [["rect", {
  width: "10",
  height: "6",
  x: "7",
  y: "9",
  rx: "2",
  key: "b1zbii"
}], ["path", {
  d: "M22 20H2",
  key: "1p1f7z"
}], ["path", {
  d: "M22 4H2",
  key: "1b7qnq"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kS = $r("Aperture", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "m14.31 8 5.74 9.94",
  key: "1y6ab4"
}], ["path", {
  d: "M9.69 8h11.48",
  key: "1wxppr"
}], ["path", {
  d: "m7.38 12 5.74-9.94",
  key: "1grp0k"
}], ["path", {
  d: "M9.69 16 3.95 6.06",
  key: "libnyf"
}], ["path", {
  d: "M14.31 16H2.83",
  key: "x5fava"
}], ["path", {
  d: "m16.62 12-5.74 9.94",
  key: "1vwawt"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LEn = $r("AppWindow", [["rect", {
  x: "2",
  y: "4",
  width: "20",
  height: "16",
  rx: "2",
  key: "izxlao"
}], ["path", {
  d: "M10 4v4",
  key: "pp8u80"
}], ["path", {
  d: "M2 8h20",
  key: "d11cs7"
}], ["path", {
  d: "M6 4v4",
  key: "1svtjw"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hWt = $r("ArchiveRestore", [["rect", {
  width: "20",
  height: "5",
  x: "2",
  y: "3",
  rx: "1",
  key: "1wp1u1"
}], ["path", {
  d: "M4 8v11a2 2 0 0 0 2 2h2",
  key: "tvwodi"
}], ["path", {
  d: "M20 8v11a2 2 0 0 1-2 2h-2",
  key: "1gkqxj"
}], ["path", {
  d: "m9 15 3-3 3 3",
  key: "1pd0qc"
}], ["path", {
  d: "M12 12v9",
  key: "192myk"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yRr = $r("Archive", [["rect", {
  width: "20",
  height: "5",
  x: "2",
  y: "3",
  rx: "1",
  key: "1wp1u1"
}], ["path", {
  d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
  key: "1s80jp"
}], ["path", {
  d: "M10 12h4",
  key: "a56b0p"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pmt = $r("Armchair", [["path", {
  d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3",
  key: "irtipd"
}], ["path", {
  d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
  key: "1qyhux"
}], ["path", {
  d: "M5 18v2",
  key: "ppbyun"
}], ["path", {
  d: "M19 18v2",
  key: "gy7782"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bRr = $r("ArrowDownAZ", [["path", {
  d: "m3 16 4 4 4-4",
  key: "1co6wj"
}], ["path", {
  d: "M7 20V4",
  key: "1yoxec"
}], ["path", {
  d: "M20 8h-5",
  key: "1vsyxs"
}], ["path", {
  d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10",
  key: "ag13bf"
}], ["path", {
  d: "M15 14h5l-5 6h5",
  key: "ur5jdg"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vRr = $r("ArrowDownWideNarrow", [["path", {
  d: "m3 16 4 4 4-4",
  key: "1co6wj"
}], ["path", {
  d: "M7 20V4",
  key: "1yoxec"
}], ["path", {
  d: "M11 4h10",
  key: "1w87gc"
}], ["path", {
  d: "M11 8h7",
  key: "djye34"
}], ["path", {
  d: "M11 12h4",
  key: "q8tih4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $ue = $r("ArrowDown", [["path", {
  d: "M12 5v14",
  key: "s699le"
}], ["path", {
  d: "m19 12-7 7-7-7",
  key: "1idqje"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nEt = $r("ArrowLeftRight", [["path", {
  d: "M8 3 4 7l4 4",
  key: "9rb6wj"
}], ["path", {
  d: "M4 7h16",
  key: "6tx8e3"
}], ["path", {
  d: "m16 21 4-4-4-4",
  key: "siv7j2"
}], ["path", {
  d: "M20 17H4",
  key: "h6l3hr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uw = $r("ArrowLeft", [["path", {
  d: "m12 19-7-7 7-7",
  key: "1l729n"
}], ["path", {
  d: "M19 12H5",
  key: "x3x0zl"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wRr = $r("ArrowRightLeft", [["path", {
  d: "m16 3 4 4-4 4",
  key: "1x1c3m"
}], ["path", {
  d: "M20 7H4",
  key: "zbl0bi"
}], ["path", {
  d: "m8 21-4-4 4-4",
  key: "h9nckh"
}], ["path", {
  d: "M4 17h16",
  key: "g4d7ey"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H7 = $r("ArrowRight", [["path", {
  d: "M5 12h14",
  key: "1ays0h"
}], ["path", {
  d: "m12 5 7 7-7 7",
  key: "xquz4c"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xRr = $r("ArrowUpAZ", [["path", {
  d: "m3 8 4-4 4 4",
  key: "11wl7u"
}], ["path", {
  d: "M7 4v16",
  key: "1glfcx"
}], ["path", {
  d: "M20 8h-5",
  key: "1vsyxs"
}], ["path", {
  d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10",
  key: "ag13bf"
}], ["path", {
  d: "M15 14h5l-5 6h5",
  key: "ur5jdg"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _Rr = $r("ArrowUpNarrowWide", [["path", {
  d: "m3 8 4-4 4 4",
  key: "11wl7u"
}], ["path", {
  d: "M7 4v16",
  key: "1glfcx"
}], ["path", {
  d: "M11 12h4",
  key: "q8tih4"
}], ["path", {
  d: "M11 16h7",
  key: "uosisv"
}], ["path", {
  d: "M11 20h10",
  key: "jvxblo"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eI = $r("ArrowUpRight", [["path", {
  d: "M7 7h10v10",
  key: "1tivn9"
}], ["path", {
  d: "M7 17 17 7",
  key: "1vkiza"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gc = $r("ArrowUp", [["path", {
  d: "m5 12 7-7 7 7",
  key: "hav0vg"
}], ["path", {
  d: "M12 19V5",
  key: "x0mq9r"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q2 = $r("AudioLines", [["path", {
  d: "M2 10v3",
  key: "1fnikh"
}], ["path", {
  d: "M6 6v11",
  key: "11sgs0"
}], ["path", {
  d: "M10 3v18",
  key: "yhl04a"
}], ["path", {
  d: "M14 8v7",
  key: "3a1oy3"
}], ["path", {
  d: "M18 5v13",
  key: "123xd1"
}], ["path", {
  d: "M22 10v3",
  key: "154ddg"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kRr = $r("Barcode", [["path", {
  d: "M3 5v14",
  key: "1nt18q"
}], ["path", {
  d: "M8 5v14",
  key: "1ybrkv"
}], ["path", {
  d: "M12 5v14",
  key: "s699le"
}], ["path", {
  d: "M17 5v14",
  key: "ycjyhj"
}], ["path", {
  d: "M21 5v14",
  key: "nzette"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rEt = $r("Blend", [["circle", {
  cx: "9",
  cy: "9",
  r: "7",
  key: "p2h5vp"
}], ["circle", {
  cx: "15",
  cy: "15",
  r: "7",
  key: "19ennj"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ARr = $r("Bold", [["path", {
  d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
  key: "mg9rjx"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dZ = $r("BookOpen", [["path", {
  d: "M12 7v14",
  key: "1akyts"
}], ["path", {
  d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
  key: "ruj8y"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OEn = $r("Bookmark", [["path", {
  d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
  key: "1fy3hk"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b5e = $r("Bot", [["path", {
  d: "M12 8V4H8",
  key: "hb8ula"
}], ["rect", {
  width: "16",
  height: "12",
  x: "4",
  y: "8",
  rx: "2",
  key: "enze0r"
}], ["path", {
  d: "M2 14h2",
  key: "vft8re"
}], ["path", {
  d: "M20 14h2",
  key: "4cs60a"
}], ["path", {
  d: "M15 13v2",
  key: "1xurst"
}], ["path", {
  d: "M9 13v2",
  key: "rq6x2g"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hm = $r("Box", [["path", {
  d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
  key: "hh9hay"
}], ["path", {
  d: "m3.3 7 8.7 5 8.7-5",
  key: "g66t2b"
}], ["path", {
  d: "M12 22V12",
  key: "d0xqtd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BEn = $r("Boxes", [["path", {
  d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
  key: "lc1i9w"
}], ["path", {
  d: "m7 16.5-4.74-2.85",
  key: "1o9zyk"
}], ["path", {
  d: "m7 16.5 5-3",
  key: "va8pkn"
}], ["path", {
  d: "M7 16.5v5.17",
  key: "jnp8gn"
}], ["path", {
  d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
  key: "8zsnat"
}], ["path", {
  d: "m17 16.5-5-3",
  key: "8arw3v"
}], ["path", {
  d: "m17 16.5 4.74-2.85",
  key: "8rfmw"
}], ["path", {
  d: "M17 16.5v5.17",
  key: "k6z78m"
}], ["path", {
  d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
  key: "1xygjf"
}], ["path", {
  d: "M12 8 7.26 5.15",
  key: "1vbdud"
}], ["path", {
  d: "m12 8 4.74-2.85",
  key: "3rx089"
}], ["path", {
  d: "M12 13.5V8",
  key: "1io7kd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aEt = $r("Braces", [["path", {
  d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
  key: "ezmyqa"
}], ["path", {
  d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
  key: "e1hn23"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rxe = $r("BrainCircuit", [["path", {
  d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
  key: "l5xja"
}], ["path", {
  d: "M9 13a4.5 4.5 0 0 0 3-4",
  key: "10igwf"
}], ["path", {
  d: "M6.003 5.125A3 3 0 0 0 6.401 6.5",
  key: "105sqy"
}], ["path", {
  d: "M3.477 10.896a4 4 0 0 1 .585-.396",
  key: "ql3yin"
}], ["path", {
  d: "M6 18a4 4 0 0 1-1.967-.516",
  key: "2e4loj"
}], ["path", {
  d: "M12 13h4",
  key: "1ku699"
}], ["path", {
  d: "M12 18h6a2 2 0 0 1 2 2v1",
  key: "105ag5"
}], ["path", {
  d: "M12 8h8",
  key: "1lhi5i"
}], ["path", {
  d: "M16 8V5a2 2 0 0 1 2-2",
  key: "u6izg6"
}], ["circle", {
  cx: "16",
  cy: "13",
  r: ".5",
  key: "ry7gng"
}], ["circle", {
  cx: "18",
  cy: "3",
  r: ".5",
  key: "1aiba7"
}], ["circle", {
  cx: "20",
  cy: "21",
  r: ".5",
  key: "yhc1fs"
}], ["circle", {
  cx: "20",
  cy: "8",
  r: ".5",
  key: "1e43v0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FEn = $r("Brain", [["path", {
  d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
  key: "l5xja"
}], ["path", {
  d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
  key: "ep3f8r"
}], ["path", {
  d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",
  key: "1p4c4q"
}], ["path", {
  d: "M17.599 6.5a3 3 0 0 0 .399-1.375",
  key: "tmeiqw"
}], ["path", {
  d: "M6.003 5.125A3 3 0 0 0 6.401 6.5",
  key: "105sqy"
}], ["path", {
  d: "M3.477 10.896a4 4 0 0 1 .585-.396",
  key: "ql3yin"
}], ["path", {
  d: "M19.938 10.5a4 4 0 0 1 .585.396",
  key: "1qfode"
}], ["path", {
  d: "M6 18a4 4 0 0 1-1.967-.516",
  key: "2e4loj"
}], ["path", {
  d: "M19.967 17.484A4 4 0 0 1 18 18",
  key: "159ez6"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pWt = $r("Briefcase", [["path", {
  d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  key: "jecpp"
}], ["rect", {
  width: "20",
  height: "14",
  x: "2",
  y: "6",
  rx: "2",
  key: "i6l2r4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KHe = $r("Brush", [["path", {
  d: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08",
  key: "1styjt"
}], ["path", {
  d: "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z",
  key: "z0l1mu"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SRr = $r("Building2", [["path", {
  d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
  key: "1b4qmf"
}], ["path", {
  d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
  key: "i71pzd"
}], ["path", {
  d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
  key: "10jefs"
}], ["path", {
  d: "M10 6h4",
  key: "1itunk"
}], ["path", {
  d: "M10 10h4",
  key: "tcdvrf"
}], ["path", {
  d: "M10 14h4",
  key: "kelpxr"
}], ["path", {
  d: "M10 18h4",
  key: "1ulq68"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IRr = $r("CalendarDays", [["path", {
  d: "M8 2v4",
  key: "1cmpym"
}], ["path", {
  d: "M16 2v4",
  key: "4m81vk"
}], ["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "4",
  rx: "2",
  key: "1hopcy"
}], ["path", {
  d: "M3 10h18",
  key: "8toen8"
}], ["path", {
  d: "M8 14h.01",
  key: "6423bh"
}], ["path", {
  d: "M12 14h.01",
  key: "1etili"
}], ["path", {
  d: "M16 14h.01",
  key: "1gbofw"
}], ["path", {
  d: "M8 18h.01",
  key: "lrp35t"
}], ["path", {
  d: "M12 18h.01",
  key: "mhygvu"
}], ["path", {
  d: "M16 18h.01",
  key: "kzsmim"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kh = $r("Camera", [["path", {
  d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
  key: "1tc9qg"
}], ["circle", {
  cx: "12",
  cy: "13",
  r: "3",
  key: "1vg3eu"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CRr = $r("CarFront", [["path", {
  d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8",
  key: "1imjwt"
}], ["path", {
  d: "M7 14h.01",
  key: "1qa3f1"
}], ["path", {
  d: "M17 14h.01",
  key: "7oqj8z"
}], ["rect", {
  width: "18",
  height: "8",
  x: "3",
  y: "10",
  rx: "2",
  key: "a7itu8"
}], ["path", {
  d: "M5 18v2",
  key: "ppbyun"
}], ["path", {
  d: "M19 18v2",
  key: "gy7782"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ERr = $r("Cat", [["path", {
  d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
  key: "x6xyqk"
}], ["path", {
  d: "M8 14v.5",
  key: "1nzgdb"
}], ["path", {
  d: "M16 14v.5",
  key: "1lajdz"
}], ["path", {
  d: "M11.25 16.25h1.5L12 17l-.75-.75Z",
  key: "12kq1m"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TRr = $r("ChartColumn", [["path", {
  d: "M3 3v16a2 2 0 0 0 2 2h16",
  key: "c24i48"
}], ["path", {
  d: "M18 17V9",
  key: "2bz60n"
}], ["path", {
  d: "M13 17V5",
  key: "1frdt8"
}], ["path", {
  d: "M8 17v-3",
  key: "17ska0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MRr = $r("CheckCheck", [["path", {
  d: "M18 6 7 17l-5-5",
  key: "116fxf"
}], ["path", {
  d: "m22 10-7.5 7.5L13 16",
  key: "ke71qq"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const io = $r("Check", [["path", {
  d: "M20 6 9 17l-5-5",
  key: "1gmf2c"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mi = $r("ChevronDown", [["path", {
  d: "m6 9 6 6 6-6",
  key: "qrunsl"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf = $r("ChevronLeft", [["path", {
  d: "m15 18-6-6 6-6",
  key: "1wnfg3"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ss = $r("ChevronRight", [["path", {
  d: "m9 18 6-6-6-6",
  key: "mthhwq"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j2 = $r("ChevronUp", [["path", {
  d: "m18 15-6-6-6 6",
  key: "153udz"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iEt = $r("ChevronsLeft", [["path", {
  d: "m11 17-5-5 5-5",
  key: "13zhaf"
}], ["path", {
  d: "m18 17-5-5 5-5",
  key: "h8a8et"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oEt = $r("ChevronsRight", [["path", {
  d: "m6 17 5-5-5-5",
  key: "xnjwq"
}], ["path", {
  d: "m13 17 5-5-5-5",
  key: "17xmmf"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PRr = $r("ChevronsUpDown", [["path", {
  d: "m7 15 5 5 5-5",
  key: "1hf1tw"
}], ["path", {
  d: "m7 9 5-5 5 5",
  key: "sgt6xg"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mmt = $r("ChevronsUp", [["path", {
  d: "m17 11-5-5-5 5",
  key: "e8nh98"
}], ["path", {
  d: "m17 18-5-5-5 5",
  key: "2avn1x"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c3 = $r("CircleAlert", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "8",
  y2: "12",
  key: "1pkeuh"
}], ["line", {
  x1: "12",
  x2: "12.01",
  y1: "16",
  y2: "16",
  key: "4dfq90"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sEt = $r("CircleCheckBig", [["path", {
  d: "M21.801 10A10 10 0 1 1 17 3.335",
  key: "yps3ct"
}], ["path", {
  d: "m9 11 3 3L22 4",
  key: "1pflzl"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RRr = $r("CircleCheck", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "m9 12 2 2 4-4",
  key: "dzmm74"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NRr = $r("CircleDashed", [["path", {
  d: "M10.1 2.182a10 10 0 0 1 3.8 0",
  key: "5ilxe3"
}], ["path", {
  d: "M13.9 21.818a10 10 0 0 1-3.8 0",
  key: "11zvb9"
}], ["path", {
  d: "M17.609 3.721a10 10 0 0 1 2.69 2.7",
  key: "1iw5b2"
}], ["path", {
  d: "M2.182 13.9a10 10 0 0 1 0-3.8",
  key: "c0bmvh"
}], ["path", {
  d: "M20.279 17.609a10 10 0 0 1-2.7 2.69",
  key: "1ruxm7"
}], ["path", {
  d: "M21.818 10.1a10 10 0 0 1 0 3.8",
  key: "qkgqxc"
}], ["path", {
  d: "M3.721 6.391a10 10 0 0 1 2.7-2.69",
  key: "1mcia2"
}], ["path", {
  d: "M6.391 20.279a10 10 0 0 1-2.69-2.7",
  key: "1fvljs"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jRr = $r("CircleDot", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "1",
  key: "41hilf"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QHe = $r("CircleHelp", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
  key: "1u773s"
}], ["path", {
  d: "M12 17h.01",
  key: "p32p05"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DRr = $r("CircleOff", [["path", {
  d: "m2 2 20 20",
  key: "1ooewy"
}], ["path", {
  d: "M8.35 2.69A10 10 0 0 1 21.3 15.65",
  key: "1pfsoa"
}], ["path", {
  d: "M19.08 19.08A10 10 0 1 1 4.92 4.92",
  key: "1ablyi"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zEn = $r("CircleUserRound", [["path", {
  d: "M18 20a6 6 0 0 0-12 0",
  key: "1qehca"
}], ["circle", {
  cx: "12",
  cy: "10",
  r: "4",
  key: "1h16sb"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LRr = $r("CircleX", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "m15 9-6 6",
  key: "1uzhvr"
}], ["path", {
  d: "m9 9 6 6",
  key: "z0biqf"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YHe = $r("Circle", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uZ = $r("Clapperboard", [["path", {
  d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z",
  key: "1tn4o7"
}], ["path", {
  d: "m6.2 5.3 3.1 3.9",
  key: "iuk76l"
}], ["path", {
  d: "m12.4 3.4 3.1 4",
  key: "6hsd6n"
}], ["path", {
  d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
  key: "ltgou9"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CLe = $r("ClipboardCopy", [["rect", {
  width: "8",
  height: "4",
  x: "8",
  y: "2",
  rx: "1",
  ry: "1",
  key: "tgr4d6"
}], ["path", {
  d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  key: "4jdomd"
}], ["path", {
  d: "M16 4h2a2 2 0 0 1 2 2v4",
  key: "3hqy98"
}], ["path", {
  d: "M21 14H11",
  key: "1bme5i"
}], ["path", {
  d: "m15 10-4 4 4 4",
  key: "5dvupr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ORr = $r("Clock3", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["polyline", {
  points: "12 6 12 12 16.5 12",
  key: "1aq6pp"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AP = $r("Clock", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["polyline", {
  points: "12 6 12 12 16 14",
  key: "68esgv"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UEn = $r("CloudDownload", [["path", {
  d: "M12 13v8l-4-4",
  key: "1f5nwf"
}], ["path", {
  d: "m12 21 4-4",
  key: "1lfcce"
}], ["path", {
  d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284",
  key: "ui1hmy"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp = $r("Cloud", [["path", {
  d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
  key: "p7xjir"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ELe = $r("Code", [["polyline", {
  points: "16 18 22 12 16 6",
  key: "z7tu5w"
}], ["polyline", {
  points: "8 6 2 12 8 18",
  key: "1eg1df"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BRr = $r("Coins", [["circle", {
  cx: "8",
  cy: "8",
  r: "6",
  key: "3yglwk"
}], ["path", {
  d: "M18.09 10.37A6 6 0 1 1 10.34 18",
  key: "t5s6rm"
}], ["path", {
  d: "M7 6h1v4",
  key: "1obek4"
}], ["path", {
  d: "m16.71 13.88.7.71-2.82 2.82",
  key: "1rbuyh"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $En = $r("Columns2", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M12 3v18",
  key: "108xh3"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GEn = $r("Columns3", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M9 3v18",
  key: "fh3hqa"
}], ["path", {
  d: "M15 3v18",
  key: "14nvp0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v5e = $r("CopyPlus", [["line", {
  x1: "15",
  x2: "15",
  y1: "12",
  y2: "18",
  key: "1p7wdc"
}], ["line", {
  x1: "12",
  x2: "18",
  y1: "15",
  y2: "15",
  key: "1nscbv"
}], ["rect", {
  width: "14",
  height: "14",
  x: "8",
  y: "8",
  rx: "2",
  ry: "2",
  key: "17jyea"
}], ["path", {
  d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
  key: "zix9uf"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx = $r("Copy", [["rect", {
  width: "14",
  height: "14",
  x: "8",
  y: "8",
  rx: "2",
  ry: "2",
  key: "17jyea"
}], ["path", {
  d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
  key: "zix9uf"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VEn = $r("CornerRightDown", [["polyline", {
  points: "10 15 15 20 20 15",
  key: "axus6l"
}], ["path", {
  d: "M4 4h7a4 4 0 0 1 4 4v12",
  key: "wcbgct"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HEn = $r("CornerUpRight", [["polyline", {
  points: "15 14 20 9 15 4",
  key: "1tbx3s"
}], ["path", {
  d: "M4 20v-7a4 4 0 0 1 4-4h12",
  key: "1lu4f8"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XHe = $r("Cpu", [["rect", {
  width: "16",
  height: "16",
  x: "4",
  y: "4",
  rx: "2",
  key: "14l7u7"
}], ["rect", {
  width: "6",
  height: "6",
  x: "9",
  y: "9",
  rx: "1",
  key: "5aljv4"
}], ["path", {
  d: "M15 2v2",
  key: "13l42r"
}], ["path", {
  d: "M15 20v2",
  key: "15mkzm"
}], ["path", {
  d: "M2 15h2",
  key: "1gxd5l"
}], ["path", {
  d: "M2 9h2",
  key: "1bbxkp"
}], ["path", {
  d: "M20 15h2",
  key: "19e6y8"
}], ["path", {
  d: "M20 9h2",
  key: "19tzq7"
}], ["path", {
  d: "M9 2v2",
  key: "165o2o"
}], ["path", {
  d: "M9 20v2",
  key: "i2bqo8"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WEn = $r("Crop", [["path", {
  d: "M6 2v14a2 2 0 0 0 2 2h14",
  key: "ron5a4"
}], ["path", {
  d: "M18 22V8a2 2 0 0 0-2-2H2",
  key: "7s9ehn"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lEt = $r("Crosshair", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["line", {
  x1: "22",
  x2: "18",
  y1: "12",
  y2: "12",
  key: "l9bcsi"
}], ["line", {
  x1: "6",
  x2: "2",
  y1: "12",
  y2: "12",
  key: "13hhkx"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "6",
  y2: "2",
  key: "10w3f3"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "22",
  y2: "18",
  key: "15g9kq"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FRr = $r("Crown", [["path", {
  d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
  key: "1vdc57"
}], ["path", {
  d: "M5 21h14",
  key: "11awu3"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qEn = $r("Database", [["ellipse", {
  cx: "12",
  cy: "5",
  rx: "9",
  ry: "3",
  key: "msslwz"
}], ["path", {
  d: "M3 5V19A9 3 0 0 0 21 19V5",
  key: "1wlel7"
}], ["path", {
  d: "M3 12A9 3 0 0 0 21 12",
  key: "mv7ke4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zRr = $r("Diamond", [["path", {
  d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
  key: "1f1r0c"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const URr = $r("DoorOpen", [["path", {
  d: "M13 4h3a2 2 0 0 1 2 2v14",
  key: "hrm0s9"
}], ["path", {
  d: "M2 20h3",
  key: "1gaodv"
}], ["path", {
  d: "M13 20h9",
  key: "s90cdi"
}], ["path", {
  d: "M10 12v.01",
  key: "vx6srw"
}], ["path", {
  d: "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z",
  key: "199qr4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws = $r("Download", [["path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
  key: "ih7n3h"
}], ["polyline", {
  points: "7 10 12 15 17 10",
  key: "2ggqvy"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "15",
  y2: "3",
  key: "1vk2je"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cEt = $r("Earth", [["path", {
  d: "M21.54 15H17a2 2 0 0 0-2 2v4.54",
  key: "1djwo0"
}], ["path", {
  d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
  key: "1tzkfa"
}], ["path", {
  d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",
  key: "14pb5j"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KEn = $r("EllipsisVertical", [["circle", {
  cx: "12",
  cy: "12",
  r: "1",
  key: "41hilf"
}], ["circle", {
  cx: "12",
  cy: "5",
  r: "1",
  key: "gxeob9"
}], ["circle", {
  cx: "12",
  cy: "19",
  r: "1",
  key: "lyex9k"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hw = $r("Ellipsis", [["circle", {
  cx: "12",
  cy: "12",
  r: "1",
  key: "41hilf"
}], ["circle", {
  cx: "19",
  cy: "12",
  r: "1",
  key: "1wjl8i"
}], ["circle", {
  cx: "5",
  cy: "12",
  r: "1",
  key: "1pcz8c"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uI = $r("Eraser", [["path", {
  d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",
  key: "182aya"
}], ["path", {
  d: "M22 21H7",
  key: "t4ddhn"
}], ["path", {
  d: "m5 11 9 9",
  key: "1mo9qw"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kT = $r("Expand", [["path", {
  d: "m21 21-6-6m6 6v-4.8m0 4.8h-4.8",
  key: "1c15vz"
}], ["path", {
  d: "M3 16.2V21m0 0h4.8M3 21l6-6",
  key: "1fsnz2"
}], ["path", {
  d: "M21 7.8V3m0 0h-4.8M21 3l-6 6",
  key: "hawz9i"
}], ["path", {
  d: "M3 7.8V3m0 0h4.8M3 3l6 6",
  key: "u9ee12"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S5 = $r("ExternalLink", [["path", {
  d: "M15 3h6v6",
  key: "1q9fwt"
}], ["path", {
  d: "M10 14 21 3",
  key: "gplh6r"
}], ["path", {
  d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  key: "a6xqqp"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $d = $r("EyeOff", [["path", {
  d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
  key: "ct8e1f"
}], ["path", {
  d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
  key: "151rxh"
}], ["path", {
  d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
  key: "13bj9a"
}], ["path", {
  d: "m2 2 20 20",
  key: "1ooewy"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ul = $r("Eye", [["path", {
  d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
  key: "1nclc0"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "3",
  key: "1v7zrd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QEn = $r("FastForward", [["polygon", {
  points: "13 19 22 12 13 5 13 19",
  key: "587y9g"
}], ["polygon", {
  points: "2 19 11 12 2 5 2 19",
  key: "3pweh0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dEt = $r("FileAudio", [["path", {
  d: "M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
  key: "rslqgf"
}], ["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}], ["path", {
  d: "M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",
  key: "9f7x3i"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $Rr = $r("FileClock", [["path", {
  d: "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
  key: "37hlfg"
}], ["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}], ["circle", {
  cx: "8",
  cy: "16",
  r: "6",
  key: "10v15b"
}], ["path", {
  d: "M9.5 17.5 8 16.25V14",
  key: "1o80t2"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YEn = $r("FileImage", [["path", {
  d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
  key: "1rqfz7"
}], ["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}], ["circle", {
  cx: "10",
  cy: "12",
  r: "2",
  key: "737tya"
}], ["path", {
  d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",
  key: "wt3hpn"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GRr = $r("FileMusic", [["path", {
  d: "M10.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v8.4",
  key: "1d3kfm"
}], ["path", {
  d: "M8 18v-7.7L16 9v7",
  key: "1oie6o"
}], ["circle", {
  cx: "14",
  cy: "16",
  r: "2",
  key: "1bzzi3"
}], ["circle", {
  cx: "6",
  cy: "18",
  r: "2",
  key: "1fncim"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XEn = $r("FilePenLine", [["path", {
  d: "m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2",
  key: "142zxg"
}], ["path", {
  d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
  key: "2t3380"
}], ["path", {
  d: "M8 18h1",
  key: "13wk12"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VRr = $r("FilePen", [["path", {
  d: "M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5",
  key: "1couwa"
}], ["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}], ["path", {
  d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
  key: "1y4qbx"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HRr = $r("FilePlus2", [["path", {
  d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
  key: "1pf5j1"
}], ["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}], ["path", {
  d: "M3 15h6",
  key: "4e2qda"
}], ["path", {
  d: "M6 12v6",
  key: "1u72j0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fmt = $r("FileSearch", [["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}], ["path", {
  d: "M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
  key: "ms7g94"
}], ["path", {
  d: "m9 18-1.5-1.5",
  key: "1j6qii"
}], ["circle", {
  cx: "5",
  cy: "14",
  r: "3",
  key: "ufru5t"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hd = $r("FileText", [["path", {
  d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
  key: "1rqfz7"
}], ["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}], ["path", {
  d: "M10 9H8",
  key: "b1mrlr"
}], ["path", {
  d: "M16 13H8",
  key: "t4e002"
}], ["path", {
  d: "M16 17H8",
  key: "z1uh3a"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JEn = $r("FileVideo", [["path", {
  d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
  key: "1rqfz7"
}], ["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}], ["path", {
  d: "m10 11 5 3-5 3v-6Z",
  key: "7ntvm4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZEn = $r("File", [["path", {
  d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
  key: "1rqfz7"
}], ["path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4",
  key: "tnqrlb"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wb = $r("Film", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M7 3v18",
  key: "bbkbws"
}], ["path", {
  d: "M3 7.5h4",
  key: "zfgn84"
}], ["path", {
  d: "M3 12h18",
  key: "1i2n21"
}], ["path", {
  d: "M3 16.5h4",
  key: "1230mu"
}], ["path", {
  d: "M17 3v18",
  key: "in4fa5"
}], ["path", {
  d: "M17 7.5h4",
  key: "myr1c1"
}], ["path", {
  d: "M17 16.5h4",
  key: "go4c1d"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eTn = $r("Flame", [["path", {
  d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  key: "96xj49"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tTn = $r("FlipHorizontal", [["path", {
  d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",
  key: "1i73f7"
}], ["path", {
  d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",
  key: "saxlbk"
}], ["path", {
  d: "M12 20v2",
  key: "1lh1kg"
}], ["path", {
  d: "M12 14v2",
  key: "8jcxud"
}], ["path", {
  d: "M12 8v2",
  key: "1woqiv"
}], ["path", {
  d: "M12 2v2",
  key: "tus03m"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nTn = $r("FlipVertical", [["path", {
  d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",
  key: "14bfxa"
}], ["path", {
  d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",
  key: "14rx03"
}], ["path", {
  d: "M4 12H2",
  key: "rhcxmi"
}], ["path", {
  d: "M10 12H8",
  key: "s88cx1"
}], ["path", {
  d: "M16 12h-2",
  key: "10asgb"
}], ["path", {
  d: "M22 12h-2",
  key: "14jgyd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WRr = $r("Flower2", [["path", {
  d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
  key: "3pnvol"
}], ["circle", {
  cx: "12",
  cy: "8",
  r: "2",
  key: "1822b1"
}], ["path", {
  d: "M12 10v12",
  key: "6ubwww"
}], ["path", {
  d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z",
  key: "9hd38g"
}], ["path", {
  d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z",
  key: "ufn41s"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xle = $r("Focus", [["circle", {
  cx: "12",
  cy: "12",
  r: "3",
  key: "1v7zrd"
}], ["path", {
  d: "M3 7V5a2 2 0 0 1 2-2h2",
  key: "aa7l1z"
}], ["path", {
  d: "M17 3h2a2 2 0 0 1 2 2v2",
  key: "4qcy5o"
}], ["path", {
  d: "M21 17v2a2 2 0 0 1-2 2h-2",
  key: "6vwrx8"
}], ["path", {
  d: "M7 21H5a2 2 0 0 1-2-2v-2",
  key: "ioqczr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mWt = $r("FolderDown", [["path", {
  d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  key: "1kt360"
}], ["path", {
  d: "M12 10v6",
  key: "1bos4e"
}], ["path", {
  d: "m15 13-3 3-3-3",
  key: "6j2sf0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rTn = $r("FolderInput", [["path", {
  d: "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",
  key: "fm4g5t"
}], ["path", {
  d: "M2 13h10",
  key: "pgb2dq"
}], ["path", {
  d: "m9 16 3-3-3-3",
  key: "6m91ic"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qRr = $r("FolderKanban", [["path", {
  d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
  key: "1fr9dc"
}], ["path", {
  d: "M8 10v4",
  key: "tgpxqk"
}], ["path", {
  d: "M12 10v2",
  key: "hh53o1"
}], ["path", {
  d: "M16 10v6",
  key: "1d6xys"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sc = $r("FolderOpen", [["path", {
  d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
  key: "usdka0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jle = $r("FolderPlus", [["path", {
  d: "M12 10v6",
  key: "1bos4e"
}], ["path", {
  d: "M9 13h6",
  key: "1uhe8q"
}], ["path", {
  d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  key: "1kt360"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KRr = $r("FolderSync", [["path", {
  d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5",
  key: "1dkoa9"
}], ["path", {
  d: "M12 10v4h4",
  key: "1czhmt"
}], ["path", {
  d: "m12 14 1.535-1.605a5 5 0 0 1 8 1.5",
  key: "lvuxfi"
}], ["path", {
  d: "M22 22v-4h-4",
  key: "1ewp4q"
}], ["path", {
  d: "m22 18-1.535 1.605a5 5 0 0 1-8-1.5",
  key: "14ync0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _h = $r("Folder", [["path", {
  d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  key: "1kt360"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QRr = $r("Gamepad2", [["line", {
  x1: "6",
  x2: "10",
  y1: "11",
  y2: "11",
  key: "1gktln"
}], ["line", {
  x1: "8",
  x2: "8",
  y1: "9",
  y2: "13",
  key: "qnk9ow"
}], ["line", {
  x1: "15",
  x2: "15.01",
  y1: "12",
  y2: "12",
  key: "krot7o"
}], ["line", {
  x1: "18",
  x2: "18.01",
  y1: "10",
  y2: "10",
  key: "1lcuu1"
}], ["path", {
  d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
  key: "mfqc10"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uEt = $r("Gauge", [["path", {
  d: "m12 14 4-4",
  key: "9kzdfg"
}], ["path", {
  d: "M3.34 19a10 10 0 1 1 17.32 0",
  key: "19p75a"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hEt = $r("GitBranch", [["line", {
  x1: "6",
  x2: "6",
  y1: "3",
  y2: "15",
  key: "17qcm7"
}], ["circle", {
  cx: "18",
  cy: "6",
  r: "3",
  key: "1h7g24"
}], ["circle", {
  cx: "6",
  cy: "18",
  r: "3",
  key: "fqmcym"
}], ["path", {
  d: "M18 9a9 9 0 0 1-9 9",
  key: "n2h4wq"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TLe = $r("GitCompare", [["circle", {
  cx: "18",
  cy: "18",
  r: "3",
  key: "1xkwt0"
}], ["circle", {
  cx: "6",
  cy: "6",
  r: "3",
  key: "1lh9wr"
}], ["path", {
  d: "M13 6h3a2 2 0 0 1 2 2v7",
  key: "1yeb86"
}], ["path", {
  d: "M11 18H8a2 2 0 0 1-2-2V9",
  key: "19pyzm"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fWt = $r("GitMerge", [["circle", {
  cx: "18",
  cy: "18",
  r: "3",
  key: "1xkwt0"
}], ["circle", {
  cx: "6",
  cy: "6",
  r: "3",
  key: "1lh9wr"
}], ["path", {
  d: "M6 21V9a9 9 0 0 0 9 9",
  key: "7kw0sc"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YRr = $r("Github", [["path", {
  d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
  key: "tonef"
}], ["path", {
  d: "M9 18c-4.51 2-5-2-7-2",
  key: "9comsn"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i9 = $r("Globe", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
  key: "13o1zl"
}], ["path", {
  d: "M2 12h20",
  key: "9i4pu4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bv = $r("Grid3x3", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M3 9h18",
  key: "1pudct"
}], ["path", {
  d: "M3 15h18",
  key: "5xshup"
}], ["path", {
  d: "M9 3v18",
  key: "fh3hqa"
}], ["path", {
  d: "M15 3v18",
  key: "14nvp0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XRr = $r("GripVertical", [["circle", {
  cx: "9",
  cy: "12",
  r: "1",
  key: "1vctgf"
}], ["circle", {
  cx: "9",
  cy: "5",
  r: "1",
  key: "hp0tcf"
}], ["circle", {
  cx: "9",
  cy: "19",
  r: "1",
  key: "fkjjf6"
}], ["circle", {
  cx: "15",
  cy: "12",
  r: "1",
  key: "1tmaij"
}], ["circle", {
  cx: "15",
  cy: "5",
  r: "1",
  key: "19l28e"
}], ["circle", {
  cx: "15",
  cy: "19",
  r: "1",
  key: "f4zoj3"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JRr = $r("Grip", [["circle", {
  cx: "12",
  cy: "5",
  r: "1",
  key: "gxeob9"
}], ["circle", {
  cx: "19",
  cy: "5",
  r: "1",
  key: "w8mnmm"
}], ["circle", {
  cx: "5",
  cy: "5",
  r: "1",
  key: "lttvr7"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "1",
  key: "41hilf"
}], ["circle", {
  cx: "19",
  cy: "12",
  r: "1",
  key: "1wjl8i"
}], ["circle", {
  cx: "5",
  cy: "12",
  r: "1",
  key: "1pcz8c"
}], ["circle", {
  cx: "12",
  cy: "19",
  r: "1",
  key: "lyex9k"
}], ["circle", {
  cx: "19",
  cy: "19",
  r: "1",
  key: "shf9b7"
}], ["circle", {
  cx: "5",
  cy: "19",
  r: "1",
  key: "bfqh0e"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZRr = $r("Group", [["path", {
  d: "M3 7V5c0-1.1.9-2 2-2h2",
  key: "adw53z"
}], ["path", {
  d: "M17 3h2c1.1 0 2 .9 2 2v2",
  key: "an4l38"
}], ["path", {
  d: "M21 17v2c0 1.1-.9 2-2 2h-2",
  key: "144t0e"
}], ["path", {
  d: "M7 21H5c-1.1 0-2-.9-2-2v-2",
  key: "rtnfgi"
}], ["rect", {
  width: "7",
  height: "5",
  x: "7",
  y: "7",
  rx: "1",
  key: "1eyiv7"
}], ["rect", {
  width: "7",
  height: "5",
  x: "10",
  y: "12",
  rx: "1",
  key: "1qlmkx"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zle = $r("Hand", [["path", {
  d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
  key: "1fvzgz"
}], ["path", {
  d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",
  key: "1kc0my"
}], ["path", {
  d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",
  key: "10h0bg"
}], ["path", {
  d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
  key: "1s1gnw"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const axe = $r("HardDrive", [["line", {
  x1: "22",
  x2: "2",
  y1: "12",
  y2: "12",
  key: "1y58io"
}], ["path", {
  d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
  key: "oot6mr"
}], ["line", {
  x1: "6",
  x2: "6.01",
  y1: "16",
  y2: "16",
  key: "sgf278"
}], ["line", {
  x1: "10",
  x2: "10.01",
  y1: "16",
  y2: "16",
  key: "1l4acy"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aTn = $r("Hash", [["line", {
  x1: "4",
  x2: "20",
  y1: "9",
  y2: "9",
  key: "4lhtct"
}], ["line", {
  x1: "4",
  x2: "20",
  y1: "15",
  y2: "15",
  key: "vyu0kd"
}], ["line", {
  x1: "10",
  x2: "8",
  y1: "3",
  y2: "21",
  key: "1ggp8o"
}], ["line", {
  x1: "16",
  x2: "14",
  y1: "3",
  y2: "21",
  key: "weycgp"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MLe = $r("Heart", [["path", {
  d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  key: "c3ymky"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eNr = $r("Hexagon", [["path", {
  d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  key: "yt0hxn"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pEt = $r("Highlighter", [["path", {
  d: "m9 11-6 6v3h9l3-3",
  key: "1a3l36"
}], ["path", {
  d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4",
  key: "14a9rk"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wv = $r("History", [["path", {
  d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
  key: "1357e3"
}], ["path", {
  d: "M3 3v5h5",
  key: "1xhq8a"
}], ["path", {
  d: "M12 7v5l4 2",
  key: "1fdv2h"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mEt = $r("House", [["path", {
  d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
  key: "5wwlr5"
}], ["path", {
  d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  key: "1d0kgt"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tNr = $r("ImageDown", [["path", {
  d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
  key: "9csbqa"
}], ["path", {
  d: "m14 19 3 3v-5.5",
  key: "9ldu5r"
}], ["path", {
  d: "m17 22 3-3",
  key: "1nkfve"
}], ["circle", {
  cx: "9",
  cy: "9",
  r: "2",
  key: "af1f0g"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GK = $r("ImageMinus", [["path", {
  d: "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7",
  key: "m87ecr"
}], ["line", {
  x1: "16",
  x2: "22",
  y1: "5",
  y2: "5",
  key: "ez7e4s"
}], ["circle", {
  cx: "9",
  cy: "9",
  r: "2",
  key: "af1f0g"
}], ["path", {
  d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
  key: "1xmnt7"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iTn = $r("ImageOff", [["line", {
  x1: "2",
  x2: "22",
  y1: "2",
  y2: "22",
  key: "a6p6uj"
}], ["path", {
  d: "M10.41 10.41a2 2 0 1 1-2.83-2.83",
  key: "1bzlo9"
}], ["line", {
  x1: "13.5",
  x2: "6",
  y1: "13.5",
  y2: "21",
  key: "1q0aeu"
}], ["line", {
  x1: "18",
  x2: "21",
  y1: "12",
  y2: "15",
  key: "5mozeu"
}], ["path", {
  d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
  key: "mmje98"
}], ["path", {
  d: "M21 15V5a2 2 0 0 0-2-2H9",
  key: "43el77"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mu = $r("ImagePlus", [["path", {
  d: "M16 5h6",
  key: "1vod17"
}], ["path", {
  d: "M19 2v6",
  key: "4bpg5p"
}], ["path", {
  d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
  key: "1ue2ih"
}], ["path", {
  d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
  key: "1xmnt7"
}], ["circle", {
  cx: "9",
  cy: "9",
  r: "2",
  key: "af1f0g"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo = $r("Image", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  ry: "2",
  key: "1m3agn"
}], ["circle", {
  cx: "9",
  cy: "9",
  r: "2",
  key: "af1f0g"
}], ["path", {
  d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
  key: "1xmnt7"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FM = $r("Images", [["path", {
  d: "M18 22H4a2 2 0 0 1-2-2V6",
  key: "pblm9e"
}], ["path", {
  d: "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18",
  key: "nf6bnh"
}], ["circle", {
  cx: "12",
  cy: "8",
  r: "2",
  key: "1822b1"
}], ["rect", {
  width: "16",
  height: "16",
  x: "6",
  y: "2",
  rx: "2",
  key: "12espp"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gWt = $r("Import", [["path", {
  d: "M12 3v12",
  key: "1x0j5s"
}], ["path", {
  d: "m8 11 4 4 4-4",
  key: "1dohi6"
}], ["path", {
  d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",
  key: "1ywtjm"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JHe = $r("Info", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M12 16v-4",
  key: "1dtifu"
}], ["path", {
  d: "M12 8h.01",
  key: "e9boi3"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nNr = $r("Italic", [["line", {
  x1: "19",
  x2: "10",
  y1: "4",
  y2: "4",
  key: "15jd3p"
}], ["line", {
  x1: "14",
  x2: "5",
  y1: "20",
  y2: "20",
  key: "bu0au3"
}], ["line", {
  x1: "15",
  x2: "9",
  y1: "4",
  y2: "20",
  key: "uljnxc"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fEt = $r("KeyRound", [["path", {
  d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
  key: "1s6t7t"
}], ["circle", {
  cx: "16.5",
  cy: "7.5",
  r: ".5",
  fill: "currentColor",
  key: "w0ekpg"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oTn = $r("Key", [["path", {
  d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
  key: "g0fldk"
}], ["path", {
  d: "m21 2-9.6 9.6",
  key: "1j0ho8"
}], ["circle", {
  cx: "7.5",
  cy: "15.5",
  r: "5.5",
  key: "yqb3hr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rNr = $r("Landmark", [["line", {
  x1: "3",
  x2: "21",
  y1: "22",
  y2: "22",
  key: "j8o0r"
}], ["line", {
  x1: "6",
  x2: "6",
  y1: "18",
  y2: "11",
  key: "10tf0k"
}], ["line", {
  x1: "10",
  x2: "10",
  y1: "18",
  y2: "11",
  key: "54lgf6"
}], ["line", {
  x1: "14",
  x2: "14",
  y1: "18",
  y2: "11",
  key: "380y"
}], ["line", {
  x1: "18",
  x2: "18",
  y1: "18",
  y2: "11",
  key: "1kevvc"
}], ["polygon", {
  points: "12 2 20 7 4 7",
  key: "jkujk7"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aNr = $r("Languages", [["path", {
  d: "m5 8 6 6",
  key: "1wu5hv"
}], ["path", {
  d: "m4 14 6-6 2-3",
  key: "1k1g8d"
}], ["path", {
  d: "M2 5h12",
  key: "or177f"
}], ["path", {
  d: "M7 2h1",
  key: "1t2jsx"
}], ["path", {
  d: "m22 22-5-10-5 10",
  key: "don7ne"
}], ["path", {
  d: "M14 18h6",
  key: "1m8k6r"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ixe = $r("Layers2", [["path", {
  d: "m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12",
  key: "1cuww1"
}], ["path", {
  d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z",
  key: "pdlvxu"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y2 = $r("Layers", [["path", {
  d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
  key: "zw3jo"
}], ["path", {
  d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
  key: "1wduqc"
}], ["path", {
  d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
  key: "kqbvx6"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZHe = $r("LayoutDashboard", [["rect", {
  width: "7",
  height: "9",
  x: "3",
  y: "3",
  rx: "1",
  key: "10lvy0"
}], ["rect", {
  width: "7",
  height: "5",
  x: "14",
  y: "3",
  rx: "1",
  key: "16une8"
}], ["rect", {
  width: "7",
  height: "9",
  x: "14",
  y: "12",
  rx: "1",
  key: "1hutg5"
}], ["rect", {
  width: "7",
  height: "5",
  x: "3",
  y: "16",
  rx: "1",
  key: "ldoo1y"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Od = $r("LayoutGrid", [["rect", {
  width: "7",
  height: "7",
  x: "3",
  y: "3",
  rx: "1",
  key: "1g98yp"
}], ["rect", {
  width: "7",
  height: "7",
  x: "14",
  y: "3",
  rx: "1",
  key: "6d4xhi"
}], ["rect", {
  width: "7",
  height: "7",
  x: "14",
  y: "14",
  rx: "1",
  key: "nxv5o0"
}], ["rect", {
  width: "7",
  height: "7",
  x: "3",
  y: "14",
  rx: "1",
  key: "1bb6yr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PY = $r("Lightbulb", [["path", {
  d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
  key: "1gvzjb"
}], ["path", {
  d: "M9 18h6",
  key: "x1upvd"
}], ["path", {
  d: "M10 22h4",
  key: "ceow96"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iNr = $r("Link2Off", [["path", {
  d: "M9 17H7A5 5 0 0 1 7 7",
  key: "10o201"
}], ["path", {
  d: "M15 7h2a5 5 0 0 1 4 8",
  key: "1d3206"
}], ["line", {
  x1: "8",
  x2: "12",
  y1: "12",
  y2: "12",
  key: "rvw6j4"
}], ["line", {
  x1: "2",
  x2: "22",
  y1: "2",
  y2: "22",
  key: "a6p6uj"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wz = $r("Link2", [["path", {
  d: "M9 17H7A5 5 0 0 1 7 7h2",
  key: "8i5ue5"
}], ["path", {
  d: "M15 7h2a5 5 0 1 1 0 10h-2",
  key: "1b9ql8"
}], ["line", {
  x1: "8",
  x2: "16",
  y1: "12",
  y2: "12",
  key: "1jonct"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w5e = $r("Link", [["path", {
  d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
  key: "1cjeqo"
}], ["path", {
  d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  key: "19qd67"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PLe = $r("ListChecks", [["path", {
  d: "m3 17 2 2 4-4",
  key: "1jhpwq"
}], ["path", {
  d: "m3 7 2 2 4-4",
  key: "1obspn"
}], ["path", {
  d: "M13 6h8",
  key: "15sg57"
}], ["path", {
  d: "M13 12h8",
  key: "h98zly"
}], ["path", {
  d: "M13 18h8",
  key: "oe0vm4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gEt = $r("ListOrdered", [["path", {
  d: "M10 12h11",
  key: "6m4ad9"
}], ["path", {
  d: "M10 18h11",
  key: "11hvi2"
}], ["path", {
  d: "M10 6h11",
  key: "c7qv1k"
}], ["path", {
  d: "M4 10h2",
  key: "16xx2s"
}], ["path", {
  d: "M4 6h1v4",
  key: "cnovpq"
}], ["path", {
  d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",
  key: "m9a95d"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X$ = $r("List", [["path", {
  d: "M3 12h.01",
  key: "nlz23k"
}], ["path", {
  d: "M3 18h.01",
  key: "1tta3j"
}], ["path", {
  d: "M3 6h.01",
  key: "1rqtza"
}], ["path", {
  d: "M8 12h13",
  key: "1za7za"
}], ["path", {
  d: "M8 18h13",
  key: "1lx6n3"
}], ["path", {
  d: "M8 6h13",
  key: "ik3vkj"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ua = $r("LoaderCircle", [["path", {
  d: "M21 12a9 9 0 1 1-6.219-8.56",
  key: "13zald"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zet = $r("Loader", [["path", {
  d: "M12 2v4",
  key: "3427ic"
}], ["path", {
  d: "m16.2 7.8 2.9-2.9",
  key: "r700ao"
}], ["path", {
  d: "M18 12h4",
  key: "wj9ykh"
}], ["path", {
  d: "m16.2 16.2 2.9 2.9",
  key: "1bxg5t"
}], ["path", {
  d: "M12 18v4",
  key: "jadmvz"
}], ["path", {
  d: "m4.9 19.1 2.9-2.9",
  key: "bwix9q"
}], ["path", {
  d: "M2 12h4",
  key: "j09sii"
}], ["path", {
  d: "m4.9 4.9 2.9 2.9",
  key: "giyufr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oNr = $r("LocateFixed", [["line", {
  x1: "2",
  x2: "5",
  y1: "12",
  y2: "12",
  key: "bvdh0s"
}], ["line", {
  x1: "19",
  x2: "22",
  y1: "12",
  y2: "12",
  key: "1tbv5k"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "2",
  y2: "5",
  key: "11lu5j"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "19",
  y2: "22",
  key: "x3vr5v"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "7",
  key: "fim9np"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "3",
  key: "1v7zrd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yWt = $r("LockKeyhole", [["circle", {
  cx: "12",
  cy: "16",
  r: "1",
  key: "1au0dj"
}], ["rect", {
  x: "3",
  y: "10",
  width: "18",
  height: "12",
  rx: "2",
  key: "6s8ecr"
}], ["path", {
  d: "M7 10V7a5 5 0 0 1 10 0v3",
  key: "1pqi11"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oxe = $r("LockOpen", [["rect", {
  width: "18",
  height: "11",
  x: "3",
  y: "11",
  rx: "2",
  ry: "2",
  key: "1w4ew1"
}], ["path", {
  d: "M7 11V7a5 5 0 0 1 9.9-1",
  key: "1mm8w8"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ece = $r("Lock", [["rect", {
  width: "18",
  height: "11",
  x: "3",
  y: "11",
  rx: "2",
  ry: "2",
  key: "1w4ew1"
}], ["path", {
  d: "M7 11V7a5 5 0 0 1 10 0v4",
  key: "fwvmzm"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sNr = $r("LogOut", [["path", {
  d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
  key: "1uf3rs"
}], ["polyline", {
  points: "16 17 21 12 16 7",
  key: "1gabdz"
}], ["line", {
  x1: "21",
  x2: "9",
  y1: "12",
  y2: "12",
  key: "1uyos4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lNr = $r("Magnet", [["path", {
  d: "m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15",
  key: "1i3lhw"
}], ["path", {
  d: "m5 8 4 4",
  key: "j6kj7e"
}], ["path", {
  d: "m12 15 4 4",
  key: "lnac28"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sxe = $r("MapPin", [["path", {
  d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
  key: "1r0f0z"
}], ["circle", {
  cx: "12",
  cy: "10",
  r: "3",
  key: "ilqhr7"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gmt = $r("Map", [["path", {
  d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
  key: "169xi5"
}], ["path", {
  d: "M15 5.764v15",
  key: "1pn4in"
}], ["path", {
  d: "M9 3.236v15",
  key: "1uimfh"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wm = $r("Maximize2", [["polyline", {
  points: "15 3 21 3 21 9",
  key: "mznyad"
}], ["polyline", {
  points: "9 21 3 21 3 15",
  key: "1avn1i"
}], ["line", {
  x1: "21",
  x2: "14",
  y1: "3",
  y2: "10",
  key: "ota7mn"
}], ["line", {
  x1: "3",
  x2: "10",
  y1: "21",
  y2: "14",
  key: "1atl0r"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gue = $r("Maximize", [["path", {
  d: "M8 3H5a2 2 0 0 0-2 2v3",
  key: "1dcmit"
}], ["path", {
  d: "M21 8V5a2 2 0 0 0-2-2h-3",
  key: "1e4gt3"
}], ["path", {
  d: "M3 16v3a2 2 0 0 0 2 2h3",
  key: "wsl5sc"
}], ["path", {
  d: "M16 21h3a2 2 0 0 0 2-2v-3",
  key: "18trek"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bWt = $r("Merge", [["path", {
  d: "m8 6 4-4 4 4",
  key: "ybng9g"
}], ["path", {
  d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22",
  key: "1hyw0i"
}], ["path", {
  d: "m20 22-5-5",
  key: "1m27yz"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sTn = $r("MessageCircle", [["path", {
  d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
  key: "vv11sd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cNr = $r("MessageSquarePlus", [["path", {
  d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  key: "1lielz"
}], ["path", {
  d: "M12 7v6",
  key: "lw1j43"
}], ["path", {
  d: "M9 10h6",
  key: "9gxzsh"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dNr = $r("MessageSquareText", [["path", {
  d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  key: "1lielz"
}], ["path", {
  d: "M13 8H7",
  key: "14i4kc"
}], ["path", {
  d: "M17 12H7",
  key: "16if0g"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qv = $r("MessageSquare", [["path", {
  d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  key: "1lielz"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lTn = $r("MicVocal", [["path", {
  d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
  key: "80a601"
}], ["path", {
  d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
  key: "j0ngtp"
}], ["circle", {
  cx: "16",
  cy: "7",
  r: "5",
  key: "d08jfb"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cTn = $r("Mic", [["path", {
  d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",
  key: "131961"
}], ["path", {
  d: "M19 10v2a7 7 0 0 1-14 0v-2",
  key: "1vc78b"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "19",
  y2: "22",
  key: "x3vr5v"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AT = $r("Minimize2", [["polyline", {
  points: "4 14 10 14 10 20",
  key: "11kfnr"
}], ["polyline", {
  points: "20 10 14 10 14 4",
  key: "rlmsce"
}], ["line", {
  x1: "14",
  x2: "21",
  y1: "10",
  y2: "3",
  key: "o5lafz"
}], ["line", {
  x1: "3",
  x2: "10",
  y1: "21",
  y2: "14",
  key: "1atl0r"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uNr = $r("Minimize", [["path", {
  d: "M8 3v3a2 2 0 0 1-2 2H3",
  key: "hohbtr"
}], ["path", {
  d: "M21 8h-3a2 2 0 0 1-2-2V3",
  key: "5jw1f3"
}], ["path", {
  d: "M3 16h3a2 2 0 0 1 2 2v3",
  key: "198tvr"
}], ["path", {
  d: "M16 21v-3a2 2 0 0 1 2-2h3",
  key: "ph8mxp"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AS = $r("Minus", [["path", {
  d: "M5 12h14",
  key: "1ays0h"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hNr = $r("MonitorPlay", [["path", {
  d: "M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z",
  key: "1pctta"
}], ["path", {
  d: "M12 17v4",
  key: "1riwvh"
}], ["path", {
  d: "M8 21h8",
  key: "1ev6f3"
}], ["rect", {
  x: "2",
  y: "3",
  width: "20",
  height: "14",
  rx: "2",
  key: "x3v2xh"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dTn = $r("Moon", [["path", {
  d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
  key: "a7tn18"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pNr = $r("Mountain", [["path", {
  d: "m8 3 4 8 5-5 5 15H2L8 3z",
  key: "otkl63"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x5e = $r("MousePointer2", [["path", {
  d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
  key: "edeuup"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yEt = $r("MousePointerClick", [["path", {
  d: "M14 4.1 12 6",
  key: "ita8i4"
}], ["path", {
  d: "m5.1 8-2.9-.8",
  key: "1go3kf"
}], ["path", {
  d: "m6 12-1.9 2",
  key: "mnht97"
}], ["path", {
  d: "M7.2 2.2 8 5.1",
  key: "1cfko1"
}], ["path", {
  d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
  key: "s0h3yz"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mNr = $r("Move3d", [["path", {
  d: "M5 3v16h16",
  key: "1mqmf9"
}], ["path", {
  d: "m5 19 6-6",
  key: "jh6hbb"
}], ["path", {
  d: "m2 6 3-3 3 3",
  key: "tkyvxa"
}], ["path", {
  d: "m18 16 3 3-3 3",
  key: "1d4glt"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uTn = $r("MoveHorizontal", [["path", {
  d: "m18 8 4 4-4 4",
  key: "1ak13k"
}], ["path", {
  d: "M2 12h20",
  key: "9i4pu4"
}], ["path", {
  d: "m6 8-4 4 4 4",
  key: "15zrgr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hTn = $r("MoveLeft", [["path", {
  d: "M6 8L2 12L6 16",
  key: "kyvwex"
}], ["path", {
  d: "M2 12H22",
  key: "1m8cig"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pTn = $r("MoveRight", [["path", {
  d: "M18 8L22 12L18 16",
  key: "1r0oui"
}], ["path", {
  d: "M2 12H22",
  key: "1m8cig"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RY = $r("Move", [["path", {
  d: "M12 2v20",
  key: "t6zp3m"
}], ["path", {
  d: "m15 19-3 3-3-3",
  key: "11eu04"
}], ["path", {
  d: "m19 9 3 3-3 3",
  key: "1mg7y2"
}], ["path", {
  d: "M2 12h20",
  key: "9i4pu4"
}], ["path", {
  d: "m5 9-3 3 3 3",
  key: "j64kie"
}], ["path", {
  d: "m9 5 3-3 3 3",
  key: "l8vdw6"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sne = $r("Music2", [["circle", {
  cx: "8",
  cy: "18",
  r: "4",
  key: "1fc0mg"
}], ["path", {
  d: "M12 18V2l7 4",
  key: "g04rme"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qh = $r("Music", [["path", {
  d: "M9 18V5l12-2v13",
  key: "1jmyc2"
}], ["circle", {
  cx: "6",
  cy: "18",
  r: "3",
  key: "fqmcym"
}], ["circle", {
  cx: "18",
  cy: "16",
  r: "3",
  key: "1hluhg"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mTn = $r("Navigation2", [["polygon", {
  points: "12 2 19 21 12 17 5 21 12 2",
  key: "x8c0qg"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fTn = $r("Navigation", [["polygon", {
  points: "3 11 22 2 13 21 11 13 3 11",
  key: "1ltx0t"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eWe = $r("Network", [["rect", {
  x: "16",
  y: "16",
  width: "6",
  height: "6",
  rx: "1",
  key: "4q2zg0"
}], ["rect", {
  x: "2",
  y: "16",
  width: "6",
  height: "6",
  rx: "1",
  key: "8cvhb9"
}], ["rect", {
  x: "9",
  y: "2",
  width: "6",
  height: "6",
  rx: "1",
  key: "1egb70"
}], ["path", {
  d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
  key: "1jsf9p"
}], ["path", {
  d: "M12 12V8",
  key: "2874zd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tWe = $r("Orbit", [["circle", {
  cx: "12",
  cy: "12",
  r: "3",
  key: "1v7zrd"
}], ["circle", {
  cx: "19",
  cy: "5",
  r: "2",
  key: "mhkx31"
}], ["circle", {
  cx: "5",
  cy: "19",
  r: "2",
  key: "v8kfzx"
}], ["path", {
  d: "M10.4 21.9a10 10 0 0 0 9.941-15.416",
  key: "eohfx2"
}], ["path", {
  d: "M13.5 2.1a10 10 0 0 0-9.841 15.416",
  key: "19pvbm"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lxe = $r("Package", [["path", {
  d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
  key: "1a0edw"
}], ["path", {
  d: "M12 22V12",
  key: "d0xqtd"
}], ["path", {
  d: "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",
  key: "yx3hmr"
}], ["path", {
  d: "m7.5 4.27 9 5.15",
  key: "1c824w"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _5e = $r("Paintbrush", [["path", {
  d: "m14.622 17.897-10.68-2.913",
  key: "vj2p1u"
}], ["path", {
  d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",
  key: "18tc5c"
}], ["path", {
  d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",
  key: "ytzfxy"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tw = $r("Palette", [["circle", {
  cx: "13.5",
  cy: "6.5",
  r: ".5",
  fill: "currentColor",
  key: "1okk4w"
}], ["circle", {
  cx: "17.5",
  cy: "10.5",
  r: ".5",
  fill: "currentColor",
  key: "f64h9f"
}], ["circle", {
  cx: "8.5",
  cy: "7.5",
  r: ".5",
  fill: "currentColor",
  key: "fotxhn"
}], ["circle", {
  cx: "6.5",
  cy: "12.5",
  r: ".5",
  fill: "currentColor",
  key: "qy21gx"
}], ["path", {
  d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
  key: "12rzf8"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fNr = $r("PanelLeftClose", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M9 3v18",
  key: "fh3hqa"
}], ["path", {
  d: "m16 15-3-3 3-3",
  key: "14y99z"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gNr = $r("PanelLeftOpen", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M9 3v18",
  key: "fh3hqa"
}], ["path", {
  d: "m14 9 3 3-3 3",
  key: "8010ee"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yNr = $r("PanelRight", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M15 3v18",
  key: "14nvp0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vWt = $r("PanelsTopLeft", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M3 9h18",
  key: "1pudct"
}], ["path", {
  d: "M9 21V9",
  key: "1oto5p"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bNr = $r("Paperclip", [["path", {
  d: "M13.234 20.252 21 12.3",
  key: "1cbrk9"
}], ["path", {
  d: "m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486",
  key: "1pkts6"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d3 = $r("Pause", [["rect", {
  x: "14",
  y: "4",
  width: "4",
  height: "16",
  rx: "1",
  key: "zuxfzm"
}], ["rect", {
  x: "6",
  y: "4",
  width: "4",
  height: "16",
  rx: "1",
  key: "1okwgv"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SP = $r("PenLine", [["path", {
  d: "M12 20h9",
  key: "t2du7b"
}], ["path", {
  d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
  key: "1ykcvy"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vue = $r("PenTool", [["path", {
  d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
  key: "nt11vn"
}], ["path", {
  d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
  key: "15qc1e"
}], ["path", {
  d: "m2.3 2.3 7.286 7.286",
  key: "1wuzzi"
}], ["circle", {
  cx: "11",
  cy: "11",
  r: "2",
  key: "xmgehs"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bEt = $r("Pen", [["path", {
  d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
  key: "1a8usu"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nw = $r("Pencil", [["path", {
  d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
  key: "1a8usu"
}], ["path", {
  d: "m15 5 4 4",
  key: "1mk7zo"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vNr = $r("Pilcrow", [["path", {
  d: "M13 4v16",
  key: "8vvj80"
}], ["path", {
  d: "M17 4v16",
  key: "7dpous"
}], ["path", {
  d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13",
  key: "sh4n9v"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k5e = $r("PinOff", [["path", {
  d: "M12 17v5",
  key: "bb1du9"
}], ["path", {
  d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89",
  key: "znwnzq"
}], ["path", {
  d: "m2 2 20 20",
  key: "1ooewy"
}], ["path", {
  d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
  key: "c9qhm2"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zM = $r("Pin", [["path", {
  d: "M12 17v5",
  key: "bb1du9"
}], ["path", {
  d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
  key: "1nkz8b"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wNr = $r("Pipette", [["path", {
  d: "m2 22 1-1h3l9-9",
  key: "1sre89"
}], ["path", {
  d: "M3 21v-3l9-9",
  key: "hpe2y6"
}], ["path", {
  d: "m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z",
  key: "196du1"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gTn = $r("Plane", [["path", {
  d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  key: "1v9wt8"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ol = $r("Play", [["polygon", {
  points: "6 3 20 12 6 21 6 3",
  key: "1oa8hb"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xNr = $r("Plug", [["path", {
  d: "M12 22v-5",
  key: "1ega77"
}], ["path", {
  d: "M9 8V2",
  key: "14iosj"
}], ["path", {
  d: "M15 8V2",
  key: "18g5xt"
}], ["path", {
  d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z",
  key: "osxo6l"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo = $r("Plus", [["path", {
  d: "M5 12h14",
  key: "1ays0h"
}], ["path", {
  d: "M12 5v14",
  key: "s699le"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yTn = $r("Presentation", [["path", {
  d: "M2 3h20",
  key: "91anmk"
}], ["path", {
  d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",
  key: "2k9sn8"
}], ["path", {
  d: "m7 21 5-5 5 5",
  key: "bip4we"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NY = $r("Quote", [["path", {
  d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
  key: "rib7q0"
}], ["path", {
  d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
  key: "1ymkrd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A5e = $r("RectangleHorizontal", [["rect", {
  width: "20",
  height: "12",
  x: "2",
  y: "6",
  rx: "2",
  key: "9lu3g6"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bTn = $r("RectangleVertical", [["rect", {
  width: "12",
  height: "20",
  x: "6",
  y: "2",
  rx: "2",
  key: "1oxtiu"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J$ = $r("Redo2", [["path", {
  d: "m15 14 5-5-5-5",
  key: "12vg1m"
}], ["path", {
  d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",
  key: "6uklza"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vEt = $r("RefreshCcw", [["path", {
  d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
  key: "14sxne"
}], ["path", {
  d: "M3 3v5h5",
  key: "1xhq8a"
}], ["path", {
  d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",
  key: "1hlbsb"
}], ["path", {
  d: "M16 16h5v5",
  key: "ccwih5"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bd = $r("RefreshCw", [["path", {
  d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
  key: "v9h5vc"
}], ["path", {
  d: "M21 3v5h-5",
  key: "1q7to0"
}], ["path", {
  d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
  key: "3uifl3"
}], ["path", {
  d: "M8 16H3v5",
  key: "1cv678"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vTn = $r("Repeat2", [["path", {
  d: "m2 9 3-3 3 3",
  key: "1ltn5i"
}], ["path", {
  d: "M13 18H7a2 2 0 0 1-2-2V6",
  key: "1r6tfw"
}], ["path", {
  d: "m22 15-3 3-3-3",
  key: "4rnwn2"
}], ["path", {
  d: "M11 6h6a2 2 0 0 1 2 2v10",
  key: "2f72bc"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wTn = $r("Rewind", [["polygon", {
  points: "11 19 2 12 11 5 11 19",
  key: "14yba5"
}], ["polygon", {
  points: "22 19 13 12 22 5 22 19",
  key: "1pi1cj"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vd = $r("RotateCcw", [["path", {
  d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
  key: "1357e3"
}], ["path", {
  d: "M3 3v5h5",
  key: "1xhq8a"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ox = $r("RotateCw", [["path", {
  d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
  key: "1p45f6"
}], ["path", {
  d: "M21 3v5h-5",
  key: "1q7to0"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _Nr = $r("Route", [["circle", {
  cx: "6",
  cy: "19",
  r: "3",
  key: "1kj8tv"
}], ["path", {
  d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",
  key: "1d8sl"
}], ["circle", {
  cx: "18",
  cy: "5",
  r: "3",
  key: "gq8acd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O5 = $r("Save", [["path", {
  d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
  key: "1c8476"
}], ["path", {
  d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
  key: "1ydtos"
}], ["path", {
  d: "M7 3v4a1 1 0 0 0 1 1h7",
  key: "t51u73"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kNr = $r("Scale", [["path", {
  d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
  key: "7g6ntu"
}], ["path", {
  d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
  key: "ijws7r"
}], ["path", {
  d: "M7 21h10",
  key: "1b0cd5"
}], ["path", {
  d: "M12 3v18",
  key: "108xh3"
}], ["path", {
  d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
  key: "3gwbw2"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wEt = $r("ScanFace", [["path", {
  d: "M3 7V5a2 2 0 0 1 2-2h2",
  key: "aa7l1z"
}], ["path", {
  d: "M17 3h2a2 2 0 0 1 2 2v2",
  key: "4qcy5o"
}], ["path", {
  d: "M21 17v2a2 2 0 0 1-2 2h-2",
  key: "6vwrx8"
}], ["path", {
  d: "M7 21H5a2 2 0 0 1-2-2v-2",
  key: "ioqczr"
}], ["path", {
  d: "M8 14s1.5 2 4 2 4-2 4-2",
  key: "1y1vjs"
}], ["path", {
  d: "M9 9h.01",
  key: "1q5me6"
}], ["path", {
  d: "M15 9h.01",
  key: "x1ddxp"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xTn = $r("ScanLine", [["path", {
  d: "M3 7V5a2 2 0 0 1 2-2h2",
  key: "aa7l1z"
}], ["path", {
  d: "M17 3h2a2 2 0 0 1 2 2v2",
  key: "4qcy5o"
}], ["path", {
  d: "M21 17v2a2 2 0 0 1-2 2h-2",
  key: "6vwrx8"
}], ["path", {
  d: "M7 21H5a2 2 0 0 1-2-2v-2",
  key: "ioqczr"
}], ["path", {
  d: "M7 12h10",
  key: "b7w52i"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hZ = $r("Scan", [["path", {
  d: "M3 7V5a2 2 0 0 1 2-2h2",
  key: "aa7l1z"
}], ["path", {
  d: "M17 3h2a2 2 0 0 1 2 2v2",
  key: "4qcy5o"
}], ["path", {
  d: "M21 17v2a2 2 0 0 1-2 2h-2",
  key: "6vwrx8"
}], ["path", {
  d: "M7 21H5a2 2 0 0 1-2-2v-2",
  key: "ioqczr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf = $r("Scissors", [["circle", {
  cx: "6",
  cy: "6",
  r: "3",
  key: "1lh9wr"
}], ["path", {
  d: "M8.12 8.12 12 12",
  key: "1alkpv"
}], ["path", {
  d: "M20 4 8.12 15.88",
  key: "xgtan2"
}], ["circle", {
  cx: "6",
  cy: "18",
  r: "3",
  key: "fqmcym"
}], ["path", {
  d: "M14.8 14.8 20 20",
  key: "ptml3r"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mc = $r("Search", [["circle", {
  cx: "11",
  cy: "11",
  r: "8",
  key: "4ej97u"
}], ["path", {
  d: "m21 21-4.3-4.3",
  key: "1qie3q"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zu = $r("Send", [["path", {
  d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
  key: "1ffxy3"
}], ["path", {
  d: "m21.854 2.147-10.94 10.939",
  key: "12cjpa"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _Tn = $r("Server", [["rect", {
  width: "20",
  height: "8",
  x: "2",
  y: "2",
  rx: "2",
  ry: "2",
  key: "ngkwjq"
}], ["rect", {
  width: "20",
  height: "8",
  x: "2",
  y: "14",
  rx: "2",
  ry: "2",
  key: "iecqi9"
}], ["line", {
  x1: "6",
  x2: "6.01",
  y1: "6",
  y2: "6",
  key: "16zg32"
}], ["line", {
  x1: "6",
  x2: "6.01",
  y1: "18",
  y2: "18",
  key: "nzw8ys"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pj = $r("Settings2", [["path", {
  d: "M20 7h-9",
  key: "3s1dr2"
}], ["path", {
  d: "M14 17H5",
  key: "gfn3mx"
}], ["circle", {
  cx: "17",
  cy: "17",
  r: "3",
  key: "18b49y"
}], ["circle", {
  cx: "7",
  cy: "7",
  r: "3",
  key: "dfmy0x"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IP = $r("Settings", [["path", {
  d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
  key: "1qme2f"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "3",
  key: "1v7zrd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kTn = $r("Shapes", [["path", {
  d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
  key: "1bo67w"
}], ["rect", {
  x: "3",
  y: "14",
  width: "7",
  height: "7",
  rx: "1",
  key: "1bkyp8"
}], ["circle", {
  cx: "17.5",
  cy: "17.5",
  r: "3.5",
  key: "w3z12y"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ATn = $r("Share2", [["circle", {
  cx: "18",
  cy: "5",
  r: "3",
  key: "gq8acd"
}], ["circle", {
  cx: "6",
  cy: "12",
  r: "3",
  key: "w7nqdw"
}], ["circle", {
  cx: "18",
  cy: "19",
  r: "3",
  key: "1xt0gg"
}], ["line", {
  x1: "8.59",
  x2: "15.42",
  y1: "13.51",
  y2: "17.49",
  key: "47mynk"
}], ["line", {
  x1: "15.41",
  x2: "8.59",
  y1: "6.51",
  y2: "10.49",
  key: "1n3mei"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RLe = $r("ShieldAlert", [["path", {
  d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
  key: "oel41y"
}], ["path", {
  d: "M12 8v4",
  key: "1got3b"
}], ["path", {
  d: "M12 16h.01",
  key: "1drbdi"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const STn = $r("ShieldCheck", [["path", {
  d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
  key: "oel41y"
}], ["path", {
  d: "m9 12 2 2 4-4",
  key: "dzmm74"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ymt = $r("Shield", [["path", {
  d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
  key: "oel41y"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VK = $r("Shirt", [["path", {
  d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
  key: "1wgbhj"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ITn = $r("Shuffle", [["path", {
  d: "m18 14 4 4-4 4",
  key: "10pe0f"
}], ["path", {
  d: "m18 2 4 4-4 4",
  key: "pucp1d"
}], ["path", {
  d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",
  key: "1ailkh"
}], ["path", {
  d: "M2 6h1.972a4 4 0 0 1 3.6 2.2",
  key: "km57vx"
}], ["path", {
  d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",
  key: "os18l9"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const by = $r("SlidersHorizontal", [["line", {
  x1: "21",
  x2: "14",
  y1: "4",
  y2: "4",
  key: "obuewd"
}], ["line", {
  x1: "10",
  x2: "3",
  y1: "4",
  y2: "4",
  key: "1q6298"
}], ["line", {
  x1: "21",
  x2: "12",
  y1: "12",
  y2: "12",
  key: "1iu8h1"
}], ["line", {
  x1: "8",
  x2: "3",
  y1: "12",
  y2: "12",
  key: "ntss68"
}], ["line", {
  x1: "21",
  x2: "16",
  y1: "20",
  y2: "20",
  key: "14d8ph"
}], ["line", {
  x1: "12",
  x2: "3",
  y1: "20",
  y2: "20",
  key: "m0wm8r"
}], ["line", {
  x1: "14",
  x2: "14",
  y1: "2",
  y2: "6",
  key: "14e1ph"
}], ["line", {
  x1: "8",
  x2: "8",
  y1: "10",
  y2: "14",
  key: "1i6ji0"
}], ["line", {
  x1: "16",
  x2: "16",
  y1: "18",
  y2: "22",
  key: "1lctlv"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CTn = $r("Smartphone", [["rect", {
  width: "14",
  height: "20",
  x: "5",
  y: "2",
  rx: "2",
  ry: "2",
  key: "1yt0o3"
}], ["path", {
  d: "M12 18h.01",
  key: "mhygvu"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xEt = $r("Smile", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M8 14s1.5 2 4 2 4-2 4-2",
  key: "1y1vjs"
}], ["line", {
  x1: "9",
  x2: "9.01",
  y1: "9",
  y2: "9",
  key: "yxxnd0"
}], ["line", {
  x1: "15",
  x2: "15.01",
  y1: "9",
  y2: "9",
  key: "1p4y9e"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ANr = $r("Sofa", [["path", {
  d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3",
  key: "1dgpiv"
}], ["path", {
  d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
  key: "xacw8m"
}], ["path", {
  d: "M4 18v2",
  key: "jwo5n2"
}], ["path", {
  d: "M20 18v2",
  key: "1ar1qi"
}], ["path", {
  d: "M12 4v9",
  key: "oqhhn3"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wWt = $r("Space", [["path", {
  d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",
  key: "lt2kga"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SNr = $r("Sparkle", [["path", {
  d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
  key: "4pj2yx"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ac = $r("Sparkles", [["path", {
  d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
  key: "4pj2yx"
}], ["path", {
  d: "M20 3v4",
  key: "1olli1"
}], ["path", {
  d: "M22 5h-4",
  key: "1gvqau"
}], ["path", {
  d: "M4 17v2",
  key: "vumght"
}], ["path", {
  d: "M5 18H3",
  key: "zchphs"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xWt = $r("Spline", [["circle", {
  cx: "19",
  cy: "5",
  r: "2",
  key: "mhkx31"
}], ["circle", {
  cx: "5",
  cy: "19",
  r: "2",
  key: "v8kfzx"
}], ["path", {
  d: "M5 17A12 12 0 0 1 17 5",
  key: "1okkup"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const INr = $r("SquareArrowRight", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M8 12h8",
  key: "1wcyev"
}], ["path", {
  d: "m12 16 4-4-4-4",
  key: "1i9zcv"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uae = $r("SquareDashed", [["path", {
  d: "M5 3a2 2 0 0 0-2 2",
  key: "y57alp"
}], ["path", {
  d: "M19 3a2 2 0 0 1 2 2",
  key: "18rm91"
}], ["path", {
  d: "M21 19a2 2 0 0 1-2 2",
  key: "1j7049"
}], ["path", {
  d: "M5 21a2 2 0 0 1-2-2",
  key: "sbafld"
}], ["path", {
  d: "M9 3h1",
  key: "1yesri"
}], ["path", {
  d: "M9 21h1",
  key: "15o7lz"
}], ["path", {
  d: "M14 3h1",
  key: "1ec4yj"
}], ["path", {
  d: "M14 21h1",
  key: "v9vybs"
}], ["path", {
  d: "M3 9v1",
  key: "1r0deq"
}], ["path", {
  d: "M21 9v1",
  key: "mxsmne"
}], ["path", {
  d: "M3 14v1",
  key: "vnatye"
}], ["path", {
  d: "M21 14v1",
  key: "169vum"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NLe = $r("SquarePen", [["path", {
  d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
  key: "1m0v6g"
}], ["path", {
  d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
  key: "ohrbg2"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CNr = $r("SquareSplitHorizontal", [["path", {
  d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3",
  key: "lubmu8"
}], ["path", {
  d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3",
  key: "1ag34g"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "4",
  y2: "20",
  key: "1tx1rr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ENr = $r("SquareX", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  ry: "2",
  key: "1m3agn"
}], ["path", {
  d: "m15 9-6 6",
  key: "1uzhvr"
}], ["path", {
  d: "m9 9 6 6",
  key: "z0biqf"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf = $r("Square", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CP = $r("Star", [["path", {
  d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
  key: "r04s7s"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TNr = $r("SunMedium", [["circle", {
  cx: "12",
  cy: "12",
  r: "4",
  key: "4exip2"
}], ["path", {
  d: "M12 3v1",
  key: "1asbbs"
}], ["path", {
  d: "M12 20v1",
  key: "1wcdkc"
}], ["path", {
  d: "M3 12h1",
  key: "lp3yf2"
}], ["path", {
  d: "M20 12h1",
  key: "1vloll"
}], ["path", {
  d: "m18.364 5.636-.707.707",
  key: "1hakh0"
}], ["path", {
  d: "m6.343 17.657-.707.707",
  key: "18m9nf"
}], ["path", {
  d: "m5.636 5.636.707.707",
  key: "1xv1c5"
}], ["path", {
  d: "m17.657 17.657.707.707",
  key: "vl76zb"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AD = $r("Sun", [["circle", {
  cx: "12",
  cy: "12",
  r: "4",
  key: "4exip2"
}], ["path", {
  d: "M12 2v2",
  key: "tus03m"
}], ["path", {
  d: "M12 20v2",
  key: "1lh1kg"
}], ["path", {
  d: "m4.93 4.93 1.41 1.41",
  key: "149t6j"
}], ["path", {
  d: "m17.66 17.66 1.41 1.41",
  key: "ptbguv"
}], ["path", {
  d: "M2 12h2",
  key: "1t8f8n"
}], ["path", {
  d: "M20 12h2",
  key: "1q8mjw"
}], ["path", {
  d: "m6.34 17.66-1.41 1.41",
  key: "1m8zz5"
}], ["path", {
  d: "m19.07 4.93-1.41 1.41",
  key: "1shlcs"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jLe = $r("Table2", [["path", {
  d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  key: "gugj83"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hue = $r("Table", [["path", {
  d: "M12 3v18",
  key: "108xh3"
}], ["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}], ["path", {
  d: "M3 9h18",
  key: "1pudct"
}], ["path", {
  d: "M3 15h18",
  key: "5xshup"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MNr = $r("Tag", [["path", {
  d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
  key: "vktsd0"
}], ["circle", {
  cx: "7.5",
  cy: "7.5",
  r: ".5",
  fill: "currentColor",
  key: "kqv944"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _Et = $r("Target", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "6",
  key: "1vlfrh"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "2",
  key: "1c9p78"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pZ = $r("Terminal", [["polyline", {
  points: "4 17 10 11 4 5",
  key: "akl6gq"
}], ["line", {
  x1: "12",
  x2: "20",
  y1: "19",
  y2: "19",
  key: "q2wloq"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XE = $r("Text", [["path", {
  d: "M17 6.1H3",
  key: "wptmhv"
}], ["path", {
  d: "M21 12.1H3",
  key: "1j38uz"
}], ["path", {
  d: "M15.1 18H3",
  key: "1nb16a"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PNr = $r("Thermometer", [["path", {
  d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
  key: "17jzev"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cxe = $r("Timer", [["line", {
  x1: "10",
  x2: "14",
  y1: "2",
  y2: "2",
  key: "14vaq8"
}], ["line", {
  x1: "12",
  x2: "15",
  y1: "14",
  y2: "11",
  key: "17fdiu"
}], ["circle", {
  cx: "12",
  cy: "14",
  r: "8",
  key: "1e1u0o"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qo = $r("Trash2", [["path", {
  d: "M3 6h18",
  key: "d0wm0j"
}], ["path", {
  d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
  key: "4alrt4"
}], ["path", {
  d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
  key: "v07s0e"
}], ["line", {
  x1: "10",
  x2: "10",
  y1: "11",
  y2: "17",
  key: "1uufr5"
}], ["line", {
  x1: "14",
  x2: "14",
  y1: "11",
  y2: "17",
  key: "xtxkd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RNr = $r("TreePine", [["path", {
  d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
  key: "cpyugq"
}], ["path", {
  d: "M12 22v-3",
  key: "kmzjlo"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ETn = $r("TrendingDown", [["polyline", {
  points: "22 17 13.5 8.5 8.5 13.5 2 7",
  key: "1r2t7k"
}], ["polyline", {
  points: "16 17 22 17 22 11",
  key: "11uiuu"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TTn = $r("TrendingUp", [["polyline", {
  points: "22 7 13.5 15.5 8.5 10.5 2 17",
  key: "126l90"
}], ["polyline", {
  points: "16 7 22 7 22 13",
  key: "kwv8wd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eRe = $r("TriangleAlert", [["path", {
  d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
  key: "wmoenq"
}], ["path", {
  d: "M12 9v4",
  key: "juzpu7"
}], ["path", {
  d: "M12 17h.01",
  key: "p32p05"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _U = $r("Type", [["polyline", {
  points: "4 7 4 4 20 4 20 7",
  key: "1nosan"
}], ["line", {
  x1: "9",
  x2: "15",
  y1: "20",
  y2: "20",
  key: "swin9y"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "4",
  y2: "20",
  key: "1tx1rr"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d_ = $r("Undo2", [["path", {
  d: "M9 14 4 9l5-5",
  key: "102s5s"
}], ["path", {
  d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
  key: "f3b9sd"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NNr = $r("Ungroup", [["rect", {
  width: "8",
  height: "6",
  x: "5",
  y: "4",
  rx: "1",
  key: "nzclkv"
}], ["rect", {
  width: "8",
  height: "6",
  x: "11",
  y: "14",
  rx: "1",
  key: "4tytwb"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jNr = $r("Unlink2", [["path", {
  d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2",
  key: "1re2ne"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ml = $r("Upload", [["path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
  key: "ih7n3h"
}], ["polyline", {
  points: "17 8 12 3 7 8",
  key: "t8dd8p"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "3",
  y2: "15",
  key: "widbto"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _Wt = $r("UserRoundPlus", [["path", {
  d: "M2 21a8 8 0 0 1 13.292-6",
  key: "bjp14o"
}], ["circle", {
  cx: "10",
  cy: "8",
  r: "5",
  key: "o932ke"
}], ["path", {
  d: "M19 16v6",
  key: "tddt3s"
}], ["path", {
  d: "M22 19h-6",
  key: "vcuq98"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kU = $r("UserRound", [["circle", {
  cx: "12",
  cy: "8",
  r: "5",
  key: "1hypcn"
}], ["path", {
  d: "M20 21a8 8 0 0 0-16 0",
  key: "rfgkzh"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jY = $r("User", [["path", {
  d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
  key: "975kel"
}], ["circle", {
  cx: "12",
  cy: "7",
  r: "4",
  key: "17ys0d"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bmt = $r("Users", [["path", {
  d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
  key: "1yyitq"
}], ["circle", {
  cx: "9",
  cy: "7",
  r: "4",
  key: "nufk8"
}], ["path", {
  d: "M22 21v-2a4 4 0 0 0-3-3.87",
  key: "kshegd"
}], ["path", {
  d: "M16 3.13a4 4 0 0 1 0 7.75",
  key: "1da9ce"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo = $r("Video", [["path", {
  d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
  key: "ftymec"
}], ["rect", {
  x: "2",
  y: "6",
  width: "14",
  height: "12",
  rx: "2",
  key: "158x01"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B5 = $r("Volume2", [["path", {
  d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
  key: "uqj9uw"
}], ["path", {
  d: "M16 9a5 5 0 0 1 0 6",
  key: "1q6k2b"
}], ["path", {
  d: "M19.364 18.364a9 9 0 0 0 0-12.728",
  key: "ijwkga"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DY = $r("VolumeX", [["path", {
  d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
  key: "uqj9uw"
}], ["line", {
  x1: "22",
  x2: "16",
  y1: "9",
  y2: "15",
  key: "1ewh16"
}], ["line", {
  x1: "16",
  x2: "22",
  y1: "9",
  y2: "15",
  key: "5ykzw1"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DNr = $r("Wallet", [["path", {
  d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
  key: "18etb6"
}], ["path", {
  d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
  key: "xoc0q4"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EP = $r("WandSparkles", [["path", {
  d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
  key: "ul74o6"
}], ["path", {
  d: "m14 7 3 3",
  key: "1r5n42"
}], ["path", {
  d: "M5 6v4",
  key: "ilb8ba"
}], ["path", {
  d: "M19 14v4",
  key: "blhpug"
}], ["path", {
  d: "M10 2v2",
  key: "7u0qdc"
}], ["path", {
  d: "M7 8H3",
  key: "zfb6yr"
}], ["path", {
  d: "M21 16h-4",
  key: "1cnmox"
}], ["path", {
  d: "M11 3H9",
  key: "1obp7u"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LNr = $r("Waves", [["path", {
  d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  key: "knzxuh"
}], ["path", {
  d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  key: "2jd2cc"
}], ["path", {
  d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  key: "rd2r6e"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mZ = $r("Workflow", [["rect", {
  width: "8",
  height: "8",
  x: "3",
  y: "3",
  rx: "2",
  key: "by2w9f"
}], ["path", {
  d: "M7 11v4a2 2 0 0 0 2 2h4",
  key: "xkn7yn"
}], ["rect", {
  width: "8",
  height: "8",
  x: "13",
  y: "13",
  rx: "2",
  key: "1cgmvn"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ONr = $r("WrapText", [["line", {
  x1: "3",
  x2: "21",
  y1: "6",
  y2: "6",
  key: "4m8b97"
}], ["path", {
  d: "M3 12h15a3 3 0 1 1 0 6h-4",
  key: "1cl7v7"
}], ["polyline", {
  points: "16 16 14 18 16 20",
  key: "1jznyi"
}], ["line", {
  x1: "3",
  x2: "10",
  y1: "18",
  y2: "18",
  key: "1h33wv"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MTn = $r("Wrench", [["path", {
  d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  key: "cbrjhi"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Na = $r("X", [["path", {
  d: "M18 6 6 18",
  key: "1bl5f8"
}], ["path", {
  d: "m6 6 12 12",
  key: "d8bk6v"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fZ = $r("Zap", [["path", {
  d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
  key: "1xq2db"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z$ = $r("ZoomIn", [["circle", {
  cx: "11",
  cy: "11",
  r: "8",
  key: "4ej97u"
}], ["line", {
  x1: "21",
  x2: "16.65",
  y1: "21",
  y2: "16.65",
  key: "13gj7c"
}], ["line", {
  x1: "11",
  x2: "11",
  y1: "8",
  y2: "14",
  key: "1vmskp"
}], ["line", {
  x1: "8",
  x2: "14",
  y1: "11",
  y2: "11",
  key: "durymu"
}]]);

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wue = $r("ZoomOut", [["circle", {
    cx: "11",
    cy: "11",
    r: "8",
    key: "4ej97u"
  }], ["line", {
    x1: "21",
    x2: "16.65",
    y1: "21",
    y2: "16.65",
    key: "13gj7c"
  }], ["line", {
    x1: "8",
    x2: "14",
    y1: "11",
    y2: "11",
    key: "durymu"
  }]]),
  BNr = `FINAL、释然、小红薯-Finacg、ouroboros（闭关中 不聊天状态）、小红薯-东方先生、小红书-机头哥、陆炜枫、小红书-师帆、S、羽子、
小红书-六月、Zadie、F、TnT、风吹麦浪、Let eat go、空空、阿普、阿普、Ou、绝世枪王、HHL、WTT、登峰、布拉德·阿洋、米斯特里、
两水一程、小红书-尼康、小红书-啧啧、得鹿映画AIGC实验室_承制解说漫剧、麦爸不慌张、无尽、小红薯-AiMoCat、淼、Lzs、b站-Forever、
Houttuyniaaa、GanYuhao_、弓长先生、鲸落、坤、柯盛、Hero Call、梦、谢嘿嘿只想睡、阿Z、Jerry.Jin、Winlend、大白、章鱼哥、A Z E、
陈导、米糕米糕、白松、Ashn、O.、释然、Mr.Speechless、红黄蓝灰、奥.尼古拉斯.敏、Mask、小吴、Mike、阿Z、王彬、里、文、半夜偷偷去厕所调戏绝美蠕动小奶蛆
Tao、（坞）、T.DogLau、😊😊😊、司徒颂然～～、σ咤克丶斯೭ԅ、T.DogLau、李楠、芝士松鼠、木白、howie.serious、明媚可见、追光者、
阿腩、小熊硬糖、努力向上、銅雀與竹、草莓苏打、精灵要奋斗、群_、Tobiggie、Zadie、b站阿呆、万年の吊车尾、A.L.尐玲寶、Shall、Cc.、
。、大地红、b站🕸、无咎、强者复制人、花火一遍过、Epiphany、AIBOX-木星、汪汪碎冰冰、巴黎雪、维钧·清川、指北呀、567、元、安逸、
、谢国健、藤原海、ggfour、雷雨、博、MDZHANG 张荣幸、路军、柏溪有南桥、Epiphany、阿嚷、恶龙逗勇者、逸峰、Villa、Edwing(不是单身汪)
、Suan、聖の倉葉、妳很迷人微笑、魔鬼精肉人、橘子倾橙、煜、Jason、苏打鱼、Hypoxia、'-、我不看月亮、绍兴龙太子、周南如唔、双枪小笼包、
泽云星耀、小松、Pino_O、Quin奎因、Jackie.chen、风有约、马郅斐、小熊硬糖、五德、赵幸、王栋、康超、侯淳元、土豆片、Yuan影子、
Desinger、暮尘殇、石佛小栗旬、KEV🌌、罗飞、维也纳的夏天、野肆、沐阳、行道丶、有点奇怪的、J.jin.、赵健康要健康、Chris Wang、
Junlian、橘子°🍊、爱发电用户_5477f、miuma、Lu、爱发电用户_0c707、爱发电用户_23564、爱发电用户_ecff4、爱发电用户_8b741、爱发电用户_2c73c
、爱发电用户_0e9e7、小吴?、爱发电用户_3d6ba、爱发电用户_h5MW、蔡炎煌、爱发电用户_69f16、爱发电用户_5cd26、爱发电用户_8hC4
、爱发电用户_67e96、爱发电用户_15672、水、虾滑、糯糯、十一、爱发电用户_f6eae、爱发电用户_2345f、爱发电用户_3f43e、爱发电用户_51db1
爱发电用户_3ca99、爱发电用户_c0a8b、爱发电用户_YAJs、爱发电用户_82e74、爱发电用户_83b8e、爱发电用户_007f9、爱发电用户_d2f50
爱发电用户_25d37、爱发电用户_d1fc5、爱发电用户_f70e3、爱发电用户_6f6c6、爱发电用户_3b8af、wang、爱发电用户_d5bab、爱发电用户_bef16、
爱发电用户_a923e、爱发电用户_ptcD、骑着自行车去冒险、爱发电用户_16a1b、爱发电用户_5286d、无念、ivan、降温已三尺、longbow1998
爱发电用户_39ff7、爱发电用户_d25a9、爱发电用户_0d6f1、asdfghjkl、爱发电用户_f6355、爱发电用户_4eb2d、爱发电用户_e867a、张雷
、爱发电用户_cf425、爱发电用户_7a272、爱发电用户_77915、爱发电用户_MYFX、爱发电用户_369db、爱发电用户_2c694、爱发电用户_1fa16
、爱发电用户_63bea、郑不知道取啥、tobiggie、爱发电用户_syAt、爱发电用户_Qa9y、爱发电用户_fdf12、爱发电用户_75a6d、爱发电用户_3603e
爱发电用户_20281、美丽猪猪侠、爱发电用户_fbd4b、小木、爱发电用户_77a03、爱发电用户_SvcY、谷、爱发电用户_5571c、爱发电用户_dc177
、一金、爱发电用户_9af01、爱发电用户_3DKy、老徐、幕僚长、.、小谢呀、爱发电用户_8ba4b、绝世枪王、爱发电用户_da677、Karry爱发电用户_043cd
、爱发电用户_d5e54、爱发电用户_5t3j、律道、爱发电用户_745ee、爱发电用户_139b7、爱发电用户_50acd、啊哈哈qweqweq、爱发电用户_57663
、爱发电用户_qPtV、kk、Huskimo、愤怒的鸵鸟、爱发电用户_C6rb、爱发电用户_MNWY、爱发电用户_2dae1、爱发电用户_ac2e4、爱发电用户_Ch9J
、爱发电用户_44245、爱发电用户_44b15、爱发电用户_ed4e2、爱发电用户_1e5ab、会飞了、爱发电用户_5114a、爱发电用户_f9H5、Am Ralph
ggfour、爱发电用户_2e5a6、?猫眼超、爱发电用户_1fdf8、爱发电用户_8eee2、芩青
`;

function FNr(e) {
  const t = new Set(),
    n = [],
    r = e.split(/[,，、\r\n]+/);
  for (const a of r) {
    const i = a.trim().replace(/^[,，、\s]+|[,，、\s]+$/g, "");
    i && (t.has(i) || (t.add(i), n.push(i)));
  }
  return n;
}

const zNr = FNr(BNr);

function PTn(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) t = Math.imul(31, t) + e.charCodeAt(n) | 0;
  return Math.abs(t);
}

const kWt = ["big-ears", "croodles", "dylan", "fun-emoji", "micah"];

function AWt(e) {
  const t = kWt[PTn(e) % kWt.length],
    n = encodeURIComponent(e.slice(0, 80));
  return `https://api.dicebear.com/9.x/${t}/svg?seed=${n}`;
}

const SWt = ["🐱", "🐶", "🐰", "🦊", "🐻", "🐼", "🐨", "🦁", "🐯", "🐷", "🐹", "🐸", "🦦", "🐾", "🦋"];

function IWt(e) {
  return SWt[PTn(e) % SWt.length];
}

const C_ = {
    bgGradient: "linear-gradient(110deg, #FDE2E4 0%, #f5e6ff 45%, #E2E2FB 100%)",
    title: "#D63384",
    subtitleSoft: "rgba(214, 51, 132, 0.82)",
    cardBg: "#ffffff",
    cardBorder: "rgba(233, 30, 99, 0.12)",
    headerTint: "rgba(253, 226, 236, 0.65)",
    rowBorder: "#e9ecef",
    footerGray: "#6c757d",
    globeGrad: "linear-gradient(145deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%)",
    fullscreenBg: "radial-gradient(circle at 50% 38%, rgba(253,226,228,0.95) 0%, rgba(226,226,251,0.92) 45%, #FDE2E4 100%)"
  },
  CWt = [{
    name: "派",
    description: "对于画板创建、标记模式提供了源代码支持"
  }, {
    name: "梦梦",
    description: "对于文字编辑功能提供了源代码支持"
  }, {
    name: "海盐幻想视觉",
    description: "对于剧本拆分json 单帧续写分镜提升了源代码支持"
  }, {
    name: "菜兜兜",
    description: "对于改图工具提供了源代码支持"
  }];

function UNr(e) {
  const t = [...e];
  for (let n = t.length - 1; n > 0; n--) {
    const r = Math.floor(Math.random() * (n + 1));
    [t[n], t[r]] = [t[r], t[n]];
  }
  return t;
}

const $Nr = ({
    open: e,
    onClose: t
  }) => {
    on();
    const n = g.useMemo(() => {
        if (!e) return [];
        const u = CWt.map(f => f.name),
          h = new Set(u),
          m = UNr(zNr).filter(f => !h.has(f));
        return [...u, ...m];
      }, [e]),
      [r, a] = g.useState(null),
      [i, o] = g.useState({});
    g.useEffect(() => {
      e || (a(null), o({}));
    }, [e]);
    const s = g.useCallback(u => {
      u.key === "Escape" && (r ? a(null) : t());
    }, [r, t]);
    if (g.useEffect(() => {
      if (e) return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
    }, [e, s]), !e) return null;
    const l = c.jsxs("div", {
        className: "fixed inset-0 z-[20050] flex items-center justify-center p-4 sm:p-6",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "sponsor-modal-title",
        children: [c.jsx("button", {
          type: "button",
          className: "absolute inset-0 cursor-default border-0",
          style: {
            background: C_.bgGradient
          },
          onClick: t,
          "aria-label": x("关闭")
        }), c.jsx("div", {
          className: "pointer-events-none absolute inset-0 overflow-hidden",
          "aria-hidden": !0,
          children: [{
            ch: "🐾",
            left: 8,
            top: 18,
            rot: -12
          }, {
            ch: "✨",
            left: 6,
            top: 55,
            rot: 8
          }, {
            ch: "🐾",
            left: 88,
            top: 22,
            rot: 15
          }, {
            ch: "✨",
            left: 92,
            top: 48,
            rot: -8
          }, {
            ch: "⭐",
            left: 14,
            top: 72,
            rot: 0
          }, {
            ch: "🐾",
            left: 80,
            top: 70,
            rot: -18
          }].map((u, h) => c.jsx("span", {
            className: "absolute text-2xl opacity-[0.38] animate-breathe",
            style: {
              left: `${u.left}%`,
              top: `${u.top}%`,
              transform: `rotate(${u.rot}deg)`,
              animationDelay: `${h * .35}s`,
              filter: u.ch === "🐾" ? "sepia(0.35) saturate(2) hue-rotate(-15deg)" : void 0
            },
            children: u.ch
          }, h))
        }), c.jsxs("div", {
          className: "relative z-10 flex max-h-[min(86vh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border shadow-2xl",
          style: {
            background: C_.cardBg,
            borderColor: C_.cardBorder,
            boxShadow: "0 25px 50px -12px rgba(214, 51, 132, 0.18), 0 0 0 1px rgba(255,255,255,0.8) inset"
          },
          onClick: u => u.stopPropagation(),
          children: [c.jsxs("div", {
            className: "flex shrink-0 items-start justify-between gap-3 border-b px-5 py-4",
            style: {
              borderColor: C_.rowBorder,
              background: C_.headerTint
            },
            children: [c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("div", {
                className: "sponsor-globe-wrap flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg",
                style: {
                  background: C_.globeGrad
                },
                children: c.jsx(i9, {
                  className: "h-7 w-7 text-white drop-shadow-md",
                  strokeWidth: 1.75
                })
              }), c.jsxs("div", {
                children: [c.jsx("h2", {
                  id: "sponsor-modal-title",
                  className: "text-lg font-bold tracking-tight",
                  style: {
                    color: C_.title
                  },
                  children: x("地球上的感谢信号")
                }), c.jsx("p", {
                  className: "mt-0.5 text-xs",
                  style: {
                    color: C_.subtitleSoft
                  },
                  children: x("每一位支持者都像一颗小卫星 🛰️")
                })]
              })]
            }), c.jsx("button", {
              type: "button",
              onClick: t,
              className: "rounded-xl p-2 text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-800",
              title: x("关闭"),
              children: c.jsx(Na, {
                size: 22
              })
            })]
          }), c.jsx("div", {
            className: "rh-scroll-minimal min-h-0 flex-1 overflow-y-auto px-4 py-4",
            style: {
              maxHeight: "min(62vh, 640px)"
            },
            children: c.jsx("ul", {
              className: "flex flex-col gap-2.5",
              children: n.map(u => {
                const h = i[u],
                  p = AWt(u),
                  m = CWt.find(y => y.name === u),
                  f = !!m;
                return c.jsx("li", {
                  children: c.jsxs("button", {
                    type: "button",
                    onClick: () => a(u),
                    className: `group flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left shadow-sm transition-all hover:shadow-md ${f ? "border-pink-300/40 bg-[rgba(253,226,236,0.45)]" : "border-zinc-200/90 bg-white"}`,
                    children: [c.jsx("div", {
                      className: "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl text-2xl shadow-inner",
                      style: {
                        background: f ? "rgba(253, 226, 236, 0.65)" : "rgba(253, 226, 236, 0.45)"
                      },
                      children: h ? c.jsx("span", {
                        className: "select-none",
                        children: IWt(u)
                      }) : c.jsx("img", {
                        src: p,
                        alt: "",
                        className: "h-full w-full object-cover",
                        loading: "eager",
                        decoding: "async",
                        referrerPolicy: "no-referrer",
                        onError: () => o(y => ({
                          ...y,
                          [u]: !0
                        }))
                      })
                    }), c.jsxs("div", {
                      className: "min-w-0 flex-1",
                      children: [c.jsxs("div", {
                        className: "truncate text-sm font-medium text-zinc-900",
                        children: ["@", u]
                      }), f && m && c.jsx("div", {
                        className: "mt-0.5 text-xs text-zinc-600",
                        children: x(m.description)
                      })]
                    }), c.jsx("span", {
                      className: "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100",
                      style: {
                        background: "rgba(214, 51, 132, 0.12)",
                        color: C_.title
                      },
                      children: x("全屏 ✦")
                    })]
                  })
                }, u);
              })
            })
          }), c.jsxs("div", {
            className: "shrink-0 border-t px-4 py-3 text-center text-[11px]",
            style: {
              borderColor: C_.rowBorder,
              color: C_.footerGray
            },
            children: [x("共 "), n.length, x(" 位支持者 · 头像由 DiceBear（big-ears / croodles 等）")]
          })]
        })]
      }),
      d = r && e ? c.jsxs("div", {
        className: "fixed inset-0 z-[20060] flex flex-col items-center justify-center p-6",
        role: "presentation",
        onClick: () => a(null),
        children: [c.jsx("div", {
          className: "absolute inset-0",
          style: {
            background: C_.fullscreenBg
          }
        }), c.jsxs("div", {
          className: "relative z-10 flex max-w-lg flex-col items-center text-center",
          onClick: u => u.stopPropagation(),
          children: [c.jsx("div", {
            className: "mb-6 flex h-[min(52vw,360px)] w-[min(52vw,360px)] items-center justify-center overflow-hidden rounded-[2rem] border-4 shadow-2xl",
            style: {
              borderColor: "rgba(236, 72, 153, 0.45)",
              background: "#fff5f8"
            },
            children: i[r] ? c.jsx("span", {
              className: "text-[min(28vw,180px)] leading-none",
              children: IWt(r)
            }) : c.jsx("img", {
              src: AWt(r),
              alt: "",
              className: "h-full w-full object-cover",
              referrerPolicy: "no-referrer",
              onError: () => o(u => ({
                ...u,
                [r]: !0
              }))
            })
          }), c.jsxs("h3", {
            className: "mt-2 text-2xl font-bold",
            style: {
              color: C_.title
            },
            children: [x("谢谢你，"), r]
          }), c.jsx("p", {
            className: "mt-2 text-sm",
            style: {
              color: C_.subtitleSoft
            },
            children: x("AIYOUPLUS画布因你而更温暖 💖")
          }), c.jsx("div", {
            className: "mt-6 flex flex-wrap items-center justify-center gap-3",
            children: c.jsx("button", {
              type: "button",
              onClick: () => a(null),
              className: "rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50",
              children: x("返回列表")
            })
          })]
        })]
      }) : null;
    return c.jsxs(c.Fragment, {
      children: [Da.createPortal(l, document.body), d ? Da.createPortal(d, document.body) : null]
    });
  },
  GNr = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3e小红书%3c/title%3e%3cpath%20fill='%23FF2442'%20d='M22.405%209.879c.002.016.01.02.07.019h.725a.797.797%200%200%200%20.78-.972.794.794%200%200%200-.884-.618.795.795%200%200%200-.692.794c0%20.101-.002.666.001.777zm-11.509%204.808c-.203.001-1.353.004-1.685.003a2.528%202.528%200%200%201-.766-.126.025.025%200%200%200-.03.014L7.7%2016.127a.025.025%200%200%200%20.01.032c.111.06.336.124.495.124.66.01%201.32.002%201.981%200%20.01%200%20.02-.006.023-.015l.712-1.545a.025.025%200%200%200-.024-.036zM.477%209.91c-.071%200-.076.002-.076.01a.834.834%200%200%200-.01.08c-.027.397-.038.495-.234%203.06-.012.24-.034.389-.135.607-.026.057-.033.042.003.112.046.092.681%201.523.787%201.74.008.015.011.02.017.02.008%200%20.033-.026.047-.044.147-.187.268-.391.371-.606.306-.635.44-1.325.486-1.706.014-.11.021-.22.03-.33l.204-2.616.022-.293c.003-.029%200-.033-.03-.034zm7.203%203.757a1.427%201.427%200%200%201-.135-.607c-.004-.084-.031-.39-.235-3.06a.443.443%200%200%200-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293c.076.982.153%201.964.233%202.946.05.4.186%201.085.487%201.706.103.215.223.419.37.606.015.018.037.051.048.049.02-.003.742-1.642.804-1.765.036-.07.03-.055.003-.112zm3.861-.913h-.872a.126.126%200%200%201-.116-.178l1.178-2.625a.025.025%200%200%200-.023-.035l-1.318-.003a.148.148%200%200%201-.135-.21l.876-1.954a.025.025%200%200%200-.023-.035h-1.56c-.01%200-.02.006-.024.015l-.926%202.068c-.085.169-.314.634-.399.938a.534.534%200%200%200-.02.191.46.46%200%200%200%20.23.378.981.981%200%200%200%20.46.119h.59c.041%200-.688%201.482-.834%201.972a.53.53%200%200%200-.023.172.465.465%200%200%200%20.23.398c.15.092.342.12.475.12l1.66-.001c.01%200%20.02-.006.023-.015l.575-1.28a.025.025%200%200%200-.024-.035zm-6.93-4.937H3.1a.032.032%200%200%200-.034.033c0%201.048-.01%202.795-.01%206.829%200%20.288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047.001.037.465%201.064.555%201.263.01.02.03.033.051.033.157.003.767.009.938-.014.153-.02.3-.06.438-.132.3-.156.49-.419.595-.765.052-.172.075-.353.075-.533.002-2.33%200-4.66-.007-6.991a.032.032%200%200%200-.032-.032zm11.784%206.896c0-.014-.01-.021-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08%200%20.075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064%200-.075-.006-.075.073v1.445c0%20.083-.006.077.08.077h.854c.075%200%20.07-.004.07.07v4.624c0%20.095.008.084-.085.084-.37%200-1.11-.002-1.304%200-.048.001-.06.03-.06.03l-.697%201.519s-.014.025-.008.036c.006.01.013.008.058.008%201.748.003%203.495.002%205.243.002.03-.001.034-.006.035-.033v-1.539zm4.177-3.43c0%20.013-.007.023-.02.024-.346.006-.692.004-1.037.004-.014-.002-.022-.01-.022-.024-.005-.434-.007-.869-.01-1.303%200-.072-.006-.071.07-.07l.733-.003c.041%200%20.081.002.12.015.093.025.16.107.165.204.006.431.002%201.153.001%201.153zm2.67.244a1.953%201.953%200%200%200-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21c0-.132-.007-.263-.025-.394a1.823%201.823%200%200%200-.153-.53%201.533%201.533%200%200%200-.677-.71%202.167%202.167%200%200%200-1-.258c-.153-.003-.567%200-.72%200-.07%200-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016%200-.023.007c-.006.006-.008.012-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0%20.09-.004.082.082.082h.913c.082%200%20.072.128.072.128V11.19s.003.117-.06.117h-1.482c-.068%200-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082%200%20.076-.006.076.079v3.225c0%20.088-.007.081.082.081h1.43c.09%200%20.082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003c.098%200%20.191.02.28.061a.46.46%200%200%201%20.274.407c.008.395.003.79.003%201.185%200%20.259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033.184.437.374.871.57%201.303a.045.045%200%200%200%20.04.026c.17.005.34.002.51.003.15-.002.517.004.666-.01a2.03%202.03%200%200%200%20.408-.075c.59-.18.975-.698.976-1.313v-1.981c0-.128-.01-.254-.034-.38%200%20.078-.029-.641-.724-.998z'/%3e%3c/svg%3e",
  VNr = "data:image/svg+xml,%3csvg%20viewBox='0%200%2030%2034'%20xmlns='http://www.w3.org/2000/svg'%20role='img'%20overflow='hidden'%3e%3ctitle%3e抖音%3c/title%3e%3cpath%20d='M11.6394%2013.4341V12.1233C11.184%2012.0686%2010.7286%2012.0322%2010.255%2012.0322C4.60798%2012.0322%20-0.000732422%2016.6203%20-0.000732422%2022.2825C-0.000732422%2025.7417%201.72981%2028.8186%204.37116%2030.6756C2.65884%2028.8368%201.62052%2026.3971%201.62052%2023.7026C1.63873%2018.1132%206.10171%2013.5616%2011.6394%2013.4341Z'%20fill='%2300FAF0'/%3e%3cpath%20d='M11.8766%2028.345C14.3905%2028.345%2016.4489%2026.3423%2016.54%2023.848V1.5451H20.6205C20.5294%201.08994%2020.4929%200.616574%2020.4929%200.125H14.9188V22.4279C14.8277%2024.9222%2012.7692%2026.9249%2010.2554%2026.9249C9.47209%2026.9249%208.72522%2026.7246%208.08765%2026.3787C8.94381%2027.5803%2010.3282%2028.345%2011.8766%2028.345Z'%20fill='%2300FAF0'/%3e%3cpath%20d='M28.2514%209.11927V7.88124C26.7031%207.88124%2025.2458%207.42608%2024.0253%206.625C25.1182%207.86304%2026.5938%208.75514%2028.2514%209.11927Z'%20fill='%2300FAF0'/%3e%3cpath%20d='M24.0449%206.6255C22.8609%205.26002%2022.1323%203.49399%2022.1323%201.5459H20.6385C21.0393%203.65785%2022.2962%205.4785%2024.0449%206.6255Z'%20fill='%23FF0050'/%3e%3cpath%20d='M10.2551%2017.5847C7.66836%2017.5847%205.57349%2019.6784%205.57349%2022.2637C5.57349%2024.0662%206.5936%2025.6137%208.08733%2026.3966C7.54084%2025.6319%207.19473%2024.6852%207.19473%2023.6656C7.19473%2021.0803%209.28961%2018.9866%2011.8763%2018.9866C12.3499%2018.9866%2012.8236%2019.0594%2013.2608%2019.205V13.5246C12.8054%2013.47%2012.3499%2013.4336%2011.8763%2013.4336C11.8035%2013.4336%2011.7124%2013.4336%2011.6395%2013.4336V17.8031C11.2023%2017.6575%2010.7469%2017.5847%2010.2551%2017.5847Z'%20fill='%23FF0050'/%3e%3cpath%20d='M28.2523%209.11914V13.4523C25.356%2013.4523%2022.6964%2012.5238%2020.5104%2010.958V22.2642C20.5104%2027.9082%2015.9199%2032.5144%2010.2547%2032.5144C8.06873%2032.5144%206.04672%2031.8226%204.38904%2030.6574C6.26531%2032.6601%208.92489%2033.9345%2011.8941%2033.9345C17.5412%2033.9345%2022.1499%2029.3465%2022.1499%2023.6843V12.3781C24.3358%2013.9439%2027.0136%2014.8724%2029.8918%2014.8724V9.30121C29.3271%209.283%2028.7806%209.22838%2028.2523%209.11914Z'%20fill='%23FF0050'/%3e%3cpath%20d='M20.5094%2022.2648V10.9586C22.6953%2012.5244%2025.3731%2013.4529%2028.2513%2013.4529V9.11977C26.5754%208.75565%2025.1181%207.86354%2024.0251%206.6255C22.2763%205.4967%2021.0194%203.67605%2020.6369%201.5459H16.5564V23.8488C16.4653%2026.3431%2014.4069%2028.3458%2011.8931%2028.3458C10.3265%2028.3458%208.94202%2027.5811%208.10407%2026.3977C6.61034%2025.6148%205.59023%2024.0491%205.59023%2022.2648C5.59023%2019.6795%207.6851%2017.5858%2010.2718%2017.5858C10.7454%2017.5858%2011.2191%2017.6586%2011.6562%2017.8042V13.4347C6.1185%2013.5621%201.65552%2018.1138%201.65552%2023.6667C1.65552%2026.3613%202.69384%2028.8191%204.40617%2030.6398C6.06385%2031.805%208.10408%2032.4969%2010.2718%2032.4969C15.9006%2032.5151%2020.5094%2027.9088%2020.5094%2022.2648Z'%20fill='%23111111'/%3e%3c/svg%3e",
  HNr = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3e哔哩哔哩%3c/title%3e%3cpath%20fill='%2300A1D6'%20d='M17.813%204.653h.854c1.51.054%202.769.578%203.773%201.574%201.004.995%201.524%202.249%201.56%203.76v7.36c-.036%201.51-.556%202.769-1.56%203.773s-2.262%201.524-3.773%201.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036%2018.858%200%2017.347v-7.36c.036-1.511.556-2.765%201.56-3.76%201.004-.996%202.262-1.52%203.773-1.574h.774l-1.174-1.12a1.234%201.234%200%200%201-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347%200%20.653.124.92.373L9.653%204.44c.071.071.134.142.187.213h4.267a.836.836%200%200%201%20.16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347%200%20.662.151.929.4.267.249.391.551.391.907%200%20.355-.124.657-.373.906zM5.333%207.24c-.746.018-1.373.276-1.88.773-.506.498-.769%201.13-.786%201.894v7.52c.017.764.28%201.395.786%201.893.507.498%201.134.756%201.88.773h13.334c.746-.017%201.373-.275%201.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8%2011.107c.373%200%20.684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8%200c.373%200%20.684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z'/%3e%3c/svg%3e",
  WNr = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3e爱发电%3c/title%3e%3cpath%20fill='%23946CE6'%20d='M9%2014.234a.567.567%200%201%200%200%201.134.567.567%200%200%200%200-1.134m5.351%201.705a.567.567%200%201%200%200%201.135.567.567%200%200%200%200-1.135m8.401%201.436c-.189.095-.461.1-.713.013-.169-.06-.352-.116-.534-.172-.339-.104-.904-.276-1.011-.407a.533.533%200%201%200-.853.643c.059.08.139.146.22.209-.816%201.131-4.398%203.382-9.464%202.273-2.283-.5-3.819-1.413-4.444-2.639-.451-.885-.348-1.797-.133-2.293.62-1.29%205.097-4.261%207.955-5.943a.537.537%200%200%200%20.188-.733c-.149-.254-.49-.356-.73-.189-.231.135-1.015.601-2.015%201.236-.338-.227-.923-.508-1.86-.6-1.486-.148-4.92-.805-6.029-1.275C2.535%207.162.731%206.27%201.131%205.267c.092-.234.527-.613%201.47-.974a8.5%208.5%200%200%201%201.995-.492l-.212.103c-.642.312-1.343.662-1.813%201.075-.034-.022-.07-.044-.094-.069a.527.527%200%200%200-.754-.017.533.533%200%200%200-.017.756c.19.2.471.35.829.465l.039.014c1.245.383%203.458.336%206.578.211%201.345-.052%202.615-.102%203.674-.082%203.512.07%206.152%201.469%208.07%204.279%201.178%201.725.753%203.426.079%204.903a1.4%201.4%200%200%201-.231-.222.54.54%200%200%200-.75-.085.535.535%200%200%200-.086.751c.109.137.665.778%201.355.724l.037-.002c.021-.003.042.001.064-.003.472-.086.768-.063%201.045.111.367.232.547.37.511.485-.021.073-.076.125-.168.177M8.19%2011.418l-.315.231a1.6%201.6%200%200%201-.243-.32c.123-.038.33.007.558.089m14.733%204.356a1.9%201.9%200%200%200-.81-.27c.632-1.544%201.034-3.565-.336-5.572-2.096-3.072-5.101-4.668-8.93-4.744-1.091-.022-2.377.029-3.737.083-1.58.063-3.683.145-5.112.027.285-.155.588-.304.851-.431%201.006-.49%201.797-.872%201.535-1.548-.137-.396-.547-.603-1.219-.618C3.748%202.669.688%203.489.138%204.872c-.31.779-.361%202.282%202.775%203.61%201.29.548%204.934%201.216%206.341%201.355.397.039.701.119.931.205a75%2075%200%200%200-.986.664c-.577-.329-1.521-.718-2.226-.237a.94.94%200%200%200-.435.768c-.01.385.224.763.486%201.066-1.038.83-1.877%201.634-2.175%202.253-.332.762-.467%202.008.153%203.224.786%201.544%202.524%202.62%205.166%203.199%203.454.755%206.437.075%208.411-.966%201.099-.579%201.878-1.27%202.257-1.887l.356.113c.169.051.338.103.496.159.522.181%201.1.157%201.545-.068l.025-.013c.336-.177.577-.46.683-.803.285-.922-.528-1.432-1.018-1.74'/%3e%3c/svg%3e",
  qNr = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eX%3c/title%3e%3cpath%20fill='%23ffffff'%20d='M18.901%201.153h3.68l-8.04%209.19L24%2022.846h-7.406l-5.8-7.584-6.638%207.584H.474l8.6-9.83L0%201.154h7.594l5.243%206.932ZM17.61%2020.644h2.039L6.486%203.24H4.298Z'/%3e%3c/svg%3e",
  KNr = [{
    label: "小红书",
    href: "https://xhslink.com/m/e0jgZ9LypR",
    logo: GNr
  }, {
    label: "抖音",
    href: "https://v.douyin.com/x5s8oIPVBk4",
    logo: VNr
  }, {
    label: "B站",
    href: "https://space.bilibili.com/28347006?spm_id_from=333.1007.0.0",
    logo: HNr
  }, {
    label: "X",
    href: "https://x.com/XinLanZhen5591",
    logo: qNr,
    invertOnLight: !0
  }, {
    label: "爱发电",
    href: "https://afdian.com/a/ZhengXinLan",
    logo: WNr
  }],
  QNr = [{
    id: "global",
    label: "全局"
  }, {
    id: "canvas",
    label: "画布"
  }, {
    id: "file",
    label: "文件"
  }, {
    id: "tools",
    label: "工具"
  }],
  kEt = typeof navigator < "u" && (navigator.platform.toLowerCase().includes("mac") || navigator.userAgent.toLowerCase().includes("mac")),
  BA = kEt ? "⌘" : "Ctrl",
  tRe = kEt ? "⇧" : "Shift";

function YNr(e, t) {
  const n = Math.ceil(e.length / t);
  return Array.from({
    length: t
  }, (r, a) => e.slice(a * n, (a + 1) * n));
}

const RTn = [{
    label: "拖动画布",
    keys: "左键空白 / 中键"
  }, {
    label: "缩放",
    keys: "滚轮 / 双指捏合"
  }, {
    label: "创建节点",
    keys: "双击画布"
  }, {
    label: "拖动节点",
    keys: "左键按住"
  }, {
    label: "取消选中",
    keys: "点击空白"
  }, {
    label: "框选",
    keys: `${BA}+拖动`
  }, {
    label: "多选",
    keys: `${BA}+点击`
  }, {
    label: "框选到对话",
    keys: `${BA}+框选`
  }, {
    label: "连接",
    keys: "从「+」拖出"
  }, {
    label: "批量连接",
    keys: `${tRe}+多选 / 框选后「+」`
  }, {
    label: "打组",
    keys: "框选后点打组"
  }, {
    label: "折叠",
    keys: "框选后点折叠"
  }, {
    label: "整理",
    keys: "框选后点整理"
  }, {
    label: "节点对齐",
    keys: "`"
  }, {
    label: "画布导航",
    keys: "T"
  }, {
    label: "涂鸦选择",
    keys: "V"
  }, {
    label: "涂鸦画笔",
    keys: "B"
  }, {
    label: "涂鸦橡皮",
    keys: "E"
  }, {
    label: "笔刷粗细",
    keys: "按住 + / −"
  }, {
    label: "播放 / 暂停",
    keys: "空格"
  }, {
    label: "快进 / 快退",
    keys: "← →"
  }, {
    label: "大图翻页",
    keys: "← →"
  }, {
    label: "关闭",
    keys: "Esc"
  }],
  XNr = {
    global: [{
      label: "撤销",
      keys: `${BA}+Z`
    }, {
      label: "重做",
      keys: `${BA}+${tRe}+Z`
    }, {
      label: "复制",
      keys: `${BA}+C`,
      note: "有选中文字时复制文字，否则复制节点"
    }, {
      label: "粘贴",
      keys: `${BA}+V`,
      note: "节点贴到鼠标位置；剪贴板是图片或视频时作为素材"
    }, {
      label: "粘贴节点",
      keys: `${BA}+${tRe}+V`,
      note: "剪贴板里是图片时，仍粘贴上次复制的节点"
    }, {
      label: "删除",
      keys: kEt ? "Delete" : "Del",
      note: "删除选中节点、连线，或折叠的叠卡"
    }, {
      label: "快速复制",
      keys: "Alt+拖拽"
    }, {
      label: "语音输入",
      keys: "长按 V",
      note: "先选中带提示词的节点；再按一次 V 结束"
    }, {
      label: "开始生成",
      keys: `${BA}+Enter`,
      note: "在绘画、视频或改图的提示词里"
    }, {
      label: "关闭",
      keys: "Esc"
    }],
    canvas: RTn,
    file: [{
      label: "保存项目",
      keys: `${BA}+S`,
      note: "按当前项目名写入项目管理"
    }, {
      label: "另存为",
      keys: "项目管理",
      note: "左侧「项目管理」里另存一份"
    }, {
      label: "保存选区",
      keys: "框选后右键",
      note: "保存当前选取工作流"
    }, {
      label: "导出项目",
      keys: "左侧工具栏"
    }, {
      label: "导入工作流",
      keys: "左侧工具栏"
    }, {
      label: "粘贴素材",
      keys: `${BA}+V`,
      note: "空白处新建上传节点；选中图片或视频节点则写入该节点"
    }, {
      label: "保存到素材库",
      keys: "框选工具条"
    }, {
      label: "下载",
      keys: "节点顶栏 / 组工具条"
    }],
    tools: [{
      label: "文本",
      keys: "左侧栏",
      note: "在画布上拖出一块区域后直接输入"
    }, {
      label: "涂鸦",
      keys: "左侧栏",
      note: "空白处拖拽手绘。V 选择笔迹，B 画笔，E 橡皮；按住 + / − 改粗细"
    }, {
      label: "上传",
      keys: "双击画布",
      note: `放入图片、视频或音频。选中节点后可用 ${BA}+V 替换内容`
    }, {
      label: "绘画 / 视频",
      keys: "双击画布",
      note: `写提示词后 ${BA}+Enter 生成。从节点「+」拖线接入参考图`
    }, {
      label: "音频",
      keys: "双击画布",
      note: "生成语音、音乐或音效"
    }, {
      label: "连接",
      keys: "节点「+」",
      note: `拖到目标松手。${tRe} 多选或框选后，从「+」一次连出多条`
    }, {
      label: "图片工具",
      keys: "选中图片",
      note: "顶栏可改图、裁剪、调角度、高清放大；双击进入全屏"
    }, {
      label: "剪辑时间线",
      keys: "更多工具",
      note: "空格播放。B 或 C 在播放头切开；I / Q 设入点，O / W 设出点"
    }, {
      label: "节点对齐",
      keys: "`",
      note: "选中至少两个节点后，做对齐或等间距"
    }, {
      label: "画布导航",
      keys: "T",
      note: "小地图看全局位置，点击可跳转"
    }, {
      label: "生成历史",
      keys: "左侧栏",
      note: "回看已经生成的图片和视频"
    }, {
      label: "个人记忆",
      keys: "左侧栏",
      note: "记录项目关系，不会往主画布添加节点"
    }, {
      label: "提示词 @",
      keys: "@",
      note: "在绘画或视频提示词里提及素材"
    }]
  },
  JNr = ({
    isDark: e,
    isExpanded: t,
    onClose: n
  }) => {
    on();
    const [r, a] = g.useState("canvas"),
      [i, o] = g.useState(!1),
      s = g.useRef(null),
      l = g.useRef(null),
      d = g.useCallback(() => {
        const m = s.current,
          f = document.activeElement;
        m && f instanceof HTMLElement && m.contains(f) && f.blur(), n == null || n();
      }, [n]);
    g.useEffect(() => {
      var y;
      const m = s.current;
      if (!m) return;
      if (t) {
        m.removeAttribute("inert"), (y = l.current) == null || y.focus({
          preventScroll: !0
        });
        return;
      }
      const f = document.activeElement;
      f instanceof HTMLElement && m.contains(f) && f.blur(), m.setAttribute("inert", "");
    }, [t]), g.useEffect(() => {
      if (!t || !n) return;
      const m = f => {
        f.key === "Escape" && (f.preventDefault(), f.stopPropagation(), d());
      };
      return window.addEventListener("keydown", m, !0), () => window.removeEventListener("keydown", m, !0);
    }, [d, t, n]);
    const u = XNr[r],
      h = g.useMemo(() => {
        const m = r === "tools" ? 2 : u.length <= 3 ? 1 : u.length <= 6 ? 2 : 3;
        return YNr(u, m);
      }, [r, u]),
      p = (m, f) => {
        m.preventDefault(), m.stopPropagation(), (async () => {
          try {
            const y = new URL(f);
            if (y.protocol !== "https:" || y.username || y.password) return;
            const {
              openUrl: b
            } = await Ie(async () => {
              const {
                openUrl: v
              } = await Promise.resolve().then(() => hFe);
              return {
                openUrl: v
              };
            }, void 0, import.meta.url);
            await b(y.href);
          } catch {
            window.open(f, "_blank", "noopener,noreferrer");
          }
        })();
      };
    return c.jsxs(c.Fragment, {
      children: [c.jsxs("div", {
        ref: s,
        className: "fixed inset-0 z-[130] flex items-center justify-center px-4 pointer-events-none",
        ...(t ? {} : {
          "aria-hidden": !0
        }),
        children: [t && c.jsx("div", {
          className: `absolute inset-0 pointer-events-auto ${e ? "bg-black/30" : "bg-zinc-900/15"}`,
          onClick: d
        }), c.jsx("div", {
          className: `transition-all duration-300 ${t ? "translate-y-0 pointer-events-auto opacity-100" : "translate-y-full pointer-events-none opacity-0"}`,
          children: c.jsxs("div", {
            className: `flex max-h-[calc(100dvh-2rem)] w-[min(960px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[22px] border shadow-[0_24px_80px_rgba(0,0,0,0.45)] outline-none ${e ? "bg-[#1a1a1a] border-white/[0.08]" : "bg-white border-zinc-200"}`,
            ref: l,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": x("帮助"),
            tabIndex: -1,
            children: [c.jsxs("div", {
              className: "relative flex min-h-12 shrink-0 items-center justify-center px-12",
              children: [c.jsx("div", {
                className: "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-2 sm:gap-x-8",
                children: QNr.map(m => {
                  const f = m.id === r;
                  return c.jsxs("button", {
                    type: "button",
                    onClick: () => a(m.id),
                    className: `relative pb-2 text-[13px] transition-colors ${f ? e ? "text-zinc-100" : "text-zinc-900" : e ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-700"}`,
                    children: [x(m.label), f && c.jsx("span", {
                      className: `absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full ${e ? "bg-white" : "bg-zinc-900"}`
                    })]
                  }, m.id);
                })
              }), n && c.jsx("button", {
                type: "button",
                onClick: d,
                className: `absolute right-4 grid h-8 w-8 place-items-center rounded-md transition-colors ${e ? "text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-200" : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"}`,
                title: x("关闭"),
                "aria-label": x("关闭"),
                children: c.jsx(Na, {
                  size: 16
                })
              })]
            }), c.jsx("div", {
              className: `grid min-h-0 max-h-[560px] grid-cols-1 overflow-y-auto px-5 py-4 sm:px-7 sm:py-5 ${h.length === 1 ? "mx-auto w-full max-w-sm" : h.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`,
              children: h.map((m, f) => c.jsx("div", {
                className: `min-w-0 space-y-1 md:px-4 md:first:pl-0 md:last:pr-0 ${f > 0 ? e ? "md:border-l border-white/[0.06]" : "md:border-l border-zinc-200" : ""}`,
                children: m.map(y => c.jsxs("div", {
                  className: "flex min-h-[36px] flex-col justify-center py-1",
                  children: [c.jsxs("div", {
                    className: "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
                    children: [c.jsx("span", {
                      className: `min-w-0 max-w-full break-words text-[13px] leading-5 ${e ? "text-zinc-300" : "text-zinc-700"}`,
                      children: x(y.label)
                    }), c.jsx("span", {
                      className: `ml-auto min-w-0 max-w-full break-words text-right text-[13px] leading-5 ${e ? "text-zinc-500" : "text-zinc-400"}`,
                      children: x(y.keys)
                    })]
                  }), y.note && c.jsx("p", {
                    className: `mt-0.5 text-[11px] leading-4 ${e ? "text-zinc-500" : "text-zinc-400"}`,
                    children: x(y.note)
                  })]
                }, y.label))
              }, f))
            }), c.jsxs("div", {
              className: `flex shrink-0 flex-col gap-2 px-5 py-3 ${e ? "border-t border-white/[0.06]" : "border-t border-zinc-200"}`,
              children: [c.jsxs("div", {
                className: "flex flex-wrap items-center justify-center gap-x-4 gap-y-2",
                children: [c.jsx("span", {
                  className: "text-[11px] text-zinc-500",
                  children: x("作者主页")
                }), KNr.map(m => c.jsxs("a", {
                  href: m.href,
                  onClick: f => p(f, m.href),
                  className: `inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] hover:opacity-80 transition-opacity ${e ? "text-zinc-300" : "text-zinc-700"}`,
                  title: x("点击打开主页"),
                  children: [c.jsx("img", {
                    src: m.logo,
                    alt: "",
                    "aria-hidden": !0,
                    className: `h-3.5 w-3.5 shrink-0 object-contain ${"invertOnLight" in m && m.invertOnLight && !e ? "invert" : ""}`
                  }), x(m.label)]
                }, m.href)), c.jsx("button", {
                  type: "button",
                  onClick: m => {
                    m.stopPropagation(), m.preventDefault(), o(!0);
                  },
                  className: `
                    sponsor-heart-btn sketch-heart-btn
                    relative flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full outline-none transition-transform
                    hover:scale-105 focus-visible:ring-2 focus-visible:ring-pink-400/70
                    ${e ? "sketch-heart-btn-dark" : ""}
                  `,
                  "aria-label": x("打开赞助者感谢墙"),
                  children: c.jsx(MLe, {
                    className: "h-3 w-3",
                    fill: "white",
                    stroke: "none",
                    strokeWidth: 0
                  })
                })]
              }), c.jsxs("div", {
                className: `flex flex-wrap justify-center gap-x-4 gap-y-1 text-center text-[12px] font-bold leading-5 ${e ? "text-white" : "text-zinc-900"}`,
                children: [c.jsx("span", {
                  className: "min-w-0 break-words",
                  children: x("AIYOUPLUS · 创作，让想象延展")
                }), c.jsx("span", {
                  className: "min-w-0 break-words",
                  children: x("画布是免费的，切勿购买")
                })]
              })]
            })]
          })
        })]
      }), c.jsx($Nr, {
        open: i,
        onClose: () => o(!1)
      })]
    });
  };

function ZNr({
  isDark: e
}) {
  on();
  const [t, n] = g.useState(!1);
  return c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      type: "button",
      className: "desktop-titlebar-menu-btn",
      "aria-haspopup": "dialog",
      "aria-expanded": t,
      title: x(t ? "收起帮助" : "显示帮助"),
      onClick: r => {
        r.preventDefault(), r.stopPropagation(), n(a => !a);
      },
      onDoubleClick: r => r.stopPropagation(),
      children: x("帮助")
    }), c.jsx(JNr, {
      isDark: e,
      isExpanded: t,
      onClose: () => n(!1)
    })]
  });
}

const AEt = 720,
  EF = 680;

let HK = !1,
  LY = AEt;

const vmt = new Set();

function e7r() {
  vmt.forEach(e => e());
}

function NTn(e) {
  return vmt.add(e), () => {
    vmt.delete(e);
  };
}

function t7r() {
  try {
    const e = localStorage.getItem("qiaodoumayi_chat_width");
    if (e != null) {
      const t = parseInt(e, 10);
      if (!Number.isNaN(t) && t >= 300 && t <= 1200) return Math.max(t, EF);
    }
  } catch {}
  return AEt;
}

LY = t7r();

function wmt(e = HK, t = LY) {
  if (typeof document > "u") return;
  const n = document.documentElement;
  LY = t, n.style.setProperty("--sketch-chat-sidebar-width", `${t}px`), e ? n.dataset.chatSidebarOpen = "true" : delete n.dataset.chatSidebarOpen;
}

function h5() {
  return HK;
}

function Qge() {
  return LY;
}

function EWt(e) {
  const t = Math.max(EF, Math.min(1200, e));
  if (t === LY) {
    HK && wmt(!0, t);
    return;
  }
  LY = t, wmt(HK, t);
}

function $ae(e) {
  const t = typeof e == "function" ? e(HK) : e;
  t !== HK && (HK = t, t ? Ie(async () => {
    const {
      markPanelHydrateGrace: n,
      PANEL_OPEN_GRACE_MS: r
    } = await Promise.resolve().then(() => aD);
    return {
      markPanelHydrateGrace: n,
      PANEL_OPEN_GRACE_MS: r
    };
  }, void 0, import.meta.url).then(({
    markPanelHydrateGrace: n,
    PANEL_OPEN_GRACE_MS: r
  }) => {
    n(r);
  }).catch(() => {}) : Ie(async () => {
    const {
      markPanelHydrateGrace: n,
      PANEL_CLOSE_GRACE_MS: r
    } = await Promise.resolve().then(() => aD);
    return {
      markPanelHydrateGrace: n,
      PANEL_CLOSE_GRACE_MS: r
    };
  }, void 0, import.meta.url).then(({
    markPanelHydrateGrace: n,
    PANEL_CLOSE_GRACE_MS: r
  }) => {
    n(r);
  }).catch(() => {}), wmt(t, LY), e7r());
}

function OY() {
  $ae(!0);
}

function nWe() {
  $ae(!1);
}

function jTn() {
  $ae(e => !e);
}

function nRe(e) {
  return NTn(e);
}

function S5e() {
  return g.useSyncExternalStore(NTn, h5, h5);
}

let Gae = !1,
  Lbe = !1;

const xmt = new Set();

function SEt() {
  xmt.forEach(e => e());
}

function n7r(e) {
  return xmt.add(e), () => {
    xmt.delete(e);
  };
}

function TWt() {
  return Gae;
}

function IEt(e) {
  const t = typeof e == "function" ? e(Gae) : e;
  t !== Gae && (Gae = t, SEt());
}

function r7r(e) {
  const t = typeof e == "function" ? e(Lbe) : e;
  if (t) {
    gZ("Storage");
    return;
  }
  t !== Lbe && (Lbe = t, SEt());
}

const a7r = ["ApiAccess", "Chat", "Image", "Video", "3D", "Music", "Speech", "Storage", "Canvas", "Privacy", "Language"];

function _mt(e) {
  return a7r.includes(e);
}

let kmt = null;

const Amt = "qiaodoumayi-settings-tab";

function gZ(e) {
  _mt(e) && (kmt = e, typeof window < "u" && window.dispatchEvent(new CustomEvent(Amt, {
    detail: e
  }))), IEt(!0);
}

function MWt() {
  const e = kmt;
  return kmt = null, e;
}

function i7r() {
  gZ("Storage");
}

function CEt() {
  IEt(!1);
}

function o7r() {
  let e = !1;
  Gae && (Gae = !1, e = !0), Lbe && (Lbe = !1, e = !0), e && SEt();
}

function rWe() {
  return g.useSyncExternalStore(n7r, TWt, TWt);
}

let DLe = !1;

const Smt = new Set();

function s7r(e) {
  return Smt.add(e), () => {
    Smt.delete(e);
  };
}

function l7r() {
  DLe || (DLe = !0, Smt.forEach(e => e()));
}

function c7r() {
  return g.useSyncExternalStore(s7r, () => DLe, () => DLe);
}

const d7r = /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk [\d]+ failed/i;

function rRe(e) {
  const t = e instanceof Error ? e.message : String(e ?? "");
  return d7r.test(t);
}

const Imt = new Set();

function PWt() {
  for (const e of Imt) e();
  Imt.clear();
}

function Yp(e, t) {
  const a = () => g.lazy(async () => {
    let s;
    for (let l = 0; l <= 2; l++) try {
      return await e();
    } catch (d) {
      if (s = d, !rRe(d) || l >= 2) throw Imt.add(o), d;
      await new Promise(u => setTimeout(u, 400 * (l + 1)));
    }
    throw s;
  });
  let i = a();
  const o = () => {
    i = a();
  };
  return function (l) {
    return g.createElement(i, l);
  };
}

const u7r = "qiaodoumayi_emergency_reload_last",
  h7r = "qiaodoumayi.emergency.lastSavePath";

let RWt = !1;

function p7r() {
  try {
    const e = performance.memory;
    if (!e || !e.jsHeapSizeLimit) return null;
    const t = Math.round((e.usedJSHeapSize || 0) / 1024 / 1024),
      n = Math.round((e.jsHeapSizeLimit || 0) / 1024 / 1024),
      r = e.jsHeapSizeLimit ? e.usedJSHeapSize / e.jsHeapSizeLimit : 0;
    return {
      usedMB: t,
      limitMB: n,
      ratio: r
    };
  } catch {
    return null;
  }
}

function LLe(e, t) {
  try {
    const n = window;
    localStorage.setItem(u7r, JSON.stringify({
      reason: e,
      phase: t,
      at: new Date().toISOString(),
      memory: p7r(),
      systemMemory: n.__qdmSystemMemoryInfo || null,
      systemMemoryGB: n.__qdmSystemMemoryGB || null,
      policy: {
        emergencySaveTimeoutMs: 8e3
      },
      state: {
        visibility: typeof document < "u" ? document.visibilityState : "unknown",
        href: typeof location < "u" ? location.href : ""
      }
    }));
  } catch {}
}

async function m7r(e) {
  LLe(e, "save-start");
  let t = null;
  try {
    const n = window.__qdmEmergencySave;
    if (typeof n == "function") {
      const r = await Promise.race([Promise.resolve(n(e)), new Promise(a => setTimeout(() => a(null), 8e3))]);
      typeof r == "string" && r.trim() && (t = r);
    }
  } catch (n) {
    console.error("[QDM EmergencySave] reload save failed", n);
  }
  try {
    sessionStorage.setItem(h7r, t || "");
  } catch {}
  return LLe(e, t ? "save-ok" : "save-timeout-or-failed"), t;
}

function Cmt(e) {
  if (RWt) {
    LLe(e, "reload");
    return;
  }
  RWt = !0, m7r(e).finally(() => {
    LLe(e, "reload");
    try {
      window.location.reload();
    } catch {}
  });
}

const f7r = [{
    id: "Privacy",
    label: "隐私"
  }, {
    id: "Canvas",
    label: "画布功能"
  }, {
    id: "ApiAccess",
    label: "API 接入"
  }, {
    id: "Chat",
    label: "对话"
  }, {
    id: "Image",
    label: "绘画"
  }, {
    id: "Video",
    label: "视频"
  }, {
    id: "3D",
    label: "3D"
  }, {
    id: "Music",
    label: "音乐"
  }, {
    id: "Speech",
    label: "语音"
  }, {
    id: "Storage",
    label: "存储"
  }, {
    id: "Language",
    label: "语言"
  }],
  DTn = {
    Privacy: "隐私",
    Canvas: "画布功能",
    ApiAccess: "API 接入",
    Chat: "对话",
    Image: "绘画",
    Video: "视频",
    "3D": "3D",
    Music: "音乐",
    Speech: "语音",
    Storage: "存储",
    Language: "语言"
  },
  g7r = {
    Privacy: c.jsx(ymt, {
      size: 16,
      strokeWidth: 1.75
    }),
    Canvas: c.jsx(Bv, {
      size: 16,
      strokeWidth: 1.75
    }),
    ApiAccess: c.jsx(xNr, {
      size: 16,
      strokeWidth: 1.75
    }),
    Chat: c.jsx(qv, {
      size: 16,
      strokeWidth: 1.75
    }),
    Image: c.jsx(lo, {
      size: 16,
      strokeWidth: 1.75
    }),
    Video: c.jsx(Oo, {
      size: 16,
      strokeWidth: 1.75
    }),
    "3D": c.jsx(Hm, {
      size: 16,
      strokeWidth: 1.75
    }),
    Music: c.jsx(Qh, {
      size: 16,
      strokeWidth: 1.75
    }),
    Speech: c.jsx(cTn, {
      size: 16,
      strokeWidth: 1.75
    }),
    Storage: c.jsx(axe, {
      size: 16,
      strokeWidth: 1.75
    }),
    Language: c.jsx(aNr, {
      size: 16,
      strokeWidth: 1.75
    })
  },
  y7r = ({
    activeId: e,
    onSelect: t,
    counts: n
  }) => (on(), c.jsx("nav", {
    className: "settings-workspace-nav",
    "aria-label": x("设置分类"),
    children: f7r.map(r => {
      const a = n == null ? void 0 : n[r.id];
      return c.jsxs("button", {
        type: "button",
        onClick: () => t(r.id),
        className: `settings-workspace-nav-item${e === r.id ? " is-active" : ""}`,
        "aria-current": e === r.id ? "page" : void 0,
        children: [c.jsx("span", {
          className: "settings-workspace-nav-icon",
          children: g7r[r.id]
        }), c.jsx("span", {
          className: "settings-workspace-nav-label",
          children: x(r.label)
        }), typeof a == "number" ? c.jsx("span", {
          className: "settings-workspace-nav-count",
          children: a
        }) : null]
      }, r.id);
    })
  })),
  EEt = ({
    isDark: e,
    onClose: t,
    brand: n,
    title: r,
    sidebar: a,
    children: i,
    embedded: o = !1,
    hidden: s = !1
  }) => {
    if (on(), g.useEffect(() => {
      if (o || s) return;
      const d = u => {
        u.key === "Escape" && t();
      };
      return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
    }, [t, o, s]), o) return c.jsxs("div", {
      className: "studio-settings-features",
      children: [c.jsx("aside", {
        children: a
      }), c.jsxs("section", {
        children: [c.jsx("h3", {
          className: "settings-workspace-page-title",
          children: x(r)
        }), i]
      })]
    });
    const l = c.jsx("div", {
      className: "sketch-modal-overlay sketch-modal-enter settings-workspace-overlay fixed inset-0 z-[100] flex items-center justify-center",
      hidden: s,
      onClick: t,
      children: c.jsxs("div", {
        className: `sketch-modal sketch-modal-enter settings-workspace${e ? " sketch-modal-dark settings-workspace-dark" : ""}`,
        onClick: d => d.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "workspace-page-title",
        children: [c.jsxs("aside", {
          className: "settings-workspace-sidebar",
          children: [c.jsx("div", {
            className: "settings-workspace-brand",
            children: x(n)
          }), a]
        }), c.jsxs("section", {
          className: "settings-workspace-main",
          children: [c.jsxs("header", {
            className: "settings-workspace-header",
            children: [c.jsx("h2", {
              id: "workspace-page-title",
              className: "settings-workspace-page-title",
              children: x(r)
            }), c.jsx("button", {
              type: "button",
              onClick: t,
              className: `settings-workspace-close${e ? " is-dark" : ""}`,
              "aria-label": x("返回应用"),
              title: x("返回应用"),
              children: c.jsx(Na, {
                size: 16,
                strokeWidth: 1.75
              })
            })]
          }), c.jsx("div", {
            className: "settings-workspace-body hide-scrollbar",
            children: i
          })]
        })]
      })
    });
    return typeof document > "u" ? l : Da.createPortal(l, document.body);
  },
  LTn = ({
    isDark: e
  }) => (on(), c.jsxs("div", {
    className: "space-y-3",
    "aria-hidden": !0,
    children: [c.jsx("div", {
      className: `h-4 w-1/3 rounded ${e ? "bg-zinc-800" : "bg-zinc-200"} sketch-skeleton-pulse`
    }), c.jsx("div", {
      className: `h-9 w-full rounded-xl ${e ? "bg-zinc-800" : "bg-zinc-200"} sketch-skeleton-pulse`
    }), c.jsx("div", {
      className: `h-9 w-full rounded-xl ${e ? "bg-zinc-800" : "bg-zinc-200"} sketch-skeleton-pulse`
    }), c.jsx("div", {
      className: `h-9 w-2/3 rounded-xl ${e ? "bg-zinc-800" : "bg-zinc-200"} sketch-skeleton-pulse`
    })]
  })),
  OTn = ({
    isDark: e,
    onClose: t,
    activeId: n,
    onSelect: r,
    counts: a,
    children: i,
    hidden: o = !1
  }) => (on(), c.jsx(EEt, {
    isDark: e,
    onClose: t,
    brand: x("全局设置"),
    title: x(DTn[n]),
    hidden: o,
    sidebar: c.jsx(y7r, {
      activeId: n,
      onSelect: r,
      counts: a
    }),
    children: i
  })),
  b7r = ({
    isDark: e,
    onClose: t
  }) => (on(), c.jsx(OTn, {
    isDark: e,
    onClose: t,
    activeId: "Chat",
    onSelect: () => {},
    children: c.jsx(LTn, {
      isDark: e
    })
  }));

let dxe = null,
  Obe,
  Vae = 0;

const OLe = new Set();

function Emt() {
  return dxe;
}

function BTn(e) {
  return OLe.add(e), () => {
    OLe.delete(e);
  };
}

function v7r() {
  if (Vae = 0, Obe === void 0) return;
  const e = Obe;
  Obe = void 0, dxe !== e && (dxe = e, OLe.forEach(t => t()));
}

function w7r(e) {
  Obe = e, !Vae && (Vae = requestAnimationFrame(v7r));
}

function x7r() {
  Vae && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(Vae), Vae = 0), Obe = void 0, dxe != null && (dxe = null, OLe.forEach(e => e()));
}

const _7r = [{
    id: "connection",
    label: "连线"
  }, {
    id: "canvas",
    label: "画布"
  }, {
    id: "node",
    label: "节点"
  }, {
    id: "action",
    label: "操作"
  }],
  k7r = {
    connection: "连线",
    canvas: "画布",
    node: "节点",
    action: "操作"
  };

function A7r(e) {
  return {
    connection: !!(e.hasConnectionDisplay || e.hasWireTilt || e.hasWireMarquee || e.hasFlowAnim || e.hasStrokeWidth || e.hasOpacity || e.hasHitWidth || e.hasLineColor),
    canvas: !!(e.hasFollow || e.hasGrid || e.hasSnap || e.hasMinimap || e.hasGridSpacing || e.hasGridDot || e.hasAlignmentGuides || e.hasLocateAnimation || e.hasBgGlow),
    node: !!(e.hasDeleteButton || e.hasStartButton || e.hasTimer || e.hasNodeAnim || e.hasHideInputPreviews),
    action: !!e.hasClear
  };
}

function FTn(e) {
  return _7r.filter(t => e[t.id]);
}

const zTn = [{
    id: "platform",
    label: "平台令牌"
  }, {
    id: "proxy",
    label: "出站代理"
  }, {
    id: "media",
    label: "图床"
  }, {
    id: "pet",
    label: "桌宠"
  }, {
    id: "jimeng",
    label: "即梦"
  }, {
    id: "codex",
    label: "Codex"
  }, {
    id: "superRes",
    label: "超清"
  }],
  Tmt = {
    platform: "平台 API 令牌",
    proxy: "海艺 OpenAPI 出站代理",
    media: "图床 / 媒体存储",
    pet: "AIYOU桌面伙伴",
    jimeng: "即梦画布 CLI",
    codex: "Codex 生图与 Chat",
    superRes: "即梦智能超清"
  };

function NWt(e) {
  return zTn.some(t => t.id === e);
}

function UTn() {
  return zTn.filter(e => e.id !== "proxy");
}

let Mmt = "connection";

const Pmt = new Set();

function S7r() {
  return Mmt;
}

function $Tn(e) {
  e !== Mmt && (Mmt = e, Pmt.forEach(t => t()));
}

function GTn() {
  return g.useSyncExternalStore(e => (Pmt.add(e), () => Pmt.delete(e)), S7r, () => "connection");
}

function VTn(e) {
  $Tn(e), gZ("Canvas");
}

let HTn = null;

const Rmt = new Set();

function I7r(e) {
  HTn = e, Rmt.forEach(t => t());
}

function C7r() {
  return g.useSyncExternalStore(e => (Rmt.add(e), () => Rmt.delete(e)), () => HTn, () => null);
}

const E7r = {
    connection: c.jsx(ATn, {
      size: 16,
      strokeWidth: 1.75
    }),
    canvas: c.jsx(Bv, {
      size: 16,
      strokeWidth: 1.75
    }),
    node: c.jsx(kf, {
      size: 16,
      strokeWidth: 1.75
    }),
    action: c.jsx(Qo, {
      size: 16,
      strokeWidth: 1.75
    }),
    platform: c.jsx(fEt, {
      size: 16,
      strokeWidth: 1.75
    }),
    proxy: c.jsx(i9, {
      size: 16,
      strokeWidth: 1.75
    }),
    media: c.jsx(Wp, {
      size: 16,
      strokeWidth: 1.75
    }),
    pet: c.jsx(ERr, {
      size: 16,
      strokeWidth: 1.75
    }),
    jimeng: c.jsx(ac, {
      size: 16,
      strokeWidth: 1.75
    }),
    codex: c.jsx(zEn, {
      size: 16,
      strokeWidth: 1.75
    }),
    superRes: c.jsx(EP, {
      size: 16,
      strokeWidth: 1.75
    })
  },
  T7r = ({
    activeId: e,
    onSelect: t,
    availability: n,
    counts: r
  }) => (on(), c.jsx("nav", {
    className: "settings-workspace-nav",
    "aria-label": x("功能分类"),
    children: [...FTn(n), ...UTn()].map(a => {
      const i = r == null ? void 0 : r[a.id];
      return c.jsxs("button", {
        type: "button",
        onClick: () => t(a.id),
        className: `settings-workspace-nav-item${e === a.id ? " is-active" : ""}`,
        title: a.id in Tmt ? Tmt[a.id] : a.label,
        children: [c.jsx("span", {
          className: "settings-workspace-nav-icon",
          children: E7r[a.id]
        }), c.jsx("span", {
          className: "settings-workspace-nav-label",
          children: x(a.label)
        }), typeof i == "number" ? c.jsx("span", {
          className: "settings-workspace-nav-count",
          children: i
        }) : null]
      }, a.id);
    })
  })),
  $u = ({
    title: e,
    description: t,
    action: n,
    children: r
  }) => c.jsxs("section", {
    className: "settings-pref-block",
    children: [c.jsxs("div", {
      className: "settings-pref-row",
      children: [c.jsxs("div", {
        className: "settings-pref-copy",
        children: [c.jsx("h4", {
          className: "settings-pref-title",
          children: e
        }), t ? c.jsx("div", {
          className: "settings-pref-desc",
          children: t
        }) : null]
      }), n ? c.jsx("div", {
        className: "settings-pref-action",
        children: n
      }) : null]
    }), r]
  }),
  M7r = ({
    onClearCanvas: e,
    onClose: t
  }) => (on(), e ? c.jsx("div", {
    className: "space-y-7",
    children: c.jsx($u, {
      title: x("清空画布"),
      description: x("移除当前画布上的节点与连线。此操作可撤销。"),
      action: c.jsx("button", {
        type: "button",
        className: "settings-pill-btn settings-pill-btn-danger",
        onClick: () => {
          e(), t();
        },
        children: x("清空")
      })
    })
  }) : null),
  tce = 20,
  WTn = 8,
  qTn = 80,
  BLe = .5,
  KTn = .5,
  QTn = 6,
  BY = 15,
  P7r = "#91919a",
  R7r = "#ffffff",
  N7r = 1,
  j7r = .3;

function FLe(e) {
  if (!Number.isFinite(e)) return tce;
  const t = Math.round(e);
  return Math.max(WTn, Math.min(qTn, t));
}

function zLe(e) {
  return Number.isFinite(e) ? Math.max(KTn, Math.min(QTn, e)) : BLe;
}

function D7r(e) {
  return `${FLe(e)}px`;
}

function jWt(e) {
  const t = zLe(e);
  return `${Number(t.toFixed(2))}px`;
}

const L7r = 380,
  TEt = 100,
  YTn = 50,
  XTn = 500,
  Nmt = 50;

function ULe(e) {
  if (!Number.isFinite(e)) return TEt;
  const t = Math.round(e / Nmt) * Nmt;
  return Math.min(XTn, Math.max(YTn, t));
}

function Uet(e, t) {
  const n = ULe(t);
  return e > n ? 0 : L7r;
}

function DWt(e) {
  return `${ULe(e)}`;
}

const I5e = "#dfdfdf",
  yZ = "#000000",
  O7r = "#09090b",
  $et = "qiaodoumayi_canvas_bg_grid";

function B7r() {
  if (typeof localStorage > "u") return;
  if (localStorage.getItem($et) === "1" || localStorage.getItem("qiaodoumayi_canvas_bg_tapnow_grid") === "1") {
    localStorage.setItem($et, "1");
    return;
  }
  localStorage.setItem($et, "1");
  try {
    const t = Zi.CANVAS_BG_COLOR_DARK,
      n = localStorage.getItem(t);
    if (n == null) return;
    const r = JSON.parse(n);
    typeof r == "string" && r.trim().toLowerCase() === O7r && localStorage.setItem(t, JSON.stringify(yZ));
  } catch {}
}

B7r();

const F7r = "qiaodoumayi_canvas_bg_recent_colors_light",
  z7r = "qiaodoumayi_canvas_bg_recent_colors_dark",
  U7r = ["#dfdfdf", "#ffffff", "#18181b", "#86efac", "#c4b5fd", "#ede9fe"],
  $7r = ["#000000", "#09090b", "#18181b", "#27272a", "#14532d", "#312e81"];

function gO(e) {
  if (typeof e != "string") return null;
  const t = e.trim().toLowerCase().replace(/^#/, "");
  return /^[0-9a-f]{3}$/.test(t) ? `#${t[0]}${t[0]}${t[1]}${t[1]}${t[2]}${t[2]}` : /^[0-9a-f]{6}$/.test(t) ? `#${t}` : null;
}

function LWt(e) {
  const t = gO(e);
  return t ? `# ${t.slice(1).toUpperCase()}` : "# ------";
}

function G7r(e) {
  const t = gO(e);
  if (!t) return null;
  const n = t.slice(1);
  return {
    r: parseInt(n.slice(0, 2), 16),
    g: parseInt(n.slice(2, 4), 16),
    b: parseInt(n.slice(4, 6), 16)
  };
}

function V7r(e, t, n) {
  const r = a => Math.max(0, Math.min(255, Math.round(a)));
  return `#${[r(e), r(t), r(n)].map(a => a.toString(16).padStart(2, "0")).join("")}`;
}

function H7r(e, t, n) {
  const r = e / 255,
    a = t / 255,
    i = n / 255,
    o = Math.max(r, a, i),
    s = Math.min(r, a, i),
    l = o - s;
  let d = 0;
  l !== 0 && (o === r ? d = (a - i) / l % 6 : o === a ? d = (i - r) / l + 2 : d = (r - a) / l + 4, d *= 60, d < 0 && (d += 360));
  const u = o === 0 ? 0 : l / o;
  return {
    h: d,
    s: u,
    v: o
  };
}

function W7r(e, t, n) {
  const r = n * t,
    a = r * (1 - Math.abs(e / 60 % 2 - 1)),
    i = n - r;
  let o = 0,
    s = 0,
    l = 0;
  return e < 60 ? [o, s, l] = [r, a, 0] : e < 120 ? [o, s, l] = [a, r, 0] : e < 180 ? [o, s, l] = [0, r, a] : e < 240 ? [o, s, l] = [0, a, r] : e < 300 ? [o, s, l] = [a, 0, r] : [o, s, l] = [r, 0, a], {
    r: (o + i) * 255,
    g: (s + i) * 255,
    b: (l + i) * 255
  };
}

function q7r(e) {
  const t = G7r(e);
  return t ? H7r(t.r, t.g, t.b) : {
    h: 0,
    s: 0,
    v: 1
  };
}

function K7r(e, t, n) {
  const {
    r,
    g: a,
    b: i
  } = W7r(e, t, n);
  return V7r(r, a, i);
}

const aWe = ({
    isDark: e,
    theme: t,
    canvasBackgroundColor: n,
    canvasBackgroundDefaultHex: r,
    onCanvasBackgroundColorChange: a,
    placement: i = "above",
    dataTip: o,
    title: s = "画布背景色",
    triggerLabel: l,
    pressed: d,
    size: u = "sm",
    popupAlign: h = "left",
    portal: p = !1,
    presets: m,
    recentStorageKey: f
  }) => {
    on();
    const [y, b] = g.useState(!1),
      v = g.useRef(null),
      _ = g.useRef(null),
      [w, k] = g.useState({}),
      A = g.useRef(null),
      S = g.useRef(null),
      [C, I] = g.useState({
        h: 0,
        s: 0,
        v: 1
      }),
      E = g.useRef(C);
    E.current = C;
    const [M, T] = g.useState(""),
      P = g.useRef(null),
      R = g.useRef(null),
      j = r ?? (e ? yZ : I5e),
      B = t ?? (e ? "dark" : "light"),
      F = f ?? (B === "dark" ? z7r : F7r),
      N = /^#[0-9a-fA-F]{6}$/.test(n) ? n.toLowerCase() : j,
      G = m ?? (B === "dark" ? $7r : U7r),
      z = g.useCallback(J => {
        const pe = gO(J) ?? j,
          ce = q7r(pe);
        I(ce), T(LWt(pe));
      }, [j]),
      V = g.useCallback(J => {
        const pe = gO(J);
        pe && (a(pe), R.current = pe, z(pe));
      }, [a, z]),
      O = g.useCallback(J => {
        I(J);
        const pe = K7r(J.h, J.s, J.v);
        T(LWt(pe)), a(pe), R.current = pe;
      }, [a]),
      L = g.useCallback(J => {
        O({
          ...E.current,
          ...J
        });
      }, [O]),
      D = g.useCallback(J => {
        const pe = gO(J);
        if (pe) try {
          const ce = localStorage.getItem(F),
            we = ce ? JSON.parse(ce) : [],
            X = Array.isArray(we) ? we : [],
            Z = [pe, ...X.filter(re => re !== pe)].slice(0, 5);
          localStorage.setItem(F, JSON.stringify(Z));
        } catch {}
      }, [F]),
      U = g.useCallback(() => {
        R.current && D(R.current), b(!1);
      }, [D]);
    g.useEffect(() => {
      y && (z(N), R.current = N);
    }, [y, N, z]), g.useEffect(() => {
      if (!y) return;
      const J = pe => {
        var we, X;
        const ce = pe.target;
        (we = v.current) != null && we.contains(ce) || (X = _.current) != null && X.contains(ce) || U();
      };
      return document.addEventListener("mousedown", J, !0), () => document.removeEventListener("mousedown", J, !0);
    }, [y, U]);
    const H = g.useCallback((J, pe) => {
        const ce = A.current;
        if (!ce) return;
        const we = ce.getBoundingClientRect(),
          X = Math.max(0, Math.min(1, (J - we.left) / we.width)),
          Z = Math.max(0, Math.min(1, 1 - (pe - we.top) / we.height));
        L({
          s: X,
          v: Z
        });
      }, [L]),
      Y = g.useCallback(J => {
        const pe = S.current;
        if (!pe) return;
        const ce = pe.getBoundingClientRect(),
          we = Math.max(0, Math.min(360, (J - ce.left) / ce.width * 360));
        L({
          h: we
        });
      }, [L]);
    g.useEffect(() => {
      const J = ce => {
          P.current === "sv" && H(ce.clientX, ce.clientY), P.current === "hue" && Y(ce.clientX);
        },
        pe = () => {
          P.current = null;
        };
      return document.addEventListener("mousemove", J), document.addEventListener("mouseup", pe), () => {
        document.removeEventListener("mousemove", J), document.removeEventListener("mouseup", pe);
      };
    }, [H, Y]);
    const K = g.useMemo(() => ({
        left: `${C.s * 100}%`,
        top: `${(1 - C.v) * 100}%`
      }), [C.s, C.v]),
      W = `${C.h / 360 * 100}%`,
      Q = `hsl(${C.h}, 100%, 50%)`,
      q = J => {
        T(J);
        const pe = J.replace(/\s/g, ""),
          ce = gO(pe.startsWith("#") ? pe : `#${pe}`);
        ce && V(ce);
      },
      ne = i === "above" ? h === "right" ? "bottom-full right-0 mb-2.5" : "bottom-full left-0 mb-2.5" : h === "right" ? "top-full right-0 mt-2.5" : "top-full left-0 mt-2.5",
      de = g.useCallback(() => {
        const J = v.current;
        if (!J) return;
        const pe = J.getBoundingClientRect(),
          ce = 272,
          we = 10,
          X = 360;
        let Z = h === "right" ? pe.right - ce : pe.left;
        Z = Math.min(Math.max(8, Z), window.innerWidth - ce - 8);
        let re = i === "above";
        re && pe.top < X + we && window.innerHeight - pe.bottom > pe.top ? re = !1 : !re && window.innerHeight - pe.bottom < X + we && pe.top > window.innerHeight - pe.bottom && (re = !0), k({
          position: "fixed",
          left: Z,
          top: re ? pe.top - we : pe.bottom + we,
          transform: re ? "translateY(-100%)" : void 0,
          zIndex: 320
        });
      }, [i, h]);
    g.useLayoutEffect(() => {
      if (!(!y || !p)) return de(), window.addEventListener("resize", de), document.addEventListener("scroll", de, !0), () => {
        window.removeEventListener("resize", de), document.removeEventListener("scroll", de, !0);
      };
    }, [y, p, de]);
    const le = y ? c.jsxs("div", {
      ref: _,
      "data-canvas-bg-picker-portal": p ? "" : void 0,
      className: `${p ? "nodrag nopan nowheel" : `absolute z-[210] nodrag nopan nowheel ${ne}`} w-[272px] rounded-2xl border shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden ${e ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200/80"}`,
      style: p ? w : void 0,
      onMouseDown: J => J.stopPropagation(),
      onWheel: J => J.stopPropagation(),
      role: "dialog",
      "aria-label": s,
      children: [c.jsxs("div", {
        className: "flex items-center justify-between px-4 pt-3.5 pb-2.5",
        children: [c.jsx("span", {
          className: `text-sm font-medium ${e ? "text-zinc-100" : "text-zinc-900"}`,
          children: s
        }), c.jsx("button", {
          type: "button",
          onClick: () => U(),
          className: `p-0.5 rounded-md transition-colors ${e ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800" : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"}`,
          "aria-label": x("关闭"),
          children: c.jsx(Na, {
            size: 16,
            strokeWidth: 1.75
          })
        })]
      }), c.jsx("div", {
        className: `mx-4 border-b ${e ? "border-zinc-800" : "border-zinc-100"}`
      }), c.jsxs("div", {
        className: "px-4 pt-3 pb-4 flex flex-col gap-3",
        children: [c.jsx("div", {
          ref: A,
          className: "relative w-full h-[148px] rounded-lg cursor-crosshair select-none overflow-hidden",
          style: {
            background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, ${Q})`
          },
          onMouseDown: J => {
            J.preventDefault(), P.current = "sv", H(J.clientX, J.clientY);
          },
          children: c.jsx("div", {
            className: "absolute w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] pointer-events-none",
            style: K
          })
        }), c.jsx("div", {
          ref: S,
          className: "relative w-full h-3 rounded-full cursor-pointer select-none",
          style: {
            background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
          },
          onMouseDown: J => {
            J.preventDefault(), P.current = "hue", Y(J.clientX);
          },
          children: c.jsx("div", {
            className: "absolute top-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)] pointer-events-none",
            style: {
              left: W
            }
          })
        }), c.jsx("div", {
          className: "flex items-center justify-between gap-1",
          children: G.map(J => {
            const pe = gO(N) === gO(J);
            return c.jsx("button", {
              type: "button",
              title: J,
              onClick: () => V(J),
              className: `w-7 h-7 rounded-full shrink-0 transition-transform hover:scale-105 ${pe ? "ring-2 ring-blue-500 ring-offset-1" : ""} ${e ? "ring-offset-zinc-900" : "ring-offset-white"}`,
              style: {
                backgroundColor: J
              }
            }, J);
          })
        }), c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx("input", {
            type: "text",
            "aria-label": x("颜色值"),
            value: M,
            onChange: J => q(J.target.value),
            className: `flex-1 min-w-0 h-9 px-3 rounded-lg text-sm font-mono tracking-wide border outline-none transition-colors ${e ? "bg-zinc-800 border-zinc-700 text-zinc-200 focus:border-blue-500" : "bg-zinc-100 border-transparent text-zinc-800 focus:border-blue-400"}`,
            spellCheck: !1
          }), c.jsx("button", {
            type: "button",
            onClick: () => V(j),
            className: `shrink-0 w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${e ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"}`,
            title: x("恢复默认"),
            children: c.jsx(vd, {
              size: 16,
              strokeWidth: 1.75
            })
          })]
        })]
      })]
    }) : null;
    return c.jsxs("div", {
      ref: v,
      onKeyDown: J => {
        var pe, ce;
        !y || J.key !== "Escape" || (J.preventDefault(), J.stopPropagation(), U(), (ce = (pe = v.current) == null ? void 0 : pe.querySelector("button")) == null || ce.focus());
      },
      className: `relative flex items-center justify-center shrink-0 ${l ? "" : u === "md" ? "w-6 h-6" : "w-4 h-4"}`,
      children: [c.jsxs("button", {
        type: "button",
        onClick: J => {
          J.preventDefault(), J.stopPropagation(), b(pe => !pe);
        },
        className: `flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer rounded-full outline-none transition-opacity ${l ? "gap-2 px-3 h-8" : u === "md" ? "w-6 h-6" : "w-4 h-4"} ${y ? "opacity-100" : "opacity-90 hover:opacity-100"}`,
        "aria-expanded": y,
        "aria-pressed": d,
        "aria-haspopup": "dialog",
        "aria-label": s,
        ...(o ? {
          "data-tip": o
        } : {}),
        children: [c.jsx("span", {
          className: `block rounded-full border box-border ${u === "md" ? "w-5 h-5" : "w-3.5 h-3.5"} ${e ? "border-zinc-400" : "border-zinc-600"} ${y ? "outline outline-2 outline-blue-500 outline-offset-0" : ""}`,
          style: {
            backgroundColor: N
          }
        }), l]
      }), p ? le && typeof document < "u" ? Da.createPortal(le, document.body) : null : le]
    });
  },
  MEt = ({
    min: e,
    max: t,
    step: n,
    value: r,
    ariaLabel: a,
    onChange: i,
    onLiveChange: o,
    commitOnRelease: s = !1
  }) => {
    const [l, d] = g.useState(r),
      u = g.useRef(r),
      h = g.useRef(!1);
    g.useEffect(() => {
      h.current || (u.current = r, d(r));
    }, [r]);
    const p = b => {
        u.current = b, d(b), o == null || o(b), s || i(b);
      },
      m = () => {
        h.current = !1, s && i(u.current);
      },
      f = t - e,
      y = f <= 0 ? 0 : Math.max(0, Math.min(100, (l - e) / f * 100));
    return c.jsxs("div", {
      className: "settings-slim-range",
      style: {
        "--settings-range-progress": `${y}%`
      },
      children: [c.jsxs("div", {
        className: "settings-slim-range-rail",
        "aria-hidden": !0,
        children: [c.jsx("span", {
          className: "settings-slim-range-track"
        }), c.jsx("span", {
          className: "settings-slim-range-fill"
        }), c.jsx("span", {
          className: "settings-slim-range-thumb"
        })]
      }), c.jsx("input", {
        type: "range",
        min: e,
        max: t,
        step: n,
        value: l,
        onPointerDown: b => {
          h.current = !0, b.currentTarget.setPointerCapture(b.pointerId);
        },
        onPointerUp: m,
        onPointerCancel: m,
        onBlur: m,
        onChange: b => p(Number(b.target.value)),
        className: "settings-slim-range-input",
        "aria-label": a,
        "aria-valuenow": l
      })]
    });
  },
  Rj = ({
    checked: e,
    onChange: t,
    disabled: n = !1,
    label: r
  }) => c.jsx("button", {
    type: "button",
    role: "switch",
    "aria-checked": e,
    "aria-label": r,
    disabled: n,
    onClick: () => t(!e),
    className: `settings-toggle${e ? " is-on" : ""}${n ? " is-disabled" : ""}`,
    children: c.jsx("span", {
      className: "settings-toggle-thumb"
    })
  }),
  mS = ({
    title: e,
    description: t,
    checked: n,
    onToggle: r
  }) => r ? c.jsx($u, {
    title: e,
    description: t,
    action: c.jsx(Rj, {
      checked: n,
      onChange: () => r(),
      label: e
    })
  }) : null,
  Hae = ({
    title: e,
    description: t,
    min: n,
    max: r,
    step: a,
    value: i,
    valueLabel: o,
    onChange: s,
    onLiveChange: l,
    commitOnRelease: d = !1,
    formatValue: u
  }) => {
    const [h, p] = g.useState(o);
    return g.useEffect(() => {
      p(o);
    }, [o]), s ? c.jsx($u, {
      title: e,
      description: t,
      action: c.jsx("span", {
        className: "settings-stat-value tabular-nums",
        children: h
      }),
      children: c.jsx(MEt, {
        min: n,
        max: r,
        step: a,
        value: i,
        ariaLabel: e,
        commitOnRelease: d,
        onLiveChange: m => {
          u && p(u(m)), l == null || l(m);
        },
        onChange: s
      })
    }) : null;
  },
  Q7r = ({
    title: e,
    description: t,
    value: n,
    defaultValue: r,
    isDark: a,
    onChange: i,
    presets: o,
    recentStorageKey: s
  }) => i ? c.jsx($u, {
    title: e,
    description: t,
    action: c.jsx(aWe, {
      isDark: a,
      title: e,
      size: "md",
      placement: "above",
      popupAlign: "right",
      portal: !0,
      canvasBackgroundColor: n,
      canvasBackgroundDefaultHex: r,
      onCanvasBackgroundColorChange: i,
      presets: o,
      recentStorageKey: s
    })
  }) : null,
  JTn = ({
    title: e,
    description: t,
    value: n,
    options: r,
    onChange: a
  }) => c.jsx($u, {
    title: e,
    description: t,
    action: c.jsx("div", {
      className: "settings-mode-pills",
      role: "radiogroup",
      "aria-label": e,
      children: r.map(i => c.jsx("button", {
        type: "button",
        role: "radio",
        "aria-checked": n === i.id,
        onClick: () => a(i.id),
        className: `settings-pill-btn${n === i.id ? " is-active" : ""}`,
        children: i.label
      }, i.id))
    })
  }),
  GN = new Set(),
  OO = new Map(),
  ZTn = 512;

function AU(e) {
  const t = String(e);
  if (t) for (GN.delete(t), GN.add(t); GN.size > ZTn;) {
    const n = GN.values().next().value;
    if (n === void 0) break;
    GN.delete(n), OO.delete(n);
  }
}

function Bbe(e) {
  return GN.has(String(e));
}

function e8n(e) {
  GN.delete(String(e));
}

function $Le(e) {
  var t, n, r, a;
  if (e.status === "generating") return PEt(e);
  if (e.type === "audio") return !!((t = e.audioUrl) != null && t.trim() || (n = e.url) != null && n.trim() || (r = e._ossRemoteUrl) != null && r.trim());
  if ((a = e.mjImages) != null && a.some(i => String(i || "").trim())) return !0;
  for (const i of [e.url, e.thumbnailUrl, e._ossRemoteUrl, e.originalUrl]) {
    const o = String(i || "").trim();
    if (o && (o.startsWith("blob:") || o.startsWith("data:") || nr(o) || /^https?:\/\//i.test(o))) return !0;
  }
  return !1;
}

function nce(e) {
  return e.status !== "generating" ? !1 : $Le(e);
}

function PEt(e) {
  var t, n, r, a;
  if (e.type === "audio") return !!((t = e.audioUrl) != null && t.trim() || (n = e.url) != null && n.trim() || (r = e._ossRemoteUrl) != null && r.trim());
  if (e.mjNeedsSplit === !0 && String(e.mjOriginalUrl || "").trim() || (a = e.mjImages) != null && a.some(i => String(i || "").trim())) return !0;
  for (const i of [e.url, e.thumbnailUrl, e._ossRemoteUrl, e.videoPosterUrl]) {
    const o = String(i || "").trim();
    if (o && (o.startsWith("blob:") || o.startsWith("data:") || nr(o) || /^https?:\/\//i.test(o))) return !0;
  }
  return !1;
}

function iWe(e, t = Date.now()) {
  if (e.durationMs != null && e.durationMs > 0) return e.durationMs;
  const n = Number(e.startTime);
  if (Number.isFinite(n) && n > 0) return Math.max(0, t - n);
}

const OWt = 250;

function Y7r(e, t) {
  const n = Number(e.startTime);
  if (!(!Number.isFinite(n) || n <= 0)) return Math.max(0, t - n);
}

function BWt(e, t) {
  return e < OWt && t != null && t >= OWt;
}

function GLe(e, t = Date.now(), n) {
  const r = Y7r(e, t),
    a = e.durationMs;
  return a != null && a > 0 && !BWt(a, r) ? a : r != null && r > 0 ? r : n != null && n > 0 && !BWt(n, r) ? n : r != null && r > 0 ? r : void 0;
}

function oWe(e) {
  var t;
  return !!((t = e.generationTime) != null && t.trim()) || e.durationMs != null && e.durationMs > 0;
}

function TE(e) {
  if (!(e == null || e <= 0)) return e < 1e3 ? `${e}ms` : `${(e / 1e3).toFixed(1)}s`;
}

function u3(e, t) {
  if (!nce(e)) return e;
  const n = String(e.id);
  if (oWe(e)) return AU(n), {
    ...e,
    status: "completed",
    progress: 100,
    durationMs: e.durationMs,
    generationTime: e.generationTime || TE(e.durationMs)
  };
  let r = OO.get(n);
  if (r == null) for (r = t ?? Date.now(), OO.set(n, r); OO.size > ZTn;) {
    const o = OO.keys().next().value;
    if (o === void 0) break;
    OO.delete(o);
  }
  const a = iWe(e, r),
    i = e.generationTime || TE(a);
  return AU(n), {
    ...e,
    status: "completed",
    progress: 100,
    durationMs: a,
    ...(i ? {
      generationTime: i
    } : {})
  };
}

function X7r(e) {
  for (const t of [...GN]) e.has(t) || GN.delete(t);
  for (const t of [...OO.keys()]) e.has(t) || OO.delete(t);
}

function C5e(e) {
  if (!String(e.targetPreviewId || "").trim()) return !1;
  const n = String(e.prompt || "");
  return n.includes("智能扩图") || n.includes("智能擦除");
}

function que(e) {
  if (C5e(e)) return String(e.targetPreviewId || "").trim() || null;
  const t = String(e.sourceNodeId || "").trim();
  return t || String(e.targetPreviewId || "").trim() || null;
}

const t8n = 6.5 * 60 * 1e3,
  n8n = 1260 * 1e3;

function r8n(e, t = Date.now()) {
  const n = Number(e.startTime ?? e.timestamp);
  return !Number.isFinite(n) || n <= 0 ? null : Math.max(0, t - n);
}

function a8n(e, t) {
  if (e.status !== "generating" || PEt(e)) return !1;
  const n = r8n(e, (t == null ? void 0 : t.now) ?? Date.now());
  return n == null ? !1 : String(e.remoteTaskId || "").trim() ? n >= n8n : n >= t8n;
}

function i8n(e, t = Date.now(), n) {
  if (!a8n(e, {
    now: t
  })) return e;
  AU(String(e.id));
  const a = !!String(e.remoteTaskId || "").trim() ? "生成轮询已中断（页面重载或会话丢失），请点刷新或重新发送" : "提交超时：参考图读取或 API 请求未完成，请重试",
    i = iWe(e, t),
    o = e.generationTime || TE(i);
  return {
    ...e,
    status: "failed",
    progress: 0,
    errorMsg: a,
    durationMs: i,
    ...(o ? {
      generationTime: o
    } : {})
  };
}

function o8n(e) {
  return Number.isFinite(e) ? Math.max(0, Math.min(99, Math.round(e))) : 0;
}

function sWe(e, t) {
  for (const n of e ?? []) if (que(n) === t || !C5e(n) && n.sourceNodeId === t) return n;
}

function uxe(e, t) {
  const n = sWe(e, t);
  return n ? `${n.id}${n.status ?? ""}${n.progress ?? 0}` : "";
}

function lWe(e) {
  return e.status !== "generating" || e.mjNeedsSplit === !0 && (e.progress ?? 0) >= 99 ? !1 : !PEt(e) && (e.progress ?? 0) < 100;
}

function cWe(e) {
  const t = Date.now();
  let n = !1;
  const r = e.map(a => {
    const i = u3(a, t);
    return i !== a && (n = !0, (i.status === "completed" || i.status === "failed") && AU(String(a.id))), i;
  });
  return n ? r : e;
}

const J7r = Object.freeze(Object.defineProperty({
    __proto__: null,
    ABANDONED_CREATE_GENERATING_MS: t8n,
    ABANDONED_ORPHAN_POLL_GENERATING_MS: n8n,
    capInFlightGenerationProgress: o8n,
    failAbandonedGeneratingHistoryItem: i8n,
    formatHistoryDurationMs: TE,
    freezeHistoryItemDurationMs: iWe,
    healStaleGeneratingHistoryItem: u3,
    healStaleGeneratingHistoryList: cWe,
    historyGeneratingSignatureForNode: uxe,
    historyItemGeneratingAgeMs: r8n,
    historyItemHasDisplayableResult: $Le,
    historyItemHasFrozenDuration: oWe,
    isAbandonedGeneratingHistoryItem: a8n,
    isAuxDownstreamHistoryItem: C5e,
    isHistoryItemActivelyGenerating: lWe,
    isHistoryItemStaleGenerating: nce,
    isHistoryTaskPollingTerminal: Bbe,
    markHistoryTaskPollingTerminal: AU,
    pickLatestHistoryForNode: sWe,
    pruneHistoryTaskLifecycle: X7r,
    resolveHistoryCompletionDurationMs: GLe,
    resolveHistoryRuntimeNodeId: que,
    unmarkHistoryTaskPollingTerminal: e8n
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Z7r = null,
  XEe = Object.freeze({
    taskId: null,
    status: "idle",
    progress: 0,
    activeCount: 0
  }),
  ejr = 256;

function Get(e, t = 0) {
  const n = typeof e == "number" && Number.isFinite(e) ? e : t;
  return Math.min(100, Math.max(0, n));
}

function tjr(e) {
  return e.status === "generating" || e.status === "completed" || e.status === "failed" ? e.status : null;
}

function njr(e, t) {
  return e.taskId === t.taskId && e.status === t.status && e.progress === t.progress && e.errorMsg === t.errorMsg && e.activeCount === t.activeCount;
}

class s8n {
  constructor() {
    On(this, "tasks", new Map());
    On(this, "taskIdsByNodeId", new Map());
    On(this, "taskListeners", new Map());
    On(this, "nodeListeners", new Map());
    On(this, "nodeSnapshots", new Map());
    On(this, "terminalTaskIds", new Set());
    On(this, "nodeGeneratingIntent", new Set());
    On(this, "nodeProgressIntent", new Map());
    On(this, "nextSequence", 1);
    On(this, "generationVersion", 0);
    On(this, "globalGeneratingListeners", new Set());
    On(this, "terminalListeners", new Set());
    On(this, "subscribeTerminal", t => (this.terminalListeners.add(t), () => {
      this.terminalListeners.delete(t);
    }));
    On(this, "getTaskSnapshot", t => this.tasks.get(String(t)) ?? Z7r);
    On(this, "getNodeSnapshot", t => this.nodeSnapshots.get(String(t)) ?? XEe);
    On(this, "getNodeGeneratingSnapshot", t => {
      const n = String(t);
      return this.nodeGeneratingIntent.has(n) ? !0 : this.getNodeSnapshot(n).status === "generating";
    });
    On(this, "subscribeTask", (t, n) => this.subscribe(this.taskListeners, String(t), n));
    On(this, "subscribeNode", (t, n) => this.subscribe(this.nodeListeners, String(t), n));
    On(this, "subscribeGlobalGenerating", t => (this.globalGeneratingListeners.add(t), () => {
      this.globalGeneratingListeners.delete(t);
    }));
    On(this, "getGlobalGeneratingVersion", () => this.generationVersion);
    On(this, "hasActiveGeneratingTasks", () => this.getActiveGeneratingCount() > 0);
    On(this, "getActiveGeneratingCount", () => {
      let t = 0;
      const n = new Set();
      for (const r of this.tasks.values()) r.status === "generating" && (t += 1, r.nodeId && n.add(r.nodeId));
      for (const r of this.nodeGeneratingIntent) n.has(r) || (t += 1);
      return t;
    });
    On(this, "getLatestTerminalSnapshot", () => {
      let t = null;
      for (const n of this.tasks.values()) n.status !== "completed" && n.status !== "failed" || (!t || n.sequence > t.sequence) && (t = n);
      return t;
    });
  }
  beginNodeGenerating(t) {
    const n = String(t);
    this.nodeGeneratingIntent.has(n) || (this.nodeProgressIntent.delete(n), this.nodeGeneratingIntent.add(n), this.refreshNodeSnapshot(n));
  }
  endNodeGenerating(t) {
    const n = String(t);
    this.nodeGeneratingIntent.delete(n) && (this.nodeProgressIntent.delete(n), this.refreshNodeSnapshot(n));
  }
  clearGeneratingIntent() {
    const t = [...this.nodeGeneratingIntent];
    this.nodeGeneratingIntent.clear(), this.nodeProgressIntent.clear();
    for (const n of t) this.refreshNodeSnapshot(n);
  }
  syncHistoryItem(t) {
    const n = tjr(t),
      r = String(t.id),
      a = this.tasks.get(r);
    if (!a && n !== "generating" || !n) return;
    const i = que(t) ?? (a == null ? void 0 : a.nodeId) ?? null,
      o = Get(t.progress, n === "completed" ? 100 : (a == null ? void 0 : a.progress) ?? 0),
      s = i ? this.nodeProgressIntent.get(i) : void 0,
      l = {
        taskId: r,
        nodeId: i,
        status: n,
        progress: n === "generating" ? Math.max((a == null ? void 0 : a.progress) ?? 0, s ?? 0, o) : o,
        errorMsg: t.errorMsg || void 0,
        remoteTaskId: t.remoteTaskId ? String(t.remoteTaskId) : a == null ? void 0 : a.remoteTaskId,
        sequence: (a == null ? void 0 : a.sequence) ?? this.nextSequence++
      };
    this.commitTask(a, l, t), i && n === "generating" && this.nodeProgressIntent.delete(i);
  }
  setProgress(t, n) {
    const r = String(t),
      a = this.tasks.get(r),
      i = Get(n, (a == null ? void 0 : a.progress) ?? 0);
    if ((a == null ? void 0 : a.status) !== "generating") {
      if (a) return !1;
      const o = {
        taskId: r,
        nodeId: null,
        status: "generating",
        progress: i,
        sequence: this.nextSequence++
      };
      return this.commitTask(void 0, o), !0;
    }
    return Object.is(a.progress, i) ? !1 : (this.commitTask(a, {
      ...a,
      progress: i
    }), !0);
  }
  setProgressBatch(t) {
    for (const [n, r] of t) this.setProgress(n, r);
  }
  updateLatestProgressForNode(t, n) {
    const r = String(t),
      a = this.taskIdsByNodeId.get(r);
    let i;
    for (const l of a ?? []) {
      const d = this.tasks.get(l);
      (d == null ? void 0 : d.status) === "generating" && (!i || d.sequence > i.sequence) && (i = d);
    }
    if (i) return this.setProgress(i.taskId, n);
    if (!this.nodeGeneratingIntent.has(r)) return !1;
    const o = this.nodeProgressIntent.get(r) ?? 0,
      s = Get(n, o);
    return s <= o ? !1 : (this.nodeProgressIntent.set(r, s), this.refreshNodeSnapshot(r), !0);
  }
  remove(t) {
    const n = String(t),
      r = this.tasks.get(n);
    if (!r) return !1;
    if (this.tasks.delete(n), this.terminalTaskIds.delete(n), r.nodeId) {
      const a = this.taskIdsByNodeId.get(r.nodeId);
      a == null || a.delete(n), (a == null ? void 0 : a.size) === 0 && this.taskIdsByNodeId.delete(r.nodeId), this.refreshNodeSnapshot(r.nodeId);
    }
    return this.emit(this.taskListeners, n), !0;
  }
  reset() {
    const t = [...this.tasks.keys()],
      n = new Set([...this.taskIdsByNodeId.keys(), ...this.nodeGeneratingIntent]);
    this.tasks.clear(), this.taskIdsByNodeId.clear(), this.nodeSnapshots.clear(), this.terminalTaskIds.clear(), this.nodeGeneratingIntent.clear(), this.nodeProgressIntent.clear();
    for (const r of t) this.emit(this.taskListeners, r);
    for (const r of n) this.emit(this.nodeListeners, r);
  }
  subscribe(t, n, r) {
    let a = t.get(n);
    return a || (a = new Set(), t.set(n, a)), a.add(r), () => {
      a == null || a.delete(r), (a == null ? void 0 : a.size) === 0 && t.delete(n);
    };
  }
  emit(t, n) {
    for (const r of t.get(n) ?? []) r();
  }
  bumpGlobalGenerating() {
    this.generationVersion += 1;
    for (const t of this.globalGeneratingListeners) t();
  }
  commitTask(t, n, r) {
    if (!(t && t.nodeId === n.nodeId && t.status === n.status && t.progress === n.progress && t.errorMsg === n.errorMsg && t.remoteTaskId === n.remoteTaskId)) {
      if (t != null && t.nodeId && t.nodeId !== n.nodeId) {
        const a = this.taskIdsByNodeId.get(t.nodeId);
        a == null || a.delete(n.taskId), (a == null ? void 0 : a.size) === 0 && this.taskIdsByNodeId.delete(t.nodeId), this.refreshNodeSnapshot(t.nodeId);
      }
      if (this.tasks.set(n.taskId, n), n.status === "generating" ? this.terminalTaskIds.delete(n.taskId) : (this.terminalTaskIds.delete(n.taskId), this.terminalTaskIds.add(n.taskId)), n.nodeId) {
        let a = this.taskIdsByNodeId.get(n.nodeId);
        a || (a = new Set(), this.taskIdsByNodeId.set(n.nodeId, a)), a.add(n.taskId), n.status !== "generating" && !this.nodeHasGeneratingTask(n.nodeId) && (this.nodeGeneratingIntent.delete(n.nodeId), this.nodeProgressIntent.delete(n.nodeId)), this.refreshNodeSnapshot(n.nodeId);
      }
      if (this.emit(this.taskListeners, n.taskId), (t == null ? void 0 : t.status) === "generating" && n.status !== "generating") for (const a of this.terminalListeners) a(n, r);
      n.status !== "generating" && this.pruneTerminalTasks(n.nodeId);
    }
  }
  pruneTerminalTasks(t) {
    if (t) {
      let n;
      const r = [];
      for (const a of this.terminalTaskIds) {
        const i = this.tasks.get(a);
        !i || i.status === "generating" || i.nodeId !== t || (r.push(a), (!n || i.sequence > n.sequence) && (n = i));
      }
      for (const a of r) a !== (n == null ? void 0 : n.taskId) && this.remove(a);
    }
    for (; this.terminalTaskIds.size > ejr;) {
      const n = this.terminalTaskIds.values().next().value;
      if (!n) break;
      this.remove(n);
    }
  }
  nodeHasGeneratingTask(t) {
    var n;
    for (const r of this.taskIdsByNodeId.get(t) ?? []) if (((n = this.tasks.get(r)) == null ? void 0 : n.status) === "generating") return !0;
    return !1;
  }
  refreshNodeSnapshot(t) {
    const n = this.taskIdsByNodeId.get(t);
    let r,
      a,
      i = 0;
    for (const p of n ?? []) {
      const m = this.tasks.get(p);
      m && ((!r || m.sequence > r.sequence) && (r = m), m.status === "generating" && (i += 1, (!a || m.sequence > a.sequence) && (a = m)));
    }
    const o = this.nodeGeneratingIntent.has(t),
      s = a ?? (o ? void 0 : r),
      l = s ? {
        taskId: s.taskId,
        status: s.status,
        progress: s.progress,
        errorMsg: s.errorMsg,
        activeCount: i
      } : o ? {
        taskId: null,
        status: "generating",
        progress: this.nodeProgressIntent.get(t) ?? 0,
        activeCount: Math.max(1, i)
      } : XEe,
      d = this.nodeSnapshots.get(t) ?? XEe;
    if (njr(d, l)) return;
    const u = d.status === "generating",
      h = l.status === "generating";
    l === XEe ? this.nodeSnapshots.delete(t) : this.nodeSnapshots.set(t, l), this.emit(this.nodeListeners, t), u !== h && this.bumpGlobalGenerating();
  }
}

const al = new s8n();

function l8n(e) {
  const t = String(e);
  return g.useSyncExternalStore(n => al.subscribeTask(t, n), () => al.getTaskSnapshot(t), () => al.getTaskSnapshot(t));
}

function E5e(e) {
  const t = String(e);
  return g.useSyncExternalStore(n => al.subscribeNode(t, n), () => al.getNodeSnapshot(t), () => al.getNodeSnapshot(t));
}

function o9(e) {
  const t = String(e);
  return g.useSyncExternalStore(n => al.subscribeNode(t, n), () => al.getNodeGeneratingSnapshot(t), () => al.getNodeGeneratingSnapshot(t));
}

function T5e() {
  return g.useSyncExternalStore(e => al.subscribeGlobalGenerating(e), () => al.getGlobalGeneratingVersion(), () => al.getGlobalGeneratingVersion());
}

const c8n = Object.freeze(Object.defineProperty({
    __proto__: null,
    TaskRuntimeStore: s8n,
    taskRuntimeStore: al,
    useGlobalGeneratingVersion: T5e,
    useNodeRuntimeGenerating: o9,
    useNodeRuntimeTask: E5e,
    useRuntimeTask: l8n
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  dWe = "qiaodoumayi_task_completion_notifications",
  VLe = new Set(),
  jmt = new Set(),
  rjr = {
    image: "图片生成",
    video: "视频生成",
    audio: "音频生成",
    "3d": "3D 生成"
  },
  ajr = {
    "image-wash": "质感增强",
    "image-upscale": "图像放大",
    "cutout-repair": "智能抠补",
    "local-edit": "局部修改",
    "dual-alpha": "黑白图抠图",
    "layer-split": "图层拆分",
    product: "产品图生成",
    relight: "重新打光",
    tile: "图片平铺",
    pattern: "图案工具",
    "storyboard-image": "分镜图片生成",
    "storyboard-video": "分镜视频生成"
  },
  Vet = (e, t) => typeof e == "string" ? e.replace(/\s+/g, " ").trim().slice(0, t) : "";

function d8n(e, t = Date.now(), n) {
  const r = n || e.studioTool && ajr[e.studioTool] || rjr[e.type] || "生成",
    a = Vet(e.modelName, 80) || "未记录模型",
    i = e.durationMs ?? (e.startTime && e.startTime <= t ? t - e.startTime : void 0),
    o = Vet(e.generationTime, 24) || TE(i),
    s = new Date(t).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !1
    });
  return {
    title: `${r}任务已完成`,
    body: `模型：${a} · 任务 #${Vet(e.id, 120).slice(-8)}`,
    detail: `${s} 完成${o ? ` · 用时 ${o}` : ""}`
  };
}

function hxe() {
  try {
    return localStorage.getItem(dWe) === "true";
  } catch {
    return !1;
  }
}

function ijr(e) {
  localStorage.setItem(dWe, String(e)), VLe.forEach(t => t());
}

function Fbe(e) {
  try {
    return localStorage.getItem(`${dWe}_${e}`) !== "false";
  } catch {
    return !0;
  }
}

function ojr(e, t) {
  localStorage.setItem(`${dWe}_${e}`, String(t)), VLe.forEach(n => n());
}

function BS(e, t) {
  const n = t.startTime ?? Date.now();
  let r = !1;
  return (a = []) => {
    var d, u;
    if (r || (r = !0, (d = t.signal) != null && d.aborted || !hxe() || !Fbe(e) || !us())) return;
    const i = [...new Set(a)],
      o = [],
      s = () => {
        var h;
        o.splice(0).forEach(p => p()), (h = t.signal) == null || h.removeEventListener("abort", s);
      },
      l = () => {
        var m;
        if ((m = t.signal) != null && m.aborted) {
          s();
          return;
        }
        if (i.map(f => al.getNodeSnapshot(f)).some((f, y) => f.status === "failed" || f.status === "idle" && !al.getNodeGeneratingSnapshot(i[y]))) {
          s();
          return;
        }
        if (i.some(f => al.getNodeGeneratingSnapshot(f))) return;
        s();
        const p = d8n({
          id: t.id,
          modelName: t.modelName || "",
          type: "image",
          startTime: n
        }, Date.now(), t.label);
        jmt.forEach(f => f(e, p));
      };
    i.length && o.push(al.subscribeTerminal(h => {
      h.status === "failed" && h.nodeId && i.includes(h.nodeId) && s();
    }));
    for (const h of i) o.push(al.subscribeNode(h, l));
    (u = t.signal) == null || u.addEventListener("abort", s, {
      once: !0
    }), l();
  };
}

function REt(e) {
  return VLe.add(e), () => {
    VLe.delete(e);
  };
}

async function u8n(e) {
  !hxe() || !us() || (await Fr("show_task_completion_notification", {
    notice: e ?? {
      title: "任务完成通知测试",
      body: "这里会显示使用的模型和任务编号",
      detail: `${new Date().toLocaleTimeString("zh-CN", {
        hour12: !1
      })} · 正式通知会显示完成时间与耗时`
    }
  }));
}

function sjr() {
  const e = [];
  let t;
  const n = () => {
      clearTimeout(t), t = void 0, e.length = 0;
    },
    r = REt(() => {
      if (!hxe()) n();else for (let o = e.length - 1; o >= 0; o--) Fbe(e[o].category) || e.splice(o, 1);
    }),
    a = (o, s) => {
      !hxe() || !Fbe(o) || !us() || (e.push({
        category: o,
        notice: s
      }), t === void 0 && (t = setTimeout(() => {
        const l = e.slice();
        n();
        for (const {
          category: d,
          notice: u
        } of l) Fbe(d) && u8n(u).catch(h => {
          console.warn("[TaskNotification] 系统通知发送失败", h);
        });
      }, 350)));
    };
  jmt.add(a);
  const i = al.subscribeTerminal((o, s) => {
    o.status === "completed" && a("generation", d8n(s ?? {
      id: o.taskId,
      type: "image",
      modelName: ""
    }));
  });
  return () => {
    i(), r(), jmt.delete(a), n();
  };
}

const ljr = [["generation", "API 生成"], ["analysis", "文字 / 视频分析"], ["agent", "Agent / 分镜"], ["chat", "对话"]];

function cjr({
  category: e,
  label: t
}) {
  const n = g.useSyncExternalStore(REt, () => Fbe(e), () => !0);
  return c.jsxs("div", {
    className: "flex items-center justify-between gap-4 py-1",
    children: [c.jsx("span", {
      className: "settings-pref-desc",
      children: x(t)
    }), c.jsx(Rj, {
      checked: n,
      label: x(t),
      onChange: r => {
        try {
          ojr(e, r);
        } catch {}
      }
    })]
  });
}

function djr() {
  on();
  const e = g.useSyncExternalStore(REt, hxe, () => !1),
    [t, n] = g.useState(!1),
    [aiyouNoticeStatus, aiyouSetNoticeStatus] = g.useState(""),
    r = us(),
    a = o => {
      try {
        ijr(o);
      } catch {}
    },
    i = async () => {
      n(!0); aiyouSetNoticeStatus("");
      try {
        await u8n();
        aiyouSetNoticeStatus("已请求系统显示通知；实际横幅由系统通知权限决定。");
      } catch (error) {
        aiyouSetNoticeStatus("通知请求失败：" + (error?.message || String(error)));
      } finally {
        n(!1);
      }
    };
  return c.jsx($u, {
    title: x("任务完成系统通知"),
    description: x(r ? "所选类型的任务完成后发送系统通知，显示任务、模型、完成时间与耗时。失败或取消不提醒。总开关默认关闭。" : "系统通知仅在桌面版提供。"),
    action: c.jsx(Rj, {
      checked: e,
      onChange: a,
      disabled: !r || t,
      label: x("任务完成系统通知")
    }),
    children: r && e ? c.jsxs("div", {
      className: "mt-3 flex flex-col items-start gap-2",
      children: [c.jsx("div", {
        className: "w-full",
        children: ljr.map(([o, s]) => c.jsx(cjr, {
          category: o,
          label: s
        }, o))
      }), c.jsx("button", {
        type: "button",
        className: "settings-pill-btn",
        disabled: t,
        onClick: () => {
          i();
        },
        children: x(t ? "正在发送…" : "发送测试通知")
      }), aiyouNoticeStatus && c.jsx("p", {role: "status", className: "text-xs text-zinc-400", children: aiyouNoticeStatus})]
    }) : null
  });
}

const ujr = ({
  followDownstreamOnDrag: e = !1,
  onFollowDownstreamOnDragToggle: t,
  showCanvasGrid: n = !0,
  onCanvasGridToggle: r,
  showCanvasSnap: a = !1,
  onCanvasSnapToggle: i,
  showCanvasMinimap: o = !0,
  onCanvasMinimapToggle: s,
  canvasGridSpacing: l = 20,
  onCanvasGridSpacingChange: d,
  canvasGridDotSize: u = .5,
  onCanvasGridDotSizeChange: h,
  showAlignmentGuides: p = !0,
  onAlignmentGuidesToggle: m,
  locateAnimationMaxNodes: f = 100,
  onLocateAnimationMaxNodesChange: y,
  showCanvasBgGlow: b = !1,
  onCanvasBgGlowToggle: v
}) => (on(), c.jsxs("div", {
  className: "space-y-7",
  children: [c.jsx(djr, {}), c.jsx(mS, {
    title: x("跟随"),
    description: x("拖动节点时，下游节点一起位移。"),
    checked: e,
    onToggle: t
  }), c.jsx(mS, {
    title: x("网格"),
    description: x("显示画布点阵网格。"),
    checked: n,
    onToggle: r
  }), c.jsx(Hae, {
    title: x("网格间隙"),
    description: x("点阵网格间距。"),
    min: WTn,
    max: qTn,
    step: 1,
    value: l,
    valueLabel: D7r(l),
    onChange: d
  }), c.jsx(Hae, {
    title: x("网格点"),
    description: x("网格圆点半径。"),
    min: KTn,
    max: QTn,
    step: "any",
    value: u,
    valueLabel: jWt(u),
    formatValue: jWt,
    onChange: h
  }), c.jsx(mS, {
    title: x("吸附"),
    description: x("拖动节点时对齐到吸附网格。"),
    checked: a,
    onToggle: i
  }), c.jsx(mS, {
    title: x("对齐辅助线"),
    description: x("吸附时显示对齐辅助线。关闭后仍吸附，只是不画线。"),
    checked: p,
    onToggle: m
  }), c.jsx(mS, {
    title: x("导航"),
    description: x("显示画布小地图。"),
    checked: o,
    onToggle: s
  }), c.jsx(mS, {
    title: x("背景光晕"),
    description: x("画布顶部一层很淡的氛围光。默认关闭，几乎不占性能。"),
    checked: b,
    onToggle: v
  }), c.jsx(Hae, {
    title: x("定位动画上限"),
    description: x("节点数超过该值时，定位改为瞬时跳转，避免大画布补间掉帧。"),
    min: YTn,
    max: XTn,
    step: Nmt,
    value: f,
    valueLabel: DWt(f),
    formatValue: DWt,
    onChange: y
  })]
}));

class hjr {
  constructor() {
    On(this, "pool", []);
    On(this, "maxSize", 1e3);
  }
  acquire(t, n) {
    const r = this.pool.pop();
    return r ? (r.x = t, r.y = n, r) : {
      x: t,
      y: n
    };
  }
  release(t) {
    this.pool.length < this.maxSize && this.pool.push(t);
  }
  releaseMany(t) {
    t.forEach(n => this.release(n));
  }
  clear() {
    this.pool = [];
  }
  getStats() {
    return {
      poolSize: this.pool.length,
      maxSize: this.maxSize
    };
  }
}

class pjr {
  constructor() {
    On(this, "pool", []);
    On(this, "maxSize", 500);
  }
  acquire(t, n, r, a) {
    const i = this.pool.pop();
    return i ? (i.x = t, i.y = n, i.width = r, i.height = a, i) : {
      x: t,
      y: n,
      width: r,
      height: a
    };
  }
  release(t) {
    this.pool.length < this.maxSize && this.pool.push(t);
  }
  clear() {
    this.pool = [];
  }
  getStats() {
    return {
      poolSize: this.pool.length,
      maxSize: this.maxSize
    };
  }
}

class mjr {
  constructor() {
    On(this, "cache", new Map());
    On(this, "accessOrder", []);
    On(this, "maxSize", 1e3);
  }
  get(t) {
    const n = this.cache.get(t);
    if (n !== void 0) {
      const r = this.accessOrder.indexOf(t);
      r > -1 && this.accessOrder.splice(r, 1), this.accessOrder.push(t);
    }
    return n;
  }
  set(t, n) {
    if (this.cache.has(t)) {
      const r = this.accessOrder.indexOf(t);
      r > -1 && this.accessOrder.splice(r, 1), this.accessOrder.push(t), this.cache.set(t, n);
      return;
    }
    if (this.cache.size >= this.maxSize) {
      const r = this.accessOrder.shift();
      r && this.cache.delete(r);
    }
    this.cache.set(t, n), this.accessOrder.push(t);
  }
  clear() {
    this.cache.clear(), this.accessOrder = [];
  }
  getStats() {
    return {
      cacheSize: this.cache.size,
      maxSize: this.maxSize
    };
  }
}

class fjr {
  constructor(t = 1e3) {
    On(this, "positions");
    On(this, "nodeIdMap", new Map());
    On(this, "nextIndex", 0);
    On(this, "capacity");
    this.capacity = t, this.positions = new Float32Array(t * 4);
  }
  setPosition(t, n, r, a, i) {
    let o = this.nodeIdMap.get(t);
    o === void 0 && (this.nextIndex >= this.capacity && this.expand(), o = this.nextIndex++, this.nodeIdMap.set(t, o));
    const s = o * 4;
    this.positions[s] = n, this.positions[s + 1] = r, this.positions[s + 2] = a, this.positions[s + 3] = i;
  }
  getPosition(t) {
    const n = this.nodeIdMap.get(t);
    if (n === void 0) return null;
    const r = n * 4;
    return {
      x: this.positions[r],
      y: this.positions[r + 1],
      width: this.positions[r + 2],
      height: this.positions[r + 3]
    };
  }
  removeNode(t) {
    this.nodeIdMap.delete(t);
  }
  expand() {
    const t = this.capacity * 2,
      n = new Float32Array(t * 4);
    n.set(this.positions), this.positions = n, this.capacity = t, console.log(`[NodePositionArray] Expanded to ${t} nodes`);
  }
  clear() {
    this.nodeIdMap.clear(), this.nextIndex = 0, this.positions.fill(0);
  }
  getStats() {
    return {
      nodeCount: this.nodeIdMap.size,
      capacity: this.capacity,
      memoryUsage: this.positions.byteLength
    };
  }
}

const gjr = new hjr(),
  yjr = new pjr(),
  HLe = new mjr(),
  bjr = new fjr();

typeof window < "u" && (window.objectPools = {
  position: gjr,
  boundingBox: yjr,
  pathString: HLe,
  nodePosition: bjr
});

const vjr = 4,
  wjr = .5,
  xjr = 0,
  _jr = .25;

function h8n(e) {
  return Number.isFinite(e) ? e >= 0 ? Math.max(e * wjr, xjr) : _jr * 25 * Math.sqrt(-e) : 0;
}

function NEt(e) {
  const t = Number.isFinite(e) && e > 0 ? e : 1;
  return vjr / t;
}

function jEt(e) {
  const t = new Map();
  for (const n of e) t.set(n.to, (t.get(n.to) ?? 0) + 1);
  return t;
}

function DEt(e) {
  const t = new Map();
  for (const n of e) t.set(n.from, (t.get(n.from) ?? 0) + 1);
  return t;
}

function LEt(e) {
  const t = new Map();
  for (const r of e) {
    let a = t.get(r.from);
    a || (a = new Set(), t.set(r.from, a)), a.add(r.to);
  }
  const n = new Map();
  return t.forEach((r, a) => {
    n.set(a, r.size);
  }), n;
}

function p8n(e, t, n, r) {
  if ((n == null ? void 0 : n.forceStraightLine) === !1) return !1;
  if ((n == null ? void 0 : n.forceStraightLine) === !0) return !0;
  if (!r) return !1;
  const a = qE();
  return a.size === 0 || !a.has(r.from) && !a.has(r.to) ? !1 : a.size > 1;
}

function kjr(e) {
  const t = qE();
  return t.size === 0 ? !1 : !t.has(e.from) && !t.has(e.to);
}

function m8n(e, t, n, r) {
  return `M ${e} ${t} L ${n} ${r}`;
}

function OEt(e, t, n, r, a = !1) {
  const i = h8n(n - e);
  return a ? `M ${e} ${t} C ${e - i} ${t}, ${n + i} ${r}, ${n} ${r}` : `M ${e} ${t} C ${e + i} ${t}, ${n - i} ${r}, ${n} ${r}`;
}

function f8n(e, t, n, r, a) {
  a == null || a.zoom, a == null || a.connectionCount, a == null || a.sourceDistinctOutgoingTargets;
  const i = a != null && a.fromNodeId && (a != null && a.toNodeId) ? {
    from: a.fromNodeId,
    to: a.toNodeId
  } : void 0;
  if ((a == null ? void 0 : a.forceStraightLine) ?? p8n((a == null ? void 0 : a.targetIncomingCount) ?? 1, (a == null ? void 0 : a.sourceOutgoingCount) ?? 1, {
    forceStraightLine: a == null ? void 0 : a.forceStraightLine
  }, i)) return {
    pathD: m8n(e, t, n, r),
    x0: e,
    y0: t,
    x1: e,
    y1: t,
    x2: n,
    y2: r,
    x3: n,
    y3: r
  };
  const s = (a == null ? void 0 : a.isReverse) ?? !1,
    l = h8n(n - e),
    d = s ? e - l : e + l,
    u = s ? n + l : n - l;
  return {
    pathD: OEt(e, t, n, r, s),
    x0: e,
    y0: t,
    x1: d,
    y1: t,
    x2: u,
    y2: r,
    x3: n,
    y3: r
  };
}

function uWe(e, t, n, r, a) {
  return f8n(e, t, n, r, a).pathD;
}

const M5e = new Map();

