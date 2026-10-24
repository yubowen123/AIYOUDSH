function EAi(e) {
  let t = null,
    n = null;
  const r = e.coalesceMs ?? IAi,
    a = e.durationMs ?? SAi,
    i = () => {
      n = null;
      const o = t;
      if (t = null, !!o) {
        if (e.isInteracting()) {
          t = o, n = e.setTimer(i, r);
          return;
        }
        CAi(e.getView(), o) || e.start(o, a);
      }
    };
  return o => {
    t = o, n === null && (n = e.setTimer(i, r));
  };
}

const TAi = new Set(["gen-image", "generate-character-image", "generate-scene-image"]),
  MAi = new Set(["gen-video", "motion-control", "generate-character-video", "generate-scene-video"]);

function PAi(e) {
  return TAi.has(e) || MAi.has(e);
}

function RAi(e, t, n) {
  const r = new Map(t.map(o => [o.id, o])),
    a = [],
    i = [];
  for (const o of e) {
    const s = r.get(o);
    if (!s) {
      i.push(o);
      continue;
    }
    PAi(s.type) ? a.push(o) : i.push(o);
  }
  return a.length <= 1 ? {
    items: a,
    skipped: i
  } : {
    items: Yjr(a, n),
    skipped: i
  };
}

const j1e = new Set();

let Vdr = new Set();

const vkt = new Set();

function Fcn() {
  Vdr = new Set(j1e), vkt.forEach(e => e());
}

function NAi(e) {
  return vkt.add(e), () => {
    vkt.delete(e);
  };
}

function zcn() {
  return Vdr;
}

function Ucn(e, t) {
  const n = j1e.has(e);
  if (t && !n) {
    j1e.add(e), Fcn();
    return;
  }
  !t && n && (j1e.delete(e), Fcn());
}

function jAi(e) {
  return j1e.has(e);
}

function DAi() {
  return g.useSyncExternalStore(NAi, zcn, zcn);
}

const LAi = ({
    groups: e,
    setGroups: t,
    nodes: n,
    setNodes: r,
    connections: a,
    executeNode: i
  }) => {
    const o = g.useCallback((S, C) => {
        if (S.length === 0) return console.warn("[createGroup] 没有选中任何节点"), null;
        const I = $Wt(WN(S, n)),
          E = {
            id: WK(),
            name: dDr(e),
            color: C || CQ[0],
            nodeIds: [...S],
            frameX: I.x,
            frameY: I.y,
            frameWidth: I.width,
            frameHeight: I.height,
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
        return t(M => [...M, E]), console.log("[createGroup] 创建分组:", E), E;
      }, [e, n, t]),
      s = g.useCallback((S, C, I) => {
        if (S.length === 0) return console.warn("[createCollection] 没有选中任何节点"), null;
        const E = {
          id: WK(),
          name: C ?? nDr(e),
          color: CQ[0],
          nodeIds: [...S],
          collapsed: !0,
          stackMode: "folder",
          collapsedX: I == null ? void 0 : I.x,
          collapsedY: I == null ? void 0 : I.y,
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        return t(M => [...M, E]), console.log("[createCollection] 收纳:", E.name, E.nodeIds.length, "个节点"), E;
      }, [e, t]),
      l = g.useCallback((S, C) => {
        if (S.length < 2) return console.warn("[createStackCard] 至少需要 2 个节点"), null;
        const E = n.filter(j => S.includes(j.id)).map(j => ({
          nodeId: j.id,
          x: j.x,
          y: j.y,
          width: j.width ?? 260,
          height: j.height ?? 200
        }));
        let M = C == null ? void 0 : C.x,
          T = C == null ? void 0 : C.y;
        if (M == null || T == null) {
          const j = WN(S, n);
          M = j.width > 0 ? j.x + j.width / 2 : 200, T = j.height > 0 ? j.y + j.height / 2 : 200;
        }
        const P = {
            id: WK(),
            name: tDr(e),
            color: CQ[0],
            nodeIds: [...S],
            collapsed: !0,
            stackMode: "card",
            collapsedX: M,
            collapsedY: T,
            stackRestoreLayout: E,
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          R = new Set(S);
        return r(j => j.map(B => {
          if (!R.has(B.id)) return B;
          const F = B.width ?? 260,
            N = B.height ?? 200;
          return {
            ...B,
            x: M - F / 2,
            y: T - N / 2
          };
        })), t(j => [...j, P]), console.log("[createStackCard] 折叠:", P.name, P.nodeIds.length, "个节点"), P;
      }, [e, n, t, r]),
      d = g.useCallback((S, C, I) => {
        t(E => {
          const M = E.find(T => T.id === S);
          if ((M == null ? void 0 : M.stackMode) === "card" && M.collapsedX != null && M.collapsedY != null) {
            const T = C - M.collapsedX,
              P = I - M.collapsedY;
            if (T !== 0 || P !== 0) {
              const R = new Set(M.nodeIds);
              r(j => j.map(B => R.has(B.id) ? {
                ...B,
                x: B.x + T,
                y: B.y + P
              } : B));
            }
          }
          return E.map(T => T.id === S ? {
            ...T,
            collapsedX: C,
            collapsedY: I,
            updatedAt: Date.now()
          } : T);
        });
      }, [t, r]),
      u = g.useCallback(S => {
        var M;
        const C = e.find(T => T.id === S);
        if (!C) return;
        const I = C.collapsedX,
          E = C.collapsedY;
        if (C.stackMode === "card" && ((M = C.stackRestoreLayout) != null && M.length)) {
          const T = _8n(C, n, I != null && E != null ? {
              x: I,
              y: E
            } : void 0),
            P = new Map(T.map(R => [R.nodeId, R]));
          r(R => R.map(j => {
            const B = P.get(j.id);
            return B ? {
              ...j,
              x: B.x,
              y: B.y
            } : j;
          }));
        } else if (I != null && E != null) {
          const T = WN(C.nodeIds, n),
            P = T.width > 0 ? T.x + T.width / 2 : I,
            R = T.height > 0 ? T.y + T.height / 2 : E,
            j = I - P,
            B = E - R;
          if (Math.abs(j) > .5 || Math.abs(B) > .5) {
            const F = new Set(C.nodeIds);
            r(N => N.map(G => F.has(G.id) ? {
              ...G,
              x: G.x + j,
              y: G.y + B
            } : G));
          }
        }
        t(T => T.filter(P => P.id !== S)), console.log("[expandCollection] 展开并解组:", S, C.stackMode ?? "folder");
      }, [e, n, t, r]),
      h = g.useCallback(S => {
        t(C => C.filter(I => I.id !== S)), console.log("[deleteGroup] 删除分组:", S);
      }, [t]),
      p = g.useCallback((S, C) => {
        t(I => I.map(E => E.id === S ? {
          ...E,
          name: C,
          updatedAt: Date.now()
        } : E));
      }, [t]),
      m = g.useCallback((S, C) => {
        t(I => I.map(E => E.id === S ? {
          ...E,
          color: C,
          updatedAt: Date.now()
        } : E));
      }, [t]),
      f = g.useCallback(S => {
        t(C => C.map(I => I.id === S ? {
          ...I,
          previewCollapsed: !I.previewCollapsed,
          updatedAt: Date.now()
        } : I));
      }, [t]),
      y = g.useCallback((S, C) => {
        t(I => I.map(E => {
          if (E.id !== S) return E;
          const M = [...new Set([...E.nodeIds, ...C])];
          if (E.collapsed) return {
            ...E,
            nodeIds: M,
            updatedAt: Date.now()
          };
          const T = $Wt(WN(M, n));
          return {
            ...E,
            nodeIds: M,
            frameX: T.x,
            frameY: T.y,
            frameWidth: T.width,
            frameHeight: T.height,
            updatedAt: Date.now()
          };
        }));
      }, [n, t]),
      b = g.useCallback((S, C) => {
        t(I => I.map(E => {
          if (E.id === S) {
            const M = E.nodeIds.filter(T => !C.includes(T));
            return {
              ...E,
              nodeIds: M,
              updatedAt: Date.now()
            };
          }
          return E;
        }).filter(E => E.nodeIds.length > 0));
      }, [t]),
      v = g.useCallback(S => {
        const C = S && S.size > 0 ? n.map(I => {
          const E = S.get(I.id);
          return E ? {
            ...I,
            x: E.x,
            y: E.y
          } : I;
        }) : n;
        t(I => I.map(E => {
          if (E.collapsed) return E;
          const M = Wae(E, C);
          if (!(E.frameX != null && E.frameY != null && E.frameWidth != null && E.frameHeight != null && E.frameWidth > 0 && E.frameHeight > 0)) {
            const R = [...new Set([...E.nodeIds, ...M])];
            return R.length === E.nodeIds.length && R.every(j => E.nodeIds.includes(j)) ? E : {
              ...E,
              nodeIds: R,
              updatedAt: Date.now()
            };
          }
          const P = [...E.nodeIds.filter(R => M.includes(R)), ...M.filter(R => !E.nodeIds.includes(R))];
          return P.length === E.nodeIds.length && P.every((R, j) => R === E.nodeIds[j]) ? E : {
            ...E,
            nodeIds: P,
            updatedAt: Date.now()
          };
        }).filter(E => E.collapsed || E.nodeIds.length > 0));
      }, [n, t]),
      _ = g.useRef(new Set()),
      w = g.useCallback(async S => {
        if (jAi(S)) {
          _.current.add(S);
          return;
        }
        const C = e.find(T => T.id === S);
        if (!C) {
          console.warn("[executeGroup] 分组不存在:", S);
          return;
        }
        if (!i) {
          console.warn("[executeGroup] executeNode 函数未提供");
          return;
        }
        const I = Wae(C, n),
          E = [...C.nodeIds.filter(T => I.includes(T)), ...I.filter(T => !C.nodeIds.includes(T))],
          {
            items: M
          } = RAi(E, n, a);
        if (M.length === 0) {
          console.warn("[executeGroup] 氛围框内没有可执行的图片/视频节点:", C.name);
          return;
        }
        _.current.delete(S), Ucn(S, !0);
        try {
          for (let T = 0; T < M.length && !_.current.has(S); T++) {
            const P = M[T];
            try {
              await i(P);
            } catch (R) {
              console.error("[executeGroup] 节点执行失败:", P, R);
            }
            T < M.length - 1 && !_.current.has(S) && (await new Promise(R => setTimeout(R, 50)));
          }
        } finally {
          _.current.delete(S), Ucn(S, !1);
        }
      }, [e, n, a, i]),
      k = g.useCallback((S, C, I) => {
        const E = e.find(T => T.id === S);
        if (!E) return;
        const M = new Set(Wae(E, n));
        r(T => T.map(P => M.has(P.id) ? {
          ...P,
          x: P.x + C,
          y: P.y + I
        } : P));
      }, [e, n, r]),
      A = g.useCallback(S => {
        const C = e.find(I => I.id === S);
        return C ? WN(C.nodeIds, n) : null;
      }, [e, n]);
    return {
      createGroup: o,
      createCollection: s,
      createStackCard: l,
      expandCollection: u,
      updateCollectionPosition: d,
      deleteGroup: h,
      updateGroupName: p,
      updateGroupColor: m,
      toggleGroupPreviewCollapsed: f,
      addNodesToGroup: y,
      removeNodesFromGroup: b,
      syncGroupMembershipByFrame: v,
      executeGroup: w,
      moveGroup: k,
      getGroupBounds: A
    };
  },
  OAi = () => {
    const [e, t] = g.useState(!1);
    return g.useEffect(() => {
      const n = i => {
          i.key === "Shift" && t(!0);
        },
        r = i => {
          i.key === "Shift" && t(!1);
        },
        a = () => {
          t(!1);
        };
      return window.addEventListener("keydown", n), window.addEventListener("keyup", r), window.addEventListener("blur", a), () => {
        window.removeEventListener("keydown", n), window.removeEventListener("keyup", r), window.removeEventListener("blur", a);
      };
    }, []), e;
  },
  BAi = new Set(["input-image", "gen-image", "gen-video", "text-node"]);

function FAi(e) {
  return BAi.has(e.type) ? e.type === "input-image" ? !!(e.content && String(e.content).length > 0) : !0 : !1;
}

function zAi(e) {
  const t = KLe(e.id);
  if (t && t.width >= 10 && t.height >= 10) return t;
  const n = e.width ?? 260,
    r = e.height ?? 200;
  return {
    x: e.x,
    y: e.y,
    width: n,
    height: r
  };
}

function _Ft(e) {
  if (e.length === 0) return null;
  let t = 1 / 0,
    n = 1 / 0,
    r = -1 / 0,
    a = -1 / 0;
  if (e.forEach(s => {
    const l = zAi(s);
    t = Math.min(t, l.x), n = Math.min(n, l.y), r = Math.max(r, l.x + l.width), a = Math.max(a, l.y + l.height);
  }), !Number.isFinite(t) || !Number.isFinite(r)) return null;
  const i = r - t,
    o = a - n;
  return {
    minX: t,
    minY: n,
    maxX: r,
    maxY: a,
    centerX: (t + r) / 2,
    centerY: (n + a) / 2,
    bounds: {
      x: t,
      y: n,
      width: i,
      height: o
    }
  };
}

function Hdr(e) {
  return e.filter(FAi);
}

const UAi = ({
    nodes: e,
    selectedNodeIds: t,
    isActive: n
  }) => g.useMemo(() => {
    if (!n || t.size < 2) return null;
    const a = e.filter(h => t.has(h.id)),
      i = Hdr(a);
    if (i.length < 2) return null;
    const o = _Ft(i);
    if (!o) return null;
    const {
        bounds: s,
        maxX: l,
        minY: d
      } = o,
      u = {
        x: l + 30,
        y: d + s.height / 2
      };
    return {
      nodeIds: [...new Set(i.map(h => h.id))],
      bounds: s,
      dialPosition: u
    };
  }, [e, t, n]),
  $Ai = ({
    nodes: e,
    selectedNodeIds: t,
    isActive: n
  }) => g.useMemo(() => {
    if (!n || t.size < 2) return null;
    const a = e.filter(u => t.has(u.id));
    if (a.length < 2) return null;
    const i = _Ft(a);
    if (!i) return null;
    const {
        bounds: o,
        minX: s,
        minY: l
      } = i,
      d = {
        x: s - 30,
        y: l + o.height / 2
      };
    return {
      nodeIds: [...new Set(a.map(u => u.id))],
      bounds: o,
      dialPosition: d
    };
  }, [e, t, n]);

function GAi(e, t) {
  if (t.length < 2) return null;
  const n = new Set(t),
    r = e.filter(a => n.has(a.id));
  return r.length < 2 ? null : {
    bounds: _Ft(r)
  };
}

function VAi(e, t) {
  return e && (t ?? e.centerX) < e.centerX ? "reverse" : "forward";
}

function HAi(e, t, n) {
  if (!n || t.size < 2) return null;
  const r = e.filter(i => t.has(i.id)),
    a = [...new Set(Hdr(r).map(i => i.id))];
  return a.length >= 2 ? a : null;
}

function WAi(e) {
  var t;
  return !!(e.visible && e.stickyConnectionMenu && ((t = e.sourceNodeIds) != null && t.length || e.sourceNodeId || e.targetNodeId));
}

function qAi(e, t, n, r) {
  return !r && (e && !t || n);
}

function KAi(e) {
  const t = OAi(),
    n = g.useRef(e),
    r = g.useRef(!1),
    [a, i] = g.useState(null),
    o = g.useRef(null),
    s = g.useRef(null),
    l = g.useRef(null),
    d = g.useSyncExternalStore(e.document.subscribe, () => e.document.current().token),
    u = g.useMemo(() => e.document.lease(), [e.document, d]);
  g.useLayoutEffect(() => {
    n.current = e;
  });
  const h = g.useCallback(A => {
      o.current !== A && (o.current = A, i(A));
    }, []),
    p = g.useCallback(() => {
      s.current = null, l.current = null, h(null);
    }, [h]);
  g.useLayoutEffect(() => {
    r.current = !0;
    const A = e.document.subscribe(() => {
      p(), n.current.clearPreview();
    });
    return () => {
      r.current = !1, A(), s.current = null, l.current = null;
    };
  }, [e.document, p]);
  const m = g.useCallback(A => {
      if (!r.current || !u.isCurrent() || !t) return;
      const S = n.current;
      if (!A && S.selecting) return;
      const C = GAi(S.nodes, A ?? [...S.selectedNodeIds]);
      if (!C) return;
      const I = s.current ? S.projectPointer(s.current) : l.current;
      I && (l.current = I), h(VAi(C.bounds, I == null ? void 0 : I.x));
    }, [u, t, h]),
    f = WAi(e.menu);
  g.useEffect(() => {
    !t || !e.selectedNodeIds.size || !u.isCurrent() ? h(null) : m();
  }, [t, e.nodes, e.selectedNodeIds, e.selecting, u, m, h]);
  const y = g.useRef(t);
  g.useEffect(() => {
    const A = y.current;
    y.current = t, qAi(A, t, !e.selectedNodeIds.size, f) && n.current.clearPreview();
  }, [t, e.selectedNodeIds, f]);
  const b = UAi({
      nodes: e.nodes,
      selectedNodeIds: e.selectedNodeIds,
      isActive: a === "forward" && !e.showBoxBounds
    }),
    v = $Ai({
      nodes: e.nodes,
      selectedNodeIds: e.selectedNodeIds,
      isActive: a === "reverse"
    }),
    _ = g.useMemo(() => HAi(e.nodes, e.selectedNodeIds, e.showBoxBounds), [e.nodes, e.selectedNodeIds, e.showBoxBounds]),
    w = u.isCurrent() && !e.selecting && t && e.selectedNodeIds.size >= 2,
    k = g.useMemo(() => ({
      client: s,
      world: l,
      candidateEnabled: w
    }), [w]);
  return {
    forwardSelection: b,
    reverseSelection: v,
    boxSourceIds: _,
    reverseActive: a === "reverse",
    sync: m,
    reset: p,
    pointer: k
  };
}

function QAi(e) {
  return e === "doodle";
}

function YAi(e, t) {
  return {
    emptyState: {
      nodeCount: t.nodeCount,
      emptyStateDismissed: e.emptyStateDismissed,
      projectBar: t.projectBar
    }
  };
}

function XAi(e) {
  const [t, n] = g.useState(!1);
  g.useEffect(() => {
    QAi(e.activeTool) && n(!0);
  }, [e.activeTool]);
  const r = g.useCallback(() => {
    n(!0);
  }, []);
  return {
    emptyStateDismissed: t,
    setEmptyStateDismissed: n,
    dismissEmptyState: r
  };
}

function JAi(e) {
  e.abortActiveDownloadUi(), e.refreshProjectList(), e.clearCanvas({
    toastMessage: null
  });
}

function ZAi({
  isAgentMode: e,
  openProject: t,
  createNewCanvas: n,
  setAgentMode: r,
  sendAgentPrompt: a,
  projectActions: i
}) {
  const o = g.useRef({
    openProject: t,
    createNewCanvas: n,
    setAgentMode: r,
    sendAgentPrompt: a,
    isAgentMode: e
  });
  o.current = {
    openProject: t,
    createNewCanvas: n,
    setAgentMode: r,
    sendAgentPrompt: a,
    isAgentMode: e
  };
  const s = g.useRef(null),
    l = g.useRef(i);
  l.current = i, g.useEffect(() => eya({
    rename: (d, u) => l.current.rename(d, u),
    delete: d => l.current.delete(d),
    close: d => {
      var u, h;
      return ((h = (u = l.current).close) == null ? void 0 : h.call(u, d)) ?? Promise.resolve();
    }
  }), []), g.useEffect(() => {
    const d = () => {
      const u = Hla();
      if (u.type !== "none") {
        if (u.type === "open-project") {
          const h = o.current.openProject(u.id, u.name, u.fromCloud ? "cloud" : "switcher");
          if (u.fromCloud) {
            const p = u.id;
            Promise.resolve(h).then(m => {
              m !== !1 && (Ghe(p), Dx());
            });
          }
          u.prompt && (o.current.isAgentMode ? o.current.sendAgentPrompt(u.prompt) : (s.current = {
            text: u.prompt,
            send: !0
          }, o.current.setAgentMode()));
          return;
        }
        if (u.type === "new-canvas") {
          o.current.createNewCanvas();
          return;
        }
        if (o.current.isAgentMode) {
          o.current.sendAgentPrompt(u.text);
          return;
        }
        s.current = {
          text: u.text,
          send: !0
        }, o.current.setAgentMode();
      }
    };
    return d(), BNt(d);
  }, []), g.useEffect(() => {
    if (!e || !s.current) return;
    const d = s.current;
    s.current = null, d.send && a(d.text);
  }, [e, a]);
}

const eSi = g.lazy(() => Ie(() => Promise.resolve().then(() => Xso), void 0, import.meta.url));

function tSi(e) {
  const {
      view: t
    } = M3(),
    [n, r] = g.useState(t === "generation"),
    [a, i] = g.useState(null);
  return g.useEffect(() => {
    t === "generation" && r(!0), i(t === "generation" ? document.getElementById("studio-generation-host") : null);
  }, [t]), n ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(eSi, {
      ...e,
      host: a
    })
  }) : null;
}

function nSi({
  apiConfigs: e,
  globalApiKey: t,
  history: n,
  setHistory: r
}) {
  const [a, i] = g.useState([]),
    [o, s] = g.useState([]),
    [l] = g.useState(Ape),
    d = g.useRef(new Map()),
    u = g.useRef(new Set()),
    h = g.useRef(new Set()),
    p = g.useRef(new Set()),
    m = POn(),
    f = g.useRef({
      history: n,
      apiConfigs: e,
      globalApiKey: t
    });
  f.current = {
    history: n,
    apiConfigs: e,
    globalApiKey: t
  }, g.useEffect(() => (l.activate(), l.commit("harness-images", !1), () => l.dispose()), [l]), g.useEffect(() => S9r(A => Cz(A, !0)), []), g.useEffect(() => {
    const A = S => {
      const {
        id: C,
        scope: I
      } = S.detail;
      r(E => E.filter(M => {
        var T;
        return M.id !== C || ((T = M.harnessImage) == null ? void 0 : T.scope) !== I;
      })), d.current.delete(C);
    };
    return window.addEventListener(Hgt, A), () => window.removeEventListener(Hgt, A);
  }, [r]), g.useEffect(() => {
    Cz(n.filter(A => d.current.has(A.id)));
    for (const A of n) A.harnessImage && A.status !== "generating" && h.current.delete(A.id);
  }, [n]);
  const y = g.useCallback(A => r(S => (typeof A == "function" ? A(S) : A).map(I => {
      const E = d.current.get(I.id);
      return E && !I.harnessImage ? {
        ...I,
        harnessImage: {
          ...E,
          phase: "running"
        }
      } : I;
    })), [r]),
    b = g.useMemo(() => new Map(a.map(A => [A.id, A])), [a]),
    v = Epe({
      connections: o,
      nodesMap: b,
      dataVersion: 0
    }),
    _ = g.useCallback((A, S) => i(C => C.map(I => I.id === A ? eee(I, S, !1) : I)), []),
    {
      generate: w,
      generationRunner: k
    } = Ipe({
      apiConfigs: e,
      globalApiKey: t,
      nodes: a,
      nodesMap: b,
      connections: o,
      setNodes: i,
      setHistory: y,
      updateNode: _,
      generateId: () => crypto.randomUUID(),
      canvasBackground: !1,
      getConnectedInputImages: v.connections.getConnectedInputImages,
      getConnectedInputItems: v.connections.getConnectedInputItems,
      getConnectedImageForInput: v.connections.getConnectedImageForInput
    }, l);
  return g.useEffect(() => rZr({
    submit: A => {
      A.history.forEach(S => d.current.set(S.id, S.harnessImage)), Da.flushSync(() => {
        i(S => [...S, ...A.nodes]), s(S => [...S, ...A.connections]), r(S => [...A.history, ...S.filter(C => !A.history.some(I => I.id === C.id))]);
      });
    },
    refresh: async A => {
      var N, G, z, V, O;
      if (h.current.has(A.id)) return;
      if (!A.remoteTaskId) throw new Error("尚未记录远程任务 ID，无法确认受理状态；不会自动重新提交");
      const S = ((N = A.apiConfig) == null ? void 0 : N.modelId) || ((G = A.harnessImage) == null ? void 0 : G.modelId) || "";
      if (S.startsWith("jimeng-cli-")) {
        const {
            refreshJimengCliHistory: L
          } = await Ie(async () => {
            const {
              refreshJimengCliHistory: U
            } = await Promise.resolve().then(() => vUt);
            return {
              refreshJimengCliHistory: U
            };
          }, void 0, import.meta.url),
          D = l.lease();
        do await L(A, y, i, []), await new Promise(U => window.setTimeout(U, 5e3)); while (D.isCurrent() && ((z = y9t().find(U => U.item.id === A.id)) == null ? void 0 : z.item.status) === "generating");
        return;
      }
      const {
        resolveFalImageHistoryModelPath: C,
        refreshFalImageHistory: I
      } = await Ie(async () => {
        const {
          resolveFalImageHistoryModelPath: L,
          refreshFalImageHistory: D
        } = await Promise.resolve().then(() => b0r);
        return {
          resolveFalImageHistoryModelPath: L,
          refreshFalImageHistory: D
        };
      }, void 0, import.meta.url);
      if (!C(A)) throw new Error("此渠道暂不支持在对话中恢复查询，请在生成历史中查询原任务");
      const E = f.current.apiConfigs.find(L => L.id === S),
        {
          resolveModelConfigApiKey: M
        } = await Ie(async () => {
          const {
            resolveModelConfigApiKey: L
          } = await Promise.resolve().then(() => _$r);
          return {
            resolveModelConfigApiKey: L
          };
        }, void 0, import.meta.url),
        T = await I(A, {
          apiKey: ((V = A.apiConfig) == null ? void 0 : V.apiKey) || M(E, f.current.globalApiKey),
          baseUrl: ((O = A.apiConfig) == null ? void 0 : O.baseUrl) || (E == null ? void 0 : E.url)
        }),
        {
          resolveGenImageCompletion: P,
          buildHistoryItemPatchFromGlobalOss: R
        } = await Ie(async () => {
          const {
            resolveGenImageCompletion: L,
            buildHistoryItemPatchFromGlobalOss: D
          } = await Promise.resolve().then(() => ii);
          return {
            resolveGenImageCompletion: L,
            buildHistoryItemPatchFromGlobalOss: D
          };
        }, void 0, import.meta.url),
        j = await P(T.urls, A.id, {
          model: S
        }),
        B = T.urls.map((L, D) => D ? `${A.id}_${D}` : A.id);
      if (!j.usedOss) {
        const {
          downloadUrlToLocal: L
        } = await Ie(async () => {
          const {
            downloadUrlToLocal: D
          } = await Promise.resolve().then(() => No);
          return {
            downloadUrlToLocal: D
          };
        }, void 0, import.meta.url);
        for (const [D, U] of T.urls.entries()) await L(U, B[D]);
      }
      const F = j.ossPack ? R(j.ossPack, {
        type: "image",
        mjImages: j.remoteUrls,
        mjThumbnails: j.displayUrls
      }) : {
        url: j.primaryDisplayUrl,
        _assetId: A.id,
        mjImages: j.displayUrls,
        _mjAssetIds: B
      };
      y(L => L.map(D => D.id === A.id ? {
        ...D,
        ...F,
        status: "completed",
        progress: 100,
        errorMsg: void 0
      } : D));
    }
  }), [r, y, l]), g.useEffect(() => {
    var A;
    for (const S of a) {
      const C = (A = S.settings) == null ? void 0 : A.harnessImageHistoryId;
      !C || u.current.has(C) || (u.current.add(C), h.current.add(C), Promise.resolve().then(() => w(S)).catch(I => {
        const E = I instanceof Error ? I.message : "图片生成失败";
        y(M => M.map(T => T.id === C ? {
          ...T,
          status: "failed",
          errorMsg: E
        } : T));
      }).finally(() => {
        VCe(C) || h.current.delete(C), i(I => [...I]);
      }));
    }
  }, [a, w, y]), g.useEffect(() => {
    const A = a.filter(C => {
      var I;
      return ((I = C.settings) == null ? void 0 : I.harnessImageHistoryId) && C.errorMsg;
    });
    if (!A.length) return;
    const S = new Map(A.map(C => [C.settings.harnessImageHistoryId, C.errorMsg]));
    n.some(C => C.status === "generating" && S.has(C.id)) && y(C => C.map(I => I.status === "generating" && S.has(I.id) ? {
      ...I,
      status: "failed",
      errorMsg: S.get(I.id)
    } : I));
  }, [a, n, y]), g.useEffect(() => {
    for (const A of m) {
      if (!A.recovered && !u.current.has(A.item.id) || A.item.status !== "generating" || h.current.has(A.item.id) || p.current.has(A.item.id)) continue;
      const S = n.find(C => C.id === A.item.id);
      S && S.status !== "generating" || (p.current.add(A.item.id), d.current.set(A.item.id, A.item.harnessImage), r(C => C.some(I => I.id === A.item.id) ? C : [...C, A.item]), NOn(A.item.id, A.item.harnessImage.scope));
    }
  }, [m, a, n, r]), a.length ? k : null;
}

const rSi = g.lazy(() => Ie(() => Promise.resolve().then(() => Blo), void 0, import.meta.url)),
  aSi = g.lazy(() => Ie(() => Promise.resolve().then(() => Bco), void 0, import.meta.url));

function iSi({
  apiConfigs: e,
  scriptApiConfigs: t,
  globalApiKey: n,
  history: r,
  setHistory: a,
  getCanvasNodes: i,
  onSendScriptToCanvas: o,
  onSendMediaToCanvas: s
}) {
  const {
      view: l
    } = M3(),
    [d, u] = g.useState(l === "toolbox"),
    [h, p] = g.useState(null),
    [m, f] = g.useState(l === "inspiration"),
    [y, b] = g.useState(null);
  return g.useEffect(() => {
    l === "toolbox" && u(!0), l === "inspiration" && f(!0), p(document.getElementById("studio-toolbox-host")), b(document.getElementById("studio-inspiration-host"));
  }, [l]), c.jsxs(c.Fragment, {
    children: [c.jsx(g.Suspense, {
      fallback: null,
      children: d && c.jsx(rSi, {
        onSendMediaToCanvas: s,
        onSendScriptToCanvas: o,
        getCanvasNodes: i,
        host: h,
        apiConfigs: e,
        scriptApiConfigs: t,
        globalApiKey: n,
        history: r,
        setHistory: a
      })
    }), m && y && Da.createPortal(c.jsx(g.Suspense, {
      fallback: c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: "正在打开灵感库…"
      }),
      children: c.jsx(aSi, {
        active: l === "inspiration",
        onSendToCanvas: o
      })
    }), y)]
  });
}

function oSi(e) {
  var r;
  const t = typeof e.content == "string" ? e.content.trim() : "",
    n = (r = e.settings) == null ? void 0 : r.imageUrl;
  return t || (typeof n == "string" ? n.trim() : "");
}

function $cn(e) {
  var a, i;
  const t = e._contentAssetId;
  if (typeof t == "string" && t.trim()) return t.trim();
  const n = (a = e.settings) == null ? void 0 : a._assetId;
  if (typeof n == "string" && n.trim()) return n.trim();
  const r = (i = e.settings) == null ? void 0 : i._contentAssetId;
  if (typeof r == "string" && r.trim()) return r.trim();
}

function sSi(e) {
  var n, r, a;
  const t = [];
  for (const i of e) {
    if (i.type === "input-image") {
      const o = oSi(i);
      if (!o) continue;
      const s = ((n = i.settings) == null ? void 0 : n.mediaType) === "video" || Sh(o);
      t.push({
        id: `canvas-${i.id}`,
        name: i.nodeName || (s ? "画布视频" : "画布图片"),
        category: "从画布上选择",
        thumbnailUrl: xf(i) || o,
        fromCanvas: !0,
        sourceCanvasNodeId: i.id,
        canvasAssetId: $cn(i),
        canvasImageUrl: o,
        canvasSourceUrl: String(((r = i.settings) == null ? void 0 : r._codexSourceUrl) || ((a = i.settings) == null ? void 0 : a._ossRemoteUrl) || "").trim() || void 0,
        canvasSourceNodeType: "input-image",
        canvasMediaKind: s ? "video" : "image"
      });
      continue;
    }
    if (i.type === "gen-image" || i.type === "gen-video") {
      const o = Xl(i);
      if (!(o != null && o.url)) continue;
      const s = i.type === "gen-video" || Sh(o.url);
      t.push({
        id: `canvas-${i.id}`,
        name: i.nodeName || (i.type === "gen-video" ? "画布 AI 视频" : "画布 AI 绘画"),
        category: "从画布上选择",
        thumbnailUrl: xf(i) || o.url,
        fromCanvas: !0,
        sourceCanvasNodeId: i.id,
        canvasAssetId: o.assetId || $cn(i),
        canvasImageUrl: o.url,
        canvasSourceNodeType: i.type === "gen-image" ? "gen-image" : "gen-video",
        canvasMediaKind: s ? "video" : "image"
      });
    }
  }
  return t;
}

const Gcn = ["history", "characters", "kling-subjects", "rh-app-library", "project", "material", "pose", "production-center", "project-memory"];

function lSi(e, t, n = r => r()) {
  const r = {};
  for (const a of Gcn) r[a] = i => {
    if (i == null || i.preventDefault(), i == null || i.stopPropagation(), a === "pose" || a === "material") {
      e[a].toggle();
      return;
    }
    (a === "characters" || a === "kling-subjects" || a === "rh-app-library") && t(a), n(() => {
      for (const o of Gcn) o !== a && e[o].close();
      e[a].toggle();
    });
  };
  return r;
}

const kte = e => ({
  close: () => e(!1),
  toggle: () => e(t => !t)
});

function cSi({
  setHistoryOpen: e,
  setCharactersOpen: t,
  setKlingSubjectsOpen: n,
  setRhAppLibraryOpen: r,
  setProjectPanelOpen: a,
  setMaterialLibraryOpen: i,
  setPoseLibraryOpen: o,
  setActiveTool: s
}) {
  return g.useMemo(() => lSi({
    history: {
      close: () => e(!1),
      toggle: Dga
    },
    characters: kte(t),
    "kling-subjects": kte(n),
    "rh-app-library": kte(r),
    project: kte(a),
    material: kte(i),
    pose: kte(o),
    "production-center": {
      close: vUe,
      toggle: () => E_t().open ? vUe() : qP("current")
    },
    "project-memory": {
      close: I1e,
      toggle: () => B_t().open ? I1e() : fyi("personal")
    }
  }, s, p$.batch), [e, t, n, r, a, i, o, s]);
}

let Vcn = !1;

function wkt(e) {
  if (typeof document > "u") return;
  const t = document.documentElement;
  if (Vcn = e, e) {
    t.dataset.projectPanelOpen = "true", delete t.dataset.projectToolbarSnap;
    return;
  }
  t.dataset.projectToolbarSnap = "true", delete t.dataset.projectPanelOpen, requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      Vcn || delete t.dataset.projectToolbarSnap;
    });
  });
}

function dSi() {
  const [e, t] = g.useState(!1),
    n = g.useRef(!1),
    r = g.useCallback(a => {
      const i = typeof a == "function" ? a(n.current) : a;
      i !== n.current && (n.current = i, wkt(i), t(i));
    }, []);
  return [e, r];
}

const xkt = "material-library-path-remapped";

function uSi(e) {
  return e.replace(/[/\\]+$/, "");
}

function IW(e) {
  return uSi(e).replace(/\//g, "\\");
}

function CJe(e, t, n, r) {
  if (!e || !t || !n) return e;
  const a = IW(t),
    i = IW(n),
    o = IW(e);
  if (r != null && r.directory) {
    if (o.toLowerCase() === a.toLowerCase()) return i;
    const s = `${a}\\`;
    return o.toLowerCase().startsWith(s.toLowerCase()) ? i + o.slice(a.length) : e;
  }
  return o.toLowerCase() === a.toLowerCase() ? i : e;
}

function hSi(e) {
  return e.replace(/\\/g, "/").split("/").pop() || e;
}

function kye(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}

async function pSi(e, t, n) {
  const r = await QCt();
  if (r == null) return 0;
  let a = [],
    i,
    o = 1,
    s;
  if (Array.isArray(r)) a = r;else if (kye(r)) Array.isArray(r.roles) && (a = r.roles), kye(r.config) && (i = r.config), typeof r.version == "number" && (o = r.version), typeof r.updatedAt == "string" && (s = r.updatedAt);else return 0;
  const l = (n == null ? void 0 : n.newFileName) || hSi(t);
  let d = 0;
  const u = a.map(p => {
    if (!kye(p) || !Array.isArray(p.assets)) return p;
    let m = !1;
    const f = p.assets.map(y => {
      if (!kye(y) || typeof y.path != "string") return y;
      const b = CJe(y.path, e, t, {
        directory: n == null ? void 0 : n.directory
      });
      if (b === y.path) return y;
      m = !0, d += 1;
      const v = typeof y.id == "string" ? y.id : "",
        _ = v.toLowerCase() === IW(y.path).toLowerCase() || v.toLowerCase() === IW(e).toLowerCase(),
        w = !(n != null && n.directory) && IW(y.path).toLowerCase() === IW(e).toLowerCase() ? l : typeof y.name == "string" ? y.name : l;
      return {
        ...y,
        path: b,
        id: _ ? b : v,
        name: w
      };
    });
    return m ? {
      ...p,
      assets: f,
      updatedAt: Date.now()
    } : p;
  });
  if (d === 0) return 0;
  const h = {
    version: o,
    roles: u,
    ...(i ? {
      config: i
    } : {}),
    updatedAt: s ?? new Date().toISOString()
  };
  return await KCt(JSON.stringify(h, null, 2)), d;
}

async function mSi(e, t, n) {
  const r = await Ur.loadMaterialLibrarySidebarState();
  if (!(r != null && r.roots) || typeof r.roots != "object") return !1;
  let a = !1;
  const i = {};
  for (const [o, s] of Object.entries(r.roots)) {
    if (!kye(s)) {
      i[o] = s;
      continue;
    }
    const d = (Array.isArray(s.expandedPaths) ? s.expandedPaths : []).map(u => {
      if (typeof u != "string") return u;
      const h = CJe(u, e, t, {
        directory: n == null ? void 0 : n.directory
      });
      return h !== u && (a = !0), h;
    });
    i[o] = {
      ...s,
      expandedPaths: d
    };
  }
  return a ? (await Ur.saveMaterialLibrarySidebarState({
    ...r,
    roots: i,
    updatedAt: new Date().toISOString()
  }), !0) : !1;
}

async function fSi(e, t, n) {
  const r = await Ur.loadMaterialCategoryState();
  if (!(r != null && r.itemCategoryMap) || typeof r.itemCategoryMap != "object") return !1;
  const a = {};
  let i = !1;
  for (const [o, s] of Object.entries(r.itemCategoryMap)) {
    const l = CJe(o, e, t, {
      directory: n == null ? void 0 : n.directory
    });
    l !== o && (i = !0), a[l] = s;
  }
  return i ? (await Ur.saveMaterialCategoryState({
    ...r,
    itemCategoryMap: a,
    updatedAt: new Date().toISOString()
  }), !0) : !1;
}

async function AMe(e, t, n) {
  !e || !t || e === t || (await pSi(e, t, n), await mSi(e, t, n), await fSi(e, t, n), typeof window < "u" && window.dispatchEvent(new CustomEvent(xkt, {
    detail: {
      oldPath: e,
      newPath: t,
      isDirectory: n == null ? void 0 : n.directory
    }
  })));
}

function gSi(e) {
  const t = new Map(),
    n = new Map();
  let r = !0;
  const a = l => {
      var d;
      (d = l == null ? void 0 : l.primary) != null && d.startsWith("blob:") && e.release(l.primary);
    },
    i = l => {
      n.delete(l), a(t.get(l)), t.delete(l);
    },
    o = () => {
      n.clear(), t.forEach(a), t.clear();
    };
  return {
    get: l => {
      const d = l.path;
      if (!r) return Promise.resolve(null);
      const u = n.get(d);
      if (u) return u;
      const h = Promise.resolve().then(async () => {
        const p = () => r && n.get(d) === h;
        if (!p()) return null;
        const m = t.get(d);
        if (m != null && m.primary) {
          const y = await e.isInvalid(d, m.primary);
          if (!p()) return null;
          if (!y) return m.primary;
          a(m), t.delete(d);
        }
        const f = await e.load(l);
        return p() ? f.primary ? (f.primary.startsWith("blob:") && e.protect(f.primary), t.set(d, f), f.primary) : null : (a(f), null);
      }).finally(() => {
        n.get(d) === h && n.delete(d);
      });
      return n.set(d, h), h;
    },
    clear: i,
    clearAll: o,
    getFallback: l => {
      var d;
      return ((d = t.get(l)) == null ? void 0 : d.fallback) ?? null;
    },
    activate: () => {
      r = !0;
    },
    dispose: () => {
      r = !1, o();
    }
  };
}

function ySi() {
  const [e] = g.useState(() => gSi({
    load: async t => {
      const {
        resolveMaterialLibraryPreviewCandidates: n
      } = await Ie(async () => {
        const {
          resolveMaterialLibraryPreviewCandidates: r
        } = await Promise.resolve().then(() => U1);
        return {
          resolveMaterialLibraryPreviewCandidates: r
        };
      }, void 0, import.meta.url);
      return n(t);
    },
    isInvalid: jtr,
    protect: ij,
    release: t => {
      R$a(t);
      try {
        URL.revokeObjectURL(t);
      } catch {}
    }
  }));
  return g.useLayoutEffect(() => (e.activate(), e.dispose), [e]), e;
}

function bSi(e) {
  const t = new Map(),
    n = new Map(),
    r = new Map(),
    a = [],
    i = (o, s) => {
      t.set(o.path, o), n.set(o.path, s), a.push(o);
      for (const l of o.assets) r.has(l.path) || r.set(l.path, l);
      for (const l of o.children) i(l, o);
    };
  return i(e, null), {
    folderByPath: t,
    parentByPath: n,
    assetByPath: r,
    allFolders: a
  };
}

const Hcn = ({
  rootPath: e,
  rootGeneration: t,
  tree: n,
  index: r
}) => ({
  rootPath: e,
  rootGeneration: t,
  tree: n,
  index: r
});

function vSi(e, t) {
  let n = {
      rootPath: e,
      rootGeneration: 0,
      tree: null,
      index: null,
      selectedFolderPath: null,
      loading: !1,
      error: null
    },
    r = Hcn(n),
    a = !0,
    i = 0,
    o = -1,
    s = 0;
  const l = new Set(),
    d = f => {
      n = {
        ...n,
        ...f
      }, (n.rootPath !== r.rootPath || n.rootGeneration !== r.rootGeneration || n.tree !== r.tree || n.index !== r.index) && (r = Hcn(n)), l.forEach(y => y());
    },
    u = () => {
      i++, n.loading && d({
        loading: !1
      });
    };
  return {
    getSnapshot: () => n,
    getDocumentSnapshot: () => r,
    subscribe: f => (l.add(f), () => {
      l.delete(f);
    }),
    setRootPath: f => {
      const y = typeof f == "function" ? f(n.rootPath) : f;
      y !== n.rootPath && (i++, s++, t.clearPreviews(), d({
        rootPath: y,
        rootGeneration: n.rootGeneration + 1,
        tree: null,
        index: null,
        selectedFolderPath: null,
        loading: !1,
        error: null
      }));
    },
    setSelectedFolderPath: f => {
      const y = typeof f == "function" ? f(n.selectedFolderPath) : f;
      y !== n.selectedFolderPath && (s++, d({
        selectedFolderPath: y
      }));
    },
    bindRefresh: () => {
      const f = n.rootPath,
        y = n.rootGeneration;
      return async b => {
        var k;
        if (!a || !f || y !== n.rootGeneration) return;
        const v = ++i,
          _ = s,
          w = () => a && v === i && y === n.rootGeneration;
        t.clearPreviews(), d({
          loading: !0,
          error: null
        });
        try {
          if (await Promise.resolve(), !w()) return;
          const A = await t.load(f);
          if (!w()) return;
          const S = bSi(A),
            C = n.selectedFolderPath,
            I = M => M && S.folderByPath.has(M) ? M : null,
            E = (s !== _ ? I(C) : null) || I(b) || I(C) || ((k = A.children[0]) == null ? void 0 : k.path) || A.path;
          return o = v, d({
            tree: A,
            index: S,
            selectedFolderPath: E,
            loading: !1,
            error: null
          }), w() ? (t.afterScan && Promise.resolve().then(() => {
            if (w()) return t.afterScan(S.allFolders, w);
          }).catch(() => {}), S.allFolders) : void 0;
        } catch (A) {
          w() && d({
            loading: !1,
            error: A instanceof Error ? A.message : "加载素材库失败"
          });
          return;
        }
      };
    },
    cancel: u,
    isCurrentScanResult: f => {
      var y;
      return a && o === i && ((y = n.index) == null ? void 0 : y.allFolders) === f;
    },
    activate: () => {
      a = !0;
    },
    dispose: () => {
      a = !1, u();
    }
  };
}

function wSi(e, t, n) {
  const [r] = g.useState(() => vSi(e(), n)),
    a = g.useSyncExternalStore(r.subscribe, r.getDocumentSnapshot, r.getDocumentSnapshot),
    i = g.useMemo(() => r.bindRefresh(), [r, a.rootGeneration]);
  return g.useLayoutEffect(() => (r.activate(), r.dispose), [r]), g.useLayoutEffect(() => {
    t || r.cancel();
  }, [r, t]), g.useEffect(() => {
    t && i();
  }, [t, i]), {
    ...a,
    directoryState: r,
    refresh: i,
    setRootPath: r.setRootPath,
    setSelectedFolderPath: r.setSelectedFolderPath,
    isCurrentScanResult: r.isCurrentScanResult
  };
}

function Wdr(e) {
  return g.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getSnapshot);
}

const xSi = async e => {
    try {
      const {
        migrateMaterialBackupOssIndexEncoding: t
      } = await Ie(async () => {
        const {
          migrateMaterialBackupOssIndexEncoding: n
        } = await Promise.resolve().then(() => vHe);
        return {
          migrateMaterialBackupOssIndexEncoding: n
        };
      }, void 0, import.meta.url);
      t();
    } catch {}
    return cCe(e);
  },
  _Si = async (e, t) => {
    const {
      loadMaterialOssBackupSettings: n
    } = await Ie(async () => {
      const {
        loadMaterialOssBackupSettings: o
      } = await Promise.resolve().then(() => b$a);
      return {
        loadMaterialOssBackupSettings: o
      };
    }, void 0, import.meta.url);
    if (!t() || !n().enabled) return;
    const {
      getMaterialBackupOssIndexEntry: r,
      saveMaterialBackupOssIndexBatch: a
    } = await Ie(async () => {
      const {
        getMaterialBackupOssIndexEntry: o,
        saveMaterialBackupOssIndexBatch: s
      } = await Promise.resolve().then(() => vHe);
      return {
        getMaterialBackupOssIndexEntry: o,
        saveMaterialBackupOssIndexBatch: s
      };
    }, void 0, import.meta.url);
    if (!t()) return;
    const i = {};
    for (const o of e) for (const s of o.assets) {
      if (s.kind !== "image" && s.kind !== "video") continue;
      const l = r(s.path);
      l != null && l.remoteUrl && (i[s.path] = l.remoteUrl);
    }
    t() && Object.keys(i).length > 0 && a(i);
  },
  kSi = [];

function ASi(e) {
  const t = ySi(),
    n = t.clear,
    r = t.clearAll,
    {
      rootPath: a,
      setRootPath: i,
      tree: o,
      index: s,
      directoryState: l,
      setSelectedFolderPath: d,
      refresh: u,
      isCurrentScanResult: h
    } = wSi(lCe, (e == null ? void 0 : e.enabled) !== !1, {
      load: xSi,
      clearPreviews: r,
      afterScan: _Si
    }),
    p = g.useCallback(async () => {
      const j = await hYn();
      return j ? (uYn(j), i(j), !0) : !1;
    }, []),
    m = g.useCallback(j => (s == null ? void 0 : s.assetByPath.get(j)) ?? null, [s]),
    f = g.useCallback(async j => {
      const B = m(j);
      if (!B || B.kind !== "image" && B.kind !== "video" && B.kind !== "audio") return null;
      try {
        return await t.get(B);
      } catch (F) {
        return console.warn("[useMaterialLibrary] 预览解析失败:", j, F), null;
      }
    }, [t, m]),
    y = g.useCallback(async j => {
      const B = m(j);
      return !B || B.kind !== "image" && B.kind !== "video" && B.kind !== "audio" ? null : lD(B);
    }, [m]),
    b = g.useCallback(async j => j.kind && j.kind !== "image" && j.kind !== "video" && j.kind !== "audio" ? null : f(j.path), [f]),
    v = t.getFallback,
    _ = g.useCallback(async j => {
      const B = await h1t(j);
      return await u(j), B.length;
    }, [u]),
    w = g.useCallback(async j => {
      const B = await h1t(j);
      if (!a || B.length === 0) return [];
      const F = await u(j);
      if (!F || !h(F)) return [];
      const N = new Set(B);
      return F.flatMap(G => G.assets).filter(G => N.has(G.path) && G.kind === "image");
    }, [u, a, h]),
    k = g.useCallback(async (j, B) => {
      const F = await fYn(j, B);
      return await u(F), F;
    }, [u]),
    A = g.useCallback(async (j, B) => {
      const F = await gYn(j, B);
      return await AMe(j, F, {
        directory: !0
      }), await u(F), F;
    }, [u]),
    S = g.useCallback(async j => {
      const B = s == null ? void 0 : s.parentByPath.get(j);
      await yYn(j), await u((B == null ? void 0 : B.path) || a || null);
    }, [s, u, a]),
    C = g.useCallback(async (j, B) => {
      const F = s == null ? void 0 : s.folderByPath.get(j);
      if (!F) return null;
      const N = await _Yn(j, B, F.name);
      return await AMe(j, N, {
        directory: !0
      }), await u(N), N;
    }, [s, u]),
    I = g.useCallback(async j => {
      const B = s == null ? void 0 : s.folderByPath.get(j),
        F = s == null ? void 0 : s.parentByPath.get(j);
      if (!B || !F) return null;
      const N = await kYn(j, F.path, B.name);
      return await u(N), N;
    }, [s, u]),
    E = g.useCallback(async (j, B, F) => {
      n(j);
      const N = await bYn(j, B, F),
        G = N.split(/[/\\]/).pop() || F;
      return await AMe(j, N, {
        newFileName: G
      }), n(N), await u(B), N;
    }, [n, u]),
    M = g.useCallback(async (j, B, F) => {
      n(j);
      const N = await wYn(j, B, F),
        G = N.split(/[/\\]/).pop() || F;
      return await AMe(j, N, {
        newFileName: G
      }), n(N), await u(B), N;
    }, [n, u]),
    T = g.useCallback(async (j, B, F) => {
      const N = await xYn(j, B, F);
      return await u(B), N;
    }, [u]),
    P = g.useCallback(async (j, B) => {
      n(j), await vYn(j), await u(B);
    }, [n, u]),
    R = g.useCallback(async (j, B, F) => {
      const N = await mYn(j, B, F);
      return await u(j), N;
    }, [u]);
  return {
    rootPath: a,
    setRootPath: i,
    tree: o,
    directoryState: l,
    setSelectedFolderPath: d,
    allFolders: (s == null ? void 0 : s.allFolders) || kSi,
    chooseRoot: p,
    refresh: u,
    isCurrentScanResult: h,
    clearAllPreviews: r,
    clearPreviewFor: n,
    getAssetPreview: f,
    getAssetPreviewForCanvas: y,
    getPreviewUrl: b,
    getPreviewFallbackUrl: v,
    readMaterialImageNaturalDimensions: sOt,
    createFolder: k,
    renameFolder: A,
    moveFolder: C,
    duplicateFolder: I,
    deleteFolder: S,
    renameAsset: E,
    moveAsset: M,
    duplicateAsset: T,
    deleteAsset: P,
    writeBlobToFolder: R,
    importFiles: _,
    importImageFiles: w
  };
}

function SSi(e) {
  return e.some(t => {
    var r;
    const n = (r = t.settings) == null ? void 0 : r._materialLibraryPath;
    return typeof n == "string" && n.length > 0;
  });
}

function ISi(e, t) {
  let n = !1;
  const r = e.map(a => {
    var s;
    const i = (s = a.settings) == null ? void 0 : s._materialLibraryPath;
    if (typeof i != "string") return a;
    const o = CJe(i, t.oldPath, t.newPath, {
      directory: t.isDirectory
    });
    return o === i ? a : (n = !0, {
      ...a,
      settings: {
        ...a.settings,
        _materialLibraryPath: o
      }
    });
  });
  return n ? r : e;
}

function CSi({
  panelsOpen: e,
  runtimeActive: t,
  setNodes: n,
  refreshRoles: r,
  clearPreviews: a,
  clearRolePreviews: i,
  invalidateRolePreviews: o
}) {
  g.useEffect(() => {
    const s = l => {
      const d = l.detail;
      !d || typeof d.oldPath != "string" || typeof d.newPath != "string" || (o(d.oldPath, d.newPath), t && r(), n(u => ISi(u, d)));
    };
    return window.addEventListener(xkt, s), () => window.removeEventListener(xkt, s);
  }, [t, n, r, o]), g.useEffect(() => {
    e || (a(), i());
  }, [e, a, i]), g.useEffect(() => (window.addEventListener("canvasSessionMemoryReclaimed", a), () => window.removeEventListener("canvasSessionMemoryReclaimed", a)), [a]);
}

async function ESi(e) {
  e.clearRolePreviews(), e.clearPreviews();
  const t = await e.scan();
  !t || !e.isCurrent(t) || (await e.syncRoles(t));
}

function Wcn(e) {
  const t = String(e || "").trim();
  return !t || /\/thumbnails\//i.test(t) ? t : /\/images\//i.test(t) ? t.replace(/\/images\//i, "/thumbnails/") : t;
}

function TSi(e, t) {
  const n = e.settings || {},
    r = e.type === "input-image" ? Vh(e) : void 0;
  if (r && nr(r)) return ya(Vg(r)) || r;
  const a = String(n[_i] || n._ossRemoteUrl || "").trim();
  if (a && nr(a)) return ya(Vg(a)) || a;
  if (e.type === "preview") {
    const o = Nae(e);
    if (o && nr(o)) return ya(Vg(o)) || o;
  }
  const i = Zo(e);
  if (i && nr(i)) return ya(Vg(i)) || i;
}

function MSi(e, t, n) {
  const r = e.settings || {},
    a = String(r[Pi] || r._ossThumbnailUrl || "").trim();
  if (a && nr(a)) return Wcn(a);
  if (e.type === "gen-image" || e.type === "gen-video") {
    const o = Bm(e, n ?? 0);
    if (o && nr(o)) return o;
  }
  const i = typeof e.content == "string" ? e.content.trim() : "";
  if (i && nr(i) && /\/thumbnails\//i.test(i)) return i;
  if (t && nr(t)) return Wcn(t);
}

const SMe = e => /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test((e || "").split("?")[0]) || (e || "").startsWith("data:audio");

function PSi(e, t) {
  var r;
  if (typeof t == "number" && t >= 0) {
    const a = (r = e._previewMjAssetIds) == null ? void 0 : r[t];
    if (a) return a;
  }
  const n = e.settings;
  return (n == null ? void 0 : n._assetId) ?? e._selectedImageAssetId ?? e._contentAssetId;
}

async function RSi(e, t, n) {
  const r = t.filter(s => e.has(s.id));
  if (r.length === 0) return [];
  const a = s => n.filter(l => l.to === s).map(l => t.find(d => d.id === l.from)).filter(l => l != null),
    i = [];
  r.forEach((s, l) => {
    var d, u, h, p, m;
    if (s.type === "preview") {
      const f = a(s.id),
        y = (v, _) => {
          if (!v) return;
          const w = s.previewType === "audio" || SMe(v),
            k = s.previewType === "video" || v.includes(".mp4") || v.includes("video"),
            A = w ? "audio" : k ? "video" : "image",
            S = dM(s, v, {
              upstreamNodes: f,
              mediaType: A,
              imageIndex: _
            });
          i.push({
            url: S,
            node: s,
            nodeIndex: l,
            fileIndex: _,
            extension: w ? "mp3" : k ? "mp4" : "png",
            type: A
          });
        },
        b = s.previewMjImages || [];
      if (b.length > 0) b.forEach((v, _) => y(v, _));else if (s.selectedPreviewImage) y(s.selectedPreviewImage);else if (s.content) y(s.content);else for (const v of f) if ((v.type === "topaz-upscale" || v.type === "jimeng-super-resolution" || v.type === "image-wash" || v.type === "fal-rembg" || v.type === "virtual-try-on") && typeof v.content == "string" && v.content.trim()) {
        y(v.content);
        break;
      }
    } else if ((s.type === "topaz-upscale" || s.type === "jimeng-super-resolution" || s.type === "image-wash" || s.type === "fal-rembg" || s.type === "virtual-try-on") && s.content) {
      const f = s.previewType === "video" || String(((d = s.settings) == null ? void 0 : d.previewType) || "").toLowerCase() === "video" || s.content.includes(".mp4") || s.content.includes("video"),
        y = f ? "video" : "image";
      i.push({
        url: dM(s, s.content, {
          mediaType: y
        }),
        node: s,
        nodeIndex: l,
        extension: f ? "mp4" : "png",
        type: y
      });
    } else if (s.type === "input-image" && s.content) {
      const f = (u = s.settings) == null ? void 0 : u.mediaType,
        y = f === "audio" || SMe(s.content),
        b = f === "video",
        v = y ? "audio" : b ? "video" : "image",
        _ = v === "image" && typeof ((h = s.settings) == null ? void 0 : h.editImageCommittedPreview) == "string" ? String(s.settings.editImageCommittedPreview).trim() : "",
        k = (v === "image" && typeof ((p = s.settings) == null ? void 0 : p.editImageCommittedOssRemote) == "string" ? String(s.settings.editImageCommittedOssRemote).trim() : "") || _ || dM(s, s.content, {
          mediaType: v
        });
      i.push({
        url: k,
        node: s,
        nodeIndex: l,
        extension: y ? "mp3" : b ? "mp4" : "png",
        type: v
      });
    } else if (s.type === "video-input" && s.content) i.push({
      url: s.content,
      node: s,
      nodeIndex: l,
      extension: "mp4",
      type: "video"
    });else if ((s.type === "generate-character-video" || s.type === "generate-scene-video") && s.content) i.push({
      url: s.content,
      node: s,
      nodeIndex: l,
      extension: "mp4",
      type: "video"
    });else if (s.type === "gen-image" || s.type === "gen-video") {
      const f = Ij(s),
        y = $It(s);
      y.forEach((b, v) => {
        if (!b.url) return;
        const _ = (b.url || "").split("?")[0] || "",
          w = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(_) || s.type === "gen-video" && !/\.(png|jpe?g|webp|gif|bmp|svg)(\?|$)/i.test(_);
        i.push({
          url: b.url,
          node: s,
          nodeIndex: l,
          fileIndex: y.length > 1 ? v : void 0,
          extension: w ? "mp4" : "png",
          type: w ? "video" : "image",
          assetIdHint: b.assetId || (f == null ? void 0 : f.id) || (f == null ? void 0 : f._assetId)
        });
      });
    } else if ((s.type === "rh-comfy" || s.type === "rh-app") && s.content && SMe(s.content)) i.push({
      url: s.content,
      node: s,
      nodeIndex: l,
      extension: "mp3",
      type: "audio"
    });else if ((s.type === "generate-scene-image" || s.type === "generate-character-image") && ((m = s.settings) != null && m.imageUrls)) s.settings.imageUrls.forEach((y, b) => {
      y && i.push({
        url: y,
        node: s,
        nodeIndex: l,
        fileIndex: b,
        extension: "png",
        type: "image"
      });
    });else if (s.content) {
      const f = SMe(s.content),
        y = s.content.includes(".mp4") || s.content.includes("video") || s.content.includes(".webm"),
        b = f ? "audio" : y ? "video" : "image";
      i.push({
        url: dM(s, s.content, {
          mediaType: b
        }),
        node: s,
        nodeIndex: l,
        extension: f ? "mp3" : y ? "mp4" : "png",
        type: b
      });
    }
  });
  const o = [];
  for (const s of i) {
    const l = await p9(s.node, s.nodeIndex, s.fileIndex, s.extension, s.url),
      d = s.assetIdHint ?? PSi(s.node, s.fileIndex),
      u = TSi(s.node, s.type),
      h = MSi(s.node, u, s.fileIndex),
      p = s.node.type === "input-image" && typeof s.node.content == "string" ? s.node.content : s.url;
    o.push({
      url: p,
      originalUrl: u || (s.url !== p ? s.url : void 0),
      thumbnailUrl: h,
      name: l,
      type: s.type,
      assetId: d
    });
  }
  return o;
}

function Qke(e) {
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

function kFt(e, t) {
  return kc(e, t);
}

function NSi(e) {
  try {
    const t = localStorage.getItem(e);
    if (t) {
      const n = JSON.parse(t);
      return {
        open: !!(n != null && n.open)
      };
    }
  } catch {}
  return {
    open: !1
  };
}

function jSi(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify({
      open: t
    }));
  } catch {}
}

function DSi(e) {
  return String(e || "").replace(/\.[^/.]+$/, "").replace(/[\\/:*?"<>|]/g, " ").replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s+/g, " ").trim() || "素材";
}

function LSi(e, t) {
  const n = t.name.trim().match(/\.([a-zA-Z0-9+]+)$/);
  if (n) return n[1].toLowerCase();
  const r = (e.type || "").toLowerCase();
  if (r === "audio/mp4" || r === "audio/x-m4a") return "m4a";
  if (r.startsWith("audio/mpeg") || r === "audio/mp3") return "mp3";
  if (r.startsWith("audio/")) {
    const a = (r.split("/")[1] || "").split(";")[0].trim();
    return a === "wav" || a === "wave" ? "wav" : a === "ogg" || a === "oga" ? "ogg" : a === "flac" ? "flac" : a === "aac" ? "aac" : a === "opus" ? "opus" : a === "mp4" ? "m4a" : a && /^[a-z0-9]+$/i.test(a) ? a : "mp3";
  }
  return r === "video/mp4" || r.includes("mp4") ? "mp4" : r.startsWith("video/") ? (r.split("/")[1] || "mp4").split(";")[0].trim().replace(/[^a-z0-9]/gi, "") || "mp4" : r.startsWith("image/") ? (r.split("/")[1] || "png").replace("jpeg", "jpg").split(";")[0].trim() : t.type === "video" ? "mp4" : t.type === "audio" ? "mp3" : "png";
}

async function OSi(e) {
  var a;
  let t = null;
  const r = [((a = e.originalUrl) == null ? void 0 : a.trim()) || "", e.url].filter((i, o, s) => i && s.indexOf(i) === o);
  for (const i of r) {
    if (t) break;
    try {
      const o = await fetch(i);
      if (!o.ok) continue;
      const s = await o.blob();
      s.size > 0 && (t = s);
    } catch {}
  }
  if (!t && e.assetId) try {
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
    t = await i.getAssetBlob(e.assetId);
  } catch {
    t = null;
  }
  if (!t) try {
    const {
        localCacheManager: i
      } = await Ie(async () => {
        const {
          localCacheManager: s
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: s
        };
      }, void 0, import.meta.url),
      o = await i.readAsset(e.assetId || "");
    o != null && o.blob && (t = o.blob);
  } catch {}
  return t;
}

const Ate = 320,
  IMe = 280,
  qcn = 340;

function BSi({
  materialLibrary: e,
  aiRoleLibrary: t,
  view: n,
  viewportSize: r,
  commitCanvasViewImmediate: a,
  setNodes: i,
  setSelectedNodeId: o,
  setMaterialLibraryOpen: s,
  setAiRoleLibraryOpen: l,
  setSaveToMaterialLibraryOpen: d,
  generateId: u,
  toastSuccess: h,
  toastError: p
}) {
  const [m, f] = g.useState([]),
    y = g.useCallback(() => {
      d(!1), f([]);
    }, [d]),
    b = g.useCallback(() => ESi({
      clearRolePreviews: iJ,
      clearPreviews: e.clearAllPreviews,
      scan: e.refresh,
      isCurrent: e.isCurrentScanResult,
      syncRoles: t.syncFromMaterialLibrary
    }), [t.syncFromMaterialLibrary, e.clearAllPreviews, e.refresh, e.isCurrentScanResult]),
    v = g.useCallback(I => {
      f([I]), d(!0);
    }, [d]),
    _ = g.useCallback(async (I, E, M) => {
      const T = await RSi(I, E, M);
      if (T.length === 0) {
        p("选中的节点中没有可保存到素材库的图片、视频或音频");
        return;
      }
      f(T), d(!0);
    }, [d, p]);
  g.useEffect(() => {
    const I = E => {
      const M = E.detail;
      !(M != null && M.url) || !(M != null && M.name) || v({
        url: M.url,
        name: M.name,
        type: M.type,
        assetId: M.assetId
      });
    };
    return window.addEventListener("open-save-to-material-library", I), () => window.removeEventListener("open-save-to-material-library", I);
  }, [v]);
  const w = g.useCallback(async I => {
      const E = I.filter(G => G.kind === "image" || G.kind === "video" || G.kind === "audio");
      if (E.length === 0) {
        p("该文件类型无法插入画布");
        return;
      }
      const {
          resolveMaterialLibraryAssetForCanvas: M
        } = await Ie(async () => {
          const {
            resolveMaterialLibraryAssetForCanvas: G
          } = await Promise.resolve().then(() => U1);
          return {
            resolveMaterialLibraryAssetForCanvas: G
          };
        }, void 0, import.meta.url),
        P = (320 - n.x) / n.zoom,
        R = -n.y / n.zoom + 100,
        j = 4,
        B = 80,
        F = [];
      let N = "";
      for (let G = 0; G < E.length; G += 1) {
        const z = E[G],
          V = await M(z);
        if (!V) continue;
        const O = u();
        N = O;
        const L = G % j,
          D = Math.floor(G / j),
          U = P + L * (Ate + B),
          H = R + D * (IMe + B),
          Y = z.name.replace(/\.[^/.]+$/, "");
        F.push(z.kind === "audio" ? {
          id: O,
          type: "input-image",
          x: U,
          y: H,
          width: Ate,
          height: 200,
          content: V.content,
          prompt: z.name,
          settings: {
            mediaType: "audio",
            musicTitle: Y,
            ...V.settingsExtras
          }
        } : {
          id: O,
          type: "input-image",
          x: U,
          y: H,
          width: Ate,
          height: IMe,
          content: V.content,
          prompt: "",
          settings: V.settingsExtras
        });
      }
      if (F.length === 0) {
        p("无法读取该素材（本地与云端均不可用）");
        return;
      }
      i(G => [...G, ...F]), N && o(N), h(F.length === 1 ? `已将「${E[0].name}」插入到画布` : `已将 ${F.length} 个素材插入到画布`);
    }, [u, i, o, p, h, n.x, n.y, n.zoom]),
    k = g.useCallback(async I => {
      await w([I]);
    }, [w]),
    A = g.useCallback(async (I, E) => {
      const M = e.allFolders.find(R => R.path === E),
        T = M == null ? void 0 : M.assets.find(R => R.path === I);
      if (!T) return null;
      const {
        resolveMaterialLibraryAssetForCanvas: P
      } = await Ie(async () => {
        const {
          resolveMaterialLibraryAssetForCanvas: R
        } = await Promise.resolve().then(() => U1);
        return {
          resolveMaterialLibraryAssetForCanvas: R
        };
      }, void 0, import.meta.url);
      return P(T);
    }, [e.allFolders]),
    S = g.useCallback(async I => {
      const E = I.assets.filter(z => z.kind === "image" && z.path);
      if (!E.length) {
        p("没有可应用的图片");
        return;
      }
      const M = [],
        {
          resolveMaterialLibraryAssetForCanvas: T
        } = await Ie(async () => {
          const {
            resolveMaterialLibraryAssetForCanvas: z
          } = await Promise.resolve().then(() => U1);
          return {
            resolveMaterialLibraryAssetForCanvas: z
          };
        }, void 0, import.meta.url);
      for (const z of E) {
        const V = e.allFolders.flatMap(L => L.assets).find(L => L.path === z.path);
        if (!V) continue;
        const O = await T(V);
        O && M.push({
          ref: z,
          url: O.content,
          settings: O.settingsExtras
        });
      }
      if (!M.length) {
        p("无法解析素材路径为预览 URL");
        return;
      }
      const P = I.name.trim() || "未命名资源",
        R = M.length,
        B = -(R <= 1 ? Ate : (R - 1) * qcn + Ate) / 2,
        F = -IMe / 2,
        N = M.map(({
          ref: z,
          url: V,
          settings: O
        }, L) => ({
          id: u(),
          type: "input-image",
          nodeName: P,
          x: B + L * qcn,
          y: F,
          width: Ate,
          height: IMe,
          content: V,
          prompt: "",
          settings: {
            mediaType: "image",
            aiRoleId: I.id,
            aiRoleName: P,
            aiRoleAssetType: z.roleAssetType,
            ...O
          }
        })),
        G = N[N.length - 1];
      i(z => [...z, ...N]), G && o(G.id), l(!1), s(!1), a(hY(0, 0, Sd.APPLY_AI_ROLE_TO_CANVAS_ZOOM, r)), h(`已将「${P}」应用到画布`);
    }, [a, u, e.allFolders, l, s, i, o, p, h, r]),
    C = g.useCallback(async I => {
      var T, P;
      if (m.length === 0) return;
      let E = 0,
        M = 0;
      for (const R of m) {
        const j = await OSi(R);
        if (!j) {
          M += 1;
          continue;
        }
        const B = ((T = R.originalUrl) == null ? void 0 : T.trim()) || "";
        let F = ((P = R.thumbnailUrl) == null ? void 0 : P.trim()) || "";
        !F && B && (F = B.replace(/\/images\//i, "/thumbnails/"));
        const N = DSi(R.name),
          G = LSi(j, R);
        try {
          const z = await e.writeBlobToFolder(I, `${N}-${Date.now()}.${G}`, j);
          if (B) try {
            const {
              saveMaterialBackupOssIndexEntry: V
            } = await Ie(async () => {
              const {
                saveMaterialBackupOssIndexEntry: O
              } = await Promise.resolve().then(() => vHe);
              return {
                saveMaterialBackupOssIndexEntry: O
              };
            }, void 0, import.meta.url);
            V(z, B, F || void 0);
          } catch {}
          E += 1;
        } catch {
          M += 1;
        }
      }
      if (y(), await b(), E === 0) {
        p("保存失败，请检查网络或 OSS 配置");
        return;
      }
      if (M > 0) {
        h(`已保存 ${E} 个，${M} 个失败`, 5e3);
        return;
      }
      h(m.length > 1 ? `已将 ${E} 个文件保存到素材库` : "已保存到素材库");
    }, [y, e, m, b, p, h]);
  return {
    materialSaveQueue: m,
    refreshMaterialLibraryAndSyncRoles: b,
    openSaveToMaterialLibrary: v,
    openSaveSelectedNodesToMaterialLibrary: _,
    closeSaveToMaterialLibraryModal: y,
    handleInsertMaterialAssetToCanvas: k,
    handleInsertMaterialAssetsToCanvas: w,
    resolveMaterialLibraryDrop: A,
    handleApplyAiRoleToCanvas: S,
    handleConfirmSaveToMaterialLibrary: C
  };
}

function FSi({
  nodes: e,
  setNodes: t,
  materialLibraryOpen: n,
  aiRoleLibraryOpen: r,
  saveToMaterialLibraryOpen: a,
  canvas: i
}) {
  const o = n || r || a,
    s = g.useMemo(() => o || SSi(e), [o, e]),
    l = ASi({
      enabled: s
    }),
    d = E6a({
      rootPath: l.rootPath,
      tree: l.tree,
      allFolders: l.allFolders,
      importImageFiles: l.importImageFiles,
      getPreviewUrl: l.getPreviewUrl,
      writeBlobToFolder: l.writeBlobToFolder,
      renameAsset: l.renameAsset
    }, {
      enabled: s
    });
  CSi({
    panelsOpen: o,
    runtimeActive: s,
    setNodes: t,
    refreshRoles: d.refresh,
    clearPreviews: l.clearAllPreviews,
    clearRolePreviews: iJ,
    invalidateRolePreviews: BDt
  });
  const u = BSi({
    materialLibrary: l,
    aiRoleLibrary: d,
    ...i
  });
  return {
    materialLibrary: l,
    aiRoleLibrary: d,
    actions: u
  };
}

function CMe(e, t) {
  var r, a;
  const n = e.node.id;
  return t === "source" ? e.connectingSource === n || (((r = e.multiConnectingSourceIds) == null ? void 0 : r.includes(n)) ?? !1) : e.connectingTarget === n || (((a = e.multiConnectingTargetIds) == null ? void 0 : a.includes(n)) ?? !1);
}

const zSi = (e, t) => {
  var o, s, l, d;
  if (e.modelConfigState !== t.modelConfigState || e.globalCanvasDoodleBrushOrEraser !== t.globalCanvasDoodleBrushOrEraser || e.doodleDrawingNodeId === e.node.id != (t.doodleDrawingNodeId === t.node.id) || e.focusEditAnalyzingNodeId === e.node.id != (t.focusEditAnalyzingNodeId === t.node.id)) return !1;
  if (t.isCanvasPanning && e.isCanvasPanning && !t.isNodeDragging) {
    if (e.disableNodeDrag !== t.disableNodeDrag || e.cropSelectModeActive !== t.cropSelectModeActive || e.markerModeActive !== t.markerModeActive || e.canvasStrictInView !== t.canvasStrictInView || e.panPaintKeep !== t.panPaintKeep || e.isGenerationTimerActive !== t.isGenerationTimerActive) return !1;
    const u = !!e.node.isGenerating,
      h = !!t.node.isGenerating,
      p = ((o = e.node.settings) == null ? void 0 : o.isGenerating) === !0,
      m = ((s = t.node.settings) == null ? void 0 : s.isGenerating) === !0;
    return u !== h || p !== m ? !1 : e.node.id === t.node.id && e.isSelected === t.isSelected && e.suppressSelectionChrome === t.suppressSelectionChrome && e.disableResizeHandles === t.disableResizeHandles && e.isDark === t.isDark && e.renderQuality === t.renderQuality && e.isCanvasPanning === t.isCanvasPanning && e.showNodeDeleteButton === t.showNodeDeleteButton && e.showCanvasGenerationTimer === t.showCanvasGenerationTimer && e.enableGenerationNodeAnimation === t.enableGenerationNodeAnimation && e.enableConnectWireTilt === t.enableConnectWireTilt && e.enableConnectWireMarquee === t.enableConnectWireMarquee && e.isConnectDuplicateBlocked === t.isConnectDuplicateBlocked;
  }
  if (t.isNodeDragging) {
    if (!e.isNodeDragging || e.disableNodeDrag !== t.disableNodeDrag || e.cropSelectModeActive !== t.cropSelectModeActive || e.markerModeActive !== t.markerModeActive || e.boxSelectLightShell !== t.boxSelectLightShell || e.boxSelectGroupDragging !== t.boxSelectGroupDragging || e.disableResizeHandles !== t.disableResizeHandles || e.suppressSelectionChrome !== t.suppressSelectionChrome || e.node.x !== t.node.x || e.node.y !== t.node.y || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.content !== t.node.content) return !1;
    const u = !!e.node.isGenerating,
      h = !!t.node.isGenerating;
    return u !== h ? !1 : e.node.id === t.node.id && e.isSelected === t.isSelected && e.isDark === t.isDark && e.renderQuality === t.renderQuality && e.clipboardPromptReplaceTipNonce === t.clipboardPromptReplaceTipNonce && e.showConnectionDial === t.showConnectionDial && e.connectionDialDirection === t.connectionDialDirection && e.connectionDialOptions === t.connectionDialOptions && e.hasOpenDropdown === t.hasOpenDropdown && e.canvasStrictInView === t.canvasStrictInView && e.panPaintKeep === t.panPaintKeep && e.isCanvasPanning === t.isCanvasPanning && e.hideAllInputImagePreviews === t.hideAllInputImagePreviews && e.showNodeDeleteButton === t.showNodeDeleteButton && e.showCanvasGenerationTimer === t.showCanvasGenerationTimer && e.enableGenerationNodeAnimation === t.enableGenerationNodeAnimation && e.enableConnectWireTilt === t.enableConnectWireTilt && e.enableConnectWireMarquee === t.enableConnectWireMarquee && e.isConnectDuplicateBlocked === t.isConnectDuplicateBlocked;
  }
  if (e.node.id !== t.node.id || e.node.x !== t.node.x || e.node.y !== t.node.y || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.type !== t.node.type || e.node.nodeName !== t.node.nodeName || e.node.content !== t.node.content || e.node.settings !== t.node.settings && !XEt(e.node, t.node) || e.node.prompt !== t.node.prompt) return !1;
  const n = !!e.node.isGenerating,
    r = !!t.node.isGenerating,
    a = ((l = e.node.settings) == null ? void 0 : l.isGenerating) === !0,
    i = ((d = t.node.settings) == null ? void 0 : d.isGenerating) === !0;
  return !(n !== r || a !== i || e.isGenerationTimerActive !== t.isGenerationTimerActive || e.isSelected !== t.isSelected || e.suppressSelectionChrome !== t.suppressSelectionChrome || e.disableResizeHandles !== t.disableResizeHandles || e.boxSelectLightShell !== t.boxSelectLightShell || e.boxSelectGroupDragging !== t.boxSelectGroupDragging || e.groupId !== t.groupId || e.isInGroup !== t.isInGroup || e.isPreviewCollapsed !== t.isPreviewCollapsed || e.isNodeDragging !== t.isNodeDragging || e.isConnected !== t.isConnected || e.isDark !== t.isDark || e.canvasStrictInView !== t.canvasStrictInView || e.panPaintKeep !== t.panPaintKeep || e.isCanvasPanning !== t.isCanvasPanning || CMe(e, "source") !== CMe(t, "source") || CMe(e, "target") !== CMe(t, "target") || e.isConnectDuplicateBlocked !== t.isConnectDuplicateBlocked || e.renderQuality !== t.renderQuality || e.nodeDirtyVersion !== t.nodeDirtyVersion || e.connectionSignature !== t.connectionSignature || e.framesConnectionSignature !== t.framesConnectionSignature || e.hasOpenDropdown !== t.hasOpenDropdown || e.showConnectionDial !== t.showConnectionDial || e.connectionDialDirection !== t.connectionDialDirection || e.connectionDialOptions !== t.connectionDialOptions || e.isCompactUiMode !== t.isCompactUiMode || e.compactRefCanvasPickTargetId !== t.compactRefCanvasPickTargetId || e.compactRefCanvasPickEligible !== t.compactRefCanvasPickEligible || e.storyboardCanvasPickBoardId !== t.storyboardCanvasPickBoardId || e.focusEditTargetGenNodeId !== t.focusEditTargetGenNodeId || e.focusEditActiveSourceNodeId !== t.focusEditActiveSourceNodeId || e.focusEditAnalyzingNodeId !== t.focusEditAnalyzingNodeId || e.focusEditAnalyses !== t.focusEditAnalyses || e.clipboardPromptReplaceTipNonce !== t.clipboardPromptReplaceTipNonce || e.hideAllInputImagePreviews !== t.hideAllInputImagePreviews || e.showNodeDeleteButton !== t.showNodeDeleteButton || e.showCanvasGenerationTimer !== t.showCanvasGenerationTimer || e.enableGenerationNodeAnimation !== t.enableGenerationNodeAnimation || e.enableConnectWireTilt !== t.enableConnectWireTilt || e.enableConnectWireMarquee !== t.enableConnectWireMarquee || e.disableNodeDrag !== t.disableNodeDrag || e.cropSelectModeActive !== t.cropSelectModeActive || e.markerModeActive !== t.markerModeActive || e.doodleDrawingNodeId !== t.doodleDrawingNodeId || e.promptLibraryState !== t.promptLibraryState || e.promptLibraryCollapsedState !== t.promptLibraryCollapsedState || e.promptLibraryFormState !== t.promptLibraryFormState);
};

function USi(e, t, n) {
  var y, b;
  const r = (e.type === "preview" || e.type === "input-image") && (!!e._expandPending || !!((y = e.settings) != null && y._expandPending)) && typeof (e._expandTaskStartTime ?? ((b = e.settings) == null ? void 0 : b._expandTaskStartTime)) == "number",
    a = e.settings,
    i = t || e.isGenerating === !0 || (a == null ? void 0 : a.isGenerating) === !0,
    o = i,
    s = typeof e.content == "string" ? e.content.trim() : "",
    l = typeof (a == null ? void 0 : a.progress) == "number" ? a.progress : 0,
    d = a == null ? void 0 : a.generatedImages,
    u = s.length > 0 || Array.isArray(d) && d.length > 0,
    h = (e.type === "gen-image" || e.type === "generate-character-image" || e.type === "generate-scene-image") && u && (!i || l >= 100) && !t,
    p = (e.type === "gen-video" || e.type === "generate-character-video" || e.type === "generate-scene-video") && !!(s || Zo(e)) && (!i || l >= 100) && !t,
    m = e.type === "gen-image" || e.type === "gen-video" || e.type === "gen-music" || e.type === "gen-speech" || e.type === "generate-character-image" || e.type === "generate-scene-image" || e.type === "generate-character-video" || e.type === "generate-scene-video" || e.type === "motion-control" || e.type === "video-relight" || e.type === "virtual-try-on" || e.type === "rh-app" || e.type === "rh-comfy" || e.type === "storyboard-chart-node";
  return n && (m && o && !p && !h || r);
}

const $Si = g.memo(function ({
  node: t,
  isDark: n,
  isGenerationTimerActive: r,
  showCanvasGenerationTimer: a,
  clipboardPromptReplaceTipNonce: i,
  zoomBandUiOpacity: o,
  useFloatScaleChrome: s = !1,
  children: l
}) {
  var b, v;
  on();
  const d = USi(t, r, a),
    [u, h] = g.useState(!1);
  g.useEffect(() => {
    if (!a) {
      h(!1);
      return;
    }
    if (d) {
      h(!0);
      return;
    }
    if (!u) return;
    const _ = window.setTimeout(() => h(!1), 1200);
    return () => window.clearTimeout(_);
  }, [d, u, a]);
  const p = a && (d || u),
    [m, f] = g.useState(!1),
    y = g.useRef(null);
  return g.useEffect(() => {
    i && (y.current != null && window.clearTimeout(y.current), f(!0), y.current = window.setTimeout(() => {
      y.current = null, f(!1);
    }, 2800));
  }, [i]), g.useEffect(() => () => {
    y.current != null && window.clearTimeout(y.current), y.current = null;
  }, []), c.jsxs(c.Fragment, {
    children: [p && c.jsx("div", {
      className: `generation-timer-badge pointer-events-none absolute left-1/2 -translate-x-1/2 z-[200]${s ? " node-float-chrome node-float-chrome--center" : ""}`,
      "data-generation-timer": "true",
      style: {
        top: s ? "calc(-52px - var(--float-offset, 12px))" : "-52px",
        opacity: s ? void 0 : o
      },
      children: c.jsx(jFa, {
        isGenerating: d,
        isDark: n,
        nodeId: t.id,
        modelId: ((b = t.settings) == null ? void 0 : b.modelId) ?? ((v = t.settings) == null ? void 0 : v.model)
      })
    }), c.jsxs("div", {
      className: "relative z-[1] flex min-h-0 w-full flex-1 flex-col",
      children: [(t.type === "gen-image" || t.type === "gen-video") && m && c.jsx("div", {
        className: `pointer-events-none absolute left-1/2 z-[205] max-w-[min(100%,280px)] -translate-x-1/2 rounded-full border px-3 py-1 text-center text-[11px] font-medium shadow-sm whitespace-nowrap transition-opacity duration-200 ease-out ${n ? "border-zinc-600 bg-[#1f1f1f]/95 text-zinc-200" : "border-zinc-300 bg-white/95 text-zinc-800"}${s ? " node-float-chrome node-float-chrome--center" : ""}`,
        style: {
          top: p ? "-84px" : "-58px",
          opacity: s ? void 0 : o
        },
        role: "status",
        children: x("麻衣已为你替换提示词")
      }), l]
    })]
  });
});

function EJe(e) {
  return !Number.isFinite(e) || e <= 0 ? 1 : Math.min(5, Math.max(1, 1 / e));
}

function qdr(e) {
  return `max(${e}px, calc(6px + 32px * var(--float-scale, 1)))`;
}

const xje = new Set();

let _kt = NaN,
  Lfe = null;

function Kdr(e, t) {
  e.style.setProperty("--node-label-scale", String(t));
}

function Kcn(e) {
  const t = EJe(e);
  t !== _kt && (_kt = t, xje.forEach(n => Kdr(n, t)));
}

function Qdr(e) {
  if (xje.add(e), Kdr(e, EJe(Cd().zoom)), !Lfe) {
    _kt = NaN;
    const t = dw(r => Kcn(r.zoom)),
      n = K4e(r => Kcn(r.zoom));
    Lfe = () => {
      t(), n();
    };
  }
  return () => {
    xje.delete(e), xje.size === 0 && Lfe && (Lfe(), Lfe = null);
  };
}

function kkt(e, t) {
  const n = t.replace(/_\d+$/, ""),
    r = t.slice(n.length),
    a = ED(e.type),
    i = tur[e.type] || [];
  return n === a || i.includes(n) || !e.nodeName && n === "未命名节点" || e.type === "input-image" && ["Upload", "Image", "Video", "Audio", "文件", "上传", "图片", "视频", "音频", "首帧", "尾帧", "当前帧"].includes(n) || e.type === "director-3d" && ["智能搭建", "3D导演台"].includes(n) ? x({
    Upload: "上传",
    Text: "文本",
    Image: "图片",
    Video: "视频",
    Audio: "音频",
    Music: "音乐",
    Speech: "语音"
  }[n] || n) + r : t;
}

function Ydr(e) {
  const t = uf(e);
  if (!t) return "";
  const n = t.match(/^(\d+)\s*[×xX]\s*(\d+)$/);
  return n ? `${n[1]} × ${n[2]}` : t;
}

function Qcn(e, t) {
  const n = i => {
      if (!i || typeof i != "object") return null;
      const o = i,
        s = Number(o.width),
        l = Number(o.height);
      return Number.isFinite(s) && Number.isFinite(l) && s > 0 && l > 0 ? {
        w: s,
        h: l
      } : null;
    },
    r = n(e) ?? n(t);
  if (r) return `${r.w} × ${r.h}`;
  const a = typeof e == "string" && e.trim() || typeof t == "string" && t.trim() || "";
  return a ? Ydr(a) : "";
}

function Xdr(e) {
  const t = uf(e);
  return t ? /^(预览与拼图)(_\d+)?$/.test(t) : !0;
}

function Akt(e, t = 8) {
  const n = uf(e);
  if (!n) return "未命名节点";
  const r = Array.from(n);
  return r.length <= t ? n : `${r.slice(0, t).join("")}...`;
}

function Jdr(e) {
  var a, i;
  const t = String(e.content || "").trim();
  if (!t) return "empty";
  const n = String(((a = e.settings) == null ? void 0 : a.mediaType) || "").trim().toLowerCase();
  if (n === "video" || n === "audio") return n;
  if (t.startsWith("data:video") || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(t) || /\/videos\//i.test(t)) return "video";
  if (t.startsWith("data:audio") || /\.(mp3|wav|m4a|aac|flac)(\?|#|$)/i.test(t)) return "audio";
  const r = String(((i = e.settings) == null ? void 0 : i._ossRemoteUrl) || "").trim();
  return r && (/\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(r) || /\/videos\//i.test(r)) ? "video" : "image";
}

function GSi(e) {
  switch (e) {
    case "video":
      return "Video";
    case "audio":
      return "Audio";
    case "image":
      return "Image";
    default:
      return "Upload";
  }
}

function Zdr(e) {
  var d, u;
  const t = Jdr(e),
    n = GSi(t),
    r = uf(e.nodeName);
  if (!r) return n;
  if (new Set(["首帧", "尾帧", "当前帧"]).has(r)) return r;
  if (/^(文件|上传|Upload|File)$/i.test(r) || /^(未命名节点|图片|视频|音频|Image|Video|Audio)$/i.test(r)) return n;
  if (/^(文件|上传|Upload|File)_\d+$/i.test(r) || /^(未命名节点|图片|视频|音频|Image|Video|Audio)_\d+$/i.test(r)) return r;
  const i = h => h.replace(/\.[^.]+$/, ""),
    o = String(((d = e.settings) == null ? void 0 : d.videoFileName) || "").trim(),
    s = String(((u = e.settings) == null ? void 0 : u.musicTitle) || "").trim(),
    l = String(e.prompt || "").trim();
  return o && (r === o || r === i(o)) || s && r === s || l && (r === l || r === i(l)) || t !== "empty" && /\.(jpe?g|png|gif|webp|bmp|mp4|webm|mov|mp3|wav|m4a|aac|flac)$/i.test(r) ? n : r;
}

const eur = {
    "text-node": "Text",
    "gen-image": "Image",
    "gen-video": "Video",
    "gen-music": "Audio",
    "gen-speech": "Audio",
    "custom-agent": "Agent"
  },
  tur = {
    "text-node": ["Text", "文本", "文字"],
    "gen-image": ["Image", "图片", "绘画", "生成图片"],
    "gen-video": ["Video", "视频", "生成视频"],
    "gen-music": ["Audio", "Music", "音乐", "音频"],
    "gen-speech": ["Audio", "Speech", "语音", "音频"],
    "custom-agent": ["Agent", "自定义代理"]
  };

function VSi(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HSi(e) {
  var i, o, s;
  if (e.type === "director-3d") return x((i = e.settings) != null && i.smartBuild ? "智能搭建" : "3D导演台");
  if (e.type === "preview" && Xdr(e.nodeName)) return "";
  if (e.type === "input-image") return Akt(kkt(e, Zdr(e)), 8);
  const t = uf(e.nodeName),
    n = uf((o = e.settings) == null ? void 0 : o.aiRoleName) || uf((s = e.settings) == null ? void 0 : s.musicTitle) || "",
    r = nur(e),
    a = kkt(e, t ? r || t : n || r || "未命名节点");
  return e.type === "gen-image" || e.type === "gen-video" ? Akt(a, 8) : a;
}

function nur(e) {
  const t = eur[e.type];
  if (!t) return null;
  const n = uf(e.nodeName);
  if (!n) return t;
  const r = tur[e.type] || [t];
  return new RegExp(`^(${r.map(VSi).join("|")})(_\\d+)?$`, "i").test(n) ? /_\d+$/.test(n) ? n : t : null;
}

function Skt(e, t) {
  var o;
  const n = t ? "text-[rgba(245,245,245,0.6)]" : "text-zinc-600",
    r = 14,
    a = 1.75;
  let i = null;
  switch (e.type) {
    case "input-image":
      {
        const s = Jdr(e);
        s === "video" ? i = c.jsx(Oo, {
          size: r,
          strokeWidth: a,
          className: n
        }) : s === "audio" ? i = c.jsx(Qh, {
          size: r,
          strokeWidth: a,
          className: n
        }) : s === "image" ? i = c.jsx(lo, {
          size: r,
          strokeWidth: a,
          className: n
        }) : i = c.jsx(ml, {
          size: r,
          strokeWidth: a,
          className: n
        });
        break;
      }
    case "text-node":
      i = c.jsx(XE, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "video-input":
      i = c.jsx(Oo, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "video-analyze":
      i = c.jsx(Sf, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "shot-breakdown":
      i = c.jsx(uZ, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "script-parse":
      i = c.jsx(XE, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "video-timeline":
    case "inpaint-crop":
    case "inpaint-stitch":
      i = c.jsx(Sf, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "storyboard-node":
    case "storyboard-chart-node":
      i = c.jsx(Od, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "table-editor-node":
      i = c.jsx(Hue, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "doodle-canvas":
      i = c.jsx(nw, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "director-3d":
      i = c.jsx(tWe, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "gen-3d":
    case "three-d-studio":
      i = c.jsx(Hm, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "gen-image":
      i = c.jsx(tw, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "gen-video":
    case "motion-control":
    case "video-relight":
      i = c.jsx(Oo, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "gen-music":
    case "gen-speech":
      i = c.jsx(Q2, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "custom-agent":
      i = c.jsx(b5e, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "rh-app":
      i = c.jsx(Wp, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "rh-comfy":
      i = c.jsx(mZ, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "image-compare":
      i = c.jsx(TLe, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "image-tile":
      i = c.jsx(Bv, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "global-perspective":
      i = c.jsx(i9, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "image-wash":
    case "jimeng-super-resolution":
      i = c.jsx(ac, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "topaz-upscale":
      i = ((o = e.settings) == null ? void 0 : o.superResMode) === "video" ? c.jsx(Oo, {
        size: r,
        strokeWidth: a,
        className: n
      }) : c.jsx(lo, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "fal-rembg":
      i = c.jsx(lo, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "virtual-try-on":
      i = c.jsx(lo, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "preview":
      i = c.jsx(ul, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    case "local-save":
      i = c.jsx(O5, {
        size: r,
        strokeWidth: a,
        className: n
      });
      break;
    default:
      return null;
  }
  return c.jsx("span", {
    className: "inline-flex shrink-0 items-center",
    "aria-hidden": !0,
    children: i
  });
}

function WSi({
  pins: e
}) {
  const t = ZLt(),
    n = Fk.filter(i => gpe(e).includes(i.id));
  if (!n.length) return null;
  const r = !t || n.some(i => i.id === t),
    a = rtr(n.length);
  return c.jsx("span", {
    className: "canvas-pin-color-dots inline-flex shrink-0 items-center overflow-visible leading-none",
    "aria-hidden": !0,
    style: {
      opacity: r ? 1 : 0,
      transition: "opacity 0.2s ease-out"
    },
    children: c.jsx("span", {
      className: "canvas-pin-dot-stack",
      style: {
        width: a
      },
      children: n.map((i, o) => {
        const s = t === i.id,
          l = t != null && !s;
        return c.jsx("span", {
          "data-pin-id": i.id,
          "data-pin-color": i.id,
          "data-selected": String(s),
          className: "canvas-pin-dot",
          style: {
            backgroundColor: i.hex,
            translate: `-${Lza(o, n.length)}px 0px`,
            filter: l ? "saturate(0.35) brightness(0.55)" : void 0,
            zIndex: s ? n.length + 1 : o + 1
          }
        }, i.id);
      })
    })
  });
}

function qSi({
  node: e
}) {
  const t = Zg(e),
    n = ZLt(),
    r = Wza();
  if (!t.length) return null;
  const a = r === e.id,
    i = !!(n && t.includes(n));
  if (!a && !i) return null;
  const o = i && n ? n : t[0],
    s = KLt(o);
  return s ? c.jsx("div", {
    "data-pin-ring": s.id,
    className: "canvas-pin-filter-ring",
    style: {
      "--pin-active-color": s.hex
    },
    "aria-hidden": !0
  }) : null;
}

const KSi = g.memo(g.forwardRef(function ({
    node: t,
    visible: n,
    isDark: r,
    width: a,
    isPaintToolMode: i,
    useFloatScaleChrome: o = !1,
    updateNode: s,
    hideAllInputImagePreviews: l,
    inputImageLocalPreviewHidden: d,
    hideMediaResolutionLabelOnLightThumb: u,
    handleNodeHoverChromeEnter: h,
    handleNodeHoverChromeBodyLeave: p
  }, m) {
    var D, U, H, Y;
    on();
    const [f, y] = g.useState(!1),
      [b, v] = g.useState(() => uf(t.nodeName)),
      _ = g.useRef(null),
      w = g.useRef(!1),
      k = () => {
        w.current = !0, v(uf(t.nodeName)), y(!0);
      };
    g.useImperativeHandle(m, () => ({
      startEditing: k
    }), [t.nodeName]), g.useEffect(() => {
      var K, W;
      f || v(uf(t.nodeName)), f && n && ((K = _.current) == null || K.focus(), (W = _.current) == null || W.select());
    }, [t.nodeName, f, n]);
    const A = () => {
        w.current && (w.current = !1, s == null || s(t.id, {
          nodeName: uf(b) || void 0
        }), y(!1));
      },
      S = () => {
        w.current = !1, v(uf(t.nodeName)), y(!1);
      },
      C = g.useRef(null);
    g.useLayoutEffect(() => {
      const K = C.current;
      if (!(!K || o)) return Qdr(K);
    }, [n, o]);
    const I = "var(--node-label-scale, 1)",
      E = a,
      M = t.settings,
      T = M == null ? void 0 : M.expandModelName,
      P = M == null ? void 0 : M.eraserModelName,
      R = t.type === "preview" && typeof T == "string" && T.trim() !== "" && T.trim().toUpperCase() !== "TISP",
      j = t.type === "preview" && typeof P == "string" && P.trim() !== "" && P.trim().toUpperCase() !== "TISP",
      B = Number((D = t.settings) == null ? void 0 : D._gridStitchProgress),
      F = t.type === "preview" && Number.isFinite(B) && B > 0 && B < 100,
      N = F ? "2px" : "6px",
      G = t.type === "preview" && !R && !j && Xdr(t.nodeName),
      z = t.type === "preview" ? Qcn(M == null ? void 0 : M.previewActualSize, M == null ? void 0 : M.previewSize) : "",
      V = t.type === "preview" && typeof ((U = t.settings) == null ? void 0 : U.generationTime) == "string" ? t.settings.generationTime : "",
      O = t.type === "preview" && typeof ((H = t.settings) == null ? void 0 : H.eraserResolution) == "string" ? String(t.settings.eraserResolution) : "",
      L = G && !z && !V && !O && !F && (t.type === "preview" || Zg(t).length === 0);
    return !n || L && !f ? null : c.jsxs("div", {
      ref: C,
      "data-node-label-chrome": !0,
      "data-node-hover-chrome-body": !0,
      onMouseEnter: h,
      onMouseLeave: p,
      className: `absolute left-0 z-50 min-w-0 transition-opacity duration-200 ease-out flex flex-col gap-1${o ? " node-float-chrome overflow-hidden" : " overflow-visible"}`,
      style: {
        bottom: "100%",
        marginBottom: N,
        transform: o ? void 0 : `scale(${I})`,
        transformOrigin: "left bottom",
        ...(t.type === "input-image" || t.type === "topaz-upscale" || t.type === "jimeng-super-resolution" || t.type === "image-wash" || t.type === "fal-rembg" || t.type === "layer-decomposition" || t.type === "motion-control" || t.type === "virtual-try-on" || t.type === "video-relight" ? {
          width: o ? "calc(100% / var(--float-scale, 1))" : `calc(100% / ${I})`,
          maxWidth: o ? "calc(100% / var(--float-scale, 1))" : "none"
        } : {
          width: o ? `calc(${E}px / var(--float-scale, 1))` : void 0,
          maxWidth: o ? `calc(${E}px / var(--float-scale, 1))` : `calc(${E}px / ${I})`
        }),
        pointerEvents: o ? void 0 : i ? "none" : "auto",
        opacity: o ? void 0 : 1
      },
      children: [F && c.jsx("div", {
        className: "h-1 w-full min-w-[120px] overflow-hidden rounded-full bg-red-500/20",
        "aria-hidden": !0,
        children: c.jsx("div", {
          className: "h-full rounded-full bg-red-500 transition-[width] duration-200 ease-out",
          style: {
            width: `${Math.max(4, Math.min(100, B))}%`
          }
        })
      }), f ? c.jsx("input", {
        ref: _,
        type: "text",
        value: b,
        onChange: K => v(K.target.value),
        onBlur: A,
        onKeyDown: K => {
          K.key === "Enter" ? (K.preventDefault(), A()) : K.key === "Escape" && (K.preventDefault(), S());
        },
        className: `px-1.5 py-0.5 text-xs font-medium border-transparent rounded outline-none bg-transparent ${r ? "text-zinc-100" : "text-zinc-900"}`,
        style: {
          minWidth: "80px",
          maxWidth: `${E}px`
        }
      }) : c.jsxs("div", {
        className: t.type === "input-image" || t.type === "topaz-upscale" || t.type === "jimeng-super-resolution" || t.type === "image-wash" || t.type === "fal-rembg" || t.type === "layer-decomposition" || t.type === "motion-control" || t.type === "virtual-try-on" || t.type === "video-relight" ? `flex min-w-0 flex-1 w-full items-center gap-1.5 ${o ? "overflow-hidden" : "overflow-visible"}` : `flex items-center gap-1.5 min-w-0 flex-1 ${o ? "w-full overflow-hidden" : "overflow-visible"}`,
        children: [t.type === "input-image" && s ? c.jsx("button", {
          type: "button",
          disabled: l,
          className: `shrink-0 rounded p-0.5 -m-0.5 flex items-center justify-center border-0 bg-transparent outline-none transition-opacity ${l ? r ? "text-zinc-600 cursor-not-allowed opacity-60" : "text-zinc-400 cursor-not-allowed opacity-60" : `cursor-pointer hover:opacity-80 ${r ? "text-zinc-200" : "text-zinc-600"}`}`,
          onClick: K => {
            var Q;
            if (K.stopPropagation(), K.preventDefault(), l) return;
            const W = !!((Q = t.settings) != null && Q.inputImagePreviewHidden);
            s(t.id, {
              settings: {
                ...t.settings,
                inputImagePreviewHidden: !W
              }
            });
          },
          onMouseDown: K => K.stopPropagation(),
          "data-tip": x(l ? "已全局隐藏图片预览，请点右上角「隐图」恢复" : d ? "显示画布预览" : "隐藏画布预览（减轻渲染，不影响连线）"),
          children: Skt(t, r)
        }) : G ? null : Skt(t, r), t.type === "preview" && (() => {
          const K = z;
          return K ? c.jsx("span", {
            className: `text-[9px] font-light shrink-0 ${r ? "text-zinc-200" : "text-zinc-700"}`,
            children: K
          }) : null;
        })(), !G && (() => {
          var we, X, Z, re, fe;
          const K = uf(t.nodeName),
            W = uf((we = t.settings) == null ? void 0 : we.aiRoleName) || uf((X = t.settings) == null ? void 0 : X.musicTitle) || "",
            Q = K || W,
            q = nur(t),
            ne = kkt(t, t.type === "director-3d" ? (Z = t.settings) != null && Z.smartBuild ? "智能搭建" : "3D导演台" : t.type === "preview" && R ? x("智能扩图 · {0}", uf(T, x("模型"))) : t.type === "preview" && j ? x("智能擦除 · {0}", uf(P, x("模型"))) : t.type === "input-image" ? Zdr(t) : K ? q || K : W || q || "未命名节点"),
            de = !!((re = t.settings) != null && re.shotBreakdownRole || (fe = t.settings) != null && fe.shotBreakdownSourceNodeId || /^(S|M|BGM)\d+｜/i.test(ne)),
            le = !de && (t.type === "gen-image" || t.type === "gen-video" || t.type === "input-image"),
            J = le ? Akt(ne, 8) : ne,
            pe = o || !le,
            ce = t.type === "input-image" && Q && Q !== ne ? Q : J !== ne ? ne : void 0;
          return c.jsx("span", {
            "data-node-name-label": !0,
            onClick: () => {
              k();
            },
            onDoubleClick: ye => {
              ye.preventDefault(), ye.stopPropagation(), k();
            },
            className: `text-xs font-medium cursor-pointer transition-opacity hover:opacity-70 ${de ? "min-w-0 flex-1 whitespace-normal break-all line-clamp-2 leading-tight" : pe ? "min-w-0 flex-1 truncate overflow-hidden whitespace-nowrap" : "shrink-0 whitespace-nowrap"} ${r ? "text-[rgba(245,245,245,0.6)]" : "text-zinc-700"}`,
            style: {
              writingMode: "horizontal-tb",
              textOrientation: "mixed",
              letterSpacing: "-0.03em"
            },
            title: de ? ne : ce,
            children: J
          });
        })(), t.type === "preview" || t.type === "table-editor-node" ? null : c.jsx(WSi, {
          pins: Zg(t)
        }), t.type === "input-image" && !u && !!((Y = t.settings) != null && Y.imageSize) && c.jsx("span", {
          className: `ml-auto text-[9px] font-light shrink-0 whitespace-nowrap tabular-nums ${r ? "text-zinc-200" : "text-zinc-500"}`,
          children: Ydr(String(t.settings.imageSize))
        }), (t.type === "topaz-upscale" || t.type === "jimeng-super-resolution" || t.type === "image-wash" || t.type === "fal-rembg" || t.type === "virtual-try-on" || t.type === "layer-decomposition") && !u && (() => {
          const K = t.settings,
            W = Qcn(K == null ? void 0 : K.previewActualSize, K == null ? void 0 : K.previewSize),
            Q = W.match(/(\d+)\s*[×xX]\s*(\d+)/);
          if (Q) {
            const q = Number(Q[1]),
              ne = Number(Q[2]);
            if (Number.isFinite(q) && Number.isFinite(ne) && Math.max(q, ne) <= 560) return null;
          }
          return W ? c.jsx("span", {
            className: `ml-auto text-[9px] font-light shrink-0 whitespace-nowrap tabular-nums ${r ? "text-zinc-200" : "text-zinc-500"}`,
            title: W,
            children: W
          }) : null;
        })(), V ? c.jsx("span", {
          className: "ml-1 px-1 py-0.5 rounded text-[10px] font-light shrink-0 text-zinc-500",
          children: V
        }) : null, O ? c.jsxs("span", {
          className: "ml-1 px-1 py-0.5 rounded text-[10px] font-light shrink-0 text-zinc-500",
          children: [x("精度 "), O]
        }) : null]
      })]
    });
  })),
  QSi = new Set(["storyboard-node", "storyboard-chart-node", "doodle-canvas", "text-node", "video-input", "video-timeline", "video-analyze", "shot-breakdown", "script-parse", "gen-music", "gen-speech", "custom-agent", "image-compare", "image-tile", "rh-app", "rh-comfy", "inpaint-crop", "inpaint-stitch", "motion-control", "video-relight", "preview", "local-save", "global-perspective", "topaz-upscale", "jimeng-super-resolution", "image-wash", "fal-rembg", "virtual-try-on", "layer-decomposition", "table-editor-node"]),
  YSi = new Set(["director-3d", "three-d-studio", "video-timeline"]),
  XSi = new Set(["image-compare", "image-tile", "global-perspective", "local-save", "doodle-canvas", "inpaint-stitch", "gen-3d"]);

function JSi(e) {
  return QSi.has(e);
}

function BUe(e) {
  return YSi.has(e);
}

function rur(e) {
  return XSi.has(e) || BUe(e);
}

const ZSi = 2,
  e3i = 2,
  t3i = 8,
  n3i = 4,
  r3i = 2,
  a3i = 2,
  i3i = 8,
  o3i = 300,
  s3i = 380;

function l3i(e, t, n = window) {
  n.addEventListener("pointermove", e, {
    capture: !0
  }), n.addEventListener("mousemove", e), n.addEventListener("pointerup", t, {
    capture: !0
  }), n.addEventListener("pointercancel", t, {
    capture: !0
  }), n.addEventListener("mouseup", t);
}

function c3i(e, t, n = window) {
  e && (n.removeEventListener("pointermove", e, !0), n.removeEventListener("mousemove", e)), t && (n.removeEventListener("pointerup", t, !0), n.removeEventListener("pointercancel", t, !0), n.removeEventListener("mouseup", t));
}

function EMe(e) {
  return {
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey
  };
}

function d3i(e, t, n, r = "hypot") {
  return r === "manhattan" ? Math.abs(t.x - e.x) + Math.abs(t.y - e.y) > n : Math.hypot(t.x - e.x, t.y - e.y) > n;
}

function TMe(e) {
  let t = !0;
  const n = e.metric ?? "hypot",
    r = e.target ?? window,
    a = () => {
      t && (t = !1, c3i(i, o, r));
    },
    i = s => {
      t && d3i(e.start, {
        x: s.clientX,
        y: s.clientY
      }, e.slopPx, n) && (a(), e.onSlop(s, e.start));
    },
    o = s => {
      var l;
      t && (a(), (l = e.onRelease) == null || l.call(e, s, e.start));
    };
  return l3i(i, o, r), a;
}

function u3i(e) {
  const t = e.slopPx,
    n = t * t,
    r = e.target ?? window,
    a = i => {
      r.removeEventListener("mouseup", a, !0);
      const o = i,
        s = o.clientX - e.start.x,
        l = o.clientY - e.start.y;
      s * s + l * l >= n || e.onClick();
    };
  return r.addEventListener("mouseup", a, !0), () => r.removeEventListener("mouseup", a, !0);
}

function h3i(e, t, n, r) {
  return {
    button: 0,
    target: e,
    currentTarget: e,
    clientX: t,
    clientY: n,
    ctrlKey: r.ctrlKey,
    metaKey: r.metaKey,
    altKey: r.altKey,
    preventDefault: () => {},
    stopPropagation: () => {}
  };
}

const p3i = 80,
  m3i = "[data-text-node-drag-overlay], [data-compact-gen-preview]";

function f3i(e) {
  if (e.disableNodeDrag) return !0;
  if (!e.root) return e.cropSelectModeActive || e.markerModeActive;
  const t = e.cropSelectModeActive && !!e.root.querySelector('[data-crop-select-mode="true"]'),
    n = e.markerModeActive && !!e.root.querySelector('[data-marker-mode="true"]');
  return t || n;
}

function g3i(e, t, n) {
  return e !== "touch" && e !== "pen" || t !== 0 ? !1 : !Zbi(n);
}

function y3i(e, t, n = p3i) {
  return e && t < n;
}

function b3i(e) {
  return e.button !== 0 || e.nodeDragBlocked ? {
    type: "ignore"
  } : e.target.closest('[data-node-text-editing="1"]') ? {
    type: "ignore"
  } : Acr(e.target, e.nodeType) ? {
    type: "ignore"
  } : e.agentBlankTextarea && !e.shiftKey ? {
    type: "agent-blank",
    textarea: e.agentBlankTextarea
  } : evi(e.target) ? {
    type: "ignore"
  } : Qbi(e.target) ? {
    type: "long-press"
  } : {
    type: "ignore"
  };
}

function v3i(e) {
  if (y3i(e.isTrusted, e.echoElapsedMs)) return {
    type: "echo"
  };
  const t = e.target;
  if (Jbi(t)) return {
    type: "stop"
  };
  if (e.focusEditTargetGenNodeId) {
    if (Ybi(t)) return {
      type: "pass"
    };
    if (e.isFocusEditTargetGenNode) return e.isCompactImageWidget && _ln(t) ? kln(t) ? {
      type: "stop"
    } : e.nodeDragBlocked ? {
      type: "focus-edit-open-prompt"
    } : {
      type: "focus-edit-deferred",
      mode: "target",
      wasNewSource: !1
    } : Xbi(t) ? {
      type: "pass"
    } : e.nodeDragBlocked ? {
      type: "focus-edit-open-prompt"
    } : {
      type: "focus-edit-deferred",
      mode: "target",
      wasNewSource: !1
    };
    if (e.isValidFocusEditSource) return {
      type: "focus-edit-deferred",
      mode: "source",
      wasNewSource: e.focusEditActiveSourceNodeId !== e.nodeId
    };
  }
  if (e.storyboardCanvasPickBoardId) return H_t(t) ? {
    type: "pass"
  } : {
    type: "storyboard-pick",
    action: e.nodeId === e.storyboardCanvasPickBoardId ? "cancel" : "pick"
  };
  if (e.compactRefCanvasPickTargetId) {
    if (e.button !== 0) return {
      type: "pass"
    };
    if (H_t(t)) return {
      type: "pass"
    };
    const r = e.nodeId === e.compactRefCanvasPickTargetId;
    return !r && !e.compactRefCanvasPickEligible ? {
      type: "pass"
    } : {
      type: "reference-pick",
      shouldCancel: r
    };
  }
  if (!Acr(t, e.nodeType) && Kbi(t)) return {
    type: "stop"
  };
  if (tvi(t)) return {
    type: "stop"
  };
  if (nvi(t)) return {
    type: "stop"
  };
  if (rvi(t)) return {
    type: "stop"
  };
  if (avi(t)) return {
    type: "pass"
  };
  if (ivi(t)) return {
    type: "stop"
  };
  if (ovi(t)) return {
    type: "stop"
  };
  if (e.isAudioStripNode && svi(t)) return {
    type: "stop"
  };
  if (mvi(t, e.nodeType) && !e.isGenSpeechAudioStrip) return {
    type: "deferred-audio-wave"
  };
  if (fvi(t, e.nodeType) && !e.isGenMusicAudioStrip) return {
    type: "deferred-audio-wave"
  };
  if (e.nodeType === "text-node" && t.closest("[data-text-node-drag-overlay]")) return {
    type: "deferred-text-overlay"
  };
  if (lvi(t)) return {
    type: "pass"
  };
  if (cvi(t)) return {
    type: "pass"
  };
  if (dvi(t)) return {
    type: "stop"
  };
  if (kcr(t)) {
    if (e.globalCanvasDoodleBrushOrEraser) return {
      type: "pass"
    };
    if (!(e.ctrlKey || e.metaKey)) return {
      type: "stop"
    };
  }
  return (e.isCompactImageWidget || e.nodeType === "gen-3d") && _ln(t) && !(e.ctrlKey || e.metaKey) ? e.isFocusEditTargetGenNode ? {
    type: "pass"
  } : kln(t) ? {
    type: "stop"
  } : e.nodeDragBlocked ? {
    type: "pass"
  } : {
    type: "deferred-compact-preview"
  } : _cr(t) ? {
    type: "pass"
  } : e.nodeDragBlocked ? {
    type: "pass"
  } : {
    type: "drag"
  };
}

function qCe(e, t, n) {
  return Math.max(t, Math.min(n, e));
}

function w3i(e, t) {
  return !t.contains(e) || e === t ? !1 : e.getAttribute("contenteditable") === "false" ? !0 : e.hasAttribute("data-video") || e.hasAttribute("data-element") || e.hasAttribute("data-image") || e.hasAttribute("data-tag") || e.hasAttribute("data-prompt-ref") || e.hasAttribute("data-magic-item") || e.hasAttribute("data-smart-edit-protocol");
}

function x3i(e, t, n) {
  let r = e.startContainer.nodeType === Node.ELEMENT_NODE ? e.startContainer : e.startContainer.parentElement;
  for (; r && r !== t;) {
    if (w3i(r, t)) {
      const a = r.getBoundingClientRect(),
        i = n < a.left + a.width / 2,
        o = e.cloneRange();
      return i ? o.setStartBefore(r) : o.setStartAfter(r), o.collapse(!0), o;
    }
    r = r.parentElement;
  }
  return e;
}

function Ycn(e, t, n) {
  const r = e.ownerDocument.defaultView,
    a = r == null ? void 0 : r.getSelection();
  if (!a) return !1;
  const i = x3i(t, e, n);
  if (!e.contains(i.startContainer) || !e.isConnected || !i.startContainer.isConnected) return !1;
  try {
    return a.removeAllRanges(), a.addRange(i), !0;
  } catch {
    return !1;
  }
}

function Xcn(e, t) {
  var o;
  cy(e, t);
  const n = Kk(e);
  if (Math.abs(n - t) > 2) return null;
  const r = (o = e.ownerDocument.defaultView) == null ? void 0 : o.getSelection();
  if (!(r != null && r.rangeCount)) return null;
  const a = r.getRangeAt(0).getClientRects(),
    i = a.length > 0 ? a[0] : r.getRangeAt(0).getBoundingClientRect();
  return !i || i.width === 0 && i.height === 0 && i.left === 0 && i.top === 0 ? null : i;
}

function _3i(e, t, n) {
  const a = Ec(e).length;
  if (a === 0) return cy(e, 0), !0;
  let i = 0,
    o = a,
    s = 0;
  for (; i < o;) {
    const p = Math.floor((i + o) / 2),
      m = Xcn(e, p);
    if (!m) break;
    s += 1, m.top + m.height / 2 < n ? i = p + 1 : o = p;
  }
  if (s === 0) return !1;
  const l = new Set();
  for (const p of [i - 1, i, i + 1, i + 2]) p >= 0 && p <= a && l.add(p);
  let d = qCe(i, 0, a),
    u = 1 / 0,
    h = 0;
  for (const p of l) {
    const m = Xcn(e, p);
    if (!m) continue;
    h += 1;
    const f = m.left,
      y = m.top + m.height / 2,
      b = Math.abs(y - n) * 1e3 + Math.abs(f - t);
    b < u && (u = b, d = p);
  }
  return h === 0 ? !1 : (cy(e, d), Math.abs(Kk(e) - d) <= 2);
}

function k3i(e, t, n) {
  var l, d;
  const r = e.ownerDocument;
  if (!r.defaultView) return !1;
  const i = (l = r.caretRangeFromPoint) == null ? void 0 : l.call(r, t, n);
  if (i && e.contains(i.startContainer)) return Ycn(e, i, t);
  const o = (d = r.caretPositionFromPoint) == null ? void 0 : d.call(r, t, n);
  if (!(o != null && o.offsetNode) || !e.contains(o.offsetNode)) return !1;
  const s = r.createRange();
  try {
    const u = o.offsetNode.nodeType === Node.TEXT_NODE ? o.offsetNode.length : o.offsetNode.childNodes.length,
      h = qCe(o.offset, 0, u);
    return s.setStart(o.offsetNode, h), s.collapse(!0), Ycn(e, s, t);
  } catch {
    return !1;
  }
}

function Jcn(e, t, n) {
  return k3i(e, t, n) ? !0 : _3i(e, t, n);
}

const A3i = ["direction", "boxSizing", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontSize", "fontFamily", "lineHeight", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize", "whiteSpace", "wordWrap", "overflowWrap", "wordBreak"];

function S3i(e, t, n) {
  const a = (e.ownerDocument.defaultView ?? window).getComputedStyle(e),
    i = e.getBoundingClientRect(),
    o = parseFloat(a.borderLeftWidth) || 0,
    s = parseFloat(a.borderTopWidth) || 0,
    l = parseFloat(a.paddingLeft) || 0,
    d = parseFloat(a.paddingTop) || 0;
  return {
    contentX: t - i.left - o - l + e.scrollLeft,
    contentY: n - i.top - s - d + e.scrollTop,
    scrollTop: e.scrollTop,
    scrollLeft: e.scrollLeft
  };
}

function AFt(e, t) {
  const n = e.ownerDocument,
    a = (n.defaultView ?? window).getComputedStyle(e),
    i = n.createElement("div");
  A3i.forEach(u => {
    const h = a[u];
    if (typeof h == "string" && h) {
      const p = u.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
      i.style.setProperty(p, h);
    }
  }), i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word", i.style.width = `${e.offsetWidth}px`;
  const o = e.value.substring(0, t);
  i.textContent = o;
  const s = n.createElement("span");
  s.textContent = e.value.substring(t) || ".", i.appendChild(s), n.body.appendChild(i);
  const l = s.offsetTop,
    d = s.offsetLeft;
  return n.body.removeChild(i), {
    top: l,
    left: d
  };
}

function I3i(e, t, n) {
  const r = e.value;
  if (!r) return 0;
  let a = 0,
    i = r.length,
    o = 0;
  for (; a <= i;) {
    const s = Math.floor((a + i) / 2),
      {
        top: l,
        left: d
      } = AFt(e, s);
    l < n || l === n && d < t ? (o = s, a = s + 1) : i = s - 1;
  }
  return qCe(o, 0, r.length);
}

function C3i(e) {
  const n = (e.ownerDocument.defaultView ?? window).getComputedStyle(e),
    r = parseFloat(n.fontSize) || 16,
    a = parseFloat(n.lineHeight);
  return Number.isFinite(a) && a > 0 ? a : r * 1.5;
}

function Zcn(e, t) {
  try {
    const n = e.value,
      r = qCe(t, 0, n.length),
      {
        top: a,
        left: i
      } = AFt(e, r),
      l = (e.ownerDocument.defaultView ?? window).getComputedStyle(e),
      d = e.getBoundingClientRect(),
      u = parseFloat(l.borderLeftWidth) || 0,
      h = parseFloat(l.borderTopWidth) || 0,
      p = parseFloat(l.paddingLeft) || 0,
      m = parseFloat(l.paddingTop) || 0,
      f = d.left + u + p + i - e.scrollLeft,
      y = d.top + h + m + a - e.scrollTop;
    return {
      x: f,
      y
    };
  } catch {
    return null;
  }
}

function E3i(e, t, n) {
  const r = e.value.length;
  if (e.focus({
    preventScroll: !0
  }), r === 0) return e.setSelectionRange(0, 0), !0;
  const a = C3i(e);
  let i = 0,
    o = r;
  for (; i < o;) {
    const u = Math.floor((i + o) / 2),
      h = Zcn(e, u);
    if (!h) break;
    h.y + a * .45 < n ? i = u + 1 : o = u;
  }
  const s = new Set();
  for (const u of [i - 1, i, i + 1, i + 2]) u >= 0 && u <= r && s.add(u);
  let l = qCe(i, 0, r),
    d = 1 / 0;
  for (const u of s) {
    const h = Zcn(e, u);
    if (!h) continue;
    const p = h.x,
      m = h.y + a * .45,
      f = Math.abs(m - n) * 1e3 + Math.abs(p - t);
    f < d && (d = f, l = u);
  }
  return e.setSelectionRange(l, l), !0;
}

function aur(e, t) {
  const r = (e.ownerDocument.defaultView ?? window).getComputedStyle(e),
    a = parseFloat(r.lineHeight) || (parseFloat(r.fontSize) || 16) * 1.625,
    {
      top: i
    } = AFt(e, t),
    o = e.scrollTop,
    s = o + e.clientHeight;
  i < o + a * .25 ? e.scrollTop = Math.max(0, i - a) : i + a > s - a * .25 && (e.scrollTop = Math.max(0, Math.min(e.scrollHeight - e.clientHeight, i - e.clientHeight + a * 2)));
}

function T3i(e, t) {
  try {
    e.scrollTop = t.scrollTop, e.scrollLeft = t.scrollLeft;
    const n = I3i(e, t.contentX, t.contentY);
    return e.focus({
      preventScroll: !0
    }), e.setSelectionRange(n, n), aur(e, n), !0;
  } catch {
    return !1;
  }
}

function iur(e, t, n, r) {
  try {
    r && (e.scrollTop = r.scrollTop, e.scrollLeft = r.scrollLeft), E3i(e, t, n);
    const a = e.selectionStart ?? 0;
    return aur(e, a), !0;
  } catch {
    try {
      const a = S3i(e, t, n);
      return r && (a.scrollTop = r.scrollTop, a.scrollLeft = r.scrollLeft), T3i(e, a);
    } catch {
      return !1;
    }
  }
}

function MMe(e, t, n, r) {
  e(h3i(t, n.x, n.y, r));
}

function M3i(e) {
  const t = g.useRef(null),
    n = g.useRef(null),
    r = g.useCallback(() => {
      var h;
      n.current != null && (window.clearTimeout(n.current), n.current = null), (h = t.current) == null || h.call(t), t.current = null;
    }, []),
    a = g.useCallback((h, p, m) => {
      if (h.shiftKey) return;
      r();
      const f = EMe(h),
        y = {
          x: h.clientX,
          y: h.clientY
        };
      t.current = TMe({
        start: y,
        slopPx: m,
        onSlop: () => {
          t.current = null, MMe(e.onNodeMouseDown, p, y, f);
        }
      });
    }, [r, e.onNodeMouseDown]),
    i = g.useCallback((h, p) => {
      a(h, p, ZSi);
    }, [a]),
    o = g.useCallback((h, p) => {
      a(h, p, t3i);
    }, [a]),
    s = g.useCallback((h, p) => {
      a(h, p, e3i);
    }, [a]),
    l = g.useCallback((h, p, m) => {
      if (h.shiftKey) return;
      r();
      const f = EMe(h),
        y = {
          x: h.clientX,
          y: h.clientY
        };
      t.current = TMe({
        start: y,
        slopPx: n3i,
        onSlop: () => {
          t.current = null, m.blur(), MMe(e.onNodeMouseDown, p, y, f);
        },
        onRelease: () => {
          t.current = null, m.isConnected && (m.focus({
            preventScroll: !0
          }), iur(m, y.x, y.y));
        }
      });
    }, [r, e.onNodeMouseDown]),
    d = g.useCallback((h, p, m, f) => {
      if (h.shiftKey) return;
      r();
      const y = EMe(h),
        b = {
          x: h.clientX,
          y: h.clientY
        };
      t.current = TMe({
        start: b,
        slopPx: r3i,
        onSlop: () => {
          t.current = null, MMe(e.onNodeMouseDown, p, b, y);
        },
        onRelease: v => {
          var k, A, S;
          if (t.current = null, m === "target") {
            (k = e.onFocusEditOpenTargetPrompt) == null || k.call(e, e.nodeId);
            return;
          }
          f && ((A = e.onFocusEditSelectSourceNode) == null || A.call(e, e.nodeId));
          const w = (p.querySelector("[data-input-image-media]") ?? p).getBoundingClientRect();
          if (w.width > 0 && w.height > 0) {
            const C = Math.min(1, Math.max(0, (v.clientX - w.left) / w.width)),
              I = Math.min(1, Math.max(0, (v.clientY - w.top) / w.height));
            (S = e.onFocusEditPointPick) == null || S.call(e, e.nodeId, C, I);
          }
        }
      });
    }, [r, e.nodeId, e.onFocusEditOpenTargetPrompt, e.onFocusEditPointPick, e.onFocusEditSelectSourceNode, e.onNodeMouseDown]),
    u = g.useCallback((h, p) => {
      if (h.shiftKey) return;
      r();
      const m = EMe(h),
        f = {
          x: h.clientX,
          y: h.clientY
        };
      t.current = TMe({
        start: f,
        slopPx: i3i,
        metric: "manhattan",
        onSlop: () => {
          t.current = null, n.current != null && (window.clearTimeout(n.current), n.current = null);
        },
        onRelease: () => {
          t.current = null, n.current != null && (window.clearTimeout(n.current), n.current = null);
        }
      });
      const y = e.nodeType === "text-node" ? s3i : o3i;
      n.current = window.setTimeout(() => {
        r(), !gvi(f.x, f.y) && MMe(e.onNodeMouseDown, p, f, m);
      }, y);
    }, [r, e.nodeType, e.onNodeMouseDown]);
  return g.useEffect(() => r, [r]), {
    startAudioWaveformDeferredNodeDrag: i,
    startTextNodeDragOverlayDeferredDrag: o,
    startAgentTextareaBlankDeferredDrag: l,
    startCompactGenPreviewDeferredNodeDrag: s,
    startFocusEditDeferredInteraction: d,
    startInputLongPressDrag: u
  };
}

function P3i(e, t, n) {
  const r = n == null ? void 0 : n.capture,
    a = o => e(o),
    i = o => t(o, o);
  return window.addEventListener("pointermove", a, r), window.addEventListener("pointerup", i, r), window.addEventListener("pointercancel", i, r), window.addEventListener("mousemove", a, r), window.addEventListener("mouseup", i, r), () => {
    window.removeEventListener("pointermove", a, r), window.removeEventListener("pointerup", i, r), window.removeEventListener("pointercancel", i, r), window.removeEventListener("mousemove", a, r), window.removeEventListener("mouseup", i, r);
  };
}

function our(e) {
  const t = g.useRef(e),
    n = g.useRef(!1),
    r = g.useRef(null);
  return g.useLayoutEffect(() => {
    t.current = e;
  }), g.useLayoutEffect(() => (n.current = !0, () => {
    var a;
    n.current = !1, (a = r.current) == null || a.call(r);
  }), []), g.useCallback((a, i) => {
    var h, p, m, f, y;
    if (!n.current || a.button !== 0 || (a.stopPropagation(), a.preventDefault(), t.current.setHover(!0), (p = (h = t.current).begin) == null || p.call(h), (f = (m = t.current).hideDial) == null || f.call(m), (y = r.current) == null || y.call(r), !n.current)) return;
    const o = a.clientX,
      s = a.clientY;
    let l = !1;
    const d = () => {
        u(), r.current === d && (r.current = null);
      },
      u = P3i(b => {
        if (l || Math.hypot(b.clientX - o, b.clientY - s) <= 6) return;
        l = !0;
        const v = {
          clientX: b.clientX,
          clientY: b.clientY,
          stopPropagation: () => {},
          preventDefault: () => {}
        };
        i === "input" ? t.current.startInput(v) : t.current.startOutput(v);
      }, () => {
        d();
      }, {
        capture: !0
      });
    r.current = d;
  }, []);
}

const Yke = {
    right: {
      left: 24,
      right: 40,
      top: 40,
      bottom: 40
    },
    left: {
      left: 40,
      right: 24,
      top: 40,
      bottom: 40
    }
  },
  R3i = "transform 0.25s cubic-bezier(0.34, 1.8, 0.64, 1)",
  edn = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  N3i = 250;

function j3i(e = 8, t = 8) {
  return typeof e == "number" ? {
    left: e,
    right: e,
    top: e,
    bottom: e
  } : {
    left: e.left ?? t,
    right: e.right ?? t,
    top: e.top ?? t,
    bottom: e.bottom ?? t
  };
}

function tdn(e, t) {
  const n = e.getBoundingClientRect();
  return {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height,
    zoom: t
  };
}

function D3i(e, t, n, r) {
  const a = r > 0 ? r : 1;
  return {
    x: (e - n.x) / a,
    y: (t - n.y) / a
  };
}

function L3i(e, t) {
  return e.x < -t.left || e.x > t.right || e.y < -t.top || e.y > t.bottom;
}

function O3i(e, t, n, r = Yke.right) {
  const a = n.zoom > 0 ? n.zoom : 1,
    i = D3i(e, t, {
      x: n.left + n.width / 2,
      y: n.top + n.height / 2
    }, a);
  return L3i(i, j3i(r)) ? null : i;
}

function ndn(e, t, n, r) {
  if (e) {
    if (r !== void 0 && (e.style.transition = r), t === 0 && n === 0 && r === void 0) {
      e.style.transform = "";
      return;
    }
    e.style.transform = `translate3d(${t}px, ${n}px, 0)`;
  }
}

function Ikt(e, t, n = Yke.right) {
  const r = g.useRef(null),
    a = g.useRef(null),
    i = g.useRef(null),
    o = g.useRef({
      x: 0,
      y: 0
    }),
    s = g.useRef(null),
    l = g.useRef(!0),
    d = g.useRef(!1),
    u = g.useRef(null),
    h = g.useRef({
      zoom: e,
      onLeave: t,
      range: n
    }),
    p = g.useRef(!1),
    m = g.useRef(() => {}),
    f = g.useCallback(A => {
      m.current(A.clientX, A.clientY);
    }, []);
  g.useLayoutEffect(() => {
    h.current = {
      zoom: e,
      onLeave: t,
      range: n
    };
  }), g.useLayoutEffect(() => (p.current = !0, () => {
    p.current = !1, s.current != null && cancelAnimationFrame(s.current), u.current != null && window.clearTimeout(u.current), s.current = null, u.current = null, i.current = null, d.current = !1, window.removeEventListener("mousemove", f);
  }), [f]);
  const y = g.useCallback((A, S, C) => {
      if (p.current) {
        if (o.current = {
          x: A,
          y: S
        }, C !== void 0) {
          ndn(r.current, A, S, C);
          return;
        }
        s.current == null && (s.current = requestAnimationFrame(() => {
          s.current = null, ndn(r.current, o.current.x, o.current.y);
        }));
      }
    }, []),
    b = g.useCallback((A, S) => {
      if (!p.current || !d.current) return;
      const C = h.current;
      let I = i.current;
      if (!I || I.zoom !== C.zoom) {
        const M = a.current;
        if (!M) return;
        I = tdn(M, C.zoom), i.current = I;
      }
      const E = O3i(A, S, I, C.range);
      if (!E) {
        y(0, 0, edn);
        return;
      }
      if (l.current) {
        l.current = !1, y(E.x, E.y, R3i), u.current != null && window.clearTimeout(u.current), u.current = window.setTimeout(() => {
          const M = r.current;
          M && (M.style.transition = "none");
        }, N3i);
        return;
      }
      y(E.x, E.y);
    }, [y]);
  m.current = b;
  const v = g.useCallback(A => {
      if (!p.current) return;
      const S = r.current;
      S && (S.style.transition = "none", S.style.transform = "translate3d(0px, 0px, 0px)"), a.current = A, i.current = tdn(A, h.current.zoom), l.current = !0, d.current = !0, window.removeEventListener("mousemove", f), window.addEventListener("mousemove", f);
    }, [f]),
    _ = g.useCallback(A => {
      p.current && v(A.currentTarget);
    }, [v]),
    w = g.useCallback(A => {
      p.current && (d.current || v(A.currentTarget), b(A.clientX, A.clientY));
    }, [v, b]),
    k = g.useCallback(A => {
      p.current && (d.current = !1, a.current = null, i.current = null, l.current = !0, window.removeEventListener("mousemove", f), u.current != null && (window.clearTimeout(u.current), u.current = null), y(0, 0, edn), h.current.onLeave(A));
    }, [y, f]);
  return {
    elementRef: r,
    onMouseEnter: _,
    onMouseMove: w,
    onMouseLeave: k
  };
}

const B3i = "left 300ms cubic-bezier(0.4, 0, 0.2, 1), top 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1), height 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s ease-out",
  F3i = 360,
  FUe = new Set(),
  _je = new Map(),
  D1e = new Map();

function sur(e) {
  var t;
  (t = _je.get(e)) == null || t.forEach(n => n());
}

function z3i(e, t) {
  let n = _je.get(e);
  return n || (n = new Set(), _je.set(e, n)), n.add(t), () => {
    n.delete(t), n.size === 0 && _je.delete(e);
  };
}

function lur(e) {
  const t = D1e.get(e);
  t && (clearTimeout(t), D1e.delete(e)), FUe.delete(e) && sur(e);
}

function U3i(e) {
  const t = FUe.has(e);
  FUe.add(e);
  const n = D1e.get(e);
  n && clearTimeout(n), D1e.set(e, setTimeout(() => {
    D1e.delete(e), lur(e);
  }, F3i)), t || sur(e);
}

function $3i(e) {
  if (typeof document > "u") return;
  const t = document.querySelector(`.node-wrapper[data-node-id="${CSS.escape(e)}"]`);
  t instanceof HTMLElement && t.getBoundingClientRect();
}

function cur(e) {
  return g.useSyncExternalStore(t => z3i(e, t), () => FUe.has(e), () => !1);
}

function G3i({
  analyses: e,
  isAnalyzing: t,
  isActiveSource: n,
  isDark: r,
  onLevelChange: a,
  onDismissAnalysis: i
}) {
  on();
  const [o, s] = g.useState(null);
  if (!n && !t && e.length === 0) return null;
  const l = n && !t,
    d = r ? "border-zinc-700/90 bg-[#1f1f1f] text-zinc-100 shadow-2xl ring-1 ring-black/40" : "border-zinc-200 bg-white text-zinc-900 shadow-xl";
  return c.jsxs("div", {
    className: `absolute inset-0 z-[120] rounded-[inherit] ${e.length > 0 || o || l ? "overflow-visible" : "overflow-hidden"}`,
    "data-focus-edit-overlay": "",
    children: [l && c.jsx("div", {
      className: "pointer-events-none absolute inset-0 z-[125] cursor-crosshair",
      "data-focus-edit-pick-layer": "",
      children: c.jsx("div", {
        className: "pointer-events-none absolute inset-0 bg-cyan-400/5"
      })
    }), t && c.jsxs(c.Fragment, {
      children: [c.jsxs("div", {
        className: "pointer-events-none absolute right-2 top-2 z-[130] flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-medium text-white shadow-lg backdrop-blur-sm",
        children: [c.jsx(Ua, {
          size: 12,
          className: "animate-spin opacity-90"
        }), x("细节分析中…")]
      }), c.jsx("div", {
        className: "pointer-events-none absolute inset-0 z-[128] bg-black/20"
      })]
    }), !t && e.map(u => {
      const h = Gfi(u),
        [p, m, f, y] = h.box_2d,
        b = o === u._markId;
      return c.jsxs(Ia.Fragment, {
        children: [c.jsx("div", {
          className: "pointer-events-none absolute z-[129] rounded-sm border-2 border-red-400/90 bg-red-400/10",
          style: {
            left: `${p * 100}%`,
            top: `${m * 100}%`,
            width: `${(f - p) * 100}%`,
            height: `${(y - m) * 100}%`
          }
        }), c.jsx("div", {
          className: "pointer-events-none absolute z-[130]",
          style: {
            left: `${(p + f) / 2 * 100}%`,
            top: `${Math.max(1, m * 100 - 1)}%`,
            transform: "translate(-50%, -100%)"
          },
          children: c.jsxs("div", {
            className: "pointer-events-auto relative flex items-center gap-1",
            children: [c.jsxs("button", {
              type: "button",
              className: `flex max-w-[180px] items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium shadow-lg ${r ? "border-zinc-600 bg-[#1f1f1f] text-white hover:bg-zinc-800" : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"} ring-1 ring-cyan-400/50`,
              onMouseDown: v => v.stopPropagation(),
              onClick: v => {
                v.stopPropagation(), s(_ => _ === u._markId ? null : u._markId);
              },
              children: [c.jsx("span", {
                className: "truncate",
                children: h.label_name
              }), c.jsx(Mi, {
                size: 10,
                className: `shrink-0 opacity-70 ${b ? "rotate-180" : ""}`
              })]
            }), i ? c.jsx("button", {
              type: "button",
              className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/90 shadow hover:bg-black/80",
              title: x("移除此分析"),
              onMouseDown: v => v.stopPropagation(),
              onClick: v => {
                v.stopPropagation(), s(null), i(u._markId);
              },
              children: c.jsx(Na, {
                size: 10
              })
            }) : null, b && c.jsx("div", {
              className: `absolute left-0 top-full z-[140] mt-1 min-w-[148px] overflow-hidden rounded-lg border py-0.5 ${d}`,
              onMouseDown: v => v.stopPropagation(),
              children: ["detail", "part", "overall"].map(v => {
                const _ = u.levels[v],
                  w = u.activeLevel === v;
                return c.jsxs("button", {
                  type: "button",
                  className: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[10px] ${w ? r ? "bg-zinc-800 text-cyan-200" : "bg-cyan-50 text-cyan-800" : r ? "bg-[#1f1f1f] text-zinc-200 hover:bg-zinc-800" : "bg-white text-zinc-800 hover:bg-zinc-50"}`,
                  onClick: k => {
                    k.stopPropagation(), s(null), a(u._markId, v);
                  },
                  children: [w ? c.jsx("span", {
                    className: "h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"
                  }) : c.jsx("span", {
                    className: "w-1.5 shrink-0"
                  }), c.jsxs("span", {
                    className: "flex min-w-0 flex-col",
                    children: [c.jsx("span", {
                      className: "truncate font-medium",
                      children: _.label_name
                    }), c.jsx("span", {
                      className: `truncate text-[9px] ${r ? "text-zinc-500" : "text-zinc-400"}`,
                      children: x(k_t[v])
                    })]
                  })]
                }, v);
              })
            })]
          })
        })]
      }, u._markId);
    })]
  });
}

const dur = 150,
  Xke = new Map(),
  MM = new Map();

let ooe = null,
  Aye = null;

function V3i() {
  if (Aye = null, Yi()) {
    const n = Date.now() + dur;
    for (const r of MM.values()) r.dueAt = n;
    Jke();
    return;
  }
  const e = Date.now(),
    t = new Map();
  for (const [n, r] of MM) {
    if (Xke.get(n) !== r.info) {
      MM.delete(n);
      continue;
    }
    r.dueAt > e || (MM.delete(n), t.set(r.info.nodeId, r.info.onEdgeUpdate));
  }
  for (const [n, r] of t) r == null || r(n);
  Jke();
}

function Jke() {
  if (Aye !== null && clearTimeout(Aye), Aye = null, MM.size === 0) return;
  let e = Number.POSITIVE_INFINITY;
  for (const t of MM.values()) e = Math.min(e, t.dueAt);
  Aye = setTimeout(V3i, Math.max(0, e - Date.now()));
}

function H3i() {
  return ooe || (ooe = new ResizeObserver(e => {
    if (!(Yi() || f$())) {
      for (const t of e) {
        const n = Xke.get(t.target);
        if (!n) continue;
        const r = t.target,
          a = r.offsetWidth || t.contentRect.width,
          i = r.offsetHeight || t.contentRect.height;
        mWe(n.nodeId, a, i), MM.set(t.target, {
          info: n,
          dueAt: Date.now() + dur
        });
      }
      MM.size > 0 && Jke();
    }
  })), ooe;
}

function W3i(e, t, n) {
  const r = MM.delete(e);
  Xke.set(e, {
    nodeId: t,
    onEdgeUpdate: n
  }), H3i().observe(e), r && Jke();
}

function q3i(e) {
  if (!Xke.get(e)) return;
  const n = MM.delete(e);
  Xke.delete(e), ooe == null || ooe.unobserve(e), n && Jke();
}

const K3i = .18,
  Q3i = .25;

function uur(e) {
  return Number.isFinite(e) && e > 0 && e < Q3i;
}

function y9(e) {
  const t = typeof e == "number" && Number.isFinite(e) ? e : 1;
  if (uur(t)) return 1;
  const n = pve(),
    r = n + K3i;
  return t >= r ? 1 : t <= n ? 0 : (t - n) / (r - n);
}

const kje = new Set(),
  Ckt = new Set();

let ust = !1;

function rdn() {
  ust || (ust = !0, queueMicrotask(() => {
    ust = !1, Ckt.forEach(e => e());
  }));
}

function adn(e, t) {
  const n = kje.has(e);
  if (t) {
    n || (kje.add(e), rdn());
    return;
  }
  n && (kje.delete(e), rdn());
}

function Y3i(e) {
  return Ckt.add(e), () => {
    Ckt.delete(e);
  };
}

function X3i(e) {
  return g.useSyncExternalStore(Y3i, () => kje.has(e), () => !1);
}

function SFt(e, t) {
  g.useLayoutEffect(() => (adn(e, t), () => adn(e, !1)), [e, t]);
}

const hst = "data-node-hover-chrome",
  zUe = "qdm-gen-preview-hover-chrome-enter",
  CW = "qdm-gen-preview-hover-chrome-leave";

function hur(e, t) {
  if (!e) return !1;
  const n = e.getAttribute(hst) === "true";
  return t === n ? !1 : (t ? e.setAttribute(hst, "true") : e.removeAttribute(hst), !0);
}

function pst(e) {
  e.stopPropagation();
}

function J3i({
  isDark: e,
  disabled: t,
  onPick: n
}) {
  return on(), c.jsxs("button", {
    type: "button",
    disabled: t,
    "aria-disabled": t,
    className: e ? "flex items-center gap-2 rounded-lg border border-zinc-500 bg-transparent px-4 py-2 text-zinc-100 hover:bg-zinc-800/60 disabled:cursor-not-allowed disabled:opacity-50" : "flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:bg-[#1f1f1f] disabled:cursor-not-allowed disabled:opacity-50",
    onClick: r => {
      pst(r), t || n();
    },
    onPointerDown: pst,
    onMouseDown: pst,
    children: [c.jsx(ml, {
      size: 16,
      strokeWidth: 2
    }), c.jsx("span", {
      className: "text-sm font-medium",
      children: x("上传")
    })]
  });
}

function Z3i({
  isDark: e
}) {
  return on(), c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      className: "mt-2 text-center text-[10px] text-zinc-500",
      children: [x("或拖放文件到此处"), c.jsx("br", {}), x("或 Ctrl+V 粘贴")]
    }), c.jsx("div", {
      className: `mt-1 text-center text-[9px] ${e ? "text-zinc-600" : "text-zinc-400"}`,
      children: x("支持图片、视频、音频")
    }), c.jsxs("div", {
      className: `mt-0.5 text-center text-[9px] ${e ? "text-zinc-600" : "text-zinc-400"}`,
      children: [x("图片 "), Tz.image, x(" · 视频 "), Tz.video, x(" · 音频 "), Tz.audio]
    })]
  });
}

function IFt() {
  return on(), c.jsxs("div", {
    className: "input-image-upload-busy",
    "aria-hidden": !0,
    children: [c.jsx("span", {
      className: "input-image-upload-preview-mask"
    }), c.jsx("span", {
      className: "input-image-upload-spinner"
    })]
  });
}

function e4i(e, t) {
  if (e) return {
    title: "切分中…"
  };
  const n = String(t || "image").toLowerCase();
  return n === "video" ? {
    title: "视频上传中...",
    hint: "上传至云端素材库"
  } : n === "audio" ? {
    title: "音频上传中...",
    hint: "上传至云端素材库"
  } : {
    title: "图片上传中...",
    hint: "上传至云端素材库"
  };
}

function pur({
  isDark: e,
  isCropSplitPending: t,
  isOssUploading: n,
  previewUrl: r,
  mediaType: a
}) {
  on();
  const [i, o] = g.useState(!1),
    s = Ia.useRef(null);
  g.useEffect(() => {
    o(!1);
    const m = s.current;
    m != null && m.complete && m.naturalWidth > 0 && o(!0);
  }, [r]);
  const l = g.useCallback(() => {
      o(!0);
    }, []),
    d = !!r && !t,
    u = d && i,
    h = e4i(t, a),
    p = n && !t ? `${h.title} ${h.hint ?? ""}`.trim() : h.title;
  return c.jsxs("div", {
    className: `input-image-upload-shell ${e ? "input-image-upload-shell--dark" : "input-image-upload-shell--light"}`,
    "data-testid": "upload-image-uploading-overlay",
    "data-status": t ? "decoding" : "uploading",
    "aria-busy": !0,
    children: [d ? c.jsx("img", {
      ref: s,
      alt: "",
      "aria-hidden": !i || void 0,
      className: "input-image-upload-preview",
      decoding: "async",
      draggable: !1,
      src: r,
      style: {
        visibility: i ? "visible" : "hidden"
      },
      onLoad: l
    }) : null, u ? c.jsx(IFt, {}) : c.jsxs(c.Fragment, {
      children: [c.jsx("span", {
        className: "input-image-upload-spinner input-image-upload-spinner--inline"
      }), c.jsxs("div", {
        className: `input-image-upload-copy ${e ? "text-white/38" : "text-zinc-500"}`,
        children: [c.jsx("span", {
          className: "input-image-upload-copy__title",
          children: h.title
        }), n && h.hint ? c.jsx("span", {
          className: "input-image-upload-copy__hint",
          children: h.hint
        }) : null]
      })]
    }), c.jsx("span", {
      "aria-live": "polite",
      className: "input-image-upload-sr-only",
      role: "status",
      children: p
    })]
  });
}

function PMe(e) {
  const t = String(e || "").trim();
  return t ? t.startsWith("blob:") ? !0 : vs(t) : !1;
}

function t4i(e) {
  const t = String(e || "").trim();
  return !t || Er.isContentRef(t) ? !1 : ei() ? vs(t) && !S3(t) ? !1 : !!gd(t) : t.startsWith("data:") || /^https?:\/\//i.test(t) ? !0 : t.startsWith("blob:") ? Nd(t) : !1;
}

function idn(e, t) {
  return !(!t4i(t) || U$(e, t));
}

const n4i = 4;

let mst = 0;

function r4i(e, t) {
  return t.selected - e.selected || e.distance - t.distance || t.displayEdge - e.displayEdge;
}

function odn(e) {
  const t = Cd(),
    n = t.zoom > 0 ? t.zoom : 1,
    r = typeof window < "u" ? window.innerWidth : 1280,
    a = typeof window < "u" ? window.innerHeight : 800,
    i = (-t.x + r / 2) / n,
    o = (-t.y + a / 2) / n,
    s = e.width || 0,
    l = e.height || 0;
  return {
    selected: ami().has(e.id) ? 1 : 0,
    distance: Math.hypot(e.x + s / 2 - i, e.y + l / 2 - o),
    displayEdge: Math.max(s, l) * n
  };
}

const Xre = [],
  a4i = {
    selected: 0,
    distance: Number.POSITIVE_INFINITY,
    displayEdge: 0
  };

function i4i() {
  var e, t;
  for (; Xre.length > 0;) {
    const n = Xre.shift();
    if (!n) return;
    if (n.onAbort && ((e = n.signal) == null || e.removeEventListener("abort", n.onAbort)), !((t = n.signal) != null && t.aborted)) {
      n.resolve();
      return;
    }
  }
}

async function mur(e, t, n = a4i) {
  if (t != null && t.aborted) throw new DOMException("Aborted", "AbortError");
  if (mst >= n4i && (await new Promise((r, a) => {
    const i = {
      resolve: r,
      reject: a,
      signal: t,
      priority: n
    };
    t && (i.onAbort = () => {
      const o = Xre.indexOf(i);
      o >= 0 && Xre.splice(o, 1), a(new DOMException("Aborted", "AbortError"));
    }, t.addEventListener("abort", i.onAbort, {
      once: !0
    })), Xre.push(i), Xre.sort((o, s) => r4i(o.priority, s.priority));
  })), t != null && t.aborted) throw new DOMException("Aborted", "AbortError");
  mst += 1;
  try {
    return await e();
  } finally {
    mst -= 1, i4i();
  }
}

async function o4i(e, t, n) {
  const r = [...new Set(e.map(a => String(a || "").trim()).filter(Boolean))];
  return r.length === 0 ? null : mur(async () => {
    const {
      readLocalOriginalAssetAsUrl: a
    } = await Ie(async () => {
      const {
        readLocalOriginalAssetAsUrl: i
      } = await Promise.resolve().then(() => Ui);
      return {
        readLocalOriginalAssetAsUrl: i
      };
    }, void 0, import.meta.url);
    for (const i of r) {
      if (t != null && t.aborted) return null;
      try {
        const o = await a(i),
          s = Uwe(o);
        if (s) return s;
      } catch {}
    }
    return null;
  }, t, n);
}

async function fur(e, t, n) {
  const r = [...new Set(e.map(a => String(a || "").trim()).filter(Boolean))];
  return r.length === 0 ? null : mur(async () => {
    for (const a of r) {
      if (t != null && t.aborted) return null;
      try {
        const {
            ensureLocalPreviewDisplayUrl: i
          } = await Ie(async () => {
            const {
              ensureLocalPreviewDisplayUrl: s
            } = await Promise.resolve().then(() => Ui);
            return {
              ensureLocalPreviewDisplayUrl: s
            };
          }, void 0, import.meta.url),
          o = await i(a, {
            maxDim: 256,
            allowVideoOriginal: xIt()
          });
        if (o) {
          const s = gd(o);
          if (s) return s;
        }
      } catch {}
      try {
        const i = await Wd.getPreview(a);
        if (i) {
          const o = gd(i);
          if (o) return o;
        }
      } catch {}
      try {
        const i = await Wd.getThumbnail(a);
        if (i) {
          const o = gd(i);
          if (o) return o;
        }
      } catch {}
    }
    return null;
  }, t, n);
}

function fst(e) {
  return xf(e);
}

async function s4i(e, t, n) {
  const r = r5e(e, t),
    a = e.settings || {},
    i = e.type === "preview" && a._isStoryboardMosaic && typeof a._stitchedPreviewUrl == "string" ? String(a._stitchedPreviewUrl).trim() : "",
    o = aCe(e),
    s = (Er.isContentRef(t) ? t : "") || (i && Er.isContentRef(i) ? i : "") || (typeof e.content == "string" && Er.isContentRef(e.content) ? e.content : "");
  if (s) {
    const l = Er.extractId(s),
      d = Er.getFromCacheSync(l);
    if (d && (!o || /data:image\/(gif|webp)/i.test(d))) return d;
    try {
      if (o) {
        const u = await Er.get(l);
        if (u) return u;
      } else {
        const u = await Wd.getThumbnail(l);
        if (u) return u;
        const h = await Er.getForZoom(l, .25);
        if (h) return h;
      }
    } catch {}
  }
  if (o) {
    const l = String((e.settings || {})[_i] || "").trim(),
      d = Uwe(l);
    if (d) return d;
    if (r.length > 0) {
      const u = await o4i(r, n, odn(e));
      if (u) return u;
    }
  }
  if (r.length === 0) return null;
  if (ei()) return fur(r, n, odn(e));
  for (const l of r) {
    try {
      const {
          ensureLocalPreviewDisplayUrl: d
        } = await Ie(async () => {
          const {
            ensureLocalPreviewDisplayUrl: h
          } = await Promise.resolve().then(() => Ui);
          return {
            ensureLocalPreviewDisplayUrl: h
          };
        }, void 0, import.meta.url),
        u = await d(l, {
          maxDim: 256,
          allowVideoOriginal: xIt()
        });
      if (u) {
        const h = gd(u);
        if (h) return h;
      }
    } catch {}
    try {
      const {
          assetStore: d
        } = await Ie(async () => {
          const {
            assetStore: h
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: h
          };
        }, void 0, import.meta.url),
        u = await d.getAssetUrl(l, e.content);
      if (u) {
        const h = gd(u);
        if (h) return h;
      }
    } catch {}
  }
  return null;
}

function tV(e, t, n = !1) {
  if (n) {
    const a = Uwe(e);
    return a || Uwe(t);
  }
  const r = String(e || "").trim();
  if (r && !Er.isContentRef(r)) {
    if (ei()) {
      const i = gd(r);
      return i && vs(i) && !S3(i) ? gd(t) : i || gd(t);
    }
    if (r.startsWith("blob:")) {
      const i = Nd(r) ? r : "";
      if (i) return i;
      const o = String(t || "").trim();
      return o && !o.startsWith("blob:") && !Ko(o) ? ym(o) || o : "";
    }
    const a = ym(r);
    if (a) return a;
    if (Ko(r) || /\/images\//i.test(r) && !/\/thumbnails\//i.test(r)) {
      const i = String(t || "").trim();
      return !i || Ko(i) || /\/images\//i.test(i) && !/\/thumbnails\//i.test(i) || i.startsWith("blob:") && !Nd(i) ? "" : ym(i) || i;
    }
    return r;
  }
  return ei() ? gd(t) : !t || Ko(t) || /\/images\//i.test(t) && !/\/thumbnails\//i.test(t) || t.startsWith("blob:") && !Nd(t) ? "" : ym(t) || t;
}

function KCe(e) {
  var y, b, v;
  const t = o9(e.id),
    r = !(e.type === "input-image" && (!!e._expandPending || !!((y = e.settings) != null && y._expandPending) || !!((b = e.settings) != null && b._eraseResultNode) || !!((v = e.settings) != null && v._expandResultNode))) && (t || e.isGenerating === !0 || Px(e.id)),
    a = r ? "" : fst(e),
    i = aCe(e),
    o = _E(e.id),
    s = g.useRef(o),
    l = g.useRef(""),
    [d, u] = g.useState(0),
    [h, p] = g.useState(() => tV(a, o, i));
  g.useEffect(() => {
    if (ei()) return Zhe(() => {
      l.current = PMe(a) ? a : "", s.current = "", u(_ => _ + 1);
    });
  }, [a]), g.useEffect(() => {
    if (r) return;
    const _ = ei() && PMe(a) && l.current === a;
    l.current && a && l.current !== a && !PMe(a) && (l.current = "");
    const w = _E(e.id),
      k = (s.current && s.current !== l.current ? s.current : "") || (w && w !== l.current ? w : ""),
      A = _ ? k : tV(a, k, i);
    let S = !1;
    const C = new AbortController(),
      I = () => S ? !0 : (p(A), a && !Er.isContentRef(a) && !_ && idn(e, a) ? (s.current = a, !0) : !1),
      E = () => {
        S || C.signal.aborted || (async () => {
          try {
            const T = await s4i(e, a, C.signal);
            if (S || !T || Er.isContentRef(T)) return;
            const P = fst(e);
            if (idn(e, P)) {
              s.current = P, p(P);
              return;
            }
            s.current = T, p(T);
          } catch (T) {
            if (T instanceof DOMException && T.name === "AbortError") return;
            console.warn("[useCanvasNodeThumbSrc] async resolve failed:", T);
          }
        })();
      },
      M = () => {
        I() || E();
      };
    if (Yi()) {
      const T = $v(P => {
        P || (T(), M());
      });
      return () => {
        S = !0, C.abort(), T();
      };
    }
    return M(), () => {
      S = !0, C.abort();
    };
  }, [r, e.id, e.type, e.content, e.settings, a, d, i]);
  const m = g.useCallback(() => {
      if (r) return;
      const _ = tV(h, s.current, i);
      if (!_ || Er.isContentRef(_) || /\/images\//i.test(_) && !/\/thumbnails\//i.test(_) && !Qc(_) && !i) return;
      const k = /\/images\//i.test(_) && Qc(_) ? _ : Cp(_) || _;
      s.current = k, F6(e.id, k);
    }, [r, e.id, h, i]),
    f = g.useCallback(() => {
      if (r) return;
      const _ = tV(h, s.current, i);
      if (Gwe(e.id, _), !ei() && _.startsWith("blob:")) {
        l.current = _;
        const w = fst(e),
          k = (w && !w.startsWith("blob:") ? tV(w, "", i) : "") || (() => {
            const A = e.settings || {},
              S = [A[Pi], A[_i], typeof e.content == "string" ? e.content : ""];
            for (const C of S) {
              const I = String(C || "").trim();
              if (!I || I.startsWith("blob:") || Er.isContentRef(I)) continue;
              const E = tV(I, "", i);
              if (E) return E;
            }
            return "";
          })();
        k && (s.current = k, p(k));
        return;
      }
      if (!(!ei() || !PMe(_))) {
        if (l.current === _) {
          p("");
          return;
        }
        l.current = _, (async () => {
          const w = r5e(e, _);
          try {
            const {
              invalidateLocalPreviewDisplayUrlCache: A
            } = await Ie(async () => {
              const {
                invalidateLocalPreviewDisplayUrlCache: S
              } = await Promise.resolve().then(() => Ui);
              return {
                invalidateLocalPreviewDisplayUrlCache: S
              };
            }, void 0, import.meta.url);
            A({
              assetIds: w,
              failedUrl: _
            });
          } catch {}
          if (w.length === 0) {
            p("");
            return;
          }
          const k = await fur(w);
          if (!k || k === _) {
            p("");
            return;
          }
          s.current = k, F6(e.id, k), p(k);
        })();
      }
    }, [r, e, h, i]);
  return {
    src: tV(h, s.current, i),
    preferEager: !!h && _E(e.id) === h,
    onMediaLoad: m,
    onMediaError: f
  };
}

function Sp(e) {
  return e ? "border-transparent bg-[#1f1f1f]" : "border-zinc-200 bg-zinc-50";
}

function cO(e) {
  return e ? "bg-[#1f1f1f]" : "bg-white";
}

const sdn = 80;

let L1e = -1,
  UUe = -1,
  Aje = !1;

const Ekt = new Set();

let ldn = !1,
  $Ue = 0,
  soe = null;

function gur() {
  return aZ(Cd().zoom, Aje);
}

function yur() {
  const e = Cd().zoom;
  return Aje = aHe(e, void 0, Aje), Aje ? 0 : e <= 1.3 ? 1 : 2;
}

function Sye() {
  if (Yi() || performance.now() < $Ue) return;
  const e = gur(),
    t = yur();
  e === L1e && t === UUe || (L1e = e, UUe = t, Ekt.forEach(n => {
    try {
      n();
    } catch {}
  }));
}

function bur() {
  soe != null && (clearTimeout(soe), soe = null), $Ue = 0;
}

function l4i() {
  bur(), $Ue = performance.now() + sdn, soe = setTimeout(() => {
    soe = null, $Ue = 0, Sye();
  }, sdn);
}

function vur() {
  ldn || (ldn = !0, dw(Sye), V5n(Sye), $v(e => {
    if (e) {
      bur();
      return;
    }
    l4i();
  }), $Ve(() => {
    soe == null && Sye();
  }), Sye());
}

function c4i(e, t, n) {
  return !t || !e || e === t || n ? t : e;
}

function d4i(e) {
  const t = g.useRef(e),
    [n, r] = g.useState(e);
  return g.useEffect(() => {
    const a = t.current;
    if (!e || !a || a === e) {
      a !== e && (t.current = e, r(e));
      return;
    }
    let i = !1;
    const o = () => {
      i || (t.current = e, r(e));
    };
    if (typeof Image != "function") {
      o();
      return;
    }
    const s = new Image();
    return s.onload = () => {
      if (!i) {
        if (typeof s.decode == "function") {
          s.decode().then(o, o);
          return;
        }
        o();
      }
    }, s.onerror = o, s.src = e, () => {
      i = !0, s.onload = null, s.onerror = null;
    };
  }, [e]), c4i(n, e, n === e);
}

function cdn() {
  return vur(), L1e < 0 && (L1e = gur(), UUe = yur()), `${L1e}:${UUe}`;
}

function u4i(e) {
  return vur(), Ekt.add(e), () => {
    Ekt.delete(e);
  };
}

function Tkt(e, t) {
  const n = String(e || "").trim(),
    r = g.useSyncExternalStore(u4i, cdn, cdn),
    [a, i] = r.split(":"),
    o = Number(a) || aZ(Cd().zoom),
    s = Number(i) || 0,
    l = t == null ? void 0 : t.worldWidth,
    d = t == null ? void 0 : t.worldHeight,
    u = t == null ? void 0 : t.devicePixelRatio,
    h = g.useRef(void 0),
    p = g.useMemo(() => {
      const m = Cd().zoom,
        f = {
          worldWidth: l,
          worldHeight: d,
          devicePixelRatio: u
        },
        y = iHe(m, l, d, u, h.current, o);
      return h.current = y, NIt(n, m, f, o, h.current);
    }, [n, o, s, l, d, u]);
  return d4i(p);
}

function O1e(e, t) {
  if (!oHe(e)) return !1;
  const n = Cp(e);
  return MIt(), n && n !== e ? (t(n), !0) : !1;
}

let B1e = !1,
  F1e = !1;

const Mkt = new Set();

let ddn = !1;

function udn() {
  const e = Cd().zoom;
  return {
    proxy: W5n(e, void 0, B1e),
    micro: aHe(e, void 0, F1e)
  };
}

function CFt() {
  if (ddn) return;
  ddn = !0;
  const e = udn();
  B1e = e.proxy, F1e = e.micro;
  const t = () => {
    const n = udn();
    let r = !1;
    n.proxy !== B1e && (B1e = n.proxy, r = !0), n.micro !== F1e && (F1e = n.micro, r = !0), r && Mkt.forEach(a => {
      try {
        a();
      } catch {}
    });
  };
  dw(t), V5n(t);
}

function wur(e) {
  return CFt(), Mkt.add(e), () => {
    Mkt.delete(e);
  };
}

function hdn() {
  return CFt(), B1e;
}

function pdn() {
  return CFt(), F1e;
}

function xur() {
  return g.useSyncExternalStore(wur, hdn, hdn);
}

function _ur() {
  return g.useSyncExternalStore(wur, pdn, pdn);
}

const Pkt = g.memo(function ({
    src: t,
    alt: n = "",
    className: r,
    onLoad: a,
    onError: i,
    ...o
  }) {
    const s = _$n(t),
      l = String(t || ""),
      [d, u] = g.useState(() => ({
        id: 0,
        src: l
      })),
      [h, p] = g.useState(null),
      m = g.useRef(1),
      f = g.useRef(!1),
      y = g.useRef(null),
      b = g.useRef(null),
      v = g.useRef(l),
      _ = () => {
        var S;
        y.current !== null && (window.clearTimeout(y.current), y.current = null), (S = b.current) == null || S.call(b), b.current = null;
      };
    g.useEffect(() => (f.current = !0, () => {
      f.current = !1, _();
    }), []), g.useEffect(() => {
      if (v.current = l, d.src === l) {
        _(), p(S => S && null);
        return;
      }
      p(S => (S == null ? void 0 : S.src) === l ? S : {
        id: m.current++,
        src: l
      });
    }, [d.src, l]);
    const w = g.useMemo(() => h ? [h, d] : [d], [h, d]),
      k = S => f.current && v.current === S.src,
      A = (S, C) => {
        k(S) && (u(S), p(I => (I == null ? void 0 : I.id) === S.id ? null : I), a == null || a(C));
      };
    return c.jsx(c.Fragment, {
      children: w.map(S => {
        const C = S.id === d.id;
        return c.jsx("img", {
          src: S.src,
          alt: n,
          "aria-hidden": C ? void 0 : !0,
          decoding: "async",
          loading: "lazy",
          className: `${r || ""} absolute inset-0 ${C ? "z-[1]" : "z-0 pointer-events-none"}`,
          onLoad: C ? I => a == null ? void 0 : a(I.currentTarget) : I => {
            if (!k(S)) return;
            const E = I.currentTarget;
            _(), b.current = J5n(E, () => {
              b.current = null, k(S) && (y.current = window.setTimeout(() => {
                y.current = null, A(S, E);
              }, m6r));
            });
          },
          onError: I => {
            k(S) && (s(I.currentTarget) || (_(), C || p(E => (E == null ? void 0 : E.id) === S.id ? null : E), i == null || i()));
          },
          ...o
        }, S.id);
      })
    });
  }),
  mdn = new Map();

function h4i(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim() || "#1f1f1f";
  if (!n) return Promise.resolve(null);
  const a = `${n}
${r}`,
    i = mdn.get(a);
  return i ? Promise.resolve(i) : new Promise(o => {
    const s = new Image();
    /^https?:\/\//i.test(n) && (s.crossOrigin = "anonymous"), s.onload = () => {
      try {
        const l = s.naturalWidth || s.width,
          d = s.naturalHeight || s.height;
        if (!l || !d) {
          o(null);
          return;
        }
        const u = 1600,
          h = l > u || d > u ? Math.min(u / l, u / d) : 1,
          p = Math.max(1, Math.round(l * h)),
          m = Math.max(1, Math.round(d * h)),
          f = document.createElement("canvas");
        f.width = p, f.height = m;
        const y = f.getContext("2d", {
          willReadFrequently: !0
        });
        if (!y) {
          o(null);
          return;
        }
        y.drawImage(s, 0, 0, p, m);
        const b = y.getImageData(0, 0, p, m).data;
        let v = !1;
        for (let _ = 3; _ < b.length; _ += 32) if (b[_] < 250) {
          v = !0;
          break;
        }
        if (!v) {
          o(null);
          return;
        }
        y.globalCompositeOperation = "destination-over", y.fillStyle = r, y.fillRect(0, 0, p, m), f.toBlob(_ => {
          if (!_) {
            o(null);
            return;
          }
          const w = URL.createObjectURL(_);
          mdn.set(a, w), o(w);
        }, "image/png");
      } catch {
        o(null);
      }
    }, s.onerror = () => o(null), s.src = n;
  });
}

const P_ = e => `relative flex h-full w-full min-h-[88px] flex-col items-center justify-center rounded-2xl border pointer-events-none ${Sp(e)}`;

function gst(e, t, n, r) {
  const a = t ? "text-zinc-500" : "text-zinc-400",
    i = t ? "text-zinc-600" : "text-zinc-400";
  if (r) return c.jsxs("div", {
    className: `${P_(t)} gap-2 px-3 text-center text-xs ${a}`,
    "aria-hidden": !0,
    children: [c.jsx(lo, {
      size: 22,
      className: `${i} opacity-70`,
      strokeWidth: 1.5
    }), c.jsx("span", {
      children: r
    })]
  });
  switch (e) {
    case "gen-image":
      return c.jsx("div", {
        className: P_(t),
        "aria-hidden": !0,
        children: c.jsx(tw, {
          size: 44,
          className: i
        })
      });
    case "gen-video":
      return c.jsx("div", {
        className: P_(t),
        "aria-hidden": !0,
        children: c.jsx(Oo, {
          size: 44,
          className: i
        })
      });
    case "topaz-upscale":
      return c.jsxs("div", {
        className: `${P_(t)} gap-2 px-3 text-center text-xs ${a}`,
        "aria-hidden": !0,
        children: [n === "video" ? c.jsx(Oo, {
          size: 22,
          className: `${i} opacity-70`
        }) : c.jsx(lo, {
          size: 22,
          className: `${i} opacity-70`
        }), c.jsx("span", {
          children: x("配置并生成")
        })]
      });
    case "jimeng-super-resolution":
      return c.jsxs("div", {
        className: `${P_(t)} gap-2 px-3 text-center text-xs ${a}`,
        "aria-hidden": !0,
        children: [c.jsx(lo, {
          size: 22,
          className: `${i} opacity-70`
        }), c.jsx("span", {
          children: x("配置并生成")
        })]
      });
    case "fal-rembg":
      return c.jsxs("div", {
        className: `${P_(t)} gap-2 px-3 text-center text-xs ${a}`,
        "aria-hidden": !0,
        children: [c.jsx(lo, {
          size: 22,
          className: `${i} opacity-70`
        }), c.jsx("span", {
          children: x("配置并生成")
        })]
      });
    case "virtual-try-on":
      return c.jsxs("div", {
        className: `${P_(t)} gap-2 px-3 text-center text-xs ${a}`,
        "aria-hidden": !0,
        children: [c.jsx(lo, {
          size: 22,
          className: `${i} opacity-70`
        }), c.jsx("span", {
          children: x("配置参数生成商品合图图片")
        })]
      });
    case "motion-control":
      return c.jsxs("div", {
        className: `${P_(t)} gap-2 px-3 text-center text-xs ${a}`,
        "aria-hidden": !0,
        children: [c.jsx(Oo, {
          size: 22,
          className: `${i} opacity-70`
        }), c.jsx("span", {
          children: x("配置参数生成动作迁移视频")
        })]
      });
    case "video-relight":
      return c.jsxs("div", {
        className: `${P_(t)} gap-2 px-3 text-center text-xs ${a}`,
        "aria-hidden": !0,
        children: [c.jsx(Oo, {
          size: 22,
          className: `${i} opacity-70`
        }), c.jsx("span", {
          children: x("配置参数生成光照重置视频")
        })]
      });
    case "preview":
      return c.jsxs("div", {
        className: `${P_(t)} gap-3 px-4 text-center text-[11px] ${a}`,
        "aria-hidden": !0,
        children: [c.jsx(ul, {
          size: 24,
          className: "opacity-50"
        }), c.jsx("span", {
          children: x("连接 AI 绘图 / AI 视频 / 可灵动作迁移 节点")
        }), c.jsx("span", {
          children: x("或从历史记录发送到此处进行预览")
        })]
      });
    case "input-image":
      return n === "video" ? c.jsx("div", {
        className: P_(t),
        "aria-hidden": !0,
        children: c.jsx(Oo, {
          size: 44,
          className: i
        })
      }) : n === "audio" ? c.jsxs("div", {
        className: `${P_(t)} gap-2 px-4 text-center text-[10px] ${a}`,
        "aria-hidden": !0,
        children: [c.jsx("span", {
          className: "rounded border border-zinc-500/50 px-2 py-0.5 text-[9px] uppercase tracking-wide",
          children: "Audio"
        }), c.jsx("span", {
          children: x("音频加载中…")
        })]
      }) : c.jsxs("div", {
        className: `${P_(t)} gap-2 px-4 text-center ${a}`,
        "aria-hidden": !0,
        children: [c.jsxs("span", {
          className: t ? "flex items-center gap-2 rounded-lg border border-zinc-500 bg-transparent px-4 py-2 text-sm font-medium text-zinc-100" : "flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white",
          children: [c.jsx(ml, {
            size: 16,
            strokeWidth: 2
          }), x("上传")]
        }), c.jsxs("span", {
          className: "text-[10px]",
          children: [x("或拖放文件到此处"), c.jsx("br", {}), x("或 Ctrl+V 粘贴")]
        }), c.jsx("span", {
          className: `text-[9px] ${t ? "text-zinc-600" : "text-zinc-400"}`,
          children: x("支持图片、视频、音频")
        }), c.jsxs("span", {
          className: `text-[9px] ${t ? "text-zinc-600" : "text-zinc-400"}`,
          children: [x("图片 "), Tz.image, x(" · 视频 "), Tz.video, x(" · 音频 "), Tz.audio]
        })]
      });
    default:
      return c.jsx("div", {
        className: P_(t),
        "aria-hidden": !0
      });
  }
}

function Tpe({
  src: e,
  isDark: t,
  nodeType: n,
  nodeId: r,
  worldWidth: a,
  worldHeight: i,
  mediaType: o,
  emptyHint: s,
  onIntrinsicMediaDimensions: l,
  preferEager: d = !1,
  onMediaLoad: u,
  onMediaError: h,
  generating: p = !1,
  loadingOverlayActive: m,
  onRevealStart: f,
  matteColor: y
}) {
  on();
  const b = String(e || "").trim(),
    v = gd(b),
    _ = Tkt(v, {
      worldWidth: a,
      worldHeight: i
    }),
    w = xur(),
    k = _ur(),
    [A, S] = g.useState(null);
  g.useEffect(() => {
    S(null);
  }, [_]);
  const C = AIt(v),
    {
      data: I,
      failed: E
    } = SIt(C ? v : ""),
    M = A || I || _,
    [T, P] = g.useState(null);
  g.useEffect(() => {
    const z = String(y || "").trim();
    if (!z || !M) {
      P(null);
      return;
    }
    let V = !1;
    return h4i(M, z).then(O => {
      V || P(O);
    }), () => {
      V = !0;
    };
  }, [M, y]);
  const R = T || M,
    j = rIn(R, p, r, {
      loadingOverlayActive: m ?? p,
      onNewImageReady: f
    });
  if (!v || Er.isContentRef(v)) return p || m ? c.jsx("div", {
    className: `relative h-full w-full min-h-0 overflow-hidden rounded-2xl ${Sp(t)}`,
    "data-gen-empty-shell": "",
    "aria-hidden": !0
  }) : gst(n, t, o, s);
  if (C && !I && !E && !A) {
    const z = `relative h-full w-full min-h-0 overflow-hidden rounded-2xl flex items-center justify-center ${Sp(t)}`;
    return c.jsx("div", {
      className: z,
      "aria-hidden": !0,
      children: c.jsx("div", {
        className: t ? "h-5 w-5 rounded-full border-2 border-zinc-600 border-t-zinc-300 animate-spin" : "h-5 w-5 rounded-full border-2 border-zinc-300 border-t-zinc-500 animate-spin"
      })
    });
  }
  const F = `relative h-full w-full min-h-0 overflow-hidden rounded-2xl pointer-events-none ${n === "input-image" ? cO(t) : ""}`,
    N = n === "input-image" ? "" : void 0;
  if (o === "audio") return gst(n, t, o, s);
  if (DM(v) || cIn(v, n, o)) return gst(n, t, o === "video" || n === "gen-video" || n === "video-input" ? "video" : o, s);
  if (w) return k && R ? c.jsx("div", {
    className: F,
    "data-dense-media-micro-thumb": "",
    "data-input-image-png-fill": N,
    "aria-hidden": !0,
    children: c.jsx("img", {
      src: R,
      alt: "",
      ...Yg(d),
      draggable: !1,
      decoding: "async",
      className: "absolute inset-0 h-full w-full object-cover",
      onError: () => {
        O1e(M, S) || h == null || h();
      },
      "data-oss-thumb-base": Cp(v) || v
    })
  }) : c.jsx("div", {
    className: `${F} border ${Sp(t)}`,
    "aria-hidden": !0,
    "data-dense-media-color-proxy": "",
    "data-input-image-png-fill": N
  });
  const G = o === "3d" ? "object-contain" : n === "input-image" || j.generatingShell || j.underlaySrc ? "object-cover" : "object-contain";
  return c.jsx("div", {
    className: F,
    "data-input-image-png-fill": N,
    "data-canvas-media-clip": "",
    children: c.jsxs("div", {
      className: "canvas-media-reveal-clip absolute inset-0",
      children: [j.underlaySrc ? c.jsx("img", {
        src: j.underlaySrc,
        alt: "",
        "aria-hidden": !0,
        draggable: !1,
        className: `canvas-media-reveal-underlay absolute inset-0 h-full w-full ${G} pointer-events-none`,
        style: {
          filter: "blur(14px)",
          transform: "scale(1.1)"
        }
      }) : null, c.jsx("div", {
        className: `canvas-media-reveal-content absolute inset-0 h-full w-full${j.generatingShell ? " is-generating-shell" : ""}${j.replacing ? " is-replacing" : ""}${j.phase === "revealing" ? " is-revealing" : ""}`,
        style: j.style,
        children: c.jsx(Pkt, {
          src: R,
          alt: "",
          ...Yg(d),
          draggable: !1,
          className: `h-full w-full ${G}`,
          onLoad: z => {
            j.markReady(z.currentSrc || z.src || M), u == null || u();
          },
          onError: () => {
            O1e(M, S) || h == null || h();
          },
          "data-oss-thumb-base": Cp(v) || v
        })
      })]
    })
  });
}

function TJe(e, t) {
  return e.historyPatch ? {
    ...t,
    ...e.historyPatch
  } : {
    ...t,
    url: e.primaryDisplayUrl || "",
    thumbnailUrl: e.primaryDisplayUrl || void 0,
    originalUrl: e.originalUrls[0],
    mjImages: e.displayUrls.length > 1 ? e.displayUrls : void 0,
    _assetId: e.primaryAssetId || void 0,
    _thumbnailAssetId: e.primaryThumbnailAssetId || void 0,
    _mjAssetIds: e.assetIds.length > 1 ? e.assetIds : void 0,
    _localCacheReady: !0
  };
}

function GUe(e) {
  return ((e == null ? void 0 : e.nodeName) || (e == null ? void 0 : e.prompt) || "").trim() || "图片";
}

function p4i(e, t) {
  const n = `${GUe(t)}_智能扩图`,
    r = new Set(e.map(a => String(a.nodeName || "").trim()).filter(Boolean));
  if (!r.has(n)) return n;
  for (let a = 1; a < 2e3; a++) {
    const i = `${GUe(t)}_${a}_智能扩图`;
    if (!r.has(i)) return i;
  }
  return `${n}_${Date.now()}`;
}

function kur(e) {
  if (!e || e.type !== "input-image") return !1;
  const t = e.settings || {};
  return t._eraseResultNode === !0 ? !1 : t._expandResultNode === !0 || typeof t.expandModelId == "string" && t.expandModelId || typeof t.expandModelName == "string" && t.expandModelName || e._expandPending && String(e.nodeName || "").includes("智能扩图") ? !0 : String(e.nodeName || "").includes("智能扩图") && !String(e.content || "").trim();
}

function Aur(e) {
  if (!e || e.type !== "input-image") return !1;
  const t = e.settings || {};
  return t._eraseResultNode === !0 || t._eraseResultNode === "true" || typeof t.eraserModelName == "string" && t.eraserModelName && t._eraseResultNode !== !1 && String(e.nodeName || "").includes("智能擦除") || e._expandPending && String(e.nodeName || "").includes("智能擦除") ? !0 : String(e.nodeName || "").includes("智能擦除") && !t._expandResultNode && !String(e.content || "").trim();
}

function EFt(e) {
  return kur(e) || Aur(e);
}

function VUe(e) {
  if (!e || !EFt(e)) return !1;
  const t = e,
    n = e.settings || {},
    r = t._expandPending === !0 || n._expandPending === !0,
    a = t._expandTaskStartTime ?? n._expandTaskStartTime;
  return r && typeof a == "number";
}

function Rkt(e, t) {
  return {
    ...e,
    _expandPending: void 0,
    _expandTaskStartTime: void 0,
    settings: {
      ...(e.settings || {}),
      ...(t || {}),
      _expandPending: void 0,
      _expandTaskStartTime: void 0,
      _auxPendingPlaceholderUrl: void 0
    }
  };
}

function m4i(e, t, n) {
  const r = String(t || "").trim();
  return Rkt({
    ...e,
    content: r || e.content,
    nodeName: e.nodeName || "智能扩图"
  }, {
    ...n,
    mediaType: "image",
    _expandResultNode: !0
  });
}

function f4i(e) {
  if (!e) return "";
  const t = tre(e);
  if (t) return t;
  const n = lHe(e);
  if (n) return n;
  const r = typeof e.thumbnailUrl == "string" ? e.thumbnailUrl.trim() : "";
  return r || String((e.settings || {})._canvasDisplayPreviewUrl || "").trim();
}

function TFt(e) {
  return kur(e) && VUe(e);
}

function Sur(e, t) {
  return TFt(e) ? void 0 : String(t || "").trim() || void 0;
}

function Iur(e, t, n, r) {
  const a = typeof n == "number" ? n : Date.now();
  if (e._expandPending = !0, e._expandTaskStartTime = a, !((r == null ? void 0 : r.seedSourcePreview) !== !1)) {
    e.settings = {
      ...(e.settings || {}),
      _expandPending: !0,
      _expandTaskStartTime: a,
      _auxPendingPlaceholderUrl: void 0,
      _canvasDisplayPreviewUrl: void 0
    };
    return;
  }
  const o = (t == null ? void 0 : t.settings) || {},
    s = f4i(t),
    l = t == null ? void 0 : t.width,
    d = t == null ? void 0 : t.height;
  typeof l == "number" && l > 0 && (e.width = l), typeof d == "number" && d > 0 && (e.height = d);
  const u = typeof (t == null ? void 0 : t.thumbnailUrl) == "string" ? t.thumbnailUrl.trim() : "";
  u && (e.thumbnailUrl = u), e.settings = {
    ...(e.settings || {}),
    _expandPending: !0,
    _expandTaskStartTime: a,
    _auxPendingPlaceholderUrl: s || void 0,
    _canvasDisplayPreviewUrl: typeof o._canvasDisplayPreviewUrl == "string" && String(o._canvasDisplayPreviewUrl).trim() ? String(o._canvasDisplayPreviewUrl).trim() : s || void 0,
    _useCanvasPreviewDisplay: !0,
    ...(o.previewActualSize ? {
      previewActualSize: o.previewActualSize
    } : {}),
    ...(o.imageSize ? {
      imageSize: o.imageSize
    } : {}),
    ...(o.previewSize ? {
      previewSize: o.previewSize
    } : {})
  };
}

function MFt(e, t) {
  const n = `${GUe(t)}_智能擦除`,
    r = new Set(e.map(a => String(a.nodeName || "").trim()).filter(Boolean));
  if (!r.has(n)) return n;
  for (let a = 1; a < 2e3; a++) {
    const i = `${GUe(t)}_${a}_智能擦除`;
    if (!r.has(i)) return i;
  }
  return `${n}_${Date.now()}`;
}

function g4i(e) {
  const {
      id: t,
      sourceNode: n,
      existingNodes: r,
      modelId: a,
      modelName: i,
      pending: o = !1,
      nodeName: s,
      startTime: l
    } = e,
    d = n ? n.x + (n.width || 260) + 80 : 100,
    u = n ? n.y : 100,
    h = s || (o ? "智能扩图" : p4i(r, n)),
    p = Ki(t, "input-image", d, u, h, {
      mediaType: "image",
      _expandResultNode: !0,
      expandModelId: a,
      expandModelName: i,
      blockUpstreamPassthrough: !0
    }, r);
  return p.width = 250, p.height = 250, p.content = "", o && Iur(p, n, l, {
    seedSourcePreview: !1
  }), p;
}

function y4i(e, t, n) {
  const r = e.previewActualSize ? kc(e.previewActualSize.width, e.previewActualSize.height) : null;
  return {
    content: e.primaryDisplayUrl || "",
    ...(r ? {
      width: r.width,
      height: r.height
    } : {}),
    _contentAssetId: e.usedOss ? void 0 : e.primaryAssetId || void 0,
    _thumbnailAssetId: e.usedOss ? void 0 : e.primaryThumbnailAssetId || void 0,
    _expandPending: void 0,
    _expandTaskStartTime: void 0,
    settings: {
      ...(n || {}),
      ...t,
      mediaType: "image",
      _expandResultNode: !0,
      blockUpstreamPassthrough: !0,
      _expandPending: void 0,
      _expandTaskStartTime: void 0,
      _auxPendingPlaceholderUrl: void 0,
      ...(e.ossSettings || {}),
      _contentAssetId: e.usedOss ? void 0 : e.primaryAssetId || void 0,
      _thumbnailAssetId: e.usedOss ? void 0 : e.primaryThumbnailAssetId || void 0,
      ...(e.previewActualSize ? {
        previewActualSize: `${e.previewActualSize.width}×${e.previewActualSize.height}`,
        previewSize: `${e.previewActualSize.width}×${e.previewActualSize.height}`
      } : {})
    }
  };
}

function Cur(e) {
  const {
      id: t,
      sourceNode: n,
      existingNodes: r,
      modelId: a,
      modelName: i,
      pending: o = !1,
      nodeName: s,
      startTime: l
    } = e,
    d = n ? n.x + (n.width || 260) + 80 : 100,
    u = n ? n.y : 100,
    h = s || (o ? "智能擦除" : MFt(r, n)),
    p = Ki(t, "input-image", d, u, h, {
      mediaType: "image",
      _eraseResultNode: !0,
      eraserModelId: a,
      eraserModelName: i
    }, r);
  return p.width = 250, p.height = 250, p.content = "", o && Iur(p, n, l), p;
}

function Eur(e, t, n) {
  const r = e.previewActualSize ? kc(e.previewActualSize.width, e.previewActualSize.height) : null;
  return {
    content: e.primaryDisplayUrl || "",
    ...(r ? {
      width: r.width,
      height: r.height
    } : {}),
    _contentAssetId: e.usedOss ? void 0 : e.primaryAssetId || void 0,
    _thumbnailAssetId: e.usedOss ? void 0 : e.primaryThumbnailAssetId || void 0,
    _expandPending: void 0,
    _expandTaskStartTime: void 0,
    settings: {
      ...(n || {}),
      ...t,
      mediaType: "image",
      _eraseResultNode: !0,
      _expandPending: void 0,
      _expandTaskStartTime: void 0,
      _auxPendingPlaceholderUrl: void 0,
      ...(e.ossSettings || {}),
      _contentAssetId: e.usedOss ? void 0 : e.primaryAssetId || void 0,
      _thumbnailAssetId: e.usedOss ? void 0 : e.primaryThumbnailAssetId || void 0,
      ...(e.previewActualSize ? {
        previewActualSize: `${e.previewActualSize.width}×${e.previewActualSize.height}`,
        previewSize: `${e.previewActualSize.width}×${e.previewActualSize.height}`,
        imageSize: `${e.previewActualSize.width}×${e.previewActualSize.height}`
      } : {})
    }
  };
}

async function b4i(e, t, n, r) {
  const a = String(t || "").trim();
  if (!a) return null;
  let i = null;
  try {
    i = await Ns(a, {
      compressForApi: !1
    });
  } catch (u) {
    return console.warn("[expandResultPreview] 下载扩图结果失败:", u), null;
  }
  if (!(i != null && i.size)) return null;
  const o = `expand_${e}_img${n}_${r}`,
    s = `preview_${o}`;
  try {
    await Xu(a, o, `expand_${e}_${n}.png`);
  } catch {
    await ni.saveBlobAsset(o, i, a);
  }
  const l = await i_(i, wm, $k);
  await ni.saveBlobAsset(s, l, s, "thumbnails", {
    silent: !0
  });
  const d = (await ni.getAssetUrl(s)) || URL.createObjectURL(l);
  return Il(d, o), {
    displayUrl: d,
    assetId: o,
    thumbnailAssetId: s,
    originalUrl: a
  };
}

async function MJe(e, t) {
  await ni.init();
  const n = t.map(d => String(d || "").trim()).filter(Boolean);
  if (n.length === 0) return {
    primaryDisplayUrl: null,
    primaryAssetId: null,
    primaryThumbnailAssetId: null,
    previewActualSize: null,
    displayUrls: [],
    assetIds: [],
    thumbnailAssetIds: [],
    originalUrls: []
  };
  if (ua()) {
    const d = await xT(n, e, !1);
    if (d) {
      const u = d.imageWidth,
        h = d.imageHeight;
      let p = typeof u == "number" && typeof h == "number" && u > 0 && h > 0 ? {
        width: u,
        height: h
      } : null;
      !p && d.remoteUrls[0] && (p = await Z5(d.remoteUrls[0]));
      const m = _T(d, {
        mjImages: d.displayUrls.length > 1 ? d.displayUrls : void 0
      });
      return {
        primaryDisplayUrl: d.displayUrls[0] || null,
        primaryAssetId: null,
        primaryThumbnailAssetId: null,
        previewActualSize: p,
        displayUrls: d.displayUrls,
        assetIds: [],
        thumbnailAssetIds: [],
        originalUrls: d.remoteUrls,
        ossSettings: d.ossSettings,
        usedOss: !0,
        historyPatch: m
      };
    }
  }
  const r = Date.now(),
    a = [],
    i = [],
    o = [],
    s = [];
  let l = null;
  for (let d = 0; d < n.length; d++) {
    const u = await b4i(e, n[d], d, r);
    if (!u) continue;
    a.push(u.displayUrl), s.push(u.originalUrl), u.assetId && i.push(u.assetId), u.thumbnailAssetId && o.push(u.thumbnailAssetId);
    const h = u.originalUrl,
      p = (await Z5(h)) || (u.assetId ? await w4i(u.assetId) : null) || vU(u.displayUrl) || (await v4i(u.displayUrl));
    if (d === 0 && (p && p.width > 0 && p.height > 0 && (l = p), u.assetId)) try {
      const m = await ni.getAssetBlob(u.assetId);
      if (m) {
        const f = await new Promise((y, b) => {
          const v = new FileReader();
          v.onload = () => y(String(v.result || "")), v.onerror = () => b(new Error("read blob failed")), v.readAsDataURL(m);
        });
        f.startsWith("data:image") && (await Wd.storeWithThumbnails(u.assetId, f));
      }
    } catch {}
  }
  return {
    primaryDisplayUrl: a[0] || null,
    primaryAssetId: i[0] || null,
    primaryThumbnailAssetId: o[0] || null,
    previewActualSize: l,
    displayUrls: a,
    assetIds: i,
    thumbnailAssetIds: o,
    originalUrls: s,
    usedOss: !1
  };
}

async function v4i(e) {
  return Z5(e);
}

async function w4i(e) {
  if (!e) return null;
  const t = await ni.getAssetBlob(e);
  if (!t || !t.type.startsWith("image/")) return null;
  const n = await Rv(t);
  return n.width > 0 && n.height > 0 ? n : null;
}

const yst = new Map();

function x4i(e) {
  return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}

function _4i(e) {
  return typeof document > "u" ? null : document.querySelector(`[data-node-id="${x4i(e)}"].node-wrapper`);
}

function PJe(e, t, n) {
  if (!(t > 0) || !(n > 0)) return !1;
  const r = _4i(e);
  return r && (r.style.width = `${t}px`, r.style.height = `${n}px`), mWe(e, t, n), Ucr(e, t, n), !0;
}

function Tur(e, t) {
  const n = (yst.get(e) || 0) + 1;
  yst.set(e, n), O$(() => {
    yst.get(e) === n && (t(), Ude([e]));
  });
}

function l5(e) {
  const {
    nodeId: t,
    mw: n,
    mh: r,
    setNodes: a,
    currentWidth: i = 0,
    currentHeight: o = 0,
    hasCustomSize: s = !1,
    actualSizeLabel: l
  } = e;
  if (!Number.isFinite(n) || !Number.isFinite(r) || n <= 0 || r <= 0) return !1;
  const d = iFt(t),
    u = (d == null ? void 0 : d.width) ?? i,
    h = (d == null ? void 0 : d.height) ?? o,
    p = s ? {
      width: u,
      height: h
    } : kc(n, r),
    m = !s && !z$(u, h, p.width, p.height, n, r);
  return m && PJe(t, p.width, p.height), !m && !l ? !1 : (Tur(t, () => {
    a(f => ELn(f, t, n, r, {
      actualSizeLabel: l
    }));
  }), !0);
}

function k4i(e) {
  const {
    nodeId: t,
    intrinsicW: n,
    intrinsicH: r,
    setNodes: a,
    currentWidth: i = 0,
    currentHeight: o = 0,
    hasCustomSize: s = !1
  } = e;
  if (!Number.isFinite(n) || !Number.isFinite(r) || n <= 0 || r <= 0 || s) return !1;
  const l = iFt(t),
    d = (l == null ? void 0 : l.width) ?? i,
    u = (l == null ? void 0 : l.height) ?? o,
    h = kc(n, r);
  return z$(d, u, h.width, h.height, n, r) ? !1 : (PJe(t, h.width, h.height), Tur(t, () => {
    a(p => z5n(p, t, n, r));
  }), !0);
}

function A4i(e, t) {
  const n = Number(t.width),
    r = Number(t.height);
  Number.isFinite(n) && Number.isFinite(r) && n > 0 && r > 0 && PJe(e, n, r);
}

const S4i = 160;

let KP = null,
  pD = !1,
  fdn = !1;

const Nkt = new Set();

function PFt() {
  for (const e of Nkt) try {
    e(KP, pD);
  } catch (t) {
    console.error("[canvasHoverPlayback] listener error:", t);
  }
}

function bst() {
  const e = Yi();
  e === pD && !(e && KP) || (pD = e, e && (KP = null), PFt());
}

function QCe() {
  fdn || (fdn = !0, pD = Yi(), $v(bst), D$(bst), L$(bst));
}

function Mur(e) {
  return QCe(), Nkt.add(e), e(KP, pD), () => Nkt.delete(e);
}

function gdn() {
  return QCe(), pD;
}

function I4i() {
  return QCe(), pD || KP !== null;
}

function C4i(e) {
  return QCe(), !e || pD ? !1 : (KP === e || (KP = e, PFt()), !0);
}

function E4i(e) {
  KP === e && (KP = null, PFt());
}

function ydn(e) {
  return KP === e && !pD;
}

function Pur(e) {
  QCe();
  const t = () => {
      !I4i() && !Yi() && e();
    },
    n = Mur(() => t()),
    r = $v(() => t());
  return () => {
    n(), r();
  };
}

function RJe(e, t, n = S4i) {
  const [r, a] = g.useState({
      mounted: !1,
      playing: !1
    }),
    i = g.useRef(r);
  return g.useEffect(() => {
    if (!t && !i.current.mounted) return;
    let o = 0,
      s = !1,
      l = !1;
    const d = (m, f = !1) => {
        const y = i.current,
          b = m || f && y.mounted;
        y.mounted === b && y.playing === m || (i.current = {
          mounted: b,
          playing: m
        }, a(i.current));
      },
      u = () => {
        o && window.clearTimeout(o), o = 0;
      },
      h = () => {
        if (!(s || !t || !e || gdn())) {
          if (ydn(e)) {
            l = !0, d(!0);
            return;
          }
          u(), o = window.setTimeout(() => {
            o = 0, !(s || gdn()) && (l = C4i(e), d(ydn(e)));
          }, n);
        }
      },
      p = Mur((m, f) => {
        if (!s) {
          if (f) {
            u(), d(!1, !0);
            return;
          }
          if (!t || !e) {
            u(), d(!1);
            return;
          }
          if (m === e) {
            u(), l = !0, d(!0);
            return;
          }
          d(!1, !m), m || h();
        }
      });
    return () => {
      s = !0, u(), p(), l && E4i(e);
    };
  }, [t, e, n]), r;
}

const Rur = new Set(["gen-video", "topaz-upscale", "input-image"]),
  HUe = new Set();

let WUe = !1,
  qUe = null;

function T4i(e, t) {
  if (typeof document > "u") return null;
  const n = document.getElementById("canvas-bg");
  if (!n) return null;
  const r = n.getBoundingClientRect();
  if (e < r.left || e >= r.right || t < r.top || t >= r.bottom) return null;
  const a = typeof document.elementsFromPoint == "function" ? document.elementsFromPoint(e, t) : [document.elementFromPoint(e, t)];
  for (const i of a) {
    if (!(i instanceof Element) || i.id === "canvas-probe-media-pool" || i.closest("#canvas-probe-media-pool")) continue;
    if (!n.contains(i)) return null;
    const o = i.closest(".node-wrapper");
    if (!o || !n.contains(o)) return null;
    const s = o.getAttribute("data-node-type") || "";
    if (!Rur.has(s)) return null;
    const l = o.getAttribute("data-node-id");
    if (l) return l;
  }
  return null;
}

function RFt(e) {
  if (e !== qUe) {
    qUe = e;
    for (const t of HUe) t(e);
  }
}

function M4i(e) {
  if (typeof document > "u" || !(e instanceof Element)) return null;
  const t = document.getElementById("canvas-bg");
  if (!t || !t.contains(e)) return null;
  const n = e.closest(".node-wrapper");
  if (!n || !t.contains(n)) return null;
  const r = n.getAttribute("data-node-type") || "";
  return Rur.has(r) ? n.getAttribute("data-node-id") : null;
}

let Zke = null,
  EW = null,
  FR = 0,
  Iye = null;

function vst() {
  FR && cancelAnimationFrame(FR), FR = 0, !(Yi() || !EW) && (FR = requestAnimationFrame(() => {
    FR = requestAnimationFrame(() => {
      FR = 0, !(!EW || Yi()) && (Zke = null, RFt(T4i(EW.x, EW.y)));
    });
  }));
}

function KUe(e) {
  if (e.pointerType && e.pointerType !== "mouse" || (EW = {
    x: e.clientX,
    y: e.clientY
  }, Yi())) return;
  const t = e.target;
  t !== Zke && (Zke = t, RFt(M4i(t)));
}

function NJe() {
  Zke = null, EW = null, RFt(null);
}

function Nur(e) {
  e.relatedTarget || NJe();
}

function jur() {
  document.hidden && NJe();
}

function P4i() {
  if (WUe || typeof document > "u") return;
  WUe = !0, document.addEventListener("pointermove", KUe, {
    passive: !0,
    capture: !0
  }), document.addEventListener("pointerover", KUe, {
    passive: !0,
    capture: !0
  }), document.addEventListener("pointerout", Nur, {
    passive: !0,
    capture: !0
  }), document.addEventListener("visibilitychange", jur), window.addEventListener("blur", NJe);
  const e = $v(vst),
    t = D$(vst),
    n = L$(vst);
  Iye = () => {
    e(), t(), n();
  };
}

function R4i() {
  HUe.size > 0 || !WUe || typeof document > "u" || (document.removeEventListener("pointermove", KUe, !0), document.removeEventListener("pointerover", KUe, !0), document.removeEventListener("pointerout", Nur, !0), document.removeEventListener("visibilitychange", jur), window.removeEventListener("blur", NJe), Iye == null || Iye(), Iye = null, FR && cancelAnimationFrame(FR), FR = 0, Zke = null, EW = null, WUe = !1, qUe = null);
}

function N4i(e) {
  return HUe.add(e), e(qUe), P4i(), () => {
    HUe.delete(e), R4i();
  };
}

function jJe(e, t) {
  const [n, r] = g.useState(!1);
  return g.useEffect(() => {
    if (!t || !e) {
      r(!1);
      return;
    }
    return N4i(a => {
      r(a === e);
    });
  }, [t, e]), t && n;
}

function Dur({
  src: e,
  poster: t,
  clipStart: n,
  clipEnd: r,
  playing: a
}) {
  const i = g.useRef(null),
    o = n != null || r != null;
  return g.useEffect(() => {
    const s = i.current;
    if (!s) return;
    const l = () => {
      a && !Yi() ? s.play().catch(() => {}) : s.pause();
    };
    return l(), s.addEventListener("canplay", l), () => s.removeEventListener("canplay", l);
  }, [a, e]), g.useEffect(() => {
    const s = i.current;
    return () => {
      if (s) try {
        s.pause(), s.removeAttribute("src"), s.load();
      } catch {}
    };
  }, [e]), c.jsx("video", {
    ref: i,
    src: e,
    poster: t || void 0,
    className: "pointer-events-none absolute inset-0 z-[2] h-full w-full rounded-2xl object-contain",
    muted: !0,
    playsInline: !0,
    autoPlay: a,
    loop: !o,
    preload: "metadata",
    disablePictureInPicture: !0,
    onLoadedMetadata: n != null ? s => {
      s.currentTarget.currentTime = n;
    } : void 0,
    onTimeUpdate: r != null ? s => {
      const l = s.currentTarget;
      l.currentTime >= r - .04 && (l.currentTime = n ?? 0);
    } : void 0
  });
}

function AplusOriginalAudioUrl(e, d) {
  const [_, w] = g.useState("");
  g.useEffect(() => {
    var ce, we;
    if (!d) {
      w("");
      return;
    }
    const explicit = typeof e.content === "string" ? e.content.trim() : "";
    if (explicit.startsWith("blob:") || explicit.startsWith("data:audio")) {
      w(explicit);
      return;
    }
    const le = Opt(e),
      X = typeof e.content == "string" && Er.isContentRef(e.content) ? Er.extractId(e.content) : "";
    let re = "";
    try { re = Pk(e.content) || ""; } catch {}
    const pe = String(re || ((ce = e.settings) == null ? void 0 : ce._contentAssetId) || ((we = e.settings) == null ? void 0 : we._localCacheAssetId) || e.settings?._audioAssetId || e.settings?._assetId || e._contentAssetId || "").trim();
    if (!pe && !X) {
      w(le && !Er.isContentRef(le) ? le : "");
      return;
    }
    let J = !1,
      Z = "";
    w("");
    return (async () => {
      // Audio must use its original bytes. Zoom/display URLs may be JPEG
      // waveform previews and must never become an audio element's source.
      try {
        if (!pe) {
          const fe = await Er.get(X), ce = typeof fe == "string" ? Opt({content:fe}) : "";
          !J && ce && w(ce);
          return;
        }
        if (/^(preview_|thumb_)|_thumbnail$/i.test(pe)) return;
        const {assetStore: fe, localCacheManager: ce} = await Ie(async () => ({
          assetStore:(await Promise.resolve().then(() => Ri)).assetStore,
          localCacheManager:(await Promise.resolve().then(() => Ha)).localCacheManager
        }), void 0, import.meta.url);
        await ce.ensureRestored();
        const we = await fe.getAssetRecord(pe), ne = we?.blob,
          de = String(we?.mimeType || ne?.type || "").toLowerCase();
        if (J || !ne?.size || we.id !== pe || we.cacheSubdir === "thumbnails" || !de.startsWith("audio/") || /^(image|video|text)\//i.test(ne.type)) return;
        Z = URL.createObjectURL(ne.type.startsWith("audio/") ? ne : new Blob([ne], {type:de}));
        w(Z);
      } catch {}
    })(), () => {
      J = !0;
      Z && URL.revokeObjectURL(Z);
    };
  }, [d, e.id, e.content, e._contentAssetId, e.settings?._contentAssetId, e.settings?._localCacheAssetId, e.settings?._audioAssetId, e.settings?._assetId, e.settings?.audioUrl, e.settings?._audioUrl, e.settings?._blobUrl, e.settings?.[_i]]);
  return _;
}

function Lur({
  node: e,
  isDark: t,
  setNodes: n,
  boxSelectLightShell: r = !1,
  loadingOverlayActive: a,
  onRevealStart: i,
  matteColor: o,
  enableHoverPlayback: s = !0
}) {
  var O, L, D, U, H, Y, K, W, Q, q, ne, de;
  const l = K2(e),
    d = l === "audio",
    u = l === "video",
    h = !!((O = e.settings) != null && O[T0]),
    p = !!((L = e.settings) != null && L[h7]),
    m = Number((D = e.settings) == null ? void 0 : D.mediaRevision) || 0,
    {
      src: f,
      onMediaError: y
    } = KCe(e),
    b = g.useRef(""),
    v = g.useRef(m),
    _ = AplusOriginalAudioUrl(e, d),
    [k, A] = g.useState(""),
    S = jJe(e.id, s && u),
    C = g.useRef(0),
    {
      mounted: I,
      playing: E
    } = RJe(e.id, S && u && s);
  g.useEffect(() => {
    if (!I) {
      C.current += 1, A("");
      return;
    }
    const le = ++C.current,
      J = e;
    (async () => {
      const pe = Ble(J);
      if (pe && $o(pe)) {
        C.current === le && A(pe);
        return;
      }
      const ce = typeof J.content == "string" ? J.content.trim() : "";
      if (ce && $o(ce)) {
        C.current === le && A(ce);
        return;
      }
      if (!ei()) return;
      const we = J.settings || {},
        X = [we._localCacheAssetId, we._assetId, we._contentAssetId, J._contentAssetId].map(Z => typeof Z == "string" ? Z.trim() : "").find(Boolean);
      if (X) try {
        const {
          localCacheManager: Z
        } = await Ie(async () => {
          const {
            localCacheManager: fe
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: fe
          };
        }, void 0, import.meta.url);
        await Z.ensureRestored();
        const re = await Z.getConvertFileSrcForAsset(X);
        C.current === le && re && $o(re) && A(re);
      } catch {}
    })();
  }, [I, e]);
  const M = XNt(e.settings || {});
  v.current !== m && (v.current = m, b.current = ""), f.trim() && !h && !Er.isContentRef(f.trim()) && (b.current = f);
  const T = f.trim(),
    P = [(U = e.settings) == null ? void 0 : U._canvasDisplayPreviewUrl, e.videoPosterUrl, (H = e.settings) == null ? void 0 : H.videoPosterUrl].map(le => String(le || "").trim()).find(le => tl(le)) || "",
    j = (h || p) && (P.startsWith("blob:") || P.startsWith("data:image")) ? P : h || p ? T || P : Er.isContentRef(T) ? b.current : T || b.current;
  g.useEffect(() => {
    !n || r || h || l === "video" && (j.trim() || Ywe(e, n));
  }, [e, n, j, l, r, h]);
  const B = g.useCallback((le, J) => {
    !n || le <= 0 || J <= 0 || (e.settings || {}).hasCustomSize === !0 || k4i({
      nodeId: e.id,
      intrinsicW: le,
      intrinsicH: J,
      setNodes: n,
      currentWidth: e.width,
      currentHeight: e.height,
      hasCustomSize: !1
    });
  }, [e.id, e.width, e.height, n]);
  if (g.useEffect(() => {
    if (!n || d || r) return;
    const le = e.settings || {};
    if (le.hasCustomSize === !0) return;
    const J = Hs(le.imageSize);
    if (J) {
      B(J.w, J.h);
      return;
    }
    const pe = j.trim() || String(e.content || "").trim();
    if (!pe && K2(e) !== "video") return;
    let ce = !1,
      we = !1;
    const X = () => {
        ce || we || (we = !0, (async () => {
          const re = await lIn(e, pe);
          ce || !re || re.width <= 0 || re.height <= 0 || B(re.width, re.height);
        })());
      },
      Z = Pur(() => {
        ce || X();
      });
    return () => {
      ce = !0, Z();
    };
  }, [B, r, d, e.id, e.content, e.width, e.height, Ble(e), (Y = e.settings) == null ? void 0 : Y.imageSize, (K = e.settings) == null ? void 0 : K.hasCustomSize, l, n, j]), d) {
    const le = e.settings || {},
      J = typeof le.audioUrl == "string" && /^https?:\/\//i.test(le.audioUrl) ? le.audioUrl : void 0;
    return c.jsx("div", {
      className: "flex h-full w-full min-h-0 items-stretch pointer-events-auto",
      children: c.jsx(CXe, {
        playbackId: e.id,
        audioUrl: _,
        waveformSourceUrl: J,
        isDark: t,
        fileName: e.prompt,
        formatLabel: typeof le.inputImageAudioFormat == "string" ? le.inputImageAudioFormat : void 0,
        cornerLabel: typeof le.musicTitle == "string" ? le.musicTitle : e.nodeName || void 0,
        className: "w-full"
      })
    });
  }
  if ((h || p) && !tl(j)) return c.jsx(pur, {
    isDark: t,
    isCropSplitPending: p,
    isOssUploading: h,
    previewUrl: tl(P) ? P : void 0,
    mediaType: l
  });
  const F = (() => {
      if (j.trim()) return;
      const le = e.settings || {};
      if (EFt(e) || VUe(e)) return le._eraseResultNode === !0 || String(e.nodeName || "").includes("智能擦除") ? "配置参数生成擦除图像" : "配置参数生成扩图图像";
      if (!!(typeof e.content == "string" && e.content.trim() || e.thumbnailUrl || le._canvasDisplayPreviewUrl || le._auxPendingPlaceholderUrl || le._localCacheAssetId || le._contentAssetId || le._assetId)) return "图片加载中…";
    })(),
    N = VUe(e),
    G = TFt(e),
    z = G ? void 0 : Sur(e, j),
    V = G ? "" : j;
  return c.jsxs("div", {
    className: "relative h-full w-full",
    children: [c.jsx(Tpe, {
      src: V,
      isDark: t,
      nodeType: "input-image",
      nodeId: e.id,
      worldWidth: e.width,
      worldHeight: e.height,
      mediaType: String(((W = e.settings) == null ? void 0 : W.mediaType) || "") === "3d" ? "3d" : tl(j) && j === P ? "image" : K2(e),
      emptyHint: F,
      generating: N,
      loadingOverlayActive: a ?? N,
      onRevealStart: i,
      onIntrinsicMediaDimensions: B,
      onMediaError: y,
      matteColor: o
    }), String(((Q = e.settings) == null ? void 0 : Q.mediaType) || "") === "3d" && V ? c.jsxs("div", {
      className: "pointer-events-none absolute left-2 top-2 z-[3] flex items-center gap-1",
      children: [c.jsx("div", {
        className: "rounded-full bg-black/55 px-2 py-0.5 text-[10px] text-white/80",
        children: "3D"
      }), (q = e.settings) != null && q._ossUrlOnlyMode || (ne = e.settings) != null && ne._globalOssUrlOnly || (de = e.settings) != null && de._ossThumbnailUrl ? c.jsx("div", {
        className: "rounded-full bg-blue-600/80 px-2 py-0.5 text-[10px] text-white",
        children: "OSS"
      }) : null]
    }) : null, (h || p) && j.trim() ? c.jsx(IFt, {}) : null, N ? c.jsx("div", {
      className: "pointer-events-none absolute inset-0 z-[60] overflow-hidden rounded-2xl",
      "data-aux-gen-progress-layer": !0,
      "aria-hidden": !0,
      children: c.jsx(Yv, {
        seed: `${e.id}-expand`,
        src: z,
        className: z ? "qiaodoumayi-generation-overlay--poster" : ""
      })
    }) : null, I && k ? c.jsx(Dur, {
      playing: E,
      src: _c(k) || k,
      poster: j || void 0,
      clipStart: M.active ? M.start : void 0,
      clipEnd: M.active ? M.end ?? void 0 : void 0
    }) : null]
  });
}

function j4i(e, t = 200) {
  const n = yx(e);
  return n.length > t ? `${n.slice(0, t)}…` : n;
}

function NFt({
  message: e,
  variant: t = "overlay",
  isDark: n = !0,
  className: r = "",
  onMouseDown: a
}) {
  on();
  const i = j4i(e);
  return t === "banner" ? c.jsxs("div", {
    "data-gen-failure-overlay": "",
    className: `mb-2 shrink-0 rounded-lg border px-2 py-2 ${n ? "bg-red-950/35 border-red-800/45" : "bg-red-50 border-red-200"} ${r}`,
    onMouseDown: a,
    children: [c.jsx("div", {
      className: "text-red-500 text-xs font-medium mb-0.5",
      children: x("生成失败")
    }), c.jsx("div", {
      className: `text-[10px] break-words whitespace-pre-wrap max-h-28 overflow-y-auto custom-scrollbar ${n ? "text-zinc-300" : "text-zinc-700"}`,
      title: e,
      children: i
    })]
  }) : c.jsxs("div", {
    "data-gen-failure-overlay": "",
    className: `absolute inset-0 z-[55] flex flex-col items-center justify-center gap-1 p-3 text-center rounded-2xl bg-[#1f1f1f] ${r}`,
    onMouseDown: a,
    children: [c.jsx("span", {
      className: "text-red-500 text-xs font-medium",
      children: x("生成失败")
    }), c.jsx("span", {
      className: "text-[10px] w-full max-h-[min(180px,45%)] overflow-y-auto break-words whitespace-pre-wrap custom-scrollbar text-zinc-300",
      title: e,
      children: i
    })]
  });
}

function jFt(e) {
  var t;
  return e.type !== "gen-image" && e.type !== "gen-video" ? !1 : ((t = e.settings) == null ? void 0 : t.compactImageWidget) !== !1;
}

function D4i(e, t) {
  return t === "compact" || t === "full" ? t : jFt(e) ? "compact" : "full";
}

const L4i = g.lazy(() => Ie(() => Promise.resolve().then(() => Bbr), void 0, import.meta.url).then(e => ({
    default: e.GenCompactImageVideoNodeEntry
  }))),
  O4i = g.lazy(() => Ie(() => Promise.resolve().then(() => Fbr), void 0, import.meta.url).then(e => ({
    default: e.GenFullImageVideoNodeEntry
  })));

function Our() {
  Ie(() => Promise.resolve().then(() => Bbr), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => Fbr), void 0, import.meta.url);
}

function B4i(e) {
  const t = jFt(e.node);
  return c.jsx(g.Suspense, {
    fallback: null,
    children: t ? c.jsx(L4i, {
      ...e
    }) : c.jsx(O4i, {
      ...e
    })
  });
}

const F4i = 3;

let wst = 0;

const bdn = [];

function vdn(e) {
  return new Promise((t, n) => {
    const r = () => {
      if (e()) {
        n(new DOMException("Aborted", "AbortError"));
        return;
      }
      if (wst >= F4i) {
        bdn.push(r);
        return;
      }
      wst += 1;
      let a = !1;
      t(() => {
        if (a) return;
        a = !0, wst -= 1;
        const i = bdn.shift();
        i && i();
      });
    };
    r();
  });
}

function z4i(e, t) {
  return !(e.isDark !== t.isDark || e.boxSelectLightShell !== t.boxSelectLightShell || e.backgroundOnly !== t.backgroundOnly || e.node.id !== t.node.id || e.node.type !== t.node.type || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.content !== t.node.content || e.node.videoPosterUrl !== t.node.videoPosterUrl || e.node.isGenerating !== t.node.isGenerating || e.node.errorMsg !== t.node.errorMsg || e.node.settings !== t.node.settings || e.setNodes !== t.setNodes || e.enableGenerationNodeAnimation !== t.enableGenerationNodeAnimation || e.loadingOverlayActive !== t.loadingOverlayActive || e.enableHoverPlayback !== t.enableHoverPlayback);
}

function U4i({
  node: e,
  isDark: t,
  setNodes: n,
  boxSelectLightShell: r = !1,
  backgroundOnly: a = !1,
  enableGenerationNodeAnimation: i,
  loadingOverlayActive: o,
  onRevealStart: s,
  enableHoverPlayback: l = !0
}) {
  var z, V, O, L, D, U, H, Y;
  const u = o9(e.id) || e.isGenerating === !0 || Px(e.id),
    {
      src: h,
      preferEager: p,
      onMediaLoad: m,
      onMediaError: f
    } = KCe(e),
    y = g.useRef("");
  h.trim() && (y.current = h);
  const b = h.trim() || y.current,
    [v, _] = g.useState(""),
    w = g.useRef(0),
    k = l && e.type === "gen-video",
    A = jJe(e.id, k),
    {
      mounted: S,
      playing: C
    } = RJe(e.id, !!(A && k));
  g.useEffect(() => {
    !n || r || a || u || b.trim() && (/\.(jpe?g|png|webp|gif|bmp)(\?|#|$)/i.test(b) || /\/thumbnails\//i.test(b) || b.startsWith("data:image") || b.startsWith("blob:")) || Ywe(e, n);
  }, [e, n, b, r, a, u]), g.useEffect(() => {
    !n || r || a || e.type !== "gen-image" || u || Qwe(e, n);
  }, [e, n, r, a, u]), g.useEffect(() => {
    !n || r || e.type !== "gen-image" && e.type !== "gen-video" || u || b.trim() || gCn(e, n);
  }, [e, n, r, b, u]), g.useEffect(() => {
    if (!n || r || a || u) return;
    const K = e.settings || {};
    if (K.hasCustomSize === !0) return;
    const W = (pe, ce) => {
        l5({
          nodeId: e.id,
          mw: pe,
          mh: ce,
          setNodes: n,
          currentWidth: e.width,
          currentHeight: e.height,
          hasCustomSize: !1
        });
      },
      Q = Hs(K.previewActualSize) ?? Hs(K.previewSize) ?? Hs(K.imageSize);
    if (Q) {
      const pe = kc(Q.w, Q.h),
        ce = e.width ?? 0,
        we = e.height ?? 0;
      if (z$(ce, we, pe.width, pe.height, Q.w, Q.h)) return;
      W(Q.w, Q.h);
      return;
    }
    const q = b.trim() || String(e.content || "").trim();
    if (!q) return;
    let ne = !1,
      de = !1;
    const le = () => {
        var ce;
        if (de || (de = !0, ne)) return;
        const pe = e.type === "topaz-upscale" && (((ce = e.settings) == null ? void 0 : ce.superResMode) === "video" || $o(q));
        if (e.type === "gen-video" || pe) {
          (async () => {
            const we = _c(q) || q;
            let X = () => {};
            try {
              X = await vdn(() => ne);
              const Z = await KVe(we);
              if (ne || !Z.w || !Z.h || Z.w <= 0 || Z.h <= 0) return;
              W(Z.w, Z.h);
            } catch {} finally {
              X();
            }
          })();
          return;
        }
        (async () => {
          const we = (ua() ? Bm(e) : null) || q,
            X = String(we || "").trim();
          if (!X || !/^https?:\/\//i.test(X)) return;
          let Z = () => {};
          try {
            Z = await vdn(() => ne);
            const re = await Z5(X);
            if (ne || !re || re.width <= 0 || re.height <= 0) return;
            W(re.width, re.height);
          } catch {} finally {
            Z();
          }
        })();
      },
      J = Pur(() => {
        ne || le();
      });
    return () => {
      ne = !0, J();
    };
  }, [e.id, e.type, e.content, u, e.width, e.height, (z = e.settings) == null ? void 0 : z.hasCustomSize, (V = e.settings) == null ? void 0 : V.previewActualSize, (O = e.settings) == null ? void 0 : O.previewSize, (L = e.settings) == null ? void 0 : L.imageSize, (D = e.settings) == null ? void 0 : D.superResMode, n, b, r, a]);
  const I = (U = e.settings) == null ? void 0 : U.compactImageWidget,
    E = (e.type === "gen-image" || e.type === "gen-video") && I !== !1,
    M = g.useRef(!1),
    T = g.useCallback(() => {
      M.current || (M.current = !0, Our());
    }, []),
    P = g.useCallback(() => {
      const K = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e.id) : e.id;
      return document.querySelector(`[data-node-id="${K}"].node-wrapper`);
    }, [e.id]),
    R = g.useCallback((K, W) => {
      const Q = P();
      Q && Q.dispatchEvent(new CustomEvent(K === "enter" ? zUe : CW, {
        detail: {
          relatedTarget: W
        }
      }));
    }, [P]),
    j = g.useCallback(() => {
      E && R("enter"), T();
    }, [R, E, T]),
    B = g.useCallback(K => {
      E && R("leave", K.relatedTarget);
    }, [R, E]);
  g.useEffect(() => {
    if (!S) {
      w.current += 1, _("");
      return;
    }
    const K = ++w.current,
      W = e;
    (async () => {
      const Q = W.settings || {},
        q = Array.isArray(Q.generatedImages) ? Q.generatedImages[0] : void 0,
        ne = [Q._localVideoPlaybackUrl, Q[_i], q == null ? void 0 : q.fullUrl, q == null ? void 0 : q.url, W.selectedPreviewVideo, W.content].map(le => typeof le == "string" ? le.trim() : "").find(le => le && $o(le));
      if (ne) {
        w.current === K && _(ne);
        return;
      }
      if (!ei()) return;
      const de = [q == null ? void 0 : q.assetId, q == null ? void 0 : q.id, Q._contentAssetId, Q._localCacheAssetId, Q._assetId, W._contentAssetId].map(le => typeof le == "string" ? le.trim() : "").find(Boolean);
      if (de) try {
        const {
          localCacheManager: le
        } = await Ie(async () => {
          const {
            localCacheManager: pe
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: pe
          };
        }, void 0, import.meta.url);
        await le.ensureRestored();
        const J = await le.getConvertFileSrcForAsset(de);
        w.current === K && J && $o(J) && _(J);
      } catch {}
    })();
  }, [S, e]), g.useEffect(() => {
    k && (A ? j() : B({
      relatedTarget: null
    }));
  }, [A, k, j, B]), g.useEffect(() => {
    if (E) return () => {
      R("leave", null);
    };
  }, [R, E, e.id]);
  const {
      show: F,
      message: N
    } = nJr(e),
    G = e.type !== "gen-image" && e.type !== "gen-video" && (e.isGenerating === !0 || ((H = e.settings) == null ? void 0 : H.isGenerating) === !0 || Px(e.id));
  return c.jsxs("div", {
    className: "relative h-full w-full",
    "data-node-hover-chrome-body": E ? !0 : void 0,
    onMouseEnter: j,
    onMouseLeave: B,
    onPointerEnter: T,
    onPointerDownCapture: K => zlr(e.id, K),
    children: [c.jsx(Tpe, {
      src: b,
      isDark: t,
      nodeType: e.type,
      nodeId: e.id,
      worldWidth: e.width,
      worldHeight: e.height,
      mediaType: e.type === "topaz-upscale" && ((Y = e.settings) == null ? void 0 : Y.superResMode) === "video" ? "video" : void 0,
      preferEager: p,
      generating: u,
      loadingOverlayActive: o ?? u,
      onRevealStart: s,
      onMediaLoad: m,
      onMediaError: f
    }), S && v ? c.jsx(Dur, {
      playing: C,
      src: _c(v) || v,
      poster: b || void 0
    }) : null, G ? c.jsx("div", {
      className: "absolute inset-0 z-[60] overflow-hidden rounded-2xl pointer-events-none",
      "data-compact-gen-preview": !0,
      "aria-hidden": !0,
      children: c.jsx("div", {
        "data-compact-gen-progress-layer": !0,
        className: "absolute inset-0",
        children: c.jsx(Yv, {
          seed: e.id,
          src: h.trim() || void 0,
          mediaType: e.type === "gen-video" ? "video" : "image",
          className: h.trim() ? "qiaodoumayi-generation-overlay--poster" : "",
          isDark: t,
          hasUnderlyingContent: !!b.trim()
        })
      })
    }) : null, F && c.jsx(NFt, {
      message: N
    })]
  });
}

const az = g.memo(U4i, z4i),
  $4i = () => `row-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  wdn = `你是一个专业的内容分类助手。请分析用户提供的文本，提取其中的结构化信息，并整理成表格。

【重要】整理分类时不能改变原文里的内容，只负责归类排列，要细致保留原文所有信息。不要增删改原文，仅按类别整理。
1. 根据文本内容智能确定列名，不固定。例如：分镜类可能是 时间段、镜头类型、画面描述、视觉/技术要求、音效/旁白；列表类可能是 序号、名称、说明。
2. 每一行对应一个完整条目。
3. 列名用简短中文，清晰表达含义。
4. 将原文内容准确归类到对应列，保持原文信息完整，不遗漏、不篡改。
5. 只输出 JSON，不要其他文字。格式如下：
{
  "columns": ["列1", "列2", "列3", ...],
  "rows": [
    {"列1": "值1", "列2": "值2", ...},
    ...
  ]
}`;

async function G4i(e, t) {
  const {
      customPrompt: n
    } = t,
    r = n != null && n.trim() ? `${wdn}

【用户自定义指令】${n}` : wdn,
    i = (await Bur(t, [{
      role: "system",
      content: r
    }, {
      role: "user",
      content: `请分析以下文本，提取结构化表格数据（保持原文不变，仅归类整理）：

${e}`
    }], 16e3)).match(/\{[\s\S]*\}/);
  if (!i) throw new Error("未找到 JSON 格式的表格数据");
  const o = JSON.parse(i[0]),
    s = Array.isArray(o.columns) ? o.columns.map(u => String(u).trim()).filter(Boolean) : [],
    d = (Array.isArray(o.rows) ? o.rows : []).map(u => {
      const h = {
        id: $4i()
      };
      return s.forEach(p => {
        const m = u[p] ?? u[p.toLowerCase()] ?? u[p.toUpperCase()] ?? "";
        h[p] = String(m ?? "").trim();
      }), h;
    });
  if (s.length === 0 || d.length === 0) throw new Error("未生成有效的表格列或行");
  return {
    columns: s,
    rows: d
  };
}

const QO = "画面提示词",
  xst = {
    columns: 12,
    rows: 40,
    cellChars: 8e3
  },
  V4i = /^(?:图片|参考图|生成输入|输入\s*\d+)$/;

async function Bur(e, t, n) {
  var o, s, l, d, u, h, p;
  const r = e.format || "openai",
    a = await mx({
      format: r,
      baseUrl: e.baseUrl,
      apiKey: e.apiKey,
      modelName: e.modelName,
      modelId: e.modelId,
      messages: t,
      maxTokens: n,
      temperature: .3,
      stream: !1,
      reasoningEffort: e.reasoningEffort
    });
  if (!a.ok) throw new Error(Sv(a.status));
  const i = await a.json();
  return r === "gemini-official" ? PD(i) : String(((l = (s = (o = i.choices) == null ? void 0 : o[0]) == null ? void 0 : s.message) == null ? void 0 : l.content) || ((p = (h = (u = (d = i.data) == null ? void 0 : d.choices) == null ? void 0 : u[0]) == null ? void 0 : h.message) == null ? void 0 : p.content) || i.content || "");
}

function xdn(e) {
  let t;
  try {
    const i = e.match(/\{[\s\S]*\}/);
    if (!i) throw new Error("empty");
    t = JSON.parse(i[0]);
  } catch {
    throw new Error("模型没有返回表格");
  }
  const n = (Array.isArray(t.columns) ? t.columns : []).map(i => String(i ?? "").trim()).filter(i => i && !V4i.test(i)).slice(0, xst.columns);
  n.includes(QO) || n.unshift(QO);
  const a = (Array.isArray(t.rows) ? t.rows : []).slice(0, xst.rows).map((i, o) => {
    const s = i && typeof i == "object" && !Array.isArray(i) ? i : {},
      l = {
        id: `row-${Date.now()}-${o}`
      };
    return n.forEach(d => {
      const u = s[d] ?? "";
      l[d] = String(u ?? "").trim().slice(0, xst.cellChars);
    }), l[QO] || (l[QO] = n.filter(d => d !== QO).map(d => l[d]).filter(Boolean).join(`
`)), l;
  });
  if (!a.length) throw new Error("模型没有返回表格行");
  return {
    columns: n,
    rows: a
  };
}

async function H4i(e, t) {
  var s, l, d, u;
  const n = ((s = t.customPrompt) == null ? void 0 : s.trim()) || "",
    r = [e.trim(), (l = t.mediaHierarchy) == null ? void 0 : l.trim()].filter(Boolean).join(`

`),
    a = n ? ["用户的自定义指令优先级最高，必须执行，不要只把原文原样拆开。", `自定义指令：${n}`, "按指令补写或改写后，整理成表格。必须有「画面提示词」列，每一行是一条可直接用于绘画的提示词。", "不要创建图片、参考图或生成输入列。只返回一个 JSON。"].join(`
`) : ["你在拆分用户给出的原文，不是重新创作。", "每一行对应原文里的一个条目。原文有几条就出几行，不要合并，也不要多写。", "「画面提示词」必须原样抄写该条的英文提示词；没有英文时原样抄写画面描述。禁止写成「设计指令」，禁止概括、润色或补写关系句。", "名称、画面设计也原样摘录。", "不要创建图片、参考图或生成输入列。", '只返回一个 JSON：{"columns":["名称","画面设计","画面提示词"],"rows":[{"名称":"...","画面设计":"...","画面提示词":"..."}]}'].join(`
`),
    i = h => Bur(t, [{
      role: "system",
      content: a
    }, {
      role: "user",
      content: h
    }], 8192);
  (d = t.onStage) == null || d.call(t, "generating");
  let o = await i(n ? `按自定义指令处理下面的上游内容，并输出表格：

${r}` : `按原文拆成表格，单元格保持原文：

${r}`);
  try {
    return {
      ...xdn(o),
      plan: ""
    };
  } catch {
    return (u = t.onStage) == null || u.call(t, "repairing"), o = await i(`把下面结果修成合法表格 JSON。不要删原文，不要改写成设计指令，不要 Markdown。必须有「画面提示词」列。

待修复：${o}`), {
      ...xdn(o),
      plan: ""
    };
  }
}

const eAe = new Set(["input-image", "gen-image", "preview"]),
  W4i = new Set(["text-node", "novel-input", "custom-agent"]);

function QUe(e) {
  const t = String(e || "");
  return t.includes("<") ? t.replace(/<br\s*\/?>/gi, `
`).replace(/<\/p>/gi, `
`).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim() : t.trim();
}

function q4i(e, t, n) {
  var o;
  const r = Fde({
      nodeId: e,
      connections: n,
      nodes: t
    }),
    a = [];
  for (const s of n) {
    if (s.to !== e || s.inputType && s.inputType !== "default" && s.inputType !== "veo_start" && s.inputType !== "veo_end") continue;
    const l = t.find(p => p.id === s.from);
    if (!l || l.type !== "text-node" && l.type !== "novel-input" && l.type !== "custom-agent") continue;
    const d = l.type === "custom-agent" ? String(((o = l.settings) == null ? void 0 : o.outputContent) || "") : RJ(l),
      u = EUe(l.settings),
      h = QUe(u.trim().length > d.trim().length ? u : d);
    h && a.push(h);
  }
  const i = a.join(`

`);
  return i.length >= r.trim().length ? i : r.trim();
}

function K4i(e) {
  var i, o;
  const t = QUe(e),
    n = ((o = (i = t.match(/风格基底[\s\S]{0,40}?`([^`]+)`/)) == null ? void 0 : i[1]) == null ? void 0 : o.trim()) || "",
    r = t.split(/\n(?=###\s*图\s*\d+)/),
    a = [];
  return r.forEach((s, l) => {
    var m, f, y, b, v, _;
    const d = (f = (m = s.match(/###\s*(图\s*\d+[^\n]*)/)) == null ? void 0 : m[1]) == null ? void 0 : f.replace(/\*\*/g, "").trim();
    if (!d) return;
    const u = ((b = (y = s.match(/画面设计\**[：:]\s*([\s\S]*?)(?=\n-\s+\*\*|\n###|\n---|$)/)) == null ? void 0 : y[1]) == null ? void 0 : b.replace(/\*\*/g, "").trim()) || "";
    let p = ((_ = (v = s.match(/英文提示词\**[：:]?\s*\n?([\s\S]*?)(?=\n---|\n###|$)/)) == null ? void 0 : v[1]) == null ? void 0 : _.replace(/^>\s?/gm, "").replace(/^`|`$/g, "").trim()) || "" || u;
    p && (n && !p.includes(n.slice(0, 24)) && (p = `${p} ${n}`.trim()), a.push({
      id: `row-series-${l + 1}`,
      名称: d,
      画面设计: u,
      [QO]: p
    }));
  }), a.length ? {
    columns: ["名称", "画面设计", QO],
    rows: a
  } : null;
}

function Q4i(e) {
  var r;
  if (e.type === "custom-agent") return QUe(String(((r = e.settings) == null ? void 0 : r.outputContent) || ""));
  const t = RJ(e),
    n = EUe(e.settings);
  return QUe(n.trim().length > t.trim().length ? n : t);
}

function Y4i(e, t, n) {
  var s;
  const r = new Map(t.map(l => [l.id, l])),
    a = [],
    i = new Set(),
    o = l => {
      !l || !eAe.has(l.type) || i.has(l.id) || (i.add(l.id), a.push({
        id: l.id,
        kind: "image",
        label: l.nodeName || "图片",
        snippet: "",
        thumb: YCe(l)
      }));
    };
  for (const l of n) {
    if (l.to !== e || l.inputType && l.inputType !== "default") continue;
    const d = (s = l.fromGroupNodeIds) != null && s.length ? l.fromGroupNodeIds : [l.from];
    for (const u of d) {
      const h = r.get(u);
      if (!h || i.has(`node:${h.id}`) || eAe.has(h.type) || h.type !== "text-node" && h.type !== "novel-input" && h.type !== "custom-agent") continue;
      i.add(`node:${h.id}`);
      const p = Q4i(h).replace(/\s+/g, " ").trim();
      a.push({
        id: h.id,
        kind: h.type === "custom-agent" ? "agent" : "text",
        label: h.nodeName || (h.type === "custom-agent" ? "Agent" : "文本"),
        snippet: p.slice(0, 36),
        thumb: ""
      });
    }
  }
  for (const l of $de(e, t, n)) for (const d of l.nodeIds) o(r.get(d));
  return a;
}

function X4i(e) {
  var t;
  return (e == null ? void 0 : e.type) === "table-editor-node" && ((t = e.settings) == null ? void 0 : t.tableMode) === "generate-list";
}

function $de(e, t, n) {
  const r = new Map(t.map(u => [u.id, u])),
    a = [],
    i = new Set(),
    o = new Set(),
    s = new Map();
  for (const u of n) {
    if (u.inputType && u.inputType !== "default") continue;
    const h = s.get(u.to) || [];
    h.push(u), s.set(u.to, h);
  }
  const l = (u, h, p) => {
      const m = [...new Set(h)];
      if (!m.length) return;
      const f = `${p}:${m.join("|")}`;
      o.has(f) || (o.add(f), a.push({
        id: u,
        nodeIds: m,
        mode: p ? "shared" : "sequence",
        label: p ? "共享" : "逐行"
      }));
    },
    d = u => {
      var m, f, y, b;
      if (i.has(u)) return;
      i.add(u);
      const h = s.get(u) || [],
        p = h.map(v => {
          var _;
          return {
            conn: v,
            ids: ((_ = v.fromGroupNodeIds) != null && _.length ? v.fromGroupNodeIds : [v.from]).filter(w => {
              var k;
              return eAe.has(((k = r.get(w)) == null ? void 0 : k.type) || "");
            })
          };
        }).filter(v => v.ids.length);
      if (u === e) for (const {
        conn: v,
        ids: _
      } of p) l(`connection:${v.id}`, _, _.length === 1 || v.referenceRole === "style" || v.referenceRole === "scene");else {
        const v = [...new Set(p.filter(({
            conn: S
          }) => S.referenceRole !== "style" && S.referenceRole !== "scene").flatMap(S => S.ids))],
          _ = new Map(),
          w = v.map(S => {
            const C = Ry(r.get(S))[0] || S;
            return _.set(C, [...(_.get(C) || []), S]), C;
          }),
          k = (f = (m = r.get(u)) == null ? void 0 : m.settings) == null ? void 0 : f.inputItemOrder,
          A = xY(w, k).map(S => _.get(S).shift());
        l(`source:${u}:materials`, A, v.length === 1);
        for (const {
          conn: S,
          ids: C
        } of p) (S.referenceRole === "style" || S.referenceRole === "scene") && l(`connection:${S.id}`, C, !0);
      }
      for (const v of h) for (const _ of (y = v.fromGroupNodeIds) != null && y.length ? v.fromGroupNodeIds : [v.from]) W4i.has(((b = r.get(_)) == null ? void 0 : b.type) || "") && d(_);
    };
  return d(e), a;
}

function J4i(e, t) {
  if (!e.length) return "";
  const n = new Map(t.map(a => [a.id, a])),
    r = ["输入素材层级（先按来源通道，再按通道内顺序）："];
  return e.forEach((a, i) => {
    const o = a.nodeIds.map((l, d) => {
        const u = n.get(l);
        return `输入${i + 1}-第${d + 1}张（${(u == null ? void 0 : u.nodeName) || l}）`;
      }).join("、"),
      s = a.mode === "sequence" ? `图片组，共 ${a.nodeIds.length} 张；第 N 行只用第 N 张` : "每一行共用";
    r.push(`输入${i + 1}（${a.label}）：${s}；包含 ${o}`);
  }), r.push("一组商品图按行对应。单张风格图每一行都用。风格图只借版式和配色，不搬商品外观。"), r.join(`
`);
}

function Z4i(e, t) {
  if (e.mode === "sequence") {
    const n = e.nodeIds[t];
    return n ? [n] : [];
  }
  return e.nodeIds;
}

function jkt(e, t) {
  var a, i;
  const n = ((a = e.settings) == null ? void 0 : a.tableRowImageBindings) || {},
    r = ((i = e.settings) == null ? void 0 : i.tableRows) || [];
  return Object.fromEntries(r.map((o, s) => {
    const l = String(o.id || `row-${s}`);
    return [l, Object.fromEntries(t.filter(d => {
      var u;
      return d.mode === "sequence" || Array.isArray((u = n[l]) == null ? void 0 : u[d.id]);
    }).map(d => {
      var p;
      const u = (p = n[l]) == null ? void 0 : p[d.id],
        h = Array.isArray(u) ? u.filter(m => d.nodeIds.includes(m)) : Z4i(d, s);
      return [d.id, h];
    }))];
  }));
}

function e5i(e, t) {
  const n = String(e[QO] || "").trim();
  return n || t.map(r => String(e[r] || "").trim()).filter(Boolean).join(`
`);
}

function _dn(e, t, n) {
  var s, l;
  const r = ((s = e.settings) == null ? void 0 : s.tableColumns) || [],
    a = ((l = e.settings) == null ? void 0 : l.tableRows) || [],
    i = $de(e.id, t, n),
    o = jkt(e, i);
  return a.map((d, u) => {
    const h = String(d.id || `row-${u}`),
      p = [];
    for (const m of i) for (const f of o[h][m.id] ?? m.nodeIds) p.includes(f) || p.push(f);
    return {
      id: h,
      rowNumber: u + 1,
      prompt: e5i(d, r),
      mediaNodeIds: p,
      missingMedia: i.some(m => !(o[h][m.id] ?? m.nodeIds).length) || p.some(m => !Ry(t.find(f => f.id === m)).length)
    };
  });
}

function YUe(e) {
  return !e.missingMedia && !!(e.prompt.trim() || e.mediaNodeIds.length);
}

function _st(e, t, n) {
  for (const r of n) {
    if (r.to !== e || r.inputType && r.inputType !== "default") continue;
    const a = t.find(i => i.id === r.from);
    if (X4i(a)) return a || null;
  }
  return null;
}

function YCe(e) {
  if (!e) return "";
  const t = xf(e);
  if (fu(t)) return t;
  const n = String(e.thumbnailUrl || "").trim();
  return fu(n) ? n : Ry(e).find(r => fu(r)) || "";
}

function RMe(e) {
  if (!e) return "";
  const t = YCe(e);
  return fu(t) ? t : Ry(e).find(n => fu(n)) || "";
}

function t5i(e, t) {
  const n = [],
    r = new Map(t.map(a => [a.id, a]));
  for (const a of e) for (const i of Ry(r.get(a))) i && !n.includes(i) && n.push(i);
  return n;
}

function n5i(e, t, n) {
  var o, s, l, d;
  const r = new Map(t.map(u => [u.id, u])),
    a = [];
  for (const u of n) {
    if (u.to !== e || u.inputType && u.inputType !== "default") continue;
    const h = (o = u.fromGroupNodeIds) != null && o.length ? u.fromGroupNodeIds : [u.from];
    for (const p of h) eAe.has(((s = r.get(p)) == null ? void 0 : s.type) || "") && !a.includes(p) && a.push(p);
  }
  const i = (((d = (l = r.get(e)) == null ? void 0 : l.settings) == null ? void 0 : d.referenceImages) || []).map(u => String(u || "").trim()).filter(Boolean);
  return [...t5i(a, t), ...i].filter((u, h, p) => p.indexOf(u) === h);
}

function Fur(e, t) {
  var i;
  const n = t.filter(YUe),
    r = (i = e.settings) == null ? void 0 : i.tableBatchSelectedRowIds;
  if (!Array.isArray(r)) return n;
  const a = new Set(r.map(o => String(o)));
  return n.filter(o => a.has(o.id));
}

function r5i(e, t, n) {
  return e.some(r => {
    const a = r.settings;
    if ((a == null ? void 0 : a._tableBatchSourceId) !== t || (a == null ? void 0 : a._tableBatchRowId) !== n) return !1;
    const i = al.getNodeSnapshot(r.id);
    return i.status !== "idle" ? i.status === "generating" : !!(r.isGenerating || a.isGenerating);
  });
}

const a5i = ["model", "ratio", "resolution", "quality", "platformGroup", "gptImage2Resolution", "gptImage2AspectRatio", "gptImageQuality", "gptImageBackground", "seedreamBackground"];

function i5i(e) {
  const t = Fur(e.source, e.rows).filter(l => !r5i(e.nodes, e.source.id, l.id));
  if (!t.length) return [];
  const n = n5i(e.source.id, e.nodes, e.connections),
    r = e.source.settings || {},
    a = new Map(Object.entries(r.referenceImageThumbnails || {})),
    i = new Set([...t.flatMap(l => l.mediaNodeIds), ...e.connections.filter(l => l.to === e.source.id && (!l.inputType || l.inputType === "default")).flatMap(l => {
      var d;
      return (d = l.fromGroupNodeIds) != null && d.length ? l.fromGroupNodeIds : [l.from];
    })]);
  for (const l of i) {
    const d = e.nodes.find(h => h.id === l);
    if (!d || !eAe.has(d.type)) continue;
    const u = RMe(d);
    if (u) for (const h of Ry(d)) a.set(h, u);
  }
  const o = {
    _agentExplicitGenPrefs: !0,
    batchSize: 1,
    batchCount: 1
  };
  for (const l of a5i) r[l] !== void 0 && (o[l] = r[l]);
  const s = {
    x: e.source.x + (e.source.width || 250) + 32,
    y: e.nodes.reduce((l, d) => {
      var u;
      return ((u = d.settings) == null ? void 0 : u._tableBatchSourceId) === e.source.id ? Math.max(l, d.y + (d.height || 250) + 100) : l;
    }, e.source.y)
  };
  return t.map(l => {
    const u = [...l.mediaNodeIds.map(v => {
        const _ = e.nodes.find(A => A.id === v),
          w = Ry(_)[0] || "",
          k = RMe(_);
        return u7(w) ? w : k;
      }).filter(Boolean), ...n].map(v => String(v || "").trim()).filter((v, _, w) => u7(v) && w.indexOf(v) === _),
      h = Object.fromEntries(u.flatMap(v => {
        const _ = a.get(v);
        return _ && _ !== v ? [[v, _]] : [];
      })),
      p = e.connections.filter(v => v.to === e.source.id).flatMap(v => {
        var _;
        return (_ = v.fromGroupNodeIds) != null && _.length ? v.fromGroupNodeIds : [v.from];
      }).map(v => RMe(e.nodes.find(_ => _.id === v))).find(v => fu(v)),
      m = l.mediaNodeIds.map(v => RMe(e.nodes.find(_ => _.id === v))).find(v => fu(v)) || p || u.find(v => fu(v)) || "",
      f = l.prompt.trim() || "以参考图为商品主体，保持其外观。",
      y = Ki(e.generateId(), "gen-image", s.x, s.y, `第${l.rowNumber}行`, {
        ...o,
        referenceImages: u,
        referenceImageThumbnails: h,
        inputImageOrder: u,
        _tableBatchSourceId: e.source.id,
        _tableBatchRowId: l.id,
        _tableBatchRowNumber: l.rowNumber,
        _agentTaskText: f,
        ...(m ? {
          _batchReferenceThumb: m
        } : {})
      }, e.nodes),
      b = _Gn({
        origin: s,
        cell: {
          width: y.width || 250,
          height: y.height || 250
        },
        index: l.rowNumber - 1,
        rowCapacity: 3
      });
    return y.x = b.x, y.y = b.y, y.prompt = f, y.isGenerating = !0, y.settings && (y.settings.isGenerating = !0), y;
  });
}

function zur(e, t, n) {
  const r = new Map(n.filter(a => {
    var i;
    return ((i = a.settings) == null ? void 0 : i._tableBatchSourceId) === e;
  }).map(a => {
    var i;
    return [String((i = a.settings) == null ? void 0 : i._tableBatchRowId), a];
  }));
  return t.map(a => {
    var o, s;
    const i = r.get(a.id);
    return i ? i.isGenerating || (o = i.settings) != null && o.isGenerating ? "b" : (s = i.settings) != null && s.error ? "f" : "d" : "i";
  }).join("");
}

function o5i({
  sourceId: e,
  rows: t,
  nodes: n,
  isDark: r
}) {
  return on(), c.jsx(Uur, {
    snapshot: zur(e, t, n),
    isDark: r
  });
}

function Uur({
  snapshot: e,
  isDark: t
}) {
  on();
  const n = e.split(""),
    r = n.filter(m => m !== "i").length,
    a = n.filter(m => m === "b").length,
    i = n.filter(m => m === "f").length,
    o = n.filter(m => m === "d").length,
    s = t ? "text-zinc-500" : "text-zinc-400",
    l = t ? "text-zinc-100" : "text-zinc-800",
    d = t ? "stroke-white/25" : "stroke-black/20",
    u = r === 0 ? "待分发" : a ? "并发生成中" : i ? `${i} 个失败` : "全部完成",
    h = Math.max(n.length, 1),
    p = n.slice(0, 8);
  return c.jsxs("div", {
    className: `pointer-events-none absolute inset-[1px] z-[5] flex flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl ${t ? "bg-[#1c1c1c]" : "bg-white"}`,
    children: [c.jsxs("svg", {
      viewBox: "0 0 100 60",
      className: "w-[62%] max-w-[180px]",
      fill: "none",
      children: [c.jsx("circle", {
        cx: "12",
        cy: "30",
        r: "3",
        className: t ? "fill-zinc-200" : "fill-zinc-800"
      }), p.map((m, f) => {
        const y = p.length === 1 ? 30 : 6 + 48 / (p.length - 1) * f,
          b = m === "i" ? t ? "fill-white/15" : "fill-black/15" : m === "f" ? "fill-red-400/80" : m === "b" ? `${t ? "fill-zinc-300" : "fill-zinc-600"} animate-pulse` : t ? "fill-zinc-100" : "fill-zinc-800";
        return c.jsxs("g", {
          children: [c.jsx("path", {
            d: `M15 30 C 50 30, 50 ${y}, 86 ${y}`,
            strokeWidth: "0.6",
            className: d
          }), c.jsx("circle", {
            cx: "88",
            cy: y,
            r: "2.2",
            className: b
          })]
        }, f);
      })]
    }), c.jsxs("div", {
      className: "text-center",
      children: [c.jsx("div", {
        className: `text-[22px] font-extralight tabular-nums leading-none ${l}`,
        children: r ? `${o}/${h}` : h
      }), c.jsx("div", {
        className: `mt-2 text-[10px] tracking-[0.2em] ${s}`,
        children: r ? u : x("行 · {0}", u)
      })]
    })]
  });
}

function s5i({
  rows: e,
  channels: t,
  nodes: n,
  selectedIds: r,
  isDark: a,
  onToggleRow: i
}) {
  on();
  const o = new Map(n.map(f => [f.id, f])),
    s = e.filter(YUe),
    l = r ? s.filter(f => r.includes(f.id)).length : s.length,
    d = a ? "text-zinc-500" : "text-zinc-400",
    u = a ? "text-zinc-200" : "text-zinc-700",
    h = f => f.mediaNodeIds.join("|"),
    p = e.length > 1 && e.every(f => h(f) === h(e[0])) ? e[0].mediaNodeIds : null,
    m = (f, y) => f.slice(0, 4).map(b => {
      const v = YCe(o.get(b));
      return v ? c.jsx("img", {
        src: v,
        alt: "",
        className: `${y} rounded-[4px] object-cover`,
        draggable: !1
      }, b) : c.jsx("span", {
        className: `${y} rounded-[4px] ${a ? "bg-white/10" : "bg-zinc-200"}`
      }, b);
    });
  return c.jsxs("div", {
    className: "flex flex-col min-h-0 gap-1.5",
    onMouseDown: f => f.stopPropagation(),
    onWheel: f => f.stopPropagation(),
    children: [c.jsxs("div", {
      className: `flex items-center gap-2 px-1 text-[10px] tracking-wide ${d}`,
      children: [c.jsx("span", {
        children: x("批量生成")
      }), c.jsx("span", {
        className: u,
        children: l
      }), c.jsxs("span", {
        children: ["/ ", e.length]
      }), p != null && p.length ? c.jsxs("span", {
        className: "ml-auto flex items-center gap-1",
        children: [x("共用参考"), c.jsx("span", {
          className: "flex gap-0.5 opacity-80",
          children: m(p, "h-4 w-4")
        })]
      }) : null]
    }), c.jsx("div", {
      className: "max-h-[168px] overflow-y-auto minimal-scrollbar flex flex-col",
      children: e.map(f => {
        const y = YUe(f),
          b = y && (r ? r.includes(f.id) : !0);
        return c.jsxs("button", {
          type: "button",
          disabled: !y,
          title: f.missingMedia ? x("缺少对应素材图，请在表格中绑定后生成") : f.prompt,
          onClick: () => i(f.id),
          className: `group flex items-center gap-2 rounded-md px-1.5 py-[5px] text-left text-[11px] transition-colors ${a ? "hover:bg-white/[0.04]" : "hover:bg-black/[0.03]"} ${y ? "" : "opacity-35"}`,
          children: [c.jsx("span", {
            className: `flex h-3 w-3 shrink-0 items-center justify-center rounded-full border transition-colors ${b ? a ? "border-zinc-100 bg-zinc-100" : "border-zinc-800 bg-zinc-800" : a ? "border-white/20" : "border-zinc-300"}`,
            children: b ? c.jsx("span", {
              className: `h-1 w-1 rounded-full ${a ? "bg-zinc-900" : "bg-white"}`
            }) : null
          }), c.jsx("span", {
            className: `w-3 shrink-0 text-[10px] tabular-nums ${d}`,
            children: f.rowNumber
          }), !p && f.mediaNodeIds.length ? c.jsx("span", {
            className: "flex shrink-0 gap-0.5 opacity-70 group-hover:opacity-100",
            children: m(f.mediaNodeIds, "h-4 w-4")
          }) : null, c.jsxs("span", {
            className: `min-w-0 flex-1 truncate ${b ? u : d}`,
            children: [f.missingMedia ? `${x("未绑定素材")} · ` : "", f.prompt || (f.mediaNodeIds.length ? x("仅参考图") : x("空行"))]
          })]
        }, f.id);
      })
    }), t.length > 1 ? c.jsx("div", {
      className: `px-1 text-[10px] ${d}`,
      children: t.map((f, y) => `输入${y + 1} ${f.label}`).join(" · ")
    }) : null]
  });
}

const l5i = 3;

function DFt(e) {
  return e <= 1 ? 0 : Math.min(e - 1, l5i);
}

function c5i({
  count: e,
  isDark: t,
  sizes: n
}) {
  const r = n != null && n.length ? n.length : DFt(e);
  return r === 0 ? null : c.jsx("div", {
    "data-compact-stack-backs": !0,
    className: "pointer-events-none absolute inset-0 z-0",
    "aria-hidden": !0,
    children: Array.from({
      length: r
    }, (a, i) => {
      const o = i + 1,
        s = lOn(o),
        l = n == null ? void 0 : n[i];
      return c.jsx("div", {
        className: `absolute rounded-2xl border ${l ? "left-1/2 top-1/2" : "inset-0"} ${t ? "border-white/10 bg-[#1f1f1f]" : "border-black/15 bg-zinc-800"}`,
        style: {
          ...(l ? {
            width: l.width,
            height: l.height
          } : {}),
          transform: l ? `translate(-50%, -50%) translate(${s.x}px, ${s.y}px) rotate(${s.rotate}deg) scale(${s.scale})` : `translate(${s.x}px, ${s.y}px) rotate(${s.rotate}deg) scale(${s.scale})`,
          opacity: s.opacity,
          boxShadow: t ? "0 8px 18px rgba(0,0,0,0.45)" : "0 8px 18px rgba(0,0,0,0.18)"
        }
      }, o);
    })
  });
}

function d5i({
  backs: e,
  isDark: t,
  sizes: n
}) {
  const r = n != null && n.length ? n.length : e;
  return r <= 0 ? null : c.jsx("div", {
    "data-compact-light-stack": r,
    className: `compact-light-stack ${t ? "compact-light-stack--dark" : "compact-light-stack--light"}`,
    "aria-hidden": !0,
    children: Array.from({
      length: 3
    }, (a, i) => {
      const o = n == null ? void 0 : n[i];
      return c.jsx("i", {
        style: o ? {
          width: o.width,
          height: o.height
        } : void 0
      }, i);
    })
  });
}

function u5i({
  count: e,
  expanded: t = !1,
  isDark: n,
  children: r,
  backSizes: a
}) {
  const i = t ? 0 : a != null && a.length ? a.length : DFt(e);
  return i === 0 && !t ? r : c.jsxs("div", {
    className: "relative z-[10] h-full w-full min-h-0 min-w-0",
    children: [i > 0 ? c.jsx(c5i, {
      count: e,
      isDark: n,
      sizes: t ? void 0 : a
    }) : null, c.jsx("div", {
      className: "relative z-[1] h-full w-full overflow-hidden rounded-2xl",
      children: r
    })]
  });
}

const h5i = {
    "text-node": {
      icon: XE,
      name: "文本",
      description: "脚本、广告词、品牌文案"
    },
    "input-image": {
      icon: ml,
      name: "上传",
      description: "上传音视频与图片素材"
    },
    "gen-image": {
      icon: tw,
      name: "AI 绘画",
      description: "生成或编辑图片"
    },
    "gen-video": {
      icon: wb,
      name: "AI 视频",
      description: "生成视频与动态画面"
    },
    "motion-control": {
      icon: wb,
      name: "动作迁移",
      description: "迁移动作与镜头运动"
    },
    "virtual-try-on": {
      icon: wb,
      name: "商品合图",
      description: "把服装、产品或多张参考图，合到人物画面上"
    },
    "video-relight": {
      icon: wb,
      name: "光照重置",
      description: "用参考图重置视频光照或风格"
    },
    "custom-agent": {
      icon: b5e,
      name: "Agent",
      description: "添加智能处理节点"
    },
    preview: {
      icon: ul,
      name: "预览与拼图",
      description: "查看上游生成结果，支持拼图"
    },
    "local-save": {
      icon: O5,
      name: "指定保存",
      description: "将结果保存到本地"
    },
    "video-input": {
      icon: Oo,
      name: "视频",
      description: "导入视频素材"
    },
    "video-analyze": {
      icon: Sf,
      name: "视频分析",
      description: "提取镜头与内容信息"
    },
    "shot-breakdown": {
      icon: uZ,
      name: "逐帧拉片",
      description: "拆解风格、运镜与音频"
    },
    "script-parse": {
      icon: Hd,
      name: "脚本解析",
      description: "拆解剧本镜头、资产与提示词"
    },
    "storyboard-node": {
      icon: vWt,
      name: "分镜视表",
      description: "组织分镜与镜头结构"
    },
    "storyboard-chart-node": {
      icon: vWt,
      name: "分镜图表",
      description: "生成分镜图表"
    },
    "gen-music": {
      icon: Qh,
      name: "AI 音乐",
      description: "生成配乐与音乐"
    },
    "gen-speech": {
      icon: Q2,
      name: "AI 语音",
      description: "旁白、TTS 与 Seed Audio 音频生成"
    },
    "table-editor-node": {
      icon: Hue,
      name: "表格",
      description: "编辑结构化表格"
    },
    "inpaint-crop": {
      icon: Sf,
      name: "局部重绘",
      description: "裁剪并重绘局部区域"
    }
  },
  p5i = ({
    visible: e,
    nodeId: t,
    direction: n,
    options: r,
    onSelect: a,
    onClose: i,
    isDark: o = !0
  }) => {
    on();
    const s = g.useRef(null),
      l = g.useMemo(() => r.map(d => ({
        option: d,
        meta: h5i[d.type] ?? {
          icon: Hd,
          name: d.label,
          description: "添加并自动连接新节点"
        }
      })), [r]);
    return g.useEffect(() => {
      if (!e) return;
      const d = h => {
          var p;
          (p = s.current) != null && p.contains(h.target) || i();
        },
        u = h => {
          h.key === "Escape" && i();
        };
      return window.addEventListener("pointerdown", d, !0), window.addEventListener("keydown", u, !0), () => {
        window.removeEventListener("pointerdown", d, !0), window.removeEventListener("keydown", u, !0);
      };
    }, [e, i]), !e || l.length === 0 ? null : c.jsxs("div", {
      ref: s,
      "data-connection-dial-node": t,
      className: `qiaodoumayi-context-menu absolute top-1/2 z-[245] w-[260px] overflow-hidden rounded-2xl border p-1.5 shadow-2xl ${o ? "border-white/10 bg-[#202020]/95 text-zinc-100" : "border-zinc-200 bg-white/[0.96] text-zinc-900"}`,
      style: n === "input" ? {
        right: "calc(100% + 50px)",
        transformOrigin: "right center"
      } : {
        left: "calc(100% + 50px)",
        transformOrigin: "left center"
      },
      role: "menu",
      "aria-label": x(n === "input" ? "添加上游节点" : "添加下游节点"),
      onMouseDown: d => d.stopPropagation(),
      onClick: d => d.stopPropagation(),
      children: [c.jsxs("div", {
        className: "flex items-center justify-between px-2.5 pb-1.5 pt-1 text-[12px]",
        children: [c.jsx("span", {
          className: o ? "text-zinc-400" : "text-zinc-500",
          children: x("添加上下文")
        }), c.jsx("span", {
          className: `rounded-full px-1.5 py-0.5 text-[10px] ${o ? "bg-white/5 text-zinc-500" : "bg-zinc-100 text-zinc-500"}`,
          children: x(n === "input" ? "上游" : "下游")
        })]
      }), c.jsx("div", {
        className: "max-h-[292px] space-y-0.5 overflow-y-auto",
        children: l.map(({
          option: d,
          meta: u
        }) => {
          const h = u.icon;
          return c.jsxs("button", {
            type: "button",
            role: "menuitem",
            className: `group flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors duration-150 ${o ? "hover:bg-white/10 focus-visible:bg-white/10" : "hover:bg-zinc-100 focus-visible:bg-zinc-100"}`,
            onMouseDown: p => p.stopPropagation(),
            onClick: () => a(d),
            children: [c.jsx("span", {
              className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${o ? "bg-white/[0.055] text-zinc-300" : "bg-zinc-100 text-zinc-600"}`,
              children: c.jsx(h, {
                size: 17,
                strokeWidth: 1.7
              })
            }), c.jsxs("span", {
              className: "min-w-0",
              children: [c.jsx("span", {
                className: "block truncate text-[13px] font-medium",
                children: u.name || d.label
              }), c.jsx("span", {
                className: "block truncate pt-0.5 text-[11px] text-zinc-500",
                children: u.description
              })]
            })]
          }, `${n}-${d.type}`);
        })
      })]
    });
  },
  m5i = new Set(["input-image", "gen-image", "gen-video", "jimeng-super-resolution"]);

function f5i({
  nodeType: e
}) {
  const t = m5i.has(e);
  return c.jsx("div", {
    className: "canvas-node-selection-frame",
    "data-node-selection-frame": !0,
    "data-media-aligned": t ? "true" : "false",
    "aria-hidden": !0
  });
}

const g5i = g.memo(f5i);

function y5i(e, t, n = "50% 0%") {
  if (!e) return;
  e.setAttribute("data-canvas-locked-ui-scale", ""), e.style.removeProperty("will-change"), e.style.removeProperty("backface-visibility");
  const r = eZ(t);
  if (e.style.transition = "none", r === 1) {
    e.style.removeProperty("transform"), e.style.removeProperty("transform-origin");
    return;
  }
  e.style.transform = `scale(${r})`, e.style.transformOrigin = n;
}

function Qp(e, t = "50% 0%", n = !0) {
  g.useLayoutEffect(() => {
    if (!n) {
      const d = e.current;
      d && (d.removeAttribute("data-canvas-locked-ui-scale"), d.style.removeProperty("transform"), d.style.removeProperty("transform-origin"), d.style.removeProperty("transition"), d.style.removeProperty("will-change"), d.style.removeProperty("backface-visibility"));
      return;
    }
    const r = d => {
      y5i(e.current, d, t);
    };
    r(Cd().zoom);
    let a = 0,
      i = 0;
    const o = () => {
      if (a = 0, e.current) {
        r(Cd().zoom);
        return;
      }
      i++ < 24 && (a = requestAnimationFrame(o));
    };
    e.current || (a = requestAnimationFrame(o));
    const s = dw(d => r(d.zoom)),
      l = K4e(d => r(d.zoom));
    return () => {
      a && cancelAnimationFrame(a), s(), l();
    };
  }, [e, t, n]);
}

function b5i({
  node: e,
  isSelected: t,
  isDark: n
}) {
  const r = g.useRef(null),
    a = t && e.type !== "custom-agent" && e.type !== "storyboard-node" && e.type !== "storyboard-chart-node" && e.type !== "table-editor-node" && UD(e) && !Tza.has(e.type);
  return Qp(r, "50% 100%", a), a ? c.jsx("div", {
    className: "pointer-events-auto absolute left-1/2 bottom-full z-[120] -translate-x-1/2",
    "data-canvas-pin-ui": "overlay",
    style: {
      marginBottom: 12
    },
    onClick: i => i.stopPropagation(),
    onPointerDown: i => i.stopPropagation(),
    onMouseDown: i => i.stopPropagation(),
    children: c.jsx("div", {
      ref: r,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        "data-canvas-pin-toolbar": "",
        className: `flex items-center overflow-visible ${fJ(n)}`,
        children: c.jsx($D, {
          nodeIds: [e.id],
          pins: Zg(e),
          isDark: n
        })
      })
    })
  }) : null;
}

function v5i({
  label: e,
  isDark: t
}) {
  return on(), c.jsxs(c.Fragment, {
    children: [c.jsx(Der, {
      mode: "hover",
      side: "both",
      isDark: t,
      className: "canvas-reference-pick-border-beam"
    }), c.jsx("div", {
      "data-canvas-reference-pick-chrome": !0,
      className: "canvas-reference-pick-chrome pointer-events-none absolute inset-0 z-[74] rounded-[inherit]",
      "aria-hidden": !0,
      children: c.jsxs("div", {
        className: "canvas-reference-pick-label absolute right-[calc(100%+9px)] top-1/2 flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/10 bg-[#252525]/95 px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-[0_8px_22px_rgba(0,0,0,0.32)] backdrop-blur-lg",
        children: [c.jsx(yEt, {
          size: 12,
          strokeWidth: 1.9
        }), c.jsxs("span", {
          children: [x("选择 "), e]
        })]
      })
    })]
  });
}

const w5i = "textarea[data-agent-body-textarea]",
  kdn = 16,
  x5i = 4,
  _5i = 4,
  k5i = ["direction", "boxSizing", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontSize", "fontFamily", "lineHeight", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize", "whiteSpace", "wordWrap", "overflowWrap", "wordBreak"];

function A5i(e) {
  const {
    resize: t,
    clientX: n,
    clientY: r,
    right: a,
    bottom: i
  } = e;
  return t !== "both" && t !== "vertical" && t !== "horizontal" ? !1 : n >= a - kdn && r >= i - kdn;
}

function S5i(e) {
  const t = e.offsetWidth - e.clientWidth;
  return t <= _5i ? !1 : e.clientX >= e.right - e.borderRight - t;
}

function I5i(e) {
  const {
    clientX: t,
    clientY: n,
    left: r,
    top: a,
    right: i,
    bottom: o,
    value: s
  } = e;
  if (t < r || t > i || n < a || n > o || A5i(e) || S5i(e)) return !1;
  if (!s) return !0;
  const l = a + e.borderTop + e.paddingTop + e.lastCharContentTop - e.scrollTop + e.lineHeight;
  return n > l + x5i;
}

function C5i(e) {
  const n = (e.ownerDocument.defaultView ?? window).getComputedStyle(e),
    r = parseFloat(n.fontSize) || 16,
    a = parseFloat(n.lineHeight);
  return Number.isFinite(a) && a > 0 ? a : r * 1.5;
}

function E5i(e) {
  const t = e.ownerDocument,
    r = (t.defaultView ?? window).getComputedStyle(e),
    a = t.createElement("div");
  k5i.forEach(s => {
    const l = r[s];
    if (typeof l == "string" && l) {
      const d = s.replace(/[A-Z]/g, u => `-${u.toLowerCase()}`);
      a.style.setProperty(d, l);
    }
  }), a.style.position = "absolute", a.style.visibility = "hidden", a.style.overflow = "hidden", a.style.whiteSpace = "pre-wrap", a.style.wordWrap = "break-word", a.style.width = `${e.offsetWidth}px`, a.textContent = e.value;
  const i = t.createElement("span");
  i.textContent = ".", a.appendChild(i), t.body.appendChild(a);
  const o = i.offsetTop;
  return t.body.removeChild(a), o;
}

function T5i(e, t, n) {
  const a = (e.ownerDocument.defaultView ?? window).getComputedStyle(e),
    i = e.getBoundingClientRect(),
    o = e.value;
  let s = 0;
  if (o) try {
    s = E5i(e);
  } catch {
    s = Number.POSITIVE_INFINITY;
  }
  return {
    clientX: t,
    clientY: n,
    left: i.left,
    top: i.top,
    right: i.right,
    bottom: i.bottom,
    value: o,
    resize: a.resize || "none",
    offsetWidth: e.offsetWidth,
    clientWidth: e.clientWidth,
    borderRight: parseFloat(a.borderRightWidth) || 0,
    borderTop: parseFloat(a.borderTopWidth) || 0,
    paddingTop: parseFloat(a.paddingTop) || 0,
    scrollTop: e.scrollTop,
    lastCharContentTop: s,
    lineHeight: C5i(e)
  };
}

function M5i(e, t, n) {
  return I5i(T5i(e, t, n));
}

function P5i(e, t, n, r) {
  if (t !== "custom-agent" || e == null || typeof Element > "u" || !(e instanceof Element)) return null;
  const a = e.closest(w5i);
  return a instanceof HTMLTextAreaElement && M5i(a, n, r) ? a : null;
}

const R5i = ({
    node: e,
    promptLibraryState: t,
    promptLibraryCollapsedState: n,
    promptLibraryFormState: r,
    isSelected: a,
    suppressSelectionChrome: i = !1,
    disableResizeHandles: o = !1,
    boxSelectLightShell: s = !1,
    boxSelectGroupDragging: l = !1,
    isNodeDragging: d,
    isConnected: u,
    isDark: h,
    enableMountFadeIn: p = !1,
    view: m,
    connectingSource: f,
    connectingTarget: y = null,
    isConnectDuplicateBlocked: b = !1,
    multiConnectingSourceIds: v = null,
    multiConnectingTargetIds: _ = null,
    renderQuality: w = "high",
    nodeDirtyVersion: k = 0,
    connectionSignature: A,
    framesConnectionSignature: S,
    groupId: C,
    isInGroup: I = !1,
    isPreviewCollapsed: E = !1,
    onEdgeUpdate: M,
    onNodeMouseDown: T,
    onNodeMouseUp: P,
    onDeleteNode: R,
    onStartResize: j,
    onStartConnectFromOutput: B,
    onStartConnectFromInput: F,
    onBeginConnectGesture: N,
    onConnectToInput: G,
    onConnectToOutput: z,
    setLightboxItem: V,
    setLightboxOpen: O,
    onMouseEnter: L,
    onMouseLeave: D,
    updateNode: U,
    onShowConnectionDial: H,
    onHideConnectionDial: Y,
    showConnectionDial: K,
    connectionDialDirection: W,
    connectionDialOptions: Q,
    disableNodeDrag: q = !1,
    cropSelectModeActive: ne = !1,
    markerModeActive: de = !1,
    globalCanvasDoodleBrushOrEraser: le = !1,
    doodleDrawingNodeId: J = null,
    onConnectionDialSelect: pe,
    isVisible: ce = !0,
    canvasStrictInView: we = !0,
    panPaintKeep: X = !0,
    isCanvasPanning: Z = !1,
    hasOpenDropdown: re = !1,
    hasOpenGenPromptPanel: fe = !1,
    isCompactUiMode: ye = !1,
    hideAllInputImagePreviews: ie = !1,
    showNodeDeleteButton: ae = !0,
    compactRefCanvasPickTargetId: be = null,
    compactRefCanvasPickEligible: Ee = !1,
    storyboardCanvasPickBoardId: xe = null,
    onCompactRefCanvasPickedNode: he,
    onCompactRefCanvasPickCancel: ue,
    onStoryboardCanvasPickPickedNode: ge,
    onStoryboardCanvasPickCancel: _e,
    focusEditTargetGenNodeId: ke = null,
    focusEditActiveSourceNodeId: ve = null,
    focusEditAnalyzingNodeId: Te = null,
    focusEditAnalyses: Ne = [],
    onFocusEditSelectSourceNode: me,
    onFocusEditPointPick: Ae,
    onFocusEditLevelChange: Fe,
    onFocusEditDismissAnalysis: Me,
    onFocusEditOpenTargetPrompt: Re,
    clipboardPromptReplaceTipNonce: $e = 0,
    isGenerationTimerActive: rt = !1,
    showCanvasGenerationTimer: nt = !0,
    enableGenerationNodeAnimation: ze = !0,
    enableConnectWireTilt: Le = !1,
    enableConnectWireMarquee: Ke = !0,
    children: Xe
  }) => {
    var Sr, Bn, Et, zn, Mn, or, mr, Yr, aa, wa, xa, Aa, pn, xr, Nr, qr, Oa, Fa, Ra, ui;
    on();
    const De = bhi(e.id),
      Ye = cur(e.id),
      Ce = Hjr(e.id);
    g.useEffect(() => {
      De && d_t(e.id, !0);
    }, [De, e.id]), g.useLayoutEffect(() => {
      Px(e.id) && uNa(e.id);
    }, [e.id]), g.useEffect(() => {
      d && lur(e.id);
    }, [d, e.id]);
    const He = e.type === "doodle-canvas" && J === e.id,
      Ve = g.useMemo(() => y9(m.zoom), [m.zoom]),
      it = uur(m.zoom),
      It = q || ne,
      Ft = (e.type === "input-image" || e.type === "gen-image") && (de || !!((Sr = e.settings) != null && Sr.markerModeActive)),
      We = It || Ft;
    (e == null ? void 0 : e.isGenerating) === !0 || (e == null ? void 0 : e.extractingFrames) === !0 || (e == null || e.isMasking);
    const Ze = g.useRef(null),
      Ge = g.useRef(!1),
      Oe = g.useCallback(pr => {
        if (pr && Ze.current) {
          const In = Cd().zoom;
          Ze.current.toggleAttribute("data-overview-connectors", In <= U5n), Ze.current.style.setProperty("--overview-connector-scale", String(EJe(In)));
        }
        Ge.current !== pr && (Ge.current = pr, hur(Ze.current, pr));
      }, []),
      st = g.useRef(p);
    p && (st.current = !0);
    const vt = g.useRef(!st.current);
    g.useEffect(() => {
      if (!st.current || vt.current) return;
      const pr = Ze.current;
      if (!pr) return;
      const In = () => {
        vt.current = !0, pr.classList.remove("node-mount-fade-in");
      };
      pr.addEventListener("animationend", In);
      const fr = window.setTimeout(In, 320);
      return () => {
        pr.removeEventListener("animationend", In), window.clearTimeout(fr);
      };
    }, [e.id]);
    const Ht = g.useCallback(pr => f3i({
      disableNodeDrag: q,
      cropSelectModeActive: ne,
      markerModeActive: de,
      root: pr
    }), [ne, q, de]);
    g.useEffect(() => {
      if (!ne && !de) return;
      const pr = requestAnimationFrame(() => {
        const In = Ze.current;
        ne && !(In != null && In.querySelector('[data-crop-select-mode="true"]')) && window.dispatchEvent(new CustomEvent("cropSelectModeChange", {
          detail: null
        })), de && !(In != null && In.querySelector('[data-marker-mode="true"]')) && window.dispatchEvent(new CustomEvent("markerModeChange", {
          detail: null
        }));
      });
      return () => cancelAnimationFrame(pr);
    }, [ne, de, e.id]);
    const nn = g.useRef(e);
    g.useEffect(() => {
      nn.current = e;
    }, [e]), g.useLayoutEffect(() => {
      Jpi(Ze.current);
    }, [a]);
    const [pt, lt] = g.useState(!1),
      [gt, Ut] = g.useState("both"),
      [_t, At] = g.useState("commit"),
      [Yt, qe] = g.useState(!1),
      [kt, St] = g.useState("left"),
      hn = g.useRef(null),
      Qt = g.useRef(!1),
      Ot = g.useRef(_t);
    Ot.current = _t, g.useEffect(() => {
      if (a) return;
      const pr = Ze.current;
      try {
        if (pr != null && pr.matches(":hover")) return;
      } catch {}
      Oe(!1);
    }, [a]), g.useEffect(() => {
      if (e.type !== "script-parse") return;
      const pr = Ze.current;
      if (!pr) return;
      const In = () => Oe(!1);
      return pr.addEventListener(CW, In), () => pr.removeEventListener(CW, In);
    }, [e.type]);
    const ln = g.useCallback(() => {
        Oe(!0);
      }, [Oe]),
      Pn = g.useCallback(pr => !pr || !(pr instanceof HTMLElement) ? !1 : !!pr.closest(".node-output-connector-hit, .node-input-connector-hit, .connector"), []),
      rn = g.useCallback(pr => !pr || !(pr instanceof HTMLElement) ? !1 : Pn(pr) ? !0 : !!pr.closest("[data-gen-prompt-panel], [data-gen-prompt-panel-host], [data-node-hover-chrome-body]"), [Pn]),
      Yn = g.useCallback(pr => {
        rn(pr.relatedTarget) || Oe(!1);
      }, [rn]),
      Ct = g.useCallback(pr => {
        rn(pr.relatedTarget) || Oe(!1);
      }, [rn]),
      Cn = (Bn = e.settings) == null ? void 0 : Bn.compactImageWidget,
      un = (e.type === "gen-image" || e.type === "gen-video") && Cn !== !1;
    g.useEffect(() => {
      if (!un) return;
      const pr = Ze.current;
      if (!pr) return;
      const In = () => Oe(!0),
        fr = na => {
          var ai;
          const Ba = (ai = na.detail) == null ? void 0 : ai.relatedTarget;
          Ba instanceof HTMLElement && Ba.closest(".node-output-connector-hit, .node-input-connector-hit, .connector, [data-gen-prompt-panel], [data-gen-prompt-panel-host], [data-node-hover-chrome-body]") || Oe(!1);
        };
      return pr.addEventListener(zUe, In), pr.addEventListener(CW, fr), () => {
        pr.removeEventListener(zUe, In), pr.removeEventListener(CW, fr), Oe(!1);
      };
    }, [un, e.id]);
    const Jn = g.useRef(0),
      Kn = g.useRef(null),
      en = g.useRef(null);
    g.useEffect(() => {
      const pr = In => {
        var na, Ba;
        String(((na = In.detail) == null ? void 0 : na.nodeId) || "").trim() === e.id && ((Ba = en.current) == null || Ba.startEditing());
      };
      return window.addEventListener("qiaodoumayi-edit-node-label", pr), () => window.removeEventListener("qiaodoumayi-edit-node-label", pr);
    }, [e.id]);
    const {
      startAudioWaveformDeferredNodeDrag: Vn,
      startTextNodeDragOverlayDeferredDrag: Tt,
      startAgentTextareaBlankDeferredDrag: Ue,
      startCompactGenPreviewDeferredNodeDrag: et,
      startFocusEditDeferredInteraction: ft,
      startInputLongPressDrag: ht
    } = M3i({
      nodeId: e.id,
      nodeType: e.type,
      onNodeMouseDown: T,
      onFocusEditOpenTargetPrompt: Re,
      onFocusEditSelectSourceNode: me,
      onFocusEditPointPick: Ae
    });
    g.useEffect(() => () => {
      try {
        const pr = nn.current;
        pr && Ie(async () => {
          const {
            releaseNodeTransientBlobUrls: In
          } = await Promise.resolve().then(() => yzt);
          return {
            releaseNodeTransientBlobUrls: In
          };
        }, void 0, import.meta.url).then(({
          releaseNodeTransientBlobUrls: In
        }) => {
          In(pr);
        }).catch(() => {});
      } catch {}
    }, []), g.useEffect(() => {
      const pr = In => {
        var vi, Vi, Ti;
        if (!Ke) return;
        const fr = In,
          na = (vi = fr == null ? void 0 : fr.detail) == null ? void 0 : vi.nodeId;
        if (!na || na !== e.id) return;
        const Ba = ((Vi = fr == null ? void 0 : fr.detail) == null ? void 0 : Vi.side) || "both",
          ai = ((Ti = fr == null ? void 0 : fr.detail) == null ? void 0 : Ti.mode) || "commit";
        if (Ut(Ba), At(ai), ai === "commit" && e.type === "custom-agent") {
          qe(!1), lt(!1);
          return;
        }
        if (ai === "hover") {
          lt(!0);
          return;
        }
        lt(!1), requestAnimationFrame(() => lt(!0)), Kn.current && window.clearTimeout(Kn.current), Kn.current = window.setTimeout(() => {
          lt(!1), Kn.current = null;
        }, 3400);
      };
      return window.addEventListener("nodeConnectionFlash", pr), () => {
        window.removeEventListener("nodeConnectionFlash", pr), Kn.current && window.clearTimeout(Kn.current), Kn.current = null;
      };
    }, [e.id, Ke]), g.useEffect(() => {
      Ke || (lt(!1), Kn.current && window.clearTimeout(Kn.current), Kn.current = null);
    }, [Ke]), g.useEffect(() => {
      const pr = In => {
        var na;
        const fr = In;
        ((na = fr.detail) == null ? void 0 : na.nodeId) === e.id && e.type !== "custom-agent" && (fr.detail.active ? (Qt.current = !0, qe(!0), fr.detail.side && St(fr.detail.side), Le && fr.detail.tiltX != null && fr.detail.tiltY != null && Z_t(e.id, fr.detail.tiltX, fr.detail.tiltY), Ke && (At("hover"), lt(!0), fr.detail.side && Ut(fr.detail.side))) : (Qt.current = !1, qe(!1), M1e(e.id), Ke && lt(!1)));
      };
      return window.addEventListener("nodeConnectHover", pr), () => window.removeEventListener("nodeConnectHover", pr);
    }, [e.id, Le, Ke]), g.useEffect(() => {
      Le || M1e(e.id);
    }, [Le, e.id]);
    const wt = !!f || !!y || ((v == null ? void 0 : v.length) ?? 0) > 0 || ((_ == null ? void 0 : _.length) ?? 0) > 0,
      jt = g.useCallback(() => {
        Qt.current = !1, qe(!1), M1e(e.id), Ke && Ot.current === "hover" && lt(!1);
      }, [Ke, e.id]);
    g.useEffect(() => {
      wt || jt();
    }, [wt, jt]), g.useEffect(() => {
      if (!wt) return;
      (f === e.id || y === e.id || ((v == null ? void 0 : v.includes(e.id)) ?? !1) || ((_ == null ? void 0 : _.includes(e.id)) ?? !1)) && jt();
    }, [wt, f, y, v, _, e.id, jt]);
    const bt = g.useCallback(() => f || ((v == null ? void 0 : v.length) ?? 0) > 0 ? f === e.id || v != null && v.includes(e.id) ? null : "left" : y || ((_ == null ? void 0 : _.length) ?? 0) > 0 ? y === e.id || _ != null && _.includes(e.id) ? null : "right" : null, [f, y, v, _, e.id]),
      Bt = g.useCallback((pr, In, fr) => {
        var Ba;
        const na = (Ba = Ze.current) == null ? void 0 : Ba.getBoundingClientRect();
        if (!(!na || na.width <= 0 || na.height <= 0)) {
          if (Le) {
            const ai = ((pr - na.left) / na.width - .5) * 2,
              vi = ((In - na.top) / na.height - .5) * 2,
              {
                tiltX: Vi,
                tiltY: Ti
              } = Pcr(ai, vi);
            Z_t(e.id, Vi, Ti);
          }
          Qt.current || (Qt.current = !0, qe(!0), St(fr), Ke && (At("hover"), lt(!0), Ut(fr))), Ke && Ncr(e.id, "hover", fr);
        }
      }, [e.id, Le, Ke]),
      wn = g.useCallback(pr => {
        if (L && L(), wt || e.type === "custom-agent") return;
        const In = bt();
        In && Bt(pr.clientX, pr.clientY, In);
      }, [L, wt, bt, Bt]),
      at = g.useCallback(pr => {
        !wt || e.type;
      }, [wt]),
      Pt = g.useCallback(() => {
        var pr;
        D && D(), Qt.current || lt(!1), Oe(!1), e.type === "input-image" && ((pr = e.settings) != null && pr._expandSuppressPlus) && U && U(e.id, {
          settings: {
            ...(e.settings || {}),
            _expandSuppressPlus: void 0
          }
        });
      }, [D, wt, jt, e.type, e.id, e.settings, U]);
    g.useEffect(() => {
      const pr = Ze.current;
      if (!pr) return;
      xDr(e.id, pr, m.zoom);
      const In = JE(e.id);
      return R1(e.id, (In == null ? void 0 : In.x) ?? e.x, (In == null ? void 0 : In.y) ?? e.y), e.width > 0 && e.height > 0 && mWe(e.id, e.width, e.height), w !== "low" && W3i(pr, e.id, M), () => {
        _Dr(e.id), q3i(pr);
      };
    }, [e.id, e.x, e.y, e.width, e.height, w, M]);
    const dt = (pr, In) => {
        const fr = typeof pr == "number" ? pr : Number(pr);
        return Number.isFinite(fr) && fr > 0 ? fr : In;
      },
      xt = iFt(e.id),
      yn = dt((xt == null ? void 0 : xt.width) ?? ((Et = e.settings) != null && Et.hasCustomSize && e.settings.savedNodeWidth != null ? e.settings.savedNodeWidth : e.width), 200),
      gn = dt((xt == null ? void 0 : xt.height) ?? ((zn = e.settings) != null && zn.hasCustomSize && e.settings.savedNodeHeight != null ? e.settings.savedNodeHeight : e.height), 120),
      mt = rt || e.isGenerating === !0 || ((Mn = e.settings) == null ? void 0 : Mn.isGenerating) === !0,
      Xt = our({
        setHover: Oe,
        begin: N,
        hideDial: Y,
        startInput: F,
        startOutput: B
      }),
      {
        elementRef: Gn,
        onMouseEnter: rr,
        onMouseMove: qn,
        onMouseLeave: Dn
      } = Ikt(m.zoom, Ct, Yke.right),
      {
        elementRef: Ar,
        onMouseEnter: _r,
        onMouseMove: Pa,
        onMouseLeave: fa
      } = Ikt(m.zoom, Ct, Yke.left),
      Ca = e.type === "custom-agent",
      $n = Ca && !!((or = e.settings) != null && or.isCollapsed),
      yr = Ca && !$n,
      Ir = d ? 50 : De ? a && !i ? 106 : 105 : Ca ? yr ? a && !i ? 22 : 18 : 11 : a && !i && (e.type === "gen-image" || e.type === "gen-video" || e.type === "input-image" || e.type === "text-node") ? 30 : a && !i ? 15 : 10,
      Gr = (mr = e.settings) == null ? void 0 : mr.compactImageWidget,
      Zr = (e.type === "gen-image" || e.type === "gen-video") && Gr !== !1,
      La = mt || Px(e.id),
      [sa, Ea] = g.useState(0),
      ba = g.useCallback(() => {
        Ea(pr => pr + 1);
      }, []),
      ga = !!ke && ke === e.id && (e.type === "gen-image" || e.type === "gen-video"),
      _a = e.type === "input-image" && !!((Yr = e.settings) != null && Yr.inputImagePreviewHidden),
      $a = e.type === "input-image" && (ie || _a),
      Ya = PRt(e),
      ta = zzn(e),
      ki = Uzn(e),
      Wn = Ya || ta || ki,
      wr = !!((aa = e.settings) != null && aa._expandSourceHidden),
      jn = w === "low" && !we && (e.type === "preview" || e.type === "gen-image" || e.type === "gen-video" || e.type === "video-input" || e.type === "topaz-upscale" || e.type === "jimeng-super-resolution" || e.type === "image-wash" || e.type === "fal-rembg" || e.type === "layer-decomposition" || e.type === "motion-control" || e.type === "virtual-try-on" || e.type === "video-relight"),
      _n = (e.type === "input-image" || e.type === "preview" || e.type === "gen-image" || e.type === "gen-video" || e.type === "video-input" || e.type === "topaz-upscale" || e.type === "jimeng-super-resolution" || e.type === "image-wash" || e.type === "fal-rembg" || e.type === "layer-decomposition" || e.type === "motion-control" || e.type === "virtual-try-on" || e.type === "video-relight") && (!!e.content || !!((wa = e.settings) != null && wa.generatedImageUrl) || e.type === "gen-video" && !!(e.videoPosterUrl || (xa = e.settings) != null && xa.videoPosterUrl)),
      ar = Lhi({
        hasStableMediaContent: _n,
        inView: we || La,
        shellCandidate: jn || e.type === "input-image" || e.type === "preview" || e.type === "gen-image" || e.type === "gen-video" || e.type === "video-input" || e.type === "topaz-upscale" || e.type === "jimeng-super-resolution" || e.type === "image-wash" || e.type === "fal-rembg" || e.type === "layer-decomposition" || e.type === "motion-control" || e.type === "virtual-try-on" || e.type === "video-relight"
      }),
      Vt = (e.type === "input-image" && !Ya && !$a && !wr || (e.type === "gen-image" || e.type === "gen-video") && Zr) && !ar,
      vn = Vt && TM(w, e, a ? e.id : null, s, ve, {
        genPromptPanelOpen: De
      }),
      An = !!((Aa = e.settings) != null && Aa.editImageToolActive || (pn = e.settings) != null && pn.eraserToolActive || (xr = e.settings) != null && xr.textEditToolActive || wr || ve === e.id),
      ur = Vt && (e.type === "gen-image" || e.type === "gen-video") && !a ? OJr(e.settings, {
        width: e.width,
        height: e.height
      }) : [],
      zr = ur.length,
      Wr = e.type === "input-image" && K2(e) !== "video" && K2(e) !== "audio" && !vn && !We,
      gr = (Vt || Zr) && La,
      jr = e.settings || {},
      ea = jr.error,
      pa = jr.errorMsg,
      Br = !!String(e.errorMsg || "").trim() || typeof ea == "string" && ea.trim().length > 0 || ea != null && ea !== "" && ea !== !1 && typeof ea != "string" || typeof pa == "string" && pa.trim().length > 0,
      tn = S6r(gr, sa, {
        instantIn: !0,
        nodeId: e.id,
        releaseImmediately: A6r({
          running: gr,
          runtimeStatus: al.getNodeSnapshot(e.id).status,
          hasNodeError: Br
        })
      }),
      Lr = tn.mounted,
      br = !ei() && (jn || ar) && _n,
      Jr = X3i(e.id),
      Kr = (e.type === "input-image" || e.type === "topaz-upscale" || e.type === "jimeng-super-resolution" || e.type === "image-wash" || e.type === "fal-rembg" || e.type === "layer-decomposition" || e.type === "motion-control" || e.type === "virtual-try-on" || e.type === "video-relight") && TM(w, e, a ? e.id : null, s, ve, {
        genPromptPanelOpen: De
      }),
      ir = !Jr && (!br || e.type === "gen-3d" && a),
      Hr = e.type === "input-image" && (() => {
        const pr = e.settings || {};
        return pr._expandResultNode === !0 || pr._eraseResultNode === !0 || !!pr.expandModelId || !!pr.expandModelName || !!e._expandPending || String(e.nodeName || "").includes("智能扩图") || String(e.nodeName || "").includes("智能擦除");
      })(),
      ha = e.type === "input-image" && (!!e.content || Hr) && !Ya && m.zoom > .25 && !$a && !jn && !ar,
      Ga = e.type === "input-image" && !!((Nr = e.settings) != null && Nr.suppressHoverUi),
      Za = e.type === "input-image" && !!((qr = e.settings) != null && qr._expandSuppressPlus),
      va = Ga || Za;
    g.useEffect(() => {
      if (va) {
        Oe(!1);
        return;
      }
      const pr = Ze.current;
      if (!pr) return;
      const In = window.requestAnimationFrame(() => {
        try {
          pr.matches(":hover") && Oe(!0);
        } catch {}
      });
      return () => window.cancelAnimationFrame(In);
    }, [va]);
    const Kt = Lvi(e.id),
      Pr = re || Kt,
      kr = Pr || va || Z,
      Mr = JSi(e.type),
      Hn = (e.type === "gen-image" || e.type === "gen-video" || e.type === "input-image" || !Zr) && !BUe(e.type),
      $t = !!(C && !I),
      je = i || I || $t,
      Qe = a,
      Mt = Qe && m.zoom > .25 && !jn && (ha || Zr && _n || e.type === "preview"),
      cn = !ye && !je && !rur(e.type),
      Qn = !!f || ((v == null ? void 0 : v.length) ?? 0) > 0,
      Lt = !!y || ((_ == null ? void 0 : _.length) ?? 0) > 0,
      ct = f === e.id || ((v == null ? void 0 : v.includes(e.id)) ?? !1),
      Dt = y === e.id || ((_ == null ? void 0 : _.includes(e.id)) ?? !1),
      bn = Yt && (Qn || Lt) && !ct && !Dt,
      Rt = bn,
      fn = bn,
      Zt = ct,
      Ln = Dt,
      tt = d,
      zt = Zt || tt,
      an = Ln || tt,
      Rn = zt || kr ? "none" : "auto",
      Un = an || kr ? "none" : "auto",
      er = _He(e),
      Cr = Le && Yt && e.type !== "custom-agent",
      tr = !!be,
      kn = be === e.id,
      xn = tr && !kn && Ee,
      Fn = tr ? kn ? "target" : xn ? "candidate" : "blocked" : void 0,
      cr = uf(e.nodeName) || eur[e.type] || (e.type === "gen-speech" ? "Audio" : "节点"),
      vr = !De && (d || yr || a && !(ha || Zr)) && !Cr,
      Jt = (Axi(e.id) ? kxi(e.id) : null) ?? JE(e.id),
      Nn = (Jt == null ? void 0 : Jt.x) ?? e.x,
      En = (Jt == null ? void 0 : Jt.y) ?? e.y,
      Zn = !wr && !d && Ye ? B3i : void 0;
    return c.jsx("div", {
      ref: Ze,
      "data-node-id": e.id,
      "data-node-type": e.type,
      "data-canvas-generating-media": mt ? "true" : void 0,
      "data-canvas-strict-in-view": we ? "true" : "false",
      "data-canvas-pan-paint": X ? "keep" : "skip",
      "data-oss-dom-display": er ? "true" : void 0,
      "data-render-quality": w,
      "data-preview-collapsed": E ? "true" : void 0,
      "data-pile-member-anchor": $t ? "true" : void 0,
      "data-box-select-stack-anim-hidden": Ce ? "true" : void 0,
      "aria-hidden": $t || Ce ? !0 : void 0,
      "data-has-image": ha || Zr && _n ? "true" : void 0,
      "data-highlighted": (e.type === "input-image" || e.type === "gen-image" || e.type === "gen-video") && ((Oa = e.settings) != null && Oa.highlighted) ? "true" : void 0,
      "data-color-pins": Zg(e).join(" ") || void 0,
      "data-node-selected": a ? "true" : void 0,
      "data-node-dial-open": K ? "true" : void 0,
      "data-canvas-persistent-media": Vt && a && !An ? "true" : void 0,
      "data-upload-shell-cover": Wr ? "true" : void 0,
      "data-canvas-tool-media": An ? "true" : void 0,
      "data-gen-prompt-panel-open": De ? "true" : void 0,
      "data-reference-pick-role": Fn,
      className: `absolute rounded-2xl group flex flex-col node-wrapper node-move-cursor render-quality-${w} ${st.current && !vt.current ? "node-mount-fade-in" : ""} ${jn ? "media-viewport-shell media-offscreen" : ""} ${Pr || va ? "node-wrapper-has-open-dropdown" : ""} ${Cr ? "node-connect-wire-hover" : ""} ${b ? "node-connect-duplicate-blocked" : ""} ${Ke && pt && _t === "commit" ? "node-connect-edge-glow" : ""} ${E ? "group-preview-collapsed" : ""} ${$t ? "pile-member-anchor" : ""} ${Ce ? "box-select-stack-anim-hidden" : ""} ${Qe ? `${Mt ? "!border-0" : "border"} node-selected-border` : e.type === "input-image" && e.content && m.zoom <= .25 || jn ? h ? "border border-[rgba(255,255,255,0.06)]" : "border border-[rgba(0,0,0,0.18)]" : (ha || Zr && _n || e.type === "preview") && m.zoom > .25 ? "!border-0" : h ? "border border-[rgba(255,255,255,0.06)]" : "border border-[rgba(0,0,0,0.18)]"} ${jn ? h ? "bg-[#1f1f1f]" : "bg-white" : (ha || Zr) && m.zoom > .25 ? "!bg-transparent" : h ? "bg-[#1f1f1f]" : "bg-white"} ${d ? "node-move-cursor-dragging node-dragging-self" : ""} ${Qpi(e.id) ? "node-selection-hidden" : ""}`,
      "data-connect-glow-side": Ke && pt ? gt : void 0,
      style: {
        transform: Ye ? "translate(0px, 0px)" : vr ? `translate3d(${Nn}px, ${En}px, 0)` : `translate(${Nn}px, ${En}px)`,
        left: Ye ? Nn : void 0,
        top: Ye ? En : void 0,
        perspective: Cr ? `${a1i()}px` : void 0,
        ...(Cr ? {
          transformStyle: "preserve-3d"
        } : {}),
        width: yn,
        height: gn,
        zIndex: Ir,
        overflow: "visible",
        boxShadow: Qe && (e.type === "input-image" || e.type === "gen-image" || e.type === "gen-video") || h ? void 0 : "none",
        ...(ha ? {
          border: "none"
        } : {}),
        willChange: d ? "transform" : void 0,
        contain: "layout style",
        ...(wr ? {
          opacity: 0,
          transition: "none",
          pointerEvents: "none"
        } : {
          opacity: 1,
          pointerEvents: "auto",
          ...(Zn ? {
            transition: Zn
          } : {})
        })
      },
      onMouseEnter: wn,
      onMouseMove: at,
      onMouseLeave: Pt,
      onMouseUp: P,
      onPointerDown: pr => {
        const In = pr.target;
        if (!g3i(pr.pointerType, pr.button, In)) return;
        pr.preventDefault(), Xcr(), Jn.current = performance.now(), (In.closest(m3i) ?? pr.currentTarget).dispatchEvent(new MouseEvent("mousedown", {
          bubbles: !0,
          cancelable: !0,
          view: window,
          button: 0,
          buttons: 1,
          clientX: pr.clientX,
          clientY: pr.clientY,
          ctrlKey: pr.ctrlKey,
          metaKey: pr.metaKey,
          altKey: pr.altKey,
          shiftKey: pr.shiftKey
        }));
      },
      onMouseDownCapture: pr => {
        const In = pr.target,
          fr = b3i({
            button: pr.button,
            nodeDragBlocked: Ht(pr.currentTarget),
            target: In,
            nodeType: e.type,
            shiftKey: pr.shiftKey,
            agentBlankTextarea: P5i(In, e.type, pr.clientX, pr.clientY)
          });
        if (fr.type === "agent-blank") {
          pr.preventDefault(), pr.stopPropagation(), Ue(pr, pr.currentTarget, fr.textarea);
          return;
        }
        fr.type === "long-press" && ht(pr, pr.currentTarget);
      },
      onMouseDown: pr => {
        const In = pr.target,
          fr = Ht(pr.currentTarget),
          na = v3i({
            isTrusted: pr.nativeEvent.isTrusted,
            echoElapsedMs: performance.now() - Jn.current,
            button: pr.button,
            ctrlKey: pr.ctrlKey,
            metaKey: pr.metaKey,
            target: In,
            nodeId: e.id,
            nodeType: e.type,
            nodeDragBlocked: fr,
            focusEditTargetGenNodeId: ke,
            isFocusEditTargetGenNode: ga,
            isCompactImageWidget: Zr,
            focusEditActiveSourceNodeId: ve,
            isValidFocusEditSource: !!(ke && $lr(e, ke)),
            storyboardCanvasPickBoardId: xe,
            compactRefCanvasPickTargetId: be,
            compactRefCanvasPickEligible: Ee,
            isAudioStripNode: Wn,
            isGenSpeechAudioStrip: ta,
            isGenMusicAudioStrip: ki,
            globalCanvasDoodleBrushOrEraser: le
          });
        if (!(na.type === "echo" || na.type === "pass")) {
          if (na.type === "stop") {
            pr.stopPropagation();
            return;
          }
          if (na.type === "focus-edit-open-prompt") {
            pr.stopPropagation(), Re == null || Re(e.id);
            return;
          }
          if (na.type === "focus-edit-deferred") {
            pr.stopPropagation(), ft(pr, pr.currentTarget, na.mode, na.wasNewSource);
            return;
          }
          if (na.type === "storyboard-pick") {
            pr.stopPropagation(), pr.preventDefault(), na.action === "cancel" ? _e == null || _e() : ge == null || ge(e.id);
            return;
          }
          if (na.type === "reference-pick") {
            u3i({
              start: {
                x: pr.clientX,
                y: pr.clientY
              },
              slopPx: a3i,
              onClick: () => {
                na.shouldCancel ? ue == null || ue() : he == null || he(e.id);
              }
            }), pr.preventDefault();
            return;
          }
          if (na.type === "deferred-audio-wave") {
            pr.stopPropagation(), Vn(pr, pr.currentTarget);
            return;
          }
          if (na.type === "deferred-text-overlay") {
            pr.stopPropagation(), Tt(pr, pr.currentTarget);
            return;
          }
          if (na.type === "deferred-compact-preview") {
            pr.stopPropagation(), et(pr, pr.currentTarget);
            return;
          }
          T(pr);
        }
      },
      onDoubleClick: pr => {
        var Ba;
        const In = pr.target;
        if (kcr(In)) {
          pr.preventDefault(), pr.stopPropagation(), (Ba = en.current) == null || Ba.startEditing();
          return;
        }
        if (hvi(In) || TUe(In)) {
          pr.preventDefault(), pr.stopPropagation();
          return;
        }
        if (pvi(In)) {
          pr.preventDefault(), pr.stopPropagation();
          return;
        }
        if (e.type === "preview" || e.type === "input-image" && w === "high" || Zr && pr.nativeEvent.__handledByNode) return;
        if (Zr && (e.isGenerating || e.errorMsg)) {
          pr.stopPropagation(), pr.preventDefault();
          return;
        }
        if (Zr && !e.content && !Zo(e)) {
          const ai = e.settings || {};
          if (!(typeof ai._ossRemoteUrl == "string" && /^https?:\/\//i.test(String(ai._ossRemoteUrl).trim()))) {
            pr.stopPropagation(), pr.preventDefault();
            return;
          }
        }
        const fr = e.type === "input-image" || e.type === "gen-image" || e.type === "gen-video" || e.type === "rh-app" || e.type === "rh-comfy" || e.type === "jimeng-super-resolution" || e.type === "topaz-upscale" || e.type === "image-wash" || e.type === "fal-rembg" || e.type === "virtual-try-on" || e.type === "video-relight" || e.type === "layer-decomposition",
          na = e.type === "video-input";
        if ((fr || na) && e.content && V) {
          pr.stopPropagation();
          const ai = ji => {
              var Ts;
              if (!ji) return !1;
              if (ji.startsWith("data:video") || ji.includes("force_video_display=true")) return !0;
              const ts = (Ts = ji.split(".").pop()) == null ? void 0 : Ts.split("?")[0].toLowerCase();
              return ["mp4", "webm", "ogg", "mov"].includes(ts || "");
            },
            vi = ji => {
              var Ts;
              if (!ji) return !1;
              if (ji.startsWith("data:audio")) return !0;
              const ts = (Ts = ji.split(".").pop()) == null ? void 0 : Ts.split("?")[0].toLowerCase();
              return ["mp3", "wav", "ogg", "m4a", "aac", "flac"].includes(ts || "");
            },
            Vi = e.type === "input-image" ? K2(e) ?? (ai(e.content) ? "video" : vi(e.content) ? "audio" : "image") : ai(e.content) ? "video" : vi(e.content) ? "audio" : "image",
            Ti = e.settings || {},
            Gi = Ti,
            hi = Object.prototype.hasOwnProperty.call(Gi, "_contentAssetId") ? typeof Gi._contentAssetId == "string" && Gi._contentAssetId ? Gi._contentAssetId : void 0 : e._contentAssetId,
            vo = Object.prototype.hasOwnProperty.call(Gi, "_previewMjAssetIds") ? Array.isArray(Gi._previewMjAssetIds) ? Gi._previewMjAssetIds : void 0 : e._previewMjAssetIds,
            ci = Ti.mjImages || Ti.previewMjImages || Ti.batchImages;
          (async () => {
            var sr, da, la, Ta, Wa, pi, wi, to, Ho;
            if (Vi === "image" && Vhe(e.id), (e.type === "gen-image" || e.type === "gen-video") && Vi === "image") try {
              const {
                  resolveCompactGenMainDisplayOriginalUrl: jo,
                  buildCompactGenNodeLightboxPayload: Ls,
                  pickCompactOssOriginalUrl: _s,
                  pickCompactOssVideoPlaybackUrl: Pl
                } = await Ie(async () => {
                  const {
                    resolveCompactGenMainDisplayOriginalUrl: Yo,
                    buildCompactGenNodeLightboxPayload: Vc,
                    pickCompactOssOriginalUrl: zd,
                    pickCompactOssVideoPlaybackUrl: Xh
                  } = await Promise.resolve().then(() => SOn);
                  return {
                    resolveCompactGenMainDisplayOriginalUrl: Yo,
                    buildCompactGenNodeLightboxPayload: Vc,
                    pickCompactOssOriginalUrl: zd,
                    pickCompactOssVideoPlaybackUrl: Xh
                  };
                }, void 0, import.meta.url),
                {
                  getCanvasGenNodeThumbSyncUrl: xl
                } = await Ie(async () => {
                  const {
                    getCanvasGenNodeThumbSyncUrl: Yo
                  } = await Promise.resolve().then(() => FIt);
                  return {
                    getCanvasGenNodeThumbSyncUrl: Yo
                  };
                }, void 0, import.meta.url),
                {
                  getGenNodeOssVideoPlaybackUrl: Bi,
                  isLikelyImageDisplayUrl: Do
                } = await Ie(async () => {
                  const {
                    getGenNodeOssVideoPlaybackUrl: Yo,
                    isLikelyImageDisplayUrl: Vc
                  } = await Promise.resolve().then(() => ii);
                  return {
                    getGenNodeOssVideoPlaybackUrl: Yo,
                    isLikelyImageDisplayUrl: Vc
                  };
                }, void 0, import.meta.url),
                co = xl(e) || (typeof e.content == "string" ? e.content.trim() : "") || "",
                ls = jo(e, co);
              if (e.type === "gen-video") {
                const Yo = Pl(Bi(e), (sr = ls.entry) == null ? void 0 : sr.ossRemoteUrl, (da = ls.entry) == null ? void 0 : da.originalUrl, typeof ((la = e.settings) == null ? void 0 : la._ossRemoteUrl) == "string" ? String(e.settings._ossRemoteUrl).trim() : "") || "";
                if (Yo && !/\/thumbnails\//i.test(Yo)) {
                  const Vc = (co && Do(co) ? co : "") || void 0;
                  V({
                    id: `${e.id}_lightbox`,
                    url: Yo,
                    type: "video",
                    originalUrl: Yo,
                    prompt: (e.prompt || "").trim(),
                    modelName: String(((Ta = e.settings) == null ? void 0 : Ta.modelName) || ((Wa = e.settings) == null ? void 0 : Wa.modelId) || ""),
                    time: "",
                    status: "completed",
                    progress: 100,
                    _ossRemoteUrl: Yo,
                    _globalOssUrlOnly: !0,
                    ossUploaded: !0,
                    preferDisplayUrls: !0,
                    ...(Vc ? {
                      videoPosterUrl: Vc
                    } : {})
                  }), O && O(!0);
                  return;
                }
              }
              const Ms = (ls.originalUrl && !/\/thumbnails\//i.test(ls.originalUrl) ? ls.originalUrl : "") || _s((pi = ls.entry) == null ? void 0 : pi.ossRemoteUrl, (wi = ls.entry) == null ? void 0 : wi.originalUrl, co);
              if (Ms && !/\/thumbnails\//i.test(Ms) && e.type !== "gen-video") {
                V({
                  id: `${e.id}_lightbox`,
                  url: Ms,
                  type: "image",
                  originalUrl: Ms,
                  prompt: (e.prompt || "").trim(),
                  modelName: String(((to = e.settings) == null ? void 0 : to.modelName) || ((Ho = e.settings) == null ? void 0 : Ho.modelId) || ""),
                  time: "",
                  status: "completed",
                  progress: 100,
                  _ossRemoteUrl: Ms,
                  _globalOssUrlOnly: !0,
                  ossUploaded: !0,
                  preferDisplayUrls: !0
                }), O && O(!0);
                return;
              }
              const ks = await Ls(e, {
                displayFallbackUrl: co || void 0,
                isVideoNode: e.type === "gen-video"
              });
              if (String(ks.url || "").trim() || String(ks.originalUrl || "").trim()) {
                V(ks), O && O(!0);
                return;
              }
            } catch (jo) {
              console.warn("[CanvasNodeWrapper] 紧凑绘画灯箱主图配对失败，回退通用路径:", jo);
            }
            if (e.type === "input-image" && Vi === "image") try {
              const {
                  buildInputImageLightboxPayload: jo
                } = await Ie(async () => {
                  const {
                    buildInputImageLightboxPayload: _s
                  } = await Promise.resolve().then(() => Adr);
                  return {
                    buildInputImageLightboxPayload: _s
                  };
                }, void 0, import.meta.url),
                Ls = await jo(e, {
                  displayHintUrl: typeof e.content == "string" ? e.content : void 0
                });
              if (Ls != null && Ls.url) {
                V({
                  ...Ls,
                  id: e.id,
                  type: "image"
                }), O && O(!0);
                return;
              }
            } catch (jo) {
              console.warn("[CanvasNodeWrapper] input-image 灯箱解析失败，回退 blob:", jo);
            }
            let ji = e.type === "input-image" && Vi === "video" && Ble(e) || e.content,
              ts = ci && ci.length > 1 ? ci : void 0;
            const Ts = Gi._compactOriginalRelPath;
            let dc = !1;
            if (Vi === "image") {
              const {
                  getFullBlobUrlForDisplayUrl: jo
                } = await Ie(async () => {
                  const {
                    getFullBlobUrlForDisplayUrl: _s
                  } = await Promise.resolve().then(() => No);
                  return {
                    getFullBlobUrlForDisplayUrl: _s
                  };
                }, void 0, import.meta.url),
                Ls = !!(ci && ci.length > 1);
              if (!Ls && ji.startsWith("blob:")) {
                const _s = await jo(ji, hi ?? null, Ts ?? null);
                _s && (ji = _s, dc = !0);
              } else if (Ls && ci && vo) {
                const _s = [];
                for (let xl = 0; xl < ci.length; xl++) {
                  const Bi = ci[xl];
                  if (Bi != null && Bi.startsWith("blob:")) {
                    const Do = await jo(Bi, vo[xl] ?? null, Ts ?? null);
                    _s.push(Do || Bi);
                  } else _s.push(Bi || "");
                }
                const Pl = _s.filter(Boolean);
                Pl.length > 0 && (ji = Pl[0], ts = Pl.length > 1 ? Pl : ts, dc = !0);
              }
              if (!dc && (hi || vo && vo.length > 0)) {
                const _s = vo && vo.length > 0 ? vo : hi ? [hi] : [];
                if (_s.length > 0) try {
                  const {
                      localCacheManager: Pl
                    } = await Ie(async () => {
                      const {
                        localCacheManager: co
                      } = await Promise.resolve().then(() => Ha);
                      return {
                        localCacheManager: co
                      };
                    }, void 0, import.meta.url),
                    {
                      assetStore: xl
                    } = await Ie(async () => {
                      const {
                        assetStore: co
                      } = await Promise.resolve().then(() => Ri);
                      return {
                        assetStore: co
                      };
                    }, void 0, import.meta.url),
                    Bi = [];
                  for (let co = 0; co < _s.length; co++) {
                    const ls = _s[co];
                    if (!ls) {
                      Bi.push((ci == null ? void 0 : ci[co]) || "");
                      continue;
                    }
                    let Ms = null;
                    if (Pl.isAvailable() && Pl.hasAsset(ls) && (Ms = await Pl.readAssetAsUrl(ls)), !Ms) {
                      const ks = await xl.getAssetBlob(ls);
                      ks && (Ms = URL.createObjectURL(ks));
                    }
                    Bi.push(Ms || "");
                  }
                  const Do = Bi.filter(Boolean);
                  Do.length > 0 && (ji = Do[0], Do.length > 1 && (ts = Do));
                } catch {}
              }
              if (!dc && ji.startsWith("blob:")) {
                const _s = await jo(ji, null, Ts ?? null);
                _s && (ji = _s);
              }
            }
            const Tl = (typeof Gi._localCacheAssetId == "string" ? Gi._localCacheAssetId : "") || hi || (typeof Gi._contentAssetId == "string" ? Gi._contentAssetId : "") || (typeof Gi._assetId == "string" ? Gi._assetId : "") || e._contentAssetId || "";
            if (Vi === "image" && Tl) try {
              const {
                  readLocalOriginalAssetAsUrl: jo
                } = await Ie(async () => {
                  const {
                    readLocalOriginalAssetAsUrl: Pl
                  } = await Promise.resolve().then(() => Ui);
                  return {
                    readLocalOriginalAssetAsUrl: Pl
                  };
                }, void 0, import.meta.url),
                Ls = typeof Gi._localOriginalUrlHint == "string" ? Gi._localOriginalUrlHint : void 0,
                _s = await jo(Tl, Ls);
              _s && (ji = _s);
            } catch (jo) {
              console.warn("[CanvasNodeWrapper] 本地原图灯箱读取失败:", jo);
            }
            const Ml = {
              id: e.id,
              url: ji,
              originalUrl: ji,
              type: Vi,
              mjImages: ts,
              _assetId: Tl || void 0,
              preferDisplayUrls: !1
            };
            V(Ml), O && O(!0);
          })();
          return;
        }
        Zr || pr.stopPropagation();
      },
      children: c.jsxs("div", {
        ref: hn,
        "data-connect-tilt-host": "",
        "data-connect-tilt-enabled": Le ? "true" : "false",
        className: `node-connect-tilt-host relative flex min-h-0 w-full flex-1 flex-col${Cr ? " node-connect-tilt-host--active" : ""}`,
        style: Cr ? {
          transformStyle: "preserve-3d"
        } : void 0,
        children: [Qe && c.jsx("div", {
          className: "node-reflective-border",
          "aria-hidden": "true"
        }), ae && c.jsx("div", {
          "data-node-hover-chrome-body": !0,
          "data-node-delete-chrome": !0,
          onMouseEnter: ln,
          onMouseLeave: Yn,
          className: `absolute z-[20] transition-opacity duration-200 ease-out${it ? " node-float-chrome" : ""}`,
          style: {
            top: it ? "calc(-10px - var(--float-offset, 12px))" : "-10px",
            right: "-10px",
            opacity: it ? void 0 : Ve,
            transformOrigin: "top right"
          },
          children: c.jsx("button", {
            type: "button",
            "data-node-delete-button": !0,
            onClick: pr => {
              pr.stopPropagation(), R();
            },
            className: `p-1 rounded-full shadow border opacity-0 scale-90 hover:scale-100 cursor-pointer ${h ? "bg-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-zinc-700 border-zinc-700" : "bg-zinc-100 text-zinc-500 hover:text-red-500 hover:bg-zinc-200 border-zinc-300"}`,
            style: {
              visibility: Z ? "hidden" : "visible"
            },
            onMouseDown: pr => pr.stopPropagation(),
            children: c.jsx(Na, {
              size: 12
            })
          })
        }), c.jsxs($Si, {
          node: e,
          isDark: h,
          isGenerationTimerActive: rt,
          showCanvasGenerationTimer: nt,
          clipboardPromptReplaceTipNonce: $e,
          zoomBandUiOpacity: Ve,
          useFloatScaleChrome: it,
          children: [c.jsx(KSi, {
            ref: en,
            node: e,
            visible: ir,
            isDark: h,
            width: yn,
            isPaintToolMode: We,
            useFloatScaleChrome: it,
            updateNode: U,
            hideAllInputImagePreviews: ie,
            inputImageLocalPreviewHidden: _a,
            hideMediaResolutionLabelOnLightThumb: Kr,
            handleNodeHoverChromeEnter: ln,
            handleNodeHoverChromeBodyLeave: Yn
          }), !((Fa = e.settings) != null && Fa.isCollapsed) && e.type !== "video-timeline" && !Wn && !o && !i && (a || d) && c.jsxs(c.Fragment, {
            children: [c.jsx("div", {
              className: "absolute z-[110] resize-handle resize-handle-corner resize-handle-corner-rb resize-handle-corner-grip resize-handle-corner-grip--se",
              style: {
                pointerEvents: We ? "none" : void 0
              },
              onMouseDown: pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "right",
                  vertical: "bottom"
                });
              },
              children: c.jsx("svg", {
                className: "node-resize-corner-arc",
                viewBox: "0 0 20 20",
                "aria-hidden": "true",
                focusable: "false",
                children: c.jsx("path", {
                  d: "M1.5 17.5 A 16 16 0 0 0 17.5 1.5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.35",
                  strokeLinecap: "round"
                })
              })
            }), c.jsx("div", {
              className: "absolute z-[110] resize-handle resize-handle-corner resize-handle-corner-grip resize-handle-corner-grip--sw",
              style: {
                pointerEvents: We ? "none" : void 0
              },
              onMouseDown: pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "left",
                  vertical: "bottom"
                });
              },
              children: c.jsx("svg", {
                className: "node-resize-corner-arc",
                viewBox: "0 0 20 20",
                "aria-hidden": "true",
                focusable: "false",
                children: c.jsx("path", {
                  d: "M1.5 17.5 A 16 16 0 0 0 17.5 1.5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.35",
                  strokeLinecap: "round"
                })
              })
            }), c.jsx("div", {
              className: "absolute z-[110] resize-handle resize-handle-corner resize-handle-corner-grip resize-handle-corner-grip--ne",
              style: {
                pointerEvents: We ? "none" : void 0
              },
              onMouseDown: pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "right",
                  vertical: "top"
                });
              },
              children: c.jsx("svg", {
                className: "node-resize-corner-arc",
                viewBox: "0 0 20 20",
                "aria-hidden": "true",
                focusable: "false",
                children: c.jsx("path", {
                  d: "M1.5 17.5 A 16 16 0 0 0 17.5 1.5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.35",
                  strokeLinecap: "round"
                })
              })
            }), c.jsx("div", {
              className: "absolute z-[110] resize-handle resize-handle-corner resize-handle-corner-rb resize-handle-corner-grip resize-handle-corner-grip--nw",
              style: {
                pointerEvents: We ? "none" : void 0
              },
              onMouseDown: pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "left",
                  vertical: "top"
                });
              },
              children: c.jsx("svg", {
                className: "node-resize-corner-arc",
                viewBox: "0 0 20 20",
                "aria-hidden": "true",
                focusable: "false",
                children: c.jsx("path", {
                  d: "M1.5 17.5 A 16 16 0 0 0 17.5 1.5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.35",
                  strokeLinecap: "round"
                })
              })
            }), c.jsx("div", {
              className: "absolute top-4 right-0 bottom-4 w-4 z-[100] resize-handle resize-handle-side",
              style: {
                marginRight: "-4px",
                pointerEvents: e.type === "storyboard-chart-node" || He || We ? "none" : void 0
              },
              onMouseDown: e.type === "storyboard-chart-node" ? void 0 : pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "right",
                  vertical: "none"
                });
              },
              children: e.type === "storyboard-chart-node" ? c.jsx("div", {
                className: "absolute top-0 bottom-0 right-0 w-[3px] resize-handle-side",
                style: {
                  pointerEvents: "auto"
                },
                onMouseDown: pr => {
                  pr.stopPropagation(), pr.preventDefault(), j({
                    horizontal: "right",
                    vertical: "none"
                  });
                }
              }) : null
            }), c.jsx("div", {
              className: "absolute top-4 left-0 bottom-4 w-4 z-[100] resize-handle resize-handle-side",
              style: {
                marginLeft: "-4px",
                pointerEvents: He || We ? "none" : void 0
              },
              onMouseDown: pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "left",
                  vertical: "none"
                });
              }
            }), c.jsx("div", {
              className: "absolute bottom-0 left-4 right-4 h-4 z-[100] resize-handle resize-handle-top-bottom",
              style: {
                marginBottom: "-4px",
                pointerEvents: We ? "none" : void 0
              },
              onMouseDown: pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "none",
                  vertical: "bottom"
                });
              }
            })]
          }), !((Ra = e.settings) != null && Ra.isCollapsed) && Wn && !o && !i && (a || d) && c.jsxs(c.Fragment, {
            children: [c.jsx("div", {
              className: "absolute top-4 left-0 bottom-4 w-4 z-[100] resize-handle resize-handle-side",
              style: {
                marginLeft: "-4px",
                pointerEvents: We ? "none" : void 0
              },
              onMouseDown: pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "left",
                  vertical: "none"
                });
              }
            }), c.jsx("div", {
              className: "absolute top-4 right-0 bottom-4 w-4 z-[100] resize-handle resize-handle-side",
              style: {
                marginRight: "-4px",
                pointerEvents: We ? "none" : void 0
              },
              onMouseDown: pr => {
                pr.stopPropagation(), pr.preventDefault(), j({
                  horizontal: "right",
                  vertical: "none"
                });
              }
            })]
          }), zr > 0 ? c.jsx(d5i, {
            backs: zr,
            sizes: ur,
            isDark: h
          }) : null, c.jsxs("div", {
            "data-node-hover-chrome-body": un ? void 0 : !0,
            "data-input-image-content": ha ? "true" : void 0,
            onMouseEnter: un ? void 0 : ln,
            onMouseLeave: un ? void 0 : Yn,
            className: `${e.type === "input-image" || e.type === "custom-agent" || e.type === "gen-image" || e.type === "gen-video" || e.type === "motion-control" || e.type === "virtual-try-on" || e.type === "video-relight" || e.type === "rh-app" || e.type === "rh-comfy" || e.type === "preview" || e.type === "storyboard-chart-node" || e.type === "global-perspective" || e.type === "gen-music" || e.type === "gen-speech" || e.type === "text-node" || e.type === "topaz-upscale" || e.type === "jimeng-super-resolution" || e.type === "image-wash" || e.type === "fal-rembg" || e.type === "layer-decomposition" || e.type === "video-timeline" || e.type === "script-parse" || e.type === "image-compare" || e.type === "image-tile" || e.type === "gen-3d" || e.type === "three-d-studio" || e.type === "table-editor-node" ? "overflow-visible" : "overflow-hidden"} ${e.type === "input-image" || e.type === "preview" || e.type === "image-compare" || e.type === "image-tile" || e.type === "gen-image" || e.type === "gen-video" || e.type === "topaz-upscale" || e.type === "jimeng-super-resolution" || e.type === "image-wash" || e.type === "fal-rembg" || e.type === "layer-decomposition" || e.type === "motion-control" || e.type === "virtual-try-on" || e.type === "video-relight" || Zr ? "smart-image-container" : ""} rounded-2xl flex flex-col w-full relative z-[1] pointer-events-auto ${(e.type === "gen-image" || e.type === "gen-video") && !Zr ? "flex-none h-auto min-h-0" : "flex-1 h-full"} ${(ha || Zr || e.type === "topaz-upscale" || e.type === "jimeng-super-resolution" || e.type === "image-wash" || e.type === "fal-rembg" || e.type === "layer-decomposition" || e.type === "motion-control" || e.type === "virtual-try-on" || e.type === "video-relight") && m.zoom > .25 ? "!bg-transparent !border-0 !outline-none" : `${e.type === "preview" ? "!border-0 !outline-none " : ""}${h ? "bg-[#1f1f1f]" : "bg-white"}`}`,
            onDoubleClick: pr => {
              e.type === "input-image" || e.type === "preview" || Zr || pr.stopPropagation();
            },
            onPointerDown: pr => {
              const In = pr.target;
              (In.tagName === "INPUT" || In.tagName === "TEXTAREA" || In.tagName === "SELECT" || In.tagName === "BUTTON" || In.isContentEditable || In.closest('input, textarea, select, button, [contenteditable="true"], [role="button"]') || In.closest("[data-gen-prompt-apply]") || In.closest(".rh-list-dropdown") || In.closest(".node-dropdown-button") || In.closest(".node-dropdown-menu") || In.closest("[data-model-select-area]") || In.closest("[data-table-editor-controls]") || In.closest("[data-table-editor-toolbar]")) && pr.stopPropagation();
            },
            onMouseDown: pr => {
              const In = pr.target;
              (In.tagName === "INPUT" || In.tagName === "TEXTAREA" || In.tagName === "SELECT" || In.tagName === "BUTTON" || In.isContentEditable || In.closest('input, textarea, select, button, [contenteditable="true"], [role="button"]') || In.closest("[data-gen-prompt-apply]") || In.closest(".rh-list-dropdown") || In.closest(".node-dropdown-button") || In.closest(".node-dropdown-menu") || In.closest("[data-model-select-area]") || In.closest("[data-table-editor-controls]") || In.closest("[data-table-editor-toolbar]")) && pr.stopPropagation();
            },
            children: [ar ? null : c.jsxs(c.Fragment, {
              children: [Vt && !An ? c.jsx("div", {
                className: `${vn && e.type !== "gen-video" || Wr ? `absolute inset-0 z-[2] overflow-hidden rounded-2xl${Wr ? " pointer-events-none" : ""}` : "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl"}`,
                "data-canvas-persistent-media-layer": !0,
                "data-canvas-media-clip": "",
                "aria-hidden": !0,
                children: e.type === "input-image" ? c.jsx(Lur, {
                  enableHoverPlayback: !1,
                  node: e,
                  isDark: h,
                  boxSelectLightShell: s,
                  loadingOverlayActive: tn.loadingOverlayActive,
                  onRevealStart: ba
                }) : e.type === "gen-image" && ((ui = e.settings) != null && ui._tableBatchSnap) ? c.jsx(Uur, {
                  snapshot: String(e.settings._tableBatchSnap),
                  isDark: h
                }) : c.jsx(az, {
                  node: e,
                  isDark: h,
                  boxSelectLightShell: s,
                  enableGenerationNodeAnimation: ze,
                  enableHoverPlayback: !1,
                  loadingOverlayActive: tn.loadingOverlayActive ? !0 : void 0,
                  onRevealStart: ba
                })
              }) : null, c.jsxs("div", {
                className: "relative z-[1] flex h-full min-h-0 w-full flex-col",
                children: [Xe, ke && (ve === e.id || Te === e.id || Ne && Ne.length > 0) ? c.jsx(G3i, {
                  analyses: Ne,
                  isAnalyzing: Te === e.id,
                  isActiveSource: ve === e.id,
                  isDark: h,
                  onLevelChange: (pr, In) => Fe == null ? void 0 : Fe(e.id, pr, In),
                  onDismissAnalysis: pr => Me == null ? void 0 : Me(e.id, pr)
                }) : null]
              })]
            }), Lr ? c.jsx("div", {
              className: "pointer-events-none absolute inset-0 z-[70] overflow-visible rounded-2xl",
              "data-canvas-shell-generation-overlay": !0,
              style: tn.style,
              "aria-hidden": !0,
              children: c.jsx(Yv, {
                seed: e.id,
                mediaType: "image",
                isDark: h,
                hasUnderlyingContent: !1
              })
            }) : null, c.jsx(g5i, {
              nodeType: e.type
            }), c.jsx(qSi, {
              node: e
            }), c.jsx(b5i, {
              node: e,
              isSelected: a,
              isDark: h
            })]
          }), !ye && Hn && !je && c.jsx("div", {
            className: "node-input-connector-hit absolute top-1/2 -translate-y-1/2 right-full z-0 flex h-20 w-20 shrink-0 items-center justify-center touch-none",
            style: {
              pointerEvents: Un,
              visibility: an ? "hidden" : void 0
            },
            onMouseEnter: pr => {
              ln(), _r(pr);
            },
            onMouseMove: Pa,
            onMouseLeave: fa,
            onPointerDown: pr => Xt(pr, "input"),
            children: c.jsx("div", {
              className: `qiaodoumayi-node-handle-slide ${Rt ? "is-active" : ""} ${an ? "is-force-hidden" : ""}`,
              children: c.jsx("div", {
                ref: Ar,
                className: `connector connector-left qiaodoumayi-node-handle ${u ? "connected" : ""} ${Rt ? "active" : ""}`,
                role: "button",
                "aria-label": x("从左侧拖拽连接上游节点"),
                tabIndex: -1,
                style: {
                  "--qiaodoumayi-handle-color": h ? "rgb(122 122 122)" : "rgb(113 113 122)",
                  "--qiaodoumayi-handle-hover-color": h ? "rgb(245 245 245)" : "rgb(24 24 27)",
                  "--qiaodoumayi-handle-bg": h ? "transparent" : "rgba(255,255,255,0.94)"
                },
                onMouseUp: G,
                onClick: pr => pr.stopPropagation(),
                children: c.jsx(eo, {
                  size: 22,
                  strokeWidth: 2,
                  "aria-hidden": !0,
                  style: {
                    pointerEvents: "none"
                  }
                })
              })
            })
          }), !ye && !Hn && !je && !Zr && e.type !== "input-image" && !BUe(e.type) && c.jsx("div", {
            className: `input-point ${u ? "connected" : ""} ${Rt ? "active" : ""}`,
            style: {
              position: "absolute",
              top: "50%",
              left: "-0.35rem",
              transform: "translateY(-50%)",
              width: "0.6rem",
              height: "0.6rem",
              backgroundColor: u ? "#ffffff" : "#52525b",
              borderRadius: "50%",
              zIndex: 200,
              cursor: "crosshair",
              pointerEvents: "auto",
              opacity: Mr ? 0 : 1
            },
            onMouseEnter: ln,
            onMouseLeave: Yn,
            onPointerDown: pr => {
              pr.stopPropagation(), N == null || N(), F(pr);
            },
            onMouseUp: G
          }), cn && c.jsx("div", {
            className: "node-output-connector-hit absolute top-1/2 -translate-y-1/2 left-full z-0 flex h-20 w-20 shrink-0 items-center justify-center touch-none",
            style: {
              pointerEvents: Rn,
              visibility: zt ? "hidden" : void 0
            },
            onMouseEnter: pr => {
              ln(), rr(pr);
            },
            onMouseMove: qn,
            onMouseLeave: Dn,
            onPointerDown: pr => Xt(pr, "output"),
            children: c.jsx("div", {
              className: `qiaodoumayi-node-handle-slide ${fn ? "is-active" : ""} ${zt ? "is-force-hidden" : ""}`,
              children: c.jsx("div", {
                ref: Gn,
                className: `connector connector-right qiaodoumayi-node-handle ${fn ? "active" : ""}`,
                role: "button",
                "aria-label": x("从右侧拖拽连接下游节点"),
                tabIndex: -1,
                style: {
                  "--qiaodoumayi-handle-color": h ? "rgb(122 122 122)" : "rgb(113 113 122)",
                  "--qiaodoumayi-handle-hover-color": h ? "rgb(245 245 245)" : "rgb(24 24 27)",
                  "--qiaodoumayi-handle-bg": h ? "transparent" : "rgba(255,255,255,0.94)"
                },
                onMouseUp: z,
                onClick: pr => pr.stopPropagation(),
                children: c.jsx(eo, {
                  size: 22,
                  strokeWidth: 2,
                  "aria-hidden": !0,
                  style: {
                    pointerEvents: "none"
                  }
                })
              })
            })
          }), K && Q && Q.length > 0 && pe ? c.jsx(p5i, {
            visible: !0,
            nodeId: e.id,
            direction: W ?? "output",
            options: Q,
            onSelect: pe,
            onClose: () => Y == null ? void 0 : Y(),
            isDark: h
          }) : null]
        }), Ke && pt && e.type !== "custom-agent" && c.jsx(Der, {
          mode: _t,
          side: gt,
          isDark: h
        }), xn ? c.jsx(v5i, {
          label: cr,
          isDark: h
        }) : null]
      })
    });
  },
  N5i = g.memo(R5i, zSi),
  j5i = "radial-gradient(ellipse 90% 62% at 50% -8%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(ellipse 58% 42% at 82% 108%, rgba(99,102,241,0.14), transparent 56%)",
  D5i = "radial-gradient(ellipse 90% 62% at 50% -8%, rgba(255,255,255,0.72), transparent 60%), radial-gradient(ellipse 58% 42% at 82% 108%, rgba(99,102,241,0.10), transparent 56%)",
  L5i = ({
    isDark: e,
    backgroundColor: t,
    showBgGlow: n = !1
  }) => {
    const r = t != null && t.trim() ? t.trim() : e ? yZ : I5e;
    return c.jsx("div", {
      className: "absolute inset-0",
      "data-canvas-bg": "true",
      "data-canvas-bg-glow": n ? "true" : void 0,
      style: {
        backgroundColor: r,
        backgroundImage: n ? e ? j5i : D5i : void 0,
        backgroundRepeat: "no-repeat",
        cursor: "default",
        overflow: "hidden",
        contain: "paint"
      }
    });
  },
  O5i = (e, t) => e.isDark === t.isDark && e.showBgGlow === t.showBgGlow && (e.backgroundColor || "") === (t.backgroundColor || ""),
  B5i = g.memo(L5i, O5i);

function F5i() {
  return {
    screenSpacing: -1,
    screenDotRadius: -1,
    color: "",
    visible: !1,
    transform: ""
  };
}

function XUe(e, t) {
  return (e % t + t) % t;
}

function kst(e, t, n, r, a, i, o, s, l, d, u, h, p, m) {
  if (!d) {
    e.style.visibility = "hidden", e.style.opacity = "0", u.visible = !1;
    return;
  }
  const f = Math.max(i.zoom, 1e-4),
    y = axi(f);
  if (y <= 0) {
    e.style.visibility = "hidden", e.style.opacity = "0", u.visible = !1;
    return;
  }
  const b = o * f,
    v = s * f,
    _ = oxi(l, y);
  e.style.visibility = "visible", e.style.opacity = "1", u.visible = !0;
  const w = u.screenSpacing !== b;
  if (w) {
    r.setAttribute("width", `${b}`), r.setAttribute("height", `${b}`);
    const C = b / 2;
    r.setAttribute("patternTransform", `translate(-${C},-${C})`), u.screenSpacing = b;
  }
  if (w || h) {
    const C = p != null && p > 0 ? p : e.clientWidth || 0,
      I = m != null && m > 0 ? m : e.clientHeight || 0;
    n.setAttribute("x", `${-b}`), n.setAttribute("y", `${-b}`), n.setAttribute("width", `${C + b * 2}`), n.setAttribute("height", `${I + b * 2}`);
  }
  u.screenDotRadius !== v && (a.setAttribute("cx", `${v}`), a.setAttribute("cy", `${v}`), a.setAttribute("r", `${v}`), u.screenDotRadius = v), u.color !== _ && (a.setAttribute("fill", _), u.color = _);
  const k = XUe(i.x, b),
    A = XUe(i.y, b),
    S = `translate(${k}px, ${A}px)`;
  u.transform !== S && (t.style.transform = S, u.transform = S);
}

function z5i(e, t, n, r) {
  if (!n || !r.visible || r.screenSpacing <= 0) return;
  const a = XUe(t.x, r.screenSpacing),
    i = XUe(t.y, r.screenSpacing),
    o = `translate(${a}px, ${i}px)`;
  r.transform !== o && (e.style.transform = o, r.transform = o);
}

const U5i = ({
    showGrid: e,
    isDark: t,
    zoom: n,
    viewX: r,
    viewY: a,
    gridSpacing: i,
    gridDotSize: o
  }) => {
    const s = g.useRef(null),
      l = g.useRef(null),
      d = g.useRef(null),
      u = g.useRef(null),
      h = g.useRef(null),
      p = g.useRef(F5i()),
      m = g.useRef(!0),
      f = g.useRef(null),
      y = g.useRef(null),
      b = FLe(i),
      v = zLe(o),
      _ = g.useRef(b),
      w = g.useRef(v),
      k = g.useRef(t),
      A = g.useRef(e);
    _.current = b, w.current = v, k.current = t, A.current = e;
    const S = g.useCallback(() => {
      var P, R;
      const C = s.current,
        I = l.current,
        E = d.current,
        M = u.current,
        T = h.current;
      !C || !I || !E || !M || !T || (kst(C, I, E, M, T, Cd(), _.current, w.current, k.current, A.current, p.current, m.current, (P = y.current) == null ? void 0 : P.w, (R = y.current) == null ? void 0 : R.h), m.current = !1);
    }, []);
    return g.useEffect(() => {
      S();
      const C = K4e(E => {
          var B, F;
          const M = s.current,
            T = l.current,
            P = d.current,
            R = u.current,
            j = h.current;
          !M || !T || !P || !R || !j || (kst(M, T, P, R, j, E, _.current, w.current, k.current, A.current, p.current, m.current, (B = y.current) == null ? void 0 : B.w, (F = y.current) == null ? void 0 : F.h), m.current = !1);
        }),
        I = dw(E => {
          var B, F;
          const M = s.current,
            T = l.current,
            P = d.current,
            R = u.current,
            j = h.current;
          !M || !T || !P || !R || !j || (kst(M, T, P, R, j, E, _.current, w.current, k.current, A.current, p.current, m.current, (B = y.current) == null ? void 0 : B.w, (F = y.current) == null ? void 0 : F.h), m.current = !1);
        });
      return () => {
        C(), I();
      };
    }, [S]), g.useEffect(() => {
      const C = s.current;
      if (!C) return;
      const I = new ResizeObserver(M => {
        const T = M[0];
        T != null && T.contentRect && (y.current = {
          w: T.contentRect.width,
          h: T.contentRect.height
        }), m.current = !0, !f$() && f.current == null && (f.current = requestAnimationFrame(() => {
          f.current = null, S();
        }));
      });
      I.observe(C);
      const E = bJe(() => {
        m.current && (f.current != null && (cancelAnimationFrame(f.current), f.current = null), S());
      });
      return () => {
        E(), I.disconnect(), f.current != null && (cancelAnimationFrame(f.current), f.current = null);
      };
    }, [S]), g.useEffect(() => (icn((C, I) => {
      const E = l.current;
      E && z5i(E, {
        x: C,
        y: I
      }, A.current, p.current);
    }), () => icn(null)), []), g.useEffect(() => {
      S();
    }, [e, t, n, r, a, b, v, S]), c.jsxs("svg", {
      ref: s,
      className: "pointer-events-none absolute inset-0",
      "data-canvas-world-grid": "true",
      "data-canvas-grid-layer": "svg-viewport",
      "aria-hidden": !0,
      style: {
        width: "100%",
        height: "100%",
        zIndex: 0,
        contain: "strict",
        visibility: "hidden",
        opacity: 0
      },
      children: [c.jsx("defs", {
        children: c.jsx("pattern", {
          ref: u,
          id: "canvas-world-grid-pattern",
          patternUnits: "userSpaceOnUse",
          width: "20",
          height: "20",
          children: c.jsx("circle", {
            ref: h,
            cx: "0.5",
            cy: "0.5",
            r: "0.5"
          })
        })
      }), c.jsx("g", {
        ref: l,
        style: {
          willChange: "transform"
        },
        children: c.jsx("rect", {
          ref: d,
          x: "0",
          y: "0",
          width: "100%",
          height: "100%",
          fill: "url(#canvas-world-grid-pattern)"
        })
      })]
    });
  },
  $5i = (e, t) => e.showGrid === t.showGrid && e.isDark === t.isDark && e.zoom === t.zoom && e.viewX === t.viewX && e.viewY === t.viewY && e.gridSpacing === t.gridSpacing && e.gridDotSize === t.gridDotSize,
  G5i = g.memo(U5i, $5i),
  V5i = ({
    visible: e,
    nodeIds: t,
    position: n,
    viewZoom: r,
    viewOffset: a,
    isDark: i = !0,
    onStartConnection: o,
    onMouseMove: s
  }) => {
    on();
    const [l, d] = g.useState(!1),
      u = n.x * r + a.x,
      h = n.y * r + a.y,
      p = g.useCallback(m => {
        m.preventDefault(), m.stopPropagation(), d(!0), o(t);
      }, [t, o]);
    return g.useEffect(() => {
      if (!l) return;
      const m = y => {
          if (s) {
            const b = (y.clientX - a.x) / r,
              v = (y.clientY - a.y) / r;
            s(b, v);
          }
        },
        f = () => {
          d(!1);
        };
      return window.addEventListener("mousemove", m), window.addEventListener("mouseup", f), () => {
        window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", f);
      };
    }, [l, r, a, s]), !e || t.length < 2 ? null : c.jsx("div", {
      className: "absolute z-[400] pointer-events-auto",
      style: {
        left: `${u}px`,
        top: `${h}px`,
        transform: "translate(-50%, -50%)"
      },
      children: c.jsx("button", {
        type: "button",
        onPointerDown: p,
        className: "connector connector-right flex items-center justify-center",
        style: {
          position: "relative",
          top: "auto",
          transform: "none",
          opacity: 1,
          width: "2.5rem",
          height: "2.5rem",
          minWidth: "2.5rem",
          backgroundColor: i ? "transparent" : "#ffffff",
          border: i ? "1px solid rgba(255,255,255,0.3)" : "1px solid #d4d4d8",
          borderRadius: "50%",
          boxShadow: i ? "none" : "0 1px 3px rgba(0,0,0,0.08)",
          cursor: l ? "grabbing" : "crosshair",
          color: i ? "#ffffff" : "#3f3f46"
        },
        "aria-label": x("批量连接 {0} 个节点", t.length),
        children: c.jsx(eo, {
          size: 22,
          strokeWidth: 2,
          "aria-hidden": !0,
          style: {
            pointerEvents: "none"
          }
        })
      })
    });
  },
  H5i = ({
    visible: e,
    nodeIds: t,
    position: n,
    viewZoom: r,
    viewOffset: a,
    isDark: i = !0,
    onStartConnection: o,
    onMouseMove: s
  }) => {
    on();
    const [l, d] = g.useState(!1),
      [u, h] = g.useState(!1),
      p = n.x * r + a.x,
      m = n.y * r + a.y,
      f = g.useCallback(y => {
        y.preventDefault(), y.stopPropagation(), h(!0), o(t);
      }, [t, o]);
    return g.useEffect(() => {
      if (!u) return;
      const y = v => {
          if (s) {
            const _ = (v.clientX - a.x) / r,
              w = (v.clientY - a.y) / r;
            s(_, w);
          }
        },
        b = () => {
          h(!1);
        };
      return window.addEventListener("mousemove", y), window.addEventListener("mouseup", b), () => {
        window.removeEventListener("mousemove", y), window.removeEventListener("mouseup", b);
      };
    }, [u, r, a, s]), !e || t.length < 2 ? null : c.jsxs("div", {
      className: "absolute z-[400] pointer-events-auto",
      style: {
        left: `${p}px`,
        top: `${m}px`,
        transform: "translate(-50%, -50%)"
      },
      children: [c.jsxs("button", {
        onPointerDown: f,
        onMouseEnter: () => d(!0),
        onMouseLeave: () => d(!1),
        className: `flex items-center justify-center gap-2 transition-all duration-200 ${l ? "rounded-full px-4" : "rounded-full"} ${i ? "bg-transparent hover:bg-white/5 border border-white/30 text-white" : "bg-blue-500 hover:bg-blue-400 border-2 border-blue-300"}`,
        style: {
          height: "48px",
          minWidth: "48px",
          width: l ? "auto" : "48px",
          cursor: u ? "grabbing" : "grab"
        },
        children: [c.jsx(w5e, {
          size: 24,
          className: "text-white"
        }), l && c.jsxs("span", {
          className: "text-sm font-medium whitespace-nowrap text-white",
          children: [x("反向批量连接 ("), t.length, ")"]
        })]
      }), !l && !u && c.jsxs("div", {
        className: `absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap px-2 py-1 rounded ${i ? "bg-transparent text-white border border-white/30" : "bg-white text-zinc-700 shadow-lg"}`,
        children: [x("拖拽源节点连接到 "), t.length, x(" 个目标")]
      })]
    });
  };

function W5i({
  multiImageSelection: e,
  reverseBatchSelection: t,
  viewZoom: n,
  viewOffset: r,
  isDark: a,
  onStartMultiConnection: i,
  onStartReverseBatchConnection: o
}) {
  return !e && !t ? null : c.jsxs(c.Fragment, {
    children: [e && c.jsx(V5i, {
      visible: !0,
      nodeIds: e.nodeIds,
      position: e.dialPosition,
      viewZoom: n,
      viewOffset: r,
      isDark: a,
      onStartConnection: i
    }), t && c.jsx(H5i, {
      visible: !0,
      nodeIds: t.nodeIds,
      position: t.dialPosition,
      viewZoom: n,
      viewOffset: r,
      isDark: a,
      onStartConnection: o
    })]
  });
}

const Adn = 10;

function q5i({
  canvasContentRef: e,
  groupBackground: t,
  connections: n,
  children: r
}) {
  return c.jsxs(c.Fragment, {
    children: [c.jsx("div", {
      "data-canvas-world-layer": "back",
      className: "pointer-events-none absolute inset-0",
      style: {
        zIndex: 0,
        transformOrigin: "0 0"
      },
      children: t
    }), c.jsx("div", {
      id: "canvas-static-connections-host",
      className: "pointer-events-none absolute inset-0",
      style: {
        zIndex: 1
      }
    }), c.jsxs("div", {
      "data-canvas-world-layer": "front",
      className: "pointer-events-none absolute inset-0",
      style: {
        zIndex: Adn,
        transformOrigin: "0 0"
      },
      children: [n, c.jsx("div", {
        ref: e,
        className: "canvas-content",
        style: {
          position: "relative",
          zIndex: Adn,
          pointerEvents: "auto"
        },
        children: r
      })]
    })]
  });
}

function K5i({
  fadedIn: e,
  isDark: t,
  children: n
}) {
  return c.jsx("div", {
    className: `app-canvas-viewport absolute inset-0 max-w-full min-w-0 overflow-hidden ${t ? "bg-[#09090b]" : "bg-zinc-100"}`,
    children: n
  });
}

const Q5i = ({
    groups: e,
    nodes: t,
    isDark: n = !1,
    selectedGroupId: r = null
  }) => {
    const a = RBt(),
      i = g.useMemo(() => e.filter(o => !o.collapsed).map(o => {
        const s = r === o.id,
          l = a === o.id,
          d = s ? nza(o.color, n) : l ? rza(o.color, n) : $Lt(o.color, n);
        return {
          id: o.id,
          bounds: Gk(o, t),
          fill: tza(o.color, n),
          border: d,
          isSelected: s
        };
      }), [e, t, n, r, a]);
    return i.length === 0 ? null : c.jsx("div", {
      className: "absolute inset-0 pointer-events-none",
      style: {
        zIndex: 0,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
      },
      children: i.map(o => c.jsx("div", {
        className: `absolute rounded-2xl pointer-events-none${o.isSelected ? " group-frame-selected" : ""}`,
        "data-group-frame-bg": o.id,
        "data-group-selected": o.isSelected ? "true" : void 0,
        style: {
          left: o.bounds.x,
          top: o.bounds.y,
          width: o.bounds.width,
          height: o.bounds.height,
          backgroundColor: o.fill,
          border: `${o.isSelected ? 2 : 1}px solid ${o.border}`,
          boxSizing: "border-box"
        }
      }, o.id))
    });
  },
  Y5i = g.memo(Q5i),
  X5i = 12,
  J5i = 148,
  Z5i = 168,
  eIi = new Set(["gen-image", "gen-video", "text-node", "gen-speech", "gen-music"]);

function tIi(e, t, n, r) {
  return t > n && e < r;
}

function nIi(e, t, n, r) {
  return t > n && e < r;
}

function rIi(e, t) {
  const {
      width: n,
      height: r
    } = A8n(e),
    a = YFa(t),
    i = GDe * a,
    o = (H4e + J5i) * a,
    s = e.x + n / 2 - i / 2,
    l = e.y + r + X5i;
  return {
    x: s,
    y: l,
    width: i,
    height: o
  };
}

function Sdn(e, t, n, r) {
  let a = e.y;
  if (!(n != null && n.size)) return a;
  const i = Ver,
    o = QFa,
    s = e.x,
    l = e.x + Z5i;
  for (const d of t) {
    if (!n.has(d.id) || !eIi.has(d.type)) continue;
    const u = rIi(d, r);
    if (!tIi(s, l, u.x, u.x + u.width)) continue;
    const h = a - i,
      p = h - o;
    nIi(p, h, u.y, u.y + u.height) && (a = Math.min(a, u.y - i));
  }
  return a;
}

const Ste = k8n;

function aIi(e, t, n, r) {
  const {
    x: a,
    y: i,
    width: o,
    height: s
  } = t;
  let l = a,
    d = i,
    u = o,
    h = s;
  return e.includes("e") && (u = o + n), e.includes("w") && (l = a + n, u = o - n), e.includes("s") && (h = s + r), e.includes("n") && (d = i + r, h = s - r), u < Ste && (e.includes("w") && (l = a + o - Ste), u = Ste), h < Ste && (e.includes("n") && (d = i + s - Ste), h = Ste), {
    x: l,
    y: d,
    width: u,
    height: h
  };
}

const iIi = (e, t) => e.groups === t.groups && e.nodes === t.nodes && e.selectedGroupId === t.selectedGroupId && e.isDark === t.isDark && e.onGroupSelect === t.onGroupSelect && e.onGroupResize === t.onGroupResize && e.onGroupNameChange === t.onGroupNameChange && e.onGroupResizeStart === t.onGroupResizeStart && e.onGroupResizeEnd === t.onGroupResizeEnd && e.onStartGroupConnect === t.onStartGroupConnect && e.connectingGroupId === t.connectingGroupId && e.blockGroupConnect === t.blockGroupConnect && e.view.zoom === t.view.zoom,
  oIi = ({
    groups: e,
    nodes: t,
    view: n,
    openGenPromptPanelNodeIds: r,
    selectedGroupId: a,
    onGroupSelect: i,
    isDark: o = !1,
    onGroupResize: s,
    onGroupNameChange: l,
    onGroupResizeStart: d,
    onGroupResizeEnd: u,
    onStartGroupConnect: h,
    connectingGroupId: p = null,
    blockGroupConnect: m = !1,
    hoveredGroupId: f
  }) => {
    on();
    const y = RBt(),
      b = f !== void 0 ? f : y,
      v = vhi(),
      _ = r ?? v,
      [w, k] = g.useState(null),
      [A, S] = g.useState(""),
      C = g.useRef(null),
      I = g.useRef(null),
      E = g.useRef(null),
      M = g.useRef(s),
      T = g.useRef(u),
      P = g.useRef(n.zoom);
    M.current = s, T.current = u, P.current = n.zoom;
    const R = g.useCallback(D => {
        var K, W, Q;
        const U = (D == null ? void 0 : D.releaseCapture) !== !1,
          H = (D == null ? void 0 : D.notifyEnd) !== !1,
          Y = C.current;
        if (Y) {
          if (U && Y.captureEl && Y.pointerId != null) try {
            (W = (K = Y.captureEl).hasPointerCapture) != null && W.call(K, Y.pointerId) && Y.captureEl.releasePointerCapture(Y.pointerId);
          } catch {}
          C.current = null, H && ((Q = T.current) == null || Q.call(T));
        }
      }, []),
      j = g.useRef(t);
    j.current = t;
    const B = g.useRef(_);
    B.current = _;
    const F = g.useCallback((D, U) => {
        const H = document.querySelector(`[data-group-frame-bg="${D}"]`),
          Y = document.querySelector(`[data-group-frame="${D}"]`),
          K = document.querySelector(`[data-group-toolbar-wrap="${D}"]`);
        if (H && (H.style.left = `${U.x}px`, H.style.top = `${U.y}px`, H.style.width = `${U.width}px`, H.style.height = `${U.height}px`), Y) {
          Y.style.left = `${U.x}px`, Y.style.top = `${U.y}px`, Y.style.width = `${U.width}px`, Y.style.height = `${U.height}px`;
          const W = Y.querySelector("[data-group-label]");
          if (W) {
            const Q = Sdn(U, j.current, B.current, P.current || 1);
            W.style.top = `${Q - U.y}px`;
          }
        }
        if (K) {
          const W = mJ(U);
          K.style.left = `${W.left}px`, K.style.top = `${W.top}px`, K.style.transform = W.transform, K.style.transformOrigin = W.transformOrigin;
        }
      }, []),
      N = g.useCallback(() => {
        var H;
        I.current != null && (cancelAnimationFrame(I.current), I.current = null);
        const D = C.current,
          U = E.current;
        E.current = null, D && U && (F(D.groupId, U.bounds), (H = M.current) == null || H.call(M, D.groupId, U.bounds));
      }, [F]),
      G = g.useCallback((D, U, H, Y) => {
        if (!M.current || "button" in H && H.button !== 0) return;
        H.preventDefault(), H.stopPropagation(), C.current && R({
          notifyEnd: !1
        }), i(D), d == null || d(D);
        const K = H.currentTarget,
          W = "pointerId" in H && typeof H.pointerId == "number" ? H.pointerId : null;
        if (C.current = {
          groupId: D,
          origin: U,
          startMouseX: H.clientX,
          startMouseY: H.clientY,
          startBounds: Y,
          pointerId: W,
          captureEl: K
        }, W != null && typeof K.setPointerCapture == "function") try {
          K.setPointerCapture(W);
        } catch {}
      }, [d, i, R]);
    g.useEffect(() => {
      const D = Y => {
          const K = C.current;
          if (!K || !M.current) return;
          const Q = P.current || 1,
            q = (Y.clientX - K.startMouseX) / Q,
            ne = (Y.clientY - K.startMouseY) / Q,
            de = aIi(K.origin, K.startBounds, q, ne);
          E.current = {
            groupId: K.groupId,
            bounds: de
          }, I.current == null && (I.current = requestAnimationFrame(() => {
            I.current = null;
            const le = E.current;
            E.current = null, le && F(le.groupId, le.bounds);
          }));
        },
        U = () => {
          N(), R();
        },
        H = () => {
          N(), R();
        };
      return window.addEventListener("pointermove", D), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", U), window.addEventListener("mouseup", U), window.addEventListener("blur", H), () => {
        C.current && (N(), R({
          releaseCapture: !1
        })), window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", U), window.removeEventListener("mouseup", U), window.removeEventListener("blur", H);
      };
    }, [R, N]);
    const z = g.useMemo(() => e.filter(D => !D.collapsed).map(D => ({
        ...D,
        bounds: Gk(D, t),
        connectableNodeIds: Que(D, t)
      })), [e, t]),
      V = g.useCallback((D, U) => {
        U.stopPropagation(), i(D);
      }, [i]),
      O = g.useCallback(D => {
        const U = A.trim();
        U && l && l(D, U), k(null), S("");
      }, [A, l]),
      L = XFa(o);
    return g.useEffect(() => {
      a || (k(null), S(""));
    }, [a]), z.length === 0 ? null : c.jsx("div", {
      className: "absolute inset-0 pointer-events-none",
      style: {
        zIndex: 120,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
      },
      children: z.map(D => {
        const U = a === D.id,
          H = Sdn(D.bounds, t, _, n.zoom),
          Y = !!h && D.connectableNodeIds.length > 0 && !m && p !== D.id && b === D.id;
        return c.jsxs("div", {
          className: "absolute pointer-events-none",
          "data-group-frame": D.id,
          style: {
            left: D.bounds.x,
            top: D.bounds.y,
            width: D.bounds.width,
            height: D.bounds.height
          },
          children: [c.jsx("div", {
            "data-group-label": !0,
            className: "absolute left-0 pointer-events-auto",
            style: {
              top: H - D.bounds.y,
              transform: `translateY(calc(-100% - ${Ver}px))`
            },
            onMouseDown: K => K.stopPropagation(),
            onClick: K => V(D.id, K),
            onDoubleClick: K => {
              K.stopPropagation(), l && (i(D.id), k(D.id), S(D.name));
            },
            children: w === D.id ? c.jsx("input", {
              type: "text",
              value: A,
              onChange: K => S(K.target.value),
              onKeyDown: K => {
                K.key === "Enter" && O(D.id), K.key === "Escape" && (k(null), S(""));
              },
              onBlur: () => O(D.id),
              className: `w-28 px-1.5 py-0.5 text-xs rounded border outline-none ${o ? "bg-zinc-800 border-zinc-600 text-zinc-100" : "bg-white border-zinc-300 text-zinc-800"}`,
              autoFocus: !0,
              onClick: K => K.stopPropagation()
            }) : c.jsx("span", {
              className: `${L} cursor-pointer ${U ? o ? "text-zinc-100" : "text-zinc-800" : ""}`,
              children: D.name
            })
          }), Y && c.jsx("div", {
            "data-group-output-connector": !0,
            className: "absolute top-1/2 left-full z-[250] flex h-16 w-14 -translate-y-1/2 items-center justify-center pointer-events-auto",
            style: {
              marginLeft: 8
            },
            onPointerDown: K => {
              K.stopPropagation(), h == null || h(D.id, D.connectableNodeIds, K);
            },
            children: c.jsx("div", {
              className: "connector connector-right",
              style: {
                width: "2.5rem",
                height: "2.5rem",
                backgroundColor: o ? "transparent" : "#ffffff",
                border: o ? "1px solid rgba(255,255,255,0.3)" : "1px solid #d4d4d8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: o ? "none" : "0 1px 3px rgba(0,0,0,0.08)"
              },
              children: c.jsx(eo, {
                size: 24,
                style: {
                  pointerEvents: "none",
                  color: o ? "#ffffff" : "#6b7280"
                }
              })
            })
          }), s && U && c.jsxs(c.Fragment, {
            children: [c.jsx("div", {
              "data-group-resize-handle": !0,
              "data-group-resize-origin": "n",
              className: "absolute left-4 right-4 h-4 z-[100] resize-handle resize-handle-top-bottom pointer-events-auto touch-none",
              style: {
                top: 0,
                marginTop: -4
              },
              onPointerDown: K => G(D.id, "n", K, D.bounds)
            }), c.jsx("div", {
              "data-group-resize-handle": !0,
              "data-group-resize-origin": "s",
              className: "absolute bottom-0 left-4 right-4 h-4 z-[100] resize-handle resize-handle-top-bottom pointer-events-auto touch-none",
              style: {
                marginBottom: -4
              },
              onPointerDown: K => G(D.id, "s", K, D.bounds)
            }), c.jsx("div", {
              "data-group-resize-handle": !0,
              "data-group-resize-origin": "w",
              className: "absolute top-4 bottom-4 left-0 w-4 z-[100] resize-handle resize-handle-side pointer-events-auto touch-none",
              style: {
                marginLeft: -4
              },
              onPointerDown: K => G(D.id, "w", K, D.bounds)
            }), c.jsx("div", {
              "data-group-resize-handle": !0,
              "data-group-resize-origin": "e",
              className: "absolute top-4 bottom-4 right-0 w-4 z-[100] resize-handle resize-handle-side pointer-events-auto touch-none",
              style: {
                marginRight: -4
              },
              onPointerDown: K => G(D.id, "e", K, D.bounds)
            }), c.jsx("div", {
              "data-group-resize-handle": !0,
              "data-group-resize-origin": "nw",
              className: "absolute z-[100] resize-handle resize-handle-corner resize-handle-corner-rb resize-handle-corner-grip resize-handle-corner-grip--nw pointer-events-auto touch-none",
              onPointerDown: K => G(D.id, "nw", K, D.bounds),
              title: x("拖拽调整分组范围"),
              children: c.jsx("svg", {
                className: "node-resize-corner-arc",
                viewBox: "0 0 20 20",
                "aria-hidden": "true",
                focusable: "false",
                children: c.jsx("path", {
                  d: "M1.5 17.5 A 16 16 0 0 0 17.5 1.5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.35",
                  strokeLinecap: "round"
                })
              })
            }), c.jsx("div", {
              "data-group-resize-handle": !0,
              "data-group-resize-origin": "ne",
              className: "absolute z-[100] resize-handle resize-handle-corner resize-handle-corner-grip resize-handle-corner-grip--ne pointer-events-auto touch-none",
              onPointerDown: K => G(D.id, "ne", K, D.bounds),
              title: x("拖拽调整分组范围"),
              children: c.jsx("svg", {
                className: "node-resize-corner-arc",
                viewBox: "0 0 20 20",
                "aria-hidden": "true",
                focusable: "false",
                children: c.jsx("path", {
                  d: "M1.5 17.5 A 16 16 0 0 0 17.5 1.5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.35",
                  strokeLinecap: "round"
                })
              })
            }), c.jsx("div", {
              "data-group-resize-handle": !0,
              "data-group-resize-origin": "sw",
              className: "absolute z-[100] resize-handle resize-handle-corner resize-handle-corner-grip resize-handle-corner-grip--sw pointer-events-auto touch-none",
              onPointerDown: K => G(D.id, "sw", K, D.bounds),
              title: x("拖拽调整分组范围"),
              children: c.jsx("svg", {
                className: "node-resize-corner-arc",
                viewBox: "0 0 20 20",
                "aria-hidden": "true",
                focusable: "false",
                children: c.jsx("path", {
                  d: "M1.5 17.5 A 16 16 0 0 0 17.5 1.5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.35",
                  strokeLinecap: "round"
                })
              })
            }), c.jsx("div", {
              "data-group-resize-handle": !0,
              "data-group-resize-origin": "se",
              className: "absolute z-[100] resize-handle resize-handle-corner resize-handle-corner-rb resize-handle-corner-grip resize-handle-corner-grip--se pointer-events-auto touch-none",
              onPointerDown: K => G(D.id, "se", K, D.bounds),
              title: x("拖拽调整分组范围"),
              children: c.jsx("svg", {
                className: "node-resize-corner-arc",
                viewBox: "0 0 20 20",
                "aria-hidden": "true",
                focusable: "false",
                children: c.jsx("path", {
                  d: "M1.5 17.5 A 16 16 0 0 0 17.5 1.5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.35",
                  strokeLinecap: "round"
                })
              })
            })]
          })]
        }, D.id);
      })
    });
  },
  sIi = g.memo(oIi, iIi);

function nx(e) {
  let t = String(e ?? "").replace(/（[^）]*）/g, "");
  return t = t.replace(/\(([^)]*)\)/g, (n, r) => /[\u4e00-\u9fff]/.test(r) ? "" : n), x(t.replace(/\s+/g, " ").trim());
}

function lIi(e) {
  const t = String(e),
    n = t.match(/（([^）]*)）/);
  if (n) return x(n[1].trim());
  const r = t.match(/\(([^)]*)\)/);
  return x(r ? r[1].trim() : t.trim());
}

const cIi = (e, t) => e.groups === t.groups && e.nodes === t.nodes && e.selectedGroupId === t.selectedGroupId && e.isDark === t.isDark && e.isDownloading === t.isDownloading && e.onGroupNameChange === t.onGroupNameChange && e.onGroupColorChange === t.onGroupColorChange && e.onGroupDelete === t.onGroupDelete && e.onGroupExecute === t.onGroupExecute && e.onArrangeGroup === t.onArrangeGroup && e.onDownloadGroup === t.onDownloadGroup && e.onDemoGroup === t.onDemoGroup && e.onTogglePreviewCollapsed === t.onTogglePreviewCollapsed,
  dIi = ({
    groups: e,
    nodes: t,
    selectedGroupId: n,
    onGroupColorChange: r,
    onGroupDelete: a,
    onGroupExecute: i,
    onArrangeGroup: o,
    onDownloadGroup: s,
    onDemoGroup: l,
    isDark: d = !1,
    isDownloading: u = !1
  }) => {
    on();
    const h = DAi(),
      [p, m] = g.useState(null),
      [f, y] = g.useState(null),
      [b, v] = g.useState(!1),
      _ = g.useRef(null),
      w = g.useRef(null),
      k = g.useRef(null),
      A = g.useRef(null),
      S = g.useMemo(() => e.filter(D => !D.collapsed).map(D => ({
        ...D,
        bounds: Gk(D, t)
      })), [e, t]);
    Qp(A, "50% 100%", !!n);
    const C = g.useCallback(() => {
        m(null), y(null);
      }, []),
      I = g.useCallback((D, U) => {
        if (U.stopPropagation(), v(!1), p === D) {
          C();
          return;
        }
        const H = U.currentTarget.getBoundingClientRect();
        y({
          x: H.left + H.width / 2,
          y: H.top
        }), m(D);
      }, [p, C]),
      E = g.useCallback((D, U, H) => {
        H.stopPropagation(), r(D, U), C();
      }, [r, C]);
    g.useEffect(() => {
      v(!1), C();
    }, [n, C]), g.useEffect(() => {
      if (!p && !b) return;
      const D = U => {
        var Y, K;
        const H = U.target;
        H != null && H.closest("[data-group-color-picker]") || H != null && H.closest("[data-group-layout-menu]") || (Y = _.current) != null && Y.contains(H ?? null) || (K = w.current) != null && K.contains(H ?? null) || (C(), v(!1));
      };
      return document.addEventListener("mousedown", D, !0), () => document.removeEventListener("mousedown", D, !0);
    }, [p, b, C]), g.useEffect(() => {
      if (!k.current || !n) return;
      const D = S.find(H => H.id === n);
      if (!D) return;
      const U = mJ(D.bounds);
      k.current.style.left = `${U.left}px`, k.current.style.top = `${U.top}px`, k.current.style.transform = U.transform, k.current.style.transformOrigin = U.transformOrigin;
    }, [n, S]);
    const M = g.useCallback((D, U) => {
        U.stopPropagation(), a(D);
      }, [a]),
      T = g.useCallback((D, U) => {
        U.stopPropagation(), i(D);
      }, [i]),
      P = g.useCallback((D, U) => {
        o == null || o(D, U), v(!1);
      }, [o]),
      R = `input-node-fast-tooltip ${d ? "input-node-fast-tooltip--dark" : "input-node-fast-tooltip--light"}`,
      j = "w-11 h-11 flex items-center justify-center transition-colors shrink-0",
      B = "toolbar-label-btn h-11 px-3 flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap text-[12px]",
      F = d ? "text-zinc-200" : "text-zinc-700",
      N = d ? "text-zinc-200 hover:bg-white/10" : "text-zinc-700",
      G = d ? "text-white bg-white/12" : "text-white",
      z = `flex items-center overflow-hidden ${fJ(d)}`,
      V = `${d ? "bg-white/10" : "bg-black/10"} w-px h-6 shrink-0`,
      O = `flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${d ? "text-zinc-200 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
      L = p && f && typeof document < "u" ? Da.createPortal(c.jsx("div", {
        "data-group-color-picker": !0,
        className: `fixed z-[100000] p-1.5 flex gap-1 pointer-events-auto ${fJ(d)}`,
        style: {
          left: f.x,
          top: f.y - 8,
          transform: "translate(-50%, -100%)"
        },
        onClick: D => D.stopPropagation(),
        onMouseDown: D => D.stopPropagation(),
        children: CQ.map(D => {
          const U = e.find(Y => Y.id === p),
            H = (U == null ? void 0 : U.color) ?? "#ffffff";
          return c.jsx("button", {
            type: "button",
            className: "w-5 h-5 rounded-full border transition-all hover:scale-110",
            style: {
              backgroundColor: Man(D, d),
              borderColor: H === D ? d ? "#e4e4e7" : "#18181b" : d ? "#3f3f46" : "#d4d4d8",
              borderWidth: H === D ? "2px" : "1px"
            },
            onClick: Y => E(p, D, Y)
          }, D);
        })
      }), document.body) : null;
    return c.jsxs(c.Fragment, {
      children: [L, c.jsx("div", {
        className: "absolute pointer-events-none",
        style: {
          zIndex: 100,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%"
        },
        children: S.map(D => {
          if (D.id !== n) return null;
          const U = D.id === p,
            H = h.has(D.id);
          return c.jsx("div", {
            "data-group-toolbar-wrap": D.id,
            ref: D.id === n ? k : null,
            className: "absolute pointer-events-auto",
            style: mJ(D.bounds),
            children: c.jsx("div", {
              ref: A,
              style: {
                transition: "none",
                willChange: "transform"
              },
              children: c.jsxs("div", {
                "data-group-toolbar": !0,
                className: `${z} ${R}`,
                onClick: Y => Y.stopPropagation(),
                onMouseDown: Y => Y.stopPropagation(),
                children: [c.jsxs("button", {
                  type: "button",
                  className: `${B} ${F} relative`,
                  "data-toolbar-active": H ? "true" : "false",
                  "aria-label": x(H ? "取消运行" : "运行"),
                  onClick: Y => T(D.id, Y),
                  children: [c.jsxs("span", {
                    className: "relative inline-flex w-4 h-4 shrink-0 items-center justify-center",
                    children: [H && c.jsx("span", {
                      className: "group-run-ping",
                      "aria-hidden": !0
                    }), c.jsx(Ol, {
                      size: 16,
                      className: "relative shrink-0",
                      fill: "currentColor"
                    })]
                  }), c.jsx("span", {
                    children: x(H ? "取消" : "运行")
                  })]
                }), c.jsxs("button", {
                  type: "button",
                  className: `${B} ${F}`,
                  "data-toolbar-active": "false",
                  "aria-label": x("解组"),
                  onClick: Y => M(D.id, Y),
                  children: [c.jsx(NNr, {
                    size: 16,
                    className: "shrink-0"
                  }), c.jsx("span", {
                    children: x("解组")
                  })]
                }), c.jsx("div", {
                  className: V,
                  "aria-hidden": !0
                }), o && c.jsxs("div", {
                  className: "relative shrink-0 flex items-center",
                  "data-group-layout-menu": !0,
                  children: [c.jsx("button", {
                    ref: w,
                    type: "button",
                    className: `${j} ${b ? G : N}`,
                    "data-tip": nx("布局"),
                    "data-toolbar-active": b ? "true" : "false",
                    "aria-label": x("布局"),
                    "aria-expanded": b,
                    onClick: Y => {
                      Y.stopPropagation(), C(), v(K => !K);
                    },
                    children: c.jsx(ZHe, {
                      size: 18
                    })
                  }), b && c.jsxs("div", {
                    className: `absolute left-0 top-[calc(100%+8px)] z-[200] flex flex-col gap-0.5 p-1.5 rounded-xl border min-w-[132px] backdrop-blur-xl ${d ? "bg-[rgba(28,28,32,0.82)] border-white/10 shadow-none" : "bg-[rgba(246,246,246,0.82)] border-black/[0.12] shadow-sm"}`,
                    onMouseDown: Y => Y.stopPropagation(),
                    children: [c.jsxs("button", {
                      type: "button",
                      className: O,
                      onClick: () => P(D.id, "grid"),
                      children: [c.jsx(Od, {
                        size: 16,
                        className: "shrink-0 opacity-90"
                      }), x("宫格布局")]
                    }), c.jsxs("button", {
                      type: "button",
                      className: O,
                      onClick: () => P(D.id, "horizontal"),
                      children: [c.jsx(kTn, {
                        size: 16,
                        className: "shrink-0 opacity-90"
                      }), x("水平布局")]
                    })]
                  })]
                }), c.jsx("button", {
                  ref: U ? _ : void 0,
                  type: "button",
                  className: `${j} ${U ? G : N}`,
                  "data-tip": nx("分组颜色"),
                  "data-toolbar-active": U ? "true" : "false",
                  "aria-label": x("分组颜色"),
                  onClick: Y => I(D.id, Y),
                  children: c.jsx("div", {
                    className: `w-4 h-4 rounded-full ${d ? "border border-zinc-500" : "border border-zinc-400"}`,
                    style: {
                      backgroundColor: Man(D.color, d)
                    }
                  })
                }), (l || s) && c.jsxs(c.Fragment, {
                  children: [c.jsx("div", {
                    className: V,
                    "aria-hidden": !0
                  }), l && c.jsx("button", {
                    type: "button",
                    className: `${j} ${N}`,
                    "data-tip": nx("全屏演示组内图片/视频（方向键或滚轮翻页）"),
                    "data-toolbar-active": "false",
                    "aria-label": x("演示"),
                    onClick: Y => {
                      Y.stopPropagation(), l(D.id);
                    },
                    children: c.jsx(yTn, {
                      size: 18
                    })
                  }), s && c.jsx("button", {
                    type: "button",
                    className: `${j} ${N} ${u ? "opacity-50 cursor-not-allowed" : ""}`,
                    "data-tip": nx("下载组内图片/视频/音频"),
                    "data-toolbar-active": "false",
                    "aria-label": x("下载"),
                    disabled: u,
                    onClick: Y => {
                      Y.stopPropagation(), s(D.id);
                    },
                    children: c.jsx(ws, {
                      size: 18,
                      className: u ? "animate-pulse" : ""
                    })
                  })]
                })]
              })
            })
          }, `toolbar-${D.id}`);
        })
      })]
    });
  },
  uIi = g.memo(dIi, cIi),
  hIi = ({
    selectedNodeIds: e,
    collections: t,
    groups: n = [],
    onCollect: r,
    onExpand: a,
    isDark: i = !1,
    isSelecting: o = !1
  }) => {
    on();
    const [s, l] = g.useState(""),
      [d, u] = g.useState(!1),
      [h, p] = g.useState(!1),
      m = e.size,
      f = m > 0 && !o,
      y = f && n.length > 0 ? S8n(Array.from(e), n) : !1,
      b = f && !y,
      v = g.useCallback(() => {
        const w = Array.from(e);
        w.length !== 0 && (r(w, s.trim() || void 0), l(""), u(!1));
      }, [e, s, r]),
      _ = g.useCallback(() => {
        p(w => !w);
      }, []);
    return !f && t.length === 0 ? null : c.jsxs("div", {
      className: "absolute top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto",
      style: {
        maxWidth: "min(420px, calc(100vw - 24px))"
      },
      children: [b && c.jsxs("div", {
        className: `
                        flex flex-nowrap items-center gap-2 rounded-xl border shadow-lg w-fit pr-2
                        ${i ? "bg-zinc-900/95 border-zinc-700/80 backdrop-blur-sm" : "bg-white/95 border-zinc-200 backdrop-blur-sm"}
                    `,
        children: [c.jsxs("div", {
          className: `flex flex-nowrap items-center gap-2 pl-3 py-2 pr-2 shrink-0 ${i ? "text-zinc-300" : "text-zinc-700"}`,
          children: [c.jsx(mWt, {
            size: 16,
            className: i ? "text-zinc-400" : "text-zinc-500"
          }), c.jsxs("span", {
            className: "text-xs font-medium whitespace-nowrap",
            children: [x("已选 "), c.jsx("span", {
              className: "font-semibold text-inherit",
              children: m
            }), x(" 个节点")]
          })]
        }), d ? c.jsxs("div", {
          className: "flex flex-nowrap items-center gap-1.5 py-1.5 pr-2 shrink-0",
          children: [c.jsx("input", {
            type: "text",
            value: s,
            onChange: w => l(w.target.value),
            onKeyDown: w => {
              w.key === "Enter" && v(), w.key === "Escape" && u(!1);
            },
            placeholder: x("收纳夹名称"),
            className: `
                                    w-24 px-2 py-1 text-xs rounded-md border outline-none
                                    ${i ? "bg-zinc-800 border-zinc-600 text-zinc-200 placeholder-zinc-500" : "bg-zinc-50 border-zinc-300 text-zinc-800 placeholder-zinc-400"}
                                `,
            autoFocus: !0
          }), c.jsx("button", {
            onClick: v,
            className: `px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${i ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-emerald-500 hover:bg-emerald-600 text-white"}`,
            children: x("确定")
          })]
        }) : c.jsxs("div", {
          className: "flex flex-nowrap items-center shrink-0",
          children: [c.jsx("button", {
            onClick: () => u(!0),
            className: `px-2 py-1 text-[10px] rounded-lg transition-colors whitespace-nowrap ${i ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"}`,
            title: x("自定义名称"),
            children: x("命名")
          }), c.jsxs("button", {
            onClick: v,
            className: `
                                    flex flex-nowrap items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap
                                    ${i ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-100" : "bg-zinc-800 hover:bg-zinc-700 text-white"}
                                `,
            title: x("将选中节点收纳，不显示以节约性能，连线保留"),
            children: [c.jsx(mWt, {
              size: 14
            }), x("收纳")]
          })]
        })]
      }), t.length > 0 && c.jsxs("div", {
        className: "flex flex-col items-center",
        children: [c.jsxs("button", {
          onClick: _,
          className: `
                            flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors
                            ${i ? "bg-zinc-900/90 border-zinc-700/80 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/90" : "bg-white/90 border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"}
                        `,
          children: [c.jsx(Sc, {
            size: 12
          }), x("收纳夹 ("), t.length, ")", c.jsx(Mi, {
            size: 12,
            className: `transition-transform ${h ? "rotate-180" : ""}`
          })]
        }), h && c.jsx("div", {
          className: `
                                mt-1.5 rounded-xl border shadow-lg overflow-hidden
                                ${i ? "bg-zinc-900/95 border-zinc-700/80" : "bg-white/95 border-zinc-200"}
                            `,
          children: t.map(w => c.jsxs("div", {
            className: `
                                        flex items-center justify-between gap-3 px-3 py-2 border-b last:border-b-0
                                        ${i ? "border-zinc-800" : "border-zinc-100"}
                                    `,
            children: [c.jsx("span", {
              className: `text-xs truncate max-w-[180px] ${i ? "text-zinc-300" : "text-zinc-700"}`,
              title: w.name,
              children: w.name
            }), c.jsxs("span", {
              className: `text-[10px] shrink-0 ${i ? "text-zinc-500" : "text-zinc-400"}`,
              children: [w.nodeIds.length, x(" 个节点")]
            }), c.jsxs("button", {
              onClick: () => a(w.id),
              className: `
                                            flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors
                                            ${i ? "text-emerald-400 hover:bg-zinc-800" : "text-emerald-600 hover:bg-zinc-100"}
                                        `,
              title: x("展开后节点重新显示在画布"),
              children: [c.jsx(Sc, {
                size: 10
              }), x("展开")]
            })]
          }, w.id))
        })]
      })]
    });
  };

g.memo(hIi);

function $ur({
  face: e,
  isDark: t
}) {
  return e.kind === "image" && e.thumbUrl ? c.jsx("img", {
    className: "stack-card__thumb",
    src: e.thumbUrl,
    alt: "",
    draggable: !1
  }) : e.kind === "audio" ? c.jsxs("div", {
    className: `stack-card__face stack-card__face--audio ${t ? "stack-card__face--dark" : "stack-card__face--light"}`,
    children: [e.text ? c.jsx("span", {
      className: "stack-card__face-title",
      children: e.text
    }) : null, c.jsx("div", {
      className: "stack-card__wave",
      "aria-hidden": !0,
      children: Array.from({
        length: 18
      }, (n, r) => c.jsx("span", {
        className: "stack-card__wave-bar",
        style: {
          height: `${22 + r * 7 % 28}%`
        }
      }, r))
    })]
  }) : e.kind === "text" && e.text ? c.jsx("div", {
    className: `stack-card__face stack-card__face--text ${t ? "stack-card__face--dark" : "stack-card__face--light"}`,
    children: c.jsx("p", {
      className: "stack-card__face-body",
      children: e.text
    })
  }) : c.jsx("div", {
    className: `stack-card__face stack-card__face--other ${t ? "stack-card__face--dark" : "stack-card__face--light"}`,
    children: e.text ? c.jsx("span", {
      className: "stack-card__face-title",
      children: e.text
    }) : c.jsx("span", {
      className: "stack-card__placeholder"
    })
  });
}

function XCe(e) {
  const [t, n] = g.useState(e);
  return g.useEffect(() => {
    if (e) {
      n(!0);
      return;
    }
    if (!t) return;
    const r = window.setTimeout(() => n(!1), 160);
    return () => window.clearTimeout(r);
  }, [e, t]), e || t;
}

const Fne = 14,
  pIi = new Set(["input-image", "gen-image", "gen-video", "preview", "video-input"]);

let Idn = Promise.resolve();

const Dkt = new Set();

function tAe(e) {
  var n;
  const t = String(e || "").trim();
  if (!t) return "";
  try {
    const r = new URL(t);
    return `${r.origin}${r.pathname}`.replace(/\/+$/, "");
  } catch {
    return ((n = t.split("?")[0]) == null ? void 0 : n.split("#")[0]) || t;
  }
}

function Gur(e) {
  const t = [],
    n = String(e._chipKind || "").trim(),
    r = String(e._canvasNodeId || "").trim();
  n && r && t.push(n7t(r)), r && t.push(`node:${r}`);
  const a = String(e._assetId || "").trim();
  a && t.push(`asset:${a}`);
  const i = String(e._ossRemoteUrl || e.url || "").trim(),
    o = tAe(i);
  return o && /^(https?:\/\/|local-asset:\/\/)/i.test(i) && t.push(`url:${o}`), t;
}

function Vur(e) {
  const t = [`node:${e.id}`],
    n = Sje(e);
  n && t.push(`asset:${n}`);
  const r = DJe(e),
    a = String(r._ossRemoteUrl || r._ossRemoteOriginalUrl || "").trim(),
    i = tAe(a);
  i && t.push(`url:${i}`);
  const o = typeof e.content == "string" ? e.content.trim() : "",
    s = tAe(o);
  return s && /^(https?:\/\/|local-asset:\/\/)/i.test(o) && t.push(`url:${s}`), t;
}

function mIi(e) {
  const t = [`node:${e.nodeId}`];
  e.assetId && t.push(`asset:${e.assetId}`);
  const n = tAe(e.ossRemoteUrl || "");
  n && t.push(`url:${n}`);
  const r = tAe(e.sourceUrl || "");
  return r && /^(https?:\/\/|local-asset:\/\/)/i.test(e.sourceUrl) && t.push(`url:${r}`), t;
}

function loe(e) {
  const t = new Set();
  for (const n of e) for (const r of Gur(n)) t.add(r);
  return t;
}

function fIi(e, t, n = Dkt) {
  const r = loe(t),
    a = [];
  for (const i of e) {
    if (n.has(i.id)) continue;
    const o = Vur(i);
    if (!o.some(s => r.has(s))) {
      for (const s of o) r.add(s);
      a.push(i);
    }
  }
  return a;
}

function DJe(e) {
  return e.settings || {};
}

function Sje(e) {
  var n;
  const t = DJe(e);
  return String(typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof e._contentAssetId == "string" && ((n = e._contentAssetId) == null ? void 0 : n.trim()) || "").trim();
}

function gIi(e) {
  const t = DJe(e);
  return t.mediaType === "audio" ? "audio" : e.type === "gen-video" || e.type === "video-input" || t.mediaType === "video" ? "video" : "image";
}

function Lkt(e, t) {
  const n = t === "video" ? "mp4" : t === "audio" ? "mp3" : "png",
    r = String(e.nodeName || "").trim();
  return r && /\.[a-z0-9]{2,8}$/i.test(r) ? r : r ? `${r}.${n}` : t === "video" ? `CanvasVideo-${e.id.slice(0, 8)}.mp4` : t === "audio" ? `CanvasAudio-${e.id.slice(0, 8)}.mp3` : `CanvasImage-${e.id.slice(0, 8)}.png`;
}

function Hur(e) {
  return e === "video" ? "video/mp4" : e === "audio" ? "audio/mpeg" : "image/png";
}

async function Cdn(e) {
  const t = String(e || "").trim();
  if (!t || !Er.isContentRef(t)) return t;
  try {
    await Er.init();
    const n = await Er.get(Er.extractId(t));
    return String(n || "").trim() || t;
  } catch (n) {
    return console.warn("[Chat] 框选素材 content_ref 解析失败:", n), t;
  }
}

function yIi(e) {
  return !!(e && pIi.has(e.type));
}

function bIi(e) {
  return [...e].sort((t, n) => {
    const r = NJ(t.id, {
        x: t.x,
        y: t.y
      }),
      a = NJ(n.id, {
        x: n.x,
        y: n.y
      });
    return r.x !== a.x ? r.x - a.x : r.y !== a.y ? r.y - a.y : t.id.localeCompare(n.id);
  });
}

function vIi(e, t) {
  if (!e.length || !t.length) return [];
  const n = new Map(t.map(a => [a.id, a])),
    r = [];
  for (const a of e) {
    const i = n.get(a);
    yIi(i) && r.push(i);
  }
  return bIi(r);
}

function wIi(e, t, n) {
  const r = loe(n),
    a = [];
  for (const i of tua(e, t)) {
    if (!QGn(i)) continue;
    const o = [n7t(i.id), `node:${i.id}`];
    if (!o.some(s => r.has(s))) {
      for (const s of o) r.add(s);
      a.push(i);
    }
  }
  return a;
}

async function xIi(e) {
  const {
      collectInputImageOssOriginalCandidates: t,
      getInputImageOssRemoteUrl: n,
      getInputImagePrimaryAssetId: r,
      getInputImageDisplayUrl: a,
      getGenNodeOssOriginalUrl: i,
      getGenNodeOssDisplayUrl: o,
      isGlobalOssUrlOnlyNode: s,
      isOssPublicHttpUrl: l,
      OSS_REMOTE_URL_SETTING_KEY: d
    } = await Ie(async () => {
      const {
        collectInputImageOssOriginalCandidates: j,
        getInputImageOssRemoteUrl: B,
        getInputImagePrimaryAssetId: F,
        getInputImageDisplayUrl: N,
        getGenNodeOssOriginalUrl: G,
        getGenNodeOssDisplayUrl: z,
        isGlobalOssUrlOnlyNode: V,
        isOssPublicHttpUrl: O,
        OSS_REMOTE_URL_SETTING_KEY: L
      } = await Promise.resolve().then(() => ii);
      return {
        collectInputImageOssOriginalCandidates: j,
        getInputImageOssRemoteUrl: B,
        getInputImagePrimaryAssetId: F,
        getInputImageDisplayUrl: N,
        getGenNodeOssOriginalUrl: G,
        getGenNodeOssDisplayUrl: z,
        isGlobalOssUrlOnlyNode: V,
        isOssPublicHttpUrl: O,
        OSS_REMOTE_URL_SETTING_KEY: L
      };
    }, void 0, import.meta.url),
    {
      getGenImageVideoOutputUrlAndAssetId: u
    } = await Ie(async () => {
      const {
        getGenImageVideoOutputUrlAndAssetId: j
      } = await Promise.resolve().then(() => LM);
      return {
        getGenImageVideoOutputUrlAndAssetId: j
      };
    }, void 0, import.meta.url),
    {
      isVideoUrl: h
    } = await Ie(async () => {
      const {
        isVideoUrl: j
      } = await Promise.resolve().then(() => pg);
      return {
        isVideoUrl: j
      };
    }, void 0, import.meta.url),
    {
      getCanvasNodeThumbSyncUrl: p
    } = await Ie(async () => {
      const {
        getCanvasNodeThumbSyncUrl: j
      } = await Promise.resolve().then(() => FIt);
      return {
        getCanvasNodeThumbSyncUrl: j
      };
    }, void 0, import.meta.url),
    {
      isCanvasLocalCacheMode: m
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: j
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: j
      };
    }, void 0, import.meta.url),
    {
      acceptChatListDisplayUrl: f
    } = await Ie(async () => {
      const {
        acceptChatListDisplayUrl: j
      } = await Promise.resolve().then(() => MD);
      return {
        acceptChatListDisplayUrl: j
      };
    }, void 0, import.meta.url),
    y = DJe(e),
    b = m(),
    v = typeof e.content == "string" ? e.content.trim() : "",
    _ = await Cdn(v),
    w = p(e);
  let k = "",
    A = "",
    S = "";
  const C = y.mediaType === "audio";
  let I = !1;
  if (e.type === "input-image") k = t(e)[0] || n(e) || "", A = a(e) || w || _, S = r(e) || Sje(e), I = !C && (y.mediaType === "video" || h(k || A || _));else if (e.type === "gen-image" || e.type === "gen-video") {
    const j = u(e);
    k = i(e) || "", A = o(e) || w || String((j == null ? void 0 : j.url) || "").trim() || _, S = (j == null ? void 0 : j.assetId) || Sje(e), I = !C && (e.type === "gen-video" || y.mediaType === "video" || h(k || A || _));
  } else if (e.type === "preview" || e.type === "video-input") k = String(y[d] || y._ossRemoteUrl || "").trim(), k && !l(k) && (k = ""), A = w || _, S = Sje(e), I = !C && (e.type === "video-input" || y.mediaType === "video" || h(k || A || _));else return null;
  const E = await Cdn(k || A || _);
  if (!E && !S) return null;
  const M = b && !!S && !s(e),
    T = (k && l(k) ? k : "") || (l(E) ? E : ""),
    P = C ? "audio" : I ? "video" : "image",
    R = Lkt(e, P);
  return {
    nodeId: e.id,
    name: R,
    mimeType: Hur(P),
    isImage: P === "image",
    isVideo: P === "video",
    isAudio: P === "audio",
    sourceUrl: E,
    assetId: M ? S : void 0,
    ossRemoteUrl: T || void 0,
    seededPreview: P === "audio" ? void 0 : f(A) || f(w) || void 0
  };
}

function Ite(e, t) {
  q5(n => {
    const r = n.findIndex(i => i._pendingToken === e);
    if (r < 0) {
      if (!t || n.length >= Fne) return n;
      const i = Gur(t),
        o = loe(n);
      return i.some(s => o.has(s)) ? n : [...n, t];
    }
    if (!t) return n.filter((i, o) => o !== r);
    const a = [...n];
    return a[r] = t, a;
  });
}

async function Edn(e, t, n = []) {
  if (!h5() || !e.length) return;
  const r = [...Pyt(new Set(e), t, n)],
    a = _de(),
    i = wIi(r, t, a),
    o = fIi(vIi(r, t), a);
  if (!i.length && !o.length) return;
  const s = a.length,
    l = Math.max(0, Fne - s);
  if (l <= 0) {
    alert(x("最多只能上传{0}个文件，当前已有{1}个", Fne, s));
    return;
  }
  const d = i.slice(0, l),
    u = Math.max(0, l - d.length),
    h = o.slice(0, u);
  if (i.length + o.length > l && alert(x("最多只能上传{0}个文件，已按从左到右加入{1}个，其余已忽略", Fne, l)), d.length && q5(p => {
    let m = Math.max(0, Fne - p.length);
    if (m <= 0) return p;
    const f = loe(p),
      y = [];
    for (const b of d) {
      if (m <= 0) break;
      const v = QGn(b, {
        selectedIds: r,
        nodes: t,
        groups: n
      });
      if (!v) continue;
      const _ = [n7t(b.id), `node:${b.id}`];
      if (!_.some(w => f.has(w))) {
        y.push(v);
        for (const w of _) f.add(w);
        m--;
      }
    }
    return y.length ? [...y, ...p] : p;
  }), !!h.length) {
    for (const p of h) Dkt.add(p.id);
    try {
      const p = Date.now(),
        m = h.map((y, b) => ({
          node: y,
          token: `box_${y.id}_${p}_${b}`,
          index: b
        }));
      q5(y => {
        let b = Math.max(0, Fne - y.length);
        if (b <= 0) return y;
        const v = loe(y),
          _ = [];
        for (const w of m) {
          if (b <= 0) break;
          const k = Vur(w.node);
          if (k.some(S => v.has(S))) continue;
          const A = gIi(w.node);
          _.push({
            name: Lkt(w.node, A),
            displayName: Lkt(w.node, A),
            type: Hur(A),
            isImage: A === "image",
            isVideo: A === "video",
            isAudio: A === "audio",
            _pendingToken: w.token,
            _canvasNodeId: w.node.id
          });
          for (const S of k) v.add(S);
          b--;
        }
        return _.length ? [...y, ..._] : y;
      });
      const {
        buildChatComposerMediaFromUrl: f
      } = await Ie(async () => {
        const {
          buildChatComposerMediaFromUrl: y
        } = await Promise.resolve().then(() => MD);
        return {
          buildChatComposerMediaFromUrl: y
        };
      }, void 0, import.meta.url);
      for (const y of m) {
        if (!h5()) {
          Ite(y.token, null);
          continue;
        }
        try {
          const b = await xIi(y.node);
          if (!b) {
            Ite(y.token, null);
            continue;
          }
          const v = _de().filter(k => k._pendingToken !== y.token),
            _ = loe(v);
          if (mIi(b).some(k => _.has(k))) {
            Ite(y.token, null);
            continue;
          }
          b.seededPreview && q5(k => {
            const A = k.findIndex(I => I._pendingToken === y.token);
            if (A < 0) return k;
            const S = k[A],
              C = [...k];
            return C[A] = {
              ...S,
              name: b.name,
              displayName: b.name,
              type: b.mimeType,
              preview: b.seededPreview,
              isImage: b.isImage,
              isVideo: b.isVideo,
              isAudio: b.isAudio,
              _canvasNodeId: b.nodeId
            }, C;
          });
          const w = await f({
            sourceUrl: b.sourceUrl,
            assetId: b.assetId,
            seededPreview: b.seededPreview,
            name: b.name,
            isImage: b.isImage,
            isVideo: b.isVideo,
            isAudio: b.isAudio,
            mimeType: b.mimeType,
            index: (p + y.index) % 1e5,
            ossRemoteUrl: b.ossRemoteUrl
          });
          if (!w) {
            Ite(y.token, null);
            continue;
          }
          Ite(y.token, {
            ...w,
            _pendingToken: void 0,
            _canvasNodeId: b.nodeId
          });
        } catch (b) {
          console.warn("[Chat] 框选素材添加到对话失败:", b), Ite(y.token, null);
        }
      }
    } finally {
      for (const p of h) Dkt.delete(p.id);
    }
  }
}

function Wur(e, t, n = []) {
  const r = Idn.then(() => Edn(e, t, n), () => Edn(e, t, n));
  return Idn = r.then(() => {}, () => {}), r;
}

function _Ii({
  items: e,
  kind: t,
  isDark: n,
  onSettled: r
}) {
  const [a, i] = g.useState(!1),
    o = g.useRef(!1),
    s = t === "entry" ? DR : Yge,
    l = t === "entry" ? jjr() : Djr(e.length);
  return g.useLayoutEffect(() => {
    if (o.current = !1, e.length === 0) {
      r();
      return;
    }
    if (Njr()) {
      r();
      return;
    }
    i(!1);
    let d = 0;
    const u = window.requestAnimationFrame(() => {
        d = window.requestAnimationFrame(() => i(!0));
      }),
      h = window.setTimeout(() => {
        o.current || (o.current = !0, r());
      }, l);
    return () => {
      window.cancelAnimationFrame(u), window.cancelAnimationFrame(d), window.clearTimeout(h);
    };
  }, [e, r, l]), c.jsx("div", {
    className: "pointer-events-none absolute inset-0 z-[140]",
    "aria-hidden": !0,
    children: e.map(d => {
      const u = a ? d.to : d.from,
        h = FEt(d.staggerIndex, s.staggerMs, s.maxStagger),
        p = a ? h : 0,
        m = a && t === "entry" ? h + DR.rotationDelayMs : a ? h : 0,
        f = u.cx - u.width / 2,
        y = u.cy - u.height / 2;
      return c.jsx("div", {
        className: "box-select-pile-anim-card",
        style: {
          width: u.width,
          height: u.height,
          zIndex: 20 + d.zIndex,
          transform: `translate(${f}px, ${y}px) scale(${u.scale})`,
          transition: a ? `transform ${s.movementMs}ms ${Pjr} ${p}ms` : "none"
        },
        children: c.jsx("div", {
          className: `box-select-pile-anim-card__face ${n ? "box-select-pile-anim-card__face--dark" : "box-select-pile-anim-card__face--light"}`,
          style: {
            transform: `rotate(${u.rotate}deg)`,
            transition: a ? `transform ${s.rotationMs}ms ${Rjr} ${m}ms` : "none"
          },
          children: c.jsx($ur, {
            face: d.face,
            isDark: n
          })
        })
      }, d.id);
    })
  });
}

let Ije = new Set();

const Okt = new Set();

function kIi() {
  Okt.forEach(e => e());
}

function AIi(e) {
  return Okt.add(e), () => {
    Okt.delete(e);
  };
}

function Tdn() {
  return Ije;
}

function Ofe(e) {
  const t = new Set(e);
  t.size === Ije.size && [...t].every(n => Ije.has(n)) || (Ije = t, kIi());
}

function SIi() {
  return g.useSyncExternalStore(AIi, Tdn, Tdn);
}

const IIi = 160;

function Mdn(e, t) {
  return e ? 100 : t ? 15 : 10;
}

function CIi(e, t) {
  const n = t.filter(s => e.has(s.id));
  if (n.length === 0) return null;
  let r = 1 / 0,
    a = 1 / 0,
    i = -1 / 0,
    o = -1 / 0;
  return n.forEach(s => {
    r = Math.min(r, s.x), a = Math.min(a, s.y), i = Math.max(i, s.x + s.width), o = Math.max(o, s.y + s.height);
  }), {
    centerX: (r + i) / 2,
    centerY: (a + o) / 2,
    minX: r,
    minY: a
  };
}

const EIi = ({
    view: e,
    nodes: t,
    groups: n,
    selectedNodeIds: r,
    isSelecting: a,
    showCollectionPopup: i,
    onCreateGroup: o,
    onStackCollapse: s,
    onArrangeNodes: l,
    onExpand: d,
    onClearSelection: u,
    updateCollectionPosition: h,
    onCollectionDragFrame: p,
    onCollectionDragStart: m,
    onCollectionDragEnd: f,
    onDeleteStack: y,
    onStartGroupConnect: b,
    connectingGroupId: v = null,
    blockGroupConnect: _ = !1,
    hoveredGroupId: w,
    onGroupHover: k,
    onGroupSelect: A,
    onDownloadSelected: S,
    isDownloading: C = !1,
    onDemoSelected: I,
    canDemoSelected: E = !1,
    onSaveToMaterialLibrary: M,
    isDark: T = !1
  }) => {
    on();
    const P = RBt(),
      R = w !== void 0 ? w : P,
      j = We => {
        FQ(We), k == null || k(We);
      },
      [B, F] = g.useState(null),
      [N, G] = g.useState(null),
      z = g.useRef(null),
      V = g.useRef(null),
      O = g.useRef(null),
      L = g.useRef([]),
      [D, U] = g.useState(!1),
      H = g.useRef(null),
      [Y, K] = g.useState(null),
      [W, Q] = g.useState(null),
      q = g.useRef(null),
      [ne, de] = g.useState(null),
      le = g.useRef(null),
      J = g.useRef(null),
      pe = g.useRef(null),
      ce = g.useMemo(() => n.filter(We => We.collapsed), [n]),
      we = g.useMemo(() => ce.filter(We => We.stackMode !== "card"), [ce]),
      X = g.useMemo(() => ce.filter(We => We.stackMode === "card"), [ce]),
      Z = r.size > 0;
    g.useEffect(() => {
      Y || Z && Q(null);
    }, [Z, Y]), g.useEffect(() => {
      const We = ce.map(Ge => Ge.id);
      if (q.current == null) {
        q.current = new Set(We);
        return;
      }
      let Ze = null;
      for (const Ge of We) q.current.has(Ge) || (Ze = Ge);
      q.current = new Set(We), Ze && Q(Ze);
    }, [ce]);
    const re = g.useMemo(() => S8n(Array.from(r), n), [r, n]),
      fe = g.useMemo(() => CIi(r, t), [r, t]),
      ye = g.useMemo(() => {
        if (r.size < 2) return null;
        const We = pWe(Array.from(r), t);
        return We.width <= 0 || We.height <= 0 ? null : We;
      }, [r, t]),
      ie = r.size > 0 && !a && i && !re,
      ae = ie && !!fe && !!ye && B == null,
      be = XCe(ae) && B == null,
      Ee = g.useRef(ye);
    ae && ye && (Ee.current = ye);
    const xe = ae ? ye : Ee.current,
      he = g.useMemo(() => ie ? t.filter(We => r.has(We.id) && UD(We)) : [], [ie, t, r]),
      ue = g.useMemo(() => he.map(We => We.id), [he]),
      ge = g.useMemo(() => Bza(he), [he]),
      _e = g.useMemo(() => Fza(ge), [ge]),
      ke = g.useRef(null);
    Qp(ke, "50% 100%", be), Qp(z, "50% 100%", !!N && !Y && !B), g.useLayoutEffect(() => {
      if (!ie || r.size < 2 || typeof document > "u") return;
      const We = document.body;
      !We.classList.contains("canvas-box-select-group-dragging") && !We.classList.contains("canvas-node-dragging") || Hcr();
    }, [ie, r, t, ye, e.zoom]);
    const ve = g.useMemo(() => {
        const We = new Map();
        return ce.forEach(Ze => {
          if (Ze.collapsedX != null && Ze.collapsedY != null) We.set(Ze.id, {
            x: Ze.collapsedX,
            y: Ze.collapsedY
          });else {
            const Ge = WN(Ze.nodeIds, t),
              Oe = Ge.width > 0 ? Ge.x + Ge.width / 2 : 200,
              st = Ge.height > 0 ? Ge.y + Ge.height / 2 : 200;
            We.set(Ze.id, {
              x: Oe,
              y: st
            });
          }
        }), We;
      }, [ce, t]),
      Te = g.useCallback(() => {
        const We = O.current;
        O.current = null, F(null), We == null || We();
      }, []),
      Ne = g.useRef(f);
    Ne.current = f, g.useEffect(() => () => {
      var We, Ze;
      O.current = null, V.current != null && (window.clearTimeout(V.current), V.current = null), Ofe([]), D9e(!1), (Ze = Ne.current) == null || Ze.call(Ne, ((We = le.current) == null ? void 0 : We.groupId) ?? ""), L.current.length > 0 && (WLe(L.current, !1), L.current = []);
    }, []);
    const me = g.useCallback(() => {
        const We = Array.from(r);
        if (We.length < 2 || !s) return;
        const Ze = t.filter(Ht => r.has(Ht.id)),
          Ge = w8n(Ze),
          Oe = {
            x: Ge.center.x,
            y: Ge.center.y
          },
          st = Fjr(Ze);
        st.length >= 2 && (L.current = We, WLe(We, !0), Ofe(We)), u();
        const vt = () => {
          s(We, Oe), Wjr(We), Ofe([]), L.current = [];
        };
        if (st.length < 2) {
          vt();
          return;
        }
        O.current = vt, F({
          items: st,
          kind: "entry"
        });
      }, [r, t, s, u]),
      Ae = g.useCallback(We => {
        const Ze = n.find(nn => nn.id === We);
        if (!Ze) return;
        const Ge = ve.get(We),
          {
            width: Oe,
            height: st
          } = zmt(Ze, t),
          vt = Ge ? $jr(Ze, t, {
            width: Oe,
            height: st,
            centerX: Ge.x,
            centerY: Ge.y
          }) : [],
          Ht = () => {
            d(We), Ofe([]);
          };
        if (Ofe(Ze.nodeIds), vt.length === 0) {
          Ht();
          return;
        }
        O.current = Ht, F({
          items: vt,
          kind: "unstack",
          hideStackGroupId: We
        });
      }, [n, t, ve, d]),
      Fe = g.useCallback(() => {
        const We = Array.from(r);
        We.length < 2 || !o || (o(We), u());
      }, [r, o, u]),
      Me = g.useCallback(We => {
        r.size < 2 || !l || !ye || (U(!1), l(We, nlr(ye)));
      }, [r, l, ye]),
      Re = g.useCallback(We => {
        const Ze = We != null && We.length ? We : Array.from(r);
        Ze.length && (OY(), window.setTimeout(() => {
          Wur(Ze, t, n);
        }, 100));
      }, [r, t, n]),
      $e = We => {
        V.current != null && (window.clearTimeout(V.current), V.current = null), G(We), j(We);
      },
      rt = () => {
        V.current != null && window.clearTimeout(V.current), V.current = window.setTimeout(() => {
          V.current = null, G(null), j(null);
        }, 200);
      },
      nt = g.useCallback((We, Ze, Ge) => {
        const Oe = document.querySelector(`[data-stack-card="${We}"]`);
        Oe && (Oe.style.left = `${Ze}px`, Oe.style.top = `${Ge}px`);
      }, []),
      ze = g.useCallback((We, Ze, Ge, Oe) => {
        if (Oe) {
          nt(We, Ze, Ge);
          return;
        }
        const st = document.querySelector(`[data-collection-folder="${We}"]`);
        st && (st.style.left = `${Ze}px`, st.style.top = `${Ge}px`);
      }, [nt]),
      Le = g.useCallback((We, Ze, Ge, Oe) => {
        pe.current = {
          groupId: We,
          x: Ze,
          y: Ge,
          isStack: Oe
        }, J.current == null && (J.current = requestAnimationFrame(() => {
          J.current = null;
          const st = pe.current;
          pe.current = null, st && (ze(st.groupId, st.x, st.y, st.isStack), de({
            groupId: st.groupId,
            x: st.x,
            y: st.y
          }), p == null || p(st.groupId, st.x, st.y));
        }));
      }, [ze, p]),
      Ke = g.useCallback((We, Ze, Ge, Oe, st) => {
        Ze.button === 0 && (Ze.preventDefault(), Ze.stopPropagation(), A == null || A(We), Q(We), le.current = {
          groupId: We,
          startX: Ge,
          startY: Oe,
          clientX: Ze.clientX,
          clientY: Ze.clientY,
          moved: !1,
          isStack: st
        }, st && (de(null), D9e(!0), m == null || m(We, Ge, Oe)), K(We));
      }, [A, m]);
    if (g.useEffect(() => {
      if (!Y) return;
      const We = () => {
          J.current != null && (cancelAnimationFrame(J.current), J.current = null);
          const Ge = pe.current;
          pe.current = null;
          const Oe = le.current;
          if (Oe != null && Oe.moved && Oe.pendingX != null && Oe.pendingY != null) {
            const st = Oe.pendingX,
              vt = Oe.pendingY;
            Ge && (ze(Ge.groupId, Ge.x, Ge.y, Ge.isStack), de({
              groupId: Ge.groupId,
              x: Ge.x,
              y: Ge.y
            }), p == null || p(Ge.groupId, Ge.x, Ge.y)), Oe.isStack && (f == null || f(Oe.groupId, st, vt)), h(Oe.groupId, st, vt);
          } else Oe != null && Oe.isStack && (f == null || f(Oe.groupId, Oe.startX, Oe.startY));
          le.current = null, de(null), D9e(!1), K(null);
        },
        Ze = Ge => {
          const Oe = le.current;
          if (!Oe || Oe.groupId !== Y) return;
          if (!(Ge.buttons & 1)) {
            We();
            return;
          }
          const st = Ge.clientX - Oe.clientX,
            vt = Ge.clientY - Oe.clientY;
          if (!Oe.moved && Math.hypot(st, vt) < 4) return;
          Oe.moved = !0;
          const Ht = Oe.startX + st / e.zoom,
            nn = Oe.startY + vt / e.zoom;
          Oe.pendingX = Ht, Oe.pendingY = nn, Le(Oe.groupId, Ht, nn, Oe.isStack);
        };
      return window.addEventListener("mousemove", Ze), window.addEventListener("mouseup", We), () => {
        J.current != null && (cancelAnimationFrame(J.current), J.current = null), pe.current = null, window.removeEventListener("mousemove", Ze), window.removeEventListener("mouseup", We);
      };
    }, [Y, e.zoom, h, Le, f]), g.useEffect(() => {
      U(!1);
    }, [ie, i, r]), g.useEffect(() => {
      if (!D) return;
      const We = Ze => {
        var Oe;
        const Ge = Ze.target;
        Ge != null && Ge.closest("[data-arrange-menu]") || (Oe = H.current) != null && Oe.contains(Ge ?? null) || U(!1);
      };
      return document.addEventListener("mousedown", We, !0), () => document.removeEventListener("mousedown", We, !0);
    }, [D]), !ie && we.length === 0 && X.length === 0 && !B) return null;
    const Xe = (We = !1, Ze = "") => $P(T, We, Ze),
      De = (We = !1, Ze = "") => $P(T, We, `toolbar-float-label ${Ze}`),
      Ye = (We = !1) => `flex w-full items-center gap-2 whitespace-nowrap px-3.5 py-2 text-left text-xs transition-colors ${We ? T ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-900" : T ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
      Ce = fpe(T),
      He = r.size >= 2,
      Ve = !!(l && He),
      it = !!(o && He),
      It = !!(s && He),
      Ft = !!(M || I || S || ue.length > 0);
    return c.jsx(c.Fragment, {
      children: c.jsx("div", {
        className: "absolute inset-0 pointer-events-none",
        children: c.jsxs("div", {
          className: "absolute inset-0 pointer-events-none",
          children: [be && xe && c.jsx("div", {
            "data-box-select-toolbar": !0,
            className: `absolute ${ae ? "pointer-events-auto" : "pointer-events-none"}`,
            style: {
              ...mJ(xe),
              zIndex: 130
            },
            children: c.jsx("div", {
              ref: ke,
              style: {
                transition: "none"
              },
              children: c.jsx("div", {
                className: ae ? "canvas-top-toolbar-enter" : "canvas-top-toolbar-exit pointer-events-none",
                onClick: We => We.stopPropagation(),
                onPointerDown: We => We.stopPropagation(),
                onMouseDown: We => We.stopPropagation(),
                children: c.jsx("div", {
                  "data-canvas-pin-toolbar": "",
                  "data-canvas-float-toolbar": "",
                  className: UP(T),
                  children: c.jsxs("div", {
                    className: "flex items-center",
                    children: [Ve && c.jsxs("div", {
                      className: "relative flex items-center",
                      "data-arrange-menu": !0,
                      children: [c.jsxs("button", {
                        ref: H,
                        type: "button",
                        onClick: We => {
                          We.stopPropagation(), U(Ze => !Ze);
                        },
                        className: De(D),
                        "data-toolbar-active": D ? "true" : "false",
                        "aria-label": x("整理"),
                        "aria-expanded": D,
                        children: [c.jsx(ZHe, {
                          size: 16
                        }), c.jsx("span", {
                          children: x("整理")
                        })]
                      }), c.jsxs(yg, {
                        open: D,
                        anchorRef: H,
                        isDark: T,
                        placement: "below",
                        align: "center",
                        gap: 6,
                        dataPortalAttr: "data-arrange-menu",
                        minWidth: 136,
                        className: "inline-flex w-max flex-col py-1.5",
                        zIndex: 10200,
                        children: [c.jsxs("button", {
                          type: "button",
                          className: Ye(!1),
                          onClick: () => Me("grid"),
                          children: [c.jsx(Od, {
                            size: 14,
                            className: "shrink-0"
                          }), c.jsx("span", {
                            children: x("宫格排列")
                          })]
                        }), c.jsxs("button", {
                          type: "button",
                          className: Ye(!1),
                          onClick: () => Me("horizontal"),
                          children: [c.jsx(kTn, {
                            size: 14,
                            className: "shrink-0"
                          }), c.jsx("span", {
                            children: x("水平排列")
                          })]
                        }), c.jsxs("button", {
                          type: "button",
                          className: Ye(!1),
                          onClick: () => Me("vertical"),
                          children: [c.jsx(X$, {
                            size: 14,
                            className: "shrink-0"
                          }), c.jsx("span", {
                            children: x("垂直排列")
                          })]
                        })]
                      })]
                    }), it && c.jsxs("button", {
                      type: "button",
                      onClick: We => {
                        We.stopPropagation(), U(!1), Fe();
                      },
                      className: De(),
                      "data-toolbar-active": "false",
                      "aria-label": x("打组"),
                      children: [c.jsx(ZRr, {
                        size: 16,
                        strokeWidth: 1.75
                      }), c.jsx("span", {
                        children: x("打组")
                      })]
                    }), It && c.jsxs("button", {
                      type: "button",
                      onClick: We => {
                        We.stopPropagation(), U(!1), me();
                      },
                      className: De(),
                      "data-toolbar-active": "false",
                      "aria-label": x("折叠"),
                      children: [c.jsx(Y2, {
                        size: 16
                      }), c.jsx("span", {
                        children: x("折叠")
                      })]
                    }), c.jsxs("button", {
                      type: "button",
                      onClick: We => {
                        We.stopPropagation(), U(!1), Re();
                      },
                      className: De(),
                      "data-toolbar-active": "false",
                      "aria-label": x("发送到对话"),
                      children: [c.jsx(qv, {
                        size: 16
                      }), c.jsx("span", {
                        children: x("发送到对话")
                      })]
                    }), Ft && c.jsx("div", {
                      "data-toolbar-divider": "",
                      className: Ce,
                      "aria-hidden": !0
                    }), M && c.jsxs("button", {
                      type: "button",
                      onClick: We => {
                        We.stopPropagation(), U(!1), M();
                      },
                      className: De(),
                      "data-toolbar-active": "false",
                      "aria-label": x("保存到素材库"),
                      children: [c.jsx(mu, {
                        size: 16
                      }), c.jsx("span", {
                        children: x("保存到素材库")
                      })]
                    }), ue.length > 0 && c.jsx($D, {
                      nodeIds: ue,
                      pins: _e,
                      toggleStates: ge,
                      isDark: T,
                      size: "compact"
                    }), I && c.jsx("button", {
                      type: "button",
                      onClick: We => {
                        We.stopPropagation(), U(!1), I();
                      },
                      disabled: !E,
                      className: Xe(!1, E ? "" : "opacity-50 cursor-not-allowed"),
                      "data-tip": nx("全屏演示选中的图片/视频（方向键或滚轮翻页）"),
                      "data-toolbar-active": "false",
                      "aria-label": x("演示"),
                      children: c.jsx(yTn, {
                        size: 16
                      })
                    }), S && c.jsx("button", {
                      type: "button",
                      onClick: We => {
                        We.stopPropagation(), U(!1), S(r);
                      },
                      disabled: C,
                      className: Xe(!1, C ? "opacity-50 cursor-not-allowed" : ""),
                      "data-tip": nx("批量下载选中的图片/视频/音频节点（音频将转为 MP3 保存到指定目录）"),
                      "data-toolbar-active": "false",
                      "aria-label": x("下载"),
                      children: c.jsx(ws, {
                        size: 16,
                        className: C ? "animate-pulse" : ""
                      })
                    })]
                  })
                })
              })
            })
          }), we.map(We => {
            const Ze = ve.get(We.id);
            if (!Ze) return null;
            const Ge = Y === We.id,
              Oe = (ne == null ? void 0 : ne.groupId) === We.id ? ne : null,
              st = (Oe == null ? void 0 : Oe.x) ?? Ze.x,
              vt = (Oe == null ? void 0 : Oe.y) ?? Ze.y;
            return c.jsxs("div", {
              "data-collection-folder": We.id,
              className: `absolute pointer-events-auto rounded-xl border transition-colors ${Ge ? "opacity-90 scale-[1.02]" : ""} ${T ? "bg-zinc-900/95 border-zinc-700/80 shadow-none" : "bg-white/95 border-zinc-200 shadow-sm"}`,
              style: {
                left: st,
                top: vt,
                transform: "translate(-50%, -50%)",
                minWidth: IIi,
                zIndex: Mdn(Ge, !Z && W === We.id)
              },
              title: x("拖入节点收纳；点击展开恢复显示"),
              children: [c.jsxs("div", {
                className: `
                                    flex items-center gap-2 px-3 py-2 cursor-grab active:cursor-grabbing
                                    ${T ? "border-b border-zinc-800" : "border-b border-zinc-100"}
                                `,
                onMouseDown: Ht => Ke(We.id, Ht, st, vt, !1),
                children: [c.jsx(XRr, {
                  size: 12,
                  className: T ? "text-zinc-500" : "text-zinc-400"
                }), c.jsx(Sc, {
                  size: 14,
                  className: T ? "text-zinc-400" : "text-zinc-500"
                }), c.jsx("span", {
                  className: `text-xs font-medium truncate flex-1 ${T ? "text-zinc-300" : "text-zinc-700"}`,
                  title: We.name,
                  children: We.name
                }), c.jsxs("span", {
                  className: `text-[10px] shrink-0 ${T ? "text-zinc-500" : "text-zinc-400"}`,
                  children: [We.nodeIds.length, x(" 个节点")]
                })]
              }), c.jsx("div", {
                className: "flex justify-end px-2 py-1.5",
                children: c.jsxs("button", {
                  onClick: () => d(We.id),
                  className: `
                                        flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium pointer-events-auto
                                        ${T ? "text-emerald-400 hover:bg-zinc-800" : "text-emerald-600 hover:bg-zinc-100"}
                                    `,
                  title: x("展开后节点重新显示"),
                  children: [c.jsx(Sc, {
                    size: 10
                  }), x("展开")]
                })
              })]
            }, We.id);
          }), X.filter(We => We.id !== (B == null ? void 0 : B.hideStackGroupId)).map(We => {
            const Ze = ve.get(We.id);
            if (!Ze) return null;
            const Ge = Y === We.id,
              {
                width: Oe,
                height: st
              } = zmt(We, t),
              vt = N === We.id || R === We.id,
              Ht = Ojr(We.nodeIds, t, vt ? Mjr : b8n),
              nn = N === We.id && !Ge && !B,
              pt = (ne == null ? void 0 : ne.groupId) === We.id ? ne : null,
              lt = (pt == null ? void 0 : pt.x) ?? Ze.x,
              gt = (pt == null ? void 0 : pt.y) ?? Ze.y;
            return c.jsx("div", {
              "data-stack-card": We.id,
              className: `stack-card-host absolute pointer-events-auto ${Ge ? "stack-card-host--dragging" : ""}`,
              style: {
                left: lt,
                top: gt,
                transform: "translate(-50%, -50%)",
                zIndex: Mdn(Ge, !Z && W === We.id)
              },
              onMouseEnter: () => $e(We.id),
              onMouseLeave: Ut => {
                const _t = Ut.relatedTarget;
                _t instanceof HTMLElement && _t.closest(`[data-stack-card="${We.id}"]`) || rt();
              },
              children: c.jsxs("div", {
                className: "stack-card-body relative",
                style: {
                  width: Oe,
                  height: st
                },
                children: [nn ? c.jsxs(c.Fragment, {
                  children: [c.jsx("div", {
                    "aria-hidden": !0,
                    className: "absolute inset-x-0 z-10 pointer-events-auto nodrag nopan",
                    style: {
                      top: -38,
                      height: 38
                    },
                    onMouseEnter: () => $e(We.id)
                  }), c.jsx("div", {
                    className: "absolute left-1/2 z-20 pointer-events-auto nodrag nopan",
                    style: {
                      top: 0,
                      transform: `translate(-50%, calc(-100% - ${Her}px))`,
                      transformOrigin: "50% 100%"
                    },
                    onMouseDown: Ut => Ut.stopPropagation(),
                    children: c.jsx("div", {
                      ref: z,
                      style: {
                        transition: "none"
                      },
                      children: c.jsx("div", {
                        className: "canvas-top-toolbar-enter",
                        onClick: Ut => Ut.stopPropagation(),
                        onPointerDown: Ut => Ut.stopPropagation(),
                        onMouseDown: Ut => Ut.stopPropagation(),
                        children: c.jsx("div", {
                          "data-canvas-float-toolbar": "",
                          className: UP(T),
                          children: c.jsxs("div", {
                            className: "flex items-center",
                            children: [c.jsxs("button", {
                              type: "button",
                              className: De(),
                              "data-toolbar-active": "false",
                              "aria-label": x("取消折叠"),
                              onClick: Ut => {
                                Ut.stopPropagation(), Ae(We.id);
                              },
                              children: [c.jsx(Y2, {
                                size: 16
                              }), c.jsx("span", {
                                children: x("取消折叠")
                              })]
                            }), c.jsxs("button", {
                              type: "button",
                              className: De(),
                              "data-toolbar-active": "false",
                              "aria-label": x("发送到对话"),
                              onClick: Ut => {
                                Ut.stopPropagation(), Re(We.nodeIds);
                              },
                              children: [c.jsx(qv, {
                                size: 16
                              }), c.jsx("span", {
                                children: x("发送到对话")
                              })]
                            }), M && c.jsxs("button", {
                              type: "button",
                              className: De(),
                              "data-toolbar-active": "false",
                              "aria-label": x("保存到素材库"),
                              onClick: Ut => {
                                Ut.stopPropagation(), M(We.nodeIds);
                              },
                              children: [c.jsx(mu, {
                                size: 16
                              }), c.jsx("span", {
                                children: x("保存到素材库")
                              })]
                            }), (S || y) && c.jsx("div", {
                              "data-toolbar-divider": "",
                              className: Ce,
                              "aria-hidden": !0
                            }), S && c.jsx("button", {
                              type: "button",
                              className: Xe(!1, C ? "opacity-50 cursor-not-allowed" : ""),
                              "data-tip": nx("下载叠卡内图片/视频/音频"),
                              "data-toolbar-active": "false",
                              "aria-label": x("下载"),
                              disabled: C,
                              onClick: Ut => {
                                Ut.stopPropagation(), S(We.nodeIds);
                              },
                              children: c.jsx(ws, {
                                size: 16,
                                className: C ? "animate-pulse" : ""
                              })
                            }), y && c.jsx("button", {
                              type: "button",
                              className: Xe(),
                              "data-tip": nx("删除叠卡及其中的节点"),
                              "data-toolbar-active": "false",
                              "aria-label": x("删除"),
                              onClick: Ut => {
                                Ut.stopPropagation(), y(We.id);
                              },
                              children: c.jsx(Qo, {
                                size: 16
                              })
                            })]
                          })
                        })
                      })
                    })
                  })]
                }) : null, c.jsx("div", {
                  className: `stack-card stack-card--pile ${T ? "stack-card--dark" : "stack-card--light"}`,
                  style: {
                    width: Oe,
                    height: st
                  },
                  onMouseDown: Ut => Ke(We.id, Ut, lt, gt, !0),
                  children: Ht.map(Ut => c.jsx("div", {
                    className: `stack-card-pile__item ${T ? "stack-card-pile__item--dark" : "stack-card-pile__item--light"}`,
                    style: {
                      width: Ut.width,
                      height: Ut.height,
                      zIndex: Ut.zIndex,
                      transform: `translate(-50%, -50%) translate(${Ut.x}px, ${Ut.y}px) rotate(${Ut.rotate}deg)`
                    },
                    children: c.jsx($ur, {
                      face: Ut.face,
                      isDark: T
                    })
                  }, Ut.id))
                })]
              })
            }, We.id);
          }), B ? c.jsx(_Ii, {
            items: B.items,
            kind: B.kind,
            isDark: T,
            onSettled: Te
          }) : null]
        })
      })
    });
  },
  TIi = g.memo(EIi),
  MIi = ({
    nodes: e,
    selectedNodeIds: t,
    isSelecting: n,
    visible: r,
    isDark: a = !1,
    onDragAreaMouseDown: i,
    batchConnectSourceIds: o = null,
    hideBatchConnectPlus: s = !1,
    zoom: l = 1,
    onStartBatchConnect: d
  }) => {
    on();
    const u = g.useMemo(() => {
        if (t.size < 2) return null;
        const I = Array.from(t),
          E = pWe(I, e);
        return E.width <= 0 || E.height <= 0 ? null : E;
      }, [t, e]),
      h = g.useCallback(I => {
        Rxi({
          button: I.button,
          ctrlKey: I.ctrlKey,
          metaKey: I.metaKey
        }) && (I.preventDefault(), I.stopPropagation(), i(I.clientX, I.clientY, {
          altKey: I.altKey
        }));
      }, [i]),
      p = r && !n && u && t.size >= 2,
      m = !!p && !!d && !!o && o.length >= 2 && !s,
      f = g.useCallback(I => {
        I.button !== 0 || !u || !o || o.length < 2 || (I.preventDefault(), I.stopPropagation(), d == null || d(o, {
          x: u.x + u.width + 20,
          y: u.y + u.height / 2
        }, I));
      }, [u, o, d]),
      y = g.useCallback(I => {}, []),
      {
        elementRef: b,
        onMouseEnter: v,
        onMouseMove: _,
        onMouseLeave: w
      } = Ikt(l, y, Yke.right),
      [k, A] = g.useState(!1);
    if (g.useLayoutEffect(() => {
      if (!m) {
        A(!1);
        return;
      }
      const I = window.requestAnimationFrame(() => A(!0));
      return () => window.cancelAnimationFrame(I);
    }, [m]), g.useLayoutEffect(() => {
      p && (typeof document > "u" || !document.body.classList.contains("canvas-box-select-group-dragging") && !document.body.classList.contains("canvas-node-dragging") || Hcr());
    }, [p, u, t, e, m]), !p) return null;
    const S = u.x + u.width + qcr,
      C = u.y + u.height / 2 - Kcr;
    return c.jsxs(c.Fragment, {
      children: [c.jsxs("div", {
        className: "absolute pointer-events-none",
        style: {
          zIndex: 4,
          left: u.x,
          top: u.y,
          width: u.width,
          height: u.height
        },
        "data-box-select-bounds": !0,
        children: [c.jsx("div", {
          className: `absolute inset-0 pointer-events-none ${Wer}`,
          "data-box-select-frame-visual": !0
        }), c.jsx("div", {
          className: "absolute inset-0 pointer-events-auto cursor-grab active:cursor-grabbing rounded-2xl",
          "data-box-select-drag-handle": !0,
          onPointerDown: h
        })]
      }), m && c.jsx("div", {
        "data-box-select-batch-connect": !0,
        className: "absolute z-[140] flex h-20 w-20 items-center justify-center pointer-events-auto touch-none",
        style: {
          left: S,
          top: C
        },
        onMouseEnter: v,
        onMouseMove: _,
        onMouseLeave: w,
        onPointerDown: f,
        children: c.jsx("div", {
          className: `qiaodoumayi-node-handle-slide ${k ? "is-active" : ""}`,
          children: c.jsx("div", {
            ref: b,
            className: "connector connector-right qiaodoumayi-node-handle",
            role: "button",
            "aria-label": x("从框选批量连接下游节点"),
            tabIndex: -1,
            style: {
              "--qiaodoumayi-handle-color": a ? "rgb(122 122 122)" : "rgb(113 113 122)",
              "--qiaodoumayi-handle-hover-color": a ? "rgb(245 245 245)" : "rgb(24 24 27)",
              "--qiaodoumayi-handle-bg": a ? "transparent" : "rgba(255,255,255,0.94)"
            },
            children: c.jsx(eo, {
              size: 22,
              strokeWidth: 2,
              "aria-hidden": !0,
              style: {
                pointerEvents: "none"
              }
            })
          })
        })
      })]
    });
  },
  PIi = g.memo(MIi),
  Pdn = "flex items-center justify-center h-4 shrink-0 p-0 m-0 leading-none [line-height:0] border-0 bg-transparent cursor-pointer transition-colors duration-200";

function RIi({
  connectionCount: e,
  nodeCount: t,
  groupCount: n,
  isDark: r,
  nodeGalleryOpen: a = !1,
  groupGalleryOpen: i = !1,
  onNodeCountClick: o,
  onGroupCountClick: s,
  onBackToMinimap: l,
  variant: d = "default"
}) {
  if (on(), d === "minimal") {
    const y = r ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800",
      b = r ? "text-blue-400" : "text-blue-600",
      v = r ? "text-zinc-400" : "text-zinc-500",
      _ = (w, k, A, S, C = !1) => c.jsxs("button", {
        type: "button",
        className: `${Pdn} gap-1 ${C ? b : y} ${A ? "" : "cursor-default"}`,
        onClick: A,
        "aria-label": S,
        disabled: !A,
        "data-toolbar-active": C ? "true" : "false",
        "aria-pressed": A ? C : void 0,
        children: [c.jsx("span", {
          className: "block shrink-0 flex items-center",
          children: w
        }), c.jsx("span", {
          className: `text-xs leading-none tabular-nums whitespace-nowrap ${C ? "" : v}`,
          children: k
        })]
      });
    return c.jsxs("div", {
      className: "grid grid-flow-col auto-cols-max items-center gap-x-2 h-4 leading-none",
      "data-canvas-navigator-stats": "true",
      "data-canvas-navigator-stats-variant": "minimal",
      children: [c.jsx("button", {
        type: "button",
        className: `${Pdn} w-4 ${y}`,
        onClick: l,
        "aria-label": x("返回鸟瞰图"),
        "data-tip": x("返回鸟瞰图"),
        title: x("返回鸟瞰图"),
        children: c.jsx(gmt, {
          size: 16,
          strokeWidth: 1.75,
          className: "block shrink-0"
        })
      }), _(c.jsx(H7, {
        size: 16,
        strokeWidth: 1.75,
        className: "block shrink-0"
      }), e, void 0, "连线数量"), _(c.jsx(Od, {
        size: 16,
        strokeWidth: 1.75,
        className: "block shrink-0"
      }), t, o, "节点数量", a), _(c.jsx(Hm, {
        size: 16,
        strokeWidth: 1.75,
        className: "block shrink-0"
      }), n, s, "分组数量", i)]
    });
  }
  const u = r ? "border-zinc-700/60 bg-zinc-900/92 text-zinc-100 shadow-[0_8px_32px_rgba(0,0,0,0.45)]" : "border-zinc-200/90 bg-white/95 text-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
    h = r ? "bg-zinc-600/50" : "bg-zinc-300/80",
    p = r ? "hover:bg-zinc-800/80 active:bg-zinc-700/80" : "hover:bg-zinc-100 active:bg-zinc-200/80",
    m = r ? "text-zinc-400" : "text-zinc-500",
    f = (y, b, v, _, w = !1) => c.jsxs("button", {
      type: "button",
      className: `flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors ${p} ${v ? "cursor-pointer" : "cursor-default"} ${w ? r ? "bg-zinc-100/12 ring-1 ring-zinc-500/45" : "bg-zinc-900/8 ring-1 ring-zinc-400/50" : ""}`,
      onClick: v,
      "aria-label": _,
      disabled: !v,
      children: [c.jsx("span", {
        className: m,
        children: y
      }), c.jsx("span", {
        className: "tabular-nums",
        children: b
      })]
    });
  return c.jsxs("div", {
    className: `flex items-center gap-0.5 rounded-full border px-1 py-1 backdrop-blur-md ${u}`,
    "data-canvas-navigator-stats": "true",
    children: [c.jsx("button", {
      type: "button",
      className: `flex h-7 w-7 items-center justify-center rounded-full transition-colors ${p}`,
      onClick: l,
      "aria-label": x("返回鸟瞰图"),
      title: x("返回鸟瞰图"),
      children: c.jsx(gmt, {
        size: 13,
        className: m
      })
    }), c.jsx("span", {
      className: `mx-0.5 h-4 w-px ${h}`
    }), f(c.jsx(H7, {
      size: 13
    }), e, void 0, "连线数量"), c.jsx("span", {
      className: `mx-0.5 h-4 w-px ${h}`
    }), f(c.jsx(Od, {
      size: 13
    }), t, o, "节点数量", a), c.jsx("span", {
      className: `mx-0.5 h-4 w-px ${h}`
    }), f(c.jsx(Hm, {
      size: 13
    }), n, s, "分组数量", i)]
  });
}

const Cte = 20,
  Rdn = 4,
  NIi = 80,
  jIi = 8,
  NMe = 152,
  Ndn = 76,
  DIi = 240,
  LIi = 248;

function OIi(e) {
  const t = String(e || "").match(/(\d+)\s*[×x*]\s*(\d+)/i);
  if (!t) return null;
  const n = Number(t[1]),
    r = Number(t[2]);
  return !Number.isFinite(n) || !Number.isFinite(r) || n <= 0 || r <= 0 ? null : {
    w: n,
    h: r
  };
}

function BIi(e) {
  const t = e.settings || {};
  let n = 0,
    r = 0;
  for (const s of ["previewActualSize", "imageSize", "previewSize"]) {
    const l = OIi(String(t[s] || ""));
    if (l) {
      n = l.w, r = l.h;
      break;
    }
  }
  (n <= 0 || r <= 0) && (n = Number.isFinite(e.width) && (e.width ?? 0) > 0 ? e.width : 320, r = Number.isFinite(e.height) && (e.height ?? 0) > 0 ? e.height : 200);
  const a = n / r;
  if (a >= 1) {
    const s = NMe,
      l = Math.max(Ndn, Math.round(NMe / a));
    return {
      width: s,
      height: l
    };
  }
  const i = NMe;
  return {
    width: Math.max(Ndn, Math.round(NMe * a)),
    height: i
  };
}

function qur(e) {
  const t = String(e || "").trim();
  return !t || Er.isContentRef(t) ? "" : ei() ? gd(t) : DM(t) ? "" : gd(t) || t;
}

function FIi({
  node: e,
  className: t
}) {
  on();
  const n = qLt(e),
    r = {
      size: 14,
      strokeWidth: 1.75,
      className: t
    };
  return n === "video" ? c.jsx(Oo, {
    ...r
  }) : n === "audio" ? c.jsx(Qh, {
    ...r
  }) : n === "text" ? c.jsx(Hd, {
    ...r
  }) : n === "world" ? c.jsx(i9, {
    ...r
  }) : n === "director" ? c.jsx(uZ, {
    ...r
  }) : c.jsx(lo, {
    ...r
  });
}

function zIi({
  node: e,
  className: t
}) {
  return on(), c.jsx("div", {
    className: `flex items-center justify-center bg-zinc-800/80 text-zinc-400 ${t || ""}`,
    children: c.jsx(FIi, {
      node: e
    })
  });
}

function Bkt({
  node: e,
  className: t,
  fit: n = "cover"
}) {
  on();
  const {
      src: r,
      preferEager: a,
      onMediaLoad: i,
      onMediaError: o
    } = KCe(e),
    s = qur(r),
    l = n === "contain" ? "object-contain" : "object-cover";
  return s ? c.jsx("img", {
    src: s,
    alt: "",
    className: `${l} ${t || ""}`,
    draggable: !1,
    ...Yg(a),
    onLoad: i,
    onError: o
  }) : c.jsx(zIi, {
    node: e,
    className: t
  });
}

function UIi({
  node: e,
  textPreview: t,
  shellClass: n,
  width: r,
  height: a,
  top: i,
  side: o,
  offset: s,
  isDark: l
}) {
  on();
  const {
      src: d,
      preferEager: u,
      onMediaLoad: h,
      onMediaError: p
    } = KCe(e),
    m = qur(d);
  if (!m && !t) return null;
  const f = o === "right" ? {
    left: s
  } : {
    right: s
  };
  return !m && t ? c.jsx("div", {
    className: `pointer-events-none absolute z-[101] overflow-hidden rounded-[14px] border ${n}`,
    style: {
      width: DIi,
      top: i,
      ...f
    },
    "data-canvas-navigator-preview": "true",
    children: c.jsx("div", {
      className: `max-h-[300px] overflow-y-auto whitespace-pre-wrap break-all px-2.5 py-2 text-[11px] leading-relaxed ${l ? "text-white/90" : "text-zinc-800"}`,
      children: t
    })
  }) : c.jsx("div", {
    className: `pointer-events-none absolute z-[101] overflow-hidden rounded-[14px] border ${n}`,
    style: {
      width: r,
      height: a,
      top: i,
      ...f
    },
    "data-canvas-navigator-preview": "true",
    children: c.jsx("img", {
      src: m,
      alt: "",
      className: "h-full w-full object-contain",
      draggable: !1,
      ...Yg(u),
      onLoad: h,
      onError: p
    })
  });
}

function $Ii({
  nodes: e,
  groups: t,
  isDark: n,
  onClose: r,
  onNodeFocus: a,
  onGroupFocus: i,
  hoverPreviewSide: o = "left"
}) {
  on();
  const [s, l] = g.useState(""),
    [d, u] = g.useState("all"),
    [h, p] = g.useState(0),
    [m, f] = g.useState(null),
    [y, b] = g.useState(null),
    [v, _] = g.useState(null),
    [w, k] = g.useState(null),
    [A, S] = g.useState(LIi),
    C = g.useRef(null),
    I = g.useRef(null),
    E = g.useRef(null),
    M = g.useRef(null),
    T = g.useRef(null),
    P = g.useRef(!1),
    R = g.useMemo(() => ntr(e, t), [e, t]),
    j = g.useMemo(() => {
      const pe = {
        all: R.length,
        image: 0,
        video: 0,
        audio: 0,
        text: 0,
        world: 0,
        director: 0
      };
      for (const ce of R) {
        const we = ce.kind === "node" ? [ce.node] : ce.memberNodes,
          X = new Set();
        for (const Z of we) {
          const re = qLt(Z);
          X.has(re) || (X.add(re), pe[re] += 1);
        }
      }
      return pe;
    }, [R]),
    B = g.useMemo(() => {
      const pe = s.trim().toLowerCase();
      return R.filter(ce => hza(ce, pe, d));
    }, [R, d, s]),
    F = Math.max(1, Math.ceil(B.length / Cte)),
    N = Math.min(h, F - 1),
    G = B.slice(N * Cte, N * Cte + Cte),
    z = B.length > Cte,
    V = y ? B.find(pe => P6e(pe) === y) ?? null : null,
    O = (V == null ? void 0 : V.kind) === "node" ? V.node : (V == null ? void 0 : V.kind) === "collapsed-group" ? V.thumbNode : null,
    L = O ? HLt(O) : "",
    D = g.useCallback((pe, ce) => {
      const we = C.current;
      if (!we) return;
      const X = we.getBoundingClientRect(),
        re = pe.getBoundingClientRect().top - X.top,
        fe = Math.max(0, X.height - ce);
      _(Math.max(0, Math.min(fe, re)));
    }, []),
    U = g.useCallback((pe, ce) => {
      const we = pe.kind === "node" ? pe.node : pe.thumbNode,
        X = BIi(we);
      T.current = ce.currentTarget, b(P6e(pe)), k(X), D(ce.currentTarget, X.height);
    }, [D]),
    H = g.useCallback(pe => {
      var ce;
      ((ce = T.current) == null ? void 0 : ce.dataset.entryId) === pe && (T.current = null), b(we => we === pe ? null : we), _(null), k(null);
    }, []);
  g.useEffect(() => {
    const pe = I.current;
    if (!pe) return;
    const ce = () => S(pe.offsetWidth);
    ce();
    const we = new ResizeObserver(ce);
    return we.observe(pe), () => we.disconnect();
  }, []), g.useEffect(() => {
    const pe = E.current;
    if (!pe) return;
    const ce = () => {
      T.current && w && D(T.current, w.height);
    };
    return pe.addEventListener("scroll", ce, {
      passive: !0
    }), () => pe.removeEventListener("scroll", ce);
  }, [D, w]), g.useEffect(() => {
    const pe = () => {
      T.current && w && D(T.current, w.height);
    };
    return window.addEventListener("resize", pe), () => window.removeEventListener("resize", pe);
  }, [D, w]), g.useEffect(() => {
    p(0);
  }, [d, s]), g.useEffect(() => {
    E.current && (E.current.scrollTop = 0);
  }, [N]), g.useEffect(() => {
    const pe = window.setTimeout(() => {
      var ce;
      return (ce = M.current) == null ? void 0 : ce.focus();
    }, 0);
    return () => window.clearTimeout(pe);
  }, []), g.useEffect(() => {
    const pe = ce => {
      ce.key === "Escape" && (ce.preventDefault(), ce.stopPropagation(), r());
    };
    return window.addEventListener("keydown", pe), () => window.removeEventListener("keydown", pe);
  }, [r]), g.useEffect(() => {
    const pe = ce => {
      var X;
      const we = ce.target;
      we instanceof Element && ((X = C.current) != null && X.contains(we) || we.closest("[data-canvas-navigator-stats]") || we.closest("[data-canvas-navigator-gallery]") || r());
    };
    return document.addEventListener("pointerdown", pe), () => document.removeEventListener("pointerdown", pe);
  }, [r]);
  const Y = g.useCallback(pe => {
      const ce = Math.max(0, Math.min(pe, F - 1));
      ce === N || P.current || (P.current = !0, p(ce), window.setTimeout(() => {
        P.current = !1;
      }, NIi));
    }, [N, F]),
    K = g.useCallback(pe => {
      if (f(P6e(pe)), pe.kind === "node") {
        a == null || a(pe.node);
        return;
      }
      i == null || i(pe.group);
    }, [a, i]),
    W = R.length === 0 ? "暂无节点" : "无匹配节点",
    Q = n ? "border-[rgba(255,255,255,0.06)] bg-[#1f1f1f] shadow-[0_12px_32px_rgba(0,0,0,0.45),0_1px_3px_rgba(0,0,0,0.3)]" : "border-[rgba(0,0,0,0.18)] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.15)]",
    q = n ? "hover:bg-white/[0.086]" : "hover:bg-zinc-100",
    ne = n ? "bg-white/[0.14]" : "bg-zinc-100",
    de = n ? "bg-white text-zinc-900" : "bg-zinc-900 text-white",
    le = n ? "text-white/45 hover:bg-white/10 hover:text-white/90" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800",
    J = `flex h-[26px] w-[26px] items-center justify-center rounded-[9px] transition-colors disabled:cursor-default disabled:opacity-30 ${n ? "bg-white/[0.043] text-white/55 hover:bg-white/[0.086] hover:text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"}`;
  return c.jsxs("div", {
    ref: C,
    className: "relative",
    "data-canvas-navigator-gallery-wrap": "true",
    onMouseDown: pe => pe.stopPropagation(),
    children: [c.jsxs("div", {
      ref: I,
      className: `flex w-[min(88vw,248px)] flex-col overflow-hidden rounded-[22px] border ${Q}`,
      "data-canvas-navigator-gallery": "true",
      role: "dialog",
      "aria-label": x("所有节点"),
      children: [c.jsxs("div", {
        className: "flex shrink-0 items-center justify-between overflow-hidden rounded-t-[22px] px-3 pb-2 pt-3",
        children: [c.jsx("h2", {
          className: `text-xs font-semibold tracking-[0.2px] ${n ? "text-white/90" : "text-zinc-800"}`,
          children: x("所有节点")
        }), c.jsx("button", {
          type: "button",
          className: `flex h-[22px] w-[22px] items-center justify-center rounded-lg transition-colors ${n ? "text-white/38 hover:bg-white/[0.086] hover:text-white" : "text-zinc-500 hover:bg-zinc-100"}`,
          onClick: r,
          "aria-label": x("关闭"),
          children: c.jsx(Na, {
            size: 12
          })
        })]
      }), c.jsx("div", {
        ref: E,
        className: "rh-scroll-minimal custom-scrollbar max-h-[min(58vh,480px)] min-h-[120px] shrink-0 overflow-y-auto overflow-x-hidden py-1",
        children: G.length === 0 ? c.jsx("div", {
          className: `mx-2 my-1 rounded-[10px] px-3 py-4 text-center text-[11px] leading-[1.8] ${n ? "bg-black/15 text-white/38" : "bg-zinc-100 text-zinc-400"}`,
          children: x(W)
        }) : G.map((pe, ce) => {
          const we = P6e(pe),
            X = N * Cte + ce + 1,
            Z = y === we,
            re = m === we,
            fe = pe.kind === "collapsed-group",
            ye = fe ? pe.thumbNode : pe.node,
            ie = fe ? Dze(pe.group) : ike(pe.node),
            ae = fe ? ttr(pe.group, pe.memberCount) : WLt(pe.node);
          return c.jsxs("button", {
            type: "button",
            "data-entry-id": we,
            className: `mx-1.5 flex w-[calc(100%-12px)] items-center gap-1.5 rounded-[10px] px-1.5 py-[7px] text-left transition-colors ${re ? ne : q} ${Z && !re ? n ? "bg-white/[0.086]" : "bg-zinc-100" : ""}`,
            onMouseEnter: be => U(pe, be),
            onMouseLeave: () => H(we),
            onClick: () => K(pe),
            children: [c.jsxs("div", {
              className: "relative h-7 w-7 shrink-0 overflow-visible",
              children: [c.jsx("div", {
                className: "h-7 w-7 overflow-hidden rounded-lg",
                children: c.jsx(Bkt, {
                  node: ye,
                  className: "h-full w-full"
                })
              }), fe && pe.memberCount > 1 && c.jsx("span", {
                className: `absolute -bottom-0.5 -right-0.5 z-[1] flex h-3 min-w-3 items-center justify-center rounded px-0.5 text-[8px] font-semibold leading-3 ${n ? "bg-black/80 text-white" : "bg-white/95 text-zinc-800"}`,
                children: pe.memberCount
              }), c.jsx("span", {
                className: "absolute -left-0.5 -top-0.5 z-[1] flex h-3 min-w-3 items-center justify-center rounded px-0.5 text-[8px] font-semibold leading-3 text-white bg-black/80",
                children: X
              })]
            }), c.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [c.jsx("div", {
                className: `truncate text-[11px] font-medium ${n ? "text-white/90" : "text-zinc-800"}`,
                children: ie
              }), c.jsx("div", {
                className: `truncate text-[9px] ${n ? "text-white/38" : "text-zinc-400"}`,
                children: ae
              })]
            }), c.jsx(ss, {
              size: 12,
              className: `shrink-0 transition-colors ${Z ? n ? "text-white/55" : "text-zinc-500" : n ? "text-white/20" : "text-zinc-300"}`
            })]
          }, we);
        })
      }), c.jsxs("div", {
        className: "shrink-0 px-2 pb-2 pt-0.5",
        children: [z && c.jsxs("div", {
          className: "mb-1 flex items-center justify-center gap-0.5 py-1.5",
          children: [c.jsx("button", {
            type: "button",
            className: J,
            disabled: N <= 0,
            onClick: () => Y(N - Rdn),
            title: x("向前4页"),
            "aria-label": x("向前4页"),
            children: c.jsx(iEt, {
              size: 12
            })
          }), c.jsx("button", {
            type: "button",
            className: J,
            disabled: N <= 0,
            onClick: () => Y(N - 1),
            "aria-label": x("上一页"),
            children: c.jsx(Mf, {
              size: 12
            })
          }), c.jsx("span", {
            className: `min-w-10 text-center text-[10px] tabular-nums ${n ? "text-white/55" : "text-zinc-500"}`,
            children: `${N + 1} / ${F}`
          }), c.jsx("button", {
            type: "button",
            className: J,
            disabled: N >= F - 1,
            onClick: () => Y(N + 1),
            "aria-label": x("下一页"),
            children: c.jsx(ss, {
              size: 12
            })
          }), c.jsx("button", {
            type: "button",
            className: J,
            disabled: N >= F - 1,
            onClick: () => Y(N + Rdn),
            title: x("向后4页"),
            "aria-label": x("向后4页"),
            children: c.jsx(oEt, {
              size: 12
            })
          })]
        }), c.jsxs("div", {
          className: `mb-1.5 flex h-8 items-center gap-1 rounded-lg px-2 transition-colors ${n ? "bg-white/[0.14] text-white/50 focus-within:bg-white/[0.18]" : "bg-zinc-200/80 text-zinc-500 focus-within:bg-zinc-200"}`,
          children: [c.jsx(mc, {
            size: 12,
            className: "shrink-0"
          }), c.jsx("input", {
            ref: M,
            type: "text",
            value: s,
            onChange: pe => l(pe.target.value),
            placeholder: x("搜索节点..."),
            "aria-label": x("搜索节点"),
            className: `min-w-0 flex-1 bg-transparent text-[11px] outline-none ${n ? "text-white/85 placeholder:text-white/25" : "text-zinc-800 placeholder:text-zinc-400"}`
          }), s ? c.jsx("button", {
            type: "button",
            "aria-label": x("清空搜索"),
            className: `flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${n ? "bg-white/[0.14] text-white/55 hover:bg-white/[0.22] hover:text-white" : "bg-zinc-300 text-zinc-600 hover:bg-zinc-400"}`,
            onClick: () => l(""),
            children: c.jsx(Na, {
              size: 10
            })
          }) : null]
        }), c.jsx("div", {
          className: `flex flex-wrap gap-0.5 rounded-[10px] p-[3px] ${n ? "bg-white/[0.043]" : "bg-zinc-100"}`,
          children: _za.map(pe => {
            const ce = j[pe.id];
            if (pe.id !== "all" && ce === 0) return null;
            const we = d === pe.id;
            return c.jsxs("button", {
              type: "button",
              className: `inline-flex items-center gap-0.5 rounded-lg px-[7px] py-[3px] text-[10px] transition-colors ${we ? de : le}`,
              onClick: () => u(pe.id),
              children: [x(pe.label), ce > 0 ? c.jsx("span", {
                className: `tabular-nums text-[9px] ${we ? n ? "text-zinc-600" : "text-zinc-300" : n ? "text-white/38" : "text-zinc-400"}`,
                children: ce
              }) : null]
            }, pe.id);
          })
        })]
      })]
    }), O && v != null && w ? c.jsx(UIi, {
      node: O,
      textPreview: L,
      shellClass: Q,
      width: w.width,
      height: w.height,
      top: v,
      side: o,
      offset: A + jIi,
      isDark: n
    }) : null]
  });
}

const Bfe = 20;

function GIi({
  nodes: e,
  groups: t,
  isDark: n,
  onClose: r,
  onGroupFocus: a
}) {
  on();
  const [i, o] = g.useState(0),
    s = g.useRef(null),
    l = g.useMemo(() => t.filter(b => {
      var w;
      if ((((w = b.nodeIds) == null ? void 0 : w.length) ?? 0) === 0) return !1;
      if (b.collapsed) return !0;
      const _ = Gk(b, e);
      return _.width > 0 && _.height > 0;
    }), [t, e]),
    d = Math.max(1, Math.ceil(l.length / Bfe)),
    u = Math.min(i, d - 1),
    h = l.slice(u * Bfe, u * Bfe + Bfe);
  g.useEffect(() => {
    s.current && (s.current.scrollTop = 0);
  }, [u]), g.useEffect(() => {
    u > d - 1 && o(Math.max(0, d - 1));
  }, [u, d]);
  const p = g.useCallback(b => {
      a == null || a(b);
    }, [a]),
    m = n ? "border-[rgba(255,255,255,0.06)] bg-[#1f1f1f] shadow-[0_20px_60px_rgba(0,0,0,0.55)]" : "border-[rgba(0,0,0,0.18)] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]",
    f = n ? "hover:bg-zinc-800/75" : "hover:bg-zinc-100",
    y = n ? "bg-zinc-800/90 text-zinc-400" : "bg-zinc-100 text-zinc-500";
  return c.jsxs("div", {
    className: `flex w-[min(88vw,248px)] flex-col overflow-hidden rounded-[22px] border ${m}`,
    "data-canvas-navigator-group-gallery": "true",
    onMouseDown: b => b.stopPropagation(),
    children: [c.jsxs("div", {
      className: "flex shrink-0 items-center justify-between px-3 pb-2 pt-3",
      children: [c.jsx("h2", {
        className: `text-sm font-semibold ${n ? "text-zinc-100" : "text-zinc-800"}`,
        children: x("分组")
      }), c.jsx("button", {
        type: "button",
        className: `flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${n ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200" : "text-zinc-500 hover:bg-zinc-100"}`,
        onClick: r,
        "aria-label": x("关闭"),
        children: c.jsx(Na, {
          size: 15
        })
      })]
    }), c.jsx("div", {
      ref: s,
      className: "rh-scroll-minimal custom-scrollbar h-[min(58vh,480px)] shrink-0 overflow-y-auto px-2 pb-2",
      children: h.length === 0 ? c.jsx("div", {
        className: `mx-2 my-1 rounded-[10px] px-3 py-4 text-center text-[11px] leading-[1.8] ${n ? "bg-black/15 text-white/38" : "bg-zinc-100 text-zinc-400"}`,
        children: x("暂无分组")
      }) : h.map((b, v) => {
        var A, S;
        const _ = u * Bfe + v + 1,
          w = ((A = b.nodeIds) == null ? void 0 : A.length) ?? 0,
          k = ((S = b.name) == null ? void 0 : S.trim()) || "未命名组";
        return c.jsxs("button", {
          type: "button",
          className: `flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left transition-colors ${f}`,
          onClick: () => p(b),
          children: [c.jsxs("div", {
            className: "relative shrink-0",
            children: [c.jsx("div", {
              className: `flex h-10 w-10 items-center justify-center rounded-lg border ${y}`,
              style: {
                borderColor: b.color ? `${b.color}55` : n ? "rgba(63,63,70,0.6)" : "rgba(228,228,231,0.9)"
              },
              children: c.jsx(Hm, {
                size: 16
              })
            }), c.jsx("span", {
              className: `absolute -left-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[9px] font-semibold ${n ? "bg-zinc-950/85 text-zinc-100" : "bg-white/95 text-zinc-800"}`,
              children: _
            })]
          }), c.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [c.jsx("div", {
              className: `truncate text-xs font-medium ${n ? "text-zinc-100" : "text-zinc-800"}`,
              children: k
            }), c.jsxs("div", {
              className: `truncate text-[10px] ${n ? "text-zinc-500" : "text-zinc-400"}`,
              children: [w, x(" 个节点"), b.collapsed ? b.stackMode === "card" ? x(" · 已折叠") : x(" · 已收纳") : ""]
            })]
          }), c.jsx(ss, {
            size: 14,
            className: `shrink-0 ${n ? "text-zinc-600" : "text-zinc-300"}`
          })]
        }, b.id);
      })
    }), d > 1 && c.jsxs("div", {
      className: "flex shrink-0 items-center justify-center gap-1 border-t px-3 py-2.5",
      style: {
        borderColor: n ? "rgba(63,63,70,0.45)" : "rgba(228,228,231,0.9)"
      },
      children: [c.jsx("button", {
        type: "button",
        className: `flex h-7 w-7 items-center justify-center rounded-lg transition-colors disabled:opacity-30 ${n ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
        disabled: u <= 0,
        onClick: () => o(Math.max(0, u - 4)),
        title: x("向前4页"),
        "aria-label": x("向前4页"),
        children: c.jsx(iEt, {
          size: 14
        })
      }), c.jsx("button", {
        type: "button",
        className: `flex h-7 w-7 items-center justify-center rounded-lg transition-colors disabled:opacity-30 ${n ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
        disabled: u <= 0,
        onClick: () => o(b => Math.max(0, b - 1)),
        "aria-label": x("上一页"),
        children: c.jsx(Mf, {
          size: 14
        })
      }), c.jsx("span", {
        className: `min-w-[52px] text-center text-xs tabular-nums ${n ? "text-zinc-300" : "text-zinc-600"}`,
        children: l.length === 0 ? "0 / 0" : `${u + 1} / ${d}`
      }), c.jsx("button", {
        type: "button",
        className: `flex h-7 w-7 items-center justify-center rounded-lg transition-colors disabled:opacity-30 ${n ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
        disabled: u >= d - 1,
        onClick: () => o(b => Math.min(d - 1, b + 1)),
        "aria-label": x("下一页"),
        children: c.jsx(ss, {
          size: 14
        })
      }), c.jsx("button", {
        type: "button",
        className: `flex h-7 w-7 items-center justify-center rounded-lg transition-colors disabled:opacity-30 ${n ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
        disabled: u >= d - 1,
        onClick: () => o(Math.min(d - 1, u + 4)),
        title: x("向后4页"),
        "aria-label": x("向后4页"),
        children: c.jsx(oEt, {
          size: 14
        })
      })]
    })]
  });
}

const nV = 200,
  WI = 132,
  hC = 8,
  R_ = 28,
  VIi = 10,
  jdn = 2.5,
  HIi = .02,
  WIi = 1.25;

function qIi(e, t, n, r = 4) {
  return e >= n.x - r && e <= n.x + n.width + r && t >= n.y - r && t <= n.y + n.height + r;
}

function KIi(e, t, n, r) {
  const a = t - 2 * r,
    i = n - 2 * r;
  if (e.width >= a || e.height >= i) return e;
  const o = t - r - e.width,
    s = n - r - e.height;
  return {
    ...e,
    x: Math.max(r, Math.min(o, e.x)),
    y: Math.max(r, Math.min(s, e.y))
  };
}

function Kur(e, t) {
  let n = Math.round(e.x),
    r = Math.round(e.y),
    a = Math.max(1, Math.round(e.width)),
    i = Math.max(1, Math.round(e.height));
  return t && (Math.abs(n - t.x) === 1 && Math.abs(e.x - t.x) < .6 && (n = t.x), Math.abs(r - t.y) === 1 && Math.abs(e.y - t.y) < .6 && (r = t.y), Math.abs(a - t.width) === 1 && Math.abs(e.width - t.width) < .6 && (a = t.width), Math.abs(i - t.height) === 1 && Math.abs(e.height - t.height) < .6 && (i = t.height)), {
    x: n,
    y: r,
    width: a,
    height: i
  };
}

function Qur(e) {
  var s;
  const t = (s = e.dataset) == null ? void 0 : s.vpRect;
  if (!t) return null;
  const n = t.split(",");
  if (n.length !== 4) return null;
  const r = Number(n[0]),
    a = Number(n[1]),
    i = Number(n[2]),
    o = Number(n[3]);
  return [r, a, i, o].every(Number.isFinite) ? {
    x: r,
    y: a,
    width: i,
    height: o
  } : null;
}

function QIi(e, t, n = !1) {
  if (!e) return;
  const r = n ? {
      x: t.x,
      y: t.y,
      width: Math.max(1, t.width),
      height: Math.max(1, t.height)
    } : Kur(t, Qur(e)),
    a = n ? `${r.x.toFixed(2)},${r.y.toFixed(2)},${r.width.toFixed(2)},${r.height.toFixed(2)}` : `${r.x},${r.y},${r.width},${r.height}`;
  e.dataset.vpRect !== a && (e.dataset.vpRect = a, e.setAttribute("x", String(r.x)), e.setAttribute("y", String(r.y)), e.setAttribute("width", String(r.width)), e.setAttribute("height", String(r.height)));
}

function Ast(e, t, n, r = hC) {
  const a = Math.max(t - 2 * r, 1),
    i = Math.max(n - 2 * r, 1),
    o = cza(e);
  let s = o.minX,
    l = o.minY,
    d = o.maxX,
    u = o.maxY,
    h = Math.max(d - s, 1),
    p = Math.max(u - l, 1);
  const m = HIi * Math.max(h, p, 1);
  s -= m, l -= m, d += m, u += m, h = d - s, p = u - l;
  const f = Math.min(a / h, i / p),
    y = r + (a - h * f) / 2,
    b = r + (i - p * f) / 2;
  return {
    bounds: {
      minX: s,
      minY: l,
      maxX: d,
      maxY: u
    },
    worldW: h,
    worldH: p,
    width: t,
    height: n,
    toMinimapX: _ => y + (_ - s) * f,
    toMinimapY: _ => b + (_ - l) * f,
    toWorldX: _ => s + (_ - y) / f,
    toWorldY: _ => l + (_ - b) / f
  };
}

function FL(e, t, n, r) {
  const a = Number.isFinite(t.zoom) && t.zoom > 0 ? t.zoom : 1,
    i = -t.x / a,
    o = -t.y / a,
    s = i + n / a,
    l = o + r / a,
    d = e.toMinimapX(i),
    u = e.toMinimapY(o),
    h = e.toMinimapX(s),
    p = e.toMinimapY(l);
  return {
    x: d,
    y: u,
    width: Math.max(4, h - d),
    height: Math.max(4, p - u)
  };
}

function Yur(e, t, n, r) {
  const a = r,
    i = r,
    o = t - r,
    s = n - r,
    l = WIi,
    d = e.x + e.width,
    u = e.y + e.height,
    h = e.x <= a + l ? a : e.x,
    p = e.y <= i + l ? i : e.y,
    m = d >= o - l ? o : Math.min(o, d),
    f = u >= s - l ? s : Math.min(s, u);
  return m - h < 1 || f - p < 1 ? {
    x: a,
    y: i,
    width: Math.max(4, o - a),
    height: Math.max(4, s - i)
  } : {
    x: h,
    y: p,
    width: Math.max(4, m - h),
    height: Math.max(4, f - p)
  };
}

function Sst(e, t, n, r, a, i = !1) {
  if (!e) return;
  const o = Yur(t, n, r, a),
    s = i ? o : Kur(o, Qur(e)),
    l = i ? `${s.x.toFixed(2)},${s.y.toFixed(2)},${s.width.toFixed(2)},${s.height.toFixed(2)}` : `${s.x},${s.y},${s.width},${s.height}`;
  e.dataset.vpRect !== l && (e.dataset.vpRect = l, e.style.left = `${s.x}px`, e.style.top = `${s.y}px`, e.style.width = `${s.width}px`, e.style.height = `${s.height}px`);
}

function dO(e, t, n, r, a, i = !1) {
  QIi(e, Yur(t, n, r, a), i);
}

function YIi(e, t, n, r, a, i, o, s, l, d, u, h) {
  const p = e.getContext("2d");
  if (!p) return;
  p.setTransform(o, 0, 0, o, 0, 0), p.clearRect(0, 0, r, a);
  const {
      toMinimapX: m,
      toMinimapY: f
    } = n,
    y = new Set();
  let b = null;
  for (let v = 0; v < t.length; v++) {
    const _ = t[v];
    if (!_ || y.has(_.id)) continue;
    y.add(_.id);
    const w = _.width || 200,
      k = _.height || 120,
      A = m(_.x),
      S = f(_.y),
      C = m(_.x + w),
      I = f(_.y + k),
      E = Math.min(A, C),
      M = Math.max(A, C),
      T = Math.min(S, I),
      P = Math.max(S, I);
    if (M <= i || E >= r - i || P <= i || T >= a - i) continue;
    const R = Math.max(i, Math.min(r - i, A)),
      j = Math.max(i, Math.min(a - i, S)),
      B = Math.max(jdn, Math.abs(C - A)),
      F = Math.max(jdn, Math.abs(I - S));
    p.fillStyle = u != null && u.ids.has(_.id) ? u.hex : h ?? l6r(_.type, s), p.fillRect(R, j, B, F), u != null && u.ids.has(_.id) && (p.strokeStyle = u.hex, p.lineWidth = 1, p.strokeRect(R + .5, j + .5, Math.max(0, B - 1), Math.max(0, F - 1))), l && _.id === l && (b = {
      x: R,
      y: j,
      w: B,
      h: F
    });
  }
  b && (p.strokeStyle = d, p.lineWidth = 1.5, p.strokeRect(b.x + .75, b.y + .75, Math.max(0, b.w - 1.5), Math.max(0, b.h - 1.5)));
}

function Ddn({
  width: e,
  height: t,
  projection: n,
  nodes: r,
  viewportRect: a,
  viewportRectRef: i,
  highlightedNodeId: o = null,
  showViewport: s = !0,
  paintNodes: l = !0,
  isDark: d,
  padding: u = hC
}) {
  on();
  const h = g.useRef(null),
    p = MS(u9().mode),
    m = p ? `${p.borderStrong}99` : void 0,
    f = `var(--studio-design-accent, ${d ? "rgba(255, 255, 255, 0.5)" : "rgba(82, 82, 91, 0.5)"})`,
    y = (p == null ? void 0 : p.accent) ?? (d ? "rgba(250, 250, 250, 0.95)" : "rgba(39, 39, 42, 0.85)"),
    b = ZLt(),
    v = g.useMemo(() => {
      if (!b) return null;
      const _ = KLt(b);
      if (!_) return null;
      const w = new Set();
      for (const k of r) Zg(k).includes(b) && w.add(k.id);
      return w.size ? {
        ids: w,
        hex: _.hex
      } : null;
    }, [b, r]);
  return g.useEffect(() => {
    if (!l || e <= 0 || t <= 0) return;
    const _ = h.current;
    if (!_) return;
    const w = typeof window < "u" && window.devicePixelRatio > 0 ? Math.min(window.devicePixelRatio, 2) : 1,
      k = Math.max(1, Math.round(e * w)),
      A = Math.max(1, Math.round(t * w));
    _.width !== k && (_.width = k), _.height !== A && (_.height = A), YIi(_, r, n, e, t, u, w, d, o, y, v, m);
  }, [r, n, e, t, u, d, l, o, y, v, m]), g.useLayoutEffect(() => {
    s && (Rl() || jl() || dO((i == null ? void 0 : i.current) ?? null, a, e, t, u));
  }, [a, i, s, e, t, u]), c.jsxs(c.Fragment, {
    children: [l && c.jsx("canvas", {
      ref: h,
      "data-canvas-minimap-nodes": "true",
      width: e,
      height: t,
      style: {
        display: "block",
        width: e,
        height: t,
        pointerEvents: "none"
      }
    }), s && c.jsx("svg", {
      width: e,
      height: t,
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        display: "block",
        overflow: "hidden",
        pointerEvents: "none"
      },
      children: c.jsx("rect", {
        ref: i,
        "data-canvas-minimap-viewport": "true",
        fill: "none",
        stroke: f,
        strokeWidth: 1,
        rx: 12,
        ry: 12
      })
    })]
  });
}

function XIi({
  view: e,
  viewportWidth: t,
  viewportHeight: n,
  nodes: r,
  connections: a = [],
  groups: i = [],
  onViewChange: o,
  onViewDragStart: s,
  onViewDragEnd: l,
  onNodeFocus: d,
  onGroupFocus: u,
  isDark: h = !0,
  className: p = "",
  dockAccessory: m,
  docked: f = !1
}) {
  on();
  const y = g.useRef(null),
    b = g.useRef(null),
    v = g.useRef(null),
    [_, w] = g.useState(nV),
    k = g.useRef(nV);
  k.current = _;
  const A = g.useRef(null),
    S = g.useRef(null),
    C = g.useRef(null),
    I = g.useRef(null),
    E = g.useRef(null),
    M = g.useRef(null),
    T = g.useRef(null),
    P = g.useRef(!1),
    [R, j] = g.useState(!1),
    B = g.useRef(!1);
  B.current = R;
  const [F, N] = g.useState("minimap"),
    [G, z] = g.useState(!1),
    [V, O] = g.useState(!1),
    [L, D] = g.useState(""),
    [U, H] = g.useState(new Set()),
    [Y, K] = g.useState(null),
    [W, Q] = g.useState({
      width: 640,
      height: 480
    }),
    q = g.useRef(W);
  q.current = W;
  const ne = g.useRef(null),
    de = g.useRef(null),
    le = g.useRef(null);
  g.useLayoutEffect(() => {
    if (!f) {
      w(Yt => Yt === nV ? Yt : nV);
      return;
    }
    const Ut = v.current;
    if (!Ut) return;
    const _t = () => {
      const Yt = Ut.getBoundingClientRect().width;
      Yt <= 0 || w(qe => Math.abs(qe - Yt) < .5 ? qe : Yt);
    };
    _t();
    const At = new ResizeObserver(_t);
    return At.observe(Ut), () => At.disconnect();
  }, [f, F]);
  const J = g.useRef(e);
  P.current || (J.current = e);
  const pe = g.useRef(null),
    ce = g.useRef(null),
    we = g.useMemo(() => uza(r, i), [r, i]),
    X = g.useMemo(() => ntr(r, i).length, [r, i]),
    Z = g.useRef(we);
  Z.current = we;
  const re = g.useRef(t);
  re.current = t;
  const fe = g.useRef(n);
  fe.current = n;
  const [ye, ie] = g.useState(() => {
    const Ut = Cd();
    return Number.isFinite(e.zoom) && (Math.abs(e.x - Ut.x) > .5 || Math.abs(e.y - Ut.y) > .5 || Math.abs(e.zoom - Ut.zoom) > 1e-4) ? {
      x: e.x,
      y: e.y,
      zoom: e.zoom
    } : Ut;
  });
  g.useLayoutEffect(() => {
    jl() || Rl() || P.current || ie(e);
  }, [e.x, e.y, e.zoom]);
  const ae = g.useCallback((Ut, _t, At, Yt = hC) => {
    const qe = re.current,
      kt = fe.current,
      St = Ast(Z.current, _t, At, Yt);
    return FL(St, Ut, qe, kt);
  }, []);
  g.useEffect(() => {
    const Ut = (Ot, ln, Pn) => {
        Ot && Sst(I.current, Ot, ln, Pn, R_, !0);
      },
      _t = Ot => {
        const ln = re.current,
          Pn = fe.current,
          rn = M.current,
          Yn = k.current,
          Ct = rn ? FL(rn, Ot, ln, Pn) : ae(Ot, Yn, WI);
        if (dO(S.current, Ct, Yn, WI, hC, !0), B.current) {
          const Cn = q.current,
            un = (Cn == null ? void 0 : Cn.width) ?? 0,
            Jn = (Cn == null ? void 0 : Cn.height) ?? 0;
          if (un > 0 && Jn > 0) {
            const Kn = T.current,
              en = Kn ? FL(Kn, Ot, ln, Pn) : ae(Ot, un, Jn, R_);
            dO(C.current, en, un, Jn, R_, !0), Ut(en, un, Jn);
          }
        }
      },
      At = T4n(_t),
      Yt = K4e(_t),
      qe = O5t(_t),
      kt = dw(Ot => {
        if (jl()) return;
        if (Rl() || Yi()) {
          _t(Ot);
          return;
        }
        ie({
          x: Ot.x,
          y: Ot.y,
          zoom: Ot.zoom
        });
      }),
      St = () => {
        ie(Cd());
      },
      hn = tZ(Ot => {
        Ot || St();
      }),
      Qt = X4e(Ot => {
        Ot || St();
      });
    return () => {
      At(), Yt(), qe(), kt(), hn(), Qt();
    };
  }, [ae]);
  const be = ye,
    Ee = g.useMemo(() => Ast(we, _, WI, hC), [we, _]);
  !jl() && !Rl() && !P.current && (M.current = Ee);
  const xe = g.useMemo(() => FL(Ee, be, t, n), [Ee, be, t, n]),
    he = g.useCallback((Ut, _t = !1, At = nV, Yt = WI, qe = hC) => {
      pe.current = Ut, J.current = Ut;
      const kt = re.current,
        St = fe.current,
        hn = P.current,
        Qt = E.current ?? M.current,
        Ot = k.current,
        ln = Qt ? FL(Qt, Ut, kt, St) : ae(Ut, Ot, WI, hC);
      if (dO(S.current, ln, Ot, WI, hC, hn), B.current) {
        const Pn = q.current,
          rn = (Pn == null ? void 0 : Pn.width) ?? 0,
          Yn = (Pn == null ? void 0 : Pn.height) ?? 0;
        if (rn > 0 && Yn > 0) {
          const Ct = T.current,
            Cn = Ct ? FL(Ct, Ut, kt, St) : ae(Ut, rn, Yn, R_);
          dO(C.current, Cn, rn, Yn, R_, hn), Sst(I.current, Cn, rn, Yn, R_, hn);
        }
      }
      if (hn || _t) {
        ce.current != null && (window.cancelAnimationFrame(ce.current), ce.current = null), pe.current = null, o(Ut);
        return;
      }
      ce.current == null && (ce.current = window.requestAnimationFrame(() => {
        ce.current = null;
        const Pn = pe.current;
        pe.current = null, Pn && o(Pn);
      }));
    }, [ae, o]),
    ue = g.useCallback(() => {
      if (P.current) return;
      P.current = !0, s == null || s();
      const Ut = b.current;
      Ut && (Ut.style.cursor = "grabbing");
      const _t = A.current;
      _t && (_t.style.cursor = "grabbing");
    }, [s]),
    ge = g.useCallback(() => {
      if (!P.current) return;
      P.current = !1, le.current = null, ce.current != null && (window.cancelAnimationFrame(ce.current), ce.current = null);
      const Ut = pe.current ?? J.current;
      pe.current = null;
      const _t = re.current,
        At = fe.current,
        Yt = E.current ?? M.current,
        qe = k.current,
        kt = Yt ? FL(Yt, Ut, _t, At) : ae(Ut, qe, WI, hC);
      dO(S.current, kt, qe, WI, hC), E.current = null, o(Ut), ie({
        x: Ut.x,
        y: Ut.y,
        zoom: Ut.zoom
      });
      const St = b.current;
      St && (St.style.cursor = "");
      const hn = A.current;
      hn && (hn.style.cursor = ""), l == null || l();
    }, [ae, o, l]);
  g.useEffect(() => () => {
    ce.current != null && window.cancelAnimationFrame(ce.current);
  }, []), g.useEffect(() => {
    if (!R) return;
    const Ut = A.current;
    if (!Ut) return;
    const _t = () => {
      const Yt = Ut.clientWidth,
        qe = Ut.clientHeight;
      if (Yt > 0 && qe > 0) {
        const kt = {
          width: Yt,
          height: qe
        };
        q.current = kt, Q(kt);
      }
    };
    _t();
    const At = new ResizeObserver(_t);
    return At.observe(Ut), () => At.disconnect();
  }, [R, t, n]);
  const ke = g.useCallback((Ut, _t) => ({
      handlePointerDown: kt => {
        var Yn, Ct;
        kt.preventDefault(), kt.stopPropagation();
        const St = Ut();
        if (!St) return;
        E.current = _t;
        const hn = St.getBoundingClientRect();
        le.current = hn, ue();
        const Qt = kt.clientX - hn.left,
          Ot = kt.clientY - hn.top,
          ln = _t.toWorldX(Qt),
          Pn = _t.toWorldY(Ot),
          rn = J.current;
        he({
          ...rn,
          x: t / 2 - ln * rn.zoom,
          y: n / 2 - Pn * rn.zoom
        }, !0, _t.width, _t.height), (Ct = (Yn = kt.currentTarget).setPointerCapture) == null || Ct.call(Yn, kt.pointerId);
      },
      handlePointerMove: kt => {
        if (!P.current) return;
        const St = Ut();
        if (!St) return;
        const hn = E.current ?? _t,
          Qt = le.current ?? St.getBoundingClientRect(),
          Ot = kt.clientX - Qt.left,
          ln = kt.clientY - Qt.top,
          Pn = hn.toWorldX(Ot),
          rn = hn.toWorldY(ln),
          Yn = J.current;
        he({
          ...Yn,
          x: t / 2 - Pn * Yn.zoom,
          y: n / 2 - rn * Yn.zoom
        }, !1, hn.width, hn.height);
      },
      handlePointerUp: kt => {
        var St, hn;
        (hn = (St = kt.currentTarget).releasePointerCapture) == null || hn.call(St, kt.pointerId), ge();
      }
    }), [t, n, he, ue, ge])(() => b.current, Ee),
    ve = `var(--design-surface, ${h ? "#18181b" : "#f4f4f5"})`,
    Te = `var(--design-line, ${h ? "rgba(255, 255, 255, 0.10)" : "rgba(63, 63, 70, 0.18)"})`,
    Ne = h ? "border-zinc-700/50 bg-zinc-900/82 shadow-[0_24px_80px_rgba(0,0,0,0.55)]" : "border-zinc-200/80 bg-white/88 shadow-[0_24px_80px_rgba(0,0,0,0.18)]",
    me = h ? "bg-[#141416]/92" : "bg-zinc-100/95",
    Ae = h ? "border-zinc-700/45 bg-[#1e1e22]/88" : "border-zinc-200/80 bg-zinc-50/95",
    Fe = h ? "border-white/12 bg-black/50 text-zinc-200 backdrop-blur-md hover:bg-black/65" : "border-zinc-300/80 bg-white/75 text-zinc-600 backdrop-blur-md hover:bg-white/95",
    Me = g.useCallback(() => {
      j(!0);
    }, []),
    Re = g.useCallback(Ut => {
      Ut.preventDefault(), Ut.stopPropagation(), Me();
    }, [Me]),
    $e = g.useCallback(() => {
      j(!1), D(""), K(null);
    }, []),
    rt = g.useCallback(Ut => {
      Ut.preventDefault(), Ut.stopPropagation(), N("stats"), z(!1), O(!1);
    }, []),
    nt = g.useCallback(() => {
      N("minimap"), z(!1), O(!1);
    }, []),
    ze = g.useCallback(() => {
      O(!1), z(Ut => !Ut);
    }, []),
    Le = g.useCallback(() => {
      z(!1), O(Ut => !Ut);
    }, []),
    Ke = g.useCallback(() => {
      z(!1);
    }, []),
    Xe = g.useCallback(() => {
      O(!1);
    }, []),
    De = g.useMemo(() => i.filter(Ut => {
      var _t;
      return (_t = Ut.nodeIds) == null ? void 0 : _t.length;
    }).length, [i]);
  g.useEffect(() => {
    const Ut = At => {
        if (!At || !(At instanceof HTMLElement)) return !1;
        const Yt = At.tagName;
        return Yt === "INPUT" || Yt === "TEXTAREA" || Yt === "SELECT" || At.isContentEditable ? !0 : !!At.closest('[contenteditable="true"]');
      },
      _t = At => {
        if (!(At.repeat || At.isComposing || At.keyCode === 229) && !(At.ctrlKey || At.metaKey || At.altKey) && document.body.dataset.director3dControl !== "1" && !document.querySelector("[data-director3d-workbench]") && !Ut(At.target)) {
          if (At.key === "Escape") {
            if (!B.current) return;
            At.preventDefault(), $e();
            return;
          }
          (At.key === "t" || At.key === "T") && (At.preventDefault(), At.stopPropagation(), B.current ? $e() : Me());
        }
      };
    return window.addEventListener("keydown", _t), () => window.removeEventListener("keydown", _t);
  }, [$e, Me]);
  const Ye = g.useMemo(() => yza(r, i), [r, i]),
    Ce = g.useMemo(() => {
      const Ut = L.trim().toLowerCase(),
        _t = Yt => Iwt(Yt, Ut),
        At = Yt => !Ut || Uie(Yt.name, Ut) ? !0 : (Yt.collapsedMemberNodes ?? []).some(_t);
      return {
        groups: Ye.groups.map(Yt => ({
          ...Yt,
          nodes: Yt.isCollapsed ? [] : Yt.nodes.filter(_t)
        })).filter(Yt => Yt.isCollapsed ? At(Yt) : Yt.nodes.length > 0),
        ungroupedNodes: Ye.ungroupedNodes.filter(_t)
      };
    }, [Ye, L]),
    He = g.useCallback(Ut => {
      H(_t => {
        const At = new Set(_t);
        return At.has(Ut) ? At.delete(Ut) : At.add(Ut), At;
      });
    }, []),
    Ve = g.useCallback(Ut => {
      K(`__nav_stack__:${Ut.id}`), u == null || u(Ut);
    }, [u]),
    it = g.useCallback(Ut => {
      K(Ut.id), d == null || d(Ut);
    }, [d]),
    It = Ut => {
      const _t = Y === Ut.id;
      return c.jsxs("button", {
        type: "button",
        className: `flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${_t ? h ? "bg-zinc-100/12 text-zinc-50 ring-1 ring-zinc-500/50" : "bg-zinc-900/8 text-zinc-900 ring-1 ring-zinc-400/60" : h ? "text-zinc-200 hover:bg-zinc-800/80" : "text-zinc-700 hover:bg-zinc-100"}`,
        onClick: () => it(Ut),
        title: ike(Ut),
        children: [c.jsx("div", {
          className: `h-8 w-8 shrink-0 overflow-hidden rounded-md ${h ? "bg-zinc-800" : "bg-zinc-100"}`,
          children: c.jsx(Bkt, {
            node: Ut,
            className: "h-full w-full"
          })
        }), c.jsx("span", {
          className: `shrink-0 rounded-full border px-2 py-0.5 text-[10px] leading-tight ${h ? "border-zinc-600 text-zinc-400" : "border-zinc-300 text-zinc-500"}`,
          children: WLt(Ut)
        }), c.jsx("span", {
          className: "min-w-0 flex-1 truncate",
          children: ike(Ut)
        })]
      }, Ut.id);
    },
    Ft = W.width,
    We = W.height,
    Ze = g.useMemo(() => Ast(we, Ft, We, R_), [we, Ft, We]);
  !jl() && !Rl() && !P.current && (T.current = Ze);
  const Ge = g.useMemo(() => FL(Ze, be, t, n), [Ze, be, t, n]);
  g.useLayoutEffect(() => {
    jl() || Rl() || P.current || (dO(S.current, xe, _, WI, hC), B.current && (dO(C.current, Ge, Ft, We, R_), Sst(I.current, Ge, Ft, We, R_)));
  }, [xe, Ge, Ft, We, _]);
  const Oe = g.useCallback((Ut, _t = !1) => {
      const At = J.current,
        Yt = Ze.toWorldX(Ut.x + Ut.width / 2),
        qe = Ze.toWorldY(Ut.y + Ut.height / 2);
      he({
        ...At,
        x: t / 2 - Yt * At.zoom,
        y: n / 2 - qe * At.zoom
      }, _t, Ft, We, R_);
    }, [Ze, t, n, he, Ft, We]),
    st = g.useCallback(Ut => {
      var kt, St;
      Ut.preventDefault(), Ut.stopPropagation();
      const _t = A.current;
      if (!_t) return;
      const At = _t.getBoundingClientRect();
      le.current = At;
      const Yt = Ut.clientX - At.left,
        qe = Ut.clientY - At.top;
      if (ue(), qIi(Yt, qe, Ge, 6)) de.current = "viewport", ne.current = {
        x: Yt - Ge.x,
        y: qe - Ge.y
      };else {
        de.current = "background", ne.current = null;
        const hn = Ze.toWorldX(Yt),
          Qt = Ze.toWorldY(qe),
          Ot = J.current;
        he({
          ...Ot,
          x: t / 2 - hn * Ot.zoom,
          y: n / 2 - Qt * Ot.zoom
        }, !0, Ft, We, R_);
      }
      (St = (kt = Ut.currentTarget).setPointerCapture) == null || St.call(kt, Ut.pointerId);
    }, [Ge, Ze, t, n, he, Ft, We, ue]),
    vt = g.useCallback(Ut => {
      if (!P.current) return;
      const _t = A.current;
      if (!_t) return;
      const At = le.current ?? _t.getBoundingClientRect(),
        Yt = Ut.clientX - At.left,
        qe = Ut.clientY - At.top;
      if (de.current === "viewport" && ne.current) {
        const kt = KIi({
          ...Ge,
          x: Yt - ne.current.x,
          y: qe - ne.current.y
        }, Ft, We, R_);
        Oe(kt, !1);
        return;
      }
      if (de.current === "background") {
        const kt = Ze.toWorldX(Yt),
          St = Ze.toWorldY(qe),
          hn = J.current;
        he({
          ...hn,
          x: t / 2 - kt * hn.zoom,
          y: n / 2 - St * hn.zoom
        }, !1, Ft, We, R_);
      }
    }, [Ge, Ze, Ft, We, Oe, t, n, he]),
    Ht = g.useCallback(Ut => {
      var _t, At;
      (At = (_t = Ut.currentTarget).releasePointerCapture) == null || At.call(_t, Ut.pointerId), de.current = null, ne.current = null, ge();
    }, [ge]),
    nn = () => c.jsxs("div", {
      className: "flex shrink-0 items-center gap-1.5",
      children: [c.jsx("button", {
        type: "button",
        className: `flex h-8 w-8 items-center justify-center rounded-xl border transition-colors ${Fe}`,
        onClick: $e,
        title: x("收起导航"),
        "aria-label": x("收起导航"),
        children: c.jsx(AT, {
          size: 14
        })
      }), c.jsx("button", {
        type: "button",
        className: `flex h-8 w-8 items-center justify-center rounded-xl border transition-colors ${Fe}`,
        onClick: $e,
        title: x("关闭"),
        "aria-label": x("关闭导航"),
        children: c.jsx(Na, {
          size: 14
        })
      })]
    }),
    pt = R && typeof document < "u" ? Da.createPortal(c.jsx("div", {
      className: `fixed inset-0 z-[95] flex items-center justify-center p-3 backdrop-blur-[18px] backdrop-saturate-125 sm:p-5 ${h ? "bg-black/45" : "bg-black/30"}`,
      "data-canvas-navigator-overlay": "true",
      onMouseDown: $e,
      children: c.jsxs("div", {
        className: "flex h-[min(92vh,860px)] w-[min(97vw,1520px)] min-h-0 items-stretch gap-4",
        onMouseDown: Ut => Ut.stopPropagation(),
        "data-canvas-navigator-panel": "true",
        children: [c.jsx("div", {
          className: `relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[28px] border backdrop-blur-xl ${Ne} ${me}`,
          children: c.jsxs("div", {
            ref: A,
            className: "absolute inset-0 select-none touch-none overflow-hidden rounded-[28px]",
            style: {
              cursor: "default"
            },
            onPointerDown: st,
            onPointerMove: vt,
            onPointerUp: Ht,
            onPointerLeave: Ht,
            children: [Ft > 0 && We > 0 && c.jsx(Ddn, {
              width: Ft,
              height: We,
              projection: Ze,
              nodes: we,
              viewportRect: Ge,
              viewportRectRef: C,
              highlightedNodeId: Y,
              showViewport: !1,
              isDark: h,
              padding: R_
            }), c.jsx("div", {
              ref: I,
              "data-canvas-minimap-viewport-handle": "true",
              className: `pointer-events-none absolute border-2 bg-transparent ${h ? "border-zinc-100/85" : "border-zinc-700/75"}`,
              style: {
                left: Ge.x,
                top: Ge.y,
                width: Ge.width,
                height: Ge.height,
                cursor: "grab"
              }
            })]
          })
        }), c.jsxs("aside", {
          className: `flex h-full w-[min(228px,20vw)] min-w-[196px] shrink-0 flex-col overflow-hidden rounded-[28px] border backdrop-blur-xl ${Ne} ${Ae}`,
          children: [c.jsxs("div", {
            className: "shrink-0 px-4 pb-3 pt-4",
            children: [c.jsxs("div", {
              className: "mb-2.5 flex items-center justify-between gap-2",
              children: [c.jsx("h2", {
                className: `min-w-0 truncate text-sm font-semibold ${h ? "text-zinc-100" : "text-zinc-800"}`,
                children: x("节点列表")
              }), nn()]
            }), c.jsxs("div", {
              className: "relative",
              children: [c.jsx(mc, {
                size: 14,
                className: `pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${h ? "text-zinc-500" : "text-zinc-400"}`
              }), c.jsx("input", {
                type: "search",
                value: L,
                onChange: Ut => D(Ut.target.value),
                placeholder: x("搜索节点..."),
                className: `w-full rounded-full border py-2 pl-9 pr-3 text-xs outline-none transition-colors ${h ? "border-zinc-700/80 bg-zinc-900/70 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500" : "border-zinc-200 bg-white/90 text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400"}`
              })]
            })]
          }), c.jsx("div", {
            className: "min-h-0 flex-1 overflow-y-auto rh-scroll-minimal custom-scrollbar px-3 pb-3",
            children: Ce.groups.length === 0 && Ce.ungroupedNodes.length === 0 ? c.jsx("p", {
              className: `px-2 py-6 text-center text-xs ${h ? "text-zinc-500" : "text-zinc-400"}`,
              children: x("无匹配节点")
            }) : c.jsxs(c.Fragment, {
              children: [Ce.ungroupedNodes.length > 0 && c.jsx("div", {
                className: "mb-2 space-y-0.5",
                children: Ce.ungroupedNodes.map(Ut => It(Ut))
              }), Ce.groups.map(Ut => {
                var At, Yt;
                if (Ut.isCollapsed) {
                  const qe = i.find(Qt => Qt.id === Ut.id);
                  if (!qe) return null;
                  const kt = Y === `__nav_stack__:${qe.id}`,
                    St = Ut.collapsedMemberCount ?? ((At = Ut.collapsedMemberNodes) == null ? void 0 : At.length) ?? 0,
                    hn = (Yt = Ut.collapsedMemberNodes) == null ? void 0 : Yt[0];
                  return c.jsxs("button", {
                    type: "button",
                    className: `mb-1 flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${kt ? h ? "bg-zinc-100/12 text-zinc-50 ring-1 ring-zinc-500/50" : "bg-zinc-900/8 text-zinc-900 ring-1 ring-zinc-400/60" : h ? "text-zinc-200 hover:bg-zinc-800/80" : "text-zinc-700 hover:bg-zinc-100"}`,
                    onClick: () => Ve(qe),
                    title: Dze(qe),
                    children: [hn ? c.jsx("div", {
                      className: `h-8 w-8 shrink-0 overflow-hidden rounded-md ${h ? "bg-zinc-800" : "bg-zinc-100"}`,
                      children: c.jsx(Bkt, {
                        node: hn,
                        className: "h-full w-full"
                      })
                    }) : null, c.jsx("span", {
                      className: `shrink-0 rounded-full border px-2 py-0.5 text-[10px] leading-tight ${h ? "border-zinc-600 text-zinc-400" : "border-zinc-300 text-zinc-500"}`,
                      children: x("折叠")
                    }), c.jsx("span", {
                      className: "min-w-0 flex-1 truncate font-medium",
                      children: Dze(qe)
                    }), c.jsx("span", {
                      className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] ${h ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500"}`,
                      children: St
                    })]
                  }, Ut.id);
                }
                const _t = U.has(Ut.id);
                return c.jsxs("div", {
                  className: "mb-1",
                  children: [c.jsxs("button", {
                    type: "button",
                    className: `flex w-full items-center gap-1.5 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${h ? "text-zinc-300 hover:bg-zinc-800/70" : "text-zinc-600 hover:bg-zinc-100"}`,
                    onClick: () => He(Ut.id),
                    children: [_t ? c.jsx(ss, {
                      size: 14,
                      className: "shrink-0 opacity-70"
                    }) : c.jsx(Mi, {
                      size: 14,
                      className: "shrink-0 opacity-70"
                    }), c.jsx("span", {
                      className: "min-w-0 flex-1 truncate font-medium",
                      children: Ut.name
                    }), c.jsx("span", {
                      className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] ${h ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500"}`,
                      children: Ut.nodes.length
                    })]
                  }), !_t && c.jsx("div", {
                    className: "mb-1 ml-2 space-y-0.5 border-l pl-2",
                    style: {
                      borderColor: h ? "rgba(63,63,70,0.45)" : "rgba(228,228,231,0.9)"
                    },
                    children: Ut.nodes.map(qe => It(qe))
                  })]
                }, Ut.id);
              })]
            })
          })]
        })]
      })
    }), document.body) : null,
    lt = h ? "border-zinc-600/80 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800" : "border-zinc-300/80 bg-white/90 text-zinc-600 hover:bg-zinc-50";
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      ref: y,
      className: `group flex select-none touch-none ${f ? "relative flex-col items-start gap-1.5" : "fixed bottom-3 right-3 z-[120] flex-col items-end gap-1.5"} ${p}`,
      "data-canvas-minimap": "true",
      "data-canvas-minimap-dock": f ? "left" : "right",
      style: {
        isolation: "isolate"
      },
      children: [V && c.jsx(GIi, {
        nodes: r,
        groups: i,
        isDark: h,
        onClose: Xe,
        onGroupFocus: u
      }), G && c.jsx($Ii, {
        nodes: r,
        groups: i,
        isDark: h,
        onClose: Ke,
        onNodeFocus: d,
        onGroupFocus: u,
        hoverPreviewSide: f ? "right" : "left"
      }), c.jsxs("div", {
        className: f && F === "stats" ? "grid grid-flow-col auto-cols-max items-center gap-x-2 h-4 leading-none" : f ? "flex w-max flex-col items-start gap-1.5" : "contents",
        children: [F === "stats" ? c.jsx(RIi, {
          connectionCount: a.length,
          nodeCount: X,
          groupCount: De,
          isDark: h,
          variant: f ? "minimal" : "default",
          nodeGalleryOpen: G,
          groupGalleryOpen: V,
          onNodeCountClick: ze,
          onGroupCountClick: Le,
          onBackToMinimap: nt
        }) : c.jsxs("div", {
          ref: b,
          className: "canvas-minimap-surface relative cursor-grab overflow-hidden active:cursor-grabbing",
          style: {
            position: "relative",
            width: f ? _ : nV,
            height: WI,
            boxSizing: "border-box",
            borderRadius: VIi,
            backgroundColor: ve,
            boxShadow: `inset 0 0 0 1px ${Te}`,
            border: "none",
            overflow: "hidden",
            WebkitTapHighlightColor: "transparent"
          },
          onPointerDown: ke.handlePointerDown,
          onPointerMove: ke.handlePointerMove,
          onPointerUp: ke.handlePointerUp,
          onPointerCancel: ke.handlePointerUp,
          role: "button",
          "aria-label": x("画布导航"),
          "aria-roledescription": "可拖拽的小地图",
          children: [c.jsx(Ddn, {
            width: f ? _ : nV,
            height: WI,
            projection: Ee,
            nodes: we,
            viewportRect: xe,
            viewportRectRef: S,
            isDark: h
          }), c.jsxs("div", {
            className: "absolute right-1.5 top-1.5 z-[1] flex items-center gap-1 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto",
            children: [c.jsx("button", {
              type: "button",
              className: `flex h-6 w-6 items-center justify-center rounded-md border ${lt}`,
              onClick: rt,
              onPointerDown: Ut => Ut.stopPropagation(),
              "aria-label": x("切换到统计导航"),
              children: c.jsx(eI, {
                size: 12
              })
            }), c.jsx("button", {
              type: "button",
              className: `flex h-6 w-6 items-center justify-center rounded-md border ${lt}`,
              onClick: Re,
              onPointerDown: Ut => Ut.stopPropagation(),
              title: x("展开全屏导航 (T)"),
              "aria-label": x("展开全屏导航"),
              children: c.jsx(Wm, {
                size: 12
              })
            })]
          })]
        }), f ? c.jsx("div", {
          ref: v,
          className: "w-max self-start",
          children: m
        }) : null]
      })]
    }), pt]
  });
}

const JIi = ({
  zoom: e,
  onZoomChange: t,
  isDark: n = !0,
  minZoom: r = Sd.MIN_ZOOM,
  maxZoom: a = Sd.MAX_ZOOM,
  isZoomLocked: i = !1,
  onZoomLockChange: o,
  useFastTooltip: s = !1,
  minimal: l = !1,
  expandPlacement: d = "default",
  expandAnchorRef: u,
  repositionKey: h,
  showLock: p = !0
}) => {
  const m = O => s ? {
      "data-tip": O
    } : {
      title: O
    },
    [f, y] = g.useState(!1),
    [b, v] = g.useState(!1),
    [_, w] = g.useState(Math.round(e * 100).toString()),
    [k, A] = g.useState(!1),
    [S, C] = g.useState({}),
    I = g.useRef(null),
    E = g.useRef(null),
    M = g.useRef(null),
    T = g.useRef(null),
    P = d === "above-self" && !!u,
    R = O => (Math.log(O) - Math.log(r)) / (Math.log(a) - Math.log(r)) * 100,
    j = g.useCallback(O => {
      const L = O / 100;
      return Math.exp(Math.log(r) + L * (Math.log(a) - Math.log(r)));
    }, [r, a]),
    B = R(e),
    F = g.useCallback(() => {
      if (!P) return;
      const O = (u == null ? void 0 : u.current) ?? M.current;
      if (!O) return;
      const L = O.getBoundingClientRect();
      C({
        position: "fixed",
        left: Math.max(8, L.left),
        bottom: window.innerHeight - L.top + 8,
        minWidth: 220,
        zIndex: 210
      });
    }, [P, u]);
  g.useEffect(() => {
    if (!(!f || !P)) return F(), window.addEventListener("resize", F), () => window.removeEventListener("resize", F);
  }, [f, P, F, h]), g.useEffect(() => {
    if (!f) return;
    const O = L => {
      var U, H;
      const D = L.target;
      (U = M.current) != null && U.contains(D) || (H = T.current) != null && H.contains(D) || y(!1);
    };
    return document.addEventListener("mousedown", O), () => document.removeEventListener("mousedown", O);
  }, [f]), g.useEffect(() => {
    if (!k) return;
    const O = D => {
        if (!I.current) return;
        const U = I.current.getBoundingClientRect(),
          H = D.clientX - U.left,
          Y = Math.max(0, Math.min(100, H / U.width * 100)),
          K = j(Y);
        t(Math.round(K * 100) / 100);
      },
      L = () => {
        A(!1);
      };
    return document.addEventListener("mousemove", O), document.addEventListener("mouseup", L), () => {
      document.removeEventListener("mousemove", O), document.removeEventListener("mouseup", L);
    };
  }, [k, t, j]);
  const N = O => {
      if (!I.current) return;
      const L = I.current.getBoundingClientRect(),
        D = O.clientX - L.left,
        U = Math.max(0, Math.min(100, D / L.width * 100)),
        H = j(U);
      t(Math.round(H * 100) / 100);
    },
    G = `flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border shadow-lg transition-all ${n ? "bg-zinc-900/95 border-zinc-700 text-zinc-300" : "bg-white/95 border-zinc-200 text-zinc-700"}`,
    z = c.jsxs("div", {
      ref: T,
      className: G,
      style: P ? S : {
        minWidth: "220px",
        top: "60px",
        right: "16px",
        position: "fixed",
        zIndex: 50
      },
      children: [c.jsx("button", {
        onClick: () => {
          const O = Math.max(r, e / 1.2);
          t(Math.round(O * 100) / 100);
        },
        className: `p-0.5 rounded transition-colors flex-shrink-0 ${n ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800"}`,
        ...m("缩小"),
        children: c.jsx(Wue, {
          size: 14
        })
      }), c.jsxs("div", {
        ref: I,
        className: `flex-1 h-1 rounded-full cursor-pointer relative group ${n ? "bg-zinc-700" : "bg-zinc-300"}`,
        onMouseDown: O => {
          A(!0), N(O);
        },
        style: {
          minWidth: "60px"
        },
        children: [c.jsx("div", {
          className: `h-full rounded-full transition-all ${n ? "bg-blue-600" : "bg-blue-500"}`,
          style: {
            width: `${B}%`
          }
        }), c.jsx("div", {
          className: `absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all ${n ? "bg-blue-500 group-hover:bg-blue-400" : "bg-blue-400 group-hover:bg-blue-500"}`,
          style: {
            left: `${B}%`,
            transform: "translate(-50%, -50%)"
          }
        })]
      }), c.jsx("div", {
        className: `w-10 text-center text-xs font-medium cursor-pointer rounded px-1.5 py-0.5 transition-colors flex-shrink-0 ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-200 text-zinc-700"}`,
        onDoubleClick: () => {
          v(!0), w(Math.round(e * 100).toString()), setTimeout(() => {
            var O;
            (O = E.current) == null || O.select();
          }, 0);
        },
        ...m("双击输入自定义缩放比例"),
        children: b ? c.jsx("input", {
          ref: E,
          type: "number",
          value: _,
          onChange: O => w(O.target.value),
          onBlur: () => {
            const O = parseInt(_, 10);
            !isNaN(O) && O >= r * 100 && O <= a * 100 && t(O / 100), v(!1);
          },
          onKeyDown: O => {
            if (O.key === "Enter") {
              const L = parseInt(_, 10);
              !isNaN(L) && L >= r * 100 && L <= a * 100 && t(L / 100), v(!1);
            } else O.key === "Escape" && v(!1);
          },
          min: Math.round(r * 100),
          max: Math.round(a * 100),
          className: `w-full text-center text-xs font-medium rounded px-0.5 py-0.5 ${n ? "bg-zinc-800 border border-blue-500 text-white" : "bg-white border border-blue-400 text-black"}`
        }) : `${Math.round(e * 100)}%`
      }), c.jsx("button", {
        onClick: () => {
          const O = Math.min(a, e * 1.2);
          t(Math.round(O * 100) / 100);
        },
        className: `p-0.5 rounded transition-colors flex-shrink-0 ${n ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800"}`,
        ...m("放大"),
        children: c.jsx(Z$, {
          size: 14
        })
      }), c.jsx("button", {
        onClick: () => y(!1),
        className: `p-0.5 rounded transition-colors flex-shrink-0 ${n ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800"}`,
        ...m("关闭"),
        children: c.jsx(Na, {
          size: 14
        })
      })]
    }),
    V = l ? `inline-flex items-center justify-center h-4 px-0 m-0 p-0 border-0 bg-transparent text-xs font-medium tabular-nums leading-none cursor-pointer transition-colors duration-200 shrink-0 ${n ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800"}` : `text-xs font-medium cursor-pointer rounded px-2 py-0.5 transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-200 text-zinc-700"}`;
  return c.jsxs("div", {
    ref: M,
    className: `relative flex items-center justify-center h-4 ${l ? "" : "gap-1"}`,
    children: [p && o && c.jsx("button", {
      onClick: () => {
        o(!i);
      },
      className: `p-0.5 rounded transition-colors ${i ? n ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30" : "bg-blue-100 text-blue-600 hover:bg-blue-200" : n ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800"}`,
      ...m(i ? "解锁缩放" : "锁定缩放（锁定后滚轮上下浏览画布）"),
      children: i ? c.jsx(ece, {
        size: 13
      }) : c.jsx(oxe, {
        size: 13
      })
    }), f ? P ? Da.createPortal(z, document.body) : z : c.jsxs("div", {
      className: V,
      onDoubleClick: () => {
        y(!0), P && requestAnimationFrame(F);
      },
      ...m("双击打开缩放控制面板"),
      children: [Math.round(e * 100), "%"]
    })]
  });
};

function ZIi({
  size: e = 16,
  className: t
}) {
  return on(), c.jsxs("svg", {
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: `block shrink-0 ${t ?? ""}`,
    "aria-hidden": !0,
    children: [c.jsx("rect", {
      x: "3.25",
      y: "3.25",
      width: "7.5",
      height: "7.5",
      rx: "1.6",
      stroke: "currentColor",
      strokeWidth: "1.75"
    }), c.jsx("rect", {
      x: "13.25",
      y: "13.25",
      width: "7.5",
      height: "7.5",
      rx: "1.6",
      stroke: "currentColor",
      strokeWidth: "1.75"
    }), c.jsx("path", {
      d: "M7 10.75V17h6.25",
      stroke: "currentColor",
      strokeWidth: "1.75",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })]
  });
}

const jMe = "flex items-center justify-center w-4 h-4 shrink-0 p-0 m-0 leading-none [line-height:0]",
  eCi = ({
    isDark: e,
    theme: t,
    leftOffsetPx: n = 16,
    zoom: r,
    onZoomChange: a,
    isZoomLocked: i,
    onZoomLockChange: o,
    onThemeToggle: s,
    canvasBackgroundColor: l,
    canvasBackgroundDefaultHex: d,
    onCanvasBackgroundColorChange: u,
    materialLibraryOpen: h = !1,
    onToggleMaterialLibrary: p,
    hideConnections: m = !1,
    onToggleConnections: f,
    showCanvasMinimap: y = !1,
    onToggleCanvasMinimap: b,
    embedded: v = !1
  }) => {
    on();
    const _ = g.useRef(null),
      w = e ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800",
      k = `${jMe} border-0 bg-transparent cursor-pointer transition-colors duration-200 ${w}`,
      A = c.jsxs("div", {
        ref: _,
        className: "grid grid-flow-col auto-cols-max items-center gap-x-2 h-4 leading-none",
        children: [p && c.jsx("button", {
          type: "button",
          onClick: S => {
            S.preventDefault(), S.stopPropagation(), p(S);
          },
          className: `${jMe} border-0 bg-transparent cursor-pointer transition-colors duration-200 ${h ? e ? "text-blue-400" : "text-blue-600" : w}`,
          "data-tip": x("素材库"),
          "data-toolbar-active": h ? "true" : "false",
          "aria-pressed": h,
          "aria-label": x("素材库"),
          children: c.jsx(Sc, {
            size: 16,
            strokeWidth: 1.75,
            className: "block shrink-0"
          })
        }), c.jsx(aWe, {
          isDark: e,
          theme: t,
          canvasBackgroundColor: l,
          canvasBackgroundDefaultHex: d,
          onCanvasBackgroundColorChange: u,
          placement: "above",
          dataTip: nx("画布背景色（圆点网格不变，仅底层颜色；按当前明暗主题分别记忆）")
        }), c.jsx("button", {
          type: "button",
          onClick: S => {
            S.preventDefault(), S.stopPropagation(), s();
          },
          className: k,
          "data-tip": x("切换明暗主题"),
          children: t === "dark" ? c.jsx(AD, {
            size: 16,
            strokeWidth: 1.75,
            className: "block shrink-0 text-amber-400"
          }) : c.jsx(dTn, {
            size: 16,
            strokeWidth: 1.75,
            className: "block shrink-0 text-blue-500"
          })
        }), b && c.jsx("button", {
          type: "button",
          onClick: S => {
            S.preventDefault(), S.stopPropagation(), b();
          },
          className: `${jMe} border-0 bg-transparent cursor-pointer transition-colors duration-200 ${y ? e ? "text-blue-400" : "text-blue-600" : w}`,
          "data-tip": x(y ? "收起画布导航" : "展开画布导航"),
          "data-toolbar-active": y ? "true" : "false",
          "aria-label": x(y ? "收起画布导航" : "展开画布导航"),
          "aria-pressed": y,
          children: c.jsx(gmt, {
            size: 16,
            strokeWidth: 1.75,
            className: "block shrink-0"
          })
        }), f && c.jsx("button", {
          type: "button",
          onClick: S => {
            S.preventDefault(), S.stopPropagation(), f();
          },
          className: `${jMe} border-0 bg-transparent cursor-pointer transition-colors duration-200 ${m ? e ? "text-amber-400" : "text-amber-500" : w}`,
          "data-tip": x(m ? "显示连接线" : "隐藏连接线"),
          "data-toolbar-active": m ? "true" : "false",
          "aria-pressed": m,
          children: c.jsx(ZIi, {
            size: 16,
            className: m ? e ? "text-amber-400" : "text-amber-500" : void 0
          })
        }), c.jsx("button", {
          type: "button",
          onClick: S => {
            S.preventDefault(), S.stopPropagation(), o(!i);
          },
          className: `${k} ${i ? e ? "text-blue-400" : "text-blue-600" : ""}`,
          "data-tip": i ? x("解锁缩放") : lIi("锁定缩放（锁定后滚轮上下浏览画布）"),
          children: i ? c.jsx(ece, {
            size: 16,
            strokeWidth: 1.75,
            className: "block shrink-0"
          }) : c.jsx(oxe, {
            size: 16,
            strokeWidth: 1.75,
            className: "block shrink-0"
          })
        }), c.jsx("div", {
          className: `w-px h-3 shrink-0 ${e ? "bg-zinc-600" : "bg-zinc-300"}`,
          "aria-hidden": !0
        }), c.jsx(JIi, {
          zoom: r,
          onZoomChange: a,
          isDark: e,
          minZoom: Sd.MIN_ZOOM,
          maxZoom: Sd.MAX_ZOOM,
          expandPlacement: "above-self",
          minimal: !0,
          expandAnchorRef: _,
          repositionKey: n,
          showLock: !1,
          useFastTooltip: !0
        })]
      });
    return v ? c.jsx("div", {
      className: `pointer-events-auto canvas-viewport-bar-fast-tooltip ${e ? "canvas-viewport-bar-fast-tooltip--dark" : "canvas-viewport-bar-fast-tooltip--light"}`,
      "data-canvas-viewport-bar": "true",
      children: A
    }) : c.jsx("div", {
      className: `fixed bottom-4 z-[120] pointer-events-auto canvas-viewport-bar-fast-tooltip ${e ? "canvas-viewport-bar-fast-tooltip--dark" : "canvas-viewport-bar-fast-tooltip--light"}`,
      style: {
        left: n
      },
      "data-canvas-viewport-bar": "true",
      children: A
    });
  };

function Ldn({
  profile: e,
  size: t = 13
}) {
  return on(), e === "preview" ? c.jsx(ul, {
    size: t
  }) : e === "supervised" ? c.jsx(Zle, {
    size: t
  }) : e === "production" ? c.jsx(STn, {
    size: t
  }) : c.jsx(fZ, {
    size: t
  });
}

function tCi({
  runId: e,
  value: t,
  isDark: n
}) {
  on();
  const [r, a] = g.useState(!1),
    [i, o] = g.useState(() => DP().canvasFileAccess),
    s = g.useRef(null),
    l = mie.find(d => d.value === t) ?? mie[1];
  return g.useEffect(() => {
    if (!r) return;
    o(DP().canvasFileAccess);
    const d = u => {
      var p;
      const h = u.target;
      (p = s.current) != null && p.contains(h) || h != null && h.closest("[data-production-permission-panel]") || a(!1);
    };
    return document.addEventListener("mousedown", d, !0), () => document.removeEventListener("mousedown", d, !0);
  }, [r]), c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      ref: s,
      type: "button",
      className: `production-zone-bar__button production-permission-trigger is-${t}`,
      title: `${x(l.title)}：${x(l.description)}`,
      "aria-haspopup": "menu",
      "aria-expanded": r,
      onClick: () => a(d => !d),
      children: c.jsx(Ldn, {
        profile: t
      })
    }), c.jsxs(yg, {
      open: r,
      anchorRef: s,
      isDark: n,
      placement: "below",
      align: "right",
      gap: 6,
      unstyled: !0,
      zIndex: 10300,
      dataPortalAttr: "data-production-permission-panel",
      className: `production-permission-panel ${n ? "is-dark" : "is-light"}`,
      children: [c.jsx("div", {
        className: "production-permission-panel__label",
        children: x("画布 Agent 应如何执行？")
      }), mie.map(d => c.jsxs("button", {
        type: "button",
        className: `production-permission-option ${d.value === t ? "is-selected" : ""} ${d.tone === "warn" ? "is-warn" : ""}`,
        onClick: () => {
          d.value === "studio" && t !== "studio" && !window.confirm(x("工作室模式会自动执行非破坏性画布操作，并把并发上限提高到 8。删除、清理等危险动作仍会单独询问。确定开启？")) || (nZn(e, d.value), a(!1));
        },
        children: [c.jsx("span", {
          className: "production-permission-option__icon",
          children: c.jsx(Ldn, {
            profile: d.value,
            size: 14
          })
        }), c.jsxs("span", {
          className: "production-permission-option__copy",
          children: [c.jsx("strong", {
            children: x(d.title)
          }), c.jsx("small", {
            children: x(d.description)
          })]
        }), c.jsxs("span", {
          className: "production-permission-option__concurrency",
          children: ["×", d.maxConcurrentJobs]
        }), d.value === t ? c.jsx(io, {
          size: 14
        }) : null]
      }, d.value)), c.jsx("div", {
        className: "production-permission-panel__label",
        children: x("画布 Agent 调文件")
      }), CRt.map(d => c.jsxs("button", {
        type: "button",
        className: `production-permission-option ${d.value === i ? "is-selected" : ""} ${d.value === "allow" ? "is-warn" : ""}`,
        onClick: () => {
          d.value === "allow" && i !== "allow" && !window.confirm(x("允许后，画布 Agent 可在已绑定工作区内读写文件。写入仍可能按文件档位询问，系统目录始终拒绝。确定开启？")) || (pQe({
            canvasFileAccess: d.value
          }), o(d.value), a(!1));
        },
        children: [c.jsxs("span", {
          className: "production-permission-option__copy",
          children: [c.jsx("strong", {
            children: x(d.title)
          }), c.jsx("small", {
            children: x(d.description)
          })]
        }), d.value === i ? c.jsx(io, {
          size: 14
        }) : null]
      }, `file-${d.value}`)), c.jsx("p", {
        className: "production-permission-panel__footnote",
        children: x("所有档位都会保留删除、清理和外部发布审批。调文件需要先绑定 Local Skill 工作区。")
      })]
    })]
  });
}

function nCi(e) {
  qP("recipes", {
    recipeId: e
  });
}

function rCi(e, t) {
  if (t.interacting) return Math.round(e * 1e3) / 1e3;
  const n = Math.max(1, Number(t.devicePixelRatio) || 1);
  return Math.round(e * n) / n;
}

function Odn(e) {
  var d;
  if (!e.containerRect) return null;
  const t = e.nodeIds instanceof Set ? e.nodeIds : new Set([...e.nodeIds].filter(Boolean));
  if (t.size === 0) return null;
  const n = e.view.zoom > 0 && Number.isFinite(e.view.zoom) ? e.view.zoom : 1;
  let r = Number.POSITIVE_INFINITY,
    a = Number.POSITIVE_INFINITY,
    i = Number.NEGATIVE_INFINITY,
    o = Number.NEGATIVE_INFINITY,
    s = 0;
  const l = e.nodeById ? (function* () {
    var h;
    for (const p of t) {
      const m = (h = e.nodeById) == null ? void 0 : h.get(p);
      m && (yield m);
    }
  })() : e.nodes;
  for (const u of l) {
    if (!e.nodeById && !t.has(u.id)) continue;
    const h = (d = e.livePosition) == null ? void 0 : d.call(e, u.id),
      p = (h == null ? void 0 : h.x) ?? u.x,
      m = (h == null ? void 0 : h.y) ?? u.y;
    if (!Number.isFinite(p) || !Number.isFinite(m)) continue;
    const f = Math.max(1, Number(u.width) || 1),
      y = Math.max(1, Number(u.height) || 1),
      b = e.containerRect.left + e.view.x + p * n,
      v = e.containerRect.top + e.view.y + m * n,
      _ = b + f * n,
      w = v + y * n;
    r = Math.min(r, b), a = Math.min(a, v), i = Math.max(i, _), o = Math.max(o, w), s += 1;
  }
  return s === 0 ? null : {
    left: r,
    top: a,
    width: Math.max(24, i - r),
    height: Math.max(24, o - a)
  };
}

function aCi(e) {
  if (e.nodeCount <= 0 || e.matchedNodeCount <= 0) return !1;
  const t = String(e.runProjectId || "").trim(),
    n = String(e.projectId || "").trim();
  return t === n;
}

const iCi = {
    queued: "排队中",
    planning: "分析与规划",
    waiting_approval: "等待批准",
    running: "生产中",
    waiting_generation: "等待生成",
    reviewing: "质量检查",
    paused: "已暂停",
    completed: "已完成",
    failed: "执行失败"
  },
  Fkt = ".node-wrapper[data-node-id]",
  Cye = 12;

function oCi(e) {
  return Math.max(12, (e ?? 88) - Cye);
}

function sCi(e, t) {
  t.clear();
  for (const n of e.querySelectorAll(Fkt)) {
    const r = String(n.dataset.nodeId || "").trim();
    r && t.set(r, n);
  }
}

function Bdn(e, t, n) {
  if (!(t instanceof Element)) return;
  const r = [...(t.matches(Fkt) ? [t] : []), ...t.querySelectorAll(Fkt)];
  for (const a of r) {
    const i = String(a.dataset.nodeId || "").trim();
    i && (n ? e.set(i, a) : e.get(i) === a && e.delete(i));
  }
}

function Ist(e, t, n) {
  if (!e || !n) return null;
  const r = t.get(n);
  if (r != null && r.isConnected && e.contains(r)) return r.getBoundingClientRect();
  r && t.delete(n);
  const a = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(n) : n.replace(/["\\]/g, "\\$&"),
    i = e.querySelector(`.node-wrapper[data-node-id="${a}"]`);
  return i ? (t.set(n, i), i.getBoundingClientRect()) : null;
}

function lCi({
  nodes: e,
  connections: t = [],
  view: n,
  canvasContainerRef: r,
  isDark: a,
  hidden: i = !1,
  projectId: o = null,
  interactionActive: s = !1
}) {
  var q, ne;
  on();
  const l = rZn(),
    d = Wja(),
    u = QZn(l == null ? void 0 : l.id),
    [h, p] = g.useState(!1),
    m = g.useRef(null),
    f = g.useRef(null),
    y = g.useRef(""),
    b = g.useRef(null),
    v = g.useRef(e),
    _ = g.useMemo(() => new Map(e.map(de => [de.id, de])), [e]),
    w = g.useRef(_),
    k = g.useRef(new Map()),
    A = g.useRef(n),
    S = g.useRef(new Set()),
    C = g.useRef(() => {}),
    I = l ? b.current ?? ((q = r.current) == null ? void 0 : q.getBoundingClientRect()) ?? null : null,
    E = g.useMemo(() => new Set((l == null ? void 0 : l.changeSets.flatMap(de => de.nodeIds)) ?? []), [l == null ? void 0 : l.changeSets]),
    M = g.useMemo(() => {
      const de = new Set((l == null ? void 0 : l.scope.nodeIds) ?? []);
      for (const le of E) de.add(le);
      for (const le of (l == null ? void 0 : l.tasks) ?? []) for (const J of le.nodeIds ?? []) de.add(J);
      return de;
    }, [l == null ? void 0 : l.scope.nodeIds, l == null ? void 0 : l.tasks, E]),
    T = g.useMemo(() => [...M].sort().join(""), [M]);
  v.current = e, w.current = _, A.current = n, S.current = M;
  const P = Yi() || s ? Cd() : n,
    R = l ? Odn({
      containerRect: I,
      view: P,
      nodes: e,
      nodeById: _,
      nodeIds: M,
      livePosition: JE
    }) : null,
    j = g.useMemo(() => e.reduce((de, le) => de + (M.has(le.id) ? 1 : 0), 0), [e, M]),
    B = !!l && aCi({
      projectId: o,
      runProjectId: l == null ? void 0 : l.projectId,
      nodeCount: e.length,
      matchedNodeCount: j
    }),
    F = (d == null ? void 0 : d.runId) === (l == null ? void 0 : l.id) ? d : null,
    N = (F == null ? void 0 : F.operations.filter(de => de.kind === "create")) ?? [],
    G = (F == null ? void 0 : F.operations.filter(de => (de.kind === "update" || de.kind === "delete" || de.kind === "run") && de.nodeId)) ?? [],
    z = (F == null ? void 0 : F.operations.filter(de => de.kind === "connect")) ?? [],
    V = g.useMemo(() => {
      var X;
      if (!F || N.length === 0) return [];
      const de = ((X = r.current) == null ? void 0 : X.getBoundingClientRect()) ?? null,
        le = n.zoom > 0 ? n.zoom : 1,
        J = typeof window > "u" ? 1200 : window.innerWidth,
        pe = typeof window > "u" ? 800 : window.innerHeight,
        ce = R ? R.left + R.width + 204 < J ? R.left + R.width + 24 : R.left + 24 : J / 2 - 90,
        we = R ? R.top + 64 : 150;
      return N.slice(0, 6).map((Z, re) => {
        const fe = de && Z.x != null && Z.y != null,
          ye = Math.max(104, Math.min(220, (Z.width ?? 180) * (fe ? le : 1))),
          ie = Math.max(74, Math.min(160, (Z.height ?? 118) * (fe ? le : 1))),
          ae = re % 2,
          be = Math.floor(re / 2),
          Ee = fe ? de.left + n.x + Z.x * le : ce + ae * 120,
          xe = fe ? de.top + n.y + Z.y * le : we + be * 92;
        return {
          operation: Z,
          left: Math.max(12, Math.min(J - ye - 12, Ee)),
          top: Math.max(64, Math.min(pe - ie - 12, xe)),
          width: ye,
          height: ie
        };
      });
    }, [R, r, F, N, n]),
    O = G.map(de => ({
      operation: de,
      rect: Ist(r.current, k.current, de.nodeId)
    })).filter(de => !!de.rect),
    L = z.map(de => ({
      operation: de,
      from: Ist(r.current, k.current, de.fromNodeId),
      to: Ist(r.current, k.current, de.toNodeId)
    })).filter(de => de.from && de.to),
    D = de => {
      const le = de ?? A.current,
        J = Number.isFinite(le.zoom) && le.zoom > 0 ? le : A.current,
        pe = Odn({
          containerRect: b.current,
          view: J,
          nodes: v.current,
          nodeById: w.current,
          nodeIds: S.current,
          livePosition: JE
        }),
        ce = window.innerWidth,
        we = Math.max(12, Math.min(ce - 396, pe ? pe.left : ce / 2 - 190)),
        X = oCi(pe == null ? void 0 : pe.top),
        Z = Yi() || s,
        re = ge => rCi(ge, {
          interacting: Z,
          devicePixelRatio: window.devicePixelRatio
        }),
        fe = pe ? re(pe.left - Cye) : 0,
        ye = pe ? re(pe.top - Cye) : 0,
        ie = pe ? re(pe.width + Cye * 2) : 0,
        ae = pe ? re(pe.height + Cye * 2) : 0,
        be = re(we),
        Ee = re(X),
        xe = pe ? `${fe}:${ye}:${ie}:${ae}:${be}:${Ee}` : `none:${be}:${Ee}`;
      if (xe === y.current) return;
      y.current = xe;
      const he = m.current;
      he && pe ? (he.style.transform = `translate3d(${fe}px, ${ye}px, 0)`, he.style.width = `${ie}px`, he.style.height = `${ae}px`, he.style.display = "") : he && (he.style.display = "none");
      const ue = f.current;
      ue && (ue.style.transform = `translate3d(${be}px, ${Ee}px, 0)`);
    };
  if (C.current = D, g.useLayoutEffect(() => {
    const de = k.current;
    if (de.clear(), !l || i || !B) return;
    const le = r.current;
    if (!le) return;
    const J = () => {
      const re = le.getBoundingClientRect();
      b.current = {
        left: re.left,
        top: re.top
      };
    };
    J(), sCi(le, de);
    const pe = new MutationObserver(re => {
      for (const fe of re) {
        for (const ye of fe.removedNodes) Bdn(de, ye, !1);
        for (const ye of fe.addedNodes) Bdn(de, ye, !0);
      }
    });
    pe.observe(le, {
      childList: !0,
      subtree: !0
    });
    const ce = () => {
        J(), C.current(A.current);
      },
      we = typeof ResizeObserver < "u" ? new ResizeObserver(() => {
        f$() || ce();
      }) : null;
    we == null || we.observe(le);
    const X = () => {
        tFt();
      },
      Z = bJe(ce);
    return window.addEventListener("resize", X), () => {
      pe.disconnect(), we == null || we.disconnect(), Z(), window.removeEventListener("resize", X), de.clear(), b.current = null;
    };
  }, [r, i, l == null ? void 0 : l.id, B]), g.useLayoutEffect(() => {
    if (!l || i || !B) return;
    const de = we => {
        we || C.current(A.current);
      },
      le = we => C.current(we);
    C.current(A.current);
    const J = $v(de),
      pe = dw(le),
      ce = O5t(le);
    return () => {
      J(), pe(), ce();
    };
  }, [r, i, l == null ? void 0 : l.id, B, T]), g.useLayoutEffect(() => {
    !l || i || !B || Yi() || s || C.current(A.current);
  }, [i, s, e, l == null ? void 0 : l.id, B, n]), !l || i || !B) return null;
  const U = pLt(l),
    H = l.status === "planning" || l.status === "running" || l.status === "waiting_generation" || l.status === "queued",
    Y = l.status === "planning" || l.status === "running" || l.status === "waiting_approval" || l.status === "queued" || l.status === "waiting_generation",
    K = H && u.running === 0 && u.queued === 0 && u.paused === 0,
    W = l.changeSets.length > 0 && Wui(l.id) && l.status !== "running" && l.status !== "planning",
    Q = l.preflight.riskLevel === "high" ? "高风险" : l.preflight.riskLevel === "medium" ? "需留意" : "低风险";
  return c.jsxs(c.Fragment, {
    children: [R ? c.jsx("div", {
      ref: m,
      className: `production-zone-boundary is-${l.status} ${a ? "is-dark" : "is-light"}`,
      "aria-hidden": !0
    }) : null, F ? c.jsxs("div", {
      className: "production-diff-layer",
      "aria-label": x("执行前画布改动预览"),
      children: [L.length > 0 ? c.jsx("svg", {
        className: "production-diff-connections",
        "aria-hidden": !0,
        children: L.map(({
          operation: de,
          from: le,
          to: J
        }) => c.jsx("line", {
          x1: ((le == null ? void 0 : le.left) ?? 0) + ((le == null ? void 0 : le.width) ?? 0) / 2,
          y1: ((le == null ? void 0 : le.top) ?? 0) + ((le == null ? void 0 : le.height) ?? 0) / 2,
          x2: ((J == null ? void 0 : J.left) ?? 0) + ((J == null ? void 0 : J.width) ?? 0) / 2,
          y2: ((J == null ? void 0 : J.top) ?? 0) + ((J == null ? void 0 : J.height) ?? 0) / 2
        }, de.id))
      }) : null, V.map(({
        operation: de,
        ...le
      }) => c.jsxs("div", {
        className: "production-diff-ghost is-create",
        style: le,
        children: [c.jsx(TLe, {
          size: 15
        }), c.jsx("span", {
          children: x(de.label)
        }), c.jsxs("small", {
          children: [de.nodeType || "node", x(" · 尚未写入")]
        })]
      }, de.id)), N.length > V.length ? c.jsxs("div", {
        className: "production-diff-more",
        children: ["+", N.length - V.length, x(" 个新增节点")]
      }) : null, O.map(({
        operation: de,
        rect: le
      }) => c.jsx("div", {
        className: `production-diff-node-mark is-${de.kind}`,
        style: {
          left: le.left - 5,
          top: le.top - 5,
          width: le.width + 10,
          height: le.height + 10
        },
        children: c.jsx("span", {
          children: x(de.label)
        })
      }, de.id))]
    }) : null, c.jsxs("section", {
      ref: f,
      className: `production-zone-bar ${a ? "is-dark" : "is-light"} is-${l.status}`,
      "aria-label": x("画布生产任务"),
      children: [c.jsxs("div", {
        className: "production-zone-bar__main",
        children: [c.jsx("span", {
          className: "production-zone-bar__icon",
          children: H ? c.jsx(Ua, {
            size: 14,
            className: "production-zone-spin"
          }) : c.jsx(ac, {
            size: 14
          })
        }), c.jsxs("button", {
          type: "button",
          className: "production-zone-bar__summary",
          onClick: () => p(de => !de),
          title: l.goal,
          children: [c.jsx("span", {
            className: "production-zone-bar__name",
            children: l.name
          }), c.jsxs("span", {
            className: "production-zone-bar__meta",
            children: [x(iCi[l.status]), U.total > 0 ? ` · ${U.completed}/${U.total}` : "", x(" · {0}/{1} 并发 · {2} 排队", u.running, u.maxConcurrent, u.queued), ` · ${l.scope.label}`]
          })]
        }), c.jsx("button", {
          type: "button",
          className: "production-zone-bar__button",
          onClick: OY,
          title: l.status === "waiting_approval" ? x("打开对话完成批准") : x("打开生产任务"),
          children: c.jsx(qv, {
            size: 13
          })
        }), c.jsx("button", {
          type: "button",
          className: "production-zone-bar__button",
          onClick: () => qP("current", {
            runId: l.id
          }),
          title: x("打开生产中心"),
          children: c.jsx(ZHe, {
            size: 13
          })
        }), c.jsx(tCi, {
          runId: l.id,
          value: l.permissionProfile,
          isDark: a
        }), K ? c.jsx("button", {
          type: "button",
          className: "production-zone-bar__button is-resume",
          onClick: () => zja(l.id),
          title: x("结果已在画布上，手动结束本次生产任务"),
          children: c.jsx(io, {
            size: 13
          })
        }) : Y ? c.jsx("button", {
          type: "button",
          className: "production-zone-bar__button",
          onClick: () => window.dispatchEvent(new CustomEvent("productionRunPauseRequested", {
            detail: {
              runId: l.id
            }
          })),
          title: x("暂停当前 Agent；已经提交的图片生成任务不会被撤回"),
          children: c.jsx(d3, {
            size: 13
          })
        }) : l.status === "paused" ? c.jsx("button", {
          type: "button",
          className: "production-zone-bar__button is-resume",
          onClick: () => window.dispatchEvent(new CustomEvent("productionRunResumeRequested", {
            detail: {
              runId: l.id
            }
          })),
          title: x("从准确步骤继续当前生产任务"),
          children: c.jsx(Ol, {
            size: 13
          })
        }) : null, W ? c.jsx("button", {
          type: "button",
          className: "production-zone-bar__button",
          onClick: () => {
            window.dispatchEvent(new CustomEvent("productionRunUndoRequested", {
              detail: {
                runId: l.id,
                affectedNodeIds: [...E],
                expectedRevision: l.currentStateVersion
              }
            }));
          },
          title: x("撤销本次 Agent 对画布造成的变化"),
          children: c.jsx(d_, {
            size: 13
          })
        }) : null, c.jsx("button", {
          type: "button",
          className: "production-zone-bar__button",
          onClick: () => p(de => !de),
          title: x(h ? "收起" : "展开预检"),
          children: c.jsx(Mi, {
            size: 13,
            className: h ? "rotate-180" : ""
          })
        }), H ? null : c.jsx("button", {
          type: "button",
          className: "production-zone-bar__button",
          onClick: () => Fja(l.id),
          title: x("隐藏生产任务"),
          children: c.jsx(Na, {
            size: 13
          })
        })]
      }), c.jsx("div", {
        className: "production-zone-bar__progress",
        "aria-hidden": !0,
        children: c.jsx("i", {
          style: {
            width: `${U.total > 0 ? U.percent : H ? 34 : 100}%`
          }
        })
      }), F && !E_t().open ? c.jsxs("div", {
        className: "production-diff-approval",
        children: [c.jsxs("div", {
          className: "production-diff-approval__copy",
          children: [c.jsxs("strong", {
            children: [c.jsx(TLe, {
              size: 13
            }), " ", F.title]
          }), c.jsx("span", {
            children: F.summary || x("检查即将发生的画布改动")
          })]
        }), c.jsxs("div", {
          className: "production-diff-approval__actions",
          children: [c.jsxs("button", {
            type: "button",
            onClick: () => brn(F.id, !1),
            children: [c.jsx(Na, {
              size: 13
            }), x(" 取消")]
          }), c.jsxs("button", {
            type: "button",
            className: "is-primary",
            onClick: () => brn(F.id, !0),
            children: [c.jsx(io, {
              size: 13
            }), x(" 应用改动")]
          })]
        })]
      }) : null, h ? c.jsxs("div", {
        className: "production-zone-bar__details",
        children: [c.jsx("p", {
          children: l.preflight.summary
        }), c.jsxs("div", {
          className: "production-zone-bar__chips",
          children: [c.jsxs("span", {
            children: [l.preflight.inputNodeCount, x(" 个输入节点")]
          }), c.jsxs("span", {
            children: [l.preflight.estimatedJobCount || x("待定"), x(" 项任务")]
          }), c.jsxs("span", {
            className: `is-risk-${l.preflight.riskLevel}`,
            children: [c.jsx(RLe, {
              size: 11
            }), " ", x(Q)]
          }), c.jsxs("span", {
            children: [x("并发上限 "), pG(l)]
          }), c.jsxs("span", {
            children: [u.running, "/", u.maxConcurrent, x(" 占用 · "), u.queued, x(" 排队")]
          })]
        }), l.preflight.requiresApproval.length > 0 ? c.jsxs("p", {
          children: [x("需要批准："), l.preflight.requiresApproval.join("、")]
        }) : null, l.preflight.warnings.map(de => c.jsx("p", {
          className: "production-zone-bar__warning",
          children: de
        }, de)), l.tasks.length > 0 || (((ne = l.pendingToolCalls) == null ? void 0 : ne.length) ?? 0) > 0 ? c.jsxs("div", {
          className: "production-zone-bar__steps",
          children: [l.tasks.map(de => c.jsxs("p", {
            children: [de.status === "completed" ? x("已完成") : de.status === "queued" ? x("排队中") : de.status === "running" ? x("进行中") : de.status === "blocked" ? x("受阻") : x("未完成"), " · ", de.title]
          }, de.id)), (l.pendingToolCalls ?? []).map(de => c.jsxs("p", {
            className: "production-zone-bar__warning",
            children: [x("未执行 · "), de.summary, de.abortReason === "ABORTED_BEFORE_DISPATCH" ? x(" · 暂停于派发前") : ""]
          }, de.toolCallId))]
        }) : null, c.jsxs("button", {
          type: "button",
          className: "production-zone-bar__button production-zone-bar__save-recipe",
          onClick: () => {
            const de = ryi({
              run: l,
              nodes: e,
              connections: t
            });
            nCi(de.id);
          },
          children: [c.jsx(OEn, {
            size: 12
          }), x(" 存为生产模板")]
        })]
      }) : null]
    })]
  });
}

Ia.memo(lCi);

function cCi() {
  on();
  const t = Qlr().tab === "permissions" ? "安全设置" : "";
  return c.jsx(c.Fragment, {
    children: t ? c.jsxs("div", {
      className: "production-center-subnav",
      children: [c.jsxs("button", {
        type: "button",
        onClick: () => qP("current"),
        children: [c.jsx(Mf, {
          size: 13
        }), x(" 返回开始")]
      }), c.jsx("span", {
        children: x(t)
      })]
    }) : null
  });
}

const dCi = {
  queued: "排队中",
  planning: "分析中",
  waiting_approval: "等待批准",
  running: "生产中",
  waiting_generation: "等待生成",
  reviewing: "质量检查",
  paused: "已暂停",
  completed: "已完成",
  failed: "失败",
  cancelled: "已取消"
};

[...Object.entries(dCi).map(([e, t]) => ({
  value: e,
  label: t
}))];

function uCi(e, t, n) {
  const r = e.find(i => i.type !== "workflow" && i.webappId === t.webappId),
    a = {
      id: (r == null ? void 0 : r.id) ?? `rh_app_${t.webappId}_${n}`,
      type: "app",
      webappId: t.webappId,
      webappName: t.webappName,
      covers: t.covers || [],
      nodeInfoListTemplate: t.nodeInfoListTemplate,
      rhParamValues: t.rhParamValues || {},
      createdAt: (r == null ? void 0 : r.createdAt) ?? n
    };
  return r ? e.map(i => i.type !== "workflow" && i.webappId === t.webappId ? a : i) : [...e, a];
}

function hCi(e, t, n) {
  const r = e.find(i => i.type === "workflow" && i.webappId === t.workflowId),
    a = {
      id: (r == null ? void 0 : r.id) ?? `rh_workflow_${t.workflowId}_${n}`,
      type: "workflow",
      webappId: t.workflowId,
      webappName: t.customName || `工作流 ${t.workflowId}`,
      customName: t.customName,
      covers: t.covers || [],
      rhParamValues: t.rhComfyParamValues || {},
      comfyEditableParams: t.comfyEditableParams,
      comfyRawWorkflowJson: t.comfyRawWorkflowJson,
      rhUseOverseas: t.rhUseOverseas,
      rhComfyUploadPreviews: t.rhComfyUploadPreviews,
      createdAt: (r == null ? void 0 : r.createdAt) ?? n
    };
  return r ? e.map(i => i.type === "workflow" && i.webappId === t.workflowId ? a : i) : [...e, a];
}

function pCi(e, t) {
  const n = g.useCallback(a => {
      const i = Date.now();
      e(o => uCi(o, a, i)), t("已保存到 RH 应用库");
    }, [e, t]),
    r = g.useCallback(a => {
      const i = Date.now();
      e(o => hCi(o, a, i)), t("工作流已保存到 RH AI 应用库");
    }, [e, t]);
  return g.useMemo(() => ({
    onSaveToRhLibrary: n,
    onSaveWorkflowToLibrary: r
  }), [n, r]);
}

function mCi(e) {
  const {
    presentation: t,
    interaction: n,
    storyboard: r
  } = e;
  return {
    document: e.document,
    connections: e.connections,
    generation: e.generation,
    storyboard: {
      analysis: {
        ...r.videoAnalysis,
        ...r.shotBreakdown,
        ...r.scriptParse
      },
      storyboard: r.storyboard,
      chart: {
        generateChartBatch: r.generateChartBatch,
        chartArtStyles: r.chartArtStyles
      }
    },
    libraries: e.libraries,
    media: e.media,
    presentation: {
      isDark: t.isDark,
      view: t.effectiveView,
      enableGenerationNodeAnimation: t.enableGenerationNodeAnimation,
      showStartGenerateButton: t.showStartGenerateButton,
      hideAllInputImagePreviews: t.hideAllInputImagePreviews,
      canvasRef: t.canvasRef,
      canvasPortalRef: t.canvasContentRef,
      setIsCanvasFullscreen: t.setIsCanvasFullscreen,
      notifyCanvas: t.notifyCanvas
    },
    interaction: {
      connection: {
        connectingSource: n.connectingSource,
        connectingTarget: n.connectingTarget,
        connectingInputType: n.connectingInputType,
        setConnectingSource: n.setConnectingSource,
        setConnectingTarget: n.setConnectingTarget,
        setConnectingInputType: n.setConnectingInputType
      },
      selection: {
        selectedNodeId: n.selectedNodeId,
        selectedNodeIds: n.selectedNodeIds,
        setSelectedNodeId: n.setSelectedNodeId,
        setSelectedNodeIds: n.setSelectedNodeIds
      },
      setMousePos: n.setMousePos,
      pick: {
        startCompactRefCanvasPick: n.startCompactRefCanvasPick,
        compactRefCanvasPickTargetId: n.compactRefCanvasPickTargetGenNodeId,
        dismissCompactRefCanvasPick: n.dismissCompactRefCanvasPick,
        compactCanvasPickResumeSnap: n.compactCanvasPickResumeSnap,
        storyboardCanvasPickTarget: n.storyboardShotCanvasPick,
        startStoryboardCanvasPick: n.startStoryboardShotCanvasPick
      },
      focusEditPromptOpenSnap: n.focusEditPromptOpenSnap,
      onGenInlineDirectorUiChange: n.registerGenInlineDirectorUi,
      onGenPromptPanelUiChange: n.registerGenPromptPanelUi,
      onDoodleDrawingChange: n.setDoodleDrawingNodeId
    }
  };
}

function fCi(e) {
  return {
    callbacks: e.callbacks,
    pick: e.pick,
    focusDial: {
      dial: e.canvasConnectionDial,
      focusEdit: e.canvasFocusEdit
    },
    shell: e.shell,
    session: e.session
  };
}

function gCi(e) {
  return {
    viewport: {
      nodes: e.renderedNodes,
      view: e.layerCamera.view,
      viewportWidth: e.canvasInnerViewport.width,
      viewportHeight: e.canvasInnerViewport.height,
      useExpandedMediaBuffer: e.layerCamera.useExpandedMediaBuffer,
      denseOverviewActive: e.denseMediaOverviewActive,
      dragNodeId: e.dragNodeId,
      resizingNodeId: e.resizingNodeId,
      selectedNodeId: e.selectedNodeId,
      selectedNodeIds: e.selectedNodeIds,
      isDragging: e.isDragging,
      selectionBoundsDragging: e.selectionBoundsDragging
    },
    nodeQualityMap: e.nodeQualityMap,
    visibleNodeIds: e.visibleNodeIds,
    nodeDocument: e.nodeDocument,
    promptLibrary: e.promptLibrary,
    session: e.session
  };
}

function yCi(e) {
  const t = g.useRef(e);
  return t.current = e, t;
}

function bCi(e) {
  const t = e.contentServices;
  return {
    generation: t.generation,
    presentation: t.presentation,
    interaction: t.interaction,
    media: t.media
  };
}

function vCi(e) {
  var h;
  const t = e,
    {
      generation: n,
      presentation: r,
      interaction: a,
      media: i
    } = bCi(t),
    o = g.useMemo(() => ({}), [n.apiConfigs, n.genNodeApiConfigs, n.apiStatus, n.globalApiKey, n.showHuyaModels]),
    s = ei(),
    l = g.useMemo(() => ({}), [s && t.isCanvasPanningActive, t.localCacheAnyNodeDragging, t.isSelecting, t.showBoxSelectBounds, t.jsSuspendLevel, t.nodeRenderStage, r.isDark, a.connectingSource, a.connectingTarget, a.connectingInputType, a.compactRefCanvasPickTargetId, t.focusEditActiveSourceNodeId, t.focusEditTargetGenNodeId, ((h = a.selectedNodeIds) == null ? void 0 : h.size) ?? 0, t.localCacheNodeDragActive, t.canvasProjectBootActive, a.storyboardCanvasPickTarget, t.canvasDoodleBrushOrEraserPassthrough, t.multiConnectingSourceIds, t.multiConnectingTargetIds, r.hideAllInputImagePreviews, r.enableGenerationNodeAnimation, r.showStartGenerateButton, t.showNodeDeleteButton, t.showCanvasGenerationTimer, t.enableConnectWireTilt, t.enableConnectWireMarquee, n.showHuyaModels, a.compactCanvasPickResumeSnap, a.focusEditPromptOpenSnap]),
    d = g.useMemo(() => ({}), [l, i.isDownloading]),
    u = g.useMemo(() => ({
      cropSelectModeNodeId: t.cropSelectModeNodeId,
      markerModeNodeId: t.markerModeNodeId,
      doodleDrawingNodeId: t.doodleDrawingNodeId,
      focusEditAnalyzingNodeId: t.focusEditAnalyzingNodeId
    }), [t.cropSelectModeNodeId, t.markerModeNodeId, t.doodleDrawingNodeId, t.focusEditAnalyzingNodeId]);
  return {
    defaultEpoch: l,
    downloadAwareEpoch: d,
    toolTargets: u,
    modelConfigState: o
  };
}

const wCi = Object.freeze({
  isNodeDragging: !1,
  boxSelectGroupDragging: !1,
  mediaContentInView: !1,
  canvasStrictInView: !1,
  panPaintKeep: !1,
  denseOverviewActive: !1
});

function xCi(e, t) {
  return t ? Math.max(240, Math.round(Math.max(0, e) * .15)) : 32;
}

function _Ci({
  nodes: e,
  view: t,
  viewportWidth: n,
  viewportHeight: r,
  useExpandedMediaBuffer: a,
  denseOverviewActive: i,
  dragNodeId: o,
  resizingNodeId: s,
  selectedNodeId: l,
  selectedNodeIds: d,
  isDragging: u,
  selectionBoundsDragging: h
}) {
  const p = new Map(),
    m = t.zoom > 0 ? t.zoom : 1,
    f = xCi(n, a);
  for (const y of e) {
    const b = l === y.id || d.has(y.id),
      v = !!(o === y.id || o && d.has(y.id) || (u || h) && d.has(y.id)),
      _ = h && d.has(y.id),
      w = y.width ?? 260,
      k = y.height ?? 200,
      A = y.x * m + t.x,
      S = y.y * m + t.y,
      C = w * m,
      I = k * m,
      E = v || A + C >= -f && A <= n + f && S + I >= -f && S <= r + f,
      T = o === y.id || s === y.id || b || Dhi(y.id, {
        screenX: A,
        screenY: S,
        screenW: C,
        screenH: I,
        viewportW: n,
        viewportH: r
      }),
      P = A + C >= 0 && A <= n && S + I >= 0 && S <= r;
    p.set(y.id, {
      isNodeDragging: v,
      boxSelectGroupDragging: _,
      mediaContentInView: E,
      canvasStrictInView: T,
      panPaintKeep: P,
      denseOverviewActive: i
    });
  }
  return p;
}

function kCi(e, t) {
  if (!e || e.size !== t.size) return t;
  for (const [n, r] of t) {
    const a = e.get(n);
    if (!a || !Xur(a, r)) return t;
  }
  return e;
}

function ACi(e) {
  const t = g.useRef(void 0);
  return g.useMemo(() => {
    const n = _Ci(e),
      r = kCi(t.current, n);
    return t.current = r, r;
  }, [e.nodes, e.view.x, e.view.y, e.view.zoom, e.viewportWidth, e.viewportHeight, e.useExpandedMediaBuffer, e.denseOverviewActive, e.dragNodeId, e.resizingNodeId, e.selectedNodeId, e.selectedNodeIds, e.isDragging, e.selectionBoundsDragging]);
}

function Xur(e, t) {
  return e.isNodeDragging === t.isNodeDragging && e.boxSelectGroupDragging === t.boxSelectGroupDragging && e.mediaContentInView === t.mediaContentInView && e.canvasStrictInView === t.canvasStrictInView && e.panPaintKeep === t.panPaintKeep && e.denseOverviewActive === t.denseOverviewActive;
}

const LFt = Object.freeze([]);

function Jur(e, t) {
  if (e && e.length === t.length) {
    let n = !0;
    for (let r = 0; r < t.length; r++) if (e[r] !== t[r].id) {
      n = !1;
      break;
    }
    if (n) return e;
  }
  return t.length === 0 ? LFt : t.map(n => n.id);
}

function SCi() {
  let e = [],
    t = new Map(),
    n = LFt;
  const r = new Map(),
    a = new Set(),
    i = new Set();
  let o = !1;
  const s = l => {
    var d;
    (d = r.get(l)) == null || d.forEach(u => u());
  };
  return {
    publish(l, d) {
      if (l === e) return;
      const u = wIt(l, d ?? bP(l)),
        h = Jur(n, l);
      for (const [p, m] of u) t.get(p) !== m && i.add(p);
      for (const p of t.keys()) u.has(p) || i.add(p);
      h !== n && (o = !0), e = l, t = u, n = h;
    },
    flush() {
      if (i.size === 0 && !o) return;
      const l = [...i],
        d = o;
      i.clear(), o = !1;
      for (const u of l) s(u);
      d && a.forEach(u => u());
    },
    subscribeNode(l, d) {
      let u = r.get(l);
      return u || (u = new Set(), r.set(l, u)), u.add(d), () => {
        u.delete(d), u.size === 0 && r.delete(l);
      };
    },
    subscribeList(l) {
      return a.add(l), () => {
        a.delete(l);
      };
    },
    getNode(l) {
      return t.get(l);
    },
    getIds() {
      return n;
    },
    getNodes() {
      return e;
    }
  };
}

function ICi(e, t, n) {
  return {
    handleGeneratePrompts: e.handleGeneratePrompts,
    handleAutoVideoAnalysis: e.handleAutoVideoAnalysis,
    handleShotBreakdown: e.handleShotBreakdown,
    handleScriptParse: e.handleScriptParse,
    handleScriptParseCompose: e.handleScriptParseCompose,
    handleScriptParseCreateGrid: e.handleScriptParseCreateGrid,
    importShotsFromAnalysis: t.importShotsFromAnalysis,
    updateShot: t.updateShot,
    generateSingleShot: t.generateSingleShot,
    deleteShot: t.deleteShot,
    addEmptyShot: t.addEmptyShot,
    generateFromScript: t.generateFromScript,
    generateFromScriptForChart: t.generateFromScriptForChart,
    splitImageToShots: t.splitImageToShots,
    generateSequenceFromShot: t.generateSequenceFromShot,
    generateChartBatch: n.generateChartBatch,
    chartArtStyles: n.chartArtStyles
  };
}

function CCi(e) {
  const {
    connection: t,
    selection: n,
    pick: r
  } = e;
  return {
    connectingSource: t.connectingSource,
    connectingTarget: t.connectingTarget,
    connectingInputType: t.connectingInputType,
    setConnectingSource: t.setConnectingSource,
    setConnectingTarget: t.setConnectingTarget,
    setConnectingInputType: t.setConnectingInputType,
    setMousePos: e.setMousePos,
    selectedNodeId: n.selectedNodeId,
    selectedNodeIds: n.selectedNodeIds,
    setSelectedNodeId: n.setSelectedNodeId,
    setSelectedNodeIds: n.setSelectedNodeIds,
    onStartCompactRefCanvasPick: r.startCompactRefCanvasPick,
    compactRefCanvasPickTargetId: r.compactRefCanvasPickTargetId,
    onDismissCompactRefCanvasPick: r.dismissCompactRefCanvasPick,
    compactCanvasPickResumeSnap: r.compactCanvasPickResumeSnap,
    focusEditPromptOpenSnap: e.focusEditPromptOpenSnap,
    storyboardCanvasPickTarget: r.storyboardCanvasPickTarget,
    onStartStoryboardCanvasPick: r.startStoryboardCanvasPick,
    onGenInlineDirectorUiChange: e.onGenInlineDirectorUiChange,
    onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
    onDoodleDrawingChange: e.onDoodleDrawingChange
  };
}

function ECi(e) {
  return {
    ...e,
    isCompactMode: !1,
    isCompactUiMode: !1
  };
}

function TCi(e) {
  return {
    setCroppingNodeId: e.setCroppingNodeId,
    frameSelectionRef: e.frameSelectionRef,
    setFrameContextMenu: e.setFrameContextMenu,
    setInputImageContextMenu: e.setInputImageContextMenu,
    setPreviewContextMenu: e.setPreviewContextMenu,
    setLightboxItem: e.setLightboxItem,
    setLightboxOpen: e.setLightboxOpen,
    setChatFiles: e.setChatComposerFiles,
    setIsChatOpen: e.setIsChatOpen,
    onDownloadFile: e.handleDownloadFile,
    onDownloadSelected: e.handleDownloadSelected,
    isDownloading: e.isDownloading,
    downloadProgress: e.downloadProgress,
    onDownloadStoryboardVideos: e.handleDownloadUrlList,
    onOpenDirector3D: e.openDirector3DForNode
  };
}

function MCi(e) {
  return {
    documentSession: e.generationDocument,
    nodes: e.nodes,
    connections: e.connections,
    dataVersion: e.dataVersion,
    updateNode: e.updateNode,
    setNodes: e.setNodes,
    setConnections: e.setConnections,
    setHistory: e.setHistory,
    generateId: e.generateId,
    deleteNode: e.deleteNode
  };
}

function PCi(e) {
  return {
    materialLibraryTree: e.materialLibrary.tree,
    getMaterialLibraryPreviewUrl: e.materialLibrary.getPreviewUrl,
    getMaterialLibraryPreviewForCanvas: e.materialLibrary.getAssetPreviewForCanvas,
    resolveMaterialLibraryDrop: e.resolveMaterialLibraryDrop,
    characterLibrary: e.characterLibrary,
    setCharacterLibrary: e.setCharacterLibrary,
    setCharactersOpen: e.setCharactersOpen,
    klingSubjectLibrary: e.klingSubjectLibrary,
    setKlingSubjectsOpen: e.setKlingSubjectsOpen,
    promptLibrary: e.prompt.promptLibrary,
    setPromptLibrary: e.prompt.setPromptLibrary,
    promptLibraryCollapsed: e.prompt.promptLibraryCollapsed,
    setPromptLibraryCollapsed: e.prompt.setPromptLibraryCollapsed,
    promptLibraryForm: e.prompt.promptLibraryForm,
    setPromptLibraryForm: e.prompt.setPromptLibraryForm,
    onSaveToRhLibrary: e.rh.onSaveToRhLibrary,
    onSaveWorkflowToLibrary: e.rh.onSaveWorkflowToLibrary
  };
}

function RCi(e) {
  return {
    apiConfigs: e.chatApiConfigs,
    genNodeApiConfigs: e.genNodeApiConfigs,
    isModelHiddenInList: e.isModelHiddenInList,
    globalApiKey: e.globalApiKey,
    jimengSuperResUrl: e.jimengSuperResUrl,
    jimengSuperResApiKey: e.jimengSuperResApiKey,
    apiStatus: e.apiStatus,
    generationTimers: e.generationTimers,
    runEditImage: e.runEditImage,
    runExpandImage: e.runExpandImage,
    visibleImageConfigs: e.visibleImageConfigs,
    expandImageConfigs: e.expandImageConfigs,
    showHuyaModels: e.showHuyaModels,
    generate: e.generate
  };
}

function NCi(e) {
  return {
    document: MCi(e.document),
    connections: e.connections,
    generation: RCi(e.generation),
    storyboard: ICi(e.storyboard.analysis, e.storyboard.storyboard, e.storyboard.chart),
    libraries: PCi(e.libraries),
    media: TCi(e.media),
    presentation: ECi(e.presentation),
    interaction: CCi(e.interaction)
  };
}

function jCi(e) {
  return {
    compactRefCanvasPickTargetNode: e.compactRefCanvasPickTargetNode,
    compactRefPickInputType: e.compactRefPickInputType,
    clipboardPromptReplaceTip: e.clipboardPromptReplaceTip,
    finalizeCompactRefCanvasPick: e.finalizeCompactRefCanvasPick,
    finalizeStoryboardShotCanvasPick: e.finalizeStoryboardShotCanvasPick,
    dismissStoryboardShotCanvasPick: e.dismissStoryboardShotCanvasPick
  };
}

function DCi(e) {
  const {
    dial: t,
    focusEdit: n
  } = e;
  return {
    connectionDial: t.connectionDial,
    handleShowConnectionDial: t.handleShowConnectionDial,
    handleHideConnectionDial: t.handleHideConnectionDial,
    handleConnectionDialSelect: t.handleConnectionDialSelect,
    focusEditTargetGenNodeId: n.state.targetId,
    focusEditActiveSourceNodeId: n.state.activeSourceId,
    focusEditAnalyzingNodeId: n.state.analyzingId,
    focusEditAnalysesByNodeId: n.state.analyses,
    toggleFocusEdit: n.toggle,
    handleFocusEditSelectSourceNode: n.selectSource,
    handleFocusEditOpenTargetPrompt: n.openTargetPrompt,
    handleFocusEditPointPick: n.pointPick,
    handleFocusEditLevelChange: n.changeLevel,
    clearFocusEditAnalysis: n.remove
  };
}

function Zur(e, t, n) {
  return e && Ilr(t, n);
}

function LCi(e, t) {
  return e && t;
}

function OCi(e) {
  const {
    marquee: t
  } = e;
  return {
    showBoxSelectBounds: e.showBoxSelectBounds,
    disableNodeDrag: lmi(t.isSelecting, t.selectionBox, t.isSelectingLive),
    cropSelectModeNodeId: e.cropSelectModeNodeId,
    markerModeNodeId: e.markerModeNodeId,
    doodleDrawingNodeId: e.doodleDrawingNodeId,
    canvasDoodleBrushOrEraserPassthrough: e.canvasDoodleBrushOrEraserPassthrough,
    isCanvasPanningActive: e.isCanvasPanningActive,
    localCacheAnyNodeDragging: LCi(e.localCacheMode, e.isDragging),
    isSelecting: t.isSelecting,
    localCacheNodeDragActive: Zur(e.localCacheMode, e.isDragging, e.dragNodeId)
  };
}

function BCi(e) {
  return {
    ...e.callbacks,
    ...jCi(e.pick),
    ...DCi(e.focusDial),
    ...OCi(e.shell),
    ...e.session
  };
}

function FCi(e) {
  return {
    connectionSignatures: e.connectionSignatures,
    generationHistoryByNodeId: e.generationHistoryByNodeId,
    connectedNodeIds: e.connectedNodeIds,
    duplicateBlockedNodeIds: e.duplicateBlockedNodeIds,
    groupOutputNodeToGroupId: e.groupOutputNodeToGroupId,
    expandedGroupNodeToGroupId: e.expandedGroupNodeToGroupId,
    previewCollapsedNodeIds: e.previewCollapsedOrCompactNodeIds,
    openDropdownNodeIds: e.genInlineDirectorUiNodeIds
  };
}

function zCi(e) {
  const {
    generationHistoryByNodeId: t,
    ...n
  } = e;
  return n;
}

function UCi(e) {
  return {
    view: e.frozen ? e.visibilityView : e.liveView,
    useExpandedMediaBuffer: !!(e.transforming || e.frozen)
  };
}

function $Ci(e) {
  return {
    modelConfigState: e.modelConfigState,
    defaultEpoch: e.defaultEpoch,
    downloadAwareEpoch: e.downloadAwareEpoch,
    toolTargets: e.toolTargets
  };
}

function GCi(e) {
  return {
    nodeIds: e.renderedNodeIds,
    nodeDocument: e.nodeDocument,
    nodeQualityMap: e.nodeQualityMap,
    visibleNodeIds: e.visibleNodeIds,
    viewportStates: e.canvasNodeViewportStates
  };
}

function VCi(e) {
  return {
    promptLibraryState: e.promptLibrary,
    promptLibraryCollapsedState: e.promptLibraryCollapsed,
    promptLibraryFormState: e.promptLibraryForm
  };
}

function HCi(e) {
  return {
    nodeDirtyVersionMap: e.nodeDirtyVersionMap,
    selectedNodeId: e.selectedNodeId,
    selectedNodeIds: e.selectedNodeIds,
    connectionDial: e.connectionDial,
    clipboardPromptReplaceTip: e.clipboardPromptReplaceTip,
    focusEditAnalysesByNodeId: e.focusEditAnalysesByNodeId
  };
}

function WCi({
  content: e,
  graph: t,
  host: n,
  layer: r
}) {
  const a = ACi(r.viewport),
    i = FCi(t),
    o = yCi({
      contentServices: NCi(e),
      ...i,
      ...BCi(n)
    }),
    s = vCi(o.current);
  o.current.modelConfigState = s.modelConfigState;
  const l = g.useRef(LFt),
    d = Jur(l.current, r.viewport.nodes);
  return l.current = d, {
    canvasNodeRendererRuntimeRef: o,
    canvasNodeLayerGraphIndex: zCi(i),
    canvasNodeLayerInvalidation: $Ci(s),
    canvasNodeLayerViewport: GCi({
      renderedNodeIds: d,
      nodeDocument: r.nodeDocument,
      nodeQualityMap: r.nodeQualityMap,
      visibleNodeIds: r.visibleNodeIds,
      canvasNodeViewportStates: a
    }),
    canvasNodeLayerPromptLibrary: VCi(r.promptLibrary),
    canvasNodeLayerSession: HCi(r.session)
  };
}

function qCi(e) {
  var t, n;
  return e.connectingSource !== null || e.connectingTarget !== null || !!((t = e.multiConnectingSourceIds) != null && t.length) || !!((n = e.multiConnectingTargetIds) != null && n.length);
}

function KCi(e) {
  var t, n;
  return !!(e.connectingSource || (t = e.multiConnectingSourceIds) != null && t.length || e.connectingTarget || (n = e.multiConnectingTargetIds) != null && n.length);
}

function QCi(e) {
  var t;
  return !!(e.visible && (e.sourceNodeId || e.targetNodeId || (t = e.sourceNodeIds) != null && t.length));
}

function YCi(e, t) {
  return e != null || t != null;
}

function XCi(e, t) {
  return e || t;
}

function JCi(e, t, n = !0) {
  return n && e && !t;
}

function ZCi(e, t, n = !0) {
  return n && e && (t & 1) === 0;
}

function eEi(e) {
  return !e.connectionActive && !e.nodeDragging && !e.actuallyPanning;
}

function tEi(e, t) {
  return e === "doodle" && t === "pen";
}

function nEi(e) {
  return {
    handleCanvasMouseDown: e.handleCanvasMouseDownWithTextTool,
    handleCanvasMouseMove: e.handleCanvasMouseMoveWithTextTool,
    handleCanvasMouseUp: e.handleCanvasMouseUp,
    handleCanvasMouseUpEvent: e.handleCanvasMouseUpWithTextTool,
    handleCanvasDoubleClick: e.handleCanvasDoubleClick,
    handleBackgroundClick: e.handleBackgroundClick,
    handleCanvasContextMenu: e.handleCanvasContextMenu
  };
}

function rEi(e) {
  return {
    compactReferencePick: !!(e.compactRefCanvasPickTargetGenNodeId || e.storyboardShotCanvasPick),
    focusEditPick: !!e.focusEditTargetGenNodeId,
    referencePickActive: !!e.compactRefCanvasPickTargetGenNodeId,
    viewportTransforming: e.isViewportTransforming,
    deferredCanvasPanning: e.deferredCanvasPanning,
    localCacheMode: e.localCacheMode,
    canvasTextDragging: e.isCanvasTextDragging,
    denseMediaOverview: e.denseMediaOverviewActive,
    denseMediaMicro: e.denseMediaMicroActive,
    boxSelectMulti: imi(e.showBoxSelectBounds, e.selectedNodeIdsSize),
    zoomClassName: e.zoomClassName
  };
}

function aEi(e, t, n) {
  return {
    ...e,
    connectingWire: KCi(t),
    nodeDragging: !!t.dragNodeId,
    textCreateCursor: n.activeTool === "text-create",
    doodleBrushCursor: n.activeTool === "doodle" && n.doodleSubTool === "brush"
  };
}

function iEi(e) {
  return {
    onProjectNameChange: e.setProjectName,
    onEditProjectNameStart: e.handleEditProjectNameStart,
    onEditProjectNameEnd: e.finishEditingProjectName,
    onLeftToolbarDockChange: e.setLeftToolbarDock,
    onRefreshProjectList: e.refreshProjectList,
    onOpenProjectFromSwitcher: e.handleOpenProjectFromSwitcher,
    onCreateNewCanvasFromSwitcher: e.handleCreateNewCanvasFromSwitcher,
    onOpenSettings: e.openSettingsPanel,
    onOpenConsole: e.toggleConsolePanel,
    onOpenStorageManage: e.openStorageManagePanel,
    onDownloadSelected: e.handleDownloadSelected,
    onClearCanvas: e.handleClearCanvas
  };
}

function oEi(e) {
  return {
    onCanvasGridToggle: e.handleCanvasGridToggle,
    onCanvasGridSpacingChange: e.setCanvasGridSpacing,
    onCanvasGridDotSizeChange: e.setCanvasGridDotSize,
    onCanvasSnapToggle: e.handleCanvasSnapToggle,
    onFollowDownstreamOnDragToggle: e.handleFollowDownstreamOnDragToggle,
    onCanvasMinimapToggle: e.handleCanvasMinimapToggle,
    onCanvasMinimapDockChange: () => {},
    onShowAllCanvasConnectionsToggle: e.handleShowAllCanvasConnectionsToggle,
    onConnectionHitWidthChange: e.setConnectionHitWidth,
    onHideAllInputImagePreviewsToggle: e.handleHideAllInputImagePreviewsToggle,
    onAlignmentGuidesToggle: e.handleAlignmentGuidesToggle,
    onLocateAnimationMaxNodesChange: e.setLocateAnimationMaxNodes,
    onCanvasBgGlowToggle: e.handleCanvasBgGlowToggle,
    onNodeDeleteButtonToggle: e.handleNodeDeleteButtonToggle,
    onStartGenerateButtonToggle: e.handleStartGenerateButtonToggle
  };
}

function sEi(e) {
  return {
    onEnableConnectWireTiltToggle: e.handleEnableConnectWireTiltToggle,
    onEnableConnectWireMarqueeToggle: e.handleEnableConnectWireMarqueeToggle,
    onEnableGenerationConnectionFlowToggle: e.handleEnableGenerationConnectionFlowToggle,
    onGenerationConnectionFlowModeChange: e.handleGenerationConnectionFlowModeChange,
    onEnableGenerationNodeAnimationToggle: e.handleEnableGenerationNodeAnimationToggle,
    onGenerationNodeAnimationModeChange: e.handleGenerationNodeAnimationModeChange,
    onCanvasGenerationTimerToggle: e.handleCanvasGenerationTimerToggle,
    onConnectionLineStrokeWidthChange: e.setConnectionLineStrokeWidthRaw,
    onConnectionLineOpacityPercentChange: e.setConnectionLineOpacityPercentRaw,
    onConnectionLineColorChange: e.onConnectionLineColorChange
  };
}

function lEi(e) {
  return {
    onToggleHistory: e.handleToggleHistoryFromToolbar,
    onToggleCharacters: e.handleToggleCharactersFromToolbar,
    onToggleKlingSubjects: e.handleToggleKlingSubjectsFromToolbar,
    onToggleRhAppLibrary: e.handleToggleRhAppLibraryFromToolbar,
    onToggleProjectPanel: e.handleToggleProjectPanelFromToolbar,
    onTogglePoseLibrary: e.handleTogglePoseLibraryFromToolbar,
    onToggleProductionCenter: e.handleToggleProductionCenterFromToolbar,
    onToggleProjectMemory: e.handleToggleProjectMemoryFromToolbar,
    onToggleChat: e.toggleChatPanel
  };
}

function cEi(e) {
  return {
    onToggleCollapsed: e.handleToggleLeftToolbarCollapsed,
    onSetActiveTool: e.setActiveTool,
    onToggleTextTool: e.handleToggleTextToolFromToolbar,
    onToggleDoodleTool: e.handleToggleDoodleToolFromToolbar,
    onToggleAlignPanel: e.handleToggleAlignPanel,
    onCreateNodeAtCanvasCenter: e.handleCreateNodeAtCanvasCenter
  };
}

function dEi(e) {
  return {
    onSaveProject: e.handleOpenCategorizedExport,
    onLoadProject: e.handleLoadProject,
    onImportWorkflow: e.handleImportWorkflow,
    onOpenSkillToWorkflow: e.handleOpenEmptySkillToWorkflow,
    onCategorizedExport: e.handleOpenCategorizedExport
  };
}

function OFt(e, t) {
  if (e.length === 0) return {
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0
  };
  let n = e[0].x,
    r = e[0].y,
    a = e[0].x,
    i = e[0].y;
  for (let o = 1; o < e.length; o++) {
    const s = e[o];
    n = Math.min(n, s.x), r = Math.min(r, s.y), a = Math.max(a, s.x), i = Math.max(i, s.y);
  }
  return {
    minX: n - t,
    minY: r - t,
    maxX: a + t,
    maxY: i + t
  };
}

function uEi(e) {
  if (e.length === 0) return null;
  let t = e[0].minX,
    n = e[0].minY,
    r = e[0].maxX,
    a = e[0].maxY;
  for (let i = 1; i < e.length; i++) {
    const o = e[i];
    t = Math.min(t, o.minX), n = Math.min(n, o.minY), r = Math.max(r, o.maxX), a = Math.max(a, o.maxY);
  }
  return {
    minX: t,
    minY: n,
    maxX: r,
    maxY: a
  };
}

function hEi(e, t, n) {
  const r = n.x - t.x,
    a = n.y - t.y,
    i = e.x - t.x,
    o = e.y - t.y,
    s = r * r + a * a;
  if (s < 1e-9) return Math.hypot(i, o);
  let l = (i * r + o * a) / s;
  l = Math.max(0, Math.min(1, l));
  const d = t.x + l * r,
    u = t.y + l * a;
  return Math.hypot(e.x - d, e.y - u);
}

function ehr(e, t, n, r, a) {
  const i = Math.min(e, n),
    o = Math.min(t, r),
    s = Math.max(e, n),
    l = Math.max(t, r);
  return !(s < a.minX || i > a.maxX || l < a.minY || o > a.maxY);
}

function pEi(e, t, n) {
  return e.map(r => ({
    x: r.x + t,
    y: r.y + n
  }));
}

function mEi(e, t, n) {
  const r = Math.max(t.maxX - t.minX, 1e-6),
    a = Math.max(t.maxY - t.minY, 1e-6),
    i = n.maxX - n.minX,
    o = n.maxY - n.minY;
  return e.map(s => ({
    x: n.minX + (s.x - t.minX) / r * i,
    y: n.minY + (s.y - t.minY) / a * o
  }));
}

function fEi(e, t, n, r, a = 12) {
  let {
    minX: i,
    minY: o,
    maxX: s,
    maxY: l
  } = e;
  switch (t) {
    case "nw":
      i = Math.min(n, s - a), o = Math.min(r, l - a);
      break;
    case "n":
      o = Math.min(r, l - a);
      break;
    case "ne":
      s = Math.max(n, i + a), o = Math.min(r, l - a);
      break;
    case "e":
      s = Math.max(n, i + a);
      break;
    case "se":
      s = Math.max(n, i + a), l = Math.max(r, o + a);
      break;
    case "s":
      l = Math.max(r, o + a);
      break;
    case "sw":
      i = Math.min(n, s - a), l = Math.max(r, o + a);
      break;
    case "w":
      i = Math.min(n, s - a);
      break;
  }
  return {
    minX: i,
    minY: o,
    maxX: s,
    maxY: l
  };
}

function gEi(e, t, n) {
  if (e.length === 0 || t.length === 0) return e.length ? [e] : [];
  const r = e.map(o => {
      let s = 1 / 0;
      for (const l of t) s = Math.min(s, Math.hypot(o.x - l.x, o.y - l.y));
      for (let l = 0; l < t.length - 1; l++) s = Math.min(s, hEi(o, t[l], t[l + 1]));
      return s <= n;
    }),
    a = [];
  let i = [];
  for (let o = 0; o < e.length; o++) r[o] ? (i.length >= 2 && a.push(i), i = []) : i.push(e[o]);
  return i.length >= 2 && a.push(i), a;
}

const thr = 1.25;

function nhr(e, t) {
  return Number.isFinite(e) && e > 0 && Number.isFinite(t) && t > 0;
}

function yEi(e, t, n, r, a, i = thr) {
  if (!nhr(n, r) || e.length === 0) return e;
  const o = UCe(t, n, r, i);
  return e.filter(s => (a == null ? void 0 : a.has(s.id)) || s.x + s.width >= o.worldLeft && s.x <= o.worldRight && s.y + s.height >= o.worldTop && s.y <= o.worldBottom);
}

function bEi(e, t, n, r, a, i = thr) {
  if (!nhr(n, r) || e.length === 0) return e;
  const o = UCe(t, n, r, i);
  return e.filter(s => {
    if (a != null && a.has(s.id)) return !0;
    const l = OFt(s.points, s.width / 2 + 1);
    return ehr(o.worldLeft, o.worldTop, o.worldRight, o.worldBottom, l);
  });
}

function vEi({
  canvasTextBoxes: e,
  canvasDoodleStrokes: t,
  view: n,
  width: r,
  height: a,
  selectedCanvasTextId: i,
  editingCanvasTextId: o,
  selectedDoodleIds: s
}) {
  const l = g.useMemo(() => {
      const p = new Set();
      return i && p.add(i), o && p.add(o), p;
    }, [i, o]),
    d = g.useMemo(() => new Set(s), [s]),
    u = g.useMemo(() => yEi(e, n, r, a, l), [e, n.x, n.y, n.zoom, r, a, l]),
    h = g.useMemo(() => bEi(t, n, r, a, d), [t, n.x, n.y, n.zoom, r, a, d]);
  return {
    visibleCanvasTextBoxes: u,
    visibleCanvasDoodleStrokes: h
  };
}

const Fdn = e => e.getAttribute("data-user-controlled") === "true" && e.getAttribute("data-user-playing") === "true",
  wEi = '[role="dialog"], .sketch-modal-overlay, .sketch-assets-overlay, .sketch-lightbox, .sketch-lightbox-overlay';

function zdn(e) {
  return typeof e.closest == "function" && !!e.closest(wEi);
}

const xEi = ({
  containerRef: e,
  enabled: t = !0
}) => {
  const n = g.useRef(new Map()),
    r = g.useRef(!1),
    a = g.useRef(!1),
    i = g.useRef(new Set()),
    o = g.useRef(!1),
    s = g.useRef(new Set()),
    l = g.useRef(new Map()),
    d = g.useRef(new WeakSet()),
    u = g.useRef(null),
    h = g.useCallback((A, S = !1) => {
      const C = n.current.get(A),
        I = Fdn(A),
        E = C != null && C.wasPlaying ? !0 : S && C ? C.wasPlaying : I;
      A.paused || (d.current.add(A), A.pause()), n.current.set(A, {
        wasPlaying: E,
        currentTime: A.currentTime
      }), vit(A, !0);
    }, []);
  g.useEffect(() => {
    if (t) return u.current = new IntersectionObserver(A => {
      A.forEach(S => {
        const C = S.target;
        if (S.isIntersecting) {
          if (s.current.add(C), r.current) h(C, !0);else {
            vit(C, !1);
            const I = n.current.get(C);
            I != null && I.wasPlaying && C.dataset.canvasHoverPlayback !== "true" && C.play().catch(() => {});
          }
        } else s.current.delete(C), h(C, r.current), C.preload = "metadata";
      });
    }, {
      root: e.current,
      rootMargin: "50px",
      threshold: .01
    }), () => {
      var A;
      (A = u.current) == null || A.disconnect();
    };
  }, [e, t, h]);
  const p = g.useCallback(A => {
      if (!(!t || !u.current || zdn(A)) && (u.current.observe(A), r.current && h(A, !0), n.current.has(A) || n.current.set(A, {
        wasPlaying: Fdn(A),
        currentTime: A.currentTime
      }), !l.current.has(A))) {
        const S = () => {
          if (d.current.has(A)) {
            d.current.delete(A);
            return;
          }
          if (r.current || a.current) return;
          const C = n.current.get(A);
          C && (C.wasPlaying = !1);
        };
        A.addEventListener("pause", S), l.current.set(A, S);
      }
    }, [t, h]),
    m = g.useCallback(A => {
      if (!u.current) return;
      u.current.unobserve(A), n.current.delete(A), s.current.delete(A);
      const S = l.current.get(A);
      S && (A.removeEventListener("pause", S), l.current.delete(A));
    }, []),
    f = g.useCallback(() => {
      !t || r.current || (r.current = !0, s.current.forEach(A => h(A)));
    }, [t, h]),
    y = g.useCallback(() => {
      if (!t || r.current) return;
      r.current = !0;
      const A = e.current;
      if (!A) return;
      A.querySelectorAll("video").forEach(C => {
        zdn(C) || h(C);
      });
    }, [e, t, h]),
    b = g.useCallback(() => {
      !t || !r.current || a.current || i.current.size > 0 || o.current || (r.current = !1, s.current.forEach(A => {
        vit(A, !1);
        const S = n.current.get(A);
        S != null && S.wasPlaying && A.dataset.canvasHoverPlayback !== "true" && A.play().catch(() => {});
      }));
    }, [t]),
    v = g.useCallback(() => {
      t && (a.current = !0, y());
    }, [t, y]),
    _ = g.useCallback(() => {
      if (!t) return () => {};
      const A = {};
      return i.current.add(A), y(), () => {
        i.current.delete(A) && b();
      };
    }, [t, y, b]),
    w = g.useCallback(() => {
      a.current = !1, b();
    }, [b]);
  g.useEffect(() => {
    if (!t) return;
    const A = () => {
        const E = Yi();
        if (o.current = E, E) {
          f();
          return;
        }
        b();
      },
      S = $v(A),
      C = D$(A),
      I = L$(A);
    return () => {
      S(), C(), I();
    };
  }, [t, f, b]);
  const k = g.useCallback(() => {
    if (!t || !e.current || !u.current) return;
    e.current.querySelectorAll("video").forEach(S => {
      n.current.has(S) || p(S);
    });
  }, [e, t, p]);
  return g.useEffect(() => {
    if (!t) return;
    const A = setTimeout(k, 100),
      S = new MutationObserver(C => {
        C.forEach(I => {
          I.addedNodes.forEach(E => {
            E instanceof HTMLElement && (E.querySelectorAll("video").forEach(p), E.tagName === "VIDEO" && p(E));
          }), I.removedNodes.forEach(E => {
            E instanceof HTMLElement && (E.querySelectorAll("video").forEach(m), E.tagName === "VIDEO" && m(E));
          });
        });
      });
    return e.current && S.observe(e.current, {
      childList: !0,
      subtree: !0
    }), () => {
      clearTimeout(A), S.disconnect();
    };
  }, [e, t, k, p, m]), {
    acquireVideoFreeze: _,
    freezeAllVideos: v,
    unfreezeVideos: w,
    observeVideo: p,
    unobserveVideo: m,
    isInteractingRef: r
  };
};

function LJe(e) {
  return uEi(e.map(t => OFt(t.points, t.width / 2 + 1)));
}

function _Ei(e, t) {
  if (t.length === 0) return null;
  const n = new Set(t);
  return LJe(e.filter(r => n.has(r.id)));
}

function kEi(e, t, n, r, a) {
  const i = a ? fEi(r, a, n.x, n.y) : null,
    o = new Map(e.map(s => [s.id, i ? mEi(s.points, r, i) : pEi(s.points, n.x - t.x, n.y - t.y)]));
  return {
    marquee: null,
    points: o,
    bounds: LJe(e.map(s => ({
      ...s,
      points: o.get(s.id)
    })))
  };
}

function AEi(e, t) {
  let n = !1;
  const r = e.map(a => {
    const i = t.get(a.id);
    return !i || i.length === a.points.length && i.every((o, s) => o.x === a.points[s].x && o.y === a.points[s].y) ? a : (n = !0, {
      ...a,
      points: i
    });
  });
  return n ? r : e;
}

function SEi(e) {
  const t = new Set(e.selectedIds),
    n = e.strokes.filter(o => t.has(o.id) && o.points.length).map(o => ({
      ...o,
      points: o.points.map(s => ({
        ...s
      }))
    })),
    r = LJe(n);
  if (!r) return null;
  const a = Math.max(1, Math.ceil(r.maxX - r.minX)),
    i = Math.max(1, Math.ceil(r.maxY - r.minY));
  if (![r.minX, r.minY, r.maxX, r.maxY, a, i].every(Number.isFinite)) throw new Error("涂鸦选区坐标无效");
  return {
    strokes: n,
    bounds: r,
    width: a,
    height: i
  };
}

async function IEi(e) {
  const t = document.createElement("canvas");
  try {
    t.width = e.width, t.height = e.height;
    const n = t.getContext("2d");
    if (!n) throw new Error("无法创建涂鸦导出画布");
    const {
      minX: r,
      minY: a
    } = e.bounds;
    n.fillStyle = "#F5F5F5", n.fillRect(0, 0, e.width, e.height);
    for (const i of e.strokes) {
      n.strokeStyle = i.color, n.lineWidth = i.width, n.lineCap = "round", n.lineJoin = "round";
      const o = i.points[0];
      if (o) {
        if (n.beginPath(), i.points.length === 1) {
          n.arc(o.x - r, o.y - a, Math.max(i.width / 2, .5), 0, Math.PI * 2), n.fillStyle = i.color, n.fill();
          continue;
        }
        n.moveTo(o.x - r, o.y - a);
        for (let s = 1; s < i.points.length; s++) n.lineTo(i.points[s].x - r, i.points[s].y - a);
        n.stroke();
      }
    }
    return await new Promise((i, o) => t.toBlob(s => s ? i(s) : o(new Error("导出涂鸦画板失败")), "image/png"));
  } finally {
    t.width = 0, t.height = 0;
  }
}

const CEi = {
  encode: IEi,
  async prepare(e, t, n, r) {
    const [{
      persistDoodleBlobToInputImageNode: a
    }, {
      unregisterDisplayUrlMappings: i
    }] = await Promise.all([Ie(() => Promise.resolve().then(() => IAe), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => No), void 0, import.meta.url)]);
    if (!r()) throw new DOMException("涂鸦导出已取消", "AbortError");
    let o = [{
        id: n,
        type: "input-image",
        settings: {}
      }],
      s = !1;
    const l = () => {
      var u;
      if (s) return;
      s = !0;
      const d = (u = o[0]) == null ? void 0 : u.content;
      d != null && d.startsWith("blob:") && (i(d), URL.revokeObjectURL(d));
    };
    try {
      if (await a({
        blob: e,
        nodeId: n,
        wPx: t.width,
        hPx: t.height,
        setNodes: u => {
          o = typeof u == "function" ? u(o) : u;
        },
        assetId: `doodle_board_${n}`,
        ossFileName: `doodle_board_${n}.png`,
        sourceLabel: "file://doodle-board",
        isCurrent: r
      }), !r()) throw new DOMException("涂鸦导出已取消", "AbortError");
      const d = o[0];
      if (!d.content) throw new Error("涂鸦图片未生成可用内容");
      return {
        content: d.content,
        width: d.width,
        height: d.height,
        settings: d.settings || {},
        assetId: d._contentAssetId,
        dispose: l
      };
    } catch (d) {
      throw l(), d;
    }
  },
  loading() {
    const e = ND({
      type: "loading",
      message: "正在导出涂鸦画板…"
    });
    return () => gg(e);
  },
  success() {
    Vs("已创建画板图片节点");
  },
  error(e) {
    console.error("[DoodleExport]", e), qi("导出涂鸦画板失败，请重试");
  }
};

function EEi(e, t) {
  let n = !1,
    r = 0,
    a = null;
  const i = l => !!l.image && e().nodesRef.current.some(d => d.id === l.id && d.content === l.image.content),
    o = l => {
      l.stopped || (l.stopped = !0, l.stop()), a === l && (a = null);
    },
    s = () => {
      var l;
      r++, a && (i(a) || (l = a.image) == null || l.dispose(), o(a));
    };
  return {
    activate() {
      n = !0;
    },
    cancel: s,
    dispose() {
      n = !1, s();
    },
    reconcile() {
      if (a != null && a.image) if (i(a)) {
        const l = a;
        o(l), l.current() && t.success();
      } else a.current() || s();
    },
    async run() {
      if (a) return !1;
      const l = e(),
        d = l.document.lease(),
        u = r,
        h = () => n && r === u && d.isCurrent();
      if (!h()) return !1;
      let p = null;
      try {
        const m = SEi(l);
        if (!m) return !1;
        p = {
          current: h,
          stop: t.loading()
        }, a = p;
        const f = await t.encode(m);
        if (!h()) return !1;
        const y = l.generateId();
        p.id = y;
        const b = await t.prepare(f, m, y, h);
        if (!h()) return b.dispose(), !1;
        p.image = b;
        const v = Ki(y, "input-image", m.bounds.minX, m.bounds.minY, "涂鸦画板");
        return Object.assign(v, {
          content: b.content,
          width: b.width,
          height: b.height,
          settings: b.settings,
          _contentAssetId: b.assetId
        }), e().setNodes(_ => h() ? [..._, v] : _), e().setSelectedNodeId(_ => h() ? y : _), !0;
      } catch (m) {
        return p != null && p.image && !i(p) && p.image.dispose(), p && o(p), h() && t.error(m), !1;
      } finally {
        p && (!p.image || !h()) && o(p);
      }
    }
  };
}

function TEi(e, t = CEi) {
  const n = g.useRef(e);
  g.useLayoutEffect(() => {
    n.current = e;
  });
  const r = g.useRef();
  r.current || (r.current = EEi(() => n.current, t));
  const a = r.current;
  return g.useLayoutEffect(() => {
    a.activate();
    const i = e.document.subscribe(a.cancel);
    return () => {
      i(), a.dispose();
    };
  }, [e.document, a]), g.useLayoutEffect(() => {
    a.reconcile();
  }), a.run;
}

const Cst = {
  marquee: null,
  points: new Map(),
  bounds: null
};

function MEi() {
  let e = Cst;
  const t = new Set();
  return {
    subscribe(n) {
      return t.add(n), () => {
        t.delete(n);
      };
    },
    getSnapshot: () => e,
    getPoints: n => e.points.get(n),
    publish(n) {
      n !== e && (e = n, t.forEach(r => r()));
    },
    clear() {
      e !== Cst && (e = Cst, t.forEach(n => n()));
    }
  };
}

function PEi(e, t) {
  const n = MEi();
  let r = !1,
    a = 0,
    i = null,
    o = null,
    s = null;
  const l = () => {
      o !== null && t.cancel(o), o = null, s = null;
    },
    d = () => {
      l(), i = null, n.clear();
    },
    u = () => {
      a++, d();
    },
    h = () => {
      const k = e().document.lease(),
        A = a;
      return () => r && A === a && k.isCurrent() && !!e().canvasRef.current;
    },
    p = () => e().activeTool === "doodle" && e().subTool === "select",
    m = k => "nativeEvent" in k ? k.nativeEvent : k,
    f = (k, A) => "pointerId" in A ? k.pointerId !== null && k.pointerId !== A.pointerId ? !1 : (k.pointerId = A.pointerId, !0) : k.pointerId === null,
    y = (k, A = e().strokes) => {
      if (k.verifiedDocument === A) return !0;
      const S = new Map(A.map(I => [I.id, I])),
        C = k.strokes.every(I => {
          const E = S.get(I.id);
          return (E == null ? void 0 : E.points) === I.points && E.width === I.width;
        });
      return C && (k.verifiedDocument = A), C;
    },
    b = k => {
      if (!k.current() || !p()) return !1;
      if (k.kind === "marquee") return !0;
      if (!y(k)) return !1;
      const A = e().selectedIds;
      if (k.selection === A) return !0;
      const S = new Set(A);
      return A.length !== k.selection.length || !k.selection.every(C => S.has(C)) ? !1 : (k.selection = A, !0);
    },
    v = (k, A) => {
      const S = e().toWorld(A.clientX, A.clientY);
      return S ? k.kind === "marquee" ? {
        points: new Map(),
        bounds: null,
        marquee: {
          x0: k.origin.x,
          y0: k.origin.y,
          x1: S.x,
          y1: S.y
        }
      } : S.x === k.origin.x && S.y === k.origin.y ? {
        points: new Map(k.strokes.map(C => [C.id, C.points])),
        bounds: k.bounds,
        marquee: null
      } : kEi(k.strokes, k.origin, S, k.bounds, k.handle) : null;
    },
    _ = (k, A, S, C) => {
      if (k.button !== 0 || i || !p()) return !1;
      const I = h();
      if (!I()) return !1;
      const E = e().toWorld(k.clientX, k.clientY, {
        allowLayoutRead: !0
      });
      if (!E) return !1;
      const M = new Set(A),
        T = A ? e().strokes.filter(j => M.has(j.id)) : [];
      if (A && (!T.length || T.length !== new Set(A).size) || S && !["nw", "ne", "se", "sw", "n", "e", "s", "w"].includes(S)) return !1;
      const P = m(k);
      i = {
        kind: A ? "transform" : "marquee",
        origin: E,
        strokes: T,
        verifiedDocument: e().strokes,
        bounds: C || LJe(T),
        handle: S,
        selection: e().selectedIds,
        additive: k.ctrlKey || k.metaKey,
        current: I,
        pointerId: "pointerId" in P ? P.pointerId : null
      };
      const R = v(i, P);
      return R && n.publish(R), k.preventDefault(), k.stopPropagation(), !0;
    };
  return {
    store: n,
    cancel: u,
    guard: h,
    finish: k => {
      const A = i;
      if (!A) return !1;
      if (k.button !== 0 || !f(A, k)) return !0;
      if (!b(A)) return u(), !0;
      const S = v(A, k);
      if (!S) return u(), !0;
      d();
      const C = e();
      if (S.marquee) {
        const {
          x0: I,
          y0: E,
          x1: M,
          y1: T
        } = S.marquee;
        if (Math.hypot(M - I, T - E) < 4) A.additive || C.setSelectedIds(P => A.current() ? [] : P);else {
          const P = C.strokes.filter(R => ehr(I, E, M, T, OFt(R.points, R.width / 2 + 1))).map(R => R.id);
          C.setSelectedIds(R => A.current() ? A.additive ? Array.from(new Set([...R, ...P])) : P : R);
        }
      } else C.setStrokes(I => A.current() && y(A, I) ? AEi(I, S.points) : I);
      return !0;
    },
    isActive: () => i !== null,
    beginMarquee: k => _(k),
    beginMove: (k, A) => _(k, A),
    beginResize: (k, A, S, C) => _(k, S, A, C),
    move(k) {
      const A = i;
      if (!(!A || !f(A, k))) {
        if (!b(A) || !(k.buttons & 1)) {
          u();
          return;
        }
        s = k, o === null && (o = t.request(() => {
          o = null;
          const S = s;
          if (s = null, i !== A || !b(A)) {
            u();
            return;
          }
          if (S) {
            const C = v(A, S);
            C && n.publish(C);
          }
        }));
      }
    },
    cancelPointer(k) {
      i && (i.pointerId === null || i.pointerId === k.pointerId) && u();
    },
    reconcile() {
      i && !b(i) && u();
    },
    activate() {
      r = !0;
    },
    dispose() {
      r = !1, u();
    }
  };
}

const REi = {
  request: e => window.requestAnimationFrame(e),
  cancel: e => window.cancelAnimationFrame(e)
};

function NEi(e, t = REi) {
  const n = g.useRef(e);
  g.useLayoutEffect(() => {
    n.current = e;
  });
  const r = g.useRef();
  r.current || (r.current = PEi(() => n.current, t));
  const a = r.current;
  return g.useLayoutEffect(() => {
    a.activate();
    const i = e.document.subscribe(a.cancel),
      o = l => {
        if (l.key === "Escape" && a.isActive()) {
          a.cancel(), l.preventDefault(), l.stopPropagation();
          return;
        }
        const d = n.current,
          u = l.target;
        if (l.defaultPrevented || d.activeTool !== "doodle" || d.subTool !== "select" || !d.selectedIds.length || u && (["INPUT", "TEXTAREA", "SELECT"].includes(u.tagName) || u.isContentEditable) || !["Delete", "Del"].includes(l.key) && l.code !== "Delete") return;
        a.cancel();
        const h = a.guard();
        if (!h()) return;
        const p = new Set(d.selectedIds);
        l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), d.setStrokes(m => h() ? m.filter(f => !p.has(f.id)) : m), d.setSelectedIds(m => h() ? m.filter(f => !p.has(f)) : m);
      },
      s = () => {
        document.hidden && a.cancel();
      };
    return window.addEventListener("mousemove", a.move), window.addEventListener("pointermove", a.move), window.addEventListener("mouseup", a.finish), window.addEventListener("pointerup", a.finish), window.addEventListener("pointercancel", a.cancelPointer), window.addEventListener("blur", a.cancel), window.addEventListener("keydown", o, !0), document.addEventListener("visibilitychange", s), () => {
      window.removeEventListener("mousemove", a.move), window.removeEventListener("pointermove", a.move), window.removeEventListener("mouseup", a.finish), window.removeEventListener("pointerup", a.finish), window.removeEventListener("pointercancel", a.cancelPointer), window.removeEventListener("blur", a.cancel), window.removeEventListener("keydown", o, !0), document.removeEventListener("visibilitychange", s), i(), a.dispose();
    };
  }, [e.document, a]), g.useLayoutEffect(() => {
    a.reconcile();
  }), g.useEffect(() => {
    e.activeTool !== "doodle" && e.setSelectedIds(i => i.length ? [] : i);
  }, [e.activeTool, e.setSelectedIds]), a;
}

const jEi = e => {
    switch (e) {
      case "serif":
        return 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';
      case "mono":
        return 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
      case "script":
        return '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive';
      case "sans":
      default:
        return 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    }
  },
  Cje = e => {
    const t = e.length;
    if (t === 0) return "";
    if (t === 1) return `M ${e[0].x} ${e[0].y}`;
    if (t === 2) return `M ${e[0].x} ${e[0].y} L ${e[1].x} ${e[1].y}`;
    let n = `M ${e[0].x} ${e[0].y}`;
    for (let a = 0; a < t - 2; a++) {
      const i = e[a + 1],
        o = e[a + 2],
        s = (i.x + o.x) / 2,
        l = (i.y + o.y) / 2;
      n += ` Q ${i.x} ${i.y} ${s} ${l}`;
    }
    const r = e[t - 1];
    return n += ` L ${r.x} ${r.y}`, n;
  },
  Udn = e => {
    const t = "nativeEvent" in e ? e.nativeEvent : e;
    return "pointerType" in t && t.pointerType === "pen" && typeof t.pressure == "number" ? Math.max(.05, Math.min(1, t.pressure)) : 1;
  },
  DEi = .001;

function zkt(e) {
  return e.some(t => Math.abs(t.pressure - 1) > DEi);
}

const rhr = e => .2 + Math.max(.05, Math.min(1, e)) * 1.6;

function ahr(e, t, n) {
  const r = e.map(s => ({
    x: s.x,
    y: s.y
  }));
  if (r.length < 2) return [];
  if (!zkt(e)) return [{
    id: "",
    points: r,
    color: t,
    width: n
  }];
  const a = [],
    i = 6,
    o = 18;
  for (let s = 0; s < e.length - 1; s += i) {
    const l = Math.max(0, s - 1),
      d = Math.min(e.length - 1, s + o - 1),
      u = e.slice(l, d + 1);
    if (u.length < 2) continue;
    const h = u.reduce((y, b) => y + b.pressure, 0) / u.length,
      p = u[0],
      m = u[u.length - 1];
    if (Math.hypot(m.x - p.x, m.y - p.y) < .01) continue;
    const f = Math.max(.6, n * rhr(h));
    a.push({
      id: "",
      points: u.map(y => ({
        x: y.x,
        y: y.y
      })),
      color: t,
      width: f
    });
  }
  return a.length > 0 ? a : [{
    id: "",
    points: r,
    color: t,
    width: n
  }];
}

function LEi(e) {
  let t = null,
    n = null,
    r = null,
    a = null;
  const i = new Set(),
    o = new Set(),
    s = d => {
      n === d || n && d && n.x === d.x && n.y === d.y || (n = d, o.forEach(u => u()));
    };
  return {
    subscribeDraft(d) {
      return i.add(d), () => {
        i.delete(d);
      };
    },
    subscribeHud(d) {
      return o.add(d), () => {
        o.delete(d);
      };
    },
    getDraft: () => t,
    getHud: () => n,
    setDraft(d) {
      t !== d && (t = d, i.forEach(u => u()));
    },
    setHud: d => {
      if (r = d, !d) {
        a !== null && e.cancel(a), a = null, s(null);
        return;
      }
      a === null && (a = e.request(() => {
        a = null, s(r);
      }));
    }
  };
}

function OEi(e, t, n, r, a) {
  if (e.mode === "brush") {
    const o = e.points[0],
      l = (e.points.length >= 2 ? ahr(e.input, t, n) : o ? [{
        points: [o, {
          x: o.x + .8,
          y: o.y
        }],
        color: t,
        width: n
      }] : []).map(d => ({
        ...d,
        id: a()
      }));
    return d => l.length ? [...d, ...l] : d;
  }
  const i = a();
  return o => {
    let s = !1;
    const l = o.flatMap((d, u) => {
      const h = gEi(d.points, e.points, r / 2);
      return h.length === 1 && h[0].length === d.points.length && h[0].every((p, m) => p === d.points[m]) ? [d] : (s = !0, h.filter(p => p.length >= 2).map((p, m) => ({
        ...d,
        id: `${i}:${u}:${m}`,
        points: p
      })));
    });
    return s ? l : o;
  };
}

function BEi(e, t) {
  const n = LEi(t);
  let r = null,
    a = null,
    i = !1,
    o = 0;
  const s = () => {
      a !== null && t.cancel(a), a = null;
    },
    l = () => {
      s(), r = null, n.setDraft(null);
    },
    d = () => {
      o++, l(), n.setHud(null);
    },
    u = f => ({
      mode: f.mode,
      input: f.input.slice(),
      points: f.input.map(({
        x: y,
        y: b
      }) => ({
        x: y,
        y: b
      }))
    }),
    h = (f, y) => "pointerId" in y ? f.pointerId !== null && y.pointerId !== f.pointerId ? !1 : (f.pointerId = y.pointerId, !0) : f.pointerId === null,
    p = (f, y) => {
      const b = ("pointerType" in y && y.pointerType === "pen" ? .06 : 1.25) / f.zoom,
        v = "getCoalescedEvents" in y ? y.getCoalescedEvents() : [],
        _ = v.length ? v : [y];
      let w = !1;
      for (const k of _) {
        const A = e().toWorld(k.clientX, k.clientY);
        if (!A) continue;
        const S = f.input[f.input.length - 1];
        S && Math.hypot(A.x - S.x, A.y - S.y) < b || (f.input.push({
          ...A,
          pressure: Udn(k)
        }), w = !0);
      }
      return w;
    },
    m = f => {
      const y = r;
      if (!y) return !1;
      if (!y.current()) return d(), !0;
      if (f && (f.button !== 0 || !h(y, f))) return !0;
      f && !("pointerType" in f && f.pointerType === "pen") && p(y, f);
      const b = u(y),
        v = e();
      l();
      const _ = OEi(b, v.brushColor, v.brushWidth, v.eraserWidth, v.generateId);
      return v.setStrokes(w => y.current() ? _(w) : w), !0;
    };
  return {
    store: n,
    cancel: d,
    finish: m,
    isActive: () => r !== null,
    begin(f) {
      if (r || f.button !== 0) return !1;
      const y = e(),
        b = y.document.lease(),
        v = o,
        _ = () => i && o === v && b.isCurrent() && !!e().canvasRef.current;
      if (!_() || y.activeTool !== "doodle" || y.subTool === "select") return !1;
      const w = y.toWorld(f.clientX, f.clientY, {
        allowLayoutRead: !0
      });
      return w ? (r = {
        mode: y.subTool,
        zoom: Math.max(.01, y.zoom()),
        pointerId: "pointerId" in f ? f.pointerId : null,
        input: [{
          ...w,
          pressure: Udn(f)
        }],
        current: _
      }, n.setDraft(u(r)), !0) : !1;
    },
    move(f) {
      const y = r;
      if (y) {
        if (!y.current()) {
          d();
          return;
        }
        if (h(y, f)) {
          if (!(f.buttons & 1)) {
            d();
            return;
          }
          y.mode === "eraser" && n.setHud({
            x: f.clientX,
            y: f.clientY
          }), p(y, f) && a === null && (a = t.request(() => {
            if (a = null, r !== y || !y.current()) {
              d();
              return;
            }
            n.setDraft(u(y));
          }));
        }
      }
    },
    cancelPointer(f) {
      r && (r.pointerId === null || r.pointerId === f.pointerId) && d();
    },
    reconcile() {
      const f = e();
      r && (!r.current() || f.activeTool !== "doodle" ? d() : f.subTool !== r.mode && m()), (!f.canvasRef.current || f.activeTool !== "doodle" || f.subTool !== "eraser") && n.setHud(null);
    },
    activate() {
      i = !0;
    },
    dispose() {
      i = !1, d();
    }
  };
}

const FEi = {
  request: e => window.requestAnimationFrame(e),
  cancel: e => window.cancelAnimationFrame(e)
};

function zEi(e, t = FEi) {
  const n = g.useRef(e);
  g.useLayoutEffect(() => {
    n.current = e;
  });
  const r = g.useRef();
  r.current || (r.current = BEi(() => n.current, t));
  const a = r.current;
  return g.useLayoutEffect(() => {
    a.activate();
    const i = e.document.subscribe(a.cancel),
      o = l => {
        l.key === "Escape" && a.isActive() && (a.cancel(), l.preventDefault(), l.stopPropagation());
      },
      s = () => {
        document.hidden && a.cancel();
      };
    return window.addEventListener("mousemove", a.move), window.addEventListener("pointermove", a.move, {
      passive: !0
    }), window.addEventListener("mouseup", a.finish), window.addEventListener("pointerup", a.finish), window.addEventListener("pointercancel", a.cancelPointer), window.addEventListener("blur", a.cancel), window.addEventListener("keydown", o, !0), document.addEventListener("visibilitychange", s), () => {
      window.removeEventListener("mousemove", a.move), window.removeEventListener("pointermove", a.move), window.removeEventListener("mouseup", a.finish), window.removeEventListener("pointerup", a.finish), window.removeEventListener("pointercancel", a.cancelPointer), window.removeEventListener("blur", a.cancel), window.removeEventListener("keydown", o, !0), document.removeEventListener("visibilitychange", s), i(), a.dispose();
    };
  }, [e.document, a]), g.useLayoutEffect(() => {
    a.reconcile();
  }), a;
}

function ihr(e) {
  return {
    x: Math.min(e.startX, e.endX),
    y: Math.min(e.startY, e.endY),
    width: Math.abs(e.endX - e.startX),
    height: Math.abs(e.endY - e.startY)
  };
}

function UEi(e, t, n) {
  const r = ihr(t);
  return {
    id: e,
    ...r,
    width: Math.max(140, r.width),
    height: Math.max(56, r.height),
    text: "",
    fontSize: 48,
    fontFamily: "sans",
    color: n ? "#f4f4f5" : "#111111",
    bold: !1,
    italic: !1,
    underline: !1,
    strike: !1,
    align: "left"
  };
}

function $Ei() {
  let e = null,
    t = null;
  const n = new Set(),
    r = () => {
      for (const a of n) a();
    };
  return {
    subscribe(a) {
      return n.add(a), () => {
        n.delete(a);
      };
    },
    getDraft: () => e,
    getDraggingId: () => t,
    setDraft(a) {
      e === a || e && a && Object.keys(e).every(i => e[i] === a[i]) || (e = a, r());
    },
    setDraggingId(a) {
      a !== t && (t = a, r());
    }
  };
}

function GEi(e, t) {
  const n = $Ei();
  let r = !1,
    a = 0,
    i = null,
    o = null,
    s = null;
  const l = () => {
      o !== null && t.cancel(o), o = null, s = null;
    },
    d = () => {
      const _ = e().document.lease(),
        w = a;
      return () => r && a === w && _.isCurrent() && !!e().canvasRef.current;
    },
    u = _ => {
      if (!_.element || !_.box) return;
      const w = e().boxes.find(k => k.id === _.box.id) || _.box;
      _.element.style.left = w.x + "px", _.element.style.top = w.y + "px", _.element.style.transform = "", _.element.style.willChange = "";
    },
    h = () => {
      l(), i = null, n.setDraft(null), n.setDraggingId(null);
    },
    p = () => {
      a++, i && u(i), h(), e().skipClick.current = !1;
    },
    m = _ => ({
      startX: _.origin.x,
      startY: _.origin.y,
      endX: _.last.x,
      endY: _.last.y
    }),
    f = _ => {
      const w = i;
      if (!w || !w.current()) return p(), !1;
      const k = e().toWorld(_.x, _.y);
      return k ? (w.last = k, w.kind === "create" ? n.setDraft(m(w)) : w.element && (w.element.style.willChange = "transform", w.element.style.transform = `translate3d(${k.x - w.origin.x}px, ${k.y - w.origin.y}px, 0)`), !0) : !1;
    },
    y = _ => {
      i && (s = _, o === null && (o = t.request(() => {
        o = null;
        const w = s;
        s = null, w && f(w);
      })));
    },
    b = (_, w, k, A) => {
      i ? p() : (l(), e().skipClick.current = !1);
      const S = e(),
        C = d();
      if (!C() || _ === "create" && S.activeTool !== "text-create") return !1;
      const I = S.toWorld(w.x, w.y, {
        allowLayoutRead: !0
      });
      return !I || _ === "drag" && (k = S.boxes.find(E => E.id === (k == null ? void 0 : k.id)), !k) ? !1 : (i = {
        kind: _,
        tool: S.activeTool,
        current: C,
        origin: I,
        last: I,
        box: k,
        element: A
      }, _ === "create" ? (S.setEditingId(null), n.setDraft(m(i))) : (n.setDraggingId(k.id), S.setSelectedId(k.id)), !0);
    };
  return {
    store: n,
    guard: d,
    move: y,
    finish: (_, w = !1) => {
      if (!i) return !1;
      if (l(), !f(_)) return p(), !0;
      const k = i;
      if (!k || !k.current()) return p(), !0;
      const A = e(),
        S = k.current;
      if (h(), k.kind === "create") {
        const C = A.generateId(),
          I = UEi(C, m(k), A.dark);
        A.setBoxes(E => S() ? [...E, I] : E), A.skipClick.current = w, A.setEditingId(E => S() ? C : E), A.setSelectedId(E => S() ? C : E), A.setActiveTool(E => S() ? "select" : E);
      } else if (k.box) {
        const C = k.box.x + k.last.x - k.origin.x,
          I = k.box.y + k.last.y - k.origin.y,
          E = k.box.id;
        k.element && (k.element.style.left = C + "px", k.element.style.top = I + "px", k.element.style.transform = "", k.element.style.willChange = ""), A.setBoxes(M => !S() || !M.some(T => T.id === E && (T.x !== C || T.y !== I)) ? M : M.map(T => T.id === E ? {
          ...T,
          x: C,
          y: I
        } : T));
      }
      return !0;
    },
    cancel: p,
    isActive: () => !!i,
    isCreating: () => (i == null ? void 0 : i.kind) === "create",
    beginCreate: _ => b("create", _),
    beginDrag: (_, w, k) => b("drag", k, _, w),
    reconcile() {
      i && (!i.current() || e().activeTool !== i.tool || i.box && !e().boxes.some(_ => _.id === i.box.id)) && p();
    },
    activate() {
      r = !0;
    },
    dispose() {
      r = !1, p();
    }
  };
}

function VEi(e) {
  const t = e;
  return !!t && (["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) || t.isContentEditable);
}

function HEi(e, t) {
  const n = s => {
      if (t.isActive()) {
        if (!(s.buttons & 1)) {
          t.cancel();
          return;
        }
        t.move({
          x: s.clientX,
          y: s.clientY
        });
      }
    },
    r = s => {
      if (s.button !== 0 || !t.isActive()) return;
      const l = e().canvasRef.current;
      t.finish({
        x: s.clientX,
        y: s.clientY
      }, !!l && s.target instanceof Node && l.contains(s.target));
    },
    a = () => t.cancel(),
    i = () => {
      document.hidden && a();
    },
    o = s => {
      if (s.key === "Escape" && t.isActive()) {
        a(), s.preventDefault(), s.stopPropagation();
        return;
      }
      if (s.defaultPrevented || VEi(s.target)) return;
      const l = e(),
        d = l.selectedId;
      if (!d || l.editingId || !(["Delete", "Del", "Backspace"].includes(s.key) || ["Delete", "Backspace"].includes(s.code))) return;
      const u = t.guard();
      u() && (s.preventDefault(), s.stopPropagation(), l.setBoxes(h => u() ? h.filter(p => p.id !== d) : h), l.setSelectedId(h => u() && h === d ? null : h));
    };
  return window.addEventListener("mousemove", n), window.addEventListener("mouseup", r), window.addEventListener("blur", a), window.addEventListener("pointercancel", a), window.addEventListener("keydown", o, !0), document.addEventListener("visibilitychange", i), () => {
    window.removeEventListener("mousemove", n), window.removeEventListener("mouseup", r), window.removeEventListener("blur", a), window.removeEventListener("pointercancel", a), window.removeEventListener("keydown", o, !0), document.removeEventListener("visibilitychange", i);
  };
}

const WEi = {
  request: e => requestAnimationFrame(e),
  cancel: e => cancelAnimationFrame(e)
};

function qEi(e, t = WEi) {
  const n = g.useRef(e);
  g.useLayoutEffect(() => {
    n.current = e;
  });
  const r = g.useRef();
  r.current || (r.current = GEi(() => n.current, t));
  const a = r.current;
  return g.useLayoutEffect(() => {
    a.activate();
    const i = e.document.subscribe(a.cancel),
      o = HEi(() => n.current, a);
    return () => {
      o(), i(), a.dispose();
    };
  }, [e.document, a]), g.useLayoutEffect(() => {
    a.reconcile();
  }), g.useEffect(() => {
    const i = e.editingId;
    if (!i) return;
    const o = a.guard(),
      s = t.request(() => {
        if (!o() || n.current.editingId !== i) return;
        const l = Array.from(document.querySelectorAll("textarea[data-canvas-text-id]")).find(d => d.dataset.canvasTextId === i);
        l && (l.focus(), l.setSelectionRange(l.value.length, l.value.length));
      });
    return () => t.cancel(s);
  }, [e.editingId, e.document, a, t]), a;
}

function $dn(e) {
  return kk(e) || e.startsWith("pending-oss://");
}

function Gdn(e) {
  const t = Sj(e);
  if (t != null && t.trim() && fu(t.trim())) return t.trim();
  const n = !!e._globalOssUrlOnly;
  for (const r of ["_ossRemoteUrl", "originalUrl", "url", "thumbnailUrl", "_ossThumbnailUrl"]) {
    const a = String(e[r] || "").trim();
    if (!(!a || a.startsWith("content_ref:") || a.startsWith("local-asset://")) && fu(a)) {
      if (n) {
        if (nr(a) || /^https?:\/\//i.test(a)) return a;
        continue;
      }
      if (nr(a) || /^https?:\/\//i.test(a) || a.startsWith("data:") || a.startsWith("blob:")) return a;
    }
  }
  return "";
}

function KEi(e, t) {
  return g.useMemo(() => {
    if (!t || !e) return null;
    if (!e.type || !["image", "video", "audio"].includes(e.type)) return console.warn("[Lightbox] Invalid or missing type:", e.type), null;
    let n = String(e.url || "").trim();
    if (!n && typeof e._assetId == "string" && e._assetId.trim() && (n = `local-asset://${encodeURIComponent(e._assetId.trim())}`), n || (n = Gdn(e)), n && !$dn(n) && !fu(n) && (n = Gdn(e)), e.status === "failed") {
      const a = n && ($dn(n) || fu(n)) ? n : "";
      return {
        ...e,
        url: a,
        originalUrl: String(e.originalUrl || a).trim() || a,
        status: "failed",
        errorMsg: String(e.errorMsg || "").trim() || void 0
      };
    }
    if (!n) return (e._globalOssUrlOnly || e.ossUploaded) && e.url !== "pending-oss://failed" ? {
      ...e,
      url: "pending-oss://resolving",
      originalUrl: "",
      _globalOssUrlOnly: !0,
      _ossLightboxPending: !0
    } : (console.warn("[Lightbox] No URL in lightboxItem:", e), null);
    if (n === "pending-oss://resolving") return {
      ...e,
      url: n,
      _ossLightboxPending: !0
    };
    if (n === "pending-oss://failed") return {
      ...e,
      url: n,
      _ossLightboxPending: !1
    };
    const r = {
      ...e,
      url: n,
      originalUrl: String(e.originalUrl || n).trim() || n
    };
    return kk(r.url) && !e._assetId ? (console.warn("[Lightbox] local-asset URL without _assetId:", e), null) : r;
  }, [e, t]);
}

const ohr = e => !!(e._globalOssUrlOnly || e.ossUploaded || H4({
  ...e,
  id: e.id || "",
  url: e.url || ""
}));

function BFt(e, t) {
  if (typeof e != "string" || !e.trim()) return !1;
  const n = Wh(e) || e;
  return !nr(n) || Iy(n) || Ko(n) || Ad(n) || Qc(e) && Qc(n) ? !1 : t !== "video" || ($o(n) || /\/videos\//i.test(n)) && !tl(n);
}

function WQ(e, t) {
  return t.map(n => typeof n == "string" ? Wh(n) || n : "").find(n => BFt(n, e.type)) || "";
}

function QEi(e) {
  var r;
  const t = a => typeof a == "string" && BFt(a, e.type) && !Qc(a),
    n = ((r = e.mjImages) == null ? void 0 : r.map(a => t(a) ? a : "")) || [];
  return n.length > 1 ? n.every(Boolean) && new Set(n).size === n.length || new Set(n.filter(Boolean)).size === 1 : t(e._ossRemoteUrl) || t(e.originalUrl) || t(Sj(e));
}

function shr(e, t, n = !1) {
  if (!ohr(e)) return {
    item: e,
    resolved: !1
  };
  const r = e,
    a = r.preferDisplayUrls ? WQ(r, [r._ossRemoteUrl, r.originalUrl, r.url]) : "";
  if (a) {
    const u = Wh(a) || ya(a) || a;
    return {
      resolved: !0,
      item: {
        ...r,
        url: u,
        originalUrl: u,
        _ossRemoteUrl: u,
        _globalOssUrlOnly: !0,
        _assetId: void 0,
        preferDisplayUrls: !0
      }
    };
  }
  const i = Fue(n ? Cj(r) : r, t),
    o = WQ(r, [r._ossRemoteUrl, r.originalUrl, Sj(r)]),
    s = WQ(r, [Sj(i), THe(i, t)]),
    l = Wh(o || s) || o || s;
  if (!l) return {
    item: i,
    resolved: !1
  };
  const d = i.mjImages && i.mjImages.length > 1 && i.mjImages.every(u => BFt(u, r.type)) ? i.mjImages : void 0;
  return {
    resolved: !0,
    item: {
      ...i,
      url: l,
      originalUrl: l,
      _ossRemoteUrl: l,
      ...(d ? {
        mjImages: d
      } : {}),
      _globalOssUrlOnly: !0,
      _assetId: void 0,
      preferDisplayUrls: !0
    }
  };
}

const Ete = e => typeof e == "string" ? e.trim() : "";

function YEi(e, t) {
  if (!e) return e;
  if (e.type === "video") {
    const o = t.find(l => l.id === (e == null ? void 0 : e.id)),
      s = XNt(o == null ? void 0 : o.settings);
    s.active && (e = {
      ...e,
      clipStartSec: s.start,
      clipEndSec: s.end ?? void 0
    });
  }
  const n = t.find(o => o.type === "input-image" && (e.id && o.id === e.id || typeof o.content == "string" && e.url && o.content === e.url)),
    r = (n == null ? void 0 : n.settings) || {};
  if (n && Ete(r.colorAdjustOriginal)) {
    const o = Ete(r.colorAdjustLocalAssetId);
    return {
      ...e,
      id: e.id || n.id,
      preferDisplayUrls: o ? void 0 : !0,
      _assetId: o || void 0,
      _globalOssUrlOnly: void 0,
      _ossRemoteUrl: void 0,
      originalUrl: e.url
    };
  }
  const a = shr(e, t);
  if (a.resolved) return a.item;
  if (e.type !== "image") return e;
  if (n && Oue(n)) {
    const o = G$(n) || Go(e._ossRemoteUrl) || Go(e.originalUrl) || Go(e.url) || e._ossRemoteUrl || void 0,
      s = String(e.url || ""),
      l = s.startsWith("blob:") || s.startsWith("data:") ? s : o || (nr(s) && !/\/thumbnails\//i.test(s) ? s : o);
    return {
      ...e,
      id: e.id || n.id,
      url: l,
      originalUrl: o || e.originalUrl || l,
      prompt: o || e.prompt,
      _ossRemoteUrl: o || e._ossRemoteUrl,
      _globalOssUrlOnly: !0,
      title: o ? "OSS 公网地址" : e.title,
      _assetId: void 0,
      preferDisplayUrls: !0
    };
  }
  if (e._assetId || !n) return e;
  const i = Ete(r._localCacheAssetId) || Ete(r._contentAssetId) || Ete(r._assetId) || Ete(n._contentAssetId);
  return i ? {
    ...e,
    id: e.id || n.id,
    _assetId: i,
    originalUrl: e.originalUrl || String(e.url || ""),
    preferDisplayUrls: !1
  } : e;
}

function XEi(e) {
  return WQ(e, [Sj(e), ...(e.mjImages || [])]);
}

function JEi(e, t) {
  if (!e) return null;
  const n = WQ(t, [e.url]);
  return n ? {
    url: n,
    item: {
      ...e.item,
      _ossRemoteUrl: WQ(t, [e.item._ossRemoteUrl, n])
    }
  } : null;
}

function ZEi(e, t) {
  const n = (t == null ? void 0 : t.url) || XEi(e);
  return n ? {
    ...(t == null ? void 0 : t.item),
    ...e,
    url: n,
    originalUrl: n,
    _ossRemoteUrl: (t == null ? void 0 : t.item._ossRemoteUrl) || (t ? n : e._ossRemoteUrl || n),
    ...(t != null && t.item.mjImages && t.item.mjImages.length > 1 ? {
      mjImages: t.item.mjImages
    } : {}),
    _globalOssUrlOnly: !0,
    _ossLightboxPending: !1,
    _assetId: void 0,
    preferDisplayUrls: !0
  } : {
    ...e,
    url: "pending-oss://failed",
    originalUrl: "",
    _globalOssUrlOnly: !0,
    _ossLightboxPending: !1
  };
}

function eTi(e, t, n) {
  return e.map(r => String(r.id) !== t ? r : {
    ...r,
    _ossRemoteUrl: n.item._ossRemoteUrl || n.url,
    originalUrl: n.url,
    url: r.url && nr(r.url) && Iy(r.url) ? r.url : r._ossThumbnailUrl || r.thumbnailUrl || r.url || n.item.url || n.url,
    _ossThumbnailUrl: n.item._ossThumbnailUrl || r._ossThumbnailUrl,
    thumbnailUrl: (r.thumbnailUrl && nr(r.thumbnailUrl) ? r.thumbnailUrl : n.item.thumbnailUrl) || r.thumbnailUrl,
    ...(n.item.mjImages && n.item.mjImages.length > 1 ? {
      mjImages: n.item.mjImages
    } : {}),
    _globalOssUrlOnly: !0,
    ossUploaded: !0,
    sourceNodeId: r.sourceNodeId || n.item.sourceNodeId
  });
}

function tTi(e, t) {
  const n = String(t.id || "").trim(),
    r = WQ(t, [t._ossRemoteUrl]);
  if (!t._globalOssUrlOnly || !n || !r) return e;
  const a = e.find(i => String(i.id) === n);
  return !a || a._ossRemoteUrl === r ? e : e.map(i => String(i.id) === n ? {
    ...i,
    _ossRemoteUrl: r,
    originalUrl: r,
    _globalOssUrlOnly: !0,
    ossUploaded: !0
  } : i);
}

function Ffe(e) {
  return e ? JSON.stringify([e.id, e.type, e.url, e.originalUrl, e._ossRemoteUrl, e._ossThumbnailUrl, e._assetId, e._mjAssetIds, e.mjImages, e.selectedMjImageIndex, e.sourceNodeId, e._globalOssUrlOnly, e.ossUploaded, e.preferDisplayUrls]) : "";
}

const nTi = 8e3;

function rTi(e, t) {
  let n = !1,
    r = 0,
    a = "",
    i = !1,
    o;
  const s = new Map(),
    l = () => {
      o !== void 0 && (t.clear(o), o = void 0);
    },
    d = () => {
      r++, a = "", i = !1, l();
    },
    u = () => {
      d(), s.clear();
    },
    h = () => {
      const m = e().document.lease(),
        f = r,
        y = Ffe(e().item);
      return () => n && r === f && m.isCurrent() && e().open && Ffe(e().item) === y;
    },
    p = () => {
      const m = e(),
        f = m.item,
        y = m.document.lease();
      if (!n || !m.open || !f || !y.isCurrent()) {
        u();
        return;
      }
      const b = Ffe(f);
      if (a !== b && (d(), a = b), !ohr(f) || QEi(f)) {
        l();
        return;
      }
      const v = String(f.url || "");
      if (v.startsWith("pending-oss:") && !v.startsWith("pending-oss://failed") || i) return;
      const _ = JSON.stringify([f.id, f.type, f.selectedMjImageIndex]),
        w = (s.get(_) ?? -1 / 0) - t.now();
      if (v.startsWith("pending-oss://failed") && w > 0) {
        o === void 0 && (o = t.schedule(() => {
          o = void 0, p();
        }, w));
        return;
      }
      l(), i = !0, s.set(_, t.now() + nTi);
      const k = r,
        A = a,
        S = () => n && r === k && y.isCurrent() && e().open && Ffe(e().item) === A;
      (async () => {
        let C = null;
        try {
          C = await t.resolve(f, m.nodes);
        } catch (I) {
          S() && t.report(I);
        }
        if (S() && (C = JEi(C, f), i = !1, m.setItem(I => S() && I && Ffe(I) === A ? ZEi(I, C) : I), C && f.id)) {
          const I = C;
          m.setHistory(E => S() ? eTi(E, String(f.id), I) : E);
        }
      })().catch(C => {
        S() && t.report(C);
      }).finally(() => {
        r === k && (i = !1);
      });
    };
  return {
    activate() {
      n = !0;
    },
    reconcile: p,
    reset: u,
    guard: h,
    dispose() {
      n = !1, u();
    }
  };
}

const aTi = {
  async resolve(e, t) {
    const {
      resolveHistoryGlobalOssLightboxUrl: n
    } = await Ie(async () => {
      const {
        resolveHistoryGlobalOssLightboxUrl: r
      } = await Promise.resolve().then(() => ii);
      return {
        resolveHistoryGlobalOssLightboxUrl: r
      };
    }, void 0, import.meta.url);
    return n(e, t);
  },
  now: () => Date.now(),
  schedule: (e, t) => setTimeout(e, t),
  clear: e => clearTimeout(e),
  report: e => console.warn("[LightboxRecovery] 原图恢复失败:", e)
};

function iTi(e, t = aTi) {
  const n = g.useRef(e);
  g.useLayoutEffect(() => {
    n.current = e;
  });
  const r = g.useRef();
  r.current || (r.current = rTi(() => n.current, t));
  const a = r.current;
  g.useLayoutEffect(() => {
    a.activate();
    const l = e.document.subscribe(a.reset);
    return () => {
      l(), a.dispose();
    };
  }, [e.document, a]), g.useEffect(() => {
    a.reconcile();
  }, [a, e.document, e.item, e.open, e.nodes, e.history]);
  const i = g.useMemo(() => e.open && e.item ? shr(e.item, e.nodes, !0).item : e.item, [e.item, e.open, e.nodes]),
    o = KEi(i, e.open),
    s = g.useMemo(() => YEi(o, e.nodes), [o, e.nodes]);
  return g.useEffect(() => {
    if (!e.open || !s) return;
    const l = a.guard();
    e.setHistory(d => l() ? tTi(d, s) : d);
  }, [a, e.document, e.open, s == null ? void 0 : s.id, s == null ? void 0 : s._ossRemoteUrl, s == null ? void 0 : s._globalOssUrlOnly, s == null ? void 0 : s.type, e.setHistory]), s;
}

const CO = new Map(),
  oTi = 512,
  kH = new Map(),
  sTi = 256;

function lhr(e) {
  return e.task_status === "succeed" || e.task_status === "success" || e.task_status === "failed" || e.task_status === "failure";
}

function lTi(e) {
  for (kH.delete(e.task_id), kH.set(e.task_id, e); kH.size > sTi;) {
    const t = kH.keys().next().value;
    if (!t) break;
    kH.delete(t);
  }
}

const cTi = (e, t) => {
    for (console.log("[KlingCallbackService] 注册 callback 处理函数:", e), CO.delete(e), CO.set(e, t); CO.size > oTi;) {
      const r = CO.keys().next().value;
      if (!r) break;
      CO.delete(r);
    }
    const n = kH.get(e);
    if (n) {
      console.log("[KlingCallbackService] 处理待处理的 callback 数据:", e), kH.delete(e);
      try {
        t(n);
      } finally {
        lhr(n) && CO.delete(e);
      }
    }
  },
  dTi = e => {
    var n, r, a, i;
    console.log("[KlingCallbackService] 收到 callback 数据:", {
      task_id: e.task_id,
      task_status: e.task_status,
      has_videos: !!((r = (n = e.task_result) == null ? void 0 : n.videos) != null && r.length),
      has_images: !!((i = (a = e.task_result) == null ? void 0 : a.images) != null && i.length)
    });
    const t = CO.get(e.task_id);
    if (t) {
      console.log("[KlingCallbackService] 调用已注册的处理函数");
      try {
        t(e);
      } finally {
        lhr(e) && CO.delete(e.task_id);
      }
    } else console.log("[KlingCallbackService] 没有找到处理函数，存储为待处理数据"), lTi(e);
  };

let w4 = null,
  Eye = 0;

const uTi = 5,
  Vdn = 3e3,
  chr = (e = "/api/kling-callback-stream") => {
    if (w4) {
      console.log("[KlingCallbackClient] 已经连接到服务器");
      return;
    }
    console.log("[KlingCallbackClient] 正在连接到服务器:", e);
    try {
      w4 = new EventSource(e), w4.onopen = () => {
        console.log("[KlingCallbackClient] 已连接到服务器"), Eye = 0;
      }, w4.onmessage = t => {
        try {
          const n = JSON.parse(t.data);
          n.type === "connected" ? console.log("[KlingCallbackClient] 连接确认") : n.task_id && (console.log("[KlingCallbackClient] 收到 callback 数据:", {
            task_id: n.task_id,
            task_status: n.task_status
          }), dTi(n));
        } catch (n) {
          console.error("[KlingCallbackClient] 解析消息失败:", n);
        }
      }, w4.onerror = () => {
        console.error("[KlingCallbackClient] 连接错误"), w4 == null || w4.close(), w4 = null, Eye < uTi ? (Eye++, console.log(`[KlingCallbackClient] 将在 ${Vdn}ms 后进行第 ${Eye} 次重新连接`), setTimeout(() => {
          chr(e);
        }, Vdn)) : console.error("[KlingCallbackClient] 达到最大重新连接次数，放弃连接");
      };
    } catch (t) {
      console.error("[KlingCallbackClient] 连接失败:", t);
    }
  },
  hTi = () => {
    w4 && (console.log("[KlingCallbackClient] 断开连接"), w4.close(), w4 = null, Eye = 0);
  },
  pTi = ({
    enabled: e = !0,
    serverUrl: t = "/api/kling-callback-stream"
  } = {}) => {
    g.useEffect(() => {
      if (!e) return;
      console.log("[useKlingCallbackConnection] 初始化 callback 连接");
      const n = setTimeout(() => {
        chr(t);
      }, 1e3);
      return () => {
        clearTimeout(n), hTi();
      };
    }, [e, t]);
  };

function nAe() {
  return new Promise(e => {
    typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
  });
}

async function mTi(e) {
  const t = [];
  for (let r = 0; r < e.nodes.length; r += 24) {
    const a = e.nodes.slice(r, r + 24);
    t.push(...JSON.parse(JSON.stringify(a))), r + 24 < e.nodes.length && (await nAe());
  }
  return await nAe(), {
    nodes: t,
    connections: JSON.parse(JSON.stringify(e.connections)),
    view: JSON.parse(JSON.stringify(e.view)),
    groups: JSON.parse(JSON.stringify(e.groups)),
    canvasTextBoxes: JSON.parse(JSON.stringify(e.canvasTextBoxes || [])),
    canvasDoodleStrokes: JSON.parse(JSON.stringify(e.canvasDoodleStrokes || []))
  };
}

async function fTi(e) {
  const t = [];
  for (let a = 0; a < e.upserts.length; a += 24) {
    const i = e.upserts.slice(a, a + 24);
    t.push(...JSON.parse(JSON.stringify(i))), a + 24 < e.upserts.length && (await nAe());
  }
  const r = a => a === void 0 ? void 0 : JSON.parse(JSON.stringify(a));
  return {
    upserts: t,
    deletedIds: [...e.deletedIds],
    nodeCount: e.nodeCount,
    ...(e.connections !== void 0 ? {
      connections: r(e.connections)
    } : {}),
    ...(e.view !== void 0 ? {
      view: {
        ...e.view
      }
    } : {}),
    ...(e.groups !== void 0 ? {
      groups: r(e.groups)
    } : {}),
    ...(e.canvasTextBoxes !== void 0 ? {
      canvasTextBoxes: r(e.canvasTextBoxes)
    } : {}),
    ...(e.canvasDoodleStrokes !== void 0 ? {
      canvasDoodleStrokes: r(e.canvasDoodleStrokes)
    } : {})
  };
}

const Hdn = 3e5,
  gTi = "[内容过大已省略]";

function FFt(e) {
  return !!(e instanceof RangeError || e instanceof Error && /Invalid string length|string length/i.test(e.message));
}

function Ukt(e, t) {
  if (e == null) return e;
  if (typeof e == "string") return e.length > t ? gTi : e;
  if (Array.isArray(e)) return e.map(n => Ukt(n, t));
  if (typeof e == "object") {
    const n = {};
    for (const [r, a] of Object.entries(e)) n[r] = Ukt(a, t);
    return n;
  }
  return e;
}

function Wdn(e) {
  return typeof e != "string" || !e ? !1 : e.startsWith("data:image/") || e.startsWith("data:video/") || e.startsWith("data:audio/") || e.startsWith("blob:") || e.startsWith("http") && (e.includes("/image") || /\.(jpg|jpeg|png|gif|webp|mp4|webm|mp3|wav|m4a)(\?|$)/i.test(e));
}

function yTi(e) {
  const t = (n, r) => {
    if (!(r > 20)) {
      if (Array.isArray(n)) {
        n.forEach((a, i) => {
          Wdn(a) ? n[i] = "" : a !== null && typeof a == "object" && t(a, r + 1);
        });
        return;
      }
      if (n !== null && typeof n == "object" && !nD(n)) {
        const a = n;
        for (const i of Object.keys(a)) {
          const o = a[i];
          if (Wdn(o)) a[i] = "";else if (i === "settings" && o !== null && typeof o == "object") {
            const s = o;
            if (Array.isArray(s.inputMedia) && (s.inputMedia = s.inputMedia.map(l => typeof l == "object" && l !== null && l.url ? {
              ...l,
              url: ""
            } : l)), Array.isArray(s.generatedImages) && (s.generatedImages = s.generatedImages.map(l => typeof l == "object" && l !== null ? {
              ...l,
              thumbUrl: "",
              fullUrl: ""
            } : l)), s.canvasData && typeof s.canvasData == "object") {
              const l = s.canvasData.images;
              Array.isArray(l) && l.forEach(d => {
                d && typeof d == "object" && (d.src = "");
              });
            }
            typeof s._blobUrl == "string" && (s._blobUrl = "");
          } else i === "frames" && Array.isArray(o) ? a[i] = o.map(s => typeof s == "object" && s !== null && s.url ? {
            ...s,
            url: ""
          } : s) : i === "shots" && Array.isArray(o) ? a[i] = o.map(s => typeof s == "object" && s !== null ? {
            ...s,
            image_url: "",
            video_url: ""
          } : s) : o !== null && typeof o == "object" && t(o, r + 1);
        }
      }
    }
  };
  e.nodes && e.nodes.forEach(n => t(n, 0));
}

const dhr = {
  saveSnapshot: A6n,
  savePatch: iBr,
  beginAssetWrite: $Or,
  endAssetWrite: GOr,
  clearResolveCaches: fFt,
  clearSaveCache: mFt,
  isOss: ua,
  prepareLocalRefs: B7t,
  extractOversizedMedia: Kfa,
  createSnapshotId: TOr,
  stringify: e => JSON.stringify(e),
  now: () => Date.now(),
  flushLocalCache: async () => {
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
    await e.ensureRestored(), await e.flushPendingAssets({
      force: !0
    }), await e.flushManifest({
      force: !0
    }), e.pruneMissingManifestAssets().catch(() => {});
  }
};

async function bTi({
  source: e,
  projectId: t,
  projectName: n,
  saveMode: r = "workflow+assets",
  report: a = () => {}
}, i = dhr) {
  var l, d;
  const o = r === "workflow-only";
  let s = !1;
  try {
    i.clearResolveCaches(), a(5, "正在生成数据...");
    let u = await mTi(e);
    if (o) yTi(u), a(40, "正在生成数据...");else {
      try {
        await i.flushLocalCache();
      } catch (f) {
        if (!i.isOss()) throw console.warn("[useProjectManager] 保存前刷新本地缓存失败:", f), f;
      }
      const m = i.isOss();
      if (m && ((l = u.nodes) != null && l.length) && (u.nodes = u.nodes.map(f => LHe(f)), a(8, "正在整理 OSS 远程链接（不写本地素材文件）…")), m) {
        i.beginAssetWrite(t);
        try {
          a(40, "正在生成数据..."), await nAe(), await i.extractOversizedMedia(u, t, Hdn, f => a(45, f));
        } finally {
          i.endAssetWrite();
        }
      } else {
        a(8, "正在按本地缓存引用保存...");
        const f = await i.prepareLocalRefs(u, y => a(12, y));
        a(40, f.orphanPersisted > 0 ? `已索引 ${f.assetCount} 个素材（新写入 ${f.orphanPersisted}）…` : `已索引 ${f.assetCount} 个素材引用…`);
      }
    }
    (d = u.nodes) != null && d.length && (u.nodes = pJe(u.nodes, {
      clearVisual: !1
    }));
    const h = i.createSnapshotId();
    u.__snapshotId = h;
    let p;
    await nAe();
    try {
      p = i.stringify(u);
    } catch (m) {
      if (FFt(m)) {
        a(50, "数据过大，正在压缩...");
        const f = Ukt(u, Hdn);
        try {
          p = i.stringify(f), s = !0;
        } catch {
          throw new Error("项目过大，请减少画布中的图片/视频数量后重试");
        }
      } else throw m;
    }
    return a(80, "正在写入本地缓存..."), await i.saveSnapshot(t, n, p, u.nodes.length), queueMicrotask(() => {
      Ie(async () => {
        const {
          refreshStudioProjectCoverFromPayload: m
        } = await Promise.resolve().then(() => Sga);
        return {
          refreshStudioProjectCoverFromPayload: m
        };
      }, void 0, import.meta.url).then(({
        refreshStudioProjectCoverFromPayload: m
      }) => m(t, p)).catch(() => {});
    }), {
      snapshotId: h,
      nodeCount: u.nodes.length,
      stripped: s
    };
  } finally {
    i.clearSaveCache();
  }
}

async function uhr({
  delta: e,
  projectId: t,
  projectName: n,
  baseSnapshotId: r
}, a = dhr) {
  try {
    const i = await fTi(e);
    let o = {};
    if (i.upserts.length && (i.upserts = pJe(i.upserts, {
      clearVisual: !1
    })), a.isOss()) i.upserts = i.upserts.map(d => LHe(d));else {
      const d = {
        nodes: i.upserts
      };
      await a.prepareLocalRefs(d), o = {
        ...(d.persistFormat !== void 0 ? {
          persistFormat: d.persistFormat
        } : {}),
        ...(d.cacheDir !== void 0 ? {
          cacheDir: d.cacheDir
        } : {}),
        ...(d.assetIdToLocalPath !== void 0 ? {
          assetIdToLocalPath: d.assetIdToLocalPath
        } : {})
      };
    }
    const s = {
      version: c6n,
      baseSnapshotId: r,
      updatedAt: a.now(),
      nodeCount: i.nodeCount,
      upserts: i.upserts,
      deletedIds: i.deletedIds,
      ...(i.connections !== void 0 ? {
        connections: i.connections
      } : {}),
      ...(i.view !== void 0 ? {
        view: i.view
      } : {}),
      ...(i.groups !== void 0 ? {
        groups: i.groups
      } : {}),
      ...(i.canvasTextBoxes !== void 0 ? {
        canvasTextBoxes: i.canvasTextBoxes
      } : {}),
      ...(i.canvasDoodleStrokes !== void 0 ? {
        canvasDoodleStrokes: i.canvasDoodleStrokes
      } : {}),
      ...o
    };
    return {
      info: await a.savePatch(t, n, s),
      updatedAt: s.updatedAt,
      nodeCount: i.nodeCount
    };
  } finally {
    a.clearSaveCache();
  }
}

const vTi = Object.freeze(Object.defineProperty({
  __proto__: null,
  persistProjectDelta: uhr
}, Symbol.toStringTag, {
  value: "Module"
}));

function hhr(e, t, n, r) {
  return r.migrateCanvasNodesOnProjectOpen(r.stripEphemeralGenerationStateFromNodes(r.normalizeGenNodeDisplayNames(r.realignGenNodesAfterProjectOpen(e, t, n))));
}

async function wTi(e, t) {
  const {
    id: n,
    localCacheOpen: r,
    isCurrent: a,
    progress: i
  } = e;
  if (!a()) return null;
  t.clearProjectMediaResolveCaches(), r && t.clearProjectOpenBlobDisplayCaches({
    notifyUi: !1
  }), t.clearOssUrlPriorityQueue();
  const [o, s] = await Promise.all([t.getProjectPayload(n), t.getProjectAutosavePatch(n)]);
  if (!a()) return null;
  if (!o) throw new Error(t.isProjectFilesystemAvailable() ? "项目数据不存在或已被删除" : "请先在「本地存储管理」中启用资源缓存目录。项目文件位于缓存目录下的 project management 文件夹。");
  let l = JEt(JSON.parse(o), j5e(s));
  const d = t.isLocalRefProjectPayload(l),
    u = !d && (o.includes("__projectAsset") || !!(s != null && s.includes("__projectAsset")));
  if (d && r) {
    i(40, "正在打开画布...");
    let f = hhr(l.nodes || [], null, n, t);
    return await t.remapLocalRefAssetsToCurrentCache(l).catch(() => {}), a() ? (f = await t.applyStableLocalPreviewHints(f), a() ? {
      payload: l,
      nodes: f,
      manifest: null,
      shell: !0,
      inputImageDisplayNeedsResync: !1
    } : null) : null;
  }
  if (d && (await t.hydrateLocalRefAssetsBeforeOpen(l), !a() || (l = {
    ...l,
    nodes: await t.applyStableLocalPreviewHints(l.nodes || [])
  }, !a()))) return null;
  const [h] = await Promise.all([(async () => d ? null : (await t.loadProjectAssetManifest(n)) || t.inferManifestFromPayload(l, n))(), u ? t.resolveProjectAssetRefs(l, n, f => {
    a() && i(15, f);
  }) : Promise.resolve(0)]);
  if (!a() || !d && t.containsBase64Media(l) && (i(20, "正在还原画布素材..."), l = (await t.hydrateProjectData(l)).data, !a())) return null;
  t.projectNodesNeedMediaReviveAfterOpen(l.nodes || []) && i(65, "正在从本地缓存恢复素材...");
  let p = await t.reviveProjectNodesMediaAfterOpen(l.nodes || [], n);
  if (!a()) return null;
  if (i(70, "正在应用..."), p = t.normalizeGenNodeDisplayNames(t.realignGenNodesAfterProjectOpen(p, h, n)), !r) {
    p = p.map(t.sanitizeCanvasNodeOnLoad);
    try {
      i(72, "正在同步视频封面...");
      const f = await t.loadOssTools();
      if (!a()) return null;
      p = f.mergeOssGenVideoPostersFromHistory(p, e.history());
    } catch (f) {
      t.warn("[ProjectManager] 合并历史视频封面失败:", f);
    }
  }
  p = t.migrateCanvasNodesOnProjectOpen(t.stripEphemeralGenerationStateFromNodes(p));
  const m = !!(h && t.inputImageNodesNeedDisplayResync(p, h));
  return r && h && m && (p = await t.resyncInputImageDisplayAfterProjectOpen(p, h, n), !a()) || r && t.canvasLightShellPreviewNeedsResync(p) && (i(68, "正在重建轻壳缩略图..."), p = await t.resyncCanvasLightShellPreviewAfterProjectOpen(p, n), !a()) || (await t.frame(), !a()) ? null : (await t.frame(), a() ? {
    payload: l,
    nodes: p,
    manifest: h,
    shell: !1,
    inputImageDisplayNeedsResync: m
  } : null);
}

const xTi = new Set(["x", "y", "width", "height", "nodeName"]),
  _Ti = new Set(["content", "previewType", "maskContent", "videoFileName", "_localFilePath", "_contentAssetId"]);

function kTi(e, t) {
  return [..._Ti].every(n => Object.is(e[n], t[n]));
}

function ATi(e, t, n) {
  const r = d => d && typeof d == "object" ? d : {},
    a = r(n),
    i = r(e),
    o = r(t),
    s = {
      ...a
    };
  let l = !1;
  for (const d of new Set([...Object.keys(a), ...Object.keys(i), ...Object.keys(o)])) !Object.is(a[d], i[d]) || Object.is(o[d], a[d]) || (o[d] === void 0 ? delete s[d] : s[d] = o[d], l = !0);
  return l ? s : n;
}

function STi(e, t, n) {
  const r = new Map(e.map(s => [s.id, s])),
    a = new Map(t.map(s => [s.id, s]));
  let i = !1;
  const o = n.map(s => {
    const l = r.get(s.id),
      d = a.get(s.id);
    if (!l || !d || d === l || s.type !== d.type || !kTi(s, l)) return s;
    let u = !1;
    const h = {
        ...s
      },
      p = new Set([...Object.keys(s), ...Object.keys(d), ...Object.keys(l)]);
    for (const m of p) if (!(m === "id" || m === "type" || xTi.has(m))) {
      if (m === "settings") {
        const f = ATi(l.settings, d.settings, s.settings);
        f !== s.settings && (h.settings = f, u = !0);
        continue;
      }
      Object.is(s[m], l[m]) && (Object.is(d[m], s[m]) || (d[m] === void 0 ? delete h[m] : Object.assign(h, {
        [m]: d[m]
      }), u = !0));
    }
    return u ? (i = !0, h) : s;
  });
  return i ? o : n;
}

function Est(e, t, n) {
  let r = e;
  return a => {
    if (!n()) return;
    const i = r,
      o = typeof a == "function" ? a(i) : a;
    r = o, t(s => n() ? STi(i, o, s) : s);
  };
}

async function ITi(e, t, n, r, a) {
  if (!e.isCurrent()) return;
  const {
      id: i,
      isCurrent: o,
      localCacheOpen: s
    } = e,
    {
      nodes: l,
      manifest: d
    } = t;
  if (t.shell) {
    try {
      let p = await a.reviveProjectNodesMediaAfterOpen(l, i);
      if (!o()) return;
      p = hhr(p, null, i, a), a.canvasLightShellPreviewNeedsResync(p) && (p = await a.resyncCanvasLightShellPreviewAfterProjectOpen(p, i)), Est(l, n, o)(p);
    } catch (p) {
      a.warn("[useProjectManager] 引用式项目后台补媒体失败:", p);
    }
    return;
  }
  const u = async () => {
      if (d) {
        if (!s && t.inputImageDisplayNeedsResync) {
          const p = await a.resyncInputImageDisplayAfterProjectOpen(l, d, i);
          if (!o()) return;
          const m = Est(l, n, o);
          r(() => m(p));
        }
        o() && (await a.hydrateProjectCanonicalAssetsToAssetStore(i, d));
      }
    },
    h = async () => {
      if (s || (await a.delay(400), !o())) return;
      const p = await a.loadOssTools();
      if (!o()) return;
      const m = Est(l, n, o);
      await p.backfillOssInputImageVideoPostersAfterProjectOpen(l, m, {
        isCancelled: () => !o(),
        historyHint: e.history()
      }), o() && (await p.backfillHuyaExternalGenNodesAfterProjectOpen(l, m, {
        isCancelled: () => !o()
      }));
    };
  await Promise.all([u().catch(() => {}), h().catch(() => {})]);
}

async function phr(e, t, n) {
  const r = [],
    a = [];
  if (typeof e == "object" && e !== null) for (const o of Object.keys(e)) a.push({
    obj: e[o],
    parent: e,
    key: o
  });
  for (; a.length > 0;) {
    const {
      obj: o,
      parent: s,
      key: l
    } = a.shift();
    if (nD(o)) r.push({
      parent: s,
      key: l,
      assetKey: o.key
    });else if (Array.isArray(o)) o.forEach((d, u) => a.push({
      obj: d,
      parent: o,
      key: u
    }));else if (typeof o == "object" && o !== null && !nD(o)) for (const d of Object.keys(o)) a.push({
      obj: o[d],
      parent: o,
      key: d
    });
  }
  if (r.length === 0) return 0;
  n == null || n(`正在还原 ${r.length} 个素材...`);
  const i = 8;
  for (let o = 0; o < r.length; o += i) {
    const s = r.slice(o, o + i);
    await Promise.all(s.map(async ({
      parent: l,
      key: d,
      assetKey: u
    }) => {
      const h = l;
      d === "washOriginalUrl" && (h.washOriginalAssetId = kM(t, u));
      const p = await eOe(t, u);
      if (p) {
        h[d] = p;
        return;
      }
      const m = await wWe(t, u);
      if (m && m.size > 0) try {
        h[d] = URL.createObjectURL(m);
      } catch {
        h[d] = "";
      } else h[d] = "";
    })), o + i < r.length && (await new Promise(l => setTimeout(l, 0)));
  }
  return r.length;
}

const CTi = {
    getProjectPayload: rTt,
    getProjectAutosavePatch: aTt,
    isProjectFilesystemAvailable: xz,
    containsBase64Media: L4e,
    hydrateProjectData: yVe,
    sanitizeCanvasNodeOnLoad: m5e,
    loadProjectAssetManifest: IHn,
    inferManifestFromPayload: CHn,
    hydrateProjectCanonicalAssetsToAssetStore: jHn,
    realignGenNodesAfterProjectOpen: LHn,
    normalizeGenNodeDisplayNames: D7t,
    resyncInputImageDisplayAfterProjectOpen: EHn,
    inputImageNodesNeedDisplayResync: tga,
    resyncCanvasLightShellPreviewAfterProjectOpen: NHn,
    canvasLightShellPreviewNeedsResync: RHn,
    reviveProjectNodesMediaAfterOpen: Vke,
    projectNodesNeedMediaReviveAfterOpen: gFt,
    clearProjectMediaResolveCaches: fFt,
    clearProjectOpenBlobDisplayCaches: rdr,
    hydrateLocalRefAssetsBeforeOpen: AYe,
    applyStableLocalPreviewHints: z7t,
    remapLocalRefAssetsToCurrentCache: F7t,
    isLocalRefProjectPayload: O7t,
    stripEphemeralGenerationStateFromNodes: pJe,
    migrateCanvasNodesOnProjectOpen: HIt,
    clearOssUrlPriorityQueue: L$n,
    resolveProjectAssetRefs: phr,
    loadOssTools: async () => {
      const {
        mergeOssGenVideoPostersFromHistory: e,
        backfillOssInputImageVideoPostersAfterProjectOpen: t,
        backfillHuyaExternalGenNodesAfterProjectOpen: n
      } = await Ie(async () => {
        const {
          mergeOssGenVideoPostersFromHistory: r,
          backfillOssInputImageVideoPostersAfterProjectOpen: a,
          backfillHuyaExternalGenNodesAfterProjectOpen: i
        } = await Promise.resolve().then(() => ii);
        return {
          mergeOssGenVideoPostersFromHistory: r,
          backfillOssInputImageVideoPostersAfterProjectOpen: a,
          backfillHuyaExternalGenNodesAfterProjectOpen: i
        };
      }, void 0, import.meta.url);
      return {
        mergeOssGenVideoPostersFromHistory: e,
        backfillOssInputImageVideoPostersAfterProjectOpen: t,
        backfillHuyaExternalGenNodesAfterProjectOpen: n
      };
    },
    frame: () => new Promise(e => window.requestAnimationFrame(() => e())),
    delay: e => new Promise(t => window.setTimeout(t, e)),
    warn: (e, t) => console.warn(e, t)
  },
  ETi = {
    ports: CTi,
    ossMode: ua,
    beginBoot: I$n,
    detach(e, t) {
      Plr();
      const n = e.map(r => r.id).filter(r => r && !OBt(r));
      Mlr(n), t == null || t(n);
    }
  };

function TTi({
  setNodes: e,
  setConnections: t,
  setView: n,
  setGroups: r,
  setCanvasTextBoxes: a,
  setCanvasDoodleStrokes: i,
  onProgress: o,
  viewportSize: s,
  getHistoryHint: l,
  onDetachGeneratingHistory: d,
  onBeforeOpen: u,
  projects: h,
  saveSession: p,
  setSaveReceipt: m,
  setIsLoading: f,
  setCurrentProjectId: y,
  setCurrentProjectName: b,
  setCurrentProjectSnapshotId: v
}, _ = ETi) {
  const w = g.useRef(0),
    k = g.useRef(!1);
  g.useLayoutEffect(() => (k.current = !0, () => {
    k.current = !1, w.current += 1;
  }), []);
  const A = g.useRef(h);
  A.current = h;
  const S = g.useCallback(async (I, E) => {
      if (!k.current) return !1;
      const M = ++w.current,
        T = () => k.current && w.current === M;
      p.replace(!1), m(null);
      const P = (B, F) => {
          T() && (o == null || o(B, F));
        },
        R = !_.ossMode(),
        j = {
          id: I,
          localCacheOpen: R,
          isCurrent: T,
          progress: P,
          history: () => (l == null ? void 0 : l()) ?? []
        };
      try {
        if (u == null || u(), !T()) return !1;
        f(!0), P(0, "正在加载...");
        const B = await wTi(j, _.ports);
        if (!B || !T()) return !1;
        const {
            payload: F
          } = B,
          N = Efi(I, B.nodes);
        if (_.detach(N, d), !T()) return !1;
        const G = {
          nodes: N,
          connections: F.connections || [],
          groups: F.groups || [],
          view: y4n(F.view, N, s),
          canvasTextBoxes: Array.isArray(F.canvasTextBoxes) ? F.canvasTextBoxes : [],
          canvasDoodleStrokes: Array.isArray(F.canvasDoodleStrokes) ? F.canvasDoodleStrokes : []
        };
        return (() => {
          var V;
          w0(e, T)(G.nodes), w0(t, T)(G.connections), w0(n, T)(G.view), w0(r, T)(G.groups), a && w0(a, T)(G.canvasTextBoxes), i && w0(i, T)(G.canvasDoodleStrokes), w0(y, T)(I), w0(b, T)(E || ((V = A.current.find(O => O.id === I)) == null ? void 0 : V.name) || null), w0(v, T)(F.__snapshotId || null), w0(m, T)({
            projectId: I,
            snapshotId: F.__snapshotId || null,
            source: G,
            isCurrent: T
          });
        })(), _.beginBoot(N.length, {
          ossMode: !R
        }), P(100, "加载完成"), ITi(j, N === B.nodes ? B : {
          ...B,
          nodes: N
        }, e, g.startTransition, _.ports), !0;
      } catch (B) {
        if (!T()) return !1;
        throw FFt(B) ? new Error("项目数据过大，无法加载。请尝试用较少的画布素材重新保存后再打开。") : B;
      } finally {
        T() && (p.setReady(!0), f(!1), P(0, ""));
      }
    }, [e, t, n, r, a, i, o, s, l, d, u, p, _]),
    C = g.useCallback(() => {
      w.current += 1;
    }, []);
  return {
    openProject: S,
    cancelOpen: C
  };
}

async function MTi(e) {
  const {
    id: t,
    isCurrent: n,
    progress: r
  } = e;
  if (!n()) return null;
  const [a, i] = await Promise.all([rTt(t), aTt(t)]);
  if (!n()) return null;
  if (!a) throw new Error(xz() ? "项目数据不存在或已被删除" : "请先在「本地存储管理」中启用资源缓存目录。项目文件位于缓存目录下的 project management 文件夹。");
  let o = JSON.parse(a);
  o = JEt(o, j5e(i));
  const s = O7t(o),
    l = !s && (a.includes("__projectAsset") || !!(i != null && i.includes("__projectAsset")));
  if (s && (r(10, "正在准备引用式素材索引..."), await AYe(o), !n())) return null;
  const [d] = await Promise.all([(async () => {
    if (s) return null;
    let p = await IHn(t);
    return p || (p = CHn(o, t)), p;
  })(), l ? phr(o, t, p => r(15, p)) : Promise.resolve(0)]);
  if (!n()) return null;
  const [u] = await Promise.all([(async () => {
    if (!s && L4e(o)) {
      r(20, "正在还原画布素材...");
      const {
        data: p
      } = await yVe(o);
      return p;
    }
    return o;
  })(), !s && d ? jHn(t, d) : Promise.resolve(0)]);
  if (!n()) return null;
  o = u;
  let h = o.nodes || [];
  if (s) {
    if (r(40, "正在套用稳态预览..."), h = await z7t(h), !n()) return null;
    h = await Vke(h, t);
  } else r(45, "正在从本地缓存恢复素材..."), h = await Vke(h, t);
  return !n() || (r(50, "正在插入..."), h = D7t(LHn(h, d, t)), (d || ua()) && (await Promise.all([d ? (async () => {
    h = await EHn(h, d, t);
  })() : Promise.resolve(), Promise.resolve().then(() => {
    ua() && (h = h.map(p => m5e(p)));
  })]), !n())) || !ua() && RHn(h) && (h = await NHn(h, t), !n()) ? null : (h = HIt(pJe(h)), n() ? {
    nodes: h,
    connections: o.connections || [],
    groups: o.groups || []
  } : null);
}

const Tst = 80;

function PTi(e) {
  return e.length ? {
    x: Math.max(...e.map(n => n.x + (n.width ?? 200))) + Tst,
    y: 0
  } : {
    x: Tst,
    y: Tst
  };
}

function RTi(e, t, n) {
  const r = PTi(n),
    a = new Map();
  e.nodes.forEach(d => a.set(d.id, t()));
  const i = Date.now(),
    o = e.nodes.map(d => ({
      ...d,
      id: a.get(d.id) ?? d.id,
      x: d.x + r.x,
      y: d.y + r.y,
      _nodeUpdateTime: i
    })),
    s = e.connections.filter(d => a.has(d.from) && a.has(d.to)).map(d => ({
      ...d,
      id: t(),
      from: a.get(d.from) ?? d.from,
      to: a.get(d.to) ?? d.to
    })),
    l = e.groups.map(d => {
      const u = (d.nodeIds || []).filter(p => a.has(p)).map(p => a.get(p) ?? p),
        h = {
          ...d,
          id: t(),
          nodeIds: u
        };
      return d.collapsedX != null && (h.collapsedX = d.collapsedX + r.x), d.collapsedY != null && (h.collapsedY = d.collapsedY + r.y), h;
    }).filter(d => d.nodeIds.length > 0);
  return {
    nodes: o,
    connections: s,
    groups: l
  };
}

function NTi(e, t, n) {
  return !e.nodes.length || !n() ? !1 : (ldr(e, t, n), n());
}

function jTi({
  nodes: e,
  setNodes: t,
  setConnections: n,
  setGroups: r,
  setIsLoading: a,
  onProgress: i,
  saveSession: o
}) {
  const s = g.useRef(e);
  s.current = e;
  const l = g.useRef(0);
  return g.useCallback(async d => {
    const u = o.capture();
    if (!u) return;
    const h = ++l.current,
      p = () => h === l.current && u.isCurrent(),
      m = (f, y) => {
        p() && (i == null || i(f, y));
      };
    a(!0), m(0, "正在加载...");
    try {
      const f = await MTi({
        id: d,
        isCurrent: p,
        progress: m
      });
      if (!f || !p()) return;
      if (f.nodes.length === 0) {
        m(100, "该项目无节点");
        return;
      }
      const y = RTi(f, Fi, s.current);
      NTi(y, {
        setNodes: t,
        setConnections: n,
        setGroups: r
      }, p), p() && m(100, "");
    } catch (f) {
      if (!p()) return;
      throw FFt(f) ? new Error("项目数据过大，无法加载。请尝试用较少的画布素材重新保存后再插入。") : f;
    } finally {
      p() && (a(!1), i == null || i(0, ""));
    }
  }, [t, n, r, a, i, o]);
}

function DTi() {
  let e = 0,
    t = !0,
    n = !0;
  return {
    activate() {
      t = !0;
    },
    dispose() {
      t = !1, e++;
    },
    replace(r = !0) {
      e++, n = r;
    },
    setReady(r) {
      n = r;
    },
    capture(r) {
      if (!t || !n) return null;
      const a = e,
        i = () => t && e === a;
      return {
        source: r,
        isCurrent: i,
        receipt(o, s) {
          return {
            projectId: o,
            snapshotId: s,
            source: r,
            isCurrent: i
          };
        }
      };
    }
  };
}

function LTi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(DTi);
  g.useLayoutEffect(() => (n.activate(), () => n.dispose()), [n]);
  const [r] = g.useState(() => ({
    ...n,
    capture: () => n.capture(t.current)
  }));
  return r;
}

function OTi({
  nodes: e,
  connections: t,
  view: n,
  groups: r,
  canvasTextBoxes: a = [],
  canvasDoodleStrokes: i = [],
  setNodes: o,
  setConnections: s,
  setView: l,
  setGroups: d,
  setCanvasTextBoxes: u,
  setCanvasDoodleStrokes: h,
  onProgress: p,
  onStripped: m,
  viewportSize: f,
  getHistoryHint: y,
  onDetachGeneratingHistory: b,
  onBeforeOpen: v
}) {
  const [_, w] = g.useState([]),
    k = g.useRef([]),
    [A, S] = g.useState(null),
    [C, I] = g.useState(null),
    [E, M] = g.useState(null),
    [T, P] = g.useState(!1),
    [R, j] = g.useState(!1),
    B = g.useRef(!1),
    F = LTi({
      nodes: e,
      connections: t,
      view: n,
      groups: r,
      canvasTextBoxes: a,
      canvasDoodleStrokes: i
    }),
    [N, G] = g.useState(null),
    z = g.useRef(A),
    V = g.useRef(C),
    O = g.useRef(E);
  z.current = A, V.current = C, O.current = E, Sfi({
    id: A,
    name: C,
    snapshotId: E
  });
  const L = g.useRef(e);
  L.current = e;
  const D = g.useRef(v);
  D.current = v;
  const U = g.useCallback(() => {
      var Z;
      jlr(L.current), (Z = D.current) == null || Z.call(D);
    }, []),
    H = g.useRef(null),
    Y = 5e3,
    K = g.useCallback(() => {
      H.current = null;
    }, []),
    W = g.useCallback(async Z => {
      try {
        const re = Date.now();
        if (!(Z != null && Z.force) && H.current && re - H.current.timestamp < Y) {
          const ye = H.current.list;
          return w(ye), ye;
        }
        const fe = await k6n();
        return w(fe), k.current = fe, H.current = {
          list: fe,
          timestamp: re
        }, fe;
      } catch (re) {
        return console.error("[useProjectManager] listProjects failed:", re), k.current;
      }
    }, []);
  g.useEffect(() => {
    let Z = !1;
    return (async () => {
      const {
          ensureCacheRootReadyForWrite: re,
          localCacheManager: fe
        } = await Ie(async () => {
          const {
            ensureCacheRootReadyForWrite: ie,
            localCacheManager: ae
          } = await Promise.resolve().then(() => Ha);
          return {
            ensureCacheRootReadyForWrite: ie,
            localCacheManager: ae
          };
        }, void 0, import.meta.url),
        ye = Date.now();
      for (; !Z && Date.now() - ye < 1e4;) {
        if (await re(), fe.isAvailable()) {
          await W();
          return;
        }
        await new Promise(ie => setTimeout(ie, 200));
      }
      Z || (await W());
    })(), () => {
      Z = !0;
    };
  }, [W]);
  const Q = g.useCallback(async (Z, re = 3) => {
      for (let fe = 0; fe < re; fe++) {
        if ((await W({
          force: fe > 0
        })).some(ie => ie.id === Z)) return;
        await new Promise(ie => setTimeout(ie, 150));
      }
    }, [W]),
    q = g.useCallback(async (Z, re, fe) => {
      var he;
      if (!xz()) throw new Error("请先在「本地存储管理」中启用资源缓存目录并授权文件夹。项目管理将保存到该目录下的「project management」文件夹中，不再使用浏览器 IndexedDB。");
      const ye = (fe == null ? void 0 : fe.silent) === !0;
      if (B.current) {
        if (ye) return null;
        throw new Error("项目正在保存，请等待当前保存完成");
      }
      const ie = F.capture();
      if (!ie) {
        if (ye) return null;
        throw new Error("项目正在切换，请加载完成后再保存");
      }
      B.current = !0;
      const ae = re ?? w6n(),
        be = Z.trim() || "未命名项目",
        Ee = (fe == null ? void 0 : fe.saveMode) ?? "workflow+assets",
        xe = (ue, ge) => {
          !ye && ie.isCurrent() && (p == null || p(ue, ge));
        };
      ye || P(!0), xe(0, "正在准备...");
      try {
        const {
          snapshotId: ue,
          nodeCount: ge,
          stripped: _e
        } = await bTi({
          source: ie.source,
          projectId: ae,
          projectName: be,
          saveMode: Ee,
          report: xe
        });
        w0(S, ie.isCurrent)(ae), w0(I, ie.isCurrent)(be), w0(M, ie.isCurrent)(ue);
        const ke = ie.receipt(ae, ue);
        w0(G, ie.isCurrent)(ke);
        try {
          (he = fe == null ? void 0 : fe.onPersisted) == null || he.call(fe, ke);
        } catch (ve) {
          console.warn("[useProjectManager] 保存回执通知失败（快照已落盘）:", ve);
        }
        if (_e && !ye && ie.isCurrent()) try {
          m == null || m();
        } catch (ve) {
          console.warn("[useProjectManager] 素材省略提示失败（快照已落盘）:", ve);
        }
        if (ye) {
          const ve = Date.now();
          w(Te => {
            const Ne = Te.findIndex(Ae => Ae.id === ae);
            let me;
            return Ne >= 0 ? me = Te.map(Ae => Ae.id === ae ? {
              ...Ae,
              name: be,
              updatedAt: ve,
              nodeCount: ge
            } : Ae) : me = [{
              id: ae,
              name: be,
              updatedAt: ve,
              nodeCount: ge
            }, ...Te], k.current = me, me;
          });
        } else K(), await Q(ae), xe(100, "保存完成");
        return ae;
      } finally {
        B.current = !1, ye || (P(!1), ie.isCurrent() && (p == null || p(0, "")));
      }
    }, [F, p, m, Q, K]),
    ne = g.useCallback(async Z => {
      const re = z.current,
        fe = V.current,
        ye = O.current;
      if (!re || !fe || !ye || !xz()) return "unsupported";
      if (B.current) return "busy";
      const ie = F.capture();
      if (!ie || !ie.isCurrent() || z.current !== re) return "busy";
      B.current = !0;
      try {
        if (!ie.isCurrent() || z.current !== re) return "busy";
        const {
          info: ae,
          updatedAt: be,
          nodeCount: Ee
        } = await uhr({
          delta: Z,
          projectId: re,
          projectName: fe,
          baseSnapshotId: ye
        });
        return w(xe => {
          const he = xe.map(ue => ue.id === re ? {
            ...ue,
            name: fe,
            updatedAt: be,
            nodeCount: Ee
          } : ue);
          return k.current = he, he;
        }), H.current = null, ie.isCurrent() ? ae.bytes > 15e5 || ae.upsertCount > 256 ? "compact" : "saved" : "busy";
      } finally {
        B.current = !1;
      }
    }, [F]),
    {
      openProject: de,
      cancelOpen: le
    } = TTi({
      setNodes: o,
      setConnections: s,
      setView: l,
      setGroups: d,
      setCanvasTextBoxes: u,
      setCanvasDoodleStrokes: h,
      onProgress: p,
      viewportSize: f,
      getHistoryHint: y,
      onDetachGeneratingHistory: b,
      onBeforeOpen: U,
      projects: _,
      saveSession: F,
      setSaveReceipt: G,
      setIsLoading: j,
      setCurrentProjectId: S,
      setCurrentProjectName: I,
      setCurrentProjectSnapshotId: M
    }),
    J = jTi({
      nodes: e,
      setNodes: o,
      setConnections: s,
      setGroups: d,
      setIsLoading: j,
      onProgress: p,
      saveSession: F
    }),
    pe = g.useCallback(async Z => {
      if (B.current) throw new Error("项目正在保存，请稍后重试");
      B.current = !0;
      try {
        await S6n(Z), z.current === Z && (F.replace(), z.current = null, V.current = null, O.current = null, S(null), I(null), M(null), G(null)), w(re => {
          const fe = re.filter(ye => ye.id !== Z);
          return k.current = fe, fe;
        }), K(), await W({
          force: !0
        });
      } finally {
        B.current = !1;
      }
    }, [F, W, K]),
    ce = g.useCallback(async (Z, re) => {
      if (B.current) throw new Error("项目正在保存，请稍后重试");
      B.current = !0;
      try {
        const fe = await sft(Z, re);
        if (!fe) throw new Error("项目不可用，请检查本地存储目录");
        return z.current === Z && (V.current = fe.name, I(fe.name)), w(ye => {
          const ie = ye.map(ae => ae.id === Z ? fe : ae);
          return k.current = ie, ie;
        }), K(), fe;
      } finally {
        B.current = !1;
      }
    }, [K]),
    we = g.useCallback(() => {
      le(), F.replace(), G(null), j(!1), S(null), I(null), M(null);
    }, [le, F]),
    X = g.useCallback(async Z => {
      const re = A;
      if (!re) return;
      const fe = Z.trim() || "未命名项目";
      if (C === fe) {
        w(ie => {
          const ae = ie.findIndex(Ee => Ee.id === re);
          if (ae < 0 || ie[ae].name === fe) return ie;
          const be = ie.map(Ee => Ee.id === re ? {
            ...Ee,
            name: fe
          } : Ee);
          return k.current = be, be;
        });
        return;
      }
      I(fe);
      const ye = Date.now();
      w(ie => {
        if (ie.findIndex(Ee => Ee.id === re) < 0) return ie;
        const be = ie.map(Ee => Ee.id === re ? {
          ...Ee,
          name: fe,
          updatedAt: ye
        } : Ee);
        return k.current = be, be;
      }), K();
      try {
        const ie = await sft(re, fe);
        ie && w(ae => {
          if (ae.findIndex(xe => xe.id === re) < 0) return ae;
          const Ee = ae.map(xe => xe.id === re ? {
            ...xe,
            ...ie
          } : xe);
          return k.current = Ee, H.current = {
            list: Ee,
            timestamp: Date.now()
          }, Ee;
        });
      } catch (ie) {
        console.warn("[useProjectManager] renameProject 落盘失败:", ie);
      }
    }, [A, C, K]);
  return {
    projects: _,
    currentProjectId: A,
    currentProjectName: C,
    currentProjectSnapshotId: E,
    saveReceipt: N,
    isSaving: T,
    isLoading: R,
    refreshList: W,
    saveProject: q,
    saveProjectIncremental: ne,
    openProject: de,
    insertProject: J,
    deleteProject: pe,
    clearCurrentProject: we,
    renameProject: X,
    renameProjectById: ce
  };
}

function BTi() {
  let e = {
    percent: 0,
    message: ""
  };
  const t = new Set();
  return {
    getSnapshot: () => e,
    subscribe: n => (t.add(n), () => {
      t.delete(n);
    }),
    report: (n, r) => {
      const a = r || "";
      e.percent === n && e.message === a || (e = {
        percent: n,
        message: a
      }, t.forEach(i => i()));
    }
  };
}

function FTi(e) {
  const [t] = g.useState(BTi),
    n = g.useCallback((a, i) => {
      if (t.report(a, i), a >= 100 && i) try {
        (i === "加载完成" || i === "保存完成" ? BBe : e)(i);
      } catch {}
    }, [e, t]),
    r = g.useCallback(() => {
      try {
        e("部分过大素材已省略，项目已保存");
      } catch {}
    }, [e]);
  return {
    store: t,
    onProgress: n,
    onStripped: r
  };
}

function zTi({
  viewRef: e,
  commitView: t,
  historyRef: n,
  setHistory: r,
  success: a,
  ...i
}) {
  const {
      store: o,
      onProgress: s,
      onStripped: l
    } = FTi(a),
    d = g.useCallback(m => {
      t(typeof m == "function" ? m(e.current) : m);
    }, [t, e]),
    u = g.useCallback(() => n.current, [n]),
    h = g.useCallback(m => {
      m.length && r(f => Rlr(f, m));
    }, [r]);
  return {
    ...OTi({
      ...i,
      setView: d,
      onProgress: s,
      onStripped: l,
      getHistoryHint: u,
      onDetachGeneratingHistory: h
    }),
    projectProgressStore: o
  };
}

const Tte = () => ({
  percent: 0,
  message: "",
  kind: null,
  projectId: null
});

function UTi(e) {
  const [t, n] = g.useState(() => oP()),
    [r, a] = g.useState("local"),
    [i, o] = g.useState([]),
    [s, l] = g.useState(!1),
    [d, u] = g.useState(() => new Set()),
    [h, p] = g.useState(!1),
    [m, f] = g.useState(""),
    [y, b] = g.useState(Tte),
    v = g.useRef(e);
  v.current = e;
  const [_, w] = g.useState(() => H2());
  g.useEffect(() => {
    const P = () => w(H2());
    return P(), window.addEventListener(xre, P), window.addEventListener(go, P), () => {
      window.removeEventListener(xre, P), window.removeEventListener(go, P);
    };
  }, []);
  const k = _ && t.enabled,
    A = g.useCallback(() => {
      n(oP());
    }, []);
  g.useEffect(() => {
    const P = () => A();
    return window.addEventListener(xre, P), window.addEventListener(go, P), () => {
      window.removeEventListener(xre, P), window.removeEventListener(go, P);
    };
  }, [A]);
  const S = g.useCallback(P => {
      const R = {
        ...oP(),
        ...P
      };
      aWn(R), n(R);
    }, []),
    C = g.useCallback(async () => {
      if (!t.enabled || !us()) return o([]), l(!1), u(new Set()), [];
      p(!0), b({
        percent: 15,
        message: "正在扫描云端项目...",
        kind: "refresh",
        projectId: null
      }), f("正在扫描云端项目目录...");
      try {
        const P = v.current;
        b({
          percent: 45,
          message: "正在校验并合并云端列表...",
          kind: "refresh",
          projectId: null
        });
        const {
          projects: R,
          uploadedIds: j,
          listScanOk: B,
          listScanError: F
        } = await dWn(P);
        return sWn(j, P), u(j), o(R), l(!0), b({
          percent: 100,
          message: "刷新完成",
          kind: "refresh",
          projectId: null
        }), f(!B && F ? `目录扫描未成功（仍显示索引内 ${R.length} 项）。请完全退出后重新运行 tauri dev 再点刷新。${F.slice(0, 80)}` : ""), R;
      } catch (P) {
        return f(PYe(P).slice(0, 200)), l(!1), b(Tte()), [];
      } finally {
        p(!1), setTimeout(() => b(Tte()), 400);
      }
    }, [t.enabled]),
    I = g.useCallback(async P => {
      p(!0), b({
        percent: 0,
        message: "准备上传...",
        kind: "upload",
        projectId: P
      }), f("");
      try {
        await cWn(P, v.current, R => {
          b({
            percent: R.percent,
            message: R.message,
            kind: "upload",
            projectId: P
          }), f(R.message);
        }), Zce(P), u(R => new Set(R).add(P)), f("已上传到云端");
      } finally {
        p(!1), setTimeout(() => b(Tte()), 600);
      }
    }, []),
    E = g.useCallback(async P => {
      p(!0), b({
        percent: 0,
        message: "准备同步到本地...",
        kind: "download",
        projectId: P
      }), f("");
      try {
        await uWn(P, R => {
          b({
            percent: R.percent,
            message: R.message,
            kind: "download",
            projectId: P
          }), f(R.message);
        }), Zce(P), o(R => R.map(j => j.id === P ? {
          ...j,
          hasLocal: !0
        } : j)), f("已同步到本地");
      } finally {
        p(!1), setTimeout(() => b(Tte()), 600);
      }
    }, []),
    M = g.useCallback(async P => {
      if (!us()) throw new Error("删除云端项目需在 Tauri 桌面端使用");
      if (!t.enabled) throw new Error("请先在项目管理设置中启用 OSS 备份");
      p(!0), b({
        percent: 0,
        message: "正在删除云端文件...",
        kind: "delete",
        projectId: P
      });
      try {
        await oWn(P, v.current, R => {
          f(R), b(j => ({
            ...j,
            message: R,
            kind: "delete",
            projectId: P
          }));
        }), tCe(P), u(R => {
          const j = new Set(R);
          return j.delete(P), j;
        }), o(R => R.filter(j => j.id !== P)), s && (await C());
      } finally {
        p(!1), setTimeout(() => b(Tte()), 400);
      }
    }, [t.enabled, s, C]),
    T = g.useCallback(P => d.has(P) || Y7t(P) != null, [d]);
  return {
    settings: t,
    updateSettings: S,
    listTab: r,
    setListTab: a,
    cloudProjects: i,
    cloudListFetched: s,
    ossBusy: h,
    ossMessage: m,
    ossProgress: y,
    ossAvailable: k,
    refreshCloudList: C,
    uploadToCloud: I,
    uploadAvailable: _,
    downloadFromCloud: E,
    deleteFromOss: M,
    isBackedUpOnOss: T
  };
}

async function $Ti(e, t) {
  const {
    testJimengSuperResConnection: n
  } = await Ie(async () => {
    const {
      testJimengSuperResConnection: r
    } = await Promise.resolve().then(() => bBr);
    return {
      testJimengSuperResConnection: r
    };
  }, void 0, import.meta.url);
  if (!o3() && !us()) return {
    success: !1,
    message: "即梦智能超清需在 Tauri / Electron 桌面版中使用；纯浏览器无法连接内置代理。"
  };
  try {
    return await n(e, t);
  } catch (r) {
    const a = r instanceof Error ? r.message : "连接失败";
    if (/failed to fetch|connection refused|econnrefused|err_connection_refused|network/i.test(a)) {
      if (o3()) return {
        success: !1,
        message: "内置即梦代理（127.0.0.1:9529）未响应。请完全退出 electron:dev 后重新运行。"
      };
      if (us()) return {
        success: !1,
        message: "内置即梦代理（127.0.0.1:9529）未响应。请完全退出 tauri dev 后重新运行（Rust 主进程改动不能靠页面刷新）。"
      };
    }
    return {
      success: !1,
      message: a
    };
  }
}

function GTi(e) {
  let t = !1,
    n = () => !1,
    r = null,
    a = {
      x: NaN,
      y: NaN,
      at: -1 / 0
    };
  const i = () => {
      t && (t = !1, e.target.removeEventListener("mousemove", l), e.target.removeEventListener("pointermove", d, {
        capture: !0
      }), r == null || r(), r = null);
    },
    o = () => t ? !n() || !e.dragging() ? (i(), !1) : !0 : !1,
    s = u => {
      o() && (i(), e.release(u));
    },
    l = u => {
      if (!o()) return;
      const h = u,
        p = e.now() - a.at;
      if (!(a.x === h.clientX && a.y === h.clientY && p >= 0 && p < 12)) {
        if ((h.buttons & 1) === 0) {
          e.shouldEnd(h) && s();
          return;
        }
        e.move({
          clientX: h.clientX,
          clientY: h.clientY,
          buttons: h.buttons
        });
      }
    },
    d = u => {
      if (!o()) return;
      const h = u;
      if (h.cancelable && h.preventDefault(), a = {
        x: h.clientX,
        y: h.clientY,
        at: e.now()
      }, h.pointerType === "mouse" && (h.buttons & 1) === 0) {
        e.shouldEnd(h) && s();
        return;
      }
      e.move({
        clientX: h.clientX,
        clientY: h.clientY,
        buttons: h.pointerType === "mouse" ? h.buttons : 1
      });
    };
  return {
    attach() {
      t || !e.dragging() || (n = e.captureValidity(), n() && (a = {
        x: NaN,
        y: NaN,
        at: -1 / 0
      }, t = !0, e.target.addEventListener("mousemove", l, {
        passive: !1
      }), e.target.addEventListener("pointermove", d, {
        capture: !0,
        passive: !1
      }), r = dje(u => {
        const h = u;
        s({
          clientX: h.clientX,
          clientY: h.clientY,
          target: h.target
        });
      }, e.target)));
    },
    detach: i,
    owns: o
  };
}

function VTi(e) {
  const t = g.useRef(e),
    n = g.useRef(!1);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const r = g.useMemo(() => GTi({
    target: window,
    now: () => performance.now(),
    dragging: () => n.current && !!t.current.dragNodeIdRef.current,
    captureValidity: () => t.current.document.lease().isCurrent,
    move: a => t.current.move(a),
    release: a => t.current.release(a),
    shouldEnd: Jcr
  }), []);
  return g.useLayoutEffect(() => {
    n.current = !0;
    const a = e.document.subscribe(r.detach);
    return () => {
      n.current = !1, a(), r.detach();
    };
  }, [e.document, r]), g.useEffect(() => {
    e.dragNodeId ? r.attach() : e.dragNodeIdRef.current || r.detach();
  }, [e.dragNodeId, e.dragNodeIdRef, r]), r;
}

const zFt = new Set(["input-image", "gen-image", "gen-video", "video-input", "preview"]),
  $kt = "_migrationPending";

function M2(e) {
  return e.settings || {};
}

function HTi(e, t) {
  return {
    ...e,
    settings: {
      ...M2(e),
      [$kt]: t
    }
  };
}

function qdn(e) {
  const t = M2(e);
  return t[$kt] === void 0 ? e : {
    ...e,
    settings: {
      ...t,
      [$kt]: void 0
    }
  };
}

function Eje(e) {
  const t = M2(e),
    n = String(e._contentAssetId || "").trim();
  return !!(typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || n || typeof t._blobUrl == "string" && t._blobUrl.trim().startsWith("blob:") || typeof t._canvasDisplayPreviewUrl == "string" && t._canvasDisplayPreviewUrl.trim().startsWith("blob:"));
}

function Kdn(e) {
  const t = String(e.content || "").trim();
  return t.startsWith("blob:") || t.startsWith("data:") || t.startsWith("content_ref:") || t.startsWith("local-asset://");
}

function mhr(e) {
  if (!zFt.has(e.type) || S0(e) && !Eje(e) && !Kdn(e)) return !1;
  if (Eje(e) || Kdn(e)) return !0;
  const t = String(e.content || "").trim();
  return t && nr(t) ? !M2(e)[Cl] && Eje(e) : !1;
}

async function WTi(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  try {
    const {
        readLocalOriginalAssetBlob: n
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetBlob: a
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetBlob: a
        };
      }, void 0, import.meta.url),
      r = await n(t);
    if (r && r.size > 0) return r;
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
    await n.init();
    const r = await n.getAssetBlob(t);
    if (r && r.size > 0) return r;
  } catch {}
  return null;
}

async function Gkt(e, t) {
  const n = e.type || "application/octet-stream";
  let r = "bin";
  n.startsWith("image/") ? r = n.includes("png") ? "png" : n.includes("webp") ? "webp" : n.includes("gif") ? "gif" : "jpg" : n.startsWith("video/") ? r = n.includes("webm") ? "webm" : "mp4" : n.startsWith("audio/") && (r = n.includes("wav") ? "wav" : "mp3");
  const a = t.replace(/[^\w.\-]+/g, "_").slice(0, 64);
  return new File([e], `${a}.${r}`, {
    type: n
  });
}

async function Vkt(e, t) {
  const n = String(t || "").trim() || Bue(e) || String(M2(e)._assetId || "").trim() || String(e._contentAssetId || "").trim();
  if (n) {
    const a = await WTi(n);
    if (a) return a;
  }
  const r = M2(e);
  for (const a of [r._blobUrl, r._canvasDisplayPreviewUrl, e.content]) {
    const i = String(a || "").trim();
    if (i && (i.startsWith("blob:") || i.startsWith("data:") || i.startsWith("http"))) {
      const o = await PHe(i);
      if (o && o.size > 0) return o;
    }
  }
  return null;
}

function qTi(e) {
  const t = M2(e),
    n = [],
    r = String(t._pendingRemoteResultUrl || "").trim();
  r && n.push(r);
  const a = Array.isArray(t.generatedImages) ? t.generatedImages : [];
  for (const s of a) {
    const l = String((s == null ? void 0 : s.fullUrl) || "").trim(),
      d = String((s == null ? void 0 : s.thumbUrl) || "").trim();
    l ? n.push(l) : d && n.push(d);
  }
  const i = Array.isArray(t.mjImages) ? t.mjImages : [];
  for (const s of i) {
    const l = String(s || "").trim();
    l && n.push(l);
  }
  const o = String(e.content || "").trim();
  return o && !o.startsWith("blob:") && !o.startsWith("data:") && n.push(o), Array.from(new Set(n.filter(Boolean)));
}

async function KTi(e) {
  const t = await Vkt(e);
  if (!t) return null;
  const n = await Gkt(t, e.id),
    r = await _P(n),
    a = Hv(r),
    i = M2(e);
  return {
    ...e,
    ...a,
    content: a.content ?? r.displayUrl,
    _contentAssetId: void 0,
    errorMsg: void 0,
    settings: {
      ...i,
      ...a.settings,
      _localCacheAssetId: void 0,
      _assetId: void 0,
      _contentAssetId: void 0,
      _blobUrl: void 0,
      _canvasDisplayPreviewUrl: void 0,
      _pendingRemoteResultUrl: void 0
    }
  };
}

async function QTi(e) {
  const t = e.type === "gen-video",
    n = String(M2(e)._localCacheAssetId || "").trim() || String(M2(e)._assetId || "").trim() || String(e._contentAssetId || "").trim() || e.id;
  if (Eje(e)) {
    const u = await Vkt(e, n);
    if (u) {
      const h = await Gkt(u, n),
        p = await _P(h),
        m = Hv(p),
        f = M2(e),
        y = [{
          id: n,
          thumbUrl: p.displayUrl,
          fullUrl: p.remoteUrl,
          createdAt: Date.now()
        }];
      return {
        ...e,
        ...m,
        content: p.displayUrl,
        _contentAssetId: void 0,
        isGenerating: !1,
        errorMsg: void 0,
        settings: {
          ...f,
          ...m.settings,
          generatedImages: y,
          _localCacheAssetId: void 0,
          _assetId: void 0,
          _contentAssetId: void 0,
          _mjPreviewAssetIds: void 0,
          _pendingRemoteResultUrl: void 0,
          isGenerating: !1,
          progress: 100,
          error: null
        }
      };
    }
  }
  const r = qTi(e).filter(u => u.startsWith("http://") || u.startsWith("https://"));
  if (r.length > 0) {
    const u = await xT(r, n, t);
    if (u) {
      const h = M2(e);
      return {
        ...e,
        content: u.displayUrls[0] || e.content,
        _contentAssetId: void 0,
        isGenerating: !1,
        errorMsg: void 0,
        settings: {
          ...h,
          ...u.ossSettings,
          generatedImages: u.generatedImages,
          isGenerating: !1,
          progress: 100,
          error: null,
          _localCacheAssetId: void 0,
          _assetId: void 0,
          _contentAssetId: void 0,
          _mjPreviewAssetIds: void 0,
          _pendingRemoteResultUrl: void 0,
          ...(u.remoteUrls.length > 1 ? {
            mjImages: u.remoteUrls
          } : {})
        }
      };
    }
  }
  const a = await Vkt(e, n);
  if (!a) return null;
  const i = await Gkt(a, n),
    o = await _P(i),
    s = Hv(o),
    l = M2(e),
    d = [{
      id: n,
      thumbUrl: o.displayUrl,
      fullUrl: o.remoteUrl,
      createdAt: Date.now()
    }];
  return {
    ...e,
    ...s,
    content: o.displayUrl,
    _contentAssetId: void 0,
    isGenerating: !1,
    errorMsg: void 0,
    settings: {
      ...l,
      ...s.settings,
      generatedImages: d,
      _localCacheAssetId: void 0,
      _assetId: void 0,
      _contentAssetId: void 0,
      _mjPreviewAssetIds: void 0,
      _pendingRemoteResultUrl: void 0,
      isGenerating: !1,
      progress: 100,
      error: null
    }
  };
}

async function YTi(e) {
  if (!mhr(e)) return null;
  try {
    if (e.type === "gen-image" || e.type === "gen-video") return await QTi(e);
    if (e.type === "input-image" || e.type === "video-input" || e.type === "preview") return await KTi(e);
  } catch (t) {
    console.warn("[canvasStorageModeReconcile] 节点 OSS 迁移失败:", e.id, t);
  }
  return null;
}

function XTi(e) {
  if (!zFt.has(e.type)) return null;
  const t = M2(e),
    n = String(t._localCacheAssetId || "").trim() || String(t._assetId || "").trim() || String(t._contentAssetId || "").trim() || String(e._contentAssetId || "").trim(),
    r = String(e.content || "").trim(),
    a = nr(r),
    i = !!t[Cl];
  if (!n && !a && !i || !n && (a || i)) return null;
  const o = {
    ...t,
    [Cl]: void 0,
    [T0]: void 0
  };
  return n && (o._localCacheAssetId = n, o._assetId = n, o._contentAssetId = n), {
    ...e,
    content: a || r.startsWith("blob:") ? "" : r,
    _contentAssetId: n || e._contentAssetId,
    errorMsg: e.errorMsg && a ? void 0 : e.errorMsg,
    settings: o
  };
}

async function JTi(e, t) {
  const n = {
    prepare: {
      attemptedCount: 0,
      preparedCount: 0,
      failedCount: 0
    },
    commit: {
      committedCount: 0,
      pendingCount: 0
    },
    failedCount: 0,
    pendingNodeIds: []
  };
  if (e.length === 0) return {
    nodes: e,
    changed: !1,
    migratedCount: 0,
    ...n
  };
  const r = [];
  let a = 0;
  for (const u of e) {
    if (t === "to-oss") {
      if (!ua() || !mhr(u)) {
        r.push({
          kind: "unchanged",
          original: u
        });
        continue;
      }
      a += 1;
      const f = await YTi(u);
      f ? r.push({
        kind: "prepared",
        original: u,
        next: qdn(f)
      }) : r.push({
        kind: "failed",
        original: u,
        pending: {
          direction: t,
          reason: "source-unavailable"
        }
      });
      continue;
    }
    const h = M2(u);
    if (!(zFt.has(u.type) && (nr(String(u.content || "").trim()) || !!h[Cl]))) {
      r.push({
        kind: "unchanged",
        original: u
      });
      continue;
    }
    a += 1;
    const m = XTi(u);
    m ? r.push({
      kind: "prepared",
      original: u,
      next: qdn(m)
    }) : r.push({
      kind: "failed",
      original: u,
      pending: {
        direction: t,
        reason: "local-copy-unavailable"
      }
    });
  }
  let i = 0;
  const o = [],
    s = r.map(u => u.kind === "prepared" ? (HIn(u.original), i += 1, u.next) : u.kind === "failed" ? (o.push(u.original.id), HTi(u.original, u.pending)) : u.original),
    l = o.length,
    d = s.some((u, h) => u !== e[h]);
  return {
    nodes: d ? s : e,
    changed: d,
    migratedCount: i,
    prepare: {
      attemptedCount: a,
      preparedCount: i,
      failedCount: l
    },
    commit: {
      committedCount: i,
      pendingCount: l
    },
    failedCount: l,
    pendingNodeIds: o
  };
}

function fhr(e) {
  let t = ei(),
    n = !1;
  const r = () => {
    var s, l, d, u;
    const a = ei();
    if (a === t || n) return;
    const i = a ? "to-local" : "to-oss";
    if (t = a, i === "to-oss" && !ua()) return;
    if (jb() || !$Ct("oss")) {
      e.deferIfBusy || (l = (s = e.toast) == null ? void 0 : s.error) == null || l.call(s, "存储位置变更进行中，请稍后再切换素材存放方式", 4e3), t = !a;
      return;
    }
    n = !0;
    const o = (u = (d = e.toast) == null ? void 0 : d.loading) == null ? void 0 : u.call(d, i === "to-oss" ? "正在将画布素材同步至图床…" : "正在切换为本地缓存展示…");
    JTi(e.getNodes(), i).then(({
      nodes: h,
      changed: p,
      migratedCount: m,
      failedCount: f
    }) => {
      var y, b, v, _, w, k, A, S;
      p && e.setNodes(h), i === "to-oss" ? m > 0 ? (b = (y = e.toast) == null ? void 0 : y.success) == null || b.call(y, `已同步 ${m} 个节点至全局 OSS`, 4e3) : p && ((_ = (v = e.toast) == null ? void 0 : v.success) == null || _.call(v, "画布已切换至全局 OSS 模式", 3e3)) : m > 0 && ((k = (w = e.toast) == null ? void 0 : w.success) == null || k.call(w, `已恢复 ${m} 个节点为本地缓存展示`, 4e3)), f > 0 && ((S = (A = e.toast) == null ? void 0 : A.error) == null || S.call(A, `${f} 个节点暂未完成迁移，已保留原素材引用`, 5e3));
    }).catch(h => {
      var p, m;
      console.warn("[canvasStorageModeReconcile] 画布模式同步失败:", h), (m = (p = e.toast) == null ? void 0 : p.error) == null || m.call(p, "画布模式切换同步未完成，请稍后重试", 5e3);
    }).finally(() => {
      var h;
      o && ((h = e.toast) != null && h.remove) && e.toast.remove(o), n = !1, GCt();
    });
  };
  return window.addEventListener(go, r), e.deferIfBusy && window.addEventListener(Yle, r), () => {
    window.removeEventListener(go, r), e.deferIfBusy && window.removeEventListener(Yle, r);
  };
}

const ZTi = new Set(["input-image", "gen-image", "preview", "gen-video", "video-input"]);

function iz(e) {
  const t = String(e || "").trim();
  return !(!t || Tu(t) || t === "undefined" || t === "null");
}

function e8i(e) {
  const t = V$(e, "image");
  if (iz(t)) return t.trim();
  const n = e.settings || {},
    r = String(n._ossRemoteUrl || "").trim();
  if (iz(r) && !/\/videos?\//i.test(r)) return r;
  const a = String(e.content || "").trim();
  if (iz(a) && !a.startsWith("data:video")) return a;
  const i = xf(e);
  return iz(i) && !ghr(i) ? i.trim() : null;
}

function t8i(e) {
  const t = V$(e, "video");
  if (iz(t)) return t.trim();
  const n = e.settings || {},
    r = String(n._ossRemoteUrl || "").trim();
  if (iz(r)) return r;
  const a = String(e.content || "").trim();
  if (iz(a)) return a;
  const i = xf(e);
  return iz(i) && ghr(i) ? i.trim() : null;
}

function ghr(e) {
  const t = e.toLowerCase();
  return t.startsWith("data:video") || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(t) || /\/videos?\//i.test(t);
}

function n8i(e) {
  return e.type === "gen-video" || e.type === "video-input" || e.previewType === "video" ? !0 : (e.settings || {}).mediaType === "video";
}

function r8i(e) {
  return [...e].sort((t, n) => {
    const r = (t.y || 0) - (n.y || 0);
    return Math.abs(r) > 24 ? r : (t.x || 0) - (n.x || 0);
  });
}

function yhr(e) {
  const t = r8i(e.filter(a => ZTi.has(a.type))),
    n = [],
    r = new Set();
  for (const a of t) {
    if (n8i(a)) {
      const o = t8i(a);
      if (!o || r.has(o)) continue;
      r.add(o), n.push({
        nodeId: a.id,
        type: "video",
        url: o,
        title: a.nodeName || "视频"
      });
      continue;
    }
    const i = e8i(a);
    !i || r.has(i) || (r.add(i), n.push({
      nodeId: a.id,
      type: "image",
      url: i,
      title: a.nodeName || "图片"
    }));
  }
  return n;
}

function a8i(e) {
  const t = yhr(e);
  if (t.length === 0) return null;
  const n = t.map(i => i.url),
    r = t.map(i => i.type),
    a = t[0];
  return {
    id: `demo-playlist-${a.nodeId}`,
    type: a.type,
    url: a.url,
    originalUrl: a.url,
    mjImages: n,
    mjMediaTypes: r,
    selectedMjImageIndex: 0,
    initialViewMode: "single",
    title: t.length > 1 ? `演示（${t.length}）` : a.title,
    preferDisplayUrls: !0
  };
}

function i8i({
  nodes: e,
  groups: t,
  selectedNodeIds: n,
  setLightboxItem: r,
  setLightboxOpen: a,
  toastError: i
}) {
  const o = g.useMemo(() => e.filter(h => n.has(h.id)), [e, n]),
    s = g.useCallback(h => {
      const p = a8i(h);
      if (!p) {
        i("当前选中没有可演示的图片或视频");
        return;
      }
      r(p), a(!0);
    }, [r, a, i]),
    l = g.useCallback(() => {
      s(o);
    }, [o, s]),
    d = g.useMemo(() => yhr(o).length > 0, [o]),
    u = g.useCallback(h => {
      const p = t.find(f => f.id === h);
      if (!p || p.nodeIds.length === 0) {
        i("当前分组没有可演示的图片或视频");
        return;
      }
      const m = new Set(p.nodeIds);
      s(e.filter(f => m.has(f.id)));
    }, [t, e, s, i]);
  return {
    handleDemoSelected: l,
    canDemoSelected: d,
    handleDemoGroup: u
  };
}

let oz = null;

function o8i(e, t) {
  const n = new Map(),
    r = new Set(e);
  for (const a of t) r.has(a.id) && n.set(a.id, {
    x: a.x,
    y: a.y
  });
  return n;
}

function s8i(e) {
  const t = o8i(e.memberIds, e.nodes);
  for (const [n, r] of t) R1(n, r.x, r.y);
  oz = {
    memberIds: e.memberIds,
    origin: e.origin,
    startPositions: t,
    lastDelta: {
      x: 0,
      y: 0
    }
  }, !(!e.connections.length || !e.svg) && fxe(e.memberIds, e.connections, e.svg, e.endpoints, e.intraGroupIds, {
    zoom: e.view.zoom,
    startPositions: t
  });
}

function l8i(e) {
  if (!oz || !e.svg) return;
  const t = {
    x: e.anchorX - oz.origin.x,
    y: e.anchorY - oz.origin.y
  };
  oz.lastDelta = t, e.connections.length && qae(e.connections, e.view, e.svg, t, e.endpoints);
}

function c8i(e) {
  const t = oz;
  if (oz = null, !!t) {
    for (const [n, r] of t.startPositions) R1(n, r.x + t.lastDelta.x, r.y + t.lastDelta.y);
    gxe(e.connections, e.view, e.svg, e.endpoints, e.intraGroupIds);
  }
}

function Qdn() {
  return oz != null;
}

const Hkt = "qdm-video-timeline-fit-view";

function d8i(e) {
  window.dispatchEvent(new CustomEvent(Hkt, {
    detail: e
  }));
}

function u8i({
  node: e,
  viewportWidth: t,
  viewportHeight: n,
  aspectRatio: r,
  previewWidthRatio: a
}) {
  const i = Math.max(.1, r || 1.7777777777777777),
    o = Math.max(.25, Math.min(1, a || .78)),
    l = e.width * o / i,
    d = e.y - l - 12,
    u = l + 12 + e.height,
    h = e.x + e.width / 2,
    p = d + u / 2,
    m = Math.max(.05, Math.min(1, Math.max(1, t) * .82 / Math.max(1, e.width), Math.max(1, n) * .82 / Math.max(1, u)));
  return {
    x: t / 2 - h * m,
    y: n / 2 - p * m,
    zoom: m
  };
}

function h8i(e, t, n, r) {
  g.useEffect(() => {
    const a = i => {
      var d, u;
      const o = i.detail,
        s = (d = t.current) == null ? void 0 : d.find(h => h.id === (o == null ? void 0 : o.nodeId)),
        l = (u = n.current) == null ? void 0 : u.getBoundingClientRect();
      !s || !l || r(u8i({
        node: s,
        viewportWidth: l.width,
        viewportHeight: l.height,
        aspectRatio: o.aspectRatio,
        previewWidthRatio: o.previewWidthRatio
      }));
    };
    return window.addEventListener(Hkt, a), () => window.removeEventListener(Hkt, a);
  }, [t, n, r]);
}

const Wkt = "performancePanelModeChanged";

function p8i() {
  if (typeof localStorage > "u") return "off";
  try {
    const e = localStorage.getItem(Zi.PERFORMANCE_PANEL_MODE);
    if (e === "compact") return "off";
    if (e === "full") return "full";
  } catch {}
  return "off";
}

let z1e = null;

function JUe() {
  return z1e == null && (z1e = p8i()), z1e;
}

function bhr(e) {
  if (z1e = e, typeof localStorage < "u") try {
    e === "off" ? localStorage.removeItem(Zi.PERFORMANCE_PANEL_MODE) : localStorage.setItem(Zi.PERFORMANCE_PANEL_MODE, e);
  } catch {}
  window.dispatchEvent(new CustomEvent(Wkt));
}

function m8i(e) {
  const t = () => e(JUe());
  return window.addEventListener(Wkt, t), e(JUe()), () => window.removeEventListener(Wkt, t);
}

function Ydn() {
  bhr("off");
}

function vhr() {
  if (!(typeof localStorage > "u")) try {
    localStorage.getItem(Zi.PERFORMANCE_PANEL_MODE) === "compact" && (localStorage.removeItem(Zi.PERFORMANCE_PANEL_MODE), z1e = "off");
  } catch {}
}

const f8i = [Zi.CANVAS_MEDIA_TILES, Zi.CANVAS_MEDIA_TILE_BACKEND, Zi.CANVAS_UNIFIED_GL, Zi.CANVAS_COMPOSITOR, Zi.CANVAS_VIDEO_TILE_FRAMES],
  g8i = ["qiaodoumayi_force_canvas_2k_render", "qiaodoumayi_canvas_render_budget", "qiaodoumayi_performance_render_scale_hud"];

function y8i() {
  if (!(typeof localStorage > "u")) try {
    for (const e of f8i) localStorage.removeItem(e);
    for (const e of g8i) localStorage.removeItem(e);
  } catch {}
}

function b8i(e, t) {
  const [n] = g.useState(() => SCi());
  return n.publish(e, t), g.useLayoutEffect(() => {
    n.flush();
  }), n;
}

function v8i(e, t) {
  return g.useSyncExternalStore(n => e.subscribeNode(t, n), () => e.getNode(t), () => e.getNode(t));
}

function w8i(e, t) {
  const n = g.useMemo(() => xOr(e), [e]),
    r = g.useMemo(() => bP(e), [e]),
    a = b8i(e, r),
    [i, o] = g.useState(() => ({
      signature: n,
      connections: t,
      version: 2
    }));
  let s = i;
  return (n !== i.signature || t !== i.connections) && (s = {
    signature: n,
    connections: t,
    version: i.version + +(n !== i.signature) + +(t !== i.connections)
  }, o(s)), {
    nodesMap: r.byId,
    nodeIndex: r,
    dataVersion: s.version,
    nodeDocument: a
  };
}

function x8i(e) {
  const t = new Map();
  for (const n of e) {
    if (n.inputType === "agent_sequence") continue;
    const r = t.get(n.from);
    r ? r.push(n.to) : t.set(n.from, [n.to]);
  }
  return t;
}

function _8i(e, t) {
  const n = [...e];
  let r = 0;
  for (; r < n.length;) {
    const a = n[r++],
      i = t.get(a);
    if (i) for (const o of i) e.has(o) || (e.add(o), n.push(o));
  }
}

function k8i(e, t, n) {
  let r;
  for (const a of e.keys()) t.has(a) || (r ?? (r = new Map(e))).delete(a);
  for (const a of n) t.has(a) && (r ?? (r = new Map(e)), r.set(a, (r.get(a) || 0) + 1));
  return r ?? e;
}

const A8i = e => `${e.id}|${e.from}|${e.to}|${e.inputType || "default"}`;

function whr(e) {
  const t = e.map(n => ({
    from: n.from,
    to: n.to,
    key: A8i(n)
  }));
  return {
    entries: t,
    signatures: new Set(t.map(n => n.key)),
    outgoing: x8i(e)
  };
}

function S8i(e) {
  const t = wIt(e.nodes, e.nodeIndex);
  return {
    inputs: e,
    byId: t,
    live: new Set(t.keys()),
    topology: whr(e.connections),
    selected: new Set(e.selectedNodeIds),
    versions: new Map()
  };
}

function I8i(e, t) {
  const n = e.inputs;
  if (n.nodes === t.nodes && n.connections === t.connections && n.selectedNodeId === t.selectedNodeId && n.selectedNodeIds === t.selectedNodeIds) return e;
  const r = new Set(),
    a = new Set();
  let i = e.byId,
    o = e.live,
    s = e.topology;
  if (n.nodes !== t.nodes) {
    i = wIt(t.nodes, t.nodeIndex), o = new Set(i.keys());
    for (const l of t.nodes) {
      const d = e.byId.get(l.id);
      d === l || d && QEt(d, l) || (r.add(l.id), (!d || !_Or(d, l)) && a.add(l.id));
    }
    for (const l of e.byId.keys()) o.has(l) || (r.add(l), a.add(l));
  }
  if (n.connections !== t.connections) {
    s = whr(t.connections);
    const l = (d, u) => {
      r.add(d), r.add(u), a.add(d), a.add(u);
    };
    for (const d of s.entries) e.topology.signatures.has(d.key) || l(d.from, d.to);
    for (const d of e.topology.entries) s.signatures.has(d.key) || l(d.from, d.to);
  }
  return _8i(a, s.outgoing), a.forEach(l => r.add(l)), n.selectedNodeId !== t.selectedNodeId && (n.selectedNodeId && r.add(n.selectedNodeId), t.selectedNodeId && r.add(t.selectedNodeId)), e.selected.forEach(l => {
    t.selectedNodeIds.has(l) || r.add(l);
  }), t.selectedNodeIds.forEach(l => {
    e.selected.has(l) || r.add(l);
  }), {
    inputs: t,
    byId: i,
    live: o,
    topology: s,
    selected: new Set(t.selectedNodeIds),
    versions: r.size ? k8i(e.versions, o, r) : e.versions
  };
}

function C8i(e, t, n, r, a) {
  const i = {
      nodes: e,
      connections: t,
      selectedNodeId: n,
      selectedNodeIds: r,
      nodeIndex: a
    },
    [o, s] = g.useState(() => S8i(i)),
    l = I8i(o, i);
  return l !== o && s(l), l.versions;
}

function E8i(e, t) {
  const n = new Map();
  for (const r of e) {
    if (!r.collapsed || r.collapsedX == null || r.collapsedY == null) continue;
    const {
        halfWidth: a
      } = Kue(r, t),
      i = R5e(r, t),
      o = {
        x: r.collapsedX - a,
        y: r.collapsedY
      };
    for (const s of r.nodeIds) n.set(s, {
      output: i,
      input: o
    });
  }
  return n;
}

function T8i({
  groups: e,
  nodes: t,
  connections: n,
  setConnections: r,
  multiConnectingSourceIds: a
}) {
  const i = g.useMemo(() => E8i(e, t), [e, t]),
    o = g.useMemo(() => rDr(e, t), [e, t]),
    s = g.useMemo(() => sDr(e, t), [e, t]),
    l = g.useMemo(() => zEt(e, t), [e, t]);
  g.useEffect(() => {
    r(f => {
      const y = l.size > 0 ? lDr(f, l) : f,
        b = cDr(y, e, t);
      return b === f ? f : b;
    });
  }, [l, e, t, r]);
  const d = g.useMemo(() => {
      const f = new Map(i);
      return o.forEach((y, b) => {
        f.has(b) || f.set(b, y);
      }), f;
    }, [i, o]),
    u = g.useRef(d);
  u.current = d;
  const h = g.useMemo(() => mDr(n, e, t), [n, e, t]),
    p = g.useRef(h);
  p.current = h;
  const m = g.useMemo(() => UEt(a, e, t), [a, e, t]);
  return {
    collectionEndpoints: i,
    groupOutputNodeToGroupId: s,
    expandedGroupNodeToGroupId: l,
    mergedConnectionEndpoints: d,
    collectionEndpointsRef: u,
    intraGroupConnectionIds: h,
    intraGroupConnectionIdsRef: p,
    connectingGroupOutputId: m
  };
}

const xhr = 1,
  M8i = 0;

function P8i(e) {
  return Number.isFinite(e) && e < M8i;
}

function R8i(e, t, n, r = xhr) {
  const a = e.zoom || 1,
    i = t / a,
    o = n / a,
    s = -e.x / a,
    l = -e.y / a,
    d = i * r,
    u = o * r;
  return {
    left: s - d,
    top: l - u,
    right: s + i + d,
    bottom: l + o + u
  };
}

function Xdn(e, t) {
  return e.left <= t.right && e.right >= t.left && e.top <= t.bottom && e.bottom >= t.top;
}

function Jdn(e) {
  const t = e.width ?? 260,
    n = e.height ?? 200;
  return {
    left: e.x,
    top: e.y,
    right: e.x + t,
    bottom: e.y + n
  };
}

function N8i(e, t, n, r) {
  const a = t.get(e.from),
    i = t.get(e.to);
  if (!a || !i) return null;
  let o = Jdn(a),
    s = Jdn(i);
  const l = h3(e, e.from, n, r, "output"),
    d = h3(e, e.to, n, r, "input");
  if (l) {
    const {
      x: u,
      y: h
    } = l;
    o = {
      left: u - 12,
      top: h - 12,
      right: u + 12,
      bottom: h + 12
    };
  }
  if (d) {
    const {
      x: u,
      y: h
    } = d;
    s = {
      left: u - 12,
      top: h - 12,
      right: u + 12,
      bottom: h + 12
    };
  }
  return {
    from: o,
    to: s
  };
}

function j8i(e, t, n, r, a) {
  const i = N8i(e, n, r, a);
  return i ? Xdn(t, i.from) || Xdn(t, i.to) : !1;
}

function D8i(e, t) {
  const {
    from: n,
    to: r
  } = e;
  if (t.selectedConnectionId === e.id || t.selectedNodeId === n || t.selectedNodeId === r || t.selectedNodeIds.has(n) || t.selectedNodeIds.has(r) || t.connectingNodeIds.has(n) || t.connectingNodeIds.has(r)) return !0;
  const a = t.activeDragNodeIds;
  if (a && a.size > 0 && (a.has(n) || a.has(r))) return !0;
  if (P8i(t.view.zoom)) return !1;
  if (t.cullOffscreen === !1 || t.viewportWidth <= 0 || t.viewportHeight <= 0) return !0;
  const i = R8i(t.view, t.viewportWidth, t.viewportHeight, xhr);
  return j8i(e, i, t.nodesMap, t.collectionEndpoints, t.intraGroupConnectionIds);
}

function L8i(e) {
  const t = new Map();
  return e.forEach((n, r) => {
    if (n.collapsed) for (const a of n.nodeIds) {
      let i = t.get(a);
      i || t.set(a, i = new Set()), i.add(r);
    }
  }), t;
}

function O8i(e, t, n) {
  const r = n.get(e),
    a = n.get(t);
  if (!r || !a) return !1;
  for (const i of r) if (a.has(i)) return !0;
  return !1;
}

function B8i(e, t) {
  const n = e.filter(r => {
    const {
      collectedNodeIds: a,
      collectionEndpoints: i,
      previewCollapsedOrCompactNodeIds: o
    } = t;
    if (o.has(r.from) && o.has(r.to)) return !1;
    const s = a.has(r.from),
      l = a.has(r.to);
    return s && l ? O8i(r.from, r.to, t.collapsedMembership) ? !1 : !!(i.get(r.from) && i.get(r.to)) : s ? !!i.get(r.from) : l ? !!i.get(r.to) : !0;
  });
  return pDr(n, t.groupOutputNodeToGroupId);
}

function F8i({
  connections: e,
  groups: t,
  display: n,
  viewport: r,
  layoutSignature: a
}) {
  const i = g.useMemo(() => L8i(t), [t]),
    o = SIi(),
    {
      collectedNodeIds: s,
      collectionEndpoints: l,
      previewCollapsedOrCompactNodeIds: d,
      groupOutputNodeToGroupId: u
    } = n,
    h = g.useMemo(() => {
      const I = B8i(e, {
        collectedNodeIds: s,
        collectionEndpoints: l,
        previewCollapsedOrCompactNodeIds: d,
        groupOutputNodeToGroupId: u,
        collapsedMembership: i
      });
      return o.size === 0 ? I : I.filter(E => !o.has(E.from) && !o.has(E.to));
    }, [e, s, l, d, u, i, o]),
    {
      view: p,
      viewportWidth: m,
      viewportHeight: f,
      nodesMap: y,
      collectionEndpoints: b,
      intraGroupConnectionIds: v,
      selectedConnectionId: _,
      selectedNodeId: w,
      selectedNodeIds: k,
      connectingNodeIds: A,
      activeDragNodeIds: S
    } = r,
    C = _lr(y.size);
  return g.useMemo(() => {
    const I = {
      view: p,
      viewportWidth: m,
      viewportHeight: f,
      nodesMap: y,
      collectionEndpoints: b,
      intraGroupConnectionIds: v,
      selectedConnectionId: _,
      selectedNodeId: w,
      selectedNodeIds: k,
      connectingNodeIds: A,
      activeDragNodeIds: S,
      cullOffscreen: C
    };
    return h.filter(E => D8i(E, I));
  }, [h, p, m, f, y, b, v, _, w, k, A, S, a, C]);
}

function z8i(e, t, n, r) {
  const a = new Map();
  for (const [o, s] of t) a.set(o, {
    x: s.x,
    y: s.y,
    width: s.width ?? 260,
    height: s.height ?? 200
  });
  let i;
  if (e && e.topology === n && t.size > 0) {
    const o = new Set();
    for (const [s, l] of a) {
      const d = e.geometry.get(s);
      (!d || d.x !== l.x || d.y !== l.y || d.width !== l.width || d.height !== l.height) && o.add(s);
    }
    for (const s of e.geometry.keys()) t.has(s) || o.add(s);
    o.size > 0 && o.size * 2 < t.size && (i = new Set(r.filter(s => o.has(s.from) || o.has(s.to)).map(s => s.id)));
  }
  return {
    snapshot: {
      topology: n,
      geometry: a
    },
    onlyConnectionIds: i
  };
}

function U8i(e, t = Nj) {
  const {
      connections: n,
      nodesGeometryMap: r,
      visibleConnectionLayoutSignature: a,
      mergedConnectionEndpoints: i,
      intraGroupConnectionIds: o,
      forceStraightConnectionIds: s,
      showAllCanvasConnections: l,
      visibleConnectionsRef: d,
      svgContainerRef: u,
      viewRef: h,
      collectionEndpointsRef: p,
      connectionsRef: m,
      intraGroupConnectionIdsRef: f
    } = e,
    y = g.useMemo(() => n.map(v => `${v.id}|${v.from}|${v.to}|${v.inputType || "default"}`).sort().join(","), [n]),
    b = g.useRef(null);
  g.useEffect(() => {
    var _;
    if (!((_ = d.current) != null && _.length) || !u.current) return;
    const v = requestAnimationFrame(() => {
      const w = d.current,
        k = u.current,
        A = h.current;
      if (!(w != null && w.length) || !k || !A) return;
      const S = z8i(b.current, r, y, w),
        C = (I, E) => {
          I.length && t(I, A, k, void 0, void 0, void 0, p.current ?? void 0, {
            ...(E === void 0 ? {} : {
              forceStraightLine: E
            }),
            allConnections: m.current ?? void 0
          }, f.current ?? void 0, S.onlyConnectionIds);
        };
      if (l) C(w, !1);else {
        const I = w.filter(E => s.has(E.id));
        C(I.length ? w.filter(E => !s.has(E.id)) : w), C(I, !0);
      }
      b.current = S.snapshot;
    });
    return () => cancelAnimationFrame(v);
  }, [a, y, i, o, r, s, l, d, u, h, p, m, f, t]);
}

const $8i = 2e3;

function G8i(e, t, n, r, a) {
  const i = new Set([...t].filter(d => n.has(d))),
    o = new Map();
  if ((e == null ? void 0 : e.scope) === r) {
    for (const [d, u] of e.retainedUntil) u > a && n.has(d) && !i.has(d) && o.set(d, u);
    for (const d of e.activeIds) !i.has(d) && n.has(d) && o.set(d, a + $8i);
  }
  const s = new Set([...i, ...o.keys()]),
    l = o.size ? Math.min(...o.values()) : null;
  return {
    snapshot: {
      scope: r,
      activeIds: i,
      retainedUntil: o
    },
    mountedIds: s,
    nextExpiry: l
  };
}

const V8i = new Set();

function H8i({
  document: e,
  connections: t,
  activeIds: n,
  enabled: r
}) {
  const a = g.useSyncExternalStore(e.subscribe, () => e.current().token),
    i = g.useRef(null),
    [o, s] = g.useState(0),
    l = g.useMemo(() => new Set(t.map(u => u.id)), [t]),
    d = g.useMemo(() => {
      const u = r && e.current().ready;
      return G8i(u ? i.current : null, u ? n : V8i, l, a, Date.now());
    }, [e, n, l, a, r, o]);
  return g.useLayoutEffect(() => {
    if (i.current = d.snapshot, d.nextExpiry === null) return;
    const u = window.setTimeout(() => s(h => h + 1), Math.max(1, d.nextExpiry - Date.now()));
    return () => window.clearTimeout(u);
  }, [d]), d.mountedIds;
}

const W8i = 28,
  q8i = 14;

function K8i(e, t) {
  const n = Math.min(100, Math.max(0, Math.round(t)));
  if (n >= 100) return !0;
  if (n <= 0) return !1;
  let r = 0;
  for (let a = 0; a < e.length; a++) r = r * 31 + e.charCodeAt(a) | 0;
  return Math.abs(r) % 100 < n;
}

function Q8i(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) n = n * 31 + e.charCodeAt(r) | 0;
  return Math.abs(n) % t === 0;
}

function Y8i(e) {
  return Q8i(e, 2);
}

function qkt(e) {
  return K8i(e, q8i);
}

function ZUe(e, t) {
  return t.selectedNodeId === e || t.selectedNodeIds.has(e);
}

function Kkt(e, t) {
  return ZUe(e.from, t) || ZUe(e.to, t);
}

function Zdn(e, t) {
  return ZUe(e.from, t) && ZUe(e.to, t);
}

function UFt(e, t) {
  var n;
  return ((n = t.intraGroupConnectionIds) == null ? void 0 : n.has(e.id)) ?? !1;
}

function $Ft(e, t) {
  var n;
  return !!(t.selectedConnectionId === e.id || t.connectingNodeIds.has(e.from) || t.connectingNodeIds.has(e.to) || (n = t.taskActiveConnectionIds) != null && n.has(e.id));
}

function GFt(e, t) {
  const n = t.activeDragNodeIds;
  return !n || n.size === 0 || n.size > 1 ? !1 : n.has(e.from) || n.has(e.to);
}

function eun(e, t) {
  const n = s => s.map(l => ({
      connection: l,
      tier: "detail"
    })),
    r = e.filter(s => Zdn(s, t)),
    i = r.length > uDr,
    o = new Set();
  for (const s of e) {
    if (UFt(s, t)) {
      o.add(s.id);
      continue;
    }
    if (GFt(s, t)) {
      o.add(s.id);
      continue;
    }
    if ($Ft(s, t)) {
      o.add(s.id);
      continue;
    }
    if (!Kkt(s, t)) {
      !t.denseOverview && qkt(s.id) && o.add(s.id);
      continue;
    }
    if (Zdn(s, t)) {
      (!i || qkt(s.id)) && o.add(s.id);
      continue;
    }
    Y8i(s.id) && o.add(s.id);
  }
  return i && r.length > 0 && !r.some(s => o.has(s.id)) && o.add(r[0].id), n(e.filter(s => o.has(s.id)));
}

function X8i(e, t) {
  const n = a => a.map(i => ({
      connection: i,
      tier: "detail"
    })),
    r = new Set();
  for (const a of e) {
    if (UFt(a, t)) {
      r.add(a.id);
      continue;
    }
    if ($Ft(a, t)) {
      r.add(a.id);
      continue;
    }
    if (GFt(a, t)) {
      r.add(a.id);
      continue;
    }
    if (t.denseOverview) {
      Kkt(a, t) && r.add(a.id);
      continue;
    }
    if (Kkt(a, t)) {
      r.add(a.id);
      continue;
    }
    qkt(a.id) && r.add(a.id);
  }
  return n(e.filter(a => r.has(a.id)));
}

function tun(e, t) {
  var i;
  const n = o => o.map(s => ({
    connection: s,
    tier: "detail"
  }));
  if (t != null && t.fullDisplay) return n(e);
  const r = t == null ? void 0 : t.freezeMountedIds;
  return (((i = t == null ? void 0 : t.activeDragNodeIds) == null ? void 0 : i.size) ?? 0) > 0 && r && t ? n(e.filter(o => r.has(o.id) || UFt(o, t) || $Ft(o, t) || GFt(o, t))) : t != null && t.denseOverview ? t.selectedNodeIds.size >= 2 ? eun(e, t) : X8i(e, t) : !t || e.length < W8i || t.selectedNodeIds.size < 2 ? n(e) : eun(e, t);
}

function J8i(e, t) {
  return t.selectedNodeId === e.from || t.selectedNodeId === e.to || t.selectedNodeIds.has(e.from) || t.selectedNodeIds.has(e.to);
}

function Z8i(e, t) {
  var r;
  if ((r = t.intraGroupConnectionIds) != null && r.has(e.id) || e.id === t.selectedConnectionId) return !1;
  const n = t.draggedNodeIds;
  return !(n && (n.has(e.from) || n.has(e.to)) || t.taskActiveConnectionIds.has(e.id));
}

function e6i(e, t) {
  const n = new Set(t.boxSelectStraightConnectionIds);
  if (!t.selectedNodeId && t.selectedNodeIds.size === 0) return n;
  for (const r of e) J8i(r, t) && n.add(r.id);
  return n;
}

function t6i(e, t, n) {
  const r = new Set();
  for (const a of e) Z8i(a, t) && r.add(a.id);
  return r;
}

function n6i({
  viewportConnections: e,
  selectedNodeId: t,
  selectedNodeIds: n,
  selectedConnectionId: r,
  connectingNodeIds: a,
  activeDragNodeIds: i,
  denseOverview: o,
  intraGroupConnectionIds: s,
  taskActiveConnectionIds: l,
  retainedFlowConnectionIds: d,
  hideConnections: u,
  showAllConnections: h,
  showBoxSelectBounds: p,
  staticCanvasEnabled: m,
  nodesGeometryMap: f,
  collectionEndpoints: y
}) {
  const b = g.useRef(new Set()),
    v = g.useRef(!1),
    _ = ((i == null ? void 0 : i.size) ?? 0) > 0,
    w = g.useMemo(() => {
      if (u) {
        const j = new Set([...n, ...a, ...(i ?? [])]);
        return t && j.add(t), e.filter(B => j.has(B.from) || j.has(B.to)).map(B => ({
          connection: B,
          tier: "detail"
        }));
      }
      return tun(e, {
        selectedNodeId: t,
        selectedNodeIds: n,
        selectedConnectionId: r,
        connectingNodeIds: a,
        activeDragNodeIds: i,
        denseOverview: o,
        intraGroupConnectionIds: s,
        taskActiveConnectionIds: d,
        freezeMountedIds: _ && v.current ? b.current : void 0
      });
    }, [e, t, n, r, a, i, _, o, s, d, u]),
    k = g.useMemo(() => w.map(j => j.connection), [w]),
    A = g.useMemo(() => u ? k : h ? e : o ? tun(e, {
      selectedNodeId: t,
      selectedNodeIds: n,
      selectedConnectionId: r,
      connectingNodeIds: a,
      activeDragNodeIds: i,
      intraGroupConnectionIds: s,
      taskActiveConnectionIds: d
    }).map(j => j.connection) : k, [u, h, o, k, e, t, n, r, a, i, s, d]),
    S = g.useMemo(() => !p || n.size < 2 ? new Set() : new Set(A.filter(j => n.has(j.from) && n.has(j.to)).map(j => j.id)), [p, n, A]),
    C = g.useMemo(() => h ? new Set() : S, [h, S]),
    I = g.useMemo(() => u ? new Set() : t6i(A, {
      selectedConnectionId: r,
      draggedNodeIds: i,
      taskActiveConnectionIds: l,
      intraGroupConnectionIds: h ? void 0 : s
    }), [u, A, r, t, n, S, i, l, h, s, m]),
    E = g.useMemo(() => A.filter(j => I.has(j.id)), [A, I]),
    M = g.useMemo(() => {
      if (A === k) return k;
      const j = new Set(k.map(B => B.id));
      return A.filter(B => j.has(B.id) || !I.has(B.id));
    }, [A, k, I]);
  _ || (b.current = new Set(M.map(j => j.id)), v.current = !0);
  const T = g.useMemo(() => e6i(E, {
      selectedNodeId: t,
      selectedNodeIds: n,
      boxSelectStraightConnectionIds: S
    }), [E, t, n, S]),
    P = g.useMemo(() => {
      const j = new Map(w.map(B => [B.connection.id, B.tier]));
      for (const B of M) j.has(B.id) || j.set(B.id, "detail");
      return j;
    }, [w, M]),
    R = g.useMemo(() => W8n(M, f, y, s), [M, f, y, s]);
  return {
    visibleConnections: M,
    canvasVisualConnections: A,
    boxSelectStraightConnectionIds: S,
    highlightConnectionIds: T,
    forceStraightConnectionIds: C,
    staticConnectionIds: I,
    staticConnections: E,
    connectionRenderTierById: P,
    visibleConnectionLayoutSignature: R,
    flowConnectionIds: d
  };
}

function r6i(e, t, n) {
  if (e.size > 0) return e;
  if (t) return n.size > 1 && n.has(t) ? n : new Set([t]);
}

function a6i(e, t) {
  if (e === t) return !0;
  if (!e || !t || e.size !== t.size) return !1;
  for (const n of t) if (!e.has(n)) return !1;
  return !0;
}

function i6i({
  connections: e,
  groups: t,
  collectedNodeIds: n,
  collectionEndpoints: r,
  groupOutputNodeToGroupId: a,
  previewCollapsedOrCompactNodeIds: i,
  nodesVisibilityView: o,
  canvasInnerViewport: s,
  nodesGeometryMap: l,
  mergedConnectionEndpoints: d,
  intraGroupConnectionIds: u,
  selectedConnectionId: h,
  selectedNodeId: p,
  selectedNodeIds: m,
  connectingNodeIds: f,
  dragNodeId: y,
  nodesLayoutSignature: b,
  nodesMap: v,
  enableGenerationConnectionFlow: _,
  generationDocument: w,
  denseMediaOverviewActive: k,
  hideConnections: A,
  showAllCanvasConnections: S,
  showBoxSelectBounds: C,
  visibleConnectionsRef: I,
  svgContainerRef: E,
  viewRef: M,
  collectionEndpointsRef: T,
  connectionsRef: P,
  intraGroupConnectionIdsRef: R
}) {
  const [j, B] = g.useState(0),
    F = g.useRef(void 0),
    N = g.useMemo(() => {
      const U = r6i(qE(), y, m);
      return a6i(F.current, U) ? F.current : (F.current = U, U);
    }, [y, m, j]),
    G = g.useMemo(() => e.filter(U => U.inputType !== "agent_sequence"), [e]),
    z = F8i({
      connections: G,
      groups: t,
      display: {
        collectedNodeIds: n,
        collectionEndpoints: r,
        groupOutputNodeToGroupId: a,
        previewCollapsedOrCompactNodeIds: i
      },
      viewport: {
        view: o,
        viewportWidth: s.width,
        viewportHeight: s.height,
        nodesMap: l,
        collectionEndpoints: d,
        intraGroupConnectionIds: u,
        selectedConnectionId: h,
        selectedNodeId: p,
        selectedNodeIds: m,
        connectingNodeIds: f,
        activeDragNodeIds: N
      },
      layoutSignature: b
    }),
    V = _ && !GEt(v.size, o.zoom),
    O = B8n(z, v, V),
    L = H8i({
      document: w,
      connections: G,
      activeIds: O,
      enabled: V
    }),
    D = n6i({
      viewportConnections: z,
      selectedNodeId: p,
      selectedNodeIds: m,
      selectedConnectionId: h,
      connectingNodeIds: f,
      activeDragNodeIds: N,
      denseOverview: k,
      intraGroupConnectionIds: u,
      taskActiveConnectionIds: O,
      retainedFlowConnectionIds: L,
      hideConnections: A,
      showAllConnections: S,
      showBoxSelectBounds: C,
      staticCanvasEnabled: yvi,
      nodesGeometryMap: l,
      collectionEndpoints: d
    });
  return I.current = D.visibleConnections, U8i({
    connections: e,
    nodesGeometryMap: l,
    visibleConnectionLayoutSignature: D.visibleConnectionLayoutSignature,
    mergedConnectionEndpoints: d,
    intraGroupConnectionIds: u,
    forceStraightConnectionIds: D.forceStraightConnectionIds,
    showAllCanvasConnections: S,
    visibleConnectionsRef: I,
    svgContainerRef: E,
    viewRef: M,
    collectionEndpointsRef: T,
    connectionsRef: P,
    intraGroupConnectionIdsRef: R
  }), {
    connectionRenderPlan: D,
    canvasDependencyConnections: G,
    setDragMountVersion: B
  };
}

const o6i = 48,
  s6i = 72;

function l6i(e, t) {
  return e >= o6i || t >= s6i;
}

function c6i(e) {
  return `w-full max-w-full min-w-0 min-h-0 h-screen font-sans overflow-hidden select-none flex flex-col transition-colors duration-300 ${e.isDark ? "bg-[#09090b] text-white" : "bg-zinc-100 text-zinc-900"} ${e.isPerfMode ? "perf-mode" : ""} ${e.isInteracting ? "interacting" : ""} ${e.zoomClassName}`;
}

const d6i = {
    enabled: !1,
    getZone: () => "off"
  },
  _hr = g.createContext(d6i);

function u6i({
  zoneMap: e,
  children: t
}) {
  const n = ua(),
    r = g.useMemo(() => ({
      enabled: n,
      getZone: a => n ? e.get(a) ?? "far" : "off"
    }), [n, e]);
  return c.jsx(_hr.Provider, {
    value: r,
    children: t
  });
}

function khr(e) {
  const t = g.useContext(_hr);
  return t.enabled ? t.getZone(e) : "off";
}

function h6i(e, t) {
  const n = g.useRef(!1),
    r = g.useRef(t),
    [a, i] = g.useState(!1);
  return g.useEffect(() => {
    const o = n.current && !e;
    if (e && !n.current && (r.current = t), n.current = e, i(!1), !o || !t || t === r.current || !t.isCurrent()) return;
    i(!0);
    const s = setTimeout(() => i(!1), 1500);
    return () => clearTimeout(s);
  }, [e, t]), !e && !!t && t.isCurrent() && a;
}

const p6i = () => () => {};

function Ahr(e, t) {
  const n = (e == null ? void 0 : e.getSnapshot) ?? (() => t);
  return g.useSyncExternalStore((e == null ? void 0 : e.subscribe) ?? p6i, n, n);
}

const m6i = g.memo(function ({
    isDark: t,
    projectSaving: n,
    projectLoading: r,
    receipt: a,
    progressStore: i
  }) {
    on();
    const o = Ahr(i),
      s = h6i(n, a),
      d = SQe().some(f => f.placement === "canvas-top" && f.noticeKey !== "download"),
      u = n || r || s && !d,
      h = s ? "保存完成" : n ? "项目管理保存中" : "项目管理加载中",
      p = s ? 100 : o.percent,
      m = r && !o.message ? p < 20 ? "加载项目文件..." : p < 40 ? "处理资源引用..." : p < 65 ? "恢复画布素材..." : p < 80 ? "同步元数据..." : "应用到画布..." : o.message;
    return c.jsx(c.Fragment, {
      children: u && c.jsxs("div", {
        "data-project-opening": t ? "dark" : "light",
        className: "flex h-fit w-[300px] max-w-full flex-col gap-2 px-4 py-3",
        style: {
          pointerEvents: "none"
        },
        children: [c.jsxs("div", {
          className: "w-full flex items-center justify-between",
          children: [c.jsx("span", {
            className: `text-[10px] font-mono tracking-wider uppercase ${t ? "text-zinc-400" : "text-white/90"}`,
            children: x(h)
          }), c.jsxs("span", {
            className: `text-[10px] font-semibold tabular-nums ${t ? "text-zinc-300" : "text-white"}`,
            children: [p, "%"]
          })]
        }), c.jsx("div", {
          className: `w-full h-1.5 rounded-full overflow-hidden ${t ? "bg-zinc-800" : "bg-white/30"}`,
          children: c.jsx("div", {
            className: `h-full rounded-full transition-all duration-300 ease-out ${t ? r ? "bg-gradient-to-r from-violet-400 to-cyan-400" : "bg-white/90" : "bg-white"}`,
            style: {
              width: `${p}%`
            }
          })
        }), !s && m && c.jsx("span", {
          className: `text-[11px] truncate w-full text-center ${t ? "text-zinc-500" : "text-white/80"}`,
          children: x(m)
        })]
      })
    });
  }),
  f6i = Ia.memo(function ({
    isDark: t,
    ioProgressSource: n,
    projectSaving: r,
    projectLoading: a,
    projectReceipt: i,
    projectProgressStore: o
  }) {
    return c.jsxs(c.Fragment, {
      children: [c.jsx(g6i, {
        isDark: t,
        source: n
      }), c.jsx(m6i, {
        isDark: t,
        projectSaving: r,
        projectLoading: a,
        receipt: i,
        progressStore: o
      })]
    });
  });

function g6i({
  isDark: e,
  source: t
}) {
  const n = g.useSyncExternalStore(t.subscribe, t.getSnapshot, t.getSnapshot);
  return c.jsx(l1t, {
    visible: n.visible,
    progress: n.progress,
    status: n.status,
    type: n.type,
    isDark: e
  });
}

const y6i = "focus-edit-banner",
  b6i = 48;

function v6i({
  onExit: e,
  isDark: t,
  chatApiConfigs: n,
  modelId: r,
  platformGroup: a,
  onModelIdChange: i,
  onPlatformGroupChange: o,
  zoneLeftPx: s,
  zoneRightPx: l
}) {
  on();
  const [d, u] = g.useState(null),
    h = g.useMemo(() => n.filter(S => S.type === "Chat"), [n]),
    p = g.useMemo(() => h.find(S => S.id === r) || h[0], [h, r]),
    m = (p == null ? void 0 : p.modelName) || r,
    f = Qa.getGlobalBaseUrl(),
    y = g.useMemo(() => !!p && od(p, f), [p, f]);
  if (s == null || l == null || l - s < b6i) return null;
  const b = (s + l) / 2,
    v = l - s,
    _ = t ? "text-cyan-300" : "text-cyan-700",
    w = t ? "text-zinc-500" : "text-zinc-400",
    k = t ? "text-zinc-400" : "text-zinc-500",
    A = t ? "text-zinc-300 hover:text-white" : "text-zinc-600 hover:text-zinc-900";
  return c.jsx("div", {
    className: "pointer-events-none fixed top-[12px] z-[10000] flex select-none items-center justify-center text-sm transition-[left,max-width] duration-300",
    style: {
      left: b,
      transform: "translateX(-50%)",
      maxWidth: v
    },
    "data-focus-edit-mode-banner": "",
    children: c.jsxs("div", {
      className: "pointer-events-auto flex min-w-0 max-w-full items-center gap-2",
      children: [c.jsx("span", {
        className: `shrink-0 font-bold ${_}`,
        children: x("焦点编辑")
      }), c.jsx("span", {
        className: `shrink-0 font-bold ${w}`,
        children: "|"
      }), c.jsx("span", {
        className: `hidden shrink-0 text-[10px] font-normal sm:inline ${k}`,
        children: x("分析模型")
      }), c.jsx(Th, {
        scopeId: y6i,
        dropdownType: "focus-edit-chat-model",
        value: r,
        models: h,
        isDark: t,
        activeDropdown: d,
        setActiveDropdown: u,
        onSelect: i,
        className: "w-[min(140px,28vw)] shrink",
        menuMaxHeight: 280,
        buttonVariant: "transparent"
      }), y ? c.jsxs(c.Fragment, {
        children: [c.jsx("span", {
          className: `shrink-0 text-[10px] font-normal ${k}`,
          children: "Key"
        }), c.jsx(Ku, {
          platformGroup: a,
          modelName: m,
          modelId: r,
          modelConfigId: p == null ? void 0 : p.id,
          isDark: t,
          onGroupChange: o,
          compact: !0,
          buttonVariant: "square",
          className: "shrink-0",
          menuPlacement: "below",
          showModelKeyOption: !0
        })]
      }) : null, c.jsx("span", {
        className: `shrink-0 font-bold ${w}`,
        children: "|"
      }), c.jsx("button", {
        type: "button",
        onClick: e,
        className: `shrink-0 border-0 bg-transparent p-0 text-xs font-bold underline-offset-2 hover:underline ${A}`,
        children: x("退出")
      })]
    })
  });
}

function w6i(e, t, n) {
  const r = t ? "px-1.5 py-0.5" : "px-2 py-1";
  return n != null && n.disabled ? `flex items-center gap-1 ${r} rounded-lg text-xs font-medium transition-colors relative overflow-hidden ${e ? "bg-blue-600/30 text-blue-300 cursor-wait" : "bg-blue-100 text-blue-700 cursor-wait"}` : n != null && n.active ? `flex items-center gap-1 ${r} rounded-lg text-xs font-medium cursor-pointer transition-colors ${e ? "text-zinc-200 bg-zinc-800/70" : "text-zinc-800 bg-zinc-200/70"}` : `flex items-center gap-1 ${r} rounded-lg text-xs font-medium transition-colors ${e ? "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-600 hover:text-zinc-800 hover:bg-zinc-900/[0.04]"}`;
}

const e$e = {
    PLATFORM_SYSTEM_TOKEN: "qiaodoumayi_platform_system_token",
    PLATFORM_USER_ID: "qiaodoumayi_platform_user_id",
    PLATFORM_USER_SELF_CACHE: "qiaodoumayi_platform_user_self_cache"
  },
  nun = "qiaodoumayi_api_task_sent";

async function x6i(e) {
  const {
      baseUrl: t,
      systemToken: n,
      userId: r,
      signal: a
    } = e,
    i = r2e(t),
    o = `${i}/api/user/self`,
    s = {
      Authorization: `Bearer ${n}`,
      "New-API-User": r
    };
  if (typeof window < "u" && !!(window.__LINGO_ELECTRON_NATIVE_SHELL__ && !window.__LINGO_SIDECAR__)) {
    const u = await fetch("/api/platform-proxy/api/user/self", {
      method: "GET",
      headers: {
        ...s,
        "X-Platform-Proxy-Target": i
      },
      signal: a
    });
    if (!u.ok) throw new Error(await u.text());
    return await u.json();
  }
  if (Ple()) {
    const u = await Fr("proxy_fetch", {
      args: {
        url: o,
        method: "GET",
        headers: s,
        timeoutSecs: 60
      }
    });
    try {
      return JSON.parse(u);
    } catch {
      throw new Error("平台API返回非 JSON");
    }
  }
  const d = await fetch(o, {
    method: "GET",
    headers: s,
    signal: a
  });
  if (!d.ok) throw new Error(await d.text());
  return await d.json();
}

function run() {
  try {
    return {
      systemToken: localStorage.getItem(e$e.PLATFORM_SYSTEM_TOKEN) || "",
      userId: localStorage.getItem(e$e.PLATFORM_USER_ID) || ""
    };
  } catch {
    return {
      systemToken: "",
      userId: ""
    };
  }
}

function _6i() {
  try {
    const e = localStorage.getItem(e$e.PLATFORM_USER_SELF_CACHE);
    if (!e) return null;
    const t = JSON.parse(e);
    return t && typeof t == "object" && !Array.isArray(t) ? t : null;
  } catch {
    return null;
  }
}

function k6i(e) {
  try {
    localStorage.setItem(e$e.PLATFORM_USER_SELF_CACHE, JSON.stringify(e));
  } catch {}
}

function A6i(e) {
  return e && (typeof e.avatar_url == "string" && e.avatar_url || typeof e.avatar == "string" && e.avatar || typeof e.image == "string" && e.image || typeof e.picture == "string" && e.picture || null) || null;
}

function S6i(e) {
  return e && (typeof e.name == "string" && e.name || typeof e.username == "string" && e.username || null) || null;
}

function I6i(e) {
  if (typeof e == "number" && Number.isFinite(e)) return e;
  if (typeof e == "string") {
    const t = Number(e.trim());
    if (Number.isFinite(t)) return t;
  }
  return null;
}

function C6i(e) {
  const t = e,
    n = t.data;
  return n && typeof n == "object" && !Array.isArray(n) ? {
    ...t,
    ...n
  } : e;
}

function Shr(e) {
  const t = ["quota", "balance", "credit", "total_credit", "totalCredit", "remain_quota", "remaining_quota", "remainingQuota", "available_quota", "availableQuota"];
  for (const r of t) {
    const a = I6i(e[r]);
    if (a !== null) return a;
  }
  const n = ["data", "result", "user", "credits", "account", "quota_info", "quotaInfo"];
  for (const r of n) {
    const a = e[r];
    if (a && typeof a == "object" && !Array.isArray(a)) {
      const i = Shr(a);
      if (i !== null) return i;
    }
  }
  return null;
}

function E6i() {
  const {
      globalBaseUrl: e
    } = lcr(),
    [t, n] = g.useState(() => run()),
    [r, a] = g.useState(!1),
    [i, o] = g.useState(null),
    [s, l] = g.useState(() => _6i()),
    d = g.useMemo(() => {
      const f = (e || "").trim().replace(/\/+$/, "");
      return r2e(f || "");
    }, [e]),
    u = g.useRef(null),
    h = g.useRef(0);
  g.useEffect(() => {
    const f = () => {
      n(run());
    };
    return window.addEventListener("storage", f), window.addEventListener("qiaodoumayi_platform_auth_changed", f), () => {
      window.removeEventListener("storage", f), window.removeEventListener("qiaodoumayi_platform_auth_changed", f);
    };
  }, []);
  const p = g.useCallback(async () => {
    var y;
    if (!t.systemToken || !t.userId) return;
    (y = u.current) == null || y.abort();
    const f = new AbortController();
    u.current = f, a(!0), o(null);
    try {
      if (!t.userId) throw new Error("请在设置中填写用户 ID（New-API-User）");
      const b = C6i(await x6i({
        baseUrl: d,
        systemToken: t.systemToken,
        userId: t.userId,
        signal: f.signal
      }));
      l(b), k6i(b);
    } catch (b) {
      if (b instanceof DOMException && b.name === "AbortError") return;
      const v = b instanceof Error ? b.message : String(b),
        _ = n2e(v, "获取用户信息失败");
      o(_.startsWith("获取用户信息失败") ? _ : `获取用户信息失败：${_}`);
    } finally {
      a(!1);
    }
  }, [t.systemToken, t.userId, d]);
  g.useEffect(() => {
    if (!t.systemToken || !t.userId) {
      l(null), o(null), a(!1);
      return;
    }
    p();
  }, [t.systemToken, t.userId, d, p]), g.useEffect(() => {
    const f = () => {
      if (!t.systemToken || !t.userId) return;
      const y = Date.now();
      y - h.current < 1500 || (h.current = y, p());
    };
    return window.addEventListener(nun, f), () => {
      var y;
      window.removeEventListener(nun, f), (y = u.current) == null || y.abort();
    };
  }, [t.systemToken, t.userId, d, p]);
  const m = g.useMemo(() => s ? Shr(s) : null, [s]);
  return {
    loading: r,
    error: i,
    balance: m,
    avatarUrl: A6i(s),
    displayName: S6i(s),
    systemTokenPresent: !!t.systemToken,
    userIdPresent: !!t.userId
  };
}

function T6i(e) {
  return e > 1e6 ? e / 5e5 : e;
}

function M6i(e) {
  const t = T6i(e);
  return t < 1e4 ? t.toFixed(2) : Number.isFinite(t) ? t >= 1e6 ? `${(t / 1e6).toFixed(2)}M` : t >= 1e4 ? `${(t / 1e4).toFixed(2)}W` : Number.isFinite(e) ? t.toFixed(2) : "--" : "--";
}

const P6i = g.forwardRef(function ({
    isDark: t,
    compact: n = !1,
    onClick: r
  }, a) {
    const [i, o] = g.useState(() => n1t()),
      {
        loading: s,
        error: l,
        balance: d,
        displayName: u,
        systemTokenPresent: h,
        userIdPresent: p
      } = E6i();
    if (g.useEffect(() => {
      const y = () => o(n1t());
      return window.addEventListener(pze, y), () => window.removeEventListener(pze, y);
    }, []), i || !h || !p) return null;
    const m = typeof d == "number" ? M6i(d) : "--",
      f = l || (u ? `${u} · 余额=${d ?? "--"}` : `余额=${d ?? "--"}`);
    return c.jsxs("button", {
      ref: a,
      type: "button",
      onClick: y => {
        y.preventDefault(), y.stopPropagation(), r == null || r();
      },
      className: `flex items-center gap-1 ${n ? "px-1.5 py-0.5" : "px-2 py-1"} rounded-lg text-xs font-medium transition-colors border-0 bg-transparent ${t ? "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-600 hover:text-zinc-800 hover:bg-zinc-900/[0.04]"}`,
      title: f,
      children: [c.jsx(fZ, {
        size: 14,
        strokeWidth: 2,
        className: "shrink-0"
      }), c.jsx("span", {
        className: `tabular-nums ${s ? "opacity-70" : ""}`,
        children: m
      }), s && c.jsx(vEt, {
        size: 12,
        className: "opacity-60 animate-spin"
      })]
    });
  }),
  R6i = g.memo(P6i),
  N6i = 15,
  j6i = 1.75,
  D6i = ({
    isDark: e,
    compact: t = !1,
    className: n = "",
    style: r,
    isDownloading: a,
    downloadProgress: i,
    onDownloadSelected: o,
    showCanvasGrid: s = !0,
    onCanvasGridToggle: l,
    canvasGridSpacing: d = tce,
    onCanvasGridSpacingChange: u,
    canvasGridDotSize: h = BLe,
    onCanvasGridDotSizeChange: p,
    showCanvasSnap: m = !1,
    onCanvasSnapToggle: f,
    followDownstreamOnDrag: y = !1,
    onFollowDownstreamOnDragToggle: b,
    showCanvasMinimap: v = !0,
    onCanvasMinimapToggle: _,
    showAllCanvasConnections: w = !1,
    onShowAllCanvasConnectionsToggle: k,
    connectionHitWidth: A = 16,
    onConnectionHitWidthChange: S,
    hideAllInputImagePreviews: C = !1,
    onHideAllInputImagePreviewsToggle: I,
    showAlignmentGuides: E = !0,
    onAlignmentGuidesToggle: M,
    locateAnimationMaxNodes: T = 100,
    onLocateAnimationMaxNodesChange: P,
    showCanvasBgGlow: R = !1,
    onCanvasBgGlowToggle: j,
    showNodeDeleteButton: B = !0,
    onNodeDeleteButtonToggle: F,
    showStartGenerateButton: N = !0,
    onStartGenerateButtonToggle: G,
    onClearCanvas: z,
    enableConnectWireTilt: V = !0,
    onEnableConnectWireTiltToggle: O,
    enableConnectWireMarquee: L = !0,
    onEnableConnectWireMarqueeToggle: D,
    enableGenerationConnectionFlow: U = !0,
    onEnableGenerationConnectionFlowToggle: H,
    generationConnectionFlowMode: Y = "default",
    onGenerationConnectionFlowModeChange: K,
    enableGenerationNodeAnimation: W = !0,
    onEnableGenerationNodeAnimationToggle: Q,
    generationNodeAnimationMode: q = "default",
    onGenerationNodeAnimationModeChange: ne,
    showCanvasGenerationTimer: de = !0,
    onCanvasGenerationTimerToggle: le,
    connectionLineStrokeWidth: J = .75,
    onConnectionLineStrokeWidthChange: pe,
    connectionLineOpacityPercent: ce = 100,
    onConnectionLineOpacityPercentChange: we,
    connectionLineColor: X,
    onConnectionLineColorChange: Z,
    onOpenSettings: re,
    balanceBadgeRef: fe,
    rightActionsRef: ye
  }) => {
    on();
    const ie = n8a(),
      ae = Oy();
    return c.jsxs("div", {
      ref: ye,
      className: `flex flex-row items-center top-navbar-fast-tooltip ${e ? "top-navbar-fast-tooltip--dark" : "top-navbar-fast-tooltip--light"} ${t ? "gap-1" : "gap-1.5"} ${n}`,
      style: r,
      children: [c.jsx(R6i, {
        ref: fe,
        isDark: e,
        compact: t,
        onClick: re
      }), c.jsxs("button", {
        onClick: () => o == null ? void 0 : o(),
        disabled: a,
        className: w6i(e, t, {
          disabled: a
        }),
        children: [a && i && i.total > 0 && c.jsx("div", {
          className: "absolute left-0 top-0 bottom-0 bg-blue-500/30 transition-all duration-300 rounded-lg",
          style: {
            width: `${i.current / i.total * 100}%`
          }
        }), c.jsx(ws, {
          size: N6i,
          strokeWidth: j6i,
          className: `shrink-0 ${a ? "animate-pulse" : ""}`
        }), c.jsx("span", {
          className: "relative z-10",
          children: x("下载")
        })]
      }), ie && Da.createPortal(c.jsx(Zf, {
        show: !0,
        fallback: c.jsx("div", {
          className: "settings-pref-desc",
          children: x("正在加载画布功能…")
        }),
        children: c.jsx(qLr, {
          embedded: !0,
          isDark: zX() ? ae.isDark : e,
          onClose: CEt,
          showAllCanvasConnections: w,
          onShowAllCanvasConnectionsToggle: k,
          enableConnectWireTilt: V,
          onEnableConnectWireTiltToggle: O,
          enableConnectWireMarquee: L,
          onEnableConnectWireMarqueeToggle: D,
          enableGenerationConnectionFlow: U,
          onEnableGenerationConnectionFlowToggle: H,
          generationConnectionFlowMode: Y,
          onGenerationConnectionFlowModeChange: K,
          connectionLineStrokeWidth: J,
          onConnectionLineStrokeWidthChange: pe,
          connectionLineOpacityPercent: ce,
          onConnectionLineOpacityPercentChange: we,
          connectionLineColor: X,
          onConnectionLineColorChange: Z,
          connectionHitWidth: A,
          onConnectionHitWidthChange: S,
          followDownstreamOnDrag: y,
          onFollowDownstreamOnDragToggle: b,
          showCanvasGrid: s,
          onCanvasGridToggle: l,
          showCanvasSnap: m,
          onCanvasSnapToggle: f,
          showCanvasMinimap: v,
          onCanvasMinimapToggle: _,
          canvasGridSpacing: d,
          onCanvasGridSpacingChange: u,
          canvasGridDotSize: h,
          onCanvasGridDotSizeChange: p,
          showAlignmentGuides: E,
          onAlignmentGuidesToggle: M,
          locateAnimationMaxNodes: T,
          onLocateAnimationMaxNodesChange: P,
          showCanvasBgGlow: R,
          onCanvasBgGlowToggle: j,
          showNodeDeleteButton: B,
          onNodeDeleteButtonToggle: F,
          showStartGenerateButton: N,
          onStartGenerateButtonToggle: G,
          showCanvasGenerationTimer: de,
          onCanvasGenerationTimerToggle: le,
          enableGenerationNodeAnimation: W,
          onEnableGenerationNodeAnimationToggle: Q,
          generationNodeAnimationMode: q,
          onGenerationNodeAnimationModeChange: ne,
          hideAllInputImagePreviews: C,
          onHideAllInputImagePreviewsToggle: I,
          onClearCanvas: z
        })
      }), ie)]
    });
  },
  L6i = g.memo(D6i),
  O6i = ({
    projectName: e,
    isEditingProjectName: t,
    isSidebarOpen: n = !1,
    projectNameLeftOffset: r = 256,
    showHelpTrigger: a = !1,
    helpPanelExpanded: i,
    onToggleHelpPanel: o,
    onProjectNameChange: s,
    onEditProjectNameStart: l,
    onEditProjectNameEnd: d,
    projectNameInputRef: u,
    showNewProjectSaveHint: h = !1,
    leftToolbarDock: p = "side",
    onLeftToolbarDockChange: m,
    chatSidebarInsetRight: f,
    focusEditBanner: y = null,
    projects: b = [],
    currentProjectId: v = null,
    projectListLoading: _ = !1,
    onRefreshProjectList: w,
    onOpenProjectFromSwitcher: k,
    onCreateNewCanvasFromSwitcher: A,
    ...S
  }) => {
    on();
    const C = Sdi(),
      I = qQe(),
      E = (C == null ? void 0 : C.onLeftToolbarDockChange) ?? m,
      M = S5e(),
      T = ZIe(),
      P = n || T,
      [R, j] = g.useState(!1),
      B = g.useRef(null),
      F = g.useRef(null),
      N = g.useRef(null),
      G = g.useRef(null),
      z = g.useRef(null),
      [V, O] = g.useState(null),
      L = g.useCallback(() => {
        const U = N.current,
          H = G.current ?? z.current;
        if (!U || !H) return !1;
        const Y = U.getBoundingClientRect().right,
          K = H.getBoundingClientRect().left;
        return K - Y < 48 ? !1 : (O(W => (W == null ? void 0 : W.left) === Y && (W == null ? void 0 : W.right) === K ? W : {
          left: Y,
          right: K
        }), !0);
      }, [I]);
    g.useLayoutEffect(() => {
      L();
      const U = requestAnimationFrame(() => {
          L() || requestAnimationFrame(() => {
            L();
          });
        }),
        H = [F.current, N.current, G.current, z.current].filter(Boolean),
        Y = new ResizeObserver(() => L());
      H.forEach(Q => Y.observe(Q));
      const K = () => L();
      window.addEventListener("resize", K);
      const W = Q => {
        (Q.propertyName === "left" || Q.propertyName === "right" || Q.propertyName === "transform") && L();
      };
      return document.addEventListener("transitionend", W), () => {
        cancelAnimationFrame(U), Y.disconnect(), window.removeEventListener("resize", K), document.removeEventListener("transitionend", W);
      };
    }, [L, f, n, r, I]), g.useEffect(() => {
      if (!R) return;
      const U = H => {
        B.current && !B.current.contains(H.target) && j(!1);
      };
      return document.addEventListener("mousedown", U, !0), () => document.removeEventListener("mousedown", U, !0);
    }, [R]);
    const D = M || f != null;
    return c.jsxs("div", {
      ref: F,
      "data-canvas-top-navbar": "",
      className: `absolute top-0 left-0 right-0 h-14 flex items-center justify-between z-[60] pointer-events-none ${S.isDark ? "shadow-none" : ""}`,
      children: [c.jsx("div", {
        "data-canvas-workspace-switcher": "",
        className: "absolute pointer-events-auto",
        style: {
          left: P ? r : 16
        },
        children: c.jsxs("div", {
          className: "relative flex items-center gap-2",
          ref: B,
          children: [c.jsx(R7t, {
            isDark: S.isDark,
            switcherRef: N,
            onCanvasClick: () => {
              if (I !== "canvas") {
                dGn() ? uGn() : YBe();
                return;
              }
              E && j(U => !U);
            },
            onCanvasContextMenu: U => {
              E && (U.preventDefault(), U.stopPropagation(), j(!0));
            }
          }), R && E && c.jsxs("div", {
            role: "menu",
            className: `absolute top-full left-0 mt-1.5 min-w-[176px] py-1.5 rounded-xl border shadow-none z-[70] ${S.isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
            children: [c.jsx("div", {
              className: `px-3 pb-1 pt-0.5 text-[10px] font-medium ${S.isDark ? "text-white/35" : "text-zinc-400"}`,
              children: x("工具栏布局")
            }), c.jsx("button", {
              type: "button",
              role: "menuitem",
              className: `w-full text-left px-3 py-2 text-xs transition-colors ${p === "side" ? S.isDark ? "bg-zinc-800 text-zinc-100" : "bg-zinc-100 text-zinc-900" : S.isDark ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`,
              onClick: U => {
                U.preventDefault(), U.stopPropagation(), E("side"), j(!1);
              },
              children: x("侧边显示")
            }), c.jsx("button", {
              type: "button",
              role: "menuitem",
              className: `w-full text-left px-3 py-2 text-xs transition-colors ${p === "bottom" ? S.isDark ? "bg-zinc-800 text-zinc-100" : "bg-zinc-100 text-zinc-900" : S.isDark ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`,
              onClick: U => {
                U.preventDefault(), U.stopPropagation(), E("bottom"), j(!1);
              },
              children: x("底部显示")
            })]
          })]
        })
      }), c.jsx(L6i, {
        ...S,
        ...(C ? {
          onOpenSettings: C.onOpenSettings,
          onOpenConsole: C.onOpenConsole,
          onOpenStorageManage: C.onOpenStorageManage,
          onDownloadSelected: C.onDownloadSelected,
          onCanvasGridToggle: C.onCanvasGridToggle,
          onCanvasGridSpacingChange: C.onCanvasGridSpacingChange,
          onCanvasGridDotSizeChange: C.onCanvasGridDotSizeChange,
          onCanvasSnapToggle: C.onCanvasSnapToggle,
          onFollowDownstreamOnDragToggle: C.onFollowDownstreamOnDragToggle,
          onCanvasMinimapToggle: C.onCanvasMinimapToggle,
          onShowAllCanvasConnectionsToggle: C.onShowAllCanvasConnectionsToggle,
          onConnectionHitWidthChange: C.onConnectionHitWidthChange,
          onHideAllInputImagePreviewsToggle: C.onHideAllInputImagePreviewsToggle,
          onAlignmentGuidesToggle: C.onAlignmentGuidesToggle,
          onLocateAnimationMaxNodesChange: C.onLocateAnimationMaxNodesChange,
          onCanvasBgGlowToggle: C.onCanvasBgGlowToggle,
          onNodeDeleteButtonToggle: C.onNodeDeleteButtonToggle,
          onStartGenerateButtonToggle: C.onStartGenerateButtonToggle,
          onClearCanvas: C.onClearCanvas,
          onEnableConnectWireTiltToggle: C.onEnableConnectWireTiltToggle,
          onEnableConnectWireMarqueeToggle: C.onEnableConnectWireMarqueeToggle,
          onEnableGenerationConnectionFlowToggle: C.onEnableGenerationConnectionFlowToggle,
          onGenerationConnectionFlowModeChange: C.onGenerationConnectionFlowModeChange,
          onEnableGenerationNodeAnimationToggle: C.onEnableGenerationNodeAnimationToggle,
          onGenerationNodeAnimationModeChange: C.onGenerationNodeAnimationModeChange,
          onCanvasGenerationTimerToggle: C.onCanvasGenerationTimerToggle,
          onConnectionLineStrokeWidthChange: C.onConnectionLineStrokeWidthChange,
          onConnectionLineOpacityPercentChange: C.onConnectionLineOpacityPercentChange,
          onConnectionLineColorChange: C.onConnectionLineColorChange
        } : {}),
        onOpenSettings: (C == null ? void 0 : C.onOpenSettings) ?? S.onOpenSettings ?? (() => {}),
        compact: D,
        balanceBadgeRef: G,
        rightActionsRef: z,
        className: "top-navbar-chat-aware-actions absolute top-1/2 -translate-y-1/2 pointer-events-auto",
        style: f != null && !M ? {
          right: f + 12
        } : void 0
      }), y && !M && I !== "browser" ? c.jsx(v6i, {
        ...y,
        zoneLeftPx: V == null ? void 0 : V.left,
        zoneRightPx: V == null ? void 0 : V.right
      }) : null]
    });
  },
  B6i = g.memo(O6i),
  Ihr = 280,
  Qkt = 280,
  F6i = 120,
  z6i = 6,
  Chr = 8,
  U6i = 36,
  $6i = 80,
  G6i = [".left-toolbar-dock-side", '[data-canvas-bottom-left-dock="true"]'].join(","),
  V6i = (e, t, n) => Math.min(Math.max(e, t), Math.max(t, n));

function H6i(e, t, n, r = Chr) {
  let a = Math.max(0, t - r);
  const i = e.left + e.width;
  for (const o of n) o.width <= 0 || o.height <= 0 || o.right <= e.left || o.left >= i || o.top <= e.top + 4 || (a = Math.min(a, o.top - r));
  return a;
}

function W6i(e = document) {
  return Array.from(e.querySelectorAll(G6i)).map(t => t.getBoundingClientRect());
}

function q6i({
  menuTop: e,
  menuLeft: t,
  menuWidth: n = Ihr,
  viewportHeight: r,
  obstacles: a = [],
  preferredMax: i = Qkt,
  chromeHeight: o = F6i,
  margin: s = Chr,
  minHeight: l = $6i
}) {
  const d = H6i({
      left: t,
      top: e,
      width: n
    }, r, a, s),
    u = Math.max(0, r - s),
    h = d - e - o,
    m = d < u ? Math.max(i, h) : i;
  return V6i(h, l, m);
}

function K6i(e) {
  if (!e || !Number.isFinite(e)) return "";
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "";
  const n = new Date();
  if (t.toDateString() === n.toDateString()) return t.toLocaleTimeString(ew(), {
    hour: "2-digit",
    minute: "2-digit"
  });
  const r = String(t.getMonth() + 1).padStart(2, "0"),
    a = String(t.getDate()).padStart(2, "0");
  return t.getFullYear() === n.getFullYear() ? `${r}/${a}` : `${t.getFullYear()}/${r}/${a}`;
}

const Q6i = g.memo(function ({
    project: t,
    active: n,
    disabled: r = !1,
    isDark: a,
    onOpen: i
  }) {
    on();
    const o = PT(),
      s = a ? "text-white/90" : "text-zinc-800",
      l = a ? "text-white/35" : "text-zinc-400",
      d = a ? "hover:bg-white/[0.06]" : "hover:bg-zinc-50",
      u = K6i(t.updatedAt);
    return c.jsxs("button", {
      type: "button",
      role: "menuitem",
      disabled: r,
      onPointerDown: h => {
        h.button === 0 && (h.preventDefault(), h.stopPropagation(), i(t));
      },
      onClick: h => {
        h.preventDefault(), h.stopPropagation(), h.detail === 0 && i(t);
      },
      className: `flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors duration-75 ${d} ${n ? a ? "bg-white/[0.08]" : "bg-zinc-100" : ""} disabled:opacity-50`,
      children: [c.jsx(_h, {
        size: 15,
        className: `shrink-0 ${n ? s : l}`
      }), c.jsx("span", {
        className: `min-w-0 flex-1 truncate text-xs font-medium ${s}`,
        children: wp(FHe(t.name), o)
      }), u ? c.jsx("span", {
        className: `shrink-0 tabular-nums text-[11px] ${l}`,
        title: x("最后操作"),
        children: u
      }) : null, n && c.jsx(io, {
        size: 14,
        strokeWidth: 2.25,
        className: `shrink-0 ${a ? "text-white" : s}`
      })]
    });
  }),
  Y6i = ({
    isDark: e,
    projectName: t,
    projects: n,
    currentProjectId: r,
    isLoading: a = !1,
    projectNameRef: i,
    onRefreshList: o,
    onOpenProject: s,
    onCreateNew: l,
    onRenameStart: d
  }) => {
    on();
    const u = PT(),
      [h, p] = g.useState(!1),
      [m, f] = g.useState(!1),
      [y, b] = g.useState(""),
      [v, _] = g.useState(Qkt),
      [w, k] = g.useState({
        top: 0,
        left: 0
      }),
      A = g.useRef(null),
      S = g.useRef(null),
      C = g.useRef(null),
      I = g.useRef(!1),
      E = g.useRef(r);
    E.current = r;
    const M = g.useCallback(() => {
        const U = S.current;
        if (!U) return;
        const H = U.getBoundingClientRect(),
          Y = H.bottom + z6i,
          K = H.left - U6i;
        k({
          top: Y,
          left: K
        }), _(q6i({
          menuTop: Y,
          menuLeft: K,
          menuWidth: Ihr,
          viewportHeight: window.innerHeight,
          obstacles: W6i()
        }));
      }, []),
      T = wp(FHe(t || "", "未命名项目"), u),
      P = g.useMemo(() => {
        const U = y.trim().toLowerCase();
        return U ? n.filter(H => (H.name || "").toLowerCase().includes(U)) : n;
      }, [n, y]);
    g.useEffect(() => {
      if (!h) {
        f(!1), b(""), _(Qkt);
        return;
      }
      const U = requestAnimationFrame(() => {
          f(!0);
        }),
        H = () => {
          g.startTransition(() => {
            o();
          });
        };
      let Y, K;
      return typeof window.requestIdleCallback == "function" ? Y = window.requestIdleCallback(H, {
        timeout: 400
      }) : K = window.setTimeout(H, 0), () => {
        cancelAnimationFrame(U), Y != null && typeof window.cancelIdleCallback == "function" && window.cancelIdleCallback(Y), K != null && window.clearTimeout(K);
      };
    }, [h, o]), g.useLayoutEffect(() => {
      var K;
      if (!h) return;
      M();
      const U = () => M();
      window.addEventListener("resize", U), (K = window.visualViewport) == null || K.addEventListener("resize", U);
      const H = document.querySelectorAll('.left-toolbar-dock-side, [data-canvas-bottom-left-dock="true"]'),
        Y = H.length ? new ResizeObserver(U) : null;
      return H.forEach(W => Y == null ? void 0 : Y.observe(W)), () => {
        var W;
        window.removeEventListener("resize", U), (W = window.visualViewport) == null || W.removeEventListener("resize", U), Y == null || Y.disconnect();
      };
    }, [h, M]), g.useEffect(() => {
      if (!h) return;
      const U = H => {
        var K, W;
        const Y = H.target;
        (K = A.current) != null && K.contains(Y) || (W = C.current) != null && W.contains(Y) || p(!1);
      };
      return document.addEventListener("mousedown", U, !0), () => document.removeEventListener("mousedown", U, !0);
    }, [h]);
    const R = g.useCallback(() => p(!1), []),
      j = g.useCallback(U => {
        if (U.preventDefault(), U.stopPropagation(), I.current) {
          I.current = !1;
          return;
        }
        p(H => !H);
      }, []),
      B = g.useCallback(U => {
        U.preventDefault(), U.stopPropagation(), I.current = !0, p(!1), d();
      }, [d]),
      F = g.useCallback(U => {
        U.id !== E.current && s(U.id, U.name), R();
      }, [R, s]),
      N = g.useCallback(U => {
        U.preventDefault(), U.stopPropagation(), R(), l();
      }, [R, l]),
      G = e ? "border-white/[0.06] bg-[#212121] text-white shadow-none" : "border-black/18 bg-white text-zinc-900 shadow-none",
      z = e ? "text-white/90" : "text-zinc-800",
      V = e ? "text-white/35" : "text-zinc-400",
      O = e ? "border-white/[0.06] bg-[#2c2c2c] text-white/90 placeholder:text-white/30" : "border-zinc-200 bg-zinc-50 text-zinc-800 placeholder:text-zinc-400",
      L = e ? "border-white/[0.08]" : "border-zinc-100",
      D = e ? "hover:bg-white/[0.06]" : "hover:bg-zinc-50";
    return c.jsxs("div", {
      className: "relative min-w-0",
      ref: A,
      children: [c.jsxs("button", {
        ref: S,
        type: "button",
        onClick: j,
        onDoubleClick: B,
        className: `group flex max-w-[220px] items-center gap-1 rounded-md px-1 py-0.5 text-sm transition-colors duration-75 ${e ? "text-white/55 hover:bg-white/[0.06] hover:text-white/90" : "text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-800"}`,
        title: x("点击切换项目；双击重命名"),
        "aria-expanded": h,
        "aria-haspopup": "menu",
        children: [c.jsx("span", {
          ref: i,
          className: "truncate",
          children: T
        }), c.jsx(Mi, {
          size: 14,
          strokeWidth: 2,
          className: `shrink-0 opacity-70 transition-transform duration-150 ease-out ${h ? "rotate-180" : ""}`
        })]
      }), h && typeof document < "u" && Da.createPortal(c.jsxs("div", {
        ref: C,
        role: "menu",
        className: `fixed z-[20000] w-[280px] overflow-hidden rounded-2xl border will-change-transform ${G} ${m ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`,
        style: {
          top: w.top,
          left: w.left,
          transition: "opacity 120ms ease-out, transform 120ms ease-out"
        },
        onMouseDown: U => U.stopPropagation(),
        onPointerDown: U => U.stopPropagation(),
        onClick: U => U.stopPropagation(),
        children: [c.jsx("div", {
          className: "p-2.5 pb-2",
          children: c.jsxs("label", {
            className: `flex items-center gap-2 rounded-xl border px-2.5 py-2 ${O}`,
            children: [c.jsx(mc, {
              size: 14,
              className: `shrink-0 ${V}`
            }), c.jsx("input", {
              type: u ? "password" : "search",
              value: y,
              onChange: U => b(U.target.value),
              placeholder: x("搜索画布"),
              className: "min-w-0 flex-1 bg-transparent text-xs outline-none"
            })]
          })
        }), c.jsx("div", {
          className: "rh-scroll-minimal overflow-y-auto px-1.5 pb-1.5 contain-content",
          style: {
            maxHeight: v
          },
          children: P.length === 0 ? c.jsx("div", {
            className: `px-3 py-6 text-center text-xs ${V}`,
            children: a ? x("加载中…") : y.trim() ? x("未找到匹配画布") : x("暂无最近项目")
          }) : P.map(U => c.jsx(Q6i, {
            project: U,
            active: U.id === r,
            isDark: e,
            onOpen: F
          }, U.id))
        }), c.jsx("div", {
          className: `border-t ${L} p-1.5`,
          children: c.jsxs("button", {
            type: "button",
            role: "menuitem",
            onClick: N,
            className: `flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-xs font-medium transition-colors duration-75 ${D} ${z}`,
            children: [c.jsx(eo, {
              size: 15,
              strokeWidth: 2.25,
              className: "shrink-0"
            }), c.jsx("span", {
              children: x("新建画布")
            })]
          })
        })]
      }), document.body)]
    });
  };

g.memo(Y6i);

function X6i(e) {
  const t = ZIe(),
    {
      onClose: n,
      ...r
    } = e;
  g.useEffect(() => {
    iOr(), n6n();
  }, []);
  const a = n ?? qHn;
  return c.jsx(Zf, {
    show: t,
    fallback: c.jsx(LLr, {
      isDark: r.isDark,
      onClose: a
    }),
    children: c.jsx(aOr, {
      ...r,
      isOpen: t,
      onClose: a
    })
  });
}

const J6i = g.memo(X6i),
  Z6i = g.memo(function (t) {
    const n = slr();
    return c.jsx(Zf, {
      show: n,
      children: c.jsx(sOr, {
        ...t,
        isOpen: n,
        onClose: Shi
      })
    });
  });

let coe = null,
  doe = null;

function eMi(e) {
  return coe = e.openMaterial, doe = e.closeRoles, () => {
    coe === e.openMaterial && (coe = null), doe === e.closeRoles && (doe = null);
  };
}

function tMi() {
  doe == null || doe(), coe == null || coe();
}

