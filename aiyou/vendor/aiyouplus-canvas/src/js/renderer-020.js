function nMi(e) {
  return g.useEffect(() => eMi({
    openMaterial: () => e.setOpen(!0),
    closeRoles: () => e.setRolesOpen(!1)
  }), [e.setOpen, e.setRolesOpen]), c.jsx(Zf, {
    show: e.open,
    children: c.jsx(rMi, {
      ...e
    })
  });
}

function rMi({
  open: e,
  isDark: t,
  library: n,
  setOpen: r,
  setRolesOpen: a,
  refresh: i,
  insert: o,
  insertMany: s
}) {
  const {
    selectedFolderPath: l,
    loading: d,
    error: u
  } = Wdr(n.directoryState);
  return c.jsx(oOr, {
    open: e,
    isDark: t,
    rootPath: n.rootPath,
    tree: n.tree,
    loading: d,
    error: u,
    selectedFolderPath: l,
    allFolders: n.allFolders,
    onClose: () => r(!1),
    onSelectFolder: n.setSelectedFolderPath,
    onChooseRoot: n.chooseRoot,
    onRefresh: i,
    onCreateFolder: n.createFolder,
    onRenameFolder: n.renameFolder,
    onMoveFolder: n.moveFolder,
    onDuplicateFolder: n.duplicateFolder,
    onDeleteFolder: n.deleteFolder,
    onRenameAsset: n.renameAsset,
    onMoveAsset: n.moveAsset,
    onDuplicateAsset: n.duplicateAsset,
    onDeleteAsset: n.deleteAsset,
    getPreviewUrl: n.getPreviewUrl,
    getPreviewFallbackUrl: n.getPreviewFallbackUrl,
    onInvalidateAssetPreview: n.clearPreviewFor,
    onImportFiles: n.importFiles,
    onInsertAsset: o,
    onInsertAssets: s,
    onOpenAiRoleLibrary: () => a(!0)
  });
}

function aMi(e) {
  const t = g.useContext(nCe);
  g.useEffect(() => {
    t == null || t.onProjectsChanged();
  }, [e.projects, t == null ? void 0 : t.onProjectsChanged]);
  const n = t == null ? void 0 : t.setUpload,
    r = t == null ? void 0 : t.setCloud,
    {
      actions: a,
      cloud: i
    } = e,
    o = g.useRef(i),
    s = g.useRef(a);
  o.current = i, s.current = a;
  const l = i.cloudProjects.map(d => `${d.id}:${d.updatedAt}:${Number(d.hasLocal)}`).join(",");
  return g.useEffect(() => {
    n == null || n({
      upload: d => s.current.upload(d),
      busy: i.ossBusy,
      available: i.uploadAvailable ?? i.ossAvailable
    });
  }, [n, i.ossBusy, i.ossAvailable, i.uploadAvailable]), g.useEffect(() => () => n == null ? void 0 : n(null), [n]), g.useEffect(() => {
    const d = o.current;
    r == null || r({
      listTab: d.listTab,
      setListTab: u => o.current.setListTab(u),
      cloudProjects: d.cloudProjects,
      cloudListFetched: d.cloudListFetched,
      ossBusy: d.ossBusy,
      ossMessage: d.ossMessage,
      ossProgress: d.ossProgress,
      ossAvailable: d.ossAvailable,
      enabled: d.settings.enabled,
      updateSettings: u => o.current.updateSettings(u),
      refreshCloudList: () => o.current.refreshCloudList(),
      isBackedUpOnOss: u => o.current.isBackedUpOnOss(u),
      download: u => s.current.download(u),
      deleteCloud: u => s.current.deleteCloud(u)
    });
  }, [r, i.listTab, i.cloudListFetched, i.ossBusy, i.ossMessage, i.ossProgress.percent, i.ossProgress.message, i.ossProgress.kind, i.ossProgress.projectId, i.ossAvailable, i.settings.enabled, l]), g.useEffect(() => () => r == null ? void 0 : r(null), [r]), c.jsx(Zf, {
    show: e.open,
    children: c.jsx(iMi, {
      ...e
    })
  });
}

function iMi({
  open: e,
  actions: t,
  cloud: n,
  progressStore: r,
  ...a
}) {
  const i = Ahr(r, a.progress);
  return c.jsx(cOr, {
    ...a,
    progress: i,
    isOpen: !0,
    onClose: t.close,
    onRefreshList: t.refresh,
    onSaveCurrent: t.saveCurrent,
    onSaveAs: t.saveAs,
    onOpen: t.open,
    onInsert: t.insert,
    onDelete: t.deleteLocal,
    ossSettings: n.settings,
    onOssSettingsChange: n.updateSettings,
    listTab: n.listTab,
    onListTabChange: n.setListTab,
    cloudProjects: n.cloudProjects,
    cloudListFetched: n.cloudListFetched,
    ossBusy: n.ossBusy,
    ossMessage: n.ossMessage,
    ossProgress: n.ossProgress,
    ossAvailable: n.ossAvailable,
    onRefreshCloudList: n.refreshCloudList,
    isBackedUpOnOss: n.isBackedUpOnOss,
    onUploadToCloud: t.upload,
    onDownloadFromCloud: t.download,
    onOpenFromCloud: t.openCloud,
    onDeleteFromCloud: t.deleteCloud
  });
}

const oMi = g.memo(function (t) {
    const n = Dke("rh");
    return c.jsx(Zf, {
      show: n,
      children: c.jsx(dOr, {
        ...t,
        isOpen: n,
        onClose: khi
      })
    });
  }),
  sMi = g.memo(function (t) {
    const n = Dke("kling");
    return c.jsx(Zf, {
      show: n,
      children: c.jsx(uOr, {
        ...t,
        isOpen: n,
        onClose: _hi
      })
    });
  }),
  lMi = ["idle", "waving", "jumping", "waiting", "review"],
  cMi = [4, 2, 2, 2, 1],
  dMi = ["running", "waiting", "waving", "jumping", "review"],
  uMi = [3, 3, 2, 2, 1],
  hMi = 1600,
  pMi = 8e3,
  mMi = 280,
  fMi = 1400,
  gMi = 900,
  yMi = 2800;

function Ehr(e = Math.random, t = "idle") {
  const n = t === "hover" ? mMi : t === "busy" ? gMi : hMi,
    r = t === "hover" ? fMi : t === "busy" ? yMi : pMi;
  return n + e() * (r - n);
}

function Thr(e, t, n, r) {
  const a = e.map((l, d) => ({
      id: l,
      weight: t[d]
    })).filter(l => l.id !== n),
    i = a.length ? a : e.map((l, d) => ({
      id: l,
      weight: t[d]
    })),
    o = i.reduce((l, d) => l + d.weight, 0);
  let s = r() * o;
  for (const l of i) if (s -= l.weight, s <= 0) return l.id;
  return i[i.length - 1].id;
}

function bMi(e = null, t = Math.random) {
  return Thr(lMi, cMi, e, t);
}

function vMi(e = null, t = Math.random) {
  return Thr(dMi, uMi, e, t);
}

const wMi = 4,
  aun = 10,
  xMi = 36,
  _Mi = 250,
  kMi = 8;

function AMi(e, t) {
  return Math.abs(e) < aun && Math.abs(t) < aun ? "none" : Math.abs(e) >= Math.abs(t) ? e >= 0 ? "right" : "left" : "none";
}

function Mhr(e) {
  if (e.dragging && e.dragDir === "left") return qI("running-left", !0);
  if (e.dragging && e.dragDir === "right") return qI("running-right", !0);
  if (e.dragging) return qI("running", !0);
  if (e.transient === "jumping") return qI("jumping", !1);
  if (e.transient === "waving") return qI("waving", !1);
  if (e.mood === "thinking" || e.mood === "generating" || e.mood === "waiting") return e.idleAction ? qI(e.idleAction, !1) : qI(e.mood === "waiting" ? "waiting" : "idle", !1);
  if (e.mood === "failed") return qI("failed", !0);
  if (e.mood === "success") return qI("waving", !1);
  if (e.mood === "idle" && e.idleAction) return qI(e.idleAction, !1);
  if (e.hasLookRows && e.lookIndex != null) {
    const t = dba(e.lookIndex);
    return {
      action: "look",
      row: t.row,
      col: t.col,
      frames: 1,
      fps: 1,
      loop: !1,
      lookIndex: e.lookIndex
    };
  }
  return qI("idle", !0);
}

function qI(e, t) {
  const n = IWn(e);
  return {
    action: e,
    row: n.row,
    col: 0,
    frames: n.frames,
    fps: n.fps,
    loop: t
  };
}

function SMi(e, t, n) {
  const r = Math.max(1, t);
  return n ? {
    frame: (e + 1) % r,
    done: !1
  } : e + 1 >= r ? {
    frame: r - 1,
    done: !0
  } : {
    frame: e + 1,
    done: !1
  };
}

function IMi(e, t, n, r) {
  return cba(n - e, r - t, xMi);
}

function Tje(e, t, n, r, a, i, o = 8) {
  return {
    x: Math.min(Math.max(o, e), Math.max(o, a - n - o)),
    y: Math.min(Math.max(o, t), Math.max(o, i - r - o))
  };
}

function CMi(e, t, n, r, a = 88) {
  return Tje(n - e - a, r - t - 88, e, t, n, r);
}

function EMi(e, t, n) {
  const r = e + t + 8;
  return r + 44 <= n ? r : Math.max(8, e - 48);
}

function TMi(e, t, n) {
  const r = e === "small" ? 72 : e === "large" ? 128 : 96,
    a = r / n;
  return {
    width: t * a,
    height: r,
    scale: a
  };
}

function Mst(e) {
  return e === "thinking" ? "正在想…" : e === "generating" ? "正在出图…" : e === "waiting" ? "等你批准一下" : e === "failed" ? "这次没过" : e === "success" ? "做好了" : null;
}

function MMi(e) {
  return e.replace(/^#{1,6}\s+/gm, "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/!?\[([^\]]*)\]\([^)]+\)/g, "$1");
}

function PMi(e, t) {
  const n = MMi(e).trim();
  return t && n.length > 72 ? "生图记录已写入 Agent 聊天。" : n;
}

function RMi(e) {
  var B, F, N, G;
  on();
  const t = WXn(),
    n = jYe(),
    [r, a] = g.useState(!1),
    [i, o] = g.useState(null),
    s = g.useRef(null),
    [l, d] = g.useState(""),
    [u, h] = g.useState(!1),
    p = g.useRef(!1),
    m = g.useRef(null),
    f = g.useRef(!0);
  g.useEffect(() => {
    if (!t.open) return;
    const z = V => {
      var O;
      wRa(V.target) || (O = s.current) != null && O.contains(V.target) || (a(!1), bH());
    };
    return document.addEventListener("pointerdown", z, !0), () => document.removeEventListener("pointerdown", z, !0);
  }, [t.open]);
  const y = g.useRef(null),
    b = kXe(t.open ? e.currentChatId : null),
    v = g.useRef(e.sendingChatSessionIds ?? []),
    _ = g.useRef(new Set()),
    w = `desktop-pet-chat:${e.currentChatId}`,
    k = _7t(w),
    A = e.chatSessions.find(z => z.id === e.currentChatId),
    S = ((A == null ? void 0 : A.messages) ?? []).slice(-30).map(z => (b == null ? void 0 : b.message.id) === z.id ? b.message : z);
  b && !S.some(z => z.id === b.message.id) && S.push(b.message), g.useEffect(() => {
    var V;
    const z = e.sendingChatSessionIds ?? [];
    for (const O of v.current) {
      if (z.includes(O)) continue;
      const L = e.chatSessions.find(Y => Y.id === O),
        D = L == null ? void 0 : L.messages.filter(Y => Y.role === "assistant").slice(-1)[0],
        U = _.current.delete(O);
      if (!n.enabled || !D) continue;
      const H = D.content.startsWith("❌") || ((V = D.toolSteps) == null ? void 0 : V.some(Y => Y.status === "error"));
      U && n.speakReplies && !H && ujt(D.content), n.notifyAgent && n.linkMode === "all" && ((L == null ? void 0 : L.mode) === "agent" || (L == null ? void 0 : L.mode) === "local-skill") && Mve({
        text: H ? "助手执行遇到问题，打开对话查看详情。" : "助手本轮处理已结束，打开对话查看结果。",
        kind: H ? "error" : "success",
        silent: U && n.speakReplies && !H
      });
    }
    v.current = z;
  }, [e.sendingChatSessionIds, e.chatSessions, n]), g.useEffect(() => {
    p.current = !1, h(!1);
  }, [e.isChatSending, e.currentChatId]), g.useEffect(() => {
    var z;
    !t.open || !n.enabled || (a(!1), (z = y.current) == null || z.focus());
  }, [t.open]), g.useEffect(() => {
    t.open && n.enabled && t.voice && wFe(w);
  }, [t.open, t.voice, n.enabled, w]), g.useEffect(() => {
    m.current && f.current && (m.current.scrollTop = m.current.scrollHeight);
  }, [b, A == null ? void 0 : A.messages, t.open]), g.useEffect(() => {
    (!t.open || !n.enabled) && kie();
  }, [t.open, n.enabled]), g.useEffect(() => {
    n.enabled || bH();
  }, [n.enabled]), g.useEffect(() => {
    r || o(null);
  }, [r]);
  const C = g.useMemo(() => {
    const z = e.apiConfigs ?? [],
      V = VU(z.filter(O => !O.type || O.type === "Chat"));
    if (e.chatModel && !V.some(O => O.id === e.chatModel)) {
      const O = z.find(L => L.id === e.chatModel);
      return [...V, O ?? {
        id: e.chatModel,
        modelName: e.chatModel
      }];
    }
    return V;
  }, [e.apiConfigs, e.chatModel]);
  if (!t.open || !n.enabled) return null;
  const I = e.isChatSending || u,
    E = () => {
      if (I || p.current || k.status !== "idle" || !l.trim()) return;
      p.current = !0, f.current = !0, h(!0), _.current.add(e.currentChatId);
      const z = l.trim();
      d(""), kie(), e.onSendChatMessage(z, {
        desktopPet: !0,
        filesOverride: [],
        quotedFromOverride: null
      });
    },
    M = () => {
      bH(), OY();
    },
    T = t.anchor,
    P = T ? Math.max(12, Math.min(window.innerWidth - 342, T.x + T.width / 2 - 165)) : void 0,
    R = T ? EMi(T.y, T.height, window.innerHeight) : void 0,
    j = S.filter(z => z.role === "assistant").slice(-1)[0];
  return c.jsxs("section", {
    ref: s,
    className: "desktop-pet-chat",
    "data-theme": e.isDark ? "dark" : "light",
    "aria-label": x("AIYOU桌面伙伴聊天"),
    style: T ? {
      left: P,
      top: R,
      right: "auto",
      bottom: "auto"
    } : void 0,
    onPointerDown: z => z.stopPropagation(),
    onWheel: z => z.stopPropagation(),
    onKeyDown: z => {
      z.stopPropagation(), z.key === "Escape" && k.status === "idle" && (r ? a(!1) : bH());
    },
    children: [(j || I) && c.jsxs("div", {
      ref: m,
      className: "desktop-pet-chat__reply",
      role: "log",
      "aria-label": x("麻衣的回复"),
      onScroll: z => {
        const V = z.currentTarget;
        f.current = V.scrollHeight - V.scrollTop - V.clientHeight < 12;
      },
      style: T ? T.y > 160 ? {
        position: "fixed",
        left: P,
        top: "auto",
        bottom: window.innerHeight - Math.min(T.y, R ?? T.y) + 10,
        maxHeight: Math.min(106, Math.min(T.y, R ?? T.y) - 24)
      } : {
        top: 54,
        bottom: "auto",
        maxHeight: Math.min(106, Math.max(64, window.innerHeight - (R ?? 0) - 78))
      } : void 0,
      children: [c.jsx("p", {
        children: j != null && j.content ? PMi(j.content, !!((B = j.files) != null && B.length || (F = j.toolSteps) != null && F.length || j.agentPendingStep)) : x("正在思考…")
      }), !!((N = j == null ? void 0 : j.files) != null && N.length || (G = j == null ? void 0 : j.toolSteps) != null && G.length || j != null && j.agentPendingStep) && c.jsx("button", {
        onClick: M,
        children: x("打开 Agent 聊天")
      })]
    }), r && c.jsxs("div", {
      className: "desktop-pet-chat__menu",
      "aria-label": x("桌宠功能菜单"),
      style: R != null && R < 310 ? {
        top: 50,
        bottom: "auto",
        maxHeight: window.innerHeight - R - 66
      } : void 0,
      children: [c.jsx("div", {
        className: "desktop-pet-chat__model",
        role: "group",
        "aria-label": x("桌宠聊天模型"),
        children: c.jsx(Th, {
          scopeId: "desktop-pet-chat",
          dropdownType: "desktop-pet-chat-model",
          value: e.chatModel,
          models: C,
          isDark: e.isDark,
          activeDropdown: i,
          setActiveDropdown: o,
          onSelect: e.onSetChatModel,
          disabled: I,
          scrollToSelected: !1,
          menuPlacement: "auto",
          menuMaxHeight: 260,
          buttonVariant: "bare",
          menuClassName: "sketch-chat-popover",
          leadingIcon: c.jsx(XE, {
            size: 13
          })
        })
      }), c.jsx("button", {
        disabled: I,
        onClick: () => {
          a(!1), wFe(w);
        },
        children: x("语音输入")
      }), c.jsx("button", {
        disabled: I,
        onClick: () => {
          e.onCreateNewChat(), d(""), a(!1);
        },
        children: x("开始新聊天")
      }), c.jsx("button", {
        onClick: () => {
          a(!1), VTn("pet");
        },
        children: x("性格与通知设置")
      }), c.jsx("button", {
        onClick: bH,
        children: x("收起")
      })]
    }), c.jsxs("form", {
      onSubmit: z => {
        z.preventDefault(), E();
      },
      children: [c.jsx("button", {
        type: "button",
        className: "desktop-pet-chat__plus",
        "aria-label": x("桌宠功能"),
        "aria-expanded": r,
        onPointerDown: z => z.stopPropagation(),
        onClick: z => {
          z.stopPropagation(), a(V => !V);
        },
        children: c.jsx(eo, {
          size: 17
        })
      }), c.jsx("textarea", {
        ref: y,
        "aria-label": x("和麻衣聊天"),
        placeholder: x(I ? "正在处理…" : "开始新聊天"),
        rows: 1,
        value: l,
        onChange: z => d(z.target.value),
        onKeyDown: z => {
          z.key === "Enter" && !z.shiftKey && !z.nativeEvent.isComposing && (z.preventDefault(), E());
        }
      }), I ? c.jsx("button", {
        type: "button",
        className: "desktop-pet-chat__send",
        "aria-label": x("停止回复"),
        onClick: () => {
          var z;
          kie(), (z = e.onCancelChatSend) == null || z.call(e);
        },
        children: c.jsx(kf, {
          size: 13
        })
      }) : c.jsx("button", {
        type: "submit",
        className: "desktop-pet-chat__send",
        "aria-label": x("发送给麻衣"),
        disabled: !l.trim() || k.status !== "idle",
        children: c.jsx(Gc, {
          size: 15
        })
      })]
    }), c.jsx("div", {
      className: `desktop-pet-chat__voice${k.status === "idle" ? " desktop-pet-chat__voice--idle" : ""}`,
      children: c.jsx(JIe, {
        nodeId: w,
        value: l,
        onChange: d,
        isDark: e.isDark,
        disabled: I
      }, w)
    })]
  });
}

function NMi(e) {
  const t = S5e(),
    {
      onClose: n,
      ...r
    } = e;
  g.useEffect(() => {
    nOr();
  }, []);
  const a = n ?? nWe;
  return c.jsxs(c.Fragment, {
    children: [c.jsx(RMi, {
      ...e
    }), c.jsx(Zf, {
      show: t,
      fallback: c.jsx(DLr, {
        isDark: r.isDark,
        chatWidth: r.chatWidth,
        canvasBackdropColor: r.canvasBackdropColor,
        onClose: a
      }),
      children: c.jsx(tOr, {
        ...r,
        isOpen: t,
        onClose: a
      })
    })]
  });
}

const jMi = g.memo(NMi),
  t$e = g.memo(({
    size: e = 18,
    className: t
  }) => c.jsx("svg", {
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t ?? "shrink-0",
    "aria-hidden": !0,
    children: c.jsx("path", {
      fill: "currentColor",
      d: "M3.05 9.32 Q11.5 5.4 20.08 13.92 L20.52 15.98 Q11.95 11.22 3.4 10.46 Z"
    })
  }));

t$e.displayName = "DoodleStrokeIcon";

const DMi = ({
    orientation: e,
    isDark: t,
    items: n,
    onOpenOrderSettings: r,
    triggerIcon: a,
    triggerLabel: i = "更多工具"
  }) => {
    on();
    const o = e === "horizontal",
      s = g.useRef(null),
      l = g.useRef(null),
      [d, u] = g.useState(!1),
      [h, p] = g.useState(null),
      m = n.filter(_ => _.show !== !1);
    if (m.length === 0) return null;
    const f = g.useCallback(() => {
        l.current && (clearTimeout(l.current), l.current = null);
      }, []),
      y = g.useCallback(() => {
        var w;
        f();
        const _ = ((w = s.current) == null ? void 0 : w.getBoundingClientRect()) ?? null;
        p(_), u(!0);
      }, [f]),
      b = g.useCallback(() => {
        f(), l.current = setTimeout(() => {
          u(!1), p(null);
        }, 120);
      }, [f]),
      v = d && h ? Da.createPortal(c.jsxs("div", {
        className: `left-toolbar-overflow-menu sketch-menu ${t ? "sketch-menu-dark" : ""}`,
        style: o ? {
          position: "fixed",
          left: h.left + h.width / 2,
          bottom: window.innerHeight - h.top + 10,
          transform: "translateX(-50%)",
          zIndex: 100001
        } : {
          position: "fixed",
          left: h.right + 10,
          top: h.top,
          zIndex: 100001
        },
        onMouseEnter: y,
        onMouseLeave: b,
        children: [c.jsxs("div", {
          className: "left-toolbar-overflow-menu__header",
          children: [c.jsx("div", {
            className: "left-toolbar-overflow-menu__title",
            children: x("更多工具")
          }), r ? c.jsx("button", {
            type: "button",
            className: "left-toolbar-overflow-menu__settings",
            "aria-label": x("自定义侧栏工具"),
            title: x("自定义侧栏工具"),
            onClick: _ => {
              _.preventDefault(), _.stopPropagation(), u(!1), p(null), r();
            },
            children: c.jsx(Pj, {
              size: 14,
              strokeWidth: 1.75
            })
          }) : null]
        }), c.jsx("div", {
          className: "left-toolbar-overflow-menu__scroll",
          style: {
            maxHeight: Math.min(300, Math.max(140, o ? h.top - 16 : window.innerHeight - h.top - 16))
          },
          onWheel: _ => _.stopPropagation(),
          children: c.jsx("div", {
            className: "sketch-menu-inner",
            children: m.map((_, w) => {
              const k = w > 0 ? m[w - 1].section : void 0,
                A = _.section && _.section !== k ? _.section : null;
              return c.jsxs(Ia.Fragment, {
                children: [A ? c.jsx("div", {
                  className: "left-toolbar-overflow-menu__section",
                  children: A
                }) : null, c.jsxs("button", {
                  type: "button",
                  className: `sketch-menu-item w-full text-left ${_.active ? "active" : ""}`,
                  onClick: S => {
                    S.preventDefault(), S.stopPropagation(), _.onClick(S), u(!1);
                  },
                  children: [c.jsx("span", {
                    className: "sketch-menu-icon",
                    "aria-hidden": !0,
                    children: _.icon
                  }), c.jsx("span", {
                    className: "sketch-menu-item-label",
                    children: x(_.label)
                  })]
                })]
              }, _.key);
            })
          })
        })]
      }), document.body) : null;
    return c.jsxs(c.Fragment, {
      children: [c.jsx("div", {
        ref: s,
        className: "left-toolbar-overflow-anchor",
        onMouseEnter: y,
        onMouseLeave: b,
        children: c.jsx("button", {
          type: "button",
          className: "sketch-toolbar-plus-btn",
          "data-open": d ? "true" : "false",
          "aria-label": d ? x("关闭{0}", i) : i,
          "aria-expanded": d,
          onClick: _ => {
            _.preventDefault(), _.stopPropagation();
          },
          children: c.jsx("span", {
            className: "sketch-toolbar-plus-btn__glyph",
            "aria-hidden": !0,
            children: a ?? c.jsx(eo, {
              size: 19,
              strokeWidth: 2.75
            })
          })
        })
      }), v]
    });
  },
  Ykt = "qiaodoumayi-toolbar-overflow-order-changed",
  LMi = ["rh-app", "rh-comfy", "video-timeline", "director-3d", "smart-build", "gen-3d", "global-perspective", "image-tile", "jimeng-super-resolution", "image-wash", "storyboard-node", "storyboard-chart-node", "motion-control", "virtual-try-on", "video-relight", "table-editor-node", "doodle-canvas", "video-input", "video-analyze", "shot-breakdown", "script-parse", "preview", "local-save"],
  OMi = new Set(LMi),
  VFt = [{
    key: "rh-app",
    label: "RH 应用"
  }, {
    key: "rh-comfy",
    label: "RH ComfyUI"
  }, {
    key: "video-timeline",
    label: "剪辑时间线"
  }, {
    key: "director-3d",
    label: "3D导演台"
  }, {
    key: "smart-build",
    label: "智能搭建"
  }, {
    key: "gen-3d",
    label: "3D"
  }, {
    key: "global-perspective",
    label: "全局视角"
  }, {
    key: "jimeng-super-resolution",
    label: "智能超清"
  }, {
    key: "image-wash",
    label: "质感增强"
  }, {
    key: "storyboard-node",
    label: "分镜视表"
  }, {
    key: "storyboard-chart-node",
    label: "分镜图表"
  }, {
    key: "motion-control",
    label: "动作迁移"
  }, {
    key: "table-editor-node",
    label: "表格编辑"
  }, {
    key: "doodle-canvas",
    label: "涂鸦画板"
  }, {
    key: "video-input",
    label: "视频抽帧"
  }, {
    key: "video-analyze",
    label: "视频拆解"
  }, {
    key: "shot-breakdown",
    label: "逐帧拉片"
  }, {
    key: "script-parse",
    label: "脚本解析"
  }, {
    key: "preview",
    label: "预览与拼图"
  }, {
    key: "local-save",
    label: "指定保存"
  }, {
    key: "align",
    label: "节点对齐"
  }, {
    key: "characters",
    label: "角色库"
  }, {
    key: "kling-subjects",
    label: "可灵主体库"
  }, {
    key: "rh-app-library",
    label: "RH AI 应用库"
  }, {
    key: "script-writer",
    label: "剧本创作"
  }, {
    key: "production-center",
    label: "智能生产"
  }, {
    key: "save",
    label: "导出项目"
  }, {
    key: "import",
    label: "导入工作流"
  }, {
    key: "skill-workflow",
    label: "从 Skill 生成工作流"
  }],
  sz = VFt.map(e => e.key),
  BMi = new Set(sz);

function FMi(e) {
  if (e == null || e === "") return null;
  try {
    const t = JSON.parse(e);
    if (Array.isArray(t) && t.every(n => typeof n == "string")) return t;
    if (t && typeof t == "object" && Array.isArray(t.itemKeys)) {
      const n = t.itemKeys;
      if (n.every(r => typeof r == "string")) return n;
    }
  } catch {}
  return null;
}

function Gde(e) {
  const t = new Set(),
    n = [];
  for (const r of e ?? []) BMi.has(r) && !t.has(r) && (t.add(r), n.push(r));
  for (const r of sz) {
    if (t.has(r)) continue;
    const a = sz.indexOf(r);
    let i = n.length;
    for (let o = a + 1; o < sz.length; o++) {
      const s = n.indexOf(sz[o]);
      if (s !== -1) {
        i = s;
        break;
      }
    }
    n.splice(i, 0, r), t.add(r);
  }
  return n;
}

function zMi(e, t) {
  const n = e.filter(o => o.show !== !1),
    r = new Map(n.map(o => [o.key, o])),
    a = [],
    i = new Set();
  for (const o of Gde(t)) {
    const s = r.get(o);
    s && (a.push(s), i.add(o));
  }
  for (const o of sz) !i.has(o) && r.has(o) && (a.push(r.get(o)), i.add(o));
  for (const o of n) i.has(o.key) || a.push(o);
  return a;
}

function UMi() {
  try {
    const e = localStorage.getItem(Zi.LEFT_TOOLBAR_OVERFLOW_ORDER);
    return Gde(FMi(e));
  } catch {
    return Gde([...sz]);
  }
}

async function $Mi() {
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
    t = await e.loadToolbarOverflowOrder();
  return (n = t == null ? void 0 : t.itemKeys) != null && n.length ? Gde(t.itemKeys) : null;
}

async function GMi(e) {
  const t = Gde(e),
    n = {
      version: 1,
      itemKeys: t,
      updatedAt: new Date().toISOString()
    };
  try {
    localStorage.setItem(Zi.LEFT_TOOLBAR_OVERFLOW_ORDER, JSON.stringify(n, null, 0));
  } catch (a) {
    console.warn("[toolbarOverflowOrder] localStorage save failed", a);
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
  return await r.saveToolbarOverflowOrder(n), window.dispatchEvent(new CustomEvent(Ykt, {
    detail: {
      itemKeys: t
    }
  })), t;
}

const Xkt = "qiaodoumayi-toolbar-sidebar-pins-changed",
  rAe = 5,
  TW = 8,
  iun = [{
    key: "text",
    label: "文本工具"
  }, {
    key: "doodle",
    label: "涂鸦画笔"
  }, {
    key: "history",
    label: "生成历史"
  }, {
    key: "project-memory",
    label: "个人记忆"
  }, {
    key: "pose-library",
    label: "本地资料查阅"
  }, {
    key: "project-panel",
    label: "项目管理"
  }],
  OJe = [...iun, ...VFt.filter(e => !iun.some(t => t.key === e.key))],
  HFt = ["text", "doodle", "history", "project-memory", "pose-library", "project-panel"],
  oun = new Set(OJe.map(e => e.key));

function VMi(e) {
  if (e == null || e === "") return null;
  try {
    const t = JSON.parse(e);
    if (Array.isArray(t) && t.every(n => typeof n == "string")) return t;
    if (t && typeof t == "object" && Array.isArray(t.pinnedKeys)) {
      const n = t.pinnedKeys;
      if (n.every(r => typeof r == "string")) return n;
    }
  } catch {}
  return null;
}

function aAe(e) {
  const t = new Set(),
    n = [];
  for (const r of e ?? []) if (oun.has(r) && !t.has(r) && (t.add(r), n.push(r)), n.length >= TW) break;
  for (const r of HFt) {
    if (n.length >= rAe) break;
    !t.has(r) && oun.has(r) && (t.add(r), n.push(r));
  }
  for (const r of OJe) {
    if (n.length >= rAe) break;
    t.has(r.key) || (t.add(r.key), n.push(r.key));
  }
  return n.slice(0, TW);
}

function HMi(e) {
  return e.length >= rAe && e.length <= TW;
}

function WMi() {
  try {
    const e = localStorage.getItem(Zi.LEFT_TOOLBAR_SIDEBAR_PINS);
    return aAe(VMi(e));
  } catch {
    return aAe([...HFt]);
  }
}

async function qMi() {
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
    t = await e.loadToolbarSidebarPins();
  return (n = t == null ? void 0 : t.pinnedKeys) != null && n.length ? aAe(t.pinnedKeys) : null;
}

async function KMi(e) {
  const t = aAe(e),
    n = {
      version: 1,
      pinnedKeys: t,
      updatedAt: new Date().toISOString()
    };
  try {
    localStorage.setItem(Zi.LEFT_TOOLBAR_SIDEBAR_PINS, JSON.stringify(n, null, 0));
  } catch (a) {
    console.warn("[toolbarSidebarPins] localStorage save failed", a);
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
  return await r.saveToolbarSidebarPins(n), window.dispatchEvent(new CustomEvent(Xkt, {
    detail: {
      pinnedKeys: t
    }
  })), t;
}

const QMi = new Map(VFt.map(e => [e.key, e.label])),
  YMi = new Map(OJe.map(e => [e.key, e.label])),
  XMi = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    itemKeys: r,
    pinnedKeys: a,
    onSaved: i,
    onSavedPins: o
  }) => {
    on();
    const [s, l] = g.useState([]),
      [d, u] = g.useState([]),
      h = g.useCallback(() => {
        l(Gde(r)), u(aAe(a));
      }, [r, a]);
    g.useEffect(() => {
      e && h();
    }, [e, h]);
    const p = (k, A, S) => {
        const C = [...k],
          I = A + S;
        return I < 0 || I >= C.length ? k : ([C[A], C[I]] = [C[I], C[A]], C);
      },
      m = (k, A) => {
        if (A <= 0) return k;
        const S = [...k],
          [C] = S.splice(A, 1);
        return S.unshift(C), S;
      },
      f = k => {
        u(A => A.includes(k) ? A.length <= rAe ? A : A.filter(S => S !== k) : A.length >= TW ? A : [...A, k]);
      },
      y = () => {
        l([...sz]), u([...HFt]);
      },
      b = HMi(d),
      v = async () => {
        if (!b) return;
        const k = await KMi(d),
          A = await GMi(s);
        o(k), i(A), t();
      };
    if (!e) return null;
    const _ = k => `flex items-center gap-2 rounded-lg px-2 py-1.5 ${k ? "hover:bg-zinc-800/80" : "hover:bg-zinc-100"}`,
      w = k => `p-1 rounded disabled:opacity-30 ${k ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`;
    return c.jsx(Y6, {
      isOpen: e,
      onClose: t,
      title: x("侧栏工具"),
      theme: n ? "dark" : "light",
      panelWidthClass: "w-[420px]",
      children: c.jsxs("div", {
        className: `px-5 py-4 space-y-4 ${n ? "text-zinc-200" : "text-zinc-800"}`,
        children: [c.jsx("p", {
          className: `text-xs ${n ? "text-zinc-400" : "text-zinc-600"}`,
          children: x("侧栏可显示 {0}–{1} 个工具，并可调整顺序。「+」更多工具里是其余入口。设置会保存到本地和资源缓存目录。", rAe, TW)
        }), c.jsxs("div", {
          className: "flex flex-wrap items-center gap-2 text-xs",
          children: [c.jsx("button", {
            type: "button",
            onClick: y,
            className: `rounded px-2 py-0.5 border text-xs ${n ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
            children: x("恢复默认")
          }), c.jsx("span", {
            className: b ? "text-zinc-500" : "text-red-400",
            children: x("侧栏已选 {0}/{1}", d.length, TW)
          })]
        }), c.jsxs("section", {
          children: [c.jsx("h4", {
            className: `text-xs font-medium mb-1 ${n ? "text-zinc-300" : "text-zinc-700"}`,
            children: x("侧栏显示与顺序")
          }), c.jsx("ul", {
            className: `space-y-1 max-h-[min(28vh,16rem)] overflow-y-auto custom-scrollbar p-0.5 text-sm ${n ? "text-zinc-200" : "text-zinc-800"}`,
            children: OJe.map(k => {
              const A = d.includes(k.key),
                S = d.indexOf(k.key);
              return c.jsxs("li", {
                className: _(n),
                children: [c.jsxs("label", {
                  className: "flex min-w-0 flex-1 items-center gap-2",
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: A,
                    onChange: () => f(k.key),
                    disabled: !A && d.length >= TW
                  }), c.jsx("span", {
                    className: "truncate",
                    children: x(k.label)
                  })]
                }), A ? c.jsxs("div", {
                  className: "flex shrink-0 items-center gap-0.5",
                  children: [c.jsx("button", {
                    type: "button",
                    "aria-label": x("移到首位"),
                    title: x("移到首位"),
                    disabled: S <= 0,
                    onClick: () => u(C => m(C, S)),
                    className: w(n),
                    children: c.jsx(mmt, {
                      size: 16,
                      strokeWidth: 2
                    })
                  }), c.jsx("button", {
                    type: "button",
                    "aria-label": x("上移"),
                    disabled: S <= 0,
                    onClick: () => u(C => p(C, S, -1)),
                    className: w(n),
                    children: c.jsx(j2, {
                      size: 16,
                      strokeWidth: 2
                    })
                  }), c.jsx("button", {
                    type: "button",
                    "aria-label": x("下移"),
                    disabled: S === d.length - 1,
                    onClick: () => u(C => p(C, S, 1)),
                    className: w(n),
                    children: c.jsx(Mi, {
                      size: 16,
                      strokeWidth: 2
                    })
                  })]
                }) : null]
              }, k.key);
            })
          })]
        }), c.jsxs("section", {
          children: [c.jsx("h4", {
            className: `text-xs font-medium mb-1 ${n ? "text-zinc-300" : "text-zinc-700"}`,
            children: x("更多工具顺序")
          }), c.jsx("ul", {
            className: `space-y-1 max-h-[min(28vh,16rem)] overflow-y-auto custom-scrollbar p-0.5 text-sm ${n ? "text-zinc-200" : "text-zinc-800"}`,
            children: s.map((k, A) => c.jsxs("li", {
              className: _(n),
              children: [c.jsxs("span", {
                className: `flex-1 min-w-0 truncate ${d.includes(k) ? "opacity-45" : ""}`,
                children: [x(QMi.get(k) ?? YMi.get(k) ?? k), d.includes(k) ? x(" · 已在侧栏") : ""]
              }), c.jsxs("div", {
                className: "flex shrink-0 items-center gap-0.5",
                children: [c.jsx("button", {
                  type: "button",
                  "aria-label": x("移到首位"),
                  title: x("移到首位"),
                  disabled: A === 0,
                  onClick: () => l(S => m(S, A)),
                  className: w(n),
                  children: c.jsx(mmt, {
                    size: 16,
                    strokeWidth: 2
                  })
                }), c.jsx("button", {
                  type: "button",
                  "aria-label": x("上移"),
                  disabled: A === 0,
                  onClick: () => l(S => p(S, A, -1)),
                  className: w(n),
                  children: c.jsx(j2, {
                    size: 16,
                    strokeWidth: 2
                  })
                }), c.jsx("button", {
                  type: "button",
                  "aria-label": x("下移"),
                  disabled: A === s.length - 1,
                  onClick: () => l(S => p(S, A, 1)),
                  className: w(n),
                  children: c.jsx(Mi, {
                    size: 16,
                    strokeWidth: 2
                  })
                })]
              })]
            }, k))
          })]
        }), c.jsxs("div", {
          className: `flex justify-end gap-2 pt-2 border-t ${n ? "border-zinc-800" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            type: "button",
            onClick: t,
            className: `px-3 py-1.5 text-sm rounded-lg border ${n ? "border-zinc-600 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"}`,
            children: x("取消")
          }), c.jsx("button", {
            type: "button",
            disabled: !b,
            onClick: () => void v(),
            className: "px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50",
            children: x("保存")
          })]
        })]
      })
    });
  },
  yc = {
    size: 17,
    strokeWidth: 1.75
  },
  sun = {
    size: 14,
    strokeWidth: 1.75
  },
  Zl = "sketch-toolbar-icon",
  JMi = ({
    orientation: e = "vertical",
    collapsed: t = !1,
    onToggleCollapsed: n,
    isDark: r,
    activeTool: a,
    historyOpen: i,
    projectPanelOpen: o = !1,
    poseLibraryOpen: s = !1,
    projectMemoryOpen: l = !1,
    textToolActive: d = !1,
    doodleToolActive: u = !1,
    onToggleHistory: h,
    onToggleCharacters: p,
    onToggleKlingSubjects: m,
    onToggleRhAppLibrary: f,
    onToggleProjectPanel: y,
    onTogglePoseLibrary: b,
    onToggleProjectMemory: v,
    onToggleProductionCenter: aiyouProductionToggle,
    onToggleTextTool: _,
    onToggleDoodleTool: w,
    onSaveProject: k,
    onImportWorkflow: A,
    onOpenSkillToWorkflow: S,
    onToggleAlignPanel: C,
    onCreateNodeAtCanvasCenter: I
  }) => {
    const E = on(),
      M = Ndi(),
      T = (M == null ? void 0 : M.onToggleCollapsed) ?? n,
      P = (M == null ? void 0 : M.onToggleHistory) ?? h ?? (() => {}),
      R = (M == null ? void 0 : M.onToggleCharacters) ?? p ?? (() => {}),
      j = (M == null ? void 0 : M.onToggleKlingSubjects) ?? m,
      B = (M == null ? void 0 : M.onToggleRhAppLibrary) ?? f,
      F = (M == null ? void 0 : M.onToggleProjectPanel) ?? y,
      N = (M == null ? void 0 : M.onTogglePoseLibrary) ?? b,
      G = (M == null ? void 0 : M.onToggleProjectMemory) ?? v,
      aiyouToggleProduction = M?.onToggleProductionCenter ?? aiyouProductionToggle,
      z = (M == null ? void 0 : M.onToggleTextTool) ?? _,
      V = (M == null ? void 0 : M.onToggleDoodleTool) ?? w,
      O = (M == null ? void 0 : M.onSaveProject) ?? k ?? (() => {}),
      L = (M == null ? void 0 : M.onImportWorkflow) ?? A ?? (() => {}),
      D = (M == null ? void 0 : M.onOpenSkillToWorkflow) ?? S,
      U = (M == null ? void 0 : M.onToggleAlignPanel) ?? C ?? (() => {}),
      H = (M == null ? void 0 : M.onCreateNodeAtCanvasCenter) ?? I,
      Y = e === "horizontal",
      K = ZIe(),
      W = i ?? K,
      Q = slr(),
      q = Dke("kling"),
      ne = Dke("rh"),
      [de, le] = g.useState(() => UMi()),
      [J, pe] = g.useState(() => WMi()),
      [ce, we] = g.useState(!1);
    g.useEffect(() => {
      const me = async () => {
        const [Re, $e] = await Promise.all([$Mi(), qMi()]);
        Re && le(Re), $e && pe($e);
      };
      me();
      const Ae = () => void me(),
        Fe = Re => {
          var rt;
          const $e = Re.detail;
          (rt = $e == null ? void 0 : $e.itemKeys) != null && rt.length && le($e.itemKeys);
        },
        Me = Re => {
          var rt;
          const $e = Re.detail;
          (rt = $e == null ? void 0 : $e.pinnedKeys) != null && rt.length && pe($e.pinnedKeys);
        };
      return window.addEventListener(Tf, Ae), window.addEventListener(Ykt, Fe), window.addEventListener(Xkt, Me), () => {
        window.removeEventListener(Tf, Ae), window.removeEventListener(Ykt, Fe), window.removeEventListener(Xkt, Me);
      };
    }, []);
    const [X, Z] = g.useState(null);
    g.useEffect(() => Z(null), [E]);
    const re = g.useCallback(me => {
        const Ae = me.currentTarget,
          Fe = me.target.closest("button[data-tip]");
        if (!Fe || !Ae.contains(Fe)) {
          Z(null);
          return;
        }
        const Me = nx(Fe.getAttribute("data-tip") ?? "");
        if (!Me) {
          Z(null);
          return;
        }
        const Re = Fe.getBoundingClientRect();
        Z({
          text: Me,
          x: Re.left + Re.width / 2,
          y: Re.top
        });
      }, []),
      fe = g.useCallback(() => {
        Z(null);
      }, []),
      ye = Y ? {
        onMouseMove: re,
        onMouseLeave: fe
      } : {},
      ie = Y && X ? Da.createPortal(c.jsx("div", {
        role: "tooltip",
        className: `left-toolbar-portal-tip fixed z-[100000] pointer-events-none ${r ? "left-toolbar-portal-tip--dark" : "left-toolbar-portal-tip--light"}`,
        style: {
          left: X.x,
          top: X.y - 8,
          transform: "translate(-50%, -100%)"
        },
        children: X.text
      }), document.body) : null,
      be = ["sketch-toolbar toolbar", Y ? "sketch-toolbar--horizontal left-toolbar-bottom-strip max-w-[min(96vw,calc(100vw-2rem))] overflow-x-auto" : "sketch-toolbar--vertical", r ? "sketch-toolbar-dark" : "", `left-toolbar-fast-tooltip ${Y ? "left-toolbar-fast-tooltip--horizontal left-toolbar-use-portal-tip" : ""} ${r ? "left-toolbar-fast-tooltip--dark" : "left-toolbar-fast-tooltip--light"}`].filter(Boolean).join(" "),
      Ee = "sketch-toolbar-item",
      xe = "sketch-toolbar-toggle",
      he = "sketch-toolbar-divider",
      ue = me => Ae => {
        Ae.preventDefault(), Ae.stopPropagation(), me == null || me(Ae);
      },
      ge = me => {
        me.preventDefault(), me.stopPropagation();
      },
      _e = g.useMemo(() => [{
        key: "text",
        label: "文本工具",
        icon: c.jsx(_U, {
          ...yc,
          className: Zl
        }),
        onClick: ue(z),
        active: d,
        show: !!z
      }, {
        key: "doodle",
        label: "涂鸦画笔",
        icon: c.jsx(t$e, {
          size: 17
        }),
        onClick: ue(V),
        active: u,
        show: !!V
      }, {
        key: "history",
        label: "生成历史",
        icon: c.jsx(Wv, {
          ...yc,
          className: Zl
        }),
        onClick: ue(P),
        active: W
      }, {
        key: "project-memory",
        label: "个人记忆",
        icon: c.jsx(rxe, {
          ...yc,
          className: Zl
        }),
        onClick: ue(G),
        active: l,
        show: !!G
      }, {
        key: "pose-library",
        label: "本地资料查阅",
        icon: c.jsx(mc, {
          ...yc,
          className: Zl
        }),
        onClick: ue(N),
        active: s,
        show: !!N
      }, {
        key: "project-panel",
        label: "项目管理",
        icon: c.jsx(pWt, {
          ...yc,
          className: Zl
        }),
        onClick: ue(F),
        active: o,
        show: !!F
      }, ...(H ? [{
        key: "rh-app",
        label: "RH 应用",
        icon: c.jsx(Wp, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("rh-app"))
      }, {
        key: "rh-comfy",
        label: "RH ComfyUI",
        icon: c.jsx(mZ, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("rh-comfy"))
      }, {
        key: "video-timeline",
        label: "剪辑时间线",
        icon: c.jsx(wb, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("video-timeline"))
      }, {
        key: "director-3d",
        label: "3D导演台",
        icon: c.jsx(tWe, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("director-3d"))
      }, {
        key: "smart-build",
        label: "智能搭建",
        icon: c.jsx(ac, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("smart-build"))
      }, {
        key: "gen-3d",
        label: "3D",
        icon: c.jsx(Hm, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("gen-3d"))
      }, {
        key: "global-perspective",
        label: "全局视角",
        icon: c.jsx(i9, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("global-perspective"))
      }, {
        key: "jimeng-super-resolution",
        label: "智能超清",
        icon: c.jsx(ac, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("jimeng-super-resolution"))
      }, {
        key: "image-wash",
        label: "质感增强",
        icon: c.jsx(ac, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("image-wash"))
      }, {
        key: "storyboard-node",
        label: "分镜视表",
        icon: c.jsx(Od, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("storyboard-node"))
      }, {
        key: "storyboard-chart-node",
        label: "分镜图表",
        icon: c.jsx(Od, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("storyboard-chart-node"))
      }, {
        key: "table-editor-node",
        label: "表格编辑",
        icon: c.jsx(Hue, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("table-editor-node"))
      }, {
        key: "doodle-canvas",
        label: "涂鸦画板",
        icon: c.jsx(nw, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("doodle-canvas"))
      }, {
        key: "video-input",
        label: "视频抽帧",
        icon: c.jsx(Oo, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("video-input"))
      }, {
        key: "video-analyze",
        label: "视频拆解",
        icon: c.jsx(Sf, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("video-analyze"))
      }, {
        key: "shot-breakdown",
        label: "逐帧拉片",
        icon: c.jsx(uZ, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("shot-breakdown"))
      }, {
        key: "script-parse",
        label: "脚本解析",
        icon: c.jsx(Hd, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("script-parse"))
      }, {
        key: "preview",
        label: "预览与拼图",
        icon: c.jsx(ul, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("preview"))
      }, {
        key: "local-save",
        label: "指定保存",
        icon: c.jsx(O5, {
          ...yc,
          className: Zl
        }),
        onClick: ue(() => H("local-save"))
      }] : []), {
        key: "align",
        label: "节点对齐",
        icon: c.jsx(uWt, {
          ...yc,
          className: Zl
        }),
        onClick: ue(U)
      }, {
        key: "characters",
        label: "角色库",
        icon: c.jsx(bmt, {
          ...yc,
          className: Zl
        }),
        onClick: ue(R),
        active: Q
      }, {
        key: "kling-subjects",
        label: "可灵主体库",
        icon: c.jsx(Oo, {
          ...yc,
          className: Zl
        }),
        onClick: ue(j),
        active: q,
        show: !!j
      }, {
        key: "rh-app-library",
        label: "RH AI 应用库",
        icon: c.jsx(Wp, {
          ...yc,
          className: Zl
        }),
        onClick: ue(B),
        active: ne,
        show: !!B
      }, {
        key: "production-center",
        label: "智能生产",
        icon: c.jsx(Ol, {...yc, className: Zl}),
        onClick: ue(aiyouToggleProduction),
        show: !!aiyouToggleProduction
      }, {
        key: "save",
        label: "导出项目",
        icon: c.jsx(O5, {
          ...yc,
          className: Zl
        }),
        onClick: ue(O),
        section: "项目"
      }, {
        key: "import",
        label: "导入工作流",
        icon: c.jsx(gWt, {
          ...yc,
          className: Zl
        }),
        onClick: ue(L)
      }, {
        key: "skill-workflow",
        label: "从 Skill 生成工作流",
        icon: c.jsx(fWt, {
          ...yc,
          className: Zl
        }),
        onClick: ue(D),
        show: !!D
      }], [Q, u, W, q, H, L, D, O, U, R, V, P, j, N, G, F, B, z, s, l, o, ne, d, aiyouToggleProduction]),
      ke = g.useMemo(() => new Set(J), [J]),
      ve = g.useMemo(() => zMi(_e, de).filter(me => !ke.has(me.key)), [_e, de, ke]),
      Te = g.useMemo(() => {
        const me = new Map();
        for (const Ae of _e) Ae.show !== !1 && me.set(Ae.key, Ae);
        return me;
      }, [_e]),
      Ne = me => {
        const Ae = Te.get(me);
        return Ae ? c.jsx("button", {
          type: "button",
          onClick: Fe => {
            Fe.preventDefault(), Fe.stopPropagation(), me === "history" && dne(), Ae.onClick(Fe);
          },
          onMouseEnter: me === "history" ? () => dne() : void 0,
          onFocus: me === "history" ? () => dne() : void 0,
          className: Ee,
          "data-toolbar-active": Ae.active ? "true" : "false",
          "data-tip": nx(Ae.label),
          "aria-label": x(Ae.label),
          children: Ae.icon
        }, me) : null;
      };
    return t ? c.jsxs(c.Fragment, {
      children: [c.jsxs("div", {
        ...ye,
        className: be,
        onDoubleClick: ge,
        children: [c.jsx(DMi, {
          orientation: e,
          isDark: r,
          items: ve,
          onOpenOrderSettings: () => we(!0)
        }), J.map(me => Ne(me))]
      }), c.jsx(XMi, {
        isOpen: ce,
        onClose: () => we(!1),
        isDark: r,
        itemKeys: de,
        pinnedKeys: J,
        onSaved: le,
        onSavedPins: pe
      }), ie]
    }) : c.jsxs(c.Fragment, {
      children: [c.jsxs("div", {
        ...ye,
        className: be,
        onDoubleClick: ge,
        children: [T && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), T();
          },
          className: xe,
          "data-tip": nx("收缩工具栏（仅显示常用功能）"),
          children: Y ? c.jsx(j2, {
            ...sun,
            className: Zl
          }) : c.jsx(Mi, {
            ...sun,
            className: Zl
          })
        }), c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), U();
          },
          className: Ee,
          "data-tip": nx("节点对齐（按 ` 或点击，需选中 ≥2 个节点）"),
          children: c.jsx(uWt, {
            ...yc,
            className: Zl
          })
        }), z && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), z(me);
          },
          className: Ee,
          "data-toolbar-active": d ? "true" : "false",
          "data-tip": nx("文本工具（在画布拖拽框选后直接输入）"),
          children: c.jsx(_U, {
            ...yc,
            className: Zl
          })
        }), V && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), V(me);
          },
          className: Ee,
          "data-toolbar-active": u ? "true" : "false",
          "data-tip": nx("涂鸦画笔（在空白画布上拖拽手绘）"),
          children: c.jsx(t$e, {
            size: 17
          })
        }), c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), P(me);
          },
          onMouseEnter: () => dne(),
          onFocus: () => dne(),
          className: Ee,
          "data-toolbar-active": W ? "true" : "false",
          "data-tip": x("生成历史"),
          children: c.jsx(Wv, {
            ...yc,
            className: Zl
          })
        }), G && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), G(me);
          },
          className: Ee,
          "data-toolbar-active": l ? "true" : "false",
          "data-tip": x(l ? "关闭个人记忆" : "个人记忆"),
          "aria-label": x(l ? "关闭个人记忆" : "打开个人记忆"),
          children: c.jsx(rxe, {
            ...yc,
            className: Zl
          })
        }), c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), R(me);
          },
          className: Ee,
          "data-toolbar-active": Q ? "true" : "false",
          "data-tip": x("角色库"),
          children: c.jsx(bmt, {
            ...yc,
            className: Zl
          })
        }), N && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), N(me);
          },
          className: Ee,
          "data-toolbar-active": s ? "true" : "false",
          "data-tip": x("本地资料查阅"),
          children: c.jsx(mc, {
            ...yc,
            className: Zl
          })
        }), j && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), j(me);
          },
          className: Ee,
          "data-toolbar-active": q ? "true" : "false",
          "data-tip": x("可灵主体库"),
          children: c.jsx(Oo, {
            ...yc,
            className: Zl
          })
        }), B && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), B(me);
          },
          className: Ee,
          "data-toolbar-active": ne ? "true" : "false",
          "data-tip": x("RH AI 应用库"),
          children: c.jsx(Wp, {
            ...yc,
            className: Zl
          })
        }), F && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), F(me);
          },
          className: Ee,
          "data-toolbar-active": o ? "true" : "false",
          "data-tip": nx("项目管理（工作流+画布素材，不含生成历史）"),
          "aria-label": x("项目管理"),
          children: c.jsx(pWt, {
            ...yc,
            className: Zl
          })
        }), c.jsx("div", {
          className: he,
          "aria-hidden": !0
        }), c.jsx("button", {
          onClick: O,
          className: Ee,
          "data-tip": x("导出项目"),
          children: c.jsx(O5, {
            ...yc,
            className: Zl
          })
        }), c.jsx("button", {
          onClick: L,
          className: Ee,
          "data-tip": x("导入工作流"),
          title: x("导入工作流"),
          children: c.jsx(gWt, {
            ...yc,
            className: Zl
          })
        }), D && c.jsx("button", {
          onClick: me => {
            me.preventDefault(), me.stopPropagation(), D();
          },
          className: Ee,
          "data-tip": x("从 Skill 生成工作流"),
          children: c.jsx(fWt, {
            ...yc,
            className: Zl
          })
        })]
      }), ie]
    });
  },
  ZMi = g.memo(JMi),
  ePi = g.memo(function ({
    store: t,
    enabled: n,
    zoom: r,
    eraserWidth: a,
    isDark: i
  }) {
    const o = g.useSyncExternalStore(t.subscribeHud, t.getHud, t.getHud);
    if (!n || !o) return null;
    const s = Math.max(6, a * (r > 0 ? r : 1));
    return c.jsx("div", {
      "data-doodle-eraser-hud": !0,
      className: `pointer-events-none fixed z-[250] rounded-full border-2 box-border ${i ? "border-emerald-400/95 bg-emerald-400/[0.11]" : "border-emerald-600/90 bg-emerald-500/10"}`,
      style: {
        left: o.x - s / 2,
        top: o.y - s / 2,
        width: s,
        height: s
      },
      "aria-hidden": !0
    });
  }),
  Phr = ["#171717", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#ffffff"],
  lun = "flex items-center gap-1 px-2 py-2 rounded-full border transition-all",
  tPi = (e, t = !1) => e ? `${lun} ${t ? "px-1.5 py-1.5 gap-0.5" : ""} bg-zinc-900 border-zinc-800 text-zinc-100 shadow-none` : `${lun} ${t ? "px-1.5 py-1.5 gap-0.5" : ""} bg-[#f6f6f6] border-zinc-200 text-zinc-800 shadow-md shadow-zinc-400/20`,
  nPi = ({
    visible: e,
    isDark: t,
    compact: n = !1,
    bottomOffset: r = 24,
    subTool: a,
    onSubToolChange: i,
    brushColor: o,
    onBrushColorChange: s,
    brushWidth: l,
    onBrushWidthChange: d,
    eraserWidth: u,
    onEraserWidthChange: h
  }) => {
    on();
    const [p, m] = g.useState(!1),
      f = g.useRef(null);
    if (g.useEffect(() => {
      if (!p) return;
      const A = S => {
        f.current && !f.current.contains(S.target) && m(!1);
      };
      return document.addEventListener("mousedown", A, !0), () => document.removeEventListener("mousedown", A, !0);
    }, [p]), g.useEffect(() => {
      e || m(!1);
    }, [e]), !e) return null;
    const y = (Math.min(48, Math.max(4, u)) - 4) / 44 * 100,
      b = tPi(t, n),
      v = A => `p-2 rounded-full transition-colors ${A ? t ? "bg-white text-zinc-900" : "bg-zinc-900 text-white" : t ? "text-zinc-400 hover:bg-zinc-800/80" : "text-zinc-600 hover:bg-zinc-100"}`,
      _ = `w-px h-6 shrink-0 ${t ? "bg-zinc-800" : "bg-zinc-200"}`,
      w = t ? `${n ? "w-14" : "w-20"} h-1.5 rounded-full bg-white/15 accent-zinc-100` : `${n ? "w-14" : "w-20"} h-1.5 accent-blue-500 bg-zinc-200`,
      k = t ? `${n ? "w-14" : "w-20"} h-1.5 rounded-full bg-white/15 accent-zinc-100` : `doodle-toolbar-eraser-range-light ${n ? "w-14" : "w-20"} h-[6px] rounded-full bg-transparent`;
    return c.jsx("div", {
      className: "fixed left-1/2 -translate-x-1/2 z-[160] pointer-events-auto",
      style: {
        bottom: r
      },
      onMouseDown: A => A.stopPropagation(),
      onClick: A => A.stopPropagation(),
      children: c.jsxs("div", {
        className: `${b} doodle-bottom-toolbar-fast-tooltip max-w-[calc(100vw-32px)] flex-nowrap ${t ? "doodle-bottom-toolbar-fast-tooltip--dark" : "doodle-bottom-toolbar-fast-tooltip--light"}`,
        children: [c.jsx("button", {
          type: "button",
          className: v(a === "select"),
          onClick: () => i("select"),
          "data-tip": x("选择 / 框选 (V)"),
          "aria-label": x("选择 / 框选，快捷键 V"),
          children: c.jsx(x5e, {
            size: n ? 16 : 18
          })
        }), c.jsx("button", {
          type: "button",
          className: v(a === "brush"),
          onClick: () => i("brush"),
          "data-tip": x("画笔 (B)"),
          "aria-label": x("画笔，快捷键 B"),
          children: c.jsx(t$e, {
            size: n ? 16 : 18
          })
        }), c.jsx("button", {
          type: "button",
          className: v(a === "eraser"),
          onClick: () => i("eraser"),
          "data-tip": x("橡皮擦 (E)"),
          "aria-label": x("橡皮擦，快捷键 E"),
          children: c.jsx(uI, {
            size: n ? 16 : 18
          })
        }), c.jsx("div", {
          className: _,
          "aria-hidden": !0
        }), c.jsxs("div", {
          ref: f,
          className: `relative flex items-center gap-1.5 px-1 ${t ? "text-zinc-300" : "text-zinc-700"}`,
          children: [c.jsx("button", {
            type: "button",
            "data-tip": x("画笔颜色"),
            "aria-label": x("画笔颜色"),
            onMouseDown: A => A.stopPropagation(),
            onClick: A => {
              A.preventDefault(), A.stopPropagation(), m(S => !S);
            },
            className: `w-8 h-8 rounded-full shrink-0 border ${t ? "border-zinc-600" : "border-zinc-300"}`,
            style: {
              backgroundColor: /^#[0-9a-fA-F]{6}$/.test(o) ? o : "#171717"
            }
          }), c.jsx("span", {
            className: "text-[11px] whitespace-nowrap hidden sm:inline pointer-events-none",
            children: x("颜色")
          }), p && c.jsxs("div", {
            className: `absolute z-[140] left-0 bottom-full mb-2 min-w-[200px] p-2 rounded-xl border shadow-xl ${t ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
            onMouseDown: A => A.stopPropagation(),
            children: [c.jsx("div", {
              className: "grid grid-cols-5 gap-1.5 mb-2",
              children: Phr.map(A => c.jsx("button", {
                type: "button",
                title: A,
                className: `w-7 h-7 rounded-md border-2 transition-transform hover:scale-105 ${o.toLowerCase() === A.toLowerCase() ? t ? "border-white" : "border-zinc-900" : t ? "border-zinc-600" : "border-zinc-300"}`,
                style: {
                  backgroundColor: A
                },
                onClick: () => s(A)
              }, A))
            }), c.jsxs("label", {
              className: "flex items-center gap-2 cursor-pointer text-[11px]",
              children: [c.jsx("span", {
                className: t ? "text-zinc-400" : "text-zinc-600",
                children: x("更多")
              }), c.jsx("input", {
                type: "color",
                value: /^#[0-9a-fA-F]{6}$/.test(o) ? o : "#171717",
                onChange: A => s(A.target.value),
                className: "h-8 w-full min-w-0 cursor-pointer rounded border-0 bg-transparent"
              })]
            })]
          })]
        }), c.jsxs("div", {
          className: `flex items-center gap-1 px-1 ${t ? "text-zinc-300" : "text-zinc-700"}`,
          "data-tip": x("画笔粗细"),
          children: [c.jsx("span", {
            className: "text-[11px] whitespace-nowrap",
            children: x("粗细")
          }), c.jsx("input", {
            type: "range",
            min: 1,
            max: 16,
            step: .5,
            value: l,
            onChange: A => d(Number(A.target.value)),
            className: w
          }), c.jsx("span", {
            className: "text-[10px] w-7 tabular-nums",
            children: l.toFixed(1)
          })]
        }), c.jsx("div", {
          className: _,
          "aria-hidden": !0
        }), c.jsxs("div", {
          className: `flex items-center gap-1 px-1 ${t ? "text-zinc-300" : "text-zinc-700"}`,
          "data-tip": x("橡皮大小"),
          children: [c.jsx("span", {
            className: "text-[11px] whitespace-nowrap",
            children: x("橡皮")
          }), c.jsx("input", {
            type: "range",
            min: 4,
            max: 48,
            step: 1,
            value: u,
            onChange: A => h(Number(A.target.value)),
            className: k,
            style: t ? void 0 : {
              "--eraser-fill-pct": `${y}%`
            }
          }), c.jsx("span", {
            className: "text-[10px] w-7 tabular-nums",
            children: u
          })]
        })]
      })
    });
  },
  rPi = ({
    visible: e,
    isDark: t,
    bounds: n,
    selectionColor: r,
    onSelectionColorChange: a,
    onCreateArtboard: i
  }) => {
    on();
    const [o, s] = g.useState(!1),
      l = g.useRef(null),
      d = g.useRef(null);
    if (Qp(d, "50% 100%", e), g.useEffect(() => {
      if (!o) return;
      const m = f => {
        l.current && !l.current.contains(f.target) && s(!1);
      };
      return document.addEventListener("mousedown", m, !0), () => document.removeEventListener("mousedown", m, !0);
    }, [o]), g.useEffect(() => {
      e || s(!1);
    }, [e]), !e) return null;
    const u = t ? "flex items-center gap-0 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-none" : "flex items-center gap-0 rounded-full border border-zinc-200 bg-[#f6f6f6] text-zinc-800 shadow-xl shadow-zinc-400/20",
      h = `w-px h-5 shrink-0 ${t ? "bg-zinc-600" : "bg-zinc-200"}`,
      p = mJ(n);
    return c.jsx("div", {
      className: "absolute z-[161] pointer-events-auto",
      style: p,
      onMouseDown: m => m.stopPropagation(),
      onClick: m => m.stopPropagation(),
      children: c.jsx("div", {
        ref: d,
        style: {
          transition: "none",
          willChange: "transform"
        },
        children: c.jsxs("div", {
          className: `${u} doodle-bottom-toolbar-fast-tooltip ${t ? "doodle-bottom-toolbar-fast-tooltip--dark" : "doodle-bottom-toolbar-fast-tooltip--light"}`,
          children: [c.jsxs("div", {
            ref: l,
            className: "relative flex items-center gap-1.5 px-3 py-2",
            children: [c.jsx("button", {
              type: "button",
              "data-tip": x("选中笔迹颜色"),
              "aria-label": x("选中笔迹颜色"),
              onMouseDown: m => m.stopPropagation(),
              onClick: m => {
                m.preventDefault(), m.stopPropagation(), s(f => !f);
              },
              className: `w-7 h-7 rounded-full shrink-0 border ${t ? "border-zinc-600" : "border-zinc-300"}`,
              style: {
                backgroundColor: /^#[0-9a-fA-F]{6}$/.test(r) ? r : "#171717"
              }
            }), c.jsx("span", {
              className: "text-xs",
              children: x("颜色")
            }), o && c.jsxs("div", {
              className: `absolute z-[140] left-2 bottom-full mb-2 min-w-[200px] p-2 rounded-xl border shadow-xl ${t ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
              onMouseDown: m => m.stopPropagation(),
              children: [c.jsx("div", {
                className: "grid grid-cols-5 gap-1.5 mb-2",
                children: Phr.map(m => c.jsx("button", {
                  type: "button",
                  title: m,
                  className: `w-7 h-7 rounded-md border-2 transition-transform hover:scale-105 ${r.toLowerCase() === m.toLowerCase() ? t ? "border-white" : "border-zinc-900" : t ? "border-zinc-600" : "border-zinc-300"}`,
                  style: {
                    backgroundColor: m
                  },
                  onClick: () => a(m)
                }, m))
              }), c.jsxs("label", {
                className: "flex items-center gap-2 cursor-pointer text-[11px]",
                children: [c.jsx("span", {
                  className: t ? "text-zinc-400" : "text-zinc-600",
                  children: x("更多")
                }), c.jsx("input", {
                  type: "color",
                  value: /^#[0-9a-fA-F]{6}$/.test(r) ? r : "#171717",
                  onChange: m => a(m.target.value),
                  className: "h-8 w-full min-w-0 cursor-pointer rounded border-0 bg-transparent"
                })]
              })]
            })]
          }), c.jsx("div", {
            className: h,
            "aria-hidden": !0
          }), c.jsx("button", {
            type: "button",
            className: "px-3 py-2 text-xs font-medium hover:opacity-90 transition-opacity",
            onClick: i,
            "data-tip": x("以选区大小导出为灰白底草稿图并生成图片节点"),
            "aria-label": x("以选区大小导出为灰白底草稿图并生成图片节点"),
            children: x("创建画板")
          })]
        })
      })
    });
  };

function aPi(e, t) {
  return e === "bottom" ? "left-toolbar-dock-bottom absolute bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-full px-2" : `left-toolbar-dock-side absolute top-1/2 -translate-y-1/2 z-50 transition-[left] duration-300 ${t === 376 ? "left-[376px]" : t === 360 ? "left-[360px]" : t === 256 ? "left-[256px]" : "left-4"}`;
}

function iPi(e, t) {
  return e !== "bottom" ? 24 : t ? 80 : 96;
}

function oPi({
  dock: e,
  leftInsetPx: t,
  children: n
}) {
  return c.jsx("div", {
    className: aPi(e, t),
    children: n
  }, e);
}

let Rhr = null;

function sPi(e) {
  Rhr = e;
}

function WFt() {
  return Rhr;
}

const lPi = new Set(["input-image", "gen-image", "preview", "topaz-upscale", "jimeng-super-resolution", "fal-rembg", "virtual-try-on", "layer-decomposition"]),
  cPi = new Set(["gen-video", "video-input", "video-analyze", "video-timeline", "motion-control", "video-relight"]);

function Pst(...e) {
  for (const t of e) {
    const n = String(t || "").trim();
    if (n && n !== "undefined" && n !== "null") return n;
  }
  return "";
}

function dPi(e) {
  return !e || cPi.has(e.type) || e.previewType === "video" ? !1 : lPi.has(e.type) || e.previewType === "image";
}

function uPi(e) {
  return e.type === "input-image" ? Pst(c5e(e)[0], Vh(e), typeof e.content == "string" ? e.content : "", _f(e)) : e.type === "gen-image" ? Pst(Zo(e), typeof e.content == "string" ? e.content : "") : Pst(typeof e.content == "string" ? e.content : "", typeof e.thumbnailUrl == "string" ? e.thumbnailUrl : "");
}

function hPi(e) {
  const t = [...e.selectedIds].filter(Boolean);
  if (t.length === 0) return {
    ok: !1,
    message: "请先选中一张图片"
  };
  if (t.length > 1) return {
    ok: !1,
    message: "智能改图一次只能编辑一张图"
  };
  const n = e.nodes.find(a => a.id === t[0]);
  if (!n) return {
    ok: !1,
    message: "未找到选中的节点"
  };
  if (!dPi(n)) return {
    ok: !1,
    message: "请选中一张图片后再打开智能改图"
  };
  const r = uPi(n);
  return r ? {
    ok: !0,
    source: {
      nodeId: n.id,
      imageUrl: r,
      title: String(n.nodeName || "图片"),
      width: Math.max(1, Number(n.width) || 1),
      height: Math.max(1, Number(n.height) || 1)
    }
  } : {
    ok: !1,
    message: "这张图还没有可编辑的画面"
  };
}

let n$e = {
  session: null
};

const Jkt = new Set();

function Nhr() {
  Jkt.forEach(e => e());
}

function cun() {
  return n$e;
}

function pPi(e) {
  return Jkt.add(e), () => {
    Jkt.delete(e);
  };
}

function mPi(e) {
  n$e = {
    session: {
      source: e
    }
  }, Nhr();
}

function fPi() {
  n$e.session && (n$e = {
    session: null
  }, Nhr());
}

function gPi() {
  return g.useSyncExternalStore(pPi, () => cun().session, () => cun().session);
}

function r$e(e) {
  const t = WFt(),
    n = (t == null ? void 0 : t.getNodes()) ?? [],
    r = n.some(i => i.id === e.id) ? n : [...n, e],
    a = hPi({
      nodes: r,
      selectedIds: [e.id]
    });
  if (!a.ok) {
    Ai("error", a.message);
    return;
  }
  mPi(a.source);
}

const yPi = g.lazy(() => Ie(() => Promise.resolve().then(() => vgo), void 0, import.meta.url).then(e => ({
  default: e.SmartEditHost
})));

function bPi() {
  return c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(yPi, {})
  });
}

function vPi(e) {
  return {
    visible: e.visible,
    isDark: e.isDark,
    subTool: e.subTool,
    onSubToolChange: e.setSubTool,
    brushColor: e.brushColor,
    onBrushColorChange: e.setBrushColor,
    brushWidth: e.brushWidth,
    onBrushWidthChange: e.setBrushWidth,
    eraserWidth: e.eraserWidth,
    onEraserWidthChange: e.setEraserWidth,
    store: e.store,
    zoom: e.zoom
  };
}

function wPi({
  dock: e,
  leftInsetPx: t,
  collapsed: n,
  toolbar: r,
  doodle: a
}) {
  return c.jsxs(c.Fragment, {
    children: [c.jsx(oPi, {
      dock: e,
      leftInsetPx: t,
      children: r
    }), c.jsx(nPi, {
      visible: a.visible,
      isDark: a.isDark,
      compact: !1,
      bottomOffset: iPi(e, n),
      subTool: a.subTool,
      onSubToolChange: a.onSubToolChange,
      brushColor: a.brushColor,
      onBrushColorChange: a.onBrushColorChange,
      brushWidth: a.brushWidth,
      onBrushWidthChange: a.onBrushWidthChange,
      eraserWidth: a.eraserWidth,
      onEraserWidthChange: a.onEraserWidthChange
    }), c.jsx(ePi, {
      store: a.store,
      enabled: a.visible && a.subTool === "eraser",
      zoom: a.zoom,
      eraserWidth: a.eraserWidth,
      isDark: a.isDark
    }), c.jsx(bPi, {})]
  });
}

function xPi(e) {
  const t = ["absolute", "inset-0", "canvas-custom-cursor"];
  return e.compactReferencePick && t.push("canvas-compact-ref-pick"), e.focusEditPick && t.push("canvas-focus-edit-pick"), e.referencePickActive && t.push("canvas-reference-pick-active"), e.connectingWire && t.push("canvas-connecting-wire"), e.viewportTransforming && t.push("canvas-viewport-interacting"), e.deferredCanvasPanning && t.push(e.localCacheMode ? "canvas-local-panning" : "canvas-panning"), e.nodeDragging && t.push(e.localCacheMode ? "canvas-local-node-dragging" : "canvas-node-dragging"), e.canvasTextDragging && t.push("canvas-text-dragging"), e.textCreateCursor && t.push("canvas-text-create-cursor"), e.doodleBrushCursor && t.push("canvas-doodle-cursor"), e.denseMediaOverview && t.push("dense-media-overview"), e.denseMediaMicro && t.push("dense-media-micro"), e.boxSelectMulti && t.push("canvas-box-select-multi"), e.zoomClassName && t.push(e.zoomClassName), t.join(" ");
}

function _Pi({
  suspended: e,
  interactionBlocked: t,
  containerRef: n,
  canvasRef: r,
  canvasWorldRef: a,
  isDark: i,
  isPanning: o,
  backgroundColor: s,
  showBgGlow: l = !1,
  visualState: d,
  eventHandlers: u,
  grid: h,
  emptyState: p,
  viewportOverlay: m,
  referencePickBanner: f,
  floatingControls: y,
  worldChildren: b
}) {
  g.useEffect(() => D4n(document.body), []);
  const v = t ? {
    pointerEvents: "none"
  } : void 0;
  return c.jsx("div", {
    className: "absolute inset-0 overflow-hidden transition-opacity duration-200",
    ref: n,
    "data-canvas-container": "true",
    "aria-hidden": e,
    style: v,
    children: !e && c.jsxs(c.Fragment, {
      children: [c.jsx(B5i, {
        isDark: i,
        isPanning: o,
        backgroundColor: s,
        showBgGlow: l
      }), p, c.jsxs("div", {
        ref: r,
        id: "canvas-bg",
        className: xPi(d),
        style: {
          touchAction: "none"
        },
        ...u,
        children: [f, m, c.jsx(G5i, {
          ...h
        }), c.jsxs("div", {
          ref: a,
          className: "canvas-world absolute inset-0",
          style: {
            zIndex: 1
          },
          children: [b, c.jsx("div", {
            id: "canvas-pan-hit-shield",
            className: "canvas-pan-hit-shield",
            "aria-hidden": "true"
          })]
        }), c.jsx("div", {
          id: "canvas-node-drag-hit-shield",
          className: "canvas-pan-hit-shield",
          "aria-hidden": "true"
        }), y]
      })]
    })
  });
}

function kPi({
  active: e,
  onCancel: t
}) {
  return on(), e ? c.jsx("div", {
    "data-canvas-reference-pick-banner": !0,
    className: "pointer-events-none absolute left-1/2 top-[18px] z-[10020] -translate-x-1/2",
    role: "status",
    "aria-live": "polite",
    children: c.jsxs("div", {
      className: "pointer-events-auto flex h-9 items-center gap-2 rounded-xl border border-sky-300/25 bg-[#0d9bd8] px-3 text-[13px] font-semibold text-white shadow-[0_10px_34px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl",
      children: [c.jsx("span", {
        children: x("从画布选择参考")
      }), c.jsx("span", {
        className: "h-4 w-px bg-white/25",
        "aria-hidden": !0
      }), c.jsx("span", {
        className: "flex h-6 w-6 items-center justify-center rounded-full bg-black/15",
        "aria-hidden": !0,
        children: c.jsx(lEt, {
          size: 13,
          strokeWidth: 2.2
        })
      }), c.jsxs("button", {
        type: "button",
        onMouseDown: n => n.stopPropagation(),
        onClick: n => {
          n.preventDefault(), n.stopPropagation(), t();
        },
        className: "flex h-6 items-center gap-1 rounded-full bg-black/15 px-2 text-[11px] font-medium text-white/95 transition-colors hover:bg-black/25",
        "aria-label": x("退出画布参考选择"),
        title: x("退出（Esc / 右键）"),
        children: [c.jsx("span", {
          children: x("退出")
        }), c.jsx(Na, {
          size: 11,
          strokeWidth: 2.2,
          "aria-hidden": !0
        })]
      })]
    })
  }) : null;
}

const APi = g.memo(function ({
  store: t,
  view: n,
  isDark: r
}) {
  const a = g.useSyncExternalStore(t.subscribe, t.getDraft, t.getDraft);
  if (!a) return null;
  const i = ihr(a);
  return c.jsx("div", {
    "data-canvas-text-draft": !0,
    className: `absolute pointer-events-none z-[60] rounded-sm border ${r ? "border-white/70 bg-white/10" : "border-black/70 bg-black/10"}`,
    style: {
      left: i.x * n.zoom + n.x,
      top: i.y * n.zoom + n.y,
      width: Math.max(1, i.width * n.zoom),
      height: Math.max(1, i.height * n.zoom)
    }
  });
});

function DMe(e, t) {
  return {
    x: t === "output" ? e.x + e.width : e.x,
    y: e.y + e.height / 2
  };
}

function dun(e) {
  return [...new Set(e)];
}

const SPi = g.memo(Evi);

function IPi({
  hideConnections: e,
  showAllConnections: t,
  staticConnections: n,
  canvasVisualConnections: r,
  visibleConnections: a,
  nodes: i,
  nodesGeometryMap: o,
  groups: s,
  view: l,
  viewportWidth: d,
  viewportHeight: u,
  isDark: h,
  isPanning: p,
  isDenseGraph: m,
  selectedNodeId: f,
  selectedNodeIds: y,
  selectedConnectionId: b,
  connectionLineStrokeWidth: v,
  connectionLineOpacityPercent: _,
  connectionLineColor: w,
  connectionHitWidth: k,
  collectionEndpoints: A,
  intraGroupConnectionIds: S,
  forceStraightConnectionIds: C,
  highlightConnectionIds: I,
  staticConnectionIds: E,
  connectionLayoutSignature: M,
  connectionRenderTierById: T,
  enableGenerationConnectionFlow: P,
  generationConnectionFlowMode: R = "default",
  alignmentGuides: j,
  connectingSource: B,
  connectingTarget: F,
  connectingGroupOutputId: N,
  multiConnectingSourceIds: G,
  multiConnectingTargetIds: z,
  svgContainerRef: V,
  connectingLineRef: O,
  connectingLineReverseRef: L,
  onSelectConnection: D,
  onDeleteConnection: U
}) {
  const H = !e || a.length > 0,
    Y = !t && !!f && y.size === 1 && y.has(f),
    K = g.useMemo(() => Array.from(o.values()), [o]),
    W = g.useMemo(() => dun(G ?? []), [G]),
    Q = g.useMemo(() => dun(z ?? []), [z]),
    q = P;
  return c.jsxs(c.Fragment, {
    children: [!e && c.jsx(SPi, {
      connections: n,
      allConnections: r,
      skipFocusReveal: t,
      nodesGeometryMap: o,
      view: l,
      viewportWidth: d,
      viewportHeight: u,
      isDark: h,
      connectionLineStrokeWidth: v,
      connectionLineOpacityPercent: _,
      connectionLineColor: w,
      connectionHitWidth: k,
      collectionEndpoints: A,
      intraGroupConnectionIds: S,
      forceStraightConnectionIds: C,
      highlightConnectionIds: I,
      onSelectConnection: D,
      onDeleteConnection: U
    }), c.jsxs("svg", {
      ref: V,
      "data-canvas-connections-layer": "true",
      className: "absolute inset-0 overflow-visible",
      style: {
        zIndex: 5,
        pointerEvents: "none"
      },
      children: [H && c.jsx(uLr, {
        connections: a,
        nodes: i,
        view: l,
        viewportWidth: d,
        viewportHeight: u,
        selectedNodeId: f,
        selectedNodeIds: y,
        selectedConnectionId: b,
        onSelectConnection: D,
        isDark: h,
        isPanning: p,
        onDeleteConnection: U,
        collectionEndpoints: A,
        intraGroupConnectionIds: S,
        enableGenerationConnectionFlow: q,
        generationConnectionFlowMode: R,
        connectionLineStrokeWidth: v,
        connectionLineOpacityPercent: _,
        connectionLineColor: w,
        connectionHitWidth: k,
        connectionLayoutSignature: M,
        connectionRenderTierById: T,
        isDenseMode: m,
        staticConnectionIds: E,
        forceStraightConnectionIds: C,
        skipConnectionMountFade: t || e || Y
      }), j.map((ne, de) => {
        const le = Math.max(l.zoom, .01),
          J = 11 / le,
          pe = 3 / le,
          ce = ne.labelX ?? (ne.x1 + ne.x2) / 2,
          we = ne.labelY ?? (ne.y1 + ne.y2) / 2,
          X = ne.hideLine ? -14 / le : ne.orientation === "vertical" ? 0 : -8 / le,
          Z = !ne.hideLine && ne.orientation === "vertical" ? 8 / le : 0;
        return c.jsxs("g", {
          pointerEvents: "none",
          children: [!ne.hideLine && c.jsxs(c.Fragment, {
            children: [c.jsx("line", {
              x1: ne.x1,
              y1: ne.y1,
              x2: ne.x2,
              y2: ne.y2,
              stroke: Got,
              strokeWidth: 1,
              vectorEffect: "non-scaling-stroke",
              opacity: .95
            }), c.jsx("circle", {
              cx: ne.x1,
              cy: ne.y1,
              r: pe,
              fill: Got,
              opacity: .95
            }), c.jsx("circle", {
              cx: ne.x2,
              cy: ne.y2,
              r: pe,
              fill: Got,
              opacity: .95
            })]
          }), ne.label && c.jsx("text", {
            x: ce + Z,
            y: we + X,
            fill: "#f3f4f6",
            stroke: "#111111",
            strokeWidth: 3 / le,
            paintOrder: "stroke",
            fontSize: J,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
            textAnchor: "middle",
            dominantBaseline: "middle",
            children: ne.label
          })]
        }, de);
      }), B && (() => {
        const ne = o.get(B);
        if (!ne) return null;
        const de = DMe(ne, "output");
        return c.jsx(cne, {
          groupRef: O,
          fromX: de.x,
          fromY: de.y,
          isDark: h,
          zoom: l.zoom,
          strokeWidth: v,
          opacityPercent: _
        }, `wire-out-${B}`);
      })(), F && (() => {
        const ne = o.get(F);
        if (!ne) return null;
        const de = DMe(ne, "input");
        return c.jsx(cne, {
          groupRef: L,
          fromX: de.x,
          fromY: de.y,
          isDark: h,
          isReverse: !0,
          zoom: l.zoom,
          strokeWidth: v,
          opacityPercent: _
        }, `wire-in-${F}`);
      })(), N && G ? (() => {
        const ne = s.find(le => le.id === N);
        if (!ne) return null;
        const de = R5e(ne, K);
        return c.jsx(cne, {
          groupRef: O,
          fromX: de.x,
          fromY: de.y,
          isDark: h,
          zoom: l.zoom,
          strokeWidth: v,
          opacityPercent: _
        }, `wire-group-out-${N}`);
      })() : W.length > 0 ? c.jsx("g", {
        "data-wire-preview-layer": "multi-out",
        children: W.map((ne, de) => {
          const le = o.get(ne);
          if (!le) return null;
          const J = DMe(le, "output");
          return c.jsx(cne, {
            lineId: ne,
            fromX: J.x,
            fromY: J.y,
            isDark: h,
            zoom: l.zoom,
            strokeWidth: v,
            opacityPercent: _
          }, `wire-multi-out-${ne}-${de}`);
        })
      }, "wire-multi-out-layer") : null, Q.length > 0 ? c.jsx("g", {
        "data-wire-preview-layer": "multi-in",
        children: Q.map((ne, de) => {
          const le = o.get(ne);
          if (!le) return null;
          const J = DMe(le, "input");
          return c.jsx(cne, {
            lineId: ne,
            fromX: J.x,
            fromY: J.y,
            isDark: h,
            zoom: l.zoom,
            strokeWidth: v,
            opacityPercent: _
          }, `wire-multi-in-${ne}-${de}`);
        })
      }, "wire-multi-in-layer") : null]
    })]
  });
}

const CPi = g.memo(IPi);

function EPi(e) {
  return {
    staticConnections: e.staticConnections,
    canvasVisualConnections: e.canvasVisualConnections,
    visibleConnections: e.visibleConnections,
    forceStraightConnectionIds: e.forceStraightConnectionIds,
    highlightConnectionIds: e.highlightConnectionIds,
    staticConnectionIds: e.staticConnectionIds,
    connectionLayoutSignature: e.visibleConnectionLayoutSignature,
    connectionRenderTierById: e.connectionRenderTierById,
    flowConnectionIds: e.flowConnectionIds
  };
}

function TPi({
  plan: e,
  ...t
}) {
  return c.jsx(CPi, {
    ...t,
    ...EPi(e)
  });
}

const MPi = g.memo(function ({
    store: t,
    brushColor: n,
    brushWidth: r,
    eraserWidth: a
  }) {
    const i = g.useSyncExternalStore(t.subscribeDraft, t.getDraft, t.getDraft);
    if (!i) return null;
    const {
        points: o,
        input: s,
        mode: l
      } = i,
      d = o.length >= 2 && s.length >= 2;
    return c.jsxs("g", {
      "data-doodle-draft": !0,
      children: [d && l === "eraser" && c.jsx("path", {
        d: Cje(o),
        fill: "none",
        stroke: "rgba(239,68,68,0.55)",
        strokeWidth: a,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: .92,
        style: {
          pointerEvents: "none"
        }
      }), d && l === "brush" && !zkt(s) && c.jsx("path", {
        d: Cje(o),
        fill: "none",
        stroke: n,
        strokeWidth: r,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: .92,
        style: {
          pointerEvents: "none"
        }
      }), d && l === "brush" && zkt(s) && ahr(s, n, r).map((u, h) => c.jsx("path", {
        d: Cje(u.points),
        fill: "none",
        stroke: u.color,
        strokeWidth: u.width,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: .92,
        style: {
          pointerEvents: "none"
        }
      }, `doodle-draft-p-${h}`)), (s == null ? void 0 : s.length) === 1 && (o == null ? void 0 : o.length) === 1 && (() => {
        const u = s[0],
          h = l === "eraser",
          p = h ? a : Math.max(.6, r * rhr(u.pressure));
        return c.jsx("path", {
          d: `M ${u.x} ${u.y} L ${u.x + .6} ${u.y}`,
          fill: "none",
          stroke: h ? "rgba(239,68,68,0.55)" : n,
          strokeWidth: p,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: .92,
          style: {
            pointerEvents: "none"
          }
        });
      })()]
    });
  }),
  PPi = g.memo(function ({
    selecting: t,
    store: n,
    selectionBounds: r,
    selectedIds: a,
    selectionColor: i,
    isDark: o,
    setSelectionColor: s,
    setStrokes: l,
    onBeginMove: d,
    onBeginResize: u,
    onCreateArtboard: h
  }) {
    const p = g.useSyncExternalStore(n.subscribe, n.getSnapshot, n.getSnapshot),
      m = p.marquee,
      f = p.bounds || r;
    return c.jsxs(c.Fragment, {
      children: [t && m && c.jsx("div", {
        "data-doodle-marquee": !0,
        className: "absolute pointer-events-none z-[5]",
        style: {
          left: Math.min(m.x0, m.x1),
          top: Math.min(m.y0, m.y1),
          width: Math.abs(m.x1 - m.x0),
          height: Math.abs(m.y1 - m.y0),
          border: "1px dashed rgba(59,130,246,0.95)",
          background: "rgba(59,130,246,0.06)"
        }
      }), t && f && a.length > 0 && c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          "data-doodle-selection-bounds": !0,
          className: "absolute z-[8]",
          style: {
            left: f.minX,
            top: f.minY,
            width: Math.max(0, f.maxX - f.minX),
            height: Math.max(0, f.maxY - f.minY),
            pointerEvents: "none"
          },
          children: [c.jsx("div", {
            className: "absolute inset-0 rounded-sm border pointer-events-none",
            style: {
              borderColor: o ? "rgba(250,250,250,0.85)" : "rgba(23,23,23,0.88)"
            }
          }), c.jsx("div", {
            className: "absolute cursor-move z-[1]",
            style: {
              inset: 8,
              pointerEvents: "auto"
            },
            onMouseDown: y => d(y, a)
          }), ["nw", "ne", "se", "sw"].map(y => {
            const b = y === "nw" || y === "se" ? "nwse-resize" : "nesw-resize";
            return c.jsx("div", {
              "data-doodle-resize": y,
              className: "absolute w-2.5 h-2.5 bg-white border border-zinc-900 box-border z-[2]",
              style: {
                left: y.includes("w") ? 0 : "100%",
                top: y.includes("n") ? 0 : "100%",
                transform: "translate(-50%, -50%)",
                cursor: b,
                pointerEvents: "auto"
              },
              onMouseDown: v => u(v, y, a, f)
            }, y);
          })]
        }), c.jsx(rPi, {
          visible: !0,
          isDark: o,
          bounds: {
            x: f.minX,
            y: f.minY,
            width: Math.max(0, f.maxX - f.minX),
            height: Math.max(0, f.maxY - f.minY)
          },
          selectionColor: i,
          onSelectionColorChange: y => {
            s(y), l(b => b.map(v => a.includes(v.id) ? {
              ...v,
              color: y
            } : v));
          },
          onCreateArtboard: h
        })]
      })]
    });
  }),
  RPi = g.memo(function ({
    stroke: t,
    selecting: n,
    store: r,
    setSelectedIds: a
  }) {
    const i = g.useCallback(() => r.getPoints(t.id), [r, t.id]),
      s = g.useSyncExternalStore(r.subscribe, i, i) || t.points;
    return c.jsx("path", {
      "data-doodle-stroke-id": t.id,
      d: Cje(s),
      fill: "none",
      stroke: t.color,
      strokeWidth: t.width,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        pointerEvents: n ? "stroke" : "none",
        cursor: n ? "pointer" : void 0
      },
      onMouseDown: l => {
        if (!n || l.button !== 0) return;
        l.stopPropagation(), l.preventDefault();
        const d = l.ctrlKey || l.metaKey;
        a(d ? u => u.includes(t.id) ? u.filter(h => h !== t.id) : [...u, t.id] : [t.id]);
      }
    });
  });

function NPi({
  active: e,
  subTool: t,
  passthrough: n,
  visibleStrokes: r,
  draftStore: a,
  brushColor: i,
  brushWidth: o,
  eraserWidth: s,
  selectionStore: l,
  selectionBounds: d,
  selectedIds: u,
  selectionColor: h,
  isDark: p,
  setSelectedIds: m,
  setSelectionColor: f,
  setStrokes: y,
  onBeginMove: b,
  onBeginResize: v,
  onCreateArtboard: _
}) {
  const w = e && t === "select";
  return c.jsxs(c.Fragment, {
    children: [c.jsx("svg", {
      className: "absolute left-0 top-0 overflow-visible",
      style: {
        width: 1,
        height: 1,
        zIndex: n ? 120 : 0,
        pointerEvents: "none"
      },
      "aria-hidden": !0,
      children: c.jsxs("g", {
        children: [r.map(k => c.jsx(RPi, {
          stroke: k,
          selecting: w,
          store: l,
          setSelectedIds: m
        }, k.id)), c.jsx(MPi, {
          store: a,
          brushColor: i,
          brushWidth: o,
          eraserWidth: s
        })]
      })
    }), c.jsx(PPi, {
      selecting: w,
      store: l,
      selectionBounds: d,
      selectedIds: u,
      selectionColor: h,
      isDark: p,
      setSelectionColor: f,
      setStrokes: y,
      onBeginMove: b,
      onBeginResize: v,
      onCreateArtboard: _
    })]
  });
}

const jPi = g.memo(NPi);

function DPi(e) {
  const t = e.width || 320,
    n = e.height || 200;
  return {
    left: e.x + t / 2,
    top: e.y + n / 2,
    size: Math.max(140, Math.min(600, Math.max(t, n) * 1.35))
  };
}

function LPi(e, t) {
  if (!t) return {
    left: Math.min(e.startX, e.endX),
    top: Math.min(e.startY, e.endY),
    width: Math.abs(e.endX - e.startX),
    height: Math.abs(e.endY - e.startY)
  };
}

function OPi({
  nodes: e,
  nodesGeometryMap: t,
  groups: n,
  selectedNodeIds: r,
  isSelecting: a,
  showBoxSelectBounds: i,
  showCollectionPopup: o,
  isDark: s,
  view: l,
  batchConnectSourceIds: d,
  batchConnectionHandleHidden: u,
  groupConnectionBlocked: h,
  connectingGroupId: p,
  focusRippleNodeId: m,
  focusRippleNonce: f,
  collectedNodeIds: y,
  isDownloading: b,
  canDemoSelected: v,
  onDragAreaMouseDown: _,
  onStartBatchConnect: w,
  onCreateGroup: k,
  onStackCollapse: A,
  onArrangeNodes: S,
  onExpandCollection: C,
  onClearSelection: I,
  updateCollectionPosition: E,
  onCollectionDragFrame: M,
  onCollectionDragStart: T,
  onCollectionDragEnd: P,
  onDeleteStack: R,
  onStartGroupConnect: j,
  onGroupSelect: B,
  onDownloadSelected: F,
  onDemoSelected: N,
  onSaveToMaterialLibrary: G
}) {
  const z = m && !y.has(m) ? t.get(m) : null,
    V = z ? DPi(z) : null;
  return c.jsxs(c.Fragment, {
    children: [c.jsx(PIi, {
      nodes: e,
      selectedNodeIds: r,
      isSelecting: a,
      visible: i,
      isDark: s,
      onDragAreaMouseDown: _,
      batchConnectSourceIds: d,
      hideBatchConnectPlus: u,
      zoom: l.zoom,
      onStartBatchConnect: w
    }), m && V && c.jsx("div", {
      className: "node-focus-ripple",
      style: {
        left: V.left,
        top: V.top,
        width: V.size,
        height: V.size,
        zIndex: 80,
        transform: "translate(-50%, -50%)"
      }
    }, `node-focus-ripple-${m}-${f}`), c.jsx(TIi, {
      view: l,
      nodes: e,
      groups: n,
      selectedNodeIds: r,
      isSelecting: a,
      showCollectionPopup: o,
      onCreateGroup: k,
      onStackCollapse: A,
      onArrangeNodes: S,
      onExpand: C,
      onClearSelection: I,
      updateCollectionPosition: E,
      onCollectionDragFrame: M,
      onCollectionDragStart: T,
      onCollectionDragEnd: P,
      onDeleteStack: R,
      onStartGroupConnect: j,
      connectingGroupId: p,
      onGroupSelect: B,
      blockGroupConnect: h,
      isDark: s,
      onDownloadSelected: F,
      isDownloading: b,
      onDemoSelected: N,
      canDemoSelected: v,
      onSaveToMaterialLibrary: G
    })]
  });
}

function BPi({
  groups: e,
  nodes: t,
  view: n,
  selectedGroupId: r,
  isDark: a,
  isDownloading: i,
  connectingGroupId: o,
  groupConnectionBlocked: s,
  selectionBox: l,
  selectionBoxDivRef: d,
  isSelecting: u,
  onGroupSelect: h,
  onGroupResize: p,
  onGroupNameChange: m,
  onGroupResizeStart: f,
  onGroupResizeEnd: y,
  onStartGroupConnect: b,
  onGroupColorChange: v,
  onGroupDelete: _,
  onGroupExecute: w,
  onArrangeGroup: k,
  onDownloadGroup: A,
  onDemoGroup: S
}) {
  return c.jsxs(c.Fragment, {
    children: [c.jsx(sIi, {
      groups: e,
      nodes: t,
      view: n,
      selectedGroupId: r,
      onGroupSelect: h,
      isDark: a,
      onGroupResize: p,
      onGroupNameChange: m,
      onGroupResizeStart: f,
      onGroupResizeEnd: y,
      onStartGroupConnect: b,
      connectingGroupId: o,
      blockGroupConnect: s
    }), c.jsx(uIi, {
      groups: e,
      nodes: t,
      view: n,
      selectedGroupId: r,
      onGroupNameChange: m,
      onGroupColorChange: v,
      onGroupDelete: _,
      onGroupExecute: w,
      onArrangeGroup: k,
      onDownloadGroup: A,
      onDemoGroup: S,
      isDark: a,
      isDownloading: i
    }, `group-toolbar-${a ? "dark" : "light"}`), l && c.jsx("div", {
      ref: d,
      className: `absolute pointer-events-none z-[4] ${Wer}`,
      "data-box-select-marquee": !0,
      style: LPi(l, u)
    })]
  });
}

const FPi = g.memo(OPi),
  zPi = g.memo(BPi),
  Rst = [14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64, 72],
  UPi = ({
    text: e,
    isDark: t,
    activeDropdown: n,
    setActiveDropdown: r,
    onPatch: a
  }) => {
    on();
    const i = Ovi(),
      o = n !== void 0 ? n : i,
      s = r ?? hP,
      l = g.useRef(null);
    Qp(l, "50% 100%", !0);
    const d = Rst.reduce((f, y) => Math.abs(y - e.fontSize) < Math.abs(f - e.fontSize) ? y : f, Rst[0]),
      u = e.fontFamily ?? "sans",
      h = `canvas-text-${e.id}`,
      p = mJ({
        x: e.x,
        y: e.y,
        width: e.width,
        height: e.height
      }),
      m = f => `w-8 h-8 rounded-md ${f ? t ? "bg-zinc-700" : "bg-zinc-300" : ""}`;
    return c.jsx("div", {
      className: "absolute z-[70] pointer-events-auto",
      style: p,
      onMouseDown: f => f.stopPropagation(),
      onClick: f => f.stopPropagation(),
      children: c.jsx("div", {
        ref: l,
        style: {
          transition: "none",
          willChange: "transform"
        },
        children: c.jsxs("div", {
          className: `canvas-text-toolbar-fast-tooltip flex items-center gap-2 px-3 py-2 rounded-2xl border ${qer(t)} ${t ? "text-zinc-100" : "text-zinc-800"}`,
          children: [c.jsx(qs, {
            scopeId: h,
            dropdownType: "fontSize",
            value: String(d),
            options: Rst.map(f => ({
              value: String(f),
              label: String(f)
            })),
            isDark: t,
            activeDropdown: o,
            setActiveDropdown: s,
            onSelect: f => a({
              fontSize: Number(f)
            }),
            menuPlacement: "below",
            minMenuWidth: 72,
            maxMenuHeight: 280,
            className: "w-[4.5rem]"
          }), c.jsx(qs, {
            scopeId: h,
            dropdownType: "fontFamily",
            value: u,
            options: [{
              value: "sans",
              label: "无衬线"
            }, {
              value: "serif",
              label: "衬线"
            }, {
              value: "mono",
              label: "等宽"
            }, {
              value: "script",
              label: "手写"
            }],
            isDark: t,
            activeDropdown: o,
            setActiveDropdown: s,
            onSelect: f => a({
              fontFamily: f
            }),
            menuPlacement: "below",
            minMenuWidth: 88,
            className: "w-[5.5rem]"
          }), c.jsx("input", {
            type: "color",
            value: e.color,
            onChange: f => a({
              color: f.target.value
            }),
            className: "w-8 h-8 p-0 border-0 bg-transparent cursor-pointer",
            "data-tip": x("颜色")
          }), c.jsx("button", {
            type: "button",
            className: `${m(e.bold)} text-base font-bold`,
            onClick: () => a({
              bold: !e.bold
            }),
            "data-tip": x("粗体"),
            children: "B"
          }), c.jsx("button", {
            type: "button",
            className: `${m(e.italic)} text-base italic`,
            onClick: () => a({
              italic: !e.italic
            }),
            "data-tip": x("斜体"),
            children: "I"
          }), c.jsx("button", {
            type: "button",
            className: `${m(e.underline)} text-base underline`,
            onClick: () => a({
              underline: !e.underline
            }),
            "data-tip": x("下划线"),
            children: "U"
          }), c.jsx("button", {
            type: "button",
            className: `${m(e.strike)} text-base line-through`,
            onClick: () => a({
              strike: !e.strike
            }),
            "data-tip": x("删除线"),
            children: "S"
          }), c.jsx("button", {
            type: "button",
            className: `${m(e.align === "left")} text-sm`,
            onClick: () => a({
              align: "left"
            }),
            "data-tip": x("左对齐"),
            children: x("左")
          }), c.jsx("button", {
            type: "button",
            className: `${m(e.align === "center")} text-sm`,
            onClick: () => a({
              align: "center"
            }),
            "data-tip": x("居中"),
            children: x("中")
          }), c.jsx("button", {
            type: "button",
            className: `${m(e.align === "right")} text-sm`,
            onClick: () => a({
              align: "right"
            }),
            "data-tip": x("右对齐"),
            children: x("右")
          })]
        })
      })
    });
  };

function $Pi(e) {
  return `${e.underline ? "underline" : ""} ${e.strike ? "line-through" : ""}`.trim() || "none";
}

function GPi(e) {
  return e.isEditing || e.isSelected || e.isHovered || e.isDragging;
}

function VPi({
  allTextBoxes: e,
  visibleTextBoxes: t,
  selectedTextId: n,
  editingTextId: r,
  isDark: a,
  textTool: i,
  setTextBoxes: o,
  setSelectedTextId: s,
  setEditingTextId: l
}) {
  on();
  const [d, u] = g.useState(null),
    h = g.useSyncExternalStore(i.store.subscribe, i.store.getDraggingId, i.store.getDraggingId),
    p = e.find(m => m.id === n);
  return c.jsxs(c.Fragment, {
    children: [p && !r && c.jsx(UPi, {
      text: p,
      isDark: a,
      onPatch: m => {
        o(f => f.map(y => y.id === n ? {
          ...y,
          ...m
        } : y));
      }
    }), t.map(m => {
      const f = r === m.id,
        y = n === m.id,
        b = GPi({
          isEditing: f,
          isSelected: y,
          isHovered: d === m.id,
          isDragging: h === m.id
        }),
        v = $Pi(m),
        _ = {
          fontSize: `${m.fontSize}px`,
          fontFamily: jEi(m.fontFamily),
          color: m.color,
          fontWeight: m.bold ? 700 : 400,
          fontStyle: m.italic ? "italic" : "normal",
          textDecoration: v,
          textAlign: m.align
        };
      return c.jsx("div", {
        "data-canvas-text-box-id": m.id,
        className: `absolute z-[9] rounded-sm ${b ? "border" : "border border-transparent"} ${a ? b ? "border-white/70 bg-white/10" : "bg-transparent" : b ? "border-black/60 bg-black/5" : "bg-transparent"}`,
        style: {
          left: m.x,
          top: m.y,
          width: m.width,
          height: m.height
        },
        onMouseEnter: () => u(m.id),
        onMouseLeave: () => u(w => w === m.id ? null : w),
        onMouseDown: w => {
          w.button === 0 && (w.stopPropagation(), r !== m.id && (w.preventDefault(), i.beginDrag(m, w.currentTarget, {
            x: w.clientX,
            y: w.clientY
          })));
        },
        onClick: w => {
          w.stopPropagation(), s(m.id);
        },
        onDoubleClick: w => {
          w.stopPropagation(), s(m.id), l(m.id);
        },
        children: f ? c.jsx("textarea", {
          "data-canvas-text-id": m.id,
          value: m.text,
          onChange: w => {
            const k = w.target.value;
            o(A => A.map(S => S.id === m.id ? {
              ...S,
              text: k
            } : S));
          },
          onBlur: () => l(w => w === m.id ? null : w),
          className: `canvas-text-input-cursor canvas-text-editor-minimal w-full h-full resize-none bg-transparent border-0 shadow-none px-2 py-1.5 text-[14px] leading-[1.15] outline-none ${a ? "text-zinc-100 placeholder-zinc-400" : "text-zinc-900 placeholder-zinc-500"}`,
          placeholder: x("输入文本..."),
          style: _
        }) : c.jsx("div", {
          className: `w-full h-full px-2 py-1.5 leading-[1.15] whitespace-pre-wrap break-words overflow-hidden select-text ${a ? "text-zinc-100" : "text-zinc-900"}`,
          style: _,
          children: m.text || ""
        })
      }, m.id);
    })]
  });
}

const HPi = g.memo(VPi);

function WPi(e, t) {
  return t ? (t.cropSelectModeNodeId === e ? 1 : 0) | (t.markerModeNodeId === e ? 2 : 0) | (t.doodleDrawingNodeId === e ? 4 : 0) | (t.focusEditAnalyzingNodeId === e ? 8 : 0) : 0;
}

function qPi(e, t) {
  return e.modelConfigState !== t.modelConfigState ? !1 : e.nodeId === t.nodeId && e.nodeDocument === t.nodeDocument && e.epoch === t.epoch && e.nodeDirtyVersion === t.nodeDirtyVersion && (e.toolFlags ?? 0) === (t.toolFlags ?? 0) && e.isSelected === t.isSelected && e.nodeQuality === t.nodeQuality && e.isVisible === t.isVisible && Xur(e.viewportState, t.viewportState) && e.connectionDialState === t.connectionDialState && e.connectionSignature === t.connectionSignature && e.isConnected === t.isConnected && e.isConnectDuplicateBlocked === t.isConnectDuplicateBlocked && e.groupId === t.groupId && e.isInGroup === t.isInGroup && e.isPreviewCollapsed === t.isPreviewCollapsed && e.hasOpenDropdown === t.hasOpenDropdown && e.clipboardPromptReplaceTipNonce === t.clipboardPromptReplaceTipNonce && e.promptLibraryState === t.promptLibraryState && e.promptLibraryCollapsedState === t.promptLibraryCollapsedState && e.promptLibraryFormState === t.promptLibraryFormState && e.focusEditAnalysisState === t.focusEditAnalysisState;
}

function KPi({
  nodeId: e,
  nodeDocument: t,
  nodeQuality: n,
  isVisible: r,
  viewportState: a,
  render: i
}) {
  const o = v8i(t, e),
    s = o9(e);
  return o ? c.jsx(c.Fragment, {
    children: i(o, s, n, r, a)
  }) : null;
}

const QPi = g.memo(KPi, qPi),
  YPi = 384,
  Tye = new Map();

function uun(e, t, n, r, a, i) {
  const o = Math.max(a / n, i / r),
    s = n * o,
    l = r * o;
  e.drawImage(t, (a - s) / 2, (i - l) / 2, s, l);
}

function XPi(e, t) {
  if (Tye.size >= YPi) {
    const n = Tye.keys().next().value;
    n !== void 0 && Tye.delete(n);
  }
  Tye.set(e, t);
}

function JPi({
  node: e,
  isDark: t,
  isSelected: n = !1,
  hideHeaderLabel: r = !1,
  onMouseDown: a,
  onMouseUp: i,
  connectorCallbacks: o,
  onHideConnectionDial: s,
  isNodeDragging: l = !1
}) {
  on();
  const d = e.width ?? 260,
    u = e.height ?? 200,
    h = K2(e) === "audio",
    p = h ? "" : RIt(xf(e) || _E(e.id)),
    m = HSi(e),
    f = g.useRef(null),
    y = g.useRef(null),
    b = g.useRef(null),
    v = g.useCallback(w => {
      const k = b.current;
      w && (k == null || k.style.setProperty("--dense-connector-scale", String(EJe(Cd().zoom)))), hur(k, w);
    }, []),
    _ = our({
      setHover: v,
      begin: o == null ? void 0 : o.onBeginConnectGesture,
      hideDial: s,
      startInput: w => o == null ? void 0 : o.onStartConnectFromInput(w),
      startOutput: w => o == null ? void 0 : o.onStartConnectFromOutput(w)
    });
  return g.useLayoutEffect(() => {
    const w = y.current;
    if (w) return Qdr(w);
  }, []), g.useLayoutEffect(() => {
    const w = f.current;
    if (!w || !p) return;
    const k = 96,
      A = d > 0 && u > 0 ? d / u : 1,
      S = A >= 1 ? k : Math.max(1, Math.round(k * A)),
      C = A >= 1 ? Math.max(1, Math.round(k / A)) : k;
    w.width = S, w.height = C;
    const I = w.getContext("2d", {
      alpha: !1
    });
    if (!I) return;
    I.imageSmoothingEnabled = !0, I.imageSmoothingQuality = "low", I.fillStyle = _et(e.type, t), I.fillRect(0, 0, S, C);
    const E = `${p}|${S}x${C}|${e.type}|${t}`,
      M = Tye.get(E);
    if (M) {
      I.drawImage(M, 0, 0, S, C);
      return;
    }
    let T = !1;
    const P = new Image();
    return P.decoding = "async", P.onload = () => {
      if (T || !P.naturalWidth || !P.naturalHeight) return;
      uun(I, P, P.naturalWidth, P.naturalHeight, S, C);
      const R = document.createElement("canvas");
      R.width = S, R.height = C;
      const j = R.getContext("2d", {
        alpha: !1
      });
      j && (j.imageSmoothingEnabled = !0, j.imageSmoothingQuality = "low", j.fillStyle = _et(e.type, t), j.fillRect(0, 0, S, C), uun(j, P, P.naturalWidth, P.naturalHeight, S, C), XPi(E, R));
    }, P.src = p, () => {
      T = !0, P.onload = null, P.onerror = null, P.src = "";
    };
  }, [p, d, u, e.type, t]), c.jsxs("div", {
    ref: b,
    "data-node-id": e.id,
    "data-node-type": e.type,
    "data-dense-overview-stub": "",
    "data-render-quality": "low",
    className: `absolute rounded-2xl node-wrapper ${n ? "node-selected-border" : ""} ${l ? "node-dragging-self" : ""}`,
    style: {
      transform: `translate(${e.x}px, ${e.y}px)`,
      width: d,
      height: u,
      background: _et(e.type, t),
      border: n ? void 0 : t ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.18)",
      zIndex: n ? 15 : 10,
      overflow: "visible",
      pointerEvents: "auto"
    },
    onMouseDown: a,
    onMouseUp: i,
    onMouseEnter: () => v(!0),
    onMouseLeave: () => v(!1),
    onPointerDown: e.type === "gen-image" || e.type === "gen-video" ? w => {
      Our(), zlr(e.id, w);
    } : void 0,
    children: [r || !m ? null : c.jsxs("div", {
      ref: y,
      "data-dense-overview-label": "",
      className: t ? "is-dark" : void 0,
      children: [Skt(e, t), c.jsx("span", {
        children: m
      })]
    }), c.jsx("div", {
      "data-dense-overview-media": "",
      children: h ? c.jsx("div", {
        className: "absolute inset-x-3 inset-y-5 flex items-end justify-between gap-px",
        "aria-hidden": !0,
        children: Array.from({
          length: 18
        }, (w, k) => c.jsx("span", {
          className: `w-[3px] rounded-full ${t ? "bg-zinc-500" : "bg-zinc-400"}`,
          style: {
            height: `${22 + k * 7 % 28}%`
          }
        }, k))
      }) : p ? c.jsx("canvas", {
        ref: f,
        className: "absolute inset-0 h-full w-full object-cover pointer-events-none select-none",
        style: {
          imageRendering: "auto"
        },
        "aria-hidden": !0
      }) : null
    }), o && !BUe(e.type) && ["input", "output"].map(w => w === "output" && rur(e.type) ? null : c.jsx("button", {
      type: "button",
      tabIndex: -1,
      className: `connector qiaodoumayi-node-handle node-${w}-connector-hit dense-overview-connector`,
      "aria-label": x(w === "input" ? "从左侧拖拽连接上游节点" : "从右侧拖拽连接下游节点"),
      style: {
        color: t ? "#a1a1aa" : "#71717a"
      },
      onPointerDown: k => _(k, w),
      onClick: k => k.stopPropagation()
    }, w))]
  });
}

function ZPi(e, t) {
  return e.isDark === t.isDark && e.isSelected === t.isSelected && e.hideHeaderLabel === t.hideHeaderLabel && e.onMouseDown === t.onMouseDown && e.onMouseUp === t.onMouseUp && e.connectorCallbacks === t.connectorCallbacks && e.onHideConnectionDial === t.onHideConnectionDial && e.isNodeDragging === t.isNodeDragging && e.node.id === t.node.id && e.node.type === t.node.type && e.node.x === t.node.x && e.node.y === t.node.y && e.node.width === t.node.width && e.node.height === t.node.height && e.node.nodeName === t.node.nodeName && e.node.prompt === t.node.prompt && e.node.content === t.node.content && e.node.thumbnailUrl === t.node.thumbnailUrl && e.node.settings === t.node.settings;
}

const e9i = g.memo(JPi, ZPi),
  t9i = new Set(["input-image", "text-node", "preview", "gen-image", "gen-video"]),
  n9i = new Set(["storyboard-node", "storyboard-chart-node", "video-analyze", "shot-breakdown", "script-parse", "video-input", "video-timeline"]),
  r9i = new Set(["novel-input", "extract-characters-scenes", "character-description", "scene-description", "generate-character-image", "generate-scene-image", "generate-character-video", "generate-scene-video", "create-character", "create-scene"]),
  a9i = new Set(["image-compare", "image-tile", "inpaint-crop", "inpaint-stitch", "local-save", "global-perspective", "jimeng-super-resolution", "topaz-upscale", "image-wash", "fal-rembg", "virtual-try-on"]),
  i9i = new Set(["motion-control", "video-relight", "camera-movement", "professional-camera", "gen-music", "gen-speech", "custom-agent", "canvas-node", "rh-app", "rh-comfy", "table-editor-node", "doodle-canvas", "director-3d", "gen-3d", "three-d-studio"]);

function o9i(e) {
  return t9i.has(e) ? "core" : n9i.has(e) ? "storyboard" : r9i.has(e) ? "legacy" : a9i.has(e) ? "media" : i9i.has(e) ? "tools" : null;
}

const s9i = g.lazy(() => Ie(() => Promise.resolve().then(() => fvr), void 0, import.meta.url).then(e => ({
    default: e.CoreNodesGroup
  }))),
  l9i = g.lazy(() => Ie(() => Promise.resolve().then(() => wvo), void 0, import.meta.url).then(e => ({
    default: e.StoryboardNodesGroup
  }))),
  c9i = g.lazy(() => Ie(() => Promise.resolve().then(() => Rvo), void 0, import.meta.url).then(e => ({
    default: e.LegacyGenNodesGroup
  }))),
  d9i = g.lazy(() => Ie(() => Promise.resolve().then(() => Ewo), void 0, import.meta.url).then(e => ({
    default: e.MediaEditNodesGroup
  }))),
  u9i = g.lazy(() => Ie(() => Promise.resolve().then(() => p2o), void 0, import.meta.url).then(e => ({
    default: e.IntegrationNodesGroup
  }))),
  h9i = {
    core: s9i,
    storyboard: l9i,
    legacy: c9i,
    media: d9i,
    tools: u9i
  },
  p9i = e => e ? "text-zinc-600" : "text-zinc-400";

function m9i(e, t) {
  const n = p9i(t);
  switch (e) {
    case "gen-image":
      return c.jsx(tw, {
        size: 44,
        className: n
      });
    case "gen-video":
      return c.jsx(Oo, {
        size: 44,
        className: n
      });
    case "preview":
    case "input-image":
      return c.jsx(lo, {
        className: "w-8 h-8"
      });
    case "video-input":
      return c.jsx(Oo, {
        className: "w-8 h-8"
      });
    case "video-analyze":
    case "shot-breakdown":
      return c.jsx(fmt, {
        className: "w-8 h-8"
      });
    case "script-parse":
      return c.jsx(fmt, {
        className: "w-8 h-8"
      });
    default:
      return c.jsx(lo, {
        className: "w-6 h-6"
      });
  }
}

const f9i = new Set(["gen-image", "gen-video"]),
  g9i = {
    preview: "预览窗口",
    "input-image": "图片输入",
    "text-node": "文字节点",
    "video-input": "视频输入",
    "video-analyze": "视频拆解",
    "shot-breakdown": "逐帧拉片",
    "script-parse": "脚本解析",
    "storyboard-node": "分镜表",
    "storyboard-chart-node": "分镜图表"
  },
  y9i = new Set(["gen-image", "gen-video", "preview", "input-image", "video-input", "topaz-upscale", "jimeng-super-resolution", "fal-rembg", "motion-control", "virtual-try-on", "video-relight"]);

function b9i({
  node: e,
  isDark: t
}) {
  on();
  const n = _E(e.id);
  if (n.trim() && y9i.has(e.type)) return c.jsx("div", {
    className: "h-full w-full",
    children: c.jsx(Tpe, {
      src: n,
      isDark: t,
      nodeType: e.type,
      nodeId: e.id,
      worldWidth: e.width,
      worldHeight: e.height
    })
  });
  const r = m9i(e.type, t),
    a = g9i[e.type] ?? e.type,
    i = f9i.has(e.type),
    o = i ? `w-full h-full flex flex-col items-center justify-center rounded-2xl overflow-hidden ${t ? "bg-[#1f1f1f]" : "bg-white"}` : `w-full h-full flex flex-col items-center justify-center gap-2 p-4 rounded-2xl overflow-hidden ${t ? "bg-[#1f1f1f]/80 text-zinc-400" : "bg-zinc-100 text-zinc-500"}`;
  return c.jsxs("div", {
    className: o,
    children: [c.jsx("div", {
      className: i ? "" : "opacity-40 animate-pulse",
      children: r
    }), !i && c.jsx("span", {
      className: "text-xs font-medium truncate max-w-full",
      children: a
    }), e.isGenerating && c.jsx("span", {
      className: "text-[10px] text-blue-500",
      children: x("生成中...")
    })]
  });
}

function v9i() {
  Ie(() => Promise.resolve().then(() => fvr), void 0, import.meta.url), w9i();
}

let hun = !1;

function w9i() {
  var n;
  if (hun) return;
  hun = !0;
  const e = () => {
      Ie(() => Promise.resolve().then(() => Fho), void 0, import.meta.url).then(r => r.prefetchGenFullBottomToolbar());
    },
    t = globalThis;
  typeof t.requestIdleCallback == "function" ? t.requestIdleCallback(e, {
    timeout: 800
  }) : (n = t.setTimeout) == null || n.call(t, e, 0);
}

function x9i(e) {
  return {
    ...e.document,
    ...e.connections,
    ...e.generation,
    ...e.storyboard,
    ...e.libraries,
    ...e.media,
    ...e.presentation,
    ...e.interaction
  };
}

const pun = new Set(["input-image", "text-node", "video-input", "custom-agent", "gen-image", "gen-video", "gen-music", "gen-speech", "script-parse", "image-compare", "image-tile"]),
  LMe = (e, t) => e === t ? !0 : JSON.stringify(e) === JSON.stringify(t);

function _9i(e, t, n) {
  const r = x9i(e.contentServices),
    a = {
      node: e.node,
      connectionSignature: e.connectionSignature,
      renderQuality: e.renderQuality,
      mediaContentInView: e.mediaContentInView,
      generationHistory: e.generationHistory,
      promptLibraryEditorOpen: e.promptLibraryEditorOpen,
      setPromptLibraryEditorOpen: e.setPromptLibraryEditorOpen,
      nodeDirtyVersion: e.nodeDirtyVersion,
      isGenerationTimerActive: e.isGenerationTimerActive,
      boxSelectLightShell: e.boxSelectLightShell,
      focusEditActive: e.focusEditActive,
      focusEditActiveSourceNodeId: e.focusEditActiveSourceNodeId,
      onToggleFocusEdit: e.onToggleFocusEdit
    };
  return r.activeDropdown !== void 0 && r.setActiveDropdown ? {
    ...r,
    ...a
  } : {
    ...r,
    ...a,
    activeDropdown: t,
    setActiveDropdown: n
  };
}

function k9i(e, t) {
  var m, f, y, b;
  const n = e.contentServices.generation,
    r = t.contentServices.generation,
    a = e.contentServices.presentation,
    i = t.contentServices.presentation,
    o = e.contentServices.interaction,
    s = t.contentServices.interaction,
    l = e.contentServices.libraries,
    d = t.contentServices.libraries,
    u = e.contentServices.document,
    h = t.contentServices.document;
  if ((e.node.type === "gen-image" || e.node.type === "gen-video") && (n.apiConfigs !== r.apiConfigs || n.genNodeApiConfigs !== r.genNodeApiConfigs || n.apiStatus !== r.apiStatus || n.globalApiKey !== r.globalApiKey) || e.nodeDirtyVersion !== t.nodeDirtyVersion) return !1;
  if (pun.has(e.node.type) || pun.has(t.node.type)) {
    const v = o.selectedNodeId === e.node.id,
      _ = s.selectedNodeId === t.node.id;
    if (v !== _) return !1;
  }
  return !(e.node.id !== t.node.id || e.node.type !== t.node.type || e.node.content !== t.node.content || e.node.prompt !== t.node.prompt || e.node.nodeName !== t.node.nodeName || e.node.isGenerating !== t.node.isGenerating || e.node._expandPending !== t.node._expandPending || e.node.errorMsg !== t.node.errorMsg || u.documentSession !== h.documentSession || !(e.node.type === "text-node" && t.node.type === "text-node") && (e.node.x !== t.node.x || e.node.y !== t.node.y) || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.selectedPreviewImage !== t.node.selectedPreviewImage || !LMe(e.node.previewMjImages, t.node.previewMjImages) || !LMe(e.node.settings, t.node.settings) || a.isDark !== i.isDark || a.isCompactMode !== i.isCompactMode || a.isCompactUiMode !== i.isCompactUiMode || a.hideAllInputImagePreviews !== i.hideAllInputImagePreviews || a.enableGenerationNodeAnimation !== i.enableGenerationNodeAnimation || a.showStartGenerateButton !== i.showStartGenerateButton || e.renderQuality !== t.renderQuality || e.boxSelectLightShell !== t.boxSelectLightShell || e.mediaContentInView !== t.mediaContentInView || e.isGenerationTimerActive !== t.isGenerationTimerActive || (e.node.type === "gen-image" || e.node.type === "gen-video" || t.node.type === "gen-image" || t.node.type === "gen-video") && uxe(e.generationHistory, e.node.id) !== uxe(t.generationHistory, t.node.id) || o.storyboardCanvasPickTarget !== s.storyboardCanvasPickTarget || o.compactRefCanvasPickTargetId !== s.compactRefCanvasPickTargetId || e.focusEditActive !== t.focusEditActive || e.focusEditActiveSourceNodeId !== t.focusEditActiveSourceNodeId || a.notifyCanvas !== i.notifyCanvas || (o.activeDropdown !== void 0 || s.activeDropdown !== void 0) && (((m = o.activeDropdown) == null ? void 0 : m.nodeId) !== ((f = s.activeDropdown) == null ? void 0 : f.nodeId) || ((y = o.activeDropdown) == null ? void 0 : y.type) !== ((b = s.activeDropdown) == null ? void 0 : b.type)) || l.promptLibraryCollapsed !== d.promptLibraryCollapsed || e.promptLibraryEditorOpen !== t.promptLibraryEditorOpen || l.promptLibrary !== d.promptLibrary || l.promptLibraryForm !== d.promptLibraryForm || n.showHuyaModels !== r.showHuyaModels || n.expandImageConfigs !== r.expandImageConfigs || (e.node.type === "video-input" || t.node.type === "video-input") && (!LMe(e.node.frames, t.node.frames) || !LMe(e.node.selectedKeyframes, t.node.selectedKeyframes) || e.node.extractingFrames !== t.node.extractingFrames) || e.connectionSignature !== t.connectionSignature);
}

const A9i = new Set(["gen-image", "gen-video", "motion-control", "virtual-try-on", "video-relight", "preview", "storyboard-chart-node", "video-input", "video-timeline", "video-analyze", "shot-breakdown", "script-parse", "input-image", "text-node", "rh-app", "rh-comfy", "jimeng-super-resolution", "topaz-upscale", "image-wash", "fal-rembg", "global-perspective", "gen-3d", "three-d-studio"]),
  S9i = new Set(["preview", "gen-image", "gen-video", "video-input", "input-image", "topaz-upscale", "fal-rembg", "virtual-try-on"]),
  I9i = e => {
    const {
        node: t,
        renderQuality: n = "high",
        contentServices: r
      } = e,
      {
        document: a,
        generation: i,
        interaction: o,
        presentation: s
      } = r;
    sPi({
      getNodes: () => a.nodes,
      getConnections: () => a.connections,
      setNodes: a.setNodes,
      setConnections: a.setConnections,
      generateId: a.generateId,
      setSelectedNodeId: o.setSelectedNodeId,
      apiConfigs: i.genNodeApiConfigs || i.apiConfigs,
      generate: i.generate
    });
    const l = Dvi(t.id),
      d = _9i(e, l, hP),
      h = xFn() || !1 ? n : "high",
      p = h === "low" && A9i.has(t.type) && !S9i.has(t.type) ? "high" : h;
    g.useEffect(() => {
      v9i();
    }, []);
    const m = o9i(t.type);
    if (!m) return null;
    const f = h9i[m];
    return c.jsx(g.Suspense, {
      fallback: c.jsx(b9i, {
        node: t,
        isDark: s.isDark
      }),
      children: c.jsx(f, {
        props: d,
        contentServices: r,
        displayQuality: p
      })
    });
  },
  C9i = g.memo(I9i, k9i);

function E9i(e) {
  var k, A, S;
  const {
    node: t,
    baseQuality: n,
    isVisible: r,
    isStableMediaNode: a,
    mediaContentInView: i,
    boxSelectLightShell: o,
    selectedNodeId: s,
    selectedNodeIds: l,
    hasOpenGenPromptPanel: d,
    jsIdleSuspended: u,
    localCacheMode: h,
    localPanKeepsMediaTree: p,
    localCacheNodeDragActive: m,
    localInteractionActive: f,
    hasCanvasGenNodeThumb: y,
    canvasProjectBootActive: b,
    globalOssUploadEnabled: v,
    nodeRenderStage: _,
    focusEditActiveSourceNodeId: w
  } = e;
  if (G5n(t.type)) return "high";
  if (a) {
    if (dlr(t, w)) return "high";
    if (u) return "low";
    const C = !o && (s === t.id || d || l.has(t.id));
    return h ? !p && !m && f || !p && !i ? "low" : C && (t.type === "gen-image" || t.type === "gen-video") && !y && !!(t.content || (k = t.settings) != null && k.generatedImages || (A = t.settings) != null && A._contentAssetId || (S = t.settings) != null && S._pendingRemoteResultUrl || t._contentAssetId) || C ? "high" : "low" : C ? "high" : !i || b && v ? "low" : "medium";
  }
  return _ === "low" ? "low" : _ === "medium" ? n === "high" ? "medium" : n : !r && n === "high" ? "low" : n;
}

function T9i(e) {
  const t = e.contentServices;
  return {
    document: t.document,
    libraries: t.libraries,
    media: t.media,
    presentation: t.presentation,
    interaction: t.interaction
  };
}

const M9i = Object.freeze([]),
  P9i = new Set();

function R9i({
  runtimeRef: e,
  node: t,
  runtimeGenerating: n,
  nodeQuality: r,
  isVisible: a,
  viewportState: i
}) {
  var Y, K, W, Q, q, ne, de;
  const o = g.useRef(!1),
    s = g.useRef(!1),
    [, l] = g.useState(0),
    d = e.current,
    {
      document: u,
      libraries: h,
      media: p,
      presentation: m,
      interaction: f
    } = T9i(d),
    y = f.selectedNodeId ?? null,
    b = f.selectedNodeIds ?? P9i,
    v = b.size >= 2,
    _ = d.showBoxSelectBounds && v,
    w = y === t.id || b.has(t.id),
    k = _ && b.has(t.id),
    A = i.isNodeDragging,
    S = d.getNodeCallbacks(t),
    C = !!(d.compactRefCanvasPickTargetNode && Glr(t, d.compactRefCanvasPickTargetNode, {
      connections: u.connections,
      inputType: d.compactRefPickInputType
    })),
    I = !d.previewCollapsedNodeIds.has(t.id) && (t.type === "gen-image" || t.type === "gen-video" || t.type === "preview" || t.type === "video-input" || t.type === "input-image" || t.type === "image-wash" || t.type === "fal-rembg" || t.type === "virtual-try-on" || t.type === "video-relight" || t.type === "layer-decomposition"),
    E = ei(),
    M = E && I && d.isCanvasPanningActive,
    T = d.previewCollapsedNodeIds.has(t.id) ? "low" : r,
    P = I && (d.jsSuspendLevel === "idle" || TBt()),
    R = I && !P && N7(t.id),
    j = y === t.id || R || b.has(t.id),
    B = Udr(t) || Fdr(t) || zdr(t),
    F = Fki(A, B, o.current),
    N = B ? zki({
      editorInFocus: j,
      isBoxSelectMulti: v,
      dragSwapsToLightShell: F,
      latched: s.current
    }) : null;
  A || (o.current = N === "mount"), N === "light" && (s.current = !1);
  const G = v && Lki(t.type) || F || N === "defer",
    z = B ? N === "mount" : j && !G;
  g.useEffect(() => {
    if (N === "defer") return Gki(t.id, () => {
      s.current = !0, l(le => le + 1);
    });
  }, [N, t.id]);
  const V = E && I && z && (t.type === "gen-image" || t.type === "gen-video");
  if (c6r(void 0, t, {
    overviewActive: i.denseOverviewActive,
    focusEditActiveSourceNodeId: d.focusEditActiveSourceNodeId,
    nodeId: t.id,
    keepGenPromptInteractive: !v && (t.type === "gen-image" || t.type === "gen-video") && (w || R)
  })) {
    const le = d.groupOutputNodeToGroupId.has(t.id) && !d.expandedGroupNodeToGroupId.has(t.id);
    return c.jsx(e9i, {
      node: t,
      isDark: m.isDark,
      isSelected: w,
      hideHeaderLabel: le,
      onMouseDown: S.onMouseDown,
      onMouseUp: S.onMouseUp,
      connectorCallbacks: k || le || d.expandedGroupNodeToGroupId.has(t.id) || d.openDropdownNodeIds.has(t.id) ? void 0 : S,
      onHideConnectionDial: d.handleHideConnectionDial,
      isNodeDragging: A
    });
  }
  const O = E9i({
      node: t,
      baseQuality: T,
      isVisible: a,
      isStableMediaNode: I,
      mediaContentInView: i.mediaContentInView,
      boxSelectLightShell: G,
      selectedNodeId: y,
      selectedNodeIds: b,
      hasOpenGenPromptPanel: R,
      jsIdleSuspended: P,
      localCacheMode: E,
      localPanKeepsMediaTree: M,
      localCacheNodeDragActive: d.localCacheNodeDragActive,
      localInteractionActive: d.isCanvasPanningActive || d.localCacheAnyNodeDragging || d.isSelecting || _ || A,
      hasCanvasGenNodeThumb: !V || !!K1(t),
      canvasProjectBootActive: d.canvasProjectBootActive,
      globalOssUploadEnabled: d.canvasProjectBootActive && ua(),
      nodeRenderStage: d.nodeRenderStage,
      focusEditActiveSourceNodeId: d.focusEditActiveSourceNodeId
    }),
    L = ((Y = d.connectionDial) == null ? void 0 : Y.nodeId) === t.id && d.connectionDial.visible,
    D = d.groupOutputNodeToGroupId.get(t.id) ?? null,
    U = d.connectionSignatures.get(t.id) ?? llr,
    H = d.nodeDirtyVersionMap.get(t.id) || 0;
  return c.jsx(N5i, {
    node: t,
    modelConfigState: t.type === "gen-image" || t.type === "gen-video" ? d.modelConfigState : void 0,
    promptLibraryState: t.type === "gen-image" || t.type === "custom-agent" ? h.promptLibrary : null,
    promptLibraryCollapsedState: t.type === "gen-image" ? h.promptLibraryCollapsed : void 0,
    promptLibraryFormState: t.type === "gen-image" && ((K = t.settings) != null && K.promptLibraryEditorOpen) ? h.promptLibraryForm : null,
    isSelected: w,
    suppressSelectionChrome: k,
    disableResizeHandles: v && b.has(t.id),
    boxSelectLightShell: G,
    boxSelectGroupDragging: i.boxSelectGroupDragging,
    isNodeDragging: A,
    disableNodeDrag: d.disableNodeDrag,
    cropSelectModeActive: d.cropSelectModeNodeId === t.id,
    markerModeActive: d.markerModeNodeId === t.id,
    globalCanvasDoodleBrushOrEraser: d.canvasDoodleBrushOrEraserPassthrough,
    doodleDrawingNodeId: d.doodleDrawingNodeId === t.id ? t.id : null,
    isConnected: d.connectedNodeIds.has(t.id),
    isDark: m.isDark,
    enableMountFadeIn: !1,
    view: m.view,
    canvasStrictInView: i.canvasStrictInView,
    panPaintKeep: i.panPaintKeep,
    isCanvasPanning: !E && d.isCanvasPanningActive,
    connectingSource: f.connectingSource,
    connectingTarget: f.connectingTarget,
    multiConnectingSourceIds: d.multiConnectingSourceIds,
    multiConnectingTargetIds: d.multiConnectingTargetIds,
    isConnectDuplicateBlocked: d.duplicateBlockedNodeIds.has(t.id),
    renderQuality: O,
    nodeDirtyVersion: H,
    connectionSignature: U,
    groupId: D,
    framesConnectionSignature: pP(t) ? RUe(u.connections, t.id) : void 0,
    isInGroup: d.expandedGroupNodeToGroupId.has(t.id),
    isPreviewCollapsed: d.previewCollapsedNodeIds.has(t.id),
    hasOpenDropdown: d.openDropdownNodeIds.has(t.id),
    onNodeMouseDown: S.onMouseDown,
    onNodeMouseUp: S.onMouseUp,
    onDeleteNode: S.onDelete,
    onStartResize: S.onStartResize,
    onStartConnectFromOutput: S.onStartConnectFromOutput,
    onStartConnectFromInput: S.onStartConnectFromInput,
    onBeginConnectGesture: S.onBeginConnectGesture,
    onConnectToInput: S.onConnectToInput,
    onConnectToOutput: S.onConnectToOutput,
    setLightboxItem: p.setLightboxItem,
    setLightboxOpen: p.setLightboxOpen,
    onMouseEnter: () => {
      D && FQ(D);
    },
    updateNode: u.updateNode,
    onShowConnectionDial: d.handleShowConnectionDial,
    onHideConnectionDial: d.handleHideConnectionDial,
    showConnectionDial: L,
    connectionDialDirection: L ? ((W = d.connectionDial) == null ? void 0 : W.portDirection) ?? void 0 : void 0,
    connectionDialOptions: L ? (Q = d.connectionDial) == null ? void 0 : Q.options : void 0,
    onConnectionDialSelect: d.handleConnectionDialSelect,
    isCompactUiMode: !1,
    hideAllInputImagePreviews: m.hideAllInputImagePreviews,
    compactRefCanvasPickTargetId: f.compactRefCanvasPickTargetId,
    compactRefCanvasPickEligible: C,
    onCompactRefCanvasPickedNode: d.finalizeCompactRefCanvasPick,
    onCompactRefCanvasPickCancel: f.onDismissCompactRefCanvasPick,
    storyboardCanvasPickBoardId: ((q = f.storyboardCanvasPickTarget) == null ? void 0 : q.boardNodeId) ?? null,
    onStoryboardCanvasPickPickedNode: d.finalizeStoryboardShotCanvasPick,
    onStoryboardCanvasPickCancel: d.dismissStoryboardShotCanvasPick,
    focusEditTargetGenNodeId: d.focusEditTargetGenNodeId,
    focusEditActiveSourceNodeId: d.focusEditActiveSourceNodeId,
    focusEditAnalyzingNodeId: d.focusEditAnalyzingNodeId === t.id ? t.id : null,
    focusEditAnalyses: d.focusEditAnalysesByNodeId[t.id] ?? [],
    onFocusEditSelectSourceNode: d.handleFocusEditSelectSourceNode,
    onFocusEditPointPick: d.handleFocusEditPointPick,
    onFocusEditLevelChange: d.handleFocusEditLevelChange,
    onFocusEditDismissAnalysis: d.clearFocusEditAnalysis,
    onFocusEditOpenTargetPrompt: d.handleFocusEditOpenTargetPrompt,
    clipboardPromptReplaceTipNonce: ((ne = d.clipboardPromptReplaceTip) == null ? void 0 : ne.nodeId) === t.id ? d.clipboardPromptReplaceTip.nonce : 0,
    isGenerationTimerActive: n,
    showNodeDeleteButton: d.showNodeDeleteButton,
    showCanvasGenerationTimer: d.showCanvasGenerationTimer,
    enableGenerationNodeAnimation: m.enableGenerationNodeAnimation,
    enableConnectWireTilt: d.enableConnectWireTilt,
    enableConnectWireMarquee: d.enableConnectWireMarquee,
    children: c.jsx(C9i, {
      contentServices: d.contentServices,
      node: t,
      connectionSignature: U,
      renderQuality: O,
      mediaContentInView: i.mediaContentInView,
      generationHistory: d.generationHistoryByNodeId.get(t.id) ?? M9i,
      promptLibraryEditorOpen: !!((de = t.settings) != null && de.promptLibraryEditorOpen),
      setPromptLibraryEditorOpen: le => {
        var pe;
        const J = typeof le == "function" ? le(!!((pe = t.settings) != null && pe.promptLibraryEditorOpen)) : le;
        d.updateNodeSettings(t.id, {
          promptLibraryEditorOpen: J
        });
      },
      nodeDirtyVersion: H,
      isGenerationTimerActive: n,
      boxSelectLightShell: G,
      focusEditActive: d.focusEditTargetGenNodeId === t.id,
      focusEditActiveSourceNodeId: d.focusEditActiveSourceNodeId,
      onToggleFocusEdit: () => d.toggleFocusEdit(t.id)
    })
  });
}

function N9i({
  nodeIds: e,
  nodeDocument: t,
  defaultEpoch: n,
  downloadAwareEpoch: r,
  toolTargets: a,
  nodeDirtyVersionMap: i,
  selectedNodeId: o,
  selectedNodeIds: s,
  nodeQualityMap: l,
  visibleNodeIds: d,
  viewportStates: u,
  connectionDial: h,
  connectionSignatures: p,
  connectedNodeIds: m,
  duplicateBlockedNodeIds: f,
  groupOutputNodeToGroupId: y,
  expandedGroupNodeToGroupId: b,
  previewCollapsedNodeIds: v,
  openDropdownNodeIds: _,
  clipboardPromptReplaceTip: w,
  modelConfigState: k,
  promptLibraryState: A,
  promptLibraryCollapsedState: S,
  promptLibraryFormState: C,
  rendererRuntimeRef: I,
  focusEditAnalysesByNodeId: E
}) {
  const M = g.useCallback((T, P, R, j, B) => c.jsx(R9i, {
    runtimeRef: I,
    node: T,
    runtimeGenerating: P,
    nodeQuality: R,
    isVisible: j,
    viewportState: B
  }), [I]);
  return c.jsx(c.Fragment, {
    children: e.map(T => {
      var R;
      const P = t.getNode(T);
      return P ? c.jsx(QPi, {
        modelConfigState: P.type === "gen-image" || P.type === "gen-video" ? k : void 0,
        nodeId: T,
        nodeDocument: t,
        epoch: P.type === "storyboard-node" ? r : n,
        nodeDirtyVersion: i.get(T) || 0,
        toolFlags: WPi(T, a),
        isSelected: o === T || s.has(T),
        nodeQuality: l.get(T) || "low",
        isVisible: d.has(T),
        viewportState: u.get(T) ?? wCi,
        connectionDialState: (h == null ? void 0 : h.nodeId) === T ? h : null,
        connectionSignature: p.get(T) ?? llr,
        isConnected: m.has(T),
        isConnectDuplicateBlocked: f.has(T),
        groupId: y.get(T) ?? null,
        isInGroup: b.has(T),
        isPreviewCollapsed: v.has(T),
        hasOpenDropdown: _.has(T),
        clipboardPromptReplaceTipNonce: (w == null ? void 0 : w.nodeId) === T ? w.nonce : 0,
        promptLibraryState: P.type === "gen-image" || P.type === "custom-agent" ? A : null,
        promptLibraryCollapsedState: P.type === "gen-image" ? S : void 0,
        promptLibraryFormState: P.type === "gen-image" && ((R = P.settings) != null && R.promptLibraryEditorOpen) ? C : null,
        render: M,
        focusEditAnalysisState: E == null ? void 0 : E[T]
      }, T) : null;
    })
  });
}

function j9i(e, t) {
  return e.nodeIds === t.nodeIds && e.nodeDocument === t.nodeDocument && e.focusEditAnalysesByNodeId === t.focusEditAnalysesByNodeId && e.defaultEpoch === t.defaultEpoch && e.downloadAwareEpoch === t.downloadAwareEpoch && e.toolTargets === t.toolTargets && e.nodeDirtyVersionMap === t.nodeDirtyVersionMap && e.selectedNodeId === t.selectedNodeId && e.selectedNodeIds === t.selectedNodeIds && e.nodeQualityMap === t.nodeQualityMap && e.visibleNodeIds === t.visibleNodeIds && e.viewportStates === t.viewportStates && e.connectionDial === t.connectionDial && e.connectionSignatures === t.connectionSignatures && e.connectedNodeIds === t.connectedNodeIds && e.duplicateBlockedNodeIds === t.duplicateBlockedNodeIds && e.groupOutputNodeToGroupId === t.groupOutputNodeToGroupId && e.expandedGroupNodeToGroupId === t.expandedGroupNodeToGroupId && e.previewCollapsedNodeIds === t.previewCollapsedNodeIds && e.openDropdownNodeIds === t.openDropdownNodeIds && e.clipboardPromptReplaceTip === t.clipboardPromptReplaceTip && e.modelConfigState === t.modelConfigState && e.promptLibraryState === t.promptLibraryState && e.promptLibraryCollapsedState === t.promptLibraryCollapsedState && e.promptLibraryFormState === t.promptLibraryFormState && e.rendererRuntimeRef === t.rendererRuntimeRef;
}

const D9i = g.memo(N9i, j9i);

function L9i() {
  FX() === "materials" && Dx();
}

function O9i(e) {
  on();
  const {
      view: t
    } = M3(),
    n = t === "materials",
    [r, a] = g.useState(null);
  g.useEffect(() => {
    a(document.getElementById("studio-materials-host"));
  }, []), g.useEffect(() => (fUe(n), () => fUe(!1)), [n]);
  const [i, o] = g.useState(() => new Set());
  return g.useLayoutEffect(() => {
    var s;
    return o(new Set()), (s = e.documentSession) == null ? void 0 : s.subscribe(() => o(new Set()));
  }, [e.documentSession]), r ? Da.createPortal(c.jsx(Zf, {
    show: n,
    fallback: c.jsx("div", {
      className: "studio-materials-loading",
      role: "status",
      children: x("正在加载素材历史…")
    }),
    children: c.jsx(QLr, {
      isOpen: n,
      onClose: L9i,
      isDark: e.isDark,
      history: e.history,
      nodes: e.nodes,
      batchSelectedIds: i,
      onSetBatchSelectedIds: o,
      onSetHistory: e.setHistory,
      onSetLightboxItem: e.setLightboxItem,
      onSetLightboxOpen: e.setLightboxOpen,
      toastSuccess: e.toastSuccess,
      toastError: e.toastError,
      onSendHistoryItemsToCanvas: e.onSendHistoryItemsToCanvas
    })
  }), r) : null;
}

const B9i = g.memo(O9i),
  F9i = g.memo(function ({
    session: t,
    onCreateWorkflow: n,
    onError: r,
    ...a
  }) {
    const i = g.useSyncExternalStore(t.subscribe, t.getSnapshot, t.getSnapshot);
    if (g.useEffect(() => () => t.close(), [t]), !i) return null;
    const o = () => t.isCurrent(i);
    return c.jsx(Zf, {
      show: !0,
      children: g.createElement(ULr, {
        ...a,
        key: i.id,
        isOpen: !0,
        initialText: i.initialText,
        onClose: () => t.close(i),
        onError: s => {
          o() && r(s);
        },
        onCreateWorkflow: async s => {
          o() && (await n(s, o), o() && t.close(i));
        }
      })
    });
  });

function z9i({
  isDark: e,
  authMode: t,
  authenticate: n,
  showHuyaModelsInFeaturePanel: r,
  toggleHuyaModels: a,
  toastSuccess: i
}) {
  const o = Lba();
  return Da.createPortal(c.jsx(Zf, {
    show: o,
    children: c.jsx(zLr, {
      isOpen: o,
      onClose: () => $Wn(!1),
      isDark: e,
      authMode: t,
      onAuthenticate: n,
      huyaModelsHidden: !r,
      onToggleHuyaModels: () => {
        a(), i(`海艺模型${r ? "已隐藏" : "已显示"}`);
      }
    })
  }), document.body);
}

const U9i = g.memo(z9i);

function $9i(e) {
  return c.jsx(Zf, {
    show: e.open,
    children: c.jsx(G9i, {
      ...e
    })
  });
}

function G9i({
  open: e,
  isDark: t,
  library: n,
  onClose: r,
  onConfirm: a
}) {
  const {
    selectedFolderPath: i
  } = Wdr(n.directoryState);
  return c.jsx(JLr, {
    isOpen: e,
    isDark: t,
    rootPath: n.rootPath,
    tree: n.tree,
    selectedFolderPath: i,
    onClose: r,
    onSelectFolder: n.setSelectedFolderPath,
    onChooseRoot: n.chooseRoot,
    onCreateFolder: n.createFolder,
    onRenameFolder: n.renameFolder,
    onDeleteFolder: n.deleteFolder,
    onConfirm: a,
    getPreviewUrl: n.getPreviewUrl
  });
}

function V9i(e, t) {
  return typeof e.worldX == "number" && Number.isFinite(e.worldX) && typeof e.worldY == "number" && Number.isFinite(e.worldY) ? {
    x: e.worldX,
    y: e.worldY
  } : t(e.x, e.y);
}

function H9i(e, t, n) {
  const r = Number.isFinite(t.w) ? t.w : 0,
    a = Number.isFinite(t.h) ? t.h : 0;
  return {
    x: n === "output" ? e.x - r : e.x,
    y: e.y - a / 2
  };
}

function W9i(e) {
  const t = !!(e.sourceNodeId || e.sourceNodeIds && e.sourceNodeIds.length > 0),
    n = !!e.targetNodeId;
  return !t && !n ? null : t ? "input" : "output";
}

const jhr = 12,
  OMe = (e, t, n) => Math.min(Math.max(e, t), Math.max(t, n));

function q9i({
  anchorX: e,
  anchorY: t,
  menuWidth: n,
  menuHeight: r,
  viewportWidth: a,
  viewportHeight: i,
  gutter: o = jhr
}) {
  const s = Math.max(0, a - o * 2),
    l = Math.max(0, i - o * 2),
    d = Math.min(n, s),
    u = Math.min(r, l),
    h = e + d <= a - o,
    p = e - d >= o,
    m = t + u <= i - o,
    f = t - u >= o,
    y = h ? e : p ? e - d : e,
    b = m ? t : f ? t - u : t,
    v = OMe(y, o, a - d - o),
    _ = OMe(b, o, i - u - o),
    w = OMe(e - v, 0, d),
    k = OMe(t - _, 0, u);
  return {
    left: v,
    top: _,
    maxHeight: l,
    transformOrigin: `${w}px ${k}px`
  };
}

const mun = 232,
  tee = e => {
    const t = new Set(e);
    for (const n of OMi) t.delete(n);
    return t;
  },
  K9i = new Set(["text-node", "gen-image", "gen-video", "gen-3d", "motion-control", "custom-agent", "image-compare", "image-tile", "inpaint-menu", "jimeng-super-resolution", "preview", "global-perspective", "local-save", "gen-music"]),
  qFt = tee((() => {
    const e = new Set(K9i);
    return e.delete("inpaint-menu"), e.add("inpaint-stitch"), e;
  })());

qFt.add("image-wash");

const Q9i = (() => {
    const e = tee(new Set(["text-node", "gen-video", "video-input", "video-analyze", "custom-agent", "motion-control", "local-save"]));
    return e.add("shot-breakdown"), e;
  })(),
  Y9i = new Set(["gen-music", "local-save"]),
  X9i = new Set(["text-node", "table-editor-node", "script-parse", "gen-image", "gen-video", "gen-3d", "motion-control", "custom-agent", "gen-music"]),
  J9i = new Set(["video-analyze", "shot-breakdown"]),
  Z9i = new Set([]),
  eRi = new Set(["text-node", "gen-image", "gen-video", "gen-music"]),
  tRi = new Set(["text-node", "gen-image", "gen-video"]),
  nRi = new Set(["gen-image", "gen-video", "motion-control"]),
  rRi = new Set(["preview"]),
  aRi = qFt,
  iRi = new Set(),
  oRi = tee(new Set(["input-image", "text-node", "gen-image", "preview"])),
  sRi = (() => {
    const e = tee(new Set(["text-node", "gen-video", "video-input", "video-analyze", "custom-agent", "motion-control", "local-save"]));
    return e.add("shot-breakdown"), e;
  })(),
  lRi = tee(new Set(["input-image", "text-node", "gen-image", "gen-video", "custom-agent", "preview", "video-input", "motion-control"])),
  cRi = tee(new Set(["input-image", "text-node", "gen-image", "gen-video", "custom-agent", "preview", "video-input", "video-analyze", "motion-control"])),
  dRi = tee(new Set(["input-image", "text-node", "gen-image", "gen-video", "custom-agent", "preview", "video-input"])),
  uRi = new Set(["preview"]),
  hRi = ["text-node", "table-editor-node", "gen-image", "gen-video", "custom-agent"],
  pRi = new Set(["preview", "inpaint-stitch", "global-perspective"]),
  mRi = new Set(["preview", "global-perspective"]),
  fRi = new Set(["gen-image"]),
  gRi = new Set(["preview", "global-perspective", "local-save"]),
  yRi = new Set(["preview", "local-save", "gen-music"]),
  bRi = new Set(["gen-image", "gen-video", "gen-3d", "motion-control", "virtual-try-on", "video-relight", "inpaint-stitch", "global-perspective", "local-save"]),
  am = [{
    type: "input-image",
    label: "上传",
    description: "支持图片、视频和音频",
    icon: ml
  }, {
    type: "text-node",
    label: "文本",
    description: "编写脚本、文案与提示词",
    icon: XE
  }, {
    type: "video-timeline",
    label: "剪辑时间线",
    description: "剪切、修整并预览视频片段",
    icon: wb,
    hideInCreateMenu: !0
  }, {
    type: "video-input",
    label: "视频抽帧",
    description: "从视频中提取关键帧",
    icon: Oo,
    hideInCreateMenu: !0
  }, {
    type: "video-analyze",
    label: "视频拆解",
    description: "分析视频镜头与画面内容",
    icon: Sf,
    hideInCreateMenu: !0
  }, {
    type: "shot-breakdown",
    label: "逐帧拉片",
    description: "拆解视频的风格、运镜与音频",
    icon: uZ,
    hideInCreateMenu: !0
  }, {
    type: "script-parse",
    label: "脚本解析",
    description: "把剧本拆成镜头、资产与双轨提示词",
    icon: Hd,
    hideInCreateMenu: !0
  }, {
    type: "storyboard-menu",
    label: "分镜表",
    description: "组织镜头并批量生成内容",
    icon: Od,
    isSubmenu: !0,
    hideInCreateMenu: !0
  }, {
    type: "table-editor-node",
    label: "表格编辑",
    description: "用表格整理结构化内容",
    icon: Hue,
    hideInCreateMenu: !0
  }, {
    type: "doodle-canvas",
    label: "涂鸦画板",
    description: "绘制草图与局部标注",
    icon: nw,
    hideInCreateMenu: !0
  }, {
    type: "director-3d",
    label: "3D导演台",
    description: "设计机位、镜头与空间关系",
    icon: tWe,
    hideInCreateMenu: !0
  }, {
    type: "gen-image",
    label: "绘画",
    description: "使用模型生成或编辑图片",
    icon: tw
  }, {
    type: "gen-video",
    label: "视频",
    description: "使用模型生成动态画面",
    icon: Oo
  }, {
    type: "gen-3d",
    label: "3D",
    description: "生成 3D 物体或世界，并全屏预览",
    icon: Hm
  }, {
    type: "gen-music",
    label: "音频",
    description: "生成语音、音乐与音效",
    icon: Q2
  }, {
    type: "gen-speech",
    label: "音频",
    description: "生成语音、音乐与音效",
    icon: Q2,
    hideInCreateMenu: !0
  }, {
    type: "custom-agent",
    label: "Agent",
    description: "串联工具自动执行创作任务",
    icon: b5e
  }, {
    type: "comfy-ui",
    label: "Comfy UI",
    description: "连接并运行 Comfy 工作流",
    icon: mZ,
    isSubmenu: !0,
    hideInCreateMenu: !0
  }, {
    type: "image-compare",
    label: "对比",
    description: "用分割滑杆对照两张图片的差异",
    icon: TLe
  }, {
    type: "image-tile",
    label: "图片平铺",
    description: "把上游图片当贴图重复铺开预览",
    icon: Bv,
    hideInCreateMenu: !0
  }, {
    type: "global-perspective",
    label: "全局视角",
    description: "扩展画面并统一整体透视",
    icon: i9,
    hideInCreateMenu: !0
  }, {
    type: "inpaint-menu",
    label: "局部重绘",
    description: "修改选区并融合回原图",
    icon: Sf,
    isSubmenu: !0
  }, {
    type: "inpaint-stitch",
    label: "无缝拼回",
    description: "将重绘结果无缝融合回原图",
    icon: Sf,
    hideInCreateMenu: !0
  }, {
    type: "image-wash",
    label: "质感增强",
    description: "本地增强质感，拖动查看前后对比",
    icon: ac,
    hideInCreateMenu: !0
  }, {
    type: "jimeng-super-resolution",
    label: "智能超清",
    description: "放大图片并增强清晰度",
    icon: ac,
    hideInCreateMenu: !0
  }, {
    type: "virtual-try-on",
    label: "商品合图",
    description: "把服装、产品或多张参考图，合到人物画面上",
    icon: VK,
    hideInCreateMenu: !0
  }, {
    type: "video-relight",
    label: "光照重置",
    description: "用参考图重置视频光照或风格",
    icon: AD,
    hideInCreateMenu: !0
  }, {
    type: "preview",
    label: "预览与拼图",
    description: "集中查看上游生成结果，支持拼图",
    icon: ul,
    hideInCreateMenu: !0
  }, {
    type: "local-save",
    label: "指定保存",
    description: "把结果保存到指定目录",
    icon: O5,
    hideInCreateMenu: !0
  }],
  fun = [{
    type: "storyboard-node",
    label: "分镜视表",
    description: "编辑镜头列表与生成设置",
    icon: Od
  }, {
    type: "storyboard-chart-node",
    label: "分镜图表",
    description: "用图表方式整理镜头内容",
    icon: Od
  }],
  vRi = [{
    type: "inpaint-crop",
    label: "裁剪局部重绘",
    description: "裁剪选区并生成新的局部内容",
    icon: Sf
  }, {
    type: "inpaint-stitch",
    label: "无缝拼回",
    description: "把局部结果自然融合回原图",
    icon: Sf
  }],
  wRi = [{
    type: "rh-app",
    label: "RH 应用",
    description: "运行已经发布的 RH 应用",
    icon: Wp
  }, {
    type: "rh-comfy",
    label: "RH ComfyUI",
    description: "连接 RH 托管的 Comfy 工作流",
    icon: mZ
  }],
  xRi = (e, t) => {
    const r = Wle(t).map(i => e.find(o => o.type === i)).filter(i => !!i),
      a = new Set(r.map(i => i.type));
    for (const i of e) {
      if (r.length >= HH || r.length >= e.length) break;
      a.has(i.type) || (r.push(i), a.add(i.type));
    }
    return r;
  },
  _Ri = ({
    contextMenu: e,
    setContextMenu: t,
    isDark: n,
    view: r,
    addNode: a,
    nodes: i = [],
    compactMenuTypeOrder: o,
    onOpenNodeCustomization: s,
    onOpenDirector3D: l,
    onDismissConnectionWire: d
  }) => {
    var St, hn, Qt;
    on();
    const [u, h] = g.useState(!1),
      [p, m] = g.useState(!1),
      [f, y] = g.useState(!1),
      [b, v] = g.useState(!1),
      _ = g.useRef(null),
      w = g.useRef(null),
      k = g.useRef(null),
      A = g.useRef(null),
      S = g.useRef(!1),
      [C, I] = g.useState(null),
      [E, M] = g.useState(!1),
      T = 500,
      R = !!((e.sourceNodeId ?? ((St = e.sourceNodeIds) == null ? void 0 : St[0])) || e.targetNodeId || e.sourceNodeIds && e.sourceNodeIds.length > 0),
      j = !R;
    g.useLayoutEffect(() => {
      if (!e.visible) {
        h(!1), I(null), M(!1), S.current = !1, _.current && (clearTimeout(_.current), _.current = null), w.current && (clearTimeout(w.current), w.current = null);
        return;
      }
      h(!1), S.current = !1;
    }, [e.visible]), g.useEffect(() => {
      if (!e.visible) return;
      if (m(!1), y(!1), v(!1), R) {
        const ln = () => {
            t(Ct => ({
              ...Ct,
              visible: !1
            })), d == null || d();
          },
          Pn = Ct => {
            Ct.key === "Escape" && ln();
          },
          rn = Ct => {
            var un, Jn;
            const Cn = Ct.target;
            (un = k.current) != null && un.contains(Cn) || (Jn = Cn == null ? void 0 : Cn.closest) != null && Jn.call(Cn, "[data-connection-drop-menu]") || ln();
          };
        window.addEventListener("keydown", Pn, !0);
        const Yn = window.setTimeout(() => {
          window.addEventListener("pointerdown", rn, !0);
        }, 450);
        return () => {
          window.removeEventListener("keydown", Pn, !0), window.clearTimeout(Yn), window.removeEventListener("pointerdown", rn, !0);
        };
      }
      const Ot = ln => {
        const Pn = document.elementFromPoint(ln.clientX, ln.clientY);
        if (k.current && Pn && k.current.contains(Pn)) {
          A.current && (clearTimeout(A.current), A.current = null);
          return;
        }
        A.current || (A.current = setTimeout(() => {
          A.current = null, t(Yn => ({
            ...Yn,
            visible: !1
          })), m(!1), y(!1), v(!1);
        }, T));
      };
      return window.addEventListener("mousemove", Ot, {
        passive: !0
      }), () => {
        window.removeEventListener("mousemove", Ot), A.current && (clearTimeout(A.current), A.current = null);
      };
    }, [e.visible, R, t, d]);
    const B = g.useCallback(() => {
      const Ot = k.current;
      if (!Ot || !e.visible) return;
      const ln = q9i({
        anchorX: e.x,
        anchorY: e.y,
        menuWidth: Ot.offsetWidth || mun,
        menuHeight: Ot.scrollHeight,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      });
      I(Pn => Pn && Pn.left === ln.left && Pn.top === ln.top && Pn.maxHeight === ln.maxHeight && Pn.transformOrigin === ln.transformOrigin ? Pn : ln);
    }, [e.visible, e.x, e.y]);
    if (g.useLayoutEffect(() => {
      if (!e.visible) return;
      B();
      const Ot = k.current,
        ln = Ot && typeof ResizeObserver < "u" ? new ResizeObserver(B) : null;
      return Ot && (ln == null || ln.observe(Ot)), M(!0), window.addEventListener("resize", B), () => {
        ln == null || ln.disconnect(), window.removeEventListener("resize", B);
      };
    }, [e.visible, B, u]), !e.visible) return null;
    const F = e.sourceNodeId ?? ((hn = e.sourceNodeIds) == null ? void 0 : hn[0]),
      N = F ? i.find(Ot => Ot.id === F) : void 0,
      G = !F && !(e.sourceNodeIds && e.sourceNodeIds.length > 0) ? e.targetNodeId : void 0,
      z = G ? i.find(Ot => Ot.id === G) : void 0,
      V = (z == null ? void 0 : z.type) === "gen-image",
      O = (z == null ? void 0 : z.type) === "gen-video",
      L = (z == null ? void 0 : z.type) === "gen-3d",
      D = (z == null ? void 0 : z.type) === "input-image",
      U = (N == null ? void 0 : N.type) === "input-image" ? (Qt = N.settings) == null ? void 0 : Qt.mediaType : void 0,
      H = typeof (N == null ? void 0 : N.content) == "string" ? N.content : "",
      Y = H.toLowerCase(),
      K = H.length > 0 && (Y.includes("video") || Y.includes(".mp4")),
      W = H.length > 0 && (Y.startsWith("data:audio") || Y.includes(".mp3") || Y.includes(".wav") || Y.includes(".ogg") || Y.includes(".m4a") || Y.includes(".aac") || Y.includes(".flac") || Y.includes("audio")),
      Q = (N == null ? void 0 : N.type) === "input-image" && H.length > 0 && (U === "image" || !U && !K && !W),
      q = (N == null ? void 0 : N.type) === "input-image" && H.length > 0 && (U === "video" || !U && K),
      ne = (N == null ? void 0 : N.type) === "input-image" && H.length > 0 && (U === "audio" || !U && !K && W),
      de = (N == null ? void 0 : N.type) === "text-node",
      le = (N == null ? void 0 : N.type) === "video-input",
      J = (N == null ? void 0 : N.type) === "video-analyze",
      pe = (N == null ? void 0 : N.type) === "shot-breakdown",
      ce = (N == null ? void 0 : N.type) === "script-parse",
      we = (N == null ? void 0 : N.type) === "storyboard-node",
      X = (N == null ? void 0 : N.type) === "storyboard-chart-node",
      Z = (N == null ? void 0 : N.type) === "gen-image" || (N == null ? void 0 : N.type) === "image-wash",
      re = (N == null ? void 0 : N.type) === "gen-3d",
      fe = (N == null ? void 0 : N.type) === "motion-control",
      ye = (N == null ? void 0 : N.type) === "video-relight",
      ie = (N == null ? void 0 : N.type) === "gen-video",
      ae = (N == null ? void 0 : N.type) === "custom-agent",
      be = (N == null ? void 0 : N.type) === "input-image",
      Ee = (N == null ? void 0 : N.type) === "rh-app" || (N == null ? void 0 : N.type) === "rh-comfy",
      xe = (N == null ? void 0 : N.type) === "jimeng-super-resolution" || (N == null ? void 0 : N.type) === "virtual-try-on",
      he = (N == null ? void 0 : N.type) === "inpaint-crop",
      ue = (N == null ? void 0 : N.type) === "inpaint-stitch",
      ge = (N == null ? void 0 : N.type) === "gen-speech" || (N == null ? void 0 : N.type) === "gen-music",
      _e = (N == null ? void 0 : N.type) === "preview",
      ke = typeof (N == null ? void 0 : N.content) == "string" ? N.content : "",
      ve = ke.toLowerCase(),
      Te = (N == null ? void 0 : N.previewMjImages) || [],
      Ne = (N == null ? void 0 : N.previewMjVideos) || [],
      me = ke.length > 0 && (ve.startsWith("data:video") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(ke.split("?")[0]) || ve.includes("force_video_display=true") || /\/video\//i.test(ke) || ve.includes("video") && !ve.includes("preview")),
      Ae = ke.length > 0 && (ve.startsWith("data:audio") || /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(ve)),
      Fe = Te.length > 0,
      Me = _e && ((N == null ? void 0 : N.previewType) === "video" || Ne.length > 0 || !Fe && me),
      Re = _e && ((N == null ? void 0 : N.previewType) === "audio" || Ae),
      $e = _e && !Me && !Re && ((N == null ? void 0 : N.previewType) === "image" || Fe || ke.length > 0),
      rt = Q || $e ? am.filter(Ot => qFt.has(Ot.type)) : q || Me ? am.filter(Ot => Q9i.has(Ot.type)) : ne || Re ? am.filter(Ot => Y9i.has(Ot.type)) : de ? am.filter(Ot => X9i.has(Ot.type)) : le ? am.filter(Ot => J9i.has(Ot.type)) : J ? am.filter(Ot => Z9i.has(Ot.type)) : pe ? am.filter(Ot => eRi.has(Ot.type)) : ce ? am.filter(Ot => tRi.has(Ot.type)) : we ? am.filter(Ot => nRi.has(Ot.type)) : X ? am.filter(Ot => rRi.has(Ot.type)) : Z ? am.filter(Ot => aRi.has(Ot.type)) : re ? am.filter(Ot => iRi.has(Ot.type)) : fe || ye ? am.filter(Ot => uRi.has(Ot.type)) : ie ? am.filter(Ot => sRi.has(Ot.type)) : ae ? hRi.map(Ot => am.find(ln => ln.type === Ot)).filter(Ot => !!Ot) : Ee ? am.filter(Ot => pRi.has(Ot.type)) : xe ? am.filter(Ot => mRi.has(Ot.type)) : he ? am.filter(Ot => fRi.has(Ot.type)) : ue ? am.filter(Ot => gRi.has(Ot.type)) : ge ? am.filter(Ot => yRi.has(Ot.type)) : _e ? am.filter(Ot => bRi.has(Ot.type)) : V ? am.filter(Ot => lRi.has(Ot.type)) : O ? am.filter(Ot => cRi.has(Ot.type)) : D ? am.filter(Ot => dRi.has(Ot.type)) : L ? am.filter(Ot => oRi.has(Ot.type)) : am,
      nt = j,
      ze = rt.filter(Ot => Ot.type === "comfy-ui" ? !1 : !nt || !Ot.hideInCreateMenu),
      Ke = !u && !(de || Z || ie || V || O || D || ae || Q || q || $e || Me),
      Xe = Ke ? xRi(ze, o) : ze,
      De = new Set(Xe.map(Ot => Ot.type)),
      Ye = ze.some(Ot => !De.has(Ot.type)),
      Ce = Ke && !be && Ye,
      Ve = !be && !!s && (u || Ke && !Ye),
      it = () => {
        t(Ot => ({
          ...Ot,
          visible: !1
        })), m(!1), y(!1), v(!1), h(!1), R && (d == null || d());
      },
      It = {
        x: (C == null ? void 0 : C.left) ?? e.x,
        y: (C == null ? void 0 : C.top) ?? e.y
      },
      Ft = () => {
        const Ot = V9i(e, (ln, Pn) => kj(ln, Pn, r));
        return {
          x: (Ot == null ? void 0 : Ot.x) ?? 100,
          y: (Ot == null ? void 0 : Ot.y) ?? 100
        };
      },
      We = Ot => {
        if (S.current) return;
        S.current = !0;
        const {
          x: ln,
          y: Pn
        } = Ft();
        a(Ot, ln, Pn, e.sourceNodeId || void 0, e.targetNodeId || void 0, e.sourceNodeIds || void 0), it();
      },
      Ze = Ot => ln => {
        ln.preventDefault(), ln.stopPropagation(), We(Ot);
      },
      Ge = Ot => {
        Ot.stopPropagation(), w.current && (clearTimeout(w.current), w.current = null), A.current && (clearTimeout(A.current), A.current = null), h(!0);
      },
      Oe = () => {
        _.current && (clearTimeout(_.current), _.current = null);
      },
      st = Ot => {
        _.current && clearTimeout(_.current), _.current = setTimeout(() => {
          _.current = null, Ot === "comfy" && m(!1), Ot === "storyboard" && y(!1), Ot === "inpaint" && v(!1);
        }, 200);
      },
      vt = () => {
        R || (w.current && clearTimeout(w.current), w.current = setTimeout(() => {
          w.current = null, t(Ot => ({
            ...Ot,
            visible: !1
          })), m(!1), y(!1), v(!1);
        }, T));
      },
      Ht = () => {
        w.current && (clearTimeout(w.current), w.current = null), A.current && (clearTimeout(A.current), A.current = null);
      },
      nn = !nt,
      pt = ["sketch-menu canvas-node-menu canvas-command-menu sketch-menu--portal-fixed", E ? nn ? "canvas-command-menu-zoom-in" : "sketch-menu-enter" : "", "w-[232px]", n ? "sketch-menu-dark" : ""].filter(Boolean).join(" "),
      lt = `sketch-menu canvas-node-menu canvas-command-menu sketch-menu-submenu w-[216px] ${n ? "sketch-menu-dark" : ""} sketch-menu-enter`,
      gt = "sketch-menu-item sketch-menu-item--node w-full text-left",
      Ut = `${gt} sketch-menu-item--truncate`,
      _t = {
        size: 18,
        strokeWidth: 1.75,
        className: "sketch-menu-icon"
      },
      At = {
        size: 14,
        strokeWidth: 1.75,
        className: "sketch-menu-arrow"
      },
      Yt = (Ot, ln) => c.jsxs("span", {
        className: "sketch-menu-item-copy",
        children: [c.jsx("span", {
          className: "sketch-menu-item-label",
          children: Ot
        }), ln ? c.jsx("span", {
          className: "sketch-menu-item-description",
          children: ln
        }) : null]
      }),
      qe = Ot => {
        const ln = !!Ot.isSubmenu,
          Pn = ln && Ot.type === "comfy-ui",
          rn = ln && Ot.type === "storyboard-menu",
          Yn = ln && Ot.type === "inpaint-menu",
          Ct = J || pe ? fun.filter(Cn => Cn.type === "storyboard-node") : fun;
        if (rn || Yn || Pn) {
          const Cn = rn ? Ct : Yn ? vRi : wRi,
            un = rn ? "storyboard" : Yn ? "inpaint" : "comfy",
            Jn = rn ? f : Yn ? b : p;
          return c.jsxs("div", {
            className: "sketch-menu-item-has-submenu",
            onMouseEnter: () => {
              Oe(), m(Pn), y(rn), v(Yn);
            },
            onMouseLeave: () => st(un),
            children: [c.jsxs("button", {
              type: "button",
              className: `${Ut}${Jn ? " active" : ""}`,
              "data-testid": `canvas-context-menu-item-${Ot.type}`,
              children: [c.jsx("span", {
                className: "sketch-menu-item-icon-box",
                children: c.jsx(Ot.icon, {
                  ..._t
                })
              }), c.jsxs("span", {
                className: "sketch-menu-item-copy",
                children: [c.jsx("span", {
                  className: "sketch-menu-item-label",
                  children: x(Ot.label)
                }), c.jsx("span", {
                  className: "sketch-menu-item-description",
                  children: x(Ot.description)
                })]
              }), c.jsx(ss, {
                ...At
              })]
            }), Jn && c.jsx("div", {
              className: lt,
              onMouseEnter: Oe,
              onMouseLeave: () => st(un),
              children: c.jsx("div", {
                className: "sketch-menu-inner",
                children: Cn.map(Kn => c.jsxs("button", {
                  type: "button",
                  className: gt,
                  onMouseUp: Ze(Kn.type),
                  onClick: Ze(Kn.type),
                  "data-testid": `canvas-context-submenu-item-${Kn.type}`,
                  children: [c.jsx("span", {
                    className: "sketch-menu-item-icon-box",
                    children: c.jsx(Kn.icon, {
                      ..._t
                    })
                  }), c.jsxs("span", {
                    className: "sketch-menu-item-copy",
                    children: [c.jsx("span", {
                      className: "sketch-menu-item-label",
                      children: x(Kn.label)
                    }), c.jsx("span", {
                      className: "sketch-menu-item-description",
                      children: x(Kn.description)
                    })]
                  })]
                }, Kn.type))
              })
            })]
          }, Ot.type);
        }
        return c.jsxs("button", {
          type: "button",
          className: gt,
          onMouseUp: Ze(Ot.type),
          onClick: Ze(Ot.type),
          "data-testid": `canvas-context-menu-item-${Ot.type}`,
          children: [c.jsx("span", {
            className: "sketch-menu-item-icon-box",
            children: c.jsx(Ot.icon, {
              ..._t
            })
          }), Yt(Ot.label, Ot.description)]
        }, Ot.type);
      },
      kt = c.jsx("div", {
        ref: k,
        "data-command-menu": nt ? "true" : void 0,
        "data-connection-drop-menu": nn ? "true" : void 0,
        "data-testid": "canvas-context-command-menu",
        className: pt,
        style: {
          left: It.x,
          top: It.y,
          width: mun,
          maxHeight: (C == null ? void 0 : C.maxHeight) ?? Math.max(0, window.innerHeight - jhr * 2),
          transformOrigin: (C == null ? void 0 : C.transformOrigin) ?? "top left",
          visibility: E ? "visible" : "hidden",
          contain: "layout style"
        },
        onWheelCapture: Ot => Ot.stopPropagation(),
        onMouseEnter: Ht,
        onMouseLeave: vt,
        onMouseDown: Ot => Ot.stopPropagation(),
        children: c.jsxs("div", {
          className: "sketch-menu-inner",
          children: [Xe.map(qe), Ve && c.jsxs("button", {
            type: "button",
            className: gt,
            onClick: Ot => {
              Ot.stopPropagation(), s == null || s();
            },
            children: [c.jsx("span", {
              className: "sketch-menu-item-icon-box",
              children: c.jsx(Pj, {
                ..._t
              })
            }), Yt("自定义常用", "选择菜单优先显示的节点")]
          }), Ce && c.jsxs("button", {
            type: "button",
            className: gt,
            onClick: Ge,
            children: [c.jsx("span", {
              className: "sketch-menu-item-icon-box",
              children: c.jsx(ss, {
                ..._t
              })
            }), Yt("显示更多选项", nt ? "展开全部可创建的节点" : "展开全部可连接的节点")]
          })]
        })
      });
    return typeof document > "u" ? kt : Da.createPortal(kt, document.body);
  },
  kRi = ({
    frameContextMenu: e,
    setFrameContextMenu: t,
    isDark: n,
    nodes: r,
    view: a,
    canvasRef: i,
    setChatFiles: o,
    setIsChatOpen: s,
    setNodes: l,
    updateNode: d,
    generateId: u
  }) => {
    if (on(), !e.visible) return null;
    const h = () => {
        t({
          visible: !1,
          x: 0,
          y: 0,
          nodeId: null,
          frame: null
        });
      },
      p = async () => {
        const v = e.frame;
        if (v != null && v.url) {
          let _ = v.url;
          if (Er.isContentRef(_)) try {
            await Er.init();
            const w = Er.extractId(_),
              k = await Er.get(w);
            k && (_ = k);
          } catch (w) {
            console.error("[FrameContextMenu] content_ref 解析失败:", w);
          }
          try {
            const {
                buildChatComposerMediaFromUrl: w
              } = await Ie(async () => {
                const {
                  buildChatComposerMediaFromUrl: A
                } = await Promise.resolve().then(() => MD);
                return {
                  buildChatComposerMediaFromUrl: A
                };
              }, void 0, import.meta.url),
              k = await w({
                sourceUrl: _,
                name: `Frame-${(v.time ?? 0).toFixed(2)}s.png`,
                isImage: !0,
                isVideo: !1,
                mimeType: "image/png",
                index: Date.now() % 1e5
              });
            if (!k) {
              console.error("[FrameContextMenu] 发送到对话失败：媒体落盘失败"), h();
              return;
            }
            s(!0), o(A => [...A, {
              ...k,
              fromHistory: !0
            }]);
          } catch (w) {
            console.error("[FrameContextMenu] 发送到对话失败:", w);
          }
        }
        h();
      },
      m = async () => {
        var B, F;
        const v = e.frame;
        if (!(v != null && v.url)) {
          h();
          return;
        }
        const _ = e.nodeId ? r.find(N => N.id === e.nodeId) ?? null : null,
          w = `Frame-${(v.time ?? 0).toFixed(2)}s`,
          {
            resolveUrlForInputImageCanvas: k,
            canvasNodeTypeForMediaDrop: A,
            defaultCanvasNodeSizeForMediaDrop: S
          } = await Ie(async () => {
            const {
              resolveUrlForInputImageCanvas: N,
              canvasNodeTypeForMediaDrop: G,
              defaultCanvasNodeSizeForMediaDrop: z
            } = await Promise.resolve().then(() => sw);
            return {
              resolveUrlForInputImageCanvas: N,
              canvasNodeTypeForMediaDrop: G,
              defaultCanvasNodeSizeForMediaDrop: z
            };
          }, void 0, import.meta.url),
          C = String((_ == null ? void 0 : _._contentAssetId) || ((B = _ == null ? void 0 : _.settings) == null ? void 0 : B._contentAssetId) || ((F = _ == null ? void 0 : _.settings) == null ? void 0 : F._assetId) || "").trim(),
          I = await k(v.url, {
            nodeName: w,
            assetId: C || void 0,
            sourceNode: _
          });
        if (!I) {
          h();
          return;
        }
        const {
            width: E,
            height: M
          } = S(I.mediaType),
          T = 24;
        let P, R;
        if (_) P = _.x + (_.width ?? 320) + T, R = _.y;else {
          const N = kj(window.innerWidth / 2, window.innerHeight / 2, a, i.current);
          P = (N == null ? void 0 : N.x) ?? 100, R = (N == null ? void 0 : N.y) ?? 100;
        }
        const j = String(I.settings._localCacheAssetId || I.settings._assetId || C || "").trim();
        l(N => {
          let G = P;
          for (; N.some(V => Math.abs(V.x - G) < 16 && Math.abs(V.y - R) < 16);) G += E + T;
          const z = {
            id: u(),
            type: A(),
            x: G,
            y: R,
            width: E,
            height: M,
            content: I.content,
            prompt: "",
            nodeName: I.nodeName || w,
            settings: {
              ...I.settings
            },
            ...(j ? {
              _contentAssetId: j
            } : {}),
            ...(I.videoPosterUrl ? {
              videoPosterUrl: I.videoPosterUrl
            } : {})
          };
          return [...N, z];
        }), h();
      },
      f = () => {
        const v = e.frame;
        if (v != null && v.url) {
          const _ = r.filter(w => w.type === "preview");
          if (_.length > 0) {
            const w = _[_.length - 1].id;
            d(w, {
              content: v.url,
              previewType: "image"
            });
          }
        }
        h();
      },
      y = `w-full text-left px-2.5 py-1.5 text-xs flex items-center gap-1.5 transition-colors ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
      b = v => n ? "text-zinc-400" : "text-zinc-700";
    return c.jsxs("div", {
      className: `fixed z-[110] w-44 rounded-lg shadow-2xl py-0.5 animate-in fade-in duration-100 border ${n ? "bg-[#18181b] border-zinc-700" : "bg-white border-zinc-200"}`,
      style: {
        left: e.x,
        top: e.y
      },
      onClick: v => v.stopPropagation(),
      children: [c.jsxs("button", {
        className: y,
        onClick: p,
        children: [c.jsx(qv, {
          size: 13,
          className: b()
        }), x(" 发送到当前对话")]
      }), c.jsxs("button", {
        className: y,
        onClick: m,
        children: [c.jsx(v5e, {
          size: 13,
          className: b()
        }), x(" 发送到画布")]
      }), c.jsxs("button", {
        className: y,
        onClick: f,
        children: [c.jsx(ul, {
          size: 13,
          className: b()
        }), x(" 发送到预览窗口")]
      })]
    });
  },
  ARi = Object.freeze({
    busy: !1,
    progress: 0,
    selection: null
  });

function KFt(e) {
  const t = new Map(),
    n = new Map(),
    r = a => {
      for (const i of Array.from(n.get(a) || [])) i();
    };
  return e == null || e.subscribe(() => {
    const a = [...t.keys()];
    t.clear(), a.forEach(r);
  }), {
    read(a) {
      const i = t.get(a);
      return i != null && i.valid() ? i.snapshot : ARi;
    },
    subscribe(a, i) {
      let o = n.get(a);
      return o || (o = new Set(), n.set(a, o)), o.add(i), () => {
        o.delete(i), !o.size && n.get(a) === o && n.delete(a);
      };
    },
    claim(a, i = null) {
      var u;
      const o = e == null ? void 0 : e.lease(),
        s = () => !o || o.isCurrent();
      if (!s() || (u = t.get(a)) != null && u.valid()) return null;
      const l = {
        valid: s,
        snapshot: Object.freeze({
          busy: !0,
          progress: 0,
          selection: i ? Object.freeze({
            ...i
          }) : null
        })
      };
      t.set(a, l), r(a);
      const d = () => t.get(a) === l && s();
      return {
        valid: s,
        current: d,
        progress(h) {
          !d() || Object.is(l.snapshot.progress, h) || (l.snapshot = Object.freeze({
            ...l.snapshot,
            progress: h
          }), r(a));
        },
        release() {
          t.get(a) === l && (t.delete(a), r(a));
        }
      };
    }
  };
}

function SRi(e, t) {
  let n = {
    busy: !1,
    selection: null
  };
  return {
    subscribe: r => e.subscribe(t, r),
    readLifecycle() {
      const r = e.read(t);
      return (r.busy !== n.busy || r.selection !== n.selection) && (n = {
        busy: r.busy,
        selection: r.selection
      }), n;
    },
    readProgress: () => e.read(t).progress,
    claim: r => e.claim(t, r)
  };
}

const gun = new WeakMap();

function Dhr(e) {
  let t = gun.get(e);
  return t || (t = KFt(e), gun.set(e, t)), t;
}

function IRi(e, t) {
  return (e ? Dhr(e) : KFt()).claim(t);
}

function BJe(e, t = {
  prepare: MJe,
  now: Date.now
}) {
  var l, d, u, h;
  const n = e.documentLease ?? ((l = e.documentSession) == null ? void 0 : l.lease()),
    r = () => !n || n.isCurrent();
  if (!r()) return null;
  const a = IRi(e.documentSession, `expand:${((d = e.sourceNode) == null ? void 0 : d.id) || "context-menu"}`);
  if (!a) return null;
  const i = () => r() && a.valid(),
    o = p => {
      i() && e.setNodes(m => i() ? p(m) : m);
    },
    s = p => {
      var m;
      (m = e.setHistory) == null || m.call(e, p);
    };
  try {
    const p = e.generateId(),
      m = e.generateId(),
      f = t.now(),
      y = e.sourceNode && e.setConnections ? {
        id: e.generateId(),
        from: e.sourceNode.id,
        to: p
      } : null,
      b = g4i({
        id: p,
        sourceNode: e.sourceNode,
        existingNodes: e.existingNodes,
        modelId: e.modelId,
        modelName: e.modelName,
        pending: !0,
        nodeName: "智能扩图",
        startTime: f
      }),
      v = {
        id: m,
        type: "image",
        url: "",
        prompt: "智能扩图",
        ...ky(f),
        status: "generating",
        progress: 0,
        modelName: e.modelName || "智能扩图",
        sourceNodeId: (u = e.sourceNode) == null ? void 0 : u.id,
        targetPreviewId: p
      },
      _ = {
        expandModelId: e.modelId,
        expandModelName: e.modelName,
        model: e.modelName
      },
      w = M => M.id === m && M.startTime === f && M.targetPreviewId === p,
      k = M => {
        var T;
        return M.id === p && (M._expandTaskStartTime ?? ((T = M.settings) == null ? void 0 : T._expandTaskStartTime)) === f;
      },
      A = M => {
        var T;
        return k(M) && (M._expandPending === !0 || ((T = M.settings) == null ? void 0 : T._expandPending) === !0) && !M.content;
      };
    let S = !1,
      C;
    const I = M => {
        var T;
        a.release(), i() && ((T = e.onSettled) == null || T.call(e, E, M));
      },
      E = {
        previewNodeId: p,
        historyId: m,
        startTime: f,
        isCurrent: i,
        onRemoteTaskId(M) {
          S || (C = M, s(T => T.map(P => w(P) && P.status === "generating" ? {
            ...P,
            remoteTaskId: M
          } : P)));
        },
        onProgress(M) {
          S || s(T => T.map(P => w(P) && P.status === "generating" ? {
            ...P,
            progress: o8n(M)
          } : P));
        },
        onError(M) {
          if (!S) {
            S = !0;
            try {
              o(T => T.map(P => A(P) ? {
                ...Rkt(P),
                errorMsg: M.message
              } : P)), s(T => T.map(P => w(P) && P.status === "generating" ? {
                ...P,
                status: "failed",
                progress: 0,
                errorMsg: M.message
              } : P));
            } finally {
              I(M);
            }
          }
        },
        async onSuccess(M) {
          var F;
          if (S) return;
          const T = String(M[0] || "").trim();
          if (!T) {
            (F = E.onError) == null || F.call(E, new Error("扩图未返回结果"));
            return;
          }
          S = !0;
          const P = N => {
              var G;
              return k(N) && N.content === T && !N._expandPending && !((G = N.settings) != null && G._expandPending);
            },
            R = Math.max(0, t.now() - f),
            j = {
              ...v,
              url: T,
              originalUrl: T,
              status: "completed",
              progress: 100,
              durationMs: R,
              generationTime: `${(R / 1e3).toFixed(1)}s`,
              remoteTaskId: C
            },
            B = N => {
              s(G => G.map(z => w(z) && z.status === "generating" ? {
                ...z,
                ...N
              } : z));
            };
          try {
            o(G => G.map(z => {
              if (!A(z)) return z;
              const V = m4i(z, T, _);
              return {
                ...V,
                _expandTaskStartTime: f,
                settings: {
                  ...V.settings,
                  _expandTaskStartTime: f
                }
              };
            }));
            const N = await t.prepare(p, M);
            if (B(N.primaryDisplayUrl ? TJe(N, j) : j), !N.primaryDisplayUrl) return;
            o(G => G.map(z => P(z) ? {
              ...z,
              ...y4i(N, _, z.settings)
            } : z));
          } catch (N) {
            console.warn("[智能扩图] 素材增强失败，已保留远程结果", N), B(j);
          } finally {
            try {
              o(N => N.map(G => P(G) ? Rkt(G) : G));
            } finally {
              I();
            }
          }
        }
      };
    return o(M => M.some(T => T.id === p) ? M : [...M, b]), y && i() && ((h = e.setConnections) == null || h.call(e, M => i() && !M.some(T => T.id === y.id) ? [...M, y] : M)), s(M => M.some(T => T.id === m) ? M : [v, ...M]), E;
  } catch (p) {
    throw a.release(), p;
  }
}

function FJe(e) {
  return e ? "border-zinc-700/80 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800/80" : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:bg-zinc-100";
}

function Vde(e) {
  return e ? "border-zinc-500 bg-white text-zinc-900 hover:bg-zinc-100" : "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800";
}

let yun = null;

const CRi = [{
  label: "1:1",
  value: 1
}, {
  label: "3:2",
  value: 3 / 2
}, {
  label: "2:3",
  value: 2 / 3
}, {
  label: "4:3",
  value: 4 / 3
}, {
  label: "3:4",
  value: 3 / 4
}, {
  label: "16:9",
  value: 16 / 9
}, {
  label: "9:16",
  value: 9 / 16
}, {
  label: "21:9",
  value: 21 / 9
}, {
  label: "9:21",
  value: 9 / 21
}];

function Lhr(e, t) {
  return t === 0 ? e : Lhr(t, e % t);
}

function ERi(e, t) {
  const n = Lhr(e, t);
  return `${e / n}:${t / n}`;
}

const bun = .76;

function TRi(e, t, n) {
  let r = e,
    a = t;
  for (let i = 0; i < n; i++) {
    const o = r;
    r = -a, a = o;
  }
  return {
    x: r,
    y: a
  };
}

const MRi = ["left-0 top-0 -translate-x-1/2 -translate-y-1/2", "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2", "right-0 top-0 translate-x-1/2 -translate-y-1/2", "right-0 top-1/2 translate-x-1/2 -translate-y-1/2", "right-0 bottom-0 translate-x-1/2 translate-y-1/2", "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2", "left-0 bottom-0 -translate-x-1/2 translate-y-1/2", "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"],
  QFt = ({
    isOpen: e,
    onClose: t,
    imageUrl: n,
    isDark: r,
    onConfirm: a,
    nodes: i,
    sourceNode: o
  }) => {
    on();
    const [s, l] = g.useState(null),
      [d, u] = g.useState(!1),
      [h, p] = g.useState(null),
      [m, f] = g.useState([]),
      [y, b] = g.useState(null),
      [v, _] = g.useState(!1),
      [w, k] = g.useState(null),
      [A, S] = g.useState(!1),
      [C, I] = g.useState(null),
      [E, M] = g.useState(null),
      [T, P] = g.useState(null),
      [R, j] = g.useState(null),
      [B, F] = g.useState(null),
      [N, G] = g.useState(!1),
      [z, V] = g.useState(0),
      [O, L] = g.useState(!1),
      [D, U] = g.useState(!1),
      H = g.useRef(null),
      Y = g.useRef(null),
      K = g.useRef(null),
      W = g.useRef(null),
      Q = g.useRef(null),
      q = g.useRef(null),
      ne = g.useRef(null),
      de = g.useRef(0),
      le = g.useRef(!1),
      J = g.useRef(!1),
      [pe, ce] = g.useState(null),
      we = g.useCallback(() => {
        de.current = z, le.current = O, J.current = D;
      }, [z, O, D]);
    g.useEffect(() => {
      we();
    }, [we]);
    const X = g.useCallback(() => {
        ae.current = {
          x: 0,
          y: 0
        }, ie.current = 1, ye({
          x: 0,
          y: 0
        }), re(1);
        const ln = ne.current;
        ln && (ln.style.transform = "translate(0px, 0px) scale(1)");
      }, []),
      [Z, re] = g.useState(1),
      [fe, ye] = g.useState({
        x: 0,
        y: 0
      }),
      ie = g.useRef(1),
      ae = g.useRef({
        x: 0,
        y: 0
      }),
      [be, Ee] = g.useState(!1),
      xe = g.useRef(null),
      he = g.useRef(null),
      ue = g.useRef(null),
      ge = g.useMemo(() => {
        if (o) return (i == null ? void 0 : i.find(ln => ln.id === o.id)) ?? o;
      }, [i, o]),
      _e = (o == null ? void 0 : o.id) || "",
      ke = g.useRef(ge);
    ke.current = ge;
    const [ve, Te] = g.useState(null),
      Ne = g.useCallback(() => {
        const ln = Q.current,
          Pn = H.current;
        if (!ln || !(Pn != null && Pn.w) || !Pn.h) return;
        const rn = ln.getBoundingClientRect(),
          Yn = Pn.w / Pn.h,
          Ct = rn.width * bun,
          Cn = rn.height * bun;
        let un, Jn;
        Ct / Cn > Yn ? (Jn = Cn, un = Jn * Yn) : (un = Ct, Jn = un / Yn);
        const Kn = de.current,
          en = Kn % 2 === 1 ? Jn : un,
          Vn = Kn % 2 === 1 ? un : Jn;
        ce({
          width: un,
          height: Jn
        }), Te({
          left: rn.left + (rn.width - en) / 2,
          top: rn.top + (rn.height - Vn) / 2,
          width: en,
          height: Vn
        });
      }, []);
    g.useEffect(() => {
      e && (f([]), b(null), _(!1), k(null), Te(null), ce(null), re(1), ye({
        x: 0,
        y: 0
      }), ie.current = 1, ae.current = {
        x: 0,
        y: 0
      }, Ee(!1), I(null), M(null), P(null), j(null), F(yun), G(!1), V(0), L(!1), U(!1), de.current = 0, le.current = !1, J.current = !1, xe.current = null, he.current != null && (cancelAnimationFrame(he.current), he.current = null), ue.current && (clearTimeout(ue.current), ue.current = null));
    }, [e]), g.useEffect(() => {
      e && (f([]), b(null), I(null), _(!1), k(null), M(null), P(null), j(null), X());
    }, [e, n, X]), g.useEffect(() => (window.dispatchEvent(new CustomEvent("freeSplitModalChange", {
      detail: e
    })), () => {
      window.dispatchEvent(new CustomEvent("freeSplitModalChange", {
        detail: !1
      }));
    }), [e]);
    const [me, Ae] = g.useState(0);
    g.useEffect(() => Zhe(() => Ae(ln => ln + 1)), []), g.useEffect(() => {
      if (!e || !n) return;
      let ln = !1;
      const Pn = n.startsWith("blob:") || n.startsWith("data:") || n.startsWith("asset:") || /^https?:\/\//i.test(n);
      return u(!0), l(Pn ? n : null), (async () => {
        const rn = await __e(n, ke.current);
        ln || (rn ? l(rn) : Pn || l(null), u(!1));
      })().catch(() => {
        ln || (Pn || l(null), u(!1));
      }), () => {
        ln = !0;
      };
    }, [e, n, _e, me]);
    const Fe = g.useCallback(() => {
      (async () => {
        const ln = await __e(n, ke.current);
        ln && l(ln);
      })();
    }, [n, _e]);
    g.useEffect(() => {
      if (!e) return;
      const ln = () => Ne();
      return window.addEventListener("resize", ln), () => window.removeEventListener("resize", ln);
    }, [e, Ne]), g.useEffect(() => {
      if (h) {
        const ln = requestAnimationFrame(() => Ne());
        return () => cancelAnimationFrame(ln);
      }
    }, [h, z, Ne]);
    const Me = g.useCallback((ln, Pn) => {
        if (!ve || !pe || !(h != null && h.w) || !h.h || ie.current <= 0) return null;
        const rn = ae.current,
          Yn = ie.current,
          Ct = (ln - ve.left - rn.x) / Yn,
          Cn = (Pn - ve.top - rn.y) / Yn,
          un = ve.width / 2,
          Jn = ve.height / 2;
        let Kn = Ct - un,
          en = Cn - Jn;
        le.current && (Kn = -Kn), J.current && (en = -en);
        const Vn = TRi(Kn, en, de.current);
        Kn = Vn.x, en = Vn.y;
        const Tt = Kn / pe.width + .5,
          Ue = en / pe.height + .5;
        return Tt < 0 || Tt > 1 || Ue < 0 || Ue > 1 ? null : {
          x: Tt * h.w,
          y: Ue * h.h
        };
      }, [ve, pe, h]),
      Re = g.useCallback((ln, Pn) => {
        for (let rn = m.length - 1; rn >= 0; rn--) {
          const Yn = m[rn];
          if (ln >= Yn.x && ln <= Yn.x + Yn.w && Pn >= Yn.y && Pn <= Yn.y + Yn.h) return rn;
        }
        return -1;
      }, [m]),
      $e = g.useCallback((ln, Pn, rn) => {
        const Yn = Math.min(rn.w, rn.h) * .15,
          Cn = Math.max(Yn, 8),
          un = ln >= rn.x - Cn / 2 && ln <= rn.x + Cn / 2,
          Jn = ln >= rn.x + rn.w - Cn / 2 && ln <= rn.x + rn.w + Cn / 2,
          Kn = Pn >= rn.y - Cn / 2 && Pn <= rn.y + Cn / 2,
          en = Pn >= rn.y + rn.h - Cn / 2 && Pn <= rn.y + rn.h + Cn / 2;
        return Kn && un ? "nw" : Kn && Jn ? "ne" : en && un ? "sw" : en && Jn ? "se" : Kn ? "n" : en ? "s" : un ? "w" : Jn ? "e" : null;
      }, []),
      rt = g.useCallback(ln => {
        if (ln.preventDefault(), ln.stopPropagation(), !h || A) return;
        if (ln.button === 1 || ln.button === 2) {
          Ee(!0), xe.current = {
            clientX: ln.clientX,
            clientY: ln.clientY,
            panX: ae.current.x,
            panY: ae.current.y
          };
          return;
        }
        if (ln.button !== 0) return;
        const Pn = Me(ln.clientX, ln.clientY);
        if (!Pn) return;
        if (C !== null && m[C]) {
          const Yn = $e(Pn.x, Pn.y, m[C]);
          if (Yn) {
            M({
              index: C,
              handle: Yn
            }), k(Pn);
            return;
          }
        }
        const rn = Re(Pn.x, Pn.y);
        if (rn >= 0) {
          I(rn), P({
            index: rn,
            startX: Pn.x,
            startY: Pn.y,
            origRect: {
              ...m[rn]
            }
          });
          return;
        }
        I(null), _(!0), k(Pn), b({
          x: Pn.x,
          y: Pn.y,
          w: 0,
          h: 0
        });
      }, [h, A, Me, C, m, Re, $e]),
      nt = g.useCallback(() => {
        const ln = ne.current;
        if (!ln) return;
        const Pn = ie.current,
          rn = ae.current;
        ln.style.transform = `translate(${rn.x}px, ${rn.y}px) scale(${Pn})`;
      }, []);
    g.useLayoutEffect(() => {
      nt();
    });
    const ze = g.useCallback(ln => {
        const Pn = xe.current;
        if (Pn) {
          const Kn = Pn.panX + ln.clientX - Pn.clientX,
            en = Pn.panY + ln.clientY - Pn.clientY;
          ae.current = {
            x: Kn,
            y: en
          }, he.current == null && (he.current = requestAnimationFrame(() => {
            he.current = null, nt();
          }));
          return;
        }
        const rn = Me(ln.clientX, ln.clientY);
        if (!rn || !h) return;
        if (E && w) {
          const {
              index: Kn,
              handle: en
            } = E,
            Vn = R || m[Kn];
          if (!Vn) return;
          const Tt = m[Kn],
            Ue = Tt.x + Tt.w,
            et = Tt.y + Tt.h,
            ft = B;
          let ht = Vn.x,
            wt = Vn.y,
            jt = Vn.w,
            bt = Vn.h;
          ft != null ? en === "e" ? (jt = Math.max(10, Math.min(rn.x - Tt.x, h.w - Tt.x)), bt = jt / ft, ht = Tt.x, wt = Tt.y) : en === "w" ? (ht = Math.max(0, Math.min(rn.x, Ue - 10)), jt = Ue - ht, bt = jt / ft, wt = et - bt) : en === "s" ? (bt = Math.max(10, Math.min(rn.y - Tt.y, h.h - Tt.y)), jt = bt * ft, ht = Tt.x, wt = Tt.y) : en === "n" ? (wt = Math.max(0, Math.min(rn.y, et - 10)), bt = et - wt, jt = bt * ft, ht = Ue - jt) : en === "se" ? (jt = Math.max(10, Math.min(rn.x - Tt.x, h.w - Tt.x)), bt = jt / ft, ht = Tt.x, wt = Tt.y, Tt.y + bt > h.h && (bt = Math.max(10, h.h - Tt.y), jt = bt * ft)) : en === "nw" ? (ht = Math.max(0, Math.min(rn.x, Ue - 10)), wt = Math.max(0, Math.min(rn.y, et - 10)), jt = Ue - ht, bt = jt / ft, wt = et - bt, wt < 0 && (wt = 0, bt = et, jt = bt * ft, ht = Ue - jt)) : en === "ne" ? (jt = Math.max(10, Math.min(rn.x - Tt.x, h.w - Tt.x)), bt = jt / ft, ht = Tt.x, wt = et - bt, wt < 0 && (wt = 0, bt = et, jt = bt * ft)) : en === "sw" && (ht = Math.max(0, Math.min(rn.x, Ue - 10)), bt = Math.max(10, Math.min(rn.y - Tt.y, h.h - Tt.y)), jt = bt * ft, ht = Ue - jt, wt = Tt.y, ht < 0 && (ht = 0, jt = Ue, bt = jt / ft)) : (en.includes("w") && (ht = Math.max(0, Math.min(rn.x, Ue - 10)), jt = Ue - ht), en.includes("e") && (jt = Math.max(10, Math.min(rn.x - Tt.x, h.w - Tt.x)), ht = Tt.x), en.includes("n") && (wt = Math.max(0, Math.min(rn.y, et - 10)), bt = et - wt), en.includes("s") && (bt = Math.max(10, Math.min(rn.y - Tt.y, h.h - Tt.y)), wt = Tt.y)), jt = Math.max(10, Math.min(jt, h.w)), bt = Math.max(10, Math.min(bt, h.h)), ht = Math.max(0, Math.min(ht, h.w - jt)), wt = Math.max(0, Math.min(wt, h.h - bt)), j({
            x: Math.round(ht),
            y: Math.round(wt),
            w: Math.round(jt),
            h: Math.round(bt)
          });
          return;
        }
        if (T) {
          const {
              startX: Kn,
              startY: en,
              origRect: Vn
            } = T,
            Tt = rn.x - Kn,
            Ue = rn.y - en,
            et = Math.max(0, Math.min(Vn.x + Tt, h.w - Vn.w)),
            ft = Math.max(0, Math.min(Vn.y + Ue, h.h - Vn.h));
          j({
            ...Vn,
            x: Math.round(et),
            y: Math.round(ft)
          });
          return;
        }
        if (!v || !w) return;
        const Yn = B;
        let Ct, Cn, un, Jn;
        if (Yn == null) Ct = Math.min(w.x, rn.x), Cn = Math.min(w.y, rn.y), un = Math.abs(rn.x - w.x), Jn = Math.abs(rn.y - w.y);else {
          const Kn = Math.abs(rn.x - w.x),
            en = Math.abs(rn.y - w.y),
            Vn = Math.min(w.x, rn.x),
            Tt = Math.min(w.y, rn.y);
          Yn >= 1 ? (un = Math.min(Kn, en * Yn), Jn = un / Yn) : (Jn = Math.min(en, Kn / Yn), un = Jn * Yn), Ct = Vn, Cn = Tt;
        }
        h.w > 0 && h.h > 0 && (un = Math.min(un, h.w - Ct), Jn = Math.min(Jn, h.h - Cn), Ct = Math.max(0, Ct), Cn = Math.max(0, Cn), un = Math.max(0, un), Jn = Math.max(0, Jn)), b({
          x: Ct,
          y: Cn,
          w: un,
          h: Jn
        });
      }, [v, w, h, Me, E, m, T, R, nt, B]),
      Le = g.useCallback(ln => {
        if ((ln == null ? void 0 : ln.button) === 1 || (ln == null ? void 0 : ln.button) === 2) {
          he.current != null && (cancelAnimationFrame(he.current), he.current = null), ye(ae.current), xe.current = null, Ee(!1);
          return;
        }
        if (E && R) {
          const {
            index: Pn
          } = E;
          f(rn => rn.map((Yn, Ct) => Ct === Pn ? R : Yn)), M(null), k(null), j(null);
          return;
        }
        if (T && R) {
          const {
            index: Pn
          } = T;
          f(rn => rn.map((Yn, Ct) => Ct === Pn ? R : Yn)), P(null), j(null);
          return;
        }
        if (E) {
          M(null), k(null), j(null);
          return;
        }
        if (T) {
          P(null), j(null);
          return;
        }
        if (!(!v || !y)) {
          if (y.w >= 4 && y.h >= 4) {
            const Pn = m.length;
            f(rn => [...rn, {
              x: Math.round(y.x),
              y: Math.round(y.y),
              w: Math.round(Math.min(y.w, h.w - y.x)),
              h: Math.round(Math.min(y.h, h.h - y.y))
            }]), I(Pn);
          }
          _(!1), k(null), b(null);
        }
      }, [v, y, h, E, T, m.length, R]),
      Ke = g.useCallback(ln => {
        f(Pn => Pn.filter((rn, Yn) => Yn !== ln)), I(Pn => Pn === null || Pn === ln ? null : Pn > ln ? Pn - 1 : Pn);
      }, []),
      Xe = g.useCallback(() => {
        m.length === 0 || !h || (S(!0), a(m), t(), S(!1));
      }, [m, h, a, t]),
      De = g.useCallback(() => {
        A || t();
      }, [t, A]);
    g.useEffect(() => {
      if (!e) return;
      const ln = Pn => {
        Pn.key === "Escape" && (Pn.preventDefault(), De());
      };
      return window.addEventListener("keydown", ln), () => window.removeEventListener("keydown", ln);
    }, [e, De]);
    const Ye = g.useRef(ze),
      Ce = g.useRef(Le);
    Ye.current = ze, Ce.current = Le, g.useEffect(() => {
      if (!e) return;
      const ln = Yn => {
          Ye.current(Yn);
        },
        Pn = Yn => {
          Ce.current(Yn), (Yn.button === 1 || Yn.button === 2) && (he.current != null && (cancelAnimationFrame(he.current), he.current = null), ye(ae.current), xe.current = null, Ee(!1));
        },
        rn = Yn => {
          Yn.preventDefault(), Yn.stopPropagation();
        };
      return window.addEventListener("mousemove", ln), window.addEventListener("mouseup", Pn), window.addEventListener("contextmenu", rn, !0), () => {
        window.removeEventListener("mousemove", ln), window.removeEventListener("mouseup", Pn), window.removeEventListener("contextmenu", rn, !0);
      };
    }, [e]), g.useEffect(() => {
      const ln = ne.current,
        Pn = Q.current;
      if (!ln && !Pn || !ve || !h) return;
      const rn = Yn => {
        Yn.preventDefault(), Yn.stopPropagation(), ue.current && (clearTimeout(ue.current), ue.current = null);
        const Ct = .5,
          Cn = 5,
          un = 1 - Yn.deltaY * .002,
          Jn = ie.current,
          Kn = Math.min(Cn, Math.max(Ct, Jn * un));
        if (Kn === Jn) return;
        const en = Kn / Jn,
          Vn = ae.current;
        ae.current = {
          x: Yn.clientX - ve.left - (Yn.clientX - ve.left - Vn.x) * en,
          y: Yn.clientY - ve.top - (Yn.clientY - ve.top - Vn.y) * en
        }, ie.current = Kn, ln && (ln.style.transform = `translate(${ae.current.x}px, ${ae.current.y}px) scale(${Kn})`), ue.current = setTimeout(() => {
          ue.current = null, re(ie.current), ye(ae.current);
        }, 120);
      };
      return ln == null || ln.addEventListener("wheel", rn, {
        passive: !1
      }), Pn == null || Pn.addEventListener("wheel", rn, {
        passive: !1
      }), () => {
        ln == null || ln.removeEventListener("wheel", rn), Pn == null || Pn.removeEventListener("wheel", rn), ue.current && (clearTimeout(ue.current), ue.current = null);
      };
    }, [ve, h]);
    const He = g.useCallback(() => {
        const ln = q.current;
        if (ln) {
          const Pn = {
              w: ln.naturalWidth,
              h: ln.naturalHeight
            },
            rn = H.current;
          rn && (rn.w !== Pn.w || rn.h !== Pn.h) && (f([]), b(null), I(null), _(!1), k(null), M(null), P(null), j(null), X()), H.current = Pn, p(Pn), setTimeout(Ne, 0);
        }
      }, [Ne, X]),
      Ve = g.useMemo(() => {
        const ln = [{
            label: "自由",
            value: null
          }],
          Pn = H.current;
        return Pn && ln.push({
          label: `原图 (${ERi(Pn.w, Pn.h)})`,
          value: Pn.w / Pn.h
        }), [...ln, ...CRi];
      }, [h]),
      it = g.useMemo(() => {
        const ln = Ve.find(Pn => Pn.value === B);
        return ln ? ln.label : B == null ? "自由" : B >= 1 ? `${Math.round(B * 100) / 100}:1` : `1:${Math.round(1 / B * 100) / 100}`;
      }, [Ve, B]);
    g.useEffect(() => {
      if (!N) return;
      const ln = Pn => {
        var rn;
        (rn = Y.current) != null && rn.contains(Pn.target) || G(!1);
      };
      return document.addEventListener("mousedown", ln), () => document.removeEventListener("mousedown", ln);
    }, [N]);
    const It = g.useCallback(ln => {
        ln.rotation != null && (de.current = ln.rotation, V(ln.rotation)), ln.flipH != null && (le.current = ln.flipH, L(ln.flipH)), ln.flipV != null && (J.current = ln.flipV, U(ln.flipV)), X(), requestAnimationFrame(() => Ne());
      }, [X, Ne]),
      Ft = g.useCallback(() => {
        h && It({
          rotation: (de.current + 1) % 4
        });
      }, [h, It]),
      We = g.useCallback(() => {
        h && It({
          rotation: (de.current + 3) % 4
        });
      }, [h, It]),
      Ze = g.useCallback(() => {
        h && It({
          flipH: !le.current
        });
      }, [h, It]),
      Ge = g.useCallback(() => {
        h && It({
          flipV: !J.current
        });
      }, [h, It]),
      Oe = g.useCallback(() => {
        const ln = H.current;
        de.current = 0, le.current = !1, J.current = !1, V(0), L(!1), U(!1), ln && p({
          ...ln
        }), X(), f([]), b(null), I(null), _(!1), k(null), M(null), P(null), j(null), requestAnimationFrame(() => Ne());
      }, [X, Ne]),
      st = g.useCallback(ln => {
        if (!ve || !h) return;
        const Pn = .5,
          rn = 5,
          Yn = ie.current,
          Ct = Math.min(rn, Math.max(Pn, Yn * ln));
        if (Ct === Yn) return;
        const Cn = Ct / Yn,
          un = ve.left + ve.width / 2,
          Jn = ve.top + ve.height / 2,
          Kn = ae.current;
        ae.current = {
          x: un - ve.left - (un - ve.left - Kn.x) * Cn,
          y: Jn - ve.top - (Jn - ve.top - Kn.y) * Cn
        }, ie.current = Ct;
        const en = ne.current;
        en && (en.style.transform = `translate(${ae.current.x}px, ${ae.current.y}px) scale(${Ct})`), re(Ct), ye(ae.current);
      }, [ve, h]),
      vt = g.useMemo(() => {
        const ln = [];
        return z && ln.push(`rotate(${z * 90}deg)`), O && ln.push("scaleX(-1)"), D && ln.push("scaleY(-1)"), ln.length ? ln.join(" ") : void 0;
      }, [z, O, D]),
      Ht = g.useCallback(() => {
        if (be) return "grabbing";
        if (E) {
          const ln = E.handle;
          if (ln === "nw" || ln === "se") return "nwse-resize";
          if (ln === "ne" || ln === "sw") return "nesw-resize";
          if (ln === "n" || ln === "s") return "ns-resize";
          if (ln === "e" || ln === "w") return "ew-resize";
        }
        return T ? "move" : "crosshair";
      }, [be, E, T]);
    if (!e) return null;
    const nn = r ? "border-zinc-700/80 bg-[#1a1a1e] shadow-2xl" : "border-zinc-200 bg-white shadow-md",
      pt = r ? "flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/10 hover:text-white" : "flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900",
      lt = r ? "mx-1 h-5 w-px bg-zinc-700/80" : "mx-1 h-5 w-px bg-zinc-200",
      gt = r ? N ? "border-zinc-600 bg-[#232326] text-zinc-100" : "border-zinc-700/80 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800/80" : N ? "border-zinc-300 bg-zinc-100 text-zinc-900" : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100",
      Ut = r ? "border-zinc-600/90 bg-[#232326] shadow-[0_12px_40px_rgba(0,0,0,0.55)]" : "border-zinc-200 bg-white shadow-md",
      _t = r ? "border-b border-zinc-700/80 text-zinc-400" : "border-b border-zinc-100 text-zinc-500",
      At = ln => ln ? r ? "bg-white text-zinc-900" : "bg-zinc-900 text-white" : r ? "text-zinc-200 hover:bg-zinc-700/60" : "text-zinc-700 hover:bg-zinc-100",
      Yt = r ? "border-white/15 bg-black/45 text-white/90 hover:bg-black/65" : "border-zinc-300 bg-white/90 text-zinc-800 hover:bg-zinc-100",
      qe = "text-zinc-500",
      kt = r ? "text-white" : "text-zinc-900",
      St = v && y && y.w >= 2 && y.h >= 2 ? y : C !== null && m[C] ? ((E == null ? void 0 : E.index) === C || (T == null ? void 0 : T.index) === C) && R ? R : m[C] : null,
      hn = !!(St && St.w >= 4 && St.h >= 4),
      Qt = (ln, Pn, rn) => c.jsxs("div", {
        className: "absolute",
        style: {
          left: `${ln.x / h.w * 100}%`,
          top: `${ln.y / h.h * 100}%`,
          width: `${ln.w / h.w * 100}%`,
          height: `${ln.h / h.h * 100}%`,
          border: rn.isSelected ? "1px solid rgba(255,255,255,0.95)" : "1px solid rgba(255,255,255,0.45)",
          boxShadow: rn.showMask ? "0 0 0 100vmax rgba(0,0,0,0.62)" : void 0
        },
        children: [rn.index != null && c.jsxs(c.Fragment, {
          children: [c.jsx("span", {
            className: "absolute left-1 top-1 rounded bg-black/50 px-1 py-0.5 text-[10px] font-medium leading-none text-white/90",
            children: rn.index + 1
          }), c.jsx("button", {
            type: "button",
            onClick: Yn => {
              Yn.stopPropagation(), Ke(rn.index);
            },
            className: "pointer-events-auto absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded bg-black/50 text-white/80 hover:bg-red-500/80 hover:text-white",
            title: x("删除"),
            children: c.jsx(Qo, {
              size: 10
            })
          })]
        }), rn.showHandles && c.jsx(c.Fragment, {
          children: MRi.map((Yn, Ct) => c.jsx("div", {
            className: `absolute ${Yn} h-2 w-2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)]`
          }, Ct))
        })]
      }, Pn),
      Ot = c.jsxs("div", {
        ref: W,
        className: "canvas-fullscreen-tool-modal fixed inset-0 z-[10050] select-none",
        "data-free-split-modal": !0,
        onClick: De,
        onMouseDown: ln => {
          ln.preventDefault(), ln.stopPropagation();
        },
        onContextMenu: ln => ln.preventDefault(),
        children: [c.jsx("div", {
          className: "absolute inset-0 bg-[#0a0a0c]/92 backdrop-blur-[20px] saturate-110",
          "aria-hidden": !0
        }), c.jsx("button", {
          type: "button",
          onClick: ln => {
            ln.stopPropagation(), De();
          },
          className: `fixed right-5 top-5 z-[10054] flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${Yt}`,
          title: x("关闭"),
          children: c.jsx(Na, {
            size: 18,
            strokeWidth: 1.75
          })
        }), c.jsxs("div", {
          ref: Q,
          className: "fixed inset-0 z-[10051] flex items-center justify-center px-6 pb-28 pt-14",
          onClick: ln => ln.stopPropagation(),
          onMouseDown: rt,
          onContextMenu: ln => ln.preventDefault(),
          children: [(s ?? (!n.startsWith("content_ref:") && !d ? n : null)) && c.jsx("img", {
            ref: q,
            src: s ?? n,
            alt: "",
            className: "pointer-events-none absolute h-0 w-0 opacity-0",
            draggable: !1,
            onLoad: He,
            onError: Fe
          }), !s && d && c.jsx("span", {
            className: `text-sm ${r ? "text-zinc-400" : "text-zinc-500"}`,
            children: x("加载中...")
          })]
        }), h && ve && pe && c.jsx("div", {
          ref: ne,
          className: "fixed z-[10053] select-none overflow-visible",
          style: {
            left: ve.left,
            top: ve.top,
            width: ve.width,
            height: ve.height,
            transformOrigin: "0 0",
            cursor: Ht()
          },
          onMouseDown: rt,
          onMouseLeave: () => {
            xe.current && (he.current != null && (cancelAnimationFrame(he.current), he.current = null), ye(ae.current), xe.current = null, Ee(!1));
          },
          onContextMenu: ln => ln.preventDefault(),
          onClick: ln => ln.stopPropagation(),
          "aria-hidden": !0,
          children: c.jsxs("div", {
            className: "absolute left-1/2 top-1/2",
            style: {
              width: pe.width,
              height: pe.height,
              marginLeft: -pe.width / 2,
              marginTop: -pe.height / 2,
              transform: vt,
              transformOrigin: "center center"
            },
            children: [(s ?? n) && c.jsx("img", {
              src: s ?? n,
              alt: x("裁切源"),
              className: "block h-full w-full object-contain pointer-events-none select-none",
              draggable: !1,
              onError: Fe
            }), c.jsxs("div", {
              className: "absolute inset-0 pointer-events-none",
              children: [m.map((ln, Pn) => {
                const rn = C === Pn,
                  Yn = rn && ((E == null ? void 0 : E.index) === Pn || (T == null ? void 0 : T.index) === Pn),
                  Ct = Yn && R ? R : ln,
                  Cn = !!(St && (St === Ct || Ct.x === St.x && Ct.y === St.y && Ct.w === St.w && Ct.h === St.h));
                return Qt(Ct, Pn, {
                  isSelected: rn,
                  showHandles: rn && !Yn,
                  showMask: Cn && hn,
                  index: Pn
                });
              }), y && y.w >= 2 && y.h >= 2 && Qt(y, "drawing", {
                isSelected: !0,
                showHandles: !1,
                showMask: hn
              })]
            })]
          })
        }), c.jsxs("div", {
          ref: K,
          className: `fixed bottom-6 left-1/2 z-[10054] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 overflow-visible rounded-2xl border px-3 py-2 ${nn}`,
          onClick: ln => ln.stopPropagation(),
          onMouseDown: ln => ln.stopPropagation(),
          children: [c.jsxs("div", {
            ref: Y,
            className: "relative z-[110]",
            children: [c.jsxs("button", {
              type: "button",
              onClick: () => G(ln => !ln),
              className: `flex h-9 items-center gap-2 rounded-xl border px-3 text-xs transition-colors ${gt}`,
              children: [c.jsx("span", {
                className: qe,
                children: x("裁剪比例")
              }), c.jsx("span", {
                className: `font-medium ${kt}`,
                children: x(it)
              }), N ? c.jsx(j2, {
                size: 14
              }) : c.jsx(Mi, {
                size: 14
              })]
            }), N && c.jsxs("div", {
              className: `absolute bottom-full left-0 z-[110] mb-2 w-52 overflow-hidden rounded-xl border py-1 ${Ut}`,
              children: [c.jsx("div", {
                className: `px-3 py-2 text-[11px] font-medium ${_t}`,
                children: x("裁剪比例")
              }), Ve.map(ln => {
                const Pn = B === ln.value;
                return c.jsxs("button", {
                  type: "button",
                  onClick: () => {
                    yun = ln.value, F(ln.value), G(!1);
                  },
                  className: `flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors ${At(Pn)}`,
                  children: [c.jsx("span", {
                    children: x(ln.label)
                  }), Pn && c.jsx(io, {
                    size: 14
                  })]
                }, x(ln.label));
              })]
            })]
          }), c.jsx("div", {
            className: lt
          }), c.jsxs("div", {
            className: "flex items-center gap-0.5",
            children: [c.jsx("span", {
              className: `mr-1 text-[11px] ${qe}`,
              children: x("调整")
            }), c.jsx("button", {
              type: "button",
              className: pt,
              onClick: () => st(.85),
              title: x("缩小"),
              children: c.jsx(Wue, {
                size: 16,
                strokeWidth: 1.5
              })
            }), c.jsx("button", {
              type: "button",
              className: pt,
              onClick: () => st(1.15),
              title: x("放大"),
              children: c.jsx(Z$, {
                size: 16,
                strokeWidth: 1.5
              })
            }), c.jsx("button", {
              type: "button",
              className: pt,
              onClick: We,
              title: x("逆时针旋转"),
              children: c.jsx(vd, {
                size: 16,
                strokeWidth: 1.5
              })
            }), c.jsx("button", {
              type: "button",
              className: pt,
              onClick: Ge,
              title: x("垂直翻转"),
              children: c.jsx(nTn, {
                size: 16,
                strokeWidth: 1.5
              })
            }), c.jsx("button", {
              type: "button",
              className: pt,
              onClick: Ft,
              title: x("顺时针旋转"),
              children: c.jsx(ox, {
                size: 16,
                strokeWidth: 1.5
              })
            }), c.jsx("button", {
              type: "button",
              className: pt,
              onClick: Ze,
              title: x("水平翻转"),
              children: c.jsx(tTn, {
                size: 16,
                strokeWidth: 1.5
              })
            }), c.jsx("button", {
              type: "button",
              className: pt,
              onClick: Oe,
              title: x("重置"),
              children: c.jsx(bd, {
                size: 15,
                strokeWidth: 1.5
              })
            })]
          }), c.jsx("div", {
            className: lt
          }), c.jsxs("button", {
            type: "button",
            onClick: Xe,
            disabled: m.length === 0 || A,
            className: `flex h-9 shrink-0 items-center gap-1.5 rounded-xl border px-4 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-40 ${Vde(r)}`,
            children: [c.jsx(io, {
              size: 14
            }), A ? x("处理中…") : m.length > 0 ? x("确认修改 ({0})", m.length) : x("确认修改")]
          })]
        })]
      });
    return Da.createPortal(Ot, document.body);
  },
  PRi = Object.freeze(Object.defineProperty({
    __proto__: null,
    FreeSplitModal: QFt
  }, Symbol.toStringTag, {
    value: "Module"
  }));

async function RRi(e, t = {
  clone: UN,
  release: n => URL.revokeObjectURL(n)
}) {
  var l, d, u, h;
  const n = (l = e.documentSession) == null ? void 0 : l.lease(),
    r = () => !n || n.isCurrent();
  let a = e.imageUrl,
    i = null,
    o = e.fallback,
    s = !1;
  if (r()) try {
    if (/^(blob:|data:)/i.test(a) && (a = await t.clone(a), a.startsWith("blob:") && a !== e.imageUrl && (i = a)), !r()) return;
    const p = (d = e.onStart) == null ? void 0 : d.call(e, {
      documentLease: n
    });
    if (p === null || (s = !!p, o = p || o, !o)) return;
    const m = () => s || r(),
      f = {
        onSuccess: b => {
          if (m()) return o.onSuccess(b);
        },
        onRemoteTaskId: b => {
          var v;
          m() && ((v = o.onRemoteTaskId) == null || v.call(o, b));
        },
        onProgress: b => {
          var v;
          m() && ((v = o.onProgress) == null || v.call(o, b));
        },
        onError: b => {
          var v;
          m() && ((v = o.onError) == null || v.call(o, b));
        }
      };
    if (e.onClose(), !r()) {
      (u = f.onError) == null || u.call(f, new Error("画布项目已切换，本次扩图尚未派发"));
      return;
    }
    const y = await e.run(a, f);
    if (!(y != null && y.length)) throw new Error("扩图未返回结果");
    await f.onSuccess(y);
  } catch (p) {
    (s || r()) && ((h = o == null ? void 0 : o.onError) == null || h.call(o, p instanceof Error ? p : new Error("扩图失败")));
  } finally {
    i && t.release(i);
  }
}

const NRi = ["nano-banana", "nano-banana-2", "gemini-3.1-flash-image-preview", "gemini-nano-banana-2.1", "gemini-3.1-flash-lite-image", "gpt-image", "gpt-image-1.5", "gpt-image-2", "gpt-image-2.5-sunburst", "gpt-image-2.5-flare", "gpt-image-2-all"],
  jRi = ["nano-banana-fal", "gemini-nano-banana-2.1-fal", "gemini-3.1-flash-image-preview-fal", "gemini-3.1-flash-lite-image-fal", "nano-banana-2-fal", "gpt-image-2-fal", "gpt-image-2.5-sunburst-fal", "gpt-image-2.5-flare-fal", "muse-image-fal", "mai-image-2.5-pro-fal", "grok-imagine-image-fal", "grok-imagine-image-quality-fal", "grok-imagine-image-2.0-fal", "seedream-5.0-lite-fal", "seedream-5.0-pro-fal"],
  DRi = ["seedream-5.0-pro", "seedream-5.0-pro-api", "seedream-5.0-api", "seedream-4.5", "seedream-4.5-api", "seedream-4.0", "seedream-4.0-api"],
  LRi = N$r.filter(e => !jx(e)),
  ORi = ["nano-banana-huya", "nano-banana-pro-huya", "gemini-3.1-flash-image-preview-huya", "gpt-image-1.5-huya", "gpt-image-2-huya", "gpt-image-2.5-flare-huya", "gpt-image-2.5-sunburst-huya", "seedream-5.0-pro-huya", "seedream-5.0-pro-audit-huya", "seedream-5.0-lite-huya", "seedream-4.5-huya", "midjourney-huya", "wan-2.7-huya"],
  BRi = new Set(["midjourney-huya", "wan-2.7-huya"]),
  FRi = new Set(["gemini-3.1-flash-image-preview", "gemini-nano-banana-2.1", "gemini-nano-banana-2.1-fal", "gemini-3.1-flash-image-preview-fal", "gemini-3.1-flash-image-preview-huya", oX, "gemini-3.1-flash-lite-image-fal"]);

function vun(e) {
  if (jx(e)) return !1;
  const t = String(e || "").trim();
  return !t || Zae(t) ? !1 : mX(t) || t.includes("seedream") && t.endsWith("-huya") ? !0 : mk(t);
}

function zRi(e) {
  const t = String(e || "").trim().toLowerCase();
  return t ? t.includes("nano-banana") || t.includes("gpt-image") || t.includes("muse-image") || t.includes("mai-image") || t === "grok-imagine-image-fal" || t === "grok-imagine-image-quality-fal" || t === "grok-imagine-image-2.0-fal" || t.includes("seedream") || Zae(t) ? !0 : FRi.has(t) : !1;
}

function URi(e) {
  const t = new Map(),
    n = r => {
      for (const a of r) (a == null ? void 0 : a.type) === "Image" && a.id && !t.has(a.id) && t.set(a.id, a);
    };
  n(Array.isArray(e) ? e : []);
  try {
    n(Qa.getConfigs());
  } catch {}
  return [...t.values()];
}

function zJe(e, t, n = {}) {
  const r = kQe(URi(e), t),
    a = n.includeJimengNative === !0;
  return [...r.filter(o => o.localComfy && o.localComfy.model !== "h3" && o.enabled !== !1).map(o => o.id), ...NRi, ...jRi, ...(a ? DRi : []), ...(a ? LRi : []), ...(t ? ORi.filter(o => !a || !BRi.has(o)) : [])].map(o => r.find(s => s.id === o)).filter(Boolean);
}

function YFt(e, t) {
  return kQe(e.filter(n => n.type === "Image" && (zRi(n.id) || n.localComfy && n.localComfy.model !== "h3" && n.enabled !== !1)), t);
}

function Mpe(e, t, n, r) {
  if (!n || !r || !e || !t) return {
    left: 0,
    top: 0,
    width: e,
    height: t
  };
  const a = n / r;
  let i, o;
  return e / t > a ? (o = t, i = t * a) : (i = e, o = e / a), {
    left: (e - i) / 2,
    top: (t - o) / 2,
    width: i,
    height: o
  };
}

function XFt(e, t, n) {
  if (!t || !n || e.width <= 0 || e.height <= 0) return e;
  const r = Math.min(e.width / t, e.height / n),
    a = t * r,
    i = n * r;
  return {
    x: e.x + (e.width - a) / 2,
    y: e.y + (e.height - i) / 2,
    width: a,
    height: i
  };
}

function a$e(e, t, n, r, a) {
  const i = Mpe(t, n, r, a),
    o = i.left + e.x / r * i.width,
    s = i.top + e.y / a * i.height,
    l = e.width / r * i.width,
    d = e.height / a * i.height;
  return {
    left: `${o / t * 100}%`,
    top: `${s / n * 100}%`,
    width: `${l / t * 100}%`,
    height: `${d / n * 100}%`
  };
}

function $Ri(e, t, n, r, a, i, o) {
  const s = t > 0 && n > 0 ? XFt(e, t, n) : e;
  return a$e(s, r, a, i, o);
}

function GRi(e, t, n, r, a) {
  const i = Mpe(t, n, r, a);
  return {
    left: i.left + e.x / r * i.width,
    top: i.top + e.y / a * i.height,
    width: e.width / r * i.width,
    height: e.height / a * i.height
  };
}

function VRi(e, t, n, r, a, i) {
  const o = Mpe(n, r, a, i);
  return !o.width || !o.height || !a || !i ? {
    x: 0,
    y: 0
  } : {
    x: (e - o.left) / o.width * a,
    y: (t - o.top) / o.height * i
  };
}

function HRi(e, t, n, r, a, i) {
  const o = e.clientX - t.left,
    s = e.clientY - t.top;
  return VRi(o, s, n, r, a, i);
}

function wun(e, t, n, r = 24) {
  const a = Math.max(1, e.width),
    i = Math.max(1, e.height),
    o = r - a,
    s = t - r,
    l = r - i,
    d = n - r;
  return {
    x: Math.min(s, Math.max(o, e.x)),
    y: Math.min(d, Math.max(l, e.y)),
    width: a,
    height: i
  };
}

const xun = [{
  label: "自适应",
  ratio: null
}, {
  label: "21:9",
  ratio: [21, 9]
}, {
  label: "16:9",
  ratio: [16, 9]
}, {
  label: "8:1",
  ratio: [8, 1]
}, {
  label: "4:1",
  ratio: [4, 1]
}, {
  label: "3:2",
  ratio: [3, 2]
}, {
  label: "4:3",
  ratio: [4, 3]
}, {
  label: "7:4",
  ratio: [7, 4]
}, {
  label: "5:4",
  ratio: [5, 4]
}, {
  label: "1:1",
  ratio: [1, 1]
}, {
  label: "4:5",
  ratio: [4, 5]
}, {
  label: "3:4",
  ratio: [3, 4]
}, {
  label: "4:7",
  ratio: [4, 7]
}, {
  label: "2:3",
  ratio: [2, 3]
}, {
  label: "1:4",
  ratio: [1, 4]
}, {
  label: "9:16",
  ratio: [9, 16]
}, {
  label: "1:8",
  ratio: [1, 8]
}];

function Mje(e) {
  return e.value ? e.value : e.ratio ? `${e.ratio[0]}:${e.ratio[1]}` : "Auto";
}

function Mye(e) {
  return !e.ratio && !!e.value && e.value !== "自定义" && e.value !== "原图比例";
}

function WRi({
  item: e,
  isDark: t
}) {
  return c.jsx("div", {
    className: "flex items-center justify-center shrink-0",
    style: {
      width: 26,
      height: 20,
      minWidth: 26,
      minHeight: 20
    },
    children: e.ratio ? c.jsx("div", {
      className: "rounded-[2px] bg-transparent box-border",
      style: {
        aspectRatio: `${e.ratio[0]} / ${e.ratio[1]}`,
        maxWidth: e.ratio[0] >= e.ratio[1] ? 20 : 14,
        maxHeight: e.ratio[1] >= e.ratio[0] ? 16 : 12,
        minWidth: 6,
        minHeight: 6,
        borderWidth: 1.75,
        borderStyle: "solid",
        borderColor: t ? "rgba(255,255,255,0.9)" : "rgba(63,63,70,0.78)"
      }
    }) : Mye(e) ? c.jsx("div", {
      className: "rounded-[2px] bg-transparent box-border",
      style: {
        width: 16,
        height: 12,
        borderWidth: 1.75,
        borderStyle: "solid",
        borderColor: t ? "rgba(255,255,255,0.9)" : "rgba(63,63,70,0.78)"
      }
    }) : Mje(e) === "自定义" ? c.jsxs("svg", {
      width: "14",
      height: "12",
      viewBox: "0 0 14 12",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      className: "opacity-90",
      children: [c.jsx("rect", {
        x: "1",
        y: "1",
        width: "12",
        height: "10",
        rx: "1",
        strokeDasharray: "2.2 1.6"
      }), c.jsx("path", {
        d: "M7 3.5v5M4.5 6h5"
      })]
    }) : c.jsxs("svg", {
      width: "16",
      height: "14",
      viewBox: "0 0 16 14",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.55",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "opacity-95",
      children: [c.jsx("path", {
        d: "M1.5 4.2V2.4c0-.5.4-.9.9-.9H4.4"
      }), c.jsx("path", {
        d: "M11.6 1.5h2c.5 0 .9.4.9.9v1.8"
      }), c.jsx("path", {
        d: "M14.5 9.8v1.8c0 .5-.4.9-.9.9h-2"
      }), c.jsx("path", {
        d: "M4.4 12.5H2.4c-.5 0-.9-.4-.9-.9V9.8"
      }), c.jsx("rect", {
        x: "5",
        y: "4",
        width: "6",
        height: "6",
        rx: "0.8"
      })]
    })
  });
}

const UJe = ({
  isDark: e,
  selectedRatio: t,
  filterRatios: n,
  onSelect: r,
  layout: a = "bar"
}) => {
  on();
  const [i, o] = g.useState(!1),
    s = g.useRef(null),
    l = new Map();
  xun.forEach(k => {
    l.set(Mje(k), k);
  });
  const d = n && n.length > 0 ? n.map(k => {
    const A = l.get(k);
    if (A) return A;
    if (k === "Auto") return {
      label: "自适应",
      ratio: null
    };
    if (k === "原图比例" || k === "original") return {
      label: "原图比例",
      ratio: null,
      value: "原图比例"
    };
    if (k === "自定义" || k === "custom") return {
      label: "自定义",
      ratio: null,
      value: "自定义"
    };
    const S = k.split(":");
    if (S.length === 2) {
      const C = Number(S[0]),
        I = Number(S[1]);
      if (Number.isFinite(C) && Number.isFinite(I) && C > 0 && I > 0) return {
        label: k,
        ratio: [C, I],
        value: k
      };
    }
    return {
      label: k,
      ratio: null,
      value: k
    };
  }).filter(k => !!k) : xun;
  g.useEffect(() => {
    if (a !== "dropdown" || !i) return;
    const k = A => {
      var C;
      const S = A.target;
      !S || (C = s.current) != null && C.contains(S) || o(!1);
    };
    return document.addEventListener("mousedown", k, !0), () => document.removeEventListener("mousedown", k, !0);
  }, [a, i]);
  const u = e ? "border-white/30" : "border-zinc-300",
    h = e ? "bg-white/10" : "bg-zinc-100",
    p = e ? "" : "text-zinc-900",
    m = e ? "hover:bg-white/5" : "hover:bg-zinc-100",
    f = e ? "text-zinc-300" : "text-zinc-600",
    y = a === "list",
    b = a === "dropdown",
    v = d.find(k => Mje(k) === t) || d[0] || {
      label: t || "比例",
      ratio: null
    },
    _ = (k, A) => y || b ? `w-full flex flex-row items-center gap-2 px-1.5 py-1 rounded border transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/50 ${k && !A ? h : ""} ${u} ${r || A ? m : ""} ${A ? e ? "bg-zinc-900/40" : "bg-white" : ""}` : `flex flex-col items-center gap-0.5 px-1.5 py-1 rounded border transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/50 shrink-0 ${k ? h : ""} ${u} ${r ? m : ""}`,
    w = (k, A) => {
      const S = Mje(k),
        C = t === S,
        I = (A == null ? void 0 : A.asTrigger) === !0,
        E = `text-[9px] font-medium leading-none min-w-0 truncate ${C && p && !I ? p : f} ${I || y || b ? "flex-1 text-left" : ""}`,
        M = c.jsxs(c.Fragment, {
          children: [c.jsx(WRi, {
            item: k,
            isDark: e
          }), c.jsx("span", {
            className: E,
            children: Mye(k) ? k.label : x(k.label)
          }), I ? c.jsx(Mi, {
            size: 12,
            className: `shrink-0 opacity-70 transition-transform ${i ? "rotate-180" : ""}`
          }) : null]
        });
      return I ? c.jsx("button", {
        type: "button",
        onClick: () => o(T => !T),
        className: _(C, !0),
        ...(Mye(k) ? {
          "data-freeform-ratio": "true"
        } : {}),
        title: `${k.label} ${k.ratio ? `(${S})` : ""}`,
        children: M
      }, S) : r ? c.jsx("button", {
        type: "button",
        onClick: () => {
          r(S), b && o(!1);
        },
        ...(C ? {
          [Md]: "true"
        } : {}),
        [qk]: S,
        className: _(C, !1),
        ...(Mye(k) ? {
          "data-freeform-ratio": "true"
        } : {}),
        title: `${k.label} ${k.ratio ? `(${S})` : ""}`,
        children: M
      }, S) : c.jsx("div", {
        ...(C ? {
          [Md]: "true"
        } : {}),
        [qk]: S,
        ...(Mye(k) ? {
          "data-freeform-ratio": "true"
        } : {}),
        className: _(C, !1),
        title: `${k.label} ${k.ratio ? `(${S})` : ""}`,
        children: M
      }, S);
    };
  return b ? c.jsxs("div", {
    ref: s,
    className: "relative w-full",
    children: [w(v, {
      asTrigger: !0
    }), i ? c.jsx("div", {
      className: `absolute left-0 right-0 top-full z-30 mt-1 flex flex-col gap-0.5 max-h-36 overflow-y-auto inpaint-crop-scroll rounded-lg border p-1 shadow-lg ${e ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
      onMouseDown: k => k.stopPropagation(),
      children: d.map(k => w(k))
    }) : null]
  }) : c.jsx("div", {
    className: y ? "flex flex-col gap-0.5 max-h-36 overflow-y-auto inpaint-crop-scroll py-0.5" : "flex flex-nowrap items-center gap-1 p-2",
    children: d.map(k => w(k))
  });
};

function qRi(e) {
  const t = String(e || "").trim();
  if (!t || t === "Auto" || t === "自适应" || t === "自定义" || t === "custom") return null;
  const n = t.match(/^(\d+(?:\.\d+)?)\s*[:/x×]\s*(\d+(?:\.\d+)?)$/i);
  if (!n) return null;
  const r = Number(n[1]),
    a = Number(n[2]);
  return !Number.isFinite(r) || !Number.isFinite(a) || r <= 0 || a <= 0 ? null : [r, a];
}

function $Je({
  ratio: e
}) {
  on();
  const t = qRi(e),
    n = "currentColor";
  if (!t) return c.jsxs("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 16 14",
    fill: "none",
    className: "shrink-0 opacity-90",
    "aria-hidden": !0,
    children: [c.jsx("path", {
      d: "M1.5 4.2V2.4c0-.5.4-.9.9-.9H4.4M11.6 1.5h2c.5 0 .9.4.9.9v1.8M14.5 9.8v1.8c0 .5-.4.9-.9.9h-2M4.4 12.5H2.4c-.5 0-.9-.4-.9-.9V9.8",
      stroke: n,
      strokeWidth: "1.55",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), c.jsx("rect", {
      x: "5",
      y: "4",
      width: "6",
      height: "6",
      rx: "0.8",
      stroke: n,
      strokeWidth: "1.55"
    })]
  });
  const [r, a] = t,
    i = 12,
    o = 12;
  let s = i,
    l = a / r * i;
  return l > o && (l = o, s = r / a * o), c.jsx("span", {
    className: "shrink-0 inline-flex items-center justify-center",
    style: {
      width: 14,
      height: 14
    },
    "aria-hidden": !0,
    children: c.jsx("span", {
      className: "box-border rounded-[1.5px]",
      style: {
        width: Math.max(5, s),
        height: Math.max(5, l),
        border: `1.5px solid ${n}`
      }
    })
  });
}

function KRi(e) {
  const t = String(e || "").trim();
  return !t || t === "Auto" ? "自适应" : t === "custom" ? "自定义" : t;
}

function Ohr(e) {
  const t = String(e || "").trim();
  return t ? t === "Auto" || t === "auto" ? "自适应" : t === "custom" ? "自定义" : /^\d+k$/i.test(t) ? t.toUpperCase() : t : "";
}

function Bhr(e) {
  const t = [];
  if (e.ratio && t.push(KRi(e.ratio)), e.resolution) {
    const n = Ohr(e.resolution);
    n && t.push(n);
  }
  return e.quality && t.push(e.quality), e.extra && t.push(e.extra), t.join(" · ");
}

const GJe = ({
  nodeId: e,
  isDark: t,
  dropdownType: n = "ratio",
  activeDropdown: r,
  setActiveDropdown: a,
  selectedRatio: i,
  ratioOptions: o,
  onSelectRatio: s,
  resolutionOptions: l = [],
  selectedResolution: d,
  onSelectResolution: u,
  qualityOptions: h = [],
  selectedQuality: p,
  onSelectQuality: m,
  backgroundOptions: f = [],
  selectedBackground: y,
  onSelectBackground: b,
  summaryExtra: v,
  settingsSlot: _,
  closeOnRatioSelect: w = !0,
  hideRatioSection: k = !1,
  buttonVariant: A = "default",
  trailingSlot: S,
  className: C = ""
}) => {
  on();
  const I = g.useRef(null),
    E = (r == null ? void 0 : r.nodeId) === e && (r == null ? void 0 : r.type) === n,
    M = g.useMemo(() => l.map(N => ({
      value: N,
      label: Ohr(N) || N
    })), [l]),
    T = g.useMemo(() => {
      var G;
      const N = ((G = h.find(z => z.value === p)) == null ? void 0 : G.label) || p;
      return Bhr({
        ratio: i || "Auto",
        resolution: l.length > 0 ? d && l.includes(d) ? d : l[0] : void 0,
        quality: N || void 0,
        extra: v || void 0
      });
    }, [i, d, p, l, h, v]),
    P = i || "Auto",
    R = A === "bare",
    j = R ? `node-dropdown-button flex min-w-0 max-w-[7.5rem] items-center gap-1 px-1.5 py-1 rounded-md text-[11px] border-0 bg-transparent ${t ? "text-white/78 hover:bg-white/8 hover:text-white" : "text-zinc-700 hover:bg-black/5 hover:text-zinc-950"}` : `node-dropdown-button flex items-center gap-1.5 px-2 py-1 rounded text-[10px] border shrink-0 whitespace-nowrap ${t ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
    B = M.length > 0 || h.length > 0,
    F = f.length > 0 && !!b;
  return c.jsxs("div", {
    className: `relative shrink-0 overflow-visible flex items-center gap-0.5 ${C}`,
    children: [c.jsxs("button", {
      ref: I,
      type: "button",
      "data-gen-dropdown-type": n,
      onClick: N => {
        N.stopPropagation(), a(E ? null : {
          nodeId: e,
          type: n
        });
      },
      onMouseDown: N => N.stopPropagation(),
      className: j,
      title: x("比例 / 画质"),
      children: [c.jsx($Je, {
        ratio: P,
        isDark: t
      }), c.jsx("span", {
        className: R ? "min-w-0 truncate" : void 0,
        children: T
      })]
    }), S, c.jsx(Tv, {
      open: E,
      anchorRef: I,
      isDark: t,
      align: "center",
      minWidth: 0,
      maxHeight: 560,
      placement: "auto",
      className: "qiaodoumayi-gen-ratio-panel qiaodoumayi-gen-size-panel !overflow-y-auto !overflow-x-hidden",
      children: c.jsxs("div", {
        className: "qiaodoumayi-gen-ratio-panel-content qiaodoumayi-gen-size-panel-content",
        onKeyDown: N => {
          var G;
          N.key === "Escape" && (N.stopPropagation(), a(null), (G = I.current) == null || G.focus());
        },
        children: [B && c.jsxs("div", {
          className: "qiaodoumayi-gen-size-section mb-3",
          children: [c.jsx("div", {
            className: "qiaodoumayi-gen-popover-label",
            children: x("画质")
          }), M.length > 0 && u && c.jsx(WC, {
            isDark: t,
            options: M,
            selected: d && l.includes(d) ? d : l[0],
            onSelect: u,
            ariaLabel: x("画质")
          }), h.length > 0 && m && c.jsx("div", {
            className: M.length > 0 ? "mt-2" : "",
            children: c.jsx(WC, {
              isDark: t,
              options: h,
              selected: p,
              onSelect: m,
              ariaLabel: x("质量")
            })
          })]
        }), F && c.jsxs("div", {
          className: `qiaodoumayi-gen-size-section ${k ? "" : "mb-3"}`,
          children: [c.jsx("div", {
            className: "qiaodoumayi-gen-popover-label",
            children: x("背景")
          }), c.jsx(WC, {
            isDark: t,
            options: f,
            selected: y,
            onSelect: b,
            ariaLabel: x("背景")
          })]
        }), k ? null : c.jsxs("div", {
          className: "qiaodoumayi-gen-size-section",
          children: [c.jsx("div", {
            className: "qiaodoumayi-gen-popover-label",
            children: x("比例")
          }), c.jsx("div", {
            className: "qiaodoumayi-gen-ratio-grid",
            children: c.jsx(UJe, {
              isDark: t,
              selectedRatio: i || "Auto",
              filterRatios: o,
              onSelect: N => {
                s(N), w && queueMicrotask(() => {
                  a(G => (G == null ? void 0 : G.nodeId) === e && (G == null ? void 0 : G.type) === n ? null : G);
                });
              }
            })
          })]
        }), _]
      })
    })]
  });
};

function QRi(e, t = "参数") {
  return e.map(r => String(r || "").trim()).filter(Boolean).slice(0, 3).join(" · ") || t;
}

function Zkt(e) {
  const t = e.paramLabels.map(r => String(r || "").trim()).filter(Boolean);
  if (!t.length) return 0;
  let n = rpa(t, {
    gapPx: 2,
    padPx: 12
  });
  return n += e.ossCheckboxPx ?? 0, n += e.playButtonPx ?? 32, n += e.edgeGapPx ?? 8, Math.ceil(n);
}

function Fhr(e, t) {
  return t ? W7(e) : e;
}

const YRi = [{
  value: "auto",
  label: "默认"
}, {
  value: "transparent",
  label: "透明底"
}];

function _un(e) {
  return e === "auto" ? "Auto" : e === "custom" ? "自定义" : e.toUpperCase();
}

function XRi(e) {
  return e === "auto" ? DBr : e;
}

function JRi(e, t) {
  const n = String(e.ratio || "").trim().toLowerCase(),
    r = n && n !== "auto" ? rw(n) : null,
    a = ZE(n),
    i = !!(a && !rw(a)),
    o = pu(String(e.gptImage2AspectRatio || "") || (r == null ? void 0 : r.aspectRatio) || "1:1"),
    s = zS(t);
  let l = mg(s ? String(e.gptImage2Resolution || "") || (r == null ? void 0 : r.resolution) || "1k" : String(e.gptImage2Resolution || "") || (r == null ? void 0 : r.resolution) || "auto");
  s && (l === "auto" || l === "custom") && (l = "1k"), i && !s && (l = "custom");
  const d = !s && l === "auto",
    u = l === "custom" || i ? String(e.gptImage2CustomSize || a || e.ratio || "").trim() : "";
  return {
    currentAspectRatio: o,
    currentResolution: l,
    customWxH: u,
    isG2All: s,
    isAutoOutput: d
  };
}

function ZRi({
  isDark: e,
  w: t,
  h: n,
  aspectRatioLocked: r,
  onToggleAspectRatioLock: a,
  onWChange: i,
  onHChange: o,
  error: s,
  onQuickApply: l,
  onBlurApply: d,
  onCancel: u
}) {
  on();
  const h = `px-1 py-1 rounded text-[10px] border outline-none text-center tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${e ? "bg-[#1f1f1f] border-zinc-600 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
    p = `w-full min-w-0 px-0.5 py-0.5 rounded text-[8px] leading-none border text-center overflow-hidden text-ellipsis whitespace-nowrap box-border ${e ? "border-zinc-600 text-zinc-400 hover:bg-zinc-800" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`;
  return c.jsxs("div", {
    className: "space-y-1.5 w-full min-w-0 box-border overflow-hidden",
    "data-gpt2-custom-panel": !0,
    children: [c.jsx("div", {
      className: "text-[9px] leading-tight text-center px-0.5 text-zinc-500",
      children: x("长边≤3840 · 16 倍数 · 比例≤3:1")
    }), c.jsxs("div", {
      className: "flex items-center justify-center gap-1 w-full px-0.5",
      children: [c.jsx("input", {
        type: "number",
        min: 16,
        max: 3840,
        step: 16,
        value: t,
        onChange: m => i(m.target.value),
        onBlur: () => d(parseInt(t, 10), parseInt(n, 10)),
        className: `${h} w-[3.5rem] shrink-0`,
        onMouseDown: m => m.stopPropagation()
      }), c.jsx("button", {
        type: "button",
        onClick: m => {
          m.stopPropagation(), a();
        },
        title: x(r ? "解锁长宽比" : "锁定长宽比"),
        className: `shrink-0 p-0.5 rounded transition-colors ${r ? e ? "text-sky-400 hover:text-sky-300" : "text-blue-600 hover:text-blue-700" : e ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`,
        onMouseDown: m => m.stopPropagation(),
        children: r ? c.jsx(wz, {
          size: 12,
          strokeWidth: 2
        }) : c.jsx(iNr, {
          size: 12,
          strokeWidth: 2
        })
      }), c.jsx("input", {
        type: "number",
        min: 16,
        max: 3840,
        step: 16,
        value: n,
        onChange: m => o(m.target.value),
        onBlur: () => d(parseInt(t, 10), parseInt(n, 10)),
        className: `${h} w-[3.5rem] shrink-0`,
        onMouseDown: m => m.stopPropagation()
      })]
    }), s ? c.jsx("p", {
      className: "text-[10px] text-red-500 leading-tight text-center px-0.5",
      children: s
    }) : null, c.jsx("div", {
      className: "grid grid-cols-3 gap-0.5 w-full",
      children: ett.map((m, f) => {
        const [y, b] = m.split("x").map(_ => parseInt(_, 10)),
          v = f === ett.length - 1 && ett.length % 3 === 1;
        return c.jsx("button", {
          type: "button",
          onClick: () => l(y, b),
          className: `${p}${v ? " col-start-2" : ""}`,
          title: m.replace("x", "×"),
          onMouseDown: _ => _.stopPropagation(),
          children: m.replace("x", "×")
        }, m);
      })
    }), c.jsx("button", {
      type: "button",
      onClick: u,
      className: `w-full py-1 text-[10px] ${e ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`,
      onMouseDown: m => m.stopPropagation(),
      children: x("关闭")
    })]
  });
}

const VJe = ({
    variant: e,
    nodeId: t,
    isDark: n,
    currentModel: r,
    settings: a,
    activeDropdown: i,
    setActiveDropdown: o,
    onApply: s,
    onSaveModelMemory: l,
    qualityOptions: d,
    selectedQuality: u,
    onSelectQuality: h,
    hideAspectRatio: p = !1,
    popoverButtonVariant: m = "default"
  }) => {
    var X, Z;
    on();
    const {
        currentAspectRatio: f,
        currentResolution: y,
        customWxH: b,
        isG2All: v,
        isAutoOutput: _
      } = g.useMemo(() => JRi(a, r), [a, r]),
      w = (X = dh(r)) == null ? void 0 : X.customProtocol,
      k = (r === "codex-image" || IBr(r)) && (!w || JSON.stringify(w.body).includes('"$background"')),
      A = r === "codex-image",
      S = Dj(String(a.gptImageBackground || "auto")),
      C = (i == null ? void 0 : i.nodeId) === t && i.type === "gpt2_custom",
      [I, E] = g.useState("1024"),
      [M, T] = g.useState("1024"),
      [P, R] = g.useState(""),
      [j, B] = g.useState(!0),
      F = g.useRef(1),
      N = (re, fe) => {
        const ye = parseInt(re, 10),
          ie = parseInt(fe, 10);
        Number.isFinite(ye) && ye > 0 && Number.isFinite(ie) && ie > 0 && (F.current = ye / ie);
      },
      G = re => {
        if (E(re), !j) return;
        const fe = parseInt(re, 10);
        if (!Number.isFinite(fe) || fe <= 0) return;
        const ye = kqt(fe, F.current, "height");
        T(String(ye));
      },
      z = re => {
        if (T(re), !j) return;
        const fe = parseInt(re, 10);
        if (!Number.isFinite(fe) || fe <= 0) return;
        const ye = kqt(fe, F.current, "width");
        E(String(ye));
      },
      V = () => {
        j || N(I, M), B(re => !re);
      };
    g.useEffect(() => {
      if (y !== "custom" || C) return;
      const re = fft(b || "1024x1024");
      E(String((re == null ? void 0 : re.width) ?? 1024)), T(String((re == null ? void 0 : re.height) ?? 1024)), R("");
    }, [y, b, C]), g.useEffect(() => {
      if (!C) return;
      const re = fft(b || "1024x1024"),
        fe = String((re == null ? void 0 : re.width) ?? 1024),
        ye = String((re == null ? void 0 : re.height) ?? 1024);
      E(fe), T(ye), N(fe, ye), R("");
    }, [C, b]);
    const O = (re, fe, ye) => {
        const ie = {
          previewActualSize: void 0,
          previewSize: void 0,
          imageSize: void 0
        };
        if (fe === "custom") {
          const be = ZE(ye || String(a.gptImage2CustomSize || a.ratio || "")) || ye || String(a.gptImage2CustomSize || a.ratio || "1024x1024");
          s({
            ...ie,
            gptImage2AspectRatio: re,
            gptImage2Resolution: "custom",
            gptImage2CustomSize: be,
            ratio: be
          }), l({
            gptImage2AspectRatio: re,
            gptImage2Resolution: "custom",
            gptImage2CustomSize: be,
            aspectRatio: be
          });
          return;
        }
        const ae = fe === "auto" ? "auto" : v && (fe === "2k" || fe === "4k") ? re : _k(re, fe) || "auto";
        s({
          ...ie,
          gptImage2AspectRatio: re,
          gptImage2Resolution: fe,
          ratio: ae,
          gptImage2CustomSize: void 0
        }), l({
          gptImage2AspectRatio: re,
          gptImage2Resolution: fe,
          aspectRatio: ae
        });
      },
      L = (re, fe, ye = !0) => {
        const ie = B6n(re, fe);
        if (!ie.valid || !ie.normalized) {
          R(ie.reason || "尺寸无效");
          return;
        }
        R(""), O(f, "custom", ie.normalized), ye && o(null);
      },
      D = (re, fe) => {
        L(re, fe, !1);
      },
      U = () => {
        O(f, "auto");
      };
    g.useEffect(() => {
      p && y !== "auto" && O(f, "auto");
    }, [p, r]);
    const H = re => {
        O(re, XRi(y));
      },
      Y = re => {
        const ye = {
          gptImageBackground: Dj(re),
          gptImageOutputFormat: "png"
        };
        s(ye), l(ye);
      },
      K = dh(r),
      W = K != null && K.customProtocol ? K : void 0,
      Q = v ? ["1k", "2k", "4k"] : jBr,
      q = (Z = W == null ? void 0 : W.resolutions) != null && Z.length ? Q.filter(re => W.resolutions.some(fe => fe.toLowerCase() === re)) : Q,
      ne = `node-dropdown-button flex items-center gap-0.5 px-1.5 sm:px-2 py-1 rounded text-[10px] border whitespace-nowrap ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
      de = g.useMemo(() => [...(v ? [] : ["Auto"]), ...lOe, ...(v ? [] : ["自定义"])].filter(re => {
        var fe, ye, ie;
        return re === "Auto" ? !((fe = W == null ? void 0 : W.resolutions) != null && fe.length) || W.resolutions.some(ae => ae.toLowerCase() === "auto") : re === "自定义" ? !((ye = W == null ? void 0 : W.resolutions) != null && ye.length) : !((ie = W == null ? void 0 : W.ratios) != null && ie.length) || W.ratios.includes(re);
      }), [v, W]),
      le = `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
      J = g.useMemo(() => _ ? [] : q.map(re => String(re)), [_, q]);
    if (e === "inline") return c.jsxs(c.Fragment, {
      children: [c.jsx("span", {
        className: "text-[10px] shrink-0 text-zinc-500",
        children: x("比例")
      }), c.jsxs("div", {
        className: "flex gap-0.5 flex-wrap",
        children: [!v && c.jsx("button", {
          type: "button",
          onClick: U,
          className: `px-2 py-0.5 rounded text-[10px] border ${_ ? n ? "border-zinc-500 text-zinc-300" : "bg-blue-100 text-blue-700 border-transparent" : n ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
          children: "Auto"
        }), lOe.map(re => c.jsx("button", {
          type: "button",
          onClick: () => H(re),
          className: `px-2 py-0.5 rounded text-[10px] border ${!_ && f === re ? n ? "border-zinc-500 text-zinc-300" : "bg-blue-100 text-blue-700 border-transparent" : n ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
          children: re
        }, re))]
      }), !_ && c.jsxs(c.Fragment, {
        children: [c.jsx("span", {
          className: "text-[10px] shrink-0 text-zinc-500",
          children: x("输出")
        }), v ? c.jsx("div", {
          className: "flex gap-0.5 flex-wrap items-center",
          children: q.map(re => c.jsx("button", {
            type: "button",
            onClick: () => O(f, re),
            className: `px-2 py-0.5 rounded text-[10px] border ${y === re ? n ? "border-zinc-500 text-zinc-300" : "bg-blue-100 text-blue-700 border-transparent" : n ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
            children: _un(re)
          }, re))
        }) : c.jsxs("div", {
          className: "flex gap-0.5 flex-wrap items-center",
          children: [q.map(re => c.jsx("button", {
            type: "button",
            onClick: () => {
              re === "custom" ? O(f, "custom", b || "1024x1024") : O(f, re);
            },
            className: `px-2 py-0.5 rounded text-[10px] border ${y === re ? n ? "border-zinc-500 text-zinc-300" : "bg-blue-100 text-blue-700 border-transparent" : n ? "border-transparent hover:bg-zinc-700" : "border-transparent hover:bg-zinc-100"}`,
            children: _un(re)
          }, re)), y === "custom" && b ? c.jsx("span", {
            className: `text-[10px] ${n ? "text-zinc-400" : "text-zinc-500"}`,
            children: b.replace("x", "×")
          }) : null]
        })]
      })]
    });
    const pe = b ? W7(b.replace("x", "×")) : "尺寸",
      ce = p || _ ? "Auto" : y === "custom" ? "自定义" : f,
      we = !p && !_ && !v && y === "custom" ? c.jsxs("div", {
        className: "relative shrink-0 overflow-visible",
        "data-gen-dropdown-type": "gpt2_custom",
        children: [c.jsx("button", {
          type: "button",
          onClick: re => {
            re.stopPropagation(), o((i == null ? void 0 : i.type) === "gpt2_custom" && i.nodeId === t ? null : {
              nodeId: t,
              type: "gpt2_custom"
            });
          },
          onMouseDown: re => re.stopPropagation(),
          className: `${ne} max-w-[2.75rem] truncate`,
          title: b || x("自定义像素"),
          children: pe
        }), C && c.jsx("div", {
          className: `${le} w-[11rem] max-w-[calc(100vw-1.5rem)] box-border overflow-hidden`,
          onMouseDown: re => re.stopPropagation(),
          children: c.jsx(ZRi, {
            isDark: n,
            w: I,
            h: M,
            aspectRatioLocked: j,
            onToggleAspectRatioLock: V,
            onWChange: G,
            onHChange: z,
            error: P,
            onQuickApply: (re, fe) => {
              E(String(re)), T(String(fe)), N(String(re), String(fe)), L(re, fe);
            },
            onBlurApply: D,
            onCancel: () => {
              L(parseInt(I, 10), parseInt(M, 10)), o(null);
            }
          })
        })]
      }) : null;
    return c.jsx(GJe, {
      nodeId: t,
      isDark: n,
      dropdownType: "gpt2_ar",
      activeDropdown: i,
      setActiveDropdown: o,
      selectedRatio: ce,
      ratioOptions: p ? ["Auto"] : de,
      onSelectRatio: re => {
        if (p) {
          U();
          return;
        }
        if (re === "Auto") {
          U();
          return;
        }
        if (re === "自定义") {
          O(f, "custom", b || "1024x1024"), o({
            nodeId: t,
            type: "gpt2_custom"
          });
          return;
        }
        H(pu(re));
      },
      resolutionOptions: p || A ? [] : J,
      selectedResolution: _ || p || A ? void 0 : y,
      onSelectResolution: re => {
        if (!(p || A)) {
          if (re === "custom") {
            O(f, "custom", b || "1024x1024"), o({
              nodeId: t,
              type: "gpt2_custom"
            });
            return;
          }
          O(f, mg(re));
        }
      },
      qualityOptions: d,
      selectedQuality: u,
      onSelectQuality: h,
      backgroundOptions: k ? YRi : void 0,
      selectedBackground: k ? S : void 0,
      onSelectBackground: k ? Y : void 0,
      summaryExtra: k && S === "transparent" ? "透明底" : void 0,
      closeOnRatioSelect: !0,
      hideRatioSection: p,
      buttonVariant: m,
      trailingSlot: we
    });
  },
  eNi = [1.5, 2, 3],
  tNi = [{
    value: "original",
    label: "原比例"
  }, {
    value: "21:9",
    label: "21:9"
  }, {
    value: "16:9",
    label: "16:9"
  }, {
    value: "4:3",
    label: "4:3"
  }, {
    value: "1:1",
    label: "1:1"
  }, {
    value: "3:4",
    label: "3:4"
  }, {
    value: "9:16",
    label: "9:16"
  }],
  nNi = tNi,
  rNi = {
    "1:1": 1,
    "4:3": 4 / 3,
    "3:4": 3 / 4,
    "16:9": 16 / 9,
    "9:16": 9 / 16,
    "21:9": 21 / 9
  };

function rM(e) {
  return Math.max(1, Math.min(5, Math.round(e * 100) / 100));
}

function aNi(e) {
  return e === "original";
}

function eAt(e, t, n, r = 1.5) {
  const a = rM(r);
  if (n === "original" || n === "custom") return {
    scaleW: a,
    scaleH: a
  };
  const i = rNi[n];
  if (!i || e <= 0 || t <= 0) return {
    scaleW: a,
    scaleH: a
  };
  let o = e,
    s = t;
  return o / s < i ? o = s * i : s = o / i, {
    scaleW: Math.round(o / e * 100) / 100,
    scaleH: Math.round(s / t * 100) / 100
  };
}

function iNi(e, t, n, r = 1.5) {
  if (n === "custom") return !0;
  const a = eAt(e, t, n, r);
  return a.scaleW > 1.001 || a.scaleH > 1.001;
}

function oNi(e, t, n = 1.5) {
  return nNi.filter(r => iNi(e, t, r.value, n));
}

function kun(e) {
  return e === "original" || e === "custom" ? "Auto" : e;
}

function Aun(e, t, n = !1) {
  return `inline-flex items-center ${n ? "gap-1 px-2" : "gap-1.5 px-2.5"} h-8 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${t ? e ? "bg-white/14 text-white" : "bg-black/10 text-zinc-950" : e ? "text-white/78 hover:bg-white/8" : "text-zinc-600 hover:bg-black/5"}`;
}

const sNi = ({
    aspect: e,
    scale: t,
    baseWidth: n,
    baseHeight: r,
    isDark: a,
    scaleMenuOpen: i,
    onToggleScaleMenu: o,
    onSelectScale: s,
    onSelectAspect: l
  }) => {
    on();
    const d = g.useRef(null),
      u = aNi(e),
      h = oNi(n, r, t),
      p = `${Number.isInteger(t) ? t.toFixed(0) : String(t)}x`;
    return c.jsxs("div", {
      className: "flex min-w-0 flex-nowrap items-center gap-1",
      "data-expand-ratio-bar": !0,
      children: [c.jsxs("div", {
        className: "relative shrink-0",
        children: [c.jsxs("button", {
          ref: d,
          type: "button",
          "aria-label": x("扩图倍数"),
          "aria-expanded": i,
          "aria-disabled": !u,
          title: x(u ? "按原图比例放大画布" : "仅原比例可调整倍数"),
          disabled: !u,
          onClick: m => {
            m.stopPropagation(), u && o();
          },
          onMouseDown: m => m.stopPropagation(),
          className: `${Aun(a, u && i, !0)} ${u ? "" : a ? "cursor-not-allowed text-white/35" : "cursor-not-allowed text-zinc-400"}`,
          children: [c.jsx("span", {
            className: "tabular-nums",
            children: x(p)
          }), c.jsx(Mi, {
            size: 12,
            className: u ? "opacity-70" : "opacity-40"
          })]
        }), u ? c.jsx(Tv, {
          open: i,
          anchorRef: d,
          isDark: a,
          align: "left",
          minWidth: 88,
          menuWidth: 88,
          maxHeight: 180,
          placement: "auto",
          children: c.jsx("div", {
            className: "p-1",
            onMouseDown: m => m.stopPropagation(),
            children: eNi.map(m => c.jsx("button", {
              type: "button",
              onClick: f => {
                f.stopPropagation(), s(m);
              },
              className: `flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[11px] tabular-nums ${t === m ? a ? "bg-white/10 text-white" : "bg-black/8 text-zinc-950" : a ? "text-zinc-200 hover:bg-white/8" : "text-zinc-700 hover:bg-black/5"}`,
              children: `${Number.isInteger(m) ? m.toFixed(0) : String(m)}x`
            }, m))
          })
        }) : null]
      }), c.jsx("div", {
        className: `mx-0.5 h-5 w-px shrink-0 ${a ? "bg-white/15" : "bg-zinc-300"}`
      }), h.map(m => {
        const f = e === m.value;
        return c.jsxs("button", {
          type: "button",
          "aria-pressed": f,
          title: m.value === "original" ? x("按原图比例扩展") : x("切换到 {0}", m.label),
          onClick: y => {
            y.stopPropagation(), l(m.value);
          },
          onMouseDown: y => y.stopPropagation(),
          className: Aun(a, f),
          children: [c.jsx($Je, {
            ratio: m.value === "original" ? "Auto" : m.value,
            isDark: a
          }), c.jsx("span", {
            children: x(m.label)
          })]
        }, m.value);
      })]
    });
  },
  lNi = [{
    type: "top",
    hitboxClass: "left-1/2 top-0 h-5 w-12 -translate-x-1/2 -translate-y-1/2",
    visualClass: "left-1/2 top-1/2 h-[3px] w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
    cursorClass: "resize-handle-top-bottom cursor-ns-resize"
  }, {
    type: "right",
    hitboxClass: "right-0 top-1/2 h-12 w-5 translate-x-1/2 -translate-y-1/2",
    visualClass: "left-1/2 top-1/2 h-8 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
    cursorClass: "resize-handle-side cursor-ew-resize"
  }, {
    type: "bottom",
    hitboxClass: "bottom-0 left-1/2 h-5 w-12 -translate-x-1/2 translate-y-1/2",
    visualClass: "left-1/2 top-1/2 h-[3px] w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
    cursorClass: "resize-handle-top-bottom cursor-ns-resize"
  }, {
    type: "left",
    hitboxClass: "left-0 top-1/2 h-12 w-5 -translate-x-1/2 -translate-y-1/2",
    visualClass: "left-1/2 top-1/2 h-8 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
    cursorClass: "resize-handle-side cursor-ew-resize"
  }, {
    type: "top-left",
    hitboxClass: "left-[-8px] top-[-8px] h-10 w-10",
    visualClass: "left-2 top-2 h-6 w-6 rounded-tl-sm border-l-[3px] border-t-[3px] border-white",
    cursorClass: "resize-handle-corner cursor-nwse-resize"
  }, {
    type: "top-right",
    hitboxClass: "right-[-8px] top-[-8px] h-10 w-10",
    visualClass: "right-2 top-2 h-6 w-6 rounded-tr-sm border-r-[3px] border-t-[3px] border-white",
    cursorClass: "resize-handle-corner-rb cursor-nesw-resize"
  }, {
    type: "bottom-left",
    hitboxClass: "bottom-[-8px] left-[-8px] h-10 w-10",
    visualClass: "bottom-2 left-2 h-6 w-6 rounded-bl-sm border-b-[3px] border-l-[3px] border-white",
    cursorClass: "resize-handle-corner-rb cursor-nesw-resize"
  }, {
    type: "bottom-right",
    hitboxClass: "bottom-[-8px] right-[-8px] h-10 w-10",
    visualClass: "bottom-2 right-2 h-6 w-6 rounded-br-sm border-b-[3px] border-r-[3px] border-white",
    cursorClass: "resize-handle-corner cursor-nwse-resize"
  }],
  zhr = ({
    width: e,
    height: t,
    showGrid: n,
    onHandleMouseDown: r,
    children: a,
    className: i = "",
    elevated: o = !0
  }) => (on(), c.jsxs("div", {
    className: `relative overflow-visible outline outline-1 outline-white/55 ${i}`,
    style: {
      width: e,
      height: t,
      boxShadow: o ? "0 26px 80px rgba(0,0,0,.55)" : "none"
    },
    children: [c.jsx("div", {
      "aria-hidden": !0,
      className: "absolute inset-0 overflow-hidden bg-black/70 backdrop-blur-2xl",
      style: {
        backdropFilter: "blur(22px) saturate(.72)",
        WebkitBackdropFilter: "blur(22px) saturate(.72)"
      },
      children: c.jsx("div", {
        className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(38,34,29,.18),rgba(0,0,0,.42)_72%)]"
      })
    }), a, c.jsxs("div", {
      "aria-hidden": !0,
      className: `pointer-events-none absolute inset-0 z-[5] transition-opacity duration-150 ${n ? "opacity-100" : "opacity-0"}`,
      children: [c.jsx("div", {
        className: "absolute inset-y-0 left-1/3 w-px bg-white/20"
      }), c.jsx("div", {
        className: "absolute inset-y-0 left-2/3 w-px bg-white/20"
      }), c.jsx("div", {
        className: "absolute inset-x-0 top-1/3 h-px bg-white/20"
      }), c.jsx("div", {
        className: "absolute inset-x-0 top-2/3 h-px bg-white/20"
      })]
    }), lNi.map(s => c.jsx("div", {
      role: "slider",
      "aria-label": x("调整外框 {0}", s.type),
      onMouseDown: l => r(l, s.type),
      className: `group absolute z-10 ${s.hitboxClass} ${s.cursorClass}`,
      children: c.jsx("span", {
        "aria-hidden": !0,
        className: `pointer-events-none absolute shadow-[0_0_0_1px_rgba(0,0,0,.12)] transition-[filter,opacity] duration-100 group-hover:brightness-90 ${s.visualClass}`
      })
    }, s.type))]
  })),
  cNi = ({
    width: e,
    height: t,
    baseWidth: n,
    baseHeight: r,
    imageUrl: a,
    imageOffset: i,
    resolving: o,
    showGrid: s,
    onImageMouseDown: l,
    onImageLoad: d,
    onImageError: u,
    onHandleMouseDown: h
  }) => (on(), c.jsx(zhr, {
    width: e,
    height: t,
    showGrid: s,
    onHandleMouseDown: h,
    children: a ? c.jsx("img", {
      src: a,
      alt: x("扩图原图"),
      draggable: !1,
      onMouseDown: l,
      onLoad: d,
      onError: u,
      className: "absolute left-1/2 top-1/2 cursor-move select-none",
      style: {
        width: n,
        height: r,
        objectFit: "contain",
        transform: `translate(calc(-50% + ${i.x}px), calc(-50% + ${i.y}px))`,
        opacity: o ? .45 : 1,
        boxShadow: "0 10px 42px rgba(0,0,0,.42)"
      }
    }) : c.jsx("div", {
      className: "absolute inset-0 grid place-items-center text-xs text-white/45",
      children: x("正在读取原图…")
    })
  })),
  rV = "expand-toolbar";

function Sun(e, t) {
  const n = rl(e);
  if (!n.length) return "";
  const r = String(t || "").trim();
  if (r && n.includes(r)) return r;
  const a = zs(e);
  return a != null && a.resolution && n.includes(a.resolution) ? a.resolution : n[0];
}

function dNi(e, t = !1) {
  return `node-dropdown-button flex min-w-0 max-w-full items-center gap-1 h-7 px-1.5 rounded-md text-[11px] font-medium border-0 bg-transparent transition-colors ${t ? e ? "bg-white/10 text-white" : "bg-black/8 text-zinc-950" : e ? "text-white/78 hover:bg-white/8 hover:text-white" : "text-zinc-700 hover:bg-black/5 hover:text-zinc-950"}`;
}

function uNi(e, t = !1) {
  return `node-dropdown-button flex items-center gap-1.5 h-7 px-2.5 rounded-[9px] text-[11px] font-medium border whitespace-nowrap transition-colors ${t ? e ? "bg-white/12 text-white border-white/45" : "bg-black/10 text-zinc-950 border-zinc-400" : e ? "bg-transparent hover:bg-white/5 text-white border-white/30 hover:border-white/45" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`;
}

const iAe = ({
    embedded: e = !1,
    documentSession: t,
    isOpen: n,
    onClose: r,
    imageUrl: a,
    isDark: i,
    sourceNode: o,
    nodes: s,
    view: l,
    canvasPortalEl: d,
    runExpandImage: u,
    imageConfigs: h,
    showHuyaModels: p = !1,
    onSuccess: m,
    onStartGenerate: f,
    onRemoteTaskId: y,
    onProgress: b,
    onError: v
  }) => {
    var Tt, Ue;
    on();
    const [_, w] = g.useState(""),
      [k, A] = g.useState(0),
      [S, C] = g.useState(!1),
      [I, E] = g.useState(null),
      [M, T] = g.useState(1.5),
      [P, R] = g.useState(1.5),
      [j, B] = g.useState(1.5),
      [F, N] = g.useState({
        x: 0,
        y: 0
      }),
      [G, z] = g.useState({
        x: 0,
        y: 0
      }),
      [V, O] = g.useState("original"),
      [L, D] = g.useState(!1),
      [U, H] = g.useState(""),
      [Y, K] = g.useState(""),
      [W, Q] = g.useState({}),
      [q, ne] = g.useState(!1),
      [de, le] = g.useState(!1),
      [J, pe] = g.useState(!1),
      [ce, we] = g.useState(mo()),
      [X, Z] = g.useState(null),
      [re, fe] = g.useState(!1),
      ye = g.useRef(!1),
      ie = Qa.getGlobalBaseUrl(),
      ae = g.useRef(null),
      be = g.useRef(0),
      Ee = g.useRef(null),
      xe = g.useRef(null),
      he = !!(d && o && l),
      ue = g.useRef(null),
      [ge, _e] = g.useState({
        width: 720,
        height: 340
      });
    g.useEffect(() => {
      if (!e || !n || !ue.current) return;
      const et = new ResizeObserver(([ft]) => {
        ft.contentRect.width > 0 && _e({
          width: ft.contentRect.width,
          height: ft.contentRect.height
        });
      });
      return et.observe(ue.current), () => et.disconnect();
    }, [e, n]);
    const ke = (X == null ? void 0 : X.nodeId) === rV && (X == null ? void 0 : X.type) === "model",
      ve = (X == null ? void 0 : X.nodeId) === rV && (X == null ? void 0 : X.type) === "expand_scale",
      Te = g.useMemo(() => {
        if (o) return (s == null ? void 0 : s.find(et => et.id === o.id)) ?? o;
      }, [s, o]),
      Ne = g.useMemo(() => zJe(h, p, {
        includeJimengNative: !0
      }), [h, p]),
      {
        visibleModels: me,
        selectedChannel: Ae,
        onSelectChannel: Fe,
        menuWidth: Me,
        showHaiyiChannel: Re
      } = zZ(Ne),
      $e = g.useRef(null),
      rt = g.useMemo(() => me.map(et => et.id), [me]),
      nt = Y || ((Tt = Ne[0]) == null ? void 0 : Tt.id) || "",
      ze = h.find(et => et.id === nt) || Ne.find(et => et.id === nt),
      Le = (ze == null ? void 0 : ze.id) || (ze == null ? void 0 : ze.modelName) || "",
      Ke = ze ? JU(ze) : "Model",
      Xe = Pf(Le),
      De = !!ze && od(ze, ie),
      Ye = String(W.platformGroup || ko).trim() || ko,
      Ce = rl(Le),
      He = String(W.ratio || W.gptImage2AspectRatio || "Auto"),
      Ve = String(W.resolution || W.gptImage2Resolution || ""),
      it = g.useCallback(et => {
        Q(ft => ({
          ...ft,
          ...et
        }));
      }, []),
      It = g.useMemo(() => pk(Le) || vy(Le) || fm(Le) || Up(Le) || (Le.includes("gpt-image") || Le.includes("gpt-4o-image")) && !Up(Le) && !fm(Le) ? (fm(Le) || vy(Le) || Up(Le) ? Up(Le) ? [...zqe(Le)] : [...gTt(Le)] : pk(Le) ? ["auto", "high", "medium", "low"] : ["standard", "hd"]).map(ht => ({
        value: ht,
        label: pk(Le) ? MWe[ht] || ht : fm(Le) || vy(Le) ? TWe(Le)[ht] || ht : Up(Le) ? rIe(Le)[ht] || ht : ht === "hd" ? "HD" : "Std"
      })) : void 0, [Le]),
      Ft = g.useMemo(() => {
        var et, ft;
        if (It != null && It.length) return fm(Le) || vy(Le) ? TP(Le, W.gptImageQuality, (et = zs(Le)) == null ? void 0 : et.gptImageQuality) : Up(Le) ? IZ(Le, W.gptImageQuality, (ft = zs(Le)) == null ? void 0 : ft.gptImageQuality) : String(W.gptImageQuality || (pk(Le) ? "high" : "standard"));
      }, [It, Le, W.gptImageQuality]),
      We = g.useCallback(et => {
        it({
          gptImageQuality: et
        }), cl(Le, {
          gptImageQuality: et
        });
      }, [Le, it]),
      Ze = g.useCallback(et => {
        K(et);
        const ft = {
          model: et
        };
        bX(et, zs(et), ft), kh(et) ? (MP(et, ft), ft.ratio = "Auto", ft.gptImage2AspectRatio = "Auto", ft.gptImage2Resolution = "auto", ft.gptImage2CustomSize = void 0) : Pf(et) ? (nI(ft), ft.ratio = "Auto", ft.gptImage2AspectRatio = "Auto", ft.gptImage2Resolution = "auto", ft.gptImage2CustomSize = void 0) : Hh(et) ? (WY(ft), ft.ratio = "Auto") : Uu(et) ? (KY(ft), ft.ratio = "Auto") : su(et) ? (ZY(ft), ft.ratio = "Auto") : Nm(et) ? (tX(ft), ft.ratio = "Auto") : jm(et) ? (rX(ft), ft.ratio = "Auto") : nh(et) ? (QY(ft), ft.ratio = "Auto") : mp(et) ? (XY(ft), ft.ratio = "Auto") : Up(et) ? khe(ft) : ft.ratio = "Auto", Q(ft);
      }, []);
    g.useEffect(() => {
      var ft, ht;
      if (!n) return;
      T(1.5), R(1.5), B(1.5), N({
        x: 0,
        y: 0
      }), z({
        x: 0,
        y: 0
      }), O("original"), D(!1), H(""), Z(null);
      const et = (ft = Ne[0]) == null ? void 0 : ft.id;
      et && (Ze(et), ne(!!((ht = Te == null ? void 0 : Te.settings) != null && ht.genUseAliyunOss)));
    }, [n, a, Ne, Ze]), g.useEffect(() => {
      const et = () => {
        le(ua()), pe(Ph()), we(mo());
      };
      return et(), window.addEventListener(go, et), () => window.removeEventListener(go, et);
    }, []), g.useEffect(() => {
      if (!n || !nt || Xe || !Ce.length) return;
      const et = String(W.resolution || "");
      if (!et || !Ce.includes(et)) {
        const ft = Sun(nt, et);
        ft && it({
          resolution: ft
        });
      }
    }, [n, nt, Xe, Ce, W.resolution, it]), g.useEffect(() => {
      if (!n || !nt) return;
      const et = He === "Auto" && String(W.gptImage2AspectRatio || "Auto") === "Auto",
        ft = !Xe || String(W.gptImage2Resolution || "auto").toLowerCase() === "auto";
      et && ft || it({
        ratio: "Auto",
        gptImage2AspectRatio: "Auto",
        ...(Xe ? {
          gptImage2Resolution: "auto",
          gptImage2CustomSize: void 0
        } : {})
      });
    }, [n, nt, Xe, He, W.gptImage2AspectRatio, W.gptImage2Resolution, it]), g.useEffect(() => {
      if (!n || !X || X.nodeId !== rV) return;
      const et = ft => {
        const ht = ft.target;
        ht && (ht.closest(".node-dropdown-menu, [data-expand-toolbar]") || Z(null));
      };
      return window.addEventListener("pointerdown", et, !0), () => window.removeEventListener("pointerdown", et, !0);
    }, [n, X]), g.useEffect(() => {
      if (!n) return;
      const et = ft => {
        ft.key === "Escape" && (ft.preventDefault(), ft.stopPropagation(), X ? Z(null) : r());
      };
      return window.addEventListener("keydown", et, !0), () => window.removeEventListener("keydown", et, !0);
    }, [n, X, r]), g.useEffect(() => {
      if (!n) {
        Ee.current && (URL.revokeObjectURL(Ee.current), Ee.current = null);
        return;
      }
      if (!a) return;
      let et = !1;
      w(""), E(null), C(!0);
      const ft = async () => {
          const wt = o;
          if (!wt) return "";
          if (wt.type === "input-image") {
            const jt = await L1(wt);
            return jt.startsWith("blob:") || jt.startsWith("data:") ? UN(jt) : jt;
          }
          if (wt.type === "gen-image" || wt.type === "gen-video") {
            const jt = wt.settings || {},
              bt = Math.max(0, Number(jt.selectedMjImageIndex ?? 0)),
              Bt = await wY(wt, a, bt);
            return Bt != null && Bt.startsWith("blob:") || Bt != null && Bt.startsWith("data:") ? UN(Bt) : Bt || "";
          }
          return "";
        },
        ht = wt => (wt.startsWith("blob:") && (Ee.current && Ee.current !== wt && URL.revokeObjectURL(Ee.current), Ee.current = wt), wt);
      return (async () => {
        let wt = "";
        try {
          if (a.startsWith("blob:")) wt = ht(a);else if (a.startsWith("data:")) wt = a;else if (ei() && o) wt = await ft(), wt.startsWith("blob:") && (wt = ht(wt));else if (o && (o.type === "gen-image" || o.type === "gen-video")) {
            const jt = o.settings || {},
              bt = Math.max(0, Number(jt.selectedMjImageIndex ?? 0)),
              Bt = await wY(o, a, bt);
            Bt != null && Bt.startsWith("blob:") || Bt != null && Bt.startsWith("data:") ? wt = ht(await UN(Bt)) : wt = Bt || a;
          } else if ((o == null ? void 0 : o.type) === "input-image") {
            const jt = await L1(o);
            jt.startsWith("blob:") || jt.startsWith("data:") ? wt = ht(await UN(jt)) : wt = jt;
          } else if (Er.isContentRef(a)) {
            await Er.init();
            const jt = await Er.get(Er.extractId(a));
            jt != null && jt.startsWith("blob:") || jt != null && jt.startsWith("data:") ? wt = ht(await UN(jt)) : jt && (wt = jt);
          } else wt = (await f5e(a)) || a;
          if (wt && ei() && nr(wt) && (wt = ""), !wt && o) {
            const jt = await ft();
            jt.startsWith("blob:") ? wt = ht(jt) : wt = jt;
          }
        } catch {
          try {
            const jt = await ft();
            jt.startsWith("blob:") ? wt = ht(jt) : wt = jt;
          } catch {
            wt = "";
          }
        }
        et || (w(wt), C(!1));
      })().catch(() => {
        et || (w(""), C(!1));
      }), () => {
        et = !0;
      };
    }, [n, a, o, k]);
    const Ge = Te ?? o,
      Oe = (Ge == null ? void 0 : Ge.width) || 260,
      st = (Ge == null ? void 0 : Ge.height) || 220,
      vt = (I == null ? void 0 : I.w) ?? Oe,
      Ht = (I == null ? void 0 : I.h) ?? st,
      nn = Mpe(Oe, st, vt, Ht),
      pt = nn.width,
      lt = nn.height,
      gt = pt * M,
      Ut = lt * P,
      _t = Math.max(0, (gt - pt) / 2),
      At = Math.max(0, (Ut - lt) / 2),
      Yt = {
        x: Math.max(-_t, Math.min(_t, F.x)),
        y: Math.max(-At, Math.min(At, F.y))
      },
      qe = Ge ? {
        x: Ge.x + nn.left + nn.width / 2,
        y: Ge.y + nn.top + nn.height / 2
      } : {
        x: 0,
        y: 0
      },
      kt = {
        x: qe.x + G.x,
        y: qe.y + G.y
      },
      St = e ? ((Ue = ae.current) == null ? void 0 : Ue.previewScale) ?? Math.min(1, Math.max(1, ge.width - 48) / gt, Math.max(1, ge.height - 48) / Ut) : 1,
      hn = e && ae.current ? (G.x - ae.current.startFrameOffset.x) * St : 0,
      Qt = e && ae.current ? (G.y - ae.current.startFrameOffset.y) * St : 0,
      Ot = e ? St : l != null && l.zoom && l.zoom > 0 ? l.zoom : 1,
      ln = M > 1.001 || P > 1.001,
      Pn = kt.y + Ut / 2 + 20 / Ot,
      rn = g.useCallback(et => {
        et.stopPropagation();
      }, []),
      Yn = g.useCallback((et, ft) => {
        et.preventDefault(), et.stopPropagation(), D(!0), O("custom"), ae.current = {
          handle: ft,
          startX: et.clientX,
          startY: et.clientY,
          startW: M,
          startH: P,
          previewScale: Ot,
          startFrameOffset: G,
          startSubjectOffset: F
        };
        const ht = jt => {
            const bt = ae.current;
            if (!bt) return;
            const {
                dx: Bt,
                dy: wn
              } = e ? {
                dx: (jt.clientX - bt.startX) / Ot,
                dy: (jt.clientY - bt.startY) / Ot
              } : uY(jt.clientX - bt.startX, jt.clientY - bt.startY, Ot),
              at = Bt / Math.max(pt, 1),
              Pt = wn / Math.max(lt, 1);
            let dt = bt.startW,
              xt = bt.startH;
            bt.handle.includes("right") && (dt = rM(bt.startW + at)), bt.handle.includes("left") && (dt = rM(bt.startW - at)), bt.handle.includes("bottom") && (xt = rM(bt.startH + Pt)), bt.handle.includes("top") && (xt = rM(bt.startH - Pt)), (bt.handle === "left" || bt.handle === "right") && (xt = bt.startH), (bt.handle === "top" || bt.handle === "bottom") && (dt = bt.startW);
            const yn = (dt - bt.startW) * pt,
              gn = (xt - bt.startH) * lt,
              mt = {
                ...bt.startFrameOffset
              },
              Xt = {
                ...bt.startSubjectOffset
              };
            bt.handle.includes("right") && (mt.x += yn / 2, Xt.x -= yn / 2), bt.handle.includes("left") && (mt.x -= yn / 2, Xt.x += yn / 2), bt.handle.includes("bottom") && (mt.y += gn / 2, Xt.y -= gn / 2), bt.handle.includes("top") && (mt.y -= gn / 2, Xt.y += gn / 2), T(dt), R(xt), z(mt), N(Xt);
          },
          wt = () => {
            ae.current = null, D(!1), window.removeEventListener("mousemove", ht), window.removeEventListener("mouseup", wt);
          };
        window.addEventListener("mousemove", ht), window.addEventListener("mouseup", wt);
      }, [pt, lt, Ot, e, M, P, G, F]),
      Ct = g.useCallback(et => {
        O(et);
        const ft = kun(et);
        it({
          ratio: ft,
          gptImage2AspectRatio: ft
        });
        const ht = eAt(pt, lt, et, j);
        T(ht.scaleW), R(ht.scaleH), z({
          x: 0,
          y: 0
        }), N({
          x: 0,
          y: 0
        }), Z(null);
      }, [pt, lt, j, it]),
      Cn = g.useCallback(et => {
        const ft = rM(et);
        B(ft), O("original");
        const ht = eAt(pt, lt, "original", ft);
        T(ht.scaleW), R(ht.scaleH), z({
          x: 0,
          y: 0
        }), N({
          x: 0,
          y: 0
        }), it({
          ratio: "Auto",
          gptImage2AspectRatio: "Auto"
        }), Z(null);
      }, [pt, lt, it]),
      un = g.useCallback(et => {
        et.preventDefault(), et.stopPropagation(), D(!0), xe.current = {
          startX: et.clientX,
          startY: et.clientY,
          startOffsetX: F.x,
          startOffsetY: F.y
        };
        const ft = wt => {
            const jt = xe.current;
            if (!jt) return;
            const {
              dx: bt,
              dy: Bt
            } = e ? {
              dx: (wt.clientX - jt.startX) / Ot,
              dy: (wt.clientY - jt.startY) / Ot
            } : uY(wt.clientX - jt.startX, wt.clientY - jt.startY, Ot);
            N({
              x: jt.startOffsetX + bt,
              y: jt.startOffsetY + Bt
            });
          },
          ht = () => {
            xe.current = null, D(!1), window.removeEventListener("mousemove", ft), window.removeEventListener("mouseup", ht);
          };
        window.addEventListener("mousemove", ft), window.addEventListener("mouseup", ht);
      }, [Ot, e, F.x, F.y]),
      Jn = g.useCallback(() => {
        var wn;
        if (!ze || !_ || ye.current || !ln) return;
        ye.current = !0, fe(!0);
        const et = ze.modelName || ze.id,
          ft = ze.provider || ze.modelName || ze.id,
          ht = _t <= 0 ? .5 : (Yt.x + _t) / (2 * _t),
          wt = At <= 0 ? .5 : (Yt.y + At) / (2 * At),
          jt = kun(V);
        let bt = Ve || Sun(Le) || "Auto";
        Xe && (bt = String(W.gptImage2Resolution || W.resolution || bt));
        const Bt = fm(Le) || vy(Le) ? TP(Le, W.gptImageQuality, (wn = zs(Le)) == null ? void 0 : wn.gptImageQuality) : String(W.gptImageQuality || (pk(Le) ? "high" : "standard"));
        RRi({
          documentSession: t,
          imageUrl: _,
          onStart: at => f == null ? void 0 : f(et, ft, at),
          onClose: r,
          fallback: {
            onSuccess: at => m == null ? void 0 : m(at, et, ft),
            onError: v,
            onProgress: b,
            onRemoteTaskId: y
          },
          run: (at, Pt) => u(at, jt, U.trim() || "基于原图自然扩展画面，保持风格一致", ze, V === "original" || V === "custom" ? j : 1, M, P, bt, {
            quality: Bt,
            background: String(W.gptImageBackground || "auto"),
            outputFormat: String(W.gptImageOutputFormat || "png"),
            moderation: String(W.gptImageModeration || "auto"),
            sourceOffsetXRatio: ht,
            sourceOffsetYRatio: wt,
            onRemoteTaskId: Pt.onRemoteTaskId,
            onProgress: Pt.onProgress,
            platformGroup: Ye,
            genUseAliyunOss: q
          })
        }).finally(() => {
          ye.current = !1, fe(!1);
        });
      }, [t, ze, Le, _, _t, At, Yt.x, Yt.y, f, r, u, He, V, j, Ve, Xe, W, U, M, P, Ye, q, ln, y, b, m, v]);
    if (!n) return null;
    const Kn = "pointer-events-auto absolute z-[130] flex max-w-[calc(100vw-32px)] flex-col items-center overflow-visible",
      en = `flex w-max max-w-[calc(100vw-32px)] items-center overflow-visible rounded-full border shadow-2xl backdrop-blur-xl ${i ? "border-white/10 bg-[#171717]/95 text-zinc-100" : "border-zinc-200 bg-white/95 text-zinc-800 shadow-md"}`,
      Vn = c.jsxs("div", {
        "data-expand-editor": !0,
        className: e ? "relative flex flex-col gap-4" : "absolute pointer-events-none",
        style: he ? {
          inset: 0
        } : {},
        children: [!e && c.jsx("div", {
          "aria-hidden": !0,
          className: "pointer-events-auto absolute z-[118] bg-black/15",
          style: e ? {
            inset: 0
          } : {
            left: -1e5,
            top: -1e5,
            width: 2e5,
            height: 2e5
          },
          onMouseDown: et => et.stopPropagation(),
          onWheel: et => et.stopPropagation()
        }), c.jsx("div", {
          ref: ue,
          "data-expand-stage": !0,
          style: e ? {
            position: "relative",
            height: "var(--sg-tool-preview-height, 340px)",
            overflow: "hidden",
            borderRadius: 12,
            background: "#111112"
          } : {
            display: "contents"
          },
          children: c.jsx("div", {
            className: "pointer-events-auto absolute z-[125]",
            style: he ? {
              left: kt.x,
              top: kt.y,
              transform: "translate(-50%, -50%)"
            } : e ? {
              left: `calc(50% + ${hn}px)`,
              top: `calc(50% + ${Qt}px)`,
              transform: `translate(-50%, -50%) scale(${St})`
            } : {
              left: "50%",
              top: "42%",
              transform: "translate(-50%, -50%)",
              position: "fixed"
            },
            children: c.jsx(cNi, {
              width: gt,
              height: Ut,
              baseWidth: pt,
              baseHeight: lt,
              imageUrl: _,
              imageOffset: Yt,
              resolving: S,
              showGrid: L,
              onImageMouseDown: un,
              onImageLoad: et => {
                be.current = 0;
                const ft = et.currentTarget,
                  ht = ft.naturalWidth || ft.width || 0,
                  wt = ft.naturalHeight || ft.height || 0;
                ht > 0 && wt > 0 && E({
                  w: ht,
                  h: wt
                });
              },
              onImageError: () => {
                S || be.current >= 2 || (be.current += 1, A(et => et + 1));
              },
              onHandleMouseDown: Yn
            })
          })
        }), c.jsxs("div", {
          "data-expand-toolbar": !0,
          className: Kn,
          style: he ? {
            left: kt.x,
            top: Pn,
            transform: `translateX(-50%) scale(${1 / Ot})`,
            transformOrigin: "top center"
          } : e ? {
            position: "relative",
            width: "100%",
            maxWidth: "100%"
          } : {
            left: "50%",
            top: "75%",
            transform: "translateX(-50%)",
            position: "fixed"
          },
          onMouseDown: et => et.stopPropagation(),
          onWheelCapture: rn,
          "data-model-select-area": !0,
          children: [c.jsxs("div", {
            className: `${en} expand-toolbar-row relative mb-2 min-h-[40px] shrink-0 flex-nowrap justify-start gap-1.5 px-2.5 py-1.5`,
            "data-model-select-area": !0,
            children: [!e && c.jsxs(c.Fragment, {
              children: [c.jsx("button", {
                type: "button",
                onClick: r,
                className: `h-8 w-8 inline-flex shrink-0 items-center justify-center rounded-full ${i ? "hover:bg-white/10 text-zinc-300" : "hover:bg-black/5 text-zinc-700"}`,
                children: c.jsx(Na, {
                  size: 16
                })
              }), c.jsx("div", {
                className: `mx-0.5 h-5 w-px shrink-0 ${i ? "bg-white/15" : "bg-zinc-300"}`
              })]
            }), c.jsx(sNi, {
              aspect: V,
              scale: j,
              baseWidth: pt,
              baseHeight: lt,
              isDark: i,
              scaleMenuOpen: ve,
              onToggleScaleMenu: () => {
                Z(ve ? null : {
                  nodeId: rV,
                  type: "expand_scale"
                });
              },
              onSelectScale: Cn,
              onSelectAspect: Ct
            }), c.jsx("div", {
              className: `mx-0.5 h-5 w-px shrink-0 ${i ? "bg-white/15" : "bg-zinc-300"}`
            }), Ne.length > 0 ? c.jsxs("div", {
              className: "relative min-w-0 max-w-[8.5rem] shrink",
              "data-model-select-area": !0,
              children: [c.jsxs("button", {
                ref: $e,
                type: "button",
                title: ze ? Ke : x("扩图模型"),
                "data-qiaodoumayi-gen-model": "true",
                onClick: et => {
                  et.stopPropagation(), Z(ke ? null : {
                    nodeId: rV,
                    type: "model"
                  });
                },
                onMouseDown: et => et.stopPropagation(),
                "aria-label": x("扩图模型"),
                className: `${dNi(i, ke)} w-full`,
                children: [c.jsx(Mp, {
                  modelId: Le,
                  kind: "image",
                  isDark: i,
                  config: ze,
                  size: 13,
                  fallback: c.jsx(lo, {
                    size: 13,
                    className: "shrink-0 block",
                    "aria-hidden": !0
                  })
                }), c.jsx("span", {
                  className: "min-w-0 flex-1 truncate text-left font-medium leading-none",
                  children: x(Ke)
                })]
              }), c.jsx(Tv, {
                open: ke,
                anchorRef: $e,
                isDark: i,
                className: "rounded-xl",
                menuWidth: Me,
                maxHeight: 360,
                placement: "above",
                scrollToSelectedKey: nt,
                orderedOptionKeys: rt,
                header: c.jsx(m9, {
                  isDark: i,
                  selected: Ae,
                  onSelect: Fe,
                  showHaiyi: Re
                }),
                children: me.length === 0 ? c.jsx("div", {
                  className: `px-2 py-3 text-center text-[11px] ${i ? "text-zinc-500" : "text-zinc-400"}`,
                  children: x("当前渠道下没有模型")
                }) : me.map(et => c.jsx("button", {
                  type: "button",
                  ...(nt === et.id ? {
                    [Md]: "true"
                  } : {}),
                  [qk]: et.id,
                  onClick: ft => {
                    ft.stopPropagation(), Ze(et.id), Z(null);
                  },
                  className: `w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-left text-xs transition-colors ${i ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${nt === et.id ? i ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                  children: c.jsxs("span", {
                    className: "flex min-w-0 items-center gap-1.5 leading-none",
                    children: [c.jsx(Mp, {
                      modelId: et.id,
                      kind: "image",
                      isDark: i,
                      config: et,
                      size: 13,
                      fallback: c.jsx(lo, {
                        size: 13,
                        className: "shrink-0 block",
                        "aria-hidden": !0
                      })
                    }), c.jsx("span", {
                      className: "font-medium whitespace-nowrap leading-none self-center",
                      children: JU(et)
                    })]
                  })
                }, et.id))
              })]
            }) : null, c.jsxs("div", {
              className: "ml-auto flex min-w-0 shrink flex-nowrap items-center justify-end gap-1 overflow-visible",
              children: [!de && J ? c.jsxs("label", {
                className: `${uNi(i)} cursor-pointer shrink-0`,
                onMouseDown: et => et.stopPropagation(),
                title: Jk(ce),
                children: [c.jsx("input", {
                  type: "checkbox",
                  checked: q,
                  onChange: et => ne(et.target.checked),
                  className: "h-3 w-3 cursor-pointer"
                }), c.jsx("span", {
                  children: $g(ce)
                })]
              }) : null, De ? c.jsx("div", {
                className: "min-w-0 max-w-[5.75rem] shrink",
                onMouseDown: et => et.stopPropagation(),
                children: c.jsx(Ku, {
                  platformGroup: Ye,
                  modelName: (ze == null ? void 0 : ze.modelName) || Le,
                  modelId: Le,
                  modelConfigId: ze == null ? void 0 : ze.id,
                  uiResolution: Ve,
                  isDark: i,
                  compact: !0,
                  truncateHead3: !1,
                  buttonVariant: "bare",
                  menuPlacement: "above",
                  className: "!max-w-full",
                  onGroupChange: et => {
                    it({
                      platformGroup: et
                    }), cl(Le, {
                      platformGroup: et
                    });
                  }
                })
              }) : null, c.jsx("div", {
                className: "expand-toolbar-size-slot shrink-0 overflow-visible",
                children: Xe ? c.jsx(VJe, {
                  variant: "dropdown",
                  nodeId: rV,
                  isDark: i,
                  currentModel: Le,
                  settings: W,
                  activeDropdown: X,
                  setActiveDropdown: Z,
                  qualityOptions: It,
                  selectedQuality: Ft,
                  onSelectQuality: We,
                  hideAspectRatio: !0,
                  popoverButtonVariant: "bare",
                  onApply: et => {
                    it({
                      ...et,
                      ratio: "Auto",
                      gptImage2AspectRatio: "Auto",
                      gptImage2Resolution: "auto"
                    });
                  },
                  onSaveModelMemory: et => cl(Le, {
                    ...et,
                    aspectRatio: "Auto",
                    gptImage2AspectRatio: "Auto",
                    gptImage2Resolution: "auto"
                  })
                }) : c.jsx(GJe, {
                  nodeId: rV,
                  isDark: i,
                  dropdownType: "expand_size",
                  activeDropdown: X,
                  setActiveDropdown: Z,
                  selectedRatio: "Auto",
                  ratioOptions: ["Auto"],
                  onSelectRatio: () => {
                    it({
                      ratio: "Auto",
                      gptImage2AspectRatio: "Auto"
                    });
                  },
                  hideRatioSection: !0,
                  buttonVariant: "bare",
                  resolutionOptions: Ce,
                  selectedResolution: Ce.includes(Ve) ? Ve : Ce[0],
                  onSelectResolution: et => {
                    it({
                      resolution: et,
                      ratio: "Auto",
                      gptImage2AspectRatio: "Auto"
                    }), cl(Le, {
                      resolution: et,
                      aspectRatio: "Auto"
                    });
                  },
                  qualityOptions: It,
                  selectedQuality: Ft,
                  onSelectQuality: We
                })
              })]
            })]
          }), c.jsxs("div", {
            "data-expand-composer": !0,
            className: `${en} min-h-[48px] w-[min(840px,calc(100vw-32px))] gap-2 px-4 py-2`,
            style: e ? {
              width: "100%"
            } : void 0,
            children: [c.jsx("input", {
              value: U,
              onChange: et => H(et.target.value),
              onKeyDown: et => {
                et.key === "Enter" && !et.shiftKey && !et.nativeEvent.isComposing && (et.preventDefault(), Jn());
              },
              placeholder: x("描述你想如何扩展画面，不填将基于原图生成"),
              "aria-label": x("扩图描述输入"),
              className: `h-8 min-w-0 flex-1 bg-transparent text-[13px] outline-none ${i ? "text-zinc-100 placeholder:text-zinc-500" : "text-zinc-800 placeholder:text-zinc-400"}`
            }), c.jsx("button", {
              type: "button",
              disabled: re || !ln,
              title: x(ln ? "开始扩图" : "请先扩展至少一条边"),
              onClick: Jn,
              "aria-label": x("开始扩图"),
              className: `inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 ${i ? "bg-white text-black hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-black"}`,
              children: c.jsx(Gc, {
                size: 16,
                strokeWidth: 2.4
              })
            })]
          })]
        })]
      });
    return he && d ? Da.createPortal(Vn, d) : e ? Vn : c.jsx("div", {
      className: "fixed inset-0 z-[120] bg-black/45",
      children: Vn
    });
  },
  hNi = Object.freeze(Object.defineProperty({
    __proto__: null,
    ExpandModal: iAe,
    default: iAe
  }, Symbol.toStringTag, {
    value: "Module"
  }));

async function Uhr(e, t = {}) {
  const n = t.crop === !0 ? "true" : "false",
    a = `${(t.baseUrl || "http://localhost:30092").replace(/\/+$/, "")}/rmbg?crop=${n}`,
    i = await fetch(a, {
      method: "POST",
      headers: {
        "Content-Type": e.type || "application/octet-stream"
      },
      body: e
    });
  if (!i.ok) {
    const s = await i.text().catch(() => "");
    throw new Error(s || `鲜艺抠图请求失败（HTTP ${i.status}）`);
  }
  const o = await i.blob();
  if (!o || o.size <= 0) throw new Error("鲜艺抠图返回为空");
  return o;
}

function pNi(e) {
  var n;
  let t = (n = e == null ? void 0 : e.nodeName) == null ? void 0 : n.trim();
  return (!t || t === "未命名节点") && (t = (e != null && e.prompt && typeof e.prompt == "string" ? e.prompt : "").replace(/\.[^/.]+$/, "").trim()), t || "图片";
}

function BMe(e) {
  if (!e) return;
  const t = e._previewMjAssetIds;
  if (Array.isArray(t) && t.some(s => typeof s == "string" && s.length > 0)) return t.map(s => typeof s == "string" ? s : "").filter(Boolean);
  const n = e.settings || {},
    r = n._mjAssetIds;
  if (Array.isArray(r) && r.some(s => typeof s == "string" && String(s).length > 0)) return r.map(s => String(s ?? "")).filter(Boolean);
  const i = (n.generatedImages || []).map(s => typeof (s == null ? void 0 : s.assetId) == "string" ? s.assetId : "").filter(Boolean);
  if (i.length) return i;
  const o = n._mjPreviewAssetIds;
  if (Array.isArray(o) && o.length) return o.map(s => String(s ?? "")).filter(Boolean);
}

function zfe(e) {
  if (!e) return;
  const t = e._contentAssetId;
  if (typeof t == "string" && t.length > 0) return t;
  const r = (e.settings || {})._contentAssetId;
  return typeof r == "string" && r.length > 0 ? r : void 0;
}

const mNi = ({
    documentSession: e,
    previewContextMenu: t,
    setPreviewContextMenu: n,
    setCroppingNodeId: r,
    isDark: a,
    nodes: i,
    view: o,
    canvasPortalEl: s,
    selectedNodeIds: l,
    setChatFiles: d,
    setIsChatOpen: u,
    setNodes: h,
    setConnections: p,
    generateId: m,
    splitImageToShots: f,
    runExpandImage: y,
    imageConfigs: b = [],
    showHuyaModels: v = !1,
    history: _ = [],
    setHistory: w,
    setLightboxItem: k,
    setLightboxOpen: A,
    toastError: S,
    toastSuccess: C,
    onSaveToMaterialLibrary: I
  }) => {
    var re, fe, ye;
    on();
    const E = ie => {
        const ae = document.querySelectorAll(".node-wrapper[data-node-id]");
        for (const be of Array.from(ae)) if (be.dataset.nodeId === ie) return be;
        return null;
      },
      M = ie => {
        const ae = e == null ? void 0 : e.lease();
        if (!ie || ae && !ae.isCurrent()) return;
        const be = E(ie.id);
        be && (be.style.removeProperty("opacity"), be.style.removeProperty("visibility"), be.style.removeProperty("pointer-events")), h(Ee => ae && !ae.isCurrent() ? Ee : Ee.map(xe => xe.id === ie.id ? {
          ...xe,
          settings: {
            ...(xe.settings || {}),
            _expandSourceHidden: void 0
          }
        } : xe));
      },
      [T, P] = g.useState(!1),
      [R, j] = g.useState(null),
      [B, F] = g.useState(null),
      N = g.useRef(null),
      G = g.useRef(null),
      z = g.useRef(null),
      V = async ie => {
        if (ie.startsWith("data:")) return ie;
        const ae = await fetch(ie);
        if (!ae.ok) throw new Error(`无法加载: ${ae.status}`);
        const be = await ae.blob();
        return new Promise((Ee, xe) => {
          const he = new FileReader();
          he.onload = () => Ee(he.result), he.onerror = xe, he.readAsDataURL(be);
        });
      },
      O = () => {
        const ie = t.item;
        if (!ie) return;
        const ae = ie.sourceNode,
          be = BMe(ae),
          Ee = zfe(ae),
          xe = ie.selectedIndices ?? [],
          he = ie.selectedUrls || [ie.url],
          ue = be != null && be.length ? be[xe[0] ?? 0] : Ee;
        if (ue) {
          const _e = _.find(ke => {
            const ve = ke._assetId,
              Te = ke._mjAssetIds;
            return !!(ve === ue || Te != null && Te.includes(ue));
          });
          if (_e) return (_e.prompt || _e.positivePrompt || "").trim() || void 0;
        }
        const ge = he[0];
        if (ge) {
          const _e = _.find(ke => {
            var ve;
            return !!(ke.url === ge || (ve = ke.mjImages) != null && ve.some(Te => Te === ge));
          });
          if (_e) return (_e.prompt || _e.positivePrompt || "").trim() || void 0;
        }
      },
      L = async () => {
        const ie = t.item;
        if (ie != null && ie.url) {
          if (!C || !S) {
            S == null || S("未配置 Toast");
            return;
          }
          try {
            if (!(await vCe())) {
              S("请先启动 Eagle 应用"), q();
              return;
            }
            const be = O(),
              Ee = ie.sourceNode,
              xe = (Ee == null ? void 0 : Ee.settings) || {},
              he = xe._stitchedFullUrl,
              ue = xe._stitchedPreviewUrl;
            let ge = ie.selectedUrls || [ie.url];
            he && ue && ge.length === 1 && ge[0] === ue ? ge = [he] : Ee && ie.type !== "video" && (ge = ge.map((Me, Re) => {
              var rt;
              return Zo(Ee, ((rt = ie.selectedIndices) == null ? void 0 : rt[Re]) ?? Re) || Me;
            }));
            const _e = BMe(Ee),
              ke = zfe(Ee),
              ve = ie.selectedIndices ?? [],
              Te = [];
            for (let Me = 0; Me < ge.length; Me++) {
              const Re = ge[Me],
                $e = _e != null && _e.length ? _e[ve[Me] ?? Me] : ke;
              let rt = Re;
              if ($e && !(Re != null && Re.includes("video")) && !(Re != null && Re.includes("audio"))) try {
                const {
                  localCacheManager: nt
                } = await Ie(async () => {
                  const {
                    localCacheManager: ze
                  } = await Promise.resolve().then(() => Ha);
                  return {
                    localCacheManager: ze
                  };
                }, void 0, import.meta.url);
                if (nt.isAvailable() && nt.hasAsset($e)) {
                  const ze = await nt.readAsset($e);
                  ze != null && ze.blob && (rt = URL.createObjectURL(ze.blob));
                }
                if (rt === Re) {
                  const {
                      assetStore: ze
                    } = await Ie(async () => {
                      const {
                        assetStore: Ke
                      } = await Promise.resolve().then(() => Ri);
                      return {
                        assetStore: Ke
                      };
                    }, void 0, import.meta.url),
                    Le = await ze.getAssetBlob($e);
                  Le && (rt = URL.createObjectURL(Le));
                }
              } catch {}
              if (rt === Re && !Re.startsWith("data:")) try {
                const nt = await fetch(Re);
                if (nt.ok) {
                  const ze = await nt.blob();
                  rt = URL.createObjectURL(ze);
                }
              } catch {}
              Te.push(rt);
            }
            if (!Te.length) {
              S("无法解析素材地址"), q();
              return;
            }
            const Ne = (be || ie.prompt || "").trim() || void 0,
              me = ie.type === "video" ? "mp4" : ie.type === "audio" ? "mp3" : "jpg",
              {
                isTauriAssetProtocolUrl: Ae
              } = await Ie(async () => {
                const {
                  isTauriAssetProtocolUrl: Me
                } = await Promise.resolve().then(() => So);
                return {
                  isTauriAssetProtocolUrl: Me
                };
              }, void 0, import.meta.url),
              Fe = await Promise.all(Te.map(async (Me, Re) => {
                var Le, Ke;
                let $e = Me;
                (Me.startsWith("blob:") || Ae(Me) || Me.startsWith("/") && !Me.startsWith("http") || !/^https?:\/\//i.test(Me)) && ($e = await V(Me));
                const rt = ((Ke = (Le = $e.match(/^data:([^;,]+)/i)) == null ? void 0 : Le[1]) == null ? void 0 : Ke.toLowerCase()) || "";
                let nt = me;
                rt === "image/jpeg" || rt === "image/jpg" ? nt = "jpg" : rt === "image/png" ? nt = "png" : rt === "image/webp" ? nt = "webp" : rt === "image/gif" ? nt = "gif" : rt.startsWith("video/") && (nt = rt.includes("webm") ? "webm" : "mp4");
                const ze = `Preview-${Date.now()}${Te.length > 1 ? `-${Re + 1}` : ""}.${nt}`;
                return {
                  url: $e,
                  name: ze,
                  annotation: Ne
                };
              }));
            await PXe(Fe), C(`已发送 ${Fe.length} 个素材到 Eagle`);
          } catch (ae) {
            S(ae instanceof Error ? ae.message : "发送到 Eagle 失败");
          }
          q();
        }
      },
      D = async ie => {
        let ae = ie;
        if (Er.isContentRef(ae)) try {
          await Er.init();
          const be = Er.extractId(ae),
            Ee = await Er.get(be);
          Ee && (ae = Ee);
        } catch (be) {
          console.warn("[PreviewContextMenu] content_ref 解析失败（视频提取帧将尝试用原始URL）:", be);
        }
        return ae;
      },
      U = async () => {
        const ie = t.item,
          ae = ie == null ? void 0 : ie.sourceNode;
        if (!(ie != null && ie.url) || ie.type !== "video" || !ae) {
          q();
          return;
        }
        q();
        let be = null;
        try {
          const Ee = await D(ie.url),
            {
              url: xe,
              revoke: he
            } = await Yk(Ee);
          be = he;
          const ue = document.createElement("video");
          ue.muted = !0, ue.playsInline = !0, ue.crossOrigin = xe.startsWith("http") ? "anonymous" : null, await new Promise((nt, ze) => {
            ue.onloadedmetadata = () => nt(), ue.onerror = () => ze(ue.error), ue.src = xe;
          });
          const ge = ue.duration || 0;
          ue.remove();
          const _e = Math.max(0, ge - .05),
            [ke, ve] = await Promise.all([Gz(xe, 0, {
              preserveOriginal: !0,
              quality: .95
            }), Gz(xe, _e, {
              preserveOriginal: !0,
              quality: .95
            })]),
            [Te, Ne] = await Promise.all([JS(ke, "first", {
              sourceNodeId: ae.id
            }), JS(ve, "last", {
              sourceNodeId: ae.id
            })]),
            me = ae.width ?? 300,
            Ae = ae.height ?? 200,
            Fe = 24,
            Me = m(),
            Re = m(),
            $e = Ki(Me, "input-image", ae.x + me + Fe, ae.y, "首帧", Te.settings, i || []),
            rt = Ki(Re, "input-image", ae.x + me + Fe * 2 + me, ae.y, "尾帧", Ne.settings, i || []);
          h(nt => [...nt, {
            ...$e,
            content: Te.content,
            width: me,
            height: Ae
          }, {
            ...rt,
            content: Ne.content,
            width: me,
            height: Ae
          }]);
        } catch (Ee) {
          console.error("[PreviewContextMenu] 提取视频首尾帧失败:", Ee), S == null || S("提取视频首尾帧失败");
        } finally {
          be == null || be();
        }
      },
      H = async () => {
        const ie = t.item,
          ae = ie == null ? void 0 : ie.sourceNode;
        if (!(ie != null && ie.url) || ie.type !== "video" || !ae) {
          q();
          return;
        }
        q();
        let be = null;
        try {
          const Ee = await D(ie.url),
            {
              url: xe,
              revoke: he
            } = await Yk(Ee);
          be = he;
          const ue = Number.isFinite(ie.videoCurrentTime) ? ie.videoCurrentTime : 0,
            ge = await Gz(xe, ue, {
              preserveOriginal: !0,
              quality: .95
            }),
            _e = await JS(ge, "current", {
              sourceNodeId: ae.id
            }),
            ke = ae.width ?? 300,
            ve = ae.height ?? 200,
            Te = 24,
            Ne = m(),
            me = Ki(Ne, "input-image", ae.x + ke + Te, ae.y, "当前帧", _e.settings, i || []);
          h(Ae => [...Ae, {
            ...me,
            content: _e.content,
            width: ke,
            height: ve
          }]);
        } catch (Ee) {
          console.error("[PreviewContextMenu] 提取视频当前帧失败:", Ee), S == null || S("提取视频当前帧失败");
        } finally {
          be == null || be();
        }
      },
      Y = async ie => {
        var be;
        if (!(R != null && R.imageUrl) || ie.length === 0) return;
        const ae = (be = R.sourceNode) == null ? void 0 : be.id;
        ae && r && Da.flushSync(() => r(ae));
        try {
          let Ee = R.imageUrl;
          const xe = (i || []).find(Fe => {
            var Me;
            return Fe.id === ((Me = R.sourceNode) == null ? void 0 : Me.id);
          }) ?? R.sourceNode;
          if ((xe == null ? void 0 : xe.type) === "input-image") {
            const Fe = await L1(xe);
            Fe && (Ee = Fe);
          } else if ((xe == null ? void 0 : xe.type) === "gen-image" || (xe == null ? void 0 : xe.type) === "gen-video") {
            const Fe = xe.settings || {},
              Me = Math.max(0, Number(Fe.selectedMjImageIndex ?? 0)),
              Re = await wY(xe, Ee, Me);
            Re && (Ee = Re);
          }
          const he = await LCt(Ee, ie),
            ue = R.sourceNode,
            ge = ue ? ue.x + ue.width + 20 : o.x + 100,
            _e = ue ? ue.y : o.y + 100,
            ke = he.length,
            ve = Math.ceil(Math.sqrt(ke)),
            Te = ke <= 4 ? 260 : ke <= 9 ? 240 : ke <= 16 ? 200 : 160,
            Ne = ke <= 4 ? 20 : ke <= 9 ? 60 : ke <= 16 ? 50 : 40,
            me = pNi(ue),
            Ae = await vCn(he, {
              originX: ge,
              originY: _e,
              cols: ve,
              nodeWidth: Te,
              nodeHeight: Te,
              spacingW: Te + Ne,
              spacingH: Te + Ne,
              baseName: me
            }, m);
          h(Fe => [...Fe, ...Ae]), j(null);
        } catch (Ee) {
          console.error("[PreviewContextMenu] 自由裁切失败:", Ee), j(null);
        } finally {
          r == null || r(null);
        }
      },
      K = async ie => {
        var xe, he;
        const ae = ie.sourceNode,
          be = ((xe = ie.selectedIndices) == null ? void 0 : xe[0]) ?? Number(((he = ae == null ? void 0 : ae.settings) == null ? void 0 : he.selectedMjImageIndex) ?? 0),
          Ee = Number.isFinite(be) ? Math.max(0, be) : 0;
        if (ae && ie.type !== "video" && ie.type !== "audio") {
          if (!ei()) {
            const ue = Zo(ae, Ee);
            if (ue && eLe(ie.url, ae, Ee)) return ue;
          }
          if (ae.type === "input-image") {
            const ue = (i == null ? void 0 : i.find(_e => _e.id === ae.id)) ?? ae,
              ge = await L1(ue);
            if (ge) return ge;
          }
        }
        return W(ie);
      },
      W = async ie => {
        var Te;
        const ae = ie.sourceNode;
        if (!ae || ie.type === "video" || ie.type === "audio") return ie.url;
        const be = ae.settings || {},
          Ee = ((Te = ie.selectedIndices) == null ? void 0 : Te[0]) ?? Number(be.selectedMjImageIndex ?? 0),
          xe = Number.isFinite(Ee) ? Math.max(0, Ee) : 0,
          he = ie.url;
        if (ae.type === "gen-image" || ae.type === "gen-video") try {
          const Ne = await wY(ae, he, xe);
          if (Ne) return Ne;
        } catch {}
        const ue = BMe(ae),
          ge = zfe(ae),
          ke = (he.startsWith("blob:") ? (await Ie(async () => {
            const {
              getAssetIdForDisplayBlobUrl: Ne
            } = await Promise.resolve().then(() => No);
            return {
              getAssetIdForDisplayBlobUrl: Ne
            };
          }, void 0, import.meta.url)).getAssetIdForDisplayBlobUrl(he) : null) || uU(ae, he, xe) || (ue != null && ue.length ? ue[Math.min(xe, ue.length - 1)] : void 0) || (he === String(ae.content || "").trim() ? ge : void 0),
          ve = typeof be._compactOriginalRelPath == "string" ? be._compactOriginalRelPath.trim() : "";
        if (he) try {
          const Ne = await Vm(he, ke || null, ve || null);
          if (Ne) {
            const me = URL.createObjectURL(Ne);
            return ke && Il(me, ke), me;
          }
        } catch {}
        if (ke) {
          try {
            const {
                readLocalOriginalAssetAsUrl: Ne
              } = await Ie(async () => {
                const {
                  readLocalOriginalAssetAsUrl: Fe
                } = await Promise.resolve().then(() => Ui);
                return {
                  readLocalOriginalAssetAsUrl: Fe
                };
              }, void 0, import.meta.url),
              me = typeof be._localOriginalUrlHint == "string" ? be._localOriginalUrlHint.trim() : void 0,
              Ae = await Ne(ke, me);
            if (Ae && (!ei() || Mk(Ae))) return Ae.startsWith("blob:") && Il(Ae, ke), Ae;
          } catch (Ne) {
            console.warn("[PreviewContextMenu] 扩图读取本地缓存原图失败，尝试其他来源:", Ne);
          }
          try {
            const {
                assetStore: Ne
              } = await Ie(async () => {
                const {
                  assetStore: Ae
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: Ae
                };
              }, void 0, import.meta.url),
              me = await Ne.getAssetUrl(ke);
            if (me && (!ei() || Mk(me))) return me.startsWith("blob:") && Il(me, ke), me;
          } catch {}
        }
        if (Er.isContentRef(ie.url)) try {
          await Er.init();
          const Ne = await Er.get(Er.extractId(ie.url));
          if (Ne) return Ne;
        } catch {}
        if (ei()) {
          if (ae.type === "input-image") {
            const Ne = (i == null ? void 0 : i.find(Ae => Ae.id === ae.id)) ?? ae,
              me = await L1(Ne);
            if (me) return me;
          }
          return Mk(ie.url) ? ie.url : "";
        }
        return ie.url;
      },
      Q = (ie, ae, be) => {
        if (!B) return null;
        const Ee = B.sourceNode,
          xe = BJe({
            documentSession: e,
            ...be,
            sourceNode: Ee,
            existingNodes: i,
            modelId: ie,
            modelName: ae,
            generateId: m,
            setNodes: h,
            setConnections: p,
            setHistory: w,
            onSettled: (he, ue) => {
              N.current === he && (N.current = null, ue && (S == null || S(ue.message || "扩图失败")));
            }
          });
        return xe ? (N.current = xe, M(Ee), F(null), xe) : (S == null || S("本节点已有扩图任务，或当前项目尚未就绪"), null);
      },
      q = () => {
        n({
          visible: !1,
          x: 0,
          y: 0,
          item: null
        }), P(!1), G.current && (clearTimeout(G.current), G.current = null), z.current && (clearTimeout(z.current), z.current = null);
      },
      ne = () => {
        G.current = setTimeout(() => {
          q();
        }, 500);
      },
      de = () => {
        G.current && (clearTimeout(G.current), G.current = null);
      };
    g.useEffect(() => () => {
      G.current && clearTimeout(G.current), z.current && clearTimeout(z.current);
    }, []);
    const le = async () => {
        var ae, be, Ee;
        const ie = t.item;
        if (ie != null && ie.url) {
          const xe = ie.type !== "video",
            he = ie.type === "video",
            ue = xe ? "png" : "mp4",
            ge = xe ? "image/png" : "video/mp4",
            _e = `Preview-${Date.now()}.${ue}`,
            ke = `preview_${ie.id || ((ae = ie.sourceNode) == null ? void 0 : ae.id) || "x"}_${Date.now()}`;
          let ve = String(ie.url || "").trim();
          if (Er.isContentRef(ve)) try {
            await Er.init();
            const Te = Er.extractId(ve),
              Ne = await Er.get(Te);
            Ne && (ve = Ne);
          } catch (Te) {
            console.error("[PreviewContextMenu] content_ref 解析失败:", Te);
          }
          try {
            const {
                buildChatComposerMediaFromUrl: Te,
                acceptChatListDisplayUrl: Ne
              } = await Ie(async () => {
                const {
                  buildChatComposerMediaFromUrl: Me,
                  acceptChatListDisplayUrl: Re
                } = await Promise.resolve().then(() => MD);
                return {
                  buildChatComposerMediaFromUrl: Me,
                  acceptChatListDisplayUrl: Re
                };
              }, void 0, import.meta.url),
              me = String(ie._assetId || ((be = ie.sourceNode) == null ? void 0 : be._contentAssetId) || ie.id || ((Ee = ie.sourceNode) == null ? void 0 : Ee.id) || "").trim() || void 0,
              Ae = Ne(String(ie.thumbnailUrl || ie._ossThumbnailUrl || ve || "").trim()) || void 0;
            u(!0), q(), Ae && (xe || he) && d(Me => [...Me, {
              name: _e,
              displayName: _e,
              type: ge,
              preview: Ae,
              isImage: xe,
              isVideo: he,
              _pendingToken: ke
            }]);
            const Fe = await Te({
              sourceUrl: ve,
              assetId: me,
              seededPreview: Ae,
              name: _e,
              isImage: xe,
              isVideo: he,
              mimeType: ge,
              index: Date.now() % 1e5
            });
            if (!Fe) {
              console.error("[PreviewContextMenu] 发送到对话失败：媒体落盘失败"), d(Me => Me.filter(Re => Re._pendingToken !== ke));
              return;
            }
            d(Me => {
              const Re = Me.findIndex(rt => rt._pendingToken === ke),
                $e = Fe;
              if (Re >= 0) {
                const rt = [...Me];
                return rt[Re] = $e, rt;
              }
              return [...Me, $e];
            });
          } catch (Te) {
            console.error("[PreviewContextMenu] 发送到对话失败:", Te), d(Ne => Ne.filter(me => me._pendingToken !== ke));
          }
          return;
        }
        q();
      },
      J = async () => {
        const ie = t.item;
        if (!(ie != null && ie.url) || ie.type === "video") {
          q();
          return;
        }
        try {
          const ae = (await K(ie)) || ie.url,
            {
              url: be,
              width: Ee,
              height: xe
            } = await Ix(ae),
            he = ie.sourceNode,
            ue = he ? he.x + he.width + 20 : o.x + 100,
            ge = he ? he.y : o.y + 100,
            _e = Ee / xe,
            ke = 260,
            ve = 80;
          let Te = _e >= 1 ? Math.min(ke, Ee) : Math.min(ke * _e, Ee),
            Ne = _e >= 1 ? Math.min(ke / _e, xe) : Math.min(ke, xe);
          if (Te < ve || Ne < ve) {
            const Ae = Math.max(ve / Te, ve / Ne);
            Te = Math.round(Te * Ae), Ne = Math.round(Ne * Ae);
          }
          const me = {
            id: m(),
            type: "input-image",
            x: ue,
            y: ge,
            width: Te,
            height: Ne,
            content: be,
            prompt: "",
            settings: {
              hasCustomSize: !0,
              imageSize: `${Ee}×${xe}`,
              dimensions: {
                w: Ee,
                h: xe
              }
            }
          };
          h(Ae => [...Ae, me]);
        } catch (ae) {
          console.error("[PreviewContextMenu] 创建缩图失败:", ae);
        }
        q();
      },
      pe = async () => {
        const ie = t.item,
          ae = ie == null ? void 0 : ie.sourceNode,
          be = (ae == null ? void 0 : ae.settings) || {},
          Ee = be._stitchedFullUrl,
          xe = be._stitchedPreviewUrl;
        if (!!be._isStoryboardMosaic && typeof Ee == "string" && Ee && ae) {
          const rt = ae ? ae.x + ae.width + 20 : o.x + 100,
            nt = ae ? ae.y : o.y + 100;
          if (be._ossUrlOnlyMode && nr(Ee)) {
            const Ke = String(be[_i] || Ee).trim(),
              Xe = String(be[Pi] || xe || Ee).trim(),
              De = {
                id: m(),
                type: "input-image",
                x: rt,
                y: nt,
                width: 320,
                height: 280,
                content: Xe,
                prompt: "",
                settings: aCt(Ke, Xe)
              };
            h(Ye => [...Ye, De]), q();
            return;
          }
          let ze = Ee;
          try {
            const Ke = Er.extractId(Ee),
              {
                localCacheManager: Xe
              } = await Ie(async () => {
                const {
                  localCacheManager: De
                } = await Promise.resolve().then(() => Ha);
                return {
                  localCacheManager: De
                };
              }, void 0, import.meta.url);
            if (Xe.isAvailable() && Xe.hasAsset(Ke)) {
              const De = await Xe.readAsset(Ke);
              if (De != null && De.blob) {
                const Ye = URL.createObjectURL(De.blob);
                try {
                  ze = await Er.storeImageUrlAsRef(Ye);
                } finally {
                  try {
                    URL.revokeObjectURL(Ye);
                  } catch {}
                }
              }
            }
          } catch (Ke) {
            console.warn("[PreviewContextMenu] 从缓存目录读取拼接原图失败，使用 content_ref:", Ke);
          }
          const Le = {
            id: m(),
            type: "input-image",
            x: rt,
            y: nt,
            width: 320,
            height: 280,
            content: ze,
            prompt: "",
            settings: {
              mediaType: "image",
              _mosaicRefFull: Ee,
              _mosaicRefPreview: xe
            }
          };
          h(Ke => [...Ke, Le]), q();
          return;
        }
        if (!(ie != null && ie.url)) {
          q();
          return;
        }
        let ue = ie.selectedUrls || [ie.url];
        const ge = ue.length;
        let _e = 1;
        ge === 4 ? _e = 2 : ge === 9 ? _e = 3 : ge > 1 && (_e = Math.ceil(Math.sqrt(ge)));
        const ke = ae ? ae.x + ae.width + 20 : o.x + 100,
          ve = ae ? ae.y : o.y + 100,
          Te = 320,
          Ne = 280,
          me = 100,
          Ae = 100,
          Fe = BMe(ae),
          Me = zfe(ae),
          Re = ie.selectedIndices ?? (ue.length === 1 && Me ? [0] : []),
          $e = [];
        for (let rt = 0; rt < ue.length; rt++) {
          const nt = ue[rt];
          let ze = nt,
            Le = "image";
          const Ke = Re[rt] ?? rt;
          if (ie.type === "video" && (ae == null ? void 0 : ae.type) === "gen-video") {
            const Ve = await zRt(ae, nt, Ke);
            if (Ve) {
              const {
                  width: it,
                  height: It
                } = $2e(Ve.mediaType),
                Ft = {
                  ...Ve.settings
                },
                We = String(Ft._localCacheAssetId || Ft._assetId || "").trim();
              $e.push({
                id: m(),
                type: "input-image",
                x: ke + rt % _e * (Te + me),
                y: ve + Math.floor(rt / _e) * (Ne + Ae),
                width: it,
                height: It,
                content: Ve.content,
                prompt: "",
                nodeName: Ve.nodeName,
                settings: Ft,
                ...(Ve.videoPosterUrl ? {
                  videoPosterUrl: Ve.videoPosterUrl
                } : {}),
                ...(We ? {
                  _contentAssetId: We
                } : {})
              });
              continue;
            }
          }
          if (ae && (ae.type === "gen-image" || ae.type === "gen-video") && ie.type !== "video" && ie.type !== "audio") {
            const Ve = await FRt(ae, nt, Ke);
            if (Ve) {
              $e.push({
                id: m(),
                type: "input-image",
                x: ke + rt % _e * (Te + me),
                y: ve + Math.floor(rt / _e) * (Ne + Ae),
                width: Te,
                height: Ne,
                content: Ve.content,
                prompt: "",
                nodeName: Ve.nodeName,
                settings: Ve.settings
              });
              continue;
            }
          }
          if ((ae == null ? void 0 : ae.type) === "preview" && ie.type !== "video" && ie.type !== "audio") {
            const it = (ae._previewMjAssetIds || [])[Ke] || ae._contentAssetId || void 0,
              It = await wQe(nt, {
                assetId: it,
                nodeName: ae.nodeName || void 0
              });
            if (It) {
              $e.push({
                id: m(),
                type: "input-image",
                x: ke + rt % _e * (Te + me),
                y: ve + Math.floor(rt / _e) * (Ne + Ae),
                width: Te,
                height: Ne,
                content: It.content,
                prompt: "",
                nodeName: It.nodeName,
                settings: It.settings,
                ...(it ? {
                  _contentAssetId: it
                } : {})
              });
              continue;
            }
          }
          const Xe = ae && ie.type !== "video" && ie.type !== "audio" ? Zo(ae, Ke) : null;
          if (Xe && ae && ua() && eLe(nt, ae, Ke)) {
            const Ve = Bm(ae, Ke) || nt;
            $e.push({
              id: m(),
              type: "input-image",
              x: ke + rt % _e * (Te + me),
              y: ve + Math.floor(rt / _e) * (Ne + Ae),
              width: Te,
              height: Ne,
              content: Ve,
              prompt: "",
              settings: {
                mediaType: "image",
                [_i]: Xe,
                [Pi]: Ve,
                [Cl]: !0,
                disableThumbnailCreationOnImport: !0
              }
            });
            continue;
          }
          const De = ae ? uU(ae, nt, Ke) || (Fe != null && Fe.length ? Fe[Ke] : void 0) || (nt === String(ae.content || "").trim() ? Me : void 0) : void 0;
          try {
            if (De && !(nt != null && nt.includes("video")) && !(nt != null && nt.includes("audio"))) {
              const {
                localCacheManager: Ve
              } = await Ie(async () => {
                const {
                  localCacheManager: it
                } = await Promise.resolve().then(() => Ha);
                return {
                  localCacheManager: it
                };
              }, void 0, import.meta.url);
              if (Ve.isAvailable() && Ve.hasAsset(De)) {
                const it = await Ve.readAsset(De);
                it && (ze = URL.createObjectURL(it.blob), Le = it.mimeType.startsWith("video/") ? "video" : it.mimeType.startsWith("audio/") ? "audio" : "image");
              }
              if (ze === nt) {
                const {
                    assetStore: it
                  } = await Ie(async () => {
                    const {
                      assetStore: Ft
                    } = await Promise.resolve().then(() => Ri);
                    return {
                      assetStore: Ft
                    };
                  }, void 0, import.meta.url),
                  It = await it.getAssetBlob(De);
                It && (ze = URL.createObjectURL(It), It.type.startsWith("video/") ? Le = "video" : It.type.startsWith("audio/") && (Le = "audio"));
              }
            }
            if (ze === nt) {
              const Ve = await fetch(nt);
              if (Ve.ok) {
                const it = await Ve.blob();
                ze = URL.createObjectURL(it), it.type.startsWith("video/") ? Le = "video" : it.type.startsWith("audio/") && (Le = "audio");
              }
            }
            if (ze === nt && Er.isContentRef(nt)) try {
              await Er.init();
              const Ve = Er.extractId(nt),
                it = await Er.get(Ve);
              it && (ze = it);
            } catch {}
          } catch (Ve) {
            console.warn("[PreviewContextMenu] 获取原图失败:", Ve);
          }
          if (Le === "image" && ae && "previewType" in ae) {
            const Ve = ae.previewType;
            Ve === "video" ? Le = "video" : Ve === "audio" && (Le = "audio");
          }
          console.log("[PreviewContextMenu] Creating node with mediaType:", Le);
          const {
              width: Ye,
              height: Ce
            } = $2e(Le),
            He = Yzn();
          $e.push({
            id: m(),
            type: He,
            x: ke + rt % _e * (Te + me),
            y: ve + Math.floor(rt / _e) * (Ne + Ae),
            width: Ye,
            height: Ce,
            content: ze,
            prompt: "",
            settings: {
              mediaType: Le,
              _blobUrl: ze
            }
          });
        }
        h(rt => [...rt, ...$e]), q();
      },
      ce = async () => {
        const ie = t.item;
        if (!ie) return;
        const ae = ie.type === "video" ? "video" : ie.type === "audio" ? "audio" : "image",
          be = ae === "video" ? "mp4" : ae === "audio" ? "mp3" : "png",
          Ee = ae === "image" && (await K(ie)) || ie.url;
        I == null || I({
          url: Ee,
          name: `preview-${Date.now()}.${be}`,
          type: ae,
          assetId: zfe(ie.sourceNode)
        }), q();
      },
      we = async () => {
        const ie = t.item;
        if (q(), !!ie) try {
          const {
              pickNodeLocalAssetId: ae,
              revealLocalAssetInExplorer: be
            } = await Ie(async () => {
              const {
                pickNodeLocalAssetId: xe,
                revealLocalAssetInExplorer: he
              } = await Promise.resolve().then(() => gEn);
              return {
                pickNodeLocalAssetId: xe,
                revealLocalAssetInExplorer: he
              };
            }, void 0, import.meta.url),
            Ee = String(ie._assetId || "").trim() || ae(ie.sourceNode);
          await be({
            assetId: Ee
          });
        } catch (ae) {
          S == null || S(ae instanceof Error ? ae.message : "无法在文件夹中显示");
        }
      },
      X = `w-full text-left px-2.5 py-1.5 text-xs flex items-center gap-1.5 transition-colors ${a ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
      Z = a ? "text-zinc-400" : "text-zinc-700";
    return c.jsxs(c.Fragment, {
      children: [t.visible && c.jsxs("div", {
        className: `fixed z-[110] w-44 rounded-lg shadow-none py-0.5 animate-in fade-in duration-100 border ${a ? "bg-[#18181b] border-zinc-700" : "bg-white border-zinc-200"}`,
        style: {
          left: t.x,
          top: t.y
        },
        onMouseEnter: de,
        onMouseLeave: ne,
        children: [c.jsxs("button", {
          className: X,
          onClick: le,
          children: [c.jsx(qv, {
            size: 13,
            className: Z
          }), x(" 发送到当前对话")]
        }), c.jsxs("button", {
          className: X,
          onClick: ce,
          children: [c.jsx(lo, {
            size: 13,
            className: Z
          }), x(" 保存到素材库")]
        }), c.jsxs("button", {
          className: X,
          onClick: () => void we(),
          children: [c.jsx(Sc, {
            size: 13,
            className: Z
          }), x(" 在文件夹中显示")]
        }), c.jsxs("button", {
          className: X,
          onClick: pe,
          children: [c.jsx(v5e, {
            size: 13,
            className: Z
          }), (re = t.item) != null && re.selectedUrls && t.item.selectedUrls.length > 1 ? x("发送到画布 ({0}张)", t.item.selectedUrls.length) : x("发送到画布")]
        }), ((fe = t.item) == null ? void 0 : fe.type) !== "video" && c.jsxs("button", {
          className: X,
          onClick: J,
          children: [c.jsx(AT, {
            size: 13,
            className: Z
          }), x(" 缩图")]
        }), c.jsxs("button", {
          className: X,
          onClick: L,
          children: [c.jsx(lo, {
            size: 13,
            className: Z
          }), x(" 发送到Eagle端")]
        }), ((ye = t.item) == null ? void 0 : ye.type) === "video" && c.jsxs(c.Fragment, {
          children: [c.jsx("div", {
            className: `h-px my-0.5 ${a ? "bg-zinc-700" : "bg-zinc-200"}`
          }), c.jsxs("button", {
            className: X,
            onClick: U,
            children: [c.jsx(kf, {
              size: 13,
              className: Z
            }), x(" 提取首尾帧")]
          }), c.jsxs("button", {
            className: X,
            onClick: H,
            children: [c.jsx(kf, {
              size: 13,
              className: Z
            }), x(" 提取当前帧")]
          })]
        })]
      }), R && c.jsx(QFt, {
        isOpen: !0,
        onClose: () => j(null),
        imageUrl: R.imageUrl,
        isDark: a,
        nodes: i,
        sourceNode: R.sourceNode,
        onConfirm: Y
      }), B && y && c.jsx(iAe, {
        documentSession: e,
        isOpen: !0,
        onClose: () => {
          M(B.sourceNode), F(null);
        },
        imageUrl: B.imageUrl,
        isDark: a,
        sourceNode: B.sourceNode,
        nodes: i,
        view: o,
        canvasPortalEl: s,
        runExpandImage: y,
        imageConfigs: b,
        showHuyaModels: v,
        onStartGenerate: Q,
        onError: ie => S == null ? void 0 : S(ie.message || "扩图失败")
      })]
    });
  },
  fNi = ({
    historyContextMenu: e,
    setHistoryContextMenu: t,
    isDark: n,
    nodes: r,
    view: a,
    activeShot: i,
    canvasRef: o,
    setChatFiles: s,
    setIsChatOpen: l,
    setNodes: d,
    updateShot: u,
    generateId: h,
    splitImageToShots: p,
    isTauri: m = !1,
    toastSuccess: f,
    toastError: y,
    onSaveToMaterialLibrary: b
  }) => {
    on();
    const [v, _] = g.useState(!1),
      w = g.useRef(null),
      k = g.useRef(null),
      A = () => {
        t({
          visible: !1,
          x: 0,
          y: 0,
          worldX: 0,
          worldY: 0,
          item: null
        }), _(!1), w.current && (clearTimeout(w.current), w.current = null), k.current && (clearTimeout(k.current), k.current = null);
      },
      S = () => {
        w.current = setTimeout(() => {
          A();
        }, 80);
      },
      C = () => {
        w.current && (clearTimeout(w.current), w.current = null);
      };
    if (g.useEffect(() => () => {
      w.current && clearTimeout(w.current), k.current && clearTimeout(k.current);
    }, []), !e.visible) return null;
    const I = `relative z-[1] w-full text-left px-2.5 py-1.5 text-xs flex items-center gap-1.5 ${n ? "text-zinc-300" : "text-zinc-700"}`,
      E = z => n ? "text-zinc-400" : "text-zinc-700",
      M = async () => {
        const z = e.item;
        if (!z) return;
        const V = String(z._assetId || z.id || "").trim() || void 0,
          O = String(z.url || "").trim();
        if (!O && !V) {
          console.warn("[HistoryContextMenu] 发送到对话失败：无 url 且无 assetId"), A();
          return;
        }
        const L = z.type === "image",
          D = z.type === "video",
          U = L ? "png" : D ? "mp4" : "file",
          H = L ? "image/png" : D ? "video/mp4" : "application/octet-stream",
          Y = `Generated-${z.id}.${U}`,
          K = `hist_${z.id}_${Date.now()}`,
          W = String(z.thumbnailUrl || z._ossThumbnailUrl || "").trim() || void 0,
          Q = Bd(z) || void 0;
        l(!0), A(), W && (L || D) && !W.startsWith("blob:") && s(le => [...le, {
          name: Y,
          displayName: Y,
          type: H,
          preview: W,
          isImage: L,
          isVideo: D,
          ...(Q ? {
            _ossRemoteUrl: Q
          } : {}),
          _pendingToken: K,
          fromHistory: !0
        }]);
        let q = O,
          ne;
        if (q && Er.isContentRef(q)) try {
          await Er.init();
          const le = Er.extractId(q),
            J = await Er.get(le);
          J && (q = J);
        } catch (le) {
          console.error("[HistoryContextMenu] content_ref 解析失败:", le);
        }
        let de = !1;
        if (V) try {
          const {
            isCanvasLocalCacheMode: le
          } = await Ie(async () => {
            const {
              isCanvasLocalCacheMode: J
            } = await Promise.resolve().then(() => So);
            return {
              isCanvasLocalCacheMode: J
            };
          }, void 0, import.meta.url);
          de = le();
        } catch {
          de = !1;
        }
        if (!de && q.startsWith("blob:")) try {
          ne = await (await fetch(q)).blob();
        } catch {
          if (V) try {
            const {
              assetStore: le
            } = await Ie(async () => {
              const {
                assetStore: J
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: J
              };
            }, void 0, import.meta.url);
            ne = (await le.getAssetBlob(V)) || void 0;
          } catch (le) {
            console.warn("[HistoryContextMenu] assetStore 恢复失败:", le);
          }
        }
        try {
          const {
              buildChatComposerMediaFromUrl: le
            } = await Ie(async () => {
              const {
                buildChatComposerMediaFromUrl: pe
              } = await Promise.resolve().then(() => MD);
              return {
                buildChatComposerMediaFromUrl: pe
              };
            }, void 0, import.meta.url),
            J = await le({
              sourceUrl: de ? void 0 : q || void 0,
              sourceBlob: ne,
              assetId: V,
              preferOriginal: !0,
              seededPreview: W,
              ossRemoteUrl: Q,
              name: Y,
              isImage: L,
              isVideo: D,
              mimeType: H,
              index: Date.now() % 1e5
            });
          if (!J) {
            console.error("[HistoryContextMenu] 发送到对话失败：媒体落盘失败"), s(pe => pe.filter(ce => ce._pendingToken !== K));
            return;
          }
          s(pe => {
            const ce = pe.findIndex(X => X._pendingToken === K),
              we = {
                ...J,
                fromHistory: !0
              };
            if (ce >= 0) {
              const X = [...pe];
              return X[ce] = we, X;
            }
            return [...pe, we];
          });
        } catch (le) {
          console.error("[HistoryContextMenu] 发送到对话失败:", le), s(J => J.filter(pe => pe._pendingToken !== K));
        }
      },
      T = async z => {
        const V = Bd(z);
        if (V) return V;
        const O = z.url || z.audioUrl || "";
        if (z.type === "audio" && z._audioAssetId) try {
          const {
              assetStore: Y
            } = await Ie(async () => {
              const {
                assetStore: W
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: W
              };
            }, void 0, import.meta.url),
            K = await Y.getAssetUrl(z._audioAssetId);
          if (K) return K;
        } catch {}
        const L = z.type === "video" && z.url && (z.url.includes("prod-ss-vidu") || z.url.includes("prod-sa-vidu") || z.url.includes("amazonaws") && z.url.includes("vidu")),
          D = L && z.url ? `${z.id}_vidu_${(z.url.split("/").pop() || z.url).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 36) || Date.now()}` : null,
          U = [z._assetId, D].filter(Boolean);
        L || U.push(z.id);
        for (const Y of U) try {
          const {
              assetStore: K
            } = await Ie(async () => {
              const {
                assetStore: Q
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: Q
              };
            }, void 0, import.meta.url),
            W = await K.getAssetUrl(Y);
          if (W) return W;
        } catch {}
        if (!L) {
          const Y = z.id;
          if (Y) try {
            const {
                assetStore: K
              } = await Ie(async () => {
                const {
                  assetStore: Q
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: Q
                };
              }, void 0, import.meta.url),
              W = await K.getAssetUrl(Y);
            if (W) return W;
          } catch {}
        }
        const H = z._mjAssetIds;
        if (z.mjImages && (H != null && H.length) && z.mjImages.length > 0) {
          const Y = z.selectedMjImageIndex ?? 0,
            K = H[Y] ?? H[0];
          if (K) try {
            const {
                assetStore: W
              } = await Ie(async () => {
                const {
                  assetStore: q
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: q
                };
              }, void 0, import.meta.url),
              Q = await W.getAssetUrl(K);
            if (Q) return Q;
          } catch {}
        }
        if (z.mjImages && z.mjImages.length > 1) {
          const Y = z.selectedMjImageIndex ?? 0;
          return z.mjImages[Y] || z.mjImages[0] || O;
        }
        return O;
      },
      P = async z => new Promise((V, O) => {
        const L = new FileReader();
        L.onload = () => V(L.result), L.onerror = O, L.readAsDataURL(z);
      }),
      R = (z, V) => {
        var U, H;
        const O = (H = (U = z.match(/^data:([^;,]+)/i)) == null ? void 0 : U[1]) == null ? void 0 : H.toLowerCase();
        if (O) {
          if (O === "image/jpeg" || O === "image/jpg") return "jpg";
          if (O === "image/png") return "png";
          if (O === "image/webp") return "webp";
          if (O === "image/gif") return "gif";
          if (O === "image/bmp") return "bmp";
          if (O.startsWith("video/")) return O.includes("webm") ? "webm" : O.includes("quicktime") ? "mov" : "mp4";
          const Y = O.split("/")[1];
          if (Y) return Y.replace(/[^a-z0-9]+/gi, "") || V;
        }
        const D = (z.split("?")[0] || "").match(/\.([a-z0-9]{2,5})$/i);
        if (D) {
          const Y = D[1].toLowerCase();
          return Y === "jpeg" ? "jpg" : Y;
        }
        return V;
      },
      j = async z => {
        if (z.startsWith("data:")) return z;
        const V = await fetch(z);
        if (!V.ok) throw new Error(`无法加载: ${V.status}`);
        const O = await V.blob();
        return P(O);
      },
      B = async (z, V) => {
        if (z.startsWith("data:")) return z;
        const O = String(V || "").trim();
        if (O) try {
          const {
              assetStore: U
            } = await Ie(async () => {
              const {
                assetStore: Y
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: Y
              };
            }, void 0, import.meta.url),
            H = await U.getAssetBlob(O);
          if (H) return await P(H);
        } catch {}
        const {
          isTauriAssetProtocolUrl: L
        } = await Ie(async () => {
          const {
            isTauriAssetProtocolUrl: U
          } = await Promise.resolve().then(() => So);
          return {
            isTauriAssetProtocolUrl: U
          };
        }, void 0, import.meta.url);
        return z.startsWith("blob:") || L(z) || z.startsWith("/") && !z.startsWith("http") || !/^https?:\/\//i.test(z) ? j(z) : z;
      },
      F = async () => {
        var O;
        const z = e.item;
        if (!z) return;
        const V = String(z._assetId || z.id || "").trim() || void 0;
        if (!z.url && !((O = z.mjImages) != null && O.length) && !V) {
          y == null || y("无法解析素材地址"), A();
          return;
        }
        if (!f || !y) {
          y == null || y("未配置 Toast");
          return;
        }
        try {
          if (!(await vCe())) {
            y("请先启动 Eagle 应用"), A();
            return;
          }
          const D = [];
          if (z.mjImages && z.mjImages.length > 0) {
            const Y = z._mjAssetIds,
              K = z.selectedMjImageIndex ?? 0;
            if (Y != null && Y.length) {
              const {
                assetStore: W
              } = await Ie(async () => {
                const {
                  assetStore: Q
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: Q
                };
              }, void 0, import.meta.url);
              for (let Q = 0; Q < z.mjImages.length; Q++) try {
                const q = Y[Q] ?? Y[0],
                  ne = await W.getAssetBlob(q);
                if (ne) {
                  D.push({
                    url: await P(ne),
                    assetId: q
                  });
                  continue;
                }
                const de = await W.getAssetUrl(q);
                de && D.push({
                  url: de,
                  assetId: q
                });
              } catch {}
            }
            if (!D.length) {
              const W = Math.min(K, z.mjImages.length - 1),
                Q = z.mjImages[W] || z.mjImages[0];
              Q && D.push({
                url: Q
              });
            }
          } else {
            if (V) try {
              const {
                  assetStore: Y
                } = await Ie(async () => {
                  const {
                    assetStore: W
                  } = await Promise.resolve().then(() => Ri);
                  return {
                    assetStore: W
                  };
                }, void 0, import.meta.url),
                K = await Y.getAssetBlob(V);
              K && D.push({
                url: await P(K),
                assetId: V
              });
            } catch {}
            if (!D.length) {
              const Y = await T(z);
              Y && D.push({
                url: Y,
                assetId: V
              });
            }
          }
          if (!D.length) {
            y("无法解析素材地址（请确认本地缓存有效）"), A();
            return;
          }
          const U = (z.prompt || z.positivePrompt || "").trim() || void 0,
            H = await Promise.all(D.map(async (Y, K) => {
              const W = await B(Y.url, Y.assetId),
                Q = z.type === "video" ? "mp4" : "jpg",
                q = R(W, Q),
                ne = `Generated-${z.id}${D.length > 1 ? `-${K + 1}` : ""}.${q}`;
              return {
                url: W,
                name: ne,
                annotation: U
              };
            }));
          await PXe(H), f(`已发送 ${H.length} 个素材到 Eagle`);
        } catch (L) {
          y(L instanceof Error ? L.message : "发送到 Eagle 失败");
        }
        A();
      },
      N = async () => {
        const z = e.item;
        if (!z) return;
        const V = await T(z);
        if (!V) return;
        const O = z.type === "video" ? "mp4" : z.type === "audio" ? "mp3" : "png",
          L = z._assetId,
          D = Bd(z),
          U = z._ossThumbnailUrl && String(z._ossThumbnailUrl) || z.thumbnailUrl && String(z.thumbnailUrl) || void 0;
        b == null || b({
          url: V,
          originalUrl: D || void 0,
          thumbnailUrl: U,
          name: `history-${z.id}.${O}`,
          type: z.type || "file",
          assetId: L
        }), A();
      },
      G = c.jsxs("div", {
        className: `history-ctx-menu fixed z-[10150] w-44 rounded-lg shadow-2xl py-0.5 sketch-menu-enter-at-cursor border ${n ? "history-ctx-menu-dark bg-[#18181b] border-zinc-700" : "bg-white border-zinc-200"}`,
        style: {
          left: e.x,
          top: e.y
        },
        onClick: z => z.stopPropagation(),
        onMouseEnter: C,
        onMouseLeave: S,
        children: [c.jsx("div", {
          className: "history-ctx-menu-hl"
        }), c.jsxs("button", {
          className: I,
          onClick: M,
          children: [c.jsx(qv, {
            size: 13,
            className: E()
          }), x(" 发送到当前对话")]
        }), c.jsxs("button", {
          className: I,
          onClick: F,
          children: [c.jsx(lo, {
            size: 13,
            className: E()
          }), x(" 发送到Eagle端")]
        }), c.jsxs("button", {
          className: I,
          onClick: N,
          children: [c.jsx(v5e, {
            size: 13,
            className: E()
          }), x(" 保存到素材库")]
        })]
      });
    return typeof document > "u" ? G : Da.createPortal(G, document.body);
  },
  gNi = ({
    view: e,
    canvasPortalEl: t,
    inputImageContextMenu: n,
    setInputImageContextMenu: r,
    setCroppingNodeId: a,
    isDark: i,
    nodes: o,
    selectedNodeIds: s,
    setChatFiles: l,
    setIsChatOpen: d,
    setNodes: u,
    setConnections: h,
    generateId: p,
    splitImageToShots: m,
    setHistory: f,
    setLightboxItem: y,
    setLightboxOpen: b,
    toastError: v,
    toastSuccess: _,
    onSaveToMaterialLibrary: w
  }) => {
    var L;
    on();
    const k = g.useRef(null),
      A = g.useRef(null),
      S = () => {
        r({
          visible: !1,
          x: 0,
          y: 0,
          nodeId: null
        }), A.current && (clearTimeout(A.current), A.current = null);
      },
      C = () => {
        A.current && (clearTimeout(A.current), A.current = null), A.current = setTimeout(() => {
          S();
        }, 120);
      },
      I = () => {
        A.current && (clearTimeout(A.current), A.current = null);
      },
      E = D => {
        var U;
        return D instanceof Node ? ((U = k.current) == null ? void 0 : U.contains(D)) ?? !1 : !1;
      };
    g.useEffect(() => {
      if (!n.visible) return;
      const D = () => {
          A.current && (clearTimeout(A.current), A.current = null), A.current = setTimeout(() => {
            S();
          }, 100);
        },
        U = Y => {
          if (E(Y.target)) {
            A.current && (clearTimeout(A.current), A.current = null);
            return;
          }
          D();
        },
        H = Y => {
          E(Y.target) || S();
        };
      return window.addEventListener("pointermove", U, !0), window.addEventListener("pointerdown", H, !0), () => {
        window.removeEventListener("pointermove", U, !0), window.removeEventListener("pointerdown", H, !0), A.current && clearTimeout(A.current);
      };
    }, [n.visible]);
    const M = async () => {
        const D = n.nodeId,
          U = o.find(H => H.id === D);
        if (U != null && U.content) {
          const H = U.content.includes("video") || U.content.includes(".mp4"),
            Y = !H,
            K = Y ? "png" : "mp4",
            W = Y ? "image/png" : "video/mp4",
            Q = `InputImage-${Date.now()}.${K}`,
            q = `input_${D}_${Date.now()}`;
          let ne = U.content;
          if (Er.isContentRef(ne)) try {
            await Er.init();
            const de = Er.extractId(ne),
              le = await Er.get(de);
            le && (ne = le);
          } catch (de) {
            console.error("[InputImageContextMenu] content_ref 解析失败:", de);
          }
          try {
            const {
                collectInputImageOssOriginalCandidates: de,
                getInputImageOssRemoteUrl: le,
                getInputImagePrimaryAssetId: J,
                getInputImageDisplayUrl: pe,
                isGlobalOssUrlOnlyNode: ce,
                isOssPublicHttpUrl: we
              } = await Ie(async () => {
                const {
                  collectInputImageOssOriginalCandidates: xe,
                  getInputImageOssRemoteUrl: he,
                  getInputImagePrimaryAssetId: ue,
                  getInputImageDisplayUrl: ge,
                  isGlobalOssUrlOnlyNode: _e,
                  isOssPublicHttpUrl: ke
                } = await Promise.resolve().then(() => ii);
                return {
                  collectInputImageOssOriginalCandidates: xe,
                  getInputImageOssRemoteUrl: he,
                  getInputImagePrimaryAssetId: ue,
                  getInputImageDisplayUrl: ge,
                  isGlobalOssUrlOnlyNode: _e,
                  isOssPublicHttpUrl: ke
                };
              }, void 0, import.meta.url),
              {
                buildChatComposerMediaFromUrl: X,
                acceptChatListDisplayUrl: Z
              } = await Ie(async () => {
                const {
                  buildChatComposerMediaFromUrl: xe,
                  acceptChatListDisplayUrl: he
                } = await Promise.resolve().then(() => MD);
                return {
                  buildChatComposerMediaFromUrl: xe,
                  acceptChatListDisplayUrl: he
                };
              }, void 0, import.meta.url),
              re = de(U)[0] || le(U) || "",
              fe = pe(U),
              ie = !!re || ce(U) || we(fe) ? "" : J(U) || "",
              ae = re || fe || ne,
              be = Z(fe) || void 0;
            d(!0), S(), be && (Y || H) && l(xe => [...xe, {
              name: Q,
              displayName: Q,
              type: W,
              preview: be,
              isImage: Y,
              isVideo: H,
              _pendingToken: q
            }]);
            const Ee = await X({
              sourceUrl: ae,
              assetId: ie || void 0,
              seededPreview: be,
              name: Q,
              isImage: Y,
              isVideo: H,
              mimeType: W,
              index: Date.now() % 1e5,
              ossRemoteUrl: re || void 0
            });
            if (!Ee) {
              console.error("[InputImageContextMenu] 发送到对话失败：媒体落盘失败"), l(xe => xe.filter(he => he._pendingToken !== q));
              return;
            }
            l(xe => {
              const he = xe.findIndex(ge => ge._pendingToken === q),
                ue = Ee;
              if (he >= 0) {
                const ge = [...xe];
                return ge[he] = ue, ge;
              }
              return [...xe, ue];
            });
          } catch (de) {
            console.error("[InputImageContextMenu] 发送到对话失败:", de), l(le => le.filter(J => J._pendingToken !== q));
          }
          return;
        }
        S();
      },
      T = async (D, U) => {
        const H = D.type || U || "image/png";
        return new Promise((Y, K) => {
          try {
            const W = new FileReader();
            W.onload = () => Y(W.result), W.onerror = () => K(new Error("读取 Blob 为 data URL 失败")), W.readAsDataURL(D);
          } catch {
            K(new Error(`无法读取 Blob: ${H}`));
          }
        });
      },
      P = async D => {
        if (D.startsWith("data:")) return D;
        const U = await fetch(D);
        if (!U.ok) throw new Error(`无法加载: ${U.status}`);
        const H = await U.blob();
        return T(H, H.type);
      },
      R = async () => {
        var H, Y, K;
        const D = n.nodeId,
          U = o.find(W => W.id === D);
        if (!U || U.type !== "input-image" || typeof U.content != "string") {
          S();
          return;
        }
        try {
          if (!(await vCe())) {
            v == null || v("请先启动 Eagle 应用");
            return;
          }
          let Q = U.content;
          if (Er.isContentRef(Q)) {
            await Er.init();
            const we = Er.extractId(Q),
              X = await Er.get(we);
            X && (Q = X);
          }
          const q = (H = U.settings) == null ? void 0 : H._assetId;
          if (q) {
            const we = await ni.getAssetBlob(q);
            we && (Q = await T(we));
          }
          if (!Q.startsWith("data:")) {
            const {
              isTauriAssetProtocolUrl: we
            } = await Ie(async () => {
              const {
                isTauriAssetProtocolUrl: Z
              } = await Promise.resolve().then(() => So);
              return {
                isTauriAssetProtocolUrl: Z
              };
            }, void 0, import.meta.url);
            /^https?:\/\//i.test(Q) && !we(Q) || (Q = await P(Q));
          }
          const ne = V,
            de = ((K = (Y = Q.match(/^data:([^;,]+)/i)) == null ? void 0 : Y[1]) == null ? void 0 : K.toLowerCase()) || "";
          let le = ne ? "mp4" : "jpg";
          de === "image/jpeg" || de === "image/jpg" ? le = "jpg" : de === "image/png" ? le = "png" : de === "image/webp" ? le = "webp" : de === "image/gif" ? le = "gif" : de.startsWith("video/") && (le = de.includes("webm") ? "webm" : "mp4");
          const pe = `${(U.nodeName || "Media").trim().replace(/[\\/:*?"<>|]+/g, "_") || "Media"}-${Date.now()}.${le}`,
            ce = (U.prompt || "").trim() || void 0;
          await PXe([{
            url: Q,
            name: pe,
            annotation: ce
          }]), S();
        } catch (W) {
          const Q = W instanceof Error ? W.message : String(W);
          v == null || v(Q), console.warn("[InputImageContextMenu] send to Eagle failed:", W), S();
        }
      },
      j = async () => {
        const D = n.nodeId,
          U = o.find(K => K.id === D);
        if (!U || U.type !== "input-image" || typeof U.content != "string") {
          S();
          return;
        }
        const H = U.content;
        if (H.includes("video") || H.includes(".mp4")) {
          v == null || v("仅支持图片，不支持视频"), S();
          return;
        }
        try {
          const {
              url: K,
              width: W,
              height: Q
            } = await Ix(H),
            q = U.x + U.width + 24,
            ne = U.y,
            de = W / Q,
            le = 260,
            J = 80;
          let pe = de >= 1 ? Math.min(le, W) : Math.min(le * de, W),
            ce = de >= 1 ? Math.min(le / de, Q) : Math.min(le, Q);
          if (pe < J || ce < J) {
            const X = Math.max(J / pe, J / ce);
            pe = Math.round(pe * X), ce = Math.round(ce * X);
          }
          const we = {
            id: p(),
            type: "input-image",
            x: q,
            y: ne,
            width: pe,
            height: ce,
            content: K,
            prompt: "",
            settings: {
              hasCustomSize: !0,
              imageSize: `${W}×${Q}`,
              dimensions: {
                w: W,
                h: Q
              }
            }
          };
          u(X => [...X, we]);
        } catch (K) {
          console.error("[InputImageContextMenu] 创建缩图失败:", K), v == null || v(K instanceof Error ? K.message : "创建缩图失败");
        }
        S();
      },
      B = async () => {
        const D = o.find(U => U.id === n.nodeId);
        if (S(), !!D) try {
          const {
            pickNodeLocalAssetId: U,
            revealLocalAssetInExplorer: H
          } = await Ie(async () => {
            const {
              pickNodeLocalAssetId: Y,
              revealLocalAssetInExplorer: K
            } = await Promise.resolve().then(() => gEn);
            return {
              pickNodeLocalAssetId: Y,
              revealLocalAssetInExplorer: K
            };
          }, void 0, import.meta.url);
          await H({
            assetId: U(D)
          });
        } catch (U) {
          v == null || v(U instanceof Error ? U.message : "无法在文件夹中显示");
        }
      },
      F = `w-full text-left px-2.5 py-1.5 text-xs flex items-center gap-1.5 transition-colors ${i ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
      N = i ? "text-zinc-400" : "text-zinc-700",
      G = n.nodeId ? o.find(D => D.id === n.nodeId) : void 0,
      V = ((L = G == null ? void 0 : G.settings) == null ? void 0 : L.mediaType) === "video" || typeof (G == null ? void 0 : G.content) == "string" && (G.content.includes("video") || /(\.mp4|\.webm|\.mov|\.mkv|\.avi)(\?|$)/i.test(G.content.split("?")[0] || "")),
      O = async () => {
        const D = n.nodeId,
          U = o.find(q => q.id === D);
        if (!U || U.type !== "input-image" || typeof U.content != "string") {
          S();
          return;
        }
        const H = U.settings || {},
          Y = H.mediaType || (V ? "video" : "image"),
          K = Y === "video" ? "mp4" : Y === "audio" ? "mp3" : "png";
        let W, Q;
        try {
          const {
              OSS_REMOTE_URL_SETTING_KEY: q,
              OSS_THUMBNAIL_URL_SETTING_KEY: ne,
              isOssPublicHttpUrl: de
            } = await Ie(async () => {
              const {
                OSS_REMOTE_URL_SETTING_KEY: pe,
                OSS_THUMBNAIL_URL_SETTING_KEY: ce,
                isOssPublicHttpUrl: we
              } = await Promise.resolve().then(() => ii);
              return {
                OSS_REMOTE_URL_SETTING_KEY: pe,
                OSS_THUMBNAIL_URL_SETTING_KEY: ce,
                isOssPublicHttpUrl: we
              };
            }, void 0, import.meta.url),
            le = String(H[q] || H._ossRemoteUrl || "").trim();
          le && de(le) && (W = le);
          const J = String(H[ne] || H._ossThumbnailUrl || "").trim();
          J && de(J) && (Q = J);
        } catch {}
        w == null || w({
          url: U.content,
          originalUrl: W,
          thumbnailUrl: Q,
          name: `${(U.nodeName || "node").replace(/[\\/:*?"<>|]+/g, "_")}.${K}`,
          type: Y,
          assetId: typeof H._assetId == "string" ? H._assetId : void 0
        }), S();
      };
    return c.jsx(c.Fragment, {
      children: n.visible && c.jsxs("div", {
        ref: k,
        className: `fixed z-[110] w-44 rounded-lg shadow-none py-0.5 animate-in fade-in duration-100 border ${i ? "bg-[#18181b] border-zinc-700" : "bg-white border-zinc-200"}`,
        style: {
          left: n.x,
          top: n.y
        },
        onMouseEnter: I,
        onMouseLeave: C,
        children: [c.jsxs("button", {
          className: F,
          onClick: M,
          children: [c.jsx(qv, {
            size: 13,
            className: N
          }), x(" 发送到当前对话")]
        }), c.jsxs("button", {
          className: F,
          onClick: R,
          children: [c.jsx(lo, {
            size: 13,
            className: N
          }), x(" 发送到Eagle端")]
        }), c.jsxs("button", {
          className: F,
          onClick: O,
          children: [c.jsx(lo, {
            size: 13,
            className: N
          }), x(" 保存到素材库")]
        }), c.jsxs("button", {
          className: F,
          onClick: () => void B(),
          children: [c.jsx(Sc, {
            size: 13,
            className: N
          }), x(" 在文件夹中显示")]
        }), !V && c.jsxs("button", {
          className: F,
          onClick: j,
          children: [c.jsx(AT, {
            size: 13,
            className: N
          }), x(" 缩图")]
        })]
      })
    });
  };

function yNi({
  documentSession: e,
  contextMenu: t,
  setContextMenu: n,
  isDark: r,
  addNode: a,
  nodes: i,
  cancelConnectingWireState: o,
  commonCreateMenuTypeIds: s,
  setActiveTool: l,
  openDirector3DDetached: d,
  setCommonCreateMenuTypeIds: u,
  previewContextMenu: h,
  setPreviewContextMenu: p,
  setCroppingNodeId: m,
  view: f,
  canvasPortalEl: y,
  selectedNodeIds: b,
  setChatFiles: v,
  setIsChatOpen: _,
  setNodes: w,
  setConnections: k,
  generateId: A,
  splitImageToShots: S,
  runExpandImage: C,
  visibleImageConfigs: I,
  expandImageConfigs: E,
  showHuyaModels: M,
  history: T,
  setHistory: P,
  setLightboxItem: R,
  setLightboxOpen: j,
  toastError: B,
  toastSuccess: F,
  openSaveToMaterialLibrary: N,
  inputImageContextMenu: G,
  setInputImageContextMenu: z,
  historyContextMenu: V,
  setHistoryContextMenu: O,
  activeShot: L,
  canvasRef: D,
  updateShot: U,
  frameContextMenu: H,
  setFrameContextMenu: Y,
  updateNode: K
}) {
  const [W, Q] = g.useState(!1);
  return c.jsxs(c.Fragment, {
    children: [c.jsx(_Ri, {
      contextMenu: t,
      setContextMenu: n,
      isDark: r,
      view: f,
      addNode: a,
      nodes: i,
      compactMenuTypeOrder: s,
      onDismissConnectionWire: o,
      onOpenDirector3D: () => {
        l("select"), d();
      },
      onOpenNodeCustomization: () => {
        n(q => ({
          ...q,
          visible: !1
        })), o == null || o(), Q(!0);
      }
    }), c.jsx(Zf, {
      show: W,
      children: c.jsx($Lr, {
        isOpen: W,
        onClose: () => Q(!1),
        isDark: r,
        commonNodeTypeIds: s,
        onSaved: q => u(q)
      })
    }), c.jsx(mNi, {
      documentSession: e,
      previewContextMenu: h,
      setPreviewContextMenu: p,
      setCroppingNodeId: m,
      isDark: r,
      nodes: i,
      view: f,
      canvasPortalEl: y,
      selectedNodeIds: b,
      setChatFiles: v,
      setIsChatOpen: _,
      setNodes: w,
      setConnections: k,
      generateId: A,
      splitImageToShots: S,
      runExpandImage: C,
      imageConfigs: E != null && E.length ? E : I,
      showHuyaModels: M,
      history: T,
      setHistory: P,
      setLightboxItem: R,
      setLightboxOpen: j,
      toastError: B,
      toastSuccess: F,
      onSaveToMaterialLibrary: N
    }), c.jsx(gNi, {
      inputImageContextMenu: G,
      setInputImageContextMenu: z,
      setCroppingNodeId: m,
      isDark: r,
      nodes: i,
      selectedNodeIds: b,
      setChatFiles: v,
      setIsChatOpen: _,
      view: f,
      canvasPortalEl: y,
      setNodes: w,
      setConnections: k,
      generateId: A,
      splitImageToShots: S,
      setHistory: P,
      setLightboxItem: R,
      setLightboxOpen: j,
      toastError: B,
      toastSuccess: F,
      onSaveToMaterialLibrary: N
    }), c.jsx(fNi, {
      historyContextMenu: V,
      setHistoryContextMenu: O,
      isDark: r,
      nodes: i,
      view: f,
      activeShot: L,
      canvasRef: D,
      setChatFiles: v,
      setIsChatOpen: _,
      setNodes: w,
      updateShot: U,
      generateId: A,
      splitImageToShots: S,
      toastSuccess: F,
      toastError: B,
      onSaveToMaterialLibrary: N
    }), c.jsx(kRi, {
      frameContextMenu: H,
      setFrameContextMenu: Y,
      isDark: r,
      nodes: i,
      view: f,
      canvasRef: D,
      setChatFiles: v,
      setIsChatOpen: _,
      setNodes: w,
      updateNode: K,
      generateId: A
    })]
  });
}

const bNi = g.memo(yNi);

function vNi(e) {
  return {
    documentSession: e.documentSession,
    isDark: e.isDark,
    nodes: e.nodes,
    view: e.view,
    selectedNodeIds: e.selectedNodeIds,
    history: e.history,
    setHistory: e.setHistory,
    setNodes: e.setNodes,
    setConnections: e.setConnections,
    generateId: e.generateId,
    toastError: e.toastError,
    toastSuccess: e.toastSuccess,
    canvasRef: e.canvasRef,
    setLightboxItem: e.setLightboxItem,
    setLightboxOpen: e.setLightboxOpen,
    contextMenu: e.contextMenu,
    setContextMenu: e.setContextMenu,
    addNode: e.addNode,
    cancelConnectingWireState: e.cancelConnectingWireState,
    commonCreateMenuTypeIds: e.commonCreateMenuTypeIds,
    setCommonCreateMenuTypeIds: e.setCommonCreateMenuTypeIds,
    setActiveTool: e.setActiveTool,
    openDirector3DDetached: e.openDirector3DDetached,
    previewContextMenu: e.previewContextMenu,
    setPreviewContextMenu: e.setPreviewContextMenu,
    setCroppingNodeId: e.setCroppingNodeId,
    setIsChatOpen: e.setIsChatOpen,
    splitImageToShots: e.splitImageToShots,
    runExpandImage: e.runExpandImage,
    visibleImageConfigs: e.visibleImageConfigs,
    expandImageConfigs: e.expandImageConfigs,
    openSaveToMaterialLibrary: e.openSaveToMaterialLibrary,
    inputImageContextMenu: e.inputImageContextMenu,
    setInputImageContextMenu: e.setInputImageContextMenu,
    historyContextMenu: e.historyContextMenu,
    setHistoryContextMenu: e.setHistoryContextMenu,
    activeShot: e.activeShot,
    updateShot: e.updateShot,
    frameContextMenu: e.frameContextMenu,
    setFrameContextMenu: e.setFrameContextMenu,
    updateNode: e.updateNode,
    canvasPortalEl: e.canvasPortalEl,
    setChatFiles: e.setChatFiles,
    showHuyaModels: e.showHuyaModels
  };
}

function wNi({
  isDark: e
}) {
  on();
  const [t, n] = g.useState(null),
    [r, a] = g.useState(""),
    [i, o] = g.useState("");
  g.useEffect(() => (vQt(d => {
    a(""), o(""), n(d);
  }), () => vQt(null)), []);
  const s = g.useCallback(d => {
      t == null || t.resolve(d), n(null), a(""), o("");
    }, [t]),
    l = g.useCallback(() => {
      const d = r.trim();
      if (!d) {
        o("请输入公网视频 URL");
        return;
      }
      if (!/^https?:\/\//i.test(d)) {
        o("请以 http:// 或 https:// 开头");
        return;
      }
      s(d);
    }, [r, s]);
  return t ? c.jsx("div", {
    className: "fixed inset-0 z-[20000] flex items-center justify-center bg-black/55 p-4",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "seedance-video-fallback-title",
    onClick: () => s(null),
    onKeyDown: d => {
      d.key === "Escape" && s(null);
    },
    children: c.jsxs("div", {
      className: `w-full max-w-lg rounded-xl border shadow-2xl p-4 space-y-3 ${e ? "bg-[#18181b] border-zinc-700 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"}`,
      onClick: d => d.stopPropagation(),
      children: [c.jsx("h3", {
        id: "seedance-video-fallback-title",
        className: "text-sm font-semibold",
        children: x("视频上传失败 · 使用公网直链")
      }), c.jsxs("p", {
        className: `text-xs leading-relaxed ${e ? "text-zinc-400" : "text-zinc-600"}`,
        children: [x("自动上传到当前 API（如 /v1/files）失败。请粘贴"), c.jsx("strong", {
          children: x("可直接下载")
        }), x("的 "), c.jsx("code", {
          className: "text-[11px]",
          children: "https://"
        }), " ", x("视频地址（建议 .mp4 / .mov）。Streamable 可填观看页（streamable.com/xxxx），将尝试解析为 CDN 直链。")]
      }), c.jsx("div", {
        className: `text-[10px] rounded-lg p-2 max-h-28 overflow-auto font-mono whitespace-pre-wrap break-all ${e ? "bg-zinc-900/80 text-zinc-400" : "bg-zinc-100 text-zinc-600"}`,
        children: t.errorMessage || x("（无详细错误）")
      }), c.jsxs("div", {
        children: [c.jsx("label", {
          className: `block text-[10px] uppercase tracking-wide mb-1 ${e ? "text-zinc-500" : "text-zinc-400"}`,
          children: x("公网视频 URL")
        }), c.jsx("input", {
          type: "url",
          value: r,
          onChange: d => {
            a(d.target.value), o("");
          },
          placeholder: x("https://…/video.mp4 或 https://streamable.com/xxxx"),
          className: `w-full px-3 py-2 text-xs rounded-lg border outline-none focus:border-blue-500 ${e ? "bg-zinc-900 border-zinc-600 text-zinc-100 placeholder-zinc-600" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"}`,
          autoFocus: !0
        }), i ? c.jsx("p", {
          className: "mt-1 text-[11px] text-red-500",
          children: i
        }) : null]
      }), c.jsxs("div", {
        className: "flex justify-end gap-2 pt-1",
        children: [c.jsx("button", {
          type: "button",
          onClick: () => s(null),
          className: `px-3 py-1.5 rounded-lg text-xs font-medium ${e ? "text-zinc-300 hover:bg-zinc-800 border border-zinc-600" : "text-zinc-700 hover:bg-zinc-100 border border-zinc-300"}`,
          children: x("取消")
        }), c.jsx("button", {
          type: "button",
          onClick: l,
          className: "px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-500",
          children: x("使用此链接继续")
        })]
      })]
    })
  }) : null;
}

function xNi(e) {
  const {
      isDark: t,
      nodes: n,
      closeDirector3D: r,
      director3DInitialScene: a,
      handleDirector3DSceneChange: i,
      director3DOpen: o,
      view: s,
      selectedNodeIds: l,
      setNodes: d,
      setConnections: u,
      history: h,
      setHistory: p,
      setLightboxItem: m,
      setLightboxOpen: f,
      toastError: y,
      toastSuccess: b,
      skillWorkflowSession: v,
      apiConfigs: _,
      chatModel: w,
      globalApiKey: k,
      handleSkillToWorkflowCreate: A,
      authMode: S,
      authenticate: C,
      showHuyaModelsInFeaturePanel: I,
      toggleHuyaModels: E,
      createCharacterOpen: M,
      setCreateCharacterOpen: T,
      setCharacterLibrary: P,
      createKlingSubjectOpen: R,
      setCreateKlingSubjectOpen: j,
      setChatModel: B,
      setKlingSubjectLibrary: F,
      klingSubjectLibrary: N,
      handleDirector3DScreenshotToCanvas: G,
      globalBaseUrl: z,
      activeEndpoint: V,
      apiTestProgress: O,
      apiStatus: L,
      showBaseUrl: D,
      isModelHiddenInList: U,
      setModelHiddenInList: H,
      showHiddenModelsInGenNodes: Y,
      setShowHiddenModelsInGenNodes: K,
      setGlobalApiKey: W,
      setGlobalBaseUrl: Q,
      applyGlobalBaseUrlFromPicker: q,
      jimengSuperResUrl: ne,
      jimengSuperResApiKey: de,
      setJimengSuperResUrl: le,
      setJimengSuperResApiKey: J,
      onTestJimengSuperResConnection: pe,
      updateConfig: ce,
      updateConfigs: we,
      testApiConnection: X,
      switchEndpoint: Z,
      getEndpoints: re,
      filterHuyaModels: fe,
      filterModels: ye,
      categorizedExportOpen: ie,
      projectImportDocument: ae,
      setCategorizedExportOpen: be,
      connections: Ee,
      groups: xe,
      canvasTextBoxes: he,
      canvasDoodleStrokes: ue,
      projectName: ge,
      chatSessions: _e,
      characterLibrary: ke,
      viewportSize: ve,
      setChatSessions: Te,
      setGroups: Ne,
      setView: me,
      setProjectName: Ae,
      setCanvasTextBoxes: Fe,
      setCanvasDoodleStrokes: Me,
      aiRoleLibraryOpen: Re,
      setAiRoleLibraryOpen: $e,
      aiRoleLibrary: rt,
      refreshMaterialLibraryAndSyncRoles: nt,
      materialLibrary: ze,
      handleApplyAiRoleToCanvas: Le,
      saveToMaterialLibraryOpen: Ke,
      setSaveToMaterialLibraryOpen: Xe,
      closeSaveToMaterialLibraryModal: De,
      handleConfirmSaveToMaterialLibrary: Ye
    } = e,
    Ce = rWe(),
    He = Oy(),
    [Ve, it] = g.useState(!1);
  g.useEffect(() => {
    Ce && it(!0);
  }, [Ce]);
  const It = gOr(),
    [Ft, We] = g.useState(null);
  return g.useEffect(() => {
    var Ze;
    Re && We(((Ze = e.canvasRef.current) == null ? void 0 : Ze.closest(".app-canvas-viewport")) ?? null);
  }, [Re, e.canvasRef]), g.useEffect(() => {
    KLr(), n6n();
  }, []), c.jsxs(c.Fragment, {
    children: [c.jsx(bNi, {
      ...vNi(e)
    }), c.jsx(B9i, {
      documentSession: e.documentSession,
      isDark: t,
      history: h,
      nodes: n,
      setHistory: p,
      setLightboxItem: m,
      setLightboxOpen: f,
      toastSuccess: b,
      toastError: y,
      onSendHistoryItemsToCanvas: e.onSendHistoryItemsToCanvas
    }), c.jsx(F9i, {
      session: v,
      isDark: t,
      apiConfigs: _,
      chatModel: w,
      globalApiKey: k,
      onCreateWorkflow: A,
      onError: y
    }), c.jsx(U9i, {
      isDark: t,
      authMode: S,
      authenticate: C,
      showHuyaModelsInFeaturePanel: I,
      toggleHuyaModels: E,
      toastSuccess: b
    }), c.jsx(Zf, {
      show: M,
      children: c.jsx(ZLr, {
        isOpen: M,
        onClose: () => T(!1),
        isDark: t,
        history: h,
        apiConfigs: _,
        globalApiKey: k,
        onSetCharacterLibrary: P
      })
    }), c.jsx(Zf, {
      show: R,
      children: c.jsx(eOr, {
        isOpen: R,
        onClose: () => j(!1),
        isDark: t,
        history: h,
        apiConfigs: _,
        globalApiKey: k,
        chatModel: w,
        onSetChatModel: B,
        onSetKlingSubjectLibrary: F,
        klingSubjectLibrary: N,
        onShowToast: (Ze, Ge) => {
          Ze === "success" ? b(Ge) : Ze === "error" || Ze === "warning" ? y(Ge) : Ze === "info" && b(Ge);
        }
      })
    }), c.jsx(wNi, {
      isDark: t
    }), c.jsx(Zf, {
      show: o,
      children: c.jsx(OLr, {
        isOpen: o,
        onClose: r,
        initialScene: a,
        initialSmartBuild: e.director3DSmartBuild,
        apiConfigs: _,
        chatModel: w,
        globalApiKey: k,
        onSceneChange: i,
        onSendScreenshotToCanvas: G
      })
    }), c.jsx(BLr, {
      nodes: n,
      setNodes: d,
      generateId: e.generateId,
      notifyCanvas: (Ze, Ge) => {
        Ge === "success" ? b(Ze) : y(Ze);
      }
    }), c.jsx(Zf, {
      show: It,
      children: c.jsx(WLr, {
        isOpen: It,
        onClose: o6n,
        isDark: t
      })
    }), Ve ? c.jsx(g.Suspense, {
      fallback: null,
      children: c.jsx(HLr, {
        isOpen: Ce,
        onClose: CEt,
        isDark: zX() ? He.isDark : t,
        history: h,
        apiConfigs: _,
        globalApiKey: k,
        globalBaseUrl: z,
        activeEndpoint: V,
        apiTestProgress: O,
        apiStatus: L,
        showBaseUrl: D,
        isModelHiddenInList: U,
        onSetModelHiddenInList: H,
        showHiddenModelsInGenNodes: Y,
        onSetShowHiddenModelsInGenNodes: K,
        onSetGlobalApiKey: W,
        onSetGlobalBaseUrl: Q,
        onApplyGlobalBaseUrlFromPicker: q,
        jimengSuperResUrl: ne,
        jimengSuperResApiKey: de,
        onSetJimengSuperResUrl: le,
        onSetJimengSuperResApiKey: J,
        onTestJimengSuperResConnection: pe,
        onUpdateConfig: ce,
        onUpdateConfigs: we,
        onTestApiConnection: X,
        onSwitchEndpoint: Z,
        getEndpoints: re,
        filterModels: Ze => fe(ye(Ze ?? []))
      })
    }) : null, c.jsx(Zf, {
      show: ie,
      children: c.jsx(FLr, {
        importDocument: ae,
        isOpen: ie,
        onClose: () => be(!1),
        isDark: t,
        nodes: n,
        connections: Ee,
        groups: xe,
        canvasTextBoxes: he,
        canvasDoodleStrokes: ue,
        projectName: ge,
        history: h,
        selectedNodeIds: l,
        chatSessions: _e,
        characterLibrary: ke,
        view: s,
        viewportSize: ve,
        setNodes: d,
        setConnections: u,
        setHistory: p,
        setChatSessions: Te,
        setCharacterLibrary: P,
        setGroups: Ne,
        setView: me,
        setProjectName: Ae,
        setCanvasTextBoxes: Fe,
        setCanvasDoodleStrokes: Me
      })
    }), Ft && Da.createPortal(c.jsx(Zf, {
      show: Re,
      children: c.jsx(XLr, {
        isOpen: Re,
        isDark: t,
        roles: rt.roles,
        categories: rt.categories,
        filterOptions: rt.filterOptions,
        collapsedCategoryIds: rt.collapsedCategoryIds,
        imageAssets: rt.imageAssets,
        loading: rt.loading,
        saving: rt.saving,
        error: rt.error,
        onClose: () => $e(!1),
        onBackToMaterialLibrary: tMi,
        onRefresh: async () => {
          await nt(), await rt.refresh();
        },
        onCreateFromImportedImages: async () => {
          try {
            await rt.createRoleFromImportedImages(), b("已新建资源");
          } catch (Ze) {
            y((Ze == null ? void 0 : Ze.message) || "导入失败");
          }
        },
        onCreateFromExistingAssets: Ze => {
          rt.createRoleFromExistingAssets(Ze), b("已创建资源");
        },
        onUpdateRole: async (Ze, Ge) => {
          try {
            await rt.updateRole(Ze, Ge);
          } catch (Oe) {
            throw y((Oe == null ? void 0 : Oe.message) || "保存失败，素材文件未能重命名"), Oe;
          }
        },
        onDeleteRole: rt.deleteRole,
        onUpdateCategories: rt.updateCategories,
        onUpdateFilterOptions: rt.updateFilterOptions,
        onUpdateCollapsedCategoryIds: rt.updateCollapsedCategoryIds,
        getAssetPreviewUrl: async Ze => {
          const Ge = ze.allFolders.flatMap(st => st.assets).find(st => st.path === Ze.path);
          if (!Ge) return rt.getAssetPreviewUrl(Ze);
          const {
            resolveMaterialLibraryThumbPreviewUrl: Oe
          } = await Ie(async () => {
            const {
              resolveMaterialLibraryThumbPreviewUrl: st
            } = await Promise.resolve().then(() => U1);
            return {
              resolveMaterialLibraryThumbPreviewUrl: st
            };
          }, void 0, import.meta.url);
          return Oe(Ge);
        },
        getAssetOriginalPreviewUrl: async Ze => {
          const Ge = ze.allFolders.flatMap(st => st.assets).find(st => st.path === Ze.path);
          if (!Ge) return rt.getAssetPreviewUrl(Ze);
          const {
            resolveMaterialLibraryOriginalPreviewUrl: Oe
          } = await Ie(async () => {
            const {
              resolveMaterialLibraryOriginalPreviewUrl: st
            } = await Promise.resolve().then(() => U1);
            return {
              resolveMaterialLibraryOriginalPreviewUrl: st
            };
          }, void 0, import.meta.url);
          return Oe(Ge);
        },
        getAssetPreviewFallbackUrl: async Ze => {
          const Ge = ze.getPreviewFallbackUrl(Ze.path);
          if (Ge) return Ge;
          const Oe = ze.allFolders.flatMap(vt => vt.assets).find(vt => vt.path === Ze.path);
          if (!Oe) return null;
          const {
            getMaterialLibraryRemoteOriginalUrl: st
          } = await Ie(async () => {
            const {
              getMaterialLibraryRemoteOriginalUrl: vt
            } = await Promise.resolve().then(() => U1);
            return {
              getMaterialLibraryRemoteOriginalUrl: vt
            };
          }, void 0, import.meta.url);
          return st(Oe);
        },
        getMaterialAssetPreviewUrl: async Ze => {
          const {
            resolveMaterialLibraryThumbPreviewUrl: Ge
          } = await Ie(async () => {
            const {
              resolveMaterialLibraryThumbPreviewUrl: Oe
            } = await Promise.resolve().then(() => U1);
            return {
              resolveMaterialLibraryThumbPreviewUrl: Oe
            };
          }, void 0, import.meta.url);
          return Ge(Ze);
        },
        getMaterialAssetPreviewFallbackUrl: async Ze => {
          const Ge = ze.getPreviewFallbackUrl(Ze.path);
          if (Ge) return Ge;
          const {
            getMaterialLibraryRemoteOriginalUrl: Oe
          } = await Ie(async () => {
            const {
              getMaterialLibraryRemoteOriginalUrl: st
            } = await Promise.resolve().then(() => U1);
            return {
              getMaterialLibraryRemoteOriginalUrl: st
            };
          }, void 0, import.meta.url);
          return Oe(Ze);
        },
        onApplyToCanvas: Le,
        onSaved: () => b("已保存"),
        renameCategoryById: rt.renameCategoryById,
        addCategoryChildById: rt.addCategoryChildById,
        addCategoryEra: rt.addCategoryEra,
        deleteCategoryById: rt.deleteCategoryById,
        renameFilterOptionValue: rt.renameFilterOptionValue,
        removeFilterOptionValue: rt.removeFilterOptionValue,
        addFilterDimension: rt.addFilterDimension
      })
    }), Ft), c.jsx($9i, {
      open: Ke,
      isDark: t,
      library: ze,
      onClose: De,
      onConfirm: Ye
    })]
  });
}

const _Ni = g.memo(xNi),
  $hr = "qiaodoumayi-pin-color-groups:";

function kNi(e) {
  if (!e || typeof localStorage > "u") return {};
  try {
    const t = localStorage.getItem(`${$hr}${e}`);
    if (!t) return {};
    const n = JSON.parse(t);
    return !n || typeof n != "object" ? {} : n;
  } catch {
    return {};
  }
}

function ANi(e, t) {
  if (!(!e || typeof localStorage > "u")) try {
    localStorage.setItem(`${$hr}${e}`, JSON.stringify(t));
  } catch {}
}

function SNi({
  thumbnail: e,
  kind: t,
  label: n
}) {
  on();
  const [r, a] = g.useState(!1);
  return e && !r ? c.jsx("img", {
    src: e,
    alt: "",
    className: "h-10 w-10 shrink-0 rounded-lg object-cover",
    "data-testid": "canvas-tag-object-thumbnail",
    onError: () => a(!0)
  }) : c.jsxs("span", {
    className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/5 text-xs text-zinc-400",
    "aria-hidden": !0,
    children: [atr(t), c.jsx("span", {
      className: "sr-only",
      children: n
    })]
  });
}

function INi({
  nodes: e,
  isDark: t,
  projectId: n
}) {
  on();
  const {
      filteredGroupId: r,
      groupNames: a,
      locatedObjectId: i
    } = Qza(),
    o = g.useMemo(() => Uza(e), [e]),
    [s, l] = g.useState(null),
    [d, u] = g.useState(""),
    [h, p] = g.useState(null),
    m = g.useRef(null),
    f = g.useRef(null);
  g.useEffect(() => {
    Kza(kNi(n)), Yza();
  }, [n]), g.useLayoutEffect(() => (Ban(o.length > 0), () => Ban(!1)), [o.length]), g.useEffect(() => {
    r && (o.some(A => A.color.id === r) || (R6e(), p(null), l(null)));
  }, [r, o]), g.useEffect(() => {
    if (!r) return;
    const A = C => {
        C.key === "Escape" && (R6e(), p(null), l(null));
      },
      S = C => {
        const I = C.target;
        I != null && I.closest("[data-canvas-pin-ui]") || (R6e(), p(null), l(null));
      };
    return window.addEventListener("keydown", A), window.addEventListener("pointerdown", S, !0), () => {
      window.removeEventListener("keydown", A), window.removeEventListener("pointerdown", S, !0);
    };
  }, [r]), g.useLayoutEffect(() => {
    var A, S;
    i && ((S = (A = f.current) == null ? void 0 : A.querySelector(`[data-object-id="${i}"]`)) == null || S.scrollIntoView({
      block: "nearest"
    }));
  }, [i]);
  const y = g.useCallback(A => {
    qza(A, d), ANi(n, {
      ...a,
      [A]: d.trim() || void 0
    }), l(null);
  }, [a, n, d]);
  if (!o.length) return null;
  const b = o.find(A => A.color.id === r) ?? null,
    v = b ? b.nodeIds.map(A => e.find(S => S.id === A)).filter(A => !!A) : [],
    _ = v.map($za),
    w = v.some(A => QLt(A.type) !== "text" && UD(A)),
    k = b ? a[b.color.id] || b.color.name : "";
  return c.jsxs("div", {
    className: "pointer-events-auto fixed top-[12px] left-1/2 z-[10000] flex -translate-x-1/2 flex-col items-center overflow-visible",
    "data-canvas-pin-ui": "bar",
    children: [c.jsx("div", {
      role: "toolbar",
      className: "relative flex h-7 shrink-0 items-center overflow-visible",
      "data-testid": "canvas-tag-toolbar",
      children: o.map(A => {
        const S = r === A.color.id,
          C = a[A.color.id] || A.color.name;
        return c.jsx("button", {
          type: "button",
          role: "tab",
          "aria-selected": S,
          "data-canvas-pin-ui": "chip",
          "data-canvas-tag-id": A.color.id,
          className: `flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-transparent ${S ? t ? "bg-white/10" : "bg-black/5" : ""}`,
          "aria-label": `${C}（${A.count}）`,
          title: `${C}（${A.count}）`,
          onClick: I => {
            I.stopPropagation(), p(null), l(null), Vza(A.color.id, !S);
          },
          children: c.jsx("span", {
            className: "canvas-pin-bar-dot",
            style: {
              backgroundColor: A.color.hex
            }
          })
        }, A.color.id);
      })
    }), b ? c.jsxs("div", {
      ref: m,
      "data-canvas-pin-ui": "menu",
      "data-testid": "canvas-tag-panel",
      "data-theme": t ? "dark" : "light",
      className: "canvas-pin-panel absolute top-full mt-2",
      role: "dialog",
      "aria-label": x("标签「{0}」的内容", k),
      onMouseDown: A => A.stopPropagation(),
      onPointerDown: A => A.stopPropagation(),
      children: [c.jsxs("header", {
        className: "flex shrink-0 items-center justify-between",
        style: {
          height: 52,
          padding: "12px 16px 4px"
        },
        children: [c.jsxs("h2", {
          className: "flex min-w-0 items-center gap-1 text-sm font-medium",
          children: [c.jsx("span", {
            "aria-hidden": !0,
            className: "canvas-pin-bar-dot shrink-0",
            style: {
              backgroundColor: b.color.hex
            }
          }), s === b.color.id ? c.jsx("input", {
            autoFocus: !0,
            value: d,
            onChange: A => u(A.target.value),
            onBlur: () => y(b.color.id),
            onKeyDown: A => {
              A.key === "Enter" ? (A.preventDefault(), y(b.color.id)) : A.key === "Escape" && (A.preventDefault(), l(null));
            },
            className: `h-7 min-w-0 flex-1 rounded-md border bg-transparent px-2 text-sm outline-none ${t ? "border-white/15 text-white" : "border-zinc-200 text-zinc-900"}`,
            "aria-label": x("标签名称")
          }) : c.jsxs(c.Fragment, {
            children: [c.jsx("span", {
              className: "truncate",
              children: k
            }), c.jsx("button", {
              type: "button",
              className: `inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${t ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-400 hover:text-zinc-700"}`,
              title: x("重命名"),
              "aria-label": x("重命名 {0}", k),
              onClick: () => {
                l(b.color.id), u(k);
              },
              children: c.jsx(nw, {
                size: 13
              })
            })]
          }), c.jsx("span", {
            className: "shrink-0 tabular-nums",
            "data-testid": "canvas-tag-panel-count",
            children: b.count
          })]
        }), b.count === 0 ? null : c.jsx("button", {
          type: "button",
          "aria-label": x("移除“{0}”的全部内容", k),
          "data-testid": "canvas-tag-panel-delete-glyph",
          className: `inline-flex h-6 w-6 items-center justify-center rounded-md ${t ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-400 hover:text-zinc-700"}`,
          onClick: () => p(b.color.id),
          children: c.jsx(Qo, {
            size: 14
          })
        })]
      }), c.jsx("div", {
        ref: f,
        className: "relative flex min-h-0 flex-1 flex-col overflow-y-auto pr-2",
        "data-canvas-tag-object-list": "",
        children: _.length === 0 ? c.jsx("div", {
          className: `flex flex-1 items-center justify-center px-4 py-8 text-[13px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: x("这个标签下还没有内容")
        }) : _.map((A, S) => {
          const C = A.kind,
            I = A.id === i;
          return c.jsxs("div", {
            role: "button",
            tabIndex: 0,
            "data-object-id": A.id,
            "data-testid": "canvas-tag-object-row",
            "data-located": I ? "true" : void 0,
            className: `group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 ${I ? t ? "bg-white/10" : "bg-zinc-100" : t ? "hover:bg-white/8" : "hover:bg-zinc-100"}`,
            onClick: () => zan(A.id),
            onKeyDown: E => {
              (E.key === "Enter" || E.key === " ") && (E.preventDefault(), zan(A.id));
            },
            children: [c.jsx(SNi, {
              thumbnail: A.thumbnail,
              kind: C,
              label: A.label
            }), c.jsxs("span", {
              className: "flex min-w-0 flex-col",
              children: [c.jsx("span", {
                className: "truncate text-[13px]",
                children: A.label || x("内容 {0}", S + 1)
              }), c.jsx("span", {
                className: `truncate text-[11px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
                "data-testid": "canvas-tag-object-type",
                children: atr(C)
              })]
            }), c.jsx("span", {
              "aria-hidden": !0,
              className: "ml-auto shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
              "data-testid": "canvas-tag-locate-icon",
              children: c.jsx(oNr, {
                size: 14
              })
            })]
          }, A.id);
        })
      }), c.jsx("div", {
        className: `mx-3 h-px ${t ? "bg-white/10" : "bg-zinc-200"}`
      }), c.jsxs("div", {
        className: "p-1",
        children: [c.jsxs("button", {
          type: "button",
          disabled: !w,
          className: `flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] ${w ? t ? "hover:bg-white/8" : "hover:bg-zinc-100" : "cursor-not-allowed opacity-50"}`,
          onClick: () => {
            w && nUa(b.nodeIds);
          },
          children: [c.jsx(ws, {
            size: 15
          }), x("下载全部")]
        }), h === b.color.id ? c.jsxs("div", {
          className: "px-3 py-2 text-xs",
          children: [c.jsxs("div", {
            className: "mb-2",
            children: [x("这会从 "), b.count, x(" 个节点上移出「"), k, x("」标签，节点不会被删除。")]
          }), c.jsxs("div", {
            className: "flex gap-2",
            children: [c.jsx("button", {
              type: "button",
              className: `rounded-md px-2 py-1 ${t ? "bg-white/10" : "bg-zinc-100"}`,
              onClick: () => p(null),
              children: x("取消")
            }), c.jsx("button", {
              type: "button",
              className: "rounded-md bg-red-500 px-2 py-1 text-white",
              onClick: () => {
                tUa(b.color.id), p(null), R6e();
              },
              children: x("全部移除")
            })]
          })]
        }) : null]
      })]
    }) : null]
  });
}

const i$e = "qiaodoumayi_production_triggers_v1",
  Ghr = 24,
  CNi = 5,
  ENi = 30,
  JFt = 80,
  TNi = new Set(["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg", "avif"]),
  MNi = new Set(["mp4", "webm", "ogg", "mov", "avi", "mkv", "flv", "m4v"]),
  PNi = new Set(["mp3", "wav", "ogg", "m4a", "aac", "flac", "opus"]),
  RNi = new Set(["md", "txt", "json", "yaml", "yml", "csv", "tsv", "xml", "html", "css", "js", "jsx", "ts", "tsx", "py", "java", "c", "cpp", "h", "hpp", "rs", "go", "toml", "ini", "log", "sql", "sh", "bat", "ps1", "prompt", "srt", "vtt", "markdown", "rst", "org", "tex", "cfg", "conf", "properties"]);

function Mte(e, t = 240) {
  return typeof e == "string" ? e.replace(/\s+/g, " ").trim().slice(0, t) : "";
}

function oAe(e, t = 320) {
  return typeof e == "string" ? e.trim().slice(0, t) : "";
}

function NNi(e, t = Date.now()) {
  return `${e}-${t.toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function g$(e) {
  const t = Number(e);
  return Number.isFinite(t) && t >= 0 ? t : void 0;
}

function jNi(e) {
  if (!Array.isArray(e)) return;
  const t = new Set(),
    n = e.flatMap(r => {
      if (!r || typeof r != "object") return [];
      const a = r,
        i = oAe(a.name),
        o = a.kind === "image" || a.kind === "video" || a.kind === "audio" || a.kind === "text" ? a.kind : ZFt(i),
        s = i.toLocaleLowerCase();
      return !i || !o || t.has(s) ? [] : (t.add(s), [{
        name: i,
        kind: o,
        size: g$(a.size),
        modifiedAt: g$(a.modifiedAt)
      }]);
    }).slice(0, JFt);
  return n.length > 0 ? n : void 0;
}

function ZFt(e) {
  const t = String(e || "").trim().toLocaleLowerCase(),
    n = t.includes(".") && t.split(".").pop() || "";
  return TNi.has(n) ? "image" : MNi.has(n) ? "video" : PNi.has(n) ? "audio" : RNi.has(n) ? "text" : null;
}

function Vhr(e) {
  const t = Math.round(Number(e));
  return Number.isFinite(t) ? Math.max(CNi, Math.min(1440, t)) : ENi;
}

function Hhr(e, t = Date.now()) {
  if (!e || typeof e != "object") return null;
  const n = e,
    r = n.kind === "schedule" || n.kind === "watch_folder" || n.kind === "notify_failure" ? n.kind : null;
  return r ? {
    id: Mte(n.id, 80) || NNi("trigger", t),
    kind: r,
    enabled: n.enabled !== !1,
    recipeId: Mte(n.recipeId, 80) || void 0,
    folderPath: Mte(n.folderPath, 400) || void 0,
    everyMinutes: r === "schedule" ? Vhr(n.everyMinutes) : void 0,
    lastFiredAt: Number(n.lastFiredAt) > 0 ? Number(n.lastFiredAt) : void 0,
    lastFingerprint: Mte(n.lastFingerprint, 32e3) || void 0,
    pendingFiles: jNi(n.pendingFiles),
    lastImportedFiles: Array.isArray(n.lastImportedFiles) ? n.lastImportedFiles.map(i => oAe(i)).filter(Boolean).slice(0, 8) : void 0,
    lastError: Mte(n.lastError, 240) || void 0,
    lastRunStatus: n.lastRunStatus === "running" || n.lastRunStatus === "success" || n.lastRunStatus === "failed" || n.lastRunStatus === "interrupted" ? n.lastRunStatus : void 0,
    lastStartedAt: Number(n.lastStartedAt) > 0 ? Number(n.lastStartedAt) : void 0,
    lastCompletedAt: Number(n.lastCompletedAt) > 0 ? Number(n.lastCompletedAt) : void 0,
    lastFireKey: Mte(n.lastFireKey, 240) || void 0,
    createdAt: Number(n.createdAt) > 0 ? Number(n.createdAt) : t,
    updatedAt: Number(n.updatedAt) > 0 ? Number(n.updatedAt) : t
  } : null;
}

function DNi(e, t = Date.now()) {
  if (!e || typeof e != "object") return {
    notifyOnFailure: !0,
    items: []
  };
  const n = e,
    r = Array.isArray(n.items) ? n.items.map(a => Hhr(a, t)).filter(a => !!a) : [];
  return {
    notifyOnFailure: n.notifyOnFailure !== !1,
    items: r.slice(0, Ghr)
  };
}

function LNi(e) {
  return JSON.stringify(e.filter(t => t.kind === "file" && ZFt(t.name)).map(t => ({
    n: oAe(t.name),
    s: g$(t.size),
    m: g$(t.modifiedAt)
  })).filter(t => t.n).sort((t, n) => t.n.localeCompare(n.n)).slice(0, JFt));
}

function ONi(e) {
  if (!e) return [];
  try {
    const t = JSON.parse(e);
    if (Array.isArray(t)) return t.flatMap(n => {
      if (!n || typeof n != "object") return [];
      const r = n,
        a = oAe(r.n);
      return a ? [{
        n: a,
        s: g$(r.s),
        m: g$(r.m)
      }] : [];
    });
  } catch {}
  return e.split("|").flatMap(t => {
    if (!t.startsWith("file:")) return [];
    const n = oAe(t.slice(5));
    return n ? [{
      n
    }] : [];
  });
}

function BNi(e, t) {
  if (!e) return [];
  const n = new Map(ONi(e).map(r => [r.n.toLocaleLowerCase(), r]));
  return t.filter(r => {
    const a = n.get(r.name.toLocaleLowerCase());
    return a ? a.s === void 0 && a.m === void 0 ? !1 : a.s !== g$(r.size) || a.m !== g$(r.modifiedAt) : !0;
  });
}

function Iun(e, t, n) {
  const r = n ? new Set([...n].map(i => i.toLocaleLowerCase())) : null,
    a = new Map();
  for (const i of e || []) (!r || r.has(i.name.toLocaleLowerCase())) && a.set(i.name.toLocaleLowerCase(), i);
  for (const i of t) a.set(i.name.toLocaleLowerCase(), i);
  return [...a.values()].slice(0, JFt);
}

function FNi(e, t = Date.now()) {
  if (e.kind !== "schedule" || !e.enabled || !e.recipeId) return !1;
  const n = Vhr(e.everyMinutes) * 6e4,
    r = e.lastFiredAt || e.createdAt || t;
  return t - r >= n;
}

function zNi(e, t) {
  return e.kind !== "watch_folder" || !e.enabled || !e.recipeId || !e.folderPath ? {
    fire: !1,
    baseline: !1
  } : e.lastFingerprint ? {
    fire: t !== e.lastFingerprint,
    baseline: !1
  } : {
    fire: !1,
    baseline: !0
  };
}

function UNi() {
  return Ghr;
}

let Vz = {
    notifyOnFailure: !0,
    items: []
  },
  Cun = !1;

const tAt = new Set();

function Whr() {
  for (const e of tAt) e();
}

function ezt(e) {
  const t = DNi(e),
    n = new Map();
  for (const r of t.items) {
    const a = n.get(r.id);
    (!a || r.updatedAt >= a.updatedAt) && n.set(r.id, r);
  }
  return {
    notifyOnFailure: t.notifyOnFailure,
    items: [...n.values()].sort((r, a) => a.updatedAt - r.updatedAt).slice(0, UNi())
  };
}

function $Ni() {
  try {
    if (typeof localStorage > "u") return Vz;
    const e = localStorage.getItem(i$e);
    return e ? ezt(JSON.parse(e)) : Vz;
  } catch {
    return Vz;
  }
}

function GNi() {
  const e = GZ("triggers");
  if (e.ready && e.value !== null) return cpe(i$e), ezt(e.value);
  const t = $Ni();
  return e.ready && sI("triggers", i$e, t), t;
}

function qhr(e) {
  Vz = ezt(e), sI("triggers", i$e, Vz);
}

function sAe() {
  return Cun || (Vz = GNi(), Cun = GZ("triggers").ready || !DJn()), Vz;
}

function VNi(e) {
  return qhr(e), Whr(), Vz;
}

function HNi(e) {
  return tAt.add(e), () => tAt.delete(e);
}

function qQ() {
  return sAe();
}

function tk(e, t) {
  const n = Date.now();
  VNi({
    ...sAe(),
    items: sAe().items.map(r => r.id !== e ? r : Hhr({
      ...r,
      ...t,
      id: r.id,
      kind: r.kind,
      updatedAt: n
    }, n))
  });
}

function WNi(e) {
  const t = new Map(e.map(a => [a.id, a]));
  let n = !1;
  const r = sAe().items.map(a => {
    const i = t.get(a.id);
    if (!i) return a;
    const o = {
        ...a,
        lastFiredAt: i.lastFiredAt,
        lastFingerprint: i.lastFingerprint,
        pendingFiles: i.pendingFiles,
        lastImportedFiles: i.lastImportedFiles,
        lastError: i.lastError,
        lastRunStatus: i.lastRunStatus,
        lastStartedAt: i.lastStartedAt,
        lastCompletedAt: i.lastCompletedAt,
        lastFireKey: i.lastFireKey,
        updatedAt: Math.max(a.updatedAt, i.updatedAt || 0)
      },
      s = JSON.stringify([a.lastFiredAt, a.lastFingerprint, a.pendingFiles, a.lastImportedFiles, a.lastError, a.lastRunStatus, a.lastStartedAt, a.lastCompletedAt, a.lastFireKey, a.updatedAt]),
      l = JSON.stringify([o.lastFiredAt, o.lastFingerprint, o.pendingFiles, o.lastImportedFiles, o.lastError, o.lastRunStatus, o.lastStartedAt, o.lastCompletedAt, o.lastFireKey, o.updatedAt]);
    return s !== l && (n = !0), o;
  });
  return n ? (qhr({
    ...sAe(),
    items: r
  }), Whr(), !0) : !1;
}

function qNi(e) {
  return String(e.name || e.goal || "生产任务").trim() || "生产任务";
}

function KNi(e) {
  var t, n;
  return ((t = e.tasks.find(r => r.status === "blocked" && r.nodeIds[0])) == null ? void 0 : t.nodeIds[0]) || ((n = e.artifacts.find(r => r.status === "failed")) == null ? void 0 : n.nodeId);
}

function QNi(e) {
  var r, a, i;
  const t = [],
    n = qNi(e);
  if (e.status === "failed") {
    const o = String(e.lastError || "执行失败").trim();
    t.push({
      key: `${e.id}:run-failed:${o}`,
      kind: "run_failed",
      title: "生产任务失败",
      body: `${n}：${o}。点击查看并重试失败步骤`,
      nodeId: KNi(e)
    });
  }
  if ((r = e.delivery) != null && r.config.autoSave && e.delivery.status === "failed") {
    const o = String(e.delivery.error || "无法写入输出目录").trim();
    t.push({
      key: `${e.id}:delivery-failed:${o}:${e.delivery.files.length}`,
      kind: "delivery_failed",
      title: "成品保存失败",
      body: `${n}：${o}。点击重试或更换目录`
    });
  } else (a = e.delivery) != null && a.config.autoSave && e.delivery.status === "completed" ? t.push({
    key: `${e.id}:delivered:${e.delivery.files.length}:${e.delivery.config.directory}`,
    kind: "delivered",
    title: "生产任务已完成",
    body: `${n}：已保存 ${e.delivery.files.length} 个成品。点击查看输出目录`,
    outputDirectory: e.delivery.config.directory
  }) : !((i = e.delivery) != null && i.config.autoSave) && (e.status === "reviewing" || e.status === "completed") && t.push({
    key: `${e.id}:ready`,
    kind: "ready",
    title: e.status === "reviewing" ? "生产产物已就绪" : "生产任务已完成",
    body: `${n}。点击查看任务与产物`
  });
  return t;
}

const YNi = 8e3,
  XNi = 2e4,
  JNi = "production-trigger-fired",
  ZNi = new Set(["queued", "planning", "running", "waiting_generation", "waiting_approval"]);

function e7i() {
  try {
    if (typeof crypto < "u" && typeof crypto.randomUUID == "function") return `window-${crypto.randomUUID()}`;
  } catch {}
  return `window-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const tzt = e7i();

let Ek = !1,
  U1e = null,
  $1e = null,
  Pye = null,
  D7 = null,
  L7 = null;

const Ufe = new Set();

let Pje = !1,
  Rje = !1,
  QP = !1,
  $2 = 0,
  Nje = !1,
  KQ = !1,
  jje = !1,
  Jre = !1,
  o$e = !1,
  s$e = !1;

const PM = new Set(),
  Dje = new Set(),
  Lje = new Map();

function O7() {
  const e = bm();
  return !!(e && ZNi.has(e.status));
}

function l$e(e, t) {
  const n = Spe(e);
  return n ? new Promise(r => {
    window.dispatchEvent(new CustomEvent("productionRecipeExecuteRequested", {
      detail: {
        recipeId: n.id,
        source: "trigger",
        triggerFiles: t,
        resolve: r
      }
    }));
  }) : Promise.resolve(null);
}

async function t7i() {
  try {
    return typeof Notification > "u" ? "unsupported" : Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
  } catch {
    return "unsupported";
  }
}

function n7i(e, t) {
  Uja(e), qP("current", {
    runId: e
  }), t.nodeId && window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent("productionNodeFocusRequested", {
      detail: {
        nodeId: t.nodeId
      }
    }));
  }, 80), t.kind === "delivered" && t.outputDirectory && Ie(async () => {
    const {
      invoke: n
    } = await Promise.resolve().then(() => sd);
    return {
      invoke: n
    };
  }, void 0, import.meta.url).then(({
    invoke: n
  }) => n("open_folder_in_explorer", {
    path: t.outputDirectory
  })).catch(() => {});
}

async function r7i(e, t) {
  try {
    if ((await t7i()) === "granted") {
      const r = new Notification(t.title, {
        body: t.body,
        tag: t.key
      });
      r.onclick = () => {
        window.focus(), n7i(e, t), r.close();
      };
    }
  } catch {}
}

function a7i() {
  const e = hpe();
  if (qQ().notifyOnFailure && e) {
    for (const t of QNi(e)) if (!Ufe.has(t.key)) {
      for (Ufe.add(t.key); Ufe.size > 80;) {
        const n = Ufe.values().next().value;
        if (typeof n != "string") break;
        Ufe.delete(n);
      }
      r7i(e.id, t);
    }
  }
  QP && !O7() && lAe($2);
}

function HJe(e, t) {
  const n = e.includes("\\") ? "\\" : "/";
  return `${e.replace(/[\\/]+$/, "")}${n}${t}`;
}

async function i7i(e) {
  const {
      readDir: t,
      stat: n
    } = await Ie(async () => {
      const {
        readDir: o,
        stat: s
      } = await Promise.resolve().then(() => oc);
      return {
        readDir: o,
        stat: s
      };
    }, void 0, import.meta.url),
    a = (await t(e)).flatMap(o => {
      const s = String(o.name || "").trim(),
        l = o.isDirectory ? null : ZFt(s);
      return s && l ? [{
        name: s,
        kind: l
      }] : [];
    }).slice(0, 80),
    i = await Promise.all(a.map(async o => {
      try {
        const s = await n(HJe(e, o.name)),
          l = s.mtime instanceof Date ? s.mtime.getTime() : Number(s.mtime);
        return {
          ...o,
          size: Number.isFinite(s.size) ? s.size : void 0,
          modifiedAt: Number.isFinite(l) && l > 0 ? l : void 0
        };
      } catch {
        return o;
      }
    }));
  return {
    files: i,
    fingerprint: LNi(i.map(o => ({
      ...o,
      kind: "file"
    })))
  };
}

async function o7i(e, t) {
  const {
    stat: n
  } = await Ie(async () => {
    const {
      stat: r
    } = await Promise.resolve().then(() => oc);
    return {
      stat: r
    };
  }, void 0, import.meta.url);
  for (const r of t) try {
    const a = await n(HJe(e, r.name)),
      i = a.mtime instanceof Date ? a.mtime.getTime() : Number(a.mtime);
    if (r.size !== void 0 && Number(a.size) !== r.size || r.modifiedAt !== void 0 && Number.isFinite(i) && i !== r.modifiedAt) return !1;
  } catch {
    return !1;
  }
  return !0;
}

async function Eun() {
  var e, t;
  if (!Pje) {
    Pje = !0;
    try {
      for (const n of qQ().items) if (!(n.kind !== "watch_folder" || !n.enabled || !n.folderPath)) try {
        const r = await i7i(n.folderPath),
          a = zNi(n, r.fingerprint);
        if (a.baseline) {
          tk(n.id, {
            lastFingerprint: r.fingerprint,
            pendingFiles: Iun(n.pendingFiles, [], r.files.map(s => s.name)),
            lastError: void 0
          });
          continue;
        }
        const i = BNi(n.lastFingerprint, r.files),
          o = Iun(n.pendingFiles, i, r.files.map(s => s.name));
        (a.fire || o.length !== (((e = n.pendingFiles) == null ? void 0 : e.length) || 0)) && tk(n.id, {
          lastFingerprint: r.fingerprint,
          pendingFiles: o.length > 0 ? o : void 0,
          ...(i.length > 0 ? {
            lastError: void 0
          } : {})
        });
      } catch (r) {
        tk(n.id, {
          lastError: r instanceof Error ? r.message : "无法读取监视文件夹"
        });
      }
      if (O7() || PM.size > 0) return;
      for (const n of qQ().items) {
        if (n.kind !== "watch_folder" || !n.enabled || !n.folderPath || !((t = n.pendingFiles) != null && t.length) || PM.has(n.id) || (Lje.get(n.id) || 0) > Date.now()) continue;
        const r = Spe(String(n.recipeId || ""));
        if (!r) {
          tk(n.id, {
            lastError: "未找到对应常用流程"
          });
          continue;
        }
        const a = $Bt(r, n.pendingFiles);
        if (a.missingRequiredSlots.length > 0) {
          tk(n.id, {
            lastError: `等待必填素材：${a.missingRequiredSlots.map(o => o.label).join("、")}`
          });
          continue;
        }
        if (a.matches.length === 0) {
          tk(n.id, {
            lastError: "待处理文件与常用流程输入类型不匹配"
          });
          continue;
        }
        const i = a.matches.map(o => o.file);
        PM.add(n.id), tk(n.id, {
          lastRunStatus: "running",
          lastStartedAt: Date.now(),
          lastCompletedAt: void 0,
          lastError: void 0
        }), l$e(r.id, {
          folderPath: n.folderPath,
          files: i.map(o => ({
            ...o,
            absolutePath: HJe(n.folderPath, o.name)
          }))
        }).then(o => {
          var d, u;
          if (!o) {
            tk(n.id, {
              lastRunStatus: "failed",
              lastCompletedAt: Date.now(),
              lastError: "未找到对应常用流程"
            });
            return;
          }
          const s = new Set((o.consumedTriggerFiles || []).map(h => h.toLocaleLowerCase())),
            l = (((d = qQ().items.find(h => h.id === n.id)) == null ? void 0 : d.pendingFiles) || []).filter(h => !s.has(h.name.toLocaleLowerCase()));
          tk(n.id, {
            pendingFiles: l.length > 0 ? l : void 0,
            lastImportedFiles: (u = o.consumedTriggerFiles) == null ? void 0 : u.slice(0, 8),
            lastFiredAt: o.ok ? Date.now() : n.lastFiredAt,
            lastRunStatus: o.ok ? "success" : "failed",
            lastCompletedAt: Date.now(),
            lastError: o.ok ? void 0 : o.error || "自动生产失败"
          }), o.ok || Lje.set(n.id, Date.now() + 3e4);
        }).catch(o => {
          tk(n.id, {
            lastRunStatus: "failed",
            lastCompletedAt: Date.now(),
            lastError: o instanceof Error ? o.message : "自动生产失败"
          }), Lje.set(n.id, Date.now() + 3e4);
        }).finally(() => {
          PM.delete(n.id);
        });
        return;
      }
    } finally {
      Pje = !1;
    }
  }
}

async function Tun() {
  if (!(O7() || Rje || PM.size > 0)) {
    Rje = !0;
    try {
      const e = Date.now();
      for (const t of qQ().items) if (FNi(t, e)) {
        PM.add(t.id);
        try {
          tk(t.id, {
            lastRunStatus: "running",
            lastStartedAt: e,
            lastCompletedAt: void 0,
            lastError: void 0
          });
          const n = await l$e(String(t.recipeId || ""));
          if (!n) {
            tk(t.id, {
              lastFiredAt: e,
              lastRunStatus: "failed",
              lastCompletedAt: Date.now(),
              lastError: "未找到对应常用流程"
            });
            continue;
          }
          tk(t.id, {
            lastFiredAt: e,
            lastRunStatus: n.ok ? "success" : "failed",
            lastCompletedAt: Date.now(),
            lastError: n.ok ? void 0 : n.error || "定时生产失败"
          });
          return;
        } catch (n) {
          tk(t.id, {
            lastFiredAt: e,
            lastRunStatus: "failed",
            lastCompletedAt: Date.now(),
            lastError: n instanceof Error ? n.message : "定时生产失败"
          });
          return;
        } finally {
          PM.delete(t.id);
        }
      }
    } finally {
      Rje = !1;
    }
  }
}

function s7i() {
  return typeof window > "u" ? !1 : "__TAURI__" in window || "__TAURI_INTERNALS__" in window;
}

function Khr(e) {
  const t = e instanceof Error ? e.message : String(e || "");
  return /not allowed|command not found|unknown command|找不到命令/i.test(t);
}

function nzt(e) {
  if (!(!e || !Array.isArray(e.items))) {
    o$e = !0;
    try {
      WNi(e.items);
    } finally {
      o$e = !1;
    }
  }
}

async function Qhr(e) {
  const {
    invoke: t
  } = await Ie(async () => {
    const {
      invoke: n
    } = await Promise.resolve().then(() => sd);
    return {
      invoke: n
    };
  }, void 0, import.meta.url);
  return e === "production_trigger_runtime_sync" ? t(e, {
    snapshot: qQ()
  }) : t(e, {
    consumerId: tzt
  });
}

async function l7i(e) {
  const {
    invoke: t
  } = await Ie(async () => {
    const {
      invoke: n
    } = await Promise.resolve().then(() => sd);
    return {
      invoke: n
    };
  }, void 0, import.meta.url);
  await t("production_trigger_runtime_renew", {
    eventId: e,
    consumerId: tzt
  });
}

async function aR(e, t) {
  const {
      invoke: n
    } = await Ie(async () => {
      const {
        invoke: a
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: a
      };
    }, void 0, import.meta.url),
    r = await n("production_trigger_runtime_ack", {
      eventId: e.eventId,
      consumerId: tzt,
      success: t.success,
      consumedFiles: t.consumedFiles ?? null,
      error: t.error ?? null
    });
  nzt(r);
}

async function c7i(e, t) {
  if (!Ek || t !== $2 || O7() || !(e != null && e.eventId) || Dje.has(e.eventId)) return;
  const n = qQ().items.find(i => i.id === e.triggerId);
  if (!n || !n.enabled) {
    await aR(e, {
      success: !1,
      error: "触发器已停用或不存在"
    });
    return;
  }
  const r = Spe(e.recipeId || String(n.recipeId || ""));
  if (!r) {
    await aR(e, {
      success: !1,
      error: "未找到对应常用流程"
    });
    return;
  }
  Dje.add(e.eventId), PM.add(n.id);
  const a = window.setInterval(() => {
    l7i(e.eventId).catch(i => {
      console.warn("[ProductionTrigger] 续租桌面任务失败:", i);
    });
  }, 3e4);
  try {
    let i;
    if (e.kind === "watch_folder") {
      const o = e.folderPath || n.folderPath;
      if (!o) {
        await aR(e, {
          success: !1,
          error: "未设置监视文件夹"
        });
        return;
      }
      if (!(await o7i(o, e.files || []))) {
        await aR(e, {
          success: !1,
          error: "素材仍在写入或已经变化，等待稳定后再运行"
        });
        return;
      }
      const s = $Bt(r, e.files || []);
      if (s.missingRequiredSlots.length > 0) {
        await aR(e, {
          success: !1,
          error: `等待必填素材：${s.missingRequiredSlots.map(d => d.label).join("、")}`
        });
        return;
      }
      if (s.matches.length === 0) {
        await aR(e, {
          success: !1,
          error: "待处理文件与常用流程输入类型不匹配"
        });
        return;
      }
      const l = s.matches.map(d => d.file);
      i = await l$e(r.id, {
        folderPath: o,
        files: l.map(d => ({
          ...d,
          absolutePath: HJe(o, d.name)
        }))
      });
    } else i = await l$e(r.id);
    if (!i) {
      await aR(e, {
        success: !1,
        error: "未找到对应常用流程"
      });
      return;
    }
    await aR(e, {
      success: i.ok,
      consumedFiles: i.consumedTriggerFiles,
      error: i.ok ? void 0 : i.error || "自动生产失败"
    });
  } catch (i) {
    await aR(e, {
      success: !1,
      error: i instanceof Error ? i.message : "自动生产失败"
    });
  } finally {
    window.clearInterval(a), Dje.delete(e.eventId), PM.delete(n.id);
  }
}

async function lAe(e) {
  if (!(!Ek || !QP || e !== $2 || O7())) {
    if (jje) {
      Jre = !0;
      return;
    }
    jje = !0, Jre = !1;
    try {
      const t = await Qhr("production_trigger_runtime_take_pending");
      if (!Ek || e !== $2) return;
      nzt(t);
      for (const n of t.pendingEvents || []) {
        if (!Ek || e !== $2 || O7()) return;
        await c7i(n, e);
      }
      (t.pendingEvents || []).length > 0 && !O7() && (Jre = !0);
    } catch (t) {
      Khr(t) ? azt(t, e) : console.warn("[ProductionTrigger] 读取桌面后台待执行任务失败:", t);
    } finally {
      jje = !1, Jre && Ek && QP && e === $2 && !O7() && lAe(e);
    }
  }
}

async function rzt(e) {
  if (!Nje) {
    Nje = !0;
    try {
      for (; Ek && QP && e === $2 && KQ;) {
        KQ = !1;
        const t = await Qhr("production_trigger_runtime_sync");
        if (!Ek || e !== $2) return;
        nzt(t), O7() || (await lAe(e));
      }
    } catch (t) {
      Khr(t) ? azt(t, e) : console.warn("[ProductionTrigger] 同步桌面后台触发器失败:", t);
    } finally {
      Nje = !1, KQ && Ek && QP && e === $2 && rzt(e);
    }
  }
}

function d7i(e) {
  !Ek || !QP || e !== $2 || o$e || (KQ = !0, rzt(e));
}

function FMe(e) {
  Yi() || e();
}

function Yhr() {
  $1e != null || U1e != null || ($1e = window.setInterval(() => FMe(Tun), XNi), U1e = window.setInterval(() => FMe(Eun), YNi), FMe(Tun), FMe(Eun));
}

function azt(e, t) {
  !Ek || t !== $2 || (QP = !1, KQ = !1, Jre = !1, L7 == null || L7(), L7 = null, D7 == null || D7(), D7 = null, B7 == null || B7(), B7 = null, s$e || (s$e = !0, console.warn("[ProductionTrigger] 桌面后台命令不可用，已切换到页面兼容模式；完整重启桌面应用后将启用后台模式。", e)), Yhr());
}

async function u7i(e) {
  try {
    const {
        listen: t
      } = await Ie(async () => {
        const {
          listen: a
        } = await Promise.resolve().then(() => KKe);
        return {
          listen: a
        };
      }, void 0, import.meta.url),
      n = await t(JNi, () => {
        lAe(e);
      });
    if (!Ek || e !== $2) {
      n();
      return;
    }
    L7 = n, D7 = HNi(() => d7i(e));
    const r = () => {
      lAe(e);
    };
    window.addEventListener("focus", r), document.addEventListener("visibilitychange", r), B7 = () => {
      window.removeEventListener("focus", r), document.removeEventListener("visibilitychange", r);
    }, KQ = !0, await rzt(e);
  } catch (t) {
    azt(t, e);
  }
}

let B7 = null;

function h7i() {
  return Ek || (Ek = !0, Pye = wXe(a7i), $2 += 1, s$e = !1, QP = s7i(), QP ? u7i($2) : Yhr()), Mun;
}

function Mun() {
  Ek = !1, Pye == null || Pye(), Pye = null, D7 == null || D7(), D7 = null, L7 == null || L7(), L7 = null, B7 == null || B7(), B7 = null, $1e != null && window.clearInterval($1e), U1e != null && window.clearInterval(U1e), $1e = null, U1e = null, Pje = !1, Rje = !1, QP = !1, $2 += 1, Nje = !1, KQ = !1, jje = !1, Jre = !1, o$e = !1, s$e = !1, PM.clear(), Dje.clear(), Lje.clear();
}

const Xhr = "qiaodoumayi_production_api_gateway_v1",
  p7i = new Set(["read", "run", "control"]),
  m7i = new Set(["start_recipe", "pause_run", "resume_run", "cancel_run", "retry_run"]),
  f7i = new Set(["accepted", "running", "succeeded", "failed", "duplicate"]),
  g7i = 100;

let Hz = {
    version: 1,
    settings: {
      enabled: !1,
      scopes: ["read", "run"]
    },
    requests: []
  },
  Pun = !1;

const nAt = new Set();

function Jf(e, t = 200) {
  return typeof e == "string" ? e.trim().slice(0, t) : "";
}

function zMe(e, t) {
  const n = Number(e);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : t;
}

function y7i(e) {
  if (!(!e || typeof e != "object" || Array.isArray(e))) try {
    const t = JSON.stringify(e);
    return t.length > 1e5 ? void 0 : JSON.parse(t);
  } catch {
    return;
  }
}

function b7i(e) {
  return Array.isArray(e) ? [...new Set(e.map(n => Jf(n, 24).toLowerCase()).filter(n => p7i.has(n)))] : ["read", "run"];
}

function v7i(e) {
  return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).slice(0, 32).map(([t, n]) => [Jf(t, 128), Jf(n, 128)]).filter(([t, n]) => !!(t && n)));
}

function w7i(e) {
  if (!Array.isArray(e)) return [];
  const t = new Set(["image", "video", "audio", "text", "character", "scene"]),
    n = new Set(["browser", "desktop", "web", "api"]);
  return e.slice(0, 8).flatMap(r => {
    if (!r || typeof r != "object" || Array.isArray(r)) return [];
    const a = r,
      i = Jf(a.slotId, 128),
      o = Jf(a.name, 240),
      s = Jf(a.filePath, 2048),
      l = typeof a.text == "string" ? a.text.trim().slice(0, 1e5) : "",
      d = Jf(a.kind, 32).toLowerCase(),
      u = Jf(a.source, 32).toLowerCase();
    let h = Jf(a.url, 4096);
    if (h) try {
      const p = new URL(h);
      if (!["http:", "https:"].includes(p.protocol) || p.username || p.password) return [];
      p.hash = "", h = p.toString();
    } catch {
      return [];
    }
    return !i || +!!h + +!!s + +!!l != 1 ? [] : [{
      slotId: i,
      ...(t.has(d) ? {
        kind: d
      } : {}),
      ...(o ? {
        name: o
      } : {}),
      ...(h ? {
        url: h
      } : {}),
      ...(s ? {
        filePath: s
      } : {}),
      ...(l ? {
        text: l
      } : {}),
      ...(n.has(u) ? {
        source: u
      } : {})
    }];
  });
}

function G1e(e) {
  const t = Jf(e, 2048);
  if (t) try {
    const n = new URL(t);
    return n.protocol !== "http:" && n.protocol !== "https:" || n.username || n.password ? void 0 : (n.hash = "", n.toString());
  } catch {
    return;
  }
}

function x7i(e, t) {
  if (!e || typeof e != "object") return null;
  const n = e,
    r = Jf(n.commandId, 180),
    a = Jf(n.idempotencyKey, 160),
    i = Jf(n.action, 40),
    o = Jf(n.status, 24);
  if (!r || !a || !m7i.has(i) || !f7i.has(o)) return null;
  const s = Jf(n.webhookStatus, 24),
    l = ["pending", "delivering", "delivered", "failed"].includes(s) ? s : void 0;
  return {
    commandId: r,
    idempotencyKey: a,
    action: i,
    status: o,
    recipeId: Jf(n.recipeId, 160) || void 0,
    runId: Jf(n.runId, 180) || void 0,
    resultRunId: Jf(n.resultRunId, 180) || void 0,
    callbackUrl: G1e(n.callbackUrl),
    webhookStatus: l === "delivering" ? "pending" : l,
    webhookAttempts: Math.max(0, Math.min(20, Math.floor(Number(n.webhookAttempts) || 0))) || void 0,
    webhookError: Jf(n.webhookError, 500) || void 0,
    webhookLastAttemptAt: zMe(n.webhookLastAttemptAt, 0) || void 0,
    webhookDeliveredAt: zMe(n.webhookDeliveredAt, 0) || void 0,
    webhookPayload: y7i(n.webhookPayload),
    duplicateOf: Jf(n.duplicateOf, 180) || void 0,
    error: Jf(n.error, 500) || void 0,
    createdAt: zMe(n.createdAt, t),
    updatedAt: zMe(n.updatedAt, t)
  };
}

function Jhr(e) {
  const t = Date.now(),
    n = e && typeof e == "object" ? e : {},
    r = n.settings && typeof n.settings == "object" ? n.settings : {},
    a = Array.isArray(n.requests) ? n.requests.map(i => x7i(i, t)).filter(i => !!i).sort((i, o) => o.updatedAt - i.updatedAt).slice(0, g7i) : [];
  return {
    version: 1,
    settings: {
      enabled: r.enabled === !0,
      scopes: b7i(r.scopes)
    },
    requests: a
  };
}

function _7i() {
  try {
    if (typeof localStorage > "u") return Hz;
    const e = localStorage.getItem(Xhr);
    if (!e) return Hz;
    const t = Jhr(JSON.parse(e));
    return {
      ...t,
      requests: t.requests.map(n => n.status === "accepted" || n.status === "running" ? {
        ...n,
        status: "failed",
        error: "应用重启前请求未完成，请先查询生产任务，再使用新的幂等键重试。",
        updatedAt: Date.now()
      } : n)
    };
  } catch {
    return Hz;
  }
}

function izt() {
  return Pun || (Hz = _7i(), Pun = !0), Hz;
}

function k7i() {
  for (const e of nAt) e();
}

function rAt(e) {
  Hz = Jhr(e);
  try {
    typeof localStorage < "u" && localStorage.setItem(Xhr, JSON.stringify(Hz));
  } catch {}
  return k7i(), Hz;
}

function A7i(e) {
  return nAt.add(e), () => nAt.delete(e);
}

function Ppe() {
  return izt();
}

function S7i(e) {
  const t = izt(),
    n = t.requests.find(i => i.action === e.action && i.idempotencyKey === e.idempotencyKey);
  if (n) {
    const i = {
      commandId: e.commandId,
      idempotencyKey: e.idempotencyKey,
      action: e.action,
      status: "duplicate",
      recipeId: e.recipeId,
      runId: e.runId,
      resultRunId: n.resultRunId,
      callbackUrl: G1e(e.callbackUrl),
      duplicateOf: n.commandId,
      error: n.error,
      createdAt: e.receivedAt || Date.now(),
      updatedAt: Date.now()
    };
    return n.commandId !== e.commandId && rAt({
      ...t,
      requests: [i, ...t.requests]
    }), {
      record: n.commandId === e.commandId ? n : i,
      duplicate: n
    };
  }
  const r = e.receivedAt || Date.now(),
    a = {
      commandId: e.commandId,
      idempotencyKey: e.idempotencyKey,
      action: e.action,
      status: "accepted",
      recipeId: e.recipeId,
      runId: e.runId,
      callbackUrl: G1e(e.callbackUrl),
      webhookStatus: G1e(e.callbackUrl) ? "pending" : void 0,
      createdAt: r,
      updatedAt: r
    };
  return rAt({
    ...t,
    requests: [a, ...t.requests]
  }), {
    record: a
  };
}

function uoe(e, t) {
  const n = izt();
  let r = null;
  const a = n.requests.map(i => i.commandId !== e ? i : (r = {
    ...i,
    ...t,
    error: t.error === void 0 ? i.error : Jf(t.error, 500) || void 0,
    webhookError: t.webhookError === void 0 ? i.webhookError : Jf(t.webhookError, 500) || void 0,
    updatedAt: Date.now()
  }, r));
  return r ? (rAt({
    ...n,
    requests: a
  }), r) : null;
}

const ozt = "production-api-command",
  I7i = new Set(["start_recipe", "pause_run", "resume_run", "cancel_run", "retry_run"]),
  aAt = new Set(["completed", "failed"]);

let y$ = !1,
  MW = null,
  Rye = null,
  Nye = null,
  jye = null,
  Dye = null,
  Lye = null,
  iAt = "",
  hj = !1,
  Run = Promise.resolve(),
  V1e = null,
  WJe = !1;

const Oje = new Set(),
  H1e = new Map();

function $fe(e, t = 180) {
  return typeof e == "string" ? e.trim().slice(0, t) : "";
}

function Zhr(e) {
  if (!e || typeof e != "object") return null;
  const t = e,
    n = $fe(t.commandId, 180),
    r = $fe(t.idempotencyKey, 160),
    a = $fe(t.action, 40);
  return !n || !r || !I7i.has(a) ? null : {
    commandId: n,
    idempotencyKey: r,
    action: a,
    recipeId: $fe(t.recipeId, 160) || void 0,
    runId: $fe(t.runId, 180) || void 0,
    bindings: v7i(t.bindings),
    inputs: w7i(t.inputs),
    callbackUrl: G1e(t.callbackUrl),
    receivedAt: Number.isFinite(Number(t.receivedAt)) ? Number(t.receivedAt) : void 0
  };
}

function C7i(e, t, n = Date.now()) {
  return {
    version: 1,
    event: e.status === "completed" ? "production.run.completed" : "production.run.failed",
    deliveryId: `${t.commandId}:${e.status}`,
    occurredAt: n,
    command: {
      commandId: t.commandId,
      idempotencyKey: t.idempotencyKey
    },
    run: {
      id: e.id,
      projectId: e.projectId,
      recipeId: e.recipeId,
      name: e.name,
      status: e.status,
      progress: pLt(e),
      startedAt: e.startedAt,
      completedAt: e.completedAt,
      updatedAt: e.updatedAt,
      lastError: e.lastError,
      delivery: e.delivery ? {
        status: e.delivery.status,
        savedCount: e.delivery.files.length,
        error: e.delivery.error
      } : void 0,
      artifacts: e.artifacts.filter(r => r.kind === "output").map(r => ({
        nodeId: r.nodeId,
        status: r.status,
        error: r.error
      }))
    }
  };
}

function E7i(e) {
  var o;
  const t = e.now ?? Date.now(),
    n = e.run,
    r = n ? xde(n.id) : xde(),
    a = tke(n == null ? void 0 : n.id),
    i = n ? pLt(n) : null;
  return {
    ok: !0,
    version: 1,
    service: "qiaodoumayi-production-api",
    baseUrl: ZRa,
    updatedAt: t,
    recipes: nyi().map(s => ({
      id: s.id,
      name: s.name,
      version: s.currentVersion,
      projectId: s.projectId,
      requiredInputs: s.slots.filter(l => l.role === "input" && l.required).map(l => ({
        id: l.id,
        label: l.label,
        kind: l.kind,
        boundNodeId: l.boundNodeId
      })),
      autoSave: s.output.autoSave
    })),
    activeRun: n ? {
      id: n.id,
      projectId: n.projectId,
      recipeId: n.recipeId,
      name: n.name,
      status: n.status,
      currentStep: ((o = n.events[n.events.length - 1]) == null ? void 0 : o.summary) || n.preflight.summary,
      progress: i,
      startedAt: n.startedAt,
      updatedAt: n.updatedAt,
      lastError: n.lastError,
      delivery: n.delivery ? {
        status: n.delivery.status,
        savedCount: n.delivery.files.length,
        error: n.delivery.error
      } : void 0
    } : null,
    queue: {
      ...a,
      jobs: r.slice(-80).map(s => ({
        id: s.id,
        runId: s.runId,
        nodeId: s.nodeId,
        action: s.action,
        status: s.status,
        currentStep: s.currentStep,
        priority: s.priority,
        lastError: s.lastError
      }))
    },
    apiRequests: Ppe().requests.slice(0, 80)
  };
}

function epr() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI__ || e.__TAURI_INTERNALS__ || e.__LINGO_ELECTRON_NATIVE_SHELL__ || e.__LINGO_SIDECAR__);
}

function c$e() {
  return typeof window > "u" ? !1 : "__TAURI__" in window || "__TAURI_INTERNALS__" in window;
}

async function T7i() {
  if (!y$ || !epr() || c$e() && !WJe) return;
  const e = Ppe().settings;
  try {
    await CBt(), await Fr("production_api_gateway_configure", {
      enabled: e.enabled,
      scopes: e.scopes
    }), hj = !1, e.enabled && (await tpr());
  } catch (t) {
    hj || (hj = !0, console.warn("[ProductionAPI] 本机生产 API 后台尚未就绪，请完整重启桌面应用后再启用。", t));
  }
}

async function tpr() {
  if (!(!y$ || hj || !epr() || !Ppe().settings.enabled)) try {
    await Fr("production_api_gateway_sync_state", {
      snapshot: E7i({
        run: hpe()
      })
    });
  } catch (t) {
    hj || (hj = !0, console.warn("[ProductionAPI] 无法同步生产状态，请完整重启桌面应用后重试。", t));
  }
}

function Wz() {
  !y$ || hj || (MW != null && window.clearTimeout(MW), MW = window.setTimeout(() => {
    MW = null, tpr();
  }, 80));
}

async function npr(e, t) {
  if (Oje.has(e)) return;
  const n = Ppe().requests.find(i => i.commandId === e);
  if (!(n != null && n.callbackUrl) || t && n.resultRunId !== t.id || n.webhookStatus === "delivered" || (n.webhookAttempts ?? 0) >= 3) return;
  const r = t ? C7i(t, n) : n.webhookPayload;
  if (!r) return;
  Oje.add(e);
  const a = (n.webhookAttempts ?? 0) + 1;
  uoe(e, {
    webhookStatus: "delivering",
    webhookAttempts: a,
    webhookError: "",
    webhookLastAttemptAt: Date.now(),
    webhookPayload: r
  });
  try {
    if (!(await CBt())) throw new Error("本机服务尚未启动，无法安全签名回调");
    const o = await jui();
    if (!o.token) throw new Error("本机回调签名密钥不可用");
    await Fr("production_webhook_deliver", {
      url: n.callbackUrl,
      payload: r,
      secret: o.token
    }), uoe(e, {
      webhookStatus: "delivered",
      webhookAttempts: a,
      webhookError: "",
      webhookDeliveredAt: Date.now()
    });
  } catch (i) {
    if (uoe(e, {
      webhookStatus: "failed",
      webhookAttempts: a,
      webhookError: i instanceof Error ? i.message : String(i)
    }), y$ && a < 3) {
      const o = H1e.get(e);
      o != null && window.clearTimeout(o);
      const s = window.setTimeout(() => {
        H1e.delete(e), npr(e);
      }, a === 1 ? 1500 : 5e3);
      H1e.set(e, s);
    }
  } finally {
    Oje.delete(e), Wz();
  }
}

function oAt() {
  var n;
  Wz();
  const e = hpe();
  if (!e || !aAt.has(e.status) || e.status === "completed" && ((n = e.delivery) != null && n.config.autoSave) && (e.delivery.status === "pending" || e.delivery.status === "saving")) return;
  const t = Ppe().requests.filter(r => r.action === "start_recipe" && r.status === "succeeded" && r.resultRunId === e.id && !!r.callbackUrl && r.webhookStatus !== "delivered" && (r.webhookAttempts ?? 0) < 3);
  for (const r of t) npr(r.commandId, e);
}

function M7i(e) {
  return new Promise(t => {
    window.dispatchEvent(new CustomEvent("productionRecipeExecuteRequested", {
      detail: {
        recipeId: e.recipeId,
        source: "api",
        bindings: e.bindings,
        externalInputs: e.inputs,
        resolve: t
      }
    }));
  });
}

function P7i(e) {
  const t = hpe();
  if (!e) throw new Error("runId 不能为空");
  if (!t || t.id !== e) throw new Error("当前没有这个可控制的生产任务");
  return t;
}

function UMe(e, t, n) {
  const r = Ug(e, t, n);
  return ex(r), R5({
    run: r
  }), r;
}

async function R7i(e) {
  var a;
  if (e.action === "start_recipe") {
    if (!e.recipeId || !Spe(e.recipeId)) throw new Error("Recipe 不存在或已被删除");
    const i = await M7i(e);
    if (!i.ok) throw new Error(i.error || "Recipe 启动失败");
    return i.runId;
  }
  const t = P7i(e.runId);
  if (e.action === "pause_run") {
    if (aAt.has(t.status)) throw new Error("已结束的任务不能暂停");
    return CLt({
      runId: t.id
    }), UMe(t, "paused", "本机 API 暂停了生产任务"), window.dispatchEvent(new CustomEvent("productionRunPauseRequested", {
      detail: {
        runId: t.id
      }
    })), t.id;
  }
  if (e.action === "resume_run") {
    if (aAt.has(t.status)) throw new Error("已结束的任务不能继续");
    Cze({
      runId: t.id
    });
    const i = tke(t.id);
    return UMe(t, i.running + i.queued > 0 ? "waiting_generation" : "running", "本机 API 继续生产任务"), window.dispatchEvent(new CustomEvent("productionRunResumeRequested", {
      detail: {
        runId: t.id
      }
    })), t.id;
  }
  if (e.action === "cancel_run") {
    if (t.status === "completed") throw new Error("已完成的任务不能取消");
    return WZn({
      runId: t.id
    }), UMe(t, "paused", "本机 API 已取消未提交步骤"), window.dispatchEvent(new CustomEvent("productionRunPauseRequested", {
      detail: {
        runId: t.id
      }
    })), t.id;
  }
  let r = KZn(t.id).length > 0;
  if (((a = t.delivery) == null ? void 0 : a.status) === "failed" && t.delivery.config.directory && (u0i(t.id), r = !0), !r && (t.status === "failed" || t.status === "paused") && (Cze({
    runId: t.id
  }), UMe(t, "running", "本机 API 正在重试失败任务"), window.dispatchEvent(new CustomEvent("productionRunResumeRequested", {
    detail: {
      runId: t.id
    }
  })), r = !0), !r) throw new Error("当前任务没有可重试的失败步骤");
  return t.id;
}

async function N7i(e) {
  const t = Zhr(e);
  if (!t) return;
  if (S7i(t).duplicate) {
    Wz();
    return;
  }
  uoe(t.commandId, {
    status: "running",
    error: void 0
  }), Wz();
  try {
    const r = await R7i(t);
    uoe(t.commandId, {
      status: "succeeded",
      resultRunId: r,
      error: void 0
    }), oAt();
  } catch (r) {
    uoe(t.commandId, {
      status: "failed",
      error: r instanceof Error ? r.message : String(r)
    });
  }
  Wz();
}

function rpr(e) {
  const t = Zhr(e),
    n = () => N7i(t ?? e).catch(r => console.warn("[ProductionAPI] 处理外部命令失败:", r));
  (t == null ? void 0 : t.action) === "start_recipe" ? Run = Run.then(n, n) : n();
}

function Nst() {
  const e = Ppe().settings,
    t = JSON.stringify([e.enabled, e.scopes]);
  t !== iAt && (iAt = t, hj = !1, T7i()), Wz();
}

async function j7i() {
  if (c$e()) try {
    const {
        listen: e
      } = await Ie(async () => {
        const {
          listen: n
        } = await Promise.resolve().then(() => KKe);
        return {
          listen: n
        };
      }, void 0, import.meta.url),
      t = await e(ozt, n => rpr(n.payload));
    if (!y$) {
      t();
      return;
    }
    Rye = t, WJe = !0;
  } catch (e) {
    console.warn("[ProductionAPI] 无法监听桌面生产命令:", e);
  }
}

function D7i() {
  return y$ || (y$ = !0, hj = !1, iAt = "", WJe = !c$e(), V1e = e => rpr(e.detail), window.addEventListener(ozt, V1e), Nye = A7i(Nst), jye = tyi(Wz), Dye = wXe(oAt), Lye = pCe(Wz), c$e() ? j7i().finally(Nst) : Nst(), oAt()), Nun;
}

function Nun() {
  y$ = !1, MW != null && window.clearTimeout(MW), MW = null;
  for (const e of H1e.values()) window.clearTimeout(e);
  H1e.clear(), Oje.clear(), V1e && (window.removeEventListener(ozt, V1e), V1e = null), Rye == null || Rye(), Rye = null, Nye == null || Nye(), jye == null || jye(), Dye == null || Dye(), Lye == null || Lye(), Nye = null, jye = null, Dye = null, Lye = null, WJe = !1;
}

function L7i() {
  return g.useEffect(() => {
    const e = h7i(),
      t = D7i();
    return () => {
      t(), e();
    };
  }, []), null;
}

const O7i = new Set(["input-image", "gen-image", "create-character", "create-scene", "generate-character-image", "generate-scene-image", "image-compare", "image-tile", "inpaint-crop", "inpaint-stitch", "virtual-try-on"]),
  B7i = new Set(["video-input", "video-timeline", "video-analyze", "shot-breakdown", "gen-video", "motion-control", "generate-character-video", "generate-scene-video"]),
  F7i = new Set(["gen-music", "gen-speech"]),
  z7i = new Set(["text-node", "novel-input", "character-description", "scene-description", "table-editor-node", "storyboard-chart-node", "script-parse"]);

function U7i(e) {
  return new Set(Array.from(e, t => String(t || "").trim()).filter(Boolean));
}

function $7i(e, t) {
  const n = U7i(t),
    r = new Set(e.map(i => i.id)),
    a = {
      nodeCount: e.length,
      selectedCount: Array.from(n).filter(i => r.has(i)).length,
      imageCount: 0,
      videoCount: 0,
      audioCount: 0,
      textCount: 0
    };
  for (const i of e) {
    const o = i.type === "preview" ? i.previewType : void 0;
    (O7i.has(i.type) || o === "image") && (a.imageCount += 1), (B7i.has(i.type) || o === "video") && (a.videoCount += 1), (F7i.has(i.type) || o === "audio") && (a.audioCount += 1), z7i.has(i.type) && (a.textCount += 1);
  }
  return a;
}

function G7i(e) {
  const t = [e.imageCount > 0 ? `${e.imageCount} 张图片` : "", e.videoCount > 0 ? `${e.videoCount} 个视频` : "", e.audioCount > 0 ? `${e.audioCount} 段音频` : "", e.textCount > 0 ? `${e.textCount} 段文字` : ""].filter(Boolean);
  return e.nodeCount === 0 ? "当前画布是空的，可以直接描述想生产的内容" : [`已理解画布中的 ${e.nodeCount} 个节点`, ...t, e.selectedCount > 0 ? `已选中 ${e.selectedCount} 个` : ""].filter(Boolean).join(" · ");
}

function V7i(e) {
  const t = [];
  e.selectedCount > 0 && t.push({
    id: "selected-best-path",
    title: "用选中素材开始",
    description: `分析已选中的 ${e.selectedCount} 个素材，自动选择合适的生产流程`,
    prompt: `使用我当前选中的 ${e.selectedCount} 个素材作为参考图，先看清内容和职责，再创建成品节点、把参考图连到每个成品，写入完整画面提示词后提交生成。`
  }), e.imageCount >= 2 ? t.push({
    id: "image-series",
    title: "统一风格并出多版",
    description: "保持主体一致，生成便于对比和挑选的成品",
    prompt: `分析画布中的 ${e.imageCount} 张图片，统一主体和视觉风格，生成 3 版可对比的成品。每个成品节点都要连上实际用到的参考图，并写完整画面提示词。`
  }) : e.imageCount === 1 && t.push({
    id: "image-variants",
    title: "扩展这张参考图",
    description: "基于现有参考图生成三种方向",
    prompt: "以画布中的参考图为核心，先提炼主体与风格，再生成 3 个差异明确的视觉方案。创建成品后把参考图连上，再写入完整画面提示词并提交。"
  }), e.textCount > 0 && e.imageCount > 0 ? t.push({
    id: "copy-key-visual",
    title: "文案配套主视觉",
    description: "结合画布文案与图片，产出完整视觉方案",
    prompt: "结合画布中的文案和参考图，生成一套匹配内容重点的主视觉。成品节点必须连上参考图，提示词只写最终画面。"
  }) : e.textCount > 0 && t.push({
    id: "copy-to-visual",
    title: "把文案变成画面",
    description: "提炼信息层级并生成配套视觉",
    prompt: "分析画布中的文字内容，提炼核心信息和视觉方向，生成一套可直接继续制作的画面方案。"
  }), e.videoCount > 0 && t.push({
    id: "video-storyboard",
    title: "整理视频与分镜",
    description: "分析现有视频，生成镜头拆解和下一步素材",
    prompt: "分析画布中的视频素材，整理关键镜头和节奏，生成可继续制作的分镜与补充素材方案。"
  });
  const n = [{
    id: "poster-set",
    title: "生成一组主视觉",
    description: "从目标出发建立参考、方案和成品区",
    prompt: "帮我生成一组主视觉方案。先看清画布参考，再创建成品节点、连上参考图、写入画面提示词并提交。"
  }, {
    id: "character-sheet",
    title: "制作角色设定",
    description: "生成角色方向、设定图与可复用素材",
    prompt: "帮我制作一套角色设定。先明确角色方向，再生成设定图；若画布已有参考图，先连线再提交生成。"
  }, {
    id: "social-sizes",
    title: "制作多尺寸物料",
    description: "从一个视觉方向扩展成多画幅版本",
    prompt: "帮我制作一套多尺寸社交媒体物料，保持主体和风格一致。每个尺寸的成品都要连上参考图后再生成。"
  }];
  for (const r of n) {
    if (t.length >= 3) break;
    t.push(r);
  }
  return t.slice(0, 3);
}

function H7i(e, t) {
  const n = String(e || "").replace(/\s+/g, " ").trim();
  if (!n) return "";
  const r = t.selectedCount > 0 ? `优先使用当前选中的 ${t.selectedCount} 个素材作为参考图；除非任务确实需要，再读取画布里的其他相关内容。` : t.nodeCount > 0 ? "先读取当前画布已有参考图（不要求节点名叫「参考图N」），尽量复用已有内容。" : "当前画布没有素材，请从目标出发建立清晰的生产结构。",
    a = t.imageCount > 0 ? "每个新 gen-image 都要按「创建 → connect_nodes/connect_multi_refs 连上实际用到的参考图 → 写入最终画面提示词 → run_generation」执行；禁止只建节点不连线就提交，也禁止把执行计划写进 payload.prompt。" : "先给出简短计划，再直接完成可以安全执行的步骤。";
  return `${n}

执行方式：${r} ${a} 只有关键选择或高风险操作才询问我。`;
}

function W7i(e) {
  on();
  const t = Qlr();
  return t.open && (t.tab === "current" || t.tab === "permissions") ? c.jsx(q7i, {
    ...e,
    center: t
  }) : null;
}

function q7i({
  isDark: e,
  nodes: t,
  selectedNodeIds: n,
  center: r
}) {
  on();
  const a = rZn(),
    aiyouPendingRecipeDiff = Wja(),
    [i, o] = g.useState(""),
    [s, l] = g.useState(HS),
    [d, u] = g.useState(DP),
    h = g.useMemo(() => $7i(t, n), [t, n]),
    p = g.useMemo(() => V7i(h), [h]),
    m = q2e(),
    f = b => {
      const v = H7i(b, h);
      v && (window.dispatchEvent(new CustomEvent("productionRecipeRunRequested", {
        detail: {
          brief: v,
          canvasReferenceNodeIds: [...n]
        }
      })), o(""), vUe());
    },
    y = (b, v) => {
      const _ = pQe({
        [b]: v
      });
      u(_);
    };
  return c.jsxs("aside", {
    className: `production-history-panel production-center-panel ${e ? "is-dark" : "is-light"}`,
    "aria-label": x("智能生产"),
    children: [c.jsxs("header", {
      className: "production-history-panel__head",
      children: [c.jsxs("strong", {
        children: [c.jsx(ac, {
          size: 15
        }), x(" 智能生产")]
      }), c.jsx("button", {
        type: "button",
        className: "production-panel-close",
        onClick: vUe,
        title: x("关闭"),
        children: c.jsx(Na, {
          size: 14
        })
      })]
    }), aiyouPendingRecipeDiff && c.jsxs("section", {
      className: "production-diff-approval aiyou-recipe-approval",
      style: { position: "relative", inset: "auto", margin: "12px", width: "auto", maxWidth: "100%", display: "block" },
      children: [c.jsxs("div", {
        className: "production-diff-approval__copy",
        children: [c.jsx("strong", { children: aiyouPendingRecipeDiff.title }),
          c.jsx("p", { children: aiyouPendingRecipeDiff.summary }),
          c.jsx("ul", { children: (aiyouPendingRecipeDiff.operations || []).map(operation => c.jsx("li", { children: operation.label }, operation.id)) })]
      }), c.jsxs("div", {
        className: "production-diff-approval__actions",
        children: [c.jsx("button", { type: "button", onClick: () => brn(aiyouPendingRecipeDiff.id, false), children: x("取消") }),
          c.jsx("button", { type: "button", className: "is-primary", onClick: () => brn(aiyouPendingRecipeDiff.id, true), children: x("应用改动") })]
      })]
    }), c.jsx(cCi, {}), r.tab === "current" ? c.jsx("div", {
      className: "production-center-current",
      children: c.jsx(K7i, {
        goal: i,
        onGoalChange: o,
        onStart: f,
        canvasSummary: G7i(h),
        suggestions: p
      })
    }) : c.jsxs("div", {
      className: "production-center-permissions",
      children: [c.jsxs("section", {
        className: "production-center-settings-intro",
        children: [c.jsx("h4", {
          children: x("选择 Agent 可以自动做到哪一步")
        }), c.jsx("p", {
          children: x("建议先用“受监督”：确认一次方案后，安全步骤由 Agent 自动完成。")
        })]
      }), c.jsxs("section", {
        children: [c.jsx("h4", {
          children: x("画布操作方式")
        }), c.jsx("div", {
          className: "production-center-permission-grid",
          children: mie.map(b => c.jsxs("button", {
            type: "button",
            className: s === b.value ? "is-selected" : "",
            onClick: () => {
              l(b.value), a ? nZn(a.id, b.value) : Mzn(b.value);
            },
            children: [c.jsx("strong", {
              children: b.title
            }), c.jsx("span", {
              children: b.description
            })]
          }, b.value))
        })]
      }), c.jsxs("section", {
        children: [c.jsx("h4", {
          children: x("跨功能访问")
        }), c.jsx(jun, {
          label: x("Local Skill 使用画布"),
          value: d.skillCanvasAccess,
          onChange: b => y("skillCanvasAccess", b)
        }), c.jsx(jun, {
          label: x("画布 Agent 使用本地文件"),
          value: d.canvasFileAccess,
          onChange: b => y("canvasFileAccess", b)
        })]
      }), c.jsxs("section", {
        className: "production-center-workspace",
        children: [c.jsxs("h4", {
          children: [c.jsx(_h, {
            size: 12
          }), x(" 当前文件工作区")]
        }), c.jsx("p", {
          title: m,
          children: m || x("尚未绑定；可在 Local Skill 中选择目录")
        })]
      })]
    })]
  });
}

function K7i({
  goal: e,
  onGoalChange: t,
  onStart: n,
  canvasSummary: r,
  suggestions: a
}) {
  return on(), c.jsxs(c.Fragment, {
    children: [c.jsxs("section", {
      className: "production-center-start-hero",
      children: [c.jsxs("div", {
        className: "production-center-howto",
        "aria-label": x("使用步骤"),
        children: [c.jsxs("span", {
          children: [c.jsx("b", {
            children: "1"
          }), x(" 选中参考素材")]
        }), c.jsx("i", {}), c.jsxs("span", {
          children: [c.jsx("b", {
            children: "2"
          }), x(" 描述想要的结果")]
        }), c.jsx("i", {}), c.jsxs("span", {
          children: [c.jsx("b", {
            children: "3"
          }), x(" 开始")]
        })]
      }), c.jsxs("div", {
        className: "production-center-start-hero__title",
        children: [c.jsx("span", {
          children: c.jsx(ac, {
            size: 15
          })
        }), c.jsxs("div", {
          children: [c.jsx("strong", {
            children: x("描述你想完成的内容")
          }), c.jsx("small", {
            children: r
          })]
        })]
      }), c.jsx("textarea", {
        value: e,
        onChange: i => t(i.target.value),
        onKeyDown: i => {
          (i.ctrlKey || i.metaKey) && i.key === "Enter" && n(e);
        },
        placeholder: x("例如：用选中的两张参考图，生成三版黑猫主题海报"),
        "aria-label": x("描述你想完成的内容"),
        title: x("拖动右下角可调整输入框高度；Ctrl+Enter 开始"),
        rows: 4,
        autoFocus: !0
      }), c.jsxs("div", {
        className: "production-center-start-actions",
        children: [c.jsx("span", {
          children: x("Agent 会读取选中的素材并在画布执行")
        }), c.jsxs("button", {
          type: "button",
          className: "is-primary",
          disabled: !e.trim(),
          onClick: () => n(e),
          children: [x("开始 "), c.jsx(H7, {
            size: 14
          })]
        })]
      })]
    }), c.jsxs("details", {
      className: "production-center-suggestions",
      children: [c.jsxs("summary", {
        children: [c.jsxs("span", {
          children: [c.jsx(ac, {
            size: 13
          }), x(" 不知道怎么写？试试推荐任务")]
        }), c.jsx(Mi, {
          size: 13
        })]
      }), c.jsx("div", {
        className: "production-center-suggestion-grid",
        children: a.map(i => c.jsxs("button", {
          type: "button",
          onClick: () => t(i.prompt),
          children: [c.jsxs("span", {
            children: [c.jsx("strong", {
              children: i.title
            }), c.jsx("small", {
              children: i.description
            })]
          }), c.jsx(H7, {
            size: 13
          })]
        }, i.id))
      })]
    }), c.jsx("section", {
      className: "production-center-home-links",
      children: [c.jsx("button", {
        type: "button", onClick: () => {
          vUe(); window.dispatchEvent(new CustomEvent("aiyouplus-open-local", { detail: { tab: "production" } }));
        }, children: x("模板与自动任务")
      }), c.jsxs("button", {
        type: "button",
        onClick: () => qP("permissions"),
        children: [c.jsx(Pj, {
          size: 15
        }), c.jsxs("span", {
          children: [c.jsx("strong", {
            children: x("Agent 权限")
          }), c.jsx("small", {
            children: x("设置哪些步骤可以自动执行")
          })]
        }), c.jsx(H7, {
          size: 13
        })]
      })]
    })]
  });
}

function jun({
  label: e,
  value: t,
  onChange: n
}) {
  return on(), c.jsxs("div", {
    className: "production-center-cross-call",
    children: [c.jsx("span", {
      children: e
    }), c.jsx("div", {
      children: CRt.map(r => c.jsx("button", {
        type: "button",
        className: t === r.value ? "is-selected" : "",
        title: x(r.description),
        onClick: () => n(r.value),
        children: x(r.title)
      }, r.value))
    })]
  });
}

// Bounded UI facade over the recovered recipe, trigger and run stores.
// Templates contain node settings only; API credentials never enter this facade.
if (typeof window !== "undefined") window.__AIYOUPLUS_PRODUCTION__ = Object.freeze({
  version: 1,
  snapshot() {
    const document = typeof aje === "function" ? aje() : { nodes: [], connections: [] };
    return structuredClone({ persistenceReady: GZ("recipes").ready, recipes: nyi(), triggers: qQ(), activeRun: hpe(), history: tZn(),
      nodes: document.nodes.map(node => ({ id: node.id, type: node.type, name: node.nodeName || node.type })),
      api: { ...Ppe().settings }, requests: Ppe().requests });
  },
  saveRecipe(value) {
    const recipe = _0i(value);
    if (!recipe || !recipe.slots.some(slot => slot.role === "output")) throw new Error("模板需要名称和至少一个输出");
    const previous = Spe(recipe.id), now = Date.now();
    recipe.updatedAt = now;
    recipe.currentVersion = previous ? previous.currentVersion + 1 : 1;
    recipe.versions = [...(previous?.versions || []), { version: recipe.currentVersion, createdAt: now, summary: previous ? "本地编辑" : "本地创建" }].slice(-20);
    return structuredClone(eyi(recipe));
  },
  createFromCanvas(spec) {
    if (typeof aje !== "function") throw new Error("请先打开画布再保存模板");
    const document = aje(), roles = spec.roles || {}, inputs = [], outputs = [], map = new Map();
    for (const node of document.nodes) {
      const role = roles[node.id];
      if (role !== "input" && role !== "output") continue;
      const kind = node.type === "text-node" ? "text" : /video|timeline|motion/.test(node.type) ? "video" : /speech|music|audio/.test(node.type) ? "audio" : "image";
      if (!A1e(kind, role).includes(node.type)) throw new Error(`「${node.nodeName || node.type}」暂不支持作为${role === "input" ? "输入" : "输出"}槽`);
      const slot = { id: `slot-${role}-${map.size + 1}`, role, kind, label: node.nodeName || node.type,
        nodeType: node.type, required: true, ...(role === "input" ? { boundNodeId: node.id, inputMode: spec.inputMode || "fixed" } : { generation: g0i(node) }) };
      map.set(node.id, slot); (role === "input" ? inputs : outputs).push(slot);
    }
    for (const [nodeId, slot] of map) if (slot.role === "output") slot.references = document.connections.filter(edge => edge.to === nodeId && map.get(edge.from)?.role === "input").map(edge => ({ inputSlotId: map.get(edge.from).id, inputType: edge.inputType, referenceRole: edge.referenceRole }));
    return this.saveRecipe({ id: spec.id || `recipe-local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: spec.name, goal: spec.goal || spec.name,
      slots: [...inputs, ...outputs], steps: [{ id: "step-1", action: "produce", summary: spec.goal || spec.name, slotIds: outputs.map(slot => slot.id) }],
      output: { autoSave: !!spec.outputDirectory, directory: spec.outputDirectory || "", collisionPolicy: "increment" },
      executionMode: "direct", planningMode: "manual", reviewMode: "human", createdAt: Date.now() });
  },
  deleteRecipe(id) {
    if (qQ().items.some(item => item.recipeId === id)) throw new Error("请先移除使用此模板的自动任务");
    Z0i(nyi().filter(recipe => recipe.id !== id)); Y0i();
  },
  execute(id) {
    if (typeof aje !== "function") throw new Error("请先打开画布，再执行模板");
    if (!Spe(id)) throw new Error("模板已不存在");
    return new Promise(resolve => window.dispatchEvent(new CustomEvent("productionRecipeExecuteRequested", { detail: { recipeId: id, source: "panel", resolve } })));
  },
  async control(action, runId) {
    if (!["pause_run", "resume_run", "cancel_run", "retry_run"].includes(action)) throw new Error("不支持的任务操作");
    return R7i({ action, runId });
  },
  async saveTrigger(value) {
    if (!Spe(value.recipeId)) throw new Error("请先选择有效模板");
    if (value.kind === "watch_folder" && !String(value.folderPath || "").trim()) throw new Error("请选择要监视的文件夹");
    const trigger = Hhr({ ...value, id: value.id || `trigger-local-${Date.now()}`, updatedAt: Date.now() });
    if (!trigger) throw new Error("自动任务类型无效");
    VNi({ ...qQ(), items: [trigger, ...qQ().items.filter(item => item.id !== trigger.id)] });
    await Qhr("production_trigger_runtime_sync"); return structuredClone(trigger);
  },
  async deleteTrigger(id) {
    VNi({ ...qQ(), items: qQ().items.filter(item => item.id !== id) });
    await Qhr("production_trigger_runtime_sync");
  },
  async runTrigger(id) { return window.__TAURI_INTERNALS__.invoke("production_trigger_runtime_run_now", { triggerId: id }); },
  async setApi(enabled, scopes) {
    if (enabled && typeof aje !== "function") throw new Error("请先打开需要接收生产任务的画布");
    const settings = { enabled: enabled === true, scopes: b7i(scopes) };
    rAt({ ...Ppe(), settings });
    const value = await window.__TAURI_INTERNALS__.invoke("production_api_gateway_configure", settings);
    Wz(); return { enabled: value.enabled, baseUrl: value.baseUrl, scopes: value.scopes };
  }
});

function Q7i({
  isDark: e,
  hidden: t = !1
}) {
  on();
  const n = S5e();
  return t || n ? null : c.jsxs("button", {
    type: "button",
    className: `canvas-ai-orb ${e ? "canvas-ai-orb--dark" : "canvas-ai-orb--light"}`,
    onClick: r => {
      r.preventDefault(), r.stopPropagation(), jTn();
    },
    onMouseEnter: Zmt,
    onFocus: Zmt,
    "aria-label": x("打开 AI 对话"),
    children: [c.jsxs("span", {
      className: "canvas-ai-orb__wave",
      "aria-hidden": !0,
      children: [c.jsx("i", {}), c.jsx("i", {}), c.jsx("i", {}), c.jsx("i", {}), c.jsx("i", {})]
    }), c.jsx("span", {
      className: "canvas-ai-orb__label",
      "aria-hidden": !0,
      children: x("AI 对话")
    })]
  });
}

const Y7i = "qiaodoumayi-desktop-pets",
  b$ = "sheets",
  X7i = 1;

function szt() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("当前环境不支持 IndexedDB"));
      return;
    }
    const n = indexedDB.open(Y7i, X7i);
    n.onupgradeneeded = () => {
      const r = n.result;
      r.objectStoreNames.contains(b$) || r.createObjectStore(b$);
    }, n.onsuccess = () => e(n.result), n.onerror = () => t(n.error || new Error("打开桌宠资源库失败"));
  });
}

function lzt(e) {
  return new Promise((t, n) => {
    e.onsuccess = () => t(e.result), e.onerror = () => n(e.error || new Error("桌宠资源读写失败"));
  });
}

async function J7i(e, t) {
  const n = await szt();
  try {
    await lzt(n.transaction(b$, "readwrite").objectStore(b$).put(t, e));
  } finally {
    n.close();
  }
}

async function apr(e) {
  const t = await szt();
  try {
    const n = await lzt(t.transaction(b$, "readonly").objectStore(b$).get(e));
    return n instanceof Blob ? n : null;
  } finally {
    t.close();
  }
}

async function Z7i(e) {
  const t = await szt();
  try {
    await lzt(t.transaction(b$, "readwrite").objectStore(b$).delete(e));
  } finally {
    t.close();
  }
}

const eji = 2800,
  tji = 3600;

function nji(e) {
  const t = T5e(),
    n = TRt(),
    [r, a] = g.useState(null),
    i = g.useRef(!1);
  return g.useEffect(() => {
    if (e === "off") {
      i.current = !1, a(null);
      return;
    }
    if (al.hasActiveGeneratingTasks()) {
      i.current = !0, a(null);
      return;
    }
    if (!i.current) return;
    i.current = !1;
    const s = al.getLatestTerminalSnapshot();
    (s == null ? void 0 : s.status) === "failed" ? a({
      mood: "failed",
      until: Date.now() + tji
    }) : (s == null ? void 0 : s.status) === "completed" && a({
      mood: "success",
      until: Date.now() + eji
    });
  }, [e, t]), g.useEffect(() => {
    if (!r) return;
    const o = Math.max(0, r.until - Date.now()),
      s = window.setTimeout(() => a(null), o);
    return () => window.clearTimeout(s);
  }, [r]), e === "off" ? "idle" : al.hasActiveGeneratingTasks() ? "generating" : e === "all" && n ? "waiting" : r && r.until > Date.now() ? r.mood : "idle";
}

function ipr({
  src: e,
  atlas: t,
  presentation: n,
  scale: r,
  className: a,
  paused: i = !1,
  restBetweenLoops: o = !1,
  onTransientEnd: s
}) {
  const [l, d] = g.useState(0),
    [u, h] = g.useState(() => !document.hidden),
    p = g.useRef(0),
    m = g.useRef(0),
    f = g.useRef(0),
    y = g.useRef(0),
    b = `${n.action}:${n.row}:${n.frames}`;
  g.useEffect(() => {
    const k = () => h(!document.hidden);
    return document.addEventListener("visibilitychange", k), () => document.removeEventListener("visibilitychange", k);
  }, []), g.useEffect(() => {
    p.current = 0, m.current = 0, f.current = 0, y.current = 0, d(0);
  }, [b, e]), g.useEffect(() => {
    i && (p.current = 0, m.current = 0, f.current = 0, y.current = 0, d(0));
  }, [i]), g.useEffect(() => {
    if (i || !u || n.frames <= 1) return;
    f.current = 0;
    let k = 0;
    const A = S => {
      if (o && S < y.current) {
        f.current = 0, k = window.requestAnimationFrame(A);
        return;
      }
      const C = f.current;
      f.current = S;
      const I = C ? Math.min(S - C, _Mi) : 0;
      m.current += I;
      const E = 1e3 / Math.max(1, n.fps);
      let M = 0,
        T = p.current,
        P = !1;
      for (; m.current >= E && M < kMi;) {
        m.current -= E;
        const R = SMi(T, n.frames, n.loop);
        if (o && n.loop && R.frame < T) {
          T = 0, y.current = S + Ehr(), m.current = 0;
          break;
        }
        if (T = R.frame, P = R.done, M += 1, P) break;
      }
      if (T !== p.current && (p.current = T, d(T)), P) {
        s == null || s();
        return;
      }
      k = window.requestAnimationFrame(A);
    };
    return k = window.requestAnimationFrame(A), () => window.cancelAnimationFrame(k);
  }, [i, u, o, n.frames, n.fps, n.loop, b, s]);
  const v = n.action === "look" ? n.col : l,
    _ = t.cellW * r,
    w = t.cellH * r;
  return c.jsx("div", {
    className: a,
    style: {
      width: _,
      height: w,
      overflow: "hidden"
    },
    children: c.jsx("img", {
      src: e,
      alt: "",
      draggable: !1,
      style: {
        display: "block",
        width: t.width * r,
        height: t.height * r,
        maxWidth: "none",
        transform: `translate(${-v * t.cellW * r}px, ${-n.row * t.cellH * r}px)`,
        pointerEvents: "none",
        userSelect: "none"
      }
    })
  });
}

function rji(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => t({
      width: r.naturalWidth,
      height: r.naturalHeight
    }), r.onerror = () => n(new Error("桌宠图集加载失败")), r.src = e;
  });
}

function aji({
  isDark: e,
  hidden: t = !1
}) {
  const n = jYe(),
    r = WXn(),
    a = Aba(n, t),
    i = SJt(),
    o = nji(n.linkMode),
    s = (a == null ? void 0 : a.kind) === "error" ? "failed" : (a == null ? void 0 : a.kind) === "success" ? "success" : r.thinking ? "thinking" : o,
    l = S5e(),
    [d, u] = g.useState(i.spritesheetUrl || null),
    [h, p] = g.useState(null),
    [m, f] = g.useState(null),
    [y, b] = g.useState(null),
    [v, _] = g.useState(n.pos),
    [w, k] = g.useState(!1),
    [A, S] = g.useState("none"),
    [C, I] = g.useState(0),
    [E, M] = g.useState(!1),
    [T, P] = g.useState(null),
    [R, j] = g.useState({
      width: window.innerWidth,
      height: window.innerHeight
    }),
    B = g.useRef(null),
    F = g.useRef(null),
    N = g.useRef(null),
    G = g.useRef(0);
  g.useEffect(() => {
    if (!n.enabled) {
      u(null), p(null);
      return;
    }
    let we = !1,
      X = null;
    u(null), p(null);
    const Z = SJt();
    return (async () => {
      let fe = Z.spritesheetUrl || null;
      if (Z.source === "imported") {
        const ie = await apr(Z.id);
        ie && !we && (fe = URL.createObjectURL(ie), X = fe);
      }
      if (!fe || we) return;
      const ye = await rji(fe);
      we || (u(fe), p(sjt(ye.width, ye.height, Z.spriteVersionNumber)));
    })().catch(() => {
      we || (u(null), p(null));
    }), () => {
      we = !0, X && URL.revokeObjectURL(X);
    };
  }, [n.activePetId, n.enabled]);
  const z = g.useMemo(() => h ? TMi(n.size, h.cellW, h.cellH) : {
      width: 88,
      height: 96,
      scale: 96 / 208
    }, [h, n.size]),
    V = l ? Qge() + 24 : 88,
    O = g.useMemo(() => {
      const we = R.width,
        X = R.height,
        Z = v || CMi(z.width, z.height, we, X, V);
      return Tje(Z.x, Z.y, z.width, z.height, we - (l ? Qge() : 0), X, 0);
    }, [v, z.width, z.height, l, V, R]);
  g.useEffect(() => {
    const we = () => j({
      width: window.innerWidth,
      height: window.innerHeight
    });
    return window.addEventListener("resize", we), () => window.removeEventListener("resize", we);
  }, []), g.useEffect(() => {
    const we = !!(n.enabled && !t && d && h);
    return IJt(we), () => IJt(!1);
  }, [n.enabled, t, d, h]);
  const L = g.useMemo(() => Mhr({
      mood: s,
      dragging: w,
      dragDir: A,
      lookIndex: n.lookAtPointer && !E ? y : null,
      transient: m,
      hasLookRows: !!(h != null && h.hasLookRows),
      idleAction: T
    }), [s, w, A, y, m, h == null ? void 0 : h.hasLookRows, n.lookAtPointer, E, T]),
    D = (s === "idle" || s === "thinking" || s === "generating" || s === "waiting") && !w && !m && !t,
    U = n.hoverAnimate && !E && s === "idle",
    H = s === "idle" ? n.hoverAnimate ? "hover" : "idle" : "busy",
    Y = g.useCallback(we => {
      G.current && window.clearTimeout(G.current);
      const X = we ? 60 : Ehr(Math.random, H);
      G.current = window.setTimeout(() => {
        const Z = H === "busy" ? vMi(N.current) : bMi(N.current);
        N.current = Z, P(Z);
      }, X);
    }, [H]);
  g.useEffect(() => {
    if (!D || U) {
      G.current && window.clearTimeout(G.current), G.current = 0, P(null);
      return;
    }
    return Y(H !== "idle"), () => {
      G.current && window.clearTimeout(G.current), G.current = 0;
    };
  }, [D, U, H, Y]), g.useEffect(() => {
    if (!n.lookAtPointer || w || m || s !== "idle") {
      b(null);
      return;
    }
    const we = X => {
      b(IMi(O.x + z.width / 2, O.y + z.height * .42, X.clientX, X.clientY));
    };
    return window.addEventListener("pointermove", we, {
      passive: !0
    }), () => window.removeEventListener("pointermove", we);
  }, [n.lookAtPointer, w, m, s, O.x, O.y, z.width, z.height]);
  const K = {
      ...O,
      width: z.width,
      height: z.height
    },
    W = (we = !1) => bRa(we, K);
  g.useEffect(() => {
    gRa(K);
  }, [O.x, O.y, z.width, z.height]);
  const Q = g.useCallback(() => {
      if (m) {
        f(null);
        return;
      }
      D && (P(null), Y(!1));
    }, [m, D, Y]),
    q = we => {
      var X;
      we.button !== 0 || we.target.closest("button") || Fnn(we.target, we.clientX, we.clientY) || (we.preventDefault(), we.stopPropagation(), (X = F.current) == null || X.setPointerCapture(we.pointerId), B.current = {
        pointerId: we.pointerId,
        startX: we.clientX,
        startY: we.clientY,
        originX: O.x,
        originY: O.y,
        moved: !1
      });
    },
    ne = we => {
      const X = B.current;
      if (!X || we.pointerId !== X.pointerId) return;
      const Z = we.clientX - X.startX,
        re = we.clientY - X.startY;
      if (!X.moved && Math.hypot(Z, re) < wMi) return;
      X.moved = !0, k(!0), S(AMi(Z, re)), I(Math.max(-16, Math.min(16, Z * .08)));
      const fe = window.innerWidth - (l ? Qge() : 0);
      _(Tje(X.originX + Z, X.originY + re, z.width, z.height, fe, window.innerHeight, 0));
    },
    de = we => {
      var re;
      const X = B.current;
      if (!X || we.pointerId !== X.pointerId) return;
      if ((re = F.current) != null && re.hasPointerCapture(we.pointerId) && F.current.releasePointerCapture(we.pointerId), B.current = null, k(!1), S("none"), I(0), !X.moved && we.type !== "pointercancel") {
        if (Fnn(we.target, we.clientX, we.clientY)) return;
        f("waving"), r.open ? bH() : W();
        return;
      }
      const Z = we.type === "pointercancel" ? v || O : Tje(X.originX + we.clientX - X.startX, X.originY + we.clientY - X.startY, z.width, z.height, window.innerWidth - (l ? Qge() : 0), window.innerHeight, 0);
      _(Z), $8({
        pos: Z
      });
    };
  if (t || !n.enabled || !d || !h) return null;
  const le = (a == null ? void 0 : a.text) || (s === "thinking" && !r.open ? Mst(s) : null) || (o === "generating" && n.notifyGeneration || o === "waiting" && n.notifyAgent ? Mst(o) : null),
    J = s === "generating" || s === "waiting" || s === "thinking" ? "busy" : s === "failed" ? "error" : s === "success" ? "success" : "",
    pe = typeof window > "u" ? 1280 : window.innerWidth,
    ce = O.x < 160 ? "left" : O.x > pe - 280 ? "right" : "";
  return c.jsxs("div", {
    ref: F,
    className: `desktop-pet ${w ? "is-dragging" : "is-idle"}`,
    style: {
      left: O.x,
      top: O.y,
      transform: C ? `perspective(340px) rotateY(${C}deg)` : void 0
    },
    tabIndex: 0,
    onKeyDown: we => {
      (we.key === "Enter" || we.key === " ") && (we.preventDefault(), we.stopPropagation(), r.open ? bH() : W());
    },
    role: "button",
    "aria-label": i.displayName,
    "aria-expanded": r.open,
    onPointerEnter: () => M(!0),
    onPointerLeave: () => M(!1),
    onPointerDown: q,
    onPointerMove: ne,
    onPointerUp: de,
    onPointerCancel: de,
    onContextMenu: we => {
      we.preventDefault(), we.stopPropagation(), VTn("pet");
    },
    children: [le && !r.open ? c.jsx("div", {
      className: `desktop-pet__bubble ${J ? `desktop-pet__bubble--${J}` : ""} ${ce ? `desktop-pet__bubble--${ce}` : ""}`,
      "data-theme": e ? "dark" : "light",
      children: le
    }) : null, c.jsx(ipr, {
      className: "desktop-pet__sprite",
      src: d,
      atlas: h,
      presentation: L,
      scale: z.scale,
      paused: t || U || D && !T,
      onTransientEnd: Q
    })]
  });
}

const iji = Yp(() => Ie(() => Promise.resolve().then(() => C2o), void 0, import.meta.url)),
  oji = g.memo(function (t) {
    const n = scr(),
      [r, a] = g.useState(n);
    return g.useEffect(() => {
      n && a(!0);
    }, [n]), c.jsx(Zf, {
      show: n || r,
      children: c.jsx(iji, {
        ...t
      })
    });
  }),
  sji = 100,
  lji = ({
    totalNodes: e,
    visibleNodes: t,
    nodeQualityMap: n,
    enabled: r = !0,
    onFpsSample: a
  }) => {
    const [i, o] = g.useState(60),
      [s, l] = g.useState(60),
      [d, u] = g.useState(60),
      [h, p] = g.useState(typeof document > "u" ? !0 : !document.hidden),
      m = g.useRef(null),
      f = g.useRef([]),
      y = g.useRef(60),
      b = g.useRef(a);
    b.current = a, g.useEffect(() => {
      if (typeof document > "u") return;
      const w = () => p(!document.hidden);
      return document.addEventListener("visibilitychange", w), () => document.removeEventListener("visibilitychange", w);
    }, []);
    const v = {
      low: 0,
      medium: 0,
      high: 0
    };
    n && typeof n.forEach == "function" && n.forEach(w => {
      v[w]++;
    });
    const _ = (w, k, A) => {
      const S = {
        currentFPS: w,
        avgFPS: k,
        displayRefreshRate: A
      };
      if (b.current) {
        b.current(S);
        return;
      }
      o(w), l(k), u(A);
    };
    return g.useEffect(() => {
      if (!r || !h) return;
      let w = !1;
      HQe().then(E => {
        if (w) return;
        const M = Math.round(1e3 / Math.max(1, E)),
          T = Math.max(48, Math.min(1e3, M));
        y.current = T, f.current = [], _(T, T, T);
      });
      let k = 0,
        A = 0,
        S = 0;
      const C = [],
        I = E => {
          if (w) return;
          if (k === 0) {
            k = E, S = E, m.current = requestAnimationFrame(I);
            return;
          }
          const M = E - k;
          if (k = E, M > 0 && M < 1e3 && (C.push(1e3 / M), C.length > 45 && C.shift()), A += 1, E - S >= sji) {
            const T = Math.max(1, E - S),
              P = A * 1e3 / T,
              R = C.slice(-12),
              j = R.length ? R.reduce((V, O) => V + O, 0) / R.length : P,
              B = y.current || 60,
              F = Math.max(60, B + 8),
              N = V => Number.isFinite(V) && V > 0 ? Math.min(F, Math.max(1, V)) : B,
              G = N(j);
            f.current.push(N(P)), f.current.length > 20 && f.current.shift();
            const z = f.current.reduce((V, O) => V + O, 0) / Math.max(1, f.current.length);
            _(G, N(z), B), A = 0, S = E;
          }
          m.current = requestAnimationFrame(I);
        };
      return m.current = requestAnimationFrame(I), () => {
        w = !0, m.current != null && (cancelAnimationFrame(m.current), m.current = null);
      };
    }, [r, h]), {
      totalNodes: e,
      visibleNodes: t,
      currentFPS: i,
      avgFPS: s,
      displayRefreshRate: d,
      qualityDistribution: v
    };
  },
  Bje = (e, t) => e >= 55 ? t ? "text-green-400" : "text-green-600" : e >= 30 ? t ? "text-yellow-400" : "text-yellow-600" : t ? "text-red-400" : "text-red-600",
  jst = (e, t, n) => {
    if (!e) return;
    const r = Bje(t, n),
      a = ["text-green-400", "text-green-600", "text-yellow-400", "text-yellow-600", "text-red-400", "text-red-600"];
    for (const i of a) e.classList.remove(i);
    e.classList.add(r);
  },
  cji = ({
    totalNodes: e,
    visibleNodesCount: t,
    nodeQualityMap: n,
    isDark: r,
    lightboxOpen: a = !1,
    framePressure: i = "idle"
  }) => {
    const [o, s] = g.useState(() => JUe()),
      l = g.useRef(null),
      d = g.useRef(null),
      u = g.useRef(null),
      h = g.useRef(r),
      p = g.useRef(null);
    h.current = r, g.useEffect(() => m8i(s), []);
    const m = g.useCallback(_ => {
        const w = h.current,
          k = Number.isFinite(_.currentFPS) ? _.currentFPS : 60,
          A = Number.isFinite(_.avgFPS) ? _.avgFPS : k,
          S = Number.isFinite(_.displayRefreshRate) ? _.displayRefreshRate : 60;
        l.current && (l.current.textContent = k.toFixed(1), jst(l.current, k, w)), d.current && (d.current.textContent = A.toFixed(1), jst(d.current, A, w)), u.current && (u.current.textContent = `${Math.round(S)}Hz`, jst(u.current, S, w));
      }, []),
      f = g.useCallback(_ => {
        p.current = _, m(_);
      }, [m]);
    g.useLayoutEffect(() => {
      p.current && m(p.current);
    });
    const y = lji({
        totalNodes: e,
        visibleNodes: t,
        nodeQualityMap: n,
        enabled: o === "full" && !a,
        onFpsSample: f
      }),
      b = r ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-600";
    if (g.useEffect(() => {
      vhr();
    }, []), g.useEffect(() => {
      const _ = w => {
        const k = w.target;
        k.tagName === "INPUT" || k.tagName === "TEXTAREA" || k.isContentEditable || (w.key === "p" || w.key === "P") && (JUe() === "off" ? bhr("full") : Ydn());
      };
      return window.addEventListener("keydown", _), () => window.removeEventListener("keydown", _);
    }, []), o !== "full") return null;
    const v = y.totalNodes > 0 ? (y.visibleNodes / y.totalNodes * 100).toFixed(1) : "0.0";
    return c.jsxs("div", {
      className: `fixed top-[calc(var(--desktop-titlebar-height,0px)+4.5rem)] right-4 z-40 rounded-lg shadow-none border ${r ? "bg-zinc-900/95 border-zinc-700 text-zinc-100" : "bg-white/95 border-zinc-300 text-zinc-900"}`,
      style: {
        minWidth: "280px",
        contain: "layout paint style"
      },
      children: [c.jsxs("div", {
        className: `flex items-center justify-between px-3 py-2 border-b ${r ? "border-zinc-700" : "border-zinc-200"}`,
        children: [c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx(mRr, {
            size: 16,
            className: "text-blue-500"
          }), c.jsx("span", {
            className: "text-sm font-semibold",
            children: "性能监控"
          })]
        }), c.jsx("button", {
          type: "button",
          title: "关闭",
          onClick: () => Ydn(),
          className: `text-xs px-2 py-0.5 rounded transition-colors ${b}`,
          children: "✕"
        })]
      }), c.jsxs("div", {
        className: "p-3 space-y-3",
        children: [c.jsxs("div", {
          className: "space-y-1",
          children: [c.jsxs("div", {
            className: "flex items-center gap-2 text-xs text-zinc-500",
            children: [c.jsx(fZ, {
              size: 12
            }), c.jsx("span", {
              children: "帧率"
            })]
          }), c.jsxs("div", {
            className: "flex items-baseline gap-3",
            children: [c.jsxs("div", {
              children: [c.jsx("span", {
                ref: l,
                className: `text-2xl font-bold ${Bje(y.currentFPS, r)}`,
                children: y.currentFPS.toFixed(1)
              }), c.jsx("span", {
                className: "text-xs ml-1 text-zinc-500",
                children: "FPS"
              })]
            }), c.jsxs("div", {
              className: "text-xs text-zinc-500",
              children: ["平均: ", c.jsx("span", {
                ref: d,
                className: Bje(y.avgFPS, r),
                children: y.avgFPS.toFixed(1)
              })]
            }), c.jsxs("div", {
              className: "text-xs text-zinc-500",
              children: ["显示器: ", c.jsxs("span", {
                ref: u,
                className: Bje(y.displayRefreshRate, r),
                children: [y.displayRefreshRate.toFixed(0), "Hz"]
              })]
            })]
          })]
        }), c.jsxs("div", {
          className: "space-y-1",
          children: [c.jsxs("div", {
            className: "flex items-center gap-2 text-xs text-zinc-500",
            children: [c.jsx(ul, {
              size: 12
            }), c.jsx("span", {
              children: "当前窗口可见"
            })]
          }), c.jsxs("div", {
            className: "flex items-baseline gap-2",
            children: [c.jsx("span", {
              className: "text-lg font-semibold text-blue-500",
              children: y.visibleNodes
            }), c.jsxs("span", {
              className: "text-xs text-zinc-500",
              children: ["/ ", y.totalNodes, " (", v, "%)"]
            })]
          })]
        }), c.jsxs("div", {
          className: "space-y-1",
          children: [c.jsxs("div", {
            className: "flex items-center gap-2 text-xs text-zinc-500",
            children: [c.jsx(uEt, {
              size: 12
            }), c.jsx("span", {
              children: "帧预算"
            })]
          }), c.jsxs("div", {
            className: "flex items-baseline gap-2",
            children: [c.jsx("span", {
              className: `text-sm font-semibold ${i === "critical" ? "text-red-500" : i === "tight" ? "text-yellow-500" : r ? "text-green-400" : "text-green-600"}`,
              children: i === "critical" ? "危急" : i === "tight" ? "紧张" : "空闲"
            }), c.jsx("span", {
              className: "text-xs text-zinc-500",
              children: i === "critical" ? "所有非生成中节点强制 low" : i === "tight" ? "medium 临时降为 low" : "默认渲染"
            })]
          })]
        }), c.jsxs("div", {
          className: "space-y-1",
          children: [c.jsxs("div", {
            className: "flex items-center gap-2 text-xs text-zinc-500",
            children: [c.jsx(IP, {
              size: 12
            }), c.jsx("span", {
              children: "渲染质量"
            })]
          }), c.jsxs("div", {
            className: "grid grid-cols-3 gap-2 text-xs",
            children: [c.jsxs("div", {
              className: `text-center py-1 rounded ${r ? "bg-zinc-800" : "bg-zinc-100"}`,
              children: [c.jsx("div", {
                className: "text-red-500 font-semibold",
                children: y.qualityDistribution.low
              }), c.jsx("div", {
                className: "text-zinc-500",
                children: "Low"
              })]
            }), c.jsxs("div", {
              className: `text-center py-1 rounded ${r ? "bg-zinc-800" : "bg-zinc-100"}`,
              children: [c.jsx("div", {
                className: "text-yellow-500 font-semibold",
                children: y.qualityDistribution.medium
              }), c.jsx("div", {
                className: "text-zinc-500",
                children: "Medium"
              })]
            }), c.jsxs("div", {
              className: `text-center py-1 rounded ${r ? "bg-zinc-800" : "bg-zinc-100"}`,
              children: [c.jsx("div", {
                className: "text-green-500 font-semibold",
                children: y.qualityDistribution.high
              }), c.jsx("div", {
                className: "text-zinc-500",
                children: "High"
              })]
            })]
          })]
        })]
      }), c.jsx("div", {
        className: `px-3 py-2 text-xs border-t space-y-0.5 ${r ? "border-zinc-700 text-zinc-500" : "border-zinc-200 text-zinc-600"}`,
        children: c.jsxs("div", {
          children: ["快捷键 ", c.jsx("kbd", {
            className: `px-1 rounded ${r ? "bg-zinc-800" : "bg-zinc-100"}`,
            children: "P"
          }), " 开/关面板"]
        })
      })]
    });
  },
  dji = g.memo(cji);

function uji({
  enrichedLightboxItem: e,
  onLightboxClose: t,
  onLightboxNavigate: n,
  onSendToCanvas: r,
  isCanvasFullscreen: a,
  canvasContainerRef: i,
  canvasSuspendedForOverlay: o,
  hideCanvasViewportBar: s = !1,
  isDark: l,
  theme: d,
  setTheme: u,
  canvasViewportBarLeftPx: h,
  view: p,
  setView: m,
  onViewportZoomChange: f,
  isZoomLocked: y,
  setIsZoomLocked: b,
  canvasBgColorDark: v,
  canvasBgColorLight: _,
  setCanvasBgColorDark: w,
  setCanvasBgColorLight: k,
  showCanvasHelpPanel: A,
  leftToolbarDock: S,
  handleAlign: C,
  alignPanelOpen: I,
  setAlignPanelOpen: E,
  nodes: M,
  selectedNodeIds: T,
  visibleNodesCount: P,
  nodeQualityMap: R,
  lightboxOpen: j,
  framePressure: B,
  dragNodeId: F,
  resizingNodeId: N,
  connectingSource: G,
  connectingTarget: z,
  isDragging: V,
  isPanning: O,
  history: L,
  materialLibraryOpen: D = !1,
  onToggleMaterialLibrary: U,
  hideConnections: H = !1,
  onToggleConnections: Y,
  showCanvasMinimap: K = !1,
  onCanvasMinimapToggle: W,
  canvasMinimapView: Q,
  canvasMinimapViewportWidth: q = 0,
  canvasMinimapViewportHeight: ne = 0,
  canvasMinimapConnections: de = [],
  canvasMinimapGroups: le = [],
  onCanvasMinimapViewChange: J,
  onCanvasMinimapViewDragStart: pe,
  onCanvasMinimapViewDragEnd: ce,
  onCanvasMinimapNodeFocus: we,
  onCanvasMinimapGroupFocus: X,
  currentProjectId: Z = null,
  projectName: re = "未命名项目",
  currentChatId: fe
}) {
  const ye = ZIe(),
    ie = Zui(),
    ae = o || ie,
    be = ye ? Math.max(h, 256) : h,
    Ee = c.jsx(eCi, {
      isDark: l,
      theme: d,
      leftOffsetPx: be,
      embedded: !0,
      zoom: p.zoom,
      onZoomChange: ue => {
        f ? f(ue) : m(ge => ({
          ...ge,
          zoom: ue
        }));
      },
      isZoomLocked: y,
      onZoomLockChange: b,
      onThemeToggle: () => u(d === "dark" ? "light" : "dark"),
      canvasBackgroundColor: l ? v : _,
      canvasBackgroundDefaultHex: l ? yZ : I5e,
      onCanvasBackgroundColorChange: ue => l ? w(ue) : k(ue),
      materialLibraryOpen: D,
      onToggleMaterialLibrary: U,
      hideConnections: H,
      onToggleConnections: Y,
      showCanvasMinimap: K,
      onToggleCanvasMinimap: W
    }),
    xe = K && !!Q && !!J && q > 0 && ne > 0,
    he = xe ? c.jsx(XIi, {
      view: Q,
      viewportWidth: q,
      viewportHeight: ne,
      nodes: M,
      connections: de,
      groups: le,
      onViewChange: J,
      onViewDragStart: pe,
      onViewDragEnd: ce,
      onNodeFocus: we,
      onGroupFocus: X,
      isDark: l,
      docked: !0,
      dockAccessory: Ee
    }) : null;
  return c.jsxs(c.Fragment, {
    children: [e && Da.createPortal(c.jsx(h9, {
      item: e,
      onClose: t,
      onNavigate: n,
      onSendToCanvas: r,
      isCanvasFullscreen: a,
      canvasContainerRef: i,
      toastLoading: Uv,
      toastSuccess: Vs,
      toastError: qi,
      removeToast: gg
    }, `${e.id || "lb"}:${e._assetId || ""}:${e.url || ""}`), document.body), c.jsx(hjt, {
      isDark: d === "dark"
    }), !ae && c.jsx(INi, {
      nodes: M,
      isDark: l,
      projectId: Z
    }), c.jsx(oji, {
      isDark: l,
      projectId: Z,
      projectName: re,
      currentChatId: fe,
      nodes: M,
      history: L,
      selectedNodeIds: T,
      onFocusCanvasNode: we
    }), !ae && !s && c.jsx(c.Fragment, {
      children: c.jsx("div", {
        className: "fixed bottom-4 z-[120] pointer-events-auto transition-[left] duration-300",
        style: {
          left: be
        },
        "data-canvas-bottom-left-dock": "true",
        children: xe ? he : Ee
      })
    }), c.jsx(Q7i, {
      isDark: l,
      hidden: ae || s
    }), c.jsx(aji, {
      isDark: l,
      hidden: ae
    }), !zX() && c.jsx(GWn, {
      isDark: l
    }), c.jsx(W7i, {
      isDark: l,
      projectId: Z,
      nodes: M,
      selectedNodeIds: T
    }), c.jsx(L7i, {}), c.jsx(NUa, {
      isDark: d === "dark",
      onAlign: C,
      visible: I,
      onVisibleChange: E
    }), c.jsx(dji, {
      totalNodes: M.length,
      visibleNodesCount: P,
      nodeQualityMap: R,
      isDark: d === "dark",
      lightboxOpen: j,
      framePressure: B,
      activeSampling: !!F || !!N || !!G || !!z || V || O || M.some(ue => !!ue.isGenerating) || L.some(ue => ue.status === "generating")
    })]
  });
}

const hji = g.memo(uji);

function pji(e) {
  return {
    focusEditBanner: e.focusEditBanner,
    isDark: e.isDark,
    projectName: e.projectName,
    isEditingProjectName: e.isEditingProjectName,
    isDownloading: e.isDownloading,
    downloadProgress: e.downloadProgress,
    isSidebarOpen: e.canvasSidePanelOpen,
    projectNameLeftOffset: e.canvasLeftToolbarInsetPx,
    showHelpTrigger: e.showCanvasHelpPanel,
    showCanvasGrid: e.showCanvasGrid,
    canvasGridSpacing: e.effectiveCanvasGridSpacing,
    canvasGridDotSize: e.effectiveCanvasGridDotSize,
    showCanvasSnap: e.showCanvasSnap,
    followDownstreamOnDrag: e.followDownstreamOnDrag,
    showCanvasMinimap: e.showCanvasMinimap,
    hideAllInputImagePreviews: e.hideAllInputImagePreviews,
    showAllCanvasConnections: e.showAllCanvasConnections,
    connectionHitWidth: e.connectionHitWidth,
    showAlignmentGuides: e.showAlignmentGuides,
    locateAnimationMaxNodes: e.locateAnimationMaxNodes,
    showCanvasBgGlow: e.showCanvasBgGlow,
    showNodeDeleteButton: e.showNodeDeleteButton,
    showStartGenerateButton: e.showStartGenerateButton,
    projectNameInputRef: e.projectNameInputRef,
    showNewProjectSaveHint: e.showNewProjectSaveHint,
    leftToolbarDock: e.leftToolbarDock,
    enableConnectWireTilt: e.enableConnectWireTilt,
    enableConnectWireMarquee: e.enableConnectWireMarquee,
    enableGenerationConnectionFlow: e.enableGenerationConnectionFlow,
    generationConnectionFlowMode: e.generationConnectionFlowMode,
    enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
    generationNodeAnimationMode: e.generationNodeAnimationMode,
    showCanvasGenerationTimer: e.showCanvasGenerationTimer,
    connectionLineStrokeWidth: e.connectionLineStrokeWidth,
    connectionLineOpacityPercent: e.connectionLineOpacityPercent,
    connectionLineColor: e.connectionLineColor,
    projects: e.projects,
    currentProjectId: e.currentProjectId,
    projectListLoading: e.projectLoading
  };
}

function mji(e) {
  return {
    onClose: e.handleCloseHistoryPanel,
    isDark: e.isDark,
    history: e.history,
    localCacheServerConnected: e.localCacheServerConnected,
    localCacheSettingsOpen: e.localCacheSettingsOpen,
    localServerConfig: e.localServerConfig,
    onSetLocalCacheSettingsOpen: e.setLocalCacheSettingsOpen,
    onSetLocalServerConfig: e.setLocalServerConfig
  };
}

function fji(e) {
  return {
    onSetHistory: e.setHistory,
    onReplaceHistory: e.setHistoryFromStorage,
    onSetLightboxItem: e.setLightboxItem,
    onSetLightboxOpen: e.setLightboxOpen,
    onSetBatchManageOpen: e.setBatchManageOpen,
    onHistoryContextMenu: e.handleHistoryPanelContextMenu,
    onRefreshVideo: e.handleRefreshVideo,
    onRefreshAudio: e.handleRefreshAudio,
    onRefresh3d: e.handleRefresh3d,
    onRefreshFalImage: e.handleRefreshFalImage,
    onRefreshMjImage: e.handleRefreshMjImage,
    onRefreshComfyTask: e.handleRefreshComfyTask,
    hasMoreHistory: e.historyHasMore,
    onLoadMoreHistory: e.handleLoadMoreHistory
  };
}

function gji(e) {
  return {
    orientation: e.leftToolbarDock === "bottom" ? "horizontal" : "vertical",
    collapsed: e.leftToolbarCollapsed,
    isDark: e.isDark,
    activeTool: e.activeTool,
    projectPanelOpen: e.projectPanelOpen,
    poseLibraryOpen: e.poseLibraryOpen,
    projectMemoryOpen: e.projectMemoryOpen,
    textToolActive: e.activeTool === "text-create",
    doodleToolActive: e.activeTool === "doodle"
  };
}

function yji(e) {
  return {
    dock: e.dock,
    leftInsetPx: e.canvasViewportBarLeftPx,
    collapsed: e.collapsed
  };
}

function bji(e) {
  return {
    suspended: e.canvasSuspendedForOverlay,
    interactionBlocked: e.canvasSuspendedForOverlay || e.freeSplitModalOpen || e.gridSplitModalOpen,
    containerRef: e.canvasContainerRef,
    canvasRef: e.canvasRef,
    canvasWorldRef: e.canvasWorldRef,
    isDark: e.isDark,
    isPanning: e.isPanning,
    backgroundColor: e.isDark ? e.canvasBgColorDark : e.canvasBgColorLight,
    showBgGlow: e.showCanvasBgGlow === !0
  };
}

function vji(e) {
  return {
    showGrid: e.showCanvasGrid,
    isDark: e.isDark,
    zoom: e.view.zoom,
    viewX: e.view.x,
    viewY: e.view.y,
    gridSpacing: e.effectiveCanvasGridSpacing,
    gridDotSize: e.effectiveCanvasGridDotSize
  };
}

function wji(e, t) {
  return e === 0 && !t;
}

function xji(e) {
  return {
    active: !!e.compactRefCanvasPickTargetGenNodeId,
    onCancel: e.dismissCompactRefCanvasPick
  };
}

function _ji(e) {
  return {
    store: e.store,
    view: e.effectiveView,
    isDark: e.isDark
  };
}

function kji(e) {
  return {
    multiImageSelection: e.multiImageSelection,
    reverseBatchSelection: e.reverseBatchSelection,
    viewZoom: e.effectiveView.zoom,
    viewOffset: {
      x: e.effectiveView.x,
      y: e.effectiveView.y
    },
    isDark: e.isDark,
    onStartMultiConnection: e.handleStartMultiConnection,
    onStartReverseBatchConnection: e.handleStartReverseBatchConnection
  };
}

function Aji(e) {
  return {
    hideConnections: e.hideConnections,
    showAllConnections: e.showAllCanvasConnections,
    nodes: e.nodes,
    nodesGeometryMap: e.nodesGeometryMap,
    groups: e.groups,
    view: e.effectiveView,
    viewportWidth: e.canvasInnerViewport.width,
    viewportHeight: e.canvasInnerViewport.height,
    isDark: e.isDark,
    isPanning: e.isCanvasPanningActive,
    isDenseGraph: e.isDenseGraph,
    selectedNodeId: e.selectedNodeId,
    selectedNodeIds: e.selectedNodeIds,
    selectedConnectionId: e.selectedConnectionId,
    connectionLineStrokeWidth: e.connectionLineStrokeWidth,
    connectionLineOpacityPercent: e.connectionLineOpacityPercent,
    connectionLineColor: e.connectionLineColor,
    connectionHitWidth: e.connectionHitWidth,
    collectionEndpoints: e.mergedConnectionEndpoints,
    intraGroupConnectionIds: e.intraGroupConnectionIds,
    enableGenerationConnectionFlow: e.enableGenerationConnectionFlow,
    generationConnectionFlowMode: e.generationConnectionFlowMode,
    alignmentGuides: e.alignmentGuides,
    connectingSource: e.connectingSource,
    connectingTarget: e.connectingTarget,
    connectingGroupOutputId: e.connectingGroupOutputId,
    multiConnectingSourceIds: e.multiConnectingSourceIds,
    multiConnectingTargetIds: e.multiConnectingTargetIds,
    svgContainerRef: e.svgContainerRef,
    connectingLineRef: e.connectingLineRef,
    connectingLineReverseRef: e.connectingLineReverseRef
  };
}

function Sji(e) {
  return {
    onSelectConnection: e.setSelectedConnectionId,
    onDeleteConnection: e.handleDeleteConnection
  };
}

function Iji(e) {
  return {
    groups: e.groups,
    nodes: e.nodes,
    view: e.effectiveView,
    selectedGroupId: e.selectedGroupId,
    isDark: e.isDark,
    isDownloading: e.isDownloading,
    connectingGroupId: e.connectingGroupOutputId,
    selectionBox: e.selectionBox,
    selectionBoxDivRef: e.selectionBoxDivRef,
    isSelecting: e.isSelecting
  };
}

function Cji(e) {
  return {
    onGroupSelect: e.setSelectedGroupId,
    onGroupResize: e.handleGroupResize,
    onGroupNameChange: e.updateGroupName,
    onGroupResizeStart: e.handleGroupResizeStart,
    onGroupResizeEnd: e.handleGroupResizeEnd,
    onStartGroupConnect: e.handleStartGroupConnect,
    onGroupColorChange: e.updateGroupColor,
    onGroupDelete: e.deleteGroup,
    onGroupExecute: e.executeGroup,
    onArrangeGroup: e.handleArrangeGroup,
    onDownloadGroup: e.handleDownloadGroup,
    onDemoGroup: e.handleDemoGroup
  };
}

function Eji(e) {
  return {
    groups: e.groups,
    nodes: e.nodes,
    isDark: e.isDark,
    selectedGroupId: e.selectedGroupId
  };
}

function Tji(e) {
  return {
    nodes: e.nodes,
    nodesGeometryMap: e.nodesGeometryMap,
    groups: e.groups,
    selectedNodeIds: e.selectedNodeIds,
    isSelecting: e.isSelecting,
    showBoxSelectBounds: e.showBoxSelectBounds,
    showCollectionPopup: e.showCollectionForBoxSelect,
    isDark: e.isDark,
    view: e.effectiveView,
    batchConnectSourceIds: e.boxSelectBatchConnectSourceIds,
    connectingGroupId: e.connectingGroupOutputId,
    focusRippleNodeId: e.focusRippleNodeId,
    focusRippleNonce: e.focusRippleNonce,
    collectedNodeIds: e.collectedNodeIds,
    isDownloading: e.isDownloading,
    canDemoSelected: e.canDemoSelected
  };
}

function Mji(e) {
  return {
    onDragAreaMouseDown: e.startBoxSelectGroupDrag,
    onStartBatchConnect: e.handleStartBoxSelectBatchConnect,
    onArrangeNodes: e.handleArrangeSelected,
    onExpandCollection: e.expandCollection,
    updateCollectionPosition: e.updateCollectionPosition,
    onCollectionDragFrame: e.handleCollectionDragFrame,
    onStartGroupConnect: e.handleStartGroupConnect,
    onDownloadSelected: e.handleDownloadSelected,
    onDemoSelected: e.handleDemoSelected
  };
}

function Pji(e) {
  var t, n;
  return !!(e.connectingSource || e.connectingTarget || (t = e.multiConnectingSourceIds) != null && t.length || (n = e.multiConnectingTargetIds) != null && n.length || e.isCanvasPanningActive);
}

function Rji({
  connectingSource: e,
  connectingTarget: t,
  multiConnectingSourceIds: n,
  multiConnectingTargetIds: r,
  reverseBatchConnectionActive: a,
  isCanvasPanningActive: i,
  selectedNodeIds: o,
  nodes: s,
  connections: l,
  createGroup: d,
  createStackCard: u,
  setSelectedNodeIds: h,
  setSelectedNodeId: p,
  setSelectedGroupId: m,
  setShowCollectionForBoxSelect: f,
  setShowBoxSelectBounds: y,
  openSaveSelectedNodesToMaterialLibrary: b
}) {
  const v = g.useMemo(() => Pji({
      connectingSource: e,
      connectingTarget: t,
      multiConnectingSourceIds: n,
      multiConnectingTargetIds: r,
      isCanvasPanningActive: i
    }), [e, t, i, n, r]),
    _ = g.useCallback(C => {
      C.length >= 2 && d(C);
    }, [d]),
    w = g.useCallback((C, I) => {
      u(C, I);
    }, [u]),
    k = g.useCallback(() => {
      h(new Set()), p(null), f(!1), y(!1);
    }, [p, h, y, f]),
    A = g.useCallback(C => {
      m(C), p(null), h(new Set()), f(!1), y(!1);
    }, [m, p, h, y, f]),
    S = g.useCallback(C => {
      const I = C instanceof Set ? C : new Set(C ?? o);
      b(I, s, l);
    }, [l, s, b, o]);
  return {
    groupConnectionBlocked: v,
    batchConnectionHandleHidden: a || v,
    handleCreateGroup: _,
    handleStackCollapse: w,
    handleClearSelection: k,
    handleGroupSelect: A,
    handleSaveSelectedToMaterialLibrary: S
  };
}

function Nji(e) {
  return {
    batchConnectionHandleHidden: e.batchConnectionHandleHidden,
    groupConnectionBlocked: e.groupConnectionBlocked,
    onCreateGroup: e.handleCreateGroup,
    onStackCollapse: e.handleStackCollapse,
    onClearSelection: e.handleClearSelection,
    onGroupSelect: e.handleGroupSelect,
    onSaveToMaterialLibrary: e.handleSaveSelectedToMaterialLibrary
  };
}

function jji(e) {
  return {
    groupConnectionBlocked: e.groupConnectionBlocked
  };
}

function Dji(e) {
  const {
    annotation: t
  } = e;
  return {
    active: e.activeTool === "doodle",
    subTool: t.doodleSubTool,
    passthrough: t.canvasDoodleBrushOrEraserPassthrough,
    visibleStrokes: e.visibleStrokes,
    draftStore: e.draftStore,
    brushColor: t.doodleBrushColor,
    brushWidth: t.doodleBrushWidth,
    eraserWidth: t.doodleEraserWidth,
    selectionStore: e.selectionStore,
    selectionBounds: e.selectionBounds,
    selectedIds: t.selectedDoodleIds,
    selectionColor: t.doodleSelCapsuleColor,
    isDark: e.isDark,
    setSelectedIds: t.setSelectedDoodleIds,
    setSelectionColor: t.setDoodleSelCapsuleColor,
    setStrokes: t.setCanvasDoodleStrokes,
    onBeginMove: e.onBeginMove,
    onBeginResize: e.onBeginResize,
    onCreateArtboard: e.onCreateArtboard
  };
}

function Lji(e) {
  const {
    annotation: t
  } = e;
  return {
    allTextBoxes: t.canvasTextBoxes,
    visibleTextBoxes: e.visibleTextBoxes,
    selectedTextId: t.selectedCanvasTextId,
    editingTextId: t.editingCanvasTextId,
    isDark: e.isDark,
    textTool: e.textTool,
    setTextBoxes: t.setCanvasTextBoxes,
    setSelectedTextId: t.setSelectedCanvasTextId,
    setEditingTextId: t.setEditingCanvasTextId
  };
}

function Oji(e) {
  return e === "local-skill";
}

function Bji(e) {
  return {
    onClose: e.closeChatPanel,
    isDark: e.isDark,
    canvasBackdropColor: e.isDark ? e.canvasBgColorDark : e.canvasBgColorLight,
    chatWidth: e.chatWidth,
    chatFontSize: e.chatFontSize,
    onSetChatFontSize: e.setChatFontSize,
    onChatResizeStart: e.handleChatResizeStart,
    isResizingChat: e.isResizingChat
  };
}

function Fji(e) {
  const t = Oji(e.chatPanelMode);
  return {
    chatPanelMode: e.chatPanelMode,
    onSetChatPanelMode: e.setChatPanelMode,
    chatModel: t ? e.localSkillChatModel : e.chatModel,
    onSetChatModel: t ? e.setLocalSkillChatModel : e.setChatModel,
    chatPlatformGroup: t ? e.localSkillPlatformGroup : e.chatPlatformGroup,
    onSetChatPlatformGroup: t ? e.setLocalSkillPlatformGroup : e.setChatPlatformGroup,
    apiConfigs: e.chatApiConfigs,
    chatWebSearchEnabled: e.chatWebSearchEnabled,
    chatApiProtocol: e.chatApiProtocol,
    chatReasoningEffort: e.chatReasoningEffort,
    chatUseAliyunOss: e.chatUseAliyunOss,
    chatOssImageBase64: e.chatOssImageBase64,
    onSetChatWebSearchEnabled: e.setChatWebSearchEnabled,
    onSetChatApiProtocol: e.setChatApiProtocol,
    onSetChatReasoningEffort: e.setChatReasoningEffort,
    onSetChatUseAliyunOss: e.setChatUseAliyunOss,
    onSetChatOssImageBase64: e.setChatOssImageBase64,
    chatSessions: e.chatSessions,
    currentChatId: e.currentChatId,
    isChatSending: e.isChatSending,
    sendingChatSessionIds: e.sendingChatSessionIds,
    historyMessageCount: e.historyMessageCount,
    onSetCurrentChatId: e.setCurrentChatId,
    onSetHistoryMessageCount: e.setHistoryMessageCount,
    onCreateNewChat: e.createNewChat,
    onDeleteChatSession: e.deleteChatSession,
    onDeleteChatMessages: e.deleteChatMessages,
    onRenameChatSession: e.renameChatSession,
    onSendChatMessage: e.sendChatMessage,
    onCreateSkillFromChat: e.startSkillCreatorFromChat,
    onCancelChatSend: e.cancelChatSend,
    onResendChatMessage: e.resendChatMessage,
    sessionsForCurrentMode: e.sessionsForCurrentMode,
    chatSessionsForHistory: e.chatSessionsForHistory,
    chatSessionLastTsById: e.chatSessionLastTsById,
    onSelectChatSession: e.selectChatSession
  };
}

function zji(e) {
  return {
    chatAgentGenPrefs: e.chatAgentGenPrefs,
    onSetChatAgentGenPrefs: e.setChatAgentGenPrefs,
    onResolveAgentChoice: e.resolveAgentChoice,
    onPatchChatMessage: e.patchChatMessage,
    onBindLocalSkillRoot: e.bindLocalSkillRoot,
    onAddLocalSkillWorkspace: e.addLocalSkillWorkspace,
    onOpenLocalSkillWorkspace: e.openLocalSkillWorkspace,
    onRemoveLocalSkillWorkspace: e.removeLocalSkillWorkspace,
    localSkillWorkspaces: e.localSkillWorkspaces,
    localSkillPermission: e.localSkillPermission,
    onSetLocalSkillPermission: e.setLocalSkillPermission,
    onUndoLocalSkillEdit: e.undoLocalSkillEdit,
    onReviewLocalSkillFile: e.reviewLocalSkillFile,
    onOpenChatMediaLightbox: e.handleOpenChatMediaLightbox,
    getCanvasAtMentionItems: e.getCanvasAtMentionItems,
    onAddTextNodeToCanvas: e.handleAddMemoryFileTextNode,
    onSendImageToCanvas: e.handleSendChatImagesToCanvas,
    onSendLocalSkillImageToCanvas: e.handleSendLocalSkillImageToCanvas,
    onOpenSkillToWorkflow: e.handleOpenSkillToWorkflow
  };
}

function Uji(e) {
  return {
    canvasPortalEl: e.canvasContentRef.current,
    setChatFiles: e.setChatComposerFiles,
    showHuyaModels: e.showHuyaModels,
    showHuyaModelsInFeaturePanel: e.showHuyaModels,
    projectImportDocument: e.projectImportDocument
  };
}

function $ji(e) {
  return {
    enrichedLightboxItem: e.enrichedLightboxItem,
    onLightboxClose: e.handleLightboxClose,
    onLightboxNavigate: e.handleFloatingLightboxNavigate,
    onSendToCanvas: e.handleSendToCanvas,
    isCanvasFullscreen: e.isCanvasFullscreen,
    canvasContainerRef: e.canvasContainerRef,
    lightboxOpen: e.lightboxOpen
  };
}

function Gji(e) {
  return {
    showCanvasMinimap: e.showCanvasMinimap,
    onCanvasMinimapToggle: e.handleCanvasMinimapToggle,
    canvasMinimapView: e.effectiveView,
    canvasMinimapViewportWidth: e.viewportSize.width,
    canvasMinimapViewportHeight: e.viewportSize.height,
    canvasMinimapConnections: e.canvasDependencyConnections,
    canvasMinimapGroups: e.groups,
    onCanvasMinimapViewChange: e.handleMinimapViewChange,
    onCanvasMinimapViewDragStart: e.handleMinimapViewDragStart,
    onCanvasMinimapViewDragEnd: e.handleMinimapViewDragEnd,
    onCanvasMinimapNodeFocus: e.centerViewToNode,
    onCanvasMinimapGroupFocus: e.centerViewToGroup
  };
}

function Vji(e) {
  return {
    hideCanvasViewportBar: e.freeSplitModalOpen || e.gridSplitModalOpen,
    isDark: e.isDark,
    theme: e.theme,
    setTheme: e.setTheme,
    canvasViewportBarLeftPx: e.canvasViewportBarLeftPx,
    view: e.view,
    setView: e.setView,
    onViewportZoomChange: e.handleViewportBarZoomChange,
    isZoomLocked: e.isZoomLocked,
    setIsZoomLocked: e.setIsZoomLocked,
    canvasBgColorDark: e.canvasBgColorDark,
    canvasBgColorLight: e.canvasBgColorLight,
    setCanvasBgColorDark: e.setCanvasBgColorDark,
    setCanvasBgColorLight: e.setCanvasBgColorLight,
    showCanvasHelpPanel: e.showCanvasHelpPanel,
    leftToolbarDock: e.leftToolbarDock,
    handleAlign: e.handleAlign,
    alignPanelOpen: e.alignPanelOpen,
    setAlignPanelOpen: e.setAlignPanelOpen,
    materialLibraryOpen: e.materialLibraryOpen,
    onToggleMaterialLibrary: e.handleToggleMaterialLibraryFromOverlay,
    hideConnections: e.hideConnections,
    onToggleConnections: e.handleToggleConnections,
    canvasSuspendedForOverlay: e.canvasSuspendedForOverlay,
    currentProjectId: e.currentProjectId,
    projectName: e.currentProjectName || e.projectName,
    currentChatId: e.currentChatId
  };
}

function Hji(e) {
  return {
    nodes: e.nodes,
    selectedNodeIds: e.selectedNodeIds,
    visibleNodesCount: e.visibleNodes.length,
    nodeQualityMap: e.nodeQualityMap,
    framePressure: e.framePressure,
    dragNodeId: e.dragNodeId,
    resizingNodeId: e.resizingNodeId,
    connectingSource: e.connectingSource,
    connectingTarget: e.connectingTarget,
    isDragging: e.isDragging,
    isPanning: e.isPanning,
    history: e.history
  };
}

function Wji({
  isDark: e
}) {
  const t = qQe(),
    [n, r] = g.useState(t === "browser");
  return t === "browser" && !n && r(!0), n ? c.jsx(g.Suspense, {
    fallback: null,
    children: c.jsx(pOr, {
      isDark: e
    })
  }) : null;
}

function qji({
  shell: e,
  header: t,
  hosts: n,
  stage: r,
  chat: a,
  modals: i,
  overlays: o
}) {
  const {
      history: s,
      material: l,
      project: d,
      toolChrome: u
    } = n,
    {
      connections: h,
      selectionOverlay: p,
      nodeLayer: m,
      groupChrome: f
    } = r;
  return c.jsxs(u6i, {
    zoneMap: e.zoneMap,
    children: [c.jsx(f6i, {
      ...e.progress
    }), c.jsxs("div", {
      className: c6i(e),
      style: {
        backgroundColor: e.isDark ? e.canvasBgColorDark : e.canvasBgColorLight
      },
      children: [c.jsx(EEn, {
        isDark: e.isDark
      }), c.jsxs("div", {
        className: "relative flex-1 min-h-0 w-full",
        children: [c.jsx(B6i, {
          ...pji(t)
        }), c.jsx(Wji, {
          isDark: e.isDark
        }), c.jsxs(K5i, {
          fadedIn: n.fadedIn,
          isDark: n.isDark,
          children: [c.jsx(J6i, {
            ...mji(s),
            ...fji(s)
          }), c.jsx(Z6i, {
            isDark: n.isDark,
            characterLibrary: n.characterLibrary,
            onCreateCharacter: () => n.setCreateCharacterOpen(!0),
            onDeleteCharacter: y => n.setCharacterLibrary(b => b.filter(v => v.id !== y))
          }), c.jsx(Zf, {
            show: n.poseLibraryOpen,
            children: c.jsx(hOr, {
              isOpen: !0,
              isDark: n.isDark,
              onClose: () => n.setPoseLibraryOpen(!1),
              onInsertPose: n.handleInsertPoseToCanvas,
              toastSuccess: n.toastSuccess,
              toastError: n.toastError
            })
          }), c.jsx(nMi, {
            open: l.open,
            isDark: n.isDark,
            library: l.library,
            setOpen: l.setOpen,
            setRolesOpen: l.setRolesOpen,
            refresh: l.refresh,
            insert: l.insert,
            insertMany: l.insertMany
          }), c.jsx(aMi, {
            isDark: n.isDark,
            ...d
          }), c.jsx(oMi, {
            isDark: n.isDark,
            rhAppLibrary: n.rhAppLibrary,
            onDeleteItem: y => n.setRhAppLibrary(b => b.filter(v => v.id !== y)),
            onUpdateItem: (y, b) => n.setRhAppLibrary(v => v.map(_ => _.id === y ? {
              ..._,
              ...b
            } : _)),
            onFillToNode: n.fillRhNode
          }), c.jsx(sMi, {
            isDark: n.isDark,
            klingSubjectLibrary: n.klingSubjectLibrary,
            onCreateSubject: () => n.setCreateKlingSubjectOpen(!0),
            onDeleteSubject: y => n.setKlingSubjectLibrary(b => b.filter(v => v.id !== y)),
            onSendToNode: n.sendKlingSubject
          }), c.jsx(wPi, {
            ...yji(u.layout),
            toolbar: c.jsx(ZMi, {
              ...gji(u.toolbar)
            }),
            doodle: vPi(u.doodle)
          }), c.jsx(_Pi, {
            ...bji(r.shell),
            visualState: r.visualState,
            eventHandlers: r.eventHandlers,
            grid: vji(r.grid),
            emptyState: wji(r.emptyState.nodeCount, r.emptyState.emptyStateDismissed) ? c.jsx(CUa, {
              isDark: n.isDark
            }) : void 0,
            referencePickBanner: c.jsx(kPi, {
              ...xji(r.referencePick)
            }),
            viewportOverlay: c.jsx(APi, {
              ..._ji(r.textDraft)
            }),
            floatingControls: c.jsx(W5i, {
              ...kji(r.batchDials)
            }),
            worldChildren: c.jsxs(q5i, {
              canvasContentRef: r.canvasContentRef,
              groupBackground: c.jsx(Y5i, {
                ...Eji(r.groupAtmosphere)
              }),
              connections: c.jsx(TPi, {
                plan: h.plan,
                ...Aji(h.chrome),
                ...Sji(h.commands)
              }),
              children: [c.jsx(jPi, {
                ...Dji(r.doodleLayer)
              }), c.jsx(FPi, {
                ...Tji(p),
                ...Nji(p.bindings),
                ...Mji(p),
                onCollectionDragStart: p.onCollectionDragStart,
                onCollectionDragEnd: p.onCollectionDragEnd,
                onDeleteStack: p.onDeleteStack
              }), c.jsx(HPi, {
                ...Lji(r.textLayer)
              }), c.jsx(D9i, {
                ...m.invalidation,
                ...m.viewport,
                ...m.session,
                ...m.graphIndex,
                ...m.promptLibrary,
                rendererRuntimeRef: m.rendererRuntimeRef
              }), c.jsx(zPi, {
                ...Iji(f),
                ...jji(f.bindings),
                ...Cji(f)
              })]
            })
          })]
        }), c.jsx(jMi, {
          ...Bji(a.chrome),
          ...Fji(a.session),
          ...zji(a.canvasBridge)
        }), c.jsx(_Ni, {
          ...Uji(i.aliases),
          ...i.document,
          ...i.menus,
          ...i.settings,
          ...i.libraries,
          ...i.workspace
        }), c.jsx(hji, {
          ...$ji(o.lightbox),
          ...Gji(o.minimap),
          ...Vji(o.viewport),
          ...Hji(o.session)
        }), c.jsx(MUa, {
          isDark: n.isDark
        }), e.generationRunner]
      })]
    })]
  });
}

function Kji({
  theme: e,
  enableGenerationNodeAnimation: t,
  generationNodeAnimationMode: n,
  setCanvasFadedIn: r,
  apiConfigs: a,
  globalApiKey: i,
  toastSuccess: o,
  toastError: s
}) {
  const l = g.useRef(!1);
  g.useEffect(() => {
    pNa(n);
  }, [n, t]), g.useEffect(() => (dYt((d, u, h) => {
    d === "success" ? o(u, h) : d === "error" || d === "warning" ? s(u, h) : o(u, h);
  }), () => dYt(null)), [o, s]), g.useEffect(() => {
    cRr(e, document.documentElement, document.body), dRr(e), Ive();
  }, [e]), g.useEffect(() => {
    const u = "./".endsWith("/") ? "./" : ".//";
    document.documentElement.style.setProperty("--app-doodle-cursor", `url('${u}doodle-cursor.svg') 16 16`);
  }, []), g.useEffect(() => {
    const d = setTimeout(() => r(!0), 80);
    return () => clearTimeout(d);
  }, [r]), g.useEffect(() => {
    dAi();
  }, []), g.useEffect(() => {
    try {
      localStorage.removeItem("qiaodoumayi_canvas_state_compact"), localStorage.removeItem("qiaodoumayi_canvas_state_comprehensive"), localStorage.removeItem("qiaodoumayi_right_toolbar_collapsed");
    } catch {}
  }, []), g.useEffect(() => {
    l.current || (l.current = !0, Ie(async () => {
      const {
        cleanupExpiredCanvasCaches: d
      } = await Promise.resolve().then(() => Asa);
      return {
        cleanupExpiredCanvasCaches: d
      };
    }, void 0, import.meta.url).then(({
      cleanupExpiredCanvasCaches: d
    }) => {
      d();
    }).catch(() => {}), Promise.all([Ie(async () => {
      const {
        initializeEnvironment: d
      } = await Promise.resolve().then(() => zTa);
      return {
        initializeEnvironment: d
      };
    }, void 0, import.meta.url).then(({
      initializeEnvironment: d
    }) => d().catch(() => {}))]).then(() => {
      setTimeout(() => {
        Ie(async () => {
          const {
            memoryMonitor: d
          } = await Promise.resolve().then(() => eEe);
          return {
            memoryMonitor: d
          };
        }, void 0, import.meta.url).then(({
          memoryMonitor: d
        }) => {
          d.start(), typeof window < "u" && (window.memoryMonitor = d);
        }).catch(() => {}), Ie(async () => {
          const {
            initIdleMemoryCleanup: d
          } = await Promise.resolve().then(() => qfr);
          return {
            initIdleMemoryCleanup: d
          };
        }, void 0, import.meta.url).then(({
          initIdleMemoryCleanup: d
        }) => {
          d();
        }).catch(() => {}), Ie(async () => {
          const {
            initCanvasJsSuspend: d
          } = await Promise.resolve().then(() => Xsr);
          return {
            initCanvasJsSuspend: d
          };
        }, void 0, import.meta.url).then(({
          initCanvasJsSuspend: d
        }) => {
          d();
        }).catch(() => {});
      }, 5e3);
    }).catch(() => {}), setTimeout(() => {
      Ie(async () => {
        const {
          initializePerformanceOptimization: d
        } = await Promise.resolve().then(() => P2o);
        return {
          initializePerformanceOptimization: d
        };
      }, void 0, import.meta.url).then(({
        initializePerformanceOptimization: d
      }) => {
        d();
      }).catch(() => {}), Ie(async () => {
        const {
          initializeFinalOptimization: d
        } = await Promise.resolve().then(() => D2o);
        return {
          initializeFinalOptimization: d
        };
      }, void 0, import.meta.url).then(({
        initializeFinalOptimization: d
      }) => {
        d();
      }).catch(() => {});
    }, 4e3));
  }, []), g.useEffect(() => {
    const d = console.error;
    return console.error = (...u) => {
      var p;
      const h = ((p = u[0]) == null ? void 0 : p.toString()) || "";
      h.includes("ERR_FILE_NOT_FOUND") || h.includes("ERR_CONNECTION_REFUSED") || h.includes("blob:http") && h.includes("net::") || d.apply(console, u);
    }, () => {
      console.error = d;
    };
  }, []), g.useEffect(() => {
    const d = setTimeout(() => {
      Ie(async () => {
        const {
          initGeminiMarkerService: u
        } = await Promise.resolve().then(() => U2o);
        return {
          initGeminiMarkerService: u
        };
      }, void 0, import.meta.url).then(({
        initGeminiMarkerService: u
      }) => {
        u(a, i), console.log("[App] Gemini 标记分析服务已初始化");
      });
    }, 2e3);
    return () => clearTimeout(d);
  }, [a, i]);
}

function Qji({
  history: e,
  setHistory: t,
  setNodes: n,
  handleRefreshVideo: r,
  autoRefreshRhComfyOnMount: a,
  autoRefreshInFlightImageTasksOnMount: i
}) {
  const o = g.useRef(e);
  g.useEffect(() => {
    o.current = e;
  }, [e]);
  const s = g.useRef(r);
  s.current = r;
  const l = g.useMemo(() => e.filter(h => {
    var p;
    return h.status === "generating" && h.remoteTaskId && ((p = h.apiConfig) == null ? void 0 : p.modelId) && zv(h.apiConfig.modelId);
  }).map(h => h.id).sort().join(","), [e]);
  g.useEffect(() => {
    if (!l) return;
    const h = l.split(",").filter(Boolean),
      p = [];
    return h.forEach(m => {
      const f = window.setInterval(async () => {
        const b = o.current.find(v => v.id === m);
        if (!b) {
          clearInterval(f);
          return;
        }
        if (b.status !== "generating") {
          clearInterval(f);
          return;
        }
        try {
          await s.current(b);
        } catch (v) {
          console.error("[App] 可灵 O1 轮询刷新失败:", v);
        }
      }, 5e3);
      p.push(f);
    }), () => {
      p.forEach(m => clearInterval(m));
    };
  }, [l]);
  const d = g.useRef(!1);
  g.useEffect(() => {
    d.current || (d.current = !0, a(e));
  }, [e, a]);
  const u = g.useRef(!1);
  g.useEffect(() => {
    u.current || !i || e.filter(p => p.status === "generating" && p.remoteTaskId).length === 0 || (u.current = !0, i(e));
  }, [e, i]), g.useEffect(() => {
    const h = Date.now(),
      p = () => {
        const f = Date.now() - h < 45e3;
        t(y => {
          let b = !1;
          const v = y.map(_ => {
            if (_.status !== "generating" || F_t(String(_.id)) || f && String(_.remoteTaskId || "").trim()) return _;
            const w = i8n(_);
            return w !== _ ? (b = !0, w) : _;
          });
          return b ? v : y;
        });
      },
      m = window.setInterval(p, 3e4);
    return () => window.clearInterval(m);
  }, [t]), g.useEffect(() => {
    const h = f => {
        const {
          taskId: y,
          videoUrl: b,
          generationTime: v,
          sourceNodeId: _,
          previewNodeIds: w,
          previewSourceModel: k
        } = f.detail;
        console.log("[App] 收到 klingO1VideoComplete 事件:", {
          taskId: y,
          videoUrl: b == null ? void 0 : b.substring(0, 50),
          generationTime: v,
          sourceNodeId: _,
          previewNodeIds: w
        }), t(A => A.map(C => C.id === y ? (console.log("[App] 可灵 O1 视频完成，强制更新状态:", {
          id: C.id,
          oldStatus: C.status,
          newStatus: "completed"
        }), {
          ...C,
          status: "completed",
          url: b,
          progress: 100,
          generationTime: v
        }) : C)), pdr(f.detail);
      },
      p = f => {
        const {
          assetId: y
        } = f.detail;
        console.log("[App] 收到 assetDownloadComplete 事件:", y);
        const b = e.find(v => {
          var _;
          return v.id === y && ((_ = v.apiConfig) == null ? void 0 : _.modelId) && zv(v.apiConfig.modelId);
        });
        b && (console.log("[App] 可灵 O1 资源下载完成，当前状态:", b.status), console.log("[App] 强制更新状态为 completed:", y), t(v => v.map(w => w.id === y ? (console.log("[App] 更新历史项状态:", {
          id: w.id,
          oldStatus: w.status,
          newStatus: "completed"
        }), {
          ...w,
          status: "completed",
          progress: 100
        }) : w)));
      },
      m = f => {
        const {
          taskId: y
        } = f.detail;
        console.log("[App] 收到 allAssetsDownloadComplete 事件:", y);
        const b = e.find(v => {
          var _;
          return v.id === y && ((_ = v.apiConfig) == null ? void 0 : _.modelId) && zv(v.apiConfig.modelId);
        });
        b && (console.log("[App] 可灵 O1 所有资源下载完成，当前状态:", b.status), console.log("[App] 强制更新状态为 completed:", y), t(v => v.map(w => w.id === y ? (console.log("[App] 更新历史项状态 (all complete):", {
          id: w.id,
          oldStatus: w.status,
          newStatus: "completed"
        }), {
          ...w,
          status: "completed",
          progress: 100
        }) : w)));
      };
    return window.addEventListener("klingO1VideoComplete", h), window.addEventListener("assetDownloadComplete", p), window.addEventListener("allAssetsDownloadComplete", m), () => {
      window.removeEventListener("klingO1VideoComplete", h), window.removeEventListener("assetDownloadComplete", p), window.removeEventListener("allAssetsDownloadComplete", m);
    };
  }, [e, t, n]);
}

const hoe = "_batchOutputInputImageIds";

function opr(e) {
  return e <= 1 || e <= 2 ? 1 : e <= 4 ? 2 : 3;
}

function czt(e) {
  return !1;
}

const sAt = !1;

function qJe(e) {
  return !1;
}

function dzt(e, t, n, r) {
  var s;
  const a = new Set();
  for (const l of t) l.type === "input-image" && KJe(l, e.id) && a.add(l.id);
  for (const l of uzt(e, t)) l && a.add(l);
  if (a.size === 0) {
    const l = {
      ...e.settings
    };
    return hoe in l && (delete l[hoe], r(e.id, {
      settings: l
    })), [];
  }
  const i = [...a];
  for (const l of i) {
    const d = t.find(u => u.id === l);
    d && (d$e(d.content), d$e((s = d.settings) == null ? void 0 : s._blobUrl));
  }
  n(l => l.filter(d => !a.has(d.id)));
  const o = {
    ...e.settings
  };
  return delete o[hoe], r(e.id, {
    settings: o
  }), i;
}

function uzt(e, t) {
  var a;
  const n = (a = e.settings) == null ? void 0 : a[hoe];
  if (!Array.isArray(n)) return [];
  const r = n.filter(i => typeof i == "string" && i.trim().length > 0);
  return t != null && t.length ? r.filter(i => {
    const o = t.find(s => s.id === i);
    return o ? KJe(o, e.id) : !0;
  }) : r;
}

function KJe(e, t) {
  var r;
  if (e.type !== "input-image") return !1;
  const n = (r = e.settings) == null ? void 0 : r._genBatchOutputSourceId;
  return typeof n != "string" || !n.trim() ? !1 : n === t;
}

function d$e(e) {
  if (!(typeof e != "string" || !e.startsWith("blob:"))) try {
    URL.revokeObjectURL(e);
  } catch {}
}

async function Dun(e, t, n) {
  const r = [t, e].map(i => typeof i == "string" ? VY(i.trim()) : "").filter(i => i.length > 0),
    {
      assetStore: a
    } = await Ie(async () => {
      const {
        assetStore: i
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: i
      };
    }, void 0, import.meta.url);
  if (await a.init(), n) {
    try {
      const i = await a.getAssetBlob(n);
      if (i != null && i.size) return i;
    } catch {}
    for (const i of r) if (/^https?:\/\//i.test(i)) try {
      const {
        isTauriAssetProtocolUrl: o
      } = await Ie(async () => {
        const {
          isTauriAssetProtocolUrl: l
        } = await Promise.resolve().then(() => So);
        return {
          isTauriAssetProtocolUrl: l
        };
      }, void 0, import.meta.url);
      if (o(i)) continue;
      await Xu(i, n);
      const s = await a.getAssetBlob(n);
      if (s != null && s.size) return s;
    } catch {}
  }
  for (const i of r) {
    if (i.startsWith("blob:") || i.startsWith("data:")) {
      try {
        const s = await (await fetch(i)).blob();
        if (s.size) return s;
      } catch {}
      continue;
    }
    if (/^https?:\/\//i.test(i)) try {
      const {
        isTauriAssetProtocolUrl: o
      } = await Ie(async () => {
        const {
          isTauriAssetProtocolUrl: d
        } = await Promise.resolve().then(() => So);
        return {
          isTauriAssetProtocolUrl: d
        };
      }, void 0, import.meta.url);
      if (o(i)) continue;
      const {
          downloadWithFallback: s
        } = await Ie(async () => {
          const {
            downloadWithFallback: d
          } = await Promise.resolve().then(() => El);
          return {
            downloadWithFallback: d
          };
        }, void 0, import.meta.url),
        l = await s(i, 12e4, {
          cacheResult: !1
        });
      if (l != null && l.size) return l;
    } catch {
      try {
        const o = await fetch(i);
        if (o.ok) {
          const s = await o.blob();
          if (s.size) return s;
        }
      } catch {}
    }
  }
  return null;
}

async function Yji(e, t) {
  const n = String(e.originalUrl || "").trim(),
    r = String(e.remoteUrl || "").trim() || void 0,
    a = typeof e.assetId == "string" ? e.assetId.trim() : "";
  if (!n && !r) return null;
  const i = r || n;
  if (ua() && r && nr(r)) {
    let f = Number(e.imageWidth) > 0 ? Math.floor(Number(e.imageWidth)) : 0,
      y = Number(e.imageHeight) > 0 ? Math.floor(Number(e.imageHeight)) : 0;
    const v = (() => {
        if (/\/thumbnails\//i.test(n) && nr(n) || Qc(n) && nr(n)) return n;
        if (/\/thumbnails\//i.test(r)) return "";
        const A = Rk(r);
        return A && /imageView2/i.test(A) && mo(sc()) === "qiniu" ? "" : A;
      })() || (mo(sc()) === "qiniu" ? "" : Rk(r)),
      _ = Hv({
        remoteUrl: r,
        displayUrl: v,
        mediaType: "image",
        imageWidth: f > 0 ? f : void 0,
        imageHeight: y > 0 ? y : void 0
      }),
      w = typeof _.content == "string" && _.content.trim() || v,
      k = f > 0 && y > 0 ? kc(f, y) : kc(280, 280);
    return {
      content: w,
      frameWidth: k.width,
      frameHeight: k.height,
      pixelWidth: f || k.width,
      pixelHeight: y || k.height,
      settingsExtras: {
        ..._.settings,
        hasCustomSize: !0,
        imageSize: f > 0 && y > 0 ? `${f}×${y}` : void 0,
        dimensions: f > 0 && y > 0 ? {
          w: f,
          h: y
        } : void 0,
        _genBatchOutputSlot: t
      }
    };
  }
  try {
    const {
      isCanvasLocalCacheMode: f,
      isTauriLocalPreviewDisplayUrl: y
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: b,
        isTauriLocalPreviewDisplayUrl: v
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: b,
        isTauriLocalPreviewDisplayUrl: v
      };
    }, void 0, import.meta.url);
    if (f()) {
      const b = a || `gen_batch_out_${Date.now()}_${t}`,
        {
          localCacheManager: v
        } = await Ie(async () => {
          const {
            localCacheManager: C
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: C
          };
        }, void 0, import.meta.url);
      await v.ensureRestored();
      let _ = 0,
        w = 0,
        k = null;
      if (n.startsWith("blob:") || n.startsWith("data:")) try {
        k = await (await fetch(n)).blob();
      } catch {
        k = null;
      }
      if (k != null && k.size) {
        try {
          const C = await Rv(k);
          _ = C.width, w = C.height;
        } catch {}
        if (!v.hasAsset(b)) {
          const {
            assetStore: C
          } = await Ie(async () => {
            const {
              assetStore: I
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: I
            };
          }, void 0, import.meta.url);
          await C.init(), await C.saveBlobAsset(b, k, n);
        }
      } else if (!v.hasAsset(b) && (r || n) && !y(n)) {
        const C = await Dun(n, r, b);
        if (C != null && C.size) {
          k = C;
          try {
            const E = await Rv(C);
            _ = E.width, w = E.height;
          } catch {}
          const {
            assetStore: I
          } = await Ie(async () => {
            const {
              assetStore: E
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: E
            };
          }, void 0, import.meta.url);
          await I.init(), await I.saveBlobAsset(b, C, i);
        }
      }
      const {
          ensureLocalPreviewDisplayUrl: A
        } = await Ie(async () => {
          const {
            ensureLocalPreviewDisplayUrl: C
          } = await Promise.resolve().then(() => Ui);
          return {
            ensureLocalPreviewDisplayUrl: C
          };
        }, void 0, import.meta.url),
        S = (y(n) ? n : "") || (await A(b, {
          maxDim: wm
        })) || "";
      if (S) {
        let C = _,
          I = w;
        (C <= 0 || I <= 0) && (C = 1456, I = 816);
        const E = v.getAssetManifestMeta(b),
          M = ((E == null ? void 0 : E.fileName) || "").replace(/^.*[/\\]/, "").trim() || `${b}.png`,
          T = kc(C, I);
        return Il(S, b), {
          content: S,
          frameWidth: T.width,
          frameHeight: T.height,
          pixelWidth: C,
          pixelHeight: I,
          contentAssetId: b,
          settingsExtras: {
            _assetId: b,
            _contentAssetId: b,
            [dg]: b,
            _canvasDisplayPreviewUrl: S,
            hasCustomSize: !0,
            imageSize: `${C}×${I}`,
            dimensions: {
              w: C,
              h: I
            },
            mediaType: "image",
            _originalSize: (E == null ? void 0 : E.size) || (k == null ? void 0 : k.size) || void 0,
            _genBatchOutputSlot: t,
            disableThumbnailCreationOnImport: !0,
            _localDiskFileName: M
          },
          diskFileName: M
        };
      }
    }
  } catch {}
  const o = await Dun(n, r, a || void 0);
  if (!(o != null && o.size)) return null;
  const s = a || `gen_batch_out_${Date.now()}_${t}`,
    {
      assetStore: l
    } = await Ie(async () => {
      const {
        assetStore: f
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: f
      };
    }, void 0, import.meta.url);
  await l.init(), await l.saveBlobAsset(s, o, i);
  let d = 0,
    u = 0;
  try {
    const f = await Rv(o);
    d = f.width, u = f.height;
  } catch {
    d = 1456, u = 816;
  }
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
          ensureLocalPreviewDisplayUrl: y
        } = await Ie(async () => {
          const {
            ensureLocalPreviewDisplayUrl: _
          } = await Promise.resolve().then(() => Ui);
          return {
            ensureLocalPreviewDisplayUrl: _
          };
        }, void 0, import.meta.url),
        {
          localCacheManager: b
        } = await Ie(async () => {
          const {
            localCacheManager: _
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: _
          };
        }, void 0, import.meta.url),
        v = await y(s, {
          maxDim: wm
        });
      if (v) {
        const _ = b.getAssetManifestMeta(s),
          w = ((_ == null ? void 0 : _.fileName) || "").replace(/^.*[/\\]/, "").trim() || `${s}.png`,
          k = kc(d, u);
        return Il(v, s), {
          content: v,
          frameWidth: k.width,
          frameHeight: k.height,
          pixelWidth: d,
          pixelHeight: u,
          contentAssetId: s,
          settingsExtras: {
            _assetId: s,
            _contentAssetId: s,
            [dg]: s,
            _canvasDisplayPreviewUrl: v,
            hasCustomSize: !0,
            imageSize: `${d}×${u}`,
            dimensions: {
              w: d,
              h: u
            },
            mediaType: "image",
            _originalSize: o.size,
            _genBatchOutputSlot: t,
            disableThumbnailCreationOnImport: !0,
            _localDiskFileName: w
          },
          diskFileName: w
        };
      }
    }
  } catch {}
  const h = await i_(o, wm, $k),
    p = URL.createObjectURL(h);
  Il(p, s);
  const m = kc(d, u);
  return {
    content: p,
    frameWidth: m.width,
    frameHeight: m.height,
    pixelWidth: d,
    pixelHeight: u,
    contentAssetId: s,
    settingsExtras: {
      _assetId: s,
      _contentAssetId: s,
      [dg]: s,
      hasCustomSize: !0,
      imageSize: `${d}×${u}`,
      dimensions: {
        w: d,
        h: u
      },
      ...(r && /^https?:\/\//i.test(r) ? {
        originalUrl: r
      } : a || !n.startsWith("blob:") ? {} : {
        originalUrl: i
      }),
      _genBatchOutputSlot: t,
      disableThumbnailCreationOnImport: !0
    }
  };
}

function Xji(e, t) {
  if (t.length === 0) return {
    originX: e.x + e.width + 48,
    originY: e.y,
    appendToExistingGrid: !1
  };
  const r = Math.max(...t.map(i => i.x + i.width)),
    a = Math.min(...t.map(i => i.y));
  return {
    originX: r + 48,
    originY: a,
    appendToExistingGrid: !0
  };
}

function Jji(e, t, n) {
  const r = t.length,
    a = opr(r),
    i = Math.ceil(r / a),
    o = 20,
    s = (n == null ? void 0 : n.originX) ?? e.x + e.width + 48,
    l = (n == null ? void 0 : n.originY) ?? e.y,
    d = Array.from({
      length: a
    }, () => 0),
    u = Array.from({
      length: i
    }, () => 0);
  for (let v = 0; v < r; v++) {
    const _ = v % a,
      w = Math.floor(v / a);
    d[_] = Math.max(d[_], t[v].width), u[w] = Math.max(u[w], t[v].height);
  }
  const h = [];
  let p = s;
  for (let v = 0; v < a; v++) h[v] = p, p += d[v] + o;
  const m = [];
  let f = l;
  for (let v = 0; v < i; v++) m[v] = f, f += u[v] + o;
  const y = u.reduce((v, _) => v + _, 0) + o * Math.max(0, i - 1),
    b = n != null && n.appendToExistingGrid ? 0 : Math.max(0, (e.height - y) / 2);
  for (let v = 0; v < i; v++) m[v] += b;
  return t.map((v, _) => {
    const w = _ % a,
      k = Math.floor(_ / a);
    return {
      x: h[w],
      y: m[k],
      width: v.width,
      height: v.height
    };
  });
}

function Zji(e, t) {
  var r;
  return `${((r = e.nodeName) == null ? void 0 : r.trim()) || "生成图片"}_${t + 1}`;
}

async function spr(e) {
  const {
      sourceNode: t,
      slots: n,
      setNodes: r,
      updateNode: a,
      generateId: i
    } = e,
    o = String(e.historyTaskId || "").trim(),
    s = [];
  for (let y = 0; y < n.length; y++) try {
    y > 0 && (await Id());
    const b = await Yji(n[y], y);
    b && s.push(b);
  } catch (b) {
    console.warn(`[syncGenBatchOutputInputImageNodes] slot ${y} 预备失败:`, b);
  }
  if (s.length === 0) return [];
  const l = e.nodes.filter(y => y.type === "input-image" && KJe(y, t.id)),
    d = uzt(t, e.nodes),
    u = l.length,
    h = Xji(t, l),
    p = Jji(t, s.map(y => ({
      width: y.frameWidth,
      height: y.frameHeight
    })), h),
    m = [...d.filter(y => e.nodes.some(b => b.id === y)), ...l.map(y => y.id).filter(y => !d.includes(y))],
    f = [];
  for (let y = 0; y < s.length; y++) {
    const b = s[y],
      v = p[y],
      _ = i();
    m.push(_), f.push({
      nodeId: _,
      nodeName: Zji(t, u + y),
      prep: b,
      layout: v,
      slotIndex: u + y
    });
  }
  return r(y => {
    let b = [...y];
    for (const v of f) {
      const {
          nodeId: _,
          nodeName: w,
          prep: k,
          layout: A,
          slotIndex: S
        } = v,
        C = {
          _genBatchOutputSourceId: t.id,
          _genBatchOutputSlot: S,
          ...(o ? {
            [OS]: o
          } : {}),
          ...k.settingsExtras
        },
        I = Ki(_, "input-image", A.x, A.y, w, C, b);
      b.push({
        ...I,
        width: A.width,
        height: A.height,
        content: k.content,
        prompt: k.diskFileName || (typeof k.settingsExtras._localDiskFileName == "string" ? k.settingsExtras._localDiskFileName : void 0) || I.prompt,
        ...(k.contentAssetId ? {
          _contentAssetId: k.contentAssetId
        } : {}),
        settings: C
      });
    }
    return b;
  }), a(t.id, {
    settings: {
      ...(t.settings || {}),
      [hoe]: m
    }
  }), m;
}

const lpr = ["generatedImages", "generatedImageUrl", "mjImages", "previewMjImages", "batchImages", "selectedMjImageIndex", "_mjAssetIds", "_mjPreviewAssetIds", "_contentAssetId", "_localCacheAssetId", "_assetId", "_blobUrl", "_canvasDisplayPreviewUrl", "_pendingRemoteResultUrl", "_thumbnailAssetId", "_compactOriginalRelPath", "generationVersions", "activeGenerationVersionIndex", "_preGenerateSnapshot", "previewSize", "previewActualSize", _i, Pi, Cl, T0];

async function cpr(e) {
  var s;
  const {
      updateNode: t,
      setNodes: n
    } = k_i(e.updateNode, e.setNodes, e.live ?? (() => !0)),
    r = ((s = e.nodesRef) == null ? void 0 : s.current) ?? e.nodes,
    a = r.find(l => l.id === e.sourceNode.id) ?? e.sourceNode,
    i = await spr({
      sourceNode: a,
      slots: e.slots,
      nodes: r,
      setNodes: n,
      updateNode: t,
      generateId: e.generateId,
      historyTaskId: e.historyTaskId
    }),
    o = {
      ...a.settings
    };
  for (const l of lpr) delete o[l];
  return t(a.id, {
    isGenerating: !1,
    content: "",
    _contentAssetId: void 0,
    previewMjImages: void 0,
    _previewMjAssetIds: void 0,
    thumbnailUrl: void 0,
    errorMsg: void 0,
    settings: {
      ...o,
      isGenerating: !1,
      progress: 100,
      error: null
    }
  }), e.logLabel, i;
}

async function hzt(e, t, n) {
  const r = e.filter(d => d.startsWith("blob:")),
    a = () => e.map((d, u) => ({
      originalUrl: d,
      assetId: t[u]
    }));
  if (!ua() || t.length === 0) return {
    slots: a(),
    ephemeralBlobUrls: r
  };
  const {
      assetStore: i
    } = await Ie(async () => {
      const {
        assetStore: d
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: d
      };
    }, void 0, import.meta.url),
    {
      resolveGenImageUrlsViaGlobalOss: o
    } = await Ie(async () => {
      const {
        resolveGenImageUrlsViaGlobalOss: d
      } = await Promise.resolve().then(() => ii);
      return {
        resolveGenImageUrlsViaGlobalOss: d
      };
    }, void 0, import.meta.url);
  await i.init();
  const s = [],
    l = [];
  for (let d = 0; d < t.length; d++) {
    const u = t[d];
    let h = e[d] || "";
    try {
      const p = await i.getAssetBlob(u);
      if (p != null && p.size) {
        const m = URL.createObjectURL(p);
        l.push(m), h = m;
      }
    } catch {}
    s.push(h);
  }
  try {
    const d = await o(s, n);
    if ((d == null ? void 0 : d.length) === t.length) return {
      slots: d.map((u, h) => ({
        originalUrl: u.displayUrl,
        remoteUrl: u.remoteUrl,
        assetId: t[h],
        imageWidth: u.imageWidth,
        imageHeight: u.imageHeight
      })),
      ephemeralBlobUrls: [...r, ...l, ...e.filter(u => u.startsWith("blob:"))]
    };
  } catch (d) {
    console.warn("[resolveMjSplitSlotsForSideOutput] OSS 上传切片失败，回退本地:", d);
  } finally {
    for (const d of l) d$e(d);
  }
  return {
    slots: a(),
    ephemeralBlobUrls: r
  };
}

function dpr(e) {
  return ua() ? e.some(t => {
    const n = String(t.remoteUrl || "").trim();
    return !!n && nr(n);
  }) : !1;
}

async function upr(e) {
  var m;
  const {
    slots: t,
    ephemeralBlobUrls: n
  } = await hzt(e.splitDisplayUrls, e.splitAssetIds, e.ossIdPrefix);
  let r = t.map(f => String(f.originalUrl || "").trim());
  const a = f => !!f && nr(f) && !/\/thumbnails\//i.test(f) && !/-list\.webp(?:$|\?)/i.test(f),
    i = t.map(f => {
      const y = String(f.remoteUrl || "").trim();
      if (a(y)) return y;
      const b = String(f.originalUrl || "").trim();
      return a(b) ? b : "";
    }),
    o = dpr(t) && i.filter(Boolean).length === t.length;
  if (!o && e.splitAssetIds.length > 0) try {
    const {
        acceptHistoryListDisplayUrl: f,
        isStableHistoryListDisplayUrl: y
      } = await Ie(async () => {
        const {
          acceptHistoryListDisplayUrl: k,
          isStableHistoryListDisplayUrl: A
        } = await Promise.resolve().then(() => w9r);
        return {
          acceptHistoryListDisplayUrl: k,
          isStableHistoryListDisplayUrl: A
        };
      }, void 0, import.meta.url),
      {
        ensureLocalPreviewDisplayUrl: b
      } = await Ie(async () => {
        const {
          ensureLocalPreviewDisplayUrl: k
        } = await Promise.resolve().then(() => Ui);
        return {
          ensureLocalPreviewDisplayUrl: k
        };
      }, void 0, import.meta.url),
      {
        localCacheManager: v
      } = await Ie(async () => {
        const {
          localCacheManager: k
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: k
        };
      }, void 0, import.meta.url),
      {
        assetStore: _
      } = await Ie(async () => {
        const {
          assetStore: k
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: k
        };
      }, void 0, import.meta.url),
      {
        isTauriLocalPreviewDisplayUrl: w
      } = await Ie(async () => {
        const {
          isTauriLocalPreviewDisplayUrl: k
        } = await Promise.resolve().then(() => So);
        return {
          isTauriLocalPreviewDisplayUrl: k
        };
      }, void 0, import.meta.url);
    await v.ensureRestored(), await _.init(), r = [];
    for (let k = 0; k < e.splitAssetIds.length; k++) {
      k > 0 && (await Id());
      const A = e.splitAssetIds[k],
        S = String(((m = t[k]) == null ? void 0 : m.originalUrl) || e.splitDisplayUrls[k] || "").trim();
      if (S && (w(S) || y(S) && !nr(S))) {
        const I = f(S);
        if (I) {
          r.push(I);
          continue;
        }
      }
      try {
        if (!v.hasAsset(A)) {
          let I = await _.getAssetBlob(A);
          if (!(I != null && I.size) && /^https?:\/\//i.test(S)) try {
            const {
              downloadWithFallback: E
            } = await Ie(async () => {
              const {
                downloadWithFallback: M
              } = await Promise.resolve().then(() => El);
              return {
                downloadWithFallback: M
              };
            }, void 0, import.meta.url);
            I = await E(S, 12e4, {
              cacheResult: !1
            });
          } catch {
            I = null;
          }
          I != null && I.size && (await _.saveBlobAsset(A, I, S), v.hasAsset(A) || (await v.saveAsset(A, I, I.type || "image/png", S || void 0)));
        }
      } catch {}
      const C = f(await b(A, {
        maxDim: wm
      }));
      r.push(C || "");
    }
  } catch (f) {
    console.warn("[resolveMjSplitDisplayForHistory] 本地 preview 固化失败:", f);
  }
  if (!o) {
    r = await Promise.all(r.map(f => Oye(f)));
    for (let f = 0; f < t.length; f++) t[f] = {
      ...t[f],
      originalUrl: r[f] || "",
      remoteUrl: void 0
    };
  }
  const s = r.some(f => !!f),
    l = r.find(f => !!f) || i.find(f => !!f) || "",
    d = s ? r : i,
    u = i.find(f => !!f) || "",
    h = o ? r.map(f => f && /\/thumbnails\//i.test(f) ? f : "") : null,
    p = {
      url: (h == null ? void 0 : h.find(Boolean)) || l || u,
      mjImages: o ? i : d,
      mjThumbnails: h || (s ? r : d),
      selectedMjImageIndex: 0,
      mjNeedsSplit: !1,
      _mjAssetIds: e.splitAssetIds,
      thumbnailUrl: (h == null ? void 0 : h.find(Boolean)) || l || void 0,
      ...(o ? {
        ossUploaded: !0,
        _globalOssUrlOnly: !0,
        _ossRemoteUrl: u || void 0,
        _ossThumbnailUrl: (h == null ? void 0 : h.find(Boolean)) || void 0,
        originalUrl: u || void 0,
        mjOriginalUrl: u || void 0
      } : {
        _assetId: e.splitAssetIds[0],
        _globalOssUrlOnly: !1,
        ossUploaded: !1
      })
    };
  return {
    slots: t,
    displayUrls: r,
    remoteUrls: i,
    historyPatch: p,
    ephemeralBlobUrls: n
  };
}

async function Oye(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  const {
    isTauriAssetProtocolUrl: n,
    isTauriLocalOriginalImageUrl: r,
    isTauriLocalPreviewDisplayUrl: a
  } = await Ie(async () => {
    const {
      isTauriAssetProtocolUrl: i,
      isTauriLocalOriginalImageUrl: o,
      isTauriLocalPreviewDisplayUrl: s
    } = await Promise.resolve().then(() => So);
    return {
      isTauriAssetProtocolUrl: i,
      isTauriLocalOriginalImageUrl: o,
      isTauriLocalPreviewDisplayUrl: s
    };
  }, void 0, import.meta.url);
  return r(t) ? "" : t.startsWith("blob:") || t.startsWith("data:") || a(t) || t.startsWith("data:image/webp") || t.startsWith("content_ref:") || /^https?:\/\//i.test(t) && !n(t) && /\/thumbnails\//i.test(t) ? t : "";
}

async function hpr(e, t) {
  var i;
  const n = String(t || "").trim(),
    r = String(e || "").trim() || `mj_split_${Date.now().toString(36)}`,
    a = typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window);
  if (ua() && /^https?:\/\//i.test(n)) return {
    url: n,
    revoke: !1
  };
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
    if (await o.ensureRestored(), o.isAvailable() && o.hasAsset(r)) {
      const s = await o.getConvertFileSrcForAsset(r);
      if (s) return {
        url: s,
        revoke: !1
      };
    }
  } catch {}
  try {
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
    if (o() && a && /^https?:\/\//i.test(n)) {
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
      await l();
      const d = (i = s.getDirectoryPathTauri()) == null ? void 0 : i.trim();
      if (d && s.isAvailable()) {
        if (!s.hasAsset(r)) {
          const {
              invoke: h
            } = await Ie(async () => {
              const {
                invoke: m
              } = await Promise.resolve().then(() => sd);
              return {
                invoke: m
              };
            }, void 0, import.meta.url),
            p = await h("download_url_to_local_asset", {
              args: {
                url: n,
                assetId: r,
                cacheRoot: d,
                fileNameHint: `mj_${r}.png`
              }
            });
          p != null && p.relativePath && (await s.registerExistingAsset({
            assetId: p.assetId || r,
            relativePath: p.relativePath,
            mimeType: p.mimeType,
            size: p.size,
            remoteUrl: p.remoteUrl || n,
            absolutePath: p.absolutePath
          }), Ie(async () => {
            const {
              ensureLocalPreviewAfterRustDownload: m
            } = await Promise.resolve().then(() => Ui);
            return {
              ensureLocalPreviewAfterRustDownload: m
            };
          }, void 0, import.meta.url).then(({
            ensureLocalPreviewAfterRustDownload: m
          }) => m(p.assetId || r, p.relativePath)).catch(() => {}));
        }
        const u = await s.getConvertFileSrcForAsset(r);
        if (u) return {
          url: u,
          revoke: !1
        };
      }
    }
  } catch (o) {
    console.warn("[resolveMjSplitSourceUrl] 本地直写失败，回退远程 URL:", o);
  }
  return {
    url: n || "",
    revoke: !1
  };
}

async function eDi(e) {
  var n;
  if (!(typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window))) return null;
  try {
    const {
      isCanvasLocalCacheMode: r
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: v
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: v
      };
    }, void 0, import.meta.url);
    if (!r() || ua()) return null;
    const a = String(e.mjSplitBatchId || "").trim() || `mj_split_${Date.now()}`,
      i = [0, 1, 2, 3].map(v => `${a}_split_${v}`),
      o = String(e.compositeAssetId || "").trim() || `mj_split_${Date.now().toString(36)}`,
      s = String(e.compositeRemoteUrl || "").trim();
    if (!(await hpr(o, s || o)).url) return null;
    const {
      localCacheManager: d,
      ensureCacheRootReadyForWrite: u
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
    await u(), await d.ensureRestored();
    const h = (n = d.getDirectoryPathTauri()) == null ? void 0 : n.trim();
    if (!h || !d.isAvailable()) return null;
    const p = d.getAssetManifestMeta(o),
      m = String((p == null ? void 0 : p.fileName) || "").trim().replace(/\\/g, "/");
    if (!m || !d.hasAsset(o)) return console.warn("[MJ native split] 复合图未落盘，跳过 Rust 切图", {
      compositeId: o
    }), null;
    const {
        invoke: f
      } = await Ie(async () => {
        const {
          invoke: v
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: v
        };
      }, void 0, import.meta.url),
      y = await f("split_local_asset_image_2x2", {
        args: {
          cacheRoot: h,
          sourceRelativePath: m,
          splitAssetIds: i,
          previewMaxDim: wm,
          preferFfmpeg: !!e.preferFfmpeg
        }
      });
    if (!(y != null && y.slots) || y.slots.length !== 4) return null;
    const b = [];
    for (let v = 0; v < y.slots.length; v++) {
      v > 0 && (await Id());
      const _ = y.slots[v],
        w = _.assetId || i[v];
      await d.registerExistingAsset({
        assetId: w,
        relativePath: _.relativePath,
        mimeType: _.mimeType || "image/png",
        size: _.size,
        absolutePath: _.absolutePath,
        remoteUrl: s || void 0
      }), _.previewRelativePath && (await d.registerExistingAsset({
        assetId: _.previewAssetId || `preview_${w}`,
        relativePath: _.previewRelativePath,
        mimeType: "image/jpeg",
        size: _.previewSize,
        absolutePath: _.previewAbsolutePath
      }));
      const k = (await d.getConvertFileSrcForAsset(_.previewAssetId || `preview_${w}`)) || (await d.getConvertFileSrcForAsset(w)) || "";
      b.push(k), k && Il(k, w);
    }
    return console.info("[MJ native split] 磁盘直切完成", {
      engine: y.engine,
      compositeId: o,
      slots: i.length
    }), {
      historySplitUrls: b,
      mjSplitAssetIds: i,
      engine: y.engine || "image"
    };
  } catch (r) {
    return console.warn("[MJ native split] Rust/ffmpeg 切图失败，将回退 WebView Canvas:", r), null;
  }
}

async function tDi(e) {
  const t = e.splitUrls || [],
    n = String(e.mjSplitBatchId || "").trim() || `mj_split_${Date.now()}`,
    r = t.map((l, d) => `${n}_split_${d}`),
    a = [],
    {
      assetStore: i
    } = await Ie(async () => {
      const {
        assetStore: l
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: l
      };
    }, void 0, import.meta.url),
    {
      localCacheManager: o
    } = await Ie(async () => {
      const {
        localCacheManager: l
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: l
      };
    }, void 0, import.meta.url),
    {
      ensureLocalPreviewDisplayUrl: s
    } = await Ie(async () => {
      const {
        ensureLocalPreviewDisplayUrl: l
      } = await Promise.resolve().then(() => Ui);
      return {
        ensureLocalPreviewDisplayUrl: l
      };
    }, void 0, import.meta.url);
  await i.init(), await o.ensureRestored();
  for (let l = 0; l < t.length; l++) {
    l > 0 && (await Id());
    const d = t[l],
      u = r[l];
    try {
      if (!d || !d.startsWith("blob:")) {
        console.warn("[MJ] Invalid blob URL:", d), a.push(d || "");
        continue;
      }
      const h = await fetch(d);
      if (!h.ok) {
        console.error("[MJ] Fetch split blob failed:", h.status), a.push("");
        continue;
      }
      const p = await h.blob();
      let m = !1;
      try {
        m = await i.saveBlobAsset(u, p, d);
        try {
          m && !o.hasAsset(u) && (await o.saveAsset(u, p, p.type || "image/png", d));
        } catch {}
        const f = await s(u, {
          maxDim: wm
        });
        if (f) {
          a.push(f);
          continue;
        }
        try {
          const {
            persistHistoryListThumbnailLocal: y,
            buildListPreviewFileFromBlob: b
          } = await Ie(async () => {
            const {
              persistHistoryListThumbnailLocal: w,
              buildListPreviewFileFromBlob: k
            } = await Promise.resolve().then(() => ii);
            return {
              persistHistoryListThumbnailLocal: w,
              buildListPreviewFileFromBlob: k
            };
          }, void 0, import.meta.url);
          await y(u, p, {
            forceReplace: !0
          });
          const v = await b(p, `preview-${u}`);
          v && (await i.saveBlobAsset(`preview_${u}`, v, ""));
          const _ = await s(u, {
            maxDim: wm
          });
          if (_) {
            a.push(_);
            continue;
          }
        } catch (y) {
          console.warn(`[MJ] split ${l} 缩略图保存失败:`, y);
        }
        if (m) {
          const y = await o.readThumbnail(u, "preview");
          if (y) {
            a.push(y);
            continue;
          }
        } else console.warn("[MJ] Failed to save blob to assetStore");
      } catch (f) {
        console.error(`[MJ] assetStore error for split ${l}:`, f);
      }
      a.push("");
    } catch (h) {
      console.error("[MJ] Failed to create history blob:", h), a.push(d || "");
    }
  }
  return {
    historySplitUrls: a,
    mjSplitAssetIds: r
  };
}

async function nDi(e) {
  const t = Cp(e);
  if (!t || !nr(t)) return null;
  const n = `${t}${t.includes("?") ? "&" : "?"}x-oss-process=image/info`;
  try {
    const {
        downloadWithFallback: r
      } = await Ie(async () => {
        const {
          downloadWithFallback: u
        } = await Promise.resolve().then(() => El);
        return {
          downloadWithFallback: u
        };
      }, void 0, import.meta.url),
      a = await r(n, 3e4, {
        cacheResult: !1
      });
    if (!(a != null && a.size) || a.size > 64 * 1024) return null;
    const i = await a.text(),
      o = JSON.parse(i),
      s = u => {
        const h = o[u];
        return typeof h == "number" ? h : typeof h == "string" ? Number(h) : h && typeof h == "object" && "value" in h ? Number(h.value) : NaN;
      },
      l = s("ImageWidth"),
      d = s("ImageHeight");
    if (Number.isFinite(l) && Number.isFinite(d) && l >= 4 && d >= 4) return {
      w: Math.floor(l),
      h: Math.floor(d)
    };
  } catch {}
  return null;
}

function rDi(e, t, n) {
  const r = Cp(e),
    a = Math.max(1, Math.floor(t / 2)),
    i = Math.max(1, Math.floor(n / 2));
  return [{
    x: 0,
    y: 0
  }, {
    x: a,
    y: 0
  }, {
    x: 0,
    y: i
  }, {
    x: a,
    y: i
  }].map(({
    x: s,
    y: l
  }) => {
    const d = r.includes("?") ? "&" : "?";
    return `${r}${d}x-oss-process=image/crop,x_${s},y_${l},w_${a},h_${i}`;
  });
}

function aDi(e, t) {
  const n = e.map((o, s) => ({
      originalUrl: o.displayUrl,
      remoteUrl: o.remoteUrl,
      assetId: t[s],
      imageWidth: o.imageWidth,
      imageHeight: o.imageHeight
    })),
    r = e.map(o => {
      const s = String(o.displayUrl || "").trim();
      return s && /\/thumbnails\//i.test(s) ? s : "";
    }),
    a = e.map(o => o.remoteUrl),
    i = r.find(o => !!o) || "";
  return {
    slots: n,
    displayUrls: e.map(o => String(o.displayUrl || "").trim()),
    remoteUrls: a,
    ephemeralBlobUrls: [],
    historyPatch: {
      url: i || a.find(o => !!o) || "",
      mjImages: a.map(o => o && !/\/thumbnails\//i.test(o) && !/-list\.webp(?:$|\?)/i.test(o) ? o : ""),
      mjThumbnails: r,
      selectedMjImageIndex: 0,
      mjNeedsSplit: !1,
      _mjAssetIds: t,
      thumbnailUrl: i || void 0,
      ossUploaded: !0,
      _globalOssUrlOnly: !0,
      _ossRemoteUrl: a.find(o => o && !/\/thumbnails\//i.test(o) && !/-list\.webp(?:$|\?)/i.test(o)),
      _ossThumbnailUrl: r.find(o => !!o),
      originalUrl: a.find(o => o && !/\/thumbnails\//i.test(o) && !/-list\.webp(?:$|\?)/i.test(o)),
      mjOriginalUrl: a.find(o => o && !/\/thumbnails\//i.test(o) && !/-list\.webp(?:$|\?)/i.test(o))
    }
  };
}

async function ppr(e) {
  if (!ua()) return null;
  const t = String(e.compositeRemoteUrl || "").trim();
  if (!t || !nr(t)) return null;
  const n = sc();
  if (mo(n) !== "aliyun-oss") return null;
  const r = Cp(t),
    a = await nDi(r);
  let i = (a == null ? void 0 : a.w) || 0,
    o = (a == null ? void 0 : a.h) || 0;
  const s = Number(e.knownWidth) || 0,
    l = Number(e.knownHeight) || 0;
  !(i >= 4 && o >= 4) && s >= 1024 && l >= 1024 && (i = Math.floor(s), o = Math.floor(l)), i >= 4 && o >= 4 || (i = 2048, o = 2048);
  const d = rDi(r, i, o),
    u = d.map((h, p) => `${e.ossIdPrefix}_split_${p}`);
  try {
    const h = await mCt(d, e.ossIdPrefix);
    return !h || h.length !== 4 || !h.every(p => nr(p.remoteUrl)) ? null : (console.info("[MJ OSS] 服务端 crop 四宫格完成（未写本地 images/）", {
      w: i,
      h: o,
      prefix: e.ossIdPrefix
    }), aDi(h, u));
  } catch (h) {
    return console.warn("[MJ OSS] 服务端 crop 失败，将回退内存切图:", h), null;
  }
}

async function mpr(e) {
  var r;
  if (!ua()) return null;
  const t = String(e.compositeRemoteUrl || "").trim();
  if (!t || !/^https?:\/\//i.test(t)) return null;
  let n = [];
  try {
    try {
      const {
          tryCropRegionsNativeForOssUpload: o
        } = await Ie(async () => {
          const {
            tryCropRegionsNativeForOssUpload: l
          } = await Promise.resolve().then(() => zmo);
          return {
            tryCropRegionsNativeForOssUpload: l
          };
        }, void 0, import.meta.url),
        s = await o({
          imageUrl: t,
          auto2x2: !0,
          preferFfmpeg: !0
        });
      ((r = s == null ? void 0 : s.images) == null ? void 0 : r.length) === 4 && (n = s.images.map(l => l.url));
    } catch (o) {
      console.warn("[MJ OSS] 本机切图跳过，回退 Canvas:", o);
    }
    if (n.length !== 4 && (n = (await HCn(t)).map(s => s.url).filter(s => s.startsWith("blob:"))), n.length !== 4) return null;
    const a = n.map((o, s) => `${e.ossIdPrefix}_split_${s}`),
      i = await upr({
        splitDisplayUrls: n,
        splitAssetIds: a,
        ossIdPrefix: e.ossIdPrefix
      });
    for (const o of i.ephemeralBlobUrls) try {
      o.startsWith("blob:") && URL.revokeObjectURL(o);
    } catch {}
    for (const o of n) try {
      URL.revokeObjectURL(o);
    } catch {}
    return dpr(i.slots) ? {
      ...i,
      ephemeralBlobUrls: []
    } : null;
  } catch (a) {
    console.warn("[MJ OSS] 切图上传失败:", a);
    for (const i of n) try {
      i.startsWith("blob:") && URL.revokeObjectURL(i);
    } catch {}
    return null;
  }
}

async function iDi(e) {
  if (!ua()) return null;
  const t = await ppr(e);
  return t || mpr({
    compositeRemoteUrl: e.compositeRemoteUrl,
    ossIdPrefix: e.ossIdPrefix
  });
}

async function lAt(e, t, n) {
  const r = String(e || "").trim();
  if (!r) return "";
  try {
    const {
      isCanvasLocalCacheMode: a
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: i
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: i
      };
    }, void 0, import.meta.url);
    if (a() && n) {
      const {
        ensureLocalPreviewDisplayUrl: i,
        readLocalPreviewThumbnailAsUrl: o
      } = await Ie(async () => {
        const {
          ensureLocalPreviewDisplayUrl: l,
          readLocalPreviewThumbnailAsUrl: d
        } = await Promise.resolve().then(() => Ui);
        return {
          ensureLocalPreviewDisplayUrl: l,
          readLocalPreviewThumbnailAsUrl: d
        };
      }, void 0, import.meta.url);
      for (const l of [t, n]) {
        const d = await Oye(await o(l));
        if (d) return d;
      }
      const s = await Oye(await i(n, {
        maxDim: wm
      }));
      if (s) return s;
    }
  } catch {}
  try {
    const {
        persistGenResultPreviewThumbnail: a
      } = await Ie(async () => {
        const {
          persistGenResultPreviewThumbnail: o
        } = await Promise.resolve().then(() => ii);
        return {
          persistGenResultPreviewThumbnail: o
        };
      }, void 0, import.meta.url),
      i = await Oye(await a(r, t, n));
    if (i) return i;
  } catch {}
  try {
    const {
        getFullBlobForDisplayUrl: a
      } = await Ie(async () => {
        const {
          getFullBlobForDisplayUrl: o
        } = await Promise.resolve().then(() => No);
        return {
          getFullBlobForDisplayUrl: o
        };
      }, void 0, import.meta.url),
      i = await a(r, n);
    if (i) {
      const o = await i_(i, wm, $k);
      if (o) return URL.createObjectURL(o);
    }
  } catch {}
  return (await Oye(r)) || "";
}

async function fpr(e) {
  var w, k, A, S;
  if (!MZ(e.node) || e.node.type !== "gen-image") return;
  if (e.appliedSideOutput) {
    const E = {
      ...((((w = e.nodesRef) == null ? void 0 : w.current) ?? e.nodesFallback ?? []).find(M => M.id === e.node.id) || e.node).settings
    };
    for (const M of lpr) delete E[M];
    delete E.mjNeedsSplit, delete E.mjSplitError, e.updateNode(e.node.id, {
      isGenerating: !1,
      content: "",
      _contentAssetId: void 0,
      previewMjImages: void 0,
      _previewMjAssetIds: void 0,
      thumbnailUrl: void 0,
      errorMsg: void 0,
      settings: {
        ...E,
        isGenerating: !1,
        progress: 100,
        error: null,
        _mjAssetIds: e.splitAssetIds
      }
    });
    return;
  }
  const t = String(e.compositeRemoteUrl || "").trim(),
    n = String(e.compositeDisplayUrl || t || "").trim();
  if (!n && !t) return;
  const r = e.compositeOssSettings && Object.keys(e.compositeOssSettings).length > 0 ? e.compositeOssSettings : void 0,
    a = !!(r != null && r[Cl]) || nr(t) && nr(n);
  let i = n;
  if (!(nr(n) && (/\/thumbnails\//i.test(n) || !!(r != null && r[Pi] && nr(String(r[Pi])))))) {
    const C = await lAt(n || t, e.taskId, e.taskId);
    C && (i = C);
  }
  const l = (((k = e.nodesRef) == null ? void 0 : k.current) ?? e.nodesFallback ?? []).find(C => C.id === e.node.id) || e.node,
    d = {
      ...l.settings
    };
  delete d._pendingRemoteResultUrl, delete d.mjNeedsSplit, delete d.mjSplitError;
  const u = typeof e.compositePreviewActualSize == "string" && e.compositePreviewActualSize.trim() ? e.compositePreviewActualSize.trim() : void 0;
  i && !a && Il(i, e.taskId);
  let h = {},
    p = [];
  !e.appliedSideOutput && e.displayUrls.length > 0 && (p = e.remoteUrls.some(I => nr(I)) ? e.displayUrls : await (async () => {
    const I = [];
    for (let E = 0; E < e.displayUrls.length; E++) {
      E > 0 && (await Id());
      const M = e.displayUrls[E],
        T = await lAt(M, e.splitAssetIds[E], e.splitAssetIds[E]);
      I.push(T || M);
    }
    return I;
  })(), p.forEach((I, E) => {
    I && e.splitAssetIds[E] && Il(I, e.splitAssetIds[E]);
  }), h = {
    mjImages: p,
    previewMjImages: p,
    selectedMjImageIndex: 0,
    _mjPreviewAssetIds: e.splitAssetIds
  });
  const m = p.map((C, I) => {
      var E, M;
      return {
        id: `${e.taskId}_mj_split_${I}`,
        thumbUrl: C,
        fullUrl: e.remoteUrls[I] || ((E = e.slots[I]) == null ? void 0 : E.remoteUrl) || ((M = e.slots[I]) == null ? void 0 : M.originalUrl) || C,
        createdAt: Date.now(),
        assetId: e.splitAssetIds[I]
      };
    }),
    f = p[0] || i,
    y = e.remoteUrls[0] || ((A = e.slots[0]) == null ? void 0 : A.remoteUrl) || ((S = e.slots[0]) == null ? void 0 : S.originalUrl) || t,
    b = e.splitAssetIds[0] || e.taskId,
    v = {
      ...d,
      isGenerating: !1,
      progress: 100,
      error: null,
      _mjAssetIds: e.splitAssetIds,
      generatedImages: m.length > 0 ? m : [{
        id: `${e.taskId}_mj_composite`,
        thumbUrl: i,
        fullUrl: t || n,
        createdAt: Date.now(),
        assetId: e.taskId
      }],
      ...(u ? {
        previewActualSize: u,
        previewSize: u
      } : {}),
      ...(r || {}),
      ...(nr(y) ? {
        [_i]: y,
        ...(nr(f) ? {
          [Pi]: f
        } : {})
      } : {}),
      _compactOriginalRelPath: void 0,
      _contentAssetId: a ? void 0 : b,
      ...h
    },
    _ = kIe(l, {
      ...l,
      isGenerating: !1,
      content: f,
      _contentAssetId: a ? void 0 : b,
      _previewMjAssetIds: e.appliedSideOutput ? void 0 : e.splitAssetIds,
      previewMjImages: e.appliedSideOutput ? void 0 : h.previewMjImages,
      settings: v
    });
  e.updateNode(e.node.id, {
    isGenerating: !1,
    content: _.content,
    _contentAssetId: _._contentAssetId,
    _previewMjAssetIds: _._previewMjAssetIds,
    previewMjImages: _.previewMjImages,
    settings: _.settings
  });
}

async function oDi(e) {
  var h;
  if (!MZ(e.node) || e.node.type !== "gen-image") return;
  const t = String(e.remoteUrl || "").trim(),
    n = String(e.displayUrl || t || "").trim();
  if (!n && !t) return;
  const r = e.ossSettings && Object.keys(e.ossSettings).length > 0 ? e.ossSettings : void 0;
  let a = n;
  if (nr(n) && /\/images\//i.test(n) && !/\/thumbnails\//i.test(n)) try {
    const {
      ensureOssCanvasThumbDisplayUrl: p
    } = await Ie(async () => {
      const {
        ensureOssCanvasThumbDisplayUrl: f
      } = await Promise.resolve().then(() => ii);
      return {
        ensureOssCanvasThumbDisplayUrl: f
      };
    }, void 0, import.meta.url);
    a = p(n) || (mo(sc()) === "qiniu" ? "" : n);
  } catch {
    a = mo(sc()) === "qiniu" ? "" : n;
  }
  const i = nr(a) && (/\/thumbnails\//i.test(a) || /(?:\?|&)x-oss-process=image\/resize/i.test(a) || /(?:\?|&)imageView2\/2\/w\/\d+/i.test(a) || !!(r != null && r[Pi] && nr(String(r[Pi]))));
  let o = a;
  if (!i) {
    const p = await lAt(n || t, e.taskId, e.taskId);
    if (p) o = p;else if (t && /^https?:\/\//i.test(t) && !nr(t)) try {
      const {
        isCanvasLocalCacheMode: m
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: f
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: f
        };
      }, void 0, import.meta.url);
      m() || (o = t);
    } catch {
      o = t;
    }
  }
  if (!String(o || "").trim()) return;
  const d = {
      ...((((h = e.nodesRef) == null ? void 0 : h.current) ?? e.nodesFallback ?? []).find(p => p.id === e.node.id) || e.node).settings
    },
    u = typeof e.previewActualSize == "string" && e.previewActualSize.trim() ? e.previewActualSize.trim() : void 0;
  o && !r && Il(o, e.taskId);
  try {
    const {
      setGenerationNodeVisual: p
    } = await Ie(async () => {
      const {
        setGenerationNodeVisual: m
      } = await Promise.resolve().then(() => I_i);
      return {
        setGenerationNodeVisual: m
      };
    }, void 0, import.meta.url);
    p(e.updateNode, e.node.id, !1);
  } catch {}
  e.updateNode(e.node.id, {
    isGenerating: !1,
    content: o,
    _contentAssetId: r ? void 0 : e.taskId,
    settings: {
      ...d,
      isGenerating: !1,
      progress: 100,
      error: null,
      _pendingRemoteResultUrl: t,
      mjNeedsSplit: !0,
      ...(u ? {
        previewActualSize: u,
        previewSize: u
      } : {}),
      ...(r || {}),
      _contentAssetId: r ? void 0 : e.taskId,
      generatedImages: [{
        id: `${e.taskId}_mj_pending`,
        thumbUrl: o,
        fullUrl: t || n,
        createdAt: Date.now(),
        assetId: e.taskId
      }]
    }
  });
}

async function sDi(e) {
  let t = !1;
  if (e.setNodes && e.generateId && qJe(e.sourceNode) && e.splitDisplayUrls.length > 0) {
    const n = (Array.isArray(e.preResolvedSlots) && e.preResolvedSlots.length > 0 ? e.preResolvedSlots : void 0) ?? (Array.isArray(e.slots) && e.slots.length > 0 ? e.slots : void 0);
    t = await pzt({
      sourceNode: e.sourceNode,
      splitDisplayUrls: e.splitDisplayUrls,
      splitAssetIds: e.splitAssetIds,
      ossIdPrefix: e.ossIdPrefix,
      preResolvedSlots: n,
      nodes: e.nodes,
      nodesRef: e.nodesRef,
      setNodes: e.setNodes,
      updateNode: e.updateNode,
      generateId: e.generateId,
      historyTaskId: e.taskId
    });
  }
  return await fpr({
    node: e.sourceNode,
    taskId: e.taskId,
    splitAssetIds: e.splitAssetIds,
    displayUrls: e.displayUrls,
    remoteUrls: e.remoteUrls,
    slots: e.slots,
    compositeDisplayUrl: e.compositeDisplayUrl,
    compositeRemoteUrl: e.compositeRemoteUrl,
    compositePreviewActualSize: e.compositePreviewActualSize,
    compositeOssSettings: e.compositeOssSettings,
    appliedSideOutput: t,
    updateNode: e.updateNode,
    nodesRef: e.nodesRef,
    nodesFallback: e.nodes
  }), t;
}

async function pzt(e) {
  if (!qJe(e.sourceNode) || e.splitDisplayUrls.length === 0) return !1;
  const t = Array.isArray(e.preResolvedSlots) && e.preResolvedSlots.length > 0 ? e.preResolvedSlots : void 0,
    {
      slots: n,
      ephemeralBlobUrls: r
    } = t ? {
      slots: t,
      ephemeralBlobUrls: e.splitDisplayUrls.filter(i => i.startsWith("blob:"))
    } : await hzt(e.splitDisplayUrls, e.splitAssetIds, e.ossIdPrefix);
  await cpr({
    sourceNode: e.sourceNode,
    slots: n,
    nodes: e.nodes,
    nodesRef: e.nodesRef,
    setNodes: e.setNodes,
    updateNode: e.updateNode,
    generateId: e.generateId,
    logLabel: `MJ 切图 ${n.length} 张`,
    historyTaskId: e.historyTaskId
  });
  const a = new Set();
  for (const i of r) !i || a.has(i) || (a.add(i), d$e(i));
  return !0;
}

const lDi = Object.freeze(Object.defineProperty({
  __proto__: null,
  GEN_BATCH_OUTPUT_INPUT_IMAGE_IDS_KEY: hoe,
  MJ_AUTO_SPLIT_GRID_ON_RETURN: sAt,
  applyGenBatchSideOutputToSourceNode: cpr,
  applyMjSplitSideOutput: pzt,
  finalizeMjSplitCompactGenPreview: sDi,
  getGenBatchOutputInputImageIds: uzt,
  isBatchOutputNodeOwnedBy: KJe,
  persistLocalMjSplitBlobUrls: tDi,
  removeOwnedGenBatchOutputInputImageNodes: dzt,
  resolveGenBatchOutputGridCols: opr,
  resolveMj2x2SplitForGlobalOss: iDi,
  resolveMjSplitDisplayForHistory: upr,
  resolveMjSplitSlotsForSideOutput: hzt,
  resolveMjSplitSourceUrl: hpr,
  shouldUseGenBatchOutputInputImageNodes: czt,
  shouldUseMjSplitSideOutput: qJe,
  splitMj2x2InMemoryThenUploadOss: mpr,
  syncGenBatchOutputInputImageNodes: spr,
  syncMjCompositePendingPreview: oDi,
  syncMjSplitToCompactGenNodePreview: fpr,
  tryMj2x2SplitViaGlobalOssServer: ppr,
  trySplitMj2x2ViaLocalNative: eDi
}, Symbol.toStringTag, {
  value: "Module"
}));

function cDi({
  nodes: e,
  connections: t,
  setHistory: n,
  setNodes: r,
  generateId: a,
  toastError: i,
  toastLoading: o,
  updateToast: s,
  documentSession: l
}) {
  return g.useCallback(async d => {
    var v, _, w, k;
    const {
        setNodes: u
      } = KO(r, l),
      h = (A, S) => {
        u(C => C.map(I => I.id === A ? {
          ...I,
          ...S
        } : I));
      };
    if ((_ = (v = d.apiConfig) == null ? void 0 : v.modelId) != null && _.startsWith("jimeng-cli-") && d.remoteTaskId) {
      try {
        const {
          refreshJimengCliHistory: A
        } = await Ie(async () => {
          const {
            refreshJimengCliHistory: S
          } = await Promise.resolve().then(() => vUt);
          return {
            refreshJimengCliHistory: S
          };
        }, void 0, import.meta.url);
        await A(d, n, u, t);
      } catch (A) {
        i(A instanceof Error ? A.message : String(A));
      }
      return;
    }
    const p = d.url && typeof d.url == "string" && d.url.length > 0,
      m = d.mjImages && Array.isArray(d.mjImages) && d.mjImages.length > 0,
      f = d.mjOriginalUrl && typeof d.mjOriginalUrl == "string";
    let y = null;
    try {
      const {
          pickHistoryOssOriginalUrl: A
        } = await Ie(async () => {
          const {
            pickHistoryOssOriginalUrl: C
          } = await Promise.resolve().then(() => ii);
          return {
            pickHistoryOssOriginalUrl: C
          };
        }, void 0, import.meta.url),
        S = A(d);
      S && (y = S);
    } catch {}
    if (y || (y = f && d.mjOriginalUrl ? d.mjOriginalUrl : null), !y) try {
      const {
        isCanvasLocalCacheMode: A
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: S
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: S
        };
      }, void 0, import.meta.url);
      if (A()) {
        const {
          assetStore: S
        } = await Ie(async () => {
          const {
            assetStore: I
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: I
          };
        }, void 0, import.meta.url);
        await S.init();
        const C = [String(d._assetId || "").trim(), String(d.id || "").trim()].filter(Boolean);
        for (const I of C) try {
          const E = await S.getAssetUrl(I);
          if (E) {
            y = E;
            break;
          }
        } catch {}
      }
    } catch {}
    if (y || (y = p ? d.url : null), !y) {
      const A = String(d.originalUrl || "").trim();
      A && (y = A);
    }
    if (!y) {
      console.warn("[handleRefreshMjImage] 无效的MJ图片项：缺少有效的URL", {
        id: d.id,
        hasUrl: p,
        hasMjImages: m,
        hasOriginalUrl: f,
        url: (w = d.url) == null ? void 0 : w.substring(0, 50),
        mjOriginalUrl: (k = d.mjOriginalUrl) == null ? void 0 : k.substring(0, 50)
      }), i("无法刷新：缺少原始图片URL");
      return;
    }
    const b = o("正在重新裁切MJ图片...");
    try {
      console.log("[handleRefreshMjImage] 开始重新裁切MJ图片:", {
        id: d.id,
        sourceUrl: y.substring(0, 50),
        existingMjImages: m ? d.mjImages.length : 0
      });
      let A = y,
        S = !1,
        C = null,
        I = `mj_${d.id}_${Date.now()}`,
        E = [],
        M = [];
      try {
        const {
            isCanvasLocalCacheMode: T
          } = await Ie(async () => {
            const {
              isCanvasLocalCacheMode: R
            } = await Promise.resolve().then(() => So);
            return {
              isCanvasLocalCacheMode: R
            };
          }, void 0, import.meta.url),
          {
            isGlobalOssUploadEnabled: P
          } = await Ie(async () => {
            const {
              isGlobalOssUploadEnabled: R
            } = await Promise.resolve().then(() => ii);
            return {
              isGlobalOssUploadEnabled: R
            };
          }, void 0, import.meta.url);
        if (T() && !P()) {
          const {
              trySplitMj2x2ViaLocalNative: R
            } = await Ie(async () => {
              const {
                trySplitMj2x2ViaLocalNative: B
              } = await Promise.resolve().then(() => lDi);
              return {
                trySplitMj2x2ViaLocalNative: B
              };
            }, void 0, import.meta.url),
            j = await R({
              compositeAssetId: String(d.id || "").trim(),
              compositeRemoteUrl: y,
              mjSplitBatchId: I,
              preferFfmpeg: !0
            });
          j && (E = j.historySplitUrls, M = j.mjSplitAssetIds, C = E.map(B => ({
            url: B
          })));
        }
      } catch (T) {
        console.warn("[handleRefreshMjImage] native split 跳过:", T);
      }
      if (!C) {
        if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window) && (y.startsWith("http://") || y.startsWith("https://"))) try {
          const {
              downloadWithFallback: T
            } = await Ie(async () => {
              const {
                downloadWithFallback: R
              } = await Promise.resolve().then(() => El);
              return {
                downloadWithFallback: R
              };
            }, void 0, import.meta.url),
            P = await T(y, 6e4);
          A = URL.createObjectURL(P), S = !0;
        } catch (T) {
          console.warn("[handleRefreshMjImage] Tauri 下载原图失败，使用原 URL:", T);
        }
        try {
          const {
            split2x2Image: T
          } = await Ie(async () => {
            const {
              split2x2Image: P
            } = await Promise.resolve().then(() => No);
            return {
              split2x2Image: P
            };
          }, void 0, import.meta.url);
          C = await T(A);
        } finally {
          S && A.startsWith("blob:") && URL.revokeObjectURL(A), S = !1;
        }
      }
      try {
        if (!C || C.length === 0) throw new Error("裁切失败：未生成任何图片");
        console.log("[handleRefreshMjImage] 裁切成功，共", C.length, "张图片");
        const {
          assetStore: T
        } = await Ie(async () => {
          const {
            assetStore: F
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: F
          };
        }, void 0, import.meta.url);
        await T.init();
        let P = E,
          R = M;
        P.length === C.length && R.length === C.length || (I = `mj_${d.id}_${Date.now()}`, P = await Promise.all(C.map(async (F, N) => {
          const G = `${I}_split_${N}`;
          try {
            if (F.url && F.url.startsWith("blob:")) {
              const z = await fetch(F.url);
              if (z.ok) {
                const V = await z.blob();
                await T.saveBlobAsset(G, V, y);
                try {
                  const {
                    persistHistoryListThumbnailLocal: L
                  } = await Ie(async () => {
                    const {
                      persistHistoryListThumbnailLocal: D
                    } = await Promise.resolve().then(() => ii);
                    return {
                      persistHistoryListThumbnailLocal: D
                    };
                  }, void 0, import.meta.url);
                  await L(G, V, {
                    forceReplace: !0
                  });
                } catch (L) {
                  console.warn(`[handleRefreshMjImage] ⚠️ 保存切片缩略图失败 ${G}:`, L);
                }
                console.log(`[handleRefreshMjImage] ✅ 切片 ${N} 已保存到 assetStore: ${G}`);
                const O = await T.getAssetUrl(G);
                if (O) return O;
              }
            }
          } catch (z) {
            console.warn(`[handleRefreshMjImage] ⚠️ 保存切片 ${N} 失败:`, z);
          }
          return F.url;
        })), R = C.map((F, N) => `${I}_split_${N}`)), n(F => {
          const N = F.map(G => G.id === d.id ? {
            ...G,
            url: P[0],
            mjImages: P,
            mjThumbnails: P,
            _mjAssetIds: R,
            _assetId: R[0] || G._assetId,
            selectedMjImageIndex: 0,
            mjNeedsSplit: !1,
            mjOriginalUrl: y
          } : G);
          return Ie(async () => {
            const {
              persistHistoryToStorage: G
            } = await Promise.resolve().then(() => Gu);
            return {
              persistHistoryToStorage: G
            };
          }, void 0, import.meta.url).then(({
            persistHistoryToStorage: G
          }) => G(N, {
            force: !0
          })).catch(G => {
            console.warn("[handleRefreshMjImage] 写入 SQLite 失败:", G);
          }), N;
        });
        const j = d.sourceNodeId,
          B = j ? e.find(F => F.id === j) : void 0;
        if (!(B && qJe(B) && (await pzt({
          sourceNode: B,
          splitDisplayUrls: P,
          splitAssetIds: R,
          ossIdPrefix: I,
          nodes: e,
          setNodes: u,
          updateNode: h,
          generateId: a
        })))) {
          const F = j ? e.filter(N => N.type === "preview" && t.some(G => G.from === j && G.to === N.id)) : [];
          F.length > 0 ? (console.log("[handleRefreshMjImage] 找到", F.length, "个连接的预览节点"), console.log("[handleRefreshMjImage] 预览节点IDs:", F.map(N => N.id)), u(N => N.map(G => F.some(z => z.id === G.id) ? (console.log("[handleRefreshMjImage] 更新预览节点:", G.id), {
            ...G,
            content: P[0],
            previewMjImages: P,
            selectedPreviewImage: P[0]
          }) : G))) : console.log("[handleRefreshMjImage] 未找到连接的预览节点", {
            sourceNodeId: j,
            hasSourceNodeId: !!j,
            totalNodes: e.length,
            previewNodes: e.filter(N => N.type === "preview").length,
            connections: t.length
          });
        }
        console.log("[handleRefreshMjImage] MJ图片刷新完成"), s(b, {
          type: "success",
          message: "刷新成功"
        });
      } finally {
        S && A.startsWith("blob:") && URL.revokeObjectURL(A);
      }
    } catch (A) {
      console.error("[handleRefreshMjImage] 刷新失败:", A);
      const S = A instanceof Error ? A.message : "未知错误";
      s(b, {
        type: "error",
        message: `刷新失败: ${S}`
      });
    }
  }, [n, e, t, r, a, i, o, s, l]);
}

function dDi({
  projectPanelOpen: e,
  aiRoleLibraryOpen: t
}) {
  const [n, r] = g.useState(() => NSi(Zi.POSE_LIBRARY_PANEL).open),
    [a, i] = O_(Zi.LEFT_TOOLBAR_COLLAPSED, !0),
    [o, s] = k0e(Zi.LEFT_TOOLBAR_DOCK, "side"),
    l = o === "bottom" ? "bottom" : "side",
    d = g.useCallback(y => {
      s(y);
    }, [s]);
  g.useEffect(() => {
    jSi(Zi.POSE_LIBRARY_PANEL, n);
  }, [n]);
  const u = g.useRef(!1);
  g.useLayoutEffect(() => {
    if (e) {
      wkt(!0), u.current = !0;
      return;
    }
    u.current && (u.current = !1, wkt(!1));
  }, [e]);
  const h = 256,
    p = Ahi(e);
  return {
    poseLibraryOpen: n,
    setPoseLibraryOpen: r,
    leftToolbarCollapsed: a,
    setLeftToolbarCollapsed: i,
    leftToolbarDock: l,
    setLeftToolbarDock: d,
    canvasLeftToolbarInsetPx: h,
    canvasSidePanelOpen: p,
    showCanvasHelpPanel: !p && !t,
    canvasViewportBarLeftPx: p ? h : 16
  };
}

function Lun(e) {
  const t = pY(e);
  return {
    x: t.x,
    y: t.y,
    zoom: t.zoom
  };
}

function gpr(e, t) {
  return Math.abs(e.x - t.x) <= .5 && Math.abs(e.y - t.y) <= .5 && Math.abs(e.zoom - t.zoom) <= 1e-4;
}

function uDi(e, t, n) {
  const r = Math.min(Sd.MAX_ZOOM, Math.max(Sd.MIN_ZOOM, Number.isFinite(t) ? t : e.zoom));
  if (Math.abs(e.zoom - r) < 1e-4) return e;
  const a = e.zoom > 0 ? e.zoom : 1,
    i = (n.width / 2 - e.x) / a,
    o = (n.height / 2 - e.y) / a;
  return {
    x: Math.round((n.width / 2 - i * r) * 100) / 100,
    y: Math.round((n.height / 2 - o * r) * 100) / 100,
    zoom: Math.round(r * 1e4) / 1e4
  };
}

function hDi({
  view: e,
  viewRef: t,
  viewportSize: n,
  chatWidth: r,
  isPanning: a,
  canvasViewPanning: i,
  isViewportZooming: o,
  commitCanvasViewImmediate: s
}) {
  const l = g.useRef(e),
    d = g.useRef(!1),
    u = jl(),
    h = Rl(),
    p = bae(),
    m = !h && !gpr(e, t.current),
    f = !!p || u || h || Av();
  f ? d.current || (l.current = p ?? {
    ...t.current
  }, d.current = !0) : (l.current = t.current, d.current = !1);
  const y = aTr({
      cullFreeze: p,
      frozen: f,
      frozenView: l.current,
      liveView: t.current
    }),
    b = h5() ? Math.min(Math.max(0, r), Math.max(0, n.width - 1)) : 0,
    v = g.useMemo(() => I5t(Math.max(1, n.width - b), n.height), [n.width, n.height, b]),
    _ = g.useCallback(w => {
      const k = t.current,
        A = uDi(k, w, v);
      A !== k && s(A);
    }, [v, s, t]);
  return {
    nodesVisibilityView: y,
    canvasViewportFrozen: f,
    zoomViewSettling: m,
    canvasInnerViewport: v,
    handleViewportBarZoomChange: _,
    isViewportTransforming: M1i({
      panning: a,
      viewPanning: i,
      zoomingState: o,
      zoomingRef: h
    })
  };
}

function pDi() {
  const [e, t] = g.useState(() => oU()),
    n = g.useRef(oU()),
    r = g.useRef(null),
    a = g.useCallback(k => {
      const A = Lun(k);
      n.current = A, Rle(A), mY(r.current, A), t(A);
    }, []),
    i = g.useCallback(() => {
      a(n.current), opt();
    }, [a]),
    o = g.useRef(null),
    s = g.useCallback(() => {
      o.current != null && cancelAnimationFrame(o.current), o.current = requestAnimationFrame(() => {
        o.current = requestAnimationFrame(() => {
          if (o.current = null, set({
            panning: jl(),
            zooming: Rl(),
            interacting: Yi(),
            panPending: Av(),
            cullFrozen: !!bae()
          })) return;
          const k = Lun(n.current);
          n.current = k, t(A => gpr(A, k) ? A : k), opt();
        });
      });
    }, []);
  g.useEffect(() => () => {
    o.current != null && (cancelAnimationFrame(o.current), o.current = null);
  }, []);
  const l = g.useCallback(() => {
      i();
      const k = typeof document < "u" ? document.body : null;
      qE().size > 0 || FWt() || k != null && k.classList.contains("canvas-node-dragging") || k != null && k.classList.contains("canvas-box-select-group-dragging") || (yP(), XC(!1), xv(!1));
    }, [i]),
    [d, u] = g.useState(() => Yi());
  g.useEffect(() => $v(k => {
    g.startTransition(() => u(k));
  }), []);
  const [h, p] = g.useState(!1),
    m = g.useRef(null);
  g.useEffect(() => {
    const k = () => {
      if (m.current != null) return;
      const A = S => {
        m.current = requestAnimationFrame(() => {
          if (S > 1) {
            A(S - 1);
            return;
          }
          m.current = null, p(!1);
        });
      };
      A(2);
    };
    return tZ(A => {
      if (A) {
        m.current != null && (cancelAnimationFrame(m.current), m.current = null), g.startTransition(() => p(!0));
        return;
      }
      k();
    });
  }, []), g.useEffect(() => () => {
    m.current != null && (cancelAnimationFrame(m.current), m.current = null);
  }, []);
  const [f, y] = g.useState(!1);
  g.useEffect(() => X4e(k => {
    g.startTransition(() => y(k));
  }), []);
  const [b, v] = g.useState(() => ({
      width: window.innerWidth,
      height: window.innerHeight
    })),
    _ = g.useRef(() => {}),
    w = g.useMemo(() => BHe(k => {
      try {
        localStorage.setItem("qiaodoumayi_viewport_size", JSON.stringify(k));
      } catch {}
    }, 500), []);
  return g.useEffect(() => {
    let k = !1,
      A = null;
    const S = M => {
        g.startTransition(() => {
          v(T => Math.abs(T.width - M.width) < 2 && Math.abs(T.height - M.height) < 2 ? T : M);
        }), w(M);
      },
      C = () => {
        if (A = {
          width: window.innerWidth,
          height: window.innerHeight
        }, !k) {
          k = !0, S(A), _.current(A);
          return;
        }
        tFt();
      },
      I = Scr(() => {
        A && S(A);
      }),
      E = bJe(() => {
        !A || f$() || _.current(A);
      });
    return C(), window.addEventListener("resize", C), () => {
      window.removeEventListener("resize", C), I(), E();
    };
  }, [w]), g.useEffect(() => {
    const k = () => {
      typeof document < "u" && document.hidden || l();
    };
    return document.addEventListener("visibilitychange", k), window.addEventListener("focus", k), () => {
      document.removeEventListener("visibilitychange", k), window.removeEventListener("focus", k);
    };
  }, [l]), g.useEffect(() => {
    const k = () => {
      set({
        panning: jl(),
        zooming: Rl(),
        interacting: Yi(),
        panPending: Av(),
        cullFrozen: !!bae()
      }) || s();
    };
    return window.addEventListener("canvasActivity", k), () => window.removeEventListener("canvasActivity", k);
  }, [s]), g.useEffect(() => {
    const k = () => {
      if (set({
        panning: jl(),
        zooming: Rl(),
        interacting: Yi(),
        panPending: Av(),
        cullFrozen: !!bae()
      })) return;
      const A = typeof document < "u" ? document.body : null;
      if (A != null && A.classList.contains("canvas-node-dragging") || A != null && A.classList.contains("canvas-box-select-group-dragging") || A != null && A.classList.contains("canvas-interacting")) return;
      s(), qE().size > 0 || FWt() || !!(A != null && A.classList.contains("canvas-node-dragging")) || !!(A != null && A.classList.contains("canvas-box-select-group-dragging")) || HN();
    };
    return window.addEventListener("canvasViewportSettled", k), window.addEventListener("canvasAgentTaskSettled", k), () => {
      window.removeEventListener("canvasViewportSettled", k), window.removeEventListener("canvasAgentTaskSettled", k);
    };
  }, [s]), {
    view: e,
    setView: t,
    viewRef: n,
    canvasWorldRef: r,
    viewportSize: b,
    viewportResizeCommitRef: _,
    canvasInteractionActive: d,
    canvasViewPanning: h,
    isViewportZooming: f,
    commitCanvasViewImmediate: a,
    syncCanvasViewportFromRef: i,
    scheduleCanvasViewportCatchUp: s,
    reconcileCanvasViewportFromRef: l
  };
}

function Oun(e, t) {
  const n = t != null && t.afterZoom ? HDe : 0;
  return {
    mediumDelay: (e > 100 ? 200 : 300) + n,
    highDelay: e > 15 ? null : 800 + n
  };
}

function mDi({
  nodeCount: e,
  localCacheNodeDragActive: t,
  isDragging: n,
  dragNodeId: r,
  resizingNodeId: a,
  connectingSource: i,
  connectingTarget: o
}) {
  const [s, l] = g.useState("low"),
    d = g.useRef({
      medium: null,
      high: null
    }),
    u = !t && n || !t && !!r || !!a || !!i || !!o,
    h = () => {
      d.current.medium != null && (window.clearTimeout(d.current.medium), d.current.medium = null), d.current.high != null && (window.clearTimeout(d.current.high), d.current.high = null);
    };
  g.useEffect(() => {
    if (h(), u) {
      g.startTransition(() => l("low"));
      return;
    }
    const f = Oun(e);
    return d.current.medium = window.setTimeout(() => {
      l("medium"), d.current.medium = null;
    }, f.mediumDelay), f.highDelay != null && (d.current.high = window.setTimeout(() => {
      l("high-inview"), d.current.high = null;
    }, f.highDelay)), h;
  }, [u, e]);
  const p = g.useRef(u);
  p.current = u;
  const m = g.useRef(e);
  return m.current = e, g.useEffect(() => {
    const f = (k = !1) => {
        if (jl() || Rl() || Yi()) return;
        if (h(), p.current) {
          g.startTransition(() => l("low"));
          return;
        }
        const A = Oun(m.current, {
          afterZoom: k
        });
        d.current.medium = window.setTimeout(() => {
          l("medium"), d.current.medium = null;
        }, A.mediumDelay), A.highDelay != null && (d.current.high = window.setTimeout(() => {
          l("high-inview"), d.current.high = null;
        }, A.highDelay));
      },
      y = k => {
        k ? h() : f(!1);
      },
      b = k => {
        k ? h() : f(!0);
      },
      v = D$(y),
      _ = L$(b),
      w = $v(y);
    return () => {
      v(), _(), w(), h();
    };
  }, []), s;
}

function fDi({
  activeTool: e,
  doodleSubTool: t,
  lastPenPointerDownAtRef: n,
  handleCanvasMouseDown: r,
  handleCanvasMouseMove: a,
  handleCanvasMouseUp: i,
  handleCanvasMouseUpEvent: o,
  handleCanvasDoubleClick: s,
  handleBackgroundClick: l,
  handleCanvasContextMenu: d,
  finishEditingProjectName: u,
  skipCanvasTextClearOnClickRef: h,
  editingCanvasTextId: p,
  setEditingCanvasTextId: m,
  setSelectedCanvasTextId: f,
  setDoodleEraserHudPos: y,
  connectingSource: b,
  connectingTarget: v,
  multiConnectingSourceIds: _,
  multiConnectingTargetIds: w,
  contextMenu: k,
  cancelConnectingWireState: A,
  dragNodeId: S,
  dragNodeIdRef: C,
  isPanning: I,
  isPanningRef: E,
  setIsPanning: M,
  setIsDragging: T,
  setDragNodeId: P,
  setResizingNodeId: R,
  setConnectingSource: j,
  setConnectingTarget: B,
  setConnectingInputType: F,
  setMultiConnectingSourceIds: N,
  setMultiConnectingTargetIds: G,
  multiNodeDragStartPos: z,
  setEmptyStateDismissed: V,
  compactReferencePick: O,
  focusEditPick: L,
  referencePickActive: D,
  viewportTransforming: U,
  deferredCanvasPanning: H,
  localCacheMode: Y,
  canvasTextDragging: K,
  denseMediaOverview: W,
  denseMediaMicro: Q,
  boxSelectMulti: q,
  zoomClassName: ne
}) {
  const de = g.useCallback(X => {
      tEi(e, X.pointerType) && (n.current = Date.now(), X.preventDefault(), X.stopPropagation(), r(X));
    }, [e, r, n]),
    le = g.useCallback(X => {
      u(), h.current ? h.current = !1 : (f(null), p && m(null)), l(X);
    }, [p, u, l, m, f, h]),
    J = g.useCallback(X => {
      y(null), FQ(null);
      const Z = Awi({
          hoverable: kwi(),
          touchGestureActive: Kre()
        }),
        re = qCi({
          connectingSource: b,
          connectingTarget: v,
          multiConnectingSourceIds: _,
          multiConnectingTargetIds: w
        }),
        fe = QCi(k);
      JCi(re, fe, Z) && A();
      const ye = YCi(S, C.current),
        ie = XCi(I, E.current);
      ZCi(ye, X.buttons, Z) && i(), Z && eEi({
        connectionActive: re,
        nodeDragging: ye,
        actuallyPanning: ie
      }) && (M(!1), E.current = !1, T(!1), P(null), C.current = null, R(null), j(null), B(null), F(null), N(null), G(null), z.current = null, yP(), document.body.classList.remove("canvas-node-dragging"), oM());
    }, [A, b, v, k, S, C, i, I, E, _, w, z, F, j, B, y, P, T, M, N, G, R]),
    pe = g.useCallback(X => {
      V(!0), s(X);
    }, [s, V]),
    ce = g.useMemo(() => aEi({
      compactReferencePick: O,
      focusEditPick: L,
      referencePickActive: D,
      viewportTransforming: U,
      deferredCanvasPanning: H,
      localCacheMode: Y,
      canvasTextDragging: K,
      denseMediaOverview: W,
      denseMediaMicro: Q,
      boxSelectMulti: q,
      zoomClassName: ne
    }, {
      connectingSource: b,
      connectingTarget: v,
      multiConnectingSourceIds: _,
      multiConnectingTargetIds: w,
      dragNodeId: S
    }, {
      activeTool: e,
      doodleSubTool: t
    }), [e, q, K, O, L, b, v, H, Q, W, t, S, Y, _, w, D, U, ne]);
  return {
    eventHandlers: g.useMemo(() => ({
      onMouseDown: r,
      onPointerDown: de,
      onMouseMove: a,
      onMouseUp: o,
      onClick: le,
      onMouseLeave: J,
      onDoubleClick: pe,
      onContextMenu: d
    }), [d, r, a, o, le, pe, J, de]),
    visualState: ce
  };
}

function gDi(e, t) {
  return e === "doodle" && (t === "brush" || t === "eraser");
}

function yDi(e) {
  const [t, n] = g.useState([]),
    [r, a] = g.useState([]),
    i = g.useRef([]),
    o = g.useRef([]);
  o.current = t;
  const s = g.useRef(0),
    [l, d] = g.useState("brush"),
    [u, h] = g.useState("#171717"),
    [p, m] = g.useState(2.75),
    [f, y] = g.useState(18),
    [b, v] = g.useState([]),
    [_, w] = g.useState("#171717"),
    [k, A] = g.useState(null),
    [S, C] = g.useState(null),
    I = g.useRef(!1);
  return g.useEffect(() => {
    i.current = r;
  }, [r]), g.useEffect(() => {
    if (b.length === 0) return;
    const E = b[0],
      M = i.current.find(T => T.id === E);
    M && w(M.color);
  }, [b.join(",")]), {
    canvasTextBoxes: t,
    setCanvasTextBoxes: n,
    canvasDoodleStrokes: r,
    setCanvasDoodleStrokes: a,
    canvasDoodleStrokesRef: i,
    canvasTextBoxesRef: o,
    lastPenPointerDownAtRef: s,
    doodleSubTool: l,
    setDoodleSubTool: d,
    doodleBrushColor: u,
    setDoodleBrushColor: h,
    doodleBrushWidth: p,
    setDoodleBrushWidth: m,
    doodleEraserWidth: f,
    setDoodleEraserWidth: y,
    selectedDoodleIds: b,
    setSelectedDoodleIds: v,
    canvasDoodleBrushOrEraserPassthrough: gDi(e, l),
    doodleSelCapsuleColor: _,
    setDoodleSelCapsuleColor: w,
    editingCanvasTextId: k,
    setEditingCanvasTextId: A,
    selectedCanvasTextId: S,
    setSelectedCanvasTextId: C,
    skipCanvasTextClearOnClickRef: I
  };
}

function bDi(e, t, n, r) {
  if (e.size < 2) return !1;
  const a = pWe(Array.from(e), t);
  return a.width <= 0 || a.height <= 0 ? !1 : n >= a.x && n <= a.x + a.width && r >= a.y && r <= a.y + a.height;
}

function vDi({
  selectedNodeIds: e,
  nodes: t,
  cancelConnectingWireStateRef: n,
  minimapDragEndRef: r,
  syncBatchConnectionModeFromMouse: a,
  startBoxSelectGroupDrag: i,
  cancelBoxSelectGroupDrag: o,
  cancelActiveGroupDrag: s,
  handleGroupResizeEnd: l,
  setShowBoxSelectBounds: d,
  setShowCollectionForBoxSelect: u,
  setSelectedGroupId: h
}) {
  const p = g.useCallback(w => {
      w.length >= 2 ? (d(!0), u(!0), a(w)) : d(!1);
    }, [d, u, a]),
    m = g.useCallback(() => {
      u(!1), d(!1), h(null);
    }, [h, d, u]),
    f = g.useCallback(() => {
      h(null);
    }, [h]),
    y = g.useCallback((w, k) => bDi(e, t, w, k), [t, e]),
    b = g.useCallback((w, k, A) => {
      n.current(), i(w, k, A);
    }, [n, i]),
    v = g.useCallback(() => {
      o(), s();
    }, [s, o]),
    _ = g.useCallback(() => {
      o(), s(), l(), r.current();
    }, [s, o, l, r]);
  return {
    onBoxSelectComplete: p,
    onSelectionCleared: m,
    onClearGroupSelection: f,
    isPointInsideBoxSelection: y,
    onBoxSelectionDragStart: b,
    onCancelBoxSelectGroupDrag: v,
    onForceEndInteraction: _
  };
}

function wDi() {
  const [e, t] = g.useState(null),
    [n, r] = g.useState(null),
    [a, i] = g.useState(null),
    [o, s] = g.useState(null),
    [l, d] = g.useState(null);
  return {
    connectingSource: e,
    setConnectingSource: t,
    connectingTarget: n,
    setConnectingTarget: r,
    connectingInputType: a,
    setConnectingInputType: i,
    multiConnectingSourceIds: o,
    setMultiConnectingSourceIds: s,
    multiConnectingTargetIds: l,
    setMultiConnectingTargetIds: d
  };
}

function xDi(e) {
  var t;
  return e.visible && (e.sourceNodeId ?? e.targetNodeId ?? ((t = e.sourceNodeIds) == null ? void 0 : t.length)) ? {
    visible: !1,
    x: 0,
    y: 0
  } : e;
}

function _Di(e) {
  e.clearConnectionDropMenuState(), e.setConnectingSource(null), e.setConnectingTarget(null), e.setConnectingInputType(null), e.setMultiConnectingSourceIds(null), e.setMultiConnectingTargetIds(null), e.setHoveredGroupId(null), e.setContextMenu(xDi);
}

const kDi = e => {};

function ADi(e) {
  return {
    canvasContentRef: e.canvasWorldRef,
    snapToGrid: e.showCanvasSnap,
    canvasGridSpacing: e.effectiveCanvasGridSpacing,
    followDownstreamOnDrag: e.followDownstreamOnDrag,
    onAlignmentGuidesChange: e.showAlignmentGuides === !1 ? kDi : e.setAlignmentGuides,
    onDropNodeOntoGroup: e.handleDropNodeOntoGroup,
    onDismissCompactRefCanvasPick: e.dismissCompactRefCanvasPick,
    compactRefCanvasPickActive: !!e.compactRefCanvasPickTargetGenNodeId,
    ...e.canvasEventSelectionBindings
  };
}

function SDi(e) {
  return {
    ...{
      view: e.view,
      viewRef: e.viewRef,
      canvasRef: e.canvasRef,
      mousePosRef: e.mousePosRef,
      selectionBoxDivRef: e.selectionBoxDivRef,
      setView: e.setView,
      setMousePos: e.setMousePos,
      isZoomLocked: e.isZoomLocked,
      handleNodeDoubleClick: e.handleNodeDoubleClick
    },
    ...{
      nodes: e.nodes,
      selectedNodeId: e.selectedNodeId,
      selectedNodeIds: e.selectedNodeIds,
      selectedNodeIdsRef: e.selectedNodeIdsRef,
      selectedNodeIdRef: e.selectedNodeIdRef,
      nodesRef: e.nodesRef,
      connectingLineRef: e.connectingLineRef,
      connectingLineReverseRef: e.connectingLineReverseRef,
      updateConnectingLineDOM: e.updateConnectingLineDOM,
      svgContainerRef: e.svgContainerRef,
      connectionsRef: e.connectionsRef,
      visibleConnectionsRef: e.visibleConnectionsRef,
      freezeAllVideos: e.freezeAllVideos,
      unfreezeVideos: e.unfreezeVideos,
      collectionEndpointsRef: e.collectionEndpointsRef,
      intraGroupConnectionIdsRef: e.intraGroupConnectionIdsRef,
      groupsRef: e.groupsRef,
      setNodes: e.setNodes,
      setConnections: e.setConnections,
      setSelectedNodeId: e.setSelectedNodeId,
      setSelectedNodeIds: e.setSelectedNodeIds,
      setSelectedConnectionId: e.setSelectedConnectionId,
      generateId: e.generateId
    },
    ...{
      isSelectingRef: e.isSelectingRef,
      multiNodeDragStartPos: e.multiNodeDragStartPos,
      isPanning: e.isPanning,
      isSelecting: e.isSelecting,
      selectionBox: e.selectionBox,
      dragNodeId: e.dragNodeId,
      resizingNodeId: e.resizingNodeId,
      resizeDirection: e.resizeDirection,
      connectingSource: e.connectingSource,
      connectingTarget: e.connectingTarget,
      connectingInputType: e.connectingInputType,
      multiConnectingSourceIds: e.multiConnectingSourceIds,
      multiConnectingTargetIds: e.multiConnectingTargetIds,
      frameContextMenu: e.frameContextMenu,
      historyContextMenu: e.historyContextMenu,
      isDraggingGroupRef: e.isDraggingGroupRef,
      isResizingGroupFrameRef: e.isResizingGroupFrameRef,
      isDraggingSelectionBoundsRef: e.isDraggingSelectionBoundsRef,
      setIsPanning: e.setIsPanning,
      setIsDragging: e.setIsDragging,
      setDragNodeId: e.setDragNodeId,
      setResizingNodeId: e.setResizingNodeId,
      setResizeDirection: e.setResizeDirection,
      setIsSelecting: e.setIsSelecting,
      setSelectionBox: e.setSelectionBox,
      setConnectingSource: e.setConnectingSource,
      setConnectingTarget: e.setConnectingTarget,
      setConnectingInputType: e.setConnectingInputType,
      setMultiConnectingSourceIds: e.setMultiConnectingSourceIds,
      setMultiConnectingTargetIds: e.setMultiConnectingTargetIds,
      setContextMenu: e.setContextMenu,
      setSelectionContextMenu: e.setSelectionContextMenu,
      setFrameContextMenu: e.setFrameContextMenu,
      setHistoryContextMenu: e.setHistoryContextMenu
    },
    ...{
      findGroupAtEmptyPoint: e.findGroupAtEmptyPoint,
      onGroupEmptyAreaPointerDown: e.onGroupEmptyAreaPointerDown
    },
    ...ADi({
      canvasWorldRef: e.canvasWorldRef,
      showCanvasSnap: e.showCanvasSnap,
      showAlignmentGuides: e.showAlignmentGuides,
      effectiveCanvasGridSpacing: e.effectiveCanvasGridSpacing,
      followDownstreamOnDrag: e.followDownstreamOnDrag,
      setAlignmentGuides: e.setAlignmentGuides,
      handleDropNodeOntoGroup: e.handleDropNodeOntoGroup,
      dismissCompactRefCanvasPick: e.dismissCompactRefCanvasPick,
      compactRefCanvasPickTargetGenNodeId: e.compactRefCanvasPickTargetGenNodeId,
      canvasEventSelectionBindings: e.canvasEventSelectionBindings
    })
  };
}

function Fun(e) {
  return [...new Set(e.filter(Boolean))];
}

function IDi({
  groups: e,
  nodes: t,
  multiImageSelection: n,
  mousePosRef: r,
  forceEndCanvasInteractionRef: a,
  cancelConnectingWireStateRef: i,
  setMousePos: o,
  setConnectingSource: s,
  setConnectingTarget: l,
  setConnectingInputType: d,
  setMultiConnectingSourceIds: u,
  setMultiConnectingTargetIds: h
}) {
  const p = g.useCallback((b, v) => {
      a.current(), i.current();
      const _ = Fun(b);
      if (s(null), l(null), d(null), h(null), u(_.length > 0 ? _ : null), v) r.current = v, o(v);else if (n) {
        const w = {
          x: n.dialPosition.x,
          y: n.dialPosition.y
        };
        r.current = w, o(w);
      }
    }, [i, a, r, n, d, s, l, o, u, h]),
    m = g.useCallback((b, v, _) => {
      _.preventDefault(), _.stopPropagation(), p(b, v);
    }, [p]),
    f = g.useCallback((b, v, _) => {
      _.preventDefault(), _.stopPropagation();
      const w = e.find(C => C.id === b);
      if (!w) return;
      const k = w.collapsed && w.stackMode === "card" ? w.nodeIds.filter(C => t.some(I => I.id === C)) : Que(w, t),
        A = Fun(k);
      if (A.length === 0) return;
      s(null), l(null), d(null), h(null), u(A);
      const S = R5e(w, t);
      o({
        x: S.x,
        y: S.y
      });
    }, [e, t, d, s, l, o, u, h]),
    y = g.useCallback(b => {
      h(b);
    }, [h]);
  return {
    handleStartMultiConnection: p,
    handleStartBoxSelectBatchConnect: m,
    handleStartGroupConnect: f,
    handleStartReverseBatchConnection: y
  };
}

function ypr(e, t) {
  return t === "custom-agent" && (e === "text-node" || e === "novel-input" || e === "custom-agent") ? "agent_user_input" : void 0;
}

const CDi = new Set(["gen-image", "generate-character-image", "generate-scene-image"]),
  EDi = new Set(["gen-video", "generate-character-video", "generate-scene-video"]);

function bpr(e) {
  return e === "smart-build" ? "director-3d" : e === acr ? "rh-comfy" : e;
}

function vpr(e, t = WCe) {
  let n = {};
  try {
    const r = CDi.has(e) ? "Image" : EDi.has(e) ? "Video" : null;
    if (r) {
      const a = t(r);
      a && (n = a);
    }
  } catch (r) {
    console.error("Failed to load global defaults:", r);
  }
  return e === "text-node" ? {
    ...n,
    textNodeComposerOpen: !1
  } : n;
}

function TDi(e, t = WCe) {
  const n = e === acr,
    r = bpr(e),
    a = vpr(r, t);
  return e === "smart-build" ? {
    createType: r,
    name: "智能搭建",
    defaultSettings: {
      ...a,
      smartBuild: !0
    }
  } : {
    createType: r,
    name: n ? rcr : void 0,
    defaultSettings: n ? {
      ...a,
      ...dyi()
    } : a
  };
}

function zun(e, t, n) {
  const r = e.zoom > 0 ? e.zoom : 1;
  return {
    x: (t.width / 2 - e.x) / r - n.w / 2,
    y: (t.height / 2 - e.y) / r - n.h / 2
  };
}

function MDi(e, t) {
  return ypr(t, e);
}

function PDi({
  nodeId: e,
  requestedType: t,
  sourceNodeId: n,
  targetNodeId: r,
  sourceNodeIds: a,
  sourceNodes: i,
  generateId: o
}) {
  const s = a && a.length > 0 ? a : n ? [n] : [],
    l = new Map();
  s.length > 0 && i.forEach(h => {
    l.has(h.id) || l.set(h.id, h.type);
  });
  const d = s.map(h => {
      const p = l.get(h),
        m = MDi(t, p);
      return {
        id: o(),
        from: h,
        to: e,
        ...(m ? {
          inputType: m
        } : {})
      };
    }),
    u = r ? [{
      id: o(),
      from: e,
      to: r
    }] : [];
  return {
    incoming: d,
    outgoing: u
  };
}

function RDi(e, t, n) {
  if (!e) return {
    x: 200,
    y: 200
  };
  const r = 80;
  return t === "input" ? {
    x: e.x - n.w - r,
    y: e.y
  } : {
    x: e.x + (e.width ?? 320) + r,
    y: e.y
  };
}

function NDi({
  selectedNodeId: e,
  selectedNodeIds: t,
  nodesRef: n,
  selectedNodeIdsRef: r,
  forceEndCanvasInteractionRef: a,
  setNodes: i,
  setConnections: o,
  setSelectedNodeId: s,
  setSelectedNodeIds: l,
  setConnectingSource: d,
  setConnectingTarget: u,
  setConnectingInputType: h,
  generateId: p
}) {
  const [m, f] = g.useState(null),
    y = g.useCallback(w => {
      d(null), u(null), h(null), s(w.nodeId), f({
        visible: !0,
        ...w
      });
    }, [h, d, u, s]),
    b = g.useCallback(() => {
      f(w => w && {
        ...w,
        visible: !1
      });
    }, []),
    v = g.useCallback(() => {
      f(null);
    }, []);
  g.useEffect(() => {
    if (!e && t.size === 0) {
      m != null && m.visible && f(null);
      return;
    }
    m != null && m.nodeId && e !== m.nodeId && !t.has(m.nodeId) && f(null);
  }, [m, e, t]);
  const _ = g.useCallback(w => {
    if (!(m != null && m.nodeId) || !m.portDirection) return;
    const k = m.nodeId,
      A = m.portDirection,
      S = n.current.find(B => B.id === k),
      C = RDi(S, A, Ihe(w.type)),
      I = p(),
      E = vpr(w.type);
    i(B => [...B, Ki(I, w.type, C.x, C.y, void 0, E, B)]);
    const M = A === "input" ? I : k,
      T = A === "input" ? k : I,
      P = A === "input" ? w.type : S == null ? void 0 : S.type,
      R = A === "input" ? S == null ? void 0 : S.type : w.type,
      j = ypr(P, R);
    o(B => [...B, {
      id: p(),
      from: M,
      to: T,
      ...(j ? {
        inputType: j
      } : {})
    }]), s(I), l(new Set([I])), r.current = new Set([I]), j5(r.current), a.current(), f(null);
  }, [m, a, p, n, r, o, i, s, l]);
  return {
    connectionDial: m,
    handleShowConnectionDial: y,
    handleHideConnectionDial: b,
    handleConnectionDialSelect: _,
    clearConnectionDial: v
  };
}

function jDi({
  canvasInnerViewport: e,
  viewRef: t,
  nodesRef: n,
  selectedNodeIdsRef: r,
  forceEndCanvasInteractionRef: a,
  setNodes: i,
  setConnections: o,
  setSelectedNodeId: s,
  setSelectedNodeIds: l,
  setContextMenu: d,
  setConnectingSource: u,
  setConnectingTarget: h,
  setConnectingInputType: p,
  setMultiConnectingSourceIds: m,
  setMultiConnectingTargetIds: f,
  generateId: y
}) {
  const b = g.useCallback(k => {
      s(k), l(new Set([k])), r.current = new Set([k]), j5(r.current), a.current();
    }, [a, r, s, l]),
    v = g.useCallback((k, A, S, C, I, E) => {
      const M = y(),
        T = TDi(k),
        P = W9i({
          sourceNodeId: C,
          sourceNodeIds: E,
          targetNodeId: I
        }),
        R = A ?? 100,
        j = S ?? 100;
      i(N => {
        const G = Ki(M, T.createType, R, j, T.name, T.defaultSettings, N);
        if (P) {
          const z = H9i({
            x: R,
            y: j
          }, {
            w: G.width,
            h: G.height
          }, P);
          G.x = z.x, G.y = z.y;
        }
        return [...N, G];
      }), b(M);
      const {
        incoming: B,
        outgoing: F
      } = PDi({
        nodeId: M,
        requestedType: k,
        sourceNodeId: C,
        targetNodeId: I,
        sourceNodeIds: E,
        sourceNodes: n.current,
        generateId: y
      });
      return B.length > 0 && o(N => [...N, ...B]), F.length > 0 && o(N => [...N, ...F]), d({
        visible: !1,
        x: 0,
        y: 0
      }), u(null), h(null), p(null), m(null), f(null), M;
    }, [y, n, b, o, p, u, h, d, m, f, i]),
    _ = g.useCallback(k => {
      const A = bpr(k),
        S = zun(t.current, e, Ihe(A)),
        C = v(k, S.x, S.y);
      k === "smart-build" && window.dispatchEvent(new CustomEvent("qiaodoumayi-open-director-3d", {
        detail: {
          nodeId: C
        }
      }));
    }, [v, e, t]),
    w = g.useCallback(k => {
      const A = String((k == null ? void 0 : k.markdown) || "").trim();
      if (!A) return;
      const S = String((k == null ? void 0 : k.name) || "").trim() || "文本",
        C = 320,
        I = 400,
        E = zun(t.current, e, {
          w: C,
          h: I
        }),
        M = y();
      i(T => {
        const P = Ki(M, "text-node", E.x, E.y, S, {
          text: A,
          textNodeComposerOpen: !1,
          textNodeUserFormatted: !0
        }, T);
        return P.width = C, P.height = I, P.content = A, P.prompt = A, [...T, P];
      }), b(M);
    }, [e, y, b, i, t]);
  return {
    addNode: v,
    handleCreateNodeAtCanvasCenter: _,
    handleAddMemoryFileTextNode: w
  };
}

async function DDi(e, t, n) {
  var p;
  const r = Array.isArray(e.actions) ? e.actions : [],
    a = _mi(n.getNodes()),
    i = Ami(e),
    o = new Set(),
    s = [];
  let l,
    d = !1;
  for (let m = 0; m < r.length; m += 1) {
    const f = r[m];
    if (!f || typeof f != "object" || Array.isArray(f)) continue;
    const y = f,
      b = String(y.action || "").trim();
    if (!b || b === "batch_actions") continue;
    const v = kmi(b, _0(y), a, n.getNodes());
    if (v.unresolved.length) {
      l = `unresolved node id placeholder: ${v.unresolved.join(", ")}`, s.push({
        action: b,
        ok: !1,
        error: l
      });
      continue;
    }
    const _ = Imi(b, v.payload, i == null ? null : i - o.size);
    if (!_) {
      s.push({
        action: b,
        ok: !0,
        nodeId: String(v.payload.nodeId || v.payload.id || "")
      });
      continue;
    }
    let w;
    try {
      w = await n.executeAction({
        action: b,
        payload: _,
        requestId: typeof y.requestId == "string" ? y.requestId : t ? `${t}:${m}` : void 0
      }, {
        deferFlush: !0
      });
    } catch (A) {
      w = {
        ok: !1,
        error: A instanceof Error ? A.message : String(A)
      };
    }
    for (const A of w.submittedNodeIds || []) A && o.add(A);
    const k = w.ok && w.partial !== !0;
    s.push({
      action: b,
      ok: k,
      nodeId: w.nodeId,
      error: w.error
    }), d || (d = w.ok || w.partial === !0 || !!((p = w.submittedNodeIds) != null && p.length)), k || (l = w.error || `batch step failed: ${b}`), Smi(a, b, _, w, n.getNodes());
  }
  const u = s.every(m => m.ok),
    h = [...o];
  return {
    ok: u,
    error: l,
    submittedNodeIds: h,
    partial: !u && d,
    actionResults: s,
    hint: h.length > 0 ? `batch run_generation×${h.length}` : u ? "batch_actions 完成" : l
  };
}

function Uun(e, t) {
  var n;
  (n = e.flushDocument) == null || n.call(e), e.scheduleFlush(t === "create_image_series" ? 80 : 60);
}

function LDi(e) {
  const t = async (n, r) => {
    var s;
    (s = r == null ? void 0 : r.assertCurrent) == null || s.call(r);
    const a = e.prepare(n);
    if (a.kind === "blocked") return a.result;
    const {
      action: i,
      payload: o
    } = a;
    Mki();
    try {
      if (i === "batch_actions") {
        const d = await DDi(o, n.requestId, {
          getNodes: e.getNodes,
          executeAction: (u, h) => t(u, {
            ...r,
            ...h
          })
        });
        return r != null && r.deferFlush || Uun(e, i), d;
      }
      const l = await e.executeCommand(i, o, r);
      return l && !(r != null && r.deferFlush) && Uun(e, i), l ?? {
        ok: !0
      };
    } finally {
      Pki();
    }
  };
  return t;
}

function wpr(e) {
  if (e.isInteracting()) {
    if (!e.deferUntilIdle || !(e.deferredNodeCommitQueuedRef.current || e.deferredConnectionCommitQueuedRef.current)) return;
    e.deferUntilIdle(() => {
      wpr({
        ...e,
        isInteracting: () => !1
      });
    });
    return;
  }
  const t = e.nodesRef.current,
    n = e.connectionsRef.current,
    r = e.deferredNodeCommitQueuedRef.current,
    a = e.deferredConnectionCommitQueuedRef.current;
  if (r && (e.deferredNodeCommitQueuedRef.current = !1), a && (e.deferredConnectionCommitQueuedRef.current = !1), !r && !a) {
    jcn();
    return;
  }
  jcn(), r && e.setNodes(() => t), a && e.setConnections(() => n);
}

function cAt(e) {
  const t = new Set(),
    n = [];
  for (const r of e) {
    const a = String(r || "").trim();
    !a || t.has(a) || (t.add(a), n.push(a));
  }
  return n;
}

function ODi(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  return cAt([n, r, r !== n ? r : "", `${n}分组`, `${n}分组key`, `${n}分组的key`, `${n}的key`, `用${n}`, n.toLowerCase(), n.replace(/\s+/g, "")]);
}

function xpr(e, t) {
  const n = Qjn(e, t),
    r = n.length > 0 ? void 0 : "gemini-3-pro-preview",
    a = nKe(r, {
      tokens: e,
      pricing: t ?? null
    }),
    i = [{
      value: ko,
      label: a ? `自动（${a}）` : "自动",
      kind: "auto",
      aliases: cAt(["自动", "自动分组", "默认分组", "auto", a ? `自动${a}` : "", a ? `自动（${a}）` : ""])
    }, {
      value: Hg,
      label: a2e,
      kind: "model_key",
      aliases: cAt([a2e, "模型key", "模型 key", "设置页key", "设置页 key", "该模型自己的key", "模型配置key"])
    }, ...n.map(o => {
      var l, d;
      const s = ((d = (l = t == null ? void 0 : t.usableGroupLabels) == null ? void 0 : l[o]) == null ? void 0 : d.trim()) || o;
      return {
        value: o,
        label: s,
        kind: "group",
        aliases: ODi(o, s)
      };
    })];
  return {
    settingsKey: "platformGroup",
    nodeTypes: ["gen-image", "gen-video", "text-node"],
    autoValue: ko,
    modelKeyValue: Hg,
    options: i,
    rules: ["绘画/视频/文本节点底栏「模型 Key」下拉与 capabilities.platformGroups.options 一致；Codex 不得臆造未列出的分组 id。", "用户说「用 gemini-t3 分组的 key / 用 gemini优质」→ update_node 或 create_node 的 settings.platformGroup 设为对应 options[].value（如 gemini-t3、gemini优质）。", `用户说「用模型 Key / 设置页该模型 key」→ settings.platformGroup="${Hg}"。`, `用户说「自动分组」或未指定分组 → settings.platformGroup="${ko}" 或省略该字段。`, "切换 platformGroup 后若需立即生成，继续 run_generation；分组只影响后续请求使用的 API Key 解析，不会泄露任何 key 字符串。"],
    examples: [{
      action: "update_node",
      payload: {
        nodeId: "<gen-image-node-id>",
        settings: {
          platformGroup: n[0] || ko
        }
      }
    }, {
      action: "update_node",
      payload: {
        nodeId: "<gen-image-node-id>",
        settings: {
          platformGroup: Hg
        }
      }
    }, {
      action: "create_node",
      payload: {
        type: "gen-image",
        prompt: "…",
        model: "<visibleModels.modelName>",
        settings: {
          platformGroup: n[1] || n[0] || ko
        }
      }
    }]
  };
}

function BDi(e, t) {
  const n = String(e ?? "").trim();
  return !n || n === ko || n === Hg || Az(n) ? !0 : t ? t.options.some(a => a.value === n) ? !0 : t.options.some(a => a.kind === "group") ? !1 : n.length > 0 && n.length <= 64 : n.length > 0 && n.length <= 64;
}

const FDi = /^(aireadable|aiwritable|hidden|token|apikey|api_key|password|secret|accesskey|access_key|env|\.env)$/i,
  zDi = new Set(["gen-image", "gen-video", "custom-agent", "video-analyze", "gen-music", "gen-speech", "motion-control", "jimeng-super-resolution", "fal-rembg", "virtual-try-on", "video-relight"]);

function dAt(e, t = 0) {
  if (t > 6 || e == null) return null;
  if (Array.isArray(e)) {
    for (const n of e) {
      const r = dAt(n, t + 1);
      if (r) return r;
    }
    return null;
  }
  if (typeof e == "object") for (const [n, r] of Object.entries(e)) {
    if (FDi.test(n.trim())) return n;
    const a = dAt(r, t + 1);
    if (a) return a;
  }
  return null;
}

function u$e(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}

function UDi(e) {
  if (typeof e != "string") return !1;
  const t = e.trim();
  if (t.length < 6) return !1;
  const n = [...t],
    r = n.filter(i => i === "?").length;
  if (r === 0) return !1;
  const a = n.filter(i => i === "?" || i === "," || i === " " || i === ":" || i === ";" ? !1 : i.trim().length > 0).length;
  return r * 2 >= n.length && a <= Math.max(2, n.length / 8);
}

function $Di(e) {
  const t = [];
  typeof e.prompt == "string" && t.push(e.prompt);
  const n = u$e(e.settings);
  return typeof n.text == "string" && t.push(n.text), t;
}

function $Me(e) {
  for (const t of $Di(e)) if (UDi(t)) return {
    ok: !1,
    error: "prompt encoding corrupted (????); resend POST as UTF-8 JSON via curl.exe --data-binary @file.json or fetch+JSON.stringify, not PowerShell ConvertTo-Json"
  };
  return {
    ok: !0
  };
}

const $un = 32,
  Gun = 24,
  GDi = new Set(["primary", "character", "pet", "scene", "style", "supplementary"]);

function Vun(e, t, n = []) {
  if (!GDi.has(String(t.referenceRole || "").trim()) || t.replaceExistingTargets === !0 || t.replaceInboundRef === !0) return !1;
  const r = typeof t.inputType == "string" ? t.inputType : void 0,
    a = String(t.to || t.toNodeId || "").trim(),
    i = e === "connect_nodes" ? [t.from || t.fromNodeId] : t.fromNodes ?? t.refs ?? t.from,
    s = (Array.isArray(i) ? i : [i]).map(l => String(l || "").trim()).filter(Boolean);
  return !!a && s.length > 0 && s.every(l => n.some(d => d.from === l && d.to === a && d.inputType === r));
}

function Dst(e, t) {
  const n = u$e(e.settings);
  for (const r of [e.platformGroup, n.platformGroup]) if (!(r == null || r === "")) {
    if (typeof r != "string") return {
      ok: !1,
      error: "platformGroup must be a string"
    };
    if (!BDi(r, t == null ? void 0 : t.platformGroups)) return {
      ok: !1,
      error: `platformGroup not allowed: ${r}`
    };
  }
  return {
    ok: !0
  };
}

function aV(e, t) {
  const n = String(e || "").trim();
  if (!n) return !0;
  const r = t == null ? void 0 : t.nodeTypesById,
    a = t == null ? void 0 : t.nodes;
  return !!(!r && !a || r != null && r.has(n) || a != null && a.length && mXe(n, a, "any"));
}

function uAt(e, t, n) {
  var o, s, l, d, u, h, p, m, f, y, b, v;
  const r = String(e || "").trim();
  if (r === "create_gen_image" || r === "execute_node") return {
    ok: !0
  };
  if (!Ksr(r)) return {
    ok: !1,
    error: `action not allowed: ${r}`
  };
  const a = _0(t),
    i = dAt(a);
  if (i) return {
    ok: !1,
    error: `forbidden field: ${i}`
  };
  switch (r) {
    case "gen_image":
      {
        if (typeof a.taskKey != "string" || !a.taskKey.trim() || a.taskKey.length > 128) return {
          ok: !1,
          error: "gen_image requires taskKey (1-128 characters, stable within this run)"
        };
        try {
          const _ = yJn(a),
            w = dLt(a.revisionOf),
            k = bJn(String(a.prompt || ""), w ? [{
              nodeId: w.nodeId,
              use: "primary"
            }, ..._] : _);
          if (k.length < 8) return {
            ok: !1,
            error: "gen_image requires a final image prompt (at least 8 characters)"
          };
          for (const A of _) {
            if (!A.nodeId || n != null && n.skipNodeExistenceCheck) continue;
            const S = ((o = n == null ? void 0 : n.nodeTypesById) == null ? void 0 : o.get(A.nodeId)) || ((l = (s = n == null ? void 0 : n.nodes) == null ? void 0 : s.find(C => C.id === A.nodeId)) == null ? void 0 : l.type);
            if (S && S !== "gen-image" && (n != null && n.nodes || n != null && n.nodeTypesById) && !Lie(S, "gen-image")) return {
              ok: !1,
              error: `unsupported or missing image reference node: ${A.nodeId}`
            };
          }
          return uAt("create_node", {
            payload: {
              ...a,
              type: "gen-image",
              prompt: k
            }
          }, n);
        } catch (_) {
          return {
            ok: !1,
            error: _ instanceof Error ? _.message : String(_)
          };
        }
      }
    case "create_image_series":
      {
        const _ = String(a.referenceNodeId || a.referenceId || a.from || "").trim();
        if (!_) return {
          ok: !1,
          error: "create_image_series requires referenceNodeId"
        };
        if (!(n != null && n.skipNodeExistenceCheck) && !aV(_, n)) return {
          ok: !1,
          error: `reference node not found on canvas: ${_}; use find_canvas_nodes to get real node ids`
        };
        const w = a.prompts ?? a.items ?? a.variants ?? a.regions;
        if (!Array.isArray(w) || w.length === 0) return {
          ok: !1,
          error: "create_image_series requires prompts[]"
        };
        if (w.length > Gun) return {
          ok: !1,
          error: `create_image_series max ${Gun} prompts`
        };
        for (let A = 0; A < w.length; A++) {
          const S = w[A],
            C = typeof S == "string" ? S : typeof S == "object" && S != null ? String(S.prompt || S.text || "") : "";
          if (!C.trim()) return {
            ok: !1,
            error: `create_image_series prompts[${A}] missing prompt`
          };
          const I = $Me({
            prompt: C
          });
          if (!I.ok) return I;
        }
        const k = Dst(a, n);
        return k.ok ? {
          ok: !0
        } : k;
      }
    case "batch_actions":
      {
        const _ = a.actions;
        if (!Array.isArray(_) || _.length === 0) return {
          ok: !1,
          error: "batch_actions requires non-empty actions[]"
        };
        if (_.length > $un) return {
          ok: !1,
          error: `batch_actions max ${$un} items`
        };
        let w = !1,
          k = 0;
        for (let A = 0; A < _.length; A++) {
          const S = _[A];
          if (!S || typeof S != "object" || Array.isArray(S)) continue;
          const C = S,
            I = String(C.action || "").trim();
          if (!I) continue;
          if (I === "batch_actions") return {
            ok: !1,
            error: `batch_actions[${A}] nested batch forbidden`
          };
          if (k += 1, w && (I === "run_generation" || I === "update_node" || I === "select_node" || I === "delete_node")) {
            const M = _0(C);
            if (!String(M.nodeId || M.id || "").trim()) continue;
          }
          const E = uAt(I, C, n && {
            ...n,
            skipNodeExistenceCheck: !0
          });
          if (!E.ok) return {
            ok: !1,
            error: `batch_actions[${A}]: ${E.error}`
          };
          I === "create_node" && (w = !0);
        }
        return k === 0 ? {
          ok: !1,
          error: "batch_actions requires non-empty actions[]"
        } : {
          ok: !0
        };
      }
    case "create_node":
      {
        const _ = String(a.type || "text-node").trim();
        if (!oLt.has(_)) return {
          ok: !1,
          error: `node type not creatable by Codex: ${_}`
        };
        const w = u$e(a.settings);
        for (const S of Object.keys(w)) if (!Gnn.has(S)) return {
          ok: !1,
          error: `settings key not allowed on create: ${S}`
        };
        const k = $Me(a);
        if (!k.ok) return k;
        const A = Dst(a, n);
        return A.ok ? {
          ok: !0
        } : A;
      }
    case "update_node":
      {
        const _ = String(a.nodeId || a.id || "").trim();
        if (!_) return {
          ok: !1,
          error: "update_node requires nodeId"
        };
        if (!(n != null && n.skipNodeExistenceCheck) && !aV(_, n)) return {
          ok: !1,
          error: `node not found on canvas: ${_}; use find_canvas_nodes to get real node ids`
        };
        const w = u$e(a.settings);
        for (const S of Object.keys(w)) if (!Gnn.has(S)) return {
          ok: !1,
          error: `settings key not allowed on update: ${S}`
        };
        const k = $Me(a);
        if (!k.ok) return k;
        const A = Dst(a, n);
        return A.ok ? {
          ok: !0
        } : A;
      }
    case "connect_nodes":
      {
        const _ = String(a.from || a.fromNodeId || "").trim(),
          w = String(a.to || a.toNodeId || "").trim();
        if (!_ || !w) return {
          ok: !1,
          error: "connect_nodes requires from and to"
        };
        if (!(n != null && n.skipNodeExistenceCheck)) {
          const S = [_, w].filter(C => !aV(C, n));
          if (S.length > 0) return {
            ok: !1,
            error: `node not found on canvas: ${S.join(", ")}; use find_canvas_nodes to get real node ids`
          };
        }
        const k = (d = n == null ? void 0 : n.nodeTypesById) == null ? void 0 : d.get(_),
          A = (u = n == null ? void 0 : n.nodeTypesById) == null ? void 0 : u.get(w);
        if (k && A && !Lie(k, A)) return {
          ok: !1,
          error: `connection not allowed by capabilities: ${k} → ${A}`
        };
        if (Vun("connect_nodes", a, n == null ? void 0 : n.connections)) return {
          ok: !0
        };
        if (A) {
          const S = bze(A),
            C = ((h = n == null ? void 0 : n.incomingFromByNodeId) == null ? void 0 : h.get(w)) ?? [],
            I = new Set([...C, _]);
          if (S != null && S.maxIncoming && I.size > S.maxIncoming) return {
            ok: !1,
            error: `${A} accepts at most ${S.maxIncoming} incoming reference connection(s)`
          };
          if (S != null && S.maxReferenceIncoming && ((p = S.referenceFrom) != null && p.length) && [...I].filter(M => {
            var P, R;
            const T = (P = n == null ? void 0 : n.nodeTypesById) == null ? void 0 : P.get(M);
            return !!(T && ((R = S.referenceFrom) != null && R.includes(T)));
          }).length > S.maxReferenceIncoming) return {
            ok: !1,
            error: `${A} accepts at most ${S.maxReferenceIncoming} incoming reference connection(s)`
          };
        }
        return {
          ok: !0
        };
      }
    case "connect_multi_refs":
      {
        const _ = String(a.to || a.toNodeId || "").trim(),
          w = a.fromNodes ?? a.refs ?? a.from,
          k = Array.isArray(w) ? w.map(S => String(S).trim()).filter(Boolean) : typeof w == "string" && w.trim() ? [w.trim()] : [];
        if (!_ || k.length === 0) return {
          ok: !1,
          error: "connect_multi_refs requires to and fromNodes[]"
        };
        if (!(n != null && n.skipNodeExistenceCheck)) {
          const S = [_, ...k].filter(C => !aV(C, n));
          if (S.length > 0) return {
            ok: !1,
            error: `node not found on canvas: ${S.join(", ")}; use find_canvas_nodes to get real node ids`
          };
        }
        const A = (m = n == null ? void 0 : n.nodeTypesById) == null ? void 0 : m.get(_);
        if (A) {
          if (Vun("connect_multi_refs", a, n == null ? void 0 : n.connections)) return {
            ok: !0
          };
          const S = bze(A),
            C = ((f = n == null ? void 0 : n.incomingFromByNodeId) == null ? void 0 : f.get(_)) ?? [],
            I = new Set([...C, ...k]);
          if (S != null && S.maxIncoming && I.size > S.maxIncoming) return {
            ok: !1,
            error: `${A} accepts at most ${S.maxIncoming} incoming reference connection(s)`
          };
          if (S != null && S.maxReferenceIncoming && ((y = S.referenceFrom) != null && y.length) && [...I].filter(M => {
            var P, R;
            const T = (P = n == null ? void 0 : n.nodeTypesById) == null ? void 0 : P.get(M);
            return !!(T && ((R = S.referenceFrom) != null && R.includes(T)));
          }).length > S.maxReferenceIncoming) return {
            ok: !1,
            error: `${A} accepts at most ${S.maxReferenceIncoming} incoming reference connection(s)`
          };
          for (const E of k) {
            const M = (b = n == null ? void 0 : n.nodeTypesById) == null ? void 0 : b.get(E);
            if (M && !Lie(M, A)) return {
              ok: !1,
              error: `connection not allowed by capabilities: ${M} → ${A}`
            };
          }
        }
        return {
          ok: !0
        };
      }
    case "select_node":
      {
        const _ = String(a.nodeId || a.id || "").trim();
        return _ ? !(n != null && n.skipNodeExistenceCheck) && !aV(_, n) ? {
          ok: !1,
          error: `node not found on canvas: ${_}; use find_canvas_nodes to get real node ids`
        } : {
          ok: !0
        } : {
          ok: !1,
          error: "select_node requires nodeId"
        };
      }
    case "delete_node":
      {
        const _ = String(a.nodeId || a.id || "").trim();
        return _ ? !(n != null && n.skipNodeExistenceCheck) && !aV(_, n) ? {
          ok: !1,
          error: `node not found on canvas: ${_}; use find_canvas_nodes to get real node ids`
        } : {
          ok: !0
        } : {
          ok: !1,
          error: "delete_node requires nodeId"
        };
      }
    case "write_text":
      {
        const _ = String(a.content || a.text || a.prompt || "").trim();
        if (!_) return {
          ok: !1,
          error: "write_text requires content"
        };
        if ([..._].length > 8e3) return {
          ok: !1,
          error: "write_text content is too long"
        };
        const w = $Me({
          prompt: _
        });
        return w.ok ? {
          ok: !0
        } : w;
      }
    case "cleanup_orphan_nodes":
    case "undo":
    case "redo":
      return {
        ok: !0
      };
    case "run_generation":
      {
        const _ = String(a.nodeId || a.id || "").trim();
        if (!_) return {
          ok: !1,
          error: "run_generation requires nodeId"
        };
        if (!(n != null && n.skipNodeExistenceCheck) && !aV(_, n)) return {
          ok: !1,
          error: `node not found on canvas: ${_}; use find_canvas_nodes to get real node ids`
        };
        const w = (v = n == null ? void 0 : n.nodeTypesById) == null ? void 0 : v.get(_);
        return w && !zDi.has(w) ? {
          ok: !1,
          error: `node type cannot run generation: ${w}`
        } : {
          ok: !0
        };
      }
    default:
      return {
        ok: !1,
        error: `action not allowed: ${r}`
      };
  }
}

const Bye = new Set(["input-image", "preview"]),
  h$e = new Set(["gen-image", "gen-video", "gen-3d"]),
  VDi = new Set(ZXn);

function HDi(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}

function hAt(e) {
  if (e == null) return null;
  if (typeof e == "string") {
    const r = e.trim();
    if (!r) return null;
    if (r.startsWith("{") || r.startsWith("[")) try {
      return hAt(JSON.parse(r));
    } catch {
      return null;
    }
    return VDi.has(r) ? {
      action: r
    } : null;
  }
  if (Array.isArray(e)) return e.length === 1 ? hAt(e[0]) : null;
  if (typeof e != "object") return null;
  const t = {
    ...e
  };
  let n = String(t.action || t.name || t.op || "").trim();
  if (!n && typeof t.type == "string") {
    const r = t.type.trim();
    if (oLt.has(r)) return n = "create_node", t.action = n, t;
  }
  return n ? (t.action = n, t) : null;
}

function WDi(e) {
  const t = [];
  for (const n of e) {
    const r = hAt(n);
    r && t.push(r);
  }
  return t;
}

function Hun(e, t, n) {
  const r = a => t.some(i => {
    if (i.to !== a) return !1;
    const o = e.find(s => s.id === i.from);
    return !!(o && Bye.has(o.type));
  });
  if (n) {
    const a = e.find(i => i.id === n);
    if (a && h$e.has(a.type) && !r(a.id)) return a.id;
  }
  for (let a = e.length - 1; a >= 0; a -= 1) {
    const i = e[a];
    if (h$e.has(i.type) && !r(i.id)) return i.id;
  }
  return null;
}

function _pr(e, t, n) {
  var s, l;
  const r = String(e.from || e.fromNodeId || "").trim(),
    a = String(e.to || e.toNodeId || "").trim();
  if (!r || !a || r === a) return e;
  const i = (s = t.find(d => d.id === r)) == null ? void 0 : s.type,
    o = (l = t.find(d => d.id === a)) == null ? void 0 : l.type;
  if (!i || !o || Lie(i, o)) return e;
  if (Bye.has(i) && Bye.has(o)) {
    const d = Hun(t, n);
    return d ? {
      ...e,
      from: r,
      to: d,
      fromNodeId: r,
      toNodeId: d,
      _healedFrom: `${i}→${o}`,
      _healedTo: d
    } : e;
  }
  if (h$e.has(i) && h$e.has(o)) {
    const d = [...t].reverse().find(u => Bye.has(u.type));
    return !d || !Lie(d.type, o) ? e : {
      ...e,
      from: d.id,
      to: a,
      fromNodeId: d.id,
      toNodeId: a,
      _healedFrom: `${i}→${o}`,
      _healedTo: a
    };
  }
  if (Bye.has(i)) {
    const d = Hun(t, n, a);
    return !d || d === a ? e : {
      ...e,
      from: r,
      to: d,
      fromNodeId: r,
      toNodeId: d,
      _healedFrom: `${i}→${o}`,
      _healedTo: d
    };
  }
  return e;
}

function qDi(e, t, n) {
  const r = e.actions;
  if (!Array.isArray(r) || r.length === 0) return e;
  const a = WDi(r);
  if (a.length === 0) return e;
  const i = a.map(o => {
    const s = String(o.action || "").trim();
    if (s !== "connect_nodes" && s !== "connect_multi_refs") return o;
    const l = HDi(o.payload),
      d = Object.keys(l).length > 0,
      u = d ? l : o;
    if (s === "connect_nodes") {
      const h = _pr(u, t, n);
      return h === u ? o : d ? {
        ...o,
        payload: h
      } : {
        ...o,
        ...h
      };
    }
    return o;
  });
  return {
    ...e,
    actions: i
  };
}

function KDi(e, t) {
  const n = String((e == null ? void 0 : e.action) || "").trim();
  let r = Bg(n, _0(e), t.preferences);
  if (!Ksr(n) && n !== "create_gen_image" && n !== "execute_node") return t.warn("[CanvasAgent] action denied:", n), {
    kind: "blocked",
    result: {
      ok: !1,
      error: `action denied: ${n}`
    }
  };
  n === "connect_nodes" ? r = _pr(r, t.nodes, t.connections) : n === "batch_actions" ? r = qDi(r, t.nodes, t.connections) : n === "gen_image" && (r = uLt(r, t.nodes));
  const a = new Map();
  for (const s of t.connections) {
    const l = a.get(s.to) || [];
    l.includes(s.from) || l.push(s.from), a.set(s.to, l);
  }
  const i = n === "connect_nodes" || n === "batch_actions" || n === "gen_image" ? {
      ...e,
      payload: r,
      ...r
    } : e,
    o = uAt(n, i, {
      nodes: t.nodes,
      nodeTypesById: new Map(t.nodes.map(s => [s.id, s.type])),
      incomingFromByNodeId: a,
      connections: t.connections,
      platformGroups: t.platformGroups
    });
  if (!o.ok) throw t.warn("[CanvasAgent] validation failed:", o.error), new Error(o.error || "action validation failed");
  return t.redesignGate && hJe(n, r) ? {
    kind: "blocked",
    result: {
      ok: !1,
      error: "重新设计门禁：须先 ask_user_choice 让用户选定新方向",
      hint: "禁止在征询方向前提交生成"
    }
  } : {
    kind: "ready",
    action: n,
    payload: r
  };
}

const Fje = new Set(["gen-image", "gen-video"]),
  QDi = new Set(["input-image", "preview", "gen-image", "gen-video"]);

function YDi(e, t, n, r) {
  let a = String(e.id || e.nodeId || "").trim();
  if (!a && !n && Fje.has(t)) {
    const i = r.sessionCreatedGeneratedNodeIds;
    if (!(r.forceNewGeneratedNode || i.size > 0 || !!String(e.nodeName || e.prompt || "").trim())) {
      const s = r.mutations.getNodes().find(l => l.type === t && !l.isGenerating && !i.has(l.id) && !String(l.prompt || "").trim() && !String(l.content || "").trim() && !l.errorMsg);
      s && (a = s.id);
    }
  }
  return a || r.mutations.generateId();
}

function kpr(e) {
  const t = Number(e.imageIndex ?? e.attachmentIndex ?? e.chatImageIndex);
  return Number.isInteger(t) && t >= 1 ? t : null;
}

async function XDi(e, t, n) {
  if (e !== "input-image") return null;
  let r = await n.resolveInputImage(t).catch(a => (n.reportInputImageError(a), null));
  return !r && n.hasInputImageAssets() && !kpr(t) && (r = await n.resolveInputImage({
    ...t,
    imageIndex: 1
  }).catch(() => null)), r;
}

function JDi(e, t) {
  return t ? {
    ...e,
    content: t.content,
    settings: {
      ...(e.settings || {}),
      ...t.settings
    },
    _contentAssetId: t._contentAssetId
  } : e;
}

async function ZDi(e, t, n) {
  const r = String(t.type || (e === "create_gen_image" ? "gen-image" : "text-node")),
    a = t.forceNew === !0;
  let i = YDi(t, r, a, n);
  const o = Ihe(r),
    s = n.mergeGenerationPreferences(n.buildSettings(t));
  let l = RZn({
    type: r,
    defaultWidth: o.w,
    defaultHeight: o.h,
    requestedWidth: typeof t.width == "number" ? t.width : void 0,
    requestedHeight: typeof t.height == "number" ? t.height : void 0
  });
  if (Fje.has(r) && typeof t.width != "number" && typeof t.height != "number") {
    const k = CLn({
      type: r,
      settings: s
    });
    k && (l = EKe(k.w, k.h));
  }
  const d = QDi.has(r) && (typeof t.width == "number" || typeof t.height == "number"),
    u = n.mutations.getNodes(),
    h = n.selectedNodeId && n.mutations.resolveNode(n.selectedNodeId) || null,
    p = FLa({
      viewportCenter: n.getViewportCenter(),
      selectedNode: h,
      nodes: u
    });
  let m = ULa(n.layoutState, {
    type: r,
    nodeWidth: l.width,
    nodeHeight: l.height,
    anchorX: p.x,
    anchorY: p.y,
    nodes: u,
    explicitX: typeof t.x == "number" ? t.x : void 0,
    explicitY: typeof t.y == "number" ? t.y : void 0
  });
  Fje.has(r) && typeof t.x != "number" && typeof t.y != "number" && (m = NLa({
    preferred: m,
    nodeWidth: l.width,
    nodeHeight: l.height,
    anchor: h,
    nodes: u
  })), Fje.has(r) && (typeof t.x == "number" && typeof t.y == "number" ? LZn(n.layoutState, {
    x: m.x,
    y: m.y,
    width: l.width
  }) : (n.layoutState.nextGenX = m.x + l.width + MT, n.layoutState.anchorY = m.y));
  const f = await XDi(r, t, n);
  if (r === "input-image" && !a && !String(t.id || t.nodeId || "").trim() && f) {
    const k = Kdi(n.mutations.getNodes(), f);
    k && (i = k.id);
  }
  const y = n.mutations.resolveNode(i),
    b = JDi(t, f),
    v = n.mergeGenerationPreferences(n.buildSettings(b)),
    _ = EX(b),
    w = PFn(b);
  return _ && v.text === _ && delete v.text, w && v.text === w && !_ && delete v.text, {
    action: e,
    payload: t,
    payloadForNode: b,
    id: i,
    type: r,
    forceNew: a,
    existingNode: y,
    imagePayload: f,
    nodeName: typeof t.nodeName == "string" ? t.nodeName : void 0,
    position: m,
    size: l,
    normalizeMediaNodeSize: d,
    settings: v,
    resolvedPrompt: _,
    resolvedText: w
  };
}

function eLi(e, t) {
  e.commitNodes(n => {
    const r = n.findIndex(s => s.id === t);
    if (r < 0 || n[r].isGenerating) return n;
    const a = n[r],
      i = {
        ...(a.settings || {})
      },
      o = n.slice();
    return o[r] = {
      ...a,
      isGenerating: !0,
      errorMsg: void 0,
      settings: {
        ...i,
        isGenerating: !0,
        progress: Math.max(5, Number(i.progress) || 0),
        error: null
      }
    }, o;
  });
}

async function tLi(e, t, n) {
  var i;
  const r = e.id;
  if (n.noteGenerationStarted(r), n.setGeneratingVisual(r, !0), n.markNodeGenerating(r), (i = n.hasQueueDispatcher) != null && i.call(n) && n.tryEnqueue(r)) return {
    ...t,
    submittedNodeIds: [r],
    workflowComplete: !0,
    hint: "已进入本地生产队列，等待生成结果"
  };
  n.addActiveDispatch(r);
  let a = !1;
  return await new Promise(o => {
    n.scheduleFrame(() => {
      try {
        const s = n.generate(e);
        if (s === void 0) {
          n.removeActiveDispatch(r), n.setGeneratingVisual(r, !1), o();
          return;
        }
        a = !0, Promise.resolve(s).catch(l => {
          console.error("[CanvasAgent] create_node generation failed:", r, l);
        }).finally(() => n.removeActiveDispatch(r));
      } catch (s) {
        n.removeActiveDispatch(r), n.setGeneratingVisual(r, !1), console.error("[CanvasAgent] create_node generation dispatch failed:", r, s);
      }
      o();
    });
  }), a ? {
    ...t,
    submittedNodeIds: [r],
    workflowComplete: !0
  } : {
    ok: !1,
    nodeId: r,
    error: "生成流程未能启动"
  };
}

const nLi = new Set(["gen-image", "gen-video", "generate-character-image", "generate-scene-image", "motion-control", "generate-character-video", "generate-scene-video", "gen-music", "gen-speech"]),
  Wun = new Set(["gen-image", "gen-video", "generate-character-image", "generate-scene-image"]);

function Apr(e) {
  return nLi.has(e.type);
}

function Spr(e, t) {
  var n;
  return e.type === "gen-video" && ((n = e.settings) == null ? void 0 : n._agentAwaitUserPlay) === !0 && t.agentForceVideoRun !== !0;
}

function rLi(e) {
  return {
    ok: !1,
    nodeId: e,
    error: `node not found: ${e}`,
    hint: /\{\{.*\}\}/.test(e) ? "nodeId 含未解析占位符；请用 get_canvas_state 或上一轮 create_node 返回的真实 id" : "请用 get_canvas_state 返回的节点 id（不要用 nodeName）"
  };
}

function Ipr(e) {
  var t;
  return String(e.prompt || "").trim() || String(((t = e.settings) == null ? void 0 : t.text) || "").trim();
}

function Cpr(e, t, n = 8) {
  const r = t ? EX(t) : void 0,
    a = String(r || (e ? Ipr(e) : "") || "").trim();
  return a.length >= n ? a : "";
}

function qun(e, t, n) {
  return n.mutations.commitNodes(a => a.map(i => i.id === e ? {
    ...i,
    prompt: t
  } : i)).find(a => a.id === e);
}

function aLi(e, t) {
  const n = String(e.nodeId || e.id || "");
  if (!n) return {
    kind: "complete",
    result: null
  };
  const r = t.mutations.resolveNode(n);
  if (!r) return {
    kind: "complete",
    result: rLi(n)
  };
  const a = r.id;
  if (!Apr(r)) return {
    kind: "complete",
    result: {
      ok: !1,
      nodeId: a,
      error: `run_generation target must be a generation node, got ${r.type}`,
      hint: "参考图节点不能直接提交生成；请先创建 gen-image/gen-video 并完成参考连线。"
    }
  };
  if (t.hasActiveDispatch(a) || t.hasActiveHistoryTask(a)) return t.warn("[CanvasAgent] run_generation skipped, already generating:", a), {
    kind: "complete",
    result: {
      ok: !0,
      nodeId: a,
      submittedNodeIds: [a],
      hint: "检测到该节点已有真实生成任务，已跳过重复提交"
    }
  };
  const i = EX(e);
  let o = t.mutations.getNodes().find(d => d.id === a) || r;
  const s = Ipr(o),
    l = i || s;
  return Wun.has(r.type) && l.length < 8 ? {
    kind: "complete",
    result: {
      ok: !1,
      nodeId: a,
      error: "generation_prompt_missing",
      hint: "未写入提示词，不能发送生成任务。先 update_node 写出具体画面 prompt，再 run_generation。"
    }
  } : (i && (r.type === "gen-image" || r.type === "gen-video") && i !== s ? o = qun(a, i, t) || r : Wun.has(r.type) && !s && l && (o = qun(a, l, t) || r), Spr(o, e) ? (t.warn("[CanvasAgent] 跳过 run_generation：分镜视频等待用户在画布点击播放"), {
    kind: "complete",
    result: null
  }) : {
    kind: "ready",
    nodeId: a,
    rawNodeId: n,
    payload: e
  });
}

const mzt = new Set(["gen-image", "gen-video"]);

function Kun(e, t) {
  const n = {
    ...e
  };
  return typeof t.payload.x == "number" ? n.x = t.payload.x : e.x || (n.x = t.position.x), typeof t.payload.y == "number" ? n.y = t.payload.y : e.y || (n.y = t.position.y), t.normalizeMediaNodeSize ? (n.width = t.size.width, n.height = t.size.height) : (typeof t.payloadForNode.width == "number" && (n.width = t.payloadForNode.width), typeof t.payloadForNode.height == "number" && (n.height = t.payloadForNode.height)), t.resolvedText ? n.content = t.resolvedText : typeof t.payloadForNode.content == "string" && (n.content = t.payloadForNode.content), t.resolvedPrompt ? n.prompt = t.resolvedPrompt : typeof t.payloadForNode.prompt == "string" && t.payloadForNode.prompt.trim() && (n.prompt = t.payloadForNode.prompt), typeof t.payloadForNode.previewType == "string" && (n.previewType = t.payloadForNode.previewType), typeof t.payloadForNode._contentAssetId == "string" && (n._contentAssetId = t.payloadForNode._contentAssetId), n;
}

function iLi(e, t) {
  let n = null;
  if (e.existingNode ? t.mutations.commitNodes(a => a.map(i => {
    if (i.id !== e.id) return i;
    const o = Kun(i, e);
    return o.settings = t.mergeGenerationPreferences({
      ...(i.settings || {}),
      ...e.settings
    }), n = o, o;
  })) : n = t.mutations.commitNodes(i => {
    var l;
    const o = Ki(e.id, e.type, e.position.x, e.position.y, ((l = e.imagePayload) == null ? void 0 : l.nodeName) || e.nodeName, e.settings, i),
      s = Kun(o, e);
    return n = s, [...i, s];
  }).find(i => i.id === e.id) || n, mzt.has(e.type)) {
    t.markSessionCreatedGeneratedNode(e.id), n && LZn(t.layoutState, n);
    const a = String((n == null ? void 0 : n.prompt) || e.resolvedPrompt || "").trim();
    a && p_e(e.id, a);
  }
  const r = e.existingNode ? e.type === "input-image" ? "画布已有相同参考图 input-image，已复用而非重复上传" : t.forceNewGeneratedNode && e.type === "gen-image" ? "用户要求重新设计：请 create_node(gen-image, forceNew:true) 创建新节点并写全新 prompt" : "节点已存在，已更新而非重复创建" : void 0;
  return {
    node: n,
    result: {
      ok: !0,
      nodeId: e.id,
      reused: !!e.existingNode,
      ...(r ? {
        hint: r
      } : {})
    }
  };
}

function oLi(e, t) {
  e.existingNode || !mzt.has(e.type) || t.mutations.commitConnections(n => {
    const r = n.filter(a => a.inputType !== "agent_sequence");
    return r.length === n.length ? n : r;
  });
}

function sLi(e, t) {
  return !(!t || e.payload.skipAutoRun === !0 || e.type === "gen-video" && (e.settings._agentAwaitUserPlay === !0 || e.settings._agentPipelineVideo === !0) && e.payload.agentForceVideoRun !== !0 || !(e.payload.run === !0 || e.action === "create_gen_image") || mzt.has(e.type) && !Cpr(t, e.payload, 1));
}

async function pAt(e, t, n) {
  const r = await ZDi(e, t, n);
  if (r.type === "input-image" && !r.imagePayload && !String(r.payloadForNode.content || r.payload.content || "").trim()) return {
    ok: !1,
    error: "input_image_asset_missing",
    hint: "本轮附件没有解析成参考图。请用对话里的用户上传图创建 input-image（imageIndex/assetId），不要用画布上的 Generated 成片冒充参考。"
  };
  const a = iLi(r, n);
  return oLi(r, n), t.select === !0 && n.selectNode(r.id), sLi(r, a.node) ? tLi(a.node, a.result, n.generation) : a.result;
}

function lLi(e, t) {
  let n = t.mergeGenerationPreferences({
    ...e.settings,
    _autoCreatedPreviewId: void 0
  });
  if (n !== e.settings) {
    const a = t.mutations.commitNodes(i => i.map(o => {
      if (o.id !== e.id) return o;
      const s = t.mergeGenerationPreferences({
        ...o.settings,
        _autoCreatedPreviewId: void 0
      });
      return n = s, {
        ...o,
        settings: s
      };
    })).find(i => i.id === e.id);
    a != null && a.settings && (n = a.settings);
  }
  return n;
}

function cLi(e, t, n, r) {
  const a = r.mutations.getNodes().find(o => o.id === e);
  if (!a) return r.removeActiveDispatch(e), r.setGeneratingVisual(e, !1), r.warn("[CanvasAgent] run_generation skipped, node not found:", e), {
    ok: !1,
    nodeId: e,
    error: `generation dispatch failed, node not found: ${e}`
  };
  if (Spr(a, n)) return r.removeActiveDispatch(e), r.setGeneratingVisual(e, !1), r.warn("[CanvasAgent] 跳过 run_generation：分镜视频等待用户在画布点击播放"), {
    ok: !1,
    nodeId: e,
    error: "分镜视频等待用户在画布点击播放"
  };
  if (!Apr(a)) try {
    return r.executeNode(e), r.removeActiveDispatch(e), {
      ok: !0,
      nodeId: e,
      hint: "已调用节点执行流程"
    };
  } catch (o) {
    return r.removeActiveDispatch(e), r.setGeneratingVisual(e, !1), {
      ok: !1,
      nodeId: e,
      error: o instanceof Error ? o.message : String(o)
    };
  }
  const i = lLi(a, r);
  try {
    const o = r.generate({
      ...a,
      settings: i
    });
    return o === void 0 ? (r.removeActiveDispatch(e), r.setGeneratingVisual(e, !1), {
      ok: !1,
      nodeId: e,
      error: "generation_prompt_missing",
      hint: "提示词还没写到画布节点上，未进入生产队列。请先把具体画面 prompt 写入该节点再发送。"
    }) : (Promise.resolve(o).catch(s => {
      r.error("[CanvasAgent] run_generation failed:", e, s);
    }).finally(() => r.removeActiveDispatch(e)), {
      ok: !0,
      nodeId: e,
      submittedNodeIds: [e],
      workflowComplete: !0,
      hint: t !== e ? `已按 nodeName 解析并触发生成（${t} → ${e}）` : "已调用真实生成流程，正在创建生产任务"
    });
  } catch (o) {
    return r.removeActiveDispatch(e), r.setGeneratingVisual(e, !1), {
      ok: !1,
      nodeId: e,
      error: o instanceof Error ? o.message : String(o),
      hint: "生成流程未能启动"
    };
  }
}

async function Epr(e, t) {
  var i, o, s, l, d;
  const n = aLi(e, t);
  if (n.kind === "complete") {
    const u = ((i = n.result) == null ? void 0 : i.nodeId) || ((s = (o = n.result) == null ? void 0 : o.submittedNodeIds) == null ? void 0 : s[0]);
    return (l = n.result) != null && l.ok && u && (t.noteGenerationStarted(u), t.setGeneratingVisual(u, !0), t.markNodeGenerating(u)), n.result;
  }
  const {
    nodeId: r,
    rawNodeId: a
  } = n;
  return t.noteGenerationStarted(r), t.setGeneratingVisual(r, !0), t.markNodeGenerating(r), (d = t.hasQueueDispatcher) != null && d.call(t) && t.tryEnqueue(r) ? {
    ok: !0,
    nodeId: r,
    submittedNodeIds: [r],
    workflowComplete: !0,
    hint: "已进入本地生产队列，等待生成结果"
  } : (t.addActiveDispatch(r), new Promise(u => {
    t.scheduleDelay(() => {
      u(cLi(r, a, n.payload, t));
    }, 40);
  }));
}

function Tpr(e, t) {
  const n = t || (e.settings && typeof e.settings == "object" && !Array.isArray(e.settings) ? e.settings : {}),
    r = [e.background, e.gptImageBackground, e.transparent === !0 ? "transparent" : void 0, n.gptImageBackground, n.background, n.seedreamBackground];
  for (const a of r) {
    const i = String(a || "").trim().toLowerCase();
    if (i === "transparent" || i === "opaque" || i === "auto") return i;
  }
}

function dLi(e, t) {
  const n = Tpr(e, t);
  n && (t.gptImageBackground = Dj(n), t.seedreamBackground = n === "auto" ? "opaque" : n, n === "transparent" && (t.gptImageOutputFormat = "png"));
}

function GMe(e) {
  const t = e.settings && typeof e.settings == "object" && !Array.isArray(e.settings) ? {
    ...e.settings
  } : {};
  dLi(e, t), e._recipeExactSettings === !0 && (t._recipeExactSettings = !0), typeof e.model == "string" && e.model.trim() && (t.model = e.model), typeof e.ratio == "string" && e.ratio.trim() && (t.ratio = e.ratio, t._agentExplicitRatio = !0), typeof e.resolution == "string" && e.resolution.trim() && (t.resolution = e.resolution), typeof e.gptImage2Resolution == "string" && e.gptImage2Resolution.trim() && (t.gptImage2Resolution = e.gptImage2Resolution), typeof e.gptImage2AspectRatio == "string" && e.gptImage2AspectRatio.trim() && (t.gptImage2AspectRatio = e.gptImage2AspectRatio), e._agentExplicitGenPrefs === !0 && (t._agentExplicitGenPrefs = !0), (typeof e.duration == "string" && e.duration.trim() || typeof e.duration == "number" && Number.isFinite(e.duration)) && (t.duration = e.duration);
  const n = ["useOss", "ossUploadEnabled", "isAsync", "seedanceVolcIsUploadAsset", "seedanceVolcGenerateAudio", "seedanceGenerateAudio"];
  for (const i of n) typeof e[i] == "boolean" && (t[i] = e[i]);
  const r = e.batchCount != null ? e.batchCount : e.batchSize != null ? e.batchSize : void 0;
  if (r != null) {
    const i = typeof r == "number" ? r : Number(String(r).trim());
    Number.isFinite(i) && i > 0 && (t.batchCount = i, t.batchSize = i);
  }
  const a = typeof e.platformGroup == "string" ? e.platformGroup : typeof t.platformGroup == "string" ? t.platformGroup : "";
  return a.trim() && (t.platformGroup = a.trim()), t;
}

async function uLi(e, t, n, r, a) {
  var B, F, N;
  const {
      mutations: i
    } = t,
    o = uLt(Array.isArray(e.references) ? {
      ...e,
      references: gJn(e.references, {
        assets: r.filter(G => G.kind !== "video"),
        canvasNodeIds: i.getNodes().map(G => G.id)
      })
    } : e, i.getNodes()),
    s = yJn(o),
    l = dLt(o.revisionOf),
    d = r.filter(G => G.kind !== "video"),
    u = l ? i.getNodes().find(G => G.id === l.nodeId) : void 0,
    h = () => {
      if (a == null || a(), !l) return;
      const G = i.getNodes().find(z => z.id === l.nodeId);
      if (!G || G.type !== "gen-image" || G.isGenerating || hCe(G) !== l.imageRevision) throw new Error("revision source changed or is unavailable; read its current imageRevision before retrying");
    };
  h();
  const p = u ? Ry(u)[0] : void 0;
  if (u && !p) throw new Error("revision source has no usable image output");
  const m = vze(e.design, vze((B = u == null ? void 0 : u.settings) == null ? void 0 : B._agentDesign)),
    f = u ? [{
      nodeId: u.id,
      use: "primary"
    }, ...s] : s,
    y = bJn(rrn(String(e.prompt || ""), m ? {
      ...m,
      texts: void 0
    } : void 0), f),
    b = rrn(y, m != null && m.texts ? {
      texts: m.texts
    } : void 0);
  if (b.length < 8) return {
    ok: !1,
    error: "gen_image requires a final image prompt (at least 8 characters)"
  };
  const v = {};
  if (u) for (const G of ["model", "ratio", "resolution", "gptImage2Resolution", "gptImage2AspectRatio", "quality", "platformGroup"]) ((F = u.settings) == null ? void 0 : F[G]) !== void 0 && (v[G] = u.settings[G]);
  let _ = e.settings && typeof e.settings == "object" && !Array.isArray(e.settings) ? e.settings : {};
  const w = Tpr(e, _);
  w && (_ = {
    ..._,
    gptImageBackground: w,
    ...(w === "transparent" ? {
      gptImageOutputFormat: "png",
      seedreamBackground: "transparent"
    } : {
      seedreamBackground: w === "auto" ? "opaque" : w
    })
  });
  const k = w === "transparent" ? kBr(b) : b,
    A = _Ie(String(t.mergeGenerationPreferences(t.buildSettings({
      ...e,
      settings: {
        ...v,
        ..._
      }
    })).model || ""));
  if ((A == null ? void 0 : A.supportsMultipleImages) === !1 && f.length > 1) throw new Error("selected model does not support multiple reference images; keep the selected model and resolve the reference conflict");
  const S = [];
  u && p && S.push({
    ref: {
      use: "primary"
    },
    nodeId: u.id,
    generationUrl: p
  });
  for (const G of s) {
    if (G.refId) {
      const O = Number(G.refId.slice(1)),
        L = d[O - 1];
      if (!L) throw new Error(`attachment not found: ${G.refId}`);
      if (G.assetId && G.assetId !== L.assetId) throw new Error(`attachment set changed: ${G.refId}`);
      const D = x7a(L);
      if (!D) throw new Error(`attachment has no usable url: ${G.refId}`);
      S.push({
        ref: G,
        asset: L,
        generationUrl: D
      });
      continue;
    }
    const z = i.getNodes().find(O => O.id === G.nodeId);
    if (!z || !["input-image", "preview", "gen-image"].includes(z.type)) throw new Error(`unsupported or missing image reference node: ${G.nodeId}`);
    if (z.type !== "gen-image" && !Lie(z.type, "gen-image")) throw new Error(`unsupported or missing image reference node: ${G.nodeId}`);
    const V = Ry(z)[0];
    if (!V) throw new Error(`reference node has no usable url: ${G.nodeId}`);
    S.push({
      ref: G,
      nodeId: z.id,
      generationUrl: V
    });
  }
  if (S.some((G, z) => S.findIndex(V => V.generationUrl === G.generationUrl) !== z)) return {
    ok: !1,
    error: "multiple references resolve to the same asset; use one slot per asset"
  };
  const C = String(v.ratio || _.ratio || e.ratio || "").trim();
  if (!C || C === "智能" || /^auto$/i.test(C)) {
    const G = S.map(L => L.nodeId ? i.getNodes().find(D => D.id === L.nodeId) : void 0).find(L => L),
      z = G ? qce((N = G.settings) == null ? void 0 : N.imageSize) : null,
      V = z ? {
        width: z.w,
        height: z.h
      } : null,
      O = resolveAgentGenerationRatio({
        prefsRatio: "智能",
        sourceSize: V,
        modelId: String(_.model || v.model || e.model || ""),
        requireDefault: !!V
      });
    O.ratio && (_ = {
      ..._,
      ratio: O.ratio
    });
  }
  const I = S.map(G => G.generationUrl),
    E = S.map((G, z) => {
      var V;
      return {
        nodeId: G.nodeId || ((V = G.asset) == null ? void 0 : V.assetId) || `ref-${z + 1}`,
        role: G.ref.use,
        refId: G.ref.refId
      };
    }),
    M = u || S.map(G => G.nodeId ? i.getNodes().find(z => z.id === G.nodeId) : void 0).find(G => G && typeof G.x == "number" && typeof G.y == "number"),
    T = Math.max(0, Math.floor(Number(e.parallelIndex) || 0)),
    P = Aca({
      referenceUrls: I,
      source: M,
      taskText: typeof e.nodeName == "string" && e.nodeName.trim() ? e.nodeName.trim() : void 0
    }),
    R = await pAt("create_node", {
      ...e,
      id: void 0,
      nodeId: void 0,
      type: "gen-image",
      prompt: k,
      forceNew: !0,
      skipAutoRun: !0,
      run: !1,
      agentForceRun: !1,
      ...(T === 0 && typeof P.x == "number" && typeof P.y == "number" ? (() => {
        const G = DZn({
          preferred: {
            x: P.x,
            y: P.y
          },
          nodes: i.getNodes()
        });
        return {
          x: G.x,
          y: G.y
        };
      })() : {}),
      settings: {
        ...v,
        ..._,
        ...(u ? {
          batchSize: 1,
          batchCount: 1
        } : {}),
        referenceImages: I,
        inputImageOrder: I,
        _agentDirectReferenceImages: I,
        _agentReferenceBindings: E,
        _agentReferenceFacts: S.map(G => G.ref.facts).filter(Boolean),
        _agentTaskKey: e.taskKey,
        _agentDesign: m,
        _agentRevisionOf: l,
        _agentTaskCoverUrl: P.coverImageUrl,
        _agentTaskText: P.taskText,
        ...(fu(P.coverImageUrl) ? {
          _canvasDisplayPreviewUrl: P.coverImageUrl,
          _useCanvasPreviewDisplay: !0
        } : {})
      },
      ...(u ? {
        batchSize: 1,
        batchCount: 1
      } : {})
    }, t);
  if (h(), !R.ok || !R.nodeId) return R;
  const j = await hLi(R.nodeId, k, n, a);
  return {
    ...j,
    ok: j.ok,
    nodeId: R.nodeId,
    referenceBindings: E,
    design: m,
    revisionOf: l
  };
}

async function hLi(e, t, n, r) {
  var i;
  if ((i = n.hasQueueDispatcher) != null && i.call(n) && n.tryEnqueue(e)) return n.noteGenerationStarted(e), n.setGeneratingVisual(e, !0), n.markNodeGenerating(e), {
    ok: !0,
    nodeId: e,
    submittedNodeIds: [e],
    workflowComplete: !0,
    hint: "已进入本地生产队列，等待生成结果"
  };
  const a = await Epr({
    nodeId: e,
    prompt: t
  }, {
    ...n,
    tryEnqueue: () => null,
    scheduleDelay: o => {
      r == null || r(), o();
    }
  });
  return {
    ...a,
    ok: (a == null ? void 0 : a.ok) === !0,
    nodeId: e
  };
}

function pLi(e, t) {
  const n = String(e || "").trim();
  if (!n) return;
  const r = t.find(i => i.id === n);
  if (r) return r;
  const a = mXe(n, t.map(i => ({
    id: i.id,
    type: i.type,
    nodeName: i.nodeName
  })), "any");
  return a ? t.find(i => i.id === a) : void 0;
}

function mLi(e) {
  const t = () => {
      e.deferredNodeCommitQueuedRef.current = !1, e.setNodes(o => e.nodesRef.current ?? o);
    },
    n = () => {
      e.deferredConnectionCommitQueuedRef.current = !1, e.setConnections(o => e.connectionsRef.current ?? o);
    },
    r = (o, s, l, d, u, h) => {
      const p = s(o);
      return l(p), h ? (d.current || (d.current = !0, e.deferUntilIdle(u)), p) : e.deferFlush ? (d.current = !0, Nki(), p) : (u(), p);
    };
  return {
    getNodes: () => e.nodesRef.current,
    getConnections: () => e.connectionsRef.current,
    commitNodes: o => {
      const s = e.isInteracting();
      if (e.deferFlush || s || e.deferredNodeCommitQueuedRef.current) return r(e.nodesRef.current, o, d => {
        e.nodesRef.current = d;
      }, e.deferredNodeCommitQueuedRef, t, s);
      let l = e.nodesRef.current;
      return e.setNodes(d => (l = o(d), e.nodesRef.current = l, l)), l;
    },
    commitConnections: o => {
      const s = e.isInteracting();
      if (e.deferFlush || s || e.deferredConnectionCommitQueuedRef.current) return r(e.connectionsRef.current, o, d => {
        e.connectionsRef.current = d;
      }, e.deferredConnectionCommitQueuedRef, n, s);
      let l = e.connectionsRef.current;
      return e.setConnections(d => (l = o(d), e.connectionsRef.current = l, l)), l;
    },
    resolveNode: e.resolveNode,
    generateId: e.generateId
  };
}

function fLi(e, t) {
  const {
      document: n,
      viewport: r
    } = e,
    a = l => pLi(l, n.nodesRef.current),
    i = mLi({
      ...n,
      resolveNode: a,
      deferFlush: t == null ? void 0 : t.deferFlush,
      isInteracting: Yi,
      deferUntilIdle: O$
    }),
    o = () => {
      var d;
      const l = (d = r.canvasRef.current) == null ? void 0 : d.getBoundingClientRect();
      return l ? {
        width: l.width,
        height: l.height
      } : null;
    },
    s = () => {
      const l = o(),
        d = r.viewRef.current,
        u = d.zoom > 0 ? d.zoom : 1;
      return {
        x: l ? (l.width / 2 - d.x) / u : 200,
        y: l ? (l.height / 2 - d.y) / u : 200
      };
    };
  return {
    mutations: {
      ...i,
      commitNodes: l => {
        var d;
        return (d = t == null ? void 0 : t.assertCurrent) == null || d.call(t), i.commitNodes(l);
      },
      commitConnections: l => {
        var d;
        return (d = t == null ? void 0 : t.assertCurrent) == null || d.call(t), i.commitConnections(l);
      }
    },
    resolveNode: a,
    getCanvasSize: o,
    getViewportCenter: s
  };
}

function gLi(e, t) {
  const n = t.find(a => a.id === e.id),
    r = String(e.prompt || (n == null ? void 0 : n.prompt) || "").trim();
  return r.length < 8 ? null : {
    ...(n || e),
    prompt: r
  };
}

function yLi(e, t) {
  const {
    production: n,
    session: r
  } = e;
  return {
    mutations: t,
    hasActiveDispatch: i => n.dispatchRef.current.has(i),
    hasActiveHistoryTask: i => n.historyRef.current.some(o => que(o) === i && o.status === "generating" && lWe(o)),
    tryEnqueue: i => HZn({
      nodeId: i
    }),
    hasQueueDispatcher: FZn,
    addActiveDispatch: i => {
      n.dispatchRef.current.add(i);
    },
    removeActiveDispatch: i => {
      n.dispatchRef.current.delete(i);
    },
    noteGenerationStarted: UQ,
    setGeneratingVisual: hu,
    markNodeGenerating: i => eLi(t, i),
    scheduleDelay: (i, o) => {
      globalThis.setTimeout(i, o);
    },
    mergeGenerationPreferences: i => jDn(i, r.preferencesRef.current),
    generate: i => {
      const o = gLi(i, t.getNodes());
      if (o) return t.commitNodes(s => s.map(l => l.id === o.id ? {
        ...l,
        prompt: o.prompt
      } : l)), e.flushStateRef.current(), p_e(o.id, o.prompt), n.generate(o);
    },
    executeNode: n.executeNode,
    warn: (...i) => console.warn(...i),
    error: (...i) => console.error(...i)
  };
}

const bLi = 24,
  vLi = 6,
  Qun = 220,
  wLi = MT,
  xLi = Pz;

function xR(e, t) {
  return typeof e == "number" && Number.isFinite(e) ? e : t;
}

function Yun(e, t) {
  return Math.max(0, xR(e, t));
}

function _Li(e) {
  return (Array.isArray(e.prompts) ? e.prompts : Array.isArray(e.items) ? e.items : Array.isArray(e.variants) ? e.variants : Array.isArray(e.regions) ? e.regions : []).slice(0, bLi).map(n => n && typeof n == "object" && !Array.isArray(n) ? {
    ...n
  } : {
    prompt: String(n || "")
  }).filter(n => String(n.prompt || n.text || "").trim());
}

function kLi(e, t, n, r) {
  let a = String(e || "").trim();
  if (a && !t.has(a)) return t.add(a), a;
  for (let s = 0; s < 100; s += 1) if (a = String(n() || "").trim(), a && !t.has(a)) return t.add(a), a;
  const i = a || `canvas-agent-series-${r + 1}`;
  let o = 1;
  for (; t.has(`${i}-${o}`);) o += 1;
  return a = `${i}-${o}`, t.add(a), a;
}

function ALi(e, t) {
  const n = String(e.referenceNodeId || e.referenceId || e.from || "").trim(),
    r = _Li(e);
  if (!n || r.length === 0) return null;
  const a = t.resolveNode(n),
    i = RZn({
      type: "gen-image",
      defaultWidth: Qun,
      defaultHeight: Qun,
      requestedWidth: typeof e.width == "number" ? e.width : void 0,
      requestedHeight: typeof e.height == "number" ? e.height : void 0
    }),
    o = Yun(e.gapX, wLi),
    s = Yun(e.gapY, xLi),
    l = xR(e.columns, Math.ceil(Math.sqrt(r.length))),
    d = Math.max(1, Math.min(vLi, Math.round(l))),
    u = t.getViewportCenter(),
    h = {
      x: xR(u.x, 200),
      y: xR(u.y, 200)
    },
    p = xR(a == null ? void 0 : a.x, h.x),
    m = xR(a == null ? void 0 : a.y, h.y),
    f = xR(a == null ? void 0 : a.width, i.width),
    y = xR(a == null ? void 0 : a.height, i.height),
    b = xR(e.x, a ? p + Math.max(0, f) + MT : h.x),
    v = zLa({
      sourceY: m,
      sourceHeight: y,
      itemCount: r.length,
      columns: d,
      nodeHeight: i.height,
      gapY: s,
      explicitY: typeof e.y == "number" && Number.isFinite(e.y) ? e.y : void 0
    }),
    _ = new Set(t.nodes.map(k => k.id)),
    w = r.map((k, A) => {
      const S = kLi(k.id || k.nodeId, _, t.generateId, A),
        C = A % d,
        I = Math.floor(A / d),
        E = String(k.referenceNodeId || k.characterRefId || k.refId || n).trim();
      return {
        id: S,
        index: A,
        prompt: String(k.prompt || k.text || "").trim(),
        referenceNodeId: E || n,
        nodeName: typeof k.nodeName == "string" ? k.nodeName : typeof k.name == "string" ? k.name : `变体 ${A + 1}`,
        x: b + C * (i.width + o),
        y: v + I * (i.height + s),
        width: i.width,
        height: i.height,
        raw: k
      };
    });
  return {
    referenceNodeId: n,
    sourceNode: a,
    items: w,
    columns: d
  };
}

function SLi(e, t) {
  const n = new Set(e.map(({
      item: i
    }) => i.id)),
    r = t.mutations.commitNodes(i => {
      let o = i.filter(s => !n.has(s.id));
      for (const {
        item: s,
        settings: l
      } of e) {
        const d = Ki(s.id, "gen-image", s.x, s.y, s.nodeName, l, o);
        d.width = s.width, d.height = s.height, d.prompt = s.prompt, d.settings = t.mergeGenerationPreferences({
          ...(d.settings || {}),
          ...l
        }), o = [...o, d];
      }
      return o;
    }),
    a = new Map(r.map(i => [i.id, i]));
  return e.map(({
    item: i
  }) => a.get(i.id)).filter(i => !!i);
}

function ILi(e, t, n) {
  const r = new Set(n.getTurnImageAssetIds().map(o => String(o || "").trim()).filter(Boolean)),
    a = new Set();
  if (r.size >= 1) for (const o of n.mutations.getNodes()) {
    if (o.type !== "input-image") continue;
    const s = o.settings || {},
      l = String(s._localCacheAssetId || s._assetId || "").trim();
    l && r.has(l) && a.add(o.id);
  }
  const i = [];
  for (const {
    item: o,
    sourceNode: s
  } of e) {
    if (!t.has(o.id)) continue;
    const l = new Set(a);
    s != null && s.id && l.add(s.id);
    for (const d of l) i.push({
      from: d,
      to: o.id
    });
  }
  i.length !== 0 && n.mutations.commitConnections(o => {
    let s = o;
    for (const {
      from: l,
      to: d
    } of i) kv(s, l, d, "default") || (s === o && (s = [...o]), s.push({
      id: n.mutations.generateId(),
      from: l,
      to: d
    }));
    return s;
  });
}

function Xun(e, t, n) {
  e.size !== 0 && n.mutations.commitNodes(r => r.map(a => {
    if (!e.has(a.id)) return a;
    const i = {
      ...(a.settings || {})
    };
    return {
      ...a,
      isGenerating: t,
      ...(t ? {
        errorMsg: void 0
      } : {}),
      settings: t ? {
        ...i,
        isGenerating: !0,
        progress: Math.max(5, Number(i.progress) || 0),
        error: null
      } : {
        ...i,
        isGenerating: !1
      }
    };
  }));
}

function CLi(e, t) {
  var i;
  const n = [],
    r = [];
  for (const o of e) Cpr(o, void 0, 1) && (t.noteGenerationStarted(o.id), t.setGeneratingVisual(o.id, !0), (i = t.hasQueueDispatcher) != null && i.call(t) && t.tryEnqueue(o.id) ? n.push(o.id) : r.push(o));
  for (const o of r) t.addActiveDispatch(o.id);
  Xun(new Set(e.map(o => o.id)), !0, t);
  const a = new Set();
  for (const o of r) {
    t.noteGenerationStarted(o.id), t.setGeneratingVisual(o.id, !0);
    try {
      const s = t.generate(o);
      n.push(o.id), Promise.resolve(s).catch(l => {
        t.error("[CanvasAgent] create_image_series generation failed:", o.id, l);
      }).finally(() => t.removeActiveDispatch(o.id));
    } catch (s) {
      a.add(o.id), t.removeActiveDispatch(o.id), t.setGeneratingVisual(o.id, !1), t.error("[CanvasAgent] create_image_series generation dispatch failed:", o.id, s);
    }
  }
  return Xun(a, !1, t), n;
}

async function ELi(e, t) {
  const n = ALi(e, {
    nodes: t.mutations.getNodes(),
    generateId: t.mutations.generateId,
    resolveNode: t.mutations.resolveNode,
    getViewportCenter: t.getViewportCenter
  });
  if (!n) return null;
  const r = await t.stabilizeReferenceUrls(n.sourceNode, []),
    a = [];
  for (const u of n.items) {
    const h = t.mutations.resolveNode(u.referenceNodeId),
      p = await t.stabilizeReferenceUrls(h, r),
      m = t.applyGenerationPreferencesToPayload({
        ...e,
        ...u.raw,
        id: u.id,
        nodeId: u.id,
        type: "gen-image",
        prompt: u.prompt,
        x: u.x,
        y: u.y,
        width: u.width,
        height: u.height
      }),
      f = t.mergeGenerationPreferences({
        ...t.buildSettings(m),
        referenceImages: p,
        inputImageOrder: p
      });
    a.push({
      item: u,
      settings: f,
      sourceNode: h || n.sourceNode
    });
  }
  const i = SLi(a, t),
    o = i.map(u => u.id),
    s = new Set(o);
  for (const u of o) t.markSessionCreatedGeneratedNode(u);
  ILi(a, s, t), e.select === !0 && o.length > 0 && t.selectNode(o[o.length - 1]);
  const l = CLi(i, t),
    d = o.length - l.length;
  return {
    ok: l.length > 0,
    nodeId: o[0],
    nodeIds: o,
    count: o.length,
    submittedNodeIds: l,
    workflowComplete: d === 0,
    ...(d > 0 ? {
      partial: l.length > 0,
      error: `${d} 个系列节点未能启动生成`
    } : {}),
    hint: `已提交 ${l.length} 张图生图到生产队列；超并发上限的会排队，勿重复 create_image_series`
  };
}

const TLi = ["model", "ratio", "resolution", "duration", "batchCount", "batchSize", "useOss", "ossUploadEnabled", "isAsync", "seedanceVolcIsUploadAsset", "seedanceVolcGenerateAudio", "seedanceGenerateAudio", "platformGroup", "settings"];

function MLi(e) {
  const t = {
    ...e
  };
  delete t.nodeId, delete t.id, delete t._recipeExactSettings;
  for (const n of TLi) delete t[n];
  return t;
}

function Jun(e, t) {
  return {
    ...e,
    content: t.content,
    settings: {
      ...(e.settings || {}),
      ...t.settings
    },
    _contentAssetId: t._contentAssetId
  };
}

function PLi(e) {
  const t = e.settings && typeof e.settings == "object" ? e.settings : {};
  return {
    role: typeof e.projectAssetRole == "string" ? e.projectAssetRole : typeof t.projectAssetRole == "string" ? t.projectAssetRole : void 0,
    versionGroup: typeof e.projectVersionGroup == "string" ? e.projectVersionGroup : typeof t.projectVersionGroup == "string" ? t.projectVersionGroup : void 0,
    assetNote: typeof e.projectAssetNote == "string" ? e.projectAssetNote : typeof t.projectAssetNote == "string" ? t.projectAssetNote : void 0
  };
}

async function Zun(e, t) {
  const n = String(e.nodeId || e.id || "");
  if (!n) return null;
  const r = t.mutations.resolveNode(n);
  if (!r) return {
    ok: !1,
    nodeId: n,
    error: `node not found: ${n}`,
    hint: "请用 get_canvas_state 返回的节点 id（不要用 nodeName）"
  };
  if (t.shouldProtectGeneratedNode(r)) return {
    ok: !1,
    error: "重新设计轮禁止修改旧 gen-image 的 prompt；请 create_node(gen-image, forceNew:true) 新建节点。",
    hint: "用户要求换风格/重做，勿 update_node 旧方案"
  };
  const a = r.id,
    i = MLi(e);
  let o = e;
  if (r.type === "input-image") {
    const m = await t.resolveInputImage(e).catch(() => null);
    if (!m && t.hasInputImageAssets() && !kpr(e)) {
      const f = await t.resolveInputImage({
        ...e,
        imageIndex: 1
      }).catch(() => null);
      f && (o = Jun(e, f));
    } else m && (o = Jun(e, m));
  }
  const s = t.buildSettings(o),
    l = EX(o),
    d = PFn(o);
  l && s.text === l && delete s.text, d && s.text === d && !l && delete s.text;
  const u = PLi(o),
    p = t.mutations.commitNodes(m => m.map(f => {
      if (f.id !== a) return f;
      const y = {
        ...f,
        ...i
      };
      return typeof o.content == "string" && o.content && (y.content = o.content), typeof o._contentAssetId == "string" && (y._contentAssetId = o._contentAssetId), d && (y.content = d), l && (y.prompt = l), y.settings = {
        ...(f.settings || {}),
        ...s
      }, u.role && (y.projectAssetRole = u.role), u.versionGroup !== void 0 && (y.projectVersionGroup = u.versionGroup), u.assetNote !== void 0 && (y.projectAssetNote = u.assetNote), y;
    })).find(m => m.id === a);
  return l && (r.type === "gen-image" || r.type === "gen-video") && p_e(a, l), {
    ok: !0,
    nodeId: a,
    projectAssetRole: p == null ? void 0 : p.projectAssetRole,
    projectVersionGroup: p == null ? void 0 : p.projectVersionGroup,
    projectAssetNote: p == null ? void 0 : p.projectAssetNote
  };
}

const RLi = new Set(["primary", "character", "pet", "scene", "style", "supplementary"]);

function Mpr(e) {
  const t = String(e || "").trim();
  return RLi.has(t) ? t : void 0;
}

function Ppr(e, t, n, r) {
  const a = e.find(s => s.id === t);
  if (!a || a.type !== "gen-image" && a.type !== "gen-video") return e;
  const {
    referenceImages: i,
    inputImageOrder: o
  } = hIn({
    nodes: e,
    connections: n,
    targetId: t,
    includeGenImage: r == null ? void 0 : r.includeGenImage
  });
  return e.map(s => s.id === t ? {
    ...s,
    settings: {
      ...(s.settings || {}),
      referenceImages: i,
      inputImageOrder: o
    }
  } : s);
}

function NLi(e, t) {
  const n = String(e.from || e.fromNodeId || ""),
    r = String(e.to || e.toNodeId || "");
  if (!n || !r) return null;
  const a = t.resolveNode(n),
    i = t.resolveNode(r),
    o = (a == null ? void 0 : a.id) || n,
    s = (i == null ? void 0 : i.id) || r,
    l = typeof e.inputType == "string" ? e.inputType : void 0,
    d = Mpr(e.referenceRole),
    u = kv(t.getConnections(), o, s, l),
    h = i || t.resolveNode(s),
    p = e.syncReference !== !1 && (!l || l === "default") && (h == null ? void 0 : h.type) !== "text-node" && !!(a && ["input-image", "preview", "gen-image"].includes(a.type)),
    m = (h == null ? void 0 : h.type) === "gen-image" && e.replaceInboundRef === !0;
  return t.commitConnections(f => {
    const y = kv(f, o, s, l),
      b = new Map(t.getNodes().map(w => [w.id, w])),
      v = w => m ? w.filter(k => {
        var S;
        if (k.to !== s || k.from === o) return !0;
        const A = (S = b.get(k.from)) == null ? void 0 : S.type;
        return A !== "input-image" && A !== "preview";
      }) : w;
    if (y && d) return v(f).map(w => w.from === o && w.to === s && kv([w], o, s, l) ? {
      ...w,
      referenceRole: d
    } : w);
    if (y) {
      const w = v(f);
      return w === f ? f : w;
    }
    return [...(m ? f.filter(w => {
      var A;
      if (w.to !== s) return !0;
      const k = (A = b.get(w.from)) == null ? void 0 : A.type;
      return k !== "input-image" && k !== "preview";
    }) : f), {
      id: String(e.id || t.generateId()),
      from: o,
      to: s,
      inputType: l,
      referenceRole: d
    }];
  }), p && t.commitNodes(f => Ppr(f, s, t.getConnections(), {
    includeGenImage: !0
  })), {
    ok: !0,
    nodeId: s,
    noChange: u
  };
}

function jLi(e) {
  return Array.isArray(e) ? e.map(t => String(t).trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}

function DLi(e, t) {
  const n = String(e.to || e.toNodeId || ""),
    r = jLi(e.fromNodes ?? e.refs ?? e.from);
  if (!n || r.length === 0) return null;
  const a = typeof e.inputType == "string" ? e.inputType : void 0,
    i = Mpr(e.referenceRole),
    o = t.resolveNode(n),
    s = e.syncReference !== !1 && (!a || a === "default") && (o == null ? void 0 : o.type) !== "text-node",
    l = e.replaceExistingTargets === !0,
    d = r.every(u => t.getConnections().some(h => h.from === u && h.to === n && h.inputType === a));
  return t.commitConnections(u => {
    let h = l ? u.filter(p => {
      var m;
      return !r.includes(p.from) || p.to === n ? !0 : ((m = t.getNodes().find(f => f.id === p.to)) == null ? void 0 : m.type) !== "gen-video";
    }) : u;
    for (const p of r) {
      const m = h.some(f => f.from === p && f.to === n && f.inputType === a);
      if (m && i) {
        h = h.map(f => f.from === p && f.to === n && f.inputType === a ? {
          ...f,
          referenceRole: i
        } : f);
        continue;
      }
      m || (h = [...h, {
        id: t.generateId(),
        from: p,
        to: n,
        inputType: a,
        referenceRole: i
      }]);
    }
    return h;
  }), s && t.commitNodes(u => Ppr(u, n, t.getConnections(), {
    includeGenImage: !0
  })), {
    ok: !0,
    nodeId: n,
    noChange: d && !l
  };
}

const Rpr = new Set(["input-image", "preview"]);

function LLi(e, t) {
  return t.filter(n => n.from === e || n.to === e).length;
}

function Npr(e, t) {
  return !Rpr.has(e.type) || e.isGenerating ? !1 : LLi(e.id, t) === 0;
}

function OLi(e, t, n) {
  const r = new Set((n == null ? void 0 : n.keepNodeIds) ?? []),
    a = (n == null ? void 0 : n.types) ?? Rpr;
  return e.filter(i => a.has(i.type) && !r.has(i.id)).filter(i => Npr(i, t)).map(i => i.id);
}

function ehn(e, t) {
  const n = !!(t != null && t());
  return e === "undo" ? {
    ok: !0,
    undone: n,
    noChange: !n,
    hint: n ? "已撤销上一步画布操作" : "没有可撤销的操作"
  } : {
    ok: !0,
    redone: n,
    noChange: !n,
    hint: n ? "已重做上一步画布操作" : "没有可重做的操作"
  };
}

function BLi(e, t) {
  const n = String(e.nodeId || e.id || "");
  if (!n) return null;
  if (t.selectNode(n), e.focus !== !1) {
    const r = t.resolveNode(n),
      a = t.getCanvasSize();
    if (r && a) {
      const i = t.getView(),
        o = i.zoom > 0 ? i.zoom : 1;
      t.commitView({
        zoom: o,
        x: a.width / 2 - (r.x + r.width / 2) * o,
        y: a.height / 2 - (r.y + r.height / 2) * o
      });
    }
  }
  return {
    ok: !0,
    nodeId: n
  };
}

function FLi(e, t) {
  const n = String(e.nodeId || e.id || "").trim();
  return n ? t.deleteNodes([n]) ? {
    ok: !0,
    nodeId: n,
    deleted: !0,
    hint: `已删除节点 ${n}`
  } : {
    ok: !1,
    error: `node not found: ${n}`
  } : {
    ok: !1,
    error: "delete_node requires nodeId"
  };
}

function zLi(e, t) {
  const n = t.getNodes(),
    r = t.getConnections(),
    a = e.keepNodeIds ?? e.keep,
    i = Array.isArray(a) ? a.map(f => String(f).trim()).filter(Boolean) : [],
    o = e.nodeIds,
    s = Array.isArray(o) ? o.map(f => String(f).trim()).filter(Boolean) : [],
    l = new Set(i),
    d = s.filter(f => {
      if (l.has(f)) return !1;
      const y = n.find(b => b.id === f);
      return !!(y && Npr(y, r));
    }),
    u = s.length > 0 ? d : OLi(n, r, {
      keepNodeIds: i
    });
  if (s.length > 0 && d.length !== s.length) return {
    ok: !1,
    error: `cleanup_orphan_nodes: ${s.length - d.length} 个显式 nodeIds 不是孤立参考图，已拒绝整单删除`,
    hint: "仅允许删除无连线的 input-image / preview 参考图；请先 get_canvas_state 核对 nodeId"
  };
  const h = new Set(u),
    p = n.filter(f => !h.has(f.id)),
    m = n.filter(f => h.has(f.id));
  return m.length > 0 && (t.preserveHistoryBeforeDeletion(m, n), t.cleanupNodes(m, p)), t.commitNodes(f => f.filter(y => !h.has(y.id))), t.commitConnections(f => f.filter(y => !h.has(y.from) && !h.has(y.to))), {
    ok: !0,
    deletedNodeIds: u,
    noChange: u.length === 0,
    hint: u.length > 0 ? `已清理 ${u.length} 个孤立参考图` : "画布无孤立参考图（isOrphanRef）"
  };
}

const ULi = {
  isLocalCacheMode: ei,
  isGlobalOssEnabled: ua,
  getAssetBlob: async e => {
    const {
      assetStore: t
    } = await Ie(async () => {
      const {
        assetStore: n
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: n
      };
    }, void 0, import.meta.url);
    return t.getAssetBlob(e);
  },
  uploadBlobUrl: async (e, t) => {
    const {
      uploadBlobUrlToGlobalMaterialImage: n
    } = await Ie(async () => {
      const {
        uploadBlobUrlToGlobalMaterialImage: r
      } = await Promise.resolve().then(() => ii);
      return {
        uploadBlobUrlToGlobalMaterialImage: r
      };
    }, void 0, import.meta.url);
    return n(e, t);
  },
  createObjectUrl: e => URL.createObjectURL(e),
  revokeObjectUrl: e => URL.revokeObjectURL(e),
  warn: (...e) => console.warn(...e)
};

function $Li(e) {
  return `${String((e == null ? void 0 : e.nodeName) || "ref").replace(/[^\w\u4e00-\u9fff.-]+/g, "_").slice(0, 60) || "ref"}.png`;
}

async function GLi(e, t, n = ULi) {
  let r = Ry(e).filter(u7);
  const a = cHe(e);
  if (a && n.isLocalCacheMode()) return [`${Ld}${a}`];
  if (r.length === 0 && a && n.isGlobalOssEnabled()) try {
    const i = await n.getAssetBlob(a);
    if (i != null && i.size) {
      const o = n.createObjectUrl(i);
      try {
        const s = await n.uploadBlobUrl(o, $Li(e));
        s != null && s.remoteUrl && (r = [s.remoteUrl]);
      } finally {
        n.revokeObjectUrl(o);
      }
    }
  } catch (i) {
    n.warn("[CanvasAgent] 参考图 OSS 兜底上传失败:", i);
  }
  return r.length > 0 ? r : [...t];
}

async function VLi(e, t, n, r) {
  const {
      document: a,
      viewport: i,
      session: o
    } = n,
    {
      mutations: s,
      resolveNode: l,
      getCanvasSize: d,
      getViewportCenter: u
    } = fLi(n, e === "gen_image" ? {
      ...r,
      deferFlush: !0
    } : r),
    h = yLi(n, s),
    p = o.imageAssetsRef.current.map(_ => ({
      ..._
    })),
    m = _ => h8a(_, p, o.imageAssetCursorRef),
    f = () => o.imageAssetsRef.current.length > 0,
    y = _ => {
      o.createdNodeIdsRef.current.add(_);
    },
    b = h.hasQueueDispatcher,
    v = {
      mutations: s,
      sessionCreatedGeneratedNodeIds: o.createdNodeIdsRef.current,
      forceNewGeneratedNode: o.forceNewRef.current,
      layoutState: o.layoutRef.current,
      selectedNodeId: i.selectedNodeIdRef.current,
      getViewportCenter: u,
      buildSettings: GMe,
      mergeGenerationPreferences: h.mergeGenerationPreferences,
      resolveInputImage: m,
      hasInputImageAssets: f,
      reportInputImageError: _ => console.warn("[CanvasAgent] input-image 归一化失败，回退原 content:", _),
      markSessionCreatedGeneratedNode: y,
      selectNode: i.selectNode,
      generation: {
        ...h,
        tryEnqueue: h.tryEnqueue,
        hasQueueDispatcher: b,
        scheduleFrame: _ => requestAnimationFrame(_)
      }
    };
  switch (e) {
    case "gen_image":
      return uLi(t, v, h, p, r == null ? void 0 : r.assertCurrent);
    case "write_text":
      {
        const _ = String(t.content || t.text || t.prompt || "").trim();
        if (!_) return {
          ok: !1,
          error: "write_text requires content"
        };
        const w = String(t.nodeId || t.id || "").trim(),
          k = Date.now(),
          A = C => {
            s.commitNodes(I => I.map(E => E.id === C ? {
              ...E,
              prompt: _,
              content: _,
              settings: {
                ...(E.settings || {}),
                text: _,
                _agentTypeToken: k
              }
            } : E));
          };
        if (w) {
          const C = await Zun({
            ...t,
            nodeId: w,
            content: _,
            prompt: _
          }, {
            mutations: s,
            buildSettings: GMe,
            resolveInputImage: m,
            hasInputImageAssets: f,
            shouldProtectGeneratedNode: () => !1
          });
          return C != null && C.ok ? (A(String(C.nodeId || w)), {
            ...C,
            nodeId: C.nodeId || w
          }) : C ?? {
            ok: !1,
            error: "write_text failed"
          };
        }
        const S = await pAt("create_node", {
          ...t,
          id: void 0,
          nodeId: void 0,
          type: "text-node",
          content: _,
          prompt: _,
          nodeName: typeof t.nodeName == "string" && t.nodeName.trim() ? t.nodeName : "文字",
          forceNew: !0,
          skipAutoRun: !0,
          run: !1
        }, v);
        return !S.ok || !S.nodeId || A(S.nodeId), S;
      }
    case "create_image_series":
      return ELi(t, {
        ...h,
        getViewportCenter: () => {
          const _ = u();
          return {
            x: typeof t.x == "number" ? t.x : _.x,
            y: typeof t.y == "number" ? t.y : _.y
          };
        },
        applyGenerationPreferencesToPayload: _ => Bg("create_node", _, o.preferencesRef.current),
        buildSettings: GMe,
        stabilizeReferenceUrls: GLi,
        getTurnImageAssetIds: () => o.imageAssetsRef.current.map(_ => _.assetId || ""),
        markSessionCreatedGeneratedNode: y,
        selectNode: i.selectNode,
        tryEnqueue: h.tryEnqueue
      });
    case "create_node":
    case "create_gen_image":
      return pAt(e, t, v);
    case "update_node":
      return Zun(t, {
        mutations: s,
        buildSettings: GMe,
        resolveInputImage: m,
        hasInputImageAssets: f,
        shouldProtectGeneratedNode: _ => o.forceNewRef.current && !o.createdNodeIdsRef.current.has(_.id) && (_.type === "gen-image" || _.type === "gen-video") && !!String(_.prompt || "").trim() && !_.isGenerating
      });
    case "connect_nodes":
      return NLi(t, s);
    case "connect_multi_refs":
      return DLi(t, s);
    case "select_node":
      return BLi(t, {
        resolveNode: l,
        getCanvasSize: d,
        getView: () => i.viewRef.current,
        commitView: i.commitView,
        selectNode: _ => {
          i.selectNode(_), i.selectNodes(new Set([_]));
        }
      });
    case "run_generation":
      return (await Epr(t, h)) ?? {
        ok: !0
      };
    case "execute_node": {
      const localTarget = h.mutations.resolveNode(String(t.nodeId || t.id || ""));
      if (localTarget?.type === "text-node") {
        h.executeNode(localTarget.id);
        return {ok: !0, nodeId: localTarget.id, executionConfirmed: !1, hint: "已调用文字节点执行流程，结果由节点回传"};
      }
      return (await Epr(t, h)) ?? {ok: !0};
    }
    case "delete_node":
      return FLi(t, {
        deleteNodes: a.deleteNodes
      });
    case "cleanup_orphan_nodes":
      return zLi(t, {
        ...s,
        preserveHistoryBeforeDeletion: a.preserveHistoryBeforeDeletion,
        cleanupNodes: (_, w) => {
          Ie(() => Promise.resolve().then(() => yzt), void 0, import.meta.url).then(k => {
            k.cleanupNodesBatch(_, w);
          }).catch(() => {});
        }
      });
    case "undo":
      return ehn("undo", a.undoCanvas);
    case "redo":
      return ehn("redo", a.redoCanvas);
    default:
      return console.warn("[CanvasAgent] unsupported action:", e), {
        ok: !0
      };
  }
}

const mAt = "jiubanbn-agent-action";

function HLi(e) {
  let t = !1,
    n;
  const r = i => {
      if (!(t || !i)) try {
        Promise.resolve(e.execute(i)).catch(e.onActionError);
      } catch (o) {
        e.onActionError(o);
      }
    },
    a = i => r(i.detail);
  if (e.target.addEventListener(mAt, a), e.subscribeNative) try {
    e.subscribeNative(r).then(i => {
      t ? i() : n = i;
    }).catch(e.onActionError);
  } catch (i) {
    e.onActionError(i);
  }
  return () => {
    t || (t = !0, e.target.removeEventListener(mAt, a), n == null || n());
  };
}

function WLi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const n = g.useRef(new Set()),
    r = g.useRef(!1),
    [a] = g.useState(() => LDi({
      prepare: i => {
        const {
          document: o,
          session: s
        } = t.current;
        return KDi(i, {
          nodes: o.nodesRef.current,
          connections: o.connectionsRef.current,
          preferences: s.preferencesRef.current,
          platformGroups: s.platformGroupsRef.current,
          redesignGate: s.redesignGateRef.current,
          warn: (...l) => console.warn(...l)
        });
      },
      getNodes: () => t.current.document.nodesRef.current,
      executeCommand: (i, o, s) => VLi(i, o, t.current, s),
      flushDocument: () => wpr({
        ...t.current.document,
        isInteracting: Yi,
        deferUntilIdle: O$
      }),
      scheduleFlush: i => {
        if (!r.current) return;
        const o = setTimeout(() => {
          n.current.delete(o), r.current && t.current.flushStateRef.current();
        }, i);
        n.current.add(o);
      }
    }));
  return g.useEffect(() => {
    r.current = !0;
    const i = HLi({
      target: window,
      execute: a,
      subscribeNative: async o => {
        const s = window;
        if (!s.__TAURI__ && !s.__TAURI_INTERNALS__) return () => {};
        const {
          listen: l
        } = await Ie(async () => {
          const {
            listen: d
          } = await Promise.resolve().then(() => KKe);
          return {
            listen: d
          };
        }, void 0, import.meta.url);
        return l(mAt, d => o(d.payload));
      },
      onActionError: o => console.error("[CanvasAgent] action subscription failed:", o)
    });
    return () => {
      r.current = !1, i(), n.current.forEach(clearTimeout), n.current.clear();
    };
  }, [a]), a;
}

const thn = 20,
  qLi = 64 * 1024,
  nhn = 1024;

function Lst(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return t >>> 0;
}

function Gfe(e) {
  const t = typeof e == "string" ? e : e == null ? "" : String(e);
  if (t.length > qLi) {
    const n = Lst(t.slice(0, nhn)),
      r = Lst(t.slice(-nhn));
    return (n ^ Math.imul(r, 31) ^ Math.imul(t.length, 2654435761)) >>> 0;
  }
  return Lst(t);
}

function KLi(e) {
  const t = e.settings || {},
    n = e.type === "input-image" || e.type === "preview" ? ABt(e) : null,
    r = (Array.isArray(e.previewMjImages) ? e.previewMjImages.length : 0) + (Array.isArray(e.previewMjVideos) ? e.previewMjVideos.length : 0);
  return JSON.stringify([e.type, e.nodeName || "", e.x, e.y, e.width, e.height, e.isGenerating === !0, Gfe(e.errorMsg), Gfe(e.prompt), Gfe(e.content), Gfe(t.text), Gfe(t.outputContent), r, t.model || "", t.ratio || "", t.resolution || "", t.duration ?? null, Array.isArray(t.generatedImages) ? t.generatedImages.length : 0, (n == null ? void 0 : n.assetId) || "", !!(n != null && n.ossUrl), t.platformGroup || "", e.projectAssetRole || t.projectAssetRole || "", e.projectVersionGroup || t.projectVersionGroup || "", e.projectAssetNote || t.projectAssetNote || "", Array.isArray(t.referenceImages) ? t.referenceImages.length : 0, Array.isArray(t.inputImageOrder) ? t.inputImageOrder.length : 0, hCe(e), t._agentDesign, t._agentRevisionOf, t._agentVisualFacts]);
}

function QLi(e) {
  return JSON.stringify([e.id, e.from, e.to, e.inputType || "", e.referenceRole || ""]);
}

function Vfe(e, t, n, r) {
  e.sequence += 1, e.recentChanges.push({
    id: `canvas-change-${e.revision}-${e.sequence}`,
    type: t,
    nodeId: r,
    summary: n,
    at: Date.now(),
    revision: e.revision
  }), e.recentChanges.length > thn && e.recentChanges.splice(0, e.recentChanges.length - thn);
}

function rhn() {
  return {
    revision: 1,
    sequence: 0,
    initialized: !1,
    nodeSignatures: new Map(),
    connectionSignatures: new Set(),
    recentChanges: []
  };
}

function YLi(e, t, n) {
  const r = new Map(t.map(h => [h.id, KLi(h)])),
    a = new Set(n.map(QLi));
  if (!e.initialized) return e.initialized = !0, e.nodeSignatures = r, e.connectionSignatures = a, {
    stateVersion: e.revision,
    recentChanges: []
  };
  const i = t.filter(h => !e.nodeSignatures.has(h.id)),
    o = [...e.nodeSignatures.keys()].filter(h => !r.has(h)),
    s = t.filter(h => {
      const p = e.nodeSignatures.get(h.id);
      return p != null && p !== r.get(h.id);
    }),
    l = [...a].filter(h => !e.connectionSignatures.has(h)),
    d = [...e.connectionSignatures].filter(h => !a.has(h));
  if (i.length > 0 || o.length > 0 || s.length > 0 || l.length > 0 || d.length > 0) {
    e.revision += 1;
    for (const h of i.slice(0, 6)) Vfe(e, "node_added", `新增 ${h.type} 节点${h.nodeName ? `「${h.nodeName}」` : ""}`, h.id);
    for (const h of o.slice(0, 6)) Vfe(e, "node_removed", "删除节点", h);
    for (const h of s.slice(0, 8)) Vfe(e, "node_updated", `更新 ${h.type} 节点`, h.id);
    l.length > 0 && Vfe(e, "connections_added", `新增 ${l.length} 条连线`), d.length > 0 && Vfe(e, "connections_removed", `移除 ${d.length} 条连线`);
  }
  return e.nodeSignatures = r, e.connectionSignatures = a, {
    stateVersion: e.revision,
    recentChanges: e.recentChanges.map(h => ({
      ...h
    }))
  };
}

function XLi(e) {
  var t, n, r;
  return JSON.stringify([e.projectId ?? null, e.projectName, e.selectedNodeId, [...e.selectedNodeIds], e.view.x, e.view.y, e.view.zoom, ((t = e.canvasSize) == null ? void 0 : t.width) ?? null, ((n = e.canvasSize) == null ? void 0 : n.height) ?? null, e.visibleApiConfigs.map(({
    id: a,
    type: i,
    provider: o,
    modelName: s,
    resolutions: l
  }) => [a, i, o, s, l]), ((r = e.capabilities) == null ? void 0 : r.workflows.map(({
    id: a,
    name: i,
    summary: o
  }) => [a, i, o])) ?? []]);
}

function JLi(e = Pui) {
  let t = rhn(),
    n,
    r = null;
  return {
    read(a) {
      const i = a.projectId ?? null;
      n !== i && (n = i, t = rhn(), r = null);
      const o = YLi(t, a.nodes, a.connections),
        s = XLi(a);
      if (r && r.key === s && r.version === o.stateVersion && r.nodes === a.nodes && r.connections === a.connections) return r.snapshot;
      const l = e({
        ...a,
        ...o
      });
      return r = {
        key: s,
        version: o.stateVersion,
        nodes: a.nodes,
        connections: a.connections,
        snapshot: l
      }, l;
    },
    invalidate() {
      r = null;
    }
  };
}

function ZLi(e) {
  let t = !1,
    n = null,
    r = null,
    a = 0;
  const i = () => {
      var s;
      a += 1, n !== null && e.clearTimer(n), r !== null && ((s = e.cancelIdle) == null || s.call(e, r)), n = null, r = null;
    },
    o = () => {
      if (t) return;
      i();
      const s = a,
        l = () => !t && s === a,
        d = () => {
          n = e.setTimer(() => {
            l() && (n = null, o());
          }, 300);
        };
      if (e.isInteracting()) {
        d();
        return;
      }
      const u = () => {
        if (l()) {
          if (r = null, n = null, e.isInteracting()) {
            d();
            return;
          }
          try {
            Promise.resolve(e.publish()).catch(e.onError);
          } catch (h) {
            e.onError(h);
          }
        }
      };
      e.requestIdle ? r = e.requestIdle(u, 8e3) : n = e.setTimer(u, 120);
    };
  return {
    flush: o,
    dispose() {
      t = !0, i();
    }
  };
}

function eOi(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => JLi()),
    r = g.useCallback(() => {
      const a = t.current;
      return n.read({
        projectId: a.projectIdRef.current,
        projectName: a.projectName,
        view: a.viewRef.current,
        canvasSize: BEr(a.canvasRef.current),
        selectedNodeId: a.selectedNodeId,
        selectedNodeIds: a.selectedNodeIds,
        nodes: a.nodesRef.current,
        connections: a.connectionsRef.current,
        visibleApiConfigs: a.visibleApiConfigs,
        capabilities: a.capabilitiesRef.current
      });
    }, [n, e.projectName, e.selectedNodeId, e.selectedNodeIds, e.visibleApiConfigs]);
  return g.useEffect(() => {
    if (!hXe()) return;
    const a = ZLi({
        isInteracting: () => {
          const o = t.current;
          return Yi() || jl() || Rl() || Av() || wae() || kbt() || o.isDragging || o.draggingSelectionRef.current || !!o.dragNodeId || !!o.resizingNodeId;
        },
        publish: () => fetch(JXn, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(r())
        }),
        setTimer: (o, s) => window.setTimeout(o, s),
        clearTimer: o => window.clearTimeout(o),
        requestIdle: typeof window.requestIdleCallback == "function" ? (o, s) => window.requestIdleCallback(o, {
          timeout: s
        }) : void 0,
        cancelIdle: typeof window.cancelIdleCallback == "function" ? o => window.cancelIdleCallback(o) : void 0,
        onError: () => {}
      }),
      i = t.current.flushStateRef;
    return i.current = a.flush, () => {
      a.dispose(), i.current === a.flush && (i.current = () => {});
    };
  }, [r]), g.useEffect(() => {
    const a = window.setTimeout(() => t.current.flushStateRef.current(), 250);
    return () => window.clearTimeout(a);
  }, [e.nodes, e.connections, e.projectName, e.selectedNodeId, e.selectedNodeIds, e.visibleApiConfigs, e.isDragging, e.dragNodeId, e.resizingNodeId]), {
    readSnapshot: r,
    invalidateSnapshot: n.invalidate
  };
}

function tOi() {
  const e = {
      current: []
    },
    t = {
      current: 0
    },
    n = {
      current: LLa()
    },
    r = {
      current: !1
    },
    a = {
      current: new Set()
    },
    i = {
      current: !1
    },
    o = {
      current: xpr([], null)
    },
    s = {
      current: {
        ...MRe
      }
    };
  return {
    chat: {
      bridgeRef: {
        current: null
      },
      imageAssetsRef: e,
      imageAssetCursorRef: t,
      layoutRef: n,
      forceNewRef: r,
      createdNodeIdsRef: a
    },
    flush: {
      deferredNodeCommitQueuedRef: {
        current: !1
      },
      deferredConnectionCommitQueuedRef: {
        current: !1
      }
    },
    session: {
      preferencesRef: s,
      platformGroupsRef: o,
      redesignGateRef: i,
      forceNewRef: r,
      createdNodeIdsRef: a,
      layoutRef: n,
      imageAssetsRef: e,
      imageAssetCursorRef: t
    },
    dispatchRef: {
      current: new Set()
    },
    flushStateRef: {
      current: () => {}
    },
    undoRef: {
      current: () => !1
    },
    redoRef: {
      current: () => !1
    },
    capabilitiesRef: {
      current: L1t({
        platformGroups: o.current
      })
    }
  };
}

function nOi(e) {
  return {
    canvasChatAgentBridgeRef: e.chat.bridgeRef,
    chatAgentImageAssetsRef: e.chat.imageAssetsRef,
    chatAgentImageAssetCursorRef: e.chat.imageAssetCursorRef,
    chatAgentLayoutRef: e.chat.layoutRef,
    chatAgentForceNewGenImageRef: e.chat.forceNewRef,
    chatAgentSessionCreatedGenNodeIdsRef: e.chat.createdNodeIdsRef
  };
}

function rOi(e, t, n) {
  const r = xpr(t, n);
  return e.session.platformGroupsRef.current = r, e.capabilitiesRef.current = L1t({
    platformGroups: r
  }), hXe() && Dui(L1t({
    platformGroups: r
  })), r;
}

function aOi(e) {
  const [t] = g.useState(tOi);
  return g.useEffect(() => {
    rOi(t, e.platformGroupTokens, e.platformPricing);
  }, [t, e.platformGroupTokens, e.platformPricing]), t;
}

function iOi(e) {
  return (e ?? []).filter(t => t.type === "gen-image" || t.type === "gen-video").map(t => `${t.id}:${Y_e(t) ? 1 : 0}:${t.isGenerating ? 1 : 0}:${String(t.content || "").slice(0, 24)}`).join("|");
}

function oOi(e, t) {
  const n = new Set(e.filter(r => (r.type === "gen-image" || r.type === "gen-video") && r.isGenerating).map(r => r.id));
  for (const r of t) for (const a of r) n.add(a);
  return n;
}

function sOi(e) {
  const t = g.useRef(e.chatSessions);
  t.current = e.chatSessions;
  const n = g.useRef(e.currentChatId);
  n.current = e.currentChatId;
  const r = g.useMemo(() => iOi(e.nodes), [e.nodes]);
  return g.useEffect(() => {
    const a = t.current.find(d => d.id === n.current),
      i = a == null ? void 0 : a.agentCreativeProject;
    if (!i || i.phase === "draft" || i.phase === "awaiting_approval") return;
    const o = e.nodesRef.current ?? [],
      s = oOi(o, i.tasks.map(d => d.generationNodeIds)),
      l = MJn(i, {
        nodes: o
      }, s);
    l !== i && e.setChatSessions(d => d.map(u => u.id !== n.current ? u : {
      ...u,
      agentCreativeProject: l,
      messages: u.messages.map(h => h.agentCreativeProject ? {
        ...h,
        agentCreativeProject: l
      } : h)
    }));
  }, [r, e.nodesRef, e.setChatSessions]), {
    chatSessionsRef: t,
    currentChatIdRef: n
  };
}

function fAt(e, t, n, r, a) {
  var h, p;
  const i = Qke((h = n.settings) == null ? void 0 : h.imageSize) || Dhe(t),
    o = (n.mediaType === "image" || n.mediaType === "video") && i ? kFt(i.w, i.h) : $2e(n.mediaType),
    s = {
      ...n.settings,
      mediaType: n.mediaType,
      ...(i && !Qke((p = n.settings) == null ? void 0 : p.imageSize) ? {
        imageSize: `${i.w}×${i.h}`
      } : {})
    },
    l = String(s._localCacheAssetId || s._assetId || t.id || "").trim(),
    d = !!s._ossUrlOnlyMode || !!s._ossRemoteUrl && /^https?:\/\//i.test(n.content.trim()),
    u = String(n.videoPosterUrl || s._canvasDisplayPreviewUrl || s._ossThumbnailUrl || n.content || "").trim();
  return {
    id: e,
    type: "input-image",
    x: r.x - Math.round(o.width / 2),
    y: r.y - Math.round(o.height / 2),
    ...o,
    content: n.content,
    prompt: t.prompt || "",
    nodeName: Qzn(t, a.filter(m => m.id !== e), a),
    settings: s,
    ...(u ? {
      thumbnailUrl: u
    } : {}),
    ...(n.videoPosterUrl ? {
      videoPosterUrl: n.videoPosterUrl
    } : {}),
    ...(l && !d ? {
      _contentAssetId: l
    } : {})
  };
}

function lOi(e, t, n, r) {
  const a = {
      ...n.settingsExtras
    },
    i = Qke(a.imageSize),
    o = t.name.replace(/\.[^/.]+$/, "");
  if (t.kind === "audio") return {
    id: e,
    type: "input-image",
    x: r.x - 160,
    y: r.y - 100,
    width: 320,
    height: 200,
    content: n.content,
    prompt: t.name,
    settings: {
      mediaType: "audio",
      musicTitle: o,
      ...a
    }
  };
  const s = t.kind === "image" && i ? kFt(i.w, i.h) : {
    width: 320,
    height: 280
  };
  return {
    id: e,
    type: "input-image",
    x: r.x - Math.round(s.width / 2),
    y: r.y - Math.round(s.height / 2),
    ...s,
    content: n.content,
    prompt: "",
    nodeName: o || "素材",
    settings: {
      ...a,
      ...(i ? {
        imageSize: `${i.w}×${i.h}`
      } : {})
    }
  };
}

function cOi(e, t, n, r, a) {
  const i = Ki(e, "input-image", r.x - 140, r.y - 140, t, void 0, a);
  return {
    ...i,
    content: n.url,
    width: 280,
    height: 280,
    settings: {
      ...i.settings,
      ...n.settingsExtras
    },
    ...(n.contentAssetId ? {
      _contentAssetId: n.contentAssetId
    } : {})
  };
}

function dOi(e, t, n, r) {
  var l, d, u, h;
  const a = String(((l = t.settings) == null ? void 0 : l._localCacheAssetId) || ((d = t.settings) == null ? void 0 : d._assetId) || "").trim();
  if (t.mediaType === "video") {
    const p = $2e("video");
    p.width = 444;
    const m = Ki(e, "video-input", n.x - p.width / 2, n.y - p.height / 2, t.nodeName, void 0, r),
      f = String(((u = t.settings) == null ? void 0 : u._localSkillPath) || "").trim();
    return {
      ...m,
      ...p,
      content: t.content,
      videoFileName: t.nodeName,
      settings: {
        ...m.settings,
        ...t.settings,
        mediaType: "video"
      },
      ...(t.nodeName ? {
        nodeName: t.nodeName
      } : {}),
      ...(a ? {
        _contentAssetId: a
      } : {}),
      ...(f && (/^[a-zA-Z]:[\\/]/.test(f) || f.startsWith("/")) ? {
        _localFilePath: f
      } : {})
    };
  }
  const i = Qke((h = t.settings) == null ? void 0 : h.imageSize),
    o = i ? kFt(i.w, i.h) : {
      width: 320,
      height: 280
    },
    s = Ki(e, "input-image", n.x - o.width / 2, n.y - o.height / 2, t.nodeName, void 0, r);
  return {
    ...s,
    ...o,
    content: t.content,
    settings: {
      ...s.settings,
      ...t.settings
    },
    ...(t.nodeName ? {
      nodeName: t.nodeName
    } : {}),
    ...(a ? {
      _contentAssetId: a
    } : {})
  };
}

async function uOi(e, t, n, r, a, i, o) {
  var s;
  if (!a()) return null;
  switch (e.type) {
    case "history-item":
      {
        const l = await r.history(e.item, n().nodesRef.current, o);
        return l && a() ? {
          selection: "replace",
          build: (d, u) => fAt(d, e.item, l, t, u)
        } : null;
      }
    case "material-library-asset":
      {
        const l = (s = n().materialFolders.find(h => h.path === e.parentPath)) == null ? void 0 : s.assets.find(h => h.path === e.assetPath);
        if (!l) return null;
        const d = await r.material(l);
        if (!a()) return null;
        if (!d) return r.error("无法读取该素材（本地与云端均不可用）"), null;
        const u = {
          ...d.settingsExtras
        };
        if (l.kind === "image" && !Qke(u.imageSize)) {
          const h = await r.dimensions(d.content, String(u._ossRemoteUrl || "").trim(), i);
          if (!a()) return null;
          h && (u.imageSize = `${h.w}×${h.h}`);
        }
        return {
          selection: "single",
          build: h => lOi(h, l, {
            ...d,
            settingsExtras: u
          }, t)
        };
      }
    case "pose-reference":
      {
        const l = await r.poseUrl(e);
        if (!l || !a()) return null;
        const d = e.mediaType ? await n().resolvePose(l, e.title, e.mediaType) : await n().resolvePose(l, e.title);
        return a() ? {
          selection: "unchanged",
          build: (u, h) => cOi(u, e.title, d, t, h)
        } : null;
      }
    case "local-skill-image":
      {
        const l = await r.localSkill(e.rootPath, e.relPath);
        return a() ? l ? {
          selection: "single",
          build: (d, u) => dOi(d, l, t, u)
        } : (r.error("发送到画布失败"), null) : null;
      }
  }
}

const hOi = new Set(["x", "y", "width", "height", "nodeName"]),
  pOi = new Set(["content", "previewType", "maskContent", "videoFileName", "_localFilePath", "_contentAssetId"]);

function jpr(e, t) {
  return [...pOi].every(n => Object.is(e[n], t[n]));
}

function mOi(e, t, n) {
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

function fOi(e, t, n) {
  if (n.type !== t.type || !jpr(n, e)) return n;
  let r = !1;
  const a = {
    ...n
  };
  for (const i of new Set([...Object.keys(n), ...Object.keys(t), ...Object.keys(e)])) if (!(i === "id" || i === "type" || hOi.has(i))) {
    if (i === "settings") {
      const o = mOi(e.settings, t.settings, n.settings);
      o !== n.settings && (a.settings = o, r = !0);
      continue;
    }
    Object.is(n[i], e[i]) && (Object.is(t[i], n[i]) || (t[i] === void 0 ? delete a[i] : Object.assign(a, {
      [i]: t[i]
    }), r = !0));
  }
  return r ? a : n;
}

function gAt(e, t, n, r, a) {
  return !n.length || !t() ? !1 : (e.setNodes(i => t() ? [...i, ...r(i)] : i), a !== "unchanged" && e.setSelectedNodeId(i => t() ? n[0] : i), a === "replace" && e.setSelectedNodeIds(i => t() ? new Set(n) : i), t());
}

function gOi(e, t, n) {
  const r = JE(e.id),
    a = r ? {
      ...e,
      x: r.x,
      y: r.y
    } : e;
  if (!n) return {
    ...t,
    x: a.x,
    y: a.y,
    ...(r ? {
      width: e.width,
      height: e.height
    } : {})
  };
  if (a.type !== t.type || !jpr(a, n)) return a;
  const i = fOi(n, t, a),
    o = r || !Object.is(a.width, n.width) ? a.width : t.width,
    s = r || !Object.is(a.height, n.height) ? a.height : t.height;
  return i.width === o && i.height === s ? i : {
    ...i,
    width: o,
    height: s
  };
}

function yOi(e, t, n, r, a) {
  return t() ? (e.setNodes(i => {
    if (!t()) return i;
    const o = r(i),
      s = i.findIndex(l => l.id === n);
    return s < 0 ? [...i, o] : i.map((l, d) => d === s ? gOi(l, o, a) : l);
  }), t()) : !1;
}

function bOi(e) {
  var n;
  const t = e.selectedMjImageIndex ?? 0;
  return (n = e.mjImages) != null && n.length ? e.mjImages[Math.min(t, e.mjImages.length - 1)] || e.url || "" : e.type === "audio" ? e.audioUrl || e.url || "" : e.thumbnailUrl || e.url || e.originalUrl || "";
}

function vOi(e) {
  const t = vBt(e);
  if (t) return t;
  const n = DBe(e);
  if (n) return n;
  const r = e.type === "video" || e.type === "audio" ? e.type : "image",
    a = bOi(e);
  if (!a && r !== "audio") return null;
  const i = Dhe(e),
    o = String(e._assetId || e.id || "").trim();
  return {
    content: a,
    mediaType: r,
    ...(r === "video" && (e.videoPosterUrl || e.thumbnailUrl || a) ? {
      videoPosterUrl: e.videoPosterUrl || e.thumbnailUrl || a
    } : {}),
    settings: {
      mediaType: r,
      ...(i ? {
        imageSize: `${i.w}×${i.h}`
      } : {}),
      ...(e._ossRemoteUrl ? {
        _ossRemoteUrl: e._ossRemoteUrl
      } : {}),
      ...(e._ossThumbnailUrl ? {
        _ossThumbnailUrl: e._ossThumbnailUrl
      } : {}),
      ...(o ? {
        _assetId: o,
        _localCacheAssetId: o
      } : {})
    }
  };
}

function wOi(e, t) {
  let n = !1,
    r = 0;
  const a = new Map(),
    i = () => {
      r++;
      for (const [o, s] of a) o.abort(), s();
      a.clear();
    };
  return {
    activate() {
      n = !0;
    },
    cancel: i,
    dispose() {
      n = !1, i();
    },
    async insert(o, s) {
      const l = e(),
        d = l.document.lease();
      if (!n || !d.isCurrent()) return !1;
      const u = new AbortController(),
        h = r,
        p = () => n && r === h && !u.signal.aborted && d.isCurrent(),
        m = {
          ...s
        },
        f = XYe();
      let y;
      const b = () => {
        y !== void 0 && (t.removeLoading(y), y = void 0);
      };
      a.set(u, b);
      try {
        o.type === "local-skill-image" && (y = t.loading());
        let v = "",
          _;
        if (o.type === "history-item") {
          const S = vOi(o.item);
          S && p() && (v = e().generateId(), _ = fAt(v, o.item, S, m, e().nodesRef.current), gAt(e(), p, [v], C => {
            const I = fAt(v, o.item, S, m, C);
            return _ = I, [I];
          }, "replace"), p() && e().endInteraction());
        }
        const w = await uOi(o, m, e, t, p, u.signal, f.create);
        if (!w || !p()) return !!v && !u.signal.aborted && d.isCurrent();
        const k = !!v;
        return v || (v = e().generateId()), (o.type === "history-item" ? yOi(e(), p, v, S => w.build(v, S), _) : gAt(e(), p, [v], S => [w.build(v, S)], w.selection)) && f.adopt(), p() ? (k || e().endInteraction(), p() && o.type === "local-skill-image" && t.success("已发送到画布"), p()) : !1;
      } catch (v) {
        return p() && (t.report(v), t.error(v instanceof Error ? v.message : "素材发送到画布失败")), !1;
      } finally {
        f.dispose(), b(), a.delete(u);
      }
    }
  };
}

const Dpr = e => !!e && typeof e == "object" && !Array.isArray(e),
  Ost = e => typeof e == "string" && !!e.trim();

function xOi(e) {
  return !Dpr(e) || e.type != null && !["image", "video", "audio", "3d"].includes(String(e.type)) ? !1 : ["prompt", "url", "originalUrl", "sourceNodeId", "musicTitle", "localFilePath"].every(t => e[t] == null || typeof e[t] == "string");
}

function _Oi(e) {
  try {
    const t = JSON.parse(e);
    if (!Dpr(t)) return null;
    switch (t.type) {
      case "history-item":
        return xOi(t.item) ? {
          type: t.type,
          item: t.item
        } : null;
      case "material-library-asset":
        return Ost(t.assetPath) && typeof t.parentPath == "string" ? {
          type: t.type,
          assetPath: t.assetPath,
          parentPath: t.parentPath
        } : null;
      case "local-skill-image":
        return Ost(t.rootPath) && Ost(t.relPath) ? {
          type: t.type,
          rootPath: t.rootPath.trim(),
          relPath: t.relPath.trim()
        } : null;
      case "pose-reference":
        return (typeof t.itemId == "string" || typeof t.itemId == "number") && t.title != null ? {
          type: t.type,
          itemId: String(t.itemId),
          title: String(t.title),
          filePath: typeof t.filePath == "string" ? t.filePath : void 0,
          imageUrl: typeof t.imageUrl == "string" ? t.imageUrl : void 0,
          mediaType: t.mediaType === "video" || t.mediaType === "audio" || t.mediaType === "image" ? t.mediaType : void 0
        } : null;
      default:
        return null;
    }
  } catch {
    return null;
  }
}

function kOi(e, t, n, r, a = (i, o) => o) {
  return e.type !== "history-item" ? !1 : r.some(i => {
    if (i.type !== "storyboard-node") return !1;
    if (i.id === t) return !0;
    const o = a(i.id, i);
    return n.x >= o.x && n.x <= o.x + i.width && n.y >= o.y && n.y <= o.y + i.height;
  });
}

function AOi(e, t, n) {
  const r = i => {
      var p, m, f, y;
      const o = _Oi(((p = i.dataTransfer) == null ? void 0 : p.getData("application/json")) ?? "");
      if (!o) return;
      const s = i.target;
      if ((m = s == null ? void 0 : s.closest) != null && m.call(s, "[data-rh-upload-zone]")) return;
      const l = t(),
        d = l.document.lease();
      l.reconcileViewport();
      const u = kj(i.clientX, i.clientY, l.viewRef.current, e);
      if (!u) return;
      const h = ((y = (f = s == null ? void 0 : s.closest) == null ? void 0 : f.call(s, "[data-node-id]")) == null ? void 0 : y.getAttribute("data-node-id")) ?? null;
      kOi(o, h, u, l.nodesRef.current, NJ) || (i.preventDefault(), i.stopPropagation(), d.isCurrent() && (l.endInteraction(), d.isCurrent() && n.insert(o, u)));
    },
    a = i => {
      var s, l, d;
      if ((l = (s = i.target) == null ? void 0 : s.closest) != null && l.call(s, "[data-rh-upload-zone]")) return;
      const o = (d = i.dataTransfer) == null ? void 0 : d.types;
      !(o != null && o.includes("application/json")) && !(o != null && o.includes("text/plain")) || (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "copy"));
    };
  return e.addEventListener("dragover", a, !0), e.addEventListener("drop", r, !0), () => {
    e.removeEventListener("dragover", a, !0), e.removeEventListener("drop", r, !0);
  };
}

function SOi(e, t, n = 15e3) {
  return t.aborted ? Promise.resolve(null) : new Promise(r => {
    const a = new Image();
    let i = !1,
      o;
    const s = d => {
        i || (i = !0, clearTimeout(o), a.onload = a.onerror = null, t.removeEventListener("abort", l), a.src = "", r(d));
      },
      l = () => s(null);
    a.onload = () => {
      const d = a.naturalWidth || a.width,
        u = a.naturalHeight || a.height;
      s(d > 0 && u > 0 ? {
        w: d,
        h: u
      } : null);
    }, a.onerror = () => s(null), t.addEventListener("abort", l, {
      once: !0
    }), o = setTimeout(l, n), a.src = e;
  });
}

const IOi = {
  async history(e, t, n) {
    const {
      resolveHistoryItemForInputImageCanvas: r
    } = await Ie(async () => {
      const {
        resolveHistoryItemForInputImageCanvas: a
      } = await Promise.resolve().then(() => sw);
      return {
        resolveHistoryItemForInputImageCanvas: a
      };
    }, void 0, import.meta.url);
    return r(e, t, n);
  },
  async material(e) {
    const {
      resolveMaterialLibraryAssetForCanvas: t
    } = await Ie(async () => {
      const {
        resolveMaterialLibraryAssetForCanvas: n
      } = await Promise.resolve().then(() => U1);
      return {
        resolveMaterialLibraryAssetForCanvas: n
      };
    }, void 0, import.meta.url);
    return t(e);
  },
  async dimensions(e, t, n) {
    if (n.aborted) return null;
    if (/^https?:\/\//i.test(t)) try {
      const {
        probeHttpImageDimensions: r
      } = await Ie(async () => {
        const {
          probeHttpImageDimensions: i
        } = await Promise.resolve().then(() => ii);
        return {
          probeHttpImageDimensions: i
        };
      }, void 0, import.meta.url);
      if (n.aborted) return null;
      const a = await r(t);
      if (n.aborted) return null;
      if (a && a.width > 0 && a.height > 0) return {
        w: a.width,
        h: a.height
      };
    } catch {}
    return SOi(e, n);
  },
  async poseUrl(e) {
    const {
      resolvePoseReferenceInsertUrl: t
    } = await Ie(async () => {
      const {
        resolvePoseReferenceInsertUrl: n
      } = await Promise.resolve().then(() => DGa);
      return {
        resolvePoseReferenceInsertUrl: n
      };
    }, void 0, import.meta.url);
    return t(e.itemId, {
      filePath: e.filePath,
      imageUrl: e.imageUrl,
      mediaType: e.mediaType
    });
  },
  async localSkill(e, t) {
    const {
      resolveLocalSkillImageForCanvas: n
    } = await Ie(async () => {
      const {
        resolveLocalSkillImageForCanvas: r
      } = await Promise.resolve().then(() => Uaa);
      return {
        resolveLocalSkillImageForCanvas: r
      };
    }, void 0, import.meta.url);
    return n(e, t);
  },
  loading: () => Uv(ua() ? "正在上传到 OSS…" : "正在发送到画布…"),
  removeLoading: e => gg(e),
  error: e => {
    qi(e);
  },
  success: e => {
    Vs(e);
  },
  report: e => console.error("[CanvasAssetDrop] 素材落画布失败:", e)
};

function COi(e, t = IOi) {
  const n = g.useRef(e);
  g.useLayoutEffect(() => {
    n.current = e;
  });
  const r = g.useRef();
  r.current || (r.current = wOi(() => n.current, t));
  const a = r.current;
  return g.useLayoutEffect(() => {
    a.activate();
    const o = e.document.subscribe(a.cancel);
    return () => {
      o(), a.dispose();
    };
  }, [e.document, a]), g.useLayoutEffect(() => {
    const o = e.canvasRef.current;
    if (e.suspended || !o) return;
    const s = AOi(o, () => n.current, a);
    return () => {
      s(), a.cancel();
    };
  }, [e.canvasRef, e.suspended, a]), {
    sendLocalSkillImageToCanvas: g.useCallback(async (o, s) => {
      const l = String((o == null ? void 0 : o.rootPath) || "").trim(),
        d = String((o == null ? void 0 : o.relPath) || "").trim();
      if (!l || !d) return;
      const u = n.current,
        h = u.viewRef.current,
        p = kj((s == null ? void 0 : s.x) ?? window.innerWidth / 2, (s == null ? void 0 : s.y) ?? window.innerHeight / 2, h, u.canvasRef.current) ?? {
          x: -h.x / h.zoom,
          y: -h.y / h.zoom
        };
      await a.insert({
        type: "local-skill-image",
        rootPath: l,
        relPath: d
      }, p);
    }, [a])
  };
}

function EOi(e, t, n, r) {
  const a = t && "status" in t && "modelName" in t ? {
      ...t
    } : null,
    i = !a && (t != null && t.id) ? n.find(o => o.id === t.id) : void 0;
  return {
    urls: e.filter(o => typeof o == "string" && !!o.trim()).map(o => o.trim()),
    world: {
      ...r
    },
    history: a,
    assetId: t == null ? void 0 : t._assetId,
    sourceNode: (i == null ? void 0 : i.type) === "gen-image" || (i == null ? void 0 : i.type) === "gen-video" ? i : void 0
  };
}

function TOi(e, t) {
  const n = e.filter(r => r && String(r.id || "").trim()).map(r => ({
    ...r
  }));
  return {
    urls: n.map(r => String(r.id)),
    world: {
      ...t
    },
    history: null,
    historyItems: n
  };
}

function MOi(e, t, n, r) {
  const a = t.length,
    i = a <= 4 ? 2 : 3,
    o = Math.ceil(a / i),
    s = 320,
    l = 280,
    d = 420,
    u = 380,
    h = e.world.x - (a === 1 ? s : i * d - 100) / 2,
    p = e.world.y - (a === 1 ? l : o * u - 100) / 2,
    m = [];
  return t.forEach((f, y) => {
    const b = [...r, ...m],
      v = Ki(n[y], "input-image", h + y % i * d, p + Math.floor(y / i) * u, void 0, void 0, b);
    v.content = f.content, v.width = s, v.height = l, v.settings = {
      ...v.settings,
      ...f.settings,
      mediaType: f.mediaType
    };
    const _ = f.history ?? e.history;
    _ && (v.nodeName = Qzn(_, b, r), _.prompt && (v.prompt = _.prompt));
    const w = String(f.settings._localCacheAssetId || f.settings._assetId || "").trim();
    w && (v._contentAssetId = w), f.videoPosterUrl && (v.videoPosterUrl = f.videoPosterUrl), m.push(v);
  }), m;
}

async function POi(e, t, n, r) {
  var i;
  if ((i = e.historyItems) != null && i.length) {
    const o = await Promise.all(e.historyItems.map(async s => {
      if (!r()) return null;
      try {
        const l = await n.history(s, t());
        return r() && l ? {
          ...l,
          history: s
        } : null;
      } catch (l) {
        return r() && n.report(l), null;
      }
    }));
    return {
      drops: o.filter(s => !!s),
      failed: o.filter(s => !s).length
    };
  }
  const a = await Promise.all(e.urls.map(async o => {
    var s;
    if (!r()) return null;
    if (e.history) {
      const l = ((s = e.history.mjImages) == null ? void 0 : s.indexOf(o)) ?? -1,
        d = l >= 0 ? {
          ...e.history,
          url: o,
          selectedMjImageIndex: l
        } : e.urls.length === 1 ? e.history : {
          ...e.history,
          url: o
        };
      try {
        const u = await n.history(d, t());
        if (!r()) return null;
        if (u) return u;
      } catch (u) {
        r() && n.report(u);
      }
    }
    if (!r()) return null;
    try {
      const l = await n.url(o, {
        assetId: e.assetId,
        sourceNode: e.sourceNode
      }, r);
      return r() ? l : null;
    } catch (l) {
      return r() && n.report(l), null;
    }
  }));
  return {
    drops: a.filter(o => !!o),
    failed: a.filter(o => !o).length
  };
}

function ROi(e, t) {
  let n = !1,
    r = 0;
  const a = () => {
    r++;
  };
  return {
    activate() {
      n = !0;
    },
    cancel: a,
    dispose() {
      n = !1, a();
    },
    async send(i) {
      var d;
      const o = e().document.lease(),
        s = r,
        l = () => n && s === r && o.isCurrent();
      if (!i.urls.length && !((d = i.historyItems) != null && d.length) || !l()) return !1;
      try {
        const {
          drops: u,
          failed: h
        } = await POi(i, () => e().nodesRef.current, t, l);
        if (!l()) return !1;
        h && t.error(u.length ? `${h} 张素材读取失败，已发送其余 ${u.length} 张` : "素材读取失败，未添加到画布");
        const p = u.map(() => e().generateId());
        return gAt(e(), l, p, m => MOi(i, u, p, m), "single");
      } catch (u) {
        return l() && (t.report(u), t.error("发送到画布失败")), !1;
      }
    }
  };
}

const NOi = {
  async history(e, t) {
    const {
      resolveHistoryItemForInputImageCanvas: n
    } = await Ie(async () => {
      const {
        resolveHistoryItemForInputImageCanvas: r
      } = await Promise.resolve().then(() => sw);
      return {
        resolveHistoryItemForInputImageCanvas: r
      };
    }, void 0, import.meta.url);
    return n(e, t);
  },
  async url(e, t, n) {
    const {
      resolveUrlForInputImageCanvas: r
    } = await Ie(async () => {
      const {
        resolveUrlForInputImageCanvas: p
      } = await Promise.resolve().then(() => sw);
      return {
        resolveUrlForInputImageCanvas: p
      };
    }, void 0, import.meta.url);
    if (!n()) return null;
    const a = await r(e, t);
    if (!n() || a) return n() ? a : null;
    if (!e.startsWith("blob:")) return r(e, {
      assetId: t.assetId
    });
    const {
      getFullBlobForDisplayUrl: i
    } = await Ie(async () => {
      const {
        getFullBlobForDisplayUrl: p
      } = await Promise.resolve().then(() => No);
      return {
        getFullBlobForDisplayUrl: p
      };
    }, void 0, import.meta.url);
    if (!n()) return null;
    const o = await i(e);
    if (!n()) return null;
    const s = o ?? (await fetch(e).then(p => p.ok ? p.blob() : null));
    if (!s || !n()) return null;
    const {
      assetStore: l
    } = await Ie(async () => {
      const {
        assetStore: p
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: p
      };
    }, void 0, import.meta.url);
    if (!n()) return null;
    const d = `sendToCanvas_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    if (!(await l.saveBlobAsset(d, s, e)) || !n()) return null;
    const h = await l.getAssetUrl(d);
    return n() ? r(h || e, {
      assetId: d
    }) : null;
  },
  notifyClosed: () => uOn(),
  report: e => console.error("[MediaSend]", e),
  error: e => {
    qi(e);
  }
};

function jOi(e, t = NOi) {
  const n = g.useRef(e);
  g.useLayoutEffect(() => {
    n.current = e;
  });
  const r = g.useRef();
  r.current || (r.current = ROi(() => n.current, t));
  const a = r.current;
  g.useLayoutEffect(() => {
    a.activate();
    const h = e.document.subscribe(a.cancel);
    return () => {
      h(), a.dispose();
    };
  }, [e.document, a]);
  const i = g.useCallback(async (h, p) => {
      const m = n.current,
        f = m.viewRef.current,
        y = kj(window.innerWidth / 2, window.innerHeight / 2, f, m.canvasRef.current) ?? {
          x: -f.x / f.zoom,
          y: -f.y / f.zoom
        };
      await a.send(EOi(h, p ? m.lightboxItem : null, m.nodesRef.current, y));
    }, [a]),
    o = g.useCallback(h => i(h, !0), [i]),
    s = g.useCallback(h => i(h, !1), [i]),
    l = g.useCallback(async h => {
      const p = n.current,
        m = p.viewRef.current,
        f = kj(window.innerWidth / 2, window.innerHeight / 2, m, p.canvasRef.current) ?? {
          x: -m.x / m.zoom,
          y: -m.y / m.zoom
        };
      return a.send(TOi(h, f));
    }, [a]),
    d = g.useCallback(() => {
      const h = n.current;
      h.setLightboxItem(null), h.setLightboxOpen(!1), h.setIsCanvasFullscreen(!1);
      try {
        t.notifyClosed();
      } catch (p) {
        t.report(p);
      }
    }, [t]),
    u = g.useCallback((h, p) => {
      const m = rRt(h, p);
      m.url && (n.current.setLightboxItem(m), n.current.setLightboxOpen(!0));
    }, []);
  return {
    sendFromLightbox: o,
    sendFromChat: s,
    sendHistoryItems: l,
    closeLightbox: d,
    openChatMedia: u
  };
}

