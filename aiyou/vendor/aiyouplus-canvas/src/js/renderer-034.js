const iyo = ({
  node: e,
  documentSession: t,
  isDark: n,
  updateNode: r,
  setNodes: a,
  setPreviewContextMenu: i,
  setLightboxItem: o,
  setLightboxOpen: s,
  setChatFiles: l,
  setIsChatOpen: d,
  generateId: u,
  viewZoom: h = 1,
  onDownload: p,
  isDownloading: m = !1,
  downloadProgress: f,
  renderQuality: y = "high",
  nodes: b = [e],
  connections: v = [],
  splitImageToShots: _,
  setConnections: w,
  setIsCanvasFullscreen: k,
  onGenerateFromUpstream: A,
  isCompactMode: S = !1,
  onCompactModeImageClick: C,
  isCompactUiMode: I = !1,
  enableGenerationNodeAnimation: E = !0
}) => {
  var je, Qe, Mt, cn, Qn, Lt;
  on();
  const M = Ia.useRef({
      node: e,
      nodes: b,
      document: t,
      setNodes: a
    }),
    T = Ia.useMemo(() => x0o(() => M.current), []);
  Ia.useLayoutEffect(() => {
    M.current = {
      node: e,
      nodes: b,
      document: t,
      setNodes: a
    }, T.observe(b);
  }), Ia.useEffect(() => (T.activate(), () => T.dispose()), [T]);
  const [P, R] = Ia.useState(null),
    [j, B] = Ia.useState([]),
    [F, N] = Ia.useState(null),
    [G, z] = Ia.useState(!1),
    [V, O] = Ia.useState(!1),
    L = Ia.useRef(!1),
    D = Ia.useRef(null),
    U = Ia.useCallback(ct => {
      const Dt = D.current;
      Dt && (Dt.style.width = `${Math.min(100, Math.max(0, ct))}%`);
    }, []),
    [H, Y] = Ia.useState(!1),
    [K, W] = Ia.useState(!1),
    Q = Ia.useRef(!1),
    [, q] = Ia.useState(0),
    ne = Ia.useCallback(() => {
      Q.current = !0, q(ct => ct + 1);
    }, []),
    [de, le] = Ia.useState(null),
    J = Ia.useCallback(async (ct, Dt) => {
      if (!(ct != null && ct.startsWith("blob:"))) return null;
      try {
        const {
          recoverDeadBlobUrl: bn
        } = await Ie(async () => {
          const {
            recoverDeadBlobUrl: Rt
          } = await Promise.resolve().then(() => No);
          return {
            recoverDeadBlobUrl: Rt
          };
        }, void 0, import.meta.url);
        return await bn(ct, [Dt]);
      } catch {
        return null;
      }
    }, []),
    [pe, ce] = Ia.useState(!1),
    [we, X] = Ia.useState(!1),
    [Z, re] = Ia.useState(!1),
    [fe, ye] = Ia.useState(null),
    ie = Ia.useRef(null);
  ie.current = fe;
  const [ae, be] = Ia.useState(!1),
    Ee = Ia.useRef(0),
    xe = Ia.useRef(e.settings);
  xe.current = e.settings;
  const he = Ia.useRef({
      width: e.width,
      height: e.height,
      imageCount: 1,
      first: null
    }),
    ue = Ia.useRef(!1),
    ge = Ia.useRef(!1),
    _e = Ia.useRef(0),
    ke = Ia.useCallback(() => {
      if (ue.current || ge.current) return !0;
      const ct = ie.current || MO(xe.current || {});
      return !!(ct.gridAspectRatio && ct.gridAspectRatio !== "auto");
    }, []),
    ve = Ia.useCallback((ct, Dt) => {
      PJe(e.id, ct.width, ct.height), r(e.id, {
        width: ct.width,
        height: ct.height,
        ...Dt
      }), Ude([e.id]);
    }, [e.id, r]),
    Te = Ia.useCallback(ct => {
      const Dt = MO(xe.current || {}),
        Rt = i0n(Dt) !== i0n(ct) ? {
          ...ct,
          pieces: (ct.pieces || []).map(fn => fn.zoom === 1 && fn.offsetX === .5 && fn.offsetY === .5 ? {
            ...fn,
            fit: "contain"
          } : fn)
        } : ct;
      ie.current = Rt, ye(Rt), window.clearTimeout(Ee.current), Ee.current = window.setTimeout(() => {
        r(e.id, {
          settings: {
            ...(xe.current || {}),
            ...a0n(Rt),
            ...(ge.current ? {
              previewPuzzleChromeOpen: !0
            } : {})
          }
        });
      }, 300);
    }, [e.id, r]);
  Ia.useEffect(() => () => window.clearTimeout(Ee.current), []), Ia.useEffect(() => {
    Z || ye(null);
  }, [Z]);
  const [Ne, me] = Ia.useState([]),
    [Ae, Fe] = Ia.useState([]),
    Me = Ia.useRef(0),
    Re = Ia.useRef(!1),
    [$e, rt] = Ia.useState(!1),
    [nt, ze] = Ia.useState(() => {
      var ct;
      return !!((ct = e.settings) != null && ct.previewPuzzleChromeOpen);
    });
  ge.current = nt;
  const Le = Ia.useCallback(ct => {
      ze(ct), ge.current = ct;
      const Dt = {
        ...(xe.current || {})
      };
      ct ? Dt.previewPuzzleChromeOpen = !0 : delete Dt.previewPuzzleChromeOpen, r(e.id, {
        settings: Dt
      });
    }, [e.id, r]),
    Ke = Ia.useRef(null),
    Xe = Ia.useRef(null),
    De = e.settings || {},
    Ye = typeof De._stitchedFullUrl == "string" ? De._stitchedFullUrl.trim() : "",
    Ce = typeof De._stitchedPreviewUrl == "string" ? De._stitchedPreviewUrl.trim() : "",
    He = !!(De._isStoryboardMosaic && Ye),
    Ve = He ? Ce || Ye : typeof e.content == "string" ? e.content : "",
    it = e._contentAssetId || ((je = e.settings) == null ? void 0 : je._contentAssetId),
    It = (Qe = e.settings) == null ? void 0 : Qe._thumbnailAssetId,
    Ft = e.previewType === "video",
    {
      content: We,
      isLoading: Ze
    } = Kp(Ve, {
      usePreview: !Ft && !He,
      useOriginal: He,
      nodeType: "preview",
      shouldLoadContent: !0,
      preferConstantDisplay: !0,
      allowSessionBlob: Ft,
      allowDirectOssUrl: He,
      blobRecoveryAssetIds: It ? [It, it].filter(ct => !!ct) : it ? [it] : void 0
    }),
    {
      content: Ge
    } = Kp(e.selectedPreviewImage, {
      nodeType: "preview",
      shouldLoadContent: !0,
      preferConstantDisplay: !0
    }),
    {
      content: Oe
    } = Kp(e.selectedPreviewVideo, {
      nodeType: "preview",
      shouldLoadContent: !0,
      preferConstantDisplay: !0
    }),
    st = e.previewMjImages || [],
    vt = Ia.useMemo(() => (e._previewMjAssetIds || []).map(ct => ct ? [ct] : void 0), [e]),
    Ht = j1(st, {
      usePreview: !0,
      nodeType: "preview",
      shouldLoadContent: !0,
      preferConstantDisplay: !0,
      blobRecoveryAssetIdsPerIndex: vt
    }),
    nn = Ht.map(ct => ct.content).filter(Boolean),
    pt = Ht.some(ct => ct.isLoading),
    lt = e.previewMjVideos || [],
    gt = j1(lt, {
      nodeType: "preview",
      shouldLoadContent: !0,
      preferConstantDisplay: !0
    }),
    Ut = gt.map(ct => ct.content).filter(Boolean),
    _t = gt.some(ct => ct.isLoading),
    At = e.settings || {},
    Yt = ei(),
    qe = Ia.useCallback(ct => {
      const Dt = String(ct || "").trim();
      if (!Dt) return !1;
      if (Dt.startsWith("data:video") || Dt.includes("force_video_display=true")) return !0;
      const bn = Dt.split("?")[0].toLowerCase();
      return /\.(mp4|webm|mov|m3u8)$/.test(bn);
    }, []),
    St = !!(e._expandPending && typeof e._expandTaskStartTime == "number") || typeof At.expandModelId == "string" || typeof At.expandModelName == "string" || typeof At.eraserModelId == "string" || typeof At.eraserModelName == "string" || typeof At.rembgModelName == "string" || At.blockUpstreamPassthrough === !0,
    hn = Ia.useMemo(() => w0o(b, v, e.id), [v, e.id, b]),
    Qt = Ia.useMemo(() => hn.filter(ct => {
      if (!ct || ct.type !== "input-image") return !1;
      const Dt = ct.content;
      return typeof Dt == "string" && Dt.length > 0;
    }), [hn]),
    Ot = Ia.useMemo(() => Qt.map(ct => ct.content), [Qt]),
    ln = Ia.useMemo(() => Qt.map(ct => {
      if (!Yt) {
        const Dt = wP(ct);
        if (Dt) return Dt;
      }
      return typeof ct.content == "string" ? ct.content : "";
    }), [Qt, Yt]),
    Pn = Ia.useMemo(() => Qt.map(ct => {
      const Dt = ct.settings || {};
      return typeof Dt._localCacheAssetId == "string" && Dt._localCacheAssetId.trim() || typeof Dt._contentAssetId == "string" && Dt._contentAssetId.trim() || typeof Dt._assetId == "string" && Dt._assetId.trim() || void 0;
    }), [Qt]),
    rn = Ia.useMemo(() => Qt.map(ct => {
      const Dt = ct.settings || {};
      return String(Dt._ossRemoteUrl || "").trim();
    }), [Qt]),
    Yn = Ia.useMemo(() => {
      const ct = hn.filter(bn => bn != null && bn.type === "gen-image"),
        Dt = b.find(bn => {
          var Rt, fn;
          return bn.type === "gen-image" && (((Rt = bn.settings) == null ? void 0 : Rt.selectedPreviewId) === e.id || ((fn = bn.settings) == null ? void 0 : fn._autoCreatedPreviewId) === e.id);
        });
      return Dt && !ct.some(bn => bn.id === Dt.id) && ct.push(Dt), ct;
    }, [hn, e.id, b]),
    Ct = Ia.useMemo(() => {
      const ct = [];
      for (const Dt of Yn) ct.push(...G9e(Dt));
      return ct;
    }, [Yn]),
    Cn = Ia.useMemo(() => {
      const ct = [];
      let Dt = 0;
      for (const bn of Yn) {
        const Rt = G9e(bn),
          fn = Rt.length > 0 ? Rt.length : 0;
        fn > 0 && (ct.push({
          node: bn,
          offset: Dt,
          count: fn
        }), Dt += fn);
      }
      return ct;
    }, [Yn]),
    un = Ia.useMemo(() => Ct.map((ct, Dt) => {
      var Un;
      const bn = Cn.find(er => Dt >= er.offset && Dt < er.offset + er.count);
      if (!bn) return;
      const Rt = Dt - bn.offset,
        fn = bn.node,
        Zt = fn.settings || {},
        Ln = [],
        tt = er => {
          const Cr = String(er || "").trim();
          Cr && !Ln.includes(Cr) && Ln.push(Cr);
        };
      tt(fn._contentAssetId), tt(Zt._contentAssetId), tt(Zt._assetId);
      const zt = Zt.generatedImages || [];
      tt((Un = zt[Rt]) == null ? void 0 : Un.assetId);
      const an = Zt._mjPreviewAssetIds,
        Rn = Zt._mjAssetIds;
      return tt(an == null ? void 0 : an[Rt]), tt(Rn == null ? void 0 : Rn[Rt]), Ln.length > 0 ? Ln : void 0;
    }), [Ct, Cn]),
    Jn = Ia.useMemo(() => {
      var bn;
      const ct = hn.filter(Rt => Rt != null && (Rt.type === "rh-app" || Rt.type === "rh-comfy")),
        Dt = [];
      for (const Rt of ct) {
        const fn = Rt.previewMjImages;
        if (fn != null && fn.length) Dt.push(...fn);else if (typeof Rt.content == "string" && Rt.content.length > 0) Dt.push(Rt.content);else {
          const Zt = (bn = Rt.settings) == null ? void 0 : bn.generatedImages;
          Zt != null && Zt.length && Dt.push(...Zt.map(Ln => Ln.thumbUrl || Ln.fullUrl).filter(Boolean));
        }
      }
      return Dt;
    }, [hn]),
    Kn = Ia.useMemo(() => {
      var Rt;
      const ct = hn.filter(fn => fn != null && (fn.type === "topaz-upscale" || fn.type === "jimeng-super-resolution" || fn.type === "image-wash" || fn.type === "fal-rembg" || fn.type === "virtual-try-on")),
        Dt = [],
        bn = [];
      for (const fn of ct) {
        const Zt = Ry(fn),
          Ln = String(fn.previewType || ((Rt = fn.settings) == null ? void 0 : Rt.previewType) || "").toLowerCase() === "video";
        for (const tt of Zt) tt && (Ln || qe(tt) ? bn.push(tt) : Dt.push(tt));
      }
      return {
        images: Dt,
        videos: bn
      };
    }, [hn, qe]),
    en = j1(St ? [] : ln, {
      usePreview: !1,
      useOriginal: !0,
      nodeType: "preview",
      shouldLoadContent: !St,
      preferConstantDisplay: !0
    }),
    Vn = en.map(ct => ct.content).filter(Boolean);
  en.some(ct => ct.isLoading);
  const Tt = !St && Qt.length > 0 && Ct.length === 0 && st.length === 0 && !(At._isStoryboardMosaic && At._stitchedFullUrl) && nn.length === 0 && Ut.length === 0 && e.previewType !== "video",
    Ue = !St && Yn.length > 0 && Qt.length === 0 && st.length === 0 && !(At._isStoryboardMosaic && At._stitchedFullUrl) && nn.length === 0 && Ut.length === 0 && e.previewType !== "video",
    et = !Tt && !Ue && (!!We || nn.length > 0 || Ut.length > 0 || !!Ge || !!Oe || !!e.content || st.length > 0 || ((Mt = e.previewMjVideos) == null ? void 0 : Mt.some(ct => typeof ct == "string" && ct.trim())) || e.previewType === "video"),
    ft = !St && !et && Ot.length >= 2,
    ht = !St && !et && Ot.length === 1,
    jt = j1(St ? [] : Ct, {
      usePreview: !0,
      nodeType: "preview",
      shouldLoadContent: !St,
      preferConstantDisplay: !0,
      allowDirectOssUrl: !0,
      blobRecoveryAssetIdsPerIndex: St ? void 0 : un
    }).map(ct => ct.content).filter(Boolean),
    bt = !St && !et && Ct.length >= 2,
    Bt = !St && !et && Ct.length === 1,
    at = j1(Jn, {
      usePreview: !0,
      nodeType: "preview",
      shouldLoadContent: !0,
      preferConstantDisplay: !0
    }).map(ct => ct.content).filter(Boolean),
    Pt = Jn.length > 0,
    xt = j1(Kn.images, {
      usePreview: !0,
      nodeType: "preview",
      shouldLoadContent: !0,
      preferConstantDisplay: !0
    }).map(ct => ct.content).filter(Boolean),
    yn = Kn.images.length > 0,
    mt = j1(Kn.videos, {
      nodeType: "preview",
      shouldLoadContent: !0,
      preferConstantDisplay: !0
    }).map(ct => ct.content).filter(Boolean),
    Xt = Kn.videos.length > 0,
    Gn = !!(At._isStoryboardMosaic && At._stitchedFullUrl),
    rr = We || nn.length > 0 || Ut.length > 0 || Gn && !!We || Ft && typeof e.content == "string" && e.content.trim().length > 0 || ft && (Vn.length > 0 || Ot.length >= 2) || ht && (Vn.length > 0 || Ot.length === 1) || bt && (jt.length > 0 || Ct.length >= 2) || Bt && (jt.length > 0 || Ct.length === 1) || yn && (xt.length > 0 || Kn.images.length > 0) || Xt && (mt.length > 0 || Kn.videos.length > 0) || Pt && (at.length > 0 || Jn.length > 0),
    qn = Ft && We ? [We] : Ft && typeof e.content == "string" && e.content.trim() ? [e.content.trim()] : [],
    Dn = Gn && We ? [We] : ft && Ot.length >= 2 ? Vn.length >= 2 ? Vn : Ot : ht && Vn.length > 0 ? Vn : bt && Ct.length >= 2 ? jt.length >= 2 ? jt : Ct : Bt && jt.length > 0 ? jt : yn && xt.length > 0 ? xt : st.length > 1 ? nn.length > 1 ? nn : st : nn.length > 0 ? nn : Pt && at.length > 0 ? at : !Ft && We ? [We] : [],
    Ar = Ut.length > 0 ? Ut : qn.length > 0 ? qn : mt.length > 0 ? mt : [],
    _r = S || I,
    Pa = !1,
    fa = Dn,
    Ca = Dn.length > 1 || Pa,
    $n = Oe || Ge || Ar[0] || Dn[0] || null,
    yr = Dn.length > 1,
    Ir = Ar.length > 1,
    [Gr, Zr] = Ia.useState(0);
  Ia.useEffect(() => {
    Zr(ayo(e, st, Dn));
  }, [e.id, e.selectedPreviewImage, e.settings, st, Dn]);
  const La = Ia.useCallback(async (ct, Dt, bn) => {
      const Rt = Mae(e);
      if (Rt && Dt === "image") {
        const {
          resolvePreviewDownloadUrlAsync: tt
        } = await Ie(async () => {
          const {
            resolvePreviewDownloadUrlAsync: zt
          } = await Promise.resolve().then(() => ii);
          return {
            resolvePreviewDownloadUrlAsync: zt
          };
        }, void 0, import.meta.url);
        return tt(Rt, {
          previewNode: e,
          upstreamNodes: hn,
          mediaType: Dt
        });
      }
      const {
          resolveNodeDownloadUrl: fn,
          resolvePreviewDownloadUrlAsync: Zt
        } = await Ie(async () => {
          const {
            resolveNodeDownloadUrl: tt,
            resolvePreviewDownloadUrlAsync: zt
          } = await Promise.resolve().then(() => ii);
          return {
            resolveNodeDownloadUrl: tt,
            resolvePreviewDownloadUrlAsync: zt
          };
        }, void 0, import.meta.url),
        Ln = fn(e, ct, {
          upstreamNodes: hn,
          mediaType: Dt,
          imageIndex: bn
        });
      return Ln.startsWith("blob:") || Ln.startsWith("content_ref:") ? Zt(Ln, {
        previewNode: e,
        upstreamNodes: hn,
        mediaType: Dt,
        imageIndex: bn
      }) : Ln;
    }, [e, hn]),
    {
      upstreamGenNodes: sa,
      isUpstreamReused: Ea
    } = Ia.useMemo(() => {
      const Dt = v.filter(Zt => Zt.to === e.id && (!Zt.inputType || Zt.inputType === "default")).map(Zt => Zt.from),
        bn = b.filter(Zt => Dt.includes(Zt.id) && (Zt.type === "gen-image" || Zt.type === "gen-video" || Zt.type === "motion-control" || Zt.type === "video-relight" || Zt.type === "storyboard-chart-node" || Zt.type === "rh-app" || Zt.type === "rh-comfy")),
        Rt = new Set(b.filter(Zt => Zt.type === "preview").map(Zt => Zt.id)),
        fn = bn.some(Zt => v.filter(Ln => Ln.from === Zt.id && Rt.has(Ln.to)).length >= 2);
      return {
        upstreamGenNodes: bn,
        isUpstreamReused: fn
      };
    }, [v, e.id, b]);
  Ia.useMemo(() => {
    const ct = Dt => {
      const bn = Dt.settings || {},
        Rt = bn.selectedPreviewId,
        fn = bn._autoCreatedPreviewId;
      if (Rt) return Rt === e.id;
      if (fn) return fn === e.id;
      const Zt = v.filter(Ln => Ln.from === Dt.id).map(Ln => {
        var tt;
        return (tt = b.find(zt => zt.id === Ln.to && zt.type === "preview")) == null ? void 0 : tt.id;
      }).filter(Ln => typeof Ln == "string");
      return Zt.length > 0 ? Zt[Zt.length - 1] === e.id : !1;
    };
    return sa.filter(ct);
  }, [sa, v, b, e.id]);
  const ba = Ia.useMemo(() => b.find(ct => {
      var Dt, bn;
      return (ct.type === "gen-image" || ct.type === "gen-video" || ct.type === "motion-control" || ct.type === "video-relight") && (((Dt = ct.settings) == null ? void 0 : Dt.selectedPreviewId) === e.id || ((bn = ct.settings) == null ? void 0 : bn._autoCreatedPreviewId) === e.id);
    }), [b, e.id]),
    ga = Ia.useMemo(() => {
      const ct = new Map();
      for (const Dt of sa) ct.set(Dt.id, Dt);
      return ba && ct.set(ba.id, ba), [...ct.values()];
    }, [sa, ba]),
    _a = Ia.useMemo(() => {
      var Rt, fn, Zt, Ln;
      const ct = ga;
      let Dt = null,
        bn = null;
      for (const tt of ct) {
        const zt = !!tt.isGenerating || !!((Rt = tt.settings) != null && Rt.isGenerating),
          an = tt.errorMsg || ((fn = tt.settings) == null ? void 0 : fn.error);
        zt && (Dt = tt), an && !bn && (bn = tt);
      }
      if (Dt) {
        const tt = (Zt = Dt.settings) == null ? void 0 : Zt.progress;
        return {
          generating: !0,
          progress: typeof tt == "number" ? tt : void 0
        };
      }
      return bn ? {
        generating: !1,
        error: bn.errorMsg || ((Ln = bn.settings) == null ? void 0 : Ln.error) || "生成失败"
      } : {
        generating: !1
      };
    }, [ga]);
  Ia.useEffect(() => {
    G && (_a.generating || K || z(!1));
  }, [G, _a.generating, K]), Ia.useEffect(() => {
    if (!G) return;
    const ct = window.setTimeout(() => z(!1), 300 * 1e3);
    return () => clearTimeout(ct);
  }, [G]), Ia.useEffect(() => {
    const ct = Dt => {
      const bn = Dt.detail;
      (bn == null ? void 0 : bn.previewNodeId) === e.id && (z(!1), W(!1));
    };
    return window.addEventListener("previewGenerateFailed", ct), () => window.removeEventListener("previewGenerateFailed", ct);
  }, [e.id]), Ia.useEffect(() => {
    const ct = bn => {
        const Rt = bn.detail;
        (Rt == null ? void 0 : Rt.targetPreviewId) === e.id && (oie(e) ? (ne(), r(e.id, {
          ...b2e(e),
          errorMsg: void 0
        })) : ne(), W(!0));
      },
      Dt = bn => {
        const Rt = bn.detail;
        (Rt == null ? void 0 : Rt.targetPreviewId) === e.id && (W(!1), Q.current = !1);
      };
    return window.addEventListener("previewGenerationStarted", ct), window.addEventListener("previewGenerationEnded", Dt), () => {
      window.removeEventListener("previewGenerationStarted", ct), window.removeEventListener("previewGenerationEnded", Dt);
    };
  }, [e, e.id, r, ne]);
  const $a = _a.generating || G || K,
    ta = Q.current && ($a || G || K) ? !1 : rr;
  Ia.useEffect(() => {
    $a || K || G || oie(e) && (Q.current = !1);
  }, [$a, K, G, e]), Ia.useEffect(() => {
    $a && (L.current = !0);
  }, [$a]), Ia.useEffect(() => {
    K && (L.current = !0);
  }, [K]), Ia.useEffect(() => {
    $a && Y(!1);
  }, [$a]), Ia.useEffect(() => {
    $a && O(!1);
  }, [$a]), Ia.useEffect(() => {
    $a || !L.current || rr && (L.current = !1, W(!1), O(!0));
  }, [rr, $a]);
  const ki = Ia.useCallback(ct => {
    ct.propertyName === "opacity" && (O(!1), U(0));
  }, [U]);
  Ia.useEffect(() => {
    if (!$a) {
      V || U(0);
      return;
    }
    const ct = Date.now(),
      Dt = 75 * 1e3;
    let bn = 0;
    const Rt = () => jl() || Ysr(),
      fn = () => {
        if (Rt()) return;
        const zt = Date.now() - ct,
          an = Math.min(zt / Dt * 100, 100);
        U(an), an < 100 && (bn = requestAnimationFrame(fn));
      },
      Zt = () => {
        cancelAnimationFrame(bn), Rt() || (bn = requestAnimationFrame(fn));
      },
      Ln = tZ(zt => {
        !zt && !dJe() ? Zt() : cancelAnimationFrame(bn);
      }),
      tt = MBt(zt => {
        zt === "none" && !jl() ? Zt() : cancelAnimationFrame(bn);
      });
    return Zt(), () => {
      Ln(), tt(), cancelAnimationFrame(bn);
    };
  }, [$a, V, U]);
  const Wn = st.length > 0 || Gn || ft && Vn.length >= 2 || ht && Vn.length > 0 || bt && (jt.length >= 2 || Ct.length >= 2) || Bt && (jt.length > 0 || Ct.length === 1) || Pt && at.length > 0,
    wr = !Wn && (e.previewType === "video" || Ir || $n && ($n.startsWith("data:video") || /\.(mp4|webm|mov)(\?|$)/i.test($n.split("?")[0]) || $n.includes("force_video_display=true"))),
    jn = e.previewType === "audio" || $n && ($n.startsWith("data:audio") || /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test($n.split("?")[0])),
    _n = $n && !Wn && (e.previewType === "video" || $n.startsWith("data:video") || $n.startsWith("blob:") || /\.(mp4|webm|mov)(\?|$)/i.test($n.split("?")[0]) || $n.includes("force_video_display=true") || ($n.startsWith("http://") || $n.startsWith("https://")) && ($n.includes("vlabvod.com") || $n.includes("dreamnia.jimeng.com") || $n.includes(".mp4"))),
    ar = Ze || pt || _t;
  (cn = e.settings) != null && cn.generationTime;
  const Vt = !!e._expandPending && typeof e._expandTaskStartTime == "number",
    [vn, An] = Ia.useState(!1),
    ur = Ia.useRef(!1);
  Ia.useEffect(() => {
    if (!Vt) {
      ur.current && An(!0), ur.current = !1;
      return;
    }
    ur.current = !0, An(!1);
  }, [Vt]);
  const zr = Ia.useCallback(ct => {
    ct.propertyName === "opacity" && An(!1);
  }, []);
  Ia.useEffect(() => {
    const ct = Vt || $a;
    return hu(e.id, ct), () => hu(e.id, !1);
  }, [Vt, $a, e.id]);
  const Dr = Ia.useRef(null);
  Ia.useEffect(() => {
    const ct = $n;
    if (!ct || !wr || !c0n(ct)) {
      Dr.current && (URL.revokeObjectURL(Dr.current), Dr.current = null), le(null), ce(!1), X(!1);
      return;
    }
    let Dt = !1;
    ce(!0), X(!1);
    const bn = async () => {
      try {
        const Rt = await fetch(ct, {
          mode: "cors"
        });
        if (Rt.ok) {
          const fn = await Rt.blob();
          if (fn && fn.size > 0) return URL.createObjectURL(fn);
        }
      } catch {}
      if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)) try {
        const {
            fetchRemoteImageAsBlob: Rt
          } = await Ie(async () => {
            const {
              fetchRemoteImageAsBlob: Zt
            } = await Promise.resolve().then(() => hg);
            return {
              fetchRemoteImageAsBlob: Zt
            };
          }, void 0, import.meta.url),
          fn = await Rt(ct);
        if (fn && fn.size > 0) return URL.createObjectURL(fn);
      } catch {}
      return null;
    };
    return (async () => {
      const Rt = await bn();
      if (Dt) {
        Rt && URL.revokeObjectURL(Rt);
        return;
      }
      le(Rt ?? ct), Dr.current = Rt, ce(!1), Rt || X(!0);
    })(), () => {
      Dt = !0, Dr.current && (URL.revokeObjectURL(Dr.current), Dr.current = null), le(null), ce(!1), X(!1);
    };
  }, [$n, wr]);
  const Wr = Ia.useMemo(() => {
      var Rt;
      const ct = v.find(fn => fn.to === e.id);
      if (!ct) return;
      const Dt = b.find(fn => fn.id === ct.from);
      return Dt && (Dt.prompt || ((Rt = Dt.settings) == null ? void 0 : Rt.prompt) || "").trim() || void 0;
    }, [v, b, e.id]),
    gr = ct => {
      var Dt;
      if (ct.preventDefault(), ct.stopPropagation(), j.length > 0) {
        const bn = [...j].sort((fn, Zt) => fn - Zt),
          Rt = bn.map(fn => Dn[fn]).filter(Boolean);
        i({
          visible: !0,
          x: ct.clientX,
          y: ct.clientY,
          item: {
            url: Rt[0],
            type: wr ? "video" : jn ? "audio" : "image",
            sourceNode: e,
            selectedUrls: Rt,
            selectedIndices: bn,
            prompt: Wr
          }
        });
      } else if ($n) {
        let bn = $n,
          Rt,
          fn;
        if (yr && Dn.length > 0) {
          const Ln = e.selectedPreviewImage || Dn[0],
            tt = Math.max(0, Dn.indexOf(Ln));
          bn = Dn[tt] || Dn[0], Rt = [bn], fn = [tt];
        }
        const Zt = wr ? ((Dt = Hn.current) == null ? void 0 : Dt.currentTime) ?? 0 : void 0;
        i({
          visible: !0,
          x: ct.clientX,
          y: ct.clientY,
          item: {
            url: bn,
            type: wr ? "video" : jn ? "audio" : "image",
            sourceNode: e,
            prompt: Wr,
            ...(wr ? {
              videoCurrentTime: Zt
            } : {}),
            ...(Rt ? {
              selectedUrls: Rt,
              selectedIndices: fn
            } : {})
          }
        });
      }
    },
    jr = Ia.useCallback(async () => {
      const {
          readMaterialAssetAsBlobUrl: ct
        } = await Ie(async () => {
          const {
            readMaterialAssetAsBlobUrl: Zt
          } = await Promise.resolve().then(() => AYn);
          return {
            readMaterialAssetAsBlobUrl: Zt
          };
        }, void 0, import.meta.url),
        {
          materialAssetExistsOnDisk: Dt
        } = await Ie(async () => {
          const {
            materialAssetExistsOnDisk: Zt
          } = await Promise.resolve().then(() => Btr);
          return {
            materialAssetExistsOnDisk: Zt
          };
        }, void 0, import.meta.url),
        {
          readLocalOriginalAssetAsUrl: bn
        } = await Ie(async () => {
          const {
            readLocalOriginalAssetAsUrl: Zt
          } = await Promise.resolve().then(() => Ui);
          return {
            readLocalOriginalAssetAsUrl: Zt
          };
        }, void 0, import.meta.url),
        {
          getFullBlobUrlForDisplayUrl: Rt
        } = await Ie(async () => {
          const {
            getFullBlobUrlForDisplayUrl: Zt
          } = await Promise.resolve().then(() => No);
          return {
            getFullBlobUrlForDisplayUrl: Zt
          };
        }, void 0, import.meta.url),
        fn = [];
      for (let Zt = 0; Zt < Qt.length; Zt++) {
        const Ln = Qt[Zt],
          tt = Vn[Zt] || ln[Zt] || Ot[Zt] || "",
          zt = Ln.settings || {};
        let an = "";
        if (!Yt) {
          const Cr = wP(Ln);
          if (Cr) {
            fn.push(Cr);
            continue;
          }
        }
        const Rn = String(zt._materialLibraryPath || "").trim();
        if (Rn) try {
          (await Dt(Rn)) && (an = await ct({
            id: Rn,
            path: Rn,
            name: Rn.replace(/^.*[/\\]/, "") || "image.png",
            kind: "image"
          }));
        } catch {}
        const Un = typeof zt._localCacheAssetId == "string" && zt._localCacheAssetId.trim() || typeof zt._contentAssetId == "string" && zt._contentAssetId.trim() || typeof zt._assetId == "string" && zt._assetId.trim() || "";
        if (!an && Un) try {
          const Cr = typeof zt._localOriginalUrlHint == "string" ? zt._localOriginalUrlHint.trim() : void 0,
            tr = await bn(Un, Cr);
          tr && (an = tr);
        } catch {}
        if (!an && tt.startsWith("blob:") && Un) try {
          const Cr = await Rt(tt, Un, null);
          Cr && (an = Cr);
        } catch {}
        if (!an && typeof Ln.content == "string" && Ln.content.startsWith("blob:")) try {
          const Cr = await Rt(Ln.content, Un || null, null);
          Cr && (an = Cr);
        } catch {}
        if (!an && typeof Ln.content == "string" && Er.isContentRef(Ln.content)) try {
          const Cr = await Er.get(Er.extractId(Ln.content));
          Cr && (an = Cr);
        } catch {}
        const er = String(zt._blobUrl || "").trim();
        !an && er && (an = er), !an && typeof Ln.content == "string" && (an = Ln.content), an || (an = tt), fn.push(an);
      }
      return fn;
    }, [Qt, Vn, ln, Ot, Yt]),
    ea = Ia.useCallback(async ct => {
      const Dt = Math.max(st.length, Dn.length);
      if (Dt === 0) return [];
      const {
          getFullBlobUrlForDisplayUrl: bn
        } = await Ie(async () => {
          const {
            getFullBlobUrlForDisplayUrl: kn
          } = await Promise.resolve().then(() => No);
          return {
            getFullBlobUrlForDisplayUrl: kn
          };
        }, void 0, import.meta.url),
        {
          normalizeOssPublicHttpUrl: Rt,
          isOssPublicHttpUrl: fn,
          ossImagesPathFromUrl: Zt,
          resolveGlobalOssThumbnailToOriginalUrl: Ln,
          resolvePreviewDownloadUrlAsync: tt,
          PREVIEW_MJ_OSS_REMOTE_URLS_KEY: zt
        } = await Ie(async () => {
          const {
            normalizeOssPublicHttpUrl: kn,
            isOssPublicHttpUrl: xn,
            ossImagesPathFromUrl: Fn,
            resolveGlobalOssThumbnailToOriginalUrl: cr,
            resolvePreviewDownloadUrlAsync: vr,
            PREVIEW_MJ_OSS_REMOTE_URLS_KEY: Wt
          } = await Promise.resolve().then(() => ii);
          return {
            normalizeOssPublicHttpUrl: kn,
            isOssPublicHttpUrl: xn,
            ossImagesPathFromUrl: Fn,
            resolveGlobalOssThumbnailToOriginalUrl: cr,
            resolvePreviewDownloadUrlAsync: vr,
            PREVIEW_MJ_OSS_REMOTE_URLS_KEY: Wt
          };
        }, void 0, import.meta.url),
        Rn = (e.settings || {})[zt] || [],
        Un = e._previewMjAssetIds || [],
        er = kn => Cn.find(xn => kn >= xn.offset && kn < xn.offset + xn.count),
        Cr = typeof ct == "number" && ct >= 0 && ct < Dt ? [ct] : Array.from({
          length: Dt
        }, (kn, xn) => xn),
        tr = [];
      for (const kn of Cr) {
        const xn = String(st[kn] || "").trim(),
          Fn = String(Dn[kn] || "").trim(),
          cr = xn || Fn,
          vr = String(Rn[kn] || "").trim();
        if (!Yt && vr && fn(vr)) {
          const Sr = Rt(vr) || vr;
          tr.push(Zt(Sr) || Sr);
          continue;
        }
        if (!Yt && cr && fn(cr)) {
          const Sr = Ln(cr);
          if (Sr) {
            tr.push(Sr);
            continue;
          }
        }
        const Wt = er(kn);
        if (Wt) {
          const Sr = kn - Wt.offset,
            Bn = Wt.node,
            Et = Bn.settings || {},
            zn = typeof Et.activeGenerationVersionIndex == "number" ? Math.max(0, Et.activeGenerationVersionIndex) : Sr,
            Mn = Wt.count === 1 ? zn : Sr,
            or = await V9e(Bn, Mn, cr);
          if (or) {
            tr.push(or);
            continue;
          }
        }
        const Jt = Fct(kn, xn || cr, Un, it),
          Nn = er(kn),
          En = CPe(Jt, Nn == null ? void 0 : Nn.node, Nn ? kn - Nn.offset : kn),
          Zn = await Vge(En, xn || cr);
        if (Zn) {
          tr.push(Zn);
          continue;
        }
        if (cr.startsWith("blob:")) {
          const Sr = await bn(cr, En || vm(xn || cr), null);
          if (Sr) {
            tr.push(Sr);
            continue;
          }
          const Bn = (await tt(cr, {
            previewNode: e,
            upstreamNodes: hn,
            mediaType: "image"
          })) || "";
          if (Bn && Bn !== cr) {
            tr.push(Bn);
            continue;
          }
        }
        tr.push(cr);
      }
      return typeof ct == "number" && ct >= 0 ? tr.length > 0 ? tr : [""] : tr;
    }, [Dn, st, e, hn, Cn, Yt]),
    pa = Ia.useCallback(async (ct, Dt, bn) => {
      var zn;
      if (ct.preventDefault(), ct.stopPropagation(), !o || !s) return;
      let Rt = Dt || $n,
        fn = yr ? Dn : void 0;
      const Ln = Ir && Ar.includes(Rt || "") || wr ? "video" : jn ? "audio" : "image",
        tt = e.settings || {};
      if (Ln === "image" && Gn) {
        const Mn = String(tt._stitchedFullUrl || "").trim();
        if (Mn) {
          const or = rCt(e) || (Er.isContentRef(Mn) ? Er.extractId(Mn) : void 0);
          let mr = Mn;
          if (ei() && or) try {
            const {
                localCacheManager: Yr
              } = await Ie(async () => {
                const {
                  localCacheManager: wa
                } = await Promise.resolve().then(() => Ha);
                return {
                  localCacheManager: wa
                };
              }, void 0, import.meta.url),
              aa = Yr.getCachedAssetUrlSync(or);
            if (aa) mr = aa;else {
              const wa = await lM(or);
              wa && (mr = wa);
            }
          } catch {}
          if (mr === Mn) try {
            if (Er.isContentRef(Mn)) {
              await Er.init();
              const Yr = await Er.get(Er.extractId(Mn));
              Yr && (mr = Yr);
            }
            if (mr === Mn || mr.startsWith("blob:")) {
              const Yr = await Vge(or, mr);
              Yr && (mr = Yr);
            }
          } catch (Yr) {
            console.warn("[PreviewNodeInline] mosaic lightbox original resolve failed:", Yr);
          }
          o({
            id: `preview-mosaic-${e.id}`,
            type: "image",
            url: mr,
            originalUrl: mr,
            prompt: e.prompt || "",
            preferDisplayUrls: ei() && (mr.startsWith("blob:") || mr.startsWith("data:")),
            _assetId: tt._ossUrlOnlyMode ? void 0 : or,
            ...(tt._ossUrlOnlyMode ? {
              _globalOssUrlOnly: !0,
              _ossRemoteUrl: String(tt._ossRemoteUrl || mr).trim()
            } : {})
          }), s(!0);
          return;
        }
      }
      const zt = bn ?? 0;
      !Dt && zt > 0 && Dn[zt] && (Rt = Dn[zt]);
      let an = !1,
        Rn = !1,
        Un = !1;
      const er = ei();
      if (!er && Ln === "image" && (ft || ht) && rn.some(Boolean)) {
        const {
            ossImagesPathFromUrl: Mn,
            normalizeOssPublicHttpUrl: or,
            isOssPublicHttpUrl: mr
          } = await Ie(async () => {
            const {
              ossImagesPathFromUrl: aa,
              normalizeOssPublicHttpUrl: wa,
              isOssPublicHttpUrl: xa
            } = await Promise.resolve().then(() => ii);
            return {
              ossImagesPathFromUrl: aa,
              normalizeOssPublicHttpUrl: wa,
              isOssPublicHttpUrl: xa
            };
          }, void 0, import.meta.url),
          Yr = rn.map(aa => {
            const wa = String(aa || "").trim();
            return !wa || !mr(wa) ? "" : Mn(or(wa) || wa);
          });
        Yr.some(Boolean) && (Rt = Yr[zt] || Yr.find(Boolean) || Rt, ft && Yr.filter(Boolean).length >= 2 ? (fn = Yr.map((aa, wa) => aa || Dn[wa] || "").filter(Boolean), an = !0, Rn = !0) : ht && (an = !0, Rn = !0));
      }
      if (!an && Ln === "image" && ft && Qt.length >= 2) try {
        const Mn = (await jr()).filter(Boolean);
        Mn.length >= 2 && (Rt = Mn[zt] ?? Mn[0], fn = Mn, an = !0);
      } catch (Mn) {
        console.warn("[PreviewNodeInline] resolveConnectedInputOriginalImages failed:", Mn);
      }
      if (Ln === "image" && !an) {
        if (yr && !er) try {
          const Mn = (await ea()).filter(Boolean);
          if (Mn.length > 0) {
            const or = Math.max(0, bn ?? zt);
            Rt = Mn[Math.min(or, Mn.length - 1)] ?? Mn[0], fn = Mn.length >= 2 ? Mn : void 0, Un = Mn.some((mr, Yr) => !!mr && mr !== String(st[Yr] || Dn[Yr] || "").trim());
          }
        } catch (Mn) {
          console.warn("[PreviewNodeInline] resolvePreviewMultiImageOriginalUrls failed:", Mn);
        } else if (Rt) try {
          const Mn = Math.max(0, bn ?? zt),
            or = yr ? await ea(Mn) : await ea(0),
            mr = or[0] || (yr ? or[Mn] : or[0]);
          mr && mr !== Rt && (Rt = mr);
        } catch {
          const {
              resolvePreviewDownloadUrlAsync: Mn
            } = await Ie(async () => {
              const {
                resolvePreviewDownloadUrlAsync: Yr
              } = await Promise.resolve().then(() => ii);
              return {
                resolvePreviewDownloadUrlAsync: Yr
              };
            }, void 0, import.meta.url),
            {
              getFullBlobUrlForDisplayUrl: or
            } = await Ie(async () => {
              const {
                getFullBlobUrlForDisplayUrl: Yr
              } = await Promise.resolve().then(() => No);
              return {
                getFullBlobUrlForDisplayUrl: Yr
              };
            }, void 0, import.meta.url),
            mr = e._contentAssetId || vm(Rt) || null;
          if (Rt.startsWith("blob:")) {
            const Yr = (mr ? await or(Rt, mr, null) : null) || (await Mn(Rt, {
              previewNode: e,
              upstreamNodes: hn,
              mediaType: "image"
            }));
            Yr && Yr !== Rt && (Rt = Yr);
          }
        }
      }
      if (yr && st.length > 0 && !fn) try {
        const or = (await Promise.all(st.map(mr => Er.isContentRef(mr) ? Er.get(Er.extractId(mr)) : Promise.resolve(mr)))).filter(Boolean);
        or.length > 0 && (Rt = or[bn ?? 0] ?? or[0], fn = or);
      } catch (Mn) {
        console.warn("[PreviewNodeInline] Failed to load images for lightbox:", Mn);
      }
      if (!Rt) return;
      if (Er.isContentRef(Rt)) try {
        await Er.init();
        const Mn = await Er.get(Er.extractId(Rt));
        Mn && (Rt = Mn);
      } catch {}
      if (Ln === "image" && it && (Rt.startsWith("blob:") || Er.isContentRef(String(e.content || "")))) {
        const Mn = await Vge(it, Rt);
        Mn && (Rt = Mn);
      }
      const Cr = e.settings || {},
        tr = !er && !!Cr._ossUrlOnlyMode;
      let kn = Rt,
        xn = fn,
        Fn = Rn ? kn : void 0;
      const cr = tr || Rn;
      if (Ln === "image" && !er && !Rn) {
        const {
            pickPreviewOssRemoteUrl: Mn,
            normalizeOssPublicHttpUrl: or,
            OSS_REMOTE_URL_SETTING_KEY: mr,
            PREVIEW_MJ_OSS_REMOTE_URLS_KEY: Yr,
            isOssPublicHttpUrl: aa,
            ossImagesPathFromUrl: wa
          } = await Ie(async () => {
            const {
              pickPreviewOssRemoteUrl: Aa,
              normalizeOssPublicHttpUrl: pn,
              OSS_REMOTE_URL_SETTING_KEY: xr,
              PREVIEW_MJ_OSS_REMOTE_URLS_KEY: Nr,
              isOssPublicHttpUrl: qr,
              ossImagesPathFromUrl: Oa
            } = await Promise.resolve().then(() => ii);
            return {
              pickPreviewOssRemoteUrl: Aa,
              normalizeOssPublicHttpUrl: pn,
              OSS_REMOTE_URL_SETTING_KEY: xr,
              PREVIEW_MJ_OSS_REMOTE_URLS_KEY: Nr,
              isOssPublicHttpUrl: qr,
              ossImagesPathFromUrl: Oa
            };
          }, void 0, import.meta.url),
          xa = Cr[Yr];
        if (yr && xa && xa.length > 0) {
          const Aa = Dn.map((pn, xr) => {
            const Nr = String(xa[xr] || "").trim();
            if (Nr && aa(Nr)) {
              const qr = or(Nr) || Nr;
              return wa(qr) || qr;
            }
            return Mn(e, xr, pn) || "";
          });
          Aa.some(Boolean) && (xn = (xn || Dn).map((pn, xr) => {
            const Nr = xn == null ? void 0 : xn[xr];
            return Nr && Nr !== pn && !Nr.startsWith("blob:") ? Nr : Aa[xr] || Nr || pn;
          }), kn = xn[zt] || Aa[zt] || Mn(e, zt, Rt) || Rt, Fn = kn);
        } else if (tr) {
          if (yr && xa && xa.length > 0) xn = Dn.map((Aa, pn) => {
            const xr = String(xa[pn] || "").trim();
            return xr ? or(xr) || xr : Mn(e, pn, Aa) || Aa;
          }), kn = xn[zt] || Mn(e, zt, Rt) || Rt;else {
            const Aa = Mn(e, zt, Rt) || String(Cr[mr] || "").trim();
            Aa && (kn = or(Aa) || Aa, Fn = kn);
          }
          Fn = Fn || Mn(e, zt, Rt) || void 0;
        }
      }
      const vr = e._previewMjAssetIds || [],
        Jt = (Dn.length > 0 ? Dn : st).map((Mn, or) => {
          var aa;
          const mr = Cn.find(wa => or >= wa.offset && or < wa.offset + wa.count);
          if (mr) {
            const wa = or - mr.offset,
              xa = mr.node.settings || {},
              Aa = xa.generatedImages || [],
              pn = xa._mjAssetIds || [],
              xr = xa._mjPreviewAssetIds || [],
              Nr = d0n(mr.node)[wa] || String(Mn || "").trim(),
              qr = [pn[wa], (aa = Aa[wa]) == null ? void 0 : aa.assetId, wa === 0 ? xa._contentAssetId : void 0, wa === 0 ? mr.node._contentAssetId : void 0, wa === 0 ? xa._assetId : void 0, xr[wa], Nr.startsWith("blob:") ? vm(Nr) : void 0];
            for (const Oa of qr) {
              const Fa = CPe(typeof Oa == "string" ? Oa : void 0, mr.node, wa);
              if (Fa) return Fa;
            }
          }
          const Yr = Fct(or, st[or] || Mn, vr, it);
          return CPe(Yr, mr == null ? void 0 : mr.node, mr ? or - mr.offset : or);
        }),
        Nn = Jt[zt],
        En = st[zt] || Dn[zt] || "";
      if (Ln === "image" && En) {
        const Mn = async (or, mr) => {
          const Yr = st[mr] || Dn[mr] || "",
            aa = Jt[mr];
          if (er && aa) try {
            const {
                localCacheManager: Nr
              } = await Ie(async () => {
                const {
                  localCacheManager: Fa
                } = await Promise.resolve().then(() => Ha);
                return {
                  localCacheManager: Fa
                };
              }, void 0, import.meta.url),
              qr = Nr.getCachedAssetUrlSync(aa);
            if (qr) return qr;
            const Oa = await lM(aa);
            if (Oa) return Oa;
          } catch {}
          const wa = await Vge(aa, Yr || or);
          if (wa) return wa;
          const xa = Cn.find(Nr => mr >= Nr.offset && mr < Nr.offset + Nr.count);
          if (xa) {
            const Nr = mr - xa.offset,
              qr = await V9e(xa.node, Nr, Yr || or);
            if (qr && (!er || !/^https?:\/\//i.test(qr))) return qr;
          }
          if (er) {
            for (const Nr of [or, Yr]) if (Nr) {
              if (Nr.startsWith("data:")) return Nr;
              if (Nr.startsWith("blob:")) try {
                const qr = await fetch(Nr);
                if (qr.ok && (await qr.blob()).size > 0) return Nr;
              } catch {}
            }
            return "";
          }
          if (or && or !== Yr) {
            if (or.startsWith("data:")) return or;
            if (or.startsWith("blob:")) try {
              const Nr = await fetch(or);
              if (Nr.ok && (await Nr.blob()).size > 0) return or;
            } catch {}
            if (/^https?:\/\//i.test(or)) {
              const {
                isOssPublicHttpUrl: Nr,
                resolveGlobalOssThumbnailToOriginalUrl: qr,
                normalizeOssPublicHttpUrl: Oa
              } = await Ie(async () => {
                const {
                  isOssPublicHttpUrl: Fa,
                  resolveGlobalOssThumbnailToOriginalUrl: Ra,
                  normalizeOssPublicHttpUrl: ui
                } = await Promise.resolve().then(() => ii);
                return {
                  isOssPublicHttpUrl: Fa,
                  resolveGlobalOssThumbnailToOriginalUrl: Ra,
                  normalizeOssPublicHttpUrl: ui
                };
              }, void 0, import.meta.url);
              return Nr(or) && (qr(or) || Oa(or)) || or;
            }
          }
          if (Yr.startsWith("blob:")) try {
            const Nr = await fetch(Yr);
            if (Nr.ok && (await Nr.blob()).size > 0) return Yr;
          } catch {}
          const {
            isOssPublicHttpUrl: Aa,
            resolveGlobalOssThumbnailToOriginalUrl: pn,
            normalizeOssPublicHttpUrl: xr
          } = await Ie(async () => {
            const {
              isOssPublicHttpUrl: Nr,
              resolveGlobalOssThumbnailToOriginalUrl: qr,
              normalizeOssPublicHttpUrl: Oa
            } = await Promise.resolve().then(() => ii);
            return {
              isOssPublicHttpUrl: Nr,
              resolveGlobalOssThumbnailToOriginalUrl: qr,
              normalizeOssPublicHttpUrl: Oa
            };
          }, void 0, import.meta.url);
          for (const Nr of [Yr, or]) if (Nr && Aa(Nr)) {
            const qr = pn(Nr) || xr(Nr) || Nr;
            if (qr) return qr;
          }
          return or || Yr;
        };
        kn = await Mn(kn, zt), !er && xn && xn.length > 0 && (xn = await Promise.all(xn.map((or, mr) => Mn(or, mr))));
      }
      if (er && Ln === "image" && kn) {
        const Mn = st[zt] || Dn[zt] || En || "";
        if (Nn) try {
          const {
              localCacheManager: mr
            } = await Ie(async () => {
              const {
                localCacheManager: aa
              } = await Promise.resolve().then(() => Ha);
              return {
                localCacheManager: aa
              };
            }, void 0, import.meta.url),
            Yr = mr.getCachedAssetUrlSync(Nn);
          Yr && (kn = Yr);
        } catch {}
        kn !== Mn && (kn.startsWith("data:") || Fwe(kn, Nn) || kn.startsWith("blob:") && kn !== Mn) && (xn = void 0, Un = !0);
      }
      let Zn;
      if (!er && Nn) try {
        const {
          assetStore: Mn
        } = await Ie(async () => {
          const {
            assetStore: Yr
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: Yr
          };
        }, void 0, import.meta.url);
        await Mn.init();
        const or = await Mn.getAssetRecord(Nn),
          mr = String((or == null ? void 0 : or.remoteUrl) || "").trim();
        (mr.startsWith("http://") || mr.startsWith("https://")) && (Zn = mr);
      } catch {}
      if (!er && Ln === "image" && Zn && /^https?:\/\//i.test(Zn) && kn.startsWith("blob:") && (kn = Zn), !er && Ln === "image" && xn && xn.length > 0) try {
        const {
          assetStore: Mn
        } = await Ie(async () => {
          const {
            assetStore: or
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: or
          };
        }, void 0, import.meta.url);
        await Mn.init(), xn = await Promise.all(xn.map(async (or, mr) => {
          const Yr = Jt[mr];
          if (!Yr) return or;
          const aa = await Mn.getAssetRecord(Yr),
            wa = String((aa == null ? void 0 : aa.remoteUrl) || "").trim();
          return wa.startsWith("http://") || wa.startsWith("https://") ? wa : or;
        }));
      } catch {}
      const Sr = !!kn && (Un || kn !== En && kn !== Dn[zt]),
        Bn = Ln === "image" && !!kn && (er ? Un || Sr || kn.startsWith("blob:") || kn.startsWith("data:") : Un || Sr || kn.startsWith("blob:") || kn.startsWith("data:") || /^https?:\/\//i.test(kn) || !!Zn),
        Et = {
          id: e.id,
          url: kn,
          type: Ln,
          prompt: e.prompt || "",
          title: void 0,
          width: void 0,
          height: void 0,
          modelName: ((zn = e.settings) == null ? void 0 : zn.model) || "Unknown",
          mjImages: xn,
          mjVideos: Ir ? Ar : void 0,
          selectedMjImageIndex: zt,
          initialViewMode: "single",
          ...(Zn || er && Un && kn ? {
            originalUrl: Zn || kn
          } : {}),
          ...(er && Nn ? {
            _assetId: Nn
          } : {}),
          ...(Bn ? {
            preferDisplayUrls: !0
          } : {}),
          ...(!Bn && !Sr && Nn ? {
            _assetId: Nn
          } : {}),
          _mjAssetIds: Un || Rn ? void 0 : ft && Pn.some(Boolean) ? Pn : Jt.some(Boolean) ? Jt : void 0,
          ...(cr ? {
            _globalOssUrlOnly: !0,
            _ossRemoteUrl: Fn || kn
          } : {})
        };
      o(Et), s(!0), (ct.ctrlKey || ct.metaKey) && k && k(!0);
    }, [$n, it, wr, jn, yr, Ir, Dn, Ar, st, e, o, s, k, ft, Qt.length, rn, Pn, jr, ea, hn, Cn, Gn]);
  Ia.useCallback(() => {
    const ct = Math.max(st.length, Dn.length),
      Dt = e._previewMjAssetIds || [];
    return Array.from({
      length: ct
    }, (bn, Rt) => {
      var Zt;
      const fn = Cn.find(Ln => Rt >= Ln.offset && Rt < Ln.offset + Ln.count);
      if (fn) {
        const Ln = Rt - fn.offset,
          tt = fn.node.settings || {},
          zt = tt.generatedImages || [],
          an = tt._mjAssetIds,
          Rn = tt._mjPreviewAssetIds,
          Un = d0n(fn.node)[Ln] || String(Dn[Rt] || "").trim();
        return CPe((an == null ? void 0 : an[Ln]) || ((Zt = zt[Ln]) == null ? void 0 : Zt.assetId) || (Rn == null ? void 0 : Rn[Ln]) || Un.startsWith("blob:") && vm(Un) || void 0, fn.node, Ln) || Dt[Rt] || void 0;
      }
      return Fct(Rt, st[Rt] || Dn[Rt] || "", Dt, it);
    });
  }, [Dn, st, Cn, it, e]);
  const Br = Ia.useCallback(async (ct, Dt) => {
      if (Dt && Dt !== Dn[ct]) return Dt;
      const bn = Cn.find(Rt => ct >= Rt.offset && ct < Rt.offset + Rt.count);
      if (bn) {
        const Rt = ct - bn.offset,
          fn = bn.node.settings || {},
          Zt = typeof fn.activeGenerationVersionIndex == "number" ? Math.max(0, fn.activeGenerationVersionIndex) : Rt,
          Ln = bn.count === 1 ? Zt : Rt,
          tt = String(Dn[ct] || Dt || "").trim() || G9e(bn.node)[Ln] || Dt;
        return V9e(bn.node, Ln, tt);
      }
      try {
        return (await ea())[ct] || null;
      } catch {
        return null;
      }
    }, [Dn, Cn, ea]),
    tn = Ia.useCallback(ct => {
      if (ct == null || !Number.isFinite(ct)) {
        P == null || P.patch({
          settings: {
            _gridStitchProgress: void 0
          }
        });
        return;
      }
      P == null || P.patch({
        settings: {
          _gridStitchProgress: Math.max(0, Math.min(100, Math.round(ct)))
        }
      });
    }, [P]),
    Lr = Ia.useCallback(() => {
      P != null && P.valid() && (Re.current = !1, Me.current = 0, be(!0), tn(2));
    }, [tn, P]),
    br = Ia.useCallback(ct => {
      if (!(P != null && P.valid()) || Re.current) return;
      const Dt = Math.max(0, Math.min(100, Math.round(ct)));
      Dt < 100 && Dt - Me.current < 2 || (Me.current = Dt, tn(Dt));
    }, [tn, P]),
    Jr = Ia.useCallback(() => {
      be(!1), P != null && P.valid() && (Re.current = !1, Me.current = 0, tn(void 0));
    }, [tn, P]),
    Kr = async (ct, Dt) => {
      if (!(Dt != null && Dt.fullDataUrl)) {
        ct.valid() && ct.patch({
          settings: {
            _gridStitchProgress: void 0
          }
        });
        return;
      }
      Re.current = !0;
      try {
        const mergedBlob = await (await fetch(Dt.fullDataUrl)).blob();
        if (!mergedBlob.size || !mergedBlob.type.startsWith("image/")) throw new Error("拼图结果不是有效图片");
        const mergedAssetId = "local_collage_" + u();
        if (!await ni.saveBlobAsset(mergedAssetId, mergedBlob, "file://aiyouplus-collage/" + mergedAssetId, "local", {silent: !0, forceReplace: !0})) throw new Error("拼图原件保存失败，未创建临时节点");
        const mergedUrl = await ni.getAssetUrl(mergedAssetId);
        if (!mergedUrl) throw new Error("拼图已保存但无法读取本地原件");
        const Rt = {content: mergedUrl, settings: {_contentAssetId: mergedAssetId, _assetId: mergedAssetId}},
          fn = mergedUrl.startsWith("blob:") ? mergedUrl : "",
          Zt = mergedUrl;
        if (!Zt) {
          ct.valid() && ct.patch({
            settings: {
              _gridStitchProgress: void 0
            }
          });
          return;
        }
        const Ln = M.current.nodes.find(an => an.id === e.id) || e,
          tt = String(((Rt == null ? void 0 : Rt.settings) || {})._contentAssetId || ((Rt == null ? void 0 : Rt.settings) || {})._assetId || "").trim(),
          zt = Q0o({
            preview: Ln,
            generateId: u,
            content: Zt,
            settings: {
              ...((Rt == null ? void 0 : Rt.settings) || {}),
              mediaType: "image",
              _canvasDisplayPreviewUrl: Zt,
              _blobUrl: fn || void 0,
              _mosaicRefFull: Dt.fullDataUrl
            },
            outputWidth: Dt.width,
            outputHeight: Dt.height,
            assetId: tt || void 0
          });
        if (!zt) {
          ct.valid() && ct.patch({
            settings: {
              _gridStitchProgress: void 0
            }
          });
          return;
        }
        ct.valid() ? (ct.append(zt), ct.patch({
          settings: {
            _gridStitchProgress: void 0
          }
        })) : a(an => an.some(Rn => Rn.id === zt.id) ? an : [...an, zt]);
      } catch (bn) {
        console.warn("[PreviewNodeInline] puzzle merge failed:", bn), ct.valid() && ct.patch({
          settings: {
            _gridStitchProgress: void 0
          }
        });
      }
    },
    ir = async ct => {
      const Dt = P;
      if (Dt != null && Dt.valid()) try {
        await Kr(Dt, ct);
      } finally {
        be(!1), Dt.finish();
      }
    },
    Hr = async () => {
      if (!yr || Dn.length < 2 || ae) return;
      const ct = T.begin("stitch");
      if (ct.valid()) {
        R(ct), be(!0), Re.current = !1, Me.current = 0, ct.patch({
          settings: {
            _gridStitchProgress: 2
          }
        });
        try {
          let Dt = [];
          try {
            Dt = ft && Qt.length >= 2 ? await jr() : await ea();
          } catch {
            Dt = [];
          }
          if (!ct.valid()) return;
          const bn = D0o(Dn, Dt),
            Rt = fe || MO(e.settings || {}),
            fn = await tyo(bn, {
              ...Rt,
              pieces: sue(Rt.pieces, bn)
            }, Zt => {
              if (!ct.valid() || Re.current) return;
              const Ln = Math.max(0, Math.min(100, Math.round(Zt)));
              Me.current = Ln, ct.patch({
                settings: {
                  _gridStitchProgress: Ln
                }
              });
            });
          if (!ct.valid()) return;
          await Kr(ct, fn);
        } catch (Dt) {
          console.warn("[PreviewNodeInline] puzzle merge failed:", Dt), ct.valid() && ct.patch({
            settings: {
              _gridStitchProgress: void 0
            }
          });
        } finally {
          be(!1), ct.finish();
        }
      }
    },
    ha = async () => {
      const ct = T.begin();
      if (ct.valid()) try {
        const Dt = v.filter(bn => bn.to === e.id).map(bn => b.find(Rt => Rt.id === bn.from)).find(bn => (bn == null ? void 0 : bn.type) === "gen-image" || (bn == null ? void 0 : bn.type) === "gen-video");
        await v0o({
          node: e,
          isMultiImage: yr,
          referencedPreviewIndex: Gr,
          previewMjImages: st,
          allPreviewImages: Dn,
          primaryPreviewUrl: $n,
          upstreamGen: Dt,
          generateId: u
        }, ct);
      } finally {
        ct.finish();
      }
    },
    Ga = async () => {
      if (!$n || !_) {
        ha();
        return;
      }
      const ct = T.begin();
      if (!ct.valid()) return;
      const bn = v.filter(fn => fn.from === e.id).map(fn => b.find(Zt => Zt.id === fn.to && Zt.type === "storyboard-node")).filter(Boolean)[0],
        Rt = async fn => {
          try {
            await b0o({
              targetId: fn,
              primaryUrl: $n,
              images: Dn,
              isMultiImage: yr
            }, {
              current: ct.valid,
              confirm: Zt => window.confirm(x(Zt)),
              split: _
            });
          } catch (Zt) {
            ct.valid() && console.warn(`[PreviewNode] 发送到分镜节点失败: ${Zt instanceof Error ? Zt.message : "未知错误"}`);
          } finally {
            ct.finish();
          }
        };
      if (!bn) {
        const fn = e.x + e.width + 100,
          Zt = e.y,
          Ln = {
            id: u(),
            type: "storyboard-node",
            x: fn,
            y: Zt,
            width: 400,
            height: 600,
            content: "",
            prompt: "",
            settings: {
              shots: []
            }
          };
        ct.append(Ln, () => {
          if (w) {
            const tt = {
              id: u(),
              from: e.id,
              to: Ln.id
            };
            w(zt => !ct.valid() || !M.current.nodes.some(Rn => Rn.id === Ln.id) || zt.some(Rn => Rn.from === tt.from && Rn.to === tt.to) ? zt : [...zt, tt]);
          }
          Rt(Ln.id);
        });
        return;
      }
      await Rt(bn.id);
    },
    Za = async () => {
      if (!$n) return;
      const ct = T.begin();
      if (!ct.valid()) return;
      const Dt = e.settings || {},
        bn = String(Dt._localCacheAssetId || Dt._contentAssetId || Dt._assetId || e._contentAssetId || "").trim() || void 0;
      try {
        await y0o({
          primaryPreviewUrl: $n,
          assetId: bn,
          isAudio: !!jn,
          isVideo: !!wr,
          generateId: u
        }, {
          valid: ct.valid,
          setChatFiles: l,
          setIsChatOpen: d
        });
      } finally {
        ct.finish();
      }
    },
    va = async ct => {
      if (!p) return;
      const Dt = Gn && Mae(e) ? Mae(e) : $n;
      if (Dt && (ct.ctrlKey || ct.metaKey)) {
        ct.preventDefault(), ct.stopPropagation();
        const bn = wr ? "mp4" : jn ? "mp3" : "png",
          Rt = `Preview-${Date.now()}.${bn}`,
          fn = wr ? "video" : jn ? "audio" : "image",
          Zt = await La(Dt, fn);
        await p(Zt, Rt, fn);
      }
    },
    [Kt, Pr] = Ia.useState(null),
    kr = Ia.useCallback(ct => {
      Pr(Dt => Dt === ct || Dt && ct && Dt.width === ct.width && Dt.height === ct.height ? Dt : ct);
    }, []),
    Mr = fa.join(`
`);
  he.current = {
    width: e.width,
    height: e.height,
    imageCount: Dn.length,
    first: Kt ? {
      naturalWidth: Kt.width,
      naturalHeight: Kt.height
    } : null
  }, Ia.useRef(null);
  const Hn = Ia.useRef(null);
  Ia.useEffect(() => {
    var bn;
    const ct = ++_e.current,
      Dt = () => ct !== _e.current || ke();
    if (!yr && !Ir && !ft && !bt && st.length <= 1 && $n && !wr && !jn) {
      const Rt = new Image();
      Rt.onload = () => {
        if (ct !== _e.current) return;
        const fn = e.settings || {},
          Zt = Hs(fn.previewActualSize) || Hs(fn.imageSize),
          Ln = $n.startsWith("blob:") ? vU($n) : null,
          tt = {
            width: Rt.naturalWidth,
            height: Rt.naturalHeight
          },
          zt = Zt ? {
            width: Zt.w,
            height: Zt.h
          } : Ln && Ln.width > 0 && Ln.height > 0 ? {
            width: Ln.width,
            height: Ln.height
          } : tt;
        kr(zt);
        const an = `${zt.width}×${zt.height}`,
          Rn = nl(tt.width, tt.height);
        !Zt && !Rn && fn.previewSize !== an && r(e.id, {
          settings: {
            ...e.settings,
            previewSize: an,
            previewActualSize: an
          }
        });
        const Un = zt.height / zt.width,
          er = zt.height > zt.width,
          Cr = 520,
          tr = e.width >= 360 ? e.width : 400;
        let kn, xn;
        er ? (xn = Math.min(Cr, Math.round(tr * Un)), kn = Math.round(xn / Un)) : (kn = tr, xn = Math.round(tr * Un)), !Dt() && (Math.abs(xn - e.height) > 10 || Math.abs(kn - e.width) > 10) && ve({
          width: kn,
          height: xn
        });
      }, Rt.onerror = () => {
        ct === _e.current && kr(null);
      }, Rt.src = $n;
    } else if (!(!Ir && wr && _n)) {
      if (Ca && fa.length > 0 && !Z) {
        const Rt = fa[0],
          fn = new Image();
        fn.onload = () => {
          if (ct !== _e.current) return;
          const Zt = e.settings || {},
            Ln = Hs(Zt.previewActualSize) || Hs(Zt.imageSize),
            tt = Rt.startsWith("blob:") ? vU(Rt) : null,
            zt = {
              width: fn.naturalWidth,
              height: fn.naturalHeight
            },
            an = Ln ? {
              width: Ln.w,
              height: Ln.h
            } : tt && tt.width > 0 && tt.height > 0 ? {
              width: tt.width,
              height: tt.height
            } : zt;
          kr(an);
          const Rn = `${an.width}×${an.height}`,
            Un = nl(zt.width, zt.height);
          if (!Ln && !Un && Zt.previewSize !== Rn && r(e.id, {
            settings: {
              ...e.settings,
              previewSize: Rn,
              previewActualSize: Rn
            }
          }), _r && !Dt()) {
            const er = fa.length,
              Cr = Math.max(1, er),
              tr = Number.isFinite(e.width) && e.width > 0 ? e.width : 400,
              kn = an.width > 0 && an.height > 0 ? an.height / an.width : 1;
            let xn = tr,
              Fn = Math.round(tr / Cr * kn);
            (!Number.isFinite(xn) || xn <= 0) && (xn = tr), (!Number.isFinite(Fn) || Fn <= 0) && (Fn = Math.round(tr * kn)), (Math.abs(Fn - e.height) > 10 || Math.abs(xn - e.width) > 10) && ve({
              width: xn,
              height: Fn
            });
          }
        }, fn.onerror = () => {
          ct === _e.current && kr(null);
        }, fn.src = Rt;
      } else if (kr(null), !$n && ((bn = e.settings) != null && bn.previewSize)) {
        const {
          previewSize: Rt,
          ...fn
        } = e.settings;
        r(e.id, {
          settings: fn
        });
      }
    }
  }, [$n, wr, jn, Ca, Ir, Mr, _r, e.width, e.height, e.id, r, ve, Z, ke]), Ia.useEffect(() => {
    const ct = bn => {
        var fn;
        const Rt = bn.target;
        (fn = Rt == null ? void 0 : Rt.closest) != null && fn.call(Rt, ".node-dropdown-menu") || Ke.current && Rt && !Ke.current.contains(Rt) && $e && rt(!1);
      },
      Dt = bn => {
        const Rt = bn.detail;
        (Rt == null ? void 0 : Rt.nodeId) !== e.id && $e && rt(!1);
      };
    return document.addEventListener("mousedown", ct), window.addEventListener("previewNodeFocused", Dt), () => {
      document.removeEventListener("mousedown", ct), window.removeEventListener("previewNodeFocused", Dt);
    };
  }, [$e, e.id]);
  const $t = Ia.useMemo(() => y9(h), [h]);
  return c.jsxs("div", {
    ref: Ke,
    className: `flex flex-col pointer-events-auto group w-full h-full min-w-0 ${$e || nt ? "overflow-visible" : "overflow-hidden"}`,
    onMouseDown: () => {
      rt(!0), window.dispatchEvent(new CustomEvent("previewNodeFocused", {
        detail: {
          nodeId: e.id
        }
      }));
    },
    children: [y === "low" && !e.isGenerating && !Vt && !nt ? c.jsx("div", {
      className: "flex flex-col p-0 gap-0 w-full h-full flex-1 min-h-0 overflow-hidden min-w-0 pointer-events-none",
      children: c.jsx("div", {
        className: `relative rounded-2xl overflow-hidden w-full flex-1 min-h-0 border ${Sp(n)}`,
        "aria-hidden": !0
      })
    }) : c.jsx(c.Fragment, {
      children: c.jsxs("div", {
        className: "flex flex-col p-0 gap-0 w-full h-full flex-1 min-h-0 overflow-hidden min-w-0",
        children: [c.jsxs("div", {
          "data-aux-gen-preview": !0,
          className: `relative rounded-2xl overflow-hidden flex items-center justify-center w-full flex-1 min-h-0 ${!wr && !jn && !Ir && Kt || wr && !Ir && !jn && Kt ? "bg-transparent border-0" : n ? "bg-[#1f1f1f] border border-zinc-700/40" : "bg-white border border-zinc-200/60"}`,
          style: {
            width: "100%",
            height: "100%"
          },
          onMouseDown: () => {
            rt(!0), window.dispatchEvent(new CustomEvent("previewNodeFocused", {
              detail: {
                nodeId: e.id
              }
            }));
          },
          onContextMenu: gr,
          onDoubleClick: ct => {
            Ca || (ct.stopPropagation(), ct.preventDefault(), NF(), pa(ct, void 0, Gr > 0 ? Gr : void 0));
          },
          onClick: ct => {
            if (_r && !ct.ctrlKey && !ct.metaKey) {
              C == null || C(e.id), ct.stopPropagation();
              return;
            }
            va(ct);
          },
          children: [(Vt || vn) && c.jsx("div", {
            "data-aux-gen-progress-layer": !0,
            className: `absolute inset-0 z-[60] overflow-hidden pointer-events-none transition-opacity duration-400 ease-out ${vn ? "opacity-0" : "opacity-100"}`,
            onTransitionEnd: vn ? zr : void 0,
            "aria-hidden": !0,
            children: c.jsx(Yv, {
              seed: `${e.id}-expand`,
              className: ta ? "qiaodoumayi-generation-overlay--poster" : "",
              isDark: n,
              label: x("正在扩图..."),
              hasUnderlyingContent: ta
            })
          }), !Vt && ar && !ta && c.jsx("div", {
            className: `absolute inset-0 flex items-center justify-center z-10 ${n ? "bg-[#1f1f1f]/80" : "bg-white/80"}`,
            children: c.jsx(Ua, {
              className: `w-6 h-6 animate-spin ${n ? "text-zinc-400" : "text-zinc-500"}`
            })
          }), (sa.length > 0 || ba) && _a.error && !H && c.jsx("div", {
            className: "absolute inset-0 z-30 flex items-center justify-center p-4 rounded-2xl bg-black/50",
            onMouseDown: ct => ct.stopPropagation(),
            onClick: ct => ct.stopPropagation(),
            children: c.jsxs("div", {
              className: `w-full max-w-sm rounded-lg border overflow-hidden shadow-xl ${n ? "bg-[#1f1f1f] border-zinc-600" : "bg-zinc-100 border-zinc-300"}`,
              children: [c.jsx("div", {
                className: "bg-red-500 border-b border-red-600 px-3 py-2 text-center",
                children: c.jsx("span", {
                  className: "text-white text-sm font-medium",
                  children: x("提示")
                })
              }), c.jsx("div", {
                className: `px-4 py-4 text-sm leading-relaxed ${n ? "text-zinc-200" : "text-zinc-800"}`,
                children: _a.error || x("生成失败")
              }), c.jsx("div", {
                className: "px-4 pb-4 flex justify-center",
                children: c.jsx("button", {
                  type: "button",
                  onClick: ct => {
                    ct.stopPropagation(), Y(!0);
                  },
                  className: `px-6 py-2 rounded-md text-sm font-medium transition-colors ${n ? "text-white hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-200"}`,
                  children: x("确认")
                })
              })]
            })
          }), c.jsx("div", {
            className: "relative z-[2] min-h-0 w-full flex-1 self-stretch transition-opacity duration-200 ease-out",
            style: {
              opacity: 1
            },
            children: ta ? jn ? c.jsx("div", {
              className: "w-full h-full flex items-center justify-center p-4 bg-zinc-800/50",
              children: c.jsx("audio", {
                src: $n ?? "",
                controls: !0,
                className: "w-full max-w-md",
                preload: "metadata",
                onMouseDown: ct => ct.stopPropagation(),
                onClick: ct => ct.stopPropagation()
              })
            }) : Ir ? c.jsxs(c.Fragment, {
              children: [c.jsx("div", {
                className: `w-full h-full grid gap-0.5 p-0.5 ${Ar.length === 1 ? "grid-cols-1 grid-rows-1" : Ar.length === 4 ? "grid-cols-2 grid-rows-2" : Ar.length === 9 ? "grid-cols-3 grid-rows-3" : "grid-cols-2"}`,
                children: Ar.map((ct, Dt) => {
                  const bn = e.selectedPreviewVideo === ct || !e.selectedPreviewVideo && Dt === 0,
                    Rt = j.includes(Dt);
                  return c.jsxs("div", {
                    className: `mj-grid-quadrant relative w-full h-full overflow-hidden bg-black flex items-center justify-center group cursor-pointer transition-all ${Rt ? "ring-4 ring-green-500 ring-inset scale-[0.98]" : bn ? "ring-2 ring-blue-500 ring-inset" : "hover:ring-1 hover:ring-white/30 hover:ring-inset"}`,
                    onClick: fn => {
                      fn.stopPropagation();
                      const Zt = fn.shiftKey,
                        Ln = fn.ctrlKey || fn.metaKey;
                      if (Zt && !Ln) {
                        fn.preventDefault();
                        const tt = F !== null ? F : 0,
                          zt = Dt,
                          an = Math.min(tt, zt),
                          Rn = Math.max(tt, zt),
                          Un = Array.from({
                            length: Rn - an + 1
                          }, (er, Cr) => an + Cr);
                        B(er => {
                          const Cr = new Set([...er, ...Un]);
                          return Array.from(Cr);
                        }), N(Dt);
                        return;
                      }
                      if (Ln && Zt) {
                        fn.preventDefault(), B(tt => tt.includes(Dt) ? tt.filter(zt => zt !== Dt) : [...tt, Dt]), N(Dt);
                        return;
                      }
                      if (S && !Zt && !Ln) {
                        C == null || C(e.id);
                        return;
                      }
                      r(e.id, {
                        selectedPreviewVideo: ct
                      }), B([]), N(Dt);
                    },
                    onDoubleClick: fn => {
                      pa(fn, ct, Dt);
                    },
                    children: [bn && !Rt && c.jsxs("div", {
                      className: "absolute top-1 left-1 z-30 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5",
                      children: [c.jsx(io, {
                        size: 10
                      }), x("引用")]
                    }), Rt && c.jsx("div", {
                      className: "absolute top-1 left-1 z-30 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-sm",
                      children: "✓"
                    }), c.jsx("div", {
                      className: `absolute top-1 right-1 z-30 text-[10px] px-1.5 py-0.5 rounded font-medium ${Rt ? "bg-green-500/80 text-white" : bn ? "bg-blue-500/80 text-white" : n ? "bg-black/60 text-white/70" : "bg-white/60 text-zinc-700"}`,
                      children: Dt + 1
                    }), c.jsx("video", {
                      src: _c(ct) || ct,
                      className: "w-full h-full object-contain cursor-grab",
                      controls: $e,
                      draggable: !1,
                      preload: "metadata",
                      muted: !0,
                      onMouseDown: fn => {
                        (fn.ctrlKey || fn.metaKey) && p && fn.stopPropagation();
                      }
                    })]
                  }, Dt);
                })
              }), j.length > 0 && c.jsxs("div", {
                className: `absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-medium shadow-lg ${n ? "bg-green-500/90 text-white" : "bg-green-500 text-white"}`,
                children: [x("已选中 "), j.length, x(" 个视频 • Shift+点击范围选择")]
              })]
            }) : wr && _n ? c.jsxs(c.Fragment, {
              children: [c0n($n) && pe && c.jsxs("div", {
                className: "absolute inset-0 flex items-center justify-center bg-black/50 z-10",
                children: [c.jsx(Ua, {
                  className: "w-6 h-6 animate-spin text-white"
                }), c.jsx("span", {
                  className: "ml-2 text-white text-xs",
                  children: x("加载视频…")
                })]
              }), c.jsx("video", {
                ref: Hn,
                src: de ?? (_c($n) || $n) ?? "",
                className: "w-full h-full object-contain cursor-grab",
                controls: $e,
                draggable: !1,
                preload: "metadata",
                onLoadedMetadata: ct => {
                  var bn;
                  const Dt = ct.currentTarget;
                  if (Dt.videoWidth > 0 && Dt.videoHeight > 0) {
                    const Rt = {
                      width: Dt.videoWidth,
                      height: Dt.videoHeight
                    };
                    kr(Rt);
                    const fn = `${Dt.videoWidth}×${Dt.videoHeight}`;
                    ((bn = e.settings) == null ? void 0 : bn.previewSize) !== fn && r(e.id, {
                      settings: {
                        ...e.settings,
                        previewSize: fn
                      }
                    });
                    const Zt = Dt.videoHeight / Dt.videoWidth,
                      Ln = Dt.videoHeight > Dt.videoWidth,
                      tt = 420;
                    let zt, an;
                    Ln && Zt > 1 ? (an = Math.min(tt, Math.round(e.width * Zt)), zt = Math.round(an / Zt)) : (zt = e.width, an = Math.round(e.width * Zt));
                    const Rn = Math.abs(an - e.height),
                      Un = Math.abs(zt - e.width);
                    (Rn > 10 || Un > 10) && r(e.id, {
                      width: zt,
                      height: an
                    });
                  }
                },
                onMouseDown: ct => {
                  if ((ct.ctrlKey || ct.metaKey) && $n && p) {
                    ct.stopPropagation(), ct.preventDefault();
                    const Dt = `Preview-${Date.now()}.mp4`;
                    La($n, "video").then(bn => p(bn, Dt, "video"));
                  }
                },
                onClick: ct => {
                  if (ct.stopPropagation(), S && !ct.ctrlKey && !ct.metaKey) {
                    C == null || C(e.id);
                    return;
                  }
                  if ((ct.ctrlKey || ct.metaKey) && $n && p) {
                    ct.preventDefault();
                    const Dt = `Preview-${Date.now()}.mp4`;
                    La($n, "video").then(bn => p(bn, Dt, "video"));
                  }
                },
                onDoubleClick: pa,
                onPlay: ct => {
                  const Dt = ct.currentTarget;
                  Dt.setAttribute("data-user-controlled", "true"), Dt.setAttribute("data-user-playing", "true");
                },
                onPause: ct => {
                  const Dt = ct.currentTarget;
                  Dt.setAttribute("data-user-controlled", "true"), Dt.setAttribute("data-user-playing", "false");
                },
                onError: async ct => {
                  var fn;
                  const bn = ct.currentTarget.currentSrc || de || "";
                  if (!bn.startsWith("blob:") || !$n) return;
                  const Rt = (fn = e.settings) == null ? void 0 : fn._contentAssetId;
                  try {
                    const Zt = await J(bn, Rt);
                    if (Zt && Zt !== bn) {
                      le(Zt);
                      return;
                    }
                  } catch {}
                  le(null), Dr.current && (URL.revokeObjectURL(Dr.current), Dr.current = null);
                }
              })]
            }) : wr && !_n ? c.jsx("div", {
              className: "w-full h-full flex items-center justify-center bg-zinc-800/80 text-zinc-500 text-xs",
              children: x("无视频")
            }) : ft && Ot.length >= 2 && Vn.length < 2 ? c.jsxs("div", {
              className: `w-full h-full flex flex-col items-center justify-center gap-2 ${n ? "text-zinc-500" : "text-zinc-400"}`,
              children: [c.jsx(Ua, {
                size: 24,
                className: "animate-spin"
              }), c.jsxs("span", {
                className: "text-xs",
                children: [x("加载中… ("), Vn.length, "/", Ot.length, ")"]
              })]
            }) : Ca ? (() => {
              var tt, zt;
              const ct = fa.length,
                Dt = (tt = e.settings) == null ? void 0 : tt.previewGridRows,
                bn = (zt = e.settings) == null ? void 0 : zt.previewGridCols,
                Rt = bn != null && Dt != null && bn > 0 && Dt > 0,
                fn = _r,
                Zt = fn ? ct : ft ? Math.ceil(Math.sqrt(ct)) || 1 : Rt ? bn : ct === 1 ? 1 : ct === 4 ? 2 : ct === 9 ? 3 : 2,
                Ln = fn ? 1 : ft ? Math.ceil(ct / Zt) || 1 : Rt ? Dt : ct === 1 ? 1 : ct === 4 ? 2 : ct === 9 ? 3 : Math.ceil(ct / 2);
              if (!fn && !Pa && nt) {
                const an = fe || MO(e.settings || {}),
                  Rn = {
                    ...an,
                    pieces: sue(an.pieces, fa)
                  };
                return c.jsxs(c.Fragment, {
                  children: [c.jsx(uvr, {
                    images: fa,
                    puzzle: Rn,
                    isDark: n,
                    firstSize: Kt ? {
                      naturalWidth: Kt.width,
                      naturalHeight: Kt.height
                    } : void 0,
                    fill: "contain",
                    interact: {
                      reorder: !0,
                      wheel: !0,
                      pan: !0,
                      dividers: !0,
                      toggleFit: !1
                    },
                    onChange: Te,
                    overlay: Un => {
                      const er = Gr === Un,
                        Cr = j.includes(Un);
                      return c.jsxs(c.Fragment, {
                        children: [er && !Cr && c.jsx("div", {
                          className: "absolute top-1 left-1 z-30 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded font-medium",
                          children: x("引用")
                        }), Cr && c.jsx("div", {
                          className: "absolute top-1 left-1 z-30 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold",
                          children: "✓"
                        }), c.jsx("div", {
                          className: `absolute top-1 right-1 z-30 text-[10px] px-1.5 py-0.5 rounded font-medium ${n ? "bg-black/60 text-white/70" : "bg-white/60 text-zinc-700"}`,
                          children: Un + 1
                        })]
                      });
                    },
                    onCellDoubleClick: Un => {
                      NF(), pa({
                        preventDefault() {},
                        stopPropagation() {}
                      }, void 0, Un);
                    },
                    onCellPointerDown: (Un, er) => {
                      if (er.button !== 0) return;
                      rt(!0), window.dispatchEvent(new CustomEvent("previewNodeFocused", {
                        detail: {
                          nodeId: e.id
                        }
                      })), Zr(Un);
                      const Cr = st[Un] || Dn[Un] || fa[Un];
                      r(e.id, {
                        selectedPreviewImage: Cr,
                        settings: {
                          ...e.settings,
                          selectedPreviewImageIndex: Un
                        }
                      });
                    }
                  }), j.length > 0 && c.jsxs("div", {
                    className: `absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-medium shadow-lg ${n ? "bg-green-500/90 text-white" : "bg-green-500 text-white"}`,
                    children: [x("已选中 "), j.length, x(" 张 • Shift+点击范围选择")]
                  })]
                });
              }
              return c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: fn ? "w-full h-full flex gap-1 p-1 overflow-x-auto overflow-y-hidden" : "w-full h-full grid gap-0 p-0",
                  style: {
                    ...(fn ? void 0 : {
                      gridTemplateColumns: `repeat(${Zt}, 1fr)`,
                      gridTemplateRows: `repeat(${Ln}, 1fr)`
                    })
                  },
                  children: fa.map((an, Rn) => {
                    const Un = Gr === Rn,
                      er = j.includes(Rn),
                      Cr = xn => {
                        const Fn = xn.shiftKey,
                          cr = xn.ctrlKey || xn.metaKey;
                        if (Fn && !cr) {
                          const Wt = F !== null ? F : 0,
                            Jt = Rn,
                            Nn = Math.min(Wt, Jt),
                            En = Math.max(Wt, Jt),
                            Zn = Array.from({
                              length: En - Nn + 1
                            }, (Sr, Bn) => Nn + Bn);
                          B(Sr => {
                            const Bn = new Set([...Sr, ...Zn]);
                            return Array.from(Bn);
                          }), N(Rn);
                          return;
                        }
                        if (cr && Fn) {
                          B(Wt => Wt.includes(Rn) ? Wt.filter(Jt => Jt !== Rn) : [...Wt, Rn]), N(Rn);
                          return;
                        }
                        if (_r && !Fn && !cr) {
                          C == null || C(e.id);
                          return;
                        }
                        Zr(Rn);
                        const vr = st[Rn] || Dn[Rn] || an;
                        r(e.id, {
                          selectedPreviewImage: vr,
                          settings: {
                            ...e.settings,
                            selectedPreviewImageIndex: Rn
                          }
                        }), B([]), N(Rn);
                      },
                      tr = xn => {
                        xn.stopPropagation();
                      },
                      kn = xn => {
                        if (xn.button !== 0) return;
                        rt(!0), window.dispatchEvent(new CustomEvent("previewNodeFocused", {
                          detail: {
                            nodeId: e.id
                          }
                        }));
                        const Fn = xn.clientX,
                          cr = xn.clientY,
                          vr = {
                            shiftKey: xn.shiftKey,
                            ctrlKey: xn.ctrlKey,
                            metaKey: xn.metaKey
                          },
                          Wt = 6,
                          Jt = xn.currentTarget.closest("[data-node-id]");
                        if (!Jt) return;
                        xn.stopPropagation();
                        let Nn = !1;
                        const En = () => {
                            window.removeEventListener("mousemove", Zn, !0), window.removeEventListener("mouseup", Sr, !0);
                          },
                          Zn = Bn => {
                            Nn || Math.hypot(Bn.clientX - Fn, Bn.clientY - cr) <= Wt || (Nn = !0, En(), Jt.dispatchEvent(new MouseEvent("mousedown", {
                              bubbles: !0,
                              cancelable: !0,
                              clientX: Fn,
                              clientY: cr,
                              button: 0
                            })));
                          },
                          Sr = Bn => {
                            if (En(), Nn) return;
                            const Et = Date.now(),
                              zn = Xe.current;
                            if (Xe.current = {
                              t: Et,
                              idx: Rn
                            }, !!zn && zn.idx === Rn && Et - zn.t <= 320) {
                              Xe.current = null;
                              const or = {
                                  preventDefault: () => {},
                                  stopPropagation: () => {},
                                  ctrlKey: vr.ctrlKey,
                                  metaKey: vr.metaKey,
                                  clientX: Bn.clientX,
                                  clientY: Bn.clientY
                                },
                                mr = Rn,
                                Yr = st[Rn] || Dn[Rn] || an;
                              pa(or, Yr, mr);
                              return;
                            }
                            Cr(vr);
                          };
                        window.addEventListener("mousemove", Zn, !0), window.addEventListener("mouseup", Sr, !0);
                      };
                    return c.jsxs("div", {
                      className: `mj-grid-quadrant relative overflow-hidden bg-black flex items-center justify-center group cursor-pointer transition-all ${fn ? "h-full min-w-[120px] max-w-[180px] flex-1" : "w-full h-full"} ${er ? "ring-4 ring-green-500 ring-inset scale-[0.98]" : Un ? "ring-2 ring-blue-500 ring-inset" : "hover:ring-1 hover:ring-white/30 hover:ring-inset"}`,
                      onMouseDown: kn,
                      onClick: tr,
                      onDoubleClick: xn => {
                        xn.preventDefault(), xn.stopPropagation(), NF(), pa(xn, void 0, Rn);
                      },
                      children: [Un && !er && c.jsxs("div", {
                        className: "absolute top-1 left-1 z-30 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5",
                        children: [c.jsx(io, {
                          size: 10
                        }), x("引用")]
                      }), er && c.jsx("div", {
                        className: "absolute top-1 left-1 z-30 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-sm",
                        children: "✓"
                      }), c.jsx("div", {
                        role: "button",
                        tabIndex: 0,
                        "data-preview-cell-index-badge": !0,
                        className: `absolute top-1 right-1 z-30 text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors select-none ${er ? "bg-green-500/80 text-white" : Un ? "bg-blue-500/80 text-white" : n ? "bg-black/60 text-white/70" : "bg-white/60 text-zinc-700"} ${Rt ? n ? "hover:bg-black/75" : "hover:bg-white/80" : ""}`,
                        onMouseDown: xn => {
                          kn(xn);
                        },
                        onClick: tr,
                        onKeyDown: xn => {
                          xn.key !== "Enter" && xn.key !== " " || (xn.preventDefault(), Cr({
                            shiftKey: xn.shiftKey,
                            ctrlKey: xn.ctrlKey,
                            metaKey: xn.metaKey
                          }));
                        },
                        children: Rn + 1
                      }), c.jsx(_an, {
                        src: an,
                        displayWidth: e.width / Zt,
                        displayHeight: e.height / Ln,
                        zoom: h,
                        isDark: n,
                        alt: x("预览图 {0}", Rn + 1),
                        objectFit: "cover",
                        quality: "high",
                        onBlobUrlRecovery: xn => {
                          var Fn;
                          return J(xn, (Fn = e._previewMjAssetIds) == null ? void 0 : Fn[Rn]);
                        }
                      })]
                    }, Rn);
                  })
                }), j.length > 0 && c.jsxs("div", {
                  className: `absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-medium shadow-lg ${n ? "bg-green-500/90 text-white" : "bg-green-500 text-white"}`,
                  children: [x("已选中 "), j.length, x(" 张 • Shift+点击范围选择")]
                })]
              });
            })() : ht && Vn.length === 0 ? c.jsxs("div", {
              className: `w-full h-full flex flex-col items-center justify-center gap-2 ${n ? "text-zinc-500" : "text-zinc-400"}`,
              children: [c.jsx(Ua, {
                size: 20,
                className: "animate-spin"
              }), c.jsx("span", {
                className: "text-xs",
                children: x("加载中…")
              })]
            }) : c.jsx("div", {
              className: "w-full h-full cursor-pointer",
              onDoubleClick: ct => {
                ct.preventDefault(), ct.stopPropagation(), NF(), pa(ct, void 0, Gr > 0 ? Gr : void 0);
              },
              children: c.jsx(_an, {
                src: $n || "",
                displayWidth: e.width,
                displayHeight: e.height,
                zoom: h,
                isDark: n,
                alt: x("预览"),
                objectFit: "cover",
                quality: "high",
                onBlobUrlRecovery: ct => J(ct, e._contentAssetId)
              })
            }) : c.jsxs("div", {
              className: `absolute inset-0 z-[3] flex flex-col items-center justify-center text-center text-[11px] px-4 gap-3 ${n ? "text-zinc-500" : "text-zinc-400"}`,
              children: [(sa.length > 0 || ba) && (_a.generating || _a.error) && c.jsx("div", {
                className: `inline-flex flex-row items-center gap-2 rounded-full border px-4 py-1.5 ${_a.error ? n ? "bg-red-950/20 border-red-500/30" : "bg-red-50/80 border-red-200" : n ? "bg-white/5 border-white/10" : "bg-black/5 border-zinc-200"}`,
                children: _a.generating ? c.jsxs(c.Fragment, {
                  children: [c.jsx(Ua, {
                    size: 14,
                    className: `shrink-0 animate-spin ${n ? "text-zinc-400" : "text-zinc-500"}`
                  }), c.jsx("span", {
                    className: `whitespace-nowrap ${n ? "text-zinc-400" : "text-zinc-600"}`,
                    children: x("生成中")
                  })]
                }) : c.jsxs(c.Fragment, {
                  children: [c.jsx(c3, {
                    size: 14,
                    className: "shrink-0 text-red-500"
                  }), c.jsx("span", {
                    className: `truncate max-w-[200px] whitespace-nowrap ${n ? "text-red-400" : "text-red-600"}`,
                    title: _a.error,
                    children: _a.error || x("生成失败")
                  })]
                })
              }), !(_a.generating || _a.error) && c.jsxs(c.Fragment, {
                children: [c.jsx(ul, {
                  size: 24,
                  className: "opacity-50"
                }), c.jsx("span", {
                  children: x("连接 AI 绘图 / AI 视频 / 可灵动作迁移 节点")
                }), c.jsx("span", {
                  children: x("或从历史记录发送到此处进行预览")
                })]
              }), !_a.generating && Ea && sa.length >= 1 && A && (G ? c.jsxs("span", {
                className: `inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[11px] font-medium ${n ? "border-white/20 text-zinc-400" : "border-zinc-200 text-zinc-500"}`,
                children: [c.jsx(Ua, {
                  size: 12,
                  className: "animate-spin"
                }), x("正在生成")]
              }) : c.jsxs("button", {
                type: "button",
                onClick: ct => {
                  ct.stopPropagation(), oie(e) ? (ne(), r(e.id, {
                    ...b2e(e),
                    errorMsg: void 0
                  })) : ne(), A(sa[0]), z(!0);
                },
                onMouseDown: ct => ct.stopPropagation(),
                className: `inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[11px] font-medium transition-colors ${n ? "border-white/30 text-white hover:bg-white/10" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
                title: x("使用上游「{0}」的提示词与素材生成，结果仅显示在本预览窗口", sa[0].nodeName || (sa[0].type === "storyboard-chart-node" ? "分镜图表" : sa[0].type === "gen-video" ? "生成视频" : sa[0].type === "motion-control" ? "动作迁移（Kling）" : sa[0].type === "video-relight" ? "光照重置" : "生成图片")),
                children: [c.jsx(Ol, {
                  size: 12,
                  fill: "currentColor"
                }), x("使用上游节点生成")]
              }))]
            })
          }), !Vt && !vn && (sa.length > 0 || ba || K) && ($a || V) && c.jsx("div", {
            "data-aux-gen-progress-layer": !0,
            className: `absolute inset-0 z-[60] overflow-hidden pointer-events-none transition-opacity duration-400 ease-out ${V ? "opacity-0" : "opacity-100"}`,
            onTransitionEnd: V ? ki : void 0,
            "aria-hidden": !0,
            children: c.jsx(Yv, {
              seed: e.id,
              progressFillRef: D,
              className: ta ? "qiaodoumayi-generation-overlay--poster" : "",
              isDark: n,
              hasUnderlyingContent: ta
            })
          })]
        }), ta && c.jsx(J0o, {
          isDark: n,
          visible: $e || nt,
          opacity: $t,
          puzzleOpen: nt,
          canPuzzle: yr && !_r,
          showStoryboard: !!_,
          onTogglePuzzle: () => {
            const ct = !ge.current;
            if (Le(ct), ct) {
              ue.current = !0, ve(O0o);
              const Dt = ie.current || MO(xe.current || {});
              Dt.layoutMode === "grid" && (!Dt.gridAspectRatio || Dt.gridAspectRatio === "auto") && Te({
                ...Dt,
                layoutMode: "horizontal"
              }), window.setTimeout(() => {
                ue.current = !1;
              }, 800);
            }
          },
          onSendToCanvas: ha,
          onSendToChat: Za,
          onSendToStoryboard: Ga
        }), ta && nt && yr && !_r && c.jsx("div", {
          className: "absolute z-[60] nodrag nopan nowheel min-w-0",
          style: {
            top: "100%",
            left: "50%",
            width: "max(100%, 400px)",
            marginTop: "8px",
            transform: "translateX(-50%)",
            pointerEvents: "auto",
            opacity: $t
          },
          onMouseDown: ct => ct.stopPropagation(),
          onWheel: ct => ct.stopPropagation(),
          children: c.jsx("div", {
            className: `w-full px-2.5 py-2 rounded-2xl border ${n ? "border-white/10 bg-[#1f1f1f]" : "border-zinc-200 bg-white"}`,
            children: c.jsx(hvr, {
              scopeId: `${e.id}-puzzle`,
              isDark: n,
              puzzle: fe || MO(e.settings || {}),
              imageCount: Dn.length,
              onChange: Te,
              compact: !0,
              menuPlacement: "below",
              showMerge: !0,
              merging: ae,
              onMerge: () => void Hr()
            })
          })
        })]
      })
    }), Z && yr && Ne.length > 0 && c.jsx(ryo, {
      isOpen: Z,
      isDark: n,
      images: Ne,
      assetIds: Ae,
      resolveSlotOriginal: Br,
      rows: ((Qn = e.settings) == null ? void 0 : Qn.previewGridRows) || 3,
      cols: ((Lt = e.settings) == null ? void 0 : Lt.previewGridCols) || 3,
      nodeSettings: e.settings || {},
      onSettingsChange: ct => {
        r(e.id, {
          settings: {
            ...e.settings,
            ...a0n(ct)
          }
        });
      },
      onClose: () => re(!1),
      onStitchStart: Lr,
      onProgress: br,
      onStitchFailed: Jr,
      onStitched: ir
    })]
  });
};

function oyo({
  light: e,
  selected: t,
  children: n
}) {
  const r = XCe(t && !e),
    a = e && !t && r;
  return e && !a ? null : c.jsx("div", {
    className: `${a ? "pointer-events-none absolute inset-0" : "relative"} z-[1] h-full w-full`,
    "data-gen-full-exiting": a ? "" : void 0,
    children: n
  });
}

function syo({
  props: e,
  contentServices: t,
  displayQuality: n
}) {
  const {
      node: r
    } = e,
    {
      presentation: a,
      interaction: i
    } = gEe(t),
    {
      document: o
    } = t,
    s = {
      selectedNodeIds: i.selectedNodeIds,
      genPromptPanelOpen: N7(r.id)
    },
    l = d => TM(n, d, i.selectedNodeId, e.boxSelectLightShell, e.focusEditActiveSourceNodeId, s);
  switch (r.type) {
    case "input-image":
      return c.jsx(xgo, {
        documentSession: o.documentSession,
        node: r,
        selectedNodeId: i.selectedNodeId,
        boxSelectLightShell: e.boxSelectLightShell,
        focusEditActiveSourceNodeId: e.focusEditActiveSourceNodeId,
        selectedNodeIds: i.selectedNodeIds,
        hideAllInputImagePreviews: e.hideAllInputImagePreviews,
        isDark: a.isDark,
        updateNode: o.updateNode,
        viewZoom: a.view.zoom,
        view: a.view,
        canvasRef: e.canvasRef,
        canvasPortalRef: e.canvasPortalRef,
        renderQuality: n,
        mediaContentInView: e.mediaContentInView,
        setInputImageContextMenu: e.setInputImageContextMenu,
        isCompactMode: e.isCompactMode,
        isCompactUiMode: e.isCompactUiMode,
        onCompactModeImageClick: e.onCompactModeImageClick,
        nodeDirtyVersion: e.nodeDirtyVersion,
        setLightboxItem: d => {
          var u, h, p;
          if (console.log("[NodeContent] Received lightbox item from InputImageNode:", d), console.log("[NodeContent] props.setLightboxItem type:", typeof e.setLightboxItem), d && d.url) {
            const m = {
              id: r.id,
              type: d.type,
              url: d.url,
              originalUrl: d.originalUrl || d.url,
              _assetId: d._assetId || ((u = r.settings) == null ? void 0 : u._localCacheAssetId) || ((h = r.settings) == null ? void 0 : h._contentAssetId) || ((p = r.settings) == null ? void 0 : p._assetId) || r._contentAssetId,
              preferDisplayUrls: d.preferDisplayUrls,
              _ossRemoteUrl: d._ossRemoteUrl,
              _globalOssUrlOnly: d._globalOssUrlOnly,
              ossUploaded: d.ossUploaded,
              prompt: r.prompt || "",
              title: d.title
            };
            console.log("[NodeContent] Setting lightbox with data:", m), console.log("[NodeContent] Calling props.setLightboxItem...");
            try {
              e.setLightboxItem(m), console.log("[NodeContent] props.setLightboxItem called successfully");
            } catch (f) {
              console.error("[NodeContent] Error calling props.setLightboxItem:", f);
            }
          } else console.warn("[NodeContent] Invalid lightbox item:", d), e.setLightboxItem(null);
        },
        setLightboxOpen: e.setLightboxOpen,
        nodes: o.nodes,
        connections: o.connections,
        setNodes: o.setNodes,
        setConnections: o.setConnections,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        generateId: o.generateId,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        setHistory: o.setHistory,
        resolveMaterialLibraryDrop: e.resolveMaterialLibraryDrop,
        runEditImage: e.runEditImage,
        runExpandImage: e.runExpandImage,
        setCroppingNodeId: e.setCroppingNodeId,
        visibleImageConfigs: e.visibleImageConfigs,
        expandImageConfigs: e.expandImageConfigs,
        getConnectedInputImages: e.getConnectedInputImages,
        getConnectedInputItems: e.getConnectedInputItems,
        showHuyaModels: e.showHuyaModels,
        materialLibraryTree: e.materialLibraryTree,
        getMaterialLibraryPreviewUrl: e.getMaterialLibraryPreviewUrl,
        activeDropdown: e.activeDropdown,
        setActiveDropdown: e.setActiveDropdown,
        onDownloadSelected: e.onDownloadSelected,
        onStartCompactRefCanvasPick: e.onStartCompactRefCanvasPick,
        compactRefCanvasPickTargetId: e.compactRefCanvasPickTargetId
      });
    case "text-node":
      return c.jsx(g0o, {
        node: r,
        selectedNodeId: i.selectedNodeId,
        isDark: a.isDark,
        updateNode: o.updateNode,
        connections: o.connections,
        nodes: o.nodes,
        setConnections: o.setConnections,
        setNodes: o.setNodes,
        materialLibraryTree: e.materialLibraryTree,
        getMaterialLibraryPreviewUrl: e.getMaterialLibraryPreviewUrl,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        getConnectedInputImages: e.getConnectedInputImages,
        getOrderedInputItems: e.getOrderedInputItems,
        activeDropdown: e.activeDropdown,
        setActiveDropdown: e.setActiveDropdown,
        view: a.view,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        onStartCompactRefCanvasPick: e.onStartCompactRefCanvasPick,
        compactRefCanvasPickTargetId: e.compactRefCanvasPickTargetId
      });
    case "gen-image":
    case "gen-video":
      {
        const d = l(r);
        return c.jsxs("div", {
          className: "relative h-full w-full",
          children: [c.jsx("div", {
            className: d ? "h-full w-full" : "pointer-events-none absolute inset-0 z-0 overflow-hidden",
            children: c.jsx(az, {
              node: r,
              isDark: a.isDark,
              setNodes: o.setNodes,
              boxSelectLightShell: e.boxSelectLightShell,
              backgroundOnly: !d && jFt(r),
              enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
              enableHoverPlayback: d
            })
          }), c.jsx(oyo, {
            light: d,
            selected: i.selectedNodeId === r.id,
            children: c.jsx(B4i, {
              documentSession: o.documentSession,
              node: r,
              selectedNodeId: i.selectedNodeId,
              setSelectedNodeId: e.setSelectedNodeId,
              setSelectedNodeIds: e.setSelectedNodeIds,
              nodes: o.nodes,
              isDark: a.isDark,
              updateNode: o.updateNode,
              deleteNode: o.deleteNode,
              apiConfigs: e.genNodeApiConfigs ?? e.apiConfigs,
              showHuyaModels: e.showHuyaModels,
              expandImageConfigs: e.expandImageConfigs,
              isModelHiddenInList: e.isModelHiddenInList,
              apiStatus: e.apiStatus,
              globalApiKey: e.globalApiKey,
              generationTimers: e.generationTimers,
              getConnectedInputImages: e.getConnectedInputImages,
              getConnectedInputItems: e.getConnectedInputItems,
              getConnectedImageForInput: e.getConnectedImageForInput,
              getConnectedDirectorNodes: e.getConnectedDirectorNodes,
              connectingSource: e.connectingSource,
              connectingTarget: e.connectingTarget,
              connectingInputType: e.connectingInputType,
              setConnectingSource: e.setConnectingSource,
              setConnectingTarget: e.setConnectingTarget,
              setConnectingInputType: e.setConnectingInputType,
              setConnections: o.setConnections,
              connections: o.connections,
              canvasRef: e.canvasRef,
              view: a.view,
              setMousePos: e.setMousePos,
              characterLibrary: e.characterLibrary,
              setCharactersOpen: e.setCharactersOpen,
              klingSubjectLibrary: e.klingSubjectLibrary,
              setKlingSubjectsOpen: e.setKlingSubjectsOpen,
              promptLibrary: e.promptLibrary,
              setPromptLibrary: e.setPromptLibrary,
              promptLibraryCollapsed: e.promptLibraryCollapsed,
              setPromptLibraryCollapsed: e.setPromptLibraryCollapsed,
              promptLibraryEditorOpen: e.promptLibraryEditorOpen,
              setPromptLibraryEditorOpen: e.setPromptLibraryEditorOpen,
              promptLibraryForm: e.promptLibraryForm,
              setPromptLibraryForm: e.setPromptLibraryForm,
              activeDropdown: e.activeDropdown,
              setActiveDropdown: e.setActiveDropdown,
              generate: e.generate,
              generateId: o.generateId,
              setNodes: o.setNodes,
              nodeDirtyVersion: e.nodeDirtyVersion,
              setLightboxItem: e.setLightboxItem,
              setLightboxOpen: e.setLightboxOpen,
              setPreviewContextMenu: e.setPreviewContextMenu,
              isCompactMode: e.isCompactMode,
              isCompactUiMode: e.isCompactUiMode,
              onCompactModeImageClick: e.onCompactModeImageClick,
              onStartCompactRefCanvasPick: e.onStartCompactRefCanvasPick,
              compactCanvasPickResumeSnap: e.compactCanvasPickResumeSnap,
              focusEditPromptOpenSnap: e.focusEditPromptOpenSnap,
              compactRefCanvasPickTargetId: e.compactRefCanvasPickTargetId ?? null,
              storyboardCanvasPickTarget: e.storyboardCanvasPickTarget ?? null,
              generationHistory: e.generationHistory,
              materialLibraryTree: e.materialLibraryTree,
              getMaterialLibraryPreviewUrl: e.getMaterialLibraryPreviewUrl,
              getMaterialLibraryPreviewForCanvas: e.getMaterialLibraryPreviewForCanvas,
              onGenInlineDirectorUiChange: e.onGenInlineDirectorUiChange,
              onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
              renderQuality: n,
              enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
              showStartGenerateButton: e.showStartGenerateButton,
              focusEditActive: e.focusEditActive,
              onToggleFocusEdit: e.onToggleFocusEdit,
              runExpandImage: e.runExpandImage,
              runEditImage: e.runEditImage,
              setHistory: o.setHistory,
              setCroppingNodeId: e.setCroppingNodeId,
              canvasPortalRef: e.canvasPortalRef,
              onDownloadSelected: e.onDownloadSelected
            })
          })]
        });
      }
    case "preview":
      return l(r) ? c.jsx(kgo, {
        node: r,
        isDark: a.isDark,
        nodes: o.nodes,
        connections: o.connections
      }) : c.jsx(iyo, {
        documentSession: o.documentSession,
        node: r,
        isDark: a.isDark,
        updateNode: o.updateNode,
        setNodes: o.setNodes,
        setPreviewContextMenu: e.setPreviewContextMenu,
        setLightboxItem: e.setLightboxItem,
        setLightboxOpen: e.setLightboxOpen,
        setChatFiles: e.setChatFiles,
        setIsChatOpen: e.setIsChatOpen,
        generateId: o.generateId,
        viewZoom: a.view.zoom,
        onDownload: e.onDownloadFile,
        isDownloading: e.isDownloading,
        downloadProgress: e.downloadProgress,
        renderQuality: n,
        nodes: o.nodes,
        connections: o.connections,
        splitImageToShots: e.splitImageToShots,
        setConnections: o.setConnections,
        setIsCanvasFullscreen: e.setIsCanvasFullscreen,
        isCompactMode: e.isCompactMode,
        isCompactUiMode: e.isCompactUiMode,
        onCompactModeImageClick: e.onCompactModeImageClick,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        onGenerateFromUpstream: d => {
          var h, p, m, f, y, b, v, _, w, k, A, S, C;
          const u = (h = o.documentSession) == null ? void 0 : h.lease();
          if (d.type === "storyboard-chart-node" && e.generateChartBatch && e.getConnectedInputImages) {
            const I = ((p = d.settings) == null ? void 0 : p.cells) || [],
              E = ((m = d.settings) == null ? void 0 : m.gridMode) ?? "grid",
              M = Math.max(1, Math.min(12, ((f = d.settings) == null ? void 0 : f.rows) ?? 3)),
              T = Math.max(1, Math.min(12, ((y = d.settings) == null ? void 0 : y.cols) ?? 3)),
              P = Math.max(1, Math.min(64, ((b = d.settings) == null ? void 0 : b.totalGrids) ?? 9)),
              R = E === "grid" ? P : M * T,
              j = ((v = d.settings) == null ? void 0 : v.chartArtStyle) ?? "auto",
              B = j !== "auto" && ((_ = e.chartArtStyles) != null && _.length) && ((w = e.chartArtStyles.find(z => z.id === j)) == null ? void 0 : w.prompt) || "",
              F = e.chartArtStyles || [],
              N = [];
            for (let z = 0; z < R; z++) {
              const V = I[z] || {
                id: `c-${z}`,
                prompt: ""
              };
              let O = (V.prompt || "").trim();
              try {
                const U = JSON.parse(O);
                U && typeof U.prompt == "string" && (O = U.prompt.trim());
              } catch {}
              (k = V.refs) != null && k.length && (O = (O + " " + V.refs.map(U => `@${U}`).join(" ")).trim());
              let L = O || `分镜 ${z + 1} 描述`;
              if (F.length > 0) {
                const U = [...F].sort((H, Y) => {
                  var K, W;
                  return (((K = Y.prompt) == null ? void 0 : K.length) || 0) - (((W = H.prompt) == null ? void 0 : W.length) || 0);
                });
                for (const H of U) {
                  const Y = (H.prompt || "").trim();
                  if (Y) {
                    if (L === Y) {
                      L = "";
                      break;
                    }
                    if (L.startsWith(Y + ", ")) {
                      L = L.slice(Y.length + 2).trim();
                      break;
                    }
                    if (L.startsWith(Y + ",")) {
                      L = L.slice(Y.length + 1).trim();
                      break;
                    }
                    if (L.startsWith(Y)) {
                      L = L.slice(Y.length).trim();
                      break;
                    }
                  }
                }
                L.trim() || (L = O || `分镜 ${z + 1} 描述`);
              }
              const D = B ? `${B}, ${L}` : L;
              N.push({
                id: V.id || `c-${z}`,
                prompt: D
              });
            }
            const G = e.getConnectedInputImages(d.id) || [];
            e.generateChartBatch({
              nodeId: d.id,
              cells: N,
              model: ((A = d.settings) == null ? void 0 : A.model) || "qwen-image-edit",
              ratio: ((S = d.settings) == null ? void 0 : S.ratio) || "Auto",
              resolution: ((C = d.settings) == null ? void 0 : C.resolution) || "2K",
              refImages: G,
              connections: o.connections,
              nodes: o.nodes,
              updateNode: o.updateNode,
              setNodes: o.setNodes,
              setConnections: o.setConnections,
              generateId: o.generateId,
              gridRows: E === "grid" ? Math.ceil(R / 3) : M,
              gridCols: E === "grid" ? 3 : T,
              targetPreviewId: r.id
            }).catch(() => {
              Wke(u, r.id, "previewGenerateFailed");
            });
          } else {
            const I = {
              ...(d.settings || {}),
              _autoCreatedPreviewId: r.id,
              selectedPreviewId: r.id
            };
            o.updateNode(d.id, {
              settings: I
            }), requestAnimationFrame(() => {
              Wke(u, r.id, "previewGenerationStarted");
            }), e.generate({
              ...d,
              settings: I
            });
          }
        }
      });
    default:
      return null;
  }
}

const fvr = Object.freeze(Object.defineProperty({
  __proto__: null,
  CoreNodesGroup: syo
}, Symbol.toStringTag, {
  value: "Module"
}));

async function s$t(e, t = {}) {
  if (!/\.(mp4|mov)$/i.test(e.name)) throw new Error("仅支持 MP4 或 MOV 格式的视频文件");
  if (!t.allowTrim && e.size > 20 * 1024 * 1024) throw new Error("视频文件大小不能超过 20MB");
  const n = document.createElement("video"),
    r = URL.createObjectURL(e);
  let a;
  try {
    if (await new Promise((i, o) => {
      a = setTimeout(() => o(new Error("读取视频信息超时，请检查视频编码或重新选择文件")), 1e4), n.onloadedmetadata = () => i(), n.onerror = () => o(new Error("无法读取视频信息")), n.preload = "metadata", n.src = r, n.load();
    }), !Number.isFinite(n.duration)) throw new Error("无法读取视频时长");
    if (n.duration < 3) throw new Error("视频时长不能少于 3秒");
    if (n.duration > 10 && !t.allowTrim) throw new Error("视频时长不能超过 10秒");
    if (n.videoWidth < 720 || n.videoWidth > 2160 || n.videoHeight < 720 || n.videoHeight > 2160) throw new Error(`视频尺寸不符合要求（当前: ${n.videoWidth}x${n.videoHeight}，要求: 720-2160px）`);
    if (n.duration <= 10 && e.size > 20 * 1024 * 1024) throw new Error("视频文件大小不能超过 20MB");
    return n.duration;
  } finally {
    clearTimeout(a), n.onloadedmetadata = null, n.onerror = null, n.removeAttribute("src"), n.load(), URL.revokeObjectURL(r);
  }
}

const l$t = ({
    isOpen: e,
    onClose: t,
    onConfirm: n,
    isDark: r = !1,
    maxDuration: a = 10,
    currentVideoFile: i = null,
    apiKey: o,
    baseUrl: s,
    useOssForUpload: l = !1,
    attachMode: d = "floating"
  }) => {
    on();
    const [u, h] = g.useState(i),
      [p, m] = g.useState(0),
      [f, y] = g.useState(0),
      [b, v] = g.useState(!1),
      [_, w] = g.useState(0),
      [k, A] = g.useState(0),
      [S, C] = g.useState(null),
      [I, E] = g.useState(0),
      [M, T] = g.useState([]),
      [P, R] = g.useState(""),
      [j, B] = g.useState(!1),
      [F, N] = g.useState(""),
      [G, z] = g.useState("base"),
      [V, O] = g.useState("yes"),
      [L, D] = g.useState(!1),
      U = g.useRef(null),
      H = g.useRef(null),
      Y = g.useRef(null),
      K = g.useRef(null);
    g.useEffect(() => {
      if (!u || !e) return;
      const ae = U.current;
      if (!ae) return;
      const be = URL.createObjectURL(u);
      return ae.onloadedmetadata = () => {
        const Ee = ae.duration;
        m(Ee), w(0), A(Ee), W(ae, Ee), R("");
      }, ae.onerror = () => {
        R("无法读取视频信息，请更换 MP4/MOV 文件");
      }, ae.preload = "metadata", ae.src = be, ae.load(), () => {
        URL.revokeObjectURL(be), ae && (ae.pause(), ae.src = "");
      };
    }, [u, e, a]);
    const W = async (ae, be) => {
      const Ee = [],
        he = document.createElement("canvas"),
        ue = he.getContext("2d");
      if (ue) {
        he.width = 160, he.height = 90;
        for (let ge = 0; ge < 10; ge++) {
          const _e = be / 10 * ge;
          ae.currentTime = _e, await new Promise(ke => {
            ae.onseeked = () => {
              ue.drawImage(ae, 0, 0, he.width, he.height), Ee.push(he.toDataURL("image/jpeg", .7)), ke();
            };
          });
        }
        T(Ee);
      }
    };
    g.useEffect(() => {
      const ae = U.current;
      if (!ae) return;
      const be = () => {
        ae.currentTime >= k ? (ae.pause(), v(!1), y(_), ae.currentTime = _) : y(ae.currentTime);
      };
      if (b) {
        ae.currentTime = _, ae.play().catch(xe => console.error("播放失败:", xe));
        const Ee = setInterval(be, 100);
        return () => clearInterval(Ee);
      } else ae.pause();
    }, [b, _, k]);
    const Q = async ae => {
        var Ee;
        const be = (Ee = ae.target.files) == null ? void 0 : Ee[0];
        ae.target.value = "", be && (await q(be));
      },
      q = async ae => {
        try {
          await s$t(ae), h(ae), R(""), v(!1), y(0);
        } catch (be) {
          R(be instanceof Error ? be.message : "视频文件验证失败");
        }
      },
      ne = async ae => {
        ae.preventDefault(), ae.stopPropagation(), D(!1);
        const be = ae.dataTransfer.getData("application/json");
        if (be) try {
          const xe = JSON.parse(be);
          if (xe.type === "history-item" && xe.item) {
            if (console.log("[Kling Video] History item dropped:", xe.item), xe.item.type !== "video") {
              R("只支持拖入视频，不支持图片或音频");
              return;
            }
            B(!0), N("正在处理视频..."), R("");
            try {
              const ue = await (await fetch(xe.item.url)).blob(),
                ge = `history-${Date.now()}.mp4`,
                _e = new File([ue], ge, {
                  type: ue.type || "video/mp4"
                });
              await q(_e), N("");
            } catch (he) {
              console.error("[Kling Video] 处理历史视频失败:", he), R(`视频处理失败: ${he instanceof Error ? he.message : String(he)}`), N("");
            } finally {
              B(!1);
            }
            return;
          }
        } catch (xe) {
          console.error("[Kling Video] Failed to parse history item data:", xe);
        }
        const Ee = ae.dataTransfer.files[0];
        Ee && (await q(Ee));
      },
      de = ae => {
        ae.preventDefault(), ae.stopPropagation(), D(!0);
      },
      le = ae => {
        ae.preventDefault(), ae.stopPropagation(), D(!1);
      },
      J = () => {
        const ae = U.current;
        ae && (b ? ae.pause() : (ae.currentTime = _, ae.play().catch(be => console.error("播放失败:", be))), v(!b));
      },
      pe = ae => {
        const be = Math.floor(ae / 60),
          Ee = Math.floor(ae % 60),
          xe = Math.floor(ae % 1 * 10);
        return `${be.toString().padStart(2, "0")}:${Ee.toString().padStart(2, "0")}.${xe}`;
      },
      ce = ae => p ? ae / p * 100 : 0,
      we = ae => p ? ae / 100 * p : 0,
      X = ae => {
        if (!H.current || !p) return;
        const be = H.current.getBoundingClientRect(),
          xe = (ae.clientX - be.left) / be.width * 100,
          he = we(xe),
          ue = Math.abs(he - _),
          ge = Math.abs(he - k);
        if (ue < ge) {
          const _e = Math.max(0, Math.min(he, k - 3));
          w(_e);
        } else {
          const _e = Math.min(p, Math.max(he, _ + 3));
          A(_e);
        }
      },
      Z = (ae, be) => {
        if (be.preventDefault(), be.stopPropagation(), !H.current) return;
        C(ae);
        const Ee = H.current.getBoundingClientRect(),
          he = (be.clientX - Ee.left) / Ee.width * 100,
          ue = ce(ae === "start" ? _ : k);
        E(he - ue), document.body.style.userSelect = "none", document.body.style.cursor = "ew-resize";
      };
    g.useEffect(() => {
      if (!S || !H.current || !p) return;
      const ae = Ee => {
          Ee.preventDefault();
          const xe = H.current.getBoundingClientRect(),
            ue = (Ee.clientX - xe.left) / xe.width * 100,
            ge = Math.max(0, Math.min(100, ue - I)),
            _e = we(ge);
          if (S === "start") {
            const ke = Math.max(0, Math.min(_e, k - 3));
            w(ke);
          } else {
            const ke = Math.min(p, Math.max(_e, _ + 3));
            A(ke);
          }
        },
        be = () => {
          C(null), E(0), document.body.style.userSelect = "", document.body.style.cursor = "";
        };
      return window.addEventListener("mousemove", ae), window.addEventListener("mouseup", be), () => {
        window.removeEventListener("mousemove", ae), window.removeEventListener("mouseup", be);
      };
    }, [S, I, p, _, k]);
    const re = () => {
        h(null), m(0), y(0), v(!1), w(0), A(0), T([]), R(""), Y.current && (Y.current.value = "");
      },
      fe = async () => {
        if (!u) {
          R("请先选择视频文件");
          return;
        }
        const ae = k - _;
        if (ae < 3) {
          R("选择的视频片段至少需要 3秒");
          return;
        }
        if (ae > a) {
          R(`选择的视频片段不能超过 ${a}秒`);
          return;
        }
        if (l) try {
          B(!0), N("正在上传至图床..."), R("");
          const {
              uploadKlingPanelFileToMediaHosting: be
            } = await Ie(async () => {
              const {
                uploadKlingPanelFileToMediaHosting: xe
              } = await Promise.resolve().then(() => Mc);
              return {
                uploadKlingPanelFileToMediaHosting: xe
              };
            }, void 0, import.meta.url),
            Ee = await be(u, "video");
          console.log("[KlingVideoUpload] 图床上传成功:", Ee), N("上传成功！"), n(u, _, k, Ee, G, V), t();
        } catch (be) {
          console.error("[KlingVideoUpload] 图床上传失败:", be), R(be instanceof Error ? be.message : "图床上传失败");
        } finally {
          B(!1), N("");
        } else if (o && s) try {
          B(!0), N("正在上传视频..."), R("");
          const be = new FormData();
          be.append("file", u);
          const Ee = `${s}/v1/files`;
          console.log("[KlingVideoUpload] 上传视频到:", Ee);
          const xe = await fetch(Ee, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${o}`
            },
            body: be
          });
          if (!xe.ok) {
            const ge = await xe.text();
            throw new Error(`上传失败: ${xe.status} ${ge}`);
          }
          const he = await xe.json();
          console.log("[KlingVideoUpload] 上传成功，完整响应:", he);
          let ue = he.url || he.file_url || he.download_url;
          if (console.log("[KlingVideoUpload] 提取的URL字段:", {
            url: he.url,
            file_url: he.file_url,
            download_url: he.download_url,
            finalUrl: ue
          }), !ue && he.id && (ue = `${s}/v1/files/${he.id}`, console.log("[KlingVideoUpload] 使用ID构建URL:", ue)), !ue) throw new Error("未能获取视频URL");
          console.log("[KlingVideoUpload] 最终视频URL:", ue), N("上传成功！"), console.log("[KlingVideoUpload] 调用onConfirm，参数:", {
            fileName: u.name,
            startTime: _,
            endTime: k,
            videoUrl: ue,
            referType: G,
            keepOriginalSound: V
          }), n(u, _, k, ue, G, V), t();
        } catch (be) {
          console.error("[KlingVideoUpload] 上传失败:", be);
          try {
            const Ee = await OF(be instanceof Error ? be : new Error(String((be == null ? void 0 : be.message) || "视频上传失败")));
            N("已使用公网视频链接"), n(u, _, k, Ee, G, V), t();
          } catch (Ee) {
            R(Ee instanceof Error ? Ee.message : "视频上传失败");
          } finally {
            B(!1), N("");
          }
        } else n(u, _, k, void 0, G, V), t();
      };
    if (!e) return null;
    const ye = k - _,
      ie = d === "inline";
    return c.jsxs(c.Fragment, {
      children: [!ie && c.jsx("div", {
        className: "fixed inset-0 z-[100]",
        "data-kling-overlay-backdrop": !0,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        },
        onPointerDown: ae => ae.stopPropagation(),
        onClick: t
      }), c.jsxs("div", {
        ref: K,
        "data-gen-model-overlay-panel": !0,
        className: `z-[1000] rounded-lg shadow-2xl border ${ie ? "w-full" : "absolute top-0 left-full ml-4 w-[480px]"} ${r ? "bg-zinc-900 border-white/30" : "bg-white border-zinc-200"}`,
        style: {
          pointerEvents: "auto"
        },
        onMouseDown: ae => ae.stopPropagation(),
        onPointerDown: ae => ae.stopPropagation(),
        children: [c.jsx("div", {
          className: "p-4 pt-4",
          children: u ? c.jsxs(c.Fragment, {
            children: [c.jsxs("div", {
              className: "flex items-center justify-between mb-3",
              children: [c.jsxs("div", {
                className: `text-xs ${r ? "text-zinc-400" : "text-zinc-600"}`,
                children: [c.jsx("p", {
                  className: "font-medium truncate max-w-[300px]",
                  children: u.name
                }), c.jsxs("p", {
                  className: "mt-0.5",
                  children: [x("时长: "), pe(p), x(" | 大小: "), (u.size / 1024 / 1024).toFixed(2), " MB"]
                })]
              }), c.jsx("button", {
                onClick: re,
                className: `p-2 rounded transition-colors ${r ? "hover:bg-red-500/10 text-red-400" : "hover:bg-red-50 text-red-500"}`,
                title: x("删除视频"),
                children: c.jsx(Qo, {
                  size: 16
                })
              })]
            }), c.jsx("div", {
              className: `mb-3 rounded-lg overflow-hidden border ${r ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-zinc-100"}`,
              children: c.jsx("video", {
                ref: U,
                className: "w-full h-auto",
                style: {
                  maxHeight: "240px"
                }
              })
            }), c.jsxs("div", {
              className: "flex items-center gap-3 mb-3",
              children: [c.jsx("button", {
                onClick: J,
                className: `p-2 rounded-full transition-colors ${r ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`,
                children: b ? c.jsx(d3, {
                  size: 14
                }) : c.jsx(Ol, {
                  size: 14,
                  className: "ml-0.5"
                })
              }), c.jsxs("div", {
                className: "flex-1",
                children: [c.jsxs("div", {
                  className: `text-xs font-mono ${r ? "text-zinc-300" : "text-zinc-700"}`,
                  children: [pe(f), " / ", pe(p)]
                }), c.jsxs("div", {
                  className: `text-xs mt-0.5 ${r ? "text-zinc-400" : "text-zinc-600"}`,
                  children: [x("已选: "), ye.toFixed(1), "s", ye >= 3 && ye <= a ? c.jsx("span", {
                    className: "text-green-500 ml-1",
                    children: "✓"
                  }) : c.jsxs("span", {
                    className: "text-red-500 ml-1",
                    children: [x("需要 3-"), a, "s"]
                  })]
                })]
              })]
            }), c.jsxs("div", {
              ref: H,
              className: `relative rounded-lg mb-3 cursor-pointer overflow-hidden ${r ? "bg-zinc-900" : "bg-zinc-100"}`,
              style: {
                height: "80px"
              },
              onClick: X,
              children: [c.jsx("div", {
                className: "absolute inset-0 flex",
                children: M.map((ae, be) => c.jsx("div", {
                  className: "flex-1 h-full",
                  style: {
                    backgroundImage: `url(${ae})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }
                }, be))
              }), c.jsx("div", {
                className: "absolute top-0 bottom-0 bg-blue-500/30 border-l-2 border-r-2 border-blue-500 pointer-events-none",
                style: {
                  left: `${ce(_)}%`,
                  width: `${ce(k) - ce(_)}%`
                }
              }), f >= _ && f <= k && c.jsx("div", {
                className: "absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-20",
                style: {
                  left: `${ce(f)}%`
                },
                children: c.jsx("div", {
                  className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-lg"
                })
              }), c.jsx("div", {
                className: "absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize z-30 hover:w-1.5 transition-all",
                style: {
                  left: `${ce(_)}%`
                },
                onMouseDown: ae => Z("start", ae),
                children: c.jsx("div", {
                  className: "absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap text-blue-500",
                  children: pe(_)
                })
              }), c.jsx("div", {
                className: "absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize z-30 hover:w-1.5 transition-all",
                style: {
                  left: `${ce(k)}%`
                },
                onMouseDown: ae => Z("end", ae),
                children: c.jsx("div", {
                  className: "absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap text-blue-500",
                  children: pe(k)
                })
              })]
            }), c.jsxs("div", {
              className: `text-xs text-center mb-3 ${r ? "text-zinc-400" : "text-zinc-600"}`,
              children: [x("拖动时间轴两端调整视频片段，需选择 3-"), a, x("秒")]
            }), c.jsxs("div", {
              className: `space-y-2 mb-3 p-3 rounded-lg border ${r ? "bg-zinc-900/30 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`,
              children: [c.jsxs("div", {
                className: "flex items-center justify-between",
                children: [c.jsx("span", {
                  className: `text-xs ${r ? "text-zinc-300" : "text-zinc-700"}`,
                  children: x("视频类型")
                }), c.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [c.jsxs("label", {
                    className: "flex items-center gap-1.5 cursor-pointer",
                    children: [c.jsx("input", {
                      type: "radio",
                      name: "referType",
                      value: "base",
                      checked: G === "base",
                      onChange: ae => z("base"),
                      className: "w-3.5 h-3.5 cursor-pointer"
                    }), c.jsx("span", {
                      className: `text-xs ${r ? "text-zinc-400" : "text-zinc-600"}`,
                      children: x("待编辑视频")
                    })]
                  }), c.jsxs("label", {
                    className: "flex items-center gap-1.5 cursor-pointer",
                    children: [c.jsx("input", {
                      type: "radio",
                      name: "referType",
                      value: "feature",
                      checked: G === "feature",
                      onChange: ae => z("feature"),
                      className: "w-3.5 h-3.5 cursor-pointer"
                    }), c.jsx("span", {
                      className: `text-xs ${r ? "text-zinc-400" : "text-zinc-600"}`,
                      children: x("特征参考视频")
                    })]
                  })]
                })]
              }), c.jsxs("div", {
                className: "flex items-center justify-between",
                children: [c.jsx("span", {
                  className: `text-xs ${r ? "text-zinc-300" : "text-zinc-700"}`,
                  children: x("保留原声")
                }), c.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [c.jsxs("label", {
                    className: "flex items-center gap-1.5 cursor-pointer",
                    children: [c.jsx("input", {
                      type: "radio",
                      name: "keepOriginalSound",
                      value: "yes",
                      checked: V === "yes",
                      onChange: ae => O("yes"),
                      className: "w-3.5 h-3.5 cursor-pointer"
                    }), c.jsx("span", {
                      className: `text-xs ${r ? "text-zinc-400" : "text-zinc-600"}`,
                      children: x("是")
                    })]
                  }), c.jsxs("label", {
                    className: "flex items-center gap-1.5 cursor-pointer",
                    children: [c.jsx("input", {
                      type: "radio",
                      name: "keepOriginalSound",
                      value: "no",
                      checked: V === "no",
                      onChange: ae => O("no"),
                      className: "w-3.5 h-3.5 cursor-pointer"
                    }), c.jsx("span", {
                      className: `text-xs ${r ? "text-zinc-400" : "text-zinc-600"}`,
                      children: x("否")
                    })]
                  })]
                })]
              })]
            }), P && c.jsx("div", {
              className: `text-xs p-2 rounded mb-3 ${r ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`,
              children: P
            }), j && F && c.jsx("div", {
              className: `text-xs p-2 rounded mb-3 text-center ${r ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-50 text-blue-700 border border-blue-200"}`,
              children: F
            })]
          }) : c.jsxs(c.Fragment, {
            children: [c.jsx("div", {
              onMouseDown: ae => {
                ae.preventDefault(), ae.stopPropagation();
              },
              onClick: ae => {
                var be;
                ae.preventDefault(), ae.stopPropagation(), (be = Y.current) == null || be.click();
              },
              onDragEnter: de,
              onDrop: ne,
              onDragOver: de,
              onDragLeave: le,
              className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${L ? r ? "border-white/50 bg-white/5" : "border-blue-500 bg-blue-50" : r ? "border-white/30 hover:border-white/50 bg-transparent" : "border-zinc-300 hover:border-zinc-400 bg-zinc-50"}`,
              children: c.jsxs("div", {
                className: "flex flex-col items-center gap-3",
                children: [c.jsx("div", {
                  className: `p-4 rounded-full ${r ? "bg-transparent" : "bg-blue-50"}`,
                  children: c.jsx(ml, {
                    size: 32,
                    className: r ? "text-white/60" : "text-blue-500"
                  })
                }), c.jsxs("div", {
                  children: [c.jsx("p", {
                    className: `text-sm font-medium mb-1 ${r ? "text-white" : "text-zinc-800"}`,
                    children: x("点击或拖拽上传视频")
                  }), c.jsx("p", {
                    className: `text-xs ${r ? "text-white/50" : "text-zinc-600"}`,
                    children: x("仅支持 MP4/MOV 格式，3-10秒，720-2160px，最大 20MB")
                  })]
                })]
              })
            }), c.jsx("input", {
              ref: Y,
              type: "file",
              accept: ".mp4,.mov,video/mp4,video/quicktime",
              onChange: Q,
              className: "hidden"
            }), P && c.jsx("div", {
              className: `text-xs p-2 rounded mt-3 ${r ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`,
              children: P
            }), j && F && c.jsx("div", {
              className: `text-xs p-2 rounded mt-3 text-center ${r ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-50 text-blue-700 border border-blue-200"}`,
              children: F
            })]
          })
        }), c.jsxs("div", {
          className: `flex justify-end gap-2 px-4 py-3 border-t ${r ? "border-white/30" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            onClick: t,
            disabled: j,
            className: `px-4 py-2 rounded text-sm transition-colors border ${j ? r ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-400 text-zinc-200 cursor-not-allowed border-transparent" : r ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-transparent"}`,
            children: x("取消")
          }), u && c.jsx("button", {
            onClick: fe,
            disabled: !u || ye < 3 || ye > a || j,
            className: `px-4 py-2 rounded text-sm transition-colors border ${u && ye >= 3 && ye <= a && !j ? r ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-blue-600 hover:bg-blue-500 text-white border-transparent" : r ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-400 text-zinc-200 cursor-not-allowed border-transparent"}`,
            children: x(j ? "上传中..." : "确认上传")
          })]
        })]
      })]
    });
  },
  lyo = Object.freeze(Object.defineProperty({
    __proto__: null,
    KlingVideoUploadPanel: l$t
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  gvr = ({
    isOpen: e,
    isDark: t,
    currentImages: n,
    onClose: r,
    onConfirm: a,
    onChange: i,
    apiKey: o,
    baseUrl: s,
    maxImages: l = 7,
    useOssForUpload: d = !1,
    attachMode: u = "floating"
  }) => {
    on();
    const [h, p] = g.useState(n),
      [m, f] = g.useState(!1),
      [y, b] = g.useState(""),
      [v, _] = g.useState(!1),
      w = g.useRef(null);
    if (!e) return null;
    const k = async P => {
        if (d) {
          const {
            uploadKlingPanelFileToMediaHosting: F
          } = await Ie(async () => {
            const {
              uploadKlingPanelFileToMediaHosting: N
            } = await Promise.resolve().then(() => Mc);
            return {
              uploadKlingPanelFileToMediaHosting: N
            };
          }, void 0, import.meta.url);
          return F(P, "image");
        }
        const R = new FormData();
        R.append("file", P);
        const j = await fetch(`${s}/v1/files`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${o}`
          },
          body: R
        });
        if (!j.ok) throw new Error(`上传失败: ${j.statusText}`);
        const B = await j.json();
        return console.log("[Kling Image] 图片上传成功:", B), B.url ? B.url : B.data && B.data.url ? B.data.url : (console.warn("[Kling Image] 响应中没有 URL，使用 filename:", B.filename), B.filename || "");
      },
      A = async P => {
        if (!P || P.length === 0) return;
        const R = Array.from(P);
        if (h.length + R.length > l) {
          alert(x("最多支持上传 {0} 张图片，当前已有 {1} 张", l, h.length));
          return;
        }
        f(!0), b(`正在上传 0/${R.length} 张图片...`);
        try {
          const j = [];
          for (let B = 0; B < R.length; B++) {
            const F = R[B];
            b(`正在上传 ${B + 1}/${R.length} 张图片...`);
            const N = await k(F);
            N && j.push({
              url: N,
              file: F
            });
          }
          p([...h, ...j]), b(""), i && i([...h, ...j]);
        } catch (j) {
          console.error("[Kling Image] 上传失败:", j), alert(x("图片上传失败: {0}", j instanceof Error ? j.message : String(j))), b("");
        } finally {
          f(!1);
        }
      },
      S = async P => {
        if (P.preventDefault(), P.stopPropagation(), _(!1), m) return;
        const R = P.dataTransfer.getData("application/json");
        if (R) try {
          const B = JSON.parse(R);
          if (B.type === "history-item" && B.item) {
            if (console.log("[Kling Image] History item dropped:", B.item), B.item.type !== "image") {
              alert(x("只支持拖入图片，不支持视频或音频"));
              return;
            }
            if (h.length >= l) {
              alert(x("最多支持上传 {0} 张图片", l));
              return;
            }
            f(!0), b("正在处理图片...");
            try {
              const N = await (await fetch(B.item.url)).blob(),
                G = `history-${Date.now()}.png`,
                z = new File([N], G, {
                  type: N.type || "image/png"
                }),
                V = await k(z);
              if (V) {
                const O = [...h, {
                  url: V,
                  file: z
                }];
                p(O), i && i(O);
              }
              b("");
            } catch (F) {
              console.error("[Kling Image] 处理历史图片失败:", F), alert(x("图片处理失败: {0}", F instanceof Error ? F.message : String(F))), b("");
            } finally {
              f(!1);
            }
            return;
          }
        } catch (B) {
          console.error("[Kling Image] Failed to parse history item data:", B);
        }
        const j = P.dataTransfer.files;
        j && j.length > 0 && (await A(j));
      },
      C = P => {
        P.preventDefault(), P.stopPropagation(), m || _(!0);
      },
      I = P => {
        P.preventDefault(), P.stopPropagation(), _(!1);
      },
      E = P => {
        const R = h.filter((j, B) => B !== P);
        p(R), i && i(R);
      },
      M = () => {
        a(h), r();
      },
      T = u === "inline";
    return c.jsxs(c.Fragment, {
      children: [!T && c.jsx("div", {
        className: "fixed inset-0 z-[100]",
        "data-kling-overlay-backdrop": !0,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        },
        onPointerDown: P => P.stopPropagation(),
        onClick: r
      }), c.jsxs("div", {
        "data-gen-model-overlay-panel": !0,
        className: `rounded-lg shadow-2xl border ${T ? "w-full" : "absolute top-0 left-full ml-4"} ${t ? "bg-zinc-900 border-white/30" : "bg-white border-zinc-200"}`,
        style: {
          width: "420px",
          maxHeight: "90vh",
          zIndex: 1e3,
          pointerEvents: "auto"
        },
        onMouseDown: P => P.stopPropagation(),
        onPointerDown: P => P.stopPropagation(),
        onClick: P => P.stopPropagation(),
        children: [c.jsxs("div", {
          className: "p-4 pt-4 space-y-4 overflow-y-auto minimal-scrollbar",
          style: {
            maxHeight: "calc(90vh - 100px)"
          },
          children: [c.jsxs("div", {
            onClick: () => {
              var P;
              return !m && ((P = w.current) == null ? void 0 : P.click());
            },
            onDrop: S,
            onDragOver: C,
            onDragLeave: I,
            className: `border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${m ? "opacity-50 cursor-not-allowed" : v ? t ? "border-white/50 bg-white/5" : "border-blue-500 bg-blue-50" : t ? "border-white/20 hover:border-white/40 bg-transparent" : "border-zinc-300 hover:border-blue-500 bg-zinc-50"}`,
            children: [c.jsx("input", {
              ref: w,
              type: "file",
              accept: "image/*",
              multiple: !0,
              style: {
                display: "none"
              },
              onChange: P => A(P.target.files),
              disabled: m
            }), c.jsx("div", {
              className: "flex flex-col items-center gap-2",
              children: m ? c.jsxs(c.Fragment, {
                children: [c.jsx(Ua, {
                  size: 32,
                  className: `animate-spin ${t ? "text-white" : "text-blue-500"}`
                }), c.jsx("p", {
                  className: `text-xs ${t ? "text-zinc-400" : "text-zinc-600"}`,
                  children: y
                })]
              }) : c.jsxs(c.Fragment, {
                children: [c.jsx(ml, {
                  size: 32,
                  className: t ? "text-white/60" : "text-zinc-400"
                }), c.jsx("p", {
                  className: `text-xs ${t ? "text-white/70" : "text-zinc-600"}`,
                  children: x("点击或拖拽上传图片")
                }), c.jsxs("p", {
                  className: `text-[10px] ${t ? "text-white/50" : "text-zinc-400"}`,
                  children: [x("支持 JPG、PNG、WebP 等格式，最多 "), l, x(" 张")]
                })]
              })
            })]
          }), h.length > 0 && c.jsxs("div", {
            className: "space-y-2",
            children: [c.jsxs("p", {
              className: `text-xs font-medium ${t ? "text-zinc-400" : "text-zinc-600"}`,
              children: [x("已上传图片 ("), h.length, ")"]
            }), c.jsx("div", {
              className: "grid grid-cols-3 gap-2",
              children: h.map((P, R) => c.jsxs("div", {
                className: `relative aspect-square rounded-lg overflow-hidden border ${t ? "border-white/30" : "border-zinc-200"}`,
                children: [c.jsx("img", {
                  src: P.url,
                  alt: x("图片 {0}", R + 1),
                  className: "w-full h-full object-cover"
                }), c.jsx("div", {
                  className: "absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center",
                  children: c.jsx("button", {
                    onClick: () => E(R),
                    className: "p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors",
                    children: c.jsx(Qo, {
                      size: 14
                    })
                  })
                }), c.jsx("div", {
                  className: "absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] bg-black/60 text-white",
                  children: R + 1
                })]
              }, R))
            })]
          }), c.jsxs("div", {
            className: `text-[10px] space-y-1 ${t ? "text-white/50" : "text-zinc-500"}`,
            children: [c.jsx("p", {
              children: x(d ? "图片将自动上传至图床（Cloudinary / OSS）" : "图片将自动上传到服务器")
            }), c.jsxs("p", {
              children: [x("确认后会在提示词中插入 "), "<<<image_1>>>", ", ", "<<<image_2>>>", x(" 等标记")]
            }), c.jsxs("p", {
              children: [x("图片、视频、主体总数不能超过 "), l, x(" 个")]
            })]
          })]
        }), c.jsxs("div", {
          className: `flex justify-end gap-2 p-3 pt-2 border-t ${t ? "border-white/30" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            onClick: r,
            className: `px-3 py-1.5 rounded text-xs transition-colors border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-transparent"}`,
            children: x("取消")
          }), c.jsxs("button", {
            onClick: M,
            disabled: h.length === 0,
            className: `px-4 py-1.5 rounded text-xs transition-colors border ${h.length === 0 ? t ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-600 text-zinc-400 cursor-not-allowed border-transparent" : t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-blue-600 hover:bg-blue-500 text-white border-transparent"}`,
            children: [x("确认 ("), h.length, ")"]
          })]
        })]
      })]
    });
  },
  cyo = Object.freeze(Object.defineProperty({
    __proto__: null,
    KlingImageUploadPanel: gvr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  dyo = () => {
    const e = g.useCallback(i => {
        var y, b, v, _;
        if (i.type !== "storyboard-node") throw new Error("节点类型错误");
        const o = ((y = i.settings) == null ? void 0 : y.shots) || [],
          s = w => w.image_urls && Array.isArray(w.image_urls) && w.image_urls.length > 0 ? w.image_urls : w.image_url && typeof w.image_url == "string" ? [w.image_url] : [],
          l = o.map((w, k) => {
            const A = s(w);
            return {
              shot_number: w.scene_index || k + 1,
              shot_size: w.shot_size || w.camera || "中景",
              description_zh: w.description_zh || w.description || "",
              description_en: w.description_en || "",
              prompt: w.prompt || "",
              image_url: A[0] || "",
              ...(A.length > 1 ? {
                image_urls: A
              } : {}),
              time_range: w.time_range || "",
              camera: w.camera || "",
              camera_angle: w.camera_angle || "",
              tags: w.tags || [],
              dialogue: w.dialogue || "",
              character: w.character || "",
              model: w.model || "sora-2",
              ratio: w.ratio || "16:9",
              duration: w.duration || "15s",
              resolution: w.resolution || "1080P"
            };
          }),
          d = ((b = i.settings) == null ? void 0 : b.layout_specification) || ((v = i.settings) != null && v.jsonData ? (() => {
            try {
              const w = JSON.parse(i.settings.jsonData);
              return w == null ? void 0 : w.layout_specification;
            } catch {
              return;
            }
          })() : void 0),
          u = {
            version: "1.0",
            projectTitle: ((_ = i.settings) == null ? void 0 : _.projectTitle) || "分镜表",
            exportedAt: new Date().toISOString(),
            total_shots: l.length,
            ...(d ? {
              layout_specification: d
            } : {}),
            shots: l
          };
        let h;
        try {
          h = JSON.stringify(u, null, 2);
        } catch (w) {
          if (w instanceof RangeError && w.message.includes("Invalid string length")) console.warn("数据过大，使用紧凑格式"), h = JSON.stringify(u);else throw w;
        }
        const p = new Blob([h], {
            type: "application/json"
          }),
          m = URL.createObjectURL(p),
          f = document.createElement("a");
        f.href = m, f.download = `${u.projectTitle}_${new Date().toISOString().slice(0, 10)}.json`, document.body.appendChild(f), f.click(), document.body.removeChild(f), URL.revokeObjectURL(m);
      }, []),
      t = g.useCallback(i => {
        var y;
        if (i.type !== "storyboard-node") throw new Error("节点类型错误");
        const o = ((y = i.settings) == null ? void 0 : y.shots) || [],
          s = ["镜号", "画面URL", "中文描述", "英文描述", "对白/旁白", "角色", "景别", "角度", "运镜", "时长", "提示词"],
          l = b => b.image_urls && Array.isArray(b.image_urls) && b.image_urls.length > 0 ? b.image_urls : b.image_url && typeof b.image_url == "string" ? [b.image_url] : [],
          d = o.map(b => {
            const v = l(b);
            return [String(b.scene_index || ""), v.length > 0 ? v.join("; ") : "", String(b.description_zh || b.description || ""), String(b.description_en || ""), String(b.dialogue || ""), String(b.character || ""), String(b.shot_size || ""), String(b.camera_angle || ""), String(b.camera || ""), String(b.duration || ""), String(b.prompt || "")];
          }),
          u = b => {
            const v = String(b);
            return v.includes(",") || v.includes('"') || v.includes(`
`) || v.includes("\r") ? `"${v.replace(/"/g, '""')}"` : v;
          },
          h = [s.join(","), ...d.map(b => b.map(v => u(v)).join(","))].join(`
`),
          p = new Blob(["\uFEFF" + h], {
            type: "text/csv;charset=utf-8;"
          }),
          m = URL.createObjectURL(p),
          f = document.createElement("a");
        return f.href = m, f.download = `CineScript-Storyboard-${new Date().toISOString().slice(0, 10)}.csv`, document.body.appendChild(f), f.click(), document.body.removeChild(f), URL.revokeObjectURL(m), !0;
      }, []),
      n = g.useCallback(async i => {
        var l, d;
        if (i.type !== "storyboard-node") throw new Error("节点类型错误");
        const o = ((l = i.settings) == null ? void 0 : l.shots) || [];
        if (o.length === 0) return alert(x("没有可导出的镜头")), !1;
        let s;
        try {
          window.jspdf ? s = window.jspdf.jsPDF : await new Promise((u, h) => {
            const p = document.createElement("script");
            p.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", p.onload = () => {
              s = window.jspdf.jsPDF, u();
            }, p.onerror = () => h(new Error("Failed to load jsPDF")), document.head.appendChild(p);
          });
        } catch (u) {
          return console.error("[Export] 加载jsPDF失败:", u), alert(x("加载PDF库失败，请检查网络连接")), !1;
        }
        try {
          const u = new s({
              orientation: "landscape",
              unit: "mm",
              format: "a4"
            }),
            h = (B, F, N, G = "#000000") => {
              const z = document.createElement("canvas"),
                V = z.getContext("2d");
              if (!V) return {
                dataUrl: "",
                width: 0,
                height: 0,
                lines: 0
              };
              V.font = `${F}px "Noto Sans SC", "Microsoft YaHei", "SimHei", "PingFang SC", "Hiragino Sans GB", sans-serif`, V.fillStyle = G, V.textBaseline = "top", V.textAlign = "left";
              const O = /[\u4e00-\u9fa5]/.test(B);
              if (N) {
                const L = B.split(""),
                  D = [];
                let U = "";
                for (let W = 0; W < L.length; W++) {
                  const Q = U + L[W];
                  V.measureText(Q).width > N && U.length > 0 ? (D.push(U), U = L[W]) : U = Q;
                }
                U.length > 0 && D.push(U);
                const H = F * 1.3,
                  Y = 2;
                let K = 0;
                return D.forEach(W => {
                  const Q = V.measureText(W).width;
                  Q > K && (K = Q);
                }), z.width = Math.ceil(K) + Y * 2, z.height = Math.ceil(D.length * H) + Y * 2, V.font = `${F}px "Noto Sans SC", "Microsoft YaHei", "SimHei", "PingFang SC", "Hiragino Sans GB", sans-serif`, V.fillStyle = G, V.textBaseline = "top", V.textAlign = "left", D.forEach((W, Q) => {
                  V.fillText(W, Y, Y + Q * H);
                }), {
                  dataUrl: z.toDataURL("image/png"),
                  width: z.width * .264583,
                  height: z.height * .264583,
                  lines: D.length
                };
              } else {
                const L = V.measureText(B),
                  D = 2;
                return z.width = Math.ceil(L.width) + D * 2, z.height = Math.ceil(F) + D * 2, V.font = `${F}px "Noto Sans SC", "Microsoft YaHei", "SimHei", "PingFang SC", "Hiragino Sans GB", sans-serif`, V.fillStyle = G, V.textBaseline = "top", V.textAlign = "left", V.fillText(B, D, D), {
                  dataUrl: z.toDataURL("image/png"),
                  width: z.width * .264583,
                  height: z.height * .264583,
                  lines: 1
                };
              }
            },
            p = u.internal.pageSize.getWidth(),
            m = u.internal.pageSize.getHeight(),
            f = 10,
            y = p - f * 2,
            b = m - f * 2,
            v = B => B.image_urls && Array.isArray(B.image_urls) && B.image_urls.length > 0 ? B.image_urls : B.image_url && typeof B.image_url == "string" ? [B.image_url] : [],
            _ = B => new Promise((F, N) => {
              if (B.startsWith("data:")) {
                const z = new Image();
                z.onload = () => {
                  F({
                    base64: B,
                    width: z.naturalWidth,
                    height: z.naturalHeight
                  });
                }, z.onerror = () => N(new Error("Base64图片解析失败")), z.src = B;
                return;
              }
              const G = new Image();
              G.crossOrigin = "anonymous", G.onload = () => {
                try {
                  const z = document.createElement("canvas");
                  z.width = G.naturalWidth, z.height = G.naturalHeight;
                  const V = z.getContext("2d");
                  if (!V) {
                    N(new Error("无法创建canvas上下文"));
                    return;
                  }
                  V.drawImage(G, 0, 0);
                  const O = z.toDataURL("image/jpeg", .8);
                  F({
                    base64: O,
                    width: G.naturalWidth,
                    height: G.naturalHeight
                  });
                } catch (z) {
                  N(z);
                }
              }, G.onerror = () => N(new Error("图片加载失败")), G.src = B;
            });
          let w = f;
          const k = 60,
            A = 50,
            S = 35,
            C = f + A + 8,
            I = ((d = i.settings) == null ? void 0 : d.projectTitle) || "分镜表",
            E = h(I, 18, void 0, "#000000");
          E.dataUrl && u.addImage(E.dataUrl, "PNG", f, w, E.width, E.height), w += 10;
          const M = `导出时间: ${new Date().toLocaleString("zh-CN")}`,
            T = `镜头总数: ${o.length}`,
            P = h(M, 10, void 0, "#666666"),
            R = h(T, 10, void 0, "#666666");
          P.dataUrl && u.addImage(P.dataUrl, "PNG", f, w, P.width, P.height), R.dataUrl && u.addImage(R.dataUrl, "PNG", p - f - R.width, w, R.width, R.height), w += 12;
          for (let B = 0; B < o.length; B++) {
            const F = o[B];
            w + k > m - f && (u.addPage(), w = f);
            const N = v(F),
              G = F.scene_index || B + 1,
              z = F.description_zh || F.description || "",
              V = F.description_en || "",
              O = F.prompt || "",
              L = F.camera || "",
              D = F.duration || "15s",
              U = F.model || "";
            u.setDrawColor(200, 200, 200), u.line(f, w - 2, p - f, w - 2);
            const H = `镜头 ${G}`,
              Y = h(H, 14, void 0, "#000000");
            if (Y.dataUrl && u.addImage(Y.dataUrl, "PNG", f, w + 5, Y.width, Y.height), N.length > 0) try {
              const Q = await _(N[0]),
                q = Q.width / Q.height;
              let ne = A,
                de = S;
              q > A / S ? de = A / q : ne = S * q, u.addImage(Q.base64, "JPEG", f, w + 8, ne, de), N.length > 1 && (u.setFontSize(8), u.setFillColor(0, 0, 0, .7), u.rect(f + ne - 15, w + 8, 15, 8, "F"), u.setTextColor(255, 255, 255), u.text(`+${N.length - 1}`, f + ne - 12, w + 8 + 6), u.setTextColor(0, 0, 0));
            } catch (Q) {
              console.warn(`[Export] 镜头 ${G} 图片加载失败:`, Q), u.setFillColor(240, 240, 240), u.rect(f, w + 8, A, S, "F"), u.setDrawColor(200, 200, 200), u.rect(f, w + 8, A, S, "S");
              const q = h("图片加载失败", 8, void 0, "#969696");
              q.dataUrl && u.addImage(q.dataUrl, "PNG", f + A / 2 - q.width / 2, w + 8 + S / 2 - q.height / 2, q.width, q.height);
            } else {
              u.setFillColor(240, 240, 240), u.rect(f, w + 8, A, S, "F"), u.setDrawColor(200, 200, 200), u.rect(f, w + 8, A, S, "S");
              const Q = h("无图片", 8, void 0, "#969696");
              Q.dataUrl && u.addImage(Q.dataUrl, "PNG", f + A / 2 - Q.width / 2, w + 8 + S / 2 - Q.height / 2, Q.width, Q.height);
            }
            let K = w + 10;
            if (z) {
              const Q = h(z, 11, y - A - 8, "#000000");
              Q.dataUrl && (u.addImage(Q.dataUrl, "PNG", C, K, Q.width, Q.height), K += Q.height + 3);
            }
            if (V) {
              const Q = h(V, 9, y - A - 8, "#646464");
              Q.dataUrl && (u.addImage(Q.dataUrl, "PNG", C, K, Q.width, Q.height), K += Q.height + 3);
            }
            const W = [U, L, D].filter(Boolean).join(" | ");
            if (W) {
              const Q = h(W, 8, y - A - 8, "#646464");
              Q.dataUrl && (u.addImage(Q.dataUrl, "PNG", C, K + 2, Q.width, Q.height), K += Q.height + 2);
            }
            if (O && K + 10 < m - f - 10) {
              const Q = O.length > 200 ? O.substring(0, 200) + "..." : O,
                q = h(Q, 7, y - A - 8, "#505050");
              q.dataUrl && K + q.height < m - f - 10 && u.addImage(q.dataUrl, "PNG", C, K + 5, q.width, q.height);
            }
            w += k;
          }
          const j = `${I}_${new Date().toISOString().slice(0, 10)}.pdf`;
          return u.save(j), !0;
        } catch (u) {
          throw console.error("[Export] PDF导出失败:", u), u;
        }
      }, []),
      r = g.useCallback(async i => {
        var s, l, d, u;
        if (i.type !== "storyboard-node") throw new Error("节点类型错误");
        const o = ((s = i.settings) == null ? void 0 : s.shots) || [];
        if (o.length === 0) return alert(x("没有可导出的镜头")), !1;
        try {
          const h = k => k.image_urls && Array.isArray(k.image_urls) && k.image_urls.length > 0 ? k.image_urls : k.image_url && typeof k.image_url == "string" ? [k.image_url] : [],
            p = async k => {
              if (k.startsWith("data:")) return k;
              try {
                const S = await (await fetch(k)).blob();
                return new Promise((C, I) => {
                  const E = new FileReader();
                  E.onloadend = () => {
                    const M = E.result;
                    C(M);
                  }, E.onerror = I, E.readAsDataURL(S);
                });
              } catch (A) {
                return console.error("[Export] 图片转换失败:", A), k;
              }
            },
            m = await Promise.all(o.map(async (k, A) => {
              const S = h(k),
                C = await Promise.all(S.map(I => p(I)));
              return {
                shot_number: k.scene_index || A + 1,
                shot_size: k.shot_size || k.camera || "中景",
                description_zh: k.description_zh || k.description || "",
                description_en: k.description_en || "",
                prompt: k.prompt || "",
                image_url: C[0] || "",
                ...(C.length > 1 ? {
                  image_urls: C
                } : {}),
                time_range: k.time_range || "",
                camera: k.camera || "",
                camera_angle: k.camera_angle || "",
                tags: k.tags || [],
                dialogue: k.dialogue || "",
                character: k.character || "",
                model: k.model || "sora-2",
                ratio: k.ratio || "16:9",
                duration: k.duration || "15s",
                resolution: k.resolution || "1080P"
              };
            })),
            f = ((l = i.settings) == null ? void 0 : l.layout_specification) || ((d = i.settings) != null && d.jsonData ? (() => {
              try {
                const k = JSON.parse(i.settings.jsonData);
                return k == null ? void 0 : k.layout_specification;
              } catch {
                return;
              }
            })() : void 0),
            y = {
              version: "2.0",
              projectTitle: ((u = i.settings) == null ? void 0 : u.projectTitle) || "分镜表",
              exportedAt: new Date().toISOString(),
              total_shots: m.length,
              ...(f ? {
                layout_specification: f
              } : {}),
              shots: m
            };
          let b;
          try {
            b = JSON.stringify(y, null, 2);
          } catch (k) {
            if (k instanceof RangeError && k.message.includes("Invalid string length")) console.warn("数据过大，使用紧凑格式"), b = JSON.stringify(y);else throw k;
          }
          const v = new Blob([b], {
              type: "application/json"
            }),
            _ = URL.createObjectURL(v),
            w = document.createElement("a");
          return w.href = _, w.download = `${y.projectTitle}_完整版_${new Date().toISOString().slice(0, 10)}.json`, document.body.appendChild(w), w.click(), document.body.removeChild(w), URL.revokeObjectURL(_), !0;
        } catch (h) {
          throw console.error("[Export] 文件导出失败:", h), h;
        }
      }, []),
      a = g.useCallback(async i => {
        try {
          const o = await i.text(),
            s = JSON.parse(o);
          if (!s.shots || !Array.isArray(s.shots)) throw new Error("无效的分镜表文件格式");
          const l = async u => {
            if (!u || typeof u != "string") return "";
            if (!u.startsWith("data:")) return u;
            try {
              if (!u.includes(",")) return console.warn("[Import] 无效的 Base64 格式，缺少逗号分隔符"), u;
              const h = await fetch(u);
              if (!h.ok) throw new Error(`HTTP ${h.status}: ${h.statusText}`);
              const p = await h.blob();
              if (!p || p.size === 0) throw new Error("Blob 为空或无效");
              return URL.createObjectURL(p);
            } catch (h) {
              return console.error("[Import] Base64转换失败:", h, "Base64长度:", u.length), u;
            }
          };
          return await Promise.all(s.shots.map(async (u, h) => {
            const p = u.image_urls || (u.image_url ? [u.image_url] : []),
              m = await Promise.all(p.map(f => l(f)));
            return {
              id: `imported-${Date.now()}-${h}-${Math.random().toString(36).substr(2, 9)}`,
              scene_index: u.shot_number || h + 1,
              description_zh: u.description_zh || "",
              description_en: u.description_en || "",
              prompt: u.prompt || "",
              image_url: m[0] || "",
              ...(m.length > 1 ? {
                image_urls: m
              } : {}),
              time_range: u.time_range || "",
              camera: u.camera || "",
              camera_angle: u.camera_angle || "",
              tags: u.tags || [],
              dialogue: u.dialogue || "",
              character: u.character || "",
              model: u.model || "sora-2",
              ratio: u.ratio || "16:9",
              duration: u.duration || "15s",
              resolution: u.resolution || "1080P",
              shot_size: u.shot_size || "",
              status: "draft"
            };
          }));
        } catch (o) {
          throw console.error("[Import] 文件导入失败:", o), o;
        }
      }, []);
    return {
      exportStoryboardJSON: e,
      exportStoryboardCSV: t,
      exportStoryboardPDF: n,
      exportStoryboardFile: r,
      importStoryboardFile: a
    };
  };

function zct(e) {
  const t = e.provider ? Yh(e.provider) : e.modelName || e.id;
  return J7(cT(t, PS(e)), e);
}

function yvr({
  scopeId: e,
  value: t,
  models: n,
  isDark: r,
  activeDropdown: a,
  setActiveDropdown: i,
  onSelect: o,
  dropdownType: s = "video-model",
  disabled: l = !1,
  className: d = "",
  menuPlacement: u = "auto",
  menuZIndex: h,
  isModelHiddenInList: p
}) {
  on();
  const m = xVn(h),
    f = (a == null ? void 0 : a.nodeId) === e && a.type === s,
    {
      visibleModels: y,
      selectedChannel: b,
      onSelectChannel: v,
      menuWidth: _,
      showHaiyiChannel: w
    } = zZ(n),
    k = n.find(P => P.id === t) ?? y.find(P => P.id === t),
    A = g.useRef(null),
    S = g.useRef(null),
    C = g.useRef("below"),
    I = g.useRef(192),
    E = g.useCallback(() => {
      const P = A.current;
      if (!P || typeof window > "u") return;
      const R = P.getBoundingClientRect(),
        j = 4,
        B = 8,
        F = Math.max(y.length, 1) * 34 + 72,
        N = window.innerHeight - R.bottom - j - B,
        G = R.top - j - B;
      C.current = u === "below" || N >= F || N >= G ? "below" : "above", I.current = Math.max(R.width, _);
    }, [y.length, u, _]),
    M = g.useCallback(() => {
      const P = A.current,
        R = S.current;
      if (!P || !R || typeof window > "u") return;
      const j = P.getBoundingClientRect(),
        B = 4,
        F = 8,
        N = C.current === "below";
      R.style.position = "fixed", R.style.left = `${j.left}px`, R.style.minWidth = `${I.current}px`, R.style.maxWidth = "calc(100vw - 16px)", R.style.zIndex = String(m), R.style.visibility = "visible";
      const G = Math.max(N ? window.innerHeight - j.bottom - B - F : j.top - B - F, 120),
        z = Math.min(G, 420);
      R.style.maxHeight = `${z}px`, R.style.height = n.length > 0 ? `${z}px` : "", N ? (R.style.top = `${j.bottom + B}px`, R.style.bottom = "") : (R.style.top = "", R.style.bottom = `${window.innerHeight - j.top + B}px`);
    }, [n.length, m]);
  g.useLayoutEffect(() => {
    if (!f) return;
    E(), M(), P3(S.current);
    let P = 0;
    const R = () => {
      M(), P = requestAnimationFrame(R);
    };
    return P = requestAnimationFrame(R), () => cancelAnimationFrame(P);
  }, [f, E, M, t, y.length]), g.useEffect(() => {
    if (!f) return;
    const P = R => {
      const j = R.target;
      j && (j.closest(".node-dropdown-menu") || j.closest(".node-dropdown-button") || j.closest("[data-model-select-area]") || i(null));
    };
    return window.addEventListener("pointerdown", P, !0), () => window.removeEventListener("pointerdown", P, !0);
  }, [f, i]);
  const T = f ? c.jsx("div", {
    ref: S,
    className: `node-dropdown-menu text-node-chat-model-menu rounded-xl shadow-xl p-1.5 border overflow-hidden flex flex-col scrollbar-hide ${r ? "border-zinc-700" : "border-zinc-200"}`,
    style: {
      position: "fixed",
      visibility: "hidden",
      zIndex: m,
      backgroundColor: r ? "#1f1f1f" : "#ffffff"
    },
    onMouseDown: P => P.stopPropagation(),
    onWheel: P => P.stopPropagation(),
    children: n.length === 0 ? c.jsx("div", {
      className: `px-2 py-1.5 text-xs rounded-lg whitespace-nowrap ${r ? "text-zinc-500" : "text-zinc-400"}`,
      children: x("请先在模型配置中添加 Video 模型")
    }) : c.jsxs(c.Fragment, {
      children: [c.jsx("div", {
        className: "shrink-0",
        children: c.jsx(m9, {
          isDark: r,
          selected: b,
          onSelect: v,
          showHaiyi: w
        })
      }), c.jsx("div", {
        "data-dropdown-list-scroll": !0,
        "data-scrollable": "true",
        className: "min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-hide",
        children: y.length === 0 ? c.jsx("div", {
          className: `px-2 py-3 text-center text-[11px] ${r ? "text-zinc-500" : "text-zinc-400"}`,
          children: x("当前渠道下没有模型")
        }) : y.map(P => c.jsxs("button", {
          type: "button",
          ...(t === P.id ? {
            [Md]: "true"
          } : {}),
          [qk]: P.id,
          onClick: R => {
            R.stopPropagation(), o(P.id), i(null);
          },
          className: `w-full flex items-center gap-1.5 px-2 py-[7px] rounded-lg text-left text-xs transition-colors ${r ? "hover:bg-white/[0.06] text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${t === P.id ? r ? "bg-white/[0.08] text-white" : "bg-zinc-100 text-zinc-900" : ""}`,
          children: [c.jsx(Mp, {
            modelId: P.id,
            kind: "video",
            isDark: r,
            config: P,
            isHidden: p == null ? void 0 : p(P.id),
            size: 14
          }), c.jsxs("span", {
            className: `min-w-0 font-medium ${PS(P) === "custom" ? "whitespace-normal break-all" : "whitespace-nowrap"}`,
            title: P.modelName || P.provider,
            children: [zct(P), PS(P) === "custom" && P.modelName && P.modelName !== P.provider && c.jsx("span", {
              className: "block text-[10px] opacity-55",
              children: P.modelName
            })]
          })]
        }, P.id))
      })]
    })
  }) : null;
  return c.jsxs("div", {
    className: `relative overflow-visible shrink-0 ${d}`,
    "data-model-select-area": !0,
    children: [c.jsxs("button", {
      ref: A,
      type: "button",
      disabled: l,
      title: k ? zct(k) : void 0,
      onClick: P => {
        P.preventDefault(), P.stopPropagation(), !l && i(f ? null : {
          nodeId: e,
          type: s
        });
      },
      onMouseDown: P => {
        P.preventDefault(), P.stopPropagation();
      },
      className: `node-dropdown-button w-full min-w-0 flex items-center justify-between gap-1 px-2 py-1 text-xs rounded border outline-none transition-colors text-node-chat-select ${l ? r ? "opacity-50 cursor-not-allowed bg-transparent text-white/50 border-white/20" : "opacity-50 cursor-not-allowed bg-zinc-100 text-zinc-400 border-zinc-200" : r ? "bg-transparent hover:bg-white/5 text-white border-white/30 cursor-pointer" : "bg-white border-zinc-300 text-zinc-800 cursor-pointer"}`,
      children: [c.jsxs("span", {
        className: "flex min-w-0 flex-1 items-center gap-1.5 text-left",
        children: [k ? c.jsx(Mp, {
          modelId: k.id,
          kind: "video",
          isDark: r,
          config: k,
          isHidden: p == null ? void 0 : p(k.id),
          size: 13
        }) : null, c.jsx("span", {
          className: "truncate min-w-0",
          children: n.length === 0 ? x("请添加 Video 模型") : J7(zct(k || n[0]), k || n[0], !0)
        })]
      }), c.jsx(Mi, {
        size: 14,
        className: `shrink-0 opacity-70 transition-transform ${f ? "rotate-180" : ""}`
      })]
    }), T && typeof document < "u" ? Da.createPortal(T, document.body) : null]
  });
}

function uyo({
  currentModel: e,
  scopeId: t,
  isDark: n,
  activeDropdown: r,
  setActiveDropdown: a,
  resolution: i,
  seedanceVolcGenerateAudio: o,
  seedanceVolcIsUploadAsset: s,
  seedanceVolcNsfw: l,
  seedanceVolcMcpWebSearch: d,
  seedanceVolcCameraFixed: u,
  seedanceOutputFormat: h,
  onPatch: p
}) {
  on();
  const m = GS(e),
    f = g.useMemo(() => m ? rl(e) : [], [e, m]),
    y = f.includes(i) ? i : f[0] || "480p",
    b = g.useMemo(() => f.map(A => ({
      value: A,
      label: A
    })), [f]),
    v = g.useMemo(() => [{
      value: "true",
      label: "有声"
    }, {
      value: "false",
      label: "无声"
    }], []),
    _ = g.useMemo(() => [{
      value: "true",
      label: "固定镜头"
    }, {
      value: "false",
      label: "自由镜头"
    }], []),
    w = g.useMemo(() => [{
      value: "mp4",
      label: "mp4"
    }, {
      value: "mov",
      label: "mov"
    }], []),
    k = Ip(e) ? "huya-seedance20-res" : Ih(e) ? "huya-seedance25-res" : "huya-seedance1510-res";
  if (!m) return null;
  if (Ih(e)) {
    const A = o !== !1,
      S = String(h || "mp4").toLowerCase() === "mov" ? "mov" : "mp4",
      C = s !== !1,
      I = !!d,
      E = `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`;
    return c.jsxs(c.Fragment, {
      children: [c.jsx(qs, {
        scopeId: t,
        dropdownType: k,
        value: y,
        options: b,
        isDark: n,
        activeDropdown: r,
        setActiveDropdown: a,
        onSelect: M => p({
          resolution: M
        }),
        minMenuWidth: 110,
        className: "w-[5.5rem] shrink-0"
      }), c.jsx(qs, {
        scopeId: t,
        dropdownType: "huya-seedance25-audio",
        value: A ? "true" : "false",
        options: v,
        isDark: n,
        activeDropdown: r,
        setActiveDropdown: a,
        onSelect: M => p({
          seedanceVolcGenerateAudio: M === "true"
        }),
        minMenuWidth: 72,
        className: "w-[3.5rem] shrink-0"
      }), c.jsx(qs, {
        scopeId: t,
        dropdownType: "huya-seedance25-format",
        value: S,
        options: w,
        isDark: n,
        activeDropdown: r,
        setActiveDropdown: a,
        onSelect: M => p({
          seedanceOutputFormat: M
        }),
        minMenuWidth: 64,
        className: "w-[3.25rem] shrink-0"
      }), c.jsxs("label", {
        className: E,
        title: x("图生视频含真人脸时建议开启（isUploadAsset:true）"),
        onMouseDown: M => M.stopPropagation(),
        onClick: M => M.stopPropagation(),
        children: [c.jsx("input", {
          type: "checkbox",
          checked: C,
          onChange: M => p({
            seedanceVolcIsUploadAsset: M.target.checked
          }),
          className: "h-3 w-3 cursor-pointer"
        }), c.jsx("span", {
          className: "whitespace-nowrap",
          children: x("真人素材")
        })]
      }), c.jsxs("label", {
        className: E,
        title: "mcpList: web_search",
        onMouseDown: M => M.stopPropagation(),
        onClick: M => M.stopPropagation(),
        children: [c.jsx("input", {
          type: "checkbox",
          checked: I,
          onChange: M => p({
            seedanceVolcMcpWebSearch: M.target.checked
          }),
          className: "h-3 w-3 cursor-pointer"
        }), c.jsx("span", {
          className: "whitespace-nowrap",
          children: x("联网")
        })]
      })]
    });
  }
  if (Ip(e)) {
    const A = !!o,
      S = !!s,
      C = !!l,
      I = !!d,
      E = Y5e(e),
      M = `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`,
      T = (() => {
        const R = String(i || ""),
          j = R.toLowerCase().replace(/→/g, "_to_").replace(/\s+/g, "");
        return R.includes("1080") && R.includes("低价") || j.includes("720p_to_1080") ? "1080P（低价版）" : R.includes("低价") || j.includes("480p_to_720") ? "720P（低价版）" : j === "480p" ? "480P" : j === "720p" ? "720P" : j === "1080p" ? "1080P" : R;
      })(),
      P = f.includes(T) ? T : f.includes("720P（低价版）") ? "720P（低价版）" : y;
    return c.jsxs(c.Fragment, {
      children: [c.jsx(qs, {
        scopeId: t,
        dropdownType: k,
        value: P,
        options: b,
        isDark: n,
        activeDropdown: r,
        setActiveDropdown: a,
        onSelect: R => p({
          resolution: R
        }),
        minMenuWidth: 110,
        className: "w-[5.5rem] shrink-0"
      }), c.jsx(qs, {
        scopeId: t,
        dropdownType: "huya-seedance20-audio",
        value: A ? "true" : "false",
        options: v,
        isDark: n,
        activeDropdown: r,
        setActiveDropdown: a,
        onSelect: R => p({
          seedanceVolcGenerateAudio: R === "true"
        }),
        minMenuWidth: 72,
        className: "w-[3.5rem] shrink-0"
      }), c.jsxs("label", {
        className: M,
        title: x("parameters.nsfw：开启后允许 NSFW 内容（费用增加）"),
        onMouseDown: R => R.stopPropagation(),
        onClick: R => R.stopPropagation(),
        children: [c.jsx("input", {
          type: "checkbox",
          checked: C,
          onChange: R => p({
            seedanceVolcNsfw: R.target.checked
          }),
          className: "h-3 w-3 cursor-pointer"
        }), c.jsx("span", {
          className: "whitespace-nowrap",
          children: "NSFW"
        })]
      }), c.jsxs("label", {
        className: M,
        title: x("图生视频含真人脸时建议开启（isUploadAsset:true，走肖像审核）"),
        onMouseDown: R => R.stopPropagation(),
        onClick: R => R.stopPropagation(),
        children: [c.jsx("input", {
          type: "checkbox",
          checked: S,
          onChange: R => p({
            seedanceVolcIsUploadAsset: R.target.checked
          }),
          className: "h-3 w-3 cursor-pointer"
        }), c.jsx("span", {
          className: "whitespace-nowrap",
          children: x("真人素材")
        })]
      }), c.jsxs("label", {
        className: M,
        title: x(E ? "mcpList: web_search（Pro 文生/图生均支持）" : "mcpList: web_search（Fast 仅图生视频生效）"),
        onMouseDown: R => R.stopPropagation(),
        onClick: R => R.stopPropagation(),
        children: [c.jsx("input", {
          type: "checkbox",
          checked: I,
          onChange: R => p({
            seedanceVolcMcpWebSearch: R.target.checked
          }),
          className: "h-3 w-3 cursor-pointer"
        }), c.jsx("span", {
          className: "whitespace-nowrap",
          children: x("联网")
        })]
      })]
    });
  }
  if (CT(e)) {
    const A = e === "seedance-1-5-pro-huya-volc",
      S = o !== !1,
      C = !!u;
    return c.jsxs(c.Fragment, {
      children: [c.jsx(qs, {
        scopeId: t,
        dropdownType: k,
        value: y,
        options: b,
        isDark: n,
        activeDropdown: r,
        setActiveDropdown: a,
        onSelect: I => p({
          resolution: I
        }),
        minMenuWidth: 72,
        className: "w-[3.5rem] shrink-0"
      }), A && c.jsx(qs, {
        scopeId: t,
        dropdownType: "huya-seedance15-audio",
        value: S ? "true" : "false",
        options: v,
        isDark: n,
        activeDropdown: r,
        setActiveDropdown: a,
        onSelect: I => p({
          seedanceVolcGenerateAudio: I === "true"
        }),
        minMenuWidth: 72,
        className: "w-[3.5rem] shrink-0"
      }), c.jsx(qs, {
        scopeId: t,
        dropdownType: "huya-seedance1510-camera",
        value: C ? "true" : "false",
        options: _,
        isDark: n,
        activeDropdown: r,
        setActiveDropdown: a,
        onSelect: I => p({
          seedanceVolcCameraFixed: I === "true"
        }),
        minMenuWidth: 88,
        className: "w-[4.75rem] shrink-0"
      })]
    });
  }
  return null;
}

function XSt(e) {
  const t = rl(e),
    n = t[0] || "480p",
    r = Gj(e);
  if (Ih(e)) return {
    ratio: "Auto",
    resolution: t.includes("720P（低价版）") ? "720P（低价版）" : n,
    duration: r,
    seedanceVolcGenerateAudio: !0,
    seedanceVolcIsUploadAsset: !0,
    seedanceVolcMcpWebSearch: !1,
    seedanceOutputFormat: "mp4"
  };
  if (Ip(e)) return {
    ratio: "Auto",
    resolution: t.includes("720P（低价版）") ? "720P（低价版）" : n,
    duration: r,
    seedanceVolcGenerateAudio: !1,
    seedanceVolcIsUploadAsset: !0,
    seedanceVolcNsfw: !1,
    seedanceVolcMcpWebSearch: !1
  };
  if (e === "seedance-1-5-pro-huya-volc") return {
    ratio: "Auto",
    resolution: n,
    duration: r,
    seedanceVolcGenerateAudio: !0,
    seedanceVolcCameraFixed: !1
  };
  if (e === "seedance-1-0-pro-huya-volc") return {
    ratio: "16:9",
    resolution: n,
    duration: r,
    seedanceVolcCameraFixed: !1
  };
  if (ug(e)) {
    const a = ih(e);
    return {
      ratio: "16:9",
      duration: J5e(a.includes(String(r)) ? r : "5s"),
      resolution: t.includes("2K") ? "2K" : n
    };
  }
  if (I0(e)) return {
    ratio: "16:9",
    duration: r,
    resolution: t.includes("1080P") ? "1080P" : n,
    huyaWanAudio: !0,
    promptExtend: !1,
    huyaWanWatermark: !1,
    ...(X2(e) ? {
      wan30Prime: e === "wan-3.0-prime"
    } : {})
  };
  if (fg(e)) {
    const a = $j(e) ? void 0 : t[0] || (e === "kling-v2-6-huya" ? "pro" : "std");
    return {
      ratio: "16:9",
      duration: r,
      ...(a ? {
        resolution: a
      } : {}),
      ...(tIe(e) ? {
        huyaKlingSound: !1
      } : {})
    };
  }
  return {};
}

const bvr = ["seedanceVolcGenerateAudio", "seedanceVolcIsUploadAsset", "seedanceVolcNsfw", "seedanceVolcMcpWebSearch", "seedanceVolcCameraFixed", "seedanceOutputFormat"];

function hyo(e) {
  const t = {};
  for (const n of bvr) e[n] != null && (t[n] = e[n]);
  return t;
}

function pyo(e) {
  const t = e.model;
  if (!GS(t)) return {};
  const n = {};
  for (const r of bvr) e[r] != null && (n[r] = e[r]);
  return n;
}

function myo(e) {
  const t = String(e || "").trim();
  return t && (OIn(t) || t);
}

const c$t = ({
    storedUrl: e,
    alt: t,
    className: n,
    isDark: r,
    blobRecoveryAssetIds: a,
    onBlobRecovered: i,
    onDoubleClick: o,
    displayUrlOverride: s
  }) => {
    const l = (s == null ? void 0 : s.trim()) || "" || iLe(e) || e,
      d = ua() && nr(l),
      {
        content: u,
        isLoading: h,
        hasError: p
      } = Kp(l, {
        enabled: !d,
        useThumbnail: !0,
        preferConstantDisplay: !0,
        nodeType: "input-image",
        blobRecoveryAssetIds: a,
        onBlobUrlRecovered: i
      }),
      [m, f] = g.useState(null),
      [y, b] = g.useState(null),
      [v, _] = g.useState(null),
      w = g.useRef(new Set()),
      k = g.useRef(new Set());
    g.useEffect(() => {
      b(null), f(null), _(null);
    }, [e, s]);
    const A = d ? l : y ?? u ?? l;
    g.useEffect(() => {
      if (d || !A) return;
      const C = A;
      if (k.current.has(C) || w.current.has(C) || !(C.startsWith("blob:") || C.startsWith("data:image") && C.length > 1e5)) return;
      w.current.add(C);
      const E = C;
      Ix(E, 256).then(({
        url: M
      }) => {
        k.current.add(E), f(T => T === M ? T : M);
      }).catch(() => {
        w.current.delete(E);
      });
    }, [d, A]);
    const S = v || (d ? l : m || A);
    return !d && h ? c.jsx("div", {
      className: `flex min-h-[2rem] min-w-[2rem] items-center justify-center ${n ?? ""} ${r ? "bg-zinc-800/50" : "bg-zinc-200/50"}`,
      children: c.jsx(Ua, {
        size: 10,
        className: "animate-spin text-zinc-500"
      })
    }) : !d && (p || !S) ? c.jsx("div", {
      className: `flex min-h-[2rem] min-w-[2rem] items-center justify-center ${n ?? ""} ${r ? "bg-zinc-700" : "bg-zinc-300"}`,
      children: c.jsx("span", {
        className: "text-[8px] text-zinc-500",
        children: "!"
      })
    }) : c.jsx("img", {
      src: S,
      className: n,
      alt: t,
      ...Yg(!1),
      draggable: !1,
      onDoubleClick: o,
      onError: async () => {
        if (nr(l) && e && l !== e && !v) {
          _(iLe(e) || e);
          return;
        }
        if (!(a != null && a.length)) return;
        const C = y ?? u ?? l;
        if (!(C != null && C.startsWith("blob:"))) return;
        const I = await $He(C, a);
        I && (b(I), i == null || i(I));
      }
    });
  },
  fyo = ({
    node: e,
    isDark: t,
    apiConfigs: n,
    getConnectedVideoAnalyzeNode: r,
    importShotsFromAnalysis: a,
    updateShot: i,
    generateSingleShot: o,
    deleteShot: s,
    addEmptyShot: l,
    setLightboxItem: d,
    setLightboxOpen: u,
    nodes: h = [],
    connections: p = [],
    getConnectedInputImages: m,
    globalApiKey: f = "",
    dataVersion: y,
    generateFromScript: b,
    splitImageToShots: v,
    generateSequenceFromShot: _,
    updateNode: w,
    setNodes: k,
    setConnections: A,
    generateId: S,
    characterLibrary: C = [],
    klingSubjectLibrary: I = [],
    setKlingSubjectsOpen: E,
    onDownloadStoryboardVideos: M,
    isDownloading: T = !1,
    downloadProgress: P = {
      current: 0,
      total: 0
    },
    storyboardCanvasPickTarget: R = null,
    onStartStoryboardCanvasPick: j,
    materialLibraryTree: B = null,
    getMaterialLibraryPreviewUrl: F
  }) => {
    var Bt, wn;
    on();
    const N = ((Bt = e.settings) == null ? void 0 : Bt.shots) || [],
      G = g.useMemo(() => n.filter(at => at.type === "Video"), [n]),
      z = g.useMemo(() => uCe(B ?? null), [B]),
      V = g.useMemo(() => dCe(B ?? null, {
        kinds: ["image", "video"]
      }), [B]),
      [O, L] = g.useState({});
    g.useEffect(() => {
      if (!F || V.length === 0) {
        L({});
        return;
      }
      let at = !1;
      return (async () => {
        const Pt = {};
        await Promise.all(V.slice(0, 160).map(async dt => {
          try {
            const xt = await F(dt.materialAsset);
            xt && (Pt[dt.id] = xt);
          } catch {}
        })), at || L(Pt);
      })(), () => {
        at = !0;
      };
    }, [F, V]);
    const D = g.useMemo(() => V.map(at => ({
        id: at.id,
        name: at.name,
        category: at.category,
        thumbnailUrl: O[at.id] || "",
        materialAsset: at.materialAsset,
        canvasMediaKind: at.canvasMediaKind
      })), [V, O]),
      U = g.useMemo(() => {
        var Pt;
        const at = [];
        for (const dt of h) {
          if (dt.type === "input-image") {
            const xt = typeof dt.content == "string" ? dt.content.trim() : "",
              yn = (Pt = dt.settings) == null ? void 0 : Pt.imageUrl,
              gn = xt || (typeof yn == "string" ? yn.trim() : "");
            if (!gn) continue;
            at.push({
              id: `canvas-${dt.id}`,
              name: dt.nodeName || "画布图片",
              category: "从画布上选择",
              thumbnailUrl: gn,
              fromCanvas: !0,
              sourceCanvasNodeId: dt.id,
              canvasSourceNodeType: "input-image",
              canvasMediaKind: "image"
            });
            continue;
          }
          if (dt.type === "gen-image" || dt.type === "gen-video") {
            const xt = Xl(dt);
            if (!(xt != null && xt.url)) continue;
            const yn = dt.type === "gen-video" || Sh(xt.url);
            at.push({
              id: `canvas-${dt.id}`,
              name: dt.nodeName || (dt.type === "gen-video" ? "画布 AI 视频" : "画布 AI 绘画"),
              category: "从画布上选择",
              thumbnailUrl: xt.url,
              fromCanvas: !0,
              sourceCanvasNodeId: dt.id,
              canvasSourceNodeType: dt.type === "gen-image" ? "gen-image" : "gen-video",
              canvasMediaKind: yn ? "video" : "image"
            });
          }
        }
        return at;
      }, [h]),
      H = g.useMemo(() => [...U, ...D], [U, D]),
      Y = g.useCallback((at, Pt, dt) => {
        const xt = N.find(Gn => Gn.id === at);
        if (!xt || !Pt.trim()) return;
        let yn = [],
          gn = bUe(xt);
        xt.image_urls && Array.isArray(xt.image_urls) && xt.image_urls.length > 0 ? yn = xt.image_urls : xt.image_url && typeof xt.image_url == "string" && (yn = [xt.image_url]);
        const mt = $z(xt.model || void 0);
        if (yn.includes(Pt) || yn.length >= mt) return;
        const Xt = Hlr(yn, gn, Pt, dt, mt);
        i(e.id, at, Xt);
      }, [N, e.id, i]),
      K = g.useCallback(async (at, Pt) => {
        var mt, Xt;
        if (Pt.fromCanvas && Pt.sourceCanvasNodeId) {
          const Gn = h.find(Dn => Dn.id === Pt.sourceCanvasNodeId);
          let rr = Pt.thumbnailUrl || "",
            qn;
          if (Gn) if (Gn.type === "input-image") {
            const {
              resolveInputImageUrlForDownstream: Dn
            } = await Ie(async () => {
              const {
                resolveInputImageUrlForDownstream: Ar
              } = await Promise.resolve().then(() => ii);
              return {
                resolveInputImageUrlForDownstream: Ar
              };
            }, void 0, import.meta.url);
            rr = Dn(Gn) || rr, ua() ? qn = _f(Gn) || void 0 : qn = (typeof Gn.content == "string" ? Gn.content.trim() : "") || (typeof ((mt = Gn.settings) == null ? void 0 : mt.imageUrl) == "string" ? String(Gn.settings.imageUrl).trim() : "") || rr;
          } else (Gn.type === "gen-image" || Gn.type === "gen-video") && (rr = ((Xt = Xl(Gn)) == null ? void 0 : Xt.url) || rr, ua() && (qn = Bm(Gn) || void 0));
          rr && Y(at, rr, qn);
          return;
        }
        const dt = Pt.materialAsset;
        if (!dt) return;
        const {
            resolveMaterialLibraryAssetForCanvas: xt
          } = await Ie(async () => {
            const {
              resolveMaterialLibraryAssetForCanvas: Gn
            } = await Promise.resolve().then(() => U1);
            return {
              resolveMaterialLibraryAssetForCanvas: Gn
            };
          }, void 0, import.meta.url),
          yn = await xt(dt);
        let gn = (yn == null ? void 0 : yn.content) || Pt.thumbnailUrl || "";
        !gn && F && (gn = (await F(dt)) || ""), gn && Y(at, gn);
      }, [h, F, Y]),
      W = g.useRef(null),
      [Q, q] = g.useState("list"),
      [ne, de] = g.useState(null);
    dyo();
    const [le, J] = g.useState(new Set()),
      [pe, ce] = g.useState(!1),
      [we, X] = g.useState({
        from: "",
        to: ""
      }),
      [Z, re] = g.useState(!1),
      [fe, ye] = g.useState(!1),
      [ie, ae] = g.useState(""),
      [be, Ee] = g.useState(!1),
      [xe, he] = g.useState(""),
      [ue, ge] = g.useState(""),
      [_e, ke] = g.useState(""),
      [ve, Te] = g.useState(""),
      [Ne, me] = g.useState(!1),
      [Ae, Fe] = g.useState(!1),
      [Me, Re] = g.useState(!1),
      [$e, rt] = g.useState(!1),
      [nt, ze] = g.useState(null),
      [Le, Ke] = g.useState(""),
      [Xe, De] = g.useState(4),
      [Ye, Ce] = g.useState(!1),
      [He, Ve] = g.useState(null),
      [it, It] = g.useState(null),
      [Ft, We] = g.useState(null),
      [Ze, Ge] = g.useState(null),
      [Oe, st] = g.useState(!1),
      [vt, Ht] = g.useState(null);
    g.useMemo(() => {
      const at = n.filter(Pt => Pt.type === "Chat");
      return at.length > 0 ? at[0].modelName || at[0].id : "gemini-3-pro-preview";
    }, [n]);
    const [nn, pt] = g.useState(() => {
        const at = n.filter(Pt => Pt.type === "Chat");
        return at.length > 0 ? at[0].modelName || at[0].id : "gemini-3-pro-preview";
      }),
      [lt, gt] = g.useState("original"),
      [Ut, _t] = g.useState(10),
      [At, Yt] = g.useState(!1),
      [qe, kt] = g.useState(null);
    g.useEffect(() => {
      var Pt;
      const at = (Pt = e.settings) == null ? void 0 : Pt.jsonData;
      at && kt(at);
    }, [(wn = e.settings) == null ? void 0 : wn.jsonData]);
    const St = g.useMemo(() => xe && ve ? ih(xe, ve) : ["5s", "10s", "15s", "30s", "60s"], [xe, ve]),
      hn = g.useMemo(() => xe ? rl(xe) : ["720P", "1080P", "4K"], [xe]),
      Qt = g.useMemo(() => xe ? Vj(xe) || pX(xe) || GS(xe) || I0(xe) ? ah(xe) : ["16:9", "9:16", "1:1", "4:3", "3:4"] : ["16:9", "9:16", "1:1", "4:3", "3:4"], [xe]),
      Ot = g.useCallback(() => {
        if (!w || !xe || !ue || !_e || !ve || N.length === 0) {
          Ee(!1);
          return;
        }
        const at = XSt(xe),
          Pt = GS(xe) ? hyo(at) : I0(xe) ? {
            ...(at.huyaWanAudio != null ? {
              huyaWanAudio: at.huyaWanAudio
            } : {}),
            ...(at.promptExtend != null ? {
              promptExtend: at.promptExtend
            } : {}),
            ...(at.huyaWanWatermark != null ? {
              huyaWanWatermark: at.huyaWanWatermark
            } : {})
          } : {},
          dt = N.map(xt => ({
            ...xt,
            model: xe,
            ratio: ue,
            duration: _e,
            resolution: ve,
            ...Pt
          }));
        w(e.id, {
          settings: {
            ...e.settings,
            shots: dt
          }
        }), Ee(!1);
      }, [xe, ue, _e, ve, N, e, w]),
      ln = g.useMemo(() => {
        if (!p || !h || p.length === 0) return null;
        const at = p.find(Pt => {
          if (Pt.to !== e.id) return !1;
          const dt = h.find(xt => xt.id === Pt.from);
          return dt && (dt.type === "text-node" || dt.type === "custom-agent" || dt.type === "novel-input");
        });
        return at && h.find(Pt => Pt.id === at.from) || null;
      }, [p, h, e.id, y]),
      Pn = g.useMemo(() => {
        if (!p || !h || p.length === 0) return null;
        const at = p.find(Pt => {
          if (Pt.to !== e.id) return !1;
          const dt = h.find(xt => xt.id === Pt.from);
          return dt && (dt.type === "input-image" || dt.type === "preview");
        });
        return at && h.find(Pt => Pt.id === at.from) || null;
      }, [p, h, e.id, y]),
      rn = g.useMemo(() => r ? r(e.id) : null, [r, e.id, y]),
      Yn = g.useCallback(async () => {
        var yn, gn;
        if (!ln || !b) return;
        const Pt = new Map(h.map(mt => [mt.id, mt])).get(ln.id) || ln;
        let dt = "";
        if (Pt.type === "custom-agent") dt = (((yn = Pt.settings) == null ? void 0 : yn.outputContent) || "").trim();else {
          const mt = ((gn = Pt.settings) == null ? void 0 : gn.text) || "",
            Xt = Pt.prompt || "",
            Gn = Pt.content || "";
          dt = (mt || Xt || Gn).trim();
        }
        if (!dt) {
          alert(x("连接的文本节点没有内容"));
          return;
        }
        Fe(!0);
        let xt = null;
        if (lt !== "original") if (lt === "custom") {
          const mt = Ut,
            Xt = Math.ceil(Math.sqrt(mt));
          xt = {
            rows: Math.ceil(mt / Xt),
            cols: Xt
          };
        } else {
          const [mt, Xt] = lt.split("x").map(Number);
          xt = {
            rows: mt,
            cols: Xt
          };
        }
        Fe(!0);
        try {
          const mt = await b(e.id, dt, xt, nn);
          mt && typeof mt == "object" && (kt(JSON.stringify(mt, null, 2)), Yt(!1));
        } catch (mt) {
          console.error("[Storyboard] 从文本生成失败:", mt), kt(null);
          const Xt = mt instanceof Error ? mt.message : "生成失败，请检查网络连接或稍后重试";
          alert(x("从文本生成分镜失败: {0}", Xt));
        } finally {
          Fe(!1);
        }
      }, [ln, b, e.id, h, lt, Ut, nn]),
      Ct = g.useCallback(async () => {
        var yn;
        if (!Pn || !v) return;
        const Pt = new Map(h.map(gn => [gn.id, gn])).get(Pn.id) || Pn;
        let dt = "";
        if (Pt.type === "preview" ? dt = Pt.selectedPreviewImage || ((yn = Pt.previewMjImages) == null ? void 0 : yn[0]) || Pt.content || "" : dt = Pt.content || "", !dt) {
          alert(x("连接的图片节点没有图片"));
          return;
        }
        let xt;
        if (lt === "custom") {
          const gn = Ut,
            mt = Math.ceil(Math.sqrt(gn));
          xt = {
            rows: Math.ceil(gn / mt),
            cols: mt
          };
        } else if (lt === "original") xt = {
          rows: 3,
          cols: 3
        };else {
          const [gn, mt] = lt.split("x").map(Number);
          xt = {
            rows: gn,
            cols: mt
          };
        }
        Fe(!0);
        try {
          await v(e.id, dt, xt);
        } catch (gn) {
          console.error("[Storyboard] 图片拆解失败:", gn);
        } finally {
          Fe(!1);
        }
      }, [Pn, v, e.id, h, lt, Ut]),
      Cn = g.useCallback(() => {
        a(e.id);
      }, [a, e.id]),
      un = g.useCallback(at => {
        if (at) {
          const Pt = parseInt(at.from),
            dt = parseInt(at.to);
          if (isNaN(Pt) || isNaN(dt) || Pt < 1 || dt < Pt || dt > N.length) {
            alert(x("请输入有效的镜号范围"));
            return;
          }
          const xt = N.filter(yn => {
            const gn = yn.scene_index;
            return gn >= Pt && gn <= dt;
          });
          if (xt.length === 0) {
            alert(x("没有找到要删除的镜头"));
            return;
          }
          window.confirm(x("确定要删除镜号 {0} 到 {1} 的 {2} 个镜头吗？", Pt, dt, xt.length)) && (xt.forEach(yn => s(e.id, yn.id)), X({
            from: "",
            to: ""
          }));
        } else {
          if (le.size === 0) {
            alert(x("请先选择要删除的镜头"));
            return;
          }
          window.confirm(x("确定要删除选中的 {0} 个镜头吗？", le.size)) && (le.forEach(Pt => s(e.id, Pt)), J(new Set()));
        }
        ce(!1);
      }, [N, le, s, e.id]),
      Jn = g.useCallback(async at => {
        const Pt = at ? N.filter(gn => at.has(gn.id) && gn.video_url) : N.filter(gn => gn.video_url);
        if (Pt.length === 0) {
          alert(x(at ? "选中的镜头中没有已生成的视频" : "当前分镜表没有已生成的视频"));
          return;
        }
        const dt = Pt.map((gn, mt) => {
          const Xt = gn.scene_index ?? mt + 1,
            Gn = String(gn.description || gn.prompt || "").replace(/[/\\?*:"<>|]/g, "_").slice(0, 40) || `镜头${Xt}`;
          return {
            url: gn.video_url,
            name: `分镜_${Xt}_${Gn}.mp4`
          };
        });
        if (M) {
          await M(dt);
          return;
        }
        re(!0);
        const xt = async gn => {
            if (gn.startsWith("blob:") || gn.startsWith("data:")) return (await fetch(gn)).blob();
            if (typeof window < "u" && "__TAURI__" in window) try {
              const {
                downloadWithFallback: Xt
              } = await Ie(async () => {
                const {
                  downloadWithFallback: Gn
                } = await Promise.resolve().then(() => El);
                return {
                  downloadWithFallback: Gn
                };
              }, void 0, import.meta.url);
              return await Xt(gn, 12e4);
            } catch {
              const Xt = await fetch(gn);
              if (!Xt.ok) throw new Error(`HTTP ${Xt.status}`);
              return Xt.blob();
            }
            const mt = await fetch(gn);
            if (!mt.ok) throw new Error(`HTTP ${mt.status}`);
            return mt.blob();
          },
          yn = (gn, mt) => {
            const Xt = URL.createObjectURL(gn),
              Gn = document.createElement("a");
            Gn.href = Xt, Gn.download = mt, Gn.style.display = "none", document.body.appendChild(Gn), Gn.click(), document.body.removeChild(Gn), URL.revokeObjectURL(Xt);
          };
        for (let gn = 0; gn < Pt.length; gn++) {
          const Xt = Pt[gn].video_url,
            Gn = dt[gn].name;
          try {
            const rr = await xt(Xt),
              qn = rr.type || "video/mp4",
              Dn = rr.type ? rr : new Blob([await rr.arrayBuffer()], {
                type: qn
              });
            yn(Dn, Gn);
          } catch (rr) {
            console.error("[Storyboard] 下载视频失败:", Xt, rr);
          }
          gn < Pt.length - 1 && (await new Promise(rr => setTimeout(rr, 400)));
        }
        re(!1);
      }, [N, M]),
      Kn = M ? T : Z,
      en = g.useCallback(() => {
        const at = ie.trim();
        at && (N.forEach(Pt => {
          const dt = Pt.prompt || "",
            xt = Pt.description_zh || "",
            yn = Pt.description || "",
            gn = Pt.description_en || "";
          i(e.id, Pt.id, {
            prompt: at + dt,
            description_zh: at + xt,
            description: at + yn,
            ...(gn ? {
              description_en: at + gn
            } : {})
          });
        }), ae(""), ye(!1));
      }, [ie, N, i, e.id]),
      Vn = g.useCallback(at => GCe(at), []),
      Tt = g.useCallback(() => {
        const at = dt => {
            var xt;
            return dt.status !== "generating" && (((xt = dt.prompt) == null ? void 0 : xt.trim()) || Vn(dt).length > 0);
          },
          Pt = N.filter(at);
        if (Pt.length === 0) {
          alert(x("当前没有可生成的镜头（请确保镜头有画面描述/提示词或至少一张参考图，且未在生成中）"));
          return;
        }
        Pt.forEach((dt, xt) => {
          setTimeout(() => {
            o(e.id, dt);
          }, xt * 400);
        });
      }, [N, Vn, o, e.id]),
      Ue = g.useCallback((at, Pt) => {
        if (!k || !S) return;
        const dt = e.nodeName || "分镜节点",
          xt = `_镜头${String(Pt + 1).padStart(2, "0")}`,
          yn = at.prompt || at.description || "",
          gn = at.model || "sora-2",
          mt = at.ratio || at.aspect_ratio || "16:9",
          Xt = at.duration || "15s",
          Gn = at.resolution || "1080P",
          rr = `${dt}${xt}`,
          qn = S(),
          Dn = !!at.enableFrames,
          Ar = {
            model: gn,
            ratio: mt,
            duration: Xt,
            resolution: Gn,
            ...pyo(at)
          };
        Dn && J2(gn) && (Ar.veoFramesMode = !0);
        const _r = 80,
          Pa = 260,
          fa = at.startFrame || "",
          Ca = at.endFrame || "",
          $n = Vn(at),
          Ir = J2(gn) && (Dn || $n.length >= 2),
          Gr = [];
        fa && Gr.push({
          url: fa,
          inputType: "veo_start",
          label: "首帧"
        }), Ca && Gr.push({
          url: Ca,
          inputType: "veo_end",
          label: "尾帧"
        }), $n.length > 0 && (fa || Ca ? $n[0] && Gr.unshift({
          url: $n[0],
          inputType: "default",
          label: "主图"
        }) : Ir && $n.length >= 2 ? $n.length === 2 ? (Gr.push({
          url: $n[0],
          inputType: "veo_start",
          label: "首帧"
        }), Gr.push({
          url: $n[1],
          inputType: "veo_end",
          label: "尾帧"
        })) : (Gr.push({
          url: $n[0],
          inputType: "default",
          label: "主图"
        }), Gr.push({
          url: $n[1],
          inputType: "veo_start",
          label: "首帧"
        }), Gr.push({
          url: $n[2],
          inputType: "veo_end",
          label: "尾帧"
        })) : $n.slice(0, $z(gn)).forEach((ba, ga) => Gr.push({
          url: ba,
          inputType: "default",
          label: ga === 0 ? "图" : `图${ga + 1}`
        })));
        const Zr = e.x + (e.width ?? 600) + _r,
          La = Gr.length * Pa + (Gr.length - 1) * _r,
          sa = Zr + (Gr.length > 0 ? La + _r : 0),
          Ea = Gr.map(ba => ({
            id: S(),
            inputType: ba.inputType
          }));
        if (k(ba => {
          const _a = [{
            ...Ki(qn, "gen-video", sa, e.y, rr, Ar, ba),
            prompt: yn
          }];
          return Gr.forEach(($a, Ya) => {
            const ta = Ki(Ea[Ya].id, "input-image", Zr + Ya * (Pa + _r), e.y, `${dt}${xt}_${$a.label}`, void 0, ba);
            _a.push({
              ...ta,
              content: $a.url
            });
          }), [...ba, ..._a];
        }), Gr.length > 0 && A) {
          const ba = Gr.map((ga, _a) => ({
            id: S(),
            from: Ea[_a].id,
            to: qn,
            inputType: Ea[_a].inputType === "default" ? void 0 : Ea[_a].inputType
          }));
          A(ga => [...ga, ...ba]);
        }
      }, [e.x, e.y, e.width, e.nodeName, k, A, S, Vn]),
      et = g.useCallback(at => {
        if (Vn(at).length === 0) return;
        if (!(at.prompt || at.description || "").trim()) {
          alert(x("镜头没有提示词，无法生成分镜序列"));
          return;
        }
        ze(at);
        const xt = n.filter(yn => yn.type === "Chat");
        xt.length > 0 && Ke(xt[0].modelName || xt[0].id), De(4), rt(!0);
      }, [n, d, u]),
      ft = g.useCallback(async () => {
        var Gn, rr, qn, Dn, Ar, _r, Pa;
        if (!nt || !k || !S) return;
        const at = nt.prompt || nt.description || "";
        if (!at.trim()) {
          alert(x("镜头没有提示词，无法生成分镜序列"));
          return;
        }
        const Pt = n.filter(fa => fa.type === "Chat");
        if (Pt.length === 0) {
          alert(x("请先配置 Chat API"));
          return;
        }
        const dt = Pt.find(fa => (fa.modelName || fa.id) === Le) || Pt[0],
          xt = dt.key || f;
        if (!xt) {
          alert(x("请先配置 API Key"));
          return;
        }
        const yn = (dt.url || "https://linyunai.net").replace(/\/+$/, "");
        Ce(!0), rt(!1);
        const gn = nt.id;
        gn && i(e.id, gn, {
          status: "generating",
          generatingProgress: 10
        });
        let mt = 10;
        const Xt = setInterval(() => {
          gn && (mt += 10, mt < 90 && i(e.id, gn, {
            generatingProgress: mt
          }));
        }, 500);
        try {
          const fa = `你是一个专业的AI绘画提示词生成专家。基于用户提供的分镜提示词，生成${Xe}个连贯的、适合AI绘画的提示词。

要求：
1. 每个提示词应该基于原始分镜提示词进行扩展和变化
2. ${Xe}个提示词应该保持视觉连贯性和故事性
3. 可以是同一场景的不同角度、不同景别，或者时间上的延续
4. 每个提示词要简洁、清晰、突出视觉重点
5. 使用英文，符合AI绘画模型的提示词格式

请以JSON格式返回，格式如下：
{
  "prompts": [
    "第一个AI绘画提示词",
    "第二个AI绘画提示词",
    ...
  ]
}`,
            Ca = await fetch(`${yn}/v1/chat/completions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${xt}`
              },
              body: JSON.stringify({
                model: dt.modelName || "gemini-3-pro-preview",
                messages: [{
                  role: "system",
                  content: fa
                }, {
                  role: "user",
                  content: `原始分镜提示词：
${at}

请基于此提示词生成${Xe}个连贯的AI绘画提示词。`
                }],
                max_tokens: 2e3,
                temperature: .7,
                stream: !1
              })
            });
          if (!Ca.ok) throw new Error(`API请求失败: ${Ca.status}`);
          const $n = await Ca.json(),
            Ir = (((qn = (rr = (Gn = $n.choices) == null ? void 0 : Gn[0]) == null ? void 0 : rr.message) == null ? void 0 : qn.content) || ((Pa = (_r = (Ar = (Dn = $n.data) == null ? void 0 : Dn.choices) == null ? void 0 : Ar[0]) == null ? void 0 : _r.message) == null ? void 0 : Pa.content) || $n.content || "").match(/\{[\s\S]*\}/);
          if (!Ir) throw new Error("未找到JSON格式的数据");
          const Zr = JSON.parse(Ir[0]).prompts || [];
          if (Zr.length !== Xe) throw new Error(`期望${Xe}个提示词，但得到${Zr.length}个`);
          const La = 360,
            sa = 340,
            Ea = 20,
            ba = e.x + e.width + 100,
            ga = e.y,
            _a = [];
          Zr.forEach(($a, Ya) => {
            const ta = Ki(S(), "gen-image", ba, ga + Ya * (sa + Ea), void 0, {
              model: "qwen-image-edit",
              ratio: "16:9",
              resolution: "1K",
              batchCount: 1
            }, [...h, ..._a]);
            ta.prompt = $a, _a.push(ta);
          }), k($a => [...$a, ..._a]), clearInterval(Xt), gn && (i(e.id, gn, {
            status: "draft",
            generatingProgress: 100
          }), setTimeout(() => {
            i(e.id, gn, {
              generatingProgress: 0
            });
          }, 1e3)), alert(x("成功创建 {0} 个AI绘画节点", _a.length));
        } catch (fa) {
          console.error("[Storyboard] 生成AI绘画节点失败:", fa);
          const Ca = fa instanceof Error ? fa.message : "生成失败";
          clearInterval(Xt), gn && i(e.id, gn, {
            status: "draft",
            generatingProgress: 0
          }), alert(x(SU(Ca)));
        } finally {
          Ce(!1), ze(null);
        }
      }, [nt, Le, Xe, e, n, f, k, S, i]),
      ht = g.useCallback(at => {
        et(at);
      }, [et]);
    g.useCallback(async at => {
      var Xt, Gn, rr, qn, Dn, Ar, _r;
      if (Vn(at).length === 0) return;
      if (!k || !S) {
        alert(x("创建节点功能不可用"));
        return;
      }
      const dt = at.prompt || at.description || "";
      if (!dt.trim()) {
        alert(x("镜头没有提示词，无法生成AI绘画节点"));
        return;
      }
      const xt = n.filter(Pa => Pa.type === "Chat");
      if (xt.length === 0) {
        alert(x("请先配置 Chat API"));
        return;
      }
      const yn = xt[0],
        gn = yn.key || f;
      if (!gn) {
        alert(x("请先配置 API Key"));
        return;
      }
      const mt = (yn.url || "https://linyunai.net").replace(/\/+$/, "");
      try {
        const fa = await fetch(`${mt}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gn}`
          },
          body: JSON.stringify({
            model: yn.modelName || "gemini-3-pro-preview",
            messages: [{
              role: "system",
              content: `你是一个专业的AI绘画提示词生成专家。基于用户提供的分镜提示词，生成4个连贯的、适合AI绘画的提示词。

要求：
1. 每个提示词应该基于原始分镜提示词进行扩展和变化
2. 4个提示词应该保持视觉连贯性和故事性
3. 可以是同一场景的不同角度、不同景别，或者时间上的延续
4. 每个提示词要简洁、清晰、突出视觉重点
5. 使用英文，符合AI绘画模型的提示词格式

请以JSON格式返回，格式如下：
{
  "prompts": [
    "第一个AI绘画提示词",
    "第二个AI绘画提示词",
    "第三个AI绘画提示词",
    "第四个AI绘画提示词"
  ]
}`
            }, {
              role: "user",
              content: `原始分镜提示词：
${dt}

请基于此提示词生成4个连贯的AI绘画提示词。`
            }],
            max_tokens: 2e3,
            temperature: .7,
            stream: !1
          })
        });
        if (!fa.ok) throw new Error(`API请求失败: ${fa.status}`);
        const Ca = await fa.json(),
          yr = (((rr = (Gn = (Xt = Ca.choices) == null ? void 0 : Xt[0]) == null ? void 0 : Gn.message) == null ? void 0 : rr.content) || ((_r = (Ar = (Dn = (qn = Ca.data) == null ? void 0 : qn.choices) == null ? void 0 : Dn[0]) == null ? void 0 : Ar.message) == null ? void 0 : _r.content) || Ca.content || "").match(/\{[\s\S]*\}/);
        if (!yr) throw new Error("未找到JSON格式的数据");
        const Gr = JSON.parse(yr[0]).prompts || [];
        if (Gr.length !== 4) throw new Error(`期望4个提示词，但得到${Gr.length}个`);
        const Zr = 360,
          La = 340,
          sa = 20,
          Ea = e.x + e.width + 100,
          ba = e.y,
          ga = [];
        Gr.forEach((_a, $a) => {
          const Ya = Ki(S(), "gen-image", Ea, ba + $a * (La + sa), void 0, {
            model: "qwen-image-edit",
            ratio: "16:9",
            resolution: "1K",
            batchCount: 1
          }, [...h, ...ga]);
          Ya.prompt = _a, ga.push(Ya);
        }), k(_a => [..._a, ...ga]), alert(x("成功创建 {0} 个AI绘画节点", ga.length));
      } catch (Pa) {
        console.error("[Storyboard] 生成AI绘画节点失败:", Pa);
        const fa = Pa instanceof Error ? Pa.message : "生成失败";
        alert(x(SU(fa)));
      }
    }, [e, n, f, k, S, d, u]);
    const wt = g.useCallback(() => {
        if (h.filter(Pt => Pt.type === "storyboard-node" && Pt.id !== e.id).length === 0) {
          alert(x("画布中没有其他分镜节点"));
          return;
        }
        Re(!0);
      }, [h, e]),
      jt = g.useCallback(at => {
        var Xt, Gn;
        if (!w || !S) {
          alert(x("更新功能不可用"));
          return;
        }
        const Pt = h.find(rr => rr.id === at);
        if (!Pt || Pt.type !== "storyboard-node") {
          alert(x("选中的节点无效"));
          return;
        }
        const dt = ((Xt = Pt.settings) == null ? void 0 : Xt.shots) || [];
        if (dt.length === 0) {
          alert(x("选中的分镜节点没有镜头")), Re(!1);
          return;
        }
        const xt = ((Gn = e.settings) == null ? void 0 : Gn.shots) || [];
        if (xt.length === 0) {
          const rr = dt.map((qn, Dn) => ({
            ...qn,
            id: S(),
            scene_index: Dn + 1
          }));
          w(e.id, {
            settings: {
              ...e.settings,
              shots: rr
            }
          }), Re(!1), alert(x("成功同步 {0} 个镜头到当前分镜表", dt.length));
          return;
        }
        const yn = xt.map((rr, qn) => {
          if (qn < dt.length) {
            const Dn = dt[qn],
              Ar = Ca => Ca.image_urls && Array.isArray(Ca.image_urls) && Ca.image_urls.length > 0 ? Ca.image_urls : Ca.image_url && typeof Ca.image_url == "string" ? [Ca.image_url] : [],
              _r = Ar(Dn),
              Pa = Ar(rr),
              fa = _r.length > 0 ? _r : Pa;
            return {
              ...rr,
              prompt: Dn.prompt || Dn.description || rr.prompt || "",
              description: Dn.description || Dn.prompt || rr.description || "",
              description_zh: Dn.description_zh || Dn.description || rr.description_zh || "",
              description_en: Dn.description_en || Dn.prompt || rr.description_en || "",
              image_url: fa[0] || "",
              image_urls: fa,
              camera: Dn.camera || rr.camera || "",
              tags: Dn.tags || rr.tags || [],
              model: Dn.model || rr.model || "sora-2",
              ratio: Dn.ratio || rr.ratio || "16:9",
              duration: Dn.duration || rr.duration || "15s",
              resolution: Dn.resolution || rr.resolution || "1080P"
            };
          } else return rr;
        });
        if (dt.length > xt.length) {
          const rr = dt.slice(xt.length).map((qn, Dn) => ({
            ...qn,
            id: S(),
            scene_index: xt.length + Dn + 1
          }));
          yn.push(...rr);
        }
        w(e.id, {
          settings: {
            ...e.settings,
            shots: yn
          }
        }), Re(!1);
        const gn = Math.min(xt.length, dt.length),
          mt = Math.max(0, dt.length - xt.length);
        mt > 0 ? alert(x("成功同步 {0} 个现有镜头，并添加 {1} 个新镜头", gn, mt)) : alert(x("成功同步 {0} 个现有镜头", gn));
      }, [h, e, w, S]);
    g.useEffect(() => {
      const at = W.current;
      if (!at) return;
      const Pt = xt => {
          var gn;
          const yn = (gn = xt.dataTransfer) == null ? void 0 : gn.getData("application/json");
          if (yn) try {
            const mt = JSON.parse(yn);
            if (mt.type === "history-item" && mt.item) {
              const Xt = mt.item;
              if (Xt.type === "image" && Xt.url) {
                xt.preventDefault(), xt.stopPropagation(), console.log("[StoryboardNode] 从历史记录拖拽图片到分镜表（原生事件）:", Xt);
                let rr = xt.target.closest("[data-shot-id]");
                if (rr) {
                  const qn = rr.getAttribute("data-shot-id");
                  if (console.log("[StoryboardNode] 拖拽到镜头上，shotId:", qn), qn && i) {
                    const Dn = N.find(Ar => Ar.id === qn);
                    if (Dn) {
                      const Pa = [...(Dn.image_urls || (Dn.image_url ? [Dn.image_url] : [])), Xt.url].slice(0, $z(Dn.model || void 0));
                      i(e.id, qn, {
                        image_urls: Pa,
                        image_url: Pa[0] || ""
                      }), console.log("[StoryboardNode] 已添加图片到镜头:", qn);
                    }
                  }
                } else {
                  console.log("[StoryboardNode] 拖拽到空白区域，创建新镜头");
                  const qn = {
                      id: (S == null ? void 0 : S()) || `shot-${Date.now()}`,
                      scene_index: N.length + 1,
                      shot_type: "Medium Shot",
                      camera_movement: "Static",
                      description: Xt.prompt || "从历史记录添加",
                      image_url: Xt.url,
                      image_urls: [Xt.url],
                      video_url: "",
                      status: "idle"
                    },
                    Dn = [...N, qn];
                  w && w(e.id, {
                    settings: {
                      ...e.settings,
                      shots: Dn
                    }
                  });
                }
              }
            }
          } catch (mt) {
            console.error("[StoryboardNode] 原生事件处理失败:", mt);
          }
        },
        dt = xt => {
          var gn;
          (((gn = xt.dataTransfer) == null ? void 0 : gn.types) || []).includes("application/json") && (xt.preventDefault(), xt.stopPropagation());
        };
      return at.addEventListener("drop", Pt, !0), at.addEventListener("dragover", dt, !0), () => {
        at.removeEventListener("drop", Pt, !0), at.removeEventListener("dragover", dt, !0);
      };
    }, [N, e, w, i, S]);
    const bt = !!(He || it || Ft);
    return c.jsxs("div", {
      className: `flex h-full w-full rounded-2xl overflow-hidden pointer-events-auto transition-colors storyboard-container ${t ? "bg-[#1f1f1f] border border-zinc-800" : "bg-white border border-zinc-300 shadow-sm"}`,
      children: [c.jsxs("div", {
        ref: W,
        className: "flex flex-col h-full min-w-0 flex-1 rounded-2xl overflow-hidden ",
        children: [c.jsxs("div", {
          className: `p-2 border-b flex items-center justify-between shrink-0 ${t ? "border-zinc-800" : "border-zinc-200"}`,
          children: [c.jsx("div", {
            className: "flex items-center gap-2",
            children: c.jsx("span", {
              className: `text-xs font-medium ${t ? "text-zinc-300" : "text-zinc-700"}`,
              children: x("分镜表")
            })
          }), c.jsxs("div", {
            className: "flex flex-wrap items-center justify-end gap-2",
            children: [N.length > 0 && c.jsxs("button", {
              type: "button",
              onClick: () => ye(!0),
              className: `px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${t ? "bg-transparent border-white/30 text-white hover:bg-white/5" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-300"}`,
              onMouseDown: at => at.stopPropagation(),
              title: x("在所有镜头的画面描述/提示词前批量添加相同前缀"),
              children: [c.jsx(_U, {
                size: 12
              }), x("批量添加前缀")]
            }), N.some(at => {
              var Pt;
              return at.status !== "generating" && (((Pt = at.prompt) == null ? void 0 : Pt.trim()) || Vn(at).length > 0);
            }) && c.jsxs("button", {
              type: "button",
              onClick: Tt,
              className: `px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${t ? "bg-transparent border-white/30 text-white hover:bg-white/5" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-300"}`,
              onMouseDown: at => at.stopPropagation(),
              title: x("一键启动所有可生成镜头（有提示词或参考图且未在生成中的镜头）"),
              children: [c.jsx(Ol, {
                size: 12,
                fill: "currentColor"
              }), x("一键生成")]
            }), N.length > 0 && c.jsxs("button", {
              type: "button",
              onClick: () => {
                const at = N[0] || {},
                  Pt = at.model || "sora-2",
                  dt = at.ratio || "16:9",
                  xt = at.duration || "15s",
                  yn = at.resolution || "1080P";
                he(Pt);
                const gn = Vj(Pt) || pX(Pt) ? ah(Pt) : ["16:9", "9:16", "1:1", "4:3", "3:4"],
                  mt = rl(Pt),
                  Xt = ih(Pt, yn);
                ge(gn.includes(dt) ? dt : gn[0]);
                const Gn = mt.includes(yn) ? yn : mt[0];
                Te(Gn), ke(Xt.includes(xt) ? xt : Xt[0]), Ee(!0);
              },
              className: `px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${t ? "bg-transparent border-white/30 text-white hover:bg-white/5" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-300"}`,
              onMouseDown: at => at.stopPropagation(),
              title: x("一键批量调整本分镜表中所有镜头的模型 / 比例 / 时长"),
              children: [c.jsx(Pj, {
                size: 12
              }), x("批量设置")]
            }), ...["csv", "json"].map(format => c.jsx("button", {
              type: "button",
              disabled: N.length === 0,
              "aria-label": format === "csv" ? "导出分镜 CSV" : "导出分镜 JSON",
              className: `px-2 py-1 rounded text-xs border ${t ? "border-white/30 text-white hover:bg-white/5" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
              onMouseDown: event => event.stopPropagation(),
              onClick: async () => {
                try {
                  const fields = ["scene_index", "description_zh", "description_en", "dialogue", "character", "shot_size", "camera_angle", "camera", "duration", "prompt", "image_url", "video_url"],
                    labels = ["镜号", "中文描述", "英文描述", "对白/旁白", "角色", "景别", "角度", "运镜", "时长", "提示词", "图片", "视频"],
                    shots = N.map((shot, index) => Object.fromEntries(fields.map(field => [field, field === "scene_index" ? shot.scene_index || index + 1 : field === "description_zh" ? shot.description_zh || shot.description || "" : field === "image_url" ? (Array.isArray(shot.image_urls) ? shot.image_urls.join("; ") : shot.image_url || "") : shot[field] || ""]))),
                    cell = value => /[,"\r\n]/.test(String(value)) ? '"' + String(value).replace(/"/g, '""') + '"' : String(value),
                    content = format === "csv" ? "\uFEFF" + [labels.map(cell).join(","), ...shots.map(shot => fields.map(field => cell(shot[field])).join(","))].join("\r\n") : JSON.stringify({version:"aiyouplus.storyboard.v1", projectTitle:e.settings?.projectTitle || e.nodeName || "分镜表", total_shots:shots.length, shots}, null, 2),
                    title = String(e.settings?.projectTitle || e.nodeName || "分镜表").replace(/[\\/:*?"<>|]/g, "_").slice(0, 80),
                    saved = await fG(new Blob([content], {type:format === "csv" ? "text/csv;charset=utf-8" : "application/json;charset=utf-8"}), title + "." + format, "file");
                  if (!saved.ok) throw new Error(saved.error || "分镜导出失败");
                } catch (error) { alert(error instanceof Error ? error.message : "分镜导出失败"); }
              },
              children: format.toUpperCase()
            }, format)), N.some(at => at.video_url) && c.jsxs("button", {
              onClick: () => Jn(),
              disabled: Kn,
              className: `px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${Kn ? t ? "bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed" : "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed" : t ? "bg-transparent border-white/30 text-white hover:bg-white/5" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-300"}`,
              onMouseDown: at => at.stopPropagation(),
              title: x(M ? "批量下载选中的图片/视频（保存到指定目录）" : "下载本分镜表所有已生成视频"),
              children: [Kn ? c.jsx(Ua, {
                size: 12,
                className: "animate-spin"
              }) : c.jsx(ws, {
                size: 12
              }), Kn ? P != null && P.total ? x("下载中 {0}/{1}", P.current, P.total) : x("下载中...") : x("批量下载视频")]
            }), c.jsxs("div", {
              className: "flex gap-1",
              children: [c.jsxs("button", {
                onClick: () => q("list"),
                className: `px-2 py-1 rounded text-xs transition-colors border ${Q === "list" ? t ? "bg-white/15 border-white/50 text-white" : "bg-zinc-900 text-white border-zinc-900" : t ? "bg-transparent border-white/30 text-white hover:bg-white/5" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-300"}`,
                onMouseDown: at => at.stopPropagation(),
                children: [c.jsx(X$, {
                  size: 12,
                  className: "inline mr-1"
                }), x("列表")]
              }), c.jsxs("button", {
                onClick: () => q("grid"),
                className: `px-2 py-1 rounded text-xs transition-colors border ${Q === "grid" ? t ? "bg-white/15 border-white/50 text-white" : "bg-zinc-900 text-white border-zinc-900" : t ? "bg-transparent border-white/30 text-white hover:bg-white/5" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-300"}`,
                onMouseDown: at => at.stopPropagation(),
                children: [c.jsx(Od, {
                  size: 12,
                  className: "inline mr-1"
                }), x("宫格")]
              }), c.jsxs("button", {
                onClick: () => q("table"),
                className: `px-2 py-1 rounded text-xs transition-colors border ${Q === "table" ? t ? "bg-white/15 border-white/50 text-white" : "bg-zinc-900 text-white border-zinc-900" : t ? "bg-transparent border-white/30 text-white hover:bg-white/5" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-300"}`,
                onMouseDown: at => at.stopPropagation(),
                children: [c.jsx(Hue, {
                  size: 12,
                  className: "inline mr-1"
                }), x("表格")]
              })]
            })]
          })]
        }), (ln || Pn || rn) && c.jsxs("div", {
          className: `p-2 border-b space-y-2 shrink-0 ${t ? "border-white/30" : "border-zinc-200"}`,
          children: [ln && c.jsxs("div", {
            className: `p-2 rounded space-y-2 border ${t ? "bg-transparent border-white/30" : "bg-zinc-50 border border-zinc-200"}`,
            children: [c.jsxs("div", {
              className: "flex items-center justify-between",
              children: [c.jsxs("div", {
                className: "flex items-center gap-2",
                children: [c.jsx(Hd, {
                  size: 14,
                  className: t ? "text-white" : "text-zinc-700"
                }), c.jsx("span", {
                  className: `text-xs ${t ? "text-white" : "text-zinc-700"}`,
                  children: x("已连接文本节点")
                })]
              }), c.jsxs("button", {
                onClick: Yn,
                disabled: Ae,
                className: `px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed" : "bg-zinc-900 hover:bg-black text-white border-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"}`,
                onMouseDown: at => at.stopPropagation(),
                children: [Ae && c.jsx(Ua, {
                  size: 12,
                  className: "animate-spin"
                }), x(Ae ? "生成中..." : "从文本生成")]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("label", {
                className: `text-[10px] ${t ? "text-white" : "text-zinc-700"}`,
                children: x("模型:")
              }), c.jsx("select", {
                value: nn,
                onChange: at => pt(at.target.value),
                className: `storyboard-select flex-1 px-2 py-1 rounded text-xs border outline-none ${t ? "bg-transparent border-white/30 text-white" : "bg-white border-zinc-300 text-zinc-800"}`,
                onMouseDown: at => at.stopPropagation(),
                children: n.filter(at => at.type === "Chat").map(at => c.jsx("option", {
                  value: at.modelName || at.id,
                  children: at.provider || at.id
                }, at.id))
              })]
            })]
          }), Pn && c.jsxs("div", {
            className: `flex items-center gap-2 p-2 rounded border ${t ? "bg-transparent border-white/30" : "bg-zinc-50 border border-zinc-200"}`,
            children: [c.jsxs("div", {
              className: "flex items-center gap-2 flex-1",
              children: [c.jsx(lo, {
                size: 14,
                className: t ? "text-white" : "text-zinc-700"
              }), c.jsx("span", {
                className: `text-xs ${t ? "text-white" : "text-zinc-700"}`,
                children: x("已连接图片节点")
              })]
            }), c.jsxs("button", {
              onClick: wt,
              className: `px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-900 hover:bg-black text-white border-zinc-900"}`,
              onMouseDown: at => at.stopPropagation(),
              title: x("同步提示词节点"),
              children: [c.jsx(Cx, {
                size: 12
              }), x("同步提示词")]
            }), c.jsxs("button", {
              onClick: Ct,
              disabled: Ae,
              className: `px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed" : "bg-zinc-900 hover:bg-black text-white border-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"}`,
              onMouseDown: at => at.stopPropagation(),
              children: [Ae && c.jsx(Ua, {
                size: 12,
                className: "animate-spin"
              }), x(Ae ? "拆解中..." : "拆解为分镜")]
            })]
          }), rn && c.jsxs("div", {
            className: `flex items-center justify-between p-2 rounded border ${t ? "bg-transparent border-white/30" : "bg-zinc-50 border border-zinc-200"}`,
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx(Oo, {
                size: 14,
                className: t ? "text-white" : "text-zinc-700"
              }), c.jsx("span", {
                className: `text-xs ${t ? "text-white" : "text-zinc-700"}`,
                children: x("已连接视频分析节点")
              })]
            }), c.jsx("button", {
              onClick: Cn,
              className: `px-3 py-1 rounded text-xs transition-colors border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-900 hover:bg-black text-white border-zinc-900"}`,
              onMouseDown: at => at.stopPropagation(),
              children: x("导入分析结果")
            })]
          })]
        }), (ln || Pn) && c.jsxs("div", {
          className: `p-3 border-b shrink-0 space-y-3 ${t ? "border-white/30 bg-[#1f1f1f]/30" : "border-zinc-200 bg-zinc-50"}`,
          children: [c.jsxs("div", {
            className: "space-y-2",
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx(Od, {
                size: 14,
                className: t ? "text-white" : "text-zinc-600"
              }), c.jsx("span", {
                className: `text-xs font-medium ${t ? "text-white" : "text-zinc-700"}`,
                children: x("宫格布局")
              })]
            }), c.jsx("div", {
              className: `flex items-center gap-1.5 p-1 rounded-lg border ${t ? "bg-transparent border-white/30" : "bg-zinc-100 border-zinc-300"}`,
              children: ["original", "3x3", "4x4", "5x5", "custom"].map(at => c.jsxs("button", {
                onClick: () => gt(at),
                className: `flex-1 px-2 py-1.5 rounded text-xs transition-all border relative ${lt === at ? t ? "bg-white/10 border-white/70 text-white font-semibold shadow-lg shadow-white/20 ring-2 ring-white/30" : "bg-zinc-900 text-white shadow-md font-semibold border-zinc-900" : t ? "bg-transparent border-white/30 text-white hover:bg-white/5 hover:border-white/40" : "bg-transparent text-zinc-600 hover:text-zinc-700 border-transparent hover:bg-zinc-50"}`,
                onMouseDown: Pt => Pt.stopPropagation(),
                children: [at === "original" ? x("原") : at === "custom" ? x("自定义") : at.toUpperCase(), lt === at && c.jsx("span", {
                  className: `absolute -top-1 -right-1 w-2 h-2 rounded-full ${t ? "bg-white" : "bg-zinc-900"}`
                })]
              }, at))
            }), lt === "custom" && c.jsxs("div", {
              className: `flex items-center justify-between px-3 py-2 rounded-lg border ${t ? "bg-transparent border-white/30" : "bg-zinc-100 border border-zinc-300"}`,
              children: [c.jsx("div", {
                className: "flex items-center gap-2",
                children: c.jsx("span", {
                  className: `text-[10px] font-medium ${t ? "text-white" : "text-zinc-600"}`,
                  children: x("# 镜头总数")
                })
              }), c.jsx("input", {
                type: "number",
                min: "1",
                max: "100",
                value: Ut,
                onChange: at => _t(parseInt(at.target.value) || 10),
                className: `w-20 px-2 py-1 rounded text-xs border text-center font-medium ${t ? "bg-transparent border-white/30 text-white focus:ring-2 focus:ring-white/30" : "bg-white border-zinc-300 text-zinc-800 focus:ring-2 focus:ring-blue-500"}`,
                onMouseDown: at => at.stopPropagation()
              })]
            })]
          }), N.length > 0 && c.jsxs("div", {
            className: `flex items-center justify-between px-3 py-2 rounded-lg border ${t ? "bg-transparent border-white/30" : "bg-zinc-100 border-zinc-300"}`,
            children: [c.jsx("span", {
              className: `text-xs ${t ? "text-white" : "text-zinc-600"}`,
              children: x("# 镜头总数")
            }), c.jsx("span", {
              className: `text-xs font-medium px-2.5 py-1 rounded border ${t ? "bg-transparent border-white/30 text-white" : "bg-zinc-200 text-zinc-700 border-zinc-300"}`,
              children: N.length
            })]
          })]
        }), qe && (() => {
          const at = ({
            text: Pt,
            isDark: dt
          }) => {
            on();
            const [xt, yn] = g.useState(!1),
              gn = async () => {
                try {
                  await navigator.clipboard.writeText(Pt), yn(!0), setTimeout(() => yn(!1), 2e3);
                } catch (mt) {
                  console.error("复制失败:", mt);
                }
              };
            return c.jsx("button", {
              onClick: gn,
              className: `p-1.5 rounded transition-colors ${dt ? "text-white/60 hover:text-white hover:bg-white/5 border border-white/30 hover:border-white/50" : "text-zinc-600 hover:text-green-600 hover:bg-green-100"}`,
              onMouseDown: mt => mt.stopPropagation(),
              title: x(xt ? "已复制" : "复制JSON"),
              children: xt ? c.jsx(io, {
                size: 14
              }) : c.jsx(Cx, {
                size: 14
              })
            });
          };
          return c.jsxs("div", {
            className: `p-2 border-b shrink-0 ${t ? "border-white/30 bg-transparent" : "border-zinc-200 bg-zinc-50"}`,
            children: [c.jsxs("button", {
              onClick: () => Yt(!At),
              className: `w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors border ${t ? "bg-transparent hover:bg-white/5 text-white border-white/30 hover:border-white/50" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-transparent"}`,
              onMouseDown: Pt => Pt.stopPropagation(),
              children: [c.jsxs("div", {
                className: "flex items-center gap-2",
                children: [c.jsx(ELe, {
                  size: 14,
                  className: t ? "text-white/60" : "text-zinc-600"
                }), c.jsx("span", {
                  className: "text-xs font-medium",
                  children: "JSON Code"
                })]
              }), c.jsx("div", {
                className: "flex items-center gap-2",
                children: At ? c.jsx(Na, {
                  size: 12,
                  className: t ? "text-white/60" : "text-zinc-600"
                }) : c.jsx(Od, {
                  size: 12,
                  className: t ? "text-white/60" : "text-zinc-600"
                })
              })]
            }), At && c.jsxs("div", {
              className: `mt-2 rounded-lg border overflow-hidden ${t ? "bg-transparent border-white/30" : "bg-white border-zinc-300"}`,
              children: [c.jsxs("div", {
                className: `flex items-center justify-between px-3 py-2 border-b ${t ? "border-white/30 bg-transparent" : "border-zinc-200 bg-zinc-50"}`,
                children: [c.jsx("span", {
                  className: `text-xs font-medium ${t ? "text-white/80" : "text-zinc-700"}`,
                  children: x("JSON数据")
                }), c.jsx(at, {
                  text: qe,
                  isDark: t
                })]
              }), c.jsx("pre", {
                className: `p-3 text-xs overflow-auto max-h-64 minimal-scrollbar ${t ? "text-white/70" : "text-zinc-800"}`,
                children: c.jsx("code", {
                  children: qe
                })
              })]
            })]
          });
        })(), Q === "list" ? c.jsx("div", {
          className: "flex-1 overflow-y-auto minimal-scrollbar p-3 space-y-3 min-h-0 bg-opacity-50",
          onWheel: at => at.stopPropagation(),
          children: N.length > 0 ? c.jsx(c.Fragment, {
            children: N.map((at, Pt) => c.jsxs("div", {
              className: "group/item",
              children: [c.jsx(byo, {
                shot: at,
                idx: Pt,
                nodeId: e.id,
                node: e,
                isDark: t,
                apiConfigs: n,
                updateShot: i,
                updateNode: w,
                generateSingleShot: o,
                deleteShot: s,
                nodes: h,
                characterLibrary: C,
                klingSubjectLibrary: I,
                setKlingSubjectsOpen: E,
                onOpenKlingSubject: () => Ve(at.id),
                onOpenKlingVideo: () => It(at.id),
                onOpenKlingImage: () => We(at.id),
                wan26AudioShotId: Ze,
                onWan26AudioFileSelected: dt => {
                  Ht(dt), Ge(at.id), st(!0);
                },
                showWan26AudioSegmentSelector: Oe && Ze === at.id,
                pendingWan26AudioFile: Ze === at.id ? vt : null,
                onWan26AudioSegmentConfirm: (dt, xt) => {
                  Ze && i(e.id, Ze, {
                    wan26AudioConfig: "upload",
                    wan26AudioFile: dt,
                    wan26AudioSegment: xt
                  }), st(!1), Ht(null), Ge(null);
                },
                onCloseWan26AudioSegment: () => {
                  st(!1), Ht(null), Ge(null);
                },
                generateSequenceFromShot: _,
                handleOpenGenerateSequenceModal: et,
                onSendShotToGenVideo: Ue,
                setLightboxItem: d,
                setLightboxOpen: u,
                activeStoryboardCanvasPickKind: R && R.boardNodeId === e.id && R.shotId === at.id ? R.pickKind : null,
                onStartStoryboardCanvasPick: j,
                activeDropdown: ne,
                setActiveDropdown: de,
                videoModelOptions: G,
                assetAtMentionItems: H,
                assetAtMentionCategories: z,
                onSelectAssetAtMention: dt => void K(at.id, dt)
              }), c.jsx("div", {
                className: "relative -mt-1",
                onMouseDown: dt => dt.stopPropagation(),
                children: c.jsxs("button", {
                  onClick: () => l(e.id, Pt),
                  className: `w-full py-1.5 rounded-lg border-2 border-dashed text-xs flex items-center justify-center gap-1 transition-all opacity-0 group-hover/item:opacity-100 ${t ? "bg-transparent border-white/30 text-white hover:bg-white/5 hover:border-white/50" : "border-zinc-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"}`,
                  onMouseDown: dt => dt.stopPropagation(),
                  title: x("在此处插入空白镜头"),
                  children: [c.jsx(eo, {
                    size: 12
                  }), c.jsx("span", {
                    children: x("插入空白镜头")
                  })]
                })
              })]
            }, at.id))
          }) : c.jsxs("div", {
            className: `flex-1 rounded-lg border-2 border-dashed flex flex-col items-center justify-center py-8 ${t ? "border-zinc-700" : "border-zinc-300"}`,
            children: [c.jsx(Bv, {
              size: 32,
              className: `mb-2 ${t ? "text-zinc-600" : "text-zinc-400"}`
            }), c.jsx("span", {
              className: `text-xs ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: x("暂无分镜，请添加或同步分析结果")
            })]
          })
        }) : Q === "grid" ? c.jsx(yyo, {
          shots: N,
          isDark: t,
          onShotClick: ht,
          node: e,
          apiConfigs: n,
          globalApiKey: f,
          setNodes: k,
          generateId: S
        }) : c.jsx("div", {
          className: "flex-1 min-h-0 flex flex-col",
          children: c.jsx(vyo, {
            shots: N,
            isDark: t,
            updateShot: i,
            deleteShot: s,
            nodeId: e.id,
            selectedShots: le,
            setSelectedShots: J,
            onBatchDelete: () => ce(!0),
            onBatchDownload: () => Jn(le),
            isBatchDownloading: Kn
          })
        }), c.jsx("div", {
          className: `p-3 border-t shrink-0 ${t ? "border-zinc-800" : "border-zinc-200"}`,
          children: c.jsxs("button", {
            onClick: () => l(e.id),
            title: N.length > 0 ? x("新建镜头并继承上一镜头的模型、比例、时长、分辨率及虎牙 等开关（不含文案与参考图）") : x("新建空白镜头"),
            className: `w-full py-2 rounded-lg border-2 border-dashed text-xs flex items-center justify-center gap-1 transition-colors ${t ? "bg-transparent border-white/30 text-white hover:bg-white/5 hover:border-white/50" : "border-zinc-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-600"}`,
            onMouseDown: at => at.stopPropagation(),
            children: [c.jsx(eo, {
              size: 14
            }), x("添加空白镜头")]
          })
        }), c.jsx(Y6, {
          isOpen: Me,
          onClose: () => Re(!1),
          title: x("同步提示词节点"),
          theme: t ? "dark" : "light",
          children: c.jsxs("div", {
            className: `p-5 space-y-4 ${t ? "text-zinc-200" : "text-zinc-800"}`,
            children: [c.jsx("p", {
              className: `text-sm ${t ? "text-zinc-400" : "text-zinc-600"}`,
              children: x("请选择要同步的分镜节点：")
            }), c.jsx("div", {
              className: "space-y-2 max-h-[400px] overflow-y-auto minimal-scrollbar",
              children: h.filter(at => at.type === "storyboard-node" && at.id !== e.id).map(at => {
                var yn;
                const dt = (gn => {
                    var mt;
                    return gn.nodeName || ((mt = gn.settings) == null ? void 0 : mt.projectTitle) || `分镜节点 ${gn.id.slice(0, 8)}`;
                  })(at),
                  xt = (((yn = at.settings) == null ? void 0 : yn.shots) || []).length;
                return c.jsx("button", {
                  onClick: () => jt(at.id),
                  className: `w-full p-3 rounded-lg border text-left transition-colors ${t ? "border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 hover:border-zinc-600" : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400"}`,
                  children: c.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [c.jsx("span", {
                      className: `font-medium ${t ? "text-zinc-200" : "text-zinc-800"}`,
                      children: dt
                    }), c.jsxs("span", {
                      className: "text-xs text-zinc-500",
                      children: [xt, x(" 个镜头")]
                    })]
                  })
                }, at.id);
              })
            })]
          })
        }), c.jsx(Y6, {
          isOpen: fe,
          onClose: () => {
            ye(!1), ae("");
          },
          title: x("批量添加提示词前缀"),
          theme: t ? "dark" : "light",
          children: c.jsxs("div", {
            className: `p-5 space-y-4 ${t ? "text-zinc-200" : "text-zinc-800"}`,
            children: [c.jsx("p", {
              className: `text-sm ${t ? "text-zinc-400" : "text-zinc-600"}`,
              children: x("将在当前分镜表所有镜头的「画面描述」/ 提示词内容前添加相同前缀，已有内容会保留并接在后边。")
            }), c.jsxs("div", {
              children: [c.jsx("label", {
                className: `block text-sm font-medium mb-2 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                children: x("前缀内容")
              }), c.jsx("textarea", {
                value: ie,
                onChange: at => ae(at.target.value),
                placeholder: x("例如：国风风格，"),
                rows: 3,
                className: `w-full px-3 py-2 rounded-lg border outline-none resize-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500" : "bg-white border-zinc-300 text-zinc-800 placeholder:text-zinc-400"}`,
                onMouseDown: at => at.stopPropagation()
              })]
            }), c.jsxs("div", {
              className: "flex gap-3 pt-2",
              children: [c.jsxs("button", {
                onClick: en,
                disabled: !ie.trim(),
                className: `flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${ie.trim() ? t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200" : "bg-black hover:bg-[#1f1f1f] text-white" : t ? "bg-zinc-700 text-zinc-500 cursor-not-allowed" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"}`,
                onMouseDown: at => at.stopPropagation(),
                children: [x("确定（共 "), N.length, x(" 个镜头）")]
              }), c.jsx("button", {
                onClick: () => {
                  ye(!1), ae("");
                },
                className: `px-4 py-2 rounded-lg font-medium transition-colors ${t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"}`,
                onMouseDown: at => at.stopPropagation(),
                children: x("取消")
              })]
            })]
          })
        }), c.jsx(Y6, {
          isOpen: be,
          onClose: () => {
            Ee(!1), de(null);
          },
          title: x("批量设置模型 / 比例 / 时长"),
          theme: t ? "dark" : "light",
          children: c.jsxs("div", {
            className: `p-5 space-y-4 ${t ? "text-zinc-200" : "text-zinc-800"}`,
            children: [c.jsx("p", {
              className: `text-sm ${t ? "text-zinc-400" : "text-zinc-600"}`,
              children: x("该操作会将当前分镜表中所有镜头的模型、画面比例和时长统一为下面选择的配置（已有镜头会被覆盖）。")
            }), c.jsxs("div", {
              className: "space-y-3",
              children: [c.jsxs("div", {
                children: [c.jsx("label", {
                  className: `block text-sm font-medium mb-1 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                  children: x("模型")
                }), c.jsx(yvr, {
                  scopeId: `${e.id}-batch-settings`,
                  dropdownType: "storyboard-batch-video-model",
                  value: xe,
                  models: G,
                  isDark: t,
                  activeDropdown: ne,
                  setActiveDropdown: de,
                  className: "w-full",
                  menuPlacement: "below",
                  onSelect: at => {
                    if (he(at), GS(at) || ug(at) || I0(at) || fg(at)) {
                      const Pt = XSt(at);
                      ge(String(Pt.ratio ?? "16:9")), Te(String(Pt.resolution ?? (ug(at) ? "2K" : I0(at) ? "1080P" : fg(at) ? "std" : "480p"))), ke(String(Pt.duration ?? "5s"));
                    } else {
                      const Pt = rl(at),
                        dt = Pt.includes(ve) ? ve : Pt[0];
                      Te(dt);
                      const xt = ih(at, dt);
                      ke(xt.includes(_e) ? _e : xt[0]);
                      const yn = ah(at);
                      ge(yn.includes(ue) ? ue : yn[0]);
                    }
                  }
                })]
              }), c.jsxs("div", {
                className: "flex gap-3",
                children: [c.jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [c.jsx("label", {
                    className: `block text-sm font-medium mb-1 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                    children: x("比例")
                  }), c.jsx(qs, {
                    scopeId: `${e.id}-batch-settings`,
                    dropdownType: "storyboard-batch-ratio",
                    value: Qt.includes(ue) ? ue : Qt[0] || ue,
                    options: Qt.map(at => ({
                      value: at,
                      label: at
                    })),
                    isDark: t,
                    activeDropdown: ne,
                    setActiveDropdown: de,
                    onSelect: ge,
                    className: "w-full",
                    menuPlacement: "below"
                  })]
                }), c.jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [c.jsx("label", {
                    className: `block text-sm font-medium mb-1 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                    children: x("时长")
                  }), c.jsx(qs, {
                    scopeId: `${e.id}-batch-settings`,
                    dropdownType: "storyboard-batch-duration",
                    value: St.includes(_e) ? _e : St[0] || _e,
                    options: St.map(at => ({
                      value: at,
                      label: at.replace("s", "秒")
                    })),
                    isDark: t,
                    activeDropdown: ne,
                    setActiveDropdown: de,
                    onSelect: ke,
                    className: "w-full",
                    menuPlacement: "below"
                  })]
                })]
              }), hn.length > 0 && c.jsxs("div", {
                children: [c.jsx("label", {
                  className: `block text-sm font-medium mb-1 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                  children: x("分辨率")
                }), c.jsx(qs, {
                  scopeId: `${e.id}-batch-settings`,
                  dropdownType: "storyboard-batch-resolution",
                  value: hn.includes(ve) ? ve : hn[0] || ve,
                  options: hn.map(at => ({
                    value: at,
                    label: at
                  })),
                  isDark: t,
                  activeDropdown: ne,
                  setActiveDropdown: de,
                  onSelect: at => {
                    if (Te(at), xe) {
                      const Pt = ih(xe, at);
                      ke(Pt.includes(_e) ? _e : Pt[0]);
                    }
                  },
                  className: "w-full",
                  menuPlacement: "below"
                })]
              })]
            }), c.jsxs("div", {
              className: "flex gap-3 pt-2",
              children: [c.jsxs("button", {
                onClick: Ot,
                disabled: !xe || !ue || !_e || hn.length > 0 && !ve,
                className: `flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${!xe || !ue || !_e ? t ? "bg-zinc-700 text-zinc-500 cursor-not-allowed" : "bg-zinc-200 text-zinc-400 cursor-not-allowed" : t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200" : "bg-black hover:bg-[#1f1f1f] text-white"}`,
                onMouseDown: at => at.stopPropagation(),
                children: [x("确定（共 "), N.length, x(" 个镜头）")]
              }), c.jsx("button", {
                onClick: () => {
                  Ee(!1), de(null);
                },
                className: `px-4 py-2 rounded-lg font-medium transition-colors ${t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"}`,
                onMouseDown: at => at.stopPropagation(),
                children: x("取消")
              })]
            })]
          })
        }), c.jsx(Y6, {
          isOpen: $e,
          onClose: () => {
            rt(!1), ze(null);
          },
          title: x("生成分镜序列"),
          theme: t ? "dark" : "light",
          children: c.jsxs("div", {
            className: `p-5 space-y-4 ${t ? "text-zinc-200" : "text-zinc-800"}`,
            children: [c.jsxs("div", {
              children: [c.jsx("label", {
                className: `block text-sm font-medium mb-2 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                children: x("Chat对话大模型")
              }), c.jsx("select", {
                value: Le,
                onChange: at => Ke(at.target.value),
                className: `w-full px-3 py-2 rounded-lg border outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                children: n.filter(at => at.type === "Chat").map(at => c.jsxs("option", {
                  value: at.modelName || at.id,
                  children: [at.provider || at.id, " - ", at.modelName || at.id]
                }, at.id))
              })]
            }), c.jsxs("div", {
              children: [c.jsx("label", {
                className: `block text-sm font-medium mb-2 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                children: x("生成镜头数量")
              }), c.jsx("input", {
                type: "number",
                min: "1",
                max: "20",
                value: Xe,
                onChange: at => De(parseInt(at.target.value) || 4),
                className: `w-full px-3 py-2 rounded-lg border outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`
              })]
            }), c.jsxs("div", {
              className: "flex gap-3 pt-2",
              children: [c.jsx("button", {
                onClick: ft,
                disabled: Ye || !Le,
                className: `flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${Ye || !Le ? "bg-zinc-600 text-zinc-400 cursor-not-allowed" : t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200" : "bg-zinc-900 hover:bg-black text-white"}`,
                children: Ye ? c.jsxs("span", {
                  className: "flex items-center justify-center gap-2",
                  children: [c.jsx(Ua, {
                    size: 16,
                    className: "animate-spin"
                  }), x("生成中...")]
                }) : x("确定")
              }), c.jsx("button", {
                onClick: () => {
                  rt(!1), ze(null);
                },
                className: `px-4 py-2 rounded-lg font-medium transition-colors ${t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"}`,
                children: x("取消")
              })]
            })]
          })
        }), c.jsx(Y6, {
          isOpen: pe,
          onClose: () => {
            ce(!1), X({
              from: "",
              to: ""
            });
          },
          title: x("批量删除"),
          theme: t ? "dark" : "light",
          children: c.jsxs("div", {
            className: `p-5 space-y-4 ${t ? "text-zinc-200" : "text-zinc-800"}`,
            children: [c.jsxs("div", {
              children: [c.jsx("label", {
                className: `block text-sm font-medium mb-2 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                children: x("删除范围")
              }), c.jsxs("div", {
                className: "flex items-center gap-2",
                children: [c.jsx("input", {
                  type: "number",
                  min: "1",
                  max: N.length,
                  value: we.from,
                  onChange: at => X({
                    ...we,
                    from: at.target.value
                  }),
                  placeholder: x("起始镜号"),
                  className: `flex-1 px-3 py-2 rounded-lg border outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`
                }), c.jsx("span", {
                  className: t ? "text-zinc-400" : "text-zinc-600",
                  children: x("到")
                }), c.jsx("input", {
                  type: "number",
                  min: "1",
                  max: N.length,
                  value: we.to,
                  onChange: at => X({
                    ...we,
                    to: at.target.value
                  }),
                  placeholder: x("结束镜号"),
                  className: `flex-1 px-3 py-2 rounded-lg border outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`
                })]
              })]
            }), c.jsxs("div", {
              className: "flex gap-3 pt-2",
              children: [c.jsx("button", {
                onClick: () => un(we.from && we.to ? we : void 0),
                disabled: !we.from || !we.to,
                className: `flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${!we.from || !we.to ? "bg-zinc-600 text-zinc-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"}`,
                children: x("确认删除")
              }), c.jsx("button", {
                onClick: () => {
                  ce(!1), X({
                    from: "",
                    to: ""
                  });
                },
                className: `px-4 py-2 rounded-lg font-medium transition-colors ${t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"}`,
                children: x("取消")
              })]
            })]
          })
        }), Oe && vt && Ze && (() => {
          const at = (Pt, dt) => {
            i(e.id, Ze, {
              wan26AudioConfig: "upload",
              wan26AudioFile: vt,
              wan26AudioSegment: {
                startTime: Pt,
                endTime: dt
              }
            }), st(!1), Ht(null), Ge(null);
          };
          return c.jsx(ltr, {
            audioFile: vt,
            isOpen: !0,
            onClose: () => {
              st(!1), Ht(null), Ge(null);
            },
            onConfirm: at,
            isDark: !!t,
            minDuration: 3,
            maxDuration: 15
          });
        })()]
      }), bt && c.jsxs("div", {
        className: `shrink-0 w-[480px] pl-4 flex flex-col border-l overflow-y-auto minimal-scrollbar ${t ? "border-white/30 bg-[#1f1f1f]/30" : "border-zinc-200 bg-zinc-50"}`,
        onMouseDown: at => at.stopPropagation(),
        children: [He && (() => {
          const at = N.find(Pt => Pt.id === He);
          return at ? I && I.length > 0 && E ? c.jsx(str, {
            isOpen: !0,
            isDark: !!t,
            klingSubjectLibrary: I,
            selectedSubjects: at.klingSubjects || [],
            onClose: () => Ve(null),
            onConfirm: Pt => {
              i(e.id, He, {
                klingSubjects: Pt
              }), Ve(null);
            },
            onCreateSubject: () => {
              Ve(null), E(!0);
            },
            attachMode: "inline"
          }) : c.jsxs("div", {
            className: `p-4 rounded border ${t ? "bg-transparent border-white/30" : "bg-zinc-50 border-zinc-200"}`,
            children: [c.jsx("div", {
              className: `text-sm mb-2 ${t ? "text-white" : "text-zinc-700"}`,
              children: x("可灵主体选择")
            }), c.jsx("div", {
              className: `text-xs ${t ? "text-zinc-400" : "text-zinc-500"}`,
              children: x("当前没有可用的主体库，请先创建主体。")
            }), E && c.jsx("button", {
              onClick: () => {
                Ve(null), E(!0);
              },
              className: `mt-3 px-3 py-1.5 rounded text-xs border transition-colors ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-900 hover:bg-black text-white border-zinc-900"}`,
              children: x("创建主体")
            })]
          }) : null;
        })(), it && (() => {
          const at = N.find(yn => yn.id === it);
          if (!at) return null;
          const Pt = n.find(yn => yn.id === at.model),
            dt = (Pt == null ? void 0 : Pt.key) || f,
            xt = ((Pt == null ? void 0 : Pt.url) || "https://ai.comfly.chat").replace(/\/+$/, "");
          return c.jsx(l$t, {
            isOpen: !0,
            onClose: () => It(null),
            onConfirm: (yn, gn, mt, Xt, Gn, rr) => {
              i(e.id, it, {
                klingVideoFile: yn,
                klingVideoSegment: {
                  startTime: gn,
                  endTime: mt
                },
                klingVideoUrl: Xt,
                klingVideoReferType: Gn || "base",
                klingVideoKeepSound: rr || "yes"
              }), It(null);
            },
            isDark: !!t,
            maxDuration: 10,
            currentVideoFile: at.klingVideoFile || null,
            apiKey: dt,
            baseUrl: xt,
            useOssForUpload: ua(),
            attachMode: "inline"
          });
        })(), Ft && (() => {
          const at = N.find(yn => yn.id === Ft);
          if (!at) return null;
          const Pt = n.find(yn => yn.id === at.model),
            dt = (Pt == null ? void 0 : Pt.key) || f || "",
            xt = ((Pt == null ? void 0 : Pt.url) || "https://ai.comfly.chat").replace(/\/+$/, "");
          return c.jsx(gvr, {
            isOpen: !0,
            isDark: !!t,
            currentImages: at.klingImages || [],
            onClose: () => We(null),
            onConfirm: yn => {
              i(e.id, Ft, {
                klingImages: yn
              }), We(null);
            },
            apiKey: dt,
            baseUrl: xt,
            useOssForUpload: ua(),
            attachMode: "inline"
          });
        })()]
      })]
    });
  },
  gyo = ({
    shot: e,
    idx: t,
    nodeId: n,
    node: r,
    isDark: a,
    apiConfigs: i,
    updateShot: o,
    updateNode: s,
    generateSingleShot: l,
    deleteShot: d,
    nodes: u = [],
    characterLibrary: h = [],
    klingSubjectLibrary: p = [],
    setKlingSubjectsOpen: m,
    onOpenKlingSubject: f,
    onOpenKlingVideo: y,
    onOpenKlingImage: b,
    wan26AudioShotId: v,
    onWan26AudioFileSelected: _,
    showWan26AudioSegmentSelector: w,
    pendingWan26AudioFile: k,
    onWan26AudioSegmentConfirm: A,
    onCloseWan26AudioSegment: S,
    generateSequenceFromShot: C,
    handleOpenGenerateSequenceModal: I,
    onSendShotToGenVideo: E,
    setLightboxItem: M,
    setLightboxOpen: T,
    activeStoryboardCanvasPickKind: P = null,
    onStartStoryboardCanvasPick: R,
    activeDropdown: j = null,
    setActiveDropdown: B,
    videoModelOptions: F = [],
    assetAtMentionItems: N = [],
    assetAtMentionCategories: G = [],
    onSelectAssetAtMention: z
  }) => {
    var nt;
    on();
    const [V, O] = g.useState(!1),
      [L, D] = g.useState(!1),
      [U, H] = g.useState(!1),
      [Y, K] = g.useState(null),
      W = g.useRef(null),
      Q = g.useRef(null),
      q = e.model || "sora-2",
      ne = F.find(ze => ze.id === q),
      de = Qa.getGlobalBaseUrl(),
      le = !!ne && od(ne, de),
      J = String(e.platformGroup || "").trim(),
      pe = GS(q),
      ce = I0(q),
      we = `${n}-${e.id}`,
      X = g.useMemo(() => rl(q), [q]),
      Z = g.useMemo(() => {
        const ze = e.resolution;
        return ze && X.includes(ze) ? ze : X[0] || (pe ? "480p" : "1080P");
      }, [e.resolution, X, pe]),
      re = e.duration || Gj(q),
      fe = g.useMemo(() => Vj(q) || pX(q) || pe || ce ? ah(q) : ["16:9", "9:16", "1:1", "4:3", "3:4"], [q, pe, ce]),
      ye = g.useMemo(() => ih(q, Z), [q, Z]),
      ie = g.useMemo(() => {
        const ze = e.ratio || "";
        return ze && fe.includes(ze) ? ze : (pe || ce) && fe.includes("Auto") ? "Auto" : fe[0] || "16:9";
      }, [e.ratio, fe, pe, ce]),
      ae = g.useMemo(() => Vj(q), [q]),
      be = g.useMemo(() => bx(q), [q]),
      Ee = g.useMemo(() => Ex(q), [q]),
      xe = g.useMemo(() => whe(q), [q]),
      he = g.useMemo(() => zv(q), [q]),
      ue = g.useMemo(() => E3(q), [q]),
      ge = g.useMemo(() => Lk(q), [q]),
      _e = g.useMemo(() => Y1(q), [q]),
      ke = g.useMemo(() => J2(q), [q]),
      ve = g.useCallback(ze => GCe(ze), []),
      Te = g.useMemo(() => $z(q), [q]),
      Ne = g.useMemo(() => ve(e), [e, ve]),
      me = g.useCallback((ze, Le) => {
        const Ke = ve(e);
        if (ze === Le || ze < 0 || Le < 0 || ze >= Ke.length || Le >= Ke.length) return;
        const Xe = bUe(e),
          De = Agi(Ke, Xe, ze, Le);
        o(n, e.id, {
          ...De,
          image_url: De.image_urls[0] || ""
        }), K(null);
      }, [e, ve, o, n]),
      Ae = g.useMemo(() => pe ? !1 : !!(ae || be || Ee && X.length > 0 || ge && X.length > 0 || _e && X.length > 0 || ce && X.length > 0 || xe && X.length > 0 || ue && X.length > 0), [pe, ae, be, Ee, ge, _e, ce, xe, ue, X.length]),
      Fe = g.useMemo(() => ae ? ["1080P", "720P"] : X, [ae, X]),
      Me = ze => {
        const Le = ze.target.files;
        if (!Le || Le.length === 0) return;
        const Ke = Array.from(Le);
        let Xe = 0;
        const De = [];
        Ke.forEach(Ye => {
          if (Ye.type.startsWith("image/")) {
            const Ce = new FileReader();
            Ce.onload = He => {
              var Ve;
              if ((Ve = He.target) != null && Ve.result && (De.push(He.target.result), Xe++, Xe === Ke.filter(it => it.type.startsWith("image/")).length)) {
                const Ft = [...ve(e), ...De].slice(0, Te);
                o(n, e.id, {
                  image_urls: Ft,
                  image_url: Ft[0] || ""
                });
              }
            }, Ce.readAsDataURL(Ye);
          }
        });
      },
      Re = ze => {
        const Le = ze.clipboardData.items,
          Ke = [];
        for (let Xe = 0; Xe < Le.length; Xe++) if (Le[Xe].type.indexOf("image") !== -1) {
          ze.preventDefault(), ze.stopPropagation();
          const De = Le[Xe].getAsFile();
          De && Ke.push(De);
        }
        if (Ke.length > 0) {
          const Xe = ve(e);
          let De = 0;
          const Ye = [];
          Ke.forEach(Ce => {
            const He = new FileReader();
            He.onload = Ve => {
              var it;
              if ((it = Ve.target) != null && it.result && (Ye.push(Ve.target.result), De++, De === Ke.length)) {
                const Ft = [...Xe, ...Ye].slice(0, Te);
                o(n, e.id, {
                  image_urls: Ft,
                  image_url: Ft[0] || ""
                });
              }
            }, He.readAsDataURL(Ce);
          });
        }
      },
      $e = (ze, Le) => {
        ze.preventDefault(), ze.stopPropagation();
        const Ke = ze.dataTransfer.getData("application/json");
        if (Ke) try {
          const Xe = JSON.parse(Ke);
          if (Xe.type === "history-item" && Xe.item) {
            const De = Xe.item;
            if (De.type === "image" && De.url) {
              console.log(`[StoryboardNode] 从历史记录拖拽图片到${Le}:`, De), o(n, e.id, {
                [Le]: De.url
              });
              return;
            }
          }
        } catch (Xe) {
          console.error(`[StoryboardNode] 解析历史记录拖拽数据失败(${Le}):`, Xe);
        }
        if (ze.dataTransfer.files && ze.dataTransfer.files.length > 0) {
          const Xe = ze.dataTransfer.files[0];
          if (Xe.type.startsWith("image/")) {
            const De = new FileReader();
            De.onload = Ye => {
              var Ce;
              return o(n, e.id, {
                [Le]: (Ce = Ye.target) == null ? void 0 : Ce.result
              });
            }, De.readAsDataURL(Xe);
          }
        }
      },
      rt = ze => {
        ze.preventDefault(), ze.stopPropagation();
        const Le = ze.dataTransfer.getData("application/json");
        if (Le) try {
          const Ke = JSON.parse(Le);
          if (Ke.type === "history-item" && Ke.item) {
            const Xe = Ke.item;
            if (Xe.type === "image" && Xe.url) {
              console.log("[StoryboardNode] 从历史记录拖拽图片到镜头:", Xe);
              const Ce = [...ve(e), Xe.url].slice(0, Te);
              o(n, e.id, {
                image_urls: Ce,
                image_url: Ce[0] || ""
              });
              return;
            }
          }
        } catch (Ke) {
          console.error("[StoryboardNode] 解析历史记录拖拽数据失败:", Ke);
        }
        if (ze.dataTransfer.files && ze.dataTransfer.files.length > 0) {
          const Ke = Array.from(ze.dataTransfer.files).filter(Ce => Ce.type.startsWith("image/"));
          if (Ke.length === 0) return;
          const Xe = ve(e);
          let De = 0;
          const Ye = [];
          Ke.forEach(Ce => {
            const He = new FileReader();
            He.onload = Ve => {
              var it;
              if ((it = Ve.target) != null && it.result && (Ye.push(Ve.target.result), De++, De === Ke.length)) {
                const Ft = [...Xe, ...Ye].slice(0, Te);
                o(n, e.id, {
                  image_urls: Ft,
                  image_url: Ft[0] || ""
                });
              }
            }, He.readAsDataURL(Ce);
          });
        }
      };
    return c.jsxs("div", {
      "data-shot-id": e.id,
      tabIndex: 0,
      onPaste: Re,
      className: `flex gap-3 p-3 rounded-lg border transition-all group/shot cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/50 ${U ? "items-stretch min-h-[18rem]" : ""} ${a ? "bg-[#1f1f1f]/50 border-zinc-800 hover:border-zinc-600" : "bg-white border-zinc-200 hover:border-blue-300 hover:shadow-md"}`,
      onClick: ze => {
        ze.currentTarget.focus();
      },
      children: [c.jsx("div", {
        className: `font-mono text-sm w-6 shrink-0 flex items-start pt-1 font-bold relative ${a ? "text-zinc-600" : "text-zinc-400"}`,
        children: t + 1
      }), c.jsx("div", {
        className: `min-w-[240px] w-64 shrink-0 transition-colors ${ke && e.enableFrames ? "space-y-2" : ""}`,
        onClick: ze => ze.stopPropagation(),
        children: ke && e.enableFrames ? c.jsxs(c.Fragment, {
          children: [c.jsxs("div", {
            className: `w-full aspect-video rounded border relative group overflow-hidden transition-colors ${a ? "bg-black border-zinc-800" : "bg-zinc-100 border-zinc-300"}`,
            onDrop: ze => $e(ze, "startFrame"),
            onDragOver: ze => ze.preventDefault(),
            children: [e.startFrame ? c.jsxs(c.Fragment, {
              children: [c.jsx("img", {
                src: e.startFrame,
                className: "w-full h-full object-cover",
                alt: x("首帧")
              }), c.jsx("button", {
                onClick: ze => {
                  ze.stopPropagation(), o(n, e.id, {
                    startFrame: ""
                  });
                },
                className: `absolute top-1 right-1 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${a ? "bg-black/60 hover:bg-red-600 text-white" : "bg-white/80 hover:bg-red-500 text-zinc-600 hover:text-white"}`,
                title: x("清除首帧"),
                children: c.jsx(Na, {
                  size: 10
                })
              }), c.jsx("div", {
                className: `absolute bottom-0 left-0 right-0 px-1 py-0.5 text-[8px] text-center ${a ? "bg-emerald-900/80 text-emerald-300" : "bg-emerald-500/80 text-white"}`,
                children: x("首帧")
              })]
            }) : c.jsxs("div", {
              className: `w-full h-full flex flex-col items-center justify-center text-[10px] gap-1 ${a ? "text-zinc-700" : "text-zinc-400"}`,
              children: [c.jsx(lo, {
                size: 14
              }), c.jsx("span", {
                children: x("首帧")
              })]
            }), !e.startFrame && c.jsxs("label", {
              className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity cursor-pointer",
              onClick: ze => ze.stopPropagation(),
              onMouseDown: ze => ze.stopPropagation(),
              children: [c.jsxs("span", {
                className: "flex flex-col items-center gap-1 pointer-events-none",
                children: [c.jsx(Sc, {
                  size: 14
                }), x("选择首帧")]
              }), c.jsx("input", {
                type: "file",
                className: "hidden",
                accept: "image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg",
                onChange: ze => {
                  var Ke;
                  const Le = (Ke = ze.target.files) == null ? void 0 : Ke[0];
                  if (Le) {
                    const Xe = new FileReader();
                    Xe.onload = De => {
                      var Ye;
                      return o(n, e.id, {
                        startFrame: (Ye = De.target) == null ? void 0 : Ye.result
                      });
                    }, Xe.readAsDataURL(Le);
                  }
                },
                onClick: ze => ze.stopPropagation()
              })]
            }), !e.startFrame && R && c.jsx("div", {
              className: "absolute bottom-1 right-1 z-20",
              children: c.jsx("button", {
                type: "button",
                onClick: ze => {
                  ze.stopPropagation(), ze.preventDefault(), R(n, e.id, "startFrame");
                },
                onMouseDown: ze => ze.stopPropagation(),
                title: x(P === "startFrame" ? "请点击画布上的「图片输入」或「AI绘画」节点" : "从画布上的图片输入、AI绘画节点选取首帧图"),
                className: `rounded px-1.5 py-0.5 text-[9px] font-medium leading-tight transition-colors border ${P === "startFrame" ? a ? "border-amber-500/80 bg-amber-500/20 text-amber-200" : "border-amber-500 bg-amber-50 text-amber-900" : a ? "border-zinc-600 bg-black/70 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 bg-white/90 text-zinc-700 hover:bg-zinc-100"}`,
                style: P === "startFrame" ? {
                  cursor: "url('/选择首尾帧时.ico') 4 4, crosshair"
                } : void 0,
                children: x(P === "startFrame" ? "点击画布节点…" : "从画布上选择")
              })
            })]
          }), c.jsxs("div", {
            className: `w-full aspect-video rounded border relative group overflow-hidden transition-colors ${a ? "bg-black border-zinc-800" : "bg-zinc-100 border-zinc-300"}`,
            onDrop: ze => $e(ze, "endFrame"),
            onDragOver: ze => ze.preventDefault(),
            children: [e.endFrame ? c.jsxs(c.Fragment, {
              children: [c.jsx("img", {
                src: e.endFrame,
                className: "w-full h-full object-cover",
                alt: x("尾帧")
              }), c.jsx("button", {
                onClick: ze => {
                  ze.stopPropagation(), o(n, e.id, {
                    endFrame: ""
                  });
                },
                className: `absolute top-1 right-1 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${a ? "bg-black/60 hover:bg-red-600 text-white" : "bg-white/80 hover:bg-red-500 text-zinc-600 hover:text-white"}`,
                title: x("清除尾帧"),
                children: c.jsx(Na, {
                  size: 10
                })
              }), c.jsx("div", {
                className: `absolute bottom-0 left-0 right-0 px-1 py-0.5 text-[8px] text-center ${a ? "bg-emerald-900/80 text-emerald-300" : "bg-emerald-500/80 text-white"}`,
                children: x("尾帧")
              })]
            }) : c.jsxs("div", {
              className: `w-full h-full flex flex-col items-center justify-center text-[10px] gap-1 ${a ? "text-zinc-700" : "text-zinc-400"}`,
              children: [c.jsx(lo, {
                size: 14
              }), c.jsx("span", {
                children: x("尾帧")
              })]
            }), !e.endFrame && c.jsxs("label", {
              className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity cursor-pointer",
              onClick: ze => ze.stopPropagation(),
              onMouseDown: ze => ze.stopPropagation(),
              children: [c.jsxs("span", {
                className: "flex flex-col items-center gap-1 pointer-events-none",
                children: [c.jsx(Sc, {
                  size: 14
                }), x("选择尾帧")]
              }), c.jsx("input", {
                type: "file",
                className: "hidden",
                accept: "image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg",
                onChange: ze => {
                  var Ke;
                  const Le = (Ke = ze.target.files) == null ? void 0 : Ke[0];
                  if (Le) {
                    const Xe = new FileReader();
                    Xe.onload = De => {
                      var Ye;
                      return o(n, e.id, {
                        endFrame: (Ye = De.target) == null ? void 0 : Ye.result
                      });
                    }, Xe.readAsDataURL(Le);
                  }
                },
                onClick: ze => ze.stopPropagation()
              })]
            }), !e.endFrame && R && c.jsx("div", {
              className: "absolute bottom-1 right-1 z-20",
              children: c.jsx("button", {
                type: "button",
                onClick: ze => {
                  ze.stopPropagation(), ze.preventDefault(), R(n, e.id, "endFrame");
                },
                onMouseDown: ze => ze.stopPropagation(),
                title: x(P === "endFrame" ? "请点击画布上的「图片输入」或「AI绘画」节点" : "从画布上的图片输入、AI绘画节点选取尾帧图"),
                className: `rounded px-1.5 py-0.5 text-[9px] font-medium leading-tight transition-colors border ${P === "endFrame" ? a ? "border-amber-500/80 bg-amber-500/20 text-amber-200" : "border-amber-500 bg-amber-50 text-amber-900" : a ? "border-zinc-600 bg-black/70 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 bg-white/90 text-zinc-700 hover:bg-zinc-100"}`,
                style: P === "endFrame" ? {
                  cursor: "url('/选择首尾帧时.ico') 4 4, crosshair"
                } : void 0,
                children: x(P === "endFrame" ? "点击画布节点…" : "从画布上选择")
              })
            })]
          })]
        }) : c.jsxs("div", {
          className: `w-full rounded border relative group ${ve(e).length > 0 && !e.video_url ? "min-h-[11rem] max-h-[22rem] aspect-auto overflow-visible" : "aspect-video overflow-hidden"} ${a ? "bg-black border-zinc-800" : "bg-zinc-100 border-zinc-300"}`,
          onDrop: rt,
          onDragOver: ze => ze.preventDefault(),
          children: [e.video_url ? c.jsxs(c.Fragment, {
            children: [c.jsx("div", {
              className: "w-full h-full relative",
              onDoubleClick: ze => {
                ze.preventDefault(), ze.stopPropagation(), M && T && (console.log("[Storyboard] Video double-clicked, opening lightbox"), M({
                  url: e.video_url,
                  type: "video",
                  prompt: e.prompt || e.description || `镜头 ${t + 1}`
                }), T(!0));
              },
              children: c.jsx("video", {
                src: e.video_url,
                className: "w-full h-full object-cover rounded",
                controls: !0,
                controlsList: "nofullscreen",
                disablePictureInPicture: !0,
                onPlay: ze => {
                  const Le = ze.currentTarget;
                  Le.setAttribute("data-user-controlled", "true"), Le.setAttribute("data-user-playing", "true");
                },
                onPause: ze => {
                  const Le = ze.currentTarget;
                  Le.setAttribute("data-user-controlled", "true"), Le.setAttribute("data-user-playing", "false");
                },
                preload: "metadata",
                onMouseDown: ze => ze.stopPropagation(),
                onDoubleClick: ze => (ze.preventDefault(), ze.stopPropagation(), !1)
              })
            }), c.jsx("button", {
              onClick: ze => {
                ze.stopPropagation(), o(n, e.id, {
                  video_url: "",
                  status: "draft"
                });
              },
              className: `absolute top-1 right-1 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${a ? "bg-black/60 hover:bg-red-600 text-white" : "bg-white/80 hover:bg-red-500 text-zinc-600 hover:text-white"}`,
              title: x("清除视频"),
              children: c.jsx(Na, {
                size: 10
              })
            })]
          }) : e.status === "generating" ? c.jsx("div", {
            className: `w-full h-full min-h-[10rem] ${a ? "bg-[#1f1f1f]" : "bg-zinc-100"}`,
            "aria-hidden": !0
          }) : (() => {
            const ze = ve(e).slice(0, Te),
              Le = kgi(ze.length);
            return ze.length > 0 ? c.jsx("div", {
              className: "w-full h-full min-h-[10rem] grid gap-1.5 pt-2.5 pl-2.5 pr-1.5 pb-1.5 overflow-y-auto overflow-x-visible rh-scroll-minimal content-start auto-rows-min",
              style: {
                gridTemplateColumns: `repeat(${Le}, minmax(0, 1fr))`
              },
              onDragOver: Ke => {
                Ke.preventDefault(), Ke.stopPropagation(), Ke.dataTransfer.dropEffect = "move";
              },
              children: ze.map((Ke, Xe) => c.jsxs("div", {
                "data-shot-image-reorder-thumb": !0,
                draggable: !0,
                className: `relative aspect-square rounded border group/img cursor-grab active:cursor-grabbing touch-none select-none overflow-visible ${Y === Xe ? "opacity-60 scale-95" : ""} ${a ? "border-zinc-700 bg-[#1f1f1f]" : "border-zinc-300 bg-white"}`,
                onMouseDown: De => De.stopPropagation(),
                onDragStart: De => {
                  if (De.target.closest("button")) {
                    De.preventDefault();
                    return;
                  }
                  De.dataTransfer.setData("text/plain", String(Xe)), De.dataTransfer.effectAllowed = "move", De.stopPropagation(), K(Xe);
                },
                onDragEnd: De => {
                  De.stopPropagation(), K(null);
                },
                onDragEnter: De => {
                  De.preventDefault(), De.stopPropagation();
                },
                onDragOver: De => {
                  De.preventDefault(), De.stopPropagation(), De.dataTransfer.dropEffect = "move";
                },
                onDrop: De => {
                  De.preventDefault(), De.stopPropagation();
                  const Ye = Number(De.dataTransfer.getData("text/plain"));
                  !Number.isNaN(Ye) && Ye !== Xe && me(Ye, Xe);
                },
                children: [c.jsx("div", {
                  className: "absolute inset-0 overflow-hidden rounded-[inherit]",
                  children: c.jsx(c$t, {
                    storedUrl: Ke,
                    displayUrlOverride: FBt(e, Xe, Ke),
                    className: "h-full w-full object-cover pointer-events-none",
                    alt: x("镜头 {0} - 图{1}", t + 1, Xe + 1),
                    isDark: a,
                    onDoubleClick: De => {
                      De.preventDefault(), De.stopPropagation(), M && T && (M({
                        url: myo(Ke),
                        type: "image",
                        prompt: e.prompt || e.description || `镜头 ${t + 1} - 图${Xe + 1}`
                      }), T(!0));
                    }
                  })
                }), c.jsx("span", {
                  className: `pointer-events-none absolute left-0 top-0 z-[5] flex h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[8px] font-semibold leading-none shadow-sm ${a ? "border-zinc-500/80 bg-[#1f1f1f] text-white" : "border-zinc-300 bg-zinc-100 text-zinc-800"}`,
                  children: Xe + 1
                }), c.jsx("button", {
                  type: "button",
                  onClick: De => {
                    De.stopPropagation();
                    const Ye = bUe(e),
                      Ce = Sgi(ze, Ye, Xe);
                    o(n, e.id, {
                      ...Ce,
                      image_url: Ce.image_urls[0] || ""
                    });
                  },
                  className: `absolute right-0 top-0 z-[6] flex h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity ${a ? "bg-red-600/90 hover:bg-red-600 text-white" : "bg-red-500/90 hover:bg-red-500 text-white"}`,
                  title: x("删除图片"),
                  children: c.jsx(Na, {
                    size: 10
                  })
                })]
              }, `${Xe}-${Ke.length}-${Ke.slice(0, 12)}`))
            }) : c.jsxs("div", {
              className: `w-full h-full flex flex-col items-center justify-center text-[10px] gap-1 ${a ? "text-zinc-700" : "text-zinc-400"}`,
              children: [c.jsx(lo, {
                size: 14
              }), c.jsx("span", {
                children: x("点击粘贴/拖入")
              }), c.jsxs("span", {
                className: "text-[9px] opacity-70",
                children: [x("支持1-"), Te, x("张参考图（与视频节点一致）")]
              })]
            });
          })(), !e.video_url && ve(e).length === 0 && e.status !== "generating" && c.jsxs("label", {
            className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity cursor-pointer",
            onClick: ze => ze.stopPropagation(),
            onMouseDown: ze => ze.stopPropagation(),
            children: [c.jsxs("span", {
              className: "flex flex-col items-center gap-1 pointer-events-none",
              children: [c.jsx(Sc, {
                size: 14
              }), x("选择图片")]
            }), c.jsx("input", {
              type: "file",
              className: "hidden",
              accept: "image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg",
              multiple: !0,
              onChange: Me,
              onClick: ze => ze.stopPropagation()
            })]
          }), !e.video_url && e.status !== "generating" && ve(e).length < Te && R && c.jsxs("div", {
            className: "absolute bottom-1 right-1 z-20 flex flex-wrap items-center justify-end gap-1 max-w-[min(100%,11rem)]",
            children: [c.jsx("button", {
              type: "button",
              onClick: ze => {
                ze.stopPropagation(), ze.preventDefault(), R(n, e.id, "ref");
              },
              onMouseDown: ze => ze.stopPropagation(),
              title: x(P === "ref" ? "请点击画布上的「图片输入」或「AI绘画」节点" : "从画布上的图片输入、AI绘画节点选取图片"),
              className: `shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium leading-tight transition-colors border ${P === "ref" ? a ? "border-amber-500/80 bg-amber-500/20 text-amber-200" : "border-amber-500 bg-amber-50 text-amber-900" : a ? "border-zinc-600 bg-black/70 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 bg-white/90 text-zinc-700 hover:bg-zinc-100"}`,
              style: P === "ref" ? {
                cursor: "url('/选择首尾帧时.ico') 4 4, crosshair"
              } : void 0,
              children: x(P === "ref" ? "点击画布节点…" : "从画布上选择")
            }), ve(e).length > 0 && c.jsxs("label", {
              className: `shrink-0 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${a ? "bg-black/60 hover:bg-blue-600 text-white" : "bg-white/80 hover:bg-blue-500 text-zinc-600 hover:text-white"}`,
              onClick: ze => ze.stopPropagation(),
              onMouseDown: ze => ze.stopPropagation(),
              title: x("添加更多图片"),
              children: [c.jsx(eo, {
                size: 12
              }), c.jsx("input", {
                type: "file",
                className: "hidden",
                accept: "image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg",
                multiple: !0,
                onChange: Me,
                onClick: ze => ze.stopPropagation()
              })]
            })]
          })]
        })
      }), c.jsxs("div", {
        className: `flex-1 min-w-0 flex flex-col gap-2 relative ${U ? "min-h-[16rem]" : "min-h-[8rem]"}`,
        children: [c.jsx("div", {
          ref: W,
          className: "qiaodoumayi-aux-gen-toolbar flex flex-nowrap items-center gap-0.5 max-w-full overflow-x-auto overflow-y-visible pb-0.5 rh-scroll-minimal shrink-0 min-h-[28px]",
          onWheel: ze => ze.stopPropagation(),
          children: c.jsxs("div", {
            className: "qiaodoumayi-aux-gen-params flex min-w-0 flex-nowrap items-center gap-0.5",
            children: [B && c.jsx(yvr, {
              scopeId: we,
              dropdownType: "storyboard-shot-video-model",
              value: q,
              models: F,
              isDark: a,
              activeDropdown: j,
              setActiveDropdown: B,
              className: pe ? "w-[6.75rem] shrink-0" : "w-[7.5rem] shrink-0 max-w-[9.5rem]",
              onSelect: ze => {
                if (GS(ze) || ug(ze) || I0(ze) || fg(ze)) {
                  const Ce = {
                    model: ze,
                    ...XSt(ze)
                  };
                  Ece(ze, Ce), o(n, e.id, Ce);
                  return;
                }
                const Le = rl(ze),
                  Ke = Le.includes(Z) ? Z : Le[0] || "1080P",
                  Xe = ih(ze, Ke),
                  De = ah(ze),
                  Ye = {
                    model: ze,
                    resolution: Ke,
                    duration: Xe.includes(re) ? re : Xe[0],
                    ratio: De.includes(ie) ? ie : De[0]
                  };
                Ece(ze, Ye), o(n, e.id, Ye);
              }
            }), B && c.jsxs(c.Fragment, {
              children: [fe.length > 0 ? c.jsx(qs, {
                scopeId: we,
                dropdownType: "storyboard-shot-ratio",
                value: ie,
                options: fe.map(ze => ({
                  value: ze,
                  label: ze
                })),
                isDark: a,
                activeDropdown: j,
                setActiveDropdown: B,
                onSelect: ze => o(n, e.id, {
                  ratio: ze
                }),
                minMenuWidth: 72,
                className: "w-[3.5rem] shrink-0"
              }) : null, c.jsx(qs, {
                scopeId: we,
                dropdownType: "storyboard-shot-duration",
                value: re,
                options: ye.map(ze => ({
                  value: ze,
                  label: ze.replace("s", "秒")
                })),
                isDark: a,
                activeDropdown: j,
                setActiveDropdown: B,
                onSelect: ze => o(n, e.id, {
                  duration: ze
                }),
                minMenuWidth: 72,
                className: "w-[3.5rem] shrink-0"
              })]
            }), le ? c.jsx(Ku, {
              nodeId: we,
              platformGroup: J,
              modelName: (ne == null ? void 0 : ne.modelName) || q,
              modelId: q,
              modelConfigId: q,
              uiResolution: Z,
              isDark: a,
              onGroupChange: ze => o(n, e.id, {
                platformGroup: ze
              }),
              compact: pe,
              buttonVariant: "square",
              menuPlacement: "below"
            }) : null, B && c.jsx(uyo, {
              currentModel: q,
              scopeId: we,
              isDark: a,
              activeDropdown: j,
              setActiveDropdown: B,
              resolution: Z,
              seedanceVolcGenerateAudio: e.seedanceVolcGenerateAudio,
              seedanceVolcIsUploadAsset: e.seedanceVolcIsUploadAsset,
              seedanceVolcNsfw: e.seedanceVolcNsfw,
              seedanceVolcMcpWebSearch: e.seedanceVolcMcpWebSearch,
              seedanceVolcCameraFixed: e.seedanceVolcCameraFixed,
              seedanceOutputFormat: e.seedanceOutputFormat,
              onPatch: ze => o(n, e.id, ze)
            }), B && Ae && Fe.length > 0 && c.jsx(qs, {
              scopeId: we,
              dropdownType: "storyboard-shot-resolution",
              value: Fe.includes(Z) ? Z : Fe[0],
              options: Fe.map(ze => ({
                value: ze,
                label: ze
              })),
              isDark: a,
              activeDropdown: j,
              setActiveDropdown: B,
              onSelect: ze => {
                const Le = {
                  resolution: ze
                };
                if (be) {
                  const Ke = ih(q, ze);
                  Le.duration = Ke.includes(re) ? re : Ke[0];
                }
                o(n, e.id, Le);
              },
              minMenuWidth: 72,
              className: "w-[3.75rem] shrink-0"
            }), (he || sIe(q)) && f && c.jsxs(c.Fragment, {
              children: [c.jsxs("button", {
                type: "button",
                onClick: ze => {
                  ze.stopPropagation(), f();
                },
                onMouseDown: ze => ze.stopPropagation(),
                className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border transition-colors ${(e.klingSubjects || []).length > 0 ? a ? "bg-transparent border-white/50 text-white" : "bg-cyan-500/30 border-cyan-400 text-cyan-700" : a ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300"}`,
                title: (e.klingSubjects || []).length > 0 ? x("已选择 {0} 个主体", (e.klingSubjects || []).length) : x("选择可灵主体"),
                children: [c.jsx(Kh, {
                  size: 12
                }), c.jsx("span", {
                  children: (e.klingSubjects || []).length > 0 ? `${e.klingSubjects.length}` : x("主体")
                })]
              }), (e.klingSubjects || []).length > 0 && p && c.jsxs("div", {
                className: "flex items-center gap-1 flex-wrap",
                children: [e.klingSubjects.slice(0, 3).map(ze => {
                  const Le = p.find(Ke => Ke.id === ze);
                  return Le ? c.jsx("span", {
                    className: `px-1.5 py-0.5 text-[9px] rounded border ${a ? "bg-transparent border-white/30 text-white" : "bg-cyan-50 text-cyan-700 border-cyan-200"}`,
                    title: Le.name,
                    children: Le.name
                  }, ze) : null;
                }), (e.klingSubjects || []).length > 3 && c.jsxs("span", {
                  className: `text-[9px] ${a ? "text-white/70" : "text-zinc-500"}`,
                  children: ["+", (e.klingSubjects || []).length - 3]
                })]
              })]
            }), he && y && c.jsxs("button", {
              type: "button",
              onClick: ze => {
                ze.stopPropagation(), y();
              },
              onMouseDown: ze => ze.stopPropagation(),
              className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border transition-colors ${e.klingVideoFile || e.klingVideoUrl ? a ? "bg-transparent border-white/50 text-white" : "bg-emerald-500/30 border-emerald-400 text-emerald-700" : a ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300"}`,
              title: (nt = e.klingVideoFile) != null && nt.name || e.klingVideoUrl ? x("已上传视频") : x("上传视频"),
              children: [c.jsx(Oo, {
                size: 12
              }), c.jsx("span", {
                children: e.klingVideoFile || e.klingVideoUrl ? x("视频✓") : x("视频")
              })]
            }), he && b && c.jsxs("button", {
              type: "button",
              onClick: ze => {
                ze.stopPropagation(), b();
              },
              onMouseDown: ze => ze.stopPropagation(),
              className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border transition-colors ${(e.klingImages || []).length > 0 ? a ? "bg-transparent border-white/50 text-white" : "bg-blue-500/30 border-blue-400 text-blue-700" : a ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300"}`,
              title: (e.klingImages || []).length > 0 ? x("已上传 {0} 张图片", e.klingImages.length) : x("上传图片"),
              children: [c.jsx(mu, {
                size: 12
              }), c.jsx("span", {
                children: (e.klingImages || []).length > 0 ? x("图片({0})", e.klingImages.length) : x("图片")
              })]
            }), _e && (() => {
              const ze = e.wan26AudioConfig || "none",
                Le = e.wan26AudioFile || null,
                Ke = Xe => {
                  var Ye;
                  const De = (Ye = Xe.target.files) == null ? void 0 : Ye[0];
                  !De || !_ || (_(De), Q.current && (Q.current.value = ""));
                };
              return c.jsxs(c.Fragment, {
                children: [c.jsxs("select", {
                  value: ze,
                  onChange: Xe => {
                    const De = Xe.target.value;
                    o(n, e.id, {
                      wan26AudioConfig: De,
                      ...(De !== "upload" ? {
                        wan26AudioFile: null,
                        wan26AudioSegment: null
                      } : {})
                    }), De === "upload" && setTimeout(() => {
                      var Ye;
                      return (Ye = Q.current) == null ? void 0 : Ye.click();
                    }, 100);
                  },
                  onClick: Xe => Xe.stopPropagation(),
                  onMouseDown: Xe => Xe.stopPropagation(),
                  className: `text-xs px-2 py-1 rounded border outline-none transition-colors ${a ? ze !== "none" ? "bg-transparent border-white/50 text-white" : "bg-transparent border-white/30 text-white hover:bg-white/5" : ze !== "none" ? "bg-purple-500/30 border-purple-400 text-purple-700" : "bg-white border-zinc-300 text-zinc-800 hover:border-zinc-400"}`,
                  title: x(ze === "none" ? "无音频" : ze === "auto" ? "自动配乐" : Le ? "已上传音频" : "上传音频"),
                  children: [c.jsx("option", {
                    value: "none",
                    children: x("无音频")
                  }), c.jsx("option", {
                    value: "auto",
                    children: x("自动配乐")
                  }), c.jsx("option", {
                    value: "upload",
                    children: x(Le ? "音频✓" : "上传音频")
                  })]
                }), c.jsx("input", {
                  ref: Q,
                  type: "file",
                  accept: "audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac",
                  onChange: Ke,
                  className: "hidden"
                })]
              });
            })(), _e && c.jsxs("label", {
              className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border cursor-pointer transition-colors ${a ? e.wan26MultiShot ? "bg-transparent border-white/50 text-white" : "bg-transparent border-white/30 hover:bg-white/5 text-white" : e.wan26MultiShot ? "bg-purple-500/30 border-purple-400 text-purple-700" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300"}`,
              onClick: ze => ze.stopPropagation(),
              onMouseDown: ze => ze.stopPropagation(),
              title: x("多镜头叙事：生成包含多个镜头的视频"),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: !!e.wan26MultiShot,
                onChange: ze => o(n, e.id, {
                  wan26MultiShot: ze.target.checked
                }),
                className: "w-3 h-3 cursor-pointer",
                onClick: ze => ze.stopPropagation()
              }), c.jsx("span", {
                children: x("多镜头")
              })]
            }), (q === "sora-2" || q === "sora-2-pro") && c.jsxs("label", {
              className: `sketch-chat-web-chip shrink-0${a ? " sketch-chat-web-chip--dark" : ""}`,
              onMouseDown: ze => ze.stopPropagation(),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: e.enableHD || !1,
                onChange: ze => o(n, e.id, {
                  enableHD: ze.target.checked
                }),
                onClick: ze => ze.stopPropagation(),
                className: "w-3 h-3 rounded"
              }), c.jsx("span", {
                className: "whitespace-nowrap",
                children: "HD"
              })]
            }), ke && c.jsxs("label", {
              className: `sketch-chat-web-chip shrink-0${a ? " sketch-chat-web-chip--dark" : ""}`,
              title: x("Veo/Hailuo/Kling/Vidu 支持首尾帧"),
              onMouseDown: ze => ze.stopPropagation(),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: e.enableFrames || !1,
                onChange: ze => o(n, e.id, {
                  enableFrames: ze.target.checked
                }),
                onClick: ze => ze.stopPropagation(),
                className: "w-3 h-3 rounded"
              }), c.jsx("span", {
                className: "whitespace-nowrap",
                children: x("首尾帧")
              })]
            }), c.jsx("button", {
              type: "button",
              title: x(U ? "收起提示词编辑" : "展开提示词（占满当前镜头编辑区）"),
              "aria-label": x(U ? "收起提示词" : "展开提示词"),
              onClick: ze => {
                ze.stopPropagation(), H(Le => {
                  const Ke = !Le;
                  return Ke && B && B(null), Ke;
                });
              },
              onMouseDown: ze => ze.stopPropagation(),
              className: "ml-auto shrink-0 sticky right-0 z-20 inline-flex items-center justify-center !px-1.5",
              children: U ? c.jsx(AT, {
                size: 14
              }) : c.jsx(Wm, {
                size: 14
              })
            })]
          })
        }), c.jsx("div", {
          className: `relative flex-1 flex flex-col gap-1 min-w-0 min-h-0 ${U ? "" : "min-h-[5.5rem]"}`,
          children: U ? c.jsxs("div", {
            className: `flex flex-1 flex-col gap-1.5 min-h-[14rem] rounded-lg border p-2 box-border ${a ? "bg-zinc-950/80 border-zinc-600" : "bg-white border-zinc-300"}`,
            onMouseDown: ze => ze.stopPropagation(),
            children: [c.jsx("span", {
              className: `text-[10px] font-medium shrink-0 ${a ? "text-zinc-400" : "text-zinc-500"}`,
              children: x("提示词")
            }), c.jsx(E1t, {
              "data-node-type": "storyboard-prompt",
              "data-node-id": n,
              "data-shot-id": e.id,
              "data-scrollable": "true",
              autoFocus: !0,
              wrapperClassName: "flex-1 flex flex-col min-h-0",
              className: `flex-1 min-h-[12rem] w-full text-sm leading-relaxed outline-none resize-none rounded border px-2.5 py-2 overflow-y-auto rh-scroll-minimal custom-scrollbar ${a ? "bg-black/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600" : "bg-zinc-50 border-zinc-200 text-zinc-800 placeholder:text-zinc-400"}`,
              value: e.prompt || "",
              placeholder: x("等待生成提示词… 输入 @ 打开我的资产库"),
              onChange: ze => o(n, e.id, {
                prompt: ze
              }),
              isDark: a,
              items: N,
              categories: G,
              onSelectAsset: ze => void (z == null ? void 0 : z(ze)),
              enableAssetAtMention: !!z && N.length > 0,
              referenceImages: Ne
            })]
          }) : c.jsxs(c.Fragment, {
            children: [q.includes("sora") && h.length > 0 && c.jsxs("div", {
              className: "flex items-center gap-2 overflow-x-auto py-1 flex-1 rh-scroll-minimal border-b border-dashed mb-2",
              style: {
                borderColor: a ? "rgba(63, 63, 70, 0.5)" : "rgba(161, 161, 170, 0.5)"
              },
              onClick: ze => ze.stopPropagation(),
              onMouseDown: ze => ze.stopPropagation(),
              children: [c.jsx("span", {
                className: "text-[10px] shrink-0 text-zinc-500",
                children: x("角色库")
              }), h.slice(0, 8).map(ze => {
                const Le = `@${ze.name}`,
                  Ke = e.description || "",
                  Xe = Ke.includes(Le);
                return c.jsxs("button", {
                  type: "button",
                  onClick: De => {
                    De.stopPropagation();
                    const Ye = document.querySelector(`textarea[data-node-id="${n}"][data-shot-id="${e.id}"]`),
                      Ce = Ye ? Ye.value : Ke,
                      He = (Ye == null ? void 0 : Ye.selectionStart) ?? Ce.length,
                      Ve = Ce.slice(0, He) + ` ${Le} ` + Ce.slice(He);
                    o(n, e.id, {
                      description: Ve
                    }), setTimeout(() => {
                      if (Ye) {
                        const it = He + Le.length + 2;
                        Ye.setSelectionRange(it, it), Ye.focus();
                      }
                    }, 0);
                  },
                  className: `relative shrink-0 transition-all ${Xe ? "scale-110 opacity-100" : "opacity-70 hover:opacity-100"}`,
                  title: ze.name,
                  onMouseDown: De => De.stopPropagation(),
                  children: [ze.imageUrl ? c.jsx("img", {
                    src: ze.imageUrl,
                    alt: ze.name,
                    className: `w-7 h-7 rounded-full object-cover border-2 ${Xe ? "border-blue-500 ring-2 ring-blue-500" : "border-transparent"}`
                  }) : c.jsx("div", {
                    className: `w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] ${a ? "bg-zinc-700 border-zinc-600" : "bg-zinc-200 border-zinc-300"}`,
                    children: (ze.name || "?").slice(0, 1)
                  }), c.jsx("div", {
                    className: "absolute -bottom-0.5 -right-0.5 bg-black/50 rounded-full p-0.5",
                    children: c.jsx(w5e, {
                      size: 8,
                      className: "text-green-400"
                    })
                  })]
                }, ze.id);
              })]
            }), c.jsx("textarea", {
              "data-node-type": "storyboard",
              "data-node-id": n,
              "data-shot-id": e.id,
              "data-scrollable": "true",
              className: `text-sm outline-none resize-none bg-transparent transition-all h-12 ${a ? "text-zinc-200 placeholder:text-zinc-700" : "text-zinc-800 placeholder:text-zinc-400"}`,
              value: e.description_zh || e.description || "",
              placeholder: x("画面描述..."),
              onChange: ze => o(n, e.id, {
                description: ze.target.value,
                description_zh: ze.target.value
              }),
              onClick: ze => ze.stopPropagation(),
              onMouseDown: ze => ze.stopPropagation()
            }), c.jsx("div", {
              className: `p-2 rounded border text-[10px] ${a ? "bg-transparent border-white/30" : "bg-zinc-50 border-zinc-200"}`,
              children: c.jsx(E1t, {
                "data-node-type": "storyboard-prompt",
                "data-node-id": n,
                "data-shot-id": e.id,
                "data-scrollable": "true",
                className: `w-full text-[10px] outline-none resize-none bg-transparent h-16 ${a ? "text-zinc-300" : "text-zinc-700"}`,
                value: e.prompt || "",
                placeholder: x("等待生成提示词… 输入 @ 打开资产库"),
                onChange: ze => o(n, e.id, {
                  prompt: ze
                }),
                isDark: a,
                items: N,
                categories: G,
                onSelectAsset: ze => void (z == null ? void 0 : z(ze)),
                enableAssetAtMention: !!z && N.length > 0,
                referenceImages: Ne
              })
            }), c.jsxs("div", {
              className: "flex gap-1 flex-wrap items-center mt-1",
              children: [(e.tags || []).map((ze, Le) => c.jsx("span", {
                className: `px-1.5 py-0.5 text-[10px] rounded border ${a ? "bg-transparent text-white border-white/30" : "bg-zinc-100 text-zinc-700 border-zinc-300"}`,
                children: ze
              }, Le)), e.camera && c.jsxs("span", {
                className: `px-1.5 py-0.5 text-[10px] rounded border flex items-center gap-1 ${a ? "bg-transparent text-white border-white/30" : "bg-zinc-100 text-zinc-700 border-zinc-300"}`,
                children: [c.jsx(Oo, {
                  size: 8
                }), " ", e.camera]
              }), e.time_range && c.jsx("span", {
                className: `text-[10px] ml-auto font-mono px-1.5 py-0.5 rounded border ${a ? "bg-transparent border-white/30 text-white" : "text-zinc-400"}`,
                children: e.time_range
              })]
            })]
          })
        })]
      }), c.jsxs("div", {
        className: `flex flex-col gap-2 justify-center border-l pl-2 shrink-0 relative ${a ? "border-zinc-800" : "border-zinc-200"}`,
        children: [c.jsx("button", {
          onClick: ze => {
            ze.stopPropagation(), l(n, e);
          },
          className: `p-1.5 rounded transition-all active:scale-95 border ${e.status === "generating" ? a ? "bg-transparent border-white/20 cursor-not-allowed text-white/50" : "bg-zinc-100 cursor-not-allowed border-zinc-200 text-zinc-400" : a ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-400"}`,
          onMouseDown: ze => ze.stopPropagation(),
          title: x("生成视频"),
          disabled: e.status === "generating",
          children: e.status === "generating" ? c.jsx(Ua, {
            size: 14,
            className: "animate-spin"
          }) : c.jsx(Ol, {
            size: 14,
            fill: "currentColor"
          })
        }), E && c.jsx("button", {
          onClick: ze => {
            ze.stopPropagation(), E(e, t);
          },
          className: `p-1.5 rounded transition-colors border ${a ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-400"}`,
          onMouseDown: ze => ze.stopPropagation(),
          title: x("发送到 AI 视频节点"),
          children: c.jsx(zu, {
            size: 14
          })
        }), I && c.jsx("button", {
          onClick: ze => {
            ze.stopPropagation(), I(e);
          },
          disabled: V,
          className: `p-1.5 rounded transition-colors border ${V ? a ? "bg-transparent border-white/20 cursor-not-allowed text-white/50" : "bg-zinc-100 cursor-not-allowed text-zinc-400 border-zinc-200" : a ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-400"}`,
          onMouseDown: ze => ze.stopPropagation(),
          title: x("生成分镜序列"),
          children: V ? c.jsx(Ua, {
            size: 14,
            className: "animate-spin"
          }) : c.jsx(Od, {
            size: 14
          })
        }), c.jsx("button", {
          onClick: () => d(n, e.id),
          className: `p-1.5 transition-colors border rounded ${a ? "bg-transparent border-white/30 hover:bg-white/5 text-white hover:text-red-400" : "bg-white text-zinc-500 hover:text-red-600 border-zinc-300 hover:border-red-300 hover:bg-zinc-50"}`,
          onMouseDown: ze => ze.stopPropagation(),
          title: x("删除镜头"),
          children: c.jsx(Qo, {
            size: 14
          })
        })]
      })]
    });
  },
  yyo = ({
    shots: e,
    isDark: t,
    onShotClick: n,
    node: r,
    apiConfigs: a,
    globalApiKey: i,
    setNodes: o,
    generateId: s
  }) => {
    on();
    const l = g.useCallback(u => GCe(u), []),
      d = g.useMemo(() => e.length <= 4 ? 2 : e.length <= 9 ? 3 : e.length <= 16 ? 4 : 5, [e.length]);
    return c.jsxs("div", {
      className: "flex flex-col h-full",
      children: [e.length > 0 && c.jsx("div", {
        className: `p-2 border-b flex items-center justify-between shrink-0 ${t ? "border-zinc-800 bg-[#1f1f1f]/50" : "border-zinc-200 bg-zinc-50"}`,
        children: c.jsxs("span", {
          className: `text-xs ${t ? "text-zinc-400" : "text-zinc-600"}`,
          children: [x("共 "), e.length, x(" 个镜头")]
        })
      }), c.jsx("div", {
        className: "flex-1 overflow-y-auto minimal-scrollbar p-3 min-h-0",
        onWheel: u => u.stopPropagation(),
        children: e.length > 0 ? c.jsx("div", {
          className: "grid gap-2",
          style: {
            gridTemplateColumns: `repeat(${d}, 1fr)`
          },
          children: e.map((u, h) => c.jsxs("div", {
            className: `aspect-video rounded border relative group cursor-pointer transition-all ${t ? "border-zinc-700 hover:border-zinc-600 hover:shadow-lg" : "border-zinc-300 hover:border-zinc-400 hover:shadow-md"}`,
            onClick: () => n(u),
            onMouseDown: p => p.stopPropagation(),
            title: u.description ? x("镜头 {0}: {1}", h + 1, u.description) : x("镜头 {0}", h + 1),
            children: [(() => {
              const p = l(u);
              return p.length > 0 ? c.jsx("div", {
                className: `w-full h-full ${p.length === 1 ? "" : (p.length === 2, "grid grid-cols-2 gap-0.5")}`,
                children: p.slice(0, $z(u.model || void 0)).map((m, f) => c.jsx(c$t, {
                  storedUrl: m,
                  displayUrlOverride: FBt(u, f, m),
                  className: `object-cover rounded ${p.length === 1 || p.length === 2 ? "w-full h-full" : f === 0 ? "col-span-2 h-1/2" : "w-full h-1/2"}`,
                  alt: x("镜头 {0} - 图片 {1}", h + 1, f + 1),
                  isDark: t
                }, f))
              }) : c.jsxs("div", {
                className: `w-full h-full flex flex-col items-center justify-center ${t ? "bg-zinc-800" : "bg-zinc-100"}`,
                children: [c.jsx(Bv, {
                  size: 20,
                  className: `mb-1 ${t ? "text-zinc-500" : "text-zinc-400"}`
                }), c.jsxs("span", {
                  className: `text-xs ${t ? "text-zinc-400" : "text-zinc-500"}`,
                  children: [x("镜头 "), h + 1]
                })]
              });
            })(), c.jsx("div", {
              className: `absolute top-1 left-1 px-1.5 py-0.5 rounded text-xs font-medium ${t ? "bg-black/60 text-white" : "bg-white/80 text-zinc-700"}`,
              children: h + 1
            }), u.status === "generating" && c.jsx("div", {
              className: `absolute top-1 right-1 px-1.5 py-0.5 rounded ${t ? "bg-zinc-800/90 text-zinc-100" : "bg-zinc-900/85 text-white"}`,
              children: c.jsx(Ua, {
                size: 10,
                className: "animate-spin"
              })
            }), !!(u.description_zh || u.description) && c.jsxs("div", {
              className: "absolute bottom-0 left-0 right-0 p-2 rounded-b bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-white",
              children: [c.jsx("div", {
                className: "text-xs font-medium line-clamp-2",
                children: u.description_zh || u.description || ""
              }), !!(u.model || u.ratio || u.duration) && c.jsxs("div", {
                className: "flex flex-wrap gap-1 mt-1",
                children: [!!u.model && c.jsx("span", {
                  className: "px-1 py-0.5 bg-blue-500/30 rounded text-[10px]",
                  children: u.model.toUpperCase()
                }), !!u.ratio && c.jsx("span", {
                  className: "px-1 py-0.5 bg-green-500/30 rounded text-[10px]",
                  children: u.ratio
                }), !!u.duration && c.jsx("span", {
                  className: "px-1 py-0.5 bg-purple-500/30 rounded text-[10px]",
                  children: u.duration
                })]
              })]
            })]
          }, u.id))
        }) : c.jsxs("div", {
          className: `flex-1 rounded-lg border-2 border-dashed flex flex-col items-center justify-center py-8 ${t ? "border-zinc-700" : "border-zinc-300"}`,
          children: [c.jsx(Bv, {
            size: 32,
            className: `mb-2 ${t ? "text-zinc-600" : "text-zinc-400"}`
          }), c.jsx("span", {
            className: `text-xs ${t ? "text-zinc-500" : "text-zinc-400"}`,
            children: x("暂无分镜，请添加或同步分析结果")
          })]
        })
      })]
    });
  },
  byo = Ia.memo(gyo, (e, t) => e.shot === t.shot && e.isDark === t.isDark && e.idx === t.idx && e.apiConfigs === t.apiConfigs && e.onSendShotToGenVideo === t.onSendShotToGenVideo && e.handleOpenGenerateSequenceModal === t.handleOpenGenerateSequenceModal && e.activeStoryboardCanvasPickKind === t.activeStoryboardCanvasPickKind && e.onStartStoryboardCanvasPick === t.onStartStoryboardCanvasPick && e.activeDropdown === t.activeDropdown && e.videoModelOptions === t.videoModelOptions && e.assetAtMentionItems === t.assetAtMentionItems && e.onSelectAssetAtMention === t.onSelectAssetAtMention),
  vyo = ({
    shots: e,
    isDark: t,
    updateShot: n,
    deleteShot: r,
    nodeId: a,
    selectedShots: i,
    setSelectedShots: o,
    onBatchDelete: s,
    onBatchDownload: l,
    isBatchDownloading: d
  }) => {
    on();
    const u = g.useCallback(m => GCe(m), []),
      h = g.useCallback(m => {
        o(m ? new Set(e.map(f => f.id)) : new Set());
      }, [e, o]),
      p = g.useCallback(m => {
        o(f => {
          const y = new Set(f);
          return y.has(m) ? y.delete(m) : y.add(m), y;
        });
      }, [o]);
    return c.jsxs("div", {
      className: "flex flex-col h-full",
      children: [e.length > 0 && c.jsxs("div", {
        className: `p-2 border-b flex items-center justify-between shrink-0 ${t ? "border-zinc-800 bg-[#1f1f1f]/50" : "border-zinc-200 bg-zinc-50"}`,
        children: [c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx("input", {
            type: "checkbox",
            checked: i.size === e.length && e.length > 0,
            onChange: m => h(m.target.checked),
            className: "cursor-pointer",
            onMouseDown: m => m.stopPropagation()
          }), c.jsxs("span", {
            className: `text-sm ${t ? "text-zinc-400" : "text-zinc-600"}`,
            children: [x("已选择 "), i.size, x(" 个镜头")]
          })]
        }), c.jsxs("div", {
          className: "flex gap-2",
          children: [c.jsxs("button", {
            onClick: l,
            disabled: i.size === 0 || d,
            className: `px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 ${i.size === 0 || d ? t ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" : "bg-zinc-200 text-zinc-400 cursor-not-allowed" : t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200" : "bg-zinc-900 hover:bg-black text-white"}`,
            onMouseDown: m => m.stopPropagation(),
            title: x("下载选中镜头中已生成的视频"),
            children: [d ? c.jsx(Ua, {
              size: 12,
              className: "animate-spin"
            }) : c.jsx(ws, {
              size: 12
            }), x(d ? "下载中..." : "批量下载")]
          }), c.jsxs("button", {
            onClick: s,
            disabled: i.size === 0,
            className: `px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 ${i.size === 0 ? t ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" : "bg-zinc-200 text-zinc-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"}`,
            onMouseDown: m => m.stopPropagation(),
            children: [c.jsx(Qo, {
              size: 12
            }), x("批量删除")]
          })]
        })]
      }), c.jsx("div", {
        className: "flex-1 overflow-y-auto overflow-x-auto minimal-scrollbar min-h-0",
        style: {
          height: 0
        },
        children: e.length > 0 ? c.jsxs("table", {
          className: `w-full border-collapse text-sm ${t ? "text-zinc-300" : "text-zinc-700"}`,
          children: [c.jsx("thead", {
            className: `sticky top-0 z-10 ${t ? "bg-zinc-800" : "bg-zinc-100"}`,
            children: c.jsxs("tr", {
              children: [c.jsx("th", {
                className: "p-3 border-b text-left w-12",
                children: c.jsx("input", {
                  type: "checkbox",
                  checked: i.size === e.length && e.length > 0,
                  onChange: m => h(m.target.checked),
                  className: "cursor-pointer",
                  onMouseDown: m => m.stopPropagation()
                })
              }), c.jsx("th", {
                className: `p-3 border-b text-left w-16 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("镜号")
              }), c.jsx("th", {
                className: `p-3 border-b text-left w-32 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("画面")
              }), c.jsx("th", {
                className: `p-3 border-b text-left min-w-[200px] ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("中英画面描述")
              }), c.jsx("th", {
                className: `p-3 border-b text-left min-w-[150px] ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("对白/旁白")
              }), c.jsx("th", {
                className: `p-3 border-b text-left w-24 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("角色")
              }), c.jsx("th", {
                className: `p-3 border-b text-left w-20 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("景别")
              }), c.jsx("th", {
                className: `p-3 border-b text-left w-20 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("角度")
              }), c.jsx("th", {
                className: `p-3 border-b text-left w-20 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("运镜")
              }), c.jsx("th", {
                className: `p-3 border-b text-left w-16 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("时长")
              }), c.jsx("th", {
                className: `p-3 border-b text-left w-24 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: x("操作")
              })]
            })
          }), c.jsx("tbody", {
            children: e.map(m => c.jsxs("tr", {
              className: `hover:bg-opacity-50 transition-colors ${t ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
              children: [c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsx("input", {
                  type: "checkbox",
                  checked: i.has(m.id),
                  onChange: () => p(m.id),
                  className: "cursor-pointer",
                  onMouseDown: f => f.stopPropagation()
                })
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: String(m.scene_index ?? "")
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: (() => {
                  const f = u(m);
                  return f.length > 0 ? c.jsx("div", {
                    className: `flex gap-0.5 ${f.length === 1 ? "w-16" : (f.length === 2, "w-32")}`,
                    children: f.slice(0, $z(m.model || void 0)).map((y, b) => c.jsx(c$t, {
                      storedUrl: y,
                      displayUrlOverride: FBt(m, b, y),
                      alt: x("图片 {0}", b + 1),
                      className: `object-cover rounded ${f.length === 1 ? "w-16 h-10" : f.length === 2 ? "w-15 h-10 flex-1" : "w-10 h-10 flex-1"}`,
                      isDark: t
                    }, b))
                  }) : c.jsx("div", {
                    className: `w-16 h-10 rounded flex items-center justify-center text-xs ${t ? "bg-zinc-700 text-zinc-500" : "bg-zinc-200 text-zinc-400"}`,
                    children: x("无图")
                  });
                })()
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsxs("div", {
                  className: "space-y-1",
                  children: [c.jsx("input", {
                    type: "text",
                    value: m.description_zh || m.description || "",
                    onChange: f => n(a, m.id, {
                      description_zh: f.target.value,
                      description: f.target.value
                    }),
                    className: `w-full px-2 py-1.5 text-sm border rounded outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                    placeholder: x("中文描述"),
                    onMouseDown: f => f.stopPropagation()
                  }), c.jsx("input", {
                    type: "text",
                    value: m.description_en || "",
                    onChange: f => n(a, m.id, {
                      description_en: f.target.value
                    }),
                    className: `w-full px-2 py-1.5 text-sm border rounded outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                    placeholder: "English Description",
                    onMouseDown: f => f.stopPropagation()
                  })]
                })
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsx("input", {
                  type: "text",
                  value: m.dialogue || "",
                  onChange: f => n(a, m.id, {
                    dialogue: f.target.value
                  }),
                  className: `w-full px-1 py-0.5 text-xs border rounded outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                  placeholder: x("对白/旁白"),
                  onMouseDown: f => f.stopPropagation()
                })
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsx("input", {
                  type: "text",
                  value: m.character || "",
                  onChange: f => n(a, m.id, {
                    character: f.target.value
                  }),
                  className: `w-full px-1 py-0.5 text-xs border rounded outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                  placeholder: x("角色"),
                  onMouseDown: f => f.stopPropagation()
                })
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsx("input", {
                  type: "text",
                  value: m.shot_size || "",
                  onChange: f => n(a, m.id, {
                    shot_size: f.target.value
                  }),
                  className: `w-full px-1 py-0.5 text-xs border rounded outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                  placeholder: x("景别"),
                  onMouseDown: f => f.stopPropagation()
                })
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsx("input", {
                  type: "text",
                  value: m.camera_angle || "",
                  onChange: f => n(a, m.id, {
                    camera_angle: f.target.value
                  }),
                  className: `w-full px-1 py-0.5 text-xs border rounded outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                  placeholder: x("角度"),
                  onMouseDown: f => f.stopPropagation()
                })
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsx("input", {
                  type: "text",
                  value: m.camera || "",
                  onChange: f => n(a, m.id, {
                    camera: f.target.value
                  }),
                  className: `w-full px-1 py-0.5 text-xs border rounded outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                  placeholder: x("运镜"),
                  onMouseDown: f => f.stopPropagation()
                })
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsx("input", {
                  type: "text",
                  value: m.duration || "",
                  onChange: f => n(a, m.id, {
                    duration: f.target.value
                  }),
                  className: `w-full px-1 py-0.5 text-xs border rounded outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                  placeholder: x("时长"),
                  onMouseDown: f => f.stopPropagation()
                })
              }), c.jsx("td", {
                className: `p-3 border-b ${t ? "border-zinc-700" : "border-zinc-300"}`,
                children: c.jsx("div", {
                  className: "flex items-center gap-1.5",
                  children: c.jsx("button", {
                    onClick: () => r(a, m.id),
                    className: "p-1.5 rounded text-sm transition-colors bg-red-600 hover:bg-red-700 text-white",
                    onMouseDown: f => f.stopPropagation(),
                    title: x("删除"),
                    children: c.jsx(Qo, {
                      size: 14
                    })
                  })
                })
              })]
            }, m.id))
          })]
        }) : c.jsxs("div", {
          className: `flex-1 rounded-lg border-2 border-dashed flex flex-col items-center justify-center py-8 ${t ? "border-zinc-700" : "border-zinc-300"}`,
          children: [c.jsx(Hue, {
            size: 32,
            className: `mb-2 ${t ? "text-zinc-600" : "text-zinc-400"}`
          }), c.jsx("span", {
            className: `text-sm ${t ? "text-zinc-500" : "text-zinc-400"}`,
            children: x("暂无分镜，请添加或同步分析结果")
          })]
        })
      })]
    });
  },
  wyo = ({
    node: e,
    isDark: t,
    updateNode: n,
    connections: r = [],
    nodes: a = [],
    apiConfigs: i = [],
    globalApiKey: o = "",
    getConnectedInputImages: s,
    getConnectedInputItems: l,
    generateFromScriptForChart: d,
    generateChartBatch: u,
    setNodes: h,
    setConnections: p,
    generateId: m,
    chartArtStyles: f = [],
    renderQuality: y = "high"
  }) => {
    var Cn, un, Jn, Kn, en, Vn, Tt, Ue, et, ft, ht, wt, jt, bt, Bt, wn;
    on();
    const b = 12,
      v = 64,
      _ = ((Cn = e.settings) == null ? void 0 : Cn.gridMode) ?? "grid",
      w = Math.max(1, Math.min(b, ((un = e.settings) == null ? void 0 : un.rows) ?? 3)),
      k = Math.max(1, Math.min(b, ((Jn = e.settings) == null ? void 0 : Jn.cols) ?? 3)),
      A = Math.max(1, Math.min(v, ((Kn = e.settings) == null ? void 0 : Kn.totalGrids) ?? 9)),
      S = _ === "grid" ? A : w * k,
      C = _ === "grid" ? 3 : k,
      I = Math.max(56, Math.min(200, ((en = e.settings) == null ? void 0 : en.cellRowHeight) ?? 96)),
      E = g.useMemo(() => {
        var dt;
        const at = ((dt = e.settings) == null ? void 0 : dt.cells) || [],
          Pt = [];
        for (let xt = 0; xt < S; xt++) {
          const yn = at[xt] || {
            id: `c-${xt}`,
            prompt: ""
          };
          Pt.push({
            id: yn.id || `c-${xt}`,
            prompt: yn.prompt ?? "",
            refs: yn.refs,
            linkNodeId: yn.linkNodeId
          });
        }
        return Pt;
      }, [(Vn = e.settings) == null ? void 0 : Vn.cells, S]),
      M = ((Tt = e.settings) == null ? void 0 : Tt.model) || "qwen-image-edit",
      T = ah(M),
      P = rl(M),
      R = Pf(M),
      j = Up(M),
      B = pI(M),
      F = fm(M),
      N = pk(M),
      G = vy(M),
      z = (M.includes("gpt-image") || M.includes("gpt-4o-image")) && !M.includes("gpt-image-2"),
      V = ((Ue = e.settings) == null ? void 0 : Ue.ratio) || "Auto",
      O = ((et = e.settings) == null ? void 0 : et.resolution) || "2K",
      L = Cio(M, e.settings),
      D = g.useCallback(at => {
        const Pt = {
            ...(e.settings || {}),
            model: at
          },
          dt = zs(at);
        bX(at, dt, Pt, {
          preserveRatio: !0
        });
        const xt = Gmn(at, Pt);
        n(e.id, {
          settings: xt
        }), ae(null);
      }, [e.id, e.settings, n]),
      U = g.useRef("");
    g.useEffect(() => {
      const at = `${M}:${V}:${O}`;
      if (U.current === at) return;
      const Pt = Gmn(M, e.settings),
        dt = e.settings || {};
      Pt.ratio !== dt.ratio || Pt.resolution !== dt.resolution || Pt.gptImage2AspectRatio !== dt.gptImage2AspectRatio || Pt.gptImage2Resolution !== dt.gptImage2Resolution ? (U.current = `${M}:${String(Pt.ratio)}:${String(Pt.resolution)}`, n(e.id, {
        settings: {
          ...dt,
          ...Pt,
          model: M
        }
      })) : U.current = at;
    }, [M, V, O, e.id, e.settings, n]);
    const H = g.useMemo(() => i.filter(at => at.type === "Image"), [i]),
      Y = H.find(at => at.id === M),
      K = Qa.getGlobalBaseUrl(),
      W = !!Y && od(Y, K),
      Q = String(((ft = e.settings) == null ? void 0 : ft.platformGroup) || "").trim(),
      q = g.useMemo(() => s ? s(e.id) : [], [s, e.id, r, a]),
      ne = g.useMemo(() => l ? l(e.id).filter(at => (at == null ? void 0 : at.type) === "image" || (at == null ? void 0 : at.type) === "video" || (at == null ? void 0 : at.type) === "audio") : [], [l, e.id, r, a]),
      {
        activeReferenceStripRows: de,
        genReferenceStripThumbs: le
      } = evr({
        nodeId: e.id,
        connectedImages: q,
        connectedImageItems: ne,
        connections: r,
        nodes: a
      }),
      J = g.useMemo(() => {
        if (!(r != null && r.length) || !(a != null && a.length)) return null;
        const at = r.find(Pt => {
          if (Pt.to !== e.id) return !1;
          const dt = a.find(xt => xt.id === Pt.from);
          return dt && (dt.type === "text-node" || dt.type === "custom-agent" || dt.type === "novel-input");
        });
        return at && a.find(Pt => Pt.id === at.from) || null;
      }, [r, a, e.id]),
      pe = g.useMemo(() => {
        if (!(r != null && r.length) || !(a != null && a.length)) return [];
        const at = r.filter(xt => xt.to === e.id),
          Pt = [],
          dt = new Set();
        return at.forEach(xt => {
          const yn = a.find(mt => mt.id === xt.from);
          !yn || !(yn.type === "text-node" || yn.type === "custom-agent" || yn.type === "novel-input") || dt.has(yn.id) || (dt.add(yn.id), Pt.push(yn));
        }), Pt;
      }, [r, a, e.id]),
      ce = g.useMemo(() => kY(r, a, e.id), [r, a, e.id]),
      we = g.useCallback((at, Pt) => {
        Pt.preventDefault(), Pt.stopPropagation();
        const dt = pU(at, {
          scopeNodeId: e.id,
          connections: r,
          nodes: a,
          imageSourceMap: ce
        });
        dt && p && p(xt => xt.filter(yn => !(yn.from === dt && yn.to === e.id)));
      }, [ce, e.id, p, r, a]),
      X = g.useCallback((at, Pt) => {
        if (at === Pt || at < 0 || Pt < 0 || at >= q.length || Pt >= q.length) return;
        const dt = [...q],
          [xt] = dt.splice(at, 1);
        dt.splice(Pt, 0, xt), n(e.id, {
          settings: {
            ...e.settings,
            inputImageOrder: dt
          }
        });
      }, [q, e.id, e.settings, n]),
      Z = g.useMemo(() => i.filter(at => at.type === "Chat"), [i]),
      re = g.useCallback(at => {
        var xt, yn;
        const Pt = String(at || "").trim();
        if (!Pt) return ((xt = Z[0]) == null ? void 0 : xt.id) || "";
        if (Z.some(gn => gn.id === Pt)) return Pt;
        const dt = Z.find(gn => gn.modelName === Pt || (gn.modelName || gn.id) === Pt);
        return (dt == null ? void 0 : dt.id) || ((yn = Z[0]) == null ? void 0 : yn.id) || Pt;
      }, [Z]),
      [fe, ye] = g.useState(() => {
        var at;
        return re((at = e.settings) == null ? void 0 : at.selectedChatModel);
      }),
      [ie, ae] = g.useState(null),
      be = g.useCallback(at => {
        ye(at), n(e.id, {
          settings: {
            ...e.settings,
            selectedChatModel: at
          }
        });
      }, [e.id, e.settings, n]);
    g.useEffect(() => {
      var Pt;
      const at = re((Pt = e.settings) == null ? void 0 : Pt.selectedChatModel);
      at && at !== fe && ye(at);
    }, [(ht = e.settings) == null ? void 0 : ht.selectedChatModel, re, fe]);
    const [Ee, xe] = g.useState(!1),
      [he, ue] = g.useState(!1),
      [ge, _e] = g.useState(!1),
      [ke, ve] = g.useState("");
    g.useEffect(() => {
      var Pt;
      const at = ((Pt = e.settings) == null ? void 0 : Pt.jsonData) || "";
      at && ve(at);
    }, [(wt = e.settings) == null ? void 0 : wt.jsonData]);
    const Te = g.useCallback(async () => {
        var xt, yn;
        if (!J || !d) return;
        const Pt = new Map(a.map(gn => [gn.id, gn])).get(J.id) || J;
        let dt = "";
        if (Pt.type === "custom-agent") dt = (((xt = Pt.settings) == null ? void 0 : xt.outputContent) || "").trim();else {
          const gn = ((yn = Pt.settings) == null ? void 0 : yn.text) || "",
            mt = Pt.prompt || "",
            Xt = Pt.content || "";
          dt = (gn || mt || Xt).trim();
        }
        if (!dt) {
          alert(x("连接的文本节点没有内容"));
          return;
        }
        n(e.id, {
          settings: {
            ...e.settings,
            selectedChatModel: fe
          }
        }), xe(!0);
        try {
          const gn = _ === "grid" ? A : void 0;
          await d(e.id, dt, w, k, fe, gn);
        } catch (gn) {
          console.error("[StoryboardChart] 从文本生成失败:", gn), alert(x("从文本生成失败: {0}", gn instanceof Error ? gn.message : "未知错误"));
        } finally {
          xe(!1);
        }
      }, [J, d, e.id, e.settings, n, a, w, k, fe, _, A]),
      Ne = g.useCallback(() => {
        var at;
        if (!ke.trim()) {
          alert(x("请先输入或生成 JSON 数据"));
          return;
        }
        try {
          const Pt = xcr(ke);
          if (!Pt) throw new Error("未找到有效的 JSON 对象或提示词数组");
          const dt = ((at = e.settings) == null ? void 0 : at.cells) || [],
            xt = {
              ...e.settings,
              ...ije({
                existingCells: dt,
                parsed: Pt.kind === "json" ? Pt.data : void 0,
                plainPrompts: Pt.kind === "prompt_array" ? Pt.prompts : void 0,
                currentRows: w,
                currentCols: k,
                totalShots: _ === "grid" ? A : void 0,
                gridMode: _,
                jsonDataOverride: ke
              })
            };
          n(e.id, {
            settings: xt
          });
        } catch (Pt) {
          alert(x("同步失败: {0}", Pt instanceof Error ? Pt.message : "JSON 解析错误"));
        }
      }, [ke, w, k, e.id, e.settings, n, _, A]),
      me = ((jt = e.settings) == null ? void 0 : jt.chartArtStyle) ?? "auto",
      Ae = g.useCallback(at => {
        n(e.id, {
          settings: {
            ...e.settings,
            chartArtStyle: at
          }
        });
      }, [e.id, e.settings, n]),
      [Fe, Me] = g.useState(!1),
      [Re, $e] = g.useState(""),
      [rt, nt] = g.useState(null),
      [ze, Le] = g.useState(null),
      [Ke, Xe] = g.useState(null),
      [De, Ye] = g.useState(!1),
      Ce = g.useRef(null),
      He = g.useRef(null),
      Ve = g.useRef(null),
      it = g.useRef(null),
      It = g.useRef(0),
      Ft = g.useRef(0),
      We = g.useRef(0),
      Ze = g.useRef(new Map());
    g.useEffect(() => {
      if (!ge) return;
      const at = Ve.current,
        Pt = it.current;
      if (!at || !Pt) return;
      const dt = xt => {
        xt.stopPropagation(), xt.preventDefault();
        const yn = Pt.scrollHeight - Pt.clientHeight;
        yn > 0 && (Pt.scrollTop = Math.max(0, Math.min(yn, Pt.scrollTop + xt.deltaY)));
      };
      return at.addEventListener("wheel", dt, {
        passive: !1,
        capture: !0
      }), () => at.removeEventListener("wheel", dt, {
        capture: !0
      });
    }, [ge, ke]), g.useEffect(() => {
      const at = He.current;
      if (!at) return;
      const Pt = dt => {
        dt.stopPropagation(), dt.preventDefault();
        const yn = dt.target.closest("[data-chart-cell]"),
          gn = yn == null ? void 0 : yn.querySelector("textarea");
        if (gn) {
          const Xt = gn.scrollHeight - gn.clientHeight;
          if (Xt > 1) {
            const Gn = gn.scrollTop + dt.deltaY;
            if (Gn >= 0 && Gn <= Xt) {
              gn.scrollTop = Gn;
              return;
            }
            if (Gn < 0 && gn.scrollTop > 0) {
              gn.scrollTop = 0;
              return;
            }
            if (Gn > Xt && gn.scrollTop < Xt) {
              gn.scrollTop = Xt;
              return;
            }
          }
        }
        const mt = Ce.current;
        if (mt) {
          const Xt = mt.scrollHeight - mt.clientHeight;
          Xt > 0 && (mt.scrollTop = Math.max(0, Math.min(Xt, mt.scrollTop + dt.deltaY)));
        }
      };
      return at.addEventListener("wheel", Pt, {
        passive: !1,
        capture: !0
      }), () => at.removeEventListener("wheel", Pt, {
        capture: !0
      });
    }, [I, S, E.length]);
    const Ge = g.useCallback(at => {
        n(e.id, {
          settings: {
            ...e.settings,
            cells: at
          }
        });
      }, [e.id, e.settings, n]),
      Oe = g.useCallback((at, Pt) => {
        const dt = [...E];
        dt[at] = {
          ...dt[at],
          prompt: Pt
        }, Ge(dt);
      }, [E, Ge]),
      st = g.useCallback((at, Pt) => {
        const dt = [...E];
        dt[at] = {
          ...dt[at],
          linkNodeId: Pt || void 0
        }, Ge(dt);
      }, [E, Ge]),
      vt = g.useCallback(at => {
        var gn, mt;
        if (!at) return "";
        const Pt = a.find(Xt => Xt.id === at);
        if (!Pt) return "";
        if (Pt.type === "custom-agent") return (((gn = Pt.settings) == null ? void 0 : gn.outputContent) || "").trim();
        const dt = ((mt = Pt.settings) == null ? void 0 : mt.text) || "",
          xt = Pt.prompt || "",
          yn = Pt.content || "";
        return (dt || xt || yn).trim();
      }, [a]),
      Ht = g.useCallback((at, Pt) => {
        const dt = (at.prompt || "").trim();
        if (dt) return dt;
        const xt = vt(at.linkNodeId);
        return xt || `分镜 ${Pt + 1} 描述`;
      }, [vt]),
      nn = g.useCallback(async () => {
        var gn, mt, Xt, Gn, rr, qn, Dn, Ar;
        const at = ((gn = e.settings) == null ? void 0 : gn.customDistributionRules) || "";
        if (!at.trim()) {
          alert(x("请先填写分发替换指令"));
          return;
        }
        const Pt = i.find(_r => _r.type === "Chat" && (_r.id === fe || _r.modelName === fe)) || i.find(_r => _r.type === "Chat");
        if (!Pt) {
          alert(x("请先配置 Chat API"));
          return;
        }
        const dt = Pt.key || o;
        if (!dt) {
          alert(x("请先配置 API Key"));
          return;
        }
        const xt = (Pt.url || "https://ai.comfly.chat").replace(/\/+$/, "");
        if (E.filter(_r => (_r.prompt || "").trim()).length === 0) {
          alert(x("宫格中没有可替换的内容"));
          return;
        }
        n(e.id, {
          settings: {
            ...e.settings,
            selectedChatModel: fe
          }
        }), ue(!0);
        try {
          const _r = E.map(Ea => Ea.prompt || ""),
            Pa = `你是一个分镜文本替换助手。用户会给出替换指令和一个 JSON 数组（数组的每个元素是分镜宫格一格的原始内容，可能是 JSON 对象字符串或纯文本）。
请对每个元素按用户指令进行替换：若为 JSON 则修改其中的 prompt、description_zh、description_en 等文本字段；若为纯文本则直接替换。
保持结构和格式不变，只修改需替换的文本。你必须返回且仅返回一个 JSON 数组，长度与输入相同，顺序对应。每个元素为修改后的内容（保持原格式：JSON 则仍为可解析的 JSON 字符串）。`,
            fa = `替换指令：${at}

待处理的宫格内容（JSON 数组，按顺序）：
${JSON.stringify(_r, null, 0)}`,
            Ca = new AbortController(),
            $n = setTimeout(() => Ca.abort(), 9e4),
            yr = await fetch(`${xt}/v1/chat/completions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${dt}`
              },
              body: JSON.stringify({
                model: Pt.modelName || "gemini-3-pro-preview",
                messages: [{
                  role: "system",
                  content: Pa
                }, {
                  role: "user",
                  content: fa
                }],
                max_tokens: 32e3,
                temperature: .3,
                stream: !1
              }),
              signal: Ca.signal
            });
          if (clearTimeout($n), !yr.ok) {
            const Ea = await yr.text();
            throw console.error("[StoryboardChart] API error:", yr.status, Ea), new Error(Sv(yr.status));
          }
          const Ir = await yr.json();
          let Gr = ((Gn = (Xt = (mt = Ir.choices) == null ? void 0 : mt[0]) == null ? void 0 : Xt.message) == null ? void 0 : Gn.content) || ((Ar = (Dn = (qn = (rr = Ir.data) == null ? void 0 : rr.choices) == null ? void 0 : qn[0]) == null ? void 0 : Dn.message) == null ? void 0 : Ar.content) || Ir.content || "";
          Gr = Gr.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
          const Zr = Gr.match(/\[[\s\S]*\]/);
          if (!Zr) throw new Error("模型未返回有效的 JSON 数组");
          const La = JSON.parse(Zr[0]),
            sa = E.map((Ea, ba) => {
              const ga = La[ba];
              let _a = Ea.prompt;
              return ga != null && (typeof ga == "string" ? _a = ga : typeof ga == "object" && (_a = JSON.stringify(ga, null, 2))), {
                ...Ea,
                prompt: _a
              };
            });
          Ge(sa);
        } catch (_r) {
          console.error("[StoryboardChart] 执行替换失败:", _r), alert(x("执行替换失败: {0}", _r instanceof Error ? _r.message : "未知错误"));
        } finally {
          ue(!1);
        }
      }, [e.id, e.settings, (bt = e.settings) == null ? void 0 : bt.customDistributionRules, E, Ge, i, fe, o, n]),
      pt = E.some(at => (at.prompt || "").trim()),
      lt = g.useCallback(at => {
        const Pt = Math.max(1, Math.min(b, at));
        n(e.id, {
          settings: {
            ...e.settings,
            rows: Pt
          }
        });
      }, [e.id, e.settings, n]),
      gt = g.useCallback(at => {
        const Pt = Math.max(1, Math.min(b, at));
        n(e.id, {
          settings: {
            ...e.settings,
            cols: Pt
          }
        });
      }, [e.id, e.settings, n]),
      Ut = g.useCallback(at => {
        const Pt = Math.max(1, Math.min(v, at));
        if (_ === "grid") n(e.id, {
          settings: {
            ...e.settings,
            totalGrids: Pt
          }
        });else {
          const dt = Math.min(3, Pt, b),
            xt = Math.min(b, Math.ceil(Pt / dt));
          n(e.id, {
            settings: {
              ...e.settings,
              rows: Math.max(1, xt),
              cols: Math.max(1, dt)
            }
          });
        }
      }, [e.id, e.settings, n, _]),
      _t = g.useCallback(at => {
        var dt;
        const Pt = {
          gridMode: at
        };
        at === "grid" && ((dt = e.settings) == null ? void 0 : dt.totalGrids) == null && (Pt.totalGrids = w * k), n(e.id, {
          settings: {
            ...e.settings,
            ...Pt
          }
        });
      }, [e.id, e.settings, n, w, k]),
      At = g.useCallback((at, Pt) => {
        Pt.key === "@" && (Pt.preventDefault(), Ft.current = Pt.currentTarget.selectionStart ?? 0, nt(at));
      }, []),
      Yt = g.useCallback((at, Pt, dt) => {
        var qn;
        const xt = ((qn = E[at]) == null ? void 0 : qn.prompt) || "",
          yn = dt ?? Ft.current,
          gn = xt.slice(0, yn),
          mt = xt.slice(yn),
          Xt = `@${Pt}`,
          Gn = gn + Xt + mt;
        Oe(at, Gn), nt(null);
        const rr = yn + Xt.length;
        setTimeout(() => {
          const Dn = Ze.current.get(at);
          Dn && (Dn.focus(), Dn.setSelectionRange(rr, rr));
        }, 0);
      }, [E, Oe]),
      qe = g.useCallback(at => {
        const Pt = We.current,
          dt = Ze.current.get(Pt),
          xt = dt != null ? dt.selectionStart ?? dt.value.length : 0;
        Yt(Pt, at, xt);
      }, [Yt]),
      [kt, St] = g.useState(!1),
      [hn, Qt] = g.useState(null),
      Ot = g.useCallback(async () => {
        var dt;
        if (!E.some(xt => (xt.prompt || "").trim() || xt.refs && xt.refs.length > 0 || !!vt(xt.linkNodeId))) {
          alert(x("请至少填写一个分镜描述、引用图片，或绑定一个文本/Agent节点"));
          return;
        }
        if (!u) {
          alert(x("生成功能暂不可用，请确保已正确配置"));
          return;
        }
        const Pt = i.find(xt => xt.id === M);
        if (!(Pt != null && Pt.key) && !o) {
          alert(x("请先配置 API Key"));
          return;
        }
        St(!0);
        try {
          const xt = me !== "auto" && ((dt = f.find(gn => gn.id === me)) == null ? void 0 : dt.prompt) || "",
            yn = E.map((gn, mt) => {
              let Xt = Ht(gn, mt),
                Gn = Xt;
              try {
                const Dn = JSON.parse(Xt);
                Dn && typeof Dn.prompt == "string" && (Gn = Dn.prompt.trim());
              } catch {}
              gn.refs && gn.refs.length > 0 && (Gn = (Gn + " " + gn.refs.map(Dn => `@${Dn}`).join(" ")).trim());
              let rr = Gn || Ht(gn, mt);
              if (f.length > 0) {
                const Dn = [...f].sort((Ar, _r) => {
                  var Pa, fa;
                  return (((Pa = _r.prompt) == null ? void 0 : Pa.length) || 0) - (((fa = Ar.prompt) == null ? void 0 : fa.length) || 0);
                });
                for (const Ar of Dn) {
                  const _r = (Ar.prompt || "").trim();
                  if (_r) {
                    if (rr === _r) {
                      rr = "";
                      break;
                    }
                    if (rr.startsWith(_r + ", ")) {
                      rr = rr.slice(_r.length + 2).trim();
                      break;
                    }
                    if (rr.startsWith(_r + ",")) {
                      rr = rr.slice(_r.length + 1).trim();
                      break;
                    }
                    if (rr.startsWith(_r)) {
                      rr = rr.slice(_r.length).trim();
                      break;
                    }
                  }
                }
                rr.trim() || (rr = Gn || Ht(gn, mt));
              }
              const qn = xt ? `${xt}, ${rr}` : rr;
              return {
                id: gn.id,
                prompt: qn
              };
            });
          await u({
            nodeId: e.id,
            cells: yn,
            model: M,
            ratio: V,
            resolution: O,
            refImages: q,
            connections: r,
            nodes: a,
            updateNode: n,
            setNodes: h,
            setConnections: p,
            generateId: m,
            gridRows: _ === "grid" ? Math.ceil(S / 3) : w,
            gridCols: C
          });
        } catch (xt) {
          console.error("[StoryboardChart] 生成失败:", xt), alert(x(SU(xt instanceof Error ? xt.message : "未知错误")));
        } finally {
          St(!1);
        }
      }, [E, u, i, M, o, e.id, e.settings, q, r, a, n, h, p, m, me, f, vt, Ht, V, O, _, S, w, C]),
      ln = g.useRef(null),
      Pn = g.useRef(null),
      [rn, Yn] = g.useState(null);
    g.useEffect(() => {
      if (rt === null || !q.length) {
        Yn(null);
        return;
      }
      const at = Ze.current.get(rt);
      if (!at) return;
      const Pt = at.getBoundingClientRect();
      Yn({
        top: Pt.top,
        left: Pt.left,
        width: Pt.width
      });
    }, [rt, q.length]), g.useEffect(() => {
      if (!Fe) return;
      const at = Pt => {
        Pn.current && !Pn.current.contains(Pt.target) && Me(!1);
      };
      return document.addEventListener("mousedown", at), () => document.removeEventListener("mousedown", at);
    }, [Fe]);
    const Ct = c.jsxs("div", {
      ref: ln,
      className: "flex flex-col h-full overflow-hidden pointer-events-auto",
      children: [c.jsxs("div", {
        "data-chart-row-col": !0,
        role: "toolbar",
        "aria-label": x("行数列数"),
        className: `relative z-10 flex items-center gap-3 px-3 py-2 border-b shrink-0 cursor-default select-none pointer-events-auto ${t ? "border-zinc-700" : "border-zinc-200"}`,
        children: [c.jsxs("div", {
          className: "flex items-center gap-0.5 rounded overflow-hidden border",
          style: {
            borderColor: t ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"
          },
          children: [c.jsx("button", {
            type: "button",
            onClick: at => {
              at.stopPropagation(), _t("grid");
            },
            className: `px-2 py-0.5 text-[10px] ${_ === "grid" ? t ? "bg-white/15 text-white" : "bg-zinc-900 text-white" : t ? "text-zinc-400 hover:bg-zinc-700" : "text-zinc-600 hover:bg-zinc-100"}`,
            children: x("宫格排列")
          }), c.jsx("button", {
            type: "button",
            onClick: at => {
              at.stopPropagation(), _t("rows-cols");
            },
            className: `px-2 py-0.5 text-[10px] ${_ === "rows-cols" ? t ? "bg-white/15 text-white" : "bg-zinc-900 text-white" : t ? "text-zinc-400 hover:bg-zinc-700" : "text-zinc-600 hover:bg-zinc-100"}`,
            children: x("行列")
          })]
        }), _ === "grid" && c.jsxs(c.Fragment, {
          children: [c.jsx("div", {
            className: "h-4 w-px shrink-0",
            "aria-hidden": !0,
            style: {
              background: t ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"
            }
          }), c.jsxs("div", {
            className: "flex items-center gap-1",
            children: [c.jsx("span", {
              className: "text-[10px] shrink-0 text-zinc-500",
              children: x("宫格")
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("减少宫格"),
              onClick: at => {
                at.stopPropagation(), S > 1 && Ut(S - 1);
              },
              onMouseDown: at => at.stopPropagation(),
              disabled: S <= 1,
              className: `min-w-[20px] min-h-[20px] flex items-center justify-center rounded cursor-pointer ${S <= 1 ? "opacity-50 cursor-not-allowed" : ""} ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
              children: c.jsx(AS, {
                size: 12
              })
            }), c.jsx("input", {
              type: "text",
              inputMode: "numeric",
              value: Re !== "" ? Re : S,
              onChange: at => $e(at.target.value.replace(/\D/g, "").slice(0, 3)),
              onBlur: () => {
                const at = parseInt(Re, 10);
                !isNaN(at) && at >= 1 && at <= 64 && Ut(at), $e("");
              },
              onKeyDown: at => {
                if (at.key === "Enter") {
                  const Pt = parseInt(Re, 10);
                  !isNaN(Pt) && Pt >= 1 && Pt <= 64 && Ut(Pt), $e(""), at.target.blur();
                }
              },
              onMouseDown: at => at.stopPropagation(),
              className: `w-8 px-0.5 py-0.5 rounded text-[10px] text-center tabular-nums outline-none border-0 bg-transparent cursor-text select-text ${t ? "text-zinc-300" : "text-zinc-700"}`
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("增加宫格"),
              onClick: at => {
                at.stopPropagation(), S < 64 && Ut(S + 1);
              },
              onMouseDown: at => at.stopPropagation(),
              disabled: S >= 64,
              className: `min-w-[20px] min-h-[20px] flex items-center justify-center rounded cursor-pointer ${S >= 64 ? "opacity-50 cursor-not-allowed" : ""} ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
              children: c.jsx(eo, {
                size: 12
              })
            })]
          })]
        }), _ === "rows-cols" && c.jsxs(c.Fragment, {
          children: [c.jsxs("div", {
            className: "flex items-center gap-1",
            children: [c.jsx("span", {
              className: `text-xs ${t ? "text-zinc-400" : "text-zinc-600"}`,
              children: x("行")
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("减少行"),
              onClick: at => {
                at.stopPropagation(), w > 1 && lt(w - 1);
              },
              onMouseDown: at => {
                at.stopPropagation();
              },
              onPointerDown: at => {
                at.stopPropagation();
              },
              disabled: w <= 1,
              className: `min-w-[20px] min-h-[20px] flex items-center justify-center rounded cursor-pointer ${w <= 1 ? "opacity-50 cursor-not-allowed" : ""} ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
              children: c.jsx(AS, {
                size: 12
              })
            }), c.jsx("span", {
              className: "text-xs w-5 text-center tabular-nums",
              children: w
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("增加行"),
              onClick: at => {
                at.stopPropagation(), w < b && lt(w + 1);
              },
              onMouseDown: at => {
                at.stopPropagation();
              },
              onPointerDown: at => {
                at.stopPropagation();
              },
              disabled: w >= b,
              className: `min-w-[20px] min-h-[20px] flex items-center justify-center rounded cursor-pointer ${w >= b ? "opacity-50 cursor-not-allowed" : ""} ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
              children: c.jsx(eo, {
                size: 12
              })
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-1",
            children: [c.jsx("span", {
              className: `text-xs ${t ? "text-zinc-400" : "text-zinc-600"}`,
              children: x("列")
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("减少列"),
              onClick: at => {
                at.stopPropagation(), k > 1 && gt(k - 1);
              },
              onMouseDown: at => {
                at.stopPropagation();
              },
              onPointerDown: at => {
                at.stopPropagation();
              },
              disabled: k <= 1,
              className: `min-w-[20px] min-h-[20px] flex items-center justify-center rounded cursor-pointer ${k <= 1 ? "opacity-50 cursor-not-allowed" : ""} ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
              children: c.jsx(AS, {
                size: 12
              })
            }), c.jsx("span", {
              className: "text-xs w-5 text-center tabular-nums",
              children: k
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("增加列"),
              onClick: at => {
                at.stopPropagation(), k < b && gt(k + 1);
              },
              onMouseDown: at => {
                at.stopPropagation();
              },
              onPointerDown: at => {
                at.stopPropagation();
              },
              disabled: k >= b,
              className: `min-w-[20px] min-h-[20px] flex items-center justify-center rounded cursor-pointer ${k >= b ? "opacity-50 cursor-not-allowed" : ""} ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
              children: c.jsx(eo, {
                size: 12
              })
            })]
          }), c.jsx("div", {
            className: "h-4 w-px shrink-0",
            "aria-hidden": !0,
            style: {
              background: t ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"
            }
          })]
        }), c.jsx("div", {
          className: "h-4 w-px shrink-0",
          "aria-hidden": !0,
          style: {
            background: t ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"
          }
        }), c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx("span", {
            className: `text-xs ${t ? "text-zinc-400" : "text-zinc-600"}`,
            children: x("行高")
          }), c.jsx("button", {
            type: "button",
            "aria-label": x("减少行高"),
            onClick: at => {
              at.stopPropagation();
              const Pt = Math.max(56, I - 24);
              n(e.id, {
                settings: {
                  ...e.settings,
                  cellRowHeight: Pt
                }
              });
            },
            onMouseDown: at => at.stopPropagation(),
            disabled: I <= 56,
            className: `min-w-[20px] min-h-[20px] flex items-center justify-center rounded cursor-pointer ${I <= 56 ? "opacity-50 cursor-not-allowed" : ""} ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
            children: c.jsx(AS, {
              size: 12
            })
          }), c.jsxs("span", {
            className: "text-xs w-10 text-center tabular-nums",
            children: [I, "px"]
          }), c.jsx("button", {
            type: "button",
            "aria-label": x("增加行高"),
            onClick: at => {
              at.stopPropagation();
              const Pt = Math.min(200, I + 24);
              n(e.id, {
                settings: {
                  ...e.settings,
                  cellRowHeight: Pt
                }
              });
            },
            onMouseDown: at => at.stopPropagation(),
            disabled: I >= 200,
            className: `min-w-[20px] min-h-[20px] flex items-center justify-center rounded cursor-pointer ${I >= 200 ? "opacity-50 cursor-not-allowed" : ""} ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
            children: c.jsx(eo, {
              size: 12
            })
          })]
        }), c.jsx("div", {
          className: "flex-1"
        }), c.jsx("button", {
          type: "button",
          onClick: at => {
            if (at.stopPropagation(), De) Ye(!1), requestAnimationFrame(() => {
              const Pt = Ce.current;
              Pt && It.current && (Pt.scrollTop = It.current);
            });else {
              const Pt = Ce.current;
              Pt && (It.current = Pt.scrollTop), Ye(!0);
            }
          },
          onMouseDown: at => at.stopPropagation(),
          className: `p-1.5 rounded transition-colors ${t ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"}`,
          title: x(De ? "退出全屏" : "全屏显示（更方便打字与使用）"),
          children: De ? c.jsx(AT, {
            size: 14
          }) : c.jsx(Wm, {
            size: 14
          })
        })]
      }), f.length > 0 && c.jsxs("div", {
        className: `p-2 border-b shrink-0 ${t ? "border-zinc-700" : "border-zinc-200"}`,
        children: [c.jsx("label", {
          className: `text-[10px] font-medium block mb-1 ${t ? "text-zinc-400" : "text-zinc-600"}`,
          children: x("绘图风格")
        }), c.jsxs("div", {
          className: "relative",
          ref: Pn,
          children: [c.jsxs("button", {
            type: "button",
            onClick: at => {
              at.stopPropagation(), Me(Pt => !Pt);
            },
            onMouseDown: at => at.stopPropagation(),
            className: `w-full flex items-center justify-between px-2 py-1.5 rounded text-[10px] border ${t ? "bg-transparent border-white/30 text-white" : "bg-white border-zinc-300 text-zinc-800"}`,
            children: [c.jsx(tw, {
              size: 12,
              className: "shrink-0 mr-1.5 opacity-70"
            }), c.jsx("span", {
              className: "truncate flex-1 text-left",
              children: me === "auto" ? x("不添加风格前缀 (默认)") : ((Bt = f.find(at => at.id === me)) == null ? void 0 : Bt.label) || me
            }), c.jsx(Mi, {
              size: 10,
              className: `shrink-0 ml-1 transition-transform ${Fe ? "rotate-180" : ""}`
            })]
          }), Fe && c.jsxs("div", {
            "data-chart-style-dropdown": !0,
            className: `absolute left-0 right-0 mt-1 z-50 rounded-lg border shadow-xl max-h-48 overflow-y-auto minimal-scrollbar ${t ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
            onMouseDown: at => at.stopPropagation(),
            children: [c.jsx("div", {
              onClick: () => {
                Ae("auto"), Me(!1);
              },
              className: `px-2 py-1.5 text-[10px] cursor-pointer ${me === "auto" ? t ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-900" : t ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`,
              children: x("不添加风格前缀 (默认)")
            }), f.filter(at => at.category === "cinematic" || at.category === "stylized" || at.category === "custom").map(at => c.jsx("div", {
              onClick: () => {
                Ae(at.id), Me(!1);
              },
              className: `px-2 py-1.5 text-[10px] cursor-pointer ${me === at.id ? t ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-900" : t ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`,
              children: x(at.label)
            }, at.id))]
          })]
        })]
      }), J && c.jsx("div", {
        className: `p-2 border-b shrink-0 ${t ? "border-zinc-700" : "border-zinc-200"}`,
        children: c.jsxs("div", {
          className: `p-2 rounded space-y-2 border ${t ? "bg-transparent border-white/30" : "bg-zinc-50 border-zinc-200"}`,
          children: [c.jsxs("div", {
            className: "flex items-center justify-between",
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx(Hd, {
                size: 14,
                className: t ? "text-white" : "text-zinc-700"
              }), c.jsx("span", {
                className: `text-xs ${t ? "text-white" : "text-zinc-700"}`,
                children: x("已连接文本节点")
              })]
            }), c.jsxs("button", {
              onClick: Te,
              disabled: Ee,
              className: `px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed" : "bg-black hover:bg-zinc-800 text-white border-black disabled:opacity-50 disabled:cursor-not-allowed"}`,
              onMouseDown: at => at.stopPropagation(),
              children: [Ee && c.jsx(Ua, {
                size: 12,
                className: "animate-spin"
              }), x(Ee ? "生成中..." : "从文本生成")]
            })]
          }), c.jsx("div", {
            className: "flex items-center gap-2 min-w-0",
            children: c.jsx(Th, {
              scopeId: e.id,
              dropdownType: "chart-text-chat-model",
              value: fe,
              models: Z,
              isDark: t,
              activeDropdown: ie,
              setActiveDropdown: ae,
              disabled: Ee,
              menuPlacement: "below",
              className: "flex-1 min-w-0",
              onSelect: be
            })
          })]
        })
      }), c.jsxs("div", {
        className: `p-2 border-b shrink-0 ${t ? "border-zinc-700" : "border-zinc-200"}`,
        children: [c.jsxs("button", {
          type: "button",
          onClick: () => _e(!ge),
          className: `w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors border ${t ? "bg-transparent hover:bg-white/5 text-white border-white/30 hover:border-white/50" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-transparent"}`,
          onMouseDown: at => at.stopPropagation(),
          children: [c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx(ELe, {
              size: 14,
              className: t ? "text-white/60" : "text-zinc-600"
            }), c.jsx("span", {
              className: "text-xs font-medium",
              children: "JSON Code"
            })]
          }), ge ? c.jsx(Na, {
            size: 12,
            className: t ? "text-white/60" : "text-zinc-600"
          }) : c.jsx(Od, {
            size: 12,
            className: t ? "text-white/60" : "text-zinc-600"
          })]
        }), ge && c.jsxs("div", {
          ref: Ve,
          "data-chart-json-code": !0,
          className: `mt-2 rounded-lg border overflow-hidden ${t ? "bg-transparent border-white/30" : "bg-white border-zinc-300"}`,
          style: {
            overscrollBehavior: "contain"
          },
          children: [c.jsxs("div", {
            className: `flex items-center justify-between px-3 py-2 border-b ${t ? "border-white/30" : "border-zinc-200 bg-zinc-50"}`,
            children: [c.jsx("span", {
              className: `text-xs font-medium ${t ? "text-white/80" : "text-zinc-700"}`,
              children: x("JSON数据")
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("button", {
                type: "button",
                onClick: () => {
                  try {
                    navigator.clipboard.writeText(ke);
                  } catch {}
                },
                className: `p-1.5 rounded transition-colors ${t ? "text-white/60 hover:bg-white/5" : "text-zinc-600 hover:bg-zinc-100"}`,
                onMouseDown: at => at.stopPropagation(),
                title: x("复制"),
                children: c.jsx(Cx, {
                  size: 14
                })
              }), c.jsx("button", {
                type: "button",
                onClick: Ne,
                className: `px-2 py-1 rounded text-[10px] border ${t ? "border-white/30 hover:bg-white/5 text-white" : "bg-black hover:bg-zinc-800 text-white border-black"}`,
                onMouseDown: at => at.stopPropagation(),
                children: x("同步到宫格")
              })]
            })]
          }), c.jsx("textarea", {
            ref: it,
            value: ke,
            onChange: at => ve(at.target.value),
            placeholder: x('粘贴或编辑 JSON / 提示词数组，格式如 {"layout_specification":"3x3","total_shots":9,"shots":[{...}]} 或 ["提示词1","提示词2"]'),
            className: `w-full p-3 text-xs font-mono resize-none minimal-scrollbar outline-none border-0 max-h-64 overflow-y-auto ${t ? "bg-transparent text-white/80 placeholder:text-zinc-500" : "bg-white text-zinc-800 placeholder:text-zinc-400"}`,
            rows: 8,
            onMouseDown: at => at.stopPropagation()
          })]
        })]
      }), pt && c.jsx("div", {
        className: `p-2 border-b shrink-0 ${t ? "border-zinc-700" : "border-zinc-200"}`,
        children: c.jsxs("div", {
          className: `p-2 rounded space-y-2 border ${t ? "bg-transparent border-white/30" : "bg-zinc-50/80 border-zinc-200"}`,
          children: [c.jsxs("div", {
            className: "flex items-center justify-between gap-2",
            children: [c.jsx("span", {
              className: `text-[10px] font-medium shrink-0 ${t ? "text-white" : "text-zinc-700"}`,
              children: x("分发替换")
            }), c.jsxs("div", {
              className: "flex items-center gap-2 shrink-0",
              children: [c.jsx(Th, {
                scopeId: e.id,
                dropdownType: "chart-replace-chat-model",
                value: fe,
                models: Z,
                isDark: t,
                activeDropdown: ie,
                setActiveDropdown: ae,
                disabled: he,
                menuPlacement: "below",
                className: "w-[132px] shrink-0",
                onSelect: be
              }), c.jsxs("button", {
                type: "button",
                onClick: at => {
                  at.stopPropagation(), nn();
                },
                onMouseDown: at => at.stopPropagation(),
                disabled: he,
                className: `shrink-0 px-3 py-1 rounded text-[10px] font-medium flex items-center gap-1 transition-opacity ${he ? "opacity-70 cursor-wait" : ""} ${t ? "bg-black hover:bg-[#1f1f1f] text-white border border-white/30" : "bg-black hover:bg-zinc-800 text-white border border-zinc-800"}`,
                title: x("使用所选 Chat 模型按上述指令批量替换宫格内容"),
                children: [he && c.jsx(Ua, {
                  size: 12,
                  className: "animate-spin shrink-0"
                }), x(he ? "正在替换..." : "执行替换")]
              })]
            })]
          }), c.jsx("textarea", {
            value: ((wn = e.settings) == null ? void 0 : wn.customDistributionRules) || "",
            onChange: at => n(e.id, {
              settings: {
                ...e.settings,
                customDistributionRules: at.target.value
              }
            }),
            placeholder: x("例：帮我将主角换成@1"),
            rows: 2,
            className: `w-full px-2 py-1.5 rounded text-[10px] outline-none border resize-none minimal-scrollbar ${t ? "bg-transparent border-white/20 text-zinc-300 placeholder:text-zinc-500" : "bg-white/60 border-zinc-200 text-zinc-800 placeholder:text-zinc-400"}`,
            onMouseDown: at => at.stopPropagation(),
            disabled: he
          })]
        })
      }), c.jsxs("div", {
        className: `qiaodoumayi-aux-gen-toolbar flex flex-wrap items-center gap-2 px-3 py-2 border-b shrink-0 ${t ? "border-zinc-700" : "border-zinc-200"}`,
        children: [R && c.jsx(VJe, {
          variant: "inline",
          nodeId: e.id,
          isDark: t,
          currentModel: M,
          settings: e.settings || {},
          activeDropdown: null,
          setActiveDropdown: () => {},
          onApply: at => {
            n(e.id, {
              settings: {
                ...(e.settings || {}),
                ...at
              }
            });
          },
          onSaveModelMemory: at => cl(M, at)
        }), P.length > 0 && !R && c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx("span", {
            className: "text-[10px] text-zinc-500",
            children: x("分辨率")
          }), c.jsx("div", {
            className: "flex gap-0.5 flex-wrap",
            children: P.map(at => c.jsx("button", {
              onClick: () => {
                n(e.id, {
                  settings: {
                    ...(e.settings || {}),
                    resolution: at
                  }
                }), cl(M, {
                  resolution: at
                });
              },
              className: `px-2 py-0.5 rounded text-[10px] border ${O === at ? t ? "border-zinc-500 text-zinc-300 bg-white/10" : "bg-zinc-900 text-white border-zinc-900" : t ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
              children: at
            }, at))
          })]
        }), !R && c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx("span", {
            className: "text-[10px] text-zinc-500",
            children: x("比例")
          }), c.jsx(UJe, {
            isDark: t,
            selectedRatio: V,
            filterRatios: T,
            onSelect: at => {
              n(e.id, {
                settings: {
                  ...(e.settings || {}),
                  ratio: at
                }
              }), cl(M, {
                aspectRatio: at
              });
            }
          })]
        }), W ? c.jsx(Ku, {
          nodeId: e.id,
          platformGroup: Q,
          modelName: (Y == null ? void 0 : Y.modelName) || M,
          modelId: M,
          modelConfigId: M,
          uiResolution: O,
          isDark: t,
          nodeSettings: e.settings,
          updateNode: n,
          compact: !0,
          buttonVariant: "square",
          menuPlacement: "below"
        }) : null, (F || G || N) && c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx("span", {
            className: "text-[10px] text-zinc-500",
            children: x("画质")
          }), c.jsx("div", {
            className: "flex gap-0.5 flex-wrap",
            children: (F || G ? [...gTt(M)] : ["auto", "high", "medium", "low"]).map(at => {
              var xt, yn, gn;
              const Pt = F || G ? TP(M, (xt = e.settings) == null ? void 0 : xt.gptImageQuality, (yn = zs(M)) == null ? void 0 : yn.gptImageQuality) : String(((gn = e.settings) == null ? void 0 : gn.gptImageQuality) || "high"),
                dt = F || G ? TWe(M)[at] || at : MWe[at] || at;
              return c.jsx("button", {
                type: "button",
                onClick: () => {
                  n(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      gptImageQuality: at
                    }
                  }), cl(M, {
                    gptImageQuality: at
                  });
                },
                className: `px-2 py-0.5 rounded text-[10px] border ${Pt === at ? t ? "border-zinc-500 text-zinc-300 bg-white/10" : "bg-zinc-900 text-white border-zinc-900" : t ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
                children: dt
              }, at);
            })
          })]
        }), j && c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx("span", {
            className: "text-[10px] text-zinc-500",
            children: x("画质")
          }), c.jsx("div", {
            className: "flex gap-0.5 flex-wrap",
            children: [...zqe(M)].map(at => {
              var xt, yn;
              const Pt = IZ(M, (xt = e.settings) == null ? void 0 : xt.gptImageQuality, (yn = zs(M)) == null ? void 0 : yn.gptImageQuality),
                dt = rIe(M)[at] || at;
              return c.jsx("button", {
                type: "button",
                onClick: () => {
                  n(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      gptImageQuality: at
                    }
                  }), cl(M, {
                    gptImageQuality: at
                  });
                },
                className: `px-2 py-0.5 rounded text-[10px] border ${Pt === at ? t ? "border-zinc-500 text-zinc-300 bg-white/10" : "bg-zinc-900 text-white border-zinc-900" : t ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
                children: dt
              }, at);
            })
          })]
        }), z && c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx("span", {
            className: "text-[10px] text-zinc-500",
            children: x("画质")
          }), c.jsx("div", {
            className: "flex gap-0.5",
            children: ["standard", "hd"].map(at => {
              var Pt;
              return c.jsx("button", {
                type: "button",
                onClick: () => {
                  n(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      gptImageQuality: at
                    }
                  }), cl(M, {
                    gptImageQuality: at
                  });
                },
                className: `px-2 py-0.5 rounded text-[10px] border ${String(((Pt = e.settings) == null ? void 0 : Pt.gptImageQuality) || "standard") === at ? t ? "border-zinc-500 text-zinc-300 bg-white/10" : "bg-zinc-900 text-white border-zinc-900" : t ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
                children: at === "hd" ? "HD" : "Std"
              }, at);
            })
          })]
        }), j && c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx("span", {
            className: "text-[10px] text-zinc-500",
            children: x("审核")
          }), c.jsx("div", {
            className: "flex gap-0.5",
            children: J6t.map(at => {
              var dt;
              const Pt = cX((dt = e.settings) == null ? void 0 : dt.gptImageModeration);
              return c.jsx("button", {
                type: "button",
                title: x("内容审核"),
                onClick: () => {
                  n(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      gptImageModeration: at
                    }
                  }), cl(M, {
                    gptImageModeration: at
                  });
                },
                className: `px-2 py-0.5 rounded text-[10px] border ${Pt === at ? t ? "border-zinc-500 text-zinc-300 bg-white/10" : "bg-zinc-900 text-white border-zinc-900" : t ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
                children: x(Uxe[at])
              }, at);
            })
          })]
        }), B && c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx("span", {
            className: "text-[10px] text-zinc-500",
            children: x("背景")
          }), c.jsx("div", {
            className: "flex gap-0.5",
            children: eMt.map(at => {
              var dt;
              const Pt = dX((dt = e.settings) == null ? void 0 : dt.gptImageBackground);
              return c.jsx("button", {
                type: "button",
                title: x("背景"),
                onClick: () => {
                  n(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      gptImageBackground: at
                    }
                  }), cl(M, {
                    gptImageBackground: at
                  });
                },
                className: `px-2 py-0.5 rounded text-[10px] border ${Pt === at ? t ? "border-zinc-500 text-zinc-300 bg-white/10" : "bg-zinc-900 text-white border-zinc-900" : t ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
                children: x($xe[at])
              }, at);
            })
          })]
        })]
      }), c.jsxs("div", {
        ref: Ce,
        className: "flex-1 overflow-y-auto minimal-scrollbar p-3 min-h-0",
        "data-chart-scroll-area": !0,
        onWheel: at => at.stopPropagation(),
        style: {
          overscrollBehavior: "contain"
        },
        children: [c.jsxs("div", {
          className: `qiaodoumayi-aux-gen-toolbar flex items-center gap-2 mb-2 min-h-[28px] ${t ? "text-zinc-400" : "text-zinc-600"}`,
          children: [c.jsx(Th, {
            scopeId: e.id,
            dropdownType: "chart-image-model",
            value: M,
            models: H,
            isDark: t,
            activeDropdown: ie,
            setActiveDropdown: ae,
            onSelect: D,
            buttonVariant: "bare",
            logoKind: "image",
            showChannelBar: !0,
            channelKind: "gen"
          }), c.jsx("span", {
            className: "text-[10px]",
            children: L
          })]
        }), q.length > 0 && c.jsxs("div", {
          className: "mb-2 flex gap-1.5 items-center flex-wrap",
          "data-image-reorder-thumb": !0,
          onDragOver: at => {
            at.preventDefault(), at.stopPropagation(), at.dataTransfer.dropEffect = "move";
          },
          children: [de.slice(0, y === "low" ? 6 : 14).map((at, Pt) => {
            const {
                imgSrc: dt,
                refAssetId: xt,
                referenceThumbSrc: yn,
                isResolvingLocalRef: gn,
                mediaType: mt,
                sourceNode: Xt
              } = at,
              Gn = y === "high" || Pt < 6;
            return c.jsxs("div", {
              "data-image-reorder-thumb": !0,
              className: `relative shrink-0 cursor-grab active:cursor-grabbing touch-none select-none ${Ke === Pt ? "opacity-60 scale-95" : ""}`,
              title: x("长按拖拽可调换图片顺序，点击插入 @ 引用"),
              draggable: !0,
              onMouseEnter: () => Le(Pt),
              onMouseLeave: () => Le(null),
              onDragStart: rr => {
                if (rr.target.closest("button")) {
                  rr.preventDefault();
                  return;
                }
                rr.dataTransfer.setData("text/plain", String(Pt)), rr.dataTransfer.effectAllowed = "move", rr.stopPropagation(), Xe(Pt);
              },
              onDragEnd: () => Xe(null),
              onDragEnter: rr => {
                rr.preventDefault(), rr.stopPropagation(), rr.dataTransfer.dropEffect = "move";
              },
              onDragOver: rr => {
                rr.preventDefault(), rr.stopPropagation(), rr.dataTransfer.dropEffect = "move";
              },
              onDrop: rr => {
                rr.preventDefault(), rr.stopPropagation();
                const qn = Number(rr.dataTransfer.getData("text/plain"));
                !Number.isNaN(qn) && qn !== Pt && X(qn, Pt);
              },
              children: [c.jsx("span", {
                className: "absolute -top-1 -left-1 w-3.5 h-3.5 text-[8px] font-semibold rounded-full bg-zinc-700 text-white flex items-center justify-center border border-white/70 shadow-sm leading-none z-[1] pointer-events-none",
                children: Pt + 1
              }), c.jsx("button", {
                type: "button",
                onClick: rr => we(dt, rr),
                className: `absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-opacity z-[2] ${ze === Pt ? "opacity-100" : "opacity-0"} ${t ? "bg-red-600 hover:bg-red-500" : "bg-red-500 hover:bg-red-600"} text-white shadow-lg`,
                title: x("取消引用"),
                onMouseDown: rr => rr.stopPropagation(),
                children: c.jsx("svg", {
                  width: "6",
                  height: "6",
                  viewBox: "0 0 8 8",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: c.jsx("path", {
                    d: "M1 1L7 7M7 1L1 7",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                  })
                })
              }), c.jsx("div", {
                role: "button",
                tabIndex: 0,
                onClick: rr => {
                  rr.stopPropagation(), qe(Pt + 1);
                },
                onKeyDown: rr => {
                  (rr.key === "Enter" || rr.key === " ") && (rr.preventDefault(), qe(Pt + 1));
                },
                className: `w-9 h-9 rounded border overflow-hidden cursor-pointer ${t ? "border-zinc-700 bg-zinc-800 hover:ring-2 hover:ring-zinc-400/50" : "border-zinc-300 bg-zinc-200 hover:ring-2 hover:ring-zinc-400/50"}`,
                title: x("点击插入 @{0}", Pt + 1),
                children: Gn ? c.jsx(ZQ, {
                  rawUrl: dt,
                  displaySrc: le[yn] || yn || wk(dt, Xt) || dt,
                  mediaType: mt,
                  sourceNode: Xt,
                  className: "w-full h-full object-cover",
                  alt: x("图{0}", Pt + 1),
                  isDark: t,
                  isLoading: gn,
                  useThumbnail: !0,
                  preferConstantDisplay: !0,
                  blobRecoveryAssetIds: xt ? [xt] : void 0
                }) : c.jsx("div", {
                  className: `w-full h-full ${t ? "bg-zinc-800" : "bg-zinc-200"}`
                })
              })]
            }, `${dt}-${Pt}`);
          }), c.jsxs("span", {
            className: `text-[9px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
            children: [q.length, x("张引用")]
          })]
        }), c.jsx("div", {
          ref: He,
          "data-chart-cell-area": !0,
          className: "grid gap-1.5",
          style: {
            gridTemplateColumns: `repeat(${C}, 1fr)`,
            overscrollBehavior: "contain"
          },
          children: E.map((at, Pt) => {
            const dt = at.prompt.match(/@(\d+)/g) || [];
            return c.jsxs("div", {
              "data-chart-cell": !0,
              className: `rounded border min-h-0 flex flex-col ${t ? "border-zinc-600/80" : "border-black/20"}`,
              children: [c.jsxs("div", {
                className: "px-1.5 pt-1 pb-0.5 flex items-center justify-between gap-1 border-b border-transparent",
                children: [c.jsxs("div", {
                  className: "flex flex-wrap gap-0.5 items-center",
                  children: [dt.map((xt, yn) => c.jsx("span", {
                    className: `inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium ${t ? "bg-white/10 text-zinc-200 border border-white/25" : "bg-zinc-100 text-zinc-800 border border-zinc-300"}`,
                    title: x("已引用图片"),
                    children: xt
                  }, `${xt}-${yn}`)), pe.length > 0 && c.jsxs("select", {
                    value: at.linkNodeId || "",
                    onChange: xt => st(Pt, xt.target.value),
                    className: `px-1.5 py-0.5 rounded text-[9px] border outline-none max-w-[120px] ${t ? "bg-[#1f1f1f] border-zinc-600 text-zinc-300" : "bg-white border-zinc-300 text-zinc-700"}`,
                    title: x("绑定文本/Agent节点（该宫格可直接使用节点文本）"),
                    onMouseDown: xt => xt.stopPropagation(),
                    children: [c.jsx("option", {
                      value: "",
                      children: x("未绑定")
                    }), pe.map(xt => c.jsx("option", {
                      value: xt.id,
                      children: (xt.nodeName || (xt.type === "custom-agent" ? "Agent节点" : "文本节点")).slice(0, 20)
                    }, xt.id))]
                  })]
                }), u && c.jsx("button", {
                  type: "button",
                  className: `px-1.5 py-0.5 rounded text-[9px] border ${t ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800" : "border-black bg-black text-white hover:bg-zinc-800"}`,
                  title: x("仅生成此宫格"),
                  disabled: hn === Pt,
                  onClick: async xt => {
                    var mt;
                    xt.stopPropagation();
                    const yn = E[Pt],
                      gn = Ht(yn, Pt);
                    if (!gn && (!yn.refs || yn.refs.length === 0) && !vt(yn.linkNodeId)) {
                      alert(x("当前宫格没有内容（可填写文本、引用图片，或绑定文本/Agent节点）"));
                      return;
                    }
                    try {
                      Qt(Pt);
                      const Xt = me !== "auto" && ((mt = f.find(Dn => Dn.id === me)) == null ? void 0 : mt.prompt) || "";
                      let Gn = gn;
                      try {
                        const Dn = JSON.parse(gn);
                        Dn && typeof Dn.prompt == "string" && (Gn = Dn.prompt.trim());
                      } catch {}
                      yn.refs && yn.refs.length > 0 && (Gn = (Gn + " " + yn.refs.map(Dn => `@${Dn}`).join(" ")).trim());
                      let rr = Gn || Ht(yn, Pt);
                      if (f.length > 0) {
                        const Dn = [...f].sort((Ar, _r) => {
                          var Pa, fa;
                          return (((Pa = _r.prompt) == null ? void 0 : Pa.length) || 0) - (((fa = Ar.prompt) == null ? void 0 : fa.length) || 0);
                        });
                        for (const Ar of Dn) {
                          const _r = (Ar.prompt || "").trim();
                          if (_r) {
                            if (rr === _r) {
                              rr = "";
                              break;
                            }
                            if (rr.startsWith(_r + ", ")) {
                              rr = rr.slice(_r.length + 2).trim();
                              break;
                            }
                            if (rr.startsWith(_r + ",")) {
                              rr = rr.slice(_r.length + 1).trim();
                              break;
                            }
                            if (rr.startsWith(_r)) {
                              rr = rr.slice(_r.length).trim();
                              break;
                            }
                          }
                        }
                        rr.trim() || (rr = Gn || Ht(yn, Pt));
                      }
                      const qn = Xt ? `${Xt}, ${rr}` : rr;
                      await u({
                        nodeId: e.id,
                        cells: [{
                          id: yn.id,
                          prompt: qn
                        }],
                        model: M,
                        ratio: V,
                        resolution: O,
                        refImages: q,
                        connections: r,
                        nodes: a,
                        updateNode: n,
                        setNodes: h,
                        setConnections: p,
                        generateId: m,
                        gridRows: _ === "grid" ? Math.ceil(S / 3) : w,
                        gridCols: C,
                        cellIndices: [Pt]
                      });
                    } catch (Xt) {
                      console.error("[StoryboardChart] 单格生成失败:", Xt), alert(x(SU(Xt instanceof Error ? Xt.message : "未知错误")));
                    } finally {
                      Qt(Xt => Xt === Pt ? null : Xt);
                    }
                  },
                  children: x(hn === Pt ? "生成中..." : "生成")
                })]
              }), c.jsx("textarea", {
                ref: xt => {
                  xt && Ze.current.set(Pt, xt);
                },
                value: at.prompt,
                onChange: xt => Oe(Pt, xt.target.value),
                onKeyDown: xt => At(Pt, xt),
                onFocus: () => {
                  We.current = Pt;
                },
                placeholder: x("输入描述，@ 引用图片（可绑定文本/Agent节点）"),
                rows: 3,
                className: `w-full flex-1 min-h-0 px-1.5 py-1 text-[10px] resize-none outline-none bg-transparent border-0 rounded minimal-scrollbar overflow-y-auto ${t ? "text-zinc-200 placeholder:text-zinc-500" : "text-zinc-800 placeholder:text-zinc-400"}`,
                style: {
                  height: I,
                  maxHeight: I
                },
                onMouseDown: xt => xt.stopPropagation()
              })]
            }, at.id);
          })
        })]
      }), rn && rt !== null && q.length > 0 && Da.createPortal(c.jsx("div", {
        className: `fixed z-[9999] rounded-lg border shadow-xl overflow-hidden max-h-48 overflow-y-auto ${t ? "border-zinc-600" : "border-zinc-200"}`,
        style: {
          left: rn.left,
          bottom: typeof window < "u" ? window.innerHeight - rn.top + 8 : void 0,
          width: Math.max(rn.width, 200)
        },
        onMouseDown: at => at.preventDefault(),
        children: c.jsx("div", {
          className: t ? "bg-zinc-800 border-zinc-600" : "bg-white border-zinc-200",
          children: de.map((at, Pt) => c.jsxs("button", {
            type: "button",
            className: `w-full flex items-center gap-2 px-3 py-2 text-left text-xs ${t ? "hover:bg-zinc-700 text-zinc-200" : "hover:bg-zinc-100 text-zinc-800"}`,
            onClick: () => Yt(rt, Pt + 1),
            children: [c.jsx("div", {
              className: "w-10 h-10 rounded overflow-hidden shrink-0",
              children: c.jsx(ZQ, {
                rawUrl: at.imgSrc,
                displaySrc: le[at.referenceThumbSrc] || at.referenceThumbSrc || wk(at.imgSrc, at.sourceNode) || at.imgSrc,
                mediaType: at.mediaType,
                sourceNode: at.sourceNode,
                className: "w-full h-full object-cover",
                alt: x("图{0}", Pt + 1),
                isDark: t,
                isLoading: at.isResolvingLocalRef,
                useThumbnail: !0,
                preferConstantDisplay: !0,
                blobRecoveryAssetIds: at.refAssetId ? [at.refAssetId] : void 0
              })
            }), c.jsxs("span", {
              children: [x("图"), Pt + 1]
            })]
          }, `${at.imgSrc}-${Pt}`))
        })
      }), document.body), c.jsx("div", {
        className: `flex justify-end px-3 py-2 border-t shrink-0 ${t ? "border-zinc-700" : "border-zinc-200"}`,
        children: c.jsx("button", {
          onClick: Ot,
          disabled: kt,
          className: `flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium transition-colors ${kt ? t ? "bg-zinc-700 text-zinc-500 cursor-not-allowed" : "bg-zinc-200 text-zinc-500 cursor-not-allowed" : t ? "bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-600 text-zinc-200" : "bg-black hover:bg-zinc-800 text-white"}`,
          children: kt ? c.jsx(c.Fragment, {
            children: x("生成中...")
          }) : c.jsxs(c.Fragment, {
            children: [c.jsx(Ol, {
              size: 14,
              fill: "currentColor"
            }), x("生成")]
          })
        })
      })]
    });
    return De ? Da.createPortal(c.jsx("div", {
      className: "fixed inset-0 z-[99999] flex flex-col overflow-hidden",
      style: {
        backgroundColor: t ? "#09090b" : "#f4f4f5"
      },
      children: Ct
    }), document.body) : Ct;
  },
  xyo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    setNodes: i,
    setConnections: o,
    apiConfigs: s,
    generateId: l,
    handleGeneratePrompts: d,
    handleAutoVideoAnalysis: u,
    activeDropdown: h = null,
    setActiveDropdown: p = hP
  }) => {
    var fe, ye, ie, ae, be, Ee, xe, he, ue;
    on();
    const [m, f] = g.useState(!1),
      [y, b] = g.useState(!1),
      [v, _] = g.useState(() => {
        var ge;
        return !!((ge = e.settings) != null && ge.agentUseAliyunOss);
      });
    g.useEffect(() => {
      var ge;
      _(!!((ge = e.settings) != null && ge.agentUseAliyunOss));
    }, [e.id, (fe = e.settings) == null ? void 0 : fe.agentUseAliyunOss]), g.useEffect(() => {
      !e.isGenerating && m && f(!1);
    }, [e.isGenerating, m]);
    const [w, k] = g.useState(() => ua()),
      [A, S] = g.useState(() => Ph());
    g.useEffect(() => {
      const ge = () => {
        k(ua()), S(Ph());
      };
      return ge(), window.addEventListener(go, ge), () => window.removeEventListener(go, ge);
    }, []);
    const C = g.useMemo(() => new Map(t.map(ge => [ge.id, ge])), [t]),
      I = g.useMemo(() => n.filter(ge => ge.to === e.id).map(ge => C.get(ge.from)).find(ge => {
        if (!ge) return !1;
        if (ge.type === "video-input") return !0;
        if (ge.type === "input-image" && ge.content) {
          const _e = ge.content;
          return Sh(_e) || _e.startsWith("blob:");
        }
        return !1;
      }), [n, e.id, C]),
      E = g.useMemo(() => {
        if (!I || I.content || I.type !== "video-input") return null;
        for (const ge of n) {
          if (ge.to !== I.id) continue;
          const _e = C.get(ge.from);
          if ((_e == null ? void 0 : _e.type) === "input-image" && _e.content) {
            const ke = _e.content;
            if (Sh(ke) || ke.startsWith("blob:")) return ke;
          }
        }
        return null;
      }, [I, n, C]),
      M = (I == null ? void 0 : I.content) || E || void 0,
      {
        content: T,
        isLoading: P
      } = Kp(M, {
        nodeType: "video-input",
        preferConstantDisplay: !0,
        allowSessionBlob: !0,
        allowDirectOssUrl: !0
      }),
      R = _c(T || M || "") || T || M || "",
      j = I ? I.videoPosterUrl : void 0,
      B = g.useMemo(() => s.filter(ge => ge.type === "Chat"), [s]),
      F = ((ye = e.settings) == null ? void 0 : ye.chatModel) || ((ie = e.settings) == null ? void 0 : ie.model) || "gemini-3-pro",
      N = If(F).id,
      G = g.useMemo(() => B.find(ge => ge.id === N) || B[0], [B, N]),
      z = (G == null ? void 0 : G.modelName) || N,
      V = Wk(N, z),
      O = TT(N, z),
      L = Qa.getGlobalBaseUrl(),
      D = g.useMemo(() => !!G && od(G, L), [G, L]),
      U = g.useMemo(() => {
        var ke;
        const ge = String(((ke = e.settings) == null ? void 0 : ke.platformGroup) ?? "").trim();
        if (ge) return ge;
        const _e = zs(N);
        return (_e == null ? void 0 : _e.platformGroup) || ko;
      }, [(ae = e.settings) == null ? void 0 : ae.platformGroup, N]),
      [H, Y] = g.useState(() => {
        var ge;
        return ow((ge = e.settings) == null ? void 0 : ge.videoAnalyzeGeminiApiFormat);
      });
    g.useEffect(() => {
      var ge;
      Y(ow((ge = e.settings) == null ? void 0 : ge.videoAnalyzeGeminiApiFormat));
    }, [(be = e.settings) == null ? void 0 : be.videoAnalyzeGeminiApiFormat]);
    const [K, W] = g.useState(() => {
      var ge;
      return Qv(N, If(F).effort ?? ((ge = e.settings) == null ? void 0 : ge.videoAnalyzeReasoningEffort), z);
    });
    g.useEffect(() => {
      var ge;
      W(Qv(N, (ge = e.settings) == null ? void 0 : ge.videoAnalyzeReasoningEffort, z));
    }, [(Ee = e.settings) == null ? void 0 : Ee.videoAnalyzeReasoningEffort, N, z]), g.useEffect(() => {
      const ge = If(F);
      ge.id !== F && (a(e.id, {
        settings: {
          ...e.settings,
          chatModel: ge.id,
          model: ge.id,
          ...(ge.effort ? {
            videoAnalyzeReasoningEffort: ge.effort
          } : {})
        }
      }), ge.effort && W(ge.effort));
    }, [F, e.id, e.settings, a]);
    const Q = g.useCallback(ge => {
        const _e = zs(ge);
        a(e.id, {
          settings: {
            ...e.settings,
            chatModel: ge,
            model: ge,
            platformGroup: (_e == null ? void 0 : _e.platformGroup) || ko
          }
        });
      }, [e.id, e.settings, a]),
      q = g.useCallback(ge => {
        Y(ge), a(e.id, {
          settings: {
            ...e.settings,
            videoAnalyzeGeminiApiFormat: ge
          }
        });
      }, [e.id, e.settings, a]),
      ne = g.useCallback(ge => {
        W(ge), a(e.id, {
          settings: {
            ...e.settings,
            videoAnalyzeReasoningEffort: ge
          }
        });
      }, [e.id, e.settings, a]),
      de = g.useCallback(ge => {
        a(e.id, {
          settings: {
            ...e.settings,
            platformGroup: ge
          }
        });
      }, [e.id, e.settings, a]);
    if (!I) return c.jsx("div", {
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto video-analyze-container ${r ? "bg-[#1f1f1f]" : "bg-white"}`,
      children: c.jsx("div", {
        className: "flex-1 flex flex-col gap-3 p-3 overflow-hidden min-h-0",
        children: c.jsxs("div", {
          className: "flex flex-col items-center justify-center flex-1 gap-2 text-[11px] text-zinc-500",
          children: [c.jsx(w5e, {
            size: 24,
            className: "text-zinc-400"
          }), c.jsx("span", {
            children: x("请连接一个视频输入节点")
          })]
        })
      })
    });
    const le = I.type === "input-image";
    let J = I.videoFileName;
    if (!J && le) {
      if (J = I.nodeName, !J && I.prompt) {
        const ge = I.prompt;
        ge.includes(".") && (ge.includes(".mp4") || ge.includes(".webm") || ge.includes(".mov")) && (J = ge);
      }
      if (!J && I.content) {
        const ge = I.content;
        if (ge.includes("/")) {
          const _e = ge.split("/"),
            ke = _e[_e.length - 1];
          ke && (ke.includes(".mp4") || ke.includes(".webm") || ke.includes(".mov")) && (J = ke);
        }
      }
      J || (J = "来自图片输入节点");
    } else J || (J = "未命名视频");
    const pe = ((xe = I.videoMeta) == null ? void 0 : xe.duration) || 0,
      ce = I.selectedKeyframes || [];
    (he = e.settings) != null && he.analysisMode;
    const we = e.isGenerating || m,
      X = ((ue = e.settings) == null ? void 0 : ue.customAnalysisPrompt) || "",
      Z = ge => {
        var Te, Ne;
        if (le) return null;
        const _e = I,
          ke = (Te = _e.selectedKeyframes) == null ? void 0 : Te.find(me => Math.abs(me.time - ge) < .1);
        if (ke) return ke.url;
        const ve = (Ne = _e.frames) == null ? void 0 : Ne.find(me => Math.abs(me.time - ge) < .1);
        return (ve == null ? void 0 : ve.url) || null;
      },
      re = ge => {
        const _e = e.x + e.width + 100,
          ke = e.y + e.height / 2,
          ve = l(),
          Te = {
            id: ve,
            type: "gen-image",
            x: _e - 180,
            y: ke - 170,
            width: 360,
            height: 340,
            settings: {
              model: "mj-v6",
              prompt: ge,
              ratio: "Auto",
              resolution: "Auto"
            }
          };
        i(Ne => [...Ne, Te]), setTimeout(() => {
          const Ne = l(),
            me = {
              id: Ne,
              type: "preview",
              x: _e + 200,
              y: ke - 130,
              width: 320,
              height: 260
            };
          i(Ae => [...Ae, me]), o(Ae => [...Ae, {
            id: l(),
            from: ve,
            to: Ne
          }]);
        }, 50);
      };
    return c.jsx("div", {
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto video-analyze-container ${r ? "bg-[#1f1f1f]" : "bg-white"}`,
      children: c.jsxs("div", {
        className: "flex-1 flex flex-col gap-3 p-3 overflow-hidden min-h-0",
        children: [c.jsxs("div", {
          className: "space-y-2",
          children: [c.jsxs("div", {
            className: `text-[11px] px-2 py-1.5 rounded border ${r ? "bg-transparent border-white/30" : "bg-zinc-50 border-zinc-300"}`,
            children: [c.jsx("div", {
              className: "flex items-center justify-between mb-1",
              children: c.jsx("span", {
                className: "text-zinc-500",
                children: x("关联的视频")
              })
            }), c.jsx("div", {
              className: r ? "text-zinc-300" : "text-zinc-700",
              children: c.jsxs("div", {
                className: "flex gap-2 items-start",
                children: [c.jsx("div", {
                  className: `relative shrink-0 w-14 h-14 rounded border overflow-hidden flex items-center justify-center ${r ? "bg-[#1f1f1f] border-white/20" : "bg-zinc-100 border-zinc-300"}`,
                  children: P ? c.jsx(Ua, {
                    size: 16,
                    className: "animate-spin text-zinc-500"
                  }) : R ? c.jsxs(c.Fragment, {
                    children: [c.jsx("video", {
                      src: R,
                      poster: j,
                      muted: !0,
                      playsInline: !0,
                      preload: "metadata",
                      className: "w-full h-full object-cover"
                    }), c.jsx("div", {
                      className: "absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none",
                      children: c.jsx(Oo, {
                        size: 14,
                        className: "text-white"
                      })
                    })]
                  }) : c.jsx(Oo, {
                    size: 14,
                    className: "text-zinc-500"
                  })
                }), c.jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [c.jsxs("div", {
                    className: "truncate",
                    title: J,
                    children: [x("文件名: "), J]
                  }), !le && c.jsxs(c.Fragment, {
                    children: [c.jsxs("div", {
                      children: [x("总时长: "), pe.toFixed(1), "s"]
                    }), c.jsxs("div", {
                      children: [x("已选关键帧: "), ce.length, x(" 个")]
                    })]
                  })]
                })]
              })
            })]
          }), c.jsxs("div", {
            className: "flex flex-wrap items-center gap-2",
            children: [c.jsx("label", {
              className: "text-[11px] text-zinc-500 shrink-0",
              children: x("Chat模型:")
            }), c.jsx(Th, {
              scopeId: e.id,
              dropdownType: "video-analyze-chat-model",
              value: N,
              models: B,
              isDark: r,
              activeDropdown: h,
              setActiveDropdown: p,
              onSelect: Q,
              className: "flex-1 min-w-0"
            }), V ? c.jsx(_$, {
              nodeId: e.id,
              dropdownType: "video-analyze-gemini-api-format",
              value: H,
              isDark: r,
              activeDropdown: h,
              setActiveDropdown: p,
              onSelect: q,
              buttonClassName: "shrink-0 text-[11px]",
              menuClassName: "w-44"
            }) : null, O ? c.jsx(dT, {
              nodeId: e.id,
              dropdownType: "video-analyze-reasoning-effort",
              value: K,
              isDark: r,
              activeDropdown: h,
              setActiveDropdown: p,
              onSelect: ne,
              buttonClassName: "shrink-0 text-[11px]",
              modelId: N,
              modelName: z
            }) : null, D ? c.jsx(Ku, {
              nodeId: e.id,
              platformGroup: U,
              modelName: z,
              modelId: N,
              modelConfigId: G == null ? void 0 : G.id,
              isDark: r,
              nodeSettings: e.settings,
              updateNode: a,
              onGroupChange: de,
              compact: !0,
              buttonVariant: "square",
              className: "shrink-0"
            }) : null, !w && A ? c.jsxs("label", {
              className: `px-2 py-1 text-[10px] rounded border transition-colors flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap ${r ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
              onMouseDown: ge => ge.stopPropagation(),
              title: x("勾选后：关联视频先上传至「设置 → 画布功能 → 图床」中的阿里云 OSS，以公网 URL 调用模型；不勾选使用画布默认方式"),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: v,
                onChange: ge => {
                  const _e = ge.target.checked;
                  _(_e), a(e.id, {
                    settings: {
                      ...e.settings,
                      agentUseAliyunOss: _e
                    }
                  });
                },
                className: "h-3 w-3 cursor-pointer"
              }), c.jsx("span", {
                className: "whitespace-nowrap",
                children: "OSS"
              })]
            }) : null]
          }), c.jsxs("div", {
            className: "flex flex-col gap-1",
            children: [c.jsxs("button", {
              type: "button",
              onClick: () => b(ge => !ge),
              onMouseDown: ge => ge.stopPropagation(),
              className: `w-full flex items-center justify-between gap-2 text-left px-2 py-1 rounded border ${r ? "bg-transparent border-white/30" : "bg-white border-zinc-300"}`,
              children: [c.jsx("span", {
                className: "text-[11px] text-zinc-500",
                children: x("自定义 Prompt（可选）")
              }), c.jsx("span", {
                className: `text-[11px] text-zinc-500 transition-transform ${y ? "rotate-0" : "rotate-90"}`,
                "aria-hidden": !0,
                children: "▶"
              })]
            }), !y && c.jsx("textarea", {
              value: X,
              placeholder: x("留空则使用默认拆解；写入详细要求则按你的要求拆解（例如：风格、镜头语言、节奏、人物情绪等）"),
              rows: 3,
              onChange: ge => {
                const _e = ge.target.value;
                a(e.id, {
                  settings: {
                    ...e.settings,
                    customAnalysisPrompt: _e
                  }
                });
              },
              onMouseDown: ge => ge.stopPropagation(),
              className: `w-full px-2 py-1 text-[11px] rounded border outline-none focus:outline-none focus:ring-0 resize-none ${r ? "bg-transparent border-white/30 text-white" : "bg-white border-zinc-300 text-zinc-800"}`
            })]
          }), window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(N) && c.jsx("div", {
            className: "text-[10px] text-amber-500 px-2 py-1",
            "data-native-analysis-scope": "video-analyze",
            children: aiyouplusAnalysisScopeLabel(e.settings?.nativeAnalysisScope)
          }), (I?.selectedKeyframes?.length || 0) > 0 && c.jsx("button", {
            type: "button",
            onClick: () => { f(!0); d(e.id); },
            disabled: we,
            className: "w-full px-3 py-2 rounded border text-xs border-blue-500/50 text-blue-500 disabled:opacity-50",
            onMouseDown: ge => ge.stopPropagation(),
            children: `分析已选关键帧（${I.selectedKeyframes.length}）`
          }), c.jsx("button", {
            onClick: () => {
              f(!0), u(e.id);
            },
            disabled: we,
            className: `w-full px-3 py-2 rounded border text-xs font-medium transition-colors flex items-center justify-center gap-2 ${we ? r ? "bg-transparent text-white/50 border-white/20 cursor-not-allowed" : "bg-black text-white/60 cursor-not-allowed border-transparent" : r ? "bg-transparent hover:bg-transparent text-white border-white/30" : "bg-black hover:bg-[#1f1f1f] text-white shadow-lg border-transparent"}`,
            onMouseDown: ge => ge.stopPropagation(),
            children: we ? c.jsxs(c.Fragment, {
              children: [c.jsx(Ua, {
                size: 14,
                className: "animate-spin"
              }), c.jsx("span", {
                children: x("AI 正在拆解视频中...")
              })]
            }) : c.jsx(c.Fragment, {
              children: c.jsx("span", {
                children: x("开始拆解视频")
              })
            })
          }), e.errorMsg && c.jsx("div", {
            className: "text-[10px] text-red-500 px-2 py-1 rounded bg-red-500/10",
            children: e.errorMsg
          })]
        }), e.analysisResults && e.analysisResults.length > 0 && c.jsxs("div", {
          className: "space-y-2 flex-1 flex flex-col min-h-0",
          children: [c.jsxs("div", {
            className: "text-[11px] font-medium text-zinc-700 dark:text-zinc-300 shrink-0 flex items-center gap-1",
            children: [c.jsx(Kh, {
              size: 12
            }), x(" 拆解提示词 ("), e.analysisResults.length, x(" 个场景)")]
          }), c.jsx("div", {
            className: "space-y-2 flex-1 overflow-y-auto custom-scrollbar min-h-0",
            children: e.analysisResults.map((ge, _e) => {
              var Ae, Fe, Me, Re, $e, rt, nt, ze;
              const ke = ((Ae = ge.keyframes) == null ? void 0 : Ae.find(Le => Le.type === "current")) || ((Fe = ge.keyframes) == null ? void 0 : Fe[0]),
                ve = (Me = ge.keyframes) == null ? void 0 : Me.find(Le => Le.type === "prev"),
                Te = (Re = ge.keyframes) == null ? void 0 : Re.find(Le => Le.type === "next"),
                Ne = (ke == null ? void 0 : ke.description) || ((rt = ($e = ge.keyframes) == null ? void 0 : $e[0]) == null ? void 0 : rt.description) || "无描述",
                me = (((nt = e.settings) == null ? void 0 : nt.expandedScenes) || []).includes(_e);
              return c.jsxs("div", {
                className: `rounded-lg border overflow-hidden ${r ? "bg-transparent border-white/30" : "bg-white border-zinc-300"}`,
                children: [c.jsx("button", {
                  className: `w-full px-3 py-2 flex items-center justify-between text-left transition-colors ${r ? "hover:bg-zinc-700/50" : "hover:bg-zinc-50"}`,
                  onClick: () => {
                    var Xe;
                    const Le = ((Xe = e.settings) == null ? void 0 : Xe.expandedScenes) || [],
                      Ke = me ? Le.filter(De => De !== _e) : [...Le, _e];
                    a(e.id, {
                      settings: {
                        ...e.settings,
                        expandedScenes: Ke
                      }
                    });
                  },
                  onMouseDown: Le => Le.stopPropagation(),
                  children: c.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [c.jsx(ss, {
                      size: 14,
                      className: `transition-transform ${me ? "rotate-90" : ""}`
                    }), c.jsxs("span", {
                      className: "font-medium text-[11px]",
                      children: [x("场景 "), ge.scene_index || _e + 1]
                    }), c.jsx("span", {
                      className: "text-[10px] text-zinc-500",
                      children: ge.time_range
                    })]
                  })
                }), me && c.jsxs("div", {
                  className: "px-3 pb-3 space-y-3",
                  children: [c.jsx("div", {
                    className: "text-[10px] text-zinc-600 dark:text-zinc-400 line-clamp-2 select-text cursor-text",
                    onMouseDown: Le => Le.stopPropagation(),
                    children: Ne
                  }), c.jsx("div", {
                    className: "grid grid-cols-3 gap-2",
                    children: [ve, ke, Te].map((Le, Ke) => {
                      if (!Le) return c.jsx("div", {
                        className: "aspect-video bg-zinc-200 dark:bg-zinc-700 rounded"
                      }, Ke);
                      const Xe = Z(Le.time);
                      return c.jsxs("div", {
                        className: "relative aspect-video bg-black rounded overflow-hidden",
                        children: [Xe ? c.jsx("img", {
                          src: Xe,
                          className: "w-full h-full object-cover",
                          alt: x("关键帧 {0}", Ke + 1),
                          loading: "lazy"
                        }) : c.jsx("div", {
                          className: "w-full h-full flex items-center justify-center text-[8px] text-zinc-500",
                          children: Le.type === "prev" ? x("上一帧") : Le.type === "current" ? x("当前帧") : x("下一帧")
                        }), c.jsxs("div", {
                          className: "absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] px-1 py-0.5 text-center",
                          children: [Le.time.toFixed(1), "s"]
                        })]
                      }, Ke);
                    })
                  }), c.jsx("div", {
                    className: "space-y-2",
                    children: (ze = ge.keyframes) == null ? void 0 : ze.map((Le, Ke) => c.jsxs("div", {
                      className: "space-y-1.5",
                      children: [c.jsxs("div", {
                        className: "text-[9px] text-zinc-500",
                        children: [Le.type === "prev" ? x("上一帧") : Le.type === "current" ? x("当前帧") : Le.type === "next" ? x("下一帧") : x("帧 {0}", Ke + 1), " (", Le.time.toFixed(1), "s)"]
                      }), Le.mj_prompt && c.jsx("div", {
                        className: `p-2 rounded border ${r ? "bg-transparent border-white/30" : "bg-zinc-50 border-zinc-200"}`,
                        children: c.jsxs("div", {
                          className: "flex items-start justify-between gap-2",
                          children: [c.jsxs("div", {
                            className: "flex-1",
                            children: [c.jsxs("div", {
                              className: `text-[9px] mb-1 flex items-center gap-1 ${r ? "text-white" : "text-green-500"}`,
                              children: [c.jsx(ELe, {
                                size: 10
                              }), " MJ Prompt"]
                            }), c.jsx("div", {
                              className: `text-[10px] break-words select-text cursor-text ${r ? "text-zinc-300" : "text-zinc-700"}`,
                              onMouseDown: Xe => Xe.stopPropagation(),
                              children: Le.mj_prompt
                            })]
                          }), c.jsxs("div", {
                            className: "flex items-center gap-1 shrink-0",
                            children: [c.jsx("button", {
                              onClick: async () => {
                                await navigator.clipboard.writeText(Le.mj_prompt || "");
                              },
                              className: `p-1 rounded transition-colors ${r ? "text-zinc-400 hover:text-zinc-300 hover:bg-transparent" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200"}`,
                              onMouseDown: Xe => Xe.stopPropagation(),
                              title: "",
                              children: c.jsx(CLe, {
                                size: 12
                              })
                            }), c.jsx("button", {
                              onClick: () => re(Le.mj_prompt || ""),
                              className: `p-1 rounded transition-colors ${r ? "text-blue-400 hover:text-blue-300 hover:bg-transparent" : "text-blue-600 hover:bg-blue-100"}`,
                              onMouseDown: Xe => Xe.stopPropagation(),
                              title: "",
                              children: c.jsx(lo, {
                                size: 12
                              })
                            })]
                          })]
                        })
                      }), Le.jimeng_prompt && c.jsx("div", {
                        className: `p-2 rounded border ${r ? "bg-transparent border-white/30" : "bg-zinc-50 border-zinc-200"}`,
                        children: c.jsxs("div", {
                          className: "flex items-start justify-between gap-2",
                          children: [c.jsxs("div", {
                            className: "flex-1",
                            children: [c.jsxs("div", {
                              className: `text-[9px] mb-1 flex items-center gap-1 ${r ? "text-white" : "text-yellow-500"}`,
                              children: [c.jsx(ELe, {
                                size: 10
                              }), x(" 即梦 Prompt")]
                            }), c.jsx("div", {
                              className: `text-[10px] break-words select-text cursor-text ${r ? "text-zinc-300" : "text-zinc-700"}`,
                              onMouseDown: Xe => Xe.stopPropagation(),
                              children: Le.jimeng_prompt
                            })]
                          }), c.jsx("button", {
                            onClick: async () => {
                              await navigator.clipboard.writeText(Le.jimeng_prompt || "");
                            },
                            className: `p-1 rounded transition-colors ${r ? "text-zinc-400 hover:text-zinc-300 hover:bg-transparent" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200"}`,
                            onMouseDown: Xe => Xe.stopPropagation(),
                            title: "",
                            children: c.jsx(CLe, {
                              size: 12
                            })
                          })]
                        })
                      })]
                    }, Ke))
                  })]
                })]
              }, _e);
            })
          })]
        })]
      })
    });
  },
  _yo = {
    slow: "缓慢",
    medium: "中等",
    fast: "快速"
  },
  vvr = 64,
  wvr = 1200,
  Uct = e => Math.max(vvr, Math.min(wvr, e));

function kyo({
  result: e,
  tab: t,
  tabs: n,
  isDark: r,
  columnWidths: a,
  onColumnWidthsChange: i,
  onTabChange: o,
  onCopy: s,
  onWriteToText: l,
  onSendToChat: d,
  onClose: u
}) {
  var B, F, N, G;
  on();
  const h = g.useRef(null),
    p = g.useRef(null),
    m = g.useRef(null),
    f = g.useRef(!1),
    y = g.useId(),
    [b, v] = g.useState(!1),
    [_, w] = g.useState(null);
  g.useEffect(() => {
    const z = h.current,
      V = document.activeElement;
    return z.showModal(), () => {
      z.close(), V != null && V.isConnected && V.focus({
        preventScroll: !0
      });
    };
  }, []);
  let k, A;
  t === "storyboard" ? (k = [["镜头", 76], ["时间段", 208], ["时长", 76], ["场景", 160], ["内容", 320], ["景别", 100], ["机位", 140], ["光线", 180], ["美术风格", 180], ["转场", 140], ["中文提示词", 340], ["英文提示词", 340]], A = e.storyboard.map(z => ({
    id: String(z.shotNo),
    copy: Qda(z),
    cells: [`S${a_e(z.shotNo)}`, `${z.shotTime.tcStart} – ${z.shotTime.tcEnd}`, Qce(z.shotTime.endSec - z.shotTime.startSec), z.scene, z.content, z.shotSize, z.camera, z.lighting, z.artStyle, z.transition, z.promptZh, z.promptEn]
  }))) : t === "cameraMoves" ? (k = [["镜头", 76], ["时间段", 208], ["时长", 76], ["运镜", 180], ["速度", 84], ["主体动作", 280], ["镜头意图", 260], ["视差与景深", 220]], A = e.cameraMoves.map(z => ({
    id: String(z.shotNo),
    cells: [`M${a_e(z.shotNo)}`, `${z.shotTime.tcStart} – ${z.shotTime.tcEnd}`, Qce(z.shotTime.endSec - z.shotTime.startSec), z.cameraMove, x(_yo[z.moveSpeed] || z.moveSpeed), z.subjectAction, z.intention, z.parallaxDepth || ""]
  }))) : (k = [["类型", 116], ["时间", 208], ["描述", 700]], A = [...(((B = e.musicRef) == null ? void 0 : B.segments) || []).map((z, V) => ({
    id: `segment-${V}`,
    cells: [x("音乐段落"), `${z.time.tcStart} – ${z.time.tcEnd}`, z.desc]
  })), ...(((F = e.musicRef) == null ? void 0 : F.sfx) || []).map((z, V) => ({
    id: `sfx-${V}`,
    cells: [x("音效"), Myt(z.atSec), z.desc]
  }))]);
  const S = t === "musicRef" ? (N = e.musicRef) == null ? void 0 : N.overall : null,
    C = t === "storyboard",
    I = ((G = n.find(([z]) => z === t)) == null ? void 0 : G[1]) || "",
    E = _ || (a == null ? void 0 : a[t]),
    M = k.map(([, z], V) => Number.isFinite(E == null ? void 0 : E[V]) ? Uct(E[V]) : z),
    T = () => Array.from(p.current.querySelectorAll("th[data-column]")).map(z => z.getBoundingClientRect().width),
    P = z => {
      const V = m.current;
      V && (m.current = null, w(null), V.handle.hasPointerCapture(V.pointerId) && V.handle.releasePointerCapture(V.pointerId), z && V.widths[V.index] !== V.initialWidths[V.index] && i(V.tab, V.widths));
    },
    R = z => {
      const V = m.current;
      if (!V || V.pointerId !== z.pointerId) return;
      z.stopPropagation();
      const O = [...V.initialWidths];
      O[V.index] = Uct(V.initialWidths[V.index] + z.clientX - V.startX), V.widths = O, w(O);
    },
    j = (z, V) => {
      const O = T();
      O[z] = Uct(V), i(t, O);
    };
  return Da.createPortal(c.jsx("dialog", {
    ref: h,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": y,
    className: `shot-result-dialog ${r ? "is-dark" : ""}`,
    "data-resizing": !!_,
    onCancel: z => {
      z.preventDefault(), m.current ? P(!1) : u();
    },
    onPointerDown: z => {
      z.stopPropagation(), f.current = z.target === z.currentTarget;
    },
    onMouseDown: z => z.stopPropagation(),
    onMouseUp: z => z.stopPropagation(),
    onDoubleClick: z => z.stopPropagation(),
    onWheel: z => z.stopPropagation(),
    onKeyDown: z => {
      if (z.stopPropagation(), z.key !== "Tab") return;
      const V = Array.from(z.currentTarget.querySelectorAll('button:not(:disabled), [tabindex="0"]')).filter(D => D.tabIndex >= 0),
        O = V[0],
        L = V[V.length - 1];
      z.shiftKey && document.activeElement === O ? (z.preventDefault(), L == null || L.focus()) : !z.shiftKey && document.activeElement === L && (z.preventDefault(), O == null || O.focus());
    },
    onClick: z => {
      z.stopPropagation(), z.target === z.currentTarget && f.current && u(), f.current = !1;
    },
    children: c.jsxs("div", {
      className: "shot-result-panel",
      children: [c.jsxs("header", {
        className: "shot-result-header",
        children: [c.jsx("div", {
          className: "shot-result-heading-icon",
          children: c.jsx(jLe, {
            size: 22
          })
        }), c.jsx("div", {
          className: "shot-result-heading",
          children: c.jsx("h2", {
            id: y,
            children: x("拉片结果")
          })
        }), c.jsx("button", {
          type: "button",
          className: "shot-result-icon-button",
          "aria-label": x("关闭拉片结果"),
          onClick: u,
          autoFocus: !0,
          children: c.jsx(Na, {
            size: 20
          })
        })]
      }), c.jsxs("div", {
        className: "shot-result-toolbar",
        children: [c.jsx("div", {
          className: "shot-result-tabs",
          role: "tablist",
          "aria-label": x("分析维度"),
          onKeyDown: z => {
            var L;
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(z.key)) return;
            z.preventDefault();
            const V = n.findIndex(([D]) => D === t),
              O = z.key === "Home" ? 0 : z.key === "End" ? n.length - 1 : (V + (z.key === "ArrowRight" ? 1 : -1) + n.length) % n.length;
            o(n[O][0]), (L = z.currentTarget.querySelectorAll('[role="tab"]')[O]) == null || L.focus();
          },
          children: n.map(([z, V]) => c.jsx("button", {
            type: "button",
            role: "tab",
            id: `${y}-${z}`,
            "aria-selected": t === z,
            "aria-controls": `${y}-panel`,
            tabIndex: t === z ? 0 : -1,
            onClick: () => o(z),
            children: x(V)
          }, z))
        }), c.jsxs("div", {
          className: "shot-result-actions",
          children: [c.jsxs("button", {
            type: "button",
            onClick: l,
            children: [c.jsx(Hd, {
              size: 14
            }), x("写入文本")]
          }), c.jsxs("button", {
            type: "button",
            onClick: d,
            children: [c.jsx(qv, {
              size: 14
            }), x("发送到对话")]
          }), c.jsxs("button", {
            type: "button",
            onClick: () => s(iYe(e)),
            children: [c.jsx(CLe, {
              size: 14
            }), x("复制全部")]
          })]
        })]
      }), c.jsxs("div", {
        className: "shot-result-view",
        role: "tabpanel",
        id: `${y}-panel`,
        "aria-labelledby": `${y}-${t}`,
        children: [S && c.jsx("dl", {
          className: "shot-result-music-overview",
          children: [[x("情绪"), S.mood], [x("曲风"), S.genre], [x("节奏 / BPM"), S.bpmHint], [x("配器"), S.instruments.join("、")]].map(([z, V]) => c.jsxs("div", {
            children: [c.jsx("dt", {
              children: z
            }), c.jsx("dd", {
              children: V || "—"
            })]
          }, z))
        }), c.jsxs("div", {
          className: "shot-result-table-scroll custom-scrollbar",
          tabIndex: 0,
          role: "region",
          "aria-label": x("{0}结果表格", I),
          children: [c.jsxs("table", {
            ref: p,
            className: "shot-result-table",
            "data-wrap": b,
            "data-sized": !!E,
            style: {
              width: M.reduce((z, V) => z + V, C ? 48 : 0)
            },
            children: [c.jsxs("colgroup", {
              children: [k.map(([z], V) => c.jsx("col", {
                style: {
                  width: M[V]
                }
              }, z)), C && c.jsx("col", {
                style: {
                  width: 48
                }
              })]
            }), c.jsx("thead", {
              children: c.jsxs("tr", {
                children: [k.map(([z, V], O) => {
                  var L;
                  return c.jsxs("th", {
                    scope: "col",
                    "data-column": O,
                    children: [c.jsx("span", {
                      className: "shot-result-column-label",
                      children: x(z)
                    }), c.jsx("span", {
                      className: "shot-result-resize-handle",
                      role: "separator",
                      "aria-orientation": "vertical",
                      tabIndex: 0,
                      "aria-label": x("调整{0}列宽", x(z)),
                      "aria-valuemin": vvr,
                      "aria-valuemax": wvr,
                      "aria-valuenow": M[O],
                      title: x("拖动调整列宽，双击恢复默认；方向键微调，Home 恢复默认"),
                      "data-active": ((L = m.current) == null ? void 0 : L.index) === O,
                      onPointerDown: D => {
                        if (D.button !== 0) return;
                        D.preventDefault(), D.stopPropagation(), f.current = !1;
                        const U = T();
                        m.current = {
                          tab: t,
                          index: O,
                          startX: D.clientX,
                          initialWidths: U,
                          widths: U,
                          handle: D.currentTarget,
                          pointerId: D.pointerId
                        }, D.currentTarget.setPointerCapture(D.pointerId), D.currentTarget.focus({
                          preventScroll: !0
                        }), w(U);
                      },
                      onPointerMove: R,
                      onPointerUp: D => {
                        D.stopPropagation(), R(D), P(!0);
                      },
                      onPointerCancel: () => P(!1),
                      onLostPointerCapture: () => P(!1),
                      onDoubleClick: D => {
                        D.stopPropagation(), j(O, V);
                      },
                      onKeyDown: D => {
                        ["ArrowLeft", "ArrowRight", "Home"].includes(D.key) && (D.preventDefault(), D.stopPropagation(), j(O, D.key === "Home" ? V : T()[O] + (D.key === "ArrowRight" ? 1 : -1) * (D.shiftKey ? 50 : 10)));
                      }
                    })]
                  }, z);
                }), C && c.jsx("th", {
                  scope: "col",
                  className: "shot-result-copy-cell",
                  children: x("复制")
                })]
              })
            }), c.jsx("tbody", {
              children: A.map(z => c.jsxs("tr", {
                children: [z.cells.map((V, O) => c.jsx("td", {
                  children: c.jsx("div", {
                    className: "shot-result-cell",
                    title: V || void 0,
                    children: V || "—"
                  })
                }, k[O][0])), C && c.jsx("td", {
                  className: "shot-result-copy-cell",
                  children: c.jsx("button", {
                    type: "button",
                    className: "shot-result-icon-button",
                    "aria-label": x("复制镜头 {0}", z.id),
                    onClick: () => s(z.copy),
                    children: c.jsx(CLe, {
                      size: 14
                    })
                  })
                })]
              }, z.id))
            })]
          }, t), !A.length && c.jsxs("div", {
            className: "shot-result-empty",
            children: [c.jsx(jLe, {
              size: 28
            }), c.jsx("p", {
              children: x(S ? "暂无音乐分段或音效记录" : "本次暂无该维度的分析结果")
            })]
          })]
        })]
      }), c.jsxs("footer", {
        className: "shot-result-footer",
        children: [c.jsxs("span", {
          children: [x("共 {0} 条记录", A.length), c.jsxs("span", {
            className: "shot-result-scroll-hint",
            children: [" · ", x("拖动调整列宽，双击恢复默认；横向滚动查看所有字段")]
          })]
        }), c.jsxs("button", {
          type: "button",
          "aria-pressed": b,
          onClick: () => v(z => !z),
          children: [c.jsx(ONr, {
            size: 14
          }), x(b ? "收起长文本" : "展开长文本")]
        })]
      })]
    })
  }), document.body);
}

const Ayo = {
  storyboard: Od,
  cameraMoves: wb,
  musicRef: Q2
};

async function Syo(e) {
  try {
    return await navigator.clipboard.writeText(e), !0;
  } catch {
    try {
      const t = document.createElement("textarea");
      t.value = e, document.body.appendChild(t), t.select();
      const n = document.execCommand("copy");
      return t.remove(), n;
    } catch {
      return !1;
    }
  }
}

const Iyo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    setNodes: i,
    setConnections: o,
    apiConfigs: s,
    generateId: l,
    handleShotBreakdown: d,
    notifyCanvas: u,
    activeDropdown: h = null,
    setActiveDropdown: p = hP
  }) => {
    var ge, _e, ke, ve, Te, Ne, me, Ae, Fe, Me, Re, $e, rt;
    on();
    const [m, f] = g.useState(!1),
      [y, b] = g.useState(!1),
      [v, _] = g.useState(() => {
        var nt;
        return !!((nt = e.settings) != null && nt.agentUseAliyunOss);
      });
    g.useEffect(() => {
      var nt;
      _(!!((nt = e.settings) != null && nt.agentUseAliyunOss));
    }, [e.id, (ge = e.settings) == null ? void 0 : ge.agentUseAliyunOss]), g.useEffect(() => {
      !e.isGenerating && m && f(!1);
    }, [e.isGenerating, m]);
    const [w, k] = g.useState(() => ua()),
      [A, S] = g.useState(() => Ph());
    g.useEffect(() => {
      const nt = () => {
        k(ua()), S(Ph());
      };
      return nt(), window.addEventListener(go, nt), () => window.removeEventListener(go, nt);
    }, []);
    const C = g.useMemo(() => new Map(t.map(nt => [nt.id, nt])), [t]),
      I = g.useMemo(() => Ryi(e.id, n, C), [n, e.id, C]),
      E = gcr(I) || void 0,
      {
        content: M,
        isLoading: T
      } = Kp(E, {
        nodeType: "video-input",
        preferConstantDisplay: !0,
        allowSessionBlob: !0,
        allowDirectOssUrl: !0
      }),
      P = _c(M || E || "") || M || E || "",
      R = I ? I.videoPosterUrl : void 0,
      j = g.useMemo(() => s.filter(nt => nt.type === "Chat"), [s]),
      B = ((_e = e.settings) == null ? void 0 : _e.chatModel) || ((ke = e.settings) == null ? void 0 : ke.model) || "gemini-3-pro",
      F = If(B).id,
      N = g.useMemo(() => j.find(nt => nt.id === F) || j[0], [j, F]),
      G = (N == null ? void 0 : N.modelName) || F,
      z = Wk(F, G),
      V = TT(F, G),
      O = Qa.getGlobalBaseUrl(),
      L = g.useMemo(() => !!N && od(N, O), [N, O]),
      D = g.useMemo(() => {
        var Le;
        const nt = String(((Le = e.settings) == null ? void 0 : Le.platformGroup) ?? "").trim();
        if (nt) return nt;
        const ze = zs(F);
        return (ze == null ? void 0 : ze.platformGroup) || ko;
      }, [(ve = e.settings) == null ? void 0 : ve.platformGroup, F]),
      [U, H] = g.useState(() => {
        var nt;
        return ow((nt = e.settings) == null ? void 0 : nt.shotBreakdownGeminiApiFormat);
      });
    g.useEffect(() => {
      var nt;
      H(ow((nt = e.settings) == null ? void 0 : nt.shotBreakdownGeminiApiFormat));
    }, [(Te = e.settings) == null ? void 0 : Te.shotBreakdownGeminiApiFormat]);
    const [Y, K] = g.useState(() => {
      var nt;
      return Qv(F, If(B).effort ?? ((nt = e.settings) == null ? void 0 : nt.shotBreakdownReasoningEffort));
    });
    g.useEffect(() => {
      var nt;
      K(Qv(F, (nt = e.settings) == null ? void 0 : nt.shotBreakdownReasoningEffort));
    }, [(Ne = e.settings) == null ? void 0 : Ne.shotBreakdownReasoningEffort, F]);
    const W = qGn(e.settings),
      Q = e7t(e.settings),
      q = String(((me = e.settings) == null ? void 0 : me.shotBreakdownTab) || "storyboard"),
      ne = ((Ae = e.settings) == null ? void 0 : Ae.customAnalysisPrompt) || "",
      de = e.isGenerating || m,
      le = Tyt(W),
      J = !!(I && le && !de),
      pe = String(((Fe = e.settings) == null ? void 0 : Fe.shotBreakdownStatus) || (Q ? "done" : "idle")),
      ce = Array.isArray((Me = e.settings) == null ? void 0 : Me.shotBreakdownOutputGroupIds) ? ((Re = e.settings) == null ? void 0 : Re.shotBreakdownOutputGroupIds).length : 0,
      we = g.useCallback(nt => {
        const ze = zs(nt);
        a(e.id, {
          settings: {
            ...e.settings,
            chatModel: nt,
            model: nt,
            platformGroup: (ze == null ? void 0 : ze.platformGroup) || ko
          }
        });
      }, [e.id, e.settings, a]),
      X = g.useCallback(nt => {
        a(e.id, {
          settings: {
            ...e.settings,
            ...nt
          }
        });
      }, [e.id, e.settings, a]);
    g.useEffect(() => {
      const nt = If(B);
      nt.id !== B && (X({
        chatModel: nt.id,
        model: nt.id,
        ...(nt.effort ? {
          shotBreakdownReasoningEffort: nt.effort
        } : {})
      }), nt.effort && K(nt.effort));
    }, [B, X]);
    const Z = g.useCallback(nt => {
        const ze = {
          ...W,
          [nt]: !W[nt]
        };
        Tyt(ze) && X({
          shotBreakdownDims: ze
        });
      }, [W, X]),
      re = g.useCallback((nt, ze = "success") => {
        u == null || u(nt, ze);
      }, [u]),
      fe = g.useCallback(() => {
        J && (f(!0), d(e.id));
      }, [J, d, e.id]),
      ye = de ? pe === "grouping" ? "正在打组…" : "拉片中…" : pe === "failed" ? "重试拉片" : "开始拉片",
      ie = g.useCallback(() => {
        var De, Ye;
        if (!Q) return;
        const nt = iYe(Q),
          ze = Array.isArray((De = e.settings) == null ? void 0 : De.shotBreakdownWrittenTo) ? (Ye = e.settings) == null ? void 0 : Ye.shotBreakdownWrittenTo : [],
          Le = ze.find(Ce => {
            var He;
            return ((He = C.get(Ce)) == null ? void 0 : He.type) === "text-node";
          });
        if (Le) {
          const Ce = C.get(Le);
          if (Ce) {
            a(Le, {
              prompt: nt,
              settings: {
                ...Ce.settings,
                text: nt
              }
            }), re("已更新文本节点");
            return;
          }
        }
        const Ke = l(),
          Xe = Ki(Ke, "text-node", e.x + e.width + 80, e.y, void 0, {
            text: nt
          }, t);
        Xe.prompt = nt, i(Ce => [...Ce, Xe]), o(Ce => [...Ce, {
          id: l(),
          from: e.id,
          to: Ke
        }]), X({
          shotBreakdownWrittenTo: [...ze, Ke]
        }), re("已写入文本节点");
      }, [Q, e, t, C, l, i, o, a, X, re]),
      ae = g.useCallback(() => {
        Q && (OY(), Wur([e.id], t), re("已发送到对话"));
      }, [Q, e.id, t, re]),
      be = [W.storyboard || ((Q == null ? void 0 : Q.storyboard.length) ?? 0) > 0 ? ["storyboard", `分镜${Q != null && Q.storyboard.length ? ` (${Q.storyboard.length})` : ""}`] : null, W.cameraMoves || ((Q == null ? void 0 : Q.cameraMoves.length) ?? 0) > 0 ? ["cameraMoves", `动态${Q != null && Q.cameraMoves.length ? ` (${Q.cameraMoves.length})` : ""}`] : null, W.musicRef || Q != null && Q.musicRef ? ["musicRef", "音乐"] : null].filter(Boolean),
      Ee = be.some(([nt]) => nt === q) ? q : (($e = be[0]) == null ? void 0 : $e[0]) || "storyboard",
      xe = `relative w-full h-full flex flex-col overflow-hidden pointer-events-auto ${r ? "bg-[#1a1a1a]" : "bg-white"}`,
      he = r ? "border-zinc-600 bg-zinc-800/90 text-zinc-200" : "border-zinc-400 text-zinc-800 bg-zinc-100",
      ue = r ? "border-zinc-700/80 text-zinc-500" : "border-zinc-300 text-zinc-500";
    return c.jsxs("div", {
      className: xe,
      children: [c.jsxs("div", {
        className: "flex-1 flex flex-col gap-2 px-3 pt-2 pb-3 min-h-0 overflow-y-auto custom-scrollbar",
        children: [c.jsxs("div", {
          className: `relative w-full aspect-[9/16] max-h-[58%] min-h-[160px] rounded-xl overflow-hidden border ${r ? "bg-[#111] border-white/10" : "bg-zinc-100 border-zinc-200"}`,
          children: [I ? T ? c.jsx("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: c.jsx(Ua, {
              size: 22,
              className: "animate-spin text-zinc-500"
            })
          }) : P ? c.jsx("video", {
            src: P,
            poster: R,
            muted: !0,
            playsInline: !0,
            preload: "metadata",
            className: "absolute inset-0 w-full h-full object-cover"
          }) : c.jsx("div", {
            className: "absolute inset-0 flex items-center justify-center text-zinc-500",
            children: c.jsx(wb, {
              size: 22
            })
          }) : c.jsxs("div", {
            className: "absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-[11px] text-zinc-500",
            children: [c.jsx(w5e, {
              size: 22,
              className: "text-zinc-500"
            }), c.jsx("span", {
              children: x("连接视频后开始拉片")
            })]
          }), de ? c.jsxs("div", {
            className: "absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-1.5",
            children: [c.jsx(Ua, {
              size: 22,
              className: "animate-spin text-white"
            }), c.jsx("span", {
              className: "text-[11px] text-white/90",
              children: x(pe === "grouping" ? "正在打组…" : "拉片中…")
            })]
          }) : null]
        }), c.jsxs("div", {
          children: [c.jsx("div", {
            className: "text-[10px] text-zinc-500 mb-1.5",
            children: x("拆解维度")
          }), c.jsx("div", {
            className: "flex gap-1.5",
            children: zda.map(({
              key: nt,
              label: ze
            }) => {
              const Le = W[nt],
                Ke = Ayo[nt];
              return c.jsxs("button", {
                type: "button",
                onClick: () => Z(nt),
                onMouseDown: Xe => Xe.stopPropagation(),
                className: `flex-1 px-1.5 py-1.5 text-[11px] rounded-full border flex items-center justify-center gap-1 ${Le ? he : ue}`,
                children: [c.jsx(Ke, {
                  size: 11
                }), ze]
              }, nt);
            })
          }), window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(F) && c.jsx("div", {
            className: "text-[10px] text-amber-500 px-2 py-1",
            "data-native-analysis-scope": "shot-breakdown",
            children: aiyouplusAnalysisScopeLabel(e.settings?.nativeAnalysisScope) + (W.musicRef ? "请取消音乐维度后开始。" : "")
          })]
        }), c.jsxs("div", {
          className: `sketch-chat-input nodrag nowheel ${r ? "sketch-chat-input-dark" : ""}`,
          onMouseDown: nt => nt.stopPropagation(),
          children: [c.jsx("textarea", {
            value: ne,
            placeholder: x("自定义 Prompt（可选）"),
            onChange: nt => X({
              customAnalysisPrompt: nt.target.value
            }),
            onMouseDown: nt => nt.stopPropagation(),
            onKeyDown: nt => {
              nt.key === "Enter" && !nt.shiftKey && !nt.nativeEvent.isComposing && (nt.preventDefault(), fe());
            },
            className: "chat-scroll-minimal",
            style: {
              height: 52
            }
          }), c.jsxs("div", {
            className: `sketch-chat-toolbar ${r ? "sketch-chat-toolbar-dark" : ""}`,
            children: [c.jsxs("div", {
              className: "sketch-chat-toolbar-left rh-scroll-minimal",
              children: [z ? c.jsx(_$, {
                nodeId: e.id,
                dropdownType: "shot-breakdown-gemini-api-format",
                value: U,
                isDark: r,
                activeDropdown: h,
                setActiveDropdown: p,
                onSelect: nt => {
                  H(nt), X({
                    shotBreakdownGeminiApiFormat: nt
                  });
                },
                buttonVariant: "bare",
                buttonClassName: "shrink-0 text-xs",
                menuClassName: "sketch-chat-popover w-44"
              }) : null, L ? c.jsx(Ku, {
                nodeId: e.id,
                platformGroup: D,
                modelName: G,
                modelId: F,
                modelConfigId: N == null ? void 0 : N.id,
                isDark: r,
                nodeSettings: e.settings,
                updateNode: a,
                onGroupChange: nt => X({
                  platformGroup: nt
                }),
                compact: !0,
                buttonVariant: "bare",
                className: "shrink-0"
              }) : null, !w && A ? c.jsx("button", {
                type: "button",
                title: x("勾选后：关联视频先上传至阿里云 OSS"),
                className: `sketch-chat-toolbar-icon-btn ${v ? "is-active" : ""}`,
                style: {
                  width: "auto",
                  padding: "0 6px",
                  fontSize: 11
                },
                onClick: () => {
                  const nt = !v;
                  _(nt), X({
                    agentUseAliyunOss: nt
                  });
                },
                onMouseDown: nt => nt.stopPropagation(),
                children: "OSS"
              }) : null]
            }), c.jsxs("div", {
              className: "sketch-chat-toolbar-right",
              children: [c.jsx(Th, {
                scopeId: e.id,
                dropdownType: "shot-breakdown-chat-model",
                value: F,
                models: j,
                isDark: r,
                activeDropdown: h,
                setActiveDropdown: p,
                onSelect: we,
                buttonVariant: "transparent",
                menuClassName: "sketch-chat-popover",
                className: "sketch-chat-model-picker !flex-none shrink-0 min-w-0 max-w-[7.5rem]"
              }), V ? c.jsx(dT, {
                nodeId: e.id,
                dropdownType: "shot-breakdown-reasoning-effort",
                value: Y,
                isDark: r,
                activeDropdown: h,
                setActiveDropdown: p,
                onSelect: nt => {
                  K(nt), X({
                    shotBreakdownReasoningEffort: nt
                  });
                },
                buttonVariant: "bare",
                buttonClassName: "shrink-0 text-xs",
                menuClassName: "sketch-chat-popover",
                modelId: F,
                modelName: G
              }) : null, c.jsx("button", {
                type: "button",
                disabled: !J,
                title: x(ye),
                onClick: fe,
                onMouseDown: nt => nt.stopPropagation(),
                className: `sketch-chat-send ${r ? "sketch-chat-send-dark" : ""} ${J && !de ? "sketch-chat-send--active" : ""}`,
                children: de ? c.jsx(Ua, {
                  size: 14,
                  className: "animate-spin"
                }) : c.jsx(Gc, {
                  size: 16,
                  strokeWidth: 2
                })
              })]
            })]
          })]
        }), e.errorMsg ? c.jsx("div", {
          className: "text-[10px] text-red-400 px-2 py-1 rounded bg-red-500/10",
          children: e.errorMsg
        }) : null, Q ? c.jsxs("button", {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": y,
          onClick: () => b(!0),
          onMouseDown: nt => nt.stopPropagation(),
          className: `flex w-full shrink-0 items-center gap-3 rounded-xl border p-3 text-left transition-colors ${r ? "border-white/10 bg-white/[0.025] text-zinc-200 hover:bg-white/[0.06]" : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100"}`,
          children: [c.jsx(jLe, {
            size: 18,
            className: "shrink-0 text-zinc-400"
          }), c.jsxs("span", {
            className: "min-w-0 flex-1",
            children: [c.jsx("span", {
              className: "block text-[12px] font-medium",
              children: x("查看多维表格")
            }), c.jsx("span", {
              className: `mt-1 block truncate text-[10px] ${r ? "text-zinc-400" : "text-zinc-500"}`,
              children: ce > 0 ? x("已自动打成 {0} 组 · {1}", ce, dXt(Q)) : dXt(Q)
            })]
          }), c.jsx(eI, {
            size: 16,
            className: "shrink-0 text-zinc-400"
          })]
        }) : null]
      }), y && Q && c.jsx(kyo, {
        result: Q,
        tab: Ee,
        tabs: be,
        isDark: r,
        columnWidths: (rt = e.settings) == null ? void 0 : rt.shotBreakdownTableColumnWidths,
        onColumnWidthsChange: (nt, ze) => {
          var Le;
          return X({
            shotBreakdownTableColumnWidths: {
              ...((Le = e.settings) == null ? void 0 : Le.shotBreakdownTableColumnWidths),
              [nt]: ze
            }
          });
        },
        onTabChange: nt => X({
          shotBreakdownTab: nt
        }),
        onCopy: async nt => {
          const ze = await Syo(nt);
          re(ze ? "已复制" : "复制失败", ze ? "success" : "error");
        },
        onWriteToText: () => {
          ie(), b(!1);
        },
        onSendToChat: () => {
          ae(), b(!1);
        },
        onClose: () => b(!1)
      })]
    });
  },
  Cyo = ["镜号", "时长", "画面描述", "景别", "光影/氛围", "对白·旁白", "音效", "运镜", "最终提示词", "操作"],
  Eyo = [["characters", "角色", "character"], ["scenes", "场景", "scene"], ["props", "道具", "prop"]];

function u0n({
  text: e,
  result: t
}) {
  on();
  const n = mui(e, t);
  return c.jsx(c.Fragment, {
    children: n.map((r, a) => r.kind === "text" ? c.jsx("span", {
      children: r.text
    }, a) : c.jsx("span", {
      className: "text-[#5ec8e8]",
      children: r.text
    }, a))
  });
}

function Tyo({
  value: e,
  result: t,
  placeholder: n,
  onChange: r,
  onMention: a
}) {
  on();
  const [i, o] = g.useState(!1),
    s = g.useMemo(() => uj(t), [t]),
    l = IBt(e, t);
  return i ? c.jsx("textarea", {
    autoFocus: !0,
    value: e,
    rows: 8,
    onChange: d => r(d.target.value),
    onBlur: () => o(!1),
    onMouseDown: d => d.stopPropagation(),
    className: "w-full min-h-[140px] px-2 py-1.5 rounded-md border border-white/10 bg-transparent outline-none text-[12px] leading-5 resize-none custom-scrollbar"
  }) : c.jsx("div", {
    className: "w-full min-h-[140px] px-2 py-1.5 rounded-md border border-white/10 text-left text-[12px] leading-6 whitespace-pre-wrap cursor-text",
    onClick: () => o(!0),
    onMouseDown: d => d.stopPropagation(),
    children: e ? l.map((d, u) => {
      if (d.kind !== "mention") return c.jsx("span", {
        children: d.text
      }, u);
      const h = s.find(p => p.name === d.name);
      return c.jsx("span", {
        className: "text-[#5ec8e8] bg-[#5ec8e8]/10 rounded px-0.5 cursor-pointer",
        onClick: p => {
          p.stopPropagation(), h && (a == null || a(h));
        },
        children: d.text
      }, u);
    }) : c.jsx("span", {
      className: "text-zinc-500",
      children: n || x("点击编辑")
    })
  });
}

function fV({
  value: e,
  onChange: t,
  multiline: n,
  placeholder: r,
  className: a
}) {
  on();
  const i = `w-full bg-transparent outline-none text-[12px] leading-5 ${a || ""}`;
  return n ? c.jsx("textarea", {
    value: e,
    placeholder: r,
    rows: 3,
    onChange: o => t(o.target.value),
    onMouseDown: o => o.stopPropagation(),
    className: `${i} resize-none min-h-[56px] custom-scrollbar`
  }) : c.jsx("input", {
    value: e,
    placeholder: r,
    onChange: o => t(o.target.value),
    onMouseDown: o => o.stopPropagation(),
    className: i
  });
}

function Myo({
  result: e,
  onResult: t
}) {
  return on(), c.jsxs("div", {
    className: "flex items-start gap-2 px-5 pt-4 pb-1",
    children: [c.jsx("span", {
      className: "shrink-0 mt-[1px] h-5 px-2 rounded bg-[#3b82f6] text-white text-[11px] leading-5",
      children: x("全局风格")
    }), c.jsx("textarea", {
      value: e.globalStyle,
      rows: 2,
      placeholder: x(SBt),
      onChange: n => t(Usr(e, n.target.value)),
      onMouseDown: n => n.stopPropagation(),
      className: "flex-1 min-h-[40px] bg-transparent outline-none resize-none text-[13px] leading-5 custom-scrollbar"
    })]
  });
}

function Pyo(e) {
  return e.prompt.status === "done" && e.prompt.imagePrompt ? "查看提示词" : e.prompt.status === "stale" ? "需重新合成" : "待生成提示词";
}

const Ryo = ({
  open: e,
  isDark: t,
  isGenerating: n,
  result: r,
  stage: a,
  assetGridCount: i,
  onClose: o,
  onStage: s,
  onResult: l,
  onCompose: d,
  onCreateAssets: u,
  onJumpToNode: h,
  canvasImages: p = [],
  generatingAssetKeys: m = [],
  composeModelBar: f,
  constraints: y,
  onToast: b,
  onBackdropClose: v
}) => {
  on();
  const [_, w] = g.useState(null),
    [k, A] = g.useState(null),
    [S, C] = g.useState(null),
    [I, E] = g.useState(null),
    [M, T] = g.useState(null),
    [P, R] = g.useState(null),
    j = Fsr(r),
    B = v1e(r),
    F = dui(r),
    N = Math.min(i, F),
    G = Osr(r),
    z = G.characters + G.scenes + G.props,
    V = S != null ? r.rows.find(Z => Z.shotNo === S) : null,
    O = I ? uj(r).find(Z => Z.key === I) : null,
    L = n ? "prompts" : a,
    D = L === "assets";
  g.useEffect(() => {
    if (!e) return;
    const Z = re => {
      re.key === "Escape" && (S != null ? C(null) : P ? R(null) : M ? T(null) : I ? E(null) : o());
    };
    return window.addEventListener("keydown", Z), () => window.removeEventListener("keydown", Z);
  }, [e, o, S, I, M, P]), g.useEffect(() => {
    if (!M) return;
    const Z = re => {
      const fe = re.target;
      fe != null && fe.closest("[data-script-parse-asset-menu]") || fe != null && fe.closest("[data-script-parse-asset-menu-btn]") || T(null);
    };
    return window.addEventListener("mousedown", Z, !0), () => window.removeEventListener("mousedown", Z, !0);
  }, [M]);
  const U = g.useCallback((Z, re) => {
      const fe = r.rows.map((ye, ie) => {
        if (ie !== Z) return ye;
        const ae = {
          ...ye,
          ...re
        };
        return re.prompt || (ae.prompt = {
          ...ye.prompt,
          status: ye.prompt.status === "done" ? "stale" : ye.prompt.status
        }), ae;
      });
      l({
        ...r,
        rows: fe,
        shotCount: fe.length
      });
    }, [l, r]),
    H = g.useCallback((Z, re) => {
      if (Z === re || Z < 0 || re < 0 || Z >= r.rows.length || re >= r.rows.length) return;
      const fe = [...r.rows],
        [ye] = fe.splice(Z, 1);
      fe.splice(re, 0, ye), l({
        ...r,
        rows: fe.map((ie, ae) => ({
          ...ie,
          shotNo: ae + 1
        })),
        shotCount: fe.length
      });
    }, [l, r]),
    Y = g.useCallback((Z, re) => {
      const fe = ye => ye.map(ie => {
        if (ie.key !== Z) return ie;
        const ae = {
          ...ie,
          ...re
        };
        return re.prompt === void 0 && (re.name || re.desc || re.outfit || re.traits || re.spec) && (ae.prompt = FCe(ae, r.globalStyle)), ae;
      });
      l({
        ...r,
        assets: {
          characters: fe(r.assets.characters),
          scenes: fe(r.assets.scenes),
          props: fe(r.assets.props)
        }
      });
    }, [l, r]),
    K = (Z, re) => {
      re.preventDefault(), re.stopPropagation(), T(fe => (fe == null ? void 0 : fe.key) === Z ? null : {
        key: Z,
        x: re.clientX,
        y: re.clientY
      });
    },
    W = M ? uj(r).find(Z => Z.key === M.key) : null,
    Q = Z => {
      const re = Z === "character" ? "characters" : Z === "scene" ? "scenes" : "props",
        fe = Sui(Z, r.assets[re].length, r.globalStyle, y);
      l({
        ...r,
        assets: {
          ...r.assets,
          [re]: [...r.assets[re], fe]
        }
      }), E(fe.key);
    },
    q = Z => {
      l({
        ...r,
        assets: {
          characters: r.assets.characters.filter(re => re.key !== Z),
          scenes: r.assets.scenes.filter(re => re.key !== Z),
          props: r.assets.props.filter(re => re.key !== Z)
        }
      }), I === Z && E(null);
    };
  if (!e || typeof document > "u") return null;
  const ne = t ? "bg-[#141416] text-zinc-200" : "bg-zinc-50 text-zinc-800",
    de = t ? "border-white/10" : "border-zinc-200",
    le = t ? "text-zinc-500" : "text-zinc-400",
    J = t ? "hover:bg-white/[0.04]" : "hover:bg-zinc-100",
    pe = t ? "bg-[#1a1a1c]" : "bg-zinc-100",
    ce = `h-8 px-3 rounded-md text-[12px] border ${de} ${le}`,
    we = "h-9 px-4 rounded-lg text-[13px] font-medium bg-white text-zinc-900 hover:bg-zinc-100",
    X = uUe.findIndex(Z => Z.key === a);
  return Da.createPortal(c.jsxs("div", {
    className: "fixed inset-0 z-[10040] flex flex-col bg-black/55 script-parse-workspace",
    onMouseDown: Z => {
      if (Z.stopPropagation(), M) {
        T(null);
        return;
      }
      Z.target === Z.currentTarget && (v || o)();
    },
    onPointerDown: Z => Z.stopPropagation(),
    children: [c.jsxs("div", {
      className: `m-5 flex-1 min-h-0 flex flex-col rounded-xl border overflow-hidden custom-scrollbar ${ne} ${de}`,
      children: [c.jsxs("div", {
        className: `flex items-center gap-6 px-5 py-3 border-b ${de}`,
        children: [uUe.map((Z, re) => {
          const fe = Z.key === L,
            ye = re < X || Z.key === "confirm" && j > 0 && a !== "confirm",
            ie = Z.key !== "confirm" && j === 0;
          return c.jsxs("button", {
            type: "button",
            disabled: ie,
            onClick: () => s(Z.key),
            className: "flex items-center gap-2 min-w-0",
            children: [c.jsx("span", {
              className: `h-6 w-6 rounded-full border flex items-center justify-center text-[11px] ${fe || ye ? t ? "bg-white text-zinc-900 border-white" : "bg-zinc-900 text-white border-zinc-900" : de}`,
              children: ye && !fe ? c.jsx(io, {
                size: 12
              }) : re + 1
            }), c.jsxs("span", {
              className: "text-left",
              children: [c.jsx("span", {
                className: `block text-[13px] ${fe ? "" : le}`,
                children: x(Z.label)
              }), c.jsx("span", {
                className: `block text-[11px] ${le}`,
                children: Z.key === "confirm" ? x("{0}个镜头已就绪", j) : Z.key === "assets" ? x("{0}/{1} 已生成，还剩 {2} 个", N, F || r.rows.length, Math.max(0, (F || r.rows.length) - N)) : x("{0}/{1} 已合成", B, r.rows.length)
              })]
            })]
          }, Z.key);
        }), c.jsxs("div", {
          className: `ml-auto text-[11px] ${le}`,
          children: [X + 1, x("/3 完成后可批量生成视频")]
        }), c.jsx("button", {
          type: "button",
          onClick: o,
          className: `h-8 w-8 rounded-md flex items-center justify-center ${le}`,
          children: c.jsx(Na, {
            size: 16
          })
        })]
      }), c.jsxs("div", {
        className: "flex-1 min-h-0 flex overflow-hidden",
        children: [c.jsxs("div", {
          className: "flex-1 min-h-0 overflow-auto custom-scrollbar",
          children: [c.jsx(Myo, {
            result: r,
            onResult: l
          }), D ? c.jsx("div", {
            className: "p-5 flex flex-col gap-6",
            onMouseDown: Z => {
              const re = Z.target;
              re.closest("[data-asset-card]") || re.closest("textarea") || re.closest("input") || re.closest("button") || (T(null), E(null));
            },
            children: Eyo.map(([Z, re, fe]) => c.jsxs("div", {
              children: [c.jsxs("div", {
                className: `text-[13px] mb-2 ${le}`,
                children: [re, " ", r.assets[Z].length ? `(${r.assets[Z].length})` : ""]
              }), c.jsxs("div", {
                className: "flex gap-3 overflow-x-auto py-2 custom-scrollbar",
                children: [c.jsxs("button", {
                  type: "button",
                  onClick: () => Q(fe),
                  className: `w-[148px] shrink-0 rounded-xl border border-dashed min-h-[196px] flex flex-col items-center justify-center ${de} ${le}`,
                  children: [c.jsx(eo, {
                    size: 18
                  }), c.jsx("span", {
                    className: "mt-1 text-[12px]",
                    children: x("新增")
                  })]
                }), r.assets[Z].map(ye => {
                  const ie = m.includes(ye.key);
                  return c.jsxs("div", {
                    "data-asset-card": !0,
                    className: `w-[148px] shrink-0 ${I === ye.key ? "rounded-xl ring-2 ring-inset ring-[#4ea8ff]" : ""}`,
                    onContextMenu: ae => K(ye.key, ae),
                    children: [c.jsxs("div", {
                      className: `relative w-full rounded-xl border overflow-hidden ${de} ${t ? "bg-white/[0.04]" : "bg-zinc-100"} ${ye.imageUrl ? "" : "min-h-[148px] flex items-center justify-center"}`,
                      onClick: () => E(ye.key),
                      children: [ye.imageUrl ? c.jsx("img", {
                        src: ye.imageUrl,
                        alt: "",
                        className: "block w-full h-auto max-h-[220px] object-contain"
                      }) : c.jsx("span", {
                        className: `py-16 text-center text-[11px] ${le}`,
                        children: x(ie ? "生成中…" : "待创建")
                      }), c.jsx("button", {
                        type: "button",
                        "data-script-parse-asset-menu-btn": !0,
                        className: `absolute top-1.5 right-1.5 h-6 w-6 rounded-md flex items-center justify-center ${t ? "bg-black/50 text-zinc-200" : "bg-white/80 text-zinc-600"}`,
                        onClick: ae => K(ye.key, ae),
                        children: c.jsx(hw, {
                          size: 14
                        })
                      })]
                    }), c.jsx("div", {
                      className: "mt-1.5 text-[12px] font-medium truncate",
                      children: ye.name
                    }), c.jsxs("div", {
                      className: `text-[11px] leading-4 line-clamp-2 ${le}`,
                      children: [x("名称："), ye.name, ye.desc ? `，${ye.desc}` : ""]
                    })]
                  }, ye.key);
                })]
              })]
            }, Z))
          }) : c.jsxs("table", {
            className: "w-full text-left border-collapse",
            children: [c.jsx("thead", {
              className: `sticky top-0 z-10 ${pe}`,
              children: c.jsx("tr", {
                className: `text-[11px] ${le}`,
                children: Cyo.map(Z => c.jsx("th", {
                  className: `font-normal px-3 py-2 border-b ${de} whitespace-nowrap`,
                  children: Z
                }, Z))
              })
            }), c.jsx("tbody", {
              children: r.rows.map((Z, re) => c.jsxs("tr", {
                className: `align-top ${J}`,
                onDragOver: fe => {
                  fe.preventDefault(), fe.dataTransfer.dropEffect = "move";
                },
                onDrop: fe => {
                  fe.preventDefault();
                  const ye = Number(fe.dataTransfer.getData("text/plain"));
                  Number.isFinite(ye) && H(ye, re);
                },
                children: [c.jsx("td", {
                  draggable: !0,
                  title: x("按住拖动调整顺序"),
                  onDragStart: fe => {
                    fe.dataTransfer.effectAllowed = "move", fe.dataTransfer.setData("text/plain", String(re));
                  },
                  className: `px-3 py-2 tabular-nums text-[12px] w-12 border-b cursor-grab active:cursor-grabbing ${de}`,
                  children: Z.shotNo
                }), c.jsxs("td", {
                  className: `px-3 py-2 w-16 border-b ${de}`,
                  children: [c.jsx(fV, {
                    value: `${Z.durationSec}`,
                    onChange: fe => U(re, {
                      durationSec: Math.max(1, Number(fe) || 8)
                    })
                  }), c.jsx("span", {
                    className: `text-[10px] ${le}`,
                    children: "s"
                  })]
                }), c.jsx("td", {
                  className: `px-3 py-2 min-w-[220px] border-b ${de}`,
                  children: _ === re ? c.jsx(fV, {
                    multiline: !0,
                    value: Z.scene,
                    onChange: fe => U(re, {
                      scene: fe
                    })
                  }) : c.jsx("button", {
                    type: "button",
                    className: "text-left w-full text-[12px] leading-5",
                    onClick: () => w(re),
                    onMouseDown: fe => fe.stopPropagation(),
                    children: Z.scene ? c.jsx(u0n, {
                      text: Z.scene,
                      result: r
                    }) : c.jsx("span", {
                      className: le,
                      children: x("画面描述")
                    })
                  })
                }), c.jsx("td", {
                  className: `px-3 py-2 w-20 border-b ${de}`,
                  children: c.jsx(fV, {
                    value: Z.shotSize,
                    onChange: fe => U(re, {
                      shotSize: fe
                    })
                  })
                }), c.jsx("td", {
                  className: `px-3 py-2 min-w-[140px] border-b ${de}`,
                  children: c.jsx(fV, {
                    multiline: !0,
                    value: Z.lighting,
                    onChange: fe => U(re, {
                      lighting: fe
                    })
                  })
                }), c.jsx("td", {
                  className: `px-3 py-2 min-w-[140px] border-b ${de}`,
                  children: k === re ? c.jsx(fV, {
                    multiline: !0,
                    value: Z.dialogue,
                    placeholder: x("点击编辑对白旁白"),
                    onChange: fe => U(re, {
                      dialogue: fe
                    })
                  }) : c.jsx("button", {
                    type: "button",
                    className: "text-left w-full text-[12px] leading-5",
                    onClick: () => A(re),
                    onMouseDown: fe => fe.stopPropagation(),
                    children: Z.dialogue ? c.jsx(u0n, {
                      text: Z.dialogue,
                      result: r
                    }) : c.jsx("span", {
                      className: le,
                      children: x("点击编辑对白旁白")
                    })
                  })
                }), c.jsx("td", {
                  className: `px-3 py-2 min-w-[120px] border-b ${de}`,
                  children: c.jsx(fV, {
                    multiline: !0,
                    value: Z.sfx,
                    onChange: fe => U(re, {
                      sfx: fe
                    })
                  })
                }), c.jsx("td", {
                  className: `px-3 py-2 min-w-[120px] border-b ${de}`,
                  children: c.jsx(fV, {
                    multiline: !0,
                    value: Z.cameraMove,
                    onChange: fe => U(re, {
                      cameraMove: fe
                    })
                  })
                }), c.jsx("td", {
                  className: `px-3 py-2 w-36 border-b ${de}`,
                  children: c.jsx("button", {
                    type: "button",
                    onClick: () => C(Z.shotNo),
                    onMouseDown: fe => fe.stopPropagation(),
                    className: `text-[12px] ${Z.prompt.status === "done" ? "" : le}`,
                    children: Pyo(Z)
                  })
                }), c.jsx("td", {
                  className: `px-3 py-2 w-12 border-b ${de}`,
                  children: c.jsx("button", {
                    type: "button",
                    onClick: () => {
                      const fe = r.rows.filter((ye, ie) => ie !== re).map((ye, ie) => ({
                        ...ye,
                        shotNo: ie + 1
                      }));
                      l({
                        ...r,
                        rows: fe,
                        shotCount: fe.length
                      });
                    },
                    className: le,
                    children: c.jsx(Qo, {
                      size: 13
                    })
                  })
                })]
              }, `${Z.shotNo}-${re}`))
            })]
          })]
        }), D && O ? c.jsxs("aside", {
          className: `w-[360px] shrink-0 border-l overflow-auto custom-scrollbar ${de}`,
          children: [c.jsxs("div", {
            className: `flex items-center justify-between px-4 py-3 border-b ${de}`,
            children: [c.jsxs("div", {
              className: "text-[14px]",
              children: [x("编辑"), AO(O.role)]
            }), c.jsx("button", {
              type: "button",
              className: le,
              onClick: () => E(null),
              children: c.jsx(Na, {
                size: 15
              })
            })]
          }), c.jsxs("div", {
            className: "p-4 flex flex-col gap-3",
            children: [c.jsx("button", {
              type: "button",
              className: `relative w-full aspect-[16/10] rounded-lg border flex flex-col items-center justify-center overflow-hidden ${de} ${t ? "bg-white/[0.04]" : "bg-zinc-100"}`,
              onClick: () => R(O.key),
              children: O.imageUrl ? c.jsx("img", {
                src: O.imageUrl,
                alt: "",
                className: "absolute inset-0 w-full h-full object-cover"
              }) : c.jsxs(c.Fragment, {
                children: [c.jsx(ml, {
                  size: 22,
                  className: le
                }), c.jsxs("span", {
                  className: `mt-1 text-[12px] ${le}`,
                  children: [x("生成或上传"), AO(O.role), x("图")]
                })]
              })
            }), c.jsx("div", {
              className: "text-[16px] font-medium leading-6",
              children: O.name || x("未命名{0}", AO(O.role))
            }), c.jsxs("label", {
              className: "block",
              children: [c.jsxs("div", {
                className: `text-[11px] mb-1 ${le}`,
                children: [AO(O.role), x("名称")]
              }), c.jsx("input", {
                value: O.name,
                onChange: Z => Y(O.key, {
                  name: Z.target.value
                }),
                onMouseDown: Z => Z.stopPropagation(),
                className: `h-9 w-full px-2 rounded-md border bg-transparent outline-none text-[13px] ${de}`
              })]
            }), c.jsxs("label", {
              className: "block",
              children: [c.jsx("div", {
                className: `text-[11px] mb-1 ${le}`,
                children: x("描述")
              }), c.jsx("textarea", {
                value: O.desc,
                rows: 3,
                onChange: Z => Y(O.key, {
                  desc: Z.target.value
                }),
                onMouseDown: Z => Z.stopPropagation(),
                className: `w-full px-2 py-1.5 rounded-md border bg-transparent outline-none text-[12px] leading-5 resize-none custom-scrollbar ${de}`
              })]
            }), O.role === "character" ? c.jsxs("label", {
              className: "block",
              children: [c.jsx("div", {
                className: `text-[11px] mb-1 ${le}`,
                children: x("服装")
              }), c.jsx("input", {
                value: O.outfit || "",
                onChange: Z => Y(O.key, {
                  outfit: Z.target.value
                }),
                onMouseDown: Z => Z.stopPropagation(),
                className: `h-9 w-full px-2 rounded-md border bg-transparent outline-none text-[13px] ${de}`
              })]
            }) : null, c.jsxs("label", {
              className: "block",
              children: [c.jsx("div", {
                className: `text-[11px] mb-1 ${le}`,
                children: x("特征")
              }), c.jsx("input", {
                value: O.traits || "",
                onChange: Z => Y(O.key, {
                  traits: Z.target.value
                }),
                onMouseDown: Z => Z.stopPropagation(),
                className: `h-9 w-full px-2 rounded-md border bg-transparent outline-none text-[13px] ${de}`
              })]
            }), c.jsxs("label", {
              className: "block",
              children: [c.jsxs("div", {
                className: `text-[11px] mb-1 ${le}`,
                children: [AO(O.role), x("描述")]
              }), c.jsx("textarea", {
                value: O.prompt || "",
                rows: 10,
                onChange: Z => Y(O.key, {
                  prompt: Z.target.value
                }),
                onMouseDown: Z => Z.stopPropagation(),
                className: `w-full px-2 py-1.5 rounded-md border bg-transparent outline-none text-[12px] leading-5 resize-none custom-scrollbar ${de} ${t ? "bg-white/[0.03]" : "bg-zinc-100"}`
              })]
            })]
          })]
        }) : null]
      }), c.jsxs("div", {
        className: `flex items-center gap-2 px-5 py-3 border-t ${de}`,
        children: [D ? c.jsxs(c.Fragment, {
          children: [z > 0 ? c.jsxs("div", {
            className: "text-[12px] text-amber-400/90",
            children: [x("检测到有 "), G.characters, x(" 个人物、"), G.scenes, x(" 个场景和 "), G.props, x(" 个道具没有设定图。可从画布选择或使用 AI 生成。")]
          }) : c.jsx("div", {
            className: `text-[12px] ${le}`,
            children: x("设定图已齐")
          }), c.jsx("button", {
            type: "button",
            onClick: () => u(),
            className: `${we} ml-auto`,
            children: x("一键生成所有资产")
          })]
        }) : c.jsxs("button", {
          type: "button",
          onClick: () => {
            const Z = [...r.rows, Iui(r.rows.length + 1)];
            l({
              ...r,
              rows: Z,
              shotCount: Z.length
            });
          },
          className: `${ce} flex items-center gap-1`,
          children: [c.jsx(eo, {
            size: 13
          }), x("添加镜头")]
        }), D ? null : c.jsxs("div", {
          className: "ml-auto flex items-center gap-2",
          children: [f, c.jsx("button", {
            type: "button",
            disabled: n,
            title: x("由 AI 模型基于剧本 / 分镜 / 资产等信息生成结构化的完整提示词，效果更自然。"),
            onClick: () => {
              s("prompts"), d("smart");
            },
            className: we,
            children: x(n ? "合成中…" : "一键合成全部提示词")
          })]
        })]
      })]
    }), M && W ? Da.createPortal(c.jsxs("div", {
      "data-script-parse-asset-menu": !0,
      className: `fixed z-[10050] min-w-[168px] rounded-lg border py-1 text-[12px] shadow-xl ${ne} ${de}`,
      style: {
        left: M.x,
        top: M.y
      },
      onMouseDown: Z => Z.stopPropagation(),
      children: [[["select", "选择图片"], ["generate", `AI 生${AO(W.role)}`], ["jump", "跳转至节点"], ["clear", "清除图片"]].map(([Z, re]) => c.jsx("button", {
        type: "button",
        className: `w-full px-3 py-1.5 text-left hover:bg-white/10 ${Z === "jump" && !W.nodeId ? "opacity-40" : ""}`,
        onClick: () => {
          T(null), Z === "select" ? R(W.key) : Z === "generate" ? u(W.key) : Z === "jump" ? W.nodeId ? h == null || h(W.nodeId) : b == null || b("资产未关联画布节点", "error") : Z === "clear" && Y(W.key, {
            imageUrl: "",
            nodeId: void 0
          });
        },
        children: re
      }, Z)), c.jsx("div", {
        className: `my-1 border-t ${de}`
      }), c.jsx("button", {
        type: "button",
        className: "w-full px-3 py-1.5 text-left text-red-400 hover:bg-white/10",
        onClick: () => {
          T(null), q(W.key);
        },
        children: x("删除")
      })]
    }), document.body) : null, P ? Da.createPortal(c.jsx("div", {
      className: "fixed inset-0 z-[10055] flex items-center justify-center bg-black/50",
      onMouseDown: Z => {
        Z.stopPropagation(), Z.target === Z.currentTarget && R(null);
      },
      children: c.jsxs("div", {
        className: `w-[min(520px,92vw)] max-h-[76vh] overflow-auto rounded-xl border p-4 custom-scrollbar ${ne} ${de}`,
        children: [c.jsxs("div", {
          className: "flex items-center mb-3",
          children: [c.jsx("div", {
            className: "text-[14px]",
            children: x("从画布选择图片")
          }), c.jsx("button", {
            type: "button",
            className: `ml-auto ${le}`,
            onClick: () => R(null),
            children: c.jsx(Na, {
              size: 15
            })
          })]
        }), p.length ? c.jsx("div", {
          className: "grid grid-cols-3 gap-2",
          children: p.map(Z => c.jsxs("button", {
            type: "button",
            className: `rounded-lg border overflow-hidden text-left ${de}`,
            onClick: () => {
              Y(P, {
                imageUrl: Z.url
              }), R(null);
            },
            children: [c.jsx("img", {
              src: Z.url,
              alt: "",
              className: "w-full aspect-[16/10] object-cover"
            }), c.jsx("div", {
              className: `px-2 py-1 text-[11px] truncate ${le}`,
              children: Z.name
            })]
          }, Z.id))
        }) : c.jsx("div", {
          className: `text-[12px] ${le}`,
          children: x("画布上还没有可选用的图片节点")
        })]
      })
    }), document.body) : null, V ? c.jsx("div", {
      className: "absolute inset-0 z-20 flex items-center justify-center bg-black/50",
      onMouseDown: Z => {
        Z.stopPropagation(), Z.target === Z.currentTarget && C(null);
      },
      children: c.jsxs("div", {
        className: `w-[min(820px,94vw)] max-h-[88vh] overflow-auto rounded-xl border p-4 custom-scrollbar ${ne} ${de}`,
        children: [c.jsxs("div", {
          className: "flex items-center mb-3",
          children: [c.jsxs("div", {
            className: "text-[14px]",
            children: [x("第 "), V.shotNo, x(" 镜：最终提示词")]
          }), c.jsx("button", {
            type: "button",
            className: `ml-auto ${le}`,
            onClick: () => C(null),
            children: c.jsx(Na, {
              size: 15
            })
          })]
        }), [["imagePrompt", "分镜提示词"], ["videoMotionPrompt", "视频运动提示词"]].map(([Z, re]) => c.jsxs("div", {
          className: "mb-4",
          children: [c.jsx("div", {
            className: "flex items-center gap-2 mb-1.5",
            children: c.jsx("div", {
              className: "text-[12px]",
              children: re
            })
          }), c.jsx(Tyo, {
            value: V.prompt[Z],
            result: r,
            placeholder: x("点击下方重新合成提示词后生成"),
            onMention: fe => {
              C(null), s("assets"), E(fe.key);
            },
            onChange: fe => {
              const ye = r.rows.map(ie => ie.shotNo === V.shotNo ? {
                ...ie,
                prompt: {
                  ...ie.prompt,
                  [Z]: fe,
                  status: fe ? "done" : ie.prompt.status
                }
              } : ie);
              l({
                ...r,
                rows: ye
              });
            }
          })]
        }, Z)), c.jsx("div", {
          className: "flex items-center gap-3 mt-2 flex-wrap",
          children: c.jsx("button", {
            type: "button",
            disabled: n,
            onClick: () => d("smart", V.shotNo),
            className: `${we} ml-auto`,
            children: n ? x("合成中…") : V.prompt.status === "done" ? x("重新合成提示词") : x("合成提示词")
          })
        })]
      })
    }) : null]
  }), document.body);
};

function h0n(e) {
  var r;
  const t = ((r = Xl(e)) == null ? void 0 : r.url) || "";
  if (t && !Sh(t)) return t;
  const n = mJe(e) || "";
  return n && !n.startsWith("canvas-node:") && !Sh(n) ? n : "";
}

const $ct = [{
    key: "scriptParseGlobalStyle",
    label: "风格",
    fallback: SBt,
    valueKey: "globalStyle"
  }, {
    key: "scriptParseCharacterSpec",
    label: "人物",
    fallback: jsr,
    valueKey: "characterSpec"
  }, {
    key: "scriptParseSceneSpec",
    label: "场景",
    fallback: Dsr,
    valueKey: "sceneSpec"
  }, {
    key: "scriptParsePropSpec",
    label: "道具",
    fallback: Lsr,
    valueKey: "propSpec"
  }, {
    key: "scriptParseSeedance25Rules",
    label: "SD2.5",
    fallback: Vsr,
    valueKey: "seedance25Rules"
  }],
  Nyo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    apiConfigs: i,
    handleScriptParse: o,
    handleScriptParseCompose: s,
    handleScriptParseCreateGrid: l,
    notifyCanvas: d,
    setSelectedNodeId: u,
    setSelectedNodeIds: h,
    activeDropdown: p = null,
    setActiveDropdown: m = hP,
    isModelHiddenInList: f,
    selected: y = !1
  }) => {
    var Ft, We, Ze, Ge, Oe, st, vt, Ht, nn, pt;
    on();
    const [b, v] = g.useState(!1),
      [_, w] = g.useState(!1),
      [k, A] = g.useState("scriptParseGlobalStyle"),
      [S, C] = g.useState(!1),
      [I, E] = g.useState(!1),
      [M, T] = g.useState(!1),
      P = g.useRef(!1),
      R = g.useRef(null),
      j = g.useRef(null);
    g.useEffect(() => {
      !e.isGenerating && b && v(!1);
    }, [e.isGenerating, b]);
    const B = g.useMemo(() => new Map(t.map(lt => [lt.id, lt])), [t]),
      F = g.useMemo(() => bcr(e.id, n, B), [n, e.id, B]),
      N = vcr(e, F),
      G = String(((Ft = e.settings) == null ? void 0 : Ft.scriptText) || ""),
      z = Bsr(e.settings),
      V = hUe(e.settings),
      O = cui(e.settings),
      L = e.isGenerating || b,
      D = String(((We = e.settings) == null ? void 0 : We.scriptParseStatus) || (V ? "done" : "idle")),
      U = Fsr(V),
      H = v1e(V),
      Y = Array.isArray((Ze = e.settings) == null ? void 0 : Ze.scriptParseAssetGridNodeIds) ? ((Ge = e.settings) == null ? void 0 : Ge.scriptParseAssetGridNodeIds).length : 0,
      K = uUe.findIndex(lt => lt.key === O);
    g.useEffect(() => {
      var lt;
      !V || (lt = e.settings) != null && lt.scriptParseCompacted || a(e.id, {
        width: 300,
        height: 300,
        settings: {
          ...e.settings,
          scriptParseCompacted: !0
        }
      });
    }, [V, e.id, e.settings, a]), g.useEffect(() => {
      const lt = L;
      P.current && !lt && V && T(!0), P.current = lt;
    }, [L, V]);
    const W = g.useMemo(() => i.filter(lt => lt.type === "Chat"), [i]),
      Q = ((Oe = e.settings) == null ? void 0 : Oe.chatModel) || ((st = e.settings) == null ? void 0 : st.model) || "gemini-3-pro",
      q = If(Q).id,
      ne = g.useMemo(() => W.find(lt => lt.id === q) || W[0], [W, q]),
      de = (ne == null ? void 0 : ne.modelName) || q,
      le = Wk(q, de),
      J = TT(q, de),
      pe = Qa.getGlobalBaseUrl(),
      ce = g.useMemo(() => !!ne && od(ne, pe), [ne, pe]),
      we = g.useMemo(() => {
        var Ut;
        const lt = String(((Ut = e.settings) == null ? void 0 : Ut.platformGroup) ?? "").trim();
        if (lt) return lt;
        const gt = zs(q);
        return (gt == null ? void 0 : gt.platformGroup) || ko;
      }, [(vt = e.settings) == null ? void 0 : vt.platformGroup, q]),
      [X, Z] = g.useState(() => {
        var lt;
        return ow((lt = e.settings) == null ? void 0 : lt.scriptParseGeminiApiFormat);
      });
    g.useEffect(() => {
      var lt;
      Z(ow((lt = e.settings) == null ? void 0 : lt.scriptParseGeminiApiFormat));
    }, [(Ht = e.settings) == null ? void 0 : Ht.scriptParseGeminiApiFormat]);
    const [re, fe] = g.useState(() => {
      var lt;
      return Qv(q, If(Q).effort ?? ((lt = e.settings) == null ? void 0 : lt.scriptParseReasoningEffort));
    });
    g.useEffect(() => {
      var lt;
      fe(Qv(q, (lt = e.settings) == null ? void 0 : lt.scriptParseReasoningEffort));
    }, [(nn = e.settings) == null ? void 0 : nn.scriptParseReasoningEffort, q]);
    const ye = g.useCallback(lt => {
      a(e.id, {
        settings: {
          ...e.settings,
          ...lt
        }
      });
    }, [e.id, e.settings, a]);
    g.useEffect(() => {
      const lt = If(Q);
      lt.id !== Q && (ye({
        chatModel: lt.id,
        model: lt.id,
        ...(lt.effort ? {
          scriptParseReasoningEffort: lt.effort
        } : {})
      }), lt.effort && fe(lt.effort));
    }, [Q, ye]);
    const ie = g.useCallback((lt, gt) => {
        ye({
          scriptParseResult: lt,
          ...gt
        });
      }, [ye]),
      ae = g.useRef(!1),
      be = g.useRef(!1),
      Ee = g.useRef(void 0),
      xe = g.useMemo(() => t.filter(lt => lt.id !== e.id).map(lt => ({
        id: lt.id,
        name: lt.nodeName || lt.type,
        url: h0n(lt)
      })).filter(lt => lt.url), [e.id, t]),
      he = g.useMemo(() => V ? uj(V).filter(lt => {
        var gt;
        return lt.nodeId && ((gt = B.get(lt.nodeId)) == null ? void 0 : gt.isGenerating);
      }).map(lt => lt.key) : [], [B, V]);
    g.useEffect(() => {
      if (!V) return;
      let lt = !1;
      const gt = _t => _t.map(At => {
          if (!At.nodeId) return At;
          const Yt = B.get(At.nodeId);
          if (!Yt) return At;
          const qe = h0n(Yt);
          return !qe || qe === At.imageUrl ? At : (lt = !0, {
            ...At,
            imageUrl: qe
          });
        }),
        Ut = {
          characters: gt(V.assets.characters),
          scenes: gt(V.assets.scenes),
          props: gt(V.assets.props)
        };
      lt && ie({
        ...V,
        assets: Ut
      });
    }, [B, ie, V]), g.useEffect(() => {
      if (!ae.current || !V) return;
      const lt = Ee.current;
      if (!lt) return;
      const gt = uj(V).find(Ut => Ut.key === lt);
      gt != null && gt.nodeId && (Ee.current = void 0, u == null || u(gt.nodeId), h == null || h(new Set([gt.nodeId])));
    }, [V, u, h]), g.useEffect(() => {
      if (!ae.current || !V) return;
      const lt = uj(V).some(gt => {
        var Ut;
        return gt.nodeId && ((Ut = B.get(gt.nodeId)) == null ? void 0 : Ut.isGenerating);
      });
      lt && (be.current = !0), be.current && !lt && (ae.current = !1, be.current = !1, T(!0), ye({
        scriptParseStage: "assets"
      }));
    }, [B, ye, V]);
    const ue = g.useCallback(lt => {
        const gt = zs(lt);
        a(e.id, {
          settings: {
            ...e.settings,
            chatModel: lt,
            model: lt,
            platformGroup: (gt == null ? void 0 : gt.platformGroup) || ko
          }
        });
      }, [e.id, e.settings, a]),
      ge = c.jsxs("div", {
        "data-node-header-toolbar": !0,
        className: "qiaodoumayi-aux-gen-toolbar flex min-h-[28px] shrink-0 items-center",
        onMouseDown: lt => lt.stopPropagation(),
        children: [c.jsx(Th, {
          scopeId: `${e.id}-compose`,
          dropdownType: "script-parse-compose-chat-model",
          value: q,
          models: W,
          isDark: r,
          activeDropdown: p,
          setActiveDropdown: m,
          onSelect: ue,
          isModelHiddenInList: f,
          menuPlacement: "above",
          menuMaxHeight: 260,
          menuZIndex: 10250,
          leadingIcon: c.jsx(XE, {
            size: 13
          })
        }), le ? c.jsx(_$, {
          nodeId: `${e.id}-compose`,
          dropdownType: "script-parse-compose-gemini-api-format",
          value: X,
          isDark: r,
          activeDropdown: p,
          setActiveDropdown: m,
          onSelect: lt => {
            Z(lt), ye({
              scriptParseGeminiApiFormat: lt
            });
          },
          buttonClassName: "shrink-0 text-xs",
          menuClassName: "w-44",
          menuPlacement: "above",
          menuZIndex: 10250
        }) : null, J ? c.jsx(dT, {
          nodeId: `${e.id}-compose`,
          dropdownType: "script-parse-compose-reasoning-effort",
          value: re,
          isDark: r,
          activeDropdown: p,
          setActiveDropdown: m,
          onSelect: lt => {
            fe(lt), ye({
              scriptParseReasoningEffort: lt
            });
          },
          buttonClassName: "shrink-0 text-xs",
          modelId: q,
          modelName: de,
          menuZIndex: 10250
        }) : null, ce ? c.jsx(Ku, {
          nodeId: e.id,
          platformGroup: we,
          modelName: de,
          modelId: q,
          modelConfigId: ne == null ? void 0 : ne.id,
          isDark: r,
          nodeSettings: e.settings,
          updateNode: a,
          onGroupChange: lt => ye({
            platformGroup: lt
          }),
          compact: !0,
          buttonVariant: "square",
          menuPlacement: "above",
          className: "shrink-0"
        }) : null]
      }),
      _e = g.useCallback(() => {
        var gt;
        const lt = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e.id) : e.id;
        (gt = document.querySelector(`[data-node-id="${lt}"].node-wrapper`)) == null || gt.dispatchEvent(new CustomEvent(CW));
      }, [e.id]),
      ke = g.useCallback(() => {
        T(!1), _e();
      }, [_e]),
      ve = g.useCallback(() => {
        T(!1), _e(), u == null || u(null), h == null || h(new Set());
      }, [_e, u, h]),
      Te = g.useCallback(() => {
        _e(), T(!0);
      }, [_e]),
      Ne = !!(N.trim() && !L),
      me = g.useCallback(() => {
        Ne && (v(!0), o(e.id));
      }, [Ne, o, e.id]),
      Ae = !!(F && !G),
      Fe = g.useCallback(() => {
        !_ && Ae || (j.current = null, C(!0));
      }, [_, Ae]),
      Me = g.useCallback(lt => {
        if (lt.button !== 0) return;
        const gt = Date.now(),
          Ut = j.current;
        if (Ut && gt - Ut.t <= 500 && Math.abs(lt.clientX - Ut.x) <= 18 && Math.abs(lt.clientY - Ut.y) <= 18) {
          j.current = null, lt.stopPropagation(), lt.preventDefault(), window.dispatchEvent(new MouseEvent("mouseup", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            clientX: lt.clientX,
            clientY: lt.clientY,
            button: 0
          })), Fe();
          return;
        }
        j.current = {
          t: gt,
          x: lt.clientX,
          y: lt.clientY
        };
      }, [Fe]);
    g.useEffect(() => {
      C(!1);
    }, [_, k]), g.useEffect(() => {
      if (!S) return;
      const lt = R.current;
      if (!lt) return;
      lt.focus();
      const gt = lt.value.length;
      lt.setSelectionRange(gt, gt);
    }, [S]);
    const Re = L ? D === "running" ? "解析中…" : "处理中…" : "解析脚本",
      $e = ((pt = e.settings) == null ? void 0 : pt.customAnalysisPrompt) || "",
      rt = X7e(e.settings),
      nt = $ct.find(lt => lt.key === k) || $ct[0],
      ze = rt[nt.valueKey] || "",
      Le = H > 0 && !L,
      Ke = H > 0 && !L,
      Xe = g.useRef(null);
    Qp(Xe, "50% 100%", !!V);
    const De = "relative w-full h-full flex flex-col overflow-visible pointer-events-auto",
      Ye = `flex-1 flex flex-col gap-2 px-3 pt-2 pb-3 min-h-0 overflow-hidden rounded-2xl ${r ? "bg-[#1a1a1a]" : "bg-white"}`,
      Ce = r ? "text-zinc-500" : "text-zinc-400",
      He = r ? "text-zinc-100" : "text-zinc-800",
      Ve = r ? "text-zinc-100" : "text-zinc-800",
      it = r ? "text-zinc-500 cursor-not-allowed" : "text-zinc-400 cursor-not-allowed",
      It = lt => `toolbar-label-btn h-11 px-2.5 flex items-center gap-1.5 text-[11px] whitespace-nowrap transition-colors ${lt ? Ve : it}`;
    return c.jsxs("div", {
      className: De,
      children: [V ? c.jsx("div", {
        className: "absolute left-1/2 bottom-full z-[120] -translate-x-1/2 transition-opacity duration-200 ease-out",
        style: {
          marginBottom: 52,
          opacity: y ? 1 : 0,
          pointerEvents: y ? "auto" : "none"
        },
        onClick: lt => lt.stopPropagation(),
        onPointerDown: lt => lt.stopPropagation(),
        onMouseDown: lt => lt.stopPropagation(),
        children: c.jsx("div", {
          ref: Xe,
          style: {
            transition: "none",
            willChange: "transform"
          },
          children: c.jsxs("div", {
            "data-canvas-pin-toolbar": "",
            className: `input-node-fast-tooltip ${r ? "input-node-fast-tooltip--dark" : "input-node-fast-tooltip--light"} flex items-center ${fJ(r)}`,
            children: [c.jsxs("button", {
              type: "button",
              disabled: !Ne,
              onClick: me,
              className: `${It(Ne)} toolbar-label-btn--capsule-start`,
              "data-tip": x("重新解析剧本"),
              children: [L ? c.jsx(Ua, {
                size: 14,
                className: "animate-spin"
              }) : c.jsx(bd, {
                size: 14
              }), c.jsx("span", {
                children: x("重新生成")
              })]
            }), c.jsxs("button", {
              type: "button",
              disabled: !Le,
              onClick: () => l(e.id, "image"),
              className: It(Le),
              "data-tip": x(Le ? "批量生成分镜" : "请先合成提示词"),
              children: [c.jsx(Od, {
                size: 14
              }), c.jsx("span", {
                children: x("批量生成分镜")
              })]
            }), c.jsxs("button", {
              type: "button",
              disabled: !Ke,
              onClick: () => l(e.id, "video"),
              className: It(Ke),
              "data-tip": x(Ke ? "批量生成视频" : "请先合成提示词"),
              children: [c.jsx(Oo, {
                size: 14
              }), c.jsx("span", {
                children: x("批量生视频")
              })]
            }), UD(e) ? c.jsx($D, {
              nodeIds: [e.id],
              pins: Zg(e),
              isDark: r
            }) : null]
          })
        })
      }) : null, c.jsx("div", {
        className: Ye,
        children: V ? c.jsxs(c.Fragment, {
          children: [c.jsx("div", {
            className: "flex-1 min-h-0 flex items-center justify-center px-2",
            children: c.jsx("div", {
              className: "w-full flex items-center justify-center gap-3",
              children: uUe.map((lt, gt) => {
                const Ut = lt.key === O,
                  _t = gt < K || lt.key === "confirm" && U > 0 && gt !== K;
                return c.jsxs("button", {
                  type: "button",
                  onClick: () => {
                    ye({
                      scriptParseStage: lt.key
                    }), Te();
                  },
                  onMouseDown: At => At.stopPropagation(),
                  className: "flex flex-col items-center gap-1 min-w-0",
                  children: [c.jsx("span", {
                    className: `h-5 w-5 rounded-full border flex items-center justify-center text-[10px] ${Ut || _t ? r ? "bg-white text-zinc-900 border-white" : "bg-zinc-900 text-white border-zinc-900" : r ? "border-zinc-600 text-zinc-500" : "border-zinc-300 text-zinc-400"}`,
                    children: _t && !Ut ? "✓" : gt + 1
                  }), c.jsx("span", {
                    className: `text-[11px] leading-4 ${Ut ? r ? "text-zinc-100" : "text-zinc-800" : "text-zinc-500"}`,
                    children: x(lt.label)
                  })]
                }, lt.key);
              })
            })
          }), e.errorMsg ? c.jsx("div", {
            className: "text-[11px] text-red-400 leading-snug",
            children: e.errorMsg
          }) : null, c.jsx("button", {
            type: "button",
            onClick: Te,
            onMouseDown: lt => lt.stopPropagation(),
            className: `w-full px-3 py-2 rounded-lg text-[13px] ${r ? "bg-white/10 hover:bg-white/15 text-zinc-100" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800"}`,
            children: x("打开脚本节点 →")
          })]
        }) : c.jsxs(c.Fragment, {
          children: [c.jsxs("div", {
            className: "flex items-center gap-3 shrink-0 px-0.5 text-[12px]",
            children: [c.jsx("button", {
              type: "button",
              onClick: () => w(!1),
              onMouseDown: lt => lt.stopPropagation(),
              className: _ ? Ce : He,
              children: x("剧本")
            }), c.jsx("button", {
              type: "button",
              onClick: () => w(!0),
              onMouseDown: lt => lt.stopPropagation(),
              className: _ ? He : Ce,
              children: x("约束")
            }), c.jsxs("div", {
              className: `ml-auto flex items-center gap-2 ${z > 0 ? He : Ce}`,
              children: [c.jsx("button", {
                type: "button",
                onClick: () => ye({
                  scriptParseShotCount: 0
                }),
                onMouseDown: lt => lt.stopPropagation(),
                className: z === 0 ? He : Ce,
                children: x("自动")
              }), c.jsxs("label", {
                className: "flex items-center gap-1",
                children: [c.jsx("input", {
                  type: "number",
                  min: 1,
                  max: bye,
                  value: z > 0 ? z : "",
                  placeholder: `1–${bye}`,
                  title: x("自定义镜头数，最多 {0} 镜", bye),
                  onChange: lt => {
                    const gt = Number(lt.target.value);
                    ye({
                      scriptParseShotCount: Number.isFinite(gt) && gt > 0 ? Math.min(bye, Math.round(gt)) : 0
                    });
                  },
                  onMouseDown: lt => lt.stopPropagation(),
                  className: "w-12 bg-transparent outline-none text-[12px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                }), c.jsx("span", {
                  children: x("镜")
                })]
              })]
            })]
          }), c.jsxs("div", {
            className: "flex-1 min-h-0 flex flex-col",
            children: [_ ? c.jsxs("div", {
              className: "flex flex-wrap items-center gap-x-2 gap-y-1 shrink-0 px-0.5 pb-1",
              children: [$ct.map(lt => {
                const gt = lt.key === nt.key,
                  Ut = !!rt[lt.valueKey];
                return c.jsxs("button", {
                  type: "button",
                  onClick: () => A(lt.key),
                  onMouseDown: _t => _t.stopPropagation(),
                  className: `text-[11px] ${gt ? He : Ce}`,
                  children: [x(lt.label), Ut ? c.jsx("span", {
                    className: "ml-0.5 opacity-60",
                    children: "·"
                  }) : null]
                }, lt.key);
              }), c.jsx("button", {
                type: "button",
                onClick: () => ye({
                  [nt.key]: ze.trim() ? "" : nt.fallback
                }),
                onMouseDown: lt => lt.stopPropagation(),
                className: `ml-auto text-[11px] ${Ce}`,
                children: ze.trim() ? x("恢复默认") : x("填入默认")
              })]
            }) : null, c.jsx("div", {
              className: "relative flex-1 min-h-0",
              children: S && (_ || !Ae) ? c.jsx("textarea", {
                ref: R,
                value: _ ? ze : G,
                placeholder: x(_ ? "留空则使用默认" : "粘贴剧本，或连接文本节点"),
                onChange: lt => ye(_ ? {
                  [nt.key]: lt.target.value
                } : {
                  scriptText: lt.target.value
                }),
                onMouseDown: lt => lt.stopPropagation(),
                onBlur: () => C(!1),
                className: `absolute inset-0 w-full h-full resize-none border-0 bg-transparent px-0.5 py-1 text-[13px] leading-relaxed outline-none custom-scrollbar ${r ? "text-zinc-200 placeholder:text-zinc-600" : "text-zinc-800 placeholder:text-zinc-400"}`
              }) : c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: `absolute inset-0 overflow-auto custom-scrollbar px-0.5 py-1 text-[13px] leading-relaxed whitespace-pre-wrap pointer-events-none ${(_ ? ze : Ae ? N : G).trim() ? r ? "text-zinc-200" : "text-zinc-800" : Ce}`,
                  children: _ ? ze.trim() || x("双击编辑，留空则用默认") : Ae ? hbi(N, 160) || x("已连接文本节点") : G.trim() || x("双击输入剧本，或连接文本节点")
                }), c.jsx("div", {
                  "data-node-body-drag-overlay": !0,
                  className: "absolute inset-0 z-10 cursor-grab touch-none",
                  onPointerDown: Me,
                  onDoubleClick: lt => {
                    lt.stopPropagation(), lt.preventDefault(), Fe();
                  }
                })]
              })
            })]
          }), c.jsxs("div", {
            className: `sketch-chat-input nodrag nowheel shrink-0 ${I ? "" : "sketch-chat-input--bar-only"} ${r ? "sketch-chat-input-dark" : ""}`,
            onMouseDown: lt => lt.stopPropagation(),
            children: [I ? c.jsx("textarea", {
              value: $e,
              placeholder: x("拆镜要求（可选）"),
              onChange: lt => ye({
                customAnalysisPrompt: lt.target.value
              }),
              onMouseDown: lt => lt.stopPropagation(),
              onKeyDown: lt => {
                lt.key === "Enter" && !lt.shiftKey && !lt.nativeEvent.isComposing && (lt.preventDefault(), me());
              },
              className: "chat-scroll-minimal",
              style: {
                height: 44
              }
            }) : null, c.jsxs("div", {
              className: `sketch-chat-toolbar ${r ? "sketch-chat-toolbar-dark" : ""}`,
              children: [c.jsxs("div", {
                className: "sketch-chat-toolbar-left rh-scroll-minimal",
                children: [c.jsx("button", {
                  type: "button",
                  title: x("自定义拆镜要求"),
                  className: `sketch-chat-toolbar-icon-btn ${I || $e.trim() ? "is-active" : ""}`,
                  style: {
                    width: "auto",
                    padding: "0 6px",
                    fontSize: 11
                  },
                  onClick: () => E(lt => !lt),
                  onMouseDown: lt => lt.stopPropagation(),
                  children: x("要求")
                }), le ? c.jsx(_$, {
                  nodeId: e.id,
                  dropdownType: "script-parse-gemini-api-format",
                  value: X,
                  isDark: r,
                  activeDropdown: p,
                  setActiveDropdown: m,
                  onSelect: lt => {
                    Z(lt), ye({
                      scriptParseGeminiApiFormat: lt
                    });
                  },
                  buttonVariant: "bare",
                  buttonClassName: "shrink-0 text-xs",
                  menuClassName: "sketch-chat-popover w-44"
                }) : null, ce ? c.jsx(Ku, {
                  nodeId: e.id,
                  platformGroup: we,
                  modelName: de,
                  modelId: q,
                  modelConfigId: ne == null ? void 0 : ne.id,
                  isDark: r,
                  nodeSettings: e.settings,
                  updateNode: a,
                  onGroupChange: lt => ye({
                    platformGroup: lt
                  }),
                  compact: !0,
                  buttonVariant: "bare",
                  className: "shrink-0"
                }) : null]
              }), c.jsxs("div", {
                className: "sketch-chat-toolbar-right",
                children: [c.jsx(Th, {
                  scopeId: e.id,
                  dropdownType: "script-parse-chat-model",
                  value: q,
                  models: W,
                  isDark: r,
                  activeDropdown: p,
                  setActiveDropdown: m,
                  onSelect: ue,
                  isModelHiddenInList: f,
                  buttonVariant: "transparent",
                  menuClassName: "sketch-chat-popover",
                  className: "sketch-chat-model-picker !flex-none shrink-0 min-w-0 max-w-[7.5rem]"
                }), J ? c.jsx(dT, {
                  nodeId: e.id,
                  dropdownType: "script-parse-reasoning-effort",
                  value: re,
                  isDark: r,
                  activeDropdown: p,
                  setActiveDropdown: m,
                  onSelect: lt => {
                    fe(lt), ye({
                      scriptParseReasoningEffort: lt
                    });
                  },
                  buttonVariant: "bare",
                  buttonClassName: "shrink-0 text-xs",
                  menuClassName: "sketch-chat-popover",
                  modelId: q,
                  modelName: de
                }) : null, c.jsx("button", {
                  type: "button",
                  disabled: !Ne,
                  title: x(Re),
                  onClick: me,
                  onMouseDown: lt => lt.stopPropagation(),
                  className: `sketch-chat-send ${r ? "sketch-chat-send-dark" : ""} ${Ne && !L ? "sketch-chat-send--active" : ""}`,
                  children: L ? c.jsx(Ua, {
                    size: 14,
                    className: "animate-spin"
                  }) : c.jsx(Gc, {
                    size: 16,
                    strokeWidth: 2
                  })
                })]
              })]
            })]
          }), e.errorMsg ? c.jsx("div", {
            className: "text-[11px] text-red-400 leading-snug shrink-0",
            children: e.errorMsg
          }) : null]
        })
      }), V ? c.jsx(Ryo, {
        open: M,
        isDark: r,
        isGenerating: L,
        result: V,
        stage: O,
        assetGridCount: Y,
        onClose: ke,
        onBackdropClose: ve,
        onStage: lt => ye({
          scriptParseStage: lt
        }),
        onResult: lt => ie(lt),
        onCompose: (lt, gt) => {
          v(lt === "smart"), s(e.id, lt, gt);
        },
        onCreateAssets: lt => {
          const gt = typeof lt == "string" && lt.trim() ? lt.trim() : void 0;
          Ee.current = gt, ae.current = !0, be.current = !1, l(e.id, "assets", gt), ke();
        },
        onJumpToNode: lt => {
          var gt;
          ae.current = !0, be.current = !!((gt = B.get(lt)) != null && gt.isGenerating), ke(), u == null || u(lt), h == null || h(new Set([lt]));
        },
        canvasImages: xe,
        generatingAssetKeys: he,
        composeModelBar: ge,
        constraints: rt,
        onToast: (lt, gt) => d == null ? void 0 : d(lt, gt)
      }) : null]
    });
  },
  p0n = "qdm-video-input-last-dir",
  xvr = ["mp4", "webm", "mov", "avi", "mkv", "flv", "ogg", "m4v"];

function tbe() {
  return typeof window < "u" && "__TAURI__" in window;
}

function m0n(e) {
  return e.split(/[/\\]/).pop() || "video.mp4";
}

function _vr(e) {
  var t;
  return ((t = e.split(".").pop()) == null ? void 0 : t.toLowerCase()) || "";
}

function jyo(e) {
  return e.type.startsWith("video/") || xvr.includes(_vr(e.name));
}

function d$t(e) {
  return /^https?:\/\//i.test(e);
}

function f0n(e) {
  return !e || typeof e != "string" ? !1 : !!(e.startsWith("blob:") || e.startsWith("data:video/") || d$t(e) && Sh(e));
}

function G$e(e) {
  const t = _vr(e.split("?")[0] || "");
  return t === "webm" ? "video/webm" : t === "mov" ? "video/quicktime" : t === "ogg" ? "video/ogg" : "video/mp4";
}

async function Dyo(e) {
  try {
    const t = await fetch(e, {
      mode: "cors"
    });
    if (t.ok) {
      const n = await t.blob(),
        r = n.type ? n : new Blob([n], {
          type: G$e(e)
        }),
        a = URL.createObjectURL(r);
      return {
        url: a,
        revoke: () => URL.revokeObjectURL(a)
      };
    }
  } catch {}
  if (tbe()) try {
    const {
        fetchRemoteImageAsBlob: t
      } = await Ie(async () => {
        const {
          fetchRemoteImageAsBlob: i
        } = await Promise.resolve().then(() => hg);
        return {
          fetchRemoteImageAsBlob: i
        };
      }, void 0, import.meta.url),
      n = await t(e),
      r = n.type ? n : new Blob([n], {
        type: G$e(e)
      }),
      a = URL.createObjectURL(r);
    return {
      url: a,
      revoke: () => URL.revokeObjectURL(a)
    };
  } catch (t) {
    console.warn("[VideoInputNodeInline] remote video blob fallback failed:", t);
  }
  return null;
}

async function Lyo(e) {
  if (d$t(e)) {
    const t = await Dyo(e);
    if (t) return t;
  }
  return {
    url: e,
    revoke: null
  };
}

function Oyo(e) {
  return new Promise(t => {
    const n = document.createElement("video");
    let r = !1,
      a;
    const i = o => {
      r || (r = !0, clearTimeout(a), n.onloadedmetadata = null, n.onerror = null, n.removeAttribute("src"), n.load(), t(o));
    };
    a = window.setTimeout(() => i(null), 8e3), n.preload = "metadata", n.onloadedmetadata = () => {
      const o = Number.isFinite(n.duration) ? n.duration : 0;
      i({
        duration: o,
        w: n.videoWidth || 0,
        h: n.videoHeight || 0
      });
    }, n.onerror = () => i(null), n.src = e, n.load();
  });
}

function Byo(e) {
  return new Promise((t, n) => {
    const r = document.createElement("video");
    let a = !1,
      i;
    const o = s => {
      a || (a = !0, clearTimeout(i), r.onloadedmetadata = null, r.onloadeddata = null, r.onerror = null, s ? (r.removeAttribute("src"), r.load(), n(s)) : t(r));
    };
    i = window.setTimeout(() => o(new Error("视频加载超时")), 15e3), r.preload = "auto", r.muted = !0, r.playsInline = !0, d$t(e) && (r.crossOrigin = "anonymous"), r.onloadeddata = () => o(), r.onerror = () => {
      var s;
      return o(new Error(((s = r.error) == null ? void 0 : s.message) || "视频加载失败"));
    }, r.src = e, r.load();
  });
}

function Fyo(e, t) {
  return new Promise((n, r) => {
    if (Math.abs(e.currentTime - t) <= .01 && e.readyState >= 2 && !e.seeking) {
      n();
      return;
    }
    let a = !1,
      i;
    const o = () => {
        e.onseeked = null, e.onerror = null, clearTimeout(i);
      },
      s = l => {
        a || (a = !0, o(), l ? r(l) : n());
      };
    i = window.setTimeout(() => s(new Error("视频定位超时")), 1e4), e.onseeked = () => s(), e.onerror = () => {
      var l;
      return s(new Error(((l = e.error) == null ? void 0 : l.message) || "视频定位失败"));
    }, e.currentTime = t;
  });
}

function zyo(e, t) {
  return new Promise((n, r) => {
    e.toBlob(a => {
      if (!a) {
        r(new Error("视频帧编码失败"));
        return;
      }
      const i = new FileReader();
      i.onload = () => n(String(i.result || "")), i.onerror = () => r(i.error || new Error("视频帧读取失败")), i.readAsDataURL(a);
    }, "image/jpeg", t);
  });
}

const Uyo = ({
    node: e,
    nodes: t = [],
    connections: n = [],
    isDark: r,
    updateNode: a,
    frameSelectionRef: i,
    setFrameContextMenu: o,
    renderQuality: s = "high"
  }) => {
    var J, pe, ce, we, X;
    on();
    const l = g.useMemo(() => {
        if (e.content) return null;
        const Z = new Map(t.map(re => [re.id, re]));
        for (const re of n) {
          if (re.to !== e.id) continue;
          const fe = Z.get(re.from);
          if ((fe == null ? void 0 : fe.type) === "input-image" && fe.content) {
            const ye = fe.content;
            if (Sh(ye) || ye.startsWith("blob:")) return ye;
          }
        }
        return null;
      }, [e.id, e.content, t, n]),
      d = e.content || l || null,
      u = e._contentAssetId || ((J = e.settings) == null ? void 0 : J._assetId),
      {
        content: h,
        isLoading: p
      } = Kp(d ?? void 0, {
        nodeType: "video-input",
        preferConstantDisplay: !0,
        allowSessionBlob: !0,
        allowDirectOssUrl: !0,
        blobRecoveryAssetIds: u ? [u] : void 0,
        onBlobUrlRecovered: Z => a(e.id, {
          content: Z
        })
      }),
      m = g.useRef(null);
    g.useEffect(() => {
      if (h && h.trim().length > 0) {
        m.current = h;
        return;
      }
      if (f0n(d)) {
        m.current = d;
        return;
      }
      d || (m.current = null);
    }, [h, d]);
    const f = h || (f0n(d) ? d : null) || m.current || null,
      y = g.useRef(null),
      b = g.useRef(null),
      v = (pe = e.settings) == null ? void 0 : pe.videoFramesScrollTop,
      _ = (ce = e.settings) == null ? void 0 : ce.videoCurrentTime,
      w = g.useRef(null),
      k = g.useRef(null),
      A = g.useRef(null),
      S = g.useCallback(() => {
        const Z = y.current;
        Z && (w.current && clearTimeout(w.current), w.current = setTimeout(() => {
          w.current = null;
          const re = Z.scrollTop;
          v !== re && a(e.id, {
            settings: {
              ...e.settings,
              videoFramesScrollTop: re
            }
          });
        }, 150));
      }, [e.id, e.settings, a, v]),
      C = g.useCallback(Z => {
        var ye;
        if ((((ye = e.frames) == null ? void 0 : ye.length) ?? 0) === 0) return;
        const fe = typeof v == "number" && v >= 0 ? v : 0;
        Math.abs(Z.scrollTop - fe) > 2 && (Z.scrollTop = Math.min(fe, Z.scrollHeight - Z.clientHeight));
      }, [e.frames, v]);
    g.useLayoutEffect(() => {
      var ye;
      const Z = y.current,
        re = ((ye = e.frames) == null ? void 0 : ye.length) ?? 0;
      if (!Z || re === 0) return;
      C(Z);
      const fe = new ResizeObserver(() => {
        y.current && C(y.current);
      });
      return fe.observe(Z), () => fe.disconnect();
    }, [e.frames, v, C]), g.useEffect(() => {
      var ie;
      const Z = y.current,
        re = ((ie = e.frames) == null ? void 0 : ie.length) ?? 0;
      if (!Z || re === 0) return;
      const fe = setTimeout(() => C(Z), 100),
        ye = setTimeout(() => C(Z), 400);
      return () => {
        clearTimeout(fe), clearTimeout(ye);
      };
    }, [e.frames, v, C]), g.useEffect(() => {
      const Z = A.current;
      if (Z && s !== "high") try {
        Z.pause();
      } catch {}
    }, [s, f]), g.useEffect(() => {
      const Z = A.current;
      if (!Z || !f) return;
      const re = () => {
        k.current || (k.current = setTimeout(() => {
          var ie;
          k.current = null;
          const fe = Z.currentTime,
            ye = (ie = e.settings) == null ? void 0 : ie.videoCurrentTime;
          typeof ye == "number" && Math.abs(ye - fe) < .5 || a(e.id, {
            settings: {
              ...e.settings,
              videoCurrentTime: fe
            }
          });
        }, 2e3));
      };
      return Z.addEventListener("timeupdate", re), () => {
        Z.removeEventListener("timeupdate", re), k.current && (clearTimeout(k.current), k.current = null);
      };
    }, [f, e.id, e.settings, a]);
    const I = ((we = e.frames) == null ? void 0 : we.length) ?? 0,
      [E, M] = g.useState(!1),
      T = g.useCallback(async (Z, re) => {
        try {
          const {
            assetStore: fe
          } = await Ie(async () => {
            const {
              assetStore: ae
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: ae
            };
          }, void 0, import.meta.url);
          await fe.init();
          const ye = `video_input_${e.id}`;
          (await fe.saveBlobAsset(ye, Z, `file://video-input/${encodeURIComponent(re)}`, "local", (tbe(), void 0))) && a(e.id, {
            _contentAssetId: ye,
            settings: {
              ...e.settings,
              _assetId: ye
            }
          });
        } catch (fe) {
          console.warn("[VideoInputNodeInline] persist video asset failed:", fe);
        }
      }, [e.id, e.settings, a]),
      P = g.useCallback(async (Z, re, fe = {}) => {
        var he;
        const {
            extractNodeNameFromFileName: ye
          } = await Ie(async () => {
            const {
              extractNodeNameFromFileName: ue
            } = await Promise.resolve().then(() => Kzn);
            return {
              extractNodeNameFromFileName: ue
            };
          }, void 0, import.meta.url),
          ie = ye(re),
          ae = typeof e.content == "string" ? e.content : "",
          be = String(((he = e.settings) == null ? void 0 : he._blobUrl) || "").trim(),
          Ee = {
            content: Z,
            videoFileName: re,
            nodeName: ie,
            errorMsg: void 0,
            ...(fe.localFilePath ? {
              _localFilePath: fe.localFilePath
            } : {}),
            settings: {
              ...e.settings,
              ...(Z.startsWith("blob:") ? {
                _blobUrl: Z
              } : {})
            }
          };
        fe.clearFrames && (Ee.frames = [], Ee.selectedKeyframes = [], Ee.settings = {
          ...Ee.settings,
          videoFramesScrollTop: 0,
          videoCurrentTime: 0
        }), a(e.id, Ee), ae.startsWith("blob:") && ae !== Z && x0(ae), be.startsWith("blob:") && be !== Z && x0(be), fe.blob && fe.blob.size > 0 && T(fe.blob, re);
        const xe = await Oyo(Z);
        xe && a(e.id, {
          videoMeta: xe
        });
      }, [e.id, e.content, e.settings, a, T]),
      R = g.useCallback(async (Z, re = !1) => {
        if (!jyo(Z)) {
          Ai("error", "不支持的视频格式", 3e3);
          return;
        }
        M(!0);
        try {
          const fe = typeof Z.path == "string" ? Z.path : void 0;
          if (tbe() && fe) try {
            const {
                readFileAsBlob: ie
              } = await Ie(async () => {
                const {
                  readFileAsBlob: xe
                } = await Promise.resolve().then(() => hg);
                return {
                  readFileAsBlob: xe
                };
              }, void 0, import.meta.url),
              ae = await ie(fe),
              be = ae.type ? ae : new Blob([ae], {
                type: Z.type || G$e(Z.name)
              }),
              Ee = URL.createObjectURL(be);
            await P(Ee, Z.name || m0n(fe), {
              clearFrames: re,
              localFilePath: fe,
              blob: be
            });
            return;
          } catch (ie) {
            console.warn("[VideoInputNodeInline] read dropped local video failed, fallback to File object:", ie);
          }
          const ye = URL.createObjectURL(Z);
          await P(ye, Z.name, {
            clearFrames: re,
            ...(fe ? {
              localFilePath: fe
            } : {}),
            blob: Z
          });
        } catch (fe) {
          console.warn("[VideoInputNodeInline] commit video file failed:", fe), Ai("error", "视频加载失败，请重试", 3e3);
        } finally {
          M(!1);
        }
      }, [P]),
      j = g.useCallback(async Z => {
        Z.preventDefault(), Z.stopPropagation();
        const re = Z.dataTransfer.files[0];
        re && (await R(re, !!(e.content || I > 0)));
      }, [R, I, e.content]),
      B = g.useCallback(async (Z, re = !1) => {
        var ye;
        const fe = (ye = Z.target.files) == null ? void 0 : ye[0];
        Z.target.value = "", fe && (await R(fe, re));
      }, [R]),
      F = g.useCallback(async (Z = !1) => {
        var re, fe;
        if (!tbe()) {
          (re = b.current) == null || re.click();
          return;
        }
        M(!0);
        try {
          const {
              open: ye
            } = await Ie(async () => {
              const {
                open: ge
              } = await Promise.resolve().then(() => Sb);
              return {
                open: ge
              };
            }, void 0, import.meta.url),
            ie = typeof localStorage < "u" ? localStorage.getItem(p0n) : void 0,
            ae = await ye({
              multiple: !1,
              directory: !1,
              title: "选择视频",
              defaultPath: ie || void 0,
              filters: [{
                name: "视频",
                extensions: xvr
              }]
            });
          if (!ae || typeof ae != "string") return;
          const be = ae;
          try {
            const ge = be.replace(/[/\\][^/\\]+$/, "");
            ge && ge !== be && localStorage.setItem(p0n, ge);
          } catch {}
          const {
              readFileAsBlob: Ee
            } = await Ie(async () => {
              const {
                readFileAsBlob: ge
              } = await Promise.resolve().then(() => hg);
              return {
                readFileAsBlob: ge
              };
            }, void 0, import.meta.url),
            xe = await Ee(be),
            he = m0n(be),
            ue = xe.type ? xe : new Blob([xe], {
              type: G$e(he)
            });
          await P(URL.createObjectURL(ue), he, {
            clearFrames: Z,
            localFilePath: be,
            blob: ue
          });
        } catch (ye) {
          console.warn("[VideoInputNodeInline] choose video failed:", ye), Ai("error", "视频加载失败，请重试", 3e3), (fe = b.current) == null || fe.click();
        } finally {
          M(!1);
        }
      }, [P]),
      N = g.useCallback(async Z => {
        var ae;
        const re = e.content || l || null;
        if (!re) return;
        const fe = f || e.content || re;
        if (!fe || fe.startsWith("content_ref:")) return;
        let ye = null,
          ie = null;
        a(e.id, {
          extractingFrames: !0,
          errorMsg: void 0
        });
        try {
          ye = await Lyo(fe), ie = await Byo(ye.url);
          const be = Number.isFinite(ie.duration) ? ie.duration : 0;
          if (be <= 0) throw new Error("无法读取视频时长");
          const Ee = [];
          if (Z === "auto") for (let me = 0, Ae = 0; me < be && Ae < 60; me += 1 / 2, Ae++) Ee.push(me);else {
            const Te = Math.min(30, Math.max(1, Math.ceil(be)));
            for (let Ne = 0; Ne < Te; Ne++) Ee.push(Ne / Te * be);
          }
          const xe = 480,
            he = ie.videoWidth || 1,
            ue = ie.videoHeight || 1,
            ge = Math.min(1, xe / Math.max(he, ue)),
            _e = document.createElement("canvas"),
            ke = _e.getContext("2d");
          if (!ke) throw new Error("Canvas 初始化失败");
          _e.width = Math.max(1, Math.round(he * ge)), _e.height = Math.max(1, Math.round(ue * ge));
          const ve = [];
          for (const Te of Ee) {
            const Ne = Math.max(0, Math.min(Te, be - .001));
            await Fyo(ie, Ne), ke.drawImage(ie, 0, 0, _e.width, _e.height);
            const me = await zyo(_e, .75),
              cached = await aiyouCacheReferenceImage(await (await fetch(me)).blob());
            ve.push({
              url: cached.url,
              assetId: cached.assetId,
              time: Ne
            });
          }
          a(e.id, {
            frames: ve,
            selectedKeyframes: [],
            extractingFrames: !1,
            errorMsg: void 0
          });
        } catch (be) {
          const Ee = be instanceof Error ? be.message : String(be);
          console.warn("[VideoInputNodeInline] extract frames failed:", be), a(e.id, {
            extractingFrames: !1,
            errorMsg: `抽帧失败：${Ee}`
          });
        } finally {
          ie && (ie.removeAttribute("src"), ie.load()), (ae = ye == null ? void 0 : ye.revoke) == null || ae.call(ye);
        }
      }, [e.id, e.content, l, f, a]),
      G = g.useCallback(() => {
        N("auto");
      }, [N]),
      z = g.useCallback(() => {
        N("smart");
      }, [N]),
      V = (Z, re, fe) => {
        const ye = e.frames || [],
          ie = e.selectedKeyframes || [],
          ae = xe => `${xe.time}-${xe.url}`,
          be = new Map(ye.map(xe => [ae(xe), xe]));
        let Ee = [...ie];
        if (Z.shiftKey && i.current[e.id] !== void 0 && ye.length > 0) {
          const xe = i.current[e.id],
            he = Math.min(xe, fe),
            ue = Math.max(xe, fe),
            ge = ye.slice(he, ue + 1),
            _e = new Set(Ee.map(ae));
          ge.forEach(ke => _e.add(ae(ke))), Ee = Array.from(_e).map(ke => be.get(ke)).filter(Boolean);
        } else Ee = Ee.some(he => ae(he) === ae(re)) ? Ee.filter(he => ae(he) !== ae(re)) : [...Ee, re];
        i.current[e.id] = fe, a(e.id, {
          selectedKeyframes: Ee
        });
      },
      O = e.frames || [],
      L = e.selectedKeyframes || [],
      D = Z => `${Z.time}-${Z.url}`,
      U = e.frames || [],
      H = e.settings || {},
      Y = Ay(e.videoPosterUrl, typeof H.videoPosterUrl == "string" ? H.videoPosterUrl : "", (X = U[0]) == null ? void 0 : X.url),
      K = U.map(Z => Z.url),
      W = j1(K);
    W.some(Z => Z.isLoading);
    const Q = U.map((Z, re) => {
        var fe;
        return {
          ...Z,
          url: ((fe = W[re]) == null ? void 0 : fe.content) || Z.url
        };
      }),
      q = s === "low" && !!f && !e.isGenerating,
      [ne, de] = g.useState(!1);
    g.useEffect(() => {
      de(!1);
    }, [f]);
    const le = s !== "low" && !!f && !e.isGenerating && (p || !ne);
    return SFt(e.id, ei() ? !1 : q || le), c.jsxs("div", {
      "data-node-file-drop-zone": "video-input",
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto video-input-container ${r ? "bg-[#1f1f1f]" : "bg-white"}`,
      onDrop: j,
      onDragOver: Z => {
        Z.preventDefault(), Z.stopPropagation(), Z.dataTransfer && (Z.dataTransfer.dropEffect = "copy");
      },
      children: [c.jsx("input", {
        ref: b,
        type: "file",
        className: "hidden",
        accept: "video/*,.mp4,.webm,.mov,.avi,.mkv,.flv,.ogg,.m4v",
        onChange: Z => B(Z, !!(e.content || O.length > 0))
      }), c.jsxs("div", {
        className: "flex-1 flex flex-col gap-3 p-3 overflow-hidden min-h-0",
        children: [f || E ? c.jsxs("div", {
          className: "space-y-2",
          children: [l && !e.content && c.jsx("div", {
            className: "text-[10px] text-zinc-500 text-center py-0.5",
            children: x("视频来自上游图片输入节点")
          }), c.jsx("div", {
            "data-video-input-preview": !0,
            className: `relative w-full aspect-video rounded-lg overflow-hidden ${r ? "bg-[#1f1f1f]/70" : "bg-zinc-100"}`,
            children: E && !f ? c.jsxs("div", {
              className: "flex flex-col items-center justify-center gap-2 text-zinc-500 h-full min-h-[120px]",
              children: [c.jsx(Ua, {
                size: 24,
                className: "animate-spin"
              }), c.jsx("span", {
                className: "text-xs",
                children: x("正在加载视频...")
              })]
            }) : q ? Y ? c.jsx("div", {
              className: "absolute inset-0 overflow-hidden rounded-lg",
              "aria-hidden": !0,
              children: c.jsx(Tpe, {
                src: Y,
                isDark: r,
                nodeType: "video-input",
                nodeId: e.id,
                worldWidth: e.width,
                worldHeight: e.height
              })
            }) : c.jsx("div", {
              className: `absolute inset-0 rounded-lg border pointer-events-none ${Sp(r)}`,
              "aria-hidden": !0
            }) : p && !f ? c.jsxs("div", {
              className: "flex flex-col items-center justify-center gap-2 text-zinc-500 h-full min-h-[120px]",
              children: [c.jsx(Ua, {
                size: 24,
                className: "animate-spin"
              }), c.jsx("span", {
                className: "text-xs",
                children: x("加载视频中...")
              })]
            }) : c.jsxs(c.Fragment, {
              children: [le && !ne ? c.jsx("div", {
                className: `absolute inset-0 z-20 rounded-lg border pointer-events-none ${Sp(r)}`,
                "aria-hidden": !0
              }) : null, c.jsx(RXe, {
                ref: A,
                src: f || "",
                className: ne ? "bg-transparent rounded-lg" : `${Sp(r)} !bg-[#1f1f1f]/75 rounded-lg`,
                videoClassName: "!object-contain",
                poster: e.videoPosterUrl || void 0,
                preload: tbe() ? "auto" : "metadata",
                defaultMuted: !0,
                defaultControlsVisible: ne,
                onLoadedData: () => de(!0),
                onLoadedMetadata: () => de(!0),
                onCanPlay: Z => {
                  const re = Z.currentTarget,
                    fe = typeof _ == "number" && _ >= 0 && _ < re.duration ? _ : 0;
                  fe > 0 && Math.abs(re.currentTime - fe) > .5 && (re.currentTime = fe);
                },
                onPlay: Z => {
                  const re = Z.currentTarget;
                  re.setAttribute("data-user-controlled", "true"), re.setAttribute("data-user-playing", "true");
                },
                onPause: Z => {
                  const re = Z.currentTarget;
                  re.setAttribute("data-user-controlled", "true"), re.setAttribute("data-user-playing", "false");
                },
                onDoubleClick: Z => {
                  Z.preventDefault(), Z.stopPropagation();
                }
              })]
            })
          }), c.jsxs("div", {
            className: "flex items-center gap-2 flex-wrap",
            children: [c.jsx("button", {
              type: "button",
              className: r ? "px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer border bg-transparent text-white border-white/30 hover:bg-white/5" : "bg-black hover:bg-[#1f1f1f] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer",
              onMouseDown: Z => Z.stopPropagation(),
              onClick: Z => {
                Z.preventDefault(), Z.stopPropagation(), F(!0);
              },
              children: x("更换视频")
            }), c.jsx("button", {
              type: "button",
              disabled: !!e.extractingFrames,
              className: `px-3 py-1.5 rounded text-xs border transition-colors ${r ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "border-zinc-300 hover:border-blue-500 hover:text-blue-600"} ${e.extractingFrames ? "opacity-60 cursor-wait" : ""}`,
              onMouseDown: Z => Z.stopPropagation(),
              onClick: G,
              children: x("自动抽帧（2fps）")
            }), c.jsx("button", {
              type: "button",
              disabled: !!e.extractingFrames,
              className: `px-3 py-1.5 rounded text-xs border transition-colors ${r ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-green-50 border-green-300 hover:border-green-500 hover:text-green-600"} ${e.extractingFrames ? "opacity-60 cursor-wait" : ""}`,
              onMouseDown: Z => Z.stopPropagation(),
              onClick: z,
              children: x("智能抽帧")
            }), e.extractingFrames && c.jsx("span", {
              className: "text-[11px] text-blue-500",
              children: x("抽帧中...")
            }), !e.extractingFrames && e.errorMsg ? c.jsx("span", {
              className: "text-[11px] text-red-500",
              children: e.errorMsg
            }) : null]
          })]
        }) : c.jsxs("div", {
          className: "flex flex-col items-center justify-center flex-1 gap-3",
          children: [c.jsx("div", {
            className: `w-12 h-12 rounded-2xl flex items-center justify-center border ${r ? "bg-zinc-800 border-zinc-700/50" : "bg-zinc-100 border-zinc-300"}`,
            children: c.jsx(Oo, {
              className: `w-6 h-6 ${r ? "text-zinc-500" : "text-zinc-400"}`
            })
          }), c.jsx("button", {
            type: "button",
            disabled: E,
            className: r ? "px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer border bg-transparent text-zinc-100 border-zinc-500 hover:bg-zinc-800/60 disabled:opacity-60 disabled:cursor-wait" : "px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-black hover:bg-[#1f1f1f] text-white disabled:opacity-60 disabled:cursor-wait",
            onMouseDown: Z => Z.stopPropagation(),
            onClick: Z => {
              Z.preventDefault(), Z.stopPropagation(), F(!1);
            },
            children: x("选择或拖拽视频")
          }), c.jsx("div", {
            className: "text-[10px] text-center text-zinc-500 pointer-events-none",
            children: x("支持 MP4/WEBM，可点击上传或拖拽到此节点")
          })]
        }), c.jsxs("div", {
          className: "flex items-center justify-between text-[11px] text-zinc-500",
          children: [c.jsx("span", {
            children: x("抽帧缩略图")
          }), c.jsxs("span", {
            children: [O.length, x(" 张")]
          })]
        }), c.jsx("div", {
          ref: y,
          className: "grid gap-3 w-full overflow-y-auto custom-scrollbar flex-1 min-h-0",
          style: {
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(100px, 15vw, 160px), 1fr))",
            gridAutoRows: "minmax(80px, auto)"
          },
          onScroll: S,
          onMouseDown: Z => Z.stopPropagation(),
          onClick: Z => {
            Z.target.closest("button") || L.length !== 0 && (a(e.id, {
              selectedKeyframes: []
            }), delete i.current[e.id]);
          },
          onWheel: Z => {
            Z.stopPropagation();
          },
          children: O.length === 0 ? c.jsx("div", {
            className: `col-span-full text-[11px] text-zinc-500 text-center py-4 border rounded ${r ? "bg-zinc-800/40 border-zinc-700" : "bg-white/40 border-zinc-300"}`,
            children: x("点击「自动抽帧」即可生成缩略图")
          }) : Q.map((Z, re) => {
            var ie;
            const fe = L.some(ae => D(ae) === D(U[re])),
              ye = (ie = W[re]) == null ? void 0 : ie.isLoading;
            return c.jsxs("button", {
              className: `relative rounded border overflow-hidden group ${fe ? "ring-2 ring-blue-500" : ""}`,
              onMouseDown: ae => ae.stopPropagation(),
              onClick: ae => V(ae, U[re], re),
              onContextMenu: ae => {
                ae.preventDefault(), ae.stopPropagation(), o({
                  visible: !0,
                  x: ae.clientX,
                  y: ae.clientY,
                  nodeId: e.id,
                  frame: U[re]
                });
              },
              children: [ye ? c.jsx("div", {
                className: "w-full aspect-video flex items-center justify-center bg-black",
                children: c.jsx(Ua, {
                  size: 16,
                  className: "animate-spin text-zinc-500"
                })
              }) : c.jsx("img", {
                src: Z.url,
                className: "w-full aspect-video object-contain bg-black",
                alt: `frame-${re}`,
                loading: "lazy"
              }), c.jsxs("div", {
                className: "absolute left-1 top-1 text-[10px] px-1 py-0.5 rounded bg-black/60 text-white",
                children: [Z.time.toFixed(2), "s"]
              }), c.jsx("div", {
                className: "absolute right-1 top-1 w-4 h-4 rounded-full border border-white/80 bg-black/40 flex items-center justify-center",
                children: fe ? c.jsx(RRr, {
                  size: 10,
                  className: "text-white"
                }) : null
              })]
            }, `${Z.url}-${re}`);
          })
        })]
      })]
    });
  },
  $yo = 160,
  Gyo = 52,
  Vyo = 63,
  Hyo = 40,
  Wyo = 300,
  qyo = 100,
  g0n = 50,
  Kyo = 12,
  JSt = 12,
  Qyo = 960,
  ZSt = 21.4,
  LW = 14,
  OW = 180,
  Yyo = 1.1;

function Xyo(e, t, n, r = $yo) {
  const a = Math.max(n, 1),
    i = Math.max(0, t);
  return {
    start: Math.max(0, (e - r) / a),
    end: (e + i + r) / a
  };
}

function Jyo(e, t, n, r) {
  return e < r && t > n;
}

function Zyo(e, t, n, r) {
  return e.filter(a => {
    const i = r(a);
    return Jyo(i.start, i.end, t, n);
  });
}

function ebo(e, t, n, r, a) {
  if (!(e > 0) || !(n > 0)) return [];
  const i = Math.max(0, Math.floor(r / n) * n),
    o = Math.min(e, Math.ceil(a / n) * n),
    s = [];
  for (let l = i; l <= o + 1e-6; l += n) {
    const d = l / e * 100;
    if (d > 100) break;
    s.push({
      time: l,
      pct: d,
      major: Math.abs(l / t - Math.round(l / t)) < 1e-6
    });
  }
  return s;
}

function tbo(e) {
  const t = e.tileWidth ?? Gyo,
    n = e.maxTiles ?? Vyo,
    r = Math.max(e.pixelsPerSecond, 1),
    a = Math.max(1, e.clipDuration * r),
    i = Math.max(0, (e.sourceStart ?? 0) * r),
    o = i + a,
    s = Math.max(0, (e.viewEnd - e.viewStart) * r),
    l = s > 0 ? Math.min(o, Math.max(a, 3 * s)) : o,
    d = Math.max(t, l / n),
    u = Math.max(1, Math.ceil(o / d)),
    h = i + (e.viewStart - e.clipStart) * r,
    p = i + (e.viewEnd - e.clipStart) * r,
    m = Math.max(0, h - s),
    f = Math.min(o, p + s),
    y = Math.max(0, Math.min(u, Math.floor(m / d))),
    b = Math.max(y, Math.min(u, Math.ceil(f / d)));
  return {
    startIndex: y,
    count: Math.max(0, b - y),
    tileCount: u,
    displayTileWidth: d,
    offsetPixels: i
  };
}

function nbo(e, t, n = Hyo, r = Wyo) {
  if (e < t.left + n) {
    const a = t.left + n - e;
    return -Math.min(r, a / Math.max(n, 1) * r);
  }
  if (e > t.right - n) {
    const a = e - (t.right - n);
    return Math.min(r, a / Math.max(n, 1) * r);
  }
  return 0;
}

function rbo(e) {
  return e === 1 ? .05 : e === 2 ? 1 : .006;
}

function abo(e, t, n = LW, r = OW, a = 0) {
  const i = Math.min(r, Math.max(n, e));
  return !Number.isFinite(t) || t === 0 ? i : Math.min(r, Math.max(n, i * 2 ** (-t * rbo(a))));
}

function e3t(e, t, n = LW, r = OW, a = Yyo) {
  const i = t === "in" ? a : 1 / a;
  return Math.min(r, Math.max(n, e * i));
}

function ibo(e, t, n, r = 24) {
  return e < t + r || e > t + n - r;
}

const Tk = 1,
  kvr = 1200,
  obo = 1,
  sbo = 5,
  y0n = 5;

function zJ(e, t, n) {
  return Math.min(n, Math.max(t, e));
}

function lbo(e) {
  const t = e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "PageDown",
    n = e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "PageUp";
  if (!t && !n) return null;
  const r = e.key === "PageUp" || e.key === "PageDown" || e.shiftKey;
  return (t ? -1 : 1) * (r ? sbo : obo);
}

function qD(e) {
  return Math.max(0, e.sourceEnd - e.sourceStart);
}

function BW(e) {
  return e.reduce((t, n) => t + qD(n), 0);
}

function V$e(e, t) {
  let n = 0;
  for (let r = 0; r < Math.max(0, t); r += 1) n += qD(e[r]);
  return n;
}

function CH(e, t) {
  if (e.length === 0) return null;
  const n = BW(e),
    r = Math.max(0, Math.min(t, Math.max(0, n - .001)));
  let a = 0;
  for (let i = 0; i < e.length; i += 1) {
    const o = e[i],
      s = qD(o);
    if (r < a + s || i === e.length - 1) return {
      clip: o,
      clipIndex: i,
      timelineStart: a,
      sourceTime: o.sourceStart + Math.max(0, r - a)
    };
    a += s;
  }
  return null;
}

function cbo(e, t, n) {
  const r = CH(e, t);
  if (!r) return null;
  const {
    clip: a,
    clipIndex: i,
    sourceTime: o
  } = r;
  if (o - a.sourceStart < Tk || a.sourceEnd - o < Tk) return null;
  const s = {
      ...a,
      sourceEnd: o
    },
    l = {
      ...a,
      id: n(),
      sourceStart: o
    };
  return {
    clips: [...e.slice(0, i), s, l, ...e.slice(i + 1)],
    activeClipId: l.id
  };
}

function dbo(e, t) {
  const n = e.findIndex(a => a.id === t);
  if (n < 0 || n >= e.length - 1) return null;
  const r = n + 1;
  return {
    clip: e[r],
    clipIndex: r,
    timelineTime: V$e(e, r)
  };
}

function ubo(e, t) {
  const n = CH(e, t);
  return n ? n.sourceTime - n.clip.sourceStart >= Tk && n.clip.sourceEnd - n.sourceTime >= Tk : !1;
}

function hbo(e, t) {
  const n = e.filter(i => i.id && (i.url || i.assetId || i.localFilePath) && Number.isFinite(i.duration) && i.duration > 0),
    r = new Map(n.map(i => [i.id, i])),
    a = t.filter(i => r.has(i.sourceId)).map(i => {
      const o = r.get(i.sourceId),
        s = Math.max(0, Math.min(i.sourceStart, o.duration)),
        l = Math.max(s, Math.min(i.sourceEnd, o.duration));
      return {
        ...i,
        sourceStart: s,
        sourceEnd: l
      };
    }).filter(i => qD(i) >= Tk);
  return {
    sources: n,
    clips: a
  };
}

function iM(e, t = !1) {
  const n = Math.max(0, Number.isFinite(e) ? e : 0),
    r = Math.floor(n / 60),
    a = Math.floor(n % 60),
    i = `${String(r).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
  return t ? `${i}.${Math.floor(n % 1 * 10)}` : i;
}

const b0n = 8,
  pbo = 12,
  v0n = .1;

function mbo(e) {
  const t = [];
  let n = 0;
  for (let r = 0; r < e.length; r += 1) {
    const a = e[r],
      i = qD(a);
    t.push({
      clip: a,
      clipIndex: r,
      start: n,
      duration: i
    }), n += i;
  }
  return t;
}

function fbo(e, t = {}) {
  const n = [];
  let r = 0;
  for (const a of e) {
    const i = qD(a);
    a.id !== t.excludeClipId && (n.push({
      time: r,
      kind: "clip-edge"
    }), n.push({
      time: r + i,
      kind: "clip-edge"
    })), r += i;
  }
  return t.playheadTime != null && Number.isFinite(t.playheadTime) && n.push({
    time: t.playheadTime,
    kind: "playhead"
  }), n.sort((a, i) => {
    const o = a.time - i.time;
    return o !== 0 ? o : a.kind === i.kind ? 0 : a.kind === "playhead" ? -1 : 1;
  }), n;
}

function gbo(e) {
  return Math.max(0, Math.round(e / v0n) * v0n);
}

function ybo(e) {
  const {
    time: t,
    targets: n,
    pixelsPerSecond: r,
    previous: a,
    precise: i
  } = e;
  if (i || !(r > 0)) return {
    time: t,
    snapped: !1,
    kind: null
  };
  if (a != null && a.snapped && a.kind != null && Math.abs(t - a.time) * r <= pbo) return {
    time: a.time,
    snapped: !0,
    kind: a.kind
  };
  let o = null,
    s = b0n;
  for (const l of n) {
    const d = Math.abs(l.time - t) * r;
    if (!(d > b0n)) {
      if (!o) {
        o = l, s = d;
        continue;
      }
      if (l.kind !== o.kind) {
        l.kind === "playhead" && (o = l, s = d);
        continue;
      }
      d < s && (o = l, s = d);
    }
  }
  return o ? {
    time: o.time,
    snapped: !0,
    kind: o.kind
  } : {
    time: gbo(t),
    snapped: !1,
    kind: null
  };
}

function bbo(e) {
  return Math.max(0, kvr - BW(e));
}

function u$t(e, t, n, r) {
  const a = Math.max(0, r);
  if (t === "start") {
    const o = zJ(n, 0, e.sourceEnd - Tk);
    return e.sourceEnd - o < Tk ? null : {
      ...e,
      sourceStart: o
    };
  }
  const i = zJ(n, e.sourceStart + Tk, a);
  return i - e.sourceStart < Tk ? null : {
    ...e,
    sourceEnd: i
  };
}

function vbo(e, t, n, r, a) {
  const i = e.findIndex(d => d.id === t);
  if (i < 0) return null;
  const o = e[i];
  if (n === "start" && (r < 0 || o.sourceEnd - r < Tk) || n === "end" && (r > a || r - o.sourceStart < Tk)) return null;
  const s = u$t(o, n, r, a);
  if (!s) return null;
  if (s.sourceStart === o.sourceStart && s.sourceEnd === o.sourceEnd) return e;
  const l = e.slice();
  return l[i] = s, l;
}

function Avr(e, t, n) {
  const r = e.findIndex(s => s.id === t);
  if (r < 0) return e;
  const a = zJ(n, 0, e.length);
  if (a === r || a === r + 1) return e;
  const i = e.slice(),
    [o] = i.splice(r, 1);
  return i.splice(a > r ? a - 1 : a, 0, o), i;
}

function wbo(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r += 1) {
    const a = qD(e[r]);
    if (t < n + a / 2) return r;
    n += a;
  }
  return e.length;
}

const xbo = [1, 2, 5];

function w0n(e, t, n, r) {
  const a = e > 0 ? e : 1;
  for (let i = 0; i < 8; i += 1) {
    const o = n * 10 ** i;
    for (const s of xbo) {
      const l = o * s;
      if (l * a >= t && ((r == null ? void 0 : r(l)) ?? !0)) return l;
    }
  }
  return n;
}

function _bo(e) {
  const t = Number.isFinite(e) && e > 0 ? e : 1,
    n = w0n(t, 48, 1),
    r = w0n(t, 12, .1, a => {
      const i = n / a;
      return Math.abs(i - Math.round(i)) < 1e-6;
    });
  return {
    labelStep: n,
    minorStep: r
  };
}

function kbo(e, t, n) {
  const r = n > 0 ? n : 1,
    a = Math.max(e, t, r);
  return Math.ceil(a / r) * r;
}

const Svr = ["mp4", "webm", "mov", "avi", "mkv", "flv", "ogg", "m4v"],
  timelineAudioExtensions = ["wav", "mp3", "m4a", "aac", "ogg", "oga", "flac", "opus"],
  x0n = "qdm-video-timeline-last-dir";

function _0n(e) {
  const t = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${e}-${t}`;
}

function Gct() {
  return typeof window < "u" && "__TAURI__" in window;
}

function k0n(e) {
  return e.split(/[/\\]/).pop() || "video.mp4";
}

function A0n(e, t = "") {
  var r;
  if (t) return t;
  const n = (r = e.split(".").pop()) == null ? void 0 : r.toLowerCase();
  const audioTypes = {wav: "audio/wav", mp3: "audio/mpeg", m4a: "audio/mp4", aac: "audio/aac", ogg: "audio/ogg", oga: "audio/ogg", flac: "audio/flac", opus: "audio/ogg"};
  return audioTypes[n] || (n === "webm" ? "video/webm" : n === "mov" ? "video/quicktime" : "video/mp4");
}

function Abo(e) {
  var n;
  const t = ((n = e.name.split(".").pop()) == null ? void 0 : n.toLowerCase()) || "";
  return e.type.startsWith("video/") || e.type.startsWith("audio/") || Svr.includes(t) || timelineAudioExtensions.includes(t);
}

function Sbo(e) {
  return new Promise((t, n) => {
    const r = document.createElement("video");
    let a = !1;
    const i = window.setTimeout(() => o(new Error("读取媒体信息超时")), 15e3),
      o = s => {
        if (a) return;
        if (a = !0, window.clearTimeout(i), r.onloadedmetadata = null, r.onerror = null, s) {
          r.removeAttribute("src"), r.load(), n(s);
          return;
        }
        const l = {
          duration: Number.isFinite(r.duration) ? r.duration : 0,
          width: r.videoWidth || 0,
          height: r.videoHeight || 0
        };
        r.removeAttribute("src"), r.load(), t(l);
      };
    r.preload = "metadata", r.muted = !0, r.playsInline = !0, r.onloadedmetadata = () => o(), r.onerror = () => {
      var s;
      return o(new Error(((s = r.error) == null ? void 0 : s.message) || "无法读取媒体"));
    }, r.src = e, r.load();
  });
}

function Ibo({
  node: e,
  updateNode: t,
  onSourceReady: n,
  hasSources: r
}) {
  const a = g.useRef(null),
    [i, o] = g.useState(!1),
    s = g.useCallback(async (p, m) => {
      try {
        const {
          assetStore: f
        } = await Ie(async () => {
          const {
            assetStore: v
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: v
          };
        }, void 0, import.meta.url);
        await f.init();
        const y = p.assetId || `video_timeline_${e.id}_${p.id}`;
        (await f.saveBlobAsset(y, m, `file://video-timeline/${encodeURIComponent(p.fileName)}`, "local", (Gct(), void 0))) && !r && t(e.id, {
          _contentAssetId: y,
          settings: {
            ...e.settings,
            _assetId: y
          }
        });
      } catch (f) {
        console.warn("[VideoTimeline] persist source failed:", f);
      }
    }, [r, e.id, e.settings, t]),
    l = g.useCallback(async (p, m, f) => {
      o(!0);
      const y = URL.createObjectURL(p);
      try {
        const b = await Sbo(y);
        if (b.duration <= 0) throw new Error("媒体时长无效");
        const v = {
            id: _0n("source"),
            url: y,
            fileName: m,
            kind: b.width > 0 && b.height > 0 ? "video" : "audio",
            duration: b.duration,
            width: b.width,
            height: b.height,
            assetId: `video_timeline_${e.id}_${_0n("asset")}`,
            localFilePath: f
          },
          _ = !r;
        _ && t(e.id, {
          content: y,
          videoFileName: m,
          videoMeta: {
            duration: b.duration,
            w: b.width,
            h: b.height
          },
          ...(f ? {
            _localFilePath: f
          } : {})
        }), n(v, _), s(v, p);
      } catch (b) {
        URL.revokeObjectURL(y);
        const v = b instanceof Error ? b.message : "媒体加载失败";
        Ai("error", v, 3e3);
      } finally {
        o(!1);
      }
    }, [r, e.id, n, s, t]),
    d = g.useCallback(async p => {
      if (!Abo(p)) {
        Ai("error", "不支持的音视频格式", 3e3);
        return;
      }
      const m = typeof p.path == "string" ? p.path : void 0;
      if (Gct() && m) try {
        const {
            readFileAsBlob: f
          } = await Ie(async () => {
            const {
              readFileAsBlob: v
            } = await Promise.resolve().then(() => hg);
            return {
              readFileAsBlob: v
            };
          }, void 0, import.meta.url),
          y = await f(m),
          b = y.type ? y : new Blob([y], {
            type: A0n(p.name, p.type)
          });
        await l(b, p.name || k0n(m), m);
        return;
      } catch (f) {
        console.warn("[VideoTimeline] local file read failed, using File object:", f);
      }
      await l(p, p.name, m);
    }, [l]),
    u = g.useCallback(async () => {
      var p, m;
      if (!Gct()) {
        (p = a.current) == null || p.click();
        return;
      }
      try {
        const {
            open: f
          } = await Ie(async () => {
            const {
              open: A
            } = await Promise.resolve().then(() => Sb);
            return {
              open: A
            };
          }, void 0, import.meta.url),
          y = await f({
            multiple: !1,
            directory: !1,
            title: "选择时间线音视频",
            defaultPath: localStorage.getItem(x0n) || void 0,
            filters: [{
              name: "音视频",
              extensions: [...new Set([...Svr, ...timelineAudioExtensions])]
            }]
          });
        if (!y || typeof y != "string") return;
        const b = y.replace(/[/\\][^/\\]+$/, "");
        b && b !== y && localStorage.setItem(x0n, b);
        const {
            readFileAsBlob: v
          } = await Ie(async () => {
            const {
              readFileAsBlob: A
            } = await Promise.resolve().then(() => hg);
            return {
              readFileAsBlob: A
            };
          }, void 0, import.meta.url),
          _ = await v(y),
          w = k0n(y),
          k = _.type ? _ : new Blob([_], {
            type: A0n(w)
          });
        await l(k, w, y);
      } catch (f) {
        console.warn("[VideoTimeline] choose video failed:", f), (m = a.current) == null || m.click();
      }
    }, [l]),
    h = g.useCallback(p => {
      var f;
      const m = (f = p.target.files) == null ? void 0 : f[0];
      p.target.value = "", m && d(m);
    }, [d]);
  return {
    inputRef: a,
    onFileChange: h,
    loading: i,
    chooseVideo: u,
    commitFile: d
  };
}

const Vct = 96,
  Hct = 64,
  Cbo = 32,
  Ebo = 3,
  Ivr = 12e3,
  Tbo = .02,
  t3t = new Map(),
  Wct = new Map();

let qct = 0;

const S0n = [];

async function Mbo(e) {
  var t;
  qct >= Ebo && (await new Promise(n => S0n.push(n))), qct += 1;
  try {
    return await e();
  } finally {
    qct -= 1, (t = S0n.shift()) == null || t();
  }
}

function n3t(e) {
  return `${e.id}|${e.previewUrl || e.url}|${e.duration}|${e.width}x${e.height}`;
}

function Pbo() {
  return new Promise(e => {
    var n;
    const t = (n = window.requestIdleCallback) == null ? void 0 : n.bind(window);
    if (typeof t == "function") {
      t(() => e(), {
        timeout: 700
      });
      return;
    }
    globalThis.setTimeout(e, 180);
  });
}

function Rbo(e, t) {
  return new Promise((n, r) => {
    if (!Number.isFinite(e.duration) || e.duration <= 0) {
      r(new Error("Failed to seek thumbnail source"));
      return;
    }
    const a = Math.max(0, Math.min(t, e.duration));
    if (Math.abs(e.currentTime - a) <= Tbo) {
      n();
      return;
    }
    let i = !1;
    const o = window.setTimeout(() => s(new Error("seek timeout")), Ivr),
      s = l => {
        i || (i = !0, window.clearTimeout(o), e.onseeked = null, e.onerror = null, l ? r(l) : n());
      };
    e.onseeked = () => s(), e.onerror = () => s(new Error("seek failed")), e.currentTime = a;
  });
}

async function I0n(e, t) {
  const n = document.createElement("video");
  n.preload = "metadata", n.muted = !0, n.playsInline = !0;
  const r = e.previewUrl || e.url;
  /^https?:/i.test(r) && (n.crossOrigin = "anonymous"), await new Promise((l, d) => {
    const u = window.setTimeout(() => d(new Error("metadata timeout")), Ivr);
    n.onloadedmetadata = () => {
      window.clearTimeout(u), l();
    }, n.onerror = () => {
      window.clearTimeout(u), d(new Error("metadata failed"));
    }, n.src = r, n.load();
  }), n.readyState < HTMLMediaElement.HAVE_CURRENT_DATA && (await new Promise((l, d) => {
    const u = window.setTimeout(() => d(new Error("first frame timeout")), 5e3);
    n.onloadeddata = () => {
      window.clearTimeout(u), n.onloadeddata = null, n.onerror = null, l();
    }, n.onerror = () => {
      window.clearTimeout(u), n.onloadeddata = null, n.onerror = null, d(new Error("first frame failed"));
    };
  }));
  const a = document.createElement("canvas");
  a.width = Vct, a.height = Hct;
  const i = a.getContext("2d");
  if (!i) return [];
  const o = Math.min(Cbo, Math.max(4, Math.ceil(e.duration / 1.2))),
    s = [];
  for (let l = 0; l < o && !t(); l += 1) {
    const d = Math.min(Math.max(0, e.duration - .001), l / Math.max(1, o - 1) * e.duration);
    await Rbo(n, d);
    const u = (n.videoWidth || 1) / (n.videoHeight || 1),
      h = Vct / Hct;
    let p = 0,
      m = 0,
      f = n.videoWidth,
      y = n.videoHeight;
    u > h ? (f = y * h, p = (n.videoWidth - f) / 2) : (y = f / h, m = (n.videoHeight - y) / 2), i.drawImage(n, p, m, f, y, 0, 0, Vct, Hct), s.push({
      time: d,
      url: a.toDataURL("image/jpeg", .68)
    }), await new Promise(b => window.requestAnimationFrame(() => b()));
  }
  return n.removeAttribute("src"), n.load(), s;
}

function Nbo(e) {
  const t = n3t(e),
    n = t3t.get(t);
  if (n) return Promise.resolve(n);
  const r = Wct.get(t);
  if (r) return r;
  const a = Mbo(async () => {
    await Pbo();
    try {
      return await I0n(e, () => !1);
    } catch (i) {
      if (!e.previewUrl || e.previewUrl === e.url) throw i;
      return I0n({
        ...e,
        previewUrl: void 0
      }, () => !1);
    }
  }).then(i => (i.length > 0 && t3t.set(t, i), i)).finally(() => Wct.delete(t));
  return Wct.set(t, a), a;
}

function jbo(e, t = !0) {
  const n = e.map(n3t).join(""),
    r = g.useMemo(() => {
      const l = {};
      for (const d of e) {
        const u = t3t.get(n3t(d));
        u && (l[d.id] = u);
      }
      return l;
    }, [n]),
    [a, i] = g.useState(r),
    [o, s] = g.useState([]);
  return g.useEffect(() => {
    let l = !1;
    if (i(r), !t) return s([]), () => {
      l = !0;
    };
    const d = e.filter(h => h.kind === "image" && h.url);
    d.length > 0 && i(h => {
      const p = {
        ...h
      };
      for (const m of d) p[m.id] = [{
        time: 0,
        url: m.posterUrl || m.url
      }];
      return p;
    });
    const u = e.filter(h => {
      var p;
      return h.kind !== "image" && h.kind !== "audio" && !((p = r[h.id]) != null && p.length);
    });
    return s(u.map(h => h.id)), (async () => await Promise.all(u.map(async h => {
      try {
        const p = await Nbo(h);
        !l && p.length > 0 && i(m => ({
          ...m,
          [h.id]: p
        }));
      } catch (p) {
        console.warn("[VideoTimeline] thumbnail generation skipped:", p);
      } finally {
        l || s(p => p.filter(m => m !== h.id));
      }
    })))(), () => {
      l = !0;
    };
  }, [n, r, t]), {
    thumbnails: a,
    generatingIds: o
  };
}

function C0n({
  videoRef: e,
  src: t,
  fallbackSrc: n,
  poster: r,
  aspectRatio: a,
  currentTime: i,
  duration: o,
  playing: s,
  muted: l,
  objectFit: d,
  mediaKind: u = "video",
  onLoadedMetadata: h,
  onTimeUpdate: p,
  onEnded: m,
  onTogglePlay: f,
  onToggleMuted: y,
  onFitToViewport: b,
  onClose: v,
  onToggleFullscreen: _,
  variant: w = "float"
}) {
  on();
  const k = g.useRef(null),
    [A, S] = g.useState(!1);
  g.useEffect(() => S(!1), [t]);
  const C = A && n ? n : t,
    I = u === "image",
    E = () => {
      var G;
      if (_) {
        _();
        return;
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
      }
      (G = k.current) == null || G.requestFullscreen();
    },
    M = I ? c.jsx("img", {
      className: "video-timeline-player__video",
      style: {
        objectFit: w === "workspace" ? "contain" : d
      },
      src: C,
      alt: "",
      draggable: !1,
      onClick: G => {
        G.stopPropagation(), f();
      }
    }) : u === "audio" ? c.jsxs("div", {
      className: "video-timeline-player__video",
      "data-media-kind": "audio",
      style: {display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "inherit", background: "var(--tls-panel, #17191d)"},
      onClick: G => {G.stopPropagation(), f();},
      children: [c.jsx("audio", {
        ref: e, src: C, muted: l, preload: "metadata",
        onLoadedMetadata: h, onTimeUpdate: p, onEnded: m,
        onError: () => {!A && n && n !== t && S(!0);}
      }), c.jsx(DY, {size: 44}), c.jsx("span", {children: x("音频预览")})]
    }) : c.jsx("video", {
      ref: e,
      className: "video-timeline-player__video",
      style: {
        objectFit: w === "workspace" ? "contain" : d
      },
      src: C,
      poster: r,
      muted: l,
      playsInline: !0,
      preload: "metadata",
      onLoadedMetadata: h,
      onTimeUpdate: p,
      onEnded: m,
      onError: () => {
        !A && n && n !== t && S(!0);
      },
      onClick: G => {
        G.stopPropagation(), f();
      }
    }),
    T = a > 0 ? a : 16 / 9,
    P = 16 / 9,
    R = T >= P ? {
      width: "100%",
      height: `${P / T * 100}%`
    } : {
      height: "100%",
      width: `${T / P * 100}%`
    },
    j = w === "workspace" ? iM(i) : iM(i, !0),
    B = iM(w === "workspace" ? Math.round(o) : o),
    F = c.jsxs(c.Fragment, {
      children: [c.jsx("button", {
        type: "button",
        className: "video-timeline-player__icon",
        "aria-label": x(s ? "暂停" : "播放"),
        onClick: f,
        children: s ? c.jsx(d3, {
          size: w === "workspace" ? 24 : 16,
          fill: "currentColor"
        }) : c.jsx(Ol, {
          size: w === "workspace" ? 24 : 16,
          fill: "currentColor"
        })
      }), c.jsxs("span", {
        className: "video-timeline-player__time",
        children: [c.jsx("strong", {
          children: j
        }), c.jsxs("span", {
          children: [" / ", B]
        })]
      })]
    }),
    N = c.jsxs("div", {
      className: "video-timeline-player__controls",
      children: [w === "workspace" ? c.jsx("span", {
        className: "video-timeline-player__transport",
        children: F
      }) : F, w === "workspace" ? c.jsxs("span", {
        className: "video-timeline-player__trail",
        children: [c.jsx("button", {
          type: "button",
          className: "video-timeline-player__icon",
          "aria-label": x(l ? "取消静音" : "静音"),
          onClick: y,
          children: l ? c.jsx(DY, {
            size: 15
          }) : c.jsx(B5, {
            size: 15
          })
        }), c.jsx("button", {
          type: "button",
          className: "video-timeline-player__icon",
          "aria-label": x("全屏"),
          title: x("全屏"),
          onClick: E,
          children: c.jsx(Wm, {
            size: 15
          })
        })]
      }) : c.jsxs(c.Fragment, {
        children: [c.jsx("span", {
          className: "video-timeline-player__spacer"
        }), c.jsx("button", {
          type: "button",
          className: "video-timeline-player__icon",
          "aria-label": x("放大工作区到当前剪辑时间线"),
          title: x("放大工作区到当前剪辑时间线"),
          onClick: b,
          children: c.jsx(Xle, {
            size: 15
          })
        }), c.jsx("button", {
          type: "button",
          className: "video-timeline-player__icon",
          "aria-label": x("全屏"),
          title: x("全屏"),
          onClick: E,
          children: c.jsx(Wm, {
            size: 15
          })
        })]
      })]
    });
  return c.jsx("div", {
    ref: k,
    className: `video-timeline-player nowheel nopan ${w === "workspace" ? "is-workspace nodrag" : ""}`,
    "data-video-timeline-interactive": w === "workspace" ? !0 : void 0,
    style: w === "workspace" ? void 0 : {
      aspectRatio: String(a > 0 ? a : 16 / 9)
    },
    onDoubleClick: G => {
      G.preventDefault(), G.stopPropagation(), w === "workspace" ? E() : b();
    },
    onMouseDown: G => {
      (w === "workspace" || G.target.closest("button")) && G.stopPropagation();
    },
    children: w === "workspace" ? c.jsxs(c.Fragment, {
      children: [c.jsx("div", {
        className: "video-timeline-player__letterbox",
        children: c.jsx("div", {
          className: "video-timeline-player__stage",
          style: R,
          children: M
        })
      }), N]
    }) : c.jsxs(c.Fragment, {
      children: [M, c.jsx("div", {
        className: "video-timeline-player__shade"
      }), c.jsx("button", {
        type: "button",
        className: "video-timeline-player__icon video-timeline-player__mute",
        "aria-label": x(l ? "取消静音" : "静音"),
        title: x(l ? "取消静音" : "静音"),
        onClick: y,
        children: l ? c.jsx(DY, {
          size: 15
        }) : c.jsx(B5, {
          size: 15
        })
      }), c.jsx("button", {
        type: "button",
        className: "video-timeline-player__icon video-timeline-player__close",
        "aria-label": x("关闭"),
        title: x("关闭"),
        onClick: v,
        children: c.jsx(Na, {
          size: 16
        })
      }), N]
    })
  });
}

function Dbo(e, t, n) {
  return !(t > 0) || !(n > 0) ? e : e * (n / t);
}

function Lbo(e, t) {
  const n = e.getBoundingClientRect(),
    r = e.offsetWidth;
  return !(n.width > 0) || !(r > 0) ? 1 : n.width / r;
}

function r3t(e, t) {
  const n = e.getBoundingClientRect();
  return Dbo(t - n.left, n.width, e.offsetWidth);
}

function Obo({
  worldRef: e,
  viewportRef: t,
  clips: n,
  sourceDurations: r,
  pixelsPerSecond: a,
  playheadTime: i,
  precise: o,
  onSeek: s,
  onScrubStart: l,
  onScrub: d,
  onSelectClip: u,
  onHoverTime: h,
  onTrimCommit: p,
  onReorderCommit: m
}) {
  const [f, y] = g.useState(null),
    [b, v] = g.useState(null),
    [_, w] = g.useState(null),
    [k, A] = g.useState(null),
    [S, C] = g.useState(null),
    I = g.useRef(null),
    E = g.useRef(null),
    M = g.useRef(0),
    T = g.useRef(0),
    P = g.useRef(null),
    R = g.useRef(null),
    j = g.useRef(null),
    B = g.useRef(0),
    F = g.useRef(!1),
    N = g.useRef({
      lastTs: 0,
      edgeSince: 0
    }),
    G = g.useRef(n),
    z = g.useRef(o),
    V = g.useRef(a),
    O = g.useRef(i),
    L = g.useRef(!1);
  G.current = n, z.current = o, V.current = a, O.current = i;
  const D = g.useCallback(() => {
      var q, ne;
      M.current = 0, y(P.current), v(R.current), w((q = j.current) != null && q.snapped ? j.current.time : null), A((ne = j.current) != null && ne.snapped ? j.current.kind : null);
    }, []),
    U = g.useCallback(() => {
      M.current === 0 && (M.current = window.requestAnimationFrame(D));
    }, [D]),
    H = g.useCallback(q => {
      const ne = e.current;
      if (!ne) return 0;
      const de = G.current.reduce((J, pe) => J + qD(pe), 0),
        le = r3t(ne, q);
      return Math.max(0, Math.min(de, le / V.current));
    }, [e]),
    Y = g.useCallback((q, ne = F.current) => {
      const de = I.current;
      if (!de || L.current) return;
      F.current = ne;
      const le = G.current,
        J = H(q),
        pe = ybo({
          time: J,
          targets: fbo(le, {
            excludeClipId: de.kind === "seek" ? void 0 : de.clipId,
            playheadTime: de.kind === "seek" ? void 0 : O.current
          }),
          pixelsPerSecond: V.current,
          previous: j.current,
          precise: z.current || ne
        }),
        ce = pe.time;
      if (j.current = pe, de.kind === "seek") {
        (d ?? s)(ce), U();
        return;
      }
      if ((de.kind === "start" || de.kind === "end") && de.clipId && de.clipIndex != null) {
        const we = le[de.clipIndex];
        if (!we) return;
        const X = we.sourceStart + (ce - V$e(le, de.clipIndex)),
          Z = u$t(we, de.kind, X, r.get(we.sourceId) ?? we.sourceEnd);
        if (!Z) return;
        const re = le.slice();
        re[de.clipIndex] = Z, P.current = re, (d ?? s)(ce), U();
        return;
      }
      de.kind === "reorder" && de.clipId && (R.current = wbo(le, ce), P.current = Avr(le, de.clipId, R.current), U());
    }, [d, s, U, r, H]),
    K = g.useCallback(() => {
      T.current !== 0 && (window.cancelAnimationFrame(T.current), T.current = 0);
    }, []),
    W = g.useCallback((q, ne, de, le) => {
      if (q.button !== 0) return;
      q.preventDefault(), q.stopPropagation();
      const J = q.currentTarget;
      if (ne !== "seek") {
        try {
          J.setPointerCapture(q.pointerId);
        } catch {}
        E.current = J;
      } else E.current = null;
      L.current = !1, B.current = q.clientX, F.current = q.shiftKey, N.current = {
        lastTs: 0,
        edgeSince: 0
      }, I.current = {
        kind: ne,
        pointerId: q.pointerId,
        startX: q.clientX,
        startY: q.clientY,
        clipId: de == null ? void 0 : de.id,
        clipIndex: le,
        moved: !1
      }, P.current = null, R.current = null, j.current = null, C(ne), h(null), de && u(de.id), ne === "seek" ? (l == null || l(), (d ?? s)(H(q.clientX), !0)) : ne === "reorder" && s(H(q.clientX), !0);
      const pe = ce => {
        if (!I.current || L.current) {
          T.current = 0;
          return;
        }
        const we = I.current,
          X = t.current,
          Z = X ? nbo(B.current, X.getBoundingClientRect()) : 0,
          re = N.current;
        if (Z === 0) re.edgeSince = 0, re.lastTs = ce;else {
          re.edgeSince || (re.edgeSince = ce);
          const fe = re.lastTs ? Math.min(.05, (ce - re.lastTs) / 1e3) : 0;
          re.lastTs = ce, we.moved && ce - re.edgeSince >= qyo && fe > 0 && X && (X.scrollLeft += Z * fe, Y(B.current, F.current));
        }
        T.current = window.requestAnimationFrame(pe);
      };
      K(), T.current = window.requestAnimationFrame(pe);
    }, [Y, h, d, l, s, u, K, H]),
    Q = g.useCallback(() => {
      if (M.current !== 0 && (window.cancelAnimationFrame(M.current), M.current = 0), K(), E.current && I.current) try {
        E.current.releasePointerCapture(I.current.pointerId);
      } catch {}
      I.current = null, E.current = null, P.current = null, R.current = null, j.current = null, L.current = !1, N.current = {
        lastTs: 0,
        edgeSince: 0
      }, y(null), v(null), w(null), A(null), C(null);
    }, [K]);
  return g.useEffect(() => {
    const q = le => {
        const J = I.current;
        !J || J.pointerId !== le.pointerId || L.current || (B.current = le.clientX, F.current = le.shiftKey, (Math.abs(le.clientX - J.startX) >= y0n || Math.abs(le.clientY - J.startY) >= y0n) && (J.moved = !0, J.kind === "seek" && J.clipId != null && (J.kind = "reorder", C("reorder"))), Y(le.clientX, le.shiftKey));
      },
      ne = le => {
        const J = I.current;
        if (!J || J.pointerId !== le.pointerId) return;
        if (L.current) {
          Q();
          return;
        }
        M.current !== 0 && (window.cancelAnimationFrame(M.current), M.current = 0), K();
        const pe = !J.moved,
          ce = H(le.clientX);
        if (pe || J.kind === "seek") s(ce, !0);else if ((J.kind === "start" || J.kind === "end") && J.clipId && P.current) {
          const we = P.current.find(X => X.id === J.clipId);
          we && p(we.id, J.kind, J.kind === "start" ? we.sourceStart : we.sourceEnd);
        } else J.kind === "reorder" && J.clipId && R.current != null && m(J.clipId, R.current);
        Q();
      },
      de = le => {
        le.key !== "Escape" || !I.current || (le.preventDefault(), L.current = !0, Q());
      };
    return document.addEventListener("pointermove", q), document.addEventListener("pointerup", ne), document.addEventListener("pointercancel", ne), document.addEventListener("keydown", de), () => {
      M.current !== 0 && window.cancelAnimationFrame(M.current), M.current = 0, K(), document.removeEventListener("pointermove", q), document.removeEventListener("pointerup", ne), document.removeEventListener("pointercancel", ne), document.removeEventListener("keydown", de);
    };
  }, [Y, m, s, p, Q, K, H]), {
    displayClips: f ?? n,
    insertIndex: b,
    snappedTime: _,
    snapKind: k,
    dragging: S,
    timeFromClientX: H,
    beginSeek: (q, ne, de) => W(q, "seek", ne, de),
    beginTrim: (q, ne, de, le) => W(q, le, ne, de)
  };
}

const Bbo = new Set(["video-input", "gen-video", "preview", "motion-control"]);

function E0n() {
  return `source-${typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
}

function Xw(e, t) {
  var r;
  const n = (r = e.settings) == null ? void 0 : r[t];
  return typeof n == "string" ? n.trim() : "";
}

function hwe(e) {
  var a, i;
  if (e.type === "gen-video") {
    const o = P0(e),
      s = Xl(e);
    if (o) return {
      url: o,
      assetId: s == null ? void 0 : s.assetId
    };
    if (s != null && s.url) return s;
  }
  const n = ((i = [e.selectedPreviewVideo, (a = e.previewMjVideos) == null ? void 0 : a[0], e.content, Xw(e, "selectedPreviewVideo"), Xw(e, "videoUrl"), Xw(e, "generatedVideoUrl"), Xw(e, "outputUrl"), Xw(e, "_ossRemoteUrl"), Xw(e, "_blobUrl")].find(o => typeof o == "string" && o.trim())) == null ? void 0 : i.trim()) || "";
  if (!n) return null;
  const r = e._selectedVideoAssetId || e._contentAssetId || Xw(e, "_contentAssetId") || Xw(e, "_assetId") || void 0;
  return {
    url: n,
    assetId: r
  };
}

const a3t = "application/x-qdm-timeline-asset",
  Cvr = 3;

function h$t(e) {
  var t, n, r, a;
  if (Xw(e, "mediaType") === "video") return null;
  if (e.type === "gen-image") {
    const i = Xl(e),
      o = (i == null ? void 0 : i.url) || e.content || e.thumbnailUrl || "";
    return o ? {
      url: o,
      assetId: i == null ? void 0 : i.assetId,
      posterUrl: e.thumbnailUrl || o,
      width: (t = e.videoMeta) == null ? void 0 : t.w,
      height: (n = e.videoMeta) == null ? void 0 : n.h
    } : null;
  }
  if (e.type === "input-image" || e.type === "preview" && e.previewType !== "video") {
    const i = e.content || e.thumbnailUrl || Xw(e, "outputUrl") || "";
    return !i || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(i) ? null : {
      url: i,
      assetId: e._contentAssetId || Xw(e, "_assetId") || void 0,
      posterUrl: e.thumbnailUrl || i,
      width: (r = e.videoMeta) == null ? void 0 : r.w,
      height: (a = e.videoMeta) == null ? void 0 : a.h
    };
  }
  return null;
}

function Fbo(e, t) {
  return e.id === t || e.type === "video-timeline" ? !1 : !!h$t(e);
}

function Evr(e, t) {
  var n;
  return e.id === t || e.type === "video-timeline" ? !1 : e.type === "input-image" ? Xw(e, "mediaType") === "video" && !!hwe(e) : e.type === "preview" ? (e.previewType === "video" || !!(e.selectedPreviewVideo || (n = e.previewMjVideos) != null && n.length)) && !!hwe(e) : Bbo.has(e.type) && !!hwe(e);
}

function zbo(e) {
  return new Promise((t, n) => {
    const r = document.createElement("video");
    let a = !1;
    const i = s => {
        if (a) return;
        a = !0, globalThis.clearTimeout(o), r.onloadedmetadata = null, r.onerror = null;
        const l = {
          duration: Number.isFinite(r.duration) ? r.duration : 0,
          width: r.videoWidth || 0,
          height: r.videoHeight || 0
        };
        r.removeAttribute("src"), r.load(), s ? n(s) : t(l);
      },
      o = globalThis.setTimeout(() => i(new Error("读取视频信息超时")), 1e4);
    r.preload = "metadata", r.muted = !0, r.playsInline = !0, r.onloadedmetadata = () => i(), r.onerror = () => i(new Error("无法读取视频")), r.src = e, r.load();
  });
}

function Tvr(e, t) {
  return e.flatMap(n => {
    var r;
    if (Evr(n, t)) return [{
      nodeId: n.id,
      name: n.videoFileName || n.nodeName || "画布视频",
      posterUrl: n.videoPosterUrl || n.thumbnailUrl || void 0,
      duration: (r = n.videoMeta) == null ? void 0 : r.duration,
      kind: "video"
    }];
    if (Fbo(n, t)) {
      const a = h$t(n);
      return [{
        nodeId: n.id,
        name: n.nodeName || "画布图片",
        posterUrl: (a == null ? void 0 : a.posterUrl) || (a == null ? void 0 : a.url),
        duration: Cvr,
        kind: "image"
      }];
    }
    return [];
  });
}

async function p$t(e, t) {
  const n = h$t(e);
  if (n && !hwe(e)) return {
    id: E0n(),
    kind: "image",
    url: n.url,
    posterUrl: n.posterUrl || n.url,
    fileName: e.nodeName || "image.png",
    duration: Cvr,
    width: n.width || 1024,
    height: n.height || 1024,
    assetId: n.assetId,
    sourceNodeId: e.id,
    localFilePath: typeof e._localFilePath == "string" && e._localFilePath.trim() ? e._localFilePath : Xw(e, "_localFilePath") || void 0
  };
  const r = hwe(e);
  if (!r) throw new Error("这个节点暂时没有可用的视频");
  const a = t == null ? void 0 : t.querySelector("video"),
    o = (a == null ? void 0 : a.currentSrc) || (a == null ? void 0 : a.src) || "" || iZ(r.url, r.url, e),
    s = e.videoMeta,
    l = a && Number.isFinite(a.duration) ? a.duration : 0;
  let d = (s == null ? void 0 : s.duration) || l || 0,
    u = (s == null ? void 0 : s.w) || (a == null ? void 0 : a.videoWidth) || 0,
    h = (s == null ? void 0 : s.h) || (a == null ? void 0 : a.videoHeight) || 0;
  if (d <= 0 || u <= 0 || h <= 0) {
    const f = await zbo(o || r.url);
    d = d || f.duration, u = u || f.width, h = h || f.height;
  }
  if (d <= 0) throw new Error("视频时长无效");
  const p = (a == null ? void 0 : a.poster) || e.videoPosterUrl || e.thumbnailUrl || Xw(e, "videoPosterUrl") || Xw(e, "thumbnailUrl") || void 0,
    m = e.videoFileName || e.nodeName || "画布视频";
  return {
    id: E0n(),
    url: r.url,
    previewUrl: o && o !== r.url ? o : void 0,
    posterUrl: p,
    fileName: /\.[a-z0-9]{2,5}$/i.test(m) ? m : `${m}.mp4`,
    duration: d,
    width: u,
    height: h,
    assetId: r.assetId,
    sourceNodeId: e.id,
    localFilePath: typeof e._localFilePath == "string" && e._localFilePath.trim() ? e._localFilePath : Xw(e, "_localFilePath") || void 0
  };
}

function Ubo({
  targetNodeId: e,
  nodes: t,
  onCancel: n,
  onPick: r
}) {
  on();
  const [a, i] = g.useState(!1),
    o = g.useRef(!1),
    s = g.useMemo(() => new Map(t.map(d => [d.id, d])), [t]),
    l = g.useMemo(() => new Set(t.filter(d => Evr(d, e)).map(d => d.id)), [t, e]);
  return g.useEffect(() => {
    var b;
    const d = document.body;
    d.classList.add("video-timeline-canvas-pick-active");
    const u = Array.from(document.querySelectorAll(".node-wrapper[data-node-id]"));
    for (const v of u) {
      const _ = v.dataset.nodeId || "";
      _ === e && (v.dataset.videoTimelinePickTarget = "true"), l.has(_) && (v.dataset.videoTimelinePickEligible = "true", v.dataset.videoTimelinePickName = ((b = s.get(_)) == null ? void 0 : b.nodeName) || "Video");
    }
    const h = () => {
        var v;
        (v = document.querySelector('[data-video-timeline-pick-hover="true"]')) == null || v.removeAttribute("data-video-timeline-pick-hover");
      },
      p = v => {
        const _ = v.target instanceof Element ? v.target : null,
          w = _ == null ? void 0 : _.closest('[data-video-timeline-pick-eligible="true"]');
        h(), w && (w.dataset.videoTimelinePickHover = "true");
      },
      m = v => {
        if (v.button !== 0 || o.current) return;
        const _ = v.target instanceof Element ? v.target : null,
          w = _ == null ? void 0 : _.closest(".node-wrapper[data-node-id]");
        if (!w) return;
        const k = w.dataset.nodeId || "";
        if (!l.has(k)) {
          v.preventDefault(), v.stopImmediatePropagation();
          return;
        }
        v.preventDefault(), v.stopImmediatePropagation();
        const A = v.clientX,
          S = v.clientY,
          C = v.pointerId,
          I = async E => {
            if (window.removeEventListener("pointerup", I, !0), E.pointerId !== C || (E.preventDefault(), E.stopImmediatePropagation(), Math.hypot(E.clientX - A, E.clientY - S) > 4)) return;
            const M = s.get(k);
            if (M) {
              o.current = !0, i(!0);
              try {
                const T = await p$t(M, w);
                r(T);
              } catch (T) {
                Ai("error", T instanceof Error ? T.message : "无法添加这个视频", 2600), o.current = !1, i(!1);
              }
            }
          };
        window.addEventListener("pointerup", I, !0);
      },
      f = v => {
        const _ = v.target instanceof Element ? v.target : null;
        _ != null && _.closest(".node-wrapper[data-node-id]") && (v.preventDefault(), v.stopImmediatePropagation());
      },
      y = v => {
        v.key === "Escape" && (v.preventDefault(), v.stopPropagation(), n());
      };
    return document.addEventListener("pointerover", p, !0), document.addEventListener("pointerdown", m, !0), document.addEventListener("click", f, !0), window.addEventListener("keydown", y, !0), () => {
      d.classList.remove("video-timeline-canvas-pick-active"), document.removeEventListener("pointerover", p, !0), document.removeEventListener("pointerdown", m, !0), document.removeEventListener("click", f, !0), window.removeEventListener("keydown", y, !0);
      for (const v of u) v.removeAttribute("data-video-timeline-pick-target"), v.removeAttribute("data-video-timeline-pick-eligible"), v.removeAttribute("data-video-timeline-pick-name"), v.removeAttribute("data-video-timeline-pick-hover");
    };
  }, [l, s, n, r, e]), Da.createPortal(c.jsxs("div", {
    className: "video-timeline-canvas-pick-banner",
    role: "status",
    children: [c.jsx("span", {
      children: x(a ? "正在添加视频…" : "选择以添加到剪辑时间线")
    }), c.jsx("button", {
      type: "button",
      onClick: n,
      disabled: a,
      children: x("退出")
    })]
  }), document.body);
}

const $bo = 60,
  Gbo = 64,
  Vbo = 960;

function Hbo(e, t) {
  let n,
    r = Number.POSITIVE_INFINITY;
  for (const a of e) {
    const i = Math.abs(a.time - t);
    i < r && (n = a, r = i);
  }
  return n;
}

function T0n({
  clips: e,
  sources: t,
  thumbnails: n,
  generatingIds: r = [],
  activeClipId: a,
  currentTime: i,
  pixelsPerSecond: o,
  precise: s = !1,
  playing: l = !1,
  interactive: d = !0,
  fallbackPoster: u,
  onSeek: h,
  onScrubStart: p,
  onScrub: m,
  onHoverTime: f,
  onSelectClip: y,
  onZoom: b,
  onTrimClip: v,
  onReorderClips: _,
  onDeleteClip: w,
  onAddSource: k,
  density: A = "node",
  onDropAsset: S,
  zoomMin: C = 12,
  zoomMax: I = 960
}) {
  var he;
  on();
  const E = g.useRef(null),
    M = g.useRef(null),
    T = g.useRef(null),
    P = g.useRef(o),
    R = g.useRef(b),
    j = g.useRef(C),
    B = g.useRef(I),
    F = g.useRef(0),
    N = g.useRef(0),
    G = g.useRef(null),
    [z, V] = g.useState(null),
    [O, L] = g.useState({
      start: 0,
      end: 0
    });
  g.useEffect(() => {
    P.current = o;
  }, [o]), g.useEffect(() => {
    R.current = b;
  }, [b]), g.useEffect(() => {
    j.current = C;
  }, [C]), g.useEffect(() => {
    B.current = I;
  }, [I]), g.useEffect(() => {
    const ue = E.current;
    if (!ue) return;
    let ge = 0;
    const _e = () => {
        ge = 0;
        const Te = Xyo(ue.scrollLeft, ue.clientWidth, P.current);
        L(Ne => Math.abs(Ne.start - Te.start) < .02 && Math.abs(Ne.end - Te.end) < .02 ? Ne : Te);
      },
      ke = () => {
        ge === 0 && (ge = window.requestAnimationFrame(_e));
      };
    ue.addEventListener("scroll", ke, {
      passive: !0
    });
    const ve = new ResizeObserver(ke);
    return ve.observe(ue), ke(), () => {
      ge !== 0 && window.cancelAnimationFrame(ge), ue.removeEventListener("scroll", ke), ve.disconnect();
    };
  }, [o]), g.useEffect(() => {
    const ue = E.current;
    if (!ue) return;
    const ge = _e => {
      var Te, Ne;
      _e.preventDefault(), _e.stopPropagation();
      const ke = Lbo(ue),
        ve = r3t(ue, _e.clientX);
      if (_e.ctrlKey || _e.metaKey) {
        const me = ((Te = G.current) == null ? void 0 : Te.origin) ?? P.current,
          Ae = abo(((Ne = G.current) == null ? void 0 : Ne.next) ?? me, _e.deltaY, j.current, B.current, _e.deltaMode);
        if (G.current = {
          next: Ae,
          origin: me,
          cursorX: ve
        }, N.current !== 0) return;
        N.current = window.requestAnimationFrame(() => {
          N.current = 0;
          const Fe = G.current;
          if (G.current = null, !Fe) return;
          P.current = Fe.next, R.current(Fe.next);
          const Me = (ue.scrollLeft + Fe.cursorX) / Fe.origin;
          ue.scrollLeft = Math.max(0, Me * Fe.next - Fe.cursorX);
        });
        return;
      }
      ue.scrollLeft += (_e.deltaX + _e.deltaY) / Math.max(ke, 1e-4);
    };
    return ue.addEventListener("wheel", ge, {
      passive: !1,
      capture: !0
    }), () => {
      N.current !== 0 && window.cancelAnimationFrame(N.current), N.current = 0, ue.removeEventListener("wheel", ge, {
        capture: !0
      });
    };
  }, []);
  const D = g.useMemo(() => new Map(t.map(ue => [ue.id, ue])), [t]),
    U = g.useMemo(() => new Map(t.map(ue => [ue.id, ue.duration])), [t]),
    H = g.useMemo(() => new Set(r), [r]),
    Y = BW(e),
    K = A === "workspace",
    W = K ? Gbo / Math.max(o, 1) : 0,
    Q = g.useMemo(() => _bo(o), [o]),
    q = K ? kbo(Y + W, Math.max(O.end, Vbo / Math.max(o, 1)), Q.labelStep) : Math.max($bo, Y),
    ne = Math.max(1, q * o),
    de = g.useMemo(() => ebo(q, Q.labelStep, Q.minorStep, O.start, O.end), [q, Q.labelStep, Q.minorStep, O.end, O.start]),
    {
      displayClips: le,
      insertIndex: J,
      snappedTime: pe,
      snapKind: ce,
      dragging: we,
      beginSeek: X,
      beginTrim: Z
    } = Obo({
      worldRef: M,
      viewportRef: E,
      clips: e,
      sourceDurations: U,
      pixelsPerSecond: o,
      playheadTime: i,
      precise: s,
      onSeek: h,
      onScrubStart: p,
      onScrub: ue => {
        T.current && (T.current.style.transform = `translate3d(${Math.max(0, ue) * o}px,0,0)`), m == null || m(ue);
      },
      onSelectClip: y,
      onHoverTime: f,
      onTrimCommit: v,
      onReorderCommit: _
    }),
    re = g.useMemo(() => mbo(le), [le]),
    fe = g.useMemo(() => O.end <= 0 ? re : Zyo(re, O.start, O.end, ue => ({
      start: ue.start,
      end: ue.start + ue.duration
    })), [re, O.end, O.start]);
  g.useEffect(() => {
    if (!l || we) return;
    const ue = E.current;
    if (!ue) return;
    const ge = i * o;
    ibo(ge, ue.scrollLeft, ue.clientWidth) && (ue.scrollLeft = Math.max(0, ge - ue.clientWidth * .35));
  }, [i, we, o, l]);
  const ye = ue => {
      if (Y <= 0 || we || !d) return null;
      const ge = M.current;
      if (!ge) return null;
      const _e = r3t(ge, ue);
      return _e < 0 ? null : Math.max(0, Math.min(Y - .001, _e / o));
    },
    ie = ue => {
      if (F.current !== 0) {
        ie.pending = ue;
        return;
      }
      F.current = window.requestAnimationFrame(() => {
        F.current = 0;
        const ge = ie.pending ?? ue;
        ie.pending = void 0, V(ge), f(ge);
      }), ie.pending = ue;
    },
    ae = Math.min(Y, i) * o,
    be = z != null ? z * o : null,
    Ee = pe != null ? pe * o : null,
    xe = J != null ? (((he = re[J]) == null ? void 0 : he.start) ?? Y) * o : null;
  return c.jsx("div", {
    ref: E,
    className: `video-timeline-track__viewport nowheel ${A === "workspace" ? "is-workspace" : ""}`,
    "data-timeline-track-canvas": "true",
    onDragOver: ue => {
      !S || !ue.dataTransfer.types.includes(a3t) || (ue.preventDefault(), ue.dataTransfer.dropEffect = "copy", ue.currentTarget.setAttribute("data-asset-drop-active", "true"));
    },
    onDragLeave: ue => {
      ue.currentTarget.contains(ue.relatedTarget) || ue.currentTarget.removeAttribute("data-asset-drop-active");
    },
    onDrop: ue => {
      ue.currentTarget.removeAttribute("data-asset-drop-active");
      const ge = ue.dataTransfer.getData(a3t);
      !ge || !S || (ue.preventDefault(), S(ge));
    },
    children: c.jsxs("div", {
      ref: M,
      className: "video-timeline-track__world",
      style: {
        width: ne,
        minWidth: "100%"
      },
      onPointerDown: ue => {
        ue.target.closest(".video-timeline-clip, .video-timeline-add, .video-timeline-clip__trim, .video-timeline-ruler") || (V(null), f(null), d && K && X(ue));
      },
      onPointerMove: ue => {
        ie(ye(ue.clientX));
      },
      onPointerLeave: () => {
        we || (F.current !== 0 && (window.cancelAnimationFrame(F.current), F.current = 0), V(null), f(null));
      },
      children: [c.jsxs("div", {
        className: "video-timeline-ruler",
        "data-video-timeline-interactive": !0,
        "data-timeline-track-interaction-zone": "true",
        "aria-hidden": !0,
        onPointerDown: ue => X(ue),
        children: [c.jsx("span", {
          className: "video-timeline-ruler__extend"
        }), de.map(ue => c.jsx("span", {
          className: `video-timeline-ruler__tick ${ue.major ? "is-major" : ""}`,
          style: {
            left: K ? `${ue.time * o}px` : `${ue.pct}%`
          },
          children: ue.major ? c.jsx("span", {
            className: "video-timeline-ruler__label",
            children: iM(ue.time)
          }) : null
        }, ue.time))]
      }), c.jsxs("div", {
        className: "video-timeline-clips",
        children: [fe.map(({
          clip: ue,
          clipIndex: ge,
          start: _e,
          duration: ke
        }) => {
          var Xe;
          const ve = D.get(ue.sourceId),
            Te = a === ue.id,
            Ne = q > 0 ? ke / q * 100 : 0,
            me = q > 0 ? _e / q * 100 : 0,
            Ae = n[ue.sourceId] || [],
            Fe = A === "workspace" ? 56 : 48,
            Me = ve && ve.width > 0 && ve.height > 0 ? ve.width / ve.height : 16 / 9,
            Re = (ve == null ? void 0 : ve.kind) !== "image",
            $e = tbo({
              clipStart: _e,
              clipDuration: ke,
              sourceStart: Re ? ue.sourceStart : 0,
              viewStart: O.start,
              viewEnd: O.end,
              pixelsPerSecond: o,
              tileWidth: Fe * Me
            }),
            rt = H.has(ue.sourceId),
            nt = ((Xe = Ae[0]) == null ? void 0 : Xe.url) || (ve == null ? void 0 : ve.posterUrl) || u,
            ze = Te && (we === "start" || we === "end"),
            Le = Te && we === "reorder",
            Ke = (De, Ye) => {
              if (De.key !== "ArrowLeft" && De.key !== "ArrowRight" || (De.preventDefault(), De.stopPropagation(), De.repeat)) return;
              const Ce = De.key === "ArrowLeft" ? -.1 : .1;
              v(ue.id, Ye, (Ye === "start" ? ue.sourceStart : ue.sourceEnd) + Ce);
            };
          return c.jsxs("div", {
            className: ["video-timeline-clip", A === "workspace" ? "is-workspace" : "is-node", Te ? "is-active" : "", Le ? "is-dragging" : "", ze ? "is-trimming" : ""].filter(Boolean).join(" "),
            "data-video-timeline-interactive": !0,
            "data-timeline-clip-id": ue.id,
            "data-visual-index": ge + 1,
            "data-timeline-dragging": Le ? "true" : void 0,
            "data-timeline-trimming": ze ? we : void 0,
            style: K ? {
              left: _e * o,
              width: Math.max(2, ke * o)
            } : {
              left: `${me}%`,
              width: `${Ne}%`
            },
            children: [A === "node" ? c.jsx("span", {
              className: "video-timeline-clip__drag-placeholder",
              "aria-hidden": !0
            }) : null, c.jsxs("button", {
              type: "button",
              className: "video-timeline-clip__surface",
              "aria-label": x(ve?.kind === "audio" ? "音频片段 {0}，时长 {1} 秒" : "视频片段 {0}，时长 {1} 秒", ge + 1, ke.toFixed(1)),
              "aria-pressed": d ? Te : void 0,
              tabIndex: 0,
              onPointerDown: De => X(De, ue, ge),
              onContextMenu: De => {
                w && (De.preventDefault(), De.stopPropagation(), w(ue.id));
              },
              onKeyDown: De => {
                (De.key === "Enter" || De.key === " ") && (De.preventDefault(), y(ue.id), h(_e, !0));
              },
              children: [c.jsxs("div", {
                className: `video-timeline-clip__filmstrip ${rt ? "is-loading" : ""} ${d ? "" : "is-passive"}`,
                style: {
                  transform: `translate3d(${-$e.offsetPixels}px,0,0)`,
                  ...(!d && nt ? {
                    backgroundImage: `url("${nt}")`
                  } : {})
                },
                children: [ve?.kind === "audio" ? c.jsx("span", {
                  style: {display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "currentColor"},
                  children: c.jsx(DY, {size: 24})
                }) : d ? Array.from({
                  length: $e.count
                }, (De, Ye) => {
                  const Ce = $e.startIndex + Ye,
                    He = Re ? (Ce + .5) * $e.displayTileWidth / o : ue.sourceStart + qD(ue) * ((Ce + .5) / $e.tileCount),
                    Ve = Hbo(Ae, He),
                    it = (Ve == null ? void 0 : Ve.url) || (ve == null ? void 0 : ve.posterUrl) || u,
                    It = {
                      left: `${Ce * $e.displayTileWidth}px`,
                      width: `${$e.displayTileWidth}px`
                    };
                  return it ? c.jsx("img", {
                    className: "video-timeline-clip__tile",
                    src: it,
                    alt: "",
                    draggable: !1,
                    loading: "lazy",
                    decoding: "async",
                    style: It
                  }, Ce) : c.jsx("span", {
                    className: "video-timeline-clip__placeholder",
                    style: It
                  }, Ce);
                }) : null, rt ? c.jsx("span", {
                  className: "video-timeline-clip__shimmer"
                }) : null]
              }), c.jsx("span", {
                className: "video-timeline-clip__duration",
                children: iM(ke)
              }), c.jsx("span", {
                className: "video-timeline-clip__stroke",
                "aria-hidden": !0
              }), Te ? c.jsx("span", {
                className: "video-timeline-clip__selection",
                "aria-hidden": !0
              }) : null, ve ? c.jsx("span", {
                className: "sr-only",
                children: ve.fileName
              }) : null]
            }), d && Te ? c.jsxs(c.Fragment, {
              children: [c.jsx("span", {
                className: "video-timeline-clip__trim is-left",
                role: "slider",
                tabIndex: 0,
                "aria-label": x("调整片段起点"),
                "aria-keyshortcuts": "ArrowLeft ArrowRight",
                "aria-valuenow": ue.sourceStart,
                onPointerDown: De => Z(De, ue, ge, "start"),
                onKeyDown: De => Ke(De, "start")
              }), c.jsx("span", {
                className: "video-timeline-clip__trim is-right",
                role: "slider",
                tabIndex: 0,
                "aria-label": x("调整片段终点"),
                "aria-keyshortcuts": "ArrowLeft ArrowRight",
                "aria-valuenow": ue.sourceEnd,
                onPointerDown: De => Z(De, ue, ge, "end"),
                onKeyDown: De => Ke(De, "end")
              })]
            }) : null]
          }, ue.id);
        }), K ? c.jsxs(c.Fragment, {
          children: [c.jsx("div", {
            className: "video-timeline-audio-lane",
            "aria-hidden": !0
          }), c.jsx("div", {
            className: "video-timeline-blank-zone",
            "data-timeline-track-interaction-zone": "true"
          })]
        }) : null, c.jsx("button", {
          type: "button",
          className: "video-timeline-add",
          "data-video-timeline-interactive": !0,
          style: K ? {
            left: Y * o
          } : {
            left: `${q > 0 ? Y / q * 100 : 0}%`
          },
          "aria-label": x("添加素材到时间线"),
          title: x("添加素材到时间线"),
          onPointerDown: ue => ue.stopPropagation(),
          onClick: k,
          children: c.jsx(eo, {
            size: 16
          })
        })]
      }), xe != null ? c.jsx("div", {
        className: "video-timeline-insert",
        style: {
          left: xe
        },
        "aria-hidden": !0
      }) : null, Ee != null && !s ? c.jsx("div", {
        className: "video-timeline-snap",
        "data-timeline-snap-target-kind": ce ?? void 0,
        style: {
          left: Ee
        },
        "aria-hidden": !0
      }) : null, c.jsxs("div", {
        ref: T,
        className: "video-timeline-playhead",
        "data-timeline-snapped": ce === "playhead" ? "true" : void 0,
        style: {
          transform: `translate3d(${ae}px,0,0)`
        },
        role: K ? "slider" : void 0,
        tabIndex: K && d ? 0 : void 0,
        "aria-label": K ? x("播放头") : void 0,
        "aria-valuemin": 0,
        "aria-valuemax": Y,
        "aria-valuenow": i,
        "aria-valuetext": iM(i),
        "aria-keyshortcuts": K ? "ArrowLeft ArrowRight ArrowUp ArrowDown Home End PageUp PageDown" : void 0,
        onPointerDown: ue => {
          d && (ue.stopPropagation(), X(ue));
        },
        children: [c.jsx("span", {
          className: "video-timeline-playhead__line",
          "aria-hidden": !0
        }), c.jsx("span", {
          className: "video-timeline-playhead__thumb",
          "aria-hidden": !0
        }), K ? null : c.jsx("em", {
          children: iM(i, s)
        })]
      }), be != null ? c.jsx("div", {
        className: "video-timeline-hoverhead",
        "data-visible": "true",
        style: {
          left: be
        },
        "aria-hidden": !0,
        children: K ? null : c.jsxs(c.Fragment, {
          children: [c.jsx("span", {}), c.jsxs("em", {
            children: [iM(z ?? 0, s), s ? x(" 精确") : ""]
          })]
        })
      }) : null]
    })
  });
}

function Wbo(e, t, n, r, a) {
  const i = t.getBoundingClientRect(),
    o = i.width <= 0 ? 0 : zJ((e - i.left) / i.width, 0, 1),
    s = n + o * (r - n);
  return zJ(Math.round(s / a) * a, n, r);
}

function M0n(e, t, n, r) {
  const a = r === n ? 0 : (t - n) / (r - n);
  e.style.setProperty("--tls-slider-progress", `${zJ(a, 0, 1) * 100}%`);
}

function qbo({
  min: e,
  max: t,
  step: n,
  value: r,
  ariaLabel: a,
  className: i,
  onChange: o
}) {
  const s = g.useRef(null),
    l = g.useRef(r);
  l.current = r, g.useLayoutEffect(() => {
    s.current && M0n(s.current, r, e, t);
  }, [t, e, r]);
  const d = u => {
    if (u.button !== 0) return;
    u.preventDefault(), u.stopPropagation();
    const h = u.currentTarget,
      p = u.pointerId;
    try {
      h.setPointerCapture(p);
    } catch {}
    const m = b => {
      const v = Wbo(b, h, e, t, n);
      l.current = v, M0n(h, v, e, t), o(v);
    };
    m(u.clientX);
    const f = b => {
        b.pointerId === p && m(b.clientX);
      },
      y = b => {
        b.pointerId === p && (window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", y), m(b.clientX));
      };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", y), window.addEventListener("pointercancel", y);
  };
  return c.jsxs("div", {
    ref: s,
    role: "slider",
    tabIndex: 0,
    "aria-label": a,
    "aria-valuemin": e,
    "aria-valuemax": t,
    "aria-valuenow": r,
    className: i,
    onPointerDown: d,
    onKeyDown: u => {
      u.key !== "ArrowLeft" && u.key !== "ArrowRight" || (u.preventDefault(), o(zJ(r + (u.key === "ArrowRight" ? n : -n), e, t)));
    },
    children: [c.jsx("span", {
      className: "tls-slider-fill"
    }), c.jsx("span", {
      className: "tls-slider-thumb"
    })]
  });
}

const P0n = 360,
  R0n = 520,
  oge = 218,
  EPe = 320;

function Kbo(e) {
  return document.querySelector(`.node-wrapper[data-node-id="${e}"]`);
}

function N0n(e, t, n) {
  return Math.min(n, Math.max(t, e));
}

function Qbo({
  open: e,
  pickingCanvas: t = !1,
  title: n,
  targetNodeId: r,
  nodes: a,
  sources: i,
  duration: o,
  currentTime: s,
  pixelsPerSecond: l,
  minPixelsPerSecond: d,
  maxPixelsPerSecond: u,
  canSplit: h,
  canTrimStart: p = !1,
  canTrimEnd: m = !1,
  canDelete: f,
  snapEnabled: y,
  muted: b,
  exporting: v,
  preview: _,
  track: w,
  onClose: k,
  onExport: A,
  onSplit: S,
  onTrimStart: C,
  onTrimEnd: I,
  onDelete: E,
  onToggleSnap: M,
  onToggleMuted: T,
  onZoom: P,
  onAddFile: R,
  onPickCanvas: j,
  onAddSource: B,
  onPreviewFullscreen: F,
  canUndoTimeline = !1,
  canRedoTimeline = !1,
  onUndoTimeline,
  onRedoTimeline,
  onExportAudio
}) {
  on();
  const N = g.useRef(null),
    G = g.useRef(null),
    [z, V] = g.useState("canvas"),
    [O, L] = g.useState("all"),
    D = g.useRef(null),
    [U, H] = g.useState(360),
    [Y, K] = g.useState(oge),
    [W, Q] = g.useState(!1),
    [q, ne] = g.useState(!1),
    [de, le] = g.useState(!1),
    [J, pe] = g.useState(!1),
    [ce, we] = g.useState(null),
    X = g.useMemo(() => new Set(i.map(he => he.sourceNodeId).filter(Boolean)), [i]),
    Z = g.useMemo(() => Tvr(a, r), [a, r]);
  g.useLayoutEffect(() => {
    D.current && !W && (D.current.style.width = `${U}px`);
  }, [U, W]), g.useLayoutEffect(() => {
    G.current && !q && (G.current.style.height = `${Y}px`);
  }, [q, Y]), g.useEffect(() => {
    if (!e) return;
    const he = ue => {
      if (!(ue.key !== "Escape" || t)) {
        if (ue.preventDefault(), ue.stopPropagation(), document.fullscreenElement) {
          document.exitFullscreen();
          return;
        }
        if (J) {
          pe(!1);
          return;
        }
        k();
      }
    };
    return window.addEventListener("keydown", he, !0), () => window.removeEventListener("keydown", he, !0);
  }, [J, k, e, t]), g.useEffect(() => {
    if (!e) return;
    const he = () => le(document.fullscreenElement === N.current);
    return he(), document.addEventListener("fullscreenchange", he), () => document.removeEventListener("fullscreenchange", he);
  }, [e]);
  const re = g.useCallback(async () => {
    const he = N.current;
    if (he) {
      pe(!1);
      try {
        if (document.fullscreenElement === he) {
          await document.exitFullscreen();
          return;
        }
        document.fullscreenElement && (await document.exitFullscreen()), await he.requestFullscreen();
      } catch {
        pe(ue => !ue);
      }
    }
  }, []);
  g.useEffect(() => {
    F == null || F(re);
  }, [F, re]);
  const fe = (he, ue, ge, _e, ke, ve, Te) => {
      if (he.button !== 0) return;
      he.preventDefault(), he.stopPropagation();
      const Ne = ue === "x" ? he.clientX : he.clientY,
        me = he.pointerId,
        Ae = he.currentTarget;
      let Fe = ge;
      Ae.dataset.resizing = "true", ue === "x" ? (D.current && (D.current.style.width = `${ge}px`), Q(!0)) : (G.current && (G.current.style.height = `${ge}px`), ne(!0));
      const Me = $e => {
          if ($e.pointerId !== me) return;
          const rt = ue === "x" ? $e.clientX - Ne : Ne - $e.clientY;
          Fe = N0n(ge + rt, _e, ke), ve(Fe), Ae.setAttribute("aria-valuenow", String(Fe));
        },
        Re = $e => {
          $e.pointerId === me && (window.removeEventListener("pointermove", Me), window.removeEventListener("pointerup", Re), delete Ae.dataset.resizing, ue === "x" ? Q(!1) : ne(!1), Te(Fe));
        };
      window.addEventListener("pointermove", Me), window.addEventListener("pointerup", Re);
    },
    ye = async he => {
      const ue = a.find(ge => ge.id === he);
      if (!(!ue || ce)) {
        we(he);
        try {
          B(await p$t(ue, Kbo(he)));
        } catch (ge) {
          Ai("error", ge instanceof Error ? ge.message : "无法添加这个素材", 2600);
        } finally {
          we(null);
        }
      }
    },
    ie = he => {
      Array.from(he.dataTransfer.types).includes("Files") && (he.preventDefault(), he.stopPropagation(), he.dataTransfer.dropEffect = "none");
    };
  if (!e) return null;
  const ae = i.map(he => ({
      id: he.id,
      nodeId: he.sourceNodeId || he.id,
      name: he.fileName,
      posterUrl: he.posterUrl,
      duration: he.duration,
      kind: he.kind === "image" ? "image" : he.kind === "audio" ? "audio" : "video"
    })),
    Ee = (z === "canvas" ? Z : z === "imported" ? ae : []).filter(he => O === "all" || he.kind === O),
    xe = J || de;
  return Da.createPortal(c.jsxs("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "video-timeline-workspace-title",
    tabIndex: -1,
    "data-video-timeline-workspace": !0,
    "data-video-timeline-interactive": !0,
    "data-theme": "dark",
    className: `video-timeline-workspace nodrag nopan nowheel ${t ? "is-picking" : ""} ${xe ? "is-immersive" : ""}`,
    onMouseDown: he => he.stopPropagation(),
    onPointerDown: he => he.stopPropagation(),
    onDragEnterCapture: ie,
    onDragOverCapture: ie,
    onDropCapture: ie,
    children: [c.jsxs("header", {
      className: "tls-header",
      children: [c.jsx("h2", {
        id: "video-timeline-workspace-title",
        className: "tls-header-title",
        children: n || x("时间线")
      }), c.jsxs("div", {
        className: "tls-toolbar-group",
        children: [c.jsxs("button", {
          type: "button",
          className: "tls-export",
          title: x("导出 MP4（纯音频片段使用黑底）"),
          onClick: A,
          disabled: v || o <= 0,
          children: [v ? c.jsx(Ua, {
            size: 16,
            className: "animate-spin"
          }) : c.jsx(ws, {
            size: 16
          }), x("导出")]
        }), c.jsx("button", {
          type: "button",
          className: "tls-export",
          onClick: onExportAudio,
          disabled: v || o <= 0,
          title: x("导出纯音频 PCM WAV（48kHz 立体声）"),
          children: x("导出音频 WAV")
        }), c.jsx("button", {
          type: "button",
          className: "tls-control tls-header-close",
          "aria-label": x("关闭"),
          onClick: he => {
            he.stopPropagation(), k();
          },
          onPointerDown: he => he.stopPropagation(),
          children: c.jsx(Na, {
            size: 16
          })
        })]
      })]
    }), c.jsxs("div", {
      className: "tls-body",
      children: [c.jsxs("div", {
        className: "tls-top",
        children: [c.jsxs("aside", {
          ref: D,
          className: "tls-asset-panel",
          "data-resizing": W ? "true" : void 0,
          children: [c.jsxs("div", {
            className: "tls-asset-tabs",
            children: [c.jsx("button", {
              type: "button",
              className: z === "imported" ? "is-active" : "",
              onClick: () => V("imported"),
              children: x("已导入资产")
            }), c.jsx("button", {
              type: "button",
              className: z === "canvas" ? "is-active" : "",
              onClick: () => V("canvas"),
              children: x("画布资产")
            })]
          }), c.jsxs("div", {
            className: "tls-asset-filters",
            children: [["all", "image", "video", "audio"].map(he => c.jsx("button", {
              type: "button",
              className: O === he ? "is-active" : "",
              onClick: () => L(he),
              children: x(he === "all" ? "全部" : he === "image" ? "图片" : he === "video" ? "视频" : "音频")
            }, he)), c.jsxs("button", {
              type: "button",
              className: "tls-asset-import",
              onClick: R,
              children: [c.jsx(eo, {
                size: 12
              }), x("导入")]
            })]
          }), c.jsxs("div", {
            className: "tls-asset-scroll",
            children: [z === "upload" ? c.jsxs("button", {
              type: "button",
              className: "tls-asset-empty",
              onClick: R,
              children: [c.jsx(eo, {
                size: 22
              }), c.jsx("span", {
                children: x("导入本地音视频")
              })]
            }) : Ee.length === 0 ? c.jsx("div", {
              className: "tls-asset-empty",
              children: x(z === "imported" ? "将文件拖至此处添加" : "没有可添加的画布资源。")
            }) : c.jsx("div", {
              className: "tls-asset-grid",
              children: Ee.map(he => c.jsxs("button", {
                type: "button",
                draggable: z === "canvas",
                className: `tls-asset ${X.has(he.nodeId) ? "is-added" : ""}`,
                title: `${he.kind === "audio" ? x("音频") : he.kind === "image" ? x("图片") : x("视频")} · ${he.name}`,
                "aria-label": he.name,
                "data-media-kind": he.kind,
                disabled: !!ce,
                onClick: () => {
                  z === "canvas" && ye(he.nodeId);
                },
                onDragStart: ue => {
                  ue.dataTransfer.setData(a3t, he.nodeId), ue.dataTransfer.effectAllowed = "copy";
                },
                children: [X.has(he.nodeId) ? c.jsx("em", {
                  className: "tls-asset__badge",
                  children: x("已添加")
                }) : null, c.jsx("span", {
                  className: "tls-asset__thumb",
                  children: he.posterUrl ? c.jsx("img", {
                    src: he.posterUrl,
                    alt: "",
                    draggable: !1
                  }) : he.kind === "audio" ? c.jsx(DY, {size: 28}) : c.jsx("span", {})
                }), c.jsx("small", {
                  children: iM(he.duration ?? 0)
                })]
              }, `${he.kind}-${"id" in he ? he.id : he.nodeId}-${he.name}`))
            }), c.jsx("div", {
              className: "tls-asset-fade"
            })]
          }), c.jsx("button", {
            type: "button",
            className: "tls-asset-resize",
            "aria-label": x("调整素材面板宽度"),
            "aria-orientation": "vertical",
            "aria-valuemin": P0n,
            "aria-valuemax": R0n,
            "aria-valuenow": U,
            onPointerDown: he => fe(he, "x", U, P0n, R0n, ue => {
              D.current && (D.current.style.width = `${ue}px`);
            }, H)
          })]
        }), c.jsx("section", {
          ref: N,
          className: "tls-preview-shell",
          "data-browser-fullscreen": xe ? "true" : void 0,
          "aria-label": x("时间线预览"),
          children: _
        })]
      }), c.jsxs("section", {
        ref: G,
        className: "tls-workspace",
        tabIndex: -1,
        children: [c.jsx("button", {
          type: "button",
          className: "tls-workspace-resize",
          role: "separator",
          "aria-label": x("调整时间线高度"),
          "aria-orientation": "horizontal",
          "aria-valuemin": oge,
          "aria-valuemax": EPe,
          "aria-valuenow": Y,
          "data-resizing": q ? "true" : void 0,
          onKeyDown: he => {
            const ue = he.key === "ArrowUp" ? Y + 8 : he.key === "ArrowDown" ? Y - 8 : he.key === "Home" ? oge : he.key === "End" ? EPe : null;
            if (ue == null) return;
            he.preventDefault();
            const ge = N0n(ue, oge, EPe);
            G.current && (G.current.style.height = `${ge}px`), K(ge);
          },
          onPointerDown: he => fe(he, "y", Y, oge, EPe, ue => {
            G.current && (G.current.style.height = `${ue}px`);
          }, K)
        }), c.jsxs("div", {
          className: "tls-toolbar",
          children: [c.jsxs("div", {
            className: "tls-toolbar-group",
            children: [c.jsx("button", {
              type: "button",
              className: "tls-control",
              disabled: !canUndoTimeline,
              onClick: onUndoTimeline,
              title: x("撤销"),
              children: c.jsx(d_, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: "tls-control",
              disabled: !canRedoTimeline,
              onClick: onRedoTimeline,
              title: x("重做"),
              children: c.jsx(J$, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: "tls-control",
              disabled: !h,
              title: x("分割（Ctrl+B）"),
              onClick: S,
              children: c.jsx(Sf, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: "tls-control",
              disabled: !p,
              title: x("左裁 / 入点（Q）"),
              onClick: C,
              children: c.jsx(iEt, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: "tls-control",
              disabled: !m,
              title: x("右裁 / 出点（W）"),
              onClick: I,
              children: c.jsx(oEt, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: "tls-control",
              disabled: !f,
              title: x("删除"),
              onClick: E,
              children: c.jsx(Qo, {
                size: 16
              })
            })]
          }), c.jsxs("div", {
            className: "tls-toolbar-group",
            role: "group",
            "aria-label": x("时间线视图"),
            children: [c.jsx("button", {
              type: "button",
              className: "tls-control",
              "aria-label": x(b ? "取消静音" : "静音"),
              title: x(b ? "取消静音" : "静音"),
              onClick: T,
              children: b ? c.jsx(DY, {
                size: 16
              }) : c.jsx(B5, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: "tls-control tls-control-snap",
              "aria-pressed": y,
              title: x(y ? "吸附开（N）" : "吸附关（N）"),
              onClick: M,
              children: c.jsx(lNr, {
                size: 16
              })
            }), c.jsxs("div", {
              className: "tls-zoom-controls",
              children: [c.jsx("button", {
                type: "button",
                className: "tls-control",
                "aria-label": x("缩小"),
                disabled: l <= d,
                onClick: () => P(e3t(l, "out", d, u)),
                children: c.jsx(AS, {
                  size: 16
                })
              }), c.jsx(qbo, {
                className: "tls-zoom-slider",
                min: d,
                max: u,
                step: .1,
                value: l,
                ariaLabel: x("时间线缩放"),
                onChange: P
              }), c.jsx("button", {
                type: "button",
                className: "tls-control",
                "aria-label": x("放大"),
                disabled: l >= u,
                onClick: () => P(e3t(l, "in", d, u)),
                children: c.jsx(eo, {
                  size: 16
                })
              })]
            })]
          })]
        }), c.jsxs("div", {
          className: "tls-track-host",
          children: [c.jsxs("div", {
            className: "tls-track-gutter",
            children: [c.jsx("button", {
              type: "button",
              className: "tls-track-gutter__lock",
              "aria-label": x(b ? "取消静音" : "静音"),
              title: x(b ? "取消静音" : "静音"),
              onClick: T,
              children: b ? c.jsx(DY, {
                size: 14
              }) : c.jsx(B5, {
                size: 14
              })
            }), c.jsx("span", {
              className: "tls-track-gutter__audio",
              "aria-hidden": !0,
              children: c.jsx(B5, {
                size: 14
              })
            })]
          }), c.jsx("div", {
            className: "tls-track-canvas",
            children: w
          })]
        })]
      })]
    })]
  }), document.body);
}

const j0n = /\.([a-z0-9]{2,5})(?:[?#].*)?$/i;

function Ybo() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI__ || e.__TAURI_INTERNALS__);
}

function Xbo(e) {
  return e.replace(/\.[a-z0-9]{2,5}$/i, "").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").trim() || "剪辑时间线";
}

function Jbo(e) {
  return /\.mp4$/i.test(e) ? e : `${e}.mp4`;
}

function Zbo(e) {
  var r;
  const t = e.fileName.match(j0n);
  if (t) return t[1].toLowerCase();
  const n = e.url.match(j0n);
  return ((r = n == null ? void 0 : n[1]) == null ? void 0 : r.toLowerCase()) || "mp4";
}

function evo(e, t) {
  const n = e.includes("\\") ? "\\" : "/";
  return `${e.replace(/[\\/]+$/, "")}${n}${t}`;
}

function tvo(e) {
  var r;
  const t = (r = e.localFilePath) == null ? void 0 : r.trim();
  if (t) return t;
  const n = e.url.trim();
  return /^file:/i.test(n) || /^[A-Za-z]:[\\/]/.test(n) || n.startsWith("/") || n.startsWith("\\\\") ? n : null;
}

function nvo(e) {
  const t = e.url.trim();
  return /^https?:/i.test(t) ? t : null;
}

async function rvo(e) {
  if (!e.assetId) return null;
  try {
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
    await t.ensureRestored();
    const n = await t.getAssetSourcePath(e.assetId);
    if (!n) return null;
    const {
      exists: r
    } = await Ie(async () => {
      const {
        exists: a
      } = await Promise.resolve().then(() => oc);
      return {
        exists: a
      };
    }, void 0, import.meta.url);
    return (await r(n)) ? n : null;
  } catch {
    return null;
  }
}

async function avo(e) {
  try {
    const t = await fetch(e.url);
    if (t.ok) return await t.blob();
  } catch {}
  if (e.assetId) {
    const {
        assetStore: t
      } = await Ie(async () => {
        const {
          assetStore: r
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: r
        };
      }, void 0, import.meta.url),
      n = await t.getAssetBlob(e.assetId);
    if (n) return n;
  }
  throw new Error(`无法读取源媒体：${e.fileName}`);
}

async function ivo(e) {
  const t = new Map();
  let n;
  for (let r = 0; r < e.length; r += 1) {
    const a = e[r],
      i = tvo(a);
    if (i) {
      t.set(a.id, i);
      continue;
    }
    const o = await rvo(a);
    if (o) {
      t.set(a.id, o);
      continue;
    }
    const s = nvo(a);
    if (s) {
      t.set(a.id, s);
      continue;
    }
    n || (n = await Fr("get_export_temp_dir"));
    const l = await avo(a),
      d = evo(n, `timeline-source-${String(r).padStart(3, "0")}.${Zbo(a)}`);
    await b5t(d, l), t.set(a.id, d);
  }
  return {
    inputs: t,
    temporaryInputDirectory: n
  };
}

function ovo(e, t) {
  return e.map((n, r) => {
    const a = t.get(n.sourceId);
    if (!a) throw new Error(`第 ${r + 1} 个片段的源媒体已丢失`);
    if (!Number.isFinite(n.sourceStart) || !Number.isFinite(n.sourceEnd) || n.sourceEnd <= n.sourceStart) throw new Error(`第 ${r + 1} 个片段的裁剪范围无效`);
    return {
      input: a,
      sourceStart: Math.max(0, n.sourceStart),
      sourceEnd: n.sourceEnd
    };
  });
}

async function svo({
  clips: e,
  sources: t,
  suggestedName: n,
  format = "mp4"
}) {
  if (!["mp4", "wav"].includes(format)) throw new Error("时间线导出格式只支持 MP4 或 WAV");
  if (e.length === 0) throw new Error("时间线中没有可导出的片段");
  if (!Ybo()) throw new Error("合并导出需要在桌面客户端中使用");
  const r = new Date(),
    a = [r.getFullYear(), r.getMonth() + 1, r.getDate()].map(h => String(h).padStart(2, "0")).join(""),
    i = `${Xbo(n)}-合并-${a}.${format}`,
    {
      save: o
    } = await Ie(async () => {
      const {
        save: h
      } = await Promise.resolve().then(() => Sb);
      return {
        save: h
      };
    }, void 0, import.meta.url),
    s = await o({
      title: format === "wav" ? "导出时间线音频 WAV" : "导出合并时间线",
      defaultPath: i,
      filters: [{
        name: format === "wav" ? "WAV 音频" : "MP4 视频",
        extensions: [format]
      }]
    });
  if (!s) return {
    cancelled: !0
  };
  const l = new Set(e.map(h => h.sourceId)),
    d = t.filter(h => l.has(h.id));
  let u;
  try {
    const h = await ivo(d);
    u = h.temporaryInputDirectory;
    const p = ovo(e, h.inputs),
      m = t.find(y => {
        var b;
        return y.id === ((b = e[0]) == null ? void 0 : b.sourceId);
      }) || d[0],
      f = await Fr("export_video_timeline", {
        args: {
          clips: p,
          outputPath: format === "wav" ? (/\.wav$/i.test(s) ? s : `${s}.wav`) : Jbo(s),
          format,
          audioSampleRate: 48000,
          audioChannels: 2,
          targetWidth: (m == null ? void 0 : m.width) || 1280,
          targetHeight: (m == null ? void 0 : m.height) || 720,
          temporaryInputDirectory: u
        }
      });
    return u = void 0, {
      cancelled: !1,
      result: f
    };
  } finally {
    u && (await Fr("cleanup_video_timeline_export_temp_dir", {
      directory: u
    }).catch(() => {}));
  }
}

const D0n = Kyo,
  i3t = Qyo;

function lvo(e, t, n) {
  var i;
  if ((t == null ? void 0 : t.type) === "gen-video") {
    const o = P0(t);
    if (o) return o;
    const s = Xl(t);
    if (s != null && s.url && /^https?:/i.test(s.url)) return s.url;
  }
  const r = t ? String(((i = t.settings) == null ? void 0 : i._ossRemoteUrl) || "").trim() : "";
  return /^https?:/i.test(r) && !/\/thumbnails\//i.test(r) && !/[?&](?:vframe|x-oss-process)=/i.test(r) ? r : /^(https?:|file:)/i.test(e.url) || /^[A-Za-z]:[\\/]/.test(e.url) || e.url.startsWith("/") ? e.url : (n == null ? void 0 : n.url) || e.url;
}

function L0n(e = "clip") {
  const t = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${e}-${t}`;
}

function cvo(e) {
  var d, u;
  const t = e.settings || {},
    n = Array.isArray(t.videoTimelineSources) ? t.videoTimelineSources.map((h, p) => p === 0 && !h.localFilePath && e._localFilePath ? {
      ...h,
      localFilePath: e._localFilePath
    } : h) : [],
    r = !Array.isArray(t.videoTimelineSources) && e.content && (((d = e.videoMeta) == null ? void 0 : d.duration) || 0) > 0 ? [{
      id: "source-primary",
      url: e.content,
      fileName: e.videoFileName || "video.mp4",
      duration: e.videoMeta.duration,
      width: e.videoMeta.w,
      height: e.videoMeta.h,
      assetId: typeof t._assetId == "string" ? t._assetId : void 0,
      localFilePath: e._localFilePath
    }] : [],
    a = n.length > 0 ? n : r,
    i = Array.isArray(t.videoTimelineClips) ? t.videoTimelineClips : [],
    o = !Array.isArray(t.videoTimelineClips) && a.length > 0 ? [{
      id: "clip-primary",
      sourceId: a[0].id,
      sourceStart: 0,
      sourceEnd: a[0].duration
    }] : [],
    s = hbo(a, i.length > 0 ? i : o),
    l = typeof t.videoTimelineActiveClipId == "string" ? t.videoTimelineActiveClipId : null;
  return {
    ...s,
    activeClipId: s.clips.some(h => h.id === l) ? l : ((u = s.clips[0]) == null ? void 0 : u.id) || null,
    pixelsPerSecond: (() => {
      const h = t.videoTimelinePixelsPerSecond;
      return h === 54 && t.videoTimelineZoomVersion !== 2 ? D0n : typeof h == "number" ? Math.max(JSt, Math.min(i3t, h)) : D0n;
    })(),
    workspacePixelsPerSecond: (() => {
      const h = t.videoTimelineWorkspacePixelsPerSecond;
      return typeof h == "number" ? Math.max(LW, Math.min(OW, h)) : ZSt;
    })(),
    currentTime: typeof t.videoTimelineCurrentTime == "number" ? Math.max(0, t.videoTimelineCurrentTime) : 0,
    previewOpen: t.videoTimelinePreviewOpen !== !1,
    muted: t.videoTimelineMuted !== !1,
    objectFit: t.videoTimelineObjectFit === "cover" ? "cover" : "contain",
    fitToViewport: t.videoTimelineFitToViewport === !0,
    workspaceOpen: t.videoTimelineWorkspaceOpen === !0,
    restoreGeometry: t.videoTimelineRestoreGeometry && typeof t.videoTimelineRestoreGeometry == "object" ? t.videoTimelineRestoreGeometry : void 0
  };
}

function dvo(e) {
  if (!(e instanceof HTMLElement)) return !1;
  if (e.closest('input, textarea, select, [contenteditable="true"], [role="separator"]')) return !0;
  const slider = e.closest('[role="slider"]');
  return !!slider && !slider.classList.contains("video-timeline-playhead");
}

function uvo({
  node: e,
  nodes: t,
  isDark: n,
  selected: r,
  updateNode: a,
  onRequestSelect: i,
  setConnections: o,
  displayQuality: s = "high"
}) {
  var Ze;
  on();
  const l = g.useMemo(() => cvo(e), [e]),
    [d, u] = g.useState(l.activeClipId),
    [h, p] = g.useState(l.currentTime),
    [m, f] = g.useState(!1),
    [y, b] = g.useState(null),
    [v, _] = g.useState(l.pixelsPerSecond),
    [w, k] = g.useState(l.workspacePixelsPerSecond ?? ZSt),
    [A, S] = g.useState(!1),
    [C, I] = g.useState(!1),
    [E, M] = g.useState(!1),
    T = g.useRef(null),
    P = g.useRef(0),
    R = g.useRef(null),
    j = g.useRef(null),
    B = g.useRef(0),
    F = g.useRef(0),
    N = g.useRef(0),
    G = g.useRef(null),
    z = g.useRef(!1),
    V = g.useRef(!1),
    O = g.useRef(null),
    L = g.useRef(() => {}),
    timelineHistory = g.useRef({past: [], future: []}),
    timelineLive = g.useRef(null),
    [, refreshTimelineHistory] = g.useState(0);
  timelineLive.current = {
    videoTimelineSources: l.sources,
    videoTimelineClips: l.clips,
    videoTimelineCurrentTime: h,
    videoTimelineActiveClipId: d,
    videoTimelinePixelsPerSecond: v,
    videoTimelineWorkspacePixelsPerSecond: w
  };
  const copyTimelineState = value => JSON.parse(JSON.stringify(value)),
    restoreTimelineEdit = g.useCallback(direction => {
      const history = timelineHistory.current,
        from = direction === "undo" ? history.past : history.future,
        to = direction === "undo" ? history.future : history.past;
      if (!from.length) return;
      const next = from.pop();
      to.push(copyTimelineState(timelineLive.current));
      if (to.length > 100) to.shift();
      R.current != null && window.clearTimeout(R.current);
      j.current != null && window.clearTimeout(j.current);
      R.current = null, j.current = null;
      f(!1), T.current && T.current.pause();
      p(next.videoTimelineCurrentTime), u(next.videoTimelineActiveClipId);
      _(next.videoTimelinePixelsPerSecond), k(next.videoTimelineWorkspacePixelsPerSecond);
      timelineLive.current = copyTimelineState(next);
      a(e.id, {settings: next});
      refreshTimelineHistory(version => version + 1);
    }, [e.id, a]),
    undoTimelineEdit = g.useCallback(() => restoreTimelineEdit("undo"), [restoreTimelineEdit]),
    redoTimelineEdit = g.useCallback(() => restoreTimelineEdit("redo"), [restoreTimelineEdit]);
  V.current = m, g.useEffect(() => u(l.activeClipId), [l.activeClipId]), g.useEffect(() => {
    V.current || p(l.currentTime);
  }, [l.currentTime]), g.useEffect(() => _(l.pixelsPerSecond), [l.pixelsPerSecond]), g.useEffect(() => k(l.workspacePixelsPerSecond ?? ZSt), [l.workspacePixelsPerSecond]), g.useEffect(() => {
    var Ge;
    r || l.workspaceOpen || (S(!1), f(!1), b(null), u(null), (Ge = T.current) == null || Ge.pause(), l.previewOpen && a(e.id, {
      settings: {
        videoTimelinePreviewOpen: !1
      }
    }));
  }, [e.id, l.previewOpen, l.workspaceOpen, r, a]), g.useEffect(() => () => {
    R.current != null && window.clearTimeout(R.current), j.current != null && window.clearTimeout(j.current);
  }, []), g.useEffect(() => {
    o == null || o(Ge => {
      const Oe = Ge.filter(st => st.from !== e.id && st.to !== e.id);
      return Oe.length === Ge.length ? Ge : Oe;
    });
  }, [e.id, o]);
  const D = g.useMemo(() => l.sources.map(Ge => Ge.url), [l.sources.map(Ge => `${Ge.id}:${Ge.url}`).join("|")]),
    U = g.useMemo(() => l.sources.map(Ge => Ge.assetId ? [Ge.assetId] : void 0), [l.sources.map(Ge => `${Ge.id}:${Ge.assetId || ""}`).join("|")]),
    H = j1(D, {
      nodeType: "video-timeline",
      preferConstantDisplay: !0,
      allowSessionBlob: !0,
      allowDirectOssUrl: !0,
      blobRecoveryAssetIdsPerIndex: U
    }),
    Y = l.sources.map((Ge, Oe) => {
      var st;
      return `${Ge.id}:${((st = H[Oe]) == null ? void 0 : st.content) || Ge.url}:${Ge.duration}:${Ge.width}x${Ge.height}`;
    }).join("|"),
    K = g.useMemo(() => l.sources.map((Ge, Oe) => {
      var st;
      return {
        ...Ge,
        url: ((st = H[Oe]) == null ? void 0 : st.content) || Ge.url
      };
    }), [Y]),
    W = g.useMemo(() => new Map(K.map(Ge => [Ge.id, Ge])), [K]),
    Q = l.clips,
    q = BW(Q),
    ne = ubo(Q, h),
    de = CH(Q, h),
    le = !!(de && de.sourceTime - de.clip.sourceStart >= Tk),
    J = !!(de && de.clip.sourceEnd - de.sourceTime >= Tk),
    pe = Q.find(Ge => Ge.id === d) || ((Ze = CH(Q, h)) == null ? void 0 : Ze.clip) || Q[0] || null,
    ce = pe && W.get(pe.sourceId) || null,
    we = pe,
    X = we && W.get(we.sourceId) || null,
    Z = l.workspaceOpen || r && s !== "low",
    {
      thumbnails: re,
      generatingIds: fe
    } = jbo(K, Z),
    ye = g.useCallback(Ge => {
      const current = timelineLive.current,
        editsMedia = ["videoTimelineSources", "videoTimelineClips"].some(key => Object.prototype.hasOwnProperty.call(Ge, key) && JSON.stringify(Ge[key]) !== JSON.stringify(current[key]));
      if (editsMedia) {
        const history = timelineHistory.current;
        history.past.push(copyTimelineState(current));
        if (history.past.length > 100) history.past.shift();
        history.future = [];
        refreshTimelineHistory(version => version + 1);
      }
      timelineLive.current = {...current, ...Ge};
      a(e.id, {settings: Ge});
    }, [e.id, a]),
    ie = g.useCallback((Ge, Oe = d) => {
      R.current != null && window.clearTimeout(R.current), R.current = window.setTimeout(() => {
        R.current = null, ye({
          videoTimelineCurrentTime: Ge,
          videoTimelineActiveClipId: Oe
        });
      }, 180);
    }, [d, ye]),
    ae = g.useCallback((Ge, Oe) => {
      j.current != null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
        j.current = null, ye({
          [Ge]: Oe,
          videoTimelineZoomVersion: 2
        });
      }, 120);
    }, [ye]),
    be = g.useCallback(Ge => {
      const Oe = Math.max(JSt, Math.min(i3t, Ge));
      _(Oe), ae("videoTimelinePixelsPerSecond", Oe);
    }, [ae]),
    Ee = g.useCallback(Ge => {
      const Oe = Math.max(LW, Math.min(OW, Ge));
      k(Oe), ae("videoTimelineWorkspacePixelsPerSecond", Oe);
    }, [ae]),
    xe = g.useCallback(Ge => {}, []),
    he = g.useCallback((Ge, Oe) => {
      const st = bbo(l.clips);
      if (st < Tk) {
        Ai("info", `时间线最长 ${kvr / 60} 分钟`, 2200);
        return;
      }
      const vt = [...l.sources, Ge],
        Ht = {
          id: L0n(),
          sourceId: Ge.id,
          sourceStart: 0,
          sourceEnd: Math.min(Ge.duration, st)
        },
        nn = [...l.clips, Ht],
        pt = BW(l.clips);
      u(Ht.id), p(pt), P.current = 0, ye({
        videoTimelineSources: vt,
        videoTimelineClips: nn,
        videoTimelineActiveClipId: Ht.id,
        videoTimelineCurrentTime: pt,
        videoTimelinePreviewOpen: !0,
        ...(Oe ? {
          videoTimelineMuted: Ge.kind !== "audio"
        } : {})
      });
    }, [l.clips, l.sources, ye]),
    {
      inputRef: ue,
      onFileChange: ge,
      loading: _e,
      commitFile: ke
    } = Ibo({
      node: e,
      updateNode: a,
      onSourceReady: he,
      hasSources: l.sources.length > 0
    }),
    ve = g.useCallback(() => {
      var Ge;
      f(!1), (Ge = T.current) == null || Ge.pause(), i(), S(!0);
    }, [i]),
    Te = g.useCallback(() => {
      i(), ye({
        videoTimelineWorkspaceOpen: !0,
        videoTimelinePreviewOpen: !0
      });
    }, [i, ye]),
    Ne = g.useCallback(() => {
      var Ge;
      f(!1), (Ge = T.current) == null || Ge.pause(), document.fullscreenElement && document.exitFullscreen(), ye({
        videoTimelineWorkspaceOpen: !1
      });
    }, [ye]),
    me = g.useCallback(() => S(!1), []),
    Ae = g.useCallback(Ge => {
      he(Ge, l.sources.length === 0), S(!1);
    }, [he, l.sources.length]),
    Fe = g.useCallback(Ge => {
      const Oe = Math.max(0, Math.min(Ge, Math.max(0, q - .001))),
        st = CH(Q, Oe);
      if (!st) return null;
      P.current = st.sourceTime;
      const vt = T.current,
        Ht = W.get(st.clip.sourceId),
        nn = (Ht == null ? void 0 : Ht.previewUrl) || (Ht == null ? void 0 : Ht.url);
      return vt && nn && vt.currentSrc === nn && vt.readyState >= 1 && (vt.currentTime = st.sourceTime), {
        safeTime: Oe,
        clipId: st.clip.id
      };
    }, [Q, q, W]),
    Me = g.useCallback((Ge, Oe = !1) => {
      const st = Fe(Ge);
      st && (O.current = null, p(st.safeTime), u(st.clipId), Oe && !l.previewOpen && ye({
        videoTimelinePreviewOpen: !0
      }), ie(st.safeTime, st.clipId));
    }, [Fe, l.previewOpen, ie, ye]),
    Re = g.useCallback(() => {
      var Ge;
      z.current = V.current, V.current && ((Ge = T.current) == null || Ge.pause(), f(!1));
    }, []),
    $e = g.useCallback(Ge => {
      const Oe = Fe(Ge);
      if (!Oe) return;
      G.current = Oe;
      const st = performance.now();
      if (st - F.current < g0n) {
        if (N.current !== 0) return;
        N.current = window.requestAnimationFrame(() => {
          N.current = 0;
          const vt = G.current;
          vt && (F.current = performance.now(), p(vt.safeTime), u(vt.clipId));
        });
        return;
      }
      F.current = st, p(Oe.safeTime), u(Oe.clipId);
    }, [Fe]),
    rt = g.useCallback((Ge, Oe = !1) => {
      var st;
      N.current !== 0 && (window.cancelAnimationFrame(N.current), N.current = 0), G.current = null, Me(Ge, Oe), z.current && (z.current = !1, f(!0), (X == null ? void 0 : X.kind) !== "image" && ((st = T.current) == null || st.play().catch(() => f(!1))));
    }, [X == null ? void 0 : X.kind, Me]),
    nt = g.useCallback(() => {
      const Ge = T.current;
      if (!Ge || !we) return;
      const Oe = Math.max(we.sourceStart, Math.min(P.current, we.sourceEnd));
      Math.abs(Ge.currentTime - Oe) > .02 && (Ge.currentTime = Oe), m && Ge.play().catch(() => f(!1));
    }, [we, m]);
  g.useEffect(() => {
    const Ge = CH(Q, h);
    Ge && Ge.clip.id === (pe == null ? void 0 : pe.id) && (P.current = Ge.sourceTime);
  }, [pe == null ? void 0 : pe.id, Q, h]);
  const ze = g.useCallback(Ge => {
      var st;
      if (O.current === Ge) return;
      O.current = Ge;
      const Oe = dbo(Q, Ge);
      if (!Oe) {
        (st = T.current) == null || st.pause(), f(!1), p(q), ie(q, Ge);
        return;
      }
      P.current = Oe.clip.sourceStart, u(Oe.clip.id), p(Oe.timelineTime), ie(Oe.timelineTime, Oe.clip.id);
    }, [Q, q, ie]),
    Le = g.useCallback(() => {
      b(null);
      const Ge = T.current;
      if (m) {
        Ge == null || Ge.pause(), f(!1), ie(h);
        return;
      }
      if (Q.length === 0) return;
      O.current = null, l.previewOpen || ye({
        videoTimelinePreviewOpen: !0
      }), h >= q - .04 && Me(0, !0), f(!0);
      const Oe = X;
      (Oe == null ? void 0 : Oe.kind) !== "image" && Ge && Ge.play().catch(() => f(!1));
    }, [Q.length, h, q, l.previewOpen, ie, X, m, Me, ye]);
  g.useEffect(() => {
    if (!m || (X == null ? void 0 : X.kind) !== "image") return;
    let Ge = performance.now(),
      Oe = 0;
    const st = vt => {
      const Ht = Math.min(.08, (vt - Ge) / 1e3);
      Ge = vt, p(nn => Math.min(q, nn + Ht)), Oe = window.requestAnimationFrame(st);
    };
    return Oe = window.requestAnimationFrame(st), () => window.cancelAnimationFrame(Oe);
  }, [q, X == null ? void 0 : X.kind, m]), g.useEffect(() => {
    if (!m || (X == null ? void 0 : X.kind) !== "image" || !pe) return;
    const Ge = Q.findIndex(st => st.id === pe.id);
    if (Ge < 0) return;
    const Oe = V$e(Q, Ge);
    h >= Oe + (pe.sourceEnd - pe.sourceStart) - .02 && ze(pe.id), h >= q - .001 && f(!1);
  }, [pe, Q, ze, h, q, X == null ? void 0 : X.kind, m]);
  const Ke = g.useCallback(() => {
    if ((X == null ? void 0 : X.kind) === "image" || !V.current) return;
    const Ge = T.current;
    if (!Ge || !pe) return;
    const Oe = Q.findIndex(nn => nn.id === pe.id);
    if (Oe < 0) return;
    const vt = V$e(Q, Oe) + Math.max(0, Ge.currentTime - pe.sourceStart);
    if ((Ge.currentTime >= pe.sourceEnd - .025 || Ge.ended) && V.current) {
      ze(pe.id);
      return;
    }
    const Ht = performance.now();
    Ht - B.current < g0n || (B.current = Ht, p(Math.min(q, vt)));
  }, [pe, Q, ze, q, X == null ? void 0 : X.kind]);
  g.useEffect(() => {
    if (!m) return;
    const Ge = T.current;
    Ge && Ge.readyState >= 1 && nt();
  }, [d, ce == null ? void 0 : ce.url, m, nt]);
  const Xe = g.useCallback(Ge => {
      const Oe = CH(Q, h),
        st = Oe ? W.get(Oe.clip.sourceId) : null;
      if (!Oe || !st) return;
      const vt = vbo(Q, Oe.clip.id, Ge, Oe.sourceTime, st.duration);
      if (!vt) {
        Ai("info", Ge === "start" ? "入点距离片段边缘不足 1 秒" : "出点距离片段边缘不足 1 秒", 1800);
        return;
      }
      ye({
        videoTimelineClips: vt
      });
    }, [Q, h, W, ye]),
    De = g.useCallback(() => {
      if (Q.length === 0) return;
      const Ge = cbo(Q, h, () => L0n());
      if (!Ge) {
        Ai("info", "切割位置需距离片段两端至少 1 秒", 1800);
        return;
      }
      u(Ge.activeClipId), ye({
        videoTimelineClips: Ge.clips,
        videoTimelineActiveClipId: Ge.activeClipId,
        videoTimelineCurrentTime: h
      });
    }, [Q, h, ye]),
    Ye = g.useCallback((Ge = d) => {
      var gt;
      if (!Ge) return !1;
      const Oe = Q.findIndex(Ut => Ut.id === Ge);
      if (Oe < 0) return !1;
      const st = Q.filter(Ut => Ut.id !== Ge),
        vt = st[Math.min(Oe, Math.max(0, st.length - 1))] || null,
        Ht = new Set(st.map(Ut => Ut.sourceId)),
        nn = l.sources.filter(Ut => Ht.has(Ut.id)),
        pt = BW(st),
        lt = Math.min(h, Math.max(0, pt - .001));
      return f(!1), (gt = T.current) == null || gt.pause(), u((vt == null ? void 0 : vt.id) || null), p(lt), ye({
        videoTimelineSources: nn,
        videoTimelineClips: st,
        videoTimelineActiveClipId: (vt == null ? void 0 : vt.id) || null,
        videoTimelineCurrentTime: lt,
        ...(st.length === 0 ? {
          videoTimelinePreviewOpen: !1
        } : {})
      }), !0;
    }, [d, Q, h, l.sources, ye]),
    Ce = g.useCallback((Ge, Oe, st) => {
      var Ut;
      const vt = Q.find(_t => _t.id === Ge),
        Ht = vt ? W.get(vt.sourceId) : null;
      if (!vt || !Ht) return;
      const nn = u$t(vt, Oe, st, Ht.duration);
      if (!nn || nn.sourceStart === vt.sourceStart && nn.sourceEnd === vt.sourceEnd) return;
      f(!1), (Ut = T.current) == null || Ut.pause();
      const pt = Q.map(_t => _t.id === Ge ? nn : _t),
        lt = BW(pt),
        gt = Math.min(h, Math.max(0, lt - .001));
      p(gt), ye({
        videoTimelineClips: pt,
        videoTimelineCurrentTime: gt
      });
    }, [Q, h, W, ye]),
    He = g.useCallback((Ge, Oe) => {
      const st = Avr(Q, Ge, Oe);
      st !== Q && (u(Ge), ye({
        videoTimelineClips: st,
        videoTimelineActiveClipId: Ge
      }));
    }, [Q, ye]);
  g.useEffect(() => {
    if (!r && !l.workspaceOpen) return;
    const Ge = Oe => {
      var pt, lt, gt;
      if (dvo(Oe.target)) return;
      const st = Oe.key.toLowerCase();
      if ((Oe.ctrlKey || Oe.metaKey) && !Oe.altKey && (st === "z" || st === "y")) {
        Oe.preventDefault(), Oe.stopImmediatePropagation();
        st === "y" || Oe.shiftKey ? redoTimelineEdit() : undoTimelineEdit();
        return;
      }
      const vt = st === "b" && (Oe.ctrlKey || Oe.metaKey) && !Oe.altKey,
        Ht = (st === "c" || st === "b") && !Oe.ctrlKey && !Oe.metaKey && !Oe.altKey;
      if ((vt || Ht) && (Oe.preventDefault(), Oe.stopPropagation(), f(!1), (pt = T.current) == null || pt.pause(), De()), (st === "i" || st === "q") && !Oe.ctrlKey && !Oe.metaKey && (Oe.preventDefault(), f(!1), (lt = T.current) == null || lt.pause(), Xe("start")), (st === "o" || st === "w") && !Oe.ctrlKey && !Oe.metaKey && (Oe.preventDefault(), f(!1), (gt = T.current) == null || gt.pause(), Xe("end")), st === "n" && !Oe.ctrlKey && !Oe.metaKey && !Oe.altKey && (Oe.preventDefault(), M(Ut => !Ut)), l.workspaceOpen && (Oe.ctrlKey || Oe.metaKey) && !Oe.altKey && (Oe.key === "=" || Oe.key === "+" || Oe.key === "-")) {
        Oe.preventDefault(), Ee(e3t(w, Oe.key === "-" ? "out" : "in", LW, OW));
        return;
      }
      if ((Oe.key === "Home" || Oe.key === "End") && Q.length > 0) {
        Oe.preventDefault(), Me(Oe.key === "Home" ? 0 : q, !0);
        return;
      }
      const nn = lbo(Oe);
      if (nn != null && Q.length > 0) {
        if (Oe.preventDefault(), Oe.altKey && pe && (Oe.key === "ArrowLeft" || Oe.key === "ArrowRight")) {
          W.get(pe.sourceId) && Ce(pe.id, nn < 0 ? "start" : "end", (nn < 0 ? pe.sourceStart : pe.sourceEnd) + nn);
          return;
        }
        Me(h + nn, !0);
        return;
      }
      if ((Oe.key === "Delete" || Oe.key === "Backspace") && d) {
        Oe.preventDefault(), Oe.stopImmediatePropagation(), Ye();
        return;
      }
      Oe.code === "Space" && (Oe.preventDefault(), Le());
    };
    return window.addEventListener("keydown", Ge, !0), () => {
      window.removeEventListener("keydown", Ge, !0);
    };
  }, [pe, d, Q, h, Ye, q, Ee, l.workspaceOpen, Me, r, Xe, W, De, Le, Ce, w, undoTimelineEdit, redoTimelineEdit]);
  const Ve = g.useCallback(() => {
      if (!ce) return;
      const Ge = ce.width > 0 && ce.height > 0 ? ce.width / ce.height : 16 / 9;
      d8i({
        nodeId: e.id,
        aspectRatio: Ge,
        previewWidthRatio: Ge < .85 ? .55 : .78
      });
    }, [ce, e.id]),
    it = g.useCallback(async (format = "mp4") => {
      var Ge;
      if (!(C || Q.length === 0)) {
        f(!1), (Ge = T.current) == null || Ge.pause(), I(!0), Ai("info", `正在合并 ${Q.length} 个时间线片段…`, 2400);
        try {
          const Oe = l.sources.map(vt => {
              const Ht = W.get(vt.id),
                nn = vt.sourceNodeId ? t.find(pt => pt.id === vt.sourceNodeId) : void 0;
              return {
                ...Ht,
                ...vt,
                url: lvo(vt, nn, Ht)
              };
            }),
            st = await svo({
              clips: Q,
              sources: Oe,
              suggestedName: e.nodeName || e.videoFileName || "剪辑时间线",
              format
            });
          st.cancelled || Ai("success", `时间线已合并导出：${st.result.fileName}（${st.result.clipCount} 个片段）`, 4200);
        } catch (Oe) {
          const st = Oe instanceof Error ? Oe.message : String(Oe || "时间线导出失败");
          console.error("[VideoTimeline] merged export failed:", Oe), Ai("error", st, 5200);
        } finally {
          I(!1);
        }
      }
    }, [Q, C, e.nodeName, e.videoFileName, t, l.sources, W]),
    It = g.useCallback(Ge => {
      var st;
      Ge.preventDefault(), Ge.stopPropagation();
      const Oe = (st = Ge.dataTransfer.files) == null ? void 0 : st[0];
      Oe && ke(Oe);
    }, [ke]),
    Ft = X && X.width > 0 && X.height > 0 ? X.width / X.height : 16 / 9,
    We = Ft < .85 ? "55%" : "78%";
  return c.jsxs("div", {
    className: `video-timeline-node ${n ? "is-dark" : "is-light"} ${r ? "is-selected" : ""}`,
    style: {
      "--video-timeline-preview-width": We
    },
    onPointerDownCapture: Ge => {
      var st;
      i(), !Ge.target.closest(".video-timeline-clip, .video-timeline-player, .video-timeline-tools, .video-timeline-ruler, button") && (u(null), f(!1), (st = T.current) == null || st.pause(), l.previewOpen && ye({
        videoTimelinePreviewOpen: !1
      }));
    },
    onDrop: It,
    onDragOver: Ge => {
      Ge.preventDefault(), Ge.stopPropagation(), Ge.dataTransfer.dropEffect = "copy";
    },
    children: [c.jsx("input", {
      ref: ue,
      className: "hidden",
      type: "file",
      accept: "video/*,audio/*,.mp4,.webm,.mov,.avi,.mkv,.flv,.ogg,.m4v,.wav,.mp3,.m4a,.aac,.oga,.flac,.opus",
      onChange: ge
    }), !l.workspaceOpen && r && X && l.previewOpen ? c.jsx(C0n, {
      mediaKind: X.kind || "video",
      videoRef: T,
      src: X.previewUrl || X.url,
      fallbackSrc: X.previewUrl ? X.url : void 0,
      poster: X.posterUrl || e.videoPosterUrl,
      aspectRatio: Ft,
      currentTime: h,
      duration: q,
      playing: m,
      muted: l.muted,
      objectFit: l.objectFit,
      onLoadedMetadata: nt,
      onTimeUpdate: Ke,
      onEnded: () => {
        V.current && pe && ze(pe.id);
      },
      onTogglePlay: Le,
      onToggleMuted: () => {
        const Ge = !l.muted;
        T.current && (T.current.muted = Ge), ye({
          videoTimelineMuted: Ge
        });
      },
      onFitToViewport: Ve,
      onClose: () => {
        var Ge;
        f(!1), b(null), (Ge = T.current) == null || Ge.pause(), ye({
          videoTimelinePreviewOpen: !1
        });
      }
    }) : null, Q.length === 0 ? c.jsxs("div", {
      className: "video-timeline-empty",
      children: [c.jsx("span", {
        className: "video-timeline-empty__ruler",
        "aria-hidden": !0,
        children: Array.from({
          length: 10
        }, (Ge, Oe) => c.jsxs("span", {
          style: {
            left: `${Oe * 10}%`
          },
          children: ["00:", String(Oe * 2).padStart(2, "0")]
        }, Oe))
      }), c.jsxs("span", {
        className: "video-timeline-empty__content",
        children: [c.jsx("button", {
          type: "button",
          className: "video-timeline-empty__plus",
          onClick: ve,
          disabled: _e,
          "aria-label": x("从画布选取视频"),
          title: x("从画布选取视频"),
          children: _e ? c.jsx(Ua, {
            size: 19,
            className: "animate-spin"
          }) : c.jsx(eo, {
            size: 20
          })
        }), c.jsx("span", {
          children: x(_e ? "正在载入视频..." : "轻点 + 在画布上选取视频")
        }), c.jsx("button", {
          type: "button",
          className: "video-timeline-empty__workspace",
          onClick: Te,
          children: x("全部编辑")
        })]
      })]
    }) : l.workspaceOpen ? c.jsx("div", {
      className: "video-timeline-empty",
      children: c.jsx("span", {
        className: "video-timeline-empty__content",
        children: x("正在全部编辑")
      })
    }) : c.jsxs(c.Fragment, {
      children: [r ? c.jsxs("div", {
        className: "video-timeline-tools nodrag nowheel nopan",
        "data-video-timeline-interactive": !0,
        "aria-label": x("时间线工具"),
        children: [c.jsx("button", {
          type: "button",
          onClick: Te,
          title: x("全部编辑"),
          "aria-label": x("全部编辑"),
          children: c.jsx(kT, {
            size: 24,
            strokeWidth: 1.65
          })
        }), c.jsx("button", {
          type: "button",
          onClick: De,
          disabled: !ne,
          title: x(ne ? "切割（C）" : "切割位置小于1秒"),
          "aria-label": x(ne ? "切割" : "切割位置小于1秒"),
          children: c.jsx(Sf, {
            size: 24,
            strokeWidth: 1.65
          })
        }), c.jsx("button", {
          type: "button",
          onClick: () => void it(),
          disabled: C,
          title: x(C ? "正在合并时间线…" : "导出合并时间线"),
          "aria-label": x(C ? "正在合并时间线" : "导出合并时间线"),
          children: C ? c.jsx(Ua, {
            size: 24,
            strokeWidth: 1.65,
            className: "animate-spin"
          }) : c.jsx(ws, {
            size: 24,
            strokeWidth: 1.65
          })
        })]
      }) : null, c.jsx(T0n, {
        clips: Q,
        sources: K,
        thumbnails: re,
        generatingIds: fe,
        activeClipId: r ? d : null,
        currentTime: h,
        pixelsPerSecond: v,
        precise: E,
        playing: m,
        interactive: r && s !== "low",
        onSeek: rt,
        onScrubStart: Re,
        onScrub: $e,
        onHoverTime: xe,
        onSelectClip: u,
        fallbackPoster: (ce == null ? void 0 : ce.posterUrl) || e.videoPosterUrl,
        onZoom: be,
        zoomMin: JSt,
        zoomMax: i3t,
        onTrimClip: Ce,
        onReorderClips: He,
        onDeleteClip: Ye,
        onAddSource: ve
      })]
    }), l.workspaceOpen ? c.jsx(Qbo, {
      open: !0,
      pickingCanvas: A,
      title: e.nodeName || x("时间线"),
      targetNodeId: e.id,
      nodes: t,
      sources: K,
      duration: q,
      currentTime: h,
      pixelsPerSecond: w,
      minPixelsPerSecond: LW,
      maxPixelsPerSecond: OW,
      canSplit: ne,
      canTrimStart: le,
      canTrimEnd: J,
      canDelete: !!pe,
      snapEnabled: !E,
      muted: l.muted,
      exporting: C,
      onClose: Ne,
      onExport: () => void it(),
      onExportAudio: () => void it("wav"),
      canUndoTimeline: timelineHistory.current.past.length > 0,
      canRedoTimeline: timelineHistory.current.future.length > 0,
      onUndoTimeline: undoTimelineEdit,
      onRedoTimeline: redoTimelineEdit,
      onSplit: De,
      onTrimStart: () => Xe("start"),
      onTrimEnd: () => Xe("end"),
      onDelete: () => Ye(),
      onToggleSnap: () => M(Ge => !Ge),
      onToggleMuted: () => {
        const Ge = !l.muted;
        T.current && (T.current.muted = Ge), ye({
          videoTimelineMuted: Ge
        });
      },
      onZoom: Ee,
      onAddFile: () => {
        var Ge;
        return (Ge = ue.current) == null ? void 0 : Ge.click();
      },
      onPickCanvas: ve,
      onAddSource: Ae,
      onPreviewFullscreen: Ge => {
        L.current = Ge;
      },
      preview: X ? c.jsx(C0n, {
        videoRef: T,
        variant: "workspace",
        mediaKind: X.kind || "video",
        src: X.previewUrl || X.url,
        fallbackSrc: X.previewUrl ? X.url : void 0,
        poster: X.posterUrl || e.videoPosterUrl,
        aspectRatio: Ft,
        currentTime: h,
        duration: q,
        playing: m,
        muted: l.muted,
        objectFit: l.objectFit,
        onLoadedMetadata: nt,
        onTimeUpdate: Ke,
        onEnded: () => {
          V.current && pe && ze(pe.id);
        },
        onTogglePlay: Le,
        onToggleMuted: () => {
          const Ge = !l.muted;
          T.current && (T.current.muted = Ge), ye({
            videoTimelineMuted: Ge
          });
        },
        onFitToViewport: Ve,
        onClose: Ne,
        onToggleFullscreen: () => L.current()
      }) : c.jsx("div", {
        className: "video-timeline-workspace__preview-empty",
        children: x("从左侧添加画布素材")
      }),
      track: c.jsx(T0n, {
        clips: Q,
        sources: K,
        thumbnails: re,
        generatingIds: fe,
        activeClipId: d,
        currentTime: h,
        pixelsPerSecond: w,
        precise: E,
        playing: m,
        interactive: !0,
        density: "workspace",
        zoomMin: LW,
        zoomMax: OW,
        onSeek: rt,
        onScrubStart: Re,
        onScrub: $e,
        onHoverTime: xe,
        onSelectClip: u,
        fallbackPoster: (ce == null ? void 0 : ce.posterUrl) || e.videoPosterUrl,
        onZoom: Ee,
        onTrimClip: Ce,
        onReorderClips: He,
        onDeleteClip: Ye,
        onAddSource: ve,
        onDropAsset: Ge => {
          const Oe = t.find(st => st.id === Ge);
          Oe && p$t(Oe, document.querySelector(`.node-wrapper[data-node-id="${Ge}"]`)).then(Ae).catch(st => {
            Ai("error", st instanceof Error ? st.message : "无法添加这个素材", 2600);
          });
        }
      })
    }) : null, A ? c.jsxs(c.Fragment, {
      children: [l.workspaceOpen ? null : c.jsxs("div", {
        className: "video-timeline-pick-hint",
        "aria-hidden": !0,
        children: [c.jsx("strong", {
          children: x("选择要添加的片段")
        }), c.jsxs("span", {
          children: [c.jsx("kbd", {
            children: "ESC"
          }), x(" 退出")]
        })]
      }), c.jsx(Ubo, {
        targetNodeId: e.id,
        nodes: t,
        onCancel: me,
        onPick: Ae
      })]
    }) : null, c.jsxs("span", {
      className: "video-timeline-node__shortcut",
      "aria-hidden": !0,
      children: [c.jsx(wb, {
        size: 11
      }), x(" Space 播放 · Ctrl+B / C 切片 · Q/W 入出点 · N 吸附 · ←→ 1秒")]
    })]
  });
}

const hvo = g.memo(uvo, (e, t) => e.node === t.node && e.isDark === t.isDark && e.selected === t.selected && e.displayQuality === t.displayQuality && e.updateNode === t.updateNode && e.setConnections === t.setConnections && e.onDownloadFile === t.onDownloadFile);

function H$e(e, t) {
  return uf(e, t).slice(0, 1200);
}

function pvo(e) {
  const t = e.settings || {};
  return H$e(t.text || e.prompt || e.content, "点击节点编辑文字");
}

function mvo(e) {
  const t = e.settings || {};
  return H$e(t.outputContent || t.userPrompt || t.systemPrompt || e.prompt, "点击节点配置 Agent");
}

function fvo(e) {
  var r;
  const t = e.settings || {},
    n = Array.isArray(e.frames) ? e.frames : [];
  return Ay(e.videoPosterUrl, typeof t.videoPosterUrl == "string" ? t.videoPosterUrl : "", e.thumbnailUrl, (r = n[0]) == null ? void 0 : r.url);
}

function gvo({
  node: e,
  isDark: t,
  kind: n
}) {
  var d;
  on();
  const r = t ? "bg-[#1f1f1f] text-zinc-200" : "bg-white text-zinc-800";
  if (n === "video-input") {
    const u = fvo(e),
      h = Array.isArray(e.frames) ? e.frames.length : 0,
      p = (d = e.videoMeta) == null ? void 0 : d.duration,
      m = [typeof p == "number" && Number.isFinite(p) ? `${p.toFixed(1)}s` : "", h > 0 ? `${h} 帧` : ""].filter(Boolean).join(" · ");
    return c.jsxs("div", {
      "data-canvas-idle-node-shell": "video-input",
      className: `relative h-full w-full overflow-hidden rounded-2xl pointer-events-auto ${r}`,
      children: [c.jsx(Tpe, {
        src: u,
        isDark: t,
        nodeType: "video-input",
        nodeId: e.id,
        worldWidth: e.width,
        worldHeight: e.height,
        emptyHint: "点击节点查看视频"
      }), c.jsxs("div", {
        className: `pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-3 py-2 text-[11px] ${t ? "bg-black/70 text-zinc-200" : "bg-white/85 text-zinc-700"}`,
        children: [c.jsx("span", {
          className: "truncate",
          children: H$e(e.nodeName, "视频输入")
        }), m ? c.jsx("span", {
          className: "shrink-0 opacity-75",
          children: m
        }) : null]
      })]
    });
  }
  const a = n === "agent",
    i = H$e(e.nodeName, a ? "Agent" : "文字"),
    o = a ? mvo(e) : pvo(e),
    s = e.settings || {},
    l = Array.isArray(s.inputItemOrder) ? s.inputItemOrder.length : 0;
  return c.jsxs("div", {
    "data-canvas-idle-node-shell": n,
    className: `relative flex h-full w-full flex-col overflow-hidden rounded-2xl pointer-events-auto ${r}`,
    style: {
      contain: "layout paint style"
    },
    children: [c.jsxs("div", {
      className: `flex shrink-0 items-center justify-between gap-3 border-b px-3 py-2 text-[11px] ${t ? "border-white/10 text-zinc-400" : "border-zinc-200 text-zinc-500"}`,
      children: [c.jsx("span", {
        className: "truncate font-medium",
        children: i
      }), c.jsxs("span", {
        className: "shrink-0 opacity-70",
        children: [a ? "Agent" : x("文字"), l > 0 ? x(" · {0} 个引用", l) : ""]
      })]
    }), c.jsx("div", {
      className: `min-h-0 flex-1 overflow-hidden whitespace-pre-wrap break-words px-3 py-3 text-[13px] leading-5 ${t ? "text-zinc-300" : "text-zinc-700"}`,
      style: {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: Math.max(3, Math.min(12, Math.floor((e.height - 52) / 20)))
      },
      children: o
    })]
  });
}

function yvo(e, t) {
  return e.kind === t.kind && e.isDark === t.isDark && e.node.id === t.node.id && e.node.nodeName === t.node.nodeName && e.node.prompt === t.node.prompt && e.node.content === t.node.content && e.node.thumbnailUrl === t.node.thumbnailUrl && e.node.videoPosterUrl === t.node.videoPosterUrl && e.node.videoMeta === t.node.videoMeta && e.node.frames === t.node.frames && e.node.settings === t.node.settings && e.node.width === t.node.width && e.node.height === t.node.height;
}

const bvo = g.memo(gvo, yvo);

function vvo({
  props: e,
  contentServices: t,
  displayQuality: n
}) {
  var o, s;
  const {
      node: r
    } = e,
    {
      presentation: a,
      interaction: i
    } = gEe(t);
  switch (r.type) {
    case "video-timeline":
      return c.jsx(hvo, {
        node: r,
        nodes: e.nodes,
        isDark: a.isDark,
        displayQuality: n,
        selected: i.selectedNodeId === r.id || !!((o = i.selectedNodeIds) != null && o.has(r.id)),
        updateNode: e.updateNode,
        onRequestSelect: () => {
          var l, d;
          (l = e.setSelectedNodeId) == null || l.call(e, r.id), (d = e.setSelectedNodeIds) == null || d.call(e, new Set([r.id]));
        },
        setConnections: e.setConnections,
        onDownloadFile: e.onDownloadFile
      });
    case "video-input":
      return !!!(typeof r.content == "string" && r.content.trim() || Array.isArray(r.frames) && r.frames.length > 0) || r.extractingFrames === !0 || r.isGenerating === !0 || !e.boxSelectLightShell && i.selectedNodeId === r.id ? c.jsx(Uyo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode,
        frameSelectionRef: e.frameSelectionRef,
        setFrameContextMenu: e.setFrameContextMenu,
        renderQuality: n
      }) : c.jsx(bvo, {
        node: r,
        isDark: a.isDark,
        kind: "video-input"
      });
    case "video-analyze":
      return c.jsx(xyo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        apiConfigs: e.apiConfigs,
        generateId: e.generateId,
        handleGeneratePrompts: e.handleGeneratePrompts,
        handleAutoVideoAnalysis: e.handleAutoVideoAnalysis,
        activeDropdown: e.activeDropdown,
        setActiveDropdown: e.setActiveDropdown
      });
    case "shot-breakdown":
      return c.jsx(Iyo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        apiConfigs: e.apiConfigs,
        generateId: e.generateId,
        handleShotBreakdown: e.handleShotBreakdown,
        notifyCanvas: e.notifyCanvas,
        activeDropdown: e.activeDropdown,
        setActiveDropdown: e.setActiveDropdown
      });
    case "script-parse":
      return c.jsx(Nyo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode,
        apiConfigs: e.apiConfigs,
        handleScriptParse: e.handleScriptParse,
        handleScriptParseCompose: e.handleScriptParseCompose,
        handleScriptParseCreateGrid: e.handleScriptParseCreateGrid,
        notifyCanvas: e.notifyCanvas,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        setCharacterLibrary: e.setCharacterLibrary,
        activeDropdown: e.activeDropdown,
        setActiveDropdown: e.setActiveDropdown,
        isModelHiddenInList: e.isModelHiddenInList,
        selected: i.selectedNodeId === r.id && (((s = i.selectedNodeIds) == null ? void 0 : s.size) ?? 0) <= 1
      });
    case "storyboard-chart-node":
      return c.jsx(wyo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        connections: e.connections,
        nodes: e.nodes,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        getConnectedInputImages: e.getConnectedInputImages,
        getConnectedInputItems: e.getConnectedInputItems,
        generateChartBatch: e.generateChartBatch,
        generateFromScriptForChart: e.generateFromScriptForChart,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        generateId: e.generateId,
        renderQuality: n,
        chartArtStyles: e.chartArtStyles
      });
    case "storyboard-node":
      return c.jsx(fyo, {
        node: r,
        isDark: a.isDark,
        apiConfigs: e.apiConfigs,
        getConnectedVideoAnalyzeNode: e.getConnectedVideoAnalyzeNode,
        importShotsFromAnalysis: e.importShotsFromAnalysis,
        updateShot: e.updateShot,
        generateSingleShot: e.generateSingleShot,
        deleteShot: e.deleteShot,
        addEmptyShot: e.addEmptyShot,
        setLightboxItem: e.setLightboxItem,
        setLightboxOpen: e.setLightboxOpen,
        nodes: e.nodes,
        connections: e.connections,
        getConnectedInputImages: e.getConnectedInputImages,
        globalApiKey: e.globalApiKey,
        dataVersion: e.dataVersion,
        generateFromScript: e.generateFromScript,
        splitImageToShots: e.splitImageToShots,
        generateSequenceFromShot: e.generateSequenceFromShot,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        generateId: e.generateId,
        characterLibrary: e.characterLibrary,
        klingSubjectLibrary: e.klingSubjectLibrary,
        setKlingSubjectsOpen: e.setKlingSubjectsOpen,
        onDownloadStoryboardVideos: e.onDownloadStoryboardVideos,
        isDownloading: e.isDownloading,
        downloadProgress: e.downloadProgress,
        storyboardCanvasPickTarget: e.storyboardCanvasPickTarget,
        onStartStoryboardCanvasPick: e.onStartStoryboardCanvasPick,
        materialLibraryTree: e.materialLibraryTree,
        getMaterialLibraryPreviewUrl: e.getMaterialLibraryPreviewUrl
      });
    default:
      return null;
  }
}

const wvo = Object.freeze(Object.defineProperty({
    __proto__: null,
    StoryboardNodesGroup: vvo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  xvo = ({
    node: e,
    isDark: t,
    updateNode: n,
    setNodes: r,
    setConnections: a,
    apiConfigs: i
  }) => {
    var o, s;
    return on(), c.jsx("div", {
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto ${t ? "bg-[#1f1f1f]/80" : "bg-zinc-100"}`,
      children: c.jsxs("div", {
        className: "flex-1 flex flex-col p-3 overflow-hidden min-h-0 gap-2",
        children: [c.jsx("textarea", {
          "data-node-type": "novel-input",
          "data-node-id": e.id,
          "data-scrollable": "true",
          value: ((o = e.settings) == null ? void 0 : o.content) || e.prompt || "",
          onChange: l => {
            const d = l.target.value;
            d.length <= 1e4 && n(e.id, {
              settings: {
                ...(e.settings || {}),
                content: d
              },
              prompt: d
            });
          },
          placeholder: x("输入小说内容（最多10,000字）..."),
          maxLength: 1e4,
          className: `w-full h-full resize-none outline-none text-sm p-2 rounded border overflow-y-auto custom-scrollbar ${t ? "bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder-zinc-500" : "bg-white/80 border-zinc-300/80 text-zinc-800 placeholder-zinc-400"}`,
          onMouseDown: l => l.stopPropagation()
        }), c.jsxs("div", {
          className: "flex items-center justify-between gap-2 shrink-0",
          children: [c.jsxs("span", {
            className: "text-[10px] text-zinc-500",
            children: [(((s = e.settings) == null ? void 0 : s.content) || "").length.toLocaleString(), "/10,000"]
          }), c.jsx("button", {
            className: `flex-1 px-3 py-2 rounded text-xs font-medium transition-colors ${t ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`,
            onMouseDown: l => l.stopPropagation(),
            type: "button",
            onClick: () => {
              var m, f;
              const l = ((m = e.settings) == null ? void 0 : m.content) || e.prompt || "";
              if (!l || l.trim().length === 0) {
                alert(x("请先输入小说内容"));
                return;
              }
              const d = e.x + e.width + 100,
                u = e.y + e.height / 2,
                h = `node-${Date.now()}`,
                p = {
                  id: h,
                  type: "extract-characters-scenes",
                  x: d - 200,
                  y: u - 200,
                  width: 400,
                  height: 500,
                  settings: {
                    model: ((f = i.find(y => y.type === "Chat")) == null ? void 0 : f.id) || "",
                    content: l
                  }
                };
              r(y => [...y, p]), a(y => [...y, {
                id: `conn-${Date.now()}`,
                from: e.id,
                to: h
              }]);
            },
            children: x("提取角色和场景")
          })]
        })]
      })
    });
  },
  _vo = ({
    node: e,
    isDark: t,
    updateNode: n,
    setNodes: r,
    setConnections: a,
    apiConfigs: i,
    globalApiKey: o
  }) => {
    var l, d, u, h, p, m, f, y;
    on();
    const s = async () => {
      var v, _, w, k, A, S;
      const b = ((v = e.settings) == null ? void 0 : v.content) || "";
      if (!b || b.trim().length === 0) {
        alert(x("没有找到小说内容，请先连接小说输入节点"));
        return;
      }
      n(e.id, {
        settings: {
          ...e.settings,
          isAnalyzing: !0,
          progress: 0
        }
      });
      let nativeExtractionTimer;
      try {
        const C = ((_ = e.settings) == null ? void 0 : _.model) || ((w = i.find(O => O.type === "Chat")) == null ? void 0 : w.id) || "",
          I = i.find(O => O.id === C),
          E = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.isNativeChat(C) ? 'aiyouplus-native-transport' : (I == null ? void 0 : I.key) || o,
          M = ((I == null ? void 0 : I.url) || "https://ai.comfly.chat").replace(/\/+$/, "");
        if (!E) throw new Error("请先配置 API Key");
        const T = nativeExtractionTimer = setInterval(() => {
            var O;
            n(e.id, {
              settings: {
                ...e.settings,
                isAnalyzing: !0,
                progress: Math.min((((O = e.settings) == null ? void 0 : O.progress) || 0) + 10, 90)
              }
            });
          }, 500),
          P = await mx({
              modelId:C, format:'openai', baseUrl:M, apiKey:E,
              modelName: (I == null ? void 0 : I.modelName) || "gemini-3-pro-preview",
              messages: [{
                role: "system",
                content: '你是一个专业的小说分析助手。请分析以下小说内容，提取其中的角色和场景。以JSON格式返回，格式为：{"characters": [{"id": "char1", "name": "角色名", "role": "主角/配角/反派", "description": "仅据原文的外观或身份"}], "scenes": [{"id": "scene1", "name": "场景名", "description": "仅据原文的空间与环境"}]}'
              }, {
                role: "user",
                content: `请分析以下小说内容，提取角色和场景：

${b.substring(0, 1e4)}`
              }],
              stream: !1, temperature:.2, response_format:{type:'json_object'}
          });
        if (clearInterval(T), !P.ok) throw new Error(`API Error: ${P.status}`);
        const R = await P.json();
        let j = ((S = (A = (k = R.choices) == null ? void 0 : k[0]) == null ? void 0 : A.message) == null ? void 0 : S.content) || R.content || R.text || "",
          B = {
            characters: [],
            scenes: []
          };
        const resultJson = j.match(/\{[\s\S]*\}/);
        if (!resultJson) throw new Error('模型未返回角色/场景JSON，请检查原文后重试');
        try { B = JSON.parse(resultJson[0]); } catch { throw new Error('模型返回的角色/场景JSON无法解析，未创建空结果'); }
        if (!B || !Array.isArray(B.characters) || !Array.isArray(B.scenes)) throw new Error('角色/场景结果格式无效，未创建节点');
        for (const [kind, values] of Object.entries({characters:B.characters, scenes:B.scenes})) {
          if (values.length > 40 || values.some(value => !value || typeof value.name !== 'string' || !value.name.trim() || value.name.length > 120)) throw new Error('角色/场景名称缺失或数量超过40，未创建节点');
          values.forEach((value,index) => { value.id = String(value.id || kind+'-'+(index+1)); value.name = value.name.trim(); });
        }
        if (!B.characters.length && !B.scenes.length) throw new Error('模型未提取出角色或场景，未创建空结果');
        n(e.id, {
          settings: {
            ...e.settings,
            isAnalyzing: !1,
            progress: 100,
            analysisResults: B
          }
        });
        const F = e.x + e.width + 100,
          N = e.y,
          G = Date.now(),
          z = [],
          V = [];
        if (B.characters && B.characters.length > 0 && B.characters.forEach((O, L) => {
          const D = `node-char-desc-${G}-${L}`;
          z.push({
            id: D,
            type: "character-description",
            x: F,
            y: N + L * 450,
            width: 400,
            height: 400,
            content: "",
            prompt: "",
            settings: {
              characterId: O.id,
              characterName: O.name,
              role: O.role,
              description: O.description,
              duration: "15s",
              style: "none",
              mode: "video",
              prompt: `动漫风格，全身视角，名叫${O.name}的角色站在白色背景前，${O.description || ""}，正在用中文普通话面向镜头做自我介绍`
            }
          });
          const U = `node-char-video-${G}-${L}`;
          z.push({
            id: U,
            type: "generate-character-video",
            x: F + 420,
            y: N + L * 450,
            width: 400,
            height: 450,
            content: "",
            prompt: "",
            settings: {
              model: "sora-2",
              duration: "15s",
              ratio: "16:9"
            }
          });
          const H = `node-char-create-${G}-${L}`;
          z.push({
            id: H,
            type: "create-character",
            x: F + 840,
            y: N + L * 450,
            width: 350,
            height: 300,
            content: "",
            prompt: "",
            settings: {
              name: O.name,
              startSecond: 1,
              endSecond: 3
            }
          }), V.push({
            id: `conn-char-${G}-${L}`,
            from: e.id,
            to: D
          }), V.push({
            id: `conn-video-${G}-${L}`,
            from: D,
            to: U
          }), V.push({
            id: `conn-create-${G}-${L}`,
            from: U,
            to: H
          });
        }), B.scenes && B.scenes.length > 0) {
          const O = B.characters ? B.characters.length : 0;
          B.scenes.forEach((L, D) => {
            const U = `node-scene-desc-${G}-${D}`;
            z.push({
              id: U,
              type: "scene-description",
              x: F,
              y: N + (O + D) * 450,
              width: 400,
              height: 400,
              content: "",
              prompt: "",
              settings: {
                sceneId: L.id,
                sceneName: L.name,
                description: L.description,
                duration: "15s",
                style: "none",
                mode: "video",
                prompt: L.description || L.name
              }
            });
            const H = `node-scene-video-${G}-${D}`;
            z.push({
              id: H,
              type: "generate-scene-video",
              x: F + 420,
              y: N + (O + D) * 450,
              width: 400,
              height: 450,
              content: "",
              prompt: "",
              settings: {
                model: "sora-2",
                duration: "15s",
                ratio: "16:9"
              }
            });
            const Y = `node-scene-create-${G}-${D}`;
            z.push({
              id: Y,
              type: "create-scene",
              x: F + 840,
              y: N + (O + D) * 450,
              width: 350,
              height: 300,
              content: "",
              prompt: "",
              settings: {
                name: L.name,
                startSecond: 1,
                endSecond: 3
              }
            }), V.push({
              id: `conn-scene-${G}-${D}`,
              from: e.id,
              to: U
            }), V.push({
              id: `conn-scene-video-${G}-${D}`,
              from: U,
              to: H
            }), V.push({
              id: `conn-scene-create-${G}-${D}`,
              from: H,
              to: Y
            });
          });
        }
        z.length > 0 && (r(O => [...O, ...z]), a(O => [...O, ...V]));
      } catch (C) {
        clearInterval(nativeExtractionTimer);
        console.error("分析失败:", C), n(e.id, {
          settings: {
            ...e.settings,
            isAnalyzing: !1,
            progress: 0
          }
        }), alert(x("分析失败: {0}", C instanceof Error ? C.message : "未知错误"));
      }
    };
    return c.jsxs("div", {
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto ${t ? "bg-[#1f1f1f]/80" : "bg-zinc-100"}`,
      children: [c.jsxs("div", {
        className: `flex items-center gap-1.5 px-3 py-2 border-b text-xs font-semibold shrink-0 ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: [c.jsx(EP, {
          size: 12,
          className: "text-yellow-500"
        }), c.jsx("span", {
          children: x("提取角色和场景")
        })]
      }), c.jsxs("div", {
        className: "px-3 py-2 shrink-0",
        children: [c.jsx("div", {
          className: "text-[10px] text-zinc-500 mb-1",
          children: x("选择分析模型")
        }), c.jsx("select", {
          value: ((l = e.settings) == null ? void 0 : l.model) || "",
          onChange: b => n(e.id, {
            settings: {
              ...(e.settings || {}),
              model: b.target.value
            }
          }),
          className: `w-full px-2 py-1.5 rounded text-xs border ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
          onMouseDown: b => b.stopPropagation(),
          children: i.filter(b => b.type === "Chat").map(b => c.jsx("option", {
            value: b.id,
            children: Wqe(b.provider, b.id)
          }, b.id))
        })]
      }), c.jsx("div", {
        className: "flex-1 overflow-auto p-3 min-h-0",
        children: (d = e.settings) != null && d.analysisResults ? (() => {
          const b = e.settings.analysisResults;
          return c.jsxs(c.Fragment, {
            children: [b.characters && b.characters.length > 0 && c.jsxs("div", {
              className: "mb-3",
              children: [c.jsxs("div", {
                className: "text-[10px] font-medium mb-1 text-zinc-500",
                children: [x("角色 ("), b.characters.length, ")"]
              }), b.characters.map((v, _) => c.jsx("div", {
                className: `p-2 rounded mb-1 ${t ? "bg-zinc-800" : "bg-zinc-50"}`,
                children: c.jsxs("div", {
                  className: "flex items-center gap-1",
                  children: [c.jsx("span", {
                    className: `w-2 h-2 rounded-full shrink-0 ${_ === 0 ? "bg-red-500" : _ === 1 ? "bg-purple-500" : "bg-blue-500"}`
                  }), c.jsxs("span", {
                    className: "text-[11px]",
                    children: [v.name, " (", v.role || x("未知"), ")"]
                  })]
                })
              }, v.id))]
            }), b.scenes && b.scenes.length > 0 && c.jsxs("div", {
              children: [c.jsxs("div", {
                className: "text-[10px] font-medium mb-1 text-zinc-500",
                children: [x("场景 ("), b.scenes.length, ")"]
              }), b.scenes.map(v => c.jsx("div", {
                className: `p-2 rounded mb-1 ${t ? "bg-zinc-800" : "bg-zinc-50"}`,
                children: c.jsxs("div", {
                  className: "flex items-center gap-1",
                  children: [c.jsx("span", {
                    className: "w-2 h-2 rounded-full bg-green-500 shrink-0"
                  }), c.jsx("span", {
                    className: "text-[11px]",
                    children: v.name
                  })]
                })
              }, v.id))]
            })]
          });
        })() : c.jsxs("div", {
          className: "flex flex-col items-center justify-center flex-1 gap-2 text-[11px] text-zinc-500 h-full",
          children: [c.jsx(EP, {
            size: 24,
            className: "text-zinc-400"
          }), c.jsx("span", {
            children: x('点击"提取"按钮开始分析')
          })]
        })
      }), c.jsxs("div", {
        className: `px-3 py-2 border-t shrink-0 ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: [!!((u = e.settings) != null && u.isAnalyzing) && c.jsxs("div", {
          className: "mb-2",
          children: [c.jsx("div", {
            className: "text-[10px] mb-1 text-zinc-500",
            children: x("正在分析小说内容...")
          }), c.jsx("div", {
            className: `w-full h-1.5 rounded-full overflow-hidden ${t ? "bg-zinc-800" : "bg-zinc-200"}`,
            children: c.jsx("div", {
              className: "h-full bg-blue-500 transition-all duration-300",
              style: {
                width: `${((h = e.settings) == null ? void 0 : h.progress) || 0}%`
              }
            })
          }), c.jsxs("div", {
            className: "text-[10px] text-zinc-500 mt-1",
            children: [((p = e.settings) == null ? void 0 : p.progress) || 0, x("% 完成")]
          })]
        }), c.jsx("button", {
          id: `extract-button-${e.id}`,
          className: `w-full py-2 rounded text-xs font-medium transition-colors ${(m = e.settings) != null && m.isAnalyzing ? "bg-zinc-400 cursor-not-allowed text-white" : t ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"}`,
          disabled: !!((f = e.settings) != null && f.isAnalyzing),
          onMouseDown: b => b.stopPropagation(),
          onClick: s,
          children: (y = e.settings) != null && y.isAnalyzing ? x("分析中...") : x("提取")
        })]
      })]
    });
  },
  kvo = ({
    node: e,
    isDark: t,
    updateNode: n,
    setNodes: r,
    setConnections: a,
    apiConfigs: i,
    globalApiKey: o
  }) => {
    var k, A, S, C, I, E, M, T, P, R, j, B, F, N, G, z, V, O, L, D, U, H, Y, K, W;
    on();
    const s = e.type === "character-description",
      l = s ? "角色描述" : "场景描述",
      d = g.useRef(null),
      u = g.useRef(null),
      referenceSettings = g.useRef(e.settings);
    referenceSettings.current = e.settings;
    const addReferenceFiles = async files => {
      const current = referenceSettings.current || {}, existing = current.referenceImages || [];
      const selected = files.filter(file => file?.type?.startsWith("image/")).slice(0, Math.max(0, 4 - existing.length));
      const cached = await Promise.all(selected.map(aiyouCacheReferenceImage));
      const latest = referenceSettings.current || {}, refs = latest.referenceImages || [], ids = latest._referenceImageAssetIds || [];
      const room = Math.max(0, 4 - refs.length), accepted = cached.slice(0, room);
      const settings = {...latest, referenceImages:[...refs, ...accepted.map(item=>item.url)], _referenceImageAssetIds:[...refs.map((_, index)=>ids[index] || ""), ...accepted.map(item=>item.assetId)]};
      referenceSettings.current = settings;
      n(e.id, {settings});
    };
    g.useEffect(() => {
      const Q = async q => {
        var X, Z;
        if (!u.current) return;
        const ne = document.activeElement;
        if (!(u.current === ne || u.current.contains(ne))) return;
        console.log("[DescriptionNode] Global paste event triggered");
        const J = Array.from(((X = q.clipboardData) == null ? void 0 : X.items) || []).filter(re => re.type && re.type.startsWith("image/"));
        if (console.log("[DescriptionNode] Found image items:", J.length), J.length === 0) {
          console.log("[DescriptionNode] No image items in clipboard");
          return;
        }
        q.preventDefault(), q.stopPropagation();
        const pe = ((Z = e.settings) == null ? void 0 : Z.referenceImages) || [],
          ce = Math.max(0, 4 - pe.length),
          we = J.slice(0, ce);
        if (we.length === 0) {
          console.log("[DescriptionNode] Already have 4 images, cannot add more");
          return;
        }
        console.log("[DescriptionNode] Processing", we.length, "images");
        try {
          await addReferenceFiles(we.map(item => item.getAsFile()).filter(Boolean));
        } catch (re) {
          console.error("[DescriptionNode] Failed to process images:", re);
        }
      };
      return document.addEventListener("paste", Q), () => {
        document.removeEventListener("paste", Q);
      };
    }, [e.id, e.settings, n]);
    const h = [{
        value: "none",
        label: "无"
      }, {
        value: "2d-anime",
        label: "2D动漫"
      }, {
        value: "3d-anime",
        label: "3D动漫"
      }, {
        value: "realistic",
        label: "写实"
      }, {
        value: "selfie",
        label: "自拍"
      }, {
        value: "news",
        label: "新闻"
      }, {
        value: "manga",
        label: "漫画"
      }],
      p = ["10s", "15s"],
      m = Q => {
        switch (Q) {
          case "2d-anime":
            return "2D动漫风格";
          case "3d-anime":
            return "3D动漫风格";
          case "realistic":
            return "写实风格";
          case "selfie":
            return "自拍风格";
          case "news":
            return "新闻风格";
          case "manga":
            return "漫画风格";
          default:
            return "动漫风格";
        }
      },
      f = s ? `动漫风格，全身视角，名叫${((k = e.settings) == null ? void 0 : k.characterName) || "{角色名}"}的角色站在白色背景前，${((A = e.settings) == null ? void 0 : A.description) || ""}，正在用中文普通话面向镜头做自我介绍` : ((S = e.settings) == null ? void 0 : S.description) || "",
      y = Q => {
        if (!Q) return "";
        let q = Q.replace(/["'""「」](.*?)[^,，。；！？、\s]["'""「」]/g, "");
        return q = q.replace(/利用《.*?》游戏.*?/g, ""), q = q.replace(/内心(.*?)(?=[，。；！？、\s])/g, ""), q = q.replace(/(推动|拉动|操作|转身|站立|走动|说|介绍|正在|负责|穿着|站在|面对|做)(.*?)(?=[，。；！？、\s])/g, ""), q = q.replace(/(天命杠杆|战舰|游戏|操作|控制|推进|推动|极低速度|以极低速度|最终|最后|现在|正在|目前|此前|起先|起初)/g, ""), q = q.replace(/，然后缓慢转一圈360度全方位展示身体/g, ""), q = q.replace(/(背景|场景|环境|建筑|地点|位置|周围|附近|后面|前面|旁边)(.*?)(?=[，。；！？、\s])/g, ""), q = q.replace(/，+/g, "，").replace(/^，|，$/g, "").trim(), q;
      },
      b = Q => {
        Q.preventDefault(), Q.stopPropagation();
        void addReferenceFiles(Array.from(Q.dataTransfer.files || [])).catch(error => { console.error("参考图保存失败:",error); alert(error.message); });
      },
      v = async Q => {
        Q.preventDefault(), Q.stopPropagation();
        try { await addReferenceFiles(Array.from(Q.clipboardData?.items || []).filter(item=>item.type.startsWith("image/")).map(item=>item.getAsFile()).filter(Boolean)); }
        catch(error) { console.error("参考图保存失败:",error); alert(error.message); }
      },
      _ = async () => {
        var le, J, pe, ce, we, X, Z;
        const Q = ((le = e.settings) == null ? void 0 : le.prompt) || f;
        if (!Q || Q.trim().length === 0) {
          alert(x("请先输入提示词"));
          return;
        }
        const q = ((J = e.settings) == null ? void 0 : J.chatModel) || ((pe = i.find(re => re.type === "Chat")) == null ? void 0 : pe.id);
        if (!q) {
          alert(x("请先选择大模型"));
          return;
        }
        const ne = i.find(re => re.id === q);
        if (!ne) {
          alert(x("未找到大模型配置"));
          return;
        }
        const de = ne.key || o;
        if (!de) {
          alert(x("请先配置API Key"));
          return;
        }
        n(e.id, {
          settings: {
            ...e.settings,
            isEnhancing: !0
          }
        });
        try {
          const re = (ne.url || "https://ai.comfly.chat").replace(/\/+$/, ""),
            fe = await fetch(`${re}/v1/chat/completions`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${de}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                model: ne.modelName || "gpt-5.5",
                messages: [{
                  role: "system",
                  content: "你是一个场景描述增强专家。请根据用户提供的场景描述，增加更多细节，包括环境氛围、光线、材质、色彩、空间布局等，但必须确保不包含任何人物、角色、字符。输出应详细且生动，只包含场景特征描述。"
                }, {
                  role: "user",
                  content: Q
                }],
                temperature: .7
              })
            });
          if (!fe.ok) throw new Error("增强场景描述失败");
          const ie = ((Z = (X = (we = (ce = (await fe.json()).choices) == null ? void 0 : ce[0]) == null ? void 0 : we.message) == null ? void 0 : X.content) == null ? void 0 : Z.trim()) || Q;
          n(e.id, {
            settings: {
              ...e.settings,
              prompt: ie,
              isEnhancing: !1
            }
          });
        } catch (re) {
          console.error("增强场景描述失败:", re), n(e.id, {
            settings: {
              ...e.settings,
              isEnhancing: !1
            }
          }), alert(x("增强场景描述失败，请重试"));
        }
      },
      w = () => {
        var ce, we, X, Z, re, fe, ye, ie, ae;
        const Q = ((ce = e.settings) == null ? void 0 : ce.mode) || "video",
          q = ((we = e.settings) == null ? void 0 : we.prompt) || f,
          ne = ((X = e.settings) == null ? void 0 : X.referenceImages) || [];
        if (!q.trim()) {
          alert(x("请输入提示词"));
          return;
        }
        if (Q === "image") {
          const be = e.x + e.width + 100,
            Ee = e.y + e.height / 2,
            xe = `node-${Date.now()}`,
            he = {
              id: xe,
              type: s ? "generate-character-image" : "generate-scene-image",
              x: be - 200,
              y: Ee - 200,
              width: 400,
              height: 450,
              settings: {
                model: ((Z = e.settings) == null ? void 0 : Z.imageModel) || ((re = i.find(ue => ue.type === "Image")) == null ? void 0 : re.id) || "",
                prompt: q,
                chatModel: (fe = e.settings) == null ? void 0 : fe.chatModel,
                ratio: ((ye = e.settings) == null ? void 0 : ye.imageRatio) || "16:9",
                resolution: ((ie = e.settings) == null ? void 0 : ie.imageResolution) || "2K",
                referenceImages: ne,
                _referenceImageAssetIds: e.settings?._referenceImageAssetIds || [],
                sourceType: e.type,
                sourceId: e.id
              }
            };
          r(ue => [...ue, he]), a(ue => [...ue, {
            id: `conn-${Date.now()}`,
            from: e.id,
            to: xe
          }]);
          return;
        }
        const de = e.x + e.width + 100,
          le = e.y + e.height / 2,
          J = `node-${Date.now()}`,
          pe = {
            id: J,
            type: s ? "generate-character-video" : "generate-scene-video",
            x: de - 200,
            y: le - 200,
            width: 400,
            height: 450,
            settings: {
              model: "sora-2",
              duration: ((ae = e.settings) == null ? void 0 : ae.duration) || "15s",
              ratio: "16:9",
              videoPrompt: q,
              referenceImages: ne,
                _referenceImageAssetIds: e.settings?._referenceImageAssetIds || [],
              sourceType: e.type,
              sourceId: e.id
            }
          };
        r(be => [...be, pe]), a(be => [...be, {
          id: `conn-${Date.now()}`,
          from: e.id,
          to: J
        }]);
      };
    return c.jsxs("div", {
      ref: d,
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto ${t ? "bg-[#1f1f1f]/80" : "bg-zinc-100"}`,
      children: [c.jsxs("div", {
        className: `flex items-center justify-between px-3 py-2 border-b text-xs font-semibold shrink-0 ${t ? "text-zinc-300 border-zinc-800" : "text-zinc-700 border-zinc-200"}`,
        children: [c.jsxs("div", {
          className: "flex items-center gap-1.5",
          children: [c.jsx(Hd, {
            size: 12,
            className: s ? "text-red-500" : "text-green-500"
          }), c.jsx("span", {
            children: x(l)
          })]
        }), s && ((C = e.settings) == null ? void 0 : C.characterName) && c.jsxs("div", {
          className: "text-[10px] text-zinc-500",
          children: [x("角色: "), (I = e.settings) == null ? void 0 : I.characterName]
        })]
      }), c.jsxs("div", {
        className: "flex-1 flex flex-col gap-2 p-3 overflow-hidden min-h-0",
        children: [c.jsxs("div", {
          className: "flex items-center gap-2 shrink-0",
          children: [c.jsx("button", {
            className: `px-2 py-1 rounded text-[10px] transition-colors ${(((E = e.settings) == null ? void 0 : E.mode) || "video") === "video" ? "bg-blue-500 text-white" : t ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`,
            onMouseDown: Q => Q.stopPropagation(),
            onClick: () => {
              var q;
              const Q = ((q = e.settings) == null ? void 0 : q.prompt) || f;
              if (s) {
                const ne = Q.includes("360度") ? Q : Q + "，然后缓慢转一圈360度全方位展示身体";
                n(e.id, {
                  settings: {
                    ...e.settings,
                    mode: "video",
                    prompt: ne
                  }
                });
              } else n(e.id, {
                settings: {
                  ...e.settings,
                  mode: "video"
                }
              });
            },
            children: x("视频模式")
          }), c.jsx("button", {
            className: `px-2 py-1 rounded text-[10px] transition-colors ${((M = e.settings) == null ? void 0 : M.mode) === "image" ? "bg-blue-500 text-white" : t ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`,
            onMouseDown: Q => Q.stopPropagation(),
            onClick: () => {
              var q;
              const Q = ((q = e.settings) == null ? void 0 : q.prompt) || f;
              if (s) {
                const ne = Q.replace(/，然后缓慢转一圈360度全方位展示身体/g, "");
                n(e.id, {
                  settings: {
                    ...e.settings,
                    mode: "image",
                    prompt: ne
                  }
                });
              } else n(e.id, {
                settings: {
                  ...e.settings,
                  mode: "image"
                }
              });
            },
            children: x("图片模式")
          })]
        }), c.jsxs("div", {
          className: "flex-1 flex flex-col gap-1 min-h-0",
          children: [c.jsxs("div", {
            className: "flex items-center justify-between shrink-0",
            children: [c.jsx("span", {
              className: "text-[10px] text-zinc-500",
              children: x("提示词")
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [!s && c.jsx("button", {
                className: "text-[10px] text-purple-500 hover:text-purple-400",
                onMouseDown: Q => Q.stopPropagation(),
                disabled: !!((T = e.settings) != null && T.isEnhancing),
                onClick: _,
                children: (P = e.settings) != null && P.isEnhancing ? x("增强中...") : x("增强提示词")
              }), c.jsx("button", {
                className: "text-[10px] text-blue-500 hover:text-blue-400",
                onMouseDown: Q => Q.stopPropagation(),
                disabled: !!((R = e.settings) != null && R.isFiltering),
                onClick: () => {
                  var q;
                  const Q = ((q = e.settings) == null ? void 0 : q.prompt) || f;
                  if (!Q) {
                    alert(x("请先输入提示词"));
                    return;
                  }
                  n(e.id, {
                    settings: {
                      ...e.settings,
                      isFiltering: !0
                    }
                  });
                  try {
                    const ne = y(Q);
                    n(e.id, {
                      settings: {
                        ...e.settings,
                        prompt: ne,
                        isFiltering: !1
                      }
                    });
                  } catch {
                    n(e.id, {
                      settings: {
                        ...e.settings,
                        isFiltering: !1
                      }
                    }), alert(x("过滤提示词失败"));
                  }
                },
                children: (j = e.settings) != null && j.isFiltering ? x("过滤中...") : x("过滤提示词")
              })]
            })]
          }), c.jsx("textarea", {
            value: ((B = e.settings) == null ? void 0 : B.prompt) || f,
            onChange: Q => {
              n(e.id, {
                settings: {
                  ...e.settings,
                  prompt: Q.target.value
                }
              });
            },
            placeholder: x("输入{0}描述...", s ? "角色" : "场景"),
            className: `flex-1 w-full p-2 rounded text-xs resize-none outline-none min-h-[80px] ${t ? "bg-zinc-800 text-zinc-200 placeholder-zinc-500 border border-zinc-700" : "bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-300"}`,
            style: {
              minHeight: "100px",
              maxHeight: "200px",
              overflowY: "auto",
              resize: "vertical"
            },
            onMouseDown: Q => Q.stopPropagation()
          })]
        }), (((F = e.settings) == null ? void 0 : F.mode) || "video") === "video" ? c.jsxs("div", {
          className: "flex items-center justify-between shrink-0",
          children: [c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: "text-[10px] text-zinc-500",
              children: x("时长")
            }), p.map(Q => {
              var q;
              return c.jsx("button", {
                className: `px-2 py-0.5 rounded text-[10px] ${(((q = e.settings) == null ? void 0 : q.duration) || "15s") === Q ? "bg-blue-500 text-white" : t ? "bg-zinc-800 text-zinc-400" : "bg-zinc-200 text-zinc-600"}`,
                onMouseDown: ne => ne.stopPropagation(),
                onClick: () => n(e.id, {
                  settings: {
                    ...e.settings,
                    duration: Q
                  }
                }),
                children: Q
              }, Q);
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: "text-[10px] text-zinc-500",
              children: x("风格")
            }), c.jsx("select", {
              value: ((N = e.settings) == null ? void 0 : N.style) || "none",
              onChange: Q => {
                var J;
                const q = Q.target.value,
                  ne = m(q),
                  le = (((J = e.settings) == null ? void 0 : J.prompt) || f).replace(/^[^，]+，/, `${ne}，`);
                n(e.id, {
                  settings: {
                    ...e.settings,
                    style: q,
                    prompt: le
                  }
                });
              },
              className: `px-2 py-0.5 rounded text-[10px] ${t ? "bg-zinc-800 text-zinc-300 border-zinc-700" : "bg-white text-zinc-700 border-zinc-300"} border`,
              onMouseDown: Q => Q.stopPropagation(),
              children: h.map(Q => c.jsx("option", {
                value: Q.value,
                children: x(Q.label)
              }, Q.value))
            })]
          })]
        }) : c.jsxs("div", {
          className: "flex flex-col gap-2 shrink-0",
          children: [c.jsxs("div", {
            children: [c.jsx("span", {
              className: "text-[10px] block mb-1 text-zinc-500",
              children: x("模型")
            }), c.jsxs("select", {
              value: ((G = e.settings) == null ? void 0 : G.imageModel) || "",
              onChange: Q => n(e.id, {
                settings: {
                  ...e.settings,
                  imageModel: Q.target.value
                }
              }),
              className: `w-full text-[10px] px-2 py-1 rounded border ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
              onMouseDown: Q => Q.stopPropagation(),
              children: [c.jsx("option", {
                value: "",
                children: x("选择模型")
              }), i.filter(Q => Q.type === "Image").map(Q => c.jsx("option", {
                value: Q.id,
                children: Yh(Q.provider)
              }, Q.id))]
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsxs("div", {
              className: "flex-1",
              children: [c.jsx("span", {
                className: "text-[10px] block mb-1 text-zinc-500",
                children: x("比例")
              }), c.jsxs("select", {
                value: ((z = e.settings) == null ? void 0 : z.imageRatio) || "16:9",
                onChange: Q => n(e.id, {
                  settings: {
                    ...e.settings,
                    imageRatio: Q.target.value
                  }
                }),
                className: `w-full text-[10px] px-2 py-1 rounded border ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                onMouseDown: Q => Q.stopPropagation(),
                children: [c.jsx("option", {
                  value: "Auto",
                  children: "Auto"
                }), c.jsx("option", {
                  value: "1:1",
                  children: "1:1"
                }), c.jsx("option", {
                  value: "16:9",
                  children: "16:9"
                }), c.jsx("option", {
                  value: "9:16",
                  children: "9:16"
                }), c.jsx("option", {
                  value: "4:3",
                  children: "4:3"
                }), c.jsx("option", {
                  value: "3:4",
                  children: "3:4"
                }), c.jsx("option", {
                  value: "21:9",
                  children: "21:9"
                }), c.jsx("option", {
                  value: "3:2",
                  children: "3:2"
                }), c.jsx("option", {
                  value: "2:3",
                  children: "2:3"
                })]
              })]
            }), c.jsxs("div", {
              className: "flex-1",
              children: [c.jsx("span", {
                className: "text-[10px] block mb-1 text-zinc-500",
                children: x("分辨率")
              }), c.jsxs("select", {
                value: ((V = e.settings) == null ? void 0 : V.imageResolution) || "2K",
                onChange: Q => n(e.id, {
                  settings: {
                    ...e.settings,
                    imageResolution: Q.target.value
                  }
                }),
                className: `w-full text-[10px] px-2 py-1 rounded border ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                onMouseDown: Q => Q.stopPropagation(),
                children: [c.jsx("option", {
                  value: "2K",
                  children: "2K"
                }), c.jsx("option", {
                  value: "4K",
                  children: "4K"
                })]
              })]
            })]
          })]
        }), c.jsxs("div", {
          className: "shrink-0",
          children: [c.jsxs("div", {
            className: "flex items-center justify-between mb-1",
            children: [c.jsx("span", {
              className: "text-[10px] text-zinc-500",
              children: x("参考图")
            }), c.jsx("button", {
              className: "text-[10px] text-blue-500 hover:text-blue-400",
              type: "button",
              onClick: Q => {
                var q;
                Q.stopPropagation(), (q = document.getElementById(`ref-upload-${e.id}`)) == null || q.click();
              },
              onMouseDown: Q => Q.stopPropagation(),
              children: x("+ 添加参考图")
            }), c.jsx("input", {
              id: `ref-upload-${e.id}`,
              type: "file",
              multiple: !0,
              accept: "image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg",
              className: "hidden",
              onChange: async Q => {
                const files = Array.from(Q.target.files || []);
                Q.target.value = "";
                try { await addReferenceFiles(files); }
                catch(error) { console.error("参考图保存失败:",error); alert(error.message); }
              }
            })]
          }), c.jsx("div", {
            ref: u,
            tabIndex: 0,
            className: `h-20 border rounded overflow-hidden flex items-center justify-center outline-none focus:ring-2 focus:ring-blue-500 ${t ? "border-zinc-700" : "border-zinc-300"}`,
            onClick: Q => {
              Q.stopPropagation(), Q.currentTarget.focus();
            },
            onPaste: v,
            onDragOver: Q => {
              Q.preventDefault(), Q.stopPropagation();
            },
            onDrop: b,
            onMouseDown: Q => {
              Q.currentTarget.focus();
            },
            children: (((O = e.settings) == null ? void 0 : O.referenceImages) || []).length > 0 ? c.jsx("div", {
              className: "flex gap-1 overflow-x-auto w-full h-full p-1",
              children: (((L = e.settings) == null ? void 0 : L.referenceImages) || []).map((Q, q) => c.jsxs("div", {
                className: "relative w-16 h-16 flex-shrink-0",
                children: [c.jsx("img", {
                  src: Q,
                  alt: `Reference ${q + 1}`,
                  className: "w-full h-full object-cover rounded",
                  onMouseDown: ne => ne.stopPropagation()
                }), c.jsx("button", {
                  className: "absolute top-0 right-0 bg-red-500 text-white text-[10px] p-0.5 rounded-bl",
                  onClick: ne => {
                    var le;
                    ne.stopPropagation();
                    const de = (((le = e.settings) == null ? void 0 : le.referenceImages) || []).filter((J, pe) => pe !== q);
                    n(e.id, {
                      settings: {
                        ...e.settings,
                        referenceImages: de,
                        _referenceImageAssetIds: (e.settings?._referenceImageAssetIds || []).filter((_, index) => index !== q)
                      }
                    });
                  },
                  onMouseDown: ne => ne.stopPropagation(),
                  children: "×"
                })]
              }, q))
            }) : c.jsx("span", {
              className: `text-xs ${t ? "text-zinc-400" : "text-zinc-500"}`,
              children: x("拖放图片到此处、点击添加，或 Ctrl+V 粘贴")
            })
          })]
        }), ((D = e.settings) == null ? void 0 : D.mode) === "image" && ((U = e.settings) == null ? void 0 : U.generatedImage) && c.jsxs("div", {
          className: "shrink-0",
          children: [c.jsxs("div", {
            className: "flex items-center justify-between mb-1",
            children: [c.jsx("span", {
              className: "text-[10px] text-zinc-500",
              children: x("生成结果")
            }), c.jsx("button", {
              className: "text-[10px] text-red-500 hover:text-red-400",
              onClick: Q => {
                Q.stopPropagation(), n(e.id, {
                  settings: {
                    ...e.settings,
                    generatedImage: void 0
                  }
                });
              },
              onMouseDown: Q => Q.stopPropagation(),
              children: x("清除")
            })]
          }), c.jsxs("div", {
            className: `relative h-32 border rounded overflow-hidden ${t ? "border-green-700 bg-green-900/20" : "border-green-300 bg-green-50"}`,
            children: [c.jsx("img", {
              src: (H = e.settings) == null ? void 0 : H.generatedImage,
              alt: "Generated",
              className: "w-full h-full object-contain",
              onMouseDown: Q => Q.stopPropagation()
            }), c.jsx("div", {
              className: "absolute bottom-1 right-1 text-[9px] text-green-500 bg-black/50 px-1 rounded",
              children: x("右键可发送到画布")
            })]
          })]
        })]
      }), c.jsx("div", {
        className: `px-3 py-2 border-t shrink-0 ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: c.jsx("button", {
          className: `w-full py-2 rounded text-xs font-medium text-white transition-colors ${(Y = e.settings) != null && Y.isGenerating ? "bg-zinc-500 cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"}`,
          onMouseDown: Q => Q.stopPropagation(),
          disabled: !!((K = e.settings) != null && K.isGenerating),
          onClick: Q => {
            Q.preventDefault(), Q.stopPropagation(), w();
          },
          children: ((W = e.settings) == null ? void 0 : W.mode) === "image" ? x(s ? "生成角色图片" : "生成场景图片") : x("生成视频")
        })
      })]
    });
  };

function m$t({
  isDark: e,
  textNodeCount: t = 0,
  agentNodeCount: n = 0,
  showPreview: r,
  onTogglePreview: a,
  showEye: i = !0,
  icon: o = "file",
  className: s = ""
}) {
  return on(), t <= 0 && n <= 0 ? null : c.jsxs("div", {
    className: `relative z-20 mb-2 flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] ${e ? "border-white/30 bg-transparent" : "border-blue-200 bg-blue-50"} ${s}`,
    children: [o === "emoji" ? c.jsx("span", {
      className: e ? "text-white" : "text-blue-500",
      children: "📝"
    }) : c.jsx(XE, {
      size: 12,
      className: e ? "text-white" : "text-blue-600"
    }), c.jsxs("span", {
      className: e ? "text-white" : "text-blue-700",
      children: [x("上游已连接:"), t > 0 && c.jsxs("span", {
        children: [x(" 文字节点("), t, x("个)")]
      }), t > 0 && n > 0 && c.jsx("span", {
        children: " + "
      }), n > 0 && c.jsxs("span", {
        children: [x(" Agent节点("), n, x("个)")]
      })]
    }), i ? c.jsx("button", {
      type: "button",
      className: `ml-auto flex shrink-0 items-center justify-center rounded p-0.5 transition-colors ${r ? e ? "bg-white/15 text-white" : "bg-blue-200 text-blue-800" : e ? "text-zinc-400 hover:bg-white/10 hover:text-white" : "text-blue-500 hover:bg-blue-100 hover:text-blue-700"}`,
      title: x(r ? "隐藏上游文字" : "查看上游文字"),
      onPointerDown: l => {
        l.stopPropagation(), l.preventDefault();
      },
      onClick: l => {
        l.stopPropagation(), a();
      },
      children: r ? c.jsx($d, {
        size: 12
      }) : c.jsx(ul, {
        size: 12
      })
    }) : null]
  });
}

function Avo(e) {
  return String((e == null ? void 0 : e.ratio) ?? "Auto");
}

function Svo(e) {
  return String((e == null ? void 0 : e.batchSize) ?? 1);
}

