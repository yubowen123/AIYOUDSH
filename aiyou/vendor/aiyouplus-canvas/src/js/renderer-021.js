function Lpr({
  sourceNode: e,
  connections: t,
  nodes: n,
  initialPreviewId: r
}) {
  const a = new Map(n.map(u => [String(u.id), u])),
    i = u => {
      var h;
      return typeof u == "string" && ((h = a.get(u)) == null ? void 0 : h.type) === "preview";
    },
    o = e.settings ?? {},
    s = [o.selectedPreviewId, r, o._autoCreatedPreviewId];
  for (const u of s) if (i(u)) return [u];
  const l = [];
  for (const u of t) u.from === e.id && i(u.to) ? l.push(u.to) : u.to === e.id && i(u.from) && l.push(u.from);
  const d = [...new Set(l)];
  return d.length > 0 ? [d[d.length - 1]] : [];
}

const DOi = 30 * 6e4;

function LOi(e) {
  const t = new Map();
  for (const n of e) {
    const r = que(n);
    if (!r) continue;
    const a = t.get(r);
    a ? a.push(n) : t.set(r, [n]);
  }
  return t;
}

function OOi(e, t, n, r, a = Date.now()) {
  var l, d, u, h, p;
  const i = new Map();
  for (const m of n) {
    if (m.status !== "completed" || m.type !== "image" || !m.sourceNodeId) continue;
    const f = Number(m.startTime || 0);
    if (!Number.isFinite(f) || f <= 0 || a - f > DOi) continue;
    const y = String(m.url || ((l = m.mjImages) == null ? void 0 : l.find(Boolean)) || m._ossRemoteUrl || m.thumbnailUrl || "").trim(),
      b = String(m.sourceNodeId);
    !y || i.has(b) || i.set(b, m);
  }
  if (i.size === 0) return e;
  const o = new Map(e.map((m, f) => [String(m.id), {
    node: m,
    index: f
  }]));
  let s;
  for (const [m, f] of i) {
    const y = o.get(m);
    if (!y || y.node.isGenerating || ((d = y.node.settings) == null ? void 0 : d.isGenerating) === !0) continue;
    const b = String(f.url || ((u = f.mjImages) == null ? void 0 : u.find(Boolean)) || f._ossRemoteUrl || f.thumbnailUrl || "").trim(),
      v = Lpr({
        sourceNode: y.node,
        connections: t,
        nodes: e
      });
    for (const _ of v) {
      const w = o.get(String(_));
      if (!w || w.node.type !== "preview" || String(w.node.content || "").trim()) continue;
      const k = `${f.id}:${_}`;
      r.has(k) || (r.add(k), s || (s = e.slice()), s[w.index] = {
        ...w.node,
        content: b,
        previewType: "image",
        previewMjImages: (h = f.mjImages) != null && h.length ? f.mjImages : void 0,
        selectedPreviewImage: ((p = f.mjImages) == null ? void 0 : p.find(Boolean)) || b
      });
    }
  }
  return s ?? e;
}

function BOi({
  history: e,
  connections: t,
  setNodes: n
}) {
  const r = g.useMemo(() => LOi(e), [e]),
    a = g.useRef(new Set());
  return g.useEffect(() => {
    const i = Date.now();
    n(o => OOi(o, t, e, a.current, i));
  }, [t, e, n]), r;
}

function FOi() {
  const [e, t] = g.useState(JHt),
    n = g.useCallback(() => {
      i9r().then(r => {
        r != null && r.length && t(r);
      });
    }, []);
  return g.useEffect(() => {
    n();
  }, [n]), g.useEffect(() => {
    const r = () => t(JHt());
    return window.addEventListener(amt, r), window.addEventListener(Tf, n), () => {
      window.removeEventListener(amt, r), window.removeEventListener(Tf, n);
    };
  }, [n]), [e, t];
}

function ahn(e) {
  try {
    const t = JSON.parse(localStorage.getItem(e) || "[]");
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}

function zOi() {
  const [e, t] = g.useState([]),
    [n, r] = g.useState(!1),
    [a, i] = g.useState(() => ahn(Zi.KLING_SUBJECTS)),
    [o, s] = g.useState(() => hyi(ahn(Zi.RH_APP_LIBRARY)));
  return g.useEffect(() => {
    let cancelled = !1;
    const l = window.setTimeout(async () => {
      const entries = r$a();
      await Ur.ensureManifestLoaded().catch(() => {});
      const restored = await Promise.all(entries.map(async entry => {
        if (!entry._assetId) return entry;
        const url = await Ur.getConvertFileSrcForAsset(entry._assetId).catch(() => null);
        if (url) return {...entry, imageUrl: url};
        const asset = await ni.getAssetRecord(entry._assetId).catch(() => null);
        return asset?.blob ? {...entry, imageUrl: URL.createObjectURL(asset.blob)} : entry;
      }));
      if (!cancelled) { t(restored); r(!0); }
    }, 7e3);
    return () => { cancelled = !0; window.clearTimeout(l); };
  }, []), {
    characterLibrary: e,
    setCharacterLibrary: t,
    characterLibraryLoaded: n,
    klingSubjectLibrary: a,
    setKlingSubjectLibrary: i,
    rhAppLibrary: o,
    setRhAppLibrary: s
  };
}

function UOi() {
  const [e, t] = g.useState("未命名项目"),
    [, n] = g.useState("未命名项目"),
    [r, a] = g.useState(!1),
    [i, o] = g.useState(!1),
    s = g.useRef(null),
    l = g.useRef(!1),
    d = g.useRef(e),
    u = g.useRef(() => {});
  g.useEffect(() => {
    l.current = r;
  }, [r]), g.useEffect(() => {
    d.current = e;
  }, [e]);
  const h = g.useCallback(() => {
    var m, f;
    if (!l.current) return;
    const p = (((m = s.current) == null ? void 0 : m.value) || d.current).trim() || "未命名项目";
    (f = s.current) == null || f.blur(), a(!1), o(!1), u.current(p);
  }, []);
  return {
    projectNameComprehensive: e,
    setProjectNameComprehensive: t,
    setProjectNameCompact: n,
    isEditingProjectName: r,
    setIsEditingProjectName: a,
    showNewProjectSaveHint: i,
    setShowNewProjectSaveHint: o,
    projectNameInputRef: s,
    isEditingProjectNameRef: l,
    syncProjectNameToManagerRef: u,
    finishEditingProjectName: h
  };
}

function ihn(e) {
  e && (e.preventDefault(), e.stopPropagation());
}

function $Oi() {
  return c.jsx(fdi, {
    children: c.jsx(GOi, {})
  });
}

function GOi() {
  const e = scr();
  g.useEffect(() => {
    if (typeof window > "u") return;
    const Xa = window,
      ao = () => {
        Ie(() => Promise.resolve().then(() => V2o), void 0, import.meta.url).then(Ys => Ys.preloadDirector3dAssets());
      };
    typeof Xa.requestIdleCallback == "function" ? Xa.requestIdleCallback(ao, {
      timeout: 6e3
    }) : setTimeout(ao, 3e3);
  }, []);
  const [t, n] = fC(Zi.THEME, "dark"),
    r = MS(u9().mode),
    a = (r == null ? void 0 : r.tone) ?? t,
    i = g.useCallback(Xa => {
      const ao = typeof Xa == "function" ? Xa(a) : Xa;
      r && yQ(ao), n(ao);
    }, [r, a, n]),
    {
      showCanvasGrid: o,
      setCanvasGridSpacing: s,
      setCanvasGridDotSize: l,
      effectiveCanvasGridSpacing: d,
      effectiveCanvasGridDotSize: u,
      showCanvasSnap: h,
      followDownstreamOnDrag: p,
      showCanvasMinimap: m,
      hideAllInputImagePreviews: f,
      showAllCanvasConnections: y,
      connectionHitWidth: b,
      setConnectionHitWidth: v,
      showAlignmentGuides: _,
      locateAnimationMaxNodes: w,
      setLocateAnimationMaxNodes: k,
      showCanvasBgGlow: A,
      showNodeDeleteButton: S,
      showStartGenerateButton: C,
      enableConnectWireTilt: I,
      enableConnectWireMarquee: E,
      enableGenerationConnectionFlow: M,
      generationConnectionFlowMode: T,
      enableGenerationNodeAnimation: P,
      generationNodeAnimationMode: R,
      showCanvasGenerationTimer: j,
      connectionLineStrokeWidth: B,
      setConnectionLineStrokeWidthRaw: F,
      connectionLineOpacityPercent: N,
      setConnectionLineOpacityPercentRaw: G,
      connectionLineColorDark: z,
      setConnectionLineColorDark: V,
      connectionLineColorLight: O,
      setConnectionLineColorLight: L,
      canvasBgColorLight: D,
      setCanvasBgColorLight: U,
      canvasBgColorDark: H,
      setCanvasBgColorDark: Y,
      handleCanvasGridToggle: K,
      handleCanvasSnapToggle: W,
      handleFollowDownstreamOnDragToggle: Q,
      handleCanvasMinimapToggle: q,
      handleShowAllCanvasConnectionsToggle: ne,
      handleHideAllInputImagePreviewsToggle: de,
      handleAlignmentGuidesToggle: le,
      handleCanvasBgGlowToggle: J,
      handleNodeDeleteButtonToggle: pe,
      handleStartGenerateButtonToggle: ce,
      handleEnableConnectWireTiltToggle: we,
      handleEnableConnectWireMarqueeToggle: X,
      handleEnableGenerationConnectionFlowToggle: Z,
      handleGenerationConnectionFlowModeChange: re,
      handleEnableGenerationNodeAnimationToggle: fe,
      handleGenerationNodeAnimationModeChange: ye,
      handleCanvasGenerationTimerToggle: ie
    } = xdi(),
    ae = (r == null ? void 0 : r.tone) === "light" ? r.background : D,
    be = (r == null ? void 0 : r.tone) === "dark" ? r.background : H,
    Ee = g.useCallback(Xa => {
      const ao = typeof Xa == "function" ? Xa(ae) : Xa;
      r && (yQ("light"), n("light")), U(ao);
    }, [r, ae, n, U]),
    xe = g.useCallback(Xa => {
      const ao = typeof Xa == "function" ? Xa(be) : Xa;
      r && (yQ("dark"), n("dark")), Y(ao);
    }, [r, be, n, Y]),
    [he, ue] = g.useState([]);
  g.useEffect(() => {
    _ || ue([]);
  }, [_]);
  const [ge, _e] = g.useState(!1),
    [ke, ve] = g.useState("select"),
    Te = yDi(ke),
    {
      canvasTextBoxes: Ne,
      setCanvasTextBoxes: me,
      canvasDoodleStrokes: Ae,
      setCanvasDoodleStrokes: Fe,
      canvasDoodleStrokesRef: Me,
      canvasTextBoxesRef: Re,
      lastPenPointerDownAtRef: $e,
      doodleSubTool: rt,
      setDoodleSubTool: nt,
      doodleBrushColor: ze,
      setDoodleBrushColor: Le,
      doodleBrushWidth: Ke,
      setDoodleBrushWidth: Xe,
      doodleEraserWidth: De,
      setDoodleEraserWidth: Ye,
      selectedDoodleIds: Ce,
      setSelectedDoodleIds: He,
      canvasDoodleBrushOrEraserPassthrough: Ve,
      editingCanvasTextId: it,
      setEditingCanvasTextId: It,
      selectedCanvasTextId: Ft,
      setSelectedCanvasTextId: We,
      skipCanvasTextClearOnClickRef: Ze
    } = Te,
    {
      configs: Ge,
      globalApiKey: Oe,
      globalBaseUrl: st,
      activeEndpoint: vt,
      jimengSuperResUrl: Ht,
      jimengSuperResApiKey: nn,
      getEndpoints: pt,
      updateConfig: lt,
      updateConfigs: gt,
      setGlobalApiKey: Ut,
      setGlobalBaseUrl: _t,
      applyGlobalBaseUrlFromPicker: At,
      switchEndpoint: Yt,
      setJimengSuperResUrl: qe,
      setJimengSuperResApiKey: kt
    } = lcr();
  Kji({
    theme: a,
    enableGenerationNodeAnimation: P,
    generationNodeAnimationMode: R,
    setCanvasFadedIn: _e,
    apiConfigs: Ge,
    globalApiKey: Oe,
    toastSuccess: Vs,
    toastError: qi
  });
  const {
      showBaseUrl: St,
      authMode: hn,
      authenticate: Qt,
      showHuyaModels: Ot,
      toggleHuyaModels: ln,
      filterHuyaModels: Pn,
      filterModels: rn
    } = tpa(),
    {
      visibleApiConfigs: Yn,
      genNodeApiConfigs: Ct,
      chatApiConfigs: Cn,
      visibleImageConfigs: un,
      expandImageConfigs: Jn,
      platformGroupTokens: Kn,
      platformPricing: en,
      isModelHiddenInList: Vn,
      setModelHiddenInList: Tt,
      showHiddenModelsInGenNodes: Ue,
      setShowHiddenModelsInGenNodes: et
    } = Odi({
      apiConfigs: Ge,
      globalBaseUrl: st,
      filterModels: rn,
      filterHuyaModels: Pn
    });
  pTi({
    enabled: !1
  });
  const [ft, ht] = gdi([]),
    {
      connections: wt,
      setConnections: jt,
      connectionsRef: bt,
      groups: Bt,
      setGroups: wn,
      groupsRef: at,
      selectedGroupId: Pt,
      setSelectedGroupId: dt,
      selectedGroupIdRef: xt
    } = qpi({
      preserveConnectionsRef: () => !cst()
    }),
    yn = g.useRef(!1);
  g.useEffect(() => {
    if (yn.current || ft.length === 0) return;
    const Xa = D7t(ft);
    yn.current = !0, Xa.some((ao, Ys) => {
      var Zd;
      return ao.nodeName !== ((Zd = ft[Ys]) == null ? void 0 : Zd.nodeName);
    }) && ht(Xa);
  }, [ft, ht]);
  const {
      nodesMap: gn,
      nodeIndex: mt,
      dataVersion: Xt,
      nodeDocument: Gn
    } = w8i(ft, wt),
    {
      view: rr,
      setView: qn,
      viewRef: Dn,
      canvasWorldRef: Ar,
      viewportSize: _r,
      viewportResizeCommitRef: Pa,
      canvasInteractionActive: fa,
      canvasViewPanning: Ca,
      isViewportZooming: $n,
      commitCanvasViewImmediate: yr,
      reconcileCanvasViewportFromRef: Ir
    } = pDi(),
    [Gr, Zr] = g.useState(!1),
    [La, sa] = g.useState(!1),
    {
      selectedNodeId: Ea,
      setSelectedNodeId: ba,
      selectedNodeIds: ga,
      setSelectedNodeIds: _a,
      selectedNodeIdRef: $a,
      selectedNodeIdsRef: Ya,
      selectedConnectionId: ta,
      setSelectedConnectionId: ki,
      selectedConnectionIdRef: Wn,
      showCollectionForBoxSelect: wr,
      setShowCollectionForBoxSelect: jn,
      showBoxSelectBounds: _n,
      setShowBoxSelectBounds: ar
    } = omi(),
    [Vt, vn] = g.useState(null),
    [An, ur] = g.useState(0),
    zr = g.useRef(null),
    Dr = g.useRef(!1),
    {
      session: Wr,
      compactTargetId: gr,
      storyboardTarget: jr
    } = wgi(),
    {
      compactTargetRef: ea,
      storyboardTargetRef: pa,
      inputTypeRef: Br,
      cancelReference: tn,
      cancelStoryboard: Lr
    } = Wr,
    br = g.useMemo(() => gr == null ? null : mt.firstById.get(gr) ?? null, [mt, gr]),
    [Jr, Kr] = g.useState(null),
    [ir, Hr] = g.useState(null),
    ha = g.useRef(null);
  oAi({
    nodes: ft,
    connections: wt,
    selectedNodeIds: ga,
    setNodes: ht
  });
  const {
      handleAlign: Ga,
      handleArrangeSelected: Za,
      handleArrangeGroup: va
    } = ihi({
      nodes: ft,
      groups: Bt,
      selectedNodeId: Ea,
      selectedNodeIds: ga,
      setNodes: ht
    }),
    {
      history: Kt,
      historyRef: Pr,
      historyHydratedRef: kr,
      setHistory: Mr,
      setHistoryFromStorage: Hn
    } = Gmi(),
    $t = BOi({
      history: Kt,
      connections: wt,
      setNodes: ht
    }),
    je = Rgi();
  g.useLayoutEffect(() => {
    a_i(je, gn);
  }, [je, gn]);
  const {
    handleRefreshVideo: Qe,
    handleRefreshAudio: Mt,
    handleRefresh3d: cn,
    handleRefreshFalImage: Qn,
    handleRefreshComfyTask: Lt,
    autoRefreshRhComfyOnMount: ct,
    autoRefreshInFlightImageTasksOnMount: Dt
  } = z_i({
    apiConfigs: Ge,
    globalApiKey: Oe,
    setHistory: Mr,
    setNodes: ht,
    connections: wt,
    documentSession: je
  });
  Qji({
    history: Kt,
    setHistory: Mr,
    setNodes: ht,
    handleRefreshVideo: Qe,
    autoRefreshRhComfyOnMount: ct,
    autoRefreshInFlightImageTasksOnMount: Dt
  });
  const bn = cDi({
      nodes: ft,
      connections: wt,
      setHistory: Mr,
      setNodes: ht,
      generateId: Fi,
      toastError: qi,
      toastLoading: Uv,
      updateToast: Q2e,
      documentSession: je
    }),
    Rt = aOi({
      platformGroupTokens: Kn,
      platformPricing: en
    }),
    fn = g.useRef(null),
    {
      chatSessions: Zt,
      setChatSessions: Ln,
      currentChatId: tt,
      setCurrentChatId: zt,
      setIsChatOpen: an,
      chatWidth: Rn,
      chatFontSize: Un,
      setChatFontSize: er,
      chatModel: Cr,
      setChatModel: tr,
      chatPlatformGroup: kn,
      setChatPlatformGroup: xn,
      localSkillChatModel: Fn,
      setLocalSkillChatModel: cr,
      localSkillPlatformGroup: vr,
      setLocalSkillPlatformGroup: Wt,
      chatWebSearchEnabled: Jt,
      setChatWebSearchEnabled: Nn,
      chatApiProtocol: En,
      setChatApiProtocol: Zn,
      chatReasoningEffort: Sr,
      setChatReasoningEffort: Bn,
      chatUseAliyunOss: Et,
      setChatUseAliyunOss: zn,
      chatOssImageBase64: Mn,
      setChatOssImageBase64: or,
      isChatSending: mr,
      sendingChatSessionIds: Yr,
      isResizingChat: aa,
      historyMessageCount: wa,
      setHistoryMessageCount: xa,
      chatPanelMode: Aa,
      setChatPanelMode: pn,
      chatAgentGenPrefs: xr,
      setChatAgentGenPrefs: Nr,
      resolveAgentChoice: qr,
      patchChatMessage: Oa,
      bindLocalSkillRoot: Fa,
      addLocalSkillWorkspace: Ra,
      openLocalSkillWorkspace: ui,
      removeLocalSkillWorkspace: pr,
      localSkillWorkspaces: In,
      localSkillPermission: fr,
      setLocalSkillPermission: na,
      undoLocalSkillEdit: Ba,
      reviewLocalSkillFile: ai,
      deleteChatSession: vi,
      deleteChatMessages: Vi,
      createNewChat: Ti,
      renameChatSession: Gi,
      sendChatMessage: hi,
      startSkillCreatorFromChat: vo,
      cancelChatSend: ci,
      resendChatMessage: ji,
      handleChatResizeStart: ts,
      sessionsForCurrentMode: Ts,
      chatSessionsForHistory: dc,
      chatSessionLastTsById: Tl,
      selectChatSession: Ml
    } = wOa({
      apiConfigs: Cn,
      globalApiKey: Oe,
      ...nOi(Rt),
      canvasProjectIdRef: fn
    });
  Rt.session.preferencesRef.current = xr;
  const {
      lightboxItem: sr,
      lightboxOpen: da,
      setLightboxItem: la,
      setLightboxOpen: Ta,
      setSettingsOpen: Wa,
      setHistoryOpen: pi,
      setBatchManageOpen: wi,
      createCharacterOpen: to,
      setCreateCharacterOpen: Ho,
      skillWorkflowSession: jo
    } = y_i(),
    {
      historyHasMore: Ls,
      handleLoadMoreHistory: _s
    } = sfi({
      readNodes: () => ns.current,
      historyRef: Pr,
      hydratedRef: kr,
      setHistoryFromStorage: Hn
    }),
    Pl = g.useRef(!1);
  Pl.current = da;
  const xl = g.useCallback((Xa = "") => {
      jo.open(Xa || "", je);
    }, [jo, je]),
    Bi = g.useCallback(() => {
      xl("");
    }, [xl]),
    [Do, co] = FOi(),
    {
      contextMenu: ls,
      setContextMenu: Ms,
      frameContextMenu: ks,
      setFrameContextMenu: Yo,
      historyContextMenu: Vc,
      setHistoryContextMenu: zd,
      setSelectionContextMenu: Xh,
      previewContextMenu: Pp,
      setPreviewContextMenu: Ub,
      inputImageContextMenu: t0,
      setInputImageContextMenu: yu,
      setCroppingNodeId: oo
    } = f_i(),
    {
      isDownloading: Ps,
      downloadProgress: xi,
      setIsDownloading: ld,
      setDownloadProgress: Ic,
      handleDownloadFile: fc,
      getCancellationToken: bu,
      startDownload: qd,
      cancelDownload: vu
    } = v_i(),
    [wu] = g.useState({
      nodeId: null,
      shotId: null
    }),
    Df = g.useRef({}),
    xg = Lfi(),
    [Lf, Jh] = g.useState(!1),
    Zh = g.useRef(null),
    {
      apiTestProgress: Bl,
      apiStatus: ql,
      testApiConnection: Kd
    } = Jki({
      apiConfigs: Ge,
      globalApiKey: Oe
    }),
    uh = Tki(),
    {
      characterLibrary: Lc,
      setCharacterLibrary: Xp,
      characterLibraryLoaded: Qm,
      klingSubjectLibrary: Qd,
      setKlingSubjectLibrary: Xv,
      rhAppLibrary: $b,
      setRhAppLibrary: Jl
    } = zOi(),
    {
      projectNameComprehensive: td,
      setProjectNameComprehensive: Ym,
      setProjectNameCompact: hh,
      isEditingProjectName: Jp,
      setIsEditingProjectName: Hc,
      showNewProjectSaveHint: Rp,
      setShowNewProjectSaveHint: fw,
      projectNameInputRef: Xm,
      isEditingProjectNameRef: Zp,
      syncProjectNameToManagerRef: Of,
      finishEditingProjectName: Jm
    } = UOi(),
    {
      localCacheServerConnected: Js,
      localServerConfig: uc,
      setLocalServerConfig: ep,
      localCacheSettingsOpen: tp,
      setLocalCacheSettingsOpen: xm
    } = d_i(),
    {
      isPanning: xd,
      setIsPanning: _m,
      isDragging: Eo,
      setIsDragging: Zs,
      dragNodeId: Wo,
      setDragNodeId: Qs,
      resizingNodeId: Xo,
      setResizingNodeId: fl,
      resizeDirection: Oc,
      setResizeDirection: km
    } = pmi(),
    [gl, oe] = g.useState(() => EBt());
  g.useEffect(() => MBt(oe), []);
  const {
      connectingSource: Se,
      setConnectingSource: Be,
      connectingTarget: Je,
      setConnectingTarget: ut,
      connectingInputType: dn,
      setConnectingInputType: Xn,
      multiConnectingSourceIds: Rr,
      setMultiConnectingSourceIds: Vr,
      multiConnectingTargetIds: ca,
      setMultiConnectingTargetIds: za
    } = wDi(),
    Xr = Zur(ei(), Eo, Wo),
    fi = mDi({
      nodeCount: ft.length,
      localCacheNodeDragActive: Xr,
      isDragging: Eo,
      dragNodeId: Wo,
      resizingNodeId: Xo,
      connectingSource: Se,
      connectingTarget: Je
    }),
    Bo = g.useCallback(() => {}, []),
    {
      isSelecting: sl,
      setIsSelecting: xu,
      selectionBox: Bf,
      setSelectionBox: Gb,
      isSelectingRef: By
    } = cmi(),
    [Jv, O0] = g.useState(null),
    [Ff, n0] = g.useState(null),
    [B0, Fy] = g.useState(null),
    _g = g.useCallback(() => {
      Vr(null), za(null);
    }, [Vr, za]),
    Zm = KAi({
      document: je,
      nodes: ft,
      selectedNodeIds: ga,
      selecting: smi(sl, Bf),
      showBoxBounds: _n,
      menu: ls,
      projectPointer: Xa => kj(Xa.x, Xa.y, Dn.current, Lo.current, {
        allowLayoutRead: !1
      }),
      clearPreview: _g
    }),
    {
      forwardSelection: F0,
      reverseSelection: ll,
      boxSourceIds: zy,
      reverseActive: Nh,
      sync: zf,
      reset: Zv,
      pointer: bI
    } = Zm;
  g.useEffect(() => {
    const Xa = ao => O0(ao.detail);
    return window.addEventListener("cropSelectModeChange", Xa), () => window.removeEventListener("cropSelectModeChange", Xa);
  }, []);
  const [gw, zT] = g.useState(!1),
    [ph, cd] = g.useState(!1);
  g.useEffect(() => {
    const Xa = ao => zT(!!ao.detail);
    return window.addEventListener("freeSplitModalChange", Xa), () => window.removeEventListener("freeSplitModalChange", Xa);
  }, []), g.useEffect(() => {
    const Xa = ao => cd(!!ao.detail);
    return window.addEventListener("gridSplitModalChange", Xa), () => window.removeEventListener("gridSplitModalChange", Xa);
  }, []), g.useEffect(() => {
    const Xa = ao => n0(ao.detail);
    return window.addEventListener("markerModeChange", Xa), () => window.removeEventListener("markerModeChange", Xa);
  }, []);
  const Lo = g.useRef(null),
    e1 = g.useCallback(() => {
      qHn();
    }, []),
    Uf = g.useCallback((Xa, ao) => {
      var l1;
      Xa.preventDefault(), Xa.stopPropagation();
      const {
          worldX: Ys,
          worldY: Zd
        } = Vmi(Xa.clientX, Xa.clientY, (l1 = Lo.current) == null ? void 0 : l1.getBoundingClientRect(), Dn.current),
        Sg = Pr.current.find(o8 => String(o8.id) === String(ao.id)) ?? ao;
      zd({
        visible: !0,
        x: Xa.clientX,
        y: Xa.clientY,
        worldX: Ys,
        worldY: Zd,
        item: Hmi(Sg, ao)
      });
    }, [zd]),
    np = g.useCallback((Xa, ao, Ys) => kj(Xa, ao, Dn.current, Lo.current, {
      allowLayoutRead: (Ys == null ? void 0 : Ys.allowLayoutRead) ?? !1
    }), []),
    ns = g.useRef(ft);
  cst() && (ns.current = ft), sOi({
    nodes: ft,
    nodesRef: ns,
    chatSessions: Zt,
    currentChatId: tt,
    setChatSessions: Ln
  }), h8i(ft, ns, Lo, yr);
  const Uy = g.useCallback(() => sSi(ns.current), []);
  g.useEffect(() => (WWt(Xa => M8r(ns.current, Xa)), () => WWt(null)), []);
  const Ox = g.useRef(null),
    Yd = g.useCallback(() => ({
      nodes: ns.current,
      connections: bt.current
    }), []);
  g.useEffect(() => (Zsn(Yd), () => Zsn(null)), [Yd]);
  const r0 = g.useRef([]),
    Ud = g.useRef(""),
    UT = g.useRef(null),
    $y = g.useRef({
      x: 0,
      y: 0
    }),
    h_ = g.useRef(!1),
    Ed = g.useRef(!1),
    Kl = g.useRef(!1),
    Fl = g.useRef(() => {}),
    Xd = g.useRef(() => {
      yP({
        force: !0
      });
    }),
    p_ = g.useCallback(() => Xd.current(), []),
    t1 = g.useRef(null),
    Vb = g.useRef(null),
    $f = g.useRef(null),
    jh = g.useRef(null),
    {
      genInlineDirectorUiNodeIds: a0,
      registerGenInlineDirectorUi: Bx,
      registerGenPromptPanelUi: m_
    } = whi(),
    Gf = NDi({
      selectedNodeId: Ea,
      selectedNodeIds: ga,
      nodesRef: ns,
      selectedNodeIdsRef: Ya,
      forceEndCanvasInteractionRef: Xd,
      setNodes: ht,
      setConnections: jt,
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      setConnectingSource: Be,
      setConnectingTarget: ut,
      setConnectingInputType: Xn,
      generateId: Fi
    }),
    {
      connectionDial: kg,
      handleShowConnectionDial: nA,
      handleHideConnectionDial: N3,
      handleConnectionDialSelect: j3,
      clearConnectionDial: D3
    } = Gf,
    L3 = g.useMemo(() => ({}), []),
    Fx = AAi({
      document: je,
      viewRef: Dn,
      setView: qn
    }),
    O3 = g.useMemo(() => EAi({
      getView: () => Dn.current,
      start: (Xa, ao) => Fx.start(Xa, ao),
      isInteracting: Yi,
      setTimer: (Xa, ao) => window.setTimeout(Xa, ao),
      clearTimer: Xa => window.clearTimeout(Xa)
    }), [Fx]),
    {
      centerViewToNode: B3,
      centerViewToGroup: rA
    } = hhi({
      groups: Bt,
      nodesRef: ns,
      viewRef: Dn,
      viewportSize: _r,
      visibleViewport: {
        width: Math.max(1, _r.width - (h5() ? Math.min(Math.max(0, Rn), Math.max(0, _r.width - 1)) : 0)),
        height: _r.height
      },
      focusAnimation: Fx,
      setSelectedGroupId: dt,
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      setFocusRippleNodeId: vn,
      setFocusRippleNonce: ur,
      locateAnimationMaxNodes: w
    });
  g.useEffect(() => {
    if (!Vt) return;
    const Xa = window.setTimeout(() => vn(null), 2200);
    return () => window.clearTimeout(Xa);
  }, [Vt, An]), g.useEffect(() => {
    const Xa = PCn(ft);
    Xa !== ft && ht(Xa), cst() && (ns.current = Xa), Ox.current = Jv;
  }, [ft, Jv]), g.useEffect(() => (mgt(Xa => {
    const ao = ns.current.find(Zd => Zd.id === Xa),
      Ys = ao == null ? void 0 : ao.prompt;
    return typeof Ys == "string" && Ys.trim() ? Ys : void 0;
  }), fgt(Xa => wLe(Xa, ns.current.filter(ao => ao.type === "gen-image" || ao.type === "gen-video").map(ao => ao.prompt))), () => {
    mgt(null), fgt(null);
  }), []), g.useEffect(() => fhr({
    setNodes: ht,
    getNodes: () => ns.current,
    toast: {
      loading: Uv,
      success: Vs,
      error: qi,
      remove: gg
    }
  }), [ht, Uv, Vs, qi, gg]), wdi({
    document: je,
    nodes: ft,
    nodesRef: ns,
    selectedNodeIdsRef: Ya,
    setNodes: ht,
    isBlocked: () => Pl.current || !!ea.current || !!pa.current || !!Ox.current,
    applied: Xa => Kr({
      nodeId: Xa,
      nonce: Date.now()
    }),
    error: qi
  }), g.useEffect(() => {
    const Xa = ao => {
      const Ys = ao,
        {
          from: Zd,
          to: Sg,
          inputType: l1
        } = Ys.detail;
      Zd && Sg && jt(o8 => {
        const U9 = !l1 || l1 === "default" ? "default" : l1;
        return o8.some(Wpe => {
          const q5r = !Wpe.inputType || Wpe.inputType === "default" ? "default" : Wpe.inputType;
          return Wpe.from === Zd && Wpe.to === Sg && q5r === U9;
        }) ? o8 : [...o8, {
          id: `conn-${Date.now()}`,
          from: Zd,
          to: Sg,
          ...(U9 !== "default" ? {
            inputType: U9
          } : {})
        }];
      });
    };
    return window.addEventListener("addConnection", Xa), () => {
      window.removeEventListener("addConnection", Xa);
    };
  }, []);
  const F3 = ft.length,
    {
      nodesVisibilityView: Hb,
      canvasViewportFrozen: z3,
      canvasInnerViewport: ef,
      handleViewportBarZoomChange: aA,
      isViewportTransforming: yw
    } = hDi({
      view: rr,
      viewRef: Dn,
      viewportSize: _r,
      chatWidth: Rn,
      isPanning: xd,
      canvasViewPanning: Ca,
      isViewportZooming: $n,
      commitCanvasViewImmediate: yr
    });
  g.useEffect(() => {
    vhr(), y8i();
  }, []);
  const zl = XAi({
      activeTool: ke
    }),
    iA = g.useMemo(() => {
      const Xa = new Set();
      return Se && Xa.add(Se), Je && Xa.add(Je), Rr == null || Rr.forEach(ao => Xa.add(ao)), ca == null || ca.forEach(ao => Xa.add(ao)), Xa;
    }, [Se, Je, Rr, ca]),
    v9 = g.useMemo(() => Ulr({
      connections: wt,
      connectingSource: Se,
      connectingTarget: Je,
      connectingInputType: dn,
      multiConnectingSourceIds: Rr,
      multiConnectingTargetIds: ca
    }), [wt, Se, Je, dn, Rr, ca]),
    oA = g.useCallback((Xa, ao) => {
      ao === "success" ? Vs(Xa) : qi(Xa);
    }, [Vs, qi]),
    n1 = bgi({
      document: je,
      nodes: ft,
      setNodes: ht,
      setConnections: jt,
      apiConfigs: Cn,
      globalApiKey: Oe,
      cancelPicking: Wr.cancel,
      notify: oA,
      generateId: Fi,
      selectNode: ba,
      resumePrompt: Hr,
      registerPrompt: m_
    }),
    {
      state: {
        targetId: zx,
        activeSourceId: U3,
        analyzingId: $T,
        analyses: w9
      },
      focusEditPromptOpenSnap: vI,
      modelId: x9,
      platformGroup: sA,
      dismiss: GT,
      toggle: YD,
      cancelPending: wI,
      selectSource: r1,
      openTargetPrompt: _9,
      pointPick: lA,
      changeLevel: VT,
      remove: XD,
      setModel: JD,
      setPlatformGroup: Gy
    } = n1,
    {
      connectedNodeIds: k9,
      connectionSignatures: $3,
      nodesLayoutSignature: xI,
      nodesGeometryMap: cA,
      forceIncludeNodeIds: _I,
      visibleNodes: G3,
      visibleNodeIds: Nu,
      nodeQualityMap: Ux,
      canvasProjectBootActive: HT,
      denseMediaOverviewActive: Vy,
      denseMediaMicroActive: A9,
      framePressure: S9,
      collectedNodeIds: $x,
      renderedNodes: dA,
      previewCollapsedOrCompactNodeIds: WT
    } = Npi({
      nodes: ft,
      connections: wt,
      groups: Bt,
      view: Hb,
      viewportWidth: ef.width,
      viewportHeight: ef.height,
      loosenOverscan: umi(xd, Eo),
      selectedNodeId: Ea,
      selectedNodeIds: ga,
      connectingNodeIds: iA,
      dragNodeId: Wo,
      resizingNodeId: Xo,
      focusEditActiveSourceNodeId: U3,
      lightboxOpen: da,
      isPanning: xd,
      isDragging: Eo,
      isDraggingSelectionBoundsRef: Kl,
      selectedNodeIdsRef: Ya,
      setSelectedNodeIds: _a,
      setSelectedNodeId: ba,
      setFocusRippleNodeId: vn
    }),
    Gx = l6i(F3, wt.length),
    {
      visibleCanvasTextBoxes: Np,
      visibleCanvasDoodleStrokes: Bc
    } = vEi({
      canvasTextBoxes: Ne,
      canvasDoodleStrokes: Ae,
      view: Hb,
      width: ef.width,
      height: ef.height,
      selectedCanvasTextId: Ft,
      editingCanvasTextId: it,
      selectedDoodleIds: Ce
    }),
    {
      collectionEndpoints: qT,
      groupOutputNodeToGroupId: KT,
      expandedGroupNodeToGroupId: kI,
      mergedConnectionEndpoints: jp,
      collectionEndpointsRef: i0,
      intraGroupConnectionIds: Wb,
      intraGroupConnectionIdsRef: Us,
      connectingGroupOutputId: rs
    } = T8i({
      groups: Bt,
      nodes: ft,
      connections: wt,
      setConnections: jt,
      multiConnectingSourceIds: Rr
    });
  Pa.current = () => {
    requestAnimationFrame(() => {
      var Xa;
      f$() || (Xa = r0.current) != null && Xa.length && $f.current && Nj(r0.current, Dn.current, $f.current, void 0, void 0, void 0, i0.current, void 0, Us.current);
    });
  };
  const {
      connectionRenderPlan: V3,
      canvasDependencyConnections: I9,
      setDragMountVersion: uA
    } = i6i({
      connections: wt,
      groups: Bt,
      collectedNodeIds: $x,
      collectionEndpoints: qT,
      groupOutputNodeToGroupId: KT,
      previewCollapsedOrCompactNodeIds: WT,
      nodesVisibilityView: Hb,
      canvasInnerViewport: ef,
      nodesGeometryMap: cA,
      mergedConnectionEndpoints: jp,
      intraGroupConnectionIds: Wb,
      selectedConnectionId: ta,
      selectedNodeId: Ea,
      selectedNodeIds: ga,
      connectingNodeIds: iA,
      dragNodeId: Wo,
      nodesLayoutSignature: xI,
      nodesMap: gn,
      enableGenerationConnectionFlow: M,
      generationDocument: je,
      denseMediaOverviewActive: Vy,
      hideConnections: La,
      showAllCanvasConnections: y,
      showBoxSelectBounds: _n,
      visibleConnectionsRef: r0,
      svgContainerRef: $f,
      viewRef: Dn,
      collectionEndpointsRef: i0,
      connectionsRef: bt,
      intraGroupConnectionIdsRef: Us
    }),
    a1 = Epe({
      connections: wt,
      nodesMap: gn,
      dataVersion: Xt
    }),
    {
      startCompactRefCanvasPick: ZD,
      startStoryboardShotCanvasPick: AI,
      finalizeCompactRefCanvasPick: Vx,
      finalizeStoryboardShotCanvasPick: eL
    } = Pgi({
      session: Wr,
      document: je,
      nodes: ft,
      connections: wt,
      setNodes: ht,
      setConnections: jt,
      canvasRef: Lo,
      focusEditActive: !!zx,
      dismissFocusEdit: GT,
      selectNode: ba,
      resumePrompt: Hr,
      generateId: Fi
    });
  tAi({
    history: Kt
  }), Uui(Lc, Qd, $b, Qm);
  const {
      addNode: H3,
      handleCreateNodeAtCanvasCenter: QT,
      handleAddMemoryFileTextNode: hA
    } = jDi({
      canvasInnerViewport: ef,
      viewRef: Dn,
      nodesRef: ns,
      selectedNodeIdsRef: Ya,
      forceEndCanvasInteractionRef: Xd,
      setNodes: ht,
      setConnections: jt,
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      setContextMenu: Ms,
      setConnectingSource: Be,
      setConnectingTarget: ut,
      setConnectingInputType: Xn,
      setMultiConnectingSourceIds: Vr,
      setMultiConnectingTargetIds: za,
      generateId: Fi
    }),
    em = uAi({
      document: je,
      canvasRef: Lo,
      view: rr,
      generateId: Fi,
      setNodes: ht,
      setConnections: jt,
      setSelectedNodeId: ba
    });
  zui(em), Bui();
  const {
      updateNode: z0,
      updateNodeSettings: C9,
      deleteNode: xG,
      deleteNodes: bw,
      preserveHistory: E9
    } = Wpi({
      document: je,
      nodesRef: ns,
      historyRef: Pr,
      setNodes: ht,
      setConnections: jt,
      setHistory: Mr,
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a
    }),
    vw = g.useCallback(Xa => {
      const ao = bw(Xa);
      return ao && wn(Ys => i2i(Ys, new Set(Xa))), ao;
    }, [bw, wn]),
    pA = g.useCallback(Xa => {
      vw([Xa]);
    }, [vw]),
    tf = g.useCallback(Xa => {
      const ao = at.current.find(Ys => Ys.id === Xa);
      !ao || !HCe(ao) || (vw([...ao.nodeIds]), wn(Ys => Ys.filter(Zd => Zd.id !== Xa)), dt(null));
    }, [vw, wn, dt]),
    tL = g.useCallback(Xa => {
      jt(ao => ao.filter(Ys => Ys.id !== Xa));
    }, [jt]),
    SI = C8i(ft, wt, Ea, ga, mt),
    {
      handleStartMultiConnection: YT,
      handleStartBoxSelectBatchConnect: tm,
      handleStartGroupConnect: nL,
      handleStartReverseBatchConnection: Ro
    } = IDi({
      groups: Bt,
      nodes: ft,
      multiImageSelection: F0,
      mousePosRef: $y,
      forceEndCanvasInteractionRef: Xd,
      cancelConnectingWireStateRef: Fl,
      setMousePos: Bo,
      setConnectingSource: Be,
      setConnectingTarget: ut,
      setConnectingInputType: Xn,
      setMultiConnectingSourceIds: Vr,
      setMultiConnectingTargetIds: za
    });
  lhi({
    groupsRef: at,
    nodesRef: ns,
    clientToCanvasWorld: np
  });
  const {
      generate: ww,
      runExpandImage: W3,
      runEditImage: Ul,
      generateChartBatch: T9,
      generationRunner: q3
    } = Ipe({
      apiConfigs: Ge,
      globalApiKey: Oe,
      connections: wt,
      nodes: ft,
      nodesMap: gn,
      updateNode: z0,
      setNodes: ht,
      setHistory: Mr,
      getConnectedInputImages: a1.connections.getConnectedInputImages,
      getConnectedInputItems: a1.connections.getConnectedInputItems,
      getConnectedImageForInput: a1.connections.getConnectedImageForInput,
      generateId: Fi
    }, je),
    _d = g.useCallback((...Xa) => {
      const ao = Xa[0];
      if (!(ao && r2i(at.current, ao.id))) return ww(...Xa);
    }, [ww]),
    f_ = Bgi({
      document: je,
      nodesRef: ns,
      setNodes: ht,
      generate: _d,
      dispatchRef: Rt.dispatchRef,
      preferencesRef: Rt.session.preferencesRef
    }),
    II = WLi({
      document: {
        nodesRef: ns,
        connectionsRef: bt,
        setNodes: ht,
        setConnections: jt,
        generateId: Fi,
        deleteNodes: vw,
        deferredNodeCommitQueuedRef: Rt.flush.deferredNodeCommitQueuedRef,
        deferredConnectionCommitQueuedRef: Rt.flush.deferredConnectionCommitQueuedRef,
        preserveHistoryBeforeDeletion: E9,
        undoCanvas: () => Rt.undoRef.current(),
        redoCanvas: () => Rt.redoRef.current()
      },
      viewport: {
        canvasRef: Lo,
        viewRef: Dn,
        selectedNodeIdRef: $a,
        commitView: O3,
        selectNode: ba,
        selectNodes: _a
      },
      session: Rt.session,
      production: {
        dispatchRef: Rt.dispatchRef,
        historyRef: Pr,
        generate: _d,
        executeNode: f_
      },
      flushStateRef: Rt.flushStateRef
    }),
    {
      readSnapshot: qb,
      invalidateSnapshot: M9
    } = eOi({
      nodesRef: ns,
      connectionsRef: bt,
      nodes: ft,
      connections: wt,
      viewRef: Dn,
      canvasRef: Lo,
      projectIdRef: fn,
      capabilitiesRef: Rt.capabilitiesRef,
      flushStateRef: Rt.flushStateRef,
      projectName: td,
      selectedNodeId: Ea,
      selectedNodeIds: ga,
      visibleApiConfigs: Yn,
      isDragging: Eo,
      dragNodeId: Wo,
      resizingNodeId: Xo,
      draggingSelectionRef: Kl
    });
  Rmi({
    document: je,
    nodesRef: ns,
    connectionsRef: bt,
    setNodes: ht,
    setConnections: jt,
    readRevision: () => qb().stateVersion ?? 0,
    invalidate: M9,
    flushRef: Rt.flushStateRef,
    success: Vs,
    error: qi
  });
  const {
      createGroup: XT,
      createStackCard: g_,
      expandCollection: nf,
      updateCollectionPosition: U0,
      deleteGroup: y_,
      updateGroupName: rL,
      updateGroupColor: CI,
      addNodesToGroup: Hy,
      syncGroupMembershipByFrame: JT,
      executeGroup: Wy
    } = LAi({
      groups: Bt,
      setGroups: wn,
      nodes: ft,
      setNodes: ht,
      connections: wt,
      executeNode: f_
    }),
    P9 = g.useCallback((Xa, ao, Ys) => {
      const Zd = at.current.find(l1 => l1.id === Xa);
      if (!(Zd != null && Zd.collapsed) || Zd.stackMode !== "card") return;
      const Sg = Zd.nodeIds;
      Sg.length !== 0 && (cU(Sg), Aj(), uA(l1 => l1 + 1), s8i({
        memberIds: Sg,
        origin: {
          x: ao,
          y: Ys
        },
        nodes: ns.current,
        connections: bt.current,
        view: Dn.current,
        svg: $f.current,
        endpoints: i0.current,
        intraGroupIds: Us.current
      }));
    }, [uA]),
    R9 = g.useCallback((Xa, ao, Ys) => {
      var o8;
      const Zd = at.current.find(U9 => U9.id === Xa);
      if (!(Zd != null && Zd.collapsed)) return;
      if (Zd.stackMode === "card" && Qdn()) {
        l8i({
          anchorX: ao,
          anchorY: Ys,
          connections: bt.current,
          view: Dn.current,
          svg: $f.current,
          endpoints: i0.current
        });
        return;
      }
      const Sg = GWt(Zd, ns.current, ao, Ys),
        l1 = new Map(i0.current);
      Sg.forEach((U9, BVt) => l1.set(BVt, U9)), i0.current = l1, !(!$f.current || !((o8 = r0.current) != null && o8.length)) && Nj(r0.current, Dn.current, $f.current, void 0, void 0, void 0, l1, void 0, Us.current);
    }, []),
    aL = g.useCallback((Xa, ao, Ys) => {
      if (!Qdn()) return;
      const Zd = at.current.find(Sg => Sg.id === Xa);
      if (Zd && ao != null && Ys != null) {
        const Sg = GWt(Zd, ns.current, ao, Ys),
          l1 = new Map(i0.current);
        Sg.forEach((o8, U9) => l1.set(U9, o8)), i0.current = l1;
      }
      c8i({
        connections: bt.current,
        view: Dn.current,
        svg: $f.current,
        endpoints: i0.current,
        intraGroupIds: Us.current
      }), d7(), lU();
    }, []),
    EI = dhi({
      groups: Bt,
      nodes: ft,
      addNodesToGroup: Hy,
      syncGroupMembershipByFrame: JT
    }),
    ZT = g.useCallback((Xa, ao) => bdi(Xa, {
      document: je,
      view: rr,
      readNodes: () => ns.current,
      setNodes: ht,
      setConnections: jt,
      setGroups: wn,
      generateId: Fi,
      success: Vs,
      isCurrent: ao,
      close: () => {}
    }), [je, rr, ht, jt, wn, Fi, Vs]),
    {
      freezeGroupFrameIfNeeded: e8,
      findGroupAtEmptyPoint: b_
    } = nhi({
      nodes: ft,
      groups: Bt,
      setGroups: wn
    }),
    {
      startGroupDragAtPoint: xw,
      cancelActiveGroupDrag: rf
    } = efi({
      nodesRef: ns,
      groupsRef: at,
      setNodes: ht,
      setGroups: wn,
      viewRef: Dn,
      connectionsRef: bt,
      visibleConnectionsRef: r0,
      svgContainerRef: $f,
      collectionEndpointsRef: i0,
      intraGroupConnectionIdsRef: Us,
      isDraggingGroupRef: h_,
      document: je,
      stopPanning: () => {
        _m(!1), qx.current = !1;
      },
      setMountTick: uA
    }),
    Fc = nfi({
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      setSelectedGroupId: dt,
      setShowCollectionForBoxSelect: jn,
      setShowBoxSelectBounds: ar,
      startGroupDragAtPoint: xw
    }),
    {
      startDrag: Dh,
      cancelDrag: ju
    } = Yxi({
      document: je,
      nodesRef: ns,
      connectionsRef: bt,
      selectedNodeIdsRef: Ya,
      setNodes: ht,
      setConnections: jt,
      setSelectedNodeIds: _a,
      setSelectedNodeId: ba,
      setShowBoxSelectBounds: ar,
      setShowCollectionForBoxSelect: jn,
      generateId: Fi,
      viewRef: Dn,
      isDraggingRef: Kl,
      visibleConnectionsRef: r0,
      svgContainerRef: $f,
      collectionEndpointsRef: i0,
      intraGroupConnectionIdsRef: Us,
      setMountTick: uA,
      snapToGrid: h
    }),
    Lh = Myi({
      nodesMap: gn,
      apiConfigs: Ge,
      globalApiKey: Oe,
      getConnectedVideoInputNode: a1.videoAnalysis.getConnectedVideoInputNode,
      groupKeyframesByTime: a1.videoAnalysis.groupKeyframesByTime,
      setNodes: ht,
      setConnections: jt,
      setSettingsOpen: Wa
    }),
    qy = ibi({
      nodesMap: gn,
      apiConfigs: Ge,
      globalApiKey: Oe,
      getConnectedVideoInputNode: a1.videoAnalysis.getConnectedVideoInputNode,
      setNodes: ht,
      setConnections: jt,
      setGroups: wn,
      generateId: Fi,
      deleteNodes: vw,
      setSettingsOpen: Wa,
      notifyCanvas: oA
    }),
    mA = Cbi({
      nodesMap: gn,
      connections: wt,
      apiConfigs: Ge,
      globalApiKey: Oe,
      setNodes: ht,
      setConnections: jt,
      setGroups: wn,
      generateId: Fi,
      deleteNodes: vw,
      setSettingsOpen: Wa,
      notifyCanvas: oA
    }),
    nm = Wbi({
      documentSession: je,
      nodesMap: gn,
      apiConfigs: Ge,
      globalApiKey: Oe,
      getConnectedVideoAnalyzeNode: a1.connections.getConnectedVideoAnalyzeNode,
      updateNodeSettings: C9,
      setNodes: ht,
      setHistory: Mr
    }),
    {
      updateShot: K3,
      splitImageToShots: fA
    } = nm,
    {
      freezeAllVideos: TI,
      unfreezeVideos: N9,
      acquireVideoFreeze: gA
    } = xEi({
      containerRef: Lo,
      enabled: !0
    }),
    o0 = thi({
      document: je,
      executeGroup: Wy,
      acquireVideoFreeze: gA
    }),
    {
      handleGroupResize: t8,
      handleGroupResizeStart: yA,
      handleGroupResizeEnd: Kb
    } = uhi({
      nodes: ft,
      groupsRef: at,
      selectedGroupIdRef: xt,
      isResizingGroupFrameRef: Ed,
      setGroups: wn,
      setSelectedGroupId: dt,
      freezeGroupFrameIfNeeded: e8,
      document: je
    }),
    {
      handleDownloadSelected: _w,
      handleDownloadUrlList: Q3,
      handleNodeDoubleClick: Qb,
      abortActiveDownloadUi: Yb
    } = Ski({
      nodes: ft,
      connections: wt,
      selectedNodeId: Ea,
      selectedNodeIds: ga,
      setNodes: ht,
      setIsDownloading: ld,
      setDownloadProgress: Ic,
      setLightboxItem: la,
      setLightboxOpen: Ta,
      getCancellationToken: bu,
      startDownload: qd,
      cancelDownload: vu
    }),
    Hx = g.useCallback(Xa => {
      const ao = Bt.find(Ys => Ys.id === Xa);
      !ao || ao.nodeIds.length === 0 || _w(ao.nodeIds);
    }, [Bt, _w]),
    {
      handleDemoSelected: MI,
      canDemoSelected: Y3,
      handleDemoGroup: PI
    } = i8i({
      nodes: ft,
      groups: Bt,
      selectedNodeIds: ga,
      setLightboxItem: la,
      setLightboxOpen: Ta,
      toastError: qi
    }),
    bA = g.useRef(() => {}),
    X3 = vDi({
      selectedNodeIds: ga,
      nodes: ft,
      cancelConnectingWireStateRef: Fl,
      minimapDragEndRef: bA,
      syncBatchConnectionModeFromMouse: zf,
      startBoxSelectGroupDrag: Dh,
      cancelBoxSelectGroupDrag: ju,
      cancelActiveGroupDrag: rf,
      handleGroupResizeEnd: Kb,
      setShowBoxSelectBounds: ar,
      setShowCollectionForBoxSelect: jn,
      setSelectedGroupId: dt
    }),
    {
      handleCanvasContextMenu: Ag,
      handleCanvasMouseDown: i1,
      handleCanvasDoubleClick: Xb,
      handleCanvasMouseMove: Am,
      handleCanvasMouseUp: vA,
      handleBackgroundClick: Wx,
      isPanningRef: qx,
      dragStartPos: j9,
      nodeStartPos: Kx,
      dragElementRef: D9,
      dragNodeIdRef: Ky,
      clearConnectionDropMenuState: Jb,
      forceEndStuckInteraction: wA
    } = pxi(SDi({
      view: rr,
      viewRef: Dn,
      canvasRef: Lo,
      mousePosRef: $y,
      selectionBoxDivRef: jh,
      setView: qn,
      setMousePos: Bo,
      isZoomLocked: Gr,
      handleNodeDoubleClick: Qb,
      nodes: ft,
      selectedNodeId: Ea,
      selectedNodeIds: ga,
      selectedNodeIdsRef: Ya,
      selectedNodeIdRef: $a,
      nodesRef: ns,
      connectingLineRef: t1,
      connectingLineReverseRef: Vb,
      updateConnectingLineDOM: pLr,
      svgContainerRef: $f,
      connectionsRef: bt,
      visibleConnectionsRef: r0,
      freezeAllVideos: TI,
      unfreezeVideos: N9,
      collectionEndpointsRef: i0,
      intraGroupConnectionIdsRef: Us,
      groupsRef: at,
      setNodes: ht,
      setConnections: jt,
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      setSelectedConnectionId: ki,
      generateId: Fi,
      isSelectingRef: By,
      multiNodeDragStartPos: UT,
      isPanning: xd,
      isSelecting: sl,
      selectionBox: Bf,
      dragNodeId: Wo,
      resizingNodeId: Xo,
      resizeDirection: Oc,
      connectingSource: Se,
      connectingTarget: Je,
      connectingInputType: dn,
      multiConnectingSourceIds: Rr,
      multiConnectingTargetIds: ca,
      frameContextMenu: ks,
      historyContextMenu: Vc,
      isDraggingGroupRef: h_,
      isResizingGroupFrameRef: Ed,
      isDraggingSelectionBoundsRef: Kl,
      setIsPanning: _m,
      setIsDragging: Zs,
      setDragNodeId: Qs,
      setResizingNodeId: fl,
      setResizeDirection: km,
      setIsSelecting: xu,
      setSelectionBox: Gb,
      setConnectingSource: Be,
      setConnectingTarget: ut,
      setConnectingInputType: Xn,
      setMultiConnectingSourceIds: Vr,
      setMultiConnectingTargetIds: za,
      setContextMenu: Ms,
      setSelectionContextMenu: Xh,
      setFrameContextMenu: Yo,
      setHistoryContextMenu: zd,
      findGroupAtEmptyPoint: b_,
      onGroupEmptyAreaPointerDown: Fc,
      canvasWorldRef: Ar,
      showCanvasSnap: h,
      showAlignmentGuides: _,
      effectiveCanvasGridSpacing: d,
      followDownstreamOnDrag: p,
      setAlignmentGuides: ue,
      handleDropNodeOntoGroup: EI,
      dismissCompactRefCanvasPick: tn,
      compactRefCanvasPickTargetGenNodeId: gr,
      canvasEventSelectionBindings: X3
    }));
  Xd.current = wA;
  const kw = g.useCallback(() => {
    _Di({
      clearConnectionDropMenuState: Jb,
      setConnectingSource: Be,
      setConnectingTarget: ut,
      setConnectingInputType: Xn,
      setMultiConnectingSourceIds: Vr,
      setMultiConnectingTargetIds: za,
      setHoveredGroupId: FQ,
      setContextMenu: Ms
    });
  }, [Jb, Be, ut, Xn, Vr, za, Ms]);
  Fl.current = kw;
  const xA = Bcr({
    connectingSource: Se,
    connectingTarget: Je,
    multiConnectingSourceIds: Rr,
    multiConnectingTargetIds: ca
  });
  Lpi(xA, Lo, ls, kw);
  const J3 = VTi({
      dragNodeId: Wo,
      dragNodeIdRef: Ky,
      document: je,
      move: Am,
      release: vA
    }),
    Z3 = g.useCallback(Xa => {
      vAi(Xa, {
        windowDragging: J3.owns,
        panning: jl,
        panPending: Av,
        move: Am,
        hotInteraction: () => dmi(xd, Eo, Wo, Xo) || Yi() || Kl.current || h_.current,
        ...bI,
        toWorld: np,
        syncCandidate: zf
      });
    }, [J3, Am, np, zf, bI, Eo, xd, Wo, Xo]),
    Qy = NEi({
      document: je,
      canvasRef: Lo,
      activeTool: ke,
      subTool: rt,
      strokes: Ae,
      selectedIds: Ce,
      setStrokes: Fe,
      setSelectedIds: He,
      toWorld: np
    }),
    o1 = zEi({
      document: je,
      canvasRef: Lo,
      activeTool: ke,
      subTool: rt,
      brushColor: ze,
      brushWidth: Ke,
      eraserWidth: De,
      zoom: () => Dn.current.zoom,
      toWorld: np,
      setStrokes: Fe,
      generateId: Fi
    }),
    n8 = o1.store.setHud,
    s0 = qEi({
      document: je,
      canvasRef: Lo,
      boxes: Ne,
      activeTool: ke,
      dark: a === "dark",
      selectedId: Ft,
      editingId: it,
      setBoxes: me,
      setSelectedId: We,
      setEditingId: It,
      setActiveTool: ve,
      skipClick: Ze,
      generateId: Fi,
      toWorld: np
    }),
    RI = g.useSyncExternalStore(s0.store.subscribe, s0.store.getDraggingId, s0.store.getDraggingId) !== null,
    Yy = g.useCallback(Xa => {
      _Ai(Xa, {
        activeTool: ke,
        subTool: rt,
        lastPenDownAt: $e.current,
        now: Date.now,
        editingProjectName: Zp.current,
        finishProjectName: Jm,
        focusEditing: !!zx,
        cancelFocusAnalysis: wI,
        beginMarquee: Qy.beginMarquee,
        beginDoodle: o1.begin,
        dismissEmptyState: zl.dismissEmptyState,
        beginText: s0.beginCreate,
        fallback: i1
      });
    }, [ke, Jm, i1, rt, zx, wI, s0, o1, Qy, zl.dismissEmptyState]),
    iL = g.useCallback(Xa => {
      wAi(Xa, {
        selection: Qy,
        doodle: o1,
        text: s0,
        wireConnecting: Se != null || Je != null || !!(Rr != null && Rr.length) || !!(ca != null && ca.length),
        panning: jl,
        isPanning: xd,
        panPending: Av,
        viewInteracting: Yi,
        nodeResizing: $4n,
        isSelecting: () => By.current,
        erasing: ke === "doodle" && rt === "eraser",
        setEraserHud: n8,
        fallback: Z3
      });
    }, [ke, rt, Z3, xd, Se, Je, Rr, ca, s0, o1, Qy, n8]),
    _A = g.useCallback(Xa => {
      xAi(Xa, {
        selection: Qy,
        doodle: o1,
        text: s0,
        fallback: vA
      });
    }, [vA, s0, o1, Qy]),
    r8 = g.useCallback((Xa, ao) => {
      const Ys = Dn.current,
        Zd = Ys.x + Xa,
        Sg = Ys.y + ao;
      Zd === Ys.x && Sg === Ys.y || (Ys.x = Zd, Ys.y = Sg, VDe(Ar.current, Ys.x, Ys.y, Ys.zoom), rkt(Ys.x, Ys.y), L5t(Ys));
    }, []);
  e2i({
    isDragging: hmi(Eo, Wo, h_.current, Kl.current),
    connectingSource: Se,
    isPanning: xd || Ca || jl(),
    view: rr,
    setView: qn,
    onPanDelta: r8,
    enabled: !0
  });
  const {
      handleNodeMouseDown: Du,
      handleNodeMouseUp: L9,
      handleStartResize: e4
    } = Hki({
      selectedNodeIds: ga,
      connectingSource: Se,
      connectingTarget: Je,
      connectingInputType: dn,
      multiConnectingSourceIds: Rr,
      multiConnectingTargetIds: ca,
      dragStartPos: j9,
      nodeStartPos: Kx,
      dragElementRef: D9,
      dragNodeIdRef: Ky,
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      onSelectionNotFromBoxSelect: () => {
        jn(!1), ar(!1);
      },
      onClearGroupSelection: () => dt(null),
      setDragNodeId: Qs,
      setResizingNodeId: fl,
      setResizeDirection: km,
      setConnections: jt,
      setConnectingSource: Be,
      setConnectingTarget: ut,
      setConnectingInputType: Xn,
      setMultiConnectingSourceIds: Vr,
      setMultiConnectingTargetIds: za,
      generateId: Fi,
      setNodes: ht,
      nodesRef: ns,
      connectionsRef: bt,
      onMultiSelectionDragStart: Dh,
      selectedNodeIdsRef: Ya,
      canvasDoodleBrushOrEraserPassthrough: Ve,
      onNodeDragGestureStart: J3.attach
    }),
    O9 = g.useCallback(() => {
      $a.current == null && Ya.current.size === 0 && xt.current == null || ($a.current = null, Ya.current = new Set(), j5(Ya.current), xt.current = null, ba(null), _a(new Set()), dt(null));
    }, []),
    {
      handleStartConnectFromOutput: oL,
      handleStartConnectFromInput: a8,
      handleConnectToInput: B9,
      handleConnectToOutput: sL
    } = Iki({
      view: rr,
      canvasRef: Lo,
      connectingSource: Se,
      connectingTarget: Je,
      connectingInputType: dn,
      setMousePos: Bo,
      setConnectingSource: Be,
      setConnectingTarget: ut,
      setConnectingInputType: Xn,
      setConnections: jt,
      setNodes: ht,
      nodes: ft,
      generateId: Fi,
      onSingleNodeWireStart: O9
    }),
    {
      getNodeCallbacks: $0
    } = nAi({
      nodes: ft,
      nodesRef: ns,
      handleNodeMouseDown: Du,
      handleNodeMouseUp: L9,
      deleteNode: pA,
      handleStartResize: e4,
      handleStartConnectFromOutput: oL,
      handleStartConnectFromInput: a8,
      onBeginConnectGesture: O9,
      handleConnectToInput: B9,
      handleConnectToOutput: sL
    }),
    {
      handleNavigate: t4
    } = rAi({
      lightboxItem: sr,
      setLightboxItem: la,
      setHistory: Mr
    }),
    {
      sendFromLightbox: F9,
      sendFromChat: Zb,
      sendHistoryItems: v_,
      closeLightbox: Qx,
      openChatMedia: n4
    } = jOi({
      document: je,
      canvasRef: Lo,
      viewRef: Dn,
      nodesRef: ns,
      setNodes: ht,
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      generateId: Fi,
      lightboxItem: sr,
      setLightboxItem: la,
      setLightboxOpen: Ta,
      setIsCanvasFullscreen: Jh
    });
  g.useEffect(() => (oJt(Xa => Zb(Xa)), () => oJt(null)), [Zb]);
  const NI = bAi({
      document: je,
      view: rr,
      generateId: Fi,
      setNodes: ht,
      select: ba,
      error: qi
    }),
    jI = mAi({
      document: je,
      directorIdRef: zr,
      nodesRef: ns,
      view: rr,
      prepareLocal: yAi,
      generateId: Fi,
      setNodes: ht,
      select: ba,
      success: Vs,
      error: qi
    }),
    {
      handleFileDrop: i8
    } = Wzn({
      mousePosRef: $y,
      canvasRef: Lo,
      viewRef: Dn,
      setNodes: ht,
      generateId: Fi,
      onForceEndInteraction: p_
    });
  Yki({
    selectedNodeIdRef: $a,
    nodesRef: ns,
    setNodes: ht,
    onFilesPasted: Xa => i8(Xa)
  });
  const [Sn, Or] = g.useState(!1),
    [oa, ia] = g.useState(!1),
    {
      director3DOpen: qa,
      director3DInitialScene: mi,
      director3DSmartBuild: ro,
      handleDirector3DSceneChange: Di,
      openDirector3DForNode: _o,
      openDirector3DDetached: po,
      closeDirector3D: Ao
    } = Yui({
      document: je,
      nodes: ft,
      nodesRef: ns,
      setNodes: ht,
      nodeIdRef: zr,
      justClosedRef: Dr,
      cancelFocus: Fx.cancel,
      viewportSize: _r,
      commitView: yr
    }),
    [Fo, hs] = g.useState(!1),
    Rs = qa || e,
    {
      materialLibrary: xs,
      aiRoleLibrary: Lu,
      actions: Sm
    } = FSi({
      nodes: ft,
      setNodes: ht,
      materialLibraryOpen: Sn,
      aiRoleLibraryOpen: oa,
      saveToMaterialLibraryOpen: Fo,
      canvas: {
        view: rr,
        viewportSize: _r,
        commitCanvasViewImmediate: yr,
        setNodes: ht,
        setSelectedNodeId: ba,
        setMaterialLibraryOpen: Or,
        setAiRoleLibraryOpen: ia,
        setSaveToMaterialLibraryOpen: hs,
        generateId: Fi,
        toastSuccess: Vs,
        toastError: qi
      }
    }),
    {
      refreshMaterialLibraryAndSyncRoles: Vf,
      openSaveToMaterialLibrary: Hf,
      openSaveSelectedNodesToMaterialLibrary: Yx,
      closeSaveToMaterialLibraryModal: kA,
      handleInsertMaterialAssetToCanvas: ee,
      handleInsertMaterialAssetsToCanvas: se,
      resolveMaterialLibraryDrop: Pe,
      handleApplyAiRoleToCanvas: ot,
      handleConfirmSaveToMaterialLibrary: Nt
    } = Sm;
  l_i({
    onFileDrop: i8,
    onExternalFileDragStart: p_,
    enabled: !0
  });
  const {
    sendLocalSkillImageToCanvas: mn
  } = COi({
    document: je,
    canvasRef: Lo,
    viewRef: Dn,
    nodesRef: ns,
    setNodes: ht,
    setSelectedNodeId: ba,
    setSelectedNodeIds: _a,
    generateId: Fi,
    materialFolders: xs.allFolders,
    resolvePose: Gdr,
    reconcileViewport: Ir,
    endInteraction: () => Xd.current(),
    suspended: Rs
  });
  H1i(Wki({
    canvasRef: Lo,
    canvasContentRef: Ar,
    viewRef: Dn,
    setView: qn,
    isZoomLocked: Gr,
    nodeCount: F3,
    canvasMounted: !Rs,
    onViewFrame: Xa => D1i(Xa, Ar.current, qx.current)
  }));
  const {
    start: hr,
    change: ra,
    end: ka
  } = jpi({
    canvasRef: Lo,
    worldRef: Ar,
    viewRef: Dn,
    setView: qn,
    document: je
  });
  bA.current = ka;
  const ti = sAi(),
    [Li, zi] = dSi(),
    {
      poseLibraryOpen: Ni,
      setPoseLibraryOpen: Io,
      leftToolbarCollapsed: zo,
      setLeftToolbarCollapsed: Jo,
      leftToolbarDock: sn,
      setLeftToolbarDock: Tn,
      canvasLeftToolbarInsetPx: lr,
      canvasSidePanelOpen: Tr,
      showCanvasHelpPanel: Qr,
      canvasViewportBarLeftPx: Sa
    } = dDi({
      projectPanelOpen: Li,
      aiRoleLibraryOpen: oa
    }),
    {
      history: Ka,
      characters: ma,
      "kling-subjects": Va,
      "rh-app-library": Ci,
      project: Ji,
      material: Os,
      pose: Vo,
      "production-center": As,
      "project-memory": Ql
    } = cSi({
      setHistoryOpen: pi,
      setCharactersOpen: h_t,
      setKlingSubjectsOpen: u_t,
      setRhAppLibraryOpen: olr,
      setProjectPanelOpen: zi,
      setMaterialLibraryOpen: Or,
      setPoseLibraryOpen: Io,
      setActiveTool: ve
    });
  ehi(Rs || oa, gA), g.useLayoutEffect(() => {
    if (qa || !Dr.current) return;
    Dr.current = !1;
    const Xa = Dn.current;
    Ar.current && mY(Ar.current, Xa), I$n(ns.current.length, {
      ossMode: ua()
    });
  }, [qa]);
  const yl = td,
    Jd = g.useCallback(Xa => {
      (Ys => {
        Ys(Xa);
      })(Ym);
    }, []),
    zc = g.useCallback(Xa => {
      const ao = Dn.current,
        Ys = {
          x: (160 - ao.x) / ao.zoom,
          y: (140 - ao.y) / ao.zoom
        },
        Zd = pdi(Xa, ns.current, Fi, Ys);
      ht(Sg => [...Sg, ...Zd.nodes]), Zd.connections.length && jt(Sg => [...Sg, ...Zd.connections]);
    }, [ht, jt]),
    [Dp, Im] = g.useState(!1),
    [AA, l0] = g.useState(!1),
    [r4, Aw] = g.useState(!1),
    {
      projects: _G,
      currentProjectId: s1,
      currentProjectName: Hpe,
      currentProjectSnapshotId: c5r,
      saveReceipt: wVt,
      isSaving: $Ze,
      isLoading: w_,
      refreshList: see,
      saveProject: GZe,
      saveProjectIncremental: d5r,
      openProject: u5r,
      insertProject: h5r,
      deleteProject: xVt,
      clearCurrentProject: p5r,
      renameProject: _Vt,
      renameProjectById: m5r,
      projectProgressStore: kVt
    } = zTi({
      nodes: ft,
      connections: wt,
      view: rr,
      groups: Bt,
      canvasTextBoxes: Ne,
      canvasDoodleStrokes: Ae,
      setNodes: ht,
      setConnections: jt,
      viewRef: Dn,
      commitView: yr,
      setGroups: wn,
      setCanvasTextBoxes: me,
      setCanvasDoodleStrokes: Fe,
      viewportSize: _r,
      historyRef: Pr,
      setHistory: Hn,
      success: Vs,
      onBeforeOpen: Yb
    });
  g.useEffect(() => {
    Ghe(s1);
  }, [s1]);
  const {
    markProjectClean: AVt,
    flushProjectAutosave: lee,
    hasPendingProjectAutosaveChanges: f5r
  } = s_i({
    currentProjectId: s1,
    currentProjectName: Hpe,
    currentProjectSnapshotId: c5r,
    saveReceipt: wVt,
    fallbackProjectName: yl,
    isLoading: w_,
    isSaving: $Ze,
    saveProject: GZe,
    saveProjectIncremental: d5r,
    source: {
      nodes: ft,
      connections: wt,
      groups: Bt,
      canvasTextBoxes: Ne,
      canvasDoodleStrokes: Ae,
      view: rr
    },
    readDocument: () => ({
      nodes: ns.current,
      connections: bt.current,
      groups: at.current,
      canvasTextBoxes: Re.current,
      canvasDoodleStrokes: Me.current
    }),
    savedSignatureRef: Ud
  });
  mfi(je, fn, s1, w_), Mmi({
    nodesRef: ns,
    connectionsRef: bt,
    bridgeRef: Rt.chat.bridgeRef,
    capabilitiesRef: Rt.capabilitiesRef,
    redesignGateRef: Rt.session.redesignGateRef,
    flushStateRef: Rt.flushStateRef,
    projectIdRef: fn,
    projectId: s1,
    projectLoading: w_,
    getState: qb,
    execute: II
  }), p0i({
    projectId: s1,
    projectLoading: w_,
    projectIdRef: fn,
    nodes: ft,
    connections: wt,
    history: Kt,
    nodesRef: ns,
    connectionsRef: bt,
    historyRef: Pr,
    success: Vs,
    error: qi
  }), syi({
    nodesRef: ns,
    connectionsRef: bt,
    setNodes: ht,
    canvasRef: Lo,
    viewRef: Dn,
    projectIdRef: fn,
    projectId: s1,
    projectLoading: w_,
    bridgeRef: Rt.chat.bridgeRef,
    readState: qb,
    generateId: Fi,
    toastSuccess: Vs,
    toastError: qi
  }), Gdi({
    currentProjectId: s1,
    chatSessions: Zt,
    currentChatId: tt
  }), cfi(je, s1, w_, F3, qb), g.useEffect(() => {
    Of.current = Xa => {
      _Vt(Xa);
    };
  }, [_Vt]);
  const z9 = UTi(_G),
    SVt = {
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      setSelectedConnectionId: ki,
      clearConnectionDial: D3,
      setEditingCanvasTextId: It,
      setSelectedCanvasTextId: We,
      setSelectedDoodleIds: He,
      setMultiConnectingSourceIds: Vr,
      setMultiConnectingTargetIds: za,
      clearBatchConnectionCandidate: Zv,
      setCropSelectModeNodeId: O0,
      setSelectionBox: Gb,
      setIsSelecting: xu,
      setConnectingSource: Be,
      setConnectingTarget: ut,
      setConnectingInputType: Xn,
      setActiveTool: ve,
      setAlignPanelOpen: Aw,
      setLightboxOpen: Ta,
      setLightboxItem: la
    },
    VZe = Bfi({
      open: u5r,
      flush: lee,
      download: async Xa => {
        await z9.downloadFromCloud(Xa);
      },
      refreshList: see,
      cloudListFetched: z9.cloudListFetched,
      refreshCloudList: z9.refreshCloudList,
      resetInteraction: () => Dlr(SVt),
      syncName: Jd,
      dismissEmpty: zl.dismissEmptyState,
      closePanel: () => zi(!1),
      markClean: AVt,
      success: BBe,
      error: qi
    }),
    HZe = zfi({
      projectId: s1,
      projectName: Hpe,
      projects: _G,
      document: je,
      save: GZe,
      refreshList: see,
      insert: h5r,
      deleteLocal: xVt,
      cloudListFetched: z9.cloudListFetched,
      refreshCloudList: z9.refreshCloudList,
      upload: z9.uploadToCloud,
      download: z9.downloadFromCloud,
      deleteCloud: z9.deleteFromOss,
      open: VZe.open,
      close: () => zi(!1),
      success: Xa => (Xa === "项目已保存" || Xa === "已另存为新项目" ? BBe : Vs)(Xa),
      error: qi
    }),
    IVt = {
      nodes: {
        ref: ns,
        set: ht
      },
      connections: {
        ref: bt,
        set: jt
      },
      groups: {
        ref: at,
        set: wn
      },
      canvasTextBoxes: {
        ref: Re,
        set: me
      },
      canvasDoodleStrokes: {
        ref: Me,
        set: Fe
      }
    },
    cee = Pfi({
      document: je,
      projectIdRef: fn,
      clearProjectIdentity: p5r,
      collections: IVt,
      viewport: ef,
      commitView: yr,
      pendingNodeCommit: Rt.flush.deferredNodeCommitQueuedRef,
      pendingConnectionCommit: Rt.flush.deferredConnectionCommitQueuedRef,
      cancelOpen: () => {
        VZe.cancel(), Yb();
      },
      setHistoryFromStorage: Hn,
      interaction: SVt,
      resetName: Xa => {
        Ym(""), hh(""), zl.setEmptyStateDismissed(Xa), fw(Xa), Hc(Xa);
      },
      focusName: () => {
        var Xa;
        return (Xa = Xm.current) == null ? void 0 : Xa.focus();
      },
      markClean: AVt,
      notify: Xa => {
        try {
          Vs == null || Vs(Xa);
        } catch {}
      }
    }),
    g5r = jfi({
      document: je,
      clear: cee,
      collections: IVt,
      commitView: yr,
      readView: () => Dn.current,
      setHistoryFromStorage: Hn,
      setChatSessions: Ln,
      setName: Jd,
      dismissEmpty: zl.dismissEmptyState
    }),
    CVt = {
      importDocument: {
        session: je,
        commit: g5r
      },
      projectName: yl,
      nodes: ft,
      connections: wt,
      view: rr,
      history: Kt,
      chatSessions: Zt,
      characterLibrary: Lc,
      klingSubjectLibrary: Qd,
      selectedNodeId: Ea,
      selectedNodeIds: ga,
      groups: Bt,
      canvasTextBoxes: Ne,
      canvasDoodleStrokes: Ae,
      setNodes: ht,
      setConnections: jt,
      setCharacterLibrary: Xp,
      setKlingSubjectLibrary: Xv,
      setGroups: wn,
      setSelectionContextMenu: Xh,
      viewportSize: _r,
      onProgress: xg.report
    },
    {
      handleLoadProject: y5r,
      handleImportWorkflow: b5r
    } = W2i(CVt);
  hfi({
    document: je,
    projectId: s1,
    projectName: Hpe,
    fallbackName: yl,
    flushAutosave: lee,
    save: GZe
  }), J2i(Kt, Mr, Hn), g.useEffect(() => FOn(async () => {
    var ao;
    if (w_) throw new Error("请等待画布加载完成后再切换教学模式。");
    if (!ns.current.length && !at.current.length && !Re.current.length && !Me.current.length && !s1) return;
    if (!(await ((ao = window.__qdmEmergencySave) == null ? void 0 : ao.call(window, "teaching-mode")))) throw new Error("当前画布尚未保存成功，已保留当前模式。请检查本地存储后重试。");
  }), [w_, s1]);
  const {
      tryConsumeUndoForDoodle: EVt,
      tryConsumeDoodleSubToolKey: v5r
    } = w2i({
      activeTool: ke,
      subTool: rt,
      strokesRef: Me,
      setStrokes: Fe,
      setSelectedIds: He,
      setSubTool: nt,
      setBrushWidth: Xe,
      setEraserWidth: Ye
    }),
    TVt = g.useCallback(async () => {
      await HZe.saveFromShortcut(yl);
    }, [HZe, yl]),
    dee = g2i({
      nodes: ft,
      connections: wt,
      groups: Bt,
      canvasTextBoxes: Ne,
      setNodes: ht,
      setConnections: jt,
      setGroups: wn,
      setCanvasTextBoxes: me,
      nodesRef: ns,
      connectionsRef: bt,
      groupsRef: at,
      canvasTextBoxesRef: Re,
      enabled: !w_,
      revision: s1
    });
  Rt.undoRef.current = dee.undo, Rt.redoRef.current = dee.redo, Tdi({
    enabled: !w_ && !Rs,
    zoomLocked: Gr,
    viewRef: Dn,
    nodesRef: ns,
    viewport: ef,
    save: TVt,
    undo: () => {
      EVt() || dee.undo();
    },
    redo: dee.redo,
    zoom: aA,
    commitView: yr
  }), s2i(qki({
    nodesRef: ns,
    connectionsRef: bt,
    mousePosRef: $y,
    deleteNode: pA,
    deleteNodes: vw,
    setNodes: ht,
    setConnections: jt,
    setGroups: wn,
    onSave: TVt,
    selectedNodeIdRef: $a,
    selectedNodeIdsRef: Ya,
    selectedConnectionIdRef: Wn,
    setSelectedNodeId: ba,
    setSelectedNodeIds: _a,
    setSelectedConnectionId: ki,
    selectedGroupIdRef: xt,
    groupsRef: at,
    onDeleteCollapsedStackGroup: tf,
    onClearGroupSelection: () => dt(null),
    setSelectedGroupId: dt,
    tryConsumeUndoForDoodle: EVt,
    tryConsumeDoodleSubToolKey: v5r,
    onUndo: dee.undo,
    onRedo: dee.redo
  })), qya({
    nodesRef: ns,
    connectionsRef: bt,
    groupsRef: at,
    canvasTextBoxesRef: Re,
    canvasDoodleStrokesRef: Me,
    savedProjectSignatureRef: Ud,
    hasPendingProjectChanges: f5r,
    hasSavedProjectRef: fn,
    flushProjectAutosave: lee
  });
  const Lp = a === "dark",
    MVt = Lp ? z : O,
    w5r = g.useCallback(Xa => {
      Lp ? V(Xa) : L(Xa);
    }, [Lp, V, L]),
    x5r = ft.length > V4e.PERF_MODE_THRESHOLD,
    _5r = x_t(Eo, Wo, Xo) || sl || fa,
    k5r = sl,
    PVt = c4n(rr.zoom);
  m_i({
    nodes: ft,
    view: rr,
    isInteracting: _5r,
    canvasWidth: ef.width,
    canvasHeight: ef.height
  });
  const RVt = Math.abs(rr.x - Dn.current.x) > .5 || Math.abs(rr.y - Dn.current.y) > .5 || Math.abs(rr.zoom - Dn.current.zoom) > 1e-4,
    DI = xd || Ca || jl() || qx.current || Yi() || RVt ? Dn.current : rr,
    EEe = xd || Ca,
    A5r = Hdi(EEe);
  pY(DI).transform;
  const NVt = UCi({
    frozen: z3,
    visibilityView: Hb,
    liveView: DI,
    transforming: yw
  });
  Vdi({
    canvasWorldRef: Ar,
    effectiveView: DI,
    isPanningRef: qx,
    isViewRefPending: RVt
  });
  const S5r = p_i({
      nodes: G3,
      view: NVt.view,
      viewportWidth: ef.width,
      viewportHeight: ef.height,
      isCanvasInteracting: x_t(Eo, Wo, Xo) || Kl.current || Ca || jl(),
      forceIncludeNodeIds: _I,
      dragNodeId: Wo,
      selectedNodeIds: ga,
      resizingNodeId: Xo
    }),
    I5r = g.useMemo(() => _Ei(Ae, Ce), [Ae, Ce]),
    C5r = TEi({
      document: je,
      strokes: Ae,
      selectedIds: Ce,
      nodesRef: ns,
      setNodes: ht,
      setSelectedNodeId: ba,
      generateId: Fi
    }),
    jVt = iTi({
      document: je,
      item: sr,
      open: da,
      nodes: ft,
      history: Kt,
      setItem: la,
      setHistory: Mr
    });
  Qui({
    nodes: ft,
    connections: wt,
    history: Kt,
    lightbox: [sr, jVt],
    readEditLayerHistory: () => i_i(je)
  });
  const E5r = g.useMemo(() => zx ? {
      onExit: GT,
      isDark: Lp,
      chatApiConfigs: Cn,
      modelId: x9,
      platformGroup: sA,
      onModelIdChange: JD,
      onPlatformGroupChange: Gy
    } : null, [zx, GT, Lp, Cn, x9, sA, JD, Gy]),
    T5r = g.useCallback(() => {
      Hc(!0), setTimeout(() => {
        var Xa;
        return (Xa = Xm.current) == null ? void 0 : Xa.focus();
      }, 0);
    }, []),
    WZe = VZe.open,
    DVt = g.useCallback(() => {
      Yb(), tFe();
    }, [Yb]),
    M5r = g.useCallback(() => {
      JAi({
        abortActiveDownloadUi: Yb,
        refreshProjectList: see,
        clearCanvas: cee
      });
    }, [Yb, see, cee]);
  ZAi({
    isAgentMode: Aa === "agent",
    projectActions: {
      rename: async (Xa, ao) => {
        if (!(await lee())) throw new Error("画布保存尚未完成，请稍后重试");
        const Ys = await m5r(Xa, ao);
        return fn.current === Xa && Jd(Ys.name), Ys;
      },
      delete: async Xa => {
        if (!(await lee())) throw new Error("画布保存尚未完成，请稍后重试");
        const ao = fn.current === Xa;
        await xVt(Xa), ao && (!fn.current || fn.current === Xa) && cee({
          toastMessage: null
        });
      },
      close: async Xa => {
        if (fn.current === Xa) {
          if (!(await lee())) throw new Error("画布保存尚未完成，请稍后重试");
          cee({
            toastMessage: null
          });
        }
      }
    },
    openProject: WZe,
    createNewCanvas: M5r,
    setAgentMode: () => {
      OY(), pn("agent");
    },
    sendAgentPrompt: Xa => {
      OY(), pn("agent"), hi(Xa);
    }
  });
  const P5r = g.useCallback(Xa => t4(Xa), [t4]),
    LVt = myi({
      nodes: ft,
      selectedNodeId: Ea,
      klingSubjectLibrary: Qd,
      updateNode: z0,
      viewRef: Dn,
      canvasInnerViewport: ef,
      generateId: Fi,
      setNodes: ht,
      setSelectedNodeId: ba,
      setSelectedNodeIds: _a,
      selectedNodeIdsRef: Ya,
      toastSuccess: Vs,
      toastError: qi
    }),
    R5r = g.useCallback(() => sa(Xa => !Xa), []),
    N5r = g.useCallback(() => Jo(!zo), [Jo, zo]),
    j5r = g.useCallback(Xa => {
      ihn(Xa), ve(ao => ao === "text-create" ? "select" : "text-create");
    }, []),
    D5r = g.useCallback(Xa => {
      ihn(Xa), s0.cancel(), ve(ao => ao === "doodle" ? "select" : "doodle");
    }, [s0]),
    L5r = g.useCallback(() => l0(!0), []),
    O5r = g.useCallback(() => Aw(Xa => !Xa), []),
    B5r = pCi(Jl, Vs),
    {
      canvasNodeRendererRuntimeRef: F5r,
      canvasNodeLayerGraphIndex: z5r,
      canvasNodeLayerInvalidation: U5r,
      canvasNodeLayerViewport: $5r,
      canvasNodeLayerPromptLibrary: G5r,
      canvasNodeLayerSession: V5r
    } = WCi({
      content: mCi({
        document: {
          generationDocument: je,
          nodes: ft,
          connections: wt,
          dataVersion: Xt,
          updateNode: z0,
          setNodes: ht,
          setConnections: jt,
          setHistory: Mr,
          generateId: Fi,
          deleteNode: pA
        },
        connections: a1.connections,
        generation: {
          chatApiConfigs: Cn,
          genNodeApiConfigs: Ct,
          isModelHiddenInList: Vn,
          globalApiKey: Oe,
          jimengSuperResUrl: Ht,
          jimengSuperResApiKey: nn,
          apiStatus: ql,
          generationTimers: L3,
          runEditImage: Ul,
          runExpandImage: W3,
          visibleImageConfigs: un,
          expandImageConfigs: Jn,
          showHuyaModels: Ot,
          generate: _d
        },
        storyboard: {
          videoAnalysis: Lh,
          shotBreakdown: qy,
          scriptParse: mA,
          storyboard: nm,
          generateChartBatch: T9,
          chartArtStyles: ti
        },
        libraries: {
          rh: B5r,
          materialLibrary: xs,
          resolveMaterialLibraryDrop: Pe,
          characterLibrary: Lc,
          setCharacterLibrary: Xp,
          setCharactersOpen: h_t,
          klingSubjectLibrary: Qd,
          setKlingSubjectsOpen: u_t,
          prompt: uh
        },
        media: {
          setCroppingNodeId: oo,
          frameSelectionRef: Df,
          setFrameContextMenu: Yo,
          setInputImageContextMenu: yu,
          setPreviewContextMenu: Ub,
          setLightboxItem: la,
          setLightboxOpen: Ta,
          setChatComposerFiles: q5,
          setIsChatOpen: an,
          handleDownloadFile: fc,
          handleDownloadSelected: _w,
          isDownloading: Ps,
          downloadProgress: xi,
          handleDownloadUrlList: Q3,
          openDirector3DForNode: _o
        },
        presentation: {
          isDark: Lp,
          effectiveView: DI,
          enableGenerationNodeAnimation: P,
          showStartGenerateButton: C,
          hideAllInputImagePreviews: f,
          canvasRef: Lo,
          canvasContentRef: ha,
          setIsCanvasFullscreen: Jh,
          notifyCanvas: oA
        },
        interaction: {
          connectingSource: Se,
          connectingTarget: Je,
          connectingInputType: dn,
          setConnectingSource: Be,
          setConnectingTarget: ut,
          setConnectingInputType: Xn,
          selectedNodeId: Ea,
          selectedNodeIds: ga,
          setSelectedNodeId: ba,
          setSelectedNodeIds: _a,
          setMousePos: Bo,
          startCompactRefCanvasPick: ZD,
          compactRefCanvasPickTargetGenNodeId: gr,
          dismissCompactRefCanvasPick: tn,
          compactCanvasPickResumeSnap: ir,
          storyboardShotCanvasPick: jr,
          startStoryboardShotCanvasPick: AI,
          focusEditPromptOpenSnap: vI,
          registerGenInlineDirectorUi: Bx,
          registerGenPromptPanelUi: m_,
          setDoodleDrawingNodeId: Fy
        }
      }),
      host: fCi({
        callbacks: {
          getNodeCallbacks: $0,
          nodeDirtyVersionMap: SI,
          updateNodeSettings: C9
        },
        pick: {
          compactRefCanvasPickTargetNode: br,
          compactRefPickInputType: Br.current,
          clipboardPromptReplaceTip: Jr,
          finalizeCompactRefCanvasPick: Vx,
          finalizeStoryboardShotCanvasPick: eL,
          dismissStoryboardShotCanvasPick: Lr
        },
        canvasConnectionDial: Gf,
        canvasFocusEdit: n1,
        shell: {
          marquee: {
            isSelecting: sl,
            selectionBox: Bf,
            isSelectingLive: By.current
          },
          showBoxSelectBounds: _n,
          cropSelectModeNodeId: Jv,
          markerModeNodeId: Ff,
          doodleDrawingNodeId: B0,
          canvasDoodleBrushOrEraserPassthrough: Ve,
          isCanvasPanningActive: EEe,
          localCacheMode: ei(),
          isDragging: Eo,
          dragNodeId: Wo
        },
        session: {
          canvasProjectBootActive: HT,
          jsSuspendLevel: gl,
          nodeRenderStage: fi,
          multiConnectingSourceIds: Rr,
          multiConnectingTargetIds: ca,
          showNodeDeleteButton: S,
          showCanvasGenerationTimer: j,
          enableConnectWireTilt: I,
          enableConnectWireMarquee: E
        }
      }),
      graph: {
        connectionSignatures: $3,
        generationHistoryByNodeId: $t,
        connectedNodeIds: k9,
        duplicateBlockedNodeIds: v9,
        groupOutputNodeToGroupId: KT,
        expandedGroupNodeToGroupId: kI,
        previewCollapsedOrCompactNodeIds: WT,
        genInlineDirectorUiNodeIds: a0
      },
      layer: gCi({
        renderedNodes: dA,
        layerCamera: NVt,
        canvasInnerViewport: ef,
        denseMediaOverviewActive: Vy,
        dragNodeId: Wo,
        resizingNodeId: Xo,
        selectedNodeId: Ea,
        selectedNodeIds: ga,
        isDragging: Eo,
        selectionBoundsDragging: Kl.current,
        nodeQualityMap: Ux,
        visibleNodeIds: Nu,
        nodeDocument: Gn,
        promptLibrary: uh,
        session: {
          nodeDirtyVersionMap: SI,
          selectedNodeId: Ea,
          selectedNodeIds: ga,
          connectionDial: kg,
          clipboardPromptReplaceTip: Jr,
          focusEditAnalysesByNodeId: w9
        }
      })
    }),
    {
      visualState: H5r,
      eventHandlers: W5r
    } = fDi({
      ...nEi({
        handleCanvasMouseDownWithTextTool: Yy,
        handleCanvasMouseMoveWithTextTool: iL,
        handleCanvasMouseUp: vA,
        handleCanvasMouseUpWithTextTool: _A,
        handleCanvasDoubleClick: Xb,
        handleBackgroundClick: Wx,
        handleCanvasContextMenu: Ag
      }),
      ...{
        activeTool: ke,
        doodleSubTool: rt,
        lastPenPointerDownAtRef: $e,
        finishEditingProjectName: Jm,
        skipCanvasTextClearOnClickRef: Ze,
        editingCanvasTextId: it,
        setEditingCanvasTextId: It,
        setSelectedCanvasTextId: We,
        setDoodleEraserHudPos: n8,
        setEmptyStateDismissed: zl.setEmptyStateDismissed
      },
      ...{
        connectingSource: Se,
        connectingTarget: Je,
        multiConnectingSourceIds: Rr,
        multiConnectingTargetIds: ca,
        contextMenu: ls,
        cancelConnectingWireState: kw,
        dragNodeId: Wo,
        dragNodeIdRef: Ky,
        isPanning: xd,
        isPanningRef: qx,
        setIsPanning: _m,
        setIsDragging: Zs,
        setDragNodeId: Qs,
        setResizingNodeId: fl,
        setConnectingSource: Be,
        setConnectingTarget: ut,
        setConnectingInputType: Xn,
        setMultiConnectingSourceIds: Vr,
        setMultiConnectingTargetIds: za,
        multiNodeDragStartPos: UT
      },
      ...rEi({
        compactRefCanvasPickTargetGenNodeId: gr,
        storyboardShotCanvasPick: jr,
        focusEditTargetGenNodeId: zx,
        isViewportTransforming: yw,
        deferredCanvasPanning: A5r,
        localCacheMode: ei(),
        isCanvasTextDragging: RI,
        denseMediaOverviewActive: Vy,
        denseMediaMicroActive: A9,
        showBoxSelectBounds: _n,
        selectedNodeIdsSize: ga.size,
        zoomClassName: PVt
      })
    }),
    OVt = Rji({
      ...{
        connectingSource: Se,
        connectingTarget: Je,
        multiConnectingSourceIds: Rr,
        multiConnectingTargetIds: ca,
        reverseBatchConnectionActive: Nh,
        isCanvasPanningActive: EEe
      },
      ...{
        selectedNodeIds: ga,
        nodes: ft,
        connections: wt,
        createGroup: XT,
        createStackCard: g_,
        setSelectedNodeIds: _a,
        setSelectedNodeId: ba,
        setSelectedGroupId: dt,
        setShowCollectionForBoxSelect: jn,
        setShowBoxSelectBounds: ar,
        openSaveSelectedNodesToMaterialLibrary: Yx
      }
    });
  return Cdi({
    ...iEi({
      setProjectName: Jd,
      handleEditProjectNameStart: T5r,
      finishEditingProjectName: Jm,
      setLeftToolbarDock: Tn,
      refreshProjectList: see,
      handleOpenProjectFromSwitcher: WZe,
      handleCreateNewCanvasFromSwitcher: DVt,
      openSettingsPanel: gZ,
      toggleConsolePanel: s6n,
      openStorageManagePanel: i7r,
      handleDownloadSelected: _w,
      handleClearCanvas: cee
    }),
    ...oEi({
      handleCanvasGridToggle: K,
      setCanvasGridSpacing: s,
      setCanvasGridDotSize: l,
      handleCanvasSnapToggle: W,
      handleFollowDownstreamOnDragToggle: Q,
      handleCanvasMinimapToggle: q,
      handleShowAllCanvasConnectionsToggle: ne,
      setConnectionHitWidth: v,
      handleHideAllInputImagePreviewsToggle: de,
      handleAlignmentGuidesToggle: le,
      setLocateAnimationMaxNodes: k,
      handleCanvasBgGlowToggle: J,
      handleNodeDeleteButtonToggle: pe,
      handleStartGenerateButtonToggle: ce
    }),
    ...sEi({
      handleEnableConnectWireTiltToggle: we,
      handleEnableConnectWireMarqueeToggle: X,
      handleEnableGenerationConnectionFlowToggle: Z,
      handleGenerationConnectionFlowModeChange: re,
      handleEnableGenerationNodeAnimationToggle: fe,
      handleGenerationNodeAnimationModeChange: ye,
      handleCanvasGenerationTimerToggle: ie,
      setConnectionLineStrokeWidthRaw: F,
      setConnectionLineOpacityPercentRaw: G,
      onConnectionLineColorChange: w5r
    })
  }), Ddi({
    ...lEi({
      handleToggleHistoryFromToolbar: Ka,
      handleToggleCharactersFromToolbar: ma,
      handleToggleKlingSubjectsFromToolbar: Va,
      handleToggleRhAppLibraryFromToolbar: Ci,
      handleToggleProjectPanelFromToolbar: Ji,
      handleTogglePoseLibraryFromToolbar: Vo,
      handleToggleProductionCenterFromToolbar: As,
      handleToggleProjectMemoryFromToolbar: Ql,
      toggleChatPanel: jTn
    }),
    ...cEi({
      handleToggleLeftToolbarCollapsed: N5r,
      setActiveTool: ve,
      handleToggleTextToolFromToolbar: j5r,
      handleToggleDoodleToolFromToolbar: D5r,
      handleToggleAlignPanel: O5r,
      handleCreateNodeAtCanvasCenter: QT
    }),
    ...dEi({
      handleOpenCategorizedExport: L5r,
      handleLoadProject: y5r,
      handleImportWorkflow: b5r,
      handleOpenEmptySkillToWorkflow: Bi
    })
  }), sUa({
    setNodes: ht,
    downloadNodes: _w
  }), c.jsx(qji, {
    shell: {
      zoneMap: S5r,
      progress: {
        isDark: Lp,
        ioProgressSource: xg,
        projectSaving: $Ze,
        projectLoading: w_,
        projectReceipt: wVt,
        projectProgressStore: kVt
      },
      isDark: Lp,
      isPerfMode: x5r,
      isInteracting: k5r,
      zoomClassName: PVt,
      canvasBgColorDark: be,
      canvasBgColorLight: ae,
      generationRunner: c.jsxs(c.Fragment, {
        children: [q3, c.jsx(nSi, {
          history: Kt,
          setHistory: Mr,
          apiConfigs: Ge,
          globalApiKey: Oe
        }), c.jsx(tSi, {
          onSendToCanvas: v_,
          history: Kt,
          setHistory: Mr,
          models: Ct,
          apiConfigs: Ge,
          globalApiKey: Oe
        }), c.jsx(iSi, {
          onSendMediaToCanvas: v_,
          scriptApiConfigs: Cn,
          onSendScriptToCanvas: zc,
          getCanvasNodes: () => ns.current,
          apiConfigs: Ge,
          globalApiKey: Oe,
          history: Kt,
          setHistory: Mr
        })]
      })
    },
    header: {
      focusEditBanner: E5r,
      isDark: Lp,
      projectName: yl,
      isEditingProjectName: Jp,
      isDownloading: Ps,
      downloadProgress: xi,
      canvasSidePanelOpen: Tr,
      canvasLeftToolbarInsetPx: lr,
      showCanvasHelpPanel: Qr,
      showCanvasGrid: o,
      effectiveCanvasGridSpacing: d,
      effectiveCanvasGridDotSize: u,
      showCanvasSnap: h,
      followDownstreamOnDrag: p,
      showCanvasMinimap: m,
      hideAllInputImagePreviews: f,
      showAllCanvasConnections: y,
      connectionHitWidth: b,
      showAlignmentGuides: _,
      locateAnimationMaxNodes: w,
      showCanvasBgGlow: A,
      showNodeDeleteButton: S,
      showStartGenerateButton: C,
      projectNameInputRef: Xm,
      showNewProjectSaveHint: Rp,
      leftToolbarDock: sn,
      enableConnectWireTilt: I,
      enableConnectWireMarquee: E,
      enableGenerationConnectionFlow: M,
      generationConnectionFlowMode: T,
      enableGenerationNodeAnimation: P,
      generationNodeAnimationMode: R,
      showCanvasGenerationTimer: j,
      connectionLineStrokeWidth: B,
      connectionLineOpacityPercent: N,
      connectionLineColor: MVt,
      projects: _G,
      currentProjectId: s1,
      projectLoading: w_
    },
    hosts: {
      fadedIn: ge,
      isDark: Lp,
      history: {
        handleCloseHistoryPanel: e1,
        isDark: Lp,
        history: Kt,
        localCacheServerConnected: Js,
        localCacheSettingsOpen: tp,
        localServerConfig: uc,
        setLocalCacheSettingsOpen: xm,
        setLocalServerConfig: ep,
        setHistory: Mr,
        setHistoryFromStorage: Hn,
        setLightboxItem: la,
        setLightboxOpen: Ta,
        setBatchManageOpen: wi,
        handleHistoryPanelContextMenu: Uf,
        handleRefreshVideo: Qe,
        handleRefreshAudio: Mt,
        handleRefresh3d: cn,
        handleRefreshFalImage: Qn,
        handleRefreshMjImage: bn,
        handleRefreshComfyTask: Lt,
        historyHasMore: Ls,
        handleLoadMoreHistory: _s
      },
      characterLibrary: Lc,
      setCreateCharacterOpen: Ho,
      setCharacterLibrary: Xp,
      poseLibraryOpen: Ni,
      setPoseLibraryOpen: Io,
      handleInsertPoseToCanvas: NI,
      toastSuccess: Vs,
      toastError: qi,
      material: {
        open: Sn,
        library: xs,
        setOpen: Or,
        setRolesOpen: ia,
        refresh: Vf,
        insert: ee,
        insertMany: se
      },
      project: {
        open: Li,
        projects: _G,
        currentProjectId: s1,
        currentProjectName: Hpe,
        isSaving: $Ze,
        isLoading: w_,
        progressStore: kVt,
        projectName: yl,
        cloud: z9,
        actions: HZe
      },
      rhAppLibrary: $b,
      setRhAppLibrary: Jl,
      fillRhNode: LVt.fillRhNode,
      klingSubjectLibrary: Qd,
      setCreateKlingSubjectOpen: Im,
      setKlingSubjectLibrary: Xv,
      sendKlingSubject: LVt.sendKlingSubject,
      toolChrome: {
        layout: {
          dock: sn,
          aiRoleLibraryOpen: oa,
          canvasViewportBarLeftPx: Sa,
          collapsed: zo
        },
        toolbar: {
          leftToolbarDock: sn,
          leftToolbarCollapsed: zo,
          isDark: Lp,
          activeTool: ke,
          projectPanelOpen: Li,
          poseLibraryOpen: Ni,
          projectMemoryOpen: e
        },
        doodle: {
          visible: ke === "doodle",
          isDark: Lp,
          subTool: rt,
          setSubTool: nt,
          brushColor: ze,
          setBrushColor: Le,
          brushWidth: Ke,
          setBrushWidth: Xe,
          eraserWidth: De,
          setEraserWidth: Ye,
          store: o1.store,
          zoom: DI.zoom
        }
      }
    },
    stage: {
      shell: {
        canvasSuspendedForOverlay: Rs,
        freeSplitModalOpen: gw,
        gridSplitModalOpen: ph,
        canvasContainerRef: Zh,
        canvasRef: Lo,
        canvasWorldRef: Ar,
        isDark: Lp,
        isPanning: xd,
        canvasBgColorDark: be,
        canvasBgColorLight: ae,
        showCanvasBgGlow: A
      },
      visualState: H5r,
      eventHandlers: W5r,
      grid: {
        showCanvasGrid: o,
        isDark: Lp,
        view: rr,
        effectiveCanvasGridSpacing: d,
        effectiveCanvasGridDotSize: u
      },
      ...YAi(zl, {
        nodeCount: ft.length,
        projectBar: {
          isDark: Lp,
          projects: _G,
          projectLoading: w_,
          refreshProjectList: see,
          handleOpenProjectFromSwitcher: WZe,
          handleCreateNewCanvasFromSwitcher: DVt
        }
      }),
      referencePick: {
        compactRefCanvasPickTargetGenNodeId: gr,
        dismissCompactRefCanvasPick: tn
      },
      textDraft: {
        store: s0.store,
        effectiveView: DI,
        isDark: Lp
      },
      batchDials: {
        multiImageSelection: F0,
        reverseBatchSelection: ll,
        effectiveView: DI,
        isDark: Lp,
        handleStartMultiConnection: YT,
        handleStartReverseBatchConnection: Ro
      },
      canvasContentRef: ha,
      groupAtmosphere: {
        groups: Bt,
        nodes: ft,
        isDark: Lp,
        selectedGroupId: Pt
      },
      connections: {
        plan: V3,
        chrome: {
          hideConnections: La,
          showAllCanvasConnections: y,
          nodes: ft,
          nodesGeometryMap: cA,
          groups: Bt,
          effectiveView: DI,
          canvasInnerViewport: ef,
          isDark: Lp,
          isCanvasPanningActive: EEe,
          isDenseGraph: Gx,
          selectedNodeId: Ea,
          selectedNodeIds: ga,
          selectedConnectionId: ta,
          connectionLineStrokeWidth: B,
          connectionLineOpacityPercent: N,
          connectionLineColor: MVt,
          connectionHitWidth: b,
          mergedConnectionEndpoints: jp,
          intraGroupConnectionIds: Wb,
          enableGenerationConnectionFlow: M,
          generationConnectionFlowMode: T,
          alignmentGuides: he,
          connectingSource: Se,
          connectingTarget: Je,
          connectingGroupOutputId: rs,
          multiConnectingSourceIds: Rr,
          multiConnectingTargetIds: ca,
          svgContainerRef: $f,
          connectingLineRef: t1,
          connectingLineReverseRef: Vb
        },
        commands: {
          setSelectedConnectionId: ki,
          handleDeleteConnection: tL
        }
      },
      doodleLayer: {
        activeTool: ke,
        annotation: Te,
        visibleStrokes: Bc,
        draftStore: o1.store,
        selectionStore: Qy.store,
        selectionBounds: I5r,
        isDark: Lp,
        onBeginMove: Qy.beginMove,
        onBeginResize: Qy.beginResize,
        onCreateArtboard: C5r
      },
      selectionOverlay: {
        nodes: ft,
        nodesGeometryMap: cA,
        groups: Bt,
        selectedNodeIds: ga,
        isSelecting: sl,
        showBoxSelectBounds: _n,
        showCollectionForBoxSelect: wr,
        isDark: Lp,
        effectiveView: DI,
        boxSelectBatchConnectSourceIds: zy,
        connectingGroupOutputId: rs,
        focusRippleNodeId: Vt,
        focusRippleNonce: An,
        collectedNodeIds: $x,
        isDownloading: Ps,
        canDemoSelected: Y3,
        bindings: OVt,
        startBoxSelectGroupDrag: Dh,
        handleStartBoxSelectBatchConnect: tm,
        handleArrangeSelected: Za,
        expandCollection: nf,
        updateCollectionPosition: U0,
        handleCollectionDragFrame: R9,
        handleStartGroupConnect: nL,
        handleDownloadSelected: _w,
        handleDemoSelected: MI,
        onCollectionDragStart: P9,
        onCollectionDragEnd: aL,
        onDeleteStack: tf
      },
      textLayer: {
        annotation: Te,
        visibleTextBoxes: Np,
        isDark: Lp,
        textTool: s0
      },
      nodeLayer: {
        invalidation: U5r,
        viewport: $5r,
        session: V5r,
        graphIndex: z5r,
        promptLibrary: G5r,
        rendererRuntimeRef: F5r
      },
      groupChrome: {
        groups: Bt,
        nodes: ft,
        effectiveView: DI,
        selectedGroupId: Pt,
        isDark: Lp,
        isDownloading: Ps,
        connectingGroupOutputId: rs,
        selectionBox: Bf,
        selectionBoxDivRef: jh,
        isSelecting: sl,
        bindings: OVt,
        setSelectedGroupId: dt,
        handleGroupResize: t8,
        updateGroupName: rL,
        handleGroupResizeStart: yA,
        handleGroupResizeEnd: Kb,
        handleStartGroupConnect: nL,
        updateGroupColor: CI,
        deleteGroup: y_,
        executeGroup: o0,
        handleArrangeGroup: va,
        handleDownloadGroup: Hx,
        handleDemoGroup: PI
      }
    },
    chat: {
      chrome: {
        closeChatPanel: nWe,
        isDark: Lp,
        canvasBgColorDark: be,
        canvasBgColorLight: ae,
        chatWidth: Rn,
        chatFontSize: Un,
        setChatFontSize: er,
        handleChatResizeStart: ts,
        isResizingChat: aa
      },
      session: {
        chatPanelMode: Aa,
        setChatPanelMode: pn,
        chatModel: Cr,
        localSkillChatModel: Fn,
        setChatModel: tr,
        setLocalSkillChatModel: cr,
        chatPlatformGroup: kn,
        localSkillPlatformGroup: vr,
        setChatPlatformGroup: xn,
        setLocalSkillPlatformGroup: Wt,
        chatApiConfigs: Cn,
        chatWebSearchEnabled: Jt,
        chatApiProtocol: En,
        chatReasoningEffort: Sr,
        chatUseAliyunOss: Et,
        chatOssImageBase64: Mn,
        setChatWebSearchEnabled: Nn,
        setChatApiProtocol: Zn,
        setChatReasoningEffort: Bn,
        setChatUseAliyunOss: zn,
        setChatOssImageBase64: or,
        chatSessions: Zt,
        currentChatId: tt,
        isChatSending: mr,
        sendingChatSessionIds: Yr,
        historyMessageCount: wa,
        setCurrentChatId: zt,
        setHistoryMessageCount: xa,
        createNewChat: Ti,
        deleteChatSession: vi,
        deleteChatMessages: Vi,
        renameChatSession: Gi,
        sendChatMessage: hi,
        startSkillCreatorFromChat: vo,
        cancelChatSend: ci,
        resendChatMessage: ji,
        sessionsForCurrentMode: Ts,
        chatSessionsForHistory: dc,
        chatSessionLastTsById: Tl,
        selectChatSession: Ml
      },
      canvasBridge: {
        chatAgentGenPrefs: xr,
        setChatAgentGenPrefs: Nr,
        resolveAgentChoice: qr,
        patchChatMessage: Oa,
        bindLocalSkillRoot: Fa,
        addLocalSkillWorkspace: Ra,
        openLocalSkillWorkspace: ui,
        removeLocalSkillWorkspace: pr,
        localSkillWorkspaces: In,
        localSkillPermission: fr,
        setLocalSkillPermission: na,
        undoLocalSkillEdit: Ba,
        reviewLocalSkillFile: ai,
        handleOpenChatMediaLightbox: n4,
        getCanvasAtMentionItems: Uy,
        handleAddMemoryFileTextNode: hA,
        handleSendChatImagesToCanvas: Zb,
        handleSendLocalSkillImageToCanvas: mn,
        handleOpenSkillToWorkflow: xl
      }
    },
    modals: {
      aliases: {
        canvasContentRef: ha,
        setChatComposerFiles: q5,
        showHuyaModels: Ot,
        projectImportDocument: CVt.importDocument
      },
      document: {
        documentSession: je,
        isDark: Lp,
        nodes: ft,
        view: rr,
        selectedNodeIds: ga,
        history: Kt,
        setHistory: Mr,
        setNodes: ht,
        setConnections: jt,
        generateId: Fi,
        toastError: qi,
        toastSuccess: Vs,
        canvasRef: Lo,
        setLightboxItem: la,
        setLightboxOpen: Ta,
        onSendHistoryItemsToCanvas: v_
      },
      menus: {
        contextMenu: ls,
        setContextMenu: Ms,
        addNode: H3,
        cancelConnectingWireState: kw,
        commonCreateMenuTypeIds: Do,
        setCommonCreateMenuTypeIds: co,
        setActiveTool: ve,
        openDirector3DDetached: po,
        previewContextMenu: Pp,
        setPreviewContextMenu: Ub,
        setCroppingNodeId: oo,
        setIsChatOpen: an,
        splitImageToShots: fA,
        runExpandImage: W3,
        visibleImageConfigs: un,
        expandImageConfigs: Jn,
        openSaveToMaterialLibrary: Hf,
        inputImageContextMenu: t0,
        setInputImageContextMenu: yu,
        historyContextMenu: Vc,
        setHistoryContextMenu: zd,
        activeShot: wu,
        updateShot: K3,
        frameContextMenu: ks,
        setFrameContextMenu: Yo,
        updateNode: z0
      },
      settings: {
        authMode: hn,
        authenticate: Qt,
        toggleHuyaModels: ln,
        apiConfigs: Ge,
        chatModel: Cr,
        globalApiKey: Oe,
        globalBaseUrl: st,
        activeEndpoint: vt,
        apiTestProgress: Bl,
        apiStatus: ql,
        showBaseUrl: St,
        isModelHiddenInList: Vn,
        setModelHiddenInList: Tt,
        showHiddenModelsInGenNodes: Ue,
        setShowHiddenModelsInGenNodes: et,
        setGlobalApiKey: Ut,
        setGlobalBaseUrl: _t,
        applyGlobalBaseUrlFromPicker: At,
        jimengSuperResUrl: Ht,
        jimengSuperResApiKey: nn,
        setJimengSuperResUrl: qe,
        setJimengSuperResApiKey: kt,
        onTestJimengSuperResConnection: $Ti,
        updateConfig: lt,
        updateConfigs: gt,
        testApiConnection: Kd,
        switchEndpoint: Yt,
        getEndpoints: pt,
        filterHuyaModels: Pn,
        filterModels: rn
      },
      libraries: {
        createCharacterOpen: to,
        setCreateCharacterOpen: Ho,
        setCharacterLibrary: Xp,
        characterLibrary: Lc,
        createKlingSubjectOpen: Dp,
        setCreateKlingSubjectOpen: Im,
        setChatModel: tr,
        setKlingSubjectLibrary: Xv,
        klingSubjectLibrary: Qd,
        aiRoleLibraryOpen: oa,
        setAiRoleLibraryOpen: ia,
        aiRoleLibrary: Lu,
        refreshMaterialLibraryAndSyncRoles: Vf,
        materialLibrary: xs,
        handleApplyAiRoleToCanvas: ot,
        saveToMaterialLibraryOpen: Fo,
        setSaveToMaterialLibraryOpen: hs,
        closeSaveToMaterialLibraryModal: kA,
        handleConfirmSaveToMaterialLibrary: Nt
      },
      workspace: {
        closeDirector3D: Ao,
        director3DInitialScene: mi,
        director3DSmartBuild: ro,
        handleDirector3DSceneChange: Di,
        director3DOpen: qa,
        handleDirector3DScreenshotToCanvas: jI,
        skillWorkflowSession: jo,
        handleSkillToWorkflowCreate: ZT,
        categorizedExportOpen: AA,
        setCategorizedExportOpen: l0,
        connections: wt,
        groups: Bt,
        canvasTextBoxes: Ne,
        canvasDoodleStrokes: Ae,
        projectName: yl,
        chatSessions: Zt,
        viewportSize: _r,
        setChatSessions: Ln,
        setGroups: wn,
        setView: qn,
        setProjectName: Jd,
        setCanvasTextBoxes: me,
        setCanvasDoodleStrokes: Fe
      }
    },
    overlays: {
      lightbox: {
        enrichedLightboxItem: jVt,
        handleLightboxClose: Qx,
        handleFloatingLightboxNavigate: P5r,
        handleSendToCanvas: F9,
        isCanvasFullscreen: Lf,
        canvasContainerRef: Zh,
        lightboxOpen: da
      },
      minimap: {
        showCanvasMinimap: m,
        handleCanvasMinimapToggle: q,
        effectiveView: DI,
        viewportSize: _r,
        canvasDependencyConnections: I9,
        groups: Bt,
        handleMinimapViewChange: ra,
        handleMinimapViewDragStart: hr,
        handleMinimapViewDragEnd: ka,
        centerViewToNode: B3,
        centerViewToGroup: rA
      },
      viewport: {
        freeSplitModalOpen: gw,
        gridSplitModalOpen: ph,
        isDark: Lp,
        theme: a,
        setTheme: i,
        canvasViewportBarLeftPx: Sa,
        view: rr,
        setView: qn,
        handleViewportBarZoomChange: aA,
        isZoomLocked: Gr,
        setIsZoomLocked: Zr,
        canvasBgColorDark: be,
        canvasBgColorLight: ae,
        setCanvasBgColorDark: xe,
        setCanvasBgColorLight: Ee,
        showCanvasHelpPanel: Qr,
        leftToolbarDock: sn,
        handleAlign: Ga,
        alignPanelOpen: r4,
        setAlignPanelOpen: Aw,
        materialLibraryOpen: Sn,
        handleToggleMaterialLibraryFromOverlay: Os,
        hideConnections: La,
        handleToggleConnections: R5r,
        canvasSuspendedForOverlay: Rs,
        currentProjectId: s1,
        currentProjectName: Hpe,
        projectName: yl,
        currentChatId: tt
      },
      session: {
        nodes: ft,
        selectedNodeIds: ga,
        visibleNodes: G3,
        nodeQualityMap: Ux,
        framePressure: S9,
        dragNodeId: Wo,
        resizingNodeId: Xo,
        connectingSource: Se,
        connectingTarget: Je,
        isDragging: Eo,
        isPanning: xd,
        history: Kt
      }
    }
  });
}

const VOi = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: $Oi
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  HOi = '<defs><filter id="wax"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="2" seed="9" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 2 -.35"/><feComposite in="SourceGraphic" operator="in"/></filter></defs>',
  VMe = '<defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="6" flood-color="#142635" flood-opacity=".22"/></filter></defs>',
  WOi = {
    "crayon-book": `${HOi}<g filter="url(#wax)" stroke-linecap="round" stroke-linejoin="round"><path d="m929 143 85-75 95 69-6 108-163-2Z" fill="#e6b775" stroke="#41486a" stroke-width="5"/><path d="m917 149 96-93 108 90" fill="none" stroke="#b86c5e" stroke-width="12"/>
        <path d="M970 164h37v40h-37Zm61 27h42v53h-42Z" fill="#a4c6c0" stroke="#41486a" stroke-width="4"/><path d="M972 167v34m10-38v41m12-38v42m39-9v43m12-51v54m13-55v56" stroke="#648d9e" stroke-width="5"/>
        <path d="m907 265 43-12 26 12 36-10 35 9 49-12 36 8M73 226l71-160 63 163m-110-43 92 1" fill="none" stroke="#799465" stroke-width="7"/><circle cx="1123" cy="65" r="26" fill="#e5c46c" stroke="#ce9b4f" stroke-width="5"/><path d="m1123 21 1 11m37 3-8 9m22 23-12-1M77 94l32-7" stroke="#ce9b4f" stroke-width="5"/></g>`,
    impasto: `<defs><clipPath id="paint-fruit"><ellipse cx="1026" cy="173" rx="80" ry="62"/></clipPath></defs><path d="M877 256h284l-12 24H889Z" fill="#6e7770"/><path d="m918 224 193-3-40 49-107-1Z" fill="#799ba0"/>
        <g fill="#a9c4b5"><path d="m925 228 175-3-16 11-146 4Z"/><path d="m940 242 140-3-11 9-115 5Z"/></g><ellipse cx="1026" cy="173" rx="80" ry="62" fill="#c5854d"/>
        <g clip-path="url(#paint-fruit)">${Array.from({
      length: 72
    }, (e, t) => {
      const n = 937 + t % 9 * 21,
        r = 111 + Math.floor(t / 9) * 16,
        a = ["#d49153", "#efbc72", "#da9c59", "#e4aa63", "#bb784c"][(t * 7 + Math.floor(t / 9)) % 5];
      return `<path d="m${n} ${r} 30-3-6 12-28 3Z" fill="${a}"/><path d="m${n + 1} ${r} 28-3" stroke="#f7d291" stroke-width="1.5" opacity=".65"/>`;
    }).join("")}</g>
        <path d="m1029 116-4-42 14-9-1 52Z" fill="#79874f"/><path d="m1031 93 54-39 29 6-23 23-58 15Z" fill="#a0ae70"/><path d="m1039 88 53-23" stroke="#d4d393" stroke-width="3"/>
        <g fill="#8ea89e"><path d="m59 163 33-19 85 21-32 17Z"/><path d="m81 191 102-13 23 12-104 15Z"/><path d="m70 221 100-19-16 19-68 16Z"/></g>`,
    "one-line": '<path d="M32 256C51 206 95 234 102 193s-60-46-60-11 43 30 60 11c32-22 22-72 1-96s-39 0-19 18 73 19 68 61-62 32-50 63 34 43 94 43H905q79 0 110-61c-82 13-83-48-49-53s60 39 49 53c18-59 53-82 77-72s-7 53-67 56c4-48 4-87 24-97s34-43 9-48-41 42-9 48c-57 5-48-40-29-44s33 23 29 44c16-40 53-33 52-13s-35 27-52 13c28 4 42 40 20 44s-34-26-20-44c-12 48-45 135-12 155s76 2 90-14" fill="none" stroke="#302b25" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
    whiteboard: `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M889 80h89v61h-93V77m166 86h83v68h-87v-71M999 111h60l-9-9m9 9-9 9m-73 13 30 54h38" stroke="#28333c" stroke-width="3"/><path d="M903 99h55m-53 16h32m31 123q49 22 115 4" stroke="#295d9a" stroke-width="4"/>
        <path d="m1070 198 14 12 27-31" stroke="#347465" stroke-width="5"/><path d="M1054 47q68-28 109 19m-264 152q15-37 42-18t-1 43" stroke="#7b99ac" stroke-width="2" opacity=".15"/>
        <path d="M74 138q41-61 94 0t-48 59c-57-3-65-35-33-64m31 66-1 35m-13 2h32m-50-132-10-16m87 17 13-11" stroke="#28333c" stroke-width="3"/></g>
        <g transform="translate(1120 103) rotate(24)"><rect width="13" height="92" rx="3" fill="#fdfdf7" stroke="#85979b"/><rect width="13" height="22" rx="3" fill="#295d9a"/><path d="m3 92 3 13 4-13" fill="#28333c"/></g><circle cx="910" cy="61" r="9" fill="#a65e43"/>`,
    "urban-sketch": `<path d="m888 157 81-51 146 15 39 111-91 24-164-3Z" fill="#b4c4ba" opacity=".28"/><path d="m930 142 87-34 79 29 1 113-159 3Z" fill="#c6aa7d" opacity=".4"/><path d="m1021 112 75 29-4 112-72-8Z" fill="#818e9a" opacity=".3"/>
        <g fill="none" stroke="#594a39" stroke-width="1.6"><path d="m925 148 85-47 94 39M938 142l-2 113m76-146 4 131m-75 11 159 3-3-107m-164 99-20 3m171-3 31 2M964 167l29-4-2 36h-24v-28m67-18 38 10v33l-37-9v-29m-69 93v-39h25v35m-59-131 5-19 40 6 1 26"/>
        <path d="M888 258q10-64 4-96m-1 7q-39 2-38-19m32 2q-40-9-22-34m27 23q-33-51 0-60m4 61q45-49 29-62m-12 72q39 0 32-26m-830 86 3-81 37-23 38 25 2 79m-81 7 90-2"/></g>
        <g fill="#718b64" opacity=".38"><ellipse cx="886" cy="115" rx="41" ry="39"/><ellipse cx="857" cy="151" rx="24" ry="21"/><ellipse cx="919" cy="147" rx="28" ry="25"/></g><path d="m73 135 37-25 42 22v77H74Z" fill="#9fb7c0" opacity=".3"/>`,
    "shadow-puppet": `<defs><radialGradient id="lamp"><stop stop-color="#fff3c7"/><stop offset="1" stop-color="#ead5a4" stop-opacity="0"/></radialGradient><mask id="hide"><ellipse cx="1017" cy="170" rx="62" ry="40" fill="white"/>${Array.from({
      length: 7
    }, (e, t) => `<path d="m${973 + t * 13} 151 8 17-8 15-5-15Z" fill="black"/>`).join("")}</mask></defs><ellipse cx="1030" cy="156" rx="174" ry="140" fill="url(#lamp)"/>
        <g stroke="#663c22" stroke-width="2" stroke-linejoin="round"><path d="m961 164-72-57 32 63-31 23 68-4" fill="#697a3f" opacity=".8"/><ellipse cx="1017" cy="170" rx="62" ry="40" fill="#b96336" mask="url(#hide)"/><path d="M1048 144q-5-66 31-57 29 18 3 45l-13 39" fill="#b06b28" fill-opacity=".8"/><path d="m1091 106 35 11-34 5" fill="#854c28"/>
        <path d="m1001 166-30-70 64 27 21 43-25 28Z" fill="#ad803b" fill-opacity=".7"/><path d="m997 130 23 24m-16-31 24 30m-14-24 21 25m-247-13 28 19m-26-7 29 18" fill="none" stroke="#f7e6bd" stroke-width="3"/>
        <circle cx="1003" cy="173" r="6" fill="#f7e6bd"/><circle cx="1078" cy="105" r="4" fill="#f7e6bd"/><path d="m993 203-15 28 33-1m25-28 8 28h27" fill="none"/></g>
        <path d="m1003 174 44 120m23-153 91 138" stroke="#6c5740" stroke-width="1.5" opacity=".6"/><path d="M43 62h161v13H43Zm10 12h9v189h-9m135-189h9v189h-9" fill="#986c36" opacity=".6"/>`,
    "halftone-dossier": `<defs><pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(15)"><circle cx="3" cy="3" r="1.8" fill="#283544"/></pattern></defs><path d="M881 113V76h105l23 23h138v163H881Z" fill="#cfb975" stroke="#283544" stroke-width="3"/><path d="m908 80 201-9 6 175-198 11Z" fill="#faf0d9" stroke="#283544" stroke-width="2"/>
        <path d="m948 134 30-10 56 49-29 35-66-24Z" fill="#c6c7b5"/><path d="m948 134 30-10 56 49-29 35-66-24Z" fill="url(#dots)"/><path d="m934 107 131-8m-130 118 121-8" stroke="#283544" stroke-width="3"/>
        <g transform="translate(1012 173) rotate(-9)" fill="none" stroke="#ae4334" stroke-width="3"><rect width="109" height="46" rx="3"/><rect x="5" y="5" width="99" height="36" rx="2"/><text x="12" y="31" font-size="24" font-family="sans-serif" font-weight="900" fill="#ae4334" stroke="none">IDEAS</text></g>
        <path d="M63 95h131v135H63Z" fill="url(#dots)" opacity=".4"/><path d="m93 145 59-19 11 71-57 11Z" fill="#edcf75" stroke="#283544" stroke-width="3"/>`,
    woodcut: `<path d="m869 30 291 2-4 245-290-3Z" fill="#272821"/><g fill="#e9e1cc"><path d="M1010 253q-10-124 67-202-61 103-61 202Z"/><path d="M1017 183q-42-94-87-96 10 83 87 96Zm17-47q41-69 96-50-27 55-96 50Zm-23 81q-28-47-65-28 20 31 65 28Z"/>
        ${Array.from({
      length: 15
    }, (e, t) => `<path d="m${880 + t * 17} 40 6-1-7 25-3-1Z"/><path d="m${880 + t * 17} 242 10 1-11 13-6-1Z"/>`).join("")}</g>
        <g fill="#272821">${Array.from({
      length: 10
    }, (e, t) => `<path d="M${946 + t * 6} ${111 + t * 6}q25 0 39 27-19-22-39-24Z"/><path d="m${1061 + t * 6} ${112 - t * 2} 22-16-19 20Z"/>`).join("")}</g>
        <path d="M62 107q90-64 132 45-59 97-132-45Z" fill="#272821"/><path d="M74 111q57 16 106 38m-89-23 5 26m7-25 7-35m9 44 5 28m6-25 10-31m7 36 7 11" fill="none" stroke="#e9e1cc" stroke-width="3"/>`,
    "swiss-motion": '<g fill="#20201e"><path d="M884 66h40v175h-40Zm52 0h111v40H936Zm0 68h80v38h-80Zm0 70h111v37H936Z"/><path d="M1071 134h75v107h-75Z" fill="#c7302c"/><path d="M58 94h145v4H58Zm0 131h145v4H58Z"/></g><path d="M880 272h271M57 130h66m-66 15h42" stroke="#64635d"/><text x="59" y="201" fill="#20201e" font-size="64" font-family="sans-serif" font-weight="800">Aa</text>',
    "spy-titles": `<path d="m877 45 264 28-28 191-267-21Z" fill="#cbac66"/><path d="m888 91 244-39 32 188-240 30Z" fill="#a54c34"/><path d="m953 93 14-5 15 166-15 3Zm43-12 73-10 3 20-52 9 13 159-22 3Z" fill="#eadfca"/>
        <g fill="#2f2b25"><path d="m1059 134 18-15 22 11-7 15-24 5Z"/><path d="m1070 143 25-1 15 58-30 6-19-24Z"/><path d="m1083 196 15 1 23 51-13 7-21-40-17 42-14-4Z"/><path d="m1100 163 27 17-8 25-9-6 3-14-19-10Z"/><path d="m86 79 96 36-35 134-104-23Z"/></g>
        <path d="m101 118 40 15-8 21-39-14m-2 21 36 11-6 17-34-11" stroke="#eadfca" stroke-width="8"/><path d="m1067 146 16 7-2 38-13-34Z" fill="#e4b974"/>`,
    "pictogram-motion": `<g fill="#b9d3c3"><circle cx="1040" cy="163" r="105"/><path d="M45 76h68v68H45Zm69 68h68v68h-68Z"/></g><g fill="#78a68c"><path d="M45 144h68a68 68 0 0 1-68 68Z"/><circle cx="149" cy="110" r="32"/><circle cx="81" cy="245" r="19"/></g>
        <g fill="none" stroke="#286c58" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"><path d="m1028 134-8 52 46 9 27 43m-73-52-31 37h-44m82-69 39 10 28-40"/></g><circle cx="1035" cy="103" r="20" fill="#286c58"/><path d="m1097 127 18-30" stroke="#214b43" stroke-width="6" stroke-linecap="round"/>`,
    dataviz: `<defs><pattern id="paper-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="#b3b9ab"/></pattern></defs><path d="M862 43h303v221H862ZM43 57h159v197H43Z" fill="url(#paper-dots)"/><g transform="translate(1030 53) rotate(32)"><path d="M0 0h21v166H0Z" fill="#487893"/><path d="M0 0h7v166H0Z" fill="#9ab9c1"/><path d="M14 0h7v166h-7Z" fill="#305872"/><path d="m0 166 10 29 11-29Z" fill="#cba574"/><path d="m6 183 4 12 5-12Z" fill="#323d43"/><path d="M0 0h21v24H0Z" fill="#a95b50"/></g>
        <path d="M890 244h157m-985-29h118M92 134q56-49 83-13m-5-6 6 7-10 7" fill="none" stroke="#616b6c" stroke-width="1.5"/><path d="M954 246q20-21 43-9" fill="none" stroke="#3b6d8d" stroke-width="2"/>`,
    "iso-infographic": `${VMe}<g filter="url(#shadow)"><path d="m876 204 123-71 144 83-123 71Z" fill="#d4e0cc"/><path d="m876 204 144 83v12l-144-83Z" fill="#a7bdaa"/><path d="m1020 287 123-71v12l-123 71Z" fill="#8aa79e"/>
        <path d="m922 171 51-29 51 29-51 30Z" fill="#94bfb4"/><path d="m922 171 51 30v50l-51-30Z" fill="#6d9f94"/><path d="m973 201 51-30v50l-51 30Z" fill="#4b7e7a"/>
        <path d="m1005 121 42-24 42 24-42 24Z" fill="#debda2"/><path d="m1005 121 42 24v82l-42-24Z" fill="#c89175"/><path d="m1047 145 42-24v82l-42 24Z" fill="#a96d5c"/></g>
        <g fill="none" stroke="#334b4d" stroke-width="1.3"><path d="M943 163V81h-39m163 29V58h52m-1038 162 72-42 65 38-72 42Z"/><circle cx="943" cy="163" r="3" fill="#f9fcf4"/><circle cx="1067" cy="110" r="3" fill="#f9fcf4"/></g><path d="m83 186 51-30 51 30-51 30Z" fill="#adcbbf"/>`,
    "dark-keynote": `<defs><radialGradient id="key"><stop stop-color="#9585d3" stop-opacity=".19"/><stop offset="1" stop-color="#9585d3" stop-opacity="0"/></radialGradient><linearGradient id="tile" x2=".7" y2="1"><stop stop-color="#303448"/><stop offset="1" stop-color="#181c28"/></linearGradient></defs><ellipse cx="1028" cy="137" rx="174" ry="140" fill="url(#key)"/>
        ${Array.from({
      length: 6
    }, (e, t) => `<rect x="${898 + t % 3 * 83}" y="${67 + Math.floor(t / 3) * 91}" width="72" height="78" rx="10" fill="url(#tile)" stroke="#525770" stroke-opacity=".6"/>`).join("")}
        <path d="m1017 85 9 19 21 8-21 9-9 22-9-22-21-9 21-8Z" fill="#beb1ff"/><g fill="#5c637a"><rect x="915" y="188" width="36" height="4" rx="2"/><rect x="915" y="199" width="24" height="4" rx="2"/></g><path d="M60 125h125m-125 24h76m-76 23h93" stroke="#353c51" stroke-width="3"/>`,
    "living-screencast": `<rect x="865" y="256" width="288" height="3" rx="1.5" fill="#414144"/><g shape-rendering="crispEdges" transform="translate(970 91) scale(7)"><path d="M3 0h12v2h3v3h2v14h-2v3h-3v2H3v-2H0v-3h-2V5h2V2h3Z" fill="#e9b59a"/><path d="M0 17h3v3h12v-3h3v5h-3v2H3v-2H0Z" fill="#b87e65"/><path d="M2 8h4v5H2Zm10 0h4v5h-4Z" fill="#f7efe5"/><path d="M4 9h2v3H4Zm8 0h2v3h-2Z" fill="#413733"/><path d="M7 16h4v2H7ZM2 24h4v2H0v-2Zm10 0h4v2h-4Z" fill="#b87e65"/><path d="M-6 11h4v7h-4Zm26 0h4v7h-4Z" fill="#e9b59a"/></g>
        <g stroke="#95d8bb" fill="none" stroke-width="2"><path d="m1121 71 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z"/></g><rect x="66" y="102" width="132" height="90" rx="12" fill="#242427" stroke="#414144"/><path d="m112 140 17 17 29-37" fill="none" stroke="#e9b59a" stroke-width="5" stroke-linecap="round"/>`,
    "hologram-hud": `<defs><radialGradient id="beam"><stop stop-color="#83cbd8" stop-opacity=".13"/><stop offset="1" stop-color="#83cbd8" stop-opacity="0"/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="2"/></filter></defs><ellipse cx="1030" cy="167" rx="157" ry="119" fill="url(#beam)"/>
        <g fill="none" stroke="#83cbd8" stroke-width="1.5"><ellipse cx="1030" cy="248" rx="104" ry="28"/><ellipse cx="1030" cy="248" rx="87" ry="21" stroke-dasharray="5 7"/><path d="m972 111 58-43 58 43v83l-58 36-58-36Zm0 0 58 39 58-39m-58 39v80m-58-92 58 39 58-39m-58-70v82"/><path d="M936 106V80h26m137 0h26v26m-26 115h26v-26M935 195v26h26M56 82h20m-20 0v134h20m98-134h20v134h-20" stroke-opacity=".5"/>
        <path d="M1030 68v162m-58-36 116-83" stroke-opacity=".3"/><path d="m1088 151 50-18h35"/></g><path d="m972 112 58 38 58-38" fill="none" stroke="#d7f2f5" stroke-width="4" filter="url(#glow)"/><circle cx="1138" cy="133" r="3" fill="#d7f2f5"/><path d="m91 161 22-39 29 48 22-59" fill="none" stroke="#83cbd8" opacity=".3"/>`,
    "rubber-hose": `<g stroke="#2b2b29" stroke-width="4" stroke-linejoin="round"><path d="M981 202q-28 46-4 49m83-49q-4 45 23 40m-107-83q-48-34-50 9m141-22q29-26 47 10" fill="none" stroke-width="9" stroke-linecap="round"/>
        <path d="M985 99v23q-25 10-27 33v40q4 31 62 31t62-31v-40q-2-23-27-33V99Z" fill="#f9f9f2"/><path d="M978 86h84v22h-84Z" fill="#62625b"/><path d="M958 177q33 7 124-4v24q-4 29-62 29t-62-29Z" fill="#bcbcb4"/>
        <ellipse cx="1002" cy="149" rx="11" ry="17" fill="#2b2b29"/><ellipse cx="1036" cy="149" rx="11" ry="17" fill="#2b2b29"/><path d="m1001 146 10-12-2 13Zm35 0 10-12-2 13Z" fill="#f9f9f2" stroke="none"/><path d="M1005 184q17 19 35-3" fill="none"/>
        <path d="M925 161q-10-14-15-8-2 3 5 12-17-8-17 0 1 5 17 9-14 0-13 7 4 9 25 0Z" fill="#f9f9f2"/><path d="M1113 153q2-16 9-13 5 4-1 16 15-8 17-1 0 7-17 12 16 1 13 9-5 4-22-6Z" fill="#f9f9f2"/>
        <ellipse cx="979" cy="257" rx="26" ry="11" fill="#2b2b29"/><ellipse cx="1086" cy="250" rx="25" ry="11" fill="#2b2b29"/></g><path d="M55 263q67-21 159 0" stroke="#bcbcb4" fill="none"/><circle cx="139" cy="165" r="53" fill="#d4d4cb"/>`,
    "cel-anime-80s": `<defs><linearGradient id="night" x2="0" y2="1"><stop stop-color="#332c56"/><stop offset=".7" stop-color="#9a657f"/><stop offset="1" stop-color="#db9a8c"/></linearGradient><filter id="neon"><feGaussianBlur stdDeviation="3"/></filter></defs><path d="M862 28h301v250H862Z" fill="url(#night)"/><g fill="#352e50"><path d="M867 188h39v-63h36v33h32v120H867Zm227 90V143h28V95h20v36h21v147Z"/></g>
        <path d="M894 202v52m30-97v44m205-55v50m21-44v42" stroke="#e5adbc" stroke-width="5" filter="url(#neon)"/><path d="M894 202v52m30-97v44m205-55v50m21-44v42" stroke="#f0c4cd" stroke-width="1.5"/>
        <g stroke="#694459" stroke-width="2"><path d="m924 133 199-46-82 116-29-47Z" fill="#f0d8c0"/><path d="m1012 156 111-69-94 96 12 40Z" fill="#a9718b"/></g><path d="m924 133 199-46" stroke="#b7e0e1" stroke-width="2"/><path d="M47 246h163m-146-18h76m-46-19h94" stroke="#edacc3" opacity=".3"/>`,
    "scifi-toon": `<g stroke="#3d304d" stroke-width="4" stroke-linejoin="round"><path d="M957 71q28-32 52-8 31-19 50 6 35-10 42 28 27 15 5 49 14 36-19 48-19 34-49 15-31 17-53-14-36 2-37-35-27-31-6-54-3-19 15-35Z" fill="#d7a178"/>
        <path d="M974 102q31-43 71-11t28 88q-69 38-102-18-9-24 3-59Z" fill="#efc69b"/><path d="M982 216q-16-56 17-62 26-2 31 18 34-10 46 12 12 39-24 52h-50Z" fill="#969ec3"/><path d="m1023 179 12 35 28-12-10 25-50 8-18-18" fill="#747aa5" stroke="none"/>
        <ellipse cx="1003" cy="187" rx="15" ry="19" fill="#fff8ec"/><ellipse cx="1030" cy="184" rx="15" ry="19" fill="#fff8ec"/><path d="m1007 189 1 1m25-6 1 1" stroke-width="5" stroke-linecap="round"/><path d="m1012 216 20-3" fill="none"/></g>
        <g fill="#969ec3" stroke="#3d304d" stroke-width="3"><path d="m65 183 57-72 60 72-23 45H91Z"/><path d="m123 111 20-39m-50 141-17 32m75-23 24 13" fill="none"/></g>`,
    "midcentury-toon": `<path d="M949 135q-92-56-60 25t179 89q58-1 55-55t-84-76Z" fill="#a1c3b9"/><path d="m959 96 126-26-10 179-72-17Z" fill="#cc8062"/><path d="M948 103q66-24 129-24m-113 21 37 122 70 25m-7-161 11 43-12 109" fill="none" stroke="#453b30" stroke-width="2.5"/>
        <path d="M1015 117q-17-50-65-64m79 72q16-65 55-90m-67 72q-47-18-67-6" fill="none" stroke="#453b30" stroke-width="2"/><path d="m930 43 54 26-55 14 19-25Z" fill="#e0c47d"/><path d="m1080 29 19 27-21 40-14-41Z" fill="#648e83"/>
        <g stroke="#a4543f" stroke-width="2"><path d="M83 110v58m-29-29h58m44 61v30m-15-15h30m928-158v37m-19-19h38"/></g><path d="m74 209 112-47-57 83Z" fill="#e0c47d"/>`,
    "hd-2d": `<defs><radialGradient id="warm"><stop stop-color="#ffdda0" stop-opacity=".75"/><stop offset="1" stop-color="#d7ac76" stop-opacity="0"/></radialGradient><filter id="far"><feGaussianBlur stdDeviation="2.5"/></filter></defs>
        <g filter="url(#far)" fill="#3d5666"><path d="m858 115 53-47 63 35v78l-116 5Zm223 37V71l44-29 51 27v122Z"/></g><path d="m881 205 115-65 153 83-130 70Z" fill="#495a61"/><path d="m881 205 138 77v11l-138-76m138 65 130-70v11l-130 70" fill="#2d3b47"/>
        <g shape-rendering="crispEdges"><path d="m1009 119 41-23 49 28v98l-47 25-43-25Z" fill="#60727a"/><path d="m1050 96 49 28v98l-47 25Z" fill="#384856"/><path d="m998 122 51-44 61 44-60 30Z" fill="#657c88"/><path d="M1020 145h16v25h-16Zm46 23h13v23h-13Z" fill="#efc684"/>
        <path d="M959 185h16v13h8v25h-8v14h-8v-14h-9v14h-8v-17h-7v-22h15Z" fill="#c68c80"/><path d="M959 185h16v13h-16Z" fill="#f2d9b1"/><path d="M939 201h9v14h-9Z" fill="#ffe6a8"/></g>
        <ellipse cx="969" cy="244" rx="25" ry="5" fill="#1d2932"/><circle cx="944" cy="207" r="41" fill="url(#warm)"/><circle cx="1028" cy="156" r="39" fill="url(#warm)"/><path d="m44 233 66-83 39 43 49-93 50 134Z" fill="#344b5c"/>`,
    microgame: `<g stroke="#221630" stroke-width="4" stroke-linejoin="round"><path d="m900 51 225 5 27 213-270-2Z" fill="#be79ac"/><path d="M924 78h177l10 132H914Z" fill="#fff1d5"/><path d="m891 229 248 4 13 36-270-2Z" fill="#f0ce73"/><circle cx="1072" cy="247" r="9" fill="#8bd3c4"/>
        <path d="M931 91h69v103h-69Z" fill="#263c55"/><path d="M1010 91h83v103h-83Z" fill="#eddfc3"/></g><g shape-rendering="crispEdges" fill="#e69fae"><path d="M955 113h16v16h16v16h-16v24h-16v-24h-16v-16h16Z"/></g>
        <path d="m1049 112 10 22 25 2-19 17 4 25-20-13-22 13 6-25-19-17 26-2Z" fill="none" stroke="#84675a" stroke-width="3" stroke-dasharray="9 2"/><path d="m953 235 0 15m-8-8h17" stroke="#302149" stroke-width="6"/>
        <path d="m81 73 22 46 51-20-13 54 47 20-49 26 13 50-49-18-22 43-15-49-50 5 28-40-35-31 48-10Z" fill="#786087"/><text x="47" y="186" fill="#fff1d5" font-size="35" font-weight="900" font-family="sans-serif" transform="rotate(-8 90 166)">MAKE!</text>`,
    "game-show": `<g fill="#e6b981">${Array.from({
      length: 12
    }, (e, t) => `<path d="m1030 164-18-142 36 0Z" transform="rotate(${t * 30} 1030 164)"/>`).join("")}</g>
        <g stroke="#4a3439" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="m977 164-51-21-13-31m168 41 45-28 7-26m-121 105-18 46m53-48 20 42" fill="none" stroke-width="10"/><path d="M980 129q13-51 53-41 60-7 54 59 21 71-45 84-70 6-72-50Z" fill="#8bb8a6"/>
        <path d="M977 177q13 45 62 40t51-37q-4 54-54 55-55-2-59-58Z" fill="#679987" stroke="none"/><ellipse cx="1014" cy="148" rx="8" ry="14" fill="#4a3439"/><ellipse cx="1045" cy="148" rx="8" ry="14" fill="#4a3439"/><path d="M1010 177q22 20 43-2" fill="#fff1cf"/>
        <path d="m73 121 27 24 36-23-4 37 34 20-36 12-4 40-27-29-35 10 13-35-28-29 37-1Z" fill="#f4df8c"/></g><path d="M930 271h208" stroke="#4a3439" stroke-width="4"/>`,
    "silent-film": `<defs><linearGradient id="drape"><stop stop-color="#1b1a18"/><stop offset=".5" stop-color="#575044"/><stop offset="1" stop-color="#24231f"/></linearGradient></defs><rect x="864" y="35" width="301" height="236" rx="12" fill="#171714"/>
        <path d="M864 37h43v235h-43Zm258 0h43v235h-43Z" fill="url(#drape)"/><g fill="none" stroke="#b8b4a5"><path d="M919 67h191v174H919Zm5 5h181v164H924"/><path d="m945 81 14 10-14 10-13-10Zm139 0 13 10-13 10-14-10Zm-139 133 14 10-14 10-13-10Zm139 0 13 10-13 10-14-10"/></g>
        <g fill="#d3c8a9" font-family="Georgia,serif" text-anchor="middle"><text x="1015" y="153" font-size="23" font-style="italic">A creative</text><text x="1015" y="186" font-size="25">picture.</text></g>
        <g fill="none" stroke="#b8b4a5" opacity=".6"><circle cx="123" cy="127" r="37"/><circle cx="173" cy="127" r="26"/><path d="M81 166h114v69H81Zm114 14 30-12v57l-30-11m-70 21-25 39m48-39 29 39"/></g>`,
    backrooms: `<defs><linearGradient id="hall"><stop stop-color="#d6cfad"/><stop offset="1" stop-color="#74795b"/></linearGradient></defs><path d="M858 29h307v250H858Z" fill="#b0b596"/><path d="m858 29 165 91v97l-165 62Z" fill="#c5c39d"/><path d="m1165 29-142 91v97l142 62Z" fill="#a0a584"/><path d="m858 279 165-62 142 62Z" fill="#8c9272"/><path d="M1007 117h38v99h-38Z" fill="#566246"/>
        <path d="m882 55 28 15v175l-28 11Zm55 33 24 13v124l-24 10Zm183-30-25 17v167l25 11Zm-52 35-13 10v122l13 7Z" fill="url(#hall)" stroke="#8e9675" stroke-width="1.5"/><path d="m922 51 168 0-17 15h-125Zm46 38h75l-9 9h-49Z" fill="#edeccd"/><path d="M1046 145h6v11h-6Z" fill="#9f7e45"/>
        <path d="M54 67h134v185H54Zm12 13h108v161H66m0-45h108m-92-31h69" fill="none" stroke="#929973" stroke-width="2"/>`,
    "brick-toy": `${VMe}<defs><linearGradient id="plastic" x2="0" y2="1"><stop stop-color="#558bc0"/><stop offset=".15" stop-color="#7eaad0"/><stop offset=".24" stop-color="#3f77af"/><stop offset="1" stop-color="#2c6397"/></linearGradient></defs><g filter="url(#shadow)">
        <path d="m899 181 133-62 119 52-139 65Z" fill="#d8bd72"/><path d="m899 181 113 55v41l-113-55Z" fill="#b9954f"/><path d="m1012 236 139-65v41l-139 65Z" fill="#9c803f"/>
        <path d="m924 112 95-44 104 47-96 45Z" fill="#739bc1"/><path d="m924 112 103 48v70l-103-48Z" fill="url(#plastic)"/><path d="m1027 160 96-45v70l-96 45Z" fill="#285b8b"/>
        ${[[956, 107], [992, 90], [997, 126], [1033, 109], [1038, 144], [1074, 127]].map(([e, t]) => `<path d="M${e - 11} ${t - 8}v9q11 11 22 0v-9" fill="#487aad"/><ellipse cx="${e}" cy="${t - 8}" rx="11" ry="6" fill="#91b3d0"/><path d="m${e - 6} ${t - 11}h8" stroke="#d2e1e8" stroke-width="2"/>`).join("")}</g>
        <path d="m62 164 63-31 66 28-63 32Z" fill="#c48776"/><path d="m62 164 66 29v34l-66-29Z" fill="#a85847"/><path d="m128 193 63-32v34l-63 32Z" fill="#883f34"/><ellipse cx="120" cy="157" rx="15" ry="8" fill="#dfa896"/>`,
    "paper-popup": `${VMe}<g filter="url(#shadow)"><path d="m874 216 132-41 153 30-130 72Z" fill="#968267"/><path d="m881 208 127-41 144 31-125 70Z" fill="#fff8e7"/><path d="m881 208 146 60-14-99Z" fill="#e7dbc0"/><path d="m1013 169 14 99" stroke="#b9ac90"/>
        <path d="m931 216 13-110 60-23 2 105Z" fill="#8ba8a0" stroke="#fff8e7" stroke-width="7"/><path d="m969 228 16-104 54-25 39 24 5 103-63 25Z" fill="#92aa68" stroke="#fff8e7" stroke-width="7"/><path d="m1045 229 13-95 35 5 29 74Z" fill="#d4af70" stroke="#fff8e7" stroke-width="7"/>
        <path d="m1006 224 24-47 22 46-19 7Z" fill="#d77f60" stroke="#fff8e7" stroke-width="5"/><path d="m985 124 28 45 7 82m19-152-26 70" fill="none" stroke="#607c55" stroke-width="1.4"/></g>
        <path d="m61 215 78-66 57 84-79-9Z" fill="#9cac78" stroke="#fff8e7" stroke-width="7"/><path d="m139 149-22 75 28-7" fill="none" stroke="#73845b" stroke-width="2"/>`,
    "tilt-shift": `<defs><filter id="mini-blur"><feGaussianBlur stdDeviation="3"/></filter><linearGradient id="facade" x2="1" y2="1"><stop stop-color="#f6e9c7"/><stop offset="1" stop-color="#b7b998"/></linearGradient></defs>
        <path d="m866 196 141-85 164 70-147 99Z" fill="#a6b48c"/><g filter="url(#mini-blur)"><path d="m870 122 91-45 60 34v59l-103 39-48-26Z" fill="#b8c8b5"/><path d="m912 108 49-24 47 26-49 22Z" fill="#929d86"/><ellipse cx="1118" cy="238" rx="49" ry="23" fill="#829b64"/></g>
        <path d="m912 197 104-64 50 20-111 71Z" fill="#586b70"/><path d="m934 202 99-60" stroke="#ece8c9" stroke-width="2" stroke-dasharray="8 8"/>
        <path d="m1005 163 72-37 62 29v64l-72 37-62-29Z" fill="url(#facade)"/><path d="m1005 163 61-44 73 36-72 38Z" fill="#b67956"/><path d="m1067 193 72-38v64l-72 37Z" fill="#b1b699"/>
        <g fill="#587681">${[0, 1, 2, 3].map(e => `<path d="m${1016 + e * 12} ${180 + e * 5} 6 3v10l-6-3Zm${1080 + e * 12} ${196 - e * 6} 6-3v10l-6 3Z"/>`).join("")}</g>
        <path d="m955 180 18-11 17 8v8l-18 11-17-8Z" fill="#bf6150"/><path d="m959 178 13-7 10 4-13 8Z" fill="#c8dce0"/><g filter="url(#mini-blur)" fill="#7b9768"><ellipse cx="898" cy="243" rx="30" ry="18"/><ellipse cx="143" cy="177" rx="50" ry="70"/></g>`,
    "lowpoly-island": `${VMe}<g filter="url(#shadow)"><path d="m885 198 69-75 121-15 77 82-39 65-135 27Z" fill="#9fc2b0"/><path d="m885 198 93 84 135-27 39-65-33 100-105 7-90-29Z" fill="#92aeb2"/>
        <path d="m885 198 105-12-12 96Z" fill="#80ac99"/><path d="m990 186 85-78 38 147Z" fill="#b2cfbc"/><path d="m1113 255-99 42-36-15Z" fill="#79999e"/><path d="m990 186 123 69-135 27Z" fill="#9abcaa"/>
        <path d="m985 139 45-26 48 26v65l-46 27-47-27Z" fill="#eee0c6"/><path d="m1030 113 48 26v65l-46 27Z" fill="#cdbd9f"/><path d="m975 140 52-53 61 51-56 32Z" fill="#c58b78"/><path d="m1027 87 5 83 56-32Z" fill="#a87368"/><path d="m997 168 12 7v20l-12-7m48 3 14-8v22l-14 8" fill="#7394a0"/>
        <path d="m929 213 6-85 33 65Z" fill="#679b86"/><path d="m935 128 6 71-12 14Z" fill="#86b49a"/><path d="m1100 205 17-69 30 53Z" fill="#709b8d"/></g><path d="m55 221 77-43 72 37-79 43Z" fill="#bad2d2"/><path d="m55 221 70 37v17l-70-34m70 17 79-43v16l-79 44" fill="#96b9c0"/>`,
    "glass-product": `<defs><linearGradient id="glass" x2="1" y2=".6"><stop stop-color="#a7c8d6" stop-opacity=".2"/><stop offset=".26" stop-color="#334653" stop-opacity=".08"/><stop offset=".48" stop-color="#8cadbe" stop-opacity=".24"/><stop offset=".6" stop-color="#20364a" stop-opacity=".14"/><stop offset="1" stop-color="#a4bdd2" stop-opacity=".3"/></linearGradient><linearGradient id="rim"><stop stop-color="#7ba9c7"/><stop offset=".31" stop-color="#eff8ff"/><stop offset=".4" stop-color="#41576b"/><stop offset=".77" stop-color="#aecae0"/><stop offset="1" stop-color="#576586"/></linearGradient><radialGradient id="core"><stop stop-color="#f3faff"/><stop offset=".3" stop-color="#adcadd"/><stop offset="1" stop-color="#284357" stop-opacity="0"/></radialGradient><filter id="caustic"><feGaussianBlur stdDeviation="4"/></filter></defs>
        <ellipse cx="1033" cy="265" rx="98" ry="11" fill="none" stroke="#739dbb" stroke-width="3" opacity=".4" filter="url(#caustic)"/><g transform="rotate(-14 1030 145)"><rect x="954" y="43" width="151" height="205" rx="52" fill="url(#glass)" stroke="url(#rim)" stroke-width="2"/>
        <ellipse cx="1030" cy="145" rx="56" ry="78" fill="url(#core)"/><rect x="979" y="70" width="103" height="151" rx="34" fill="url(#glass)" stroke="#a6c8d8" stroke-opacity=".35"/><path d="M968 178V96q0-32 31-37m-34 154q4 24 34 24" stroke="#e6f3fc" stroke-width="3" fill="none" opacity=".65"/><path d="M1093 104v83q0 34-25 47" stroke="#9fafd5" fill="none"/></g>
        <ellipse cx="134" cy="168" rx="56" ry="76" fill="url(#glass)" stroke="url(#rim)" stroke-width="1" opacity=".65"/>`
  },
  h0 = '"Microsoft YaHei", system-ui, sans-serif',
  tb = '"Noto Serif SC", "Songti SC", SimSun, Georgia, serif',
  Pte = '"Cascadia Code", Consolas, "Microsoft YaHei", monospace',
  HMe = 'KaiTi, STKaiti, "Microsoft YaHei", cursive',
  cAe = [{
    id: "original",
    name: "原始",
    description: "熟悉的模样，专注每一次创作",
    edition: "ATELIER / ORIGINAL",
    tone: "dark",
    bg: "#19191b",
    panel: "#202023",
    text: "#f1f0ed",
    muted: "#a4a4a7",
    line: "#333336",
    accent: "#e9b59a",
    soft: "#302a27",
    images: "#95d8bb",
    videos: "#c3b1ef",
    tokens: "#91c4ed",
    font: h0
  }, {
    id: "cartoon",
    name: "奶油卡通",
    description: "软软的奶油色，装满奇思妙想",
    edition: "LITTLE IDEAS, BIG DAYS",
    tone: "light",
    bg: "#fff6df",
    panel: "#fffcf3",
    text: "#453526",
    muted: "#816952",
    line: "#e2ceaa",
    accent: "#b65036",
    soft: "#f9e0a6",
    images: "#4e8770",
    videos: "#b16c8c",
    tokens: "#538395",
    font: h0
  }, {
    id: "realistic",
    name: "写实光影",
    description: "自然光、暖石与一页创作手记",
    edition: "THE LIGHT / CREATIVE JOURNAL",
    tone: "light",
    bg: "#e9e6df",
    panel: "#f7f5f0",
    text: "#333a34",
    muted: "#6b7268",
    line: "#c9cdc1",
    accent: "#546650",
    soft: "#dce1d5",
    images: "#6a7e58",
    videos: "#90795f",
    tokens: "#597a86",
    font: tb
  }, {
    id: "cyber",
    name: "霓虹赛博",
    description: "电光青与信号网格，灵感已接入",
    edition: "NEURAL ARCHIVE / SYSTEM ONLINE",
    tone: "dark",
    bg: "#090f1d",
    panel: "#101d2c",
    text: "#dcf8f7",
    muted: "#88a9b9",
    line: "#234354",
    accent: "#6cecd7",
    soft: "#173936",
    images: "#6cecd7",
    videos: "#cba0ff",
    tokens: "#7ebeff",
    font: Pte
  }, {
    id: "minimal",
    name: "极简留白",
    description: "纸白、墨黑，让作品自己说话",
    edition: "LESS, BUT BETTER.",
    tone: "light",
    bg: "#f9f9f6",
    panel: "#ffffff",
    text: "#242622",
    muted: "#74766f",
    line: "#dedfd8",
    accent: "#4b5940",
    soft: "#e9ecdf",
    images: "#55694b",
    videos: "#8b8073",
    tokens: "#617b7f",
    font: h0
  }, {
    id: "manga",
    name: "热血漫画",
    description: "分镜、网点与醒目的主角时刻",
    edition: "MAKE IT! / CREATOR ISSUE",
    tone: "light",
    bg: "#f4efe5",
    panel: "#fffdf6",
    text: "#252420",
    muted: "#706b5f",
    line: "#302e29",
    accent: "#b63e2d",
    soft: "#f1d14f",
    images: "#587857",
    videos: "#b76353",
    tokens: "#587487",
    font: h0,
    empty: "#e4ddce"
  }, {
    id: "ink",
    sourceStyle: "ink-wash",
    name: "水墨国风",
    description: "一纸山水，一枚属于你的落款",
    edition: "山水之间 · 自有回响",
    tone: "light",
    bg: "#f2ecde",
    panel: "#f8f3e9",
    text: "#333e36",
    muted: "#68675b",
    line: "#d4d0c2",
    accent: "#48463e",
    soft: "#e4ddcc",
    images: "#545249",
    videos: "#777165",
    tokens: "#50514a",
    font: tb
  }, {
    id: "music",
    name: "黑胶音乐",
    description: "把每一天的灵感，刻进唱片",
    edition: "ATELIER RECORDS / SIDE A",
    tone: "dark",
    bg: "#171916",
    panel: "#22261e",
    text: "#f0eedf",
    muted: "#a4ab98",
    line: "#3e4634",
    accent: "#d6e59e",
    soft: "#343e28",
    images: "#d6e59e",
    videos: "#dbaf87",
    tokens: "#9bc9bb",
    font: h0
  }, {
    id: "watercolor",
    sourceStyle: "watercolor",
    name: "水彩笔刷",
    description: "颜料漫过纸纤维，灵感慢慢生长",
    edition: "FIELD NOTES / IN WATERCOLOR",
    tone: "light",
    bg: "#f8f3e8",
    panel: "#fdf9ef",
    text: "#3e4b45",
    muted: "#626e65",
    line: "#d9dfd1",
    accent: "#577d72",
    soft: "#e3e9d6",
    images: "#648979",
    videos: "#aa737b",
    tokens: "#6d819d",
    font: tb
  }, {
    id: "ukiyoe",
    sourceStyle: "ukiyoe",
    name: "浮世绘",
    description: "靛蓝潮汐与木刻线条，留住此刻",
    edition: "浮世手帖 · 日々の創作",
    tone: "light",
    bg: "#eee4ce",
    panel: "#f6edd9",
    text: "#203d4a",
    muted: "#50636b",
    line: "#778e92",
    accent: "#245b71",
    soft: "#d5e0da",
    images: "#245b71",
    videos: "#ad5547",
    tokens: "#788564",
    font: tb,
    empty: "#d7d7c8"
  }, {
    id: "papercut-red",
    sourceStyle: "papercut-red",
    name: "窗花剪纸",
    description: "一剪一镂空，把日子剪成好风景",
    edition: "一纸窗花 · 万千灵感",
    tone: "light",
    bg: "#f6edda",
    panel: "#fff7e7",
    text: "#812e28",
    muted: "#855747",
    line: "#dfb8a6",
    accent: "#c3312c",
    soft: "#f3d5c1",
    images: "#c3312c",
    videos: "#a84434",
    tokens: "#8e4b37",
    font: tb
  }, {
    id: "risograph",
    sourceStyle: "risograph",
    name: "孔版印刷",
    description: "青与珊瑚红叠印，留下油墨温度",
    edition: "DAILY IMPRESSIONS / TWO INKS",
    tone: "light",
    bg: "#f4eee2",
    panel: "#fbf5e9",
    text: "#245a60",
    muted: "#536b6b",
    line: "#cbd8ca",
    accent: "#007b80",
    soft: "#d1e5d9",
    images: "#007b80",
    videos: "#d75a58",
    tokens: "#42716b",
    font: h0
  }, {
    id: "art-deco",
    sourceStyle: "art-deco",
    name: "装饰艺术",
    description: "黑漆、鎏金与对称的黄金年代",
    edition: "ATELIER / THE GOLDEN EDITION",
    tone: "dark",
    bg: "#191d1c",
    panel: "#202825",
    text: "#f3e9cd",
    muted: "#b9ae8f",
    line: "#786743",
    accent: "#dfbd72",
    soft: "#393728",
    images: "#dfbd72",
    videos: "#a5ba9b",
    tokens: "#cd9b79",
    font: tb,
    empty: "#374037"
  }, {
    id: "blueprint",
    sourceStyle: "blueprint",
    name: "工程蓝图",
    description: "每一笔构想，都有清晰的坐标",
    edition: "ATELIER / DRAWING NO. 001",
    tone: "dark",
    bg: "#123f66",
    panel: "#174971",
    text: "#e5f2ee",
    muted: "#a9cbd7",
    line: "#548198",
    accent: "#d1ece8",
    soft: "#2b607e",
    images: "#d1ece8",
    videos: "#b5dbe1",
    tokens: "#94c5d5",
    font: Pte,
    empty: "#2c5d7b"
  }, {
    id: "stained-glass",
    sourceStyle: "stained-glass",
    name: "彩色玻璃",
    description: "宝石色的光，穿过每一块灵感",
    edition: "LIGHT THROUGH / THE ATELIER",
    tone: "dark",
    bg: "#191e2b",
    panel: "#232a3b",
    text: "#efe9db",
    muted: "#b3b4c5",
    line: "#424d67",
    accent: "#e5bd75",
    soft: "#464032",
    images: "#7babb9",
    videos: "#cd8192",
    tokens: "#a496c8",
    font: tb
  }, {
    id: "ascii-crt",
    sourceStyle: "ascii-crt",
    name: "CRT 终端",
    description: "琥珀色字符，存档今日的灵感信号",
    edition: "> ATELIER.ARCHIVE / READY_",
    tone: "dark",
    bg: "#15120c",
    panel: "#1c180f",
    text: "#f0cf86",
    muted: "#b09b6d",
    line: "#4e432a",
    accent: "#edbb63",
    soft: "#39301b",
    images: "#edbb63",
    videos: "#dab36b",
    tokens: "#c6a972",
    font: Pte
  }, {
    id: "pixel-rpg",
    sourceStyle: "pixel-rpg",
    name: "像素冒险",
    description: "存好这一关，明天继续创造",
    edition: "ATELIER / SAVE YOUR ADVENTURE",
    tone: "dark",
    bg: "#191d37",
    panel: "#242b4a",
    text: "#f7efcf",
    muted: "#abb4d0",
    line: "#7284ab",
    accent: "#ecd58d",
    soft: "#454369",
    images: "#81bfa0",
    videos: "#b597ca",
    tokens: "#85b2d0",
    font: Pte,
    empty: "#3b4469"
  }, {
    id: "paper-lantern",
    sourceStyle: "paper-lantern",
    name: "纸雕灯影",
    description: "层层纸影间，点亮一盏创作的灯",
    edition: "LITTLE LIGHTS / LAYER BY LAYER",
    tone: "dark",
    bg: "#152b35",
    panel: "#203b45",
    text: "#f1e6ce",
    muted: "#acbfbb",
    line: "#46646b",
    accent: "#e7bb78",
    soft: "#424938",
    images: "#9cbbac",
    videos: "#d0ac7c",
    tokens: "#8eafc4",
    font: tb
  }, {
    id: "silkscreen-poster",
    sourceStyle: "silkscreen-poster",
    name: "丝印海报",
    description: "套色山海，下一站是新的作品",
    edition: "ATELIER EXPLORERS / KEEP CREATING",
    tone: "light",
    bg: "#f1e4c9",
    panel: "#fbefd8",
    text: "#284b4b",
    muted: "#626550",
    line: "#c7c6a8",
    accent: "#b44d32",
    soft: "#e9c290",
    images: "#4e7865",
    videos: "#b44d32",
    tokens: "#607c86",
    font: h0
  }, {
    id: "engraving",
    sourceStyle: "engraving",
    name: "铜版画",
    description: "细密排线与压印纸，珍藏创作痕迹",
    edition: "ATELIER / A STUDY IN CREATION",
    tone: "light",
    bg: "#f1e8d2",
    panel: "#f8efda",
    text: "#30271b",
    muted: "#6b604b",
    line: "#a59a80",
    accent: "#69583b",
    soft: "#e1d4b7",
    images: "#69583b",
    videos: "#847055",
    tokens: "#5e6a58",
    font: tb,
    empty: "#dfd5bd"
  }, {
    id: "crayon-book",
    sourceStyle: "crayon-book",
    name: "蜡笔儿童绘本",
    description: "蜡笔擦过纸纹，画下今天的小小想象",
    edition: "A LITTLE PAGE / A BIG IDEA",
    tone: "light",
    bg: "#f4efe3",
    panel: "#fcf7eb",
    text: "#3a3b51",
    muted: "#666375",
    line: "#d5cfbd",
    accent: "#9d5140",
    soft: "#efe0ac",
    images: "#537b71",
    videos: "#9d5140",
    tokens: "#68698b",
    font: HMe,
    frame: "paper",
    radius: 12
  }, {
    id: "impasto",
    sourceStyle: "impasto",
    name: "油画厚涂",
    description: "厚厚的颜料与刮刀痕，把灵感留在画布上",
    edition: "COLOUR HAS WEIGHT / ATELIER",
    tone: "dark",
    bg: "#243841",
    panel: "#2e464c",
    text: "#faedce",
    muted: "#bec9ba",
    line: "#52686a",
    accent: "#efbe72",
    soft: "#535445",
    images: "#b8cda3",
    videos: "#e4ab86",
    tokens: "#a9c9d5",
    font: tb,
    frame: "paper",
    radius: 3
  }, {
    id: "one-line",
    sourceStyle: "one-line",
    name: "一笔画",
    description: "一根不断的线，连接每一次创作",
    edition: "ONE LINE / MANY POSSIBILITIES",
    tone: "light",
    bg: "#f4efe4",
    panel: "#faf6ed",
    text: "#302b25",
    muted: "#6c6458",
    line: "#d7d0c2",
    accent: "#46433b",
    soft: "#e6dfd0",
    images: "#555148",
    videos: "#777167",
    tokens: "#484a48",
    font: HMe,
    radius: 0
  }, {
    id: "whiteboard",
    sourceStyle: "whiteboard",
    name: "白板讲解",
    description: "记号笔、箭头与随手写下的新点子",
    edition: "THINK IT / DRAW IT / MAKE IT",
    tone: "light",
    bg: "#f4f6f2",
    panel: "#ffffff",
    text: "#28333c",
    muted: "#5b6c73",
    line: "#d6dfdc",
    accent: "#295d9a",
    soft: "#e1ebf2",
    images: "#347465",
    videos: "#a65e43",
    tokens: "#295d9a",
    font: HMe,
    frame: "ruled",
    radius: 8
  }, {
    id: "urban-sketch",
    sourceStyle: "urban-sketch",
    name: "钢笔淡彩",
    description: "线条未合拢，颜色已洇进城市的一角",
    edition: "ON LOCATION / CREATIVE SKETCHBOOK",
    tone: "light",
    bg: "#f3ead8",
    panel: "#faf3e5",
    text: "#4a4035",
    muted: "#746350",
    line: "#d8cbb4",
    accent: "#896343",
    soft: "#e6dbc2",
    images: "#597466",
    videos: "#a45e4c",
    tokens: "#5e8090",
    font: HMe,
    frame: "paper",
    radius: 3
  }, {
    id: "shadow-puppet",
    sourceStyle: "shadow-puppet",
    name: "皮影戏",
    description: "暖灯透过雕花皮影，故事在幕布上展开",
    edition: "灯影之间 · 创作有声",
    tone: "light",
    bg: "#ead5a4",
    panel: "#f7e6bd",
    text: "#553720",
    muted: "#775334",
    line: "#c4a16b",
    accent: "#8d3d2a",
    soft: "#e5bd85",
    images: "#647441",
    videos: "#9b4a32",
    tokens: "#576b72",
    font: tb,
    frame: "double",
    radius: 2
  }, {
    id: "halftone-dossier",
    sourceStyle: "halftone-dossier",
    name: "复古半调案卷",
    description: "网点、档案夹与盖章确认的灵感证据",
    edition: "ATELIER / CREATIVE CASE FILE",
    tone: "light",
    bg: "#eee5ce",
    panel: "#faf0d9",
    text: "#283544",
    muted: "#64665f",
    line: "#cbc4ac",
    accent: "#ae4334",
    soft: "#edcf75",
    images: "#47766f",
    videos: "#ae4334",
    tokens: "#566d91",
    font: tb,
    frame: "offset",
    radius: 2
  }, {
    id: "woodcut",
    sourceStyle: "woodcut",
    name: "木刻版画",
    description: "从深色木版中，刻出属于作品的光",
    edition: "CUT INTO LIGHT / ATELIER",
    tone: "light",
    bg: "#e9e1cc",
    panel: "#f6eedb",
    text: "#272821",
    muted: "#666452",
    line: "#b9b49e",
    accent: "#414239",
    soft: "#d7d1bb",
    images: "#414239",
    videos: "#656454",
    tokens: "#55574f",
    font: tb,
    frame: "ruled",
    radius: 0
  }, {
    id: "swiss-motion",
    sourceStyle: "swiss-motion",
    name: "瑞士动态排版",
    description: "严谨网格与鲜红信号，让信息清晰有力",
    edition: "ATELIER / FORM FOLLOWS IDEAS",
    tone: "light",
    bg: "#eeede8",
    panel: "#ffffff",
    text: "#20201e",
    muted: "#64635d",
    line: "#d8d8d1",
    accent: "#c7302c",
    soft: "#efd6ce",
    images: "#454543",
    videos: "#686865",
    tokens: "#8c8c83",
    font: h0,
    frame: "ruled",
    radius: 0
  }, {
    id: "spy-titles",
    sourceStyle: "spy-titles",
    name: "60s 间谍片头",
    description: "斜切色纸与剪影，灵感正在秘密行动",
    edition: "THE CREATIVE AFFAIR / ATELIER",
    tone: "light",
    bg: "#eadfca",
    panel: "#f6ebd4",
    text: "#2f2b25",
    muted: "#72604b",
    line: "#cbc0a4",
    accent: "#ab432b",
    soft: "#e4b974",
    images: "#4f7773",
    videos: "#ab432b",
    tokens: "#7a6846",
    font: h0,
    frame: "offset",
    radius: 0
  }, {
    id: "pictogram-motion",
    sourceStyle: "pictogram-motion",
    name: "象形运动图形",
    description: "圆点与几何动作，组成创作的节拍",
    edition: "IDEAS IN MOTION / ATELIER",
    tone: "light",
    bg: "#e3eee6",
    panel: "#f4f9f1",
    text: "#214b43",
    muted: "#526e64",
    line: "#b9d3c3",
    accent: "#286c58",
    soft: "#cee5cd",
    images: "#286c58",
    videos: "#50876d",
    tokens: "#467669",
    font: h0,
    radius: 0
  }, {
    id: "dataviz",
    sourceStyle: "dataviz",
    name: "数据叙事",
    description: "用真实的创作数字，讲述自己的积累",
    edition: "YOUR WORK / IN NUMBERS",
    tone: "light",
    bg: "#f4efe2",
    panel: "#fbf7ec",
    text: "#323d43",
    muted: "#616b6c",
    line: "#d5dace",
    accent: "#3b6d8d",
    soft: "#dfe8e7",
    images: "#3b6d8d",
    videos: "#a64e43",
    tokens: "#567987",
    font: tb,
    frame: "paper",
    radius: 0
  }, {
    id: "iso-infographic",
    sourceStyle: "iso-infographic",
    name: "等距信息图",
    description: "三面色块与指引线，搭起灵感的小系统",
    edition: "BUILDING IDEAS / ISOMETRIC NOTES",
    tone: "light",
    bg: "#edf1e9",
    panel: "#f9fcf4",
    text: "#334b4d",
    muted: "#5e706b",
    line: "#cbdad1",
    accent: "#397a76",
    soft: "#d7e8dc",
    images: "#528465",
    videos: "#af6652",
    tokens: "#587f9d",
    font: h0,
    radius: 8
  }, {
    id: "dark-keynote",
    sourceStyle: "dark-keynote",
    name: "暗色科技发布",
    description: "暗色舞台与一束聚光，作品即是主角",
    edition: "THE NEXT IDEA / ATELIER",
    tone: "dark",
    bg: "#0e1119",
    panel: "#191d29",
    text: "#eceef4",
    muted: "#a5adbf",
    line: "#353c51",
    accent: "#beb1ff",
    soft: "#333049",
    images: "#b3b9c8",
    videos: "#8e98ae",
    tokens: "#a5a6c1",
    font: h0,
    frame: "glass",
    radius: 14
  }, {
    id: "living-screencast",
    sourceStyle: "living-screencast",
    name: "活体实机录屏",
    description: "让一只像素小伙伴，陪你整理灵感",
    edition: "ATELIER / A LITTLE CREATIVE COMPANION",
    tone: "dark",
    bg: "#19191b",
    panel: "#242427",
    text: "#f1f0ed",
    muted: "#aeaaab",
    line: "#414144",
    accent: "#e9b59a",
    soft: "#42352e",
    images: "#95d8bb",
    videos: "#c3b1ef",
    tokens: "#91c4ed",
    font: h0,
    radius: 14
  }, {
    id: "hologram-hud",
    sourceStyle: "hologram-hud",
    name: "科幻全息界面",
    description: "线框投影与扫描标记，解析每一道灵感",
    edition: "CREATIVE SCAN / HOLOGRAPHIC ARCHIVE",
    tone: "dark",
    bg: "#0b1920",
    panel: "#112630",
    text: "#d7f2f5",
    muted: "#8cb8c4",
    line: "#2d5665",
    accent: "#9addea",
    soft: "#20414b",
    images: "#83cbd8",
    videos: "#a5d5db",
    tokens: "#ebbb7f",
    font: Pte,
    frame: "double",
    radius: 2
  }, {
    id: "rubber-hose",
    sourceStyle: "rubber-hose",
    name: "1930s 橡皮管卡通",
    description: "黑白胶片里，连小物件也有好心情",
    edition: "A LITTLE INK / A LOT OF CHARACTER",
    tone: "light",
    bg: "#e5e5df",
    panel: "#f9f9f2",
    text: "#2b2b29",
    muted: "#62625b",
    line: "#bcbcb4",
    accent: "#3d3d39",
    soft: "#d4d4cb",
    images: "#44443f",
    videos: "#707068",
    tokens: "#55554f",
    font: tb,
    frame: "double",
    radius: 22
  }, {
    id: "cel-anime-80s",
    sourceStyle: "cel-anime-80s",
    name: "80 年代赛璐璐动画",
    description: "手绘夜色与透光霓虹，留住城市的心跳",
    edition: "ATELIER / AFTER THE CITY LIGHTS",
    tone: "dark",
    bg: "#231e38",
    panel: "#302a48",
    text: "#f7e8d2",
    muted: "#c6b0c4",
    line: "#564565",
    accent: "#edacc3",
    soft: "#52384f",
    images: "#8cc9cc",
    videos: "#edacc3",
    tokens: "#d9c69b",
    font: h0,
    radius: 4
  }, {
    id: "scifi-toon",
    sourceStyle: "scifi-toon",
    name: "科幻情景喜剧卡通",
    description: "普通的灵感日常，也可以有奇妙的访客",
    edition: "ATELIER / A VERY ORDINARY UNIVERSE",
    tone: "light",
    bg: "#e6dfea",
    panel: "#f5eff8",
    text: "#3d304d",
    muted: "#6d5874",
    line: "#bdb0cc",
    accent: "#885777",
    soft: "#e9c8d7",
    images: "#5e837f",
    videos: "#9b607a",
    tokens: "#73609a",
    font: h0,
    frame: "offset",
    radius: 16
  }, {
    id: "midcentury-toon",
    sourceStyle: "midcentury-toon",
    name: "50s 扁平卡通",
    description: "错位套色与原子星芒，轻快的复古日常",
    edition: "MODERN LITTLE IDEAS / ATELIER",
    tone: "light",
    bg: "#f1e8d5",
    panel: "#fff6e3",
    text: "#453b30",
    muted: "#74634d",
    line: "#d8c6a5",
    accent: "#a4543f",
    soft: "#ecd396",
    images: "#4c807b",
    videos: "#a4543f",
    tokens: "#8b7751",
    font: tb,
    frame: "offset",
    radius: 10
  }, {
    id: "hd-2d",
    sourceStyle: "hd-2d",
    name: "HD-2D",
    description: "微缩世界里的一束暖光，照亮像素旅人",
    edition: "ATELIER / SMALL WORLDS, WARM LIGHTS",
    tone: "dark",
    bg: "#202b39",
    panel: "#2c3948",
    text: "#f5e6c9",
    muted: "#bfbdad",
    line: "#64706d",
    accent: "#ecc98b",
    soft: "#494a3f",
    images: "#aac8b5",
    videos: "#d2ad9b",
    tokens: "#a2becf",
    font: tb,
    frame: "double",
    radius: 3
  }, {
    id: "microgame",
    sourceStyle: "microgame",
    name: "微游戏快闪",
    description: "打开灵感小游戏，今天也有新招数",
    edition: "MAKE SOMETHING! / ATELIER ARCADE",
    tone: "dark",
    bg: "#302149",
    panel: "#44325b",
    text: "#fff1d5",
    muted: "#d4c0dd",
    line: "#786087",
    accent: "#f0ce73",
    soft: "#685749",
    images: "#8bd3c4",
    videos: "#e6a2b7",
    tokens: "#aebcf0",
    font: h0,
    frame: "offset",
    radius: 12
  }, {
    id: "game-show",
    sourceStyle: "game-show",
    name: "综艺节奏扁平",
    description: "糖果色舞台，给每一次完成热烈的掌声",
    edition: "TODAY IS YOUR SHOW / ATELIER",
    tone: "light",
    bg: "#f4cc97",
    panel: "#fff1cf",
    text: "#4a3439",
    muted: "#775050",
    line: "#d1a479",
    accent: "#a03d50",
    soft: "#ebacac",
    images: "#427f75",
    videos: "#a03d50",
    tokens: "#6165a1",
    font: h0,
    frame: "offset",
    radius: 18
  }, {
    id: "silent-film",
    sourceStyle: "silent-film",
    name: "1920s 默片",
    description: "银盐、字幕卡与一页无声的创作记忆",
    edition: "ATELIER / A CREATIVE PICTURE",
    tone: "dark",
    bg: "#272623",
    panel: "#33322e",
    text: "#eee9d9",
    muted: "#b8b4a5",
    line: "#68655a",
    accent: "#d3c8a9",
    soft: "#494438",
    images: "#d3c8a9",
    videos: "#bebbb0",
    tokens: "#a6aaa4",
    font: tb,
    frame: "double",
    radius: 8
  }, {
    id: "backrooms",
    sourceStyle: "backrooms",
    name: "后室 / 新怪谈",
    description: "空旷走廊与旧录像，记录无人打扰的片刻",
    edition: "ATELIER / THE QUIET ARCHIVE",
    tone: "light",
    bg: "#d6cfad",
    panel: "#e8e1c2",
    text: "#42472f",
    muted: "#535a3b",
    line: "#b9b68f",
    accent: "#69743f",
    soft: "#c7cd9d",
    images: "#69743f",
    videos: "#8a7649",
    tokens: "#6a795d",
    font: Pte,
    frame: "ruled",
    radius: 2
  }, {
    id: "brick-toy",
    sourceStyle: "brick-toy",
    name: "积木玩具",
    description: "一块块拼好，灵感就有了形状",
    edition: "ATELIER / ONE BRICK AT A TIME",
    tone: "light",
    bg: "#eeece6",
    panel: "#fcfbf5",
    text: "#36434a",
    muted: "#596970",
    line: "#ccd3ce",
    accent: "#366a9f",
    soft: "#dce6ec",
    images: "#4d8065",
    videos: "#b35341",
    tokens: "#366a9f",
    font: h0,
    radius: 8
  }, {
    id: "paper-popup",
    sourceStyle: "paper-popup",
    name: "纸片立体书",
    description: "翻开这一页，让纸上的想象站起来",
    edition: "OPEN A PAGE / OPEN A WORLD",
    tone: "light",
    bg: "#ece6d5",
    panel: "#fbf4e4",
    text: "#4c3b2c",
    muted: "#73664c",
    line: "#d4c4a8",
    accent: "#607c55",
    soft: "#d9e3bc",
    images: "#607c55",
    videos: "#af7150",
    tokens: "#658498",
    font: tb,
    frame: "paper",
    radius: 6
  }, {
    id: "tilt-shift",
    sourceStyle: "tilt-shift",
    name: "移轴微缩",
    description: "把城市缩进掌心，聚焦今天的作品",
    edition: "ATELIER / A SMALLER POINT OF VIEW",
    tone: "light",
    bg: "#e7ebe2",
    panel: "#f7f9f1",
    text: "#3c4b44",
    muted: "#59685f",
    line: "#cbd6c4",
    accent: "#4b755c",
    soft: "#d6e2c9",
    images: "#4b755c",
    videos: "#ab7052",
    tokens: "#5c829a",
    font: h0,
    radius: 10
  }, {
    id: "lowpoly-island",
    sourceStyle: "lowpoly-island",
    name: "低多边形等距",
    description: "柔和的几何小岛，慢慢长出新风景",
    edition: "ATELIER / AN ISLAND OF IDEAS",
    tone: "light",
    bg: "#e5edf0",
    panel: "#f6faf9",
    text: "#3c535a",
    muted: "#536a73",
    line: "#c6d9dc",
    accent: "#527e87",
    soft: "#d1e4df",
    images: "#638c71",
    videos: "#b37765",
    tokens: "#5b82a2",
    font: h0,
    radius: 12
  }, {
    id: "glass-product",
    sourceStyle: "glass-product",
    name: "玻璃质感产品",
    description: "暗场中的玻璃边缘，让光成为主角",
    edition: "ATELIER / LIGHT, HELD IN FORM",
    tone: "dark",
    bg: "#11151c",
    panel: "#1b232e",
    text: "#edf4f8",
    muted: "#a8bccc",
    line: "#41576b",
    accent: "#b1d5ea",
    soft: "#2d4557",
    images: "#b1d5ea",
    videos: "#bec9df",
    tokens: "#8fbacb",
    font: h0,
    frame: "glass",
    radius: 18
  }],
  Opr = "qiaodoumayi_creator_theme";

function fzt(e) {
  return cAe.find(t => t.id === e) || cAe[0];
}

function qOi() {
  try {
    return fzt(localStorage.getItem(Opr)).id;
  } catch {
    return "original";
  }
}

const KOi = {
  works: ["#292a2c", "#54403b", "#87594a", "#bf866b", "#efb798"],
  images: ["#292a2c", "#283f3b", "#34695b", "#56a48b", "#95d8bb"],
  videos: ["#292a2c", "#34314d", "#595080", "#8b79bc", "#c3b1ef"],
  tokens: ["#292a2c", "#263c52", "#345f84", "#558ebc", "#91c4ed"]
};

function Bpr(e, t) {
  if (e.id === "original") return KOi[t];
  const n = t === "works" ? e.accent : e[t],
    r = e.empty || e.line;
  return [0, .25, .48, .73, 1].map(a => "#" + [1, 3, 5].map(i => {
    const o = parseInt(r.slice(i, i + 2), 16),
      s = parseInt(n.slice(i, i + 2), 16);
    return Math.round(o + (s - o) * a).toString(16).padStart(2, "0");
  }).join(""));
}

const QOi = {
    ...WOi,
    original: "",
    cartoon: `<g stroke="#705340" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M85 98c-30-26-52 15-25 32-34 13-20 50 9 42-5 34 36 43 46 14 20 26 53 1 34-23 33-12 25-48-7-43 7-32-35-45-45-15Z" fill="#f6c857"/><circle cx="102" cy="144" r="18" fill="#fff6df"/><path d="M96 143v3m12-3v3m-12 8q7 6 13-1" fill="none"/>
        <path d="m186 221 10-24 12 25 27 3-21 17 5 27-23-14-23 14 5-27-21-17Z" fill="#e7a190"/>
        <path d="M977 112c-5-30 40-42 52-17 22-24 50-4 44 17 35-1 41 42 9 45h-108c-33 0-32-43 3-45Z" fill="#fffdf3"/>
        <path d="m1053 215 35-44 20 60Z" fill="#99b79c"/><path d="m1088 171 20 60 24-36Z" fill="#eac98b"/>
        <path d="m170 68 5 12m-21 7 12-3m854 152 3 15m-17-6 12-3" fill="none"/>
        </g><g fill="#d4b988"><circle cx="266" cy="116" r="4"/><circle cx="957" cy="231" r="4"/><circle cx="1136" cy="76" r="3"/></g>`,
    realistic: `<defs><linearGradient id="wall" x2="1" y2="1"><stop stop-color="#c9c5b7"/><stop offset="1" stop-color="#f8f6ef"/></linearGradient><linearGradient id="light"><stop stop-color="#fffdf0" stop-opacity=".9"/><stop offset="1" stop-color="#fffdf0" stop-opacity="0"/></linearGradient><linearGradient id="vase" x2="1"><stop stop-color="#999781"/><stop offset=".4" stop-color="#d9d6c3"/><stop offset="1" stop-color="#aaa991"/></linearGradient></defs>
        <path d="M924 288V118a99 99 0 0 1 198 0v170Z" fill="url(#wall)"/><path d="m948 0-210 300h90L1038 0Zm130 0L868 300h50L1128 0Z" fill="url(#light)"/>
        <ellipse cx="1090" cy="278" rx="82" ry="10" fill="#565949" opacity=".12"/><path d="M1055 217q-14 52 7 63h52q23-11 7-63Z" fill="url(#vase)"/><path d="M1089 223q-12-84 17-146m-17 132q-28-27-53-27m55-16q31-17 45-42" stroke="#64705a" stroke-width="3" fill="none"/>
        <g fill="#7a8768"><ellipse cx="1107" cy="117" rx="9" ry="26" transform="rotate(24 1107 117)"/><ellipse cx="1081" cy="155" rx="10" ry="25" transform="rotate(-32 1081 155)"/><ellipse cx="1127" cy="149" rx="9" ry="25" transform="rotate(43 1127 149)"/><ellipse cx="1053" cy="185" rx="9" ry="23" transform="rotate(-57 1053 185)"/></g>
        <path d="m14 29 181 271H77L0 186V29Z" fill="#c8c6b7" opacity=".3"/>`,
    cyber: `<defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0v32" fill="none" stroke="#234354" stroke-width=".6"/></pattern><linearGradient id="fade"><stop stop-color="#6cecd7" stop-opacity="0"/><stop offset="1" stop-color="#6cecd7" stop-opacity=".13"/></linearGradient></defs>
        <rect width="1200" height="300" fill="url(#grid)"/><path d="m825 300 140-150h235v150Z" fill="url(#fade)"/>
        <g fill="none" stroke="#6cecd7" stroke-width="1.5" opacity=".65"><path d="M26 70V26h100m948 0h100v44M26 230v44h100m948 0h100v-44M920 116h78l22-22h113M86 176h80l30 30h64"/><circle cx="1060" cy="177" r="66"/><circle cx="1060" cy="177" r="49" stroke-dasharray="6 10"/><path d="m1060 110 57 99h-114Zm0 0v130m-65-63h130"/></g>
        <g fill="#cba0ff"><rect x="84" y="92" width="42" height="4"/><rect x="84" y="105" width="20" height="4"/><circle cx="920" cy="116" r="3"/></g>`,
    minimal: '<path d="M34 263h1132" stroke="#dedfd8"/><circle cx="1050" cy="142" r="64" fill="none" stroke="#dedfd8"/><path d="M985 142h130M1050 78v128" stroke="#b8beb0"/><rect x="68" y="76" width="18" height="18" fill="#4b5940"/><path d="M68 112h110M68 123h72" stroke="#d1d4cb" stroke-width="3"/>',
    manga: `<defs><pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#252420" opacity=".2"/></pattern></defs><path d="M0 0h227L82 300H0ZM985 0h215v300H1115Z" fill="url(#dots)"/>
        <g stroke="#252420" stroke-width="2.5"><path d="m990 90 15-41 24 25 32-31 10 40 45-5-18 37 36 19-40 19 14 39-41-8-15 41-27-34-36 18 4-44-44-8 29-30-29-28Z" fill="#f1d14f"/><path d="m1147 25-43 32m70 34-42 11m39 98-35-19M50 48l111 48M28 139l119 6M72 247l89-57" fill="none"/></g><path d="m1021 103 28-8-7 40-20 5Zm0 45 17-4-3 15-17 4Z" fill="#252420"/>`,
    ink: `<defs><linearGradient id="mist" x2="0" y2="1"><stop stop-color="#57554b" stop-opacity=".35"/><stop offset="1" stop-color="#57554b" stop-opacity="0"/></linearGradient><linearGradient id="near" x2="0" y2="1"><stop stop-color="#35352f" stop-opacity=".42"/><stop offset="1" stop-color="#35352f" stop-opacity="0"/></linearGradient></defs>
        <path d="M0 253 32 222 51 227 111 142 134 159 172 116 197 155 236 176 286 232 342 263v37H0Z" fill="url(#mist)"/><path d="m0 274 75-54 22 11 33-44 55 58 44-12 78 67H0Z" fill="url(#near)"/>
        <path d="m791 297 72-90 28 25 40-77 28 21 44-84 32 37 39-51 34 56 24-10 68 93v83Z" fill="url(#mist)"/><path d="m958 300 47-83 20 10 54-85 30 50 21-5 70 79v34Z" fill="url(#near)"/>
        <g stroke="#555349" opacity=".5" fill="none"><path d="m96 260 20-2m11 10 40-2m-13 18 99-3m795-57 52-92-21 9m16 0-2-15m-20 48 17-5m-25 20 12-2"/><path d="m821 106 8-3 7 4m16-19 9-3 8 5"/></g>
        <g transform="translate(1110 55) rotate(3)"><rect width="31" height="39" rx="2" fill="#b02e22" opacity=".84"/><path d="M7 8v24m6-24v9h11m-6-9v24m-5-9H8m5 7h11M8 6h15" fill="none" stroke="#f2ecde" stroke-width="2"/></g>`,
    music: `<defs><radialGradient id="record"><stop stop-color="#3c4334"/><stop offset=".32" stop-color="#131610"/><stop offset=".7" stop-color="#333a2b"/><stop offset="1" stop-color="#0e110c"/></radialGradient></defs>
        <circle cx="1046" cy="147" r="129" fill="url(#record)"/><g fill="none" stroke="#606b49" opacity=".26">${[65, 74, 84, 95, 106, 117].map(e => `<circle cx="1046" cy="147" r="${e}"/>`).join("")}</g><circle cx="1046" cy="147" r="43" fill="#c5d292"/><circle cx="1046" cy="147" r="6" fill="#171916"/><path d="m1017 137 50-13m-50 20 50-13m-28 38h23" stroke="#67734c" stroke-width="2"/>
        <g fill="#d6e59e" opacity=".45">${[18, 38, 67, 42, 94, 65, 117, 77, 42, 61, 27].map((e, t) => `<rect x="${52 + t * 12}" y="${190 - e / 2}" width="5" height="${e}" rx="2"/>`).join("")}</g>`,
    watercolor: `<defs><filter id="wet" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="7" result="grain"/><feDisplacementMap in="SourceGraphic" in2="grain" scale="7"/></filter></defs>
        <g filter="url(#wet)"><path d="M891 248q-32-106 60-157t173 15q53 80-35 129t-198 13Z" fill="#84a997" opacity=".18"/><path d="M935 247q26-72 61-110t72-61q-21 32-44 67t-83 111Z" fill="#557c71" opacity=".65"/>
        <path d="M1000 162q-64 4-74-48 41-18 74 48Zm24-34q-25-54 1-84 39 24-1 84Zm-4 1q55-59 94-28-10 42-94 28Zm-48 70q-71 13-74-24 47-26 74 24Zm30-31q57-36 90-6-28 36-90 6Z" fill="#769b75" opacity=".48"/>
        <path d="M999 160q-50-8-64-39m63 45q-37 38-57 80m80-120q7-33 5-65m-7 69q45-22 79-23" fill="none" stroke="#f8f3e8" stroke-width="2" opacity=".8"/>
        <path d="M1093 223q-28-34 8-46 28-4 23 21 32 8 14 30-31 9-45-5Z" fill="#bd8588" opacity=".45"/><path d="M1103 218q-22-25 2-33m7 12q16 14 10 24" fill="none" stroke="#bd8588" stroke-width="5" opacity=".35"/>
        <path d="M66 111q28-49 86-19t40 83q-10 40-77 32t-49-96Z" fill="#a5b9c0" opacity=".22"/><path d="M109 235q19-75 54-110-43 24-51 55-38-44-45-16 4 39 45 27Z" fill="#829d87" opacity=".48"/></g>
        <g fill="#577d72" opacity=".22"><circle cx="927" cy="69" r="3"/><circle cx="1139" cy="254" r="2"/><circle cx="1160" cy="168" r="4"/><circle cx="202" cy="84" r="2"/></g>`,
    ukiyoe: `<defs><linearGradient id="bokashi" x2="0" y2="1"><stop stop-color="#90b0b6"/><stop offset="1" stop-color="#eee4ce"/></linearGradient><pattern id="wood" width="37" height="17" patternUnits="userSpaceOnUse"><path d="M0 5q10-4 20 0t17 0M3 13q15-3 31 1" fill="none" stroke="#284e5b" stroke-width=".6" opacity=".15"/></pattern></defs>
        <path d="M874 37h276v238H874Z" fill="url(#bokashi)"/><circle cx="1097" cy="85" r="26" fill="#ba6451"/><path d="M844 221q101-110 207-38t141 37v67H844Z" fill="#e4d8b9" stroke="#284e5b" stroke-width="2"/>
        <path d="M842 242q103-96 207-29t145 33v40H842Z" fill="#6f9b9e" stroke="#284e5b" stroke-width="2"/><path d="M855 272q81-72 168-21t160 25v20H855Z" fill="#2d5c72"/>
        <g fill="none" stroke="#eee4ce" stroke-width="2"><path d="M883 244q66-55 129-21m-109 26q48-33 87-20m50 14q53 31 114 19m-222 23q52-30 84-5"/></g>
        <path d="m950 170 69 17 29-10-52-17Z" fill="#eee4ce" stroke="#284e5b" stroke-width="2"/><path d="m996 160 6-38m-6 14-25 24" stroke="#284e5b" stroke-width="2"/><path d="M874 37h276v250H874Z" fill="url(#wood)"/>
        <g fill="none" stroke="#284e5b"><path d="M54 267q72-49 92-184m-30 111 53-59m-38 5-51-24m22 111 64-10" stroke-width="3"/><path d="m68 117 24-17 25 12 29-16m-47 117 27-17 31 9 25-13m-34-57 10-19 18-8" stroke-width="7"/></g>
        <rect x="1106" y="112" width="32" height="60" fill="#eee4ce" stroke="#284e5b"/><path d="M1115 124h14m-14 10h14m-8-15v21m-7 10h14m-14 8h14" stroke="#284e5b" stroke-width="2"/>`,
    "papercut-red": `<defs><mask id="cut"><circle r="112" fill="white"/><circle r="12" fill="black"/>${Array.from({
      length: 8
    }, (e, t) => `<g transform="rotate(${t * 45})"><path d="M-9-92Q-34-56 0-29Q34-56 9-92L0-81Z" fill="black"/><path d="m-10-107 10 9 10-9Z" fill="black"/><path d="m-26-23 4 12-11 7-13-12Z" fill="black"/></g>`).join("")}</mask></defs>
        <g fill="#c3312c"><g transform="translate(1048 158)"><circle r="112" mask="url(#cut)"/><path fill-rule="evenodd" d="M-125-125H125V125H-125ZM-119-119V119H119V-119Z"/><path d="m-126-98 28-28h-28Zm252 0-28-28h28ZM-126 98l28 28h-28Zm252 0-28 28h28Z"/></g>
        <g transform="translate(139 159) rotate(15) scale(.66)"><circle r="112" mask="url(#cut)"/><path fill-rule="evenodd" d="M-125-125H125V125H-125ZM-119-119V119H119V-119Z"/></g></g>`,
    risograph: `<defs><pattern id="riso" width="7" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r=".8" fill="#f4eee2"/><path d="m5 7 1-2" stroke="#f4eee2" stroke-width=".6"/></pattern></defs>
        <g style="isolation:isolate"><circle cx="1050" cy="132" r="88" fill="#ee7972"/><path d="M944 76h88v170h-88Zm67 103h118v67h-118Z" fill="#00838a" opacity=".87" style="mix-blend-mode:multiply"/><path d="m1087 103 64 90h-128Z" fill="#00838a" opacity=".58" style="mix-blend-mode:multiply"/>
        <path d="M941 76h3v170h-3m-851-36 75-135 53 160Z" fill="#ee7972" opacity=".9"/><circle cx="116" cy="155" r="48" fill="#00838a" opacity=".8" style="mix-blend-mode:multiply"/></g>
        <path d="M50 44h196v220H50Zm867-20h302v252H867Z" fill="url(#riso)"/><g stroke="#00838a" stroke-width="1"><path d="M910 55h18m-9-9v18m213 195h18m-9-9v18M54 261h23m-11-11v22"/></g>`,
    "art-deco": `<defs><linearGradient id="gold"><stop stop-color="#796039"/><stop offset=".27" stop-color="#c5a361"/><stop offset=".49" stop-color="#f1d99b"/><stop offset=".55" stop-color="#d6b673"/><stop offset="1" stop-color="#876d3f"/></linearGradient></defs>
        <g fill="none" stroke="url(#gold)"><path d="M864 275V116l38-38V47h38V27h205v248Z" stroke-width="3"/><path d="M873 268V119l37-37V55h38V35h189v233Z"/><path d="M936 268V129l107-83 84 83v139Z" stroke-width="2"/>
        ${Array.from({
      length: 9
    }, (e, t) => `<path d="m1043 220 ${-99 + t * 24} ${-80 - Math.abs(t - 4) * 12}" stroke-width="1.5"/>`).join("")}
        <path d="m978 268 65-48 65 48m-108 0 43-32 43 32m-64 0 21-16 21 16" stroke-width="2"/>
        <path d="M32 255h160V85l-80-52-80 52Zm8-7V89l72-47 72 47v159M50 98l62-44 62 44M62 118l50-43 50 43" opacity=".65"/></g>
        <path d="m1043 77 12 35-12 32-12-32Z" fill="#8caa91"/><path d="m112 128 13 36-13 35-13-35Z" fill="url(#gold)"/>`,
    blueprint: `<defs><pattern id="draft-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" stroke="#b5dbe1" stroke-width=".4" opacity=".18"/></pattern><marker id="arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m1 4 6-3v6Z" fill="#d1ece8"/></marker></defs>
        <rect width="1200" height="300" fill="url(#draft-grid)"/><g fill="none" stroke="#d1ece8"><path d="M927 94h178v143H927Z" stroke-width="2"/><path d="M940 107h63v48h-63Zm80 0h71v114h-71Zm-80 65h63v49h-63Z"/><circle cx="1055" cy="164" r="25" stroke-width="1.5"/>
        <path d="M1016 58v205m-105-97h217" stroke-dasharray="13 4 2 4" stroke-width=".7"/><path d="M928 67h177M1140 94v143" marker-start="url(#arrow)" marker-end="url(#arrow)" stroke-width=".7"/><path d="M927 57v28m178-28v28m18 9h29m-29 143h29M870 275h294v-24H870Z" stroke-width=".6"/>
        <circle cx="887" cy="133" r="13"/><path d="m900 133 27 10M68 102h122v108H68Zm0 0 29-23h122v108l-29 23m0-108 29-23m-29 23v108m-122-17 29-24h122m-122-90v108" stroke-width="1.2"/></g>
        <g fill="#d1ece8" font-family="Consolas,monospace" font-size="10"><text x="985" y="59">178.00</text><text x="881" y="137">01</text><text x="881" y="268">PLAN A / SCALE 1:1</text><text x="68" y="242">ISOMETRIC VIEW</text></g>`,
    "stained-glass": `<defs><linearGradient id="glass-blue" x2=".8" y2="1"><stop stop-color="#3a6095"/><stop offset=".46" stop-color="#87b6c3"/><stop offset=".6" stop-color="#567a9e"/><stop offset="1" stop-color="#304b78"/></linearGradient><linearGradient id="glass-red" x2=".5" y2="1"><stop stop-color="#7d3b55"/><stop offset=".45" stop-color="#d28083"/><stop offset="1" stop-color="#913e5f"/></linearGradient><linearGradient id="glass-gold" x2=".8" y2="1"><stop stop-color="#ae8749"/><stop offset=".4" stop-color="#f2d49b"/><stop offset="1" stop-color="#b99156"/></linearGradient></defs>
        <g transform="translate(935 27)" stroke="#141e2b" stroke-width="4" stroke-linejoin="round"><path d="M0 242V97a97 97 0 0 1 194 0v145Z" fill="url(#glass-blue)"/><path d="M97 0v242M0 99h194M0 171h194" fill="none"/>
        <path d="m97 21 32 76-32 66-32-66Z" fill="url(#glass-gold)"/><path d="M65 97Q2 79 20 52q48-1 45 45Zm64 0q63-18 45-45-48-1-45 45Z" fill="url(#glass-red)"/>
        <path d="M97 163q-69-76-76-26 16 57 76 26Zm0 0q69-76 76-26-16 57-76 26Z" fill="url(#glass-red)"/><path d="m97 163-51 79H148Z" fill="url(#glass-gold)"/>
        <path d="m0 99 21 38M194 99l-21 38M0 242l46-71m148 71-46-71" fill="none"/></g>
        <path d="M927 274V123a105 105 0 0 1 210 0v151" fill="none" stroke="#697088" stroke-width="4"/><path d="m88 76 55-31 55 31v150l-55 30-55-30Z" fill="url(#glass-blue)" stroke="#101824" stroke-width="5" opacity=".55"/><path d="m88 76 110 150m0-150L88 226m55-181v211" stroke="#141e2b" stroke-width="5"/>`,
    "ascii-crt": `<g font-family="Consolas,monospace" font-size="15" fill="#edbb63" xml:space="preserve"><text x="866" y="64">+-----------------------------+</text><text x="866" y="87">|       .: ARCHIVE :.          |</text><text x="866" y="110">|      .#####.                |</text><text x="866" y="133">|    .##++=++##.   [ SAVE ]    |</text><text x="866" y="156">|    ##+.....+##   [ IDEA ]    |</text><text x="866" y="179">|     '##+++##'               |</text><text x="866" y="202">|       '###'     &gt;&gt; READY_   |</text><text x="866" y="225">+-----------------------------+</text><text x="866" y="252" opacity=".5">... .::. ... .::. ... .::.</text>
        <text x="42" y="104" opacity=".55">[ 01 ]</text><text x="42" y="129" opacity=".45">|#.......|</text><text x="42" y="154" opacity=".6">|####....|</text><text x="42" y="179" opacity=".8">|#######.|</text><text x="42" y="218" opacity=".6">&gt; create_</text></g>`,
    "pixel-rpg": `<g shape-rendering="crispEdges"><path d="M888 224h24v-24h40v-24h72v24h72v24h56v40H888Z" fill="#577c81"/><path d="M888 232h24v-24h40v-24h72v24h72v24h56v40H888Z" fill="#354960"/>
        <path d="M944 260v-40h48v-24h56v24h32v40Z" fill="#29324f"/><path d="M992 204h56v8h-56Zm-32 24h40v8h-40Zm72 16h32v8h-32Z" fill="#728baa"/>
        <path d="M1008 76h32v16h16v56h-16v24h-32v-24h-16V92h16Z" fill="#88c1c5"/><path d="M1008 92h16v64h-16v-16h-8v-32h8Z" fill="#d7e7c2"/><path d="M1024 92h16v56h-16Z" fill="#508d9a"/>
        <path d="M912 108h8v-8h8v8h8v8h-8v8h-8v-8h-8Zm184 59h8v-8h8v8h8v8h-8v8h-8v-8h-8Z" fill="#ecd58d"/>
        <path d="M68 220h152v16H68Zm24-16h24v-24H92Zm96-32h24v-24h-24Z" fill="#577c81"/><path d="M140 180v-72h40v72Z" fill="#d6c17f"/><path d="M132 116h8v56h-8Zm48 0h8v56h-8Zm-32-16h24v8h-24Zm0 80h24v8h-24Z" fill="#a78461"/><path d="M156 116h8v40h-8Z" fill="#f6e3a4"/>
        ${Array.from({
      length: 14
    }, (e, t) => `<rect x="${884 + t * 20}" y="${280 + t % 2 * 4}" width="4" height="4" fill="#728baa"/>`).join("")}</g>`,
    "paper-lantern": `<defs><filter id="layer" x="-15%" y="-15%" width="130%" height="135%"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#071923" flood-opacity=".65"/></filter><radialGradient id="lamp"><stop stop-color="#fff1b3"/><stop offset=".35" stop-color="#e9c990"/><stop offset="1" stop-color="#648e91"/></radialGradient></defs>
        <g transform="translate(872 18)"><rect width="290" height="264" rx="9" fill="#142932"/><rect x="10" y="10" width="270" height="244" rx="6" fill="url(#lamp)"/>
        <g filter="url(#layer)"><path d="M10 188Q65 106 127 180T280 137v117H10Z" fill="#739d99"/><path d="M10 210Q72 155 119 204t161-33v83H10Z" fill="#557e80"/><path d="M10 225q76-62 139-13t131-2v44H10Z" fill="#3e656e"/></g>
        <circle cx="192" cy="78" r="27" fill="#ffe9aa"/><g filter="url(#layer)"><path fill-rule="evenodd" d="M10 10H280V254H10ZM30 32q47-3 59 14-32 65-37 165 96 28 198-3l-5-166q-28 15-49-10Z" fill="#2e515e"/>
        <path d="M10 10h29v244H10Zm249 0h21v244h-21M10 244q90-33 153-1t117-19v30H10Z" fill="#203e4c"/><path d="M48 216 73 133 63 210m167 2 14-107 9 122" fill="#173441"/></g>
        <path d="M74 232v-23l15-14 15 14v23Z" fill="#182e38"/><path d="M84 217h9v12h-9Z" fill="#efcf92"/><path d="M11 254V11h269" fill="none" stroke="#c4b990" stroke-opacity=".4"/></g>
        <g fill="#315766"><path d="M31 266 88 117l56 149Zm66 0 66-211 67 211Z"/><path d="M91 266 131 171l46 95Z" fill="#426977"/></g>`,
    "silkscreen-poster": `<g><path d="M869 30h289v243H869Z" fill="#e3b475"/><path d="M869 89h289v59H869Z" fill="#cf8c57"/><circle cx="1087" cy="88" r="34" fill="#f5dd9a"/>
        <path d="m869 191 53-67 36 42 49-71 65 89 41-35 45 38v86H869Z" fill="#718e7f"/><path d="m868 221 70-60 45 60 47-31 72 43 57-17v58H868Z" fill="#3e7067"/><path d="m873 259 86-53 51 47 62-25 81 29v20H873Z" fill="#284b4b"/>
        <path d="m988 274 41-35-17-25 24-27-13 29 19 25-26 33Z" fill="#f1e4c9"/><path d="M870 31h289v243h-4V35H870Z" fill="#f1e4c9"/><path d="M881 40h265v225H881Z" fill="none" stroke="#f1e4c9" stroke-width="2"/>
        <path d="M54 174 120 86l77 98v61H54Z" fill="#718e7f"/><path d="m42 230 66-66 28 37 42-28 44 71H42Z" fill="#284b4b"/><circle cx="183" cy="76" r="20" fill="#b44d32"/></g>`,
    engraving: `<defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><path d="M0 0 1 6 2 0Z" fill="#30271b"/></pattern></defs>
        <g fill="none" stroke="#30271b"><path d="M853 24h309v254H853Zm5 5h299v244H858" stroke-width=".8"/><path d="M1028 243q-35-44-31-90t50-90M999 188q-33-5-59-42m56 22q35 0 71-43" stroke-width="1.2"/>
        <path d="M996 169q-73-1-66-48 55-8 66 48Zm8-46q-22-71 26-86 35 43-26 86Zm1 39q28-68 78-52-4 45-78 52Z" stroke-width="1"/></g>
        <g fill="#30271b">${Array.from({
      length: 12
    }, (e, t) => `<path d="M${997 - t * 3} ${166 - t * 2}Q${943 - t} ${136 - t} ${935 + t * 3} ${123 + t}Q${953 - t} ${142 - t} ${997 - t * 3} ${166 - t * 2}Z"/><path d="M${1009 + t * 4} ${158 - t * 2}Q${1069 - t} ${135 - t} ${1077 - t * 3} ${114 + t}Q${1067 - t} ${132 - t} ${1009 + t * 4} ${158 - t * 2}Z"/><path d="M${1006 + t} ${115 - t * 5}Q${1044 - t} ${80 - t * 2} ${1027 - t} ${42 + t * 3}Q${1038 - t} ${80 - t * 2} ${1006 + t} ${115 - t * 5}Z"/>`).join("")}</g>
        <g fill="none" stroke="#30271b" stroke-width=".7"><path d="m941 119-33-31h-18m149-42 39-8h18m-44 98 39 58h18"/><circle cx="880" cy="88" r="10"/><circle cx="1116" cy="38" r="10"/><circle cx="1120" cy="194" r="10"/>
        <path d="M66 214q6-113 114-139-12 117-114 139Zm0 0 96-114M85 187l-3-47m20 27 48-8m-30-18-2-37"/></g>
        <path d="M70 209q9-86 62-117-12 75-62 117Z" fill="url(#hatch)" opacity=".6"/><g fill="#30271b" font-family="Georgia,serif" font-size="10"><text x="877" y="92">1</text><text x="1113" y="42">2</text><text x="1117" y="198">3</text><text x="886" y="261" letter-spacing="3">STUDIES IN GROWTH</text></g>`
  },
  ohn = new Map();

function gzt(e) {
  let t = ohn.get(e);
  return t || (t = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="300" viewBox="0 0 1200 300">${QOi[e]}</svg>`)}`, ohn.set(e, t)), t;
}

function Fpr(e) {
  return {
    "--creator-bg": e.bg,
    "--creator-panel": e.panel,
    "--creator-text": e.text,
    "--creator-muted": e.muted,
    "--creator-line": e.line,
    "--creator-accent": e.accent,
    "--creator-soft": e.soft,
    "--creator-images": e.images,
    "--creator-videos": e.videos,
    "--creator-tokens": e.tokens,
    "--creator-font": e.font,
    "--creator-radius": `${e.radius ?? 15}px`,
    "--creator-frame-ink": e.tone === "dark" ? e.bg : e.text,
    "--creator-art": `url("${gzt(e.id)}")`,
    colorScheme: e.tone
  };
}

const WMe = {
    works: "创作",
    images: "图片",
    videos: "视频",
    tokens: "Token"
  },
  zpr = {
    works: "创作活动",
    images: "图片活动",
    videos: "视频活动",
    tokens: "Token 活动"
  },
  iR = new Map();

function Bst(e) {
  const t = iR.get(e);
  if (t) return iR.delete(e), iR.set(e, t), t;
  const n = new Image();
  n.src = e;
  const r = n.decode().then(() => n).catch(a => {
    throw iR.get(e) === r && iR.delete(e), a;
  });
  return iR.set(e, r), iR.size > 8 && iR.delete(iR.keys().next().value), r;
}

async function YOi(e, t, n, r, a = "original") {
  const i = fzt(a),
    o = i.id !== "original",
    [s, l, d] = await Promise.all([Bst(tEt), e.avatar ? Bst(e.avatar) : Promise.resolve(null), o ? Bst(gzt(i.id)) : Promise.resolve(null)]),
    u = ew(),
    h = new Intl.NumberFormat(u),
    p = new Intl.NumberFormat(u, {
      notation: "compact",
      maximumFractionDigits: 1
    }),
    m = j => j >= 1e4 ? p.format(j) : h.format(j),
    f = new Intl.DateTimeFormat(u, {
      year: "numeric",
      month: "short"
    }),
    y = new Intl.DateTimeFormat(u, {
      year: "numeric",
      month: "short",
      day: "numeric"
    }),
    b = u === "ja-JP" ? '"Yu Gothic", Meiryo, system-ui, sans-serif' : u === "ko-KR" ? '"Malgun Gothic", system-ui, sans-serif' : '"Microsoft YaHei", system-ui, sans-serif',
    v = o ? i.font : b;
  await document.fonts.ready;
  const _ = e === w_e ? x("创作者") : e.name,
    w = e === w_e || !e.bio ? x("把灵感，变成看得见的作品。") : e.bio,
    k = x(zpr[n]),
    A = document.createElement("canvas");
  A.width = 2400, A.height = 1440;
  const S = A.getContext("2d");
  if (!S) throw new Error("分享图生成失败");
  S.scale(2, 2);
  const C = (j, B, F, N = 18, G = i.muted, z = 400) => {
      S.fillStyle = G, S.font = `${z} ${N}px ${z >= 600 ? v : b}`, S.fillText(j, B, F);
    },
    I = (j, B, F) => {
      if (S.font = `600 ${F}px ${v}`, S.measureText(j).width <= B) return j;
      const N = Array.from(j);
      for (; N.length && S.measureText(N.join("") + "…").width > B;) N.pop();
      return N.join("") + "…";
    },
    E = (j, B, F, N, G, z) => {
      S.fillStyle = z, S.beginPath(), S.roundRect(j, B, F, N, G), S.fill();
    };
  if (S.fillStyle = i.bg, S.fillRect(0, 0, 1200, 720), o) {
    const j = ["manga", "minimal", "ink", "ukiyoe", "papercut-red", "risograph", "art-deco", "blueprint", "pixel-rpg", "silkscreen-poster", "engraving"].includes(i.id),
      B = i.radius ?? (j ? 2 : ["cyber", "paper-lantern", "stained-glass", "watercolor"].includes(i.id) ? 8 : 20);
    (i.id === "manga" || i.id === "cartoon") && E(41, 159, 1128, 449, B, i.id === "manga" ? i.text : i.line), i.id === "risograph" && E(37, 156, 1136, 447, B, "#ee7972"), (i.id === "pixel-rpg" || i.id === "paper-lantern") && E(36, 157, 1136, 447, B, i.id === "pixel-rpg" ? "#101427" : "#0e242e");
    const F = i.tone === "dark" ? i.bg : i.text;
    if (i.frame === "offset" && E(38, 157, 1136, 447, B, F), E(32, 151, 1136, 447, B, i.panel), S.strokeStyle = i.frame === "offset" ? F : i.line, S.lineWidth = i.id === "manga" || i.id === "pixel-rpg" || i.frame === "offset" ? 3 : 1, S.beginPath(), S.roundRect(32, 151, 1136, 447, B), S.stroke(), i.frame === "double" || ["art-deco", "engraving", "papercut-red", "pixel-rpg"].includes(i.id)) {
      if (S.strokeStyle = i.id === "papercut-red" ? i.accent : i.line, S.lineWidth = 1, i.id === "art-deco") {
        const N = S.createLinearGradient(32, 151, 1168, 598);
        N.addColorStop(0, "#796039"), N.addColorStop(.45, "#efd59a"), N.addColorStop(.55, "#b99555"), N.addColorStop(1, "#dfbd72"), S.strokeStyle = N;
      }
      S.strokeRect(37, 156, 1126, 437);
    }
    if (i.frame === "glass") {
      S.save(), S.beginPath(), S.roundRect(33, 152, 1134, 445, B), S.clip();
      const N = S.createLinearGradient(32, 151, 1168, 598);
      N.addColorStop(0, "#ffffff13"), N.addColorStop(.45, "#ffffff00"), N.addColorStop(1, "#ffffff06"), S.fillStyle = N, S.fillRect(32, 151, 1136, 447), S.restore();
    }
    if (i.frame === "ruled" && (S.fillStyle = i.text, S.fillRect(32, 151, 1136, 2)), i.id === "blueprint") {
      S.save(), S.globalAlpha = .12, S.strokeStyle = i.accent, S.lineWidth = .5, S.beginPath();
      for (let N = 12; N < 1200; N += 20) S.moveTo(N, 0), S.lineTo(N, 720);
      for (let N = 11; N < 720; N += 20) S.moveTo(0, N), S.lineTo(1200, N);
      S.stroke(), S.restore();
    }
    if (i.frame === "paper" || ["watercolor", "ukiyoe", "papercut-red", "risograph", "engraving", "ascii-crt"].includes(i.id)) {
      S.save(), S.globalAlpha = i.id === "ascii-crt" ? .04 : .035, S.fillStyle = i.text;
      for (let N = 2; N < 720; N += i.id === "ascii-crt" ? 4 : 7) S.fillRect(0, N, 1200, .5);
      S.restore();
    }
    d && (S.imageSmoothingEnabled = i.id !== "pixel-rpg", S.drawImage(d, 800, 0, 400, 300, 982, 30, 166, 124.5), S.imageSmoothingEnabled = !0), C(i.edition, 52, 27, 11, i.accent, 600), ["cyber", "music", "risograph", "stained-glass", "silkscreen-poster"].includes(i.id) && (S.fillStyle = i.accent, S.fillRect(32, 151, 80, 3)), i.id === "silkscreen-poster" && E(33, 489, 1134, 108, 0, i.text), i.id === "ink" && (E(834, 62, 28, 34, 1, "#b02e22"), C("印", 838, 86, 20, i.bg, 600));
  }
  const M = i.id === "pixel-rpg" ? 3 : 43;
  E(52, 48, 86, 86, M, i.soft), l ? (S.save(), S.beginPath(), S.roundRect(52, 48, 86, 86, M), S.clip(), S.drawImage(l, 52, 48, 86, 86), S.restore()) : (S.textAlign = "center", C(Array.from(_)[0] || "A", 95, 106, 36, i.accent, 600), S.textAlign = "left"), C(I(_, o ? 660 : 620, 30), 156, 84, 30, i.text, 600), C(I(w.replace(/\s+/g, " "), 660, 17), 156, 116, 17), S.textAlign = "right", o || C(x("本地创作记录"), 1148, 83, 14, i.muted), C(y.format(new Date(`${t.today}T12:00:00`)), 1148, o ? 27 : 110, o ? 12 : 16), S.textAlign = "left", C(x("我的灵感足迹"), 52, 190, 21, i.text, 600), C(`${x(r)} · ${k}`, 52, 220, 16), S.textAlign = "right", C(x("{0} 天留下了灵感", h.format(t.activeDays)), 1148, 190, 17), S.textAlign = "left";
  const T = Math.max(1, ...t.heatmap.map(j => aBe(j, n))),
    P = Bpr(i, n);
  return t.heatmap.forEach((j, B) => {
    if (j.date > t.today) return;
    const F = aBe(j, n),
      N = lgt(F, T);
    E(52 + Math.floor(B / 7) * 20.75, 253 + B % 7 * 25, 16.75, 19, i.id === "cartoon" ? 7 : i.radius === 0 || ["manga", "cyber", "minimal", "ink", "ukiyoe", "papercut-red", "risograph", "art-deco", "blueprint", "ascii-crt", "pixel-rpg", "silkscreen-poster", "engraving"].includes(i.id) ? 1 : 4, P[N]);
  }), C(f.format(new Date(`${t.heatmap[0].date}T12:00:00`)), 52, 456, 14), S.textAlign = "right", C(f.format(new Date(`${t.today}T12:00:00`)), 1148, 456, 14), S.textAlign = "left", [[m(t.total.images), x("生成的图片")], [m(t.total.videos), x("生成的视频")], [t.total.reported ? m(t.total.input + t.total.output) : "—", x("已记录 Token")], [x("{0} 天", h.format(t.current)), x("当前连续创作")], [x("{0} 天", h.format(t.longest)), x("最长连续创作")]].forEach(([j, B], F) => {
    const N = 52 + F * 222;
    F && (S.fillStyle = i.line, S.fillRect(N - 22, 507, 1, 69)), C(j, N, 538, 31, i.id === "silkscreen-poster" ? i.bg : i.text, 600), C(B, N, 574, 16, i.id === "silkscreen-poster" ? i.bg : i.muted);
  }), S.fillStyle = i.line, S.fillRect(52, 617, 1096, 1), C(x("每一格，都是灵感留下的回声。"), 52, 657, 17, o ? i.accent : "#c5a999"), C(x("Token 仅含已回报用量"), 52, 684, 12, i.muted), S.drawImage(s, 1020, 640, 26, 26), C("AIYOUPLUS", 1057, 661, 24, i.text, 600), new Promise((j, B) => A.toBlob(F => F ? j(F) : B(new Error("分享图生成失败")), "image/png"));
}

function p$e(e, t, n = "") {
  g.useEffect(() => {
    const r = e.current;
    if (!r) return;
    const a = t === "x" ? "scrollLeft" : "scrollTop",
      i = () => t === "x" ? r.clientWidth : r.clientHeight,
      o = () => Math.max(0, (t === "x" ? r.scrollWidth : r.scrollHeight) - i());
    let s = 0,
      l = 0,
      d = 0;
    const u = () => {
        cancelAnimationFrame(s), s = 0;
      },
      h = m => {
        l = Math.max(0, Math.min(l, o()));
        const f = l - r[a],
          y = d ? Math.min(32, m - d) : 16;
        if (d = m, Math.abs(f) <= 1) {
          r[a] = l, s = 0;
          return;
        }
        r[a] += Math.sign(f) * Math.max(1, Math.abs(f) * (1 - Math.exp(-y / 45))), s = requestAnimationFrame(h);
      },
      p = m => {
        if (m.defaultPrevented || m.ctrlKey || m.shiftKey || Math.abs(m.deltaX) >= Math.abs(m.deltaY)) {
          u();
          return;
        }
        if (!o()) return;
        if (t === "y") {
          for (let y = m.target instanceof Element ? m.target : null; y && y !== r; y = y.parentElement) if (y.scrollHeight > y.clientHeight && /auto|scroll/.test(getComputedStyle(y).overflowY)) {
            u();
            return;
          }
        }
        const f = m.deltaY * (m.deltaMode === 1 ? 16 : m.deltaMode === 2 ? i() : 1);
        if (t === "y" && (f < 0 && r[a] <= 0 || f > 0 && r[a] >= o())) {
          u();
          return;
        }
        if (Math.abs(f) < 40 || matchMedia("(prefers-reduced-motion: reduce)").matches) {
          u(), t === "x" && (m.preventDefault(), m.stopPropagation(), r[a] += f);
          return;
        }
        m.preventDefault(), m.stopPropagation(), l = Math.max(0, Math.min(o(), (s ? l : r[a]) + f)), s || (d = 0, s = requestAnimationFrame(h));
      };
    return r.addEventListener("wheel", p, {
      passive: !1
    }), r.addEventListener("pointerdown", u), r.addEventListener("keydown", u), () => {
      u(), r.removeEventListener("wheel", p), r.removeEventListener("pointerdown", u), r.removeEventListener("keydown", u);
    };
  }, [e, t, n]);
}

const zje = {
    1: "今天",
    30: "最近 30 天",
    90: "最近 90 天",
    365: "最近一年",
    all: "全部时间"
  },
  XOi = Object.entries(zje).map(([e, t]) => ({
    value: e,
    label: t
  })),
  JOi = g.memo(function ({
    theme: t,
    selected: n,
    compact: r,
    onChange: a
  }) {
    return on(), c.jsxs("button", {
      type: "button",
      className: "creator-theme-choice",
      "data-theme": t.id,
      title: x(t.name),
      "aria-label": x(t.name),
      "aria-pressed": n,
      onClick: () => a(t.id),
      children: [c.jsxs("span", {
        className: "creator-theme-swatch",
        style: Fpr(t),
        "aria-hidden": "true",
        children: [c.jsx("img", {
          className: "creator-theme-artwork",
          src: gzt(t.id),
          alt: "",
          loading: "lazy",
          decoding: "async"
        }), c.jsx("span", {
          className: "creator-theme-mini-avatar",
          children: "A"
        }), c.jsx("span", {
          className: "creator-theme-mini-title",
          children: "AIYOUPLUS"
        }), c.jsx("span", {
          className: "creator-theme-mini-bars",
          children: [36, 58, 42, 78, 52, 94, 70, 100, 60, 84, 68, 90].map((i, o) => c.jsx("i", {
            style: {
              height: `${i}%`
            }
          }, o))
        }), n && c.jsx("span", {
          className: "creator-theme-check",
          children: c.jsx(io, {
            size: 12
          })
        })]
      }), c.jsx("span", {
        className: "creator-theme-name",
        children: x(t.name)
      }), !r && c.jsx("small", {
        children: x(t.description)
      })]
    });
  }),
  shn = g.memo(function ({
    value: t,
    onChange: n,
    compact: r = !1
  }) {
    on();
    const a = g.useRef(null),
      [i, o] = g.useState(""),
      s = i.trim().toLocaleLowerCase(),
      l = cAe.filter(d => [d.name, x(d.name), d.description, x(d.description), d.id, d.sourceStyle || ""].join(" ").toLocaleLowerCase().includes(s));
    return p$e(a, r ? "x" : "y", `${t}:${i}`), g.useEffect(() => {
      const d = a.current,
        u = d == null ? void 0 : d.querySelector('[aria-pressed="true"]');
      if (!d || !u) return;
      const h = d.getBoundingClientRect(),
        p = u.getBoundingClientRect();
      r ? d.scrollLeft += p.left < h.left ? p.left - h.left - 3 : Math.max(0, p.right - h.right + 3) : d.scrollTop += p.top < h.top ? p.top - h.top - 3 : Math.max(0, p.bottom - h.bottom + 3);
    }, [t, r, i]), c.jsxs("div", {
      className: "creator-theme-browser",
      children: [c.jsxs("div", {
        className: "creator-theme-search",
        children: [c.jsx(mc, {
          size: 14,
          "aria-hidden": "true"
        }), c.jsx("input", {
          type: "search",
          value: i,
          onChange: d => o(d.target.value),
          "aria-label": x("搜索主题"),
          placeholder: x("搜索主题，如：油画、玻璃、HD-2D")
        }), c.jsxs("span", {
          "aria-live": "polite",
          children: [l.length, " / ", cAe.length]
        })]
      }), c.jsxs("div", {
        ref: a,
        className: `creator-theme-grid${r ? " is-compact" : ""}`,
        role: "group",
        "aria-label": x(r ? "分享卡主题" : "档案主题"),
        children: [l.map(d => c.jsx(JOi, {
          theme: d,
          selected: t === d.id,
          compact: r,
          onChange: n
        }, d.id)), !l.length && c.jsx("p", {
          className: "creator-theme-empty",
          role: "status",
          children: x("没有找到匹配的主题")
        })]
      })]
    });
  });

function yAt({
  title: e,
  onClose: t,
  children: n,
  wide: r = !1,
  tone: a
}) {
  const i = g.useRef(null);
  p$e(i, "y");
  const o = g.useRef(t);
  return o.current = t, g.useEffect(() => {
    var d, u;
    const s = document.activeElement;
    (u = (d = i.current) == null ? void 0 : d.querySelector("button, input")) == null || u.focus();
    const l = h => {
      var p;
      if (h.key === "Escape" && (h.preventDefault(), h.stopImmediatePropagation(), o.current()), h.key === "Tab") {
        const m = Array.from(i.current.querySelectorAll('button:not(:disabled), input:not([type="file"]), textarea')),
          f = m[0],
          y = m[m.length - 1];
        (p = i.current) != null && p.contains(document.activeElement) ? h.shiftKey && document.activeElement === f ? (h.preventDefault(), y == null || y.focus()) : !h.shiftKey && document.activeElement === y && (h.preventDefault(), f == null || f.focus()) : (h.preventDefault(), f == null || f.focus());
      }
    };
    return window.addEventListener("keydown", l, !0), () => {
      window.removeEventListener("keydown", l, !0), s == null || s.focus({
        preventScroll: !0
      });
    };
  }, []), Da.createPortal(c.jsx("div", {
    className: "creator-overlay",
    "data-tone": a,
    onPointerDown: s => {
      s.target === s.currentTarget && t();
    },
    children: c.jsxs("div", {
      ref: i,
      className: `creator-dialog${r ? " is-wide" : ""}`,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": e,
      children: [c.jsxs("div", {
        className: "creator-dialog-title",
        children: [c.jsx("h2", {
          children: e
        }), c.jsx("button", {
          className: "creator-icon-button",
          "aria-label": x("关闭"),
          onClick: t,
          children: c.jsx(Na, {
            size: 19
          })
        })]
      }), n]
    })
  }), document.body);
}

function ZOi({
  profile: e,
  onClose: t,
  tone: n
}) {
  const [r, a] = g.useState(e),
    [i, o] = g.useState(!1),
    [s, l] = g.useState(""),
    d = g.useRef(null);
  return c.jsx(yAt, {
    title: x("编辑创作档案"),
    tone: n,
    onClose: t,
    children: c.jsxs("form", {
      onSubmit: async u => {
        u.preventDefault(), o(!0), l("");
        try {
          await kya(r), Vs(x("资料已保存在本地")), t();
        } catch (h) {
          l(String(h.message));
        } finally {
          o(!1);
        }
      },
      children: [c.jsxs("div", {
        className: "creator-avatar-editor",
        children: [c.jsx(jFe, {
          profile: r
        }), c.jsxs("div", {
          children: [c.jsxs("button", {
            className: "creator-button",
            type: "button",
            disabled: i,
            onClick: () => {
              var u;
              return (u = d.current) == null ? void 0 : u.click();
            },
            children: [c.jsx(Kh, {
              size: 15
            }), x("选择本地头像")]
          }), r.avatar && c.jsx("button", {
            type: "button",
            className: "creator-text-button",
            disabled: i,
            onClick: () => a({
              ...r,
              avatar: ""
            }),
            children: x("移除头像")
          }), c.jsx("p", {
            children: x("仅保存在此设备，不会上传")
          })]
        })]
      }), c.jsx("input", {
        ref: d,
        type: "file",
        hidden: !0,
        accept: "image/png,image/jpeg,image/webp,image/gif",
        onChange: async u => {
          var p;
          const h = (p = u.target.files) == null ? void 0 : p[0];
          if (u.target.value = "", !!h) {
            o(!0), l("");
            try {
              const m = await Aya(h);
              a(f => ({
                ...f,
                avatar: m
              }));
            } catch (m) {
              l(m.message);
            } finally {
              o(!1);
            }
          }
        }
      }), c.jsxs("label", {
        className: "creator-field",
        children: [x("昵称"), c.jsx("input", {
          autoComplete: "off",
          maxLength: 32,
          required: !0,
          value: r.name,
          onChange: u => a({
            ...r,
            name: u.target.value
          })
        })]
      }), c.jsxs("label", {
        className: "creator-field",
        children: [x("创作签名"), c.jsx("textarea", {
          rows: 2,
          maxLength: 100,
          value: r.bio,
          onChange: u => a({
            ...r,
            bio: u.target.value
          })
        }), c.jsxs("small", {
          children: [r.bio.length, "/100"]
        })]
      }), s && c.jsx("p", {
        className: "creator-error",
        role: "alert",
        children: s
      }), c.jsxs("div", {
        className: "creator-dialog-actions",
        children: [c.jsx("button", {
          className: "creator-button",
          type: "button",
          onClick: t,
          children: x("取消")
        }), c.jsx("button", {
          className: "creator-button is-primary",
          type: "submit",
          disabled: i || !r.name.trim(),
          children: x(i ? "保存中…" : "保存资料")
        })]
      })]
    })
  });
}

function eBi() {
  const e = on(),
    t = g.useRef(null),
    n = g.useRef(null);
  p$e(t, "y"), p$e(n, "x");
  const r = xWn(),
    {
      theme: a,
      background: i
    } = H7t(),
    [o, s] = g.useState(qOi),
    [l, d] = g.useState(!1),
    [u, h] = g.useState(""),
    [p, m] = g.useState(o),
    f = fzt(o),
    y = o === "original" ? a : f.tone,
    [b, v] = g.useState([]),
    [_, w] = g.useState(!0),
    [k, A] = g.useState(""),
    [S, C] = g.useState("1"),
    [I, E] = g.useState("works"),
    [M, T] = g.useState(() => wO(new Date())),
    [P, R] = g.useState(null),
    [j, B] = g.useState(""),
    [F, N] = g.useState(!1),
    [G, z] = g.useState(!1),
    [V, O] = g.useState(null),
    [L, D] = g.useState(""),
    [U, H] = g.useState(""),
    [Y, K] = g.useState(0),
    W = Bpr(f, I),
    Q = g.useCallback(re => {
      s(re), h("");
      try {
        localStorage.setItem(Opr, re);
      } catch {
        h(x("主题已应用，但未能保存到本地"));
      }
    }, []),
    q = g.useMemo(() => gYr(b, S, new Date(`${M}T12:00:00`)), [b, S, M]),
    ne = g.useMemo(() => new Map(), [r, q, I, S, e]),
    de = (V == null ? void 0 : V.themeId) === p && V.context === ne,
    le = g.useCallback(re => {
      const fe = ne.get(re);
      if (fe) return ne.delete(re), ne.set(re, fe), fe;
      const ye = YOi(r, q, I, zje[S], re).catch(ie => {
        throw ne.get(re) === ye && ne.delete(re), ie;
      });
      return ne.set(re, ye), ne.size > 6 && ne.delete(ne.keys().next().value), ye;
    }, [ne, r, q, I, S]),
    J = j || q.today,
    pe = q.days.get(J),
    ce = Math.max(1, ...q.heatmap.map(re => aBe(re, I))),
    we = q.total.images + q.total.videos,
    X = [...q.days.values()].sort((re, fe) => fe.input + fe.output - (re.input + re.output))[0];
  g.useEffect(() => {
    let re;
    const fe = () => {
      clearTimeout(re);
      const ye = new Date(),
        ie = new Date(ye);
      T(wO(ye)), ie.setHours(24, 0, 0, 0), re = setTimeout(fe, ie.getTime() - ye.getTime() + 100);
    };
    return fe(), window.addEventListener("focus", fe), document.addEventListener("visibilitychange", fe), () => {
      clearTimeout(re), window.removeEventListener("focus", fe), document.removeEventListener("visibilitychange", fe);
    };
  }, []), g.useEffect(() => {
    const re = new AbortController();
    let fe;
    const ye = async () => {
        const be = await yYr();
        re.signal.aborted || v(be);
      },
      ie = () => {
        clearTimeout(fe), fe = setTimeout(() => {
          ye().catch(() => A(x("统计读取失败，请重新打开创作档案")));
        }, 150);
      },
      ae = () => A(x("部分统计未能保存，请检查本地存储空间"));
    return window.addEventListener(cgt, ie), window.addEventListener(dgt, ae), (async () => {
      try {
        await ye();
        const be = await wPt("tracking");
        re.signal.aborted || K((be == null ? void 0 : be.at) || 0), await wYr(re.signal), await xYr(re.signal), await ye();
      } catch {
        re.signal.aborted || A(x("历史统计未读取完整，请重新打开此页重试"));
      } finally {
        re.signal.aborted || w(!1);
      }
    })(), () => {
      re.abort(), clearTimeout(fe), window.removeEventListener(cgt, ie), window.removeEventListener(dgt, ae);
    };
  }, []), g.useEffect(() => {
    if (_ || k || G || l || F) return;
    let re;
    const fe = () => {
        le(o).catch(() => {});
      },
      ye = setTimeout(() => {
        typeof requestIdleCallback == "function" ? re = requestIdleCallback(fe) : fe();
      }, 180);
    return () => {
      clearTimeout(ye), re !== void 0 && cancelIdleCallback(re);
    };
  }, [_, k, G, l, F, le, o]), g.useEffect(() => {
    if (!G) {
      O(null);
      return;
    }
    let re = !1,
      fe = "";
    return O(null), D(""), le(p).then(ye => {
      re || (fe = URL.createObjectURL(ye), O({
        blob: ye,
        url: fe,
        themeId: p,
        context: ne
      }));
    }).catch(() => {
      re || D(x("分享图生成失败，请关闭后重试"));
    }), () => {
      re = !0, fe && URL.revokeObjectURL(fe);
    };
  }, [G, le, ne, p]);
  const Z = async re => {
    if (!(!V || !de || U)) {
      H(re), D("");
      try {
        if (re === "copy") await o7t(V.blob, "image/png"), Vs(x("分享图已复制"));else {
          const fe = `Atelier-${x("创作档案")}-${q.today}-${Date.now()}.png`;
          if (us()) {
            const {
                saveToDisk: ye
              } = await Ie(async () => {
                const {
                  saveToDisk: ae
                } = await Promise.resolve().then(() => Sde);
                return {
                  saveToDisk: ae
                };
              }, void 0, import.meta.url),
              ie = await ye(V.blob, fe);
            Vs(`${x("已保存到")} ${ie}`);
          } else eVn(V.blob, fe), Vs(x("分享图已开始下载"));
        }
      } catch {
        D(x(re === "copy" ? "复制失败，请允许剪贴板权限，或使用“保存图片”" : "保存失败，请检查下载目录权限后重试"));
      } finally {
        H("");
      }
    }
  };
  return c.jsxs("section", {
    ref: t,
    className: "studio-page creator-page",
    "data-tone": y,
    "data-creator-theme": o,
    "data-creator-frame": f.frame,
    style: o === "original" ? {
      "--creator-bg": i
    } : Fpr(f),
    children: [c.jsxs("header", {
      className: "creator-page-toolbar",
      children: [c.jsxs("span", {
        children: [x("创作档案"), c.jsxs("small", {
          children: [c.jsx(yWt, {
            size: 12
          }), x("仅本地")]
        })]
      }), c.jsxs("div", {
        children: [c.jsxs("button", {
          className: "creator-button creator-theme-trigger",
          "aria-label": x("更换档案主题"),
          onClick: () => d(!0),
          children: [c.jsx(tw, {
            size: 14
          }), c.jsxs("span", {
            children: [x("主题"), " · ", x(f.name)]
          })]
        }), c.jsxs("button", {
          className: "creator-button",
          onClick: () => N(!0),
          children: [c.jsx(nw, {
            size: 14
          }), x("编辑资料")]
        }), c.jsxs("button", {
          className: "creator-button is-primary",
          disabled: _ || !!k,
          onClick: () => {
            m(o), z(!0);
          },
          children: [c.jsx(ATn, {
            size: 14
          }), x("分享档案")]
        })]
      })]
    }), c.jsxs("div", {
      className: "creator-content",
      children: [c.jsxs("div", {
        className: "creator-hero",
        children: [o !== "original" && c.jsx("span", {
          className: "creator-edition",
          children: f.edition
        }), c.jsxs("button", {
          className: "creator-hero-avatar",
          title: x("修改本地头像"),
          "aria-label": x("修改本地头像"),
          onClick: () => N(!0),
          children: [c.jsx(jFe, {
            profile: r
          }), c.jsx("span", {
            children: c.jsx(Kh, {
              size: 16
            })
          })]
        }), c.jsx("h1", {
          children: r.name
        }), c.jsx("p", {
          children: r.bio || x("把灵感，变成看得见的作品。")
        }), c.jsxs("span", {
          className: "creator-eyebrow",
          children: [c.jsx(ac, {
            size: 12
          }), x(we ? "每一次创作，都算数" : "灵感，从第一件作品开始")]
        })]
      }), c.jsxs("div", {
        className: "creator-section-heading",
        children: [c.jsx("h2", {
          children: x("我的创作里程")
        }), c.jsx(qs, {
          scopeId: "creator-profile",
          dropdownType: "range",
          ariaLabel: "统计时间范围",
          value: S,
          options: XOi,
          isDark: y === "dark",
          activeDropdown: P,
          setActiveDropdown: R,
          onSelect: re => {
            C(re), B("");
          },
          className: "creator-range",
          menuClassName: "creator-range-menu",
          minMenuWidth: 136,
          menuPlacement: "auto"
        })]
      }), c.jsx("div", {
        className: "creator-stats",
        "aria-busy": _,
        children: [{
          value: bee(q.total.images),
          label: "生成图片",
          unit: "张",
          icon: c.jsx(lo, {
            size: 16
          }),
          kind: "images"
        }, {
          value: bee(q.total.videos),
          label: "生成视频",
          unit: "支",
          icon: c.jsx(Oo, {
            size: 16
          }),
          kind: "videos"
        }, {
          value: q.total.reported ? bee(q.total.input + q.total.output) : "—",
          label: "已记录 Token",
          unit: "",
          icon: c.jsx(ac, {
            size: 16
          }),
          kind: "tokens"
        }, {
          value: String(q.current),
          label: "当前连续创作",
          unit: "天",
          icon: c.jsx(eTn, {
            size: 16
          }),
          kind: "works"
        }, {
          value: String(q.longest),
          label: "最长连续创作",
          unit: "天",
          icon: c.jsx(io, {
            size: 16
          }),
          kind: "works"
        }].map(re => c.jsxs("div", {
          className: "creator-stat",
          "data-kind": re.kind,
          children: [c.jsxs("span", {
            children: [re.icon, x(re.label)]
          }), c.jsxs("strong", {
            children: [_ && !b.length ? "…" : re.value, c.jsx("small", {
              children: x(re.unit)
            })]
          })]
        }, re.label))
      }), k && c.jsx("p", {
        className: "creator-error",
        role: "alert",
        children: k
      }), c.jsxs("section", {
        className: "creator-activity",
        children: [c.jsxs("div", {
          className: "creator-section-heading",
          children: [c.jsxs("div", {
            children: [c.jsxs("h2", {
              children: [x("灵感足迹"), c.jsxs("span", {
                children: [q.activeDays, " ", x("天留下了灵感")]
              })]
            }), c.jsx("p", {
              children: x("每一格，都是灵感留下的回声。")
            })]
          }), c.jsx("div", {
            className: "creator-metric-tabs",
            "aria-label": x("活动类型"),
            children: Object.keys(WMe).map(re => c.jsx("button", {
              "aria-pressed": I === re,
              onClick: () => E(re),
              children: x(WMe[re])
            }, re))
          })]
        }), c.jsxs("div", {
          ref: n,
          className: "creator-heatmap-scroll",
          children: [c.jsx("div", {
            className: "creator-heatmap",
            role: "group",
            "aria-label": x("过去一年的创作活动"),
            style: {
              "--creator-cell": W[4]
            },
            children: q.heatmap.map(re => {
              const fe = aBe(re, I),
                ye = re.date > q.today;
              return c.jsx("button", {
                disabled: ye,
                className: `creator-day${J === re.date ? " is-selected" : ""}`,
                "data-level": lgt(fe, ce),
                style: o === "original" ? void 0 : {
                  background: W[lgt(fe, ce)]
                },
                "data-date": re.date,
                "aria-pressed": J === re.date,
                "aria-label": `${re.date} · ${fe} ${x(WMe[I])}`,
                title: `${re.date} · ${fe.toLocaleString()} ${x(WMe[I])}`,
                onClick: () => B(re.date)
              }, re.date);
            })
          }), c.jsx("div", {
            className: "creator-months",
            children: q.heatmap.filter((re, fe) => fe % 7 === 0).map((re, fe, ye) => fe === 0 || re.date.slice(0, 7) !== ye[fe - 1].date.slice(0, 7) ? c.jsxs("span", {
              style: {
                gridColumn: `${fe + 1} / span ${Math.min(3, 53 - fe)}`
              },
              children: [Number(re.date.slice(5, 7)), x("月")]
            }, re.date) : null)
          })]
        }), c.jsxs("div", {
          className: "creator-activity-bottom",
          children: [c.jsx("span", {
            children: _ ? x("正在整理本地创作记录…") : we || q.total.reported ? `${x(zje[S])} · ${x("点击方格查看当天用量")}` : x("第一束灵感，等你点亮")
          }), c.jsxs("div", {
            className: "creator-legend",
            children: [x("少"), W.map((re, fe) => c.jsx("i", {
              "data-level": fe,
              style: {
                background: re
              }
            }, re)), x("多")]
          })]
        }), c.jsxs("div", {
          className: "creator-day-detail",
          "aria-live": "polite",
          children: [c.jsx("strong", {
            children: J
          }), c.jsxs("span", {
            children: [c.jsx("i", {
              className: "is-images"
            }), x("图片"), " ", c.jsx("b", {
              children: (pe == null ? void 0 : pe.images) || 0
            })]
          }), c.jsxs("span", {
            children: [c.jsx("i", {
              className: "is-videos"
            }), x("视频"), " ", c.jsx("b", {
              children: (pe == null ? void 0 : pe.videos) || 0
            })]
          }), c.jsxs("span", {
            children: [x("输入"), " ", c.jsx("b", {
              children: pe != null && pe.reported ? pe.input.toLocaleString() : "—"
            })]
          }), c.jsxs("span", {
            children: [x("输出"), " ", c.jsx("b", {
              children: pe != null && pe.reported ? pe.output.toLocaleString() : "—"
            }), " Token"]
          })]
        })]
      }), c.jsxs("div", {
        className: "creator-insights",
        children: [c.jsxs("section", {
          className: "creator-insight",
          children: [c.jsxs("div", {
            className: "creator-section-heading",
            children: [c.jsx("h2", {
              children: x("创作配方")
            }), c.jsx("span", {
              children: x("灵感的两种形状")
            })]
          }), c.jsx("strong", {
            className: "creator-insight-title",
            children: we ? q.total.images >= q.total.videos ? x("让想象，定格成画面") : x("让灵感，流动成故事") : x("下一件作品，由你定义")
          }), c.jsxs("div", {
            className: "creator-recipe-bar",
            children: [c.jsx("span", {
              style: {
                width: `${we ? q.total.images / we * 100 : 50}%`
              }
            }), c.jsx("span", {
              style: {
                flex: 1
              }
            })]
          }), c.jsxs("div", {
            className: "creator-recipe-labels",
            children: [c.jsxs("span", {
              children: [c.jsx("i", {
                className: "is-images"
              }), x("图片"), " ", we ? Math.round(q.total.images / we * 100) : 0, "%"]
            }), c.jsxs("span", {
              children: [c.jsx("i", {
                className: "is-videos"
              }), x("视频"), " ", we ? 100 - Math.round(q.total.images / we * 100) : 0, "%"]
            })]
          })]
        }), c.jsxs("section", {
          className: "creator-insight",
          children: [c.jsxs("div", {
            className: "creator-section-heading",
            children: [c.jsx("h2", {
              children: x("灵感消耗")
            }), c.jsx("span", {
              children: "Token"
            })]
          }), c.jsxs("div", {
            className: "creator-token-split",
            children: [c.jsxs("div", {
              children: [c.jsx("small", {
                children: x("输入 · 含缓存")
              }), c.jsx("strong", {
                children: q.total.reported ? bee(q.total.input) : "—"
              })]
            }), c.jsxs("div", {
              children: [c.jsx("small", {
                children: x("输出 · 含推理")
              }), c.jsx("strong", {
                children: q.total.reported ? bee(q.total.output) : "—"
              })]
            })]
          }), c.jsx("p", {
            children: X && X.input + X.output ? `${x("用量最高的一天")} · ${X.date} · ${bee(X.input + X.output)} Token` : x("模型回报用量后，会在这里留下记录")
          })]
        })]
      }), c.jsxs("details", {
        className: "creator-data-note",
        children: [c.jsx("summary", {
          children: x("统计说明")
        }), c.jsx("p", {
          children: x("图片与视频按成功生成的结果计数，批量结果按实际数量统计；同一任务刷新不重复计数。已记录的累计产出不会随素材删除减少。历史补录以此设备仍保留的记录为准。")
        }), c.jsxs("p", {
          children: [x("Token 仅统计模型实际回报的输入和输出，缓存与推理不会重复相加；未回报用量不作估算。"), Y ? ` ${x("记录开始于")} ${new Date(Y).toLocaleDateString()}` : "", "。", x("时间范围同时作用于数字、足迹与分享图；足迹展示最近 53 周，连续天数按所选范围内有产出或 Token 用量的本地日期计算。")]
        }), q.undated > 0 && c.jsxs("p", {
          children: [q.undated, " ", x("件旧作品缺少日期，仅计入全部时间的总量。")]
        })]
      })]
    }), F && c.jsx(ZOi, {
      profile: r,
      tone: a,
      onClose: () => N(!1)
    }), l && c.jsxs(yAt, {
      title: x("选择档案主题"),
      tone: a,
      wide: !0,
      onClose: () => d(!1),
      children: [c.jsxs("p", {
        className: "creator-theme-intro",
        children: [x("换一种风格，记录你的灵感。"), c.jsx("span", {
          children: x("{0} 套主题", cAe.length)
        })]
      }), c.jsx(shn, {
        value: o,
        onChange: Q
      }), c.jsxs("div", {
        className: "creator-theme-footer",
        children: [c.jsx("p", {
          role: "status",
          children: u || x("选择即保存，分享卡默认沿用此主题。")
        }), c.jsx("button", {
          className: "creator-button is-primary",
          onClick: () => d(!1),
          children: x("完成")
        })]
      })]
    }), G && c.jsxs(yAt, {
      title: x("分享我的创作档案"),
      tone: a,
      wide: !0,
      onClose: () => z(!1),
      children: [c.jsxs("div", {
        className: "creator-share-theme-label",
        children: [c.jsxs("span", {
          children: [c.jsx(tw, {
            size: 14
          }), x("分享卡主题")]
        }), c.jsx("small", {
          children: x("本次分享可单独选择")
        })]
      }), c.jsx(shn, {
        compact: !0,
        value: p,
        onChange: m
      }), c.jsxs("p", {
        className: "creator-share-caption",
        children: [x(zje[S]), " · ", x(zpr[I]), c.jsxs("span", {
          children: [c.jsx(yWt, {
            size: 12
          }), x("在本机生成图片")]
        })]
      }), c.jsx("div", {
        className: "creator-share-preview",
        "aria-busy": !de,
        "data-share-theme": p,
        children: V && de ? c.jsx("img", {
          src: V.url,
          alt: x("AIYOUPLUS 创作档案分享图")
        }) : c.jsx("span", {
          role: "status",
          children: L || x("正在生成分享图…")
        })
      }), c.jsx("p", {
        className: "creator-share-note",
        children: x("分享头像、昵称、签名与统计数字。提示词、作品文件和本地路径不会包含在图片中。")
      }), L && c.jsx("p", {
        className: "creator-error",
        role: "alert",
        children: L
      }), c.jsxs("div", {
        className: "creator-dialog-actions",
        children: [c.jsxs("button", {
          className: "creator-button",
          disabled: !de || !!U,
          onClick: () => void Z("copy"),
          children: [c.jsx(Cx, {
            size: 15
          }), x(U === "copy" ? "复制中…" : "复制图片")]
        }), c.jsxs("button", {
          className: "creator-button is-primary",
          disabled: !de || !!U,
          onClick: () => void Z("save"),
          children: [c.jsx(ws, {
            size: 15
          }), x(U === "save" ? "保存中…" : "保存图片")]
        })]
      })]
    })]
  });
}

const tBi = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: eBi
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Hfe = new Set();

function nBi(e) {
  const t = new Set(),
    n = e.settings || {};
  for (const a of ["_localCacheAssetId", "_contentAssetId", "_assetId", dg]) {
    const i = n[a];
    typeof i == "string" && i.trim() && t.add(i.trim());
  }
  const r = e._contentAssetId;
  return typeof r == "string" && r.trim() && t.add(r.trim()), t;
}

function rBi(e) {
  if (!(e != null && e.startsWith("blob:"))) return !1;
  try {
    return Ur.isManagedBlobUrl(e);
  } catch {
    return !1;
  }
}

function aBi(e, t, n, r) {
  return !(e != null && e.startsWith("blob:")) || iBi(e, n) || Cle(e) ? !1 : rBi(e) ? (NSn(e), !1) : (vm(e) && UHe(e), !0);
}

function iBi(e, t) {
  return t.has(e) || N$a(e);
}

function QJe(e) {
  const t = [],
    n = i => {
      const o = String(i || "").trim();
      o.startsWith("blob:") && t.push(o);
    },
    r = e.settings || {};
  n(e.content), n(r._blobUrl), n(r._canvasDisplayPreviewUrl), n(r._localOriginalUrlHint), n(r._localVideoPlaybackUrl), n(r._pendingRemoteResultUrl), n(r.videoPosterUrl), n(e.selectedPreviewImage);
  for (const i of ["previewMjImages", "mjImages", "batchImages"]) {
    const o = r[i];
    Array.isArray(o) && o.forEach(s => n(s));
  }
  const a = Array.isArray(r.generatedImages) ? r.generatedImages : [];
  for (const i of a) {
    const o = i || {};
    n(o.thumbUrl), n(o.fullUrl), n(o.url);
  }
  return Array.isArray(e.previewMjImages) && e.previewMjImages.forEach(n), e.selectedKeyframes && Array.isArray(e.selectedKeyframes) && e.selectedKeyframes.forEach(i => n(i == null ? void 0 : i.url)), e.frames && Array.isArray(e.frames) && e.frames.forEach(i => n(i == null ? void 0 : i.url)), e.shots && Array.isArray(e.shots) && e.shots.forEach(i => {
    n(i == null ? void 0 : i.image_url), n(i == null ? void 0 : i.video_url);
  }), t;
}

function YJe(e) {
  const t = new Set();
  return e.forEach(n => {
    QJe(n).forEach(r => t.add(r));
  }), t;
}

function oBi(e) {
  try {
    return URL.revokeObjectURL(e), !0;
  } catch {
    return !1;
  }
}

function JCe(e, t) {
  if (Hfe.has(e.id)) return;
  Hfe.add(e.id), Hfe.size > 4e3 && (Hfe.clear(), Hfe.add(e.id)), nBi(e);
  const n = r => {
    r != null && r.startsWith("blob:") && aBi(r, e, t) && oBi(r);
  };
  QJe(e).forEach(r => n(r));
}

function sBi(e) {
  try {
    QJe(e).forEach(t => x0(t));
  } catch {}
}

function lBi(e) {
  JCe(e, new Set());
}

function bAt(e) {
  const t = YJe([]);
  e.forEach(n => JCe(n, t));
}

function cBi(e, t) {
  const n = e.find(r => r.id === t);
  if (n) {
    const r = YJe(e.filter(a => a.id !== t));
    JCe(n, r);
  }
}

function dBi(e, t) {
  const n = YJe(t);
  e.forEach(r => JCe(r, n));
}

const yzt = Object.freeze(Object.defineProperty({
  __proto__: null,
  cleanupNode: lBi,
  cleanupNodeById: cBi,
  cleanupNodeSafe: JCe,
  cleanupNodes: bAt,
  cleanupNodesBatch: dBi,
  collectNodeBlobUrls: QJe,
  collectReferencedBlobUrls: YJe,
  releaseNodeTransientBlobUrls: sBi
}, Symbol.toStringTag, {
  value: "Module"
}));

function ZCe() {
  if (typeof window > "u") return null;
  const e = window;
  if (typeof e.gc == "function") return e.gc;
  const t = globalThis;
  return typeof t.gc == "function" ? t.gc : null;
}

function Uje() {
  return ZCe() !== null;
}

function FC(e) {
  return new Promise(t => setTimeout(t, e));
}

async function EO() {
  await FC(0), await new Promise(e => {
    typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => requestAnimationFrame(() => e())) : setTimeout(e, 16);
  });
}

async function lhn(e) {
  e != null && typeof e.then == "function" && (await e);
}

function pC() {
  try {
    const e = performance.memory;
    if (e != null && e.usedJSHeapSize) return e.usedJSHeapSize / (1024 * 1024);
  } catch {}
  return 0;
}

async function W1e(e = "major") {
  const t = ZCe();
  if (!t) return !1;
  try {
    return t(), !0;
  } catch {}
  try {
    return t(!1), !0;
  } catch {}
  const n = e === "last-resort" ? "last-resort" : void 0;
  try {
    return await lhn(t({
      type: "major-snapshot",
      execution: "async",
      ...(n ? {
        flavor: n
      } : {})
    })), !0;
  } catch {}
  try {
    return await lhn(t({
      type: "major",
      execution: "async",
      ...(n ? {
        flavor: n
      } : {})
    })), !0;
  } catch {}
  try {
    return t({
      type: "major",
      execution: "sync",
      ...(n ? {
        flavor: n
      } : {})
    }), !0;
  } catch {
    return !1;
  }
}

const Upr = 400;

async function uBi() {
  const e = pC(),
    t = ZCe();
  if (!t) return {
    available: !1,
    beforeMB: e,
    afterMB: e,
    effective: !1,
    highHeap: !1
  };
  try {
    t();
  } catch {}
  await FC(60), await EO();
  try {
    t(!1);
  } catch {}
  await FC(120);
  const n = pC(),
    r = e >= Upr,
    a = !r || n > 0 && e - n >= 1;
  return {
    available: !0,
    beforeMB: e,
    afterMB: n,
    effective: a,
    highHeap: r
  };
}

async function bzt(e = 5) {
  if (!ZCe()) return {
    available: !1,
    invoked: 0
  };
  const t = Math.max(1, e);
  let n = 0;
  for (let r = 0; r < t; r++) {
    await EO();
    const a = r >= t - 1 ? "last-resort" : "major";
    (await W1e(a)) && (n += 1), await FC(r === 0 ? 120 : 280);
  }
  return {
    available: !0,
    invoked: n
  };
}

function hBi(e) {
  return new Promise(t => {
    setTimeout(() => {
      (async () => {
        if (!(e != null && e.skipCdp)) try {
          if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)) {
            const {
              invoke: d
            } = await Ie(async () => {
              const {
                invoke: h
              } = await Promise.resolve().then(() => sd);
              return {
                invoke: h
              };
            }, void 0, import.meta.url);
            if (await Promise.race([d("force_devtools_gc").catch(() => !1), FC(2500).then(() => !1)])) {
              await FC(150), await EO();
              const h = pC();
              for (let m = 0; m < 3; m++) await EO(), await W1e(m === 2 ? "last-resort" : "major"), await FC(120);
              const p = pC();
              t({
                available: !0,
                invoked: 1,
                heapMBAfter: p
              });
              return;
            }
          }
        } catch {}
        if (!ZCe()) {
          let l = 0;
          pC();
          for (let u = 0; u < 4; u++) await EO(), await FC(u === 0 ? 120 : 220);
          let d = pC();
          for (let u = 0; u < 3; u++) await FC(100), await EO(), d = Math.min(d, pC());
          t({
            available: !1,
            invoked: l,
            heapMBAfter: d
          });
          return;
        }
        let n = 0,
          a = pC();
        const i = Math.min(12, Math.max(1, (e == null ? void 0 : e.maxRounds) ?? 12));
        for (let l = 0; l < i; l++) {
          await EO();
          const d = l >= i - 1 ? "last-resort" : "major";
          (await W1e(d)) && (n += 1), await FC(200 + l * 25);
          const u = pC();
          if (l >= 1 && u > 0 && a - u < 1) break;
          u > 0 && (a = u);
        }
        let o = pC();
        const s = Math.min(3, i);
        for (let l = 0; l < s; l++) await FC(120), await EO(), (await W1e(l === s - 1 ? "last-resort" : "major")) && (n += 1), o = Math.min(o, pC());
        t({
          available: !0,
          invoked: n,
          heapMBAfter: o
        });
      })();
    }, 50);
  });
}

const vzt = Object.freeze(Object.defineProperty({
    __proto__: null,
    GC_EFFECTIVE_CHECK_MIN_MB: Upr,
    forceDevToolsLikeGc: hBi,
    forceMajorGcOnce: W1e,
    forceMajorGcPasses: bzt,
    isManualGcAvailable: Uje,
    probeGcEffectiveness: uBi
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  chn = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function pBi() {
  if (typeof window > "u") return null;
  const e = window.__getVisibleNodeIds;
  if (!e) return null;
  try {
    const t = e();
    return t instanceof Set ? t : null;
  } catch {
    return null;
  }
}

function XJe() {
  if (typeof document > "u") return {
    images: 0,
    videos: 0
  };
  const e = pBi();
  if (!e || e.size === 0) return {
    images: 0,
    videos: 0
  };
  let t = 0,
    n = 0;
  return document.querySelectorAll(".node-wrapper[data-node-id]").forEach(r => {
    const a = r.getAttribute("data-node-id");
    !a || e.has(a) || (r.querySelectorAll("img").forEach(i => {
      const o = i.src || i.currentSrc || "";
      !o || o === chn || o.startsWith("data:image/gif") || (i.src = chn, i.removeAttribute("srcset"), t += 1);
    }), r.querySelectorAll("video").forEach(i => {
      if (!(!i.src && !i.currentSrc)) try {
        i.pause(), i.removeAttribute("src"), i.load(), n += 1;
      } catch {}
    }));
  }), {
    images: t,
    videos: n
  };
}

async function $je(e = {}) {
  const t = Math.min(1, Math.max(.1, e.keepRatio ?? .5)),
    n = e.releaseComponentState ?? !1,
    r = e.releaseOffscreenMedia ?? !0,
    a = ftr(),
    i = gtr(t) + a;
  Er.trimMemoryCache(t), await Wd.trimMemoryCache(t), n && TXe();
  let o = 0,
    s = 0;
  if (r) {
    const l = XJe();
    o = l.images, s = l.videos;
  }
  return {
    lazyCacheItemsRemoved: i,
    offscreenImagesReleased: o,
    offscreenVideosReleased: s
  };
}

async function $pr(e = {}) {
  var t;
  await Wd.clearMemoryCache(), Er.clearMemoryCache(), Cde(), TXe({
    deferRestore: e.deferLazyRestore === !0
  }), XJe();
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
    (t = n.clearBlobUrlCache) == null || t.call(n);
  } catch {}
  try {
    const {
      clearBlobSerializationCache: n
    } = await Ie(async () => {
      const {
        clearBlobSerializationCache: r
      } = await Promise.resolve().then(() => Tle);
      return {
        clearBlobSerializationCache: r
      };
    }, void 0, import.meta.url);
    n();
  } catch {}
  try {
    const {
      clearDisplayDecodeCache: n
    } = await Ie(async () => {
      const {
        clearDisplayDecodeCache: r
      } = await Promise.resolve().then(() => V8r);
      return {
        clearDisplayDecodeCache: r
      };
    }, void 0, import.meta.url);
    n();
  } catch {}
  try {
    const {
      clearRustCache: n
    } = await Ie(async () => {
      const {
        clearRustCache: r
      } = await Promise.resolve().then(() => Sbt);
      return {
        clearRustCache: r
      };
    }, void 0, import.meta.url);
    await n();
  } catch {}
  try {
    const {
      memoryPoolManager: n
    } = await Ie(async () => {
      const {
        memoryPoolManager: r
      } = await Promise.resolve().then(() => Vfr);
      return {
        memoryPoolManager: r
      };
    }, void 0, import.meta.url);
    n.cleanup();
  } catch {}
}

const mBi = Object.freeze(Object.defineProperty({
    __proto__: null,
    moderateMemoryCleanup: $pr,
    releaseOffscreenDecodedMedia: XJe,
    trimMemoryCaches: $je
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Cg = !1,
  b9 = typeof navigator < "u" && (navigator.platform.toLowerCase().includes("win") || navigator.userAgent.toLowerCase().includes("win")),
  gG = typeof navigator < "u" && (navigator.platform.toLowerCase().includes("mac") || navigator.userAgent.toLowerCase().includes("mac")),
  dhn = b9 || gG,
  fBi = a9(),
  gBi = fBi.memoryCheckIntervalMs,
  Fst = b9 ? .6 : gG ? .7 : .75,
  zst = b9 ? .7 : gG ? .82 : .85,
  uhn = b9 ? .28 : gG ? .5 : .6,
  yBi = b9 || gG ? 520 : 560,
  qMe = b9 || gG ? 900 : 780,
  hhn = b9 ? 1e3 : 1300,
  bBi = b9 ? 750 : gG ? 800 : 700,
  vBi = b9 ? .13 : .14,
  wBi = b9 ? .22 : .18,
  xBi = 480 * 1e3,
  _Bi = 8,
  kBi = 40;

class ABi {
  constructor() {
    On(this, "intervalId", null);
    On(this, "isMonitoring", !1);
    On(this, "lastGcTime", 0);
    On(this, "gcCooldown", 45e3);
    On(this, "gcPassInFlight", !1);
    On(this, "lastCleanupTime", 0);
    On(this, "lastSoftTrimTime", 0);
    On(this, "lastSessionReclaimTime", 0);
    On(this, "highMemoryStreak", 0);
    On(this, "lowSystemMemStreak", 0);
    On(this, "lastSystemRamReliefTime", 0);
    On(this, "sessionReclaimBackoffUntil", 0);
    On(this, "pendingPostInteractionCheck", !1);
    On(this, "settledUnsub", null);
    On(this, "cleanupCooldown", gG ? 180 * 1e3 : 120 * 1e3);
    On(this, "softTrimCooldown", 25 * 1e3);
    On(this, "moderateCooldown", 75 * 1e3);
    On(this, "sessionReclaimCooldown", 120 * 1e3);
    On(this, "emergencyCooldown", 60 * 1e3);
  }
  async isCanvasGestureActive() {
    try {
      const {
        isCanvasViewInteracting: t,
        getCanvasPanning: n,
        getCanvasZooming: r
      } = await Ie(async () => {
        const {
          isCanvasViewInteracting: a,
          getCanvasPanning: i,
          getCanvasZooming: o
        } = await Promise.resolve().then(() => W2);
        return {
          isCanvasViewInteracting: a,
          getCanvasPanning: i,
          getCanvasZooming: o
        };
      }, void 0, import.meta.url);
      return t() || n() || r();
    } catch {
      return !1;
    }
  }
  async isGenerationTaskRunning() {
    try {
      const {
        taskRuntimeStore: t
      } = await Ie(async () => {
        const {
          taskRuntimeStore: n
        } = await Promise.resolve().then(() => c8n);
        return {
          taskRuntimeStore: n
        };
      }, void 0, import.meta.url);
      return t.hasActiveGeneratingTasks();
    } catch {
      return !1;
    }
  }
  scheduleCheckAfterInteraction() {
    this.pendingPostInteractionCheck || (this.pendingPostInteractionCheck = !0, Ie(async () => {
      const {
        subscribeCanvasInteractionSettled: t
      } = await Promise.resolve().then(() => W2);
      return {
        subscribeCanvasInteractionSettled: t
      };
    }, void 0, import.meta.url).then(({
      subscribeCanvasInteractionSettled: t
    }) => {
      var n;
      (n = this.settledUnsub) == null || n.call(this), this.settledUnsub = t(() => {
        var r;
        (r = this.settledUnsub) == null || r.call(this), this.settledUnsub = null, this.pendingPostInteractionCheck = !1, this.checkMemory();
      });
    }).catch(() => {
      this.pendingPostInteractionCheck = !1;
    }));
  }
  start() {
    this.isMonitoring || (this.isMonitoring = !0, this.checkMemory(), this.intervalId = window.setInterval(() => {
      this.checkMemory();
    }, gBi));
  }
  stop() {
    var t;
    this.intervalId && (clearInterval(this.intervalId), this.intervalId = null), (t = this.settledUnsub) == null || t.call(this), this.settledUnsub = null, this.pendingPostInteractionCheck = !1, this.isMonitoring = !1;
  }
  async checkMemory() {
    try {
      const t = performance.memory;
      if (!t) return;
      const n = t.usedJSHeapSize,
        r = t.jsHeapSizeLimit,
        a = n / r,
        i = n / 1024 / 1024,
        o = Date.now(),
        s = i >= yBi || a >= vBi,
        l = i >= qMe || a >= wBi,
        d = i >= hhn,
        u = typeof document < "u" && document.hidden;
      if (await this.isCanvasGestureActive()) {
        this.scheduleCheckAfterInteraction();
        return;
      }
      if (a >= zst) {
        if (o - this.lastCleanupTime < this.emergencyCooldown) return;
        await this.emergencyCleanup();
        return;
      }
      if (await this.isGenerationTaskRunning()) return;
      try {
        const {
            getSystemMemoryInfo: p
          } = await Ie(async () => {
            const {
              getSystemMemoryInfo: y
            } = await Promise.resolve().then(() => eIt);
            return {
              getSystemMemoryInfo: y
            };
          }, void 0, import.meta.url),
          m = await p(),
          f = Number(m.available_memory_mb) || 0;
        f > 0 && f < 500 ? this.lowSystemMemStreak += 1 : (this.lowSystemMemStreak = 0, Zpt(!1)), this.lowSystemMemStreak >= 3 && (Zpt(!0), o - this.lastSystemRamReliefTime >= 6e4 && (this.lastSystemRamReliefTime = o, await $je({
          keepRatio: .35,
          releaseComponentState: !1,
          releaseOffscreenMedia: !0
        })));
      } catch {}
      try {
        const {
          isPanelHydrateGraceActive: p
        } = await Ie(async () => {
          const {
            isPanelHydrateGraceActive: m
          } = await Promise.resolve().then(() => aD);
          return {
            isPanelHydrateGraceActive: m
          };
        }, void 0, import.meta.url);
        if (p(o)) return;
      } catch {}
      if (u) {
        this.highMemoryStreak = 0;
        return;
      }
      d ? this.highMemoryStreak += 1 : this.highMemoryStreak = 0;
      const h = o < this.sessionReclaimBackoffUntil || o - this.lastSessionReclaimTime < this.sessionReclaimCooldown;
      if (this.highMemoryStreak >= 2 && !h) {
        const p = i;
        await this.sessionReclaim(), this.highMemoryStreak = 0, this.applyReclaimBackoffIfIneffective(p, hhn);
        return;
      }
      if (s && !l && o - this.lastSoftTrimTime >= this.softTrimCooldown && (await this.softTrim()), l && a < Fst) {
        try {
          const {
            isPanelHydrateGraceActive: p
          } = await Ie(async () => {
            const {
              isPanelHydrateGraceActive: m
            } = await Promise.resolve().then(() => aD);
            return {
              isPanelHydrateGraceActive: m
            };
          }, void 0, import.meta.url);
          if (p(o)) {
            o - this.lastSoftTrimTime >= this.softTrimCooldown && (await this.softTrim());
            return;
          }
        } catch {}
        if (o < this.sessionReclaimBackoffUntil) {
          o - this.lastSoftTrimTime >= this.softTrimCooldown && (await this.softTrim());
          return;
        }
        if (o - this.lastCleanupTime >= this.moderateCooldown) {
          await this.moderateCleanup();
          return;
        }
      }
      if (a >= Fst) {
        if (o - this.lastCleanupTime < this.cleanupCooldown) return;
        await this.cleanup(), await this.trySmartGC(!0);
      } else if (a >= uhn || i >= bBi) if (Uje()) await this.trySmartGC();else {
        if (o - this.lastCleanupTime < this.cleanupCooldown) return;
        await this.cleanup();
      }
    } catch {}
  }
  async trySmartGC(t = !1) {
    if (this.gcPassInFlight) return;
    if (await this.isCanvasGestureActive()) {
      this.scheduleCheckAfterInteraction();
      return;
    }
    const n = Date.now(),
      r = this.readUsedHeapMB(0),
      i = r >= 1e3 ? 9e4 : this.gcCooldown;
    if (!(!t && n - this.lastGcTime < i)) {
      if (!Uje()) {
        if (n - this.lastCleanupTime >= this.cleanupCooldown) {
          this.lastCleanupTime = n, this.lastGcTime = n;
          try {
            await $je({
              keepRatio: .35,
              releaseComponentState: !0,
              releaseOffscreenMedia: !0
            });
            const {
              clearBlobSerializationCache: o
            } = await Ie(async () => {
              const {
                clearBlobSerializationCache: s
              } = await Promise.resolve().then(() => Tle);
              return {
                clearBlobSerializationCache: s
              };
            }, void 0, import.meta.url);
            o(), await new Promise(s => setTimeout(s, 0)), await new Promise(s => {
              typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => requestAnimationFrame(() => s())) : setTimeout(s, 32);
            });
          } catch {}
        }
        return;
      }
      this.gcPassInFlight = !0, this.lastGcTime = n;
      try {
        let o = !1;
        try {
          const {
            trimOversizedContentCache: s
          } = await Ie(async () => {
            const {
              trimOversizedContentCache: l
            } = await Promise.resolve().then(() => MXe);
            return {
              trimOversizedContentCache: l
            };
          }, void 0, import.meta.url);
          s();
        } catch {}
        try {
          if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)) {
            const {
                forceDevToolsLikeGc: l
              } = await Ie(async () => {
                const {
                  forceDevToolsLikeGc: u
                } = await Promise.resolve().then(() => vzt);
                return {
                  forceDevToolsLikeGc: u
                };
              }, void 0, import.meta.url),
              d = r >= 1e3 ? 1 : 2;
            await l({
              maxRounds: d,
              skipCdp: !0
            }), o = !0;
          }
        } catch {}
        if (!o) {
          const s = r >= 1e3 ? 1 : 2;
          for (let l = 0; l < s && !(l > 0 && (await this.isCanvasGestureActive())); l++) await bzt(1);
        }
      } catch {} finally {
        this.gcPassInFlight = !1;
      }
    }
  }
  getMemoryUsage() {
    try {
      const t = performance.memory;
      if (!t) return null;
      const n = t.usedJSHeapSize,
        r = t.jsHeapSizeLimit,
        a = n / r;
      return {
        used: n,
        total: r,
        ratio: a,
        formatted: `${(n / 1024 / 1024).toFixed(1)}MB / ${(r / 1024 / 1024).toFixed(1)}MB (${(a * 100).toFixed(1)}%)`
      };
    } catch {
      return null;
    }
  }
  canSafeSave(t = 0) {
    const n = this.getMemoryUsage();
    return n ? n.ratio >= zst ? {
      canSave: !1,
      reason: `当前内存使用率过高 (${(n.ratio * 100).toFixed(1)}%)`,
      suggestion: "建议先关闭其他标签页或重启浏览器后再保存"
    } : t > 0 && (n.used + t) / n.total >= zst ? {
      canSave: !1,
      reason: `保存操作预计需要 ${(t / 1024 / 1024).toFixed(1)}MB，可能导致内存不足`,
      suggestion: "建议减少节点数量、删除大型视频节点、或使用性能更好的设备"
    } : n.ratio >= Fst ? {
      canSave: !0,
      reason: `当前内存使用率较高 (${(n.ratio * 100).toFixed(1)}%)`,
      suggestion: "保存过程中如遇到问题，建议先清理缓存或关闭其他标签页"
    } : {
      canSave: !0
    } : {
      canSave: !0
    };
  }
  async softTrim() {
    try {
      this.lastSoftTrimTime = Date.now();
      const t = await $je({
        keepRatio: .45,
        releaseComponentState: !1,
        releaseOffscreenMedia: !0
      });
    } catch {}
  }
  async sessionReclaim() {
    try {
      this.lastSessionReclaimTime = Date.now(), this.lastCleanupTime = Date.now();
      const {
        sessionMemoryReclaim: t
      } = await Ie(async () => {
        const {
          sessionMemoryReclaim: n
        } = await Promise.resolve().then(() => E$t);
        return {
          sessionMemoryReclaim: n
        };
      }, void 0, import.meta.url);
      await t({
        gcRounds: 1
      }), this.lastGcTime = Date.now();
    } catch {}
  }
  readUsedHeapMB(t) {
    try {
      const n = performance.memory;
      if (n != null && n.usedJSHeapSize) return n.usedJSHeapSize / 1024 / 1024;
    } catch {}
    return t;
  }
  applyReclaimBackoffIfIneffective(t, n) {
    const r = this.readUsedHeapMB(t),
      a = Math.max(0, t - r),
      i = r >= n - kBi;
    a < _Bi || i ? this.sessionReclaimBackoffUntil = Date.now() + xBi : this.sessionReclaimBackoffUntil = 0;
  }
  async moderateCleanup() {
    const t = this.readUsedHeapMB(qMe);
    await this.sessionReclaim(), this.applyReclaimBackoffIfIneffective(t, qMe);
  }
  async cleanup() {
    var t;
    try {
      this.lastCleanupTime = Date.now(), await Wd.clearMemoryCache(), Er.clearMemoryCache(), Cde(), TXe(), await Abt();
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
        (t = n.clearBlobUrlCache) == null || t.call(n);
      } catch {}
      try {
        const {
          memoryPoolManager: n
        } = await Ie(async () => {
          const {
            memoryPoolManager: r
          } = await Promise.resolve().then(() => Vfr);
          return {
            memoryPoolManager: r
          };
        }, void 0, import.meta.url);
        n.cleanup();
      } catch {}
      try {
        const {
          dispatchMediaBlobUrlsInvalidated: n
        } = await Ie(async () => {
          const {
            dispatchMediaBlobUrlsInvalidated: r
          } = await Promise.resolve().then(() => mjt);
          return {
            dispatchMediaBlobUrlsInvalidated: r
          };
        }, void 0, import.meta.url);
        n();
      } catch {}
    } catch {}
  }
  cleanupNodeResources(t, n = !1) {
    let r = 0;
    try {
      n ? t.forEach(a => {
        bAt([a]), r++;
      }) : (bAt(t), r = t.length);
    } catch {}
    return r;
  }
  cleanupHistory(t, n) {
    const a = n ?? (dhn ? 300 : 100);
    if (t.length <= a) return t;
    const i = t.slice(-a);
    return t.length - i.length, i;
  }
  async fullCleanup(t, n) {
    let r = 0,
      a = 0;
    try {
      t && t.length > 0 && (r = this.cleanupNodeResources(t, !1));
      const i = dhn ? 300 : 100;
      if (n && n.length > i) {
        const o = n.length,
          s = this.cleanupHistory(n, i);
        a = o - s.length;
      }
      await Wd.clearMemoryCache(), Er.clearMemoryCache(), Cde(), await Abt();
      try {
        const {
          assetStore: o
        } = await Ie(async () => {
          const {
            assetStore: s
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: s
          };
        }, void 0, import.meta.url);
      } catch {}
      return await this.trySmartGC(!0), {
        nodeResourcesCleaned: r,
        historyItemsRemoved: a,
        cachesCleared: !0
      };
    } catch {
      return {
        nodeResourcesCleaned: r,
        historyItemsRemoved: a,
        cachesCleared: !1
      };
    }
  }
  async emergencyCleanup() {
    try {
      await this.sessionReclaim();
    } catch {}
  }
  forceGC() {
    Uje() && this.trySmartGC(!0);
  }
  async manualSessionReclaim() {
    await this.sessionReclaim();
  }
  async manualCleanup() {
    const t = this.getMemoryUsage();
    t && (t.ratio >= uhn || t.used / 1024 / 1024 >= qMe) ? await this.sessionReclaim() : await this.cleanup(), await this.trySmartGC(!0);
  }
  async manualEmergencyCleanup() {
    await this.sessionReclaim();
  }
  async cleanupBeforeSave() {
    await this.cleanup(), await new Promise(t => setTimeout(t, 100));
  }
}

const SBi = new ABi(),
  eEe = Object.freeze(Object.defineProperty({
    __proto__: null,
    memoryMonitor: SBi
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function IBi(e) {
  return `${(e / 1024 / 1024).toFixed(1)}MB`;
}

function r7(e) {
  return e >= 1024 * 1024 ? IBi(e) : `${(e / 1024).toFixed(0)}KB`;
}

function Ust(e, t = 64 * 1024 * 1024) {
  try {
    const n = JSON.stringify(e);
    return n ? Math.min(n.length * 2, t) : 0;
  } catch {
    return -1;
  }
}

async function Gpr() {
  var p;
  const e = {
    usedMB: 0,
    limitMB: 0,
    ratio: 0
  };
  try {
    const m = performance.memory;
    m != null && m.usedJSHeapSize && (e.usedMB = m.usedJSHeapSize / 1024 / 1024, e.limitMB = (m.jsHeapSizeLimit || 0) / 1024 / 1024, e.ratio = e.limitMB > 0 ? e.usedMB / e.limitMB : 0);
  } catch {}
  const t = (p = window.__getCanvasMemoryRoots) == null ? void 0 : p.call(window),
    n = {
      nodes: {
        count: 0,
        estBytes: 0
      },
      connections: {
        count: 0,
        estBytes: 0
      },
      history: {
        count: 0,
        estBytes: 0
      }
    };
  if (t && typeof t == "object") {
    const m = t;
    n.nodes.count = Array.isArray(m.nodes) ? m.nodes.length : 0, n.connections.count = Array.isArray(m.connections) ? m.connections.length : 0, n.history.count = Array.isArray(m.history) ? m.history.length : 0, n.nodes.estBytes = Ust(m.nodes), n.connections.estBytes = Ust(m.connections), n.history.estBytes = Ust(m.history);
  }
  const r = {},
    a = async (m, f) => {
      try {
        r[m] = await f();
      } catch {
        r[m] = "n/a";
      }
    };
  await Promise.all([a("ossSessionCache", async () => {
    const {
        getOssSessionCacheAudit: m
      } = await Ie(async () => {
        const {
          getOssSessionCacheAudit: y
        } = await Promise.resolve().then(() => l3);
        return {
          getOssSessionCacheAudit: y
        };
      }, void 0, import.meta.url),
      f = m();
    return {
      ...f,
      bytesLabel: r7(f.bytes)
    };
  }), a("tauriDownloadCache", async () => {
    const {
        getTauriDownloadCacheAudit: m
      } = await Ie(async () => {
        const {
          getTauriDownloadCacheAudit: y
        } = await Promise.resolve().then(() => El);
        return {
          getTauriDownloadCacheAudit: y
        };
      }, void 0, import.meta.url),
      f = m();
    return {
      ...f,
      bytesLabel: r7(f.bytes)
    };
  }), a("globalOssMaterial", async () => {
    const {
        getGlobalOssMaterialMemoryAudit: m
      } = await Ie(async () => {
        const {
          getGlobalOssMaterialMemoryAudit: y
        } = await Promise.resolve().then(() => ii);
        return {
          getGlobalOssMaterialMemoryAudit: y
        };
      }, void 0, import.meta.url),
      f = m();
    return {
      ...f,
      cachedHistoryRawLabel: r7(f.cachedHistoryRawBytes)
    };
  }), a("editImageHistoryCache", async () => {
    const {
        getEditImageHistorySyncCacheAudit: m
      } = await Ie(async () => {
        const {
          getEditImageHistorySyncCacheAudit: y
        } = await Promise.resolve().then(() => o5e);
        return {
          getEditImageHistorySyncCacheAudit: y
        };
      }, void 0, import.meta.url),
      f = m();
    return {
      ...f,
      cachedHistoryRawLabel: r7(f.cachedHistoryRawBytes)
    };
  }), a("deferredQueues", async () => {
    const {
      getDeferredQueueAudit: m
    } = await Ie(async () => {
      const {
        getDeferredQueueAudit: f
      } = await Promise.resolve().then(() => W2);
      return {
        getDeferredQueueAudit: f
      };
    }, void 0, import.meta.url);
    return m();
  }), a("rememberedNodeMedia", async () => {
    const {
      getRememberedNodeMediaAudit: m
    } = await Ie(async () => {
      const {
        getRememberedNodeMediaAudit: f
      } = await Promise.resolve().then(() => J8r);
      return {
        getRememberedNodeMediaAudit: f
      };
    }, void 0, import.meta.url);
    return m();
  }), a("ossThumbViewport", async () => {
    const {
      getOssThumbViewportAudit: m
    } = await Ie(async () => {
      const {
        getOssThumbViewportAudit: f
      } = await Promise.resolve().then(() => wlr);
      return {
        getOssThumbViewportAudit: f
      };
    }, void 0, import.meta.url);
    return m();
  }), a("thumbnailStore", async () => {
    const {
      thumbnailStore: m
    } = await Ie(async () => {
      const {
        thumbnailStore: f
      } = await Promise.resolve().then(() => Y$);
      return {
        thumbnailStore: f
      };
    }, void 0, import.meta.url);
    return m.getStats();
  }), a("contentStore", async () => {
    const {
      contentStore: m
    } = await Ie(async () => {
      const {
        contentStore: f
      } = await Promise.resolve().then(() => Ly);
      return {
        contentStore: f
      };
    }, void 0, import.meta.url);
    return await m.getStats();
  }), a("lazyContent", async () => {
    const {
        getContentCacheStats: m
      } = await Ie(async () => {
        const {
          getContentCacheStats: b
        } = await Promise.resolve().then(() => MXe);
        return {
          getContentCacheStats: b
        };
      }, void 0, import.meta.url),
      {
        getInternedLazyDisplayAudit: f
      } = await Ie(async () => {
        const {
          getInternedLazyDisplayAudit: b
        } = await Promise.resolve().then(() => FUa);
        return {
          getInternedLazyDisplayAudit: b
        };
      }, void 0, import.meta.url),
      y = m();
    return {
      ...y,
      bytesLabel: r7(y.totalSize),
      interned: f()
    };
  }), a("localObjectUrlRegistry", async () => {
    const {
      getLocalObjectUrlRegistryStats: m
    } = await Ie(async () => {
      const {
        getLocalObjectUrlRegistryStats: f
      } = await Promise.resolve().then(() => eU);
      return {
        getLocalObjectUrlRegistryStats: f
      };
    }, void 0, import.meta.url);
    return m();
  }), a("mediaResourceRegistry", async () => {
    const {
      mediaResourceRegistry: m
    } = await Ie(async () => {
      const {
        mediaResourceRegistry: f
      } = await Promise.resolve().then(() => Kfr);
      return {
        mediaResourceRegistry: f
      };
    }, void 0, import.meta.url);
    return m.getStats();
  })]);
  let i = 0;
  const o = r.ossSessionCache;
  o != null && o.bytes && (i += o.bytes);
  const s = r.tauriDownloadCache;
  s != null && s.bytes && (i += s.bytes);
  const l = r.globalOssMaterial;
  l != null && l.cachedHistoryRawBytes && (i += l.cachedHistoryRawBytes);
  const d = r.editImageHistoryCache;
  d != null && d.cachedHistoryRawBytes && (i += d.cachedHistoryRawBytes);
  const u = r.contentStore;
  u != null && u.memoryCacheSize && (i += u.memoryCacheSize);
  const h = r.lazyContent;
  return h != null && h.totalSize && (i += h.totalSize), i += n.nodes.estBytes + n.history.estBytes, {
    timestamp: new Date().toISOString(),
    heap: e,
    reactRoots: n,
    caches: r,
    totalEstimatedBytes: i
  };
}

function Vpr(e) {
  const t = [];
  t.push("===== JS 堆审计 ====="), t.push(`堆: ${e.heap.usedMB.toFixed(1)}MB / ${e.heap.limitMB.toFixed(0)}MB (${(e.heap.ratio * 100).toFixed(1)}%)`), t.push("----- React 根（JSON 估算） -----"), t.push(`nodes: ${e.reactRoots.nodes.count} 条 ~ ${r7(e.reactRoots.nodes.estBytes)}`), t.push(`connections: ${e.reactRoots.connections.count} 条 ~ ${r7(e.reactRoots.connections.estBytes)}`), t.push(`history: ${e.reactRoots.history.count} 条 ~ ${r7(e.reactRoots.history.estBytes)}`), t.push("----- 模块缓存 -----");
  for (const [n, r] of Object.entries(e.caches)) t.push(`${n}: ${JSON.stringify(r)}`);
  return t.push(`----- 已枚举缓存合计（估算）: ${r7(e.totalEstimatedBytes)} -----`), t.push("提示：合计远小于堆用量时，剩余部分在 React 组件 state / 闭包 / 字符串池 / V8 老生代碎片中，需用 DevTools Memory 拍快照（若报 Invalid string length，说明存在巨型字符串，重点查 history/chat 全文缓存与节点 settings 里的 data: URL）。"), t.join(`
`);
}

typeof window < "u" && (window.__memoryAudit = async e => {
  const t = await Gpr(),
    n = Vpr(t);
  return console.log(e === "summary" ? `[MemoryAudit] 堆 ${t.heap.usedMB.toFixed(0)}MB/${t.heap.limitMB.toFixed(0)}MB · nodes ${t.reactRoots.nodes.count} · history ${t.reactRoots.history.count} · ossSession ${JSON.stringify(t.caches.ossSessionCache)} · contentStore ${JSON.stringify(t.caches.contentStore)} · lazy ${JSON.stringify(t.caches.lazyContent)}` : n), t;
});

const CBi = Object.freeze(Object.defineProperty({
    __proto__: null,
    formatMemoryAuditReport: Vpr,
    runMemoryAudit: Gpr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  $st = () => ({
    frames: 0,
    frameMs: 0,
    worstFrameMs: 0,
    slowFrames: 0,
    longTasks: 0,
    longTaskMs: 0,
    events: 0,
    worstEventMs: 0,
    eventProcessingMs: 0,
    addedNodes: 0,
    removedNodes: 0
  });

let Hde = !1,
  Fg = null,
  q1e = [],
  poe = null,
  Gje = null,
  Vje = 0,
  PW = null,
  Fye = null,
  P6 = null;

const m$e = [];

let vAt = [];

function wzt(e) {
  if (!Fg || e < Fg.startedAt) return null;
  const t = Fg.releasedAt !== null && e >= Fg.releasedAt ? "settle" : e - Fg.startedAt < 100 ? "start" : "move";
  return Fg.phases[t];
}

function Hpr(e) {
  for (const t of e) {
    const n = wzt(t.startTime);
    if (n) {
      if (t.entryType === "longtask") n.longTasks++, n.longTaskMs += t.duration;else if (/^(pointer|mouse|touch|wheel)/.test(t.name)) {
        const r = t;
        n.events++, n.worstEventMs = Math.max(n.worstEventMs, t.duration), n.eventProcessingMs += Math.max(0, (r.processingEnd || 0) - (r.processingStart || 0));
      }
    }
  }
}

function wAt(e) {
  const t = wzt(performance.now());
  if (t) for (const n of e) t.addedNodes += n.addedNodes.length, t.removedNodes += n.removedNodes.length;
}

function f$e(e) {
  poe !== null && cancelAnimationFrame(poe), Gje !== null && clearTimeout(Gje), poe = null, Gje = null;
  for (const t of m$e) Hpr(t.takeRecords());
  P6 && wAt(P6.takeRecords()), P6 == null || P6.disconnect(), P6 = null, Fg && (Fg.endedAt = performance.now(), Fg.reason = e, q1e.push(Fg), q1e.length > 10 && q1e.shift(), Fg = null);
}

function Wpr(e) {
  if (poe = null, !Fg) return;
  const t = e - Vje,
    n = wzt(Vje);
  n && t > 0 && (n.frames++, n.frameMs += t, n.worstFrameMs = Math.max(n.worstFrameMs, t), t >= Fg.displayFrameMs * 1.5 && n.slowFrames++), Vje = e, poe = requestAnimationFrame(Wpr);
}

function qpr(e) {
  if (!(!Hde || document.hidden)) if (e) {
    if ((Fg == null ? void 0 : Fg.releasedAt) === null) return;
    f$e("next-gesture");
    const t = performance.now(),
      n = PW !== null && t - PW < 500 ? PW : null;
    PW = null, Fg = {
      startedAt: n ?? t,
      inputToInteractionMs: n === null ? null : t - n,
      releasedAt: null,
      endedAt: null,
      reason: "",
      displayFrameMs: ENt(),
      phases: {
        start: $st(),
        move: $st(),
        settle: $st()
      }
    };
    const r = document.querySelector(".canvas-world");
    r && typeof MutationObserver < "u" && (P6 = new MutationObserver(wAt), P6.observe(r, {
      childList: !0,
      subtree: !0
    })), Vje = Fg.startedAt, poe = requestAnimationFrame(Wpr);
  } else Fg && Fg.releasedAt === null && (P6 && wAt(P6.takeRecords()), Fg.releasedAt = performance.now(), Gje = setTimeout(() => f$e("settled"), 600));
}

function Kpr(e) {
  e.target instanceof Element && e.target.closest("#canvas-bg") && (PW = performance.now());
}

function Qpr() {
  document.hidden ? (f$e("hidden"), PW = null) : qpr(Yi());
}

function EBi() {
  if (Hde || typeof document > "u") return;
  Hde = !0, q1e = [], vAt = [];
  for (const n of ["longtask", "event"]) if (!(typeof PerformanceObserver > "u" || !PerformanceObserver.supportedEntryTypes.includes(n))) try {
    const r = new PerformanceObserver(i => Hpr(i.getEntries())),
      a = n === "event" ? {
        type: n,
        durationThreshold: 24
      } : {
        type: n
      };
    r.observe(a), m$e.push(r), vAt.push(n);
  } catch {}
  document.addEventListener("pointerdown", Kpr, !0), document.addEventListener("visibilitychange", Qpr);
  const e = () => qpr(Yi()),
    t = [$v(e), D$(e), L$(e)];
  Fye = () => t.forEach(n => n());
}

function TBi() {
  if (Hde) {
    Hde = !1, Fye == null || Fye(), Fye = null, document.removeEventListener("pointerdown", Kpr, !0), document.removeEventListener("visibilitychange", Qpr), f$e("stopped");
    for (const e of m$e) e.disconnect();
    m$e.length = 0, PW = null;
  }
}

const MBi = {
    start: EBi,
    stop: TBi,
    report: () => JSON.parse(JSON.stringify({
      enabled: Hde,
      supported: vAt,
      reports: q1e,
      current: Fg,
      note: "start 为起手 100ms，settle 为松手后 600ms；事件总时长不等于处理器耗时。JS 指标不能单独确定 GPU 瓶颈。"
    }))
  },
  tc = {
    startTime: Date.now(),
    mainThreadBlockEvents: [],
    ossQueueSnapshots: []
  };

let Hje = null,
  K1e = null;

function xzt() {
  if (tc.startTime = Date.now(), tc.mainThreadBlockEvents = [], tc.ossQueueSnapshots = [], "PerformanceObserver" in window) try {
    K1e = new PerformanceObserver(e => {
      for (const t of e.getEntries()) t.duration > 50 && tc.mainThreadBlockEvents.push({
        duration: t.duration,
        timestamp: t.startTime
      });
    }), K1e.observe({
      entryTypes: ["longtask", "measure"]
    });
  } catch (e) {
    console.warn("[PerformanceMonitor] PerformanceObserver setup failed:", e);
  }
  Hje = setInterval(() => {
    const e = F$n();
    tc.ossQueueSnapshots.push({
      timestamp: Date.now() - tc.startTime,
      status: e
    });
  }, 200), console.log("[PerformanceMonitor] 监控已启动");
}

function _zt() {
  Hje && (clearInterval(Hje), Hje = null), K1e && (K1e.disconnect(), K1e = null), console.log("[PerformanceMonitor] 监控已停止");
}

function kzt() {
  tc.projectOpenTime = Date.now() - tc.startTime, console.log(`[PerformanceMonitor] 项目打开: ${tc.projectOpenTime}ms`);
}

function Azt() {
  tc.firstNodeRenderTime || (tc.firstNodeRenderTime = Date.now() - tc.startTime, console.log(`[PerformanceMonitor] 首个节点渲染: ${tc.firstNodeRenderTime}ms`));
}

function Szt() {
  tc.firstImageLoadTime || (tc.firstImageLoadTime = Date.now() - tc.startTime, console.log(`[PerformanceMonitor] 首个图片加载: ${tc.firstImageLoadTime}ms`));
}

function Izt() {
  tc.allImagesLoadedTime || (tc.allImagesLoadedTime = Date.now() - tc.startTime, console.log(`[PerformanceMonitor] 所有图片加载完成: ${tc.allImagesLoadedTime}ms`));
}

function JJe() {
  var i;
  const e = {
      总耗时: `${Date.now() - tc.startTime}ms`,
      项目打开: tc.projectOpenTime ? `${tc.projectOpenTime}ms` : "未记录",
      首个节点渲染: tc.firstNodeRenderTime ? `${tc.firstNodeRenderTime}ms` : "未记录",
      首个图片加载: tc.firstImageLoadTime ? `${tc.firstImageLoadTime}ms` : "未记录",
      所有图片加载: tc.allImagesLoadedTime ? `${tc.allImagesLoadedTime}ms` : "未记录"
    },
    t = tc.mainThreadBlockEvents.length,
    n = tc.mainThreadBlockEvents.reduce((o, s) => o + s.duration, 0),
    r = t > 0 ? n / t : 0,
    a = `
主线程阻塞分析：
- 阻塞事件数: ${t}
- 总阻塞时间: ${n.toFixed(0)}ms
- 平均阻塞时间: ${r.toFixed(0)}ms
- 最大单次阻塞: ${t > 0 ? Math.max(...tc.mainThreadBlockEvents.map(o => o.duration)).toFixed(0) : 0}ms

OSS 队列历史：
- 采样点数: ${tc.ossQueueSnapshots.length}
- 最大待处理数: ${Math.max(...tc.ossQueueSnapshots.map(o => o.status.queuedCount), 0)}
- 最大进行中数: ${Math.max(...tc.ossQueueSnapshots.map(o => o.status.inflightCount), 0)}
- 最终完成数: ${((i = tc.ossQueueSnapshots[tc.ossQueueSnapshots.length - 1]) == null ? void 0 : i.status.completedCount) || 0}

性能评分：
${(tc.firstNodeRenderTime ?? 1 / 0) < 1e3 && (tc.allImagesLoadedTime ?? 1 / 0) < 3e3 ? "⭐⭐⭐⭐⭐ 优秀" : (tc.firstNodeRenderTime ?? 1 / 0) < 2e3 && (tc.allImagesLoadedTime ?? 1 / 0) < 5e3 ? "⭐⭐⭐⭐ 良好" : (tc.firstNodeRenderTime ?? 1 / 0) < 3e3 ? "⭐⭐⭐ 及格" : "⭐⭐ 需要优化"}
`;
  return {
    summary: e,
    mainThreadEvents: tc.mainThreadBlockEvents,
    queueHistory: tc.ossQueueSnapshots,
    analysis: a
  };
}

function Czt() {
  const e = JJe();
  console.group("[PerformanceMonitor] 性能报告"), console.table(e.summary), console.log(e.analysis), console.log("主线程阻塞事件:", e.mainThreadEvents), console.log("OSS 队列历史:", e.queueHistory), console.groupEnd();
}

function Ezt() {
  return JSON.stringify(JJe(), null, 2);
}

typeof window < "u" && (window.PerformanceMonitor = {
  gestures: MBi,
  start: xzt,
  stop: _zt,
  markProjectOpened: kzt,
  markFirstNodeRendered: Azt,
  markFirstImageLoaded: Szt,
  markAllImagesLoaded: Izt,
  report: Czt,
  export: Ezt
});

const PBi = {
    startPerformanceMonitoring: xzt,
    stopPerformanceMonitoring: _zt,
    markProjectOpened: kzt,
    markFirstNodeRendered: Azt,
    markFirstImageLoaded: Szt,
    markAllImagesLoaded: Izt,
    getPerformanceReport: JJe,
    printPerformanceReport: Czt,
    exportPerformanceData: Ezt
  },
  RBi = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: PBi,
    exportPerformanceData: Ezt,
    getPerformanceReport: JJe,
    markAllImagesLoaded: Izt,
    markFirstImageLoaded: Szt,
    markFirstNodeRendered: Azt,
    markProjectOpened: kzt,
    printPerformanceReport: Czt,
    startPerformanceMonitoring: xzt,
    stopPerformanceMonitoring: _zt
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  phn = 50;

function Gst(e) {
  return e ? String(e).trim().startsWith("blob:") : !1;
}

function mhn(e) {
  if (!e) return !1;
  const t = String(e);
  return t.startsWith("data:") ? t.length > 1024 * 1024 : !1;
}

function NBi(e, t) {
  const r = String(e.time || "").trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!r) return !1;
  const a = new Date(),
    i = new Date(a.getFullYear(), a.getMonth(), a.getDate(), Number(r[1]), Number(r[2]), Number(r[3] || 0), 0).getTime();
  return t === i;
}

function jBi(e, t) {
  let n = !1;
  const r = Number(e.startTime),
    a = Number.isFinite(r) && r > 0,
    i = Number(e.timestamp),
    o = Number.isFinite(i) && i > 0;
  if (a) (!o || Math.abs(i - r) > 720 * 60 * 1e3) && (e.timestamp = r, n = !0);else if (o && NBi(e, i)) delete e.timestamp, n = !0;else if (!o) {
    const s = ZJ(e);
    s > 0 && (e.timestamp = s, n = !0);
  }
  if (e._thumbnailAssetId) {
    const s = `preview_${e._thumbnailAssetId}`;
    !t.has(s) && !t.has(e._thumbnailAssetId) && (delete e._thumbnailAssetId, n = !0);
  }
  return mhn(e.thumbnailUrl) && (delete e.thumbnailUrl, n = !0), mhn(e.videoPosterUrl) && (delete e.videoPosterUrl, n = !0), Gst(e.thumbnailUrl) && (delete e.thumbnailUrl, n = !0), Gst(e.videoPosterUrl) && (delete e.videoPosterUrl, n = !0), Gst(e.localCacheUrl) && (delete e.localCacheUrl, n = !0), n;
}

async function DBi() {
  let e = [];
  try {
    e = await (await Ie(() => Promise.resolve().then(() => Gu), void 0, import.meta.url)).loadHistoryFromAllSources();
  } catch (a) {
    console.warn("[historySelfHeal] load history failed:", a);
    return;
  }
  if (!Array.isArray(e) || e.length === 0) return;
  let t = new Set();
  try {
    const {
      localCacheManager: a,
      ensureCacheRootReadyForWrite: i
    } = await Ie(async () => {
      const {
        localCacheManager: o,
        ensureCacheRootReadyForWrite: s
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: o,
        ensureCacheRootReadyForWrite: s
      };
    }, void 0, import.meta.url);
    (a.isAvailable() || (await i())) && (await a.ensureManifestLoaded(), t = new Set(a.getCachedAssetIds()));
  } catch (a) {
    console.warn("[historySelfHeal] load manifest skipped:", a);
  }
  let n = 0;
  for (let a = 0; a < e.length; a += phn) {
    const i = e.slice(a, a + phn);
    for (const o of i) jBi(o, t) && n++;
    await new Promise(o => setTimeout(o, 0));
  }
  const r = Iv(e);
  try {
    await (await Ie(() => Promise.resolve().then(() => Gu), void 0, import.meta.url)).persistHistoryToStorage(r), console.log(`[historySelfHeal] healed ${n}/${e.length} item(s), resorted & persisted`);
  } catch (a) {
    console.warn("[historySelfHeal] persist failed:", a);
  }
}

const LBi = 4e3,
  OBi = 6e3;

function BBi(e) {
  try {
    if (typeof localStorage > "u" || localStorage.getItem(e) == null) return;
    localStorage.removeItem(e);
  } catch {}
}

function FBi() {
  const e = ["qiaodoumayi_platform_pricing_cache", "qiaodoumayi_platform_pricing_cache_v1", "qiaodoumayi_platform_pricing_cache_v2", "qiaodoumayi_huya_models_cache", "qiaodoumayi_seedance_models_cache", "qiaodoumayi_volc_models_cache", "qiaodoumayi_runninghub_models_cache", "qiaodoumayi_api_test_results", "qiaodoumayi_api_test_results_v1"];
  for (const t of e) BBi(t);
}

function zBi() {
  const e = (t, n) => {
    try {
      const r = localStorage.getItem(t);
      if (!r) return;
      const a = JSON.parse(r);
      if (!Array.isArray(a)) {
        localStorage.removeItem(t);
        return;
      }
      if (a.length <= n) return;
      const i = a.slice(a.length - n);
      localStorage.setItem(t, JSON.stringify(i)), console.log(`[upgradeCleanup] trimmed ${t}: ${a.length} -> ${i.length}`);
    } catch (r) {
      console.warn("[upgradeCleanup] trim tombstone failed:", t, r);
    }
  };
  e("qiaodoumayi_history_deleted_ids", LBi), e("qiaodoumayi_history_deleted_urls", OBi);
}

function UBi() {
  try {
    const e = "qiaodoumayi_global_oss_upload_dedup_v1",
      t = localStorage.getItem(e);
    if (!t) return;
    const n = JSON.parse(t);
    if (!n || typeof n != "object") return;
    const r = Date.now(),
      a = 720 * 60 * 60 * 1e3,
      i = {};
    let o = 0,
      s = 0;
    for (const [l, d] of Object.entries(n)) {
      const u = typeof d == "number" ? d : d && typeof d == "object" && typeof d.ts == "number" ? d.ts : 0;
      u && r - u <= a ? (i[l] = d, s++) : o++;
    }
    o > 0 && (localStorage.setItem(e, JSON.stringify(i)), console.log(`[upgradeCleanup] pruned global OSS upload dedup: kept=${s}, dropped=${o}`));
  } catch (e) {
    console.warn("[upgradeCleanup] prune global OSS dedup failed:", e);
  }
}

async function $Bi() {
  try {
    const e = await Ie(() => Promise.resolve().then(() => vtr), void 0, import.meta.url);
    typeof e.clearHistoryListResolvedCache == "function" && e.clearHistoryListResolvedCache();
  } catch {}
}

async function GBi() {
  try {
    const e = await Ie(() => Promise.resolve().then(() => SFn), void 0, import.meta.url);
    e && e.apiConfigManager && typeof e.apiConfigManager.reloadFromStorage == "function" && e.apiConfigManager.reloadFromStorage();
  } catch {}
}

async function VBi() {
  FBi(), zBi(), UBi(), await $Bi(), await GBi();
}

const Ypr = "qiaodoumayi_app_version",
  Xpr = "qiaodoumayi_app_build_id",
  Jpr = "qiaodoumayi_app_migrations_done";

function HBi() {
  try {
    const e = "1.0.0";
    return e && typeof e == "string" ? e : "unknown";
  } catch {
    return "unknown";
  }
}

function WBi() {
  try {
    const e = "1792054699612";
    return e && typeof e == "string" ? e : "unknown";
  } catch {
    return "unknown";
  }
}

function qBi() {
  try {
    return localStorage.getItem(Ypr) || "";
  } catch {
    return "";
  }
}

function KBi(e) {
  try {
    localStorage.setItem(Ypr, e);
  } catch {}
}

function QBi() {
  try {
    return localStorage.getItem(Xpr) || "";
  } catch {
    return "";
  }
}

function YBi(e) {
  try {
    localStorage.setItem(Xpr, e);
  } catch {}
}

function fhn() {
  try {
    const e = localStorage.getItem(Jpr);
    if (!e) return new Set();
    const t = JSON.parse(e);
    return Array.isArray(t) ? new Set(t.map(String)) : new Set();
  } catch {
    return new Set();
  }
}

function XBi(e) {
  try {
    localStorage.setItem(Jpr, JSON.stringify([...e]));
  } catch {}
}

const Zpr = [{
  id: "common_cleanup_v1",
  desc: "修剪过期价格表 / 删除墓碑 / 内存解析缓存",
  everyUpgrade: !0,
  run: async () => {
    await VBi();
  }
}, {
  id: "history_self_heal_v1",
  desc: "历史项 timestamp/缩略图/参考图自愈",
  everyUpgrade: !0,
  run: async () => {
    await DBi();
  }
}, {
  id: "manifest_full_prune_v1",
  desc: "资源缓存 manifest 全量幽灵条目清理",
  everyUpgrade: !0,
  run: async () => {
    try {
      const {
        localCacheManager: e,
        ensureCacheRootReadyForWrite: t
      } = await Ie(async () => {
        const {
          localCacheManager: r,
          ensureCacheRootReadyForWrite: a
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: r,
          ensureCacheRootReadyForWrite: a
        };
      }, void 0, import.meta.url);
      if (!(e.isAvailable() || (await t()))) return;
      await e.ensureManifestLoaded(), await e.pruneMissingManifestAssets({
        force: !0,
        concurrency: 24
      });
    } catch (e) {
      console.warn("[appUpgradeMigration] manifest prune skipped:", e);
    }
  }
}];

async function JBi(e, t) {
  const n = [],
    r = [];
  for (const a of Zpr) {
    const i = t.has(a.id);
    if (!(a.everyUpgrade ? e.isVersionChanged : !i)) {
      r.push(a.id);
      continue;
    }
    try {
      await a.run(e), t.add(a.id), n.push(a.id), console.log(`[appUpgradeMigration] ✅ ${a.id}: ${a.desc}`);
    } catch (s) {
      console.warn(`[appUpgradeMigration] ❌ ${a.id} failed:`, s);
    }
  }
  return {
    ran: n,
    skipped: r
  };
}

let KMe = null;

function ZBi() {
  return KMe || (KMe = (async () => {
    const e = HBi(),
      t = WBi(),
      n = qBi(),
      r = QBi(),
      a = !n && !r,
      s = n !== e || t !== "dev" && r !== t || a,
      l = {
        currentVersion: e,
        previousVersion: n,
        currentBuildId: t,
        previousBuildId: r,
        isFreshInstall: a,
        isVersionChanged: s
      };
    if (!s) {
      const p = fhn();
      if (!Zpr.some(f => !f.everyUpgrade && !p.has(f.id))) return;
    }
    console.log(`[appUpgradeMigration] start: ${n || "<fresh>"} (build ${r || "<fresh>"}) -> ${e} (build ${t})`);
    const d = fhn(),
      {
        ran: u,
        skipped: h
      } = await JBi(l, d);
    XBi(d), KBi(e), YBi(t), console.log(`[appUpgradeMigration] done. ran=${u.length} skipped=${h.length}`);
  })().catch(e => {
    console.warn("[appUpgradeMigration] unexpected error:", e);
  }), KMe);
}

const eFi = Object.freeze(Object.defineProperty({
  __proto__: null,
  runAppUpgradeMigrationsOnStartup: ZBi
}, Symbol.toStringTag, {
  value: "Module"
}));

function Tzt(e) {
  const [t, n] = String(e || "16:9").split(":").map(r => Number(r));
  return !Number.isFinite(t) || !Number.isFinite(n) || t <= 0 || n <= 0 ? 16 / 9 : t / n;
}

function emr(e, t, n, r = .12) {
  const a = Math.max(1, e * (1 - r * 2)),
    i = Math.max(1, t * (1 - r * 2));
  let o = a,
    s = o / n;
  return s > i && (s = i, o = s * n), {
    x: (e - o) / 2,
    y: (t - s) / 2,
    width: o,
    height: s
  };
}

function tmr(e, t) {
  const n = Tzt(t),
    r = e.width,
    a = e.height,
    i = emr(r, a, n, .12),
    o = document.createElement("canvas");
  o.width = Math.max(1, Math.round(i.width)), o.height = Math.max(1, Math.round(i.height));
  const s = o.getContext("2d");
  return s ? (s.drawImage(e, Math.round(i.x), Math.round(i.y), o.width, o.height, 0, 0, o.width, o.height), o.toDataURL("image/png")) : e.toDataURL("image/png");
}

function Mzt(e) {
  var l, d, u, h, p;
  const t = ((l = e.node) == null ? void 0 : l.settings) || {},
    n = String(t._ossThumbnailUrl || t.ossThumbnailUrl || "").trim(),
    r = String(t._ossRemoteUrl || "").trim(),
    a = String(((d = e.node) == null ? void 0 : d.thumbnailUrl) || "").trim(),
    i = String(((u = e.node) == null ? void 0 : u.content) || "").trim(),
    o = String(((h = e.meta) == null ? void 0 : h.src_thumbnail_url) || ((p = e.meta) == null ? void 0 : p.rendered_image_url) || "").trim(),
    s = [n, a, r, i, o];
  if (ua()) {
    for (const m of s) if (nr(m)) return m;
  }
  return n || a || o || i || "";
}

function Pzt(e, t, n) {
  const r = String((t == null ? void 0 : t._ossModelUrl) || "").trim();
  if (ua() && nr(r)) return r;
  const a = String(n || "").trim();
  return ua() && nr(a), a;
}

const tFi = Object.freeze(Object.defineProperty({
    __proto__: null,
    cropCanvasToAspect: tmr,
    getCenteredAspectRect: emr,
    parseAspectRatio: Tzt,
    pickThreeDDisplayImageUrl: Mzt,
    pickThreeDMeshDisplayUrl: Pzt
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  nmr = 1.75,
  Vst = new Map(),
  rmr = "#050505",
  ZJe = {
    ambient: 1.35,
    key: 2.2,
    fill: .9,
    exposure: 1.3,
    background: rmr
  };

function nFi(e) {
  const t = String(e || rmr).trim(),
    n = t.startsWith("#") ? t.slice(1) : t,
    r = n.length === 3 ? n.split("").map(i => i + i).join("") : n,
    a = Number.parseInt(r, 16);
  return Number.isFinite(a) ? a : 328965;
}

async function rFi(e) {
  const t = Vst.get(e);
  if (t) return t.slice(0);
  try {
    const a = await $i(e, {
      method: "GET"
    });
    if (a.ok) {
      const i = await a.arrayBuffer();
      return Vst.set(e, i.slice(0)), i;
    }
  } catch {}
  const n = await fetch(e);
  if (!n.ok) throw new Error(`加载 3D 模型失败（HTTP ${n.status}）`);
  const r = await n.arrayBuffer();
  return Vst.set(e, r.slice(0)), r;
}

function aFi(e, t) {
  return new Promise((n, r) => {
    e.parse(t, "", a => n(a.scene), a => r(a));
  });
}

function amr(e, t) {
  cancelAnimationFrame(0), e.dispose(), e.forceContextLoss(), t.contains(e.domElement) && t.removeChild(e.domElement);
}

function iFi(e, t) {
  const [n, r] = g.useState("loading"),
    [a, i] = g.useState(0),
    o = g.useRef(() => null),
    s = g.useRef(() => {});
  return g.useEffect(() => {
    const l = e.current;
    if (!l || !t) {
      r("error");
      return;
    }
    r("loading");
    let d = !1,
      u = 0,
      h = null;
    const p = new OD();
    p.background = new so(328965);
    const m = new lu(60, 1, .01, 1e3);
    m.position.set(0, 0, 0), m.lookAt(0, 0, -1), m.updateMatrixWorld(!0);
    const f = m.quaternion.clone(),
      y = new FD({
        antialias: !0,
        powerPreference: "high-performance"
      });
    y.setPixelRatio(Math.min(window.devicePixelRatio || 1, nmr)), y.outputColorSpace = Nl, y.toneMapping = epe, y.domElement.className = "absolute inset-0 h-full w-full touch-none", y.domElement.tabIndex = 0, l.appendChild(y.domElement);
    const b = () => {
      const P = Math.max(1, l.clientWidth),
        R = Math.max(1, l.clientHeight);
      y.setSize(P, R, !1), m.aspect = P / R, m.updateProjectionMatrix();
    };
    b();
    const v = new ResizeObserver(b);
    v.observe(l);
    const _ = {
      yaw: 0,
      pitch: 0
    };
    let w = !1,
      k = 0,
      A = 0;
    const S = () => {
        const P = new xp(_.pitch, _.yaw, 0, "YXZ");
        m.quaternion.setFromEuler(P);
      },
      C = P => {
        P.button === 0 && (w = !0, k = P.clientX, A = P.clientY, y.domElement.setPointerCapture(P.pointerId));
      },
      I = P => {
        w && (_.yaw -= (P.clientX - k) * .005, _.pitch = Math.max(-1.2, Math.min(1.2, _.pitch - (P.clientY - A) * .005)), k = P.clientX, A = P.clientY, S());
      },
      E = P => {
        w = !1, y.domElement.hasPointerCapture(P.pointerId) && y.domElement.releasePointerCapture(P.pointerId);
      };
    y.domElement.addEventListener("pointerdown", C), y.domElement.addEventListener("pointermove", I), y.domElement.addEventListener("pointerup", E), y.domElement.addEventListener("pointercancel", E), s.current = () => {
      _.yaw = 0, _.pitch = 0, m.position.set(0, 0, 0), m.quaternion.copy(f);
    }, o.current = () => y.domElement.toDataURL("image/png");
    const M = new sD();
    M.setCrossOrigin("anonymous"), M.load(t, P => {
      if (d) {
        P.dispose();
        return;
      }
      h = P, P.mapping = Dve, P.colorSpace = Nl, p.background = P, r("ready");
    }, void 0, () => {
      d || r("error");
    }), performance.now();
    const T = P => {
      y.render(p, m), u = requestAnimationFrame(T);
    };
    return u = requestAnimationFrame(T), () => {
      d = !0, cancelAnimationFrame(u), v.disconnect(), y.domElement.removeEventListener("pointerdown", C), y.domElement.removeEventListener("pointermove", I), y.domElement.removeEventListener("pointerup", E), y.domElement.removeEventListener("pointercancel", E), h == null || h.dispose(), o.current = () => null, s.current = () => {}, amr(y, l);
    };
  }, [e, t, a]), {
    status: n,
    retry: g.useCallback(() => i(l => l + 1), []),
    resetCamera: g.useCallback(() => s.current(), []),
    capturePhoto: g.useCallback(() => o.current(), [])
  };
}

function oFi(e, t, n = "object", r) {
  const a = String((r == null ? void 0 : r.stillUrl) || "").trim(),
    [i, o] = g.useState(a ? "presenting" : "loading"),
    [s, l] = g.useState(0),
    d = g.useRef(() => null),
    u = g.useRef(() => {}),
    h = g.useRef({
      ...ZJe
    }),
    p = g.useRef(() => {});
  return g.useEffect(() => {
    const m = e.current;
    if (!m || !t) {
      o(t ? a ? "presenting" : "loading" : a ? "ready" : "error");
      return;
    }
    o(a ? "presenting" : "loading");
    let f = !1,
      y = 0,
      b = null;
    const v = new OD(),
      _ = new lu(42, 1, .01, 5e3);
    _.position.set(0, .8, 2.4);
    const w = new FD({
      antialias: !0,
      alpha: !0,
      powerPreference: "high-performance"
    });
    w.setClearColor(0, 0), w.setPixelRatio(1), w.outputColorSpace = Nl, w.toneMapping = epe, w.toneMappingExposure = h.current.exposure, w.domElement.className = "absolute inset-0 h-full w-full touch-none", m.appendChild(w.domElement);
    const k = new ope(16777215, h.current.ambient),
      A = new pT(16777215, h.current.key);
    A.position.set(2.2, 3.4, 2.8);
    const S = new pT(14148863, h.current.fill);
    S.position.set(-2.6, 1.8, -1.6);
    const C = new iKn(16777215, 2765632, .55);
    v.add(k, A, S, C), p.current = j => {
      k.intensity = j.ambient, A.intensity = j.key, S.intensity = j.fill, w.toneMappingExposure = j.exposure;
      const B = nFi(j.background);
      v.background = new so(B), w.setClearColor(B, 1);
    }, p.current(h.current);
    const I = () => {
      const j = Math.max(1, m.clientWidth),
        B = Math.max(1, m.clientHeight);
      w.setSize(j, B, !1), _.aspect = j / B, _.updateProjectionMatrix();
    };
    I();
    const E = new ResizeObserver(I);
    E.observe(m), b = new zve(_, w.domElement), b.enableDamping = !0, b.enablePan = !0, b.enableZoom = !0, b.screenSpacePanning = !0, b.rotateSpeed = .9, b.panSpeed = .8, b.minDistance = .35, b.maxDistance = 24;
    const M = {
      position: _.position.clone(),
      target: b.target.clone()
    };
    u.current = () => {
      _.position.copy(M.position), b == null || b.target.copy(M.target), b == null || b.update();
    }, d.current = j => j ? tmr(w.domElement, j) : w.domElement.toDataURL("image/png");
    const T = new fDt();
    T.setCrossOrigin("anonymous");
    const P = j => {
      const B = new j0().setFromObject(j);
      if (B.isEmpty()) throw new Error("empty mesh");
      const F = B.getSize(new dr()),
        N = B.getCenter(new dr());
      j.position.sub(N);
      const G = Math.max(F.x, F.y, F.z) || 1;
      j.scale.setScalar(1.6 / G), w.setPixelRatio(Math.min(window.devicePixelRatio || 1, nmr)), v.add(j), _.position.set(0, .6, 2.2), b == null || b.target.set(0, 0, 0), M.position.copy(_.position), M.target.copy(b.target), p.current(h.current), o("ready");
    };
    (async () => {
      try {
        const j = await rFi(t);
        if (f) return;
        P(await aFi(T, j));
      } catch {
        if (f) return;
        T.load(t, j => {
          if (!f) try {
            P(j.scene);
          } catch {
            f || o("error");
          }
        }, void 0, () => {
          f || o("error");
        });
      }
    })(), performance.now();
    const R = j => {
      b == null || b.update(), w.render(v, _), y = requestAnimationFrame(R);
    };
    return y = requestAnimationFrame(R), () => {
      f = !0, cancelAnimationFrame(y), E.disconnect(), b == null || b.dispose(), d.current = () => null, u.current = () => {}, p.current = () => {}, amr(w, m);
    };
  }, [e, t, n, s, a]), {
    status: i,
    retry: g.useCallback(() => l(m => m + 1), []),
    resetCamera: g.useCallback(() => u.current(), []),
    capturePhoto: g.useCallback(m => d.current(m), []),
    setLights: g.useCallback(m => {
      h.current = m, p.current(m);
    }, [])
  };
}

const sFi = 4;

function Rzt({
  title: e,
  subtitle: t,
  instructions: n,
  status: r,
  canCreateStudio: a,
  createStudioPending: i,
  onClose: o,
  onRetry: s,
  onResetCamera: l,
  onCreateStudio: d,
  photography: u,
  lighting: h,
  meshLoading: p = !1,
  environmentControls: m,
  children: f
}) {
  on();
  const y = g.useRef(null),
    b = g.useRef(null),
    [v, _] = g.useState(!1),
    [w, k] = g.useState(!1),
    [A, S] = g.useState(!1),
    C = g.useRef(null),
    I = g.useId(),
    E = r === "ready",
    M = E || r === "presenting",
    T = (u == null ? void 0 : u.viewfinderActive) ?? !1;
  g.useEffect(() => {
    var R;
    (R = y.current) == null || R.focus({
      preventScroll: !0
    });
  }, []), g.useEffect(() => {
    const R = y.current;
    if (!R) return;
    const j = N => {
        const G = N.target;
        !(G instanceof HTMLCanvasElement) || !R.contains(G) || N.button !== 0 || (b.current = {
          pointerId: N.pointerId,
          x: N.clientX,
          y: N.clientY
        });
      },
      B = N => {
        const G = b.current;
        !G || G.pointerId !== N.pointerId || Math.hypot(N.clientX - G.x, N.clientY - G.y) < sFi || (b.current = null, _(!0));
      },
      F = N => {
        var G;
        ((G = b.current) == null ? void 0 : G.pointerId) === N.pointerId && (b.current = null), _(!1);
      };
    return document.addEventListener("pointerdown", j, !0), document.addEventListener("pointermove", B, !0), document.addEventListener("pointerup", F, !0), document.addEventListener("pointercancel", F, !0), () => {
      document.removeEventListener("pointerdown", j, !0), document.removeEventListener("pointermove", B, !0), document.removeEventListener("pointerup", F, !0), document.removeEventListener("pointercancel", F, !0);
    };
  }, []), g.useEffect(() => {
    if (k(!1), !E) return;
    const R = window.setTimeout(() => k(!0), 1e3);
    return () => window.clearTimeout(R);
  }, [E, n]), g.useEffect(() => {
    if (!A) return;
    const R = j => {
      var F;
      const B = j.target;
      B instanceof Node && ((F = C.current) != null && F.contains(B) || B instanceof Element && B.closest("[data-three-d-light-toggle]") || document.activeElement instanceof HTMLInputElement && document.activeElement.type === "color" || S(!1));
    };
    return document.addEventListener("pointerdown", R, !0), () => document.removeEventListener("pointerdown", R, !0);
  }, [A]);
  const P = () => {
    if (T) {
      u == null || u.toggleViewfinder();
      return;
    }
    o();
  };
  return c.jsxs("section", {
    ref: y,
    tabIndex: -1,
    "aria-label": `${t}: ${e}`,
    "aria-describedby": I,
    className: "absolute inset-0 overflow-hidden text-white outline-none [&_button]:cursor-pointer",
    style: {
      background: (h == null ? void 0 : h.value.background) || "#050505"
    },
    onMouseDown: R => R.stopPropagation(),
    children: [c.jsx("p", {
      id: I,
      className: "sr-only",
      children: n
    }), c.jsx("div", {
      className: "absolute inset-0",
      children: f
    }), T && u ? c.jsx(lFi, {
      ratio: u.ratio
    }) : null, c.jsx(Yvt, {
      visible: r === "loading",
      detail: "正在加载 3D 预览"
    }), M && p ? c.jsx("div", {
      className: "pointer-events-none absolute inset-x-0 top-16 z-30 flex justify-center",
      children: c.jsx("div", {
        className: `px-3 py-1.5 text-xs ${DA.statusBubble}`,
        children: x("模型加载中…")
      })
    }) : null, c.jsx(Yvt, {
      visible: r === "error",
      failed: !0,
      baseVisualReady: !0,
      detail: "预览无法加载",
      actions: c.jsxs("div", {
        className: "flex items-center gap-2",
        children: [s ? c.jsxs("button", {
          type: "button",
          className: DA.pillButton,
          onClick: s,
          children: [c.jsx(bd, {
            size: 16
          }), x("重试")]
        }) : null, c.jsx("button", {
          type: "button",
          className: DA.iconButton,
          "aria-label": x("关闭"),
          onClick: o,
          children: c.jsx(Na, {
            size: 18
          })
        })]
      })
    }), M ? c.jsxs(c.Fragment, {
      children: [c.jsxs("header", {
        className: "pointer-events-none absolute inset-x-3 top-3 z-30 flex items-center justify-between",
        children: [c.jsx("button", {
          type: "button",
          className: `pointer-events-auto ${DA.iconButton}`,
          "aria-label": x(T ? "关闭取景器" : "关闭"),
          onClick: P,
          children: c.jsx(Mf, {
            size: 20,
            strokeWidth: 1.75
          })
        }), w && !v ? c.jsx("div", {
          className: `pointer-events-none max-w-[min(420px,70vw)] px-4 py-2 text-center text-sm ${DA.statusBubble}`,
          children: n
        }) : c.jsx("div", {}), c.jsx("div", {
          className: "w-10"
        })]
      }), c.jsx("div", {
        className: "pointer-events-none absolute inset-x-3 bottom-32 z-30 flex justify-center",
        children: c.jsx(zEa, {})
      }), c.jsxs("div", {
        className: "pointer-events-none absolute inset-x-0 bottom-3 z-40 px-3",
        children: [h && A ? c.jsx(uFi, {
          panelRef: C,
          value: h.value,
          onChange: h.onChange,
          onClose: () => S(!1)
        }) : null, !T && l ? c.jsx("div", {
          className: "absolute bottom-0 left-3",
          children: c.jsx("button", {
            type: "button",
            className: `pointer-events-auto ${DA.iconButton}`,
            "aria-label": x("恢复默认视角"),
            onClick: l,
            children: c.jsx(mEt, {
              size: 20
            })
          })
        }) : null, T && u ? c.jsx("div", {
          className: "absolute inset-x-3 bottom-16 flex h-12 items-center justify-center",
          children: c.jsxs("div", {
            className: `pointer-events-auto flex items-center gap-2 rounded-full p-1 ${DA.bar}`,
            children: [u.ratios.map(R => c.jsx("button", {
              type: "button",
              className: `h-8 rounded-full px-3 text-xs ${u.ratio === R ? "bg-white text-black" : "text-white/80"}`,
              onClick: () => u.setRatio(R),
              children: R
            }, R)), c.jsx("button", {
              type: "button",
              className: DA.iconButton,
              "aria-label": x("拍照到画布"),
              disabled: u.capturing || !E,
              onClick: u.capture,
              children: c.jsx(Kh, {
                size: 18
              })
            })]
          })
        }) : null, c.jsx("div", {
          className: "flex h-12 items-center justify-center",
          children: c.jsxs("div", {
            className: "pointer-events-auto flex max-w-[calc(100vw-7rem)] items-center gap-2",
            children: [u ? c.jsxs("button", {
              type: "button",
              className: DA.pillButton,
              "aria-pressed": T,
              onClick: u.toggleViewfinder,
              children: [T ? c.jsx($d, {
                size: 16
              }) : c.jsx(ul, {
                size: 16
              }), x("取景器")]
            }) : null, h ? c.jsxs("button", {
              type: "button",
              "data-three-d-light-toggle": "",
              className: `${DA.pillButton} ${A ? "bg-white/12 text-white" : ""}`,
              "aria-pressed": A,
              onClick: () => S(R => !R),
              children: [c.jsx(AD, {
                size: 16
              }), x("光源")]
            }) : null, m, d ? c.jsx("button", {
              type: "button",
              className: DA.pillButton,
              disabled: !a || i,
              onClick: d,
              children: x(i ? "正在导入导演台" : "导入3D导演台")
            }) : null]
          })
        })]
      })]
    }) : null]
  });
}

function lFi({
  ratio: e
}) {
  on();
  const t = Tzt(e);
  return c.jsx("div", {
    className: "pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-[8%] py-[12%]",
    children: c.jsxs("div", {
      className: "relative max-h-full max-w-full border border-white/85",
      style: {
        aspectRatio: `${t}`,
        width: t >= 1 ? "min(78vw, calc((100vh - 12rem) * " + t + "))" : "auto",
        height: t < 1 ? "min(68vh, calc((100vw - 8rem) / " + t + "))" : "auto",
        boxShadow: "0 0 0 9999px rgba(0,0,0,0.58)"
      },
      children: [c.jsx("span", {
        className: "absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-white"
      }), c.jsx("span", {
        className: "absolute -right-px -top-px h-6 w-6 border-r-2 border-t-2 border-white"
      }), c.jsx("span", {
        className: "absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-white"
      }), c.jsx("span", {
        className: "absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-white"
      })]
    })
  });
}

const cFi = [{
    id: "soft",
    label: "柔和",
    value: {
      ambient: 1.8,
      key: 1.2,
      fill: 1.1,
      exposure: 1.15
    }
  }, {
    id: "standard",
    label: "标准",
    value: ZJe
  }, {
    id: "bright",
    label: "明亮",
    value: {
      ambient: 1.7,
      key: 3.1,
      fill: 1.4,
      exposure: 1.55
    }
  }, {
    id: "studio",
    label: "影棚",
    value: {
      ambient: .55,
      key: 3.4,
      fill: .35,
      exposure: 1.2
    }
  }],
  dFi = [{
    id: "black",
    label: "纯黑",
    value: "#000000"
  }, {
    id: "dark",
    label: "深灰",
    value: "#1a1a1a"
  }, {
    id: "studio",
    label: "影棚",
    value: "#2b2b30"
  }, {
    id: "gray",
    label: "浅灰",
    value: "#d6d6d6"
  }, {
    id: "white",
    label: "纯白",
    value: "#ffffff"
  }, {
    id: "warm",
    label: "暖灰",
    value: "#e8e2d6"
  }];

function uFi({
  panelRef: e,
  value: t,
  onChange: n,
  onClose: r
}) {
  on();
  const a = (i, o) => {
    n({
      ...t,
      [i]: o
    });
  };
  return c.jsxs("div", {
    ref: e,
    className: `pointer-events-auto absolute bottom-16 left-1/2 z-50 w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl px-3 py-2.5 ${DA.bar}`,
    onMouseDown: i => i.stopPropagation(),
    onPointerDown: i => i.stopPropagation(),
    children: [c.jsxs("div", {
      className: "mb-2 flex items-center justify-between",
      children: [c.jsx("div", {
        className: "text-[12px] text-white/80",
        children: x("光源调节")
      }), c.jsx("button", {
        type: "button",
        className: "text-[11px] text-white/45 hover:text-white/80",
        onClick: r,
        children: x("收起")
      })]
    }), c.jsxs("div", {
      className: "mb-2 flex gap-1",
      children: [cFi.map(i => c.jsx("button", {
        type: "button",
        className: "h-6 rounded-full px-2 text-[10px] text-white/55 hover:bg-white/8 hover:text-white/85",
        onClick: () => n({
          ...t,
          ...i.value
        }),
        children: x(i.label)
      }, i.id)), c.jsx("button", {
        type: "button",
        className: "h-6 rounded-full px-2 text-[10px] text-white/45 hover:bg-white/8 hover:text-white/80",
        onClick: () => n({
          ...ZJe
        }),
        children: x("重置")
      })]
    }), c.jsx(QMe, {
      label: x("环境"),
      value: t.ambient,
      min: 0,
      max: 4,
      onChange: i => a("ambient", i)
    }), c.jsx(QMe, {
      label: x("主光"),
      value: t.key,
      min: 0,
      max: 5,
      onChange: i => a("key", i)
    }), c.jsx(QMe, {
      label: x("补光"),
      value: t.fill,
      min: 0,
      max: 3,
      onChange: i => a("fill", i)
    }), c.jsx(QMe, {
      label: x("曝光"),
      value: t.exposure,
      min: .4,
      max: 2.4,
      onChange: i => a("exposure", i)
    }), c.jsxs("div", {
      className: "mt-2 flex items-center gap-2",
      children: [c.jsx("span", {
        className: "w-8 shrink-0 text-[11px] text-white/50",
        children: x("背景")
      }), c.jsxs("div", {
        className: "flex min-w-0 flex-1 items-center gap-1.5",
        children: [dFi.map(i => c.jsx("button", {
          type: "button",
          title: x(i.label),
          className: `h-4 w-4 rounded-full border ${t.background.toLowerCase() === i.value ? "border-white" : "border-white/25"}`,
          style: {
            background: i.value
          },
          onClick: () => n({
            ...t,
            background: i.value
          })
        }, i.id)), c.jsxs("label", {
          className: "relative ml-auto h-5 w-5 overflow-hidden rounded-full border border-white/30",
          children: [c.jsx("span", {
            className: "absolute inset-0",
            style: {
              background: t.background
            }
          }), c.jsx("input", {
            type: "color",
            value: t.background,
            className: "absolute inset-0 cursor-pointer opacity-0",
            onChange: i => n({
              ...t,
              background: i.target.value
            })
          })]
        })]
      })]
    }), c.jsx("style", {
      children: hFi
    })]
  });
}

const hFi = `
.three-d-light-slider {
    -webkit-appearance: none;
    appearance: none;
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,0.18);
    outline: none;
}
.three-d-light-slider::-webkit-slider-runnable-track {
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,0.18);
}
.three-d-light-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    margin-top: -4px;
    border-radius: 999px;
    border: 0;
    background: #fff;
    box-shadow: none;
}
.three-d-light-slider::-moz-range-track {
    height: 2px;
    border: 0;
    border-radius: 999px;
    background: rgba(255,255,255,0.18);
}
.three-d-light-slider::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border: 0;
    border-radius: 999px;
    background: #fff;
    box-shadow: none;
}
`;

function QMe({
  label: e,
  value: t,
  min: n,
  max: r,
  onChange: a
}) {
  return on(), c.jsxs("label", {
    className: "mb-1.5 flex items-center gap-2 last:mb-0",
    children: [c.jsx("span", {
      className: "w-8 shrink-0 text-[11px] text-white/50",
      children: e
    }), c.jsx("input", {
      type: "range",
      min: n,
      max: r,
      step: .05,
      value: t,
      className: "three-d-light-slider min-w-0 flex-1",
      onChange: i => a(Number(i.target.value))
    }), c.jsx("span", {
      className: "w-7 shrink-0 text-right text-[10px] tabular-nums text-white/40",
      children: t.toFixed(1)
    })]
  });
}

const pFi = ["radial-gradient(ellipse 75% 92% at center,", "rgba(255,255,255,0.09) 0%,", "rgba(255,255,255,0.06) 24%,", "rgba(255,255,255,0.028) 52%,", "rgba(255,255,255,0.012) 72%,", "rgba(255,255,255,0.004) 88%,", "rgba(255,255,255,0) 100%)"].join(" ");

function eZe() {
  return on(), c.jsx("div", {
    "aria-hidden": !0,
    "data-testid": "three-d-node-ambient-halo",
    className: "pointer-events-none absolute inset-0 rounded-[inherit]",
    style: {
      background: pFi
    }
  });
}

const mFi = g.memo(function ({
  hasContent: t,
  isObject: n,
  isDark: r = !0,
  renderedImageUrl: a,
  thumbnailUrl: i,
  thumbnailScale: o = 1,
  contentInset: s = 12,
  title: l,
  onOpenPreview: d
}) {
  on();
  const u = o * 100,
    h = s;
  return c.jsx("div", {
    "data-three-d-node-surface": "",
    "data-compact-gen-preview": !0,
    className: ["relative h-full w-full overflow-hidden rounded-[inherit] text-left", t ? "bg-[#0D0D0D]" : "bg-transparent", d && t ? "cursor-zoom-in" : "cursor-default"].join(" "),
    onClick: () => {
      t && (d == null || d());
    },
    children: t && n ? c.jsxs(c.Fragment, {
      children: [c.jsx(eZe, {}), a ? c.jsx("img", {
        src: a,
        alt: l || "3D Object",
        decoding: "async",
        className: "pointer-events-none absolute inset-0 h-full w-full object-contain p-[10%] drop-shadow-[0_16px_26px_rgba(0,0,0,0.34)]"
      }) : null]
    }) : t ? c.jsxs(c.Fragment, {
      children: [c.jsx("img", {
        src: i,
        alt: "",
        "aria-hidden": !0,
        decoding: "async",
        className: "absolute top-0 left-0 max-w-none",
        style: {
          width: `${u}%`,
          height: `${u}%`,
          transformOrigin: "0 0",
          filter: "blur(4px) brightness(1.8)"
        }
      }), c.jsxs("div", {
        className: "absolute overflow-hidden",
        style: {
          inset: h,
          borderRadius: "inherit"
        },
        children: [c.jsx("img", {
          src: i,
          alt: l || "3D World",
          decoding: "async",
          className: "absolute max-w-none",
          style: {
            top: -h,
            left: -h,
            width: `calc(${u}% + ${h * 2}px)`,
            height: `calc(${u}% + ${h * 2}px)`,
            transformOrigin: "0 0"
          }
        }), c.jsx("div", {
          className: "absolute inset-0 rounded-[inherit] backdrop-blur-[3px] backdrop-brightness-[0.8]"
        })]
      })]
    }) : c.jsx("div", {
      className: "flex h-full w-full items-center justify-center",
      children: c.jsx(Hm, {
        size: 44,
        className: r ? "text-zinc-600" : "text-zinc-400"
      })
    })
  });
});

function fFi({
  entering: e = !1,
  onEnterStudio: t,
  zoom: n,
  label: r = "进入片场"
}) {
  on();
  const a = Math.max(12, Math.min(12 / Math.max(n, .01), 60)),
    i = Math.min(a / 12, 1.25),
    o = 32 * i,
    s = 6 * i;
  return c.jsx("div", {
    "data-testid": "three-d-studio-cover-surface",
    className: "relative h-full w-full overflow-hidden rounded-[inherit] bg-[#0D0D0D]",
    children: c.jsxs("div", {
      className: "relative z-[1] flex h-full w-full items-center justify-center px-4",
      children: [c.jsx(eZe, {}), c.jsxs("div", {
        className: "relative z-[1] flex max-w-full flex-col items-center text-white/55",
        style: {
          gap: 14
        },
        children: [c.jsx("div", {
          className: "relative flex h-12 w-12 shrink-0 items-center justify-center",
          children: c.jsx(Hm, {
            size: 48,
            strokeWidth: 1.4
          })
        }), c.jsx("button", {
          type: "button",
          "aria-busy": e,
          disabled: !t || e,
          onClick: l => {
            l.stopPropagation(), t == null || t();
          },
          onMouseDown: l => l.stopPropagation(),
          className: "nodrag nopan relative z-[1] max-w-full shrink-0 overflow-hidden border border-white/10 bg-white/[0.06] text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50",
          style: {
            borderRadius: s,
            fontSize: 12 * i,
            height: o,
            paddingInline: 12 * i
          },
          children: c.jsx("span", {
            className: "min-w-0 truncate",
            children: e ? x("正在打开…") : r
          })
        })]
      })]
    })
  });
}

const gFi = ["16:9", "3:2", "1:1", "9:16"];

function imr(e, t) {
  const [n, r] = g.useState(!1),
    [a, i] = g.useState(!1),
    [o, s] = g.useState("16:9");
  return {
    viewfinderActive: n,
    capturing: a,
    ratio: o,
    ratios: gFi,
    setRatio: s,
    toggleViewfinder: () => r(l => !l),
    capture: () => {
      if (a) return;
      const l = e(o);
      l && (i(!0), t(l, o), window.setTimeout(() => i(!1), 400));
    }
  };
}

function yFi({
  entry: e,
  onClose: t,
  onCapture: n
}) {
  on();
  const r = g.useRef(null),
    a = iFi(r, e.src),
    i = imr(a.capturePhoto, (o, s) => n(o, s, e.title));
  return c.jsx(Rzt, {
    title: e.title,
    subtitle: "3D 全景预览",
    instructions: "拖拽即可环视，滚轮可缩放",
    status: a.status,
    onClose: t,
    onRetry: a.retry,
    onResetCamera: a.resetCamera,
    photography: i,
    children: c.jsx("section", {
      ref: r,
      className: "absolute inset-0",
      "aria-label": x("全景预览视口")
    })
  });
}

function bFi({
  entry: e,
  onClose: t,
  onCreateStudio: n,
  createStudioPending: r,
  onCapture: a
}) {
  on();
  const i = g.useRef(null),
    [o, s] = g.useState(ZJe),
    l = WLn(e.sourceMeta),
    d = Pzt(e.sourceMeta, void 0, (l == null ? void 0 : l.kind) === "glb" ? l.url : _X(e.sourceMeta)),
    u = Mzt({
      meta: e.sourceMeta
    }) || e.sourceMeta.rendered_image_url || e.sourceMeta.src_thumbnail_url,
    h = oFi(i, d, e.resourceKind, {
      stillUrl: u
    }),
    p = imr(h.capturePhoto, (y, b) => a(y, b, e.title)),
    m = e.resourceKind === "object",
    f = d ? h.status : u || (l == null ? void 0 : l.kind) === "spz" ? "ready" : "error";
  return g.useEffect(() => {
    h.setLights(o);
  }, [o, h.setLights]), c.jsxs(Rzt, {
    title: e.title,
    subtitle: m ? "3D 物体预览" : "3D 场景预览",
    instructions: m ? "拖拽旋转，右键或中键平移，滚轮缩放" : "拖拽环视，右键平移，滚轮缩放",
    status: f,
    canCreateStudio: !!(e.canCreateStudio && d),
    createStudioPending: r,
    onClose: t,
    onRetry: d ? h.retry : void 0,
    onResetCamera: d ? h.resetCamera : void 0,
    onCreateStudio: n,
    photography: d ? p : void 0,
    lighting: d ? {
      value: o,
      onChange: s
    } : void 0,
    meshLoading: !!(d && f !== "ready" && f !== "error"),
    children: [u ? c.jsxs("div", {
      className: "absolute inset-0",
      style: {
        background: o.background
      },
      children: [c.jsx(eZe, {}), c.jsx("img", {
        src: u,
        alt: e.title,
        className: "absolute inset-0 h-full w-full object-contain p-[6%] drop-shadow-[0_16px_26px_rgba(0,0,0,0.34)]"
      })]
    }) : null, d ? c.jsx("section", {
      ref: i,
      className: "absolute inset-0",
      "aria-label": x("3D 资产预览视口")
    }) : u ? null : c.jsxs("div", {
      className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black text-white/50",
      children: [c.jsx(Hm, {
        size: 48
      }), c.jsx("p", {
        className: "max-w-sm text-center text-sm",
        children: (l == null ? void 0 : l.kind) === "spz" ? x("高斯泼溅资源已就绪，接上渲染器后即可交互预览。") : x("还没有可预览的 glb / 渲染图。接上生成 API 后这里会显示模型。")
      })]
    })]
  });
}

function vFi({
  entry: e,
  onClose: t
}) {
  on();
  const n = e.sourceSnapshot.rendered_image_url || e.sourceSnapshot.src_thumbnail_url;
  return c.jsx(Rzt, {
    title: e.title,
    subtitle: "3D 片场",
    instructions: "在本机编辑场景、保存工程并导出 GLB",
    status: "ready",
    onClose: t,
    children: c.jsxs("div", {
      className: "absolute inset-0 bg-[#0D0D0D]",
      children: [c.jsx(eZe, {}), n ? c.jsx("img", {
        src: n,
        alt: e.title,
        className: "absolute inset-0 h-full w-full object-cover opacity-40 blur-sm"
      }) : null, c.jsxs("div", {
        className: "absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70",
        children: [c.jsx(Hm, {
          size: 56,
          strokeWidth: 1.4
        }), c.jsx("div", {
          className: "text-lg font-medium text-white",
          children: "3D Studio"
        }), c.jsx("p", {
          className: "max-w-md px-6 text-center text-sm text-white/55",
          children: x("添加几何物体，调整位置、旋转、尺寸与材质。场景保存在本机。")
        }), c.jsx("button", {
          className: "rounded-lg bg-lime-300 px-5 py-3 font-medium text-black hover:bg-lime-200",
          onClick: () => { t(); window.dispatchEvent(new CustomEvent("aiyouplus-open-local", { detail: { tab: "world" } })); },
          children: "打开本地 3D 场景编辑器"
        })]
      })]
    })
  });
}

function wFi() {
  const [e, t] = g.useState(!1),
    n = g.useCallback(async r => {
      if (!e) {
        t(!0);
        try {
          await r();
        } finally {
          t(!1);
        }
      }
    }, [e]);
  return {
    pending: e,
    run: n
  };
}

const Nzt = Object.freeze(Object.defineProperty({
    __proto__: null,
    ThreeDAssetPreview: bFi,
    ThreeDPanoramaPreview: yFi,
    ThreeDStudioPreview: vFi,
    useCreateStudioPending: wFi
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  zye = e => {
    if (!e) return "0 B";
    const t = 1024,
      n = ["B", "KB", "MB", "GB", "TB"],
      r = Math.min(n.length - 1, Math.floor(Math.log(e) / Math.log(t)));
    return `${parseFloat((e / Math.pow(t, r)).toFixed(2))} ${n[r]}`;
  };

function xFi(e, t = []) {
  const [n, r] = g.useState({
      totalSize: 0,
      count: 0,
      formattedSize: "0 B"
    }),
    [a, i] = g.useState({
      totalSize: 0,
      count: 0,
      formattedSize: "0 B",
      freeBytes: 0,
      lowSpace: !1
    }),
    [o, s] = g.useState(!1),
    [l, d] = g.useState(!1),
    [u, h] = g.useState(null),
    [p, m] = g.useState(null),
    [f, y] = g.useState(""),
    [b, v] = g.useState(!1),
    {
      config: _,
      selectDirectory: w,
      setEnabled: k,
      syncHistory: A,
      manager: S
    } = wEn(),
    [C, I] = g.useState(!1),
    [E, M] = g.useState(null),
    [T, P] = g.useState(() => ubt()),
    [R, j] = g.useState(!1),
    [B, F] = g.useState(null),
    [N, G] = g.useState(() => nxe());
  g.useEffect(() => {
    const q = () => G(nxe());
    return window.addEventListener(_Le, q), () => window.removeEventListener(_Le, q);
  }, []), g.useEffect(() => {
    if (!e) return;
    const q = 8e3;
    (async () => {
      s(!0);
      try {
        const de = async () => {
            const [pe, ce, we] = await Promise.all([ni.getStorageUsage().catch(ie => (console.error("[StorageSettings] Failed to load assetStore usage:", ie), {
              totalSize: 0,
              count: 0
            })), Er.getStats().catch(ie => (console.error("[StorageSettings] Failed to load contentStore stats:", ie), {
              totalSize: 0,
              count: 0
            })), Wd.getStorageUsage().catch(ie => (console.error("[StorageSettings] Failed to load thumbnailStore usage:", ie), {
              totalSize: 0,
              count: 0
            }))]);
            let Z = {
              ...S.getStats(),
              freeBytes: 0,
              lowSpace: !1
            };
            const re = S.getDirectoryPathTauri();
            if (re) try {
              const ie = await Fr("get_cache_disk_usage", {
                path: re
              });
              Z = {
                totalSize: ie.totalSize,
                count: ie.fileCount,
                formattedSize: zye(ie.totalSize),
                freeBytes: ie.freeBytes,
                lowSpace: ie.lowSpace
              };
            } catch {}
            i(Z);
            const fe = (pe.totalSize || 0) + (ce.totalSize || 0) + (we.totalSize || 0),
              ye = (pe.count || 0) + (ce.count || 0) + (we.count || 0);
            return {
              totalSize: fe,
              count: ye,
              formattedSize: zye(fe)
            };
          },
          le = new Promise(pe => {
            setTimeout(() => pe({
              totalSize: 0,
              count: 0,
              formattedSize: "0 B"
            }), q);
          }),
          J = await Promise.race([de(), le]);
        r(J);
      } catch (de) {
        console.error("[StorageSettings] Failed to load storage usage:", de), r({
          totalSize: 0,
          count: 0,
          formattedSize: "0 B"
        });
      } finally {
        s(!1);
      }
    })();
  }, [e, S]);
  const z = g.useCallback(async () => {
      await w();
    }, [w]),
    V = g.useCallback(async () => {
      if (!(!_.enabled || !t || t.length === 0)) {
        I(!0), M(null);
        try {
          await A(t), M(`已同步 ${t.length} 条历史记录到本地缓存`), setTimeout(() => M(null), 3e3);
        } catch (q) {
          M("同步失败：" + (q instanceof Error ? q.message : String(q))), setTimeout(() => M(null), 5e3);
        } finally {
          I(!1);
        }
      }
    }, [_.enabled, t, A]);
  g.useEffect(() => {
    if (!e) return;
    const q = localStorage.getItem("qiaodoumayi_download_directory");
    y(q || "AIYOUPLUS_Media");
  }, [e]);
  const O = g.useCallback(async q => {
      if (q != null && q.trim()) try {
        await Fr("open_folder_in_explorer", {
          path: q.trim()
        });
      } catch (ne) {
        const de = ne instanceof Error ? ne.message : String(ne);
        alert(de.includes("Cannot find module") || de.includes("tauri") ? x("此功能需在桌面应用中运行，请使用 Tauri 启动。") : x("打开文件夹失败：{0}", de));
      }
    }, []),
    L = g.useCallback(async () => {
      const ne = ((await vEn()) || _.directoryPath || "").trim();
      if (!ne) {
        alert(x("未配置资源缓存目录"));
        return;
      }
      await O(ne);
    }, [_.directoryPath, O]),
    D = async () => {
      v(!0);
      try {
        const q = await WE({
          directory: !0,
          multiple: !1,
          title: "选择下载目录"
        });
        if (q && typeof q == "string") {
          try {
            await Fp(q);
          } catch (ne) {
            console.warn("[StorageSettings] 目录访问测试失败，但继续保存:", ne);
          }
          localStorage.setItem("qiaodoumayi_download_directory", q), y(q), alert(x(`下载目录设置成功！

目录：{0}

注意：如果下载时遇到权限问题，请选择系统默认目录（如文档、下载等）。`, q));
        }
      } catch (q) {
        const ne = q instanceof Error ? q.message : String(q);
        ne.includes("not allowed") || ne.includes("Permissions") ? alert(x(`权限错误：对话框功能未授权

请确保：
1. 已重启 Tauri 开发服务器
2. capabilities/default.json 包含 dialog 权限
3. 如果是打包版本，请重新打包

错误详情：{0}`, ne)) : ne.includes("Cannot find module") ? alert(x(`此功能需要在 Tauri 桌面应用中使用。

当前环境：浏览器模式
请使用 "npm run tauri dev" 启动桌面应用。`)) : alert(x("选择目录失败：{0}", ne));
      } finally {
        v(!1);
      }
    },
    U = g.useRef(0),
    H = g.useRef(null);
  g.useEffect(() => {
    if (!e) return;
    const q = async () => {
      try {
        const {
            memoryMonitor: de
          } = await Ie(async () => {
            const {
              memoryMonitor: X
            } = await Promise.resolve().then(() => eEe);
            return {
              memoryMonitor: X
            };
          }, void 0, import.meta.url),
          le = de.getMemoryUsage();
        if (!le) return;
        U.current += 1;
        const J = {
            used: le.used,
            total: le.total
          },
          pe = H.current,
          ce = U.current % 3 === 0,
          we = pe ? Math.abs(le.ratio - pe.used / pe.total) : 1;
        (!pe || ce || we >= .03) && (H.current = J, h(le));
        try {
          const {
            getSystemMemoryInfo: X
          } = await Ie(async () => {
            const {
              getSystemMemoryInfo: Z
            } = await Promise.resolve().then(() => nIt);
            return {
              getSystemMemoryInfo: Z
            };
          }, void 0, import.meta.url);
          m(await X());
        } catch (X) {
          console.warn("[StorageSettings] Failed to get system memory info:", X);
        }
      } catch (de) {
        console.error("[StorageSettings] Failed to get memory usage:", de);
      }
    };
    q();
    const ne = setInterval(q, 5e3);
    return () => clearInterval(ne);
  }, [e]);
  const Y = async () => {
      if (!(n.count === 0 || o)) {
        s(!0);
        try {
          await Promise.all([ni.clearAll().catch(q => {
            console.error("[StorageSettings] Failed to clear assetStore:", q);
          }), Er.clear().catch(q => {
            console.error("[StorageSettings] Failed to clear contentStore:", q);
          }), Wd.clear().catch(q => {
            console.error("[StorageSettings] Failed to clear thumbnailStore:", q);
          })]), Er.clearMemoryCache(), Wd.clearMemoryCache(), r({
            totalSize: 0,
            count: 0,
            formattedSize: "0 B"
          });
        } catch (q) {
          console.error("[StorageSettings] Failed to clear cache:", q);
        } finally {
          s(!1);
        }
      }
    },
    K = async () => {
      if (!(!S.isAvailable() || l || o) && confirm(x(`确定要清理派生磁盘缓存吗？

将删除 thumbnails/ 下可重建的缩略图与预览，不会删除 local/ 用户原图、images/videos/audio 主素材，也不会删除 project management 项目目录。
清理后缩略图会在下次打开时按需重新生成。`))) {
        d(!0);
        try {
          await Ur.flushPendingAssets();
          const q = await Ur.clearDerivedDiskCache(),
            ne = S.getDirectoryPathTauri();
          if (ne) try {
            const de = await Fr("get_cache_disk_usage", {
              path: ne
            });
            i({
              totalSize: de.totalSize,
              count: de.fileCount,
              formattedSize: zye(de.totalSize),
              freeBytes: de.freeBytes,
              lowSpace: de.lowSpace
            });
          } catch {
            const de = S.getStats();
            i(le => ({
              ...le,
              count: de.count,
              totalSize: de.totalSize,
              formattedSize: de.formattedSize
            }));
          }
          alert(x("派生磁盘缓存已清理：移除 {0} 条索引，约释放 {1}。", q.removedAssets, zye(q.freedBytes)));
        } catch (q) {
          console.error("[StorageSettings] Failed to clear derived disk cache:", q), alert(x("清理失败：{0}", q instanceof Error ? q.message : String(q)));
        } finally {
          d(!1);
        }
      }
    },
    W = async () => {
      j(!0), F(null);
      try {
        const {
            memoryCleanupDebugger: q
          } = await Ie(async () => {
            const {
              memoryCleanupDebugger: de
            } = await Promise.resolve().then(() => K2o);
            return {
              memoryCleanupDebugger: de
            };
          }, void 0, import.meta.url),
          ne = await q.cleanupMemory();
        if (ne.before && ne.after) {
          const de = ne.gcAvailable ? "（等效 DevTools 拍快照的 Major GC）" : "（当前环境无 window.gc，已尽力释放缓存引用；Tauri 窗口内可强制 Major GC）";
          F(`内存清理完成：释放了 ${ne.freedMB.toFixed(2)} MB (${ne.before.jsHeapUsedMB.toFixed(1)}MB → ${ne.after.jsHeapUsedMB.toFixed(1)}MB)${de}`);
          const le = await q.getMemoryStats();
          if (le) {
            const J = le.jsHeapUsed / le.jsHeapLimit;
            h({
              used: le.jsHeapUsed,
              total: le.jsHeapLimit,
              ratio: J,
              formatted: `${le.jsHeapUsedMB.toFixed(1)} MB / ${le.jsHeapLimitMB.toFixed(1)} MB (${(J * 100).toFixed(1)}%)`
            });
          }
        } else F("内存清理成功（已释放缓存与 WebGL contexts）");
      } catch (q) {
        console.error("[StorageSettings] Failed to cleanup memory:", q), F(`清理失败: ${q instanceof Error ? q.message : "未知错误"}`);
      } finally {
        j(!1);
      }
    },
    Q = q => {
      $ya(q), P(q);
    };
  return {
    storageUsage: n,
    diskCacheUsage: a,
    isLoading: o,
    isClearingDerivedDisk: l,
    memoryUsage: u,
    systemMemoryInfo: p,
    downloadDirectory: f,
    isSelectingDirectory: b,
    cacheConfig: _,
    cacheManager: S,
    isSyncingHistory: C,
    cacheSyncResult: E,
    projectMgrAutosaveEnabled: T,
    isCleaningMemory: R,
    memoryCleanupResult: B,
    isNativeShell: o3(),
    cacheReady: _.enabled && Ur.isAvailable(),
    cacheNeedsAuth: _.enabled && !Ur.isAvailable(),
    cacheLocationUnavailable: N,
    handleSelectCacheDirectory: z,
    handleSyncHistory: V,
    handleOpenFolder: O,
    handleOpenResourceCacheRootFolder: L,
    handleSelectDownloadDirectory: D,
    handleClearAll: Y,
    handleClearDerivedDiskCache: K,
    handleCleanupMemory: W,
    handleToggleProjectAutosave: Q,
    setCacheEnabled: k
  };
}

const ghn = ({
    history: e = [],
    active: t = !0
  }) => {
    on();
    const n = xFi(t, e);
    return c.jsxs("div", {
      className: "space-y-7",
      children: [c.jsxs($u, {
        title: x("资源缓存目录"),
        description: x("按目录独立保存对话、项目与生成文件。更换后刷新界面，不复制或合并旧数据；切回原目录即可查看。"),
        action: c.jsxs(c.Fragment, {
          children: [c.jsx("button", {
            type: "button",
            className: "settings-pill-btn",
            onClick: () => void n.handleSelectCacheDirectory(),
            children: n.cacheNeedsAuth ? c.jsxs(c.Fragment, {
              children: [c.jsx(KRr, {
                size: 13,
                strokeWidth: 1.75
              }), x("重新授权")]
            }) : c.jsxs(c.Fragment, {
              children: [c.jsx(Sc, {
                size: 13,
                strokeWidth: 1.75
              }), n.cacheLocationUnavailable ? x("连接此文件夹") : n.cacheConfig.directoryPath ? x("更换位置") : x("选择缓存目录")]
            })
          }), n.cacheConfig.directoryPath ? c.jsxs("button", {
            type: "button",
            className: "settings-pill-btn",
            onClick: () => void n.handleOpenResourceCacheRootFolder(),
            children: [c.jsx(S5, {
              size: 13,
              strokeWidth: 1.75
            }), x("打开文件夹")]
          }) : null]
        }),
        children: [n.cacheLocationUnavailable ? c.jsxs("div", {
          className: "settings-notice is-warn",
          children: [c.jsx(eRe, {
            size: 14,
            className: "shrink-0 mt-0.5",
            strokeWidth: 1.75
          }), c.jsxs("span", {
            children: [x("已设置的缓存位置当前不可用（"), n.cacheLocationUnavailable, x("）。请重新连接磁盘，或连接此文件夹。原数据不会被删除。")]
          })]
        }) : null, n.cacheNeedsAuth ? c.jsxs("div", {
          className: "settings-notice is-warn",
          children: [c.jsx(eRe, {
            size: 14,
            className: "shrink-0 mt-0.5",
            strokeWidth: 1.75
          }), c.jsx("span", {
            children: x("页面刷新后目录访问权限已丢失，请重新授权缓存目录。")
          })]
        }) : null, c.jsx("div", {
          className: "settings-path-field",
          children: n.cacheConfig.directoryPath || x("未选择")
        })]
      }), c.jsx($u, {
        title: x("下载目录"),
        description: x("顶栏下载所选素材时使用的保存位置。"),
        action: c.jsxs(c.Fragment, {
          children: [c.jsxs("button", {
            type: "button",
            className: "settings-pill-btn",
            disabled: n.isSelectingDirectory,
            onClick: () => void n.handleSelectDownloadDirectory(),
            children: [n.isSelectingDirectory ? c.jsx(Ua, {
              size: 13,
              className: "animate-spin"
            }) : c.jsx(Sc, {
              size: 13,
              strokeWidth: 1.75
            }), n.isSelectingDirectory ? x("选择中...") : x("更改位置")]
          }), n.downloadDirectory && n.downloadDirectory !== "AIYOUPLUS_Media" ? c.jsxs("button", {
            type: "button",
            className: "settings-pill-btn",
            onClick: () => void n.handleOpenFolder(n.downloadDirectory),
            children: [c.jsx(S5, {
              size: 13,
              strokeWidth: 1.75
            }), x("打开文件夹")]
          }) : null]
        }),
        children: c.jsx("div", {
          className: "settings-path-field",
          children: n.downloadDirectory || x("未设置（使用默认目录）")
        })
      }), c.jsx($u, {
        title: x("项目管理自动保存"),
        description: x("在资源缓存目录的 project management 文件夹中自动保存项目。"),
        action: c.jsx(Rj, {
          checked: n.projectMgrAutosaveEnabled,
          onChange: n.handleToggleProjectAutosave,
          label: x("项目管理自动保存")
        })
      }), c.jsxs($u, {
        title: x("内存管理"),
        description: n.memoryUsage ? x("JavaScript 堆内存 {0}{1}", n.memoryUsage.formatted, n.systemMemoryInfo ? ` · ${n.isNativeShell ? "系统总内存" : "系统总内存（Rust 后端可用）"} ${n.systemMemoryInfo.total_memory_gb.toFixed(2)} GB` : "") : x("释放 WebGL 与内存缓存。"),
        action: c.jsxs("button", {
          type: "button",
          className: "settings-pill-btn",
          disabled: n.isCleaningMemory,
          onClick: () => void n.handleCleanupMemory(),
          children: [n.isCleaningMemory ? c.jsx(Ua, {
            size: 13,
            className: "animate-spin"
          }) : c.jsx(Qo, {
            size: 13,
            strokeWidth: 1.75
          }), n.isCleaningMemory ? x("清理中...") : x("清理内存")]
        }),
        children: [n.memoryUsage ? c.jsx("div", {
          className: "settings-progress-track",
          children: c.jsx("div", {
            className: "settings-progress-fill",
            style: {
              width: `${Math.min(n.memoryUsage.ratio * 100, 100)}%`
            }
          })
        }) : null, n.memoryCleanupResult ? c.jsx("div", {
          className: "settings-notice",
          children: n.memoryCleanupResult
        }) : null]
      }), c.jsxs($u, {
        title: x("存储使用情况"),
        description: x("浏览器 IDB 缓存与本地缓存目录占用。不会自动删除本地素材。"),
        action: n.isLoading ? c.jsxs("span", {
          className: "settings-pref-desc flex items-center gap-1",
          children: [c.jsx(Ua, {
            size: 13,
            className: "animate-spin"
          }), x("计算中...")]
        }) : null,
        children: [c.jsxs("div", {
          className: "settings-stat-list",
          children: [c.jsxs("div", {
            className: "settings-stat-row",
            children: [c.jsx("span", {
              children: x("资源数量")
            }), c.jsx("span", {
              className: "settings-stat-value",
              children: n.isLoading ? "—" : x("{0} 个", n.storageUsage.count)
            })]
          }), c.jsxs("div", {
            className: "settings-stat-row",
            children: [c.jsx("span", {
              children: x("占用空间")
            }), c.jsx("span", {
              className: "settings-stat-value",
              children: n.isLoading ? "—" : n.storageUsage.formattedSize
            })]
          }), c.jsxs("div", {
            className: "settings-stat-row",
            children: [c.jsx("span", {
              children: x("本地缓存目录")
            }), c.jsx("span", {
              className: "settings-stat-value",
              children: n.isLoading ? "—" : x("{0} 个文件 · {1}", n.diskCacheUsage.count, n.diskCacheUsage.formattedSize)
            })]
          }), n.diskCacheUsage.freeBytes > 0 ? c.jsxs("div", {
            className: "settings-stat-row",
            children: [c.jsx("span", {
              children: x("磁盘剩余空间")
            }), c.jsx("span", {
              className: `settings-stat-value${n.diskCacheUsage.lowSpace ? " text-amber-500" : ""}`,
              children: zye(n.diskCacheUsage.freeBytes)
            })]
          }) : null]
        }), n.diskCacheUsage.lowSpace ? c.jsxs("div", {
          className: "settings-notice is-warn",
          children: [c.jsx(eRe, {
            size: 14,
            className: "shrink-0 mt-0.5"
          }), c.jsx("span", {
            children: x("磁盘剩余空间低于 10 GB。本应用只提示风险，不会暂停写入或自动删除任何本地素材。")
          })]
        }) : null, c.jsxs("div", {
          className: "settings-pref-action mt-3",
          children: [c.jsxs("button", {
            type: "button",
            className: "settings-pill-btn",
            disabled: n.isLoading || n.isClearingDerivedDisk || !n.cacheManager.isAvailable(),
            onClick: () => void n.handleClearDerivedDiskCache(),
            children: [n.isClearingDerivedDisk ? c.jsx(Ua, {
              size: 13,
              className: "animate-spin"
            }) : c.jsx(Qo, {
              size: 13,
              strokeWidth: 1.75
            }), n.isClearingDerivedDisk ? x("正在清理派生缓存...") : x("清理派生磁盘缓存")]
          }), c.jsxs("button", {
            type: "button",
            className: "settings-pill-btn",
            disabled: n.isLoading || n.storageUsage.count === 0,
            onClick: () => void n.handleClearAll(),
            children: [n.isLoading ? c.jsx(Ua, {
              size: 13,
              className: "animate-spin"
            }) : c.jsx(Qo, {
              size: 13,
              strokeWidth: 1.75
            }), x("清除 IDB 缓存")]
          })]
        })]
      })]
    });
  },
  _Fi = Object.freeze(Object.defineProperty({
    __proto__: null,
    StorageSettingsPane: ghn,
    default: ghn
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function Rpe() {
  const e = localStorage.getItem(zce);
  if (!e) return [];
  const t = JSON.parse(e);
  if (!Array.isArray(t) || t.some(n => !n || typeof n.id != "string" || typeof n.name != "string" || typeof n.url != "string" || typeof n.key != "string")) throw new Error("API 接入配置无法读取，请先恢复配置备份");
  return t;
}

function tZe(e, t) {
  localStorage.setItem(zce, JSON.stringify(e)), Qa.updateConfigs(t), ZYe();
}

function kFi() {
  var t;
  const e = kia(Qa.getConfigs(), Rpe());
  for (const n of e.providers.filter(r => r.kind === "local-comfyui")) {
    for (let r = 0; r < e.configs.length; r++) {
      const a = e.configs[r];
      if (((t = a.localComfy) == null ? void 0 : t.providerId) !== n.id || a.localComfy.version === 2) continue;
      const i = xve(n);
      e.configs[r] = {
        ...a,
        localComfy: i.localComfy,
        customProtocol: i.customProtocol
      }, e.changed = !0;
    }
    e.configs.some(r => {
      var a;
      return ((a = r.localComfy) == null ? void 0 : a.providerId) === n.id;
    }) && !e.configs.some(r => {
      var a;
      return ((a = r.localComfy) == null ? void 0 : a.providerId) === n.id && r.localComfy.model === "h3";
    }) && (e.configs.push(fUn(n)), e.changed = !0);
  }
  return e.changed && tZe(e.providers, e.configs), e.providers;
}

function a7(e) {
  e = YRt(e);
  const t = Rpe();
  tZe(t.some(n => n.id === e.id) ? t.map(n => n.id === e.id ? e : n) : [...t, e], Qa.getConfigs().map(n => n.apiProviderId === e.id ? NZ(n, e) : n));
}

function jJ(e, t) {
  const n = Rpe(),
    r = n.find(i => i.id === e);
  if (!r) throw new Error("服务商已被移除");
  const a = new Set(t.map(i => i.id));
  tZe(n, [...Qa.getConfigs().filter(i => !a.has(i.id)), ...t.map(i => NZ(i, r))]);
}

function Hst(e) {
  tZe(Rpe().filter(t => t.id !== e), Qa.getConfigs().filter(t => t.apiProviderId !== e));
}

function AFi(e) {
  Qa.removeCustomConfig(e), ZYe();
}

const zL = e => e && typeof e == "object" && !Array.isArray(e) ? e : void 0,
  Rte = e => Array.isArray(e) ? e.filter(t => typeof t == "string").slice(0, 256) : [],
  SFi = new Set(["__proto__", "prototype", "constructor", "api_key", "apikey", "authorization", "cookie"]);

function IFi(e) {
  var p;
  const t = zL(e);
  if (!t) return;
  const n = zL(t.request),
    r = zL(t.input_schema ?? t.inputSchema ?? t.request_schema ?? (n == null ? void 0 : n.schema) ?? ((p = zL(t.parameters)) != null && p.properties ? t.parameters : void 0)),
    a = Rte(t.supported_endpoints ?? t.supported_endpoint_types),
    i = t.endpoint ?? (n == null ? void 0 : n.path),
    o = [...new Set([...(typeof i == "string" ? [i] : []), ...a])],
    s = [...new Set([...Rte(t.supported_parameters ?? t.parameters), ...Object.keys(zL(r == null ? void 0 : r.properties) || {})])],
    l = String(t.protocol ?? t.api_format ?? "").toLowerCase(),
    d = {
      openai: "chat",
      chat: "chat",
      chat_completions: "chat",
      responses: "responses",
      "openai-responses": "responses",
      gemini: "gemini",
      anthropic: "anthropic"
    },
    u = o.map(m => /\/chat\/completions$/.test(m) || m === "openai" ? "chat" : /\/responses$/.test(m) || /^(responses|openai-response|openai-responses)$/.test(m) ? "responses" : /\/messages$/.test(m) || m === "anthropic" ? "anthropic" : void 0).filter(Boolean),
    h = {
      parameters: s,
      endpoints: o,
      ...(d[l] || u.length === 1 ? {
        protocol: d[l] || u[0]
      } : {})
    };
  if (!(!s.length && !o.length && !r && !h.protocol && !t.request_example && !(n != null && n.body))) {
    try {
      if (n != null && n.method && String(n.method).toUpperCase() !== "POST") throw Error("生成接口不是 POST，请手动确认请求格式");
      const m = (n == null ? void 0 : n.format) ?? t.request_format;
      if (m && !["json", "application/json", "multipart", "multipart/form-data"].includes(m)) throw Error("暂不支持此请求格式，请粘贴接口示例确认");
      const f = (n == null ? void 0 : n.reference_mode) ?? t.reference_mode;
      if (f && !["url", "dataUrl"].includes(f)) throw Error("暂不支持此参考图格式，请手动确认");
      if (r && JSON.stringify(r).length > 65536) throw Error("参数说明过大，请粘贴所需接口示例");
      const y = {},
        b = {},
        v = [],
        _ = {},
        w = (I, E = 0, M = "") => {
          if (E > 8 || I.$ref || I.oneOf || I.anyOf || I.allOf) throw Error("参数包含引用或组合 Schema，请用接口示例确认");
          const T = {};
          for (const [P, R] of Object.entries(zL(I.properties) || {})) {
            if (SFi.has(P.toLowerCase())) throw Error("参数说明含凭据或保留字段，请手动配置");
            const j = zL(R) || {},
              B = M ? `${M}.${P}` : P;
            if (Rte(I.required).includes(P) && v.push(B), j.$ref || j.oneOf || j.anyOf || j.allOf) throw Error("参数包含引用或组合 Schema，请用接口示例确认");
            const F = Ftn(P, j.type),
              N = Array.isArray(j.enum) ? j.enum.filter(G => typeof G == "string" || typeof G == "number") : [];
            N.length && (b[B] = N), F && N.length && (F === "$ratio" && (_.ratios = N.map(String)), F === "$resolution" && (_.resolutions = N.map(String)), F === "$quality" && (_.qualities = N.map(String)), (F === "$duration" || F === "$durationText") && (_.durations = N.map(G => `${parseFloat(String(G))}s`))), F ? T[P] = F : j.properties ? T[P] = w(j, E + 1, B) : "default" in j ? T[P] = j.default : "const" in j ? T[P] = j.const : Rte(I.required).includes(P) && (T[P] = "", h.note = `${h.note || ""}请补充必填参数 ${B}。`);
          }
          return T;
        };
      r ? (Object.assign(y, w(r)), h.schema = r) : s.forEach(I => {
        const E = Ftn(I);
        E && (y[I] = E);
      });
      const k = t.request_example ?? (n == null ? void 0 : n.body),
        A = k ? yQn(typeof k == "string" ? k : JSON.stringify(k)) : void 0,
        S = typeof i == "string" ? i : o.find(I => I.startsWith("/")) || (A != null && A.url ? A.protocol.path : void 0),
        C = {
          ...((A == null ? void 0 : A.protocol) || bZ()),
          ...(S ? {
            path: S
          } : {}),
          ...(r || s.length ? {
            body: y
          } : {}),
          ...(A ? {
            body: A.protocol.body
          } : {}),
          ...(["multipart", "multipart/form-data"].includes(m) ? {
            format: "multipart"
          } : {}),
          ...(f ? {
            referenceMode: f
          } : {}),
          ...(Rte(t.result_paths).length ? {
            resultPaths: Rte(t.result_paths)
          } : {}),
          ...(zL(t.poll) ? {
            poll: t.poll
          } : {}),
          ...(Object.keys(b).length ? {
            valueOptions: b
          } : {})
        };
      if (v.length && (C.requiredFields = v), S || A || r) {
        const I = iTt(C);
        if (I) throw Error(I);
        h.request = {
          ...C,
          path: S || ""
        }, A != null && A.url && (h.requestOrigin = A.url), S || (h.note = "目录未返回提交路径，请在请求地址与参数对应中补充");
      }
      Object.keys(_).length && (h.options = _);
    } catch (m) {
      h.note = m.message;
    }
    return h;
  }
}

const omr = 9e4,
  YMe = 8e3,
  CFi = 100,
  Wst = 50,
  EFi = ["id", "name", "model", "model_id", "modelId", "model_name", "modelName", "apiModelId", "api_model_id"],
  yhn = new Set(["openai", "responses", "new-api", "custom", "lmstudio"]),
  TFi = ["/api/pricing", "/api/models", "/api/user/models", "/api/user/available_models"];

function MFi(e, t) {
  var o, s;
  const n = String(e.primaryType || e.type || "").toLowerCase();
  if (n === "text" || n === "chat") return "Chat";
  if (n === "image") return "Image";
  if (n === "video") return "Video";
  if (n === "audio") return "Audio";
  const r = JSON.stringify([e.output_modalities, (o = e.architecture) == null ? void 0 : o.output_modalities, (s = e.modalities) == null ? void 0 : s.output]).toLowerCase();
  if (/video/.test(r)) return "Video";
  if (/image/.test(r)) return "Image";
  if (/audio|speech/.test(r)) return "Audio";
  if (/text|chat/.test(r)) return "Chat";
  const a = e.capabilities,
    i = JSON.stringify([e.type, Array.isArray(a) ? a : Object.keys(a || {}).filter(l => a[l] === !0)]).toLowerCase();
  return /video[_-]generation|text.to.video|image.to.video/.test(i) ? "Video" : /image[_-]generation|text.to.image|image.to.image/.test(i) ? "Image" : /audio[_-]generation|text.to.speech/.test(i) ? "Audio" : /sora|veo|kling|seedance|wan.*video/i.test(t) ? "Video" : /image|flux|dall-e|stable-diffusion|seedream/i.test(t) ? "Image" : /whisper|tts|speech|suno/i.test(t) ? "Audio" : /text|chat|generatecontent/.test(i + JSON.stringify(e.supportedGenerationMethods || []).toLowerCase()) || /gpt|gemini|claude|llama|deepseek|qwen|mistral|yi-large|jamba/i.test(t) ? "Chat" : "Unknown";
}

function c5(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : void 0;
}

function oR(e) {
  const t = c5(e);
  if (!t) return;
  const n = Object.entries(t);
  if (n.length) return n.map(([r, a]) => Array.isArray(a) && a.every(i => typeof i == "string") ? {
    id: r,
    groups: a
  } : a && typeof a == "object" && !Array.isArray(a) ? {
    id: r,
    ...a
  } : {
    id: r
  });
}

function smr(e) {
  if (typeof e == "string") return e.trim().replace(/^models\//, "");
  const t = c5(e);
  if (!t) return "";
  for (const n of EFi) {
    const r = t[n];
    if (typeof r == "string" && r.trim() && !/\s/.test(r.trim())) return r.trim().replace(/^models\//, "");
  }
  return "";
}

function PFi(e) {
  var s, l;
  if (Array.isArray(e)) return e;
  const t = c5(e);
  if (!t) return;
  const n = c5(t.data) || c5(t.output),
    r = new Set(Object.keys(c5(t.deletedModels) || {})),
    a = [];
  let i = !1;
  const o = d => {
    if (d) {
      if (!d.length) {
        i = !0;
        return;
      }
      a.push(r.size ? d.filter(u => {
        const h = smr(u);
        return !h || !r.has(h);
      }) : d);
    }
  };
  o(oR(t.modelGroups)), o(oR(t.model_ratio)), o(oR(t.model_price)), o(oR((s = c5(t.pricing)) == null ? void 0 : s.models)), o(oR(n == null ? void 0 : n.model_ratio)), o(oR(n == null ? void 0 : n.model_price)), o(oR((l = c5(n == null ? void 0 : n.pricing)) == null ? void 0 : l.models));
  for (const d of [t.data, t.models, t.items, n == null ? void 0 : n.data, n == null ? void 0 : n.models, n == null ? void 0 : n.items]) Array.isArray(d) && o(d);
  o(oR(t.models)), o(oR(n == null ? void 0 : n.models));
  for (const d of [t.customModels, n == null ? void 0 : n.customModels]) Array.isArray(d) && o(d);
  return a.length ? a.flat() : i ? [] : void 0;
}

function RFi(e) {
  const t = c5(e) || {},
    n = c5(t.output) || c5(t.data) || t;
  return {
    total: Number(n.total ?? t.total) || 0,
    pageSize: Number(n.page_size ?? n.pageSize ?? t.page_size) || 0,
    pageNo: Number(n.page_no ?? n.pageNo ?? t.page_no) || 0
  };
}

function Wfe(e) {
  const t = PFi(e);
  if (!t) throw new Error("接口没有返回可识别的模型列表，可手动添加模型或修改列表路径");
  const n = new Map();
  for (const r of t) {
    const a = smr(r);
    if (!a) continue;
    const i = c5(r),
      o = typeof (i == null ? void 0 : i.display_name) == "string" ? i.display_name : typeof (i == null ? void 0 : i.displayName) == "string" ? i.displayName : typeof (i == null ? void 0 : i.name) == "string" ? i.name.replace(/^models\//, "") : a,
      s = i ? IFi(i) : void 0,
      l = n.get(a),
      d = QFn(l == null ? void 0 : l.channelGroups, Nna(i));
    n.set(a, {
      id: a,
      name: l != null && l.name && l.name !== l.id ? l.name : o,
      kind: l != null && l.kind && l.kind !== "Unknown" ? l.kind : MFi(i || {}, a),
      group: l != null && l.group && l.group !== "其他" ? l.group : typeof (i == null ? void 0 : i.maker) == "string" ? i.maker : typeof (i == null ? void 0 : i.owned_by) == "string" ? i.owned_by : typeof (i == null ? void 0 : i.vendor_id) == "string" ? i.vendor_id : a.includes("/") ? a.split("/")[0] : "其他",
      ...(d ? {
        channelGroups: d
      } : {}),
      ...(s || l != null && l.metadata ? {
        metadata: (l == null ? void 0 : l.metadata) || s
      } : {})
    });
  }
  if (t.length && !n.size) throw new Error("模型列表缺少有效的模型 ID");
  return [...n.values()].sort((r, a) => r.id.localeCompare(a.id));
}

function NFi(e, t) {
  const n = new URL(FIe(e)),
    r = n.pathname.replace(/\/models\/?$/i, "").replace(/\/v\d+(?:alpha|beta)?$/i, "");
  return `${n.origin}${r}${t}`;
}

function bhn(e) {
  const t = new URL(FIe(e)),
    n = TFi.map(a => ({
      href: NFi(e, a),
      auth: !0
    })),
    r = t.hostname.replace(/^api(?:-[a-z0-9]+)?\./i, "");
  return r && r !== t.hostname && !/\b(openai|anthropic|googleapis|azure|google)\b/i.test(r) && n.push({
    href: `${t.protocol}//${r}/api/web/catalog-overrides`,
    auth: !1
  }), n;
}

class Wje extends Error {
  constructor(t) {
    super(t === 401 ? "认证失败（401），请检查该服务商的密钥" : t === 403 ? "访问被拒绝（403），请检查密钥权限或服务商访问限制" : t === 429 ? "请求过于频繁（429），请稍后刷新模型列表" : t === 404 || t === 405 ? `模型目录不可用（HTTP ${t}），可修改列表路径或手动添加模型` : t >= 500 ? `服务商暂时无法响应（HTTP ${t}），请稍后重试` : `获取模型列表失败（HTTP ${t}），请检查接口地址和列表路径`), this.status = t;
  }
}

async function qfe(e, t, n, r = 3e4) {
  n.throwIfAborted();
  const a = new AbortController(),
    i = () => a.abort(n.reason);
  n.addEventListener("abort", i, {
    once: !0
  });
  const o = setTimeout(() => a.abort(new DOMException("模型目录请求超时", "TimeoutError")), r);
  let s;
  const l = new Promise((d, u) => {
    s = () => u(a.signal.reason), a.signal.addEventListener("abort", s, {
      once: !0
    });
  });
  try {
    return await Promise.race([l, (async () => {
      const d = await $i(e, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...t
        },
        signal: a.signal
      });
      if (!d.ok) throw new Wje(d.status);
      try {
        return await d.json();
      } catch {
        throw a.signal.throwIfAborted(), new Error("接口返回的不是 JSON 模型列表，请检查接口地址和列表路径");
      }
    })()]);
  } catch (d) {
    throw a.signal.throwIfAborted(), d instanceof TypeError ? new Error("无法连接模型目录，请检查网络、代理或服务商的跨域设置") : d;
  } finally {
    clearTimeout(o), n.removeEventListener("abort", i), a.signal.removeEventListener("abort", s);
  }
}

function jFi(e, t, n) {
  for (const r of t) {
    const a = e.get(r.id);
    if (!a) {
      e.set(r.id, {
        ...r,
        catalogSource: n
      });
      continue;
    }
    e.set(r.id, {
      ...a,
      name: a.name !== a.id ? a.name : r.name,
      kind: a.kind !== "Unknown" ? a.kind : r.kind,
      group: a.group !== "其他" ? a.group : r.group,
      metadata: a.metadata || r.metadata,
      channelGroups: QFn(a.channelGroups, r.channelGroups),
      catalogSource: a.catalogSource === "primary" || n === "primary" ? "primary" : a.catalogSource === "supplemental" || n === "supplemental" ? "supplemental" : "public"
    });
  }
}

async function lmr(e, t, n, r = {}) {
  var m, f, y, b;
  let a = Hk(e) ? "" : IU(e, "");
  if (!a && !Hk(e) && r.globalBaseUrl) try {
    Uce(e.url).replace(/\/v1$/, "") === Uce(r.globalBaseUrl).replace(/\/v1$/, "") && (a = t.trim());
  } catch {}
  const i = e.kind === "gemini" ? a ? {
      "x-goog-api-key": a
    } : {} : e.kind === "anthropic" ? {
      ...(a ? {
        "x-api-key": a
      } : {}),
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    } : e.kind === "azure-openai" ? a ? {
      "api-key": a
    } : {} : a ? {
      Authorization: `Bearer ${a}`
    } : {},
    o = new URL(FIe(e)),
    s = new Map(),
    l = new Set(),
    d = () => [...s.values()].sort((v, _) => v.id.localeCompare(_.id)),
    u = (v, _) => {
      var w;
      n.throwIfAborted(), jFi(s, v, _), (w = r.onProgress) == null || w.call(r, d());
    };
  let h;
  const p = new Set([o.href]);
  try {
    h = await qfe(o.href, i, n);
  } catch (v) {
    if (n.throwIfAborted(), !(v instanceof Wje) || ![404, 405].includes(v.status) || !yhn.has(e.kind)) throw v;
    const _ = new URL(o);
    _.pathname = _.pathname.endsWith("/v1/models") ? _.pathname.replace(/\/v1\/models$/, "/models") : _.pathname.endsWith("/models") ? _.pathname.replace(/\/models$/, "/v1/models") : _.pathname;
    const w = [...new Set([_.href, ...(e.kind === "new-api" ? bhn(e).filter(A => A.auth).map(A => A.href) : [])])].filter(A => A !== o.href);
    let k = !1;
    for (const A of w) {
      p.add(A);
      try {
        h = await qfe(A, i, n, YMe), Wfe(h), o.href = A, k = !0, (m = r.onWarning) == null || m.call(r, `已使用备用目录 ${new URL(A).pathname}；可在模型目录设置中保存此路径。`);
        break;
      } catch (S) {
        if (n.throwIfAborted(), S instanceof Wje && [401, 403, 429].includes(S.status)) throw S;
      }
    }
    if (!k) throw v;
  }
  if (u(Wfe(h), "primary"), e.kind === "gemini" || e.kind === "anthropic") {
    let v = h;
    for (let _ = 1;; _++) {
      if (e.kind === "gemini" && v.nextPageToken) o.searchParams.set("pageToken", v.nextPageToken);else if (e.kind === "anthropic" && v.has_more && v.last_id) o.searchParams.set("after_id", v.last_id);else break;
      if (l.has(o.href) || _ >= Wst) {
        (f = r.onWarning) == null || f.call(r, "模型目录分页重复或过多，已保留获取到的模型；可缩小范围或手动添加。");
        break;
      }
      l.add(o.href);
      try {
        v = await qfe(o.href, i, n, YMe), u(Wfe(v), "primary");
      } catch {
        n.throwIfAborted(), (y = r.onWarning) == null || y.call(r, "部分模型分页未能获取，已保留现有列表，可刷新重试。");
        break;
      }
    }
  } else {
    const v = RFi(h),
      _ = Math.max(1, v.pageSize || CFi),
      w = Math.max(s.size, v.total),
      k = Math.min(Wst, Math.ceil(w / _));
    if (w > Wst * _ && ((b = r.onWarning) == null || b.call(r, "模型目录较大，本次最多读取 50 页；未列出的模型可手动添加。")), k > 1 && (v.total > s.size || v.pageNo || v.pageSize)) for (let A = 2; A <= k; A += 3) n.throwIfAborted(), await Promise.all(Array.from({
      length: Math.min(3, k - A + 1)
    }, async (S, C) => {
      var E;
      const I = new URL(o.href);
      I.searchParams.set("page_no", String(A + C)), I.searchParams.set("page_size", String(_));
      try {
        u(Wfe(await qfe(I.href, i, n, YMe)), "primary");
      } catch {
        n.throwIfAborted(), (E = r.onWarning) == null || E.call(r, "部分模型分页未能获取，已保留现有列表，可刷新重试。");
      }
    }));
    r.includeSupplemental !== !1 && !jP(e.url) && yhn.has(e.kind) && (await Promise.all(bhn(e).filter(({
      href: A
    }) => !p.has(A)).map(async ({
      href: A,
      auth: S
    }) => {
      var C;
      try {
        u(Wfe(await qfe(A, S ? i : {}, n, YMe)), S ? "supplemental" : "public");
      } catch (I) {
        n.throwIfAborted(), (!(I instanceof Wje) || I.status >= 500 || I.status === 429) && ((C = r.onWarning) == null || C.call(r, "部分补充目录未能获取，主目录模型仍可添加。"));
      }
    })));
  }
  return n.throwIfAborted(), d();
}

function $p(e, t) {
  const localElectron = typeof window !== "undefined" && window.__LINGO_ELECTRON_NATIVE_SHELL__ === !0;
  return !localElectron && (!R4t() || o3()) ? Promise.reject(new Error("本地模型运行管理需要 AIYOUPLUS 桌面版")) : Fr(e, t).catch(n => {
    throw new Error(typeof n == "string" ? n : String(n));
  });
}

async function AH(e, t, n) {
  if (!e.localComfy || t instanceof FormData) throw new Error("本地模型配置无效");
  const {
      taskId: r,
      nodeId: a,
      onProgress: i
    } = n,
    o = () => {
      var p;
      return ((p = n.isCurrent) == null ? void 0 : p.call(n)) === !1 || U_t(r) || z_t(a) || GQ(a, r);
    };
  let s = o();
  if (s) throw new Error("已取消本地生成");
  if (!(typeof window !== "undefined" && window.__LINGO_ELECTRON_NATIVE_SHELL__ === !0) && (!R4t() || o3())) throw new Error("本地模型生成需要 AIYOUPLUS 桌面版");
  const l = () => {
      $p("local_models_cancel", {
        requestId: r
      }).catch(() => {});
    },
    d = p => {
      const m = p.detail;
      ((m == null ? void 0 : m.taskId) === r || (m == null ? void 0 : m.nodeId) === a) && (s = !0, l());
    },
    u = await JM("local-model-progress", ({
      payload: p
    }) => {
      p.requestId === r && !s && !o() && (p.message ? i(p.progress, p.message) : i(p.progress));
    });
  window.addEventListener("cancelPolling", d);
  const h = setInterval(() => {
    o() && (s = !0), s && l();
  }, 1e3);
  dcr(r);
  try {
    if (o()) throw new Error("已取消本地生成");
    const p = Number(t.seed),
      m = await $p("local_models_generate", {
        request: {
          providerId: e.localComfy.providerId,
          requestId: r,
          prompt: String(t.prompt || ""),
          images: Array.isArray(t.images) ? t.images : [],
          ratio: String(t.ratio || "1:1"),
          resolution: String(t.resolution || "1K"),
          model: e.localComfy.model || "flux",
          mode: String(t.mode || ""),
          duration: t.duration == null ? null : Number(t.duration),
          generationMode: typeof t.generationMode == "string" ? t.generationMode : null,
          faceOptimizationEnabled: t.faceOptimizationEnabled === !0,
          generateAudio: t.generateAudio !== !1,
          mask: typeof t.mask == "string" && t.mask ? t.mask : null,
          ...(e.localComfy.model === "image-wash" ? {
            imageEnhancement: t.imageEnhancement
          } : {}),
          ...(e.localComfy.model === "image-upscale" ? {
            imageUpscale: t.imageUpscale
          } : {}),
          seed: t.seed != null && Number.isSafeInteger(p) && p >= 0 ? p : null
        }
      });
    if (s || o()) throw new Error("已取消本地生成");
    return new Response(JSON.stringify(m), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } finally {
    clearInterval(h), u(), window.removeEventListener("cancelPolling", d), ucr(r);
  }
}

const DFi = "" + new URL("302ai-transparent-h6j6_5kk.png", import.meta.url).href,
  LFi = "" + new URL("302ai-OYnezl-B.webp", import.meta.url).href,
  OFi = "" + new URL("aihubmix-transparent-HoPVv22b.png", import.meta.url).href,
  BFi = "" + new URL("aihubmix-D0U6m6LU.png", import.meta.url).href,
  FFi = "data:image/png;base64,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",
  zFi = "" + new URL("anthropic-hp89qtrg.png", import.meta.url).href,
  UFi = "data:image/png;base64,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",
  $Fi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAB7CAAAewgFu0HU+AAACVElEQVR4nO3VsY3DQBAEweVDASg/pUfFR2XAD0BEmzoaVeZZgwUat81+nANc+ls9AO5MIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBALhsXrAzMz5eq6esNz2/ny9ucv1XX7JDwJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgELbZj3P1CLgrPwgEgUAQCASBQBAIBIFAeKweMDNzvp6rJyy3vT9fb+5yfZdf8oNAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCIRt9uNcPQLuyg8CQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEP4B7wMVSIoetuIAAAAASUVORK5CYII=",
  GFi = "data:image/png;base64,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",
  VFi = "data:image/png;base64,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",
  HFi = "" + new URL("baidu-cloud-transparent-Wjv2HSn0.png", import.meta.url).href,
  WFi = "data:image/svg+xml,%3csvg%20height='1em'%20style='flex:none;line-height:1'%20viewBox='0%200%2024%2024'%20width='1em'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eBaiduCloud%3c/title%3e%3cpath%20d='M21.715%205.61l-3.983%202.31a.903.903%200%2001-.896%200L12.44%205.384a.903.903%200%2000-.897%200L7.156%207.92a.903.903%200%2001-.896%200L2.276%205.617%2012.002%200l9.713%205.61z'%20fill='%235BCA87'%3e%3c/path%3e%3cpath%20d='M18.641%209.467a.89.89%200%2000-.438.77v5.072a.896.896%200%2001-.445.77l-4.428%202.51a.884.884%200%2000-.445.777v4.607l4.429-2.536%205.31-3.047V7.157l-3.983%202.31z'%20fill='%23EC5D3E'%3e%3c/path%3e%3cpath%20d='M10.98%2018.941a.936.936%200%2000-.305-.352l-4.429-2.516a.903.903%200%2001-.431-.764v-5.078a.89.89%200%2000-.452-.757l-.451-.26L1.38%207.158V18.39l5.311%203.047L11.126%2024v-4.608a.881.881%200%2000-.146-.45z'%20fill='%232464F5'%3e%3c/path%3e%3c/svg%3e",
  qFi = "" + new URL("burncloud-transparent-BdgdRWc7.png", import.meta.url).href,
  KFi = "" + new URL("burncloud-Dv3aLUVa.png", import.meta.url).href,
  QFi = "" + new URL("cerebras-transparent-B8iFxrHo.png", import.meta.url).href,
  YFi = "" + new URL("cerebras-CMYn4Ibf.webp", import.meta.url).href,
  XFi = "data:image/png;base64,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",
  JFi = "data:image/svg+xml,%3csvg%20width='120'%20height='120'%20viewBox='0%200%20120%20120'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M51.1455%2034.0171C55.2885%2034.0171%2059.4315%2034.0171%2063.7%2034.0171C64.4947%2035.527%2065.289%2037.0364%2066.0713%2038.5527C66.1593%2038.7231%2066.2473%2038.8935%2066.3353%2039.0639C66.5167%2039.4149%2066.698%2039.766%2066.8792%2040.117C67.2709%2040.8754%2067.6631%2041.6334%2068.0552%2042.3914C68.2701%2042.8065%2068.4848%2043.2217%2068.6995%2043.6369C68.7634%2043.7603%2068.7634%2043.7603%2068.8287%2043.8864C69.0916%2044.3947%2069.3545%2044.9032%2069.6172%2045.4117C70.5132%2047.1458%2071.4109%2048.879%2072.3149%2050.6091C72.6923%2051.3316%2073.0685%2052.0549%2073.4431%2052.779C73.486%2052.8619%2073.5289%2052.9449%2073.5731%2053.0303C73.7946%2053.4584%2074.0155%2053.8867%2074.2362%2054.3152C74.6367%2055.0927%2075.0395%2055.8685%2075.4559%2056.6375C76.7755%2059.0897%2077.8668%2061.6328%2078.9716%2064.1865C79.4387%2065.2655%2079.9104%2066.3423%2080.3854%2067.4178C80.5291%2067.7437%2080.6717%2068.0702%2080.8142%2068.3966C80.9009%2068.5932%2080.9878%2068.7897%2081.0746%2068.9863C81.133%2069.1212%2081.133%2069.1212%2081.1928%2069.2589C81.3823%2069.7303%2081.3823%2069.7303%2081.773%2070.0253C81.7051%2069.444%2081.637%2068.8628%2081.5688%2068.2816C81.5312%2067.961%2081.4938%2067.6403%2081.4565%2067.3197C81.3354%2066.2833%2081.2115%2065.2477%2081.0763%2064.2132C80.2526%2057.8848%2080.2007%2051.6014%2080.2256%2045.2304C80.2304%2044.0044%2080.2326%2042.7785%2080.2347%2041.5526C80.239%2039.0408%2080.2461%2036.529%2080.2555%2034.0171C81.7641%2034.014%2083.2727%2034.0116%2084.7813%2034.01C85.4818%2034.0093%2086.1822%2034.0083%2086.8826%2034.0067C87.558%2034.0053%2088.2334%2034.0044%2088.9087%2034.0042C89.167%2034.0039%2089.4252%2034.0034%2089.6835%2034.0026C90.044%2034.0016%2090.4043%2034.0014%2090.7648%2034.0016C90.8727%2034.001%2090.9806%2034.0005%2091.0917%2034C91.8286%2034.0014%2091.8286%2034.0014%2091.9823%2034.1551C91.9958%2034.4277%2091.9993%2034.7008%2091.9993%2034.9736C91.9995%2035.1526%2091.9998%2035.3318%2092%2035.5163C91.9997%2035.7175%2091.9993%2035.9188%2091.9989%2036.1202C91.9989%2036.3319%2091.999%2036.5438%2091.9993%2036.7555C91.9995%2037.3405%2091.999%2037.9253%2091.9982%2038.5101C91.9977%2039.1397%2091.9978%2039.7693%2091.998%2040.399C91.9981%2041.4907%2091.9976%2042.5826%2091.9968%2043.6744C91.9958%2045.253%2091.9954%2046.8315%2091.9952%2048.4101C91.9949%2050.9709%2091.9939%2053.5318%2091.9926%2056.0927C91.9913%2058.5809%2091.9904%2061.0692%2091.9898%2063.5576C91.9898%2063.7875%2091.9898%2063.7875%2091.9898%2064.0219C91.9895%2064.7908%2091.9894%2065.5596%2091.9891%2066.3285C91.9877%2072.7114%2091.9852%2079.0942%2091.9823%2085.4771C87.7937%2085.4771%2083.6051%2085.4771%2079.2898%2085.4771C78.7889%2084.4754%2078.2881%2083.4739%2077.7722%2082.4418C77.2534%2081.4556%2077.2535%2081.4556%2076.7326%2080.4706C76.3185%2079.6845%2075.9248%2078.8885%2075.53%2078.0927C75.1413%2077.3118%2074.7408%2076.5383%2074.3318%2075.7679C73.7642%2074.699%2073.2207%2073.6196%2072.6825%2072.5357C72.2173%2071.6014%2071.7358%2070.677%2071.2464%2069.7553C70.8346%2068.9772%2070.4375%2068.1926%2070.0463%2067.4041C69.6067%2066.5179%2069.1566%2065.6389%2068.6925%2064.7655C67.0924%2061.7375%2065.6499%2058.661%2064.2735%2055.5268C63.7979%2054.4438%2063.3202%2053.3617%2062.8398%2052.2809C62.6847%2051.9311%2062.5306%2051.581%2062.3767%2051.2308C62.2821%2051.018%2062.1876%2050.8052%2062.093%2050.5926C62.0502%2050.4945%2062.0073%2050.3962%2061.9631%2050.2951C61.7638%2049.7906%2061.7638%2049.7906%2061.3547%2049.4689C61.3641%2049.5531%2061.3736%2049.6373%2061.3833%2049.724C62.9236%2063.4433%2062.9236%2063.4433%2062.9002%2069.7114C62.8985%2070.2689%2062.8984%2070.8262%2062.898%2071.3835C62.8972%2072.4314%2062.8949%2073.4793%2062.8922%2074.5273C62.8884%2075.9485%2062.887%2077.3699%2062.8854%2078.7912C62.8828%2081.0198%2062.8774%2083.2484%2062.8723%2085.4771C59.0024%2085.4771%2055.1326%2085.4771%2051.1455%2085.4771C51.1455%2068.4953%2051.1455%2051.5135%2051.1455%2034.0171Z'%20fill='%23FFFEFE'/%3e%3cpath%20d='M27%2034.1554C31.0519%2034.1554%2035.1038%2034.1554%2039.2786%2034.1554C39.2786%2051.0916%2039.2786%2068.0277%2039.2786%2085.4772C35.2267%2085.4772%2031.1747%2085.4772%2027%2085.4772C27%2068.541%2027%2051.6048%2027%2034.1554Z'%20fill='white'/%3e%3c/svg%3e",
  ZFi = "" + new URL("cherryin-BIxUyRnC.png", import.meta.url).href,
  ezi = "data:image/png;base64,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",
  tzi = "" + new URL("comfyui-CCz9u-7U.png", import.meta.url).href,
  nzi = "" + new URL("dashscope-transparent-BoIZoHgT.png", import.meta.url).href,
  rzi = "" + new URL("dashscope-B5l6zvuZ.png", import.meta.url).href,
  azi = "" + new URL("deepseek-transparent-DBEvtqqy.png", import.meta.url).href,
  izi = "" + new URL("deepseek-BfIKgrKz.png", import.meta.url).href,
  ozi = "" + new URL("dmxapi-transparent-CzwcFpbK.png", import.meta.url).href,
  szi = "" + new URL("dmxapi-DEJq_RKL.png", import.meta.url).href,
  lzi = "" + new URL("doubao-transparent-CPF5GdO9.png", import.meta.url).href,
  czi = "" + new URL("doubao-la_PI8m-.png", import.meta.url).href,
  dzi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAMAAAA7EzkRAAAAKlBMVEVMaXEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABqfk8+AAAADXRSTlMAsA/wyt4gQ24xV5qFcweOtwAAAAlwSFlzAAALEwAACxMBAJqcGAAADmxJREFUeNrt3Q2W8raWBVAZ/G/X/Kfbea97dUhW8iWAQfdKe4+gsE9hS0dIpQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL1iH52wRP8T+5IfY3fcwlp/nDBE/xPjkh5jd9zim/DeviX+ifp/BT969M95HOJ78CIu7Hsjt/tzdm3wCqn5/7Nm/w1f3PJTtyfs3Zn+LvbnnuceQW+4hyOGOB7PnvoND7v8fSnnyJf4e6hk2Z3+DoJyZ3+LP7GMocn+JpP76Jv1r1J5/Hp3MA0k1cOmxEL5lncRUA5cmCuFVDUxRp6qBS6+F8OKbG0vqnh6CmIMprRTCs9E73a9LVQP3Owy5R/ib1cDWpRqCUHpdlzqpga1LTTQEUQMX61JrDkHUwKWpQrj2E21WAxfrUq1EpdpXypRqJaoauDS3LnXJ9MpqDqZYl6oGppV1qZsauCiE1zzFjRq4WJda8S9VAxfrUtXANPMbn1ENXBTC9eotNXBRCNe8s2pgw5Caz7abGrgohCs2rGrgohCuOb8xqYGLQrjeDK8NiQxDqnZcgxq4KITrDUOsRDUMqVoynDYkansmJvq6VDWwYUjNbxgrUYt1qTXfsdTARSFcseiyErVYl1pzns1KVIVwzWHIs3+bOZhio6Ka385q4GJdasX3UzWwYYiVqJRm6n4rUYtCuOJkmxq4KIRrvuurgYt1qTULVytRi0K44nyvGrgohGs2XoMa2DCk4s2e1cBFIVzxcXeqgYtCuN4Lvw2JikK45pTHrgYuCuGKk75q4KIQrlh7bWrgohCueMcPNbBhSMVnnpWoRSFc861/VQMXhXDFLx1DkKIQrjjzu6iBDUNqdl9q4KIQrnjb1cCGIVUffGpgw5Cq9eukBjYMqfjNowYu1qXWfPcazMEUhXC97XBnNXCxLrXiMORUAxeFcL2nnxq4WJdas4Pd1cDFutSKXz9qYMOQmi9gmxq4KIQrDkEPNXDfnj1As/IQRA1crEutORGkBi4K4aIGprRRCC9q4KIQrvgWNtR9A6X0vS5VDUzVQlgNTNVtgSY1cLVX/1khnLkGvh3ZO9hpTlsIH1ai3sbkM5K/fekESmCldalz2hr4t/zl7mT++9oVJ4GVhiFpa+D/5C93K/2/d3y8db0uNW0NfBvTr8v5v9FfmARWOSImbQ08pF+Z+P+jvygJrLJR0Zi0Bh7yr83+ffQXJYEVjgncktbAQ/5pycfvmyAJrLAu9chZAw8NFDN/uPTDrc9C+NkhyBnw3p1NVF8xEvj1dalryhr4aOH3AWvEhvPr61JT1sBHE8sTx5AX98vrUpeMNfDRxALtJea/95fXpWasgc82fqIyBH3AjN8chmSsgc82fqQ3R62ZvloIn/lq4LORnymfUYvOrxbCU7oa+Gxlo4Yp7DX+4rrUPV0NvLayVc0ed6b1ixsVpauB12Y26xoDz/V/baOidDXw2szvVLbIbdPXCuFsK1H3dn6pd4TuO780DMlWA+/t/Fb5ny792kUhnKwG3hvaMG6NPeH6pXWpY6oaeG9pv5op+JT/V9albqlq4L2lHbuW6KXT8o1hyJGpBl6a2rNwCD/n8IV1qc8OQer+R95b2rV1jj/rtX5+GLImmoNZ7vUOkKo4yNyb3qgoUQ283dvaNe6e4LX7+HRLu+Spgf9t/rIUwnuGgd/HNyoa0tTA272xnYOfmP66L62uS53T1MBP5C9HIfzUd0u9BH54XWqalajzvbXTI557u6qWwA+vS52S1MDz1Nr5Oc/e2PvW4rrUPUkNPE/NnSD27KOtWgI/WggnqYGfzV+GpflPf6RqCfxgIZykBn4+f/FnYpafnywJ/OC61Bw18Av5i780f/jJk8DpUzHJUQPfXslf9JmY+ecldbaR/ti61LXOZugvbcD7tLmpQ1GrJvBjw5AxQQ38av5iF8LPPnsqJ/BDGxVlqIFfzl/sYcj685MpgR9al3rEr4Ffz1/sQviNj1UlgR8phJ99DOy58hd5af7rT+BK20h/pBCOvxL1rfyFbkO2ZAn8yLrU+DXw8M5dij0TmC2BH1iXuoSf1ngvf8HXBC65EviBdalD9IndpvOXLoGXH6A5R3+gNZ6/bAncrx6GnMFn1Y638re28rP0XzySbrk3KgpeA3eQv+e/Vaq+FF18gOYeuwbuIn+5EnhxIRy7Bu4kf7kSeOm61C10DXz2kr9UCby0EA5dA7+Xv7OVTcrDPZkuXJcaugbuKn9vLYz5cgIv3Kgocg3cWf4SJfDCQniMe1fX3vKX6CNfVggHroHzPJA6/NK/7ADNuDVwl/nLk8CL1qXewvaqe5/5S5PAi9alrlFr4G7zl2Xq86JhyBR0YjdVNdpn+XPJRkVL0Bq46/wlSeAl61KHmE+2zvOXJIEXrEudY9bAS+/5ezeBe5Z1qWfIGvi95cHDrYUAplgE/n4hHHIlqvxlSeDb61L3iDVwth8pdpzAt9elRqyB5S/RT6HfXJe6BayB5e9hqvetBH5jK/0316Ue8UaX8nfhdiRL8AM0A65EneUvVwLfWpcarwZ+aQPo3//A5vL3dgK30IVwuCHIm/mbS5HAbyfwjXWp4Wpg+UuYwDcK4Wg1sPylTODL61JvwaaV5O/aoym+lcCXC+FgNfBN/pL+b766UVGslajR37UlsFxcCMeqgeUvbwJfLIRDDUHkL3MCXyqEQ61Elb/UCXzpAM0zUA0sf59P4EdbylfWpQaqgeUv+zqNFw7Q3OPUwPHXHEngP93C54chgWpg+cufwKeHIYFWojZ8AFI/CXx6XWqclajy18TvtZ4thO9R7rP8tZHA9zYyqzcEOVo/AClcAkMeOVutBpa/ZnaNOD6Yv4/VwPLXzr452wcDeDgARAIv36iofg0sf03t3bl/LH+j/ElgubwQrv2uJX+tJfD8yTQHs8pfa8eJzB8K4OkAGgn8Qqnw1RpY/lq8iMtH8jeEe4GRv6jHiXxkGLLIn+NEKhbCkwNoJLBULIRX+ZPAUq8Qvr4Glr+GjxPZ4tfAi/y1vKBjjF4DO4Cm7QTuwedgYi6mlMCwMzGL/BWHOdSbiRkj/aRL/lIkcIr7Bbg5gKuDBO5h3wAdANLHj/vHoENg+eskgfM95DqswFs7FRuZX7rB0xmxBZa/jhJ4zUP40j9J/npK4DUP4VX+JLDiytRD/iSw4nT06ACQ7hJ45ZV+dyBy5bGTca5KsY301671ewX1lX+J/OU51CvKd6D8+Q6smcDR81cCL7Df67f+DmDo+TiRbao9/yd/fSfwhQM4pitr6TcPAJG//Os+nn0MH7c4KzTkr4UE3p6ZjxmXIn8SeHH3tP3bHEyrA5Ak8BPt5zJUiJ/8ZU7g1b9/mI9/+HOGJdRvBeWvvV8gLn+fwXG9FfmTwI//BnFbhz/PEN3Hc7mF+620/LX7K+zbsq/ncQzDcZz7Mof8rb782QelVFwMtkuOnaDkrzjMIWsC5U8CS9q92x0AIoHyJ4F5d4SXP8eJyB+9JnCXP18LXjfoNIHy5zgR+aPXBDoARD2Qd+mF/Emg/BXHiaRNoPxJYMn7AwTZyJDARf6QQPkrDnOQP2wWUK7ZEl3+UiVwbm1LTgfAff1+DVG2bo6wAZsN8LPdsaGpcZX85Uvg2dA6H/nLmMBQQ+FN/rpLYKjXwFH++kvg0cYCC/lLm8CthRlABzDkTeDQwJym/GXeSn9JPwKRv9QJHLN/Acpf8gQuub8A5S97AofUX4Dylz+BAW7hzQEgHSfwzFvCyV9pYC3nVLKWIPLXRgKr38ZZ/rpO4JnzCSx/rSRwTPkElr92Eli7yr87AKl0faDNkm8WWv5aSuCa7hVQ/ppK4JHupyDy19TeemO2MYgDaEpTu4vek41B5K+1BN5SFcHy11wC50w9iPy1l8At0SyMA0BKe4c5LHkGTZ3kbx3Hcfhrx4PzwfqX9gfLg+3B/Lvbgy8mME8Ar8vf46V+uAPz4515vGOPd/Kv7/X6GIfHmPwhP//uDeKtXZqud38wPRgf/Pkf5d5iAKc/384Hjxfj8SI9XrwA93L6/DEp+Sx5zwRp82IPnV2TLe2eMAkNLknuaZgOrvbR2yW5pfxFUlb/uAD4du/sitzzLQdMfblvHz0QNaEx775sKe0uyE/y5VhN/8P3Ni2QcUFq07MOg+thIrDiI6e7WYHaY5D+hsG/nnY4u7saQ+bdodt76ZlcDS+BP/UK4b27i1F/e6ytv2u+exxE2iN18trT8T/jmvuIhsYeO8ePEZn1CPVmYrqrgbNv0dtaIdzfeCzGUTWLNx9vw6YC64/9OvxHDLLLiivf6atIC0d1tXPpZ7MBJqNrXvv+pqMCnZl+uPjdrQ0PdWD1beq+EN5NwRiH/FQshEdTUQq5ijMxm2GYycCaT6De3oLHW2no4O2f9IVwbzVwxINOt3vHhXBnNXDMg4aWe79v4ZP8SWDFmZi+JgGmramjnn4aKIS76iLHwAfdb1OXMxFd1cDDrQQ2jz0WwqcCOE4pd/R3Mzqag5m2Rs/8TL0tRT9zMOetJNDRl+DeVQk0zCWJZeypEO5kDmZIdcr9PvZTCHcxB3Okit9/vxeGTgrhDuZgxvVWEtrOqYdCuPE5mPuwziWt7RybL4TP4d8bf2X6pfsvfSR643DuW8nutqzDGHVm5he39BdZ+MMhaxluwS/Nf+1WmnL77RzB5e8Of/yT7e/Nf+8Xl7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQD3/Ay+pFNyCsNEjAAAAAElFTkSuQmCC",
  uzi = "" + new URL("fireworks-2wG1MQGi.png", import.meta.url).href,
  hzi = "" + new URL("gemini-transparent-C3QVY56c.png", import.meta.url).href,
  pzi = "" + new URL("gemini-C4MGSIHw.png", import.meta.url).href,
  mzi = "" + new URL("github-transparent-C6W0rgXx.png", import.meta.url).href,
  fzi = "" + new URL("github-C6DM68zD.png", import.meta.url).href,
  gzi = "" + new URL("grok-transparent-BtWQ8AyA.png", import.meta.url).href,
  yzi = "" + new URL("xai-C9APDUTb.png", import.meta.url).href,
  bzi = "" + new URL("groq-transparent-DvCWuOtk.png", import.meta.url).href,
  vzi = "" + new URL("groq-DxjL3oyr.png", import.meta.url).href,
  wzi = "" + new URL("grsai-Djvu-ay6.png", import.meta.url).href,
  xzi = "" + new URL("huggingface-transparent-D1yRfyT9.png", import.meta.url).href,
  _zi = "" + new URL("huggingface-C_i5qDcj.webp", import.meta.url).href,
  kzi = "" + new URL("hunyuan-transparent-pJ0iDSb8.png", import.meta.url).href,
  Azi = "" + new URL("hunyuan-el6x823I.png", import.meta.url).href,
  Szi = "" + new URL("hyperbolic-transparent-BkxWkJGJ.png", import.meta.url).href,
  Izi = "" + new URL("hyperbolic-DbK1JYGQ.png", import.meta.url).href,
  Czi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAMAAAA7EzkRAAAAElBMVEVMaXEAAAAAAAAAAAAAAAAAAAAlAuGTAAAABXRSTlMAtEz5NM0xBZkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAYsSURBVHja7dTRDYAwCEDBgnb/lZ3AP4OE3tsAuLCWfip2cVYuAAWgBKAAFIAACkABCKAAFIAACkABCKAAFIAACkABCKAAFIAACkABCKAAFIAACkABCKAAFIAACkABCKAAFIAACkABCKAAFIASgAJQAlAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAJQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoACUABaAEoAAUgAAKQAEIoAAUgAAKQAEIoAAUgAAKwPndeWBRHWd9nkGH0t0BBFAACkAAAQRQAAIIIIACEEAAARSAAAIIoAAEEEAABSCAAAIoAAEEEEABCCCAAApAAAEEUAACCCCAAhBAAAEUgAACCKAABBBAAAUggAACKAABBBBAASgAARSAAhBAAAEUgAACCKAABBBAAAUggAACKAABBBBAAQgggAAKQAABBFAAAggggAIQQAABFIAAAgigAAQQQAAFIIAAAigAAQQQQAEIIIAACkAAAQRQAApAAAEEUAACCCCAAhBAAAEUgAACCKAABBBAAAUggAACKAABBBBAAQgggAAKQAABBFAAAggggAIQQAABFIAAAgigAAQQQAAFIIAAAigAAQQQQAEoAAEUgAIQQAABFIAAAgigAAQQQAAFIIAAAigAAQQQQI3pAlAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABBBAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAEEUAAKQAAFoAAEUAAKQAAFoAAEUAAKQAAFoAAEUAAKQAAFoAAEUAAKQAAFoAAEUAAKQAAFoAAEUAAKQAAFoAAEUAAKQAABBFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABFAACkAABaAABBBAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAAAWgAARQAApAZwAQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEEEEABKAABFIACEEABKAABFIACEEABKAABFIACEEABKAABFIACEEABKAABFIACEEABKAABFIACEEABKAABFIACEEABKAABFIACEEAAARSAAhBAASgAARSAAhBAASgAARSAAhBAASgAARSAAhBAASgAARSAAhBAASgAARSAAhBAASgAARSAAhBAASgAARSAAhBAAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEUgAIQQAEoAAEEEEABKAABFIACEEABKAABFIACEEABKAABFIACEEABKAABFID6tIziGvjb1TMHZ6+1ADE+zgAEEEAABSCAAAIoAAEEEEABCCCAAAIoAAEEEEABCCCAAApAAAEEUAACCCCAAhBAAAEUgAACCKAABBBAAAUggAACKAABBBBAAQgggAAKQAABBFAAAggggAAKQAABBFAAAggggAIQQAABBFAAAggggAIQQAABFIAAAgigAAQQQAAFIIAAAigAAQQQQAEIIIAACkAAAQRQAAIIIIACEEAAARSAAAIIoAAEEEAABSCAAAIIoAAEEEAABSCAAAIoAAEEEEAABSCAAAIoAAEEEEABCCCAAApAAAEEUAACCCCAAhBAAAEUgAACCKAABBBAAAUggAACKAABBBBAAQgggAAKQAABBBBAAQgggAAKQAABBFAAAggggAIQQAABBFAAAggggDoG4AMhShk8R6va6QAAAABJRU5ErkJggg==",
  Ezi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAB7CAAAewgFu0HU+AAAEV0lEQVR4nO3cvY4bVRyH4f94vd5kN0j5RJGIBAooIgUdZQooKEGCu+EqkCgACQpqJK4CItFCAhIVoksCiaIkmHjX9qGgRT8lisc2nue5gHOOx/OemWlO11prBfyn0aYXANtMIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCMabXgAv7snJsj679bBuPziu/VG38vFPlq2uHI3ro9fP1Nsvn1r5+NtMIDtgvqz69eFJ/fjnrLc5Hjxd1DtXDnsbf1t5xeKZdF3V6p9N208gEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBLIDuq6q9TxHa/3PsY0Gd+zP00ezastW3Q4d0bF4fFyTyV4dTUa93cVH+6PaH+B22rXWBrUxfPXe1zV9MK390/ubXspqLJY1Pnu63vj43Tr71uVq8+XKp1i2VqfHo3rlaFxnD4ZVyeCeIHdu3a35bL7pZazU6cmoLs/ndf3cjkS/RYa1HVTVaLx7P7kdTmo8Pd70MnbS7t0tQ9Sqlnv+yj64qjtjUJ+SayMQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCIYXyLAOceEFDS8QeA6DO/bn+vtv1vT+tCZnJr2Mvzhe1G/f/V6zx7Nexme9BhfIh1980Pscn9/4su7+fK/3eeifV6wVe/poVm3hO2dXCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCGTFxgfjqm69c3Zd1d5kb72TDsR40wtYt5uf/lCzx7Man1r9T+9GXZ1MT2p6f7rysZOTv+f10ze3686te7VcLFc+flss6/DiYb1249W6dO3iysffZoML5PtPbtbsyXF1Pe3yrf17Q63TfDav29/+XN3ol17Gb63qwtXzdebSkUB23eJ4Ucv5em/gdVguWtWi9Tb+Yr6otuxv/G01vG+Qvh4dO64b6HUbXiDwHAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgGFwgQzx4YBXaslUb4KUb3KkmF69dqL/+mNbkaH/TS/nfWJws6vzVc3Xw0sGml7J2XWtD3Bfg2QzuFQueh0AgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgE/wDmUrNnA4R2NwAAAABJRU5ErkJggg==",
  Tzi = "" + new URL("jimeng-transparent-CUj8SDSO.png", import.meta.url).href,
  Mzi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%20role='img'%20aria-label='Jimeng'%3e%3crect%20width='64'%20height='64'%20rx='32'%20fill='%23000'/%3e%3cg%20transform='translate(12.8%2012.8)%20scale(1.6)'%3e%3cdefs%3e%3cclipPath%20id='jimeng-main'%3e%3cpath%20d='M5.257%201.808C8.768%206.741%2014.431%209.451%2020.064%208.403c.398-.074.831-.207%201.281-.38.855-.329%201.975%201.011%201.326%201.658-.429.428-.84.82-1.208%201.147-2.536%202.251-5.337%204.282-8.389%206.044a51.146%2051.146%200%200%201-9.49%204.263c-.453.15-.98.304-1.546.457-.885.238-1.484-1.4-.771-1.975.379-.306.714-.617.979-.927C5.969%2014.336%206.299%208.174%203.717%202.697a18.2%2018.2%200%200%201-.364-.84C2.995.981%204.042.335%204.656%201.055c.243.284.453.545.601.753Z'/%3e%3c/clipPath%3e%3cclipPath%20id='jimeng-tail'%3e%3cpath%20d='M19.529%2013.695c-2.323%202.863-2.815%205.944-2.378%208.583l.025.16c.117.79-.816%201.277-1.448.787l-.093-.071c-2.12-1.614-4.621-2.828-7.949-2.446a27.95%2027.95%200%200%200%206.087-2.627c2.209-1.275%204.147-2.774%205.756-4.386Z'/%3e%3c/clipPath%3e%3clinearGradient%20id='jimeng-main-gradient'%20x1='0'%20x2='500'%20y1='0'%20y2='500'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2327B2F0'/%3e%3cstop%20offset='.203'%20stop-color='%2326DFFB'/%3e%3cstop%20offset='.406'%20stop-color='%2330F5FE'/%3e%3cstop%20offset='.653'%20stop-color='%23F0FEFC'/%3e%3cstop%20offset='.863'%20stop-color='%23FBC610'/%3e%3cstop%20offset='1'%20stop-color='%23FD9C22'/%3e%3c/linearGradient%3e%3clinearGradient%20id='jimeng-tail-gradient'%20x1='0'%20x2='500'%20y1='0'%20y2='500'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%231C6FFF'/%3e%3cstop%20offset='1'%20stop-color='%2324B5EF'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20clip-path='url(%23jimeng-main)'%3e%3cg%20transform='matrix(-.009271%20-.017448%20.021501%20-.013488%2013.047%2018.229)'%3e%3crect%20width='1077.71'%20height='666.506'%20fill='url(%23jimeng-main-gradient)'%20shape-rendering='crispEdges'/%3e%3crect%20width='1077.71'%20height='666.506'%20fill='url(%23jimeng-main-gradient)'%20transform='scale(1%20-1)'%20shape-rendering='crispEdges'/%3e%3crect%20width='1077.71'%20height='666.506'%20fill='url(%23jimeng-main-gradient)'%20transform='scale(-1%201)'%20shape-rendering='crispEdges'/%3e%3crect%20width='1077.71'%20height='666.506'%20fill='url(%23jimeng-main-gradient)'%20transform='scale(-1)'%20shape-rendering='crispEdges'/%3e%3c/g%3e%3c/g%3e%3cg%20clip-path='url(%23jimeng-tail)'%3e%3cg%20transform='matrix(-.002826%20-.004894%20.009719%20-.005611%2016.591%2023.223)'%3e%3crect%20width='4828.03'%20height='1485.61'%20fill='url(%23jimeng-tail-gradient)'%20shape-rendering='crispEdges'/%3e%3crect%20width='4828.03'%20height='1485.61'%20fill='url(%23jimeng-tail-gradient)'%20transform='scale(1%20-1)'%20shape-rendering='crispEdges'/%3e%3crect%20width='4828.03'%20height='1485.61'%20fill='url(%23jimeng-tail-gradient)'%20transform='scale(-1%201)'%20shape-rendering='crispEdges'/%3e%3crect%20width='4828.03'%20height='1485.61'%20fill='url(%23jimeng-tail-gradient)'%20transform='scale(-1)'%20shape-rendering='crispEdges'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
  Pzi = "data:image/png;base64,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",
  Rzi = "data:image/png;base64,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",
  Nzi = "" + new URL("lanyun-B8brKWPb.png", import.meta.url).href,
  jzi = "" + new URL("lmstudio-transparent-B0Xc0F1h.png", import.meta.url).href,
  Dzi = "" + new URL("lmstudio-BKXYpFdb.png", import.meta.url).href,
  Lzi = "" + new URL("longcat-transparent-DeEtHOnl.png", import.meta.url).href,
  Ozi = "data:image/png;base64,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",
  Bzi = "" + new URL("minimax-transparent-D4SISBHw.png", import.meta.url).href,
  Fzi = "" + new URL("minimax-B0Eo-1V9.png", import.meta.url).href,
  zzi = "data:image/png;base64,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",
  Uzi = "data:image/png;base64,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",
  $zi = "data:image/png;base64,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",
  Gzi = "" + new URL("modelscope-CJyewHiF.png", import.meta.url).href,
  Vzi = "" + new URL("moonshot-transparent-8vfJ84GR.png", import.meta.url).href,
  Hzi = "" + new URL("moonshot-DRX5773U.webp", import.meta.url).href,
  Wzi = "" + new URL("new-api-transparent-DWcrp7T6.png", import.meta.url).href,
  qzi = "" + new URL("new-api-9xdaY7q5.png", import.meta.url).href,
  Kzi = "" + new URL("nvidia-transparent-D4wI7Hgj.png", import.meta.url).href,
  Qzi = "" + new URL("nvidia-oSS9qnh1.png", import.meta.url).href,
  Yzi = "data:image/png;base64,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",
  Xzi = "" + new URL("ocoolai-transparent-CUJotdYP.svg", import.meta.url).href,
  Jzi = "" + new URL("ocoolai-BqMN4HQx.png", import.meta.url).href,
  Zzi = "" + new URL("ollama-transparent-CEPfkvcY.png", import.meta.url).href,
  eUi = "" + new URL("ollama-BiKnEc5r.png", import.meta.url).href,
  tUi = "" + new URL("openai-transparent-p3my7i1K.png", import.meta.url).href,
  nUi = "" + new URL("openai--2_yMGcs.png", import.meta.url).href,
  rUi = "" + new URL("openai-transparent-p3my7i1K.png", import.meta.url).href,
  aUi = "" + new URL("openai--2_yMGcs.png", import.meta.url).href,
  iUi = "" + new URL("openrouter-transparent-D3I8mcaL.png", import.meta.url).href,
  oUi = "" + new URL("openrouter-CT0jBAsT.png", import.meta.url).href,
  sUi = "" + new URL("perplexity-transparent-m7RO8dUh.png", import.meta.url).href,
  lUi = "" + new URL("perplexity-BwIm93Ua.png", import.meta.url).href,
  cUi = "" + new URL("ph8-JO6U1vW7.png", import.meta.url).href,
  dUi = "" + new URL("ppio-transparent-DtmgT7HZ.png", import.meta.url).href,
  uUi = "data:image/png;base64,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",
  hUi = "" + new URL("qiniu-transparent-BD05sf-0.png", import.meta.url).href,
  pUi = "data:image/webp;base64,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",
  mUi = "data:image/png;base64,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",
  fUi = "data:image/png;base64,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",
  gUi = "" + new URL("soonstudio-UX013Oqu.png", import.meta.url).href,
  yUi = "data:image/png;base64,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",
  bUi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='33'%20height='38'%20viewBox='0%200%2033%2038'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_4321_9943)'%3e%3cpath%20d='M1.51221%206.59813C1.51221%204.09263%203.54331%202.06152%206.04881%202.06152H27.9757C30.4812%202.06152%2032.5123%204.09263%2032.5123%206.59813C32.5123%209.10362%2030.4812%2011.1347%2027.9757%2011.1347H6.04881C3.54331%2011.1347%201.51221%209.10362%201.51221%206.59813Z'%20fill='%236200EE'/%3e%3cpath%20d='M3.38905%203.56467C5.26076%201.89906%208.12831%202.06615%209.79391%203.93785L22.1493%2017.8221C23.8149%2019.6938%2023.6478%2022.5614%2021.7761%2024.227C19.9044%2025.8926%2017.0369%2025.7255%2015.3713%2023.8538L3.01586%209.96953C1.35026%208.09782%201.51734%205.23027%203.38905%203.56467Z'%20fill='%236200EE'/%3e%3cpath%20d='M1.51221%2020.9643C1.51221%2018.4588%203.54331%2016.4277%206.04881%2016.4277H18.9025C21.408%2016.4277%2023.4391%2018.4588%2023.4391%2020.9643C23.4391%2023.4698%2021.408%2025.5009%2018.9025%2025.5009H6.04881C3.54331%2025.5009%201.51221%2023.4698%201.51221%2020.9643Z'%20fill='%236200EE'/%3e%3cpath%20d='M10.5854%2032.3052C10.5854%2034.8107%208.55431%2036.8418%206.04881%2036.8418C3.54331%2036.8418%201.51221%2034.8107%201.51221%2032.3052C1.51221%2029.7997%203.54331%2027.7686%206.04881%2027.7686C8.55431%2027.7686%2010.5854%2029.7997%2010.5854%2032.3052Z'%20fill='%23BF7AFF'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4321_9943'%3e%3crect%20width='32.5124'%20height='36.9029'%20fill='white'%20transform='translate(0%200.548828)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
  vUi = "" + new URL("soullens-DzBKmjGP.svg", import.meta.url).href,
  wUi = "" + new URL("stepfun-transparent-BWJJI5Ho.png", import.meta.url).href,
  xUi = "data:image/png;base64,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",
  _Ui = "" + new URL("tencent-cloud-ti-transparent-yv0-5aMF.png", import.meta.url).href,
  kUi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAxIDc5LmE4ZDQ3NTM0OSwgMjAyMy8wMy8yMy0xMzowNTo0NSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0NkU3NzJERjdFNjExRUZBOTk5Q0M5MDczMzRDOTk3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0NkU3NzJFRjdFNjExRUZBOTk5Q0M5MDczMzRDOTk3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTQ2RTc3MkJGN0U2MTFFRkE5OTlDQzkwNzMzNEM5OTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ2RTc3MkNGN0U2MTFFRkE5OTlDQzkwNzMzNEM5OTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6sT3PXAAAAMFBMVEUDxtgC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",
  AUi = "" + new URL("together-transparent-CNlZvdT3.png", import.meta.url).href,
  SUi = "" + new URL("together-0h26j0S1.png", import.meta.url).href,
  IUi = "data:image/png;base64,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",
  CUi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='black'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3crect%20x='2'%20y='3'%20width='20'%20height='7'%20rx='2'/%3e%3crect%20x='2'%20y='14'%20width='20'%20height='7'%20rx='2'/%3e%3cpath%20d='M6%206.5h.01M6%2017.5h.01'/%3e%3c/svg%3e",
  EUi = "" + new URL("tokenflux-CvotEeez.png", import.meta.url).href,
  TUi = "" + new URL("volcengine-ark-transparent-9kZWqf-q.png", import.meta.url).href,
  MUi = "" + new URL("doubao-la_PI8m-.png", import.meta.url).href,
  PUi = "" + new URL("voyageai-transparent-WfYON6eV.png", import.meta.url).href,
  RUi = "" + new URL("voyageai-UINPkc3N.png", import.meta.url).href,
  NUi = "" + new URL("xai-transparent-C3BNIzoZ.png", import.meta.url).href,
  jUi = "" + new URL("xai-C9APDUTb.png", import.meta.url).href,
  DUi = "" + new URL("xirang-transparent-yKBVFxOc.png", import.meta.url).href,
  LUi = "" + new URL("xirang-B42-6Dao.png", import.meta.url).href,
  OUi = "data:image/png;base64,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",
  BUi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='120px'%20height='120px'%20fill='none'%20viewBox='0%200%2035%2035'%20aria-hidden='true'%20focusable='false'%3e%3cg%20transform='translate(6.4%206.15)%20scale(.66)'%3e%3cpath%20fill='%23000'%20d='M32.288%200c.23%200%20.342.281.174.438L30.09%202.654a5.3%205.3%200%200%200-1.684%203.88v19.428a8.26%208.26%200%200%201-8.26%208.26H5.984V8.262A8.26%208.26%200%200%201%2014.246%200zM17.491%205.78a6.02%206.02%200%201%200%200%2012.041%206.02%206.02%200%200%200%200-12.04'/%3e%3cpath%20fill='%23000'%20d='M17.492%208.045a3.644%203.644%200%201%201-.228%207.28v-7.27a4%204%200%200%201%20.228-.01'/%3e%3c/g%3e%3c/svg%3e",
  FUi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1024px'%20height='1024px'%20fill='none'%20viewBox='0%200%2035%2035'%20aria-hidden='true'%20focusable='false'%3e%3ccircle%20cx='17.5'%20cy='17.5'%20r='17.5'%20fill='%23fff'/%3e%3cg%20transform='translate(6.4%206.15)%20scale(.66)'%3e%3cpath%20fill='%23000'%20d='M32.288%200c.23%200%20.342.281.174.438L30.09%202.654a5.3%205.3%200%200%200-1.684%203.88v19.428a8.26%208.26%200%200%201-8.26%208.26H5.984V8.262A8.26%208.26%200%200%201%2014.246%200zM17.491%205.78a6.02%206.02%200%201%200%200%2012.041%206.02%206.02%200%200%200%200-12.04'/%3e%3cpath%20fill='%23000'%20d='M17.492%208.045a3.644%203.644%200%201%201-.228%207.28v-7.27a4%204%200%200%201%20.228-.01'/%3e%3c/g%3e%3c/svg%3e",
  zUi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAMAAAA7EzkRAAAAJFBMVEVMaXEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/eFplAAAAC3RSTlMABxDu1Xm3WiWZPCu1SlIAAAAJcEhZcwAACxMAAAsTAQCanBgAAA1vSURBVHja7d0LluKsGkbhKLcQ5z/fU31u61/drWVpIgSePQIJO/C9gGRZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA/XLeS6i9SWS8eBz7JpdR4+wchp9VTwYdYa7j9SS7GQXyALd/uEBIFcXTlV28PCMUTwpGUcHtMvnpIOCx71Nu3hM1zwkHTb7w9g2kYLf273ZJnhf1Zn/WPgWg5/pmFcQT59hMkEexL+pF/t2BnDnuy3X5ItimCHYk/FfBWPTTsRrn9HEEEe3EJLwgoiKBRAhFEjmJdt229qgCfJAoi+01CW8r/74ZY5zr/u91eRBDZqwf+PAIc6jwO1lcFtCe3y+CX7sxAsYgggkjTI5hxMwMLIk2PgMxwADi9IaAgcvSzn+AAcH5HQEHkneInK7S/CG8JKIi8zPXJV7+OPctcb28iiBx9AnNsA9d3BRREDpx/J6hztncFvEV/1Ty69E5OwjxcK6DT0WsPhYCCSMunHq4ehcOBLeue7FkIIvsFv2CxYb8ULIgc+hfY4fecrrsIKIgcvvdUHEcVRJaGx9+i91EQaZr6NitSgkjL0Fc9EUGkSQD+3xt+cRxGEGkRgEefg+teAgoixxbcyRwsiLR817OFGEGk5bZn8FwEkaZTzdUQ6N62JgF49P3gHYdA/1I6JACPXmLnmyBygmdczA43n7JpuNjlXPTsp3cbP+DkBRVEWq61jlzdXKIg0n2JUzwjT6pRAJ7gDoAdd+Rcl3DMIsNVnWxPrmF9HTwoQaTli51dVyKItCxtxj/tdhVEeg53E5Q1WxBE+gzAI/8tThA5R1WTJDZ/5m/5OFevrCCytPnL60x/+bruuSeXBGAltSAyxO5mtnAqiDScS6Z6kIJId9X0ZMVMNnX09RrP9h4LIn0F4PkqmVUQ6SkAT/gIBZGO3uApJ5E9Z5D5rkvYtYaZdD1fEOklAE96tFIQ6SUAX63jOxwoAAsikwbg4iyHiUQAFkQEYEHEuywACyIC8GJHSRARgAURAdiiqiAiALu3TQAWRMwqAvBpgsimWFEvCyICsHvbFjvnjkALIgKwICIAC8AumehpihCAjy6xx/uSjQAsiAjAgsisRY4A7ALpYa4TcwJBEGn5YgrA/qUkALu3TQCGC6QF4NHrnaQqEYBdIC0ACyImBAFYEBGABREBGK5LEIAXF0gLwBBEBGBBRADG4t62DwRgRgkiArB/KQnAEEQEYNclCMAQRARgQUQAhiBy6MgvAAsiArAgcqaxQAAWRNxCjlmDiEvYBJFxLmETgH3JRgAWRE7UJ1UA9iUbARjLnPe2CcCCiACMWe9tE4AFkYECsP+gu0BaABZEzhNEBGBBRADGrEFEAPYlGwEY0wYRAdi9bQIwZv2SjQAsiAjAmPVfSgKwe9sEYEwbRARgX7IRgDHrl2x2DcBBABZEBGBB5DxlkwAsiLQMIgKw6xJajhwXAXhxOLBhEBGABZGWnZcEYEGk4fQlAC/ubWtYwAvAgkjLHhSABZGWc5gALIg0DSIC8OJfSg2vSxCABZGWhZQALIi0DCICsCDScizZNwD7DJcg0jIAZwFYEPEdakHkPEHEZ7gEkZZloAAsiLS8s0gAXlyX0DBVCsCCSMvTqQLw4nBgyxwiAC8ukP6eVQBGy+q+nuISNgF42CASLgIwWk5wmwCMliV+FYDRMohEARhN7227CsBoGUQ2t5Cj5UBTBGC0LLWqAIyWYbMKwGgZRLIAjJZBJAvAaJk4sx1gtJzyqgCMlkV/7fObJgLwLEEk9XhMUQCe50s2RQBGy8p/FYDRcOgJdoCxNLwuIXf4STsBeKLrEpIAjJYLcFcBGA0rsCwAo6UCRQBGwyCyyzcPBGC8GkRSdwHYCYSZgsgeA6AAjJdnwiIAY2l3GjR3dmewADxXENnjglQBGC8HkU0ARsMgkgTgp4rctaRUv0ipbEqE/YxIvR3B7zAAX7b026QSalEn7GJgEoC/fZb17w8zJgPh2wYmAfibtys9er2qYfD+vPiEF6HYAf5Gv+/e40zBuw/v24MJcbUD/Hgaeaa4qCbi155fSD7D9Xg168naIti3vjsIlrsKhn1e3IED8PZ8tqp2Du8rmI8McPtewpaXs25oZtPwg0Eq/eZgrFuPX43tKwD/8GRvlEUeL6SWmnOMOddUrp1ewtZVAK72r5cp7uTqNABXJygm+2BsXwG4OsMz2Sez+wrAySnGZex/wfcdgLchUvzi1OtJB4833iwr0qf8WnZn5VN2lFsAPmu0MgkLwEvTw40m4RMG4DTQh8+iXWEB+K0BMLjRQQA+85cfDYECcNu/txgCBeBhvjiFuY5A7zO4WwsUgJve8OVmdQG4aXURWXKaAHwZMl45FCMAv0h0t5IA3LK+cLurADxA+yzECMBLy0tGpJCl112CzoeJvSpcu3E9jw8db5nuFfEtRR8yAY9/C3R2xfAkK4Chzy6KBJxkBabTEyPRV576JU7wHWoCzrEEmEd/yUzBXVeA/Z4ZFkK65TrFZ5Asw0wQQcI2/lELx2E6noHL+EvtgS+7E0YPwHuO8w4jLN3uguQZmuk4VrclYO9/mg2WAccujq5THPiWQTrtmLBNMdI7DthrCC5z1LpKwKXPPao0yZtmGbrP4rxOkrbMwAcwQQBe9roawcUIXQp4ltuT6/BJ/4xcpvHv/SHQANilgGWWFScDYJcCnmhYeHMINAD2KGCdZtfHBb09Cpgv0yx6OgvdoYBn+4bfGzeQ2ATpUMDzfb6qmIBHErBMc/bCl+J6FPCMsfCSxzzsM6WA12luwnYOlYAtDeQfAfc0MPOPgOepA9V/BGy5GpPtABNwf7ZnC8Fk/Y+Ah7T7qX3haPol4FGs31aCUfog4KEKPtwWiWZfAh6uYLpXC+ZCPwJ+JI6kP6biWIvoS8DPcd1KzTn+ItdUnDsgIAhIQBAQBCQgCAgCEhAEBAEJCAKCgAQEAUFAgIAgIEBAEBAgIAgIEBAEBAgIAgIEBAEBAoKAAAFBQBCQgCAgCEhAEBAEJCAICAISEAQEAQkIAoKABAQBQUACgoAgIAFBQBAQICAICBAQBAQI+O/GrSWlWmv6+gz6RV8T8KOsKYd//tqcVt1NwA9xTfEvPzgmVQMBP6JfuPOTQ6UgAY+mhAc/OiSdTsBDa7/4zc+OakECNhr+/jsIFv1OwIOoT/3yquMJ2NC/LwMtCxKwoX9fq4K6noAN/TMLE3B/0o9+veUYAu68/vLDn7/pfQLu2ZL4w58fBRECNpuATcIEbDsB/8KWCAF3I7/QAGsxBGw5ABoCCbi0WAK0GEjA3ZsRXmpBcDqQgLtQXmyCczEEbBZBxBACNp6Bv+Zgi9EE3IHt5TbYjyPg0mIXxG4IAZsvwliIIWDjDCKFEHAXwsttCBQgIAEJeHIB32gEBQioEQQkIPQdAQlIQOg7AhKQgNB3BCQgAaHvCEhAAkLfEZCABIS+IyABCQh9R0ACagT0HQEJqBEgIAEJqBEgIAEJqBEgIAEJqBEgIAEJqBEgIAEJqBEgIAEJqBEgIAH1nUYQkIDQdxpBQAJC3xGQgASEviMgAQkIfUdAAhIQ+o6ABCQg9B0BCUhA6DsCEpCA0HcEJKBGgIAEJKBGgIAEJKBGgIAEJKBGgIAEJKBGgIAEJKBGgIAEJKBGgIAE1HcaAQISUN9pBAEJCH1HQAISEPqOgAQkIPQdAQlIQOg7AhKQgNB3BCQgAaHvCEhAAkLfEZCAGgF9R0ACagQISEACagQISEACagQISEACagQISEACagQISEACagQISEACagQISEB9pxEgIAf0nUYQkIDQdwQkIAGh7whIQAJC3xGQgASEviMgAQkIfUdAAhIQ+o6ABCQg9B0BCagR0HcEJKBGgIAEJKBGgIAEJKBGgIAEJKBGgIAEJKBGgIAEJKBGgIAEJKBGgIAE1HcaQUACQt9pBAEJCH1HQAISEPqOgAQkIPQdAQlIQOg7AhKQgNB3BCQgAaHvCEhAAkLfEZCAGgECEpCAGgECEpCAGgECEpCAGgECErB33ui7CwHRUkDDON4nvNx1gYB4n/hy10XDON4nv9x12TCO96kv910iIN6nvNx3ZYQ6IjOgMdcRyvfXh/HKgLOOHh1lkCWNUEfMShqg67aXBdwI0Jr1xa5blwE2FMOFACedg/MQi0kyyGlzcFlGqCOK7j/pEBiXEbJ8sBF31iGwDLGhYxHmrL2Xx4hSq74/ae+tQ+xpiyBnreHTGKtJBsCTjh95jFMVKsCOUuRPknC8nr4J/TZj2jLw+e4Lnc5cm124KQwM6xiVrGMI55zC4jrG4VoFYH8GPpNEcs+F0+X5LJWdQjjlHNb5vHWp/Dt3Ifh4CInbIH9xMf92S7lfCcZTHB0pwRmYkyuY7+h3GSTOR+svvXdh+r0PYz1Tp6VHg2BIyr8zJOKSaozhFkLMtZxtz/R6V8FQbX/gIwr+bSKOiX74XCGRf7NP7YfPclm/Komaa01lM/YBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeJF/AZG9oaj5PWdFAAAAAElFTkSuQmCC",
  UUi = "" + new URL("yi-CLSpCDeh.png", import.meta.url).href,
  $Ui = "data:image/png;base64,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",
  GUi = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2030%2030'%3e%3cstyle%3e%20.bg%20{%20fill:%20%232D2D2D;%20}%20.fg%20{%20fill:%20%23FFFFFF;%20}%20%3c/style%3e%3cpath%20class='bg'%20d='M30,30H0V0h30V30z'/%3e%3cpath%20class='fg'%20d='M15.47,7.1l-1.3,1.85c-0.2,0.29-0.54,0.47-0.9,0.47h-7.1V7.09C6.16,7.1,15.47,7.1,15.47,7.1z'/%3e%3cpolygon%20class='fg'%20points='24.3,7.1%2013.14,22.91%205.7,22.91%2016.86,7.1'/%3e%3cpath%20class='fg'%20d='M14.53,22.91l1.31-1.86c0.2-0.29,0.54-0.47,0.9-0.47h7.09v2.33H14.53z'/%3e%3c/svg%3e",
  VUi = "" + new URL("zhipu-transparent-BsvR28Ex.png", import.meta.url).href,
  HUi = "" + new URL("zhipu-CFgqzqwQ.png", import.meta.url).href,
  WUi = JSON.parse("[{\"id\":\"preset-soullens\",\"name\":\"Soullens\",\"type\":\"new-api\",\"baseUrl\":\"https://api.soullens.org/\",\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"soullens\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.soullens.org/\"},\"openai-responses\":{\"inheritDefaultBaseUrl\":true},\"anthropic-messages\":{\"inheritDefaultBaseUrl\":true},\"gemini-generate-content\":{\"inheritDefaultBaseUrl\":true},\"image-generations\":{\"inheritDefaultBaseUrl\":true},\"image-edits\":{\"inheritDefaultBaseUrl\":true},\"video\":{\"inheritDefaultBaseUrl\":true},\"audio-speech\":{\"inheritDefaultBaseUrl\":true}},\"asyncTasks\":{\"image\":{\"pollEndpoint\":\"/v1/images/tasks/{task_id}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":2000,\"taskIdPath\":\"task_id\",\"statusPath\":\"status\",\"progressPath\":\"progress\",\"errorPath\":\"error.message\",\"queryParam\":\"task_id\",\"successStatuses\":[\"completed\"],\"failureStatuses\":[\"failed\"]}},\"description\":\"Soullens 内置服务入口，按 New API 兼容协议处理，图片生成走异步任务接口。\",\"websites\":{\"official\":\"https://soullens.org/\"}},{\"id\":\"preset-comfyui\",\"name\":\"ComfyUI\",\"type\":\"new-api\",\"baseUrl\":\"https://api.comfy.org\",\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"ComfyUI\",\"icon\":\"comfyui\",\"description\":\"用于连接 ComfyAPI Storage，并为远程媒体上传生成可访问地址。\",\"websites\":{\"official\":\"https://platform.comfy.org/login\",\"officialLabel\":\"Comfy 平台\",\"apiKey\":\"https://platform.comfy.org/login\",\"docs\":\"https://docs.comfy.org/\"}},{\"id\":\"preset-openai\",\"name\":\"OpenAI\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.openai.com/v1\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://api.openai.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-responses\"}},\"showBaseUrl\":true,\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"endpointProfileId\":\"openai-responses\",\"description\":\"使用 Responses API，并兼容 OpenAI 模型列表与媒体端点。\",\"websites\":{\"official\":\"https://openai.com/\",\"apiKey\":\"https://platform.openai.com/api-keys\",\"docs\":\"https://platform.openai.com/docs\",\"models\":\"https://platform.openai.com/docs/models\"}},{\"id\":\"preset-anthropic\",\"name\":\"Anthropic\",\"type\":\"anthropic\",\"baseUrl\":\"https://api.anthropic.com/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.anthropic.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"anthropic-messages\"}},\"showBaseUrl\":true,\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"endpointProfileId\":\"anthropic-messages\",\"description\":\"使用 x-api-key 与 anthropic-version 鉴权。\",\"websites\":{\"official\":\"https://anthropic.com/\",\"apiKey\":\"https://console.anthropic.com/settings/keys\",\"docs\":\"https://docs.anthropic.com/en/docs\",\"models\":\"https://docs.anthropic.com/en/docs/about-claude/models\"}},{\"id\":\"preset-gemini\",\"name\":\"Google\",\"type\":\"gemini\",\"baseUrl\":\"https://generativelanguage.googleapis.com\",\"endpointConfigs\":{\"gemini-generate-content\":{\"baseUrl\":\"https://generativelanguage.googleapis.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"gemini-generate-content\"}},\"showBaseUrl\":true,\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"endpointProfileId\":\"gemini-generate-content\",\"description\":\"使用 generateContent 与 v1beta/models 模型列表。\",\"websites\":{\"official\":\"https://aistudio.google.com/\",\"apiKey\":\"https://aistudio.google.com/app/apikey\",\"docs\":\"https://ai.google.dev/gemini-api/docs\",\"models\":\"https://ai.google.dev/gemini-api/docs/models/gemini\"}},{\"id\":\"preset-new-api\",\"name\":\"New API\",\"type\":\"new-api\",\"baseUrl\":\"http://localhost:3000\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"http://localhost:3000\"},\"openai-responses\":{\"inheritDefaultBaseUrl\":true},\"anthropic-messages\":{\"inheritDefaultBaseUrl\":true},\"gemini-generate-content\":{\"inheritDefaultBaseUrl\":true},\"image-generations\":{\"inheritDefaultBaseUrl\":true},\"image-edits\":{\"inheritDefaultBaseUrl\":true},\"video\":{\"inheritDefaultBaseUrl\":true},\"audio-speech\":{\"inheritDefaultBaseUrl\":true}},\"showBaseUrl\":true,\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"自托管\",\"description\":\"兼容 supported_endpoint_types / endpoint_type 的 New API 接入。\",\"websites\":{\"official\":\"https://docs.newapi.pro/\",\"docs\":\"https://docs.newapi.pro\"}},{\"id\":\"preset-jimeng\",\"name\":\"即梦AI\",\"type\":\"account\",\"baseUrl\":\"/api/jimeng#\",\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"账号登录\",\"icon\":\"jimeng\",\"description\":\"在 SoulLens 中登录你的即梦账号，使用账号权益生成图片和视频。\",\"websites\":{\"official\":\"https://jimeng.jianying.com/ai-tool/home\",\"officialLabel\":\"即梦 AI\",\"apiKey\":\"https://jimeng.jianying.com/ai-tool/home\",\"docs\":\"https://jimeng.jianying.com/ai-tool/home\",\"models\":\"https://jimeng.jianying.com/\"}},{\"id\":\"preset-xyq\",\"name\":\"小云雀\",\"type\":\"account\",\"baseUrl\":\"/api/xyq#\",\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"账号登录\",\"icon\":\"xyq\",\"description\":\"在 SoulLens 中登录你的小云雀账号，使用账号权益生成视频。\",\"modelSource\":\"remote\",\"autoListModels\":true,\"showApiKey\":false,\"showBaseUrl\":false,\"apiKeyRequired\":false,\"websites\":{\"official\":\"https://xyq.jianying.com/home?tab_name=home\",\"officialLabel\":\"小云雀\",\"apiKey\":\"https://xyq.jianying.com/home?tab_name=home\",\"docs\":\"https://xyq.jianying.com/home?tab_name=home\",\"models\":\"https://xyq.jianying.com/\"}},{\"id\":\"preset-cherryin\",\"name\":\"CherryIN\",\"type\":\"openai-response\",\"baseUrl\":\"https://open.cherryin.cc\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://open.cherryin.cc\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"cherryin\",\"description\":\"CherryIN OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://open.cherryin.ai\",\"apiKey\":\"https://open.cherryin.ai/console/token\",\"docs\":\"https://open.cherryin.ai\",\"models\":\"https://open.cherryin.ai/pricing\"}},{\"id\":\"preset-302ai\",\"name\":\"302.AI\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.302.ai\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.302.ai\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.302.ai\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"302ai\",\"description\":\"302.AI OpenAI-compatible 聚合接入。\",\"websites\":{\"official\":\"https://302.ai\",\"apiKey\":\"https://dash.302.ai/apis/list\",\"docs\":\"https://302ai.apifox.cn/api-147522039\",\"models\":\"https://302.ai/pricing/\"}},{\"id\":\"preset-grsai\",\"name\":\"Grsai\",\"type\":\"openai\",\"baseUrl\":\"https://grsai.dakka.com.cn\",\"endpointConfigs\":{\"openai-chat-completions\":{\"inheritDefaultBaseUrl\":true},\"image-generations\":{\"inheritDefaultBaseUrl\":true},\"image-edits\":{\"inheritDefaultBaseUrl\":true}},\"baseUrlOptions\":[{\"value\":\"https://grsai.dakka.com.cn\",\"region\":\"domestic\"},{\"value\":\"https://grsaiapi.com\",\"region\":\"global\"}],\"models\":{\"image\":[{\"key\":\"nano-banana\",\"label\":\"Nano Banana\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-fast\",\"label\":\"Nano Banana Fast\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-2\",\"label\":\"Nano Banana 2\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-2-cl\",\"label\":\"Nano Banana 2 CL\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-2-2k-cl\",\"label\":\"Nano Banana 2 2K CL\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-2-4k-cl\",\"label\":\"Nano Banana 2 4K CL\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-pro\",\"label\":\"Nano Banana Pro\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-pro-vt\",\"label\":\"Nano Banana Pro VT\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-pro-cl\",\"label\":\"Nano Banana Pro CL\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-pro-vip\",\"label\":\"Nano Banana Pro VIP\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"nano-banana-pro-4k-vip\",\"label\":\"Nano Banana Pro 4K VIP\",\"group\":\"Nano Banana\",\"icon\":\"gemini\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"gpt-image-2\",\"label\":\"GPT Image 2\",\"group\":\"GPT Image\",\"icon\":\"openai\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"gpt-image-2-vip\",\"label\":\"GPT Image 2 VIP\",\"group\":\"GPT Image\",\"icon\":\"openai\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"gpt-image-2.5\",\"label\":\"GPT Image 2.5\",\"group\":\"GPT Image\",\"icon\":\"openai\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"gpt-image-2.5-sunburst\",\"label\":\"GPT Image 2.5 Sunburst\",\"group\":\"GPT Image\",\"icon\":\"openai\",\"readonly\":true,\"source\":\"preset\"},{\"key\":\"gpt-image-2.5-flare\",\"label\":\"GPT Image 2.5 Flare\",\"group\":\"GPT Image\",\"icon\":\"openai\",\"readonly\":true,\"source\":\"preset\"}]},\"modelSource\":\"static\",\"autoListModels\":false,\"endpoints\":{\"chat\":\"/v1/chat/completions\",\"image\":\"/v1/api/generate\",\"imageEdit\":\"/v1/api/generate\"},\"asyncTasks\":{\"image\":{\"pollEndpoint\":\"/v1/api/result\",\"pollMethod\":\"GET\",\"pollIntervalMs\":1500,\"taskIdPath\":\"id\",\"statusPath\":\"status\",\"progressPath\":\"progress\",\"errorPath\":\"error\",\"queryParam\":\"id\",\"successStatuses\":[\"succeeded\"],\"failureStatuses\":[\"failed\",\"violation\"]}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"grsai\",\"description\":\"Grsai 图片生成接入，使用异步任务接口提交并查询生成结果。\",\"websites\":{\"official\":\"https://grsai.ai/zh\",\"apiKey\":\"https://grsai.ai/zh/dashboard/api-keys\",\"docs\":\"https://qmy27nhsd9.apifox.cn/452392911e0\"}},{\"id\":\"preset-aihubmix\",\"name\":\"AiHubMix\",\"type\":\"openai-response\",\"baseUrl\":\"https://aihubmix.com\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://aihubmix.com\"},\"gemini-generate-content\":{\"baseUrl\":\"https://aihubmix.com/gemini/v1beta\"},\"openai-chat-completions\":{\"baseUrl\":\"https://aihubmix.com/v1\"},\"openai-responses\":{\"baseUrl\":\"https://aihubmix.com/v1\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"aihubmix\",\"description\":\"AiHubMix OpenAI-compatible 聚合接入。\",\"websites\":{\"official\":\"https://aihubmix.com?aff=SJyh\",\"apiKey\":\"https://aihubmix.com?aff=SJyh\",\"docs\":\"https://doc.aihubmix.com/\",\"models\":\"https://aihubmix.com/models\"}},{\"id\":\"preset-ocoolai\",\"name\":\"ocoolAI\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.ocoolai.com\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.ocoolai.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"ocoolai\",\"description\":\"ocoolAI OpenAI-compatible 聚合接入。\",\"websites\":{\"official\":\"https://one.ocoolai.com/\",\"apiKey\":\"https://one.ocoolai.com/token\",\"docs\":\"https://docs.ocoolai.com/\",\"models\":\"https://api.ocoolai.com/info/models/\"}},{\"id\":\"preset-dmxapi\",\"name\":\"DMXAPI\",\"type\":\"openai-response\",\"baseUrl\":\"https://www.dmxapi.cn\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://www.dmxapi.cn\"},\"gemini-generate-content\":{\"baseUrl\":\"https://www.dmxapi.cn/v1beta/\"},\"openai-chat-completions\":{\"baseUrl\":\"https://www.dmxapi.cn\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"dmxapi\",\"description\":\"DMXAPI OpenAI-compatible 聚合接入。\",\"websites\":{\"official\":\"https://www.dmxapi.cn/register?aff=bwwY\",\"apiKey\":\"https://www.dmxapi.cn/register?aff=bwwY\",\"docs\":\"https://doc.dmxapi.cn/\",\"models\":\"https://www.dmxapi.cn/pricing\"}},{\"id\":\"preset-burncloud\",\"name\":\"BurnCloud\",\"type\":\"openai-response\",\"baseUrl\":\"https://ai.burncloud.com\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://ai.burncloud.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"burncloud\",\"description\":\"BurnCloud OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://ai.burncloud.com/\",\"apiKey\":\"https://ai.burncloud.com/token\",\"docs\":\"https://ai.burncloud.com/docs\",\"models\":\"https://ai.burncloud.com/pricing\"}},{\"id\":\"preset-tokenflux\",\"name\":\"TokenFlux\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.tokenflux.ai/openai/v1\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://api.tokenflux.ai/openai/v1\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"tokenflux\",\"description\":\"TokenFlux OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://api.tokenflux.ai\",\"apiKey\":\"https://api.tokenflux.ai/dashboard/api-keys\",\"docs\":\"https://api.tokenflux.ai/docs\",\"models\":\"https://api.tokenflux.ai/models\"}},{\"id\":\"preset-ph8\",\"name\":\"PH8\",\"type\":\"openai-response\",\"baseUrl\":\"https://ph8.co\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://ph8.co\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"ph8\",\"description\":\"PH8 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://ph8.co\",\"apiKey\":\"https://ph8.co/apiKey\",\"docs\":\"https://m1r239or5aw.feishu.cn/wiki/SegzwS4x1i2P4OksFY2cMvujn9f\",\"models\":\"https://ph8.co/v1/models\"}},{\"id\":\"preset-ppio\",\"name\":\"PPIO\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.ppinfra.com/v3/openai\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.ppinfra.com/v3/openai/\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"endpoints\":{\"chat\":\"/responses\",\"image\":\"/images/generations\",\"imageEdit\":\"/images/edits\",\"video\":\"/videos\",\"videoQuery\":\"/videos/{taskId}\",\"audio\":\"/audio/speech\"},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"icon\":\"ppio\",\"description\":\"PPIO OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://ppio.com/user/register?invited_by=JYT9GD&utm_source=github_cherry-studio&redirect=/\",\"apiKey\":\"https://ppio.com/user/register?invited_by=JYT9GD&utm_source=github_cherry-studio&redirect=/settings/key-management\",\"docs\":\"https://docs.cherry-ai.com/pre-basic/providers/ppio?invited_by=JYT9GD&utm_source=github_cherry-studio\",\"models\":\"https://ppio.com/model-api/product/llm-api?invited_by=JYT9GD&utm_source=github_cherry-studio\"}},{\"id\":\"preset-azure-openai\",\"name\":\"Azure OpenAI\",\"type\":\"azure-openai\",\"baseUrl\":\"\",\"apiVersion\":\"\",\"showBaseUrl\":true,\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"云厂商\",\"description\":\"填写 Azure resource endpoint，并手动添加 deployment/model。\",\"websites\":{\"official\":\"https://azure.microsoft.com/en-us/products/ai-services/openai-service\",\"apiKey\":\"https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/OpenAI\",\"docs\":\"https://learn.microsoft.com/en-us/azure/ai-services/openai/\",\"models\":\"https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models\"}},{\"id\":\"preset-ollama\",\"name\":\"Ollama\",\"type\":\"ollama\",\"baseUrl\":\"http://localhost:11434\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"http://localhost:11434\"}},\"showBaseUrl\":true,\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"本地模型\",\"description\":\"默认本地地址，模型列表从 /api/tags 获取。\",\"websites\":{\"official\":\"https://ollama.com/\",\"docs\":\"https://github.com/ollama/ollama/tree/main/docs\",\"models\":\"https://ollama.com/library\"}},{\"id\":\"preset-lmstudio\",\"name\":\"LM Studio\",\"type\":\"lmstudio\",\"baseUrl\":\"http://localhost:1234/v1\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"http://localhost:1234/v1\"}},\"showBaseUrl\":true,\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"本地模型\",\"description\":\"LM Studio 本地 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://lmstudio.ai/\",\"docs\":\"https://lmstudio.ai/docs\",\"models\":\"https://lmstudio.ai/models\"}},{\"id\":\"preset-openrouter\",\"name\":\"OpenRouter\",\"type\":\"openai-response\",\"baseUrl\":\"https://openrouter.ai/api/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://openrouter.ai/api\"},\"openai-chat-completions\":{\"baseUrl\":\"https://openrouter.ai/api/v1/\"},\"image-generations\":{\"baseUrl\":\"https://openrouter.ai/api/v1/\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"聚合平台\",\"description\":\"OpenRouter OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://openrouter.ai/\",\"apiKey\":\"https://openrouter.ai/settings/keys\",\"docs\":\"https://openrouter.ai/docs/quick-start\",\"models\":\"https://openrouter.ai/models\"}},{\"id\":\"preset-silicon\",\"name\":\"SiliconFlow\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.siliconflow.cn/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.siliconflow.cn\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.siliconflow.cn/v1\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"description\":\"硅基流动 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://www.siliconflow.cn\",\"apiKey\":\"https://cloud.siliconflow.cn/i/d1nTBKXU\",\"docs\":\"https://docs.siliconflow.cn/\",\"models\":\"https://cloud.siliconflow.cn/models\"}},{\"id\":\"preset-deepseek\",\"name\":\"DeepSeek\",\"type\":\"openai\",\"baseUrl\":\"https://api.deepseek.com\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.deepseek.com/anthropic\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.deepseek.com\"},\"openai-responses\":{\"baseUrl\":\"https://api.deepseek.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"endpointProfileId\":\"deepseek-chat\",\"description\":\"DeepSeek OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://deepseek.com/\",\"apiKey\":\"https://platform.deepseek.com/api_keys\",\"docs\":\"https://platform.deepseek.com/api-docs/\",\"models\":\"https://platform.deepseek.com/api-docs/\"}},{\"id\":\"preset-zhipu\",\"name\":\"Zhipu AI\",\"type\":\"openai\",\"baseUrl\":\"https://open.bigmodel.cn/api/paas/v4\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://open.bigmodel.cn/api/anthropic\"},\"openai-chat-completions\":{\"baseUrl\":\"https://open.bigmodel.cn/api/paas/v4/\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"endpoints\":{\"chat\":\"/chat/completions\",\"image\":\"/images/generations\",\"imageEdit\":\"/images/edits\",\"video\":\"/videos\",\"videoQuery\":\"/videos/{taskId}\",\"audio\":\"/audio/speech\"},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"description\":\"智谱 BigModel OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://open.bigmodel.cn/\",\"apiKey\":\"https://open.bigmodel.cn/usercenter/apikeys\",\"docs\":\"https://docs.bigmodel.cn/\",\"models\":\"https://open.bigmodel.cn/modelcenter/square\"}},{\"id\":\"preset-zai\",\"name\":\"Z.ai\",\"type\":\"openai\",\"baseUrl\":\"https://api.z.ai/api/paas/v4\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.z.ai/api/anthropic\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.z.ai/api/paas/v4/\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"endpoints\":{\"chat\":\"/chat/completions\",\"image\":\"/images/generations\",\"imageEdit\":\"/images/edits\",\"video\":\"/videos\",\"videoQuery\":\"/videos/{taskId}\",\"audio\":\"/audio/speech\"},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"icon\":\"zai\",\"description\":\"Z.ai OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://z.ai\",\"apiKey\":\"https://z.ai/manage-apikey/apikey-list\",\"docs\":\"https://docs.z.ai/\",\"models\":\"https://docs.z.ai/models\"}},{\"id\":\"preset-dashscope\",\"name\":\"阿里云百炼\",\"type\":\"openai-response\",\"baseUrl\":\"https://dashscope.aliyuncs.com\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://dashscope.aliyuncs.com/apps/anthropic\"},\"openai-chat-completions\":{\"baseUrl\":\"https://dashscope.aliyuncs.com/compatible-mode/v1/\"},\"openai-responses\":{\"baseUrl\":\"https://dashscope.aliyuncs.com/compatible-mode/v1/\"},\"image-generations\":{\"inheritDefaultBaseUrl\":true},\"image-edits\":{\"inheritDefaultBaseUrl\":true},\"video\":{\"inheritDefaultBaseUrl\":true}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"models\":{\"image\":[{\"key\":\"qwen-image-3.0-pro\",\"label\":\"Qwen Image 3.0 Pro\",\"group\":\"Qwen Image\",\"icon\":\"dashscope\",\"readonly\":true,\"source\":\"preset\",\"vendorId\":\"alibaba\",\"modelFamily\":\"qwen-image-3\",\"capabilities\":[\"image\"],\"providerModelRoute\":{\"providerId\":\"preset-dashscope\",\"apiModelId\":\"qwen-image-3.0-pro\",\"canonicalModelId\":\"qwen-image-3.0-pro\",\"adapterId\":\"dashscope.qwen-image\",\"mediaPolicy\":{\"referenceMediaMode\":\"public-url-or-base64\",\"requiresPublicAssetUpload\":false},\"operations\":{\"image.create\":{\"endpointType\":\"image-generations\",\"endpoint\":\"/services/aigc/multimodal-generation/generation\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.qwen-image\",\"responseAdapterId\":\"dashscope.qwen-image\"},\"image.edit\":{\"endpointType\":\"image-edits\",\"endpoint\":\"/services/aigc/multimodal-generation/generation\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.qwen-image\",\"responseAdapterId\":\"dashscope.qwen-image\"}}}},{\"key\":\"qwen-image-3.0\",\"label\":\"Qwen Image 3.0\",\"group\":\"Qwen Image\",\"icon\":\"dashscope\",\"readonly\":true,\"source\":\"preset\",\"vendorId\":\"alibaba\",\"modelFamily\":\"qwen-image-3\",\"capabilities\":[\"image\"],\"providerModelRoute\":{\"providerId\":\"preset-dashscope\",\"apiModelId\":\"qwen-image-3.0\",\"canonicalModelId\":\"qwen-image-3.0\",\"adapterId\":\"dashscope.qwen-image\",\"mediaPolicy\":{\"referenceMediaMode\":\"public-url-or-base64\",\"requiresPublicAssetUpload\":false},\"operations\":{\"image.create\":{\"endpointType\":\"image-generations\",\"endpoint\":\"/services/aigc/multimodal-generation/generation\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.qwen-image\",\"responseAdapterId\":\"dashscope.qwen-image\"},\"image.edit\":{\"endpointType\":\"image-edits\",\"endpoint\":\"/services/aigc/multimodal-generation/generation\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.qwen-image\",\"responseAdapterId\":\"dashscope.qwen-image\"}}}},{\"key\":\"wan2.7-image-pro\",\"label\":\"Wan 2.7 Image Pro\",\"group\":\"Wan Image\",\"icon\":\"dashscope\",\"readonly\":true,\"source\":\"preset\",\"vendorId\":\"alibaba\",\"modelFamily\":\"wan-image-2.7\",\"capabilities\":[\"image\"],\"providerModelRoute\":{\"providerId\":\"preset-dashscope\",\"apiModelId\":\"wan2.7-image-pro\",\"canonicalModelId\":\"wan2.7-image-pro\",\"adapterId\":\"dashscope.wan-image\",\"mediaPolicy\":{\"referenceMediaMode\":\"public-url-or-base64\",\"requiresPublicAssetUpload\":false},\"operations\":{\"image.create\":{\"endpointType\":\"image-generations\",\"endpoint\":\"/services/aigc/image-generation/generation\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.wan-image\",\"responseAdapterId\":\"dashscope.wan-image\",\"asyncTask\":{\"adapterId\":\"dashscope.wan-image\",\"adapterVersion\":\"1\",\"submitMode\":\"native\",\"pollEndpoint\":\"/tasks/{taskId}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":3000,\"taskIdPath\":\"output.task_id\",\"statusPath\":\"output.task_status\",\"errorPath\":\"message\",\"resultPath\":\"output.choices\",\"successStatuses\":[\"SUCCEEDED\"],\"failureStatuses\":[\"FAILED\",\"CANCELED\",\"UNKNOWN\"],\"taskRetentionMs\":86400000,\"resultRetentionMs\":86400000,\"cancelCapability\":\"unsupported\"}},\"image.edit\":{\"endpointType\":\"image-edits\",\"endpoint\":\"/services/aigc/image-generation/generation\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.wan-image\",\"responseAdapterId\":\"dashscope.wan-image\",\"asyncTask\":{\"adapterId\":\"dashscope.wan-image\",\"adapterVersion\":\"1\",\"submitMode\":\"native\",\"pollEndpoint\":\"/tasks/{taskId}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":3000,\"taskIdPath\":\"output.task_id\",\"statusPath\":\"output.task_status\",\"errorPath\":\"message\",\"resultPath\":\"output.choices\",\"successStatuses\":[\"SUCCEEDED\"],\"failureStatuses\":[\"FAILED\",\"CANCELED\",\"UNKNOWN\"],\"taskRetentionMs\":86400000,\"resultRetentionMs\":86400000,\"cancelCapability\":\"unsupported\"}}}}},{\"key\":\"wan2.7-image\",\"label\":\"Wan 2.7 Image\",\"group\":\"Wan Image\",\"icon\":\"dashscope\",\"readonly\":true,\"source\":\"preset\",\"vendorId\":\"alibaba\",\"modelFamily\":\"wan-image-2.7\",\"capabilities\":[\"image\"],\"providerModelRoute\":{\"providerId\":\"preset-dashscope\",\"apiModelId\":\"wan2.7-image\",\"canonicalModelId\":\"wan2.7-image\",\"adapterId\":\"dashscope.wan-image\",\"mediaPolicy\":{\"referenceMediaMode\":\"public-url-or-base64\",\"requiresPublicAssetUpload\":false},\"operations\":{\"image.create\":{\"endpointType\":\"image-generations\",\"endpoint\":\"/services/aigc/image-generation/generation\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.wan-image\",\"responseAdapterId\":\"dashscope.wan-image\",\"asyncTask\":{\"adapterId\":\"dashscope.wan-image\",\"adapterVersion\":\"1\",\"submitMode\":\"native\",\"pollEndpoint\":\"/tasks/{taskId}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":3000,\"taskIdPath\":\"output.task_id\",\"statusPath\":\"output.task_status\",\"errorPath\":\"message\",\"resultPath\":\"output.choices\",\"successStatuses\":[\"SUCCEEDED\"],\"failureStatuses\":[\"FAILED\",\"CANCELED\",\"UNKNOWN\"],\"taskRetentionMs\":86400000,\"resultRetentionMs\":86400000,\"cancelCapability\":\"unsupported\"}},\"image.edit\":{\"endpointType\":\"image-edits\",\"endpoint\":\"/services/aigc/image-generation/generation\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.wan-image\",\"responseAdapterId\":\"dashscope.wan-image\",\"asyncTask\":{\"adapterId\":\"dashscope.wan-image\",\"adapterVersion\":\"1\",\"submitMode\":\"native\",\"pollEndpoint\":\"/tasks/{taskId}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":3000,\"taskIdPath\":\"output.task_id\",\"statusPath\":\"output.task_status\",\"errorPath\":\"message\",\"resultPath\":\"output.choices\",\"successStatuses\":[\"SUCCEEDED\"],\"failureStatuses\":[\"FAILED\",\"CANCELED\",\"UNKNOWN\"],\"taskRetentionMs\":86400000,\"resultRetentionMs\":86400000,\"cancelCapability\":\"unsupported\"}}}}}],\"video\":[{\"key\":\"wan3.0-video\",\"label\":\"Wan 3.0 Video\",\"group\":\"Wan Video\",\"icon\":\"dashscope\",\"readonly\":true,\"source\":\"preset\",\"vendorId\":\"alibaba\",\"modelFamily\":\"wan-video-3\",\"capabilities\":[\"video\"],\"providerModelRoute\":{\"providerId\":\"preset-dashscope\",\"apiModelId\":\"wan3.0-video\",\"canonicalModelId\":\"wan3.0-video\",\"adapterId\":\"dashscope.wan-video\",\"mediaPolicy\":{\"referenceMediaMode\":\"public-url-or-base64\",\"requiresPublicAssetUpload\":false,\"referenceMediaModes\":{\"image\":\"public-url-or-base64\",\"video\":\"public-url\",\"audio\":\"public-url\"}},\"operations\":{\"video.submit\":{\"endpointType\":\"video\",\"endpoint\":\"/services/aigc/video-generation/video-synthesis\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.wan-video\",\"responseAdapterId\":\"dashscope.wan-video\",\"asyncTask\":{\"adapterId\":\"dashscope.wan-video\",\"adapterVersion\":\"1\",\"submitMode\":\"native\",\"pollEndpoint\":\"/tasks/{taskId}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":15000,\"initialPollDelayMs\":15000,\"taskIdPath\":\"output.task_id\",\"statusPath\":\"output.task_status\",\"errorPath\":\"output.message\",\"resultPath\":\"output.video_url\",\"successStatuses\":[\"SUCCEEDED\"],\"failureStatuses\":[\"FAILED\",\"CANCELED\",\"UNKNOWN\"],\"taskRetentionMs\":86400000,\"resultRetentionMs\":86400000,\"cancelCapability\":\"unsupported\"}},\"video.poll\":{\"endpointType\":\"video\",\"endpoint\":\"/tasks/{taskId}\",\"method\":\"GET\",\"requestAdapterId\":\"dashscope.wan-video\",\"responseAdapterId\":\"dashscope.wan-video\"}}}},{\"key\":\"wan3.0-video-prime\",\"label\":\"Wan 3.0 Video Prime\",\"group\":\"Wan Video\",\"icon\":\"dashscope\",\"readonly\":true,\"source\":\"preset\",\"vendorId\":\"alibaba\",\"modelFamily\":\"wan-video-3\",\"capabilities\":[\"video\"],\"providerModelRoute\":{\"providerId\":\"preset-dashscope\",\"apiModelId\":\"wan3.0-video-prime\",\"canonicalModelId\":\"wan3.0-video-prime\",\"adapterId\":\"dashscope.wan-video\",\"mediaPolicy\":{\"referenceMediaMode\":\"public-url-or-base64\",\"requiresPublicAssetUpload\":false,\"referenceMediaModes\":{\"image\":\"public-url-or-base64\",\"video\":\"public-url\",\"audio\":\"public-url\"}},\"operations\":{\"video.submit\":{\"endpointType\":\"video\",\"endpoint\":\"/services/aigc/video-generation/video-synthesis\",\"method\":\"POST\",\"requestAdapterId\":\"dashscope.wan-video\",\"responseAdapterId\":\"dashscope.wan-video\",\"asyncTask\":{\"adapterId\":\"dashscope.wan-video\",\"adapterVersion\":\"1\",\"submitMode\":\"native\",\"pollEndpoint\":\"/tasks/{taskId}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":15000,\"initialPollDelayMs\":15000,\"taskIdPath\":\"output.task_id\",\"statusPath\":\"output.task_status\",\"errorPath\":\"output.message\",\"resultPath\":\"output.video_url\",\"successStatuses\":[\"SUCCEEDED\"],\"failureStatuses\":[\"FAILED\",\"CANCELED\",\"UNKNOWN\"],\"taskRetentionMs\":86400000,\"resultRetentionMs\":86400000,\"cancelCapability\":\"unsupported\"}},\"video.poll\":{\"endpointType\":\"video\",\"endpoint\":\"/tasks/{taskId}\",\"method\":\"GET\",\"requestAdapterId\":\"dashscope.wan-video\",\"responseAdapterId\":\"dashscope.wan-video\"}}}}]},\"modelSource\":\"static\",\"autoListModels\":false,\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"云厂商\",\"description\":\"DashScope 文本与原生媒体模型接入。\",\"websites\":{\"official\":\"https://www.aliyun.com/product/bailian\",\"apiKey\":\"https://bailian.console.aliyun.com/?tab=model#/api-key\",\"docs\":\"https://help.aliyun.com/zh/model-studio/getting-started/\",\"models\":\"https://bailian.console.aliyun.com/?tab=model#/model-market\"}},{\"id\":\"preset-volcengine-ark\",\"name\":\"火山方舟\",\"type\":\"openai-response\",\"baseUrl\":\"https://ark.cn-beijing.volces.com/api/v3\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://ark.cn-beijing.volces.com/api/v3/\"},\"openai-responses\":{\"baseUrl\":\"https://ark.cn-beijing.volces.com/api/v3/\"},\"image-generations\":{\"inheritDefaultBaseUrl\":true},\"image-edits\":{\"inheritDefaultBaseUrl\":true},\"video\":{\"inheritDefaultBaseUrl\":true}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"endpoints\":{\"chat\":\"/responses\",\"image\":\"/images/generations\",\"imageEdit\":\"/images/generations\",\"video\":\"/contents/generations/tasks\",\"videoQuery\":\"/contents/generations/tasks/{taskId}\",\"audio\":\"/audio/speech\"},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"云厂商\",\"icon\":\"doubao\",\"endpointProfileId\":\"volcengine-ark-responses\",\"description\":\"Volcengine Ark Responses/思考 API 接入。\",\"websites\":{\"official\":\"https://console.volcengine.com/ark/\",\"apiKey\":\"https://www.volcengine.com/experience/ark?utm_term=202502dsinvite&ac=DSASUQY5&rc=DB4II4FC\",\"docs\":\"https://www.volcengine.com/docs/82379/1182403\",\"models\":\"https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint\"}},{\"id\":\"preset-moonshot\",\"name\":\"Moonshot AI\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.moonshot.cn/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.moonshot.cn/anthropic\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.moonshot.cn\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"description\":\"月之暗面 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://www.moonshot.cn/\",\"apiKey\":\"https://platform.moonshot.cn/console/api-keys\",\"docs\":\"https://platform.moonshot.cn/docs/\",\"models\":\"https://platform.moonshot.cn/docs/intro#%E6%A8%A1%E5%9E%8B%E5%88%97%E8%A1%A8\"}},{\"id\":\"preset-minimax\",\"name\":\"MiniMax\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.minimaxi.com/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.minimaxi.com/anthropic\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.minimaxi.com/v1/\"},\"video\":{\"inheritDefaultBaseUrl\":true},\"audio-speech\":{\"inheritDefaultBaseUrl\":true}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"endpoints\":{\"audio\":\"/t2a_v2\",\"video\":\"/v2/video_generation\",\"videoQuery\":\"/v2/query/video_generation/{taskId}\"},\"asyncTasks\":{\"video\":{\"pollEndpoint\":\"/v2/query/video_generation/{taskId}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":10000,\"taskIdPath\":\"task_id\",\"statusPath\":\"task.status\",\"errorPath\":\"task.error.message\",\"successStatuses\":[\"succeeded\"],\"failureStatuses\":[\"failed\",\"cancelled\",\"expired\"]}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"icon\":\"minimax\",\"endpointProfileId\":\"minimax-openai\",\"description\":\"MiniMax OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://platform.minimaxi.com/\",\"apiKey\":\"https://platform.minimaxi.com/user-center/basic-information/interface-key\",\"docs\":\"https://platform.minimaxi.com/docs/api-reference/text-openai-api\",\"models\":\"https://platform.minimaxi.com/document/Models\"}},{\"id\":\"preset-minimax-global\",\"name\":\"MiniMax Global\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.minimax.io/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.minimax.io/anthropic\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.minimax.io/v1/\"},\"video\":{\"inheritDefaultBaseUrl\":true},\"audio-speech\":{\"inheritDefaultBaseUrl\":true}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"endpoints\":{\"audio\":\"/t2a_v2\",\"video\":\"/v2/video_generation\",\"videoQuery\":\"/v2/query/video_generation/{taskId}\"},\"asyncTasks\":{\"video\":{\"pollEndpoint\":\"/v2/query/video_generation/{taskId}\",\"pollMethod\":\"GET\",\"pollIntervalMs\":10000,\"taskIdPath\":\"task_id\",\"statusPath\":\"task.status\",\"errorPath\":\"task.error.message\",\"successStatuses\":[\"succeeded\"],\"failureStatuses\":[\"failed\",\"cancelled\",\"expired\"]}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"icon\":\"minimax\",\"endpointProfileId\":\"minimax-openai\",\"description\":\"MiniMax 海外版 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://platform.minimax.io/\",\"apiKey\":\"https://platform.minimax.io/user-center/basic-information/interface-key\",\"docs\":\"https://platform.minimax.io/docs/api-reference/text-openai-api\",\"models\":\"https://platform.minimax.io/document/Models\"}},{\"id\":\"preset-baichuan\",\"name\":\"Baichuan\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.baichuan-ai.com/v1\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.baichuan-ai.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"description\":\"百川智能 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://www.baichuan-ai.com/\",\"apiKey\":\"https://platform.baichuan-ai.com/console/apikey\",\"docs\":\"https://platform.baichuan-ai.com/docs\",\"models\":\"https://platform.baichuan-ai.com/prices\"}},{\"id\":\"preset-stepfun\",\"name\":\"StepFun\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.stepfun.com/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.stepfun.com\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.stepfun.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"description\":\"阶跃星辰 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://platform.stepfun.com/\",\"apiKey\":\"https://platform.stepfun.com/interface-key\",\"docs\":\"https://platform.stepfun.com/docs/api-reference/chat/chat-completion-create\",\"models\":\"https://platform.stepfun.com/docs/guides/models/overview\"}},{\"id\":\"preset-yi\",\"name\":\"零一万物\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.lingyiwanwu.com/v1\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://api.lingyiwanwu.com/v1\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"description\":\"Yi OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://platform.lingyiwanwu.com/\",\"apiKey\":\"https://platform.lingyiwanwu.com/apikeys\",\"docs\":\"https://platform.lingyiwanwu.com/docs\",\"models\":\"https://platform.lingyiwanwu.com/docs#%E6%A8%A1%E5%9E%8B\"}},{\"id\":\"preset-groq\",\"name\":\"Groq\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.groq.com/openai/v1\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.groq.com/openai\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"description\":\"Groq OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://groq.com/\",\"apiKey\":\"https://console.groq.com/keys\",\"docs\":\"https://console.groq.com/docs/quickstart\",\"models\":\"https://console.groq.com/docs/models\"}},{\"id\":\"preset-together\",\"name\":\"Together AI\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.together.xyz/v1\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.together.xyz/v1\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"description\":\"Together AI OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://www.together.ai/\",\"apiKey\":\"https://api.together.ai/settings/api-keys\",\"docs\":\"https://docs.together.ai/docs/introduction\",\"models\":\"https://docs.together.ai/docs/serverless-models\"}},{\"id\":\"preset-fireworks\",\"name\":\"Fireworks\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.fireworks.ai/inference/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.fireworks.ai/inference\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.fireworks.ai/inference\"},\"openai-responses\":{\"baseUrl\":\"https://api.fireworks.ai/inference\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-responses\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"description\":\"Fireworks OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://fireworks.ai/\",\"apiKey\":\"https://fireworks.ai/account/api-keys\",\"docs\":\"https://docs.fireworks.ai/getting-started/introduction\",\"models\":\"https://fireworks.ai/dashboard/models\"}},{\"id\":\"preset-xai\",\"name\":\"xAI\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.x.ai/v1\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.x.ai\"},\"openai-responses\":{\"baseUrl\":\"https://api.x.ai/v1\"},\"video\":{\"inheritDefaultBaseUrl\":true}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-responses\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"vendorId\":\"xai\",\"vendor\":\"xai\",\"modelVendor\":\"xai\",\"endpointProfileId\":\"xai-responses\",\"description\":\"xAI OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://x.ai/\",\"docs\":\"https://docs.x.ai/\",\"models\":\"https://docs.x.ai/docs/models\"}},{\"id\":\"preset-mistral\",\"name\":\"Mistral\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.mistral.ai/v1\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.mistral.ai\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"description\":\"Mistral OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://mistral.ai\",\"apiKey\":\"https://console.mistral.ai/api-keys/\",\"docs\":\"https://docs.mistral.ai\",\"models\":\"https://docs.mistral.ai/getting-started/models/models_overview\"}},{\"id\":\"preset-perplexity\",\"name\":\"Perplexity\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.perplexity.ai\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.perplexity.ai/\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"endpoints\":{\"chat\":\"/responses\",\"image\":\"/images/generations\",\"imageEdit\":\"/images/edits\",\"video\":\"/videos\",\"videoQuery\":\"/videos/{taskId}\",\"audio\":\"/audio/speech\"},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"description\":\"Perplexity OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://perplexity.ai/\",\"apiKey\":\"https://www.perplexity.ai/settings/api\",\"docs\":\"https://docs.perplexity.ai/home\",\"models\":\"https://docs.perplexity.ai/guides/model-cards\"}},{\"id\":\"preset-modelscope\",\"name\":\"ModelScope\",\"type\":\"openai-response\",\"baseUrl\":\"https://api-inference.modelscope.cn/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api-inference.modelscope.cn\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api-inference.modelscope.cn/v1/\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"description\":\"魔搭社区 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://modelscope.cn\",\"apiKey\":\"https://modelscope.cn/my/myaccesstoken\",\"docs\":\"https://modelscope.cn/docs/model-service/API-Inference/intro\",\"models\":\"https://modelscope.cn/models\"}},{\"id\":\"preset-baidu-cloud\",\"name\":\"百度千帆\",\"type\":\"openai-response\",\"baseUrl\":\"https://qianfan.baidubce.com/v2\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://qianfan.baidubce.com/v2/\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"endpoints\":{\"chat\":\"/responses\",\"image\":\"/images/generations\",\"imageEdit\":\"/images/edits\",\"video\":\"/videos\",\"videoQuery\":\"/videos/{taskId}\",\"audio\":\"/audio/speech\"},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"云厂商\",\"description\":\"百度千帆 v2 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://cloud.baidu.com/\",\"apiKey\":\"https://console.bce.baidu.com/iam/#/iam/apikey/list\",\"docs\":\"https://cloud.baidu.com/doc/index.html\",\"models\":\"https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Fm2vrveyu\"}},{\"id\":\"preset-hunyuan\",\"name\":\"腾讯混元\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.hunyuan.cloud.tencent.com/v1\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://api.hunyuan.cloud.tencent.com/v1\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"云厂商\",\"description\":\"腾讯混元 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://cloud.tencent.com/product/hunyuan\",\"apiKey\":\"https://console.cloud.tencent.com/hunyuan/api-key\",\"docs\":\"https://cloud.tencent.com/document/product/1729/111007\",\"models\":\"https://cloud.tencent.com/document/product/1729/104753\"}},{\"id\":\"preset-tencent-cloud-ti\",\"name\":\"腾讯云 TI\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.lkeap.cloud.tencent.com\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://api.lkeap.cloud.tencent.com\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"云厂商\",\"icon\":\"tencent-cloud-ti\",\"description\":\"腾讯云 TI OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://cloud.tencent.com/product/ti\",\"apiKey\":\"https://console.cloud.tencent.com/lkeap/api\",\"docs\":\"https://cloud.tencent.com/document/product/1772\",\"models\":\"https://console.cloud.tencent.com/tione/v2/aimarket\"}},{\"id\":\"preset-xirang\",\"name\":\"天翼云息壤\",\"type\":\"openai-response\",\"baseUrl\":\"https://wishub-x1.ctyun.cn\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://wishub-x1.ctyun.cn\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"云厂商\",\"icon\":\"xirang\",\"description\":\"天翼云息壤 OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://www.ctyun.cn\",\"apiKey\":\"https://huiju.ctyun.cn/service/serviceGroup\",\"docs\":\"https://www.ctyun.cn/products/ctxirang\",\"models\":\"https://huiju.ctyun.cn/modelSquare/\"}},{\"id\":\"preset-huggingface\",\"name\":\"Hugging Face\",\"type\":\"openai-response\",\"baseUrl\":\"https://router.huggingface.co/v1\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://router.huggingface.co/v1/\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-responses\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"description\":\"Hugging Face Router Responses-compatible 接入。\",\"websites\":{\"official\":\"https://huggingface.co/\",\"apiKey\":\"https://huggingface.co/settings/tokens\",\"docs\":\"https://huggingface.co/docs\",\"models\":\"https://huggingface.co/models\"}},{\"id\":\"preset-cerebras\",\"name\":\"Cerebras AI\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.cerebras.ai/v1\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.cerebras.ai/v1\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"description\":\"Cerebras OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://www.cerebras.ai\",\"apiKey\":\"https://cloud.cerebras.ai\",\"docs\":\"https://inference-docs.cerebras.ai/introduction\",\"models\":\"https://inference-docs.cerebras.ai/models/overview\"}},{\"id\":\"preset-github\",\"name\":\"GitHub Models\",\"type\":\"openai-response\",\"baseUrl\":\"https://models.github.ai/inference\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://models.github.ai/inference\"}},\"endpoints\":{\"chat\":\"/responses\",\"image\":\"/images/generations\",\"imageEdit\":\"/images/edits\",\"video\":\"/videos\",\"videoQuery\":\"/videos/{taskId}\",\"audio\":\"/audio/speech\"},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"icon\":\"github\",\"description\":\"GitHub Models OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://github.com/marketplace/models\",\"apiKey\":\"https://github.com/settings/tokens\",\"docs\":\"https://docs.github.com/en/github-models\",\"models\":\"https://github.com/marketplace/models\"}},{\"id\":\"preset-infini\",\"name\":\"Infini\",\"type\":\"openai-response\",\"baseUrl\":\"https://cloud.infini-ai.com/maas\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://cloud.infini-ai.com/maas\"}},\"endpoints\":{\"chat\":\"/responses\",\"image\":\"/images/generations\",\"imageEdit\":\"/images/edits\",\"video\":\"/videos\",\"videoQuery\":\"/videos/{taskId}\",\"audio\":\"/audio/speech\"},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"icon\":\"infini\",\"description\":\"Infini MaaS OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://cloud.infini-ai.com/\",\"apiKey\":\"https://cloud.infini-ai.com/iam/secret/key\",\"docs\":\"https://docs.infini-ai.com/gen-studio/api/maas.html#/operations/chatCompletions\",\"models\":\"https://cloud.infini-ai.com/genstudio/model\"}},{\"id\":\"preset-nvidia\",\"name\":\"NVIDIA\",\"type\":\"openai-response\",\"baseUrl\":\"https://integrate.api.nvidia.com\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://integrate.api.nvidia.com\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"icon\":\"nvidia\",\"description\":\"NVIDIA NIM OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://build.nvidia.com/explore/discover\",\"apiKey\":\"https://build.nvidia.com/meta/llama-3_1-405b-instruct\",\"docs\":\"https://docs.api.nvidia.com/nim/reference/llm-apis\",\"models\":\"https://build.nvidia.com/nim\"}},{\"id\":\"preset-hyperbolic\",\"name\":\"Hyperbolic\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.hyperbolic.xyz\",\"endpointConfigs\":{\"openai-responses\":{\"baseUrl\":\"https://api.hyperbolic.xyz\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"icon\":\"hyperbolic\",\"description\":\"Hyperbolic OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://app.hyperbolic.xyz\",\"apiKey\":\"https://app.hyperbolic.xyz/settings\",\"docs\":\"https://docs.hyperbolic.xyz\",\"models\":\"https://app.hyperbolic.xyz/models\"}},{\"id\":\"preset-jina\",\"name\":\"Jina\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.jina.ai\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://api.jina.ai\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国际厂商\",\"icon\":\"jina\",\"description\":\"Jina OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://jina.ai\",\"apiKey\":\"https://jina.ai/\",\"docs\":\"https://jina.ai\",\"models\":\"https://jina.ai\"}},{\"id\":\"preset-longcat\",\"name\":\"LongCat\",\"type\":\"openai-response\",\"baseUrl\":\"https://api.longcat.chat/openai/v1\",\"endpointConfigs\":{\"anthropic-messages\":{\"baseUrl\":\"https://api.longcat.chat/anthropic\"},\"openai-chat-completions\":{\"baseUrl\":\"https://api.longcat.chat/openai\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"国内厂商\",\"icon\":\"longcat\",\"description\":\"LongCat OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://longcat.chat\",\"apiKey\":\"https://longcat.chat/platform/api_keys\",\"docs\":\"https://longcat.chat/platform/docs/zh/\",\"models\":\"https://longcat.chat/platform/docs/zh/APIDocs.html\"}},{\"id\":\"preset-lanyun\",\"name\":\"LANYUN\",\"type\":\"openai-response\",\"baseUrl\":\"https://maas-api.lanyun.net\",\"endpointConfigs\":{\"openai-chat-completions\":{\"baseUrl\":\"https://maas-api.lanyun.net\"}},\"operationDefaults\":{\"chat\":{\"endpointType\":\"openai-chat-completions\"}},\"enabled\":false,\"isCustom\":true,\"isPreset\":true,\"category\":\"云厂商\",\"icon\":\"lanyun\",\"description\":\"蓝耘 MaaS OpenAI-compatible 接入。\",\"websites\":{\"official\":\"https://maas.lanyun.net\",\"apiKey\":\"https://maas.lanyun.net/user/api-key\",\"docs\":\"https://maas.lanyun.net/docs\",\"models\":\"https://maas.lanyun.net/model\"}}]"),
  qUi = "anthropic.png",
  KUi = "aihubmix.png",
  QUi = "baichuan.png",
  YUi = "burncloud.png",
  XUi = "cerebras.webp",
  JUi = "cherryin.png",
  ZUi = "comfyui.png",
  e$i = "dashscope.png",
  t$i = "deepseek.png",
  n$i = "dmxapi.png",
  r$i = "doubao.png",
  a$i = "fireworks.png",
  i$i = "gemini.png",
  o$i = "github.png",
  s$i = "groq.png",
  l$i = "grok.png",
  c$i = "grsai.png",
  d$i = "hyperbolic.png",
  u$i = "huggingface.webp",
  h$i = "hunyuan.png",
  p$i = "infini.png",
  m$i = "jimeng.svg",
  f$i = "xyq.svg",
  g$i = "jina.png",
  y$i = "lanyun.png",
  b$i = "lmstudio.png",
  v$i = "longcat.png",
  w$i = "minimax.png",
  x$i = "mistral.png",
  _$i = "modelscope.png",
  k$i = "moonshot.webp",
  A$i = "nvidia.png",
  S$i = "ocoolai.png",
  I$i = "ollama.png",
  C$i = "openai.png",
  E$i = "openrouter.png",
  T$i = "perplexity.png",
  M$i = "ph8.png",
  P$i = "ppio.png",
  R$i = "qiniu.webp",
  N$i = "silicon.png",
  j$i = "sophnet.svg",
  D$i = "soullens.svg",
  L$i = "stepfun.png",
  O$i = "tokenflux.png",
  B$i = "together.png",
  F$i = "voyageai.png",
  z$i = "xai.png",
  U$i = "xirang.png",
  $$i = "yi.png",
  G$i = "zai.svg",
  V$i = "zhipu.png",
  H$i = {
    "302ai": "302ai.webp",
    anthropic: qUi,
    aihubmix: KUi,
    "azure-openai": "azure-openai.png",
    baichuan: QUi,
    "baidu-cloud": "baidu-cloud.svg",
    burncloud: YUi,
    cerebras: XUi,
    cherryin: JUi,
    comfyui: ZUi,
    dashscope: e$i,
    deepseek: t$i,
    dmxapi: n$i,
    doubao: r$i,
    fireworks: a$i,
    gemini: i$i,
    github: o$i,
    groq: s$i,
    grok: l$i,
    grsai: c$i,
    hyperbolic: d$i,
    huggingface: u$i,
    hunyuan: h$i,
    infini: p$i,
    jimeng: m$i,
    xyq: f$i,
    jina: g$i,
    lanyun: y$i,
    lmstudio: b$i,
    longcat: v$i,
    minimax: w$i,
    mistral: x$i,
    modelscope: _$i,
    moonshot: k$i,
    "new-api": "new-api.png",
    nvidia: A$i,
    ocoolai: S$i,
    ollama: I$i,
    openai: C$i,
    "openai-response": "openai-response.png",
    openrouter: E$i,
    perplexity: T$i,
    ph8: M$i,
    ppio: P$i,
    qiniu: R$i,
    silicon: N$i,
    sophnet: j$i,
    soullens: D$i,
    stepfun: L$i,
    "tencent-cloud-ti": "tencent-cloud-ti.png",
    tokenflux: O$i,
    together: B$i,
    "volcengine-ark": "volcengine-ark.png",
    voyageai: F$i,
    xai: z$i,
    xirang: U$i,
    yi: $$i,
    zai: G$i,
    zhipu: V$i
  },
  W$i = "anthropic-transparent.png",
  q$i = "aihubmix-transparent.png",
  K$i = "baichuan-transparent.png",
  Q$i = "burncloud-transparent.png",
  Y$i = "cerebras-transparent.png",
  X$i = "comfyui-transparent.png",
  J$i = "dashscope-transparent.png",
  Z$i = "deepseek-transparent.png",
  eGi = "doubao-transparent.png",
  tGi = "fireworks-transparent.png",
  nGi = "gemini-transparent.png",
  rGi = "github-transparent.png",
  aGi = "groq-transparent.png",
  iGi = "grok-transparent.png",
  oGi = "hyperbolic-transparent.png",
  sGi = "huggingface-transparent.png",
  lGi = "hunyuan-transparent.png",
  cGi = "infini-transparent.png",
  dGi = "jimeng-transparent.png",
  uGi = "jina-transparent.png",
  hGi = "lmstudio-transparent.png",
  pGi = "longcat-transparent.png",
  mGi = "minimax-transparent.png",
  fGi = "mistral-transparent.png",
  gGi = "modelscope-transparent.png",
  yGi = "moonshot-transparent.png",
  bGi = "nvidia-transparent.png",
  vGi = "ollama-transparent.png",
  wGi = "openai-transparent.png",
  xGi = "openrouter-transparent.png",
  _Gi = "perplexity-transparent.png",
  kGi = "ppio-transparent.png",
  AGi = "qiniu-transparent.png",
  SGi = "silicon-transparent.png",
  IGi = "sophnet-transparent.png",
  CGi = "stepfun-transparent.png",
  EGi = "together-transparent.png",
  TGi = "voyageai-transparent.png",
  MGi = "xai-transparent.png",
  PGi = "xirang-transparent.png",
  RGi = "yi-transparent.png",
  NGi = "zai-transparent.png",
  jGi = "zhipu-transparent.png",
  DGi = "cherryin-transparent.png",
  LGi = "ocoolai-transparent.png",
  OGi = "xyq-transparent.png",
  BGi = "tokenflux-transparent.png",
  FGi = "grsai.png",
  zGi = "lanyun.png",
  UGi = "ph8.png",
  $Gi = "dmxapi-transparent.png",
  GGi = {
    "302ai": "302ai-transparent.png",
    anthropic: W$i,
    aihubmix: q$i,
    "azure-openai": "azure-openai-transparent.png",
    baichuan: K$i,
    "baidu-cloud": "baidu-cloud-transparent.png",
    burncloud: Q$i,
    cerebras: Y$i,
    comfyui: X$i,
    dashscope: J$i,
    deepseek: Z$i,
    doubao: eGi,
    fireworks: tGi,
    gemini: nGi,
    github: rGi,
    groq: aGi,
    grok: iGi,
    hyperbolic: oGi,
    huggingface: sGi,
    hunyuan: lGi,
    infini: cGi,
    jimeng: dGi,
    jina: uGi,
    lmstudio: hGi,
    longcat: pGi,
    minimax: mGi,
    mistral: fGi,
    modelscope: gGi,
    moonshot: yGi,
    "new-api": "new-api-transparent.png",
    nvidia: bGi,
    ollama: vGi,
    openai: wGi,
    "openai-response": "openai-response-transparent.png",
    openrouter: xGi,
    perplexity: _Gi,
    ppio: kGi,
    qiniu: AGi,
    silicon: SGi,
    sophnet: IGi,
    stepfun: CGi,
    "tencent-cloud-ti": "tencent-cloud-ti-transparent.png",
    together: EGi,
    "volcengine-ark": "volcengine-ark-transparent.png",
    voyageai: TGi,
    xai: MGi,
    xirang: PGi,
    yi: RGi,
    zai: NGi,
    zhipu: jGi,
    cherryin: DGi,
    ocoolai: LGi,
    xyq: OGi,
    tokenflux: BGi,
    grsai: FGi,
    lanyun: zGi,
    ph8: UGi,
    dmxapi: $Gi
  },
  g$e = WUi.filter(e => e.id !== "preset-soullens"),
  VGi = Object.assign({
    "./logos/302ai-transparent.png": DFi,
    "./logos/302ai.webp": LFi,
    "./logos/aihubmix-transparent.png": OFi,
    "./logos/aihubmix.png": BFi,
    "./logos/anthropic-transparent.png": FFi,
    "./logos/anthropic.png": zFi,
    "./logos/azure-openai-transparent.png": UFi,
    "./logos/azure-openai.png": $Fi,
    "./logos/baichuan-transparent.png": GFi,
    "./logos/baichuan.png": VFi,
    "./logos/baidu-cloud-transparent.png": HFi,
    "./logos/baidu-cloud.svg": WFi,
    "./logos/burncloud-transparent.png": qFi,
    "./logos/burncloud.png": KFi,
    "./logos/cerebras-transparent.png": QFi,
    "./logos/cerebras.webp": YFi,
    "./logos/cherryin-transparent.png": XFi,
    "./logos/cherryin-transparent.svg": JFi,
    "./logos/cherryin.png": ZFi,
    "./logos/comfyui-transparent.png": ezi,
    "./logos/comfyui.png": tzi,
    "./logos/dashscope-transparent.png": nzi,
    "./logos/dashscope.png": rzi,
    "./logos/deepseek-transparent.png": azi,
    "./logos/deepseek.png": izi,
    "./logos/dmxapi-transparent.png": ozi,
    "./logos/dmxapi.png": szi,
    "./logos/doubao-transparent.png": lzi,
    "./logos/doubao.png": czi,
    "./logos/fireworks-transparent.png": dzi,
    "./logos/fireworks.png": uzi,
    "./logos/gemini-transparent.png": hzi,
    "./logos/gemini.png": pzi,
    "./logos/github-transparent.png": mzi,
    "./logos/github.png": fzi,
    "./logos/grok-transparent.png": gzi,
    "./logos/grok.png": yzi,
    "./logos/groq-transparent.png": bzi,
    "./logos/groq.png": vzi,
    "./logos/grsai.png": wzi,
    "./logos/huggingface-transparent.png": xzi,
    "./logos/huggingface.webp": _zi,
    "./logos/hunyuan-transparent.png": kzi,
    "./logos/hunyuan.png": Azi,
    "./logos/hyperbolic-transparent.png": Szi,
    "./logos/hyperbolic.png": Izi,
    "./logos/infini-transparent.png": Czi,
    "./logos/infini.png": Ezi,
    "./logos/jimeng-transparent.png": Tzi,
    "./logos/jimeng.svg": Mzi,
    "./logos/jina-transparent.png": Pzi,
    "./logos/jina.png": Rzi,
    "./logos/lanyun.png": Nzi,
    "./logos/lmstudio-transparent.png": jzi,
    "./logos/lmstudio.png": Dzi,
    "./logos/longcat-transparent.png": Lzi,
    "./logos/longcat.png": Ozi,
    "./logos/minimax-transparent.png": Bzi,
    "./logos/minimax.png": Fzi,
    "./logos/mistral-transparent.png": zzi,
    "./logos/mistral.png": Uzi,
    "./logos/modelscope-transparent.png": $zi,
    "./logos/modelscope.png": Gzi,
    "./logos/moonshot-transparent.png": Vzi,
    "./logos/moonshot.webp": Hzi,
    "./logos/new-api-transparent.png": Wzi,
    "./logos/new-api.png": qzi,
    "./logos/nvidia-transparent.png": Kzi,
    "./logos/nvidia.png": Qzi,
    "./logos/ocoolai-transparent.png": Yzi,
    "./logos/ocoolai-transparent.svg": Xzi,
    "./logos/ocoolai.png": Jzi,
    "./logos/ollama-transparent.png": Zzi,
    "./logos/ollama.png": eUi,
    "./logos/openai-response-transparent.png": tUi,
    "./logos/openai-response.png": nUi,
    "./logos/openai-transparent.png": rUi,
    "./logos/openai.png": aUi,
    "./logos/openrouter-transparent.png": iUi,
    "./logos/openrouter.png": oUi,
    "./logos/perplexity-transparent.png": sUi,
    "./logos/perplexity.png": lUi,
    "./logos/ph8.png": cUi,
    "./logos/ppio-transparent.png": dUi,
    "./logos/ppio.png": uUi,
    "./logos/qiniu-transparent.png": hUi,
    "./logos/qiniu.webp": pUi,
    "./logos/silicon-transparent.png": mUi,
    "./logos/silicon.png": fUi,
    "./logos/soonstudio.png": gUi,
    "./logos/sophnet-transparent.png": yUi,
    "./logos/sophnet.svg": bUi,
    "./logos/soullens.svg": vUi,
    "./logos/stepfun-transparent.png": wUi,
    "./logos/stepfun.png": xUi,
    "./logos/tencent-cloud-ti-transparent.png": _Ui,
    "./logos/tencent-cloud-ti.png": kUi,
    "./logos/together-transparent.png": AUi,
    "./logos/together.png": SUi,
    "./logos/tokenflux-transparent.png": IUi,
    "./logos/tokenflux-transparent.svg": CUi,
    "./logos/tokenflux.png": EUi,
    "./logos/volcengine-ark-transparent.png": TUi,
    "./logos/volcengine-ark.png": MUi,
    "./logos/voyageai-transparent.png": PUi,
    "./logos/voyageai.png": RUi,
    "./logos/xai-transparent.png": NUi,
    "./logos/xai.png": jUi,
    "./logos/xirang-transparent.png": DUi,
    "./logos/xirang.png": LUi,
    "./logos/xyq-transparent.png": OUi,
    "./logos/xyq-transparent.svg": BUi,
    "./logos/xyq.svg": FUi,
    "./logos/yi-transparent.png": zUi,
    "./logos/yi.png": UUi,
    "./logos/zai-transparent.png": $Ui,
    "./logos/zai.svg": GUi,
    "./logos/zhipu-transparent.png": VUi,
    "./logos/zhipu.png": HUi
  }),
  cmr = Object.fromEntries(Object.entries({
    ...H$i,
    ...GGi
  }).filter(([e]) => e !== "soullens").map(([e, t]) => [e, VGi[`./logos/${t}`]]));

function HGi(e) {
  if (e) {
    if (e.type === "account" && !["preset-jimeng", "preset-xyq"].includes(e.id)) return "这是账号登录服务，不能使用 API Key 接入；请使用画布已有的账号接入入口。";
    if (e.id === "preset-comfyui") return "这是 Comfy 平台专用接口，需要工作流与专用适配，不能当作通用模型接口。";
  }
}

function vhn(e) {
  var o, s, l;
  const t = (s = (o = e.operationDefaults) == null ? void 0 : o.chat) == null ? void 0 : s.endpointType,
    n = e.type === "account" ? "account" : ["gemini", "anthropic", "azure-openai", "new-api", "lmstudio", "ollama"].includes(e.type) ? e.type : t === "openai-chat-completions" ? "openai" : t === "openai-responses" || e.type === "openai-response" ? "responses" : "openai",
    r = (l = e.endpointConfigs) == null ? void 0 : l[n === "responses" ? "openai-responses" : "openai-chat-completions"],
    a = (n === "account" ? "" : (r == null ? void 0 : r.baseUrl) || e.baseUrl).replace(/\/+$/, ""),
    i = n === "gemini" ? "/v1beta/models" : n === "azure-openai" ? "/openai/v1/models" : /\/(v\d+|v\d+\/openai|inference|maas)$/.test(a) ? "/models" : "/v1/models";
  return {
    ...gne(),
    presetId: e.id,
    website: e.websites.official,
    icon: e.icon || e.id.replace("preset-", "").replace("minimax-global", "minimax"),
    name: e.name,
    kind: n,
    url: a,
    modelsPath: i,
    localNoAuth: ["ollama", "lmstudio"].includes(n) && jP(a)
  };
}

function qz({
  icon: e
}) {
  const t = e && cmr[e],
    n = e && /^data:image\/(png|jpeg|webp);base64,/.test(e) ? e : void 0;
  return c.jsx("span", {
    className: "api-access-avatar",
    "aria-hidden": "true",
    children: t ? c.jsx("span", {
      className: "model-brand-logo",
      style: {
        width: "100%",
        height: "100%",
        "--model-brand-logo": `url(${JSON.stringify(t)})`
      }
    }) : n ? c.jsx("img", {
      src: n,
      alt: ""
    }) : c.jsx(_Tn, {
      size: 18,
      strokeWidth: 1.5
    })
  });
}

const WGi = {
  unconfigured: "待关联目录",
  stopped: "未启动",
  starting: "启动中",
  ready: "已就绪",
  busy: "生成中"
};

function qGi({
  provider: e,
  configs: t,
  onRemove: n
}) {
  var P;
  const [r, a] = g.useState(null),
    [i, o] = g.useState(""),
    [s, l] = g.useState("auto"),
    [d, u] = g.useState(""),
    [h, p] = g.useState(""),
    [m, f] = g.useState(""),
    [y, b] = g.useState(""),
    v = g.useRef(!0),
    _ = async (R = !1) => {
      const j = await $p("local_models_status", {
        providerId: e.id
      });
      v.current && (a(j), R && (o(j.root.replace(/^\\\\\?\\/, "")), l(j.backend === "vulkan" ? "auto" : j.backend ?? "auto"), u(j.python ?? "")));
    };
  g.useEffect(() => {
    v.current = !0, _(!0).catch(j => {
      v.current && f(String(j.message));
    });
    const R = setInterval(() => {
      _().catch(() => {});
    }, 6e3);
    return () => {
      v.current = !1, clearInterval(R);
    };
  }, [e.id]);
  const w = async (R, j) => {
      p(R), f(""), b("");
      try {
        await j(), await _();
      } catch (B) {
        v.current && f(B instanceof Error ? B.message : String(B));
      } finally {
        v.current && p("");
      }
    },
    k = ((r == null ? void 0 : r.pendingTasks) || 0) > 0,
    A = !!(r != null && r.root) && !r.missingFiles.length,
    S = !!h || k || !!(r != null && r.port),
    C = !!r && r.backend === void 0,
    I = !!r && (i.trim() !== r.root.replace(/^\\\\\?\\/, "") || s !== (r.backend ?? "auto") || d.trim() !== (r.python ?? "")),
    E = t.find(R => R.localComfy && R.localComfy.model !== "h3"),
    M = t.find(R => {
      var j;
      return ((j = R.localComfy) == null ? void 0 : j.model) === "h3";
    }),
    T = () => {
      jJ(e.id, [E ? {
        ...E,
        customProtocol: xve(e).customProtocol,
        localComfy: xve(e).localComfy
      } : xve(e), M || fUn(e)]);
    };
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      className: "api-access-heading",
      children: [c.jsx(qz, {
        icon: "comfyui"
      }), c.jsxs("div", {
        children: [c.jsx("h3", {
          children: e.name
        }), c.jsxs("p", {
          children: ["本机运行 · ", r ? WGi[r.state] : "正在检测"]
        })]
      }), c.jsx("button", {
        type: "button",
        role: "switch",
        "aria-label": "启用本地服务商",
        "aria-checked": e.enabled,
        className: `api-access-switch${e.enabled ? " is-on" : ""}`,
        onClick: () => a7({
          ...e,
          enabled: !e.enabled
        }),
        children: c.jsx("span", {})
      })]
    }), c.jsxs("section", {
      className: "api-access-card",
      children: [c.jsx("h4", {
        children: "关联已有模型包"
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "选择解压后的 0.9 版整合包根目录，包含 ComfyUI 和模型权重。NVIDIA 使用 CUDA 环境；AMD 使用官方 ROCm 环境，权重继续保留在原磁盘。"
      }), c.jsxs("label", {
        children: ["模型目录", c.jsx("input", {
          "aria-label": "本地模型目录",
          value: i,
          onChange: R => o(R.target.value),
          placeholder: "例如 J:\\百度云下载\\本地AI",
          disabled: S
        })]
      }), c.jsxs("div", {
        className: "api-access-field",
        children: [c.jsx("span", {
          children: "GPU 运行环境"
        }), c.jsx("div", {
          className: "api-access-actions",
          role: "group",
          "aria-label": "本地绘画视频运行环境",
          children: [{
            value: "auto",
            label: "自动检测"
          }, {
            value: "cuda",
            label: "NVIDIA · CUDA"
          }, {
            value: "rocm",
            label: "AMD · ROCm"
          }].map(R => c.jsx("button", {
            type: "button",
            "aria-pressed": s === R.value,
            className: s === R.value ? "api-access-primary" : "",
            disabled: S || C,
            onClick: () => l(R.value),
            children: R.label
          }, R.value))
        })]
      }), c.jsxs("label", {
        children: ["Python 运行程序（可选）", c.jsx("input", {
          "aria-label": "本地绘画视频 Python 程序",
          value: d,
          onChange: R => u(R.target.value),
          placeholder: "留空自动查找，或指定 ROCm 环境中的 python.exe",
          disabled: S || C
        })]
      }), s === "rocm" && c.jsxs("p", {
        className: "api-access-caption",
        children: ["需先安装官方支持该显卡的 AMD 驱动和 ROCm PyTorch，再选择对应环境的 python.exe。原 CUDA 运行库不能直接用于 A 卡。使用 FP16 兼容计算，H3 文本编码放在 CPU，内存占用可能高于 CUDA。", c.jsx("a", {
          href: "https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/advanced/advancedrad/windows/comfyui/installcomfyui.html",
          target: "_blank",
          rel: "noreferrer",
          children: "查看 AMD 官方安装说明"
        })]
      }), c.jsxs("div", {
        className: "api-access-actions",
        children: [c.jsxs("button", {
          type: "button",
          disabled: S,
          onClick: () => void w("选择目录", async () => {
            const R = await WE({
              directory: !0,
              multiple: !1,
              title: "选择本地模型包根目录"
            });
            typeof R == "string" && o(R);
          }),
          children: [c.jsx(Sc, {
            size: 14
          }), "选择目录"]
        }), c.jsx("button", {
          type: "button",
          disabled: S || C,
          onClick: () => void w("选择运行环境", async () => {
            const R = await WE({
              multiple: !1,
              filters: [{
                name: "Python",
                extensions: ["exe"]
              }],
              title: "选择 CUDA / ROCm 环境的 python.exe"
            });
            typeof R == "string" && u(R);
          }),
          children: "选择 Python"
        }), c.jsx("button", {
          type: "button",
          className: "api-access-primary",
          disabled: !i.trim() || S || C,
          onClick: () => void w("检测并关联", async () => {
            await $p("local_models_configure", {
              providerId: e.id,
              root: i.trim(),
              backend: s,
              python: d.trim() || null
            }), await _(!0), T(), b("运行环境已检测并关联，Flux 和 H3 已加入画布模型列表，未运行生成。");
          }),
          children: "检测并关联"
        })]
      }), !!(r != null && r.root) && c.jsx("p", {
        className: "api-access-caption",
        children: r.hardware.error || `${r.hardware.gpuName} · ${r.hardware.backend === "rocm" ? "ROCm" : "CUDA"} · 显存 ${(r.hardware.vramMib / 1024).toFixed(1)} GB（检测时可用 ${(r.hardware.freeVramMib / 1024).toFixed(1)} GB）· 内存 ${r.hardware.ramGib} GB`
      }), C && c.jsx("p", {
        role: "alert",
        className: "api-access-notice",
        children: "请重新编译并重启桌面程序，以启用 AMD 运行环境设置。"
      }), !!(r != null && r.root) && !!r.missingFiles.length && c.jsxs("p", {
        className: "api-access-error",
        children: ["缺少：", r.missingFiles.join("、")]
      })]
    }), c.jsxs("section", {
      className: "api-access-card",
      children: [c.jsxs("div", {
        className: "api-access-card-heading",
        children: [c.jsx("h4", {
          children: "运行服务"
        }), c.jsxs("button", {
          type: "button",
          disabled: !!h,
          onClick: () => void w("检测", () => _()),
          children: [c.jsx(bd, {
            size: 14
          }), "刷新状态"]
        })]
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "默认在每次图片／视频任务结束后退出推理服务，释放内存和显存。任务依次执行，下次生成自动启动并重新加载权重；模型文件、生成结果及独立对话服务保留。"
      }), (r == null ? void 0 : r.lowVram) && c.jsx("p", {
        className: "api-access-notice",
        children: "已启用低显存兼容模式：保留桌面显存、动态卸载模型并释放执行缓存；再次生成时可能需要重新加载权重。"
      }), c.jsxs("div", {
        className: "api-access-actions",
        children: [c.jsxs("button", {
          type: "button",
          disabled: !A || S || I || C || !!(r != null && r.hardware.error) || !e.enabled,
          onClick: () => void w("启动中", () => $p("local_models_start", {
            providerId: e.id
          })),
          children: [c.jsx(Ol, {
            size: 14
          }), "启动服务"]
        }), c.jsxs("button", {
          type: "button",
          disabled: h === "停止中" || !(r != null && r.port) && !k,
          onClick: () => void w("停止中", () => $p("local_models_stop")),
          children: [c.jsx(kf, {
            size: 14
          }), k ? "取消本地任务并停止" : "停止并释放显存"]
        }), c.jsx("span", {
          role: "status",
          children: h || (k ? `${r == null ? void 0 : r.pendingTasks} 个本地任务` : r != null && r.port ? `127.0.0.1:${r.port}` : "")
        }), c.jsxs("button", {
          type: "button",
          disabled: !A,
          onClick: () => void w("打开目录", () => $p("open_folder_in_explorer", {
            path: `${r.root}/ComfyUI/output`
          })),
          children: [c.jsx(Sc, {
            size: 14
          }), "打开输出目录"]
        })]
      }), c.jsxs("details", {
        children: [c.jsx("summary", {
          children: "运行日志"
        }), c.jsx("pre", {
          className: "api-local-model-log",
          children: (r == null ? void 0 : r.logs.join(`
`)) || "启动后显示日志"
        })]
      })]
    }), c.jsxs("section", {
      className: "api-access-card",
      children: [c.jsx("h4", {
        children: "Flux 2 Klein · 本地绘画"
      }), c.jsx("p", {
        children: "文生图 · 单图编辑 · 双图参考 · 扩图 · 蒙版编辑"
      }), c.jsxs("p", {
        className: "api-access-caption",
        children: ["画布中选择“自定义 → ", e.name, " → Flux 2 Klein（本地）”。支持 1K / 2K，默认 1K；最多两张参考图。输出遵循所选比例，Auto 跟随原图；蒙版白色区域修改、黑色区域保留。参考图直接交给本机服务。"]
      }), A && !E && c.jsx("button", {
        type: "button",
        onClick: T,
        children: "添加模型到画布"
      }), E && c.jsx("p", {
        className: "api-access-notice",
        children: E.enabled === !1 ? "模型已停用" : "已加入画布模型列表"
      })]
    }), c.jsxs("section", {
      className: "api-access-card",
      children: [c.jsx("h4", {
        children: "MiniMax H3 · 本地视频"
      }), c.jsx("p", {
        children: "文生视频 · 首帧 / 首尾帧 · 最多三张参考图 · 原生音频"
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "480P / 720P / 1080P，支持画布比例和 4–25 秒。在视频节点切换“首尾帧 / 参考”；秒数按 24fps 转为 17k+5 帧，实际时长最多增加约 0.67 秒。"
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "8GB 显存可尝试低显存兼容模式，不再按 12GB 阻止启动。当前 FP8 模型包至少需要 24GB 内存，低显存时建议 48GB 以上；12GB 及以上显卡使用标准模式。"
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "低显存模式将文本编码放到 CPU，使用 H3 MLP 分块和视频 VAE 分块解码。建议先选 480P、4–5 秒并减少参考图；保留你选择的比例、分辨率和秒数，不自动降低画质。速度会更慢，实际能否完成仍取决于硬件和任务大小。"
      }), !!((P = r == null ? void 0 : r.h3MissingFiles) != null && P.length) && c.jsxs("p", {
        className: "api-access-error",
        children: ["H3 缺少：", r.h3MissingFiles.join("、")]
      }), A && !M && c.jsx("button", {
        type: "button",
        onClick: T,
        children: "添加 H3 到画布"
      }), M && c.jsxs("label", {
        className: "api-local-auth",
        children: [c.jsx("input", {
          type: "checkbox",
          checked: M.enabled !== !1,
          disabled: !e.enabled,
          onChange: R => jJ(e.id, [{
            ...M,
            enabled: R.target.checked
          }])
        }), c.jsx("span", {
          children: "在画布中启用 H3"
        })]
      })]
    }), c.jsxs("section", {
      className: "api-access-card",
      children: [c.jsx("h4", {
        children: "后续添加模型"
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "此接入使用已适配的 Flux / H3 工作流和配套权重。新增 GGUF 对话模型可在本地对话设置中重新检测并选择；新增图片 / 视频模型家族需要匹配工作流、编码器和 VAE，仅复制文件不会自动接入画布。"
      })]
    }), m && c.jsx("p", {
      role: "alert",
      className: "api-access-error",
      children: m
    }), y && c.jsx("p", {
      role: "status",
      className: "api-access-notice",
      children: y
    }), c.jsxs("div", {
      className: "api-access-actions",
      children: [c.jsxs("button", {
        className: "api-local-remove",
        type: "button",
        disabled: !!h || k,
        onClick: () => void w("移除中", async () => {
          r != null && r.port && (await $p("local_models_stop")), n();
        }),
        children: [c.jsx(Qo, {
          size: 14
        }), "移除本地接入"]
      }), c.jsx("span", {
        children: "模型包和生成文件保留在原目录"
      })]
    })]
  });
}

const whn = {
    unconfigured: "待关联目录",
    stopped: "未启动",
    starting: "加载中",
    ready: "已就绪"
  },
  Kfe = e => e.replace(/^\\\\\?\\/, "");

function KGi({
  provider: e,
  isDark: t,
  onRemove: n
}) {
  const [r, a] = g.useState(null),
    [i, o] = g.useState(""),
    [s, l] = g.useState(""),
    [d, u] = g.useState(null),
    [h, p] = g.useState("cpu"),
    [m, f] = g.useState(""),
    [y, b] = g.useState(""),
    [v, _] = g.useState(""),
    [w, k] = g.useState(""),
    [A, S] = g.useState(null),
    C = g.useRef(!0),
    I = async (j = !1) => {
      const B = await $p("local_llm_status", {
        providerId: e.id
      });
      C.current && (a(B), j && (o(Kfe(B.root)), l(B.model), u(B.mmproj ?? null), p(B.device ?? "cpu"), f(B.executable ?? "")));
    };
  g.useEffect(() => {
    C.current = !0, I(!0).catch(B => {
      C.current && _(B.message);
    });
    const j = setInterval(() => {
      I().catch(() => {});
    }, 6e3);
    return () => {
      C.current = !1, clearInterval(j);
    };
  }, [e.id]);
  const E = async (j, B) => {
      b(j), _(""), k("");
      try {
        await B(), await I();
      } catch (F) {
        C.current && _(F instanceof Error ? F.message : String(F));
      } finally {
        C.current && b("");
      }
    },
    M = !!y || !!(r != null && r.port),
    T = !!r && (!r.device || r.executable === void 0),
    P = !!r && (i.trim() !== Kfe(r.root) || s !== r.model || d !== r.mmproj || h !== r.device || m.trim() !== (r.executable ?? "")),
    R = j => {
      o(j), l(""), u(null);
    };
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      className: "api-access-heading",
      children: [c.jsx(qz, {
        icon: "lmstudio"
      }), c.jsxs("div", {
        children: [c.jsx("h3", {
          children: e.name
        }), c.jsxs("p", {
          children: ["本机对话 · ", r ? whn[r.state] : "正在读取配置"]
        })]
      }), c.jsx("button", {
        type: "button",
        role: "switch",
        "aria-label": "启用本地对话服务商",
        "aria-checked": e.enabled,
        className: `api-access-switch${e.enabled ? " is-on" : ""}`,
        onClick: () => a7({
          ...e,
          enabled: !e.enabled
        }),
        children: c.jsx("span", {})
      })]
    }), c.jsxs("section", {
      className: "api-access-card",
      children: [c.jsx("h4", {
        children: "关联 Qwen / llama.cpp 模型包"
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "选择 GGUF 模型包目录。运行程序可在包内自动查找，也可单独选择官方 llama.cpp 运行包，复用现有模型和识图文件。检测目录不启动模型。"
      }), c.jsxs("label", {
        children: ["模型包目录", c.jsx("input", {
          "aria-label": "本地对话模型目录",
          value: i,
          onChange: j => R(j.target.value),
          placeholder: "例如 J:\\百度云下载\\Qwen3.8 27B",
          disabled: M
        })]
      }), !!(r != null && r.models.length) && i === Kfe(r.root) && c.jsxs("label", {
        children: ["主模型", c.jsx(qs, {
          scopeId: e.id,
          dropdownType: "llm-model",
          ariaLabel: "本地对话 GGUF 模型",
          translateLabels: !1,
          isDark: t,
          activeDropdown: A,
          setActiveDropdown: S,
          value: s,
          disabled: M,
          menuPlacement: "below",
          menuClassName: "api-access-model-menu",
          className: "api-access-select",
          options: r.models.map(j => ({
            value: j.path,
            label: `${j.name} · ${j.sizeGib} GB`
          })),
          onSelect: j => {
            l(j), u(null);
          }
        })]
      }), i === Kfe((r == null ? void 0 : r.root) ?? "") && c.jsxs("label", {
        children: ["识图模型（mmproj）", c.jsx(qs, {
          scopeId: e.id,
          dropdownType: "llm-mmproj",
          ariaLabel: "本地对话识图模型",
          translateLabels: !1,
          isDark: t,
          activeDropdown: A,
          setActiveDropdown: S,
          value: d ?? "auto",
          disabled: M || T,
          menuPlacement: "below",
          menuClassName: "api-access-model-menu",
          className: "api-access-select",
          options: [{
            value: "auto",
            label: "自动匹配模型包内的识图文件"
          }, {
            value: "",
            label: "不加载（仅文字对话）"
          }, ...((r == null ? void 0 : r.projectors) ?? []).map(j => ({
            value: j.path,
            label: `${j.name} · ${j.sizeGib} GB`
          }))],
          onSelect: j => u(j === "auto" ? null : j)
        })]
      }), c.jsxs("label", {
        children: ["运行方式", c.jsx(qs, {
          scopeId: e.id,
          dropdownType: "llm-device",
          ariaLabel: "本地对话运行方式",
          translateLabels: !1,
          isDark: t,
          activeDropdown: A,
          setActiveDropdown: S,
          value: h,
          disabled: M || T,
          menuPlacement: "below",
          menuClassName: "api-access-model-menu",
          className: "api-access-select",
          options: [{
            value: "cpu",
            label: "CPU 并行（节省显存，27B 较慢）"
          }, {
            value: "gpu",
            label: "GPU 混合加速（运行包默认后端）"
          }, {
            value: "vulkan",
            label: "AMD · Vulkan 混合加速"
          }],
          onSelect: j => p(j)
        })]
      }), c.jsxs("label", {
        children: ["llama.cpp 运行程序（可选）", c.jsx("input", {
          "aria-label": "本地对话运行程序",
          value: m,
          onChange: j => f(j.target.value),
          placeholder: "留空从模型包查找，或选择独立的 llama-server.exe",
          disabled: M || T
        })]
      }), h === "vulkan" && c.jsxs("p", {
        className: "api-access-caption",
        children: ["完整解压官方 Windows Vulkan 运行包，再选择其中的 llama-server.exe；保留同目录的 ggml-vulkan.dll 和其他依赖。启动前检测 GPU，不会静默退回 CPU。", c.jsx("a", {
          href: "https://github.com/ggml-org/llama.cpp/releases",
          target: "_blank",
          rel: "noreferrer",
          children: "获取官方运行包"
        })]
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "GPU 模式按空闲显存分配主模型，预留 2GB，识图编码放在 CPU，降低发送图片时的显存峰值。8GB 显卡运行 27B 仍需 CPU 参与；绘画 / 视频同时生成会争用显存。CPU 模式最多使用 8 个线程，为画布保留计算资源，但 27B 首次回复仍可能很慢。"
      }), c.jsxs("div", {
        className: "api-access-actions",
        children: [c.jsxs("button", {
          type: "button",
          disabled: M,
          onClick: () => void E("选择目录", async () => {
            const j = await WE({
              directory: !0,
              multiple: !1,
              title: "选择本地对话模型包"
            });
            typeof j == "string" && R(j);
          }),
          children: [c.jsx(Sc, {
            size: 14
          }), "选择目录"]
        }), c.jsx("button", {
          type: "button",
          disabled: M || T,
          onClick: () => void E("选择程序", async () => {
            const j = await WE({
              multiple: !1,
              filters: [{
                name: "llama.cpp",
                extensions: ["exe"]
              }],
              title: "选择 llama-server.exe"
            });
            typeof j == "string" && f(j);
          }),
          children: "选择运行程序"
        }), c.jsx("button", {
          type: "button",
          className: "api-access-primary",
          disabled: !i.trim() || M || T,
          onClick: () => void E("检测并关联", async () => {
            await $p("local_llm_configure", {
              providerId: e.id,
              root: i.trim(),
              model: s || null,
              mmproj: d,
              device: h,
              executable: m.trim() || null
            }), jJ(e.id, [Aia(e)]), await I(!0), k("Qwen 已加入对话模型列表；点击启动服务后即可聊天。");
          }),
          children: "检测并关联 / 保存模型"
        })]
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "使用 4096 上下文、最多 1024 输出 tokens，默认关闭思考。IQ2_M 占用较小，识图准确性可能受低位量化影响；选择主模型时请配套同一模型的 mmproj。8GB 机器如优先速度，可使用 4B / 8B 级视觉模型的 Q4 版本。修改设置后保存，再启动对话服务。"
      }), !!(r != null && r.resolvedExecutable) && c.jsxs("p", {
        className: "api-access-caption",
        children: ["当前运行程序：", Kfe(r.resolvedExecutable)]
      }), T && c.jsx("p", {
        role: "alert",
        className: "api-access-notice",
        children: "请重新编译并重启桌面程序，以启用 AMD 和运行程序设置。"
      })]
    }), c.jsxs("section", {
      className: "api-access-card",
      children: [c.jsx("h4", {
        children: "运行服务"
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "API 地址：http://127.0.0.1:8080/v1 · 模型 ID：qwen-local · 免 API Key。先启动并等待“已就绪”，再在画布对话中选择“Qwen 27B（本地）”。"
      }), c.jsx("p", {
        className: "api-access-caption",
        children: "对话服务可与本地绘画 / 视频服务同时运行。停止对话只中断当前对话；退出桌面程序时自动关闭本程序启动的服务。"
      }), c.jsxs("div", {
        className: "api-access-actions",
        children: [c.jsxs("button", {
          type: "button",
          disabled: !(r != null && r.model) || !!r.error || !!y || !!(r != null && r.port) || !e.enabled || P || T,
          onClick: () => void E("启动中", () => $p("local_llm_start", {
            providerId: e.id
          })),
          children: [c.jsx(Ol, {
            size: 14
          }), "启动对话服务"]
        }), c.jsxs("button", {
          type: "button",
          disabled: !(r != null && r.port) || y === "停止中",
          onClick: () => void E("停止中", () => $p("local_llm_stop")),
          children: [c.jsx(kf, {
            size: 14
          }), "停止对话服务"]
        }), c.jsx("span", {
          role: "status",
          children: y || (r ? whn[r.state] : "")
        })]
      }), (r == null ? void 0 : r.runtimeError) && c.jsx("p", {
        role: "alert",
        className: "api-access-error",
        children: r.runtimeError
      }), c.jsxs("details", {
        open: r != null && r.runtimeError ? !0 : void 0,
        children: [c.jsx("summary", {
          children: "运行日志"
        }), c.jsx("pre", {
          className: "api-local-model-log",
          children: (r == null ? void 0 : r.logs.join(`
`)) || "启动后显示日志"
        })]
      })]
    }), (v || (r == null ? void 0 : r.error)) && c.jsx("p", {
      role: "alert",
      className: "api-access-error",
      children: v || (r == null ? void 0 : r.error)
    }), w && c.jsx("p", {
      role: "status",
      className: "api-access-notice",
      children: w
    }), c.jsxs("div", {
      className: "api-access-actions",
      children: [c.jsxs("button", {
        type: "button",
        className: "api-local-remove",
        disabled: !!y || !!(r != null && r.port),
        onClick: n,
        children: [c.jsx(Qo, {
          size: 14
        }), "移除本地接入"]
      }), c.jsx("span", {
        children: "原模型包保留在磁盘"
      })]
    })]
  });
}

function dmr({
  presetId: e,
  isDark: t
}) {
  return on(), e === "preset-jimeng" ? c.jsxs("div", {
    className: "api-account-card",
    children: [c.jsx(kQn, {
      isDark: t
    }), c.jsx("p", {
      className: "api-access-caption",
      children: x("与画布「即梦 CLI」共用账号、积分和授权状态；登录后继续在原来的即梦 CLI 模型入口创作。")
    })]
  }) : c.jsx(QGi, {});
}

function QGi() {
  on();
  const [e, t] = g.useState(null),
    [n, r] = g.useState(!1),
    [a, i] = g.useState(""),
    [o, s] = g.useState(!1),
    l = g.useRef(0),
    d = g.useRef(0),
    u = g.useRef(null),
    h = "__TAURI__" in window && !window.__LINGO_ELECTRON_NATIVE_SHELL__,
    p = async () => {
      if (u.current) return;
      const f = Symbol();
      u.current = f;
      const y = l.current;
      try {
        const b = await Fr("xyq_account_status");
        y === l.current && (t(b), i(""), s(!1), b.loginPending && !b.loggedIn && !d.current && (d.current = Date.now() + 3e5));
      } catch (b) {
        y === l.current && (t(null), i(typeof b == "string" ? b : "无法确认登录状态，请稍后刷新重试。"));
      } finally {
        u.current === f && (u.current = null);
      }
    };
  g.useEffect(() => {
    if (!h) return;
    p();
    const f = setInterval(() => {
        d.current > Date.now() ? p() : d.current && (d.current = 0, s(!0));
      }, 2e3),
      y = () => {
        document.visibilityState === "visible" && p();
      };
    return window.addEventListener("focus", y), document.addEventListener("visibilitychange", y), () => {
      l.current++, u.current = null, clearInterval(f), window.removeEventListener("focus", y), document.removeEventListener("visibilitychange", y);
    };
  }, [h]), g.useEffect(() => {
    (e != null && e.loggedIn || (e == null ? void 0 : e.loginPending) === !1) && (d.current = 0);
  }, [e]);
  const m = async (f, y = !1) => {
    if (n) return;
    const b = ++l.current;
    d.current = 0, s(!1), r(!0), i("");
    try {
      if (f === "login") {
        if (await Fr("xyq_account_login", {
          force: y
        }), b !== l.current) return;
        t({
          loggedIn: !1,
          loginPending: !0
        }), d.current = Date.now() + 3e5;
      } else {
        if (await Fr("xyq_account_logout"), b !== l.current) return;
        t({
          loggedIn: !1,
          loginPending: !1
        });
      }
    } catch {
      b === l.current && (t(null), i("账号操作未完成，请重试；桌面后端更新后需重启应用。"));
    } finally {
      b === l.current && r(!1);
    }
  };
  return c.jsxs("section", {
    className: "api-access-card api-account-card",
    children: [c.jsx("h4", {
      children: x("小云雀账号")
    }), c.jsx("p", {
      role: "status",
      children: h ? e != null && e.loggedIn ? x("已登录{0}", e.displayName ? ` · ${e.displayName}` : "") : o ? x("自动检查已暂停，完成授权后点击刷新状态") : e != null && e.loginPending ? x("等待网页授权，完成后自动检查；也可点击刷新状态") : x(e ? "未登录" : a ? "登录状态未确认" : "正在检查登录状态…") : x("请在 Tauri 桌面版登录小云雀")
    }), c.jsxs("div", {
      className: "api-access-actions",
      children: [c.jsx("button", {
        type: "button",
        disabled: !h || n,
        onClick: () => void m("login", (e == null ? void 0 : e.loggedIn) === !0),
        children: n ? x("处理中…") : e != null && e.loggedIn ? x("切换账号") : x("登录账号")
      }), c.jsx("button", {
        type: "button",
        disabled: !h || n,
        onClick: () => void p(),
        children: x("刷新状态")
      }), ((e == null ? void 0 : e.loggedIn) || (e == null ? void 0 : e.loginPending)) && c.jsx("button", {
        type: "button",
        disabled: n,
        onClick: () => void m("logout"),
        children: x("退出登录")
      })]
    }), c.jsx("p", {
      className: "api-access-caption",
      children: x("在独立窗口完成网页登录，登录状态保留在本机。此处管理账号；小云雀图片、视频生成尚未接入画布。")
    }), a && c.jsx("p", {
      role: "alert",
      className: "api-access-error",
      children: a
    })]
  });
}

function umr({
  provider: e
}) {
  if (on(), e.kind === "account" || !e.url.trim()) return null;
  try {
    Uce(e.url), FIe(e);
  } catch {
    return c.jsx("p", {
      className: "api-access-notice",
      children: x("请填写 HTTP/HTTPS 基础地址；不要包含密钥或查询参数。")
    });
  }
  return c.jsxs("div", {
    className: "api-access-connection-preview",
    children: [c.jsx("small", {
      children: x("目录只用于发现模型；不提供目录的接口也可手动添加模型。")
    }), e.kind === "responses" && c.jsx("small", {
      children: x("Responses 类型用于对话。绘画需单独确认 Images API 或自定义 HTTP 参数；当前接入页不提供 Responses 流式生图适配。")
    })]
  });
}

const xhn = g$e.filter(e => !["preset-jimeng", "preset-xyq"].includes(e.id));

function YGi({
  isDark: e,
  onClose: t,
  onAdd: n
}) {
  var E;
  on();
  const r = g.useRef(null),
    [a, i] = g.useState(""),
    [o, s] = g.useState("custom"),
    [l, d] = g.useState(() => ({
      ...gne(),
      name: ""
    })),
    [u, h] = g.useState(!1),
    [p, m] = g.useState(!1),
    [f, y] = g.useState(""),
    [b, v] = g.useState("Image"),
    [_, w] = g.useState(null),
    k = {
      isDark: e,
      activeDropdown: _,
      setActiveDropdown: w
    },
    A = g$e.find(M => M.id === o),
    S = HGi(A);
  g.useEffect(() => {
    var M;
    (M = r.current) == null || M.showModal();
  }, []);
  const C = M => {
      const T = g$e.find(P => P.id === M);
      s(M), d(T ? vhn(T) : M === "local-comfyui" ? {
        ...gne(),
        name: "本地 ComfyUI",
        kind: "local-comfyui",
        url: "http://127.0.0.1"
      } : M === "local-llama" ? {
        ...gne(),
        name: "本地 Qwen",
        kind: "local-llama",
        url: "http://127.0.0.1:8080/v1",
        localNoAuth: !0,
        icon: "lmstudio"
      } : M === "local-chat" ? {
        ...gne(),
        name: "本地对话",
        url: "http://127.0.0.1:8080/v1",
        localNoAuth: !0
      } : {
        ...gne(),
        name: "",
        kind: M === "http" ? "custom" : "openai"
      }), y(""), h(!1), m(!1), w(null);
    },
    I = M => {
      d(T => ({
        ...T,
        ...M
      })), y("");
    };
  return Da.createPortal(c.jsxs("dialog", {
    ref: r,
    "aria-label": x("添加服务商"),
    className: `api-provider-dialog ${e ? "is-dark" : ""}`,
    onCancel: t,
    onClick: M => {
      M.target === M.currentTarget && t();
    },
    children: [c.jsxs("header", {
      children: [c.jsx("h2", {
        children: x("添加服务商")
      }), c.jsx("button", {
        type: "button",
        "aria-label": x("关闭添加服务商"),
        onClick: t,
        children: c.jsx(Na, {
          size: 18
        })
      })]
    }), c.jsxs("div", {
      className: "api-provider-picker",
      children: [c.jsxs("aside", {
        children: [c.jsxs("div", {
          className: "api-access-search",
          children: [c.jsx(mc, {
            size: 16
          }), c.jsx("input", {
            "aria-label": x("搜索服务商预设"),
            placeholder: x("搜索服务商"),
            value: a,
            onChange: M => i(M.target.value)
          })]
        }), c.jsx("nav", {
          "aria-label": x("服务商预设"),
          children: [{
            id: "custom",
            name: "自定义服务商",
            category: "Chat Completions / Responses",
            icon: ""
          }, {
            id: "http",
            name: "自定义 HTTP",
            category: "粘贴接口示例 · 绘画 / 视频",
            icon: ""
          }, {
            id: "local-comfyui",
            name: "本地 ComfyUI",
            category: "已下载模型 · Flux 绘画 · H3 视频",
            icon: "comfyui"
          }, {
            id: "local-llama",
            name: "本地 Qwen 模型包",
            category: "目录关联 · llama.cpp · GGUF",
            icon: "lmstudio"
          }, {
            id: "local-chat",
            name: "已有本地对话服务",
            category: "已有服务地址 · llama.cpp / LM Studio / Ollama",
            icon: "lmstudio"
          }, ...xhn].filter(M => `${M.name} ${M.id} ${M.category}`.toLowerCase().includes(a.toLowerCase())).map(M => c.jsxs("button", {
            type: "button",
            className: `api-access-provider${M.id === o ? " is-selected" : ""}`,
            "aria-pressed": M.id === o,
            onClick: () => C(M.id),
            children: [c.jsx(qz, {
              icon: M.icon || M.id.replace("preset-", "").replace("minimax-global", "minimax")
            }), c.jsx("span", {
              children: c.jsx("strong", {
                children: M.name
              })
            })]
          }, M.id))
        })]
      }), c.jsxs("form", {
        id: "add-api-provider",
        onSubmit: M => {
          if (M.preventDefault(), !S) {
            if (l.kind !== "custom") {
              const T = b0e(l);
              if (T) {
                y(T);
                return;
              }
            }
            n(l.kind === "custom" ? {
              ...l,
              name: l.name.trim() || "自定义 HTTP"
            } : YRt(l), l.kind === "custom" ? b : void 0);
          }
        },
        children: [c.jsx("h3", {
          children: (A == null ? void 0 : A.name) || (o === "local-chat" ? "已有本地对话服务" : o.startsWith("local-") ? l.name : "") || (l.kind === "custom" ? x("自定义 HTTP") : x("自定义服务商"))
        }), l.kind !== "account" && c.jsxs(c.Fragment, {
          children: [c.jsxs("div", {
            className: "api-provider-brand",
            children: [c.jsx(qz, {
              icon: l.icon
            }), c.jsxs("div", {
              className: "api-access-actions",
              children: [c.jsxs("label", {
                className: "api-provider-upload",
                children: [x("上传图片"), c.jsx("input", {
                  "aria-label": x("上传服务商 Logo"),
                  type: "file",
                  accept: "image/png,image/jpeg,image/webp",
                  onChange: async M => {
                    var j;
                    const T = (j = M.target.files) == null ? void 0 : j[0];
                    if (!T) return;
                    if (!["image/png", "image/jpeg", "image/webp"].includes(T.type) || T.size > 512 * 1024) {
                      y("请选择不超过 512 KB 的 PNG、JPEG 或 WebP 图片");
                      return;
                    }
                    const P = new FileReader(),
                      R = l.id;
                    P.onload = () => d(B => B.id === R ? {
                      ...B,
                      icon: String(P.result)
                    } : B), P.onerror = () => y("无法读取图片"), P.readAsDataURL(T);
                  }
                })]
              }), c.jsx("button", {
                type: "button",
                onClick: () => m(M => !M),
                children: x("内置头像")
              }), c.jsx("button", {
                type: "button",
                onClick: () => I({
                  icon: A ? vhn(A).icon : void 0
                }),
                children: x("重置头像")
              })]
            })]
          }), p && c.jsx("div", {
            className: "api-provider-icons",
            children: Object.keys(cmr).map(M => c.jsx("button", {
              type: "button",
              "aria-label": x("使用 {0} 图标", M),
              title: M,
              onClick: () => {
                I({
                  icon: M
                }), m(!1);
              },
              children: c.jsx(qz, {
                icon: M
              })
            }, M))
          }), S && c.jsx("p", {
            role: "note",
            className: "api-provider-note",
            children: S
          }), l.kind === "custom" && !S && c.jsx("p", {
            className: "api-provider-note",
            children: x("继续后打开原来的接口配置：粘贴 cURL / JSON、识别参数、设置查询与返回结果。地址和密钥可在下一步填写。")
          }), c.jsxs("label", {
            children: [x("服务商名称"), c.jsx("input", {
              "aria-label": x("新服务商名称"),
              value: l.name,
              onChange: M => I({
                name: M.target.value
              })
            })]
          })]
        }), l.kind === "local-comfyui" || l.kind === "local-llama" ? c.jsxs("p", {
          className: "api-provider-note",
          children: ["关联已解压的本地模型包，由画布启动本机服务。", l.kind === "local-llama" ? "检测 Qwen GGUF 和 llama.cpp，自动配置普通对话模型。" : "检测目录并配置 Flux 绘画、H3 视频。", "不需要 API Key，检测目录不会运行生成。"]
        }) : l.kind === "account" ? c.jsx(dmr, {
          presetId: o,
          isDark: e
        }, o) : c.jsxs(c.Fragment, {
          children: [c.jsxs("label", {
            children: [o === "local-chat" ? "本机服务地址" : x("API 地址"), c.jsx("input", {
              "aria-label": x("新服务商 API 地址"),
              value: l.url,
              onChange: M => I({
                url: M.target.value
              })
            }), c.jsx("small", {
              children: x("可粘贴基础地址或常见完整接口地址，保存时会整理已知端点。")
            })]
          }), c.jsx(umr, {
            provider: l
          }), (jP(l.url) || l.localNoAuth) && c.jsxs("label", {
            className: "api-local-auth",
            children: [c.jsx("input", {
              type: "checkbox",
              checked: !!l.localNoAuth,
              onChange: M => I({
                localNoAuth: M.target.checked
              })
            }), c.jsx("span", {
              children: "本机服务免密钥（不使用全局 Key）"
            })]
          }), o === "local-chat" && c.jsx("p", {
            className: "api-provider-note",
            children: "用于连接已启动的 llama.cpp / LM Studio / Ollama 服务，默认无需 API Key。使用已下载的 Qwen 模型包，请选择左侧“本地 Qwen 模型包”关联目录并启动。新导入模型默认普通对话，工具调用需验证后启用。"
          }), !!((E = A == null ? void 0 : A.baseUrlOptions) != null && E.length) && c.jsx(vk, {
            ...k,
            label: x("预设区域地址"),
            value: l.url,
            options: A.baseUrlOptions.map(M => ({
              value: M.value,
              label: M.label || M.region || M.value
            })),
            onSelect: M => I({
              url: M
            })
          }), !Hk(l) && c.jsxs("label", {
            children: [x("API 密钥"), c.jsxs("div", {
              className: "api-access-key",
              children: [c.jsx("input", {
                "aria-label": x("新服务商 API 密钥"),
                type: u ? "text" : "password",
                autoComplete: "off",
                value: l.key,
                onChange: M => I({
                  key: M.target.value
                })
              }), c.jsx("button", {
                type: "button",
                "aria-label": x(u ? "隐藏密钥" : "显示密钥"),
                onClick: () => h(M => !M),
                children: u ? c.jsx($d, {
                  size: 16
                }) : c.jsx(ul, {
                  size: 16
                })
              })]
            })]
          }), !S && c.jsxs("div", {
            className: "api-access-field",
            children: [c.jsx("span", {
              children: x("服务商类型")
            }), c.jsx(vk, {
              ...k,
              label: x("新服务商类型"),
              value: l.kind,
              options: LBe,
              onSelect: M => I({
                kind: M,
                modelsPath: M === "gemini" ? "/v1beta/models" : M === "azure-openai" ? "/openai/v1/models" : /\/v1$/.test(l.url) ? "/models" : "/v1/models"
              })
            })]
          }), l.kind === "custom" && c.jsx(vk, {
            ...k,
            label: x("自定义接口类别"),
            value: b,
            options: [{
              value: "Image",
              label: "绘画"
            }, {
              value: "Video",
              label: "视频"
            }],
            onSelect: M => v(M)
          })]
        }), A && l.kind !== "account" && c.jsxs("details", {
          children: [c.jsx("summary", {
            children: x("预设接口资料")
          }), c.jsx("pre", {
            children: JSON.stringify({
              type: A.type,
              baseUrl: A.baseUrl,
              endpoints: A.endpoints,
              endpointConfigs: A.endpointConfigs
            }, null, 2)
          })]
        }), A && c.jsx("div", {
          className: "api-access-actions",
          children: Object.entries(A.websites).filter(([M]) => (l.kind === "account" ? ["official"] : ["official", "docs", "apiKey"]).includes(M)).map(([M, T]) => c.jsxs("a", {
            href: T,
            target: "_blank",
            rel: "noreferrer",
            onClick: P => {
              P.preventDefault(), UZ(T).catch(() => y("无法打开网站，请复制链接到浏览器打开"));
            },
            children: [x(M === "official" ? "官网" : M === "docs" ? "接口文档" : "获取密钥"), " ↗"]
          }, M))
        }), f && c.jsx("p", {
          role: "alert",
          className: "api-access-error",
          children: f
        })]
      })]
    }), c.jsxs("footer", {
      children: [c.jsxs("span", {
        children: [xhn.length, x(" 个服务商预设 · 添加后可获取或手动填写模型")]
      }), c.jsx("button", {
        type: "button",
        onClick: t,
        children: x("取消")
      }), c.jsx("button", {
        type: "submit",
        form: "add-api-provider",
        className: "api-access-primary",
        disabled: !!S,
        children: l.kind === "local-comfyui" || l.kind === "local-llama" ? x("添加并关联目录") : l.kind === "account" ? x("完成") : l.kind === "custom" ? x("继续配置接口") : x("添加并获取模型")
      })]
    })]
  }), document.body);
}

function _hn(e, t, n) {
  var o, s, l, d;
  const r = t.metadata,
    a = (r == null ? void 0 : r.request) || (r == null ? void 0 : r.note) || (r == null ? void 0 : r.schema) || (r == null ? void 0 : r.protocol) === "responses" || (r == null ? void 0 : r.endpoints.some(u => u.startsWith("/"))),
    i = wve(e, n, t.id, n === "Chat" || !a && _We(t.id, n) ? void 0 : "http");
  if (i.provider = t.name, (o = t.channelGroups) != null && o.length && (i.channelGroups = t.channelGroups), r) {
    const {
      parameters: u,
      endpoints: h,
      schema: p,
      note: m
    } = r;
    i.discoveredMetadata = {
      parameters: u,
      endpoints: h,
      ...(p ? {
        schema: p
      } : {}),
      ...(m ? {
        note: m
      } : {})
    }, n === "Chat" && r.protocol && (i.chatProtocol = r.protocol === "responses" ? "responses" : "chat", i.nativeChat = r.protocol === "gemini" || r.protocol === "anthropic" ? {
      protocol: r.protocol
    } : void 0), n !== "Chat" && r.request && (i.templateId = void 0, i.customProtocol = {
      ...r.request,
      ...(n === "Video" ? {
        base64Paths: []
      } : {})
    }, Object.assign(i, r.options), i.autoMatchTemplate = !1, r.requestOrigin && new URL(e.url).origin !== r.requestOrigin && (i.customProtocol.path = "", i.discoveredMetadata.note = "目录示例指向其他地址，请手动确认提交路径")), n !== "Chat" && r.note && !r.request && i.customProtocol && (i.customProtocol.path = ""), n === "Image" && r.protocol === "responses" && i.customProtocol && (!r.request || !("input" in r.request.body) || !("tools" in r.request.body)) && (i.customProtocol.path = "", i.discoveredMetadata.note = "目录标记为 Responses 生图，不能直接套用 Images API。请确认服务商提供 Images API，或补充自定义 HTTP 的请求与返回映射；当前不提供 Responses 流式生图适配。");
  }
  return n !== "Chat" && (i.canvasUiTemplateId = T6n(t.id, n, N1), i.customProtocol && i.canvasUiTemplateId && (i.ratios = ((s = r == null ? void 0 : r.options) == null ? void 0 : s.ratios) || ah(i.canvasUiTemplateId), i.resolutions = ((l = r == null ? void 0 : r.options) == null ? void 0 : l.resolutions) || rl(i.canvasUiTemplateId), n === "Video" && (i.durations = ((d = r == null ? void 0 : r.options) == null ? void 0 : d.durations) || ih(i.canvasUiTemplateId)))), NZ(i, e);
}

const khn = [{
  id: "All",
  label: "全部"
}, {
  id: "Chat",
  label: "文本"
}, {
  id: "Image",
  label: "图片"
}, {
  id: "Video",
  label: "视频"
}, {
  id: "Audio",
  label: "音频"
}, {
  id: "Unknown",
  label: "待分类"
}];

function XGi({
  provider: e,
  configs: t,
  isDark: n,
  onClose: r,
  onManual: a,
  onConfigure: i
}) {
  on();
  const o = g.useRef(null),
    s = g.useRef(null),
    [l, d] = g.useState([]),
    [u, h] = g.useState(!1),
    [p, m] = g.useState(""),
    [f, y] = g.useState(""),
    [b, v] = g.useState("All"),
    [_, w] = g.useState([]),
    [k, A] = g.useState("Chat"),
    [S, C] = g.useState({}),
    [I, E] = g.useState(!1),
    [M, T] = g.useState([]),
    [P, R] = g.useState(""),
    j = g.useRef(new Set()),
    B = async () => {
      var H;
      (H = s.current) == null || H.abort();
      const D = new AbortController();
      s.current = D, h(!0), m(""), T([]), R("");
      const U = setTimeout(() => D.abort("timeout"), omr);
      try {
        const Y = await lmr(e, Qa.getGlobalApiKey(), D.signal, {
          globalBaseUrl: Qa.getGlobalBaseUrl(),
          onProgress: K => {
            s.current === D && !D.signal.aborted && d(K);
          },
          onWarning: K => {
            s.current === D && !D.signal.aborted && T(W => W.includes(K) ? W : [...W, K]);
          }
        });
        s.current === D && !D.signal.aborted && d(Y);
      } catch (Y) {
        s.current === D && (D.signal.aborted ? R(D.signal.reason === "timeout" ? "获取超时，已保留显示的模型，可刷新或手动添加。" : "已停止获取，已显示的模型仍可添加。") : m(`${Y.message}。已显示的模型会保留，也可手动添加。`));
      } finally {
        clearTimeout(U), s.current === D && (s.current = null, h(!1));
      }
    };
  g.useEffect(() => {
    var D;
    return (D = o.current) == null || D.showModal(), B(), () => {
      const U = s.current;
      s.current = null, U == null || U.abort();
    };
  }, []);
  const F = new Map(t.map(D => [D.modelName, D])),
    N = D => j.current.has(D.id) || F.has(D.id),
    G = l.map(D => {
      var U;
      return {
        ...D,
        kind: ((U = F.get(D.id)) == null ? void 0 : U.type) || (Object.prototype.hasOwnProperty.call(S, D.id) ? S[D.id] : D.kind)
      };
    }),
    z = I ? G.filter(D => D.catalogSource === "primary") : G,
    V = z.filter(D => (b === "All" || (D.kind || "Unknown") === b) && `${D.name} ${D.id} ${D.group}`.toLowerCase().includes(f.toLowerCase())),
    O = [...new Set(V.map(D => D.group || "其他"))].sort((D, U) => D.localeCompare(U)),
    L = D => {
      const U = D.filter(H => !N(H) && H.kind && ["Chat", "Image", "Video"].includes(H.kind));
      if (U.length) try {
        const H = U.find(Y => Y.kind === "Image" || Y.kind === "Video");
        if (H) {
          i(_hn(e, H, H.kind));
          return;
        }
        jJ(e.id, U.map(Y => _hn(e, Y, "Chat"))), U.forEach(Y => j.current.add(Y.id)), R(`已添加 ${U.length} 个对话模型。可在画布模型列表的“自定义”中选择「${e.name}」。`);
      } catch (H) {
        m(H.message);
      }
    };
  return Da.createPortal(c.jsxs("dialog", {
    ref: o,
    className: `api-provider-dialog api-model-browser ${n ? "is-dark" : ""}`,
    "aria-label": x("{0} 模型", e.name),
    onCancel: r,
    onClick: D => {
      D.target === D.currentTarget && r();
    },
    children: [c.jsxs("header", {
      children: [c.jsx(qz, {
        icon: e.icon
      }), c.jsxs("h2", {
        children: [e.name, x(" 模型")]
      }), c.jsx("button", {
        type: "button",
        "aria-label": x("关闭模型列表"),
        onClick: r,
        children: c.jsx(Na, {
          size: 18
        })
      })]
    }), c.jsxs("div", {
      className: "api-model-browser-body",
      children: [c.jsxs("div", {
        className: "api-access-search",
        children: [c.jsx(mc, {
          size: 16
        }), c.jsx("input", {
          "aria-label": x("搜索服务商模型"),
          placeholder: x("搜索模型名称或 ID"),
          value: f,
          onChange: D => y(D.target.value)
        }), c.jsx("button", {
          type: "button",
          "aria-label": x("刷新模型列表"),
          disabled: u,
          onClick: () => void B(),
          children: c.jsx(bd, {
            size: 16,
            className: u ? "animate-spin" : ""
          })
        })]
      }), c.jsx("small", {
        children: x("已发现不代表已验证调用权限。类别可修正；图片、视频添加后需确认接口参数。不会发送生成请求。")
      }), c.jsx("div", {
        className: "api-model-browser-tabs",
        role: "tablist",
        children: khn.map(D => c.jsxs("button", {
          role: "tab",
          type: "button",
          "aria-selected": b === D.id,
          onClick: () => {
            v(D.id), ["Chat", "Image", "Video"].includes(D.id) && A(D.id);
          },
          children: [x(D.label), c.jsx("small", {
            children: z.filter(U => D.id === "All" || (U.kind || "Unknown") === D.id).length
          })]
        }, D.id))
      }), c.jsxs("div", {
        className: "api-model-browser-progress",
        children: [c.jsxs("label", {
          className: "api-model-browser-filter",
          children: [c.jsx("input", {
            type: "checkbox",
            checked: I,
            onChange: D => E(D.target.checked)
          }), x("仅显示主目录模型")]
        }), c.jsx("span", {
          role: "status",
          children: u ? l.length ? x("已发现 {0} 个，可先添加；仍在补充目录…", l.length) : x("正在获取模型目录…") : x("已发现 {0} 个模型", l.length)
        }), u && c.jsx("button", {
          type: "button",
          onClick: () => {
            var D;
            return (D = s.current) == null ? void 0 : D.abort("cancel");
          },
          children: x("停止获取")
        })]
      }), (p || P || M.length > 0) && c.jsxs("div", {
        className: "api-model-browser-messages",
        children: [p && c.jsx("p", {
          role: "alert",
          className: "api-access-error",
          children: p
        }), P && c.jsx("p", {
          role: "status",
          className: "api-access-notice",
          children: P
        }), M.map(D => c.jsx("p", {
          className: "api-access-notice",
          children: D
        }, D))]
      }), c.jsxs("div", {
        className: "api-model-browser-list",
        children: [O.map(D => c.jsxs("section", {
          children: [c.jsxs("div", {
            className: "api-model-group-heading",
            children: [c.jsxs("button", {
              type: "button",
              "aria-expanded": !_.includes(D),
              onClick: () => w(U => U.includes(D) ? U.filter(H => H !== D) : [...U, D]),
              children: [c.jsx(Mi, {
                size: 16,
                style: {
                  transform: _.includes(D) ? "rotate(-90deg)" : void 0
                }
              }), D.toUpperCase(), " ", c.jsx("small", {
                children: V.filter(U => (U.group || "其他") === D).length
              })]
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("添加 {0} 分组文本模型", D),
              title: x("添加此分组的文本模型；媒体模型请逐个配置"),
              disabled: !V.some(U => (U.group || "其他") === D && U.kind === "Chat" && !N(U)),
              onClick: () => L(V.filter(U => (U.group || "其他") === D && U.kind === "Chat")),
              children: c.jsx(eo, {
                size: 17
              })
            })]
          }), !_.includes(D) && V.filter(U => (U.group || "其他") === D).map(U => {
            var H;
            return c.jsxs("div", {
              className: "api-model-browser-row",
              children: [c.jsx("span", {
                className: "api-model-initial",
                children: (H = U.id[0]) == null ? void 0 : H.toUpperCase()
              }), c.jsxs("span", {
                children: [c.jsx("strong", {
                  children: U.name
                }), U.name !== U.id && c.jsx("small", {
                  children: U.id
                }), c.jsxs("small", {
                  children: [U.catalogSource === "primary" ? x("主目录") : U.catalogSource === "public" ? x("公开目录") : x("补充目录"), " · ", N(U) ? x("已配置") : x("待添加")]
                }), U.metadata && c.jsxs("small", {
                  children: [x("接口信息 · "), U.metadata.parameters.length, x(" 个参数")]
                })]
              }), c.jsx("select", {
                "aria-label": x("模型 {0} 的类别", U.id),
                value: U.kind || "Unknown",
                disabled: N(U),
                onChange: Y => C(K => ({
                  ...K,
                  [U.id]: Y.target.value
                })),
                children: khn.filter(Y => Y.id !== "All").map(Y => c.jsx("option", {
                  value: Y.id,
                  children: x(Y.label)
                }, Y.id))
              }), c.jsx("button", {
                type: "button",
                "aria-label": x("添加模型 {0}", U.id),
                disabled: N(U) || !U.kind || U.kind === "Audio" || U.kind === "Unknown",
                title: U.kind === "Audio" ? x("音频模型请在现有音频设置中配置") : !U.kind || U.kind === "Unknown" ? x("请先选择模型类别") : N(U) ? x("已添加") : x("添加模型"),
                onClick: () => L([U]),
                children: N(U) ? x("已添加") : c.jsx(eo, {
                  size: 16
                })
              })]
            }, U.id);
          })]
        }, D)), !V.length && c.jsx("p", {
          children: x(u ? "目录返回后会立即显示，也可先手动添加。" : "没有匹配模型，可修改筛选或手动填写模型 ID。")
        })]
      })]
    }), c.jsxs("footer", {
      children: [c.jsx("span", {
        children: x("保存后在画布“自定义”模型列表中使用")
      }), c.jsx("select", {
        "aria-label": x("手动添加模型类别"),
        value: k,
        onChange: D => A(D.target.value),
        children: OBe.map(D => c.jsx("option", {
          value: D.value,
          children: x(D.label)
        }, D.value))
      }), c.jsxs("button", {
        type: "button",
        onClick: () => a(k),
        children: [c.jsx(eo, {
          size: 14
        }), x("手动添加模型")]
      }), c.jsx("button", {
        type: "button",
        onClick: r,
        children: x("完成")
      })]
    })]
  }), document.body);
}

const hmr = g.createContext({
    active: !1,
    reduced: !1
  }),
  JGi = () => g.useContext(hmr);

function pmr({
  className: e,
  label: t,
  children: n
}) {
  const r = g.useRef(null),
    [a, i] = g.useState({
      active: !1,
      reduced: !1
    }),
    [o, s] = g.useState(!1);
  return g.useEffect(() => {
    const l = window.matchMedia("(prefers-reduced-motion: reduce)");
    let d = !1;
    const u = () => {
        const p = d && !document.hidden && !l.matches;
        i(m => m.active === p && m.reduced === l.matches ? m : {
          active: p,
          reduced: l.matches
        });
      },
      h = new IntersectionObserver(([p]) => {
        d = p.isIntersecting, u();
      });
    return h.observe(r.current), document.addEventListener("visibilitychange", u), l.addEventListener("change", u), u(), () => {
      h.disconnect(), document.removeEventListener("visibilitychange", u), l.removeEventListener("change", u);
    };
  }, []), g.useEffect(() => {
    if (!a.active) {
      s(!1);
      return;
    }
    const l = () => {
      s(!0), d = window.setTimeout(() => {
        s(!1), d = window.setTimeout(l, 18e3);
      }, 6e3);
    };
    let d = window.setTimeout(l, 1e4);
    return () => window.clearTimeout(d);
  }, [a.active]), c.jsx(hmr.Provider, {
    value: a,
    children: c.jsx("section", {
      ref: r,
      className: `${e} api-promo-surface`,
      "aria-label": t,
      "data-motion": a.active,
      "data-ambient": a.active && o,
      children: n
    })
  });
}

function qst({
  value: e
}) {
  return c.jsxs("span", {
    className: "api-promo-number",
    children: [c.jsx("span", {
      className: "api-promo-readable",
      children: e
    }), c.jsx("span", {
      className: "api-promo-number-columns",
      "aria-hidden": "true",
      children: Array.from(e).map((t, n) => t === "." ? c.jsx("span", {
        children: "."
      }, n) : c.jsx("span", {
        className: "api-promo-digit",
        style: {
          "--digit-end": -(10 + Number(t)),
          "--digit-delay": `${180 + n * 65}ms`
        },
        children: c.jsxs("span", {
          className: "api-promo-digit-track",
          children: [Array.from({
            length: 11 + Number(t)
          }, (r, a) => c.jsx("span", {
            children: a % 10
          }, a)), c.jsx("span", {
            children: t
          })]
        })
      }, n))
    })]
  });
}

function mmr({
  phrases: e
}) {
  const {
      active: t,
      reduced: n
    } = JGi(),
    [r, a] = g.useState({
      index: 0,
      count: 0,
      phase: "typing"
    });
  g.useEffect(() => {
    if (!t) return;
    const s = e[r.index],
      l = Array.from(s.lines.join(`
`)),
      d = l[r.count - 1],
      u = r.phase === "hold" ? 4200 : r.phase === "fade" ? 280 : r.phase === "gap" ? 380 : r.count === 0 ? 240 : d === `
` ? 420 : /[，。、,.!?]/.test(d ?? "") ? 240 : s.lang === "en" ? 48 : 85,
      h = window.setTimeout(() => {
        if (r.phase === "typing") {
          const p = r.count + 1;
          a({
            ...r,
            count: p,
            phase: p >= l.length ? "hold" : "typing"
          });
        } else r.phase === "hold" ? a({
          ...r,
          phase: "fade"
        }) : r.phase === "fade" ? a({
          index: (r.index + 1) % e.length,
          count: 0,
          phase: "gap"
        }) : a({
          ...r,
          phase: "typing"
        });
      }, u);
    return () => window.clearTimeout(h);
  }, [t, r, e]);
  const i = e[n ? 0 : r.index];
  let o = n ? 1 / 0 : r.count;
  return c.jsxs("span", {
    className: "api-promo-typewriter",
    "data-phase": n ? "hold" : r.phase,
    "data-running": t,
    children: [c.jsx("span", {
      className: "api-promo-readable",
      children: e[0].lines.join("")
    }), c.jsx("span", {
      className: "api-promo-copy",
      lang: i.lang,
      "aria-hidden": "true",
      children: i.lines.map((s, l) => {
        const d = Array.from(s),
          u = t && r.phase === "typing" && o >= 0 && o <= d.length,
          h = d.slice(0, Math.max(0, o)).join("");
        return o -= d.length + 1, c.jsx("span", {
          className: `api-promo-line${u ? " is-typing" : ""}`,
          children: c.jsx("span", {
            children: h
          })
        }, l);
      })
    })]
  });
}

const fmr = "" + new URL("metaso-BgxKxPej.jpg", import.meta.url).href,
  Ahn = "https://metaso.cn/minimax-h3/?s=Madax",
  ZGi = [{
    lang: "zh-CN",
    lines: ["让灵感，成为影像"]
  }, {
    lang: "en",
    lines: ["Turn inspiration into motion"]
  }, {
    lang: "ko",
    lines: ["영감을 영상으로"]
  }, {
    lang: "ja",
    lines: ["ひらめきを、映像に"]
  }];

function eVi() {
  const [e, t] = g.useState("");
  return c.jsxs(pmr, {
    className: "api-metaso",
    label: "秘塔科技 MiniMax H3 推广",
    children: [c.jsxs("header", {
      className: "api-metaso-brand",
      children: [c.jsx("img", {
        className: "api-metaso-logo",
        src: fmr,
        alt: "秘塔 META SOTA"
      }), c.jsxs("div", {
        children: [c.jsx("strong", {
          children: "秘塔科技"
        }), c.jsx("span", {
          children: "VIDEO GENERATION API"
        })]
      }), c.jsx("span", {
        className: "api-metaso-ad-label",
        children: "推广"
      })]
    }), c.jsxs("div", {
      className: "api-metaso-intro",
      children: [c.jsxs("div", {
        children: [c.jsx("p", {
          className: "api-metaso-eyebrow",
          children: c.jsx(mmr, {
            phrases: ZGi
          })
        }), c.jsxs("h3", {
          children: ["MiniMax ", c.jsx("span", {
            children: "H3"
          })]
        }), c.jsx("p", {
          className: "api-metaso-description",
          children: "秘塔科技提供高性价比的视频生成服务。"
        })]
      }), c.jsxs("div", {
        className: "api-metaso-duration",
        "aria-label": "480P / 768P 最长支持 30 秒",
        children: [c.jsx("span", {
          children: "最长生成"
        }), c.jsxs("p", {
          children: [c.jsx("strong", {
            children: c.jsx(qst, {
              value: "30"
            })
          }), c.jsx("span", {
            children: "秒"
          })]
        }), c.jsx("span", {
          children: "480P / 768P"
        })]
      })]
    }), c.jsxs("div", {
      className: "api-metaso-prices",
      "aria-label": "视频生成价格",
      children: [c.jsxs("div", {
        children: [c.jsxs("span", {
          className: "api-metaso-resolution",
          children: ["768P ", c.jsx("span", {
            children: "高清生成"
          })]
        }), c.jsxs("p", {
          children: [c.jsx("strong", {
            children: c.jsx(qst, {
              value: "0.09"
            })
          }), c.jsx("span", {
            children: "元 / 秒"
          })]
        })]
      }), c.jsxs("div", {
        children: [c.jsxs("span", {
          className: "api-metaso-resolution",
          children: ["2K ", c.jsx("span", {
            children: "原生画质"
          })]
        }), c.jsxs("p", {
          children: [c.jsx("strong", {
            children: c.jsx(qst, {
              value: "0.15"
            })
          }), c.jsx("span", {
            children: "元 / 秒"
          })]
        })]
      })]
    }), c.jsxs("div", {
      className: "api-metaso-features",
      children: [c.jsxs("div", {
        children: [c.jsx(hNr, {
          size: 18
        }), c.jsx("strong", {
          children: "1080P · 原生 2K"
        }), c.jsx("span", {
          children: "细节清晰，最长 15 秒"
        })]
      }), c.jsxs("div", {
        children: [c.jsx(Q2, {
          size: 18
        }), c.jsx("strong", {
          children: "音画同步"
        }), c.jsx("span", {
          children: "画面与声音，一次生成"
        })]
      })]
    }), c.jsxs("div", {
      className: "api-metaso-bottom",
      children: [c.jsxs("div", {
        className: "api-metaso-integration",
        children: [c.jsxs("div", {
          children: [c.jsx("span", {
            children: "OpenAI 兼容协议"
          }), c.jsx("span", {
            children: "ComfyUI"
          }), c.jsx("span", {
            children: "无限画布"
          })]
        }), c.jsx("p", {
          children: "无需自行部署 GPU，专注创作本身。"
        })]
      }), c.jsx("footer", {
        className: "api-metaso-footer",
        children: c.jsxs("a", {
          href: Ahn,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: n => {
            n.preventDefault(), t(""), UZ(Ahn).catch(() => t("无法打开官网，请稍后重试。"));
          },
          children: ["前往秘塔 · 体验 H3", c.jsx(eI, {
            size: 18
          })]
        })
      })]
    }), c.jsx("p", {
      className: "api-metaso-fineprint",
      children: "以上为标准通道 15 秒及以内的单价；16–30 秒按基础费用的 2 倍计费。实际计费以官网为准。"
    }), e && c.jsx("p", {
      className: "api-access-error",
      role: "alert",
      children: e
    })]
  });
}

const gmr = "" + new URL("soonstudio-UX013Oqu.png", import.meta.url).href,
  Shn = "https://soonstudio.ai/",
  tVi = [{
    lang: "zh-CN",
    lines: ["为下一次创作，", "找到对的模型。"]
  }, {
    lang: "en",
    lines: ["Your next creation,", "the right model."]
  }, {
    lang: "ko",
    lines: ["다음 창작을 위한", "알맞은 모델."]
  }, {
    lang: "ja",
    lines: ["次の創作に、", "最適なモデルを。"]
  }];

function nVi() {
  const [e, t] = g.useState("");
  return c.jsxs(pmr, {
    className: "api-soon",
    label: "SoonStudio 多模态 API 平台推广",
    children: [c.jsxs("header", {
      className: "api-soon-brand",
      children: [c.jsx("img", {
        className: "api-soon-logo",
        src: gmr,
        alt: "SoonStudio"
      }), c.jsxs("div", {
        children: [c.jsxs("strong", {
          children: ["Soon", c.jsx("span", {
            children: "Studio"
          })]
        }), c.jsx("p", {
          children: "超速空间站 · 多模态 API 平台"
        })]
      }), c.jsx("span", {
        className: "api-soon-ad-label",
        children: "推广"
      })]
    }), c.jsxs("div", {
      className: "api-soon-intro",
      children: [c.jsxs("div", {
        children: [c.jsx("h3", {
          children: c.jsx(mmr, {
            phrases: tVi
          })
        }), c.jsx("p", {
          className: "api-soon-description",
          children: "把多模态模型能力，接入同一条创作流程。"
        })]
      }), c.jsxs("div", {
        className: "api-soon-capabilities",
        children: [c.jsx("p", {
          children: "模型能力"
        }), c.jsxs("div", {
          className: "api-soon-modalities",
          "aria-label": "四类模型能力",
          children: [c.jsxs("span", {
            children: [c.jsx(qv, {
              size: 17
            }), c.jsx("span", {
              className: "api-promo-ambient-copy",
              children: "文本"
            })]
          }), c.jsxs("span", {
            children: [c.jsx(lo, {
              size: 17
            }), c.jsx("span", {
              className: "api-promo-ambient-copy",
              children: "图像"
            })]
          }), c.jsxs("span", {
            children: [c.jsx(Oo, {
              size: 17
            }), c.jsx("span", {
              className: "api-promo-ambient-copy",
              children: "视频"
            })]
          }), c.jsxs("span", {
            children: [c.jsx(Q2, {
              size: 17
            }), c.jsx("span", {
              className: "api-promo-ambient-copy",
              children: "音频"
            })]
          })]
        })]
      })]
    }), c.jsxs("ol", {
      className: "api-soon-workflow",
      "aria-label": "从模型探索到应用接入",
      children: [c.jsxs("li", {
        children: [c.jsx("span", {
          children: "01"
        }), c.jsx("strong", {
          children: "发现模型"
        }), c.jsx("p", {
          children: "按能力浏览目录，找到适合的模型"
        })]
      }), c.jsxs("li", {
        children: [c.jsx("span", {
          children: "02"
        }), c.jsx("strong", {
          children: "在线试跑"
        }), c.jsx("p", {
          children: "在 Playground 体验，再接入工作流"
        })]
      }), c.jsxs("li", {
        children: [c.jsx("span", {
          children: "03"
        }), c.jsx("strong", {
          children: "连接创作"
        }), c.jsx("p", {
          children: "通过 API 与画布，将想法付诸实践"
        })]
      })]
    }), c.jsxs("footer", {
      className: "api-soon-footer",
      children: [c.jsxs("p", {
        children: ["从一个想法，", c.jsx("br", {}), c.jsx("strong", {
          children: "到一套工作流。"
        })]
      }), c.jsxs("a", {
        href: Shn,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: n => {
          n.preventDefault(), t(""), UZ(Shn).catch(() => t("无法打开官网，请稍后重试。"));
        },
        children: ["探索 SoonStudio", c.jsx(eI, {
          size: 17
        })]
      })]
    }), e && c.jsx("p", {
      className: "api-soon-error",
      role: "alert",
      children: e
    })]
  });
}

const sR = "promotion:metaso",
  Qfe = "promotion:soonstudio";

function rVi({
  isDark: e
}) {
  on();
  const [t, n] = g.useState([]),
    [r, a] = g.useState([]),
    [i, o] = g.useState(""),
    [s, l] = g.useState(""),
    [d, u] = g.useState(""),
    [h, p] = g.useState(!1),
    [m, f] = g.useState("");
  g.useEffect(() => {
    m === i && f("");
  }, [m, i]);
  const [y, b] = g.useState(null);
  g.useEffect(() => {
    const k = () => {
      try {
        const S = kFi();
        n(S), a(Qa.getConfigs()), o(C => {
          var I;
          return C === sR || C === Qfe || S.some(E => E.id === C) ? C : ((I = S[0]) == null ? void 0 : I.id) || sR;
        }), u("");
      } catch (S) {
        u(S.message);
      }
    };
    return k(), Qa.subscribe(k);
  }, []);
  const v = t.find(k => k.id === i),
    _ = "秘塔科技 metaso meta sota minimax h3 视频 api".includes(s.trim().toLowerCase()),
    w = "soonstudio soon studio 超速空间站 多模态 模型 api 文本 图像 视频 音频".includes(s.trim().toLowerCase());
  return c.jsxs("div", {
    className: `api-access${e ? " is-dark" : ""}`,
    children: [c.jsxs("aside", {
      className: "api-access-providers",
      children: [c.jsxs("div", {
        className: "api-access-search",
        children: [c.jsx(mc, {
          size: 15
        }), c.jsx("input", {
          "aria-label": x("搜索服务商"),
          placeholder: x("搜索服务商"),
          value: s,
          onChange: k => l(k.target.value)
        }), c.jsx("button", {
          type: "button",
          "aria-label": x("添加服务商"),
          title: x("添加服务商"),
          disabled: !!d,
          onClick: () => p(!0),
          children: c.jsx(eo, {
            size: 17
          })
        })]
      }), c.jsxs("p", {
        className: "api-access-caption",
        children: [x("服务商 · "), t.length]
      }), _ && c.jsxs("button", {
        type: "button",
        className: `api-metaso-entry${i === sR ? " is-selected" : ""}`,
        "aria-label": "秘塔科技 MiniMax H3 推广",
        "aria-pressed": i === sR,
        onClick: () => o(sR),
        children: [c.jsx("img", {
          className: "api-metaso-logo",
          src: fmr,
          alt: ""
        }), c.jsxs("span", {
          children: [c.jsxs("strong", {
            children: ["秘塔科技 ", c.jsx("span", {
              children: "推广"
            })]
          }), c.jsxs("span", {
            className: "api-metaso-entry-meta",
            children: [c.jsx("small", {
              children: "MiniMax H3"
            }), c.jsx("small", {
              className: "api-metaso-entry-price",
              children: "¥0.09/秒起"
            })]
          })]
        })]
      }), w && c.jsxs("button", {
        type: "button",
        className: `api-metaso-entry api-soon-entry${i === Qfe ? " is-selected" : ""}`,
        "aria-label": "SoonStudio 多模态 API 平台推广",
        "aria-pressed": i === Qfe,
        onClick: () => o(Qfe),
        children: [c.jsx("img", {
          className: "api-soon-logo",
          src: gmr,
          alt: ""
        }), c.jsxs("span", {
          children: [c.jsxs("strong", {
            children: ["SoonStudio ", c.jsx("span", {
              children: "推广"
            })]
          }), c.jsx("span", {
            className: "api-metaso-entry-meta",
            children: c.jsx("small", {
              children: "多模态模型 API 平台"
            })
          })]
        })]
      }), t.filter(k => `${k.name} ${k.url}`.toLowerCase().includes(s.toLowerCase())).map(k => c.jsxs("button", {
        type: "button",
        className: `api-access-provider${i === k.id ? " is-selected" : ""}`,
        onClick: () => o(k.id),
        "aria-pressed": i === k.id,
        children: [c.jsx(qz, {
          icon: k.icon
        }), c.jsxs("span", {
          children: [c.jsx("strong", {
            children: k.name
          }), c.jsx("small", {
            children: k.kind === "account" ? x("账号登录") : k.enabled ? x("{0} 个模型", r.filter(A => A.apiProviderId === k.id).length) : x("已停用")
          })]
        })]
      }, k.id)), s && !_ && !w && !t.some(k => `${k.name} ${k.url}`.toLowerCase().includes(s.toLowerCase())) && c.jsx("p", {
        className: "api-access-caption",
        children: x("没有匹配的服务商")
      })]
    }), c.jsx("div", {
      className: "api-access-detail",
      children: d ? c.jsx("p", {
        role: "alert",
        children: d
      }) : i === sR ? c.jsx(eVi, {}) : i === Qfe ? c.jsx(nVi, {}) : v ? v.kind === "local-llama" ? c.jsx(KGi, {
        provider: v,
        isDark: e,
        onRemove: () => {
          var k;
          Hst(v.id), o(((k = t.find(A => A.id !== v.id)) == null ? void 0 : k.id) || sR);
        }
      }, v.id) : v.kind === "local-comfyui" ? c.jsx(qGi, {
        provider: v,
        configs: r.filter(k => k.apiProviderId === v.id),
        onRemove: () => {
          var k;
          Hst(v.id), o(((k = t.find(A => A.id !== v.id)) == null ? void 0 : k.id) || sR);
        }
      }, v.id) : c.jsx(aVi, {
        provider: v,
        initialBrowse: m === v.id,
        configs: r.filter(k => k.apiProviderId === v.id),
        isDark: e,
        onRemove: () => {
          var k;
          Hst(v.id), o(((k = t.find(A => A.id !== v.id)) == null ? void 0 : k.id) || sR);
        }
      }, v.id) : c.jsxs("div", {
        className: "api-access-empty",
        children: [c.jsx(_Tn, {
          size: 32
        }), c.jsx("h3", {
          children: x("连接你的模型服务")
        }), c.jsx("p", {
          children: x("统一管理接口地址、密钥和模型。添加后，仍在画布原有模型列表中使用。")
        }), c.jsx("button", {
          className: "api-access-primary",
          type: "button",
          disabled: !!d,
          onClick: () => p(!0),
          children: x("添加服务商")
        })]
      })
    }), h && c.jsx(YGi, {
      isDark: e,
      onClose: () => p(!1),
      onAdd: (k, A) => {
        if (p(!1), A) {
          b({
            provider: k,
            model: {
              ...wve(k, A, "", "http"),
              inheritProviderConnection: !1
            }
          });
          return;
        }
        const C = (k.kind === "account" ? Rpe().find(I => I.kind === "account" && I.presetId === k.presetId) : void 0) || k;
        a7(C), o(C.id), l(""), ["account", "local-comfyui", "local-llama"].includes(C.kind) || f(C.id);
      }
    }), y && c.jsx(RDt, {
      initial: y.model,
      templates: N1.filter(k => k.type === y.model.type && _z(k)),
      editing: !1,
      isDark: e,
      onClose: () => b(null),
      onSave: k => {
        const A = {
          ...y.provider,
          url: k.url,
          key: k.key,
          savedApiKeyId: k.savedApiKeyId
        };
        a7(A), jJ(A.id, [{
          ...k,
          inheritProviderConnection: !0
        }]), o(A.id), l(""), b(null);
      }
    })]
  });
}

function aVi({
  provider: e,
  configs: t,
  isDark: n,
  onRemove: r,
  initialBrowse: a
}) {
  var N;
  on();
  const [i, o] = g.useState(() => {
      var G;
      return {
        ...e,
        website: e.website || ((G = g$e.find(z => z.id === e.presetId)) == null ? void 0 : G.websites.official)
      };
    }),
    [s, l] = g.useState(!1),
    [d, u] = g.useState(""),
    [h, p] = g.useState(""),
    [m, f] = g.useState(!1),
    [y, b] = g.useState(a),
    [v, _] = g.useState(""),
    [w, k] = g.useState(e.kind === "custom" ? "Image" : "Chat"),
    [A, S] = g.useState(null),
    [C, I] = g.useState(null),
    E = {
      isDark: n,
      activeDropdown: C,
      setActiveDropdown: I
    },
    M = g.useRef(null),
    T = g.useRef(!0),
    P = g.useRef(i);
  P.current = i, g.useEffect(() => (T.current = !0, () => {
    var G;
    T.current = !1, (G = M.current) == null || G.abort();
  }), []), g.useEffect(() => () => {
    const G = P.current;
    !b0e(G) && Rpe().some(z => z.id === G.id) && a7(G);
  }, []);
  const R = G => {
      var z;
      (z = M.current) == null || z.abort(), M.current = null, f(!1), o(V => ({
        ...V,
        ...G
      })), u(""), p("");
    },
    j = () => {
      const G = b0e(i);
      if (G) return p(G), !1;
      const z = YRt(i);
      return a7(z), o(z), P.current = z, p(""), u("配置已保存"), !0;
    },
    B = async () => {
      var O;
      if (!j()) return;
      (O = M.current) == null || O.abort();
      const G = new AbortController();
      M.current = G, f(!0), p(""), u("");
      const z = setTimeout(() => G.abort("timeout"), omr);
      let V = 0;
      try {
        const L = await lmr(i, Qa.getGlobalApiKey(), G.signal, {
          globalBaseUrl: Qa.getGlobalBaseUrl(),
          includeSupplemental: !1,
          onProgress: D => {
            V = D.length, T.current && M.current === G && !G.signal.aborted && u(`模型目录已连接，已发现 ${D.length} 个模型。未发送生成请求。`);
          }
        });
        if (!T.current || G.signal.aborted || M.current !== G) return;
        u(`模型目录连接成功，返回 ${L.length} 个模型。未发送生成请求。`);
      } catch (L) {
        T.current && M.current === G && p(G.signal.aborted ? V ? `目录已连接，已发现 ${V} 个模型，后续获取超时。可打开模型列表或手动添加。` : "请求已超时，请检查服务商地址或网络，也可手动添加模型" : L.message);
      } finally {
        clearTimeout(z), T.current && M.current === G && (M.current = null, f(!1));
      }
    },
    F = G => G.toLowerCase().includes(v.trim().toLowerCase());
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      className: "api-access-heading",
      children: [c.jsx(qz, {
        icon: i.icon
      }), c.jsxs("div", {
        children: [c.jsxs("h3", {
          children: [e.name, i.website && c.jsx("button", {
            type: "button",
            "aria-label": x("打开 {0} 官网", e.name),
            title: x("打开 {0} 官网", e.name),
            onClick: () => {
              UZ(i.website).catch(() => p("无法打开官网，请复制网站链接到浏览器打开"));
            },
            children: c.jsx(S5, {
              size: 16
            })
          })]
        }), c.jsx("p", {
          children: i.kind === "account" ? x("账号登录") : (N = LBe.find(G => G.value === e.kind)) == null ? void 0 : N.label
        })]
      }), i.kind !== "account" && c.jsx("button", {
        type: "button",
        role: "switch",
        "aria-label": x("启用服务商"),
        "aria-checked": i.enabled,
        className: `api-access-switch${i.enabled ? " is-on" : ""}`,
        onClick: () => {
          const G = {
            ...i,
            enabled: !i.enabled
          };
          R({
            enabled: G.enabled
          }), a7(G);
        },
        children: c.jsx("span", {})
      })]
    }), i.kind === "account" ? c.jsx(dmr, {
      presetId: i.presetId,
      isDark: n
    }) : c.jsxs(c.Fragment, {
      children: [c.jsxs("section", {
        className: "api-access-card",
        children: [c.jsx("h4", {
          children: x("基础配置")
        }), c.jsxs("label", {
          children: [x("服务商名称"), c.jsx("input", {
            "aria-label": x("服务商名称"),
            value: i.name,
            onChange: G => R({
              name: G.target.value
            }),
            onBlur: j
          })]
        }), c.jsxs("div", {
          className: "api-access-field",
          children: [c.jsx("span", {
            children: x("服务商类型")
          }), c.jsx(vk, {
            ...E,
            label: x("服务商类型"),
            value: i.kind,
            options: LBe,
            onSelect: G => {
              const z = {
                ...i,
                kind: G,
                modelsPath: G === "gemini" ? "/v1beta/models" : G === "azure-openai" ? "/openai/v1/models" : /\/v1$/.test(i.url) ? "/models" : "/v1/models"
              };
              R({
                kind: z.kind,
                modelsPath: z.modelsPath
              }), z.kind === "custom" && k("Image"), b0e(z) || a7(z);
            }
          }), c.jsx("small", {
            children: i.kind === "custom" ? x("通过下方“粘贴接口示例”使用原来的参数配置流程，支持绘画与视频。") : x("决定新建对话模型的默认协议；已有模型保持各自的协议。")
          })]
        }), !Hk(i) && c.jsxs("label", {
          children: [x("API 密钥"), c.jsxs("small", {
            children: [x("独立域名必须填写该服务商密钥；仅同一中转地址可留空沿用全局 Key"), i.savedApiKeyId ? x("；当前沿用已保存的 Key") : ""]
          }), c.jsxs("div", {
            className: "api-access-key",
            children: [c.jsx("input", {
              "aria-label": x("服务商 API 密钥"),
              type: s ? "text" : "password",
              autoComplete: "off",
              value: i.key,
              onChange: G => R({
                key: G.target.value,
                savedApiKeyId: void 0
              }),
              onBlur: j
            }), c.jsx("button", {
              type: "button",
              "aria-label": x(s ? "隐藏密钥" : "显示密钥"),
              onClick: () => l(G => !G),
              children: s ? c.jsx($d, {
                size: 16
              }) : c.jsx(ul, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              onClick: () => void B(),
              disabled: m,
              children: x("检测")
            })]
          })]
        }), c.jsxs("label", {
          children: [x("接口地址（Base URL）"), c.jsx("input", {
            "aria-label": x("服务商接口地址"),
            value: i.url,
            onChange: G => R({
              url: G.target.value
            }),
            onBlur: j
          })]
        }), c.jsx(umr, {
          provider: i
        }), (jP(i.url) || i.localNoAuth) && c.jsxs("label", {
          className: "api-local-auth",
          children: [c.jsx("input", {
            type: "checkbox",
            checked: !!i.localNoAuth,
            onChange: G => {
              const z = {
                ...i,
                localNoAuth: G.target.checked
              };
              R({
                localNoAuth: z.localNoAuth
              }), b0e(z) || a7(z);
            }
          }), c.jsx("span", {
            children: "本机服务免密钥（不使用全局 Key）"
          })]
        }), c.jsxs("p", {
          className: "api-access-caption",
          children: [x("接口格式："), i.kind === "gemini" ? "Gemini · /v1beta/models/{model}:generateContent" : i.kind === "anthropic" ? "Anthropic · /v1/messages" : i.kind === "azure-openai" ? x("Azure OpenAI · /openai/v1/chat/completions（模型 ID 填部署名称）") : i.kind === "responses" ? "OpenAI Responses · /v1/responses" : i.kind === "custom" ? x("通用 HTTP · 路径及参数由模型配置") : "OpenAI · /v1/chat/completions"]
        }), i.kind === "azure-openai" && c.jsxs("label", {
          children: [x("Azure API 版本"), c.jsx("input", {
            "aria-label": x("Azure API 版本"),
            value: i.apiVersion || "v1",
            onChange: G => R({
              apiVersion: G.target.value
            }),
            onBlur: j
          }), c.jsx("small", {
            children: x("默认 v1；使用日期版本时按部署路径调用。")
          })]
        }), c.jsxs("details", {
          children: [c.jsx("summary", {
            children: x("模型目录设置")
          }), c.jsxs("label", {
            children: [x("模型列表路径"), c.jsx("input", {
              "aria-label": x("模型列表路径"),
              value: i.modelsPath,
              onChange: G => R({
                modelsPath: G.target.value
              }),
              onBlur: j
            })]
          }), c.jsx("small", {
            children: x("只用于获取目录。图片、视频的提交与查询路径在各模型中设置。")
          })]
        }), c.jsxs("div", {
          className: "api-access-actions",
          children: [c.jsx("button", {
            type: "button",
            onClick: j,
            children: x("保存配置")
          }), c.jsx("span", {
            children: i.enabled ? Hk(i) ? "本机服务免密钥，不使用全局 Key" : x("新模型默认使用服务商地址和密钥") : x("该服务商下的模型已停用")
          })]
        })]
      }), h && c.jsx("p", {
        className: "api-access-error",
        role: "alert",
        children: h
      }), d && c.jsx("p", {
        className: "api-access-notice",
        role: "status",
        children: d
      }), c.jsxs("section", {
        className: "api-access-card",
        children: [c.jsxs("div", {
          className: "api-access-card-heading",
          children: [c.jsxs("h4", {
            children: [x("模型 "), c.jsx("small", {
              children: t.length
            })]
          }), c.jsxs("button", {
            type: "button",
            disabled: m,
            onClick: () => {
              j() && b(!0);
            },
            children: [c.jsx(bd, {
              size: 14,
              className: m ? "animate-spin" : ""
            }), x(m ? "获取中…" : "获取模型列表")]
          })]
        }), c.jsxs("p", {
          className: "api-access-caption",
          children: [x("已保存的是模型配置，未验证生成。启用后，在画布模型列表的“自定义”中选择「"), i.name, x("」。绘画可选择 Images API、Gemini 原生生图或自定义 HTTP；仅选择 Responses 服务商类型不会改变绘画协议。")]
        }), c.jsxs("div", {
          className: "api-access-model-tools",
          children: [c.jsx(vk, {
            ...E,
            label: x("模型类别"),
            value: w,
            options: OBe,
            onSelect: G => {
              k(G);
            }
          }), c.jsxs("button", {
            type: "button",
            onClick: () => {
              if (i.kind === "custom" && w !== "Chat") {
                S({
                  ...wve(i, w, "", "http"),
                  inheritProviderConnection: !1
                });
                return;
              }
              j() && S(wve(i, w));
            },
            children: [c.jsx(eo, {
              size: 14
            }), i.kind === "custom" && w !== "Chat" ? x("粘贴接口示例") : x("手动添加模型")]
          })]
        }), c.jsx("input", {
          "aria-label": x("搜索接入模型"),
          placeholder: x("搜索模型名称或 ID"),
          value: v,
          onChange: G => _(G.target.value)
        }), c.jsx("div", {
          className: "api-access-model-list",
          children: t.filter(G => F(`${G.provider} ${G.modelName}`)).map(G => {
            var z, V;
            return c.jsxs("div", {
              className: "api-access-model",
              children: [c.jsxs("div", {
                children: [c.jsx("strong", {
                  children: G.provider
                }), c.jsxs("small", {
                  children: [x((z = OBe.find(O => O.value === G.type)) == null ? void 0 : z.label), " · ", G.modelName]
                }), c.jsxs("small", {
                  children: [G.inheritProviderConnection === !1 ? x("独立地址 / 密钥") : x("跟随服务商"), G.type === "Chat" ? ` · ${((V = G.nativeChat) == null ? void 0 : V.protocol) || (G.chatProtocol === "responses" ? "Responses" : "Chat Completions")}` : G.customProtocol ? x(" · 通用 HTTP") : ""]
                })]
              }), c.jsxs("div", {
                className: "api-access-model-buttons",
                children: [c.jsx("input", {
                  type: "checkbox",
                  "aria-label": x("启用模型 {0}", G.provider),
                  disabled: !i.enabled,
                  checked: G.providerPausedEnabled ?? G.enabled !== !1,
                  onChange: O => jJ(e.id, [{
                    ...G,
                    enabled: O.target.checked
                  }])
                }), c.jsx("button", {
                  type: "button",
                  "aria-label": x("编辑模型 {0}", G.provider),
                  title: x("编辑模型"),
                  onClick: () => S(G),
                  children: c.jsx(nw, {
                    size: 15
                  })
                }), c.jsx("button", {
                  type: "button",
                  "aria-label": x("删除模型 {0}", G.provider),
                  title: x("删除模型"),
                  onClick: () => {
                    window.confirm(x("移除模型「{0}」？画布和历史记录会保留。", G.provider)) && AFi(G.id);
                  },
                  children: c.jsx(Qo, {
                    size: 15
                  })
                })]
              })]
            }, G.id);
          })
        }), !t.length && c.jsxs("div", {
          className: "api-access-empty",
          children: [c.jsx(eo, {
            size: 24
          }), c.jsx("p", {
            children: x("获取服务商模型列表，或手动添加一个模型。")
          })]
        })]
      })]
    }), i.kind === "account" && h && c.jsx("p", {
      role: "alert",
      className: "api-access-error",
      children: h
    }), c.jsx("button", {
      type: "button",
      className: "api-access-remove",
      onClick: r,
      children: x("移除服务商")
    }), y && c.jsx(XGi, {
      provider: i,
      configs: t,
      isDark: n,
      onClose: () => b(!1),
      onManual: G => {
        b(!1), k(G), S(wve(i, G, "", i.kind === "custom" && G !== "Chat" ? "http" : void 0));
      },
      onConfigure: G => {
        b(!1), S(G);
      }
    }), A && c.jsx(RDt, {
      initial: A,
      templates: N1.filter(G => G.type === A.type && _z(G)),
      editing: t.some(G => G.id === A.id),
      isDark: n,
      connection: i,
      onClose: () => S(null),
      onSave: G => {
        jJ(e.id, [G]), S(null), u(`模型已配置，未发送生成请求。请在画布模型列表 → 自定义 → ${i.name} 中选择「${G.provider}」。`);
      }
    })]
  });
}

const iVi = Object.freeze(Object.defineProperty({
    __proto__: null,
    ApiAccessPane: rVi
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  oVi = Ia.lazy(() => Ie(() => Promise.resolve().then(() => c_o), void 0, import.meta.url).then(e => ({
    default: e.DesktopPetToolCard
  })));

class sVi extends g.Component {
  constructor() {
    super(...arguments);
    On(this, "state", {
      error: null
    });
  }
  static getDerivedStateFromError(n) {
    return {
      error: n
    };
  }
  componentDidCatch(n, r) {
    console.warn("[DesktopPetToolCard]", n, r.componentStack);
  }
  render() {
    return this.state.error ? c.jsx("p", {
      className: "text-[11px] text-amber-500",
      children: x("桌宠设置暂不可用，请刷新页面后再试。")
    }) : this.props.children;
  }
}

function lVi({
  isDark: e
}) {
  return on(), c.jsx(sVi, {
    children: c.jsx(g.Suspense, {
      fallback: null,
      children: c.jsx(oVi, {
        isDark: e
      })
    })
  });
}

const cVi = Object.freeze(Object.defineProperty({
    __proto__: null,
    DesktopPetToolCardLazy: lVi
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  dVi = 200 * 1024 * 1024,
  Ihn = 409600,
  Chn = 8295044,
  Ehn = 300,
  Thn = 6e3,
  uVi = .4,
  hVi = 2.5,
  pVi = 24,
  mVi = 60,
  fVi = {
    versionLabel: "2.5",
    maxVideos: 10,
    maxVideoDuration: 30,
    maxTotalVideoDuration: 30.2,
    maxOutputDuration: 30
  },
  gVi = {
    versionLabel: "2.0",
    maxVideos: 3,
    maxVideoDuration: 15,
    maxTotalVideoDuration: 15,
    maxOutputDuration: 15
  };

function Yfe(e) {
  if (typeof e == "number") return Number.isFinite(e) ? e : null;
  if (typeof e == "string" && e.trim()) {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}

function yVi(e) {
  const t = String(e.mimeType ?? "").trim().toLowerCase();
  if (t) return t === "video/mp4" || t === "video/quicktime";
  const n = String(e.url ?? "").trim();
  if (!n || n.startsWith("asset://")) return !0;
  try {
    const r = new URL(n, "https://seedance.invalid").pathname.toLowerCase();
    return !/\.[a-z0-9]+$/.test(r) || r.endsWith(".mp4") || r.endsWith(".mov");
  } catch {
    return !0;
  }
}

function bVi(e) {
  return e === "2.5" ? fVi : gVi;
}

function vVi(e, t) {
  const n = String(e.label || "").trim(),
    r = `第 ${t + 1} 个参考视频`;
  return n ? `${r}「${n}」` : r;
}

function wVi(e) {
  const t = e.spec,
    n = Array.isArray(e.videos) ? e.videos : [];
  if (n.length === 0) return null;
  if (n.length > t.maxVideos) return `Seedance ${t.versionLabel} 最多支持 ${t.maxVideos} 个参考视频`;
  let r = 0;
  for (let a = 0; a < n.length; a += 1) {
    const i = n[a],
      o = vVi(i, a),
      s = Yfe(i.duration);
    if (s !== null) {
      if (s < 2 || s > t.maxVideoDuration) return `${o}时长需在 2-${t.maxVideoDuration} 秒内`;
      if (t.versionLabel === "2.5" && e.mode === "edit" && a === 0 && s < 4) return "Seedance 2.5 待编辑视频时长需在 4-30 秒内";
      r += s;
    }
    if (!yVi(i)) return `${o}仅支持 MP4 或 MOV 格式`;
    const l = Yfe(i.width),
      d = Yfe(i.height);
    if (l !== null && d !== null) {
      const p = l / d,
        m = l * d;
      if (l < Ehn || l > Thn || d < Ehn || d > Thn) return `${o}的宽高需在 300-6000 像素内`;
      if (p < uVi || p > hVi) return `${o}的宽高比需在 0.4-2.5 之间`;
      if (m < Ihn || m > Chn) return `${o}的总像素需在 ${Ihn}-${Chn} 之间`;
    }
    const u = Yfe(i.fileSize);
    if (u !== null && u > dVi) return `${o}不能超过 200 MB`;
    const h = Yfe(i.fps);
    if (h !== null && (h < pVi || h > mVi)) return `${o}帧率需在 24-60 FPS 之间`;
  }
  return r > t.maxTotalVideoDuration + .001 ? `Seedance ${t.versionLabel} 的参考视频总时长不能超过 ${t.maxTotalVideoDuration} 秒` : null;
}

function RM(e) {
  return String(e || "").trim().replace(/^Asset:\/\//i, "asset://").split("?")[0].toLowerCase();
}

function ymr(e) {
  const t = Array.isArray(e.sources) ? e.sources : [],
    n = (e.resolvedUrls || []).map(s => String(s || "").trim()).filter(Boolean),
    r = new Set(),
    a = [],
    i = (...s) => {
      for (const l of s) {
        const d = RM(String(l || ""));
        d && r.add(d);
      }
    },
    o = (...s) => s.some(l => {
      const d = RM(String(l || ""));
      return !!d && r.has(d);
    });
  return n.length > 0 ? (n.forEach((s, l) => {
    const d = t[l],
      u = String((d == null ? void 0 : d.url) || "").trim();
    o(s, u) || (i(s, u), a.push({
      url: u || s,
      label: (d == null ? void 0 : d.label) || "参考视频",
      knownDurationSec: d == null ? void 0 : d.knownDurationSec,
      resolved: s
    }));
  }), a) : (t.forEach(s => {
    const l = String(s.url || "").trim();
    !l || o(l) || (i(l), a.push({
      ...s,
      url: l
    }));
  }), a);
}

async function xAt(e) {
  const {
      getVideoMetadata: t
    } = await Ie(async () => {
      const {
        getVideoMetadata: i
      } = await Promise.resolve().then(() => pg);
      return {
        getVideoMetadata: i
      };
    }, void 0, import.meta.url),
    n = ymr({
      sources: e.sources,
      resolvedUrls: e.resolvedUrls
    });
  if (n.length === 0) return;
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    let s = typeof o.knownDurationSec == "number" && Number.isFinite(o.knownDurationSec) && o.knownDurationSec > 0 ? o.knownDurationSec : NaN,
      l = typeof o.width == "number" && Number.isFinite(o.width) && o.width > 0 ? o.width : NaN,
      d = typeof o.height == "number" && Number.isFinite(o.height) && o.height > 0 ? o.height : NaN;
    if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(l) || l <= 0) for (const u of [o.url, o.resolved].filter(Boolean)) try {
      const h = await t(u);
      if (Number.isFinite(h.duration) && h.duration > 0 && (s = h.duration), Number.isFinite(h.w) && h.w > 0 && (l = h.w), Number.isFinite(h.h) && h.h > 0 && (d = h.h), Number.isFinite(s) && s > 0) break;
    } catch {}
    r.push({
      url: o.resolved || o.url,
      mimeType: o.mimeType,
      duration: Number.isFinite(s) && s > 0 ? s : null,
      width: Number.isFinite(l) && l > 0 ? l : null,
      height: Number.isFinite(d) && d > 0 ? d : null,
      fileSize: o.fileSize,
      fps: o.fps,
      label: o.label || `视频${i + 1}`
    });
  }
  const a = wVi({
    spec: bVi(e.variant),
    videos: r,
    mode: e.mode ?? (e.variant === "2.5" ? "edit" : void 0)
  });
  if (a) throw new Error(a);
}

function xVi() {
  try {
    const e = localStorage.getItem("qiaodoumayi_api_configs"),
      t = e ? JSON.parse(e) : [],
      n = Array.isArray(t) ? t.find(o => (o == null ? void 0 : o.id) === "kling-o1" || String((o == null ? void 0 : o.modelName) || "").includes("kling-video-o1")) : null,
      r = String((n == null ? void 0 : n.url) || "").trim().replace(/\/+$/, ""),
      a = String((n == null ? void 0 : n.key) || "").trim(),
      i = String(localStorage.getItem("qiaodoumayi_global_key") || "").trim();
    return {
      base: r,
      key: a || i
    };
  } catch {
    return {
      base: "",
      key: String(localStorage.getItem("qiaodoumayi_global_key") || "").trim()
    };
  }
}

function _Vi(e, t, n, r) {
  try {
    const a = /^https?:\/\//i.test(t) ? t : `https://${t}`,
      i = new URL(a).origin;
    if (new URL(e).origin === i) return n || r;
  } catch {}
  return r;
}

function YP(e) {
  try {
    const t = new URL(e);
    return t.hostname.includes("art.huya.info") && /\/files\/[^/]+\/content$/i.test(t.pathname);
  } catch {
    return !1;
  }
}

function kVi(e) {
  const t = [],
    n = (r, a) => {
      if (!(a > 10 || r == null)) {
        if (typeof r == "string") {
          /^https?:\/\//i.test(r) && r.length < 4096 && t.push(r.trim());
          return;
        }
        Array.isArray(r) ? r.forEach(i => n(i, a + 1)) : typeof r == "object" && Object.values(r).forEach(i => n(i, a + 1));
      }
    };
  return n(e, 0), [...new Set(t)];
}

function bmr(e, t, n, r) {
  const a = String(t || "").trim();
  if (/^https?:\/\//i.test(a) && a.length < 4096) return a;
  const i = [],
    o = (u, h) => {
      if (!(h > 10 || u == null)) {
        if (typeof u == "string") {
          /^https?:\/\//i.test(u) && u.length < 4096 && i.push(u);
          return;
        }
        if (Array.isArray(u)) {
          u.forEach(p => o(p, h + 1));
          return;
        }
        typeof u == "object" && Object.values(u).forEach(p => o(p, h + 1));
      }
    };
  if (o(e, 0), i.length > 0) return i[0];
  const s = e,
    l = s == null ? void 0 : s.data,
    d = (s == null ? void 0 : s.id) || (l == null ? void 0 : l.id) || (s == null ? void 0 : s.file_id) || (l == null ? void 0 : l.file_id);
  if (d && typeof d == "string" && d.length > 0 && !d.startsWith("http")) {
    const h = n.replace(/\/+$/, "").replace(/\/workflow\/upload\/file$/i, "").replace(/\/files$/i, "").replace(/\/v1\/files$/i, "").replace(/\/seedance\/v1\/files$/i, "").replace(/\/seedance\/v3\/files$/i, ""),
      p = Array.from(new Set([h, r.replace(/\/+$/, "")])).filter(Boolean),
      m = encodeURIComponent(d);
    for (const f of p) return /\/openapi\/v1$/i.test(f) || f.includes("art.huya.info") ? `${f}/files/${m}/content` : `${f}/v1/files/${m}/content`;
  }
  return null;
}

async function AVi(e, t, n) {
  const {
      base: r,
      key: a
    } = xVi(),
    i = String(t || "").replace(/\/+$/, ""),
    o = i.includes("art.huya.info"),
    s = Array.from(new Set([...(o ? kZ(i) : []), `${i}/v1/files`, `${i}/files`, `${i}/seedance/v1/files`, `${i}/seedance/v3/files`, ...(r ? [`${r}/v1/files`] : [])].filter(Boolean))),
    l = ["file", "image"];
  let d = "";
  for (const u of s) for (const h of l) try {
    const p = new FormData();
    p.append(h, e);
    const m = _Vi(u, t, n, a),
      f = await $i(u, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${m}`
        },
        body: p
      }),
      y = await f.text();
    if (!f.ok) {
      d = `${u} (${h}) -> HTTP ${f.status}: ${y.slice(0, 200)}`;
      continue;
    }
    let b = {};
    try {
      b = y ? JSON.parse(y) : {};
    } catch {
      b = {};
    }
    const v = bmr(b, y, u, i);
    if (v) return v;
    d = `${u} (${h}) -> 响应缺少可用 URL`;
  } catch (p) {
    d = `${u} (${h}) -> ${(p == null ? void 0 : p.message) || "upload failed"}`;
  }
  throw new Error(d || "素材上传失败：无可用 /v1/files 端点");
}

async function _At(e, t, n, r, a) {
  let i = String(e || "").trim();
  if (!i) throw new Error("图片地址为空");
  if (i.startsWith("Asset://") || i.startsWith("asset://")) return i.replace(/^Asset:\/\//, "asset://");
  const o = EU(t);
  if (ei()) {
    if (/^https?:\/\//i.test(i) && !YP(i)) return i;
    try {
      const {
          prepareAssetForModel: p,
          toTemporaryPublicUrlString: m
        } = await Ie(async () => {
          const {
            prepareAssetForModel: b,
            toTemporaryPublicUrlString: v
          } = await Promise.resolve().then(() => up);
          return {
            prepareAssetForModel: b,
            toTemporaryPublicUrlString: v
          };
        }, void 0, import.meta.url),
        f = await p({
          assetRef: i,
          modelId: "seedance-1-5-pro-huya-volc",
          purpose: "image-reference",
          requestedTransportMode: "temporary-oss",
          assetId: a == null ? void 0 : a.assetId,
          assetIdHints: a == null ? void 0 : a.assetIdHints,
          sourceNode: a == null ? void 0 : a.sourceNode,
          nodes: a == null ? void 0 : a.nodes
        }),
        y = dAe(o, void 0);
      return await m({
        prepared: f,
        openApiRoot: o,
        bearerToken: n,
        uploadCandidates: y == null ? void 0 : y.uploadCandidates,
        forceOpenApiFileUpload: y == null ? void 0 : y.forceOpenApiFileUpload,
        passThroughPublicHttps: !0,
        fileName: "huya-seedance-i2v"
      });
    } catch (p) {
      return console.warn("[Huya Seedance I2V] Phase3-A 临时 URL 失败，回退旧链路:", p), v$(i, o, n, async f => zU(f, a), dAe(o, void 0));
    }
  }
  if (/^https?:\/\//i.test(i)) return i;
  const s = String((await r(i)) || "").trim();
  if (/^https?:\/\//i.test(s)) return s;
  const l = s.startsWith("data:") ? await (await fetch(s)).blob() : await Ns(s),
    d = l.type || "image/jpeg";
  let u = "jpg";
  d.includes("png") ? u = "png" : d.includes("webp") ? u = "webp" : d.includes("bmp") ? u = "bmp" : d.includes("tiff") && (u = "tiff");
  const h = new File([l], `huya-seedance-i2v.${u}`, {
    type: d
  });
  return await AVi(h, t, n);
}

async function qje(e, t, n, r) {
  const a = String(e || "").trim(),
    i = {
      ...(r || {}),
      assetId: t || (r == null ? void 0 : r.assetId),
      assetIdHints: [...((r == null ? void 0 : r.assetIdHints) || []), ...(t ? [t] : [])]
    };
  try {
    return await zU(a, i);
  } catch (o) {
    console.warn("[Huya SD2.0] resolveOriginalImageBlobForGenApi failed, try processImageForVideo:", o);
  }
  try {
    const o = String((await n(a)) || "").trim();
    if (o.startsWith("data:")) {
      const s = await (await fetch(o)).blob();
      if (s.size > 0) return s;
    }
    if (/^https?:\/\//i.test(o)) {
      const s = Go(o);
      return Ns(s || o, {
        compressForApi: !1
      });
    }
  } catch (o) {
    console.warn("[Huya SD2.0] processImageForVideo fallback failed:", o);
  }
  throw new Error("无法从本地缓存读取参考图原图（可能只有 256px 缩略图）。请确认资源缓存目录已恢复，或重新连线/导入素材后再生成。");
}

async function SVi(e) {
  const t = await (async () => {
    try {
      if (typeof createImageBitmap == "function") {
        const i = await createImageBitmap(e),
          o = Math.max(i.width, i.height);
        return i.close(), o;
      }
    } catch {}
    return null;
  })();
  if (t != null && t < 300) throw new Error(`上传 OSS 被拒绝：参考图仅 ${t}px 宽/高，火山要求至少 300px。请确认本地缓存中有原图。`);
  const n = e.type || "image/jpeg";
  let r = "jpg";
  n.includes("png") ? r = "png" : n.includes("webp") ? r = "webp" : n.includes("gif") && (r = "gif");
  const a = new File([e], `huya-sd20-ref-${Date.now()}.${r}`, {
    type: n
  });
  return fz(a);
}

async function IVi(e, t, n, r, a) {
  let i = String(e || "").trim();
  if (!i) throw new Error("参考图为空");
  if (/^https?:\/\//i.test(i)) {
    const d = Go(i);
    if (d && d !== i && RR(d) && /\/images\//i.test(d)) return d;
    if (RR(i) && /\/images\//i.test(i)) return i;
  }
  const o = !!(a != null && a.useAliyunOss) || YP(i) || /^https?:\/\//i.test(i) && /aliyuncs\.com/i.test(i),
    s = async d => {
      const u = await SVi(d);
      if (RR(u)) return u;
      const h = await y$e(d, "huya-sd20-ref");
      return XP(h, t, n, {
        uploadCandidates: Uj(t)
      });
    };
  if (o) {
    const d = await qje(i, a == null ? void 0 : a.cacheAssetId, r, a == null ? void 0 : a.genApiResolve);
    return s(d);
  }
  if (/^https?:\/\//i.test(i)) {
    if (/\/thumbnails\//i.test(i)) {
      const u = await qje(i, a == null ? void 0 : a.cacheAssetId, r, a == null ? void 0 : a.genApiResolve);
      return s(u);
    }
    const d = Go(i);
    if (d && d !== i) {
      if (RR(d)) return d;
      i = d;
    }
    if (RR(i) && /\/images\//i.test(i)) return i;
    if (YP(i) || !RR(i)) {
      const u = await Ns(i),
        h = await y$e(u, "huya-sd20-ref");
      return XP(h, t, n, {
        uploadCandidates: Uj(t)
      });
    }
    return i;
  }
  if (i && !i.includes("/") && /\.(jpe?g|png|webp|gif|bmp)$/i.test(i)) throw new Error(`素材「${i}」不是 HTTP URL。请在「设置 → 画布功能 → 图床」配置阿里云 OSS 后重新生成，本地图会自动上传。`);
  const l = await qje(i, a == null ? void 0 : a.cacheAssetId, r, a == null ? void 0 : a.genApiResolve);
  return s(l);
}

async function vmr(e) {
  var d;
  const t = [],
    n = [],
    r = [],
    a = {
      useAliyunOss: !!e.useAliyunOss
    },
    i = (u, h) => {
      var f;
      if (!((f = e.nodes) != null && f.length)) return u ? {
        assetId: u,
        assetIdHints: [u]
      } : void 0;
      const p = h && e.targetNodeId ? j2e(h, e.targetNodeId, e.connections, e.nodes) : null,
        m = [...(u ? [u] : []), ...Q7(p)].filter((y, b, v) => y && v.indexOf(y) === b);
      return {
        assetId: m[0],
        assetIdHints: m,
        sourceNode: p,
        nodes: e.nodes
      };
    },
    o = async (u, h, p) => {
      const m = i(h, p);
      if (ei()) {
        const y = await v$(u, e.openApiRoot, e.apiKey, async b => qje(b, h, e.processImageForVideo, m), dAe(e.openApiRoot, void 0));
        y && t.push(y);
        return;
      }
      const f = await IVi(u, e.openApiRoot, e.apiKey, e.processImageForVideo, {
        ...a,
        cacheAssetId: h,
        genApiResolve: m
      });
      f && t.push(f);
    },
    s = async u => {
      const h = new Set(n.map(p => RM(p)));
      for (const p of u) {
        if (!p) continue;
        const m = await Uye(p, "video", e.openApiRoot, e.apiKey),
          f = RM(m);
        h.has(f) || (h.add(f), n.push(m));
      }
    },
    l = async u => {
      for (const h of u) h && r.push(await Uye(h, "audio", e.openApiRoot, e.apiKey));
    };
  if (e.startFrame && e.endFrame) return await o(e.startFrame, void 0), await o(e.endFrame, void 0), await s(e.videoRefs), await l(e.audioRefs), {
    images: t,
    video: n,
    audio: r,
    roleMode: "frame"
  };
  if ((d = e.materials) != null && d.length) {
    for (const p of e.materials) {
      const m = p.type === "image" ? String(p.url || "").trim() || String(p.assetUrl || "").trim() : p.url;
      if (p.type === "image") {
        if (!m) throw new Error("多素材图生需要每条素材带有可读取的 url（本地/blob/公网）；仅有 Asset:// 时请先换用预览图链或重新上传。");
        await o(m, p._cacheAssetId, p.id);
      } else if (p.type === "video") {
        const f = await Uye(m, "video", e.openApiRoot, e.apiKey, {
            useAliyunOss: e.useAliyunOss,
            cacheAssetId: p._cacheAssetId
          }),
          y = RM(f);
        n.some(b => RM(b) === y) || n.push(f);
      } else p.type === "audio" && r.push(await Uye(m, "audio", e.openApiRoot, e.apiKey));
    }
    await s(e.videoRefs), await l(e.audioRefs);
    const h = e.materials.filter(p => p.type === "image").length === 2 && t.length === 2 && n.length === 0 && r.length === 0 ? "frame" : "reference";
    return {
      images: t,
      video: n,
      audio: r,
      roleMode: h
    };
  }
  e.startFrame && (await o(e.startFrame, void 0));
  for (const u of e.refImages) u && (await o(u, void 0));
  return await s(e.videoRefs), await l(e.audioRefs), {
    images: t,
    video: n,
    audio: r,
    roleMode: "reference"
  };
}

function CVi(e, t) {
  if (e && typeof e == "object") {
    const r = e.data,
      a = typeof (r == null ? void 0 : r.url) == "string" ? r.url.trim() : "";
    if (/^https?:\/\//i.test(a)) return a;
    const i = typeof (r == null ? void 0 : r.filename) == "string" ? r.filename.trim() : "";
    if (i) return i;
    const o = typeof e.url == "string" ? String(e.url).trim() : "";
    if (e.success === !0 && /^https?:\/\//i.test(o)) return o;
  }
  const n = String(t || "").trim();
  return /^https?:\/\//i.test(n) && n.length < 4096 ? n : null;
}

function EVi(e) {
  return String(e || "").trim().replace(/^Bearer\s+/i, "");
}

function wmr(e, t = "") {
  const n = String(t || "").trim(),
    a = [...kVi(e), ...(/^https?:\/\//i.test(n) && n.length < 4096 ? [n] : [])].filter(i => i && !YP(i));
  return a.find(i => /art-oss-cdn\.huya\.cn/i.test(i)) || a.find(i => /aliyuncs\.com/i.test(i) && /haiyi/i.test(i)) || null;
}

async function XP(e, t, n, r) {
  var u;
  const a = EVi(n);
  if (!a) throw new Error("缺少海艺 API Token（格式 AI-xxx），无法上传参考素材");
  /^AI-/i.test(a) || console.warn("[Huya Upload] API Key 非 AI- 开头，若持续 403 请在模型配置中填写海艺 OpenAPI Token");
  const i = String(t || "").trim().replace(/\/+$/, "");
  if (!i) throw new Error("缺少海艺 OpenAPI 根地址");
  const o = (u = r == null ? void 0 : r.uploadCandidates) != null && u.length ? r.uploadCandidates : kZ(i);
  if (!o.length) throw new Error("缺少海艺上传地址");
  const s = new FormData();
  s.append("file", e, e.name || `huya-upload-${Date.now()}`);
  let l = "";
  for (const h of o) try {
    const p = await $i(h, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${a}`
        },
        body: s
      }),
      m = await p.text();
    if (!p.ok) {
      const v = m.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
      if (l = `HTTP ${p.status} @ ${h}${v ? `：${v}` : ""}`, p.status === 403 || p.status === 404) continue;
      throw new Error(`海艺素材上传失败 ${l}`);
    }
    let f = {};
    try {
      f = m ? JSON.parse(m) : {};
    } catch {
      f = {};
    }
    if (r != null && r.requireMiniMaxFetchable) {
      const v = wmr(f, m);
      if (v) return v;
      l = `${h} 未返回 MiniMax 可拉取的海艺公网地址`;
      continue;
    }
    const y = bmr(f, m, h, i);
    if (y) return Kft(y, i);
    const b = CVi(f, m);
    if (b) return Kft(b, i);
    l = `${h} 响应缺少 url 或 data.filename`;
  } catch (p) {
    const m = (p == null ? void 0 : p.message) || String(p);
    if (m.includes("海艺素材上传失败")) throw p;
    l = `${h} -> ${m}`;
  }
  const d = l.includes("403") || l.includes("401") ? "请确认模型配置中的 API Key 为海艺 OpenAPI Token（AI-xxx），并在设置里用「测试连接」验证。" : "";
  throw new Error(`海艺素材上传失败：${l || "无可用上传端点"}${d ? ` ${d}` : ""}`);
}

function xmr(e) {
  return RR(e);
}

function nZe(e, t) {
  let r = (e.type || "").trim(),
    a;
  t === "video" ? ((!r || r === "application/octet-stream") && (r = "video/mp4"), r.includes("quicktime") || r.includes("mov") ? a = "mov" : r.includes("webm") ? a = "webm" : a = "mp4") : ((!r || r === "application/octet-stream") && (r = "audio/mpeg"), r.includes("wav") ? a = "wav" : r.includes("mp4") || r.includes("m4a") || r.includes("x-m4a") ? a = "m4a" : a = "mp3");
  const i = `huya-seedance20-${t}-${Date.now()}.${a}`;
  return new File([e], i, {
    type: r
  });
}

function TVi(e) {
  return xmr(e);
}

async function y$e(e, t = "huya-i2i-ref") {
  const n = e.type || "image/jpeg";
  let r = "jpg";
  return n.includes("png") ? r = "png" : n.includes("webp") ? r = "webp" : n.includes("gif") && (r = "gif"), new File([e], `${t}-${Date.now()}.${r}`, {
    type: n || "image/jpeg"
  });
}

function dAe(e, t) {
  if (Up(t) || $S(t) || mk(t) || Iu(t) || z5(t)) return {
    uploadCandidates: Uj(e),
    forceOpenApiFileUpload: !0
  };
  const n = kZ(e);
  return n.length ? {
    uploadCandidates: n
  } : void 0;
}

function _mr(e) {
  const t = String(e || "").trim();
  return t ? /\/thumbnails\//i.test(t) || /-list\.webp(?:$|\?)/i.test(t) || /preview_\d+/i.test(t) : !1;
}

function MVi(e) {
  const t = String(e || "").trim();
  return !t || !/^https?:\/\//i.test(t) || YP(t) ? !1 : /art-oss-cdn\.huya\.cn/i.test(t) || /aliyuncs\.com/i.test(t) && /haiyi/i.test(t) || /art\.huya\.info/i.test(t) && !/\/files\/[^/]+\/content$/i.test(t);
}

function kAt(e) {
  const t = String(e || "").trim();
  return !t || !/^https?:\/\//i.test(t) || YP(t) || _mr(t) ? !1 : MVi(t);
}

async function FA(e, t, n, r) {
  let a = String(e || "").trim();
  if (!a) throw new Error(r === "video" ? "参考视频为空" : r === "audio" ? "参考音频为空" : "参考图为空");
  if ((a.startsWith("Asset://") || a.startsWith("asset://")) && (a = a.replace(/^Asset:\/\//, "asset://")), r === "image" && /^https?:\/\//i.test(a)) {
    const l = ECt(a);
    if (l) a = l;else {
      const d = Go(a);
      d && (a = d);
    }
    a = ya(a) || a;
  }
  if (r === "video" && (a.startsWith("http://") || a.startsWith("https://")) && (a = await N2e(a)), /^https?:\/\//i.test(a) && kAt(a)) return a;
  console.log("[Huya MiniMax-H3] rehost media → 海艺 OSS", {
    mediaType: r,
    from: a.slice(0, 180)
  });
  const i = a.startsWith("data:") ? await (await fetch(a)).blob() : await Ns(a);
  if (!i || i.size === 0) throw new Error(r === "video" ? "参考视频下载失败，无法转存海艺" : r === "audio" ? "参考音频下载失败，无法转存海艺" : "参考图下载失败，无法转存海艺");
  r === "image" && _mr(a) && i.size < 8e4 && console.warn("[Huya MiniMax-H3] 参考图疑似列表缩略图，已转存海艺；若仍 1013 请改用素材原图连线", a.slice(0, 160));
  const o = r === "video" || r === "audio" ? nZe(i, r) : await y$e(i, "huya-minimax-h3-ref"),
    s = await XP(o, t, n, {
      uploadCandidates: Uj(t)
    });
  return console.log("[Huya MiniMax-H3] rehost ok", {
    to: String(s || "").slice(0, 180)
  }), s;
}

async function kmr(e, t, n) {
  let r = String(e || "").trim();
  if (!r) throw new Error("参考音频为空");
  if ((r.startsWith("Asset://") || r.startsWith("asset://")) && (r = r.replace(/^Asset:\/\//, "asset://")), /^https?:\/\//i.test(r) && kAt(r)) return r;
  const a = r.startsWith("data:") ? await (await fetch(r)).blob() : await Ns(r);
  if (!a || a.size === 0) throw new Error("参考音频读取失败，无法转存海艺");
  const i = nZe(a, "audio"),
    o = fhe(t);
  if (!o) throw new Error("缺少海艺上传地址");
  const s = await XP(i, t, n, {
    uploadCandidates: [o],
    requireMiniMaxFetchable: !0
  });
  if (!kAt(s)) throw new Error("音色源没有换成海艺公网地址，MiniMax 拉不到文件，克隆会一直等待");
  return s;
}

async function Amr(e, t, n, r) {
  let a = String(e || "").trim();
  if (!a) throw new Error(r === "audio" ? "参考音频为空" : "参考图为空");
  if ((a.startsWith("Asset://") || a.startsWith("asset://")) && (a = a.replace(/^Asset:\/\//, "asset://")), /^https?:\/\//i.test(a) && !YP(a)) {
    const l = Go(a) || a;
    if (nr(l)) {
      if (!/\/thumbnails\//i.test(l)) return ya(l) || l;
    } else return l;
  }
  if (r === "image") return v$(a, t, n, void 0, {
    forceOpenApiFileUpload: !0,
    uploadCandidates: Uj(t)
  });
  const i = a.startsWith("data:") ? await (await fetch(a)).blob() : await Ns(a),
    o = nZe(i, "audio");
  return XP(o, t, n, {
    uploadCandidates: Uj(t)
  });
}

async function v$(e, t, n, r, a) {
  let i = String(e || "").trim();
  if (!i) throw new Error("参考图为空");
  (i.startsWith("Asset://") || i.startsWith("asset://")) && (i = i.replace(/^Asset:\/\//, "asset://"));
  const o = (a == null ? void 0 : a.forceOpenApiFileUpload) === !0;
  if (/^https?:\/\//i.test(i) && !o) return TVi(i), i;
  let s;
  i.startsWith("data:") ? s = await (await fetch(i)).blob() : r ? s = await r(i) : s = await Ns(i);
  const l = await y$e(s);
  return XP(l, t, n, {
    uploadCandidates: a == null ? void 0 : a.uploadCandidates
  });
}

async function Uye(e, t, n, r, a) {
  let i = String(e || "").trim();
  if (!i) return i;
  if (i.startsWith("Asset://") || i.startsWith("asset://")) return i.replace(/^Asset:\/\//, "asset://");
  if (t === "video" && (i.startsWith("http://") || i.startsWith("https://")) && (i = await N2e(i)), (i.startsWith("http://") || i.startsWith("https://")) && xmr(i)) return i;
  if (i && !i.includes("/") && /\.(mp4|mov|webm|wav|mp3|m4a|jpe?g|png|webp|gif)$/i.test(i)) throw new Error(`素材「${i}」不是 HTTP URL。请在「设置 → 画布功能 → 图床」配置阿里云 OSS，本地素材将自动上传后再提交。`);
  const o = async l => {
    if (!l || l.size === 0) throw new Error(t === "video" ? "参考视频下载失败，无法转存海艺（火山无法拉取该图床域名）" : "参考音频下载失败，无法转存海艺（火山无法拉取该图床域名）");
    const d = nZe(l, t),
      u = await XP(d, n, r, {
        uploadCandidates: Uj(n)
      });
    return console.log("[Huya Seedance] rehost media → 海艺 OSS", {
      mediaType: t,
      from: i.slice(0, 160),
      to: String(u || "").slice(0, 160)
    }), u;
  };
  if (a != null && a.useAliyunOss && (i.startsWith("blob:") || i.startsWith("data:") || i.startsWith("content_ref:") || a.cacheAssetId || /aliyuncs\.com/i.test(i))) {
    const {
      assetStore: l
    } = await Ie(async () => {
      const {
        assetStore: u
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: u
      };
    }, void 0, import.meta.url);
    let d = null;
    return a.cacheAssetId && (d = await l.getAssetBlob(a.cacheAssetId)), (!d || d.size === 0) && (d = await Ns(i)), o(d);
  }
  if ((i.startsWith("http://") || i.startsWith("https://")) && YP(i)) {
    const l = await Ns(i);
    return o(l);
  }
  const s = i.startsWith("data:") ? await (await fetch(i)).blob() : await Ns(i);
  return o(s);
}

const Q1e = Object.freeze(Object.defineProperty({
  __proto__: null,
  assertHuyaSeedanceReferenceVideoDurationLimits: xAt,
  buildHuyaSeedance20Image2VideoMedia: vmr,
  collectUniqueSeedanceRefVideoDurationSources: ymr,
  ensureHuyaArtImageReferenceHttpUrl: v$,
  ensureHuyaMiniMaxH3MediaHttpUrl: FA,
  ensureHuyaMinimaxCloneSourceHttpUrl: kmr,
  ensureHuyaSeedAudioReferenceHttpUrl: Amr,
  ensureHuyaSeedance1510ProI2VImageHttpUrl: _At,
  isHuyaAuthGatedFilesContentUrl: YP,
  normalizeVideoUrlKey: RM,
  pickHaiyiMiniMaxFetchableUrl: wmr,
  resolveHuyaArtReferenceUploadOpts: dAe,
  resolveHuyaVolc20ReferenceMediaUrl: Uye,
  uploadHuyaArtOpenApiFileToPublicUrl: XP
}, Symbol.toStringTag, {
  value: "Module"
}));

function Smr(e) {
  return String(e || "").trim().replace(/^Bearer\s+/i, "");
}

function PVi(e) {
  const t = e.task_id ?? e.taskId ?? (e.data && typeof e.data == "object" ? e.data.task_id || e.data.taskId : void 0);
  return t != null ? String(t) : "";
}

function jzt(e, t) {
  const n = e.match(/"element_id"\s*:\s*"(\d+)"/) || e.match(/"element_id"\s*:\s*(\d+)/) || e.match(/"elementId"\s*:\s*"(\d+)"/) || e.match(/"elementId"\s*:\s*(\d+)/) || e.match(/"id"\s*:\s*"(\d{10,})"/);
  if (n != null && n[1]) return n[1];
  const r = i => {
      if (!i || typeof i != "object") return "";
      const o = i,
        s = o.element_id ?? o.elementId ?? o.id ?? o.resource_id;
      return s != null && String(s).trim() ? String(s).trim() : "";
    },
    a = r(t);
  if (a) return a;
  if (Array.isArray(t.results)) for (const i of t.results) {
    const o = r(i);
    if (o) return o;
  }
  if (t.data && typeof t.data == "object") {
    const i = r(t.data);
    if (i) return i;
    const o = t.data.results;
    if (Array.isArray(o)) for (const s of o) {
      const l = r(s);
      if (l) return l;
    }
  }
  return "";
}

function Imr(e) {
  var r;
  const t = {
      ElementDescription: String(e.description || "").trim().slice(0, 100),
      ReferenceType: e.referenceType
    },
    n = String(e.name || "").trim();
  if (n && (t.name = n.slice(0, 20)), e.referenceType === "image_refer") {
    const a = (e.imageUrls || []).map(i => String(i || "").trim()).filter(Boolean).slice(0, 4);
    a.length && (t.ElementImageList = a);
  } else e.videoUrl && (t.ElementVideoList = String(e.videoUrl).trim());
  return (r = e.tagList) != null && r.length && (t.TagList = e.tagList.map(String).slice(0, 5)), {
    model: {
      provider: R7n,
      model: N7n,
      type: j7n
    },
    parameters: t
  };
}

async function RVi(e) {
  const t = Smr(e.bearerToken);
  if (!t) return {
    ok: !1,
    errorMsg: "请先配置虎牙海艺 OpenAPI Token（AI-xxx）"
  };
  const n = String(e.openApiRoot || "").trim().replace(/\/+$/, "") || b3(e.configUrl || "") || "https://art.huya.info/openapi/v1",
    r = L7n(e.configUrl || `${n}/generate/resource`),
    a = [];
  for (const s of e.imageUrls || []) a.push(await FA(s, n, t, "image"));
  let i = "";
  e.videoUrl && (i = await FA(e.videoUrl, n, t, "video"));
  const o = Imr({
    name: e.name,
    description: e.description,
    referenceType: e.referenceType,
    imageUrls: a,
    videoUrl: i || void 0,
    tagList: e.tagList
  });
  try {
    const s = await $i(r, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${t}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(o)
      }),
      l = await s.text();
    let d = {};
    try {
      d = l ? JSON.parse(l) : {};
    } catch {
      d = {
        message: l.slice(0, 200)
      };
    }
    if (!s.ok) return {
      ok: !1,
      errorMsg: String(d.message || d.error || l || `HTTP ${s.status}`).slice(0, 240),
      raw: d
    };
    const u = PVi(d);
    if (!u) {
      const h = jzt(l, d);
      return h ? {
        ok: !0,
        elementId: h,
        raw: d
      } : {
        ok: !1,
        errorMsg: "海艺未返回 task_id",
        raw: d
      };
    }
    return Cmr({
      openApiRoot: n,
      bearerToken: t,
      taskId: u
    });
  } catch (s) {
    return {
      ok: !1,
      errorMsg: s instanceof Error ? s.message : String(s)
    };
  }
}

async function Cmr(e) {
  const t = String(e.openApiRoot).trim().replace(/\/+$/, ""),
    n = Smr(e.bearerToken),
    r = String(e.taskId || "").trim(),
    a = e.maxAttempts ?? 60,
    i = e.intervalMs ?? ES,
    o = `${t}/generate/result/${encodeURIComponent(r)}`;
  for (let s = 0; s < a; s++) {
    try {
      const d = await (await $i(o, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${n}`
        }
      })).text();
      let u = {};
      try {
        u = d ? JSON.parse(d) : {};
      } catch {
        u = {
          message: d.slice(0, 200)
        };
      }
      const h = cE(u);
      if (E1(u, h)) return {
        ok: !1,
        taskId: r,
        errorMsg: hd(u) || "主体创建失败",
        raw: u
      };
      if (Kj(h) || h === "success") {
        const p = jzt(d, u);
        return p ? {
          ok: !0,
          elementId: p,
          taskId: r,
          raw: u
        } : {
          ok: !1,
          taskId: r,
          errorMsg: "主体创建成功但未返回 element_id",
          raw: u
        };
      }
    } catch {}
    await new Promise(l => setTimeout(l, i));
  }
  return {
    ok: !1,
    taskId: r,
    errorMsg: "主体创建轮询超时"
  };
}

function NVi(e) {
  const t = String(e || "").trim();
  return {
    人物: "o_102",
    动物: "o_103",
    物品: "o_104",
    道具: "o_104",
    服饰: "o_105",
    建筑: "o_106",
    场景: "o_106",
    特效: "o_107",
    其他: "o_108",
    热梗: "o_101"
  }[t];
}

const jVi = Object.freeze(Object.defineProperty({
  __proto__: null,
  buildHuyaKlingElementCreatePayload: Imr,
  extractHuyaKlingElementIdFromPoll: jzt,
  mapHuyaKlingSubjectTypeToTagId: NVi,
  pollHuyaKlingElementCreateResult: Cmr,
  submitHuyaKlingElementCreate: RVi
}, Symbol.toStringTag, {
  value: "Module"
}));

async function Dzt(e) {
  return gCe(e);
}

async function DVi(e) {
  if (!us()) return null;
  try {
    const t = await Au(e.path),
      n = sCe(e.name);
    return new File([t], e.name, {
      type: n
    });
  } catch (t) {
    return console.warn("[materialLibraryCanvasResolve] 读取本地文件失败:", e.path, t), null;
  }
}

async function LVi(e) {
  if (!ua() || !us()) return null;
  const t = await DVi(e);
  if (!t) return null;
  try {
    const n = await _P(t);
    return O9r(e.path, {
      remoteUrl: n.remoteUrl,
      displayUrl: n.displayUrl,
      updatedAt: Date.now()
    }), n;
  } catch (n) {
    return console.warn("[materialLibraryCanvasResolve] 上传全局 OSS 失败:", e.path, n), null;
  }
}

function Kst(e, t) {
  const n = Hv(e, t);
  return {
    content: n.content || e.displayUrl,
    settingsExtras: n.settings || t
  };
}

function AAt(e) {
  const t = String(e || "").trim();
  return !t || /\/thumbnails\//i.test(t) ? t : /\/images\//i.test(t) ? t.replace(/\/images\//i, "/thumbnails/") : t;
}

function b$e(e) {
  const t = String(e || "").trim();
  return !t || !nr(t) ? t : Vg(t);
}

async function Wde(e) {
  const t = QIt(e.path);
  if (t) return b$e(t);
  const n = UCt(e.path);
  return n != null && n.remoteUrl && nr(n.remoteUrl) ? b$e(ya(n.remoteUrl)) : null;
}

async function v$e(e, t) {
  const n = EIn(e.path);
  if (n && /\/thumbnails\//i.test(n)) return n;
  const r = UCt(e.path);
  if (r != null && r.displayUrl && nr(r.displayUrl)) return r.displayUrl;
  const a = t ?? (await Wde(e));
  return a ? AAt(a) : n || a;
}

async function Lzt(e) {
  const t = await Dzt(e.path);
  let n = null;
  if (t) try {
    e.kind === "image" ? n = await Otr(e) : (e.kind === "video" || e.kind === "audio") && (n = await lD(e), n != null && n.startsWith("blob:") && ij(n));
  } catch (o) {
    console.warn("[materialLibraryCanvasResolve] 预览本地读取失败:", o);
  }
  let r = null;
  if (e.kind === "image") {
    const o = await Wde(e),
      s = await v$e(e, o);
    r = s ? ya(s) : null;
  } else {
    const o = await Wde(e);
    r = o ? ya(o) : null;
  }
  return {
    primary: n ?? r,
    fallback: n && r && n !== r ? r : null
  };
}

async function Emr(e) {
  if (e.kind === "image") {
    const {
      primary: t
    } = await Lzt(e);
    return t;
  }
  return Ozt(e);
}

async function OVi(e) {
  if (e.kind !== "image") return Ozt(e);
  if (await Dzt(e.path)) try {
    const r = await lD(e);
    return r != null && r.startsWith("blob:") && ij(r), r;
  } catch (r) {
    console.warn("[materialLibraryCanvasResolve] 原图本地读取失败:", r);
  }
  const n = await Wde(e);
  return n ? ya(n) : null;
}

async function Ozt(e) {
  const {
    primary: t
  } = await Lzt(e);
  return t;
}

async function BVi(e) {
  const t = e.kind === "video" ? "video" : e.kind === "audio" ? "audio" : "image",
    n = {
      _materialLibraryPath: e.path,
      mediaType: t
    },
    r = await Dzt(e.path),
    a = e.kind === "image" || e.kind === "video" || e.kind === "audio" ? await Wde(e) : null;
  if (a && nr(a)) {
    const o = b$e(a),
      s = await v$e(e, o),
      l = s && nr(s) ? s : e.kind === "image" ? AAt(o) : o;
    return Kst({
      remoteUrl: o,
      displayUrl: l,
      mediaType: t
    }, n);
  }
  const i = UCt(e.path);
  if (i && nr(i.remoteUrl)) {
    const o = b$e(i.remoteUrl),
      s = i.displayUrl || (await v$e(e, o)) || AAt(o);
    return Kst({
      remoteUrl: o,
      displayUrl: s,
      mediaType: t
    }, n);
  }
  if (ua() && r) {
    const o = await LVi(e);
    if (o) return Kst(o, n);
  }
  if (r) try {
    if (e.kind === "image") {
      const s = await Emr(e),
        l = await lD(e);
      l != null && l.startsWith("blob:") && ij(l);
      const d = {
        ...n,
        _blobUrl: l
      };
      if (!s && !l) throw new Error("empty local image");
      return {
        content: s || l,
        settingsExtras: d
      };
    }
    const o = await lD(e);
    return o != null && o.startsWith("blob:") && ij(o), {
      content: o,
      settingsExtras: {
        ...n,
        _blobUrl: o
      }
    };
  } catch (o) {
    console.warn("[materialLibraryCanvasResolve] 本地读取失败，尝试 OSS:", o);
  }
  return null;
}

const U1 = Object.freeze(Object.defineProperty({
  __proto__: null,
  getMaterialLibraryRemoteOriginalUrl: Wde,
  getMaterialLibraryRemoteThumbUrl: v$e,
  resolveMaterialLibraryAssetForCanvas: BVi,
  resolveMaterialLibraryOriginalPreviewUrl: OVi,
  resolveMaterialLibraryPreviewCandidates: Lzt,
  resolveMaterialLibraryPreviewUrl: Ozt,
  resolveMaterialLibraryThumbPreviewUrl: Emr
}, Symbol.toStringTag, {
  value: "Module"
}));

var XMe = {},
  Qst,
  Mhn;

function jf() {
  if (Mhn) return Qst;
  Mhn = 1;
  function e(b) {
    return new Int8Array(b);
  }
  function t(b) {
    return new Int16Array(b);
  }
  function n(b) {
    return new Int32Array(b);
  }
  function r(b) {
    return new Float32Array(b);
  }
  function a(b) {
    return new Float64Array(b);
  }
  function i(b) {
    if (b.length == 1) return r(b[0]);
    var v = b[0];
    b = b.slice(1);
    for (var _ = [], w = 0; w < v; w++) _.push(i(b));
    return _;
  }
  function o(b) {
    if (b.length == 1) return n(b[0]);
    var v = b[0];
    b = b.slice(1);
    for (var _ = [], w = 0; w < v; w++) _.push(o(b));
    return _;
  }
  function s(b) {
    if (b.length == 1) return t(b[0]);
    var v = b[0];
    b = b.slice(1);
    for (var _ = [], w = 0; w < v; w++) _.push(s(b));
    return _;
  }
  function l(b) {
    if (b.length == 1) return new Array(b[0]);
    var v = b[0];
    b = b.slice(1);
    for (var _ = [], w = 0; w < v; w++) _.push(l(b));
    return _;
  }
  var d = {};
  d.fill = function (b, v, _, w) {
    if (arguments.length == 2) for (var k = 0; k < b.length; k++) b[k] = arguments[1];else for (var k = v; k < _; k++) b[k] = w;
  };
  var u = {};
  u.arraycopy = function (b, v, _, w, k) {
    for (var A = v + k; v < A;) _[w++] = b[v++];
  }, u.out = {}, u.out.println = function (b) {
    console.log(b);
  }, u.out.printf = function () {
    console.log.apply(console, arguments);
  };
  var h = {};
  h.SQRT2 = 1.4142135623730951, h.FAST_LOG10 = function (b) {
    return Math.log10(b);
  }, h.FAST_LOG10_X = function (b, v) {
    return Math.log10(b) * v;
  };
  function p(b) {
    this.ordinal = b;
  }
  p.short_block_allowed = new p(0), p.short_block_coupled = new p(1), p.short_block_dispensed = new p(2), p.short_block_forced = new p(3);
  var m = {};
  m.MAX_VALUE = 34028235e31;
  function f(b) {
    this.ordinal = b;
  }
  f.vbr_off = new f(0), f.vbr_mt = new f(1), f.vbr_rh = new f(2), f.vbr_abr = new f(3), f.vbr_mtrh = new f(4), f.vbr_default = f.vbr_mtrh;
  var y = function (b) {};
  return Qst = {
    System: u,
    VbrMode: f,
    Float: m,
    ShortBlock: p,
    Util: h,
    Arrays: d,
    new_array_n: l,
    new_byte: e,
    new_double: a,
    new_float: r,
    new_float_n: i,
    new_int: n,
    new_int_n: o,
    new_short: t,
    new_short_n: s,
    assert: y
  }, Qst;
}

var Yst, Phn;

function FVi() {
  if (Phn) return Yst;
  Phn = 1;
  var e = jf(),
    t = e.System;
  e.VbrMode, e.Float, e.ShortBlock;
  var n = e.Util,
    r = e.Arrays;
  e.new_array_n, e.new_byte, e.new_double;
  var a = e.new_float;
  e.new_float_n, e.new_int, e.new_int_n, e.assert;
  var i = Lx();
  function o() {
    var s = [-.1482523854003001, 32.308141959636465, 296.40344946382766, 883.1344870032432, 11113.947376231741, 1057.2713659324597, 305.7402417275812, 30.825928907280012, 3.8533188138216365, 59.42900443849514, 709.5899960123345, 5281.91112291017, -5829.66483675846, -817.6293103748613, -76.91656988279972, -4.594269939176596, .9063471690191471, .1960342806591213, -.15466694054279598, 34.324387823855965, 301.8067566458425, 817.599602898885, 11573.795901679885, 1181.2520595540152, 321.59731579894424, 31.232021761053772, 3.7107095756221318, 53.650946155329365, 684.167428119626, 5224.56624370173, -6366.391851890084, -908.9766368219582, -89.83068876699639, -5.411397422890401, .8206787908286602, .3901806440322567, -.16070888947830023, 36.147034243915876, 304.11815768187864, 732.7429163887613, 11989.60988270091, 1300.012278487897, 335.28490093152146, 31.48816102859945, 3.373875931311736, 47.232241542899175, 652.7371796173471, 5132.414255594984, -6909.087078780055, -1001.9990371107289, -103.62185754286375, -6.104916304710272, .7416505462720353, .5805693545089249, -.16636367662261495, 37.751650073343995, 303.01103387567713, 627.9747488785183, 12358.763425278165, 1412.2779918482834, 346.7496836825721, 31.598286663170416, 3.1598635433980946, 40.57878626349686, 616.1671130880391, 5007.833007176154, -7454.040671756168, -1095.7960341867115, -118.24411666465777, -6.818469345853504, .6681786379192989, .7653668647301797, -.1716176790982088, 39.11551877123304, 298.3413246578966, 503.5259106886539, 12679.589408408976, 1516.5821921214542, 355.9850766329023, 31.395241710249053, 2.9164211881972335, 33.79716964664243, 574.8943997801362, 4853.234992253242, -7997.57021486075, -1189.7624067269965, -133.6444792601766, -7.7202770609839915, .5993769336819237, .9427934736519954, -.17645823955292173, 40.21879108166477, 289.9982036694474, 359.3226160751053, 12950.259102786438, 1612.1013903507662, 362.85067106591504, 31.045922092242872, 2.822222032597987, 26.988862316190684, 529.8996541764288, 4671.371946949588, -8535.899136645805, -1282.5898586244496, -149.58553632943463, -8.643494270763135, .5345111359507916, 1.111140466039205, -.36174739330527045, 41.04429910497807, 277.5463268268618, 195.6386023135583, 13169.43812144731, 1697.6433561479398, 367.40983966190305, 30.557037410382826, 2.531473372857427, 20.070154905927314, 481.50208566532336, 4464.970341588308, -9065.36882077239, -1373.62841526722, -166.1660487028118, -9.58289321133207, .4729647758913199, 1.268786568327291, -.36970682634889585, 41.393213350082036, 261.2935935556502, 12.935476055240873, 13336.131683328815, 1772.508612059496, 369.76534388639965, 29.751323653701338, 2.4023193045459172, 13.304795348228817, 430.5615775526625, 4237.0568611071185, -9581.931701634761, -1461.6913552409758, -183.12733958476446, -10.718010163869403, .41421356237309503, 1.414213562373095, -.37677560326535325, 41.619486213528496, 241.05423794991074, -187.94665032361226, 13450.063605744153, 1836.153896465782, 369.4908799925761, 29.001847876923147, 2.0714759319987186, 6.779591200894186, 377.7767837205709, 3990.386575512536, -10081.709459700915, -1545.947424837898, -200.3762958015653, -11.864482073055006, .3578057213145241, 1.546020906725474, -.3829366947518991, 41.1516456456653, 216.47684307105183, -406.1569483347166, 13511.136535077321, 1887.8076599260432, 367.3025214564151, 28.136213436723654, 1.913880671464418, .3829366947518991, 323.85365704338597, 3728.1472257487526, -10561.233882199509, -1625.2025997821418, -217.62525175416, -13.015432208941645, .3033466836073424, 1.66293922460509, -.5822628872992417, 40.35639251440489, 188.20071124269245, -640.2706748618148, 13519.21490106562, 1927.6022433578062, 362.8197642637487, 26.968821921868447, 1.7463817695935329, -5.62650678237171, 269.3016715297017, 3453.386536448852, -11016.145278780888, -1698.6569643425091, -234.7658734267683, -14.16351421663124, .2504869601913055, 1.76384252869671, -.5887180101749253, 39.23429103868072, 155.76096234403798, -889.2492977967378, 13475.470561874661, 1955.0535223723712, 356.4450994756727, 25.894952980042156, 1.5695032905781554, -11.181939564328772, 214.80884394039484, 3169.1640829158237, -11443.321309975563, -1765.1588461316153, -251.68908574481912, -15.49755935939164, .198912367379658, 1.847759065022573, -.7912582233652842, 37.39369355329111, 119.699486012458, -1151.0956593239027, 13380.446257078214, 1970.3952110853447, 348.01959814116185, 24.731487364283044, 1.3850130831637748, -16.421408865300393, 161.05030052864092, 2878.3322807850063, -11838.991423510031, -1823.985884688674, -268.2854986386903, -16.81724543849939, .1483359875383474, 1.913880671464418, -.7960642926861912, 35.2322109610459, 80.01928065061526, -1424.0212633405113, 13235.794061869668, 1973.804052543835, 337.9908651258184, 23.289159354463873, 1.3934255946442087, -21.099669467133474, 108.48348407242611, 2583.700758091299, -12199.726194855148, -1874.2780658979746, -284.2467154529415, -18.11369784385905, .09849140335716425, 1.961570560806461, -.998795456205172, 32.56307803611191, 36.958364584370486, -1706.075448829146, 13043.287458812016, 1965.3831106103316, 326.43182772364605, 22.175018750622293, 1.198638339011324, -25.371248002043963, 57.53505923036915, 2288.41886619975, -12522.674544337233, -1914.8400385312243, -299.26241273417224, -19.37805630698734, .04912684976946725, 1.990369453344394, .035780907 * n.SQRT2 * .5 / 2384e-9, .017876148 * n.SQRT2 * .5 / 2384e-9, .003134727 * n.SQRT2 * .5 / 2384e-9, .002457142 * n.SQRT2 * .5 / 2384e-9, 971317e-9 * n.SQRT2 * .5 / 2384e-9, 218868e-9 * n.SQRT2 * .5 / 2384e-9, 101566e-9 * n.SQRT2 * .5 / 2384e-9, 13828e-9 * n.SQRT2 * .5 / 2384e-9, 12804.797818791945, 1945.5515939597317, 313.4244966442953, 20.801593959731544, 1995.1556208053692, 9.000838926174497, -29.20218120805369],
      l = [[2382191739347913e-28, 6423305872147834e-28, 9400849094049688e-28, 1122435026096556e-27, 1183840321267481e-27, 1122435026096556e-27, 940084909404969e-27, 6423305872147839e-28, 2382191739347918e-28, 5456116108943412e-27, 4878985199565852e-27, 4240448995017367e-27, 3559909094758252e-27, 2858043359288075e-27, 2156177623817898e-27, 1475637723558783e-27, 8371015190102974e-28, 2599706096327376e-28, -5456116108943412e-27, -4878985199565852e-27, -4240448995017367e-27, -3559909094758252e-27, -2858043359288076e-27, -2156177623817898e-27, -1475637723558783e-27, -8371015190102975e-28, -2599706096327376e-28, -2382191739347923e-28, -6423305872147843e-28, -9400849094049696e-28, -1122435026096556e-27, -1183840321267481e-27, -1122435026096556e-27, -9400849094049694e-28, -642330587214784e-27, -2382191739347918e-28], [2382191739347913e-28, 6423305872147834e-28, 9400849094049688e-28, 1122435026096556e-27, 1183840321267481e-27, 1122435026096556e-27, 9400849094049688e-28, 6423305872147841e-28, 2382191739347918e-28, 5456116108943413e-27, 4878985199565852e-27, 4240448995017367e-27, 3559909094758253e-27, 2858043359288075e-27, 2156177623817898e-27, 1475637723558782e-27, 8371015190102975e-28, 2599706096327376e-28, -5461314069809755e-27, -4921085770524055e-27, -4343405037091838e-27, -3732668368707687e-27, -3093523840190885e-27, -2430835727329465e-27, -1734679010007751e-27, -974825365660928e-27, -2797435120168326e-28, 0, 0, 0, 0, 0, 0, -2283748241799531e-28, -4037858874020686e-28, -2146547464825323e-28], [.1316524975873958, .414213562373095, .7673269879789602, 1.091308501069271, 1.303225372841206, 1.56968557711749, 1.920982126971166, 2.414213562373094, 3.171594802363212, 4.510708503662055, 7.595754112725146, 22.90376554843115, .984807753012208, .6427876096865394, .3420201433256688, .9396926207859084, -.1736481776669303, -.7660444431189779, .8660254037844387, .5, -.5144957554275265, -.4717319685649723, -.3133774542039019, -.1819131996109812, -.09457419252642064, -.04096558288530405, -.01419856857247115, -.003699974673760037, .8574929257125442, .8817419973177052, .9496286491027329, .9833145924917901, .9955178160675857, .9991605581781475, .999899195244447, .9999931550702802], [0, 0, 0, 0, 0, 0, 2283748241799531e-28, 4037858874020686e-28, 2146547464825323e-28, 5461314069809755e-27, 4921085770524055e-27, 4343405037091838e-27, 3732668368707687e-27, 3093523840190885e-27, 2430835727329466e-27, 1734679010007751e-27, 974825365660928e-27, 2797435120168326e-28, -5456116108943413e-27, -4878985199565852e-27, -4240448995017367e-27, -3559909094758253e-27, -2858043359288075e-27, -2156177623817898e-27, -1475637723558782e-27, -8371015190102975e-28, -2599706096327376e-28, -2382191739347913e-28, -6423305872147834e-28, -9400849094049688e-28, -1122435026096556e-27, -1183840321267481e-27, -1122435026096556e-27, -9400849094049688e-28, -6423305872147841e-28, -2382191739347918e-28]],
      d = l[i.SHORT_TYPE],
      u = l[i.SHORT_TYPE],
      h = l[i.SHORT_TYPE],
      p = l[i.SHORT_TYPE],
      m = [0, 1, 16, 17, 8, 9, 24, 25, 4, 5, 20, 21, 12, 13, 28, 29, 2, 3, 18, 19, 10, 11, 26, 27, 6, 7, 22, 23, 14, 15, 30, 31];
    function f(v, _, w) {
      for (var k = 10, A = _ + 238 - 14 - 286, S = -15; S < 0; S++) {
        var C, I, E;
        C = s[k + -10], I = v[A + -224] * C, E = v[_ + 224] * C, C = s[k + -9], I += v[A + -160] * C, E += v[_ + 160] * C, C = s[k + -8], I += v[A + -96] * C, E += v[_ + 96] * C, C = s[k + -7], I += v[A + -32] * C, E += v[_ + 32] * C, C = s[k + -6], I += v[A + 32] * C, E += v[_ + -32] * C, C = s[k + -5], I += v[A + 96] * C, E += v[_ + -96] * C, C = s[k + -4], I += v[A + 160] * C, E += v[_ + -160] * C, C = s[k + -3], I += v[A + 224] * C, E += v[_ + -224] * C, C = s[k + -2], I += v[_ + -256] * C, E -= v[A + 256] * C, C = s[k + -1], I += v[_ + -192] * C, E -= v[A + 192] * C, C = s[k + 0], I += v[_ + -128] * C, E -= v[A + 128] * C, C = s[k + 1], I += v[_ + -64] * C, E -= v[A + 64] * C, C = s[k + 2], I += v[_ + 0] * C, E -= v[A + 0] * C, C = s[k + 3], I += v[_ + 64] * C, E -= v[A + -64] * C, C = s[k + 4], I += v[_ + 128] * C, E -= v[A + -128] * C, C = s[k + 5], I += v[_ + 192] * C, E -= v[A + -192] * C, I *= s[k + 6], C = E - I, w[30 + S * 2] = E + I, w[31 + S * 2] = s[k + 7] * C, k += 18, _--, A++;
      }
      {
        var I, E, M, T;
        E = v[_ + -16] * s[k + -10], I = v[_ + -32] * s[k + -2], E += (v[_ + -48] - v[_ + 16]) * s[k + -9], I += v[_ + -96] * s[k + -1], E += (v[_ + -80] + v[_ + 48]) * s[k + -8], I += v[_ + -160] * s[k + 0], E += (v[_ + -112] - v[_ + 80]) * s[k + -7], I += v[_ + -224] * s[k + 1], E += (v[_ + -144] + v[_ + 112]) * s[k + -6], I -= v[_ + 32] * s[k + 2], E += (v[_ + -176] - v[_ + 144]) * s[k + -5], I -= v[_ + 96] * s[k + 3], E += (v[_ + -208] + v[_ + 176]) * s[k + -4], I -= v[_ + 160] * s[k + 4], E += (v[_ + -240] - v[_ + 208]) * s[k + -3], I -= v[_ + 224], M = I - E, T = I + E, E = w[14], I = w[15] - E, w[31] = T + E, w[30] = M + I, w[15] = M - I, w[14] = T - E;
      }
      {
        var P;
        P = w[28] - w[0], w[0] += w[28], w[28] = P * s[k + -36 + 7], P = w[29] - w[1], w[1] += w[29], w[29] = P * s[k + -36 + 7], P = w[26] - w[2], w[2] += w[26], w[26] = P * s[k + -72 + 7], P = w[27] - w[3], w[3] += w[27], w[27] = P * s[k + -72 + 7], P = w[24] - w[4], w[4] += w[24], w[24] = P * s[k + -108 + 7], P = w[25] - w[5], w[5] += w[25], w[25] = P * s[k + -108 + 7], P = w[22] - w[6], w[6] += w[22], w[22] = P * n.SQRT2, P = w[23] - w[7], w[7] += w[23], w[23] = P * n.SQRT2 - w[7], w[7] -= w[6], w[22] -= w[7], w[23] -= w[22], P = w[6], w[6] = w[31] - P, w[31] = w[31] + P, P = w[7], w[7] = w[30] - P, w[30] = w[30] + P, P = w[22], w[22] = w[15] - P, w[15] = w[15] + P, P = w[23], w[23] = w[14] - P, w[14] = w[14] + P, P = w[20] - w[8], w[8] += w[20], w[20] = P * s[k + -180 + 7], P = w[21] - w[9], w[9] += w[21], w[21] = P * s[k + -180 + 7], P = w[18] - w[10], w[10] += w[18], w[18] = P * s[k + -216 + 7], P = w[19] - w[11], w[11] += w[19], w[19] = P * s[k + -216 + 7], P = w[16] - w[12], w[12] += w[16], w[16] = P * s[k + -252 + 7], P = w[17] - w[13], w[13] += w[17], w[17] = P * s[k + -252 + 7], P = -w[20] + w[24], w[20] += w[24], w[24] = P * s[k + -216 + 7], P = -w[21] + w[25], w[21] += w[25], w[25] = P * s[k + -216 + 7], P = w[4] - w[8], w[4] += w[8], w[8] = P * s[k + -216 + 7], P = w[5] - w[9], w[5] += w[9], w[9] = P * s[k + -216 + 7], P = w[0] - w[12], w[0] += w[12], w[12] = P * s[k + -72 + 7], P = w[1] - w[13], w[1] += w[13], w[13] = P * s[k + -72 + 7], P = w[16] - w[28], w[16] += w[28], w[28] = P * s[k + -72 + 7], P = -w[17] + w[29], w[17] += w[29], w[29] = P * s[k + -72 + 7], P = n.SQRT2 * (w[2] - w[10]), w[2] += w[10], w[10] = P, P = n.SQRT2 * (w[3] - w[11]), w[3] += w[11], w[11] = P, P = n.SQRT2 * (-w[18] + w[26]), w[18] += w[26], w[26] = P - w[18], P = n.SQRT2 * (-w[19] + w[27]), w[19] += w[27], w[27] = P - w[19], P = w[2], w[19] -= w[3], w[3] -= P, w[2] = w[31] - P, w[31] += P, P = w[3], w[11] -= w[19], w[18] -= P, w[3] = w[30] - P, w[30] += P, P = w[18], w[27] -= w[11], w[19] -= P, w[18] = w[15] - P, w[15] += P, P = w[19], w[10] -= P, w[19] = w[14] - P, w[14] += P, P = w[10], w[11] -= P, w[10] = w[23] - P, w[23] += P, P = w[11], w[26] -= P, w[11] = w[22] - P, w[22] += P, P = w[26], w[27] -= P, w[26] = w[7] - P, w[7] += P, P = w[27], w[27] = w[6] - P, w[6] += P, P = n.SQRT2 * (w[0] - w[4]), w[0] += w[4], w[4] = P, P = n.SQRT2 * (w[1] - w[5]), w[1] += w[5], w[5] = P, P = n.SQRT2 * (w[16] - w[20]), w[16] += w[20], w[20] = P, P = n.SQRT2 * (w[17] - w[21]), w[17] += w[21], w[21] = P, P = -n.SQRT2 * (w[8] - w[12]), w[8] += w[12], w[12] = P - w[8], P = -n.SQRT2 * (w[9] - w[13]), w[9] += w[13], w[13] = P - w[9], P = -n.SQRT2 * (w[25] - w[29]), w[25] += w[29], w[29] = P - w[25], P = -n.SQRT2 * (w[24] + w[28]), w[24] -= w[28], w[28] = P - w[24], P = w[24] - w[16], w[24] = P, P = w[20] - P, w[20] = P, P = w[28] - P, w[28] = P, P = w[25] - w[17], w[25] = P, P = w[21] - P, w[21] = P, P = w[29] - P, w[29] = P, P = w[17] - w[1], w[17] = P, P = w[9] - P, w[9] = P, P = w[25] - P, w[25] = P, P = w[5] - P, w[5] = P, P = w[21] - P, w[21] = P, P = w[13] - P, w[13] = P, P = w[29] - P, w[29] = P, P = w[1] - w[0], w[1] = P, P = w[16] - P, w[16] = P, P = w[17] - P, w[17] = P, P = w[8] - P, w[8] = P, P = w[9] - P, w[9] = P, P = w[24] - P, w[24] = P, P = w[25] - P, w[25] = P, P = w[4] - P, w[4] = P, P = w[5] - P, w[5] = P, P = w[20] - P, w[20] = P, P = w[21] - P, w[21] = P, P = w[12] - P, w[12] = P, P = w[13] - P, w[13] = P, P = w[28] - P, w[28] = P, P = w[29] - P, w[29] = P, P = w[0], w[0] += w[31], w[31] -= P, P = w[1], w[1] += w[30], w[30] -= P, P = w[16], w[16] += w[15], w[15] -= P, P = w[17], w[17] += w[14], w[14] -= P, P = w[8], w[8] += w[23], w[23] -= P, P = w[9], w[9] += w[22], w[22] -= P, P = w[24], w[24] += w[7], w[7] -= P, P = w[25], w[25] += w[6], w[6] -= P, P = w[4], w[4] += w[27], w[27] -= P, P = w[5], w[5] += w[26], w[26] -= P, P = w[20], w[20] += w[11], w[11] -= P, P = w[21], w[21] += w[10], w[10] -= P, P = w[12], w[12] += w[19], w[19] -= P, P = w[13], w[13] += w[18], w[18] -= P, P = w[28], w[28] += w[3], w[3] -= P, P = w[29], w[29] += w[2], w[2] -= P;
      }
    }
    function y(v, _) {
      for (var w = 0; w < 3; w++) {
        var k, A, S, C, I, E;
        C = v[_ + 6] * l[i.SHORT_TYPE][0] - v[_ + 15], k = v[_ + 0] * l[i.SHORT_TYPE][2] - v[_ + 9], A = C + k, S = C - k, C = v[_ + 15] * l[i.SHORT_TYPE][0] + v[_ + 6], k = v[_ + 9] * l[i.SHORT_TYPE][2] + v[_ + 0], I = C + k, E = -C + k, k = (v[_ + 3] * l[i.SHORT_TYPE][1] - v[_ + 12]) * 2069978111953089e-26, C = (v[_ + 12] * l[i.SHORT_TYPE][1] + v[_ + 3]) * 2069978111953089e-26, v[_ + 0] = A * 190752519173728e-25 + k, v[_ + 15] = -I * 190752519173728e-25 + C, S = S * .8660254037844387 * 1907525191737281e-26, I = I * .5 * 1907525191737281e-26 + C, v[_ + 3] = S - I, v[_ + 6] = S + I, A = A * .5 * 1907525191737281e-26 - k, E = E * .8660254037844387 * 1907525191737281e-26, v[_ + 9] = A + E, v[_ + 12] = A - E, _++;
      }
    }
    function b(v, _, w) {
      var k, A;
      {
        var S, C, I, E, M, T, P, R;
        S = w[17] - w[9], I = w[15] - w[11], E = w[14] - w[12], M = w[0] + w[8], T = w[1] + w[7], P = w[2] + w[6], R = w[3] + w[5], v[_ + 17] = M + P - R - (T - w[4]), A = (M + P - R) * u[19] + (T - w[4]), k = (S - I - E) * u[18], v[_ + 5] = k + A, v[_ + 6] = k - A, C = (w[16] - w[10]) * u[18], T = T * u[19] + w[4], k = S * u[12] + C + I * u[13] + E * u[14], A = -M * u[16] + T - P * u[17] + R * u[15], v[_ + 1] = k + A, v[_ + 2] = k - A, k = S * u[13] - C - I * u[14] + E * u[12], A = -M * u[17] + T - P * u[15] + R * u[16], v[_ + 9] = k + A, v[_ + 10] = k - A, k = S * u[14] - C + I * u[12] - E * u[13], A = M * u[15] - T + P * u[16] - R * u[17], v[_ + 13] = k + A, v[_ + 14] = k - A;
      }
      {
        var j, B, F, N, G, z, V, O;
        j = w[8] - w[0], F = w[6] - w[2], N = w[5] - w[3], G = w[17] + w[9], z = w[16] + w[10], V = w[15] + w[11], O = w[14] + w[12], v[_ + 0] = G + V + O + (z + w[13]), k = (G + V + O) * u[19] - (z + w[13]), A = (j - F + N) * u[18], v[_ + 11] = k + A, v[_ + 12] = k - A, B = (w[7] - w[1]) * u[18], z = w[13] - z * u[19], k = G * u[15] - z + V * u[16] + O * u[17], A = j * u[14] + B + F * u[12] + N * u[13], v[_ + 3] = k + A, v[_ + 4] = k - A, k = -G * u[17] + z - V * u[15] - O * u[16], A = j * u[13] + B - F * u[14] - N * u[12], v[_ + 7] = k + A, v[_ + 8] = k - A, k = -G * u[16] + z - V * u[17] - O * u[15], A = j * u[12] - B + F * u[13] - N * u[14], v[_ + 15] = k + A, v[_ + 16] = k - A;
      }
    }
    this.mdct_sub48 = function (v, _, w) {
      for (var k = _, A = 286, S = 0; S < v.channels_out; S++) {
        for (var C = 0; C < v.mode_gr; C++) {
          for (var I, E = v.l3_side.tt[C][S], M = E.xr, T = 0, P = v.sb_sample[S][1 - C], R = 0, j = 0; j < 18 / 2; j++) for (f(k, A, P[R]), f(k, A + 32, P[R + 1]), R += 2, A += 64, I = 1; I < 32; I += 2) P[R - 1][I] *= -1;
          for (I = 0; I < 32; I++, T += 18) {
            var B = E.block_type,
              F = v.sb_sample[S][C],
              N = v.sb_sample[S][1 - C];
            if (E.mixed_block_flag != 0 && I < 2 && (B = 0), v.amp_filter[I] < 1e-12) r.fill(M, T + 0, T + 18, 0);else {
              if (v.amp_filter[I] < 1) for (var j = 0; j < 18; j++) N[j][m[I]] *= v.amp_filter[I];
              if (B == i.SHORT_TYPE) {
                for (var j = -12 / 4; j < 0; j++) {
                  var G = l[i.SHORT_TYPE][j + 3];
                  M[T + j * 3 + 9] = F[9 + j][m[I]] * G - F[8 - j][m[I]], M[T + j * 3 + 18] = F[14 - j][m[I]] * G + F[15 + j][m[I]], M[T + j * 3 + 10] = F[15 + j][m[I]] * G - F[14 - j][m[I]], M[T + j * 3 + 19] = N[2 - j][m[I]] * G + N[3 + j][m[I]], M[T + j * 3 + 11] = N[3 + j][m[I]] * G - N[2 - j][m[I]], M[T + j * 3 + 20] = N[8 - j][m[I]] * G + N[9 + j][m[I]];
                }
                y(M, T);
              } else {
                for (var z = a(18), j = -36 / 4; j < 0; j++) {
                  var V, O;
                  V = l[B][j + 27] * N[j + 9][m[I]] + l[B][j + 36] * N[8 - j][m[I]], O = l[B][j + 9] * F[j + 9][m[I]] - l[B][j + 18] * F[8 - j][m[I]], z[j + 9] = V - O * d[3 + j + 9], z[j + 18] = V * d[3 + j + 9] + O;
                }
                b(M, T, z);
              }
            }
            if (B != i.SHORT_TYPE && I != 0) for (var j = 7; j >= 0; --j) {
              var L, D;
              L = M[T + j] * h[20 + j] + M[T + -1 - j] * p[28 + j], D = M[T + j] * p[28 + j] - M[T + -1 - j] * h[20 + j], M[T + -1 - j] = L, M[T + j] = D;
            }
          }
        }
        if (k = w, A = 286, v.mode_gr == 1) for (var U = 0; U < 18; U++) t.arraycopy(v.sb_sample[S][1][U], 0, v.sb_sample[S][0][U], 0, 32);
      }
    };
  }
  return Yst = o, Yst;
}

var Xst, Rhn;

function Tmr() {
  if (Rhn) return Xst;
  Rhn = 1;
  var e = Lx(),
    t = jf(),
    n = t.System;
  t.VbrMode, t.Float, t.ShortBlock, t.Util, t.Arrays, t.new_array_n, t.new_byte, t.new_double;
  var r = t.new_float,
    a = t.new_float_n;
  t.new_int, t.new_int_n, t.assert;
  function i() {
    this.l = r(e.SBMAX_l), this.s = a([e.SBMAX_s, 3]);
    var o = this;
    this.assign = function (s) {
      n.arraycopy(s.l, 0, o.l, 0, e.SBMAX_l);
      for (var l = 0; l < e.SBMAX_s; l++) for (var d = 0; d < 3; d++) o.s[l][d] = s.s[l][d];
    };
  }
  return Xst = i, Xst;
}

var Jst, Nhn;

function zVi() {
  if (Nhn) return Jst;
  Nhn = 1;
  var e = Tmr();
  function t() {
    this.thm = new e(), this.en = new e();
  }
  return Jst = t, Jst;
}

var Zst, jhn;

function Lx() {
  if (jhn) return Zst;
  jhn = 1;
  var e = jf(),
    t = e.System,
    n = e.VbrMode;
  e.Float, e.ShortBlock, e.Util, e.Arrays;
  var r = e.new_array_n;
  e.new_byte, e.new_double;
  var a = e.new_float,
    i = e.new_float_n,
    o = e.new_int;
  e.new_int_n;
  var s = e.assert;
  l.ENCDELAY = 576, l.POSTDELAY = 1152, l.MDCTDELAY = 48, l.FFTOFFSET = 224 + l.MDCTDELAY, l.DECDELAY = 528, l.SBLIMIT = 32, l.CBANDS = 64, l.SBPSY_l = 21, l.SBPSY_s = 12, l.SBMAX_l = 22, l.SBMAX_s = 13, l.PSFB21 = 6, l.PSFB12 = 6, l.BLKSIZE = 1024, l.HBLKSIZE = l.BLKSIZE / 2 + 1, l.BLKSIZE_s = 256, l.HBLKSIZE_s = l.BLKSIZE_s / 2 + 1, l.NORM_TYPE = 0, l.START_TYPE = 1, l.SHORT_TYPE = 2, l.STOP_TYPE = 3, l.MPG_MD_LR_LR = 0, l.MPG_MD_LR_I = 1, l.MPG_MD_MS_LR = 2, l.MPG_MD_MS_I = 3, l.fircoef = [-.0207887 * 5, -.0378413 * 5, -.0432472 * 5, -.031183 * 5, 779609e-23 * 5, .0467745 * 5, .10091 * 5, .151365 * 5, .187098 * 5];
  function l() {
    var d = FVi(),
      u = zVi(),
      h = l.FFTOFFSET,
      p = l.MPG_MD_MS_LR,
      m = null;
    this.psy = null;
    var f = null,
      y = null,
      b = null;
    this.setModules = function (A, S, C, I) {
      m = A, this.psy = S, f = S, y = I, b = C;
    };
    var v = new d();
    function _(A) {
      var S, C;
      if (A.ATH.useAdjust == 0) {
        A.ATH.adjust = 1;
        return;
      }
      if (C = A.loudness_sq[0][0], S = A.loudness_sq[1][0], A.channels_out == 2 ? (C += A.loudness_sq[0][1], S += A.loudness_sq[1][1]) : (C += C, S += S), A.mode_gr == 2 && (C = Math.max(C, S)), C *= .5, C *= A.ATH.aaSensitivityP, C > .03125) A.ATH.adjust >= 1 ? A.ATH.adjust = 1 : A.ATH.adjust < A.ATH.adjustLimit && (A.ATH.adjust = A.ATH.adjustLimit), A.ATH.adjustLimit = 1;else {
        var I = 31.98 * C + 625e-6;
        A.ATH.adjust >= I ? (A.ATH.adjust *= I * .075 + .925, A.ATH.adjust < I && (A.ATH.adjust = I)) : A.ATH.adjustLimit >= I ? A.ATH.adjust = I : A.ATH.adjust < A.ATH.adjustLimit && (A.ATH.adjust = A.ATH.adjustLimit), A.ATH.adjustLimit = I;
      }
    }
    function w(A) {
      var S, C;
      for (s(0 <= A.bitrate_index && A.bitrate_index < 16), s(0 <= A.mode_ext && A.mode_ext < 4), A.bitrate_stereoMode_Hist[A.bitrate_index][4]++, A.bitrate_stereoMode_Hist[15][4]++, A.channels_out == 2 && (A.bitrate_stereoMode_Hist[A.bitrate_index][A.mode_ext]++, A.bitrate_stereoMode_Hist[15][A.mode_ext]++), S = 0; S < A.mode_gr; ++S) for (C = 0; C < A.channels_out; ++C) {
        var I = A.l3_side.tt[S][C].block_type | 0;
        A.l3_side.tt[S][C].mixed_block_flag != 0 && (I = 4), A.bitrate_blockType_Hist[A.bitrate_index][I]++, A.bitrate_blockType_Hist[A.bitrate_index][5]++, A.bitrate_blockType_Hist[15][I]++, A.bitrate_blockType_Hist[15][5]++;
      }
    }
    function k(A, S) {
      var C = A.internal_flags,
        I,
        E;
      if (C.lame_encode_frame_init == 0) {
        var M,
          T,
          P = a(2014),
          R = a(2014);
        for (C.lame_encode_frame_init = 1, M = 0, T = 0; M < 286 + 576 * (1 + C.mode_gr); ++M) M < 576 * C.mode_gr ? (P[M] = 0, C.channels_out == 2 && (R[M] = 0)) : (P[M] = S[0][T], C.channels_out == 2 && (R[M] = S[1][T]), ++T);
        for (E = 0; E < C.mode_gr; E++) for (I = 0; I < C.channels_out; I++) C.l3_side.tt[E][I].block_type = l.SHORT_TYPE;
        v.mdct_sub48(C, P, R), s(576 >= l.FFTOFFSET), s(C.mf_size >= l.BLKSIZE + A.framesize - l.FFTOFFSET), s(C.mf_size >= 512 + A.framesize - 32);
      }
    }
    this.lame_encode_mp3_frame = function (A, S, C, I, E, M) {
      var T,
        P = r([2, 2]);
      P[0][0] = new u(), P[0][1] = new u(), P[1][0] = new u(), P[1][1] = new u();
      var R = r([2, 2]);
      R[0][0] = new u(), R[0][1] = new u(), R[1][0] = new u(), R[1][1] = new u();
      var j,
        B = [null, null],
        F = A.internal_flags,
        N = i([2, 4]),
        G = [.5, .5],
        z = [[0, 0], [0, 0]],
        V = [[0, 0], [0, 0]],
        O,
        L,
        D;
      if (B[0] = S, B[1] = C, F.lame_encode_frame_init == 0 && k(A, B), F.padding = 0, (F.slot_lag -= F.frac_SpF) < 0 && (F.slot_lag += A.out_samplerate, F.padding = 1), F.psymodel != 0) {
        var U,
          H = [null, null],
          Y = 0,
          K = o(2);
        for (D = 0; D < F.mode_gr; D++) {
          for (L = 0; L < F.channels_out; L++) H[L] = B[L], Y = 576 + D * 576 - l.FFTOFFSET;
          if (A.VBR == n.vbr_mtrh || A.VBR == n.vbr_mt ? U = f.L3psycho_anal_vbr(A, H, Y, D, P, R, z[D], V[D], N[D], K) : U = f.L3psycho_anal_ns(A, H, Y, D, P, R, z[D], V[D], N[D], K), U != 0) return -4;
          for (A.mode == MPEGMode.JOINT_STEREO && (G[D] = N[D][2] + N[D][3], G[D] > 0 && (G[D] = N[D][3] / G[D])), L = 0; L < F.channels_out; L++) {
            var W = F.l3_side.tt[D][L];
            W.block_type = K[L], W.mixed_block_flag = 0;
          }
        }
      } else for (D = 0; D < F.mode_gr; D++) for (L = 0; L < F.channels_out; L++) F.l3_side.tt[D][L].block_type = l.NORM_TYPE, F.l3_side.tt[D][L].mixed_block_flag = 0, V[D][L] = z[D][L] = 700;
      if (_(F), v.mdct_sub48(F, B[0], B[1]), F.mode_ext = l.MPG_MD_LR_LR, A.force_ms) F.mode_ext = l.MPG_MD_MS_LR;else if (A.mode == MPEGMode.JOINT_STEREO) {
        var Q = 0,
          q = 0;
        for (D = 0; D < F.mode_gr; D++) for (L = 0; L < F.channels_out; L++) Q += V[D][L], q += z[D][L];
        if (Q <= 1 * q) {
          var ne = F.l3_side.tt[0],
            de = F.l3_side.tt[F.mode_gr - 1];
          ne[0].block_type == ne[1].block_type && de[0].block_type == de[1].block_type && (F.mode_ext = l.MPG_MD_MS_LR);
        }
      }
      if (F.mode_ext == p ? (j = R, O = V) : (j = P, O = z), A.analysis && F.pinfo != null) for (D = 0; D < F.mode_gr; D++) for (L = 0; L < F.channels_out; L++) F.pinfo.ms_ratio[D] = F.ms_ratio[D], F.pinfo.ms_ener_ratio[D] = G[D], F.pinfo.blocktype[D][L] = F.l3_side.tt[D][L].block_type, F.pinfo.pe[D][L] = O[D][L], t.arraycopy(F.l3_side.tt[D][L].xr, 0, F.pinfo.xr[D][L], 0, 576), F.mode_ext == p && (F.pinfo.ers[D][L] = F.pinfo.ers[D][L + 2], t.arraycopy(F.pinfo.energy[D][L + 2], 0, F.pinfo.energy[D][L], 0, F.pinfo.energy[D][L].length));
      if (A.VBR == n.vbr_off || A.VBR == n.vbr_abr) {
        var le, J;
        for (le = 0; le < 18; le++) F.nsPsy.pefirbuf[le] = F.nsPsy.pefirbuf[le + 1];
        for (J = 0, D = 0; D < F.mode_gr; D++) for (L = 0; L < F.channels_out; L++) J += O[D][L];
        for (F.nsPsy.pefirbuf[18] = J, J = F.nsPsy.pefirbuf[9], le = 0; le < 9; le++) J += (F.nsPsy.pefirbuf[le] + F.nsPsy.pefirbuf[18 - le]) * l.fircoef[le];
        for (J = 670 * 5 * F.mode_gr * F.channels_out / J, D = 0; D < F.mode_gr; D++) for (L = 0; L < F.channels_out; L++) O[D][L] *= J;
      }
      if (F.iteration_loop.iteration_loop(A, O, G, j), m.format_bitstream(A), T = m.copy_buffer(F, I, E, M, 1), A.bWriteVbrTag && y.addVbrFrame(A), A.analysis && F.pinfo != null) {
        for (L = 0; L < F.channels_out; L++) {
          var pe;
          for (pe = 0; pe < h; pe++) F.pinfo.pcmdata[L][pe] = F.pinfo.pcmdata[L][pe + A.framesize];
          for (pe = h; pe < 1600; pe++) F.pinfo.pcmdata[L][pe] = B[L][pe - h];
        }
        b.set_frame_pinfo(A, j);
      }
      return w(F), T;
    };
  }
  return Zst = l, Zst;
}

var elt, Dhn;

function UVi() {
  if (Dhn) return elt;
  Dhn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock;
  var t = e.Util;
  e.Arrays, e.new_array_n, e.new_byte, e.new_double;
  var n = e.new_float;
  e.new_float_n, e.new_int, e.new_int_n, e.assert;
  var r = Lx();
  function a() {
    var i = n(r.BLKSIZE),
      o = n(r.BLKSIZE_s / 2),
      s = [.9238795325112867, .3826834323650898, .9951847266721969, .0980171403295606, .9996988186962042, .02454122852291229, .9999811752826011, .006135884649154475];
    function l(u, h, p) {
      var m = 0,
        f,
        y,
        b;
      p <<= 1;
      var v = h + p;
      f = 4;
      do {
        var _, w, k, A, S, C, I;
        I = f >> 1, A = f, S = f << 1, C = S + A, f = S << 1, y = h, b = y + I;
        do {
          var E, M, T, P;
          M = u[y + 0] - u[y + A], E = u[y + 0] + u[y + A], P = u[y + S] - u[y + C], T = u[y + S] + u[y + C], u[y + S] = E - T, u[y + 0] = E + T, u[y + C] = M - P, u[y + A] = M + P, M = u[b + 0] - u[b + A], E = u[b + 0] + u[b + A], P = t.SQRT2 * u[b + C], T = t.SQRT2 * u[b + S], u[b + S] = E - T, u[b + 0] = E + T, u[b + C] = M - P, u[b + A] = M + P, b += f, y += f;
        } while (y < v);
        for (w = s[m + 0], _ = s[m + 1], k = 1; k < I; k++) {
          var R, j;
          R = 1 - 2 * _ * _, j = 2 * _ * w, y = h + k, b = h + A - k;
          do {
            var B, F, N, E, M, G, T, z, P, V;
            F = j * u[y + A] - R * u[b + A], B = R * u[y + A] + j * u[b + A], M = u[y + 0] - B, E = u[y + 0] + B, G = u[b + 0] - F, N = u[b + 0] + F, F = j * u[y + C] - R * u[b + C], B = R * u[y + C] + j * u[b + C], P = u[y + S] - B, T = u[y + S] + B, V = u[b + S] - F, z = u[b + S] + F, F = _ * T - w * V, B = w * T + _ * V, u[y + S] = E - B, u[y + 0] = E + B, u[b + C] = G - F, u[b + A] = G + F, F = w * z - _ * P, B = _ * z + w * P, u[b + S] = N - B, u[b + 0] = N + B, u[y + C] = M - F, u[y + A] = M + F, b += f, y += f;
          } while (y < v);
          R = w, w = R * s[m + 0] - _ * s[m + 1], _ = R * s[m + 1] + _ * s[m + 0];
        }
        m += 2;
      } while (f < p);
    }
    var d = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254];
    this.fft_short = function (u, h, p, m, f) {
      for (var y = 0; y < 3; y++) {
        var b = r.BLKSIZE_s / 2,
          v = 65535 & 576 / 3 * (y + 1),
          _ = r.BLKSIZE_s / 8 - 1;
        do {
          var w,
            k,
            A,
            S,
            C,
            I = d[_ << 2] & 255;
          w = o[I] * m[p][f + I + v], C = o[127 - I] * m[p][f + I + v + 128], k = w - C, w = w + C, A = o[I + 64] * m[p][f + I + v + 64], C = o[63 - I] * m[p][f + I + v + 192], S = A - C, A = A + C, b -= 4, h[y][b + 0] = w + A, h[y][b + 2] = w - A, h[y][b + 1] = k + S, h[y][b + 3] = k - S, w = o[I + 1] * m[p][f + I + v + 1], C = o[126 - I] * m[p][f + I + v + 129], k = w - C, w = w + C, A = o[I + 65] * m[p][f + I + v + 65], C = o[62 - I] * m[p][f + I + v + 193], S = A - C, A = A + C, h[y][b + r.BLKSIZE_s / 2 + 0] = w + A, h[y][b + r.BLKSIZE_s / 2 + 2] = w - A, h[y][b + r.BLKSIZE_s / 2 + 1] = k + S, h[y][b + r.BLKSIZE_s / 2 + 3] = k - S;
        } while (--_ >= 0);
        l(h[y], b, r.BLKSIZE_s / 2);
      }
    }, this.fft_long = function (u, h, p, m, f) {
      var y = r.BLKSIZE / 8 - 1,
        b = r.BLKSIZE / 2;
      do {
        var v,
          _,
          w,
          k,
          A,
          S = d[y] & 255;
        v = i[S] * m[p][f + S], A = i[S + 512] * m[p][f + S + 512], _ = v - A, v = v + A, w = i[S + 256] * m[p][f + S + 256], A = i[S + 768] * m[p][f + S + 768], k = w - A, w = w + A, b -= 4, h[b + 0] = v + w, h[b + 2] = v - w, h[b + 1] = _ + k, h[b + 3] = _ - k, v = i[S + 1] * m[p][f + S + 1], A = i[S + 513] * m[p][f + S + 513], _ = v - A, v = v + A, w = i[S + 257] * m[p][f + S + 257], A = i[S + 769] * m[p][f + S + 769], k = w - A, w = w + A, h[b + r.BLKSIZE / 2 + 0] = v + w, h[b + r.BLKSIZE / 2 + 2] = v - w, h[b + r.BLKSIZE / 2 + 1] = _ + k, h[b + r.BLKSIZE / 2 + 3] = _ - k;
      } while (--y >= 0);
      l(h, b, r.BLKSIZE / 2);
    }, this.init_fft = function (u) {
      for (var h = 0; h < r.BLKSIZE; h++) i[h] = .42 - .5 * Math.cos(2 * Math.PI * (h + .5) / r.BLKSIZE) + .08 * Math.cos(4 * Math.PI * (h + .5) / r.BLKSIZE);
      for (var h = 0; h < r.BLKSIZE_s / 2; h++) o[h] = .5 * (1 - Math.cos(2 * Math.PI * (h + .5) / r.BLKSIZE_s));
    };
  }
  return elt = a, elt;
}

var tlt, Lhn;

