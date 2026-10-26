async function Smo(e) {
  var n, r;
  const t = await xmo(e.url);
  try {
    lwe(e.signal);
    const a = Number.isFinite(t.duration) ? t.duration : 0,
      i = 16,
      o = Math.max(1, Math.round((a || 1 / i) * i)),
      {
        mime: s,
        ext: l
      } = vmo(),
      d = t.videoWidth,
      u = t.videoHeight,
      h = document.createElement("canvas");
    h.width = d, h.height = u;
    const p = h.getContext("2d");
    if (!p) throw new Error("无法创建画布");
    const m = h.captureStream(i),
      f = m.getVideoTracks()[0],
      y = [],
      b = typeof MediaRecorder < "u" && s ? new MediaRecorder(m, {
        mimeType: s,
        videoBitsPerSecond: 6e6
      }) : null;
    if (!b) throw new Error("当前浏览器无法编码调色视频");
    b.ondataavailable = S => {
      var C;
      (C = S.data) != null && C.size && y.push(S.data);
    };
    const v = new Promise((S, C) => {
      b.onstop = () => S(), b.onerror = () => C(new Error("视频调色编码失败"));
    });
    b.start();
    const _ = performance.now(),
      w = Math.max(1e3 / i, (a || 1 / i) * 1e3);
    for (let S = 0; S < o; S++) {
      lwe(e.signal);
      const C = o <= 1 ? 0 : S / Math.max(1, o - 1) * Math.max(0, a - .001);
      await wmo(t, C), p.drawImage(t, 0, 0, d, u);
      const I = h.toDataURL("image/jpeg", .9),
        E = await XUt(I, e.state, e.customLut, Math.max(d, u)),
        M = await Imo(E);
      p.drawImage(M, 0, 0, d, u), (n = f == null ? void 0 : f.requestFrame) == null || n.call(f);
      const P = _ + (S + 1) / o * w - performance.now();
      P > 1 && (await Tgn(P)), (r = e.onProgress) == null || r.call(e, {
        percent: Math.round(12 + (S + 1) / o * 78),
        text: `正在调色视频... ${S + 1}/${o}`
      });
    }
    const k = _ + w - performance.now();
    k > 1 && (await Tgn(k)), b.stop(), await v;
    const A = new Blob(y, {
      type: b.mimeType || s || "video/webm"
    });
    if (!A.size) throw new Error("调色结果为空");
    return {
      blob: A,
      fileName: `lut_graded_video.${l}`,
      width: d,
      height: u
    };
  } finally {
    t.removeAttribute("src"), t.load(), t.remove();
  }
}

function Imo(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => t(r), r.onerror = () => n(new Error("调色帧解码失败")), r.src = e;
  });
}

async function Cmo(e) {
  var a, i, o;
  const t = await yG(e.sourceNode, e.videoUrl),
    {
      url: n,
      revoke: r
    } = t.url ? t : await Yk(e.videoUrl);
  try {
    (a = e.onProgress) == null || a.call(e, {
      percent: 8,
      text: "正在读取源视频..."
    });
    const s = await Amo({
      url: n,
      sourceNode: e.sourceNode,
      state: e.state,
      customLut: e.customLut,
      signal: e.signal,
      onProgress: e.onProgress
    });
    if (s) return (i = e.onProgress) == null || i.call(e, {
      percent: 94,
      text: "正在保存调色视频..."
    }), {
      blob: s.blob,
      width: e.width || 0,
      height: e.height || 0,
      fileName: s.fileName
    };
    const l = await Smo({
      url: n,
      state: e.state,
      customLut: e.customLut,
      signal: e.signal,
      onProgress: e.onProgress
    });
    return (o = e.onProgress) == null || o.call(e, {
      percent: 94,
      text: "正在保存调色视频..."
    }), l;
  } finally {
    r == null || r();
  }
}

async function Emo(e) {
  const t = await Ope(e.blob, {
    sourceNodeId: e.sourceNode.id,
    width: e.width,
    height: e.height,
    fileName: e.fileName,
    source: "video_lut",
    assetPrefix: "video_lut",
    extraSettings: {
      lutColor: e.state,
      sourceNodeId: e.sourceNode.id
    }
  });
  return Bpe({
    sourceNode: e.sourceNode,
    persisted: t,
    width: e.width,
    height: e.height,
    nodes: e.nodes,
    generateId: e.generateId,
    setNodes: e.setNodes,
    setSelectedNodeId: e.setSelectedNodeId,
    nodeName: "LUT调色视频"
  });
}

const Tmo = {
  preserveOriginal: !0,
  quality: .92
};

async function Mmo(e) {
  const t = String(e || "").trim();
  if (!t) return [];
  const {
    url: n,
    revoke: r
  } = await Yk(t);
  try {
    const a = await Pmo(n),
      i = a > .2 ? a * .5 : 0,
      o = await Gz(n, i, Tmo);
    return o ? [o] : [];
  } finally {
    r == null || r();
  }
}

function Pmo(e) {
  return new Promise(t => {
    const n = document.createElement("video");
    n.muted = !0, n.playsInline = !0, n.preload = "metadata";
    const r = i => {
        n.removeAttribute("src");
        try {
          n.load();
        } catch {}
        n.remove(), t(i);
      },
      a = window.setTimeout(() => r(0), 8e3);
    n.onloadedmetadata = () => {
      window.clearTimeout(a), r(Number.isFinite(n.duration) ? n.duration : 0);
    }, n.onerror = () => {
      window.clearTimeout(a), r(0);
    }, n.src = e;
  });
}

function sbr(e) {
  const [t, n] = g.useState([]),
    [r, a] = g.useState(!1);
  g.useEffect(() => {
    if (!e.enabled) {
      n([]), a(!1);
      return;
    }
    const o = String(e.videoUrl || "").trim();
    if (!o) {
      n([]), a(!1);
      return;
    }
    let s = !1;
    return a(!0), Mmo(o).then(l => {
      s || n(l);
    }).catch(l => {
      s || (console.warn("[videoLut] 预览帧提取失败:", l), n([]));
    }).finally(() => {
      s || a(!1);
    }), () => {
      s = !0;
    };
  }, [e.enabled, e.videoUrl, e.sourceNode.id]);
  const i = g.useCallback(async (o, s) => {
    var l;
    if (!e.generateId || !e.setNodes) throw new Error("当前画布无法创建调色结果节点");
    try {
      Ai("info", "正在对视频应用 LUT 调色…");
      const d = await Cmo({
        videoUrl: e.videoUrl,
        sourceNode: e.sourceNode,
        state: o,
        customLut: s,
        onProgress: u => {
          (u.percent === 28 || u.percent === 88 || u.percent >= 94) && Ai("info", u.text);
        }
      });
      await Emo({
        blob: d.blob,
        fileName: d.fileName,
        width: d.width,
        height: d.height,
        sourceNode: e.sourceNode,
        state: o,
        nodes: e.nodes,
        generateId: e.generateId,
        setNodes: e.setNodes,
        setSelectedNodeId: e.setSelectedNodeId
      }), Ai("success", "已生成 LUT 调色视频"), (l = e.onApplied) == null || l.call(e);
    } catch (d) {
      if (!!!(d != null && d.cancelled)) {
        const h = d instanceof Error ? d.message : "视频 LUT 调色失败";
        Ai("error", h);
      }
      throw d;
    }
  }, [e.videoUrl, e.sourceNode, e.nodes, e.generateId, e.setNodes, e.setSelectedNodeId, e.onApplied]);
  return {
    urls: t,
    loading: r,
    apply: i
  };
}

function Rmo({
  node: e,
  updateNode: t,
  setNodes: n,
  generateId: r,
  liveDisplayUrl: a,
  liveVideoUrl: i = "",
  isVideoNode: o = !1,
  nodes: s,
  setSelectedNodeId: l,
  onOpenTool: d
}) {
  var V, O, L, D, U, H;
  const [u, h] = g.useState(!1),
    [p, m] = g.useState(!1),
    [f, y] = g.useState(!1),
    [b, v] = g.useState(""),
    [_, w] = g.useState(!1),
    k = g.useRef(null),
    A = u || p || f,
    S = String(((V = e.settings) == null ? void 0 : V.colorAdjustOriginal) || "").trim(),
    C = String(((O = e.settings) == null ? void 0 : O.lutColorOriginal) || "").trim();
  g.useEffect(() => {
    const K = !!(e.settings || {}).gradeToolActive;
    A && !K ? t(e.id, {
      settings: {
        ...e.settings,
        gradeToolActive: !0,
        suppressHoverUi: !0
      }
    }) : !A && K && t(e.id, {
      settings: {
        ...e.settings,
        gradeToolActive: void 0,
        suppressHoverUi: void 0
      }
    });
  }, [A, e.id]), g.useEffect(() => () => {
    if (k.current) {
      try {
        URL.revokeObjectURL(k.current);
      } catch {}
      k.current = null;
    }
  }, []), g.useEffect(() => {
    if (!A || o) {
      if (v(""), w(!1), k.current) {
        try {
          URL.revokeObjectURL(k.current);
        } catch {}
        k.current = null;
      }
      return;
    }
    const Y = p && C || S || C || "",
      K = Zo(e),
      W = typeof K == "string" && K.trim() && !/\/thumbnails\//i.test(K) ? K.trim() : "",
      Q = Y || W || a || "";
    Q ? (v(Q), w(!Y && !W)) : w(!0);
    let q = !1;
    return (async () => {
      try {
        if (Y && !/\/thumbnails\//i.test(Y)) {
          q || (v(Y), w(!1));
          return;
        }
        if (W) {
          q || (v(W), w(!1));
          return;
        }
        const ne = await OJ(e, a);
        if (q) return;
        const de = String(ne.url || "").trim();
        if (!de) return;
        if (de.startsWith("blob:") && de !== a) {
          if (k.current && k.current !== de) try {
            URL.revokeObjectURL(k.current);
          } catch {}
          k.current = de;
        }
        v(de);
      } catch {
        !q && Q && v(Q);
      } finally {
        q || w(!1);
      }
    })(), () => {
      q = !0;
    };
  }, [A, o, p, e, a, S, C]);
  const I = g.useCallback(() => {
      h(!1), m(!1), y(!1);
    }, []),
    E = g.useCallback(() => {
      u ? h(!1) : (d("colorAdjust"), m(!1), y(!1), h(!0));
    }, [u, d]),
    M = g.useCallback(() => {
      p ? m(!1) : (d("lut"), h(!1), y(!1), m(!0));
    }, [p, d]),
    T = g.useCallback(() => {
      f ? y(!1) : (d("panorama"), h(!1), m(!1), y(!0));
    }, [f, d]),
    P = g.useCallback(() => {
      const Y = Zo(e);
      return typeof Y == "string" && Y.trim() && !/\/thumbnails\//i.test(Y) ? Y.trim() : b || S || C || a || (typeof e.content == "string" ? e.content.trim() : "") || "";
    }, [e, b, S, C, a]),
    R = g.useCallback(async Y => {
      var Q;
      let K = Y.resultDataUrl;
      try {
        K = await Er.storeImageUrlAsRef(Y.resultDataUrl);
      } catch {}
      const W = {
        ...(e.settings || {}),
        ...Y.patchSettings,
        mediaRevision: (Number((Q = e.settings) == null ? void 0 : Q.mediaRevision) || 0) + 1,
        [_i]: void 0,
        [Pi]: void 0,
        generatedImages: void 0,
        previewMjImages: void 0,
        mjImages: void 0,
        batchImages: void 0
      };
      Y.persistedAssetId && (W._localCacheAssetId = Y.persistedAssetId, W._assetId = Y.persistedAssetId, W._contentAssetId = Y.persistedAssetId, Y.displayUrl && (W._blobUrl = Y.displayUrl)), t(e.id, {
        content: K,
        settings: W
      });
    }, [e.id, e.settings, t]),
    j = g.useCallback(async (Y, K) => {
      const W = await Ryr(e.id, K),
        Q = P();
      await R({
        resultDataUrl: K,
        persistedAssetId: W == null ? void 0 : W.assetId,
        displayUrl: W == null ? void 0 : W.displayUrl,
        patchSettings: {
          colorAdjust: void 0,
          colorAdjustOriginal: Q || void 0,
          colorAdjustHideCompare: !0,
          colorAdjustDraft: void 0,
          colorAdjustLocalAssetId: W == null ? void 0 : W.assetId,
          lutColor: void 0,
          lutColorOriginal: void 0,
          lutColorDraft: void 0,
          lutColorLocalAssetId: void 0
        }
      }), h(!1);
    }, [e.id, P, R]),
    B = sbr({
      enabled: o && p,
      videoUrl: i || a,
      sourceNode: e,
      nodes: s,
      generateId: r,
      setNodes: n,
      setSelectedNodeId: l,
      onApplied: () => m(!1)
    }),
    F = g.useCallback(async (Y, K) => {
      const W = await Nyr(e.id, K),
        Q = (W == null ? void 0 : W.displayUrl) ?? K;
      try {
        await Wd.storeWithThumbnails(e.id, Q);
      } catch {}
      const q = P();
      await R({
        resultDataUrl: K,
        persistedAssetId: W == null ? void 0 : W.assetId,
        displayUrl: W == null ? void 0 : W.displayUrl,
        patchSettings: {
          lutColor: Y,
          lutColorOriginal: q || void 0,
          lutColorDraft: void 0,
          lutColorLocalAssetId: W == null ? void 0 : W.assetId,
          colorAdjust: void 0,
          colorAdjustOriginal: void 0,
          colorAdjustHideCompare: void 0,
          colorAdjustDraft: void 0,
          colorAdjustLocalAssetId: void 0
        }
      }), m(!1);
    }, [e.id, P, R]),
    N = g.useCallback(async (Y, K, W) => {
      if (!n) return;
      const Q = e.nodeName || "绘画",
        q = await Dyr({
          dataUrl: Y,
          pixelW: K,
          pixelH: W,
          nodeName: `${Q}-全景截图`,
          baseX: e.x + e.width + 20,
          baseY: e.y,
          sourceNodeId: e.id,
          generateId: r
        });
      n(ne => [...ne, q]), Ai("success", "已导出当前视角并创建图片节点", 5e3);
    }, [n, e.nodeName, e.x, e.y, e.width, e.id, r]),
    G = g.useMemo(() => {
      var K, W;
      if (o) return B.urls;
      const Y = ((W = (K = e.settings) == null ? void 0 : K.lutPreviewUrls) == null ? void 0 : W.filter(Boolean)) ?? [];
      return Y.length ? Y.slice(0, 1) : b ? [b] : [];
    }, [o, B.urls, e.settings, b]),
    z = g.useCallback((Y, K) => B.apply(Y, K), [B.apply]);
  return {
    isColorAdjustPanelOpen: u,
    setIsColorAdjustPanelOpen: h,
    isLutColorPanelOpen: p,
    setIsLutColorPanelOpen: m,
    isPanoramaPanelOpen: f,
    setIsPanoramaPanelOpen: y,
    anyGradeToolOpen: A,
    gradeSourceUrl: b,
    gradeSourceLoading: _,
    lutPreviewImageUrls: G,
    lutVideoPreviewLoading: B.loading,
    handleLutApplyVideo: z,
    closeAllGradeTools: I,
    toggleColorAdjust: E,
    toggleLut: M,
    togglePanorama: T,
    handleColorAdjustApply: j,
    handleLutApply: F,
    handlePanoramaExport: N,
    colorAdjustSavedParams: ((L = e.settings) == null ? void 0 : L.colorAdjustDraft) ?? ((D = e.settings) == null ? void 0 : D.colorAdjust) ?? {},
    lutSavedState: ((U = e.settings) == null ? void 0 : U.lutColorDraft) ?? ((H = e.settings) == null ? void 0 : H.lutColor)
  };
}

const Nmo = [{
  rows: 1,
  cols: 2,
  label: "1×2"
}, {
  rows: 2,
  cols: 1,
  label: "2×1"
}, {
  rows: 2,
  cols: 2,
  label: "2×2"
}, {
  rows: 2,
  cols: 3,
  label: "2×3"
}, {
  rows: 3,
  cols: 2,
  label: "3×2"
}, {
  rows: 3,
  cols: 3,
  label: "3×3"
}];

function Mgn(e) {
  return Math.max(0, Math.min(20, Math.round(e)));
}

function jmo(e) {
  return Math.max(0, Math.min(240, Math.round(e)));
}

function lbr(e, t, n, r, a) {
  const i = n + 1,
    o = r + 1,
    s = a / 2,
    l = [];
  for (let d = 0; d < i; d++) {
    const u = d * t / i,
      h = (d + 1) * t / i,
      p = Math.round(d === 0 ? 0 : u + s),
      m = Math.round(d === i - 1 ? t : h - s);
    for (let f = 0; f < o; f++) {
      const y = f * e / o,
        b = (f + 1) * e / o,
        v = Math.round(f === 0 ? 0 : y + s),
        _ = Math.round(f === o - 1 ? e : b - s);
      _ > v && m > p && l.push({
        row: d,
        col: f,
        x: v,
        y: p,
        w: _ - v,
        h: m - p
      });
    }
  }
  return l;
}

function Dmo(e, t, n, r) {
  const a = r / 2,
    i = [...new Set(n.filter(u => u.type === "h").map(u => u.pos * t))].sort((u, h) => u - h),
    o = [...new Set(n.filter(u => u.type === "v").map(u => u.pos * e))].sort((u, h) => u - h),
    s = [0, ...i, t],
    l = [0, ...o, e],
    d = [];
  for (let u = 0; u < s.length - 1; u++) for (let h = 0; h < l.length - 1; h++) {
    const p = Math.round(u === 0 ? s[u] : s[u] + a),
      m = Math.round(u === s.length - 2 ? s[u + 1] : s[u + 1] - a),
      f = Math.round(h === 0 ? l[h] : l[h] + a),
      y = Math.round(h === l.length - 2 ? l[h + 1] : l[h + 1] - a);
    y > f && m > p && d.push({
      row: u,
      col: h,
      x: f,
      y: p,
      w: y - f,
      h: m - p
    });
  }
  return d;
}

function cbr(e) {
  return e.map(t => ({
    x: t.x,
    y: t.y,
    w: t.w,
    h: t.h
  }));
}

function Lmo(e, t, n, r) {
  if (e) {
    const a = r.filter(o => o.type === "h").length,
      i = r.filter(o => o.type === "v").length;
    return Math.max(0, (a + 1) * (i + 1));
  }
  return (t + 1) * (n + 1);
}

function Omo(e) {
  if (!e) return [];
  const t = e.settings || {};
  return [t._localCacheAssetId, t._contentAssetId, t._assetId, t._selectedImageAssetId, e._contentAssetId].map(n => String(n || "").trim()).filter(Boolean);
}

async function Bmo(e, t) {
  var r, a;
  if (!(typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window))) return null;
  try {
    const {
        isCanvasLocalCacheMode: i
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: p
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: p
        };
      }, void 0, import.meta.url),
      {
        isGlobalOssUploadEnabled: o
      } = await Ie(async () => {
        const {
          isGlobalOssUploadEnabled: p
        } = await Promise.resolve().then(() => ii);
        return {
          isGlobalOssUploadEnabled: p
        };
      }, void 0, import.meta.url);
    if (!i() || o()) return null;
    const {
      localCacheManager: s,
      ensureCacheRootReadyForWrite: l
    } = await Ie(async () => {
      const {
        localCacheManager: p,
        ensureCacheRootReadyForWrite: m
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: p,
        ensureCacheRootReadyForWrite: m
      };
    }, void 0, import.meta.url);
    await l(), await s.ensureRestored();
    const d = (r = s.getDirectoryPathTauri()) == null ? void 0 : r.trim();
    if (!d || !s.isAvailable()) return null;
    const u = async p => {
      const m = String(p || "").trim();
      if (!m || !s.hasAsset(m)) return null;
      const f = s.getAssetManifestMeta(m),
        y = String((f == null ? void 0 : f.fileName) || "").trim().replace(/\\/g, "/");
      return !y || /\/thumbnails\//i.test(y) ? null : {
        cacheRoot: d,
        relativePath: y,
        sourceAssetId: m
      };
    };
    for (const p of Omo(t)) {
      const m = await u(p);
      if (m) return m;
    }
    const h = String(e || "").trim();
    if (h && (h.includes("asset.localhost") || /asset\.localhost/i.test(h) || h.includes("/images/"))) try {
      const m = ((a = decodeURIComponent(h).split(/[/\\]/).pop()) == null ? void 0 : a.split("?")[0]) || "";
      if (m) {
        const f = s.manifest,
          y = (f == null ? void 0 : f.assets) || {};
        for (const [b, v] of Object.entries(y)) {
          const _ = String((v == null ? void 0 : v.fileName) || "").replace(/\\/g, "/");
          if ((_.endsWith(`/${m}`) || _ === m || _.endsWith(m)) && !/\/thumbnails\//i.test(_)) return {
            cacheRoot: d,
            relativePath: _,
            sourceAssetId: b
          };
        }
      }
    } catch {}
    if (/^https?:\/\//i.test(h) && !h.includes("asset.localhost")) {
      const p = `crop_src_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      try {
        const {
            invoke: m
          } = await Ie(async () => {
            const {
              invoke: y
            } = await Promise.resolve().then(() => sd);
            return {
              invoke: y
            };
          }, void 0, import.meta.url),
          f = await m("download_url_to_local_asset", {
            args: {
              url: h,
              assetId: p,
              cacheRoot: d,
              fileNameHint: `crop_src_${p}.png`
            }
          });
        if (f != null && f.relativePath) return await s.registerExistingAsset({
          assetId: f.assetId || p,
          relativePath: f.relativePath,
          mimeType: f.mimeType,
          size: f.size,
          remoteUrl: f.remoteUrl || h,
          absolutePath: f.absolutePath
        }), {
          cacheRoot: d,
          relativePath: f.relativePath.replace(/\\/g, "/"),
          sourceAssetId: f.assetId || p
        };
      } catch (m) {
        console.warn("[native crop] 远程原图直写失败:", m);
      }
    }
    return null;
  } catch (i) {
    return console.warn("[native crop] 解析本地源失败:", i), null;
  }
}

async function dbr(e) {
  var i;
  const t = (e.regions || []).filter(o => o && o.w > 0 && o.h > 0);
  if (!t.length) return null;
  const n = await Bmo(e.imageUrl, e.sourceNode);
  if (!n) return null;
  const r = String(e.idPrefix || "").trim() || `crop_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    a = t.map((o, s) => `${r}_${s}`);
  try {
    const {
        invoke: o
      } = await Ie(async () => {
        const {
          invoke: h
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: h
        };
      }, void 0, import.meta.url),
      {
        localCacheManager: s
      } = await Ie(async () => {
        const {
          localCacheManager: h
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: h
        };
      }, void 0, import.meta.url),
      l = await o("crop_local_asset_image_regions", {
        args: {
          cacheRoot: n.cacheRoot,
          sourceRelativePath: n.relativePath,
          regions: t.map(h => ({
            x: Math.max(0, Math.round(h.x)),
            y: Math.max(0, Math.round(h.y)),
            w: Math.max(1, Math.round(h.w)),
            h: Math.max(1, Math.round(h.h))
          })),
          splitAssetIds: a,
          previewMaxDim: wm,
          preferFfmpeg: e.preferFfmpeg !== !1
        }
      });
    if (!((i = l == null ? void 0 : l.slots) != null && i.length) || l.slots.length !== t.length) return null;
    const d = [],
      u = [];
    for (let h = 0; h < l.slots.length; h++) {
      h > 0 && (await Id());
      const p = l.slots[h],
        m = p.assetId || a[h];
      await s.registerExistingAsset({
        assetId: m,
        relativePath: p.relativePath,
        mimeType: p.mimeType || "image/png",
        size: p.size,
        absolutePath: p.absolutePath
      }), p.previewRelativePath && (await s.registerExistingAsset({
        assetId: p.previewAssetId || `preview_${m}`,
        relativePath: p.previewRelativePath,
        mimeType: "image/jpeg",
        size: p.previewSize,
        absolutePath: p.previewAbsolutePath
      }));
      const f = (await s.getConvertFileSrcForAsset(p.previewAssetId || `preview_${m}`)) || (await s.getConvertFileSrcForAsset(m)) || "";
      f && Il(f, m);
      const y = Math.max(1, Number(p.width) || t[h].w),
        b = Math.max(1, Number(p.height) || t[h].h);
      d.push({
        url: f,
        width: y,
        height: b
      }), u.push({
        url: f,
        width: y,
        height: b,
        assetId: m
      });
    }
    return console.info("[native crop] 区域裁切完成", {
      engine: l.engine,
      count: d.length,
      sourceAssetId: n.sourceAssetId
    }), {
      images: d,
      preparedLocal: u,
      engine: l.engine || "ffmpeg"
    };
  } catch (o) {
    return console.warn("[native crop] Rust/ffmpeg 区域裁切失败，将回退 Canvas:", o), null;
  }
}

function Fmo(e, t) {
  const n = String(e || "").trim();
  if (/^https?:\/\//i.test(n) && !/asset\.localhost/i.test(n)) return n;
  const r = (t == null ? void 0 : t.settings) || {};
  return [r._ossRemoteUrl, r.originalUrl, r._remoteUrl, typeof (t == null ? void 0 : t.content) == "string" ? t.content : ""].map(i => String(i || "").trim()).filter(i => /^https?:\/\//i.test(i) && !/asset\.localhost/i.test(i))[0] || "";
}

async function ubr(e) {
  var n, r, a;
  if (!(typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window))) return null;
  try {
    const {
      isGlobalOssUploadEnabled: i
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: m
      } = await Promise.resolve().then(() => ii);
      return {
        isGlobalOssUploadEnabled: m
      };
    }, void 0, import.meta.url);
    if (!i()) return null;
    const o = !!e.auto2x2,
      s = (e.regions || []).filter(m => m && m.w > 0 && m.h > 0);
    if (!o && !s.length) return null;
    const l = Fmo(e.imageUrl, e.sourceNode);
    if (!l) return console.warn("[native crop OSS] 无可用 HTTPS 原图，跳过本机切图"), null;
    const {
        invoke: d
      } = await Ie(async () => {
        const {
          invoke: m
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: m
        };
      }, void 0, import.meta.url),
      u = await d("crop_image_regions_temp", {
        args: {
          sourceUrl: l,
          regions: o ? [] : s.map(m => ({
            x: Math.max(0, Math.round(m.x)),
            y: Math.max(0, Math.round(m.y)),
            w: Math.max(1, Math.round(m.w)),
            h: Math.max(1, Math.round(m.h))
          })),
          auto2x2: o,
          previewMaxDim: wm,
          preferFfmpeg: e.preferFfmpeg !== !1
        }
      });
    if (!((n = u == null ? void 0 : u.slots) != null && n.length) || !o && u.slots.length !== s.length) return null;
    const {
        readFileAsBlob: h
      } = await Ie(async () => {
        const {
          readFileAsBlob: m
        } = await Promise.resolve().then(() => hg);
        return {
          readFileAsBlob: m
        };
      }, void 0, import.meta.url),
      p = [];
    try {
      for (let m = 0; m < u.slots.length; m++) {
        m > 0 && (await Id());
        const f = u.slots[m],
          y = await h(f.absolutePath);
        if (!(y != null && y.size)) throw new Error(`空切片文件 [${m}]`);
        const b = URL.createObjectURL(y);
        p.push({
          url: b,
          width: Math.max(1, Number(f.width) || ((r = s[m]) == null ? void 0 : r.w) || 1),
          height: Math.max(1, Number(f.height) || ((a = s[m]) == null ? void 0 : a.h) || 1)
        });
      }
    } catch (m) {
      for (const f of p) try {
        f.url.startsWith("blob:") && URL.revokeObjectURL(f.url);
      } catch {}
      throw m;
    } finally {
      try {
        await d("cleanup_crop_work_dir", {
          workDir: u.workDir
        });
      } catch {}
    }
    return console.info("[native crop OSS] 本机切图完成，待上传", {
      engine: u.engine,
      count: p.length
    }), {
      images: p,
      engine: u.engine || "ffmpeg"
    };
  } catch (i) {
    return console.warn("[native crop OSS] 本机切图失败，将回退 Canvas:", i), null;
  }
}

const zmo = Object.freeze(Object.defineProperty({
  __proto__: null,
  tryCropRegionsNativeForOssUpload: ubr,
  tryCropRegionsViaLocalNative: dbr
}, Symbol.toStringTag, {
  value: "Module"
}));

function hbr(e) {
  var n;
  let t = (n = e == null ? void 0 : e.nodeName) == null ? void 0 : n.trim();
  return (!t || t === "未命名节点") && (t = (e != null && e.prompt && typeof e.prompt == "string" ? e.prompt : "").replace(/\.[^/.]+$/, "").trim()), t || "图片";
}

function pbr() {
  return new Promise(e => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => e());
    });
  });
}

async function mbr(e) {
  var r, a;
  try {
    const {
      isGlobalOssUploadEnabled: i
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: o
      } = await Promise.resolve().then(() => ii);
      return {
        isGlobalOssUploadEnabled: o
      };
    }, void 0, import.meta.url);
    if (i()) {
      const o = await ubr({
        imageUrl: e.splitUrl,
        regions: e.regions,
        sourceNode: e.sourceNode,
        preferFfmpeg: !0
      });
      if ((r = o == null ? void 0 : o.images) != null && r.length) return {
        images: o.images,
        preparedLocal: null
      };
    }
  } catch (i) {
    console.warn("[grid split] OSS native crop 跳过:", i);
  }
  const t = await dbr({
    imageUrl: e.splitUrl,
    regions: e.regions,
    sourceNode: e.sourceNode,
    preferFfmpeg: !0,
    idPrefix: e.idPrefix
  });
  return (a = t == null ? void 0 : t.images) != null && a.length ? {
    images: t.images,
    preparedLocal: t.preparedLocal
  } : {
    images: await LCt(e.splitUrl, e.regions),
    preparedLocal: null
  };
}

async function e$t(e, t, n) {
  const r = n.find(a => a.id === e.id) ?? e;
  if (r.type === "input-image") {
    const a = await L1(r);
    if (a) return a;
  }
  if (r.type === "gen-image") try {
    const {
        resolveGenMediaToolOriginalUrl: a
      } = await Ie(async () => {
        const {
          resolveGenMediaToolOriginalUrl: s
        } = await Promise.resolve().then(() => jyr);
        return {
          resolveGenMediaToolOriginalUrl: s
        };
      }, void 0, import.meta.url),
      i = await a(r, t),
      o = String(i.url || "").trim();
    if (o && !/\/thumbnails\//i.test(o) || o) return o;
  } catch {}
  return t;
}

async function fbr(e) {
  const {
    imageUrl: t,
    sourceNode: n,
    regions: r,
    nodes: a,
    setNodes: i,
    generateId: o,
    outputColumns: s
  } = e;
  if (!r.length) return;
  const l = await e$t(n, t, a);
  await gbr({
    splitUrl: l,
    sourceNode: n,
    regions: r,
    setNodes: i,
    generateId: o,
    outputColumns: s
  });
}

async function gbr(e) {
  const {
    splitUrl: t,
    sourceNode: n,
    regions: r,
    setNodes: a,
    generateId: i,
    outputColumns: o
  } = e;
  if (!r.length) return;
  const s = r.length,
    l = Math.max(1, Math.min(s, Math.round(o || Math.ceil(Math.sqrt(s))))),
    {
      calcInputImageNodeDisplaySize: d
    } = await Ie(async () => {
      const {
        calcInputImageNodeDisplaySize: y
      } = await Promise.resolve().then(() => Rue);
      return {
        calcInputImageNodeDisplaySize: y
      };
    }, void 0, import.meta.url),
    u = d(r[0].w, r[0].h),
    h = 24,
    p = hbr(n),
    m = await ACt(r.map(y => ({
      width: y.w,
      height: y.h
    })), {
      originX: n.x + n.width + 24,
      originY: n.y,
      cols: l,
      nodeWidth: u.width,
      nodeHeight: u.height,
      spacingW: u.width + h,
      spacingH: u.height + h,
      baseName: p
    }, i);
  a(y => [...y, ...m]), await pbr();
  const f = m.map(y => y.id);
  try {
    const {
      images: y,
      preparedLocal: b
    } = await mbr({
      splitUrl: t,
      sourceNode: n,
      regions: r,
      idPrefix: `grid_${Date.now().toString(36)}`
    });
    if (!y.length) throw new Error("未能生成切片");
    await SCt(f, y, a, p, b);
  } catch (y) {
    const b = new Set(f);
    throw a(v => v.filter(_ => !b.has(_.id))), y;
  }
}

async function Umo(e) {
  return new Promise((t, n) => {
    const r = new Image(),
      a = window.setTimeout(() => n(new Error("读取图片尺寸超时")), 3e4);
    r.onload = () => {
      window.clearTimeout(a);
      const i = r.naturalWidth || r.width,
        o = r.naturalHeight || r.height;
      i > 0 && o > 0 ? t({
        width: i,
        height: o
      }) : n(new Error("无法读取图片尺寸"));
    }, r.onerror = () => {
      window.clearTimeout(a), n(new Error("图片加载失败"));
    }, r.src = e;
  });
}

async function ybr(e) {
  const {
      imageUrl: t,
      sourceNode: n,
      nodes: r,
      setNodes: a,
      generateId: i,
      naturalSize: o
    } = e,
    s = Math.max(1, Math.min(9, Math.round(e.rows))),
    l = Math.max(1, Math.min(9, Math.round(e.columns))),
    d = await e$t(n, t, r);
  if (!d) throw new Error("无法解析图片地址");
  const u = o && o.width > 0 && o.height > 0 ? o : await Umo(d),
    h = cbr(lbr(u.width, u.height, s - 1, l - 1, 0));
  return await gbr({
    splitUrl: d,
    sourceNode: n,
    regions: h,
    setNodes: a,
    generateId: i,
    outputColumns: l
  }), h.length;
}

async function bbr(e) {
  const {
    imageUrl: t,
    sourceNode: n,
    regions: r,
    nodes: a,
    setNodes: i,
    generateId: o
  } = e;
  if (!r.length) return;
  const s = await e$t(n, t, a),
    l = r.length,
    d = Math.ceil(Math.sqrt(l)),
    u = l <= 4 ? 260 : l <= 9 ? 240 : l <= 16 ? 200 : 160,
    h = l <= 4 ? 20 : l <= 9 ? 60 : l <= 16 ? 50 : 40,
    p = hbr(n),
    m = n.x + n.width + 20,
    f = n.y,
    y = await ACt(r.map(v => ({
      width: v.w,
      height: v.h
    })), {
      originX: m,
      originY: f,
      cols: d,
      nodeWidth: u,
      nodeHeight: u,
      spacingW: u + h,
      spacingH: u + h,
      baseName: p
    }, o);
  i(v => [...v, ...y]), await pbr();
  const b = y.map(v => v.id);
  try {
    const {
      images: v,
      preparedLocal: _
    } = await mbr({
      splitUrl: s,
      sourceNode: n,
      regions: r,
      idPrefix: `free_${Date.now().toString(36)}`
    });
    if (!v.length) throw new Error("未能生成切片");
    await SCt(b, v, i, p, _);
  } catch (v) {
    const _ = new Set(b);
    throw i(w => w.filter(k => !_.has(k.id))), v;
  }
}

function $mo({
  node: e,
  updateNode: t,
  setNodes: n,
  nodes: r,
  generateId: a,
  liveDisplayUrl: i,
  naturalSize: o,
  onOpenTool: s
}) {
  const [l, d] = g.useState(!1),
    [u, h] = g.useState(""),
    [p, m] = g.useState(!1),
    [f, y] = g.useState(""),
    b = l || p;
  g.useEffect(() => {
    const E = !!(e.settings || {}).splitToolActive;
    b && !E ? t(e.id, {
      settings: {
        ...e.settings,
        splitToolActive: !0,
        suppressHoverUi: !0
      }
    }) : !b && E && t(e.id, {
      settings: {
        ...e.settings,
        splitToolActive: void 0,
        suppressHoverUi: void 0
      }
    });
  }, [b, e.id]);
  const v = g.useCallback(() => {
      d(!1), h(""), m(!1), y("");
    }, []),
    _ = g.useCallback(async () => {
      const I = Zo(e);
      if (typeof I == "string" && I.trim() && !/\/thumbnails\//i.test(I)) return I.trim();
      try {
        const E = await OJ(e, i),
          M = String(E.url || "").trim();
        if (M) return M;
      } catch {}
      return String(i || "").trim();
    }, [e, i]),
    w = g.useCallback(async () => {
      s("gridSplit"), m(!1), y("");
      const I = Zo(e),
        M = (typeof I == "string" && I.trim() && !/\/thumbnails\//i.test(I) ? I.trim() : "") || i || "";
      M && !M.startsWith("content_ref:") && (h(M), Da.flushSync(() => d(!0)));
      const T = await _();
      if (!T) {
        (!M || M.startsWith("content_ref:")) && Ai("error", "无法解析图片地址");
        return;
      }
      h(T), Da.flushSync(() => d(!0));
    }, [s, e, i, _]),
    k = g.useCallback(async () => {
      s("freeSplit"), d(!1), h("");
      const I = Zo(e),
        M = (typeof I == "string" && I.trim() && !/\/thumbnails\//i.test(I) ? I.trim() : "") || i || "";
      M && !M.startsWith("content_ref:") && (y(M), Da.flushSync(() => m(!0)));
      const T = await _();
      if (!T) {
        (!M || M.startsWith("content_ref:")) && Ai("error", "无法解析图片地址");
        return;
      }
      y(T), Da.flushSync(() => m(!0));
    }, [s, e, i, _]),
    A = g.useCallback(async I => {
      if (!(!u || I.length === 0 || !n)) try {
        await fbr({
          imageUrl: u,
          sourceNode: e,
          regions: I,
          nodes: r ?? [e],
          setNodes: n,
          generateId: a
        }), d(!1), h(""), Ai("success", `已切分 ${I.length} 张图片`);
      } catch (E) {
        console.error("[GenMediaSplit] 宫格切分失败:", E), Ai("error", "宫格切分失败，请重试");
      }
    }, [u, e, r, n, a]),
    S = g.useCallback(async I => {
      if (!(!f || I.length === 0 || !n)) try {
        await bbr({
          imageUrl: f,
          sourceNode: e,
          regions: I,
          nodes: r ?? [e],
          setNodes: n,
          generateId: a
        }), m(!1), y(""), Ai("success", `已切分 ${I.length} 张图片`);
      } catch (E) {
        console.error("[GenMediaSplit] 自由裁切失败:", E), Ai("error", "自由裁切失败，请重试");
      }
    }, [f, e, r, n, a]),
    C = g.useCallback(async (I, E) => {
      if (n) {
        s("gridSplit");
        try {
          const M = await ybr({
            imageUrl: i,
            sourceNode: e,
            rows: I,
            columns: E,
            nodes: r ?? [e],
            setNodes: n,
            generateId: a,
            naturalSize: o
          });
          Ai("success", `已按 ${I}×${E} 快速切分 ${M} 张图片`);
        } catch (M) {
          console.error("[GenMediaSplit] 快速切分失败:", M), Ai("error", "快速切分失败，请重试");
        }
      }
    }, [a, i, o == null ? void 0 : o.height, o == null ? void 0 : o.width, e, r, s, n]);
  return {
    isGridSplitModalOpen: l,
    gridSplitSourceUrl: u,
    isFreeSplitModalOpen: p,
    freeSplitSourceUrl: f,
    anySplitToolOpen: b,
    closeAllSplitTools: v,
    openGridSplit: w,
    quickGridSplit: C,
    openFreeSplit: k,
    handleGridSplitConfirm: A,
    handleFreeSplitConfirm: S,
    setIsGridSplitModalOpen: d,
    setIsFreeSplitModalOpen: m,
    setGridSplitSourceUrl: h,
    setFreeSplitSourceUrl: y
  };
}

const Gmo = g.lazy(() => Ie(() => Promise.resolve().then(() => Qko), void 0, import.meta.url).then(e => ({
    default: e.GridSplitModal
  }))),
  Vmo = g.lazy(() => Ie(() => Promise.resolve().then(() => PRi), void 0, import.meta.url).then(e => ({
    default: e.FreeSplitModal
  })));

function Hmo(e) {
  return c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(Gmo, {
      ...e
    })
  });
}

function Wmo(e) {
  return c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(Vmo, {
      ...e
    })
  });
}

const qmo = g.lazy(() => Ie(() => Promise.resolve().then(() => hNi), void 0, import.meta.url).then(e => ({
  default: e.ExpandModal
})));

function Kmo(e) {
  return c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(qmo, {
      ...e
    })
  });
}

function Sct(e) {
  const t = document.querySelectorAll(".node-wrapper[data-node-id]");
  for (const n of Array.from(t)) if (n.dataset.nodeId === e) return n;
  return null;
}

function Qmo({
  documentSession: e,
  node: t,
  updateNode: n,
  setNodes: r,
  setConnections: a,
  setSelectedNodeId: i,
  setSelectedNodeIds: o,
  nodes: s,
  generateId: l,
  apiConfigs: d,
  showHuyaModels: u,
  liveDisplayUrl: h,
  runExpandImage: p,
  setHistory: m,
  setCroppingNodeId: f,
  setActiveDropdown: y,
  onOpenExpand: b
}) {
  const [v, _] = g.useState(!1),
    [w, k] = g.useState(""),
    [A, S] = g.useState(!1),
    [C, I] = g.useState(!1),
    E = g.useRef(null),
    M = g.useMemo(() => zJe(d, u, {
      includeJimengNative: !0
    }), [d, u]),
    T = !!(p && M.length > 0);
  g.useEffect(() => {
    const L = !!(t.settings || {}).expandToolActive;
    v && !L ? n(t.id, {
      settings: {
        ...t.settings,
        expandToolActive: !0,
        suppressHoverUi: !0
      }
    }) : !v && L && n(t.id, {
      settings: {
        ...t.settings,
        expandToolActive: void 0,
        suppressHoverUi: void 0
      }
    });
  }, [v, t.id]);
  const P = g.useCallback(O => {
      const L = Sct(O);
      L && (L.style.opacity = "0", L.style.visibility = "hidden", L.style.pointerEvents = "none");
    }, []),
    R = g.useCallback(() => {
      const O = e == null ? void 0 : e.lease();
      if (O && !O.isCurrent()) return;
      const L = Sct(t.id);
      L && (L.style.removeProperty("opacity"), L.style.removeProperty("visibility"), L.style.removeProperty("pointer-events")), r == null || r(D => O && !O.isCurrent() ? D : D.map(U => U.id === t.id ? {
        ...U,
        settings: {
          ...U.settings,
          _expandSourceHidden: void 0
        }
      } : U));
    }, [e, t.id, r]),
    j = g.useCallback(O => {
      const L = String(O || "").trim();
      if (L.startsWith("blob:")) try {
        URL.revokeObjectURL(L);
      } catch {}
    }, []),
    B = g.useCallback(O => {
      const L = e == null ? void 0 : e.lease();
      if (L && !L.isCurrent()) return;
      const D = Sct(t.id);
      D && (D.style.removeProperty("opacity"), D.style.removeProperty("visibility"), D.style.removeProperty("pointer-events")), r && r(U => L && !L.isCurrent() ? U : U.map(H => H.id === t.id ? {
        ...H,
        settings: {
          ...(H.settings || {}),
          _expandSourceHidden: void 0,
          _expandSuppressPlus: !0,
          expandToolActive: void 0,
          suppressHoverUi: void 0
        }
      } : H)), _(!1), k(U => (j(U), "")), y == null || y(U => (U == null ? void 0 : U.nodeId) === t.id ? null : U), i == null || i(null), o == null || o(new Set()), O != null && O.generating ? S(!0) : (S(!1), E.current = null);
    }, [e, t.id, r, y, i, o, j]),
    F = g.useCallback(async () => {
      const O = Zo(t);
      if (typeof O == "string" && O.trim() && !/\/thumbnails\//i.test(O)) return O.trim();
      try {
        const L = await OJ(t, h),
          D = String(L.url || "").trim();
        if (D) return D;
      } catch {}
      return String(h || "").trim();
    }, [t, h]),
    N = g.useCallback(async () => {
      if (!T) {
        Ai("error", "当前无可用扩图模型配置");
        return;
      }
      const O = e == null ? void 0 : e.lease(),
        L = () => !O || O.isCurrent();
      if (!L()) return;
      b();
      const D = await F();
      if (!L()) return;
      if (!D) {
        Ai("error", "无法解析图片地址");
        return;
      }
      let U = D;
      if (D.startsWith("blob:") || D.startsWith("data:")) try {
        U = await UN(D);
      } catch {
        Ai("error", "无法读取本地缓存原图");
        return;
      }
      if (!L()) {
        U !== D && U.startsWith("blob:") && URL.revokeObjectURL(U);
        return;
      }
      P(t.id), r == null || r(H => L() ? H.map(Y => Y.id === t.id ? {
        ...Y,
        settings: {
          ...Y.settings,
          _expandSourceHidden: !0
        }
      } : Y) : H), k(U), _(!0);
    }, [e, r, T, b, F, P, t, n]),
    G = g.useCallback(() => {
      var O;
      (O = E.current) != null && O.isCurrent() || !v && !w || (B(), R());
    }, [v, w, B, R]),
    z = g.useCallback((O, L, D) => {
      if (!v || !r) return null;
      const U = BJe({
        documentSession: e,
        ...D,
        sourceNode: t,
        existingNodes: s ?? [],
        modelId: O,
        modelName: L,
        generateId: l,
        setNodes: r,
        setConnections: a,
        setHistory: m,
        onSettled: (H, Y) => {
          E.current === H && (E.current = null, S(!1), Y && Ai("error", yx(Y.message || "扩图失败")));
        }
      });
      return U ? (E.current = U, B({
        generating: !0
      }), U) : (Ai("error", "本节点已有扩图任务，或当前项目尚未就绪"), null);
    }, [e, v, r, B, t, s, l, a, m]),
    V = g.useCallback(async () => {
      var L;
      if (!r) return;
      const O = KO(r, e);
      if (O.isCurrent()) {
        f && Da.flushSync(() => f(t.id)), I(!0);
        try {
          let D = await F();
          if (!D) throw new Error("无法解析图片内容");
          if (Er.isContentRef(D)) {
            await Er.init();
            const ne = Er.extractId(D),
              de = await Er.get(ne);
            if (!de) throw new Error("无法解析图片内容");
            D = de;
          }
          const U = await fetch(D).then(ne => ne.blob()),
            H = await Uhr(U, {
              crop: !1
            }),
            Y = `cutout_xianyi_${t.id}_${Date.now()}`,
            {
              assetStore: K
            } = await Ie(async () => {
              const {
                assetStore: ne
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: ne
              };
            }, void 0, import.meta.url);
          await K.init(), await K.saveBlobAsset(Y, H, "file://xianyi-rmbg-local");
          const W = await K.getAssetUrl(Y);
          if (!W) throw new Error("保存抠图到资源缓存失败");
          let Q = (L = t.nodeName) == null ? void 0 : L.trim();
          (!Q || Q === "未命名节点") && (Q = (t.prompt && typeof t.prompt == "string" ? t.prompt : "").replace(/\.[^/.]+$/, "").trim()), Q = Q || "绘画";
          const q = {
            id: l(),
            type: "input-image",
            nodeName: `${Q}_抠图(鲜艺)`,
            x: t.x + t.width + 24,
            y: t.y,
            width: t.width,
            height: t.height,
            content: W,
            prompt: "",
            settings: $$({}, Y, W)
          };
          if (!O.isCurrent()) return;
          O.setNodes(ne => [...ne, q]), Ai("success", "鲜艺抠图完成");
        } catch (D) {
          console.error("[GenMediaExpand] 智能抠图（鲜艺）失败:", D);
          const U = D instanceof Error ? D.message : String(D),
            H = /localhost:30092|ECONNREFUSED|Failed to fetch|网络|连接/i.test(U);
          Ai("error", H ? "无法连接鲜艺本地接口（http://localhost:30092/rmbg）。请先打开鲜艺 AI 抠图桌面端后重试。" : U || "智能抠图（鲜艺）失败");
        } finally {
          I(!1), f == null || f(null);
        }
      }
    }, [r, e, f, t, F, l]);
  return g.useEffect(() => {
    const O = e == null ? void 0 : e.lease();
    return () => {
      !r || O && !O.isCurrent() || r(L => {
        var U;
        if (O && !O.isCurrent()) return L;
        const D = L.find(H => H.id === t.id);
        return !D || !((U = D.settings) != null && U._expandSourceHidden) ? L : L.map(H => H.id === t.id ? {
          ...H,
          settings: {
            ...(H.settings || {}),
            _expandSourceHidden: void 0,
            expandToolActive: void 0
          }
        } : H);
      });
    };
  }, [e, t.id, r]), {
    expandModalOpen: v,
    expandModalImageUrl: w,
    expandGenerating: A,
    expandImageConfigs: M,
    canOpenExpand: T,
    isXianyiRembgProcessing: C,
    openExpand: N,
    closeExpand: G,
    runXianyiRembg: V,
    handleExpandStartGenerate: z,
    runExpandImage: p
  };
}

const Ymo = g.lazy(() => Ie(() => Promise.resolve().then(() => cSo), void 0, import.meta.url).then(e => ({
    default: e.TextEditPanel
  }))),
  Xmo = g.lazy(() => Ie(() => Promise.resolve().then(() => Cko), void 0, import.meta.url).then(e => ({
    default: e.MoveObjectPanel
  })));

function Jmo(e) {
  return c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(Ymo, {
      ...e
    })
  });
}

function Zmo(e) {
  return c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(Xmo, {
      ...e
    })
  });
}

function efo({
  node: e,
  updateNode: t,
  setNodes: n,
  setConnections: r,
  setSelectedNodeId: a,
  generateId: i,
  liveDisplayUrl: o,
  apiConfigs: s,
  globalApiKey: l,
  onOpenTool: d
}) {
  var N, G;
  const [u, h] = g.useState(!1),
    [p, m] = g.useState(!1),
    [f, y] = g.useState(""),
    [b, v] = g.useState(!1),
    [_, w] = g.useState(null),
    k = g.useRef(null),
    A = u || p,
    S = !!(typeof ((N = e.settings) == null ? void 0 : N.textEditData) == "string" && String(e.settings.textEditData).trim()),
    C = !!(typeof ((G = e.settings) == null ? void 0 : G.moveObjectData) == "string" && String(e.settings.moveObjectData).trim());
  g.useEffect(() => {
    const z = e.settings || {},
      V = !!z.textEditToolActive,
      O = !!z.moveObjectToolActive;
    u && !V ? t(e.id, {
      settings: {
        ...e.settings,
        textEditToolActive: !0,
        suppressHoverUi: !0
      }
    }) : !u && V && t(e.id, {
      settings: {
        ...e.settings,
        textEditToolActive: void 0,
        suppressHoverUi: p ? !0 : void 0
      }
    }), p && !O ? t(e.id, {
      settings: {
        ...e.settings,
        moveObjectToolActive: !0,
        suppressHoverUi: !0
      }
    }) : !p && O && t(e.id, {
      settings: {
        ...e.settings,
        moveObjectToolActive: void 0,
        suppressHoverUi: u ? !0 : void 0
      }
    });
  }, [u, p, e.id]), g.useEffect(() => () => {
    if (k.current) {
      try {
        URL.revokeObjectURL(k.current);
      } catch {}
      k.current = null;
    }
  }, []), g.useEffect(() => {
    if (!A) {
      if (y(""), v(!1), w(null), k.current) {
        try {
          URL.revokeObjectURL(k.current);
        } catch {}
        k.current = null;
      }
      return;
    }
    let z = !1;
    return v(!0), (async () => {
      try {
        const V = Zo(e);
        let O = typeof V == "string" && V.trim() && !/\/thumbnails\//i.test(V) ? V.trim() : "",
          L = 0,
          D = 0;
        if (!O) {
          const U = await OJ(e, o);
          if (O = String(U.url || "").trim(), L = Number(U.naturalWidth) || 0, D = Number(U.naturalHeight) || 0, O.startsWith("blob:")) {
            if (k.current && k.current !== O) try {
              URL.revokeObjectURL(k.current);
            } catch {}
            k.current = O;
          }
        }
        if (O || (O = String(o || "").trim()), z) return;
        if (y(O), L > 0 && D > 0) w({
          w: L,
          h: D
        });else if (O && (O.startsWith("blob:") || O.startsWith("data:"))) try {
          const U = new Image();
          U.decoding = "async", await new Promise((H, Y) => {
            U.onload = () => H(), U.onerror = () => Y(new Error("size")), U.src = O;
          }), !z && U.naturalWidth > 0 && U.naturalHeight > 0 && w({
            w: U.naturalWidth,
            h: U.naturalHeight
          });
        } catch {}
      } catch {
        z || y(String(o || "").trim());
      } finally {
        z || v(!1);
      }
    })(), () => {
      z = !0;
    };
  }, [A, e, o]);
  const I = g.useCallback(z => {
      if (!n || !r || !i) return;
      const V = i(),
        O = i(),
        D = e.x + e.width + 80,
        U = e.y;
      n(H => {
        const Y = Ki(V, "gen-image", D, U, void 0, void 0, H);
        return [...H, {
          ...Y,
          settings: i7(Y.settings, z || {})
        }];
      }), r(H => [...H, {
        id: O,
        from: e.id,
        to: V
      }]), v5(V), a == null || a(V);
    }, [e.x, e.y, e.width, e.id, n, r, i, a]),
    E = g.useCallback(() => {
      h(!1), m(!1);
    }, []),
    M = g.useCallback(() => {
      var z;
      if (u) {
        const V = ((z = e.settings) == null ? void 0 : z.textEditState) || {};
        t(e.id, {
          settings: {
            ...e.settings,
            textEditData: void 0,
            textEditToolActive: void 0,
            textEditState: {
              ...V,
              detectedRegions: [],
              selectedRegions: []
            },
            suppressHoverUi: void 0
          }
        }), h(!1);
        return;
      }
      d("textEdit"), m(!1), h(!0);
    }, [u, e.id, e.settings, t, d]),
    T = g.useCallback(() => {
      if (p) {
        m(!1);
        return;
      }
      d("moveObject"), h(!1), m(!0);
    }, [p, d]),
    P = g.useCallback(z => {
      t(e.id, {
        settings: {
          ...e.settings,
          textEditState: z,
          ...(z.platformGroup ? {
            textEditPlatformGroup: z.platformGroup
          } : {})
        }
      });
    }, [e.id, e.settings, t]),
    R = g.useCallback(z => {
      var O;
      const V = ((O = e.settings) == null ? void 0 : O.textEditState) || {};
      t(e.id, {
        settings: {
          ...e.settings,
          textEditData: void 0,
          textEditToolActive: z != null && z.keepOpen ? !0 : void 0,
          textEditState: z != null && z.keepOpen ? {
            ...V,
            detectedRegions: [],
            selectedRegions: []
          } : {
            ...V,
            detectedRegions: [],
            selectedRegions: []
          },
          suppressHoverUi: z != null && z.keepOpen ? !0 : void 0
        }
      }), z != null && z.keepOpen || h(!1);
    }, [e.id, e.settings, t]),
    j = g.useCallback(z => {
      t(e.id, {
        settings: {
          ...e.settings,
          textEditData: z,
          textEditToolActive: void 0,
          suppressHoverUi: void 0
        }
      }), h(!1), queueMicrotask(() => I({
        textEditData: z
      }));
    }, [e.id, e.settings, t, I]),
    B = g.useCallback((z, V) => {
      t(e.id, {
        settings: {
          ...e.settings,
          moveObjectData: z,
          moveObjectToolActive: void 0,
          suppressHoverUi: void 0
        }
      }), m(!1);
      const O = V.source.rect,
        L = V.target.rect,
        D = [`主体：${V.subject.label}`, `源区域(px)：x=${O.x}, y=${O.y}, w=${O.w}, h=${O.h}`, `目标区域(px)：x=${L.x}, y=${L.y}, w=${L.w}, h=${L.h}`].join(`
`);
      window.dispatchEvent(new CustomEvent("moveObjectDataConfirmed", {
        detail: {
          nodeId: e.id,
          summary: D,
          json: z
        }
      })), queueMicrotask(() => I({
        moveObjectData: z
      }));
    }, [e.id, e.settings, t, I]),
    F = g.useCallback(() => {
      if (!o && !e.content) {
        Ai("error", "当前节点无可用图片");
        return;
      }
      T();
    }, [o, e.content, T]);
  return {
    isTextEditPanelOpen: u,
    setIsTextEditPanelOpen: h,
    isMoveObjectPanelOpen: p,
    setIsMoveObjectPanelOpen: m,
    anyInstructionToolOpen: A,
    instructionSourceUrl: f,
    instructionSourceLoading: b,
    instructionNaturalSize: _,
    hasSelfTextEditData: S,
    hasSelfMoveObjectData: C,
    apiConfigs: s,
    globalApiKey: l,
    closeAllInstructionTools: E,
    toggleTextEdit: M,
    toggleMoveObject: F,
    handleTextEditStateChange: P,
    clearTextEditSaved: R,
    handleTextEditGenerated: j,
    handleMoveObjectConfirmed: B
  };
}

function tfo(e) {
  try {
    const t = String(e || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"'),
      n = document.querySelector(`.node-wrapper[data-node-id="${t}"]`),
      r = n == null ? void 0 : n.querySelector("video");
    if (r && Number.isFinite(r.currentTime)) return Math.max(0, r.currentTime);
  } catch {}
  return 0;
}

function nfo({
  node: e,
  livePlaybackUrl: t,
  setNodes: n,
  setSelectedNodeId: r,
  generateId: a,
  nodes: i
}) {
  const [o, s] = g.useState(!1),
    l = g.useCallback(async () => {
      const y = P0(e);
      if (typeof y == "string" && y.trim() && !/\/thumbnails\//i.test(y)) return {
        url: y.trim(),
        revoke: null
      };
      const b = Zo(e);
      if (typeof b == "string" && b.trim() && !/\/thumbnails\//i.test(b)) return {
        url: b.trim(),
        revoke: null
      };
      const v = e.settings || {},
        _ = typeof v._contentAssetId == "string" && v._contentAssetId.trim() || typeof v._assetId == "string" && v._assetId.trim() || "";
      if (_ && ei()) try {
        const {
          localCacheManager: k
        } = await Ie(async () => {
          const {
            localCacheManager: S
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: S
          };
        }, void 0, import.meta.url);
        await k.ensureRestored();
        const A = await k.getConvertFileSrcForAsset(_);
        if (A) return {
          url: A,
          revoke: null
        };
      } catch {}
      const w = String(t || "").trim();
      if (!w) throw new Error("无法解析视频地址");
      return Yk(w);
    }, [e, t]),
    d = g.useCallback(async (y, b) => JS(y, b, {
      sourceNodeId: e.id
    }), [e.id]),
    u = g.useCallback(async () => {
      if (!n || o) return;
      s(!0);
      let y = null;
      try {
        const {
          url: b,
          revoke: v
        } = await l();
        y = v;
        const _ = document.createElement("video");
        _.muted = !0, _.playsInline = !0, _.preload = "metadata", _.crossOrigin = b.startsWith("http") ? "anonymous" : null, await new Promise((F, N) => {
          _.onloadedmetadata = () => F(), _.onerror = () => N(_.error || new Error("视频元数据加载失败")), _.src = b;
        });
        const w = _.duration || 0;
        _.removeAttribute("src"), _.load(), _.remove();
        const k = Math.max(0, w - .05),
          [A, S] = await Promise.all([Oot(b, 0, {
            preserveOriginal: !0,
            quality: .92
          }), Oot(b, k, {
            preserveOriginal: !0,
            quality: .92
          })]),
          [C, I] = await Promise.all([d(A, "first"), d(S, "last")]),
          E = e.width ?? 300,
          M = Math.max(120, Math.round((e.height ?? 200) * .85)),
          T = 24,
          P = a(),
          R = a(),
          j = Ki(P, "input-image", e.x + E + T, e.y, "首帧", C.settings, i || []),
          B = Ki(R, "input-image", e.x + E + T * 2 + E, e.y, "尾帧", I.settings, i || []);
        n(F => [...F, {
          ...j,
          content: C.content,
          width: E,
          height: M
        }, {
          ...B,
          content: I.content,
          width: E,
          height: M
        }]), r == null || r(P), Ai("success", "已提取首尾帧");
      } catch (b) {
        console.error("[GenMediaVideoFrame] 提取首尾帧失败:", b), Ai("error", b instanceof Error ? b.message : "提取首尾帧失败");
      } finally {
        y == null || y(), s(!1);
      }
    }, [n, o, l, d, e, a, i, r]),
    h = g.useCallback(async y => {
      if (!n || o) return;
      s(!0);
      let b = null;
      try {
        const {
          url: v,
          revoke: _
        } = await l();
        b = _;
        let w = y === "current" ? tfo(e.id) : 0;
        if (y === "last") {
          const T = document.createElement("video");
          T.muted = !0, T.playsInline = !0, T.preload = "metadata", await new Promise((P, R) => {
            const j = window.setTimeout(() => R(new Error("视频元数据加载超时")), 3e4);
            T.onloadedmetadata = () => {
              window.clearTimeout(j), P();
            }, T.onerror = () => {
              window.clearTimeout(j), R(T.error || new Error("视频元数据加载失败"));
            }, T.src = v;
          }), w = Math.max(0, (T.duration || 0) - .001), T.removeAttribute("src"), T.load(), T.remove();
        }
        const k = y === "current" ? "当前帧" : y === "first" ? "首帧" : "末帧",
          A = await Oot(v, w, {
            preserveOriginal: !0,
            quality: .95
          }),
          S = await d(A, y),
          C = e.width ?? 300,
          I = Math.max(120, Math.round((e.height ?? 200) * .85)),
          E = a(),
          M = Ki(E, "input-image", e.x + C + 24, e.y, k, S.settings, i || []);
        n(T => [...T, {
          ...M,
          content: S.content,
          width: C,
          height: I
        }]), r == null || r(E), Ai("success", `已提取${k}`);
      } catch (v) {
        console.error(`[GenMediaVideoFrame] 提取${y}帧失败:`, v), Ai("error", v instanceof Error ? v.message : "提取视频帧失败");
      } finally {
        b == null || b(), s(!1);
      }
    }, [n, o, e, l, d, a, i, r]),
    p = g.useCallback(() => h("current"), [h]),
    m = g.useCallback(() => h("first"), [h]),
    f = g.useCallback(() => h("last"), [h]);
  return {
    isExtractingFrames: o,
    extractFirstLastFrames: u,
    extractCurrentFrame: p,
    extractFirstFrame: m,
    extractLastFrame: f
  };
}

const rfo = g.lazy(() => Ie(() => Promise.resolve().then(() => JIo), void 0, import.meta.url).then(e => ({
  default: e.VideoDepthDialog
})));

function vbr(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(rfo, {
      ...e
    })
  }) : null;
}

const afo = g.lazy(() => Ie(() => Promise.resolve().then(() => rCo), void 0, import.meta.url).then(e => ({
  default: e.ImageDepthProgressPanel
})));

function wbr(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(afo, {
      ...e
    })
  }) : null;
}

const ifo = g.lazy(() => Ie(() => Promise.resolve().then(() => oCo), void 0, import.meta.url).then(e => ({
  default: e.ImageCutoutHost
})));

function xbr(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(ifo, {
      ...e
    })
  }) : null;
}

const ofo = g.lazy(() => Ie(() => Promise.resolve().then(() => DCo), void 0, import.meta.url).then(e => ({
  default: e.VideoAspectCropHost
})));

function _br(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(ofo, {
      ...e
    })
  }) : null;
}

const sfo = g.lazy(() => Ie(() => Promise.resolve().then(() => eEo), void 0, import.meta.url).then(e => ({
  default: e.VideoTrimHost
})));

function kbr(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(sfo, {
      ...e
    })
  }) : null;
}

const lfo = g.lazy(() => Ie(() => Promise.resolve().then(() => AEo), void 0, import.meta.url).then(e => ({
  default: e.VideoReverseHost
})));

function Abr(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(lfo, {
      ...e
    })
  }) : null;
}

const cfo = g.lazy(() => Ie(() => Promise.resolve().then(() => tTo), void 0, import.meta.url).then(e => ({
  default: e.VideoExtractAudioHost
})));

function Sbr(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(cfo, {
      ...e
    })
  }) : null;
}

const dfo = g.lazy(() => Ie(() => Promise.resolve().then(() => _To), void 0, import.meta.url).then(e => ({
  default: e.VideoCompressHost
})));

function Ibr(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(dfo, {
      ...e
    })
  }) : null;
}

const ufo = g.lazy(() => Ie(() => Promise.resolve().then(() => e8o), void 0, import.meta.url).then(e => ({
  default: e.VideoToGifHost
})));

function Cbr(e) {
  return e.open ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(ufo, {
      ...e
    })
  }) : null;
}

const Ebr = 16,
  qSt = 2e3,
  hfo = "seedream-5.0-pro-api",
  pfo = "nano-banana-fal",
  mfo = "图层分解",
  Pgn = "bytedance/seedream/v5/pro/layerize",
  Tbr = "qiaodoumayi_layer_split_channel",
  ffo = [{
    id: "api",
    label: "API"
  }, {
    id: "fal",
    label: "Fal"
  }];

function Mbr(e) {
  return String(e || "").trim().toLowerCase() === "fal" ? "fal" : "api";
}

function gfo() {
  try {
    return Mbr(localStorage.getItem(Tbr));
  } catch {
    return "api";
  }
}

function yfo(e) {
  try {
    localStorage.setItem(Tbr, e);
  } catch {}
}

function bfo(e) {
  return e === "fal" ? pfo : hfo;
}

function vfo(e) {
  return e === "fal" ? "图层分解 · Fal" : mfo;
}

function wfo(e) {
  return e === "fal" ? "请先在 API 设置中填写 Fal 渠道 Key" : "未配置 Seedream 5.0 Pro API Key（seedream-5.0-pro-api）";
}

function xfo(e, t, n) {
  const r = l => Math.min(1e3, Math.max(0, Math.round(l))),
    a = r(e.left / t * 1e3),
    i = r(e.top / n * 1e3),
    o = r((e.left + e.width) / t * 1e3),
    s = r((e.top + e.height) / n * 1e3);
  return [Math.min(a, o), Math.min(i, s), Math.max(a, o), Math.max(i, s)];
}

function _fo(e, t, n, r, a) {
  const i = n.width > 0 ? r / n.width : 1,
    o = n.height > 0 ? a / n.height : 1;
  return {
    x: (e - n.left) * i,
    y: (t - n.top) * o
  };
}

const kfo = e => e.map(t => t / 1e3),
  Afo = /\[@(image|video|audio|region):([\w]+)(?::([^:\]]*))?(?::(https?:\/\/[^\]]+))?\]|\[@ref:(image|video|audio|region):([\w]+)(?::([^\]]*))?\]/g;

function Pbr(e) {
  return `<bbox>${e.bbox.slice(0, 4).map(t => Math.round(t)).join(" ")}</bbox>`;
}

function Sfo(e, t) {
  return e.replace(Afo, (...n) => {
    const r = n[1] ?? n[5],
      a = n[2] ?? n[6];
    if (r !== "region") return "";
    const i = t.find(o => o.refId === a);
    return i && i.bbox.length >= 4 ? Pbr(i) : "";
  }).replace(/ {2,}/g, " ").trim();
}

function Ifo(e, t) {
  return e.replace(new RegExp(`\\[@region:${t}(?::[^\\]]*)?\\]\\s?`, "g"), "");
}

function Cfo(e, t, n) {
  if (n === void 0) return `${e}${e.length > 0 && !e.endsWith(" ") ? " " : ""}${t} `;
  const r = e.slice(0, n),
    a = e.slice(n),
    i = r.length > 0 && !r.endsWith(" ") ? " " : "",
    o = a.length > 0 && !a.startsWith(" ") ? " " : "";
  return `${r}${i}${t}${o}${a}`;
}

function Efo(e, t) {
  const n = Sfo(e, t);
  return n ? n.slice(0, qSt) : t.length ? t.map(Pbr).join(" ").slice(0, qSt) : "";
}

function cwe(e) {
  const t = String(e || "").trim();
  return /^<!doctype html/i.test(t) || /^<html[\s>]/i.test(t);
}

function Ict(e, t, n) {
  if (cwe(n)) return `图层分解接口返回了网页而不是 JSON（HTTP ${t}）。当前请求 ${e}，请确认 Seedream 5.0 Pro Layerize 渠道可用。`;
  const r = String(n || "").replace(/\s+/g, " ").trim().slice(0, 160);
  return r ? `图层分解失败（HTTP ${t}）：${r}` : `图层分解失败（HTTP ${t}）`;
}

function Tfo(e) {
  let t = String(e || "").trim();
  return t && !/^https?:\/\//i.test(t) && (t = `https://${t}`), t = t.replace(/\/+$/, ""), t = t.replace(/\/openapi\/v2\/seedream-v5-pro\/layer-decomposition$/i, ""), t = t.replace(/\/openapi\/v2$/i, ""), t = t.replace(/\/v1$/i, ""), t.replace(/\/+$/, "");
}

function Mfo(e) {
  const t = String(e || "").trim();
  if (!/^https?:\/\//i.test(t)) return !1;
  try {
    const n = new URL(t).hostname.toLowerCase();
    return !(n === "localhost" || n === "127.0.0.1" || n === "::1" || n.endsWith(".local"));
  } catch {
    return !1;
  }
}

function Pfo(e) {
  const t = e.data && typeof e.data == "object" && !Array.isArray(e.data) ? e.data : e,
    n = t.request_id ?? t.requestId ?? t.taskId ?? t.task_id ?? t.id ?? e.request_id ?? e.requestId ?? e.taskId ?? e.task_id;
  return String(n || "").trim();
}

function Rfo(e, t) {
  const n = e.error;
  if (n && typeof n == "object" && typeof n.message == "string") {
    const i = String(n.message).trim();
    if (i && !cwe(i)) return i;
  }
  const r = String(e.errorMessage || e.error_message || e.message || e.msg || "").trim();
  if (r && !cwe(r)) return r;
  const a = e.failedReason;
  if (a && typeof a == "object") {
    const i = a,
      o = String(i.exception_message || i.message || "").trim();
    if (o && !cwe(o)) return o;
  }
  return t;
}

function Rbr(e = "api") {
  const t = Mbr(e),
    n = bfo(t);
  return {
    channel: t,
    modelId: n,
    apiKey: Qa.getEffectiveApiKey(n),
    baseUrl: Tfo(Qa.getResolvedModelBaseUrl(n))
  };
}

async function Nfo(e, t) {
  const n = e.type === "input-image" ? Vh(e) : Zo(e);
  if (n && (nr(n) || Mfo(n))) return RP(n);
  let r = t;
  if (e.type === "input-image") r = (await L1(e)) || t;else try {
    const {
        resolveGenMediaToolOriginalUrl: a
      } = await Ie(async () => {
        const {
          resolveGenMediaToolOriginalUrl: o
        } = await Promise.resolve().then(() => jyr);
        return {
          resolveGenMediaToolOriginalUrl: o
        };
      }, void 0, import.meta.url),
      i = await a(e, t);
    r = String(i.url || "").trim() || t;
  } catch {}
  return RP(r);
}

async function jfo(e) {
  var y, b, v;
  hcr();
  const {
    channel: t,
    apiKey: n,
    baseUrl: r
  } = Rbr(e.channel);
  if (!n) throw new Error(wfo(t));
  if (!r) throw new Error(t === "fal" ? "未配置 Fal 渠道 API 地址" : "未配置 Seedream 5.0 Pro API 地址");
  const a = Po(r),
    i = await Nfo(e.sourceNode, e.imageUrl),
    o = (e.prompt || "").trim(),
    s = {
      image_url: i,
      image_size: "auto",
      enable_safety_checker: !0,
      enhance_prompt_mode: "standard"
    };
  o && (s.prompt = o.slice(0, 2e3));
  const l = `${a}/${Pgn}`,
    d = await $i(l, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${n}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(s)
    }),
    u = await d.text();
  if (cwe(u) || !d.ok && /^\s*</.test(u)) throw new Error(Ict(l, d.status, u));
  let h = {};
  try {
    h = u ? JSON.parse(u) : {};
  } catch {
    throw new Error(Ict(l, d.status, u));
  }
  if (!d.ok) throw new Error(Rfo(h, Ict(l, d.status, u)));
  wh(h);
  const p = Pfo(h);
  p && ((y = e.onTaskId) == null || y.call(e, p)), (b = e.onProgress) == null || b.call(e, 35);
  const m = await GM({
    falPrefix: a,
    apiKey: n,
    modelPath: Pgn,
    submitData: h,
    onProgress: e.onProgress
  });
  if (!m.length) throw new Error("图层分解完成但未返回图片");
  (v = e.onProgress) == null || v.call(e, 100);
  const f = await Promise.all(m.map(_ => Ns(_, {
    compressForApi: !1
  })));
  if (!f.length) throw new Error("图层分解未得到有效图片");
  return {
    blobs: f,
    urls: m,
    taskId: p
  };
}

const Rgn = 24;

function Dfo(e) {
  var n;
  let t = (n = e.nodeName) == null ? void 0 : n.trim();
  return (!t || t === "未命名节点") && (t = (e.prompt && typeof e.prompt == "string" ? e.prompt : "").replace(/\.[^/.]+$/, "").trim()), t || "图片";
}

async function Lfo(e) {
  var b;
  const {
      blobs: t,
      sourceNode: n,
      setNodes: r,
      generateId: a,
      names: i
    } = e,
    {
      assetStore: o
    } = await Ie(async () => {
      const {
        assetStore: v
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: v
      };
    }, void 0, import.meta.url);
  await o.init();
  const s = ua(),
    l = Dfo(n),
    d = n.y;
  let u = n.x + n.width + Rgn;
  const h = [],
    p = [],
    m = [];
  let f = "",
    y = "";
  for (let v = 0; v < t.length; v++) {
    const _ = t[v],
      w = await Rv(_),
      k = kc(w.width || 1, w.height || 1),
      A = ((b = i == null ? void 0 : i[v]) == null ? void 0 : b.trim()) || (v === 0 ? `${l}_底图` : `${l}_图层${v}`);
    let S = "",
      C = {},
      I = "";
    if (s) {
      const E = URL.createObjectURL(_);
      try {
        const M = await Uk(E, `${A}.png`);
        if (!(M != null && M.displayUrl) || !M.remoteUrl) throw new Error(`「${A}」上传 OSS 失败`);
        const T = Hv(M, {
          mediaType: "image"
        });
        S = String(T.content || M.displayUrl), C = T.settings || {}, m.push(M.remoteUrl);
      } finally {
        URL.revokeObjectURL(E);
      }
    } else {
      if (I = `layer_split_${n.id}_${Date.now()}_${v}`, await o.saveBlobAsset(I, _, "file://layer-split-local"), S = (await o.getAssetUrl(I)) || "", !S) throw new Error("保存图层到资源缓存失败");
      C = $$({}, I, S), m.push(S);
    }
    p.push(S), v === 0 && (f = S, y = I), h.push({
      id: a(),
      type: "input-image",
      nodeName: A,
      x: u,
      y: d,
      width: k.width,
      height: k.height,
      content: S,
      prompt: "",
      settings: C
    }), u += k.width + Rgn;
  }
  return r(v => [...v, ...h]), {
    count: h.length,
    primaryUrl: f,
    primaryAssetId: y,
    layerUrls: p,
    remoteUrls: m,
    usedOss: s
  };
}

async function t$t(e, t, n) {
  var l;
  const {
    assetStore: r
  } = await Ie(async () => {
    const {
      assetStore: d
    } = await Promise.resolve().then(() => Ri);
    return {
      assetStore: d
    };
  }, void 0, import.meta.url);
  await r.init();
  const a = ua(),
    i = [],
    o = [],
    s = [];
  for (let d = 0; d < e.length; d++) {
    const u = e[d],
      h = ((l = t[d]) == null ? void 0 : l.trim()) || `图层${d + 1}`;
    let p = "",
      m = "";
    if (a) {
      const f = URL.createObjectURL(u);
      try {
        const y = await Uk(f, `${h}.png`);
        if (!(y != null && y.displayUrl) || !y.remoteUrl) throw new Error(`「${h}」上传 OSS 失败`);
        p = y.displayUrl, o.push(y.remoteUrl);
      } finally {
        URL.revokeObjectURL(f);
      }
    } else {
      if (m = `layer_split_${n}_${Date.now()}_${d}`, await r.saveBlobAsset(m, u, "file://layer-split-local"), p = (await r.getAssetUrl(m)) || "", !p) throw new Error("保存图层到资源缓存失败");
      o.push(p);
    }
    i.push(p), s.push(m);
  }
  return {
    layerUrls: i,
    remoteUrls: o,
    assetIds: s,
    usedOss: a
  };
}

function Nbr(e) {
  const {
      node: t,
      isImage: n,
      setNodes: r,
      setHistory: a,
      generateId: i,
      setCroppingNodeId: o,
      resolveImageUrl: s,
      naturalSize: l
    } = e,
    [d, u] = g.useState(!1),
    [h, p] = g.useState(""),
    [m, f] = g.useState([]),
    [y, b] = g.useState(!1),
    [v, _] = g.useState(!1),
    [w, k] = g.useState(gfo),
    A = g.useRef(0),
    S = g.useRef(!1),
    C = g.useCallback(B => {
      k(B), yfo(B);
    }, []),
    I = g.useCallback(() => {
      u(!1), p(""), f([]), b(!1), A.current = 0;
    }, []),
    E = g.useCallback(() => {
      n && (u(!0), p(""), f([]), b(!0), A.current = 0);
    }, [n]),
    M = g.useCallback(B => {
      let F = null;
      return f(N => N.length >= Ebr ? N : (F = {
        refId: `rg${++A.current}`,
        bbox: B
      }, [...N, F])), F;
    }, []),
    T = g.useCallback(B => {
      f(F => F.filter(N => N.refId !== B)), p(F => Ifo(F, B));
    }, []),
    P = g.useCallback((B, F) => {
      p(N => Cfo(N, `[@region:${B}]`, F));
    }, []),
    R = g.useCallback(async (B, F) => {
      if (!n || !r || S.current) return;
      S.current = !0, _(!0), o == null || o(t.id);
      const N = i(),
        G = Date.now(),
        z = Efo(B, F),
        {
          modelId: V,
          apiKey: O,
          baseUrl: L
        } = Rbr(w),
        D = vfo(w);
      if (a) {
        const H = {
          id: N,
          type: "image",
          url: "",
          prompt: z || "图层分解",
          ...ky(G),
          status: "generating",
          progress: 0,
          modelName: D,
          sourceNodeId: t.id,
          apiConfig: {
            modelId: V,
            baseUrl: L,
            apiKey: O || ""
          }
        };
        a(Y => [H, ...Y]);
      }
      const U = H => {
        a && a(Y => Y.map(K => K.id === N ? {
          ...K,
          ...H
        } : K));
      };
      try {
        const H = await s();
        if (!H) throw new Error("无法解析图片地址");
        const {
            blobs: Y,
            urls: K,
            taskId: W
          } = await jfo({
            imageUrl: H,
            prompt: z,
            sourceNode: t,
            channel: w,
            historyId: N,
            naturalWidth: l == null ? void 0 : l.width,
            naturalHeight: l == null ? void 0 : l.height,
            onTaskId: J => U({
              remoteTaskId: J
            }),
            onProgress: J => U({
              progress: J
            })
          }),
          Q = await Lfo({
            blobs: Y,
            sourceNode: t,
            setNodes: r,
            generateId: i
          }),
          q = Q.count,
          ne = Math.max(0, Date.now() - G),
          de = await MJe(N, K),
          le = TJe(de, {
            id: N,
            type: "image",
            prompt: z || "图层分解",
            ...ky(G),
            status: "completed",
            progress: 100,
            modelName: D,
            sourceNodeId: t.id,
            remoteTaskId: W || void 0,
            durationMs: ne,
            generationTime: `${(ne / 1e3).toFixed(1)}s`,
            apiConfig: {
              modelId: V,
              baseUrl: L,
              apiKey: O || ""
            }
          });
        le.url || (le.url = Q.primaryUrl || K[0] || "", le._assetId = le._assetId || Q.primaryAssetId || void 0, le.mjImages = le.mjImages && le.mjImages.length > 1 ? le.mjImages : Q.layerUrls.length > 1 ? Q.layerUrls : void 0), a && a(J => J.some(pe => pe.id === N) ? J.map(pe => pe.id === N ? le : pe) : [le, ...J]), q < 2 ? Ai("warning", "图层分解只返回了 1 层，未拆出独立前景。请确认 Fal layerize 渠道可用。") : Ai("success", `图层分解完成，共 ${q} 层`), I();
      } catch (H) {
        console.error("[layerSplit]", H);
        const Y = yx(H instanceof Error ? H.message : "图层分解失败");
        U({
          status: "failed",
          progress: 0,
          errorMsg: Y
        }), Ai("error", Y);
      } finally {
        S.current = !1, _(!1), o == null || o(null);
      }
    }, [w, I, i, n, l == null ? void 0 : l.height, l == null ? void 0 : l.width, t, s, o, a, r]),
    j = g.useCallback(() => {
      R(h, m);
    }, [h, m, R]);
  return {
    isActive: d,
    isPicking: y,
    isSubmitting: v,
    channel: w,
    prompt: h,
    regions: m,
    setPrompt: p,
    setChannel: C,
    setPicking: b,
    enterCustom: E,
    exit: I,
    addRegion: M,
    removeRegion: T,
    insertRegionToken: P,
    submitCustom: j
  };
}

const uV = {
  panelTitle: "拆分图层",
  promptPlaceholder: "描述想要拆分的内容",
  pickRegion: "框选内容",
  pickHint: "框选你想拆分的区域",
  submit: "拆分",
  cancel: "取消",
  regionLimit: e => `最多 ${e} 个区域`
};

function jbr({
  session: e,
  imageUrl: t,
  isDark: n
}) {
  on();
  const {
      prompt: r,
      regions: a,
      isPicking: i,
      isSubmitting: o,
      channel: s,
      setPrompt: l,
      setChannel: d,
      setPicking: u,
      removeRegion: h,
      submitCustom: p,
      exit: m
    } = e,
    f = g.useRef(null),
    y = g.useRef(void 0),
    [b, v] = g.useState(!0),
    _ = !o;
  return c.jsxs("div", {
    "data-testid": "layer-split-panel",
    "data-layer-split-panel": !0,
    className: `nodrag nowheel pointer-events-auto flex w-[280px] flex-col items-start gap-3 rounded-xl border shadow-lg ${n ? "border-white/10 bg-[#1c1c1e] text-zinc-100" : "border-zinc-200 bg-white text-zinc-900"}`,
    onClick: w => w.stopPropagation(),
    onPointerDown: w => w.stopPropagation(),
    onMouseDown: w => w.stopPropagation(),
    onDoubleClick: w => {
      w.preventDefault(), w.stopPropagation();
    },
    children: [c.jsxs("div", {
      className: "flex h-11 w-full items-center justify-between pr-[10px] pl-4",
      children: [c.jsxs("span", {
        className: "text-sm font-semibold",
        children: [" ", x(uV.panelTitle)]
      }), c.jsx("span", {
        className: `text-xs ${n ? "text-zinc-400" : "text-zinc-500"}`,
        children: uV.regionLimit(Ebr)
      })]
    }), c.jsxs("div", {
      className: "flex w-full items-center gap-2 px-3",
      children: [c.jsx("span", {
        className: `shrink-0 text-xs ${n ? "text-zinc-400" : "text-zinc-500"}`,
        children: x("渠道")
      }), c.jsx("div", {
        className: `grid flex-1 grid-cols-2 gap-[3px] rounded-xl p-[3px] ${n ? "bg-black/40 ring-1 ring-white/[0.07]" : "bg-zinc-100 ring-1 ring-black/[0.05]"}`,
        "data-testid": "layer-split-channel-bar",
        children: ffo.map(w => {
          const k = s === w.id;
          return c.jsx("button", {
            type: "button",
            "data-testid": `layer-split-channel-${w.id}`,
            "data-layer-split-channel": w.id,
            "aria-pressed": k,
            disabled: o,
            onClick: () => d(w.id),
            className: `h-8 rounded-[10px] text-xs font-semibold leading-none transition-all duration-150 disabled:opacity-50 ${k ? n ? "bg-white/[0.13] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.35)]" : "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(15,23,42,0.08),inset_0_0_0_1px_rgba(15,23,42,0.06)]" : n ? "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300" : "text-zinc-400 hover:bg-white/80 hover:text-zinc-600"}`,
            children: x(w.label)
          }, w.id);
        })
      })]
    }), a.length > 0 && c.jsx("div", {
      className: "flex w-full flex-col gap-1.5 px-3",
      children: a.map((w, k) => {
        const A = kfo(w.bbox),
          S = Math.max(A[2] - A[0], .01),
          C = Math.max(A[3] - A[1], .01);
        return c.jsxs("div", {
          "data-testid": `layer-split-region-${k + 1}`,
          className: `flex h-9 items-center gap-2 rounded-lg border px-2 ${n ? "border-white/10" : "border-zinc-200"}`,
          children: [t ? c.jsx("span", {
            className: "relative h-6 w-6 shrink-0 overflow-hidden rounded",
            children: c.jsx("img", {
              src: t,
              alt: "",
              className: "absolute max-w-none",
              style: {
                left: `${-A[0] * 100}%`,
                top: `${-A[1] * 100}%`,
                width: `${100 / S}%`,
                height: `${100 / C}%`
              }
            })
          }) : null, c.jsxs("span", {
            className: "min-w-0 flex-1 truncate text-xs",
            children: [x("区域 "), k + 1]
          }), c.jsx("button", {
            type: "button",
            "data-testid": "layer-split-region-delete",
            className: n ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900",
            onClick: () => h(w.refId),
            children: "×"
          })]
        }, w.refId);
      })
    }), c.jsx("div", {
      className: "flex w-full items-center gap-2 px-3",
      children: c.jsx("button", {
        type: "button",
        "data-testid": "layer-split-pick-toggle",
        onClick: () => {
          u(!i), v(!0);
        },
        className: `flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs ${i ? n ? "border-white/40 bg-white/10" : "border-zinc-900 bg-zinc-100" : n ? "border-white/10 hover:bg-white/5" : "border-zinc-200 hover:bg-zinc-50"}`,
        children: i ? x("停止框选") : uV.pickRegion
      })
    }), b ? c.jsx("p", {
      className: `px-3 text-xs ${n ? "text-zinc-400" : "text-zinc-500"}`,
      children: x(uV.pickHint)
    }) : null, c.jsx("div", {
      className: "w-full px-3",
      children: c.jsx("textarea", {
        "data-testid": "layer-split-prompt-input",
        ref: f,
        maxLength: qSt,
        placeholder: x(uV.promptPlaceholder),
        value: r,
        onChange: w => {
          y.current = w.target.selectionStart, l(w.target.value);
        },
        onKeyUp: w => {
          y.current = w.currentTarget.selectionStart ?? void 0;
        },
        onClick: w => {
          y.current = w.currentTarget.selectionStart ?? void 0;
        },
        className: `min-h-[72px] w-full resize-none rounded-lg border p-2 text-xs outline-none ${n ? "border-white/10 bg-black/30 focus:border-white/30" : "border-zinc-200 bg-zinc-50 focus:border-zinc-400"}`
      })
    }), c.jsxs("div", {
      className: "flex w-full items-center gap-2 p-3",
      children: [c.jsx("button", {
        type: "button",
        "data-testid": "layer-split-cancel",
        disabled: o,
        onClick: () => m(),
        className: `min-w-15 flex-1 rounded-lg border py-2 text-xs ${n ? "border-white/10 hover:bg-white/5" : "border-zinc-200 hover:bg-zinc-50"}`,
        children: x(uV.cancel)
      }), c.jsx("button", {
        type: "button",
        "data-testid": "layer-split-submit",
        disabled: !_,
        onClick: () => {
          const w = f.current;
          w && (y.current = w.selectionStart), p();
        },
        className: `min-w-15 flex-1 rounded-lg py-2 text-xs font-medium disabled:opacity-50 ${n ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"}`,
        children: o ? x("拆分中…") : uV.submit
      })]
    })]
  });
}

function n$t({
  regions: e,
  isPicking: t,
  onRegionAdd: n,
  className: r
}) {
  on();
  const a = g.useRef(null),
    [i, o] = g.useState(null),
    s = g.useRef(null),
    l = g.useRef(i);
  l.current = i;
  const d = g.useCallback(m => {
      const f = a.current;
      return f ? _fo(m.clientX, m.clientY, f.getBoundingClientRect(), f.offsetWidth, f.offsetHeight) : {
        x: 0,
        y: 0
      };
    }, []),
    u = g.useCallback(m => {
      !t || !a.current || (m.stopPropagation(), m.preventDefault(), s.current = d(m), o({
        x: s.current.x,
        y: s.current.y,
        w: 0,
        h: 0
      }), m.currentTarget.setPointerCapture(m.pointerId));
    }, [t, d]),
    h = g.useCallback(m => {
      if (!s.current || !a.current) return;
      const f = d(m);
      o({
        x: Math.min(s.current.x, f.x),
        y: Math.min(s.current.y, f.y),
        w: Math.abs(f.x - s.current.x),
        h: Math.abs(f.y - s.current.y)
      });
    }, [d]),
    p = g.useCallback(() => {
      const m = l.current,
        f = a.current;
      s.current && m && m.w >= 4 && m.h >= 4 && f && n(xfo({
        left: m.x,
        top: m.y,
        width: m.w,
        height: m.h
      }, f.offsetWidth || 1, f.offsetHeight || 1)), s.current = null, o(null);
    }, [n]);
  return c.jsxs("div", {
    ref: a,
    "data-testid": "layer-split-marquee-overlay",
    "data-layer-split-marquee-overlay": !0,
    "data-crop-select-mode": t ? "true" : void 0,
    "data-crop-select-overlay": t ? "" : void 0,
    onPointerDown: u,
    onPointerMove: h,
    onPointerUp: p,
    className: `absolute z-[80] overflow-hidden rounded-2xl ${r || "inset-0"} ${t ? "cursor-crosshair" : "pointer-events-none"}`,
    children: [t ? c.jsx("div", {
      className: "pointer-events-none absolute inset-0 bg-black/10"
    }) : null, e.map((m, f) => {
      const [y, b, v, _] = m.bbox;
      return c.jsx("div", {
        "data-testid": `layer-split-region-${f + 1}`,
        className: "pointer-events-none absolute border border-solid border-white bg-white/[0.12]",
        style: {
          left: `${y / 10}%`,
          top: `${b / 10}%`,
          width: `${(v - y) / 10}%`,
          height: `${(_ - b) / 10}%`,
          mixBlendMode: "plus-lighter"
        }
      }, m.refId);
    }), i ? c.jsx("div", {
      className: "pointer-events-none absolute border border-dashed border-white bg-black/20",
      style: {
        left: i.x,
        top: i.y,
        width: i.w,
        height: i.h
      }
    }) : null]
  });
}

const Dbr = g.memo(function ({
  node: t,
  documentSession: n,
  selectedNodeId: r = null,
  setSelectedNodeId: a,
  setSelectedNodeIds: i,
  nodes: o,
  isDark: s,
  updateNode: l,
  deleteNode: d,
  apiConfigs: u,
  showHuyaModels: h = !1,
  expandImageConfigs: p,
  isModelHiddenInList: m,
  apiStatus: f,
  globalApiKey: y,
  generationTimers: b,
  getConnectedInputImages: v,
  getConnectedInputItems: _,
  getConnectedImageForInput: w,
  connectingSource: k,
  connectingTarget: A,
  connectingInputType: S,
  setConnectingSource: C,
  setConnectingTarget: I,
  setConnectingInputType: E,
  setConnections: M,
  connections: T,
  canvasRef: P,
  view: R,
  setMousePos: j,
  characterLibrary: B,
  setCharactersOpen: F,
  klingSubjectLibrary: N,
  setKlingSubjectsOpen: G,
  promptLibrary: z,
  setPromptLibrary: V,
  promptLibraryCollapsed: O,
  setPromptLibraryCollapsed: L,
  promptLibraryEditorOpen: D,
  setPromptLibraryEditorOpen: U,
  promptLibraryForm: H,
  setPromptLibraryForm: Y,
  activeDropdown: K = null,
  setActiveDropdown: W = hP,
  generate: Q,
  generateId: q,
  setNodes: ne,
  nodeDirtyVersion: de = 0,
  setLightboxItem: le,
  setLightboxOpen: J,
  setPreviewContextMenu: pe,
  isCompactUiMode: ce = !1,
  onStartCompactRefCanvasPick: we,
  compactCanvasPickResumeSnap: X,
  compactRefCanvasPickTargetId: Z = null,
  storyboardCanvasPickTarget: re = null,
  generationHistory: fe = [],
  isGenerationTimerActive: ye = !1,
  materialLibraryTree: ie = null,
  getMaterialLibraryPreviewUrl: ae,
  getMaterialLibraryPreviewForCanvas: be,
  renderQuality: Ee = "high",
  enableGenerationNodeAnimation: xe = !0,
  showStartGenerateButton: he = !0,
  onGenInlineDirectorUiChange: ue,
  onGenPromptPanelUiChange: ge,
  renderVariant: _e,
  fullOverlay: ke,
  latestVideoInfoRef: ve,
  compactUi: Te,
  compactWidgetPromptOpen: Ne,
  genOverlayUiOpen: me = !1,
  focusEditActive: Ae = !1,
  onToggleFocusEdit: Fe,
  runExpandImage: Me,
  runEditImage: Re,
  setHistory: $e,
  setCroppingNodeId: rt,
  canvasPortalRef: nt,
  onDownloadSelected: ze
}) {
  var $0, t4, F9, Zb, v_, Qx, n4, NI, jI, i8, Sn, Or, oa, ia, qa, mi, ro, Di, _o, po, Ao, Fo, hs, Rs, xs, Lu, Sm, Vf, Hf, Yx, kA, ee, se, Pe, ot, Nt, mn, hr, ra, ka, ti, Li, zi, Ni, Io, zo, Jo;
  on();
  const Le = khr(t.id),
    Ke = ua() && Le !== "off",
    Xe = _He(t) || !Ke || !gUe(Le),
    [De, Ye] = g.useState(() => {
      var sn;
      return !!((sn = t.settings) != null && sn.genUseAliyunOss);
    }),
    [Ce, He] = g.useState(() => ua()),
    [Ve, it] = g.useState(() => Ph()),
    [It, Ft] = g.useState(!1),
    [We, Ze] = g.useState(() => mo()),
    Ge = g.useRef(t.settings);
  g.useEffect(() => {
    Ge.current = t.settings;
  }, [t.settings]);
  const Oe = g.useRef(o),
    st = g.useRef(T),
    vt = g.useRef(!1),
    Ht = g.useRef([]);
  Oe.current = o, st.current = T, g.useEffect(() => {
    var sn;
    Ye(!!((sn = t.settings) != null && sn.genUseAliyunOss));
  }, [t.id, ($0 = t.settings) == null ? void 0 : $0.genUseAliyunOss]), g.useEffect(() => {
    const sn = () => {
      He(ua()), it(Ph()), Ze(mo());
    };
    return sn(), window.addEventListener(go, sn), () => window.removeEventListener(go, sn);
  }, []), g.useEffect(() => {
    if (Ve || Ce || !De) return;
    Ye(!1);
    const sn = {
      ...Ge.current
    };
    sn.genUseAliyunOss && l(t.id, {
      settings: {
        ...sn,
        genUseAliyunOss: !1
      }
    });
  }, [Ve, Ce, De, t.id, l]);
  const [nn, pt] = g.useState(!0),
    [lt, gt] = g.useState(null),
    [Ut, _t] = g.useState(z);
  g.useEffect(() => {
    _t(z);
  }, [z]);
  const At = g.useCallback(sn => {
      _t(sn), V(sn);
    }, [V]),
    [Yt, qe] = g.useState(null),
    [kt, St] = g.useState(void 0),
    [hn, Qt] = g.useState(0),
    [Ot, ln] = g.useState(0);
  g.useEffect(() => {
    const sn = Tn => {
      if (!T) return;
      T.filter(Tr => Tr.to === t.id && Tr.from === Tn.detail.nodeId).length > 0 && Qt(Tr => Tr + 1);
    };
    return window.addEventListener("multiAngleUpdated", sn), () => {
      window.removeEventListener("multiAngleUpdated", sn);
    };
  }, [T, t.id]), g.useEffect(() => {
    const sn = Tn => {
      var Qr, Sa;
      if (!T) return;
      const lr = String(((Qr = Tn.detail) == null ? void 0 : Qr.nodeId) || "").trim();
      !lr || !T.some(Ka => Ka.to === t.id && Ka.from === lr && (!Ka.inputType || Ka.inputType === "default")) && lr !== t.id || (ln(Ka => Ka + 1), (Sa = Tn.detail) != null && Sa.dismissed && wi(!1));
    };
    return window.addEventListener("inputImageLightingUpdated", sn), () => {
      window.removeEventListener("inputImageLightingUpdated", sn);
    };
  }, [T, t.id]), g.useEffect(() => {
    const sn = Tn => {
      var lr;
      ((lr = Tn.detail) == null ? void 0 : lr.nodeId) === t.id && Qt(Tr => Tr + 1);
    };
    return window.addEventListener("multiAngleUpdated", sn), () => {
      window.removeEventListener("multiAngleUpdated", sn);
    };
  }, [t.id]);
  const Pn = g.useCallback(() => {
      var Va;
      if (t.type !== "gen-image" && t.type !== "gen-video") return null;
      const sn = Oe.current,
        Tr = st.current.filter(Ci => Ci.from === t.id).map(Ci => {
          const Ji = sn.find(Os => Os.id === Ci.to);
          return (Ji == null ? void 0 : Ji.type) === "preview" ? Ji.id : null;
        }).filter(Ci => Ci !== null);
      if (Tr.length > 0) {
        const Ci = (Va = t.settings) == null ? void 0 : Va.selectedPreviewId;
        return Ci && Tr.includes(Ci) ? Ci : Tr[Tr.length - 1];
      }
      const Qr = q(),
        Sa = t.nodeName || (t.type === "gen-video" ? "生成视频" : "生成图片"),
        Ka = Ki(Qr, "preview", t.x + t.width + 80, t.y, Sa, void 0, sn);
      Ka.width = 400, Ka.height = 400, console.log("[autoConnectPreviewNode] 创建新预览节点:", Qr, "位置:", Ka.x, Ka.y);
      const ma = {
        id: q(),
        from: t.id,
        to: Qr,
        fromPort: "output",
        toPort: "input"
      };
      return console.log("[autoConnectPreviewNode] 创建连接:", ma), Da.unstable_batchedUpdates(() => {
        ne(Ci => [...Ci, Ka]), M(Ci => [...Ci, ma]), l(t.id, {
          settings: {
            ...(t.settings || {}),
            selectedPreviewId: Qr
          }
        });
      }), Qr;
    }, [t, q, ne, M, l]),
    rn = j$r(((t4 = t.settings) == null ? void 0 : t4.model) || (t.type === "gen-image" ? "qwen-image-edit" : "sora-2")),
    Yn = U5(rn),
    Ct = !Yn && lIe(rn),
    Cn = !Yn && Iu(rn),
    un = Y1(rn);
  whe(rn);
  const Jn = zv(rn);
  E3(rn);
  const Kn = D4i(t, _e),
    en = Kn === "compact",
    Vn = Te ?? Buo(),
    {
      compactWidgetPromptOpen: Tt,
      compactWidgetPromptOpenRef: Ue,
      compactPromptAutoFocusSeq: et,
      isCompactFloatingPromptPanel: ft,
      suppressCompactPromptOnPreviewClick: ht,
      compactWidgetRootRef: wt,
      compactGenPreviewRef: jt,
      compactGenPreviewAnchorRef: bt,
      compactGenStackRef: Bt,
      computeCompactStackAlignRef: wn,
      compactGenAlignSettleUntilRef: at,
      openCompactWidgetPromptPanel: Pt,
      closeCompactWidgetPromptPanel: dt,
      restoreGenNodeCanvasSelection: xt,
      handleCompactPreviewPointerDown: yn
    } = Vn,
    gn = Ne ?? Tt,
    [mt, Xt] = g.useState(!1);
  g.useEffect(() => {
    if (!en || !gn) {
      Xt(!1);
      return;
    }
    let sn = !1;
    return Id().then(() => {
      sn || Xt(!0);
    }), () => {
      sn = !0;
    };
  }, [en, gn]);
  const Gn = g.useCallback(() => {
      Ae || dt(), Fe == null || Fe();
    }, [Ae, Fe, dt]),
    rr = ke ?? Luo(),
    {
      wan26AudioError: qn,
      setWan26AudioError: Dn,
      wan26AudioFileInputRef: Ar,
      showAudioSegmentSelector: _r,
      pendingAudioFile: Pa,
      showVideoSegmentSelector: fa,
      pendingVideoFile: Ca,
      wan26AudioSegment: $n,
      klingVideoSegment: yr,
      showKlingSubjectSelector: Ir,
      setShowKlingSubjectSelector: Gr,
      showKlingImageUploadPanel: Zr,
      setShowKlingImageUploadPanel: La,
      klingVideoFileInputRef: sa,
      setShowAudioSegmentSelector: Ea,
      setPendingAudioFile: ba,
      setWan26AudioSegment: ga,
      setShowVideoSegmentSelector: _a,
      setPendingVideoFile: $a,
      setKlingVideoSegment: Ya,
      handleAudioSegmentConfirm: ta,
      handleVideoSegmentConfirm: ki
    } = rr,
    Wn = g.useRef(null),
    wr = g.useRef(null),
    [jn, _n] = g.useState(null),
    ar = Kn === "full",
    Vt = g.useRef({}),
    vn = ve ?? Vt,
    An = 440;
  g.useEffect(() => {
    en || t.type !== "gen-video" || !jv(rn) || (t.width ?? 320) >= An || l(t.id, {
      width: An
    });
  }, [en, t.type, t.id, t.width, rn, l]);
  const {
      availableModels: ur,
      modelDropdownOptionKeys: zr,
      modelDropdownMenuWidth: Dr,
      currentModelConfig: Wr,
      isModelOptionSelected: gr,
      isModelDropdownOpen: jr,
      modelDropdownButtonRef: ea,
      durationDropdownButtonRef: pa,
      ratioDropdownButtonRef: Br,
      selectedChannel: tn,
      onSelectChannel: Lr,
      showHaiyiChannel: br
    } = Hdo({
      node: t,
      apiConfigs: u,
      apiStatus: f,
      globalApiKey: y,
      currentModel: rn,
      activeDropdown: K,
      setActiveDropdown: W
    }),
    {
      connectedImages: Jr,
      connectedImageItems: Kr
    } = Zco({
      node: t,
      currentModel: rn,
      getConnectedInputImages: v,
      getConnectedInputItems: _,
      connections: T,
      nodeDirtyVersion: de
    }),
    ir = g.useCallback((sn, Tn) => {
      var Tr;
      const lr = String(Tn || "").trim();
      return (Tr = Kr.find(Qr => String(Qr.url || "").trim() === lr)) == null ? void 0 : Tr.assetId;
    }, [Kr]),
    Hr = !en || gn && mt,
    [ha, Ga] = g.useState(() => new Map()),
    [Za, va] = g.useState(() => new Set()),
    Kt = g.useRef(new Map());
  g.useEffect(() => {
    Kt.current = ha;
  }, [ha]), g.useEffect(() => {
    if (!Hr) return;
    let sn = !1;
    const Tn = new Set(Jr),
      lr = Sa => {
        Sa.length !== 0 && va(Ka => {
          const ma = new Set(Ka);
          return Sa.forEach(Va => ma.delete(Va)), ma.size === Ka.size ? Ka : ma;
        });
      },
      Tr = () => {
        Ga(Sa => {
          const Ka = new Map();
          for (const [ma, Va] of Sa) Tn.has(ma) && Ka.set(ma, Va);
          return Ka.size === Sa.size ? Sa : Ka;
        }), va(Sa => {
          const Ka = new Set();
          for (const ma of Sa) Tn.has(ma) && Ka.add(ma);
          return Ka.size === Sa.size ? Sa : Ka;
        });
      };
    return (async () => {
      const Sa = [];
      if (Jr.forEach((ma, Va) => {
        if (vP(ma)) return;
        const Ci = yy(ma, ir(Va, ma));
        SE(ma, Ci) && (!Ci && !Er.isContentRef(ma) || Kt.current.has(ma) || Sa.push({
          rawUrl: ma,
          assetId: Ci || ""
        }));
      }), sn || (Tr(), Sa.length > 0 && va(ma => {
        const Va = new Set(ma);
        for (const Ci of Sa) Va.add(Ci.rawUrl);
        return Va;
      })), Sa.length === 0) return;
      const Ka = 4;
      for (let ma = 0; ma < Sa.length && !sn; ma += Ka) {
        const Va = Sa.slice(ma, ma + Ka);
        await Promise.all(Va.map(async ({
          rawUrl: Ci,
          assetId: Ji
        }) => {
          if (!sn) try {
            const Os = await dHe(Ci, Ji || void 0);
            if (sn || !Os) return;
            Ga(Vo => {
              const As = new Map(Vo);
              return As.set(Ci, Os), As;
            });
          } catch {} finally {
            sn || lr([Ci]);
          }
        }));
      }
    })(), () => {
      sn = !0;
    };
  }, [Jr, ir, Hr]);
  const [Pr, kr] = g.useState(() => new Map()),
    Mr = g.useRef(new Map()),
    Hn = g.useRef(new Set()),
    $t = g.useRef(new Set());
  g.useEffect(() => {
    Mr.current = Pr;
  }, [Pr]), g.useEffect(() => {
    if (!Hr) return;
    let sn = !1;
    const Tn = new Set(Jr);
    return kr(Tr => OUt(Tr, Tn, $t.current)), (async () => {
      const Tr = [];
      for (let Qr = 0; Qr < Jr.length; Qr++) {
        const Sa = Jr[Qr];
        if (!/^https?:\/\//i.test(Sa)) continue;
        const Ka = yy(Sa, ir(Qr, Sa));
        if (!SE(Sa, Ka)) {
          if (sn) break;
          if (!Mr.current.has(Sa) && !Hn.current.has(Sa)) {
            Hn.current.add(Sa);
            try {
              await ni.init();
              const ma = await ni.getAssetBlobByRemoteUrl(Sa);
              if (!ma || sn || !Tn.has(Sa)) continue;
              const Va = URL.createObjectURL(ma);
              if ($t.current.add(Va), sn || !Tn.has(Sa)) {
                fj(Va, $t.current);
                continue;
              }
              Tr.push([Sa, Va]);
            } catch {} finally {
              Hn.current.delete(Sa);
            }
          }
        }
      }
      if (sn) {
        for (const [, Qr] of Tr) fj(Qr, $t.current);
        return;
      }
      Tr.length !== 0 && kr(Qr => {
        const Sa = new Map(Qr);
        return Tr.forEach(([Ka, ma]) => {
          Tn.has(Ka) ? Sa.set(Ka, ma) : fj(ma, $t.current);
        }), Sa;
      });
    })(), () => {
      sn = !0;
    };
  }, [Jr, ir, Hr]), g.useEffect(() => () => {
    $t.current.forEach(sn => {
      try {
        URL.revokeObjectURL(sn);
      } catch {}
    }), $t.current.clear(), Hn.current.clear();
  }, []);
  const je = g.useMemo(() => {
      const sn = kY(T || [], o || [], t.id);
      return Jr.map((Tn, lr) => {
        var zc, Dp, Im, AA;
        const Tr = pU(Tn, {
            scopeNodeId: t.id,
            connections: T || [],
            nodes: o || [],
            imageSourceMap: sn
          }),
          Qr = Tr ? o.find(l0 => l0.id === Tr) : void 0,
          Sa = yy(Tn, ir(lr, Tn) || Qr && a5e(Qr) || void 0),
          Ka = SE(Tn, Sa),
          ma = ha.get(Tn),
          Va = (zc = t.settings) == null ? void 0 : zc.referenceImageThumbnails,
          Ci = (Dp = t.settings) == null ? void 0 : Dp.referenceImages,
          Os = (Va == null ? void 0 : Va[Tn]) || ((Im = t.settings) != null && Im._tableBatchSourceId && (Ci == null ? void 0 : Ci.length) === 1 && Ci[0] === Tn ? String(((AA = t.settings) == null ? void 0 : AA._batchReferenceThumb) || "") : "") || wk(Tn, Qr),
          Vo = vP(Tn),
          As = Ka && !Vo && !ma && !Os && Za.has(Tn),
          Ql = pHe({
            syncDisplay: Os,
            localPreferredUrl: ma,
            resolvedThumbUrl: Pr.get(Tn),
            rawUrl: Tn,
            preferLocalRef: Ka
          }),
          yl = mHe(Tn, lr, Kr),
          Jd = yl ?? mU(Tn, yl, Qr);
        return {
          imgSrc: Tn,
          refAssetId: Sa,
          referenceThumbSrc: Ql,
          isResolvingLocalRef: As,
          mediaType: Jd,
          sourceNode: Qr
        };
      });
    }, [Jr, ir, ha, Za, Pr, t.id, T, o, v, Kr, (F9 = t.settings) == null ? void 0 : F9.referenceImageThumbnails, (Zb = t.settings) == null ? void 0 : Zb.referenceImages, (v_ = t.settings) == null ? void 0 : v_._batchReferenceThumb, (Qx = t.settings) == null ? void 0 : Qx._tableBatchSourceId]),
    [Qe, Mt] = g.useState({}),
    cn = g.useRef(new Set()),
    Qn = g.useRef(new Set()),
    Lt = g.useRef(new Set());
  g.useEffect(() => {
    if (!Hr) return;
    const sn = new Set();
    for (const Tn of je) Tn.referenceThumbSrc && sn.add(Tn.referenceThumbSrc), Tn.imgSrc && sn.add(Tn.imgSrc);
    Lt.current = sn, Mt(Tn => BUt(Tn, sn)), oue(Qn.current, sn), oue(cn.current, sn);
    for (const Tn of je) {
      const lr = Tn.referenceThumbSrc;
      if (!lr || Tn.isResolvingLocalRef || Tn.mediaType === "audio" || Qn.current.has(lr) || cn.current.has(lr)) continue;
      if (Tn.mediaType === "video") {
        const Sa = fU(Tn.imgSrc, lr, Tn.sourceNode) || (Tn.sourceNode && dx(xf(Tn.sourceNode), "video") ? xf(Tn.sourceNode) : "");
        if (Sa) {
          Qn.current.add(lr), Mt(Va => Va[lr] && Va[Tn.imgSrc] ? Va : {
            ...Va,
            [lr]: Va[lr] || Sa,
            [Tn.imgSrc]: Va[Tn.imgSrc] || Sa
          });
          continue;
        }
        const Ka = iZ(Tn.imgSrc, lr, Tn.sourceNode);
        if (!Ka) continue;
        cn.current.add(lr);
        const ma = lr;
        Wdo(Ka).then(Va => {
          cn.current.delete(ma), Lt.current.has(ma) && (Qn.current.add(ma), Mt(Ci => {
            const Ji = Lt.current.has(Tn.imgSrc);
            return Ci[ma] && (!Ji || Ci[Tn.imgSrc]) ? Ci : {
              ...Ci,
              [ma]: Ci[ma] || Va,
              ...(Ji ? {
                [Tn.imgSrc]: Ci[Tn.imgSrc] || Va
              } : {})
            };
          }));
        }).catch(() => {
          cn.current.delete(ma);
        });
        continue;
      }
      if (!(lr.startsWith("blob:") || lr.startsWith("data:image") && lr.length > 1e5)) continue;
      cn.current.add(lr);
      const Qr = lr;
      Ix(Qr, 256).then(({
        url: Sa
      }) => {
        cn.current.delete(Qr), Lt.current.has(Qr) && (Qn.current.add(Qr), Mt(Ka => Ka[Qr] ? Ka : {
          ...Ka,
          [Qr]: Sa
        }));
      }).catch(() => {
        cn.current.delete(Qr);
      });
    }
    return () => {
      Lt.current = new Set();
    };
  }, [je, Hr]);
  const ct = g.useMemo(() => Qqe(rn) || Ip(rn) || Ih(rn) || Db(rn) || aw(rn) || Lb(rn) || Kv(rn), [rn]),
    Dt = g.useMemo(() => t.type !== "gen-video" || !ct || !T || !o ? [] : zco(t.id, o, T), [t.id, t.type, rn, T, o, de]);
  g.useEffect(() => {
    var Sa, Ka;
    if (t.type !== "gen-video" || !ct) return;
    const sn = (((Sa = t.settings) == null ? void 0 : Sa.seedanceDismissedMaterialIds) || []).filter(Boolean),
      Tn = ((Ka = t.settings) == null ? void 0 : Ka.seedanceMaterials) || [],
      lr = Fco(Tn, Dt, sn),
      Tr = new Set(Dt.map(ma => ma.id)),
      Qr = new Set(Dt.map(ma => {
        var Va;
        return (Va = N6(ma.id)) == null ? void 0 : Va.fromId;
      }).filter(Boolean));
    if ((JSON.stringify(lr.map(ma => ma.id)) !== JSON.stringify(Tn.map(ma => ma.id)) || JSON.stringify(lr.map(ma => ma.type)) !== JSON.stringify(Tn.map(ma => ma.type)) || JSON.stringify(lr.map(ma => ma.url)) !== JSON.stringify(Tn.map(ma => ma.url)) || JSON.stringify(lr.map(ma => ma.assetUrl || "")) !== JSON.stringify(Tn.map(ma => ma.assetUrl || "")) || JSON.stringify(lr.map(ma => ma._cacheAssetId || "")) !== JSON.stringify(Tn.map(ma => ma._cacheAssetId || ""))) && l(t.id, {
      settings: {
        ...t.settings,
        seedanceMaterials: lr
      }
    }), sn.length > 0) {
      const ma = sn.filter(Va => {
        var Ji;
        if (Tr.has(Va)) return !0;
        const Ci = (Ji = N6(Va)) == null ? void 0 : Ji.fromId;
        return !!(Ci && Qr.has(Ci));
      });
      ma.length !== sn.length && l(t.id, {
        settings: {
          ...t.settings,
          seedanceDismissedMaterialIds: ma
        }
      });
    }
  }, [t.type, t.id, t.settings, rn, Dt, l, ct]);
  const bn = g.useMemo(() => {
      var Tn;
      return t.type !== "gen-video" || !ct ? [] : (((Tn = t.settings) == null ? void 0 : Tn.seedanceMaterials) || []).map(lr => Vfn(lr, t.id, T, o));
    }, [t.type, t.id, (n4 = t.settings) == null ? void 0 : n4.seedanceMaterials, rn, ct, T, o]),
    Rt = j1(bn, {
      useOriginal: !0,
      allowDirectOssUrl: !0,
      preferConstantDisplay: !0
    }),
    fn = g.useMemo(() => {
      var lr;
      if (t.type !== "gen-video" || !ct) return new Map();
      const sn = ((lr = t.settings) == null ? void 0 : lr.seedanceMaterials) || [],
        Tn = new Map();
      return sn.forEach((Tr, Qr) => {
        Tn.set(Tr.id, Rt[Qr]);
      }), Tn;
    }, [t.type, ct, (NI = t.settings) == null ? void 0 : NI.seedanceMaterials, Rt]),
    Zt = g.useMemo(() => {
      var sn;
      if (t.type === "gen-video" && ct) return ((sn = t.settings) == null ? void 0 : sn.seedanceMaterials) || [];
    }, [t.type, rn, (jI = t.settings) == null ? void 0 : jI.seedanceMaterials, ct]),
    Ln = g.useMemo(() => {
      if (t.type !== "gen-image") return [];
      const sn = _st(t.id, o, T || []);
      if (!sn) return [];
      const Tn = new Set(),
        lr = [];
      for (const Tr of $de(sn.id, o, T || [])) for (const Qr of Tr.nodeIds) {
        if (Tn.has(Qr)) continue;
        Tn.add(Qr);
        const Sa = o.find(ma => ma.id === Qr),
          Ka = YCe(Sa);
        Ka && lr.push({
          imgSrc: Ka,
          referenceThumbSrc: Ka,
          isResolvingLocalRef: !1,
          mediaType: "image",
          sourceNode: Sa,
          seedanceMaterial: void 0
        });
      }
      return lr;
    }, [t.type, t.id, o, T]),
    tt = g.useMemo(() => {
      var Qr, Sa, Ka;
      if (pP(t) && !((Qr = t.settings) != null && Qr.metasoMixedReferences)) return [];
      if (t.type === "gen-video" && ct) return (((Sa = t.settings) == null ? void 0 : Sa.seedanceMaterials) || []).map(Va => {
        const Ci = fn.get(Va.id),
          Ji = Ci == null ? void 0 : Ci.content,
          Os = eyr(Va.id, t.id, T, o) ?? void 0,
          Vo = Vfn(Va, t.id, T, o) || (Os ? wk(Va.url, Os) : ""),
          As = Ji || Vo || Va.url,
          Ql = yy(Va.url, Va._cacheAssetId || (Os ? gDe(Os) : void 0));
        return {
          imgSrc: Va.url,
          refAssetId: Ql,
          referenceThumbSrc: Ci != null && Ci.isLoading && !Vo ? "" : As,
          isResolvingLocalRef: !!(Ci != null && Ci.isLoading && !Vo),
          mediaType: (Os == null ? void 0 : Os.type) === "gen-image" ? "image" : mU(Va.url, Va.type, Os),
          sourceNode: Os,
          seedanceMaterial: Va
        };
      });
      const sn = je.map(ma => ({
          ...ma,
          seedanceMaterial: void 0
        })),
        Tn = new Set(sn.map(ma => {
          var Va;
          return (Va = ma.sourceNode) == null ? void 0 : Va.id;
        }).filter(Boolean)),
        Tr = [...Ln.filter(ma => {
          var Va;
          return !((Va = ma.sourceNode) != null && Va.id) || !Tn.has(ma.sourceNode.id);
        }), ...sn];
      if ((Ka = t.settings) != null && Ka.metasoMixedReferences) {
        const ma = [w(t.id, "veo_start"), w(t.id, "veo_end")].filter(Boolean);
        return [...ma.flatMap(Ci => Tr.filter(Ji => Ji.imgSrc === Ci)), ...Tr.filter(Ci => !ma.includes(Ci.imgSrc))];
      }
      return Tr;
    }, [t.type, t.id, (i8 = t.settings) == null ? void 0 : i8.seedanceMaterials, (Sn = t.settings) == null ? void 0 : Sn.veoFramesMode, (Or = t.settings) == null ? void 0 : Or.metasoMixedReferences, (oa = t.settings) == null ? void 0 : oa.model, ct, fn, T, o, je, Ln, w]);
  Jco({
    node: t,
    currentModel: rn,
    updateNode: l
  });
  const zt = g.useRef(null),
    an = g.useMemo(() => t.type !== "gen-video" ? "" : T.filter(sn => sn.to === t.id).map(sn => `${sn.id}:${sn.inputType || "default"}:${sn.from}`).join("|"), [t.type, t.id, T]);
  g.useEffect(() => {
    if (t.type !== "gen-video") return;
    const sn = pP(t),
      Tn = zt.current;
    zt.current = sn, sn ? M(lr => v1i(lr, t.id, o)) : Tn === !0 && M(lr => w1i(lr, t.id));
  }, [t.type, t.id, (ia = t.settings) == null ? void 0 : ia.veoFramesMode, (qa = t.settings) == null ? void 0 : qa.model, rn, o, an, M, t]);
  const Rn = g.useMemo(() => t.type === "gen-video" ? w(t.id, "veo_start") : null, [t.type, t.id, w, T, de]),
    Un = g.useMemo(() => t.type === "gen-video" ? w(t.id, "veo_end") : null, [t.type, t.id, w, T, de]),
    er = g.useMemo(() => RUe(T, t.id), [T, t.id]),
    Cr = g.useCallback((sn, Tn) => {
      Tn.preventDefault(), Tn.stopPropagation(), M(lr => lr.filter(Tr => !(Tr.to === t.id && Tr.inputType === sn)));
    }, [t.id, M]),
    tr = g.useMemo(() => {
      var sn;
      if (pP(t) && !((sn = t.settings) != null && sn.metasoMixedReferences)) {
        const Tn = [],
          lr = (Tr, Qr, Sa) => {
            if (!Qr) return;
            const Ka = dx(Qr, "image") ? Qr : void 0;
            Tn.push({
              position1Based: Tr,
              mediaType: "image",
              nodeName: Sa,
              thumbSrc: Ka
            });
          };
        return lr(1, Rn, "首帧"), lr(2, Un, "尾帧"), Tn;
      }
      return tt.map((Tn, lr) => {
        var Ci, Ji, Os, Vo;
        const Tr = lr + 1,
          Qr = Tn.referenceThumbSrc || Tn.imgSrc;
        let Sa;
        if (Tn.mediaType === "audio") Sa = void 0;else if (Tn.mediaType === "video") Sa = Qr && Qe[Qr] || Qe[Tn.imgSrc] || fU(Tn.imgSrc, Qr, Tn.sourceNode) || (Tn.sourceNode && dx(xf(Tn.sourceNode), "video") ? xf(Tn.sourceNode) : void 0) || void 0;else {
          const As = Qr && Qe[Qr] || Tn.referenceThumbSrc || Tn.imgSrc || void 0;
          Sa = As && dx(As, Tn.mediaType) ? As : void 0;
        }
        const Ka = (Ji = (Ci = Tn.sourceNode) == null ? void 0 : Ci.nodeName) == null ? void 0 : Ji.trim(),
          ma = (Vo = (Os = Tn.seedanceMaterial) == null ? void 0 : Os.name) == null ? void 0 : Vo.trim(),
          Va = Tn.mediaType === "video" ? "视频" : Tn.mediaType === "audio" ? "音频" : "参考图";
        return {
          position1Based: Tr,
          mediaType: Tn.mediaType,
          nodeName: Ka || ma || Va,
          thumbSrc: Sa
        };
      });
    }, [t, t.type, (mi = t.settings) == null ? void 0 : mi.veoFramesMode, (ro = t.settings) == null ? void 0 : ro.model, Rn, Un, tt, Qe]),
    kn = g.useMemo(() => {
      var sn;
      return t.type !== "gen-video" || !ct ? 0 : (((sn = t.settings) == null ? void 0 : sn.seedanceMaterials) || []).length;
    }, [t.type, ct, (Di = t.settings) == null ? void 0 : Di.seedanceMaterials]),
    xn = Yco({
      node: t,
      updateNode: l,
      documentSession: n,
      currentModel: rn,
      enabled: ct,
      replaceIndexRef: wr
    }),
    Fn = g.useCallback(sn => {
      const Tn = qco(t, T, sn);
      Tn.connectionId && M(lr => lr.filter(Tr => Tr.id !== Tn.connectionId)), l(t.id, {
        settings: Tn.settings
      });
    }, [t, T, M, l]),
    cr = g.useCallback(async (sn, Tn) => {
      var Ka;
      if (!le || !J) return;
      const lr = ((Ka = Rt[Tn]) == null ? void 0 : Ka.content) ?? (sn.url.startsWith("content_ref:") ? void 0 : sn.url);
      if (!lr || lr.startsWith("content_ref:")) return;
      let Tr = typeof sn._cacheAssetId == "string" && sn._cacheAssetId.trim() || vm(lr) || null;
      if (!Tr && sn.id.startsWith("seedance-conn-")) {
        const Va = sn.id.slice("seedance-conn-".length),
          Ci = Va.lastIndexOf("-");
        if (Ci > 0) {
          const Ji = Va.slice(0, Ci),
            Os = parseInt(Va.slice(Ci + 1), 10),
            Vo = o == null ? void 0 : o.find(As => As.id === Ji);
          if (Vo) Tr = gDe(Vo) ?? null;else if (!Number.isNaN(Os) && T) {
            const As = T.filter(yl => yl.to === t.id && (!yl.inputType || yl.inputType === "default")),
              Ql = o == null ? void 0 : o.find(yl => {
                var Jd;
                return yl.id === ((Jd = As[Os]) == null ? void 0 : Jd.from);
              });
            Ql && (Tr = gDe(Ql) ?? null);
          }
        }
      }
      let Qr = lr;
      if (sn.type === "image" && Qr.startsWith("blob:")) {
        const ma = await exe(Qr, Tr, null);
        ma && (Qr = ma);
      }
      const Sa = sn.type === "video" ? "video" : sn.type === "audio" ? "audio" : "image";
      le({
        url: Qr,
        type: Sa,
        id: sn.id,
        prompt: t.prompt || "",
        modelName: rn
      }), J(!0);
    }, [le, J, Rt, o, T, t.id, t.prompt, rn]),
    vr = g.useMemo(() => uCe(ie ?? null), [ie]),
    Wt = g.useMemo(() => t.type === "gen-video" ? ["image", "video"] : ["image"], [t.type]),
    Jt = g.useMemo(() => t.type === "gen-image" || t.type === "gen-video" ? dCe(ie ?? null, {
      kinds: [...Wt]
    }) : [], [t.type, ie, Wt]),
    [Nn, En] = g.useState({});
  g.useEffect(() => {
    if (!ae || Jt.length === 0) {
      En(Tn => Object.keys(Tn).length === 0 ? Tn : {});
      return;
    }
    let sn = !1;
    return (async () => {
      const Tn = {},
        lr = Jt.slice(0, 160);
      await Promise.all(lr.map(async Tr => {
        try {
          const Qr = await ae(Tr.materialAsset);
          Qr && (Tn[Tr.id] = Qr);
        } catch {}
      })), sn || En(Tn);
    })(), () => {
      sn = !0;
    };
  }, [ae, Jt]);
  const Zn = g.useMemo(() => t.type !== "gen-image" && t.type !== "gen-video" ? [] : Jt.map(sn => ({
      id: sn.id,
      name: sn.name,
      category: sn.category,
      thumbnailUrl: Nn[sn.id] || "",
      materialAsset: sn.materialAsset,
      canvasMediaKind: sn.canvasMediaKind
    })), [t.type, Jt, Nn]),
    Sr = g.useMemo(() => {
      var Tn, lr, Tr;
      if (t.type !== "gen-image" && t.type !== "gen-video") return [];
      const sn = [];
      for (const Qr of o) if (Qr.id !== t.id) {
        if (Qr.type === "input-image") {
          const Sa = typeof Qr.content == "string" ? Qr.content.trim() : "",
            Ka = (Tn = Qr.settings) == null ? void 0 : Tn.imageUrl,
            ma = Sa || (typeof Ka == "string" ? Ka.trim() : "");
          if (!ma) continue;
          sn.push({
            id: `canvas-${Qr.id}`,
            name: Qr.nodeName || "画布图片",
            category: "从画布上选择",
            thumbnailUrl: ma,
            fromCanvas: !0,
            sourceCanvasNodeId: Qr.id,
            canvasAssetId: Qr._contentAssetId || ((lr = Qr.settings) == null ? void 0 : lr._assetId),
            canvasImageUrl: ma,
            canvasSourceNodeType: "input-image",
            canvasMediaKind: "image"
          });
          continue;
        }
        if (Qr.type === "gen-image" || Qr.type === "gen-video") {
          const Sa = Xl(Qr);
          if (!(Sa != null && Sa.url)) continue;
          const Ka = Qr.type === "gen-video" || Sh(Sa.url);
          sn.push({
            id: `canvas-${Qr.id}`,
            name: Qr.nodeName || (Qr.type === "gen-video" ? "画布 AI 视频" : "画布 AI 绘画"),
            category: "从画布上选择",
            thumbnailUrl: Sa.url,
            fromCanvas: !0,
            sourceCanvasNodeId: Qr.id,
            canvasAssetId: Sa.assetId || ((Tr = Qr.settings) == null ? void 0 : Tr._assetId),
            canvasImageUrl: Sa.url,
            canvasSourceNodeType: Qr.type === "gen-image" ? "gen-image" : "gen-video",
            canvasMediaKind: Ka ? "video" : "image"
          });
        }
      }
      return sn;
    }, [t.type, t.id, o]),
    Bn = g.useMemo(() => [...Sr, ...Zn], [Sr, Zn]),
    Et = g.useCallback(async sn => {
      var Vo;
      if (sn.fromCanvas && sn.sourceCanvasNodeId) {
        const As = sn.sourceCanvasNodeId;
        if (As === t.id) return;
        const Ql = o.find(yl => yl.id === As);
        if (!Ql) return;
        if (Ql.type === "input-image") {
          const yl = typeof Ql.content == "string" ? Ql.content.trim() : "",
            Jd = (Vo = Ql.settings) == null ? void 0 : Vo.imageUrl;
          if (!(yl || (typeof Jd == "string" ? Jd.trim() : ""))) return;
        } else if (Ql.type === "gen-image" || Ql.type === "gen-video") {
          const yl = Xl(Ql);
          if (!(yl != null && yl.url)) return;
        } else return;
        M(yl => yl.some(zc => zc.from === As && zc.to === t.id && (!zc.inputType || zc.inputType === "default")) ? yl : [...yl, {
          id: q(),
          from: As,
          to: t.id,
          inputType: "default"
        }]);
        return;
      }
      const Tn = sn.materialAsset;
      if (!Tn) return;
      const {
          resolveMaterialLibraryAssetForCanvas: lr
        } = await Ie(async () => {
          const {
            resolveMaterialLibraryAssetForCanvas: As
          } = await Promise.resolve().then(() => U1);
          return {
            resolveMaterialLibraryAssetForCanvas: As
          };
        }, void 0, import.meta.url),
        Tr = await lr(Tn);
      let Qr = (Tr == null ? void 0 : Tr.content) || sn.thumbnailUrl || "";
      if (!Qr && ae && (Qr = (await ae(Tn)) || ""), !Qr) return;
      const Sa = o.find(As => As.id === t.id),
        Ka = (Sa == null ? void 0 : Sa.x) ?? t.x,
        ma = (Sa == null ? void 0 : Sa.y) ?? t.y,
        Va = T.filter(As => {
          if (As.to !== t.id || As.inputType && As.inputType !== "default") return !1;
          const Ql = o.find(yl => yl.id === As.from);
          return (Ql == null ? void 0 : Ql.type) === "input-image";
        }).length,
        Ci = q(),
        Ji = Tn.kind === "video",
        Os = Tn.name.replace(/\.[^/.]+$/, "");
      ne(As => {
        const Ql = Ka - 690,
          yl = ma - 32 + Va * 102,
          Jd = Ki(Ci, "input-image", Ql, yl, void 0, void 0, As),
          zc = {
            ...Jd,
            width: 95,
            height: 68,
            content: Qr,
            prompt: Ji ? Tn.name : Jd.prompt,
            settings: {
              ...(Jd.settings || {}),
              ...(Ji ? {
                mediaType: "video"
              } : {}),
              ...((Tr == null ? void 0 : Tr.settingsExtras) || {}),
              _materialLibraryPath: Tn.path,
              ...(Qr.startsWith("blob:") ? {
                _blobUrl: Qr
              } : {}),
              ...(Ji ? {
                musicTitle: Os
              } : {})
            }
          };
        return [...As, zc];
      }), M(As => [...As, {
        id: q(),
        from: Ci,
        to: t.id,
        inputType: "default"
      }]);
    }, [t.id, t.x, t.y, o, T, q, ne, M, be, ae]),
    {
      hasTextEditData: zn,
      connectedTextEditNodes: Mn,
      textEditPromptSummary: or,
      connectedMoveObjectNodes: mr,
      hasMoveObjectData: Yr,
      moveObjectPromptSummary: aa,
      lightingNodes: wa,
      connectedLightingNodes: xa,
      connectedPortraitTextureNodes: Aa,
      connectedMoodAdjustNodes: pn,
      connectedStoryboardNode: xr
    } = Hco({
      node: t,
      nodeIndex: bP(o),
      connections: mv(T, t.id),
      nodeDirtyVersion: de,
      lightingUpdateTrigger: Ot
    }),
    Nr = g.useMemo(() => {
      var Tn;
      if (!xr) return null;
      const sn = (Tn = xr.settings) == null ? void 0 : Tn.jsonData;
      return sn || null;
    }, [xr]),
    qr = g.useMemo(() => {
      if (!Nr) return null;
      try {
        return JSON.parse(Nr);
      } catch (sn) {
        return console.error("[GenImage] 解析分镜JSON数据失败:", sn), null;
      }
    }, [Nr]),
    {
      connectedTextNodes: Oa,
      connectedAgentNodes: Fa
    } = g.useMemo(() => {
      const sn = yJe(t.id, T, o);
      return {
        connectedTextNodes: sn.textNodes,
        connectedAgentNodes: sn.agentNodes
      };
    }, [t.id, T, o, de]),
    Ra = g.useMemo(() => Fde({
      nodeId: t.id,
      connections: T,
      nodes: o,
      storyboardJsonDataRaw: xr ? Nr : null
    }), [xr, Nr, o, t.id, T, de]),
    ui = g.useRef("");
  g.useEffect(() => {
    if (xr && Nr && Nr.trim()) {
      const sn = t.prompt || "";
      if (!sn || sn === ui.current) {
        const Tn = setTimeout(() => {
          l(t.id, {
            prompt: Nr
          }), ui.current = Nr;
        }, 100);
        return () => clearTimeout(Tn);
      } else if (sn !== ui.current && Nr !== ui.current && sn.trim().startsWith("{") && sn.trim().endsWith("}")) {
        const lr = setTimeout(() => {
          l(t.id, {
            prompt: Nr
          }), ui.current = Nr;
        }, 100);
        return () => clearTimeout(lr);
      }
    } else xr || (ui.current = "");
  }, [xr, Nr, t.id, t.prompt, l]);
  const pr = Ra.trim(),
    In = (t.prompt || "").trim(),
    na = !(!!In && !Y4(In) && (!pr || !E1e(In, pr))) && !xr && (Fa.length > 0 || Oa.length > 0);
  g.useEffect(() => {
    const sn = pr,
      Tn = (t.prompt || "").trim();
    !sn || !Tn || !E1e(Tn, sn) || l(t.id, {
      prompt: ""
    });
  }, [t.id, t.prompt, pr, l]);
  const Ba = g.useMemo(() => Object.values(wa).map(sn => sn.prompt).join(`
`).trim(), [wa]),
    ai = g.useMemo(() => Aa.map(sn => {
      var Tn;
      return nwe((Tn = sn.settings) == null ? void 0 : Tn.portraitTexture);
    }).filter(Boolean).join(`

`).trim(), [Aa]),
    vi = g.useMemo(() => pn.map(sn => {
      var Tn;
      return rwe((Tn = sn.settings) == null ? void 0 : Tn.moodAdjust);
    }).filter(Boolean).join(`

`).trim(), [pn]),
    {
      connectedAngleNodes: Vi,
      anglePromptSummary: Ti,
      markersFeedback: Gi
    } = $co({
      node: t,
      nodeIndex: bP(o),
      connections: mv(T, t.id),
      nodeDirtyVersion: de,
      angleUpdateTrigger: hn
    }),
    hi = g.useMemo(() => uQ(t.prompt || ""), [t.prompt]);
  g.useEffect(() => {
    const sn = t.prompt || "";
    !sn || !WQt(sn) || hi && hi !== sn && l(t.id, {
      prompt: hi
    });
  }, [t.id, t.prompt, hi, l]);
  const {
      showUpstreamTextPreview: vo,
      showLightingPreview: ci,
      showTextEditPreview: ji,
      showMoveObjectPreview: ts,
      showAnglePreview: Ts,
      showPortraitTexturePreview: dc,
      showMoodAdjustPreview: Tl,
      showUpstreamPromptPreview: Ml,
      showLightingPromptPreview: sr,
      showTextEditPromptPreview: da,
      showMoveObjectPromptPreview: la,
      showAnglePromptPreview: Ta,
      showPortraitTexturePromptPreview: Wa,
      showMoodAdjustPromptPreview: pi,
      setShowLightingPreview: wi,
      setShowTextEditPreview: to,
      setShowMoveObjectPreview: Ho,
      setShowAnglePreview: jo,
      togglePreview: Ls,
      promptInputValue: _s
    } = Uco({
      storedPrompt: hi,
      hideStoredPrompt: na,
      summaries: {
        upstream: pr,
        lighting: Ba,
        textEdit: or,
        moveObject: aa,
        angle: Ti,
        portraitTexture: ai,
        moodAdjust: vi
      }
    }),
    Pl = Ml || sr || da || la || Ta || Wa || pi,
    [xl, Bi] = g.useState(null),
    Do = g.useMemo(() => kY(T, o, t.id), [T, o, t.id]),
    co = g.useMemo(() => ((v == null ? void 0 : v(t.id)) || []).filter(Boolean), [v, t.id, T, o]),
    ls = g.useCallback((sn, Tn, lr) => {
      var Ci, Ji, Os;
      Tn.preventDefault(), Tn.stopPropagation();
      const Tr = String(sn || "").trim();
      if (t.type === "gen-video" && ct) {
        const Vo = ((Ci = t.settings) == null ? void 0 : Ci.seedanceMaterials) || [],
          Ql = (lr ? Vo.find(yl => yl.id === lr) : void 0) || Vo.find(yl => yl.url === Tr);
        if (Ql) {
          Fn(Ql);
          return;
        }
      }
      const Qr = co.findIndex(Vo => String(Vo).trim() === Tr),
        Sa = pU(Tr, {
          scopeNodeId: t.id,
          connections: T,
          nodes: o,
          imageSourceMap: Do,
          connectionIndex: Qr >= 0 ? Qr : void 0
        }),
        Ka = (((Ji = t.settings) == null ? void 0 : Ji.referenceImages) || []).filter(Boolean),
        ma = (((Os = t.settings) == null ? void 0 : Os.inputImageOrder) || []).filter(Boolean),
        Va = ma.includes(Tr) ? ma.filter(Vo => Vo !== Tr) : ma;
      if (Sa) {
        M(yl => yl.flatMap(Jd => {
          var zc;
          if (Jd.to !== t.id) return [Jd];
          if ((zc = Jd.fromGroupNodeIds) != null && zc.includes(Sa)) {
            const Dp = Jd.fromGroupNodeIds.filter(Im => Im !== Sa);
            return Dp.length === 0 ? [] : [{
              ...Jd,
              from: Dp[0],
              fromGroupNodeIds: Dp
            }];
          }
          return Jd.from === Sa ? [] : [Jd];
        }));
        const Vo = Ka.includes(Tr) ? Ka.filter(yl => yl !== Tr) : Ka,
          As = {
            ...t.settings
          };
        let Ql = !1;
        Vo.length !== Ka.length && (As.referenceImages = Vo, Ql = !0), Va !== ma && (As.inputImageOrder = Va, Ql = !0), Ql && l(t.id, {
          settings: As
        });
        return;
      }
      Ka.includes(Tr) && l(t.id, {
        settings: {
          ...t.settings,
          referenceImages: Ka.filter(Vo => Vo !== Tr),
          ...(Va !== ma ? {
            inputImageOrder: Va
          } : null)
        }
      });
    }, [Do, co, t.id, t.settings, T, o, M, l, ct, Fn]),
    Ms = g.useCallback((sn, Tn) => {
      Tn.preventDefault(), Tn.stopPropagation();
      const lr = String(sn || "").trim();
      lr && M(Tr => Tr.filter(Qr => !(Qr.to === t.id && Qr.from === lr)));
    }, [t.id, M]),
    {
      handleRemoveLighting: ks,
      handleRemoveTextEdit: Yo,
      handleRemoveMoveObject: Vc,
      handleRemoveAngle: zd,
      handleRemovePortraitTexture: Xh,
      handleRemoveMoodAdjust: Pp
    } = Wco({
      node: t,
      nodes: o,
      updateNode: l,
      setShowLightingPreview: wi,
      setShowTextEditPreview: to,
      setShowMoveObjectPreview: Ho,
      setShowAnglePreview: jo
    }),
    Ub = g.useCallback((sn, Tn) => {
      var Tr;
      if (sn === Tn || sn < 0 || Tn < 0) return;
      if (t.type === "gen-video" && ct) {
        const Qr = ((Tr = t.settings) == null ? void 0 : Tr.seedanceMaterials) || [],
          Sa = _be(Qr, sn, Tn);
        if (!Sa) return;
        l(t.id, {
          settings: {
            ...t.settings,
            seedanceMaterials: Sa
          }
        });
        return;
      }
      if (sn >= Jr.length || Tn >= Jr.length) return;
      const lr = _be(Jr, sn, Tn);
      lr && l(t.id, {
        settings: {
          ...t.settings,
          inputImageOrder: lr
        }
      });
    }, [Jr, t.id, t.settings, l, ct]),
    t0 = (sn, Tn) => {
      var Tr;
      sn.stopPropagation(), sn.preventDefault();
      const lr = (Tr = P.current) == null ? void 0 : Tr.getBoundingClientRect();
      if (lr) {
        const Qr = (sn.clientX - lr.left - R.x) / R.zoom,
          Sa = (sn.clientY - lr.top - R.y) / R.zoom;
        j(hD(Qr, Sa, R.zoom));
      }
      I(t.id), E(Tn);
    },
    yu = (sn, Tn) => {
      if (sn.stopPropagation(), k && k !== t.id) {
        if (!T) return;
        T.some(Tr => Tr.from === k && Tr.to === t.id && Tr.inputType === Tn) || (M(Tr => Tr.filter(Qr => !(Qr.to === t.id && Qr.inputType === Tn))), M(Tr => [...Tr, {
          id: Tn === "oref" || Tn === "sref" ? q() : `conn-${Date.now()}`,
          from: k,
          to: t.id,
          inputType: Tn
        }])), C(null);
      }
    },
    oo = t.type === "gen-video",
    Ps = g.useCallback(() => {
      we == null || we(t.id, "default");
    }, [t.id, we]);
  g.useEffect(() => {
    var Sa, Ka, ma;
    if (t.type !== "gen-image" && t.type !== "gen-video" || ((Sa = t.settings) == null ? void 0 : Sa.isCollapsed) !== !0) return;
    const sn = t.width || 320,
      Tn = en ? sn : Ct ? 440 : 420,
      lr = ((Ka = t.settings) == null ? void 0 : Ka._expandedHeight) || Tn,
      Qr = Math.max(lr, en ? sn : Ct ? 440 : 340);
    l(t.id, {
      settings: {
        ...(t.settings || {}),
        isCollapsed: !1,
        savedNodeHeight: (ma = t.settings) != null && ma.hasCustomSize ? Qr : void 0
      },
      height: Qr
    });
  }, [t.id, t.type, (_o = t.settings) == null ? void 0 : _o.isCollapsed, t.width, en, Ct, l]), g.useEffect(() => {
    if (en) return;
    const sn = qd.current;
    if (!sn) return;
    let Tn = 0;
    const lr = () => {
        Df.current || (cancelAnimationFrame(Tn), Tn = requestAnimationFrame(() => {
          const Qr = Math.ceil(sn.getBoundingClientRect().height),
            Sa = wu.current;
          if (!(typeof Sa != "number" || Sa <= 0) && Qr + 16 < Sa) {
            const Ka = Math.max(Qr, 200);
            Ka < Sa - 4 && l(t.id, {
              height: Ka,
              settings: {
                ...(xg.current || {}),
                savedNodeHeight: Ka
              }
            });
          }
        }));
      },
      Tr = new ResizeObserver(lr);
    return Tr.observe(sn), lr(), () => {
      Tr.disconnect(), cancelAnimationFrame(Tn);
    };
  }, [en, t.id, l]);
  const xi = 440;
  g.useEffect(() => {
    en || Ct && t.height && t.height < xi && l(t.id, {
      height: xi
    });
  }, [en, Ct]);
  const ld = g.useMemo(() => {
    var Sa, Ka, ma;
    if (!en) return [];
    const sn = Va => {
        if (!Va) return !1;
        const Ci = String(Va).trim();
        return !(!Ci || Ci === "undefined" || Ci === "null");
      },
      Tn = (v(t.id) || []).filter(sn),
      lr = (((Sa = t.settings) == null ? void 0 : Sa.referenceImages) || []).filter(sn),
      Tr = ((_ == null ? void 0 : _(t.id)) || []).filter(Va => (Va == null ? void 0 : Va.type) === "image").map(Va => Va == null ? void 0 : Va.assetId),
      Qr = (ma = (Ka = t.settings) == null ? void 0 : Ka.inputImageOrder) == null ? void 0 : ma.map(Va => String(Va).trim()).filter(Boolean);
    return Nue({
      fromConnections: Tn,
      fromSettings: lr,
      order: Qr,
      connectionAssetIds: Tr
    });
  }, [en, t.id, (po = t.settings) == null ? void 0 : po.referenceImages, (Ao = t.settings) == null ? void 0 : Ao.inputImageOrder, v, _, de, T]);
  g.useCallback((sn, Tn) => {
    if (!en) return;
    const lr = _be(ld, sn, Tn);
    lr && l(t.id, {
      settings: {
        ...t.settings,
        inputImageOrder: lr
      }
    });
  }, [en, ld, t.id, t.settings, l]);
  const Ic = g.useCallback(sn => {
      const Tn = sn.target;
      Tn.closest("[data-prompt-editor-area]") || Tn.closest('[data-scrollable="true"]') || (sn.preventDefault(), sn.stopPropagation(), sn.nativeEvent.__handledByContent = !0);
    }, []),
    bu = dEe(R, !en || gn),
    qd = g.useRef(null),
    vu = g.useRef(null),
    wu = g.useRef(t.height),
    Df = g.useRef(!!((Fo = t.settings) != null && Fo.hasCustomSize)),
    xg = g.useRef(t.settings);
  wu.current = t.height, Df.current = !!((hs = t.settings) != null && hs.hasCustomSize), xg.current = t.settings;
  const Lf = Ouo({
      node: t,
      isCompactImageWidget: en,
      isVideoNode: oo,
      compactWidgetPromptOpen: gn,
      generationHistory: fe,
      isGenerationTimerActive: ye,
      generationTimers: b,
      showStartGenerateButton: he,
      textFromUpstream: Ra,
      connectedTextNodes: Oa,
      connectedAgentNodes: Fa,
      currentModel: rn,
      setNodes: ne,
      updateNode: l,
      setLightboxItem: le,
      setLightboxOpen: J,
      closeCompactWidgetPromptPanel: dt
    }),
    {
      localGenerating: Jh,
      setLocalGenerating: Zh,
      generationRefs: Bl,
      beginCompactPreviewClearForRegenerate: ql,
      compactCurrentResultKey: Kd,
      compactVideoBlobUrl: uh,
      compactSingleImagePreviewFailed: Lc,
      compactVideoIntrinsic: Xp,
      compactProgressFillRef: Qm,
      compactProgressThinBarRef: Qd,
      compactProgressFadeOut: Xv,
      setCompactProgressFadeOut: $b,
      compactGenImgSrc: Jl,
      compactGenVideoPlaybackSrc: td,
      compactGenImgLazyLoading: Ym,
      compactVideoFrameReady: hh,
      isCompactGeneratingAny: Jp,
      nodeRuntimeGenerating: Hc,
      hasCompactDisplayContent: Rp,
      showCompactVideoMediaPending: fw,
      compactGenErrorDisplay: Xm,
      isGenNodeBusyGlobal: Zp,
      showGenNodeErrorBanner: Of,
      compactPreviewHeaderSizeLabel: Jm,
      compactSingleImageDims: Js,
      showCompactHeaderRightCluster: uc,
      reserveCompactHeaderSlot: ep,
      showCompactCenterStartCta: tp,
      showCompactQuickStartButton: xm,
      showCompactQuickStartButtonVisible: xd,
      compactGenVideoPosterSrc: _m,
      handleCompactProgressFadeEnd: Eo,
      handleCompactVideoLoadedMetadata: Zs,
      handleCompactVideoCanPlay: Wo,
      handleCompactVideoLoadedData: Qs,
      handleCompactSingleImageError: Xo,
      handleCompactImageIntrinsicSize: fl,
      retryCompactSingleImagePreview: Oc,
      handleCompactPreviewDoubleClick: km,
      handleCompactResultView: gl
    } = Lf,
    oe = r === t.id,
    Se = g.useMemo(() => y9(typeof (R == null ? void 0 : R.zoom) == "number" ? R.zoom : 1), [R == null ? void 0 : R.zoom]),
    Be = g.useCallback(sn => {
      km(sn);
    }, [km]),
    Je = g.useCallback(sn => {
      if (!q || !ne) return;
      const Tn = h9t({
        source: t,
        entry: sn,
        id: q(),
        existingNodes: o || []
      });
      ne(lr => [...lr, Tn]), Ai("success", "已复制到画布");
    }, [q, ne, t, o]),
    ut = g.useCallback(sn => {
      if (sn == null || sn.stopPropagation(), !ze) {
        Ai("error", "下载功能暂不可用");
        return;
      }
      ze([t.id]);
    }, [ze, t.id]),
    dn = g.useCallback(sn => {
      if (!o || !ne || !M || !q || !l) return;
      const Tn = T || [],
        lr = o || [],
        Tr = Vo => !Vo.inputType || Vo.inputType === "default",
        Qr = Tn.find(Vo => {
          var As;
          return Vo.from === t.id && Tr(Vo) && ((As = lr.find(Ql => Ql.id === Vo.to)) == null ? void 0 : As.type) === "topaz-upscale";
        }),
        Sa = {
          superResMode: "image",
          topazProvider: "Topazlabs",
          topazModel: "Standard V2",
          topazFactor: 2,
          topazFormat: "jpeg"
        },
        Ka = {
          superResMode: "video",
          topazVideoModel: "Proteus",
          videoResolution: "1080P",
          frameInterpolationMode: "none",
          targetFps: 30,
          slowMotionFactor: "1x"
        },
        ma = sn === "video" ? "视频增强" : "图片增强";
      if (Qr) {
        const Vo = Qr.to,
          As = lr.find(zc => zc.id === Vo),
          Ql = (As == null ? void 0 : As.settings) || {},
          yl = sn === "video" ? {
            ...Ql,
            ...Ka,
            videoResolution: Ql.videoResolution ?? "1080P",
            frameInterpolationMode: Ql.frameInterpolationMode ?? "none",
            targetFps: Ql.targetFps ?? 30,
            slowMotionFactor: Ql.slowMotionFactor ?? "1x",
            topazVideoModel: Ql.topazVideoModel ?? "Proteus"
          } : {
            ...Ql,
            ...Sa
          },
          Jd = !!String((As == null ? void 0 : As.content) || "").trim();
        l(Vo, {
          nodeName: ma,
          settings: yl,
          ...(Jd ? {} : {
            width: 250,
            height: 250
          })
        }), i == null || i(new Set([Vo])), a == null || a(Vo);
        return;
      }
      const Va = q(),
        Ci = t.x + (t.width || 300) + 88,
        Ji = sn === "video" ? Ka : Sa,
        Os = Ki(Va, "topaz-upscale", Ci, t.y, ma, Ji, lr);
      Os.width = 250, Os.height = 250, ne(Vo => [...Vo, Os]), M(Vo => [...Vo, {
        id: q(),
        from: t.id,
        to: Va
      }]), i == null || i(new Set([Va])), a == null || a(Va);
    }, [T, q, t.id, t.width, t.x, t.y, o, M, ne, a, i, l]),
    Xn = g.useCallback(() => {
      if (!o || !ne || !M || !q || oo) return;
      const sn = myr({
        source: t,
        nodes: o,
        generateId: q,
        setNodes: ne,
        setConnections: M,
        setSelectedNodeId: a,
        setSelectedNodeIds: i
      });
      if (!sn.ok) {
        Ai("error", sn.error);
        return;
      }
      Ai("info", "开始转换为 JSON...");
    }, [q, oo, t, o, M, ne, a, i]),
    Rr = g.useCallback(() => {
      if (!o || !ne || !M || !q || !l || oo) return;
      const sn = T || [],
        Tn = o || [],
        lr = Va => !Va.inputType || Va.inputType === "default",
        Tr = sn.find(Va => {
          var Ci;
          return Va.from === t.id && lr(Va) && ((Ci = Tn.find(Ji => Ji.id === Va.to)) == null ? void 0 : Ci.type) === "fal-rembg";
        }),
        Qr = {
          rembgProvider: "fal",
          rembgCropToBbox: !1
        };
      if (Tr) {
        const Va = Tr.to,
          Ci = Tn.find(Vo => Vo.id === Va),
          Ji = (Ci == null ? void 0 : Ci.settings) || {},
          Os = !!String((Ci == null ? void 0 : Ci.content) || "").trim();
        l(Va, {
          nodeName: "去除背景",
          settings: {
            ...Ji,
            rembgProvider: Ji.rembgProvider ?? "fal",
            rembgCropToBbox: Ji.rembgCropToBbox ?? !1
          },
          ...(Os ? {} : {
            width: 250,
            height: 250
          })
        }), a == null || a(Va);
        return;
      }
      const Sa = q(),
        Ka = t.x + (t.width || 300) + 88,
        ma = Ki(Sa, "fal-rembg", Ka, t.y, "去除背景", Qr, Tn);
      ma.width = 250, ma.height = 250, ne(Va => [...Va, ma]), M(Va => [...Va, {
        id: q(),
        from: t.id,
        to: Sa
      }]), a == null || a(Sa);
    }, [T, q, oo, t.id, t.width, t.x, t.y, o, M, ne, a, l]),
    [Vr, ca] = g.useState(!1),
    [za, Xr] = g.useState(!1),
    [fi, Bo] = g.useState(!1),
    [sl, xu] = g.useState(!1),
    [Bf, Gb] = g.useState(!1),
    [By, Jv] = g.useState(!1),
    [O0, Ff] = g.useState(!1),
    [n0, B0] = g.useState(!1),
    [Fy, _g] = g.useState(!1),
    [Zm, F0] = g.useState({
      analyzing: !1,
      picking: !1
    });
  g.useEffect(() => {
    Fy || F0(sn => sn.analyzing || sn.picking ? {
      analyzing: !1,
      picking: !1
    } : sn);
  }, [Fy]);
  const [ll, zy] = g.useState(null),
    [Nh, zf] = g.useState(null),
    [Zv, bI] = g.useState(null),
    [gw, zT] = g.useState({
      width: 0,
      height: 0
    }),
    [ph, cd] = g.useState(null),
    [Lo, e1] = g.useState(null),
    Uf = g.useRef(null),
    np = g.useMemo(() => {
      const sn = Zo(t);
      if (typeof sn == "string" && sn.trim() && !/\/thumbnails\//i.test(sn)) return sn.trim();
      const Tn = ph == null ? void 0 : ph.trim();
      if (Tn) return Tn;
      const lr = typeof Jl == "string" && Jl.trim() ? Jl.trim() : "";
      return lr || (typeof t.content == "string" ? t.content.trim() : "");
    }, [ph, Jl, t]),
    {
      isEraserToolOpen: ns,
      setIsEraserToolOpen: Uy,
      isEraserPainting: Ox,
      setIsEraserPainting: Yd,
      setEraserMaskBlob: r0,
      setEraserSaveMeta: Ud,
      eraserMarkPreset: UT,
      eraserBrushWidth: $y,
      toggleEraser: h_,
      eraserToolbarApi: Ed
    } = gpo({
      node: t,
      updateNode: l,
      setNodes: ne,
      setConnections: M,
      generateId: q,
      setSelectedNodeId: a,
      apiConfigs: u,
      globalApiKey: y,
      showHuyaModels: h,
      nodes: o,
      isDark: s,
      paintImageUrl: np,
      activeDropdown: K,
      setActiveDropdown: W
    }),
    Kl = g.useRef(() => {}),
    Fl = typeof Jl == "string" && Jl.trim() || (typeof t.content == "string" ? t.content.trim() : "") || "",
    [Xd, p_] = g.useState(!1),
    [t1, Vb] = g.useState(!1),
    [$f, jh] = g.useState(!1),
    [a0, Bx] = g.useState(!1),
    [m_, Gf] = g.useState(!1),
    [kg, nA] = g.useState(!1),
    [N3, j3] = g.useState(!1),
    [D3, L3] = g.useState(!1),
    [Fx, O3] = g.useState(!1),
    {
      isColorAdjustPanelOpen: B3,
      setIsColorAdjustPanelOpen: rA,
      isLutColorPanelOpen: F3,
      setIsLutColorPanelOpen: Hb,
      isPanoramaPanelOpen: z3,
      setIsPanoramaPanelOpen: ef,
      anyGradeToolOpen: aA,
      gradeSourceUrl: yw,
      gradeSourceLoading: zl,
      lutPreviewImageUrls: iA,
      lutVideoPreviewLoading: v9,
      handleLutApplyVideo: oA,
      closeAllGradeTools: n1,
      toggleColorAdjust: zx,
      toggleLut: U3,
      togglePanorama: $T,
      handleColorAdjustApply: w9,
      handleLutApply: vI,
      handlePanoramaExport: x9,
      colorAdjustSavedParams: sA,
      lutSavedState: GT
    } = Rmo({
      node: t,
      updateNode: l,
      setNodes: ne,
      generateId: q,
      liveDisplayUrl: Fl,
      liveVideoUrl: typeof td == "string" && td.trim() || Fl,
      isVideoNode: oo,
      nodes: o,
      setSelectedNodeId: a,
      onOpenTool: sn => {
        Kl.current(sn), dt();
      }
    }),
    {
      isGridSplitModalOpen: YD,
      gridSplitSourceUrl: wI,
      isFreeSplitModalOpen: r1,
      freeSplitSourceUrl: _9,
      anySplitToolOpen: lA,
      closeAllSplitTools: VT,
      openGridSplit: XD,
      quickGridSplit: JD,
      openFreeSplit: Gy,
      handleGridSplitConfirm: k9,
      handleFreeSplitConfirm: $3,
      setIsGridSplitModalOpen: xI,
      setIsFreeSplitModalOpen: cA,
      setGridSplitSourceUrl: _I,
      setFreeSplitSourceUrl: G3
    } = $mo({
      node: t,
      updateNode: l,
      setNodes: ne,
      nodes: o,
      generateId: q,
      liveDisplayUrl: Fl,
      naturalSize: Lo != null && Lo.w && (Lo != null && Lo.h) ? {
        width: Lo.w,
        height: Lo.h
      } : Js != null && Js.w && (Js != null && Js.h) ? {
        width: Js.w,
        height: Js.h
      } : void 0,
      onOpenTool: sn => {
        Kl.current(sn), dt();
      }
    }),
    Nu = Nbr({
      node: t,
      isImage: !oo,
      setNodes: ne,
      setHistory: $e,
      generateId: q,
      setCroppingNodeId: rt,
      resolveImageUrl: async () => {
        const sn = await OJ(t, Fl);
        return String(sn.url || Fl || "").trim();
      },
      naturalSize: Lo != null && Lo.w && (Lo != null && Lo.h) ? {
        width: Lo.w,
        height: Lo.h
      } : void 0
    }),
    {
      expandModalOpen: Ux,
      expandModalImageUrl: HT,
      expandImageConfigs: Vy,
      isXianyiRembgProcessing: A9,
      openExpand: S9,
      closeExpand: $x,
      runXianyiRembg: dA,
      handleExpandStartGenerate: WT
    } = Qmo({
      documentSession: n,
      node: t,
      updateNode: l,
      setNodes: ne,
      setConnections: M,
      setSelectedNodeId: a,
      setSelectedNodeIds: i,
      nodes: o,
      generateId: q,
      apiConfigs: p != null && p.length ? p : u,
      showHuyaModels: h,
      liveDisplayUrl: Fl,
      runExpandImage: Me,
      setHistory: $e,
      setCroppingNodeId: rt,
      setActiveDropdown: W,
      onOpenExpand: () => {
        Kl.current("expand"), dt();
      }
    }),
    {
      isTextEditPanelOpen: Gx,
      setIsTextEditPanelOpen: Np,
      isMoveObjectPanelOpen: Bc,
      setIsMoveObjectPanelOpen: qT,
      anyInstructionToolOpen: KT,
      instructionSourceUrl: kI,
      instructionNaturalSize: jp,
      hasSelfTextEditData: i0,
      hasSelfMoveObjectData: Wb,
      closeAllInstructionTools: Us,
      toggleTextEdit: rs,
      toggleMoveObject: V3,
      handleTextEditStateChange: I9,
      clearTextEditSaved: uA,
      handleTextEditGenerated: a1,
      handleMoveObjectConfirmed: ZD
    } = efo({
      node: t,
      updateNode: l,
      setNodes: ne,
      setConnections: M,
      setSelectedNodeId: a,
      generateId: q,
      liveDisplayUrl: Fl,
      apiConfigs: u,
      globalApiKey: y,
      onOpenTool: sn => {
        Kl.current(sn), dt();
      }
    }),
    {
      isExtractingFrames: AI,
      extractFirstLastFrames: Vx,
      extractCurrentFrame: eL,
      extractFirstFrame: H3,
      extractLastFrame: QT
    } = nfo({
      node: t,
      livePlaybackUrl: typeof td == "string" && td.trim() || Fl,
      setNodes: ne,
      setSelectedNodeId: a,
      generateId: q,
      nodes: o
    });
  g.useEffect(() => () => {
    if (Uf.current) {
      try {
        URL.revokeObjectURL(Uf.current);
      } catch {}
      Uf.current = null;
    }
  }, []);
  const hA = t.markers || [],
    em = Zv ?? hA,
    z0 = g.useCallback(sn => {
      if (!ne || !M || !q) return;
      const Tn = T || [],
        lr = Ji => !Ji.inputType || Ji.inputType === "default",
        Tr = Tn.filter(Ji => Ji.from === t.id && lr(Ji)).length,
        Qr = q(),
        Sa = q(),
        ma = t.x + t.width + 80,
        Va = t.y + Tr * 48,
        Ci = [...(sn && sn.length > 0 ? sn : em.length > 0 ? em : t.markers || [])];
      ne(Ji => {
        const Os = Ki(Qr, "gen-image", ma, Va, void 0, void 0, Ji);
        return [...Ji, {
          ...Os,
          markers: Ci,
          settings: i7(Os.settings, {})
        }];
      }), M(Ji => [...Ji, {
        id: Sa,
        from: t.id,
        to: Qr
      }]), v5(Qr), a == null || a(Qr);
    }, [t.x, t.y, t.width, t.id, t.markers, em, T, ne, M, q, a]),
    C9 = g.useCallback(sn => {
      queueMicrotask(() => z0(sn));
    }, [z0]),
    xG = g.useCallback(() => {
      Bo(!1), Gb(!1), zy(null), zf(null);
    }, []),
    bw = g.useCallback(sn => {
      bI(sn), l(t.id, {
        markers: sn
      });
    }, [t.id, l]);
  g.useEffect(() => {
    if (Zv == null) return;
    Zv.length === hA.length && Zv.every(Tn => {
      const lr = hA.find(Tr => Tr.id === Tn.id);
      return lr ? lr.x === Tn.x && lr.y === Tn.y && lr.radius === Tn.radius && lr.label === Tn.label && lr.activeLevel === Tn.activeLevel && lr.mainLabel === Tn.mainLabel && lr.partLabel === Tn.partLabel && lr.detailLabel === Tn.detailLabel && lr.isAnalyzing === Tn.isAnalyzing : !1;
    }) && bI(null);
  }, [hA, Zv]);
  const E9 = g.useCallback(sn => {
      zy(sn.id), zf(sn), Gb(!0);
    }, []),
    vw = g.useCallback(sn => {
      const lr = em.some(Tr => Tr.id === sn.id) ? em.map(Tr => Tr.id === sn.id ? {
        ...Tr,
        ...sn
      } : Tr) : [...em, sn];
      bw(lr), zf(Tr => (Tr == null ? void 0 : Tr.id) === sn.id ? {
        ...Tr,
        ...sn
      } : Tr);
    }, [em, bw]),
    pA = g.useCallback(sn => {
      if (!ll) return;
      const Tn = em.map(lr => {
        if (lr.id !== ll) return lr;
        let Tr = lr.label;
        return sn === "main" ? Tr = lr.mainLabel || t.nodeName || "图片" : sn === "part" ? Tr = lr.partLabel || "部件" : sn === "detail" && (Tr = lr.detailLabel || "细节"), {
          ...lr,
          activeLevel: sn,
          label: Tr
        };
      });
      bw(Tn);
    }, [ll, em, bw, t.nodeName]),
    tf = !!((Rs = t.settings) != null && Rs.highlighted),
    tL = g.useMemo(() => !o || !T ? !1 : o.some(sn => sn.type === "canvas-node" && T.some(Tn => Tn.from === t.id && Tn.to === sn.id)), [t.id, o, T]),
    SI = g.useMemo(() => {
      const sn = ph == null ? void 0 : ph.trim();
      if (sn) return sn;
      const Tn = Zo(t);
      if (typeof Tn == "string" && Tn.trim()) return Tn.trim();
      const lr = typeof Jl == "string" && Jl.trim() ? Jl.trim() : "";
      return lr || (typeof t.content == "string" ? t.content.trim() : "");
    }, [ph, t, Jl]),
    YT = ((xs = t.settings) == null ? void 0 : xs.multiAngle) || {
      rotation: 60,
      tilt: 35,
      scale: 1,
      isActive: !1,
      viewMode: "subject",
      angleProtocol: "wavespeed-v1"
    },
    tm = g.useMemo(() => {
      const sn = typeof Jl == "string" && Jl.trim() ? Jl.trim() : "";
      if (sn) return sn;
      const Tn = typeof t.content == "string" ? t.content.trim() : "";
      if (Tn && /\/thumbnails\//i.test(Tn)) return Tn;
      const lr = ph == null ? void 0 : ph.trim();
      if (lr) return lr;
      const Tr = Zo(t);
      return typeof Tr == "string" && Tr.trim() ? Tr.trim() : Tn;
    }, [ph, Jl, t]),
    nL = g.useCallback(sn => {
      l(t.id, {
        settings: {
          ...t.settings,
          multiAngle: sn
        }
      });
    }, [t.id, t.settings, l]),
    Ro = g.useCallback(sn => {
      if (!ne || !M || !q) return;
      const Tn = q(),
        lr = q(),
        Tr = 80,
        Qr = (T || []).filter(ma => ma.from === t.id && (!ma.inputType || ma.inputType === "default")).length,
        Sa = t.x + t.width + Tr,
        Ka = t.y + Qr * 48;
      ne(ma => {
        const Va = Ki(Tn, "gen-image", Sa, Ka, void 0, void 0, ma);
        return [...ma, {
          ...Va,
          settings: i7(Va.settings, {
            multiAngle: {
              ...sn,
              isActive: !0
            }
          })
        }];
      }), M(ma => [...ma, {
        id: lr,
        from: t.id,
        to: Tn
      }]), v5(Tn), a == null || a(Tn);
    }, [t.x, t.y, t.width, t.id, T, ne, M, q, a]),
    ww = g.useCallback(sn => {
      const Tn = {
        ...sn,
        isActive: !1
      };
      l(t.id, {
        settings: {
          ...t.settings,
          multiAngle: Tn
        }
      }), window.dispatchEvent(new CustomEvent("multiAngleUpdated", {
        detail: {
          nodeId: t.id,
          config: Tn
        }
      })), ca(!1), queueMicrotask(() => Ro({
        ...sn,
        isActive: !0
      }));
    }, [t.id, t.settings, l, Ro]),
    W3 = !oo && (za || sl || ns || Ox || aA || lA || Ux || KT || Nu.isActive || Nu.isSubmitting || a0),
    Ul = g.useCallback(sn => {
      sn !== "angle" && ca(!1), sn !== "crop" && Xr(!1), sn !== "marker" && (Bo(!1), Gb(!1), zy(null), zf(null)), sn !== "annotation" && xu(!1), sn !== "eraser" && (Uy(!1), Yd(!1), r0(null), Ud({
        ...z7
      })), sn !== "relight" && Jv(!1), sn !== "moodAdjust" && _g(!1), sn !== "faceRetouch" && B0(!1), sn !== "colorAdjust" && sn !== "lut" && sn !== "panorama" ? n1() : (sn !== "colorAdjust" && rA(!1), sn !== "lut" && Hb(!1), sn !== "panorama" && ef(!1)), sn !== "gridSplit" && sn !== "freeSplit" ? VT() : (sn !== "gridSplit" && (xI(!1), _I("")), sn !== "freeSplit" && (cA(!1), G3(""))), sn !== "expand" && $x(), sn !== "layerSplit" && Nu.exit(), sn !== "textEdit" && sn !== "moveObject" ? Us() : (sn !== "textEdit" && Np(!1), sn !== "moveObject" && qT(!1)), sn !== "videoDepth" && p_(!1), sn !== "videoAspectCrop" && Bx(!1), sn !== "videoTrim" && Gf(!1), sn !== "videoReverse" && nA(!1), sn !== "videoExtractAudio" && j3(!1), sn !== "videoCompress" && L3(!1), sn !== "videoToGif" && O3(!1), sn !== "imageCutout" && jh(!1);
    }, [Uy, Yd, r0, Ud, n1, rA, Hb, ef, VT, xI, _I, cA, G3, $x, Nu.exit, Us, Np, qT]);
  Kl.current = Ul;
  const T9 = g.useCallback(() => {
      ca(sn => {
        const Tn = !sn;
        return Tn && (Ul("angle"), dt()), Tn;
      });
    }, [Ul, dt]),
    q3 = g.useCallback(() => {
      Xr(sn => {
        const Tn = !sn;
        return Tn && Ul("crop"), Tn;
      });
    }, [Ul]),
    _d = g.useCallback(() => {
      if (oo) return;
      !fi ? (Ul("marker"), dt(), Bo(!0)) : (Bo(!1), Gb(!1), zy(null), zf(null));
    }, [oo, fi, dt, Ul]),
    f_ = g.useCallback(() => {
      if (!oo) {
        if (sl) {
          xu(!1);
          return;
        }
        Ul("annotation"), dt(), xu(!0);
      }
    }, [oo, sl, Ul, dt]),
    II = g.useCallback(() => {
      oo || (ns || (Ul("eraser"), dt()), h_());
    }, [oo, ns, Ul, dt, h_]),
    qb = ((Lu = t.settings) == null ? void 0 : Lu.lighting) || {
      direction: "front",
      hardness: "soft",
      brightness: 50,
      color: "#fffdf8",
      colorTemperature: 5600,
      rimLight: !0,
      isActive: !1
    },
    M9 = g.useCallback(sn => {
      l(t.id, {
        settings: {
          ...t.settings,
          lighting: sn
        }
      });
    }, [t.id, t.settings, l]),
    XT = g.useCallback(() => {
      var Tn;
      const sn = ((Tn = t.settings) == null ? void 0 : Tn.lighting) || qb;
      sn.isActive && (l(t.id, {
        settings: {
          ...t.settings,
          lighting: {
            ...sn,
            isActive: !1
          }
        }
      }), wi(!1)), Jv(!1);
    }, [t.id, t.settings, qb, l]),
    g_ = g.useCallback(() => {
      oo || (O0 ? Ff(!1) : (Ul("portraitTexture"), dt(), Ff(!0)));
    }, [oo, O0, Ul, dt]),
    nf = g.useCallback(() => {
      oo || (n0 ? B0(!1) : (Ul("faceRetouch"), dt(), B0(!0)));
    }, [oo, n0, Ul, dt]),
    U0 = g.useCallback(() => {
      oo || (Fy ? _g(!1) : (Ul("moodAdjust"), dt(), _g(!0)));
    }, [oo, Fy, Ul, dt]),
    y_ = g.useCallback(sn => {
      if (!ne || !M || !q) return;
      const Tn = q(),
        lr = q(),
        Tr = 80,
        Qr = (T || []).filter(ma => ma.from === t.id && (!ma.inputType || ma.inputType === "default")).length,
        Sa = t.x + t.width + Tr,
        Ka = t.y + Qr * 48;
      ne(ma => {
        const Va = Ki(Tn, "gen-image", Sa, Ka, void 0, void 0, ma);
        return [...ma, {
          ...Va,
          nodeName: Zgr,
          settings: i7(Va.settings, {
            portraitTexture: {
              ...sn,
              isActive: !0
            }
          })
        }];
      }), M(ma => [...ma, {
        id: lr,
        from: t.id,
        to: Tn
      }]), v5(Tn), a == null || a(Tn);
    }, [t.x, t.y, t.width, t.id, T, ne, M, q, a]),
    rL = g.useCallback(sn => {
      if (!ne || !M || !q) return;
      const Tn = q(),
        lr = q(),
        Tr = 80,
        Qr = (T || []).filter(ma => ma.from === t.id && (!ma.inputType || ma.inputType === "default")).length,
        Sa = t.x + t.width + Tr,
        Ka = t.y + Qr * 48;
      ne(ma => {
        const Va = Ki(Tn, "gen-image", Sa, Ka, void 0, void 0, ma);
        return [...ma, {
          ...Va,
          nodeName: e0r,
          settings: i7(Va.settings, {
            moodAdjust: {
              ...sn,
              isActive: !0
            }
          })
        }];
      }), M(ma => [...ma, {
        id: lr,
        from: t.id,
        to: Tn
      }]), v5(Tn), a == null || a(Tn);
    }, [t.x, t.y, t.width, t.id, T, ne, M, q, a]),
    CI = g.useCallback(() => {
      oo || (By ? XT() : (Ul("relight"), dt(), Jv(!0)));
    }, [oo, By, Ul, dt, XT]),
    Hy = g.useCallback(sn => {
      if (!ne || !M || !q) return;
      const Tn = q(),
        lr = q(),
        Tr = 80,
        Qr = (T || []).filter(ma => ma.from === t.id && (!ma.inputType || ma.inputType === "default")).length,
        Sa = t.x + t.width + Tr,
        Ka = t.y + Qr * 48;
      ne(ma => {
        const Va = Ki(Tn, "gen-image", Sa, Ka, void 0, void 0, ma);
        return [...ma, {
          ...Va,
          settings: i7(Va.settings, {
            lighting: {
              ...sn,
              isActive: !0
            }
          })
        }];
      }), M(ma => [...ma, {
        id: lr,
        from: t.id,
        to: Tn
      }]), v5(Tn), a == null || a(Tn);
    }, [t.x, t.y, t.width, t.id, T, ne, M, q, a]);
  g.useEffect(() => {
    fi && gn && dt();
  }, [fi, gn, dt]);
  const JT = g.useCallback(() => {
      if (!o || !T || !ne || !M || !a) return;
      const sn = o.find(Qr => Qr.type === "canvas-node" && T.some(Sa => Sa.from === t.id && Sa.to === Qr.id));
      if (sn) {
        a(sn.id);
        return;
      }
      const Tn = q(),
        lr = Ki(Tn, "canvas-node", t.x + t.width + 100, t.y, void 0, void 0, o),
        Tr = {
          strokes: [],
          maskStrokes: [],
          textElements: [],
          images: [],
          backgroundColor: "transparent",
          aspectRatio: "1:1",
          width: lr.width,
          height: lr.height,
          sourceImageUrl: SI || void 0
        };
      lr.settings = {
        ...lr.settings,
        canvasData: Tr
      }, ne(Qr => [...Qr, lr]), M(Qr => [...Qr, {
        id: q(),
        from: t.id,
        to: Tn
      }]), a(Tn);
    }, [t.id, t.x, t.y, t.width, o, T, ne, M, a, q, SI]),
    Wy = g.useCallback(() => {
      const sn = t.settings || {};
      l(t.id, {
        settings: {
          ...sn,
          highlighted: !sn.highlighted
        }
      });
    }, [t.id, t.settings, l]),
    P9 = g.useCallback(() => {
      !ne || t1 || oo || Vb(!0);
    }, [ne, t1, oo]),
    R9 = g.useCallback(sn => {
      if (sn === "canvas") {
        JT();
        return;
      }
      if (sn === "marker") {
        _d();
        return;
      }
      if (sn === "annotation") {
        f_();
        return;
      }
      if (sn === "smartEdit") {
        Ul("annotation"), dt(), r$e(t);
        return;
      }
      if (sn === "eraser") {
        II();
        return;
      }
      if (sn === "relight") {
        CI();
        return;
      }
      if (sn === "portraitTexture") {
        g_();
        return;
      }
      if (sn === "faceRetouch") {
        nf();
        return;
      }
      if (sn === "moodAdjust") {
        U0();
        return;
      }
      if (sn === "colorAdjust") {
        zx();
        return;
      }
      if (sn === "lut") {
        U3();
        return;
      }
      if (sn === "panorama") {
        $T();
        return;
      }
      if (sn === "gridSplit") {
        XD();
        return;
      }
      if (sn === "freeSplit") {
        Gy();
        return;
      }
      if (sn === "expand") {
        Ux ? $x() : S9();
        return;
      }
      if (sn === "xianyiRembg") {
        Ul("xianyiRembg"), dt(), dA();
        return;
      }
      if (sn === "textEdit") {
        rs();
        return;
      }
      if (sn === "moveObject") {
        V3();
        return;
      }
      if (sn === "imageInfoJson") {
        Ul("imageInfoJson"), dt(), Xn();
        return;
      }
      if (sn === "rembg") {
        Ul("rembg"), dt(), Rr();
        return;
      }
      if (sn === "highlight") {
        Wy();
        return;
      }
      if (sn === "videoDepth") {
        if (Xd) {
          p_(!1);
          return;
        }
        Ul("videoDepth"), dt(), p_(!0);
        return;
      }
      if (sn === "imageDepth") {
        Ul("imageDepth"), dt(), P9();
        return;
      }
      if (sn === "imageCutout") {
        if ($f) {
          jh(!1);
          return;
        }
        Ul("imageCutout"), dt(), jh(!0);
        return;
      }
      if (sn === "videoAspectCrop") {
        if (a0) {
          Bx(!1);
          return;
        }
        Ul("videoAspectCrop"), dt(), Bx(!0);
        return;
      }
      if (sn === "videoTrim") {
        if (m_) {
          Gf(!1);
          return;
        }
        Ul("videoTrim"), dt(), Gf(!0);
        return;
      }
      if (sn === "videoReverse") {
        if (kg) {
          nA(!1);
          return;
        }
        Ul("videoReverse"), dt(), nA(!0);
        return;
      }
      if (sn === "videoExtractAudio") {
        if (N3) {
          j3(!1);
          return;
        }
        Ul("videoExtractAudio"), dt(), j3(!0);
        return;
      }
      if (sn === "videoCompress") {
        if (D3) {
          L3(!1);
          return;
        }
        Ul("videoCompress"), dt(), L3(!0);
        return;
      }
      if (sn === "videoToGif") {
        if (Fx) {
          O3(!1);
          return;
        }
        Ul("videoToGif"), dt(), O3(!0);
      }
    }, [JT, _d, f_, t, II, CI, g_, nf, U0, zx, U3, $T, XD, Gy, Ux, S9, $x, Ul, dt, dA, rs, V3, Xn, Rr, Ul, dt, Wy, Xd, P9, $f, a0, m_, kg, N3, D3, Fx, Ul, dt]),
    aL = g.useCallback(() => {
      oo || (Ul("layerSplit"), dt(), Nu.enterCustom());
    }, [dt, Ul, oo, Nu]);
  g.useEffect(() => {
    if (!By) return;
    const sn = Tn => {
      const lr = Tn.detail;
      if (!lr || lr.nodeId !== t.id) return;
      const Tr = lr.settings;
      Tr && (l(t.id, {
        settings: {
          ...t.settings,
          lighting: {
            ...Tr,
            isActive: !1
          }
        }
      }), wi(!1)), Jv(!1), Tr && queueMicrotask(() => Hy({
        ...Tr,
        isActive: !0
      }));
    };
    return window.addEventListener("lightingConfirmed", sn), () => window.removeEventListener("lightingConfirmed", sn);
  }, [By, t.id, t.settings, l, Hy]), g.useEffect(() => {
    if (!oe) {
      if (Bf || a0 && !r) return;
      Bx(!1), ca(!1), Xr(!1), Bo(!1), xu(!1), Gb(!1), zy(null), zf(null), Jv(!1);
    }
  }, [oe, Bf, a0, r]), g.useEffect(() => KHn(() => {
    KX() && (Uy(!1), Yd(!1), r0(null), Ud({
      ...z7
    }), Jv(!1), _g(!1), n1(), VT(), $x(), Us());
  }), [Uy, Yd, r0, Ud, n1, VT, $x, Us]), g.useEffect(() => {
    if (!W3) {
      if (cd(null), e1(null), Uf.current) {
        try {
          URL.revokeObjectURL(Uf.current);
        } catch {}
        Uf.current = null;
      }
      return;
    }
    let sn = !1;
    const Tn = typeof Jl == "string" && Jl.trim() || typeof t.content == "string" && t.content.trim() || "";
    return (async () => {
      try {
        const lr = await OJ(t, Tn);
        if (sn) return;
        const Tr = String(lr.url || "").trim();
        if (!Tr) return;
        if (Tr.startsWith("blob:") && Tr !== Tn) {
          if (Uf.current && Uf.current !== Tr) try {
            URL.revokeObjectURL(Uf.current);
          } catch {}
          Uf.current = Tr;
        }
        cd(Tr), lr.naturalWidth && lr.naturalHeight && e1({
          w: lr.naturalWidth,
          h: lr.naturalHeight
        });
      } catch {
        !sn && Tn && cd(Tn);
      }
    })(), () => {
      sn = !0;
    };
  }, [W3, t, Jl, t.content, t.id, t.settings]), g.useEffect(() => {
    const sn = new CustomEvent("cropSelectModeChange", {
      detail: za || a0 || Nu.isActive ? t.id : null
    });
    return window.dispatchEvent(sn), () => {
      (za || a0 || Nu.isActive) && window.dispatchEvent(new CustomEvent("cropSelectModeChange", {
        detail: null
      }));
    };
  }, [za, a0, Nu.isActive, t.id]), g.useEffect(() => {
    const sn = new CustomEvent("markerModeChange", {
      detail: fi ? t.id : null
    });
    return window.dispatchEvent(sn), () => {
      fi && window.dispatchEvent(new CustomEvent("markerModeChange", {
        detail: null
      }));
    };
  }, [fi, t.id]), g.useEffect(() => {
    const Tn = !!(t.settings || {}).markerModeActive;
    fi && !Tn ? l(t.id, {
      settings: {
        markerModeActive: !0
      }
    }) : !fi && Tn && l(t.id, {
      settings: {
        markerModeActive: void 0
      }
    });
  }, [fi, t.id]), g.useEffect(() => {
    if (!za) return;
    const sn = Tn => {
      const lr = Tn.target;
      lr && (lr.closest(`[data-node-id="${t.id}"]`) || lr.closest("[data-gen-media-toolbar]") || lr.closest("[data-crop-select-fullscreen-editor]") || Xr(!1));
    };
    return document.addEventListener("pointerdown", sn, !0), () => document.removeEventListener("pointerdown", sn, !0);
  }, [za, t.id]), g.useEffect(() => {
    if (!fi) return;
    const sn = Tn => {
      const lr = Tn.target;
      lr && (lr.closest(`[data-node-id="${t.id}"]`) || lr.closest("[data-gen-media-toolbar]") || lr.closest("[data-marker-edit-panel]") || lr.closest(".node-dropdown-menu, .node-dropdown-button, [data-platform-group-picker-menu]") || Bf || (Bo(!1), Gb(!1), zy(null), zf(null)));
    };
    return document.addEventListener("pointerdown", sn, !0), () => document.removeEventListener("pointerdown", sn, !0);
  }, [fi, Bf, t.id]);
  const EI = za || fi || Ox;
  g.useEffect(() => {
    if (!en || oo || !EI) return;
    const sn = jt.current;
    if (!sn) return;
    const Tn = () => {
      const Tr = sn.clientWidth,
        Qr = sn.clientHeight;
      Tr > 0 && Qr > 0 && zT({
        width: Tr,
        height: Qr
      });
    };
    Tn();
    const lr = new ResizeObserver(Tn);
    return lr.observe(sn), () => lr.disconnect();
  }, [en, oo, EI, Rp, Jl, ph]);
  const ZT = g.useCallback(() => {
      var ma;
      const sn = (ma = t.settings) == null ? void 0 : ma.cropSelection;
      if (!sn || sn.width < 8 || sn.height < 8 || !ne || !M || !q) return;
      const Tn = q(),
        lr = q(),
        Qr = t.x + t.width + 80,
        Sa = t.y,
        Ka = {
          cropX: Math.round(sn.x),
          cropY: Math.round(sn.y),
          cropWidth: Math.round(sn.width),
          cropHeight: Math.round(sn.height)
        };
      ne(Va => {
        const Ci = Ki(Tn, "inpaint-crop", Qr, Sa, void 0, Ka, Va);
        return [...Va, Ci];
      }), M(Va => [...Va, {
        id: lr,
        from: t.id,
        to: Tn
      }]), a == null || a(Tn), Xr(!1);
    }, [(Sm = t.settings) == null ? void 0 : Sm.cropSelection, t.id, t.x, t.y, t.width, ne, M, q, a]),
    e8 = Math.max(1, Number(Lo == null ? void 0 : Lo.w) || Number(Js == null ? void 0 : Js.w) || Number(t.width) || 1024),
    b_ = Math.max(1, Number(Lo == null ? void 0 : Lo.h) || Number(Js == null ? void 0 : Js.h) || Number(t.height) || 1024),
    xw = W3 && ph ? ph : Jl,
    rf = g.useMemo(() => {
      const sn = Zo(t);
      return typeof sn == "string" && sn.trim() && !/\/thumbnails\//i.test(sn) ? sn.trim() : typeof xw == "string" ? xw.trim() : "";
    }, [t, xw]),
    Fc = null,
    Dh = !oo && !za && !Ox && fi && Rp && gw.width > 0 && xw ? c.jsx(apo, {
      nodeId: t.id,
      markers: em,
      onMarkersChange: bw,
      isDark: s,
      isMarkerMode: fi,
      imageWidth: gw.width,
      imageHeight: gw.height,
      imageUrl: xw,
      mainLabel: t.nodeName,
      onMarkerEdit: E9
    }) : null,
    ju = mj((Vf = t.settings) == null ? void 0 : Vf.moodAdjust),
    Lh = Fy && !oo && Rp && gw.width > 0 ? c.jsx(pyr, {
      faces: ju.faces,
      selectedFaceId: ju.selectedFaceId,
      imageWidth: ju.imageWidth || e8,
      imageHeight: ju.imageHeight || b_,
      analyzing: Zm.analyzing,
      picking: Zm.picking,
      onSelectFace: sn => {
        var Tn;
        return l(t.id, {
          settings: {
            ...t.settings,
            moodAdjust: a0r((Tn = t.settings) == null ? void 0 : Tn.moodAdjust, sn)
          }
        });
      },
      onPickBox: (sn, Tn) => {
        var lr;
        l(t.id, {
          settings: {
            ...t.settings,
            moodAdjust: r0r((lr = t.settings) == null ? void 0 : lr.moodAdjust, sn, Tn.width || e8, Tn.height || b_)
          }
        }), F0({
          analyzing: !1,
          picking: !1
        });
      }
    }) : null,
    qy = Dh || Lh ? c.jsxs(c.Fragment, {
      children: [Fc, Dh, Lh]
    }) : null,
    mA = ei() && Ee !== "high",
    nm = uc && !mA,
    K3 = ep && !mA,
    {
      compactGenerationStartMediaKeyRef: fA,
      compactReturnedMediaKeyRef: TI,
      compactStableMediaSrcRef: N9,
      sawGlobalGeneratingForCompactRef: gA,
      compactGlobalWasGeneratingRef: o0,
      prevGlobalGeneratingForFadeRef: t8,
      prevGlobalGeneratingForLocalRef: yA,
      compactWasGeneratingRef: Kb,
      compactProgressAnimStartRef: _w
    } = Bl,
    [Q3, Qb] = g.useState(0),
    Yb = g.useRef(!1);
  g.useRef(null), g.useRef(null), g.useRef(null);
  const Hx = g.useRef(null),
    MI = g.useRef(null),
    Y3 = g.useRef(null),
    [PI, bA] = g.useState(!1),
    [X3, Ag] = g.useState(!1),
    [i1, Xb] = g.useState(!1);
  g.useCallback(sn => {
    var Qr, Sa;
    const Tn = (Qr = sn.target.files) == null ? void 0 : Qr[0];
    if (sn.target.value = "", !(Tn != null && Tn.type.startsWith("image/"))) return;
    const lr = ((Sa = t.settings) == null ? void 0 : Sa.mjOrefUrl) || "";
    if (lr.startsWith("blob:")) try {
      URL.revokeObjectURL(lr);
    } catch {}
    const Tr = URL.createObjectURL(Tn);
    l(t.id, {
      settings: {
        ...t.settings,
        mjOrefUrl: Tr
      }
    });
  }, [t.id, t.settings, l]), g.useCallback(sn => {
    var Qr, Sa;
    const Tn = (Qr = sn.target.files) == null ? void 0 : Qr[0];
    if (sn.target.value = "", !(Tn != null && Tn.type.startsWith("image/"))) return;
    const lr = ((Sa = t.settings) == null ? void 0 : Sa.mjSrefUrl) || "";
    if (lr.startsWith("blob:")) try {
      URL.revokeObjectURL(lr);
    } catch {}
    const Tr = URL.createObjectURL(Tn);
    l(t.id, {
      settings: {
        ...t.settings,
        mjSrefUrl: Tr
      }
    });
  }, [t.id, t.settings, l]), g.useCallback(sn => {
    var lr;
    sn.preventDefault(), sn.stopPropagation(), M(Tr => Tr.filter(Qr => !(Qr.to === t.id && Qr.inputType === "oref")));
    const Tn = (lr = t.settings) == null ? void 0 : lr.mjOrefUrl;
    if (Tn != null && Tn.startsWith("blob:")) try {
      URL.revokeObjectURL(Tn);
    } catch {}
    l(t.id, {
      settings: {
        ...t.settings,
        mjOrefUrl: void 0
      }
    });
  }, [t.id, t.settings, M, l]), g.useCallback(sn => {
    var lr;
    sn.preventDefault(), sn.stopPropagation(), M(Tr => Tr.filter(Qr => !(Qr.to === t.id && Qr.inputType === "sref")));
    const Tn = (lr = t.settings) == null ? void 0 : lr.mjSrefUrl;
    if (Tn != null && Tn.startsWith("blob:")) try {
      URL.revokeObjectURL(Tn);
    } catch {}
    l(t.id, {
      settings: {
        ...t.settings,
        mjSrefUrl: void 0
      }
    });
  }, [t.id, t.settings, M, l]), g.useCallback(sn => {
    const Tn = sn.target.files;
    if (sn.target.value = "", !(Tn != null && Tn.length)) return;
    const lr = Array.from(Tn).filter(ma => ma.type.startsWith("image/"));
    if (lr.length === 0) return;
    const Tr = o.find(ma => ma.id === t.id),
      Qr = (Tr == null ? void 0 : Tr.x) ?? t.x,
      Sa = (Tr == null ? void 0 : Tr.y) ?? t.y,
      Ka = [];
    for (let ma = 0; ma < lr.length; ma++) {
      const Va = q(),
        Ci = Ki(Va, "input-image", Qr - 280 - ma * 28, Sa + 48 + ma * 12, void 0, void 0, [...o, ...Ka]);
      Ka.push({
        ...Ci,
        content: URL.createObjectURL(lr[ma])
      });
    }
    ne(ma => [...ma, ...Ka]), M(ma => [...ma, ...Ka.map(Va => ({
      id: q(),
      from: Va.id,
      to: t.id
    }))]), bA(!1);
  }, [t.id, t.x, t.y, o, q, ne, M]), g.useEffect(() => {
    if (!en || !PI) return;
    const sn = Tn => {
      var Tr;
      const lr = Tn.target;
      !lr || !(lr instanceof Element) || (Tr = Hx.current) != null && Tr.contains(lr) || bA(!1);
    };
    return window.addEventListener("mousedown", sn), () => window.removeEventListener("mousedown", sn);
  }, [en, PI]), g.useEffect(() => {
    if (!en || !X3 && !i1) return;
    const sn = Tn => {
      var Tr, Qr;
      const lr = Tn.target;
      !lr || !(lr instanceof Element) || (Tr = MI.current) != null && Tr.contains(lr) || (Qr = Y3.current) != null && Qr.contains(lr) || (Ag(!1), Xb(!1));
    };
    return window.addEventListener("mousedown", sn), () => window.removeEventListener("mousedown", sn);
  }, [en, X3, i1]);
  const Am = g.useCallback(() => {
      var Tn;
      const sn = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(t.id) : t.id;
      (Tn = document.querySelector(`[data-node-id="${sn}"].node-wrapper`)) == null || Tn.removeAttribute("data-compact-gen-start-hover");
    }, [t.id]),
    vA = g.useCallback(() => {
      const sn = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(t.id) : t.id;
      return document.querySelector(`[data-node-id="${sn}"].node-wrapper`);
    }, [t.id]),
    Wx = g.useCallback((sn, Tn) => {
      const lr = vA();
      lr && lr.dispatchEvent(new CustomEvent(sn === "enter" ? zUe : CW, {
        detail: {
          relatedTarget: Tn
        }
      }));
    }, [vA]),
    qx = g.useCallback(sn => {
      en && (DW(), Wx("enter"));
    }, [Wx, en]),
    j9 = g.useCallback(sn => {
      en && Wx("leave", sn.relatedTarget);
    }, [Wx, en]);
  g.useEffect(() => {
    if (en) return () => {
      Wx("leave", null);
    };
  }, [Wx, en, t.id]), g.useEffect(() => (xm || Am(), () => {
    Am();
  }), [xm, Am]);
  const Kx = g.useCallback(sn => {
      var Tn;
      (Tn = sn.currentTarget.closest(".node-wrapper")) == null || Tn.setAttribute("data-compact-gen-start-hover", "true");
    }, []),
    D9 = g.useCallback(sn => {
      var Tn;
      (Tn = sn.currentTarget.closest(".node-wrapper")) == null || Tn.removeAttribute("data-compact-gen-start-hover");
    }, []),
    Ky = g.useMemo(() => {
      if (t.type !== "gen-image") return null;
      const sn = _st(t.id, o, T || []);
      if (!sn) return null;
      const Tn = _dn(sn, o, T || []);
      return Tn.length ? {
        rows: Tn,
        channels: $de(sn.id, o, T || [])
      } : null;
    }, [t.type, t.id, o, T]),
    Jb = Ky ? zur(t.id, Ky.rows, o) : "";
  g.useEffect(() => {
    var Tr;
    if (String(((Tr = t.settings) == null ? void 0 : Tr._tableBatchSnap) || "") === Jb) return;
    const {
      _tableBatchSnap: Tn,
      ...lr
    } = t.settings || {};
    l(t.id, {
      settings: Jb ? {
        ...lr,
        _tableBatchSnap: Jb
      } : lr
    });
  }, [Jb, (Hf = t.settings) == null ? void 0 : Hf._tableBatchSnap]), g.useEffect(() => {
    var Tr;
    const sn = (Tr = t.settings) == null ? void 0 : Tr._preBatchSize;
    if (!sn) return;
    const {
      _preBatchSize: Tn,
      ...lr
    } = t.settings || {};
    l(t.id, {
      height: sn.height,
      settings: lr
    });
  }, [(Yx = t.settings) == null ? void 0 : Yx._preBatchSize]);
  const wA = g.useCallback(() => {
    var yl, Jd;
    const sn = C5(t.settings || {}) && ["live", "connecting"].includes(String(((yl = C$e(t.id)) == null ? void 0 : yl.status) || ""));
    if (!sn && (Yb.current || Jh || Hc || t.isGenerating || (Jd = t.settings) != null && Jd.isGenerating)) return;
    if (sn) {
      Z7(t.id);
      const zc = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(t.id) : t.id,
        Dp = t_(t.id) || document.querySelector(`[data-node-id="${zc}"][data-prompt-editor-area="true"]`),
        Im = Dp ? Ec(Dp) : t.prompt || "";
      Q({
        ...t,
        prompt: Im || t.prompt,
        isGenerating: !0,
        settings: {
          ...(t.settings || {}),
          isGenerating: !0
        }
      });
      return;
    }
    if (t.type === "gen-image") {
      const zc = Oe.current,
        Dp = st.current || [],
        Im = _st(t.id, zc, Dp),
        AA = Im ? _dn(Im, zc, Dp) : [];
      if (Im && AA.length) {
        if (vt.current) return;
        if (Fur(t, AA).length === 0) {
          Ai("info", AA.some(Aw => Aw.missingMedia) ? "请先在表格中绑定对应素材图，再勾选要生成的行" : "请先勾选要生成的行");
          return;
        }
        if (!q || !ne) {
          Ai("error", "无法创建任务卡");
          return;
        }
        const l0 = new Set(zc.map(Aw => Aw.id));
        Ht.current = Ht.current.filter(Aw => !l0.has(Aw.id));
        const r4 = i5i({
          source: t,
          rows: AA,
          nodes: [...zc, ...Ht.current],
          connections: Dp,
          generateId: q
        });
        if (Ht.current = [...Ht.current, ...r4], !r4.length) {
          Ai("info", "已选行正在生成，请完成后再次生成");
          return;
        }
        vt.current = !0, window.setTimeout(() => {
          vt.current = !1;
        }, 600), ne(Aw => [...Aw, ...r4]), r4.forEach((Aw, _G) => {
          window.setTimeout(() => {
            Q({
              ...Aw,
              isGenerating: !0,
              settings: {
                ...(Aw.settings || {}),
                isGenerating: !0,
                progress: 0,
                error: null
              }
            });
          }, (_G + 1) * 80);
        });
        return;
      }
    }
    Yb.current = !0;
    const Tn = n == null ? void 0 : n.lease();
    Rwe(), fA.current = Kd, TI.current = "", UQ(t.id), hu(t.id, !0), gA.current = !0, o0.current = !0, t8.current = !1, yA.current = !1, en && (Zh(!0), $b(!1), Kb.current = !0, _w.current = Date.now());
    const lr = en && f5(t);
    lr && ql();
    const Tr = t.prompt || "";
    let Qr = uQ(Tr);
    Z7(t.id);
    const Sa = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(t.id) : t.id,
      Ka = t_(t.id) || document.querySelector(`[data-node-id="${Sa}"][data-prompt-editor-area="true"]`);
    if (Ka && !Pl) {
      const zc = Ec(Ka);
      Qr = uQ(zc);
    }
    const ma = Oe.current,
      Va = st.current,
      Ci = ma.find(zc => zc.id === t.id) ?? t,
      Ji = Ci.settings || t.settings || {},
      Os = vn.current.klingVideoUrl ? {
        klingVideoUrl: vn.current.klingVideoUrl,
        klingVideoReferType: vn.current.klingVideoReferType,
        klingVideoKeepSound: vn.current.klingVideoKeepSound,
        klingVideoSegment: vn.current.klingVideoSegment
      } : {},
      Vo = lr ? $6({
        ...Ci,
        settings: {
          ...Ji,
          ...Os
        }
      }) : null,
      As = Vo ? {
        ...(Vo.settings || {}),
        ...Os
      } : {
        ...Ji,
        ...Os
      };
    N9.current = void 0, l(t.id, {
      ...(Vo ? {
        content: Vo.content,
        _contentAssetId: Vo._contentAssetId,
        videoPosterUrl: Vo.videoPosterUrl,
        errorMsg: Vo.errorMsg
      } : {}),
      isGenerating: !0,
      errorMsg: void 0,
      settings: {
        ...As,
        isGenerating: !0,
        progress: 0,
        error: null
      }
    });
    const Ql = async () => {
      try {
        await Id(), Ka && Qr.trim() && Qr !== Tr && (WQt(Tr) || Qr.trim().length >= Math.min(Tr.trim().length, 8)) && l(t.id, {
          prompt: Qr
        }), await Id();
        const zc = en ? null : Pn(),
          Dp = Ci.type === "gen-image" ? fyr(Ji.batchSize ?? Ji.batchCount) : 1,
          Im = Dp > 1 && q && ne ? vuo({
            source: {
              ...Ci,
              prompt: Qr,
              width: Ci.width || t.width,
              height: Ci.height || t.height
            },
            windowCount: Dp,
            nodes: ma,
            connections: Va,
            generateId: q,
            prompt: Qr,
            referenceImages: [...((v == null ? void 0 : v(t.id)) || []), ...(Ji.referenceImages || [])]
          }) : {
            clones: [],
            connections: []
          };
        if (Im.clones.length > 0) {
          ne(l0 => [...l0, ...Im.clones]), Im.connections.length > 0 && (Cki(Im.connections), M && M(l0 => [...l0, ...Im.connections]));
          for (const l0 of Im.clones) UQ(l0.id), hu(l0.id, !0);
        }
        const AA = {
          ...As,
          isGenerating: !0,
          progress: 0,
          error: null,
          ...(Im.clones.length > 0 ? {
            batchSize: Dp,
            batchCount: Dp,
            _apFanoutMember: !0
          } : {}),
          _autoCreatedPreviewId: zc || void 0
        };
        await Id(), Q({
          ...Ci,
          ...(Vo ? {
            content: Vo.content,
            _contentAssetId: Vo._contentAssetId,
            videoPosterUrl: Vo.videoPosterUrl,
            errorMsg: Vo.errorMsg
          } : {}),
          prompt: Qr,
          settings: AA,
          isGenerating: !0
        });
        for (let l0 = 0; l0 < Im.clones.length; l0++) {
          const r4 = Im.clones[l0];
          await new Promise(Aw => window.setTimeout(Aw, 480 * (l0 + 1))), Q({
            ...r4,
            prompt: Qr,
            isGenerating: !0,
            settings: {
              ...(r4.settings || {}),
              isGenerating: !0,
              progress: 0,
              error: null,
              batchSize: 1,
              batchCount: 1
            }
          });
        }
        zc && requestAnimationFrame(() => {
          Wke(Tn, zc, "previewGenerationStarted");
        });
      } catch (zc) {
        const Dp = zc instanceof Error ? zc.message : String(zc);
        console.error("[GenImageVideoNode] 生成管线异常:", zc), hu(t.id, !1), en && (Zh(!1), Kb.current = !1), l(t.id, {
          isGenerating: !1,
          errorMsg: Dp,
          settings: {
            ...(Ge.current || t.settings || {}),
            isGenerating: !1,
            progress: 0,
            error: Dp
          }
        });
      }
    };
    queueMicrotask(() => {
      Ql();
    });
  }, [Pn, ql, Kd, n, Q, q, v, ne, M, en, Jh, Hc, t, Pl, l]);
  g.useEffect(() => {
    var Tn;
    Jh || Hc || !!t.isGenerating || !!((Tn = t.settings) != null && Tn.isGenerating) || Jp || Zp || (Yb.current = !1);
  }, [Jh, Hc, t.isGenerating, t.settings, Jp, Zp]);
  const xA = g.useMemo(() => {
      const sn = Number(bu.zoom || 1);
      return eZ(sn);
    }, [bu.zoom]),
    J3 = g.useRef(bu.zoom),
    Z3 = g.useRef(xA),
    Qy = yI({
      hostRef: vu,
      open: ft && !ht,
      zoom: bu.zoom,
      remeasureKey: `${Math.round(bu.x)}:${Math.round(bu.y)}:${bu.zoom}:${Jr.length}:${rn}`,
      stabilizeNodeId: ft ? t.id : ""
    }),
    o1 = g.useMemo(() => {
      if (!en || !gn || ft) return;
      const sn = Number.isFinite(Q3) ? Q3 : 0;
      if (Math.abs(sn) > .05) return `translateX(${sn}px)`;
    }, [Q3, gn, ft, en]),
    n8 = g.useMemo(() => ({
      transition: "none"
    }), []);
  Qp(Bt, "50% 0%"), g.useLayoutEffect(() => {
    const sn = Bt.current;
    sn && (sn.style.clipPath = "", sn.style.removeProperty("clip-path"));
  }, [en, gn, t.id]);
  const s0 = Ce ? Bm(t) : "",
    RI = ei() ? K1(t) : "",
    Yy = !Of && !t.isGenerating && !Jh && Ee === "low" && !(Ce && s0) && !RI,
    iL = !t.isGenerating && !Jh && !ei() && (Yy || Ke && Ee === "low" && gUe(Le));
  SFt(t.id, ei() ? !1 : Yy || fw), g.useEffect(() => {
    if (!en || !gn || ft || Yy || oo) {
      Qb(0), at.current = 0;
      return;
    }
    const sn = 220,
      Tn = 20,
      lr = 48,
      Tr = () => {
        if (typeof performance < "u" && performance.now() < at.current || jl()) return;
        const As = jt.current,
          Ql = bt.current,
          yl = Ql && (As != null && As.contains(Ql)) ? Ql : As,
          Jd = Bt.current;
        if (!yl || !Jd) {
          Qb(0);
          return;
        }
        const zc = yl.getBoundingClientRect(),
          Dp = Jd.getBoundingClientRect();
        if (zc.width <= 1 || Dp.width <= 1) {
          Qb(0);
          return;
        }
        const Im = zc.left + zc.width / 2,
          AA = Dp.left + Dp.width / 2,
          l0 = Im - AA;
        Qb(r4 => Math.abs(r4 - l0) < 3 ? r4 : l0);
      };
    wn.current = Tr;
    let Qr,
      Sa,
      Ka = !1;
    const ma = As => {
        window.clearTimeout(Sa), Sa = window.setTimeout(() => {
          Ka || (at.current = 0, window.requestAnimationFrame(() => {
            Ka || Tr();
          }));
        }, As);
      },
      Va = J3.current !== bu.zoom,
      Ci = Z3.current !== xA;
    J3.current = bu.zoom, Z3.current = xA;
    const Ji = typeof performance < "u" ? performance.now() : Date.now();
    Ci ? (at.current = Ji + sn, ma(sn)) : Va ? (at.current = 0, ma(Tn)) : ma(0);
    const Os = () => {
        window.clearTimeout(Qr), Qr = window.setTimeout(() => {
          window.requestAnimationFrame(() => {
            Ka || Tr();
          });
        }, lr);
      },
      Vo = typeof ResizeObserver < "u" ? new ResizeObserver(() => Os()) : null;
    return Vo ? (jt.current && Vo.observe(jt.current), bt.current && Vo.observe(bt.current), Bt.current && Vo.observe(Bt.current)) : window.addEventListener("resize", Os), () => {
      Ka = !0, window.clearTimeout(Qr), window.clearTimeout(Sa), at.current = 0, Vo ? Vo.disconnect() : window.removeEventListener("resize", Os);
    };
  }, [gn, Jr.length, rn, xA, ft, en, t.height, t.width, t.type, Yy, bu.zoom]);
  const _A = !fi && (!en || gn),
    r8 = !en || !gn || mt,
    Du = ft && t.type === "gen-image" && !D && nn,
    L9 = (() => {
      var lr;
      if (rn === "codex-image") return "Codex 账号";
      if (!Wr) return null;
      const sn = (m == null ? void 0 : m(rn)) ?? !1;
      if (!od(Wr, Qa.getGlobalBaseUrl()) || sn) return null;
      const Tn = String(((lr = t.settings) == null ? void 0 : lr.platformGroup) || "").trim();
      return !Tn || Tn === "__auto__" ? "Default" : PU(Tn);
    })(),
    e4 = !!(Jh || Hc || t.isGenerating || (kA = t.settings) != null && kA.isGenerating || Jp || Zp),
    O9 = g.useMemo(() => {
      var sn, Tn, lr;
      return {
        isDark: s,
        nodeType: t.type,
        currentModel: rn,
        currentModelConfig: Wr,
        ratio: String(((sn = t.settings) == null ? void 0 : sn.ratio) || "Auto"),
        resolution: String(((Tn = t.settings) == null ? void 0 : Tn.resolution) || ""),
        batchSize: Number(((lr = t.settings) == null ? void 0 : lr.batchSize) || 1),
        showPromptLibraryShortcut: Du,
        platformLabel: L9,
        isModelHidden: (m == null ? void 0 : m(rn)) ?? !1,
        isGeneratingUi: e4
      };
    }, [s, t.type, rn, Wr, t.settings, Du, L9, m, e4]),
    oL = g.useMemo(() => ({
      node: t,
      isDark: s,
      updateNode: l,
      activeDropdown: K,
      setActiveDropdown: W,
      currentModel: rn,
      currentModelConfig: Wr,
      availableModels: ur,
      modelDropdownOptionKeys: zr,
      modelDropdownMenuWidth: Dr,
      selectedChannel: tn,
      onSelectChannel: Lr,
      showHaiyiChannel: br,
      isModelDropdownOpen: jr,
      isModelOptionSelected: gr,
      modelDropdownButtonRef: ea,
      ratioDropdownButtonRef: Br,
      durationDropdownButtonRef: pa,
      getConnectedImageForInput: w,
      handleStartGenerate: wA,
      isGeneratingUi: e4,
      showPromptLibraryShortcut: Du,
      onOpenPromptLibrary: () => pt(!1),
      isModelHiddenInList: m,
      genUseAliyunOss: De,
      onGenUseAliyunOssChange: Ye,
      getLatestNodeSettings: () => Ge.current,
      getMetasoInput: () => {
        const sn = Oe.current.find(Qr => Qr.id === t.id) || t,
          Tn = t_(t.id),
          lr = Tn && !Pl ? Ec(Tn) : sn.prompt || "",
          Tr = [Ra, Y4(lr) || E1e(lr, Ra) ? "" : lr].filter(Boolean).join(`

`);
        return {
          node: {
            ...sn,
            settings: {
              ...sn.settings,
              genUseAliyunOss: De
            }
          },
          prompt: Tr,
          refImages: Jr,
          refMetaByRawUrl: QNe(t.id, _),
          startPort: w(t.id, "veo_start"),
          endPort: w(t.id, "veo_end"),
          videoPort: w(t.id, "video") || w(t.id, "reference_video"),
          audioPort: w(t.id, "audio") || w(t.id, "reference_audio")
        };
      },
      globalOssUploadEnabled: Ce,
      ossConfigured: Ve,
      mediaHostingProvider: We,
      pendingAudioFile: Pa,
      showAudioSegmentSelector: _r,
      setPendingAudioFile: ba,
      setShowAudioSegmentSelector: Ea,
      setWan26AudioError: Dn,
      wan26AudioFileInputRef: Ar,
      setShowVideoSegmentSelector: _a,
      setShowKlingSubjectSelector: Gr,
      setShowKlingImageUploadPanel: La,
      onGenInlineDirectorUiChange: ue,
      onInlineMovementPanelChange: Ft
    }), [t, s, l, K, rn, Wr, ur, zr, Dr, tn, Lr, br, jr, gr, w, wA, e4, Jr, _, Ra, Pl, Du, m, De, Ce, Ve, We, Pa, _r, ue]),
    a8 = !ce && !Yy && !ns && !Bc && !za && (Rp || f5(t)),
    B9 = a8 && (oe || Vr || fi || sl || By || O0 || Fy || aA || lA || Ux || A9 || $f || a0 || KT || AI || Nu.isActive || Nu.isSubmitting),
    sL = XCe(B9);
  return Yy && !en ? RI ? c.jsx("div", {
    className: "relative w-full min-h-[88px] rounded-2xl border pointer-events-none overflow-hidden",
    children: c.jsx("img", {
      src: RI,
      alt: "",
      ...Yg(!1),
      draggable: !1,
      className: "absolute inset-0 h-full w-full object-contain"
    })
  }) : c.jsx("div", {
    className: `relative w-full min-h-[88px] rounded-2xl border pointer-events-none ${Sp(s)}`,
    "aria-hidden": !0
  }) : c.jsxs("div", {
    ref: sn => {
      qd.current = sn, en && (wt.current = sn);
    },
    className: `relative w-full flex flex-col min-h-0 min-w-0 pointer-events-auto group overflow-visible ${en ? "h-full p-0" : "h-auto p-3"}`,
    "data-crop-select-mode": za || a0 || Nu.isActive ? "true" : void 0,
    "data-marker-mode": fi ? "true" : void 0,
    children: [a8 && sL && c.jsx(Uho, {
      isSelected: oe,
      isDark: s,
      canvasZoomMediaOpacity: Se,
      isVideoNode: oo,
      showImageTools: !oo && (Rp || f5(t)),
      isAnglePanelOpen: Vr,
      onToggleAngle: T9,
      isCropSelectMode: za,
      onToggleCrop: q3,
      onToolSelect: R9,
      onQuickGridSplit: JD,
      hasCanvasNode: tL,
      isMarkerMode: fi,
      isAnnotationOpen: sl,
      isHighlighted: tf,
      isEraserToolOpen: ns,
      isLightPanelOpen: By,
      isPortraitTexturePanelOpen: O0,
      isFaceRetouchOpen: n0,
      isMoodAdjustPanelOpen: Fy,
      isColorAdjustPanelOpen: B3,
      isLutColorPanelOpen: F3,
      isVideoDepthDialogOpen: Xd,
      isImageDepthProcessing: t1,
      isImageCutoutOpen: $f,
      isVideoAspectCropOpen: a0,
      isVideoTrimOpen: m_,
      isVideoReverseOpen: kg,
      isVideoExtractAudioOpen: N3,
      isVideoCompressOpen: D3,
      isVideoToGifOpen: Fx,
      isPanoramaPanelOpen: z3,
      isGridSplitModalOpen: YD,
      isFreeSplitModalOpen: r1,
      isLayerSplitOpen: Nu.isActive,
      isLayerSplitProcessing: Nu.isSubmitting,
      onLayerSplitCustom: aL,
      onLayerSplitExit: Nu.exit,
      isExpandModalOpen: Ux,
      isXianyiRembgProcessing: A9,
      isTextEditPanelOpen: Gx,
      isMoveObjectPanelOpen: Bc,
      hasSelfTextEditData: i0,
      hasSelfMoveObjectData: Wb,
      hasMarkers: em.length > 0,
      isExtractingFrames: AI,
      onExtractFirstLastFrames: oo ? () => void Vx() : void 0,
      onExtractCurrentFrame: oo ? () => void eL() : void 0,
      onExtractFirstFrame: oo ? () => void H3() : void 0,
      onExtractLastFrame: oo ? () => void QT() : void 0,
      onHdUpscale: () => dn(oo ? "video" : "image"),
      onDownload: ut,
      onFullscreen: Be,
      node: t
    }), Nu.isActive && !oo ? c.jsxs(c.Fragment, {
      children: [c.jsx(n$t, {
        className: en ? "inset-0" : "inset-3",
        regions: Nu.regions,
        isPicking: Nu.isPicking,
        onRegionAdd: sn => {
          const Tn = Nu.addRegion(sn);
          Tn && Nu.insertRegionToken(Tn.refId);
        }
      }), c.jsx("div", {
        className: "absolute left-full top-0 z-[130] ml-3",
        children: c.jsx(jbr, {
          session: Nu,
          imageUrl: Fl,
          isDark: s
        })
      })]
    }) : null, Vr && !oo && tm && c.jsx("div", {
      "data-multi-angle-panel": !0,
      className: "nodrag nowheel pointer-events-auto absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      onClick: sn => sn.stopPropagation(),
      onMouseDown: sn => sn.stopPropagation(),
      onPointerDown: sn => sn.stopPropagation(),
      children: c.jsx(Myr, {
        config: YT,
        onConfigChange: nL,
        onConfirm: ww,
        isDark: s,
        isVisible: oe,
        isOpen: Vr,
        onClose: () => ca(!1),
        previewImageUrl: tm
      })
    }), za && !oo && (rf || xw) ? c.jsx(zUt, {
      imageUrl: rf || xw || "",
      imageName: t.nodeName || "图片",
      selection: ((ee = t.settings) == null ? void 0 : ee.cropSelection) ?? null,
      onSelectionChange: sn => l(t.id, {
        settings: {
          ...t.settings,
          cropSelection: sn
        }
      }),
      onClose: () => {
        const sn = {
          ...(t.settings || {})
        };
        delete sn.cropSelection, l(t.id, {
          settings: sn
        }), Xr(!1);
      },
      onConfirmDownstreamInpaintCrop: ZT,
      isDark: s
    }) : null, sl && !oo && rf ? c.jsx(Tyr, {
      imageUrl: rf,
      imageName: t.nodeName || "图片",
      initialDocument: (se = t.settings) == null ? void 0 : se.imageAnnotationDocument,
      isDark: s,
      onCancel: () => xu(!1),
      onSave: async (sn, Tn) => {
        if (!ne || !M) throw new Error("无法创建标注结果节点，请刷新画布后重试");
        try {
          await jUt({
            blob: sn,
            annotationDocument: Tn,
            sourceNode: t,
            nodes: o || [],
            connections: T || [],
            generateId: q,
            setNodes: ne,
            setConnections: M,
            setSelectedNodeId: a
          }), Ai("success", "已连接下游绘画节点，可确认后发送"), xu(!1);
        } catch (lr) {
          throw console.error("[ImageAnnotation] 保存失败:", lr), Ai("error", "标注保存失败，请重试"), lr;
        }
      }
    }) : null, ns && !oo && np ? c.jsx(ppo, {
      api: Ed
    }) : null, By && !oo && np ? c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: sn => sn.stopPropagation(),
      onPointerDown: sn => sn.stopPropagation(),
      children: c.jsx(opo, {
        settings: qb,
        onChange: M9,
        isDark: s,
        onClose: () => {
          Jv(!1), l(t.id, {
            settings: {
              suppressHoverUi: void 0
            }
          });
        },
        nodeId: t.id,
        previewImageUrl: np
      })
    }) : null, !oo && $f ? c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: sn => sn.stopPropagation(),
      onPointerDown: sn => sn.stopPropagation(),
      children: c.jsx(xbr, {
        open: !0,
        isDark: s,
        sourceNode: t,
        nodes: o,
        generateId: q,
        setNodes: ne,
        setSelectedNodeId: a,
        onClose: () => jh(!1)
      })
    }) : null, !oo && t1 ? c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: sn => sn.stopPropagation(),
      onPointerDown: sn => sn.stopPropagation(),
      children: c.jsx(wbr, {
        open: !0,
        sourceNode: t,
        nodes: o,
        generateId: q,
        setNodes: ne,
        setSelectedNodeId: a,
        onClose: () => Vb(!1)
      })
    }) : null, oo && Xd ? c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: sn => sn.stopPropagation(),
      onPointerDown: sn => sn.stopPropagation(),
      children: c.jsx(vbr, {
        open: !0,
        videoUrl: typeof td == "string" && td.trim() || Fl,
        sourceNode: t,
        nodes: o,
        generateId: q,
        setNodes: ne,
        setSelectedNodeId: a,
        onClose: () => p_(!1)
      })
    }) : null, a0 ? c.jsx(_br, {
      open: !0,
      videoUrl: oo ? typeof td == "string" && td.trim() || Fl : void 0,
      imageUrl: oo ? void 0 : ph || Fl,
      sourceNode: t,
      nodes: o,
      generateId: q,
      setNodes: ne,
      setSelectedNodeId: a,
      onClose: () => Bx(!1),
      isDark: s
    }) : null, oo && m_ ? c.jsx(kbr, {
      open: !0,
      videoUrl: typeof td == "string" && td.trim() || Fl,
      sourceNode: t,
      nodes: o,
      generateId: q,
      setNodes: ne,
      setSelectedNodeId: a,
      onClose: () => Gf(!1)
    }) : null, oo && kg ? c.jsx(Abr, {
      open: !0,
      videoUrl: typeof td == "string" && td.trim() || Fl,
      sourceNode: t,
      nodes: o,
      generateId: q,
      setNodes: ne,
      setSelectedNodeId: a,
      onClose: () => nA(!1)
    }) : null, oo && N3 ? c.jsx(Sbr, {
      open: !0,
      videoUrl: typeof td == "string" && td.trim() || Fl,
      sourceNode: t,
      nodes: o,
      generateId: q,
      setNodes: ne,
      setSelectedNodeId: a,
      onClose: () => j3(!1)
    }) : null, oo && D3 ? c.jsx(Ibr, {
      open: !0,
      videoUrl: typeof td == "string" && td.trim() || Fl,
      sourceNode: t,
      nodes: o,
      generateId: q,
      setNodes: ne,
      setSelectedNodeId: a,
      onClose: () => L3(!1)
    }) : null, oo && Fx ? c.jsx(Cbr, {
      open: !0,
      videoUrl: typeof td == "string" && td.trim() || Fl,
      sourceNode: t,
      nodes: o,
      generateId: q,
      setNodes: ne,
      setSelectedNodeId: a,
      onClose: () => O3(!1)
    }) : null, n0 && !oo && (np || Fl) ? c.jsx(cyr, {
      imageUrl: np || Fl,
      isDark: s,
      onClose: () => B0(!1),
      onExport: async sn => {
        await dyr({
          source: t,
          dataUrl: sn,
          setNodes: ne,
          setSelectedNodeId: a,
          generateId: q
        }), B0(!1);
      }
    }) : null, O0 && !oo && np ? c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: sn => sn.stopPropagation(),
      onPointerDown: sn => sn.stopPropagation(),
      children: c.jsx(spo, {
        isDark: s,
        settings: (Pe = t.settings) == null ? void 0 : Pe.portraitTexture,
        previewImageUrl: np,
        onChange: sn => l(t.id, {
          settings: {
            ...t.settings,
            portraitTexture: sn
          }
        }),
        onClose: () => Ff(!1),
        onGenerate: sn => {
          var lr;
          if (YQ((lr = t.settings) == null ? void 0 : lr.portraitTexture) && !String(t.content || "").trim()) {
            l(t.id, {
              settings: {
                ...t.settings,
                portraitTexture: {
                  ...sn,
                  isActive: !0
                }
              }
            }), Ff(!1);
            return;
          }
          l(t.id, {
            settings: {
              ...t.settings,
              portraitTexture: {
                ...sn,
                isActive: !1
              }
            }
          }), Ff(!1), queueMicrotask(() => y_(sn));
        }
      })
    }) : null, Fy && !oo && np ? c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: sn => sn.stopPropagation(),
      onPointerDown: sn => sn.stopPropagation(),
      children: c.jsx(lpo, {
        isDark: s,
        settings: (ot = t.settings) == null ? void 0 : ot.moodAdjust,
        previewImageUrl: np,
        apiConfigs: u,
        globalApiKey: y,
        nodeId: t.id,
        picking: Zm.picking,
        onPickingChange: sn => F0(Tn => ({
          ...Tn,
          picking: sn
        })),
        onAnalyzingChange: sn => F0(Tn => ({
          ...Tn,
          analyzing: sn
        })),
        onChange: sn => l(t.id, {
          settings: {
            ...t.settings,
            moodAdjust: sn
          }
        }),
        onClose: () => {
          F0({
            analyzing: !1,
            picking: !1
          }), _g(!1);
        },
        onGenerate: sn => {
          var lr;
          if (XQ((lr = t.settings) == null ? void 0 : lr.moodAdjust) && !String(t.content || "").trim()) {
            l(t.id, {
              settings: {
                ...t.settings,
                moodAdjust: {
                  ...sn,
                  isActive: !0
                }
              }
            }), _g(!1);
            return;
          }
          l(t.id, {
            settings: {
              ...t.settings,
              moodAdjust: {
                ...sn,
                isActive: !1
              }
            }
          }), _g(!1), queueMicrotask(() => rL(sn));
        }
      })
    }) : null, B3 && !oo ? c.jsx(cpo, {
      imageContent: yw || np || "",
      isDark: s,
      imageLoading: zl && !yw,
      savedParams: sA,
      onClose: sn => {
        sn && l(t.id, {
          settings: {
            ...t.settings,
            colorAdjustDraft: sn
          }
        }), rA(!1);
      },
      onApply: w9
    }) : null, F3 ? c.jsx(dpo, {
      imageUrls: iA,
      isDark: s,
      imageLoading: oo ? v9 || !iA.length : zl || !iA.length,
      savedState: GT,
      onClose: sn => {
        sn && l(t.id, {
          settings: {
            ...t.settings,
            lutColorDraft: sn
          }
        }), Hb(!1);
      },
      onApply: vI,
      onApplyVideo: oo ? oA : void 0
    }) : null, z3 && !oo && (yw || np) ? c.jsx(upo, {
      imageUrl: yw || np,
      imageLoading: zl && !yw,
      isDark: s,
      imageName: t.nodeName,
      naturalW: (Lo == null ? void 0 : Lo.w) || (Js == null ? void 0 : Js.w) || void 0,
      naturalH: (Lo == null ? void 0 : Lo.h) || (Js == null ? void 0 : Js.h) || void 0,
      onClose: () => ef(!1),
      onExportFrame: (sn, Tn, lr) => {
        x9(sn, Tn, lr);
      }
    }) : null, YD && !oo && wI ? c.jsx(Hmo, {
      isOpen: !0,
      onClose: () => {
        xI(!1), _I("");
      },
      imageUrl: wI,
      isDark: s,
      nodes: o,
      sourceNode: t,
      onConfirm: k9
    }) : null, r1 && !oo && _9 ? c.jsx(Wmo, {
      isOpen: !0,
      onClose: () => {
        cA(!1), G3("");
      },
      imageUrl: _9,
      isDark: s,
      nodes: o,
      sourceNode: t,
      onConfirm: $3
    }) : null, Ux && !oo && HT && Me ? c.jsx(Kmo, {
      documentSession: n,
      isOpen: !0,
      onClose: $x,
      imageUrl: HT,
      isDark: s,
      sourceNode: t,
      nodes: o,
      view: R,
      canvasPortalEl: (nt == null ? void 0 : nt.current) ?? null,
      runExpandImage: Me,
      imageConfigs: Vy,
      showHuyaModels: h,
      onStartGenerate: WT,
      onError: sn => Ai("error", sn.message || "扩图失败")
    }) : null, Gx && !oo && kI ? c.jsx(Jmo, {
      imageContent: kI,
      imageMimeType: "image/png",
      isDark: s,
      apiConfigs: u,
      globalApiKey: y,
      initialPlatformGroup: typeof ((Nt = t.settings) == null ? void 0 : Nt.textEditPlatformGroup) == "string" ? t.settings.textEditPlatformGroup : void 0,
      savedState: (mn = t.settings) == null ? void 0 : mn.textEditState,
      onStateChange: I9,
      onClose: () => Np(!1),
      onCancel: uA,
      onGenerated: a1
    }) : null, Bc && !oo && kI && (jp != null && jp.w || Lo != null && Lo.w || Js != null && Js.w) ? c.jsx(Zmo, {
      imageContent: kI,
      imageMimeType: "image/png",
      naturalWidth: (jp == null ? void 0 : jp.w) || (Lo == null ? void 0 : Lo.w) || (Js == null ? void 0 : Js.w) || 1024,
      naturalHeight: (jp == null ? void 0 : jp.h) || (Lo == null ? void 0 : Lo.h) || (Js == null ? void 0 : Js.h) || 1024,
      isDark: s,
      apiConfigs: u,
      globalApiKey: y,
      view: R,
      canvasPortalEl: (nt == null ? void 0 : nt.current) ?? null,
      sourceNode: t,
      platformGroup: typeof ((hr = t.settings) == null ? void 0 : hr.moveObjectPlatformGroup) == "string" ? t.settings.moveObjectPlatformGroup : "",
      onPlatformGroupChange: sn => l(t.id, {
        settings: {
          ...t.settings,
          moveObjectPlatformGroup: sn
        }
      }),
      initialJson: typeof ((ra = t.settings) == null ? void 0 : ra.moveObjectData) == "string" ? t.settings.moveObjectData : void 0,
      onClose: () => qT(!1),
      onConfirmed: ZD
    }) : null, c.jsxs("div", {
      className: `relative z-[1] flex flex-col min-h-0 min-w-0 flex-1 ${en ? "h-full" : ""}`,
      children: [K3 && c.jsxs("div", {
        className: `absolute right-2 top-[calc(-6px-1.25rem)] z-[130] flex min-h-5 max-w-[calc(100%-0.5rem)] items-center justify-end gap-1.5 leading-none ${nm ? "" : "pointer-events-none opacity-0"}`,
        children: [Jm ? c.jsx("span", {
          className: `min-w-0 shrink truncate text-[10px] font-light leading-none tabular-nums ${s ? "text-zinc-100" : "text-zinc-700"}`,
          title: Jm,
          children: Jm
        }) : null, xd ? c.jsx("button", {
          type: "button",
          "data-compact-gen-quick-start": !0,
          className: `box-border inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border bg-transparent p-0 text-sm leading-none transition-colors ${s ? "border-zinc-500 text-zinc-200 hover:border-zinc-400 hover:text-zinc-100" : "border-black text-zinc-700 hover:border-black hover:text-zinc-900"}`,
          onMouseDown: sn => {
            sn.stopPropagation(), Z7(t.id);
          },
          onMouseEnter: Kx,
          onMouseLeave: D9,
          onClick: sn => {
            sn.stopPropagation(), wA();
          },
          title: x("开始生成"),
          "aria-label": x("开始生成"),
          children: c.jsx(Ol, {
            size: 14,
            className: "shrink-0",
            fill: "currentColor",
            "aria-hidden": !0
          })
        }) : null]
      }), !en && Of && c.jsx(NFt, {
        variant: "banner",
        isDark: s,
        message: Xm,
        onMouseDown: sn => sn.stopPropagation()
      }), en && c.jsxs("div", {
        className: "relative flex-1 min-h-0 w-full",
        children: [c.jsx(Zuo, {
          ref: jt,
          node: t,
          isDark: s,
          isVideoNode: oo,
          isNodeSelected: r === t.id,
          showGenNodeErrorBanner: Of,
          hasCompactDisplayContent: Rp,
          showCompactVideoMediaPending: fw,
          compactVideoFrameReady: hh,
          compactGenErrorDisplay: Xm,
          showOssThumbViewportShell: iL,
          mountOssThumbOnCanvas: Xe,
          compactGenImgSrc: xw,
          compactGenVideoPlaybackSrc: td,
          compactGenImgLazyLoading: Ym,
          compactVideoBlobUrl: uh,
          compactGenVideoPosterSrc: _m,
          compactVideoIntrinsic: Xp,
          compactWidgetPromptOpen: gn,
          compactSingleImagePreviewFailed: Lc,
          compactSingleImageDims: Js,
          showCompactCenterStartCta: tp,
          isCompactGeneratingAny: Jp,
          compactProgressFadeOut: Xv,
          enableGenerationNodeAnimation: xe,
          onPreviewHoverEnter: qx,
          onPreviewHoverLeave: j9,
          onPreviewDoubleClick: km,
          onViewResult: gl,
          onApplyResult: Je,
          onPreviewPointerDown: yn,
          onPreviewContextMenu: sn => {
            if (!pe) return;
            const Tn = oo ? td || Jl || "" : Jl || "";
            Tn && (sn.preventDefault(), sn.stopPropagation(), pe({
              visible: !0,
              x: sn.clientX,
              y: sn.clientY,
              item: {
                url: Tn,
                type: oo ? "video" : "image",
                sourceNode: t,
                prompt: (t.prompt || "").trim(),
                selectedUrls: [Tn],
                selectedIndices: [0]
              }
            }));
          },
          onCompactVideoLoadedMetadata: Zs,
          onCompactVideoLoadedData: Qs,
          onCompactVideoCanPlay: Wo,
          onCompactSingleImageError: Xo,
          onCompactImageIntrinsicSize: fl,
          onRetryImagePreview: Oc,
          onStartGenerate: wA,
          onProgressFadeEnd: Eo,
          updateNode: l,
          progressFillRef: Qm,
          progressThinBarRef: Qd,
          previewAnchorRef: bt,
          referenceStripOverlay: null,
          referenceStripOverlayRevision: "",
          cropSelectOverlay: qy,
          cropSelectOverlayRevision: za || fi || Ox || Fy ? `${za ? "c" : ""}${fi ? "m" : ""}${Ox ? "e" : ""}${Fy ? "d" : ""}:${gw.width}x${gw.height}:${String(((ti = (ka = t.settings) == null ? void 0 : ka.cropSelection) == null ? void 0 : ti.width) ?? 0)}:${em.length}:${ll || ""}:${UT}:${$y}:${Zm.analyzing ? 1 : 0}${Zm.picking ? 1 : 0}:${ju.selectedFaceId}:${ju.faces.map(sn => sn.bbox ? `${sn.id}:${sn.bbox.x}` : sn.id).join(",")}` : ""
        }), Ky && !Rp && !Jp ? c.jsx(o5i, {
          sourceId: t.id,
          rows: Ky.rows,
          nodes: o,
          isDark: s
        }) : null]
      }), Bf && ll && !oo && rf ? (() => {
        var Tr;
        const sn = em.find(Qr => Qr.id === ll),
          Tn = sn ?? Nh;
        if (!Tn) return null;
        const lr = sn || !Nh ? em : [...em, Nh];
        return c.jsx("div", {
          className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
          "data-marker-edit-panel": !0,
          style: {
            pointerEvents: "auto"
          },
          onClick: Qr => Qr.stopPropagation(),
          onMouseDown: Qr => Qr.stopPropagation(),
          children: c.jsx(ipo, {
            marker: Tn,
            markers: lr,
            isDark: s,
            imageWidth: e8,
            imageHeight: b_,
            imageUrl: rf,
            apiConfigs: u,
            globalApiKey: y,
            nodeId: t.id,
            platformGroup: typeof ((Tr = t.settings) == null ? void 0 : Tr.markerEditPlatformGroup) == "string" ? t.settings.markerEditPlatformGroup : "",
            onPlatformGroupChange: Qr => l(t.id, {
              settings: {
                ...t.settings,
                markerEditPlatformGroup: Qr
              }
            }),
            onClose: () => {
              Gb(!1), zy(null), zf(null);
            },
            onExitMode: xG,
            onSave: vw,
            onSaveCommit: C9,
            onLevelChange: pA,
            onRadiusChange: Qr => {
              const Sa = em.map(Ka => Ka.id === Tn.id ? {
                ...Ka,
                radius: Qr
              } : Ka);
              bw(Sa);
            }
          })
        });
      })() : null, c.jsx("div", {
        ref: vu,
        "data-gen-prompt-panel": "true",
        "data-gen-prompt-panel-host": en && gn ? "" : void 0,
        "data-floating-placement": ft ? Qy.offset.placement : void 0,
        className: en ? gn && !fi && !ht ? wD : "hidden" : fi ? "hidden" : "flex flex-col shrink-0 min-w-0 overflow-visible",
        style: {
          ...(o1 ? {
            transform: o1
          } : {}),
          ...(en && gn ? zVe : {})
        },
        onMouseEnter: en && gn ? qx : void 0,
        onMouseLeave: en && gn ? j9 : void 0,
        onMouseDown: sn => {
          sn.button === 0 && (xt(), sn.stopPropagation());
        },
        onDoubleClick: Ic,
        children: c.jsxs("div", {
          ref: Bt,
          "data-gen-prompt-panel": "true",
          className: ft ? `gen-prompt-panel-enter box-border flex min-h-0 w-full min-w-0 flex-1 flex-col rounded-2xl border px-3 pb-2 pt-3 ${s ? W4e : q4e}` : "flex w-full min-w-0 flex-col",
          style: n8,
          onTransitionEnd: sn => {
            sn.propertyName === "transform" && (at.current = 0, window.requestAnimationFrame(() => {
              wn.current();
            }));
          },
          onMouseDown: sn => {
            sn.button === 0 && (xt(), sn.stopPropagation());
          },
          onDoubleClick: Ic,
          children: [c.jsxs("div", {
            className: ft ? "relative flex flex-1 min-h-0 min-w-0 flex-col overflow-x-hidden overflow-y-hidden" : "contents",
            children: [!en || gn && r8 ? c.jsx(FUt, {
              isDark: s,
              node: t,
              currentModel: rn,
              activeReferenceStripRows: tt,
              genReferenceStripThumbs: Qe,
              genPromptExpandControl: xl,
              hasTextEditData: zn,
              hasMoveObjectData: Yr,
              lightingNodeCount: Object.keys(wa).length,
              lightingPromptSummary: Ba,
              markersFeedback: Gi,
              isSeedanceLikeMaterialsModel: ct,
              seedanceMaterialsCount: kn,
              seedanceMaterialInputRef: Wn,
              seedanceReplaceIndexRef: wr,
              onReorderImages: Ub,
              onRemoveImage: ls,
              onUpdatePrompt: sn => {
                sn !== (t.prompt || "") && l(t.id, {
                  prompt: sn
                });
              },
              onOpenSeedanceMaterialLightbox: cr,
              onSetSeedanceReplaceMenu: _n,
              focusEditActive: Ae,
              onToggleFocusEdit: Gn,
              upstreamTextNodes: Oa,
              upstreamAgentNodes: Fa,
              upstreamLightingNodes: xa,
              upstreamPortraitTextureNodes: Aa,
              isPortraitTexturePanelOpen: O0,
              onTogglePortraitTexturePanel: g_,
              onRemovePortraitTexture: (sn, Tn) => {
                Ff(!1), Xh(sn, Tn);
              },
              showPortraitTexturePreview: dc,
              onTogglePortraitTexturePreview: () => Ls("portraitTexture"),
              upstreamMoodAdjustNodes: pn,
              isMoodAdjustPanelOpen: Fy,
              onToggleMoodAdjustPanel: U0,
              onRemoveMoodAdjust: (sn, Tn) => {
                _g(!1), Pp(sn, Tn);
              },
              showMoodAdjustPreview: Tl,
              onToggleMoodAdjustPreview: () => Ls("moodAdjust"),
              upstreamTextEditNodes: Mn,
              upstreamMoveObjectNodes: mr,
              upstreamAngleNodes: Vi,
              showUpstreamTextPreview: vo,
              onToggleUpstreamTextPreview: () => Ls("upstream"),
              showLightingPreview: ci,
              onToggleLightingPreview: () => Ls("lighting"),
              showTextEditPreview: ji,
              onToggleTextEditPreview: () => Ls("textEdit"),
              showMoveObjectPreview: ts,
              onToggleMoveObjectPreview: () => Ls("moveObject"),
              showAnglePreview: Ts,
              onToggleAnglePreview: () => Ls("angle"),
              onRemoveUpstreamNode: Ms,
              onRemoveLighting: ks,
              onRemoveTextEdit: Yo,
              onRemoveMoveObject: Vc,
              onRemoveAngle: zd,
              onAddFromCanvas: Ps,
              canvasPickActive: Z === t.id,
              startEndFramesSignature: er,
              startEndFramesSlot: c.jsx(Lho, {
                inline: !0,
                node: t,
                isDark: s,
                currentModel: rn,
                connectingTarget: A,
                connectingInputType: S,
                startFrameUrl: Rn,
                endFrameUrl: Un,
                onInputMouseDown: t0,
                onInputMouseUp: yu,
                onRemoveFrame: Cr,
                onUpdatePrompt: sn => {
                  sn !== (t.prompt || "") && l(t.id, {
                    prompt: sn
                  });
                },
                onSwapFrames: () => {
                  M(sn => x1i(sn, t.id));
                }
              })
            }) : gn ? c.jsx("div", {
              className: "mb-2 h-[38px] shrink-0",
              "aria-hidden": !0
            }) : null, c.jsx(Nho, {
              isDark: s,
              connectedStoryboardNode: xr,
              storyboardJsonData: qr
            }), c.jsx("div", {
              className: `group/prompt relative z-0 min-w-0 shrink-0 overflow-hidden ${ft ? "mb-1" : "mb-2"}`,
              children: c.jsx("div", {
                className: `w-full flex flex-col min-w-0 overflow-hidden ${ft ? "px-2 py-1" : "p-2"} ${s ? "bg-transparent border-0" : "bg-transparent border border-transparent"}`,
                children: t.type === "gen-image" && !nn && !D ? c.jsxs("div", {
                  className: `flex flex-col min-w-0 overflow-hidden shrink-0 ${_Ut}`,
                  style: {
                    height: tfn,
                    maxHeight: tfn
                  },
                  onMouseDown: sn => sn.stopPropagation(),
                  onClick: sn => sn.stopPropagation(),
                  children: [c.jsx("div", {
                    className: "flex items-center shrink-0 mb-1.5",
                    children: c.jsxs("button", {
                      type: "button",
                      className: "flex items-center gap-1 text-[11px] font-semibold",
                      onClick: () => pt(!0),
                      onMouseDown: sn => sn.stopPropagation(),
                      children: [c.jsx("span", {
                        className: s ? "text-white" : "text-zinc-700",
                        children: x("常用提示词库")
                      }), c.jsx(ss, {
                        size: 12,
                        className: `rotate-90 ${s ? "text-white" : "text-zinc-500"}`
                      })]
                    })
                  }), c.jsx("div", {
                    "data-scrollable": "true",
                    className: `flex-1 min-h-0 overflow-y-auto scrollbar-hide ${cZe}`,
                    style: {
                      maxHeight: nfn
                    },
                    onMouseDown: sn => sn.stopPropagation(),
                    children: c.jsxs("div", {
                      className: "flex flex-wrap gap-1.5 content-start",
                      children: [Ut.map(sn => c.jsx("button", {
                        "data-gen-prompt-apply": !0,
                        type: "button",
                        title: x("点击应用：{0}", sn.name),
                        onClick: Tn => {
                          Tn.stopPropagation(), l(t.id, {
                            prompt: sn.prompt.trim()
                          }), pt(!0);
                        },
                        onPointerDown: Tn => Tn.stopPropagation(),
                        onMouseDown: Tn => Tn.stopPropagation(),
                        className: `relative z-10 h-7 rounded-lg px-2.5 text-[11px] max-w-full truncate transition-colors ${s ? "bg-white/[0.05] text-zinc-100 hover:bg-white/[0.12] hover:text-white" : "bg-black/[0.04] text-zinc-800 hover:bg-black/[0.08]"}`,
                        children: fFe(sn.name)
                      }, sn.id)), Ut.length === 0 && c.jsx("div", {
                        className: `text-[11px] ${s ? "text-white" : "text-zinc-400"}`,
                        children: x("暂无常用提示词")
                      })]
                    })
                  })]
                }) : t.type === "gen-image" && D ? c.jsxs("div", {
                  className: "flex flex-col min-w-0 overflow-hidden shrink-0",
                  onMouseDown: sn => sn.stopPropagation(),
                  onClick: sn => sn.stopPropagation(),
                  children: [c.jsxs("div", {
                    className: "flex items-center justify-between shrink-0 mb-2",
                    children: [c.jsxs("span", {
                      className: `text-[11px] font-semibold ${s ? "text-white" : "text-zinc-700"}`,
                      children: [x("管理常用提示词（"), Ut.length, x(" 项）")]
                    }), c.jsx("button", {
                      type: "button",
                      className: `px-1.5 py-0.5 rounded-md text-[10px] transition-colors ${s ? "text-zinc-300 hover:text-white hover:bg-white/[0.1]" : "text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.06]"}`,
                      onClick: () => {
                        U(!1), gt(null), Y({
                          name: "",
                          prompt: ""
                        });
                      },
                      onMouseDown: sn => sn.stopPropagation(),
                      children: x("收起")
                    })]
                  }), c.jsxs("div", {
                    "data-scrollable": "true",
                    className: "shrink-0 overflow-y-auto minimal-scrollbar flex flex-wrap gap-1.5 content-start",
                    style: {
                      maxHeight: nfn
                    },
                    onMouseDown: sn => sn.stopPropagation(),
                    children: [Ut.map(sn => c.jsxs("div", {
                      className: `group rounded-lg pl-2.5 pr-1 h-7 flex items-center gap-1 text-[11px] max-w-full ${s ? "bg-white/[0.05] text-zinc-100" : "bg-black/[0.04] text-zinc-800"}`,
                      children: [c.jsx("span", {
                        className: "font-medium truncate max-w-[7.5rem]",
                        children: fFe(sn.name)
                      }), c.jsx("button", {
                        "data-gen-prompt-apply": !0,
                        type: "button",
                        onClick: Tn => {
                          Tn.stopPropagation(), l(t.id, {
                            prompt: sn.prompt.trim()
                          }), pt(!0), U(!1), gt(null), Y({
                            name: "",
                            prompt: ""
                          });
                        },
                        onPointerDown: Tn => Tn.stopPropagation(),
                        onMouseDown: Tn => Tn.stopPropagation(),
                        className: `relative z-10 px-1.5 py-0.5 rounded-md text-[10px] shrink-0 transition-colors ${s ? "text-zinc-100 hover:bg-white/[0.1]" : "text-zinc-800 hover:bg-black/[0.06]"}`,
                        children: x("应用")
                      }), c.jsx("button", {
                        type: "button",
                        onClick: () => {
                          Y({
                            name: sn.name,
                            prompt: sn.prompt
                          }), gt(sn.id);
                        },
                        className: `px-1.5 py-0.5 rounded-md text-[10px] transition-colors ${s ? "text-zinc-300 hover:text-white hover:bg-white/[0.1]" : "text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.06]"}`,
                        onMouseDown: Tn => Tn.stopPropagation(),
                        children: x("编辑")
                      }), c.jsx("button", {
                        type: "button",
                        onClick: Tn => {
                          Tn.stopPropagation(), At(lr => lr.filter(Tr => Tr.id !== sn.id)), lt === sn.id && (gt(null), Y({
                            name: "",
                            prompt: ""
                          }));
                        },
                        className: `px-1.5 py-0.5 rounded-md text-[10px] transition-colors ${s ? "text-zinc-300 hover:text-white hover:bg-white/[0.1]" : "text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.06]"}`,
                        onPointerDown: Tn => Tn.stopPropagation(),
                        onMouseDown: Tn => Tn.stopPropagation(),
                        children: x("删除")
                      })]
                    }, sn.id)), Ut.length === 0 && c.jsx("div", {
                      className: `text-[11px] ${s ? "text-white" : "text-zinc-400"}`,
                      children: x("暂无常用提示词")
                    })]
                  }), c.jsx("div", {
                    className: "shrink-0 mt-2 pt-2 border-t border-dashed",
                    style: {
                      borderColor: s ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
                    },
                    children: c.jsx(eho, {
                      isDark: s,
                      promptLibraryForm: H,
                      setPromptLibraryForm: Y,
                      setPromptLibrary: At,
                      editingId: lt || void 0,
                      onCancelEdit: () => gt(null)
                    })
                  })]
                }) : Ky ? c.jsx(s5i, {
                  rows: Ky.rows,
                  channels: Ky.channels,
                  nodes: o,
                  selectedIds: Array.isArray((Li = t.settings) == null ? void 0 : Li.tableBatchSelectedRowIds) ? t.settings.tableBatchSelectedRowIds : null,
                  isDark: s,
                  onToggleRow: sn => {
                    var Qr;
                    const Tn = Ky.rows.filter(YUe).map(Sa => Sa.id),
                      lr = Array.isArray((Qr = t.settings) == null ? void 0 : Qr.tableBatchSelectedRowIds) ? t.settings.tableBatchSelectedRowIds : Tn,
                      Tr = lr.includes(sn) ? lr.filter(Sa => Sa !== sn) : [...lr, sn];
                    l(t.id, {
                      settings: {
                        ...t.settings,
                        tableBatchSelectedRowIds: Tr
                      }
                    });
                  }
                }) : (!en || gn) && r8 ? c.jsx(cEe, {
                  nodeId: t.id,
                  nodeType: t.type,
                  value: _s,
                  onChange: sn => {
                    Pl || l(t.id, {
                      prompt: sn
                    });
                  },
                  placeholder: x(sr ? "灯光提示词预览" : da ? "文字编辑预览" : la ? "移动对象预览" : Ta ? "3D角度提示词预览" : Wa ? "人像质感提示词预览" : pi ? "情绪调节提示词预览" : na ? "提示词由上游节点提供" : "输入提示词..."),
                  isDark: s,
                  videoUrl: ((zi = t.settings) == null ? void 0 : zi.klingVideoUrl) || void 0,
                  seedanceMaterials: Zt,
                  assetAtMentionItems: Bn,
                  assetAtMentionCategories: vr,
                  onSelectAssetAtMention: Et,
                  auxiliaryPromptEditMode: It,
                  promptExpanded: !!((Ni = t.settings) != null && Ni.promptInputExpanded),
                  onPromptExpandedChange: sn => l(t.id, {
                    settings: {
                      ...t.settings,
                      promptInputExpanded: sn
                    }
                  }),
                  compactFloatingPromptPanel: ft,
                  compactAutoFocusSeq: et,
                  promptOverflowRemeasureKey: `${xA.toFixed(2)}:${ft ? 1 : 0}`,
                  expandControlOnReferenceStrip: t.type === "gen-image" || t.type === "gen-video",
                  onExpandControlChange: Bi,
                  focusEditThumbCache: ((Io = t.settings) == null ? void 0 : Io.focusEditThumbCache) || {},
                  promptReferenceItems: tr
                }, `${t.id}-upstream-preview-${Ml ? 1 : 0}-${sr ? 1 : 0}-${da ? 1 : 0}-${la ? 1 : 0}-${Ta ? 1 : 0}-${Wa ? 1 : 0}-${pi ? 1 : 0}`) : !en || gn ? c.jsx("div", {
                  className: `gen-prompt-panel-shell-placeholder pointer-events-none select-none ${s ? "text-zinc-500" : "text-zinc-400"}`,
                  style: {
                    height: 80,
                    minHeight: 80
                  },
                  "aria-hidden": !0,
                  children: c.jsx("div", {
                    className: "px-1 pt-1 text-sm leading-6",
                    children: x("输入提示词...")
                  })
                }) : null
              })
            }), t.type === "gen-video" && ct ? c.jsx("input", {
              ref: Wn,
              type: "file",
              accept: "image/jpeg,image/png,image/webp,image/gif,image/bmp,video/mp4,video/quicktime,video/x-m4v,audio/mpeg,audio/wav,audio/mp4,audio/aac,audio/ogg,audio/x-flac,.mp3,.wav,.m4a,.aac,.ogg,.flac",
              className: "hidden",
              onChange: xn
            }) : null, jn ? c.jsx(Kho, {
              menu: jn,
              isDark: s,
              onClose: () => _n(null),
              onReplace: sn => {
                wr.current = sn, _n(null), setTimeout(() => {
                  var Tn;
                  return (Tn = Wn.current) == null ? void 0 : Tn.click();
                }, 0);
              }
            }) : null, c.jsx(qho, {
              node: t,
              isDark: s,
              currentModel: rn,
              characterLibrary: B,
              updateNode: l
            }), t.type === "gen-image" && !D && nn && !ft && c.jsx("div", {
              "data-node-header-toolbar": !0,
              className: `mb-1 min-h-0 shrink-0 rounded-lg p-2 ${s ? "bg-transparent" : "bg-zinc-50"}`,
              children: c.jsxs("button", {
                type: "button",
                className: "flex items-center gap-1 text-[11px] font-semibold",
                onClick: () => pt(!1),
                onMouseDown: sn => sn.stopPropagation(),
                children: [c.jsx("span", {
                  className: s ? "text-white" : "text-zinc-700",
                  children: x("常用提示词库")
                }), c.jsx(ss, {
                  size: 12,
                  className: s ? "text-white" : "text-zinc-500"
                })]
              })
            })]
          }), _A ? c.jsx(Eyr, {
            api: oL,
            chrome: O9
          }) : null, Ct && ((zo = t.settings) != null && zo.mjAdvancedOpen) ? c.jsx(Hho, {
            node: t,
            isDark: s,
            edgeToEdge: ft,
            thumbs: je.filter(sn => sn.mediaType === "image").map(sn => ({
              key: String(sn.refAssetId || sn.imgSrc).trim(),
              url: sn.imgSrc,
              thumbSrc: sn.referenceThumbSrc || sn.imgSrc
            })),
            updateNode: l
          }) : null, Cn && ((Jo = t.settings) != null && Jo.huyaMjAdvancedOpen) ? c.jsx(Who, {
            node: t,
            isDark: s,
            modelId: rn,
            edgeToEdge: ft,
            thumbs: je.filter(sn => sn.mediaType === "image").map(sn => ({
              key: String(sn.refAssetId || sn.imgSrc).trim(),
              url: sn.imgSrc,
              thumbSrc: sn.referenceThumbSrc || sn.imgSrc
            })),
            updateNode: l
          }) : null]
        })
      }), Yt && c.jsx(Oho, {
        previewImageUrl: Yt,
        onClose: () => qe(null)
      }), ar && c.jsx(Duo, {
        node: t,
        currentModel: rn,
        connections: T,
        nodes: o,
        setConnections: M
      }), (ar || en) && c.jsx(juo, {
        node: t,
        isDark: s,
        isWan26: un,
        isKlingOmni: Jn,
        isKlingV3: sIe(rn),
        currentModel: rn,
        currentModelConfig: Wr,
        globalApiKey: y,
        genUseAliyunOss: De,
        globalOssUploadEnabled: Ce,
        klingSubjectLibrary: N,
        setKlingSubjectsOpen: G,
        updateNode: l,
        showKlingSubjectSelector: Ir,
        setShowKlingSubjectSelector: Gr,
        showKlingImageUploadPanel: Zr,
        setShowKlingImageUploadPanel: La,
        showAudioSegmentSelector: _r,
        pendingAudioFile: Pa,
        onAudioClose: () => {
          Ea(!1), ba(null), Ar.current && (Ar.current.value = "");
        },
        onAudioConfirm: ta,
        showVideoSegmentSelector: fa,
        onVideoClose: () => {
          _a(!1), sa.current && (sa.current.value = "");
        },
        onVideoSegmentConfirm: ki
      })]
    })]
  });
}, Iuo);

function Lbr(e) {
  return e.showKlingSubjectSelector || e.showKlingImageUploadPanel || e.showAudioSegmentSelector || e.showVideoSegmentSelector;
}

const Ngn = 8;

function Ofo({
  node: e,
  selectedNodeId: t = null,
  setSelectedNodeId: n,
  setSelectedNodeIds: r,
  onGenPromptPanelUiChange: a,
  setActiveDropdown: i,
  storyboardCanvasPickTarget: o,
  compactRefCanvasPickTargetId: s = null,
  compactCanvasPickResumeSnap: l,
  focusEditPromptOpenSnap: d,
  currentModel: u,
  connectingSource: h,
  connectingTarget: p,
  isVideoNode: m,
  genOverlayUiOpen: f = !1,
  focusEditActive: y = !1
}) {
  var Y, K, W, Q, q;
  const [b, v] = g.useState(!1),
    [_, w] = g.useState(0),
    k = g.useRef(!1);
  k.current = b;
  const A = g.useRef(null),
    S = g.useRef(null),
    C = g.useRef(null),
    I = g.useRef(null),
    E = g.useRef(() => {}),
    M = g.useRef(0),
    T = g.useRef(0),
    P = g.useRef(0),
    R = g.useRef(!0),
    j = g.useRef(null),
    B = g.useRef(f);
  B.current = f;
  const F = g.useCallback(() => {
      zb(e.id, n, r, 500, {
        forceSingle: !0
      });
    }, [e.id, n, r]),
    N = g.useCallback(() => {
      F(), Dd(e.id, !0), DW(), a == null || a(e.id, !0), v(!0);
    }, [e.id, a, F]);
  g.useEffect(() => {
    DW();
  }, []), g.useEffect(() => {
    t === e.id && DW();
  }, [t, e.id]);
  const G = g.useCallback(() => {
      N(), w(ne => ne + 1);
    }, [N]),
    z = !!(o || s),
    V = s === e.id,
    O = !!(o || s && s !== e.id),
    L = b,
    D = g.useCallback(() => {
      Z7(e.id), v(!1), Dd(e.id, !1), a == null || a(e.id, !1), i == null || i(ne => (ne == null ? void 0 : ne.nodeId) === e.id ? null : ne);
    }, [e.id, a, i]),
    U = g.useCallback(() => {
      const ne = j.current;
      ne && (window.removeEventListener("pointermove", ne.move), window.removeEventListener("pointerup", ne.up), window.removeEventListener("pointercancel", ne.up), j.current = null);
    }, []),
    H = g.useCallback(ne => {
      if (ne.button !== 0 || ne.ctrlKey || ne.metaKey || ne.target.closest("[data-simple-video-controls]")) return;
      F(), U(), DW();
      const le = ne.clientX,
        J = ne.clientY,
        pe = ne.pointerId;
      let ce = !0;
      const we = Z => {
          Z.pointerId === pe && (y || Math.hypot(Z.clientX - le, Z.clientY - J) > Ngn && (ce = !1));
        },
        X = Z => {
          Z.pointerId === pe && (U(), ce && (Math.hypot(Z.clientX - le, Z.clientY - J) > Ngn || z && !y || N()));
        };
      j.current = {
        move: we,
        up: X
      }, window.addEventListener("pointermove", we), window.addEventListener("pointerup", X), window.addEventListener("pointercancel", X);
    }, [U, N, z, y, F]);
  return g.useEffect(() => () => {
    U();
  }, [U]), g.useEffect(() => {
    const ne = de => {
      if (de === e.id) {
        if (y) {
          Mot(e.id);
          return;
        }
        if (z) {
          Mot(e.id);
          return;
        }
        Mot(e.id) && N();
      }
    };
    return ne(e.id), egi(ne);
  }, [e.id, G, z, y]), g.useEffect(() => {
    y && D();
  }, [y, D]), g.useEffect(() => {
    l && l.genNodeId === e.id && l.t !== T.current && (T.current = l.t, N());
  }, [e.id, l, N]), g.useEffect(() => {
    d && d.genNodeId === e.id && d.t !== P.current && (P.current = d.t, G());
  }, [e.id, d, G]), g.useEffect(() => dOn(D), [D]), g.useEffect(() => {
    O && (Z7(e.id), v(!1), Dd(e.id, !1), a == null || a(e.id, !1), i == null || i(ne => (ne == null ? void 0 : ne.nodeId) === e.id ? null : ne));
  }, [O, e.id, a, i]), g.useEffect(() => {
    if (!b) return;
    const ne = b && pP(e),
      de = le => {
        var we;
        const J = le.target;
        if (!J || V || B.current || (we = A.current) != null && we.contains(J)) return;
        const pe = J instanceof Element ? J : J.parentElement;
        if (pe != null && pe.closest("[data-gen-model-overlay-root], [data-gen-model-overlay-panel], [data-kling-overlay-backdrop]") || pe != null && pe.closest(".node-dropdown-menu, [data-gen-node-portal-dropdown]") || pe != null && pe.closest("[data-focus-edit-mode-banner]") || bW(J)) return;
        const ce = !!(pe != null && pe.closest(".node-output-connector-hit, .node-input-connector-hit, .connector"));
        if (!(ne && (h || p || ce))) {
          if (y) {
            (pe == null ? void 0 : pe.closest(".node-wrapper")) || D();
            return;
          }
          D();
        }
      };
    return window.addEventListener("pointerdown", de, !0), () => window.removeEventListener("pointerdown", de, !0);
  }, [D, b, e.type, (Y = e.settings) == null ? void 0 : Y.veoFramesMode, (K = e.settings) == null ? void 0 : K.geminiOmniFlashWorkflowMode, (W = e.settings) == null ? void 0 : W.klingNative4kWorkflowMode, (Q = e.settings) == null ? void 0 : Q.happyHorseWorkflowMode, (q = e.settings) == null ? void 0 : q.model, u, h, p, y, V]), g.useEffect(() => {
    !V && t != null && t !== e.id && b && !y && D();
  }, [t, e.id, b, D, y, V]), g.useEffect(() => {
    b || (Dd(e.id, !1), a == null || a(e.id, !1));
  }, [b, e.id, a]), g.useEffect(() => () => {
    Dd(e.id, !1);
  }, [e.id]), g.useEffect(() => {
    R.current || v(!1), R.current = !0;
  }, []), {
    compactWidgetPromptOpen: b,
    compactWidgetPromptOpenRef: k,
    compactPromptAutoFocusSeq: _,
    isCompactFloatingPromptPanel: L,
    suppressCompactPromptOnPreviewClick: z,
    compactWidgetRootRef: A,
    compactGenPreviewRef: S,
    compactGenPreviewAnchorRef: C,
    compactGenStackRef: I,
    computeCompactStackAlignRef: E,
    compactGenAlignSettleUntilRef: M,
    openCompactWidgetPromptPanel: N,
    closeCompactWidgetPromptPanel: D,
    restoreGenNodeCanvasSelection: F,
    handleCompactPreviewPointerDown: H
  };
}

function Obr({
  node: e,
  updateNode: t,
  latestVideoInfoRef: n
}) {
  var R, j, B, F;
  const [r, a] = g.useState(""),
    i = g.useRef(null),
    [o, s] = g.useState(!1),
    [l, d] = g.useState(null),
    [u, h] = g.useState(!1),
    p = g.useRef(null),
    [m, f] = g.useState(!1),
    y = o,
    b = !!((R = e.settings) != null && R.showVideoSegmentSelector),
    v = l,
    _ = (j = e.settings) == null ? void 0 : j.pendingVideoFile,
    w = (B = e.settings) == null ? void 0 : B.wan26AudioSegment,
    k = (F = e.settings) == null ? void 0 : F.klingVideoSegment,
    A = g.useCallback(N => {
      s(N), t(e.id, {
        settings: {
          ...e.settings,
          showAudioSegmentSelector: N
        }
      });
    }, [e.id, e.settings, t]),
    S = g.useCallback(N => {
      d(N), t(e.id, {
        settings: {
          ...e.settings,
          pendingAudioFile: N
        }
      });
    }, [e.id, e.settings, t]),
    C = g.useCallback(N => {
      t(e.id, {
        settings: {
          ...e.settings,
          wan26AudioSegment: N
        }
      });
    }, [e.id, e.settings, t]),
    I = g.useCallback(N => {
      t(e.id, {
        settings: {
          ...e.settings,
          showVideoSegmentSelector: N
        }
      });
    }, [e.id, e.settings, t]),
    E = g.useCallback(N => {
      t(e.id, {
        settings: {
          ...e.settings,
          pendingVideoFile: N
        }
      });
    }, [e.id, e.settings, t]),
    M = g.useCallback(N => {
      t(e.id, {
        settings: {
          ...e.settings,
          klingVideoSegment: N
        }
      });
    }, [e.id, e.settings, t]),
    T = g.useCallback((N, G) => {
      l && (t(e.id, {
        settings: {
          ...e.settings,
          wan26AudioFile: l,
          wan26AudioSegment: {
            startTime: N,
            endTime: G
          },
          showAudioSegmentSelector: !1,
          pendingAudioFile: null
        }
      }), s(!1), d(null), a(""));
    }, [l, e.id, e.settings, t]),
    P = g.useCallback((N, G, z, V, O, L) => {
      n.current = {
        klingVideoUrl: V,
        klingVideoReferType: O || "base",
        klingVideoKeepSound: L || "yes",
        klingVideoSegment: {
          startTime: G,
          endTime: z
        }
      };
      const D = {
        ...e.settings,
        klingVideoFile: N,
        klingVideoSegment: {
          startTime: G,
          endTime: z
        },
        klingVideoUrl: V,
        klingVideoReferType: O || "base",
        klingVideoKeepSound: L || "yes",
        showVideoSegmentSelector: !1,
        pendingVideoFile: null
      };
      let U = e.prompt || "";
      V && !U.includes("<<<video_1>>>") && (U = U ? `${U} <<<video_1>>>` : "<<<video_1>>>"), t(e.id, {
        settings: D,
        prompt: U
      });
    }, [n, e.id, e.prompt, e.settings, t]);
  return {
    wan26AudioError: r,
    setWan26AudioError: a,
    wan26AudioFileInputRef: i,
    showAudioSegmentSelector: y,
    pendingAudioFile: v,
    showVideoSegmentSelector: b,
    pendingVideoFile: _,
    wan26AudioSegment: w,
    klingVideoSegment: k,
    showKlingSubjectSelector: u,
    setShowKlingSubjectSelector: h,
    showKlingImageUploadPanel: m,
    setShowKlingImageUploadPanel: f,
    klingVideoFileInputRef: p,
    setShowAudioSegmentSelector: A,
    setPendingAudioFile: S,
    setWan26AudioSegment: C,
    setShowVideoSegmentSelector: I,
    setPendingVideoFile: E,
    setKlingVideoSegment: M,
    handleAudioSegmentConfirm: T,
    handleVideoSegmentConfirm: P
  };
}

function Bfo(e) {
  var s;
  const t = e.node.type === "gen-video",
    n = ((s = e.node.settings) == null ? void 0 : s.model) || (e.node.type === "gen-image" ? "qwen-image-edit" : "sora-2"),
    r = g.useRef({}),
    a = Obr({
      node: e.node,
      updateNode: e.updateNode,
      latestVideoInfoRef: r
    }),
    i = Lbr(a),
    o = Ofo({
      node: e.node,
      selectedNodeId: e.selectedNodeId,
      setSelectedNodeId: e.setSelectedNodeId,
      setSelectedNodeIds: e.setSelectedNodeIds,
      onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
      setActiveDropdown: e.setActiveDropdown,
      storyboardCanvasPickTarget: e.storyboardCanvasPickTarget,
      compactRefCanvasPickTargetId: e.compactRefCanvasPickTargetId,
      compactCanvasPickResumeSnap: e.compactCanvasPickResumeSnap,
      focusEditPromptOpenSnap: e.focusEditPromptOpenSnap,
      currentModel: n,
      connectingSource: e.connectingSource,
      connectingTarget: e.connectingTarget,
      isVideoNode: t,
      genOverlayUiOpen: i,
      focusEditActive: e.focusEditActive
    });
  return c.jsx(Dbr, {
    ...e,
    renderVariant: "compact",
    compactUi: o,
    compactWidgetPromptOpen: o.compactWidgetPromptOpen,
    genOverlayUiOpen: i,
    fullOverlay: a,
    latestVideoInfoRef: r
  });
}

function Ffo(e) {
  return c.jsx(Bfo, {
    ...e
  });
}

const Bbr = Object.freeze(Object.defineProperty({
  __proto__: null,
  GenCompactImageVideoNodeEntry: Ffo
}, Symbol.toStringTag, {
  value: "Module"
}));

function zfo(e) {
  const t = g.useRef({}),
    n = Obr({
      node: e.node,
      updateNode: e.updateNode,
      latestVideoInfoRef: t
    });
  return c.jsx(Dbr, {
    ...e,
    renderVariant: "full",
    fullOverlay: n,
    latestVideoInfoRef: t,
    genOverlayUiOpen: Lbr(n)
  });
}

function Ufo(e) {
  return c.jsx(zfo, {
    ...e
  });
}

const Fbr = Object.freeze(Object.defineProperty({
  __proto__: null,
  GenFullImageVideoNodeEntry: Ufo
}, Symbol.toStringTag, {
  value: "Module"
}));

function zbr(e) {
  if (e && !e()) throw new DOMException("涂鸦导出已取消", "AbortError");
}

function Ubr(e, t, n) {
  return {
    mediaType: "image",
    imageSize: `${t}×${n}`,
    disableThumbnailCreationOnImport: !0,
    _originalSize: e.size,
    hasCustomSize: !0
  };
}

async function $br(e) {
  const {
      blob: t,
      targetNodeId: n,
      displaySize: r,
      setNodes: a,
      baseSettings: i,
      assetId: o,
      sourceLabel: s = "file://doodle-board"
    } = e,
    l = () => zbr(e.isCurrent);
  l(), await ni.init(), l();
  const u = await ni.saveBlobAsset(o, t, s, "local", void 0);
  l();
  let h = !1;
  try {
    const {
      localCacheManager: f,
      ensureCacheRootReadyForWrite: y
    } = await Ie(async () => {
      const {
        localCacheManager: b,
        ensureCacheRootReadyForWrite: v
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: b,
        ensureCacheRootReadyForWrite: v
      };
    }, void 0, import.meta.url);
    l(), await y(), l(), f.isAvailable() && (h = await f.saveAsset(o, t, t.type || "image/png", s, "local"));
  } catch {}
  if (l(), !u && !h) throw new Error("涂鸦图片本地缓存写入失败");
  const p = await i_(t, wm, $k);
  l();
  const m = URL.createObjectURL(p);
  try {
    Il(m, o);
    const f = $$({
      ...i,
      _blobUrl: m
    }, o, m);
    a(y => !e.isCurrent || e.isCurrent() ? y.map(b => b.id === n ? {
      ...b,
      content: m,
      width: r.width,
      height: r.height,
      settings: {
        ...f,
        [T0]: !1
      },
      _contentAssetId: o
    } : b) : y);
  } catch (f) {
    throw UHe(m), URL.revokeObjectURL(m), f;
  }
}

async function $fo(e) {
  const {
      setNodes: t
    } = e,
    n = () => zbr(e.isCurrent);
  n();
  const r = kc(e.wPx, e.hPx),
    a = e.baseSettings ?? Ubr(e.blob, e.wPx, e.hPx),
    i = e.assetId ?? `doodle_board_${e.nodeId}`,
    o = e.ossFileName ?? `${i}.png`;
  if (e.ossEnabled ?? ua()) {
    t(l => !e.isCurrent || e.isCurrent() ? l.map(d => d.id === e.nodeId ? {
      ...d,
      settings: {
        ...d.settings,
        [T0]: !0
      }
    } : d) : l);
    const s = URL.createObjectURL(e.blob);
    try {
      const l = await Uk(s, o);
      if (n(), l) {
        const d = Hv(l, a);
        return t(u => !e.isCurrent || e.isCurrent() ? u.map(h => h.id === e.nodeId ? {
          ...h,
          content: d.content || h.content,
          width: r.width,
          height: r.height,
          settings: {
            ...h.settings,
            ...d.settings
          },
          _contentAssetId: void 0
        } : h) : u), "oss";
      }
    } catch (l) {
      n(), console.warn("[doodleInputImageExport] OSS 上传失败，回退本地缓存:", l);
    } finally {
      try {
        URL.revokeObjectURL(s);
      } catch {}
    }
  }
  return n(), await $br({
    blob: e.blob,
    targetNodeId: e.nodeId,
    displaySize: r,
    setNodes: e.setNodes,
    baseSettings: a,
    assetId: i,
    sourceLabel: e.sourceLabel,
    isCurrent: e.isCurrent
  }), "local";
}

const IAe = Object.freeze(Object.defineProperty({
    __proto__: null,
    applyLocalDoodleBlobToInputImageNode: $br,
    buildDoodleInputImageBaseSettings: Ubr,
    persistDoodleBlobToInputImageNode: $fo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Gbr = e => `600 ${Math.max(8, e)}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`;

function Vbr(e, t) {
  e.save(), e.font = Gbr(t.fontSize);
  const n = t.text.split(`
`),
    r = Math.max(...n.map(a => e.measureText(a).width));
  return e.restore(), {
    width: r,
    height: n.length * t.fontSize * 1.25
  };
}

function jgn(e, t, n) {
  for (let r = t.length - 1; r >= 0; r -= 1) {
    const a = t[r];
    if (a.type !== "text") continue;
    const i = Vbr(e, a);
    if (n.x >= a.x && n.x <= a.x + i.width && n.y >= a.y && n.y <= a.y + i.height) return a;
  }
  return null;
}

function Gfo(e) {
  return new Promise((t, n) => {
    const r = new Image();
    /^https?:/i.test(e) && (r.crossOrigin = "anonymous"), r.onload = () => t(r), r.onerror = () => n(new Error("无法加载原图")), r.src = e;
  });
}

function Vfo(e, t, n, r, a, i) {
  const o = Math.atan2(a - n, r - t),
    s = Math.max(10, i * 3.2);
  e.beginPath(), e.moveTo(t, n), e.lineTo(r, a), e.stroke(), e.beginPath(), e.moveTo(r, a), e.lineTo(r - s * Math.cos(o - Math.PI / 7), a - s * Math.sin(o - Math.PI / 7)), e.lineTo(r - s * Math.cos(o + Math.PI / 7), a - s * Math.sin(o + Math.PI / 7)), e.closePath(), e.fill();
}

function Hfo(e, t) {
  if (t.length === 0) return;
  if (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.length === 1) {
    e.lineTo(t[0].x + .01, t[0].y + .01), e.stroke();
    return;
  }
  for (let r = 1; r < t.length - 1; r += 1) {
    const a = t[r],
      i = t[r + 1];
    e.quadraticCurveTo(a.x, a.y, (a.x + i.x) / 2, (a.y + i.y) / 2);
  }
  const n = t[t.length - 1];
  e.lineTo(n.x, n.y), e.stroke();
}

function Hbr(e, t) {
  e.save(), e.lineCap = "round", e.lineJoin = "round";
  for (const n of t) if (n.type !== "marker") {
    if (n.type === "brush") {
      e.strokeStyle = n.color, e.lineWidth = Math.max(.5, n.width), Hfo(e, n.points);
      continue;
    }
    if (n.type === "arrow") {
      e.strokeStyle = n.color, e.fillStyle = n.color, e.lineWidth = Math.max(.5, n.width), Vfo(e, n.start.x, n.start.y, n.end.x, n.end.y, n.width);
      continue;
    }
    if (n.type === "circle") {
      e.strokeStyle = n.color, e.lineWidth = Math.max(.5, n.width), e.beginPath(), e.ellipse(n.x + n.w / 2, n.y + n.h / 2, Math.abs(n.w) / 2, Math.abs(n.h) / 2, 0, 0, Math.PI * 2), e.stroke();
      continue;
    }
    e.fillStyle = n.color, e.font = Gbr(n.fontSize), e.textBaseline = "top", n.text.split(`
`).forEach((r, a) => {
      e.fillText(r, n.x, n.y + a * n.fontSize * 1.25);
    });
  }
  e.restore();
}

async function Wfo(e) {
  const t = await Gfo(e.imageUrl),
    n = Math.max(1, t.naturalWidth || e.sourceWidth),
    r = Math.max(1, t.naturalHeight || e.sourceHeight),
    a = document.createElement("canvas");
  a.width = n, a.height = r;
  const i = a.getContext("2d");
  if (!i) throw new Error("无法创建合成画布");
  i.drawImage(t, 0, 0, n, r);
  const o = n / Math.max(1, e.sourceWidth),
    s = r / Math.max(1, e.sourceHeight);
  return i.save(), i.scale(o, s), Hbr(i, e.elements), i.restore(), new Promise((l, d) => {
    a.toBlob(u => u ? l(u) : d(new Error("合成图导出失败")), "image/png");
  });
}

const qfo = [{
  id: "mark",
  label: "标记",
  icon: sxe
}, {
  id: "brush",
  label: "画笔",
  icon: nw
}, {
  id: "arrow",
  label: "箭头",
  icon: eI
}, {
  id: "text",
  label: "文字",
  icon: _U
}, {
  id: "circle",
  label: "圆形",
  icon: YHe
}];

function Kfo(e) {
  on();
  const t = e.isDark !== !1,
    n = e.tool !== "mark";
  return c.jsxs("div", {
    "data-smart-edit-toolbar": !0,
    className: `relative flex items-center gap-1 ${e.embedded ? "max-w-full flex-wrap justify-center rounded-xl px-1.5 py-1" : "rounded-full px-2 py-1.5"} ${t ? "bg-[#202022] text-white" : "border border-black/10 bg-white text-zinc-800"}`,
    children: [qfo.map(r => {
      const a = r.icon,
        i = e.tool === r.id;
      return c.jsx("button", {
        type: "button",
        className: `flex items-center justify-center transition-colors ${e.embedded ? "h-8 rounded-lg" : "h-9 rounded-full"} ${r.id === "mark" ? "min-w-[52px] px-3 text-[13px]" : e.embedded ? "w-8" : "w-9"} ${i ? t ? "bg-white/14 text-white" : "bg-[#18181b] text-white" : t ? "text-white/70 hover:bg-white/8 hover:text-white" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"}`,
        "aria-label": r.label,
        title: r.label,
        "data-tool": r.id,
        onClick: () => e.onToolChange(r.id),
        children: r.id === "mark" ? x("标记") : c.jsx(a, {
          size: 16,
          strokeWidth: 1.75
        })
      }, r.id);
    }), c.jsx("span", {
      className: `mx-1 h-5 w-px ${t ? "bg-white/10" : "bg-black/10"}`,
      "aria-hidden": !0
    }), c.jsx("button", {
      type: "button",
      className: `flex items-center justify-center ${e.embedded ? "h-8 w-8 rounded-lg" : "h-9 w-9 rounded-full"} ${t ? "text-white/70 hover:bg-white/8 hover:text-white disabled:text-white/25" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 disabled:text-zinc-300"}`,
      "aria-label": x("撤销"),
      title: x("撤销 Ctrl+Z"),
      disabled: !e.canUndo,
      onClick: e.onUndo,
      children: c.jsx(d_, {
        size: 16,
        strokeWidth: 1.75
      })
    }), c.jsx("button", {
      type: "button",
      className: `flex items-center justify-center ${e.embedded ? "h-8 w-8 rounded-lg" : "h-9 w-9 rounded-full"} ${t ? "text-white/70 hover:bg-white/8 hover:text-white disabled:text-white/25" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 disabled:text-zinc-300"}`,
      "aria-label": x("重做"),
      title: x("重做 Ctrl+Shift+Z"),
      disabled: !e.canRedo,
      onClick: e.onRedo,
      children: c.jsx(J$, {
        size: 16,
        strokeWidth: 1.75
      })
    }), n ? c.jsx("div", {
      "data-smart-edit-palette": !0,
      className: `${e.embedded ? "relative flex w-full justify-center" : "absolute left-1/2 top-full z-10 mt-2 flex -translate-x-1/2"} items-center gap-1.5 rounded-full px-2 py-1.5 ${t ? "bg-[#202022]" : "border border-black/10 bg-white"}`,
      children: PVn.map(r => c.jsx("button", {
        type: "button",
        className: `h-4 w-4 rounded-full border ${e.color === r ? t ? "border-white ring-2 ring-white/30" : "border-zinc-900 ring-2 ring-zinc-900/20" : t ? "border-white/20" : "border-black/15"}`,
        style: {
          backgroundColor: r
        },
        "aria-label": r,
        onClick: () => e.onColorChange(r)
      }, r))
    }) : null]
  });
}

const Jz = 320,
  nY = 180,
  Cct = Jz / nY,
  Qfo = 272,
  Yfo = 132;

function wPe(e, t, n) {
  return Math.min(n, Math.max(t, e));
}

function Xfo(e) {
  return {
    width: Math.max(1, e.width),
    height: Math.max(1, e.height)
  };
}

function Dgn(e) {
  const t = Math.min(Jz / e.width, nY / e.height),
    n = e.width * t,
    r = e.height * t;
  return {
    width: n,
    height: r,
    x: (Jz - n) / 2,
    y: (nY - r) / 2
  };
}

function Ect(e, t) {
  return {
    x: t.target.x + (e.x - t.source.x) / t.source.width * t.target.width,
    y: t.target.y + (e.y - t.source.y) / t.source.height * t.target.height
  };
}

function Wbr(e) {
  return e.mode === "point" || e.width <= 0 || e.height <= 0;
}

function Jfo(e, t, n) {
  const r = Xfo(t);
  if (!n) return {
    source: {
      x: 0,
      y: 0,
      ...r
    },
    target: Dgn(r)
  };
  if (Wbr(e)) {
    let u = Math.min(Jz, r.width),
      h = Math.min(nY, r.height);
    return u / h > Cct ? u = h * Cct : h = u / Cct, {
      source: {
        width: Math.max(1, u),
        height: Math.max(1, h),
        x: wPe(e.x - u / 2, 0, r.width - u),
        y: wPe(e.y - h / 2, 0, r.height - h)
      },
      target: {
        x: 0,
        y: 0,
        width: Jz,
        height: nY
      }
    };
  }
  const a = Math.min(Qfo / Math.max(1, e.width), Yfo / Math.max(1, e.height)),
    i = {
      width: Jz / a,
      height: nY / a
    },
    o = Math.min(Math.max(1, i.width), r.width),
    s = Math.min(Math.max(1, i.height), r.height),
    l = e.x + e.width / 2,
    d = e.y + e.height / 2;
  return {
    source: {
      width: o,
      height: s,
      x: wPe(l - o / 2, 0, r.width - o),
      y: wPe(d - s / 2, 0, r.height - s)
    },
    target: Dgn({
      width: o,
      height: s
    })
  };
}

function Zfo(e, t) {
  if (Wbr(e)) return {
    mode: "point",
    point: Ect({
      x: e.x,
      y: e.y
    }, t)
  };
  const n = Ect({
      x: e.x,
      y: e.y
    }, t),
    r = Ect({
      x: e.x + e.width,
      y: e.y + e.height
    }, t);
  return {
    mode: "box",
    bounds: {
      x: n.x,
      y: n.y,
      width: r.x - n.x,
      height: r.y - n.y
    },
    pinPoint: r
  };
}

const ego = "M17.3934 5.23381C15.9629 3.80336 14.0226 3 11.9996 3C9.97668 3 8.03633 3.80336 6.60588 5.23381C5.17544 6.66426 4.37207 8.60461 4.37207 10.6276C4.37207 13.7102 6.25155 16.4555 7.98391 18.3503C9.18456 19.6635 10.5351 20.8191 11.9996 21.8264C13.4642 20.8191 14.8147 19.6635 16.0154 18.3503C17.7477 16.4555 19.6272 13.7102 19.6272 10.6276C19.6272 8.60461 18.8238 6.66426 17.3934 5.23381Z",
  tgo = "M12 2C14.2879 2.0001 16.4826 2.90846 18.1006 4.52637C19.7187 6.14443 20.627 8.33988 20.627 10.6279C20.6268 14.0977 18.5293 17.0824 16.7529 19.0254C15.4973 20.3987 14.0885 21.6034 12.5664 22.6504L12 23.04L11.4326 22.6504C9.9105 21.6034 8.50169 20.3987 7.24609 19.0254C5.4697 17.0824 3.37222 14.0977 3.37207 10.6279C3.37207 8.33988 4.28037 6.14443 5.89844 4.52637C7.5165 2.9083 9.71195 2 12 2Z",
  vDe = "left 600ms cubic-bezier(0.4, 0, 0.2, 1), top 600ms cubic-bezier(0.4, 0, 0.2, 1), width 600ms cubic-bezier(0.4, 0, 0.2, 1), height 600ms cubic-bezier(0.4, 0, 0.2, 1)";

function ngo(e) {
  const t = String(e).length;
  return t <= 1 ? 12 : t === 2 ? 9 : 7;
}

function rgo(e, t) {
  const [n, r] = g.useState(!1);
  return g.useEffect(() => {
    if (!e) {
      r(!1);
      return;
    }
    const a = window.setTimeout(() => r(!0), t);
    return () => window.clearTimeout(a);
  }, [e, t]), n;
}

function Lgn({
  index: e,
  x: t,
  y: n
}) {
  return c.jsxs("svg", {
    className: "pointer-events-none absolute block drop-shadow-[0_1px_2px_#0000003d] motion-reduce:transition-none",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    style: {
      left: t,
      top: n,
      transform: "translate(-12px, -23.04px)",
      transition: vDe
    },
    "aria-hidden": !0,
    children: [c.jsx("path", {
      d: ego,
      fill: Yce
    }), c.jsx("path", {
      d: tgo,
      fill: "none",
      stroke: "#fff",
      strokeWidth: 2
    }), c.jsx("text", {
      x: "12",
      y: "12.2",
      textAnchor: "middle",
      dominantBaseline: "middle",
      fill: "#fff",
      fontSize: ngo(e),
      fontWeight: 600,
      children: e
    })]
  });
}

function ago(e) {
  const t = Jfo(e.marker, {
      width: e.sourceWidth,
      height: e.sourceHeight
    }, e.zoomed),
    n = Zfo(e.marker, t),
    r = t.target.width / Math.max(1, t.source.width),
    a = typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return c.jsxs("div", {
    className: "relative block overflow-hidden rounded-xl bg-[#2a2a2c]",
    "data-smart-edit-marker-preview-content": !0,
    "data-zoomed": e.zoomed ? "true" : "false",
    style: {
      width: Jz,
      height: nY
    },
    children: [c.jsx("div", {
      className: "absolute overflow-hidden",
      style: {
        left: t.target.x,
        top: t.target.y,
        width: t.target.width,
        height: t.target.height,
        transition: a ? "none" : vDe
      },
      children: c.jsx("img", {
        alt: "",
        "aria-hidden": !0,
        draggable: !1,
        src: e.imageUrl,
        className: "pointer-events-none absolute block max-w-none select-none",
        style: {
          width: e.sourceWidth * r,
          height: e.sourceHeight * r,
          left: -t.source.x * r,
          top: -t.source.y * r,
          transition: a ? "none" : vDe
        }
      })
    }), c.jsx("div", {
      className: "pointer-events-none absolute inset-0",
      children: n.mode === "point" ? c.jsx(Lgn, {
        index: e.marker.markerIndex,
        x: n.point.x,
        y: n.point.y
      }) : c.jsxs(c.Fragment, {
        children: [c.jsx("div", {
          className: "absolute box-border border-2 border-dashed",
          style: {
            left: n.bounds.x,
            top: n.bounds.y,
            width: n.bounds.width,
            height: n.bounds.height,
            borderColor: Yce,
            transition: a ? "none" : vDe
          }
        }), c.jsx(Lgn, {
          index: e.marker.markerIndex,
          x: n.pinPoint.x,
          y: n.pinPoint.y
        })]
      })
    })]
  });
}

function igo(e) {
  const t = g.useRef(null),
    [n, r] = g.useState(!1),
    a = n || !!e.forceOpen,
    i = rgo(a, 500),
    [o, s] = g.useState({
      left: 0,
      bottom: 0
    });
  return g.useLayoutEffect(() => {
    var u;
    if (!a) return;
    const l = (u = t.current) == null ? void 0 : u.getBoundingClientRect();
    if (!l) return;
    const d = Jz + 8;
    s({
      left: Math.max(8, Math.min(l.left, window.innerWidth - d - 8)),
      bottom: Math.max(8, window.innerHeight - l.top + 8)
    });
  }, [a]), g.useEffect(() => {
    if (!e.forceOpen || n) return;
    const l = window.setTimeout(() => {
      var d;
      return (d = e.onForceOpenConsumed) == null ? void 0 : d.call(e);
    }, 2600);
    return () => window.clearTimeout(l);
  }, [n, e.forceOpen, e.onForceOpenConsumed]), c.jsxs("span", {
    ref: t,
    className: "relative inline-flex",
    onMouseEnter: () => r(!0),
    onMouseLeave: () => {
      var l;
      r(!1), e.forceOpen && ((l = e.onForceOpenConsumed) == null || l.call(e));
    },
    children: [e.children, a && typeof document < "u" ? Da.createPortal(c.jsx("div", {
      className: "pointer-events-none fixed z-[10080] rounded-2xl bg-[#2a2a2c] p-1 shadow-[0_8px_56px_#0000003d]",
      style: {
        left: o.left,
        bottom: o.bottom
      },
      "data-smart-edit-marker-preview": !0,
      children: c.jsx(ago, {
        marker: e.marker,
        imageUrl: e.imageUrl,
        sourceWidth: e.sourceWidth,
        sourceHeight: e.sourceHeight,
        zoomed: i
      })
    }), document.body) : null]
  });
}

function ogo() {
  return [{
    type: "text",
    text: ""
  }];
}

function U$e(e) {
  var n, r;
  const t = [];
  for (const a of e) {
    if (a.type === "marker") {
      if (t.some(o => o.type === "marker" && o.markerId === a.markerId)) continue;
      t.push(a);
      continue;
    }
    const i = t[t.length - 1];
    if ((i == null ? void 0 : i.type) === "text") {
      i.text += a.text;
      continue;
    }
    t.push({
      type: "text",
      text: a.text
    });
  }
  return (t.length === 0 || ((n = t[t.length - 1]) == null ? void 0 : n.type) !== "text") && t.push({
    type: "text",
    text: ""
  }), ((r = t[0]) == null ? void 0 : r.type) !== "text" && t.unshift({
    type: "text",
    text: ""
  }), t;
}

function sgo(e, t) {
  const n = U$e(e);
  return n.some(r => r.type === "marker" && r.markerId === t) ? n : U$e([...n, {
    type: "marker",
    markerId: t
  }]);
}

function lgo(e, t) {
  return U$e(e.filter(n => n.type !== "marker" || n.markerId !== t));
}

function cgo(e, t, n) {
  return e.map((a, i) => i === t && a.type === "text" ? {
    type: "text",
    text: n
  } : a);
}

function Ogn(e) {
  return e.some(t => t.type === "marker" || t.type === "text" && t.text.trim().length > 0);
}

function Tct(e, t) {
  const n = new Set(t.filter(a => a.type === "marker").map(a => a.id));
  let r = dgo(e, n);
  for (const a of t) a.type === "marker" && (r = sgo(r, a.id));
  return r;
}

function dgo(e, t) {
  return U$e(e.filter(n => n.type !== "marker" || t.has(n.markerId)));
}

function ugo({
  number: e,
  onRemove: t
}) {
  return on(), c.jsxs("button", {
    type: "button",
    className: "inline-flex h-4 shrink-0 items-center rounded-full pr-1.5 text-[11px] font-semibold text-white",
    style: {
      backgroundColor: Yce
    },
    title: x("悬停预览，点击移除"),
    onClick: t,
    children: [c.jsx("span", {
      className: "mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] leading-none text-[#009EFA]",
      children: e || "•"
    }), x("标记"), e || ""]
  });
}

function hgo(e) {
  on();
  const t = e.isDark !== !1,
    [n, r] = g.useState(null),
    [a, i] = g.useState(null),
    o = g.useMemo(() => rl(e.modelId), [e.modelId]),
    s = (Ogn(e.segments) || e.hasAnnotations) && !e.submitting,
    l = !Ogn(e.segments),
    d = (() => {
      var h;
      for (let p = e.segments.length - 1; p >= 0; p -= 1) if (((h = e.segments[p]) == null ? void 0 : h.type) === "text") return p;
      return 0;
    })(),
    u = g.useMemo(() => {
      const h = new Map();
      for (const p of e.markers) h.set(p.id, p);
      return h;
    }, [e.markers]);
  return c.jsxs("div", {
    "data-smart-edit-composer": !0,
    className: `flex flex-col items-stretch gap-1.5 ${e.embedded ? "w-full max-w-full" : "w-[min(760px,calc(100vw-48px))]"}`,
    children: [e.showMarkerHint ? c.jsx("p", {
      className: `px-3 ${e.embedded ? "text-left" : "text-right"} text-[11px] leading-snug ${t ? "text-white/45" : "text-zinc-400"}`,
      children: e.embedded ? x("标记定位适用于即梦模型") : x("只有即梦模型才认可这个逻辑坐标")
    }) : null, c.jsxs("div", {
      "data-smart-edit-composer-body": !0,
      className: `pointer-events-auto flex gap-2 ${e.embedded ? "flex-col items-stretch rounded-2xl border px-3 py-2" : "items-center rounded-full px-3 py-1.5"} ${t ? e.embedded ? "border-white/10 bg-[#222222]" : "bg-[rgba(34,34,34,.78)] backdrop-blur-xl" : "border border-black/10 bg-white"}`,
      children: [c.jsx("div", {
        "data-smart-edit-prompt": !0,
        className: `relative flex min-w-0 flex-1 items-center gap-1 overflow-x-auto ${e.embedded ? "min-h-[42px] px-0.5" : ""}`,
        children: e.segments.map((h, p) => {
          if (h.type === "marker") {
            const m = u.get(h.markerId);
            return m ? c.jsx(igo, {
              marker: m,
              imageUrl: e.imageUrl,
              sourceWidth: e.sourceWidth,
              sourceHeight: e.sourceHeight,
              forceOpen: e.previewMarkerId === m.id,
              onForceOpenConsumed: e.onPreviewConsumed,
              children: c.jsx(ugo, {
                number: m.markerIndex,
                onRemove: () => e.onRemoveMarker(m.id)
              })
            }, `${h.markerId}-${p}`) : null;
          }
          return c.jsx("input", {
            value: h.text,
            onChange: m => e.onSegmentsChange(cgo(e.segments, p, m.target.value)),
            onKeyDown: m => {
              m.key === "Enter" && !m.shiftKey && (m.preventDefault(), s && e.onSubmit());
            },
            placeholder: l && p === d ? x("描述你想改的内容，可用标记指出位置") : "",
            className: `${p === d ? "min-w-[120px] flex-1" : "w-[8px] min-w-[8px]"} bg-transparent ${e.embedded ? "text-[13px]" : "text-[14px]"} outline-none ${t ? "text-white placeholder:text-white/35" : "text-zinc-900 placeholder:text-zinc-400"}`,
            style: p !== d && h.text ? {
              width: `${Math.max(8, h.text.length * 14)}px`,
              minWidth: 8
            } : void 0
          }, `text-${p}`);
        })
      }), c.jsxs("div", {
        "data-smart-edit-parameters": !0,
        className: e.embedded ? "flex min-w-0 items-center gap-2" : "contents",
        children: [c.jsx("div", {
          className: "relative max-w-[168px] shrink-0",
          "data-model-select-area": !0,
          children: c.jsx(Th, {
            scopeId: "smart-edit-prompt",
            dropdownType: "smart-edit-image-model",
            value: e.modelId,
            models: e.models,
            isDark: t,
            logoKind: "image",
            activeDropdown: a,
            setActiveDropdown: i,
            onSelect: e.onModelChange,
            menuPlacement: "above",
            menuAlign: "end",
            showChannelBar: !0,
            channelKind: "gen",
            menuMaxHeight: 360,
            buttonVariant: "bare",
            className: "!flex-none !overflow-visible w-auto max-w-[168px]",
            menuZIndex: 10120
          })
        }), o.length > 0 ? c.jsxs("div", {
          className: "relative",
          children: [c.jsx("button", {
            type: "button",
            className: `h-8 rounded-full px-2.5 text-[12px] ${t ? "text-white/80 hover:bg-white/8" : "text-zinc-600 hover:bg-zinc-100"}`,
            onClick: () => r(h => h === "resolution" ? null : "resolution"),
            children: e.resolution || o[0]
          }), n === "resolution" ? c.jsx("div", {
            className: `absolute bottom-full right-0 mb-2 min-w-[72px] overflow-hidden rounded-xl py-1 ${t ? "bg-[#202022]" : "border border-black/10 bg-white"}`,
            children: o.map(h => c.jsx("button", {
              type: "button",
              className: `block w-full px-3 py-1.5 text-left text-[12px] ${h === e.resolution ? t ? "bg-white/12 text-white" : "bg-[#18181b] text-white" : t ? "text-white/75 hover:bg-white/8" : "text-zinc-600 hover:bg-zinc-100"}`,
              onClick: () => {
                e.onResolutionChange(h), r(null);
              },
              children: h
            }, h))
          }) : null]
        }) : null, c.jsx("button", {
          type: "button",
          className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-opacity disabled:opacity-35 ${e.embedded ? "ml-auto" : ""} ${t ? "bg-white text-zinc-900" : "bg-[#18181b] text-white"}`,
          "aria-label": e.submitLabel || x("创建下游绘画节点"),
          disabled: !s,
          onClick: e.onSubmit,
          children: c.jsx(Gc, {
            size: 16,
            strokeWidth: 2.2
          })
        })]
      })]
    })]
  });
}

function pgo(e, t, n) {
  for (const r of t) {
    if (r.type !== "marker") continue;
    e.save(), e.strokeStyle = Yce, e.fillStyle = Yce, r.mode === "bbox" && r.width > 0 && r.height > 0 && (e.setLineDash([6 * n, 6 * n]), e.lineWidth = 1.25 * n, e.strokeRect(r.x, r.y, r.width, r.height));
    const a = r.mode === "bbox" && r.width > 0 && r.height > 0 ? r.x + r.width : r.x,
      i = r.mode === "bbox" && r.width > 0 && r.height > 0 ? r.y + r.height : r.y,
      o = 9 * n;
    e.setLineDash([]), e.beginPath(), e.arc(a, i - o * 1.15, o, Math.PI * .15, Math.PI * .85, !0), e.lineTo(a, i + o * .35), e.closePath(), e.fill(), e.strokeStyle = "#fff", e.lineWidth = 1.5 * n, e.stroke(), e.fillStyle = "#fff", e.font = `600 ${10 * n}px Inter, "PingFang SC", sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(String(r.markerIndex), a, i - o * 1.2), e.restore();
  }
}

function Bgn(e, t) {
  const n = e.currentTarget.getBoundingClientRect();
  return n.width <= 0 || n.height <= 0 ? null : {
    x: (e.clientX - n.left) / n.width * t.width,
    y: (e.clientY - n.top) / n.height * t.height
  };
}

function mgo(e) {
  on();
  const t = g.useRef(null),
    n = g.useMemo(() => {
      const r = e.draft;
      return r && e.elements.some(a => a.id === r.id) ? e.elements.map(a => a.id === r.id ? r : a) : [...e.elements, ...(r ? [r] : [])];
    }, [e.draft, e.elements]);
  return g.useLayoutEffect(() => {
    const r = t.current;
    if (!r) return;
    const a = r.getBoundingClientRect(),
      i = Math.max(1, Math.round(a.width * window.devicePixelRatio)),
      o = Math.max(1, Math.round(a.height * window.devicePixelRatio));
    r.width !== i && (r.width = i), r.height !== o && (r.height = o);
    const s = r.getContext("2d");
    if (!s) return;
    s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, r.width, r.height);
    const l = r.width / Math.max(1, e.sourceSize.width),
      d = r.height / Math.max(1, e.sourceSize.height);
    s.save(), s.scale(l, d), Hbr(s, n), pgo(s, n, 1 / Math.max(l, .001)), s.restore();
  }, [n, e.sourceSize.height, e.sourceSize.width]), c.jsxs("div", {
    "data-smart-edit-stage": !0,
    className: `relative max-h-[72vh] max-w-[min(86vw,920px)] overflow-hidden rounded-[28px] ${e.isDark === !1 ? "bg-white" : "bg-zinc-900"}`,
    style: e.embedded ? {
      maxWidth: "100%",
      maxHeight: "var(--sg-tool-preview-height, min(340px, 46dvh))",
      borderRadius: 12
    } : void 0,
    children: [c.jsx("img", {
      src: e.imageUrl,
      alt: e.imageName,
      draggable: !1,
      crossOrigin: e.imageUrl.startsWith("http") ? "anonymous" : void 0,
      className: "block max-h-[72vh] max-w-[min(86vw,920px)] select-none object-contain",
      style: e.embedded ? {
        maxWidth: "100%",
        maxHeight: "var(--sg-tool-preview-height, min(340px, 46dvh))",
        width: "auto",
        height: "auto"
      } : void 0,
      onLoad: r => {
        const a = r.currentTarget;
        e.onSourceSize({
          width: Math.max(1, a.naturalWidth),
          height: Math.max(1, a.naturalHeight)
        });
      }
    }), c.jsx("canvas", {
      ref: t,
      className: "absolute inset-0 h-full w-full touch-none select-none",
      style: {
        cursor: e.tool === "text" ? "text" : "crosshair"
      },
      "aria-label": x("智能改图画布"),
      onPointerDown: e.onPointerDown,
      onPointerMove: e.onPointerMove,
      onPointerUp: e.onPointerUp,
      onPointerCancel: e.onPointerCancel
    })]
  });
}

function fgo(e) {
  const t = e.settings || {},
    n = typeof t.ratio == "string" ? t.ratio.trim() : "";
  return n && n.toLowerCase() !== "auto" && n !== "自适应" && yM(n) ? n : null;
}

async function ggo(e) {
  var d;
  const t = e.documentLease || WFt();
  if (!t) throw new Error("画布尚未就绪，请稍后再试");
  const n = t.getNodes(),
    r = n.find(u => u.id === e.source.nodeId);
  if (!r) throw new Error("原图节点已不存在");
  const a = hma({
    segments: e.segments,
    elements: e.elements,
    sourceWidth: e.sourceWidth,
    sourceHeight: e.sourceHeight
  }).trim();
  if (!a) throw new Error("请先填写改图说明或添加标记");
  if (e.elements.some(u => u.type !== "marker")) {
    const u = await Wfo({
        imageUrl: e.source.imageUrl,
        elements: e.elements,
        sourceWidth: e.sourceWidth,
        sourceHeight: e.sourceHeight
      }),
      {
        genNode: h
      } = await jUt({
        blob: u,
        annotationDocument: {
          version: 1,
          sourceWidth: e.sourceWidth,
          sourceHeight: e.sourceHeight,
          elements: []
        },
        sourceNode: r,
        nodes: n,
        connections: t.getConnections(),
        generateId: t.generateId,
        setNodes: t.setNodes,
        setConnections: t.setConnections,
        setSelectedNodeId: t.setSelectedNodeId,
        prompt: a,
        modelId: e.modelId,
        resolution: e.resolution,
        annotatedNodeName: "智能改图标注",
        isolatedSettings: {
          smartEditMode: !0
        },
        openPrompt: !e.documentLease
      });
    return h;
  }
  const i = t.generateId(),
    o = t.getConnections().filter(u => u.from === r.id).length,
    s = Ki(i, "gen-image", r.x + r.width + 80, r.y + o * 48, void 0, e.modelId ? {
      model: e.modelId
    } : void 0, n);
  s.prompt = a, s.settings = {
    ...(s.settings || {}),
    ...(e.modelId ? {
      model: e.modelId
    } : {}),
    ...(e.resolution ? {
      resolution: e.resolution
    } : {}),
    smartEditMode: !0
  };
  const l = fgo(r);
  if (l) {
    s.settings = {
      ...(s.settings || {}),
      ratio: l
    };
    const u = TKe(s, l);
    u && (s.x = u.x, s.y = u.y, s.width = u.width, s.height = u.height);
  }
  return t.setNodes(u => [...u, s]), t.setConnections(u => [...u, {
    id: t.generateId(),
    from: r.id,
    to: i
  }]), e.documentLease || v5(i), (d = t.setSelectedNodeId) == null || d.call(t, i), s;
}

const zte = () => `smart-edit-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

function Fgn(e) {
  const t = new Set(e.filter(n => n.type === "marker").map(n => n.markerIndex));
  for (let n = 1; n <= RVn; n += 1) if (!t.has(n)) return n;
  return 0;
}

function zgn(e, t) {
  const n = Math.min(e.x, t.x),
    r = Math.min(e.y, t.y);
  return {
    x: n,
    y: r,
    width: Math.abs(t.x - e.x),
    height: Math.abs(t.y - e.y)
  };
}

function ygo() {
  const [e, t] = g.useState(() => !document.documentElement.classList.contains("theme-light"));
  return g.useEffect(() => {
    const n = document.documentElement,
      r = () => t(!n.classList.contains("theme-light")),
      a = new MutationObserver(r);
    return a.observe(n, {
      attributes: !0,
      attributeFilter: ["class"]
    }), () => a.disconnect();
  }, []), e;
}

function qbr({
  session: e,
  documentLease: t,
  embedded: n = !1,
  onClose: r = fPi,
  onSubmitted: a
}) {
  on();
  const i = ygo(),
    [o, s] = g.useState("mark"),
    [l, d] = g.useState(pma),
    [u, h] = g.useState([]),
    [p, m] = g.useState(null),
    [f, y] = g.useState([]),
    [b, v] = g.useState([]),
    [_, w] = g.useState(() => ogo()),
    [k, A] = g.useState(!1),
    [S, C] = g.useState({
      width: e.source.width,
      height: e.source.height
    }),
    I = t || WFt(),
    E = g.useMemo(() => ((I == null ? void 0 : I.apiConfigs) || []).filter(q => q.type === "Image" && q.enabled !== !1), [I == null ? void 0 : I.apiConfigs]),
    [M, T] = g.useState(() => {
      var ne;
      const q = fS("gen-image");
      return q && E.some(de => de.id === q) ? q : ((ne = E[0]) == null ? void 0 : ne.id) || "";
    }),
    P = g.useMemo(() => rl(M), [M]),
    [R, j] = g.useState(() => P[0] || "1K"),
    [B, F] = g.useState(null),
    [N, G] = g.useState(null),
    z = g.useRef(null);
  g.useEffect(() => {
    var q;
    !M && ((q = E[0]) != null && q.id) && T(E[0].id);
  }, [M, E]), g.useEffect(() => {
    P.length && !P.includes(R) && j(P[0]);
  }, [R, P]);
  const V = g.useCallback(q => {
      y(de => [...de, u]), v([]), h(q), w(de => Tct(de, q));
      const ne = q.find(de => de.type === "marker" && !u.some(le => le.id === de.id));
      G(ne && ne.type === "marker" ? ne.id : null), m(null);
    }, [u]),
    O = g.useCallback(q => {
      const ne = u.filter(de => de.id !== q);
      if (ne.length === u.length) {
        w(de => lgo(de, q));
        return;
      }
      V(ne);
    }, [V, u]),
    L = g.useCallback(() => {
      y(q => {
        const ne = q[q.length - 1];
        return ne ? (v(de => [...de, u]), h(ne), w(de => Tct(de, ne)), q.slice(0, -1)) : q;
      });
    }, [u]),
    D = g.useCallback(() => {
      v(q => {
        const ne = q[q.length - 1];
        return ne ? (y(de => [...de, u]), h(ne), w(de => Tct(de, ne)), q.slice(0, -1)) : q;
      });
    }, [u]),
    U = q => {
      if (k || q.button !== 0) return;
      if (B) {
        H(B.text);
        return;
      }
      const ne = Bgn(q, S);
      if (ne) {
        if (q.currentTarget.setPointerCapture(q.pointerId), o === "text") {
          const de = q.currentTarget.getContext("2d"),
            le = de && jgn(de, u, ne);
          if (le && de) {
            z.current = {
              type: "move-text",
              start: ne,
              element: le,
              ...Vbr(de, le)
            }, m(le), q.currentTarget.style.cursor = "move";
            return;
          }
          z.current = {
            type: "text",
            start: ne
          };
          return;
        }
        if (o === "mark") {
          z.current = {
            type: "mark",
            start: ne
          }, m({
            id: zte(),
            type: "marker",
            mode: "point",
            markerIndex: Fgn(u),
            x: ne.x,
            y: ne.y,
            width: 0,
            height: 0
          });
          return;
        }
        if (o === "brush") {
          const de = zte();
          z.current = {
            type: "brush",
            id: de
          }, m({
            id: de,
            type: "brush",
            color: l,
            width: Math.max(3, S.width * .008),
            points: [ne]
          });
          return;
        }
        if (o === "arrow") {
          const de = zte();
          z.current = {
            type: "arrow",
            id: de,
            start: ne
          }, m({
            id: de,
            type: "arrow",
            color: l,
            width: Math.max(3, S.width * .006),
            start: ne,
            end: ne
          });
          return;
        }
        if (o === "circle") {
          const de = zte();
          z.current = {
            type: "circle",
            id: de,
            start: ne
          }, m({
            id: de,
            type: "circle",
            color: l,
            width: Math.max(3, S.width * .006),
            x: ne.x,
            y: ne.y,
            w: 0,
            h: 0
          });
          return;
        }
      }
    },
    H = q => {
      const ne = B;
      if (F(null), !ne || !q.trim()) return u;
      const de = [...u, {
        id: zte(),
        type: "text",
        color: l,
        x: ne.x,
        y: ne.y,
        text: q.trim().slice(0, 100),
        fontSize: Math.max(18, S.width * .035)
      }];
      return V(de), de;
    },
    Y = q => {
      const ne = z.current,
        de = Bgn(q, S);
      if (!de) return;
      if (!ne) {
        if (o === "text") {
          const J = q.currentTarget.getContext("2d");
          q.currentTarget.style.cursor = J && jgn(J, u, de) ? "move" : "text";
        }
        return;
      }
      if (ne.type === "text") return;
      if (ne.type === "move-text") {
        m({
          ...ne.element,
          x: Math.max(0, Math.min(Math.max(0, S.width - ne.width), ne.element.x + de.x - ne.start.x)),
          y: Math.max(0, Math.min(Math.max(0, S.height - ne.height), ne.element.y + de.y - ne.start.y))
        });
        return;
      }
      if (ne.type === "mark") {
        const J = zgn(ne.start, de),
          pe = J.width > 8 || J.height > 8;
        m({
          id: "draft-mark",
          type: "marker",
          mode: pe ? "bbox" : "point",
          markerIndex: Fgn(u),
          x: pe ? J.x : ne.start.x,
          y: pe ? J.y : ne.start.y,
          width: pe ? J.width : 0,
          height: pe ? J.height : 0
        });
        return;
      }
      if (ne.type === "brush") {
        m(J => J && J.type === "brush" ? {
          ...J,
          points: [...J.points, de]
        } : J);
        return;
      }
      if (ne.type === "arrow") {
        m(J => J && J.type === "arrow" ? {
          ...J,
          end: de
        } : J);
        return;
      }
      const le = zgn(ne.start, de);
      m(J => J && J.type === "circle" ? {
        ...J,
        x: le.x,
        y: le.y,
        w: le.width,
        h: le.height
      } : J);
    },
    K = () => {
      const q = z.current;
      if (z.current = null, (q == null ? void 0 : q.type) === "text") {
        F({
          x: q.start.x,
          y: q.start.y,
          text: ""
        });
        return;
      }
      if (!q || !p) {
        m(null);
        return;
      }
      if (q.type === "move-text") {
        p.type === "text" && (p.x !== q.element.x || p.y !== q.element.y) ? V(u.map(ne => ne.id === p.id ? p : ne)) : m(null);
        return;
      }
      if (p.type === "marker") {
        if (p.markerIndex < 1) {
          Ai("error", `最多添加 ${RVn} 个标记`), m(null);
          return;
        }
        V([...u, {
          ...p,
          id: zte()
        }]);
        return;
      }
      if (p.type === "arrow" && Math.hypot(p.end.x - p.start.x, p.end.y - p.start.y) < 4) {
        m(null);
        return;
      }
      V([...u, p]);
    },
    W = async () => {
      if (!k) {
        A(!0);
        try {
          await ggo({
            source: e.source,
            elements: H((B == null ? void 0 : B.text) || ""),
            segments: _,
            modelId: M || void 0,
            resolution: R || void 0,
            sourceWidth: S.width,
            sourceHeight: S.height,
            documentLease: t
          }), a ? a() : Ai("success", "已连接下游绘画节点，可确认后发送"), r();
        } catch (q) {
          Ai("error", q instanceof Error ? q.message : "智能改图发送失败");
        } finally {
          A(!1);
        }
      }
    };
  g.useEffect(() => {
    const q = ne => {
      if (ne.key === "Escape") {
        if (ne.preventDefault(), z.current) {
          z.current = null, m(null);
          return;
        }
        if (B) {
          F(null);
          return;
        }
        r();
        return;
      }
      !(ne.ctrlKey || ne.metaKey) || ne.key.toLowerCase() !== "z" || (ne.preventDefault(), ne.shiftKey ? D() : L());
    };
    return window.addEventListener("keydown", q, !0), () => window.removeEventListener("keydown", q, !0);
  }, [r, D, B, L]);
  const Q = c.jsxs("div", {
    className: `${n ? "relative mx-auto flex w-full max-w-[720px] flex-col gap-3" : "fixed inset-0 z-[10060]"} ${n ? "" : i ? "bg-black" : "bg-[#f4f4f5]"}`,
    "data-smart-edit-editor": !0,
    "data-embedded": n || void 0,
    children: [c.jsx("button", {
      type: "button",
      className: `absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full ${i ? "bg-white/8 text-white/80 hover:bg-white/14" : "bg-black/5 text-zinc-700 hover:bg-black/10"}`,
      "aria-label": x("关闭智能改图"),
      onClick: r,
      style: n ? {
        display: "none"
      } : void 0,
      children: c.jsx(Na, {
        size: 18
      })
    }), c.jsxs("div", {
      "data-smart-edit-body": !0,
      className: n ? "flex min-w-0 flex-col items-center gap-3" : "flex h-full flex-col items-center justify-center gap-3 px-6 pb-24 pt-10",
      children: [c.jsxs("div", {
        className: n ? "relative max-w-full" : "relative",
        "data-smart-edit-preview": !0,
        children: [c.jsx(mgo, {
          embedded: n,
          imageUrl: e.source.imageUrl,
          imageName: e.source.title,
          elements: u,
          draft: p,
          tool: o,
          sourceSize: S,
          isDark: i,
          onSourceSize: C,
          onPointerDown: U,
          onPointerMove: Y,
          onPointerUp: K,
          onPointerCancel: () => {
            z.current = null, m(null);
          }
        }), B ? c.jsx("input", {
          autoFocus: !0,
          value: B.text,
          maxLength: 100,
          placeholder: x("输入文字"),
          className: `absolute z-20 min-w-[140px] rounded px-2 py-1 text-sm outline-none ring-1 ${i ? "bg-black/55 text-white ring-white/30" : "bg-white text-zinc-900 ring-black/15"}`,
          style: {
            left: `${B.x / Math.max(1, S.width) * 100}%`,
            top: `${B.y / Math.max(1, S.height) * 100}%`
          },
          onPointerDown: q => q.stopPropagation(),
          onChange: q => F({
            ...B,
            text: q.target.value
          }),
          onBlur: q => {
            H(q.currentTarget.value);
          },
          onKeyDown: q => {
            q.stopPropagation(), q.key === "Enter" && !q.nativeEvent.isComposing && (q.preventDefault(), H(q.currentTarget.value)), q.key === "Escape" && (q.preventDefault(), F(null));
          }
        }) : null]
      }), c.jsx(Kfo, {
        embedded: n,
        tool: o,
        color: l,
        canUndo: f.length > 0,
        canRedo: b.length > 0,
        isDark: i,
        onToolChange: s,
        onColorChange: d,
        onUndo: L,
        onRedo: D
      })]
    }), c.jsx("div", {
      "data-smart-edit-composer-host": !0,
      className: n ? "relative w-full" : "pointer-events-none absolute inset-x-0 bottom-6 flex justify-center",
      children: c.jsx(hgo, {
        embedded: n,
        segments: _,
        markers: u.filter(q => q.type === "marker"),
        imageUrl: e.source.imageUrl,
        sourceWidth: S.width,
        sourceHeight: S.height,
        previewMarkerId: N,
        modelId: M,
        resolution: R,
        models: E,
        submitting: k,
        hasAnnotations: u.length > 0 || !!(B != null && B.text.trim()),
        showMarkerHint: !n && o === "mark",
        isDark: i,
        onSegmentsChange: w,
        onRemoveMarker: O,
        onPreviewConsumed: () => G(null),
        onModelChange: T,
        onResolutionChange: j,
        onSubmit: () => void W(),
        submitLabel: n ? "开始生成" : void 0
      })
    })]
  });
  return n ? Q : Da.createPortal(Q, document.body);
}

function bgo() {
  const e = gPi();
  return e ? c.jsx(qbr, {
    session: e
  }) : null;
}

const vgo = Object.freeze(Object.defineProperty({
  __proto__: null,
  SmartEditHost: bgo
}, Symbol.toStringTag, {
  value: "Module"
}));

function gEe(e) {
  return {
    presentation: e.presentation,
    interaction: e.interaction
  };
}

const Kbr = () => Ie(() => Promise.resolve().then(() => t8o), void 0, import.meta.url).then(e => ({
    default: e.InputImageNodeFullEntry
  })),
  wgo = g.lazy(Kbr);

function Mct() {
  Kbr();
}

function xgo({
  renderQuality: e = "high",
  selectedNodeId: t = null,
  boxSelectLightShell: n = !1,
  focusEditActiveSourceNodeId: r = null,
  hasOpenGenPromptPanel: a = !1,
  selectedNodeIds: i,
  node: o,
  ...s
}) {
  const l = TM(e, o, t, n, r, {
      genPromptPanelOpen: N7(o.id),
      selectedNodeIds: i
    }),
    d = t === o.id,
    u = XCe(d && !l),
    h = !l || u;
  return g.useEffect(() => {
    (d || !l) && Mct();
  }, [d, l]), c.jsxs("div", {
    className: "relative h-full w-full",
    onPointerEnter: Mct,
    onPointerDown: Mct,
    children: [c.jsx("div", {
      className: l ? "h-full w-full" : "pointer-events-none absolute inset-0 z-0",
      children: c.jsx(Lur, {
        enableHoverPlayback: l && !h,
        node: o,
        isDark: s.isDark,
        setNodes: s.setNodes,
        boxSelectLightShell: n
      })
    }), h ? c.jsx("div", {
      className: `${l ? "absolute inset-0" : "relative"} z-[1] h-full w-full`,
      "data-input-full-exiting": l ? "" : void 0,
      children: c.jsx(g.Suspense, {
        fallback: null,
        children: c.jsx(wgo, {
          node: o,
          selectedNodeId: t,
          focusEditActiveSourceNodeId: r,
          ...s
        })
      })
    }) : null]
  });
}

function _go(e, t, n) {
  const r = g.useMemo(() => sIn(e, t, n), [e, t, n]);
  return KCe(r);
}

function kgo({
  node: e,
  isDark: t,
  nodes: n,
  connections: r
}) {
  const {
      src: a,
      onMediaError: i
    } = _go(e, n, r),
    o = g.useRef("");
  a.trim() && (o.current = a);
  const s = a.trim() || o.current;
  return c.jsx(Tpe, {
    src: s,
    isDark: t,
    nodeType: "preview",
    nodeId: e.id,
    worldWidth: e.width,
    worldHeight: e.height,
    onMediaError: i
  });
}

var VL = {},
  hV = {};

/**
 * @license React
 * react-dom-server-legacy.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ugn;

function Ago() {
  if (Ugn) return hV;
  Ugn = 1;
  var e = D4e();
  function t(Ue) {
    for (var et = "https://reactjs.org/docs/error-decoder.html?invariant=" + Ue, ft = 1; ft < arguments.length; ft++) et += "&args[]=" + encodeURIComponent(arguments[ft]);
    return "Minified React error #" + Ue + "; visit " + et + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var n = Object.prototype.hasOwnProperty,
    r = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    a = {},
    i = {};
  function o(Ue) {
    return n.call(i, Ue) ? !0 : n.call(a, Ue) ? !1 : r.test(Ue) ? i[Ue] = !0 : (a[Ue] = !0, !1);
  }
  function s(Ue, et, ft, ht, wt, jt, bt) {
    this.acceptsBooleans = et === 2 || et === 3 || et === 4, this.attributeName = ht, this.attributeNamespace = wt, this.mustUseProperty = ft, this.propertyName = Ue, this.type = et, this.sanitizeURL = jt, this.removeEmptyString = bt;
  }
  var l = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (Ue) {
    l[Ue] = new s(Ue, 0, !1, Ue, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (Ue) {
    var et = Ue[0];
    l[et] = new s(et, 1, !1, Ue[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (Ue) {
    l[Ue] = new s(Ue, 2, !1, Ue.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (Ue) {
    l[Ue] = new s(Ue, 2, !1, Ue, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (Ue) {
    l[Ue] = new s(Ue, 3, !1, Ue.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function (Ue) {
    l[Ue] = new s(Ue, 3, !0, Ue, null, !1, !1);
  }), ["capture", "download"].forEach(function (Ue) {
    l[Ue] = new s(Ue, 4, !1, Ue, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function (Ue) {
    l[Ue] = new s(Ue, 6, !1, Ue, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function (Ue) {
    l[Ue] = new s(Ue, 5, !1, Ue.toLowerCase(), null, !1, !1);
  });
  var d = /[\-:]([a-z])/g;
  function u(Ue) {
    return Ue[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (Ue) {
    var et = Ue.replace(d, u);
    l[et] = new s(et, 1, !1, Ue, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (Ue) {
    var et = Ue.replace(d, u);
    l[et] = new s(et, 1, !1, Ue, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function (Ue) {
    var et = Ue.replace(d, u);
    l[et] = new s(et, 1, !1, Ue, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function (Ue) {
    l[Ue] = new s(Ue, 1, !1, Ue.toLowerCase(), null, !1, !1);
  }), l.xlinkHref = new s("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function (Ue) {
    l[Ue] = new s(Ue, 1, !1, Ue.toLowerCase(), null, !0, !0);
  });
  var h = {
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
    p = ["Webkit", "ms", "Moz", "O"];
  Object.keys(h).forEach(function (Ue) {
    p.forEach(function (et) {
      et = et + Ue.charAt(0).toUpperCase() + Ue.substring(1), h[et] = h[Ue];
    });
  });
  var m = /["'&<>]/;
  function f(Ue) {
    if (typeof Ue == "boolean" || typeof Ue == "number") return "" + Ue;
    Ue = "" + Ue;
    var et = m.exec(Ue);
    if (et) {
      var ft = "",
        ht,
        wt = 0;
      for (ht = et.index; ht < Ue.length; ht++) {
        switch (Ue.charCodeAt(ht)) {
          case 34:
            et = "&quot;";
            break;
          case 38:
            et = "&amp;";
            break;
          case 39:
            et = "&#x27;";
            break;
          case 60:
            et = "&lt;";
            break;
          case 62:
            et = "&gt;";
            break;
          default:
            continue;
        }
        wt !== ht && (ft += Ue.substring(wt, ht)), wt = ht + 1, ft += et;
      }
      Ue = wt !== ht ? ft + Ue.substring(wt, ht) : ft;
    }
    return Ue;
  }
  var y = /([A-Z])/g,
    b = /^ms-/,
    v = Array.isArray;
  function _(Ue, et) {
    return {
      insertionMode: Ue,
      selectedValue: et
    };
  }
  function w(Ue, et, ft) {
    switch (et) {
      case "select":
        return _(1, ft.value != null ? ft.value : ft.defaultValue);
      case "svg":
        return _(2, null);
      case "math":
        return _(3, null);
      case "foreignObject":
        return _(1, null);
      case "table":
        return _(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return _(5, null);
      case "colgroup":
        return _(7, null);
      case "tr":
        return _(6, null);
    }
    return 4 <= Ue.insertionMode || Ue.insertionMode === 0 ? _(1, null) : Ue;
  }
  var k = new Map();
  function A(Ue, et, ft) {
    if (typeof ft != "object") throw Error(t(62));
    et = !0;
    for (var ht in ft) if (n.call(ft, ht)) {
      var wt = ft[ht];
      if (wt != null && typeof wt != "boolean" && wt !== "") {
        if (ht.indexOf("--") === 0) {
          var jt = f(ht);
          wt = f(("" + wt).trim());
        } else {
          jt = ht;
          var bt = k.get(jt);
          bt !== void 0 || (bt = f(jt.replace(y, "-$1").toLowerCase().replace(b, "-ms-")), k.set(jt, bt)), jt = bt, wt = typeof wt == "number" ? wt === 0 || n.call(h, ht) ? "" + wt : wt + "px" : f(("" + wt).trim());
        }
        et ? (et = !1, Ue.push(' style="', jt, ":", wt)) : Ue.push(";", jt, ":", wt);
      }
    }
    et || Ue.push('"');
  }
  function S(Ue, et, ft, ht) {
    switch (ft) {
      case "style":
        A(Ue, et, ht);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < ft.length) || ft[0] !== "o" && ft[0] !== "O" || ft[1] !== "n" && ft[1] !== "N") {
      if (et = l.hasOwnProperty(ft) ? l[ft] : null, et !== null) {
        switch (typeof ht) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!et.acceptsBooleans) return;
        }
        switch (ft = et.attributeName, et.type) {
          case 3:
            ht && Ue.push(" ", ft, '=""');
            break;
          case 4:
            ht === !0 ? Ue.push(" ", ft, '=""') : ht !== !1 && Ue.push(" ", ft, '="', f(ht), '"');
            break;
          case 5:
            isNaN(ht) || Ue.push(" ", ft, '="', f(ht), '"');
            break;
          case 6:
            !isNaN(ht) && 1 <= ht && Ue.push(" ", ft, '="', f(ht), '"');
            break;
          default:
            et.sanitizeURL && (ht = "" + ht), Ue.push(" ", ft, '="', f(ht), '"');
        }
      } else if (o(ft)) {
        switch (typeof ht) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (et = ft.toLowerCase().slice(0, 5), et !== "data-" && et !== "aria-") return;
        }
        Ue.push(" ", ft, '="', f(ht), '"');
      }
    }
  }
  function C(Ue, et, ft) {
    if (et != null) {
      if (ft != null) throw Error(t(60));
      if (typeof et != "object" || !("__html" in et)) throw Error(t(61));
      et = et.__html, et != null && Ue.push("" + et);
    }
  }
  function I(Ue) {
    var et = "";
    return e.Children.forEach(Ue, function (ft) {
      ft != null && (et += ft);
    }), et;
  }
  function E(Ue, et, ft, ht) {
    Ue.push(P(ft));
    var wt = ft = null,
      jt;
    for (jt in et) if (n.call(et, jt)) {
      var bt = et[jt];
      if (bt != null) switch (jt) {
        case "children":
          ft = bt;
          break;
        case "dangerouslySetInnerHTML":
          wt = bt;
          break;
        default:
          S(Ue, ht, jt, bt);
      }
    }
    return Ue.push(">"), C(Ue, wt, ft), typeof ft == "string" ? (Ue.push(f(ft)), null) : ft;
  }
  var M = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    T = new Map();
  function P(Ue) {
    var et = T.get(Ue);
    if (et === void 0) {
      if (!M.test(Ue)) throw Error(t(65, Ue));
      et = "<" + Ue, T.set(Ue, et);
    }
    return et;
  }
  function R(Ue, et, ft, ht, wt) {
    switch (et) {
      case "select":
        Ue.push(P("select"));
        var jt = null,
          bt = null;
        for (Pt in ft) if (n.call(ft, Pt)) {
          var Bt = ft[Pt];
          if (Bt != null) switch (Pt) {
            case "children":
              jt = Bt;
              break;
            case "dangerouslySetInnerHTML":
              bt = Bt;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              S(Ue, ht, Pt, Bt);
          }
        }
        return Ue.push(">"), C(Ue, bt, jt), jt;
      case "option":
        bt = wt.selectedValue, Ue.push(P("option"));
        var wn = Bt = null,
          at = null,
          Pt = null;
        for (jt in ft) if (n.call(ft, jt)) {
          var dt = ft[jt];
          if (dt != null) switch (jt) {
            case "children":
              Bt = dt;
              break;
            case "selected":
              at = dt;
              break;
            case "dangerouslySetInnerHTML":
              Pt = dt;
              break;
            case "value":
              wn = dt;
            default:
              S(Ue, ht, jt, dt);
          }
        }
        if (bt != null) {
          if (ft = wn !== null ? "" + wn : I(Bt), v(bt)) {
            for (ht = 0; ht < bt.length; ht++) if ("" + bt[ht] === ft) {
              Ue.push(' selected=""');
              break;
            }
          } else "" + bt === ft && Ue.push(' selected=""');
        } else at && Ue.push(' selected=""');
        return Ue.push(">"), C(Ue, Pt, Bt), Bt;
      case "textarea":
        Ue.push(P("textarea")), Pt = bt = jt = null;
        for (Bt in ft) if (n.call(ft, Bt) && (wn = ft[Bt], wn != null)) switch (Bt) {
          case "children":
            Pt = wn;
            break;
          case "value":
            jt = wn;
            break;
          case "defaultValue":
            bt = wn;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(t(91));
          default:
            S(Ue, ht, Bt, wn);
        }
        if (jt === null && bt !== null && (jt = bt), Ue.push(">"), Pt != null) {
          if (jt != null) throw Error(t(92));
          if (v(Pt) && 1 < Pt.length) throw Error(t(93));
          jt = "" + Pt;
        }
        return typeof jt == "string" && jt[0] === `
` && Ue.push(`
`), jt !== null && Ue.push(f("" + jt)), null;
      case "input":
        Ue.push(P("input")), wn = Pt = Bt = jt = null;
        for (bt in ft) if (n.call(ft, bt) && (at = ft[bt], at != null)) switch (bt) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(t(399, "input"));
          case "defaultChecked":
            wn = at;
            break;
          case "defaultValue":
            Bt = at;
            break;
          case "checked":
            Pt = at;
            break;
          case "value":
            jt = at;
            break;
          default:
            S(Ue, ht, bt, at);
        }
        return Pt !== null ? S(Ue, ht, "checked", Pt) : wn !== null && S(Ue, ht, "checked", wn), jt !== null ? S(Ue, ht, "value", jt) : Bt !== null && S(Ue, ht, "value", Bt), Ue.push("/>"), null;
      case "menuitem":
        Ue.push(P("menuitem"));
        for (var xt in ft) if (n.call(ft, xt) && (jt = ft[xt], jt != null)) switch (xt) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(t(400));
          default:
            S(Ue, ht, xt, jt);
        }
        return Ue.push(">"), null;
      case "title":
        Ue.push(P("title")), jt = null;
        for (dt in ft) if (n.call(ft, dt) && (bt = ft[dt], bt != null)) switch (dt) {
          case "children":
            jt = bt;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(t(434));
          default:
            S(Ue, ht, dt, bt);
        }
        return Ue.push(">"), jt;
      case "listing":
      case "pre":
        Ue.push(P(et)), bt = jt = null;
        for (wn in ft) if (n.call(ft, wn) && (Bt = ft[wn], Bt != null)) switch (wn) {
          case "children":
            jt = Bt;
            break;
          case "dangerouslySetInnerHTML":
            bt = Bt;
            break;
          default:
            S(Ue, ht, wn, Bt);
        }
        if (Ue.push(">"), bt != null) {
          if (jt != null) throw Error(t(60));
          if (typeof bt != "object" || !("__html" in bt)) throw Error(t(61));
          ft = bt.__html, ft != null && (typeof ft == "string" && 0 < ft.length && ft[0] === `
` ? Ue.push(`
`, ft) : Ue.push("" + ft));
        }
        return typeof jt == "string" && jt[0] === `
` && Ue.push(`
`), jt;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        Ue.push(P(et));
        for (var yn in ft) if (n.call(ft, yn) && (jt = ft[yn], jt != null)) switch (yn) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(t(399, et));
          default:
            S(Ue, ht, yn, jt);
        }
        return Ue.push("/>"), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return E(Ue, ft, et, ht);
      case "html":
        return wt.insertionMode === 0 && Ue.push("<!DOCTYPE html>"), E(Ue, ft, et, ht);
      default:
        if (et.indexOf("-") === -1 && typeof ft.is != "string") return E(Ue, ft, et, ht);
        Ue.push(P(et)), bt = jt = null;
        for (at in ft) if (n.call(ft, at) && (Bt = ft[at], Bt != null)) switch (at) {
          case "children":
            jt = Bt;
            break;
          case "dangerouslySetInnerHTML":
            bt = Bt;
            break;
          case "style":
            A(Ue, ht, Bt);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            break;
          default:
            o(at) && typeof Bt != "function" && typeof Bt != "symbol" && Ue.push(" ", at, '="', f(Bt), '"');
        }
        return Ue.push(">"), C(Ue, bt, jt), jt;
    }
  }
  function j(Ue, et, ft) {
    if (Ue.push('<!--$?--><template id="'), ft === null) throw Error(t(395));
    return Ue.push(ft), Ue.push('"></template>');
  }
  function B(Ue, et, ft, ht) {
    switch (ft.insertionMode) {
      case 0:
      case 1:
        return Ue.push('<div hidden id="'), Ue.push(et.segmentPrefix), et = ht.toString(16), Ue.push(et), Ue.push('">');
      case 2:
        return Ue.push('<svg aria-hidden="true" style="display:none" id="'), Ue.push(et.segmentPrefix), et = ht.toString(16), Ue.push(et), Ue.push('">');
      case 3:
        return Ue.push('<math aria-hidden="true" style="display:none" id="'), Ue.push(et.segmentPrefix), et = ht.toString(16), Ue.push(et), Ue.push('">');
      case 4:
        return Ue.push('<table hidden id="'), Ue.push(et.segmentPrefix), et = ht.toString(16), Ue.push(et), Ue.push('">');
      case 5:
        return Ue.push('<table hidden><tbody id="'), Ue.push(et.segmentPrefix), et = ht.toString(16), Ue.push(et), Ue.push('">');
      case 6:
        return Ue.push('<table hidden><tr id="'), Ue.push(et.segmentPrefix), et = ht.toString(16), Ue.push(et), Ue.push('">');
      case 7:
        return Ue.push('<table hidden><colgroup id="'), Ue.push(et.segmentPrefix), et = ht.toString(16), Ue.push(et), Ue.push('">');
      default:
        throw Error(t(397));
    }
  }
  function F(Ue, et) {
    switch (et.insertionMode) {
      case 0:
      case 1:
        return Ue.push("</div>");
      case 2:
        return Ue.push("</svg>");
      case 3:
        return Ue.push("</math>");
      case 4:
        return Ue.push("</table>");
      case 5:
        return Ue.push("</tbody></table>");
      case 6:
        return Ue.push("</tr></table>");
      case 7:
        return Ue.push("</colgroup></table>");
      default:
        throw Error(t(397));
    }
  }
  var N = /[<\u2028\u2029]/g;
  function G(Ue) {
    return JSON.stringify(Ue).replace(N, function (et) {
      switch (et) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  function z(Ue, et) {
    return et = et === void 0 ? "" : et, {
      bootstrapChunks: [],
      startInlineScript: "<script>",
      placeholderPrefix: et + "P:",
      segmentPrefix: et + "S:",
      boundaryPrefix: et + "B:",
      idPrefix: et,
      nextSuspenseID: 0,
      sentCompleteSegmentFunction: !1,
      sentCompleteBoundaryFunction: !1,
      sentClientRenderFunction: !1,
      generateStaticMarkup: Ue
    };
  }
  function V(Ue, et, ft, ht) {
    return ft.generateStaticMarkup ? (Ue.push(f(et)), !1) : (et === "" ? Ue = ht : (ht && Ue.push("<!-- -->"), Ue.push(f(et)), Ue = !0), Ue);
  }
  var O = Object.assign,
    L = Symbol.for("react.element"),
    D = Symbol.for("react.portal"),
    U = Symbol.for("react.fragment"),
    H = Symbol.for("react.strict_mode"),
    Y = Symbol.for("react.profiler"),
    K = Symbol.for("react.provider"),
    W = Symbol.for("react.context"),
    Q = Symbol.for("react.forward_ref"),
    q = Symbol.for("react.suspense"),
    ne = Symbol.for("react.suspense_list"),
    de = Symbol.for("react.memo"),
    le = Symbol.for("react.lazy"),
    J = Symbol.for("react.scope"),
    pe = Symbol.for("react.debug_trace_mode"),
    ce = Symbol.for("react.legacy_hidden"),
    we = Symbol.for("react.default_value"),
    X = Symbol.iterator;
  function Z(Ue) {
    if (Ue == null) return null;
    if (typeof Ue == "function") return Ue.displayName || Ue.name || null;
    if (typeof Ue == "string") return Ue;
    switch (Ue) {
      case U:
        return "Fragment";
      case D:
        return "Portal";
      case Y:
        return "Profiler";
      case H:
        return "StrictMode";
      case q:
        return "Suspense";
      case ne:
        return "SuspenseList";
    }
    if (typeof Ue == "object") switch (Ue.$$typeof) {
      case W:
        return (Ue.displayName || "Context") + ".Consumer";
      case K:
        return (Ue._context.displayName || "Context") + ".Provider";
      case Q:
        var et = Ue.render;
        return Ue = Ue.displayName, Ue || (Ue = et.displayName || et.name || "", Ue = Ue !== "" ? "ForwardRef(" + Ue + ")" : "ForwardRef"), Ue;
      case de:
        return et = Ue.displayName || null, et !== null ? et : Z(Ue.type) || "Memo";
      case le:
        et = Ue._payload, Ue = Ue._init;
        try {
          return Z(Ue(et));
        } catch {}
    }
    return null;
  }
  var re = {};
  function fe(Ue, et) {
    if (Ue = Ue.contextTypes, !Ue) return re;
    var ft = {},
      ht;
    for (ht in Ue) ft[ht] = et[ht];
    return ft;
  }
  var ye = null;
  function ie(Ue, et) {
    if (Ue !== et) {
      Ue.context._currentValue2 = Ue.parentValue, Ue = Ue.parent;
      var ft = et.parent;
      if (Ue === null) {
        if (ft !== null) throw Error(t(401));
      } else {
        if (ft === null) throw Error(t(401));
        ie(Ue, ft);
      }
      et.context._currentValue2 = et.value;
    }
  }
  function ae(Ue) {
    Ue.context._currentValue2 = Ue.parentValue, Ue = Ue.parent, Ue !== null && ae(Ue);
  }
  function be(Ue) {
    var et = Ue.parent;
    et !== null && be(et), Ue.context._currentValue2 = Ue.value;
  }
  function Ee(Ue, et) {
    if (Ue.context._currentValue2 = Ue.parentValue, Ue = Ue.parent, Ue === null) throw Error(t(402));
    Ue.depth === et.depth ? ie(Ue, et) : Ee(Ue, et);
  }
  function xe(Ue, et) {
    var ft = et.parent;
    if (ft === null) throw Error(t(402));
    Ue.depth === ft.depth ? ie(Ue, ft) : xe(Ue, ft), et.context._currentValue2 = et.value;
  }
  function he(Ue) {
    var et = ye;
    et !== Ue && (et === null ? be(Ue) : Ue === null ? ae(et) : et.depth === Ue.depth ? ie(et, Ue) : et.depth > Ue.depth ? Ee(et, Ue) : xe(et, Ue), ye = Ue);
  }
  var ue = {
    isMounted: function () {
      return !1;
    },
    enqueueSetState: function (Ue, et) {
      Ue = Ue._reactInternals, Ue.queue !== null && Ue.queue.push(et);
    },
    enqueueReplaceState: function (Ue, et) {
      Ue = Ue._reactInternals, Ue.replace = !0, Ue.queue = [et];
    },
    enqueueForceUpdate: function () {}
  };
  function ge(Ue, et, ft, ht) {
    var wt = Ue.state !== void 0 ? Ue.state : null;
    Ue.updater = ue, Ue.props = ft, Ue.state = wt;
    var jt = {
      queue: [],
      replace: !1
    };
    Ue._reactInternals = jt;
    var bt = et.contextType;
    if (Ue.context = typeof bt == "object" && bt !== null ? bt._currentValue2 : ht, bt = et.getDerivedStateFromProps, typeof bt == "function" && (bt = bt(ft, wt), wt = bt == null ? wt : O({}, wt, bt), Ue.state = wt), typeof et.getDerivedStateFromProps != "function" && typeof Ue.getSnapshotBeforeUpdate != "function" && (typeof Ue.UNSAFE_componentWillMount == "function" || typeof Ue.componentWillMount == "function")) if (et = Ue.state, typeof Ue.componentWillMount == "function" && Ue.componentWillMount(), typeof Ue.UNSAFE_componentWillMount == "function" && Ue.UNSAFE_componentWillMount(), et !== Ue.state && ue.enqueueReplaceState(Ue, Ue.state, null), jt.queue !== null && 0 < jt.queue.length) {
      if (et = jt.queue, bt = jt.replace, jt.queue = null, jt.replace = !1, bt && et.length === 1) Ue.state = et[0];else {
        for (jt = bt ? et[0] : Ue.state, wt = !0, bt = bt ? 1 : 0; bt < et.length; bt++) {
          var Bt = et[bt];
          Bt = typeof Bt == "function" ? Bt.call(Ue, jt, ft, ht) : Bt, Bt != null && (wt ? (wt = !1, jt = O({}, jt, Bt)) : O(jt, Bt));
        }
        Ue.state = jt;
      }
    } else jt.queue = null;
  }
  var _e = {
    id: 1,
    overflow: ""
  };
  function ke(Ue, et, ft) {
    var ht = Ue.id;
    Ue = Ue.overflow;
    var wt = 32 - ve(ht) - 1;
    ht &= ~(1 << wt), ft += 1;
    var jt = 32 - ve(et) + wt;
    if (30 < jt) {
      var bt = wt - wt % 5;
      return jt = (ht & (1 << bt) - 1).toString(32), ht >>= bt, wt -= bt, {
        id: 1 << 32 - ve(et) + wt | ft << wt | ht,
        overflow: jt + Ue
      };
    }
    return {
      id: 1 << jt | ft << wt | ht,
      overflow: Ue
    };
  }
  var ve = Math.clz32 ? Math.clz32 : me,
    Te = Math.log,
    Ne = Math.LN2;
  function me(Ue) {
    return Ue >>>= 0, Ue === 0 ? 32 : 31 - (Te(Ue) / Ne | 0) | 0;
  }
  function Ae(Ue, et) {
    return Ue === et && (Ue !== 0 || 1 / Ue === 1 / et) || Ue !== Ue && et !== et;
  }
  var Fe = typeof Object.is == "function" ? Object.is : Ae,
    Me = null,
    Re = null,
    $e = null,
    rt = null,
    nt = !1,
    ze = !1,
    Le = 0,
    Ke = null,
    Xe = 0;
  function De() {
    if (Me === null) throw Error(t(321));
    return Me;
  }
  function Ye() {
    if (0 < Xe) throw Error(t(312));
    return {
      memoizedState: null,
      queue: null,
      next: null
    };
  }
  function Ce() {
    return rt === null ? $e === null ? (nt = !1, $e = rt = Ye()) : (nt = !0, rt = $e) : rt.next === null ? (nt = !1, rt = rt.next = Ye()) : (nt = !0, rt = rt.next), rt;
  }
  function He() {
    Re = Me = null, ze = !1, $e = null, Xe = 0, rt = Ke = null;
  }
  function Ve(Ue, et) {
    return typeof et == "function" ? et(Ue) : et;
  }
  function it(Ue, et, ft) {
    if (Me = De(), rt = Ce(), nt) {
      var ht = rt.queue;
      if (et = ht.dispatch, Ke !== null && (ft = Ke.get(ht), ft !== void 0)) {
        Ke.delete(ht), ht = rt.memoizedState;
        do ht = Ue(ht, ft.action), ft = ft.next; while (ft !== null);
        return rt.memoizedState = ht, [ht, et];
      }
      return [rt.memoizedState, et];
    }
    return Ue = Ue === Ve ? typeof et == "function" ? et() : et : ft !== void 0 ? ft(et) : et, rt.memoizedState = Ue, Ue = rt.queue = {
      last: null,
      dispatch: null
    }, Ue = Ue.dispatch = Ft.bind(null, Me, Ue), [rt.memoizedState, Ue];
  }
  function It(Ue, et) {
    if (Me = De(), rt = Ce(), et = et === void 0 ? null : et, rt !== null) {
      var ft = rt.memoizedState;
      if (ft !== null && et !== null) {
        var ht = ft[1];
        e: if (ht === null) ht = !1;else {
          for (var wt = 0; wt < ht.length && wt < et.length; wt++) if (!Fe(et[wt], ht[wt])) {
            ht = !1;
            break e;
          }
          ht = !0;
        }
        if (ht) return ft[0];
      }
    }
    return Ue = Ue(), rt.memoizedState = [Ue, et], Ue;
  }
  function Ft(Ue, et, ft) {
    if (25 <= Xe) throw Error(t(301));
    if (Ue === Me) if (ze = !0, Ue = {
      action: ft,
      next: null
    }, Ke === null && (Ke = new Map()), ft = Ke.get(et), ft === void 0) Ke.set(et, Ue);else {
      for (et = ft; et.next !== null;) et = et.next;
      et.next = Ue;
    }
  }
  function We() {
    throw Error(t(394));
  }
  function Ze() {}
  var Ge = {
      readContext: function (Ue) {
        return Ue._currentValue2;
      },
      useContext: function (Ue) {
        return De(), Ue._currentValue2;
      },
      useMemo: It,
      useReducer: it,
      useRef: function (Ue) {
        Me = De(), rt = Ce();
        var et = rt.memoizedState;
        return et === null ? (Ue = {
          current: Ue
        }, rt.memoizedState = Ue) : et;
      },
      useState: function (Ue) {
        return it(Ve, Ue);
      },
      useInsertionEffect: Ze,
      useLayoutEffect: function () {},
      useCallback: function (Ue, et) {
        return It(function () {
          return Ue;
        }, et);
      },
      useImperativeHandle: Ze,
      useEffect: Ze,
      useDebugValue: Ze,
      useDeferredValue: function (Ue) {
        return De(), Ue;
      },
      useTransition: function () {
        return De(), [!1, We];
      },
      useId: function () {
        var Ue = Re.treeContext,
          et = Ue.overflow;
        Ue = Ue.id, Ue = (Ue & ~(1 << 32 - ve(Ue) - 1)).toString(32) + et;
        var ft = Oe;
        if (ft === null) throw Error(t(404));
        return et = Le++, Ue = ":" + ft.idPrefix + "R" + Ue, 0 < et && (Ue += "H" + et.toString(32)), Ue + ":";
      },
      useMutableSource: function (Ue, et) {
        return De(), et(Ue._source);
      },
      useSyncExternalStore: function (Ue, et, ft) {
        if (ft === void 0) throw Error(t(407));
        return ft();
      }
    },
    Oe = null,
    st = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function vt(Ue) {
    return console.error(Ue), null;
  }
  function Ht() {}
  function nn(Ue, et, ft, ht, wt, jt, bt, Bt, wn) {
    var at = [],
      Pt = new Set();
    return et = {
      destination: null,
      responseState: et,
      progressiveChunkSize: ht === void 0 ? 12800 : ht,
      status: 0,
      fatalError: null,
      nextSegmentId: 0,
      allPendingTasks: 0,
      pendingRootTasks: 0,
      completedRootSegment: null,
      abortableTasks: Pt,
      pingedTasks: at,
      clientRenderedBoundaries: [],
      completedBoundaries: [],
      partialBoundaries: [],
      onError: wt === void 0 ? vt : wt,
      onAllReady: Ht,
      onShellReady: bt === void 0 ? Ht : bt,
      onShellError: Ht,
      onFatalError: Ht
    }, ft = lt(et, 0, null, ft, !1, !1), ft.parentFlushed = !0, Ue = pt(et, Ue, null, ft, Pt, re, null, _e), at.push(Ue), et;
  }
  function pt(Ue, et, ft, ht, wt, jt, bt, Bt) {
    Ue.allPendingTasks++, ft === null ? Ue.pendingRootTasks++ : ft.pendingTasks++;
    var wn = {
      node: et,
      ping: function () {
        var at = Ue.pingedTasks;
        at.push(wn), at.length === 1 && rn(Ue);
      },
      blockedBoundary: ft,
      blockedSegment: ht,
      abortSet: wt,
      legacyContext: jt,
      context: bt,
      treeContext: Bt
    };
    return wt.add(wn), wn;
  }
  function lt(Ue, et, ft, ht, wt, jt) {
    return {
      status: 0,
      id: -1,
      index: et,
      parentFlushed: !1,
      chunks: [],
      children: [],
      formatContext: ht,
      boundary: ft,
      lastPushedText: wt,
      textEmbedded: jt
    };
  }
  function gt(Ue, et) {
    if (Ue = Ue.onError(et), Ue != null && typeof Ue != "string") throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof Ue + '" instead');
    return Ue;
  }
  function Ut(Ue, et) {
    var ft = Ue.onShellError;
    ft(et), ft = Ue.onFatalError, ft(et), Ue.destination !== null ? (Ue.status = 2, Ue.destination.destroy(et)) : (Ue.status = 1, Ue.fatalError = et);
  }
  function _t(Ue, et, ft, ht, wt) {
    for (Me = {}, Re = et, Le = 0, Ue = ft(ht, wt); ze;) ze = !1, Le = 0, Xe += 1, rt = null, Ue = ft(ht, wt);
    return He(), Ue;
  }
  function At(Ue, et, ft, ht) {
    var wt = ft.render(),
      jt = ht.childContextTypes;
    if (jt != null) {
      var bt = et.legacyContext;
      if (typeof ft.getChildContext != "function") ht = bt;else {
        ft = ft.getChildContext();
        for (var Bt in ft) if (!(Bt in jt)) throw Error(t(108, Z(ht) || "Unknown", Bt));
        ht = O({}, bt, ft);
      }
      et.legacyContext = ht, kt(Ue, et, wt), et.legacyContext = bt;
    } else kt(Ue, et, wt);
  }
  function Yt(Ue, et) {
    if (Ue && Ue.defaultProps) {
      et = O({}, et), Ue = Ue.defaultProps;
      for (var ft in Ue) et[ft] === void 0 && (et[ft] = Ue[ft]);
      return et;
    }
    return et;
  }
  function qe(Ue, et, ft, ht, wt) {
    if (typeof ft == "function") {
      if (ft.prototype && ft.prototype.isReactComponent) {
        wt = fe(ft, et.legacyContext);
        var jt = ft.contextType;
        jt = new ft(ht, typeof jt == "object" && jt !== null ? jt._currentValue2 : wt), ge(jt, ft, ht, wt), At(Ue, et, jt, ft);
      } else {
        jt = fe(ft, et.legacyContext), wt = _t(Ue, et, ft, ht, jt);
        var bt = Le !== 0;
        if (typeof wt == "object" && wt !== null && typeof wt.render == "function" && wt.$$typeof === void 0) ge(wt, ft, ht, jt), At(Ue, et, wt, ft);else if (bt) {
          ht = et.treeContext, et.treeContext = ke(ht, 1, 0);
          try {
            kt(Ue, et, wt);
          } finally {
            et.treeContext = ht;
          }
        } else kt(Ue, et, wt);
      }
    } else if (typeof ft == "string") {
      switch (wt = et.blockedSegment, jt = R(wt.chunks, ft, ht, Ue.responseState, wt.formatContext), wt.lastPushedText = !1, bt = wt.formatContext, wt.formatContext = w(bt, ft, ht), hn(Ue, et, jt), wt.formatContext = bt, ft) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          wt.chunks.push("</", ft, ">");
      }
      wt.lastPushedText = !1;
    } else {
      switch (ft) {
        case ce:
        case pe:
        case H:
        case Y:
        case U:
          kt(Ue, et, ht.children);
          return;
        case ne:
          kt(Ue, et, ht.children);
          return;
        case J:
          throw Error(t(343));
        case q:
          e: {
            ft = et.blockedBoundary, wt = et.blockedSegment, jt = ht.fallback, ht = ht.children, bt = new Set();
            var Bt = {
                id: null,
                rootSegmentID: -1,
                parentFlushed: !1,
                pendingTasks: 0,
                forceClientRender: !1,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks: bt,
                errorDigest: null
              },
              wn = lt(Ue, wt.chunks.length, Bt, wt.formatContext, !1, !1);
            wt.children.push(wn), wt.lastPushedText = !1;
            var at = lt(Ue, 0, null, wt.formatContext, !1, !1);
            at.parentFlushed = !0, et.blockedBoundary = Bt, et.blockedSegment = at;
            try {
              if (hn(Ue, et, ht), Ue.responseState.generateStaticMarkup || at.lastPushedText && at.textEmbedded && at.chunks.push("<!-- -->"), at.status = 1, ln(Bt, at), Bt.pendingTasks === 0) break e;
            } catch (Pt) {
              at.status = 4, Bt.forceClientRender = !0, Bt.errorDigest = gt(Ue, Pt);
            } finally {
              et.blockedBoundary = ft, et.blockedSegment = wt;
            }
            et = pt(Ue, jt, ft, wn, bt, et.legacyContext, et.context, et.treeContext), Ue.pingedTasks.push(et);
          }
          return;
      }
      if (typeof ft == "object" && ft !== null) switch (ft.$$typeof) {
        case Q:
          if (ht = _t(Ue, et, ft.render, ht, wt), Le !== 0) {
            ft = et.treeContext, et.treeContext = ke(ft, 1, 0);
            try {
              kt(Ue, et, ht);
            } finally {
              et.treeContext = ft;
            }
          } else kt(Ue, et, ht);
          return;
        case de:
          ft = ft.type, ht = Yt(ft, ht), qe(Ue, et, ft, ht, wt);
          return;
        case K:
          if (wt = ht.children, ft = ft._context, ht = ht.value, jt = ft._currentValue2, ft._currentValue2 = ht, bt = ye, ye = ht = {
            parent: bt,
            depth: bt === null ? 0 : bt.depth + 1,
            context: ft,
            parentValue: jt,
            value: ht
          }, et.context = ht, kt(Ue, et, wt), Ue = ye, Ue === null) throw Error(t(403));
          ht = Ue.parentValue, Ue.context._currentValue2 = ht === we ? Ue.context._defaultValue : ht, Ue = ye = Ue.parent, et.context = Ue;
          return;
        case W:
          ht = ht.children, ht = ht(ft._currentValue2), kt(Ue, et, ht);
          return;
        case le:
          wt = ft._init, ft = wt(ft._payload), ht = Yt(ft, ht), qe(Ue, et, ft, ht, void 0);
          return;
      }
      throw Error(t(130, ft == null ? ft : typeof ft, ""));
    }
  }
  function kt(Ue, et, ft) {
    if (et.node = ft, typeof ft == "object" && ft !== null) {
      switch (ft.$$typeof) {
        case L:
          qe(Ue, et, ft.type, ft.props, ft.ref);
          return;
        case D:
          throw Error(t(257));
        case le:
          var ht = ft._init;
          ft = ht(ft._payload), kt(Ue, et, ft);
          return;
      }
      if (v(ft)) {
        St(Ue, et, ft);
        return;
      }
      if (ft === null || typeof ft != "object" ? ht = null : (ht = X && ft[X] || ft["@@iterator"], ht = typeof ht == "function" ? ht : null), ht && (ht = ht.call(ft))) {
        if (ft = ht.next(), !ft.done) {
          var wt = [];
          do wt.push(ft.value), ft = ht.next(); while (!ft.done);
          St(Ue, et, wt);
        }
        return;
      }
      throw Ue = Object.prototype.toString.call(ft), Error(t(31, Ue === "[object Object]" ? "object with keys {" + Object.keys(ft).join(", ") + "}" : Ue));
    }
    typeof ft == "string" ? (ht = et.blockedSegment, ht.lastPushedText = V(et.blockedSegment.chunks, ft, Ue.responseState, ht.lastPushedText)) : typeof ft == "number" && (ht = et.blockedSegment, ht.lastPushedText = V(et.blockedSegment.chunks, "" + ft, Ue.responseState, ht.lastPushedText));
  }
  function St(Ue, et, ft) {
    for (var ht = ft.length, wt = 0; wt < ht; wt++) {
      var jt = et.treeContext;
      et.treeContext = ke(jt, ht, wt);
      try {
        hn(Ue, et, ft[wt]);
      } finally {
        et.treeContext = jt;
      }
    }
  }
  function hn(Ue, et, ft) {
    var ht = et.blockedSegment.formatContext,
      wt = et.legacyContext,
      jt = et.context;
    try {
      return kt(Ue, et, ft);
    } catch (wn) {
      if (He(), typeof wn == "object" && wn !== null && typeof wn.then == "function") {
        ft = wn;
        var bt = et.blockedSegment,
          Bt = lt(Ue, bt.chunks.length, null, bt.formatContext, bt.lastPushedText, !0);
        bt.children.push(Bt), bt.lastPushedText = !1, Ue = pt(Ue, et.node, et.blockedBoundary, Bt, et.abortSet, et.legacyContext, et.context, et.treeContext).ping, ft.then(Ue, Ue), et.blockedSegment.formatContext = ht, et.legacyContext = wt, et.context = jt, he(jt);
      } else throw et.blockedSegment.formatContext = ht, et.legacyContext = wt, et.context = jt, he(jt), wn;
    }
  }
  function Qt(Ue) {
    var et = Ue.blockedBoundary;
    Ue = Ue.blockedSegment, Ue.status = 3, Pn(this, et, Ue);
  }
  function Ot(Ue, et, ft) {
    var ht = Ue.blockedBoundary;
    Ue.blockedSegment.status = 3, ht === null ? (et.allPendingTasks--, et.status !== 2 && (et.status = 2, et.destination !== null && et.destination.push(null))) : (ht.pendingTasks--, ht.forceClientRender || (ht.forceClientRender = !0, Ue = ft === void 0 ? Error(t(432)) : ft, ht.errorDigest = et.onError(Ue), ht.parentFlushed && et.clientRenderedBoundaries.push(ht)), ht.fallbackAbortableTasks.forEach(function (wt) {
      return Ot(wt, et, ft);
    }), ht.fallbackAbortableTasks.clear(), et.allPendingTasks--, et.allPendingTasks === 0 && (ht = et.onAllReady, ht()));
  }
  function ln(Ue, et) {
    if (et.chunks.length === 0 && et.children.length === 1 && et.children[0].boundary === null) {
      var ft = et.children[0];
      ft.id = et.id, ft.parentFlushed = !0, ft.status === 1 && ln(Ue, ft);
    } else Ue.completedSegments.push(et);
  }
  function Pn(Ue, et, ft) {
    if (et === null) {
      if (ft.parentFlushed) {
        if (Ue.completedRootSegment !== null) throw Error(t(389));
        Ue.completedRootSegment = ft;
      }
      Ue.pendingRootTasks--, Ue.pendingRootTasks === 0 && (Ue.onShellError = Ht, et = Ue.onShellReady, et());
    } else et.pendingTasks--, et.forceClientRender || (et.pendingTasks === 0 ? (ft.parentFlushed && ft.status === 1 && ln(et, ft), et.parentFlushed && Ue.completedBoundaries.push(et), et.fallbackAbortableTasks.forEach(Qt, Ue), et.fallbackAbortableTasks.clear()) : ft.parentFlushed && ft.status === 1 && (ln(et, ft), et.completedSegments.length === 1 && et.parentFlushed && Ue.partialBoundaries.push(et)));
    Ue.allPendingTasks--, Ue.allPendingTasks === 0 && (Ue = Ue.onAllReady, Ue());
  }
  function rn(Ue) {
    if (Ue.status !== 2) {
      var et = ye,
        ft = st.current;
      st.current = Ge;
      var ht = Oe;
      Oe = Ue.responseState;
      try {
        var wt = Ue.pingedTasks,
          jt;
        for (jt = 0; jt < wt.length; jt++) {
          var bt = wt[jt],
            Bt = Ue,
            wn = bt.blockedSegment;
          if (wn.status === 0) {
            he(bt.context);
            try {
              kt(Bt, bt, bt.node), Bt.responseState.generateStaticMarkup || wn.lastPushedText && wn.textEmbedded && wn.chunks.push("<!-- -->"), bt.abortSet.delete(bt), wn.status = 1, Pn(Bt, bt.blockedBoundary, wn);
            } catch (gn) {
              if (He(), typeof gn == "object" && gn !== null && typeof gn.then == "function") {
                var at = bt.ping;
                gn.then(at, at);
              } else {
                bt.abortSet.delete(bt), wn.status = 4;
                var Pt = bt.blockedBoundary,
                  dt = gn,
                  xt = gt(Bt, dt);
                if (Pt === null ? Ut(Bt, dt) : (Pt.pendingTasks--, Pt.forceClientRender || (Pt.forceClientRender = !0, Pt.errorDigest = xt, Pt.parentFlushed && Bt.clientRenderedBoundaries.push(Pt))), Bt.allPendingTasks--, Bt.allPendingTasks === 0) {
                  var yn = Bt.onAllReady;
                  yn();
                }
              }
            } finally {}
          }
        }
        wt.splice(0, jt), Ue.destination !== null && Kn(Ue, Ue.destination);
      } catch (gn) {
        gt(Ue, gn), Ut(Ue, gn);
      } finally {
        Oe = ht, st.current = ft, ft === Ge && he(et);
      }
    }
  }
  function Yn(Ue, et, ft) {
    switch (ft.parentFlushed = !0, ft.status) {
      case 0:
        var ht = ft.id = Ue.nextSegmentId++;
        return ft.lastPushedText = !1, ft.textEmbedded = !1, Ue = Ue.responseState, et.push('<template id="'), et.push(Ue.placeholderPrefix), Ue = ht.toString(16), et.push(Ue), et.push('"></template>');
      case 1:
        ft.status = 2;
        var wt = !0;
        ht = ft.chunks;
        var jt = 0;
        ft = ft.children;
        for (var bt = 0; bt < ft.length; bt++) {
          for (wt = ft[bt]; jt < wt.index; jt++) et.push(ht[jt]);
          wt = Ct(Ue, et, wt);
        }
        for (; jt < ht.length - 1; jt++) et.push(ht[jt]);
        return jt < ht.length && (wt = et.push(ht[jt])), wt;
      default:
        throw Error(t(390));
    }
  }
  function Ct(Ue, et, ft) {
    var ht = ft.boundary;
    if (ht === null) return Yn(Ue, et, ft);
    if (ht.parentFlushed = !0, ht.forceClientRender) return Ue.responseState.generateStaticMarkup || (ht = ht.errorDigest, et.push("<!--$!-->"), et.push("<template"), ht && (et.push(' data-dgst="'), ht = f(ht), et.push(ht), et.push('"')), et.push("></template>")), Yn(Ue, et, ft), Ue = Ue.responseState.generateStaticMarkup ? !0 : et.push("<!--/$-->"), Ue;
    if (0 < ht.pendingTasks) {
      ht.rootSegmentID = Ue.nextSegmentId++, 0 < ht.completedSegments.length && Ue.partialBoundaries.push(ht);
      var wt = Ue.responseState,
        jt = wt.nextSuspenseID++;
      return wt = wt.boundaryPrefix + jt.toString(16), ht = ht.id = wt, j(et, Ue.responseState, ht), Yn(Ue, et, ft), et.push("<!--/$-->");
    }
    if (ht.byteSize > Ue.progressiveChunkSize) return ht.rootSegmentID = Ue.nextSegmentId++, Ue.completedBoundaries.push(ht), j(et, Ue.responseState, ht.id), Yn(Ue, et, ft), et.push("<!--/$-->");
    if (Ue.responseState.generateStaticMarkup || et.push("<!--$-->"), ft = ht.completedSegments, ft.length !== 1) throw Error(t(391));
    return Ct(Ue, et, ft[0]), Ue = Ue.responseState.generateStaticMarkup ? !0 : et.push("<!--/$-->"), Ue;
  }
  function Cn(Ue, et, ft) {
    return B(et, Ue.responseState, ft.formatContext, ft.id), Ct(Ue, et, ft), F(et, ft.formatContext);
  }
  function un(Ue, et, ft) {
    for (var ht = ft.completedSegments, wt = 0; wt < ht.length; wt++) Jn(Ue, et, ft, ht[wt]);
    if (ht.length = 0, Ue = Ue.responseState, ht = ft.id, ft = ft.rootSegmentID, et.push(Ue.startInlineScript), Ue.sentCompleteBoundaryFunction ? et.push('$RC("') : (Ue.sentCompleteBoundaryFunction = !0, et.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("')), ht === null) throw Error(t(395));
    return ft = ft.toString(16), et.push(ht), et.push('","'), et.push(Ue.segmentPrefix), et.push(ft), et.push('")<\/script>');
  }
  function Jn(Ue, et, ft, ht) {
    if (ht.status === 2) return !0;
    var wt = ht.id;
    if (wt === -1) {
      if ((ht.id = ft.rootSegmentID) === -1) throw Error(t(392));
      return Cn(Ue, et, ht);
    }
    return Cn(Ue, et, ht), Ue = Ue.responseState, et.push(Ue.startInlineScript), Ue.sentCompleteSegmentFunction ? et.push('$RS("') : (Ue.sentCompleteSegmentFunction = !0, et.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')), et.push(Ue.segmentPrefix), wt = wt.toString(16), et.push(wt), et.push('","'), et.push(Ue.placeholderPrefix), et.push(wt), et.push('")<\/script>');
  }
  function Kn(Ue, et) {
    try {
      var ft = Ue.completedRootSegment;
      if (ft !== null && Ue.pendingRootTasks === 0) {
        Ct(Ue, et, ft), Ue.completedRootSegment = null;
        var ht = Ue.responseState.bootstrapChunks;
        for (ft = 0; ft < ht.length - 1; ft++) et.push(ht[ft]);
        ft < ht.length && et.push(ht[ft]);
      }
      var wt = Ue.clientRenderedBoundaries,
        jt;
      for (jt = 0; jt < wt.length; jt++) {
        var bt = wt[jt];
        ht = et;
        var Bt = Ue.responseState,
          wn = bt.id,
          at = bt.errorDigest,
          Pt = bt.errorMessage,
          dt = bt.errorComponentStack;
        if (ht.push(Bt.startInlineScript), Bt.sentClientRenderFunction ? ht.push('$RX("') : (Bt.sentClientRenderFunction = !0, ht.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("')), wn === null) throw Error(t(395));
        if (ht.push(wn), ht.push('"'), at || Pt || dt) {
          ht.push(",");
          var xt = G(at || "");
          ht.push(xt);
        }
        if (Pt || dt) {
          ht.push(",");
          var yn = G(Pt || "");
          ht.push(yn);
        }
        if (dt) {
          ht.push(",");
          var gn = G(dt);
          ht.push(gn);
        }
        if (!ht.push(")<\/script>")) {
          Ue.destination = null, jt++, wt.splice(0, jt);
          return;
        }
      }
      wt.splice(0, jt);
      var mt = Ue.completedBoundaries;
      for (jt = 0; jt < mt.length; jt++) if (!un(Ue, et, mt[jt])) {
        Ue.destination = null, jt++, mt.splice(0, jt);
        return;
      }
      mt.splice(0, jt);
      var Xt = Ue.partialBoundaries;
      for (jt = 0; jt < Xt.length; jt++) {
        var Gn = Xt[jt];
        e: {
          wt = Ue, bt = et;
          var rr = Gn.completedSegments;
          for (Bt = 0; Bt < rr.length; Bt++) if (!Jn(wt, bt, Gn, rr[Bt])) {
            Bt++, rr.splice(0, Bt);
            var qn = !1;
            break e;
          }
          rr.splice(0, Bt), qn = !0;
        }
        if (!qn) {
          Ue.destination = null, jt++, Xt.splice(0, jt);
          return;
        }
      }
      Xt.splice(0, jt);
      var Dn = Ue.completedBoundaries;
      for (jt = 0; jt < Dn.length; jt++) if (!un(Ue, et, Dn[jt])) {
        Ue.destination = null, jt++, Dn.splice(0, jt);
        return;
      }
      Dn.splice(0, jt);
    } finally {
      Ue.allPendingTasks === 0 && Ue.pingedTasks.length === 0 && Ue.clientRenderedBoundaries.length === 0 && Ue.completedBoundaries.length === 0 && et.push(null);
    }
  }
  function en(Ue, et) {
    try {
      var ft = Ue.abortableTasks;
      ft.forEach(function (ht) {
        return Ot(ht, Ue, et);
      }), ft.clear(), Ue.destination !== null && Kn(Ue, Ue.destination);
    } catch (ht) {
      gt(Ue, ht), Ut(Ue, ht);
    }
  }
  function Vn() {}
  function Tt(Ue, et, ft, ht) {
    var wt = !1,
      jt = null,
      bt = "",
      Bt = {
        push: function (at) {
          return at !== null && (bt += at), !0;
        },
        destroy: function (at) {
          wt = !0, jt = at;
        }
      },
      wn = !1;
    if (Ue = nn(Ue, z(ft, et ? et.identifierPrefix : void 0), {
      insertionMode: 1,
      selectedValue: null
    }, 1 / 0, Vn, void 0, function () {
      wn = !0;
    }), rn(Ue), en(Ue, ht), Ue.status === 1) Ue.status = 2, Bt.destroy(Ue.fatalError);else if (Ue.status !== 2 && Ue.destination === null) {
      Ue.destination = Bt;
      try {
        Kn(Ue, Bt);
      } catch (at) {
        gt(Ue, at), Ut(Ue, at);
      }
    }
    if (wt) throw jt;
    if (!wn) throw Error(t(426));
    return bt;
  }
  return hV.renderToNodeStream = function () {
    throw Error(t(207));
  }, hV.renderToStaticMarkup = function (Ue, et) {
    return Tt(Ue, et, !0, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  }, hV.renderToStaticNodeStream = function () {
    throw Error(t(208));
  }, hV.renderToString = function (Ue, et) {
    return Tt(Ue, et, !1, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  }, hV.version = "18.3.1", hV;
}

var xPe = {};

/**
 * @license React
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $gn;

function Sgo() {
  if ($gn) return xPe;
  $gn = 1;
  var e = D4e();
  function t(je) {
    for (var Qe = "https://reactjs.org/docs/error-decoder.html?invariant=" + je, Mt = 1; Mt < arguments.length; Mt++) Qe += "&args[]=" + encodeURIComponent(arguments[Mt]);
    return "Minified React error #" + je + "; visit " + Qe + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var n = null,
    r = 0;
  function a(je, Qe) {
    if (Qe.length !== 0) if (512 < Qe.length) 0 < r && (je.enqueue(new Uint8Array(n.buffer, 0, r)), n = new Uint8Array(512), r = 0), je.enqueue(Qe);else {
      var Mt = n.length - r;
      Mt < Qe.length && (Mt === 0 ? je.enqueue(n) : (n.set(Qe.subarray(0, Mt), r), je.enqueue(n), Qe = Qe.subarray(Mt)), n = new Uint8Array(512), r = 0), n.set(Qe, r), r += Qe.length;
    }
  }
  function i(je, Qe) {
    return a(je, Qe), !0;
  }
  function o(je) {
    n && 0 < r && (je.enqueue(new Uint8Array(n.buffer, 0, r)), n = null, r = 0);
  }
  var s = new TextEncoder();
  function l(je) {
    return s.encode(je);
  }
  function d(je) {
    return s.encode(je);
  }
  function u(je, Qe) {
    typeof je.error == "function" ? je.error(Qe) : je.close();
  }
  var h = Object.prototype.hasOwnProperty,
    p = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    m = {},
    f = {};
  function y(je) {
    return h.call(f, je) ? !0 : h.call(m, je) ? !1 : p.test(je) ? f[je] = !0 : (m[je] = !0, !1);
  }
  function b(je, Qe, Mt, cn, Qn, Lt, ct) {
    this.acceptsBooleans = Qe === 2 || Qe === 3 || Qe === 4, this.attributeName = cn, this.attributeNamespace = Qn, this.mustUseProperty = Mt, this.propertyName = je, this.type = Qe, this.sanitizeURL = Lt, this.removeEmptyString = ct;
  }
  var v = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (je) {
    v[je] = new b(je, 0, !1, je, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (je) {
    var Qe = je[0];
    v[Qe] = new b(Qe, 1, !1, je[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (je) {
    v[je] = new b(je, 2, !1, je.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (je) {
    v[je] = new b(je, 2, !1, je, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (je) {
    v[je] = new b(je, 3, !1, je.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function (je) {
    v[je] = new b(je, 3, !0, je, null, !1, !1);
  }), ["capture", "download"].forEach(function (je) {
    v[je] = new b(je, 4, !1, je, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function (je) {
    v[je] = new b(je, 6, !1, je, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function (je) {
    v[je] = new b(je, 5, !1, je.toLowerCase(), null, !1, !1);
  });
  var _ = /[\-:]([a-z])/g;
  function w(je) {
    return je[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (je) {
    var Qe = je.replace(_, w);
    v[Qe] = new b(Qe, 1, !1, je, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (je) {
    var Qe = je.replace(_, w);
    v[Qe] = new b(Qe, 1, !1, je, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function (je) {
    var Qe = je.replace(_, w);
    v[Qe] = new b(Qe, 1, !1, je, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function (je) {
    v[je] = new b(je, 1, !1, je.toLowerCase(), null, !1, !1);
  }), v.xlinkHref = new b("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function (je) {
    v[je] = new b(je, 1, !1, je.toLowerCase(), null, !0, !0);
  });
  var k = {
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
    A = ["Webkit", "ms", "Moz", "O"];
  Object.keys(k).forEach(function (je) {
    A.forEach(function (Qe) {
      Qe = Qe + je.charAt(0).toUpperCase() + je.substring(1), k[Qe] = k[je];
    });
  });
  var S = /["'&<>]/;
  function C(je) {
    if (typeof je == "boolean" || typeof je == "number") return "" + je;
    je = "" + je;
    var Qe = S.exec(je);
    if (Qe) {
      var Mt = "",
        cn,
        Qn = 0;
      for (cn = Qe.index; cn < je.length; cn++) {
        switch (je.charCodeAt(cn)) {
          case 34:
            Qe = "&quot;";
            break;
          case 38:
            Qe = "&amp;";
            break;
          case 39:
            Qe = "&#x27;";
            break;
          case 60:
            Qe = "&lt;";
            break;
          case 62:
            Qe = "&gt;";
            break;
          default:
            continue;
        }
        Qn !== cn && (Mt += je.substring(Qn, cn)), Qn = cn + 1, Mt += Qe;
      }
      je = Qn !== cn ? Mt + je.substring(Qn, cn) : Mt;
    }
    return je;
  }
  var I = /([A-Z])/g,
    E = /^ms-/,
    M = Array.isArray,
    T = d("<script>"),
    P = d("<\/script>"),
    R = d('<script src="'),
    j = d('<script type="module" src="'),
    B = d('" async=""><\/script>'),
    F = /(<\/|<)(s)(cript)/gi;
  function N(je, Qe, Mt, cn) {
    return "" + Qe + (Mt === "s" ? "\\u0073" : "\\u0053") + cn;
  }
  function G(je, Qe, Mt, cn, Qn) {
    je = je === void 0 ? "" : je, Qe = Qe === void 0 ? T : d('<script nonce="' + C(Qe) + '">');
    var Lt = [];
    if (Mt !== void 0 && Lt.push(Qe, l(("" + Mt).replace(F, N)), P), cn !== void 0) for (Mt = 0; Mt < cn.length; Mt++) Lt.push(R, l(C(cn[Mt])), B);
    if (Qn !== void 0) for (cn = 0; cn < Qn.length; cn++) Lt.push(j, l(C(Qn[cn])), B);
    return {
      bootstrapChunks: Lt,
      startInlineScript: Qe,
      placeholderPrefix: d(je + "P:"),
      segmentPrefix: d(je + "S:"),
      boundaryPrefix: je + "B:",
      idPrefix: je,
      nextSuspenseID: 0,
      sentCompleteSegmentFunction: !1,
      sentCompleteBoundaryFunction: !1,
      sentClientRenderFunction: !1
    };
  }
  function z(je, Qe) {
    return {
      insertionMode: je,
      selectedValue: Qe
    };
  }
  function V(je) {
    return z(je === "http://www.w3.org/2000/svg" ? 2 : je === "http://www.w3.org/1998/Math/MathML" ? 3 : 0, null);
  }
  function O(je, Qe, Mt) {
    switch (Qe) {
      case "select":
        return z(1, Mt.value != null ? Mt.value : Mt.defaultValue);
      case "svg":
        return z(2, null);
      case "math":
        return z(3, null);
      case "foreignObject":
        return z(1, null);
      case "table":
        return z(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return z(5, null);
      case "colgroup":
        return z(7, null);
      case "tr":
        return z(6, null);
    }
    return 4 <= je.insertionMode || je.insertionMode === 0 ? z(1, null) : je;
  }
  var L = d("<!-- -->");
  function D(je, Qe, Mt, cn) {
    return Qe === "" ? cn : (cn && je.push(L), je.push(l(C(Qe))), !0);
  }
  var U = new Map(),
    H = d(' style="'),
    Y = d(":"),
    K = d(";");
  function W(je, Qe, Mt) {
    if (typeof Mt != "object") throw Error(t(62));
    Qe = !0;
    for (var cn in Mt) if (h.call(Mt, cn)) {
      var Qn = Mt[cn];
      if (Qn != null && typeof Qn != "boolean" && Qn !== "") {
        if (cn.indexOf("--") === 0) {
          var Lt = l(C(cn));
          Qn = l(C(("" + Qn).trim()));
        } else {
          Lt = cn;
          var ct = U.get(Lt);
          ct !== void 0 || (ct = d(C(Lt.replace(I, "-$1").toLowerCase().replace(E, "-ms-"))), U.set(Lt, ct)), Lt = ct, Qn = typeof Qn == "number" ? Qn === 0 || h.call(k, cn) ? l("" + Qn) : l(Qn + "px") : l(C(("" + Qn).trim()));
        }
        Qe ? (Qe = !1, je.push(H, Lt, Y, Qn)) : je.push(K, Lt, Y, Qn);
      }
    }
    Qe || je.push(ne);
  }
  var Q = d(" "),
    q = d('="'),
    ne = d('"'),
    de = d('=""');
  function le(je, Qe, Mt, cn) {
    switch (Mt) {
      case "style":
        W(je, Qe, cn);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < Mt.length) || Mt[0] !== "o" && Mt[0] !== "O" || Mt[1] !== "n" && Mt[1] !== "N") {
      if (Qe = v.hasOwnProperty(Mt) ? v[Mt] : null, Qe !== null) {
        switch (typeof cn) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!Qe.acceptsBooleans) return;
        }
        switch (Mt = l(Qe.attributeName), Qe.type) {
          case 3:
            cn && je.push(Q, Mt, de);
            break;
          case 4:
            cn === !0 ? je.push(Q, Mt, de) : cn !== !1 && je.push(Q, Mt, q, l(C(cn)), ne);
            break;
          case 5:
            isNaN(cn) || je.push(Q, Mt, q, l(C(cn)), ne);
            break;
          case 6:
            !isNaN(cn) && 1 <= cn && je.push(Q, Mt, q, l(C(cn)), ne);
            break;
          default:
            Qe.sanitizeURL && (cn = "" + cn), je.push(Q, Mt, q, l(C(cn)), ne);
        }
      } else if (y(Mt)) {
        switch (typeof cn) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (Qe = Mt.toLowerCase().slice(0, 5), Qe !== "data-" && Qe !== "aria-") return;
        }
        je.push(Q, l(Mt), q, l(C(cn)), ne);
      }
    }
  }
  var J = d(">"),
    pe = d("/>");
  function ce(je, Qe, Mt) {
    if (Qe != null) {
      if (Mt != null) throw Error(t(60));
      if (typeof Qe != "object" || !("__html" in Qe)) throw Error(t(61));
      Qe = Qe.__html, Qe != null && je.push(l("" + Qe));
    }
  }
  function we(je) {
    var Qe = "";
    return e.Children.forEach(je, function (Mt) {
      Mt != null && (Qe += Mt);
    }), Qe;
  }
  var X = d(' selected=""');
  function Z(je, Qe, Mt, cn) {
    je.push(ie(Mt));
    var Qn = Mt = null,
      Lt;
    for (Lt in Qe) if (h.call(Qe, Lt)) {
      var ct = Qe[Lt];
      if (ct != null) switch (Lt) {
        case "children":
          Mt = ct;
          break;
        case "dangerouslySetInnerHTML":
          Qn = ct;
          break;
        default:
          le(je, cn, Lt, ct);
      }
    }
    return je.push(J), ce(je, Qn, Mt), typeof Mt == "string" ? (je.push(l(C(Mt))), null) : Mt;
  }
  var re = d(`
`),
    fe = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    ye = new Map();
  function ie(je) {
    var Qe = ye.get(je);
    if (Qe === void 0) {
      if (!fe.test(je)) throw Error(t(65, je));
      Qe = d("<" + je), ye.set(je, Qe);
    }
    return Qe;
  }
  var ae = d("<!DOCTYPE html>");
  function be(je, Qe, Mt, cn, Qn) {
    switch (Qe) {
      case "select":
        je.push(ie("select"));
        var Lt = null,
          ct = null;
        for (fn in Mt) if (h.call(Mt, fn)) {
          var Dt = Mt[fn];
          if (Dt != null) switch (fn) {
            case "children":
              Lt = Dt;
              break;
            case "dangerouslySetInnerHTML":
              ct = Dt;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              le(je, cn, fn, Dt);
          }
        }
        return je.push(J), ce(je, ct, Lt), Lt;
      case "option":
        ct = Qn.selectedValue, je.push(ie("option"));
        var bn = Dt = null,
          Rt = null,
          fn = null;
        for (Lt in Mt) if (h.call(Mt, Lt)) {
          var Zt = Mt[Lt];
          if (Zt != null) switch (Lt) {
            case "children":
              Dt = Zt;
              break;
            case "selected":
              Rt = Zt;
              break;
            case "dangerouslySetInnerHTML":
              fn = Zt;
              break;
            case "value":
              bn = Zt;
            default:
              le(je, cn, Lt, Zt);
          }
        }
        if (ct != null) {
          if (Mt = bn !== null ? "" + bn : we(Dt), M(ct)) {
            for (cn = 0; cn < ct.length; cn++) if ("" + ct[cn] === Mt) {
              je.push(X);
              break;
            }
          } else "" + ct === Mt && je.push(X);
        } else Rt && je.push(X);
        return je.push(J), ce(je, fn, Dt), Dt;
      case "textarea":
        je.push(ie("textarea")), fn = ct = Lt = null;
        for (Dt in Mt) if (h.call(Mt, Dt) && (bn = Mt[Dt], bn != null)) switch (Dt) {
          case "children":
            fn = bn;
            break;
          case "value":
            Lt = bn;
            break;
          case "defaultValue":
            ct = bn;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(t(91));
          default:
            le(je, cn, Dt, bn);
        }
        if (Lt === null && ct !== null && (Lt = ct), je.push(J), fn != null) {
          if (Lt != null) throw Error(t(92));
          if (M(fn) && 1 < fn.length) throw Error(t(93));
          Lt = "" + fn;
        }
        return typeof Lt == "string" && Lt[0] === `
` && je.push(re), Lt !== null && je.push(l(C("" + Lt))), null;
      case "input":
        je.push(ie("input")), bn = fn = Dt = Lt = null;
        for (ct in Mt) if (h.call(Mt, ct) && (Rt = Mt[ct], Rt != null)) switch (ct) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(t(399, "input"));
          case "defaultChecked":
            bn = Rt;
            break;
          case "defaultValue":
            Dt = Rt;
            break;
          case "checked":
            fn = Rt;
            break;
          case "value":
            Lt = Rt;
            break;
          default:
            le(je, cn, ct, Rt);
        }
        return fn !== null ? le(je, cn, "checked", fn) : bn !== null && le(je, cn, "checked", bn), Lt !== null ? le(je, cn, "value", Lt) : Dt !== null && le(je, cn, "value", Dt), je.push(pe), null;
      case "menuitem":
        je.push(ie("menuitem"));
        for (var Ln in Mt) if (h.call(Mt, Ln) && (Lt = Mt[Ln], Lt != null)) switch (Ln) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(t(400));
          default:
            le(je, cn, Ln, Lt);
        }
        return je.push(J), null;
      case "title":
        je.push(ie("title")), Lt = null;
        for (Zt in Mt) if (h.call(Mt, Zt) && (ct = Mt[Zt], ct != null)) switch (Zt) {
          case "children":
            Lt = ct;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(t(434));
          default:
            le(je, cn, Zt, ct);
        }
        return je.push(J), Lt;
      case "listing":
      case "pre":
        je.push(ie(Qe)), ct = Lt = null;
        for (bn in Mt) if (h.call(Mt, bn) && (Dt = Mt[bn], Dt != null)) switch (bn) {
          case "children":
            Lt = Dt;
            break;
          case "dangerouslySetInnerHTML":
            ct = Dt;
            break;
          default:
            le(je, cn, bn, Dt);
        }
        if (je.push(J), ct != null) {
          if (Lt != null) throw Error(t(60));
          if (typeof ct != "object" || !("__html" in ct)) throw Error(t(61));
          Mt = ct.__html, Mt != null && (typeof Mt == "string" && 0 < Mt.length && Mt[0] === `
` ? je.push(re, l(Mt)) : je.push(l("" + Mt)));
        }
        return typeof Lt == "string" && Lt[0] === `
` && je.push(re), Lt;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        je.push(ie(Qe));
        for (var tt in Mt) if (h.call(Mt, tt) && (Lt = Mt[tt], Lt != null)) switch (tt) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(t(399, Qe));
          default:
            le(je, cn, tt, Lt);
        }
        return je.push(pe), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return Z(je, Mt, Qe, cn);
      case "html":
        return Qn.insertionMode === 0 && je.push(ae), Z(je, Mt, Qe, cn);
      default:
        if (Qe.indexOf("-") === -1 && typeof Mt.is != "string") return Z(je, Mt, Qe, cn);
        je.push(ie(Qe)), ct = Lt = null;
        for (Rt in Mt) if (h.call(Mt, Rt) && (Dt = Mt[Rt], Dt != null)) switch (Rt) {
          case "children":
            Lt = Dt;
            break;
          case "dangerouslySetInnerHTML":
            ct = Dt;
            break;
          case "style":
            W(je, cn, Dt);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            break;
          default:
            y(Rt) && typeof Dt != "function" && typeof Dt != "symbol" && je.push(Q, l(Rt), q, l(C(Dt)), ne);
        }
        return je.push(J), ce(je, ct, Lt), Lt;
    }
  }
  var Ee = d("</"),
    xe = d(">"),
    he = d('<template id="'),
    ue = d('"></template>'),
    ge = d("<!--$-->"),
    _e = d('<!--$?--><template id="'),
    ke = d('"></template>'),
    ve = d("<!--$!-->"),
    Te = d("<!--/$-->"),
    Ne = d("<template"),
    me = d('"'),
    Ae = d(' data-dgst="');
  d(' data-msg="'), d(' data-stck="');
  var Fe = d("></template>");
  function Me(je, Qe, Mt) {
    if (a(je, _e), Mt === null) throw Error(t(395));
    return a(je, Mt), i(je, ke);
  }
  var Re = d('<div hidden id="'),
    $e = d('">'),
    rt = d("</div>"),
    nt = d('<svg aria-hidden="true" style="display:none" id="'),
    ze = d('">'),
    Le = d("</svg>"),
    Ke = d('<math aria-hidden="true" style="display:none" id="'),
    Xe = d('">'),
    De = d("</math>"),
    Ye = d('<table hidden id="'),
    Ce = d('">'),
    He = d("</table>"),
    Ve = d('<table hidden><tbody id="'),
    it = d('">'),
    It = d("</tbody></table>"),
    Ft = d('<table hidden><tr id="'),
    We = d('">'),
    Ze = d("</tr></table>"),
    Ge = d('<table hidden><colgroup id="'),
    Oe = d('">'),
    st = d("</colgroup></table>");
  function vt(je, Qe, Mt, cn) {
    switch (Mt.insertionMode) {
      case 0:
      case 1:
        return a(je, Re), a(je, Qe.segmentPrefix), a(je, l(cn.toString(16))), i(je, $e);
      case 2:
        return a(je, nt), a(je, Qe.segmentPrefix), a(je, l(cn.toString(16))), i(je, ze);
      case 3:
        return a(je, Ke), a(je, Qe.segmentPrefix), a(je, l(cn.toString(16))), i(je, Xe);
      case 4:
        return a(je, Ye), a(je, Qe.segmentPrefix), a(je, l(cn.toString(16))), i(je, Ce);
      case 5:
        return a(je, Ve), a(je, Qe.segmentPrefix), a(je, l(cn.toString(16))), i(je, it);
      case 6:
        return a(je, Ft), a(je, Qe.segmentPrefix), a(je, l(cn.toString(16))), i(je, We);
      case 7:
        return a(je, Ge), a(je, Qe.segmentPrefix), a(je, l(cn.toString(16))), i(je, Oe);
      default:
        throw Error(t(397));
    }
  }
  function Ht(je, Qe) {
    switch (Qe.insertionMode) {
      case 0:
      case 1:
        return i(je, rt);
      case 2:
        return i(je, Le);
      case 3:
        return i(je, De);
      case 4:
        return i(je, He);
      case 5:
        return i(je, It);
      case 6:
        return i(je, Ze);
      case 7:
        return i(je, st);
      default:
        throw Error(t(397));
    }
  }
  var nn = d('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'),
    pt = d('$RS("'),
    lt = d('","'),
    gt = d('")<\/script>'),
    Ut = d('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'),
    _t = d('$RC("'),
    At = d('","'),
    Yt = d('")<\/script>'),
    qe = d('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'),
    kt = d('$RX("'),
    St = d('"'),
    hn = d(")<\/script>"),
    Qt = d(","),
    Ot = /[<\u2028\u2029]/g;
  function ln(je) {
    return JSON.stringify(je).replace(Ot, function (Qe) {
      switch (Qe) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  var Pn = Object.assign,
    rn = Symbol.for("react.element"),
    Yn = Symbol.for("react.portal"),
    Ct = Symbol.for("react.fragment"),
    Cn = Symbol.for("react.strict_mode"),
    un = Symbol.for("react.profiler"),
    Jn = Symbol.for("react.provider"),
    Kn = Symbol.for("react.context"),
    en = Symbol.for("react.forward_ref"),
    Vn = Symbol.for("react.suspense"),
    Tt = Symbol.for("react.suspense_list"),
    Ue = Symbol.for("react.memo"),
    et = Symbol.for("react.lazy"),
    ft = Symbol.for("react.scope"),
    ht = Symbol.for("react.debug_trace_mode"),
    wt = Symbol.for("react.legacy_hidden"),
    jt = Symbol.for("react.default_value"),
    bt = Symbol.iterator;
  function Bt(je) {
    if (je == null) return null;
    if (typeof je == "function") return je.displayName || je.name || null;
    if (typeof je == "string") return je;
    switch (je) {
      case Ct:
        return "Fragment";
      case Yn:
        return "Portal";
      case un:
        return "Profiler";
      case Cn:
        return "StrictMode";
      case Vn:
        return "Suspense";
      case Tt:
        return "SuspenseList";
    }
    if (typeof je == "object") switch (je.$$typeof) {
      case Kn:
        return (je.displayName || "Context") + ".Consumer";
      case Jn:
        return (je._context.displayName || "Context") + ".Provider";
      case en:
        var Qe = je.render;
        return je = je.displayName, je || (je = Qe.displayName || Qe.name || "", je = je !== "" ? "ForwardRef(" + je + ")" : "ForwardRef"), je;
      case Ue:
        return Qe = je.displayName || null, Qe !== null ? Qe : Bt(je.type) || "Memo";
      case et:
        Qe = je._payload, je = je._init;
        try {
          return Bt(je(Qe));
        } catch {}
    }
    return null;
  }
  var wn = {};
  function at(je, Qe) {
    if (je = je.contextTypes, !je) return wn;
    var Mt = {},
      cn;
    for (cn in je) Mt[cn] = Qe[cn];
    return Mt;
  }
  var Pt = null;
  function dt(je, Qe) {
    if (je !== Qe) {
      je.context._currentValue = je.parentValue, je = je.parent;
      var Mt = Qe.parent;
      if (je === null) {
        if (Mt !== null) throw Error(t(401));
      } else {
        if (Mt === null) throw Error(t(401));
        dt(je, Mt);
      }
      Qe.context._currentValue = Qe.value;
    }
  }
  function xt(je) {
    je.context._currentValue = je.parentValue, je = je.parent, je !== null && xt(je);
  }
  function yn(je) {
    var Qe = je.parent;
    Qe !== null && yn(Qe), je.context._currentValue = je.value;
  }
  function gn(je, Qe) {
    if (je.context._currentValue = je.parentValue, je = je.parent, je === null) throw Error(t(402));
    je.depth === Qe.depth ? dt(je, Qe) : gn(je, Qe);
  }
  function mt(je, Qe) {
    var Mt = Qe.parent;
    if (Mt === null) throw Error(t(402));
    je.depth === Mt.depth ? dt(je, Mt) : mt(je, Mt), Qe.context._currentValue = Qe.value;
  }
  function Xt(je) {
    var Qe = Pt;
    Qe !== je && (Qe === null ? yn(je) : je === null ? xt(Qe) : Qe.depth === je.depth ? dt(Qe, je) : Qe.depth > je.depth ? gn(Qe, je) : mt(Qe, je), Pt = je);
  }
  var Gn = {
    isMounted: function () {
      return !1;
    },
    enqueueSetState: function (je, Qe) {
      je = je._reactInternals, je.queue !== null && je.queue.push(Qe);
    },
    enqueueReplaceState: function (je, Qe) {
      je = je._reactInternals, je.replace = !0, je.queue = [Qe];
    },
    enqueueForceUpdate: function () {}
  };
  function rr(je, Qe, Mt, cn) {
    var Qn = je.state !== void 0 ? je.state : null;
    je.updater = Gn, je.props = Mt, je.state = Qn;
    var Lt = {
      queue: [],
      replace: !1
    };
    je._reactInternals = Lt;
    var ct = Qe.contextType;
    if (je.context = typeof ct == "object" && ct !== null ? ct._currentValue : cn, ct = Qe.getDerivedStateFromProps, typeof ct == "function" && (ct = ct(Mt, Qn), Qn = ct == null ? Qn : Pn({}, Qn, ct), je.state = Qn), typeof Qe.getDerivedStateFromProps != "function" && typeof je.getSnapshotBeforeUpdate != "function" && (typeof je.UNSAFE_componentWillMount == "function" || typeof je.componentWillMount == "function")) if (Qe = je.state, typeof je.componentWillMount == "function" && je.componentWillMount(), typeof je.UNSAFE_componentWillMount == "function" && je.UNSAFE_componentWillMount(), Qe !== je.state && Gn.enqueueReplaceState(je, je.state, null), Lt.queue !== null && 0 < Lt.queue.length) {
      if (Qe = Lt.queue, ct = Lt.replace, Lt.queue = null, Lt.replace = !1, ct && Qe.length === 1) je.state = Qe[0];else {
        for (Lt = ct ? Qe[0] : je.state, Qn = !0, ct = ct ? 1 : 0; ct < Qe.length; ct++) {
          var Dt = Qe[ct];
          Dt = typeof Dt == "function" ? Dt.call(je, Lt, Mt, cn) : Dt, Dt != null && (Qn ? (Qn = !1, Lt = Pn({}, Lt, Dt)) : Pn(Lt, Dt));
        }
        je.state = Lt;
      }
    } else Lt.queue = null;
  }
  var qn = {
    id: 1,
    overflow: ""
  };
  function Dn(je, Qe, Mt) {
    var cn = je.id;
    je = je.overflow;
    var Qn = 32 - Ar(cn) - 1;
    cn &= ~(1 << Qn), Mt += 1;
    var Lt = 32 - Ar(Qe) + Qn;
    if (30 < Lt) {
      var ct = Qn - Qn % 5;
      return Lt = (cn & (1 << ct) - 1).toString(32), cn >>= ct, Qn -= ct, {
        id: 1 << 32 - Ar(Qe) + Qn | Mt << Qn | cn,
        overflow: Lt + je
      };
    }
    return {
      id: 1 << Lt | Mt << Qn | cn,
      overflow: je
    };
  }
  var Ar = Math.clz32 ? Math.clz32 : fa,
    _r = Math.log,
    Pa = Math.LN2;
  function fa(je) {
    return je >>>= 0, je === 0 ? 32 : 31 - (_r(je) / Pa | 0) | 0;
  }
  function Ca(je, Qe) {
    return je === Qe && (je !== 0 || 1 / je === 1 / Qe) || je !== je && Qe !== Qe;
  }
  var $n = typeof Object.is == "function" ? Object.is : Ca,
    yr = null,
    Ir = null,
    Gr = null,
    Zr = null,
    La = !1,
    sa = !1,
    Ea = 0,
    ba = null,
    ga = 0;
  function _a() {
    if (yr === null) throw Error(t(321));
    return yr;
  }
  function $a() {
    if (0 < ga) throw Error(t(312));
    return {
      memoizedState: null,
      queue: null,
      next: null
    };
  }
  function Ya() {
    return Zr === null ? Gr === null ? (La = !1, Gr = Zr = $a()) : (La = !0, Zr = Gr) : Zr.next === null ? (La = !1, Zr = Zr.next = $a()) : (La = !0, Zr = Zr.next), Zr;
  }
  function ta() {
    Ir = yr = null, sa = !1, Gr = null, ga = 0, Zr = ba = null;
  }
  function ki(je, Qe) {
    return typeof Qe == "function" ? Qe(je) : Qe;
  }
  function Wn(je, Qe, Mt) {
    if (yr = _a(), Zr = Ya(), La) {
      var cn = Zr.queue;
      if (Qe = cn.dispatch, ba !== null && (Mt = ba.get(cn), Mt !== void 0)) {
        ba.delete(cn), cn = Zr.memoizedState;
        do cn = je(cn, Mt.action), Mt = Mt.next; while (Mt !== null);
        return Zr.memoizedState = cn, [cn, Qe];
      }
      return [Zr.memoizedState, Qe];
    }
    return je = je === ki ? typeof Qe == "function" ? Qe() : Qe : Mt !== void 0 ? Mt(Qe) : Qe, Zr.memoizedState = je, je = Zr.queue = {
      last: null,
      dispatch: null
    }, je = je.dispatch = jn.bind(null, yr, je), [Zr.memoizedState, je];
  }
  function wr(je, Qe) {
    if (yr = _a(), Zr = Ya(), Qe = Qe === void 0 ? null : Qe, Zr !== null) {
      var Mt = Zr.memoizedState;
      if (Mt !== null && Qe !== null) {
        var cn = Mt[1];
        e: if (cn === null) cn = !1;else {
          for (var Qn = 0; Qn < cn.length && Qn < Qe.length; Qn++) if (!$n(Qe[Qn], cn[Qn])) {
            cn = !1;
            break e;
          }
          cn = !0;
        }
        if (cn) return Mt[0];
      }
    }
    return je = je(), Zr.memoizedState = [je, Qe], je;
  }
  function jn(je, Qe, Mt) {
    if (25 <= ga) throw Error(t(301));
    if (je === yr) if (sa = !0, je = {
      action: Mt,
      next: null
    }, ba === null && (ba = new Map()), Mt = ba.get(Qe), Mt === void 0) ba.set(Qe, je);else {
      for (Qe = Mt; Qe.next !== null;) Qe = Qe.next;
      Qe.next = je;
    }
  }
  function _n() {
    throw Error(t(394));
  }
  function ar() {}
  var Vt = {
      readContext: function (je) {
        return je._currentValue;
      },
      useContext: function (je) {
        return _a(), je._currentValue;
      },
      useMemo: wr,
      useReducer: Wn,
      useRef: function (je) {
        yr = _a(), Zr = Ya();
        var Qe = Zr.memoizedState;
        return Qe === null ? (je = {
          current: je
        }, Zr.memoizedState = je) : Qe;
      },
      useState: function (je) {
        return Wn(ki, je);
      },
      useInsertionEffect: ar,
      useLayoutEffect: function () {},
      useCallback: function (je, Qe) {
        return wr(function () {
          return je;
        }, Qe);
      },
      useImperativeHandle: ar,
      useEffect: ar,
      useDebugValue: ar,
      useDeferredValue: function (je) {
        return _a(), je;
      },
      useTransition: function () {
        return _a(), [!1, _n];
      },
      useId: function () {
        var je = Ir.treeContext,
          Qe = je.overflow;
        je = je.id, je = (je & ~(1 << 32 - Ar(je) - 1)).toString(32) + Qe;
        var Mt = vn;
        if (Mt === null) throw Error(t(404));
        return Qe = Ea++, je = ":" + Mt.idPrefix + "R" + je, 0 < Qe && (je += "H" + Qe.toString(32)), je + ":";
      },
      useMutableSource: function (je, Qe) {
        return _a(), Qe(je._source);
      },
      useSyncExternalStore: function (je, Qe, Mt) {
        if (Mt === void 0) throw Error(t(407));
        return Mt();
      }
    },
    vn = null,
    An = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function ur(je) {
    return console.error(je), null;
  }
  function zr() {}
  function Dr(je, Qe, Mt, cn, Qn, Lt, ct, Dt, bn) {
    var Rt = [],
      fn = new Set();
    return Qe = {
      destination: null,
      responseState: Qe,
      progressiveChunkSize: cn === void 0 ? 12800 : cn,
      status: 0,
      fatalError: null,
      nextSegmentId: 0,
      allPendingTasks: 0,
      pendingRootTasks: 0,
      completedRootSegment: null,
      abortableTasks: fn,
      pingedTasks: Rt,
      clientRenderedBoundaries: [],
      completedBoundaries: [],
      partialBoundaries: [],
      onError: Qn === void 0 ? ur : Qn,
      onAllReady: Lt === void 0 ? zr : Lt,
      onShellReady: ct === void 0 ? zr : ct,
      onShellError: Dt === void 0 ? zr : Dt,
      onFatalError: bn === void 0 ? zr : bn
    }, Mt = gr(Qe, 0, null, Mt, !1, !1), Mt.parentFlushed = !0, je = Wr(Qe, je, null, Mt, fn, wn, null, qn), Rt.push(je), Qe;
  }
  function Wr(je, Qe, Mt, cn, Qn, Lt, ct, Dt) {
    je.allPendingTasks++, Mt === null ? je.pendingRootTasks++ : Mt.pendingTasks++;
    var bn = {
      node: Qe,
      ping: function () {
        var Rt = je.pingedTasks;
        Rt.push(bn), Rt.length === 1 && Za(je);
      },
      blockedBoundary: Mt,
      blockedSegment: cn,
      abortSet: Qn,
      legacyContext: Lt,
      context: ct,
      treeContext: Dt
    };
    return Qn.add(bn), bn;
  }
  function gr(je, Qe, Mt, cn, Qn, Lt) {
    return {
      status: 0,
      id: -1,
      index: Qe,
      parentFlushed: !1,
      chunks: [],
      children: [],
      formatContext: cn,
      boundary: Mt,
      lastPushedText: Qn,
      textEmbedded: Lt
    };
  }
  function jr(je, Qe) {
    if (je = je.onError(Qe), je != null && typeof je != "string") throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof je + '" instead');
    return je;
  }
  function ea(je, Qe) {
    var Mt = je.onShellError;
    Mt(Qe), Mt = je.onFatalError, Mt(Qe), je.destination !== null ? (je.status = 2, u(je.destination, Qe)) : (je.status = 1, je.fatalError = Qe);
  }
  function pa(je, Qe, Mt, cn, Qn) {
    for (yr = {}, Ir = Qe, Ea = 0, je = Mt(cn, Qn); sa;) sa = !1, Ea = 0, ga += 1, Zr = null, je = Mt(cn, Qn);
    return ta(), je;
  }
  function Br(je, Qe, Mt, cn) {
    var Qn = Mt.render(),
      Lt = cn.childContextTypes;
    if (Lt != null) {
      var ct = Qe.legacyContext;
      if (typeof Mt.getChildContext != "function") cn = ct;else {
        Mt = Mt.getChildContext();
        for (var Dt in Mt) if (!(Dt in Lt)) throw Error(t(108, Bt(cn) || "Unknown", Dt));
        cn = Pn({}, ct, Mt);
      }
      Qe.legacyContext = cn, br(je, Qe, Qn), Qe.legacyContext = ct;
    } else br(je, Qe, Qn);
  }
  function tn(je, Qe) {
    if (je && je.defaultProps) {
      Qe = Pn({}, Qe), je = je.defaultProps;
      for (var Mt in je) Qe[Mt] === void 0 && (Qe[Mt] = je[Mt]);
      return Qe;
    }
    return Qe;
  }
  function Lr(je, Qe, Mt, cn, Qn) {
    if (typeof Mt == "function") {
      if (Mt.prototype && Mt.prototype.isReactComponent) {
        Qn = at(Mt, Qe.legacyContext);
        var Lt = Mt.contextType;
        Lt = new Mt(cn, typeof Lt == "object" && Lt !== null ? Lt._currentValue : Qn), rr(Lt, Mt, cn, Qn), Br(je, Qe, Lt, Mt);
      } else {
        Lt = at(Mt, Qe.legacyContext), Qn = pa(je, Qe, Mt, cn, Lt);
        var ct = Ea !== 0;
        if (typeof Qn == "object" && Qn !== null && typeof Qn.render == "function" && Qn.$$typeof === void 0) rr(Qn, Mt, cn, Lt), Br(je, Qe, Qn, Mt);else if (ct) {
          cn = Qe.treeContext, Qe.treeContext = Dn(cn, 1, 0);
          try {
            br(je, Qe, Qn);
          } finally {
            Qe.treeContext = cn;
          }
        } else br(je, Qe, Qn);
      }
    } else if (typeof Mt == "string") {
      switch (Qn = Qe.blockedSegment, Lt = be(Qn.chunks, Mt, cn, je.responseState, Qn.formatContext), Qn.lastPushedText = !1, ct = Qn.formatContext, Qn.formatContext = O(ct, Mt, cn), Kr(je, Qe, Lt), Qn.formatContext = ct, Mt) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          Qn.chunks.push(Ee, l(Mt), xe);
      }
      Qn.lastPushedText = !1;
    } else {
      switch (Mt) {
        case wt:
        case ht:
        case Cn:
        case un:
        case Ct:
          br(je, Qe, cn.children);
          return;
        case Tt:
          br(je, Qe, cn.children);
          return;
        case ft:
          throw Error(t(343));
        case Vn:
          e: {
            Mt = Qe.blockedBoundary, Qn = Qe.blockedSegment, Lt = cn.fallback, cn = cn.children, ct = new Set();
            var Dt = {
                id: null,
                rootSegmentID: -1,
                parentFlushed: !1,
                pendingTasks: 0,
                forceClientRender: !1,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks: ct,
                errorDigest: null
              },
              bn = gr(je, Qn.chunks.length, Dt, Qn.formatContext, !1, !1);
            Qn.children.push(bn), Qn.lastPushedText = !1;
            var Rt = gr(je, 0, null, Qn.formatContext, !1, !1);
            Rt.parentFlushed = !0, Qe.blockedBoundary = Dt, Qe.blockedSegment = Rt;
            try {
              if (Kr(je, Qe, cn), Rt.lastPushedText && Rt.textEmbedded && Rt.chunks.push(L), Rt.status = 1, ha(Dt, Rt), Dt.pendingTasks === 0) break e;
            } catch (fn) {
              Rt.status = 4, Dt.forceClientRender = !0, Dt.errorDigest = jr(je, fn);
            } finally {
              Qe.blockedBoundary = Mt, Qe.blockedSegment = Qn;
            }
            Qe = Wr(je, Lt, Mt, bn, ct, Qe.legacyContext, Qe.context, Qe.treeContext), je.pingedTasks.push(Qe);
          }
          return;
      }
      if (typeof Mt == "object" && Mt !== null) switch (Mt.$$typeof) {
        case en:
          if (cn = pa(je, Qe, Mt.render, cn, Qn), Ea !== 0) {
            Mt = Qe.treeContext, Qe.treeContext = Dn(Mt, 1, 0);
            try {
              br(je, Qe, cn);
            } finally {
              Qe.treeContext = Mt;
            }
          } else br(je, Qe, cn);
          return;
        case Ue:
          Mt = Mt.type, cn = tn(Mt, cn), Lr(je, Qe, Mt, cn, Qn);
          return;
        case Jn:
          if (Qn = cn.children, Mt = Mt._context, cn = cn.value, Lt = Mt._currentValue, Mt._currentValue = cn, ct = Pt, Pt = cn = {
            parent: ct,
            depth: ct === null ? 0 : ct.depth + 1,
            context: Mt,
            parentValue: Lt,
            value: cn
          }, Qe.context = cn, br(je, Qe, Qn), je = Pt, je === null) throw Error(t(403));
          cn = je.parentValue, je.context._currentValue = cn === jt ? je.context._defaultValue : cn, je = Pt = je.parent, Qe.context = je;
          return;
        case Kn:
          cn = cn.children, cn = cn(Mt._currentValue), br(je, Qe, cn);
          return;
        case et:
          Qn = Mt._init, Mt = Qn(Mt._payload), cn = tn(Mt, cn), Lr(je, Qe, Mt, cn, void 0);
          return;
      }
      throw Error(t(130, Mt == null ? Mt : typeof Mt, ""));
    }
  }
  function br(je, Qe, Mt) {
    if (Qe.node = Mt, typeof Mt == "object" && Mt !== null) {
      switch (Mt.$$typeof) {
        case rn:
          Lr(je, Qe, Mt.type, Mt.props, Mt.ref);
          return;
        case Yn:
          throw Error(t(257));
        case et:
          var cn = Mt._init;
          Mt = cn(Mt._payload), br(je, Qe, Mt);
          return;
      }
      if (M(Mt)) {
        Jr(je, Qe, Mt);
        return;
      }
      if (Mt === null || typeof Mt != "object" ? cn = null : (cn = bt && Mt[bt] || Mt["@@iterator"], cn = typeof cn == "function" ? cn : null), cn && (cn = cn.call(Mt))) {
        if (Mt = cn.next(), !Mt.done) {
          var Qn = [];
          do Qn.push(Mt.value), Mt = cn.next(); while (!Mt.done);
          Jr(je, Qe, Qn);
        }
        return;
      }
      throw je = Object.prototype.toString.call(Mt), Error(t(31, je === "[object Object]" ? "object with keys {" + Object.keys(Mt).join(", ") + "}" : je));
    }
    typeof Mt == "string" ? (cn = Qe.blockedSegment, cn.lastPushedText = D(Qe.blockedSegment.chunks, Mt, je.responseState, cn.lastPushedText)) : typeof Mt == "number" && (cn = Qe.blockedSegment, cn.lastPushedText = D(Qe.blockedSegment.chunks, "" + Mt, je.responseState, cn.lastPushedText));
  }
  function Jr(je, Qe, Mt) {
    for (var cn = Mt.length, Qn = 0; Qn < cn; Qn++) {
      var Lt = Qe.treeContext;
      Qe.treeContext = Dn(Lt, cn, Qn);
      try {
        Kr(je, Qe, Mt[Qn]);
      } finally {
        Qe.treeContext = Lt;
      }
    }
  }
  function Kr(je, Qe, Mt) {
    var cn = Qe.blockedSegment.formatContext,
      Qn = Qe.legacyContext,
      Lt = Qe.context;
    try {
      return br(je, Qe, Mt);
    } catch (bn) {
      if (ta(), typeof bn == "object" && bn !== null && typeof bn.then == "function") {
        Mt = bn;
        var ct = Qe.blockedSegment,
          Dt = gr(je, ct.chunks.length, null, ct.formatContext, ct.lastPushedText, !0);
        ct.children.push(Dt), ct.lastPushedText = !1, je = Wr(je, Qe.node, Qe.blockedBoundary, Dt, Qe.abortSet, Qe.legacyContext, Qe.context, Qe.treeContext).ping, Mt.then(je, je), Qe.blockedSegment.formatContext = cn, Qe.legacyContext = Qn, Qe.context = Lt, Xt(Lt);
      } else throw Qe.blockedSegment.formatContext = cn, Qe.legacyContext = Qn, Qe.context = Lt, Xt(Lt), bn;
    }
  }
  function ir(je) {
    var Qe = je.blockedBoundary;
    je = je.blockedSegment, je.status = 3, Ga(this, Qe, je);
  }
  function Hr(je, Qe, Mt) {
    var cn = je.blockedBoundary;
    je.blockedSegment.status = 3, cn === null ? (Qe.allPendingTasks--, Qe.status !== 2 && (Qe.status = 2, Qe.destination !== null && Qe.destination.close())) : (cn.pendingTasks--, cn.forceClientRender || (cn.forceClientRender = !0, je = Mt === void 0 ? Error(t(432)) : Mt, cn.errorDigest = Qe.onError(je), cn.parentFlushed && Qe.clientRenderedBoundaries.push(cn)), cn.fallbackAbortableTasks.forEach(function (Qn) {
      return Hr(Qn, Qe, Mt);
    }), cn.fallbackAbortableTasks.clear(), Qe.allPendingTasks--, Qe.allPendingTasks === 0 && (cn = Qe.onAllReady, cn()));
  }
  function ha(je, Qe) {
    if (Qe.chunks.length === 0 && Qe.children.length === 1 && Qe.children[0].boundary === null) {
      var Mt = Qe.children[0];
      Mt.id = Qe.id, Mt.parentFlushed = !0, Mt.status === 1 && ha(je, Mt);
    } else je.completedSegments.push(Qe);
  }
  function Ga(je, Qe, Mt) {
    if (Qe === null) {
      if (Mt.parentFlushed) {
        if (je.completedRootSegment !== null) throw Error(t(389));
        je.completedRootSegment = Mt;
      }
      je.pendingRootTasks--, je.pendingRootTasks === 0 && (je.onShellError = zr, Qe = je.onShellReady, Qe());
    } else Qe.pendingTasks--, Qe.forceClientRender || (Qe.pendingTasks === 0 ? (Mt.parentFlushed && Mt.status === 1 && ha(Qe, Mt), Qe.parentFlushed && je.completedBoundaries.push(Qe), Qe.fallbackAbortableTasks.forEach(ir, je), Qe.fallbackAbortableTasks.clear()) : Mt.parentFlushed && Mt.status === 1 && (ha(Qe, Mt), Qe.completedSegments.length === 1 && Qe.parentFlushed && je.partialBoundaries.push(Qe)));
    je.allPendingTasks--, je.allPendingTasks === 0 && (je = je.onAllReady, je());
  }
  function Za(je) {
    if (je.status !== 2) {
      var Qe = Pt,
        Mt = An.current;
      An.current = Vt;
      var cn = vn;
      vn = je.responseState;
      try {
        var Qn = je.pingedTasks,
          Lt;
        for (Lt = 0; Lt < Qn.length; Lt++) {
          var ct = Qn[Lt],
            Dt = je,
            bn = ct.blockedSegment;
          if (bn.status === 0) {
            Xt(ct.context);
            try {
              br(Dt, ct, ct.node), bn.lastPushedText && bn.textEmbedded && bn.chunks.push(L), ct.abortSet.delete(ct), bn.status = 1, Ga(Dt, ct.blockedBoundary, bn);
            } catch (zt) {
              if (ta(), typeof zt == "object" && zt !== null && typeof zt.then == "function") {
                var Rt = ct.ping;
                zt.then(Rt, Rt);
              } else {
                ct.abortSet.delete(ct), bn.status = 4;
                var fn = ct.blockedBoundary,
                  Zt = zt,
                  Ln = jr(Dt, Zt);
                if (fn === null ? ea(Dt, Zt) : (fn.pendingTasks--, fn.forceClientRender || (fn.forceClientRender = !0, fn.errorDigest = Ln, fn.parentFlushed && Dt.clientRenderedBoundaries.push(fn))), Dt.allPendingTasks--, Dt.allPendingTasks === 0) {
                  var tt = Dt.onAllReady;
                  tt();
                }
              }
            } finally {}
          }
        }
        Qn.splice(0, Lt), je.destination !== null && Hn(je, je.destination);
      } catch (zt) {
        jr(je, zt), ea(je, zt);
      } finally {
        vn = cn, An.current = Mt, Mt === Vt && Xt(Qe);
      }
    }
  }
  function va(je, Qe, Mt) {
    switch (Mt.parentFlushed = !0, Mt.status) {
      case 0:
        var cn = Mt.id = je.nextSegmentId++;
        return Mt.lastPushedText = !1, Mt.textEmbedded = !1, je = je.responseState, a(Qe, he), a(Qe, je.placeholderPrefix), je = l(cn.toString(16)), a(Qe, je), i(Qe, ue);
      case 1:
        Mt.status = 2;
        var Qn = !0;
        cn = Mt.chunks;
        var Lt = 0;
        Mt = Mt.children;
        for (var ct = 0; ct < Mt.length; ct++) {
          for (Qn = Mt[ct]; Lt < Qn.index; Lt++) a(Qe, cn[Lt]);
          Qn = Kt(je, Qe, Qn);
        }
        for (; Lt < cn.length - 1; Lt++) a(Qe, cn[Lt]);
        return Lt < cn.length && (Qn = i(Qe, cn[Lt])), Qn;
      default:
        throw Error(t(390));
    }
  }
  function Kt(je, Qe, Mt) {
    var cn = Mt.boundary;
    if (cn === null) return va(je, Qe, Mt);
    if (cn.parentFlushed = !0, cn.forceClientRender) cn = cn.errorDigest, i(Qe, ve), a(Qe, Ne), cn && (a(Qe, Ae), a(Qe, l(C(cn))), a(Qe, me)), i(Qe, Fe), va(je, Qe, Mt);else if (0 < cn.pendingTasks) {
      cn.rootSegmentID = je.nextSegmentId++, 0 < cn.completedSegments.length && je.partialBoundaries.push(cn);
      var Qn = je.responseState,
        Lt = Qn.nextSuspenseID++;
      Qn = d(Qn.boundaryPrefix + Lt.toString(16)), cn = cn.id = Qn, Me(Qe, je.responseState, cn), va(je, Qe, Mt);
    } else if (cn.byteSize > je.progressiveChunkSize) cn.rootSegmentID = je.nextSegmentId++, je.completedBoundaries.push(cn), Me(Qe, je.responseState, cn.id), va(je, Qe, Mt);else {
      if (i(Qe, ge), Mt = cn.completedSegments, Mt.length !== 1) throw Error(t(391));
      Kt(je, Qe, Mt[0]);
    }
    return i(Qe, Te);
  }
  function Pr(je, Qe, Mt) {
    return vt(Qe, je.responseState, Mt.formatContext, Mt.id), Kt(je, Qe, Mt), Ht(Qe, Mt.formatContext);
  }
  function kr(je, Qe, Mt) {
    for (var cn = Mt.completedSegments, Qn = 0; Qn < cn.length; Qn++) Mr(je, Qe, Mt, cn[Qn]);
    if (cn.length = 0, je = je.responseState, cn = Mt.id, Mt = Mt.rootSegmentID, a(Qe, je.startInlineScript), je.sentCompleteBoundaryFunction ? a(Qe, _t) : (je.sentCompleteBoundaryFunction = !0, a(Qe, Ut)), cn === null) throw Error(t(395));
    return Mt = l(Mt.toString(16)), a(Qe, cn), a(Qe, At), a(Qe, je.segmentPrefix), a(Qe, Mt), i(Qe, Yt);
  }
  function Mr(je, Qe, Mt, cn) {
    if (cn.status === 2) return !0;
    var Qn = cn.id;
    if (Qn === -1) {
      if ((cn.id = Mt.rootSegmentID) === -1) throw Error(t(392));
      return Pr(je, Qe, cn);
    }
    return Pr(je, Qe, cn), je = je.responseState, a(Qe, je.startInlineScript), je.sentCompleteSegmentFunction ? a(Qe, pt) : (je.sentCompleteSegmentFunction = !0, a(Qe, nn)), a(Qe, je.segmentPrefix), Qn = l(Qn.toString(16)), a(Qe, Qn), a(Qe, lt), a(Qe, je.placeholderPrefix), a(Qe, Qn), i(Qe, gt);
  }
  function Hn(je, Qe) {
    n = new Uint8Array(512), r = 0;
    try {
      var Mt = je.completedRootSegment;
      if (Mt !== null && je.pendingRootTasks === 0) {
        Kt(je, Qe, Mt), je.completedRootSegment = null;
        var cn = je.responseState.bootstrapChunks;
        for (Mt = 0; Mt < cn.length - 1; Mt++) a(Qe, cn[Mt]);
        Mt < cn.length && i(Qe, cn[Mt]);
      }
      var Qn = je.clientRenderedBoundaries,
        Lt;
      for (Lt = 0; Lt < Qn.length; Lt++) {
        var ct = Qn[Lt];
        cn = Qe;
        var Dt = je.responseState,
          bn = ct.id,
          Rt = ct.errorDigest,
          fn = ct.errorMessage,
          Zt = ct.errorComponentStack;
        if (a(cn, Dt.startInlineScript), Dt.sentClientRenderFunction ? a(cn, kt) : (Dt.sentClientRenderFunction = !0, a(cn, qe)), bn === null) throw Error(t(395));
        a(cn, bn), a(cn, St), (Rt || fn || Zt) && (a(cn, Qt), a(cn, l(ln(Rt || "")))), (fn || Zt) && (a(cn, Qt), a(cn, l(ln(fn || "")))), Zt && (a(cn, Qt), a(cn, l(ln(Zt)))), i(cn, hn);
      }
      Qn.splice(0, Lt);
      var Ln = je.completedBoundaries;
      for (Lt = 0; Lt < Ln.length; Lt++) kr(je, Qe, Ln[Lt]);
      Ln.splice(0, Lt), o(Qe), n = new Uint8Array(512), r = 0;
      var tt = je.partialBoundaries;
      for (Lt = 0; Lt < tt.length; Lt++) {
        var zt = tt[Lt];
        e: {
          Qn = je, ct = Qe;
          var an = zt.completedSegments;
          for (Dt = 0; Dt < an.length; Dt++) if (!Mr(Qn, ct, zt, an[Dt])) {
            Dt++, an.splice(0, Dt);
            var Rn = !1;
            break e;
          }
          an.splice(0, Dt), Rn = !0;
        }
        if (!Rn) {
          je.destination = null, Lt++, tt.splice(0, Lt);
          return;
        }
      }
      tt.splice(0, Lt);
      var Un = je.completedBoundaries;
      for (Lt = 0; Lt < Un.length; Lt++) kr(je, Qe, Un[Lt]);
      Un.splice(0, Lt);
    } finally {
      o(Qe), je.allPendingTasks === 0 && je.pingedTasks.length === 0 && je.clientRenderedBoundaries.length === 0 && je.completedBoundaries.length === 0 && Qe.close();
    }
  }
  function $t(je, Qe) {
    try {
      var Mt = je.abortableTasks;
      Mt.forEach(function (cn) {
        return Hr(cn, je, Qe);
      }), Mt.clear(), je.destination !== null && Hn(je, je.destination);
    } catch (cn) {
      jr(je, cn), ea(je, cn);
    }
  }
  return xPe.renderToReadableStream = function (je, Qe) {
    return new Promise(function (Mt, cn) {
      var Qn,
        Lt,
        ct = new Promise(function (fn, Zt) {
          Lt = fn, Qn = Zt;
        }),
        Dt = Dr(je, G(Qe ? Qe.identifierPrefix : void 0, Qe ? Qe.nonce : void 0, Qe ? Qe.bootstrapScriptContent : void 0, Qe ? Qe.bootstrapScripts : void 0, Qe ? Qe.bootstrapModules : void 0), V(Qe ? Qe.namespaceURI : void 0), Qe ? Qe.progressiveChunkSize : void 0, Qe ? Qe.onError : void 0, Lt, function () {
          var fn = new ReadableStream({
            type: "bytes",
            pull: function (Zt) {
              if (Dt.status === 1) Dt.status = 2, u(Zt, Dt.fatalError);else if (Dt.status !== 2 && Dt.destination === null) {
                Dt.destination = Zt;
                try {
                  Hn(Dt, Zt);
                } catch (Ln) {
                  jr(Dt, Ln), ea(Dt, Ln);
                }
              }
            },
            cancel: function () {
              $t(Dt);
            }
          }, {
            highWaterMark: 0
          });
          fn.allReady = ct, Mt(fn);
        }, function (fn) {
          ct.catch(function () {}), cn(fn);
        }, Qn);
      if (Qe && Qe.signal) {
        var bn = Qe.signal,
          Rt = function () {
            $t(Dt, bn.reason), bn.removeEventListener("abort", Rt);
          };
        bn.addEventListener("abort", Rt);
      }
      Za(Dt);
    });
  }, xPe.version = "18.3.1", xPe;
}

var Ggn;

function Igo() {
  if (Ggn) return VL;
  Ggn = 1;
  var e, t;
  return e = Ago(), t = Sgo(), VL.version = e.version, VL.renderToString = e.renderToString, VL.renderToStaticMarkup = e.renderToStaticMarkup, VL.renderToNodeStream = e.renderToNodeStream, VL.renderToStaticNodeStream = e.renderToStaticNodeStream, VL.renderToReadableStream = t.renderToReadableStream, VL;
}

var Cgo = Igo();

const Ego = "::lg:: ",
  Tgo = "::sm:: ",
  Qbr = "text-node-size-lg",
  Mgo = "text-node-size-md",
  Ybr = "text-node-size-sm",
  Pgo = "text-node-hr-spaced";

function Ute(e) {
  const t = [],
    n = /(`[^`\n]+`|\*\*\*[^*\n]+\*\*\*|\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|\*[^*\n]+\*)/g;
  let r = 0,
    a,
    i = 0;
  for (; (a = n.exec(e)) !== null;) {
    a.index > r && t.push(e.slice(r, a.index));
    const o = a[0];
    o.startsWith("***") ? t.push(c.jsx("strong", {
      children: c.jsx("em", {
        children: o.slice(3, -3)
      })
    }, `strong-em-${i++}`)) : o.startsWith("**") || o.startsWith("__") ? t.push(c.jsx("strong", {
      children: o.slice(2, -2)
    }, `strong-${i++}`)) : o.startsWith("~~") ? t.push(c.jsx("del", {
      children: o.slice(2, -2)
    }, `del-${i++}`)) : o.startsWith("`") ? t.push(c.jsx("code", {
      className: "rounded bg-black/15 px-1 py-0.5 font-mono text-[0.9em]",
      children: o.slice(1, -1)
    }, `code-${i++}`)) : t.push(c.jsx("em", {
      children: o.slice(1, -1)
    }, `em-${i++}`)), r = a.index + o.length;
  }
  return r < e.length && t.push(e.slice(r)), t;
}

function Rgo({
  isDark: e
}) {
  const t = `h-2 rounded-sm sketch-skeleton-pulse ${e ? "bg-white/20" : "bg-gray-200"}`;
  return c.jsxs("div", {
    className: "pointer-events-none space-y-2 p-2",
    "aria-hidden": !0,
    children: [c.jsx("div", {
      className: `w-full ${t}`
    }), c.jsx("div", {
      className: `w-2/3 ${t}`
    }), c.jsx("div", {
      className: `w-1/3 ${t}`
    })]
  });
}

function Ngo(e) {
  return e === "lg" ? "text-node-body--lg" : e === "sm" ? "text-node-body--sm" : "";
}

function jgo(e) {
  return e === "sm" || e === "lg" ? e : "md";
}

function Dgo(e) {
  return e === "lg" ? Qbr : e === "sm" ? Ybr : Mgo;
}

function Xbr(e) {
  return `${Pgo} block w-full border-0`;
}

function Lgo(e) {
  return `<hr class="${Xbr()}" />`;
}

function Ogo(e) {
  return e.replace(/^::(?:sm|lg)::\s+/, "").replace(/^#{1,6}\s+/, "").replace(/^(\s*)([-*]|\d+\.)\s+/, "$1");
}

function Bgo(e, t) {
  const n = e.tagName,
    r = t(e).trim();
  return n === "H1" ? `# ${r}`.trimEnd() : n === "H2" ? `## ${r}`.trimEnd() : n === "H3" ? `### ${r}`.trimEnd() : e.classList.contains(Qbr) ? `${Ego}${r}`.trimEnd() : e.classList.contains(Ybr) ? `${Tgo}${r}`.trimEnd() : t(e).trimEnd();
}

function Fgo(e, t) {
  let n = e;
  for (; n && n !== t;) {
    if (n instanceof HTMLElement) {
      const r = n.tagName;
      if (r === "DIV" && n.classList.contains("text-node-rich-root")) {
        n = n.parentElement;
        continue;
      }
      if (["P", "DIV", "H1", "H2", "H3", "LI", "BLOCKQUOTE"].includes(r)) return n;
    }
    n = n.parentElement;
  }
  return null;
}

function Jbr(e, t, n = !1) {
  const r = e.split(`
`),
    a = [];
  let i = 0;
  for (; i < r.length;) {
    const o = r[i],
      s = o.trim();
    if (!s) {
      n && a.push(c.jsx("div", {
        className: "text-node-blank-line",
        "aria-hidden": !0,
        children: c.jsx("br", {})
      }, `blank-${i}`)), i += 1;
      continue;
    }
    if (/^---+$/.test(s)) {
      a.push(c.jsx("div", {
        className: "text-node-hr-wrap",
        children: c.jsx("hr", {
          className: Xbr()
        })
      }, `hr-wrap-${i}`)), i += 1;
      continue;
    }
    const l = /^::(sm|lg)::\s*(.+)$/.exec(o);
    if (l) {
      const f = l[1] === "lg" ? "lg" : "sm";
      a.push(c.jsx("p", {
        className: `whitespace-pre-wrap ${Dgo(f)}`,
        children: Ute(l[2])
      }, `size-${i}`)), i += 1;
      continue;
    }
    const d = /^(#{1,3})\s+(.+)$/.exec(o);
    if (d) {
      const f = d[1].length,
        y = Ute(d[2]);
      f === 1 ? a.push(c.jsx("h1", {
        className: "whitespace-pre-wrap",
        children: y
      }, `heading-${i}`)) : f === 2 ? a.push(c.jsx("h2", {
        className: "whitespace-pre-wrap",
        children: y
      }, `heading-${i}`)) : a.push(c.jsx("h3", {
        className: "whitespace-pre-wrap",
        children: y
      }, `heading-${i}`)), i += 1;
      continue;
    }
    if (/^>\s?(.+)$/.exec(o)) {
      const f = [];
      for (; i < r.length;) {
        const y = /^>\s?(.+)$/.exec(r[i]);
        if (!y) break;
        f.push(c.jsx("div", {
          children: Ute(y[1])
        }, `quote-line-${i}`)), i += 1;
      }
      a.push(c.jsx("blockquote", {
        className: "text-node-quote",
        children: f
      }, `quote-${i}`));
      continue;
    }
    if (/^\s*[-*+•]\s+(.+)$/.exec(o)) {
      const f = [];
      for (; i < r.length;) {
        const y = /^\s*[-*+•]\s+(.+)$/.exec(r[i]);
        if (!y) break;
        f.push(c.jsx("li", {
          children: Ute(y[1])
        }, `li-${i}`)), i += 1;
      }
      a.push(c.jsx("ul", {
        children: f
      }, `ul-${i}`));
      continue;
    }
    if (/^\s*\d+[.)]\s+(.+)$/.exec(o)) {
      const f = [];
      for (; i < r.length;) {
        const y = /^\s*\d+[.)]\s+(.+)$/.exec(r[i]);
        if (!y) break;
        f.push(c.jsx("li", {
          children: Ute(y[1])
        }, `oli-${i}`)), i += 1;
      }
      a.push(c.jsx("ol", {
        children: f
      }, `ol-${i}`));
      continue;
    }
    const m = [];
    for (; i < r.length;) {
      const f = r[i];
      if (!f.trim() || /^::(?:sm|lg)::\s+/.test(f) || /^(#{1,3})\s+/.test(f) || /^>\s?/.test(f) || /^\s*[-*+•]\s+/.test(f) || /^\s*\d+[.)]\s+/.test(f) || /^---+$/.test(f.trim())) break;
      m.push(f), i += 1;
    }
    m.length > 0 ? a.push(c.jsx("p", {
      className: "whitespace-pre-wrap",
      children: Ute(m.join(`
`))
    }, `p-${i}`)) : i += 1;
  }
  return a;
}

function zgo(e, t) {
  const n = t ? {
    key: "#8fb8ff",
    str: "#c3e88d",
    num: "#f7a76c",
    text: "inherit"
  } : {
    key: "#2563eb",
    str: "#15803d",
    num: "#c2410c",
    text: "inherit"
  };
  return c.jsx("div", {
    className: "whitespace-pre-wrap break-words font-mono text-[12px] leading-[1.6]",
    children: puo(e).map((r, a) => c.jsx("span", {
      style: {
        color: n[r.kind]
      },
      children: r.value
    }, a))
  });
}

function Ugo(e, t, n = !1, r = !1, a = !1) {
  return e ? a ? zgo(e, t) : n || !r ? c.jsx("div", {
    className: "whitespace-pre-wrap",
    children: e
  }) : Jbr(e, t, !0) : null;
}

function gj(e) {
  return String(e || "").replace(/\r\n/g, `
`).replace(/\u200b/g, "").trim();
}

function Pct(e) {
  return e.split(`
`).filter(t => !/^\s*---+\s*$/.test(t)).map(t => Ogo(t)).join(`
`).replace(/\*\*\*|\*\*|\*|__|~~|`/g, "").replace(/\s+/g, " ").trim();
}

function $go(e, t) {
  const n = gj(e),
    r = gj(t);
  if (!n || !r || n === r) return n;
  const a = Pct(r);
  if (!a) return n;
  const i = o => o.replace(/^(?:\s*---+\s*)+/, "").replace(/(?:\s*---+\s*)+$/, "").trim();
  if (n.startsWith(r)) {
    const o = i(n.slice(r.length));
    if (o && o !== r && Pct(o) === a) return o;
  }
  if (n.endsWith(r)) {
    const o = i(n.slice(0, -r.length));
    if (o && o !== r && Pct(o) === a) return o;
  }
  return n;
}

function pV(e) {
  return gj(e);
}

function HL(e) {
  return e.trim() ? /\*\*\*[^*\n]+\*\*\*|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|~~[^~\n]+~~|`[^`\n]+`/.test(e) || /^#{1,3}\s/m.test(e) || /^::(?:sm|lg)::\s/m.test(e) || /^---+\s*$/m.test(e) || /^>\s?/m.test(e) || /^\s*[-*+•]\s+/m.test(e) || /^\s*\d+[.)]\s+/m.test(e) : !1;
}

const Ggo = "<p><br></p>";

function Zbr(e) {
  return e.classList.contains("text-node-rich-root") ? e : e.querySelector(":scope > .text-node-rich-root") ?? e;
}

function $$e(e) {
  if (e instanceof HTMLTextAreaElement) return e;
  const t = e.closest('[data-scrollable="true"]');
  return t instanceof HTMLElement ? t : e;
}

function Vgo(e) {
  return e.nodeType === Node.TEXT_NODE ? !(e.textContent || "").replace(/\u200b/g, "").trim() : e instanceof HTMLElement ? e.tagName === "BR" ? !0 : !(e.classList.contains("text-node-hr-wrap") || e.tagName === "HR" || (e.innerText || "").replace(/\u200b/g, "").trim() || e.querySelector("img, hr, ul, ol, table")) : !1;
}

function dwe(e) {
  const t = Zbr(e);
  for (; t.childNodes.length > 1 && t.firstChild && Vgo(t.firstChild);) t.removeChild(t.firstChild);
}

function Rct(e, t, n, r) {
  if (r) {
    e.innerHTML = Hgo(t, n, !0), dwe(e);
    return;
  }
  e.replaceChildren();
  const a = gj(t);
  a && (e.textContent = a);
}

function Hgo(e, t, n) {
  const r = gj(e);
  return r ? Cgo.renderToStaticMarkup(c.jsx(c.Fragment, {
    children: Jbr(r, t, !0)
  })) : n ? Ggo : "";
}

function lR(e) {
  const t = Zbr(e),
    n = i => {
      if (i.nodeType === Node.TEXT_NODE) return i.textContent || "";
      if (!(i instanceof HTMLElement)) return "";
      const o = Array.from(i.childNodes).map(n).join("");
      return i.tagName === "STRONG" || i.tagName === "B" ? `**${o}**` : i.tagName === "EM" || i.tagName === "I" ? `*${o}*` : i.tagName === "DEL" || i.tagName === "S" || i.tagName === "STRIKE" ? `~~${o}~~` : i.tagName === "CODE" ? `\`${o}\`` : i.tagName === "BR" ? `
` : o;
    },
    r = [];
  Array.from(t.childNodes).forEach(i => {
    if (i.nodeType === Node.TEXT_NODE) {
      const s = i.textContent || "";
      s.trim() && r.push(s);
      return;
    }
    if (!(i instanceof HTMLElement)) return;
    const o = i.tagName;
    if (o === "DIV" && i.classList.contains("text-node-hr-wrap")) {
      r.push("---");
      return;
    }
    if (o === "H1" || o === "H2" || o === "H3" || o === "P" || o === "DIV") {
      r.push(Bgo(i, n));
      return;
    }
    if (o === "BLOCKQUOTE") {
      n(i).split(`
`).filter(Boolean).forEach(s => r.push(`> ${s}`));
      return;
    }
    if (o === "UL" || o === "OL") {
      Array.from(i.children).forEach((s, l) => {
        const d = o === "OL" ? `${l + 1}. ` : "- ";
        r.push(`${d}${n(s).trim()}`);
      });
      return;
    }
    if (o === "HR") {
      r.push("---");
      return;
    }
    r.push(n(i).trimEnd());
  });
  const a = r.map(i => i.trim()).join(`
`).replace(/\n{3,}/g, `

`).trim();
  return gj(a);
}

function BJ(e, t, n) {
  const r = t.startContainer;
  if (!(r != null && r.isConnected) || n && (!n.isConnected || !n.contains(r))) return !1;
  try {
    return e.removeAllRanges(), e.addRange(t), !0;
  } catch {
    return !1;
  }
}

function Wgo(e, t) {
  if (!e.isConnected) return;
  e.focus();
  const n = window.getSelection();
  if (!n || t && BJ(n, t, e)) return;
  const r = document.createRange();
  r.selectNodeContents(e), r.collapse(!1), BJ(n, r, e);
}

function qgo(e, t, n, r) {
  if (Wgo(e, n), t === "bold") document.execCommand("bold");else if (t === "italic") document.execCommand("italic");else if (t === "heading1") document.execCommand("formatBlock", !1, "h1");else if (t === "heading2") document.execCommand("formatBlock", !1, "h2");else if (t === "heading3") document.execCommand("formatBlock", !1, "h3");else if (t === "paragraph") document.execCommand("formatBlock", !1, "p");else if (t === "bulletList") document.execCommand("insertUnorderedList");else if (t === "numberedList") document.execCommand("insertOrderedList");else if (t === "divider") {
    const a = window.getSelection();
    if (a != null && a.rangeCount) {
      const i = a.getRangeAt(0);
      e.contains(i.startContainer) && (i.collapse(!1), BJ(a, i, e));
    }
    document.execCommand("insertHTML", !1, Lgo());
  }
}

function _Pe(e, t) {
  if (!(t != null && t.anchorNode) || !e.contains(t.anchorNode)) return KSt;
  const n = t.anchorNode instanceof HTMLElement ? t.anchorNode : t.anchorNode.parentElement;
  if (!n) return KSt;
  const r = Fgo(t.anchorNode, e),
    a = r == null ? void 0 : r.tagName,
    i = a === "H1" ? "heading1" : a === "H2" ? "heading2" : a === "H3" ? "heading3" : "paragraph",
    o = s => {
      const l = n.closest(s);
      return !!(l && e.contains(l));
    };
  return {
    block: i,
    bold: o("strong, b") || document.queryCommandState("bold"),
    italic: o("em, i") || document.queryCommandState("italic"),
    bulletList: o("ul"),
    numberedList: o("ol")
  };
}

function Kgo(e, t, n, r) {
  const a = Math.max(0, Math.min(t, e.length)),
    i = Math.max(a, Math.min(n, e.length));
  if (r === "divider") {
    const y = e.slice(0, i).replace(/\s*$/, ""),
      b = e.slice(i).replace(/^\s*/, "");
    return [y, "---", b].filter(Boolean).join(`
`);
  }
  if (r === "bold" || r === "italic") {
    const y = r === "bold" ? "**" : "*",
      b = a === i && e ? 0 : a,
      v = a === i && e ? e.length : i,
      _ = e.slice(b, v);
    return _.startsWith(y) && _.endsWith(y) && _.length >= y.length * 2 ? `${e.slice(0, b)}${_.slice(y.length, -y.length)}${e.slice(v)}` : b >= y.length && e.slice(b - y.length, b) === y && e.slice(v, v + y.length) === y ? `${e.slice(0, b - y.length)}${_}${e.slice(v + y.length)}` : `${e.slice(0, b)}${y}${_}${y}${e.slice(v)}`;
  }
  const o = e.lastIndexOf(`
`, Math.max(0, a - 1)) + 1,
    s = e.indexOf(`
`, i),
    l = s === -1 ? e.length : s,
    d = e.slice(o, l).split(`
`),
    u = y => y.replace(/^\s*(?:#{1,3}\s+|[-*+]\s+|\d+[.)]\s+)/, ""),
    h = d.filter(y => y.trim()),
    p = y => r === "heading1" ? /^\s*#\s+/.test(y) : r === "heading2" ? /^\s*##\s+/.test(y) : r === "heading3" ? /^\s*###\s+/.test(y) : r === "bulletList" ? /^\s*[-*+]\s+/.test(y) : r === "numberedList" ? /^\s*\d+[.)]\s+/.test(y) : !1,
    m = r !== "paragraph" && h.length > 0 && h.every(p),
    f = d.map((y, b) => {
      if (!y.trim()) return y;
      const v = u(y);
      return r === "paragraph" || m ? v : r === "heading1" ? `# ${v}` : r === "heading2" ? `## ${v}` : r === "heading3" ? `### ${v}` : r === "bulletList" ? `- ${v}` : r === "numberedList" ? `${b + 1}. ${v}` : v;
    }).join(`
`);
  return `${e.slice(0, o)}${f}${e.slice(l)}`;
}

function Vgn(e) {
  const t = e.trim(),
    n = e.split(`
`).filter(s => s.trim()),
    r = s => n.length > 0 && n.every(l => s.test(l)),
    a = r(/^\s*#\s+/) ? "heading1" : r(/^\s*##\s+/) ? "heading2" : r(/^\s*###\s+/) ? "heading3" : "paragraph",
    i = /^\*\*[\s\S]+\*\*$/.test(t),
    o = /^\*\*\*[\s\S]+\*\*\*$/.test(t) || new RegExp("^\\*(?!\\*)[\\s\\S]+(?<!\\*)\\*$").test(t);
  return {
    block: a,
    bold: i,
    italic: o,
    bulletList: r(/^\s*[-*+]\s+/),
    numberedList: r(/^\s*\d+[.)]\s+/)
  };
}

function Qgo(e) {
  const t = window.getSelection();
  if (!(t != null && t.rangeCount)) return;
  const n = t.getRangeAt(0).getBoundingClientRect();
  if (!n.height && !n.width) return;
  const r = $$e(e),
    a = r.getBoundingClientRect(),
    i = 6;
  n.top < a.top + i ? r.scrollTop -= a.top + i - n.top : n.bottom > a.bottom - i && (r.scrollTop += n.bottom - (a.bottom - i));
}

function Hgn(e, t, n, r) {
  if (!e.isConnected) return;
  const a = $$e(e);
  r && (a.scrollTop = r.scrollTop, a.scrollLeft = r.scrollLeft), e.focus({
    preventScroll: !0
  }), dwe(e);
  const i = window.getSelection();
  if (!i) return;
  let o = null;
  const s = document;
  if (s.caretRangeFromPoint) o = s.caretRangeFromPoint(t, n);else if (s.caretPositionFromPoint) {
    const l = s.caretPositionFromPoint(t, n);
    l && (o = document.createRange(), o.setStart(l.offsetNode, l.offset), o.collapse(!0));
  }
  if (!o || !e.contains(o.startContainer) || o.startContainer === e) {
    o = document.createRange();
    const l = e.querySelector("p, h1, h2, h3, li, blockquote, div") ?? e.firstChild,
      d = a.getBoundingClientRect(),
      u = n <= d.top + 28;
    if (l && u) {
      if (l.nodeType === Node.TEXT_NODE) o.setStart(l, 0);else {
        const p = document.createTreeWalker(l, NodeFilter.SHOW_TEXT).nextNode();
        p ? o.setStart(p, 0) : o.setStart(l, 0);
      }
      o.collapse(!0);
    } else o.selectNodeContents(e), o.collapse(!1);
  }
  BJ(i, o, e), Qgo(e);
}

function Ygo(e) {
  if (!e.isConnected) return !1;
  try {
    e.focus({
      preventScroll: !0
    });
  } catch {
    e.focus();
  }
  const t = window.getSelection();
  if (!t) return !1;
  if (t.rangeCount > 0 && e.contains(t.anchorNode)) return !0;
  const n = document.createRange();
  return n.selectNodeContents(e), n.collapse(!1), BJ(t, n, e);
}

function Wgn(e) {
  const t = window.getSelection();
  if (!t || t.rangeCount === 0) return 0;
  const n = t.getRangeAt(0);
  if (!e.contains(n.startContainer)) return 0;
  const r = n.cloneRange();
  return r.selectNodeContents(e), r.setEnd(n.startContainer, n.startOffset), r.toString().length;
}

function qgn(e, t) {
  var l;
  if (!e.isConnected) return;
  e.focus();
  const n = window.getSelection();
  if (!n) return;
  const r = Math.max(0, t),
    a = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  let i = r,
    o;
  for (; o = a.nextNode();) {
    const d = ((l = o.textContent) == null ? void 0 : l.length) ?? 0;
    if (i <= d) {
      const u = document.createRange();
      u.setStart(o, i), u.collapse(!0), BJ(n, u, e);
      return;
    }
    i -= d;
  }
  const s = document.createRange();
  s.selectNodeContents(e), s.collapse(!1), BJ(n, s, e);
}

const KSt = {
    block: "paragraph",
    bold: !1,
    italic: !1,
    bulletList: !1,
    numberedList: !1
  },
  Xgo = [{
    label: "默认",
    value: "",
    swatch: ""
  }, {
    label: "深红",
    value: "#372626",
    swatch: "#964243"
  }, {
    label: "棕色",
    value: "#33281D",
    swatch: "#834915"
  }, {
    label: "橄榄",
    value: "#363323",
    swatch: "#8F8030"
  }, {
    label: "绿色",
    value: "#253027",
    swatch: "#3D7344"
  }, {
    label: "青色",
    value: "#233033",
    swatch: "#337282"
  }, {
    label: "蓝色",
    value: "#222933",
    swatch: "#2B5284"
  }, {
    label: "紫色",
    value: "#312434",
    swatch: "#763886"
  }],
  Jgo = ({
    level: e
  }) => {
    on();
    const t = e === 1 ? "M19 18v-8l-2 2" : e === 2 ? "M17 12a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0" : "M19 14a2 2 0 1 0 -2 -2M17 16a2 2 0 1 0 2 -2";
    return c.jsxs("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [c.jsx("path", {
        d: t
      }), c.jsx("path", {
        d: "M4 6v12M12 6v12M11 18h2M3 18h2M4 12h8M3 6h2M11 6h2"
      })]
    });
  },
  Kgn = ({
    isDark: e,
    isFullscreen: t,
    isEditing: n,
    autoHeight: r,
    onToggleAutoHeight: a,
    backgroundColor: i,
    activeState: o,
    onAction: s,
    onBackgroundColorChange: l,
    onBackgroundColorButtonClick: d,
    onCopy: u,
    onToggleFullscreen: h,
    nodeId: p,
    colorPins: m
  }) => {
    on();
    const [f, y] = g.useState(!1),
      b = "text-node-rich-toolbar-btn h-10 w-10 p-2 inline-flex items-center justify-center text-xs",
      v = k => `${b}${k ? " text-node-rich-toolbar-btn--active" : ""}`,
      _ = fpe(e),
      w = "flex items-center gap-[2px]";
    return c.jsxs("div", {
      "data-canvas-pin-toolbar": "",
      "data-canvas-float-toolbar": "",
      className: `text-node-rich-toolbar input-node-fast-tooltip pointer-events-auto relative flex h-12 items-center gap-1 p-1 !overflow-visible ${fJ(e)} ${e ? "text-node-rich-toolbar--dark input-node-fast-tooltip--dark" : "text-node-rich-toolbar--light input-node-fast-tooltip--light"}`,
      onMouseDown: k => {
        k.preventDefault(), k.stopPropagation();
      },
      children: [c.jsxs("div", {
        className: `${w} relative`,
        children: [c.jsx("button", {
          type: "button",
          className: b,
          title: x("背景颜色"),
          onMouseDown: k => {
            k.preventDefault(), k.stopPropagation(), d == null || d(), y(A => !A);
          },
          children: c.jsx("span", {
            className: `h-5 w-5 rounded-full border ${e ? "border-white/30" : "border-zinc-300"}`,
            style: {
              backgroundColor: i || (e ? "#ffffff" : "#f4f4f5")
            }
          })
        }), f ? c.jsx("div", {
          className: "text-node-color-palette absolute left-1/2 top-full z-[10000] mt-2 -translate-x-1/2",
          onMouseDown: k => {
            k.preventDefault(), k.stopPropagation();
          },
          children: Xgo.map(k => c.jsx("button", {
            type: "button",
            title: x(k.label),
            className: `relative h-6 w-6 rounded-full border border-white/20 transition-transform hover:scale-110 ${i === k.value ? "ring-2 ring-white/70" : ""}`,
            style: {
              backgroundColor: k.swatch || (e ? "#f4f4f5" : "#ffffff")
            },
            onMouseDown: A => {
              A.preventDefault(), A.stopPropagation(), l(k.value), y(!1);
            },
            children: k.value ? null : c.jsx("span", {
              className: `pointer-events-none absolute inset-0 m-auto h-[1.5px] w-4 rotate-45 ${e ? "bg-white/50" : "bg-black/40"}`
            })
          }, k.label))
        }) : null]
      }), t || n ? c.jsxs(c.Fragment, {
        children: [c.jsx("span", {
          "data-toolbar-divider": "",
          className: _
        }), c.jsxs("div", {
          className: w,
          children: [["heading1", "heading2", "heading3"].map((k, A) => c.jsx("button", {
            type: "button",
            className: v(o.block === k),
            title: x("标题 {0}", A + 1),
            onMouseDown: S => {
              S.preventDefault(), S.stopPropagation(), s(k);
            },
            children: c.jsx(Jgo, {
              level: A + 1
            })
          }, k)), c.jsx("button", {
            type: "button",
            className: v(o.block === "paragraph"),
            title: x("正文"),
            onMouseDown: k => {
              k.preventDefault(), k.stopPropagation(), s("paragraph");
            },
            children: c.jsx(vNr, {
              size: 18
            })
          })]
        }), c.jsx("span", {
          "data-toolbar-divider": "",
          className: _
        }), c.jsxs("div", {
          className: w,
          children: [c.jsx("button", {
            type: "button",
            className: v(o.bold),
            title: x("粗体"),
            onMouseDown: k => {
              k.preventDefault(), k.stopPropagation(), s("bold");
            },
            children: c.jsx(ARr, {
              size: 18
            })
          }), c.jsx("button", {
            type: "button",
            className: v(o.italic),
            title: x("斜体"),
            onMouseDown: k => {
              k.preventDefault(), k.stopPropagation(), s("italic");
            },
            children: c.jsx(nNr, {
              size: 18
            })
          }), c.jsx("button", {
            type: "button",
            className: v(o.bulletList),
            title: x("无序列表"),
            onMouseDown: k => {
              k.preventDefault(), k.stopPropagation(), s("bulletList");
            },
            children: c.jsx(X$, {
              size: 18
            })
          }), c.jsx("button", {
            type: "button",
            className: v(o.numberedList),
            title: x("有序列表"),
            onMouseDown: k => {
              k.preventDefault(), k.stopPropagation(), s("numberedList");
            },
            children: c.jsx(gEt, {
              size: 18
            })
          }), c.jsx("button", {
            type: "button",
            className: b,
            title: x("分割线"),
            onMouseDown: k => {
              k.preventDefault(), k.stopPropagation(), s("divider");
            },
            children: c.jsx(AS, {
              size: 18
            })
          })]
        })]
      }) : null, c.jsx("span", {
        "data-toolbar-divider": "",
        className: _
      }), c.jsxs("div", {
        className: w,
        children: [p ? c.jsx($D, {
          nodeIds: [p],
          pins: m,
          isDark: e,
          size: "compact",
          className: "text-node-rich-toolbar-btn h-10 w-10 inline-flex items-center justify-center"
        }) : null, c.jsx("button", {
          type: "button",
          className: b,
          title: x("复制全部"),
          onClick: u,
          children: c.jsx(Cx, {
            size: 18
          })
        }), !t && a ? c.jsx("button", {
          type: "button",
          className: v(!!r),
          title: x("自适应高度"),
          "aria-label": x("自适应高度"),
          "aria-pressed": !!r,
          onClick: a,
          children: c.jsx(PRr, {
            size: 18
          })
        }) : null, c.jsx("button", {
          type: "button",
          className: b,
          title: x(t ? "退出全屏" : "全屏"),
          onMouseDown: k => {
            k.preventDefault(), k.stopPropagation(), h();
          },
          children: t ? c.jsx(AT, {
            size: 18
          }) : c.jsx(Wm, {
            size: 18
          })
        })]
      })]
    });
  };

function Zgo() {
  let e = {
    text: "",
    reply: null,
    status: ""
  };
  const t = new Set(),
    n = r => {
      if (!(r.text === e.text && r.reply === e.reply && r.status === e.status)) {
        e = r;
        for (const a of t) a();
      }
    };
  return {
    getSnapshot: () => e,
    subscribe(r) {
      return t.add(r), () => {
        t.delete(r);
      };
    },
    setText(r) {
      n({
        ...e,
        text: r,
        status: r.trim() ? "" : e.status
      });
    },
    setStatus(r) {
      n({
        ...e,
        status: r
      });
    },
    setReply(r) {
      n({
        ...e,
        reply: r
      });
    }
  };
}

function e0o(e) {
  const t = String(e.streamTextOverride ?? e.liveText ?? ""),
    n = String(e.statusMessage ?? "").trim(),
    r = !n || n === "正在生成…";
  return e.isAnalyzing ? t ? {
    text: t,
    status: "",
    showSkeleton: !1
  } : {
    text: "",
    status: r ? "" : n,
    showSkeleton: !0
  } : e.committedText ? {
    text: e.committedText,
    status: "",
    showSkeleton: !1
  } : t ? {
    text: t,
    status: "",
    showSkeleton: !1
  } : {
    text: "",
    status: n,
    showSkeleton: !1
  };
}

function Qgn({
  message: e,
  isDark: t,
  isError: n
}) {
  on();
  const r = n ? t ? "text-amber-200" : "text-amber-800" : t ? "text-white/70" : "text-gray-500";
  return c.jsx("div", {
    className: `px-1 py-1 text-[12px] leading-relaxed ${r}`,
    children: e
  });
}

const t0o = g.memo(function (t) {
  on();
  const {
      stream: n,
      isAnalyzing: r,
      streamTextOverride: a,
      isDark: i,
      imageInfoJson: o,
      markdown: s
    } = t,
    l = g.useSyncExternalStore(n.subscribe, n.getSnapshot, n.getSnapshot),
    {
      text: d,
      status: u,
      showSkeleton: h
    } = e0o({
      isAnalyzing: r,
      liveText: l.text,
      committedText: t.text,
      streamTextOverride: a,
      statusMessage: l.status
    }),
    p = g.useMemo(() => d ? Ugo(d, i, r, s, o) : null, [d, i, r, s, o]);
  return c.jsx("div", {
    ref: t.previewRef,
    "data-scrollable": "true",
    className: `text-node-rich-root canvas-text-markdown absolute inset-0 min-h-0 w-full overflow-y-auto overflow-x-hidden ${t.fontClass}`,
    children: c.jsx("div", {
      "data-text-node-content": !0,
      className: "flow-root",
      children: d ? p : h ? c.jsxs(c.Fragment, {
        children: [u ? c.jsx(Qgn, {
          message: u,
          isDark: i,
          isError: !1
        }) : null, c.jsx(Rgo, {
          isDark: i
        })]
      }) : u ? c.jsx(Qgn, {
        message: u,
        isDark: i,
        isError: !0
      }) : c.jsx("div", {
        className: "text-node-placeholder",
        children: t.placeholder
      })
    })
  });
});

function n0o({
  stream: e,
  savedReply: t
}) {
  on();
  const r = g.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getSnapshot).reply || t;
  return !(r != null && r.codexUsage) && !(r != null && r.agentReasoning) ? null : c.jsxs("div", {
    className: "px-3 py-1 space-y-1 text-[10px] text-zinc-400",
    children: [r.codexUsage && c.jsxs("div", {
      children: [x("输入 "), r.codexUsage.inputTokens.toLocaleString(), x(" · 缓存命中 "), r.codexUsage.cachedInputTokens.toLocaleString(), x(" · 输出 "), r.codexUsage.outputTokens.toLocaleString()]
    }), r.agentReasoning && c.jsxs("details", {
      children: [c.jsx("summary", {
        className: "cursor-pointer",
        children: x("思考摘要")
      }), c.jsx("div", {
        className: "max-h-32 overflow-auto whitespace-pre-wrap",
        children: r.agentReasoning
      })]
    })]
  });
}

const kPe = [{
    id: "openai",
    label: "OpenAI兼容",
    shortLabel: "兼容"
  }, {
    id: "gemini-official",
    label: "Gemini官方",
    shortLabel: "官方"
  }],
  r0o = {
    "w-44": 176,
    "w-48": 192
  };

function a0o(e, t) {
  for (const [n, r] of Object.entries(r0o)) if (e.includes(n)) return Math.max(t, r);
  return Math.max(t, 192);
}

function _$({
  nodeId: e,
  dropdownType: t,
  value: n,
  isDark: r,
  activeDropdown: a,
  setActiveDropdown: i,
  onSelect: o,
  buttonClassName: s = "",
  menuClassName: l = "w-44",
  menuPlacement: d = "above",
  menuZIndex: u = 9999,
  buttonVariant: h = "default",
  truncateHeadLen: p
}) {
  on();
  const m = (a == null ? void 0 : a.nodeId) === e && a.type === t,
    f = kPe.find(I => I.id === n) ?? kPe[0],
    y = h === "bare" ? f.shortLabel : f.label,
    b = p && h !== "bare" ? W7(y, p) : y,
    v = g.useRef(null),
    _ = g.useRef(null),
    w = g.useRef("above"),
    k = g.useRef(176),
    A = g.useCallback(() => {
      const I = v.current;
      if (!I || typeof window > "u") return;
      const E = I.getBoundingClientRect(),
        M = 4,
        T = 8,
        P = kPe.length * 34 + 16,
        R = window.innerHeight - E.bottom - M - T,
        j = E.top - M - T;
      d === "below" ? w.current = "below" : d === "above" ? w.current = "above" : w.current = R >= P || R >= j ? "below" : "above", k.current = a0o(l, E.width);
    }, [l, d]),
    S = g.useCallback(() => {
      const I = v.current,
        E = _.current;
      if (!I || !E || typeof window > "u") return;
      const M = I.getBoundingClientRect(),
        T = 4,
        P = 8,
        R = w.current === "below";
      E.style.position = "fixed", E.style.left = `${M.left}px`, E.style.minWidth = `${k.current}px`, E.style.maxWidth = "calc(100vw - 16px)", E.style.zIndex = String(u), E.style.visibility = "visible", R ? (E.style.top = `${M.bottom + T}px`, E.style.bottom = "", E.style.maxHeight = `${Math.max(window.innerHeight - M.bottom - T - P, 120)}px`) : (E.style.top = "", E.style.bottom = `${window.innerHeight - M.top + T}px`, E.style.maxHeight = `${Math.max(M.top - T - P, 120)}px`);
    }, [u]);
  g.useLayoutEffect(() => {
    if (!m) return;
    A(), S(), P3(_.current);
    let I = 0;
    const E = () => {
      S(), I = requestAnimationFrame(E);
    };
    return I = requestAnimationFrame(E), () => cancelAnimationFrame(I);
  }, [m, A, S, n]);
  const C = m ? c.jsx("div", {
    ref: _,
    className: `node-dropdown-menu rounded-xl shadow-xl p-1.5 border overflow-y-auto scrollbar-hide ${r ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
    style: {
      position: "fixed",
      visibility: "hidden",
      zIndex: u
    },
    onMouseDown: I => I.stopPropagation(),
    onWheel: I => I.stopPropagation(),
    children: kPe.map(I => c.jsx("button", {
      type: "button",
      ...(n === I.id ? {
        [Md]: "true"
      } : {}),
      onClick: E => {
        E.stopPropagation(), o(I.id), i(null);
      },
      className: `w-full flex items-center px-2 py-1.5 rounded-lg text-left text-xs transition-colors ${r ? "hover:bg-zinc-800/90 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${n === I.id ? r ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-900" : ""}`,
      children: c.jsx("span", {
        className: "font-medium whitespace-nowrap",
        children: x(I.label)
      })
    }, I.id))
  }) : null;
  return c.jsxs("div", {
    className: "relative overflow-visible shrink-0",
    "data-model-select-area": !0,
    children: [c.jsxs("button", {
      ref: v,
      type: "button",
      title: x("Gemini 请求格式：OpenAI 兼容（/v1/chat/completions）或官方（/v1beta/models/...:generateContent）"),
      onClick: I => {
        I.preventDefault(), I.stopPropagation(), i(m ? null : {
          nodeId: e,
          type: t
        });
      },
      onMouseDown: I => {
        I.preventDefault(), I.stopPropagation();
      },
      className: `node-dropdown-button flex items-center gap-1 rounded text-xs transition-colors outline-none cursor-pointer ${h === "bare" ? `border-0 bg-transparent px-1 py-1 ${r ? "text-white/75 hover:text-white" : "text-zinc-700 hover:text-zinc-900"}` : `px-2 py-1 border ${r ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`} ${s}`,
      children: [c.jsx("span", {
        className: `truncate ${h === "bare" ? "max-w-[40px]" : p ? "" : "max-w-[100px]"}`,
        children: x(b)
      }), c.jsx(Mi, {
        size: 10,
        className: `shrink-0 opacity-70 transition-transform ${m ? "rotate-180" : ""}`
      })]
    }), C && typeof document < "u" ? Da.createPortal(C, document.body) : null]
  });
}

function i0o(e) {
  return new Promise((t, n) => {
    const r = String(e || "").trim();
    if (!r) {
      n(new Error("视频 URL 为空"));
      return;
    }
    const a = document.createElement("video");
    rIt(a);
    let i = !1,
      o = 0;
    const s = () => {
        window.clearTimeout(o), a.onloadedmetadata = null, a.onseeked = null, a.onerror = null;
        try {
          a.removeAttribute("src"), a.load(), a.remove();
        } catch {}
      },
      l = (u, h) => {
        i || (i = !0, s(), u ? t(u) : n(h || new Error("视频帧生成失败")));
      },
      d = () => {
        try {
          const u = a.videoWidth || 160,
            h = a.videoHeight || 90,
            m = Math.min(1, 256 / Math.max(u, h)),
            f = document.createElement("canvas");
          f.width = Math.max(1, Math.round(u * m)), f.height = Math.max(1, Math.round(h * m));
          const y = f.getContext("2d");
          if (!y) throw new Error("canvas context unavailable");
          y.drawImage(a, 0, 0, f.width, f.height), l(f.toDataURL("image/webp", .78));
        } catch (u) {
          l(void 0, u instanceof Error ? u : new Error("视频帧生成失败"));
        }
      };
    o = window.setTimeout(() => l(void 0, new Error("视频帧加载超时")), 8e3), a.crossOrigin = "anonymous", a.muted = !0, a.playsInline = !0, a.preload = "metadata", a.onloadedmetadata = () => {
      try {
        const u = Math.min(.1, Math.max(0, (a.duration || .1) * .05));
        a.currentTime = u;
      } catch {
        d();
      }
    }, a.onseeked = () => d(), a.onerror = () => l(void 0, new Error("视频加载失败")), a.src = r;
  });
}

function evr({
  nodeId: e,
  connectedImages: t,
  connectedImageItems: n,
  connections: r,
  nodes: a
}) {
  const i = g.useCallback((I, E) => {
      var T;
      const M = String(E || "").trim();
      return (T = n.find(P => String(P.url || "").trim() === M)) == null ? void 0 : T.assetId;
    }, [n]),
    [o, s] = g.useState(() => new Map()),
    [l, d] = g.useState(() => new Set()),
    u = g.useRef(new Map());
  g.useEffect(() => {
    u.current = o;
  }, [o]), g.useEffect(() => {
    let I = !1;
    const E = new Set(t),
      M = R => {
        R.length !== 0 && d(j => {
          const B = new Set(j);
          return R.forEach(F => B.delete(F)), B;
        });
      },
      T = () => {
        s(R => {
          const j = new Map();
          for (const [B, F] of R) E.has(B) && j.set(B, F);
          return j;
        }), d(R => {
          const j = new Set();
          for (const B of R) E.has(B) && j.add(B);
          return j;
        });
      };
    return (async () => {
      const R = [];
      if (t.forEach((B, F) => {
        if (vP(B)) return;
        const N = yy(B, i(F, B));
        SE(B, N) && (!N && !Er.isContentRef(B) || u.current.has(B) || R.push({
          rawUrl: B,
          assetId: N || ""
        }));
      }), I || (T(), R.length > 0 && d(B => {
        const F = new Set(B);
        for (const N of R) F.add(N.rawUrl);
        return F;
      })), R.length === 0) return;
      const j = 4;
      for (let B = 0; B < R.length && !I; B += j) {
        const F = R.slice(B, B + j);
        await Promise.all(F.map(async ({
          rawUrl: N,
          assetId: G
        }) => {
          if (!I) try {
            const z = await dHe(N, G || void 0);
            if (I || !z) return;
            s(V => {
              const O = new Map(V);
              return O.set(N, z), O;
            });
          } catch {} finally {
            I || M([N]);
          }
        }));
      }
    })(), () => {
      I = !0;
    };
  }, [t, i]);
  const [h, p] = g.useState(() => new Map()),
    m = g.useRef(new Map()),
    f = g.useRef(new Set()),
    y = g.useRef(new Set());
  g.useEffect(() => {
    m.current = h;
  }, [h]), g.useEffect(() => {
    let I = !1;
    const E = new Set(t);
    return p(T => OUt(T, E, y.current)), (async () => {
      const T = [];
      for (let P = 0; P < t.length; P++) {
        const R = t[P];
        if (!/^https?:\/\//i.test(R)) continue;
        const j = yy(R, i(P, R));
        if (!SE(R, j)) {
          if (I) return;
          if (!m.current.has(R) && !f.current.has(R)) {
            f.current.add(R);
            try {
              await ni.init();
              const B = await ni.getAssetBlobByRemoteUrl(R);
              if (!B) continue;
              const F = URL.createObjectURL(B);
              if (y.current.add(F), I || !E.has(R)) {
                fj(F, y.current);
                continue;
              }
              T.push([R, F]);
            } catch {} finally {
              f.current.delete(R);
            }
          }
        }
      }
      if (I) {
        for (const [, P] of T) fj(P, y.current);
        return;
      }
      T.length !== 0 && p(P => {
        const R = new Map(P);
        return T.forEach(([j, B]) => {
          E.has(j) ? R.set(j, B) : fj(B, y.current);
        }), R;
      });
    })(), () => {
      I = !0;
    };
  }, [t, i]), g.useEffect(() => () => {
    y.current.forEach(I => {
      try {
        URL.revokeObjectURL(I);
      } catch {}
    }), y.current.clear(), f.current.clear();
  }, []);
  const b = g.useMemo(() => {
      const I = kY(r || [], a || [], e);
      return t.map((E, M) => {
        const T = pU(E, {
            scopeNodeId: e,
            connections: r || [],
            nodes: a || [],
            imageSourceMap: I
          }),
          P = T ? a == null ? void 0 : a.find(L => L.id === T) : void 0,
          R = yy(E, i(M, E) || P && a5e(P) || void 0),
          j = SE(E, R),
          B = o.get(E),
          F = wk(E, P),
          N = vP(E),
          G = j && !N && !B && !F && l.has(E),
          z = pHe({
            syncDisplay: F,
            localPreferredUrl: B,
            resolvedThumbUrl: h.get(E),
            rawUrl: E,
            preferLocalRef: j
          }),
          V = mHe(E, M, n),
          O = V ?? mU(E, V, P);
        return {
          imgSrc: E,
          refAssetId: R,
          referenceThumbSrc: z,
          isResolvingLocalRef: G,
          mediaType: O,
          sourceNode: P
        };
      });
    }, [t, i, o, l, h, e, r, a, n]),
    [v, _] = g.useState({}),
    w = g.useRef(new Set()),
    k = g.useRef(new Set()),
    A = g.useRef(new Set());
  g.useEffect(() => {
    const I = new Set();
    for (const E of b) E.referenceThumbSrc && I.add(E.referenceThumbSrc), E.imgSrc && I.add(E.imgSrc);
    A.current = I, _(E => BUt(E, I)), oue(k.current, I), oue(w.current, I);
    for (const E of b) {
      const M = E.referenceThumbSrc;
      if (!M || E.isResolvingLocalRef || E.mediaType === "audio" || k.current.has(M) || w.current.has(M)) continue;
      if (E.mediaType === "video") {
        const R = fU(E.imgSrc, M, E.sourceNode) || (E.sourceNode && dx(xf(E.sourceNode), "video") ? xf(E.sourceNode) : "");
        if (R) {
          k.current.add(M), _(F => F[M] && F[E.imgSrc] ? F : {
            ...F,
            [M]: F[M] || R,
            [E.imgSrc]: F[E.imgSrc] || R
          });
          continue;
        }
        const j = iZ(E.imgSrc, M, E.sourceNode);
        if (!j) continue;
        w.current.add(M);
        const B = M;
        i0o(j).then(F => {
          w.current.delete(B), A.current.has(B) && (k.current.add(B), _(N => {
            const G = A.current.has(E.imgSrc);
            return !A.current.has(B) || N[B] && (!G || N[E.imgSrc]) ? N : {
              ...N,
              [B]: N[B] || F,
              ...(G ? {
                [E.imgSrc]: N[E.imgSrc] || F
              } : {})
            };
          }));
        }).catch(() => {
          w.current.delete(B);
        });
        continue;
      }
      if (!(M.startsWith("blob:") || M.startsWith("data:image") && M.length > 1e5)) continue;
      w.current.add(M);
      const P = M;
      Ix(P, 256).then(({
        url: R
      }) => {
        w.current.delete(P), A.current.has(P) && (k.current.add(P), _(j => !A.current.has(P) || j[P] ? j : {
          ...j,
          [P]: R
        }));
      }).catch(() => {
        w.current.delete(P);
      });
    }
    return () => {
      A.current = new Set();
    };
  }, [b]);
  const S = g.useMemo(() => b.map(I => ({
      ...I,
      seedanceMaterial: void 0
    })), [b]),
    C = g.useMemo(() => S.map((I, E) => {
      var B, F;
      const M = E + 1,
        T = I.referenceThumbSrc || I.imgSrc;
      let P;
      if (I.mediaType === "audio") P = void 0;else if (I.mediaType === "video") P = T && v[T] || v[I.imgSrc] || fU(I.imgSrc, T, I.sourceNode) || (I.sourceNode && dx(xf(I.sourceNode), "video") ? xf(I.sourceNode) : void 0) || void 0;else {
        const N = T && v[T] || I.referenceThumbSrc || I.imgSrc || void 0;
        P = N && dx(N, I.mediaType) ? N : void 0;
      }
      const R = (F = (B = I.sourceNode) == null ? void 0 : B.nodeName) == null ? void 0 : F.trim(),
        j = I.mediaType === "video" ? "视频" : I.mediaType === "audio" ? "音频" : "参考图";
      return {
        position1Based: M,
        mediaType: I.mediaType,
        nodeName: R || j,
        thumbSrc: P
      };
    }), [S, v]);
  return {
    activeReferenceStripRows: S,
    genReferenceStripThumbs: v,
    promptReferenceItems: C
  };
}

function tvr(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  if (!/你是短视频广告分镜编剧|【任务】请将下方/.test(t)) {
    const a = t.match(/(【\s*一[、.]\s*风格与整体氛围\s*】[\s\S]*)/i);
    return a ? a[1].trim() : t;
  }
  const n = [...t.matchAll(/【\s*一[、.]\s*风格与整体氛围\s*】/gi)];
  if (n.length >= 2) return t.slice(n[n.length - 1].index).trim();
  const r = t.split(/【\s*原始剧情\s*】/i);
  if (r.length > 1) {
    const a = r[r.length - 1],
      i = a.search(/【\s*一[、.]\s*风格与整体氛围\s*】/i);
    if (i >= 0) return a.slice(i).trim();
  }
  return "";
}

function o0o(e) {
  const t = String(e || "").trim();
  if (!/你是短视频广告分镜编剧|【任务】请将下方/.test(t)) return !1;
  const n = tvr(t);
  return n && (/【\s*四[、.]\s*分镜头描述\s*】/i.test(n) || /【\s*四[、.]\s*\d+\s*s分镜头描述\s*】/i.test(n)) && n.length > 400 ? !1 : /【\s*原始剧情\s*】/.test(t) || /【\s*输出结构/.test(t);
}

function s0o(e) {
  const t = String(e || "").trim();
  if (!t || o0o(t)) return !1;
  const n = tvr(t) || t;
  if (!/【\s*一[、.]\s*风格与整体氛围\s*】/i.test(n) || !/【\s*四[、.]\s*分镜头描述\s*】/i.test(n) && !/【\s*四[、.]\s*\d+\s*s分镜头描述\s*】/i.test(n)) return !1;
  const r = n.match(/【\s*一[、.]\s*风格与整体氛围\s*】\s*([\s\S]*?)【\s*二[、.]\s*场景设定\s*】/i);
  return !r || r[1].trim().length < 40 ? !1 : n.length > 400;
}

function APe(e) {
  if (!e || e.aiGenerated !== !0) return !1;
  const t = String(e.text || "").trim();
  return s0o(t);
}

const oae = new Map(),
  l0o = 256;

function c0o(e, t) {
  for (oae.set(e, t); oae.size > l0o;) {
    const n = oae.keys().next().value;
    if (!n) break;
    oae.delete(n);
  }
}

const d0o = 500,
  Ygn = 18,
  u0o = 48,
  Xgn = 18;

function h0o({
  isDark: e,
  prompt: t,
  showPreview: n,
  onTogglePreview: r
}) {
  on();
  const [a, i] = g.useState(!1),
    o = e ? "text-[rgba(245,245,245,0.75)]" : "text-sky-700";
  return c.jsx("div", {
    className: "relative h-9 w-9 shrink-0",
    title: t || x("转成 JSON 模板"),
    children: a ? c.jsx("button", {
      type: "button",
      className: `relative flex h-9 w-9 items-center justify-center overflow-hidden rounded border transition-colors ${n ? e ? "border-zinc-500 bg-[#1f1f1f] text-zinc-200" : "border-zinc-400 bg-zinc-100 text-zinc-800" : e ? "border-zinc-700 bg-[#1f1f1f]/40 text-zinc-300 hover:border-zinc-600 hover:text-white" : "border-zinc-300 bg-zinc-50 text-zinc-600 hover:border-zinc-400 hover:text-zinc-800"}`,
      title: x(n ? "隐藏 JSON 模板" : "查看 JSON 模板"),
      onPointerDown: s => {
        s.stopPropagation(), s.preventDefault();
      },
      onClick: s => {
        s.stopPropagation(), r(), n && i(!1);
      },
      children: n ? c.jsx($d, {
        size: 16,
        strokeWidth: 1.75
      }) : c.jsx(ul, {
        size: 16,
        strokeWidth: 1.75
      })
    }) : c.jsx("button", {
      type: "button",
      className: `relative flex h-9 w-9 items-center justify-center overflow-hidden rounded border transition-colors ${e ? "border-zinc-700 bg-[#1f1f1f]/40 text-[rgba(245,245,245,0.75)] hover:border-zinc-600 hover:bg-zinc-800/60" : "border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300 hover:bg-sky-100"}`,
      title: x("转成 JSON（点击显示眼睛预览）"),
      onPointerDown: s => {
        s.stopPropagation(), s.preventDefault();
      },
      onClick: s => {
        s.stopPropagation(), i(!0);
      },
      children: c.jsx(aEt, {
        size: 16,
        strokeWidth: 1.75,
        className: o
      })
    })
  });
}

function Jgn(e) {
  sae();
  const t = t_(e);
  if (!(t != null && t.isConnected)) return;
  t.focus({
    preventScroll: !0
  });
  const n = document.createRange();
  if (n.selectNodeContents(t), n.collapse(!1), !n.startContainer.isConnected) return;
  const r = window.getSelection();
  if (r) try {
    r.removeAllRanges(), r.addRange(n);
  } catch {}
}

function Zgn(e) {
  return e instanceof HTMLElement ? !!e.closest(".text-node-rich-toolbar, [data-text-node-external-composer], [data-gen-prompt-panel], [data-gen-prompt-panel-host]") : !1;
}

function e0n(e) {
  sae(), e.focus({
    preventScroll: !0
  });
  const t = e.value.length;
  try {
    e.setSelectionRange(t, t);
  } catch {}
}

function sae() {
  typeof window > "u" || (window.scrollTo(0, 0), document.documentElement.scrollTop = 0, document.body.scrollTop = 0);
}

function t0n(e) {
  if (!e) return null;
  const t = e.getBoundingClientRect();
  return t.width < 2 || t.height < 2 ? null : {
    left: t.left,
    top: t.top,
    width: t.width,
    height: t.height
  };
}

function mV() {
  const t = Math.min(1024, Math.max(window.innerWidth - 64, 1)),
    n = Math.min(900, Math.max(window.innerHeight - 64, 1));
  return {
    left: (window.innerWidth - t) / 2,
    top: (window.innerHeight - n) / 2,
    width: t,
    height: n
  };
}

function p0o(e = Q6 + 40) {
  var n;
  if (typeof document > "u") return;
  (n = document.querySelector("[data-text-node-fullscreen-shield]")) == null || n.remove();
  const t = document.createElement("div");
  t.setAttribute("data-text-node-fullscreen-shield", "true"), t.style.cssText = "position:fixed;inset:0;z-index:10001;pointer-events:auto;", document.body.appendChild(t), window.setTimeout(() => t.remove(), e);
}

function H8(e) {
  return B$(e) ?? (typeof e == "string" ? e : "");
}

function Nct(e) {
  var n;
  const t = new Set();
  if (Ry(e).forEach(r => {
    const a = H8(r);
    a && !Tu(a) && t.add(a), r && !Tu(r) && t.add(r);
  }), e.type === "input-image") {
    const r = typeof e.content == "string" ? e.content.trim() : "";
    r && !Tu(r) && (t.add(r), t.add(H8(r)));
    const a = (n = e.settings) == null ? void 0 : n.imageUrl;
    typeof a == "string" && a.trim() && !Tu(a.trim()) && (t.add(a.trim()), t.add(H8(a.trim())));
    const i = r9(e);
    i && t.add(i);
  } else if (e.type === "gen-image" || e.type === "gen-video") {
    const r = Xl(e);
    r != null && r.assetId && t.add(r.assetId);
  }
  return t;
}

const SPe = e => {
    const t = tg(e);
    let n = t;
    const r = [/^Here is the prompt:?\s*/i, /^好的[，,]?这是提示词[：:]\s*/i, /^以下是提示词[：:]\s*/i, /^Prompt[：:]\s*/i, /^提示词[：:]\s*/i, /^根据.*?[，,]?生成.*?[：:]\s*/i, /^我.*?整理.*?[：:]\s*/i];
    for (const o of r) n = n.replace(o, "");
    const a = [/\n*希望.*?满意.*$/i, /\n*如果.*?需要.*?修改.*$/i, /\n*以上.*?供参考.*$/i];
    for (const o of a) n = n.replace(o, "");
    const i = n.match(/^```(?:markdown|md|text)?\s*\n([\s\S]*?)\n```\s*$/i);
    return i && (n = i[1]), n = n.replace(/\n{3,}/g, `

`), n = n.trim(), n = pie(n), !n && t.trim() ? pie(t.trim()) : n;
  },
  nvr = "gemini-3.1-pro",
  m0o = {
    "gemini-3-pro": nvr,
    "gpt-5.4-pro": "gpt-5.4",
    "gpt-5-4-pro": "gpt-5.4",
    "gpt-5.5-pro": "gpt-5.5",
    "claude-opus-4-8-thinking": "claude-opus-4-8",
    "claude-opus-5-5-thinking": "claude-opus-5-5",
    "claude-sonnet-5-5-thinking": "claude-sonnet-5-5"
  };

function QSt(e) {
  const t = String(e || "").trim();
  return t ? If(m0o[t] || t).id : nvr;
}

function jct(e, t) {
  const n = QSt(e);
  return t.some(r => r.id === n), n;
}

const f0o = ({
    node: e,
    isDark: t,
    value: n,
    submitDisabled: r,
    modelsEmpty: a,
    isAnalyzing: i,
    hasMediaConnection: o,
    selectedModel: s,
    platformGroup: l = "",
    chatModels: d,
    activeDropdown: u,
    setActiveDropdown: h,
    webSearchEnabled: p,
    supportsWebSearch: m,
    useOssForApi: f,
    showOssToggle: y,
    ossImageBase64: b,
    showOssImageBase64: v,
    mediaHostingProvider: _,
    isPromptExpanded: w,
    activeReferenceStripRows: k,
    genReferenceStripThumbs: A,
    promptReferenceItems: S,
    onRemoveImage: C,
    onReorderImages: I,
    onChange: E,
    onSelectModel: M,
    showGeminiFormatDropdown: T = !1,
    geminiApiFormat: P = "openai",
    onGeminiApiFormatChange: R,
    showReasoningEffortDropdown: j = !1,
    showMimoVideoSendDropdown: B = !1,
    mimoVideoSendMode: F = "url",
    onMimoVideoSendModeChange: N,
    reasoningEffort: G = rT,
    codexReasoningOptions: z,
    codexReasoningUnavailableMessage: V,
    onRetryCodexReasoning: O,
    codexDetails: L,
    onReasoningEffortChange: D,
    onToggleWebSearch: U,
    onToggleOss: H,
    onToggleOssImageBase64: Y,
    onPromptExpandedChange: K,
    onSubmit: W,
    promptOverflowRemeasureKey: Q,
    assetAtMentionItems: q = [],
    assetAtMentionCategories: ne = [],
    onSelectAssetAtMention: de,
    platformModelName: le,
    showPlatformGroupPicker: J = !1,
    onPlatformGroupChange: pe,
    upstreamTextNodes: ce = [],
    upstreamAgentNodes: we = [],
    showUpstreamTextPreview: X = !1,
    onToggleUpstreamTextPreview: Z,
    onRemoveUpstreamNode: re,
    onAddFromCanvas: fe,
    canvasPickActive: ye = !1,
    imageInfoJsonPrompt: ie,
    showImageInfoJsonPreview: ae = !1,
    onToggleImageInfoJsonPreview: be
  }) => {
    var ge, _e, ke;
    on();
    const [Ee, xe] = g.useState(null),
      he = g.useRef(null),
      ue = g.useRef(null);
    return c.jsxs(c.Fragment, {
      children: [c.jsx(FUt, {
        isDark: t,
        node: e,
        currentModel: "",
        activeReferenceStripRows: k,
        genReferenceStripThumbs: A,
        genPromptExpandControl: Ee,
        hasTextEditData: !1,
        hasMoveObjectData: !1,
        lightingNodeCount: 0,
        lightingPromptSummary: "",
        markersFeedback: {
          hasMarkers: !1,
          markerDescriptions: []
        },
        isSeedanceLikeMaterialsModel: !1,
        seedanceMaterialsCount: 0,
        seedanceMaterialInputRef: he,
        seedanceReplaceIndexRef: ue,
        onReorderImages: I,
        onRemoveImage: C,
        onUpdatePrompt: E,
        onOpenSeedanceMaterialLightbox: () => {},
        onSetSeedanceReplaceMenu: () => {},
        upstreamTextNodes: ce,
        upstreamAgentNodes: we,
        showUpstreamTextPreview: X,
        onToggleUpstreamTextPreview: Z,
        onRemoveUpstreamNode: re,
        onAddFromCanvas: fe,
        canvasPickActive: ye,
        extraStripItems: ie && be ? c.jsx(h0o, {
          isDark: t,
          prompt: ie,
          showPreview: ae,
          onTogglePreview: be
        }) : null
      }), c.jsx("div", {
        className: `qiaodoumayi-aux-prompt-group ${R5t}`,
        children: c.jsx("div", {
          className: `qiaodoumayi-aux-prompt-inner ${N5t}`,
          children: c.jsx(cEe, {
            nodeId: e.id,
            nodeType: "text-node",
            value: n,
            onChange: E,
            placeholder: x("描述任何你想要生成的内容；输入 @ 打开我的资产库"),
            isDark: t,
            assetAtMentionItems: q,
            assetAtMentionCategories: ne,
            onSelectAssetAtMention: de,
            promptExpanded: w,
            onPromptExpandedChange: K,
            promptOverflowRemeasureKey: Q,
            expandControlOnReferenceStrip: !0,
            onExpandControlChange: xe,
            promptReferenceItems: S,
            onCmdEnterSubmit: r ? void 0 : W,
            compactFloatingPromptPanel: !0
          })
        })
      }), L, c.jsxs("div", {
        "data-node-header-toolbar": !0,
        className: "qiaodoumayi-aux-gen-toolbar flex h-14 shrink-0 items-center gap-2",
        children: [c.jsx(Th, {
          scopeId: e.id,
          dropdownType: "text-node-ai-composer-model",
          scrollToSelected: !1,
          value: s,
          models: d,
          isDark: t,
          activeDropdown: u,
          setActiveDropdown: h,
          onSelect: M,
          disabled: a,
          menuPlacement: "above",
          showChannelBar: !0,
          menuMaxHeight: 360,
          leadingIcon: c.jsx(XE, {
            size: 13
          })
        }), T && R ? c.jsx(_$, {
          nodeId: e.id,
          dropdownType: "text-node-gemini-api-format",
          value: P,
          isDark: t,
          activeDropdown: u,
          setActiveDropdown: h,
          onSelect: R,
          buttonClassName: "shrink-0 text-xs",
          menuClassName: "w-44"
        }) : null, B && N ? c.jsx(hYe, {
          nodeId: e.id,
          dropdownType: "text-node-mimo-video-send",
          value: F,
          isDark: t,
          activeDropdown: u,
          setActiveDropdown: h,
          onSelect: N,
          buttonClassName: "shrink-0 text-xs"
        }) : null, j && D ? c.jsx(dT, {
          nodeId: e.id,
          dropdownType: "text-node-reasoning-effort",
          optionsOverride: z,
          unavailableMessage: V,
          onRetry: O,
          value: G,
          isDark: t,
          activeDropdown: u,
          setActiveDropdown: h,
          onSelect: D,
          buttonClassName: "shrink-0 text-xs",
          modelId: s,
          modelName: le || ((ge = d.find(ve => ve.id === s)) == null ? void 0 : ge.modelName) || s
        }) : null, J && pe ? c.jsx(Ku, {
          nodeId: e.id,
          platformGroup: l,
          modelName: le || ((_e = d.find(ve => ve.id === s)) == null ? void 0 : _e.modelName) || s,
          modelId: s,
          modelConfigId: (ke = d.find(ve => ve.id === s)) == null ? void 0 : ke.id,
          isDark: t,
          onGroupChange: pe,
          compact: !0,
          buttonVariant: "square"
        }) : null, m ? c.jsxs("label", {
          className: `sketch-chat-web-chip${t ? " sketch-chat-web-chip--dark" : ""}${a ? " opacity-50 pointer-events-none" : ""}`,
          title: x("启用联网搜索"),
          children: [c.jsx("input", {
            type: "checkbox",
            checked: p,
            disabled: a,
            onChange: ve => U(ve.target.checked),
            className: "h-3 w-3 cursor-pointer"
          }), c.jsx("span", {
            className: "whitespace-nowrap",
            children: x("联网")
          })]
        }) : null, y ? c.jsxs("label", {
          className: `sketch-chat-web-chip${t ? " sketch-chat-web-chip--dark" : ""}${a ? " opacity-50 pointer-events-none" : ""}`,
          title: Jk(_),
          onMouseDown: ve => ve.stopPropagation(),
          children: [c.jsx("input", {
            type: "checkbox",
            checked: f,
            disabled: a,
            onChange: ve => H(ve.target.checked),
            className: "h-3 w-3 cursor-pointer"
          }), c.jsx("span", {
            className: "whitespace-nowrap",
            children: $g(_)
          })]
        }) : null, v ? c.jsxs("label", {
          className: `sketch-chat-web-chip${t ? " sketch-chat-web-chip--dark" : ""}${a ? " opacity-50 pointer-events-none" : ""}`,
          title: x("图片改用 Base64 发送，视频仍走 OSS 链接"),
          onMouseDown: ve => ve.stopPropagation(),
          children: [c.jsx("input", {
            type: "checkbox",
            checked: b,
            disabled: a,
            onChange: ve => Y(ve.target.checked),
            className: "h-3 w-3 cursor-pointer"
          }), c.jsx("span", {
            className: "whitespace-nowrap",
            children: "B64"
          })]
        }) : null, c.jsxs("span", {
          className: "qiaodoumayi-aux-submit-wrap ml-auto inline-flex shrink-0 items-center gap-0.5",
          children: [c.jsx(XIe, {
            kind: "text",
            value: n,
            onChange: E,
            isDark: t,
            scopeId: e.id,
            mediaCount: k.length,
            disabled: r || i,
            fallbackModelId: s,
            reasoningEffort: G
          }), c.jsx(JIe, {
            nodeId: e.id,
            value: n,
            onChange: E,
            isDark: t,
            disabled: r || i
          }), c.jsx("button", {
            type: "button",
            disabled: r,
            onClick: ve => {
              ve.stopPropagation(), !r && W();
            },
            onMouseDown: ve => ve.stopPropagation(),
            className: `qiaodoumayi-aux-submit rounded-md border p-1.5 active:scale-95 ${r && !i ? t ? "cursor-not-allowed border-white/15 text-white/40" : "cursor-not-allowed border-zinc-200 text-zinc-400" : t ? "border-white/30 bg-transparent text-white hover:bg-white/5" : "border-gray-300 bg-transparent text-gray-900 hover:bg-black/5"}`,
            title: x("运行"),
            children: i ? c.jsx(Ua, {
              size: 12,
              className: "animate-spin shrink-0"
            }) : c.jsx(Gc, {
              size: 16,
              strokeWidth: 2.4,
              className: "shrink-0",
              "aria-hidden": !0
            })
          })]
        })]
      })]
    });
  },
  g0o = ({
    node: e,
    isDark: t,
    updateNode: n,
    connections: r = [],
    nodes: a = [],
    setConnections: i,
    setNodes: o,
    materialLibraryTree: s,
    getMaterialLibraryPreviewUrl: l,
    apiConfigs: d = [],
    globalApiKey: u = "",
    getConnectedInputImages: h,
    getOrderedInputItems: p,
    activeDropdown: m = null,
    setActiveDropdown: f = () => {},
    view: y = {
      x: 0,
      y: 0,
      zoom: 1
    },
    selectedNodeId: b = null,
    setSelectedNodeId: v,
    setSelectedNodeIds: _,
    enableGenerationNodeAnimation: w = !0,
    onStartCompactRefCanvasPick: k,
    compactRefCanvasPickTargetId: A = null
  }) => {
    var En, Zn, Sr, Bn, Et, zn, Mn, or, mr, Yr, aa, wa, xa, Aa, pn, xr, Nr, qr, Oa, Fa, Ra, ui, pr, In, fr, na, Ba, ai, vi, Vi, Ti, Gi, hi, vo, ci, ji, ts, Ts, dc, Tl, Ml;
    on();
    const S = g.useMemo(() => new Map(a.map(sr => [sr.id, sr])), [a]),
      C = A === e.id,
      I = g.useCallback(() => {
        k == null || k(e.id, "default");
      }, [e.id, k]),
      [E, M] = g.useState(() => {
        var sr;
        return QSt(NTe((sr = e.settings) == null ? void 0 : sr.textNodeChatModel));
      }),
      T = g.useMemo(() => {
        const sr = VU((d || []).filter(da => da.type === "Chat"));
        if (E && !sr.some(da => da.id === E)) {
          const da = (d || []).find(la => la.id === E);
          sr.push(da ?? {
            id: E,
            modelName: E,
            type: "Chat"
          });
        }
        return sr;
      }, [d, E]),
      P = g.useMemo(() => T.map(sr => sr.id).join(","), [T]),
      R = g.useMemo(() => jct(E, T), [E, T]),
      j = Qa.getGlobalBaseUrl(),
      B = g.useMemo(() => T.find(sr => sr.id === R), [T, R]),
      F = (B == null ? void 0 : B.modelName) || R,
      N = Mu(R),
      G = aQe(N),
      z = (En = G.catalog) == null ? void 0 : En.models.find(sr => `codex-chat:${sr.model}` === R),
      V = mRt(z),
      [O] = g.useState(Zgo),
      L = O.setReply,
      D = Wk(R, F),
      U = TT(R, F),
      [H, Y] = g.useState(() => {
        var sr;
        return ow((sr = e.settings) == null ? void 0 : sr.textNodeGeminiApiFormat);
      });
    g.useEffect(() => {
      var sr;
      Y(ow((sr = e.settings) == null ? void 0 : sr.textNodeGeminiApiFormat));
    }, [(Zn = e.settings) == null ? void 0 : Zn.textNodeGeminiApiFormat]);
    const [K, W] = uYe(),
      [Q, q] = g.useState(() => {
        var sr, da;
        return Qv(R, If((sr = e.settings) == null ? void 0 : sr.textNodeChatModel).effort ?? ((da = e.settings) == null ? void 0 : da.textNodeReasoningEffort), F);
      });
    g.useEffect(() => {
      var sr;
      q(Qv(R, (sr = e.settings) == null ? void 0 : sr.textNodeReasoningEffort, F));
    }, [(Sr = e.settings) == null ? void 0 : Sr.textNodeReasoningEffort, R, F]);
    const ne = ((Bn = V.find(sr => {
        var da;
        return sr.value === ((da = e.settings) == null ? void 0 : da.textNodeReasoningEffort);
      })) == null ? void 0 : Bn.value) || (z == null ? void 0 : z.defaultReasoningEffort) || Q,
      de = g.useMemo(() => !!B && od(B, j), [B, j]),
      [le, J] = g.useState(() => de);
    g.useEffect(() => {
      if (de) {
        J(!0);
        return;
      }
      B && J(!1);
    }, [de, B]);
    const pe = g.useCallback(sr => {
        var Ta;
        const da = String(((Ta = e.settings) == null ? void 0 : Ta.platformGroup) ?? "").trim();
        if (da) return da;
        const la = zs(sr);
        return (la == null ? void 0 : la.platformGroup) || ko;
      }, [(Et = e.settings) == null ? void 0 : Et.platformGroup]),
      [ce, we] = g.useState(() => {
        var sr;
        return pe(QSt(NTe((sr = e.settings) == null ? void 0 : sr.textNodeChatModel)));
      });
    g.useEffect(() => {
      var da;
      const sr = jct(NTe(((da = e.settings) == null ? void 0 : da.textNodeChatModel) || E), T);
      we(pe(sr));
    }, [e.id]), g.useEffect(() => {
      var la;
      const sr = NTe((la = e.settings) == null ? void 0 : la.textNodeChatModel),
        da = sr ? jct(sr, T) : "";
      if (da && da !== E && (M(da), we(pe(da)), da !== sr)) {
        const Ta = If(sr).effort;
        n(e.id, {
          settings: {
            ...(Ae.current || {}),
            textNodeChatModel: da,
            platformGroup: pe(da),
            ...(Ta ? {
              textNodeReasoningEffort: Ta
            } : {})
          }
        }), Ta && q(Ta);
      }
    }, [(zn = e.settings) == null ? void 0 : zn.textNodeChatModel, P]), g.useEffect(() => {
      if (T.length !== 0 && R !== E) {
        M(R);
        const sr = zs(R);
        we((sr == null ? void 0 : sr.platformGroup) || ko), n(e.id, {
          settings: {
            ...(Ae.current || {}),
            textNodeChatModel: R,
            platformGroup: (sr == null ? void 0 : sr.platformGroup) || ko
          }
        });
      }
    }, [P, R, E, e.id, n]);
    const [X, Z] = g.useState(!1);
    g.useEffect(() => (hu(e.id, X), () => {
      hu(e.id, !1);
    }), [X, e.id]);
    const re = O.setText,
      fe = g.useRef(null),
      ye = g.useRef(""),
      ie = g.useRef(null);
    g.useEffect(() => () => {
      var sr;
      (sr = ie.current) == null || sr.abort(), ie.current = null, fe.current !== null && (cancelAnimationFrame(fe.current), fe.current = null), ye.current = "";
    }, []);
    const [ae, be] = g.useState(!!((Mn = e.settings) != null && Mn.textNodeWebSearchEnabled)),
      [Ee, xe] = g.useState(() => {
        var sr;
        return !!((sr = e.settings) != null && sr.genUseAliyunOss);
      }),
      [he, ue] = g.useState(() => ua()),
      [ge, _e] = g.useState(() => Ph()),
      [ke, ve] = g.useState(() => mo()),
      Te = Ee || he,
      [Ne, me] = g.useState(() => {
        var sr;
        return !!((sr = e.settings) != null && sr.ossImageBase64);
      }),
      Ae = g.useRef(e.settings);
    g.useEffect(() => {
      Ae.current = e.settings;
    }, [e.settings]), g.useEffect(() => {
      var sr, da;
      xe(!!((sr = e.settings) != null && sr.genUseAliyunOss)), me(!!((da = e.settings) != null && da.ossImageBase64));
    }, [e.id, (or = e.settings) == null ? void 0 : or.genUseAliyunOss, (mr = e.settings) == null ? void 0 : mr.ossImageBase64]), g.useEffect(() => {
      const sr = () => {
        ue(ua()), _e(Ph()), ve(mo());
      };
      return sr(), window.addEventListener(go, sr), () => window.removeEventListener(go, sr);
    }, []);
    const [Fe, Me] = g.useState(!1),
      Re = g.useRef(!1),
      [$e, rt] = g.useState(KSt),
      [nt, ze] = g.useState(""),
      Le = g.useRef(null),
      Ke = g.useRef(null),
      Xe = g.useRef(!1),
      De = g.useRef(""),
      Ye = g.useRef(!1),
      Ce = g.useRef(null),
      He = g.useRef(null),
      Ve = g.useRef(!1),
      it = g.useRef(null),
      It = g.useRef(null),
      Ft = g.useRef(null),
      We = g.useRef(null),
      Ze = g.useRef(null),
      Ge = g.useRef(null),
      Oe = g.useRef(null),
      [st, vt] = g.useState(() => {
        var sr;
        return ((sr = e.settings) == null ? void 0 : sr.textNodeDraftPrompt) || "";
      }),
      [Ht, nn] = g.useState(() => {
        var sr;
        return !!((sr = e.settings) != null && sr.textNodeComposerOpen);
      }),
      pt = g.useRef(Ht),
      [lt, gt] = g.useState(!!((Yr = e.settings) != null && Yr.textNodeFullscreen)),
      Ut = g.useRef(null),
      _t = g.useRef(null),
      At = g.useRef(0),
      [Yt, qe] = g.useState((aa = e.settings) != null && aa.textNodeFullscreen ? "show" : "enter"),
      [kt, St] = g.useState(!!((wa = e.settings) != null && wa.textNodeFullscreen)),
      [hn, Qt] = g.useState(() => {
        var sr;
        return typeof window < "u" && ((sr = e.settings) != null && sr.textNodeFullscreen) ? mV() : null;
      }),
      [Ot, ln] = g.useState(!1),
      [Pn, rn] = g.useState(!1),
      Yn = g.useRef(0),
      Ct = g.useRef(null),
      Cn = g.useRef(null),
      un = g.useRef(null),
      Jn = g.useRef(null),
      Kn = g.useRef(e),
      en = g.useRef(a),
      Vn = g.useRef(r);
    g.useEffect(() => {
      Kn.current = e;
    }, [e]), en.current = a, Vn.current = r, pt.current = Ht;
    const Tt = g.useCallback((sr, da) => {
        const la = Kn.current,
          Ta = {
            ...(Ae.current || (la == null ? void 0 : la.settings) || {}),
            ...sr
          };
        Ae.current = Ta, la && (Kn.current = da ? {
          ...la,
          settings: Ta,
          ...da
        } : {
          ...la,
          settings: Ta
        }), n(e.id, da ? {
          settings: Ta,
          ...da
        } : {
          settings: Ta
        });
      }, [e.id, n]),
      Ue = g.useRef(st),
      et = g.useRef(null);
    g.useEffect(() => {
      Ue.current = st;
    }, [st]), g.useEffect(() => () => {
      var sr;
      et.current !== null && (window.clearTimeout(et.current), et.current = null, n(e.id, {
        settings: {
          ...(((sr = Kn.current) == null ? void 0 : sr.settings) || Ae.current || {}),
          textNodeDraftPrompt: Ue.current
        }
      }));
    }, [e.id, n]), g.useEffect(() => {
      Re.current = Fe;
    }, [Fe]), Fe || (Re.current = !1), g.useEffect(() => {
      var da;
      const sr = (da = e.settings) == null ? void 0 : da.textNodeDraftPrompt;
      typeof sr == "string" && sr !== st && vt(sr);
    }, [e.id, (xa = e.settings) == null ? void 0 : xa.textNodeDraftPrompt]), g.useEffect(() => {
      var da;
      const sr = (da = e.settings) == null ? void 0 : da.textNodeComposerOpen;
      typeof sr == "boolean" && sr !== Ht && (pt.current = sr, nn(sr));
    }, [e.id, (Aa = e.settings) == null ? void 0 : Aa.textNodeComposerOpen]), g.useEffect(() => {
      var sr;
      (sr = e.settings) != null && sr.textNodeFocusComposerNonce && (pt.current = !0, nn(!0), n(e.id, {
        settings: {
          ...(Ae.current || {}),
          textNodeComposerOpen: !0,
          textNodeFocusComposerNonce: void 0
        }
      }), sae(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sae(), Jgn(e.id);
        });
      }));
    }, [(pn = e.settings) == null ? void 0 : pn.textNodeFocusComposerNonce]), g.useEffect(() => {
      var la;
      if (!(Fe && !X) && !lt) {
        Ce.current = null, rt(Vgn(String(((la = e.settings) == null ? void 0 : la.text) ?? e.prompt ?? "")));
        return;
      }
      const da = () => {
        const Ta = lt ? He.current : Le.current,
          Wa = window.getSelection();
        if (!Ta || !Wa || Wa.rangeCount === 0 || !Wa.anchorNode || !Ta.contains(Wa.anchorNode)) return;
        Ce.current = Wa.getRangeAt(0).cloneRange();
        const pi = _Pe(Ta, Wa);
        rt(wi => wi.block === pi.block && wi.bold === pi.bold && wi.italic === pi.italic && wi.bulletList === pi.bulletList && wi.numberedList === pi.numberedList ? wi : pi);
      };
      return document.addEventListener("selectionchange", da), () => document.removeEventListener("selectionchange", da);
    }, [Fe, lt, e.prompt, (xr = e.settings) == null ? void 0 : xr.text, X]);
    const ft = g.useMemo(() => {
        const sr = p ? p(e.id) : h ? h(e.id).map(la => ({
            url: la,
            type: "image"
          })) : [],
          da = new Map();
        return r && a && r.filter(la => la.to === e.id && (!la.inputType || la.inputType === "default")).forEach(la => {
          const Ta = S.get(la.from);
          Ta && Nct(Ta).forEach(Wa => {
            da.set(Wa, la.from);
          });
        }), sr.map(la => {
          const Ta = "assetId" in la && typeof la.assetId == "string" ? la.assetId : void 0;
          let Wa = H8(la.url),
            pi = Ta ? Ta.trim() : "";
          const wi = (pi ? da.get(pi) : void 0) || da.get(Wa) || da.get(la.url);
          if (wi && a) {
            const Ho = S.get(wi);
            if (Ho && (Ho.type === "gen-image" || Ho.type === "gen-video")) {
              const jo = Xl(Ho);
              jo != null && jo.url && !Tu(jo.url) && (Wa = H8(jo.url), pi = jo.assetId || pi);
            }
          }
          const to = Wa && !Tu(Wa) ? Wa : "";
          return {
            ...la,
            url: to,
            assetId: pi || Ta,
            sourceNodeId: wi
          };
        }).filter(la => la.url.length > 0 || !!(la.assetId && String(la.assetId).trim()));
      }, [p, h, r, S, e.id, (Nr = e.settings) == null ? void 0 : Nr.inputItemOrder]),
      ht = g.useMemo(() => ft.map(sr => sr.url).filter(sr => typeof sr == "string" && sr.trim().length > 0), [ft]),
      wt = g.useMemo(() => ft.map(sr => ({
        url: sr.url,
        type: sr.type,
        assetId: sr.assetId
      })), [ft]),
      {
        activeReferenceStripRows: jt,
        genReferenceStripThumbs: bt,
        promptReferenceItems: Bt
      } = evr({
        nodeId: e.id,
        connectedImages: ht,
        connectedImageItems: wt,
        connections: r,
        nodes: a
      }),
      wn = ft.length > 0,
      at = g.useMemo(() => (r || []).some(sr => sr.to === e.id && (!sr.inputType || sr.inputType === "default")), [r, e.id]);
    g.useEffect(() => {
      var Ta, Wa, pi;
      const sr = (Ta = e.settings) == null ? void 0 : Ta.textNodeChatModel,
        da = (Wa = e.settings) == null ? void 0 : Wa.textNodeHasImageInput,
        la = !!((pi = e.settings) != null && pi.textNodeWebSearchEnabled);
      sr === R && da === at && la === ae || n(e.id, {
        settings: {
          ...Ae.current,
          textNodeChatModel: R,
          textNodeHasImageInput: at,
          textNodeWebSearchEnabled: ae
        }
      });
    }, [R, at, ae, e.id, n]);
    const Pt = g.useCallback(sr => {
        M(sr), Dia(sr);
        const da = zs(sr),
          la = (da == null ? void 0 : da.platformGroup) || ko;
        we(la), n(e.id, {
          settings: {
            ...(Ae.current || {}),
            textNodeChatModel: sr,
            platformGroup: la
          }
        });
      }, [e.id, n]),
      dt = g.useCallback(sr => {
        Y(sr), n(e.id, {
          settings: {
            ...(Ae.current || {}),
            textNodeGeminiApiFormat: sr
          }
        });
      }, [e.id, n]),
      xt = g.useCallback(sr => {
        q(sr), n(e.id, {
          settings: {
            ...(Ae.current || {}),
            textNodeReasoningEffort: sr
          }
        });
      }, [e.id, n]),
      yn = g.useCallback(sr => {
        we(sr), n(e.id, {
          settings: {
            ...(Ae.current || {}),
            platformGroup: sr
          }
        });
      }, [e.id, n]),
      gn = g.useMemo(() => Ht || Fe ? uCe(s ?? null) : [], [s, Ht, Fe]),
      mt = g.useMemo(() => Ht || Fe ? dCe(s ?? null, {
        kinds: ["image", "video"]
      }) : [], [s, Ht, Fe]),
      [Xt, Gn] = g.useState({});
    g.useEffect(() => {
      if (!Ht && !Fe) {
        Gn({});
        return;
      }
      if (!l || mt.length === 0) {
        Gn({});
        return;
      }
      let sr = !1;
      return (async () => {
        const da = {};
        await Promise.all(mt.slice(0, 160).map(async la => {
          try {
            let Ta = oae.get(la.id);
            Ta || (Ta = Promise.resolve(l(la.materialAsset)).catch(() => (oae.delete(la.id), null)), c0o(la.id, Ta));
            const Wa = await Ta;
            Wa && (da[la.id] = Wa);
          } catch {}
        })), sr || Gn(da);
      })(), () => {
        sr = !0;
      };
    }, [l, mt, Ht, Fe]);
    const rr = g.useMemo(() => mt.map(sr => ({
        id: sr.id,
        name: sr.name,
        category: sr.category,
        thumbnailUrl: Xt[sr.id] || "",
        materialAsset: sr.materialAsset,
        canvasMediaKind: sr.canvasMediaKind
      })), [mt, Xt]),
      qn = g.useMemo(() => {
        var da, la;
        if (!Ht && !Fe) return [];
        const sr = [];
        for (const Ta of a) if (Ta.id !== e.id) {
          if (Ta.type === "input-image") {
            const Wa = typeof Ta.content == "string" ? Ta.content.trim() : "",
              pi = (da = Ta.settings) == null ? void 0 : da.imageUrl,
              wi = Wa || (typeof pi == "string" ? pi.trim() : "");
            if (!wi) continue;
            const to = ((la = Ta.settings) == null ? void 0 : la.mediaType) === "video" || Sh(wi);
            sr.push({
              id: `canvas-${Ta.id}`,
              name: Ta.nodeName || (to ? "画布视频" : "画布图片"),
              category: "从画布上选择",
              thumbnailUrl: wi,
              fromCanvas: !0,
              sourceCanvasNodeId: Ta.id,
              canvasSourceNodeType: "input-image",
              canvasMediaKind: to ? "video" : "image"
            });
            continue;
          }
          if (Ta.type === "gen-image" || Ta.type === "gen-video") {
            const Wa = Xl(Ta);
            if (!(Wa != null && Wa.url)) continue;
            const pi = Ta.type === "gen-video" || Sh(Wa.url);
            sr.push({
              id: `canvas-${Ta.id}`,
              name: Ta.nodeName || (Ta.type === "gen-video" ? "画布 AI 视频" : "画布 AI 绘画"),
              category: "从画布上选择",
              thumbnailUrl: Wa.url,
              fromCanvas: !0,
              sourceCanvasNodeId: Ta.id,
              canvasSourceNodeType: Ta.type === "gen-image" ? "gen-image" : "gen-video",
              canvasMediaKind: pi ? "video" : "image"
            });
          }
        }
        return sr;
      }, [e.id, a, Ht, Fe]),
      Dn = g.useMemo(() => [...qn, ...rr], [qn, rr]),
      Ar = g.useCallback(async sr => {
        var Pl;
        if (sr.fromCanvas && sr.sourceCanvasNodeId && i) {
          const xl = sr.sourceCanvasNodeId;
          if (xl === e.id) return;
          const Bi = a.find(Do => Do.id === xl);
          if (!Bi) return;
          if (Bi.type === "input-image") {
            const Do = typeof Bi.content == "string" ? Bi.content.trim() : "",
              co = (Pl = Bi.settings) == null ? void 0 : Pl.imageUrl;
            if (!(Do || (typeof co == "string" ? co.trim() : ""))) return;
          } else if (Bi.type === "gen-image" || Bi.type === "gen-video") {
            const Do = Xl(Bi);
            if (!(Do != null && Do.url)) return;
          } else return;
          i(Do => Do.some(ls => ls.from === xl && ls.to === e.id && (!ls.inputType || ls.inputType === "default")) ? Do : [...Do, {
            id: Fi(),
            from: xl,
            to: e.id,
            inputType: "default"
          }]);
          return;
        }
        const da = sr.materialAsset;
        if (!da || !o || !i) return;
        const {
            resolveMaterialLibraryAssetForCanvas: la
          } = await Ie(async () => {
            const {
              resolveMaterialLibraryAssetForCanvas: xl
            } = await Promise.resolve().then(() => U1);
            return {
              resolveMaterialLibraryAssetForCanvas: xl
            };
          }, void 0, import.meta.url),
          Ta = await la(da);
        let Wa = (Ta == null ? void 0 : Ta.content) || sr.thumbnailUrl || "";
        if (!Wa && l && (Wa = (await l(da)) || ""), !Wa) return;
        const pi = a.find(xl => xl.id === e.id),
          wi = (pi == null ? void 0 : pi.x) ?? e.x,
          to = (pi == null ? void 0 : pi.y) ?? e.y,
          Ho = r.filter(xl => {
            if (xl.to !== e.id || xl.inputType && xl.inputType !== "default") return !1;
            const Bi = a.find(Do => Do.id === xl.from);
            return (Bi == null ? void 0 : Bi.type) === "input-image";
          }).length,
          jo = Fi(),
          Ls = da.kind === "video",
          _s = da.name.replace(/\.[^/.]+$/, "");
        o(xl => {
          const Bi = wi - 690,
            Do = to - 32 + Ho * 102,
            co = Ki(jo, "input-image", Bi, Do, void 0, void 0, xl),
            ls = {
              ...co,
              width: 95,
              height: 68,
              content: Wa,
              prompt: Ls ? da.name : co.prompt,
              settings: {
                ...(co.settings || {}),
                ...(Ls ? {
                  mediaType: "video"
                } : {}),
                ...((Ta == null ? void 0 : Ta.settingsExtras) || {}),
                _materialLibraryPath: da.path,
                ...(Wa.startsWith("blob:") ? {
                  _blobUrl: Wa
                } : {}),
                ...(Ls ? {
                  musicTitle: _s
                } : {})
              }
            };
          return [...xl, ls];
        }), i(xl => [...xl, {
          id: Fi(),
          from: jo,
          to: e.id,
          inputType: "default"
        }]);
      }, [r, l, e.id, e.x, e.y, a, i, o]);
    g.useEffect(() => {
      var da;
      !!((da = e.settings) != null && da.textNodeIsAnalyzing) !== X && Tt({
        textNodeIsAnalyzing: X
      });
    }, [X, Tt, (qr = e.settings) == null ? void 0 : qr.textNodeIsAnalyzing]);
    const {
        textFromUpstreamTextNodes: _r,
        upstreamTextNodeCount: Pa,
        connectedUpstreamTextNodes: fa,
        connectedAgentNodes: Ca
      } = g.useMemo(() => {
        const {
          textNodes: sr,
          agentNodes: da
        } = yJe(e.id, r, a);
        return {
          textFromUpstreamTextNodes: Fde({
            nodeId: e.id,
            connections: r,
            nodes: a
          }).trim() || null,
          upstreamTextNodeCount: sr.length + da.length,
          connectedUpstreamTextNodes: sr,
          connectedAgentNodes: da
        };
      }, [r, a, e.id]),
      $n = g.useRef(_r);
    $n.current = _r;
    const yr = g.useCallback((sr, da) => {
        da.preventDefault(), da.stopPropagation();
        const la = String(sr || "").trim();
        !la || !i || i(Ta => Ta.filter(Wa => !(Wa.to === e.id && Wa.from === la)));
      }, [e.id, i]),
      Ir = g.useCallback(sr => {
        if (pt.current === sr) {
          sr && Dd(e.id, !0);
          return;
        }
        pt.current = sr, sr || Z7(e.id), nn(sr), Dd(e.id, sr), Tt({
          textNodeComposerOpen: sr
        }), sr || f(da => (da == null ? void 0 : da.nodeId) === e.id ? null : da);
      }, [Tt, e.id, f]),
      [Gr, Zr] = g.useState(!1);
    g.useEffect(() => {
      if (!Ht) {
        Zr(!1);
        return;
      }
      let sr = !1;
      return Id().then(() => {
        sr || Zr(!0);
      }), () => {
        sr = !0;
      };
    }, [Ht]), g.useEffect(() => () => {
      Dd(e.id, !1);
    }, [e.id]);
    const La = g.useCallback(() => {
        zb(e.id, v, _, 500, {
          forceSingle: !0
        });
      }, [e.id, v, _]),
      sa = g.useCallback(() => {
        const sr = Oe.current;
        sr && (window.removeEventListener("pointermove", sr.move), window.removeEventListener("pointerup", sr.up), window.removeEventListener("pointercancel", sr.up), window.removeEventListener("mousemove", sr.move), window.removeEventListener("mouseup", sr.up), Oe.current = null, Ge.current = null);
      }, []),
      Ea = g.useCallback(() => {
        if (Xe.current || Re.current) return;
        La(), sae();
        const sr = Yn.current + 1;
        Yn.current = sr, Ir(!0), requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            sae(), Yn.current === sr && (Xe.current || Re.current || Jgn(e.id));
          });
        });
      }, [La, Ir]);
    g.useEffect(() => {
      if (!Ht) return;
      const sr = da => {
        var Ta;
        const la = da.target;
        la && (C || (Ta = Ze.current) != null && Ta.contains(la) || Die(la) || bW(la) || la.closest(".node-dropdown-menu") || la.closest(".node-dropdown-button") || la.closest("[data-model-select-area]") || la.closest("[data-text-node-external-composer]") || Ir(!1));
      };
      return window.addEventListener("pointerdown", sr, !0), () => window.removeEventListener("pointerdown", sr, !0);
    }, [Ht, Ir, C]), g.useEffect(() => {
      !C && b !== e.id && Ht && Ir(!1);
    }, [b, e.id, Ht, Ir, C]), g.useEffect(() => () => {
      sa();
    }, [sa]);
    const ba = EUe(e.settings),
      ga = ((Oa = e.settings) == null ? void 0 : Oa.text) || e.prompt || "",
      _a = Uot({
        hasUpstreamText: !!_r,
        aiGenerated: ((Fa = e.settings) == null ? void 0 : Fa.aiGenerated) === !0,
        showUpstreamPreview: Ot
      });
    g.useEffect(() => {
      _r || ln(!1);
    }, [_r]);
    const $a = !Fe,
      Ya = !!((Ra = e.settings) != null && Ra.textNodeUserFormatted),
      ta = !!((ui = e.settings) != null && ui.imageInfoJson),
      ki = String(((pr = e.settings) == null ? void 0 : pr.hiddenPromptTemplate) || "").trim(),
      Wn = ta && Pn && !X && ((In = e.settings) == null ? void 0 : In.aiGenerated) !== !0 && ki.length > 0,
      wr = jgo((fr = e.settings) == null ? void 0 : fr.textNodeFontSize),
      jn = Ngo(wr),
      _n = !X && !ta,
      ar = !X && !_a,
      Vt = g.useMemo(() => {
        var sr;
        return Wn ? ki : dbi({
          isAnalyzing: X,
          streamingContent: "",
          aiGenerated: ((sr = e.settings) == null ? void 0 : sr.aiGenerated) === !0,
          ownText: ga,
          localDisplayText: ba,
          upstreamText: _r,
          showUpstreamPreview: Ot
        });
      }, [Wn, ki, X, (na = e.settings) == null ? void 0 : na.aiGenerated, ga, ba, _r, Ot]),
      vn = g.useMemo(() => X ? Vt : pV(Vt), [X, Vt]),
      An = (Ba = e.settings) == null ? void 0 : Ba._agentTypeToken,
      ur = String(((ai = e.settings) == null ? void 0 : ai.text) || e.prompt || e.content || ""),
      [zr, Dr] = g.useState(null);
    g.useEffect(() => {
      const sr = Number(An || 0),
        da = ur;
      if (!sr || !da.trim() || Fe) {
        Dr(null);
        return;
      }
      let la = 0;
      const Ta = Math.max(1, Math.ceil(da.length / 48));
      Dr("");
      const Wa = window.setInterval(() => {
        la = Math.min(da.length, la + Ta), Dr(da.slice(0, la)), la >= da.length && (window.clearInterval(Wa), Dr(null));
      }, 32);
      return () => window.clearInterval(Wa);
    }, [An, ur, Fe]);
    const Wr = zr ?? vn,
      gr = ((vi = e.settings) == null ? void 0 : vi.textNodeAutoHeight) === !0;
    g.useLayoutEffect(() => {
      var Wa;
      if (!gr || X || lt) return;
      const sr = Fe ? Le.current : (Wa = We.current) == null ? void 0 : Wa.firstElementChild;
      if (!sr) return;
      let da = 0;
      const la = () => {
          cancelAnimationFrame(da), da = requestAnimationFrame(() => {
            var Ls, _s, Pl;
            const pi = Kn.current;
            if (!sr.isConnected || ((Ls = pi.settings) == null ? void 0 : Ls.textNodeAutoHeight) !== !0) return;
            const wi = sr.closest(".node-wrapper"),
              to = Number((_s = pi.settings) != null && _s.hasCustomSize ? pi.settings.savedNodeWidth ?? pi.width : pi.width);
            if (wi && Math.abs(wi.offsetWidth - to) > 1) return;
            const Ho = Math.max(250, Math.min(600, Math.ceil(sr.offsetHeight + 24)));
            if (Math.abs(Ho - pi.height) < 1 && Number(((Pl = pi.settings) == null ? void 0 : Pl.savedNodeHeight) ?? Ho) === Ho) return;
            const jo = {
              ...(Ae.current || pi.settings),
              savedNodeHeight: Ho
            };
            Ae.current = jo, Kn.current = {
              ...pi,
              height: Ho,
              settings: jo
            }, n(e.id, {
              height: Ho,
              settings: jo
            });
          });
        },
        Ta = new ResizeObserver(la);
      return Ta.observe(sr), la(), () => {
        Ta.disconnect(), cancelAnimationFrame(da);
      };
    }, [gr, X, lt, Fe, e.id, n]);
    const jr = g.useCallback(() => {
        Tt({
          textNodeAutoHeight: !gr
        });
      }, [gr, Tt]),
      ea = g.useCallback((sr, da) => {
        var Ta, Wa, pi;
        if (Fe || Re.current) return;
        if (X || Uot({
          hasUpstreamText: !!_r,
          aiGenerated: ((Ta = e.settings) == null ? void 0 : Ta.aiGenerated) === !0,
          showUpstreamPreview: Ot
        })) {
          !X && _r && !((Wa = e.settings) != null && Wa.aiGenerated) && zO("正文由上游节点提供，点击眼睛查看后可编辑、复制");
          return;
        }
        Re.current = !0, Yn.current += 1, (pi = t_(e.id)) == null || pi.blur(), De.current = vn, ze(vn), Ye.current = ar;
        const la = We.current;
        Jn.current = null, un.current = la ? {
          scrollTop: la.scrollTop,
          scrollLeft: la.scrollLeft
        } : null, Cn.current = {
          clientX: sr,
          clientY: da
        }, Xe.current = !0, yP(), Me(!0), queueMicrotask(() => {
          Re.current && (Ir(!0), La());
        });
      }, [X, Fe, (Vi = e.settings) == null ? void 0 : Vi.aiGenerated, La, Ir, Ot, _r, vn, ar]),
      pa = g.useCallback(() => {
        if (ar) {
          const la = Le.current;
          if (!(la != null && la.isConnected)) return !1;
          const Ta = Cn.current;
          Ta ? Hgn(la, Ta.clientX, Ta.clientY, un.current ?? void 0) : Ygo(la);
          const Wa = window.getSelection();
          return Wa != null && Wa.rangeCount && la.contains(Wa.anchorNode) ? (Cn.current = null, un.current = null, !0) : !1;
        }
        const sr = Ke.current;
        if (!(sr != null && sr.isConnected)) return !1;
        const da = Cn.current;
        return da && iur(sr, da.clientX, da.clientY, un.current ?? void 0) || e0n(sr), Cn.current = null, un.current = null, !0;
      }, [ar]);
    g.useLayoutEffect(() => {
      if (!Fe || X || _a) return;
      pa();
      let sr = 0;
      const da = requestAnimationFrame(() => {
        pa(), sr = requestAnimationFrame(() => {
          pa();
        });
      });
      return () => {
        cancelAnimationFrame(da), cancelAnimationFrame(sr);
      };
    }, [Fe, X, _a, pa]);
    const Br = g.useCallback(sr => {
        var pi;
        if (sr.button !== 0) return;
        zb(e.id, v, _);
        const da = Date.now(),
          la = Ct.current;
        if (la && da - la.t <= d0o && Math.abs(sr.clientX - la.x) <= Ygn && Math.abs(sr.clientY - la.y) <= Ygn) {
          Ct.current = null, sa(), sr.stopPropagation(), sr.preventDefault(), window.dispatchEvent(new MouseEvent("mouseup", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            clientX: sr.clientX,
            clientY: sr.clientY,
            button: 0
          })), ea(sr.clientX, sr.clientY);
          return;
        }
        Ct.current = {
          t: da,
          x: sr.clientX,
          y: sr.clientY
        }, (pi = window.getSelection()) == null || pi.removeAllRanges(), sa(), Ge.current = {
          x: sr.clientX,
          y: sr.clientY
        };
        const Ta = wi => {
            const to = Ge.current;
            to && Math.hypot(wi.clientX - to.x, wi.clientY - to.y) > Xgn && (Ge.current = null);
          },
          Wa = wi => {
            const to = Ge.current;
            sa(), to && (Math.hypot(wi.clientX - to.x, wi.clientY - to.y) > Xgn || Ea());
          };
        Oe.current = {
          move: Ta,
          up: Wa
        }, window.addEventListener("pointermove", Ta), window.addEventListener("pointerup", Wa), window.addEventListener("pointercancel", Wa), window.addEventListener("mousemove", Ta), window.addEventListener("mouseup", Wa);
      }, [sa, ea, e.id, Ea, v, _]),
      tn = g.useCallback((sr, da = !1, la) => {
        var pi;
        if (pln({
          hasUpstreamText: !!$n.current,
          aiGenerated: ((pi = Ae.current) == null ? void 0 : pi.aiGenerated) === !0,
          markAiGenerated: da
        })) {
          const wi = {
            ...(Ae.current || {}),
            textNodeDisplayText: sr.trim() ? sr : void 0,
            ...(la !== void 0 ? {
              textNodeUserFormatted: la
            } : {})
          };
          Ae.current = wi, n(e.id, {
            settings: wi
          });
          return;
        }
        const Wa = {
          ...(Ae.current || {}),
          text: sr,
          aiGenerated: da,
          textNodeDisplayText: void 0,
          ...(la !== void 0 ? {
            textNodeUserFormatted: la
          } : {})
        };
        Ae.current = Wa, n(e.id, {
          settings: Wa,
          prompt: sr,
          content: sr
        });
      }, [e.id, n]);
    g.useEffect(() => {
      var la, Ta;
      const sr = !!_r,
        da = Uot({
          hasUpstreamText: sr,
          aiGenerated: ((la = e.settings) == null ? void 0 : la.aiGenerated) === !0,
          showUpstreamPreview: Ot
        });
      if (Re.current && da) {
        const Wa = Le.current,
          pi = Ke.current,
          wi = Wa ? lR(Wa) : (pi == null ? void 0 : pi.value) ?? De.current,
          to = pV(wi);
        to.trim() && tn(to, !1, HL(to)), Re.current = !1, Me(!1);
        return;
      }
      if (!sr) {
        const Wa = EUe(Ae.current);
        if (!Wa.trim()) return;
        tn(Wa, !1, !!((Ta = Ae.current) != null && Ta.textNodeUserFormatted));
      }
    }, [(Ti = e.settings) == null ? void 0 : Ti.aiGenerated, tn, Ot, _r]);
    const Lr = g.useCallback(sr => {
        if (Le.current = sr, !sr) return;
        const da = !!sr.querySelector(":scope > .text-node-rich-root");
        (Xe.current || !sr.childElementCount || da) && (Xe.current = !1, Rct(sr, De.current, t, !0), pa());
      }, [t, pa]),
      br = g.useCallback(sr => {
        Ke.current = sr, !(!sr || !Xe.current) && (Xe.current = !1, pa());
      }, [pa]),
      Jr = g.useCallback(() => {
        const sr = Le.current ?? Ke.current;
        if (!sr) return;
        const da = $$e(sr);
        Jn.current = {
          scrollTop: da.scrollTop,
          scrollLeft: da.scrollLeft
        };
      }, []),
      Kr = g.useCallback(sr => {
        if (We.current = sr, !sr) return;
        const da = Jn.current;
        da && (sr.scrollTop = da.scrollTop, sr.scrollLeft = da.scrollLeft, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            Jn.current === da && (Jn.current = null);
          });
        }));
      }, []),
      ir = g.useCallback(sr => {
        const da = pV(sr);
        De.current = da, Jr(), da !== Vt && tn(da, !1, !1), Re.current = !1, Me(!1);
      }, [Jr, Vt, tn]),
      Hr = g.useCallback(sr => {
        if (He.current = sr, !sr || !(Ve.current || !sr.innerHTML.trim())) return;
        const la = Ve.current ? De.current : vn;
        Ve.current = !1, Rct(sr, la, t, !ta && !X), dwe(sr);
        const Wa = it.current;
        if (Wa != null) {
          it.current = null, requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              qgn(sr, Wa), dwe(sr);
            });
          });
          return;
        }
        sr.focus(), dwe(sr);
      }, [vn, X, t, ta]),
      ha = g.useCallback(sr => {
        vt(sr), Ue.current = sr, et.current !== null && window.clearTimeout(et.current), et.current = window.setTimeout(() => {
          et.current = null, Tt({
            textNodeDraftPrompt: sr
          });
        }, 300);
      }, [Tt]),
      Ga = g.useCallback(() => {
        gt(!1), qe("enter"), St(!1), Qt(null), _t.current = null, queueMicrotask(() => {
          n(e.id, {
            settings: {
              ...(Ae.current || {}),
              textNodeFullscreen: !1
            }
          });
        }), requestAnimationFrame(() => {
          La();
        });
      }, [e.id, La, n]),
      Za = g.useCallback(() => {
        const sr = !lt,
          da = X ? O.getSnapshot().text : vn;
        if (sr) {
          Ve.current = !0, La();
          let pi = null;
          if (Fe) {
            if (ar && Le.current) {
              const to = Le.current;
              pi = Wgn(to), De.current = gj(lR(to)), Ye.current = !0, Ae.current = {
                ...(Ae.current || {}),
                text: De.current,
                textNodeUserFormatted: !0
              };
            } else if (Ke.current) {
              const to = Ke.current;
              pi = to.selectionStart ?? 0, De.current = gj(to.value), Ye.current = !1, Ae.current = {
                ...(Ae.current || {}),
                text: De.current,
                textNodeUserFormatted: !1
              };
            } else De.current = da || "", Ye.current = Ya && !X;
            Me(!1);
          } else De.current = da || "", Ye.current = Ya && !X;
          it.current = pi, At.current += 1;
          const wi = t0n(It.current);
          _t.current = wi, Qt(mV()), qe(wi ? "enter" : "show"), St(!wi), gt(!0), queueMicrotask(() => {
            n(e.id, {
              settings: {
                ...(Ae.current || {}),
                textNodeFullscreen: !0
              }
            });
          });
          return;
        }
        if (Yt === "exit") return;
        const la = He.current;
        if (la) {
          const pi = gj(lR(la));
          De.current = pi, tn(pi, !1, Ye.current || Ya);
        }
        const Ta = _t.current ?? t0n(It.current);
        _t.current = Ta, p0o(Ta ? Q6 + 48 : 80), La();
        const Wa = ++At.current;
        if (!Ta) {
          Ga();
          return;
        }
        St(!0), qe("exit"), requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            At.current === Wa && St(!1);
          });
        }), window.setTimeout(() => {
          At.current === Wa && Ga();
        }, Q6 + 48);
      }, [vn, Ga, O, X, lt, Fe, e.id, tn, La, Yt, Ya, n, ar]);
    g.useLayoutEffect(() => {
      if (!lt || Yt !== "enter" || !_t.current) return;
      Qt(mV());
      const sr = requestAnimationFrame(() => St(!0)),
        da = window.setTimeout(() => qe("show"), dNe);
      return () => {
        cancelAnimationFrame(sr), window.clearTimeout(da);
      };
    }, [lt, Yt]), g.useEffect(() => {
      !lt || X || _a || it.current == null && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          var sr;
          (sr = He.current) == null || sr.focus();
        });
      });
    }, [lt, X, _a]);
    const va = g.useCallback(() => {
      var la, Ta, Wa;
      const sr = lt ? He.current : Le.current;
      if (sr && !X) {
        (la = navigator.clipboard) == null || la.writeText(lR(sr));
        return;
      }
      const da = (X ? Wn ? ki : O.getSnapshot().text : "") || Wr || vn || ba || ((Ta = e.settings) == null ? void 0 : Ta.text) || e.prompt || "";
      da && ((Wa = navigator.clipboard) == null || Wa.writeText(da));
    }, [vn, ba, e.prompt, (Gi = e.settings) == null ? void 0 : Gi.text, Wr, X, lt, Wn, ki, O]);
    g.useEffect(() => {
      if (!Ot || Fe || X || b !== e.id) return;
      const sr = da => {
        var Wa, pi;
        if (!((da.ctrlKey || da.metaKey) && da.key.toLowerCase() === "c") || (Wa = window.getSelection()) != null && Wa.toString().trim()) return;
        const la = da.target;
        if (la && (la.tagName === "INPUT" || la.tagName === "TEXTAREA" || la.isContentEditable)) return;
        const Ta = (Wr || "").trim();
        Ta && (da.preventDefault(), da.stopPropagation(), (pi = navigator.clipboard) == null || pi.writeText(Ta));
      };
      return window.addEventListener("keydown", sr, !0), () => window.removeEventListener("keydown", sr, !0);
    }, [X, Fe, e.id, b, Ot, Wr]);
    const Kt = g.useCallback(sr => {
        f(la => (la == null ? void 0 : la.nodeId) === e.id ? null : la);
        const da = {
          ...(Ae.current || {}),
          textNodeBackgroundColor: sr || void 0
        };
        Ae.current = da, n(e.id, {
          settings: da
        });
      }, [e.id, f, n]),
      Pr = g.useCallback((sr = !0, da) => {
        queueMicrotask(() => {
          var Ho, jo, Ls;
          const la = da ?? Le.current;
          if (!la) return;
          const Ta = pV(lR(la)),
            Wa = String(((Ho = Ae.current) == null ? void 0 : Ho.textNodeDisplayText) ?? ((jo = Ae.current) == null ? void 0 : jo.text) ?? ((Ls = Kn.current) == null ? void 0 : Ls.prompt) ?? ""),
            pi = $go(Ta, Wa);
          if (pi !== Ta) {
            const _s = Wgn(la);
            Rct(la, pi, t, !0), qgn(la, Math.min(_s, la.innerText.length));
          }
          const wi = window.getSelection();
          wi != null && wi.rangeCount && la.contains(wi.anchorNode) && (Ce.current = wi.getRangeAt(0).cloneRange(), rt(_Pe(la, wi))), De.current = pi;
          const to = HL(pi);
          Ye.current = to, tn(pi, !1, to);
        });
      }, [t, tn]),
      kr = g.useCallback(sr => {
        var pi;
        let da = Vt || "";
        lt && He.current ? da = lR(He.current) : Fe && Le.current ? da = lR(Le.current) : Fe && Ke.current && (da = Ke.current.value);
        const la = pV(da),
          Ta = HL(la);
        if (Fe && Ta !== Ya && (De.current = la, Ye.current = Ta, ze(la), Xe.current = !0), pln({
          hasUpstreamText: !!$n.current,
          aiGenerated: ((pi = Ae.current) == null ? void 0 : pi.aiGenerated) === !0
        })) {
          const wi = {
            ...(Ae.current || {}),
            textNodeDisplayText: la.trim() ? la : void 0,
            textNodeFontSize: sr,
            textNodeUserFormatted: Ta
          };
          Ae.current = wi, n(e.id, {
            settings: wi
          });
          return;
        }
        n(e.id, {
          settings: {
            ...(Ae.current || {}),
            text: la,
            textNodeDisplayText: void 0,
            textNodeFontSize: sr,
            textNodeUserFormatted: Ta
          },
          prompt: la,
          content: la
        });
      }, [Vt, lt, Fe, e.id, Ya, n]),
      Mr = g.useCallback(sr => {
        if (_a || X) return;
        if (sr === "sizeSmall" || sr === "sizeMedium" || sr === "sizeLarge") {
          kr(sr === "sizeSmall" ? "sm" : sr === "sizeLarge" ? "lg" : "md");
          return;
        }
        const da = lt && He.current ? He.current : Fe && Le.current ? Le.current : null;
        if (da) {
          const to = window.getSelection(),
            Ho = to != null && to.rangeCount && da.contains(to.anchorNode) && da.contains(to.focusNode) ? to.getRangeAt(0).cloneRange() : Ce.current;
          qgo(da, sr, Ho);
          const jo = window.getSelection();
          jo != null && jo.rangeCount && da.contains(jo.anchorNode) && (Ce.current = jo.getRangeAt(0).cloneRange(), rt(_Pe(da, jo))), Pr(!0, da), requestAnimationFrame(() => {
            rt(_Pe(da, window.getSelection()));
          });
          return;
        }
        const la = Fe ? Ke.current : null,
          Ta = (la == null ? void 0 : la.value) ?? Vt ?? "",
          Wa = (la == null ? void 0 : la.selectionStart) ?? 0,
          pi = (la == null ? void 0 : la.selectionEnd) ?? Ta.length,
          wi = Kgo(Ta, Wa, pi, sr);
        De.current = wi, Ye.current = !0, Xe.current = !0, ze(wi), tn(wi, !1, HL(wi)), rt(Vgn(wi));
      }, [kr, Vt, X, t, lt, Fe, _a, tn, Pr]);
    g.useEffect(() => {
      const sr = It.current;
      if (!sr) return;
      const da = la => {
        const Ta = Fe ? Le.current ?? Ke.current : We.current,
          Wa = Ta ? $$e(Ta) : null;
        if (!Wa || Wa.scrollHeight <= Wa.clientHeight + 1) return;
        la.preventDefault(), la.stopPropagation(), la.stopImmediatePropagation();
        const pi = Wa.scrollHeight - Wa.clientHeight;
        Wa.scrollTop = Math.max(0, Math.min(pi, Wa.scrollTop + la.deltaY));
      };
      return sr.addEventListener("wheel", da, {
        passive: !1,
        capture: !0
      }), () => {
        sr.removeEventListener("wheel", da, {
          capture: !0
        });
      };
    }, [Fe]);
    const Hn = g.useMemo(() => ft.map(sr => sr.url), [ft]),
      $t = j1(Hn, {
        useThumbnail: !0,
        preferConstantDisplay: !0,
        useOriginal: Hn.some(sr => typeof sr != "string" ? !1 : !!(sr.startsWith("blob:") || sr.startsWith("data:video/") || sr.startsWith("data:image/") && sr.length < 12e4 || (sr.startsWith("http://") || sr.startsWith("https://")) && /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(sr)))
      }),
      je = g.useMemo(() => ft.map((sr, da) => {
        const la = $t[da],
          Ta = H8(la == null ? void 0 : la.content),
          Wa = sr.url,
          pi = Ta && !Tu(Ta) ? Ta : "",
          wi = Wa && !Tu(Wa) ? Wa : "",
          to = pi || wi,
          Ho = Tu(Wa) || Tu(Ta);
        return {
          ...sr,
          originalUrl: Wa || sr.assetId || "",
          url: to,
          isLoading: (la == null ? void 0 : la.isLoading) ?? !1,
          hasError: ((la == null ? void 0 : la.hasError) ?? !1) && !to && Ho
        };
      }), [ft, $t]),
      Qe = g.useMemo(() => {
        if (!r || !a) return new Map();
        const sr = new Map();
        return r.filter(la => la.to === e.id && (!la.inputType || la.inputType === "default")).forEach(la => {
          const Ta = S.get(la.from);
          Ta && Nct(Ta).forEach(Wa => {
            Wa && sr.set(Wa, la.from);
          });
        }), sr;
      }, [r, S, e.id]),
      Mt = g.useCallback((sr, da) => {
        if (da.preventDefault(), da.stopPropagation(), !i) return;
        const la = wi => {
          i(to => to.filter(Ho => !(Ho.from === wi && Ho.to === e.id && (!Ho.inputType || Ho.inputType === "default"))));
        };
        if (sr.sourceNodeId) {
          la(sr.sourceNodeId);
          return;
        }
        const Ta = [sr.originalUrl, sr.url, sr.assetId, sr.originalUrl ? H8(sr.originalUrl) : "", sr.url ? H8(sr.url) : ""].filter(wi => !!(wi && String(wi).trim()));
        for (const wi of Ta) {
          const to = Qe.get(wi);
          if (to) {
            la(to);
            return;
          }
        }
        if (!r || !a) return;
        const Wa = new Set(Ta),
          pi = r.filter(wi => wi.to === e.id && (!wi.inputType || wi.inputType === "default"));
        for (const wi of pi) {
          const to = S.get(wi.from);
          if (!to) continue;
          const Ho = Nct(to);
          if ([...Wa].some(Ls => Ho.has(Ls) || Ho.has(H8(Ls)))) {
            la(wi.from);
            return;
          }
        }
      }, [Qe, e.id, i, r, S]),
      cn = g.useCallback((sr, da) => {
        if (sr === da || sr < 0 || da < 0 || sr >= ft.length || da >= ft.length) return;
        const la = [...ft],
          [Ta] = la.splice(sr, 1);
        la.splice(da, 0, Ta), n(e.id, {
          settings: {
            ...e.settings,
            inputItemOrder: la.map(Wa => Wa.url)
          }
        });
      }, [ft, e.id, e.settings, n]),
      Qn = g.useCallback((sr, da) => {
        const la = String(sr || "").trim(),
          Ta = ft.find(Wa => Wa.url === la) || je.find(Wa => Wa.url === la || Wa.originalUrl === la);
        if (Ta) {
          Mt({
            url: Ta.url,
            type: Ta.type,
            originalUrl: "originalUrl" in Ta && typeof Ta.originalUrl == "string" ? Ta.originalUrl : Ta.url,
            assetId: Ta.assetId,
            sourceNodeId: Ta.sourceNodeId
          }, da);
          return;
        }
        Mt({
          url: la,
          type: "image"
        }, da);
      }, [Mt, je, ft]),
      Lt = g.useCallback((sr, da) => {
        cn(sr, da);
      }, [cn]),
      ct = g.useCallback(async sr => {
        var co, ls, Ms, ks, Yo, Vc, zd, Xh, Pp, Ub, t0, yu, oo;
        if (X) return;
        const da = fn.current;
        if (fn.current = !1, da && APe((co = Kn.current) == null ? void 0 : co.settings)) return;
        const la = en.current,
          Ta = Vn.current,
          Wa = Fde({
            nodeId: e.id,
            connections: Ta,
            nodes: la
          }).trim(),
          pi = JBt(e.id, Ta, la),
          wi = (sr || "").trim(),
          to = (ls = Kn.current) == null ? void 0 : ls.settings,
          Ho = String((to == null ? void 0 : to.hiddenPromptTemplate) || "").trim(),
          jo = !!(to != null && to.imageInfoJson) && Ho && (!wi || huo(wi)),
          Ls = !wi && !jo && wn && Wa.length > 0;
        let _s;
        if (jo) _s = Ho;else if (Ls) _s = Wa;else if (wi) _s = zke(wi, Wa || _r || "", pi);else {
          const Ps = (((Ms = e.settings) == null ? void 0 : Ms.text) || e.prompt || "").trim();
          _s = zke(Ps, Wa || _r || "", pi);
        }
        const Pl = _s.trim().length > 0,
          xl = je.some(Ps => Ps.url && !Ps.isLoading && !Ps.hasError);
        if (!Pl && !xl) {
          ZRe("请输入文字或连接图片/视频");
          return;
        }
        if (ft.length > 0 && je.some(Ps => Ps.isLoading)) {
          ZRe("内容正在加载中，请稍候...");
          return;
        }
        Me(!1), ye.current = "", fe.current !== null && (cancelAnimationFrame(fe.current), fe.current = null), re(""), O.setStatus("正在生成…"), hu(e.id, !0), Z(!0), Tt({
          textNodeIsAnalyzing: !0
        });
        const Bi = new AbortController();
        (ks = ie.current) == null || ks.abort(), ie.current = Bi;
        const Do = BS("analysis", {
          id: crypto.randomUUID(),
          label: "文字分析",
          modelName: ((Yo = d.find(Ps => Ps.id === R)) == null ? void 0 : Yo.modelName) || R,
          signal: Bi.signal
        });
        try {
          if (window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(R)) {
            const savedText = String(Kn.current.settings?.text || Kn.current.prompt || "");
            const localAdapter = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__;
            if (!localAdapter?.generateChat) throw new Error("本地模型入口尚未就绪，请重新打开应用");
            const localReply = await localAdapter.generateChat({modelId:R,prompt:_s,signal:Bi.signal,
              references:je.filter(item=>item.url&&!item.isLoading&&!item.hasError),nodes:la});
            Bi.signal.throwIfAborted();
            if (String(Kn.current.settings?.text || Kn.current.prompt || "") !== savedText) throw new Error("文本已修改，本次回复未覆盖新内容");
            const localText = Kn.current.settings?.imageInfoJson ? lgn(SPe(localReply.text)) : SPe(localReply.text);
            n(e.id, {errorMsg:void 0}), re(localText), O.setStatus(""), Tt({text:localText,aiGenerated:!0,textNodeUserFormatted:HL(localText),error:void 0,errorMsg:void 0,
              textNodeDisplayText:void 0,_executeTrigger:void 0,_chatCompletedAt:Date.now()}, {prompt:localText,content:localText});
            if (localText.trim()) Do();
            return;
          }
          if (Mu(R)) {
            const Eo = Kn.current.settings || {},
              Zs = String(Eo.text || Kn.current.prompt || ""),
              Qs = [...(Eo.codexTextOutput === Zs ? Eo.codexTextMessages || [] : []), {
                id: crypto.randomUUID(),
                role: "user",
                content: _s || "请根据参考素材完成创作任务。",
                files: je.filter(Oc => Oc.url && !Oc.isLoading && !Oc.hasError).map((Oc, km) => ({
                  name: `参考${km + 1}`,
                  type: Oc.type === "video" ? "video/mp4" : Oc.type === "audio" ? "audio/mpeg" : "image/png",
                  preview: Oc.url,
                  isImage: Oc.type === "image",
                  isVideo: Oc.type === "video",
                  isAudio: Oc.type === "audio",
                  _assetId: Oc.assetId
                }))
              }];
            L(null);
            const Xo = await iQe({
              messages: Qs,
              modelId: R,
              effort: ne,
              webSearch: ae,
              instructions: "你是专业的提示词工程师和创意总监。根据用户指令与参考素材完成创作，直接输出可用结果；不要主动描述图片或添加解释性前缀。默认使用中文，遵守用户的格式要求。",
              placeholder: {
                id: crypto.randomUUID(),
                role: "assistant",
                content: ""
              },
              signal: Bi.signal,
              onUpdate: Oc => {
                re(Oc.content), L(Oc);
              },
              onFiles: (Oc, km) => {
                const gl = Qs.find(oe => oe.id === Oc);
                gl && (gl.files = km);
              }
            });
            if (Bi.signal.throwIfAborted(), String(((Vc = Kn.current.settings) == null ? void 0 : Vc.text) || Kn.current.prompt || "") !== Zs) throw new Error("文本已修改，本次 Codex 回复未覆盖新内容");
            const fl = Eo.imageInfoJson ? lgn(SPe(Xo.content)) : SPe(Xo.content);
            L(Xo), O.setStatus(""), Tt({
              text: fl,
              aiGenerated: !0,
              textNodeUserFormatted: HL(fl),
              textNodeDisplayText: void 0,
              _executeTrigger: void 0,
              _chatCompletedAt: Date.now(),
              codexTextMessages: [...Qs, Xo],
              codexTextOutput: fl
            }, {
              prompt: fl,
              content: fl
            }), fl.trim() && Do();
            return;
          }
          const Ps = R,
            xi = d.find(Eo => Eo.type === "Chat" && Eo.id === Ps),
            ld = (Eo, Zs) => E5(Eo, Zs, xi == null ? void 0 : xi.nativeChat);
          FS(Ps) && (await ace());
          const Ic = (Qa.getResolvedModelBaseUrl((xi == null ? void 0 : xi.id) || Ps) || (xi == null ? void 0 : xi.url) || "https://ai.comfly.org").replace(/\/+$/, ""),
            fc = nG(Ic) || rG((xi == null ? void 0 : xi.id) || Ps),
            bu = hI((xi == null ? void 0 : xi.id) || Ps) || I3(Ic) || Eb((xi == null ? void 0 : xi.id) || Ps) || Ny(Ic),
            qd = cu(xi == null ? void 0 : xi.key, u, void 0, {
              platformGroup: fc || bu ? Hg : ce,
              modelId: (xi == null ? void 0 : xi.id) || Ps,
              modelName: (xi == null ? void 0 : xi.modelName) || Ps,
              baseUrl: Ic,
              modelSavedApiKeyId: xi == null ? void 0 : xi.savedApiKeyId
            }),
            vu = Ic,
            wu = (xi == null ? void 0 : xi.isCustom) && jP(vu),
            Df = sve(xi, vu),
            xg = Math.min(16e3, Df ?? 16e3),
            Lf = Eb((xi == null ? void 0 : xi.id) || Ps) || Ny(vu);
          if (!qd && !Hk(xi, vu)) {
            ZRe("请先配置 API Key"), O.setStatus(""), Z(!1);
            return;
          }
          const Jh = qw(vu),
            Zh = Lf ? rhe(qd) : {
              ...(qd ? {
                Authorization: `Bearer ${qd}`
              } : {}),
              "Content-Type": "application/json"
            },
            Bl = {
              modelId: (xi == null ? void 0 : xi.id) || Ps,
              baseUrl: vu
            },
            ql = wu ? "按用户要求用中文回答。分析图片时，以本次附图实际可见的主体、动作、颜色和构图为依据；看不清的内容明确说明，不编造场景。用户要求创作或提示词时再进行创作。默认简洁，遵守用户指定的格式。" : `你是一个专业的AI提示词工程师和创意总监。你的任务是：严格按照用户的指令要求，使用提供的参考图片/视频来完成任务。

【核心原则】
1. 用户的指令是最高优先级 - 必须严格执行用户要求的任务
2. 图片只是参考素材 - 不要主动描述图片，除非用户明确要求
3. 输出要直接可用 - 生成的内容应该可以直接用于AI绘画/视频生成

【禁止行为】
❌ 不要自作主张描述图片内容（除非用户要求"描述图片"）
❌ 不要添加解释性前缀（如"好的，这是..."、"以下是..."）
❌ 不要分别列举每张图片的内容（除非用户要求）
❌ 不要偏离用户的指令去做其他事情
❌ 除非用户明确要求输出矢量图/网页图或「用代码复现」，否则禁止输出 SVG、HTML、Mermaid 等绘图源代码来「复刻」参考图；用户要提示词/说明文字就只给自然语言提示词或说明

【必须遵守】
✅ 如果用户要求"生成提示词"，就输出提示词，不要描述图片
✅ 如果用户要求"结合图一和图二"，就合成元素，不要分别描述
✅ 如果用户要求"规划场景"，就输出场景方案，不要分析图片
✅ 严格遵守用户指定的格式要求（如字数、段落数等）
✅ 用中文输出（除非用户要求英文）

记住：你是在执行用户的创作指令，不是在写图片分析报告！`,
            Kd = [],
            uh = new Map(),
            Lc = je.filter(Eo => Eo.url && !Eo.isLoading && !Eo.hasError);
          if (wu && Lc.length !== ft.length) throw new Error("参考素材未完整加载，请重新连接图片后发送；本次没有发送纯文字请求。");
          if (wu && Lc.length > 0 && O.setStatus("正在读取参考素材…"), Lc.length > 0) for (let Eo = 0; Eo < Lc.length; Eo++) {
            const Zs = Lc[Eo],
              Wo = typeof Zs.originalUrl == "string" ? Zs.originalUrl.trim() : "",
              Qs = Wo && (Wo.startsWith("http") || Wo.startsWith("blob:") || Wo.startsWith("data:") || Wo.startsWith("content_ref:") || Wo.startsWith("local-asset:")) ? Wo : Zs.url;
            let Xo = H8(Qs);
            if (!Xo) {
              if (wu) throw new Error(`参考素材 ${Eo + 1} 为空，请重新连接后发送。`);
              continue;
            }
            try {
              if (Zs.type === "video") Xo = await Qj(Xo, {
                useOss: Te,
                apiKey: qd,
                baseUrl: vu,
                assetId: Zs.assetId,
                forceInline: Lf && rqe(K)
              });else if (Xo = await x3(Xo, {
                useOss: !wu && Te,
                ...fy,
                assetId: Zs.assetId,
                purpose: "chat",
                apiKey: qd,
                baseUrl: vu,
                imageAsBase64: wu || Ne
              }), wu && !Xo.startsWith("data:image/")) throw new Error("本地识图需要可读取的图片内容，请重新连接参考图。");
            } catch (oe) {
              console.error(`[TextNode] Failed to resolve media ${Eo + 1}:`, oe);
              const Se = oe instanceof Error ? oe.message : "媒体处理失败",
                Be = `${Zs.type === "video" ? "视频" : "图片"}${Eo + 1}处理失败：${Se}`;
              qi(Be), O.setStatus(Be), Z(!1);
              return;
            }
            const fl = Xo.startsWith("data:image/"),
              Oc = Xo.startsWith("http://") || Xo.startsWith("https://"),
              km = Xo.startsWith("data:video/"),
              gl = Zs.type === "video" && (Xo.startsWith("http://") || Xo.startsWith("https://"));
            if (Zs.type === "video" && (km || gl)) Zs.assetId && uh.set(Xo, Zs.assetId), Kd.push(Lf ? Jae("video", Xo) : {
              type: "image_url",
              image_url: {
                url: Xo,
                detail: "high"
              }
            });else if (fl || Oc) Kd.push(Lf ? Jae("image", Xo) : {
              type: "image_url",
              image_url: {
                url: Xo,
                detail: "high"
              }
            });else if (!km && !gl && !fl && !Oc) {
              if (wu) throw new Error(`参考素材 ${Eo + 1} 格式无效，本次未发送。`);
              console.warn("[TextNode] Skipping invalid URL format:", typeof Xo == "string" ? Xo.slice(0, 50) : Xo);
            }
          }
          const Xp = _s.trim(),
            Qd = Lc.some(Eo => Eo.type === "video") ? "请基于这段视频，分析其内容、风格和节奏，生成适合AI绘画/视频的提示词或场景描述。" : "请基于这张图片，生成一个适合AI绘画的详细提示词（Prompt）。要求：保留图片的核心视觉元素、风格、氛围，输出格式为单段连贯的提示词文本。",
            Xv = !!((Xh = (zd = Kn.current) == null ? void 0 : zd.settings) != null && Xh.imageInfoJson);
          let $b = "";
          if (Xv) {
            if (!Kd.some(Eo => Eo.type === "image_url" || Eo.type === "video_url")) throw new Error("参考图还没准备好，请等缩略图出现后再发送");
            $b = Xp || Ho;
          } else if (Lc.length > 0) {
            const Eo = Xp || Qd,
              Zs = Lc.length,
              Wo = Lc.some(Qs => Qs.type === "video") ? "参考图片/视频" : "张参考图片";
            $b = wu ? Eo : `【任务】
${Eo}

【说明】上方已提供 ${Zs} ${Wo}，请严格按照任务要求完成，直接输出结果，不要描述媒体内容。`;
          } else $b = Xp || "请根据当前上下文生成一份清晰、可直接使用的文本内容。";
          Kd.push({
            type: "text",
            text: $b
          });
          const Jl = (xi == null ? void 0 : xi.modelName) || Ps,
            td = Kd.some(Eo => Eo.type === "image_url" || Eo.type === "video_url");
          wu && O.setStatus(td ? `已发送 ${Lc.length} 份参考素材，等待本地模型读取并回复…` : "等待本地模型回复…");
          let Ym = td ? Kd : ((Pp = Kd.find(Eo => Eo.type === "text")) == null ? void 0 : Pp.text) || "请输入你的需求";
          const hh = Wk(Ps, Jl),
            Jp = !(xi != null && xi.nativeChat) && hh && H === "gemini-official",
            Hc = ae && ((Ub = xi == null ? void 0 : xi.chatCapabilities) == null ? void 0 : Ub.tools) !== !1 && wM(Ps),
            Rp = F2(Ps, Q, Jl),
            Xm = !(Oce(Ps) || Oce(Jl)) && !Lf && !(xi != null && xi.nativeChat) && T0t({
              useGeminiOfficial: Jp,
              webSearchEnabled: Hc,
              hasMedia: td,
              protocol: xi != null && xi.isCustom ? xi.chatProtocol : void 0
            }),
            Zp = [{
              role: "system",
              content: ql
            }, {
              role: "user",
              content: Ym
            }];
          let Of = 0;
          const Jm = () => {
              if (fe.current = null, q5t(Of)) {
                fe.current = requestAnimationFrame(Jm);
                return;
              }
              Of = performance.now(), re(ye.current);
            },
            Js = Eo => {
              ye.current = tg(Eo), wu && ye.current && O.setStatus(""), fe.current === null && (fe.current = requestAnimationFrame(Jm));
            };
          let uc = null,
            ep = !1;
          if (Xm) {
            const Eo = Wo => $i($Y(vu), {
              method: "POST",
              headers: Zh,
              body: JSON.stringify({
                ...M0t({
                  modelName: Jl,
                  messages: Zp,
                  webSearch: Wo != null,
                  stream: !0,
                  toolType: Wo || "web_search_preview",
                  reasoningEffort: Rp
                }),
                ...(Df ? {
                  max_output_tokens: xg
                } : {})
              }),
              signal: Bi.signal
            });
            console.log(`[TextNode] 跟随侧栏使用 Responses API${Hc ? "（联网）" : ""}`);
            let Zs = await Eo(Hc ? "web_search_preview" : null);
            if (Zs.ok) uc = Zs, ep = !0;else {
              let Wo = await Zs.text(),
                Qs = null;
              if (Hc && z2e(Zs.status, Wo) && (console.warn("[TextNode] 网关不识别 web_search_preview，重试 web_search..."), Qs = await Eo("web_search"), Qs.ok ? (uc = Qs, ep = !0) : Wo = await Qs.text()), !uc) if (Hc && F2e(Zs.status, Wo)) console.warn("[TextNode] 联网工具不可用，Responses 改为无工具重试…"), Zs = await Eo(null), Zs.ok ? (uc = Zs, ep = !0) : (console.warn("[TextNode] Responses 失败，回退 chat/completions"), uc = await ld(Jh, {
                method: "POST",
                headers: Zh,
                body: JSON.stringify(sx({
                  model: Jl,
                  messages: [{
                    role: "system",
                    content: ql
                  }, {
                    role: "user",
                    content: Ym
                  }],
                  max_tokens: xg,
                  temperature: .7,
                  stream: !0
                }, Rp, Bl)),
                signal: Bi.signal
              }));else throw new Error(wu ? Aqt(Zs.status, Wo) : Sv(Zs.status));
            }
          } else Jp ? (console.log("[TextNode] 使用 Gemini 官方格式 streamGenerateContent"), uc = await mx({
            format: "gemini-official",
            baseUrl: vu,
            apiKey: qd,
            modelName: Jl,
            messages: Zp,
            stream: !0,
            reasoningEffort: Rp,
            signal: Bi.signal
          })) : uc = await ld(Jh, {
            method: "POST",
            headers: Zh,
            body: JSON.stringify(sx({
              model: Jl,
              messages: [{
                role: "system",
                content: ql
              }, {
                role: "user",
                content: Ym
              }],
              max_tokens: xg,
              temperature: .7,
              stream: !0
            }, Rp, Bl)),
            signal: Bi.signal
          });
          if (!uc) throw new Error("API 请求未返回有效响应");
          if (!uc.ok) {
            const Eo = await uc.text();
            console.error("[TextNode] API error:", Eo);
            const Zs = Array.isArray(Ym) ? Ym.filter(Wo => {
              var Qs;
              return (Wo == null ? void 0 : Wo.type) === "video_url" && /^https?:\/\//i.test(String(((Qs = Wo.video_url) == null ? void 0 : Qs.url) || ""));
            }) : [];
            if (Lf && d9n(uc.status, Eo) && Zs.length > 0) {
              console.warn("[TextNode] 小米拉不到图床视频 URL，改走 base64 内联重试");
              const Wo = [];
              for (const Qs of Ym) {
                const Xo = String(((t0 = Qs == null ? void 0 : Qs.video_url) == null ? void 0 : t0.url) || "").trim();
                if ((Qs == null ? void 0 : Qs.type) === "video_url" && /^https?:\/\//i.test(Xo)) {
                  const fl = await Qj(Xo, {
                    useOss: Te,
                    apiKey: qd,
                    baseUrl: vu,
                    forceInline: !0,
                    assetId: uh.get(Xo)
                  });
                  Wo.push(Jae("video", fl));
                } else Wo.push(Qs);
              }
              if (Ym = Wo, uc = await ld(Jh, {
                method: "POST",
                headers: Zh,
                body: JSON.stringify(sx({
                  model: Jl,
                  messages: [{
                    role: "system",
                    content: ql
                  }, {
                    role: "user",
                    content: Ym
                  }],
                  max_tokens: xg,
                  temperature: .7,
                  stream: !0
                }, Rp, Bl)),
                signal: Bi.signal
              }), !uc.ok) {
                const Qs = await uc.text();
                throw console.error("[TextNode] API error after inline retry:", Qs), new Error(Kqt(uc.status, Qs));
              }
            } else throw new Error(Lf ? Kqt(uc.status, Eo) : wu ? Aqt(uc.status, Eo) : Sv(uc.status));
          }
          let tp = "",
            xm;
          if (ep || uc.url.includes("/v1/responses") ? tp = await P0t(uc, Js) : tp = await qS({
            response: uc,
            format: Jp ? "gemini-official" : "openai",
            onDelta: Js,
            logPrefix: "[TextNode]",
            onComplete: Eo => {
              xm = Eo;
            }
          }), !tp.trim() && !wu) {
            console.warn("[TextNode] 正文为空，自动重试一次"), Js(""), O.setStatus(J6n(xm) ? "这次只回了思考、没有正文。正在重试一次…" : "网关返回的 content 是空的。正在重试一次…");
            const Eo = Jp ? await mx({
              format: "gemini-official",
              baseUrl: vu,
              apiKey: qd,
              modelName: Jl,
              messages: Zp,
              stream: !0,
              reasoningEffort: Rp,
              signal: Bi.signal
            }) : await ld(Jh, {
              method: "POST",
              headers: Zh,
              body: JSON.stringify(sx({
                model: Jl,
                messages: [{
                  role: "system",
                  content: ql
                }, {
                  role: "user",
                  content: Ym
                }],
                max_tokens: xg,
                temperature: .7,
                stream: !0
              }, Rp, Bl)),
              signal: Bi.signal
            });
            Eo.ok && (tp = await qS({
              response: Eo,
              format: Jp ? "gemini-official" : "openai",
              onDelta: Js,
              logPrefix: "[TextNode] [空响应重试]",
              onComplete: Zs => {
                xm = Zs;
              }
            }));
          }
          if (!tp.trim()) throw new Error(wu ? "本地模型未返回正文，请查看本地对话运行日志并检查模型与识图文件是否配套。" : $be(xm));
          fe.current !== null && (cancelAnimationFrame(fe.current), fe.current = null), O.setStatus("");
          const xd = (oo = (yu = Kn.current) == null ? void 0 : yu.settings) != null && oo.imageInfoJson ? lgn(SPe(tp)) : SPe(tp),
            _m = HL(xd);
          Bi.signal.throwIfAborted(), Tt({
            text: xd,
            aiGenerated: !0,
            textNodeUserFormatted: _m,
            textNodeDisplayText: void 0,
            _executeTrigger: void 0,
            _chatCompletedAt: Date.now()
          }, {
            prompt: xd,
            content: xd
          }), Do();
        } catch (Ps) {
          if (Ps instanceof Error && Ps.name === "AbortError") return;
          console.error("[TextNode] AI analysis failed:", Ps), fe.current !== null && (cancelAnimationFrame(fe.current), fe.current = null), ye.current = "", re("");
          let xi = Ps instanceof Error ? Ps.message : "未知错误";
          const ld = d.find(fc => fc.type === "Chat" && fc.id === R);
          if (ld != null && ld.localLlm && jP(ld.url || "") && /failed to fetch|network|connection|load failed|运行失败/i.test(xi)) {
            xi = `本地对话连接中断，请查看服务运行日志并重启对话服务。${xi}`;
            try {
              const bu = await $p("local_llm_status", {
                providerId: ld.localLlm.providerId
              });
              bu.runtimeError && (xi = bu.runtimeError);
            } catch {}
          }
          if (Bi.signal.aborted) return;
          const Ic = SU(xi);
          if (window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(R)) n(e.id, {errorMsg:Ic,settings:{...Ae.current,error:Ic,errorMsg:Ic,textNodeIsAnalyzing:!1}});
          O.setStatus(Ic), qi(Ic);
        } finally {
          Bi.signal.aborted && (ye.current = "", re(""), O.setStatus("")), ie.current === Bi && (ie.current = null), Z(!1);
        }
      }, [e.id, e.prompt, (hi = e.settings) == null ? void 0 : hi.text, (vo = e.settings) == null ? void 0 : vo.aiGenerated, ft, je, R, ae, d, u, n, X, _r, wn, Te, Ne, H, K, Q, ne, ce, Tt]),
      Dt = g.useRef(0),
      bn = g.useRef(!1),
      Rt = g.useRef(!1),
      fn = g.useRef(!1),
      Zt = g.useRef(null),
      Ln = g.useCallback(sr => {
        Zt.current !== null && window.clearTimeout(Zt.current), Zt.current = window.setTimeout(() => {
          var Ta;
          Zt.current = null;
          const da = (Ta = Kn.current) == null ? void 0 : Ta.settings;
          if (APe(da)) {
            Rt.current = !1;
            return;
          }
          if (X) {
            Rt.current = !0;
            return;
          }
          if (ft.length > 0 && je.some(Wa => Wa.isLoading)) {
            Rt.current = !0;
            return;
          }
          Rt.current = !1, fn.current = !0, ct();
        }, sr);
      }, [ct, X, je, ft.length]);
    g.useEffect(() => () => {
      Zt.current !== null && (window.clearTimeout(Zt.current), Zt.current = null);
    }, []), g.useEffect(() => {
      var da;
      const sr = (da = e.settings) == null ? void 0 : da._executeTrigger;
      if (!sr) {
        bn.current || (bn.current = !0);
        return;
      }
      if (APe(e.settings)) {
        bn.current = !0, Dt.current = sr;
        return;
      }
      if (!bn.current) {
        bn.current = !0, Dt.current = sr, Ln(250);
        return;
      }
      sr !== Dt.current && !X && (Dt.current = sr, Ln(150));
    }, [(ci = e.settings) == null ? void 0 : ci._executeTrigger, ct, X, Ln, e.settings]), g.useEffect(() => {
      if (!Rt.current || X) return;
      if (APe(e.settings)) {
        Rt.current = !1;
        return;
      }
      ft.length > 0 && je.some(da => da.isLoading) || (Rt.current = !1, fn.current = !0, ct());
    }, [je, X, ft.length, ct, e.settings]);
    const tt = g.useCallback(() => {
        Z7(e.id);
        const sr = Ue.current.trim();
        ct(sr);
      }, [ct, e.id]),
      zt = g.useCallback(sr => {
        n(e.id, {
          settings: {
            ...(Ae.current || {}),
            textNodeComposerPromptExpanded: sr
          }
        });
      }, [e.id, n]),
      an = b === e.id || Ht || Fe,
      Rn = !!((ji = e.settings) != null && ji.textNodeComposerPromptExpanded),
      Un = dEe(y, Ht || an),
      er = Number(Un.zoom || 1),
      Cr = eZ(er),
      tr = g.useRef(null),
      kn = g.useMemo(() => `${Cr}:${Rn ? 1 : 0}`, [Cr, Rn]),
      xn = yI({
        hostRef: tr,
        open: Ht && !A,
        zoom: Un.zoom,
        remeasureKey: `${Math.round(Un.x)}:${Math.round(Un.y)}:${kn}`
      }),
      Fn = g.useRef(null),
      cr = g.useRef(null),
      vr = g.useMemo(() => ({
        transition: "none"
      }), []);
    Qp(Fn, "50% 0%", Ht);
    const Wt = g.useCallback(sr => {
      sr.stopPropagation();
      const da = sr.currentTarget.querySelector('[data-scrollable="true"]');
      if (!da) return;
      const la = da.scrollHeight - da.clientHeight;
      la <= 0 || (sr.preventDefault(), da.scrollTop = Math.max(0, Math.min(la, da.scrollTop + sr.deltaY)));
    }, []);
    Qp(cr, "50% 100%", an);
    const Jt = ((ts = e.settings) == null ? void 0 : ts.textNodeBackgroundColor) || "",
      Nn = Jt || "transparent";
    return c.jsxs("div", {
      ref: Ze,
      className: "relative h-full w-full overflow-visible transition-colors pointer-events-none bg-transparent",
      children: [window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(R) && e.errorMsg ? c.jsx("div", {
        role: "alert",
        className: "pointer-events-auto absolute left-0 top-full z-[90] mt-2 w-full rounded-lg border border-red-500/40 bg-zinc-950 px-3 py-2 text-xs text-red-300",
        children: e.errorMsg
      }) : null, an && !lt ? c.jsx("div", {
        className: "pointer-events-auto absolute left-1/2 bottom-full z-[120] -translate-x-1/2",
        style: {
          marginBottom: qdr(u0o)
        },
        onMouseDownCapture: () => La(),
        children: c.jsx("div", {
          ref: cr,
          "data-text-node-chrome": "",
          style: {
            transition: "none",
            willChange: "transform"
          },
          children: c.jsx(Kgn, {
            isDark: t,
            isFullscreen: lt,
            isEditing: Fe && !_a,
            autoHeight: gr,
            onToggleAutoHeight: jr,
            backgroundColor: Jt,
            activeState: $e,
            onAction: Mr,
            onBackgroundColorChange: Kt,
            onCopy: va,
            onToggleFullscreen: Za,
            nodeId: e.id,
            colorPins: Zg(e)
          })
        })
      }) : null, c.jsx("div", {
        ref: It,
        "data-aux-gen-preview": !0,
        className: `pointer-events-auto relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl px-4 py-3${b === e.id ? " nowheel" : ""}`,
        style: {
          backgroundColor: Nn,
          visibility: lt ? "hidden" : void 0
        },
        children: c.jsxs("div", {
          ref: Ft,
          className: "relative w-full flex-1 min-h-0",
          "data-text-node-body": !0,
          children: [X || !Fe ? c.jsx(t0o, {
            stream: O,
            isAnalyzing: X,
            codexSelected: N,
            text: Wr,
            streamTextOverride: Wn ? ki : void 0,
            isDark: t,
            fontClass: jn,
            imageInfoJson: ta && (X || ((Ts = e.settings) == null ? void 0 : Ts.aiGenerated) === !0),
            markdown: _n,
            previewRef: Kr,
            placeholder: x(_r ? "文字由上游节点提供，点击眼睛查看后可编辑、复制" : "双击开始编辑...")
          }) : ar ? c.jsx("div", {
            "data-scrollable": "true",
            "data-node-text-editing": "1",
            className: "pointer-events-auto absolute inset-0 z-20 min-h-0 w-full overflow-y-auto overflow-x-hidden",
            style: {
              overscrollBehavior: "contain"
            },
            onMouseDown: sr => sr.stopPropagation(),
            children: c.jsx("div", {
              ref: Lr,
              "data-node-type": "text-node-rich-editor",
              "data-node-id": e.id,
              "data-node-text-editing": "1",
              contentEditable: !X && !_a,
              suppressContentEditableWarning: !0,
              tabIndex: 0,
              role: "textbox",
              "aria-label": x("文本节点正文"),
              "aria-multiline": "true",
              className: `text-node-rich-root canvas-text-markdown flow-root ${gr ? "min-h-0" : "min-h-full"} w-full select-text outline-none ${jn}`,
              onMouseDown: sr => sr.stopPropagation(),
              onBlur: sr => {
                if (_a || Zgn(sr.relatedTarget)) return;
                const da = pV(lR(sr.currentTarget));
                De.current = da, Jr(), da !== Vt && tn(da, !1, HL(da)), Re.current = !1, Me(!1);
              }
            })
          }, "text-node-rich-editor") : c.jsx(E1t, {
            wrapperClassName: "pointer-events-auto absolute inset-0 z-20 min-h-0 select-text",
            inputRef: br,
            "data-scrollable": "true",
            "data-node-type": "text-node",
            "data-node-id": e.id,
            "data-node-text-editing": "1",
            readOnly: X || _a,
            tabIndex: 0,
            value: nt,
            isDark: t,
            items: Dn,
            categories: gn,
            onSelectAsset: sr => void Ar(sr),
            enableAssetAtMention: !1,
            className: `text-node-rich-root canvas-text-markdown box-border block h-full min-h-0 w-full resize-none overflow-y-auto overflow-x-hidden rounded border-0 bg-transparent outline-none ${jn}`,
            onMouseDown: sr => sr.stopPropagation(),
            onChange: sr => {
              ze(sr), De.current = sr;
            },
            onBlur: sr => {
              _a || Zgn(sr.relatedTarget) || ir(nt);
            }
          }, "text-node-plain-editor"), $a ? c.jsx("div", {
            "data-text-node-drag-overlay": !0,
            className: "pointer-events-auto absolute inset-0 z-10 cursor-grab touch-none",
            title: Ot && _r && !((dc = e.settings) != null && dc.aiGenerated) ? x("双击编辑或用工具栏复制，仅影响本节点显示") : void 0,
            onPointerDown: Br,
            onDoubleClick: sr => {
              sr.stopPropagation(), sr.preventDefault(), Ct.current = null, Re.current || ea(sr.clientX, sr.clientY);
            }
          }) : null]
        })
      }), Ht ? c.jsx("div", {
        ref: tr,
        "data-gen-prompt-panel-host": !0,
        "data-gen-prompt-panel": "true",
        "data-floating-placement": xn.offset.placement,
        className: `${M5t}${A ? " hidden" : ""}`,
        style: {
          ...HEr,
          ...xn.style
        },
        onMouseDown: sr => {
          La(), sr.stopPropagation();
        },
        onWheel: Wt,
        children: c.jsx("div", {
          ref: Fn,
          "data-text-node-external-composer": !0,
          "data-qiaodoumayi-aux-composer": "text",
          className: `text-node-ai-composer qiaodoumayi-aux-gen-composer gen-prompt-panel-enter ${P5t} ${t ? `${W4e} text-zinc-100` : `${q4e} text-zinc-900`}`,
          style: vr,
          onMouseDown: sr => sr.stopPropagation(),
          onWheel: sr => sr.stopPropagation(),
          children: Gr ? c.jsx(f0o, {
            node: e,
            isDark: t,
            value: st,
            submitDisabled: X || T.length === 0,
            modelsEmpty: T.length === 0,
            isAnalyzing: X,
            hasMediaConnection: at,
            selectedModel: R,
            platformGroup: ce,
            chatModels: T,
            activeDropdown: m,
            setActiveDropdown: f,
            webSearchEnabled: ae,
            supportsWebSearch: N || wM(R),
            useOssForApi: Te,
            showOssToggle: !N && !he && ge,
            ossImageBase64: Ne,
            showOssImageBase64: !N,
            mediaHostingProvider: ke,
            isPromptExpanded: Rn,
            activeReferenceStripRows: jt,
            genReferenceStripThumbs: bt,
            promptReferenceItems: Bt,
            onRemoveImage: Qn,
            onReorderImages: Lt,
            onChange: ha,
            onSelectModel: Pt,
            showGeminiFormatDropdown: D,
            geminiApiFormat: H,
            onGeminiApiFormatChange: dt,
            showReasoningEffortDropdown: N || U,
            showMimoVideoSendDropdown: Mxe({
              modelId: R,
              url: B == null ? void 0 : B.url,
              hasVideo: je.some(sr => sr.type === "video" && !!sr.url && !sr.hasError)
            }),
            mimoVideoSendMode: K,
            onMimoVideoSendModeChange: W,
            reasoningEffort: N ? ne : Q,
            codexReasoningOptions: N ? V : void 0,
            codexReasoningUnavailableMessage: G.loading ? "正在读取 Codex 思考档位…" : G.error || "当前 Codex 未提供此模型的思考档位，请检测 Chat 连接",
            onRetryCodexReasoning: N ? G.refresh : void 0,
            codexDetails: N ? c.jsx(n0o, {
              stream: O,
              savedReply: (Ml = (Tl = e.settings) == null ? void 0 : Tl.codexTextMessages) == null ? void 0 : Ml.slice(-1)[0]
            }) : void 0,
            onReasoningEffortChange: xt,
            onToggleWebSearch: be,
            onToggleOss: sr => {
              xe(sr), n(e.id, {
                settings: {
                  ...(Ae.current || {}),
                  genUseAliyunOss: sr
                }
              });
            },
            onToggleOssImageBase64: sr => {
              me(sr), n(e.id, {
                settings: {
                  ...(Ae.current || {}),
                  ossImageBase64: sr
                }
              });
            },
            onPromptExpandedChange: zt,
            onSubmit: tt,
            promptOverflowRemeasureKey: kn,
            assetAtMentionItems: Dn,
            assetAtMentionCategories: gn,
            onSelectAssetAtMention: Ar,
            showPlatformGroupPicker: !N && le,
            onPlatformGroupChange: yn,
            upstreamTextNodes: fa,
            upstreamAgentNodes: Ca,
            showUpstreamTextPreview: Ot,
            onToggleUpstreamTextPreview: () => ln(sr => !sr),
            onRemoveUpstreamNode: i ? yr : void 0,
            onAddFromCanvas: I,
            canvasPickActive: C,
            imageInfoJsonPrompt: ta ? ki : void 0,
            showImageInfoJsonPreview: Pn,
            onToggleImageInfoJsonPreview: ta ? () => rn(sr => !sr) : void 0
          }) : c.jsx("div", {
            className: "w-full",
            style: {
              minHeight: H4e + qEr
            },
            "aria-hidden": !0
          })
        })
      }) : null, lt && typeof document < "u" ? Da.createPortal(c.jsxs("div", {
        "data-text-node-fullscreen-overlay": !0,
        className: "fixed inset-0 z-[10000]",
        onMouseDown: sr => {
          sr.stopPropagation(), !(sr.button !== 0 || sr.target !== sr.currentTarget) && Za();
        },
        children: [c.jsx("div", {
          className: "absolute inset-0 bg-black/80",
          style: {
            opacity: Yt === "exit" ? 0 : kt ? 1 : 0,
            transition: `opacity ${Yt === "exit" ? Q6 : dNe}ms ${cW}`
          },
          onMouseDown: sr => {
            sr.stopPropagation(), sr.button === 0 && Za();
          }
        }), c.jsxs("div", {
          ref: Ut,
          "data-text-node-fullscreen-ui": !0,
          className: `flex flex-col overflow-hidden rounded-2xl border shadow-2xl ${t ? "border-white/15 bg-zinc-950 text-zinc-100" : "border-zinc-200 bg-white text-zinc-900"}`,
          style: {
            position: "fixed",
            left: (hn ?? mV()).left,
            top: (hn ?? mV()).top,
            width: (hn ?? mV()).width,
            height: (hn ?? mV()).height,
            transformOrigin: "top left",
            transform: kt || !_t.current || !hn ? "none" : gGn(fGn(_t.current, hn)),
            transition: _t.current ? `transform ${Yt === "exit" ? Q6 : dNe}ms ${cW}` : "none"
          },
          onMouseDown: sr => sr.stopPropagation(),
          children: [c.jsx("div", {
            className: `flex flex-wrap items-center justify-end gap-2 border-b px-3 py-2 ${t ? "border-white/10" : "border-zinc-200"}`,
            children: c.jsx(Kgn, {
              isDark: t,
              isFullscreen: lt,
              backgroundColor: Jt,
              activeState: $e,
              onAction: Mr,
              onBackgroundColorChange: Kt,
              onCopy: va,
              onToggleFullscreen: Za,
              nodeId: e.id,
              colorPins: Zg(e)
            })
          }), c.jsx("div", {
            "data-scrollable": "true",
            className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden",
            style: {
              overscrollBehavior: "contain"
            },
            children: c.jsx("div", {
              ref: Hr,
              "data-node-type": "text-node-rich-editor-fullscreen",
              "data-node-id": e.id,
              contentEditable: !X && !_a,
              suppressContentEditableWarning: !0,
              tabIndex: 0,
              role: "textbox",
              "aria-label": x("全屏文本正文"),
              "aria-multiline": "true",
              className: `text-node-rich-root canvas-text-markdown mx-auto min-h-full w-full max-w-[800px] bg-transparent p-6 outline-none ${jn}`,
              onMouseDown: sr => {
                sr.stopPropagation(), !(sr.button !== 0 || X || _a) && Hgn(sr.currentTarget, sr.clientX, sr.clientY);
              },
              onBlur: sr => {
                if (_a) return;
                const da = sr.relatedTarget;
                if (da != null && da.closest(".text-node-rich-toolbar")) return;
                const la = pV(lR(sr.currentTarget));
                De.current = la, la !== Vt && tn(la, !1, HL(la));
              }
            })
          })]
        })]
      }), document.body) : null]
    });
  };

async function y0o({
  primaryPreviewUrl: e,
  assetId: t,
  isAudio: n,
  isVideo: r,
  generateId: a
}, {
  valid: i,
  setChatFiles: o,
  setIsChatOpen: s
}) {
  if (!i()) return;
  if (n) {
    const p = {
      name: "Preview.mp3",
      type: "audio/mpeg",
      content: e,
      isImage: !1,
      isVideo: !1,
      isAudio: !0,
      fromPreview: !0
    };
    o(m => i() ? [...m, p] : m), s(m => i() ? !0 : m);
    return;
  }
  const l = !!r,
    d = l ? `Preview-${Date.now()}.mp4` : `Preview-${Date.now()}.png`,
    u = l ? "video/mp4" : "image/png",
    h = `preview_node_${a()}`;
  try {
    const {
      buildChatComposerMediaFromUrl: p,
      acceptChatListDisplayUrl: m
    } = await Ie(async () => {
      const {
        buildChatComposerMediaFromUrl: b,
        acceptChatListDisplayUrl: v
      } = await Promise.resolve().then(() => MD);
      return {
        buildChatComposerMediaFromUrl: b,
        acceptChatListDisplayUrl: v
      };
    }, void 0, import.meta.url);
    if (!i()) return;
    const f = m(e) || void 0;
    s(b => i() ? !0 : b), f && o(b => i() ? [...b, {
      name: d,
      displayName: d,
      type: u,
      preview: f,
      isImage: !l,
      isVideo: l,
      fromPreview: !0,
      _pendingToken: h
    }] : b);
    const y = await p({
      sourceUrl: e,
      assetId: t,
      seededPreview: f,
      name: d,
      isImage: !l,
      isVideo: l,
      mimeType: u,
      index: Date.now() % 1e5
    });
    if (!i()) {
      o(b => b.filter(v => v._pendingToken !== h));
      return;
    }
    if (!y) {
      console.warn("[PreviewNode] 发送到对话失败：媒体落盘失败"), o(b => b.filter(v => v._pendingToken !== h));
      return;
    }
    o(b => {
      if (!i()) return b;
      const v = b.findIndex(w => w._pendingToken === h),
        _ = {
          ...y,
          fromPreview: !0
        };
      if (v >= 0) {
        const w = [...b];
        return w[v] = _, w;
      }
      return f ? b : [...b, _];
    });
  } catch (p) {
    console.warn("[PreviewNode] 发送到对话失败:", p), o(m => m.filter(f => f._pendingToken !== h));
  }
}

async function b0o({
  targetId: e,
  primaryUrl: t,
  images: n,
  isMultiImage: r
}, a) {
  if (!a.current()) return;
  const i = r && n.length > 1,
    o = i ? Math.ceil(Math.sqrt(n.length)) : 2,
    s = {
      rows: i ? Math.ceil(n.length / o) : 2,
      cols: o
    };
  if (i && a.confirm(`检测到${n.length}张图片，是否要将所有图片拆分为分镜镜头？

点击"确定"将每张图片作为一个镜头，点击"取消"将第一张图片按${s.rows}x${s.cols}网格拆分。`)) for (const d of n) {
    if (!a.current()) return;
    await a.split(e, d, {
      rows: 1,
      cols: 1
    }, a.current);
  } else a.current() && (await a.split(e, t, s, a.current));
}

async function v0o({
  node: e,
  isMultiImage: t,
  referencedPreviewIndex: n,
  previewMjImages: r,
  allPreviewImages: a,
  primaryPreviewUrl: i,
  upstreamGen: o,
  generateId: s
}, l) {
  if (!l.valid()) return;
  const d = e.settings || {},
    u = d._stitchedFullUrl,
    h = d._stitchedPreviewUrl;
  if (!!d._isStoryboardMosaic && typeof u == "string" && u) {
    const I = e.x + e.width + 100,
      E = e.y;
    if (d._ossUrlOnlyMode && nr(u)) {
      const j = String(d[_i] || u).trim(),
        B = String(d[Pi] || h || u).trim(),
        F = {
          id: s(),
          type: "input-image",
          x: I,
          y: E,
          width: 320,
          height: 280,
          content: B,
          prompt: "",
          settings: aCt(j, B)
        };
      l.append(F);
      return;
    }
    let M = h || u,
      T,
      P = {
        mediaType: "image",
        _mosaicRefFull: u,
        _mosaicRefPreview: h
      };
    try {
      const {
          contentStore: j
        } = await Ie(async () => {
          const {
            contentStore: G
          } = await Promise.resolve().then(() => Ly);
          return {
            contentStore: G
          };
        }, void 0, import.meta.url),
        {
          localCacheManager: B
        } = await Ie(async () => {
          const {
            localCacheManager: G
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: G
          };
        }, void 0, import.meta.url),
        {
          isCanvasLocalCacheMode: F
        } = await Ie(async () => {
          const {
            isCanvasLocalCacheMode: G
          } = await Promise.resolve().then(() => So);
          return {
            isCanvasLocalCacheMode: G
          };
        }, void 0, import.meta.url),
        N = j.extractId(u);
      if (T = N || void 0, F() && B.isAvailable() && N && B.hasAsset(N)) {
        const {
            ensureLocalPreviewDisplayUrl: G,
            LOCAL_CACHE_ASSET_SETTING_KEY: z
          } = await Ie(async () => {
            const {
              ensureLocalPreviewDisplayUrl: L,
              LOCAL_CACHE_ASSET_SETTING_KEY: D
            } = await Promise.resolve().then(() => Ui);
            return {
              ensureLocalPreviewDisplayUrl: L,
              LOCAL_CACHE_ASSET_SETTING_KEY: D
            };
          }, void 0, import.meta.url),
          {
            PREVIEW_CALLBACK_MAX_DIM: V
          } = await Ie(async () => {
            const {
              PREVIEW_CALLBACK_MAX_DIM: L
            } = await Promise.resolve().then(() => No);
            return {
              PREVIEW_CALLBACK_MAX_DIM: L
            };
          }, void 0, import.meta.url),
          O = await G(N, {
            maxDim: V
          });
        if (O) {
          M = O;
          const L = B.getAssetManifestMeta(N),
            D = ((L == null ? void 0 : L.fileName) || "").replace(/^.*[/\\]/, "").trim() || void 0;
          P = {
            ...P,
            _assetId: N,
            _contentAssetId: N,
            [z]: N,
            _canvasDisplayPreviewUrl: O,
            disableThumbnailCreationOnImport: !0,
            ...(D ? {
              _localDiskFileName: D
            } : {})
          };
        } else h && (M = h);
      }
    } catch (j) {
      console.warn("[PreviewNode] 本地拼接图 preview 解析失败，使用已有预览 URL:", j);
    }
    const R = {
      id: s(),
      type: "input-image",
      x: I,
      y: E,
      width: 320,
      height: 280,
      content: M,
      prompt: "",
      settings: P,
      ...(T ? {
        _contentAssetId: T
      } : {})
    };
    l.append(R);
    return;
  }
  const m = t ? Math.max(0, n) : -1,
    f = m >= 0 && (r[m] || a[m]) || i;
  if (!f) return;
  const y = e.x + e.width + 100,
    b = e.y,
    v = e._previewMjAssetIds,
    _ = t && m >= 0 ? m : t && a.length > 0 ? a.findIndex(I => I === f) : -1,
    w = (_ >= 0 && (v != null && v[_]) ? v[_] : void 0) || e._contentAssetId;
  let k = "image";
  if (e.previewType === "video" || f.match(/\.(mp4|webm|ogg|mov)$/i) || f.includes("video") ? k = "video" : (f.match(/\.(mp3|wav|ogg|m4a|aac)$/i) || f.includes("audio")) && (k = "audio"), k === "image") {
    const {
        resolveUrlForInputImageCanvas: I
      } = await Ie(async () => {
        const {
          resolveUrlForInputImageCanvas: R
        } = await Promise.resolve().then(() => sw);
        return {
          resolveUrlForInputImageCanvas: R
        };
      }, void 0, import.meta.url),
      E = await I(f, {
        assetId: w,
        sourceNode: o || void 0
      });
    if (!E) return;
    const M = {
        ...E.settings
      },
      T = String(M._localCacheAssetId || M._assetId || w || "").trim(),
      P = {
        id: s(),
        type: "input-image",
        x: y,
        y: b,
        width: 280,
        height: 280,
        content: E.content,
        prompt: "",
        settings: M,
        ...(T ? {
          _contentAssetId: T
        } : {})
      };
    l.append(P);
    return;
  }
  if ((o == null ? void 0 : o.type) === "gen-video") {
    const {
        buildGenNodeVideoDrop: I,
        defaultCanvasNodeSizeForMediaDrop: E
      } = await Ie(async () => {
        const {
          buildGenNodeVideoDrop: T,
          defaultCanvasNodeSizeForMediaDrop: P
        } = await Promise.resolve().then(() => sw);
        return {
          buildGenNodeVideoDrop: T,
          defaultCanvasNodeSizeForMediaDrop: P
        };
      }, void 0, import.meta.url),
      M = await I(o, f);
    if (M) {
      const {
          width: T,
          height: P
        } = E(M.mediaType),
        R = {
          ...M.settings
        },
        j = String(R._localCacheAssetId || R._assetId || w || "").trim(),
        B = {
          id: s(),
          type: "input-image",
          x: y,
          y: b,
          width: T,
          height: P,
          content: M.content,
          prompt: "",
          nodeName: M.nodeName,
          settings: R,
          ...(M.videoPosterUrl ? {
            videoPosterUrl: M.videoPosterUrl
          } : {}),
          ...(j ? {
            _contentAssetId: j
          } : {})
        };
      l.append(B);
      return;
    }
  }
  let A = f,
    S = w;
  try {
    const {
      isCanvasLocalCacheMode: I,
      isTauriAssetProtocolUrl: E
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: M,
        isTauriAssetProtocolUrl: T
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: M,
        isTauriAssetProtocolUrl: T
      };
    }, void 0, import.meta.url);
    if (w && I()) {
      const {
          localCacheManager: M
        } = await Ie(async () => {
          const {
            localCacheManager: j
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: j
          };
        }, void 0, import.meta.url),
        {
          ensureLocalPreviewDisplayUrl: T,
          LOCAL_CACHE_ASSET_SETTING_KEY: P
        } = await Ie(async () => {
          const {
            ensureLocalPreviewDisplayUrl: j,
            LOCAL_CACHE_ASSET_SETTING_KEY: B
          } = await Promise.resolve().then(() => Ui);
          return {
            ensureLocalPreviewDisplayUrl: j,
            LOCAL_CACHE_ASSET_SETTING_KEY: B
          };
        }, void 0, import.meta.url),
        {
          PREVIEW_CALLBACK_MAX_DIM: R
        } = await Ie(async () => {
          const {
            PREVIEW_CALLBACK_MAX_DIM: j
          } = await Promise.resolve().then(() => No);
          return {
            PREVIEW_CALLBACK_MAX_DIM: j
          };
        }, void 0, import.meta.url);
      if (await M.ensureRestored(), k === "video") {
        const j = await M.getConvertFileSrcForAsset(w),
          B = (await T(w, {
            maxDim: R,
            allowVideoOriginal: !1
          })) || void 0;
        if (j && E(j)) {
          const F = {
            id: s(),
            type: "input-image",
            x: y,
            y: b,
            width: 280,
            height: 280,
            content: j,
            prompt: "",
            settings: {
              mediaType: "video",
              _assetId: w,
              _contentAssetId: w,
              [P]: w,
              disableThumbnailCreationOnImport: !0
            },
            ...(B ? {
              videoPosterUrl: B
            } : {}),
            _contentAssetId: w
          };
          l.append(F);
          return;
        }
      }
    }
    (E(f) || /^https?:\/\//i.test(f) || f.startsWith("blob:")) && (A = f);
  } catch (I) {
    console.warn("[PreviewNode] 本地发送到画布解析失败:", I);
  }
  const C = {
    id: s(),
    type: "input-image",
    x: y,
    y: b,
    width: 280,
    height: 280,
    content: A,
    prompt: "",
    settings: {
      mediaType: k,
      ...(A.startsWith("blob:") ? {
        _blobUrl: A
      } : {}),
      ...(S ? {
        _assetId: S,
        _contentAssetId: S
      } : {})
    },
    ...(S ? {
      _contentAssetId: S
    } : {})
  };
  l.append(C);
}

function w0o(e, t, n) {
  const r = mv(t, n),
    a = bP(e).firstById;
  return r.filter(i => !i.inputType || i.inputType === "default").map(i => a.get(i.from)).filter(i => i != null);
}

const Dct = e => {
  var t, n;
  return JSON.stringify([e.type, e.content, e._contentAssetId, e.previewMjImages, (t = e.settings) == null ? void 0 : t._stitchedFullUrl, (n = e.settings) == null ? void 0 : n._contentAssetId]);
};

function x0o(e) {
  let t = !0,
    n = {};
  const r = new Set(),
    a = new Map();
  return {
    activate() {
      t = !0;
    },
    dispose() {
      t = !1, n = {}, r.clear(), a.clear();
    },
    observe(i) {
      var o;
      for (const s of r) {
        if (!s.documentCurrent()) {
          s.alive = !1, r.delete(s);
          continue;
        }
        const l = i.find(d => d.id === s.id);
        !l || Dct(l) !== s.identity ? (s.alive = !1, r.delete(s)) : (o = s.observe) == null || o.call(s, i);
      }
    },
    begin(i) {
      var b;
      const o = e(),
        s = (b = o.document) == null ? void 0 : b.lease(),
        l = n,
        d = {};
      if (i) for (const v of r) v.channel === i && (v.alive = !1, r.delete(v));
      const u = {
        id: o.node.id,
        identity: Dct(o.node),
        alive: !0,
        channel: i,
        documentCurrent: () => !s || s.isCurrent()
      };
      r.add(u), i && a.set(i, d);
      const h = (v = e().nodes) => t && l === n && u.alive && u.documentCurrent() && (!i || a.get(i) === d) && v.some(_ => _.id === u.id && Dct(_) === u.identity);
      let p = 0,
        m = !1,
        f = [];
      u.observe = v => {
        f = f.filter(_ => _.accepted(v) ? (_.complete(), !1) : !0), m && !p && r.delete(u);
      };
      const y = (v, _, w) => {
        var S;
        if (!h() || _(e().nodes)) return;
        p++;
        const k = C => ({
            nodes: h(C) ? v(C) : C,
            result: h(C)
          }),
          A = C => {
            p--, m && !p && r.delete(u), C && h() && (w == null || w());
          };
        VD(o.setNodes, k, A) || (f.push({
          accepted: _,
          complete: () => A(!0)
        }), o.setNodes(C => k(C).nodes), (S = u.observe) == null || S.call(u, e().nodes));
      };
      return {
        valid: h,
        finish() {
          m = !0, p || r.delete(u);
        },
        patch(v) {
          y(w => Alr(w, [{
            nodeId: u.id,
            updates: v
          }], new Set()), w => {
            const k = w.find(S => S.id === u.id),
              A = (k == null ? void 0 : k.settings) || {};
            return !!k && Object.entries(v).every(([S, C]) => S === "settings" ? Object.entries(v.settings || {}).every(([I, E]) => E === void 0 ? !(I in A) : Object.is(A[I], E)) : Object.is(k[S], C));
          });
        },
        append(v, _) {
          y(w => [...w, v], w => w.some(k => k.id === v.id), _);
        }
      };
    }
  };
}

const r$t = 8192,
  k$ = 6,
  rvr = 20,
  avr = 1,
  ivr = 3,
  ovr = {
    enabled: !1,
    text: "",
    fontSize: 12,
    color: "#ffffff",
    opacity: .15
  },
  _0o = [{
    mode: "grid",
    label: "网格"
  }, {
    mode: "horizontal",
    label: "横拼"
  }, {
    mode: "vertical",
    label: "竖拼"
  }, {
    mode: "template",
    label: "模板"
  }],
  a$t = {
    gap: 0,
    borderRadius: 0,
    backgroundColor: "#000000",
    borderWidth: 0,
    borderColor: "#ffffff",
    shadowEnabled: !1,
    shadowBlur: 8,
    shadowColor: "rgba(0,0,0,0.5)"
  },
  k0o = [{
    label: "自动",
    value: "auto"
  }, {
    label: "1:1",
    value: "1:1"
  }, {
    label: "3:4",
    value: "3:4"
  }, {
    label: "4:3",
    value: "4:3"
  }, {
    label: "4:5",
    value: "4:5"
  }, {
    label: "5:4",
    value: "5:4"
  }, {
    label: "1:2",
    value: "1:2"
  }, {
    label: "2:1",
    value: "2:1"
  }, {
    label: "1:3",
    value: "1:3"
  }, {
    label: "3:1",
    value: "3:1"
  }, {
    label: "16:9",
    value: "16:9"
  }, {
    label: "9:16",
    value: "9:16"
  }, {
    label: "21:9",
    value: "21:9"
  }, {
    label: "9:21",
    value: "9:21"
  }],
  i$t = [{
    id: "2-side-by-side",
    name: "双栏平衡",
    minImages: 2,
    slots: 2,
    regions: [{
      x: 0,
      y: 0,
      width: .5,
      height: 1
    }, {
      x: .5,
      y: 0,
      width: .5,
      height: 1
    }]
  }, {
    id: "2-top-bottom",
    name: "上下分屏",
    minImages: 2,
    slots: 2,
    regions: [{
      x: 0,
      y: 0,
      width: 1,
      height: .5
    }, {
      x: 0,
      y: .5,
      width: 1,
      height: .5
    }]
  }, {
    id: "2-big-small-right",
    name: "主图侧栏",
    minImages: 2,
    slots: 2,
    regions: [{
      x: 0,
      y: 0,
      width: .65,
      height: 1
    }, {
      x: .65,
      y: 0,
      width: .35,
      height: 1
    }]
  }, {
    id: "3-one-top-two-bottom",
    name: "横幅主图",
    minImages: 3,
    slots: 3,
    regions: [{
      x: 0,
      y: 0,
      width: 1,
      height: .5
    }, {
      x: 0,
      y: .5,
      width: .5,
      height: .5
    }, {
      x: .5,
      y: .5,
      width: .5,
      height: .5
    }]
  }, {
    id: "3-big-left-two-right",
    name: "左主右辅",
    minImages: 3,
    slots: 3,
    regions: [{
      x: 0,
      y: 0,
      width: .6,
      height: 1
    }, {
      x: .6,
      y: 0,
      width: .4,
      height: .5
    }, {
      x: .6,
      y: .5,
      width: .4,
      height: .5
    }]
  }, {
    id: "3-L-shape",
    name: "L 型分区",
    minImages: 3,
    slots: 3,
    regions: [{
      x: 0,
      y: 0,
      width: .5,
      height: 1
    }, {
      x: .5,
      y: 0,
      width: .5,
      height: .5
    }, {
      x: .5,
      y: .5,
      width: .5,
      height: .5
    }]
  }, {
    id: "4-big-top-three-bottom",
    name: "顶部主视觉",
    minImages: 4,
    slots: 4,
    regions: [{
      x: 0,
      y: 0,
      width: 1,
      height: .55
    }, {
      x: 0,
      y: .55,
      width: 1 / 3,
      height: .45
    }, {
      x: 1 / 3,
      y: .55,
      width: 1 / 3,
      height: .45
    }, {
      x: 2 / 3,
      y: .55,
      width: 1 / 3,
      height: .45
    }]
  }, {
    id: "4-cross",
    name: "交错陈列",
    minImages: 4,
    slots: 4,
    regions: [{
      x: 0,
      y: 0,
      width: .55,
      height: .55
    }, {
      x: .55,
      y: 0,
      width: .45,
      height: .45
    }, {
      x: 0,
      y: .55,
      width: .45,
      height: .45
    }, {
      x: .45,
      y: .45,
      width: .55,
      height: .55
    }]
  }, {
    id: "5-center-focus",
    name: "中心主视觉",
    minImages: 5,
    slots: 5,
    regions: [{
      x: .2,
      y: .15,
      width: .6,
      height: .7
    }, {
      x: 0,
      y: 0,
      width: .25,
      height: .5
    }, {
      x: .75,
      y: 0,
      width: .25,
      height: .5
    }, {
      x: 0,
      y: .5,
      width: .25,
      height: .5
    }, {
      x: .75,
      y: .5,
      width: .25,
      height: .5
    }]
  }, {
    id: "6-magazine",
    name: "杂志版式",
    minImages: 6,
    slots: 6,
    regions: [{
      x: 0,
      y: 0,
      width: .5,
      height: .5
    }, {
      x: .5,
      y: 0,
      width: .25,
      height: .5
    }, {
      x: .75,
      y: 0,
      width: .25,
      height: .5
    }, {
      x: 0,
      y: .5,
      width: .25,
      height: .5
    }, {
      x: .25,
      y: .5,
      width: .25,
      height: .5
    }, {
      x: .5,
      y: .5,
      width: .5,
      height: .5
    }]
  }],
  n0n = {
    layoutMode: "grid",
    gridCols: 2,
    gridRows: null,
    selectedTemplateId: "",
    pieces: [],
    concatRatios: null,
    gridColRatios: null,
    gridRowRatios: null,
    gridAspectRatio: "auto",
    style: {
      ...a$t
    },
    watermark: {
      ...ovr
    }
  };

function j6(e, t, n, r) {
  const a = typeof e == "number" ? e : Number(e);
  return Number.isFinite(a) ? Math.max(t, Math.min(n, Math.round(a))) : r;
}

function A0o(e) {
  return {
    sourceId: e,
    fit: "contain",
    offsetX: .5,
    offsetY: .5,
    zoom: 1
  };
}

function sue(e, t) {
  const n = Array.isArray(e) ? e : [],
    r = new Set();
  return t.map(a => {
    const i = n.findIndex((o, s) => !r.has(s) && o.sourceId === a);
    if (i >= 0) {
      r.add(i);
      const o = n[i];
      return {
        sourceId: a,
        fit: o.fit === "contain" ? "contain" : "cover",
        offsetX: L5(o.offsetX, .5),
        offsetY: L5(o.offsetY, .5),
        zoom: cvr(o.zoom)
      };
    }
    return A0o(a);
  });
}

function S0o(e) {
  if (typeof e == "number") return Number.isFinite(e) && e > 0 ? e : null;
  if (!e || e === "auto") return null;
  const t = String(e).trim().match(/^(\d+(?:\.\d+)?)[:/](\d+(?:\.\d+)?)$/);
  if (!t) return null;
  const n = Number(t[1]),
    r = Number(t[2]);
  return Number.isFinite(n) && Number.isFinite(r) && n > 0 && r > 0 ? n / r : null;
}

function I0o(e, t) {
  return !Number.isFinite(e) || !Number.isFinite(t) || !e || !t || e <= 0 || t <= 0 ? null : e / t;
}

function FJ(e, t) {
  return t <= 0 ? [] : Array.isArray(e) && e.length === t && e.every(n => Number.isFinite(n) && n > 0) ? e.slice() : Array.from({
    length: t
  }, () => 1);
}

function C0o(e, t, n, r) {
  const a = Math.max(1, e),
    i = Math.max(1, t),
    o = FJ(n, a),
    s = FJ(r, i),
    l = o.reduce((p, m) => p + m, 0) || 1,
    d = s.reduce((p, m) => p + m, 0) || 1,
    u = [];
  let h = 0;
  for (let p = 0; p < i; p++) {
    const m = s[p] / d;
    let f = 0;
    for (let y = 0; y < a; y++) {
      const b = o[y] / l;
      u.push({
        x: f,
        y: h,
        width: b,
        height: m
      }), f += b;
    }
    h += m;
  }
  return u;
}

function r0n(e, t, n) {
  const r = Math.max(0, e),
    a = FJ(n, r),
    i = a.reduce((s, l) => s + l, 0) || 1;
  let o = 0;
  return a.map(s => {
    const l = s / i,
      d = t === "horizontal" ? {
        x: o,
        y: 0,
        width: l,
        height: 1
      } : {
        x: 0,
        y: o,
        width: 1,
        height: l
      };
    return o += l, d;
  });
}

function E0o(e) {
  return i$t.filter(t => e >= t.minImages && e >= t.slots - 1);
}

function vZe(e, t, n) {
  const r = Math.max(1, t),
    a = Math.max(1, Math.ceil(Math.max(0, e) / r) || 1);
  return Math.max(n ?? a, a);
}

function o$t(e, t) {
  const n = Math.max(0, t);
  if (e.layoutMode === "template") {
    const i = i$t.find(o => o.id === e.selectedTemplateId);
    if (i) return i.regions;
  }
  if (e.layoutMode === "horizontal") return r0n(n, "horizontal", e.concatRatios);
  if (e.layoutMode === "vertical") return r0n(n, "vertical", e.concatRatios);
  const r = j6(e.gridCols, 1, k$, 2),
    a = vZe(n, r, e.gridRows);
  return C0o(r, a, e.gridColRatios, e.gridRowRatios);
}

function T0o(e, t) {
  if (e.layoutMode === "horizontal") return Math.max(1, t);
  if (e.layoutMode === "vertical") return 1 / Math.max(1, t);
  if (e.layoutMode === "template") {
    const r = i$t.find(a => a.id === e.selectedTemplateId);
    if (r) {
      const a = Math.max(...r.regions.map(o => o.x + o.width)),
        i = Math.max(...r.regions.map(o => o.y + o.height));
      if (Number.isFinite(a) && Number.isFinite(i) && a > 0 && i > 0) return a / i;
    }
  }
  const n = j6(e.gridCols, 1, k$, 2);
  return n / vZe(t, n, e.gridRows);
}

function svr(e, t, n = 0) {
  return S0o(e.gridAspectRatio) || I0o(t == null ? void 0 : t.naturalWidth, t == null ? void 0 : t.naturalHeight) || T0o(e, n);
}

function a0n(e) {
  return {
    previewPuzzle: e
  };
}

function MO(e) {
  const t = e == null ? void 0 : e.previewPuzzle;
  if (t && typeof t == "object") return M0o(t);
  const n = e == null ? void 0 : e.previewGridRows,
    r = e == null ? void 0 : e.previewGridCols;
  return typeof n == "number" && typeof r == "number" && n > 0 && r > 0 ? {
    ...n0n,
    layoutMode: "grid",
    gridCols: j6(r, 1, k$, 2),
    gridRows: j6(n, 1, k$, n)
  } : {
    ...n0n,
    style: {
      ...a$t
    }
  };
}

function M0o(e) {
  var n, r, a, i, o, s, l, d;
  return {
    layoutMode: (e == null ? void 0 : e.layoutMode) === "horizontal" || (e == null ? void 0 : e.layoutMode) === "vertical" || (e == null ? void 0 : e.layoutMode) === "template" ? e.layoutMode : "grid",
    gridCols: j6(e == null ? void 0 : e.gridCols, 1, k$, 2),
    gridRows: (e == null ? void 0 : e.gridRows) == null ? null : j6(e.gridRows, 1, k$, 1),
    selectedTemplateId: typeof (e == null ? void 0 : e.selectedTemplateId) == "string" ? e.selectedTemplateId : "",
    pieces: Array.isArray(e == null ? void 0 : e.pieces) ? sue(e.pieces.filter(u => !!u && typeof u.sourceId == "string"), e.pieces.filter(u => !!u && typeof u.sourceId == "string").map(u => u.sourceId)) : [],
    concatRatios: Array.isArray(e == null ? void 0 : e.concatRatios) ? e.concatRatios.filter(u => Number.isFinite(u)) : null,
    gridColRatios: Array.isArray(e == null ? void 0 : e.gridColRatios) ? e.gridColRatios.filter(u => Number.isFinite(u)) : null,
    gridRowRatios: Array.isArray(e == null ? void 0 : e.gridRowRatios) ? e.gridRowRatios.filter(u => Number.isFinite(u)) : null,
    gridAspectRatio: typeof (e == null ? void 0 : e.gridAspectRatio) == "string" ? e.gridAspectRatio : "auto",
    style: {
      ...a$t,
      ...(e != null && e.style && typeof e.style == "object" ? e.style : {}),
      gap: j6((n = e == null ? void 0 : e.style) == null ? void 0 : n.gap, 0, rvr, 0),
      borderRadius: j6((r = e == null ? void 0 : e.style) == null ? void 0 : r.borderRadius, 0, 24, 0),
      borderWidth: j6((a = e == null ? void 0 : e.style) == null ? void 0 : a.borderWidth, 0, 4, 0)
    },
    watermark: {
      ...ovr,
      ...(e != null && e.watermark && typeof e.watermark == "object" ? e.watermark : {}),
      fontSize: j6((i = e == null ? void 0 : e.watermark) == null ? void 0 : i.fontSize, 10, 48, 12),
      opacity: L5((o = e == null ? void 0 : e.watermark) == null ? void 0 : o.opacity, .15),
      enabled: !!((s = e == null ? void 0 : e.watermark) != null && s.enabled),
      text: typeof ((l = e == null ? void 0 : e.watermark) == null ? void 0 : l.text) == "string" ? e.watermark.text : "",
      color: typeof ((d = e == null ? void 0 : e.watermark) == null ? void 0 : d.color) == "string" ? e.watermark.color : "#ffffff"
    }
  };
}

function Lct(e, t) {
  const n = FJ(t, e),
    r = n.reduce((o, s) => o + s, 0) || 1,
    a = [];
  let i = 0;
  for (let o = 0; o < e - 1; o++) i += n[o] / r, a.push(i);
  return a;
}

function P0o(e, t, n, r, a = .15) {
  if (t < 0 || t + 1 >= e.length || !(r > 0)) return e.slice();
  const i = e.reduce((l, d) => l + d, 0) || 1,
    o = n / r * i,
    s = e.slice();
  return s[t] = Math.max(a, s[t] + o), s[t + 1] = Math.max(a, s[t + 1] - o), s;
}

function R0o(e, t, n, r) {
  const a = Math.max(avr, Math.min(ivr, e.zoom + (t > 0 ? -.1 : .1)));
  return a <= 1 ? {
    ...e,
    zoom: 1,
    offsetX: .5,
    offsetY: .5
  } : {
    ...e,
    zoom: Math.round(a * 100) / 100,
    offsetX: L5(n, .5),
    offsetY: L5(r, .5)
  };
}

function N0o(e, t, n, r, a) {
  return {
    ...e,
    offsetX: L5(t - r / 200, .5),
    offsetY: L5(n - a / 200, .5)
  };
}

function j0o(e) {
  return {
    ...e,
    fit: e.fit === "cover" ? "contain" : "cover",
    offsetX: .5,
    offsetY: .5
  };
}

function YSt(e, t, n) {
  if (t === n || t < 0 || n < 0 || t >= e.length || n >= e.length) return e;
  const r = e.slice(),
    a = r[t];
  return r[t] = r[n], r[n] = a, r;
}

function D0o(e, t) {
  const n = e.map(s => String(s || "").trim()),
    r = (t || []).map(s => String(s || "").trim()),
    a = n.map((s, l) => r[l] || s),
    i = new Set(n.filter(Boolean)),
    o = new Set(a.filter(Boolean));
  return i.size > 1 && o.size <= 1 ? n : a;
}

function L0o(e, t = 280) {
  return {
    x: e.x + e.width + 80,
    y: e.y + Math.max(0, (e.height - t) / 2)
  };
}

const O0o = {
  width: 400,
  height: 420
};

function B0o(e, t, n, r = !1) {
  const a = e != null && e.naturalWidth && e.naturalWidth > 0 ? e.naturalWidth : 1,
    i = e != null && e.naturalHeight && e.naturalHeight > 0 ? e.naturalHeight : 1,
    o = t === "vertical",
    s = o ? i / a : a / i,
    l = r && n && n > 0 ? n / s : 1,
    d = o ? a : a * l,
    u = o ? i * l : i;
  return o ? {
    width: "100%",
    height: "auto",
    aspectRatio: `${d} / ${u}`,
    flex: "0 0 auto"
  } : {
    height: "100%",
    width: "auto",
    aspectRatio: `${d} / ${u}`,
    flex: "0 0 auto"
  };
}

function i0n(e) {
  return [e.layoutMode, e.gridAspectRatio, e.gridCols, e.gridRows ?? "", e.selectedTemplateId].join("|");
}

function F0o(e, t, n, r) {
  if (!t.enabled || !t.text) return;
  e.save(), e.globalAlpha = L5(t.opacity, .15), e.font = `${Math.max(10, t.fontSize)}px sans-serif`, e.fillStyle = t.color || "#ffffff", e.textAlign = "center", e.textBaseline = "middle";
  const a = e.measureText(t.text).width + 60,
    i = 3 * Math.max(10, t.fontSize),
    o = Math.sqrt(n * n + r * r);
  e.translate(n / 2, r / 2), e.rotate(-30 * Math.PI / 180);
  for (let s = -o; s < o; s += i) for (let l = -o; l < o; l += a) e.fillText(t.text, l, s);
  e.restore();
}

function z0o(e, t, n, r) {
  const a = r / 2;
  return {
    x: e.x * t + a,
    y: e.y * n + a,
    width: e.width * t - r,
    height: e.height * n - r
  };
}

function U0o(e, t) {
  const n = t / 2;
  return {
    left: `calc(${100 * e.x}% + ${n}px)`,
    top: `calc(${100 * e.y}% + ${n}px)`,
    width: `calc(${100 * e.width}% - ${t}px)`,
    height: `calc(${100 * e.height}% - ${t}px)`
  };
}

function $0o(e) {
  const t = Number.isFinite(e) && e > 0 ? e : 1;
  return {
    width: `min(100cqw, calc(100cqh * ${t}))`,
    height: `min(100cqh, calc(100cqw / ${t}))`
  };
}

function G0o(e, t, n = r$t) {
  const r = Math.max(1, e.length),
    a = Math.max(1, ...e.map(h => h.naturalWidth || 1)),
    i = Math.max(1, ...e.map(h => h.naturalHeight || 1)),
    o = Number.isFinite(t) && t > 0 ? t : 1,
    s = Math.min(r, 3);
  let l, d;
  o >= 1 ? (l = Math.min(n, Math.max(a * s, Math.round(i * o))), d = Math.max(1, Math.round(l / o))) : (d = Math.min(n, Math.max(i * s, Math.round(a / o))), l = Math.max(1, Math.round(d * o)));
  const u = Math.max(l, d);
  if (u > n) {
    const h = n / u;
    l = Math.max(1, Math.round(l * h)), d = Math.max(1, Math.round(d * h));
  }
  return {
    width: l,
    height: d
  };
}

function lvr(e, t, n, r, a = r$t) {
  const i = e.length,
    o = Math.max(0, n);
  if (i === 0) return {
    width: 1,
    height: 1,
    cells: []
  };
  if (t === "horizontal") {
    const k = Math.max(1, ...e.map(N => N.naturalHeight || 1)),
      A = e.map(N => {
        const G = N.naturalWidth || 1,
          z = N.naturalHeight || 1;
        return Math.max(1, Math.round(G / z * k));
      }),
      S = Array.isArray(r) && r.length === i,
      C = S ? FJ(r, i) : A,
      I = C.reduce((N, G) => N + G, 0) || 1,
      E = S ? A.reduce((N, G) => N + G, 0) : I,
      M = (S ? E : I) + o * (i - 1),
      T = Math.min(1, a / Math.max(M, k, 1)),
      P = Math.max(1, Math.round(M * T)),
      R = Math.max(1, Math.round(k * T)),
      j = S ? E : I;
    let B = 0;
    const F = C.map((N, G) => {
      const z = S ? j * N / I : N,
        V = S ? Math.min(A[G], z) : z,
        O = {
          x: (B + (S ? (z - V) / 2 : 0)) * T,
          y: 0,
          width: V * T,
          height: R
        };
      return B += z + o, O;
    });
    return {
      width: P,
      height: R,
      cells: F
    };
  }
  const s = Math.max(1, ...e.map(k => k.naturalWidth || 1)),
    l = e.map(k => {
      const A = k.naturalWidth || 1,
        S = k.naturalHeight || 1;
      return Math.max(1, Math.round(S / A * s));
    }),
    d = Array.isArray(r) && r.length === i,
    u = d ? FJ(r, i) : l,
    h = u.reduce((k, A) => k + A, 0) || 1,
    p = d ? l.reduce((k, A) => k + A, 0) : h,
    m = (d ? p : h) + o * (i - 1),
    f = Math.min(1, a / Math.max(m, s, 1)),
    y = Math.max(1, Math.round(s * f)),
    b = Math.max(1, Math.round(m * f)),
    v = d ? p : h;
  let _ = 0;
  const w = u.map((k, A) => {
    const S = d ? v * k / h : k,
      C = d ? Math.min(l[A], S) : S,
      I = {
        x: 0,
        y: (_ + (d ? (S - C) / 2 : 0)) * f,
        width: y,
        height: C * f
      };
    return _ += S + o, I;
  });
  return {
    width: y,
    height: b,
    cells: w
  };
}

function V0o(e, t, n, r, a) {
  const {
    x: i,
    y: o,
    width: s,
    height: l
  } = r;
  if (s <= 0 || l <= 0) return;
  const d = t.naturalWidth || 1,
    u = t.naturalHeight || 1;
  e.save(), dvr(e, i, o, s, l, a.borderRadius);
  const h = n.fit === "contain" ? Math.min(s / d, l / u) : Math.max(s / d, l / u),
    p = d * h,
    m = u * h;
  let f, y;
  n.fit === "contain" ? (f = (s - p) / 2, y = (l - m) / 2) : (f = -Math.max(0, p - s) * L5(n.offsetX, .5), y = -Math.max(0, m - l) * L5(n.offsetY, .5));
  const b = cvr(n.zoom);
  if (b !== 1) {
    const v = i + s * L5(n.offsetX, .5),
      _ = o + l * L5(n.offsetY, .5);
    e.translate(v, _), e.scale(b, b), e.translate(-v, -_);
  }
  if (e.drawImage(t, i + f, o + y, p, m), a.borderWidth > 0) {
    e.strokeStyle = a.borderColor, e.lineWidth = a.borderWidth;
    const v = a.borderWidth / 2,
      _ = Math.max(0, a.borderRadius - v);
    e.beginPath(), q0o(e, i + v, o + v, s - a.borderWidth, l - a.borderWidth, _), e.stroke();
  }
  e.restore();
}

function H0o(e, t, n, r, a, i, o) {
  e.fillStyle = a.backgroundColor || "#000000", e.fillRect(0, 0, i, o);
  const s = Math.min(t.length, n.length, r.length);
  for (let l = 0; l < s; l++) V0o(e, t[l], n[l], z0o(r[l], i, o, a.gap), a);
}

function W0o(e, t, n, r, a, i = r$t) {
  const o = lvr(t, n, r.gap, a, i);
  r.gap > 0 && (e.fillStyle = r.backgroundColor || "#000000", e.fillRect(0, 0, o.width, o.height));
  for (let s = 0; s < t.length; s++) {
    const l = o.cells[s];
    l && (e.save(), dvr(e, l.x, l.y, l.width, l.height, r.borderRadius), e.drawImage(t[s], l.x, l.y, l.width, l.height), e.restore());
  }
  return {
    width: o.width,
    height: o.height
  };
}

function L5(e, t = .5) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : t;
}

function cvr(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? Math.max(avr, Math.min(ivr, Math.round(t * 100) / 100)) : 1;
}

function dvr(e, t, n, r, a, i) {
  e.beginPath(), i > 0 && typeof e.roundRect == "function" ? e.roundRect(t, n, r, a, i) : e.rect(t, n, r, a), e.clip();
}

function q0o(e, t, n, r, a, i) {
  i > 0 && typeof e.roundRect == "function" ? e.roundRect(t, n, r, a, i) : e.rect(t, n, r, a);
}

function K0o(e, t) {
  const n = Number(e),
    r = Number(t);
  if (!(n > 0) || !(r > 0)) return {
    width: 420,
    height: 320
  };
  const a = n / r,
    i = 420;
  return a >= 1 ? {
    width: i,
    height: Math.max(200, Math.round(i / a))
  } : {
    width: Math.max(200, Math.round(i * a)),
    height: i
  };
}

function Q0o(e) {
  const t = String(e.content || "").trim();
  if (!t) return null;
  const n = K0o(e.outputWidth, e.outputHeight),
    r = L0o(e.preview, n.height),
    a = String(e.assetId || "").trim();
  return {
    id: e.generateId(),
    type: "input-image",
    nodeName: e.nodeName || "拼图 合并图",
    x: r.x,
    y: r.y,
    width: n.width,
    height: n.height,
    content: t,
    prompt: "",
    settings: {
      mediaType: "image",
      ...(e.settings || {}),
      ...(a ? {
        _contentAssetId: a,
        _assetId: a
      } : {})
    },
    ...(a ? {
      _contentAssetId: a
    } : {})
  };
}

function uvr({
  images: e,
  puzzle: t,
  isDark: n,
  firstSize: r,
  fill: a = "contain",
  interact: i,
  onChange: o,
  onReorder: s,
  overlay: l,
  onCellPointerDown: d,
  onCellDoubleClick: u,
  className: h = ""
}) {
  const p = {
      reorder: !0,
      wheel: !0,
      pan: !0,
      dividers: !0,
      toggleFit: !0,
      ...i
    },
    m = g.useRef(null),
    f = g.useRef(null),
    y = g.useRef(t.pieces);
  y.current = t.pieces;
  const b = g.useRef(t);
  b.current = t;
  const v = g.useRef(o);
  v.current = o;
  const [_, w] = g.useState(null),
    [k, A] = g.useState(null),
    [S, C] = g.useState(null),
    [I, E] = g.useState(null),
    [M, T] = g.useState({}),
    P = g.useMemo(() => ({
      ...t,
      gridColRatios: _ ?? t.gridColRatios,
      gridRowRatios: k ?? t.gridRowRatios,
      concatRatios: S ?? t.concatRatios
    }), [t, _, k, S]),
    R = g.useMemo(() => o$t(P, e.length), [P, e.length]),
    j = g.useMemo(() => svr(P, r, e.length), [P, r, e.length]),
    B = P.layoutMode === "horizontal" || P.layoutMode === "vertical",
    F = P.gridCols,
    N = vZe(e.length, P.gridCols, P.gridRows),
    G = U => o({
      ...t,
      pieces: U
    }),
    z = (U = !0) => ({
      borderRadius: P.style.borderRadius,
      border: P.style.borderWidth > 0 ? `${P.style.borderWidth}px solid ${P.style.borderColor}` : void 0,
      boxShadow: U && P.style.shadowEnabled ? `0 2px ${P.style.shadowBlur}px ${P.style.shadowColor}` : void 0
    });
  g.useEffect(() => {
    const U = m.current;
    if (!U || !p.wheel) return;
    const H = Y => {
      var ce, we;
      const K = b.current.layoutMode,
        W = K === "horizontal" || K === "vertical",
        Q = Y.ctrlKey || Y.metaKey;
      if (W && !Q) {
        Y.preventDefault(), Y.stopPropagation(), K === "vertical" ? U.scrollTop += Y.deltaY : U.scrollLeft += Y.deltaY || Y.deltaX;
        return;
      }
      const q = (we = (ce = Y.target) == null ? void 0 : ce.closest) == null ? void 0 : we.call(ce, "[data-puzzle-cell]");
      if (!q || !U.contains(q)) return;
      Y.preventDefault(), Y.stopPropagation();
      const ne = Number(q.dataset.puzzleCell),
        de = q.getBoundingClientRect(),
        le = de.width > 0 ? (Y.clientX - de.left) / de.width : .5,
        J = de.height > 0 ? (Y.clientY - de.top) / de.height : .5,
        pe = b.current;
      v.current({
        ...pe,
        pieces: pe.pieces.map((X, Z) => Z === ne ? R0o(X, Y.deltaY, le, J) : X)
      });
    };
    return U.addEventListener("wheel", H, {
      passive: !1,
      capture: !0
    }), () => U.removeEventListener("wheel", H, !0);
  }, [p.wheel]);
  const V = (U, H, Y, K, W, Q) => {
      var X;
      Y.preventDefault(), Y.stopPropagation();
      const q = (X = f.current) == null ? void 0 : X.getBoundingClientRect();
      if (!q) return;
      const ne = U === "row" || U === "concat" && P.layoutMode === "vertical",
        de = ne ? q.height : q.width,
        le = ne ? Y.clientY : Y.clientX,
        J = FJ(W, K);
      let pe = J;
      const ce = Z => {
          pe = P0o(J, H, (ne ? Z.clientY : Z.clientX) - le, de, Q), U === "col" ? w(pe) : U === "row" ? A(pe) : C(pe);
        },
        we = () => {
          window.removeEventListener("pointermove", ce), window.removeEventListener("pointerup", we), o({
            ...t,
            ...(U === "col" ? {
              gridColRatios: pe
            } : U === "row" ? {
              gridRowRatios: pe
            } : {
              concatRatios: pe
            })
          }), w(null), A(null), C(null);
        };
      window.addEventListener("pointermove", ce), window.addEventListener("pointerup", we);
    },
    O = (U, H, Y, K) => {
      const W = P.pieces[H] || {
          fit: "cover",
          offsetX: .5,
          offsetY: .5,
          zoom: 1
        },
        Q = W.zoom || 1;
      return c.jsxs("div", {
        "data-puzzle-cell": H,
        className: `nodrag nopan nowheel ${Y} ${I === H ? "opacity-60" : ""}`,
        style: K,
        onDoubleClick: () => {
          if (p.toggleFit) {
            G(P.pieces.map((q, ne) => ne === H ? j0o(q) : q));
            return;
          }
          u == null || u(H);
        },
        onPointerDown: q => {
          if (p.pan && (W.fit === "cover" || W.zoom > 1) && (a === "contain" || W.zoom > 1)) {
            q.preventDefault(), q.stopPropagation();
            const ne = q.clientX,
              de = q.clientY,
              le = W.offsetX,
              J = W.offsetY,
              pe = we => {
                G(y.current.map((X, Z) => Z === H ? N0o(X, le, J, we.clientX - ne, we.clientY - de) : X));
              },
              ce = () => {
                window.removeEventListener("pointermove", pe), window.removeEventListener("pointerup", ce);
              };
            window.addEventListener("pointermove", pe), window.addEventListener("pointerup", ce);
            return;
          }
          d == null || d(H, q);
        },
        draggable: p.reorder,
        onDragStart: q => {
          p.reorder && (q.dataTransfer.setData("text/plain", String(H)), q.dataTransfer.effectAllowed = "move", E(H));
        },
        onDragEnd: () => E(null),
        onDragOver: q => {
          p.reorder && (q.preventDefault(), q.dataTransfer.dropEffect = "move");
        },
        onDrop: q => {
          if (!p.reorder) return;
          q.preventDefault();
          const ne = Number(q.dataTransfer.getData("text/plain"));
          Number.isNaN(ne) || ne === H || (s == null || s(ne, H), o({
            ...t,
            pieces: YSt(P.pieces, ne, H)
          }), E(null));
        },
        children: [c.jsx("img", {
          src: U,
          alt: "",
          className: "pointer-events-none h-full w-full select-none",
          style: {
            objectFit: W.fit,
            objectPosition: W.fit === "cover" ? `${100 * W.offsetX}% ${100 * W.offsetY}%` : "50% 50%",
            transform: Q !== 1 ? `scale(${Q})` : void 0,
            transformOrigin: `${100 * W.offsetX}% ${100 * W.offsetY}%`
          },
          draggable: !1,
          onLoad: q => {
            const ne = q.currentTarget,
              de = {
                naturalWidth: ne.naturalWidth,
                naturalHeight: ne.naturalHeight
              };
            !(de.naturalWidth > 0) || !(de.naturalHeight > 0) || T(le => {
              const J = le[U];
              return J && J.naturalWidth === de.naturalWidth && J.naturalHeight === de.naturalHeight ? le : {
                ...le,
                [U]: de
              };
            });
          }
        }), l == null ? void 0 : l(H)]
      }, `puzzle-cell-${H}`);
    },
    L = P.watermark.enabled && P.watermark.text ? c.jsx("div", {
      className: "pointer-events-none absolute inset-0 z-[2] overflow-hidden",
      style: {
        opacity: P.watermark.opacity
      },
      children: c.jsx("div", {
        className: "absolute select-none whitespace-nowrap",
        style: {
          color: P.watermark.color,
          fontSize: Math.max(8, .5 * P.watermark.fontSize),
          fontWeight: 500,
          lineHeight: 3,
          transform: "rotate(-30deg)",
          transformOrigin: "center center",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          gap: `0 ${Math.max(20, P.watermark.fontSize)}px`
        },
        children: Array.from({
          length: 80
        }, (U, H) => c.jsx("span", {
          children: P.watermark.text
        }, H))
      })
    }) : null,
    D = p.dividers && P.layoutMode === "grid" ? c.jsxs(c.Fragment, {
      children: [F > 1 && Lct(F, P.gridColRatios).map((U, H) => c.jsx("div", {
        className: "absolute z-20 top-0 h-full nodrag nopan nowheel cursor-col-resize",
        style: {
          left: `${100 * U}%`,
          width: 6,
          transform: "translateX(-50%)"
        },
        onPointerDown: Y => V("col", H, Y, F, P.gridColRatios, .15),
        children: c.jsx("div", {
          className: "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/40"
        })
      }, `col-${H}`)), N > 1 && Lct(N, P.gridRowRatios).map((U, H) => c.jsx("div", {
        className: "absolute z-20 left-0 w-full nodrag nopan nowheel cursor-row-resize",
        style: {
          top: `${100 * U}%`,
          height: 6,
          transform: "translateY(-50%)"
        },
        onPointerDown: Y => V("row", H, Y, N, P.gridRowRatios, .15),
        children: c.jsx("div", {
          className: "absolute left-0 top-1/2 w-full h-px -translate-y-1/2 bg-white/40"
        })
      }, `row-${H}`))]
    }) : p.dividers && B && e.length > 1 ? Lct(e.length, P.concatRatios).map((U, H) => c.jsx("div", {
      className: `absolute z-20 nodrag nopan nowheel ${P.layoutMode === "vertical" ? "left-0 w-full cursor-row-resize" : "top-0 h-full cursor-col-resize"}`,
      style: P.layoutMode === "vertical" ? {
        top: `${100 * U}%`,
        height: 6,
        transform: "translateY(-50%)"
      } : {
        left: `${100 * U}%`,
        width: 6,
        transform: "translateX(-50%)"
      },
      onPointerDown: Y => V("concat", H, Y, e.length, P.concatRatios, .05),
      children: c.jsx("div", {
        className: P.layoutMode === "vertical" ? "absolute left-0 top-1/2 w-full h-px -translate-y-1/2 bg-white/40" : "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/40"
      })
    }, `concat-${H}`)) : null;
  if (B) {
    const U = P.layoutMode === "vertical",
      H = Array.isArray(P.concatRatios) && P.concatRatios.length === e.length,
      Y = c.jsxs("div", {
        ref: f,
        className: `relative nodrag nopan nowheel ${U ? "flex w-full flex-col" : "flex h-full flex-row"}`,
        style: {
          backgroundColor: P.style.gap > 0 ? P.style.backgroundColor : void 0,
          gap: P.style.gap > 0 ? P.style.gap : 0
        },
        children: [e.map((K, W) => {
          var Q;
          return O(K, W, "relative overflow-hidden shrink-0", {
            ...B0o(M[K] || (W === 0 ? r : null), P.layoutMode === "vertical" ? "vertical" : "horizontal", (Q = P.concatRatios) == null ? void 0 : Q[W], H),
            ...z(!1)
          });
        }), D, L]
      });
    return c.jsx("div", {
      ref: m,
      className: `h-full w-full nodrag nopan nowheel overscroll-contain rh-scroll-minimal ${U ? "overflow-y-auto overflow-x-hidden" : "overflow-x-auto overflow-y-hidden"} ${h}`,
      children: Y
    });
  }
  return c.jsx("div", {
    ref: m,
    className: `flex h-full w-full items-center justify-center nodrag nopan nowheel ${h}`,
    style: {
      containerType: "size"
    },
    children: c.jsxs("div", {
      ref: f,
      className: "relative",
      style: {
        backgroundColor: P.style.backgroundColor,
        ...(a === "contain" ? $0o(j) : {
          width: "100%",
          height: "100%"
        })
      },
      children: [e.slice(0, R.length).map((U, H) => {
        const Y = R[H];
        return Y ? O(U, H, "absolute overflow-hidden", {
          ...U0o(Y, P.style.gap),
          ...z()
        }) : null;
      }), D, L]
    })
  });
}

function Oct({
  isDark: e,
  title: t,
  value: n,
  fallback: r,
  onChange: a
}) {
  return on(), c.jsx(aWe, {
    isDark: e,
    title: t,
    size: "md",
    placement: "above",
    canvasBackgroundColor: n,
    canvasBackgroundDefaultHex: r,
    onCanvasBackgroundColorChange: a
  });
}

function Y0o({
  isDark: e,
  puzzle: t,
  onChange: n
}) {
  on();
  const r = o => n({
      ...t,
      style: {
        ...t.style,
        ...o
      }
    }),
    a = o => n({
      ...t,
      watermark: {
        ...t.watermark,
        ...o
      }
    }),
    i = `flex items-center gap-2 text-[11px] min-w-0 ${e ? "text-zinc-300" : "text-zinc-600"}`;
  return c.jsxs("div", {
    className: "flex flex-col gap-2 px-1 py-1",
    children: [c.jsxs("div", {
      className: "grid grid-cols-2 gap-x-3 gap-y-2",
      children: [c.jsxs("label", {
        className: i,
        children: [x("间距"), c.jsx("input", {
          type: "range",
          min: 0,
          max: rvr,
          value: t.style.gap,
          onChange: o => r({
            gap: Number(o.target.value)
          }),
          className: "min-w-0 flex-1"
        }), c.jsx("span", {
          className: "w-5 tabular-nums",
          children: t.style.gap
        })]
      }), c.jsxs("label", {
        className: i,
        children: [x("圆角"), c.jsx("input", {
          type: "range",
          min: 0,
          max: 24,
          value: t.style.borderRadius,
          onChange: o => r({
            borderRadius: Number(o.target.value)
          }),
          className: "min-w-0 flex-1"
        }), c.jsx("span", {
          className: "w-5 tabular-nums",
          children: t.style.borderRadius
        })]
      }), c.jsxs("label", {
        className: i,
        children: [x("背景"), c.jsx(Oct, {
          isDark: e,
          title: x("背景色"),
          value: t.style.backgroundColor,
          fallback: "#000000",
          onChange: o => r({
            backgroundColor: o
          })
        })]
      }), c.jsxs("label", {
        className: i,
        children: [x("边框"), c.jsx("input", {
          type: "range",
          min: 0,
          max: 4,
          value: t.style.borderWidth,
          onChange: o => r({
            borderWidth: Number(o.target.value)
          }),
          className: "min-w-0 flex-1"
        }), c.jsx("span", {
          className: "w-5 tabular-nums",
          children: t.style.borderWidth
        }), t.style.borderWidth > 0 && c.jsxs(c.Fragment, {
          children: [c.jsx("span", {
            className: "opacity-70",
            children: x("框色")
          }), c.jsx(Oct, {
            isDark: e,
            title: x("框色"),
            value: t.style.borderColor,
            fallback: "#ffffff",
            onChange: o => r({
              borderColor: o
            })
          })]
        })]
      })]
    }), c.jsxs("label", {
      className: `${i} cursor-pointer`,
      children: [c.jsx("input", {
        type: "checkbox",
        checked: t.style.shadowEnabled,
        onChange: o => r({
          shadowEnabled: o.target.checked
        })
      }), x("阴影")]
    }), c.jsx("div", {
      className: `h-px ${e ? "bg-zinc-700" : "bg-zinc-200"}`
    }), c.jsxs("div", {
      className: "flex items-center gap-2 flex-wrap text-[11px]",
      children: [c.jsxs("label", {
        className: "inline-flex items-center gap-1.5 cursor-pointer",
        children: [c.jsx("input", {
          type: "checkbox",
          checked: t.watermark.enabled,
          onChange: o => a({
            enabled: o.target.checked
          })
        }), x("水印")]
      }), t.watermark.enabled && c.jsxs(c.Fragment, {
        children: [c.jsx("input", {
          type: "text",
          value: t.watermark.text,
          placeholder: x("输入你的水印"),
          onChange: o => a({
            text: o.target.value
          }),
          className: `h-5 min-w-[72px] flex-1 bg-transparent px-0 text-center text-[10px] outline-none border-0 ${e ? "text-zinc-200 placeholder:text-zinc-500" : "text-zinc-700 placeholder:text-zinc-400"}`
        }), c.jsx(Oct, {
          isDark: e,
          title: x("水印色"),
          value: t.watermark.color,
          fallback: "#ffffff",
          onChange: o => a({
            color: o
          })
        })]
      })]
    }), t.watermark.enabled && c.jsxs("div", {
      className: "grid grid-cols-2 gap-x-3 gap-y-2",
      children: [c.jsxs("label", {
        className: i,
        children: [x("透明"), c.jsx("input", {
          type: "range",
          min: 5,
          max: 50,
          value: Math.round(t.watermark.opacity * 100),
          onChange: o => a({
            opacity: Number(o.target.value) / 100
          }),
          className: "min-w-0 flex-1"
        })]
      }), c.jsxs("label", {
        className: i,
        children: [x("字号"), c.jsx("input", {
          type: "range",
          min: 10,
          max: 48,
          value: t.watermark.fontSize,
          onChange: o => a({
            fontSize: Number(o.target.value)
          }),
          className: "min-w-0 flex-1"
        })]
      })]
    })]
  });
}

function o0n({
  isDark: e,
  label: t,
  value: n,
  min: r,
  max: a,
  onChange: i
}) {
  on();
  const o = `h-6 w-6 rounded text-xs ${e ? "text-zinc-400 hover:text-white hover:bg-white/5" : "text-zinc-500 hover:text-zinc-900 hover:bg-black/5"}`;
  return c.jsxs("span", {
    className: "inline-flex items-center gap-1",
    children: [c.jsx("span", {
      className: "opacity-70",
      children: t
    }), c.jsx("button", {
      type: "button",
      className: o,
      onClick: () => i(Math.max(r, n - 1)),
      disabled: n <= r,
      children: "-"
    }), c.jsx("span", {
      className: "w-4 text-center tabular-nums",
      children: n
    }), c.jsx("button", {
      type: "button",
      className: o,
      onClick: () => i(Math.min(a, n + 1)),
      disabled: n >= a,
      children: "+"
    })]
  });
}

function hvr({
  scopeId: e,
  isDark: t,
  puzzle: n,
  imageCount: r,
  onChange: a,
  compact: i = !1,
  menuZIndex: o,
  menuPlacement: s = "below",
  showMerge: l = !1,
  merging: d = !1,
  onMerge: u
}) {
  on();
  const [h, p] = g.useState(null),
    [m, f] = g.useState(!1),
    y = g.useMemo(() => E0o(r), [r]),
    b = n.gridCols,
    v = vZe(r, n.gridCols, n.gridRows),
    _ = n.layoutMode === "horizontal" || n.layoutMode === "vertical",
    w = S => `flex-1 px-2 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap text-center ${S ? t ? "bg-white text-zinc-900" : "bg-zinc-900 text-white" : t ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800"}`,
    k = S => a({
      ...n,
      ...S
    }),
    A = `shrink-0 text-[11px] ${t ? "text-zinc-500" : "text-zinc-400"}`;
  return c.jsxs("div", {
    className: `flex flex-col nodrag nopan nowheel ${i ? "gap-1.5" : "gap-3"}`,
    children: [c.jsxs("div", {
      className: "flex items-center gap-1",
      children: [c.jsx("div", {
        className: `inline-flex min-w-0 flex-1 items-center rounded-lg p-0.5 ${t ? "bg-black/30" : "bg-zinc-100"}`,
        children: _0o.map(S => c.jsx("button", {
          type: "button",
          className: w(n.layoutMode === S.mode),
          onClick: () => {
            var I;
            const C = S.mode;
            k({
              layoutMode: C,
              selectedTemplateId: C === "template" && !y.some(E => E.id === n.selectedTemplateId) ? ((I = y[0]) == null ? void 0 : I.id) || "" : n.selectedTemplateId
            });
          },
          children: x(S.label)
        }, S.mode))
      }), c.jsx("button", {
        type: "button",
        title: x("样式设置"),
        className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors ${m ? t ? "text-white" : "text-zinc-900" : t ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-400 hover:text-zinc-700"}`,
        onClick: () => f(S => !S),
        children: c.jsx(IP, {
          size: 12
        })
      })]
    }), !_ && c.jsxs("div", {
      className: "flex items-center gap-3 min-w-0 px-1",
      children: [c.jsxs("label", {
        className: "flex shrink-0 items-center gap-1.5",
        children: [c.jsx("span", {
          className: A,
          children: x("比例")
        }), c.jsx(qs, {
          scopeId: e,
          dropdownType: "puzzle-aspect",
          value: n.gridAspectRatio,
          options: k0o.map(S => ({
            value: S.value,
            label: S.label
          })),
          isDark: t,
          activeDropdown: h,
          setActiveDropdown: p,
          onSelect: S => k({
            gridAspectRatio: S
          }),
          menuPlacement: s,
          menuZIndex: o,
          minMenuWidth: 88,
          buttonVariant: "bare"
        })]
      }), n.layoutMode === "grid" && c.jsxs("div", {
        className: "flex min-w-0 flex-1 items-center gap-3 text-[11px]",
        children: [c.jsx(o0n, {
          isDark: t,
          label: x("列"),
          value: b,
          min: 1,
          max: k$,
          onChange: S => k({
            gridCols: S,
            gridColRatios: null,
            gridRowRatios: null,
            gridRows: null
          })
        }), c.jsx(o0n, {
          isDark: t,
          label: x("行"),
          value: v,
          min: Math.max(1, Math.ceil(r / b) || 1),
          max: Math.max(k$, Math.ceil(r / b) || 1),
          onChange: S => k({
            gridRows: S,
            gridRowRatios: null
          })
        }), c.jsxs("span", {
          className: "opacity-70 whitespace-nowrap",
          children: [b, "×", v, " = ", b * v, x(" 格")]
        }), (n.gridColRatios || n.gridRowRatios) && c.jsx("button", {
          type: "button",
          className: `text-[11px] underline-offset-2 hover:underline ${t ? "text-zinc-400" : "text-zinc-500"}`,
          onClick: () => k({
            gridColRatios: null,
            gridRowRatios: null
          }),
          children: x("重置等分")
        })]
      }), n.layoutMode === "template" && c.jsxs("label", {
        className: "flex min-w-0 flex-1 items-center gap-1.5",
        children: [c.jsx("span", {
          className: A,
          children: x("模板")
        }), c.jsx("div", {
          className: "min-w-0 flex-1",
          children: c.jsx(qs, {
            scopeId: e,
            dropdownType: "puzzle-template",
            value: y.some(S => S.id === n.selectedTemplateId) ? n.selectedTemplateId : "",
            options: y.length === 0 ? [{
              value: "",
              label: "连接更多图片"
            }] : y.map(S => ({
              value: S.id,
              label: S.name
            })),
            isDark: t,
            activeDropdown: h,
            setActiveDropdown: p,
            onSelect: S => {
              S && k({
                layoutMode: "template",
                selectedTemplateId: S
              });
            },
            disabled: y.length === 0,
            menuPlacement: s,
            menuZIndex: o,
            minMenuWidth: 120,
            buttonVariant: "bare"
          })
        })]
      })]
    }), m && c.jsx(Y0o, {
      isDark: t,
      puzzle: n,
      onChange: a
    }), l && c.jsx("button", {
      type: "button",
      disabled: r < 2 || d,
      className: `flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors ${t ? "bg-white/10 text-zinc-100 hover:bg-white/15 disabled:text-zinc-500" : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 disabled:text-zinc-400"} disabled:cursor-not-allowed disabled:opacity-40`,
      onClick: u,
      children: x(d ? "合成中…" : "合成发送到画布")
    })]
  });
}

const X0o = 52;

function J0o({
  isDark: e,
  visible: t,
  opacity: n,
  puzzleOpen: r,
  canPuzzle: a,
  showStoryboard: i,
  onTogglePuzzle: o,
  onSendToCanvas: s,
  onSendToChat: l,
  onSendToStoryboard: d
}) {
  on();
  const u = g.useRef(null);
  Qp(u, "50% 100%", !0);
  const h = "toolbar-label-btn h-11 px-3 flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap text-[12px]",
    p = e ? "text-zinc-200" : "text-zinc-700",
    m = e ? "text-white" : "text-blue-600",
    f = e ? "text-zinc-600 cursor-not-allowed" : "text-zinc-400 cursor-not-allowed";
  return c.jsx("div", {
    className: "absolute left-1/2 bottom-full z-[120] -translate-x-1/2 nodrag nopan nowheel transition-opacity duration-200 ease-out",
    "data-preview-node-toolbar": !0,
    onMouseDown: y => y.stopPropagation(),
    onClick: y => y.stopPropagation(),
    style: {
      marginBottom: `${X0o}px`,
      opacity: n,
      pointerEvents: t ? "auto" : "none"
    },
    children: c.jsx("div", {
      ref: u,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        className: `transition-all duration-150 ${t ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none"}`,
        children: c.jsxs("div", {
          className: `input-node-fast-tooltip ${e ? "input-node-fast-tooltip--dark" : "input-node-fast-tooltip--light"} box-select-toolbar-capsule flex items-center overflow-hidden ${fJ(e)}`,
          children: [c.jsxs("button", {
            type: "button",
            className: `${h} toolbar-label-btn--capsule-start ${a ? r ? m : p : f}`,
            "data-toolbar-active": r ? "true" : "false",
            disabled: !a,
            onClick: o,
            children: [c.jsx(v5e, {
              size: 16,
              className: "shrink-0"
            }), c.jsx("span", {
              children: x(r ? "收起拼图" : "拼图")
            })]
          }), c.jsxs("button", {
            type: "button",
            className: `${h} ${p}`,
            onClick: s,
            children: [c.jsx(INr, {
              size: 16,
              className: "shrink-0"
            }), c.jsx("span", {
              children: x("发送到画布")
            })]
          }), c.jsxs("button", {
            type: "button",
            className: `${h} ${p}`,
            onClick: l,
            children: [c.jsx(qv, {
              size: 16,
              className: "shrink-0"
            }), c.jsx("span", {
              children: x("发送到对话")
            })]
          }), i && c.jsxs("button", {
            type: "button",
            className: `${h} ${p}`,
            onClick: d,
            children: [c.jsx(Od, {
              size: 16,
              className: "shrink-0"
            }), c.jsx("span", {
              children: x("发送到分镜")
            })]
          })]
        })
      })
    })
  });
}

const IPe = 256;

function uwe() {
  return new Promise(e => {
    typeof requestIdleCallback < "u" ? requestIdleCallback(() => e(), {
      timeout: 32
    }) : requestAnimationFrame(() => setTimeout(e, 0));
  });
}

function wDe(e, t = "image/png", n) {
  return new Promise((r, a) => {
    e.toBlob(i => {
      if (!i) {
        a(new Error("canvas.toBlob failed"));
        return;
      }
      const o = new FileReader();
      o.onload = () => r(String(o.result || "")), o.onerror = () => a(o.error || new Error("readAsDataURL failed")), o.readAsDataURL(i);
    }, t, n);
  });
}

async function Z0o(e, t, n) {
  if (t <= IPe && n <= IPe) return await uwe(), wDe(e, "image/png");
  const r = Math.min(IPe / t, IPe / n),
    a = Math.round(t * r),
    i = Math.round(n * r),
    o = document.createElement("canvas");
  o.width = a, o.height = i;
  const s = o.getContext("2d");
  return s ? (s.drawImage(e, 0, 0, t, n, 0, 0, a, i), await uwe(), wDe(o, "image/jpeg", .92)) : (await uwe(), wDe(e, "image/png"));
}

function eyo(e) {
  return typeof e.decode == "function" ? e.decode().then(() => e).catch(() => e) : Promise.resolve(e);
}

function Bct(e, t) {
  return new Promise((n, r) => {
    const a = new Image();
    t && (a.crossOrigin = "anonymous"), a.onload = () => {
      eyo(a).then(n);
    }, a.onerror = i => r(i), a.src = e;
  });
}

async function pvr(e) {
  const t = String(e || "").trim();
  if (!t) throw new Error("empty puzzle image");
  if (/^https?:/i.test(t)) try {
    const n = await fetch(t, {
      mode: "cors"
    });
    if (!n.ok) throw new Error(`puzzle image fetch ${n.status}`);
    const r = await n.blob();
    return Bct(URL.createObjectURL(r), !1);
  } catch {
    return Bct(t, !0);
  }
  return Bct(t, !1);
}

async function mvr(e, t, n) {
  const r = Array.isArray(n) && n.length === e.length ? n : e.map(d => d.src),
    a = sue(t.pieces, r),
    i = document.createElement("canvas"),
    o = i.getContext("2d", {
      alpha: !1,
      desynchronized: !0
    });
  if (!o) throw new Error("canvas 2d unavailable");
  if (t.layoutMode === "horizontal" || t.layoutMode === "vertical") {
    const d = lvr(e, t.layoutMode, t.style.gap, t.concatRatios);
    i.width = d.width, i.height = d.height, W0o(o, e, t.layoutMode, t.style, t.concatRatios);
  } else {
    const d = o$t(t, e.length),
      u = G0o(e, svr(t, e[0], e.length));
    i.width = u.width, i.height = u.height, H0o(o, e, a, d.slice(0, e.length), t.style, u.width, u.height);
  }
  F0o(o, t.watermark, i.width, i.height);
  const [s, l] = await Promise.all([wDe(i, "image/png"), Z0o(i, i.width, i.height)]);
  return {
    fullDataUrl: s,
    previewDataUrl: l,
    width: i.width,
    height: i.height
  };
}

async function tyo(e, t, n) {
  n == null || n(12), await uwe();
  const r = await Promise.all(e.map(i => pvr(i)));
  n == null || n(58), await uwe();
  const a = await mvr(r, t, e);
  return n == null || n(92), a;
}

function s0n() {
  return new Promise(e => {
    typeof requestIdleCallback < "u" ? requestIdleCallback(() => e(), {
      timeout: 32
    }) : requestAnimationFrame(() => setTimeout(e, 0));
  });
}

function nyo(e) {
  for (const t of e) try {
    URL.revokeObjectURL(t);
  } catch {}
}

function l0n(e, t) {
  return {
    ...e,
    pieces: sue(e.pieces, t)
  };
}

const ryo = ({
  isOpen: e,
  isDark: t,
  images: n,
  assetIds: r,
  resolveSlotOriginal: a,
  rows: i,
  cols: o,
  nodeSettings: s,
  onSettingsChange: l,
  onClose: d,
  onStitchStart: u,
  onProgress: h,
  onStitchFailed: p,
  onStitched: m
}) => {
  on();
  const [f, y] = g.useState([]),
    [b, v] = g.useState(!1),
    [_, w] = g.useState(() => l0n(MO(s || {
      previewGridRows: i,
      previewGridCols: o
    }), n)),
    [k, A] = g.useState(null),
    S = g.useRef(_);
  S.current = _;
  const C = n.join("");
  g.useEffect(() => {
    e && (y([...n]), v(!1), w(l0n(MO(s || {
      previewGridRows: i,
      previewGridCols: o
    }), n)));
  }, [e, C, i, o]), g.useEffect(() => {
    const G = f[0];
    if (!G) {
      A(null);
      return;
    }
    const z = new Image();
    z.onload = () => A({
      naturalWidth: z.naturalWidth,
      naturalHeight: z.naturalHeight
    }), z.onerror = () => A(null), z.src = G;
  }, [f]);
  const I = g.useCallback(() => {
      l == null || l(S.current);
    }, [l]),
    E = g.useMemo(() => o$t(_, f.length), [_, f.length]),
    M = (G, z) => {
      y(V => YSt(V, G, z)), w(V => ({
        ...V,
        pieces: YSt(V.pieces, G, z)
      }));
    },
    T = g.useCallback(async (G, z) => {
      const V = r == null ? void 0 : r[G];
      let O = String(z || "").trim();
      if (!O) return O;
      const L = async D => {
        if (D.startsWith("blob:") || D.startsWith("data:")) return D;
        const U = await fetch(D);
        if (!U.ok) return D;
        const H = await U.blob();
        return URL.createObjectURL(H);
      };
      try {
        if (a) {
          const le = await a(G, O);
          if (le) return L(le);
        }
        const [{
            contentStore: D
          }, {
            getFullBlobForDisplayUrl: U,
            getAssetIdForDisplayBlobUrl: H
          }, Y, K] = await Promise.all([Ie(() => Promise.resolve().then(() => Ly), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => No), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => ii), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => Ui), void 0, import.meta.url)]),
          {
            isOssPublicHttpUrl: W,
            resolveGlobalOssThumbnailToOriginalUrl: Q,
            normalizeOssPublicHttpUrl: q
          } = Y,
          {
            readPreviewWindowAssetOriginalUrl: ne
          } = K;
        if (D.isContentRef(O)) {
          await D.init();
          const le = await D.get(D.extractId(O));
          le && (O = le);
        }
        if (W(O)) {
          const le = Q(O) || q(O) || O;
          le && (O = le);
        }
        const de = V || (O.startsWith("blob:") ? H(O) : void 0);
        if (de) {
          const le = await ne(de, O);
          if (le) return L(le);
        }
        if (O.startsWith("blob:")) {
          const le = await U(O, de || null, null);
          if (le) return URL.createObjectURL(le);
        }
        if (V) {
          const {
            localCacheManager: le
          } = await Ie(async () => {
            const {
              localCacheManager: ce
            } = await Promise.resolve().then(() => Ha);
            return {
              localCacheManager: ce
            };
          }, void 0, import.meta.url);
          if (le.isAvailable() && le.hasAsset(V)) {
            const ce = await le.readAsset(V);
            if (ce != null && ce.blob) return URL.createObjectURL(ce.blob);
          }
          const {
              assetStore: J
            } = await Ie(async () => {
              const {
                assetStore: ce
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: ce
              };
            }, void 0, import.meta.url),
            pe = await J.getAssetBlob(V);
          if (pe) return URL.createObjectURL(pe);
        }
        if (!O.startsWith("data:") && !O.startsWith("blob:")) return L(O);
      } catch {}
      return O;
    }, [r, a]),
    P = g.useCallback(async G => {
      const z = [],
        V = await Promise.all(G.map(async (L, D) => {
          const U = await T(D, L);
          return U.startsWith("blob:") && U !== L && z.push(U), U;
        }));
      return await s0n(), {
        images: await Promise.all(V.map(L => pvr(L))),
        objectUrlsToRevoke: z
      };
    }, [T]),
    R = g.useCallback(G => {
      h == null || h(Math.max(0, Math.min(100, G)));
    }, [h]),
    j = g.useCallback(async () => {
      if (f.length) {
        I(), v(!0), u == null || u(), R(3), await s0n();
        try {
          const G = _.layoutMode === "horizontal" || _.layoutMode === "vertical" ? f : f.slice(0, Math.max(1, E.length));
          R(12);
          const {
            images: z,
            objectUrlsToRevoke: V
          } = await P(G);
          R(58);
          try {
            R(82);
            const {
              fullDataUrl: O,
              previewDataUrl: L,
              width: D,
              height: U
            } = await mvr(z, {
              ..._,
              pieces: sue(_.pieces, G)
            });
            R(92), v(!1), d(), Promise.resolve(m({
              fullDataUrl: O,
              previewDataUrl: L,
              width: D,
              height: U
            })).catch(H => {
              console.error("[GridStitchModal] 拼接结果写回失败:", H);
            });
          } finally {
            nyo(V);
          }
        } catch (G) {
          console.error("[GridStitchModal] 拼接失败:", G), v(!1), p == null || p();
        }
      }
    }, [f, _, E, P, u, p, R, m, d, I]);
  if (!e) return null;
  const B = _.layoutMode === "horizontal" ? "横拼：拖分隔条调比例，滚轮缩放，拖移已放大的格子" : _.layoutMode === "vertical" ? "竖拼：拖分隔条调比例，滚轮缩放，拖移已放大的格子" : _.layoutMode === "template" ? "模板：双击切换铺满/完整，滚轮缩放" : "网格：拖分隔条调比例，双击切换铺满/完整",
    F = () => {
      I(), d();
    },
    N = c.jsx("div", {
      className: "fixed inset-0 z-[120] flex items-center justify-center p-4",
      style: {
        backgroundColor: t ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.45)"
      },
      onMouseDown: F,
      children: c.jsxs("div", {
        className: `w-[760px] min-w-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] rounded-xl shadow-2xl overflow-hidden flex flex-col flex-shrink-0 ${t ? "bg-[#18181b] text-zinc-100" : "bg-white text-zinc-900"}`,
        onMouseDown: G => G.stopPropagation(),
        children: [c.jsxs("div", {
          className: `px-4 py-3 border-b flex flex-col gap-3 flex-shrink-0 ${t ? "border-zinc-700" : "border-zinc-200"}`,
          children: [c.jsxs("div", {
            className: "flex items-start justify-between gap-3",
            children: [c.jsxs("div", {
              className: "flex flex-col gap-0.5 min-w-0 flex-1",
              children: [c.jsx("span", {
                className: "text-sm font-medium whitespace-nowrap",
                children: x("拼图")
              }), c.jsx("span", {
                className: "text-[11px] opacity-70 break-words",
                children: x(B)
              })]
            }), c.jsx("button", {
              type: "button",
              className: "text-xs px-2 py-1 rounded border border-transparent hover:border-zinc-500/60 whitespace-nowrap flex-shrink-0",
              onClick: F,
              children: x("关闭")
            })]
          }), c.jsx(hvr, {
            scopeId: "preview-puzzle-modal",
            isDark: t,
            puzzle: _,
            imageCount: f.length,
            onChange: w,
            menuZIndex: 200
          })]
        }), c.jsx("div", {
          className: `flex-1 overflow-hidden p-4 ${t ? "[scrollbar-color:rgba(255,255,255,0.22)_transparent] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/32" : ""}`,
          children: c.jsx("div", {
            className: "mx-auto h-[360px] w-full max-w-[640px]",
            children: c.jsx(uvr, {
              images: f,
              puzzle: _,
              isDark: t,
              firstSize: k,
              fill: "contain",
              onChange: w,
              onReorder: M,
              overlay: G => c.jsx("div", {
                className: `absolute top-1 left-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${t ? "bg-black/60 text-white" : "bg-white/80 text-zinc-800"}`,
                children: G + 1
              })
            })
          })
        }), c.jsxs("div", {
          className: `px-4 py-3 border-t flex items-center justify-between gap-3 flex-shrink-0 ${t ? "border-zinc-700" : "border-zinc-200"}`,
          children: [c.jsxs("span", {
            className: "text-[11px] opacity-70 break-words min-w-0",
            children: [x("当前共 "), f.length, x(" 张图。预览节点保持多图，合并结果输出到右侧新节点。")]
          }), c.jsxs("div", {
            className: "flex items-center gap-2 flex-shrink-0",
            children: [c.jsx("button", {
              type: "button",
              className: `px-3 py-1.5 rounded text-xs border whitespace-nowrap ${t ? "border-zinc-600 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
              onClick: F,
              disabled: b,
              children: x("取消")
            }), c.jsx("button", {
              type: "button",
              className: `px-3 py-1.5 rounded text-xs font-medium border whitespace-nowrap ${t ? "border-violet-500 bg-violet-600 text-white hover:bg-violet-500" : "border-blue-500 bg-blue-600 text-white hover:bg-blue-500"} ${b ? "opacity-80 cursor-wait" : ""}`,
              onClick: () => void j(),
              disabled: b || f.length < 2,
              children: x(b ? "合并中…" : "合并输出到新节点")
            })]
          })]
        })]
      })
    });
  return Da.createPortal(N, document.body);
};

function c0n(e) {
  if (!e || typeof e != "string") return !1;
  const t = e.toLowerCase();
  return (t.includes("prod-ss-vidu") || t.includes("s3") && t.includes("amazonaws")) && (t.includes(".mp4") || t.includes("/video"));
}

function d0n(e) {
  const t = e.settings || {},
    n = Array.isArray(e.previewMjImages) ? e.previewMjImages : [],
    r = Array.isArray(t.mjImages) ? t.mjImages : [],
    a = Array.isArray(t.previewMjImages) ? t.previewMjImages : [],
    i = Array.isArray(t.batchImages) ? t.batchImages : [],
    o = Array.isArray(t.generatedImages) ? t.generatedImages.map(d => d.thumbUrl || d.fullUrl || d.url || "").filter(d => typeof d == "string" && d.length > 0) : [],
    s = [n, a, r, i, o];
  let l = [];
  for (const d of s) d.length > l.length && (l = d);
  return l;
}

function ayo(e, t, n) {
  const a = (e.settings || {}).selectedPreviewImageIndex;
  if (typeof a == "number" && a >= 0) {
    const s = Math.max(t.length, n.length, 1) - 1;
    return Math.min(a, s);
  }
  const i = typeof e.selectedPreviewImage == "string" ? e.selectedPreviewImage.trim() : "";
  if (!i) return 0;
  let o = t.findIndex(s => s === i);
  return o < 0 && (o = n.findIndex(s => s === i)), o >= 0 ? o : 0;
}

function CPe(e, t, n) {
  const r = String(e || "").trim();
  if (!r) return;
  if (!/_mj_\d+$/.test(r)) return r;
  const a = (t == null ? void 0 : t.settings) || {},
    i = a._mjAssetIds || [],
    o = String(i[n] || "").trim();
  if (o && !o.includes("_mj_")) return o;
  const l = (a.generatedImages || [])[n],
    d = String((l == null ? void 0 : l.assetId) || "").trim();
  return d && !d.includes("_mj_") && !d.includes("_batch_") ? d : r.replace(/_mj_\d+$/, "");
}

function Fct(e, t, n, r) {
  var s;
  const a = t.startsWith("blob:") && vm(t) || void 0;
  if (a) return a;
  const i = (s = n[e]) == null ? void 0 : s.trim();
  if (i && !i.includes("_batch_")) return i;
  const o = String(r || "").trim();
  if (e === 0 && o && !o.includes("_batch_")) return o;
}

